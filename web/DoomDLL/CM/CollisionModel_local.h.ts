/////*
////===========================================================================
////
////Doom 3 GPL Source Code
////Copyright (C) 1999-2011 id Software LLC, a ZeniMax Media company. 
////
////This file is part of the Doom 3 GPL Source Code (?Doom 3 Source Code?).  
////
////Doom 3 Source Code is free software: you can redistribute it and/or modify
////it under the terms of the GNU General Public License as published by
////the Free Software Foundation, either version 3 of the License, or
////(at your option) any later version.
////
////Doom 3 Source Code is distributed in the hope that it will be useful,
////but WITHOUT ANY WARRANTY; without even the implied warranty of
////MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
////GNU General Public License for more details.
////
////You should have received a copy of the GNU General Public License
////along with Doom 3 Source Code.  If not, see <http://www.gnu.org/licenses/>.
////
////In addition, the Doom 3 Source Code is also subject to certain additional terms. You should have received a copy of these additional terms immediately following the terms and conditions of the GNU General Public License which accompanied the Doom 3 Source Code.  If not, please request a copy in writing from id Software at the address below.
////
////If you have questions concerning this license or the applicable additional terms, you may contact in writing id Software LLC, c/o ZeniMax Media Inc., Suite 120, Rockville, Maryland 20850 USA.
////
////===========================================================================
////*/
////
/////*
////===============================================================================
////
////	Trace model vs. polygonal model collision detection.
////
////===============================================================================
////*/
////
////#include "CollisionModel.h"
////
var MIN_NODE_SIZE					=	64.0
var MAX_NODE_POLYGONS				=	128
var CM_MAX_POLYGON_EDGES			=	64
var CIRCLE_APPROXIMATION_LENGTH		=	64.0

var	MAX_SUBMODELS					=	2048
var	TRACE_MODEL_HANDLE				=	MAX_SUBMODELS

var VERTEX_HASH_BOXSIZE				=	(1<<6)	// must be power of 2
var VERTEX_HASH_SIZE				=	(VERTEX_HASH_BOXSIZE*VERTEX_HASH_BOXSIZE)
var EDGE_HASH_SIZE					=	(1<<14)
								
var NODE_BLOCK_SIZE_SMALL			=	8
var NODE_BLOCK_SIZE_LARGE			=	256
var REFERENCE_BLOCK_SIZE_SMALL		=	8
var REFERENCE_BLOCK_SIZE_LARGE		=	256

var MAX_WINDING_LIST				=	128		// quite a few are generated at times
var INTEGRAL_EPSILON				=	0.01
var VERTEX_EPSILON					=	0.1
var CHOP_EPSILON					=	0.1


class cm_windingList_t {
////	int					numWindings;			// number of windings
////	idFixedWinding		w[MAX_WINDING_LIST];	// windings
////	idVec3				normal;					// normal for all windings
////	idBounds			bounds;					// bounds of all windings in list
////	idVec3				origin;					// origin for radius
////	float				radius;					// radius relative to origin for all windings
////	int					contents;				// winding surface contents
////	int					primitiveNum;			// number of primitive the windings came from
}


/*
===============================================================================

Collision model

===============================================================================
*/

class cm_vertex_t {
	p = new idVec3;					// vertex point
	checkcount:number/*int*/;			// for multi-check avoidance
	side:number/*unsigned long*/;				// each bit tells at which side this vertex passes one of the trace model edges
	sideSet: number/*unsigned long*/;			// each bit tells if sidedness for the trace model edge has been calculated yet
}

////
class cm_edge_t {
	checkcount:number/*int*/;			// for multi-check avoidance
	internal:number/*unsigned short*/;			// a trace model can never collide with internal edges
	numUsers:number/*unsigned short*/;			// number of polygons using this edge
	side:number/*unsigned long*/;				// each bit tells at which side of this edge one of the trace model vertices passes
	sideSet:number/*unsigned long*/;			// each bit tells if sidedness for the trace model vertex has been calculated yet
	vertexNum = new Int32Array(2);		// start and end point of edge
	normal = new idVec3;				// edge normal
}

class cm_polygonBlock_t{
	bytesRemaining:number/*int*/;
	next: any;//	byte *		
	nextIdx: number = 0;
}

class cm_polygon_t{
	bounds = new idBounds;				// polygon bounds
	checkcount:number/*int*/			// for multi-check avoidance
	contents:number/*int*/			// contents behind polygon
	material:idMaterial;			// material
	plane = new idPlane;				// polygon plane
	numEdges:number/*int*/			// number of edges
	edges = new Int32Array(1);			// variable sized, indexes into cm_edge_t list

	init ( ): void {
		this.bounds.init();
		this.checkcount = 0;
		this.contents = 0;
		this.material = null;
		this.plane.init();
		this.numEdges = 0;
		memset( this.edges, 0, sizeof( this.edges ) );
	}
};

class cm_polygonRef_t {
	p:cm_polygon_t ;					// pointer to polygon
	next: cm_polygonRef_t;				// next polygon in chain

	init ( ): void {
		this.p = null;
		this.next = null;
	}
} 

class cm_polygonRefBlock_t {
	nextRef:cm_polygonRef_t;			// next polygon reference in block
	next:cm_polygonRefBlock_t;			// next block with polygon references
};

class cm_brushBlock_t{
	bytesRemaining:number/*int*/
	next: any;//	byte *					
	nextIdx: number = 0;
}

class cm_brush_t {
	checkcount:number/*int*/			// for multi-check avoidance
	bounds = new idBounds;				// brush bounds
	contents:number/*int*/			// contents of brush
	material:idMaterial;			// material
	primitiveNum:number/*int*/		// number of brush primitive
	numPlanes:number/*int*/			// number of bounding planes
	planes = [new idPlane];			// variable sized
}

class cm_brushRef_t {
	b: cm_brush_t; // pointer to brush
	next: cm_brushRef_t; // next brush in chain
}

class cm_brushRefBlock_t {
	nextRef: cm_brushRef_t; // next brush reference in block
	next: cm_brushRefBlock_t; // next block with brush references
}

class cm_node_t {
	planeType: number /*int*/; // node axial plane type
	planeDist: number /*float*/; // node plane distance
	polygons: cm_polygonRef_t; // polygons in node
	brushes: cm_brushRef_t; // brushes in node
	parent: cm_node_t; // parent of this nodecm_nodeBlock_t
	children = new Array<cm_node_t>( 2 ); // node children
}

class cm_nodeBlock_t {
	nextNode: cm_node_t; // next node in block
	next: cm_nodeBlock_t; // next block with nodes

	init ( ): void {
		this.nextNode = null;
		this.next = null;
	}
}

class cm_model_t {
	name = new idStr; // model name
	bounds = new idBounds; // model bounds
	contents: number /*int*/; // all contents of the model ored together
	isConvex: boolean; // set if model is convex
	// model geometry
	maxVertices: number /*int*/; // size of vertex array
	numVertices: number /*int*/; // number of vertices
	vertices: cm_vertex_t[]; // array with all vertices used by the model
	maxEdges: number /*int*/; // size of edge array
	numEdges: number /*int*/; // number of edges
	edges: cm_edge_t[]; // array with all edges used by the model
	node: cm_node_t; // first node of spatial subdivision
	// blocks with allocated memory
	nodeBlocks: cm_nodeBlock_t; // list with blocks of nodes
	polygonRefBlocks: cm_polygonRefBlock_t; // list with blocks of polygon references
	brushRefBlocks: cm_brushRefBlock_t; // list with blocks of brush references
	polygonBlock: cm_polygonBlock_t; // memory block with all polygons
	brushBlock: cm_brushBlock_t; // memory block with all brushes
	// statistics
	numPolygons: number /*int*/;
	polygonMemory: number /*int*/;
	numBrushes: number /*int*/;
	brushMemory: number /*int*/;
	numNodes: number /*int*/;
	numBrushRefs: number /*int*/;
	numPolygonRefs: number /*int*/;
	numInternalEdges: number /*int*/;
	numSharpEdges: number /*int*/;
	numRemovedPolys: number /*int*/;
	numMergedPolys: number /*int*/;
	usedMemory: number /*int*/;

	init ( ): void {
		this.name.init ( );
		this.bounds.init ( );
		this.contents = 0;
		this.isConvex = false;

		this.maxVertices = 0; // size of vertex array
		this.numVertices = 0; // number of vertices
		this.vertices = null;
		this.maxEdges = 0; // size of edge array
		this.numEdges = 0; // number of edges
		this.edges = null;
		this.node = null;

		this.nodeBlocks = null;
		this.polygonRefBlocks = null;
		this.brushRefBlocks = null;
		this.polygonBlock = null;
		this.brushBlock = null;

		this.numPolygons = 0;
		this.polygonMemory = 0;
		this.numBrushes = 0;
		this.brushMemory = 0;
		this.numNodes = 0;
		this.numBrushRefs = 0;
		this.numPolygonRefs = 0;
		this.numInternalEdges = 0;
		this.numSharpEdges = 0;
		this.numRemovedPolys = 0;
		this.numMergedPolys = 0;
		this.usedMemory = 0;
	}
}

/*
===============================================================================

Data used during collision detection calculations

===============================================================================
*/

class cm_trmVertex_t {
////	int used;										// true if this vertex is used for collision detection
////	idVec3 p;										// vertex position
////	idVec3 endp;									// end point of vertex after movement
////	int polygonSide;								// side of polygon this vertex is on (rotational collision)
////	idPluecker pl;									// pluecker coordinate for vertex movement
////	idVec3 rotationOrigin;							// rotation origin for this vertex
////	idBounds rotationBounds;						// rotation bounds for this vertex
};

class cm_trmEdge_t {
////	int used;										// true when vertex is used for collision detection
////	idVec3 start;									// start of edge
////	idVec3 end;										// end of edge
////	int vertexNum[2];								// indexes into cm_traceWork_t->vertices
////	idPluecker pl;									// pluecker coordinate for edge
////	idVec3 cross;									// (z,-y,x) of cross product between edge dir and movement dir
////	idBounds rotationBounds;						// rotation bounds for this edge
////	idPluecker plzaxis;								// pluecker coordinate for rotation about the z-axis
////	unsigned short bitNum;							// vertex bit number
};

class cm_trmPolygon_t {
////	int used;
////	idPlane plane;									// polygon plane
////	int numEdges;									// number of edges
////	int edges[MAX_TRACEMODEL_POLYEDGES];			// index into cm_traceWork_t->edges
////	idBounds rotationBounds;						// rotation bounds for this polygon
};

class cm_traceWork_t{
////	int numVerts;
////	cm_trmVertex_t vertices[MAX_TRACEMODEL_VERTS];	// trm vertices
////	int numEdges;
////	cm_trmEdge_t edges[MAX_TRACEMODEL_EDGES+1];		// trm edges
////	int numPolys;
////	cm_trmPolygon_t polys[MAX_TRACEMODEL_POLYS];	// trm polygons
////	model: cm_model_t;								// model colliding with
////	idVec3 start;									// start of trace
////	idVec3 end;										// end of trace
////	idVec3 dir;										// trace direction
////	idBounds bounds;								// bounds of full trace
////	idBounds size;									// bounds of transformed trm relative to start
////	idVec3 extents;									// largest of abs(size[0]) and abs(size[1]) for BSP trace
////	int contents;									// ignore polygons that do not have any of these contents flags
////	trace_t trace;									// collision detection result
////
////	bool rotation;									// true if calculating rotational collision
////	bool pointTrace;								// true if only tracing a point
////	bool positionTest;								// true if not tracing but doing a position test
////	bool isConvex;									// true if the trace model is convex
////	bool axisIntersectsTrm;							// true if the rotation axis intersects the trace model
////	bool getContacts;								// true if retrieving contacts
////	bool quickExit;									// set to quickly stop the collision detection calculations
////
////	idVec3 origin;									// origin of rotation in model space
////	idVec3 axis;									// rotation axis in model space
////	idMat3 matrix;									// rotates axis of rotation to the z-axis
////	/*float*/angle:number;									// angle for rotational collision
////	float maxTan;									// max tangent of half the positive angle used instead of fraction
////	float radius;									// rotation radius of trm start
////	idRotation modelVertexRotation;					// inverse rotation for model vertices
////
////	contactInfo_t *contacts;						// array with contacts
////	int maxContacts;								// max size of contact array
////	int numContacts;								// number of contacts found
////
////	idPlane heartPlane1;							// polygons should be near anough the trace heart planes
////	float maxDistFromHeartPlane1;
////	idPlane heartPlane2;
////	float maxDistFromHeartPlane2;
////	idPluecker polygonEdgePlueckerCache[CM_MAX_POLYGON_EDGES];
////	idPluecker polygonVertexPlueckerCache[CM_MAX_POLYGON_EDGES];
////	idVec3 polygonRotationOriginCache[CM_MAX_POLYGON_EDGES];
};

/*
===============================================================================

Collision Map

===============================================================================
*/

class cm_procNode_t {
	plane = new idPlane;
	children = new Int32Array(2);				// negative numbers are (-1 - areaNumber), 0 = solid
};

class idCollisionModelManagerLocal extends idCollisionModelManager {
////public:
////	// load collision models from a map file
////	void			LoadMap( const idMapFile *mapFile );
////	// frees all the collision models
////	void			FreeMap( );
////
////	// get clip handle for model
////	cmHandle_t		LoadModel( const char *modelName, const bool precache );
////	// sets up a trace model for collision with other trace models
////	cmHandle_t		SetupTrmModel( const idTraceModel &trm, const idMaterial *material );
////	// create trace model from a collision model, returns true if succesfull
////	bool			TrmFromModel( const char *modelName, idTraceModel &trm );
////
////	// name of the model
////	const char *	GetModelName( cmHandle_t model ) const;
////	// bounds of the model
////	bool			GetModelBounds( cmHandle_t model, idBounds &bounds ) const;
////	// all contents flags of brushes and polygons ored together
////	bool			GetModelContents( cmHandle_t model, int &contents ) const;
////	// get the vertex of a model
////	bool			GetModelVertex( cmHandle_t model, int vertexNum, idVec3 &vertex ) const;
////	// get the edge of a model
////	bool			GetModelEdge( cmHandle_t model, int edgeNum, idVec3 &start, idVec3 &end ) const;
////	// get the polygon of a model
////	bool			GetModelPolygon( cmHandle_t model, int polygonNum, idFixedWinding &winding ) const;
////
////	// translates a trm and reports the first collision if any
////	void			Translation( trace_t *results, start:idVec3, const idVec3 &end,
////								const idTraceModel *trm, const idMat3 &trmAxis, int contentMask,
////								cmHandle_t model, const idVec3 &modelOrigin, const idMat3 &modelAxis );
////	// rotates a trm and reports the first collision if any
////	void			Rotation( trace_t *results, start:idVec3, const idRotation &rotation,
////								const idTraceModel *trm, const idMat3 &trmAxis, int contentMask,
////								cmHandle_t model, const idVec3 &modelOrigin, const idMat3 &modelAxis );
////	// returns the contents the trm is stuck in or 0 if the trm is in free space
////	int				Contents( start:idVec3,
////								const idTraceModel *trm, const idMat3 &trmAxis, int contentMask,
////								cmHandle_t model, const idVec3 &modelOrigin, const idMat3 &modelAxis );
////	// stores all contact points of the trm with the model, returns the number of contacts
////	int				Contacts( contactInfo_t *contacts, const int maxContacts, start:idVec3, const idVec6 &dir, const float depth,
////								const idTraceModel *trm, const idMat3 &trmAxis, int contentMask,
////								cmHandle_t model, const idVec3 &modelOrigin, const idMat3 &modelAxis );
////	// test collision detection
////	void			DebugOutput( const idVec3 &origin );
////	// draw a model
////	void			DrawModel( cmHandle_t model, const idVec3 &origin, const idMat3 &axis,
////											const idVec3 &viewOrigin, const float radius );
////	// print model information, use -1 handle for accumulated model info
////	void			ModelInfo( cmHandle_t model );
////	// list all loaded models
////	void			ListModels( );
////	// write a collision model file for the map entity
////	bool			WriteCollisionModelForMapEntity( const idMapEntity *mapEnt, const char *filename, const bool testTraceModel = true );
////
////private:			// CollisionMap_translate.cpp
////	int				TranslateEdgeThroughEdge( idVec3 &cross, idPluecker &l1, idPluecker &l2, float *fraction );
////	void			TranslateTrmEdgeThroughPolygon( cm_traceWork_t *tw, cm_polygon_t *poly, cm_trmEdge_t *trmEdge );
////	void			TranslateTrmVertexThroughPolygon( cm_traceWork_t *tw, cm_polygon_t *poly, cm_trmVertex_t *v, int bitNum );
////	void			TranslatePointThroughPolygon( cm_traceWork_t *tw, cm_polygon_t *poly, cm_trmVertex_t *v );
////	void			TranslateVertexThroughTrmPolygon( cm_traceWork_t *tw, cm_trmPolygon_t *trmpoly, cm_polygon_t *poly, cm_vertex_t *v, idVec3 &endp, idPluecker &pl );
////	bool			TranslateTrmThroughPolygon( cm_traceWork_t *tw, p: cm_polygon_t );
////	void			SetupTranslationHeartPlanes( cm_traceWork_t *tw );
////	void			SetupTrm( cm_traceWork_t *tw, const idTraceModel *trm );
////
////private:			// CollisionMap_rotate.cpp
////	int				CollisionBetweenEdgeBounds( cm_traceWork_t *tw, const idVec3 &va, const idVec3 &vb,
////											const idVec3 &vc, const idVec3 &vd, float tanHalfAngle,
////											idVec3 &collisionPoint, idVec3 &collisionNormal );
////	int				RotateEdgeThroughEdge( cm_traceWork_t *tw, const idPluecker &pl1,
////											const idVec3 &vc, const idVec3 &vd,
////											const float minTan, float &tanHalfAngle );
////	int				EdgeFurthestFromEdge( cm_traceWork_t *tw, const idPluecker &pl1,
////											const idVec3 &vc, const idVec3 &vd,
////											float &tanHalfAngle, float &dir );
////	void			RotateTrmEdgeThroughPolygon( cm_traceWork_t *tw, cm_polygon_t *poly, cm_trmEdge_t *trmEdge );
////	int				RotatePointThroughPlane( const cm_traceWork_t *tw, const idVec3 &point, const idPlane &plane,
////											const /*float*/angle:number, const float minTan, float &tanHalfAngle );
////	int				PointFurthestFromPlane( const cm_traceWork_t *tw, const idVec3 &point, const idPlane &plane,
////											const /*float*/angle:number, float &tanHalfAngle, float &dir );
////	int				RotatePointThroughEpsilonPlane( const cm_traceWork_t *tw, const idVec3 &point, const idVec3 &endPoint,
////											const idPlane &plane, const /*float*/angle:number, const idVec3 &origin,
////											float &tanHalfAngle, idVec3 &collisionPoint, idVec3 &endDir );
////	void			RotateTrmVertexThroughPolygon( cm_traceWork_t *tw, cm_polygon_t *poly, cm_trmVertex_t *v, int vertexNum);
////	void			RotateVertexThroughTrmPolygon( cm_traceWork_t *tw, cm_trmPolygon_t *trmpoly, cm_polygon_t *poly,
////											cm_vertex_t *v, idVec3 &rotationOrigin );
////	bool			RotateTrmThroughPolygon( cm_traceWork_t *tw, p: cm_polygon_t );
////	void			BoundsForRotation( const idVec3 &origin, const idVec3 &axis, start:idVec3, const idVec3 &end, idBounds &bounds );
////	void			Rotation180( trace_t *results, const idVec3 &rorg, const idVec3 &axis,
////									const float startAngle, const float endAngle, start:idVec3,
////									const idTraceModel *trm, const idMat3 &trmAxis, int contentMask,
////									cmHandle_t model, const idVec3 &origin, const idMat3 &modelAxis );
////
////private:			// CollisionMap_contents.cpp
////	bool			TestTrmVertsInBrush( cm_traceWork_t *tw, cm_brush_t *b );
////	bool			TestTrmInPolygon( cm_traceWork_t *tw, p: cm_polygon_t );
////	cm_node_t *		PointNode( const idVec3 &p, model: cm_model_t );
////	int				PointContents( const idVec3 p, cmHandle_t model );
////	int				TransformedPointContents( const idVec3 &p, cmHandle_t model, const idVec3 &origin, const idMat3 &modelAxis );
////	int				ContentsTrm( trace_t *results, start:idVec3,
////									const idTraceModel *trm, const idMat3 &trmAxis, int contentMask,
////									cmHandle_t model, const idVec3 &modelOrigin, const idMat3 &modelAxis );
////
////private:			// CollisionMap_trace.cpp
////	void			TraceTrmThroughNode( cm_traceWork_t *tw, node: cm_node_t );
////	void			TraceThroughAxialBSPTree_r( cm_traceWork_t *tw, node: cm_node_t, float p1f, float p2f, idVec3 &p1, idVec3 &p2);
////	void			TraceThroughModel( cm_traceWork_t *tw );
////	void			RecurseProcBSP_r( trace_t *results, int parentNodeNum, int nodeNum, float p1f, float p2f, const idVec3 &p1, const idVec3 &p2 );
////
////private:			// CollisionMap_load.cpp
	Clear ( ): void { throw "placeholder"; }
	FreeTrmModelStructure ( ): void { throw "placeholder"; }
////					// model deallocation
////	void			RemovePolygonReferences_r( node: cm_node_t, p: cm_polygon_t );
////	void			RemoveBrushReferences_r( node: cm_node_t, cm_brush_t *b );
////	void			FreeNode( node: cm_node_t );
////	void			FreePolygonReference( pref: cm_polygonRef_t );
////	void			FreeBrushReference( cm_brushRef_t *bref );
////	void			FreePolygon( model: cm_model_t, cm_polygon_t *poly );
////	void			FreeBrush( model: cm_model_t, cm_brush_t *brush );
////	void			FreeTree_r( model: cm_model_t, cm_node_t *headNode, node: cm_node_t );
////	void			FreeModel( model: cm_model_t );
////					// merging polygons
////	void			ReplacePolygons( model: cm_model_t, node: cm_node_t, cm_polygon_t *p1, cm_polygon_t *p2, cm_polygon_t *newp );
////	cm_polygon_t *	TryMergePolygons( model: cm_model_t, cm_polygon_t *p1, cm_polygon_t *p2 );
////	bool			MergePolygonWithTreePolygons( model: cm_model_t, node: cm_node_t, cm_polygon_t *polygon );
////	void			MergeTreePolygons( model: cm_model_t, node: cm_node_t );
////					// finding internal edges
////	bool			PointInsidePolygon( model: cm_model_t, p: cm_polygon_t, idVec3 &v );
////	void			FindInternalEdgesOnPolygon( model: cm_model_t, cm_polygon_t *p1, cm_polygon_t *p2 );
////	void			FindInternalPolygonEdges( model: cm_model_t, node: cm_node_t, cm_polygon_t *polygon );
////	void			FindInternalEdges( model: cm_model_t, node: cm_node_t );
////	void			FindContainedEdges( model: cm_model_t, p: cm_polygon_t );
////					// loading of proc BSP tree
////	void			ParseProcNodes( idLexer *src );
////	void			LoadProcBSP( const char *name );
////					// removal of contained polygons
////	int				R_ChoppedAwayByProcBSP( int nodeNum, idFixedWinding *w, const idVec3 &normal, const idVec3 &origin, const float radius );
////	int				ChoppedAwayByProcBSP( const idFixedWinding &w, const idPlane &plane, int contents );
////	void			ChopWindingListWithBrush( cm_windingList_t *list, cm_brush_t *b );
////	void			R_ChopWindingListWithTreeBrushes( cm_windingList_t *list, node: cm_node_t );
////	idFixedWinding *WindingOutsideBrushes( idFixedWinding *w, const idPlane &plane, int contents, int patch, cm_node_t *headNode );
////					// creation of axial BSP tree
	AllocModel ( ): cm_model_t { throw "placeholder"; }
	AllocNode ( model: cm_model_t, /*int */blockSize: number ): cm_node_t { throw "placeholder"; }
	AllocPolygonReference(model:cm_model_t, /*int */blockSize :number) :cm_polygonRef_t {throw "placeholder";}
	AllocBrushReference(model: cm_model_t, /*int*/ blockSize:number): cm_brushRef_t {throw "placeholder";}
	AllocPolygon(model: cm_model_t, /*int */numEdges:number): cm_polygon_t {throw "placeholder";}
	AllocBrush(model: cm_model_t, /*int */numPlanes:number): cm_brush_t {throw "placeholder";}
////	void			AddPolygonToNode( model: cm_model_t, node: cm_node_t, p: cm_polygon_t );
////	void			AddBrushToNode( model: cm_model_t, node: cm_node_t, cm_brush_t *b );
	SetupTrmModelStructure(): void { throw "placeholder"; }
	R_FilterPolygonIntoTree( model: cm_model_t, node: cm_node_t, pref: cm_polygonRef_t, p: cm_polygon_t ):void { throw "placeholder"; }
////	void			R_FilterBrushIntoTree( model: cm_model_t, node: cm_node_t, cm_brushRef_t *pref, cm_brush_t *b );
////	cm_node_t *		R_CreateAxialBSPTree( model: cm_model_t, node: cm_node_t, const idBounds &bounds );
////	cm_node_t *		CreateAxialBSPTree( model: cm_model_t, node: cm_node_t );
////					// creation of raw polygons
	SetupHash( ):void { throw "placeholder"; }
	ShutdownHash( ):void { throw "placeholder"; }
////	void			ClearHash( idBounds &bounds );
////	int				HashVec(vec:idVec3);
////	int				GetVertex( model: cm_model_t, const idVec3 &v, int *vertexNum );
////	int				GetEdge( model: cm_model_t, const idVec3 &v1, const idVec3 &v2, int *edgeNum, int v1num );
////	void			CreatePolygon( model: cm_model_t, idFixedWinding *w, const idPlane &plane, const idMaterial *material, int primitiveNum );
////	void			PolygonFromWinding( model: cm_model_t, idFixedWinding *w, const idPlane &plane, const idMaterial *material, int primitiveNum );
////	void			CalculateEdgeNormals( model: cm_model_t, node: cm_node_t );
////	void			CreatePatchPolygons( model: cm_model_t, idSurface_Patch &mesh, const idMaterial *material, int primitiveNum );
////	void			ConvertPatch( model: cm_model_t, const idMapPatch *patch, int primitiveNum );
////	void			ConvertBrushSides( model: cm_model_t, const idMapBrush *mapBrush, int primitiveNum );
////	void			ConvertBrush( model: cm_model_t, const idMapBrush *mapBrush, int primitiveNum );
////	void			PrintModelInfo( const model: cm_model_t );
	AccumulateModelInfo ( model: cm_model_t ): void { throw "placeholder"; }
////	void			RemapEdges( node: cm_node_t, int *edgeRemap );
////	void			OptimizeArrays( model: cm_model_t );
////	void			FinishModel( model: cm_model_t );
	BuildModels ( mapFile: idMapFile ): void { throw "placeholder"; }
////	cmHandle_t		FindModel( name:string );
////	cm_model_t *	CollisionModelForMapEntity( const idMapEntity *mapEnt );	// brush/patch model from .map
////	cm_model_t *	LoadRenderModel( const char *fileName );					// ASE/LWO models
////	bool			TrmFromModel_r( idTraceModel &trm, node: cm_node_t );
////	bool			TrmFromModel( const model: cm_model_t, idTraceModel &trm );
////
////private:			// CollisionMap_files.cpp
////					// writing
////	void			WriteNodes( idFile *fp, node: cm_node_t );
////	int				CountPolygonMemory( node: cm_node_t ) const;
////	void			WritePolygons( idFile *fp, node: cm_node_t );
////	int				CountBrushMemory( node: cm_node_t ) const;
////	void			WriteBrushes( idFile *fp, node: cm_node_t );
////	void			WriteCollisionModel( idFile *fp, model: cm_model_t );
////	void			WriteCollisionModelsToFile( const char *filename, int firstModel, int lastModel, unsigned int mapFileCRC );
////					// loading
	ParseNodes(src: idLexer, model: cm_model_t, parent: cm_node_t ):cm_node_t { throw "placeholder"; }
	ParseVertices ( src: idLexer, model: cm_model_t ): void { throw "placeholder"; }
	ParseEdges ( src: idLexer, model: cm_model_t ): void { throw "placeholder"; }
	ParsePolygons ( src: idLexer, model: cm_model_t ): void { throw "placeholder"; }
	ParseBrushes ( src: idLexer, model: cm_model_t ): void { throw "placeholder"; }
	ParseCollisionModel ( src: idLexer ): boolean { throw "placeholder"; }
	LoadCollisionModelFile ( name: string, /*unsigned int */mapFileCRC: number ): boolean { throw "placeholder"; }
////
////private:			// CollisionMap_debug
	ContentsFromString ( $string: string ): number /*int*/ { throw "placeholder"; }
////	const char *	StringFromContents( const int contents ) const;
////	void			DrawEdge( model: cm_model_t, int edgeNum, const idVec3 &origin, const idMat3 &axis );
////	void			DrawPolygon( model: cm_model_t, p: cm_polygon_t, const idVec3 &origin, const idMat3 &axis,
////								const idVec3 &viewOrigin );
////	void			DrawNodePolygons( model: cm_model_t, node: cm_node_t, const idVec3 &origin, const idMat3 &axis,
////								const idVec3 &viewOrigin, const float radius );
////
////private:			// collision map data
	mapName = new idStr;
	mapFileTime: number/*ID_TIME_T*/;
	loaded:number/*int*/;
	// for multi-check avoidance
	checkCount:number/*int*/;
	// models
	maxModels:number/*int*/;
	numModels:number/*int*/;
	models: cm_model_t[];
	// polygons and brush for trm model
	trmPolygons = newStructArray<cm_polygonRef_t>(cm_polygonRef_t,MAX_TRACEMODEL_POLYS);
	trmBrushes: cm_brushRef_t[] = [null];
	trmMaterial:idMaterial;
	// for data pruning
	numProcNodes:number/*int*/;
	procNodes:cm_procNode_t;
	// for retrieving contact points
	getContacts:boolean;
	contacts:contactInfo_t; //contactInfo_t *	
	maxContacts:number/*int*/;
	numContacts:number/*int*/;
};
////
////// for debugging
////extern idCVar cm_debugCollision;
