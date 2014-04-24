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
//#include "../idlib/precompiled.h"
//#pragma hdrstop
//
//#include "tr_local.h"
//
///*
//===================
//R_ListRenderLightDefs_f
//===================
//*/
//void R_ListRenderLightDefs_f( const idCmdArgs &args ) {
//	int			i;
//	idRenderLightLocal	*ldef;
//
//	if ( !tr.primaryWorld ) {
//		return;
//	}
//	int active = 0;
//	int	totalRef = 0;
//	int	totalIntr = 0;
//
//	for ( i = 0 ; i < tr.primaryWorld.lightDefs.Num() ; i++ ) {
//		ldef = tr.primaryWorld.lightDefs[i];
//		if ( !ldef ) {
//			common.Printf( "%4i: FREED\n", i );
//			continue;
//		}
//
//		// count up the interactions
//		int	iCount = 0;
//		for ( idInteraction *inter = ldef.firstInteraction; inter != NULL; inter = inter.lightNext ) {
//			iCount++;
//		}
//		totalIntr += iCount;
//
//		// count up the references
//		int	rCount = 0;
//		for ( areaReference_t *ref = ldef.references ; ref ; ref = ref.ownerNext ) {
//			rCount++;
//		}
//		totalRef += rCount;
//
//		common.Printf( "%4i: %3i intr %2i refs %s\n", i, iCount, rCount, ldef.lightShader.GetName());
//		active++;
//	}
//
//	common.Printf( "%i lightDefs, %i interactions, %i areaRefs\n", active, totalIntr, totalRef );
//}
//
///*
//===================
//R_ListRenderEntityDefs_f
//===================
//*/
//void R_ListRenderEntityDefs_f( const idCmdArgs &args ) {
//	int			i;
//	idRenderEntityLocal	*mdef;
//
//	if ( !tr.primaryWorld ) {
//		return;
//	}
//	int active = 0;
//	int	totalRef = 0;
//	int	totalIntr = 0;
//
//	for ( i = 0 ; i < tr.primaryWorld.entityDefs.Num() ; i++ ) {
//		mdef = tr.primaryWorld.entityDefs[i];
//		if ( !mdef ) {
//			common.Printf( "%4i: FREED\n", i );
//			continue;
//		}
//
//		// count up the interactions
//		int	iCount = 0;
//		for ( idInteraction *inter = mdef.firstInteraction; inter != NULL; inter = inter.entityNext ) {
//			iCount++;
//		}
//		totalIntr += iCount;
//
//		// count up the references
//		int	rCount = 0;
//		for ( areaReference_t *ref = mdef.entityRefs ; ref ; ref = ref.ownerNext ) {
//			rCount++;
//		}
//		totalRef += rCount;
//
//		common.Printf( "%4i: %3i intr %2i refs %s\n", i, iCount, rCount, mdef.parms.hModel.Name());
//		active++;
//	}
//
//	common.Printf( "total active: %i\n", active );
//}


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
	//	virtual	void			UpdateLightDef( lightHandle:number/*qhandle_t*/, const renderLight_t *rlight );
	//	virtual	void			FreeLightDef( lightHandle:number/*qhandle_t*/ );
	//	virtual const renderLight_t *GetRenderLight( lightHandle:number/*qhandle_t*/ ) const;
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
	//NumAreas(): number { throw "placeholder"; }
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
	//DebugClearLines( /*int*/time: number): void { throw "placeholder"; }
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

	//DebugClearPolygons( /*int*/time: number): void { throw "placeholder"; }
	//DebugPolygon(color: idVec4, winding: idWinding, lifeTime: number = 0, depthTest: boolean = false): void { throw "placeholder"; }
	//
	//	virtual void			DrawText( text:string, const idVec3 &origin, float scale, const idVec4 &color, const idMat3 &viewAxis, const int align = 1, const int lifetime = 0, bool depthTest = false );
	//
	//-----------------------

	mapName = new idStr; // ie: maps/tim_dm2.proc, written to demoFile
	mapTimeStamp: number; // for fast reloads of the same level

	areaNodes: areaNode_t[];
	numAreaNodes: number /*int*/;

	portalAreas: portalArea_t[];
	numPortalAreas: number /*int*/;
	connectedAreaNum: number /*int*/; // incremented every time a door portal state changes

	areaScreenRect: idScreenRect[];

	doublePortals: doublePortal_t [];
	numInterAreaPortals: number /*int*/;

	localModels = new idList<idRenderModel>( idRenderModel, true );

	entityDefs = new idList<idRenderEntityLocal>( idRenderEntityLocal, true );
	lightDefs = new idList<idRenderLightLocal>( idRenderLightLocal, true );

	areaReferenceAllocator = idBlockAlloc_template<areaReference_t>( areaReference_t, 1024 );
	interactionAllocator = idBlockAlloc_template<idInteraction>( idInteraction, 256 );
	areaNumRefAllocator = idBlockAlloc_template<areaNumRef_t>( areaNumRef_t, 1024 );

	// all light / entity interactions are referenced here for fast lookup without
	// having to crawl the doubly linked lists.  EnntityDefs are sequential for better
	// cache access, because the table is accessed by light in idRenderWorldLocal::CreateLightDefInteractions()
	// Growing this table is time consuming, so we add a pad value to the number
	// of entityDefs and lightDefs
	interactionTable: idInteraction[];
	interactionTableWidth: number /*int*/; // entityDefs
	interactionTableHeight: number /*int*/; // lightDefs


	generateAllInteractionsCalled: boolean;

	//-----------------------
	// RenderWorld_load.cpp

	//ParseModel(src: idLexer): idRenderModel { throw "placeholder"; }
	//ParseShadowModel(src: idLexer): idRenderModel { throw "placeholder"; }
	//SetupAreaRefs(): void { throw "placeholder"; }
	//ParseInterAreaPortals(src: idLexer): void { throw "placeholder"; }
	//ParseNodes(src: idLexer): void { throw "placeholder"; }
	//CommonChildrenArea_r(node: areaNode_t): number { throw "placeholder"; }
	//FreeWorld(): void { throw "placeholder"; }
	//ClearWorld(): void { throw "placeholder"; }
	//FreeDefs(): void { throw "placeholder"; }
	//TouchWorldModels(): void { throw "placeholder"; }
	//AddWorldModelEntities(): void { throw "placeholder"; }
	//ClearPortalStates(): void { throw "placeholder"; }
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
	//FloodConnectedAreas(area: portalArea_t, /*int */portalAttributeIndex: number): void { throw "placeholder"; }
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
	//AddEntityRefToArea(def: idRenderEntityLocal, area: portalArea_t): void { throw "placeholder"; }
	//	void					AddLightRefToArea( idRenderLightLocal *light, portalArea_t *area );
	//
	//	void					RecurseProcBSP_r( modelTrace_t *results, int parentNodeNum, int nodeNum, float p1f, float p2f, const idVec3 &p1, const idVec3 &p2 ) const;
	//
	//	void					BoundsInAreas_r( int nodeNum, const idBounds &bounds, int *areas, int *numAreas, int maxAreas ) const;
	//
	//	float					DrawTextLength( text:string, float scale, int len = 0 );
	//
	//FreeInteractions(): void { throw "placeholder"; }
	//
	//	void					PushVolumeIntoTree_r( idRenderEntityLocal *def, idRenderLightLocal *light, const idSphere *sphere, int numPoints, const idVec3 (*points), int nodeNum );
	//
	//	void					PushVolumeIntoTree( idRenderEntityLocal *def, idRenderLightLocal *light, int numPoints, const idVec3 (*points) );
	//
	//	//-------------------------------
	//	// tr_light.c
	//	void					CreateLightDefInteractions( idRenderLightLocal *ldef );
/*
===================
idRenderWorldLocal::idRenderWorldLocal
===================
*/
	constructor ( ) {
		super ( );
		this.mapName.Clear ( );
		this.mapTimeStamp = FILE_NOT_FOUND_TIMESTAMP;

		this.generateAllInteractionsCalled = false;

		this.areaNodes = null;
		this.numAreaNodes = 0;

		this.portalAreas = null;
		this.numPortalAreas = 0;

		this.doublePortals = null;
		this.numInterAreaPortals = 0;

		this.interactionTable = null;
		this.interactionTableWidth = 0;
		this.interactionTableHeight = 0;
	}

///*
//===================
//idRenderWorldLocal::~idRenderWorldLocal
//===================
//*/
//idRenderWorldLocal::~idRenderWorldLocal() {
//	// free all the entityDefs, this.lightDefs, portals, etc
//	this.FreeWorld();
//
//	// free up the debug lines, polys, and text
//	RB_ClearDebugPolygons( 0 );
//	RB_ClearDebugLines( 0 );
//	RB_ClearDebugText( 0 );
//}
//
/*
===================
ResizeInteractionTable
===================
*/
	ResizeInteractionTable ( ): void {
		// we overflowed the interaction table, so dump it
		// we may want to resize this in the future if it turns out to be common
		common.Printf( "idRenderWorldLocal::ResizeInteractionTable: overflowed interactionTableWidth, dumping\n" );
		R_StaticFree( this.interactionTable );
		this.interactionTable = null;
	}

/*
===================
AddEntityDef
===================
*/
	AddEntityDef ( re: renderEntity_t ): number {
		// try and reuse a free spot
		var entityHandle = this.entityDefs.FindNull ( );
		if ( entityHandle == -1 ) {
			entityHandle = this.entityDefs.Append( null );
			if ( this.interactionTable && this.entityDefs.Num ( ) > this.interactionTableWidth ) {
				this.ResizeInteractionTable ( );
			}
		}

		this.UpdateEntityDef( entityHandle, re );

		return entityHandle;
	}

/*
==============
UpdateEntityDef

Does not write to the demo file, which will only be updated for
visible entities
==============
*/
static /*int */c_callbackUpdate:number;

	UpdateEntityDef( /*qhandle_t */entityHandle: number, re: renderEntity_t ):void {
	if ( r_skipUpdates.GetBool() ) {
		return;
	}

	tr.pc.c_entityUpdates++;

	if ( !re.hModel && !re.callback ) {
		common.Error( "idRenderWorld::UpdateEntityDef: NULL hModel" );
	}

	// create new slots if needed
	if ( entityHandle < 0 || entityHandle > LUDICROUS_INDEX ) {
		common.Error( "idRenderWorld::UpdateEntityDef: index = %i", entityHandle );
	}
	while ( entityHandle >= this.entityDefs.Num() ) {
		this.entityDefs.Append( null );
	}

	var	def = this.entityDefs[entityHandle];
	if ( def ) {

		if ( !re.forceUpdate ) {
			todoThrow ( );
			//// check for exact match (OPTIMIZE: check through pointers more)
			//if ( !re.joints && !re.callbackData && !def.dynamicModel && !memcmp( re, &def.parms, sizeof( *re ) ) ) {
			//	return;
			//}

			//// if the only thing that changed was shaderparms, we can just leave things as they are
			//// after updating parms

			//// if we have a callback function and the bounds, origin, axis and model match,
			//// then we can leave the references as they are
			//if ( re.callback ) {

			//	var axisMatch = ( re.axis == def.parms.axis );
			//	var originMatch = ( re.origin == def.parms.origin );
			//	var boundsMatch = ( re.bounds == def.referenceBounds );
			//	var modelMatch = ( re.hModel == def.parms.hModel );

			//	if ( boundsMatch && originMatch && axisMatch && modelMatch ) {
			//		// only clear the dynamic model and interaction surfaces if they exist
			//		c_callbackUpdate++;
			//		R_ClearEntityDefDynamicModel( def );
			//		def.parms = *re;
			//		return;
			//	}
			//}
		}

		// save any decals if the model is the same, allowing marks to move with entities
		if ( def.parms.hModel == re.hModel ) {
			R_FreeEntityDefDerivedData( def, true, true );
		} else {
			R_FreeEntityDefDerivedData( def, false, false );
		}
	} else {
		// creating a new one
		def = new idRenderEntityLocal;
		this.entityDefs[entityHandle] = def;

		def.world = this;
		def.index = entityHandle;
	}

	def.parms.opEquals( re );// = *re;

	R_AxisToModelMatrix( def.parms.axis, def.parms.origin, def.modelMatrix );

	def.lastModifiedFrameNum = tr.frameCount;
		if (session.writeDemo && def.archived) {
			todoThrow ( );
		//WriteFreeEntity( entityHandle );
		//def.archived = false;
	}

	// optionally immediately issue any callbacks
		if (!r_useEntityCallbacks.GetBool() && def.parms.callback) {
			todoThrow ( );
		//R_IssueEntityDefCallback( def );
	}

	// based on the model bounds, add references in each area
	// that may contain the updated surface
	R_CreateEntityRefs( def );
}

/*
===================
FreeEntityDef

Frees all references and lit surfaces from the model, and
NULL's out it's entry in the world list
===================
*/
	FreeEntityDef ( entityHandle: number /*qhandle_t*/ ): void {
		var def: idRenderEntityLocal;

		if ( entityHandle < 0 || entityHandle >= this.entityDefs.Num ( ) ) {
			common.Printf( "idRenderWorld::FreeEntityDef: handle %i > %i\n", entityHandle, this.entityDefs.Num ( ) );
			return;
		}

		def = this.entityDefs[entityHandle];
		if ( !def ) {
			common.Printf( "idRenderWorld::FreeEntityDef: handle %i is NULL\n", entityHandle );
			return;
		}

		R_FreeEntityDefDerivedData( def, false, false );

		if ( session.writeDemo && def.archived ) {
			todoThrow ( );
			//WriteFreeEntity( entityHandle );
		}

		// if we are playing a demo, these will have been freed
		// in R_FreeEntityDefDerivedData(), otherwise the gui
		// object still exists in the game

		def.parms.gui[0] = null;
		def.parms.gui[1] = null;
		def.parms.gui[2] = null;

		$delete( def );
		this.entityDefs[entityHandle] = null;
	}

/*
==================
GetRenderEntity
==================
*/
	GetRenderEntity ( /*qhandle_t*/ entityHandle: number ): renderEntity_t {
		var def: idRenderEntityLocal;

		if ( entityHandle < 0 || entityHandle >= this.entityDefs.Num ( ) ) {
			common.Printf( "idRenderWorld::GetRenderEntity: invalid handle %i [0, %i]\n", entityHandle, this.entityDefs.Num ( ) );
			return null;
		}

		def = this.entityDefs[entityHandle];
		if ( !def ) {
			common.Printf( "idRenderWorld::GetRenderEntity: handle %i is NULL\n", entityHandle );
			return null;
		}

		return def.parms;
	}

/*
==================
AddLightDef
==================
*/
	AddLightDef ( rlight: renderLight_t ): number {
		// try and reuse a free spot
		var /*int */lightHandle = this.lightDefs.FindNull ( );

		if ( lightHandle == -1 ) {
			lightHandle = this.lightDefs.Append( null );
			if ( this.interactionTable && this.lightDefs.Num ( ) > this.interactionTableHeight ) {
				this.ResizeInteractionTable ( );
			}
		}
		this.UpdateLightDef( lightHandle, rlight );

		return lightHandle;
	}

/*
=================
UpdateLightDef

The generation of all the derived interaction data will
usually be deferred until it is visible in a scene

Does not write to the demo file, which will only be done for visible lights
=================
*/
	UpdateLightDef ( lightHandle: number /*qhandle_t*/, rlight: renderLight_t ): void {
		if ( r_skipUpdates.GetBool ( ) ) {
			return;
		}

		tr.pc.c_lightUpdates++;

		// create new slots if needed
		if ( lightHandle < 0 || lightHandle > LUDICROUS_INDEX ) {
			common.Error( "idRenderWorld::UpdateLightDef: index = %i", lightHandle );
		}
		while ( lightHandle >= this.lightDefs.Num ( ) ) {
			this.lightDefs.Append( null );
		}

		var justUpdate = false;
		var light: idRenderLightLocal = this.lightDefs[lightHandle];
		if ( light ) {
			// if the shape of the light stays the same, we don't need to dump
			// any of our derived data, because shader parms are calculated every frame
			if ( rlight.axis == light.parms.axis && rlight.end == light.parms.end &&
				rlight.lightCenter == light.parms.lightCenter && rlight.lightRadius == light.parms.lightRadius &&
				rlight.noShadows == light.parms.noShadows && rlight.origin == light.parms.origin &&
				rlight.parallel == light.parms.parallel && rlight.pointLight == light.parms.pointLight &&
				rlight.right == light.parms.right && rlight.start == light.parms.start &&
				rlight.target == light.parms.target && rlight.up == light.parms.up &&
				rlight.shader == light.lightShader && rlight.prelightModel == light.parms.prelightModel ) {
				justUpdate = true;
			} else {
				// if we are updating shadows, the prelight model is no longer valid
				light.lightHasMoved = true;
				todoThrow();
				//R_FreeLightDefDerivedData( light );
			}
		} else {
			// create a new one
			light = new idRenderLightLocal;
			this.lightDefs[lightHandle] = light;

			light.world = this;
			light.index = lightHandle;
		}

		light.parms.opEquals( rlight );
		light.lastModifiedFrameNum = tr.frameCount;
		if ( session.writeDemo && light.archived ) {
			todoThrow();
			//WriteFreeLight( lightHandle );
			//light.archived = false;
		}

		if ( light.lightHasMoved ) {
			light.parms.prelightModel = null;
		}

		if (!justUpdate) {
			todoThrow ( );
			//R_DeriveLightData( light );
			//R_CreateLightRefs( light );
			//R_CreateLightDefFogPortals( light );
		}
	}

/*
====================
FreeLightDef

Frees all references and lit surfaces from the light, and
NULL's out it's entry in the world list
====================
*/
	FreeLightDef ( lightHandle: /*qhandle_t*/number ) {
		todoThrow ( );
		//idRenderLightLocal	*light;

		//if ( lightHandle < 0 || lightHandle >= this.lightDefs.Num() ) {
		//	common.Printf( "idRenderWorld::FreeLightDef: invalid handle %i [0, %i]\n", lightHandle, this.lightDefs.Num() );
		//	return;
		//}

		//light = this.lightDefs[lightHandle];
		//if ( !light ) {
		//	common.Printf( "idRenderWorld::FreeLightDef: handle %i is NULL\n", lightHandle );
		//	return;
		//}

		//R_FreeLightDefDerivedData( light );

		//if ( session.writeDemo && light.archived ) {
		//	WriteFreeLight( lightHandle );
		//}

		//delete light;
		//this.lightDefs[lightHandle] = NULL;
	}
//
///*
//==================
//GetRenderLight
//==================
//*/
//const renderLight_t *idRenderWorldLocal::GetRenderLight( lightHandle:number/*qhandle_t*/ ) const {
//	idRenderLightLocal *def;
//
//	if ( lightHandle < 0 || lightHandle >= this.lightDefs.Num() ) {
//		common.Printf( "idRenderWorld::GetRenderLight: handle %i > %i\n", lightHandle, this.lightDefs.Num() );
//		return NULL;
//	}
//
//	def = this.lightDefs[lightHandle];
//	if ( !def ) {
//		common.Printf( "idRenderWorld::GetRenderLight: handle %i is NULL\n", lightHandle );
//		return NULL;
//	}
//
//	return &def.parms;
//}
//
///*
//================
//idRenderWorldLocal::ProjectDecalOntoWorld
//================
//*/
//void idRenderWorldLocal::ProjectDecalOntoWorld( const idFixedWinding &winding, const idVec3 &projectionOrigin, const bool parallel, const float fadeDepth, const idMaterial *material, const int startTime ) {
//	int i, areas[10], numAreas;
//	const areaReference_t *ref;
//	const portalArea_t *area;
//	const idRenderModel *model;
//	idRenderEntityLocal *def;
//	decalProjectionInfo_t info, localInfo;
//
//	if ( !idRenderModelDecal::CreateProjectionInfo( info, winding, projectionOrigin, parallel, fadeDepth, material, startTime ) ) {
//		return;
//	}
//
//	// get the world areas touched by the projection volume
//	numAreas = BoundsInAreas( info.projectionBounds, areas, 10 );
//
//	// check all areas for models
//	for ( i = 0; i < numAreas; i++ ) {
//
//		area = &this.portalAreas[ areas[i] ];
//
//		// check all models in this area
//		for ( ref = area.entityRefs.areaNext; ref != &area.entityRefs; ref = ref.areaNext ) {
//			def = ref.entity;
//
//			// completely ignore any dynamic or callback models
//			model = def.parms.hModel;
//			if ( model == NULL || model.IsDynamicModel() != DM_STATIC || def.parms.callback ) {
//				continue;
//			}
//
//			if ( def.parms.customShader != NULL && !def.parms.customShader.AllowOverlays() ) {
//				continue;
//			}
//
//			idBounds bounds;
//			bounds.FromTransformedBounds( model.Bounds( &def.parms ), def.parms.origin, def.parms.axis );
//
//			// if the model bounds do not overlap with the projection bounds
//			if ( !info.projectionBounds.IntersectsBounds( bounds ) ) {
//				continue;
//			}
//
//			// transform the bounding planes, fade planes and texture axis into local space
//			idRenderModelDecal::GlobalProjectionInfoToLocal( localInfo, info, def.parms.origin, def.parms.axis );
//			localInfo.force = ( def.parms.customShader != NULL );
//
//			if ( !def.decals ) {
//				def.decals = idRenderModelDecal::Alloc();
//			}
//			def.decals.CreateDecal( model, localInfo );
//		}
//	}
//}
//
///*
//====================
//idRenderWorldLocal::ProjectDecal
//====================
//*/
//void idRenderWorldLocal::ProjectDecal( qhandle_t entityHandle, const idFixedWinding &winding, const idVec3 &projectionOrigin, const bool parallel, const float fadeDepth, const idMaterial *material, const int startTime ) {
//	decalProjectionInfo_t info, localInfo;
//
//	if ( entityHandle < 0 || entityHandle >= this.entityDefs.Num() ) {
//		common.Error( "idRenderWorld::ProjectOverlay: index = %i", entityHandle );
//		return;
//	}
//
//	idRenderEntityLocal	*def = this.entityDefs[ entityHandle ];
//	if ( !def ) {
//		return;
//	}
//
//	const idRenderModel *model = def.parms.hModel;
//
//	if ( model == NULL || model.IsDynamicModel() != DM_STATIC || def.parms.callback ) {
//		return;
//	}
//
//	if ( !idRenderModelDecal::CreateProjectionInfo( info, winding, projectionOrigin, parallel, fadeDepth, material, startTime ) ) {
//		return;
//	}
//
//	idBounds bounds;
//	bounds.FromTransformedBounds( model.Bounds( &def.parms ), def.parms.origin, def.parms.axis );
//
//	// if the model bounds do not overlap with the projection bounds
//	if ( !info.projectionBounds.IntersectsBounds( bounds ) ) {
//		return;
//	}
//
//	// transform the bounding planes, fade planes and texture axis into local space
//	idRenderModelDecal::GlobalProjectionInfoToLocal( localInfo, info, def.parms.origin, def.parms.axis );
//	localInfo.force = ( def.parms.customShader != NULL );
//
//	if ( def.decals == NULL ) {
//		def.decals = idRenderModelDecal::Alloc();
//	}
//	def.decals.CreateDecal( model, localInfo );
//}
//
///*
//====================
//idRenderWorldLocal::ProjectOverlay
//====================
//*/
//void idRenderWorldLocal::ProjectOverlay( qhandle_t entityHandle, const idPlane localTextureAxis[2], const idMaterial *material ) {
//
//	if ( entityHandle < 0 || entityHandle >= this.entityDefs.Num() ) {
//		common.Error( "idRenderWorld::ProjectOverlay: index = %i", entityHandle );
//		return;
//	}
//
//	idRenderEntityLocal	*def = this.entityDefs[ entityHandle ];
//	if ( !def ) {
//		return;
//	}
//
//	const renderEntity_t *refEnt = &def.parms;
//
//	idRenderModel *model = refEnt.hModel;
//	if ( model.IsDynamicModel() != DM_CACHED ) {	// FIXME: probably should be MD5 only
//		return;
//	}
//	model = R_EntityDefDynamicModel( def );
//
//	if ( def.overlay == NULL ) {
//		def.overlay = idRenderModelOverlay::Alloc();
//	}
//	def.overlay.CreateOverlay( model, localTextureAxis, material );
//}
//
/*
====================
idRenderWorldLocal::RemoveDecals
====================
*/
	RemoveDecals ( /*qhandle_t*/ entityHandle: number ): void {
		if ( entityHandle < 0 || entityHandle >= this.entityDefs.Num ( ) ) {
			common.Error( "idRenderWorld::ProjectOverlay: index = %i", entityHandle );
			return;
		}

		var def: idRenderEntityLocal = this.entityDefs[entityHandle];
		if ( !def ) {
			return;
		}
		todoThrow ( );
		//R_FreeEntityDefDecals( def );
		//R_FreeEntityDefOverlay( def );
	}
//
///*
//====================
//SetRenderView
//
//Sets the current view so any calls to the render world will use the correct parms.
//====================
//*/
//void idRenderWorldLocal::SetRenderView( const renderView_t *renderView ) {
//	tr.primaryRenderView = *renderView;
//}
//
///*
//====================
//RenderScene
//
//Draw a 3D view into a part of the window, then return
//to 2D drawing.
//
//Rendering a scene may require multiple views to be rendered
//to handle mirrors,
//====================
//*/
//void idRenderWorldLocal::RenderScene( const renderView_t *renderView ) {
//#ifndef	ID_DEDICATED
//	renderView_t	copy;
//
//	if ( !glConfig.isInitialized ) {
//		return;
//	}
//
//	copy = *renderView;
//
//	// skip front end rendering work, which will result
//	// in only gui drawing
//	if ( r_skipFrontEnd.GetBool() ) {
//		return;
//	}
//
//	if ( renderView.fov_x <= 0 || renderView.fov_y <= 0 ) {
//		common.Error( "idRenderWorld::RenderScene: bad FOVs: %f, %f", renderView.fov_x, renderView.fov_y );
//	}
//
//	// close any gui drawing
//	tr.guiModel.EmitFullScreen();
//	tr.guiModel.Clear();
//
//	int startTime = Sys_Milliseconds();
//
//	// setup view parms for the initial view
//	//
//	viewDef_t		*parms = (viewDef_t *)R_ClearedFrameAlloc( sizeof( *parms ) );
//	parms.renderView = *renderView;
//
//	if ( tr.takingScreenshot ) {
//		parms.renderView.forceUpdate = true;
//	}
//
//	// set up viewport, adjusted for resolution and OpenGL style 0 at the bottom
//	tr.RenderViewToViewport( &parms.renderView, &parms.viewport );
//
//	// the scissor bounds may be shrunk in subviews even if
//	// the viewport stays the same
//	// this scissor range is local inside the viewport
//	parms.scissor.x1 = 0;
//	parms.scissor.y1 = 0;
//	parms.scissor.x2 = parms.viewport.x2 - parms.viewport.x1;
//	parms.scissor.y2 = parms.viewport.y2 - parms.viewport.y1;
//
//
//	parms.isSubview = false;
//	parms.initialViewAreaOrigin = renderView.vieworg;
//	parms.floatTime = parms.renderView.time * 0.001f;
//	parms.renderWorld = this;
//
//	// use this time for any subsequent 2D rendering, so damage blobs/etc 
//	// can use level time
//	tr.frameShaderTime = parms.floatTime;
//
//	// see if the view needs to reverse the culling sense in mirrors
//	// or environment cube sides
//	idVec3	cross;
//	cross = parms.renderView.viewaxis[1].Cross( parms.renderView.viewaxis[2] );
//	if ( cross * parms.renderView.viewaxis[0] > 0 ) {
//		parms.isMirror = false;
//	} else {
//		parms.isMirror = true;
//	}
//
//	if ( r_lockSurfaces.GetBool() ) {
//		R_LockSurfaceScene( parms );
//		return;
//	}
//
//	// save this world for use by some console commands
//	tr.primaryWorld = this;
//	tr.primaryRenderView = *renderView;
//	tr.primaryView = parms;
//
//	// rendering this view may cause other views to be rendered
//	// for mirrors / portals / shadows / environment maps
//	// this will also cause any necessary entities and lights to be
//	// updated to the demo file
//	R_RenderView( parms );
//
//	// now write delete commands for any modified-but-not-visible entities, and
//	// add the renderView command to the demo
//	if ( session.writeDemo ) {
//		WriteRenderView( renderView );
//	}
//
//#if 0
//	for ( int i = 0 ; i < this.entityDefs.Num() ; i++ ) {
//		idRenderEntityLocal	*def = this.entityDefs[i];
//		if ( !def ) {
//			continue;
//		}
//		if ( def.parms.callback ) {
//			continue;
//		}
//		if ( def.parms.hModel.IsDynamicModel() == DM_CONTINUOUS ) {
//		}
//	}
//#endif
//
//	int endTime = Sys_Milliseconds();
//
//	tr.pc.frontEndMsec += endTime - startTime;
//
//	// prepare for any 2D drawing after this
//	tr.guiModel.Clear();
//#endif
//}
//
/*
===================
NumAreas
===================
*/
	NumAreas  ( ): number /*int*/ {
		return this.numPortalAreas;
	}

/*
===================
NumPortalsInArea
===================
*/
	NumPortalsInArea ( /*int */areaNum: number ): number {
		var area: portalArea_t;
		var /*int				*/count: number;
		var portal: portal_t;

		if ( areaNum >= this.numPortalAreas || areaNum < 0 ) {
			common.Error( "idRenderWorld::NumPortalsInArea: bad areanum %i", areaNum );
		}
		area = this.portalAreas[areaNum];

		count = 0;
		for ( portal = area.portals; portal; portal = portal.next ) {
			count++;
		}
		return count;
	}

/*
===================
GetPortal
===================
*/
	GetPortal ( /*int */areaNum: number, /*int */portalNum: number ): exitPortal_t {
		var area: portalArea_t;
		var count: number /*int*/;
		var portal: portal_t;
		var ret = new exitPortal_t;

		if ( areaNum > this.numPortalAreas ) {
			common.Error( "idRenderWorld::GetPortal: areaNum > numAreas" );
		}
		area = this.portalAreas[areaNum];

		count = 0;
		for ( portal = area.portals; portal; portal = portal.next ) {
			if ( count == portalNum ) {
				ret.areas[0] = areaNum;
				ret.areas[1] = portal.intoArea;
				ret.w = portal.w;
				ret.blockingBits = portal.doublePortal.blockingBits;
				ret.portalHandle = this.doublePortals.indexOf( portal.doublePortal ) + 1;
				return ret;
			}
			count++;
		}

		common.Error( "idRenderWorld::GetPortal: portalNum > numPortals" );

		ret.memset0 ( );
		return ret;
	}

/*
===============
PointInAreaNum

Will return -1 if the point is not in an area, otherwise
it will return 0 <= value < tr.world.numPortalAreas
===============
*/
	PointInArea ( point: idVec3 ): number /*int*/ {
		var node: areaNode_t;
		var nodeNum: number /*int*/;
		var d: number /*float*/;

		node = this.areaNodes[0];
		if ( !node ) {
			return -1;
		}
		while (1) {
			todoThrow ( );
			d = point.timesVec( node.plane.Normal ( ) ) + node.plane[3];
			if ( d > 0 ) {
				nodeNum = node.children[0];
			} else {
				nodeNum = node.children[1];
			}
			if ( nodeNum == 0 ) {
				return -1; // in solid
			}
			if ( nodeNum < 0 ) {
				nodeNum = -1 - nodeNum;
				if ( nodeNum >= this.numPortalAreas ) {
					common.Error( "idRenderWorld::PointInArea: area out of range" );
				}
				return nodeNum;
			}
			node = this.areaNodes[nodeNum];
		}

		return -1;
	}
//
///*
//===================
//BoundsInAreas_r
//===================
//*/
//void idRenderWorldLocal::BoundsInAreas_r( int nodeNum, const idBounds &bounds, int *areas, int *numAreas, int maxAreas ) const {
//	int side, i;
//	areaNode_t *node;
//
//	do {
//		if ( nodeNum < 0 ) {
//			nodeNum = -1 - nodeNum;
//
//			for ( i = 0; i < (*numAreas); i++ ) {
//				if ( areas[i] == nodeNum ) {
//					break;
//				}
//			}
//			if ( i >= (*numAreas) && (*numAreas) < maxAreas ) {
//				areas[(*numAreas)++] = nodeNum;
//			}
//			return;
//		}
//
//		node = this.areaNodes + nodeNum;
//
//		side = bounds.PlaneSide( node.plane );
//		if ( side == PLANESIDE_FRONT ) {
//			nodeNum = node.children[0];
//		}
//		else if ( side == PLANESIDE_BACK ) {
//			nodeNum = node.children[1];
//		}
//		else {
//			if ( node.children[1] != 0 ) {
//				BoundsInAreas_r( node.children[1], bounds, areas, numAreas, maxAreas );
//				if ( (*numAreas) >= maxAreas ) {
//					return;
//				}
//			}
//			nodeNum = node.children[0];
//		}
//	} while( nodeNum != 0 );
//
//	return;
//}
//
///*
//===================
//BoundsInAreas
//
//  fills the *areas array with the number of the areas the bounds are in
//  returns the total number of areas the bounds are in
//===================
//*/
//int idRenderWorldLocal::BoundsInAreas( const idBounds &bounds, int *areas, int maxAreas ) const {
//	int numAreas = 0;
//
//	assert( areas );
//	assert( bounds[0][0] <= bounds[1][0] && bounds[0][1] <= bounds[1][1] && bounds[0][2] <= bounds[1][2] );
//	assert( bounds[1][0] - bounds[0][0] < 1e4f && bounds[1][1] - bounds[0][1] < 1e4f && bounds[1][2] - bounds[0][2] < 1e4f );
//
//	if ( !this.areaNodes ) {
//		return numAreas;
//	}
//	BoundsInAreas_r( 0, bounds, areas, &numAreas, maxAreas );
//	return numAreas;
//}
//
///*
//================
//GuiTrace
//
//checks a ray trace against any gui surfaces in an entity, returning the
//fraction location of the trace on the gui surface, or -1,-1 if no hit.
//this doesn't do any occlusion testing, simply ignoring non-gui surfaces.
//start / end are in global world coordinates.
//================
//*/
//guiPoint_t	idRenderWorldLocal::GuiTrace( qhandle_t entityHandle, const idVec3 start, const idVec3 end ) const {
//	localTrace_t	local;
//	idVec3			localStart, localEnd, bestPoint;
//	int				j;
//	idRenderModel	*model;
//	srfTriangles_t	*tri;
//	const idMaterial *shader;
//	guiPoint_t	pt;
//
//	pt.x = pt.y = -1;
//	pt.guiId = 0;
//
//	if ( ( entityHandle < 0 ) || ( entityHandle >= this.entityDefs.Num() ) ) {
//		common.Printf( "idRenderWorld::GuiTrace: invalid handle %i\n", entityHandle );
//		return pt;
//	}
//
//	idRenderEntityLocal *def = this.entityDefs[entityHandle];	
//	if ( !def ) {
//		common.Printf( "idRenderWorld::GuiTrace: handle %i is NULL\n", entityHandle );
//		return pt;
//	}
//
//	model = def.parms.hModel;
//	if ( def.parms.callback || !def.parms.hModel || def.parms.hModel.IsDynamicModel() != DM_STATIC ) {
//		return pt;
//	}
//
//	// transform the points into local space
//	R_GlobalPointToLocal( def.modelMatrix, start, localStart );
//	R_GlobalPointToLocal( def.modelMatrix, end, localEnd );
//
//
//	float best = 99999.0;
//	const modelSurface_t *bestSurf = NULL;
//
//	for ( j = 0 ; j < model.NumSurfaces() ; j++ ) {
//		const modelSurface_t *surf = model.Surface( j );
//
//		tri = surf.geometry;
//		if ( !tri ) {
//			continue;
//		}
//
//		shader = R_RemapShaderBySkin( surf.shader, def.parms.customSkin, def.parms.customShader );
//		if ( !shader ) {
//			continue;
//		}
//		// only trace against gui surfaces
//		if (!shader.HasGui()) {
//			continue;
//		}
//
//		local = R_LocalTrace( localStart, localEnd, 0.0, tri );
//		if ( local.fraction < 1.0 ) {
//			idVec3				origin, axis[3];
//			idVec3				cursor;
//			float				axisLen[2];
//
//			R_SurfaceToTextureAxis( tri, origin, axis );
//			cursor = local.point - origin;
//
//			axisLen[0] = axis[0].Length();
//			axisLen[1] = axis[1].Length();
//
//			pt.x = ( cursor * axis[0] ) / ( axisLen[0] * axisLen[0] );
//			pt.y = ( cursor * axis[1] ) / ( axisLen[1] * axisLen[1] );
//			pt.guiId = shader.GetEntityGui();
//
//			return pt;
//		}
//	}
//
//	return pt;
//}
//
///*
//===================
//idRenderWorldLocal::ModelTrace
//===================
//*/
//bool idRenderWorldLocal::ModelTrace( modelTrace_t &trace, qhandle_t entityHandle, start:idVec3, end:idVec3, const float radius ) const {
//	var/*int*/i:number;
//	bool collisionSurface;
//	const modelSurface_t *surf;
//	localTrace_t localTrace;
//	idRenderModel *model;
//	float modelMatrix[16];
//	idVec3 localStart, localEnd;
//	const idMaterial *shader;
//
//	trace.fraction = 1.0f;
//
//	if ( entityHandle < 0 || entityHandle >= this.entityDefs.Num() ) {
////		common.Error( "idRenderWorld::ModelTrace: index = %i", entityHandle );
//		return false;
//	}
//
//	idRenderEntityLocal	*def = this.entityDefs[entityHandle];
//	if ( !def ) {
//		return false;
//	}
//
//	renderEntity_t *refEnt = &def.parms;
//
//	model = R_EntityDefDynamicModel( def );
//	if ( !model ) {
//		return false;
//	}
//
//	// transform the points into local space
//	R_AxisToModelMatrix( refEnt.axis, refEnt.origin, modelMatrix );
//	R_GlobalPointToLocal( modelMatrix, start, localStart );
//	R_GlobalPointToLocal( modelMatrix, end, localEnd );
//
//	// if we have explicit collision surfaces, only collide against them
//	// (FIXME, should probably have a parm to control this)
//	collisionSurface = false;
//	for ( i = 0; i < model.NumBaseSurfaces(); i++ ) {
//		surf = model.Surface( i );
//
//		shader = R_RemapShaderBySkin( surf.shader, def.parms.customSkin, def.parms.customShader );
//
//		if ( shader.GetSurfaceFlags() & SURF_COLLISION ) {
//			collisionSurface = true;
//			break;
//		}
//	}
//
//	// only use baseSurfaces, not any overlays
//	for ( i = 0; i < model.NumBaseSurfaces(); i++ ) {
//		surf = model.Surface( i );
//
//		shader = R_RemapShaderBySkin( surf.shader, def.parms.customSkin, def.parms.customShader );
//
//		if ( !surf.geometry || !shader ) {
//			continue;
//		}
//
//		if ( collisionSurface ) {
//			// only trace vs collision surfaces
//			if ( !( shader.GetSurfaceFlags() & SURF_COLLISION ) ) {
//				continue;
//			}
//		} else {
//			// skip if not drawn or translucent
//			if ( !shader.IsDrawn() || ( shader.Coverage() != MC_OPAQUE && shader.Coverage() != MC_PERFORATED ) ) {
//				continue;
//			}
//		}
//
//		localTrace = R_LocalTrace( localStart, localEnd, radius, surf.geometry );
//
//		if ( localTrace.fraction < trace.fraction ) {
//			trace.fraction = localTrace.fraction;
//			R_LocalPointToGlobal( modelMatrix, localTrace.point, trace.point );
//			trace.normal = localTrace.normal * refEnt.axis;
//			trace.material = shader;
//			trace.entity = &def.parms;
//			trace.jointNumber = refEnt.hModel.NearestJoint( i, localTrace.indexes[0], localTrace.indexes[1], localTrace.indexes[2] );
//		}
//	}
//
//	return ( trace.fraction < 1.0f );
//}
//
///*
//===================
//idRenderWorldLocal::Trace
//===================
//*/
//// FIXME: _D3XP added those.
//const char* playerModelExcludeList[] = {
//	"models/md5/characters/player/d3xp_spplayer.md5mesh",
//	"models/md5/characters/player/head/d3xp_head.md5mesh",
//	"models/md5/weapons/pistol_world/worldpistol.md5mesh",
//	NULL
//};
//
//const char* playerMaterialExcludeList[] = {
//	"muzzlesmokepuff",
//	NULL
//};
//
//bool idRenderWorldLocal::Trace( modelTrace_t &trace, start:idVec3, end:idVec3, const float radius, bool skipDynamic, bool skipPlayer /*_D3XP*/ ) const {
//	areaReference_t * ref;
//	idRenderEntityLocal *def;
//	portalArea_t * area;
//	idRenderModel * model;
//	srfTriangles_t * tri;
//	localTrace_t localTrace;
//	int areas[128], numAreas, i, j, numSurfaces;
//	idBounds traceBounds, bounds;
//	float modelMatrix[16];
//	idVec3 localStart, localEnd;
//	const idMaterial *shader;
//
//	trace.fraction = 1.0f;
//	trace.point = end;
//
//	// bounds for the whole trace
//	traceBounds.Clear();
//	traceBounds.AddPoint( start );
//	traceBounds.AddPoint( end );
//
//	// get the world areas the trace is in
//	numAreas = BoundsInAreas( traceBounds, areas, 128 );
//
//	numSurfaces = 0;
//
//	// check all areas for models
//	for ( i = 0; i < numAreas; i++ ) {
//
//		area = &this.portalAreas[ areas[i] ];
//
//		// check all models in this area
//		for ( ref = area.entityRefs.areaNext; ref != &area.entityRefs; ref = ref.areaNext ) {
//			def = ref.entity;
//
//			model = def.parms.hModel;
//			if ( !model ) {
//				continue;
//			}
//
//			if ( model.IsDynamicModel() != DM_STATIC ) {
//				if ( skipDynamic ) {
//					continue;
//				}
//
//#if 1	/* _D3XP addition. could use a cleaner approach */
//				if ( skipPlayer ) {
//					idStr name = model.Name();
//					const char *exclude;
//					int k;
//
//					for ( k = 0; playerModelExcludeList[k]; k++ ) {
//						exclude = playerModelExcludeList[k];
//						if ( name == exclude ) {
//							break;
//						}
//					}
//
//					if ( playerModelExcludeList[k] ) {
//						continue;
//					}
//				}
//#endif
//
//				model = R_EntityDefDynamicModel( def );
//				if ( !model ) {
//					continue;	// can happen with particle systems, which don't instantiate without a valid view
//				}
//			}
//
//			bounds.FromTransformedBounds( model.Bounds( &def.parms ), def.parms.origin, def.parms.axis );
//
//			// if the model bounds do not overlap with the trace bounds
//			if ( !traceBounds.IntersectsBounds( bounds ) || !bounds.LineIntersection( start, trace.point ) ) {
//				continue;
//			}
//
//			// check all model surfaces
//			for ( j = 0; j < model.NumSurfaces(); j++ ) {
//				const modelSurface_t *surf = model.Surface( j );
//
//				shader = R_RemapShaderBySkin( surf.shader, def.parms.customSkin, def.parms.customShader );
//
//				// if no geometry or no shader
//				if ( !surf.geometry || !shader ) {
//					continue;
//				}
//
//#if 1 /* _D3XP addition. could use a cleaner approach */
//				if ( skipPlayer ) {
//					idStr name = shader.GetName();
//					const char *exclude;
//					int k;
//
//					for ( k = 0; playerMaterialExcludeList[k]; k++ ) {
//						exclude = playerMaterialExcludeList[k];
//						if ( name == exclude ) {
//							break;
//						}
//					}
//
//					if ( playerMaterialExcludeList[k] ) {
//						continue;
//					}
//				}
//#endif
//
//				tri = surf.geometry;
//
//				bounds.FromTransformedBounds( tri.bounds, def.parms.origin, def.parms.axis );
//
//				// if triangle bounds do not overlap with the trace bounds
//				if ( !traceBounds.IntersectsBounds( bounds ) || !bounds.LineIntersection( start, trace.point ) ) {
//					continue;
//				}
//
//				numSurfaces++;
//
//				// transform the points into local space
//				R_AxisToModelMatrix( def.parms.axis, def.parms.origin, modelMatrix );
//				R_GlobalPointToLocal( modelMatrix, start, localStart );
//				R_GlobalPointToLocal( modelMatrix, end, localEnd );
//
//				localTrace = R_LocalTrace( localStart, localEnd, radius, surf.geometry );
//
//				if ( localTrace.fraction < trace.fraction ) {
//					trace.fraction = localTrace.fraction;
//					R_LocalPointToGlobal( modelMatrix, localTrace.point, trace.point );
//					trace.normal = localTrace.normal * def.parms.axis;
//					trace.material = shader;
//					trace.entity = &def.parms;
//					trace.jointNumber = model.NearestJoint( j, localTrace.indexes[0], localTrace.indexes[1], localTrace.indexes[2] );
//
//					traceBounds.Clear();
//					traceBounds.AddPoint( start );
//					traceBounds.AddPoint( start + trace.fraction * (end - start) );
//				}
//			}
//		}
//	}
//	return ( trace.fraction < 1.0f );
//}
//
///*
//==================
//idRenderWorldLocal::RecurseProcBSP
//==================
//*/
//void idRenderWorldLocal::RecurseProcBSP_r( modelTrace_t *results, int parentNodeNum, int nodeNum, float p1f, float p2f, const idVec3 &p1, const idVec3 &p2 ) const {
//	float		t1, t2;
//	float		frac;
//	idVec3		mid;
//	int			side;
//	float		midf;
//	areaNode_t *node;
//
//	if ( results.fraction <= p1f) {
//		return;		// already hit something nearer
//	}
//	// empty leaf
//	if ( nodeNum < 0 ) {
//		return;
//	}
//	// if solid leaf node
//	if ( nodeNum == 0 ) {
//		if ( parentNodeNum != -1 ) {
//
//			results.fraction = p1f;
//			results.point = p1;
//			node = &this.areaNodes[parentNodeNum];
//			results.normal = node.plane.Normal();
//			return;
//		}
//	}
//	node = &this.areaNodes[nodeNum];
//
//	// distance from plane for trace start and end
//	t1 = node.plane.Normal() * p1 + node.plane[3];
//	t2 = node.plane.Normal() * p2 + node.plane[3];
//
//	if ( t1 >= 0.0 && t2 >= 0.0 ) {
//		RecurseProcBSP_r( results, nodeNum, node.children[0], p1f, p2f, p1, p2 );
//		return;
//	}
//	if ( t1 < 0.0 && t2 < 0.0 ) {
//		RecurseProcBSP_r( results, nodeNum, node.children[1], p1f, p2f, p1, p2 );
//		return;
//	}
//	side = t1 < t2;
//	frac = t1 / (t1 - t2);
//	midf = p1f + frac*(p2f - p1f);
//	mid[0] = p1[0] + frac*(p2[0] - p1[0]);
//	mid[1] = p1[1] + frac*(p2[1] - p1[1]);
//	mid[2] = p1[2] + frac*(p2[2] - p1[2]);
//	RecurseProcBSP_r( results, nodeNum, node.children[side], p1f, midf, p1, mid );
//	RecurseProcBSP_r( results, nodeNum, node.children[side^1], midf, p2f, mid, p2 );
//}
//
///*
//==================
//idRenderWorldLocal::FastWorldTrace
//==================
//*/
//bool idRenderWorldLocal::FastWorldTrace( modelTrace_t &results, start:idVec3, end:idVec3 ) const {
//	memset( &results, 0, sizeof( modelTrace_t ) );
//	results.fraction = 1.0f;
//	if ( this.areaNodes != NULL ) {
//		RecurseProcBSP_r( &results, -1, 0, 0.0, 1.0f, start, end );
//		return ( results.fraction < 1.0f );
//	}
//	return false;
//}

/*
=================================================================================

CREATE MODEL REFS

=================================================================================
*/

/*
=================
AddEntityRefToArea

This is called by R_PushVolumeIntoTree and also directly
for the world model references that are precalculated.
=================
*/
	AddEntityRefToArea ( def: idRenderEntityLocal, area: portalArea_t ): void {
		var ref: areaReference_t;

		if ( !def ) {
			common.Error( "idRenderWorldLocal::AddEntityRefToArea: NULL def" );
		}

		ref = this.areaReferenceAllocator.Alloc ( );

		tr.pc.c_entityReferences++;

		ref.entity = def;

		// link to entityDef
		ref.ownerNext = def.entityRefs;
		def.entityRefs = ref;

		// link to end of area list
		ref.area = area;
		ref.areaNext = area.entityRefs;
		ref.areaPrev = area.entityRefs.areaPrev;
		ref.areaNext.areaPrev = ref;
		ref.areaPrev.areaNext = ref;
	}

/*
===================
AddLightRefToArea

===================
*/
	AddLightRefToArea ( light: idRenderLightLocal, area: portalArea_t ): void {
		var lref: areaReference_t;

		// add a lightref to this area
		lref = this.areaReferenceAllocator.Alloc ( );
		lref.light = light;
		lref.area = area;	
		lref.ownerNext = light.references;
		light.references = lref;
		tr.pc.c_lightReferences++;

		// doubly linked list so we can free them easily later
		area.lightRefs.areaNext.areaPrev = lref;
		lref.areaNext = area.lightRefs.areaNext;
		lref.areaPrev = area.lightRefs;
		area.lightRefs.areaNext = lref;
	}

///*
//===================
//GenerateAllInteractions
//
//Force the generation of all light / surface interactions at the start of a level
//If this isn't called, they will all be dynamically generated
//
//This really isn't all that helpful anymore, because the calculation of shadows
//and light interactions is deferred from idRenderWorldLocal::CreateLightDefInteractions(), but we
//use it as an oportunity to size the interactionTable
//===================
//*/
//void idRenderWorldLocal::GenerateAllInteractions() {
//	if ( !glConfig.isInitialized ) {
//		return;
//	}
//
//	int start = Sys_Milliseconds();
//
//	this.generateAllInteractionsCalled = false;
//
//	// watch how much memory we allocate
//	tr.staticAllocCount = 0;
//
//	// let idRenderWorldLocal::CreateLightDefInteractions() know that it shouldn't
//	// try and do any view specific optimizations
//	tr.viewDef = NULL;
//
//	for ( int i = 0 ; i < this.lightDefs.Num() ; i++ ) {
//		idRenderLightLocal	*ldef = this.lightDefs[i];
//		if ( !ldef ) {
//			continue;
//		}
//		this.CreateLightDefInteractions( ldef );
//	}
//
//	int end = Sys_Milliseconds();
//	int	msec = end - start;
//
//	common.Printf( "idRenderWorld::GenerateAllInteractions, msec = %i, staticAllocCount = %i.\n", msec, tr.staticAllocCount );
//
//
//	// build the interaction table
//	if ( r_useInteractionTable.GetBool() ) {
//		this.interactionTableWidth = this.entityDefs.Num() + 100;
//		this.interactionTableHeight = lightDefs.Num() + 100;
//		int	size =  this.interactionTableWidth * this.interactionTableHeight * sizeof( *this.interactionTable );
//		this.interactionTable = (idInteraction **)R_ClearedStaticAlloc( size );
//
//		int	count = 0;
//		for ( int i = 0 ; i < this.lightDefs.Num() ; i++ ) {
//			idRenderLightLocal	*ldef = this.lightDefs[i];
//			if ( !ldef ) {
//				continue;
//			}
//			idInteraction	*inter;
//			for ( inter = ldef.firstInteraction; inter != NULL; inter = inter.lightNext ) {
//				idRenderEntityLocal	*edef = inter.entityDef;
//				int index = ldef.index * this.interactionTableWidth + edef.index;
//
//				this.interactionTable[ index ] = inter;
//				count++;
//			}
//		}
//
//		common.Printf( "interactionTable size: %i bytes\n", size );
//		common.Printf( "%i interaction take %i bytes\n", count, count * sizeof( idInteraction ) );
//	}
//
//	// entities flagged as noDynamicInteractions will no longer make any
//	this.generateAllInteractionsCalled = true;
//}

/*
===================
idRenderWorldLocal::FreeInteractions
===================
*/
	FreeInteractions ( ): void {
		var i: number;
		var def: idRenderEntityLocal;

		for ( i = 0; i < this.entityDefs.Num ( ); i++ ) {
			def = this.entityDefs[i];
			if ( !def ) {
				continue;
			}
			// free all the interactions
			while ( def.firstInteraction != null ) {
				def.firstInteraction.UnlinkAndFree ( );
			}
		}
	}

/*
==================
PushVolumeIntoTree

Used for both light volumes and model volumes.

This does not clip the points by the planes, so some slop
occurs.

tr.viewCount should be bumped before calling, allowing it
to prevent double checking areas.

We might alternatively choose to do this with an area flow.
==================
*/
	PushVolumeIntoTree_r ( def: idRenderEntityLocal, light: idRenderLightLocal, sphere: idSphere, /*int */numPoints: number, points: idVec3 [], /*int */nodeNum: number ): void {
		var /*int			*/i: number;
		var node: areaNode_t;
		var front: boolean, back: boolean;

		if ( nodeNum < 0 ) {
			var area: portalArea_t;
			var /*int		*/areaNum = -1 - nodeNum;

			area = this.portalAreas[areaNum];
			if ( area.viewCount == tr.viewCount ) {
				return; // already added a reference here
			}
			area.viewCount = tr.viewCount;

			if ( def ) {
				this.AddEntityRefToArea( def, area );
			}
			if ( light ) {
				this.AddLightRefToArea( light, area );
			}

			return;
		}

		node = this.areaNodes[nodeNum];

		// if we know that all possible children nodes only touch an area
		// we have already marked, we can early out
		if ( r_useNodeCommonChildren.GetBool ( ) &&
			node.commonChildrenArea != CHILDREN_HAVE_MULTIPLE_AREAS ) {
			// note that we do NOT try to set a reference in this area
			// yet, because the test volume may yet wind up being in the
			// solid part, which would cause bounds slightly poked into
			// a wall to show up in the next room
			if ( this.portalAreas[node.commonChildrenArea].viewCount == tr.viewCount ) {
				return;
			}
		}

		// if the bounding sphere is completely on one side, don't
		// bother checking the individual points
		var /*float */sd = node.plane.Distance( sphere.GetOrigin ( ) );
		if ( sd >= sphere.GetRadius ( ) ) {
			nodeNum = node.children[0];
			if ( nodeNum ) { // 0 = solid
				this.PushVolumeIntoTree_r( def, light, sphere, numPoints, points, nodeNum );
			}
			return;
		}
		if ( sd <= -sphere.GetRadius ( ) ) {
			nodeNum = node.children[1];
			if ( nodeNum ) { // 0 = solid
				this.PushVolumeIntoTree_r( def, light, sphere, numPoints, points, nodeNum );
			}
			return;
		}

		// exact check all the points against the node plane
		front = back = false;
//#ifdef MACOS_X	//loop unrolling & pre-fetching for performance
//	const idVec3 norm = node.plane.Normal();
//	const float plane3 = node.plane[3];
//	float D0, D1, D2, D3;

//	for ( i = 0 ; i < numPoints - 4; i+=4 ) {
//		D0 = points[i+0] * norm + plane3;
//		D1 = points[i+1] * norm + plane3;
//		if ( !front && D0 >= 0.0 ) {
//		    front = true;
//		} else if ( !back && D0 <= 0.0 ) {
//		    back = true;
//		}
//		D2 = points[i+1] * norm + plane3;
//		if ( !front && D1 >= 0.0 ) {
//		    front = true;
//		} else if ( !back && D1 <= 0.0 ) {
//		    back = true;
//		}
//		D3 = points[i+1] * norm + plane3;
//		if ( !front && D2 >= 0.0 ) {
//		    front = true;
//		} else if ( !back && D2 <= 0.0 ) {
//		    back = true;
//		}

//		if ( !front && D3 >= 0.0 ) {
//		    front = true;
//		} else if ( !back && D3 <= 0.0 ) {
//		    back = true;
//		}
//		if ( back && front ) {
//		    break;
//		}
//	}
//	if(!(back && front)) {
//		for (; i < numPoints ; i++ ) {
//			float d;
//			d = points[i] * node.plane.Normal() + node.plane[3];
//			if ( d >= 0.0 ) {
//				front = true;
//			} else if ( d <= 0.0 ) {
//				back = true;
//			}
//			if ( back && front ) {
//				break;
//			}
//		}	
//	}
//#else
		for ( i = 0; i < numPoints; i++ ) {
			var /*float */d: number;

			d = points[i].timesVec( node.plane.Normal ( ) ) + node.plane[3];
			if ( d >= 0.0 ) {
				front = true;
			} else if ( d <= 0.0 ) {
				back = true;
			}
			if ( back && front ) {
				break;
			}
		}
//#endif
		if ( front ) {
			nodeNum = node.children[0];
			if ( nodeNum ) { // 0 = solid
				this.PushVolumeIntoTree_r( def, light, sphere, numPoints, points, nodeNum );
			}
		}
		if ( back ) {
			nodeNum = node.children[1];
			if ( nodeNum ) { // 0 = solid
				this.PushVolumeIntoTree_r( def, light, sphere, numPoints, points, nodeNum );
			}
		}
	}

/*
==============
PushVolumeIntoTree
==============
*/
	PushVolumeIntoTree ( def: idRenderEntityLocal, light: idRenderLightLocal, /*int */numPoints: number, points: idVec3[] /*(*points) */ ): void {
		var /*int */i: number;
		var /*float */radSquared: number, lr: number;
		var mid = new idVec3, dir = new idVec3;

		if ( this.areaNodes == null ) {
			return;
		}

		// calculate a bounding sphere for the points
		mid.Zero ( );
		for ( i = 0; i < numPoints; i++ ) {
			mid.opAdditionAssignment( points[i] );
		}
		mid.opMultiplicationAssignment( ( 1.0 / numPoints ) );

		radSquared = 0;

		for ( i = 0; i < numPoints; i++ ) {
			dir.opEquals( points[i].opSubtraction( mid ) );
			lr = dir.timesVec( dir );
			if ( lr > radSquared ) {
				radSquared = lr;
			}
		}

		var sphere = new idSphere( mid, sqrt( radSquared ) );

		this.PushVolumeIntoTree_r( def, light, sphere, numPoints, points, 0 );
	}

//===================================================================

/*
====================
idRenderWorldLocal::DebugClearLines
====================
*/
	DebugClearLines ( /*int*/time: number ): void {
		RB_ClearDebugLines( time );
		RB_ClearDebugText( time );
	}

///*
//====================
//idRenderWorldLocal::DebugLine
//====================
//*/
//void idRenderWorldLocal::DebugLine( const idVec4 &color, start:idVec3, end:idVec3, const int lifetime, const bool depthTest ) {
//	RB_AddDebugLine( color, start, end, lifetime, depthTest );
//}
//
///*
//================
//idRenderWorldLocal::DebugArrow
//================
//*/
//void idRenderWorldLocal::DebugArrow( const idVec4 &color, start:idVec3, const idVec3 &end, int size, const int lifetime ) {
//	idVec3 forward, right, up, v1, v2;
//	float a, s;
//	var/*int*/i:number;
//	static float arrowCos[40];
//	static float arrowSin[40];
//	static int arrowStep;
//
//	DebugLine( color, start, end, lifetime );
//
//	if ( r_debugArrowStep.GetInteger() <= 10 ) {
//		return;
//	}
//	// calculate sine and cosine when step size changes
//	if ( arrowStep != r_debugArrowStep.GetInteger() ) {
//		arrowStep = r_debugArrowStep.GetInteger();
//		for (i = 0, a = 0; a < 360.0f; a += arrowStep, i++) {
//			arrowCos[i] = idMath::Cos16( DEG2RAD( a ) );
//			arrowSin[i] = idMath::Sin16( DEG2RAD( a ) );
//		}
//		arrowCos[i] = arrowCos[0];
//		arrowSin[i] = arrowSin[0];
//	}
//	// draw a nice arrow
//	forward = end - start;
//	forward.Normalize();
//	forward.NormalVectors( right, up);
//	for (i = 0, a = 0; a < 360.0f; a += arrowStep, i++) {
//		s = 0.5f * size * arrowCos[i];
//		v1 = end - size * forward;
//		v1 = v1 + s * right;
//		s = 0.5f * size * arrowSin[i];
//		v1 = v1 + s * up;
//
//		s = 0.5f * size * arrowCos[i+1];
//		v2 = end - size * forward;
//		v2 = v2 + s * right;
//		s = 0.5f * size * arrowSin[i+1];
//		v2 = v2 + s * up;
//
//		DebugLine( color, v1, end, lifetime );
//		DebugLine( color, v1, v2, lifetime );
//	}
//}
//
///*
//====================
//idRenderWorldLocal::DebugWinding
//====================
//*/
//void idRenderWorldLocal::DebugWinding( const idVec4 &color, const idWinding &w, constorigin: idVec3, const idMat3 &axis, const int lifetime, const bool depthTest ) {
//	var/*int*/i:number;
//	idVec3 point, lastPoint;
//
//	if ( w.GetNumPoints() < 2 ) {
//		return;
//	}
//
//	lastPoint = origin + w[w.GetNumPoints()-1].ToVec3() * axis;
//	for ( i = 0; i < w.GetNumPoints(); i++ ) {
//		point = origin + w[i].ToVec3() * axis;
//		DebugLine( color, lastPoint, point, lifetime, depthTest );
//		lastPoint = point;
//	}
//}
//
///*
//====================
//idRenderWorldLocal::DebugCircle
//====================
//*/
//void idRenderWorldLocal::DebugCircle( const idVec4 &color, origin: idVec3, const idVec3 &dir, const float radius, const int numSteps, const int lifetime, const bool depthTest ) {
//	var/*int*/i:number;
//	float a;
//	idVec3 left, up, point, lastPoint;
//
//	dir.OrthogonalBasis( left, up );
//	left *= radius;
//	up *= radius;
//	lastPoint = origin + up;
//	for ( i = 1; i <= numSteps; i++ ) {
//		a = idMath::TWO_PI * i / numSteps;
//		point = origin + idMath::Sin16( a ) * left + idMath::Cos16( a ) * up;
//		DebugLine( color, lastPoint, point, lifetime, depthTest );
//		lastPoint = point;
//	}
//}
//
///*
//============
//idRenderWorldLocal::DebugSphere
//============
//*/
//void idRenderWorldLocal::DebugSphere( const idVec4 &color, const idSphere &sphere, const int lifetime, const bool depthTest /*_D3XP*/ ) {
//	int i, j, n, num;
//	float s, c;
//	idVec3 p, lastp, *lastArray;
//
//	num = 360 / 15;
//	lastArray = (idVec3 *) _alloca16( num * sizeof( idVec3 ) );
//	lastArray[0] = sphere.GetOrigin() + idVec3( 0, 0, sphere.GetRadius() );
//	for ( n = 1; n < num; n++ ) {
//		lastArray[n] = lastArray[0];
//	}
//
//	for ( i = 15; i <= 360; i += 15 ) {
//		s = idMath::Sin16( DEG2RAD(i) );
//		c = idMath::Cos16( DEG2RAD(i) );
//		lastp[0] = sphere.GetOrigin()[0];
//		lastp[1] = sphere.GetOrigin()[1] + sphere.GetRadius() * s;
//		lastp[2] = sphere.GetOrigin()[2] + sphere.GetRadius() * c;
//		for ( n = 0, j = 15; j <= 360; j += 15, n++ ) {
//			p[0] = sphere.GetOrigin()[0] + idMath::Sin16( DEG2RAD(j) ) * sphere.GetRadius() * s;
//			p[1] = sphere.GetOrigin()[1] + idMath::Cos16( DEG2RAD(j) ) * sphere.GetRadius() * s;
//			p[2] = lastp[2];
//
//			DebugLine( color, lastp, p, lifetime,depthTest );
//			DebugLine( color, lastp, lastArray[n], lifetime, depthTest );
//
//			lastArray[n] = lastp;
//			lastp = p;
//		}
//	}
//}
//
///*
//====================
//idRenderWorldLocal::DebugBounds
//====================
//*/
//void idRenderWorldLocal::DebugBounds( const idVec4 &color, const idBounds &bounds, const idVec3 &org, const int lifetime ) {
//	var/*int*/i:number;
//	idVec3 v[8];
//
//	if ( bounds.IsCleared() ) {
//		return;
//	}
//
//	for ( i = 0; i < 8; i++ ) {
//		v[i][0] = org[0] + bounds[(i^(i>>1))&1][0];
//		v[i][1] = org[1] + bounds[(i>>1)&1][1];
//		v[i][2] = org[2] + bounds[(i>>2)&1][2];
//	}
//	for ( i = 0; i < 4; i++ ) {
//		DebugLine( color, v[i], v[(i+1)&3], lifetime );
//		DebugLine( color, v[4+i], v[4+((i+1)&3)], lifetime );
//		DebugLine( color, v[i], v[4+i], lifetime );
//	}
//}
//
///*
//====================
//idRenderWorldLocal::DebugBox
//====================
//*/
//void idRenderWorldLocal::DebugBox( const idVec4 &color, const idBox &box, const int lifetime ) {
//	var/*int*/i:number;
//	idVec3 v[8];
//
//	box.ToPoints( v );
//	for ( i = 0; i < 4; i++ ) {
//		DebugLine( color, v[i], v[(i+1)&3], lifetime );
//		DebugLine( color, v[4+i], v[4+((i+1)&3)], lifetime );
//		DebugLine( color, v[i], v[4+i], lifetime );
//	}
//}
//
///*
//================
//idRenderWorldLocal::DebugFrustum
//================
//*/
//void idRenderWorldLocal::DebugFrustum( const idVec4 &color, const idFrustum &frustum, const bool showFromOrigin, const int lifetime ) {
//	var/*int*/i:number;
//	idVec3 v[8];
//
//	frustum.ToPoints( v );
//
//	if ( frustum.GetNearDistance() > 0.0 ) {
//		for ( i = 0; i < 4; i++ ) {
//			DebugLine( color, v[i], v[(i+1)&3], lifetime );
//		}
//		if ( showFromOrigin ) {
//			for ( i = 0; i < 4; i++ ) {
//				DebugLine( color, frustum.GetOrigin(), v[i], lifetime );
//			}
//		}
//	}
//	for ( i = 0; i < 4; i++ ) {
//		DebugLine( color, v[4+i], v[4+((i+1)&3)], lifetime );
//		DebugLine( color, v[i], v[4+i], lifetime );
//	}
//}
//
///*
//============
//idRenderWorldLocal::DebugCone
//
//  dir is the cone axis
//  radius1 is the radius at the apex
//  radius2 is the radius at apex+dir
//============
//*/
//void idRenderWorldLocal::DebugCone( const idVec4 &color, const idVec3 &apex, const idVec3 &dir, float radius1, float radius2, const int lifetime ) {
//	var/*int*/i:number;
//	idMat3 axis;
//	idVec3 top, p1, p2, lastp1, lastp2, d;
//
//	axis[2] = dir;
//	axis[2].Normalize();
//	axis[2].NormalVectors( axis[0], axis[1] );
//	axis[1] = -axis[1];
//
//	top = apex + dir;
//	lastp2 = top + radius2 * axis[1];
//
//	if ( radius1 == 0.0 ) {
//		for ( i = 20; i <= 360; i += 20 ) {
//			d = idMath::Sin16( DEG2RAD(i) ) * axis[0] + idMath::Cos16( DEG2RAD(i) ) * axis[1];
//			p2 = top + d * radius2;
//			DebugLine( color, lastp2, p2, lifetime );
//			DebugLine( color, p2, apex, lifetime );
//			lastp2 = p2;
//		}
//	} else {
//		lastp1 = apex + radius1 * axis[1];
//		for ( i = 20; i <= 360; i += 20 ) {
//			d = idMath::Sin16( DEG2RAD(i) ) * axis[0] + idMath::Cos16( DEG2RAD(i) ) * axis[1];
//			p1 = apex + d * radius1;
//			p2 = top + d * radius2;
//			DebugLine( color, lastp1, p1, lifetime );
//			DebugLine( color, lastp2, p2, lifetime );
//			DebugLine( color, p1, p2, lifetime );
//			lastp1 = p1;
//			lastp2 = p2;
//		}
//	}
//}
//
///*
//================
//idRenderWorldLocal::DebugAxis
//================
//*/
//void idRenderWorldLocal::DebugAxis( origin: idVec3, const idMat3 &axis ) {
//	idVec3 start = origin;
//	idVec3 end = start + axis[0] * 20.0f;
//	DebugArrow( colorWhite, start, end, 2 );
//	end = start + axis[0] * -20.0f;
//	DebugArrow( colorWhite, start, end, 2 );
//	end = start + axis[1] * +20.0f;
//	DebugArrow( colorGreen, start, end, 2 );
//	end = start + axis[1] * -20.0f;
//	DebugArrow( colorGreen, start, end, 2 );
//	end = start + axis[2] * +20.0f;
//	DebugArrow( colorBlue, start, end, 2 );
//	end = start + axis[2] * -20.0f;
//	DebugArrow( colorBlue, start, end, 2 );
//}

/*
====================
idRenderWorldLocal::DebugClearPolygons
====================
*/
	DebugClearPolygons ( /*int*/time: number ): void {
		RB_ClearDebugPolygons( time );
	}

/*
====================
idRenderWorldLocal::DebugPolygon
====================
*/
	DebugPolygon ( color: idVec4, winding: idWinding, lifeTime: number = 0, depthTest: boolean = false ): void {
		RB_AddDebugPolygon( color, winding, lifeTime, depthTest );
	}

///*
//================
//idRenderWorldLocal::DebugScreenRect
//================
//*/
//void idRenderWorldLocal::DebugScreenRect( const idVec4 &color, const idScreenRect &rect, const viewDef_t *viewDef, const int lifetime ) {
//	var/*int*/i:number;
//	float centerx, centery, dScale, hScale, vScale;
//	idBounds bounds;
//	idVec3 p[4];
//
//	centerx = ( viewDef.viewport.x2 - viewDef.viewport.x1 ) * 0.5f;
//	centery = ( viewDef.viewport.y2 - viewDef.viewport.y1 ) * 0.5f;
//
//	dScale = r_znear.GetFloat() + 1.0f;
//	hScale = dScale * idMath::Tan16( DEG2RAD( viewDef.renderView.fov_x * 0.5f ) );
//	vScale = dScale * idMath::Tan16( DEG2RAD( viewDef.renderView.fov_y * 0.5f ) );
//
//	bounds[0][0] = bounds[1][0] = dScale;
//	bounds[0][1] = -( rect.x1 - centerx ) / centerx * hScale;
//	bounds[1][1] = -( rect.x2 - centerx ) / centerx * hScale;
//	bounds[0][2] = ( rect.y1 - centery ) / centery * vScale;
//	bounds[1][2] = ( rect.y2 - centery ) / centery * vScale;
//
//	for ( i = 0; i < 4; i++ ) {
//		p[i].x = bounds[0][0];
//		p[i].y = bounds[(i^(i>>1))&1].y;
//		p[i].z = bounds[(i>>1)&1].z;
//		p[i] = viewDef.renderView.vieworg + p[i] * viewDef.renderView.viewaxis;
//	}
//	for ( i = 0; i < 4; i++ ) {
//		DebugLine( color, p[i], p[(i+1)&3], false );
//	}
//}
//
///*
//================
//idRenderWorldLocal::DrawTextLength
//
//  returns the length of the given text
//================
//*/
//float idRenderWorldLocal::DrawTextLength( text:string, float scale, int len ) {
//	return RB_DrawTextLength( text, scale, len );
//}
//
///*
//================
//idRenderWorldLocal::DrawText
//
//  oriented on the viewaxis
//  align can be 0-left, 1-center (default), 2-right
//================
//*/
//void idRenderWorldLocal::DrawText( text:string, origin: idVec3, float scale, const idVec4 &color, const idMat3 &viewAxis, const int align, const int lifetime, const bool depthTest ) {
//	RB_AddDebugText( text, origin, scale, color, viewAxis, align, lifetime, depthTest );
//}
//
///*
//===============
//idRenderWorldLocal::RegenerateWorld
//===============
//*/
//void idRenderWorldLocal::RegenerateWorld() {
//	R_RegenerateWorld_f( idCmdArgs() );
//}




	// RenderWorld_load.cpp





/*
================
idRenderWorldLocal::FreeWorld
================
*/
FreeWorld  (): void {
		var i: number;

		// this will free all the lightDefs and entityDefs
		this.FreeDefs();

		// free all the portals and check light/model references
		for (i = 0; i < this.numPortalAreas; i++) {
			var area: portalArea_t;
			var portal: portal_t, nextPortal: portal_t;
			todoThrow("portal.next struct/ref ???");
			//area = this.portalAreas[i];
			//for ( portal = area.portals ; portal ; portal = nextPortal ) {
			//	nextPortal = portal.next;
			//	$delete (portal.w):
			//	delete portal.w;
			//	R_StaticFree( portal );
			//}

			//// there shouldn't be any remaining lightRefs or entityRefs
			//if ( area.lightRefs.areaNext != area.lightRefs ) {
			//	common.Error( "FreeWorld: unexpected remaining lightRefs" );
			//}
			//if ( area.entityRefs.areaNext != area.entityRefs ) {
			//	common.Error( "FreeWorld: unexpected remaining entityRefs" );
			//}
		}

		if (this.portalAreas) {
			R_StaticFree(this.portalAreas);
			this.portalAreas = null;
			this.numPortalAreas = 0;
			R_StaticFree(this.areaScreenRect);
			this.areaScreenRect = null;
		}

		if (this.doublePortals) {
			R_StaticFree(this.doublePortals);
			this.doublePortals = null;
			this.numInterAreaPortals = 0;
		}

		if (this.areaNodes) {
			R_StaticFree(this.areaNodes);
			this.areaNodes = null;
		}

		// free all the inline idRenderModels 
		for (i = 0; i < this.localModels.Num(); i++) {
			renderModelManager.RemoveModel(this.localModels[i]);
			$delete(this.localModels[i]);
			delete this.localModels[i];
		}
		this.localModels.Clear();

		this.areaReferenceAllocator.Shutdown();
		this.interactionAllocator.Shutdown();
		this.areaNumRefAllocator.Shutdown();

		this.mapName.opEquals("<FREED>");
	}
//
///*
//================
//idRenderWorldLocal::TouchWorldModels
//================
//*/
//void idRenderWorldLocal::TouchWorldModels( void ) {
//	var/*int*/i:number;
//
//	for ( i = 0 ; i < this.localModels.Num() ; i++ ) {
//		renderModelManager.CheckModel( this.localModels[i].Name() );
//	}
//}

/*
================
idRenderWorldLocal::ParseModel
================
*/
static ParseModelCount = 0;
ParseModel  (src: idLexer): idRenderModel {
	var model: idRenderModel;
	var token = new idToken;
	var i: number, j: number;
	var tri: srfTriangles_t;
	var surf = new modelSurface_t;

	src.ExpectTokenString("{");

	// parse the name
	src.ExpectAnyToken(token);

	model = renderModelManager.AllocModel();
	model.InitEmpty(token.data);

	var numSurfaces = src.ParseInt();
	if (numSurfaces < 0) {
		src.Error("R_ParseModel: bad numSurfaces");
	}

	dlog(DEBUG_RENDERWORLD_LOAD, "ParseModelCount %i\n", idRenderWorldLocal.ParseModelCount);
	idRenderWorldLocal.ParseModelCount++;
	for (i = 0; i < numSurfaces; i++) {
		src.ExpectTokenString("{");

		src.ExpectAnyToken(token);

		surf.shader = declManager.FindMaterial(token.data);
		dlog(DEBUG_RENDERWORLD_LOAD, "shader %s i: %i\n", token.data, i);

		(<idMaterial>surf.shader).AddReference();

		tri = R_AllocStaticTriSurf();
		surf.geometry = tri;

		tri.numVerts = src.ParseInt();
		tri.numIndexes = src.ParseInt();

		dlog(DEBUG_RENDERWORLD_LOAD, "	tri.numVerts %i tri.numIndexes: %i\n", tri.numVerts, tri.numIndexes);

		R_AllocStaticTriSurfVerts(tri, tri.numVerts);
		for (j = 0; j < tri.numVerts; j++) {
			var vec = new Float32Array(8);

			src.Parse1DMatrix(8, vec);

			dlog(DEBUG_RENDERWORLD_LOAD, "vec j: %i %.2f, %.2f, %.2f, %.2f, %.2f, %.2f, %.2f, %.2f\n",
				j, vec[0], vec[1], vec[2], vec[3], vec[4], vec[5], vec[6], vec[7]);

			tri.verts[j].xyz[0] = vec[0];
			tri.verts[j].xyz[1] = vec[1];
			tri.verts[j].xyz[2] = vec[2];
			tri.verts[j].st[0] = vec[3];
			tri.verts[j].st[1] = vec[4];
			tri.verts[j].normal[0] = vec[5];
			tri.verts[j].normal[1] = vec[6];
			tri.verts[j].normal[2] = vec[7];
		}

		R_AllocStaticTriSurfIndexes(tri, tri.numIndexes);
		for (j = 0; j < tri.numIndexes; j++) {
			tri.indexes[j] = src.ParseInt();
			dlog(DEBUG_RENDERWORLD_LOAD, "tri.indexes[%i]: %i\n", j, tri.indexes[j]);
		}
		src.ExpectTokenString("}");

		// add the completed surface to the model
		model.AddSurface(surf);
	}

	src.ExpectTokenString("}");

	model.FinishSurfaces();

	return model;
}

/*
================
idRenderWorldLocal::ParseShadowModel
================
*/
ParseShadowModel  (src: idLexer): idRenderModel {
	var model: idRenderModel;
	var token = new idToken;
	var j: number /*int*/;
	var tri: srfTriangles_t;
	var surf = new modelSurface_t;

	src.ExpectTokenString("{");

	// parse the name
	src.ExpectAnyToken(token);

	model = renderModelManager.AllocModel();
	model.InitEmpty(token.data);

	surf.shader = tr.defaultMaterial;

	tri = R_AllocStaticTriSurf();
	surf.geometry = tri;

	tri.numVerts = src.ParseInt();
	tri.numShadowIndexesNoCaps = src.ParseInt();
	tri.numShadowIndexesNoFrontCaps = src.ParseInt();
	tri.numIndexes = src.ParseInt();
	tri.shadowCapPlaneBits = src.ParseInt();

	R_AllocStaticTriSurfShadowVerts(tri, tri.numVerts);
	tri.bounds.Clear();
	for (j = 0; j < tri.numVerts; j++) {
		var vec = new Float32Array(8);

		src.Parse1DMatrix(3, vec);
		tri.shadowVertexes[j].xyz[0] = vec[0];
		tri.shadowVertexes[j].xyz[1] = vec[1];
		tri.shadowVertexes[j].xyz[2] = vec[2];
		tri.shadowVertexes[j].xyz[3] = 1; // no homogenous value

		tri.bounds.AddPoint(tri.shadowVertexes[j].xyz.ToVec3());
	}

	R_AllocStaticTriSurfIndexes(tri, tri.numIndexes);
	for (j = 0; j < tri.numIndexes; j++) {
		tri.indexes[j] = src.ParseInt();
	}

	// add the completed surface to the model
	model.AddSurface(surf);

	src.ExpectTokenString("}");

	// we do NOT do a model.FinishSurfaceces, because we don't need sil edges, planes, tangents, etc.
	//	model.FinishSurfaces();

	return model;
}

/*
================
idRenderWorldLocal::SetupAreaRefs
================
*/
SetupAreaRefs  (): void {
	var /*int*/i: number;

	this.connectedAreaNum = 0;
	for (i = 0; i < this.numPortalAreas; i++) {
		this.portalAreas[i].areaNum = i;
		this.portalAreas[i].lightRefs.areaNext =
		this.portalAreas[i].lightRefs.areaPrev =
		this.portalAreas[i].lightRefs;
		this.portalAreas[i].entityRefs.areaNext =
		this.portalAreas[i].entityRefs.areaPrev =
		this.portalAreas[i].entityRefs;
	}
}

/*
================
idRenderWorldLocal::ParseInterAreaPortals
================
*/
ParseInterAreaPortals  (src: idLexer) {
	var /*int */i: number, j: number;

	src.ExpectTokenString("{");

	this.numPortalAreas = src.ParseInt();
	if (this.numPortalAreas < 0) {
		src.Error("R_ParseInterAreaPortals: bad numPortalAreas");
		return;
	}
	this.portalAreas = newStructArray<portalArea_t>(portalArea_t, this.numPortalAreas); //(portalArea_t *)R_ClearedStaticAlloc( this.numPortalAreas * sizeof( this.portalAreas[0] ) );
	this.areaScreenRect = newStructArray<idScreenRect>(idScreenRect, this.numPortalAreas); //(idScreenRect *) R_ClearedStaticAlloc( this.numPortalAreas * sizeof( idScreenRect ) );

	// set the doubly linked lists
	this.SetupAreaRefs();

	this.numInterAreaPortals = src.ParseInt();
	if (this.numInterAreaPortals < 0) {
		src.Error("R_ParseInterAreaPortals: bad numInterAreaPortals");
		return;
	}

	this.doublePortals = newStructArray<doublePortal_t>(doublePortal_t, this.numInterAreaPortals); // (doublePortal_t *)R_ClearedStaticAlloc( this.numInterAreaPortals * 
	//sizeof( this.doublePortals [0] ) );

	for (i = 0; i < this.numInterAreaPortals; i++) {
		var /*int*/numPoints: number, a1: number, a2: number;
		var w: idWinding;
		var p: portal_t;

		numPoints = src.ParseInt();
		a1 = src.ParseInt();
		a2 = src.ParseInt();

		w = new idWinding(numPoints);
		w.SetNumPoints(numPoints);
		for (j = 0; j < numPoints; j++) {
			src.Parse1DMatrix(3, (w)[j].ToFloatPtr());
			// no texture coordinates
			(w)[j][3] = 0;
			(w)[j][4] = 0;
		}

		// add the portal to a1
		p = new portal_t; //(portal_t *)R_ClearedStaticAlloc( sizeof( *p ) );
		p.intoArea = a2;
		p.doublePortal = this.doublePortals[i];
		p.w = w;
		p.w.GetPlane(p.plane);

		p.next = this.portalAreas[a1].portals;
		this.portalAreas[a1].portals = p;

		this.doublePortals[i].portals[0] = p;

		// reverse it for a2
		p = new portal_t; //(portal_t *)R_ClearedStaticAlloc( sizeof( *p ) );
		p.intoArea = a1;
		p.doublePortal = this.doublePortals[i];
		p.w = w.Reverse();
		p.w.GetPlane(p.plane);

		p.next = this.portalAreas[a2].portals;
		this.portalAreas[a2].portals = p;

		this.doublePortals[i].portals[1] = p;
	}

	src.ExpectTokenString("}");
}

/*
================
idRenderWorldLocal::ParseNodes
================
*/
ParseNodes  (src: idLexer): void {
	var /*int*/i: number;

	src.ExpectTokenString("{");

	this.numAreaNodes = src.ParseInt();
	if (this.numAreaNodes < 0) {
		src.Error("R_ParseNodes: bad numAreaNodes");
	}
	this.areaNodes = newStructArray<areaNode_t>(areaNode_t, this.numAreaNodes); //(areaNode_t *)R_ClearedStaticAlloc( numAreaNodes * sizeof( this.areaNodes[0] ) );

	for (i = 0; i < this.numAreaNodes; i++) {
		var node: areaNode_t;

		node = this.areaNodes[i];

		src.Parse1DMatrix(4, node.plane.ToFloatPtr());
		node.children[0] = src.ParseInt();
		node.children[1] = src.ParseInt();
	}

	src.ExpectTokenString("}");
}

/*
================
idRenderWorldLocal::CommonChildrenArea_r
================
*/
CommonChildrenArea_r  (node: areaNode_t): number /*int*/ {
	var /*int	*/nums = [0, 0];

	for (var i = 0; i < 2; i++) {
		if (node.children[i] <= 0) {
			nums[i] = -1 - node.children[i];
		} else {
			nums[i] = this.CommonChildrenArea_r(this.areaNodes[node.children[i]]);
		}
	}

	// solid nodes will match any area
	if (nums[0] == AREANUM_SOLID) {
		nums[0] = nums[1];
	}
	if (nums[1] == AREANUM_SOLID) {
		nums[1] = nums[0];
	}

	var /*int	*/common: number;
	if (nums[0] == nums[1]) {
		common = nums[0];
	} else {
		common = CHILDREN_HAVE_MULTIPLE_AREAS;
	}

	node.commonChildrenArea = common;

	return common;
}

/*
=================
idRenderWorldLocal::ClearWorld

Sets up for a single area world
=================
*/
ClearWorld  (): void {
	this.numPortalAreas = 1;
	this.portalAreas = [new portalArea_t]; // (portalArea_t *)R_ClearedStaticAlloc( sizeof( this.portalAreas[0] ) );
	this.areaScreenRect = [new idScreenRect]; // (idScreenRect *) R_ClearedStaticAlloc( sizeof( idScreenRect ) );

	this.SetupAreaRefs();

	// even though we only have a single area, create a node
	// that has both children pointing at it so we don't need to
	//
	this.areaNodes = [new areaNode_t]; // (areaNode_t *)R_ClearedStaticAlloc( sizeof( this.areaNodes[0] ) );
	this.areaNodes[0].plane[3] = 1;
	this.areaNodes[0].children[0] = -1;
	this.areaNodes[0].children[1] = -1;
}

/*
=================
idRenderWorldLocal::FreeDefs

dump all the interactions
=================
*/
FreeDefs  (): void {
	var /*int*/i: number;

	this.generateAllInteractionsCalled = false;

	if (this.interactionTable) {
		R_StaticFree(this.interactionTable);
		this.interactionTable = null;
	}

	// free all lightDefs
	for (i = 0; i < this.lightDefs.Num(); i++) {
		var light: idRenderLightLocal;

		light = this.lightDefs[i];
		if (light && light.world == this) {
			this.FreeLightDef(i);
			this.lightDefs[i] = null;
		}
	}

	// free all entityDefs
	for (i = 0; i < this.entityDefs.Num(); i++) {
		var mod: idRenderEntityLocal;

		mod = this.entityDefs[i];
		if (mod && mod.world == this) {
			this.FreeEntityDef(i);
			this.entityDefs[i] = null;
		}
	}
}

/*
=================
idRenderWorldLocal::InitFromMap

A NULL or empty name will make a world without a map model, which
is still useful for displaying a bare model
=================
*/
InitFromMap  (name: string): boolean {
	var src: idLexer;
	var token = new idToken;
	var filename = new idStr;
	var lastModel: idRenderModel;

	// if this is an empty world, initialize manually
	if (!name /*|| !name[0] */ ) {
		this.FreeWorld();
		this.mapName.Clear();
		this.ClearWorld();
		return true;
	}


	// load it
	filename.opEquals(name);
	filename.SetFileExtension(PROC_FILE_EXT);

	// if we are reloading the same map, check the timestamp
	// and try to skip all the work
	var currentTimeStamp = new R<number>();
	fileSystem.ReadFile(filename.data, null, currentTimeStamp);

	if (name == this.mapName.data) {
		if (currentTimeStamp.$ != FILE_NOT_FOUND_TIMESTAMP && currentTimeStamp.$ == this.mapTimeStamp) {
			common.Printf("idRenderWorldLocal::InitFromMap: retaining existing map\n");
			todoThrow();
			this.FreeDefs();
			todoThrow();
			//this.TouchWorldModels();
			//this.AddWorldModelEntities();
			//this.ClearPortalStates();
			return true;
		}
		common.Printf("idRenderWorldLocal::InitFromMap: timestamp has changed, reloading.\n");
	}

	this.FreeWorld();

	src = new idLexer(filename.data, lexerFlags_t.LEXFL_NOSTRINGCONCAT | lexerFlags_t.LEXFL_NODOLLARPRECOMPILE);
	if (!src.IsLoaded()) {
		common.Printf("idRenderWorldLocal::InitFromMap: %s not found\n", filename.c_str());
		this.ClearWorld();
		return false;
	}


	this.mapName.opEquals(name);
	this.mapTimeStamp = currentTimeStamp.$;

	// if we are writing a demo, archive the load command
	if (session.writeDemo) {
		todoThrow ( );
		//this.WriteLoadMap();
	}

	if (!src.ReadToken(token) || token.Icmp(PROC_FILE_ID)) {
		common.Printf("idRenderWorldLocal::InitFromMap: bad id '%s' instead of '%s'\n", token.c_str(), PROC_FILE_ID);
		$delete(src);
		delete src;
		return false;
	}

	// parse the file
	while (1) {
		if (!src.ReadToken(token)) {
			break;
		}

		if (token.data == "model") {
			lastModel = this.ParseModel(src);

			// add it to the model manager list
			renderModelManager.AddModel(lastModel);

			// save it in the list to free when clearing this map
			this.localModels.Append(lastModel);
			continue;
		}

		if (token.data == "shadowModel") {
			dlog(DEBUG_RENDERWORLD_LOAD, "ParseShadowModel\n");
			lastModel = this.ParseShadowModel(src);

			// add it to the model manager list
			renderModelManager.AddModel(lastModel);

			// save it in the list to free when clearing this map
			this.localModels.Append(lastModel);
			continue;
		}

		if (token.data == "interAreaPortals") {
			dlog(DEBUG_RENDERWORLD_LOAD, "interAreaPortals\n");
			this.ParseInterAreaPortals(src);
			continue;
		}

		if (token.data == "nodes") {
			dlog(DEBUG_RENDERWORLD_LOAD, "nodes\n");
			this.ParseNodes(src);
			continue;
		}

		src.Error("idRenderWorldLocal::InitFromMap: bad token \"%s\"", token.c_str());
	}

	$delete(src);

	// if it was a trivial map without any areas, create a single area
	if (!this.numPortalAreas) {
		this.ClearWorld();
	}

	// find the points where we can early-our of reference pushing into the BSP tree
	this.CommonChildrenArea_r(this.areaNodes[0]);

	this.AddWorldModelEntities();
	this.ClearPortalStates();

	// done!
	return true;
}

/*
=====================
idRenderWorldLocal::ClearPortalStates
=====================
*/
ClearPortalStates  (): void {
	var /*int*/i: number, j: number;

	// all portals start off open
	for (i = 0; i < this.numInterAreaPortals; i++) {
		this.doublePortals[i].blockingBits = portalConnection_t.PS_BLOCK_NONE;
	}

	// flood fill all area connections
	for (i = 0; i < this.numPortalAreas; i++) {
		for (j = 0; j < NUM_PORTAL_ATTRIBUTES; j++) {
			this.connectedAreaNum++;
			this.FloodConnectedAreas( this.portalAreas[i], j );
		}
	}
}

/*
=====================
idRenderWorldLocal::AddWorldModelEntities
=====================
*/
AddWorldModelEntities  (): void {
	var /*int		*/i: number;

	// add the world model for each portal area
	// we can't just call AddEntityDef, because that would place the references
	// based on the bounding box, rather than explicitly into the correct area
	for (i = 0; i < this.numPortalAreas; i++) {
		var def: idRenderEntityLocal;
		var /*int			*/index: number;

		def = new idRenderEntityLocal;

		// try and reuse a free spot
		index = this.entityDefs.FindNull();
		if (index == -1) {
			index = this.entityDefs.Append(def);
		} else {
			this.entityDefs[index] = def;
		}

		def.index = index;
		def.world = this;

		def.parms.hModel = renderModelManager.FindModel(va("_area%i", i));
		if (def.parms.hModel.IsDefaultModel() || !def.parms.hModel.IsStaticWorldModel()) {
			common.Error("idRenderWorldLocal::InitFromMap: bad area model lookup");
		}

		var hModel: idRenderModel = def.parms.hModel;

		for (var j = 0; j < hModel.NumSurfaces(); j++) {
			var surf: modelSurface_t = hModel.Surface(j);

			if (surf.shader.GetName() == ("textures/smf/portal_sky")) {
				def.needsPortalSky = true;
			}
		}

		def.referenceBounds = def.parms.hModel.Bounds();

		def.parms.axis[0][0] = 1;
		def.parms.axis[1][1] = 1;
		def.parms.axis[2][2] = 1;

		R_AxisToModelMatrix(def.parms.axis, def.parms.origin, def.modelMatrix);

		// in case an explicit shader is used on the world, we don't
		// want it to have a 0 alpha or color
		def.parms.shaderParms[0] =
		def.parms.shaderParms[1] =
		def.parms.shaderParms[2] =
		def.parms.shaderParms[3] = 1;

		this.AddEntityRefToArea(def, this.portalAreas[i]);
	}
}
//
///*
//=====================
//CheckAreaForPortalSky
//=====================
//*/
//bool idRenderWorldLocal::CheckAreaForPortalSky( int areaNum ) {
//	areaReference_t	*ref;
//
//	assert( areaNum >= 0 && areaNum < this.numPortalAreas );
//
//	for ( ref = this.portalAreas[areaNum].entityRefs.areaNext; ref.entity; ref = ref.areaNext ) {
//		assert( ref.area == &this.portalAreas[areaNum] );
//
//		if ( ref.entity && ref.entity.needsPortalSky ) {
//			return true;
//		}
//	}
//
//	return false;
//}








// RenderWorld_portals.cpp:




///*
//===================
//idRenderWorldLocal::ScreenRectForWinding
//===================
//*/
//idScreenRect idRenderWorldLocal::ScreenRectFromWinding( const idWinding *w, viewEntity_t *space ) {
//	idScreenRect	r;
//	int				i;
//	idVec3			v;
//	idVec3			ndc;
//	float			windowX, windowY;
//
//	r.Clear();
//	for ( i = 0 ; i < w.GetNumPoints() ; i++ ) {
//		R_LocalPointToGlobal( space.modelMatrix, (*w)[i].ToVec3(), v );
//		R_GlobalToNormalizedDeviceCoordinates( v, ndc );
//
//		windowX = 0.5f * ( 1.0f + ndc[0] ) * ( tr.viewDef.viewport.x2 - tr.viewDef.viewport.x1 );
//		windowY = 0.5f * ( 1.0f + ndc[1] ) * ( tr.viewDef.viewport.y2 - tr.viewDef.viewport.y1 );
//
//		r.AddPoint( windowX, windowY );
//	}
//
//	r.Expand();
//
//	return r;
//}
//
///*
//===================
//PortalIsFoggedOut
//===================
//*/
//bool idRenderWorldLocal::PortalIsFoggedOut( const portal_t *p ) {
//	idRenderLightLocal	*ldef;
//	const idWinding	*w;
//	int			i;
//	idPlane		forward;
//
//	ldef = p.doublePortal.fogLight;
//	if ( !ldef ) {
//		return false;
//	}
//
//	// find the current density of the fog
//	const idMaterial	*lightShader = ldef.lightShader;
//	int		size = sizeof( float ) *lightShader.GetNumRegisters();
//	float	*regs =(float *)_alloca( size );
//
//	lightShader.EvaluateRegisters( regs, ldef.parms.shaderParms, tr.viewDef, ldef.parms.referenceSound );
//
//	const shaderStage_t	*stage = lightShader.GetStage(0);
//
//	float alpha = regs[ stage.color.registers[3] ];
//
//
//	// if they left the default value on, set a fog distance of 500
//	float	a;
//
//	if ( alpha <= 1.0f ) {
//		a = -0.5f / DEFAULT_FOG_DISTANCE;
//	} else {
//		// otherwise, distance = alpha color
//		a = -0.5f / alpha;
//	}
//
//	forward[0] = a * tr.viewDef.worldSpace.modelViewMatrix[2];
//	forward[1] = a * tr.viewDef.worldSpace.modelViewMatrix[6];
//	forward[2] = a * tr.viewDef.worldSpace.modelViewMatrix[10];
//	forward[3] = a * tr.viewDef.worldSpace.modelViewMatrix[14];
//
//	w = p.w;
//	for ( i = 0 ; i < w.GetNumPoints() ; i++ ) {
//		float	d;
//
//		d = forward.Distance( (*w)[i].ToVec3() );
//		if ( d < 0.5f ) {
//			return false;		// a point not clipped off
//		}
//	}
//
//	return true;
//}
//
///*
//===================
//FloodViewThroughArea_r
//===================
//*/
//void idRenderWorldLocal::FloodViewThroughArea_r( const idVec3 origin, int areaNum, 
//								 const struct portalStack_s *ps ) {
//	portal_t*		p;
//	float			d;
//	portalArea_t *	area;
//	const portalStack_t	*check;
//	portalStack_t	newStack;
//	int				i, j;
//	idVec3			v1, v2;
//	int				addPlanes;
//	idFixedWinding	w;		// we won't overflow because MAX_PORTAL_PLANES = 20
//
//	area = &this.portalAreas[ areaNum ];
//
//	// cull models and lights to the current collection of planes
//	AddAreaRefs( areaNum, ps );
//
//	if ( areaScreenRect[areaNum].IsEmpty() ) {
//		areaScreenRect[areaNum] = ps.rect;
//	} else {
//		areaScreenRect[areaNum].Union( ps.rect );
//	}
//
//	// go through all the portals
//	for ( p = area.portals; p; p = p.next ) {
//		// an enclosing door may have sealed the portal off
//		if ( p.doublePortal.blockingBits & PS_BLOCK_VIEW ) {
//			continue;
//		}
//
//		// make sure this portal is facing away from the view
//		d = p.plane.Distance( origin );
//		if ( d < -0.1f ) {
//			continue;
//		}
//
//		// make sure the portal isn't in our stack trace,
//		// which would cause an infinite loop
//		for ( check = ps; check; check = check.next ) {
//			if ( check.p == p ) {
//				break;		// don't recursively enter a stack
//			}
//		}
//		if ( check ) {
//			continue;	// already in stack
//		}
//
//		// if we are very close to the portal surface, don't bother clipping
//		// it, which tends to give epsilon problems that make the area vanish
//		if ( d < 1.0f ) {
//
//			// go through this portal
//			newStack = *ps;
//			newStack.p = p;
//			newStack.next = ps;
//			FloodViewThroughArea_r( origin, p.intoArea, &newStack );
//			continue;
//		}
//
//		// clip the portal winding to all of the planes
//		w = *p.w;
//		for ( j = 0; j < ps.numPortalPlanes; j++ ) {
//			if ( !w.ClipInPlace( -ps.portalPlanes[j], 0 ) ) {
//				break;
//			}
//		}
//		if ( !w.GetNumPoints() ) {
//			continue;	// portal not visible
//		}
//
//		// see if it is fogged out
//		if ( PortalIsFoggedOut( p ) ) {
//			continue;
//		}
//
//		// go through this portal
//		newStack.p = p;
//		newStack.next = ps;
//
//		// find the screen pixel bounding box of the remaining portal
//		// so we can scissor things outside it
//		newStack.rect = ScreenRectFromWinding( &w, &tr.identitySpace );
//		
//		// slop might have spread it a pixel outside, so trim it back
//		newStack.rect.Intersect( ps.rect );
//
//		// generate a set of clipping planes that will further restrict
//		// the visible view beyond just the scissor rect
//
//		addPlanes = w.GetNumPoints();
//		if ( addPlanes > MAX_PORTAL_PLANES ) {
//			addPlanes = MAX_PORTAL_PLANES;
//		}
//
//		newStack.numPortalPlanes = 0;
//		for ( i = 0; i < addPlanes; i++ ) {
//			j = i+1;
//			if ( j == w.GetNumPoints() ) {
//				j = 0;
//			}
//
//			v1 = origin - w[i].ToVec3();
//			v2 = origin - w[j].ToVec3();
//
//			newStack.portalPlanes[newStack.numPortalPlanes].Normal().Cross( v2, v1 );
//
//			// if it is degenerate, skip the plane
//			if ( newStack.portalPlanes[newStack.numPortalPlanes].Normalize() < 0.01f ) {
//				continue;
//			}
//			newStack.portalPlanes[newStack.numPortalPlanes].FitThroughPoint( origin );
//
//			newStack.numPortalPlanes++;
//		}
//
//		// the last stack plane is the portal plane
//		newStack.portalPlanes[newStack.numPortalPlanes] = p.plane;
//		newStack.numPortalPlanes++;
//
//		FloodViewThroughArea_r( origin, p.intoArea, &newStack );
//	}
//}
//
///*
//=======================
//FlowViewThroughPortals
//
//Finds viewLights and viewEntities by flowing from an origin through the visible portals.
//origin point can see into.  The planes array defines a volume (positive
//sides facing in) that should contain the origin, such as a view frustum or a point light box.
//Zero planes assumes an unbounded volume.
//=======================
//*/
//void idRenderWorldLocal::FlowViewThroughPortals( const idVec3 origin, int numPlanes, const idPlane *planes ) {
//	portalStack_t	ps;
//	int				i;
//
//	ps.next = NULL;
//	ps.p = NULL;
//
//	for ( i = 0 ; i < numPlanes ; i++ ) {
//		ps.portalPlanes[i] = planes[i];
//	}
//
//	ps.numPortalPlanes = numPlanes;
//	ps.rect = tr.viewDef.scissor;
//
//	if ( tr.viewDef.areaNum < 0 ){
//
//		for ( i = 0; i < this.numPortalAreas; i++ ) {
//			areaScreenRect[i] = tr.viewDef.scissor;
//		}
//
//		// if outside the world, mark everything
//		for ( i = 0 ; i < this.numPortalAreas ; i++ ) {
//			AddAreaRefs( i, &ps );
//		}
//	} else {
//
//		for ( i = 0; i < this.numPortalAreas; i++ ) {
//			areaScreenRect[i].Clear();
//		}
//
//		// flood out through portals, setting area viewCount
//		FloodViewThroughArea_r( origin, tr.viewDef.areaNum, &ps );
//	}
//}
//
////==================================================================================================
//
//
///*
//===================
//FloodLightThroughArea_r
//===================
//*/
//void idRenderWorldLocal::FloodLightThroughArea_r( idRenderLightLocal *light, int areaNum, 
//								 const struct portalStack_s *ps ) {
//	portal_t*		p;
//	float			d;
//	portalArea_t *	area;
//	const portalStack_t	*check, *firstPortalStack;
//	portalStack_t	newStack;
//	int				i, j;
//	idVec3			v1, v2;
//	int				addPlanes;
//	idFixedWinding	w;		// we won't overflow because MAX_PORTAL_PLANES = 20
//
//	area = &this.portalAreas[ areaNum ];
//
//	// add an areaRef
//	AddLightRefToArea( light, area );	
//
//	// go through all the portals
//	for ( p = area.portals; p; p = p.next ) {
//		// make sure this portal is facing away from the view
//		d = p.plane.Distance( light.globalLightOrigin );
//		if ( d < -0.1f ) {
//			continue;
//		}
//
//		// make sure the portal isn't in our stack trace,
//		// which would cause an infinite loop
//		for ( check = ps; check; check = check.next ) {
//			firstPortalStack = check;
//			if ( check.p == p ) {
//				break;		// don't recursively enter a stack
//			}
//		}
//		if ( check ) {
//			continue;	// already in stack
//		}
//
//		// if we are very close to the portal surface, don't bother clipping
//		// it, which tends to give epsilon problems that make the area vanish
//		if ( d < 1.0f ) {
//			// go through this portal
//			newStack = *ps;
//			newStack.p = p;
//			newStack.next = ps;
//			FloodLightThroughArea_r( light, p.intoArea, &newStack );
//			continue;
//		}
//
//		// clip the portal winding to all of the planes
//		w = *p.w;
//		for ( j = 0; j < ps.numPortalPlanes; j++ ) {
//			if ( !w.ClipInPlace( -ps.portalPlanes[j], 0 ) ) {
//				break;
//			}
//		}
//		if ( !w.GetNumPoints() ) {
//			continue;	// portal not visible
//		}
//		// also always clip to the original light planes, because they aren't
//		// necessarily extending to infinitiy like a view frustum
//		for ( j = 0; j < firstPortalStack.numPortalPlanes; j++ ) {
//			if ( !w.ClipInPlace( -firstPortalStack.portalPlanes[j], 0 ) ) {
//				break;
//			}
//		}
//		if ( !w.GetNumPoints() ) {
//			continue;	// portal not visible
//		}
//
//		// go through this portal
//		newStack.p = p;
//		newStack.next = ps;
//
//		// generate a set of clipping planes that will further restrict
//		// the visible view beyond just the scissor rect
//
//		addPlanes = w.GetNumPoints();
//		if ( addPlanes > MAX_PORTAL_PLANES ) {
//			addPlanes = MAX_PORTAL_PLANES;
//		}
//
//		newStack.numPortalPlanes = 0;
//		for ( i = 0; i < addPlanes; i++ ) {
//			j = i+1;
//			if ( j == w.GetNumPoints() ) {
//				j = 0;
//			}
//
//			v1 = light.globalLightOrigin - w[i].ToVec3();
//			v2 = light.globalLightOrigin - w[j].ToVec3();
//
//			newStack.portalPlanes[newStack.numPortalPlanes].Normal().Cross( v2, v1 );
//
//			// if it is degenerate, skip the plane
//			if ( newStack.portalPlanes[newStack.numPortalPlanes].Normalize() < 0.01f ) {
//				continue;
//			}
//			newStack.portalPlanes[newStack.numPortalPlanes].FitThroughPoint( light.globalLightOrigin );
//
//			newStack.numPortalPlanes++;
//		}
//
//		FloodLightThroughArea_r( light, p.intoArea, &newStack );
//	}
//}
//
//
///*
//=======================
//FlowLightThroughPortals
//
//Adds an arearef in each area that the light center flows into.
//This can only be used for shadow casting lights that have a generated
//prelight, because shadows are cast from back side which may not be in visible areas.
//=======================
//*/
//void idRenderWorldLocal::FlowLightThroughPortals( idRenderLightLocal *light ) {
//	portalStack_t	ps;
//	int				i;
//	const idVec3 origin = light.globalLightOrigin;
//
//	// if the light origin areaNum is not in a valid area,
//	// the light won't have any area refs
//	if ( light.areaNum == -1 ) {
//		return;
//	}
//
//	memset( &ps, 0, sizeof( ps ) );
//
//	ps.numPortalPlanes = 6;
//	for ( i = 0 ; i < 6 ; i++ ) {
//		ps.portalPlanes[i] = light.frustum[i];
//	}
//
//	FloodLightThroughArea_r( light, light.areaNum, &ps );
//}
//
////======================================================================================================
//
///*
//===================
//idRenderWorldLocal::FloodFrustumAreas_r
//===================
//*/
//areaNumRef_t *idRenderWorldLocal::FloodFrustumAreas_r( const idFrustum &frustum, const int areaNum, const idBounds &bounds, areaNumRef_t *areas ) {
//	portal_t *p;
//	portalArea_t *portalArea;
//	idBounds newBounds;
//	areaNumRef_t *a;
//
//	portalArea = &this.portalAreas[ areaNum ];
//
//	// go through all the portals
//	for ( p = portalArea.portals; p; p = p.next ) {
//
//		// check if we already visited the area the portal leads to
//		for ( a = areas; a; a = a.next ) {
//			if ( a.areaNum == p.intoArea ) {
//				break;
//			}
//		}
//		if ( a ) {
//			continue;
//		}
//
//		// the frustum origin must be at the front of the portal plane
//		if ( p.plane.Side( frustum.GetOrigin(), 0.1f ) == SIDE_BACK ) {
//			continue;
//		}
//
//		// the frustum must cross the portal plane
//		if ( frustum.PlaneSide( p.plane, 0.0 ) != PLANESIDE_CROSS ) {
//			continue;
//		}
//
//		// get the bounds for the portal winding projected in the frustum
//		frustum.ProjectionBounds( *p.w, newBounds );
//
//		newBounds.IntersectSelf( bounds );
//
//		if ( newBounds[0][0] > newBounds[1][0] || newBounds[0][1] > newBounds[1][1] || newBounds[0][2] > newBounds[1][2] ) {
//			continue;
//		}
//
//		newBounds[1][0] = frustum.GetFarDistance();
//
//		a = areaNumRefAllocator.Alloc();
//		a.areaNum = p.intoArea;
//		a.next = areas;
//		areas = a;
//
//		areas = FloodFrustumAreas_r( frustum, p.intoArea, newBounds, areas );
//	}
//
//	return areas;
//}
//
///*
//===================
//idRenderWorldLocal::FloodFrustumAreas
//
//  Retrieves all the portal areas the frustum floods into where the frustum starts in the given areas.
//  All portals are assumed to be open.
//===================
//*/
//areaNumRef_t *idRenderWorldLocal::FloodFrustumAreas( const idFrustum &frustum, areaNumRef_t *areas ) {
//	idBounds bounds;
//	areaNumRef_t *a;
//
//	// bounds that cover the whole frustum
//	bounds[0].Set( frustum.GetNearDistance(), -1.0f, -1.0f );
//	bounds[1].Set( frustum.GetFarDistance(), 1.0f, 1.0f );
//
//	for ( a = areas; a; a = a.next ) {
//		areas = FloodFrustumAreas_r( frustum, a.areaNum, bounds, areas );
//	}
//
//	return areas;
//}
//
//
///*
//=======================================================================
//
//R_FindViewLightsAndEntities
//
//=======================================================================
//*/
//
///*
//================
//CullEntityByPortals
//
//Return true if the entity reference bounds do not intersect the current portal chain.
//================
//*/
//bool idRenderWorldLocal::CullEntityByPortals( const idRenderEntityLocal *entity, const portalStack_t *ps ) {
//
//	if ( !r_useEntityCulling.GetBool() ) {
//		return false;
//	}
//
//	// try to cull the entire thing using the reference bounds.
//	// we do not yet do callbacks or dynamic model creation,
//	// because we want to do all touching of the model after
//	// we have determined all the lights that may effect it,
//	// which optimizes cache usage
//	if ( R_CullLocalBox( entity.referenceBounds, entity.modelMatrix,
//							ps.numPortalPlanes, ps.portalPlanes ) ) {
//		return true;
//	}
//
//	return false;
//}
//
///*
//===================
//AddAreaEntityRefs
//
//Any models that are visible through the current portalStack will
//have their scissor 
//===================
//*/
//void idRenderWorldLocal::AddAreaEntityRefs( int areaNum, const portalStack_t *ps ) {
//	areaReference_t		*ref;
//	idRenderEntityLocal	*entity;
//	portalArea_t		*area;
//	viewEntity_t		*vEnt;
//	idBounds			b;
//
//	area = &this.portalAreas[ areaNum ];
//
//	for ( ref = area.entityRefs.areaNext ; ref != &area.entityRefs ; ref = ref.areaNext ) {
//		entity = ref.entity;
//
//		// debug tool to allow viewing of only one entity at a time
//		if ( r_singleEntity.GetInteger() >= 0 && r_singleEntity.GetInteger() != entity.index ) {
//			continue;
//		}
//
//		// remove decals that are completely faded away
//		R_FreeEntityDefFadedDecals( entity, tr.viewDef.renderView.time );
//
//		// check for completely suppressing the model
//		if ( !r_skipSuppress.GetBool() ) {
//			if ( entity.parms.suppressSurfaceInViewID
//					&& entity.parms.suppressSurfaceInViewID == tr.viewDef.renderView.viewID ) {
//				continue;
//			}
//			if ( entity.parms.allowSurfaceInViewID 
//					&& entity.parms.allowSurfaceInViewID != tr.viewDef.renderView.viewID ) {
//				continue;
//			}
//		}
//
//		// cull reference bounds
//		if ( CullEntityByPortals( entity, ps ) ) {
//			// we are culled out through this portal chain, but it might
//			// still be visible through others
//			continue;
//		}
//
//		vEnt = R_SetEntityDefViewEntity( entity );
//
//		// possibly expand the scissor rect
//		vEnt.scissorRect.Union( ps.rect );
//	}
//}
//
///*
//================
//CullLightByPortals
//
//Return true if the light frustum does not intersect the current portal chain.
//The last stack plane is not used because lights are not near clipped.
//================
//*/
//bool idRenderWorldLocal::CullLightByPortals( const idRenderLightLocal *light, const portalStack_t *ps ) {
//	int				i, j;
//	const srfTriangles_t	*tri;
//	float			d;
//	idFixedWinding	w;		// we won't overflow because MAX_PORTAL_PLANES = 20
//
//	if ( r_useLightCulling.GetInteger() == 0 ) {
//		return false;
//	}
//
//	if ( r_useLightCulling.GetInteger() >= 2 ) {
//		// exact clip of light faces against all planes
//		for ( i = 0; i < 6; i++ ) {
//			// the light frustum planes face out from the light,
//			// so the planes that have the view origin on the negative
//			// side will be the "back" faces of the light, which must have
//			// some fragment inside the portalStack to be visible
//			if ( light.frustum[i].Distance( tr.viewDef.renderView.vieworg ) >= 0 ) {
//				continue;
//			}
//
//			// get the exact winding for this side
//			const idWinding *ow = light.frustumWindings[i];
//
//			// projected lights may have one of the frustums degenerated
//			if ( !ow ) {
//				continue;
//			}
//
//			w = *ow;
//
//			// now check the winding against each of the portalStack planes
//			for ( j = 0; j < ps.numPortalPlanes - 1; j++ ) {
//				if ( !w.ClipInPlace( -ps.portalPlanes[j] ) ) {
//					break;
//				}
//			}
//
//			if ( w.GetNumPoints() ) {
//				// part of the winding is visible through the portalStack,
//				// so the light is not culled
//				return false;
//			}
//		}
//		// none of the light surfaces were visible
//		return true;
//
//	} else {
//
//		// simple point check against each plane
//		tri = light.frustumTris;
//
//		// check against frustum planes
//		for ( i = 0; i < ps.numPortalPlanes - 1; i++ ) {
//			for ( j = 0; j < tri.numVerts; j++ ) {
//				d = ps.portalPlanes[i].Distance( tri.verts[j].xyz );
//				if ( d < 0.0 ) {
//					break;	// point is inside this plane
//				}
//			}
//			if ( j == tri.numVerts ) {
//				// all points were outside one of the planes
//				tr.pc.c_box_cull_out++;
//				return true;
//			}
//		}
//	}
//
//	return false;
//}
//
///*
//===================
//AddAreaLightRefs
//
//This is the only point where lights get added to the viewLights list
//===================
//*/
//void idRenderWorldLocal::AddAreaLightRefs( int areaNum, const portalStack_t *ps ) {
//	areaReference_t		*lref;
//	portalArea_t		*area;
//	idRenderLightLocal			*light;
//	viewLight_t			*vLight;
//
//	area = &this.portalAreas[ areaNum ];
//
//	for ( lref = area.lightRefs.areaNext ; lref != &area.lightRefs ; lref = lref.areaNext ) {
//		light = lref.light;
//
//		// debug tool to allow viewing of only one light at a time
//		if ( r_singleLight.GetInteger() >= 0 && r_singleLight.GetInteger() != light.index ) {
//			continue;
//		}
//
//		// check for being closed off behind a door
//		// a light that doesn't cast shadows will still light even if it is behind a door
//		if ( r_useLightCulling.GetInteger() >= 3 &&
//				!light.parms.noShadows && light.lightShader.LightCastsShadows()
//					&& light.areaNum != -1 && !tr.viewDef.connectedAreas[ light.areaNum ] ) {
//			continue;
//		}
//
//		// cull frustum
//		if ( CullLightByPortals( light, ps ) ) {
//			// we are culled out through this portal chain, but it might
//			// still be visible through others
//			continue;
//		}
//
//		vLight = R_SetLightDefViewLight( light );
//
//		// expand the scissor rect
//		vLight.scissorRect.Union( ps.rect );
//	}
//}
//
///*
//===================
//AddAreaRefs
//
//This may be entered multiple times with different planes
//if more than one portal sees into the area
//===================
//*/
//void idRenderWorldLocal::AddAreaRefs( int areaNum, const portalStack_t *ps ) {
//	// mark the viewCount, so r_showPortals can display the
//	// considered portals
//	this.portalAreas[ areaNum ].viewCount = tr.viewCount;
//
//	// add the models and lights, using more precise culling to the planes
//	AddAreaEntityRefs( areaNum, ps );
//	AddAreaLightRefs( areaNum, ps );
//}
//
///*
//===================
//BuildConnectedAreas_r
//===================
//*/
//void idRenderWorldLocal::BuildConnectedAreas_r( int areaNum ) {
//	portalArea_t	*area;
//	portal_t		*portal;
//
//	if ( tr.viewDef.connectedAreas[areaNum] ) {
//		return;
//	}
//
//	tr.viewDef.connectedAreas[areaNum] = true;
//
//	// flood through all non-blocked portals
//	area = &this.portalAreas[ areaNum ];
//	for ( portal = area.portals ; portal ; portal = portal.next ) {
//		if ( !(portal.doublePortal.blockingBits & PS_BLOCK_VIEW) ) {
//			BuildConnectedAreas_r( portal.intoArea );
//		}
//	}
//}
//
///*
//===================
//BuildConnectedAreas
//
//This is only valid for a given view, not all views in a frame
//===================
//*/
//void idRenderWorldLocal::BuildConnectedAreas( void ) {
//	int		i;
//
//	tr.viewDef.connectedAreas = (bool *)R_FrameAlloc( this.numPortalAreas
//		* sizeof( tr.viewDef.connectedAreas[0] ) );
//
//	// if we are outside the world, we can see all areas
//	if ( tr.viewDef.areaNum == -1 ) {
//		for ( i = 0 ; i < this.numPortalAreas ; i++ ) {
//			tr.viewDef.connectedAreas[i] = true;
//		}
//		return;
//	}
//
//	// start with none visible, and flood fill from the current area
//	memset( tr.viewDef.connectedAreas, 0, this.numPortalAreas * sizeof( tr.viewDef.connectedAreas[0] ) );
//	BuildConnectedAreas_r( tr.viewDef.areaNum );
//}
//
///*
//=============
//FindViewLightsAndEntites
//
//All the modelrefs and lightrefs that are in visible areas
//will have viewEntitys and viewLights created for them.
//
//The scissorRects on the viewEntitys and viewLights may be empty if
//they were considered, but not actually visible.
//=============
//*/
//void idRenderWorldLocal::FindViewLightsAndEntities( void ) {
//	// clear the visible lightDef and entityDef lists
//	tr.viewDef.viewLights = NULL;
//	tr.viewDef.viewEntitys = NULL;
//
//	// find the area to start the portal flooding in
//	if ( !r_usePortals.GetBool() ) {
//		// debug tool to force no portal culling
//		tr.viewDef.areaNum = -1;
//	} else {
//		tr.viewDef.areaNum = PointInArea( tr.viewDef.initialViewAreaOrigin );
//	}
//
//	// determine all possible connected areas for
//	// light-behind-door culling
//	BuildConnectedAreas();
//
//	// bump the view count, invalidating all
//	// visible areas
//	tr.viewCount++;
//
//	// flow through all the portals and add models / lights
//	if ( r_singleArea.GetBool() ) {
//		// if debugging, only mark this area
//		// if we are outside the world, don't draw anything
//		if ( tr.viewDef.areaNum >= 0 ) {
//			portalStack_t	ps;
//			int				i;
//			static int lastPrintedAreaNum;
//
//			if ( tr.viewDef.areaNum != lastPrintedAreaNum ) {
//				lastPrintedAreaNum = tr.viewDef.areaNum;
//				common.Printf( "entering portal area %i\n", tr.viewDef.areaNum );
//			}
//
//			for ( i = 0 ; i < 5 ; i++ ) {
//				ps.portalPlanes[i] = tr.viewDef.frustum[i];
//			}
//			ps.numPortalPlanes = 5;
//			ps.rect = tr.viewDef.scissor;
//
//			AddAreaRefs( tr.viewDef.areaNum, &ps );
//		}
//	} else {
//		// note that the center of projection for flowing through portals may
//		// be a different point than initialViewAreaOrigin for subviews that
//		// may have the viewOrigin in a solid/invalid area
//		FlowViewThroughPortals( tr.viewDef.renderView.vieworg, 5, tr.viewDef.frustum );
//	}
//}
//
///*
//==============
//NumPortals
//==============
//*/
//int idRenderWorldLocal::NumPortals( void ) const {
//	return this.numInterAreaPortals;
//}

/*
==============
FindPortal

Game code uses this to identify which portals are inside doors.
Returns 0 if no portal contacts the bounds
==============
*/
	FindPortal ( b: idBounds ): number /*qhandle_t*/ {
		var /*int				*/i: number, j: number;
		var wb = new idBounds;
		var portal: doublePortal_t;
		var w: idWinding;

		for ( i = 0; i < this.numInterAreaPortals; i++ ) {
			portal = this.doublePortals[i];
			w = portal.portals[0].w;

			wb.Clear ( );
			for ( j = 0; j < w.GetNumPoints ( ); j++ ) {
				wb.AddPoint( ( /* * */w )[j].ToVec3 ( ) );
			}
			if ( wb.IntersectsBounds( b ) ) {
				return i + 1;
			}
		}

		return 0;
	}

/*
=============
FloodConnectedAreas
=============
*/
	FloodConnectedAreas ( area: portalArea_t, /*int */portalAttributeIndex: number ): void {
		if ( area.connectedAreaNum[portalAttributeIndex] == this.connectedAreaNum ) {
			return;
		}
		area.connectedAreaNum[portalAttributeIndex] = this.connectedAreaNum;

		for ( var p = area.portals; p; p = p.next ) {
			if ( !( p.doublePortal.blockingBits & ( 1 << portalAttributeIndex ) ) ) {
				this.FloodConnectedAreas( this.portalAreas[p.intoArea], portalAttributeIndex );
			}
		}
	}

/*
==============
AreasAreConnected

==============
*/
	AreasAreConnected ( /*int */areaNum1: number, /*int */areaNum2: number, connection: portalConnection_t ): boolean {
		if ( areaNum1 == -1 || areaNum2 == -1 ) {
			return false;
		}

		if ( areaNum1 > this.numPortalAreas || areaNum2 > this.numPortalAreas || areaNum1 < 0 || areaNum2 < 0 ) {
			common.Error( "idRenderWorldLocal::AreAreasConnected: bad parms: %i, %i", areaNum1, areaNum2 );
		}

		var attribute = 0;

		var intConnection = int( connection );

		while ( intConnection > 1 ) {
			attribute++;
			intConnection >>= 1;
		}
		if ( attribute >= NUM_PORTAL_ATTRIBUTES || ( 1 << attribute ) != int( connection ) ) {
			common.Error( "idRenderWorldLocal::AreasAreConnected: bad connection number: %i\n", int( connection ) );
		}

		return this.portalAreas[areaNum1].connectedAreaNum[attribute] == this.portalAreas[areaNum2].connectedAreaNum[attribute];
	}

//
///*
//==============
//SetPortalState
//
//doors explicitly close off portals when shut
//==============
//*/
//void		idRenderWorldLocal::SetPortalState( qhandle_t portal, int blockTypes ) {
//	if ( portal == 0 ) {
//		return;
//	}
//
//	if ( portal < 1 || portal > this.numInterAreaPortals ) {
//		common.Error( "SetPortalState: bad portal number %i", portal );
//	}
//	int	old = this.doublePortals[portal-1].blockingBits;
//	if ( old == blockTypes ) {
//		return;
//	}
//	this.doublePortals[portal-1].blockingBits = blockTypes;
//
//	// leave the connectedAreaGroup the same on one side,
//	// then flood fill from the other side with a new number for each changed attribute
//	for ( int i = 0 ; i < NUM_PORTAL_ATTRIBUTES ; i++ ) {
//		if ( ( old ^ blockTypes ) & ( 1 << i ) ) {
//			connectedAreaNum++;
//			FloodConnectedAreas( &this.portalAreas[this.doublePortals[portal-1].portals[1].intoArea], i );
//		}
//	}
//
//	if ( session.writeDemo ) {
//		session.writeDemo.WriteInt( DS_RENDER );
//		session.writeDemo.WriteInt( DC_SET_PORTAL_STATE );
//		session.writeDemo.WriteInt( portal );
//		session.writeDemo.WriteInt( blockTypes );
//	}
//}
//
///*
//==============
//GetPortalState
//==============
//*/
//int		idRenderWorldLocal::GetPortalState( qhandle_t portal ) {
//	if ( portal == 0 ) {
//		return 0;
//	}
//
//	if ( portal < 1 || portal > this.numInterAreaPortals ) {
//		common.Error( "GetPortalState: bad portal number %i", portal );
//	}
//
//	return this.doublePortals[portal-1].blockingBits;
//}
//
///*
//=====================
//idRenderWorldLocal::ShowPortals
//
//Debugging tool, won't work correctly with SMP or when mirrors are present
//=====================
//*/
//void idRenderWorldLocal::ShowPortals() {
//#if !defined(GL_ES_VERSION_2_0)	/* XXX */
//	int			i, j;
//	portalArea_t	*area;
//	portal_t	*p;
//	idWinding	*w;
//
//	// flood out through portals, setting area viewCount
//	for ( i = 0 ; i < this.numPortalAreas ; i++ ) {
//		area = &this.portalAreas[i];
//		if ( area.viewCount != tr.viewCount ) {
//			continue;
//		}
//		for ( p = area.portals ; p ; p = p.next ) {
//			w = p.w;
//			if ( !w ) {
//				continue;
//			}
//
//			if ( this.portalAreas[ p.intoArea ].viewCount != tr.viewCount ) {
//				// red = can't see
//				glColor3f( 1, 0, 0 );
//			} else {
//				// green = see through
//				glColor3f( 0, 1, 0 );
//			}
//
//			glBegin( GL_LINE_LOOP );
//			for ( j = 0 ; j < w.GetNumPoints() ; j++ ) {
//				glVertex3fv( (*w)[j].ToFloatPtr() );
//			}
//			glEnd();
//		}
//	}
//#endif
//}

































}
///*
//===============
//R_GlobalShaderOverride
//===============
//*/
//bool R_GlobalShaderOverride( const idMaterial **shader ) {
//
//	if ( !(*shader).IsDrawn() ) {
//		return false;
//	}
//
//	if ( tr.primaryRenderView.globalMaterial ) {
//		*shader = tr.primaryRenderView.globalMaterial;
//		return true;
//	}
//
//	if ( r_materialOverride.GetString()[0] != '\0' ) {
//		*shader = declManager.FindMaterial( r_materialOverride.GetString() );
//		return true;
//	}
//	
//	return false;
//}
//
///*
//===============
//R_RemapShaderBySkin
//===============
//*/
//const idMaterial *R_RemapShaderBySkin( const idMaterial *shader, const idDeclSkin *skin, const idMaterial *customShader ) {
//
//	if ( !shader ) {
//		return NULL;
//	}
//
//	// never remap surfaces that were originally nodraw, like collision hulls
//	if ( !shader.IsDrawn() ) {
//		return shader;
//	}
//
//	if ( customShader ) {
//		// this is sort of a hack, but cause deformed surfaces to map to empty surfaces,
//		// so the item highlight overlay doesn't highlight the autosprite surface
//		if ( shader.Deform() ) {
//			return NULL;
//		}
//		return const_cast<idMaterial *>(customShader);
//	}
//
//	if ( !skin || !shader ) {
//		return const_cast<idMaterial *>(shader);
//	}
//
//	return skin.RemapShaderBySkin( shader );
//}
