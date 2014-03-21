///*
//===========================================================================
//
//Doom 3 GPL Source Code
//Copyright (C) 1999-2011 id Software LLC, a ZeniMax Media company. 
//
//This file is part of the Doom 3 GPL Source Code (?Doom 3 Source Code?).  
//
//Doom 3 Source Code is free software: you can redistribute it and/or modify
//it under the terms of the GNU General Public License as published by
//the Free Software Foundation, either version 3 of the License, or
//(at your option) any later version.
//
//Doom 3 Source Code is distributed in the hope that it will be useful,
//but WITHOUT ANY WARRANTY; without even the implied warranty of
//MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//GNU General Public License for more details.
//
//You should have received a copy of the GNU General Public License
//along with Doom 3 Source Code.  If not, see <http://www.gnu.org/licenses/>.
//
//In addition, the Doom 3 Source Code is also subject to certain additional terms. You should have received a copy of these additional terms immediately following the terms and conditions of the GNU General Public License which accompanied the Doom 3 Source Code.  If not, please request a copy in writing from id Software at the address below.
//
//If you have questions concerning this license or the applicable additional terms, you may contact in writing id Software LLC, c/o ZeniMax Media Inc., Suite 120, Rockville, Maryland 20850 USA.
//
//===========================================================================
//*/
//
//#ifndef __RENDERWORLDLOCAL_H__
//#define __RENDERWORLDLOCAL_H__
//
// assume any lightDef or entityDef index above this is an internal error
var LUDICROUS_INDEX	= 10000;


class portal_t {
	intoArea: number /*int*/; // area this portal leads to
	w: idWinding; // winding points have counter clockwise ordering seen this area
	plane = new idPlane; // view must be on the positive side of the plane to cross
	next: portal_t; // next portal of the area
	doublePortal: doublePortal_t;
}


class doublePortal_t {
	portals = new Array<portal_t>(2);
	blockingBits: number /*int*/; // PS_BLOCK_VIEW, PS_BLOCK_AIR, etc, set by doors that shut them off

	// A portal will be considered closed if it is past the
	// fog-out point in a fog volume.  We only support a single
	// fog volume over each portal.
	fogLight: idRenderLightLocal;
	nextFoggedPortal: doublePortal_t;
}


class portalArea_t {
	areaNum:number/*int*/;
	connectedAreaNum = new Int32Array(NUM_PORTAL_ATTRIBUTES);	// if two areas have matching connectedAreaNum, they are
								// not separated by a portal with the apropriate PS_BLOCK_* blockingBits
	viewCount:number/*int*/;		// set by R_FindViewLightsAndEntities
	portals: portal_t;		// never changes after load
	entityRefs = new areaReference_t;		// head/tail of doubly linked list, may change
	lightRefs = new areaReference_t;		// head/tail of doubly linked list, may change
}


var CHILDREN_HAVE_MULTIPLE_AREAS = -2;
var AREANUM_SOLID = -1;
class areaNode_t {
	plane = new idPlane;
	children = new Int32Array(2);		// negative numbers are (-1 - areaNumber), 0 = solid
	commonChildrenArea:number/*int*/;	// if all children are either solid or a single area,
										// this is the area number, else CHILDREN_HAVE_MULTIPLE_AREAS
}


class idRenderWorldLocal extends idRenderWorld {
//public:
//							idRenderWorldLocal();
//	virtual					~idRenderWorldLocal();
//
//	virtual	qhandle_t		AddEntityDef( const renderEntity_t *re );
//	virtual	void			UpdateEntityDef( qhandle_t entityHandle, const renderEntity_t *re );
//	virtual	void			FreeEntityDef( qhandle_t entityHandle );
//	virtual const renderEntity_t *GetRenderEntity( qhandle_t entityHandle ) const;
//
//	virtual	qhandle_t		AddLightDef( const renderLight_t *rlight );
//	virtual	void			UpdateLightDef( qhandle_t lightHandle, const renderLight_t *rlight );
//	virtual	void			FreeLightDef( qhandle_t lightHandle );
//	virtual const renderLight_t *GetRenderLight( qhandle_t lightHandle ) const;
//
//	virtual bool			CheckAreaForPortalSky( int areaNum );
//
//	virtual	void			GenerateAllInteractions();
//	virtual void			RegenerateWorld();
//
//	virtual void			ProjectDecalOntoWorld( const idFixedWinding &winding, const idVec3 &projectionOrigin, const bool parallel, const float fadeDepth, const idMaterial *material, const int startTime );
//	virtual void			ProjectDecal( qhandle_t entityHandle, const idFixedWinding &winding, const idVec3 &projectionOrigin, const bool parallel, const float fadeDepth, const idMaterial *material, const int startTime );
//	virtual void			ProjectOverlay( qhandle_t entityHandle, const idPlane localTextureAxis[2], const idMaterial *material );
//	virtual void			RemoveDecals( qhandle_t entityHandle );
//
//	virtual void			SetRenderView( const renderView_t *renderView );
//	virtual	void			RenderScene( const renderView_t *renderView );
//
//	virtual	int				NumAreas( ) const;
//	virtual int				PointInArea( const idVec3 &point ) const;
//	virtual int				BoundsInAreas( const idBounds &bounds, int *areas, int maxAreas ) const;
//	virtual	int				NumPortalsInArea( int areaNum );
//	virtual exitPortal_t	GetPortal( int areaNum, int portalNum );
//
//	virtual	guiPoint_t		GuiTrace( qhandle_t entityHandle, const idVec3 start, const idVec3 end ) const;
//	virtual bool			ModelTrace( modelTrace_t &trace, qhandle_t entityHandle, const idVec3 &start, end:idVec3, const float radius ) const;
//	virtual bool			Trace( modelTrace_t &trace, const idVec3 &start, end:idVec3, const float radius, bool skipDynamic = true, bool skipPlayer = false ) const;
//	virtual bool			FastWorldTrace( modelTrace_t &trace, const idVec3 &start, end:idVec3 ) const;
//
	DebugClearLines ( /*int*/time: number ): void { throw "placeholder"; }
//	virtual void			DebugLine( const idVec4 &color, const idVec3 &start, end:idVec3, const int lifetime = 0, const bool depthTest = false );
//	virtual void			DebugArrow( const idVec4 &color, start:idVec3, end:idVec3, int size, const int lifetime = 0 );
//	virtual void			DebugWinding( const idVec4 &color, const idWinding &w, const idVec3 &origin, const idMat3 &axis, const int lifetime = 0, const bool depthTest = false );
//	virtual void			DebugCircle( const idVec4 &color, const idVec3 &origin, const idVec3 &dir, const float radius, const int numSteps, const int lifetime = 0, const bool depthTest = false );
//	virtual void			DebugSphere( const idVec4 &color, const idSphere &sphere, const int lifetime = 0, bool depthTest = false );
//	virtual void			DebugBounds( const idVec4 &color, const idBounds &bounds, const idVec3 &org = vec3_origin, const int lifetime = 0 );
//	virtual void			DebugBox( const idVec4 &color, const idBox &box, const int lifetime = 0 );
//	virtual void			DebugFrustum( const idVec4 &color, const idFrustum &frustum, const bool showFromOrigin = false, const int lifetime = 0 );
//	virtual void			DebugCone( const idVec4 &color, const idVec3 &apex, const idVec3 &dir, float radius1, float radius2, const int lifetime = 0 );
//	virtual void			DebugScreenRect( const idVec4 &color, const idScreenRect &rect, const viewDef_t *viewDef, const int lifetime = 0 );
//	virtual void			DebugAxis( const idVec3 &origin, const idMat3 &axis );

	DebugClearPolygons( /*int*/time: number): void { throw "placeholder"; }
	DebugPolygon ( color: idVec4, winding: idWinding, lifeTime: number = 0, depthTest: boolean = false ): void { throw "placeholder"; }
//
//	virtual void			DrawText( text:string, const idVec3 &origin, float scale, const idVec4 &color, const idMat3 &viewAxis, const int align = 1, const int lifetime = 0, bool depthTest = false );
//
	//-----------------------

	mapName = new idStr;				// ie: maps/tim_dm2.proc, written to demoFile
	mapTimeStamp: number;			// for fast reloads of the same level

	areaNodes: areaNode_t[];
	numAreaNodes:number/*int*/;

	portalAreas:portalArea_t;
	numPortalAreas:number/*int*/;
	connectedAreaNum:number/*int*/;		// incremented every time a door portal state changes
	
	areaScreenRect: idScreenRect;

//	doublePortal_t *		doublePortals;
	numInterAreaPortals:number/*int*/;

	localModels = new idList<idRenderModel>(idRenderModel,true);

	entityDefs = new idList<idRenderEntityLocal>(idRenderEntityLocal,true);
	lightDefs = new idList<idRenderLightLocal>(idRenderLightLocal,true);
	
	areaReferenceAllocator = idBlockAlloc_template <areaReference_t>(areaReference_t, 1024);	
	interactionAllocator = idBlockAlloc_template <idInteraction>(idInteraction, 256);
	areaNumRefAllocator = idBlockAlloc_template <areaNumRef_t>(areaNumRef_t, 1024);

//	// all light / entity interactions are referenced here for fast lookup without
//	// having to crawl the doubly linked lists.  EnntityDefs are sequential for better
//	// cache access, because the table is accessed by light in idRenderWorldLocal::CreateLightDefInteractions()
//	// Growing this table is time consuming, so we add a pad value to the number
//	// of entityDefs and lightDefs
//	idInteraction **		interactionTable;
	interactionTableWidth:number/*int*/;		// entityDefs
	interactionTableHeight:number/*int*/;		// lightDefs


	generateAllInteractionsCalled: boolean;

	//-----------------------
	// RenderWorld_load.cpp

	ParseModel ( src: idLexer ): idRenderModel { throw "placeholder"; }
	ParseShadowModel ( src: idLexer ): idRenderModel { throw "placeholder"; }
	SetupAreaRefs ( ): void { throw "placeholder"; }
	ParseInterAreaPortals(src: idLexer ):void { throw "placeholder"; }
	ParseNodes ( src: idLexer ): void { throw "placeholder"; }
	CommonChildrenArea_r ( node: areaNode_t ): number { throw "placeholder"; }
	FreeWorld():void { throw "placeholder"; }
	ClearWorld():void { throw "placeholder"; }
	FreeDefs():void { throw "placeholder"; }
	TouchWorldModels( ):void { throw "placeholder"; }
	AddWorldModelEntities():void { throw "placeholder"; }
	ClearPortalStates():void { throw "placeholder"; }
//	virtual	bool			InitFromMap( const char *mapName );
//
//	//--------------------------
//	// RenderWorld_portals.cpp
//
//	idScreenRect			ScreenRectFromWinding( const idWinding *w, viewEntity_t *space );
//	bool					PortalIsFoggedOut( const portal_t *p );
//	void					FloodViewThroughArea_r( const idVec3 origin, int areaNum, const struct portalStack_s *ps );
//	void					FlowViewThroughPortals( const idVec3 origin, int numPlanes, const idPlane *planes );
//	void					FloodLightThroughArea_r( idRenderLightLocal *light, int areaNum, const struct portalStack_s *ps );
//	void					FlowLightThroughPortals( idRenderLightLocal *light );
//	areaNumRef_t *			FloodFrustumAreas_r( const idFrustum &frustum, const int areaNum, const idBounds &bounds, areaNumRef_t *areas );
//	areaNumRef_t *			FloodFrustumAreas( const idFrustum &frustum, areaNumRef_t *areas );
//	bool					CullEntityByPortals( const idRenderEntityLocal *entity, const struct portalStack_s *ps );
//	void					AddAreaEntityRefs( int areaNum, const struct portalStack_s *ps );
//	bool					CullLightByPortals( const idRenderLightLocal *light, const struct portalStack_s *ps );
//	void					AddAreaLightRefs( int areaNum, const struct portalStack_s *ps );
//	void					AddAreaRefs( int areaNum, const struct portalStack_s *ps );
//	void					BuildConnectedAreas_r( int areaNum );
//	void					BuildConnectedAreas( );
//	void					FindViewLightsAndEntities( );
//
//	int						NumPortals( ) const;
//	qhandle_t				FindPortal( const idBounds &b ) const;
//	void					SetPortalState( qhandle_t portal, int blockingBits );
//	int						GetPortalState( qhandle_t portal );
//	bool					AreasAreConnected( int areaNum1, int areaNum2, portalConnection_t connection );
	FloodConnectedAreas(area: portalArea_t, /*int */portalAttributeIndex: number): void { throw "placeholder"; }
//	idScreenRect &			GetAreaScreenRect( int areaNum ) const { return areaScreenRect[areaNum]; }
//	void					ShowPortals();
//
//	//--------------------------
//	// RenderWorld_demo.cpp
//
//	void					StartWritingDemo( idDemoFile *demo );
//	void					StopWritingDemo();
//	bool					ProcessDemoCommand( idDemoFile *readDemo, renderView_t *demoRenderView, int *demoTimeOffset );
//
//	void					WriteLoadMap();
//	void					WriteRenderView( const renderView_t *renderView );
//	void					WriteVisibleDefs( const viewDef_t *viewDef );
//	void					WriteFreeLight( qhandle_t handle );
//	void					WriteFreeEntity( qhandle_t handle );
//	void					WriteRenderLight( qhandle_t handle, const renderLight_t *light );
//	void					WriteRenderEntity( qhandle_t handle, const renderEntity_t *ent );
//	void					ReadRenderEntity();
//	void					ReadRenderLight();
//	
//
//	//--------------------------
//	// RenderWorld.cpp
//
//	void					ResizeInteractionTable();
//
	AddEntityRefToArea(def:idRenderEntityLocal, area :portalArea_t ):void { throw "placeholder"; }
//	void					AddLightRefToArea( idRenderLightLocal *light, portalArea_t *area );
//
//	void					RecurseProcBSP_r( modelTrace_t *results, int parentNodeNum, int nodeNum, float p1f, float p2f, const idVec3 &p1, const idVec3 &p2 ) const;
//
//	void					BoundsInAreas_r( int nodeNum, const idBounds &bounds, int *areas, int *numAreas, int maxAreas ) const;
//
//	float					DrawTextLength( text:string, float scale, int len = 0 );
//
	FreeInteractions():void { throw "placeholder"; }
//
//	void					PushVolumeIntoTree_r( idRenderEntityLocal *def, idRenderLightLocal *light, const idSphere *sphere, int numPoints, const idVec3 (*points), int nodeNum );
//
//	void					PushVolumeIntoTree( idRenderEntityLocal *def, idRenderLightLocal *light, int numPoints, const idVec3 (*points) );
//
//	//-------------------------------
//	// tr_light.c
//	void					CreateLightDefInteractions( idRenderLightLocal *ldef );
};
//
//#endif /* !__RENDERWORLDLOCAL_H__ */
