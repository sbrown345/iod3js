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
	numWindings :number/*int*/;			// number of windings
	w = newStructArray<idFixedWinding>(idFixedWinding, MAX_WINDING_LIST);	// windings
	normal = new idVec3;					// normal for all windings
	bounds = new idBounds;					// bounds of all windings in list
	origin = new idVec3;					// origin for radius
	radius :number/*float*/;					// radius relative to origin for all windings
	contents :number/*int*/;				// winding surface contents
	primitiveNum :number/*int*/;			// number of primitive the windings came from
}


/*
===============================================================================

Collision model

===============================================================================
*/

class cm_vertex_t {
	static size = 24;
	p = new idVec3; // vertex point
	checkcount: number /*int*/; // for multi-check avoidance
	side: number /*unsigned long*/; // each bit tells at which side this vertex passes one of the trace model edges
	sideSet: number /*unsigned long*/; // each bit tells if sidedness for the trace model edge has been calculated yet

	memset0 ( ): void {
		this.p.memset0 ( );
		this.checkcount = this.side = this.sideSet = 0;
	}

	copy ( dest: cm_vertex_t = null ): cm_vertex_t {
		dest = dest || new cm_vertex_t;
		dest.p.equals( this.p );
		dest.checkcount = this.checkcount;
		dest.side = this.side;
		dest.sideSet = this.sideSet;
		return dest;
	}
}


class cm_edge_t {
	static size = 36;
	checkcount: number /*int*/; // for multi-check avoidance
	internal: number /*unsigned short*/; // a trace model can never collide with internal edges
	numUsers: number /*unsigned short*/; // number of polygons using this edge
	side: number /*unsigned long*/; // each bit tells at which side of this edge one of the trace model vertices passes
	sideSet: number /*unsigned long*/; // each bit tells if sidedness for the trace model vertex has been calculated yet
	vertexNum = new Int32Array( 2 ); // start and end point of edge
	normal = new idVec3; // edge normal

	memset0 ( ): void {
		this.checkcount = this.internal = this.numUsers = this.side = this.sideSet = 0;
		this.vertexNum[0] = this.vertexNum[1] = 0;
		this.normal.memset0 ( );
	}

	copy(dest: cm_edge_t = null): cm_edge_t {
		dest = dest || new cm_edge_t;
		dest.checkcount = this.checkcount;
		dest.internal = this.internal;
		dest.numUsers = this.numUsers;
		dest.side = this.side;
		dest.sideSet = this.sideSet;
		dest.vertexNum[0] = this.vertexNum[0];
		dest.vertexNum[1] = this.vertexNum[1];
		dest.normal.equals( this.normal );
		return dest;
	}
}

class cm_polygonBlock_t {
	bytesRemaining: number /*int*/;
	//next: cm_polygon_t;//	byte *		
	nextPtr = 0;

	get next ( ): cm_polygon_t {
		if ( !this.polygons[this.nextPtr] ) {
			this.polygons[this.nextPtr] = new cm_polygon_t;
		}
		return this.polygons[this.nextPtr];
	}
	set next(value: cm_polygon_t) {
		this.polygons[this.nextPtr] = value;
	}

	private polygons: cm_polygon_t[] = [];

	memoryUsedInOriginal: number;// not used, seems right to keep this for now
	constructor(memoryUsedInOriginal: number) {
		this.memoryUsedInOriginal = memoryUsedInOriginal;
		//this.polygons = newStructArray<cm_polygon_t>( cm_polygon_t, polygonCount );
	}
}

class cm_polygon_t{
	static  size = 60;

	bounds = new idBounds;				// polygon bounds
	checkcount:number/*int*/			// for multi-check avoidance
	contents:number/*int*/			// contents behind polygon
	material:idMaterial;			// material
	plane = new idPlane;				// polygon plane
	numEdges:number/*int*/			// number of edges
	edges: Int32Array;			// variable sized, indexes into cm_edge_t list

	memset0 ( ): void {
		this.bounds.memset0();
		this.checkcount = 0;
		this.contents = 0;
		this.material = null;
		this.plane.memset0();
		this.numEdges = 0;
		memset( this.edges, 0, sizeof( this.edges ) );
	}

	copy ( dest: cm_polygon_t = null ): cm_polygon_t {
		dest = dest || new cm_polygon_t;
		dest.bounds.opEquals( this.bounds );
		dest.checkcount = this.checkcount;
		dest.contents = this.contents;
		dest.material = this.material;
		dest.plane.opEquals( this.plane );
		dest.numEdges = this.numEdges;
		dest.edges[0] = this.edges[0]; // the whole array is copied manually after
		return dest;
	}
}

class cm_polygonRef_t {
	static size = 8;
	p:cm_polygon_t ;					// pointer to polygon
	next: cm_polygonRef_t;				// next polygon in chain

	memset0 ( ): void {
		this.p = null;
		this.next = null;
	}
}

class cm_polygonRefBlock_t {
	nextRefPtr = 0; // next polygon reference in block
	next: cm_polygonRefBlock_t; // next block with polygon references

	get nextRef ( ): cm_polygonRef_t { return this.blocks[this.nextRefPtr]; }
	set nextRef ( value: cm_polygonRef_t ) {
		this.blocks[this.nextRefPtr] = value;
	}

	blocks: cm_polygonRef_t[];

	constructor ( blockSize: number ) {
		this.blocks = newStructArray<cm_polygonRef_t>( cm_polygonRef_t, blockSize );
	}
}

class cm_brushBlock_t {
	bytesRemaining: number /*int*/
	nextPtr = 0; //next: byte *

	get next(): cm_brush_t {
		if (!this.brushes[this.nextPtr]) {
			this.brushes[this.nextPtr] = new cm_brush_t;
		}
		return this.brushes[this.nextPtr];
	}
	set next(value: cm_brush_t) {
		this.brushes[this.nextPtr] = value;
	}

	brushes: cm_brush_t[] = [];

	memoryUsedInOriginal: number;// not used, seems right to keep this for now
	constructor(memoryUsedInOriginal: number) {
		this.memoryUsedInOriginal = memoryUsedInOriginal;
	}
}

class cm_brush_t {
	static size = 60;

	checkcount:number/*int*/			// for multi-check avoidance
	bounds = new idBounds;				// brush bounds
	contents:number/*int*/			// contents of brush
	material:idMaterial;			// material
	primitiveNum:number/*int*/		// number of brush primitive
	numPlanes:number/*int*/			// number of bounding planes
	planes: idPlane[];			// variable sized
}

class cm_brushRef_t {
	static size = 8;
	b: cm_brush_t; // pointer to brush
	next: cm_brushRef_t; // next brush in chain
}

class cm_brushRefBlock_t {
	nextRefPtr = 0; // next polygon reference in block
	next: cm_brushRefBlock_t; // next block with brush references

	get nextRef ( ): cm_brushRef_t { return this.blocks[this.nextRefPtr]; }
	set nextRef ( value: cm_brushRef_t ) {
		this.blocks[this.nextRefPtr] = value;
	}

	blocks: cm_brushRef_t[];

	constructor ( blockSize: number ) {
		this.blocks = newStructArray<cm_brushRef_t>( cm_brushRef_t, blockSize );
	}
}

class cm_node_t {
	static size = 28;
	planeType: number /*int*/; // node axial plane type
	//planeDist: number /*float*/; // node plane distance
	_planeDist = new Float32Array( 1 );
	polygons: cm_polygonRef_t; // polygons in node
	brushes: cm_brushRef_t; // brushes in node
	parent: cm_node_t; // parent of this nodecm_nodeBlock_t
	children = new Array<cm_node_t>( 2 ); // node children

	get planeDist ( ): number { return this._planeDist[0]; }

	set planeDist ( value: number ) {
		if ( value === undefined ) {
			throw 'Undefined value';
		}
		this._planeDist[0] = value;
	}

	memset0 ( ): void {
		this.planeType = 0;
		this.planeDist = 0.0;
		this.polygons = null;
		this.polygons = null;
		this.parent = null;
		this.children[0] = this.children[1] = null;
	}
}

class cm_nodeBlock_t {
	nextNodePtr = 0; // next node in block
	next: cm_nodeBlock_t; // next block with nodes

	get nextNode(): cm_node_t { return this.blocks[this.nextNodePtr]; }
	set nextNode(value: cm_node_t ) {
		this.blocks[this.nextNodePtr] = value;
	}

	blocks: cm_node_t[];

	constructor ( blockSize: number ) {
		this.blocks = newStructArray<cm_node_t>( cm_node_t, blockSize );
	}

	memset0 ( ): void {
		this.nextNode = null;
		this.next = null;

		this.blocks = null;
		this.nextNodePtr = 0;
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

	memset0 ( ): void {
		this.name.memset0 ( );
		this.bounds.memset0 ( );
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
}

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
}

class cm_trmPolygon_t {
////	int used;
////	idPlane plane;									// polygon plane
////	int numEdges;									// number of edges
////	int edges[MAX_TRACEMODEL_POLYEDGES];			// index into cm_traceWork_t->edges
////	idBounds rotationBounds;						// rotation bounds for this polygon
}

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
}

/*
===============================================================================

Collision Map

===============================================================================
*/

class cm_procNode_t {
	plane = new idPlane;
	children = new Int32Array(2);				// negative numbers are (-1 - areaNumber), 0 = solid
}

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
	// bounds of the model
	//GetModelBounds ( model: /*cmHandle_t*/number, bounds: idBounds ): boolean { throw "placeholder"; }
	// all contents flags of brushes and polygons ored together
	//GetModelContents ( model: /*cmHandle_t */number, contents: R<number> /*int */ ): boolean { throw "placeholder"; }
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
////	void			BoundsForRotation( const idVec3 &origin, const idVec3 &axis, start:idVec3, const idVec3 &end, bounds: idBounds );
////	void			Rotation180( trace_t *results, const idVec3 &rorg, const idVec3 &axis,
////									const float startAngle, const float endAngle, start:idVec3,
////									const idTraceModel *trm, const idMat3 &trmAxis, int contentMask,
////									cmHandle_t model, const idVec3 &origin, const idMat3 &modelAxis );
////
////private:			// CollisionMap_contents.cpp
////	bool			TestTrmVertsInBrush( cm_traceWork_t *tw, b: cm_brush_t );
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
	//Clear ( ): void { throw "placeholder"; }
	//FreeTrmModelStructure ( ): void { throw "placeholder"; }
////					// model deallocation
////	void			RemovePolygonReferences_r( node: cm_node_t, p: cm_polygon_t );
////	void			RemoveBrushReferences_r( node: cm_node_t, b: cm_brush_t );
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
	//R_ChoppedAwayByProcBSP( /*int*/ nodeNum:number, w:idFixedWinding, normal:idVec3, origin:idVec3 , /*float */radius :number):number/*int*/{throw "placeholder";}
	//ChoppedAwayByProcBSP ( w: idFixedWinding, plane: idPlane, /*int */contents: number ): number { throw "placeholder"; }
////	void			ChopWindingListWithBrush( cm_windingList_t *list, b: cm_brush_t );
////	void			R_ChopWindingListWithTreeBrushes( cm_windingList_t *list, node: cm_node_t );
////	idFixedWinding *WindingOutsideBrushes( idFixedWinding *w, const idPlane &plane, int contents, int patch, cm_node_t *headNode );
	// creation of axial BSP tree
//	AllocModel ( ): cm_model_t { throw "placeholder"; }
//	AllocNode ( model: cm_model_t, /*int */blockSize: number ): cm_node_t { throw "placeholder"; }
//	AllocPolygonReference(model:cm_model_t, /*int */blockSize :number) :cm_polygonRef_t {throw "placeholder";}
//	AllocBrushReference(model: cm_model_t, /*int*/ blockSize:number): cm_brushRef_t {throw "placeholder";}
//	AllocPolygon(model: cm_model_t, /*int */numEdges:number): cm_polygon_t {throw "placeholder";}
//	AllocBrush(model: cm_model_t, /*int */numPlanes:number): cm_brush_t {throw "placeholder";}
//	AddPolygonToNode( model: cm_model_t, node: cm_node_t, p: cm_polygon_t ): void { throw "placeholder"; }
//	AddBrushToNode(model: cm_model_t, node: cm_node_t, b: cm_brush_t): void { throw "placeholder"; }
//	SetupTrmModelStructure(): void { throw "placeholder"; }
//	R_FilterPolygonIntoTree( model: cm_model_t, node: cm_node_t, pref: cm_polygonRef_t, p: cm_polygon_t ):void { throw "placeholder"; }
//	R_FilterBrushIntoTree ( model: cm_model_t, node: cm_node_t, pref: cm_brushRef_t, b: cm_brush_t ): void { throw "placeholder"; }
//////	cm_node_t *		R_CreateAxialBSPTree( model: cm_model_t, node: cm_node_t, const bounds: idBounds ):cm_node_t {throw "placeholder";}
//	CreateAxialBSPTree ( model: cm_model_t, node: cm_node_t ): cm_node_t { throw "placeholder"; }
//	// creation of raw polygons
//	SetupHash( ):void { throw "placeholder"; }
//	ShutdownHash( ):void { throw "placeholder"; }
//	ClearHash ( bounds: idBounds ): void { throw "placeholder"; }
//	HashVec(vec:idVec3):number/*int*/ {throw "placeholder";}
//	GetVertex ( model: cm_model_t, v: idVec3, vertexNum: R<number> ): number /*int*/ { throw "placeholder"; }
//	GetEdge ( model: cm_model_t, v1: idVec3, v2: idVec3, /*int **/edgeNum: R<number>, /*int */v1num: number ): number /*int*/ { throw "placeholder"; }
//	CreatePolygon(model: cm_model_t, w: idFixedWinding, plane: idPlane, material: idMaterial, /*int*/ primitiveNum: number):void {throw "placeholder";}
//	PolygonFromWinding(model: cm_model_t, w: idFixedWinding, plane: idPlane, material: idMaterial , /*int */primitiveNum :number) :void { throw "placeholder"; }
//	CalculateEdgeNormals( model: cm_model_t, node: cm_node_t ):void { throw "placeholder"; }
//////	void			CreatePatchPolygons( model: cm_model_t, idSurface_Patch &mesh, const idMaterial *material, int primitiveNum ):void {throw "placeholder";}
//////	void			ConvertPatch( model: cm_model_t, const idMapPatch *patch, int primitiveNum ):void {throw "placeholder";}
//////	void			ConvertBrushSides( model: cm_model_t, const idMapBrush *mapBrush, int primitiveNum ):void {throw "placeholder";}
//////	void			ConvertBrush( model: cm_model_t, const idMapBrush *mapBrush, int primitiveNum ):void {throw "placeholder";}
//	PrintModelInfo( model: cm_model_t ):void { throw "placeholder"; }
//	AccumulateModelInfo ( model: cm_model_t ): void { throw "placeholder"; }
//////	void			RemapEdges( node: cm_node_t, int *edgeRemap ):void {throw "placeholder";}
//////	void			OptimizeArrays( model: cm_model_t ):void {throw "placeholder";}
//	FinishModel( model: cm_model_t ):void {throw "placeholder";}
//	BuildModels ( mapFile: idMapFile ): void { throw "placeholder"; }
//	FindModel( name:string ):number {throw "placeholder";}
//////	cm_model_t *	CollisionModelForMapEntity( const idMapEntity *mapEnt );	// brush/patch model from .map
//	LoadRenderModel ( fileName: string ): cm_model_t { throw "placeholder"; } // ASE/LWO models
//////	bool			TrmFromModel_r( idTraceModel &trm, node: cm_node_t );
//////	bool			TrmFromModel( const model: cm_model_t, idTraceModel &trm );
//////
//////private:			// CollisionMap_files.cpp
//////					// writing
//////	void			WriteNodes( idFile *fp, node: cm_node_t ):void {throw "placeholder";}
//////	int				CountPolygonMemory( node: cm_node_t ) const;
//////	void			WritePolygons( idFile *fp, node: cm_node_t ):void {throw "placeholder";}
//////	int				CountBrushMemory( node: cm_node_t ) const;
//////	void			WriteBrushes( idFile *fp, node: cm_node_t ):void {throw "placeholder";}
//////	void			WriteCollisionModel( idFile *fp, model: cm_model_t ):void {throw "placeholder";}
//////	void			WriteCollisionModelsToFile( const char *filename, int firstModel, int lastModel, unsigned int mapFileCRC ):void {throw "placeholder";}
//	// loading
//	ParseNodes(src: idLexer, model: cm_model_t, parent: cm_node_t ):cm_node_t { throw "placeholder"; }
//	ParseVertices ( src: idLexer, model: cm_model_t ): void { throw "placeholder"; }
//	ParseEdges ( src: idLexer, model: cm_model_t ): void { throw "placeholder"; }
//	ParsePolygons ( src: idLexer, model: cm_model_t ): void { throw "placeholder"; }
//	ParseBrushes ( src: idLexer, model: cm_model_t ): void { throw "placeholder"; }
//	ParseCollisionModel ( src: idLexer ): boolean { throw "placeholder"; }
//	LoadCollisionModelFile ( name: string, /*unsigned int */mapFileCRC: number ): boolean { throw "placeholder"; }

//////private:			// CollisionMap_debug
//	ContentsFromString ( $string: string ): number /*int*/ { throw "placeholder"; }
//////	const char *	StringFromContents( const int contents ) const;
////	void			DrawEdge( model: cm_model_t, int edgeNum, const idVec3 &origin, const idMat3 &axis );
////	void			DrawPolygon( model: cm_model_t, p: cm_polygon_t, const idVec3 &origin, const idMat3 &axis,
////								const idVec3 &viewOrigin );
////	void			DrawNodePolygons( model: cm_model_t, node: cm_node_t, const idVec3 &origin, const idMat3 &axis,
////								const idVec3 &viewOrigin, const float radius );
////
////private:			// collision map data
	mapName = new idStr;
	mapFileTime: number /*ID_TIME_T*/;
	loaded: number /*int*/;
	// for multi-check avoidance
	checkCount: number /*int*/;
	// models
	maxModels: number /*int*/;
	numModels: number /*int*/;
	models: cm_model_t[];
	// polygons and brush for trm model
	trmPolygons = newStructArray<cm_polygonRef_t>( cm_polygonRef_t, MAX_TRACEMODEL_POLYS );
	trmBrushes: cm_brushRef_t[] = [null];
	trmMaterial: idMaterial;
	// for data pruning
	numProcNodes: number /*int*/;
	procNodes: cm_procNode_t;
	// for retrieving contact points
	getContacts: boolean;
	contacts: contactInfo_t; //contactInfo_t *	
	maxContacts: number /*int*/;
	numContacts: number /*int*/;


/*
===============================================================================

Proc BSP tree for data pruning

===============================================================================
*/

/*
////================
////idCollisionModelManagerLocal::ParseProcNodes
////================
////*/
////void idCollisionModelManagerLocal::ParseProcNodes( idLexer *src ) {
////	var i:number;
////
////	src.ExpectTokenString( "{" );
////
////	numProcNodes = src.ParseInt();
////	if ( numProcNodes < 0 ) {
////		src.Error( "ParseProcNodes: bad numProcNodes" );
////	}
////	this.procNodes = (cm_procNode_t *)Mem_ClearedAlloc( numProcNodes * sizeof( cm_procNode_t ) );
////
////	for ( i = 0; i < numProcNodes; i++ ) {
////		cm_procNode_t *node;
////
////		node = &this.procNodes[i];
////
////		src.Parse1DMatrix( 4, node.plane.ToFloatPtr() );
////		node.children[0] = src.ParseInt();
////		node.children[1] = src.ParseInt();
////	}
////
////	src.ExpectTokenString( "}" );
////}
////
/////*
////================
////idCollisionModelManagerLocal::LoadProcBSP
////
////  FIXME: if the nodes would be at the start of the .proc file it would speed things up considerably
////================
////*/
////void idCollisionModelManagerLocal::LoadProcBSP( const char *name ) {
////	idStr filename;
////	idToken token;
////	idLexer *src;
////
////	// load it
////	filename = name;
////	filename.SetFileExtension( PROC_FILE_EXT );
////	src = new idLexer( filename, lexerFlags_t.LEXFL_NOSTRINGCONCAT | lexerFlags_t.LEXFL_NODOLLARPRECOMPILE );
////	if ( !src.IsLoaded() ) {
////		common.Warning( "idCollisionModelManagerLocal::LoadProcBSP: couldn't load %s", filename.c_str() );
////		delete src;
////		return;
////	}
////
////	if ( !src.ReadToken( &token ) || token.Icmp( PROC_FILE_ID ) ) {
////		common.Warning( "idCollisionModelManagerLocal::LoadProcBSP: bad id '%s' instead of '%s'", token.c_str(), PROC_FILE_ID );
////		delete src;
////		return;
////	}
////
////	// parse the file
////	while ( 1 ) {
////		if ( !src.ReadToken( &token ) ) {
////			break;
////		}
////
////		if ( token == "model" ) {
////			src.SkipBracedSection();
////			continue;
////		}
////
////		if ( token == "shadowModel" ) {
////			src.SkipBracedSection();
////			continue;
////		}
////
////		if ( token == "interAreaPortals" ) {
////			src.SkipBracedSection();
////			continue;
////		}
////
////		if ( token == "nodes" ) {
////			ParseProcNodes( src );
////			break;
////		}
////
////		src.Error( "idCollisionModelManagerLocal::LoadProcBSP: bad token \"%s\"", token.c_str() );
////	}
////
////	delete src;
////}
////
/*
===============================================================================

Free map

===============================================================================
*/

/*
================
idCollisionModelManagerLocal::Clear
================
*/
	Clear ( ): void {
		this.mapName.Clear ( );
		this.mapFileTime = 0;
		this.loaded = 0;
		this.checkCount = 0;
		this.maxModels = 0;
		this.numModels = 0;
		this.models = null;
		clearStructArray( this.trmPolygons ); //	memset( trmPolygons, 0, sizeof( trmPolygons ) );
		this.trmBrushes[0] = null;
		this.trmMaterial = null;
		this.numProcNodes = 0;
		this.procNodes = null;
		this.getContacts = false;
		this.contacts = null;
		this.maxContacts = 0;
		this.numContacts = 0;
	}
////
/////*
////================
////idCollisionModelManagerLocal::RemovePolygonReferences_r
////================
////*/
////void idCollisionModelManagerLocal::RemovePolygonReferences_r( node: cm_node_t, var p: cm_polygon_t ) {
////	var pref: cm_polygonRef_t;
////
////	while( node ) {
////		for ( pref = node.polygons; pref; pref = pref.next ) {
////			if ( pref.p == p ) {
////				pref.p = NULL;
////				// cannot return here because we can have links down the tree due to polygon merging
////				//return;
////			}
////		}
////		// if leaf node
////		if ( node.planeType == -1 ) {
////			break;
////		}
////		if ( p.bounds[0][node.planeType] > node.planeDist ) {
////			node = node.children[0];
////		}
////		else if ( p.bounds[1][node.planeType] < node.planeDist ) {
////			node = node.children[1];
////		}
////		else {
////			RemovePolygonReferences_r( node.children[1], p );
////			node = node.children[0];
////		}
////	}
////}
////
/////*
////================
////idCollisionModelManagerLocal::RemoveBrushReferences_r
////================
////*/
////void idCollisionModelManagerLocal::RemoveBrushReferences_r( node: cm_node_t, cm_brush_t *b ) {
////	cm_brushRef_t *bref;
////
////	while( node ) {
////		for ( bref = node.brushes; bref; bref = bref.next ) {
////			if ( bref.b == b ) {
////				bref.b = NULL;
////				return;
////			}
////		}
////		// if leaf node
////		if ( node.planeType == -1 ) {
////			break;
////		}
////		if ( b.bounds[0][node.planeType] > node.planeDist ) {
////			node = node.children[0];
////		}
////		else if ( b.bounds[1][node.planeType] < node.planeDist ) {
////			node = node.children[1];
////		}
////		else {
////			RemoveBrushReferences_r( node.children[1], b );
////			node = node.children[0];
////		}
////	}
////}
////
/////*
////================
////idCollisionModelManagerLocal::FreeNode
////================
////*/
////void idCollisionModelManagerLocal::FreeNode( node: cm_node_t ) {
////	// don't free the node here
////	// the nodes are allocated in blocks which are freed when the model is freed
////}

/*
================
idCollisionModelManagerLocal::FreePolygonReference
================
*/
	FreePolygonReference ( pref: cm_polygonRef_t ): void {
		// don't free the polygon reference here
		// the polygon references are allocated in blocks which are freed when the model is freed
	}

/////*
////================
////idCollisionModelManagerLocal::FreeBrushReference
////================
////*/
////void idCollisionModelManagerLocal::FreeBrushReference( cm_brushRef_t *bref ) {
////	// don't free the brush reference here
////	// the brush references are allocated in blocks which are freed when the model is freed
////}

/*
================
idCollisionModelManagerLocal::FreePolygon
================
*/
	FreePolygon ( model: cm_model_t, poly: cm_polygon_t ): void {
		model.numPolygons--;
		model.polygonMemory -= sizeof( cm_polygon_t ) + ( poly.numEdges - 1 ) * sizeofSingleItem( poly.edges );
		if ( model.polygonBlock == null ) {
			Mem_Free( poly );
		}
	}

/////*
////================
////idCollisionModelManagerLocal::FreeBrush
////================
////*/
////void idCollisionModelManagerLocal::FreeBrush( model: cm_model_t, cm_brush_t *brush ) {
////	model.numBrushes--;
////	model.brushMemory -= sizeof( cm_brush_t ) + ( brush.numPlanes - 1 ) * sizeof( brush.planes[0] );
////	if ( model.brushBlock == NULL ) {
////		Mem_Free( brush );
////	}
////}
////
/////*
////================
////idCollisionModelManagerLocal::FreeTree_r
////================
////*/
////void idCollisionModelManagerLocal::FreeTree_r( model: cm_model_t, cm_node_t *headNode, node: cm_node_t ) {
////	var pref: cm_polygonRef_t;
////	var p: cm_polygon_t;
////	cm_brushRef_t *bref;
////	cm_brush_t *b;
////
////	// free all polygons at this node
////	for ( pref = node.polygons; pref; pref = node.polygons ) {
////		p = pref.p;
////		if ( p ) {
////			// remove all other references to this polygon
////			RemovePolygonReferences_r( headNode, p );
////			FreePolygon( model, p );
////		}
////		node.polygons = pref.next;
////		FreePolygonReference( pref );
////	}
////	// free all brushes at this node
////	for ( bref = node.brushes; bref; bref = node.brushes ) {
////		b = bref.b;
////		if ( b ) {
////			// remove all other references to this brush
////			RemoveBrushReferences_r( headNode, b );
////			FreeBrush( model, b );
////		}
////		node.brushes = bref.next;
////		FreeBrushReference( bref );
////	}
////	// recurse down the tree
////	if ( node.planeType != -1 ) {
////		FreeTree_r( model, headNode, node.children[0] );
////		node.children[0] = NULL;
////		FreeTree_r( model, headNode, node.children[1] );
////		node.children[1] = NULL;
////	}
////	FreeNode( node );
////}
////
/////*
////================
////idCollisionModelManagerLocal::FreeModel
////================
////*/
////void idCollisionModelManagerLocal::FreeModel( model: cm_model_t ) {
////	cm_polygonRefBlock_t *polygonRefBlock, *nextPolygonRefBlock;
////	cm_brushRefBlock_t *brushRefBlock, *nextBrushRefBlock;
////	cm_nodeBlock_t *nodeBlock, *nextNodeBlock;
////
////	// free the tree structure
////	if ( model.node ) {
////		FreeTree_r( model, model.node, model.node );
////	}
////	// free blocks with polygon references
////	for ( polygonRefBlock = model.polygonRefBlocks; polygonRefBlock; polygonRefBlock = nextPolygonRefBlock ) {
////		nextPolygonRefBlock = polygonRefBlock.next;
////		Mem_Free( polygonRefBlock );
////	}
////	// free blocks with brush references
////	for ( brushRefBlock = model.brushRefBlocks; brushRefBlock; brushRefBlock = nextBrushRefBlock ) {
////		nextBrushRefBlock = brushRefBlock.next;
////		Mem_Free( brushRefBlock );
////	}
////	// free blocks with nodes
////	for ( nodeBlock = model.nodeBlocks; nodeBlock; nodeBlock = nextNodeBlock ) {
////		nextNodeBlock = nodeBlock.next;
////		Mem_Free( nodeBlock );
////	}
////	// free block allocated polygons
////	Mem_Free( model.polygonBlock );
////	// free block allocated brushes
////	Mem_Free( model.brushBlock );
////	// free edges
////	Mem_Free( model.edges );
////	// free vertices
////	Mem_Free( model.vertices );
////	// free the model
////	delete model;
////}
////
/*
================
idCollisionModelManagerLocal::FreeMap
================
*/
	FreeMap ( ): void {
		todoThrow ( );
		//var i: number;

		//if ( !this.loaded ) {
		//	this.Clear ( );
		//	return;
		//}

		//for ( i = 0; i < this.maxModels; i++ ) {
		//	if ( !this.models[i] ) {
		//		continue;
		//	}
		//	this.FreeModel( this.models[i] );
		//}

		//this.FreeTrmModelStructure ( );

		//Mem_Free( this.models );

		//this.Clear ( );

		//this.ShutdownHash ( );
	}
////
/////*
////================
////idCollisionModelManagerLocal::FreeTrmModelStructure
////================
////*/
////void idCollisionModelManagerLocal::FreeTrmModelStructure( ) {
////	var i:number;
////
////	assert( this.models );
////	if ( !this.models[MAX_SUBMODELS] ) {
////		return;
////	}
////
////	for ( i = 0; i < MAX_TRACEMODEL_POLYS; i++ ) {
////		FreePolygon( this.models[MAX_SUBMODELS], this.trmPolygons[i].p );
////	}
////	FreeBrush( this.models[MAX_SUBMODELS], this.trmBrushes[0].b );
////
////	this.models[MAX_SUBMODELS].node.polygons = NULL;
////	this.models[MAX_SUBMODELS].node.brushes = NULL;
////	FreeModel( this.models[MAX_SUBMODELS] );
////}
////

/*
===============================================================================

Edge normals

===============================================================================
*/

/*
================
idCollisionModelManagerLocal::CalculateEdgeNormals
================
*/
	static SHARP_EDGE_DOT = -0.7;

	CalculateEdgeNormals ( model: cm_model_t, node: cm_node_t ): void {
		var pref: cm_polygonRef_t;
		var p: cm_polygon_t;
		var edge: cm_edge_t;
		var /*float */dot: number, s: number;
		var /*int */i: number, edgeNum: number;
		var dir = new idVec3;

		while ( 1 ) {
			for ( pref = node.polygons; pref; pref = pref.next ) {
				p = pref.p;
				// if we checked this polygon already
				if ( p.checkcount == this.checkCount ) {
					continue;
				}
				p.checkcount = this.checkCount;

				for ( i = 0; i < p.numEdges; i++ ) {
					edgeNum = p.edges[i];
					edge = model.edges[abs( edgeNum )]; // + abs( edgeNum );
					if ( edge.normal[0] == 0.0 && edge.normal[1] == 0.0 && edge.normal[2] == 0.0 ) {
						// if the edge is only used by this polygon
						if ( edge.numUsers == 1 ) {
							dir.equals( model.vertices[edge.vertexNum[edgeNum < 0 ? 1 : 0]].p.opSubtraction( model.vertices[edge.vertexNum[edgeNum > 0 ? 1 : 0]].p ) );
							edge.normal.equals( p.plane.Normal ( ).Cross( dir ) );
							edge.normal.Normalize ( );
						} else {
							// the edge is used by more than one polygon
							edge.normal.equals( p.plane.Normal ( ) );
						}
					} else {
						dot = edge.normal.timesVec( p.plane.Normal ( ) );
						// if the two planes make a very sharp edge
						if ( dot < idCollisionModelManagerLocal.SHARP_EDGE_DOT ) {
							// max length normal pointing outside both polygons
							dir.equals( model.vertices[edge.vertexNum[edgeNum > 0 ? 1 : 0]].p.opSubtraction( model.vertices[edge.vertexNum[edgeNum < 0 ? 1 : 0]].p ) );
							edge.normal.equals( edge.normal.Cross( dir ).opAddition( p.plane.Normal ( ).Cross( dir.opUnaryMinus ( ) ) ) );
							edge.normal.opMultiplicationAssignment( ( 0.5 / ( 0.5 + 0.5 * idCollisionModelManagerLocal.SHARP_EDGE_DOT ) ) / edge.normal.Length ( ) );
							model.numSharpEdges++;
						} else {
							s = 0.5 / ( 0.5 + 0.5 * dot );
							edge.normal.equals( idVec3.times( s, edge.normal.opAddition( p.plane.Normal ( ) ) ) );
						}
					}
				}
			}
			// if leaf node
			if ( node.planeType == -1 ) {
				break;
			}
			this.CalculateEdgeNormals( model, node.children[1] );
			node = node.children[0];
		}
	}

/*
===============================================================================

Trace model to general collision model

===============================================================================
*/

/*
================
idCollisionModelManagerLocal::AllocModel
================
*/
	AllocModel ( ): cm_model_t {
		var model: cm_model_t;

		model = new cm_model_t;
		model.contents = 0;
		model.isConvex = false;
		model.maxVertices = 0;
		model.numVertices = 0;
		model.vertices = null;
		model.maxEdges = 0;
		model.numEdges = 0;
		model.edges = null;
		model.node = null;
		model.nodeBlocks = null;
		model.polygonRefBlocks = null;
		model.brushRefBlocks = null;
		model.polygonBlock = null;
		model.brushBlock = null;
		model.numPolygons = model.polygonMemory =
			model.numBrushes = model.brushMemory =
			model.numNodes = model.numBrushRefs =
			model.numPolygonRefs = model.numInternalEdges =
			model.numSharpEdges = model.numRemovedPolys =
			model.numMergedPolys = model.usedMemory = 0;

		return model;
	}

/*
================
idCollisionModelManagerLocal::AllocNode
================
*/
	AllocNode ( model: cm_model_t, /*int */blockSize: number ): cm_node_t {
		var i: number;
		var node: cm_node_t, nodeIdx = 0;
		var nodeBlock: cm_nodeBlock_t;

		if ( !model.nodeBlocks || !model.nodeBlocks.nextNode ) {
			nodeBlock = new cm_nodeBlock_t( blockSize ); //(cm_nodeBlock_t *) Mem_ClearedAlloc( sizeof( cm_nodeBlock_t ) + blockSize * sizeof(cm_node_t) );
			nodeBlock.nextNodePtr = 0; //nodeBlock.nextNode //(cm_node_t *) ( ( (byte *) nodeBlock ) + sizeof( cm_nodeBlock_t ) );
			nodeBlock.next = model.nodeBlocks;
			model.nodeBlocks = nodeBlock;
			node = nodeBlock.nextNode;
			for ( i = 0; i < blockSize - 1; i++ ) {
				node.parent = nodeBlock.blocks[++nodeIdx];
				node = node.parent;
			}
			node.parent = null;
		}

		node = model.nodeBlocks.nextNode;
		model.nodeBlocks.nextNode = node.parent; //???????
		node.parent = null;

		return node;
	}

/*
================
idCollisionModelManagerLocal::AllocPolygonReference
================
*/
	AllocPolygonReference ( model: cm_model_t, /*int */blockSize: number ): cm_polygonRef_t {
		var i: number;
		var pref: cm_polygonRef_t, prefIdx = 0;
		var prefBlock: cm_polygonRefBlock_t;

		if ( !model.polygonRefBlocks || !model.polygonRefBlocks.nextRef ) {
			prefBlock = new cm_polygonRefBlock_t( blockSize ); //(cm_polygonRefBlock_t *) Mem_Alloc( sizeof( cm_polygonRefBlock_t ) + blockSize * sizeof(cm_polygonRef_t) );
			prefBlock.nextRefPtr = 0; //(cm_polygonRef_t *) ( ( (byte *) prefBlock ) + sizeof( cm_polygonRefBlock_t ) );
			prefBlock.next = model.polygonRefBlocks;
			model.polygonRefBlocks = prefBlock;
			pref = prefBlock.nextRef;
			for ( i = 0; i < blockSize - 1; i++ ) {
				pref.next = prefBlock.blocks[++prefIdx];
				assert( pref.next );
				pref = pref.next;
			}
			pref.next = null;
		}

		pref = model.polygonRefBlocks.nextRef;
		model.polygonRefBlocks.nextRef = pref.next;

		return pref;
	}

/*
================
idCollisionModelManagerLocal::AllocBrushReference
================
*/
	AllocBrushReference ( model: cm_model_t, /*int*/ blockSize: number ): cm_brushRef_t {
		var i: number;
		var bref: cm_brushRef_t, brefIdx = 0;
		var brefBlock: cm_brushRefBlock_t;

		if ( !model.brushRefBlocks || !model.brushRefBlocks.nextRef ) {
			brefBlock = new cm_brushRefBlock_t( blockSize ); //(cm_brushRefBlock_t *) Mem_Alloc( sizeof(cm_brushRefBlock_t) + blockSize * sizeof(cm_brushRef_t) );
			brefBlock.nextRefPtr = 0; //(cm_brushRef_t *) ( ( (byte *) brefBlock ) + sizeof(cm_brushRefBlock_t) );
			brefBlock.next = model.brushRefBlocks;
			model.brushRefBlocks = brefBlock;
			bref = brefBlock.nextRef;
			for ( i = 0; i < blockSize - 1; i++ ) {
				bref.next = brefBlock.blocks[++brefIdx];
				assert( bref.next );
				bref = bref.next;
			}
			bref.next = null;
		}

		bref = model.brushRefBlocks.nextRef;
		model.brushRefBlocks.nextRef = bref.next;

		return bref;
	}

/*
================
idCollisionModelManagerLocal::AllocPolygon
================
*/
	AllocPolygon ( model: cm_model_t, /*int */numEdges: number ): cm_polygon_t {
		var poly: cm_polygon_t;
		var /*int */size: number;

		size = sizeof( cm_polygon_t ) + ( numEdges - 1 ) * 4 /*sizeof( poly.edges[0] )*/;
		model.numPolygons++;
		model.polygonMemory += size;
		if ( model.polygonBlock && model.polygonBlock.bytesRemaining >= size ) {
			poly = /*(cm_polygon_t *)*/ model.polygonBlock.next;
			poly.edges = new Int32Array( numEdges ); // manually allocate, it is already done in original
			model.polygonBlock.nextPtr += 1; //model.polygonBlock.next += size;
			model.polygonBlock.bytesRemaining -= size;
		} else {
			poly = new cm_polygon_t; // (cm_polygon_t *) Mem_Alloc( size );
			poly.edges = new Int32Array( numEdges );
		}
		return poly;
	}

/*
================
idCollisionModelManagerLocal::AllocBrush
================
*/
	AllocBrush ( model: cm_model_t, /*int */numPlanes: number ): cm_brush_t {
		var brush: cm_brush_t;
		var /*int */size: number;

		size = sizeof( cm_brush_t ) + ( numPlanes - 1 ) * 16 /*sizeof( brush.planes[0] )*/;
		model.numBrushes++;
		model.brushMemory += size;
		if ( model.brushBlock && model.brushBlock.bytesRemaining >= size ) {
			brush = /*(cm_brush_t *)*/ <cm_brush_t>model.brushBlock.next;
			brush.planes = newStructArray<idPlane>( idPlane, numPlanes ); // manually allocate, it is already done in original
			model.brushBlock.nextPtr += 1; //next += size;
			model.brushBlock.bytesRemaining -= size;
		} else {
			brush = new cm_brush_t; // (cm_brush_t *) Mem_Alloc( size );
			brush.planes = newStructArray<idPlane>( idPlane, numPlanes );
		}
		return brush;
	}

/*
================
idCollisionModelManagerLocal::AddPolygonToNode
================
*/
	AddPolygonToNode ( model: cm_model_t, node: cm_node_t, p: cm_polygon_t ): void {
		var pref: cm_polygonRef_t;

		pref = this.AllocPolygonReference( model, model.numPolygonRefs < REFERENCE_BLOCK_SIZE_SMALL ? REFERENCE_BLOCK_SIZE_SMALL : REFERENCE_BLOCK_SIZE_LARGE );
		pref.p = p;
		pref.next = node.polygons;
		node.polygons = pref;
		model.numPolygonRefs++;
	}

/*
================
idCollisionModelManagerLocal::AddBrushToNode
================
*/
	AddBrushToNode ( model: cm_model_t, node: cm_node_t, b: cm_brush_t ): void {
		var bref: cm_brushRef_t;

		bref = this.AllocBrushReference( model, model.numBrushRefs < REFERENCE_BLOCK_SIZE_SMALL ? REFERENCE_BLOCK_SIZE_SMALL : REFERENCE_BLOCK_SIZE_LARGE );
		bref.b = b;
		bref.next = node.brushes;
		node.brushes = bref;
		model.numBrushRefs++;
	}

/*
================
idCollisionModelManagerLocal::SetupTrmModelStructure
================
*/
	SetupTrmModelStructure ( ): void {
		var /*int */i: number;
		var node: cm_node_t;
		var model: cm_model_t;

		// setup model
		model = this.AllocModel ( );

		assert( this.models );
		this.models[MAX_SUBMODELS] = model;
		// create node to hold the collision data
		node = <cm_node_t > this.AllocNode( model, 1 );
		node.planeType = -1;
		model.node = node;
		// allocate vertex and edge arrays
		model.numVertices = 0;
		model.maxVertices = MAX_TRACEMODEL_VERTS;
		model.vertices = newStructArray<cm_vertex_t>( cm_vertex_t, model.maxVertices ); //(cm_vertex_t *) Mem_ClearedAlloc( model.maxVertices * sizeof(cm_vertex_t) );
		model.numEdges = 0;
		model.maxEdges = MAX_TRACEMODEL_EDGES + 1;
		model.edges = newStructArray<cm_edge_t>( cm_edge_t, model.maxEdges ); // (cm_edge_t *) Mem_ClearedAlloc( model.maxEdges * sizeof(cm_edge_t) );
		// create a material for the trace model polygons
		this.trmMaterial = declManager.FindMaterial( "_tracemodel", false );
		if ( !this.trmMaterial ) {
			common.FatalError( "_tracemodel material not found" );
		}

		// allocate polygons
		for ( i = 0; i < MAX_TRACEMODEL_POLYS; i++ ) {
			this.trmPolygons[i] = this.AllocPolygonReference( model, MAX_TRACEMODEL_POLYS );
			this.trmPolygons[i].p = this.AllocPolygon( model, MAX_TRACEMODEL_POLYEDGES );
			this.trmPolygons[i].p.bounds.Clear ( );
			this.trmPolygons[i].p.plane.Zero ( );
			this.trmPolygons[i].p.checkcount = 0;
			this.trmPolygons[i].p.contents = -1; // all contents
			this.trmPolygons[i].p.material = this.trmMaterial;
			this.trmPolygons[i].p.numEdges = 0;
		}
		// allocate brush for position test
		this.trmBrushes[0] = this.AllocBrushReference( model, 1 );
		this.trmBrushes[0].b = this.AllocBrush( model, MAX_TRACEMODEL_POLYS );
		this.trmBrushes[0].b.primitiveNum = 0;
		this.trmBrushes[0].b.bounds.Clear ( );
		this.trmBrushes[0].b.checkcount = 0;
		this.trmBrushes[0].b.contents = -1; // all contents
		this.trmBrushes[0].b.numPlanes = 0;
	}

/////*
////================
////idCollisionModelManagerLocal::SetupTrmModel
////
////Trace models (item boxes, etc) are converted to collision models on the fly, using the last model slot
////as a reusable temporary buffer
////================
////*/
////cmHandle_t idCollisionModelManagerLocal::SetupTrmModel( const idTraceModel &trm, material:idMaterial  ) {
////	var /*int */i:number, j:number;
////	cm_vertex_t *vertex;
////	cm_edge_t *edge;
////	cm_polygon_t *poly;
////	model: cm_model_t;
////	const traceModelVert_t *trmVert;
////	const traceModelEdge_t *trmEdge;
////	const traceModelPoly_t *trmPoly;
////
////	assert( this.models );
////
////	if ( material == NULL ) {
////		material = this.trmMaterial;
////	}
////
////	model = this.models[MAX_SUBMODELS];
////	model.node.brushes = NULL;
////	model.node.polygons = NULL;
////	// if not a valid trace model
////	if ( trm.type == TRM_INVALID || !trm.numPolys ) {
////		return TRACE_MODEL_HANDLE;
////	}
////	// vertices
////	model.numVertices = trm.numVerts;
////	vertex = model.vertices;
////	trmVert = trm.verts;
////	for ( i = 0; i < trm.numVerts; i++, vertex++, trmVert++ ) {
////		vertex.p = *trmVert;
////		vertex.sideSet = 0;
////	}
////	// edges
////	model.numEdges = trm.numEdges;
////	edge = model.edges + 1;
////	trmEdge = trm.edges + 1;
////	for ( i = 0; i < trm.numEdges; i++, edge++, trmEdge++ ) {
////		edge.vertexNum[0] = trmEdge.v[0];
////		edge.vertexNum[1] = trmEdge.v[1];
////		edge.normal = trmEdge.normal;
////		edge.internal = false;
////		edge.sideSet = 0;
////	}
////	// polygons
////	model.numPolygons = trm.numPolys;
////	trmPoly = trm.polys;
////	for ( i = 0; i < trm.numPolys; i++, trmPoly++ ) {
////		poly = this.trmPolygons[i].p;
////		poly.numEdges = trmPoly.numEdges;
////		for ( j = 0; j < trmPoly.numEdges; j++ ) {
////			poly.edges[j] = trmPoly.edges[j];
////		}
////		poly.plane.SetNormal( trmPoly.normal );
////		poly.plane.SetDist( trmPoly.dist );
////		poly.bounds = trmPoly.bounds;
////		poly.material = material;
////		// link polygon at node
////		this.trmPolygons[i].next = model.node.polygons;
////		model.node.polygons = this.trmPolygons[i];
////	}
////	// if the trace model is convex
////	if ( trm.isConvex ) {
////		// setup brush for position test
////		this.trmBrushes[0].b.numPlanes = trm.numPolys;
////		for ( i = 0; i < trm.numPolys; i++ ) {
////			this.trmBrushes[0].b.planes[i] = this.trmPolygons[i].p.plane;
////		}
////		this.trmBrushes[0].b.bounds = trm.bounds;
////		// link brush at node
////		this.trmBrushes[0].next = model.node.brushes;
////		model.node.brushes = this.trmBrushes[0];
////	}
////	// model bounds
////	model.bounds = trm.bounds;
////	// convex
////	model.isConvex = trm.isConvex;
////
////	return TRACE_MODEL_HANDLE;
////}

/*
===============================================================================

Optimisation, removal of polygons contained within brushes or solid

===============================================================================
*/

/*
============
idCollisionModelManagerLocal::R_ChoppedAwayByProcBSP
============
*/
	R_ChoppedAwayByProcBSP ( /*int*/ nodeNum: number, w: idFixedWinding, normal: idVec3, origin: idVec3, /*float */radius: number ): number /*int*/ {
		var /*int */res: number;
		var back = new idFixedWinding;
		var node: cm_procNode_t;
		var /*float */dist: number;
		dlog( DEBUG_CM, "R_ChoppedAwayByProcBSP %i\n", nodeNum );
		do {
			node = this.procNodes[nodeNum];
			dist = node.plane.Normal ( ).timesVec( origin ) + node.plane[3];

			if ( dist > radius ) {
				res = SIDE_FRONT;
			} else if ( dist < -radius ) {
				res = SIDE_BACK;
			} else {
				res = w.Split( back, node.plane, CHOP_EPSILON );
			}
			if ( res == SIDE_FRONT ) {
				nodeNum = node.children[0];
			} else if ( res == SIDE_BACK ) {
				nodeNum = node.children[1];
			} else if ( res == SIDE_ON ) {
				// continue with the side the winding faces
				if ( node.plane.Normal ( ).timesVec( normal ) > 0.0 ) {
					nodeNum = node.children[0];
				} else {
					nodeNum = node.children[1];
				}
			} else {
				// if either node is not solid
				if ( node.children[0] < 0 || node.children[1] < 0 ) {
					return 0 /*false*/;
				}
				// only recurse if the node is not solid
				if ( node.children[1] > 0 ) {
					if ( !this.R_ChoppedAwayByProcBSP( node.children[1], back, normal, origin, radius ) ) {
						return 0 /*false*/;
					}
				}
				nodeNum = node.children[0];
			}
		} while ( nodeNum > 0 );
		if ( nodeNum < 0 ) {
			return 0 /*false*/;
		}
		return 1 /*true*/;
	}

/*
============
idCollisionModelManagerLocal::ChoppedAwayByProcBSP
============
*/
	ChoppedAwayByProcBSP ( w: idFixedWinding, plane: idPlane, /*int */contents: number ): number {
		todoThrow ( );
		return -99999999999999999999;
		//var neww = new idFixedWinding;
		//var bounds = new idBounds ;
		//var/*float */radius:number;
		//var origin = new idVec3 ;

		//// if the .proc file has no BSP tree
		//if ( this.procNodes == null ) {
		//	return 0/*false*/;
		//}
		//// don't chop if the polygon is not solid
		//if (!(contents & contentsFlags_t.CONTENTS_SOLID) ) {
		//	return 0/*false*/;
		//}
		//// make a local copy of the winding
		//neww = w;
		//neww.GetBounds( bounds );
		//origin = (bounds[1] - bounds[0]) * 0.5;
		//radius = origin.Length() + CHOP_EPSILON;
		//origin = bounds[0] + origin;
		////
		//return R_ChoppedAwayByProcBSP( 0, &neww, plane.Normal(), origin, radius );
	}

/*
=============
idCollisionModelManagerLocal::ChopWindingWithBrush

  returns the least number of winding fragments outside the brush
=============
*/
	ChopWindingListWithBrush ( list: cm_windingList_t, b: cm_brush_t ): void {
		var /*int */i: number, k: number, res: number, startPlane: number, planeNum: number, bestNumWindings: number;
		var back = new idFixedWinding, front = new idFixedWinding;
		var plane = new idPlane;
		var chopped: boolean;
		var sidedness = new Int32Array( MAX_POINTS_ON_WINDING );
		var /*float */dist: number;

		if ( b.numPlanes > MAX_POINTS_ON_WINDING ) {
			return;
		}

		// get sidedness for the list of windings
		for ( i = 0; i < b.numPlanes; i++ ) {
			plane.opEquals( b.planes[i].opUnaryMinus ( ) );

			dist = plane.Distance( list.origin );
			if ( dist > list.radius ) {
				sidedness[i] = SIDE_FRONT;
			} else if ( dist < -list.radius ) {
				sidedness[i] = SIDE_BACK;
			} else {
				sidedness[i] = list.bounds.PlaneSide( plane );
				if ( sidedness[i] == PLANESIDE_FRONT ) {
					sidedness[i] = SIDE_FRONT;
				} else if ( sidedness[i] == PLANESIDE_BACK ) {
					sidedness[i] = SIDE_BACK;
				} else {
					sidedness[i] = SIDE_CROSS;
				}
			}
		}

		cm_outList.numWindings = 0;
		for ( k = 0; k < list.numWindings; k++ ) {
			//
			startPlane = 0;
			bestNumWindings = 1 + b.numPlanes;
			chopped = false;
			do {
				front.opEquals( list.w[k] );
				cm_tmpList.numWindings = 0;
				for ( planeNum = startPlane, i = 0; i < b.numPlanes; i++, planeNum++ ) {

					if ( planeNum >= b.numPlanes ) {
						planeNum = 0;
					}

					res = sidedness[planeNum];

					if ( res == SIDE_CROSS ) {
						plane.opEquals( b.planes[planeNum].opUnaryMinus ( ) );
						res = front.Split( back, plane, CHOP_EPSILON );
					}

					// NOTE:	disabling this can create gaps at places where Z-fighting occurs
					//			Z-fighting should not occur but what if there is a decal brush side
					//			with exactly the same size as another brush side ?
					// only leave windings on a brush if the winding plane and brush side plane face the same direction
					if ( res == SIDE_ON && list.primitiveNum >= 0 && ( list.normal.timesVec( b.planes[planeNum].Normal ( ) ) ) > 0 ) {
						// return because all windings in the list will be on this brush side plane
						return;
					}

					if ( res == SIDE_BACK ) {
						if ( cm_outList.numWindings >= MAX_WINDING_LIST ) {
							common.Warning( "idCollisionModelManagerLocal::ChopWindingWithBrush: primitive %d more than %d windings", list.primitiveNum, MAX_WINDING_LIST );
							return;
						}
						// winding and brush didn't intersect, store the original winding
						cm_outList.w[cm_outList.numWindings] = list.w[k];
						cm_outList.numWindings++;
						chopped = false;
						break;
					}

					if ( res == SIDE_CROSS ) {
						if ( cm_tmpList.numWindings >= MAX_WINDING_LIST ) {
							common.Warning( "idCollisionModelManagerLocal::ChopWindingWithBrush: primitive %d more than %d windings", list.primitiveNum, MAX_WINDING_LIST );
							return;
						}
						// store the front winding in the temporary list
						cm_tmpList.w[cm_tmpList.numWindings].opEquals( back );
						cm_tmpList.numWindings++;
						chopped = true;
					}

					// if already found a start plane which generates less fragments
					if ( cm_tmpList.numWindings >= bestNumWindings ) {
						break;
					}
				}

				// find the best start plane to get the least number of fragments outside the brush
				if ( cm_tmpList.numWindings < bestNumWindings ) {
					bestNumWindings = cm_tmpList.numWindings;
					// store windings from temporary list in the out list
					for ( i = 0; i < cm_tmpList.numWindings; i++ ) {
						if ( cm_outList.numWindings + i >= MAX_WINDING_LIST ) {
							common.Warning( "idCollisionModelManagerLocal::ChopWindingWithBrush: primitive %d more than %d windings", list.primitiveNum, MAX_WINDING_LIST );
							return;
						}
						cm_outList.w[cm_outList.numWindings + i] = cm_tmpList.w[i];
					}
					// if only one winding left then we can't do any better
					if ( bestNumWindings == 1 ) {
						break;
					}
				}

				// try the next start plane
				startPlane++;

			} while ( chopped && startPlane < b.numPlanes );
			//
			if ( chopped ) {
				cm_outList.numWindings += bestNumWindings;
			}
		}
		for ( k = 0; k < cm_outList.numWindings; k++ ) {
			list.w[k] = cm_outList.w[k];
		}
		list.numWindings = cm_outList.numWindings;
	}

/*
============
idCollisionModelManagerLocal::R_ChopWindingListWithTreeBrushes
============
*/
	R_ChopWindingListWithTreeBrushes ( list: cm_windingList_t, node: cm_node_t ): void {
		var i: number;
		var bref: cm_brushRef_t;
		var b: cm_brush_t;

		while ( 1 ) {
			for ( bref = node.brushes; bref; bref = bref.next ) {
				b = bref.b;
				// if we checked this brush already
				if ( b.checkcount == this.checkCount ) {
					continue;
				}
				b.checkcount = this.checkCount;
				// if the windings in the list originate from this brush
				if ( b.primitiveNum == list.primitiveNum ) {
					continue;
				}
				// if brush has a different contents
				if ( b.contents != list.contents ) {
					continue;
				}
				// brush bounds and winding list bounds should overlap
				for ( i = 0; i < 3; i++ ) {
					if ( list.bounds[0][i] > b.bounds[1][i] ) {
						break;
					}
					if ( list.bounds[1][i] < b.bounds[0][i] ) {
						break;
					}
				}
				if ( i < 3 ) {
					continue;
				}
				// chop windings in the list with brush
				this.ChopWindingListWithBrush( list, b );
				// if all windings are chopped away we're done
				if ( !list.numWindings ) {
					return;
				}
			}
			// if leaf node
			if ( node.planeType == -1 ) {
				break;
			}
			if ( list.bounds[0][node.planeType] > node.planeDist ) {
				node = node.children[0];
			} else if ( list.bounds[1][node.planeType] < node.planeDist ) {
				node = node.children[1];
			} else {
				this.R_ChopWindingListWithTreeBrushes( list, node.children[1] );
				if ( !list.numWindings ) {
					return;
				}
				node = node.children[0];
			}
		}
	}

/*
============
idCollisionModelManagerLocal::WindingOutsideBrushes

  Returns one winding which is not fully contained in brushes.
  We always favor less polygons over a stitched world.
  If the winding is partly contained and the contained pieces can be chopped off
  without creating multiple winding fragments then the chopped winding is returned.
============
*/
	WindingOutsideBrushes ( w: idFixedWinding, plane: idPlane, /*int*/ contents: number, /*int*/ primitiveNum: number, headNode: cm_node_t ): idFixedWinding {
		var /*int */i: number, windingLeft: number;

		cm_windingList.bounds.Clear ( );
		for ( i = 0; i < w.GetNumPoints ( ); i++ ) {
			cm_windingList.bounds.AddPoint( ( w )[i].ToVec3 ( ) );
		}

		cm_windingList.origin.equals( cm_windingList.bounds[1].opSubtraction( cm_windingList.bounds[0] ).timesFloat( 0.5 ) );
		cm_windingList.radius = cm_windingList.origin.Length ( ) + CHOP_EPSILON;
		cm_windingList.origin.equals( cm_windingList.bounds[0].opAddition( cm_windingList.origin ) );
		cm_windingList.bounds[0].opSubtractionAssignment( new idVec3( CHOP_EPSILON, CHOP_EPSILON, CHOP_EPSILON ) );
		cm_windingList.bounds[1].opAdditionAssignment( new idVec3( CHOP_EPSILON, CHOP_EPSILON, CHOP_EPSILON ) );

		cm_windingList.w[0].opEquals( w );
		cm_windingList.numWindings = 1;
		cm_windingList.normal.equals( plane.Normal ( ) );
		cm_windingList.contents = contents;
		cm_windingList.primitiveNum = primitiveNum;
		//
		this.checkCount++;
		this.R_ChopWindingListWithTreeBrushes( cm_windingList, headNode );
		//
		if ( !cm_windingList.numWindings ) {
			return null;
		}
		if ( cm_windingList.numWindings == 1 ) {
			return cm_windingList.w[0];
		}
		// if not the world model
		if ( this.numModels != 0 ) {
			return w;
		}
		// check if winding fragments would be chopped away by the proc BSP tree
		windingLeft = -1;
		for ( i = 0; i < cm_windingList.numWindings; i++ ) {
			if ( !this.ChoppedAwayByProcBSP( cm_windingList.w[i], plane, contents ) ) {
				if ( windingLeft >= 0 ) {
					return w;
				}
				windingLeft = i;
			}
		}
		if ( windingLeft >= 0 ) {
			return cm_windingList.w[windingLeft];
		}
		return null;
	}

/*
===============================================================================

Merging polygons

===============================================================================
*/

/*
=============
idCollisionModelManagerLocal::ReplacePolygons

  does not allow for a node to have multiple references to the same polygon
=============
*/
	ReplacePolygons ( model: cm_model_t, node: cm_node_t, p1: cm_polygon_t, p2: cm_polygon_t, newp: cm_polygon_t ): void {
		var pref: cm_polygonRef_t, lastpref: cm_polygonRef_t, nextpref: cm_polygonRef_t;
		var p: cm_polygon_t;
		var linked: boolean;

		while ( 1 ) {
			linked = false;
			lastpref = null;
			for ( pref = node.polygons; pref; pref = nextpref ) {
				nextpref = pref.next;
				//
				p = pref.p;
				// if this polygon reference should change
				if ( p == p1 || p == p2 ) {
					// if the new polygon is already linked at this node
					if ( linked ) {
						if ( lastpref ) {
							lastpref.next = nextpref;
						} else {
							node.polygons = nextpref;
						}
						this.FreePolygonReference( pref );
						model.numPolygonRefs--;
					} else {
						pref.p = newp;
						linked = true;
						lastpref = pref;
					}
				} else {
					lastpref = pref;
				}
			}
			// if leaf node
			if ( node.planeType == -1 ) {
				break;
			}
			if ( p1.bounds[0][node.planeType] > node.planeDist && p2.bounds[0][node.planeType] > node.planeDist ) {
				node = node.children[0];
			} else if ( p1.bounds[1][node.planeType] < node.planeDist && p2.bounds[1][node.planeType] < node.planeDist ) {
				node = node.children[1];
			} else {
				this.ReplacePolygons( model, node.children[1], p1, p2, newp );
				node = node.children[0];
			}
		}
	}

/*
=============
idCollisionModelManagerLocal::TryMergePolygons
=============
*/
	static CONTINUOUS_EPSILON =0.005;
	static NORMAL_EPSILON =0.01;

	TryMergePolygons ( model: cm_model_t, p1: cm_polygon_t, p2: cm_polygon_t ): cm_polygon_t {
		var /*int */i: number, j: number, nexti: number, prevj: number;
		var /*int */p1BeforeShare: number, p1AfterShare: number, p2BeforeShare: number, p2AfterShare: number;
		var /*int */newEdges = new Int32Array( CM_MAX_POLYGON_EDGES ), newNumEdges: number;
		var /*int */edgeNum: number, edgeNum1: number, edgeNum2: number, newEdgeNum1 = new R<number> ( ), newEdgeNum2 = new R<number> ( );
		var edge: cm_edge_t;
		var newp: cm_polygon_t;
		var delta = new idVec3, normal = new idVec3;
		var /*float */dot: number;
		var keep1: boolean, keep2: boolean;

		if ( p1.material != p2.material ) {
			return null;
		}
		if ( idMath.Fabs( p1.plane.Dist ( ) - p2.plane.Dist ( ) ) > idCollisionModelManagerLocal.NORMAL_EPSILON ) {
			return null;
		}
		for ( i = 0; i < 3; i++ ) {
			if ( idMath.Fabs( p1.plane.Normal ( )[i] - p2.plane.Normal ( )[i] ) > idCollisionModelManagerLocal.NORMAL_EPSILON ) {
				return null;
			}
			if ( p1.bounds[0][i] > p2.bounds[1][i] ) {
				return null;
			}
			if ( p1.bounds[1][i] < p2.bounds[0][i] ) {
				return null;
			}
		}
		// this allows for merging polygons with multiple shared edges
		// polygons with multiple shared edges probably never occur tho ;)
		p1BeforeShare = p1AfterShare = p2BeforeShare = p2AfterShare = -1;
		for ( i = 0; i < p1.numEdges; i++ ) {
			nexti = ( i + 1 ) % p1.numEdges;
			for ( j = 0; j < p2.numEdges; j++ ) {
				prevj = ( j + p2.numEdges - 1 ) % p2.numEdges;
				//
				if ( abs( p1.edges[i] ) != abs( p2.edges[j] ) ) {
					// if the next edge of p1 and the previous edge of p2 are the same
					if ( abs( p1.edges[nexti] ) == abs( p2.edges[prevj] ) ) {
						// if both polygons don't use the edge in the same direction
						if ( p1.edges[nexti] != p2.edges[prevj] ) {
							p1BeforeShare = i;
							p2AfterShare = j;
						}
						break;
					}
				}
				// if both polygons don't use the edge in the same direction
				else if ( p1.edges[i] != p2.edges[j] ) {
					// if the next edge of p1 and the previous edge of p2 are not the same
					if ( abs( p1.edges[nexti] ) != abs( p2.edges[prevj] ) ) {
						p1AfterShare = nexti;
						p2BeforeShare = prevj;
						break;
					}
				}
			}
		}
		if ( p1BeforeShare < 0 || p1AfterShare < 0 || p2BeforeShare < 0 || p2AfterShare < 0 ) {
			return null;
		}

		// check if the new polygon would still be convex
		edgeNum = p1.edges[p1BeforeShare];
		edge = model.edges[abs( edgeNum )];
		delta.equals( model.vertices[edge.vertexNum[INTSIGNBITNOTSET( edgeNum )]].p.opSubtraction(
			model.vertices[edge.vertexNum[INTSIGNBITSET( edgeNum )]].p ) );
		normal = p1.plane.Normal ( ).Cross( delta );
		normal.Normalize ( );

		edgeNum = p2.edges[p2AfterShare];
		edge = model.edges[abs( edgeNum )];
		delta.equals( model.vertices[edge.vertexNum[INTSIGNBITNOTSET( edgeNum )]].p.opSubtraction(
			model.vertices[edge.vertexNum[INTSIGNBITSET( edgeNum )]].p ) );

		dot = delta.timesVec( normal );
		if ( dot < -idCollisionModelManagerLocal.CONTINUOUS_EPSILON )
			return null; // not a convex polygon
		keep1 = ( dot > idCollisionModelManagerLocal.CONTINUOUS_EPSILON );

		edgeNum = p2.edges[p2BeforeShare];
		edge = model.edges[abs( edgeNum )];
		delta.equals( model.vertices[edge.vertexNum[INTSIGNBITNOTSET( edgeNum )]].p.opSubtraction(
			model.vertices[edge.vertexNum[INTSIGNBITSET( edgeNum )]].p ) );
		normal = p1.plane.Normal ( ).Cross( delta );
		normal.Normalize ( );

		edgeNum = p1.edges[p1AfterShare];
		edge = model.edges[abs( edgeNum )];
		delta.equals( model.vertices[edge.vertexNum[INTSIGNBITNOTSET( edgeNum )]].p.opSubtraction(
			model.vertices[edge.vertexNum[INTSIGNBITSET( edgeNum )]].p ) );

		dot = delta.timesVec( normal );
		if ( dot < -idCollisionModelManagerLocal.CONTINUOUS_EPSILON )
			return null; // not a convex polygon
		keep2 = ( dot > idCollisionModelManagerLocal.CONTINUOUS_EPSILON );

		newEdgeNum1.$ = newEdgeNum2.$ = 0;
		// get new edges if we need to replace colinear ones
		if ( !keep1 ) {
			edgeNum1 = p1.edges[p1BeforeShare];
			edgeNum2 = p2.edges[p2AfterShare];
			this.GetEdge( model, model.vertices[model.edges[abs( edgeNum1 )].vertexNum[INTSIGNBITSET( edgeNum1 )]].p,
				model.vertices[model.edges[abs( edgeNum2 )].vertexNum[INTSIGNBITNOTSET( edgeNum2 )]].p,
				newEdgeNum1, -1 );
			if ( newEdgeNum1.$ == 0 ) {
				keep1 = true;
			}
		}
		if ( !keep2 ) {
			edgeNum1 = p2.edges[p2BeforeShare];
			edgeNum2 = p1.edges[p1AfterShare];
			this.GetEdge( model, model.vertices[model.edges[abs( edgeNum1 )].vertexNum[INTSIGNBITSET( edgeNum1 )]].p,
				model.vertices[model.edges[abs( edgeNum2 )].vertexNum[INTSIGNBITNOTSET( edgeNum2 )]].p,
				newEdgeNum2, -1 );
			if ( newEdgeNum2.$ == 0 ) {
				keep2 = true;
			}
		}
		// set edges for new polygon
		newNumEdges = 0;
		if ( !keep2 ) {
			newEdges[newNumEdges++] = newEdgeNum2.$;
		}
		if ( p1AfterShare < p1BeforeShare ) {
			for ( i = p1AfterShare + int( !keep2 ); i <= p1BeforeShare - int( !keep1 ); i++ ) {
				newEdges[newNumEdges++] = p1.edges[i];
			}
		} else {
			for ( i = p1AfterShare + int( !keep2 ); i < p1.numEdges; i++ ) {
				newEdges[newNumEdges++] = p1.edges[i];
			}
			for ( i = 0; i <= p1BeforeShare - int( !keep1 ); i++ ) {
				newEdges[newNumEdges++] = p1.edges[i];
			}
		}
		if ( !keep1 ) {
			newEdges[newNumEdges++] = newEdgeNum1.$;
		}
		if ( p2AfterShare < p2BeforeShare ) {
			for ( i = p2AfterShare + int( !keep1 ); i <= p2BeforeShare - int( !keep2 ); i++ ) {
				newEdges[newNumEdges++] = p2.edges[i];
			}
		} else {
			for ( i = p2AfterShare + int( !keep1 ); i < p2.numEdges; i++ ) {
				newEdges[newNumEdges++] = p2.edges[i];
			}
			for ( i = 0; i <= p2BeforeShare - int( !keep2 ); i++ ) {
				newEdges[newNumEdges++] = p2.edges[i];
			}
		}

		newp = this.AllocPolygon( model, newNumEdges );
		p1.copy( newp ); //memcpy( newp, p1, sizeof(cm_polygon_t) );
		memcpy( newp.edges, newEdges, newNumEdges * sizeof( int ) );
		newp.numEdges = newNumEdges;
		newp.checkcount = 0;
		// increase usage count for the edges of this polygon
		for ( i = 0; i < newp.numEdges; i++ ) {
			if ( !keep1 && newp.edges[i] == newEdgeNum1.$ ) {
				continue;
			}
			if ( !keep2 && newp.edges[i] == newEdgeNum2.$ ) {
				continue;
			}
			model.edges[abs( newp.edges[i] )].numUsers++;
		}
		// create new bounds from the merged polygons
		newp.bounds.opEquals( p1.bounds.opAddition( p2.bounds ) );

		return newp;
	}

/*
=============
idCollisionModelManagerLocal::MergePolygonWithTreePolygons
=============
*/
	MergePolygonWithTreePolygons ( model: cm_model_t, node: cm_node_t, polygon: cm_polygon_t ): boolean {
		var i: number;
		var pref: cm_polygonRef_t;
		var p: cm_polygon_t, newp: cm_polygon_t;

		while ( 1 ) {
			for ( pref = node.polygons; pref; pref = pref.next ) {
				p = pref.p;
				//
				if ( p == polygon ) {
					continue;
				}
				//
				newp = this.TryMergePolygons( model, polygon, p );
				// if polygons were merged
				if ( newp ) {
					model.numMergedPolys++;
					// replace links to the merged polygons with links to the new polygon
					this.ReplacePolygons( model, model.node, polygon, p, newp );
					// decrease usage count for edges of both merged polygons
					for ( i = 0; i < polygon.numEdges; i++ ) {
						model.edges[abs( polygon.edges[i] )].numUsers--;
					}
					for ( i = 0; i < p.numEdges; i++ ) {
						model.edges[abs( p.edges[i] )].numUsers--;
					}
					// free merged polygons
					this.FreePolygon( model, polygon );
					this.FreePolygon( model, p );

					return true;
				}
			}
			// if leaf node
			if ( node.planeType == -1 ) {
				break;
			}
			if ( polygon.bounds[0][node.planeType] > node.planeDist ) {
				node = node.children[0];
			} else if ( polygon.bounds[1][node.planeType] < node.planeDist ) {
				node = node.children[1];
			} else {
				if ( this.MergePolygonWithTreePolygons( model, node.children[1], polygon ) ) {
					return true;
				}
				node = node.children[0];
			}
		}
		return false;
	}

/*
=============
idCollisionModelManagerLocal::MergeTreePolygons

  try to merge any two polygons with the same surface flags and the same contents
=============
*/
	MergeTreePolygons ( model: cm_model_t, node: cm_node_t ): void {
		var pref: cm_polygonRef_t;
		var p: cm_polygon_t;
		var merge: boolean;

		while ( 1 ) {
			do {
				merge = false;
				for ( pref = node.polygons; pref; pref = pref.next ) {
					p = pref.p;
					// if we checked this polygon already
					if ( p.checkcount == this.checkCount ) {
						continue;
					}
					p.checkcount = this.checkCount;
					// try to merge this polygon with other polygons in the tree
					if ( this.MergePolygonWithTreePolygons( model, model.node, p ) ) {
						merge = true;
						break;
					}
				}
			} while ( merge );
			// if leaf node
			if ( node.planeType == -1 ) {
				break;
			}
			this.MergeTreePolygons( model, node.children[1] );
			node = node.children[0];
		}
	}

/////*
////===============================================================================
////
////Find internal edges
////
////===============================================================================
////*/
////
/////*
////
////	if (two polygons have the same contents)
////		if (the normals of the two polygon planes face towards each other)
////			if (an edge is shared between the polygons)
////				if (the edge is not shared in the same direction)
////					then this is an internal edge
////			else
////				if (this edge is on the plane of the other polygon)
////					if (this edge if fully inside the winding of the other polygon)
////						then this edge is an internal edge
////
////*/

/*
=============
idCollisionModelManagerLocal::PointInsidePolygon
=============
*/
	PointInsidePolygon ( model: cm_model_t, p: cm_polygon_t, v: idVec3 ): boolean {
		var /*int */i: number, edgeNum: number;
		var v1: idVec3, v2: idVec3, dir1 = new idVec3, dir2 = new idVec3, vec = new idVec3;
		var edge: cm_edge_t;

		for ( i = 0; i < p.numEdges; i++ ) {
			edgeNum = p.edges[i];
			edge = model.edges[abs( edgeNum )];
			//
			v1 = model.vertices[edge.vertexNum[INTSIGNBITSET( edgeNum )]].p;
			v2 = model.vertices[edge.vertexNum[INTSIGNBITNOTSET( edgeNum )]].p;
			dir1.equals( v2.opSubtraction( v1 ) );
			vec.equals( v.opSubtraction( v1 ) );
			dir2 = dir1.Cross( p.plane.Normal ( ) );
			if ( vec.timesVec( dir2 ) > VERTEX_EPSILON ) {
				return false;
			}
		}
		return true;
	}


/*
=============
idCollisionModelManagerLocal::FindInternalEdgesOnPolygon
=============
*/
	FindInternalEdgesOnPolygon(model: cm_model_t, p1: cm_polygon_t, p2: cm_polygon_t ):void {
		var/*int */i: number, j: number, k: number, edgeNum: number;
		var edge: cm_edge_t ;
		var v1: idVec3, v2: idVec3, dir1 = new idVec3, dir2 = new idVec3 ;
	var /*float */d:number;

	// bounds of polygons should overlap or touch
	for ( i = 0; i < 3; i++ ) {
		if ( p1.bounds[0][i] > p2.bounds[1][i] ) {
			return;
		}
		if ( p1.bounds[1][i] < p2.bounds[0][i] ) {
			return;
		}
	}
	//
	// FIXME: doubled geometry causes problems
	//
	for ( i = 0; i < p1.numEdges; i++ ) {
		edgeNum = p1.edges[i];
		edge = model.edges[ abs(edgeNum)];
		// if already an internal edge
		if ( edge.internal ) {
			continue;
		}
		//
		v1 = model.vertices[edge.vertexNum[INTSIGNBITSET(edgeNum)]].p;
		v2 = model.vertices[edge.vertexNum[INTSIGNBITNOTSET(edgeNum)]].p;
		// if either of the two vertices is outside the bounds of the other polygon
		for ( k = 0; k < 3; k++ ) {
			d = p2.bounds[1][k] + VERTEX_EPSILON;
			if ( (v1)[k] > d || (v2)[k] > d ) {
				break;
			}
			d = p2.bounds[0][k] - VERTEX_EPSILON;
			if ( (v1)[k] < d || (v2)[k] < d ) {
				break;
			}
		}
		if ( k < 3 ) {
			continue;
		}
		//
		k = abs(edgeNum);
		for ( j = 0; j < p2.numEdges; j++ ) {
			if ( k == abs(p2.edges[j]) ) {
				break;
			}
		}
		// if the edge is shared between the two polygons
		if ( j < p2.numEdges ) {
			// if the edge is used by more than 2 polygons
			if ( edge.numUsers > 2 ) {
				// could still be internal but we'd have to test all polygons using the edge
				continue;
			}
			// if the edge goes in the same direction for both polygons
			if ( edgeNum == p2.edges[j] ) {
				// the polygons can lay ontop of each other or one can obscure the other
				continue;
			}
		}
		// the edge was not shared
		else {
			// both vertices should be on the plane of the other polygon
			d = p2.plane.Distance( v1 );
			if ( idMath.Fabs(d) > VERTEX_EPSILON ) {
				continue;
			}
			d = p2.plane.Distance( v2 );
			if ( idMath.Fabs(d) > VERTEX_EPSILON ) {
				continue;
			}
		}
		// the two polygon plane normals should face towards each other
		dir1 .equals( (v2) .opSubtraction (v1));
		dir2.equals(p1.plane.Normal().Cross( dir1 ));
		if ( p2.plane.Normal ( ).timesVec( dir2 ) < 0 ) {
			//continue;
			break;
		}
		// if the edge was not shared
		if ( j >= p2.numEdges ) {
			// both vertices of the edge should be inside the winding of the other polygon
			if ( !this.PointInsidePolygon( model, p2, v1 ) ) {
				continue;
			}
			if ( !this.PointInsidePolygon( model, p2, v2 ) ) {
				continue;
			}
		}
		// we got another internal edge
		edge.internal = 1/*true*/;
		model.numInternalEdges++;
	}
}

/*
=============
idCollisionModelManagerLocal::FindInternalPolygonEdges
=============
*/
	FindInternalPolygonEdges(model: cm_model_t, node: cm_node_t, polygon: cm_polygon_t) :void{
	var pref: cm_polygonRef_t;
	var p: cm_polygon_t;

		if (polygon.material.GetCullType() == cullType_t.CT_TWO_SIDED || polygon.material.ShouldCreateBackSides() ) {
		return;
	}

	while( 1 ) {
		for ( pref = node.polygons; pref; pref = pref.next ) {
			p = pref.p;
			//
			// FIXME: use some sort of additional checkcount because currently
			//			polygons can be checked multiple times
			//
			// if the polygons don't have the same contents
			if ( p.contents != polygon.contents ) {
				continue;
			}
			if ( p == polygon ) {
				continue;
			}
			this.FindInternalEdgesOnPolygon( model, polygon, p );
		}
		// if leaf node
		if ( node.planeType == -1 ) {
			break;
		}
		if ( polygon.bounds[0][node.planeType] > node.planeDist ) {
			node = node.children[0];
		}
		else if ( polygon.bounds[1][node.planeType] < node.planeDist ) {
			node = node.children[1];
		}
		else {
			this.FindInternalPolygonEdges( model, node.children[1], polygon );
			node = node.children[0];
		}
	}
}
////
/////*
////=============
////idCollisionModelManagerLocal::FindContainedEdges
////=============
////*/
////void idCollisionModelManagerLocal::FindContainedEdges( model: cm_model_t, var p: cm_polygon_t ) {
////	int i, edgeNum;
////	cm_edge_t *edge;
////	idFixedWinding w;
////
////	for ( i = 0; i < p.numEdges; i++ ) {
////		edgeNum = p.edges[i];
////		edge = model.edges + abs(edgeNum);
////		if ( edge.internal ) {
////			continue;
////		}
////		w.Clear();
////		w += model.vertices[edge.vertexNum[INTSIGNBITSET(edgeNum)]].p;
////		w += model.vertices[edge.vertexNum[INTSIGNBITNOTSET(edgeNum)]].p;
////		if ( ChoppedAwayByProcBSP( w, p.plane, p.contents ) ) {
////			edge.internal = true;
////		}
////	}
////}
////
/*
=============
idCollisionModelManagerLocal::FindInternalEdges
=============
*/
FindInternalEdges( model: cm_model_t, node: cm_node_t ) :void{
	var pref: cm_polygonRef_t;
	var p: cm_polygon_t;

	while( 1 ) {
		for ( pref = node.polygons; pref; pref = pref.next ) {
			p = pref.p;
			// if we checked this polygon already
			if ( p.checkcount == this.checkCount ) {
				continue;
			}
			p.checkcount = this.checkCount;

			this.FindInternalPolygonEdges( model, model.node, p );

			//FindContainedEdges( model, p );
		}
		// if leaf node
		if ( node.planeType == -1 ) {
			break;
		}
		this.FindInternalEdges( model, node.children[1] );
		node = node.children[0];
	}
}

/*
===============================================================================

Spatial subdivision

===============================================================================
*/

/*
================
CM_FindSplitter
================
*/
	static CM_FindSplitter ( node: cm_node_t, bounds: idBounds, /*int **/planeType: R<number>, /*float **/planeDist: R<number> ): number {
		var /*int */i: number, j: number, type: number, axis = new Int32Array( 3 ), polyCount: number;
		var /*float */dist: number, t: number, bestt: number, size = new Float32Array( 3 );
		var bref: cm_brushRef_t;
		var pref: cm_polygonRef_t;
		var n: cm_node_t;
		var forceSplit = false;

		for ( i = 0; i < 3; i++ ) {
			size[i] = bounds[1][i] - bounds[0][i];
			axis[i] = i;
		}
		// sort on largest axis
		for ( i = 0; i < 2; i++ ) {
			if ( size[i] < size[i + 1] ) {
				t = size[i];
				size[i] = size[i + 1];
				size[i + 1] = t;
				j = axis[i];
				axis[i] = axis[i + 1];
				axis[i + 1] = j;
				i = -1;
			}
		}
		// if the node is too small for further splits
		if ( size[0] < MIN_NODE_SIZE ) {
			polyCount = 0;
			for ( pref = node.polygons; pref; pref = pref.next ) {
				polyCount++;
			}
			if ( polyCount > MAX_NODE_POLYGONS ) {
				forceSplit = true;
			}
		}
		// find an axial aligned splitter
		for ( i = 0; i < 3; i++ ) {
			// start with the largest axis first
			type = axis[i];
			bestt = size[i];
			// if the node is small anough in this axis direction
			if ( !forceSplit && bestt < MIN_NODE_SIZE ) {
				break;
			}
			// find an axial splitter from the brush bounding boxes
			// also try brushes from parent nodes
			for ( n = node; n; n = n.parent ) {
				for ( bref = n.brushes; bref; bref = bref.next ) {
					for ( j = 0; j < 2; j++ ) {
						dist = bref.b.bounds[j][type];
						// if the splitter is already used or outside node bounds
						if ( dist >= bounds[1][type] || dist <= bounds[0][type] ) {
							continue;
						}
						// find the most centered splitter
						t = abs( ( bounds[1][type] - dist ) - ( dist - bounds[0][type] ) );
						if ( t < bestt ) {
							bestt = t;
							planeType.$ = type;
							planeDist.$ = dist;
						}
					}
				}
			}
			// find an axial splitter from the polygon bounding boxes
			// also try brushes from parent nodes
			for ( n = node; n; n = n.parent ) {
				for ( pref = n.polygons; pref; pref = pref.next ) {
					for ( j = 0; j < 2; j++ ) {
						dist = pref.p.bounds[j][type];
						// if the splitter is already used or outside node bounds
						if ( dist >= bounds[1][type] || dist <= bounds[0][type] ) {
							continue;
						}
						// find the most centered splitter
						t = abs( ( bounds[1][type] - dist ) - ( dist - bounds[0][type] ) );
						if ( t < bestt ) {
							bestt = t;
							planeType.$ = type;
							planeDist.$ = dist;
						}
					}
				}
			}
			// if we found a splitter on the largest axis
			if ( bestt < size[i] ) {
				// if forced split due to lots of polygons
				if ( forceSplit ) {
					return 1 /*true*/;
				}
				// don't create splitters real close to the bounds
				if ( bounds[1][type] - planeDist.$ > ( MIN_NODE_SIZE * 0.5 ) &&
					planeDist.$ - bounds[0][type] > ( MIN_NODE_SIZE * 0.5 ) ) {
					return 1 /*true*/;
				}
			}
		}
		return 0 /*false*/;
	}

/*
================
CM_R_InsideAllChildren
================
*/
	static CM_R_InsideAllChildren ( node: cm_node_t, bounds: idBounds ): number {
		assert( node != null );
		if ( node.planeType != -1 ) {
			if ( bounds[0][node.planeType] >= node.planeDist ) {
				return 0 /*false*/;
			}
			if ( bounds[1][node.planeType] <= node.planeDist ) {
				return 0 /*false*/;
			}
			if ( !idCollisionModelManagerLocal.CM_R_InsideAllChildren( node.children[0], bounds ) ) {
				return 0 /*false*/;
			}
			if ( !idCollisionModelManagerLocal.CM_R_InsideAllChildren( node.children[1], bounds ) ) {
				return 0 /*false*/;
			}
		}
		return 1 /*true*/;
	}

/*
================
idCollisionModelManagerLocal::R_FilterPolygonIntoTree
================
*/
	R_FilterPolygonIntoTree ( model: cm_model_t, node: cm_node_t, pref: cm_polygonRef_t, p: cm_polygon_t ): void {
		assert( node != null );
		var i = 0;
		while ( node.planeType != -1 ) {
			//dlog(DEBUG_CM, "CM_R_InsideAllChildren while i: %i\n", i);
			if ( idCollisionModelManagerLocal.CM_R_InsideAllChildren( node, p.bounds ) ) {
				//dlog(DEBUG_CM, "CM_R_InsideAllChildren true\n");
				break;
			}
			//dlog(DEBUG_CM, "R_FilterPolygonIntoTree: node.pt: %i %s %s, dist: %.5f\n", node.planeType, p.bounds[0].ToString(), p.bounds[1].ToString(), node.planeDist);
			if ( p.bounds[0][node.planeType] >= node.planeDist ) {
				//dlog(DEBUG_CM, "R_FilterPolygonIntoTree 1: %.5f >= %.5f\n", p.bounds[0][node.planeType] , node.planeDist);
				node = node.children[0];
			} else if ( p.bounds[1][node.planeType] <= node.planeDist ) {
				//dlog(DEBUG_CM, "R_FilterPolygonIntoTree 2: %.5f >= %.5f\n", p.bounds[1][node.planeType] , node.planeDist);
				node = node.children[1];
			} else {
				//dlog(DEBUG_CM, "R_FilterPolygonIntoTree 3 pd: %.5f i:%i\n", node.planeDist, i);
				this.R_FilterPolygonIntoTree( model, node.children[1], null, p );
				node = node.children[0];
				//dlog(DEBUG_CM, "R_FilterPolygonIntoTree 3 after pd: %.5f i:%i\n", node.planeDist, i);
			}

			i++;
		}

		//dlog( DEBUG_CM, "R_FilterPolygonIntoTree planeDist %.5f\n", node.planeDist );
		//if ( node.parent ) {
		//dlog( DEBUG_CM, "R_FilterPolygonIntoTree node.parent.planeDist %.5f\n", node.parent.planeDist );
		//}	
		if ( pref ) {
			pref.next = node.polygons;
			node.polygons = pref;
		} else {
			this.AddPolygonToNode( model, node, p );
		}
	}

/*
================
idCollisionModelManagerLocal::R_FilterBrushIntoTree
================
*/
	R_FilterBrushIntoTree ( model: cm_model_t, node: cm_node_t, pref: cm_brushRef_t, b: cm_brush_t ): void {
		assert( node != null );
		while ( node.planeType != -1 ) {
			if ( idCollisionModelManagerLocal.CM_R_InsideAllChildren( node, b.bounds ) ) {
				break;
			}
			if ( b.bounds[0][node.planeType] >= node.planeDist ) {
				node = node.children[0];
			} else if ( b.bounds[1][node.planeType] <= node.planeDist ) {
				node = node.children[1];
			} else {
				this.R_FilterBrushIntoTree( model, node.children[1], null, b );
				node = node.children[0];
			}
		}
		if ( pref ) {
			pref.next = node.brushes;
			node.brushes = pref;
		} else {
			this.AddBrushToNode( model, node, b );
		}
	}

/*
================
idCollisionModelManagerLocal::R_CreateAxialBSPTree

  a brush or polygon is linked in the node closest to the root where
  the brush or polygon is inside all children
================
*/
	R_CreateAxialBSPTree ( model: cm_model_t, node: cm_node_t, bounds: idBounds ): cm_node_t {
		var /*int */planeType = new R<number>();
		var /*float */planeDist = new R<number>();
		var pref: cm_polygonRef_t, nextpref: cm_polygonRef_t, prevpref: cm_polygonRef_t;
		var bref: cm_brushRef_t, nextbref: cm_brushRef_t, prevbref: cm_brushRef_t;
		var frontNode: cm_node_t, backNode: cm_node_t, n: cm_node_t;
		var frontBounds = new idBounds, backBounds = new idBounds;

		if ( !idCollisionModelManagerLocal.CM_FindSplitter( node, bounds, planeType, planeDist ) ) {
			node.planeType = -1;
			return node;
		}
		// create two child nodes
		frontNode = this.AllocNode( model, NODE_BLOCK_SIZE_LARGE );
		frontNode.memset0 ( );
		frontNode.parent = node;
		frontNode.planeType = -1;
		//
		backNode = this.AllocNode( model, NODE_BLOCK_SIZE_LARGE );
		backNode.memset0 ( );
		backNode.parent = node;
		backNode.planeType = -1;
		//
		model.numNodes += 2;
		// set front node bounds
		frontBounds.opEquals( bounds );
		frontBounds[0][planeType.$] = planeDist.$;
		// set back node bounds
		backBounds.opEquals( bounds );
		backBounds[1][planeType.$] = planeDist.$;
		//
		node.planeType = planeType.$;
		node.planeDist = planeDist.$;
		node.children[0] = frontNode;
		node.children[1] = backNode;
		// filter polygons and brushes down the tree if necesary
		for ( n = node; n; n = n.parent ) {
			prevpref = null;
			for ( pref = n.polygons; pref; pref = nextpref ) {
				nextpref = pref.next;
				// if polygon is not inside all children
				if ( !idCollisionModelManagerLocal.CM_R_InsideAllChildren( n, pref.p.bounds ) ) {
					// filter polygon down the tree
					this.R_FilterPolygonIntoTree( model, n, pref, pref.p );
					if ( prevpref ) {
						prevpref.next = nextpref;
					} else {
						n.polygons = nextpref;
					}
				} else {
					prevpref = pref;
				}
			}
			prevbref = null;
			for ( bref = n.brushes; bref; bref = nextbref ) {
				nextbref = bref.next;
				// if brush is not inside all children
				if ( !idCollisionModelManagerLocal.CM_R_InsideAllChildren( n, bref.b.bounds ) ) {
					// filter brush down the tree
					this.R_FilterBrushIntoTree( model, n, bref, bref.b );
					if ( prevbref ) {
						prevbref.next = nextbref;
					} else {
						n.brushes = nextbref;
					}
				} else {
					prevbref = bref;
				}
			}
		}
		this.R_CreateAxialBSPTree( model, frontNode, frontBounds );
		this.R_CreateAxialBSPTree( model, backNode, backBounds );
		return node;
	}

/////*
////int cm_numSavedPolygonLinks;
////int cm_numSavedBrushLinks;
////
////int CM_R_CountChildren( node: cm_node_t ) {
////	if ( node.planeType == -1 ) {
////		return 0;
////	}
////	return 2 + CM_R_CountChildren(node.children[0]) + CM_R_CountChildren(node.children[1]);
////}
////
////void CM_R_TestOptimisation( node: cm_node_t ) {
////	int polyCount, brushCount, numChildren;
////	var pref: cm_polygonRef_t;
////	cm_brushRef_t *bref;
////
////	if ( node.planeType == -1 ) {
////		return;
////	}
////	polyCount = 0;
////	for ( pref = node.polygons; pref; pref = pref.next) {
////		polyCount++;
////	}
////	brushCount = 0;
////	for ( bref = node.brushes; bref; bref = bref.next) {
////		brushCount++;
////	}
////	if ( polyCount || brushCount ) {
////		numChildren = CM_R_CountChildren( node );
////		cm_numSavedPolygonLinks += (numChildren - 1) * polyCount;
////		cm_numSavedBrushLinks += (numChildren - 1) * brushCount;
////	}
////	CM_R_TestOptimisation( node.children[0] );
////	CM_R_TestOptimisation( node.children[1] );
////}
////*/
////
/*
================
idCollisionModelManagerLocal::CreateAxialBSPTree
================
*/
	CreateAxialBSPTree ( model: cm_model_t, node: cm_node_t ): cm_node_t {
		var pref: cm_polygonRef_t;
		var bref: cm_brushRef_t;
		var bounds = new idBounds;

		// get head node bounds
		bounds.Clear ( );
		for ( pref = node.polygons; pref; pref = pref.next ) {
			bounds.opAdditionAssignment( pref.p.bounds );
		}
		for ( bref = node.brushes; bref; bref = bref.next ) {
			bounds.opAdditionAssignment( bref.b.bounds );
		}

		// create axial BSP tree from head node
		node = this.R_CreateAxialBSPTree( model, node, bounds );

		return node;
	}

/*
===============================================================================

Raw polygon and brush data

===============================================================================
*/

/*
================
idCollisionModelManagerLocal::SetupHash
================
*/
	SetupHash ( ): void {
		if ( !cm_vertexHash ) {
			cm_vertexHash = new idHashIndex( VERTEX_HASH_SIZE, 1024 );
		}
		if ( !cm_edgeHash ) {
			cm_edgeHash = new idHashIndex( EDGE_HASH_SIZE, 1024 );
		}
		// init variables used during loading and optimization
		if ( !cm_windingList ) {
			cm_windingList = new cm_windingList_t;
		}
		if ( !cm_outList ) {
			cm_outList = new cm_windingList_t;
		}
		if ( !cm_tmpList ) {
			cm_tmpList = new cm_windingList_t;
		}
	}

/*
================
idCollisionModelManagerLocal::ShutdownHash
================
*/
	ShutdownHash ( ): void {
		$delete( cm_vertexHash );
		cm_vertexHash = null;
		$delete( cm_edgeHash );
		cm_edgeHash = null;
		$delete( cm_tmpList );
		cm_tmpList = null;
		$delete( cm_outList );
		cm_outList = null;
		$delete( cm_windingList );
		cm_windingList = null;
	}

/*
================
idCollisionModelManagerLocal::ClearHash
================
*/
	ClearHash ( bounds: idBounds ): void {
		var i: number;
		var /*float */f: number, max: number;

		cm_vertexHash.Clear ( );
		cm_edgeHash.Clear ( );

		cm_modelBounds = bounds;
		max = bounds[1].x - bounds[0].x;
		f = bounds[1].y - bounds[0].y;
		if ( f > max ) {
			max = f;
		}
		cm_vertexShift = /*(float)*/ max / VERTEX_HASH_BOXSIZE;
		for ( i = 0; ( 1 << i ) < cm_vertexShift; i++ ) {
		}
		if ( i == 0 ) {
			cm_vertexShift = 1;
		} else {
			cm_vertexShift = i;
		}
	}

/*
================
idCollisionModelManagerLocal::HashVec
================
*/
	HashVec ( vec: idVec3 ): number /*int*/ {
		/*
	int x, y;

	x = (((int)(vec[0] - cm_modelBounds[0].x + 0.5 )) >> cm_vertexShift) & (VERTEX_HASH_BOXSIZE-1);
	y = (((int)(vec[1] - cm_modelBounds[0].y + 0.5 )) >> cm_vertexShift) & (VERTEX_HASH_BOXSIZE-1);

	assert (x >= 0 && x < VERTEX_HASH_BOXSIZE && y >= 0 && y < VERTEX_HASH_BOXSIZE);

	return y * VERTEX_HASH_BOXSIZE + x;
	*/
		var /*int */x: number, y: number, z: number;

		x = ( ( ( int )( vec[0] - cm_modelBounds[0].x + 0.5 ) ) + 2 ) >> 2;
		y = ( ( ( int )( vec[1] - cm_modelBounds[0].y + 0.5 ) ) + 2 ) >> 2;
		z = ( ( ( int )( vec[2] - cm_modelBounds[0].z + 0.5 ) ) + 2 ) >> 2;
		return ( x + y * VERTEX_HASH_BOXSIZE + z ) & ( VERTEX_HASH_SIZE - 1 );
	}

/*
================
idCollisionModelManagerLocal::GetVertex
================
*/
	GetVertex ( model: cm_model_t, v: idVec3, vertexNum: R<number> ): number /*int*/ {
		var /*int */i: number, hashKey: number, vn: number;
		var vert = new idVec3, p: idVec3;

		for ( i = 0; i < 3; i++ ) {
			if ( idMath.Fabs( v[i] - idMath.Rint( v[i] ) ) < INTEGRAL_EPSILON )
				vert[i] = idMath.Rint( v[i] );
			else
				vert[i] = v[i];
		}

		hashKey = this.HashVec( vert );

		for ( vn = cm_vertexHash.First( hashKey ); vn >= 0; vn = cm_vertexHash.Next( vn ) ) {
			p = model.vertices[vn].p;
			// first compare z-axis because hash is based on x-y plane
			if ( idMath.Fabs( vert[2] - ( p )[2] ) < VERTEX_EPSILON &&
				idMath.Fabs( vert[0] - ( p )[0] ) < VERTEX_EPSILON &&
				idMath.Fabs( vert[1] - ( p )[1] ) < VERTEX_EPSILON ) {
				vertexNum.$ = vn;
				return 1 /*true*/;
			}
		}

		if ( model.numVertices >= model.maxVertices ) {
			var oldVertices: cm_vertex_t[];

			// resize vertex array
			model.maxVertices = /*(float)*/ model.maxVertices * 1.5 + 1;
			oldVertices = model.vertices;
			model.vertices = newStructArray<cm_vertex_t>( cm_vertex_t, model.maxVertices ); //(cm_vertex_t *) Mem_ClearedAlloc( model.maxVertices * sizeof(cm_vertex_t) );
			memcpyStructs( model.vertices, oldVertices, model.numVertices ); //memcpy(model.vertices, oldVertices, model.numVertices * sizeof(cm_vertex_t));
			Mem_Free( oldVertices );

			cm_vertexHash.ResizeIndex( model.maxVertices );
		}
		model.vertices[model.numVertices].p.equals( vert );
		model.vertices[model.numVertices].checkcount = 0;
		vertexNum.$ = model.numVertices;
		// add vertice to hash
		cm_vertexHash.Add( hashKey, model.numVertices );

		model.numVertices++;
		return 0 /*false*/;
	}

/*
================
idCollisionModelManagerLocal::GetEdge
================
*/
	GetEdge ( model: cm_model_t, v1: idVec3, v2: idVec3, /*int **/edgeNum: R<number>, /*int */v1num: number ): number /*int*/ {
		var /*int */v2num: number, hashKey: number, e: number;
		var /*int */found: number, vertexNum: Int32Array;

		// the first edge is a dummy
		if ( model.numEdges == 0 ) {
			model.numEdges = 1;
		}

		if ( v1num != -1 ) {
			found = 1;
		} else {
			var $v1num = new R( v1num );
			found = this.GetVertex( model, v1, $v1num );
			v1num = $v1num.$;
		}
		var $v2num = new R( v2num );
		found &= this.GetVertex( model, v2, $v2num );
		v2num = $v2num.$;
		// if both vertices are the same or snapped onto each other
		if ( v1num == v2num ) {
			edgeNum.$ = 0;
			return 1 /*true*/;
		}
		hashKey = cm_edgeHash.GenerateKey_ints( v1num, v2num );
		// if both vertices where already stored
		if ( found ) {
			for ( e = cm_edgeHash.First( hashKey ); e >= 0; e = cm_edgeHash.Next( e ) ) {
				// NOTE: only allow at most two users that use the edge in opposite direction
				if ( model.edges[e].numUsers != 1 ) {
					continue;
				}

				vertexNum = model.edges[e].vertexNum;
				if ( vertexNum[0] == v2num ) {
					if ( vertexNum[1] == v1num ) {
						// negative for a reversed edge
						edgeNum.$ = -e;
						break;
					}
				}
				/*
			else if ( vertexNum[0] == v1num ) {
				if ( vertexNum[1] == v2num ) {
					edgeNum.$ = e;
					break;
				}
			}
			*/
			}
			// if edge found in hash
			if ( e >= 0 ) {
				model.edges[e].numUsers++;
				return 1 /*true*/;
			}
		}
		if ( model.numEdges >= model.maxEdges ) {
			var oldEdges: cm_edge_t[];

			// resize edge array
			model.maxEdges = /*(float) */model.maxEdges * 1.5 + 1;
			oldEdges = model.edges;
			model.edges = newStructArray<cm_edge_t>( cm_edge_t, model.maxEdges ); //(cm_edge_t *) Mem_ClearedAlloc( model.maxEdges * sizeof(cm_edge_t) );
			memcpyStructs( model.edges, oldEdges, model.numEdges ); //memcpy( model.edges, oldEdges, model.numEdges * sizeof(cm_edge_t) );
			Mem_Free( oldEdges );

			cm_edgeHash.ResizeIndex( model.maxEdges );
		}
		// setup edge
		model.edges[model.numEdges].vertexNum[0] = v1num;
		model.edges[model.numEdges].vertexNum[1] = v2num;
		model.edges[model.numEdges].internal = 0 /*false*/;
		model.edges[model.numEdges].checkcount = 0;
		model.edges[model.numEdges].numUsers = 1; // used by one polygon atm
		model.edges[model.numEdges].normal.Zero ( );
		//
		edgeNum.$ = model.numEdges;
		// add edge to hash
		cm_edgeHash.Add( hashKey, model.numEdges );

		model.numEdges++;

		return 0 /*false*/;
	}

/*
================
idCollisionModelManagerLocal::CreatePolygon
================
*/
	CreatePolygon ( model: cm_model_t, w: idFixedWinding, plane: idPlane, material: idMaterial, /*int*/ primitiveNum: number ): void {
		var /*int */i: number, j: number, edgeNum: number, v1num: number;
		var /*int */numPolyEdges: number, polyEdges = new Int32Array( MAX_POINTS_ON_WINDING );
		var bounds = new idBounds;
		var p: cm_polygon_t;

		// turn the winding into a sequence of edges
		numPolyEdges = 0;
		v1num = -1; // first vertex unknown
		for ( i = 0, j = 1; i < w.GetNumPoints ( ); i++, j++ ) {
			if ( j >= w.GetNumPoints ( ) ) {
				j = 0;
			}
			var $edgeNum = new R( polyEdges[numPolyEdges] );
			this.GetEdge( model, ( w )[i].ToVec3 ( ), ( w )[j].ToVec3 ( ), $edgeNum, v1num );
			polyEdges[numPolyEdges] = $edgeNum.$;
			if ( polyEdges[numPolyEdges] ) {
				// last vertex of this edge is the first vertex of the next edge
				v1num = model.edges[abs( polyEdges[numPolyEdges] )].vertexNum[INTSIGNBITNOTSET( polyEdges[numPolyEdges] )];
				// this edge is valid so keep it
				numPolyEdges++;
			}
		}
		// should have at least 3 edges
		if ( numPolyEdges < 3 ) {
			return;
		}
		// the polygon is invalid if some edge is found twice
		for ( i = 0; i < numPolyEdges; i++ ) {
			for ( j = i + 1; j < numPolyEdges; j++ ) {
				if ( abs( polyEdges[i] ) == abs( polyEdges[j] ) ) {
					return;
				}
			}
		}
		// don't overflow max edges
		if ( numPolyEdges > CM_MAX_POLYGON_EDGES ) {
			common.Warning( "idCollisionModelManagerLocal::CreatePolygon: polygon has more than %d edges", numPolyEdges );
			numPolyEdges = CM_MAX_POLYGON_EDGES;
		}

		w.GetBounds( bounds );

		p = this.AllocPolygon( model, numPolyEdges );
		p.numEdges = numPolyEdges;
		p.contents = material.GetContentFlags ( );
		p.material = material;
		p.checkcount = 0;
		p.plane = plane;
		p.bounds = bounds;
		for ( i = 0; i < numPolyEdges; i++ ) {
			edgeNum = polyEdges[i];
			p.edges[i] = edgeNum;
		}
		this.R_FilterPolygonIntoTree( model, model.node, null, p );
	}

/*
================
idCollisionModelManagerLocal::PolygonFromWinding

  NOTE: for patches primitiveNum < 0 and abs(primitiveNum) is the real number
================
*/
	PolygonFromWinding ( model: cm_model_t, w: idFixedWinding, plane: idPlane, material: idMaterial, /*int */primitiveNum: number ): void {
		var /*int */contents: number;

		contents = material.GetContentFlags ( );

		// if this polygon is part of the world model
		if ( this.numModels == 0 ) {
			// if the polygon is fully chopped away by the proc bsp tree
			if ( this.ChoppedAwayByProcBSP( w, plane, contents ) ) {
				model.numRemovedPolys++;
				return;
			}
		}

		// get one winding that is not or only partly contained in brushes
		w.opEquals( this.WindingOutsideBrushes( w, plane, contents, primitiveNum, model.node ) );

		// if the polygon is fully contained within a brush
		if ( !w ) {
			model.numRemovedPolys++;
			return;
		}

		if ( w.IsHuge ( ) ) {
			common.Warning( "idCollisionModelManagerLocal::PolygonFromWinding: model %s primitive %d is degenerate", model.name.c_str ( ), abs( primitiveNum ) );
			return;
		}

		this.CreatePolygon( model, w, plane, material, primitiveNum );

		if ( material.GetCullType ( ) == cullType_t.CT_TWO_SIDED || material.ShouldCreateBackSides ( ) ) {
			w.ReverseSelf ( );
			this.CreatePolygon( model, w, plane.opUnaryMinus ( ), material, primitiveNum );
		}
	}

/////*
////=================
////idCollisionModelManagerLocal::CreatePatchPolygons
////=================
////*/
////void idCollisionModelManagerLocal::CreatePatchPolygons( model: cm_model_t, idSurface_Patch &mesh, material:idMaterial , /*int*/ primitiveNum:number  ) {
////	var /*int */i:number, j:number;
////	float dot;
////	int v1, v2, v3, v4;
////	idFixedWinding w;
////	idPlane plane;
////	idVec3 d1, d2;
////
////	for ( i = 0; i < mesh.GetWidth() - 1; i++ ) {
////		for ( j = 0; j < mesh.GetHeight() - 1; j++ ) {
////
////			v1 = j * mesh.GetWidth() + i;
////			v2 = v1 + 1;
////			v3 = v1 + mesh.GetWidth() + 1;
////			v4 = v1 + mesh.GetWidth();
////
////			d1 = mesh[v2].xyz - mesh[v1].xyz;
////			d2 = mesh[v3].xyz - mesh[v1].xyz;
////			plane.SetNormal( d1.Cross(d2) );
////			if ( plane.Normalize() != 0.0 ) {
////				plane.FitThroughPoint( mesh[v1].xyz );
////				dot = plane.Distance( mesh[v4].xyz );
////				// if we can turn it into a quad
////				if ( idMath.Fabs(dot) < 0.1f ) {
////					w.Clear();
////					w += mesh[v1].xyz;
////					w += mesh[v2].xyz;
////					w += mesh[v3].xyz;
////					w += mesh[v4].xyz;
////
////					PolygonFromWinding( model, &w, plane, material, -primitiveNum );
////					continue;
////				}
////				else {
////					// create one of the triangles
////					w.Clear();
////					w += mesh[v1].xyz;
////					w += mesh[v2].xyz;
////					w += mesh[v3].xyz;
////
////					PolygonFromWinding( model, &w, plane, material, -primitiveNum );
////				}
////			}
////			// create the other triangle
////			d1 = mesh[v3].xyz - mesh[v1].xyz;
////			d2 = mesh[v4].xyz - mesh[v1].xyz;
////			plane.SetNormal( d1.Cross(d2) );
////			if ( plane.Normalize() != 0.0 ) {
////				plane.FitThroughPoint( mesh[v1].xyz );
////
////				w.Clear();
////				w += mesh[v1].xyz;
////				w += mesh[v3].xyz;
////				w += mesh[v4].xyz;
////
////				PolygonFromWinding( model, &w, plane, material, -primitiveNum );
////			}
////		}
////	}
////}
////
/////*
////=================
////CM_EstimateVertsAndEdges
////=================
////*/
////static void CM_EstimateVertsAndEdges( const idMapEntity *mapEnt, int *numVerts, int *numEdges ) {
////	int j, width, height;
////
////	*numVerts = *numEdges = 0;
////	for ( j = 0; j < mapEnt.GetNumPrimitives(); j++ ) {
////		const idMapPrimitive *mapPrim;
////		mapPrim = mapEnt.GetPrimitive(j);
////		if ( mapPrim.GetType() == idMapPrimitive::TYPE_PATCH ) {
////			// assume maximum tesselation without adding verts
////			width = static_cast<const idMapPatch*>(mapPrim).GetWidth();
////			height = static_cast<const idMapPatch*>(mapPrim).GetHeight();
////			*numVerts += width * height;
////			*numEdges += (width-1) * height + width * (height-1) + (width-1) * (height-1);
////			continue;
////		}
////		if ( mapPrim.GetType() == idMapPrimitive::TYPE_BRUSH ) {
////			// assume cylinder with a polygon with (numSides - 2) edges ontop and on the bottom
////			*numVerts += (static_cast<const idMapBrush*>(mapPrim).GetNumSides() - 2) * 2;
////			*numEdges += (static_cast<const idMapBrush*>(mapPrim).GetNumSides() - 2) * 3;
////			continue;
////		}
////	}
////}
////
/////*
////=================
////idCollisionModelManagerLocal::ConverPatch
////=================
////*/
////void idCollisionModelManagerLocal::ConvertPatch( model: cm_model_t, const idMapPatch *patch, /*int*/ primitiveNum:number  ) {
////	material:idMaterial ;
////	idSurface_Patch *cp;
////
////	material = declManager.FindMaterial( patch.GetMaterial() );
////	if ( !( material.GetContentFlags() & CONTENTS_REMOVE_UTIL ) ) {
////		return;
////	}
////
////	// copy the patch
////	cp = new idSurface_Patch( *patch );
////
////	// if the patch has an explicit number of subdivisions use it to avoid cracks
////	if ( patch.GetExplicitlySubdivided() ) {
////		cp.SubdivideExplicit( patch.GetHorzSubdivisions(), patch.GetVertSubdivisions(), false, true );
////	} else {
////		cp.Subdivide( DEFAULT_CURVE_MAX_ERROR_CD, DEFAULT_CURVE_MAX_ERROR_CD, DEFAULT_CURVE_MAX_LENGTH_CD, false );
////	}
////
////	// create collision polygons for the patch
////	CreatePatchPolygons( model, *cp, material, primitiveNum );
////
////	delete cp;
////}
////
/////*
////================
////idCollisionModelManagerLocal::ConvertBrushSides
////================
////*/
////void idCollisionModelManagerLocal::ConvertBrushSides( model: cm_model_t, const idMapBrush *mapBrush, /*int*/ primitiveNum:number  ) {
////	var /*int */i:number, j:number;
////	idMapBrushSide *mapSide;
////	idFixedWinding w;
////	idPlane *planes;
////	material:idMaterial ;
////
////	// fix degenerate planes
////	planes = (idPlane *) _alloca16( mapBrush.GetNumSides() * sizeof( planes[0] ) );
////	for ( i = 0; i < mapBrush.GetNumSides(); i++ ) {
////		planes[i] = mapBrush.GetSide(i).GetPlane();
////		planes[i].FixDegeneracies( DEGENERATE_DIST_EPSILON );
////	}
////
////	// create a collision polygon for each brush side
////	for ( i = 0; i < mapBrush.GetNumSides(); i++ ) {
////		mapSide = mapBrush.GetSide(i);
////		material = declManager.FindMaterial( mapSide.GetMaterial() );
////		if ( !( material.GetContentFlags() & CONTENTS_REMOVE_UTIL ) ) {
////			continue;
////		}
////		w.BaseForPlane( -planes[i] );
////		for ( j = 0; j < mapBrush.GetNumSides() && w.GetNumPoints(); j++ ) {
////			if ( i == j ) {
////				continue;
////			}
////			w.ClipInPlace( -planes[j], 0 );
////		}
////
////		if ( w.GetNumPoints() ) {
////			PolygonFromWinding( model, &w, planes[i], material, primitiveNum );
////		}
////	}
////}
////
/////*
////================
////idCollisionModelManagerLocal::ConvertBrush
////================
////*/
////void idCollisionModelManagerLocal::ConvertBrush( model: cm_model_t, const idMapBrush *mapBrush, /*int*/ primitiveNum:number  ) {
////	int i, j, contents;
////	idBounds bounds;
////	idMapBrushSide *mapSide;
////	cm_brush_t *brush;
////	idPlane *planes;
////	idFixedWinding w;
////	material:idMaterial  = null;
////
////	contents = 0;
////	bounds.Clear();
////
////	// fix degenerate planes
////	planes = (idPlane *) _alloca16( mapBrush.GetNumSides() * sizeof( planes[0] ) );
////	for ( i = 0; i < mapBrush.GetNumSides(); i++ ) {
////		planes[i] = mapBrush.GetSide(i).GetPlane();
////		planes[i].FixDegeneracies( DEGENERATE_DIST_EPSILON );
////	}
////
////	// we are only getting the bounds for the brush so there's no need
////	// to create a winding for the last brush side
////	for ( i = 0; i < mapBrush.GetNumSides() - 1; i++ ) {
////		mapSide = mapBrush.GetSide(i);
////		material = declManager.FindMaterial( mapSide.GetMaterial() );
////		contents |= ( material.GetContentFlags() & CONTENTS_REMOVE_UTIL );
////		w.BaseForPlane( -planes[i] );
////		for ( j = 0; j < mapBrush.GetNumSides() && w.GetNumPoints(); j++ ) {
////			if ( i == j ) {
////				continue;
////			}
////			w.ClipInPlace( -planes[j], 0 );
////		}
////
////		for ( j = 0; j < w.GetNumPoints(); j++ ) {
////			bounds.AddPoint( w[j].ToVec3() );
////		}
////	}
////	if ( !contents ) {
////		return;
////	}
////	// create brush for position test
////	brush = this.AllocBrush( model, mapBrush.GetNumSides() );
////	brush.checkcount = 0;
////	brush.contents = contents;
////	brush.material = material;
////	brush.primitiveNum = primitiveNum;
////	brush.bounds = bounds;
////	brush.numPlanes = mapBrush.GetNumSides();
////	for (i = 0; i < mapBrush.GetNumSides(); i++) {
////		brush.planes[i] = planes[i];
////	}
////	this.AddBrushToNode( model, model.node, brush );
////}
////
/////*
////================
////CM_CountNodeBrushes
////================
////*/
////static int CM_CountNodeBrushes( const node: cm_node_t ) {
////	int count;
////	cm_brushRef_t *bref;
////
////	count = 0;
////	for ( bref = node.brushes; bref; bref = bref.next ) {
////		count++;
////	}
////	return count;
////}

/*
================
CM_R_GetModelBounds
================
*/
	static CM_R_GetNodeBounds ( bounds: idBounds, node: cm_node_t ): void {
		var pref: cm_polygonRef_t;
		var bref: cm_brushRef_t;

		while ( 1 ) {
			for ( pref = node.polygons; pref; pref = pref.next ) {
				bounds.AddPoint( pref.p.bounds[0] );
				bounds.AddPoint( pref.p.bounds[1] );
			}
			for ( bref = node.brushes; bref; bref = bref.next ) {
				bounds.AddPoint( bref.b.bounds[0] );
				bounds.AddPoint( bref.b.bounds[1] );
			}
			if ( node.planeType == -1 ) {
				break;
			}
			idCollisionModelManagerLocal.CM_R_GetNodeBounds( bounds, node.children[1] );
			node = node.children[0];
		}
	}

/*
================
CM_GetNodeBounds
================
*/
	static CM_GetNodeBounds ( bounds: idBounds, node: cm_node_t ): void {
		bounds.Clear ( );
		idCollisionModelManagerLocal.CM_R_GetNodeBounds( bounds, node );
		if ( bounds.IsCleared ( ) ) {
			bounds.Zero ( );
		}
	}

/*
================
CM_GetNodeContents
================
*/
	static CM_GetNodeContents ( node: cm_node_t ): number /*int*/ {
		var /*int */contents: number;
		var pref: cm_polygonRef_t;
		var bref: cm_brushRef_t;

		contents = 0;
		while ( 1 ) {
			for ( pref = node.polygons; pref; pref = pref.next ) {
				contents |= pref.p.contents;
			}
			for ( bref = node.brushes; bref; bref = bref.next ) {
				contents |= bref.b.contents;
			}
			if ( node.planeType == -1 ) {
				break;
			}
			contents |= idCollisionModelManagerLocal.CM_GetNodeContents( node.children[1] );
			node = node.children[0];
		}
		return contents;
	}

/*
==================
idCollisionModelManagerLocal::RemapEdges
==================
*/
	RemapEdges ( node: cm_node_t, /*int */edgeRemap: Int32Array ) {
		var pref: cm_polygonRef_t;
		var p: cm_polygon_t;
		var i: number;

		while ( 1 ) {
			for ( pref = node.polygons; pref; pref = pref.next ) {
				p = pref.p;
				// if we checked this polygon already
				if ( p.checkcount == this.checkCount ) {
					continue;
				}
				p.checkcount = this.checkCount;
				for ( i = 0; i < p.numEdges; i++ ) {
					if ( p.edges[i] < 0 ) {
						p.edges[i] = -edgeRemap[abs( p.edges[i] )];
					} else {
						p.edges[i] = edgeRemap[p.edges[i]];
					}
				}
			}
			if ( node.planeType == -1 ) {
				break;
			}

			this.RemapEdges( node.children[1], edgeRemap );
			node = node.children[0];
		}
	}

/*
==================
idCollisionModelManagerLocal::OptimizeArrays

  due to polygon merging and polygon removal the vertex and edge array
  can have a lot of unused entries.
==================
*/
	OptimizeArrays ( model: cm_model_t ): void {
		var /*int */i: number, newNumVertices: number, newNumEdges: number, v: Int32Array;
		var remap: Int32Array;
		var oldEdges: cm_edge_t [];
		var oldVertices: cm_vertex_t[];

		remap = new Int32Array( Mem_ClearedAlloc( Max( model.numVertices, model.numEdges ) * sizeof( int ) ) );
		// get all used vertices
		for ( i = 0; i < model.numEdges; i++ ) {
			remap[model.edges[i].vertexNum[0]] = 1 /*true*/;
			remap[model.edges[i].vertexNum[1]] = 1 /*true*/;
		}
		// create remap index and move vertices
		newNumVertices = 0;
		for ( i = 0; i < model.numVertices; i++ ) {
			if ( remap[i] ) {
				remap[i] = newNumVertices;
				model.vertices[newNumVertices] = model.vertices[i];
				newNumVertices++;
			}
		}
		model.numVertices = newNumVertices;
		// change edge vertex indexes
		for ( i = 1; i < model.numEdges; i++ ) {
			v = model.edges[i].vertexNum;
			v[0] = remap[v[0]];
			v[1] = remap[v[1]];
		}

		// create remap index and move edges
		newNumEdges = 1;
		for ( i = 1; i < model.numEdges; i++ ) {
			// if the edge is used
			if ( model.edges[i].numUsers ) {
				remap[i] = newNumEdges;
				model.edges[newNumEdges] = model.edges[i];
				newNumEdges++;
			}
		}
		// change polygon edge indexes
		this.checkCount++;
		this.RemapEdges( model.node, remap );
		model.numEdges = newNumEdges;

		Mem_Free( remap );

		// realloc vertices
		oldVertices = model.vertices;
		if ( oldVertices ) {
			model.vertices = newStructArray<cm_vertex_t>( cm_vertex_t, model.numVertices );
			clearStructArray( model.vertices );
			memcpyStructs( model.vertices, oldVertices, model.numVertices );
			Mem_Free( oldVertices );
		}

		// realloc edges
		oldEdges = model.edges;
		if ( oldEdges ) {
			model.edges = newStructArray<cm_edge_t>( cm_edge_t, model.numEdges ); 
			clearStructArray( model.edges );
			memcpyStructs( model.edges, oldEdges, model.numEdges );
			Mem_Free( oldEdges );
		}
	}

/*
================
idCollisionModelManagerLocal::FinishModel
================
*/
	FinishModel ( model: cm_model_t ): void {
	// try to merge polygons
	this.checkCount++;
	this.MergeTreePolygons( model, model.node );
	// find internal edges (no mesh can ever collide with internal edges)
	this.checkCount++;
	this.FindInternalEdges( model, model.node );
	// calculate edge normals
	this.checkCount++;
	this.CalculateEdgeNormals( model, model.node );

	//common.Printf( "%s vertex hash spread is %d\n", model.name.c_str(), cm_vertexHash.GetSpread() );
	//common.Printf( "%s edge hash spread is %d\n", model.name.c_str(), cm_edgeHash.GetSpread() );

	// remove all unused vertices and edges
	this.OptimizeArrays( model );
	// get model bounds from brush and polygon bounds
	idCollisionModelManagerLocal.CM_GetNodeBounds( model.bounds, model.node );
	// get model contents
	model.contents = idCollisionModelManagerLocal.CM_GetNodeContents( model.node );
	// total memory used by this model
	model.usedMemory = model.numVertices * sizeof(cm_vertex_t) +
						model.numEdges * sizeof(cm_edge_t) +
						model.polygonMemory +
						model.brushMemory +
						model.numNodes * sizeof(cm_node_t) +
						model.numPolygonRefs * sizeof(cm_polygonRef_t) +
						model.numBrushRefs * sizeof(cm_brushRef_t);
	}

/*
================
idCollisionModelManagerLocal::LoadRenderModel
================
*/
	LoadRenderModel ( fileName: string ): cm_model_t {
		var /*int */i: number, j: number;
		var renderModel: idRenderModel;
		var surf: modelSurface_t;
		var w = new idFixedWinding;
		var node: cm_node_t;
		var model: cm_model_t;
		var plane = new idPlane;
		var bounds = new idBounds;
		var collisionSurface: boolean;
		var extension = new idStr;

		// only load ASE and LWO models
		new idStr( fileName ).ExtractFileExtension( extension );
		if ( ( extension.Icmp( "ase" ) != 0 ) && ( extension.Icmp( "lwo" ) != 0 ) && ( extension.Icmp( "ma" ) != 0 ) ) {
			return null;
		}

		if ( !renderModelManager.CheckModel( fileName ) ) {
			return null;
		}

		renderModel = renderModelManager.FindModel( fileName );

		model = this.AllocModel ( );
		model.name.equals( fileName );
		node = this.AllocNode( model, NODE_BLOCK_SIZE_SMALL );
		node.planeType = -1;
		model.node = node;

		model.maxVertices = 0;
		model.numVertices = 0;
		model.maxEdges = 0;
		model.numEdges = 0;

		bounds.opEquals( renderModel.Bounds( null ) );

		collisionSurface = false;
		for ( i = 0; i < renderModel.NumSurfaces ( ); i++ ) {
			surf = renderModel.Surface( i );
			if ( surf.shader.GetSurfaceFlags ( ) & surfaceFlags_t.SURF_COLLISION ) {
				collisionSurface = true;
			}
		}

		for ( i = 0; i < renderModel.NumSurfaces ( ); i++ ) {
			surf = renderModel.Surface( i );
			// if this surface has no contents
			if ( !( surf.shader.GetContentFlags ( ) & contentsFlags_t.CONTENTS_REMOVE_UTIL ) ) {
				continue;
			}
			// if the model has a collision surface and this surface is not a collision surface
			if ( collisionSurface && !( surf.shader.GetSurfaceFlags ( ) & surfaceFlags_t.SURF_COLLISION ) ) {
				continue;
			}
			// get max verts and edges
			model.maxVertices += surf.geometry.numVerts;
			model.maxEdges += surf.geometry.numIndexes;
		}

		model.vertices = newStructArray<cm_vertex_t>( cm_vertex_t, model.maxVertices ); // (cm_vertex_t *) Mem_ClearedAlloc( model.maxVertices * sizeof(cm_vertex_t) );
		model.edges = newStructArray<cm_edge_t>( cm_edge_t, model.maxEdges ); // (cm_edge_t *) Mem_ClearedAlloc( model.maxEdges * sizeof(cm_edge_t) );

		// setup hash to speed up finding shared vertices and edges
		this.SetupHash ( );

		cm_vertexHash.ResizeIndex( model.maxVertices );
		cm_edgeHash.ResizeIndex( model.maxEdges );

		this.ClearHash( bounds );

		for ( i = 0; i < renderModel.NumSurfaces ( ); i++ ) {
			surf = renderModel.Surface( i );
			// if this surface has no contents
			if ( !( surf.shader.GetContentFlags ( ) & contentsFlags_t.CONTENTS_REMOVE_UTIL ) ) {
				continue;
			}
			// if the model has a collision surface and this surface is not a collision surface
			if ( collisionSurface && !( surf.shader.GetSurfaceFlags ( ) & surfaceFlags_t.SURF_COLLISION ) ) {
				continue;
			}

			for ( j = 0; j < surf.geometry.numIndexes; j += 3 ) {
				w.Clear ( );
				w.opAdditionAssignment( surf.geometry.verts[surf.geometry.indexes[j + 2]].xyz );
				w.opAdditionAssignment( surf.geometry.verts[surf.geometry.indexes[j + 1]].xyz );
				w.opAdditionAssignment( surf.geometry.verts[surf.geometry.indexes[j + 0]].xyz );
				w.GetPlane( plane );
				plane.opEquals( plane.opUnaryMinus ( ) );
				this.PolygonFromWinding( model, w, plane, surf.shader, 1 );
			}
		}

		// create a BSP tree for the model
		model.node = this.CreateAxialBSPTree( model, model.node );

		model.isConvex = false;

		this.FinishModel( model );

		// shutdown the hash
		this.ShutdownHash ( );

		common.Printf( "loaded collision model %s\n", model.name.c_str ( ) );

		return model;
	}

/////*
////================
////idCollisionModelManagerLocal::CollisionModelForMapEntity
////================
////*/
////cm_model_t *idCollisionModelManagerLocal::CollisionModelForMapEntity( const idMapEntity *mapEnt ) {
////	model: cm_model_t;
////	idBounds bounds;
////	const char *name;
////	int i, brushCount;
////
////	// if the entity has no primitives
////	if ( mapEnt.GetNumPrimitives() < 1 ) {
////		return null;
////	}
////
////	// get a name for the collision model
////	mapEnt.epairs.GetString( "model", "", &name );
////	if ( !name[0] ) {
////		mapEnt.epairs.GetString( "name", "", &name );
////		if ( !name[0] ) {
////			if ( !this.numModels ) {
////				// first model is always the world
////				name = "worldMap";
////			}
////			else {
////				name = "unnamed inline model";
////			}
////		}
////	}
////
////	model = AllocModel();
////	model.node = this.AllocNode( model, NODE_BLOCK_SIZE_SMALL );
////
////	CM_EstimateVertsAndEdges( mapEnt, &model.maxVertices, &model.maxEdges );
////	model.numVertices = 0;
////	model.numEdges = 0;
////	model.vertices = (cm_vertex_t *) Mem_ClearedAlloc( model.maxVertices * sizeof(cm_vertex_t) );
////	model.edges = (cm_edge_t *) Mem_ClearedAlloc( model.maxEdges * sizeof(cm_edge_t) );
////
////	cm_vertexHash.ResizeIndex( model.maxVertices );
////	cm_edgeHash.ResizeIndex( model.maxEdges );
////
////	model.name = name;
////	model.isConvex = false;
////
////	// convert brushes
////	for ( i = 0; i < mapEnt.GetNumPrimitives(); i++ ) {
////		idMapPrimitive	*mapPrim;
////
////		mapPrim = mapEnt.GetPrimitive(i);
////		if ( mapPrim.GetType() == idMapPrimitive::TYPE_BRUSH ) {
////			ConvertBrush( model, static_cast<idMapBrush*>(mapPrim), i );
////			continue;
////		}
////	}
////
////	// create an axial bsp tree for the model if it has more than just a bunch brushes
////	brushCount = CM_CountNodeBrushes( model.node );
////	if ( brushCount > 4 ) {
////		model.node = CreateAxialBSPTree( model, model.node );
////	} else {
////		model.node.planeType = -1;
////	}
////
////	// get bounds for hash
////	if ( brushCount ) {
////		idCollisionModelManagerLocal.CM_GetNodeBounds( &bounds, model.node );
////	} else {
////		bounds[0].Set( -256, -256, -256 );
////		bounds[1].Set( 256, 256, 256 );
////	}
////
////	// different models do not share edges and vertices with each other, so clear the hash
////	this.ClearHash( bounds );
////
////	// create polygons from patches and brushes
////	for ( i = 0; i < mapEnt.GetNumPrimitives(); i++ ) {
////		idMapPrimitive	*mapPrim;
////
////		mapPrim = mapEnt.GetPrimitive(i);
////		if ( mapPrim.GetType() == idMapPrimitive::TYPE_PATCH ) {
////			ConvertPatch( model, static_cast<idMapPatch*>(mapPrim), i );
////			continue;
////		}
////		if ( mapPrim.GetType() == idMapPrimitive::TYPE_BRUSH ) {
////			ConvertBrushSides( model, static_cast<idMapBrush*>(mapPrim), i );
////			continue;
////		}
////	}
////
////	FinishModel( model );
////
////	return model;
////}

/*
================
idCollisionModelManagerLocal::FindModel
================
*/
	FindModel ( name: string ): /*cmHandle_t*/ number {
		var i: number;

		// check if this model is already loaded
		for ( i = 0; i < this.numModels; i++ ) {
			if ( !this.models[i].name.Icmp( name ) ) {
				break;
			}
		}
		// if the model is already loaded
		if ( i < this.numModels ) {
			return i;
		}
		return -1;
	}

/*
==================
idCollisionModelManagerLocal::PrintModelInfo
==================
*/
	PrintModelInfo ( model: cm_model_t ): void {
		dlog( DEBUG_CM, "PrintModelInfo\n" );
		dlog( DEBUG_CM, "name = %s \n", model.name.c_str ( ) || "(null)" );
		dlog( DEBUG_CM, "numVertices = %i \n", model.numVertices );
		dlog( DEBUG_CM, "numEdges = %i \n", model.numEdges );
		dlog( DEBUG_CM, "numPolygons = %i \n", model.numPolygons );
		dlog( DEBUG_CM, "numBrushes = %i \n", model.numBrushes );
		dlog( DEBUG_CM, "numNodes = %i \n", model.numNodes );
		dlog( DEBUG_CM, "numPolygonRefs = %i \n", model.numPolygonRefs );
		dlog( DEBUG_CM, "numBrushRefs = %i \n", model.numBrushRefs );
		dlog( DEBUG_CM, "numInternalEdges = %i \n", model.numInternalEdges );
		dlog( DEBUG_CM, "numSharpEdges = %i \n", model.numSharpEdges );
		dlog( DEBUG_CM, "numRemovedPolys = %i \n", model.numRemovedPolys );
		dlog( DEBUG_CM, "numMergedPolys = %i \n", model.numMergedPolys );
		dlog( DEBUG_CM, "usedMemory = %i \n", model.usedMemory );

		common.Printf( "%6i vertices (%i KB)\n", model.numVertices, ( model.numVertices * sizeof( cm_vertex_t ) ) >> 10 );
		common.Printf( "%6i edges (%i KB)\n", model.numEdges, ( model.numEdges * sizeof( cm_edge_t ) ) >> 10 );
		common.Printf( "%6i polygons (%i KB)\n", model.numPolygons, model.polygonMemory >> 10 );
		common.Printf( "%6i brushes (%i KB)\n", model.numBrushes, model.brushMemory >> 10 );
		common.Printf( "%6i nodes (%i KB)\n", model.numNodes, ( model.numNodes * sizeof( cm_node_t ) ) >> 10 );
		common.Printf( "%6i polygon refs (%i KB)\n", model.numPolygonRefs, ( model.numPolygonRefs * sizeof( cm_polygonRef_t ) ) >> 10 );
		common.Printf( "%6i brush refs (%i KB)\n", model.numBrushRefs, ( model.numBrushRefs * sizeof( cm_brushRef_t ) ) >> 10 );
		common.Printf( "%6i internal edges\n", model.numInternalEdges );
		common.Printf( "%6i sharp edges\n", model.numSharpEdges );
		common.Printf( "%6i contained polygons removed\n", model.numRemovedPolys );
		common.Printf( "%6i polygons merged\n", model.numMergedPolys );
		common.Printf( "%6i KB total memory used\n", model.usedMemory >> 10 );
	}

/*
================
idCollisionModelManagerLocal::AccumulateModelInfo
================
*/
	AccumulateModelInfo ( model: cm_model_t ): void {
		var i: number;
		model.memset0 ( ); //memset( model, 0, sizeof( *model ) );
		// accumulate statistics of all loaded models
		for ( i = 0; i < this.numModels; i++ ) {
			model.numVertices += this.models[i].numVertices;
			model.numEdges += this.models[i].numEdges;
			model.numPolygons += this.models[i].numPolygons;
			model.polygonMemory += this.models[i].polygonMemory;
			model.numBrushes += this.models[i].numBrushes;
			model.brushMemory += this.models[i].brushMemory;
			model.numNodes += this.models[i].numNodes;
			model.numBrushRefs += this.models[i].numBrushRefs;
			model.numPolygonRefs += this.models[i].numPolygonRefs;
			model.numInternalEdges += this.models[i].numInternalEdges;
			model.numSharpEdges += this.models[i].numSharpEdges;
			model.numRemovedPolys += this.models[i].numRemovedPolys;
			model.numMergedPolys += this.models[i].numMergedPolys;
			model.usedMemory += this.models[i].usedMemory;
		}
	}

/////*
////================
////idCollisionModelManagerLocal::ModelInfo
////================
////*/
////void idCollisionModelManagerLocal::ModelInfo( cmHandle_t model ) {
////	cm_model_t modelInfo;
////
////	if ( model == -1 ) {
////		AccumulateModelInfo( &modelInfo );
////		this.PrintModelInfo( &modelInfo );
////		return;
////	}
////	if ( model < 0 || model > MAX_SUBMODELS || model > this.maxModels ) {
////		common.Printf( "idCollisionModelManagerLocal::ModelInfo: invalid model handle\n" );
////		return;
////	}
////	if ( !this.models[model] ) {
////		common.Printf( "idCollisionModelManagerLocal::ModelInfo: invalid model\n" );
////		return;
////	}
////
////	this.PrintModelInfo( this.models[model] );
////}
////
/////*
////================
////idCollisionModelManagerLocal::ListModels
////================
////*/
////void idCollisionModelManagerLocal::ListModels( ) {
////	int i, totalMemory;
////
////	totalMemory = 0;
////	for ( i = 0; i < this.numModels; i++ ) {
////		common.Printf( "%4d: %5d KB   %s\n", i, (this.models[i].usedMemory>>10), this.models[i].name.c_str() );
////		totalMemory += this.models[i].usedMemory;
////	}
////	common.Printf( "%4d KB in %d models\n", (totalMemory>>10), this.numModels );
////}

/*
================
idCollisionModelManagerLocal::BuildModels
================
*/
	BuildModels ( mapFile: idMapFile ): void {
		var i: number;
		var mapEnt: idMapEntity;

		var timer = new idTimer;
		timer.Start ( );

		if ( !this.LoadCollisionModelFile( mapFile.GetName ( ), mapFile.GetGeometryCRC ( ) ) ) {
			todoThrow ( );
			//if ( !mapFile.GetNumEntities() ) {
			//	return;
			//}

			//// load the .proc file bsp for data optimisation
			//this.LoadProcBSP( mapFile.GetName() );

			//// convert brushes and patches to collision data
			//for ( i = 0; i < mapFile.GetNumEntities(); i++ ) {
			//	mapEnt = mapFile.GetEntity(i);

			//	if ( this.numModels >= MAX_SUBMODELS ) {
			//		common.Error( "idCollisionModelManagerLocal::BuildModels: more than %d collision models", MAX_SUBMODELS );
			//		break;
			//	}
			//	this.models[this.numModels] = CollisionModelForMapEntity( mapEnt );
			//	if ( this.models[ this.numModels] ) {
			//		this.numModels++;
			//	}
			//}

			//// free the proc bsp which is only used for data optimization
			//Mem_Free( this.procNodes );
			//this.procNodes = null;

			//// write the collision models to a file
			//this.WriteCollisionModelsToFile( mapFile.GetName(), 0, this.numModels, mapFile.GetGeometryCRC() );
		}

		timer.Stop ( );

		// print statistics on collision data
		var model = new cm_model_t;
		this.AccumulateModelInfo( model );
		common.Printf( "collision data:\n" );
		common.Printf( "%6i models\n", this.numModels );
		this.PrintModelInfo( model );
		common.Printf( "%.0f msec to load collision data.\n", timer.Milliseconds ( ) );
	}


/*
================
idCollisionModelManagerLocal::LoadMap
================
*/
	LoadMap ( mapFile: idMapFile ): void {

		if ( mapFile == null ) {
			common.Error( "idCollisionModelManagerLocal::LoadMap: NULL mapFile" );
		}

		// check whether we can keep the current collision map based on the mapName and mapFileTime
		if ( this.loaded ) {
			if ( this.mapName.Icmp( mapFile.GetName ( ) ) == 0 ) {
				if ( mapFile.GetFileTime ( ) == this.mapFileTime ) {
					common.DPrintf( "Using loaded version\n" );
					return;
				}
				common.DPrintf( "Reloading modified map\n" );
			}
			this.FreeMap ( );
		}

		// clear the collision map
		this.Clear ( );

		// models
		this.maxModels = MAX_SUBMODELS;
		this.numModels = 0;
		this.models = newStructArray<cm_model_t>( cm_model_t, this.maxModels + 1 ); //(cm_model_t **) Mem_ClearedAlloc( (this.maxModels+1) * sizeof(cm_model_t *) );

		// setup hash to speed up finding shared vertices and edges
		this.SetupHash ( );

		// setup trace model structure
		this.SetupTrmModelStructure ( );

		// build collision models
		this.BuildModels( mapFile );

		// save name and time stamp
		this.mapName.equals( mapFile.GetName ( ) );
		this.mapFileTime = mapFile.GetFileTime ( );
		this.loaded = 1 /*true*/;

		// shutdown the hash
		this.ShutdownHash ( );
	}

/////*
////===================
////idCollisionModelManagerLocal::GetModelName
////===================
////*/
////const char *idCollisionModelManagerLocal::GetModelName( cmHandle_t model ) const {
////	if ( model < 0 || model > MAX_SUBMODELS || model >= this.numModels || !this.models[model] ) {
////		common.Printf( "idCollisionModelManagerLocal::GetModelBounds: invalid model handle\n" );
////		return "";
////	}
////	return this.models[model].name.c_str();
////}

/*
===================
idCollisionModelManagerLocal::GetModelBounds
===================
*/
	GetModelBounds ( model: /*cmHandle_t*/number, bounds: idBounds ): boolean {

		if ( model < 0 || model > MAX_SUBMODELS || model >= this.numModels || !this.models[model] ) {
			common.Printf( "idCollisionModelManagerLocal::GetModelBounds: invalid model handle\n" );
			return false;
		}

		bounds.opEquals( this.models[model].bounds );
		return true;
	}

/*
===================
idCollisionModelManagerLocal::GetModelContents
===================
*/
	GetModelContents ( model: /*cmHandle_t*/number, /*int &*/contents: R<number> ): boolean {
		if ( model < 0 || model > MAX_SUBMODELS || model >= this.numModels || !this.models[model] ) {
			common.Printf( "idCollisionModelManagerLocal::GetModelContents: invalid model handle\n" );
			return false;
		}

		contents.$ = this.models[model].contents;

		return true;
	}

/////*
////===================
////idCollisionModelManagerLocal::GetModelVertex
////===================
////*/
////bool idCollisionModelManagerLocal::GetModelVertex( cmHandle_t model, int vertexNum, idVec3 &vertex ) const {
////	if ( model < 0 || model > MAX_SUBMODELS || model >= this.numModels || !this.models[model] ) {
////		common.Printf( "idCollisionModelManagerLocal::GetModelVertex: invalid model handle\n" );
////		return false;
////	}
////
////	if ( vertexNum < 0 || vertexNum >= this.models[model].numVertices ) {
////		common.Printf( "idCollisionModelManagerLocal::GetModelVertex: invalid vertex number\n" );
////		return false;
////	}
////
////	vertex = this.models[model].vertices[vertexNum].p;
////
////	return true;
////}
////
/////*
////===================
////idCollisionModelManagerLocal::GetModelEdge
////===================
////*/
////bool idCollisionModelManagerLocal::GetModelEdge( cmHandle_t model, int edgeNum, idVec3 &start, idVec3 &end ) const {
////	if ( model < 0 || model > MAX_SUBMODELS || model >= this.numModels || !this.models[model] ) {
////		common.Printf( "idCollisionModelManagerLocal::GetModelEdge: invalid model handle\n" );
////		return false;
////	}
////
////	edgeNum = abs( edgeNum );
////	if ( edgeNum >= this.models[model].numEdges ) {
////		common.Printf( "idCollisionModelManagerLocal::GetModelEdge: invalid edge number\n" );
////		return false;
////	}
////
////	start = this.models[model].vertices[this.models[model].edges[edgeNum].vertexNum[0]].p;
////	end = this.models[model].vertices[this.models[model].edges[edgeNum].vertexNum[1]].p;
////
////	return true;
////}
////
/////*
////===================
////idCollisionModelManagerLocal::GetModelPolygon
////===================
////*/
////bool idCollisionModelManagerLocal::GetModelPolygon( cmHandle_t model, int polygonNum, idFixedWinding &winding ) const {
////	int i, edgeNum;
////	cm_polygon_t *poly;
////
////	if ( model < 0 || model > MAX_SUBMODELS || model >= this.numModels || !this.models[model] ) {
////		common.Printf( "idCollisionModelManagerLocal::GetModelPolygon: invalid model handle\n" );
////		return false;
////	}
////
////	poly = *reinterpret_cast<cm_polygon_t **>(&polygonNum);
////	winding.Clear();
////	for ( i = 0; i < poly.numEdges; i++ ) {
////		edgeNum = poly.edges[i];
////		winding += this.models[model].vertices[ this.models[model].edges[abs(edgeNum)].vertexNum[INTSIGNBITSET(edgeNum)] ].p;
////	}
////
////	return true;
////}

/*
==================
idCollisionModelManagerLocal::LoadModel
==================
*/
	LoadModel ( modelName: string, precache: boolean ): /*cmHandle_t*/number {
		var /*int */handle: number;

		handle = this.FindModel( modelName );
		if ( handle >= 0 ) {
			return handle;
		}

		if ( this.numModels >= MAX_SUBMODELS ) {
			common.Error( "idCollisionModelManagerLocal::LoadModel: no free slots\n" );
			return 0;
		}

		// try to load a .cm file
		if ( this.LoadCollisionModelFile( modelName, 0 ) ) {
			handle = this.FindModel( modelName );
			if ( handle >= 0 ) {
				return handle;
			} else {
				common.Warning( "idCollisionModelManagerLocal::LoadModel: collision file for '%s' contains different model", modelName );
			}
		}

		// if only precaching .cm files do not waste memory converting render this.models
		if ( precache ) {
			return 0;
		}

		// try to load a .ASE or .LWO model and convert it to a collision model
		this.models[this.numModels] = this.LoadRenderModel( modelName );
		if ( this.models[this.numModels] != null ) {
			this.numModels++;
			return ( this.numModels - 1 );
		}

		return 0;
	}

/////*
////==================
////idCollisionModelManagerLocal::TrmFromModel_r
////==================
////*/
////bool idCollisionModelManagerLocal::TrmFromModel_r( idTraceModel &trm, node: cm_node_t ) {
////	var pref: cm_polygonRef_t;
////	var p: cm_polygon_t;
////	var i:number;
////
////	while ( 1 ) {
////		for ( pref = node.polygons; pref; pref = pref.next ) {
////			p = pref.p;
////
////			if ( p.checkcount == this.checkCount ) {
////				continue;
////			}
////
////			p.checkcount = this.checkCount;
////
////			if ( trm.numPolys >= MAX_TRACEMODEL_POLYS ) {
////				return false;
////			}
////			// copy polygon properties
////			trm.polys[ trm.numPolys ].bounds = p.bounds;
////			trm.polys[ trm.numPolys ].normal = p.plane.Normal();
////			trm.polys[ trm.numPolys ].dist = p.plane.Dist();
////			trm.polys[ trm.numPolys ].numEdges = p.numEdges;
////			// copy edge index
////			for ( i = 0; i < p.numEdges; i++ ) {
////				trm.polys[ trm.numPolys ].edges[ i ] = p.edges[ i ];
////			}
////			trm.numPolys++;
////		}
////		if ( node.planeType == -1 ) {
////			break;
////		}
////		if ( !TrmFromModel_r( trm, node.children[1] ) ) {
////			return false;
////		}
////		node = node.children[0];
////	}
////	return true;
////}
////
/////*
////==================
////idCollisionModelManagerLocal::TrmFromModel
////
////  NOTE: polygon merging can merge colinear edges and as such might cause dangling edges.
////==================
////*/
////bool idCollisionModelManagerLocal::TrmFromModel( const model: cm_model_t, idTraceModel &trm ) {
////	int i, j, numEdgeUsers[MAX_TRACEMODEL_EDGES+1];
////
////	// if the model has too many vertices to fit in a trace model
////	if ( model.numVertices > MAX_TRACEMODEL_VERTS ) {
////		common.Printf( "idCollisionModelManagerLocal::TrmFromModel: model %s has too many vertices.\n", model.name.c_str() );
////		this.PrintModelInfo( model );
////		return false;
////	}
////
////	// plus one because the collision model accounts for the first unused edge
////	if ( model.numEdges > MAX_TRACEMODEL_EDGES+1 ) {
////		common.Printf( "idCollisionModelManagerLocal::TrmFromModel: model %s has too many edges.\n", model.name.c_str() );
////		this.PrintModelInfo( model );
////		return false;
////	}
////
////	trm.type = TRM_CUSTOM;
////	trm.numVerts = 0;
////	trm.numEdges = 1;
////	trm.numPolys = 0;
////	trm.bounds.Clear();
////
////	// copy polygons
////	this.checkCount++;
////	if ( !TrmFromModel_r( trm, model.node ) ) {
////		common.Printf( "idCollisionModelManagerLocal::TrmFromModel: model %s has too many polygons.\n", model.name.c_str() );
////		this.PrintModelInfo( model );
////		return false;
////	}
////
////	// copy vertices
////	for ( i = 0; i < model.numVertices; i++ ) {
////		trm.verts[ i ] = model.vertices[ i ].p;
////		trm.bounds.AddPoint( trm.verts[ i ] );
////	}
////	trm.numVerts = model.numVertices;
////
////	// copy edges
////	for ( i = 0; i < model.numEdges; i++ ) {
////		trm.edges[ i ].v[0] = model.edges[ i ].vertexNum[0];
////		trm.edges[ i ].v[1] = model.edges[ i ].vertexNum[1];
////	}
////	// minus one because the collision model accounts for the first unused edge
////	trm.numEdges = model.numEdges - 1;
////
////	// each edge should be used exactly twice
////	memset( numEdgeUsers, 0, sizeof(numEdgeUsers) );
////	for ( i = 0; i < trm.numPolys; i++ ) {
////		for ( j = 0; j < trm.polys[i].numEdges; j++ ) {
////			numEdgeUsers[ abs( trm.polys[i].edges[j] ) ]++;
////		}
////	}
////	for ( i = 1; i <= trm.numEdges; i++ ) {
////		if ( numEdgeUsers[i] != 2 ) {
////			common.Printf( "idCollisionModelManagerLocal::TrmFromModel: model %s has dangling edges, the model has to be an enclosed hull.\n", model.name.c_str() );
////			this.PrintModelInfo( model );
////			return false;
////		}
////	}
////
////	// assume convex
////	trm.isConvex = true;
////	// check if really convex
////	for ( i = 0; i < trm.numPolys; i++ ) {
////		// to be convex no vertices should be in front of any polygon plane
////		for ( j = 0; j < trm.numVerts; j++ ) {
////			if ( trm.polys[ i ].normal * trm.verts[ j ] - trm.polys[ i ].dist > 0.01f ) {
////				trm.isConvex = false;
////				break;
////			}
////		}
////		if ( j < trm.numVerts ) {
////			break;
////		}
////	}
////
////	// offset to center of model
////	trm.offset = trm.bounds.GetCenter();
////
////	trm.GenerateEdgeNormals();
////
////	return true;
////}
////
/////*
////==================
////idCollisionModelManagerLocal::TrmFromModel
////==================
////*/
////bool idCollisionModelManagerLocal::TrmFromModel( const char *modelName, idTraceModel &trm ) {
////	cmHandle_t handle;
////
////	handle = LoadModel( modelName, false );
////	if ( !handle ) {
////		common.Printf( "idCollisionModelManagerLocal::TrmFromModel: model %s not found.\n", modelName );
////		return false;
////	}
////
////	return TrmFromModel( this.models[ handle ], trm );
////}


//CollisionModel_contacts.cpp

////
/////*
////===============================================================================
////
////Retrieving contacts
////
////===============================================================================
////*/
////
/////*
////==================
////idCollisionModelManagerLocal::Contacts
////==================
////*/
////int idCollisionModelManagerLocal::Contacts( contactInfo_t *contacts, const int maxContacts, start:idVec3, const idVec6 &dir, const float depth,
////								const idTraceModel *trm, const idMat3 &trmAxis, int contentMask,
////								cmHandle_t model, const idVec3 &origin, const idMat3 &modelAxis ) {
////	trace_t results;
////	idVec3 end;
////
////	// same as Translation but instead of storing the first collision we store all collisions as contacts
////	idCollisionModelManagerLocal::getContacts = true;
////	idCollisionModelManagerLocal::contacts = contacts;
////	idCollisionModelManagerLocal::maxContacts = maxContacts;
////	idCollisionModelManagerLocal::numContacts = 0;
////	end = start + dir.SubVec3(0) * depth;
////	idCollisionModelManagerLocal::Translation( &results, start, end, trm, trmAxis, contentMask, model, origin, modelAxis );
////	if ( dir.SubVec3(1).LengthSqr() != 0.0f ) {
////		// FIXME: rotational contacts
////	}
////	idCollisionModelManagerLocal::getContacts = false;
////	idCollisionModelManagerLocal::maxContacts = 0;
////
////	return idCollisionModelManagerLocal::numContacts;
////}


//CollisionModel_debug


/*
================
idCollisionModelManagerLocal::ContentsFromString
================
*/
	ContentsFromString ( $string: string ): number {
		var /*int */i: number, contents = 0;
		var src = new idLexer( $string, idStr.Length( $string ), "ContentsFromString" );
		var token = new idToken;

		while ( src.ReadToken( token ) ) {
			if ( token.data == "," ) {
				continue;
			}
			for ( i = 1; cm_contentsNameByIndex[i] != null; i++ ) {
				if ( token.Icmp( cm_contentsNameByIndex[i] ) == 0 ) {
					contents |= cm_contentsFlagByIndex[i];
					break;
				}
			}
		}

		return contents;
	}

/////*
////================
////idCollisionModelManagerLocal::StringFromContents
////================
////*/
////const char *idCollisionModelManagerLocal::StringFromContents( const int contents ) const {
////	int i, length = 0;
////	static char contentsString[MAX_STRING_CHARS];
////
////	contentsString[0] = '\0';
////
////	for ( i = 1; cm_contentsFlagByIndex[i] != 0; i++ ) {
////		if ( contents & cm_contentsFlagByIndex[i] ) {
////			if ( length != 0 ) {
////				length += idStr::snPrintf( contentsString + length, sizeof( contentsString ) - length, "," );
////			}
////			length += idStr::snPrintf( contentsString + length, sizeof( contentsString ) - length, cm_contentsNameByIndex[i] );
////		}
////	}
////
////	return contentsString;
////}
////
/////*
////================
////idCollisionModelManagerLocal::DrawEdge
////================
////*/
////void idCollisionModelManagerLocal::DrawEdge( cm_model_t *model, int edgeNum, const idVec3 &origin, const idMat3 &axis ) {
////	int side;
////	cm_edge_t *edge;
////	idVec3 start, end, mid;
////	bool isRotated;
////
////	isRotated = axis.IsRotated();
////
////	edge = model->edges + abs(edgeNum);
////	side = edgeNum < 0;
////
////	start = model->vertices[edge->vertexNum[side]].p;
////	end = model->vertices[edge->vertexNum[!side]].p;
////	if ( isRotated ) {
////		start *= axis;
////		end *= axis;
////	}
////	start += origin;
////	end += origin;
////
////	if ( edge->internal ) {
////		if ( cm_drawInternal.GetBool() ) {
////			session->rw->DebugArrow( colorGreen, start, end, 1 );
////		}
////	} else {
////		if ( edge->numUsers > 2 ) {
////			session->rw->DebugArrow( colorBlue, start, end, 1 );
////		} else {
////			session->rw->DebugArrow( cm_color, start, end, 1 );
////		}
////	}
////
////	if ( cm_drawNormals.GetBool() ) {
////		mid = (start + end) * 0.5f;
////		if ( isRotated ) {
////			end = mid + 5 * (axis * edge->normal);
////		} else {
////			end = mid + 5 * edge->normal;
////		}
////		session->rw->DebugArrow( colorCyan, mid, end, 1 );
////	}
////}
////
/////*
////================
////idCollisionModelManagerLocal::DrawPolygon
////================
////*/
////void idCollisionModelManagerLocal::DrawPolygon( cm_model_t *model, cm_polygon_t *p, const idVec3 &origin, const idMat3 &axis, const idVec3 &viewOrigin ) {
////	int i, edgeNum;
////	cm_edge_t *edge;
////	idVec3 center, end, dir;
////
////	if ( cm_backFaceCull.GetBool() ) {
////		edgeNum = p->edges[0];
////		edge = model->edges + abs(edgeNum);
////		dir = model->vertices[edge->vertexNum[0]].p - viewOrigin;
////		if ( dir * p->plane.Normal() > 0.0f ) {
////			return;
////		}
////	}
////
////	if ( cm_drawNormals.GetBool() ) {
////		center = vec3_origin;
////		for ( i = 0; i < p->numEdges; i++ ) {
////			edgeNum = p->edges[i];
////			edge = model->edges + abs(edgeNum);
////			center += model->vertices[edge->vertexNum[edgeNum < 0]].p;
////		}
////		center *= (1.0f / p->numEdges);
////		if ( axis.IsRotated() ) {
////			center = center * axis + origin;
////			end = center + 5 * (axis * p->plane.Normal());
////		} else {
////			center += origin;
////			end = center + 5 * p->plane.Normal();
////		}
////		session->rw->DebugArrow( colorMagenta, center, end, 1 );
////	}
////
////	if ( cm_drawFilled.GetBool() ) {
////		idFixedWinding winding;
////		for ( i = p->numEdges - 1; i >= 0; i-- ) {
////			edgeNum = p->edges[i];
////			edge = model->edges + abs(edgeNum);
////			winding += origin + model->vertices[edge->vertexNum[INTSIGNBITSET(edgeNum)]].p * axis;
////		}
////		session->rw->DebugPolygon( cm_color, winding );
////	} else {
////		for ( i = 0; i < p->numEdges; i++ ) {
////			edgeNum = p->edges[i];
////			edge = model->edges + abs(edgeNum);
////			if ( edge->checkcount == checkCount ) {
////				continue;
////			}
////			edge->checkcount = checkCount;
////			DrawEdge( model, edgeNum, origin, axis );
////		}
////	}
////}
////
/////*
////================
////idCollisionModelManagerLocal::DrawNodePolygons
////================
////*/
////void idCollisionModelManagerLocal::DrawNodePolygons( cm_model_t *model, cm_node_t *node,
////										   const idVec3 &origin, const idMat3 &axis,
////										   const idVec3 &viewOrigin, const float radius ) {
////	var/*int*/i:number;
////	cm_polygon_t *p;
////	cm_polygonRef_t *pref;
////
////	while (1) {
////		for ( pref = node->polygons; pref; pref = pref->next ) {
////			p = pref->p;
////			if ( radius ) {
////				// polygon bounds should overlap with trace bounds
////				for ( i = 0; i < 3; i++ ) {
////					if ( p->bounds[0][i] > viewOrigin[i] + radius ) {
////						break;
////					}
////					if ( p->bounds[1][i] < viewOrigin[i] - radius ) {
////						break;
////					}
////				}
////				if ( i < 3 ) {
////					continue;
////				}
////			}
////			if ( p->checkcount == checkCount ) {
////				continue;
////			}
////			if ( !( p->contents & cm_contentsFlagByIndex[cm_drawMask.GetInteger()] ) ) {
////				continue;
////			}
////
////			DrawPolygon( model, p, origin, axis, viewOrigin );
////			p->checkcount = checkCount;
////		}
////		if ( node->planeType == -1 ) {
////			break;
////		}
////		if ( radius && viewOrigin[node->planeType] > node->planeDist + radius  ) {
////			node = node->children[0];
////		} else if ( radius && viewOrigin[node->planeType] < node->planeDist - radius  ) {
////			node = node->children[1];
////		} else {
////			DrawNodePolygons( model, node->children[1], origin, axis, viewOrigin, radius );
////			node = node->children[0];
////		}
////	}
////}
////
/////*
////================
////idCollisionModelManagerLocal::DrawModel
////================
////*/
////void idCollisionModelManagerLocal::DrawModel( cmHandle_t handle, const idVec3 &modelOrigin, const idMat3 &modelAxis,
////					const idVec3 &viewOrigin, const float radius ) {
////
////	cm_model_t *model;
////	idVec3 viewPos;
////
////	if ( handle < 0 && handle >= numModels ) {
////		return;
////	}
////
////	if ( cm_drawColor.IsModified() ) {
////		sscanf( cm_drawColor.GetString(), "%f %f %f %f", &cm_color.x, &cm_color.y, &cm_color.z, &cm_color.w );
////		cm_drawColor.ClearModified();
////	}
////
////	model = models[ handle ];
////	viewPos = (viewOrigin - modelOrigin) * modelAxis.Transpose();
////	checkCount++;
////	DrawNodePolygons( model, model->node, modelOrigin, modelAxis, viewPos, radius );
////}


// CollisionModel_files.cpp.ts


/////*
////================
////idCollisionModelManagerLocal::WriteNodes
////================
////*/
////void idCollisionModelManagerLocal::WriteNodes( idFile *fp, cm_node_t *node ) {
////	fp.WriteFloatString( "\t( %d %f )\n", node.planeType, node.planeDist );
////	if ( node.planeType != -1 ) {
////		WriteNodes( fp, node.children[0] );
////		WriteNodes( fp, node.children[1] );
////	}
////}
////
/////*
////================
////idCollisionModelManagerLocal::CountPolygonMemory
////================
////*/
////int idCollisionModelManagerLocal::CountPolygonMemory( cm_node_t *node ) const {
////	cm_polygonRef_t *pref;
////	cm_polygon_t *p;
////	int memory;
////
////	memory = 0;
////	for ( pref = node.polygons; pref; pref = pref.next ) {
////		p = pref.p;
////		if ( p.checkcount == this.checkCount ) {
////			continue;
////		}
////		p.checkcount = this.checkCount;
////
////		memory += sizeof( cm_polygon_t ) + ( p.numEdges - 1 ) * sizeof( p.edges[0] );
////	}
////	if ( node.planeType != -1 ) {
////		memory += CountPolygonMemory( node.children[0] );
////		memory += CountPolygonMemory( node.children[1] );
////	}
////	return memory;
////}
////
/////*
////================
////idCollisionModelManagerLocal::WritePolygons
////================
////*/
////void idCollisionModelManagerLocal::WritePolygons( idFile *fp, cm_node_t *node ) {
////	cm_polygonRef_t *pref;
////	cm_polygon_t *p;
////	var i:number/*int*/;
////
////	for ( pref = node.polygons; pref; pref = pref.next ) {
////		p = pref.p;
////		if ( p.checkcount == this.checkCount ) {
////			continue;
////		}
////		p.checkcount = this.checkCount;
////		fp.WriteFloatString( "\t%d (", p.numEdges );
////		for ( i = 0; i < p.numEdges; i++ ) {
////			fp.WriteFloatString( " %d", p.edges[i] );
////		}
////		fp.WriteFloatString( " ) ( %f %f %f ) %f", p.plane.Normal()[0], p.plane.Normal()[1], p.plane.Normal()[2], p.plane.Dist() );
////		fp.WriteFloatString( " ( %f %f %f )", p.bounds[0][0], p.bounds[0][1], p.bounds[0][2] );
////		fp.WriteFloatString( " ( %f %f %f )", p.bounds[1][0], p.bounds[1][1], p.bounds[1][2] );
////		fp.WriteFloatString( " \"%s\"\n", p.material.GetName() );
////	}
////	if ( node.planeType != -1 ) {
////		WritePolygons( fp, node.children[0] );
////		WritePolygons( fp, node.children[1] );
////	}
////}
////
/////*
////================
////idCollisionModelManagerLocal::CountBrushMemory
////================
////*/
////int idCollisionModelManagerLocal::CountBrushMemory( cm_node_t *node ) const {
////	cm_brushRef_t *bref;
////	cm_brush_t *b;
////	int memory;
////
////	memory = 0;
////	for ( bref = node.brushes; bref; bref = bref.next ) {
////		b = bref.b;
////		if ( b.checkcount == this.checkCount ) {
////			continue;
////		}
////		b.checkcount = this.checkCount;
////
////		memory += sizeof( cm_brush_t ) + ( b.numPlanes - 1 ) * sizeof( b.planes[0] );
////	}
////	if ( node.planeType != -1 ) {
////		memory += CountBrushMemory( node.children[0] );
////		memory += CountBrushMemory( node.children[1] );
////	}
////	return memory;
////}
////
/////*
////================
////idCollisionModelManagerLocal::WriteBrushes
////================
////*/
////void idCollisionModelManagerLocal::WriteBrushes( idFile *fp, cm_node_t *node ) {
////	cm_brushRef_t *bref;
////	cm_brush_t *b;
////	var i:number/*int*/;
////
////	for ( bref = node.brushes; bref; bref = bref.next ) {
////		b = bref.b;
////		if ( b.checkcount == this.checkCount ) {
////			continue;
////		}
////		b.checkcount = this.checkCount;
////		fp.WriteFloatString( "\t%d {\n", b.numPlanes );
////		for ( i = 0; i < b.numPlanes; i++ ) {
////			fp.WriteFloatString( "\t\t( %f %f %f ) %f\n", b.planes[i].Normal()[0], b.planes[i].Normal()[1], b.planes[i].Normal()[2], b.planes[i].Dist() );
////		}
////		fp.WriteFloatString( "\t} ( %f %f %f )", b.bounds[0][0], b.bounds[0][1], b.bounds[0][2] );
////		fp.WriteFloatString( " ( %f %f %f ) \"%s\"\n", b.bounds[1][0], b.bounds[1][1], b.bounds[1][2], StringFromContents( b.contents ) );
////	}
////	if ( node.planeType != -1 ) {
////		WriteBrushes( fp, node.children[0] );
////		WriteBrushes( fp, node.children[1] );
////	}
////}
////
/////*
////================
////idCollisionModelManagerLocal::WriteCollisionModel
////================
////*/
////void idCollisionModelManagerLocal::WriteCollisionModel( idFile *fp, cm_model_t *model ) {
////	int i, polygonMemory, brushMemory;
////
////	fp.WriteFloatString( "collisionModel \"%s\" {\n", model.name.c_str() );
////	// vertices
////	fp.WriteFloatString( "\tvertices { /* numVertices = */ %d\n", model.numVertices );
////	for ( i = 0; i < model.numVertices; i++ ) {
////		fp.WriteFloatString( "\t/* %d */ ( %f %f %f )\n", i, model.vertices[i].p[0], model.vertices[i].p[1], model.vertices[i].p[2] );
////	}
////	fp.WriteFloatString( "\t}\n" );
////	// edges
////	fp.WriteFloatString( "\tedges { /* numEdges = */ %d\n", model.numEdges );
////	for ( i = 0; i < model.numEdges; i++ ) {
////		fp.WriteFloatString( "\t/* %d */ ( %d %d ) %d %d\n", i, model.edges[i].vertexNum[0], model.edges[i].vertexNum[1], model.edges[i].internal, model.edges[i].numUsers );
////	}
////	fp.WriteFloatString( "\t}\n" );
////	// nodes
////	fp.WriteFloatString( "\tnodes {\n" );
////	WriteNodes( fp, model.node );
////	fp.WriteFloatString( "\t}\n" );
////	// polygons
////	this.checkCount++;
////	polygonMemory = CountPolygonMemory( model.node );
////	fp.WriteFloatString( "\tpolygons /* polygonMemory = */ %d {\n", polygonMemory );
////	this.checkCount++;
////	WritePolygons( fp, model.node );
////	fp.WriteFloatString( "\t}\n" );
////	// brushes
////	this.checkCount++;
////	brushMemory = CountBrushMemory( model.node );
////	fp.WriteFloatString( "\tbrushes /* brushMemory = */ %d {\n", brushMemory );
////	this.checkCount++;
////	WriteBrushes( fp, model.node );
////	fp.WriteFloatString( "\t}\n" );
////	// closing brace
////	fp.WriteFloatString( "}\n" );
////}
////
/////*
////================
////idCollisionModelManagerLocal::WriteCollisionModelsToFile
////================
////*/
////void idCollisionModelManagerLocal::WriteCollisionModelsToFile( const char *filename, int firstModel, int lastModel, unsigned int mapFileCRC ) {
////	var i:number/*int*/;
////	idFile *fp;
////	idStr name;
////
////	name = filename;
////	name.SetFileExtension( CM_FILE_EXT );
////
////	common.Printf( "writing %s\n", name.c_str() );
////	// _D3XP was saving to fs_cdpath
////	fp = fileSystem.OpenFileWrite( name, "fs_devpath" );
////	if ( !fp ) {
////		common.Warning( "idCollisionModelManagerLocal::WriteCollisionModelsToFile: Error opening file %s\n", name.c_str() );
////		return;
////	}
////
////	// write file id and version
////	fp.WriteFloatString( "%s \"%s\"\n\n", CM_FILEID, CM_FILEVERSION );
////	// write the map file crc
////	fp.WriteFloatString( "%u\n\n", mapFileCRC );
////
////	// write the collision models
////	for ( i = firstModel; i < lastModel; i++ ) {
////		WriteCollisionModel( fp, models[ i ] );
////	}
////
////	fileSystem.CloseFile( fp );
////}
////
/////*
////================
////idCollisionModelManagerLocal::WriteCollisionModelForMapEntity
////================
////*/
////bool idCollisionModelManagerLocal::WriteCollisionModelForMapEntity( const idMapEntity *mapEnt, const char *filename, const bool testTraceModel ) {
////	idFile *fp;
////	idStr name;
////	cm_model_t *model;
////
////	SetupHash();
////	model = CollisionModelForMapEntity( mapEnt );
////	model.name = filename;
////
////	name = filename;
////	name.SetFileExtension( CM_FILE_EXT );
////
////	common.Printf( "writing %s\n", name.c_str() );
////	fp = fileSystem.OpenFileWrite( name, "fs_devpath" );
////	if ( !fp ) {
////		common.Printf( "idCollisionModelManagerLocal::WriteCollisionModelForMapEntity: Error opening file %s\n", name.c_str() );
////		FreeModel( model );
////		return false;
////	}
////
////	// write file id and version
////	fp.WriteFloatString( "%s \"%s\"\n\n", CM_FILEID, CM_FILEVERSION );
////	// write the map file crc
////	fp.WriteFloatString( "%u\n\n", 0 );
////
////	// write the collision model
////	WriteCollisionModel( fp, model );
////
////	fileSystem.CloseFile( fp );
////
////	if ( testTraceModel ) {
////		idTraceModel trm;
////		TrmFromModel( model, trm );
////	}
////
////	FreeModel( model );
////
////	return true;
////}


/*
===============================================================================

Loading of collision model file

===============================================================================
*/

/*
================
idCollisionModelManagerLocal::ParseVertices
================
*/
	ParseVertices ( src: idLexer, model: cm_model_t ): void {
		var i: number /*int*/;

		src.ExpectTokenString( "{" );
		model.numVertices = src.ParseInt ( );
		model.maxVertices = model.numVertices;
		model.vertices = newStructArray<cm_vertex_t>( cm_vertex_t, model.maxVertices ); //(cm_vertex_t *) Mem_Alloc( model.maxVertices * sizeof( cm_vertex_t ) );
		for ( i = 0; i < model.numVertices; i++ ) {
			src.Parse1DMatrix( 3, model.vertices[i].p.ToFloatPtr ( ) );
			model.vertices[i].side = 0;
			model.vertices[i].sideSet = 0;
			model.vertices[i].checkcount = 0;
		}
		src.ExpectTokenString( "}" );
	}

/*
================
idCollisionModelManagerLocal::ParseEdges
================
*/
	ParseEdges ( src: idLexer, model: cm_model_t ): void {
		var i: number /*int*/;

		src.ExpectTokenString( "{" );
		model.numEdges = src.ParseInt ( );
		model.maxEdges = model.numEdges;
		model.edges = newStructArray<cm_edge_t>( cm_edge_t, model.maxEdges ); // (cm_edge_t *) Mem_Alloc( model.maxEdges * sizeof( cm_edge_t ) );
		for ( i = 0; i < model.numEdges; i++ ) {
			src.ExpectTokenString( "(" );
			model.edges[i].vertexNum[0] = src.ParseInt ( );
			model.edges[i].vertexNum[1] = src.ParseInt ( );
			src.ExpectTokenString( ")" );
			model.edges[i].side = 0;
			model.edges[i].sideSet = 0;
			model.edges[i].internal = src.ParseInt ( );
			model.edges[i].numUsers = src.ParseInt ( );
			model.edges[i].normal.equals( vec3_origin );
			model.edges[i].checkcount = 0;
			model.numInternalEdges += model.edges[i].internal;
		}
		src.ExpectTokenString( "}" );
	}

/*
================
idCollisionModelManagerLocal::ParseNodes
================
*/
	ParseNodes ( src: idLexer, model: cm_model_t, parent: cm_node_t ): cm_node_t {
		var node: cm_node_t;

		model.numNodes++;
		node = this.AllocNode( model, model.numNodes < NODE_BLOCK_SIZE_SMALL ? NODE_BLOCK_SIZE_SMALL : NODE_BLOCK_SIZE_LARGE );
		node.brushes = null;
		node.polygons = null;
		node.parent = parent;
		src.ExpectTokenString( "(" );
		node.planeType = src.ParseInt ( );
		node.planeDist = src.ParseFloat ( );
		src.ExpectTokenString( ")" );
		if ( node.planeType != -1 ) {
			node.children[0] = this.ParseNodes( src, model, node );
			node.children[1] = this.ParseNodes( src, model, node );
		}
		return node;
	}

/*
================
idCollisionModelManagerLocal::ParsePolygons
================
*/
	ParsePolygons ( src: idLexer, model: cm_model_t ): void {
		var p: cm_polygon_t;
		var /*int */i: number, numEdges: number;
		var normal = new idVec3;
		var token = new idToken;

		if ( src.CheckTokenType( TT_NUMBER, 0, token ) ) {
			model.polygonBlock = new cm_polygonBlock_t( token.GetIntValue ( ) ); // (cm_polygonBlock_t *) Mem_Alloc( sizeof( cm_polygonBlock_t ) + token.GetIntValue() );
			model.polygonBlock.bytesRemaining = token.GetIntValue ( );
			model.polygonBlock.nextPtr = 0; //model->polygonBlock->next = ( (byte *) model->polygonBlock ) + sizeof( cm_polygonBlock_t );
		}

		src.ExpectTokenString( "{" );
		while ( !src.CheckTokenString( "}" ) ) {
			// parse polygon
			numEdges = src.ParseInt ( );
			p = this.AllocPolygon( model, numEdges );
			p.numEdges = numEdges;
			src.ExpectTokenString( "(" );
			for ( i = 0; i < p.numEdges; i++ ) {
				p.edges[i] = src.ParseInt ( );
			}
			src.ExpectTokenString( ")" );
			src.Parse1DMatrix( 3, normal.ToFloatPtr ( ) );
			p.plane.SetNormal( normal );
			p.plane.SetDist( src.ParseFloat ( ) );
			src.Parse1DMatrix( 3, p.bounds[0].ToFloatPtr ( ) );
			src.Parse1DMatrix( 3, p.bounds[1].ToFloatPtr ( ) );
			src.ExpectTokenType( TT_STRING, 0, token );
			// get material
			p.material = declManager.FindMaterial( token.data );
			p.contents = p.material.GetContentFlags ( );
			p.checkcount = 0;
			// filter polygon into tree
			this.R_FilterPolygonIntoTree( model, model.node, null, p );
		}
	}

/*
================
idCollisionModelManagerLocal::ParseBrushes
================
*/
	ParseBrushes ( src: idLexer, model: cm_model_t ): void {
		var b: cm_brush_t;
		var /*int */i: number, numPlanes: number;
		var normal = new idVec3;
		var token = new idToken;

		if ( src.CheckTokenType( TT_NUMBER, 0, token ) ) {
			model.brushBlock = new cm_brushBlock_t( token.GetIntValue ( ) ); //(cm_brushBlock_t *) Mem_Alloc( sizeof( cm_brushBlock_t ) + token.GetIntValue() );
			model.brushBlock.bytesRemaining = token.GetIntValue ( );
			model.polygonBlock.nextPtr = 0; //model->brushBlock->next = ( (byte *) model->brushBlock ) + sizeof( cm_brushBlock_t );
		}

		src.ExpectTokenString( "{" );
		while ( !src.CheckTokenString( "}" ) ) {
			// parse brush
			numPlanes = src.ParseInt ( );
			b = this.AllocBrush( model, numPlanes );
			b.numPlanes = numPlanes;
			src.ExpectTokenString( "{" );
			for ( i = 0; i < b.numPlanes; i++ ) {
				src.Parse1DMatrix( 3, normal.ToFloatPtr ( ) );
				b.planes[i].SetNormal( normal );
				b.planes[i].SetDist( src.ParseFloat ( ) );
			}
			src.ExpectTokenString( "}" );
			src.Parse1DMatrix( 3, b.bounds[0].ToFloatPtr ( ) );
			src.Parse1DMatrix( 3, b.bounds[1].ToFloatPtr ( ) );
			src.ReadToken( token );
			if ( token.type == TT_NUMBER ) {
				b.contents = token.GetIntValue ( ); // old .cm files use a single integer
			} else {
				b.contents = this.ContentsFromString( token.data );
			}
			b.checkcount = 0;
			b.primitiveNum = 0;
			// filter brush into tree
			this.R_FilterBrushIntoTree( model, model.node, null, b );
		}
	}

/*
================
idCollisionModelManagerLocal::ParseCollisionModel
================
*/
	ParseCollisionModel ( src: idLexer ): boolean {
		var model: cm_model_t;
		var token = new idToken;

		if ( this.numModels >= MAX_SUBMODELS ) {
			common.Error( "LoadModel: no free slots" );
			return false;
		}
		model = this.AllocModel ( );
		this.models[this.numModels] = model;
		this.numModels++;
		// parse the file
		src.ExpectTokenType( TT_STRING, 0, token );
		model.name.equals( token );
		src.ExpectTokenString( "{" );
		while ( !src.CheckTokenString( "}" ) ) {

			src.ReadToken( token );

			if ( token.data == "vertices" ) {
				this.ParseVertices( src, model );
				continue;
			}

			if ( token.data == "edges" ) {
				this.ParseEdges( src, model );
				continue;
			}

			if ( token.data == "nodes" ) {
				src.ExpectTokenString( "{" );
				model.node = this.ParseNodes( src, model, null );
				src.ExpectTokenString( "}" );
				continue;
			}

			if ( token.data == "polygons" ) {
				this.ParsePolygons( src, model );
				continue;
			}

			if ( token.data == "brushes" ) {
				this.ParseBrushes( src, model );
				continue;
			}

			src.Error( "ParseCollisionModel: bad token \"%s\"", token.c_str ( ) );
		}
		// calculate edge normals
		this.checkCount++;
		this.CalculateEdgeNormals( model, model.node );
		// get model bounds from brush and polygon bounds
		idCollisionModelManagerLocal.CM_GetNodeBounds( model.bounds, model.node );
		// get model contents
		model.contents = idCollisionModelManagerLocal.CM_GetNodeContents( model.node );
		// total memory used by this model
		model.usedMemory = model.numVertices * sizeof( cm_vertex_t ) +
			model.numEdges * sizeof( cm_edge_t ) +
			model.polygonMemory +
			model.brushMemory +
			model.numNodes * sizeof( cm_node_t ) +
			model.numPolygonRefs * sizeof( cm_polygonRef_t ) +
			model.numBrushRefs * sizeof( cm_brushRef_t );

		dlog( DEBUG_CM, "idCollisionModelManagerLocal::ParseCollisionModel\n" );
		dlog( DEBUG_CM, "numVertices %i\n", model.numVertices );
		dlog( DEBUG_CM, "numEdges %i\n", model.numEdges );
		dlog( DEBUG_CM, "nolygonMemory %i\n", model.polygonMemory );
		dlog( DEBUG_CM, "nrushMemory %i\n", model.brushMemory );
		dlog( DEBUG_CM, "numNodes %i\n", model.numNodes );
		dlog( DEBUG_CM, "numPolygonRefs %i\n", model.numPolygonRefs );
		dlog( DEBUG_CM, "numBrushRefs %i\n", model.numBrushRefs );
		return true;
	}

/*
================
idCollisionModelManagerLocal::LoadCollisionModelFile
================
*/
	LoadCollisionModelFile ( name: string, /*unsigned int */mapFileCRC: number ): boolean {
		var fileName = new idStr;
		var token = new idToken;
		var src: idLexer;
		var crc: number /*unsigned int */;

		// load it
		fileName.equals( name );
		fileName.SetFileExtension( CM_FILE_EXT );
		src = new idLexer( fileName.data );
		src.SetFlags( lexerFlags_t.LEXFL_NOSTRINGCONCAT | lexerFlags_t.LEXFL_NODOLLARPRECOMPILE );
		if ( !src.IsLoaded ( ) ) {
			$delete( src );
			return false;
		}

		if ( !src.ExpectTokenString( CM_FILEID ) ) {
			common.Warning( "%s is not an CM file.", fileName.c_str ( ) );
			$delete( src );
			return false;
		}

		if ( !src.ReadToken( token ) || token.data != CM_FILEVERSION ) {
			common.Warning( "%s has version %s instead of %s", fileName.c_str ( ), token.c_str ( ), CM_FILEVERSION );
			$delete( src );
			return false;
		}

		if ( !src.ExpectTokenType( TT_NUMBER, TT_INTEGER, token ) ) {
			common.Warning( "%s has no map file CRC", fileName.c_str ( ) );
			$delete( src );
			return false;
		}

		crc = token.GetUnsignedLongValue ( );
		if ( mapFileCRC && crc != mapFileCRC ) {
			common.Printf( "%s is out of date\n", fileName.c_str ( ) );
			$delete( src );
			return false;
		}

		// parse the file
		while ( 1 ) {
			if ( !src.ReadToken( token ) ) {
				break;
			}

			if ( token.data == "collisionModel" ) {
				if ( !this.ParseCollisionModel( src ) ) {
					$delete( src );
					return false;
				}
				continue;
			}

			src.Error( "idCollisionModelManagerLocal::LoadCollisionModelFile: bad token \"%s\"", token.c_str ( ) );
		}

		$delete( src );

		return true;
	}


}
////
////// for debugging
////extern idCVar cm_debugCollision;
