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
////#ifndef __AAS_LOCAL_H__
////#define __AAS_LOCAL_H__
////
////#include "AAS.h"
////#include "../Pvs.h"
////
////
class idRoutingCache {
////	friend class idAASLocal;
////
////public:
////								idRoutingCache( int size );
////								~idRoutingCache( );
////
////	int							Size( ) const;
////
////private:
////	int							type;					// portal or area cache
////	int							size;					// size of cache
////	int							cluster;				// cluster of the cache
////	int							areaNum;				// area of the cache
////	int							travelFlags;			// combinations of the travel flags
////	idRoutingCache *			next;					// next in list
////	idRoutingCache *			prev;					// previous in list
////	idRoutingCache *			time_next;				// next in time based list
////	idRoutingCache *			time_prev;				// previous in time based list
////	unsigned short				startTravelTime;		// travel time to start with
////	unsigned char *				reachabilities;			// reachabilities used for routing
////	unsigned short *			travelTimes;			// travel time for every area
};


class idRoutingUpdate {
////	friend class idAASLocal;
////
////private:
////	int							cluster;				// cluster number of this update
////	int							areaNum;				// area number of this update
////	unsigned short				tmpTravelTime;			// temporary travel time
////	unsigned short *			areaTravelTimes;		// travel times within the area
////	idVec3						start;					// start point into area
////	idRoutingUpdate *			next;					// next in list
////	idRoutingUpdate *			prev;					// prev in list
////	bool						isInList;				// true if the update is in the list
}


class idRoutingObstacle {
////	friend class idAASLocal;
////								idRoutingObstacle( ) { }
////
////private:
////	idBounds					bounds;					// obstacle bounds
////	idList<int>					areas;					// areas the bounds are in
};


class idAASLocal extends idAAS {
////public:
////								idAASLocal( );
////	virtual						~idAASLocal( );
////	virtual bool				Init( const idStr &mapName, unsigned int mapFileCRC );
////	virtual void				Shutdown( );
////	virtual void				Stats( ) const;
////	virtual void				Test( const idVec3 &origin );
////	virtual const idAASSettings *GetSettings( ) const;
////	virtual int					PointAreaNum( const idVec3 &origin ) const;
////	virtual int					PointReachableAreaNum( const idVec3 &origin, const idBounds &searchBounds, const int areaFlags ) const;
////	virtual int					BoundsReachableAreaNum( const idBounds &bounds, const int areaFlags ) const;
////	virtual void				PushPointIntoAreaNum( int areaNum, idVec3 &origin ) const;
////	virtual idVec3				AreaCenter( int areaNum ) const;
////	virtual int					AreaFlags( int areaNum ) const;
////	virtual int					AreaTravelFlags( int areaNum ) const;
////	virtual bool				Trace( aasTrace_t &trace, start:idVec3, end:idVec3 ) const;
////	virtual const idPlane &		GetPlane( int planeNum ) const;
////	virtual int					GetWallEdges( int areaNum, const idBounds &bounds, int travelFlags, int *edges, int maxEdges ) const;
////	virtual void				SortWallEdges( int *edges, int numEdges ) const;
////	virtual void				GetEdgeVertexNumbers( int edgeNum, int verts[2] ) const;
////	virtual void				GetEdge( int edgeNum, idVec3 &start, idVec3 &end ) const;
////	virtual bool				SetAreaState( const idBounds &bounds, const int areaContents, bool disabled );
////	virtual aasHandle_t			AddObstacle( const idBounds &bounds );
////	virtual void				RemoveObstacle( const aasHandle_t handle );
////	virtual void				RemoveAllObstacles( );
////	virtual int					TravelTimeToGoalArea( int areaNum, const idVec3 &origin, int goalAreaNum, int travelFlags ) const;
////	virtual bool				RouteToGoalArea( int areaNum, const idVec3 origin, int goalAreaNum, int travelFlags, int &travelTime, idReachability **reach ) const;
////	virtual bool				WalkPathToGoal( aasPath_t &path, int areaNum, const idVec3 &origin, int goalAreaNum, const idVec3 &goalOrigin, int travelFlags ) const;
////	virtual bool				WalkPathValid( int areaNum, const idVec3 &origin, int goalAreaNum, const idVec3 &goalOrigin, int travelFlags, idVec3 &endPos, int &endAreaNum ) const;
////	virtual bool				FlyPathToGoal( aasPath_t &path, int areaNum, const idVec3 &origin, int goalAreaNum, const idVec3 &goalOrigin, int travelFlags ) const;
////	virtual bool				FlyPathValid( int areaNum, const idVec3 &origin, int goalAreaNum, const idVec3 &goalOrigin, int travelFlags, idVec3 &endPos, int &endAreaNum ) const;
////	virtual void				ShowWalkPath( const idVec3 &origin, int goalAreaNum, const idVec3 &goalOrigin ) const;
////	virtual void				ShowFlyPath( const idVec3 &origin, int goalAreaNum, const idVec3 &goalOrigin ) const;
////	virtual bool				FindNearestGoal( aasGoal_t &goal, int areaNum, const idVec3 origin, const idVec3 &target, int travelFlags, aasObstacle_t *obstacles, int numObstacles, idAASCallback &callback ) const;
////
////private:
	file: idAASFile;
	name = new idStr;
////
////private:	// routing data
	areaCacheIndex:idRoutingCache[][]; //idRoutingCache ***				// for each area in each cluster the travel times to all other areas in the cluster
	areaCacheIndexSize:number/*int*/;		// number of area cache entries
	portalCacheIndex:idRoutingCache[];	//idRoutingCache **	// for each area in the world the travel times from each portal
	portalCacheIndexSize:number/*int*/;	// number of portal cache entries
	areaUpdate:idRoutingUpdate[];				// memory used to update the area routing cache
	portalUpdate:idRoutingUpdate[];			// memory used to update the portal routing cache
	goalAreaTravelTimes:Uint16Array;	// travel times to goal areas
	areaTravelTimes:Uint16Array;		// travel times through the areas
	numAreaTravelTimes: number /*int*/;		// number of area travel times
	cacheListStart:idRoutingCache/*mutable*/;			// start of list with cache sorted from oldest to newest
	cacheListEnd:idRoutingCache/*mutable*/;			// end of list with cache sorted from oldest to newest
	totalCacheMemory:number/*mutable int*/;		// total cache memory used
	obstacleList = new idList<idRoutingObstacle>(idRoutingObstacle, true);			// list with obstacles
////
////private:	// routing
////	bool						SetupRouting( );
////	void						ShutdownRouting( );
////	unsigned short				AreaTravelTime( int areaNum, start:idVec3, end:idVec3 ) const;
////	void						CalculateAreaTravelTimes( );
////	void						DeleteAreaTravelTimes( );
////	void						SetupRoutingCache( );
////	void						DeleteClusterCache( int clusterNum );
////	void						DeletePortalCache( );
////	void						ShutdownRoutingCache( );
////	void						RoutingStats( ) const;
////	void						LinkCache( idRoutingCache *cache ) const;
////	void						UnlinkCache( idRoutingCache *cache ) const;
////	void						DeleteOldestCache( ) const;
////	idReachability *			GetAreaReachability( int areaNum, int reachabilityNum ) const;
////	int							ClusterAreaNum( int clusterNum, int areaNum ) const;
////	void						UpdateAreaRoutingCache( idRoutingCache *areaCache ) const;
////	idRoutingCache *			GetAreaRoutingCache( int clusterNum, int areaNum, int travelFlags ) const;
////	void						UpdatePortalRoutingCache( idRoutingCache *portalCache ) const;
////	idRoutingCache *			GetPortalRoutingCache( int clusterNum, int areaNum, int travelFlags ) const;
////	void						RemoveRoutingCacheUsingArea( int areaNum );
////	void						DisableArea( int areaNum );
////	void						EnableArea( int areaNum );
////	bool						SetAreaState_r( int nodeNum, const idBounds &bounds, const int areaContents, bool disabled );
////	void						GetBoundsAreas_r( int nodeNum, const idBounds &bounds, idList<int> &areas ) const;
////	void						SetObstacleState( const idRoutingObstacle *obstacle, bool enable );
////
////private:	// pathing
////	bool						EdgeSplitPoint( idVec3 &split, int edgeNum, const idPlane &plane ) const;
////	bool						FloorEdgeSplitPoint( idVec3 &split, int areaNum, const idPlane &splitPlane, const idPlane &frontPlane, bool closest ) const;
////	idVec3						SubSampleWalkPath( int areaNum, const idVec3 &origin, start:idVec3, end:idVec3, int travelFlags, int &endAreaNum ) const;
////	idVec3						SubSampleFlyPath( int areaNum, const idVec3 &origin, start:idVec3, end:idVec3, int travelFlags, int &endAreaNum ) const;
////
////private:	// debug
////	const idBounds &			DefaultSearchBounds( ) const;
////	void						DrawCone( const idVec3 &origin, const idVec3 &dir, float radius, const idVec4 &color ) const;
////	void						DrawArea( int areaNum ) const;
////	void						DrawFace( int faceNum, bool side ) const;
////	void						DrawEdge( int edgeNum, bool arrow ) const;
////	void						DrawReachability( const idReachability *reach ) const;
////	void						ShowArea( const idVec3 &origin ) const;
////	void						ShowWallEdges( const idVec3 &origin ) const;
////	void						ShowHideArea( const idVec3 &origin, int targerAreaNum ) const;
////	bool						PullPlayer( const idVec3 &origin, int toAreaNum ) const;
////	void						RandomPullPlayer( const idVec3 &origin ) const;
////	void						ShowPushIntoArea( const idVec3 &origin ) const;



	////
	/////*
	////============
	////idAAS::idAAS
	////============
	////*/
	////idAAS::~idAAS( ) {
	////}
	////
	/////*
	//============
	//idAASLocal::idAASLocal
	//============
	//*/
	constructor() {
		super ( );
		this.file = null;
	}
	
	/*
	============
	idAASLocal::~idAASLocal
	============
	*/
	destructor ( ): void {
		this.Shutdown ( );
	}

	/*
	============
	idAASLocal::Init
	============
	*/
	Init ( mapName: idStr, /*unsigned int */mapFileCRC: number ): boolean {
		if ( this.file && mapName.Icmp( this.file.GetName ( ) ) == 0 && mapFileCRC == this.file.GetCRC ( ) ) {
			common.Printf( "Keeping %s\n", this.file.GetName ( ) );
			todoThrow ( );
			//this.RemoveAllObstacles();
		} else {
			this.Shutdown ( );

			this.file = AASFileManager.LoadAAS( mapName.data, mapFileCRC );
			if ( !this.file ) {
				common.DWarning( "Couldn't load AAS file: '%s'", mapName.c_str ( ) );
				return false;
			}
			this.SetupRouting ( );
		}
		return true;
	}

/*
============
idAASLocal::Shutdown
============
*/
	Shutdown ( ): void {
		if ( this.file ) {
			todoThrow ( );
			//this.ShutdownRouting ( );
			//this.RemoveAllObstacles ( );
			//AASFileManager.FreeAAS( this.file );
			//this.file = null;
		}
	}

/////*
////============
////idAASLocal::Stats
////============
////*/
////void idAASLocal::Stats( ) const {
////	if ( !this.file ) {
////		return;
////	}
////	common.Printf( "[%s]\n", this.file.GetName() );
////	this.file.PrintInfo();
////	RoutingStats();
////}
////
/////*
////============
////idAASLocal::GetSettings
////============
////*/
////const idAASSettings *idAASLocal::GetSettings( ) const {
////	if ( !this.file ) {
////		return NULL;
////	}
////	return &this.file.GetSettings();
////}
////
/////*
////============
////idAASLocal::PointAreaNum
////============
////*/
////int idAASLocal::PointAreaNum( const idVec3 &origin ) const {
////	if ( !this.file ) {
////		return 0;
////	}
////	return this.file.PointAreaNum( origin );
////}
////
/////*
////============
////idAASLocal::PointReachableAreaNum
////============
////*/
////int idAASLocal::PointReachableAreaNum( const idVec3 &origin, const idBounds &searchBounds, const int areaFlags ) const {
////	if ( !this.file ) {
////		return 0;
////	}
////
////	return this.file.PointReachableAreaNum( origin, searchBounds, areaFlags, TFL_INVALID );
////}
////
/////*
////============
////idAASLocal::BoundsReachableAreaNum
////============
////*/
////int idAASLocal::BoundsReachableAreaNum( const idBounds &bounds, const int areaFlags ) const {
////	if ( !this.file ) {
////		return 0;
////	}
////	
////	return this.file.BoundsReachableAreaNum( bounds, areaFlags, TFL_INVALID );
////}
////
/////*
////============
////idAASLocal::PushPointIntoAreaNum
////============
////*/
////void idAASLocal::PushPointIntoAreaNum( int areaNum, idVec3 &origin ) const {
////	if ( !this.file ) {
////		return;
////	}
////	this.file.PushPointIntoAreaNum( areaNum, origin );
////}
////
/////*
////============
////idAASLocal::AreaCenter
////============
////*/
////idVec3 idAASLocal::AreaCenter( int areaNum ) const {
////	if ( !this.file ) {
////		return vec3_origin;
////	}
////	return this.file.GetArea( areaNum ).center;
////}
////
/////*
////============
////idAASLocal::AreaFlags
////============
////*/
////int idAASLocal::AreaFlags( int areaNum ) const {
////	if ( !this.file ) {
////		return 0;
////	}
////	return this.file.GetArea( areaNum ).flags;
////}
////
/////*
////============
////idAASLocal::AreaTravelFlags
////============
////*/
////int idAASLocal::AreaTravelFlags( int areaNum ) const {
////	if ( !this.file ) {
////		return 0;
////	}
////	return this.file.GetArea( areaNum ).travelFlags;
////}
////
/////*
////============
////idAASLocal::Trace
////============
////*/
////bool idAASLocal::Trace( aasTrace_t &trace, start:idVec3, end:idVec3 ) const {
////	if ( !this.file ) {
////		trace.fraction = 0.0;
////		trace.lastAreaNum = 0;
////		trace.numAreas = 0;
////		return true;
////	}
////	return this.file.Trace( trace, start, end );
////}
////
/////*
////============
////idAASLocal::GetPlane
////============
////*/
////const idPlane &idAASLocal::GetPlane( int planeNum ) const {
////	if ( !this.file ) {
////		static idPlane dummy;
////		return dummy;
////	}
////	return this.file.GetPlane( planeNum );
////}
////
/////*
////============
////idAASLocal::GetEdgeVertexNumbers
////============
////*/
////void idAASLocal::GetEdgeVertexNumbers( int edgeNum, int verts[2] ) const {
////	if ( !this.file ) {
////		verts[0] = verts[1] = 0;
////		return;
////	}
////	const int *v = this.file.GetEdge( abs(edgeNum) ).vertexNum;
////	verts[0] = v[INTSIGNBITSET(edgeNum)];
////	verts[1] = v[INTSIGNBITNOTSET(edgeNum)];
////}
////
/////*
////============
////idAASLocal::GetEdge
////============
////*/
////void idAASLocal::GetEdge( int edgeNum, idVec3 &start, idVec3 &end ) const {
////	if ( !this.file ) {
////		start.Zero();
////		end.Zero();
////		return;
////	}
////	const int *v = this.file.GetEdge( abs(edgeNum) ).vertexNum;
////	start = this.file.GetVertex( v[INTSIGNBITSET(edgeNum)] );
////	end = this.file.GetVertex( v[INTSIGNBITNOTSET(edgeNum)] );
////}


/*
===============================================================================

AAS Routing

===============================================================================
*/

	
/*
============
idAASLocal::AreaTravelTime
============
*/
	AreaTravelTime ( /*int*/ areaNum: number, start: idVec3, end: idVec3 ): number /*unsigned short*/ {
		var /*float */dist: number;

		dist = ( end.opSubtraction( start ) ).Length ( );

		if ( this.file.GetArea( areaNum ).travelFlags & TFL_CROUCH ) {
			dist *= 100.0 / 100.0;
		} else if ( this.file.GetArea( areaNum ).travelFlags & TFL_WATER ) {
			dist *= 100.0 / 150.0;
		} else {
			dist *= 100.0 / 300.0;
		}
		if ( dist < 1.0 ) {
			return 1;
		}
		return ( unsigned_short )( idMath.FtoiFast( dist ) );
	}

/*
============
idAASLocal::CalculateAreaTravelTimes
============
*/
	CalculateAreaTravelTimes ( ): void {
		var /*int */n: number, i: number, j: number, numReach: number, numRevReach: number, t: number, maxt: number;
		var bytePtr: number; //byte *bytePtr;
		var reach: idReachability, rev_reach: idReachability;

		// get total memory for all area travel times
		this.numAreaTravelTimes = 0;
		for ( n = 0; n < this.file.GetNumAreas ( ); n++ ) {

			if ( !( this.file.GetArea( n ).flags & ( AREA_REACHABLE_WALK | AREA_REACHABLE_FLY ) ) ) {
				continue;
			}

			numReach = 0;
			for ( reach = this.file.GetArea( n ).reach; reach; reach = reach.next ) {
				numReach++;
			}

			numRevReach = 0;
			for ( rev_reach = this.file.GetArea( n ).rev_reach; rev_reach; rev_reach = rev_reach.rev_next ) {
				numRevReach++;
			}
			this.numAreaTravelTimes += numReach * numRevReach;
		}

		this.areaTravelTimes = new Int16Array( Mem_Alloc( this.numAreaTravelTimes * sizeof( unsigned_short ) ) );
		bytePtr = 0; //(byte *) areaTravelTimes;

		for ( n = 0; n < this.file.GetNumAreas ( ); n++ ) {

			if ( !( this.file.GetArea( n ).flags & ( AREA_REACHABLE_WALK | AREA_REACHABLE_FLY ) ) ) {
				continue;
			}

			// for each reachability that starts in this area calculate the travel time
			// towards all the reachabilities that lead towards this area
			for ( maxt = i = 0, reach = this.file.GetArea( n ).reach; reach; reach = reach.next, i++ ) {
				assert( i < MAX_REACH_PER_AREA );
				if ( i >= MAX_REACH_PER_AREA ) {
					gameLocal.Error( "i >= MAX_REACH_PER_AREA" );
				}
				reach.number = i;
				reach.disableCount = 0;
				reach.areaTravelTimes = this.areaTravelTimes.subarray( bytePtr ); //(unsigned short *) bytePtr;
				for ( j = 0, rev_reach = this.file.GetArea( n ).rev_reach; rev_reach; rev_reach = rev_reach.rev_next, j++ ) {
					t = this.AreaTravelTime( n, reach.start, rev_reach.end );
					reach.areaTravelTimes[j] = t;
					if ( t > maxt ) {
						maxt = t;
					}
				}
				bytePtr += j * sizeof( unsigned_short );
			}

			// if this area is a portal
			if ( this.file.GetArea( n ).cluster < 0 ) {
				// set the maximum travel time through this portal
				this.file.SetPortalMaxTravelTime( -this.file.GetArea( n ).cluster, maxt );
			}
		}

		assert( ( /*(unsigned int)*/ bytePtr /*- (unsigned int) this.areaTravelTimes*/ ) <= this.numAreaTravelTimes * sizeof( unsigned_short ) );
	}

/////*
////============
////idAASLocal::DeleteAreaTravelTimes
////============
////*/
////void idAASLocal::DeleteAreaTravelTimes( ) {
////	Mem_Free( this.areaTravelTimes );
////	this.areaTravelTimes = NULL;
////	this.numAreaTravelTimes = 0;
////}

/*
============
idAASLocal::SetupRoutingCache
============
*/
	SetupRoutingCache ( ): void {
		var /*int */i: number;
		//byte *bytePtr;

		this.areaCacheIndexSize = 0;
		for ( i = 0; i < this.file.GetNumClusters ( ); i++ ) {
			this.areaCacheIndexSize += this.file.GetCluster( i ).numReachableAreas;
		}
		this.areaCacheIndex = new Array( this.file.GetNumClusters ( ) ); //(idRoutingCache ***) Mem_ClearedAlloc( this.file.GetNumClusters() * sizeof( idRoutingCache ** ) +
		//	this.areaCacheIndexSize * sizeof( idRoutingCache *) );
		//bytePtr = ((byte *)this.areaCacheIndex) + this.file.GetNumClusters() * sizeof( idRoutingCache ** );
		for ( i = 0; i < this.file.GetNumClusters ( ); i++ ) {
			this.areaCacheIndex[i] = newStructArray<idRoutingCache>( idRoutingCache, this.areaCacheIndexSize ); //( idRoutingCache ** ) bytePtr;
			//bytePtr += this.file.GetCluster( i ).numReachableAreas * sizeof( idRoutingCache * );
		}

		this.portalCacheIndexSize = this.file.GetNumAreas ( );
		this.portalCacheIndex = newStructArray<idRoutingCache>( idRoutingCache, this.portalCacheIndexSize ); // (idRoutingCache **) Mem_ClearedAlloc( this.portalCacheIndexSize * sizeof( idRoutingCache * ) );

		this.areaUpdate = newStructArray<idRoutingUpdate>( idRoutingUpdate, this.file.GetNumAreas ( ) ); // (idRoutingUpdate *) Mem_ClearedAlloc( this.file.GetNumAreas() * sizeof( idRoutingUpdate ) );
		this.portalUpdate = newStructArray<idRoutingUpdate>( idRoutingUpdate, this.file.GetNumPortals ( ) + 1 ); // (idRoutingUpdate *) Mem_ClearedAlloc( (this.file.GetNumPortals()+1) * sizeof( idRoutingUpdate ) );

		this.goalAreaTravelTimes = new Uint16Array( this.file.GetNumAreas ( ) ); // // (unsigned short *) Mem_ClearedAlloc( this.file.GetNumAreas() * sizeof( unsigned short ) );

		this.cacheListStart = this.cacheListEnd = null;
		this.totalCacheMemory = 0;
	}

/////*
////============
////idAASLocal::DeleteClusterCache
////============
////*/
////void idAASLocal::DeleteClusterCache( int clusterNum ) {
////	int i;
////	idRoutingCache *cache;
////
////	for ( i = 0; i < this.file.GetCluster( clusterNum ).numReachableAreas; i++ ) {
////		for ( cache = this.areaCacheIndex[clusterNum][i]; cache; cache = this.areaCacheIndex[clusterNum][i] ) {
////			this.areaCacheIndex[clusterNum][i] = cache.next;
////			UnlinkCache( cache );
////			delete cache;
////		}
////	}
////}
////
/////*
////============
////idAASLocal::DeletePortalCache
////============
////*/
////void idAASLocal::DeletePortalCache( ) {
////	int i;
////	idRoutingCache *cache;
////
////	for ( i = 0; i < this.file.GetNumAreas(); i++ ) {
////		for ( cache = this.portalCacheIndex[i]; cache; cache = this.portalCacheIndex[i] ) {
////			this.portalCacheIndex[i] = cache.next;
////			UnlinkCache( cache );
////			delete cache;
////		}
////	}
////}
////
/////*
////============
////idAASLocal::ShutdownRoutingCache
////============
////*/
////void idAASLocal::ShutdownRoutingCache( ) {
////	int i;
////
////	for ( i = 0; i < this.file.GetNumClusters(); i++ ) {
////		DeleteClusterCache( i );
////	}
////
////	DeletePortalCache();
////
////	Mem_Free( this.areaCacheIndex );
////	this.areaCacheIndex = NULL;
////	this.areaCacheIndexSize = 0;
////	Mem_Free( this.portalCacheIndex );
////	this.portalCacheIndex = NULL;
////	this.portalCacheIndexSize = 0;
////	Mem_Free( this.areaUpdate );
////	this.areaUpdate = NULL;
////	Mem_Free( this.portalUpdate );
////	this.portalUpdate = NULL;
////	Mem_Free( this.goalAreaTravelTimes );
////	this.goalAreaTravelTimes = NULL;
////
////	this.cacheListStart = this.cacheListEnd = NULL;
////	this.totalCacheMemory = 0;
////}

/*
============
idAASLocal::SetupRouting
============
*/
	SetupRouting ( ): boolean {
		this.CalculateAreaTravelTimes();
		this.SetupRoutingCache();
		return true;
	}

/////*
////============
////idAASLocal::ShutdownRouting
////============
////*/
////void idAASLocal::ShutdownRouting( ) {
////	DeleteAreaTravelTimes();
////	ShutdownRoutingCache();
////}
////
/////*
////============
////idAASLocal::RoutingStats
////============
////*/
////void idAASLocal::RoutingStats( ) const {
////	idRoutingCache *cache;
////	int numAreaCache, numPortalCache;
////	int totalAreaCacheMemory, totalPortalCacheMemory;
////
////	numAreaCache = numPortalCache = 0;
////	totalAreaCacheMemory = totalPortalCacheMemory = 0;
////	for ( cache = this.cacheListStart; cache; cache = cache.time_next ) {
////		if ( cache.type == CACHETYPE_AREA ) {
////			numAreaCache++;
////			totalAreaCacheMemory += sizeof( idRoutingCache ) + cache.size * (sizeof( unsigned short ) + sizeof( byte ));
////		} else {
////			numPortalCache++;
////			totalPortalCacheMemory += sizeof( idRoutingCache ) + cache.size * (sizeof( unsigned short ) + sizeof( byte ));
////		}
////	}
////
////	gameLocal.Printf( "%6d area cache (%d KB)\n", numAreaCache, totalAreaCacheMemory >> 10 );
////	gameLocal.Printf( "%6d portal cache (%d KB)\n", numPortalCache, totalPortalCacheMemory >> 10 );
////	gameLocal.Printf( "%6d total cache (%d KB)\n", numAreaCache + numPortalCache, this.totalCacheMemory >> 10 );
////	gameLocal.Printf( "%6d area travel times (%d KB)\n", this.numAreaTravelTimes, ( this.numAreaTravelTimes * sizeof( unsigned short ) ) >> 10 );
////	gameLocal.Printf( "%6d area cache entries (%d KB)\n", this.areaCacheIndexSize, ( this.areaCacheIndexSize * sizeof( idRoutingCache * ) ) >> 10 );
////	gameLocal.Printf( "%6d portal cache entries (%d KB)\n", this.portalCacheIndexSize, ( this.portalCacheIndexSize * sizeof( idRoutingCache * ) ) >> 10 );
////}
////
/////*
////============
////idAASLocal::RemoveRoutingCacheUsingArea
////============
////*/
////void idAASLocal::RemoveRoutingCacheUsingArea( int areaNum ) {
////	int clusterNum;
////
////	clusterNum = this.file.GetArea( areaNum ).cluster;
////	if ( clusterNum > 0 ) {
////		// remove all the cache in the cluster the area is in
////		DeleteClusterCache( clusterNum );
////	}
////	else {
////		// if this is a portal remove all cache in both the front and back cluster
////		DeleteClusterCache( this.file.GetPortal( -clusterNum ).clusters[0] );
////		DeleteClusterCache( this.file.GetPortal( -clusterNum ).clusters[1] );
////	}
////	DeletePortalCache();
////}
////
/////*
////============
////idAASLocal::DisableArea
////============
////*/
////void idAASLocal::DisableArea( int areaNum ) {
////	assert( areaNum > 0 && areaNum < this.file.GetNumAreas() );
////
////	if ( this.file.GetArea( areaNum ).travelFlags & TFL_INVALID ) {
////		return;
////	}
////
////	this.file.SetAreaTravelFlag( areaNum, TFL_INVALID );
////
////	RemoveRoutingCacheUsingArea( areaNum );
////}
////
/////*
////============
////idAASLocal::EnableArea
////============
////*/
////void idAASLocal::EnableArea( int areaNum ) {
////	assert( areaNum > 0 && areaNum < this.file.GetNumAreas() );
////
////	if ( !( this.file.GetArea( areaNum ).travelFlags & TFL_INVALID ) ) {
////		return;
////	}
////
////	this.file.RemoveAreaTravelFlag( areaNum, TFL_INVALID );
////
////	RemoveRoutingCacheUsingArea( areaNum );
////}
////
/////*
////============
////idAASLocal::SetAreaState_r
////============
////*/
////bool idAASLocal::SetAreaState_r( int nodeNum, const idBounds &bounds, const int areaContents, bool disabled ) {
////	int res;
////	const aasNode_t *node;
////	bool foundClusterPortal = false;
////
////	while( nodeNum != 0 ) {
////		if ( nodeNum < 0 ) {
////			// if this area is a cluster portal
////			if ( this.file.GetArea( -nodeNum ).contents & areaContents ) {
////				if ( disabled ) {
////					DisableArea( -nodeNum );
////				} else {
////					EnableArea( -nodeNum );
////				}
////				foundClusterPortal |= true;
////			}
////			break;
////		}
////		node = &this.file.GetNode( nodeNum );
////		res = bounds.PlaneSide( this.file.GetPlane( node.planeNum ) );
////		if ( res == PLANESIDE_BACK ) {
////			nodeNum = node.children[1];
////		}
////		else if ( res == PLANESIDE_FRONT ) {
////			nodeNum = node.children[0];
////		}
////		else {
////			foundClusterPortal |= SetAreaState_r( node.children[1], bounds, areaContents, disabled );
////			nodeNum = node.children[0];
////		}
////	}
////
////	return foundClusterPortal;
////}
////
/////*
////============
////idAASLocal::SetAreaState
////============
////*/
////bool idAASLocal::SetAreaState( const idBounds &bounds, const int areaContents, bool disabled ) {
////	idBounds expBounds;
////
////	if ( !this.file ) {
////		return false;
////	}
////
////	expBounds[0] = bounds[0] - this.file.GetSettings().boundingBoxes[0][1];
////	expBounds[1] = bounds[1] - this.file.GetSettings().boundingBoxes[0][0];
////
////	// find all areas within or touching the bounds with the given contents and disable/enable them for routing
////	return SetAreaState_r( 1, expBounds, areaContents, disabled );
////}
////
/////*
////============
////idAASLocal::GetBoundsAreas_r
////============
////*/
////void idAASLocal::GetBoundsAreas_r( int nodeNum, const idBounds &bounds, idList<int> &areas ) const {
////	int res;
////	const aasNode_t *node;
////
////	while( nodeNum != 0 ) {
////		if ( nodeNum < 0 ) {
////			areas.Append( -nodeNum );
////			break;
////		}
////		node = &this.file.GetNode( nodeNum );
////		res = bounds.PlaneSide( this.file.GetPlane( node.planeNum ) );
////		if ( res == PLANESIDE_BACK ) {
////			nodeNum = node.children[1];
////		}
////		else if ( res == PLANESIDE_FRONT ) {
////			nodeNum = node.children[0];
////		}
////		else {
////			GetBoundsAreas_r( node.children[1], bounds, areas );
////			nodeNum = node.children[0];
////		}
////	}
////}
////
/////*
////============
////idAASLocal::SetObstacleState
////============
////*/
////void idAASLocal::SetObstacleState( const idRoutingObstacle *obstacle, bool enable ) {
////	int i;
////	const aasArea_t *area;
////	idReachability *reach, *rev_reach;
////	bool inside;
////
////	for ( i = 0; i < obstacle.areas.Num(); i++ ) {
////
////		RemoveRoutingCacheUsingArea( obstacle.areas[i] );
////
////		area = &this.file.GetArea( obstacle.areas[i] );
////
////		for ( rev_reach = area.rev_reach; rev_reach; rev_reach = rev_reach.rev_next ) {
////
////			if ( rev_reach.travelType & TFL_INVALID ) {
////				continue;
////			}
////
////			inside = false;
////
////			if ( obstacle.bounds.ContainsPoint( rev_reach.end ) ) {
////				inside = true;
////			}
////			else {
////				for ( reach = area.reach; reach; reach = reach.next ) {
////					if ( obstacle.bounds.LineIntersection( rev_reach.end, reach.start ) ) {
////						inside = true;
////						break;
////					}
////				}
////			}
////
////			if ( inside ) {
////				if ( enable ) {
////					rev_reach.disableCount--;
////					if ( rev_reach.disableCount <= 0 ) {
////						rev_reach.travelType &= ~TFL_INVALID;
////						rev_reach.disableCount = 0;
////					}
////				}
////				else {
////					rev_reach.travelType |= TFL_INVALID;
////					rev_reach.disableCount++;
////				}
////			}
////		}
////	}
////}
////
/////*
////============
////idAASLocal::AddObstacle
////============
////*/
////aasHandle_t idAASLocal::AddObstacle( const idBounds &bounds ) {
////	idRoutingObstacle *obstacle;
////
////	if ( !this.file ) {
////		return -1;
////	}
////
////	obstacle = new idRoutingObstacle;
////	obstacle.bounds[0] = bounds[0] - this.file.GetSettings().boundingBoxes[0][1];
////	obstacle.bounds[1] = bounds[1] - this.file.GetSettings().boundingBoxes[0][0];
////	GetBoundsAreas_r( 1, obstacle.bounds, obstacle.areas );
////	SetObstacleState( obstacle, true );
////
////	obstacleList.Append( obstacle );
////	return obstacleList.Num() - 1;
////}
////
/////*
////============
////idAASLocal::RemoveObstacle
////============
////*/
////void idAASLocal::RemoveObstacle( const aasHandle_t handle ) {
////	if ( !this.file ) {
////		return;
////	}
////	if ( ( handle >= 0 ) && ( handle < obstacleList.Num() ) ) {
////		SetObstacleState( obstacleList[handle], false );
////
////		delete obstacleList[handle];
////		obstacleList.RemoveIndex( handle );
////	}
////}
////
/////*
////============
////idAASLocal::RemoveAllObstacles
////============
////*/
////void idAASLocal::RemoveAllObstacles( ) {
////	int i;
////
////	if ( !this.file ) {
////		return;
////	}
////
////	for ( i = 0; i < obstacleList.Num(); i++ ) {
////		SetObstacleState( obstacleList[i], false );
////		delete obstacleList[i];
////	}
////	obstacleList.Clear();
////}
////
/////*
////============
////idAASLocal::LinkCache
////
////  link the cache in the cache list sorted from oldest to newest cache
////============
////*/
////void idAASLocal::LinkCache( idRoutingCache *cache ) const {
////
////	// if the cache is already linked
////	if ( cache.time_next || cache.time_prev || this.cacheListStart == cache ) {
////		UnlinkCache( cache );
////	}
////
////	this.totalCacheMemory += cache.Size();
////
////	// add cache to the end of the list
////	cache.time_next = NULL;
////	cache.time_prev = this.cacheListEnd;
////	if ( this.cacheListEnd ) {
////		this.cacheListEnd.time_next = cache;
////	}
////	this.cacheListEnd = cache;
////	if ( !this.cacheListStart ) {
////		this.cacheListStart = cache;
////	}
////}
////
/////*
////============
////idAASLocal::UnlinkCache
////============
////*/
////void idAASLocal::UnlinkCache( idRoutingCache *cache ) const {
////
////	this.totalCacheMemory -= cache.Size();
////
////	// unlink the cache
////	if ( cache.time_next ) {
////		cache.time_next.time_prev = cache.time_prev;
////	} else {
////		this.cacheListEnd = cache.time_prev;
////	}
////	if ( cache.time_prev ) {
////		cache.time_prev.time_next = cache.time_next;
////	} else {
////		this.cacheListStart = cache.time_next;
////	}
////	cache.time_next = cache.time_prev = NULL;
////}
////
/////*
////============
////idAASLocal::DeleteOldestCache
////============
////*/
////void idAASLocal::DeleteOldestCache( ) const {
////	idRoutingCache *cache;
////
////	assert( this.cacheListStart );
////
////	// unlink the oldest cache
////	cache = this.cacheListStart;
////	UnlinkCache( cache );
////
////	// unlink the oldest cache from the area or portal cache index
////	if ( cache.next ) {
////		cache.next.prev = cache.prev;
////	}
////	if ( cache.prev ) {
////		cache.prev.next = cache.next;
////	}
////	else if ( cache.type == CACHETYPE_AREA ) {
////		this.areaCacheIndex[cache.cluster][ClusterAreaNum( cache.cluster, cache.areaNum )] = cache.next;
////	}
////	else if ( cache.type == CACHETYPE_PORTAL ) {
////		this.portalCacheIndex[cache.areaNum] = cache.next;
////	}
////
////	delete cache;
////}
////
/////*
////============
////idAASLocal::GetAreaReachability
////============
////*/
////idReachability *idAASLocal::GetAreaReachability( int areaNum, int reachabilityNum ) const {
////	idReachability *reach;
////
////	for ( reach = this.file.GetArea( areaNum ).reach; reach; reach = reach.next ) {
////		if ( --reachabilityNum < 0 ) {
////			return reach;
////		}
////	}
////	return NULL;
////}
////
/////*
////============
////idAASLocal::ClusterAreaNum
////============
////*/
////ID_INLINE int idAASLocal::ClusterAreaNum( int clusterNum, int areaNum ) const {
////	int side, areaCluster;
////
////	areaCluster = this.file.GetArea( areaNum ).cluster;
////	if ( areaCluster > 0 ) {
////		return this.file.GetArea( areaNum ).clusterAreaNum;
////	}
////	else {
////		side = this.file.GetPortal( -areaCluster ).clusters[0] != clusterNum;
////		return this.file.GetPortal( -areaCluster ).clusterAreaNum[side];
////	}
////}
////
/////*
////============
////idAASLocal::UpdateAreaRoutingCache
////============
////*/
////void idAASLocal::UpdateAreaRoutingCache( idRoutingCache *areaCache ) const {
////	int i, nextAreaNum, cluster, badTravelFlags, clusterAreaNum, numReachableAreas;
////	unsigned short t, startAreaTravelTimes[MAX_REACH_PER_AREA];
////	idRoutingUpdate *updateListStart, *updateListEnd, *curUpdate, *nextUpdate;
////	idReachability *reach;
////	const aasArea_t *nextArea;
////
////	// number of reachability areas within this cluster
////	numReachableAreas = this.file.GetCluster( areaCache.cluster ).numReachableAreas;
////
////	// number of the start area within the cluster
////	clusterAreaNum = ClusterAreaNum( areaCache.cluster, areaCache.areaNum );
////	if ( clusterAreaNum >= numReachableAreas ) {
////		return;
////	}
////
////	areaCache.travelTimes[clusterAreaNum] = areaCache.startTravelTime;
////	badTravelFlags = ~areaCache.travelFlags;
////	memset( startAreaTravelTimes, 0, sizeof( startAreaTravelTimes ) );
////
////	// initialize first update
////	curUpdate = &this.areaUpdate[clusterAreaNum];
////	curUpdate.areaNum = areaCache.areaNum;
////	curUpdate.areaTravelTimes = startAreaTravelTimes;
////	curUpdate.tmpTravelTime = areaCache.startTravelTime;
////	curUpdate.next = NULL;
////	curUpdate.prev = NULL;
////	updateListStart = curUpdate;
////	updateListEnd = curUpdate;
////
////	// while there are updates in the list
////	while( updateListStart ) {
////
////		curUpdate = updateListStart;
////		if ( curUpdate.next ) {
////			curUpdate.next.prev = NULL;
////		}
////		else {
////			updateListEnd = NULL;
////		}
////		updateListStart = curUpdate.next;
////
////		curUpdate.isInList = false;
////
////		for ( i = 0, reach = this.file.GetArea( curUpdate.areaNum ).rev_reach; reach; reach = reach.rev_next, i++ ) {
////
////			// if the reachability uses an undesired travel type
////			if ( reach.travelType & badTravelFlags ) {
////				continue;
////			}
////
////			// next area the reversed reachability leads to
////			nextAreaNum = reach.fromAreaNum;
////			nextArea = &this.file.GetArea( nextAreaNum );
////
////			// if traveling through the next area requires an undesired travel flag
////			if ( nextArea.travelFlags & badTravelFlags ) {
////				continue;
////			}
////
////			// get the cluster number of the area
////			cluster = nextArea.cluster;
////			// don't leave the cluster, however do flood into cluster portals
////			if ( cluster > 0 && cluster != areaCache.cluster ) {
////				continue;
////			}
////
////			// get the number of the area in the cluster
////			clusterAreaNum = ClusterAreaNum( areaCache.cluster, nextAreaNum );
////			if ( clusterAreaNum >= numReachableAreas ) {
////				continue;	// should never happen
////			}
////
////			assert( clusterAreaNum < areaCache.size );
////
////			// time already travelled plus the traveltime through the current area
////			// plus the travel time of the reachability towards the next area
////			t = curUpdate.tmpTravelTime + curUpdate.areaTravelTimes[i] + reach.travelTime;
////
////			if ( !areaCache.travelTimes[clusterAreaNum] || t < areaCache.travelTimes[clusterAreaNum] ) {
////
////				areaCache.travelTimes[clusterAreaNum] = t;
////				areaCache.reachabilities[clusterAreaNum] = reach.number; // reversed reachability used to get into this area
////				nextUpdate = &this.areaUpdate[clusterAreaNum];
////				nextUpdate.areaNum = nextAreaNum;
////				nextUpdate.tmpTravelTime = t;
////				nextUpdate.areaTravelTimes = reach.areaTravelTimes;
////
////				// if we are not allowed to fly
////				if ( badTravelFlags & TFL_FLY ) {
////					// avoid areas near ledges
////					if ( this.file.GetArea( nextAreaNum ).flags & AREA_LEDGE ) {
////						nextUpdate.tmpTravelTime += LEDGE_TRAVELTIME_PANALTY;
////					}
////				}
////
////				if ( !nextUpdate.isInList ) {
////					nextUpdate.next = NULL;
////					nextUpdate.prev = updateListEnd;
////					if ( updateListEnd ) {
////						updateListEnd.next = nextUpdate;
////					}
////					else {
////						updateListStart = nextUpdate;
////					}
////					updateListEnd = nextUpdate;
////					nextUpdate.isInList = true;
////				}
////			}
////		}
////	}
////}
////
/////*
////============
////idAASLocal::GetAreaRoutingCache
////============
////*/
////idRoutingCache *idAASLocal::GetAreaRoutingCache( int clusterNum, int areaNum, int travelFlags ) const {
////	int clusterAreaNum;
////	idRoutingCache *cache, *clusterCache;
////
////	// number of the area in the cluster
////	clusterAreaNum = ClusterAreaNum( clusterNum, areaNum );
////	// pointer to the cache for the area in the cluster
////	clusterCache = this.areaCacheIndex[clusterNum][clusterAreaNum];
////	// check if cache without undesired travel flags already exists
////	for ( cache = clusterCache; cache; cache = cache.next ) {
////		if ( cache.travelFlags == travelFlags ) {
////			break;
////		}
////	}
////	// if no cache found
////	if ( !cache ) {
////		cache = new idRoutingCache( this.file.GetCluster( clusterNum ).numReachableAreas );
////		cache.type = CACHETYPE_AREA;
////		cache.cluster = clusterNum;
////		cache.areaNum = areaNum;
////		cache.startTravelTime = 1;
////		cache.travelFlags = travelFlags;
////		cache.prev = NULL;
////		cache.next = clusterCache;
////		if ( clusterCache ) {
////			clusterCache.prev = cache;
////		}
////		this.areaCacheIndex[clusterNum][clusterAreaNum] = cache;
////		UpdateAreaRoutingCache( cache );
////	}
////	LinkCache( cache );
////	return cache;
////}
////
/////*
////============
////idAASLocal::UpdatePortalRoutingCache
////============
////*/
////void idAASLocal::UpdatePortalRoutingCache( idRoutingCache *portalCache ) const {
////	int i, portalNum, clusterAreaNum;
////	unsigned short t;
////	const aasPortal_t *portal;
////	const aasCluster_t *cluster;
////	idRoutingCache *cache;
////	idRoutingUpdate *updateListStart, *updateListEnd, *curUpdate, *nextUpdate;
////
////	curUpdate = &this.portalUpdate[ this.file.GetNumPortals() ];
////	curUpdate.cluster = portalCache.cluster;
////	curUpdate.areaNum = portalCache.areaNum;
////	curUpdate.tmpTravelTime = portalCache.startTravelTime;
////
////	//put the area to start with in the current read list
////	curUpdate.next = NULL;
////	curUpdate.prev = NULL;
////	updateListStart = curUpdate;
////	updateListEnd = curUpdate;
////
////	// while there are updates in the current list
////	while( updateListStart ) {
////
////		curUpdate = updateListStart;
////		// remove the current update from the list
////		if ( curUpdate.next ) {
////			curUpdate.next.prev = NULL;
////		}
////		else {
////			updateListEnd = NULL;
////		}
////		updateListStart = curUpdate.next;
////		// current update is removed from the list
////		curUpdate.isInList = false;
////
////		cluster = &this.file.GetCluster( curUpdate.cluster );
////		cache = GetAreaRoutingCache( curUpdate.cluster, curUpdate.areaNum, portalCache.travelFlags );
////
////		// take all portals of the cluster
////		for ( i = 0; i < cluster.numPortals; i++ ) {
////			portalNum = this.file.GetPortalIndex( cluster.firstPortal + i );
////			assert( portalNum < portalCache.size );
////			portal = &this.file.GetPortal( portalNum );
////
////			clusterAreaNum = ClusterAreaNum( curUpdate.cluster, portal.areaNum );
////			if ( clusterAreaNum >= cluster.numReachableAreas ) {
////				continue;
////			}
////
////			t = cache.travelTimes[clusterAreaNum];
////			if ( t == 0 ) {
////				continue;
////			}
////			t += curUpdate.tmpTravelTime;
////
////			if ( !portalCache.travelTimes[portalNum] || t < portalCache.travelTimes[portalNum] ) {
////
////				portalCache.travelTimes[portalNum] = t;
////				portalCache.reachabilities[portalNum] = cache.reachabilities[clusterAreaNum];
////				nextUpdate = &this.portalUpdate[portalNum];
////				if ( portal.clusters[0] == curUpdate.cluster ) {
////					nextUpdate.cluster = portal.clusters[1];
////				}
////				else {
////					nextUpdate.cluster = portal.clusters[0];
////				}
////				nextUpdate.areaNum = portal.areaNum;
////				// add travel time through the actual portal area for the next update
////				nextUpdate.tmpTravelTime = t + portal.maxAreaTravelTime;
////
////				if ( !nextUpdate.isInList ) {
////
////					nextUpdate.next = NULL;
////					nextUpdate.prev = updateListEnd;
////					if ( updateListEnd ) {
////						updateListEnd.next = nextUpdate;
////					}
////					else {
////						updateListStart = nextUpdate;
////					}
////					updateListEnd = nextUpdate;
////					nextUpdate.isInList = true;
////				}
////			}
////		}
////	}
////}
////
/////*
////============
////idAASLocal::GetPortalRoutingCache
////============
////*/
////idRoutingCache *idAASLocal::GetPortalRoutingCache( int clusterNum, int areaNum, int travelFlags ) const {
////	idRoutingCache *cache;
////
////	// check if cache without undesired travel flags already exists
////	for ( cache = this.portalCacheIndex[areaNum]; cache; cache = cache.next ) {
////		if ( cache.travelFlags == travelFlags ) {
////			break;
////		}
////	}
////	// if no cache found
////	if ( !cache ) {
////		cache = new idRoutingCache( this.file.GetNumPortals() );
////		cache.type = CACHETYPE_PORTAL;
////		cache.cluster = clusterNum;
////		cache.areaNum = areaNum;
////		cache.startTravelTime = 1;
////		cache.travelFlags = travelFlags;
////		cache.prev = NULL;
////		cache.next = this.portalCacheIndex[areaNum];
////		if ( this.portalCacheIndex[areaNum] ) {
////			this.portalCacheIndex[areaNum].prev = cache;
////		}
////		this.portalCacheIndex[areaNum] = cache;
////		UpdatePortalRoutingCache( cache );
////	}
////	LinkCache( cache );
////	return cache;
////}
////
/////*
////============
////idAASLocal::RouteToGoalArea
////============
////*/
////bool idAASLocal::RouteToGoalArea( int areaNum, const idVec3 origin, int goalAreaNum, int travelFlags, int &travelTime, idReachability **reach ) const {
////	int clusterNum, goalClusterNum, portalNum, i, clusterAreaNum;
////	unsigned short int t, bestTime;
////	const aasPortal_t *portal;
////	const aasCluster_t *cluster;
////	idRoutingCache *areaCache, *portalCache, *clusterCache;
////	idReachability *bestReach, *r, *nextr;
////
////	travelTime = 0;
////	*reach = NULL;
////
////	if ( !this.file ) {
////		return false;
////	}
////
////	if ( areaNum == goalAreaNum ) {
////		return true;
////	}
////
////	if ( areaNum <= 0 || areaNum >= this.file.GetNumAreas() ) {
////		gameLocal.Printf( "RouteToGoalArea: areaNum %d out of range\n", areaNum );
////		return false;
////	}
////	if ( goalAreaNum <= 0 || goalAreaNum >= this.file.GetNumAreas() ) {
////		gameLocal.Printf( "RouteToGoalArea: goalAreaNum %d out of range\n", goalAreaNum );
////		return false;
////	}
////
////	while( this.totalCacheMemory > MAX_ROUTING_CACHE_MEMORY ) {
////		DeleteOldestCache();
////	}
////
////	clusterNum = this.file.GetArea( areaNum ).cluster;
////	goalClusterNum = this.file.GetArea( goalAreaNum ).cluster;
////
////	// if the source area is a cluster portal, read directly from the portal cache
////	if ( clusterNum < 0 ) {
////		// if the goal area is a portal
////		if ( goalClusterNum < 0 ) {
////			// just assume the goal area is part of the front cluster
////			portal = &this.file.GetPortal( -goalClusterNum );
////			goalClusterNum = portal.clusters[0];
////		}
////		// get the portal routing cache
////		portalCache = GetPortalRoutingCache( goalClusterNum, goalAreaNum, travelFlags );
////		*reach = GetAreaReachability( areaNum, portalCache.reachabilities[-clusterNum] );
////		travelTime = portalCache.travelTimes[-clusterNum] + AreaTravelTime( areaNum, origin, (*reach).start );
////		return true;
////	}
////
////	bestTime = 0;
////	bestReach = NULL;
////
////	// check if the goal area is a portal of the source area cluster
////	if ( goalClusterNum < 0 ) {
////		portal = &this.file.GetPortal( -goalClusterNum );
////		if ( portal.clusters[0] == clusterNum || portal.clusters[1] == clusterNum) {
////			goalClusterNum = clusterNum;
////		}
////	}
////
////	// if both areas are in the same cluster
////	if ( clusterNum > 0 && goalClusterNum > 0 && clusterNum == goalClusterNum ) {
////		clusterCache = GetAreaRoutingCache( clusterNum, goalAreaNum, travelFlags );
////		clusterAreaNum = ClusterAreaNum( clusterNum, areaNum );
////		if ( clusterCache.travelTimes[clusterAreaNum] ) {
////			bestReach = GetAreaReachability( areaNum, clusterCache.reachabilities[clusterAreaNum] );
////			bestTime = clusterCache.travelTimes[clusterAreaNum] + AreaTravelTime( areaNum, origin, bestReach.start );
////		}
////		else {
////			clusterCache = NULL;
////		}
////	}
////	else {
////		clusterCache = NULL;
////	}
////
////	clusterNum = this.file.GetArea( areaNum ).cluster;
////	goalClusterNum = this.file.GetArea( goalAreaNum ).cluster;
////
////	// if the goal area is a portal
////	if ( goalClusterNum < 0 ) {
////		// just assume the goal area is part of the front cluster
////		portal = &this.file.GetPortal( -goalClusterNum );
////		goalClusterNum = portal.clusters[0];
////	}
////	// get the portal routing cache
////	portalCache = GetPortalRoutingCache( goalClusterNum, goalAreaNum, travelFlags );
////
////	// the cluster the area is in
////	cluster = &this.file.GetCluster( clusterNum );
////	// current area inside the current cluster
////	clusterAreaNum = ClusterAreaNum( clusterNum, areaNum );
////	// if the area is not a reachable area
////	if ( clusterAreaNum >= cluster.numReachableAreas) {
////		return false;
////	}
////
////	// find the portal of the source area cluster leading towards the goal area
////	for ( i = 0; i < cluster.numPortals; i++ ) {
////		portalNum = this.file.GetPortalIndex( cluster.firstPortal + i );
////
////		// if the goal area isn't reachable from the portal
////		if ( !portalCache.travelTimes[portalNum] ) {
////			continue;
////		}
////
////		portal = &this.file.GetPortal( portalNum );
////		// get the cache of the portal area
////		areaCache = GetAreaRoutingCache( clusterNum, portal.areaNum, travelFlags );
////		// if the portal is not reachable from this area
////		if ( !areaCache.travelTimes[clusterAreaNum] ) {
////			continue;
////		}
////
////		r = GetAreaReachability( areaNum, areaCache.reachabilities[clusterAreaNum] );
////
////		if ( clusterCache ) {
////			// if the next reachability from the portal leads back into the cluster
////			nextr = GetAreaReachability( portal.areaNum, portalCache.reachabilities[portalNum] );
////			if ( this.file.GetArea( nextr.toAreaNum ).cluster < 0 || this.file.GetArea( nextr.toAreaNum ).cluster == clusterNum ) {
////				continue;
////			}
////		}
////
////		// the total travel time is the travel time from the portal area to the goal area
////		// plus the travel time from the source area towards the portal area
////		t = portalCache.travelTimes[portalNum] + areaCache.travelTimes[clusterAreaNum];
////		// NOTE:	Should add the exact travel time through the portal area.
////		//			However we add the largest travel time through the portal area.
////		//			We cannot directly calculate the exact travel time through the portal area
////		//			because the reachability used to travel into the portal area is not known.
////		t += portal.maxAreaTravelTime;
////
////		// if the time is better than the one already found
////		if ( !bestTime || t < bestTime ) {
////			bestReach = r;
////			bestTime = t;
////		}
////	}
////
////	if ( !bestReach ) {
////		return false;
////	}
////
////	*reach = bestReach;
////	travelTime = bestTime;
////
////	return true;
////}
////
/////*
////============
////idAASLocal::TravelTimeToGoalArea
////============
////*/
////int idAASLocal::TravelTimeToGoalArea( int areaNum, const idVec3 &origin, int goalAreaNum, int travelFlags ) const {
////	int travelTime;
////	idReachability *reach;
////
////	if ( !this.file ) {
////		return 0;
////	}
////
////	if ( !RouteToGoalArea( areaNum, origin, goalAreaNum, travelFlags, travelTime, &reach ) ) {
////		return 0;
////	}
////	return travelTime;
////}
////
/////*
////============
////idAASLocal::FindNearestGoal
////============
////*/
////bool idAASLocal::FindNearestGoal( aasGoal_t &goal, int areaNum, const idVec3 origin, const idVec3 &target, int travelFlags, aasObstacle_t *obstacles, int numObstacles, idAASCallback &callback ) const {
////	int i, j, k, badTravelFlags, nextAreaNum, bestAreaNum;
////	unsigned short t, bestTravelTime;
////	idRoutingUpdate *updateListStart, *updateListEnd, *curUpdate, *nextUpdate;
////	idReachability *reach;
////	const aasArea_t *nextArea;
////	idVec3 v1, v2, p;
////	float targetDist, dist;
////
////	if ( this.file == NULL || areaNum <= 0 ) {
////		goal.areaNum = areaNum;
////		goal.origin = origin;
////		return false;
////	}
////
////	// if the first area is valid goal, just return the origin
////	if ( callback.TestArea( this, areaNum ) ) {
////		goal.areaNum = areaNum;
////		goal.origin = origin;
////		return true;
////	}
////
////	// setup obstacles
////	for ( k = 0; k < numObstacles; k++ ) {
////		obstacles[k].expAbsBounds[0] = obstacles[k].absBounds[0] - this.file.GetSettings().boundingBoxes[0][1];
////		obstacles[k].expAbsBounds[1] = obstacles[k].absBounds[1] - this.file.GetSettings().boundingBoxes[0][0];
////	}
////	
////	badTravelFlags = ~travelFlags;
////	SIMDProcessor.Memset( this.goalAreaTravelTimes, 0, this.file.GetNumAreas() * sizeof( unsigned short ) );
////
////	targetDist = (target - origin).Length();
////
////	// initialize first update
////	curUpdate = &this.areaUpdate[areaNum];
////	curUpdate.areaNum = areaNum;
////	curUpdate.tmpTravelTime = 0;
////	curUpdate.start = origin;
////	curUpdate.next = NULL;
////	curUpdate.prev = NULL;
////	updateListStart = curUpdate;
////	updateListEnd = curUpdate;
////
////	bestTravelTime = 0;
////	bestAreaNum = 0;
////
////	// while there are updates in the list
////	while ( updateListStart ) {
////
////		curUpdate = updateListStart;
////		if ( curUpdate.next ) {
////			curUpdate.next.prev = NULL;
////		}
////		else {
////			updateListEnd = NULL;
////		}
////		updateListStart = curUpdate.next;
////
////		curUpdate.isInList = false;
////
////		// if we already found a closer location
////		if ( bestTravelTime && curUpdate.tmpTravelTime >= bestTravelTime ) {
////			continue;
////		}
////
////		for ( i = 0, reach = this.file.GetArea( curUpdate.areaNum ).reach; reach; reach = reach.next, i++ ) {
////
////			// if the reachability uses an undesired travel type
////			if ( reach.travelType & badTravelFlags ) {
////				continue;
////			}
////
////			// next area the reversed reachability leads to
////			nextAreaNum = reach.toAreaNum;
////			nextArea = &this.file.GetArea( nextAreaNum );
////
////			// if traveling through the next area requires an undesired travel flag
////			if ( nextArea.travelFlags & badTravelFlags ) {
////				continue;
////			}
////
////			t = curUpdate.tmpTravelTime +
////					AreaTravelTime( curUpdate.areaNum, curUpdate.start, reach.start ) +
////						reach.travelTime;
////
////			// project target origin onto movement vector through the area
////			v1 = reach.end - curUpdate.start;
////			v1.Normalize();
////			v2 = target - curUpdate.start;
////			p = curUpdate.start + (v2 * v1) * v1;
////
////			// get the point on the path closest to the target
////			for ( j = 0; j < 3; j++ ) {
////				if ( (p[j] > curUpdate.start[j] + 0.1f && p[j] > reach.end[j] + 0.1f) ||
////					(p[j] < curUpdate.start[j] - 0.1f && p[j] < reach.end[j] - 0.1f) ) {
////					break;
////				}
////			}
////			if ( j >= 3 ) {
////				dist = (target - p).Length();
////			} else {
////				dist = (target - reach.end).Length();
////			}
////
////			// avoid moving closer to the target
////			if ( dist < targetDist ) {
////				t += ( targetDist - dist ) * 10;
////			}
////
////			// if we already found a closer location
////			if ( bestTravelTime && t >= bestTravelTime ) {
////				continue;
////			}
////
////			// if this is not the best path towards the next area
////			if ( this.goalAreaTravelTimes[nextAreaNum] && t >= this.goalAreaTravelTimes[nextAreaNum] ) {
////				continue;
////			}
////
////			// path may not go through any obstacles
////			for ( k = 0; k < numObstacles; k++ ) {
////				// if the movement vector intersects the expanded obstacle bounds
////				if ( obstacles[k].expAbsBounds.LineIntersection( curUpdate.start, reach.end ) ) {
////					break;
////				}
////			}
////			if ( k < numObstacles ) {
////				continue;
////			}
////
////			this.goalAreaTravelTimes[nextAreaNum] = t;
////			nextUpdate = &this.areaUpdate[nextAreaNum];
////			nextUpdate.areaNum = nextAreaNum;
////			nextUpdate.tmpTravelTime = t;
////			nextUpdate.start = reach.end;
////
////			// if we are not allowed to fly
////			if ( badTravelFlags & TFL_FLY ) {
////				// avoid areas near ledges
////				if ( this.file.GetArea( nextAreaNum ).flags & AREA_LEDGE ) {
////					nextUpdate.tmpTravelTime += LEDGE_TRAVELTIME_PANALTY;
////				}
////			}
////
////			if ( !nextUpdate.isInList ) {
////				nextUpdate.next = NULL;
////				nextUpdate.prev = updateListEnd;
////				if ( updateListEnd ) {
////					updateListEnd.next = nextUpdate;
////				} else {
////					updateListStart = nextUpdate;
////				}
////				updateListEnd = nextUpdate;
////				nextUpdate.isInList = true;
////			}
////
////			// don't put goal near a ledge
////			if ( !( nextArea.flags & AREA_LEDGE ) ) {
////
////				// add travel time through the area
////				t += AreaTravelTime( reach.toAreaNum, reach.end, nextArea.center );
////	
////				if ( !bestTravelTime || t < bestTravelTime ) {
////					// if the area is not visible to the target
////					if ( callback.TestArea( this, reach.toAreaNum ) ) {
////						bestTravelTime = t;
////						bestAreaNum = reach.toAreaNum;
////					}
////				}
////			}
////		}
////	}
////
////	if ( bestAreaNum ) {
////		goal.areaNum = bestAreaNum;
////		goal.origin = AreaCenter( bestAreaNum );
////		return true;
////	}
////
////	return false;
////}






};
////
////#endif /* !__AAS_LOCAL_H__ */
