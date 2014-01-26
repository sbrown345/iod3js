/// <reference path="../../libs/idlib/math/plane.h.ts" />
/// <reference path="../../libs/idlib/bv/bounds.h.ts" />
/////*
////===========================================================================

////Doom 3 GPL Source Code
////Copyright (C) 1999-2011 id Software LLC, a ZeniMax Media company. 

////This file is part of the Doom 3 GPL Source Code (?Doom 3 Source Code?).  

////Doom 3 Source Code is free software: you can redistribute it and/or modify
////it under the terms of the GNU General Public License as published by
////the Free Software Foundation, either version 3 of the License, or
////(at your option) any later version.

////Doom 3 Source Code is distributed in the hope that it will be useful,
////but WITHOUT ANY WARRANTY; without even the implied warranty of
////MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
////GNU General Public License for more details.

////You should have received a copy of the GNU General Public License
////along with Doom 3 Source Code.  If not, see <http://www.gnu.org/licenses/>.

////In addition, the Doom 3 Source Code is also subject to certain additional terms. You should have received a copy of these additional terms immediately following the terms and conditions of the GNU General Public License which accompanied the Doom 3 Source Code.  If not, please request a copy in writing from id Software at the address below.

////If you have questions concerning this license or the applicable additional terms, you may contact in writing id Software LLC, c/o ZeniMax Media Inc., Suite 120, Rockville, Maryland 20850 USA.

////===========================================================================
////*/

////#ifndef __MODEL_H__
////#define __MODEL_H__

/////*
////===============================================================================

////	Render Model

////===============================================================================
////*/

////// shared between the renderer, game, and Maya export DLL
////#define MD5_VERSION_STRING		"MD5Version"
////#define MD5_MESH_EXT			"md5mesh"
////#define MD5_ANIM_EXT			"md5anim"
////#define MD5_CAMERA_EXT			"md5camera"
////#define MD5_VERSION				10

////// using shorts for triangle indexes can save a significant amount of traffic, but
////// to support the large models that renderBump loads, they need to be 32 bits
////#if 1

////#define GL_INDEX_TYPE		GL_UNSIGNED_INT
////typedef int glIndex_t;

////#else

////#define GL_INDEX_TYPE		GL_UNSIGNED_SHORT
////typedef short glIndex_t;

////#endif


class silEdge_t implements ITypeInfo {
	// NOTE: making this a glIndex is dubious, as there can be 2x the faces as verts
	p1:number; p2: number;					// planes defining the edge
	v1: number; v2: number;					// verts defining the edge

	constructor ( ) {
		this.p1 = 0;
		this.p2 = 0;
		this.v1 = 0;
		this.v2 = 0;
	}

	static typeInfo = [
		["p1", ""],
		["p2", ""],
		["v1", ""],
		["v2", ""]
	];
};

// this is used for calculating unsmoothed normals and tangents for deformed models
class dominantTri_t {
	v2:number; v3:number; //glIndex_t
	normalizationScale: Float32Array;
	constructor ( ) {
		this.v2 = 0;
		this.v3 = 0;
		this.normalizationScale = new Float32Array( 3 );
	}
} ;

class lightingCache_t {
	localLightVector: idVec3;		// this is the statically computed vector to the light
														// in texture space for cards without vertex programs
} ;

class shadowCache_t {
	xyz:idVec4;					// we use homogenous coordinate tricks
} ;

var SHADOW_CAP_INFINITE	= 64;

// our only drawing geometry type
class srfTriangles_t {
	bounds: idBounds; // for culling																				idBounds					

	ambientViewCount: number; // if == tr.viewCount, it is visible this view												int							

	generateNormals: boolean; // create normals from geometry, instead of using explicit ones								bool						
	tangentsCalculated: boolean; // set when the vertex tangents have been calculated										bool						
	facePlanesCalculated: boolean; // set when the face planes have been calculated											bool						
	perfectHull: boolean; // true if there aren't any dangling edges													bool						
	deformedSurface: boolean; // if true, indexes, silIndexes, mirrorVerts, and silEdges are								bool						
	// pointers into the original surface, and should not be freed															

	numVerts: number; // number of vertices																		int							
	verts: idDrawVert[]; // vertices, allocated with special allocator												idDrawVert *				

	numIndexes: number; // for shadows, this has both front and rear end caps and silhouette planes					int							
	indexes: Int32Array; // indexes, allocated with special allocator												glIndex_t *					

	silIndexes: Int32Array; // indexes changed to be the first vertex with same XYZ, ignoring normal and texcoords		glIndex_t *					

	numMirroredVerts: number; // this many verts at the end of the vert list are tangent mirrors							int							
	mirroredVerts: Int32Array; // tri.mirroredVerts[0] is the mirror of tri.numVerts - tri.numMirroredVerts + 0			int *						

	numDupVerts: number; // number of duplicate vertexes																int							
	dupVerts: Int32Array; // pairs of the number of the first vertex and the number of the duplicate vertex			int *						

	numSilEdges: number; // number of silhouette edges																int							
	silEdges: silEdge_t[]; // silhouette edges																			silEdge_t *					

	facePlanes: idPlane[]; // [numIndexes/3] plane equations															idPlane *					

	dominantTris: dominantTri_t; // [numVerts] for deformed surface fast tangent calculation									dominantTri_t *				

	numShadowIndexesNoFrontCaps: number; // shadow volumes with front caps omitted											  int							
	numShadowIndexesNoCaps: number; // shadow volumes with the front and rear caps omitted								  int							

	shadowCapPlaneBits: number; // bits 0-5 are set when that plane of the interacting light has triangles					  int							
	// projected on it, which means that if the view is on the outside of that					  							
	// plane, we need to draw the rear caps of the shadow volume								  							
	// turboShadows will have SHADOW_CAP_INFINITE												  							

	shadowVertexes: shadowCache_t; // these will be copied to shadowCache when it is going to be drawn.						  shadowCache_t *				
	// these are NULL when vertex programs are available

	ambientSurface: srfTriangles_t; // for light interactions, point back at the original surface that generated
	// the interaction, which we will get the ambientCache from

	nextDeferredFree: srfTriangles_t; // chain of tris to free next frame

	// data in vertex object space, not directly readable by the CPU
	indexCache: vertCache_t; // int
	ambientCache: vertCache_t; // idDrawVert
	lightingCache: vertCache_t; // lightingCache_t
	shadowCache: vertCache_t; // shadowCache_t

	constructor ( ) {
		this.init ( );
	}

	init ( ) {
		this.bounds = new idBounds;

		this.ambientViewCount = 0;

		this.generateNormals = false;
		this.tangentsCalculated = false;
		this.facePlanesCalculated = false;
		this.perfectHull = false;
		this.deformedSurface = false;


		this.numVerts = 0;
		this.verts = null;

		this.numIndexes = 0;
		this.indexes = null;

		this.silIndexes = null;

		this.numMirroredVerts = 0;
		this.mirroredVerts = null;

		this.numDupVerts = 0;
		this.dupVerts = null;

		this.numSilEdges = 0;
		this.silEdges = null;

		this.facePlanes = null;

		this.dominantTris = null;

		this.numShadowIndexesNoFrontCaps = 0;
		this.numShadowIndexesNoCaps = 0;

		this.shadowCapPlaneBits = 0;


		this.shadowVertexes = null;


		this.ambientSurface = null;


		this.nextDeferredFree = null;


		this.indexCache = null;
		this.ambientCache = null;
		this.lightingCache = null;
		this.shadowCache = null;
	}

	static typeInfo = [
		["bounds", ""],
		["ambientViewCount", ""],
		["generateNormals", ""],
		["tangentsCalculated", ""],
		["facePlanesCalculated", ""],
		["perfectHull", ""],
		["deformedSurface", ""],
		["numVerts", ""],
		["verts", ""],
		["numIndexes", ""],
		["indexes", ""],
		["silIndexes", ""],
		["numMirroredVerts", ""],
		["mirroredVerts", ""],
		["numDupVerts", ""],
		["dupVerts", ""],
		["numSilEdges", ""],
		["silEdges", ""],
		["facePlanes", ""],
		["dominantTris", ""],
		["numShadowIndexesNoFrontCaps", ""],
		["numShadowIndexesNoCaps", ""],
		["shadowCapPlaneBits", ""],
		["shadowVertexes", ""],
		["ambientSurface", ""],
		["nextDeferredFree", ""],
		["indexCache", ""],
		["ambientCache", ""],
		["lightingCache", ""],
		["shadowCache", ""]
	];
};

////typedef idList<srfTriangles_t *> idTriList;

class modelSurface_t {
	id:number;				//int							
	shader: idMaterial;			//const idMaterial *			
	geometry: srfTriangles_t;		//srfTriangles_t *			
};

////typedef enum {
////	DM_STATIC,		// never creates a dynamic model
////	DM_CACHED,		// once created, stays constant until the entity is updated (animating characters)
////	DM_CONTINUOUS	// must be recreated for every single view (time dependent things like particles)
////} dynamicModel_t;

////typedef enum {
////	INVALID_JOINT				= -1
////} jointHandle_t;

////class idMD5Joint {
////public:
////								idMD5Joint() { parent = NULL; }
////	idStr						name;
////	const idMD5Joint *			parent;
////};


////// the init methods may be called again on an already created model when
////// a reloadModels is issued

class idRenderModel {
////public:
////	virtual						~idRenderModel() {};

////	// Loads static models only, dynamic models must be loaded by the modelManager
////	virtual void				InitFromFile( const char *fileName ) = 0;

////	// renderBump uses this to load the very high poly count models, skipping the
////	// shadow and tangent generation, along with some surface cleanup to make it load faster
////	virtual void				PartialInitFromFile( const char *fileName ) = 0;

////	// this is used for dynamically created surfaces, which are assumed to not be reloadable.
////	// It can be called again to clear out the surfaces of a dynamic model for regeneration.
////	virtual void				InitEmpty( const char *name ) = 0;

////	// dynamic model instantiations will be created with this
////	// the geometry data will be owned by the model, and freed when it is freed
////	// the geoemtry should be raw triangles, with no extra processing
////	virtual void				AddSurface( modelSurface_t surface ) = 0;

////	// cleans all the geometry and performs cross-surface processing
////	// like shadow hulls
////	// Creates the duplicated back side geometry for two sided, alpha tested, lit materials
////	// This does not need to be called if none of the surfaces added with AddSurface require
////	// light interaction, and all the triangles are already well formed.
////	virtual void				FinishSurfaces() = 0;

////	// frees all the data, but leaves the class around for dangling references,
////	// which can regenerate the data with LoadModel()
////	virtual void				PurgeModel() = 0;

////	// resets any model information that needs to be reset on a same level load etc.. 
////	// currently only implemented for liquids
////	virtual void				Reset() = 0;

////	// used for initial loads, reloadModel, and reloading the data of purged models
////	// Upon exit, the model will absolutely be valid, but possibly as a default model
////	virtual void				LoadModel() = 0;

////	// internal use
////	virtual bool				IsLoaded() = 0;
////	virtual void				SetLevelLoadReferenced( bool referenced ) = 0;
////	virtual bool				IsLevelLoadReferenced() = 0;

////	// models that are already loaded at level start time
////	// will still touch their data to make sure they
////	// are kept loaded
////	virtual void				TouchData() = 0;

////	// dump any ambient caches on the model surfaces
////	virtual void				FreeVertexCache() = 0;

    // returns the name of the model
    Name():string { throw "placeholder"; }

////	// prints a detailed report on the model for printModel
////	virtual void				Print() const = 0;

////	// prints a single line report for listModels
////	virtual void				List() const = 0;

////	// reports the amount of memory (roughly) consumed by the model
////	virtual int					Memory() const = 0;

////	// for reloadModels
////	virtual ID_TIME_T				Timestamp() const = 0;

////	// returns the number of surfaces
////	virtual int					NumSurfaces() const = 0;

////	// NumBaseSurfaces will not count any overlays added to dynamic models
////	virtual int					NumBaseSurfaces() const = 0;

////	// get a pointer to a surface
////	virtual const modelSurface_t *Surface( int surfaceNum ) const = 0;

////	// Allocates surface triangles.
////	// Allocates memory for srfTriangles_t::verts and srfTriangles_t::indexes
////	// The allocated memory is not initialized.
////	// srfTriangles_t::numVerts and srfTriangles_t::numIndexes are set to zero.
////	virtual srfTriangles_t *	AllocSurfaceTriangles( int numVerts, int numIndexes ) const = 0;

////	// Frees surfaces triangles.
////	virtual void				FreeSurfaceTriangles( srfTriangles_t *tris ) const = 0;

////	// created at load time by stitching together all surfaces and sharing
////	// the maximum number of edges.  This may be incorrect if a skin file
////	// remaps surfaces between shadow casting and non-shadow casting, or
////	// if some surfaces are noSelfShadow and others aren't
////	virtual srfTriangles_t	*	ShadowHull() const = 0;

////	// models of the form "_area*" may have a prelight shadow model associated with it
////	virtual bool				IsStaticWorldModel() const = 0;

////	// models parsed from inside map files or dynamically created cannot be reloaded by
////	// reloadmodels
////	virtual bool				IsReloadable() const = 0;

////	// md3, md5, particles, etc
////	virtual dynamicModel_t		IsDynamicModel() const = 0;

////	// if the load failed for any reason, this will return true
////	virtual bool				IsDefaultModel() const = 0;

////	// dynamic models should return a fast, conservative approximation
////	// static models should usually return the exact value
////	virtual idBounds			Bounds( const struct renderEntity_s *ent = NULL ) const = 0;

////	// returns value != 0.0 if the model requires the depth hack
////	virtual float				DepthHack() const = 0;

////	// returns a static model based on the definition and view
////	// currently, this will be regenerated for every view, even though
////	// some models, like character meshes, could be used for multiple (mirror)
////	// views in a frame, or may stay static for multiple frames (corpses)
////	// The renderer will delete the returned dynamic model the next view
////	// This isn't const, because it may need to reload a purged model if it
////	// wasn't precached correctly.
////	virtual idRenderModel *		InstantiateDynamicModel( const struct renderEntity_s *ent, const struct viewDef_s *view, idRenderModel *cachedModel ) = 0;

////	// Returns the number of joints or 0 if the model is not an MD5
////	virtual int					NumJoints( void ) const = 0;

////	// Returns the MD5 joints or NULL if the model is not an MD5
////	virtual const idMD5Joint *	GetJoints( void ) const = 0;

////	// Returns the handle for the joint with the given name.
////	virtual jointHandle_t		GetJointHandle( const char *name ) const = 0;

////	// Returns the name for the joint with the given handle.
////	virtual const char *		GetJointName( jointHandle_t handle ) const = 0;

////	// Returns the default animation pose or NULL if the model is not an MD5.
////	virtual const idJointQuat *	GetDefaultPose( void ) const = 0;

////	// Returns number of the joint nearest to the given triangle.
////	virtual int					NearestJoint( int surfaceNum, int a, int c, int b ) const = 0;

////	// Writing to and reading from a demo file.
////	virtual void				ReadFromDemoFile( class idDemoFile *f ) = 0;
////	virtual void				WriteToDemoFile( class idDemoFile *f ) = 0;
};

////#endif /* !__MODEL_H__ */
