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
////#ifndef __AASFILE_H__
////#define __AASFILE_H__
////
/*
===============================================================================

	AAS File

===============================================================================
*/

var AAS_FILEID				=	"DewmAAS"
var AAS_FILEVERSION			=	"1.07"

// travel flags
var TFL_INVALID					=BIT(0)		// not valid
var TFL_WALK					=BIT(1)		// walking
var TFL_CROUCH					=BIT(2)		// crouching
var TFL_WALKOFFLEDGE			=BIT(3)		// walking of a ledge
var TFL_BARRIERJUMP				=BIT(4)		// jumping onto a barrier
var TFL_JUMP					=BIT(5)		// jumping
var TFL_LADDER					=BIT(6)		// climbing a ladder
var TFL_SWIM					=BIT(7)		// swimming
var TFL_WATERJUMP				=BIT(8)		// jump out of the water
var TFL_TELEPORT				=BIT(9)		// teleportation
var TFL_ELEVATOR				=BIT(10)		// travel by elevator
var TFL_FLY						=BIT(11)		// fly
var TFL_SPECIAL					=BIT(12)		// special
var TFL_WATER					=BIT(21)		// travel through water
var TFL_AIR						=BIT(22)		// travel through air

// face flags
var FACE_SOLID					=BIT(0)		// solid at the other side
var FACE_LADDER					=BIT(1)		// ladder surface
var FACE_FLOOR					=BIT(2)		// standing on floor when on this face
var FACE_LIQUID					=BIT(3)		// face seperating two areas with liquid
var FACE_LIQUIDSURFACE			=BIT(4)		// face seperating liquid and air

// area flags
var AREA_FLOOR					=BIT(0)		// AI can stand on the floor in this area
var AREA_GAP					=BIT(1)		// area has a gap
var AREA_LEDGE					=BIT(2)		// if entered the AI bbox partly floats above a ledge
var AREA_LADDER					=BIT(3)		// area contains one or more ladder faces
var AREA_LIQUID					=BIT(4)		// area contains a liquid
var AREA_CROUCH					=BIT(5)		// AI cannot walk but can only crouch in this area
var AREA_REACHABLE_WALK			=BIT(6)		// area is reachable by walking or swimming
var AREA_REACHABLE_FLY			=BIT(7)		// area is reachable by flying

// area contents flags
var AREACONTENTS_SOLID			=BIT(0)		// solid, not a valid area
var AREACONTENTS_WATER			=BIT(1)		// area contains water
var AREACONTENTS_CLUSTERPORTAL	=BIT(2)		// area is a cluster portal
var AREACONTENTS_OBSTACLE		=BIT(3)		// area contains (part of) a dynamic obstacle
var AREACONTENTS_TELEPORTER		=BIT(4)		// area contains (part of) a teleporter trigger

// bits for different bboxes
var AREACONTENTS_BBOX_BIT		=24

var MAX_REACH_PER_AREA			=256
var MAX_AAS_TREE_DEPTH			=128

var MAX_AAS_BOUNDING_BOXES		=4

// reachability to another area
class idReachability {
////public:
////	int							travelType;			// type of travel required to get to the area
////	short						toAreaNum;			// number of the reachable area
////	short						fromAreaNum;		// number of area the reachability starts
////	idVec3						start;				// start point of inter area movement
////	idVec3						end;				// end point of inter area movement
////	int							edgeNum;			// edge crossed by this reachability
////	unsigned short				travelTime;			// travel time of the inter area movement
////	byte						number;				// reachability number within the fromAreaNum (must be < 256)
////	byte						disableCount;		// number of times this reachability has been disabled
////	idReachability *			next;				// next reachability in list
////	idReachability *			rev_next;			// next reachability in reversed list
////	unsigned short *			areaTravelTimes;	// travel times within the fromAreaNum from reachabilities that lead towards this area
////public:
////	void						CopyBase( idReachability &reach );
////};
////
////class idReachability_Walk : public idReachability {
////};
////
////class idReachability_BarrierJump : public idReachability {
////};
////
////class idReachability_WaterJump : public idReachability {
////};
////
////class idReachability_WalkOffLedge : public idReachability {
////};
////
////class idReachability_Swim : public idReachability {
////};
////
////class idReachability_Fly : public idReachability {
////};
////
////class idReachability_Special : public idReachability {
////public:
////	idDict						dict;
};
////
////// index
////typedef int aasIndex_t;
////
// vertex
//var aasVertex_t = idVec3;

// edge
class aasEdge_t {
	vertexNum = new Int32Array(2);		// numbers of the vertexes of this edge
} ;

// area boundary face
class aasFace_t {
	planeNum: number/*unsigned short*/;			// number of the plane this face is on
	flags: number/*unsigned short*/;				// face flags
	numEdges:number/*int*/;			// number of edges in the boundary of the face
	firstEdge:number/*int*/;			// first edge in the edge index
	areas = new Int16Array(2);			// area at the front and back of this face
} ;

// area with a boundary of faces
class aasArea_t{
	numFaces:number/*int*/;			// number of faces used for the boundary of the area
	firstFace:number/*int*/;			// first face in the face index used for the boundary of the area
	bounds = new idBounds();				// bounds of the area
	center = new idVec3();				// center of the area an AI can move towards
	flags: number/*unsigned short*/;				// several area flags
	contents: number/*unsigned short*/;			// contents of the area
	cluster:number/*short*/;			// cluster the area belongs to, if negative it's a portal
	clusterAreaNum:number/*short*/;		// number of the area in the cluster
	travelFlags:number/*int*/;		// travel flags for traveling through this area
	reach: idReachability;				// reachabilities that start from this area
	rev_reach: idReachability;			// reachabilities that lead to this area
} ;

// nodes of the bsp tree
class aasNode_t {
	planeNum: number/*unsigned short*/;			// number of the plane that splits the subspace at this node
	children = new Int32Array(2);		// child nodes, zero is solid, negative is -(area number)
} ;

// cluster portal
class aasPortal_t {
	areaNum:number/*short*/;			// number of the area that is the actual portal
	clusters = new Int16Array(2);		// number of cluster at the front and back of the portal
	clusterAreaNum = new Int16Array(2);	// number of this portal area in the front and back cluster
	maxAreaTravelTime: number/*unsigned short*/;	// maximum travel time through the portal area
} ;

// cluster
class aasCluster_t {
	numAreas:number/*int*/;			// number of areas in the cluster
	numReachableAreas:number/*int*/;	// number of areas with reachabilities
	numPortals:number/*int*/;			// number of cluster portals
	firstPortal:number/*int*/;		// first cluster portal in the index
} ;

 //trace through the world
class aasTrace_t {
	// parameters
	flags:number/*int*/;				// areas with these flags block the trace
	travelFlags:number/*int*/;		// areas with these travel flags block the trace
	maxAreas:number/*int*/;			// size of the 'areas' array
	getOutOfSolid:number/*int*/;		// trace out of solid if the trace starts in solid
	// output
	fraction:number/*float*/;			// fraction of trace completed
	endpos = new idVec3();				// end position of trace
	planeNum:number/*int*/;			// plane hit
	lastAreaNum:number/*int*/;		// number of last area the trace went through
	blockingAreaNum:number/*int*/;	// area that could not be entered
	numAreas:number/*int*/;			// number of areas the trace went through
	areas:Int32Array;				// array to store areas the trace went through
	points:idVec3[];				// points where the trace entered each new area
	//aasTrace_s( ) { areas = NULL; points = NULL; getOutOfSolid = false; flags = travelFlags = maxAreas = 0; }
};

 //settings
class idAASSettings {
//public:
	// collision settings
	numBoundingBoxes:number/*int*/;
	boundingBoxes = newStructArray<idBounds>(idBounds,MAX_AAS_BOUNDING_BOXES);
	usePatches:boolean;
	writeBrushMap:boolean;
	playerFlood:boolean;
	noOptimize:boolean;
	allowSwimReachabilities:boolean;
	allowFlyReachabilities:boolean;
	fileExtension=new idStr;
	// physics settings
	gravity=new idVec3;
	gravityDir = new idVec3;
	invGravityDir = new idVec3;
	gravityValue:number/*float*/;
	maxStepHeight:number/*float*/;
	maxBarrierHeight:number/*float*/;
	maxWaterJumpHeight:number/*float*/;
	maxFallHeight:number/*float*/;
	minFloorCos:number/*float*/;
	// fixed travel times
	tt_barrierJump:number/*int*/;
	tt_startCrouching:number/*int*/;
	tt_waterJump:number/*int*/;
	tt_startWalkOffLedge:number/*int*/;

//public:
//								idAASSettings( );

//	bool						FromFile( const idStr &fileName );
//	bool						FromParser( idLexer &src );
//	bool						FromDict( const char *name, const idDict *dict );
//	bool						WriteToFile( idFile *fp ) const;
//	bool						ValidForBounds( const idBounds &bounds ) const;
//	bool						ValidEntity( const char *classname ) const;

//private:
//	bool						ParseBool( idLexer &src, bool &b );
//	bool						ParseInt( idLexer &src, int &i );
//	bool						ParseFloat( idLexer &src, float &f );
//	bool						ParseVector( idLexer &src, idVec3 &vec );
//	bool						ParseBBoxes( idLexer &src );
};


/*

-	when a node child is a solid leaf the node child number is zero
-	two adjacent areas (sharing a plane at opposite sides) share a face
	this face is a portal between the areas
-	when an area uses a face from the faceindex with a positive index
	then the face plane normal points into the area
-	the face edges are stored counter clockwise using the edgeindex
-	two adjacent convex areas (sharing a face) only share One face
	this is a simple result of the areas being convex
-	the areas can't have a mixture of ground and gap faces
	other mixtures of faces in one area are allowed
-	areas with the AREACONTENTS_CLUSTERPORTAL in the settings have
	the cluster number set to the negative portal number
-	edge zero is a dummy
-	face zero is a dummy
-	area zero is a dummy
-	node zero is a dummy
-	portal zero is a dummy
-	cluster zero is a dummy

*/


class idAASFile {
////public:
////	virtual 					~idAASFile( ) {}
////
	GetName ( ): string { return this.name.c_str ( ); }
	GetCRC ( ): number { return this.crc; }
////
////	int							GetNumPlanes( ) const { return planeList.Num(); }
////	const idPlane &				GetPlane( int index ) const { return planeList[index]; }
////	int							GetNumVertices( ) const { return this.vertices .Num(); }
////	const aasVertex_t &			GetVertex( int index ) const { return this.vertices [index]; }
////	int							GetNumEdges( ) const { return this.edges.Num(); }
////	const aasEdge_t &			GetEdge( int index ) const { return this.edges[index]; }
////	int							GetNumEdgeIndexes( ) const { return this.edgeIndex.Num(); }
////	const aasIndex_t &			GetEdgeIndex( int index ) const { return this.edgeIndex[index]; }
////	int							GetNumFaces( ) const { return faces.Num(); }
////	const aasFace_t &			GetFace( int index ) const { return faces[index]; }
////	int							GetNumFaceIndexes( ) const { return this.faceIndex.Num(); }
////	const aasIndex_t &			GetFaceIndex( int index ) const { return this.faceIndex[index]; }
////	int							GetNumAreas( ) const { return areas.Num(); }
////	const aasArea_t &			GetArea( int index ) { return areas[index]; }
////	int							GetNumNodes( ) const { return nodes.Num(); }
////	const aasNode_t &			GetNode( int index ) const { return nodes[index]; }
////	int							GetNumPortals( ) const { return portals.Num(); }
////	const aasPortal_t &			GetPortal( int index ) { return portals[index]; }
////	int							GetNumPortalIndexes( ) const { return portalIndex.Num(); }
////	const aasIndex_t &			GetPortalIndex( int index ) const { return portalIndex[index]; }
////	int							GetNumClusters( ) const { return clusters.Num(); }
////	const aasCluster_t &		GetCluster( int index ) const { return clusters[index]; }
////
////	const idAASSettings &		GetSettings( ) const { return settings; }
////
////	void						SetPortalMaxTravelTime( int index, int time ) { portals[index].maxAreaTravelTime = time; }
////	void						SetAreaTravelFlag( int index, int flag ) { areas[index].travelFlags |= flag; }
////	void						RemoveAreaTravelFlag( int index, int flag ) { areas[index].travelFlags &= ~flag; }
////
////	virtual idVec3				EdgeCenter( int edgeNum ) const = 0;
////	virtual idVec3				FaceCenter( int faceNum ) const = 0;
////	virtual idVec3				AreaCenter( int areaNum ) const = 0;
////
////	virtual idBounds			EdgeBounds( int edgeNum ) const = 0;
////	virtual idBounds			FaceBounds( int faceNum ) const = 0;
////	virtual idBounds			AreaBounds( int areaNum ) const = 0;
////
////	virtual int					PointAreaNum( const idVec3 &origin ) const = 0;
////	virtual int					PointReachableAreaNum( const idVec3 &origin, const idBounds &searchBounds, const int areaFlags, const int excludeTravelFlags ) const = 0;
////	virtual int					BoundsReachableAreaNum( const idBounds &bounds, const int areaFlags, const int excludeTravelFlags ) const = 0;
////	virtual void				PushPointIntoAreaNum( int areaNum, idVec3 &point ) const = 0;
////	virtual bool				Trace( aasTrace_t &trace, const idVec3 &start, const idVec3 &end ) const = 0;
////	virtual void				PrintInfo( ) const = 0;
////
////protected:
	name = new idStr;
	crc: number /*unsigned int*/;

	//planeList = new idPlaneSet;
	vertices = new idList< /*aasVertex_t*/idVec3>( /*aasVertex_t*/idVec3 );
	edges = new idList<aasEdge_t>( aasEdge_t );
	edgeIndex =new idList< /*aasIndex_t*/number>( Number );
	faces = new idList<aasFace_t>( aasFace_t );
	faceIndex = new idList< /*aasIndex_t*/number>( Number );
	areas = new idList<aasArea_t>( aasArea_t );
	nodes = new idList<aasNode_t>( aasNode_t );
	portals = new idList<aasPortal_t>( aasPortal_t );
	portalIndex = new idList< /*aasIndex_t*/number>( Number );
	clusters = new idList<aasCluster_t>( aasCluster_t );
	settings =new idAASSettings;
////
////#endif /* !__AASFILE_H__ */
}


/*
===============================================================================

	AAS File Local

===============================================================================
*/

var AAS_LIST_GRANULARITY = 1024;
var AAS_INDEX_GRANULARITY = 4096;
var AAS_PLANE_GRANULARITY = 4096;
var AAS_VERTEX_GRANULARITY = 4096;
var AAS_EDGE_GRANULARITY = 4096;


class idAASFileLocal extends idAASFile {
////	friend class idAASBuild;
////	friend class idAASReach;
////	friend class idAASCluster;
////public:
////								idAASFileLocal( );
////	virtual 					~idAASFileLocal( );

////public:
////	virtual idVec3				EdgeCenter( int edgeNum ) const;
////	virtual idVec3				FaceCenter( int faceNum ) const;
////	virtual idVec3				AreaCenter( int areaNum ) const;

////	virtual idBounds			EdgeBounds( int edgeNum ) const;
////	virtual idBounds			FaceBounds( int faceNum ) const;
////	virtual idBounds			AreaBounds( int areaNum ) const;

////	virtual int					PointAreaNum( const idVec3 &origin ) const;
////	virtual int					PointReachableAreaNum( const idVec3 &origin, const idBounds &searchBounds, const int areaFlags, const int excludeTravelFlags ) const;
////	virtual int					BoundsReachableAreaNum( const idBounds &bounds, const int areaFlags, const int excludeTravelFlags ) const;
////	virtual void				PushPointIntoAreaNum( int areaNum, idVec3 &point ) const;
////	virtual bool				Trace( aasTrace_t &trace, const idVec3 &start, const idVec3 &end ) const;
////	virtual void				PrintInfo( ) const;

////public:
////	bool						Load( const idStr &fileName, unsigned int mapFileCRC );
////	bool						Write( const idStr &fileName, unsigned int mapFileCRC );

////	int							MemorySize( ) const;
////	void						ReportRoutingEfficiency( ) const;
////	void						Optimize( );
////	void						LinkReversedReachability( );
////	void						FinishAreas( );

////	void						Clear( );
////	void						DeleteReachabilities( );
////	void						DeleteClusters( );

////private:
////	bool						ParseIndex( idLexer &src, idList<aasIndex_t> &indexes );
////	bool						ParsePlanes( idLexer &src );
////	bool						ParseVertices( idLexer &src );
////	bool						ParseEdges( idLexer &src );
////	bool						ParseFaces( idLexer &src );
////	bool						ParseReachabilities( idLexer &src, int areaNum );
////	bool						ParseAreas( idLexer &src );
////	bool						ParseNodes( idLexer &src );
////	bool						ParsePortals( idLexer &src );
////	bool						ParseClusters( idLexer &src );

////private:
////	int							BoundsReachableAreaNum_r( int nodeNum, const idBounds &bounds, const int areaFlags, const int excludeTravelFlags ) const;
////	void						MaxTreeDepth_r( int nodeNum, int &depth, int &maxDepth ) const;
////	int							MaxTreeDepth( ) const;
////	int							AreaContentsTravelFlags( int areaNum ) const;
////	idVec3						AreaReachableGoal( int areaNum ) const;
////	int							NumReachabilities( ) const;
////};

////#endif /* !__AASFILELOCAL_H__ */


/*
===============================================================================

	idAASFileLocal

===============================================================================
*/


/*
================
idAASFileLocal::idAASFileLocal
================
*/
	constructor ( ) {
		super ( );
		this.planeList.SetGranularity( AAS_PLANE_GRANULARITY );
		this.vertices.SetGranularity( AAS_VERTEX_GRANULARITY );
		this.edges.SetGranularity( AAS_EDGE_GRANULARITY );
		this.edgeIndex.SetGranularity( AAS_INDEX_GRANULARITY );
		this.faces.SetGranularity( AAS_LIST_GRANULARITY );
		this.faceIndex.SetGranularity( AAS_INDEX_GRANULARITY );
		this.areas.SetGranularity( AAS_LIST_GRANULARITY );
		this.nodes.SetGranularity( AAS_LIST_GRANULARITY );
		this.portals.SetGranularity( AAS_LIST_GRANULARITY );
		this.portalIndex.SetGranularity( AAS_INDEX_GRANULARITY );
		this.clusters.SetGranularity( AAS_LIST_GRANULARITY );
	}

/////*
////================
////idAASFileLocal::~idAASFileLocal
////================
////*/
////idAASFileLocal::~idAASFileLocal( ) {
////	var/*int */i:number;
////	idReachability *reach, *next;
////
////	for ( i = 0; i < areas.Num(); i++ ) {
////		for ( reach = areas[i].reach; reach; reach = next ) {
////			next = reach.next;
////			delete reach;
////		}
////	}
////}

/*
================
idAASFileLocal::Clear
================
*/
	Clear ( ): void {
		this.planeList.Clear ( );
		this.vertices.Clear ( );
		this.edges.Clear ( );
		this.edgeIndex.Clear ( );
		this.faces.Clear ( );
		this.faceIndex.Clear ( );
		this.areas.Clear ( );
		this.nodes.Clear ( );
		this.portals.Clear ( );
		this.portalIndex.Clear ( );
		this.clusters.Clear ( );
	}

/////*
////================
////idAASFileLocal::Write
////================
////*/
////bool idAASFileLocal::Write( const idStr &fileName, unsigned int mapFileCRC ) {
////	int i, num;
////	idFile *aasFile;
////	idReachability *reach;
////
////	common.Printf( "[Write AAS]\n" );
////	common.Printf( "writing %s\n", fileName.c_str() );
////
////	this.name = fileName;
////	this.crc = mapFileCRC;
////
////	aasFile = fileSystem.OpenFileWrite( fileName, "fs_devpath" );
////	if ( !aasFile ) {
////		common.Error( "Error opening %s", fileName.c_str() );
////		return false;
////	}
////
////	aasFile.WriteFloatString( "%s \"%s\"\n\n", AAS_FILEID, AAS_FILEVERSION );
////	aasFile.WriteFloatString( "%u\n\n", mapFileCRC );
////
////	// write out the settings
////	aasFile.WriteFloatString( "settings\n" );
////	this.settings.WriteToFile( aasFile );
////
////	// write out planes
////	aasFile.WriteFloatString( "planes %d {\n", planeList.Num() );
////	for ( i = 0; i < planeList.Num(); i++ ) {
////		aasFile.WriteFloatString( "\t%d ( %f %f %f %f )\n", i,
////				planeList[i].Normal().x, planeList[i].Normal().y, planeList[i].Normal().z, planeList[i].Dist() );
////	}
////	aasFile.WriteFloatString( "}\n" );
////
////	// write out vertices
////	aasFile.WriteFloatString( "vertices %d {\n", this.vertices .Num() );
////	for ( i = 0; i < this.vertices .Num(); i++ ) {
////		aasFile.WriteFloatString( "\t%d ( %f %f %f )\n", i, this.vertices [i].x, this.vertices [i].y, this.vertices [i].z );
////	}
////	aasFile.WriteFloatString( "}\n" );
////
////	// write out edges
////	aasFile.WriteFloatString( "edges %d {\n", edges.Num() );
////	for ( i = 0; i < this.edges.Num(); i++ ) {
////		aasFile.WriteFloatString( "\t%d ( %d %d )\n", i, this.edges[i].vertexNum[0], this.edges[i].vertexNum[1] );
////	}
////	aasFile.WriteFloatString( "}\n" );
////
////	// write out edgeIndex
////	aasFile.WriteFloatString( "edgeIndex %d {\n", this.edgeIndex.Num() );
////	for ( i = 0; i < this.edgeIndex.Num(); i++ ) {
////		aasFile.WriteFloatString( "\t%d ( %d )\n", i, this.edgeIndex[i] );
////	}
////	aasFile.WriteFloatString( "}\n" );
////
////	// write out faces
////	aasFile.WriteFloatString( "faces %d {\n", this.faces.Num() );
////	for ( i = 0; i < this.faces.Num(); i++ ) {
////		aasFile.WriteFloatString( "\t%d ( %d %d %d %d %d %d )\n", i, faces[i].planeNum, this.faces[i].flags,
////						this.faces[i].areas[0], this.faces[i].areas[1], this.faces[i].firstEdge, this.faces[i].numEdges );
////	}
////	aasFile.WriteFloatString( "}\n" );
////
////	// write out faceIndex
////	aasFile.WriteFloatString( "faceIndex %d {\n", this.faceIndex.Num() );
////	for ( i = 0; i < this.faceIndex.Num(); i++ ) {
////		aasFile.WriteFloatString( "\t%d ( %d )\n", i, this.faceIndex[i] );
////	}
////	aasFile.WriteFloatString( "}\n" );
////
////	// write out areas
////	aasFile.WriteFloatString( "areas %d {\n", areas.Num() );
////	for ( i = 0; i < areas.Num(); i++ ) {
////		for ( num = 0, reach = areas[i].reach; reach; reach = reach.next ) {
////			num++;
////		}
////		aasFile.WriteFloatString( "\t%d ( %d %d %d %d %d %d ) %d {\n", i, areas[i].flags, areas[i].contents,
////						areas[i].firstFace, areas[i].numFaces, areas[i].cluster, areas[i].clusterAreaNum, num );
////		for ( reach = areas[i].reach; reach; reach = reach.next ) {
////			Reachability_Write( aasFile, reach );
////			switch( reach.travelType ) {
////				case TFL_SPECIAL:
////					Reachability_Special_Write( aasFile, static_cast<idReachability_Special *>(reach) );
////					break;
////			}
////			aasFile.WriteFloatString( "\n" );
////		}
////		aasFile.WriteFloatString( "\t}\n" );
////	}
////	aasFile.WriteFloatString( "}\n" );
////
////	// write out nodes
////	aasFile.WriteFloatString( "nodes %d {\n", nodes.Num() );
////	for ( i = 0; i < nodes.Num(); i++ ) {
////		aasFile.WriteFloatString( "\t%d ( %d %d %d )\n", i, nodes[i].planeNum, nodes[i].children[0], nodes[i].children[1] );
////	}
////	aasFile.WriteFloatString( "}\n" );
////
////	// write out portals
////	aasFile.WriteFloatString( "portals %d {\n", portals.Num() );
////	for ( i = 0; i < portals.Num(); i++ ) {
////		aasFile.WriteFloatString( "\t%d ( %d %d %d %d %d )\n", i, portals[i].areaNum, portals[i].clusters[0],
////						portals[i].clusters[1], portals[i].clusterAreaNum[0], portals[i].clusterAreaNum[1] );
////	}
////	aasFile.WriteFloatString( "}\n" );
////
////	// write out portalIndex
////	aasFile.WriteFloatString( "portalIndex %d {\n", portalIndex.Num() );
////	for ( i = 0; i < portalIndex.Num(); i++ ) {
////		aasFile.WriteFloatString( "\t%d ( %d )\n", i, portalIndex[i] );
////	}
////	aasFile.WriteFloatString( "}\n" );
////
////	// write out clusters
////	aasFile.WriteFloatString( "clusters %d {\n", clusters.Num() );
////	for ( i = 0; i < clusters.Num(); i++ ) {
////		aasFile.WriteFloatString( "\t%d ( %d %d %d %d )\n", i, clusters[i].numAreas, clusters[i].numReachableAreas,
////							clusters[i].firstPortal, clusters[i].numPortals );
////	}
////	aasFile.WriteFloatString( "}\n" );
////
////	// close file
////	fileSystem.CloseFile( aasFile );
////
////	common.Printf( "done.\n" );
////
////	return true;
////}
////
/////*
////================
////idAASFileLocal::ParseIndex
////================
////*/
////bool idAASFileLocal::ParseIndex( idLexer &src, idList<aasIndex_t> &indexes ) {
////	int numIndexes, i;
////	aasIndex_t index;
////
////	numIndexes = src.ParseInt();
////	indexes.Resize( numIndexes );
////	if ( !src.ExpectTokenString( "{" ) ) {
////		return false;
////	}
////	for ( i = 0; i < numIndexes; i++ ) {
////		src.ParseInt();
////		src.ExpectTokenString( "(" );
////		index = src.ParseInt();
////		src.ExpectTokenString( ")" );
////		indexes.Append( index );
////	}
////	if ( !src.ExpectTokenString( "}" ) ) {
////		return false;
////	}
////	return true;
////}
////
/////*
////================
////idAASFileLocal::ParsePlanes
////================
////*/
////bool idAASFileLocal::ParsePlanes( idLexer &src ) {
////	int numPlanes, i;
////	idPlane plane;
////	idVec4 vec;
////
////	numPlanes = src.ParseInt();
////	planeList.Resize( numPlanes );
////	if ( !src.ExpectTokenString( "{" ) ) {
////		return false;
////	}
////	for ( i = 0; i < numPlanes; i++ ) {
////		src.ParseInt();
////		if ( !src.Parse1DMatrix( 4, vec.ToFloatPtr() ) ) {
////			return false;
////		}
////		plane.SetNormal( vec.ToVec3() );
////		plane.SetDist( vec[3] );
////		planeList.Append( plane );
////	}
////	if ( !src.ExpectTokenString( "}" ) ) {
////		return false;
////	}
////	return true;
////}
////
/////*
////================
////idAASFileLocal::ParseVertices
////================
////*/
////bool idAASFileLocal::ParseVertices( idLexer &src ) {
////	int numVertices, i;
////	idVec3 vec;
////
////	numVertices = src.ParseInt();
////	this.vertices .Resize( numVertices );
////	if ( !src.ExpectTokenString( "{" ) ) {
////		return false;
////	}
////	for ( i = 0; i < numVertices; i++ ) {
////		src.ParseInt();
////		if ( !src.Parse1DMatrix( 3, vec.ToFloatPtr() ) ) {
////			return false;
////		}
////		this.vertices .Append( vec );
////	}
////	if ( !src.ExpectTokenString( "}" ) ) {
////		return false;
////	}
////	return true;
////}
////
/////*
////================
////idAASFileLocal::ParseEdges
////================
////*/
////bool idAASFileLocal::ParseEdges( idLexer &src ) {
////	int numEdges, i;
////	aasEdge_t edge;
////
////	numEdges = src.ParseInt();
////	edges.Resize( numEdges );
////	if ( !src.ExpectTokenString( "{" ) ) {
////		return false;
////	}
////	for ( i = 0; i < numEdges; i++ ) {
////		src.ParseInt();
////		src.ExpectTokenString( "(" );
////		edge.vertexNum[0] = src.ParseInt();
////		edge.vertexNum[1] = src.ParseInt();
////		src.ExpectTokenString( ")" );
////		edges.Append( edge );
////	}
////	if ( !src.ExpectTokenString( "}" ) ) {
////		return false;
////	}
////	return true;
////}
////
/////*
////================
////idAASFileLocal::ParseFaces
////================
////*/
////bool idAASFileLocal::ParseFaces( idLexer &src ) {
////	int numFaces, i;
////	aasFace_t face;
////
////	numFaces = src.ParseInt();
////	this.faces.Resize( numFaces );
////	if ( !src.ExpectTokenString( "{" ) ) {
////		return false;
////	}
////	for ( i = 0; i < numFaces; i++ ) {
////		src.ParseInt();
////		src.ExpectTokenString( "(" );
////		face.planeNum = src.ParseInt();
////		face.flags = src.ParseInt();
////		face.areas[0] = src.ParseInt();
////		face.areas[1] = src.ParseInt();
////		face.firstEdge = src.ParseInt();
////		face.numEdges = src.ParseInt();
////		src.ExpectTokenString( ")" );
////		this.faces.Append( face );
////	}
////	if ( !src.ExpectTokenString( "}" ) ) {
////		return false;
////	}
////	return true;
////}
////
/////*
////================
////idAASFileLocal::ParseReachabilities
////================
////*/
////bool idAASFileLocal::ParseReachabilities( idLexer &src, int areaNum ) {
////	int num, j;
////	aasArea_t *area;
////	idReachability reach, *newReach;
////	idReachability_Special *special;
////
////	area = &areas[areaNum];
////
////	num = src.ParseInt();
////	src.ExpectTokenString( "{" );
////	area.reach = NULL;
////	area.rev_reach = NULL;
////	area.travelFlags = AreaContentsTravelFlags( areaNum );
////	for ( j = 0; j < num; j++ ) {
////		Reachability_Read( src, &reach );
////		switch( reach.travelType ) {
////			case TFL_SPECIAL:
////				newReach = special = new idReachability_Special();
////				Reachability_Special_Read( src, special );
////				break;
////			default:
////				newReach = new idReachability();
////				break;
////		}
////		newReach.CopyBase( reach );
////		newReach.fromAreaNum = areaNum;
////		newReach.next = area.reach;
////		area.reach = newReach;
////	}
////	src.ExpectTokenString( "}" );
////	return true;
////}
////
/////*
////================
////idAASFileLocal::LinkReversedReachability
////================
////*/
////void idAASFileLocal::LinkReversedReachability( ) {
////	var/*int */i:number;
////	idReachability *reach;
////
////	// link reversed reachabilities
////	for ( i = 0; i < areas.Num(); i++ ) {
////		for ( reach = areas[i].reach; reach; reach = reach.next ) {
////			reach.rev_next = areas[reach.toAreaNum].rev_reach;
////			areas[reach.toAreaNum].rev_reach = reach;
////		}
////	}
////}
////
/////*
////================
////idAASFileLocal::ParseAreas
////================
////*/
////bool idAASFileLocal::ParseAreas( idLexer &src ) {
////	int numAreas, i;
////	aasArea_t area;
////
////	numAreas = src.ParseInt();
////	areas.Resize( numAreas );
////	if ( !src.ExpectTokenString( "{" ) ) {
////		return false;
////	}
////	for ( i = 0; i < numAreas; i++ ) {
////		src.ParseInt();
////		src.ExpectTokenString( "(" );
////		area.flags = src.ParseInt();
////		area.contents = src.ParseInt();
////		area.firstFace = src.ParseInt();
////		area.numFaces = src.ParseInt();
////		area.cluster = src.ParseInt();
////		area.clusterAreaNum = src.ParseInt();
////		src.ExpectTokenString( ")" );
////		areas.Append( area );
////		ParseReachabilities( src, i );
////	}
////	if ( !src.ExpectTokenString( "}" ) ) {
////		return false;
////	}
////
////	LinkReversedReachability();
////
////	return true;
////}
////
/////*
////================
////idAASFileLocal::ParseNodes
////================
////*/
////bool idAASFileLocal::ParseNodes( idLexer &src ) {
////	int numNodes, i;
////	aasNode_t node;
////
////	numNodes = src.ParseInt();
////	nodes.Resize( numNodes );
////	if ( !src.ExpectTokenString( "{" ) ) {
////		return false;
////	}
////	for ( i = 0; i < numNodes; i++ ) {
////		src.ParseInt();
////		src.ExpectTokenString( "(" );
////		node.planeNum = src.ParseInt();
////		node.children[0] = src.ParseInt();
////		node.children[1] = src.ParseInt();
////		src.ExpectTokenString( ")" );
////		nodes.Append( node );
////	}
////	if ( !src.ExpectTokenString( "}" ) ) {
////		return false;
////	}
////	return true;
////}
////
/////*
////================
////idAASFileLocal::ParsePortals
////================
////*/
////bool idAASFileLocal::ParsePortals( idLexer &src ) {
////	int numPortals, i;
////	aasPortal_t portal;
////
////	numPortals = src.ParseInt();
////	portals.Resize( numPortals );
////	if ( !src.ExpectTokenString( "{" ) ) {
////		return false;
////	}
////	for ( i = 0; i < numPortals; i++ ) {
////		src.ParseInt();
////		src.ExpectTokenString( "(" );
////		portal.areaNum = src.ParseInt();
////		portal.clusters[0] = src.ParseInt();
////		portal.clusters[1] = src.ParseInt();
////		portal.clusterAreaNum[0] = src.ParseInt();
////		portal.clusterAreaNum[1] = src.ParseInt();
////		src.ExpectTokenString( ")" );
////		portals.Append( portal );
////	}
////	if ( !src.ExpectTokenString( "}" ) ) {
////		return false;
////	}
////	return true;
////}
////
/////*
////================
////idAASFileLocal::ParseClusters
////================
////*/
////bool idAASFileLocal::ParseClusters( idLexer &src ) {
////	int numClusters, i;
////	aasCluster_t cluster;
////
////	numClusters = src.ParseInt();
////	clusters.Resize( numClusters );
////	if ( !src.ExpectTokenString( "{" ) ) {
////		return false;
////	}
////	for ( i = 0; i < numClusters; i++ ) {
////		src.ParseInt();
////		src.ExpectTokenString( "(" );
////		cluster.numAreas = src.ParseInt();
////		cluster.numReachableAreas = src.ParseInt();
////		cluster.firstPortal = src.ParseInt();
////		cluster.numPortals = src.ParseInt();
////		src.ExpectTokenString( ")" );
////		clusters.Append( cluster );
////	}
////	if ( !src.ExpectTokenString( "}" ) ) {
////		return false;
////	}
////	return true;
////}

/*
================
idAASFileLocal::FinishAreas
================
*/
	FinishAreas ( ): void {
		var /*int */i: number;

		for ( i = 0; i < this.areas.Num ( ); i++ ) {
			this.areas[i].center = this.AreaReachableGoal( i );
			this.areas[i].bounds = this.AreaBounds( i );
		}
	}

/*
================
idAASFileLocal::Load
================
*/
	Load ( fileName: idStr, /*unsigned int */mapFileCRC: number ): boolean {
		var src = new idLexer( lexerFlags_t.LEXFL_NOFATALERRORS | lexerFlags_t.LEXFL_NOSTRINGESCAPECHARS | lexerFlags_t.LEXFL_NOSTRINGCONCAT | lexerFlags_t.LEXFL_ALLOWPATHNAMES );
		var token = new idToken;
		var /*int */depth: number;
		var /*unsigned int */c: number;

		this.name.equals( fileName );
		this.crc = mapFileCRC;

		common.Printf( "[Load AAS]\n" );
		common.Printf( "loading %s\n", this.name.c_str ( ) );

		if ( !src.LoadFile( this.name.data ) ) {
			return false;
		}

		if ( !src.ExpectTokenString( AAS_FILEID ) ) {
			common.Warning( "Not an AAS file: '%s'", this.name.c_str ( ) );
			return false;
		}

		if ( !src.ReadToken( token ) || token.data != AAS_FILEVERSION ) {
			common.Warning( "AAS file '%s' has version %s instead of %s", this.name.c_str ( ), token.c_str ( ), AAS_FILEVERSION );
			return false;
		}

		if ( !src.ExpectTokenType( TT_NUMBER, TT_INTEGER, token ) ) {
			common.Warning( "AAS file '%s' has no map file CRC", this.name.c_str ( ) );
			return false;
		}

		c = token.GetUnsignedLongValue ( );
		if ( mapFileCRC && c != mapFileCRC ) {
			common.Warning( "AAS file '%s' is out of date", this.name.c_str ( ) );
			return false;
		}

		// clear the file in memory
		this.Clear ( );

		// parse the file
		while ( 1 ) {
			if ( !src.ReadToken( token ) ) {
				break;
			}

			if ( token.data == "settings" ) {
				if ( !this.settings.FromParser( src ) ) {
					return false;
				}
			} else if ( token.data == "planes" ) {
				if ( !this.ParsePlanes( src ) ) {
					return false;
				}
			} else if ( token.data == "vertices" ) {
				if ( !this.ParseVertices( src ) ) {
					return false;
				}
			} else if ( token.data == "edges" ) {
				if ( !this.ParseEdges( src ) ) {
					return false;
				}
			} else if ( token.data == "edgeIndex" ) {
				if ( !this.ParseIndex( src, this.edgeIndex ) ) {
					return false;
				}
			} else if ( token.data == "faces" ) {
				if ( !this.ParseFaces( src ) ) {
					return false;
				}
			} else if ( token.data == "faceIndex" ) {
				if ( !this.ParseIndex( src, this.faceIndex ) ) {
					return false;
				}
			} else if ( token.data == "areas" ) {
				if ( !this.ParseAreas( src ) ) {
					return false;
				}
			} else if ( token.data == "nodes" ) {
				if ( !this.ParseNodes( src ) ) {
					return false;
				}
			} else if ( token.data == "portals" ) {
				if ( !this.ParsePortals( src ) ) {
					return false;
				}
			} else if ( token.data == "portalIndex" ) {
				if ( !this.ParseIndex( src, this.portalIndex ) ) {
					return false;
				}
			} else if ( token.data == "clusters" ) {
				if ( !this.ParseClusters( src ) ) {
					return false;
				}
			} else {
				src.Error( "idAASFileLocal::Load: bad token \"%s\"", token.c_str ( ) );
				return false;
			}
		}

		this.FinishAreas ( );

		depth = this.MaxTreeDepth ( );
		if ( depth > MAX_AAS_TREE_DEPTH ) {
			src.Error( "idAASFileLocal::Load: tree depth = %d", depth );
		}

		common.Printf( "done.\n" );

		return true;
	}

/////*
////================
////idAASFileLocal::MemorySize
////================
////*/
////int idAASFileLocal::MemorySize( ) const {
////	int size;
////
////	size = planeList.Size();
////	size += this.vertices .Size();
////	size += this.edges.Size();
////	size += edgeIndex.Size();
////	size += this.faces.Size();
////	size += this.faceIndex.Size();
////	size += this.areas.Size();
////	size += nodes.Size();
////	size += portals.Size();
////	size += portalIndex.Size();
////	size += clusters.Size();
////	size += sizeof( idReachability_Walk ) * NumReachabilities();
////
////	return size;
////}
////
/////*
////================
////idAASFileLocal::PrintInfo
////================
////*/
////void idAASFileLocal::PrintInfo( ) const {
////	common.Printf( "%6d KB file size\n", MemorySize() >> 10 );
////	common.Printf( "%6d areas\n", this.areas.Num() );
////	common.Printf( "%6d max tree depth\n", MaxTreeDepth() );
////	ReportRoutingEfficiency();
////}
////
/////*
////================
////idAASFileLocal::NumReachabilities
////================
////*/
////int idAASFileLocal::NumReachabilities( ) const {
////	int i, num;
////	idReachability *reach;
////
////	num = 0;
////	for ( i = 0; i < this.areas.Num(); i++ ) {
////		for ( reach = this.areas[i].reach; reach; reach = reach.next ) {
////			num++;
////		}
////	}
////	return num;
////}
////
/////*
////================
////idAASFileLocal::ReportRoutingEfficiency
////================
////*/
////void idAASFileLocal::ReportRoutingEfficiency( ) const {
////	int numReachableAreas, total, i, n;
////
////	numReachableAreas = 0;
////	total = 0;
////	for ( i = 0; i < clusters.Num(); i++ ) {
////		n = clusters[i].numReachableAreas;
////		numReachableAreas += n;
////		total += n * n;
////	}
////	total += numReachableAreas * portals.Num();
////
////	common.Printf( "%6d reachable areas\n", numReachableAreas );
////	common.Printf( "%6d reachabilities\n", NumReachabilities() );
////	common.Printf( "%6d KB max routing cache\n", ( total * 3 ) >> 10 );
////}
////
/////*
////================
////idAASFileLocal::DeleteReachabilities
////================
////*/
////void idAASFileLocal::DeleteReachabilities( ) {
////	var/*int */i:number;
////	idReachability *reach, *nextReach;
////
////	for ( i = 0; i < this.areas.Num(); i++ ) {
////		for ( reach = this.areas[i].reach; reach; reach = nextReach ) {
////			nextReach = reach.next;
////			delete reach;
////		}
////		this.areas[i].reach = NULL;
////		this.areas[i].rev_reach = NULL;
////	}
////}
////
/////*
////================
////idAASFileLocal::DeleteClusters
////================
////*/
////void idAASFileLocal::DeleteClusters( ) {
////	aasPortal_t portal;
////	aasCluster_t cluster;
////
////	portals.Clear();
////	portalIndex.Clear();
////	clusters.Clear();
////
////	// first portal is a dummy
////	memset( &portal, 0, sizeof( portal ) );
////	portals.Append( portal );
////
////	// first cluster is a dummy
////	memset( &cluster, 0, sizeof( cluster ) );
////	clusters.Append( cluster );
////}


//////AASFile_optimize.cpp
//////===============================================================
//////
//////	optimize file
//////
//////===============================================================

/////*
////================
////idAASFileLocal::Optimize
////================
////*/
////void idAASFileLocal::Optimize() {
////	int i, j, k, faceNum, edgeNum, areaFirstFace, faceFirstEdge;
////	aasArea_t *area;
////	aasFace_t *face;
////	aasEdge_t *edge;
////	idReachability *reach;
////	idList<int> vertexRemap;
////	idList<int> edgeRemap;
////	idList<int> faceRemap;
////	idList<aasVertex_t> newVertices;
////	idList<aasEdge_t> newEdges;
////	idList<aasIndex_t> newEdgeIndex;
////	idList<aasFace_t> newFaces;
////	idList<aasIndex_t> newFaceIndex;

////	vertexRemap.AssureSize(this.vertices .Num(), -1);
////	edgeRemap.AssureSize(edges.Num(), 0);
////	faceRemap.AssureSize(this.faces.Num(), 0);

////	newVertices.Resize(this.vertices .Num());
////	newEdges.Resize(edges.Num());
////	newEdges.SetNum(1, false);
////	newEdgeIndex.Resize(this.edgeIndex.Num());
////	newFaces.Resize(this.faces.Num());
////	newFaces.SetNum(1, false);
////	newFaceIndex.Resize(this.faceIndex.Num());

////	for (i = 0; i < this.areas.Num(); i++) {
////		area = &this.areas[i];

////		areaFirstFace = newFaceIndex.Num();
////		for (j = 0; j < area.numFaces; j++) {
////			faceNum = this.faceIndex[area.firstFace + j];
////			face = &this.faces[abs(faceNum)];

////			// store face
////			if (!faceRemap[abs(faceNum)]) {
////				faceRemap[abs(faceNum)] = newFaces.Num();
////				newFaces.Append(*face);

////				// don't store edges for faces we don't care about
////				if (!(face.flags & (FACE_FLOOR | FACE_LADDER))) {

////					newFaces[newFaces.Num() - 1].firstEdge = 0;
////					newFaces[newFaces.Num() - 1].numEdges = 0;

////				}
////				else {

////					// store edges
////					faceFirstEdge = newEdgeIndex.Num();
////					for (k = 0; k < face.numEdges; k++) {
////						edgeNum = this.edgeIndex[face.firstEdge + k];
////						edge = this.edges[abs(edgeNum)];

////						if (!edgeRemap[abs(edgeNum)]) {
////							if (edgeNum < 0) {
////								edgeRemap[abs(edgeNum)] = -newEdges.Num();
////							}
////							else {
////								edgeRemap[abs(edgeNum)] = newEdges.Num();
////							}

////							// remap vertices if not yet remapped
////							if (vertexRemap[edge.vertexNum[0]] == -1) {
////								vertexRemap[edge.vertexNum[0]] = newVertices.Num();
////								newVertices.Append(this.vertices [edge.vertexNum[0]]);
////							}
////							if (vertexRemap[edge.vertexNum[1]] == -1) {
////								vertexRemap[edge.vertexNum[1]] = newVertices.Num();
////								newVertices.Append(this.vertices [edge.vertexNum[1]]);
////							}

////							newEdges.Append(*edge);
////							newEdges[newEdges.Num() - 1].vertexNum[0] = vertexRemap[edge.vertexNum[0]];
////							newEdges[newEdges.Num() - 1].vertexNum[1] = vertexRemap[edge.vertexNum[1]];
////						}

////						newEdgeIndex.Append(edgeRemap[abs(edgeNum)]);
////					}

////					newFaces[newFaces.Num() - 1].firstEdge = faceFirstEdge;
////					newFaces[newFaces.Num() - 1].numEdges = newEdgeIndex.Num() - faceFirstEdge;
////				}
////			}

////			if (faceNum < 0) {
////				newFaceIndex.Append(-faceRemap[abs(faceNum)]);
////			}
////			else {
////				newFaceIndex.Append(faceRemap[abs(faceNum)]);
////			}
////		}

////		area.firstFace = areaFirstFace;
////		area.numFaces = newFaceIndex.Num() - areaFirstFace;

////		// remap the reachability edges
////		for (reach = area.reach; reach; reach = reach.next) {
////			reach.edgeNum = abs(edgeRemap[reach.edgeNum]);
////		}
////	}

////	// store new list
////	this.vertices  = newVertices;
////	edges = newEdges;
////	this.edgeIndex = newEdgeIndex;
////	this.faces = newFaces;
////	this.faceIndex = newFaceIndex;
////}


//////AASFile_sample.cpp

//////===============================================================
//////
//////	Environment Sampling
//////
//////===============================================================

/////*
////================
////idAASFileLocal::EdgeCenter
////================
////*/
////idVec3 idAASFileLocal::EdgeCenter(int edgeNum) const {
////	const aasEdge_t *edge;
////	edge = this.edges[edgeNum];
////	return (this.vertices [edge.vertexNum[0]] + this.vertices [edge.vertexNum[1]]) * 0.5f;
////}

/*
================
idAASFileLocal::FaceCenter
================
*/
FaceCenter(/*int */faceNum:number) :idVec3 {
	var/*int */i: number, edgeNum: number;
	var face: aasFace_t ;
	var edge: aasEdge_t ;
	var center = new idVec3;

	center.equals( vec3_origin );

	face = this.faces[faceNum];
	if (face.numEdges > 0) {
		for (i = 0; i < face.numEdges; i++) {
			edgeNum = this.edgeIndex[face.firstEdge + i];
			edge = this.edges[abs(edgeNum)];
			center.opAdditionAssignment( this.vertices[edge.vertexNum[INTSIGNBITSET( edgeNum )]] );
		}
		center.opDivisionAssignment_float( face.numEdges );
	}
	return center;
}

/*
================
idAASFileLocal::AreaCenter
================
*/
AreaCenter(/*int*/ areaNum:number) :idVec3 {
	var/*int */i:number, faceNum:number;
	var area: aasArea_t;
	var center = new idVec3;

	center.equals(vec3_origin);

	area = this.areas[areaNum];
	if (area.numFaces > 0) {
		for (i = 0; i < area.numFaces; i++) {
			faceNum = this.faceIndex[area.firstFace + i];
			center.opAdditionAssignment( this.FaceCenter( abs( faceNum ) ) );
		}
		center.opDivisionAssignment_float(area.numFaces);
	}
	return center;
}

/*
============
idAASFileLocal::AreaReachableGoal
============
*/
AreaReachableGoal(/*int*/ areaNum:number) :idVec3 {
	var/*int */i: number, faceNum: number, numFaces: number;
	var area: aasArea_t ;
	var center = new idVec3;
	var start = new idVec3, end = new idVec3;
	var trace  new aasTrace_t ;

	area = this.areas[areaNum];

	if (!(area.flags & (AREA_REACHABLE_WALK | AREA_REACHABLE_FLY)) || (area.flags & AREA_LIQUID)) {
		return this.AreaCenter(areaNum);
	}

	center.equals( vec3_origin );

	numFaces = 0;
	for (i = 0; i < area.numFaces; i++) {
		faceNum = this.faceIndex[area.firstFace + i];
		if (!(this.faces[abs(faceNum)].flags & FACE_FLOOR)) {
			continue;
		}
		center.opAdditionAssignment(  this.FaceCenter(abs(faceNum)));
		numFaces++;
	}
	if (numFaces > 0) {
		center.opDivisionAssignment_float(numFaces);
	}
	center[2] += 1.0;
	end = center;
	end[2] -= 1024;
	this.Trace(trace, center, end);

	return trace.endpos;
}

/////*
////================
////idAASFileLocal::EdgeBounds
////================
////*/
////idBounds idAASFileLocal::EdgeBounds(int edgeNum) const {
////	const aasEdge_t *edge;
////	idBounds bounds;

////	edge = this.edges[abs(edgeNum)];
////	bounds[0] = bounds[1] = this.vertices [edge.vertexNum[0]];
////	bounds += this.vertices [edge.vertexNum[1]];
////	return bounds;
////}

/////*
////================
////idAASFileLocal::FaceBounds
////================
////*/
////idBounds idAASFileLocal::FaceBounds(/*int */faceNum:number) const {
////	int i, edgeNum;
////	const aasFace_t *face;
////	const aasEdge_t *edge;
////	idBounds bounds;

////	face = &this.faces[faceNum];
////	bounds.Clear();

////	for (i = 0; i < face.numEdges; i++) {
////		edgeNum = this.edgeIndex[face.firstEdge + i];
////		edge = this.edges[abs(edgeNum)];
////		bounds.AddPoint(this.vertices [edge.vertexNum[INTSIGNBITSET(edgeNum)]]);
////	}
////	return bounds;
////}

/////*
////================
////idAASFileLocal::AreaBounds
////================
////*/
////idBounds idAASFileLocal::AreaBounds(/*int*/ areaNum:number) const {
////	int i, faceNum;
////	const aasArea_t *area;
////	idBounds bounds;

////	area = &this.areas[areaNum];
////	bounds.Clear();

////	for (i = 0; i < area.numFaces; i++) {
////		faceNum = this.faceIndex[area.firstFace + i];
////		bounds += FaceBounds(abs(faceNum));
////	}
////	return bounds;
////}

/////*
////============
////idAASFileLocal::PointAreaNum
////============
////*/
////int idAASFileLocal::PointAreaNum(const idVec3 &origin) const {
////	int nodeNum;
////	const aasNode_t *node;

////	nodeNum = 1;
////	do {
////		node = &nodes[nodeNum];
////		if (planeList[node.planeNum].Side(origin) == PLANESIDE_BACK) {
////			nodeNum = node.children[1];
////		}
////		else {
////			nodeNum = node.children[0];
////		}
////		if (nodeNum < 0) {
////			return -nodeNum;
////		}
////	} while (nodeNum);

////	return 0;
////}

/////*
////============
////idAASFileLocal::PointReachableAreaNum
////============
////*/
////int idAASFileLocal::PointReachableAreaNum(const idVec3 &origin, const idBounds &searchBounds, const int areaFlags, const int excludeTravelFlags) const {
////	int areaList[32], areaNum, i;
////	idVec3 start, end, pointList[32];
////	aasTrace_t trace;
////	idBounds bounds;
////	float frac;

////	start = origin;

////	trace.areas = areaList;
////	trace.points = pointList;
////	trace.maxAreas = sizeof(areaList) / sizeof(int);
////	trace.getOutOfSolid = true;

////	areaNum = PointAreaNum(start);
////	if (areaNum) {
////		if ((this.areas[areaNum].flags & areaFlags) && ((this.areas[areaNum].travelFlags & excludeTravelFlags) == 0)) {
////			return areaNum;
////		}
////	}
////	else {
////		// trace up
////		end = start;
////		end[2] += 32.0f;
////		this.Trace(trace, start, end);
////		if (trace.numAreas >= 1) {
////			if ((this.areas[0].flags & areaFlags) && ((this.areas[0].travelFlags & excludeTravelFlags) == 0)) {
////				return areaList[0];
////			}
////			start = pointList[0];
////			start[2] += 1.0f;
////		}
////	}

////	// trace down
////	end = start;
////	end[2] -= 32.0f;
////	this.Trace(trace, start, end);
////	if (trace.lastAreaNum) {
////		if ((this.areas[trace.lastAreaNum].flags & areaFlags) && ((this.areas[trace.lastAreaNum].travelFlags & excludeTravelFlags) == 0)) {
////			return trace.lastAreaNum;
////		}
////		start = trace.endpos;
////	}

////	// expand bounds until an area is found
////	for (i = 1; i <= 12; i++) {
////		frac = i * (1.0f / 12.0f);
////		bounds[0] = origin + searchBounds[0] * frac;
////		bounds[1] = origin + searchBounds[1] * frac;
////		areaNum = BoundsReachableAreaNum(bounds, areaFlags, excludeTravelFlags);
////		if (areaNum && (this.areas[areaNum].flags & areaFlags) && ((this.areas[areaNum].travelFlags & excludeTravelFlags) == 0)) {
////			return areaNum;
////		}
////	}
////	return 0;
////}

/////*
////============
////idAASFileLocal::BoundsReachableAreaNum_r
////============
////*/
////int idAASFileLocal::BoundsReachableAreaNum_r(int nodeNum, const idBounds &bounds, const int areaFlags, const int excludeTravelFlags) const {
////	int res;
////	const aasNode_t *node;

////	while (nodeNum) {
////		if (nodeNum < 0) {
////			if ((this.areas[-nodeNum].flags & areaFlags) && ((this.areas[-nodeNum].travelFlags & excludeTravelFlags) == 0)) {
////				return -nodeNum;
////			}
////			return 0;
////		}
////		node = &nodes[nodeNum];
////		res = bounds.PlaneSide(planeList[node.planeNum]);
////		if (res == PLANESIDE_BACK) {
////			nodeNum = node.children[1];
////		}
////		else if (res == PLANESIDE_FRONT) {
////			nodeNum = node.children[0];
////		}
////		else {
////			nodeNum = BoundsReachableAreaNum_r(node.children[1], bounds, areaFlags, excludeTravelFlags);
////			if (nodeNum) {
////				return nodeNum;
////			}
////			nodeNum = node.children[0];
////		}
////	}

////	return 0;
////}

/////*
////============
////idAASFileLocal::BoundsReachableAreaNum
////============
////*/
////int idAASFileLocal::BoundsReachableAreaNum(const idBounds &bounds, const int areaFlags, const int excludeTravelFlags) const {

////	return BoundsReachableAreaNum_r(1, bounds, areaFlags, excludeTravelFlags);
////}

/////*
////============
////idAASFileLocal::PushPointIntoAreaNum
////============
////*/
////void idAASFileLocal::PushPointIntoAreaNum(int areaNum, idVec3 &point) const {
////	int i, faceNum;
////	const aasArea_t *area;
////	const aasFace_t *face;

////	area = &this.areas[areaNum];

////	// push the point to the right side of all area face planes
////	for (i = 0; i < area.numFaces; i++) {
////		faceNum = this.faceIndex[area.firstFace + i];
////		face = &this.faces[abs(faceNum)];

////		const idPlane &plane = planeList[face.planeNum ^ INTSIGNBITSET(faceNum)];
////		float dist = plane.Distance(point);

////		// project the point onto the face plane if it is on the wrong side
////		if (dist < 0.0f) {
////			point -= dist * plane.Normal();
////		}
////	}
////}

/////*
////============
////idAASFileLocal::Trace
////============
////*/
////#define TRACEPLANE_EPSILON		0.125f

////typedef struct aasTraceStack_s
////{
////	idVec3			start;
////	idVec3			end;
////	int				planeNum;
////	int				nodeNum;
////} aasTraceStack_t;

////bool idAASFileLocal::Trace(aasTrace_t &trace, const idVec3 &start, const idVec3 &end) const {
////	int side, nodeNum, tmpPlaneNum;
////	double front, back, frac;
////	idVec3 cur_start, cur_end, cur_mid, v1, v2;
////	aasTraceStack_t tracestack[MAX_AAS_TREE_DEPTH];
////	aasTraceStack_t *tstack_p;
////	const aasNode_t *node;
////	const idPlane *plane;

////	trace.numAreas = 0;
////	trace.lastAreaNum = 0;
////	trace.blockingAreaNum = 0;

////	tstack_p = tracestack;
////	tstack_p.start = start;
////	tstack_p.end = end;
////	tstack_p.planeNum = 0;
////	tstack_p.nodeNum = 1;		//start with the root of the tree
////	tstack_p++;

////	while (1) {

////		tstack_p--;
////		// if the trace stack is empty
////		if (tstack_p < tracestack) {
////			if (!trace.lastAreaNum) {
////				// completely in solid
////				trace.fraction = 0.0f;
////				trace.endpos = start;
////			}
////			else {
////				// nothing was hit
////				trace.fraction = 1.0f;
////				trace.endpos = end;
////			}
////			trace.planeNum = 0;
////			return false;
////		}

////		// number of the current node to test the line against
////		nodeNum = tstack_p.nodeNum;

////		// if it is an area
////		if (nodeNum < 0) {
////			// if can't enter the area
////			if ((this.areas[-nodeNum].flags & trace.flags) || (this.areas[-nodeNum].travelFlags & trace.travelFlags)) {
////				if (!trace.lastAreaNum) {
////					trace.fraction = 0.0f;
////					v1 = vec3_origin;
////				}
////				else {
////					v1 = end - start;
////					v2 = tstack_p.start - start;
////					trace.fraction = v2.Length() / v1.Length();
////				}
////				trace.endpos = tstack_p.start;
////				trace.blockingAreaNum = -nodeNum;
////				trace.planeNum = tstack_p.planeNum;
////				// always take the plane with normal facing towards the trace start
////				plane = &planeList[trace.planeNum];
////				if (v1 * plane.Normal() > 0.0f) {
////					trace.planeNum ^= 1;
////				}
////				return true;
////			}
////			trace.lastAreaNum = -nodeNum;
////			if (trace.numAreas < trace.maxAreas) {
////				if (trace.areas) {
////					trace.areas[trace.numAreas] = -nodeNum;
////				}
////				if (trace.points) {
////					trace.points[trace.numAreas] = tstack_p.start;
////				}
////				trace.numAreas++;
////			}
////			continue;
////		}

////		// if it is a solid leaf
////		if (!nodeNum) {
////			if (!trace.lastAreaNum) {
////				trace.fraction = 0.0f;
////				v1 = vec3_origin;
////			}
////			else {
////				v1 = end - start;
////				v2 = tstack_p.start - start;
////				trace.fraction = v2.Length() / v1.Length();
////			}
////			trace.endpos = tstack_p.start;
////			trace.blockingAreaNum = 0;	// hit solid leaf
////			trace.planeNum = tstack_p.planeNum;
////			// always take the plane with normal facing towards the trace start
////			plane = &planeList[trace.planeNum];
////			if (v1 * plane.Normal() > 0.0f) {
////				trace.planeNum ^= 1;
////			}
////			if (!trace.lastAreaNum && trace.getOutOfSolid) {
////				continue;
////			}
////			else {
////				return true;
////			}
////		}

////		// the node to test against
////		node = &nodes[nodeNum];
////		// start point of current line to test against node
////		cur_start = tstack_p.start;
////		// end point of the current line to test against node
////		cur_end = tstack_p.end;
////		// the current node plane
////		plane = &planeList[node.planeNum];

////		front = plane.Distance(cur_start);
////		back = plane.Distance(cur_end);

////		// if the whole to be traced line is totally at the front of this node
////		// only go down the tree with the front child
////		if (front >= -ON_EPSILON && back >= -ON_EPSILON) {
////			// keep the current start and end point on the stack and go down the tree with the front child
////			tstack_p.nodeNum = node.children[0];
////			tstack_p++;
////			if (tstack_p >= &tracestack[MAX_AAS_TREE_DEPTH]) {
////				common.Error("idAASFileLocal::Trace: stack overflow\n");
////				return false;
////			}
////		}
////		// if the whole to be traced line is totally at the back of this node
////		// only go down the tree with the back child
////		else if (front < ON_EPSILON && back < ON_EPSILON) {
////			// keep the current start and end point on the stack and go down the tree with the back child
////			tstack_p.nodeNum = node.children[1];
////			tstack_p++;
////			if (tstack_p >= &tracestack[MAX_AAS_TREE_DEPTH]) {
////				common.Error("idAASFileLocal::Trace: stack overflow\n");
////				return false;
////			}
////		}
////		// go down the tree both at the front and back of the node
////		else {
////			tmpPlaneNum = tstack_p.planeNum;
////			// calculate the hit point with the node plane
////			// put the cross point TRACEPLANE_EPSILON on the near side
////			if (front < 0) {
////				frac = (front + TRACEPLANE_EPSILON) / (front - back);
////			}
////			else {
////				frac = (front - TRACEPLANE_EPSILON) / (front - back);
////			}

////			if (frac < 0) {
////				frac = 0.001f; //0
////			}
////			else if (frac > 1) {
////				frac = 0.999f; //1
////			}

////			cur_mid = cur_start + (cur_end - cur_start) * frac;

////			// side the front part of the line is on
////			side = front < 0;

////			// first put the end part of the line on the stack (back side)
////			tstack_p.start = cur_mid;
////			tstack_p.planeNum = node.planeNum;
////			tstack_p.nodeNum = node.children[!side];
////			tstack_p++;
////			if (tstack_p >= &tracestack[MAX_AAS_TREE_DEPTH]) {
////				common.Error("idAASFileLocal::Trace: stack overflow\n");
////				return false;
////			}
////			// now put the part near the start of the line on the stack so we will
////			// continue with that part first.
////			tstack_p.start = cur_start;
////			tstack_p.end = cur_mid;
////			tstack_p.planeNum = tmpPlaneNum;
////			tstack_p.nodeNum = node.children[side];
////			tstack_p++;
////			if (tstack_p >= &tracestack[MAX_AAS_TREE_DEPTH]) {
////				common.Error("idAASFileLocal::Trace: stack overflow\n");
////				return false;
////			}
////		}
////	}
////	return false;
////}

/////*
////============
////idAASLocal::AreaContentsTravelFlags
////============
////*/
////int idAASFileLocal::AreaContentsTravelFlags(/*int*/ areaNum:number) const {
////	if (this.areas[areaNum].contents & AREACONTENTS_WATER) {
////		return TFL_WATER;
////	}
////	return TFL_AIR;
////}

/*
============
idAASFileLocal::MaxTreeDepth_r
============
*/
	MaxTreeDepth_r ( /*int */nodeNum: number, /*int */depth: R<number>, /*int */maxDepth: R<number> ): void {
		var node: aasNode_t;

		if ( nodeNum <= 0 ) {
			return;
		}

		depth.$++;
		if ( depth > maxDepth ) {
			maxDepth = depth;
		}

		node = this.nodes[nodeNum];
		this.MaxTreeDepth_r( node.children[0], depth, maxDepth );
		this.MaxTreeDepth_r( node.children[1], depth, maxDepth );

		depth.$--;
	}

/*
============
idAASFileLocal::MaxTreeDepth
============
*/
	MaxTreeDepth ( ): number {
		var /*int */depth = new R <number> , maxDepth = new R<number> ( );

		depth.$ = maxDepth.$ = 0;
		this.MaxTreeDepth_r( 1, depth, maxDepth );
		return maxDepth.$;
	}
}