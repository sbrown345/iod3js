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
//#ifndef __RENDERWORLD_H__
//#define __RENDERWORLD_H__
//
///*
//===============================================================================
//
//	Render World
//
//===============================================================================
//*/
//
var PROC_FILE_EXT = "proc";
var PROC_FILE_ID = "mapProcFile003";

// shader parms
var MAX_GLOBAL_SHADER_PARMS	= 12;

var SHADERPARM_RED			= 0;
var SHADERPARM_GREEN			= 1;
var SHADERPARM_BLUE			= 2;
var SHADERPARM_ALPHA			= 3;
var SHADERPARM_TIMESCALE		= 3;
var SHADERPARM_TIMEOFFSET		= 4;
var SHADERPARM_DIVERSITY		= 5;	// random between 0.0 and 1.0 for some effects (muzzle flashes, etc)
var SHADERPARM_MODE			= 7;	// for selecting which shader passes to enable
var SHADERPARM_TIME_OF_DEATH	= 7;	// for the monster skin-burn-away effect enable and time offset

// model parms
var SHADERPARM_MD5_SKINSCALE	= 8;	// for scaling vertex offsets on md5 models (jack skellington effect)

var SHADERPARM_MD3_FRAME		= 8;
var SHADERPARM_MD3_LASTFRAME	= 9;
var SHADERPARM_MD3_BACKLERP	= 10;

var SHADERPARM_BEAM_END_X		= 8;	// for _beam models
var SHADERPARM_BEAM_END_Y		= 9;
var SHADERPARM_BEAM_END_Z		= 10;
var SHADERPARM_BEAM_WIDTH		= 11;

var SHADERPARM_SPRITE_WIDTH		= 8;
var SHADERPARM_SPRITE_HEIGHT		= 9;

var SHADERPARM_PARTICLE_STOPTIME = 8;	// don't spawn any more particles after this time

// guis
var MAX_RENDERENTITY_GUI		= 3;

//
//typedef bool(*deferredEntityCallback_t)( renderEntity_s *, const renderView_s * );
//
//
class renderEntity_t {
	hModel: idRenderModel; // this can only be null if callback is set

	entityNum: number; //int						
	bodyId: number; //int						

	// Entities that are expensive to generate, like skeletal models, can be
	// deferred until their bounds are found to be in view, in the frustum
	// of a shadowing light that is in view, or contacted by a trace / overlay test.
	// This is also used to do visual cueing on items in the view
	// The renderView may be NULL if the callback is being issued for a non-view related
	// source.
	// The callback function should clear renderEntity->callback if it doesn't
	// want to be called again next time the entity is referenced (ie, if the
	// callback has now made the entity valid until the next updateEntity)
	bounds = new idBounds; // only needs to be set for deferred models and md5s
	callback: ( renderEntity: renderEntity_t, renderView: renderView_t ) => boolean /*deferredEntityCallback_t*/;

	callbackData: any; // used for whatever the callback wants

	// player bodies and possibly player shadows should be suppressed in views from
	// that player's eyes, but will show up in mirrors and other subviews
	// security cameras could suppress their model in their subviews if we add a way
	// of specifying a view number for a remoteRenderMap view
	suppressSurfaceInViewID: number; //int
	suppressShadowInViewID: number; //int

	// world models for the player and weapons will not cast shadows from view weapon
	// muzzle flashes
	suppressShadowInLightID: number; //int

	// if non-zero, the surface and shadow (if it casts one)
	// will only show up in the specific view, ie: player weapons
	allowSurfaceInViewID: number; //int

	// positioning
	// axis rotation vectors must be unit length for many
	// R_LocalToGlobal functions to work, so don't scale models!
	// axis vectors are [0] = forward, [1] = left, [2] = up
	origin = new idVec3;
	axis = new idMat3;

	// texturing
	customShader: idMaterial; // if non-0, all surfaces will use this											  //const idMaterial *		
	referenceShader: idMaterial; // used so flares can reference the proper light shader							  //const idMaterial *		
	customSkin: idDeclSkin; // 0 for no remappings															  //const idDeclSkin *		
	referenceSound: idSoundEmitter; // for shader sound tables, allowing effects to vary with sounds				  //class idSoundEmitter *	
	shaderParms = new Float32Array( MAX_ENTITY_SHADER_PARMS ) // can be used in any way by shader or model generation			  //float					

	// networking: see WriteGUIToSnapshot / ReadGUIFromSnapshot
	gui = new Array<idUserInterface>( MAX_RENDERENTITY_GUI );
	//
	remoteRenderView: renderView_t; // any remote camera surfaces will use this								//struct renderView_s	*	
	//
	numJoints: number; //int						
	joints: idJointMat[]; // array of joints that will modify vertices.							//idJointMat *			
	// NULL if non-deformable model.  NOT freed by renderer					//						
	//
	modelDepthHack: number; // squash depth range so particle effects don't clip into walls			//float					

	// options to override surface shader flags (replace with material parameters?)
	noSelfShadow: boolean; // cast shadows onto other objects,but not self											   //bool					
	noShadow: boolean; // no shadow at all																		   //bool					
	//
	noDynamicInteractions: boolean; // don't create any light / shadow interactions after									   //bool					
	// the level load is completed.  This is a performance hack								   //						
	// for the gigantic outdoor meshes in the monorail map, so								   //						
	// all the lights in the moving monorail don't touch the meshes							   //						
	//
	weaponDepthHack: boolean; // squash depth range so view weapons don't poke into walls								   //bool					
	// this automatically implies noShadow													   //						
	forceUpdate: number; // force an update (NOTE: not a bool to keep this struct a multiple of 4 bytes)			   //int						
	timeGroup: number; //int						
	xrayIndex: number; //int						

	constructor ( ) {
		this.memset0 ( );
	}

	memset0 ( ): void {
		this.hModel = null;
		this.entityNum = 0;
		this.bodyId = 0;
		this.bounds.Zero ( );
		this.callback = null;
		this.callbackData = null;
		this.suppressSurfaceInViewID = 0;
		this.suppressShadowInViewID = 0;
		this.suppressShadowInLightID = 0;
		this.allowSurfaceInViewID = 0;
		this.origin.Zero ( );
		this.axis.Identity ( );
		this.customShader = null;
		this.referenceShader = null;
		this.customSkin = null;
		this.referenceSound = null;
		for ( var i = 0; i < this.shaderParms.length; i++ ) {
			this.shaderParms[i] = 0;
		}
		clearPointerArray( this.gui );
		this.remoteRenderView = null;
		this.numJoints = 0;
		this.joints = null;
		this.modelDepthHack = 0;
		this.noSelfShadow = false;
		this.noShadow = false;;
		this.noDynamicInteractions = false;
		this.weaponDepthHack = false;
		this.forceUpdate = 0;
		this.timeGroup = 0;
		this.xrayIndex = 0;
	}

	opEquals ( other: renderEntity_t ): renderEntity_t {
		this.hModel = other.hModel;
		this.entityNum = other.entityNum;
		this.bodyId = other.bodyId;
		this.bounds.opEquals( other.bounds );
		this.callback = other.callback;
		this.callbackData = other.callbackData;
		this.suppressSurfaceInViewID = other.suppressSurfaceInViewID;
		this.suppressShadowInViewID = other.suppressShadowInViewID;
		this.suppressShadowInLightID = other.suppressShadowInLightID;
		this.allowSurfaceInViewID = other.allowSurfaceInViewID;
		this.origin.opEquals( other.origin );
		this.axis.opEquals( other.axis );
		this.customShader = other.customShader;
		this.referenceShader = other.referenceShader;
		this.customSkin = other.customSkin;
		this.referenceSound = other.referenceSound;
		memcpy( this.shaderParms, other.shaderParms, sizeof( this.shaderParms ) );
		for ( var i = 0; i < this.gui.length; i++ ) {
			this.gui[i] = other.gui[i];
		}
		this.remoteRenderView = other.remoteRenderView;
		this.numJoints = other.numJoints;
		this.joints = other.joints;
		this.modelDepthHack = other.modelDepthHack;;
		this.noSelfShadow = other.noSelfShadow;
		this.noShadow = other.noShadow;
		this.noDynamicInteractions = other.noDynamicInteractions;
		this.weaponDepthHack = other.weaponDepthHack;
		this.forceUpdate = other.forceUpdate;
		this.timeGroup = other.timeGroup;
		this.xrayIndex = other.xrayIndex;

		return this;
	}
}


class renderLight_t {
	axis = new idMat3; // rotation vectors, must be unit length
	origin = new idVec3;

	// if non-zero, the light will not show up in the specific view,
	// which may be used if we want to have slightly different muzzle
	// flash lights for the player and other views
	suppressLightInViewID: number /*int*/;

	// if non-zero, the light will only show up in the specific view
	// which can allow player gun gui lights and such to not effect everyone
	allowLightInViewID: number /*int*/;

	// I am sticking the four bools together so there are no unused gaps in
	// the padded structure, which could confuse the memcmp that checks for redundant
	// updates
	noShadows: boolean; // (should we replace this with material parameters on the shader?)
	noSpecular: boolean; // (should we replace this with material parameters on the shader?)

	pointLight: boolean; // otherwise a projection light (should probably invert the sense of this, because points are way more common)
	parallel: boolean; // lightCenter gives the direction to the light at infinity
	lightRadius = new idVec3; // xyz radius for point lights
	lightCenter = new idVec3; // offset the lighting direction for shading and
	// shadows, relative to origin

	// frustum definition for projected lights, all reletive to origin
	// FIXME: we should probably have real plane equations here, and offer
	// a helper function for conversion from this format
	target = new idVec3;
	right = new idVec3;
	up = new idVec3;
	start = new idVec3;
	end = new idVec3;

	// Dmap will generate an optimized shadow volume named _prelight_<lightName>
	// for the light against all the _area* models in the map.  The renderer will
	// ignore this value if the light has been moved after initial creation
	prelightModel: idRenderModel;

	// muzzle flash lights will not cast shadows from player and weapon world models
	lightId: number /*int*/;


	shader: idMaterial; // NULL = either lights/defaultPointLight or lights/defaultProjectedLight
	shaderParms = new Float32Array( MAX_ENTITY_SHADER_PARMS ); // can be used in any way by shader
	referenceSound: idSoundEmitter; // for shader sound tables, allowing effects to vary with sounds

	memset0 ( ): void {
		this.axis.memset0 ( );
		this.origin.memset0 ( );
		this.suppressLightInViewID = 0;
		this.allowLightInViewID = 0;
		this.noShadows = false;
		this.noSpecular = false;
		this.pointLight = false;
		this.parallel = false;
		this.lightRadius.memset0 ( );
		this.lightCenter.memset0 ( );
		this.target.memset0 ( );
		this.right.memset0 ( );
		this.up.memset0 ( );
		this.start.memset0 ( );
		this.end.memset0 ( );
		this.prelightModel = null;
		this.lightId = 0;
		this.shader = null;
		this.shaderParms = new Float32Array( MAX_ENTITY_SHADER_PARMS ); // can be used in any way by shader
		this.referenceSound = null;
	}

	opEquals ( other: renderLight_t ): renderLight_t {
		this.axis.opEquals( other.axis );
		this.origin.opEquals( other.origin );
		this.suppressLightInViewID = other.suppressLightInViewID;
		this.allowLightInViewID = other.allowLightInViewID;
		this.noShadows = other.noShadows;
		this.noSpecular = other.noSpecular;
		this.pointLight = other.pointLight;
		this.parallel = other.parallel;
		this.lightRadius.opEquals( other.lightRadius );
		this.lightCenter.opEquals( other.lightCenter );
		this.target.opEquals( other.target );
		this.right.opEquals( other.right );
		this.up.opEquals( other.up );
		this.start.opEquals( other.start );
		this.end.opEquals( other.end );
		this.prelightModel = other.prelightModel;
		this.lightId = other.lightId;
		this.shader = other.shader;
		this.shaderParms.set( other.shaderParms );
		this.referenceSound = other.referenceSound;

		return this;
	}
}


class renderView_t {
	// player views will set this to a non-zero integer for model suppress / allow
	// subviews (mirrors, cameras, etc) will always clear it to zero
	viewID: number; //0

	// sized from 0 to SCREEN_WIDTH / SCREEN_HEIGHT (640/480), not actual resolution
	x: number;
	y: number;
	width: number;
	height: number; //int						

	fov_x: number;
	fov_y: number; //float					
	vieworg = new idVec3;
	viewaxis = new idMat3; // transformation matrix, view looks down the positive X axis

	cramZNear: boolean; // for cinematics, we want to set ZNear much lower
	forceUpdate: boolean; // for an update 

	// time in milliseconds for shader effects and other time dependent rendering issues
	time: number //int;
	shaderParms = new Float32Array( MAX_GLOBAL_SHADER_PARMS ); // can be used in any way by shader
	globalMaterial: idMaterial; // used to override everything draw

	memset0 ( ): void {
		this.viewID = 0;
		this.x = 0;
		this.y = 0;
		this.width = 0;
		this.height = 0;
		this.fov_x = 0;
		this.fov_y = 0;
		this.vieworg.Zero ( );
		this.viewaxis.Zero ( );
		this.cramZNear = false;
		this.forceUpdate = false;
		this.time = 0;
		memset( this.shaderParms, 0, sizeof( this.shaderParms ) );
		this.globalMaterial = null;
	}
}



// exitPortal_t is returned by idRenderWorld::GetPortal()
class exitPortal_t {
	areas = new Int32Array( 2 ); // areas connected by this portal
	w: idWinding; // winding points have counter clockwise ordering seen from areas[0]
	blockingBits: number /*int*/; // PS_BLOCK_VIEW, PS_BLOCK_AIR, etc
	portalHandle: number /**/;

	memset0 ( ): void {
		this.areas[0] = 0;
		this.areas[1] = 0;
		this.w.memset0();
		this.blockingBits = 0;
		this.portalHandle = 0;
	}
}


//// guiPoint_t is returned by idRenderWorld::GuiTrace()
//typedef struct {
//	float				x, y;			// 0.0 to 1.0 range if trace hit a gui, otherwise -1
//	int					guiId;			// id of gui ( 0, 1, or 2 ) that the trace happened against
//} guiPoint_t;


// modelTrace_t is for tracing vs. visual geometry
class modelTrace_t {
    fraction: number /*float*/; // fraction of trace completed
    point = new idVec3; // end point of trace in global space
    normal = new idVec3; // hit triangle normal vector in global space
    material: idMaterial; // material of hit surface
    entity: renderEntity_t; // render entity that was hit
    jointNumber: number /*int*/; // md5 joint nearest to the hit triangle
}


var NUM_PORTAL_ATTRIBUTES = 3;

enum portalConnection_t{
	PS_BLOCK_NONE = 0,

	PS_BLOCK_VIEW = 1,
	PS_BLOCK_LOCATION = 2,		// game map location strings often stop in hallways
	PS_BLOCK_AIR = 4,			// windows between pressurized and unpresurized areas

	PS_BLOCK_ALL = (1<<NUM_PORTAL_ATTRIBUTES)-1
};


class idRenderWorld {
//public:
//	virtual					~idRenderWorld() {};
//
	// The same render world can be reinitialized as often as desired
//	// a NULL or empty mapName will create an empty, single area world
//	InitFromMap ( mapName: string ): boolean { throw "placeholder"; }
////
////	//-------------- Entity and Light Defs -----------------
////
////	// entityDefs and lightDefs are added to a given world to determine
////	// what will be drawn for a rendered scene.  Most update work is defered
////	// until it is determined that it is actually needed for a given view.
////	virtual	qhandle_t		AddEntityDef( const renderEntity_t *re ) = 0;
////	virtual	void			UpdateEntityDef( qhandle_t entityHandle, const renderEntity_t *re ) = 0;
//	FreeEntityDef ( entityHandle: number/*qhandle_t */): void { throw "placeholder"; }
////	virtual const renderEntity_t *GetRenderEntity( qhandle_t entityHandle ) const = 0;
//
//	virtual	qhandle_t		AddLightDef( const renderLight_t *rlight ) = 0;
//	virtual	void			UpdateLightDef( qhandle_t lightHandle, const renderLight_t *rlight ) = 0;
//	virtual	void			FreeLightDef( qhandle_t lightHandle ) = 0;
//	virtual const renderLight_t *GetRenderLight( qhandle_t lightHandle ) const = 0;
//
//	// Force the generation of all light / surface interactions at the start of a level
//	// If this isn't called, they will all be dynamically generated
//	virtual	void			GenerateAllInteractions() = 0;
//
//	// returns true if this area model needs portal sky to draw
//	virtual bool			CheckAreaForPortalSky( int areaNum ) = 0;
//
//	//-------------- Decals and Overlays  -----------------
//
//	// Creates decals on all world surfaces that the winding projects onto.
//	// The projection origin should be infront of the winding plane.
//	// The decals are projected onto world geometry between the winding plane and the projection origin.
//	// The decals are depth faded from the winding plane to a certain distance infront of the
//	// winding plane and the same distance from the projection origin towards the winding.
//	virtual void			ProjectDecalOntoWorld( const idFixedWinding &winding, const idVec3 &projectionOrigin, const bool parallel, const float fadeDepth, const idMaterial *material, const int startTime ) = 0;
//
//	// Creates decals on static models.
//	virtual void			ProjectDecal( qhandle_t entityHandle, const idFixedWinding &winding, const idVec3 &projectionOrigin, const bool parallel, const float fadeDepth, const idMaterial *material, const int startTime ) = 0;
//
//	// Creates overlays on dynamic models.
//	virtual void			ProjectOverlay( qhandle_t entityHandle, const idPlane localTextureAxis[2], const idMaterial *material ) = 0;
//
//	// Removes all decals and overlays from the given entity def.
//	virtual void			RemoveDecals( qhandle_t entityHandle ) = 0;
//
//	//-------------- Scene Rendering -----------------
//
//	// some calls to material functions use the current renderview time when servicing cinematics.  this function
//	// ensures that any parms accessed (such as time) are properly set.
//	virtual void			SetRenderView( const renderView_t *renderView ) = 0;
//
//	// rendering a scene may actually render multiple subviews for mirrors and portals, and
//	// may render composite textures for gui console screens and light projections
//	// It would also be acceptable to render a scene multiple times, for "rear view mirrors", etc
//	virtual void			RenderScene( const renderView_t *renderView ) = 0;
//
//	//-------------- Portal Area Information -----------------
//
//	// returns the number of portals
//	virtual int				NumPortals( ) const = 0;
//
//	// returns 0 if no portal contacts the bounds
//	// This is used by the game to identify portals that are contained
//	// inside doors, so the connection between areas can be topologically
//	// terminated when the door shuts.
//	virtual	qhandle_t		FindPortal( const idBounds &b ) const = 0;
//
//	// doors explicitly close off portals when shut
//	// multiple bits can be set to block multiple things, ie: ( PS_VIEW | PS_LOCATION | PS_AIR )
//	virtual	void			SetPortalState( qhandle_t portal, int blockingBits ) = 0;
//	virtual int				GetPortalState( qhandle_t portal ) = 0;
//
//	// returns true only if a chain of portals without the given connection bits set
//	// exists between the two areas (a door doesn't separate them, etc)
//	virtual	bool			AreasAreConnected( int areaNum1, int areaNum2, portalConnection_t connection ) = 0;

	// returns the number of portal areas in a map, so game code can build information
	// tables for the different areas
	//NumAreas ( ): number { throw "placeholder"; }
//	// Will return -1 if the point is not in an area, otherwise
//	// it will return 0 <= value < NumAreas()
	PointInArea ( point: idVec3 ): number /*int*/ { throw "placeholder"; }
//
//	// fills the *areas array with the numbers of the areas the bounds cover
//	// returns the total number of areas the bounds cover
//	virtual int				BoundsInAreas( const idBounds &bounds, int *areas, int maxAreas ) const = 0;
//
//	// Used by the sound system to do area flowing
	NumPortalsInArea ( /*int */areaNum: number ): number { throw "placeholder"; }

//	// returns one portal from an area
	GetPortal(/*int*/ areaNum: number, /*int */portalNum: number): exitPortal_t { throw "placeholder"; }
//
//	//-------------- Tracing  -----------------
//
//	// Checks a ray trace against any gui surfaces in an entity, returning the
//	// fraction location of the trace on the gui surface, or -1,-1 if no hit.
//	// This doesn't do any occlusion testing, simply ignoring non-gui surfaces.
//	// start / end are in global world coordinates.
//	virtual guiPoint_t		GuiTrace( qhandle_t entityHandle, const idVec3 start, const idVec3 end ) const = 0;
//
//	// Traces vs the render model, possibly instantiating a dynamic version, and returns true if something was hit
//	virtual bool			ModelTrace( modelTrace_t &trace, qhandle_t entityHandle, start:idVec3, const idVec3 &end, const float radius ) const = 0;
//
//	// Traces vs the whole rendered world. FIXME: we need some kind of material flags.
//	virtual bool			Trace( modelTrace_t &trace, start:idVec3, const idVec3 &end, const float radius, bool skipDynamic = true, bool skipPlayer = false ) const = 0;
//
//	// Traces vs the world model bsp tree.
//	virtual bool			FastWorldTrace( modelTrace_t &trace, start:idVec3, const idVec3 &end ) const = 0;
//
//	//-------------- Demo Control  -----------------
//
//	// Writes a loadmap command to the demo, and clears archive counters.
//	virtual void			StartWritingDemo( idDemoFile *demo ) = 0;
//	virtual void			StopWritingDemo() = 0;
//
//	// Returns true when demoRenderView has been filled in.
//	// adds/updates/frees entityDefs and lightDefs based on the current demo file
//	// and returns the renderView to be used to render this frame.
//	// a demo file may need to be advanced multiple times if the framerate
//	// is less than 30hz
//	// demoTimeOffset will be set if a new map load command was processed before
//	// the next renderScene
//	virtual bool			ProcessDemoCommand( idDemoFile *readDemo, renderView_t *demoRenderView, int *demoTimeOffset ) = 0;
//
//	// this is used to regenerate all interactions ( which is currently only done during influences ), there may be a less 
//	// expensive way to do it
//	virtual void			RegenerateWorld() = 0;

	//-------------- Debug Visualization  -----------------

	// Line drawing for debug visualization
	//DebugClearLines ( /*int*/time: number ): void { throw "placeholder"; } // a time of 0 will clear all lines and text
//	virtual void			DebugLine( const idVec4 &color, start:idVec3, const idVec3 &end, const int lifetime = 0, const bool depthTest = false ) = 0;
//	virtual void			DebugArrow( const idVec4 &color, start:idVec3, end:idVec3, int size, const int lifetime = 0 ) = 0;
//	virtual void			DebugWinding( const idVec4 &color, const idWinding &w, const idVec3 &origin, const idMat3 &axis, const int lifetime = 0, const bool depthTest = false ) = 0;
//	virtual void			DebugCircle( const idVec4 &color, const idVec3 &origin, const idVec3 &dir, const float radius, const int numSteps, const int lifetime = 0, const bool depthTest = false ) = 0;
//	virtual void			DebugSphere( const idVec4 &color, const idSphere &sphere, const int lifetime = 0, bool depthTest = false ) = 0;
//	virtual void			DebugBounds( const idVec4 &color, const idBounds &bounds, const idVec3 &org = vec3_origin, const int lifetime = 0 ) = 0;
//	virtual void			DebugBox( const idVec4 &color, const idBox &box, const int lifetime = 0 ) = 0;
//	virtual void			DebugFrustum( const idVec4 &color, const idFrustum &frustum, const bool showFromOrigin = false, const int lifetime = 0 ) = 0;
//	virtual void			DebugCone( const idVec4 &color, const idVec3 &apex, const idVec3 &dir, float radius1, float radius2, const int lifetime = 0 ) = 0;
//	virtual void			DebugAxis( const idVec3 &origin, const idMat3 &axis ) = 0;
//
	//// Polygon drawing for debug visualization.
	//DebugClearPolygons( /*int*/time:number ):void { throw "placeholder"; }		// a time of 0 will clear all polygons
	//DebugPolygon ( color: idVec4, winding: idWinding, lifeTime: number = 0, depthTest: boolean = false ): void { throw "placeholder"; }
//
//	// Text drawing for debug visualization.
//	virtual void			DrawText( text:string, const idVec3 &origin, float scale, const idVec4 &color, const idMat3 &viewAxis, const int align = 1, const int lifetime = 0, bool depthTest = false ) = 0;
};
//
//#endif /* !__RENDERWORLD_H__ */
