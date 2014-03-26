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
/////*
////===============================================================================
////
////	AAS File
////
////===============================================================================
////*/
////
////#define AAS_FILEID					"DewmAAS"
////#define AAS_FILEVERSION				"1.07"
////
////// travel flags
////#define TFL_INVALID					BIT(0)		// not valid
////#define TFL_WALK					BIT(1)		// walking
////#define TFL_CROUCH					BIT(2)		// crouching
////#define TFL_WALKOFFLEDGE			BIT(3)		// walking of a ledge
////#define TFL_BARRIERJUMP				BIT(4)		// jumping onto a barrier
////#define TFL_JUMP					BIT(5)		// jumping
////#define TFL_LADDER					BIT(6)		// climbing a ladder
////#define TFL_SWIM					BIT(7)		// swimming
////#define TFL_WATERJUMP				BIT(8)		// jump out of the water
////#define TFL_TELEPORT				BIT(9)		// teleportation
////#define TFL_ELEVATOR				BIT(10)		// travel by elevator
////#define TFL_FLY						BIT(11)		// fly
////#define TFL_SPECIAL					BIT(12)		// special
////#define TFL_WATER					BIT(21)		// travel through water
////#define TFL_AIR						BIT(22)		// travel through air
////
////// face flags
////#define FACE_SOLID					BIT(0)		// solid at the other side
////#define FACE_LADDER					BIT(1)		// ladder surface
////#define FACE_FLOOR					BIT(2)		// standing on floor when on this face
////#define FACE_LIQUID					BIT(3)		// face seperating two areas with liquid
////#define FACE_LIQUIDSURFACE			BIT(4)		// face seperating liquid and air
////
////// area flags
////#define AREA_FLOOR					BIT(0)		// AI can stand on the floor in this area
////#define AREA_GAP					BIT(1)		// area has a gap
////#define AREA_LEDGE					BIT(2)		// if entered the AI bbox partly floats above a ledge
////#define AREA_LADDER					BIT(3)		// area contains one or more ladder faces
////#define AREA_LIQUID					BIT(4)		// area contains a liquid
////#define AREA_CROUCH					BIT(5)		// AI cannot walk but can only crouch in this area
////#define AREA_REACHABLE_WALK			BIT(6)		// area is reachable by walking or swimming
////#define AREA_REACHABLE_FLY			BIT(7)		// area is reachable by flying
////
////// area contents flags
////#define AREACONTENTS_SOLID			BIT(0)		// solid, not a valid area
////#define AREACONTENTS_WATER			BIT(1)		// area contains water
////#define AREACONTENTS_CLUSTERPORTAL	BIT(2)		// area is a cluster portal
////#define AREACONTENTS_OBSTACLE		BIT(3)		// area contains (part of) a dynamic obstacle
////#define AREACONTENTS_TELEPORTER		BIT(4)		// area contains (part of) a teleporter trigger
////
////// bits for different bboxes
////#define AREACONTENTS_BBOX_BIT		24
////
////#define MAX_REACH_PER_AREA			256
////#define MAX_AAS_TREE_DEPTH			128
////
////#define MAX_AAS_BOUNDING_BOXES		4
////
////// reachability to another area
////class idReachability {
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
////};
////
////// index
////typedef int aasIndex_t;
////
// vertex
//var aasVertex_t = idVec3;
////
////// edge
////typedef struct aasEdge_s {
////	int							vertexNum[2];		// numbers of the vertexes of this edge
////} aasEdge_t;
////
////// area boundary face
////typedef struct aasFace_s {
////	unsigned short				planeNum;			// number of the plane this face is on
////	unsigned short				flags;				// face flags
////	int							numEdges;			// number of edges in the boundary of the face
////	int							firstEdge;			// first edge in the edge index
////	short						areas[2];			// area at the front and back of this face
////} aasFace_t;
////
////// area with a boundary of faces
////typedef struct aasArea_s {
////	int							numFaces;			// number of faces used for the boundary of the area
////	int							firstFace;			// first face in the face index used for the boundary of the area
////	idBounds					bounds;				// bounds of the area
////	idVec3						center;				// center of the area an AI can move towards
////	unsigned short				flags;				// several area flags
////	unsigned short				contents;			// contents of the area
////	short						cluster;			// cluster the area belongs to, if negative it's a portal
////	short						clusterAreaNum;		// number of the area in the cluster
////	int							travelFlags;		// travel flags for traveling through this area
////	idReachability *			reach;				// reachabilities that start from this area
////	idReachability *			rev_reach;			// reachabilities that lead to this area
////} aasArea_t;
////
////// nodes of the bsp tree
////typedef struct aasNode_s {
////	unsigned short				planeNum;			// number of the plane that splits the subspace at this node
////	int							children[2];		// child nodes, zero is solid, negative is -(area number)
////} aasNode_t;
////
////// cluster portal
////typedef struct aasPortal_s {
////	short						areaNum;			// number of the area that is the actual portal
////	short						clusters[2];		// number of cluster at the front and back of the portal
////	short						clusterAreaNum[2];	// number of this portal area in the front and back cluster
////	unsigned short				maxAreaTravelTime;	// maximum travel time through the portal area
////} aasPortal_t;
////
////// cluster
////typedef struct aasCluster_s {
////	int							numAreas;			// number of areas in the cluster
////	int							numReachableAreas;	// number of areas with reachabilities
////	int							numPortals;			// number of cluster portals
////	int							firstPortal;		// first cluster portal in the index
////} aasCluster_t;
////
////// trace through the world
////typedef struct aasTrace_s {
////								// parameters
////	int							flags;				// areas with these flags block the trace
////	int							travelFlags;		// areas with these travel flags block the trace
////	int							maxAreas;			// size of the 'areas' array
////	int							getOutOfSolid;		// trace out of solid if the trace starts in solid
////								// output
////	float						fraction;			// fraction of trace completed
////	idVec3						endpos;				// end position of trace
////	int							planeNum;			// plane hit
////	int							lastAreaNum;		// number of last area the trace went through
////	int							blockingAreaNum;	// area that could not be entered
////	int							numAreas;			// number of areas the trace went through
////	int *						areas;				// array to store areas the trace went through
////	idVec3 *					points;				// points where the trace entered each new area
////								aasTrace_s( ) { areas = NULL; points = NULL; getOutOfSolid = false; flags = travelFlags = maxAreas = 0; }
////} aasTrace_t;
////
////// settings
////class idAASSettings {
////public:
////								// collision settings
////	int							numBoundingBoxes;
////	idBounds					boundingBoxes[MAX_AAS_BOUNDING_BOXES];
////	bool						usePatches;
////	bool						writeBrushMap;
////	bool						playerFlood;
////	bool						noOptimize;
////	bool						allowSwimReachabilities;
////	bool						allowFlyReachabilities;
////	idStr						fileExtension;
////								// physics settings
////	idVec3						gravity;
////	idVec3						gravityDir;
////	idVec3						invGravityDir;
////	float						gravityValue;
////	float						maxStepHeight;
////	float						maxBarrierHeight;
////	float						maxWaterJumpHeight;
////	float						maxFallHeight;
////	float						minFloorCos;
////								// fixed travel times
////	int							tt_barrierJump;
////	int							tt_startCrouching;
////	int							tt_waterJump;
////	int							tt_startWalkOffLedge;
////
////public:
////								idAASSettings( );
////
////	bool						FromFile( const idStr &fileName );
////	bool						FromParser( idLexer &src );
////	bool						FromDict( const char *name, const idDict *dict );
////	bool						WriteToFile( idFile *fp ) const;
////	bool						ValidForBounds( const idBounds &bounds ) const;
////	bool						ValidEntity( const char *classname ) const;
////
////private:
////	bool						ParseBool( idLexer &src, bool &b );
////	bool						ParseInt( idLexer &src, int &i );
////	bool						ParseFloat( idLexer &src, float &f );
////	bool						ParseVector( idLexer &src, idVec3 &vec );
////	bool						ParseBBoxes( idLexer &src );
////};
////
////
/////*
////
////-	when a node child is a solid leaf the node child number is zero
////-	two adjacent areas (sharing a plane at opposite sides) share a face
////	this face is a portal between the areas
////-	when an area uses a face from the faceindex with a positive index
////	then the face plane normal points into the area
////-	the face edges are stored counter clockwise using the edgeindex
////-	two adjacent convex areas (sharing a face) only share One face
////	this is a simple result of the areas being convex
////-	the areas can't have a mixture of ground and gap faces
////	other mixtures of faces in one area are allowed
////-	areas with the AREACONTENTS_CLUSTERPORTAL in the settings have
////	the cluster number set to the negative portal number
////-	edge zero is a dummy
////-	face zero is a dummy
////-	area zero is a dummy
////-	node zero is a dummy
////-	portal zero is a dummy
////-	cluster zero is a dummy
////
////*/
////
////
class idAASFile {
////public:
////	virtual 					~idAASFile( ) {}
////
	GetName ( ): string { return this.name.c_str ( ); }
	GetCRC ( ): number { return this.crc; }
////
////	int							GetNumPlanes( ) const { return planeList.Num(); }
////	const idPlane &				GetPlane( int index ) const { return planeList[index]; }
////	int							GetNumVertices( ) const { return vertices.Num(); }
////	const aasVertex_t &			GetVertex( int index ) const { return vertices[index]; }
////	int							GetNumEdges( ) const { return edges.Num(); }
////	const aasEdge_t &			GetEdge( int index ) const { return edges[index]; }
////	int							GetNumEdgeIndexes( ) const { return edgeIndex.Num(); }
////	const aasIndex_t &			GetEdgeIndex( int index ) const { return edgeIndex[index]; }
////	int							GetNumFaces( ) const { return faces.Num(); }
////	const aasFace_t &			GetFace( int index ) const { return faces[index]; }
////	int							GetNumFaceIndexes( ) const { return faceIndex.Num(); }
////	const aasIndex_t &			GetFaceIndex( int index ) const { return faceIndex[index]; }
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
////	idList<aasEdge_t>			edges		   =new idList<aasEdge_t>	();		
////	idList<aasIndex_t>			edgeIndex	   =new idList</*aasIndex_t*/number>(Number);
////	idList<aasFace_t>			faces		   =new idList<aasFace_t>		();
////	idList<aasIndex_t>			faceIndex	   =new idList<aasIndex_t>		();
////	idList<aasArea_t>			areas		   =new idList<aasArea_t>		();
////	idList<aasNode_t>			nodes		   =new idList<aasNode_t>		();
////	idList<aasPortal_t>			portals	   =new idList<aasPortal_t>			();
////	idList<aasIndex_t>			portalIndex   =new idList<aasIndex_t>		();
////	idList<aasCluster_t>		clusters	   =new idList<aasCluster_t>	();
////	idAASSettings				settings	   =new idAASSettings			();
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
////								idAASFileLocal( void );
////	virtual 					~idAASFileLocal( void );

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
////	virtual void				PrintInfo( void ) const;

////public:
////	bool						Load( const idStr &fileName, unsigned int mapFileCRC );
////	bool						Write( const idStr &fileName, unsigned int mapFileCRC );

////	int							MemorySize( void ) const;
////	void						ReportRoutingEfficiency( void ) const;
////	void						Optimize( void );
////	void						LinkReversedReachability( void );
////	void						FinishAreas( void );

////	void						Clear( void );
////	void						DeleteReachabilities( void );
////	void						DeleteClusters( void );

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
////	int							MaxTreeDepth( void ) const;
////	int							AreaContentsTravelFlags( int areaNum ) const;
////	idVec3						AreaReachableGoal( int areaNum ) const;
////	int							NumReachabilities( void ) const;
////};

////#endif /* !__AASFILELOCAL_H__ */


	
////
/////*
////===============================================================================
////
////	idAASFileLocal
////
////===============================================================================
////*/
////

////
/////*
////================
////idAASFileLocal::idAASFileLocal
////================
////*/
////idAASFileLocal::idAASFileLocal( void ) {
////	planeList.SetGranularity( AAS_PLANE_GRANULARITY );
////	vertices.SetGranularity( AAS_VERTEX_GRANULARITY );
////	edges.SetGranularity( AAS_EDGE_GRANULARITY );
////	edgeIndex.SetGranularity( AAS_INDEX_GRANULARITY );
////	faces.SetGranularity( AAS_LIST_GRANULARITY );
////	faceIndex.SetGranularity( AAS_INDEX_GRANULARITY );
////	areas.SetGranularity( AAS_LIST_GRANULARITY );
////	nodes.SetGranularity( AAS_LIST_GRANULARITY );
////	portals.SetGranularity( AAS_LIST_GRANULARITY );
////	portalIndex.SetGranularity( AAS_INDEX_GRANULARITY );
////	clusters.SetGranularity( AAS_LIST_GRANULARITY );
////}
////
/////*
////================
////idAASFileLocal::~idAASFileLocal
////================
////*/
////idAASFileLocal::~idAASFileLocal( void ) {
////	int i;
////	idReachability *reach, *next;
////
////	for ( i = 0; i < areas.Num(); i++ ) {
////		for ( reach = areas[i].reach; reach; reach = next ) {
////			next = reach.next;
////			delete reach;
////		}
////	}
////}
////
/////*
////================
////idAASFileLocal::Clear
////================
////*/
////void idAASFileLocal::Clear( void ) {
////	planeList.Clear();
////	vertices.Clear();
////	edges.Clear();
////	edgeIndex.Clear();
////	faces.Clear();
////	faceIndex.Clear();
////	areas.Clear();
////	nodes.Clear();
////	portals.Clear();
////	portalIndex.Clear();
////	clusters.Clear();
////}
////
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
////	name = fileName;
////	crc = mapFileCRC;
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
////	settings.WriteToFile( aasFile );
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
////	aasFile.WriteFloatString( "vertices %d {\n", vertices.Num() );
////	for ( i = 0; i < vertices.Num(); i++ ) {
////		aasFile.WriteFloatString( "\t%d ( %f %f %f )\n", i, vertices[i].x, vertices[i].y, vertices[i].z );
////	}
////	aasFile.WriteFloatString( "}\n" );
////
////	// write out edges
////	aasFile.WriteFloatString( "edges %d {\n", edges.Num() );
////	for ( i = 0; i < edges.Num(); i++ ) {
////		aasFile.WriteFloatString( "\t%d ( %d %d )\n", i, edges[i].vertexNum[0], edges[i].vertexNum[1] );
////	}
////	aasFile.WriteFloatString( "}\n" );
////
////	// write out edgeIndex
////	aasFile.WriteFloatString( "edgeIndex %d {\n", edgeIndex.Num() );
////	for ( i = 0; i < edgeIndex.Num(); i++ ) {
////		aasFile.WriteFloatString( "\t%d ( %d )\n", i, edgeIndex[i] );
////	}
////	aasFile.WriteFloatString( "}\n" );
////
////	// write out faces
////	aasFile.WriteFloatString( "faces %d {\n", faces.Num() );
////	for ( i = 0; i < faces.Num(); i++ ) {
////		aasFile.WriteFloatString( "\t%d ( %d %d %d %d %d %d )\n", i, faces[i].planeNum, faces[i].flags,
////						faces[i].areas[0], faces[i].areas[1], faces[i].firstEdge, faces[i].numEdges );
////	}
////	aasFile.WriteFloatString( "}\n" );
////
////	// write out faceIndex
////	aasFile.WriteFloatString( "faceIndex %d {\n", faceIndex.Num() );
////	for ( i = 0; i < faceIndex.Num(); i++ ) {
////		aasFile.WriteFloatString( "\t%d ( %d )\n", i, faceIndex[i] );
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
////	vertices.Resize( numVertices );
////	if ( !src.ExpectTokenString( "{" ) ) {
////		return false;
////	}
////	for ( i = 0; i < numVertices; i++ ) {
////		src.ParseInt();
////		if ( !src.Parse1DMatrix( 3, vec.ToFloatPtr() ) ) {
////			return false;
////		}
////		vertices.Append( vec );
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
////	faces.Resize( numFaces );
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
////		faces.Append( face );
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
////void idAASFileLocal::LinkReversedReachability( void ) {
////	int i;
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
////
/////*
////================
////idAASFileLocal::FinishAreas
////================
////*/
////void idAASFileLocal::FinishAreas( void ) {
////	int i;
////
////	for ( i = 0; i < areas.Num(); i++ ) {
////		areas[i].center = AreaReachableGoal( i );
////		areas[i].bounds = AreaBounds( i );
////	}
////}

/*
================
idAASFileLocal::Load
================
*/
	Load ( fileName: idStr, /*unsigned int */mapFileCRC: number ): boolean {
		todoThrow ( );
		//idLexer src( LEXFL_NOFATALERRORS | LEXFL_NOSTRINGESCAPECHARS | LEXFL_NOSTRINGCONCAT | LEXFL_ALLOWPATHNAMES );
		//idToken token;
		//int depth;
		//unsigned int c;

		//name = fileName;
		//crc = mapFileCRC;

		//common.Printf( "[Load AAS]\n" );
		//common.Printf( "loading %s\n", name.c_str() );

		//if ( !src.LoadFile( name ) ) {
		//	return false;
		//}

		//if ( !src.ExpectTokenString( AAS_FILEID ) ) {
		//	common.Warning( "Not an AAS file: '%s'", name.c_str() );
		//	return false;
		//}

		//if ( !src.ReadToken( &token ) || token != AAS_FILEVERSION ) {
		//	common.Warning( "AAS file '%s' has version %s instead of %s", name.c_str(), token.c_str(), AAS_FILEVERSION );
		//	return false;
		//}

		//if ( !src.ExpectTokenType( TT_NUMBER, TT_INTEGER, &token ) ) {
		//	common.Warning( "AAS file '%s' has no map file CRC", name.c_str() );
		//	return false;
		//}

		//c = token.GetUnsignedLongValue();
		//if ( mapFileCRC && c != mapFileCRC ) {
		//	common.Warning( "AAS file '%s' is out of date", name.c_str() );
		//	return false;
		//}

		//// clear the file in memory
		//Clear();

		//// parse the file
		//while ( 1 ) {
		//	if ( !src.ReadToken( &token ) ) {
		//		break;
		//	}

		//	if ( token == "settings" ) {
		//		if ( !settings.FromParser( src ) ) { return false; }
		//	}
		//	else if ( token == "planes" ) {
		//		if ( !ParsePlanes( src ) ) { return false; }
		//	}
		//	else if ( token == "vertices" ) {
		//		if ( !ParseVertices( src ) ) { return false; }
		//	}
		//	else if ( token == "edges" ) {
		//		if ( !ParseEdges( src ) ) { return false; }
		//	}
		//	else if ( token == "edgeIndex" ) {
		//		if ( !ParseIndex( src, edgeIndex ) ) { return false; }
		//	}
		//	else if ( token == "faces" ) {
		//		if ( !ParseFaces( src ) ) { return false; }
		//	}
		//	else if ( token == "faceIndex" ) {
		//		if ( !ParseIndex( src, faceIndex ) ) { return false; }
		//	}
		//	else if ( token == "areas" ) {
		//		if ( !ParseAreas( src ) ) { return false; }
		//	}
		//	else if ( token == "nodes" ) {
		//		if ( !ParseNodes( src ) ) { return false; }
		//	}
		//	else if ( token == "portals" ) {
		//		if ( !ParsePortals( src ) ) { return false; }
		//	}
		//	else if ( token == "portalIndex" ) {
		//		if ( !ParseIndex( src, portalIndex ) ) { return false; }
		//	}
		//	else if ( token == "clusters" ) {
		//		if ( !ParseClusters( src ) ) { return false; }
		//	}
		//	else {
		//		src.Error( "idAASFileLocal::Load: bad token \"%s\"", token.c_str() );
		//		return false;
		//	}
		//}

		//FinishAreas();

		//depth = MaxTreeDepth();
		//if ( depth > MAX_AAS_TREE_DEPTH ) {
		//	src.Error( "idAASFileLocal::Load: tree depth = %d", depth );
		//}

		//common.Printf( "done.\n" );

		return true;
	}

/////*
////================
////idAASFileLocal::MemorySize
////================
////*/
////int idAASFileLocal::MemorySize( void ) const {
////	int size;
////
////	size = planeList.Size();
////	size += vertices.Size();
////	size += edges.Size();
////	size += edgeIndex.Size();
////	size += faces.Size();
////	size += faceIndex.Size();
////	size += areas.Size();
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
////void idAASFileLocal::PrintInfo( void ) const {
////	common.Printf( "%6d KB file size\n", MemorySize() >> 10 );
////	common.Printf( "%6d areas\n", areas.Num() );
////	common.Printf( "%6d max tree depth\n", MaxTreeDepth() );
////	ReportRoutingEfficiency();
////}
////
/////*
////================
////idAASFileLocal::NumReachabilities
////================
////*/
////int idAASFileLocal::NumReachabilities( void ) const {
////	int i, num;
////	idReachability *reach;
////
////	num = 0;
////	for ( i = 0; i < areas.Num(); i++ ) {
////		for ( reach = areas[i].reach; reach; reach = reach.next ) {
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
////void idAASFileLocal::ReportRoutingEfficiency( void ) const {
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
////void idAASFileLocal::DeleteReachabilities( void ) {
////	int i;
////	idReachability *reach, *nextReach;
////
////	for ( i = 0; i < areas.Num(); i++ ) {
////		for ( reach = areas[i].reach; reach; reach = nextReach ) {
////			nextReach = reach.next;
////			delete reach;
////		}
////		areas[i].reach = NULL;
////		areas[i].rev_reach = NULL;
////	}
////}
////
/////*
////================
////idAASFileLocal::DeleteClusters
////================
////*/
////void idAASFileLocal::DeleteClusters( void ) {
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
////void idAASFileLocal::Optimize(void) {
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

////	vertexRemap.AssureSize(vertices.Num(), -1);
////	edgeRemap.AssureSize(edges.Num(), 0);
////	faceRemap.AssureSize(faces.Num(), 0);

////	newVertices.Resize(vertices.Num());
////	newEdges.Resize(edges.Num());
////	newEdges.SetNum(1, false);
////	newEdgeIndex.Resize(edgeIndex.Num());
////	newFaces.Resize(faces.Num());
////	newFaces.SetNum(1, false);
////	newFaceIndex.Resize(faceIndex.Num());

////	for (i = 0; i < areas.Num(); i++) {
////		area = &areas[i];

////		areaFirstFace = newFaceIndex.Num();
////		for (j = 0; j < area.numFaces; j++) {
////			faceNum = faceIndex[area.firstFace + j];
////			face = &faces[abs(faceNum)];

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
////						edgeNum = edgeIndex[face.firstEdge + k];
////						edge = &edges[abs(edgeNum)];

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
////								newVertices.Append(vertices[edge.vertexNum[0]]);
////							}
////							if (vertexRemap[edge.vertexNum[1]] == -1) {
////								vertexRemap[edge.vertexNum[1]] = newVertices.Num();
////								newVertices.Append(vertices[edge.vertexNum[1]]);
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
////	vertices = newVertices;
////	edges = newEdges;
////	edgeIndex = newEdgeIndex;
////	faces = newFaces;
////	faceIndex = newFaceIndex;
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
////	edge = &edges[edgeNum];
////	return (vertices[edge.vertexNum[0]] + vertices[edge.vertexNum[1]]) * 0.5f;
////}

/////*
////================
////idAASFileLocal::FaceCenter
////================
////*/
////idVec3 idAASFileLocal::FaceCenter(int faceNum) const {
////	int i, edgeNum;
////	const aasFace_t *face;
////	const aasEdge_t *edge;
////	idVec3 center;

////	center = vec3_origin;

////	face = &faces[faceNum];
////	if (face.numEdges > 0) {
////		for (i = 0; i < face.numEdges; i++) {
////			edgeNum = edgeIndex[face.firstEdge + i];
////			edge = &edges[abs(edgeNum)];
////			center += vertices[edge.vertexNum[INTSIGNBITSET(edgeNum)]];
////		}
////		center /= face.numEdges;
////	}
////	return center;
////}

/////*
////================
////idAASFileLocal::AreaCenter
////================
////*/
////idVec3 idAASFileLocal::AreaCenter(int areaNum) const {
////	int i, faceNum;
////	const aasArea_t *area;
////	idVec3 center;

////	center = vec3_origin;

////	area = &areas[areaNum];
////	if (area.numFaces > 0) {
////		for (i = 0; i < area.numFaces; i++) {
////			faceNum = faceIndex[area.firstFace + i];
////			center += FaceCenter(abs(faceNum));
////		}
////		center /= area.numFaces;
////	}
////	return center;
////}

/////*
////============
////idAASFileLocal::AreaReachableGoal
////============
////*/
////idVec3 idAASFileLocal::AreaReachableGoal(int areaNum) const {
////	int i, faceNum, numFaces;
////	const aasArea_t *area;
////	idVec3 center;
////	idVec3 start, end;
////	aasTrace_t trace;

////	area = &areas[areaNum];

////	if (!(area.flags & (AREA_REACHABLE_WALK | AREA_REACHABLE_FLY)) || (area.flags & AREA_LIQUID)) {
////		return AreaCenter(areaNum);
////	}

////	center = vec3_origin;

////	numFaces = 0;
////	for (i = 0; i < area.numFaces; i++) {
////		faceNum = faceIndex[area.firstFace + i];
////		if (!(faces[abs(faceNum)].flags & FACE_FLOOR)) {
////			continue;
////		}
////		center += FaceCenter(abs(faceNum));
////		numFaces++;
////	}
////	if (numFaces > 0) {
////		center /= numFaces;
////	}
////	center[2] += 1.0f;
////	end = center;
////	end[2] -= 1024;
////	Trace(trace, center, end);

////	return trace.endpos;
////}

/////*
////================
////idAASFileLocal::EdgeBounds
////================
////*/
////idBounds idAASFileLocal::EdgeBounds(int edgeNum) const {
////	const aasEdge_t *edge;
////	idBounds bounds;

////	edge = &edges[abs(edgeNum)];
////	bounds[0] = bounds[1] = vertices[edge.vertexNum[0]];
////	bounds += vertices[edge.vertexNum[1]];
////	return bounds;
////}

/////*
////================
////idAASFileLocal::FaceBounds
////================
////*/
////idBounds idAASFileLocal::FaceBounds(int faceNum) const {
////	int i, edgeNum;
////	const aasFace_t *face;
////	const aasEdge_t *edge;
////	idBounds bounds;

////	face = &faces[faceNum];
////	bounds.Clear();

////	for (i = 0; i < face.numEdges; i++) {
////		edgeNum = edgeIndex[face.firstEdge + i];
////		edge = &edges[abs(edgeNum)];
////		bounds.AddPoint(vertices[edge.vertexNum[INTSIGNBITSET(edgeNum)]]);
////	}
////	return bounds;
////}

/////*
////================
////idAASFileLocal::AreaBounds
////================
////*/
////idBounds idAASFileLocal::AreaBounds(int areaNum) const {
////	int i, faceNum;
////	const aasArea_t *area;
////	idBounds bounds;

////	area = &areas[areaNum];
////	bounds.Clear();

////	for (i = 0; i < area.numFaces; i++) {
////		faceNum = faceIndex[area.firstFace + i];
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
////		if ((areas[areaNum].flags & areaFlags) && ((areas[areaNum].travelFlags & excludeTravelFlags) == 0)) {
////			return areaNum;
////		}
////	}
////	else {
////		// trace up
////		end = start;
////		end[2] += 32.0f;
////		Trace(trace, start, end);
////		if (trace.numAreas >= 1) {
////			if ((areas[0].flags & areaFlags) && ((areas[0].travelFlags & excludeTravelFlags) == 0)) {
////				return areaList[0];
////			}
////			start = pointList[0];
////			start[2] += 1.0f;
////		}
////	}

////	// trace down
////	end = start;
////	end[2] -= 32.0f;
////	Trace(trace, start, end);
////	if (trace.lastAreaNum) {
////		if ((areas[trace.lastAreaNum].flags & areaFlags) && ((areas[trace.lastAreaNum].travelFlags & excludeTravelFlags) == 0)) {
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
////		if (areaNum && (areas[areaNum].flags & areaFlags) && ((areas[areaNum].travelFlags & excludeTravelFlags) == 0)) {
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
////			if ((areas[-nodeNum].flags & areaFlags) && ((areas[-nodeNum].travelFlags & excludeTravelFlags) == 0)) {
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

////	area = &areas[areaNum];

////	// push the point to the right side of all area face planes
////	for (i = 0; i < area.numFaces; i++) {
////		faceNum = faceIndex[area.firstFace + i];
////		face = &faces[abs(faceNum)];

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
////			if ((areas[-nodeNum].flags & trace.flags) || (areas[-nodeNum].travelFlags & trace.travelFlags)) {
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
////int idAASFileLocal::AreaContentsTravelFlags(int areaNum) const {
////	if (areas[areaNum].contents & AREACONTENTS_WATER) {
////		return TFL_WATER;
////	}
////	return TFL_AIR;
////}

/////*
////============
////idAASFileLocal::MaxTreeDepth_r
////============
////*/
////void idAASFileLocal::MaxTreeDepth_r(int nodeNum, int &depth, int &maxDepth) const {
////	const aasNode_t *node;

////	if (nodeNum <= 0) {
////		return;
////	}

////	depth++;
////	if (depth > maxDepth) {
////		maxDepth = depth;
////	}

////	node = &nodes[nodeNum];
////	MaxTreeDepth_r(node.children[0], depth, maxDepth);
////	MaxTreeDepth_r(node.children[1], depth, maxDepth);

////	depth--;
////}

/////*
////============
////idAASFileLocal::MaxTreeDepth
////============
////*/
////int idAASFileLocal::MaxTreeDepth(void) const {
////	int depth, maxDepth;

////	depth = maxDepth = 0;
////	MaxTreeDepth_r(1, depth, maxDepth);
////	return maxDepth;
////}
}