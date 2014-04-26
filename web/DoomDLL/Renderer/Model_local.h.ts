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

////#ifndef __MODEL_LOCAL_H__
////#define __MODEL_LOCAL_H__

/*
===============================================================================

	Static model

===============================================================================
*/



class matchVert_t {
	next:matchVert_t;
	v: number /*int*/; tv: number /*int*/;
	color = new Uint8Array(4);
	normal = new idVec3	;
}

class idRenderModelStatic extends idRenderModel {
////public:
////	// the inherited public interface
////	static idRenderModel *		Alloc();

//////								idRenderModelStatic();
//	destructor ( ): void { throw "placeholder"; }

//	InitFromFile( fileName:string ): void { throw "placeholder"; }
//	PartialInitFromFile( fileName:string ): void { throw "placeholder"; }
//	PurgeModel(): void { throw "placeholder"; }
	Reset ( ): void {}
//	LoadModel(): void { throw "placeholder"; }
//	IsLoaded(): boolean { throw "placeholder"; }
//	SetLevelLoadReferenced( referenced:boolean ): void { throw "placeholder"; }
//	IsLevelLoadReferenced(): boolean { throw "placeholder"; }
//	TouchData(): void { throw "placeholder"; }
//	InitEmpty ( name: string ): void { throw "placeholder"; }

//	AddSurface(surface: modelSurface_t ): void { throw "placeholder"; }
//	FinishSurfaces(): void { throw "placeholder"; }
//	FreeVertexCache(): void { throw "placeholder"; }
//	Name():string { throw "placeholder"; }
//	Print() : void { throw "placeholder"; }
//	List() : void { throw "placeholder"; }
//	Memory() :number { throw "placeholder"; }
//	Timestamp():number { throw "placeholder"; }
//	NumSurfaces():number { throw "placeholder"; }
//	NumBaseSurfaces():number { throw "placeholder"; }
//	Surface ( surfaceNum: number ): modelSurface_t { throw "placeholder"; }
//////	virtual srfTriangles_t *	AllocSurfaceTriangles( int numVerts, int numIndexes ) const;
//////	virtual void				FreeSurfaceTriangles( srfTriangles_t *tris ) : void { throw "placeholder"; }
//	ShadowHull ( ): srfTriangles_t { throw "placeholder"; }
//	IsStaticWorldModel ( ): boolean { throw "placeholder"; }
//	IsDynamicModel(): dynamicModel_t { throw "placeholder"; }
//	IsDefaultModel(): boolean { throw "placeholder"; }
//	IsReloadable(): boolean { throw "placeholder"; }
//////	virtual idRenderModel *		InstantiateDynamicModel( const struct renderEntity_s *ent, const struct viewDef_s *view, idRenderModel *cachedModel );
//////	virtual int					NumJoints( void ) const;
//////	virtual const idMD5Joint *	GetJoints( void ) const;
//////	virtual jointHandle_t		GetJointHandle( name:string ) const;
//////	virtual const char *		GetJointName( jointHandle_t handle ) const;
//////	virtual const idJointQuat *	GetDefaultPose( void ) const;
//////	virtual int					NearestJoint( int surfaceNum, int a, int b, int c ) const;
//	Bounds ( ent: renderEntity_t = null ): idBounds { throw "placeholder"; }
//////	virtual void				ReadFromDemoFile( class idDemoFile *f );: void { throw "placeholder"; }
//////	virtual void				WriteToDemoFile( class idDemoFile *f );: void { throw "placeholder"; }
//	DepthHack() :number { throw "placeholder"; }

//    MakeDefaultModel(): void { throw "placeholder"; }

//	LoadASE( fileName:string ):boolean { throw "placeholder"; }
//	LoadLWO(fileName: string): boolean { throw "placeholder"; }
//	LoadFLT(fileName: string): boolean { throw "placeholder"; }
//	LoadMA ( filename: string ): boolean { throw "placeholder"; }

////	bool						ConvertASEToModelSurfaces( const struct aseModel_s *ase );
////	bool						ConvertLWOToModelSurfaces( const struct st_lwObject *lwo );
////	bool						ConvertMAToModelSurfaces (const struct maModel_s *ma );

////	struct aseModel_s *			ConvertLWOToASE( const struct st_lwObject *obj, fileName:string );

////	bool						DeleteSurfaceWithId( int id );
////	void						DeleteSurfacesWithNegativeId( void );
////	bool						FindSurfaceWithId( int id, int &surfaceNum );

//public:
	surfaces = new idList<modelSurface_t>(modelSurface_t);
	bounds = new idBounds;
	overlaysAdded:number;//	int							

//protected:
	lastModifiedFrame:number;//	int							
	lastArchivedFrame:number;//	int							

	name = new idStr;
	shadowHull: srfTriangles_t;

	isStaticWorldModel:boolean;
    defaulted:boolean;
    purged:boolean;					// eventually we will have dynamic reloading
    fastLoad:boolean;				// don't generate tangents and shadow data
    reloadable:boolean;				// if not, reloadModels won't check timestamp
    levelLoadReferenced:boolean;	// for determining if it needs to be freed
	timeStamp: number; //ID_TIME_T

	static r_mergeModelSurfaces: idCVar;	// combine model surfaces with the same material
	static r_slopVertex: idCVar;			// merge xyz coordinates this far apart
	static r_slopTexCoord: idCVar;			// merge texture coordinates this far apart
	static r_slopNormal: idCVar;			// merge normals that dot less than this


	constructor ( ) {
		super ( );
		this.name.opEquals("<undefined>");
		this.bounds.Clear ( );
		this.lastModifiedFrame = 0;
		this.lastArchivedFrame = 0;
		this.overlaysAdded = 0;
		this.shadowHull = null;
		this.isStaticWorldModel = false;
		this.defaulted = false;
		this.purged = false;
		this.fastLoad = false;
		this.reloadable = true;
		this.levelLoadReferenced = false;
		this.timeStamp = 0;
	}




/*
================
idRenderModelStatic::~idRenderModelStatic
================
*/
destructor  () {
		this.PurgeModel();
	}

/////*
////==============
////idRenderModelStatic::Print
////==============
////*/
////void idRenderModelStatic::Print() const {
////	common.Printf( "%s\n", this.name.c_str() );
////	common.Printf( "Static model.\n" );
////	common.Printf( "bounds: (%f %f %f) to (%f %f %f)\n", 
////		this.bounds[0][0], this.bounds[0][1], this.bounds[0][2], 
////		this.bounds[1][0], this.bounds[1][1], this.bounds[1][2] );

////	common.Printf( "    verts  tris material\n" );
////	for ( int i = 0 ; i < NumSurfaces() ; i++ ) {
////		var surf = this.Surface( i );

////		srfTriangles_t *tri = surf.geometry;
////		const idMaterial *material = surf.shader;

////		if ( !tri ) {
////			common.Printf( "%2i: %s, NULL surface geometry\n", i, material.GetName() );
////			continue;
////		}

////		common.Printf( "%2i: %5i %5i %s", i, tri.numVerts, tri.numIndexes / 3, material.GetName() );
////		if ( tri.generateNormals ) {
////			common.Printf( " (smoothed)\n" );
////		} else {
////			common.Printf( "\n" );
////		}
////	}	
////}

/////*
////==============
////idRenderModelStatic::Memory
////==============
////*/
////int idRenderModelStatic::Memory() const {
////	int	totalBytes = 0;

////	totalBytes += sizeof( *this );
////	totalBytes += this.name.DynamicMemoryUsed();
////	totalBytes += this.surfaces.MemoryUsed();

////	if ( shadowHull ) {
////		totalBytes += R_TriSurfMemory( shadowHull );
////	}

////	for ( int j = 0 ; j < NumSurfaces() ; j++ ) {
////		var surf = this.Surface( j );
////		if ( !surf.geometry ) {
////			continue;
////		}
////		totalBytes += R_TriSurfMemory( surf.geometry );
////	}

////	return totalBytes;
////}

/////*
////==============
////idRenderModelStatic::List
////==============
////*/
////void idRenderModelStatic::List() const {
////	int	totalTris = 0;
////	int	totalVerts = 0;
////	int	totalBytes = 0;

////	totalBytes = Memory();

////	char	closed = 'C';
////	for ( int j = 0 ; j < NumSurfaces() ; j++ ) {
////		var surf = this.Surface( j );
////		if ( !surf.geometry ) {
////			continue;
////		}
////		if ( !surf.geometry.perfectHull ) {
////			closed = ' ';
////		}
////		totalTris += surf.geometry.numIndexes / 3;
////		totalVerts += surf.geometry.numVerts;
////	}
////	common.Printf( "%c%4ik %3i %4i %4i %s", closed, totalBytes/1024, NumSurfaces(), totalVerts, totalTris, Name() );

////	if ( IsDynamicModel() == DM_CACHED ) {
////		common.Printf( " (DM_CACHED)" );
////	}
////	if ( IsDynamicModel() == DM_CONTINUOUS ) {
////		common.Printf( " (DM_CONTINUOUS)" );
////	}
////	if ( defaulted ) {
////		common.Printf( " (DEFAULTED)" );
////	}
////	if ( this.bounds[0][0] >= this.bounds[1][0] ) {
////		common.Printf( " (EMPTY BOUNDS)" );
////	}
////	if ( this.bounds[1][0] - this.bounds[0][0] > 100000 ) {
////		common.Printf( " (HUGE BOUNDS)" );
////	}

////	common.Printf( "\n" );
////}

/*
================
idRenderModelStatic::IsDefaultModel
================
*/
IsDefaultModel  (): boolean {
		return this.defaulted;
	}

/*
================
AddCubeFace
================
*/
 AddCubeFace(tri: srfTriangles_t, v1: idVec3, v2: idVec3, v3: idVec3, v4: idVec3): void {
	tri.verts[tri.numVerts + 0].Clear();
	tri.verts[tri.numVerts + 0].xyz = v1.timesFloat(8);
	tri.verts[tri.numVerts + 0].st[0] = 0;
	tri.verts[tri.numVerts + 0].st[1] = 0;

	tri.verts[tri.numVerts + 1].Clear();
	tri.verts[tri.numVerts + 1].xyz = v2.timesFloat(8);
	tri.verts[tri.numVerts + 1].st[0] = 1;
	tri.verts[tri.numVerts + 1].st[1] = 0;

	tri.verts[tri.numVerts + 2].Clear();
	tri.verts[tri.numVerts + 2].xyz = v3.timesFloat(8);
	tri.verts[tri.numVerts + 2].st[0] = 1;
	tri.verts[tri.numVerts + 2].st[1] = 1;

	tri.verts[tri.numVerts + 3].Clear();
	tri.verts[tri.numVerts + 3].xyz = v4.timesFloat(8);
	tri.verts[tri.numVerts + 3].st[0] = 0;
	tri.verts[tri.numVerts + 3].st[1] = 1;

	tri.indexes[tri.numIndexes + 0] = tri.numVerts + 0;
	tri.indexes[tri.numIndexes + 1] = tri.numVerts + 1;
	tri.indexes[tri.numIndexes + 2] = tri.numVerts + 2;
	tri.indexes[tri.numIndexes + 3] = tri.numVerts + 0;
	tri.indexes[tri.numIndexes + 4] = tri.numVerts + 2;
	tri.indexes[tri.numIndexes + 5] = tri.numVerts + 3;

	tri.numVerts += 4;
	tri.numIndexes += 6;
}

/*
================
idRenderModelStatic::MakeDefaultModel
================
*/
MakeDefaultModel (): void {
	this.defaulted = true;

	// throw out any surfaces we already have
	this.PurgeModel();

	// create one new surface
	var surf = new modelSurface_t;

	var tri: srfTriangles_t = R_AllocStaticTriSurf();

	surf.shader = tr.defaultMaterial;
	surf.geometry = tri;

	R_AllocStaticTriSurfVerts(tri, 24);
	R_AllocStaticTriSurfIndexes(tri, 36);

	this.AddCubeFace(tri, new idVec3(-1, 1, 1), new idVec3(1, 1, 1), new idVec3(1, -1, 1), new idVec3(-1, -1, 1));
	this.AddCubeFace(tri, new idVec3(-1, 1, -1), new idVec3(-1, -1, -1), new idVec3(1, -1, -1), new idVec3(1, 1, -1));

	this.AddCubeFace(tri, new idVec3(1, -1, 1), new idVec3(1, 1, 1), new idVec3(1, 1, -1), new idVec3(1, -1, -1));
	this.AddCubeFace(tri, new idVec3(-1, -1, 1), new idVec3(-1, -1, -1), new idVec3(-1, 1, -1), new idVec3(-1, 1, 1));

	this.AddCubeFace(tri, new idVec3(-1, -1, 1), new idVec3(1, -1, 1), new idVec3(1, -1, -1), new idVec3(-1, -1, -1));
	this.AddCubeFace(tri, new idVec3(-1, 1, 1), new idVec3(-1, 1, -1), new idVec3(1, 1, -1), new idVec3(1, 1, 1));

	tri.generateNormals = true;

	this.AddSurface(surf);
	this.FinishSurfaces();
}

/////*
////================
////idRenderModelStatic::PartialInitFromFile
////================
////*/
////void idRenderModelStatic::PartialInitFromFile( fileName:string ) {
////	this.fastLoad = true;
////	InitFromFile( fileName );
////}

/*
================
idRenderModelStatic::InitFromFile
================
*/
InitFromFile  (fileName: string): void {
	var loaded: boolean;
	var extension = new idStr;

	this.InitEmpty(fileName);

	// FIXME: load new .proc map format

	this.name.ExtractFileExtension(extension);

	if (extension.Icmp("ase") == 0) {
		loaded = this.LoadASE(this.name.data);
		this.reloadable = true;
	} else if (extension.Icmp("lwo") == 0) {
		loaded = this.LoadLWO(this.name.data);
		this.reloadable = true;
	} else if (extension.Icmp("flt") == 0) {
		loaded = this.LoadFLT(this.name.data);
		this.reloadable = true;
	} else if (extension.Icmp("ma") == 0) {
		loaded = this.LoadMA(this.name.data);
		this.reloadable = true;
	} else {
		common.Warning("idRenderModelStatic::InitFromFile: unknown type for model: \'%s\'", this.name.c_str());
		loaded = false;
	}

	if (!loaded) {
		common.Warning("Couldn't load model: '%s'", this.name.c_str());
		this.MakeDefaultModel();
		return;
	}

	// it is now available for use
	this.purged = false;

	// create the bounds for culling and dynamic surface creation
	this.FinishSurfaces();
}

/*
================
idRenderModelStatic::LoadModel
================
*/
	LoadModel ( ): void {
		todoThrow ( );
		this.PurgeModel ( );
		this.InitFromFile( this.name );
	}

/*
================
idRenderModelStatic::InitEmpty
================
*/
InitEmpty  (fileName: string): void {
	// model names of the form _area* are static parts of the
	// world, and have already been considered for optimized shadows
	// other model names are inline entity models, and need to be
	// shadowed normally
	if (!idStr.Cmpn(fileName, "_area", 5)) {
		this.isStaticWorldModel = true;
	} else {
		this.isStaticWorldModel = false;
	}

	this.name.opEquals(fileName);
	this.reloadable = false; // if it didn't come from a file, we can't reload it
	this.PurgeModel();
	this.purged = false;
	this.bounds.Zero();
}

/*
================
idRenderModelStatic::AddSurface
================
*/
AddSurface (surface: modelSurface_t): void {
	this.surfaces.Append(surface);
	dlog(DEBUG_RENDERWORLD_LOAD, "AddSurface\n");
	if (surface.geometry != null) {
		for (var i = 0; i < surface.geometry.numIndexes; i++) {
			dlog(DEBUG_RENDERWORLD_LOAD, "%i: %i\n", i, surface.geometry.indexes[i]);
		}
	}
	if (surface.geometry) {
		this.bounds.opAdditionAssignment(surface.geometry.bounds);
	}
}

/*
================
idRenderModelStatic::Name
================
*/
Name (): string {
	return this.name.data;
}

/*
================
idRenderModelStatic::Timestamp
================
*/
Timestamp  (): number {
	return this.timeStamp;
}

/*
================
idRenderModelStatic::NumSurfaces
================
*/
NumSurfaces  (): number /*int*/ {
	return this.surfaces.Num();
}

/*
================
idRenderModelStatic::NumBaseSurfaces
================
*/
NumBaseSurfaces  (): number /*int*/ {
	return this.surfaces.Num() - this.overlaysAdded;
}

/*
================
idRenderModelStatic::Surface
================
*/
Surface  (surfaceNum: number): modelSurface_t {
	return this.surfaces[surfaceNum];
}

/////*
////================
////idRenderModelStatic::AllocSurfaceTriangles
////================
////*/
////srfTriangles_t *idRenderModelStatic::AllocSurfaceTriangles( int numVerts, int numIndexes ) const {
////	srfTriangles_t *tri = R_AllocStaticTriSurf();
////	R_AllocStaticTriSurfVerts( tri, numVerts );
////	R_AllocStaticTriSurfIndexes( tri, numIndexes );
////	return tri;
////}

/////*
////================
////idRenderModelStatic::FreeSurfaceTriangles
////================
////*/
////void idRenderModelStatic::FreeSurfaceTriangles( srfTriangles_t *tris ) const {
////	R_FreeStaticTriSurf( tris );
////}

/*
================
idRenderModelStatic::ShadowHull
================
*/
ShadowHull  (): srfTriangles_t {
	return this.shadowHull;
}

/*
================
idRenderModelStatic::IsStaticWorldModel
================
*/
IsStaticWorldModel  (): boolean {
	return this.isStaticWorldModel;
}

/*
================
idRenderModelStatic::IsDynamicModel
================
*/
IsDynamicModel  (): dynamicModel_t {
	// dynamic subclasses will override this
	return dynamicModel_t.DM_STATIC;
}

/*
================
idRenderModelStatic::IsReloadable
================
*/
IsReloadable  (): boolean {
	return this.reloadable;
}

/*
================
idRenderModelStatic::Bounds
================
*/
Bounds  (mdef: renderEntity_t = null): idBounds {
	return this.bounds;
}

/*
================
idRenderModelStatic::DepthHack
================
*/
DepthHack  (): number {
	return 0.0;
}

/////*
////================
////idRenderModelStatic::InstantiateDynamicModel
////================
////*/
////idRenderModel *idRenderModelStatic::InstantiateDynamicModel( const struct renderEntity_s *ent, const struct viewDef_s *view, idRenderModel *cachedModel ) {
////	if ( cachedModel ) {
////		delete cachedModel;
////		cachedModel = NULL;
////	}
////	common.Error( "InstantiateDynamicModel called on static model '%s'", this.name.c_str() );
////	return NULL;
////}

/*
================
idRenderModelStatic::NumJoints
================
*/
	NumJoints ( ): number {
		return 0;
	}

/////*
////================
////idRenderModelStatic::GetJoints
////================
////*/
////const idMD5Joint *idRenderModelStatic::GetJoints( ) const {
////	return NULL;
////}

/*
================
idRenderModelStatic::GetJointHandle
================
*/
	GetJointHandle ( name: string ): jointHandle_t {
		return jointHandle_t.INVALID_JOINT;
	}

/////*
////================
////idRenderModelStatic::GetJointName
////================
////*/
////const char * idRenderModelStatic::GetJointName( jointHandle_t handle ) const {
////	return "";
////}

/*
================
idRenderModelStatic::GetDefaultPose
================
*/
	GetDefaultPose ( ): idJointQuat [] {
		return null;
	}

/////*
////================
////idRenderModelStatic::NearestJoint
////================
////*/
////int idRenderModelStatic::NearestJoint( int surfaceNum, int a, int b, int c ) const {
////	return jointHandle_t.INVALID_JOINT;
////}


//=====================================================================


/*
================
idRenderModelStatic::FinishSurfaces

The mergeShadows option allows surfaces with different textures to share
silhouette edges for shadow calculation, instead of leaving shared edges
hanging.

If any of the original shaders have the noSelfShadow flag set, the surfaces
can't be merged, because they will need to be drawn in different order.

If there is only one surface, a separate merged surface won't be generated.

A model with multiple surfaces can't later have a skinned shader change the
state of the noSelfShadow flag.

-----------------

Creates mirrored copies of two sided surfaces with normal maps, which would
otherwise light funny.

Extends the bounds of deformed surfaces so they don't cull incorrectly at screen edges.

================
*/
FinishSurfaces  (): void {
	var /*int			*/i: number;
	var /*int			*/totalVerts: number, totalIndexes: number;

	dlog(DEBUG_RENDERWORLD_LOAD, "FinishSurfaces\n");
	this.purged = false;

	// make sure we don't have a huge bounds even if we don't finish everything
	this.bounds.Zero();

	if (this.surfaces.Num() == 0) {
		return;
	}

	// renderBump doesn't care about most of this
	if (this.fastLoad) {
		this.bounds.Zero();
		for (i = 0; i < this.surfaces.Num(); i++) {
			var surf = this.surfaces[i];

			R_BoundTriSurf(surf.geometry);
			this.bounds.AddBounds(surf.geometry.bounds);
		}

		return;
	}

	// cleanup all the final surfaces, but don't create sil edges
	totalVerts = 0;
	totalIndexes = 0;

	// decide if we are going to merge all the surfaces into one shadower
	var /*int	*/numOriginalSurfaces = this.surfaces.Num();

	// make sure there aren't any NULL shaders or geometry
	for (i = 0; i < numOriginalSurfaces; i++) {
		var surf = this.surfaces[i];

		if (surf.geometry == null || surf.shader == null) {
			this.MakeDefaultModel();
			common.Error("Model %s, surface %i had NULL geometry", this.name.c_str(), i);
		}
		if (surf.shader == null) {
			this.MakeDefaultModel();
			common.Error("Model %s, surface %i had NULL shader", this.name.c_str(), i);
		}
	}

	// duplicate and reverse triangles for two sided bump mapped surfaces
	// note that this won't catch surfaces that have their shaders dynamically
	// changed, and won't work with animated models.
	// It is better to create completely separate surfaces, rather than
	// add vertexes and indexes to the existing surface, because the
	// tangent generation wouldn't like the acute shared edges
	for (i = 0; i < numOriginalSurfaces; i++) {
		var surf = this.surfaces[i];

		if (surf.shader.ShouldCreateBackSides()) {
			var newTri: srfTriangles_t;

			newTri = R_CopyStaticTriSurf(surf.geometry);
			R_ReverseTriangles(newTri);

			var newSurf = new modelSurface_t;

			newSurf.shader = surf.shader;
			newSurf.geometry = newTri;

			this.AddSurface(newSurf);
		}
	}

	// clean the surfaces
	for (i = 0; i < this.surfaces.Num(); i++) {
		var surf = this.surfaces[i];

		R_CleanupTriangles(surf.geometry, surf.geometry.generateNormals, true, surf.shader.UseUnsmoothedTangents());
		if (surf.shader.SurfaceCastsShadow()) {
			totalVerts += surf.geometry.numVerts;
			totalIndexes += surf.geometry.numIndexes;
		}
	}

	// add up the total surface area for development information
	for (i = 0; i < this.surfaces.Num(); i++) {
		var surf = this.surfaces[i];
		var tri = surf.geometry;

		for (var j = 0; j < tri.numIndexes; j += 3) {
			var area = idWinding.TriangleArea(tri.verts[tri.indexes[j]].xyz,
				tri.verts[tri.indexes[j + 1]].xyz, tri.verts[tri.indexes[j + 2]].xyz);
			/*const_cast<idMaterial *>*/(surf.shader).AddToSurfaceArea(area);
		}
	}

	// calculate the bounds
	if (this.surfaces.Num() == 0) {
		this.bounds.Zero();
	} else {
		this.bounds.Clear();
		for (i = 0; i < this.surfaces.Num(); i++) {
			var surf = this.surfaces[i];

			// if the surface has a deformation, increase the bounds
			// the amount here is somewhat arbitrary, designed to handle
			// autosprites and flares, but could be done better with exact
			// deformation information.
			// Note that this doesn't handle deformations that are skinned in
			// at run time...
			if (surf.shader.Deform() != deform_t.DFRM_NONE) {
				var tri = surf.geometry;
				var mid: idVec3 = (tri.bounds[1].opAddition(tri.bounds[0])).timesFloat(0.5);
				var /*float	*/radius = (tri.bounds[0].opSubtraction(mid)).Length();
				radius += 20.0;

				tri.bounds[0][0] = mid[0] - radius;
				tri.bounds[0][1] = mid[1] - radius;
				tri.bounds[0][2] = mid[2] - radius;

				tri.bounds[1][0] = mid[0] + radius;
				tri.bounds[1][1] = mid[1] + radius;
				tri.bounds[1][2] = mid[2] + radius;
			}

			// add to the model bounds
			this.bounds.AddBounds(surf.geometry.bounds);
		}
	}
}

/*
=================
idRenderModelStatic::ConvertASEToModelSurfaces
=================
*/


ConvertASEToModelSurfaces(ase :aseModel_t) :boolean{
	var object: aseObject_t;
	var mesh: aseMesh_t ;
	var material: aseMaterial_t ;
	var im1: idMaterial, im2: idMaterial;
	var tri: srfTriangles_t;
	var objectNum: number /*int*/;
	var /*int*/i: number, j: number, k: number;
	var/*int*/v:number, tv:number;
	var vRemap:Int32Array;
	var tvRemap:Int32Array;
	var mvTable: matchVert_t[];	// all of the match verts
	var mvHash: matchVert_t[];		// points inside mvTable for each xyz index
	var lastmv: matchVert_t;
	var mv: matchVert_t;
	var normal = new idVec3;
	var uOffset: number/*float*/, vOffset: number/*float*/, textureSin: number/*float*/, textureCos: number/*float*/;
	var uTiling: number/*float*/, vTiling: number/*float*/;
	var mergeTo:Int32Array;
	var color:Uint8Array;
	var identityColor = new Uint8Array( [255, 255, 255, 255] );
	var surf = new modelSurface_t, modelSurf: modelSurface_t;

	if (!ase) {
		return false;
	}
	if (ase.objects.Num() < 1) {
		return false;
	}

	this.timeStamp = ase.timeStamp;

	// the modeling programs can save out multiple surfaces with a common
	// material, but we would like to mege them together where possible
	// meaning that this.NumSurfaces() <= ase.objects.currentElements
	mergeTo = new Int32Array( ase.objects.Num ( ) ); //(int *) _alloca(ase.objects.Num() * sizeof( *mergeTo ));
	surf.geometry = null;
	if (ase.materials.Num() == 0) {
		// if we don't have any materials, dump everything into a single surface
		surf.shader = tr.defaultMaterial;
		surf.id = 0;
		this.AddSurface(surf);
		for (i = 0; i < ase.objects.Num(); i++) {
			mergeTo[i] = 0;
		}
	} else if (!idRenderModelStatic.r_mergeModelSurfaces.GetBool()) {
		// don't merge any
		for (i = 0; i < ase.objects.Num(); i++) {
			mergeTo[i] = i;
			object = ase.objects[i];
			material = ase.materials[object.materialRef];
			surf.shader = declManager.FindMaterial(material.name.toString());
			surf.id = this.NumSurfaces();
			this.AddSurface(surf);
		}
	} else {
		// search for material matches
		for (i = 0; i < ase.objects.Num(); i++) {
			object = ase.objects[i];
			material = ase.materials[object.materialRef];
			im1 = declManager.FindMaterial(material.name.toString());
			if (im1.IsDiscrete()) {
				// flares, autosprites, etc
				j = this.NumSurfaces();
			} else {
				for (j = 0; j < this.NumSurfaces(); j++) {
					modelSurf =  this.surfaces[j];
					im2 = modelSurf.shader;
					if (im1 == im2) {
						// merge this
						mergeTo[i] = j;
						break;
					}
				}
			}
			if (j == this.NumSurfaces()) {
				// didn't merge
				mergeTo[i] = j;
				surf.shader = im1;
				surf.id = this.NumSurfaces();
				this.AddSurface(surf);
			}
		}
	}

	var vertexSubset = new idVectorSubset<idVec3>( idVec3, 3 );
	var texCoordSubset = new idVectorSubset<idVec2>( idVec2, 2 ); 

	// build the surfaces
	for (objectNum = 0; objectNum < ase.objects.Num(); objectNum++) {
		object = ase.objects[objectNum];
		mesh = object.mesh;
		material = ase.materials[object.materialRef];
		im1 = declManager.FindMaterial(material.name.toString());

		var normalsParsed = mesh.normalsParsed;

		// completely ignore any explict normals on surfaces with a renderbump command
		// which will guarantee the best contours and least vertexes.
		var  rb = im1.GetRenderBump();
		if (rb /*&& rb[0]*/) {
			normalsParsed = false;
		}

		// It seems like the tools our artists are using often generate
		// verts and texcoords slightly separated that should be merged
		// note that we really should combine the surfaces with common materials
		// before doing this operation, because we can miss a slop combination
		// if they are in different surfaces

		vRemap = new Int32Array( mesh.numVertexes ); //(int *) R_StaticAlloc(mesh.numVertexes * sizeof(vRemap[0]));

		if (this.fastLoad) {
			// renderbump doesn't care about vertex count
			for (j = 0; j < mesh.numVertexes; j++) {
				vRemap[j] = j;
			}
		} else {
			var /*float */vertexEpsilon = idRenderModelStatic.r_slopVertex.GetFloat ( );
			var /*float */expand = 2 * 32 * vertexEpsilon;
			var mins = new idVec3, maxs = new idVec3 ;

			SIMDProcessor.MinMax_vec3(mins, maxs, mesh.vertexes, mesh.numVertexes);
			mins.opSubtractionAssignment( new idVec3( expand, expand, expand ) );
			maxs.opAdditionAssignment( new idVec3( expand, expand, expand ) );
			vertexSubset.Init(mins, maxs, 32, 1024);
			for (j = 0; j < mesh.numVertexes; j++) {
				vRemap[j] = vertexSubset.FindVector(mesh.vertexes, j, vertexEpsilon);
			}
		}

		tvRemap = new Int32Array( mesh.numTVertexes );// (int *) R_StaticAlloc(mesh.numTVertexes * sizeof(tvRemap[0]));

		if (this.fastLoad) {
			// renderbump doesn't care about vertex count
			for (j = 0; j < mesh.numTVertexes; j++) {
				tvRemap[j] = j;
			}
		} else {
			var/*float */texCoordEpsilon = idRenderModelStatic.r_slopTexCoord.GetFloat();
			var /*float */expand = 2 * 32 * texCoordEpsilon;
			var minsV2 = new idVec2, maxsV2 = new idVec2;
			
			SIMDProcessor.MinMax_vec2(minsV2, maxsV2, mesh.tvertexes, mesh.numTVertexes);
			minsV2.opSubtractionAssignment( new idVec2( expand, expand ) );
			maxsV2.opAdditionAssignment( new idVec2( expand, expand ) );
			texCoordSubset.Init(minsV2, maxsV2, 32, 1024);
			for (j = 0; j < mesh.numTVertexes; j++) {
				tvRemap[j] = texCoordSubset.FindVector(mesh.tvertexes, j, texCoordEpsilon);
			}
		}

		// we need to find out how many unique vertex / texcoord combinations
		// there are, because ASE tracks them separately but we need them unified

		// the maximum possible number of combined vertexes is the number of indexes
		mvTable = newStructArray<matchVert_t>( matchVert_t, mesh.numFaces * 3 );//(matchVert_t *) R_ClearedStaticAlloc(mesh.numFaces * 3 * sizeof(mvTable[0]));

		// we will have a hash chain based on the xyz values
		mvHash = newStructArray<matchVert_t>( matchVert_t, mesh.numVertexes );// (matchVert_t **) R_ClearedStaticAlloc(mesh.numVertexes * sizeof(mvHash[0]));

		// allocate triangle surface
		tri = R_AllocStaticTriSurf();
		tri.numVerts = 0;
		tri.numIndexes = 0;
		R_AllocStaticTriSurfIndexes(tri, mesh.numFaces * 3);
		tri.generateNormals = !normalsParsed;

		// init default normal, color and tex coord index
		normal.Zero();
		color = identityColor;
		tv = 0;

		// find all the unique combinations
		var/*float */normalEpsilon = 1.0 - idRenderModelStatic.r_slopNormal.GetFloat();
		for (j = 0; j < mesh.numFaces; j++) {
			for (k = 0; k < 3; k++) {
				v = mesh.faces[j].vertexNum[k];

				if (v < 0 || v >= mesh.numVertexes) {
					common.Error("ConvertASEToModelSurfaces: bad vertex index in ASE file %s", this.name.c_str());
				}

				// collapse the position if it was slightly offset 
				v = vRemap[v];

				// we may or may not have texcoords to compare
				if (mesh.numTVFaces == mesh.numFaces && mesh.numTVertexes != 0) {
					tv = mesh.faces[j].tVertexNum[k];
					if (tv < 0 || tv >= mesh.numTVertexes) {
						common.Error("ConvertASEToModelSurfaces: bad tex coord index in ASE file %s", this.name.c_str());
					}
					// collapse the tex coord if it was slightly offset
					tv = tvRemap[tv];
				}

				// we may or may not have normals to compare
				if (normalsParsed) {
					normal = mesh.faces[j].vertexNormals[k];
				}

				// we may or may not have colors to compare
				if (mesh.colorsParsed) {
					color = mesh.faces[j].vertexColors[k];
				}

				// find a matching vert
				for (lastmv = null, mv = mvHash[v]; mv != null; lastmv = mv, mv = mv.next) {
					if (mv.tv != tv) {
						continue;
					}
					//if ( * (unsigned *) mv.color != * (unsigned *)color ) {
					if ( mv.color[0] != color[0]
							|| mv.color[1] != color[1]
							|| mv.color[2] != color[2]
							|| mv.color[3] != color[3]
					) {
						continue;
					}
					if (!normalsParsed) {
						// if we are going to create the normals, just
						// matching texcoords is enough
						break;
					}
					if ( mv.normal.timesVec( normal ) > normalEpsilon ) {
						break; // we already have this one
					}
				}
				if (!mv) {
					// allocate a new match vert and link to hash chain
					mv = mvTable[tri.numVerts];
					mv.v = v;
					mv.tv = tv;
					mv.normal = normal;
					mv.color.set(color); //*(unsigned *) mv.color = * (unsigned *) color;
					mv.next = null;
					if (lastmv) {
						lastmv.next = mv;
					} else {
						mvHash[v] = mv;
					}
					tri.numVerts++;
				}

				tri.indexes[tri.numIndexes] = mvTable.indexOf( mv ); //mv - mvTable;
				tri.numIndexes++;
			}
		}

		// allocate space for the indexes and copy them
		if (tri.numIndexes > mesh.numFaces * 3) {
			common.FatalError("ConvertASEToModelSurfaces: index miscount in ASE file %s", this.name.c_str());
		}
		if (tri.numVerts > mesh.numFaces * 3) {
			common.FatalError("ConvertASEToModelSurfaces: vertex miscount in ASE file %s", this.name.c_str());
		}

		// an ASE allows the texture coordinates to be scaled, translated, and rotated
		if (ase.materials.Num() == 0) {
			uOffset = vOffset = 0.0;
			uTiling = vTiling = 1.0;
			textureSin = 0.0;
			textureCos = 1.0;
		} else {
			material = ase.materials[object.materialRef];
			uOffset = -material.uOffset;
			vOffset = material.vOffset;
			uTiling = material.uTiling;
			vTiling = material.vTiling;
			textureSin = idMath.Sin(material.angle);
			textureCos = idMath.Cos(material.angle);
		}

		// now allocate and generate the combined vertexes
		R_AllocStaticTriSurfVerts(tri, tri.numVerts);
		for (j = 0; j < tri.numVerts; j++) {
			mv = mvTable[j];
			tri.verts[j].Clear();
			tri.verts[j].xyz = mesh.vertexes[mv.v];
			tri.verts[j].normal = mv.normal;
			tri.verts[j].color.set(mv.color);//*(unsigned *) tri.verts[j].color = * (unsigned *) mv.color;
			if (mesh.numTVFaces == mesh.numFaces && mesh.numTVertexes != 0) {
				var tv_ = mesh.tvertexes[mv.tv];
				var/*float */u = tv_.x * uTiling + uOffset;
				var/*float */v = tv_.y * vTiling + vOffset;
				tri.verts[j].st[0] = u * textureCos + v * textureSin;
				tri.verts[j].st[1] = u * -textureSin + v * textureCos;
			}
		}

		R_StaticFree(mvTable);
		R_StaticFree(mvHash);
		R_StaticFree(tvRemap);
		R_StaticFree(vRemap);

		// see if we need to merge with a previous surface of the same material
		modelSurf = this.surfaces[mergeTo[objectNum]];
		var mergeTri = modelSurf.geometry;
		if (!mergeTri) {
			modelSurf.geometry = tri;
		} else {
			modelSurf.geometry = R_MergeTriangles(mergeTri, tri);
			R_FreeStaticTriSurf(tri);
			R_FreeStaticTriSurf(mergeTri);
		}
	}

	return true;
}

/*
=================
idRenderModelStatic::ConvertLWOToModelSurfaces
=================
*/
	ConvertLWOToModelSurfaces ( lwo: lwObject ): boolean {
		var im1: idMaterial, im2: idMaterial;
		var tri: srfTriangles_t;
		var lwoSurf: lwSurface;
		var numTVertexes: number;
		var i: number, j: number, k: number;
		var v: number, tv: number;
		var vList: idVec3[];
		var vRemap: Int32Array;
		var tvList: idVec2[];
		var tvRemap: Int32Array;
		var mvTable: matchVert_t[]; // all of the match verts
		var mvHash: matchVert_t[]; //matchVert_t **	// points inside mvTable for each xyz index
		var lastmv: matchVert_t;
		var mv: matchVert_t;
		var normal = new idVec3;
		var mergeTo: Int32Array;
		var color = new Uint8Array( 4 );
		var surf = new modelSurface_t, modelSurf: modelSurface_t;

		if ( !lwo ) {
			return false;
		}
		if ( lwo.surf == null ) {
			return false;
		}

		this.timeStamp = lwo.timeStamp;

		// count the number of surfaces
		i = 0;
		for ( lwoSurf = lwo.surf; lwoSurf; lwoSurf = lwoSurf.next ) {
			i++;
		}

		// the modeling programs can save out multiple surfaces with a common
		// material, but we would like to merge them together where possible
		mergeTo = new Int32Array( i ); // (int *)_alloca( i * sizeof( mergeTo[0] ) ); 
		surf.memset0 ( ); //memset( &surf, 0, sizeof( surf ) );

		if ( !idRenderModelStatic.r_mergeModelSurfaces.GetBool ( ) ) {
			// don't merge any
			for ( lwoSurf = lwo.surf, i = 0; lwoSurf; lwoSurf = lwoSurf.next, i++ ) {
				mergeTo[i] = i;
				surf.shader = declManager.FindMaterial( lwoSurf.name );
				surf.id = this.NumSurfaces ( );
				this.AddSurface( surf );
			}
		} else {
			// search for material matches
			for ( lwoSurf = lwo.surf, i = 0; lwoSurf; lwoSurf = lwoSurf.next, i++ ) {
				im1 = declManager.FindMaterial( lwoSurf.name );
				if ( im1.IsDiscrete ( ) ) {
					// flares, autosprites, etc
					j = this.NumSurfaces ( );
				} else {
					for ( j = 0; j < this.NumSurfaces ( ); j++ ) {
						modelSurf = this.surfaces[j];
						im2 = modelSurf.shader;
						if ( im1 == im2 ) {
							// merge this
							mergeTo[i] = j;
							break;
						}
					}
				}
				if ( j == this.NumSurfaces ( ) ) {
					// didn't merge
					mergeTo[i] = j;
					surf.shader = im1;
					surf.id = this.NumSurfaces ( );
					this.AddSurface( surf );
				}
			}
		}

		var vertexSubset = new idVectorSubset<idVec3>( idVec3, 3 );
		var texCoordSubset = new idVectorSubset<idVec2>( idVec2, 2 );

		// we only ever use the first layer
		var layer: lwLayer = lwo.layer;

		// vertex positions
		if ( layer.point.count <= 0 ) {
			common.Warning( "ConvertLWOToModelSurfaces: model \'%s\' has bad or missing vertex data", this.name.c_str ( ) );
			return false;
		}

		vList = newStructArray<idVec3>( idVec3, layer.point.count ); // (idVec3 *)R_StaticAlloc( layer.point.count * sizeof( vList[0] ) );
		for ( j = 0; j < layer.point.count; j++ ) {
			vList[j].x = layer.point.pt[j].pos[0];
			vList[j].y = layer.point.pt[j].pos[2];
			vList[j].z = layer.point.pt[j].pos[1];
		}

		// vertex texture coords
		numTVertexes = 0;

		if ( layer.nvmaps ) {
			for ( var vm = layer.vmap; vm; vm = vm.next ) {
				if ( vm.type == LWID_( 'T', 'X', 'U', 'V' ) ) {
					numTVertexes += vm.nverts;
				}
			}
		}

		if ( numTVertexes ) {
			tvList = newStructArray<idVec2>( idVec2, numTVertexes ); // (idVec2 *)Mem_Alloc( numTVertexes * sizeof( tvList[0] ) );
			var /*int */offset = 0;
			for ( var vm = layer.vmap; vm; vm = vm.next ) {
				if ( vm.type == LWID_( 'T', 'X', 'U', 'V' ) ) {
					vm.offset = offset;
					for ( k = 0; k < vm.nverts; k++ ) {
						tvList[k + offset].x = vm.val[k][0];
						tvList[k + offset].y = 1.0 - vm.val[k][1]; // invert the t
					}
					offset += vm.nverts;
				}
			}
		} else {
			common.Warning( "ConvertLWOToModelSurfaces: model \'%s\' has bad or missing uv data", this.name.c_str ( ) );
			numTVertexes = 1;
			tvList = newStructArray<idVec2>( idVec2, numTVertexes ); //(idVec2 *)Mem_ClearedAlloc( numTVertexes * sizeof( tvList[0] ) );
		}

		// It seems like the tools our artists are using often generate
		// verts and texcoords slightly separated that should be merged
		// note that we really should combine the surfaces with common materials
		// before doing this operation, because we can miss a slop combination
		// if they are in different surfaces

		vRemap = new Int32Array( layer.point.count ); // (int *)R_StaticAlloc( layer.point.count * sizeof( vRemap[0] ) );

		if ( this.fastLoad ) {
			// renderbump doesn't care about vertex count
			for ( j = 0; j < layer.point.count; j++ ) {
				vRemap[j] = j;
			}
		} else {
			var /*float */vertexEpsilon = idRenderModelStatic.r_slopVertex.GetFloat ( );
			var /*float */ expand = 2 * 32 * vertexEpsilon;
			var mins = new idVec3, maxs = new idVec3;

			SIMDProcessor.MinMax_vec3( mins, maxs, vList, layer.point.count );
			mins.opSubtractionAssignment( new idVec3( expand, expand, expand ) );
			maxs.opAdditionAssignment( new idVec3( expand, expand, expand ) );
			vertexSubset.Init( mins, maxs, 32, 1024 );
			for ( j = 0; j < layer.point.count; j++ ) {
				vRemap[j] = vertexSubset.FindVector( vList, j, vertexEpsilon );
			}
		}

		tvRemap = new Int32Array( numTVertexes ); // (int *)R_StaticAlloc( numTVertexes * sizeof( tvRemap[0] ) );

		if ( this.fastLoad ) {
			// renderbump doesn't care about vertex count
			for ( j = 0; j < numTVertexes; j++ ) {
				tvRemap[j] = j;
			}
		} else {
			var /*float */texCoordEpsilon = idRenderModelStatic.r_slopTexCoord.GetFloat ( );
			var /*float */expand = 2 * 32 * texCoordEpsilon;
			var mins_ = new idVec2, maxs_ = new idVec2;

			SIMDProcessor.MinMax_vec2( mins_, maxs_, tvList, numTVertexes );
			mins_.opSubtractionAssignment( new idVec2( expand, expand ) );
			maxs_.opAdditionAssignment( new idVec2( expand, expand ) );
			texCoordSubset.Init( mins_, maxs_, 32, 1024 );
			for ( j = 0; j < numTVertexes; j++ ) {
				tvRemap[j] = texCoordSubset.FindVector( tvList, j, texCoordEpsilon );
			}
		}

		// build the surfaces
		for ( lwoSurf = lwo.surf, i = 0; lwoSurf; lwoSurf = lwoSurf.next, i++ ) {
			im1 = declManager.FindMaterial( lwoSurf.name );

			var normalsParsed = true;

			// completely ignore any explict normals on surfaces with a renderbump command
			// which will guarantee the best contours and least vertexes.
			var rb = im1.GetRenderBump ( );
			if ( rb /*&& rb[0]*/ ) {
				normalsParsed = false;
			}

			// we need to find out how many unique vertex / texcoord combinations there are

			// the maximum possible number of combined vertexes is the number of indexes
			mvTable = newStructArray<matchVert_t>( matchVert_t, layer.polygon.count * 3 ); // (matchVert_t *)R_ClearedStaticAlloc( layer.polygon.count * 3 * sizeof( mvTable[0] ) );

			// we will have a hash chain based on the xyz values
			mvHash = new Array<matchVert_t>( layer.point.count ); //(matchVert_t **)R_ClearedStaticAlloc( layer.point.count * sizeof( mvHash[0] ) );

			// allocate triangle surface
			tri = R_AllocStaticTriSurf ( );
			tri.numVerts = 0;
			tri.numIndexes = 0;
			R_AllocStaticTriSurfIndexes( tri, layer.polygon.count * 3 );
			tri.generateNormals = !normalsParsed;

			// find all the unique combinations
			var /*float	*/normalEpsilon: number;
			if ( this.fastLoad ) {
				normalEpsilon = 1.0; // don't merge unless completely exact
			} else {
				normalEpsilon = 1.0 - idRenderModelStatic.r_slopNormal.GetFloat ( );
			}
			for ( j = 0; j < layer.polygon.count; j++ ) {
				var poly: lwPolygon = layer.polygon.pol[j];

				if ( poly.surf != lwoSurf ) {
					continue;
				}

				if ( poly.nverts != 3 ) {
					common.Warning( "ConvertLWOToModelSurfaces: model %s has too many verts for a poly! Make sure you triplet it down", this.name.c_str ( ) );
					continue;
				}

				for ( k = 0; k < 3; k++ ) {

					v = vRemap[poly.v[k].index];

					normal.x = poly.v[k].norm[0];
					normal.y = poly.v[k].norm[2];
					normal.z = poly.v[k].norm[1];

					// LWO models aren't all that pretty when it comes down to the floating point values they store
					normal.FixDegenerateNormal ( );

					tv = 0;

					color[0] = lwoSurf.color.rgb[0] * 255;
					color[1] = lwoSurf.color.rgb[1] * 255;
					color[2] = lwoSurf.color.rgb[2] * 255;
					color[3] = 255;

					// first set attributes from the vertex
					var pt: lwPoint = layer.point.pt[poly.v[k].index];
					var /*int */nvm: number;
					for ( nvm = 0; nvm < pt.nvmaps; nvm++ ) {
						var vm_: lwVMapPt = pt.vm[nvm];

						if ( vm_.vmap.type == LWID_( 'T', 'X', 'U', 'V' ) ) {
							tv = tvRemap[vm_.index + vm_.vmap.offset];
						}
						if ( vm_.vmap.type == LWID_( 'R', 'G', 'B', 'A' ) ) {
							for ( var chan = 0; chan < 4; chan++ ) {
								color[chan] = 255 * vm_.vmap.val[vm_.index][chan];
							}
						}
					}

					// then override with polygon attributes
					for ( nvm = 0; nvm < poly.v[k].nvmaps; nvm++ ) {
						var vm__: lwVMapPt = poly.v[k].vm[nvm];

						if ( vm__.vmap.type == LWID_( 'T', 'X', 'U', 'V' ) ) {
							tv = tvRemap[vm__.index + vm__.vmap.offset];
						}
						if ( vm__.vmap.type == LWID_( 'R', 'G', 'B', 'A' ) ) {
							for ( var chan = 0; chan < 4; chan++ ) {
								color[chan] = 255 * vm__.vmap.val[vm__.index][chan];
							}
						}
					}

					// find a matching vert
					for ( lastmv = null, mv = mvHash[v]; mv != null; lastmv = mv, mv = mv.next ) {
						if ( mv.tv != tv ) {
							continue;
						}
						if ( /**(unsigned *)*/ new Uint32Array( mv.color.buffer )[0] != /**(unsigned *)*/new Uint32Array( color.buffer )[0] ) {
							continue;
						}
						if ( !normalsParsed ) {
							// if we are going to create the normals, just
							// matching texcoords is enough
							break;
						}
						if ( mv.normal.timesVec( normal ) > normalEpsilon ) {
							break; // we already have this one
						}
					}
					if ( !mv ) {
						// allocate a new match vert and link to hash chain
						mv = mvTable[tri.numVerts];
						mv.v = v;
						mv.tv = tv;
						mv.normal.opEquals( normal );
						mv.color.set(color);//*(unsigned *)mv.color = *(unsigned *)color;
						mv.next = null;
						if ( lastmv ) {
							lastmv.next = mv;
						} else {
							mvHash[v] = mv;
						}
						tri.numVerts++;
					}

					tri.indexes[tri.numIndexes] = mvTable.indexOf( mv ); // mv - mvTable;
					tri.numIndexes++;
				}
			}

			// allocate space for the indexes and copy them
			if ( tri.numIndexes > layer.polygon.count * 3 ) {
				common.FatalError( "ConvertLWOToModelSurfaces: index miscount in LWO file %s", this.name.c_str ( ) );
			}
			if ( tri.numVerts > layer.polygon.count * 3 ) {
				common.FatalError( "ConvertLWOToModelSurfaces: vertex miscount in LWO file %s", this.name.c_str ( ) );
			}

			// now allocate and generate the combined vertexes
			R_AllocStaticTriSurfVerts( tri, tri.numVerts );
			for ( j = 0; j < tri.numVerts; j++ ) {
				mv = mvTable[j];
				tri.verts[j].Clear ( );
				tri.verts[j].xyz.opEquals( vList[mv.v] );
				tri.verts[j].st.opEquals( tvList[mv.tv] );
				tri.verts[j].normal.opEquals( mv.normal );
				tri.verts[j].color.set( mv.color );
			}

			R_StaticFree( mvTable );
			R_StaticFree( mvHash );

			// see if we need to merge with a previous surface of the same material
			modelSurf = this.surfaces[mergeTo[i]];
			var mergeTri: srfTriangles_t = modelSurf.geometry;
			if ( !mergeTri ) {
				modelSurf.geometry = tri;
			} else {
				modelSurf.geometry = R_MergeTriangles( mergeTri, tri );
				R_FreeStaticTriSurf( tri );
				R_FreeStaticTriSurf( mergeTri );
			}
		}

		R_StaticFree( tvRemap );
		R_StaticFree( vRemap );
		R_StaticFree( tvList );
		R_StaticFree( vList );

		return true;
	}

/////*
////=================
////idRenderModelStatic::ConvertLWOToASE
////=================
////*/
////struct aseModel_s *idRenderModelStatic::ConvertLWOToASE( const struct st_lwObject *obj, fileName:string ) {
////	int j, k;
////	aseModel_t *ase;

////	if ( !obj ) {
////		return NULL;
////	}

////	// NOTE: using new operator because aseModel_t contains idList class objects
////	ase = new aseModel_t;
////	ase.timeStamp = obj.timeStamp;
////	ase.objects.Resize( obj.nlayers, obj.nlayers );

////	int materialRef = 0;

////	for ( lwSurface *surf = obj.surf; surf; surf = surf.next ) {

////		aseMaterial_t *mat = (aseMaterial_t *)Mem_ClearedAlloc( sizeof( *mat ) );
////		strcpy( mat.name, surf.name );
////		mat.uTiling = mat.vTiling = 1;
////		mat.angle = mat.uOffset = mat.vOffset = 0;
////		ase.materials.Append( mat );

////		lwLayer *layer = obj.layer;

////		aseObject_t *object = (aseObject_t *)Mem_ClearedAlloc( sizeof( *object ) );
////		object.materialRef = materialRef++;

////		aseMesh_t *mesh = &object.mesh;
////		ase.objects.Append( object );

////		mesh.numFaces = layer.polygon.count;
////		mesh.numTVFaces = mesh.numFaces;
////		mesh.faces = (aseFace_t *)Mem_Alloc( mesh.numFaces  * sizeof( mesh.faces[0] ) );

////		mesh.numVertexes = layer.point.count;
////		mesh.vertexes = (idVec3 *)Mem_Alloc( mesh.numVertexes * sizeof( mesh.vertexes[0] ) );

////		// vertex positions
////		if ( layer.point.count <= 0 ) {
////			common.Warning( "ConvertLWOToASE: model \'%s\' has bad or missing vertex data", this.name.c_str() );
////		}

////		for ( j = 0; j < layer.point.count; j++ ) {
////			mesh.vertexes[j].x = layer.point.pt[j].pos[0];
////			mesh.vertexes[j].y = layer.point.pt[j].pos[2];
////			mesh.vertexes[j].z = layer.point.pt[j].pos[1];
////		}

////		// vertex texture coords
////		mesh.numTVertexes = 0;

////		if ( layer.nvmaps ) {
////		  	for( lwVMap *vm = layer.vmap; vm; vm = vm.next ) {
////				if ( vm.type == LWID_('T','X','U','V') ) {
////					mesh.numTVertexes += vm.nverts;
////				}
////			}
////		}

////		if ( mesh.numTVertexes ) {
////		  	mesh.tvertexes = (idVec2 *)Mem_Alloc( mesh.numTVertexes * sizeof( mesh.tvertexes[0] ) );
////		  	int offset = 0;
////		  	for( lwVMap *vm = layer.vmap; vm; vm = vm.next ) {
////				if ( vm.type == LWID_('T','X','U','V') ) {
////	  				vm.offset = offset;
////		  			for ( k = 0; k < vm.nverts; k++ ) {
////		  		   		mesh.tvertexes[k + offset].x = vm.val[k][0];
////						mesh.tvertexes[k + offset].y = 1.0 - vm.val[k][1];	// invert the t
////		  		   	}
////			  		offset += vm.nverts;
////				}
////		  	}
////	  	} else {
////			common.Warning( "ConvertLWOToASE: model \'%s\' has bad or missing uv data", fileName );
////	  		mesh.numTVertexes = 1;
////	  		mesh.tvertexes = (idVec2 *)Mem_ClearedAlloc( mesh.numTVertexes * sizeof( mesh.tvertexes[0] ) );
////	  	}

////		mesh.normalsParsed = true;
////		mesh.colorsParsed = true;	// because we are falling back to the surface color

////		// triangles
////		int faceIndex = 0;
////		for ( j = 0; j < layer.polygon.count; j++ ) {
////			lwPolygon *poly = &layer.polygon.pol[j];

////			if ( poly.surf != surf ) {
////				continue;
////			}

////			if ( poly.nverts != 3 ) {
////				common.Warning( "ConvertLWOToASE: model %s has too many verts for a poly! Make sure you triplet it down", fileName );
////				continue;
////			}

////			mesh.faces[faceIndex].faceNormal.x = poly.norm[0];
////			mesh.faces[faceIndex].faceNormal.y = poly.norm[2];
////			mesh.faces[faceIndex].faceNormal.z = poly.norm[1];

////			for ( k = 0; k < 3; k++ ) {

////				mesh.faces[faceIndex].vertexNum[k] = poly.v[k].index;

////				mesh.faces[faceIndex].vertexNormals[k].x = poly.v[k].norm[0];
////				mesh.faces[faceIndex].vertexNormals[k].y = poly.v[k].norm[2];
////				mesh.faces[faceIndex].vertexNormals[k].z = poly.v[k].norm[1];

////				// complete fallbacks
////				mesh.faces[faceIndex].tVertexNum[k] = 0;

////				mesh.faces[faceIndex].vertexColors[k][0] = surf.color.rgb[0] * 255;
////				mesh.faces[faceIndex].vertexColors[k][1] = surf.color.rgb[1] * 255;
////				mesh.faces[faceIndex].vertexColors[k][2] = surf.color.rgb[2] * 255;
////				mesh.faces[faceIndex].vertexColors[k][3] = 255;

////				// first set attributes from the vertex
////				lwPoint	*pt = &layer.point.pt[poly.v[k].index];
////				int nvm;
////				for ( nvm = 0; nvm < pt.nvmaps; nvm++ ) {
////					lwVMapPt *vm = &pt.vm[nvm];

////					if ( vm.vmap.type == LWID_('T','X','U','V') ) {
////						mesh.faces[faceIndex].tVertexNum[k] = vm.index + vm.vmap.offset;
////					}
////					if ( vm.vmap.type == LWID_('R','G','B','A') ) {
////						for ( int chan = 0; chan < 4; chan++ ) {
////							mesh.faces[faceIndex].vertexColors[k][chan] = 255 * vm.vmap.val[vm.index][chan];
////						}
////					}
////				}

////				// then override with polygon attributes
////				for ( nvm = 0; nvm < poly.v[k].nvmaps; nvm++ ) {
////					lwVMapPt *vm = &poly.v[k].vm[nvm];

////					if ( vm.vmap.type == LWID_('T','X','U','V') ) {
////						mesh.faces[faceIndex].tVertexNum[k] = vm.index + vm.vmap.offset;
////					}
////					if ( vm.vmap.type == LWID_('R','G','B','A') ) {
////						for ( int chan = 0; chan < 4; chan++ ) {
////							mesh.faces[faceIndex].vertexColors[k][chan] = 255 * vm.vmap.val[vm.index][chan];
////						}
////					}
////				}
////			}

////			faceIndex++;
////		}

////		mesh.numFaces = faceIndex;
////		mesh.numTVFaces = faceIndex;

////		aseFace_t *newFaces = ( aseFace_t* )Mem_Alloc( mesh.numFaces * sizeof ( mesh.faces[0] ) );
////		memcpy( newFaces, mesh.faces, sizeof( mesh.faces[0] ) * mesh.numFaces );
////		Mem_Free( mesh.faces );
////		mesh.faces = newFaces;
////	}

////	return ase;
////}

/////*
////=================
////idRenderModelStatic::ConvertMAToModelSurfaces
////=================
////*/
////bool idRenderModelStatic::ConvertMAToModelSurfaces (const struct maModel_s *ma ) {

////	maObject_t *	object;
////	maMesh_t *		mesh;
////	maMaterial_t *	material;

////	const idMaterial *im1, *im2;
////	srfTriangles_t *tri;
////	int				objectNum;
////	int				i, j, k;
////	int				v, tv;
////	int *			vRemap;
////	int *			tvRemap;
////	matchVert_t *	mvTable;	// all of the match verts
////	matchVert_t **	mvHash;		// points inside mvTable for each xyz index
////	matchVert_t *	lastmv;
////	matchVert_t *	mv;
////	idVec3			normal;
////	float			uOffset, vOffset, textureSin, textureCos;
////	float			uTiling, vTiling;
////	int *			mergeTo;
////	byte *			color;
////	static byte	identityColor[4] = { 255, 255, 255, 255 };
////	modelSurface_t	surf, *modelSurf;

////	if ( !ma ) {
////		return false;
////	}
////	if ( ma.objects.Num() < 1 ) {
////		return false;
////	}

////	timeStamp = ma.timeStamp;

////	// the modeling programs can save out multiple surfaces with a common
////	// material, but we would like to mege them together where possible
////	// meaning that this.NumSurfaces() <= ma.objects.currentElements
////	mergeTo = (int *)_alloca( ma.objects.Num() * sizeof( *mergeTo ) ); 

////	surf.geometry = NULL;
////	if ( ma.materials.Num() == 0 ) {
////		// if we don't have any materials, dump everything into a single surface
////		surf.shader = tr.defaultMaterial;
////		surf.id = 0;
////		this.AddSurface( surf );
////		for ( i = 0 ; i < ma.objects.Num() ; i++ ) { 
////			mergeTo[i] = 0;
////		}
////	} else if ( !r_mergeModelSurfaces.GetBool() ) {
////		// don't merge any
////		for ( i = 0 ; i < ma.objects.Num() ; i++ ) { 
////			mergeTo[i] = i;
////			object = ma.objects[i];
////			if(object.materialRef >= 0) {
////				material = ma.materials[object.materialRef];
////				surf.shader = declManager.FindMaterial( material.name );
////			} else {
////				surf.shader = tr.defaultMaterial;
////			}
////			surf.id = this.NumSurfaces();
////			this.AddSurface( surf );
////		}
////	} else {
////		// search for material matches
////		for ( i = 0 ; i < ma.objects.Num() ; i++ ) { 
////			object = ma.objects[i];
////			if(object.materialRef >= 0) {
////				material = ma.materials[object.materialRef];
////				im1 = declManager.FindMaterial( material.name );
////			} else {
////				im1 = tr.defaultMaterial;
////			}
////			if ( im1.IsDiscrete() ) {
////				// flares, autosprites, etc
////				j = this.NumSurfaces();
////			} else {
////				for ( j = 0 ; j < this.NumSurfaces() ; j++ ) {
////					modelSurf = &this.surfaces[j];
////					im2 = modelSurf.shader;
////					if ( im1 == im2 ) {
////						// merge this
////						mergeTo[i] = j;
////						break;
////					}
////				}
////			}
////			if ( j == this.NumSurfaces() ) {
////				// didn't merge
////				mergeTo[i] = j;
////				surf.shader = im1;
////				surf.id = this.NumSurfaces();
////				this.AddSurface( surf );
////			}
////		}
////	}

////	idVectorSubset<idVec3, 3> vertexSubset;
////	idVectorSubset<idVec2, 2> texCoordSubset;

////	// build the surfaces
////	for ( objectNum = 0 ; objectNum < ma.objects.Num() ; objectNum++ ) {
////		object = ma.objects[objectNum];
////		mesh = &object.mesh;
////		if(object.materialRef >= 0) {
////			material = ma.materials[object.materialRef];
////			im1 = declManager.FindMaterial( material.name );
////		} else {
////			im1 = tr.defaultMaterial;
////		}

////		bool normalsParsed = mesh.normalsParsed;

////		// completely ignore any explict normals on surfaces with a renderbump command
////		// which will guarantee the best contours and least vertexes.
////		const char *rb = im1.GetRenderBump();
////		if ( rb && rb[0] ) {
////			normalsParsed = false;
////		}

////		// It seems like the tools our artists are using often generate
////		// verts and texcoords slightly separated that should be merged
////		// note that we really should combine the surfaces with common materials
////		// before doing this operation, because we can miss a slop combination
////		// if they are in different surfaces

////		vRemap = (int *)R_StaticAlloc( mesh.numVertexes * sizeof( vRemap[0] ) );

////		if ( this.fastLoad ) {
////			// renderbump doesn't care about vertex count
////			for ( j = 0; j < mesh.numVertexes; j++ ) {
////				vRemap[j] = j;
////			}
////		} else {
////			float vertexEpsilon = idRenderModelStatic.r_slopVertex.GetFloat();
////			float expand = 2 * 32 * vertexEpsilon;
////			idVec3 mins, maxs;

////			SIMDProcessor.MinMax( mins, maxs, mesh.vertexes, mesh.numVertexes );
////			mins -= idVec3( expand, expand, expand );
////			maxs += idVec3( expand, expand, expand );
////			vertexSubset.Init( mins, maxs, 32, 1024 );
////			for ( j = 0; j < mesh.numVertexes; j++ ) {
////				vRemap[j] = vertexSubset.FindVector( mesh.vertexes, j, vertexEpsilon );
////			}
////		}

////		tvRemap = (int *)R_StaticAlloc( mesh.numTVertexes * sizeof( tvRemap[0] ) );

////		if ( this.fastLoad ) {
////			// renderbump doesn't care about vertex count
////			for ( j = 0; j < mesh.numTVertexes; j++ ) {
////				tvRemap[j] = j;
////			}
////		} else {
////			float texCoordEpsilon = idRenderModelStatic.r_slopTexCoord.GetFloat();
////			float expand = 2 * 32 * texCoordEpsilon;
////			idVec2 mins, maxs;

////			SIMDProcessor.MinMax( mins, maxs, mesh.tvertexes, mesh.numTVertexes );
////			mins -= idVec2( expand, expand );
////			maxs += idVec2( expand, expand );
////			texCoordSubset.Init( mins, maxs, 32, 1024 );
////			for ( j = 0; j < mesh.numTVertexes; j++ ) {
////				tvRemap[j] = texCoordSubset.FindVector( mesh.tvertexes, j, texCoordEpsilon );
////			}
////		}

////		// we need to find out how many unique vertex / texcoord / color combinations
////		// there are, because MA tracks them separately but we need them unified

////		// the maximum possible number of combined vertexes is the number of indexes
////		mvTable = (matchVert_t *)R_ClearedStaticAlloc( mesh.numFaces * 3 * sizeof( mvTable[0] ) );

////		// we will have a hash chain based on the xyz values
////		mvHash = (matchVert_t **)R_ClearedStaticAlloc( mesh.numVertexes * sizeof( mvHash[0] ) );

////		// allocate triangle surface
////		tri = R_AllocStaticTriSurf();
////		tri.numVerts = 0;
////		tri.numIndexes = 0;
////		R_AllocStaticTriSurfIndexes( tri, mesh.numFaces * 3 );
////		tri.generateNormals = !normalsParsed;

////		// init default normal, color and tex coord index
////		normal.Zero();
////		color = identityColor;
////		tv = 0;

////		// find all the unique combinations
////		float normalEpsilon = 1.0 - idRenderModelStatic.r_slopNormal.GetFloat();
////		for ( j = 0; j < mesh.numFaces; j++ ) {
////			for ( k = 0; k < 3; k++ ) {
////				v = mesh.faces[j].vertexNum[k];

////				if ( v < 0 || v >= mesh.numVertexes ) {
////					common.Error( "ConvertMAToModelSurfaces: bad vertex index in MA file %s", this.name.c_str() );
////				}

////				// collapse the position if it was slightly offset 
////				v = vRemap[v];

////				// we may or may not have texcoords to compare
////				if ( mesh.numTVertexes != 0 ) {
////					tv = mesh.faces[j].tVertexNum[k];
////					if ( tv < 0 || tv >= mesh.numTVertexes ) {
////						common.Error( "ConvertMAToModelSurfaces: bad tex coord index in MA file %s", this.name.c_str() );
////					}
////					// collapse the tex coord if it was slightly offset
////					tv = tvRemap[tv];
////				}

////				// we may or may not have normals to compare
////				if ( normalsParsed ) {
////					normal = mesh.faces[j].vertexNormals[k];
////				}

////				//BSM: Todo: Fix the vertex colors
////				// we may or may not have colors to compare
////				if ( mesh.faces[j].vertexColors[k] != -1 && mesh.faces[j].vertexColors[k] != -999 ) {

////					color = &mesh.colors[mesh.faces[j].vertexColors[k]*4];
////				}

////				// find a matching vert
////				for ( lastmv = NULL, mv = mvHash[v]; mv != NULL; lastmv = mv, mv = mv.next ) {
////					if ( mv.tv != tv ) {
////						continue;
////					}
////					if ( *(unsigned *)mv.color != *(unsigned *)color ) {
////						continue;
////					}
////					if ( !normalsParsed ) {
////						// if we are going to create the normals, just
////						// matching texcoords is enough
////						break;
////					}
////					if ( mv.normal * normal > normalEpsilon ) {
////						break;		// we already have this one
////					}
////				}
////				if ( !mv ) {
////					// allocate a new match vert and link to hash chain
////					mv = &mvTable[ tri.numVerts ];
////					mv.v = v;
////					mv.tv = tv;
////					mv.normal = normal;
////					*(unsigned *)mv.color = *(unsigned *)color;
////					mv.next = NULL;
////					if ( lastmv ) {
////						lastmv.next = mv;
////					} else {
////						mvHash[v] = mv;
////					}
////					tri.numVerts++;
////				}

////				tri.indexes[tri.numIndexes] = mv - mvTable;
////				tri.numIndexes++;
////			}
////		}

////		// allocate space for the indexes and copy them
////		if ( tri.numIndexes > mesh.numFaces * 3 ) {
////			common.FatalError( "ConvertMAToModelSurfaces: index miscount in MA file %s", this.name.c_str() );
////		}
////		if ( tri.numVerts > mesh.numFaces * 3 ) {
////			common.FatalError( "ConvertMAToModelSurfaces: vertex miscount in MA file %s", this.name.c_str() );
////		}

////		// an MA allows the texture coordinates to be scaled, translated, and rotated
////		//BSM: Todo: Does Maya support this and if so how
////		//if ( ase.materials.Num() == 0 ) {
////			uOffset = vOffset = 0.0;
////			uTiling = vTiling = 1.0;
////			textureSin = 0.0;
////			textureCos = 1.0;
////		//} else {
////		//	material = ase.materials[object.materialRef];
////		//	uOffset = -material.uOffset;
////		//	vOffset = material.vOffset;
////		//	uTiling = material.uTiling;
////		//	vTiling = material.vTiling;
////		//	textureSin = idMath::Sin( material.angle );
////		//	textureCos = idMath::Cos( material.angle );
////		//}

////		// now allocate and generate the combined vertexes
////		R_AllocStaticTriSurfVerts( tri, tri.numVerts );
////		for ( j = 0; j < tri.numVerts; j++ ) {
////			mv = &mvTable[j];
////			tri.verts[ j ].Clear();
////			tri.verts[ j ].xyz = mesh.vertexes[ mv.v ];
////			tri.verts[ j ].normal = mv.normal;
////			*(unsigned *)tri.verts[j].color = *(unsigned *)mv.color;
////			if ( mesh.numTVertexes != 0 ) {
////				const idVec2 &tv = mesh.tvertexes[ mv.tv ];
////				float u = tv.x * uTiling + uOffset;
////				float v = tv.y * vTiling + vOffset;
////				tri.verts[ j ].st[0] = u * textureCos + v * textureSin;
////				tri.verts[ j ].st[1] = u * -textureSin + v * textureCos;
////			}
////		}

////		R_StaticFree( mvTable );
////		R_StaticFree( mvHash );
////		R_StaticFree( tvRemap );
////		R_StaticFree( vRemap );

////		// see if we need to merge with a previous surface of the same material
////		modelSurf = &this.surfaces[mergeTo[ objectNum ]];
////		srfTriangles_t	*mergeTri = modelSurf.geometry;
////		if ( !mergeTri ) {
////			modelSurf.geometry = tri;
////		} else {
////			modelSurf.geometry = R_MergeTriangles( mergeTri, tri );
////			R_FreeStaticTriSurf( tri );
////			R_FreeStaticTriSurf( mergeTri );
////		}
////	}

////	return true;
////}

/*
=================
idRenderModelStatic::LoadASE
=================
*/
	LoadASE ( fileName: string ): boolean {
		var ase: aseModel_t;

		ase = ASE_Load( fileName );
		if ( ase == null ) {
			return false;
		}

		this.ConvertASEToModelSurfaces( ase );

		ASE_Free( ase );

		return true;
	}

/*
=================
idRenderModelStatic::LoadLWO
=================
*/
	LoadLWO ( fileName: string ): boolean {
		var /*unsigned int */failID = new R<number> ( );
		var /*int */failPos = new R<number> ( );
		var lwo: lwObject;

		lwo = lwGetObject( fileName, failID, failPos );
		if ( lwo == null ) {
			return false;
		}

		this.ConvertLWOToModelSurfaces( lwo );

		lwFreeObject( lwo );

		return true;
	}

/*
=================
idRenderModelStatic::LoadMA
=================
*/
	LoadMA ( fileName: string ): boolean {
		todoThrow ( );
////	maModel_t *ma;

////	ma = MA_Load( fileName );
////	if ( ma == NULL ) {
////		return false;
////	}

////	ConvertMAToModelSurfaces( ma );

////	MA_Free( ma );

		return true;
	}

/*
=================
idRenderModelStatic::LoadFLT

USGS height map data for megaTexture experiments
=================
*/
LoadFLT( fileName:string ):boolean {
	todoThrow();
////	float	*data;
////	int		len;

////	len = fileSystem.ReadFile( fileName, (void **)&data );
////	if ( len <= 0 ) {
////		return false;
////	}
////	int	size = sqrt( len / 4.0 );

////	// bound the altitudes
////	float min = 9999999;
////	float max = -9999999;
////	for ( int i = 0 ; i < len/4 ; i++ ) {
////	data[i] = BigFloat( data[i] );
////	if ( data[i] == -9999 ) {
////		data[i] = 0;		// unscanned areas
////	}

////		if ( data[i] < min ) {
////			min = data[i];
////		}
////		if ( data[i] > max ) {
////			max = data[i];
////		}
////	}
////#if 1
////	// write out a gray scale height map
////	byte	*image = (byte *)R_StaticAlloc( len );
////	byte	*image_p = image;
////	for ( int i = 0 ; i < len/4 ; i++ ) {
////		float v = ( data[i] - min ) / ( max - min );
////		image_p[0] =
////		image_p[1] =
////		image_p[2] = v * 255;
////		image_p[3] = 255;
////		image_p += 4;
////	}
////	idStr	tgaName = fileName;
////	tgaName.StripFileExtension();
////	tgaName += ".tga";
////	R_WriteTGA( tgaName.c_str(), image, size, size, false );
////	R_StaticFree( image );
//////return false;
////#endif

////	// find the island above sea level
////	int	minX, maxX, minY, maxY;
////	{
////		int	i;	
////		for ( minX = 0 ; minX < size ; minX++ ) {
////			for ( i = 0 ; i < size ; i++ ) {
////				if ( data[i*size + minX] > 1.0 ) {
////					break;
////				}
////			}
////			if ( i != size ) {
////				break;
////			}
////		}

////		for ( maxX = size-1 ; maxX > 0 ; maxX-- ) {
////			for ( i = 0 ; i < size ; i++ ) {
////				if ( data[i*size + maxX] > 1.0 ) {
////					break;
////				}
////			}
////			if ( i != size ) {
////				break;
////			}
////		}

////		for ( minY = 0 ; minY < size ; minY++ ) {
////			for ( i = 0 ; i < size ; i++ ) {
////				if ( data[minY*size + i] > 1.0 ) {
////					break;
////				}
////			}
////			if ( i != size ) {
////				break;
////			}
////		}

////		for ( maxY = size-1 ; maxY < size ; maxY-- ) {
////			for ( i = 0 ; i < size ; i++ ) {
////				if ( data[maxY*size + i] > 1.0 ) {
////					break;
////				}
////			}
////			if ( i != size ) {
////				break;
////			}
////		}
////	}

////	int	width = maxX - minX + 1;
////	int height = maxY - minY + 1;

//////width /= 2;
////	// allocate triangle surface
////	srfTriangles_t *tri = R_AllocStaticTriSurf();
////	tri.numVerts = width * height;
////	tri.numIndexes = (width-1) * (height-1) * 6;

////	this.fastLoad = true;		// don't do all the sil processing

////	R_AllocStaticTriSurfIndexes( tri, tri.numIndexes );
////	R_AllocStaticTriSurfVerts( tri, tri.numVerts );

////	for ( int i = 0 ; i < height ; i++ ) {
////		for ( int j = 0; j < width ; j++ ) {
////			int		v = i * width + j;
////			tri.verts[ v ].Clear();
////			tri.verts[ v ].xyz[0] = j * 10;	// each sample is 10 meters
////			tri.verts[ v ].xyz[1] = -i * 10;
////			tri.verts[ v ].xyz[2] = data[(minY+i)*size+minX+j];	// height is in meters
////			tri.verts[ v ].st[0] = (float) j / (width-1);
////			tri.verts[ v ].st[1] = 1.0 - ( (float) i / (height-1) );
////		}
////	}

////	for ( int i = 0 ; i < height-1 ; i++ ) {
////		for ( int j = 0; j < width-1 ; j++ ) {
////			int	v = ( i * (width-1) + j ) * 6;
////#if 0
////			tri.indexes[ v + 0 ] = i * width + j;
////			tri.indexes[ v + 1 ] = (i+1) * width + j;
////			tri.indexes[ v + 2 ] = (i+1) * width + j + 1;
////			tri.indexes[ v + 3 ] = i * width + j;
////			tri.indexes[ v + 4 ] = (i+1) * width + j + 1;
////			tri.indexes[ v + 5 ] = i * width + j + 1;
////#else
////			tri.indexes[ v + 0 ] = i * width + j;
////			tri.indexes[ v + 1 ] = i * width + j + 1;
////			tri.indexes[ v + 2 ] = (i+1) * width + j + 1;
////			tri.indexes[ v + 3 ] = i * width + j;
////			tri.indexes[ v + 4 ] = (i+1) * width + j + 1;
////			tri.indexes[ v + 5 ] = (i+1) * width + j;
////#endif
////		}
////	}

////	fileSystem.FreeFile( data );

////	modelSurface_t	surface;

////	surface.geometry = tri;
////	surface.id = 0;
////	surface.shader = tr.defaultMaterial; // declManager.FindMaterial( "shaderDemos/megaTexture" );

////	this.AddSurface( surface );

	return true;
}


//=============================================================================

/*
================
idRenderModelStatic::PurgeModel
================
*/
PurgeModel  () {
	var i: number;
	var surf: modelSurface_t;

	for (i = 0; i < this.surfaces.Num(); i++) {
		surf = this.surfaces[i];

		if (surf.geometry) {
			R_FreeStaticTriSurf(surf.geometry);
		}
	}
	this.surfaces.Clear();

	this.purged = true;
}

/////*
////==============
////idRenderModelStatic::FreeVertexCache

////We are about to restart the vertex cache, so dump everything
////==============
////*/
////void idRenderModelStatic::FreeVertexCache( ) {
////	for ( int j = 0 ; j < surfaces.Num() ; j++ ) {
////		srfTriangles_t *tri = surfaces[j].geometry;
////		if ( !tri ) {
////			continue;
////		}
////		if ( tri.ambientCache ) {
////			vertexCache.Free( tri.ambientCache );
////			tri.ambientCache = NULL;
////		}
////		// static shadows may be present
////		if ( tri.shadowCache ) {
////			vertexCache.Free( tri.shadowCache );
////			tri.shadowCache = NULL;
////		}
////	}
////}

/////*
////================
////idRenderModelStatic::ReadFromDemoFile
////================
////*/
////void idRenderModelStatic::ReadFromDemoFile( class idDemoFile *f ) {
////	PurgeModel();

////	this.InitEmpty( f.ReadHashString() );

////	int i, j, numSurfaces;
////	f.ReadInt( numSurfaces );

////	for ( i = 0 ; i < numSurfaces ; i++ ) {
////		modelSurface_t	surf;

////		surf.shader = declManager.FindMaterial( f.ReadHashString() );

////		srfTriangles_t	*tri = R_AllocStaticTriSurf();

////		f.ReadInt( tri.numIndexes );
////		R_AllocStaticTriSurfIndexes( tri, tri.numIndexes );
////		for ( j = 0; j < tri.numIndexes; ++j )
////			f.ReadInt( (int&)tri.indexes[j] );

////		f.ReadInt( tri.numVerts );
////		R_AllocStaticTriSurfVerts( tri, tri.numVerts );
////		for ( j = 0; j < tri.numVerts; ++j ) {
////			f.ReadVec3( tri.verts[j].xyz );
////			f.ReadVec2( tri.verts[j].st );
////			f.ReadVec3( tri.verts[j].normal );
////			f.ReadVec3( tri.verts[j].tangents[0] );
////			f.ReadVec3( tri.verts[j].tangents[1] );
////			f.ReadUnsignedChar( tri.verts[j].color[0] );
////			f.ReadUnsignedChar( tri.verts[j].color[1] );
////			f.ReadUnsignedChar( tri.verts[j].color[2] );
////			f.ReadUnsignedChar( tri.verts[j].color[3] );
////		}

////		surf.geometry = tri;

////		this.AddSurface( surf );
////	}
////	this.FinishSurfaces();
////}

/////*
////================
////idRenderModelStatic::WriteToDemoFile
////================
////*/
////void idRenderModelStatic::WriteToDemoFile( class idDemoFile *f ) {
////	int	data[1];

////	// note that it has been updated
////	lastArchivedFrame = tr.frameCount;

////	data[0] = DC_DEFINE_MODEL;
////	f.WriteInt( data[0] );
////	f.WriteHashString( this.Name() );

////	int i, j, iData = surfaces.Num();
////	f.WriteInt( iData );

////	for ( i = 0 ; i < surfaces.Num() ; i++ ) {
////		var surf = &surfaces[i];

////		f.WriteHashString( surf.shader.GetName() );

////		srfTriangles_t *tri = surf.geometry;
////		f.WriteInt( tri.numIndexes );
////		for ( j = 0; j < tri.numIndexes; ++j )
////			f.WriteInt( (int&)tri.indexes[j] );
////		f.WriteInt( tri.numVerts );
////		for ( j = 0; j < tri.numVerts; ++j ) {
////			f.WriteVec3( tri.verts[j].xyz );
////			f.WriteVec2( tri.verts[j].st );
////			f.WriteVec3( tri.verts[j].normal );
////			f.WriteVec3( tri.verts[j].tangents[0] );
////			f.WriteVec3( tri.verts[j].tangents[1] );
////			f.WriteUnsignedChar( tri.verts[j].color[0] );
////			f.WriteUnsignedChar( tri.verts[j].color[1] );
////			f.WriteUnsignedChar( tri.verts[j].color[2] );
////			f.WriteUnsignedChar( tri.verts[j].color[3] );
////		}
////	}
////}

/*
================
idRenderModelStatic::IsLoaded
================
*/
IsLoaded  (): boolean {
	return !this.purged;
}

/*
================
idRenderModelStatic::SetLevelLoadReferenced
================
*/
SetLevelLoadReferenced  (referenced: boolean): void {
	this.levelLoadReferenced = referenced;
}

/*
================
idRenderModelStatic::IsLevelLoadReferenced
================
*/
IsLevelLoadReferenced  (): boolean {
	return this.levelLoadReferenced;
}

/*
=================
idRenderModelStatic::TouchData
=================
*/
TouchData  () {
	for (var i = 0; i < this.surfaces.Num(); i++) {
		var surf: modelSurface_t = this.surfaces[i];

		// re-find the material to make sure it gets added to the
		// level keep list
		declManager.FindMaterial(surf.shader.GetName());
	}
}

/////*
////=================
////idRenderModelStatic::DeleteSurfaceWithId
////=================
////*/
////bool idRenderModelStatic::DeleteSurfaceWithId( /*int*/ id:number ) {
////	var/*int*/i:number;

////	for ( i = 0; i < this.surfaces.Num(); i++ ) {
////		if ( this.surfaces[i].id == id ) {
////			R_FreeStaticTriSurf( this.surfaces[i].geometry );
////			this.surfaces.RemoveIndex( i );
////			return true;
////		}
////	}
////	return false;
////}

/////*
////=================
////idRenderModelStatic::DeleteSurfacesWithNegativeId
////=================
////*/
////void idRenderModelStatic::DeleteSurfacesWithNegativeId( ) {
////	var/*int*/i:number;

////	for ( i = 0; i < this.surfaces.Num(); i++ ) {
////		if ( this.surfaces[i].id < 0 ) {
////			R_FreeStaticTriSurf( this.surfaces[i].geometry );
////			this.surfaces.RemoveIndex( i );
////			i--;
////		}
////	}
////}

/////*
////=================
////idRenderModelStatic::FindSurfaceWithId
////=================
////*/
////bool idRenderModelStatic::FindSurfaceWithId( /*int*/ id:number, int &surfaceNum ) {
////	var/*int*/i:number;

////	for ( i = 0; i < this.surfaces.Num(); i++ ) {
////		if ( this.surfaces[i].id == id ) {
////			surfaceNum = i;
////			return true;
////		}
////	}
////	return false;
////}

}

/*
===============================================================================

	MD5 animated model

===============================================================================
*/

class idMD5Mesh {
	constructor() {
		todoThrow()
	}
////	friend class				idRenderModelMD5;

////public:
////								idMD5Mesh();
////								~idMD5Mesh();

//// 	void						ParseMesh( idLexer &parser, int numJoints, const idJointMat *joints );
////	void						UpdateSurface( const struct renderEntity_s *ent, const idJointMat *joints, modelSurface_t *surf );
////	idBounds					CalcBounds( const idJointMat *joints );
////	int							NearestJoint( int a, int b, int c ) const;
////	int							NumVerts( void ) const;
////	int							NumTris( void ) const;
////	int							NumWeights( void ) const;

////private:
////	idList<idVec2>				texCoords;			// texture coordinates
////	int							numWeights;			// number of weights
////	idVec4 *					scaledWeights;		// joint weights
////	int *						weightIndex;		// pairs of: joint offset + bool true if next weight is for next vertex
////	const idMaterial *			shader;				// material applied to mesh
////	int							numTris;			// number of triangles
////	struct deformInfo_s *		deformInfo;			// used to create srfTriangles_t from base frames and new vertexes
////	int							surfaceNum;			// number of the static surface created for this mesh

////	void						TransformVerts( idDrawVert *verts, const idJointMat *joints );
////	void						TransformScaledVerts( idDrawVert *verts, const idJointMat *joints, float scale );
}

class idRenderModelMD5 extends idRenderModelStatic {
////public:
////	virtual void				InitFromFile( fileName:string );
////	virtual IsDynamicModel() const;
////	virtual idBounds			Bounds( const struct renderEntity_s *ent ) const;
////	virtual void				Print() const;
////	virtual void				List() const;
////	virtual void				TouchData();
////	virtual void				PurgeModel();
////	virtual void				LoadModel();
////	virtual int					Memory() const;
////	virtual idRenderModel *		InstantiateDynamicModel( const struct renderEntity_s *ent, const struct viewDef_s *view, idRenderModel *cachedModel );
////	virtual int					NumJoints( void ) const;
////	virtual const idMD5Joint *	GetJoints( void ) const;
////	virtual jointHandle_t		GetJointHandle( name:string ) const;
////	virtual const char *		GetJointName( jointHandle_t handle ) const;
////	virtual const idJointQuat *	GetDefaultPose( void ) const;
////	virtual int					NearestJoint( int surfaceNum, int a, int b, int c ) const;

////private:
	joints = new idList<idMD5Joint>(idMD5Joint);
	defaultPose = new idList<idJointQuat>(idJointQuat);
	meshes = new idList<idMD5Mesh>(idMD5Mesh);

////	void						CalculateBounds( const idJointMat *joints );
////	void						GetFrameBounds( const renderEntity_t *ent, idBounds &bounds ) const;
////	void						DrawJoints( const renderEntity_t *ent, const struct viewDef_s *view ) const;
////	void						ParseJoint( idLexer &parser, idMD5Joint *joint, idJointQuat *defaultPose );


	/////***********************************************************************

	////	idRenderModelMD5

	////***********************************************************************/

	/////*
	////====================
	////idRenderModelMD5::ParseJoint
	////====================
	////*/
	////void idRenderModelMD5::ParseJoint( idLexer &parser, idMD5Joint *joint, idJointQuat *defaultPose ) {
	////	idToken	token;
	////	int		num;

	////	//
	////	// parse name
	////	//
	////	parser.ReadToken( &token );
	////	joint.name = token;

	////	//
	////	// parse parent
	////	//
	////	num = parser.ParseInt();
	////	if ( num < 0 ) {
	////		joint.parent = NULL;
	////	} else {
	////		if ( num >= this.joints.Num() - 1 ) {
	////			parser.Error( "Invalid parent for joint '%s'", joint.name.c_str() );
	////		}
	////		joint.parent = &this.joints[ num ];
	////	}

	////	//
	////	// parse default pose
	////	//
	////	parser.Parse1DMatrix( 3, defaultPose.t.ToFloatPtr() );
	////	parser.Parse1DMatrix( 3, defaultPose.q.ToFloatPtr() );
	////	defaultPose.q.w = defaultPose.q.CalcW();
	////}

	/*
	====================
	idRenderModelMD5::InitFromFile
	====================
	*/
	InitFromFile ( fileName: string ): void {
		this.name.opEquals( fileName );
		this.LoadModel ( );
	}

	/*
	====================
	idRenderModelMD5::LoadModel

	used for initial loads, reloadModel, and reloading the data of purged models
	Upon exit, the model will absolutely be valid, but possibly as a default model
	====================
	*/
	LoadModel(): void {
			int			version;
			int			i;
			int			num;
			int			parentNum;
			idToken		token;
			idLexer		parser( lexerFlags_t.LEXFL_ALLOWPATHNAMES | lexerFlags_t.LEXFL_NOSTRINGESCAPECHARS );
			idJointQuat	*pose;
			idMD5Joint	*joint;
			idJointMat *poseMat3;

			if ( !purged ) {
				PurgeModel();
			}
			purged = false;

			if ( !parser.LoadFile( this.name ) ) {
				MakeDefaultModel();
				return;
			}

			parser.ExpectTokenString( MD5_VERSION_STRING );
			version = parser.ParseInt();

			if ( version != MD5_VERSION ) {
				parser.Error( "Invalid version %d.  Should be version %d\n", version, MD5_VERSION );
			}

			//
			// skip commandline
			//
			parser.ExpectTokenString( "commandline" );
			parser.ReadToken( &token );

			// parse num joints
			parser.ExpectTokenString( "numJoints" );
			num  = parser.ParseInt();
			this.joints.SetGranularity( 1 );
			this.joints.SetNum( num );
			defaultPose.SetGranularity( 1 );
			defaultPose.SetNum( num );
			poseMat3 = ( idJointMat * )_alloca16( num * sizeof( *poseMat3 ) );

			// parse num meshes
			parser.ExpectTokenString( "numMeshes" );
			num = parser.ParseInt();
			if ( num < 0 ) {
				parser.Error( "Invalid size: %d", num );
			}
			meshes.SetGranularity( 1 );
			meshes.SetNum( num );

			//
			// parse joints
			//
			parser.ExpectTokenString( "joints" );
			parser.ExpectTokenString( "{" );
			pose = defaultPose.Ptr();
			joint = this.joints.Ptr();
			for( i = 0; i < this.joints.Num(); i++, joint++, pose++ ) {
				ParseJoint( parser, joint, pose );
				poseMat3[ i ].SetRotation( pose.q.ToMat3() );
				poseMat3[ i ].SetTranslation( pose.t );
				if ( joint.parent ) {
					parentNum = joint.parent - this.joints.Ptr();
					pose.q = ( poseMat3[ i ].ToMat3() * poseMat3[ parentNum ].ToMat3().Transpose() ).ToQuat();
					pose.t = ( poseMat3[ i ].ToVec3() - poseMat3[ parentNum ].ToVec3() ) * poseMat3[ parentNum ].ToMat3().Transpose();
				}
			}
			parser.ExpectTokenString( "}" );

			for( i = 0; i < meshes.Num(); i++ ) {
				parser.ExpectTokenString( "mesh" );
				meshes[ i ].ParseMesh( parser, defaultPose.Num(), poseMat3 );
			}

			//
			// calculate the bounds of the model
			//
			CalculateBounds( poseMat3 );

			// set the timestamp for reloadmodels
			fileSystem.ReadFile( this.name, NULL, &timeStamp );
	}

	/////*
	////==============
	////idRenderModelMD5::Print
	////==============
	////*/
	////void idRenderModelMD5::Print() const {
	////	const idMD5Mesh	*mesh;
	////	int			i;

	////	common.Printf( "%s\n", this.name.c_str() );
	////	common.Printf( "Dynamic model.\n" );
	////	common.Printf( "Generated smooth normals.\n" );
	////	common.Printf( "    verts  tris weights material\n" );
	////	int	totalVerts = 0;
	////	int	totalTris = 0;
	////	int	totalWeights = 0;
	////	for( mesh = meshes.Ptr(), i = 0; i < meshes.Num(); i++, mesh++ ) {
	////		totalVerts += mesh.NumVerts();
	////		totalTris += mesh.NumTris();
	////		totalWeights += mesh.NumWeights();
	////		common.Printf( "%2i: %5i %5i %7i %s\n", i, mesh.NumVerts(), mesh.NumTris(), mesh.NumWeights(), mesh.shader.GetName() );
	////	}	
	////	common.Printf( "-----\n" );
	////	common.Printf( "%4i verts.\n", totalVerts );
	////	common.Printf( "%4i tris.\n", totalTris );
	////	common.Printf( "%4i weights.\n", totalWeights );
	////	common.Printf( "%4i joints.\n", this.joints.Num() );
	////}

	/////*
	////==============
	////idRenderModelMD5::List
	////==============
	////*/
	////void idRenderModelMD5::List() const {
	////	int			i;
	////	const idMD5Mesh	*mesh;
	////	int			totalTris = 0;
	////	int			totalVerts = 0;

	////	for( mesh = meshes.Ptr(), i = 0; i < meshes.Num(); i++, mesh++ ) {
	////		totalTris += mesh.numTris;
	////		totalVerts += mesh.NumVerts();
	////	}
	////	common.Printf( " %4ik %3i %4i %4i %s(MD5)", Memory()/1024, meshes.Num(), totalVerts, totalTris, Name() );

	////	if ( defaulted ) {
	////		common.Printf( " (DEFAULTED)" );
	////	}

	////	common.Printf( "\n" );
	////}

	/////*
	////====================
	////idRenderModelMD5::CalculateBounds
	////====================
	////*/
	////void idRenderModelMD5::CalculateBounds( const idJointMat *entJoints ) {
	////	int			i;
	////	idMD5Mesh	*mesh;

	////	bounds.Clear();
	////	for( mesh = meshes.Ptr(), i = 0; i < meshes.Num(); i++, mesh++ ) {
	////		bounds.AddBounds( mesh.CalcBounds( entJoints ) );
	////	}
	////}

	/////*
	////====================
	////idRenderModelMD5::Bounds

	////This calculates a rough bounds by using the joint radii without
	////transforming all the points
	////====================
	////*/
	////idBounds idRenderModelMD5::Bounds( const renderEntity_t *ent ) const {
	////#if 0
	////	// we can't calculate a rational bounds without an entity,
	////	// because joints could be positioned to deform it into an
	////	// arbitrarily large shape
	////	if ( !ent ) {
	////		common.Error( "idRenderModelMD5::Bounds: called without entity" );
	////	}
	////#endif

	////	if ( !ent ) {
	////		// this is the bounds for the reference pose
	////		return bounds;
	////	}

	////	return ent.bounds;
	////}

	/////*
	////====================
	////idRenderModelMD5::DrawJoints
	////====================
	////*/
	////void idRenderModelMD5::DrawJoints( const renderEntity_t *ent, const struct viewDef_s *view ) const {
	////	int					i;
	////	int					num;
	////	idVec3				pos;
	////	const idJointMat	*joint;
	////	const idMD5Joint	*md5Joint;
	////	int					parentNum;

	////	num = ent.numJoints;
	////	joint = ent.joints;
	////	md5Joint = this.joints.Ptr();	
	////	for( i = 0; i < num; i++, joint++, md5Joint++ ) {
	////		pos = ent.origin + joint.ToVec3() * ent.axis;
	////		if ( md5Joint.parent ) {
	////			parentNum = md5Joint.parent - this.joints.Ptr();
	////			session.rw.DebugLine( colorWhite, ent.origin + ent.joints[ parentNum ].ToVec3() * ent.axis, pos );
	////		}

	////		session.rw.DebugLine( colorRed,	pos, pos + joint.ToMat3()[ 0 ] * 2.0f * ent.axis );
	////		session.rw.DebugLine( colorGreen,	pos, pos + joint.ToMat3()[ 1 ] * 2.0f * ent.axis );
	////		session.rw.DebugLine( colorBlue,	pos, pos + joint.ToMat3()[ 2 ] * 2.0f * ent.axis );
	////	}

	////	idBounds bounds;

	////	bounds.FromTransformedBounds( ent.bounds, vec3_zero, ent.axis );
	////	session.rw.DebugBounds( colorMagenta, bounds, ent.origin );

	////	if ( ( r_jointNameScale.GetFloat() != 0.0 ) && ( bounds.Expand( 128.0f ).ContainsPoint( view.renderView.vieworg - ent.origin ) ) ) {
	////		idVec3	offset( 0, 0, r_jointNameOffset.GetFloat() );
	////		float	scale;

	////		scale = r_jointNameScale.GetFloat();
	////		joint = ent.joints;
	////		num = ent.numJoints;
	////		for( i = 0; i < num; i++, joint++ ) {
	////			pos = ent.origin + joint.ToVec3() * ent.axis;
	////			session.rw.DrawText( this.joints[ i ].name, pos + offset, scale, colorWhite, view.renderView.viewaxis, 1 );
	////		}
	////	}
	////}

	/////*
	////====================
	////idRenderModelMD5::InstantiateDynamicModel
	////====================
	////*/
	////idRenderModel *idRenderModelMD5::InstantiateDynamicModel( const struct renderEntity_s *ent, const struct viewDef_s *view, idRenderModel *cachedModel ) {
	////	int					i, surfaceNum;
	////	idMD5Mesh			*mesh;
	////	idRenderModelStatic	*staticModel;

	////	if ( cachedModel && !r_useCachedDynamicModels.GetBool() ) {
	////		delete cachedModel;
	////		cachedModel = NULL;
	////	}

	////	if ( purged ) {
	////		common.DWarning( "model %s instantiated while purged", Name() );
	////		LoadModel();
	////	}

	////	if ( !ent.joints ) {
	////		common.Printf( "idRenderModelMD5::InstantiateDynamicModel: NULL joints on renderEntity for '%s'\n", Name() );
	////		delete cachedModel;
	////		return NULL;
	////	} else if ( ent.numJoints != this.joints.Num() ) {
	////		common.Printf( "idRenderModelMD5::InstantiateDynamicModel: renderEntity has different number of joints than model for '%s'\n", Name() );
	////		delete cachedModel;
	////		return NULL;
	////	}

	////	tr.pc.c_generateMd5++;

	////	if ( cachedModel ) {
	////		assert( dynamic_cast<idRenderModelStatic *>(cachedModel) != NULL );
	////		assert( idStr.Icmp( cachedModel.Name(), MD5_SnapshotName ) == 0 );
	////		staticModel = static_cast<idRenderModelStatic *>(cachedModel);
	////	} else {
	////		staticModel = new idRenderModelStatic;
	////		staticModel.InitEmpty( MD5_SnapshotName );
	////	}

	////	staticModel.bounds.Clear();

	////	if ( r_showSkel.GetInteger() ) {
	////		if ( ( view != NULL ) && ( !r_skipSuppress.GetBool() || !ent.suppressSurfaceInViewID || ( ent.suppressSurfaceInViewID != view.renderView.viewID ) ) ) {
	////			// only draw the skeleton
	////			DrawJoints( ent, view );
	////		}

	////		if ( r_showSkel.GetInteger() > 1 ) {
	////			// turn off the model when showing the skeleton
	////			staticModel.InitEmpty( MD5_SnapshotName );
	////			return staticModel;
	////		}
	////	}

	////	// create all the surfaces
	////	for( mesh = meshes.Ptr(), i = 0; i < meshes.Num(); i++, mesh++ ) {
	////		// avoid deforming the surface if it will be a nodraw due to a skin remapping
	////		// FIXME: may have to still deform clipping hulls
	////		const idMaterial *shader = mesh.shader;

	////		shader = R_RemapShaderBySkin( shader, ent.customSkin, ent.customShader );

	////		if ( !shader || ( !shader.IsDrawn() && !shader.SurfaceCastsShadow() ) ) {
	////			staticModel.DeleteSurfaceWithId( i );
	////			mesh.surfaceNum = -1;
	////			continue;
	////		}

	////		modelSurface_t *surf;

	////		if ( staticModel.FindSurfaceWithId( i, surfaceNum ) ) {
	////			mesh.surfaceNum = surfaceNum;
	////			surf = &staticModel.surfaces[surfaceNum];
	////		} else {

	////			// Remove Overlays before adding new surfaces
	////			idRenderModelOverlay::RemoveOverlaySurfacesFromModel( staticModel );

	////			mesh.surfaceNum = staticModel.NumSurfaces();
	////			surf = &staticModel.surfaces.Alloc();
	////			surf.geometry = NULL;
	////			surf.shader = NULL;
	////			surf.id = i;
	////		}

	////		mesh.UpdateSurface( ent, ent.joints, surf );

	////		staticModel.bounds.AddPoint( surf.geometry.bounds[0] );
	////		staticModel.bounds.AddPoint( surf.geometry.bounds[1] );
	////	}

	////	return staticModel;
	////}

	/////*
	////====================
	////idRenderModelMD5::IsDynamicModel
	////====================
	////*/
	////dynamicModel_t idRenderModelMD5::IsDynamicModel() const {
	////	return DM_CACHED;
	////}

	/*
	====================
	idRenderModelMD5::NumJoints
	====================
	*/
	NumJoints(): number {
		return this.joints.Num();
	}

/////*
////====================
////idRenderModelMD5::GetJoints
////====================
////*/
////const idMD5Joint *idRenderModelMD5::GetJoints( ) const {
////	return this.joints.Ptr();
////}

/*
====================
idRenderModelMD5::GetDefaultPose
====================
*/
	GetDefaultPose ( ): idJointQuat[] {
		return <idJointQuat[]><any> this.defaultPose.Ptr ( );
	}

/*
====================
idRenderModelMD5::GetJointHandle
====================
*/
	GetJointHandle ( name: string ): jointHandle_t {
		var joints: idList<idMD5Joint>, joint: idMD5Joint;
		var /*int	*/i: number;

		joints = this.joints.Ptr ( );
		for ( i = 0; i < this.joints.Num ( ); i++, joint = joints[i] ) {
			if ( idStr.Icmp( joint.name.c_str ( ), name ) == 0 ) {
				return <jointHandle_t >i;
			}
		}

		return jointHandle_t.INVALID_JOINT;
	}

/////*
////=====================
////idRenderModelMD5::GetJointName
////=====================
////*/
////const char *idRenderModelMD5::GetJointName( jointHandle_t handle ) const {
////	if ( ( handle < 0 ) || ( handle >= this.joints.Num() ) ) {
////		return "<invalid joint>";
////	}

////	return this.joints[ handle ].name;
////}

/////*
////====================
////idRenderModelMD5::NearestJoint
////====================
////*/
////int idRenderModelMD5::NearestJoint( int surfaceNum, int a, int b, int c ) const {
////	var/*int*/i:number;
////	const idMD5Mesh *mesh;

////	if ( surfaceNum > meshes.Num() ) {
////		common.Error( "idRenderModelMD5::NearestJoint: surfaceNum > meshes.Num()" );
////	}

////	for ( mesh = meshes.Ptr(), i = 0; i < meshes.Num(); i++, mesh++ ) {
////		if ( mesh.surfaceNum == surfaceNum ) {
////			return mesh.NearestJoint( a, b, c );
////		}
////	}
////	return 0;
////}

/////*
////====================
////idRenderModelMD5::TouchData

////models that are already loaded at level start time
////will still touch their materials to make sure they
////are kept loaded
////====================
////*/
////void idRenderModelMD5::TouchData() {
////	idMD5Mesh	*mesh;
////	int			i;

////	for( mesh = meshes.Ptr(), i = 0; i < meshes.Num(); i++, mesh++ ) {
////		declManager.FindMaterial( mesh.shader.GetName() );
////	}
////}

/*
===================
idRenderModelMD5::PurgeModel

frees all the data, but leaves the class around for dangling references,
which can regenerate the data with LoadModel()
===================
*/
void idRenderModelMD5::PurgeModel() {
	purged = true;
	this.joints.Clear();
	defaultPose.Clear();
	meshes.Clear();
}

/////*
////===================
////idRenderModelMD5::Memory
////===================
////*/
////int	idRenderModelMD5::Memory() const {
////	int		total, i;

////	total = sizeof( *this );
////	total += this.joints.MemoryUsed() + defaultPose.MemoryUsed() + meshes.MemoryUsed();

////	// count up strings
////	for ( i = 0; i < this.joints.Num(); i++ ) {
////		total += this.joints[i].name.DynamicMemoryUsed();
////	}

////	// count up meshes
////	for ( i = 0 ; i < meshes.Num() ; i++ ) {
////		const idMD5Mesh *mesh = &meshes[i];

////		total += mesh.texCoords.MemoryUsed() + mesh.numWeights * ( sizeof( mesh.scaledWeights[0] ) + sizeof( mesh.weightIndex[0] ) * 2 );

////		// sum up deform info
////		total += sizeof( mesh.deformInfo );
////		total += R_DeformInfoMemoryUsed( mesh.deformInfo );
////	}
////	return total;
////}

}

/////*
////===============================================================================

////	MD3 animated model

////===============================================================================
////*/

////struct md3Header_s;
////struct md3Surface_s;

class idRenderModelMD3 extends idRenderModelStatic {
	constructor() {
		super();
		todoThrow()
	}
////public:
////	virtual void				InitFromFile( fileName:string );
////	virtual dynamicModel_t		IsDynamicModel() const;
////	virtual idRenderModel *		InstantiateDynamicModel( const struct renderEntity_s *ent, const struct viewDef_s *view, idRenderModel *cachedModel );
////	virtual idBounds			Bounds( const struct renderEntity_s *ent ) const;

////private:
////	int							index;			// model = tr.models[model.index]
////	int							dataSize;		// just for listing purposes
////	struct md3Header_s *		md3;			// only if type == MOD_MESH
////	int							numLods;

////	void						LerpMeshVertexes( srfTriangles_t *tri, const struct md3Surface_s *surf, const float backlerp, const int frame, const int oldframe ) const;

	
/*
=================
idRenderModelMD3::InitFromFile
=================
*/
	InitFromFile ( fileName: string ): void {
		todoThrow ( );
////	int					i, j;
////	md3Header_t			*pinmodel;
////    md3Frame_t			*frame;
////	md3Surface_t		*surf;
////	md3Shader_t			*shader;
////	md3Triangle_t		*tri;
////	md3St_t				*st;
////	md3XyzNormal_t		*xyz;
////	md3Tag_t			*tag;
////	void				*buffer;
////	int					version;
////	int					size;


////	name = fileName;

////	size = fileSystem.ReadFile( fileName, &buffer, NULL );
////	if (!size || size<0 ) {
////		return;
////	}

////	pinmodel = (md3Header_t *)buffer;

////	version = LittleLong (pinmodel.version);
////	if (version != MD3_VERSION) {
////		fileSystem.FreeFile( buffer );
////		common.Warning( "InitFromFile: %s has wrong version (%i should be %i)",
////				 fileName, version, MD3_VERSION);
////		return;
////	}

////	size = LittleLong(pinmodel.ofsEnd);
////	dataSize += size;
////	md3 = (md3Header_t *)Mem_Alloc( size );

////	memcpy (md3, buffer, LittleLong(pinmodel.ofsEnd) );

////    LL(md3.ident);
////    LL(md3.version);
////    LL(md3.numFrames);
////    LL(md3.numTags);
////    LL(md3.numSurfaces);
////    LL(md3.ofsFrames);
////    LL(md3.ofsTags);
////    LL(md3.ofsSurfaces);
////    LL(md3.ofsEnd);

////	if ( md3.numFrames < 1 ) {
////		common.Warning( "InitFromFile: %s has no frames", fileName );
////		fileSystem.FreeFile( buffer );
////		return;
////	}

////	// swap all the frames
////    frame = (md3Frame_t *) ( (byte *)md3 + md3.ofsFrames );
////    for ( i = 0 ; i < md3.numFrames ; i++, frame++) {
////    	frame.radius = LittleFloat( frame.radius );
////        for ( j = 0 ; j < 3 ; j++ ) {
////            frame.bounds[0][j] = LittleFloat( frame.bounds[0][j] );
////            frame.bounds[1][j] = LittleFloat( frame.bounds[1][j] );
////	    	frame.localOrigin[j] = LittleFloat( frame.localOrigin[j] );
////        }
////	}

////	// swap all the tags
////    tag = (md3Tag_t *) ( (byte *)md3 + md3.ofsTags );
////    for ( i = 0 ; i < md3.numTags * md3.numFrames ; i++, tag++) {
////        for ( j = 0 ; j < 3 ; j++ ) {
////			tag.origin[j] = LittleFloat( tag.origin[j] );
////			tag.axis[0][j] = LittleFloat( tag.axis[0][j] );
////			tag.axis[1][j] = LittleFloat( tag.axis[1][j] );
////			tag.axis[2][j] = LittleFloat( tag.axis[2][j] );
////        }
////	}

////	// swap all the surfaces
////	surf = (md3Surface_t *) ( (byte *)md3 + md3.ofsSurfaces );
////	for ( i = 0 ; i < md3.numSurfaces ; i++) {

////        LL(surf.ident);
////        LL(surf.flags);
////        LL(surf.numFrames);
////        LL(surf.numShaders);
////        LL(surf.numTriangles);
////        LL(surf.ofsTriangles);
////        LL(surf.numVerts);
////        LL(surf.ofsShaders);
////        LL(surf.ofsSt);
////        LL(surf.ofsXyzNormals);
////        LL(surf.ofsEnd);

////		if ( surf.numVerts > SHADER_MAX_VERTEXES ) {
////			common.Error( "InitFromFile: %s has more than %i verts on a surface (%i)",
////				fileName, SHADER_MAX_VERTEXES, surf.numVerts );
////		}
////		if ( surf.numTriangles*3 > SHADER_MAX_INDEXES ) {
////			common.Error( "InitFromFile: %s has more than %i triangles on a surface (%i)",
////				fileName, SHADER_MAX_INDEXES / 3, surf.numTriangles );
////		}

////		// change to surface identifier
////		surf.ident = 0;	//SF_MD3;

////		// lowercase the surface name so skin compares are faster
////		int slen = (int)strlen( surf.name );
////		for( j = 0; j < slen; j++ ) {
////			surf.name[j] = tolower( surf.name[j] );
////		}

////		// strip off a trailing _1 or _2
////		// this is a crutch for q3data being a mess
////		j = strlen( surf.name );
////		if ( j > 2 && surf.name[j-2] == '_' ) {
////			surf.name[j-2] = 0;
////		}

////        // register the shaders
////        shader = (md3Shader_t *) ( (byte *)surf + surf.ofsShaders );
////        for ( j = 0 ; j < surf.numShaders ; j++, shader++ ) {
////            const idMaterial *sh;

////            sh = declManager.FindMaterial( shader.name );
////			shader.shader = sh;
////        }

////		// swap all the triangles
////		tri = (md3Triangle_t *) ( (byte *)surf + surf.ofsTriangles );
////		for ( j = 0 ; j < surf.numTriangles ; j++, tri++ ) {
////			LL(tri.indexes[0]);
////			LL(tri.indexes[1]);
////			LL(tri.indexes[2]);
////		}

////		// swap all the ST
////        st = (md3St_t *) ( (byte *)surf + surf.ofsSt );
////        for ( j = 0 ; j < surf.numVerts ; j++, st++ ) {
////            st.st[0] = LittleFloat( st.st[0] );
////            st.st[1] = LittleFloat( st.st[1] );
////        }

////		// swap all the XyzNormals
////        xyz = (md3XyzNormal_t *) ( (byte *)surf + surf.ofsXyzNormals );
////        for ( j = 0 ; j < surf.numVerts * surf.numFrames ; j++, xyz++ ) 
////		{
////            xyz.xyz[0] = LittleShort( xyz.xyz[0] );
////            xyz.xyz[1] = LittleShort( xyz.xyz[1] );
////            xyz.xyz[2] = LittleShort( xyz.xyz[2] );

////            xyz.normal = LittleShort( xyz.normal );
////        }


////		// find the next surface
////		surf = (md3Surface_t *)( (byte *)surf + surf.ofsEnd );
////	}

////	fileSystem.FreeFile( buffer );
	}

/////*
////=================
////idRenderModelMD3::IsDynamicModel
////=================
////*/
////dynamicModel_t idRenderModelMD3::IsDynamicModel() const {
////	return DM_CACHED;
////}

/////*
////=================
////idRenderModelMD3::LerpMeshVertexes
////=================
////*/
////void idRenderModelMD3::LerpMeshVertexes ( srfTriangles_t *tri, const struct md3Surface_s *surf, const float backlerp, const int frame, const int oldframe ) const {
////	short	*oldXyz, *newXyz;
////	float	oldXyzScale, newXyzScale;
////	int		vertNum;
////	int		numVerts;

////	newXyz = (short *)((byte *)surf + surf.ofsXyzNormals) + (frame * surf.numVerts * 4);

////	newXyzScale = MD3_XYZ_SCALE * (1.0 - backlerp);

////	numVerts = surf.numVerts;

////	if ( backlerp == 0 ) {
////		//
////		// just copy the vertexes
////		//
////		for (vertNum=0 ; vertNum < numVerts ; vertNum++, newXyz += 4 ) {

////			idDrawVert *outvert = &tri.verts[tri.numVerts];

////			outvert.xyz.x = newXyz[0] * newXyzScale;
////			outvert.xyz.y = newXyz[1] * newXyzScale;
////			outvert.xyz.z = newXyz[2] * newXyzScale;

////			tri.numVerts++;
////		}
////	} else {
////		//
////		// interpolate and copy the vertexes
////		//
////		oldXyz = (short *)((byte *)surf + surf.ofsXyzNormals) + (oldframe * surf.numVerts * 4);

////		oldXyzScale = MD3_XYZ_SCALE * backlerp;

////		for (vertNum=0 ; vertNum < numVerts ; vertNum++, oldXyz += 4, newXyz += 4 ) {

////			idDrawVert *outvert = &tri.verts[tri.numVerts];

////			// interpolate the xyz
////			outvert.xyz.x = oldXyz[0] * oldXyzScale + newXyz[0] * newXyzScale;
////			outvert.xyz.y = oldXyz[1] * oldXyzScale + newXyz[1] * newXyzScale;
////			outvert.xyz.z = oldXyz[2] * oldXyzScale + newXyz[2] * newXyzScale;

////			tri.numVerts++;
////		}
////   	}
////}

/////*
////=============
////idRenderModelMD3::InstantiateDynamicModel
////=============
////*/
////idRenderModel *idRenderModelMD3::InstantiateDynamicModel( const struct renderEntity_s *ent, const struct viewDef_s *view, idRenderModel *cachedModel ) {
////	int				i, j;
////	float			backlerp;
////	int *			triangles;
////	float *			texCoords;
////	int				indexes;
////	int				numVerts;
////	md3Surface_t *	surface;
////	int				frame, oldframe;
////	idRenderModelStatic	*staticModel;

////	if ( cachedModel ) {
////		delete cachedModel;
////		cachedModel = NULL;
////	}

////	staticModel = new idRenderModelStatic;
////	staticModel.bounds.Clear();

////	surface = (md3Surface_t *) ((byte *)md3 + md3.ofsSurfaces);

////	// TODO: these need set by an entity
////	frame = ent.shaderParms[SHADERPARM_MD3_FRAME];			// probably want to keep frames < 1000 or so
////	oldframe = ent.shaderParms[SHADERPARM_MD3_LASTFRAME];
////	backlerp = ent.shaderParms[SHADERPARM_MD3_BACKLERP];

////	for( i = 0; i < md3.numSurfaces; i++ ) {

////		srfTriangles_t *tri = R_AllocStaticTriSurf();
////		R_AllocStaticTriSurfVerts( tri, surface.numVerts );
////		R_AllocStaticTriSurfIndexes( tri, surface.numTriangles * 3 );
////		tri.bounds.Clear();

////		modelSurface_t	surf;

////		surf.geometry = tri;

////		md3Shader_t* shaders = (md3Shader_t *) ((byte *)surface + surface.ofsShaders);
////		surf.shader = shaders.shader;

////		LerpMeshVertexes( tri, surface, backlerp, frame, oldframe );

////		triangles = (int *) ((byte *)surface + surface.ofsTriangles);
////		indexes = surface.numTriangles * 3;
////		for (j = 0 ; j < indexes ; j++) {
////			tri.indexes[j] = triangles[j];
////		}
////		tri.numIndexes += indexes;

////		texCoords = (float *) ((byte *)surface + surface.ofsSt);

////		numVerts = surface.numVerts;
////		for ( j = 0; j < numVerts; j++ ) {
////			idDrawVert *stri = &tri.verts[j];
////			stri.st[0] = texCoords[j*2+0];
////			stri.st[1] = texCoords[j*2+1];
////		}

////		R_BoundTriSurf( tri );

////		staticModel.AddSurface( surf );
////		staticModel.bounds.AddPoint( surf.geometry.bounds[0] );
////		staticModel.bounds.AddPoint( surf.geometry.bounds[1] );

////		// find the next surface
////		surface = (md3Surface_t *)( (byte *)surface + surface.ofsEnd );
////	}

////	return staticModel;
////}

/////*
////=====================
////idRenderModelMD3::Bounds
////=====================
////*/

////idBounds idRenderModelMD3::Bounds(const struct renderEntity_s *ent) const {
////	idBounds		ret;

////	ret.Clear();

////	if (!ent || !md3) {
////		// just give it the editor bounds
////		ret.AddPoint(idVec3(-10,-10,-10));
////		ret.AddPoint(idVec3( 10, 10, 10));
////		return ret;
////	}

////	md3Frame_t	*frame = (md3Frame_t *)( (byte *)md3 + md3.ofsFrames );

////	ret.AddPoint( frame.bounds[0] );
////	ret.AddPoint( frame.bounds[1] );

////	return ret;
////}


}

/////*
////===============================================================================

////	Liquid model

////===============================================================================
////*/

class idRenderModelLiquid extends idRenderModelStatic {
	constructor() {
		super();
		todoThrow()
	}
////public:
////								idRenderModelLiquid();

////	virtual void				InitFromFile( fileName:string );
////	virtual dynamicModel_t		IsDynamicModel() const;
////	virtual idRenderModel *		InstantiateDynamicModel( const struct renderEntity_s *ent, const struct viewDef_s *view, idRenderModel *cachedModel );
////	virtual idBounds			Bounds( const struct renderEntity_s *ent ) const;

////	virtual void				Reset();
////	void						IntersectBounds( const idBounds &bounds, float displacement );

////private:
////	modelSurface_t				GenerateSurface( float lerp );
////	void						WaterDrop( int x, int y, float *page );
////	void						Update( void );
						
////	int							verts_x;
////	int							verts_y;
////	float						scale_x;
////	float						scale_y;
////	int							time;
////	int							liquid_type;
////	int							update_tics;
////	int							seed;

////	idRandom					random;
						
////	const idMaterial *			shader;
////	struct deformInfo_s	*		deformInfo;		// used to create srfTriangles_t from base frames
////											// and new vertexes
						
////	float						density;
////	float						drop_height;
////	int							drop_radius;
////	float						drop_delay;

////	idList<float>				pages;
////	float *						page1;
////	float *						page2;

////	idList<idDrawVert>			verts;

////	int							nextDropTime;


	/////*
	////====================
	////idRenderModelLiquid::idRenderModelLiquid
	////====================
	////*/
	////idRenderModelLiquid::idRenderModelLiquid() {
	////	verts_x		= 32;
	////	verts_y		= 32;
	////	scale_x		= 256.0f;
	////	scale_y		= 256.0f;
	////	liquid_type = 0;
	////	density		= 0.97f;
	////	drop_height = 4;
	////	drop_radius = 4;
	////	drop_delay	= 1000;
	////    shader		= declManager.FindMaterial( NULL );
	////	update_tics	= 33;  // ~30 hz
	////	time		= 0;
	////	seed		= 0;

	////	random.SetSeed( 0 );
	////}

	/////*
	////====================
	////idRenderModelLiquid::GenerateSurface
	////====================
	////*/
	////modelSurface_t idRenderModelLiquid::GenerateSurface( float lerp ) {
	////	srfTriangles_t	*tri;
	////	int				i, base;
	////	idDrawVert		*vert;
	////	modelSurface_t	surf;
	////	float			inv_lerp;

	////	inv_lerp = 1.0f - lerp;
	////	vert = verts.Ptr();
	////	for( i = 0; i < verts.Num(); i++, vert++ ) {
	////		vert.xyz.z = page1[ i ] * lerp + page2[ i ] * inv_lerp;
	////	}

	////	tr.pc.c_deformedSurfaces++;
	////	tr.pc.c_deformedVerts += deformInfo.numOutputVerts;
	////	tr.pc.c_deformedIndexes += deformInfo.numIndexes;

	////	tri = R_AllocStaticTriSurf();

	////	// note that some of the data is references, and should not be freed
	////	tri.deformedSurface = true;

	////	tri.numIndexes = deformInfo.numIndexes;
	////	tri.indexes = deformInfo.indexes;
	////	tri.silIndexes = deformInfo.silIndexes;
	////	tri.numMirroredVerts = deformInfo.numMirroredVerts;
	////	tri.mirroredVerts = deformInfo.mirroredVerts;
	////	tri.numDupVerts = deformInfo.numDupVerts;
	////	tri.dupVerts = deformInfo.dupVerts;
	////	tri.numSilEdges = deformInfo.numSilEdges;
	////	tri.silEdges = deformInfo.silEdges;
	////	tri.dominantTris = deformInfo.dominantTris;

	////	tri.numVerts = deformInfo.numOutputVerts;
	////	R_AllocStaticTriSurfVerts( tri, tri.numVerts );
	////	SIMDProcessor.Memcpy( tri.verts, verts.Ptr(), deformInfo.numSourceVerts * sizeof(tri.verts[0]) );

	////	// replicate the mirror seam vertexes
	////	base = deformInfo.numOutputVerts - deformInfo.numMirroredVerts;
	////	for ( i = 0 ; i < deformInfo.numMirroredVerts ; i++ ) {
	////		tri.verts[base + i] = tri.verts[deformInfo.mirroredVerts[i]];
	////	}

	////	R_BoundTriSurf( tri );

	////	// If a surface is going to be have a lighting interaction generated, it will also have to call
	////	// R_DeriveTangents() to get normals, tangents, and face planes.  If it only
	////	// needs shadows generated, it will only have to generate face planes.  If it only
	////	// has ambient drawing, or is culled, no additional work will be necessary
	////	if ( !r_useDeferredTangents.GetBool() ) {
	////		// set face planes, vertex normals, tangents
	////		R_DeriveTangents( tri );
	////	}

	////	surf.geometry	= tri;
	////	surf.shader		= shader;

	////	return surf;
	////}

	/////*
	////====================
	////idRenderModelLiquid::WaterDrop
	////====================
	////*/
	////void idRenderModelLiquid::WaterDrop( int x, int y, float *page ) {
	////	int		cx, cy;
	////	int		left,top,right,bottom;
	////	int		square;
	////	int		radsquare = drop_radius * drop_radius;
	////	float	invlength = 1.0f / ( float )radsquare;
	////	float	dist;

	////	if ( x < 0 ) {
	////		x = 1 + drop_radius + random.RandomInt( verts_x - 2 * drop_radius - 1 );
	////	}
	////	if ( y < 0 ) {
	////		y = 1 + drop_radius + random.RandomInt( verts_y - 2 * drop_radius - 1 );
	////	}

	////	left=-drop_radius; right = drop_radius;
	////	top=-drop_radius; bottom = drop_radius;

	////	// Perform edge clipping...
	////	if ( x - drop_radius < 1 ) {
	////		left -= (x-drop_radius-1);
	////	}
	////	if ( y - drop_radius < 1 ) {
	////		top -= (y-drop_radius-1);
	////	}
	////	if ( x + drop_radius > verts_x - 1 ) {
	////		right -= (x+drop_radius-verts_x+1);
	////	}
	////	if ( y + drop_radius > verts_y - 1 ) {
	////		bottom-= (y+drop_radius-verts_y+1);
	////	}

	////	for ( cy = top; cy < bottom; cy++ ) {
	////		for ( cx = left; cx < right; cx++ ) {
	////			square = cy*cy + cx*cx;
	////			if ( square < radsquare ) {
	////				dist = idMath::Sqrt( (float)square * invlength );
	////				page[verts_x*(cy+y) + cx+x] += idMath::Cos16( dist * idMath::PI * 0.5f ) * drop_height;
	////			}
	////		}
	////	}
	////}

	/////*
	////====================
	////idRenderModelLiquid::IntersectBounds
	////====================
	////*/
	////void idRenderModelLiquid::IntersectBounds( const idBounds &bounds, float displacement ) {
	////	int		cx, cy;
	////	int		left,top,right,bottom;
	////	float	up, down;
	////	float	*pos;

	////	left	= ( int )( bounds[ 0 ].x / scale_x );
	////	right	= ( int )( bounds[ 1 ].x / scale_x );
	////	top		= ( int )( bounds[ 0 ].y / scale_y );
	////	bottom	= ( int )( bounds[ 1 ].y / scale_y );
	////	down	= bounds[ 0 ].z;
	////	up		= bounds[ 1 ].z;

	////	if ( ( right < 1 ) || ( left >= verts_x ) || ( bottom < 1 ) || ( top >= verts_x ) ) {
	////		return;
	////	}

	////	// Perform edge clipping...
	////	if ( left < 1 ) {
	////		left = 1;
	////	}
	////	if ( right >= verts_x ) {
	////		right = verts_x - 1;
	////	}
	////	if ( top < 1 ) {
	////		top = 1;
	////	}
	////	if ( bottom >= verts_y ) {
	////		bottom = verts_y - 1;
	////	}

	////	for ( cy = top; cy < bottom; cy++ ) {
	////		for ( cx = left; cx < right; cx++ ) {
	////			pos = &page1[ verts_x * cy + cx ];
	////			if ( *pos > down ) {//&& ( *pos < up ) ) {
	////				*pos = down;
	////			}
	////		}
	////	}
	////}

	/////*
	////====================
	////idRenderModelLiquid::Update
	////====================
	////*/
	////void idRenderModelLiquid::Update( void ) {
	////	int		x, y;
	////	float	*p2;
	////	float	*p1;
	////	float	value;

	////	time += update_tics;

	////	idSwap( page1, page2 );

	////	if ( time > nextDropTime ) {
	////		WaterDrop( -1, -1, page2 );
	////		nextDropTime = time + drop_delay;
	////	} else if ( time < nextDropTime - drop_delay ) {
	////		nextDropTime = time + drop_delay;
	////	}

	////	p1 = page1;
	////	p2 = page2;

	////	switch( liquid_type ) {
	////	case 0 :
	////		for ( y = 1; y < verts_y - 1; y++ ) {
	////			p2 += verts_x;
	////			p1 += verts_x;
	////			for ( x = 1; x < verts_x - 1; x++ ) {
	////				value =
	////					( p2[ x + verts_x ] +
	////					p2[ x - verts_x ] +
	////					p2[ x + 1 ] +
	////					p2[ x - 1 ] +
	////					p2[ x - verts_x - 1 ] +
	////					p2[ x - verts_x + 1 ] +
	////					p2[ x + verts_x - 1 ] +
	////					p2[ x + verts_x + 1 ] +
	////					p2[ x ] ) * ( 2.0f / 9.0f ) -
	////					p1[ x ];

	////				p1[ x ] = value * density;
	////			}
	////		}
	////		break;

	////	case 1 :
	////		for ( y = 1; y < verts_y - 1; y++ ) {
	////			p2 += verts_x;
	////			p1 += verts_x;
	////			for ( x = 1; x < verts_x - 1; x++ ) {
	////				value =
	////					( p2[ x + verts_x ] +
	////					p2[ x - verts_x ] +
	////					p2[ x + 1 ] +
	////					p2[ x - 1 ] +
	////					p2[ x - verts_x - 1 ] +
	////					p2[ x - verts_x + 1 ] +
	////					p2[ x + verts_x - 1 ] +
	////					p2[ x + verts_x + 1 ] ) * 0.25f -
	////					p1[ x ];

	////				p1[ x ] = value * density;
	////			}
	////		}
	////		break;

	////	case 2 :
	////		for ( y = 1; y < verts_y - 1; y++ ) {
	////			p2 += verts_x;
	////			p1 += verts_x;
	////			for ( x = 1; x < verts_x - 1; x++ ) {
	////				value =
	////					( p2[ x + verts_x ] +
	////					p2[ x - verts_x ] +
	////					p2[ x + 1 ] +
	////					p2[ x - 1 ] +
	////					p2[ x - verts_x - 1 ] +
	////					p2[ x - verts_x + 1 ] +
	////					p2[ x + verts_x - 1 ] +
	////					p2[ x + verts_x + 1 ] + 
	////					p2[ x ] ) * ( 1.0f / 9.0f );

	////				p1[ x ] = value * density;
	////			}
	////		}
	////		break;
	////	}
	////}

	/////*
	////====================
	////idRenderModelLiquid::Reset
	////====================
	////*/
	////void idRenderModelLiquid::Reset() {
	////	int	i, x, y;

	////	if ( pages.Num() < 2 * verts_x * verts_y ) {
	////		return;
	////	}

	////	nextDropTime = 0;
	////	time = 0;
	////	random.SetSeed( seed );

	////	page1 = pages.Ptr();
	////	page2 = page1 + verts_x * verts_y;

	////	for ( i = 0, y = 0; y < verts_y; y++ ) {
	////		for ( x = 0; x < verts_x; x++, i++ ) {
	////			page1[ i ] = 0.0;
	////			page2[ i ] = 0.0;
	////			verts[ i ].xyz.z = 0.0;
	////		}
	////	}
	////}

	/*
	====================
	idRenderModelLiquid::InitFromFile
	====================
	*/
	InitFromFile(fileName: string): void {
		todoThrow();
		////	int				i, x, y;
		////	idToken			token;
		////	idParser		parser( lexerFlags_t.LEXFL_ALLOWPATHNAMES | lexerFlags_t.LEXFL_NOSTRINGESCAPECHARS );
		////	idList<int>		tris;
		////	float			size_x, size_y;
		////	float			rate;

		////	name = fileName;

		////	if ( !parser.LoadFile( fileName ) ) {
		////		MakeDefaultModel();
		////		return;
		////	}

		////	size_x = scale_x * verts_x;
		////	size_y = scale_y * verts_y;

		////	while( parser.ReadToken( &token ) ) {
		////		if ( !token.Icmp( "seed" ) ) {
		////			seed = parser.ParseInt();
		////		} else if ( !token.Icmp( "size_x" ) ) {
		////			size_x = parser.ParseFloat();
		////		} else if ( !token.Icmp( "size_y" ) ) {
		////			size_y = parser.ParseFloat();
		////		} else if ( !token.Icmp( "verts_x" ) ) {
		////			verts_x = parser.ParseFloat();
		////			if ( verts_x < 2 ) {
		////				parser.Warning( "Invalid # of verts.  Using default model." );
		////				MakeDefaultModel();
		////				return;
		////			}
		////		} else if ( !token.Icmp( "verts_y" ) ) {
		////			verts_y = parser.ParseFloat();
		////			if ( verts_y < 2 ) {
		////				parser.Warning( "Invalid # of verts.  Using default model." );
		////				MakeDefaultModel();
		////				return;
		////			}
		////		} else if ( !token.Icmp( "liquid_type" ) ) {
		////			liquid_type = parser.ParseInt() - 1;
		////			if ( ( liquid_type < 0 ) || ( liquid_type >= LIQUID_MAX_TYPES ) ) {
		////				parser.Warning( "Invalid liquid_type.  Using default model." );
		////				MakeDefaultModel();
		////				return;
		////			}
		////		} else if ( !token.Icmp( "density" ) ) {
		////			density = parser.ParseFloat();
		////		} else if ( !token.Icmp( "drop_height" ) ) {
		////			drop_height = parser.ParseFloat();
		////		} else if ( !token.Icmp( "drop_radius" ) ) {
		////			drop_radius = parser.ParseInt();
		////		} else if ( !token.Icmp( "drop_delay" ) ) {
		////			drop_delay = SEC2MS( parser.ParseFloat() );
		////		} else if ( !token.Icmp( "shader" ) ) {
		////			parser.ReadToken( &token );
		////			shader = declManager.FindMaterial( token );
		////		} else if ( !token.Icmp( "seed" ) ) {
		////			seed = parser.ParseInt();
		////		} else if ( !token.Icmp( "update_rate" ) ) {
		////			rate = parser.ParseFloat();
		////			if ( ( rate <= 0.0 ) || ( rate > 60.0f ) ) {
		////				parser.Warning( "Invalid update_rate.  Must be between 0 and 60.  Using default model." );
		////				MakeDefaultModel();
		////				return;
		////			}
		////			update_tics = 1000 / rate;
		////		} else {
		////			parser.Warning( "Unknown parameter '%s'.  Using default model.", token.c_str() );
		////			MakeDefaultModel();
		////			return;
		////		}
		////	}

		////	scale_x = size_x / ( verts_x - 1 );
		////	scale_y = size_y / ( verts_y - 1 );

		////	pages.SetNum( 2 * verts_x * verts_y );
		////	page1 = pages.Ptr();
		////	page2 = page1 + verts_x * verts_y;

		////	verts.SetNum( verts_x * verts_y );
		////	for ( i = 0, y = 0; y < verts_y; y++ ) {
		////		for ( x = 0; x < verts_x; x++, i++ ) {
		////			page1[ i ] = 0.0;
		////			page2[ i ] = 0.0;
		////			verts[ i ].Clear();
		////			verts[ i ].xyz.Set( x * scale_x, y * scale_y, 0.0 );
		////			verts[ i ].st.Set( (float) x / (float)( verts_x - 1 ), (float) -y / (float)( verts_y - 1 ) );
		////		}
		////	}

		////	tris.SetNum( ( verts_x - 1 ) * ( verts_y - 1 ) * 6 );
		////	for( i = 0, y = 0; y < verts_y - 1; y++ ) {
		////		for( x = 1; x < verts_x; x++, i += 6 ) {
		////			tris[ i + 0 ] = y * verts_x + x;
		////			tris[ i + 1 ] = y * verts_x + x - 1;
		////			tris[ i + 2 ] = ( y + 1 ) * verts_x + x - 1;

		////			tris[ i + 3 ] = ( y + 1 ) * verts_x + x - 1;
		////			tris[ i + 4 ] = ( y + 1 ) * verts_x + x;
		////			tris[ i + 5 ] = y * verts_x + x;
		////		}
		////	}

		////	// build the information that will be common to all animations of this mesh:
		////	// sil edge connectivity and normal / tangent generation information
		////	deformInfo = R_BuildDeformInfo( verts.Num(), verts.Ptr(), tris.Num(), tris.Ptr(), true );

		////	bounds.Clear();
		////	bounds.AddPoint( idVec3( 0.0, 0.0, drop_height * -10.0f ) );
		////	bounds.AddPoint( idVec3( ( verts_x - 1 ) * scale_x, ( verts_y - 1 ) * scale_y, drop_height * 10.0f ) );

		////	// set the timestamp for reloadmodels
		////	fileSystem.ReadFile( name, NULL, &timeStamp );

		////	Reset();
	}

/////*
////====================
////idRenderModelLiquid::InstantiateDynamicModel
////====================
////*/
////idRenderModel *idRenderModelLiquid::InstantiateDynamicModel( const struct renderEntity_s *ent, const struct viewDef_s *view, idRenderModel *cachedModel ) {
////	idRenderModelStatic	*staticModel;
////	int		frames;
////	int		t;
////	float	lerp;

////	if ( cachedModel ) {
////		delete cachedModel;
////		cachedModel = NULL;
////	}

////	if ( !deformInfo ) {
////		return NULL;
////	}

////	if ( !view ) {
////		t = 0;
////	} else {
////		t = view.renderView.time;
////	}

////	// update the liquid model
////	frames = ( t - time ) / update_tics;
////	if ( frames > LIQUID_MAX_SKIP_FRAMES ) {
////		// don't let time accumalate when skipping frames
////		time += update_tics * ( frames - LIQUID_MAX_SKIP_FRAMES );

////		frames = LIQUID_MAX_SKIP_FRAMES;
////	}
	
////	while( frames > 0 ) {
////		Update();
////		frames--;
////	}

////	// create the surface
////	lerp = ( float )( t - time ) / ( float )update_tics;
////	modelSurface_t surf = GenerateSurface( lerp );

////	staticModel = new idRenderModelStatic;
////	staticModel.AddSurface( surf );
////	staticModel.bounds = surf.geometry.bounds;

////	return staticModel;
////}

/////*
////====================
////idRenderModelLiquid::IsDynamicModel
////====================
////*/
////dynamicModel_t idRenderModelLiquid::IsDynamicModel() const {
////	return DM_CONTINUOUS;
////}

/////*
////====================
////idRenderModelLiquid::Bounds
////====================
////*/
////idBounds idRenderModelLiquid::Bounds(const struct renderEntity_s *ent) const {
////	// FIXME: need to do this better
////	return bounds;
////}


}

/////*
////===============================================================================

////	PRT model

////===============================================================================
////*/

class idRenderModelPrt extends idRenderModelStatic {

////public:
////								idRenderModelPrt();

////	virtual void				InitFromFile( fileName:string );
////	virtual void				TouchData();
////	virtual dynamicModel_t		IsDynamicModel() const;
////	virtual idRenderModel *		InstantiateDynamicModel( const struct renderEntity_s *ent, const struct viewDef_s *view, idRenderModel *cachedModel );
////	virtual idBounds			Bounds( const struct renderEntity_s *ent ) const;
////	virtual float				DepthHack() const;
////	virtual int					Memory() const;

////private:
	particleSystem:idDeclParticle;

	
/*
====================
idRenderModelPrt::idRenderModelPrt
====================
*/
	constructor ( ) {
		super ( );
		this.particleSystem = null;
	}


/*
====================
idRenderModelPrt::InitFromFile
====================
*/
	InitFromFile ( fileName: string ): void {
		this.name.opEquals( fileName );
		this.particleSystem = static_cast<idDeclParticle>( declManager.FindType( declType_t.DECL_PARTICLE, fileName ) );
	}

/////*
////=================
////idRenderModelPrt::TouchData
////=================
////*/
////void idRenderModelPrt::TouchData( void ) {
////	// Ensure our particle system is added to the list of referenced decls
////	particleSystem = static_cast<const idDeclParticle *>( declManager.FindType( DECL_PARTICLE, name ) );
////}

/////*
////====================
////idRenderModelPrt::InstantiateDynamicModel
////====================
////*/
////idRenderModel *idRenderModelPrt::InstantiateDynamicModel( const struct renderEntity_s *renderEntity, const struct viewDef_s *viewDef, idRenderModel *cachedModel ) {
////	idRenderModelStatic	*staticModel;

////	if ( cachedModel && !r_useCachedDynamicModels.GetBool() ) {
////		delete cachedModel;
////		cachedModel = NULL;
////	}

////	// this may be triggered by a model trace or other non-view related source, to which we should look like an empty model
////	if ( renderEntity == NULL || viewDef == NULL ) {
////		delete cachedModel;
////		return NULL;
////	}

////	if ( r_skipParticles.GetBool() ) {
////		delete cachedModel;
////		return NULL;
////	}

////	/*
////	// if the entire system has faded out
////	if ( renderEntity.shaderParms[SHADERPARM_PARTICLE_STOPTIME] && viewDef.renderView.time * 0.001f >= renderEntity.shaderParms[SHADERPARM_PARTICLE_STOPTIME] ) {
////		delete cachedModel;
////		return NULL;
////	}
////	*/

////	if ( cachedModel != NULL ) {

////		assert( dynamic_cast<idRenderModelStatic *>(cachedModel) != NULL );
////		assert( idStr::Icmp( cachedModel.Name(), parametricParticle_SnapshotName ) == 0 );

////		staticModel = static_cast<idRenderModelStatic *>(cachedModel);

////	} else {

////		staticModel = new idRenderModelStatic;
////		staticModel.InitEmpty( parametricParticle_SnapshotName );
////	}

////	particleGen_t g;

////	g.renderEnt = renderEntity;
////	g.renderView = &viewDef.renderView;
////	g.origin.Zero();
////	g.axis.Identity();

////	for ( int stageNum = 0; stageNum < particleSystem.stages.Num(); stageNum++ ) {
////		idParticleStage *stage = particleSystem.stages[stageNum];

////		if ( !stage.material ) {
////			continue;
////		}
////		if ( !stage.cycleMsec ) {
////			continue;
////		}
////		if ( stage.hidden ) {		// just for gui particle editor use
////			staticModel.DeleteSurfaceWithId( stageNum );
////			continue;
////		}

////		idRandom steppingRandom, steppingRandom2;

////		int stageAge = g.renderView.time + renderEntity.shaderParms[SHADERPARM_TIMEOFFSET] * 1000 - stage.timeOffset * 1000;
////		int	stageCycle = stageAge / stage.cycleMsec;
////		int	inCycleTime = stageAge - stageCycle * stage.cycleMsec;

////		// some particles will be in this cycle, some will be in the previous cycle
////		steppingRandom.SetSeed( (( stageCycle << 10 ) & idRandom::MAX_RAND) ^ (int)( renderEntity.shaderParms[SHADERPARM_DIVERSITY] * idRandom::MAX_RAND )  );
////		steppingRandom2.SetSeed( (( (stageCycle-1) << 10 ) & idRandom::MAX_RAND) ^ (int)( renderEntity.shaderParms[SHADERPARM_DIVERSITY] * idRandom::MAX_RAND )  );

////		int	count = stage.totalParticles * stage.NumQuadsPerParticle();

////		int surfaceNum;
////		modelSurface_t *surf;

////		if ( staticModel.FindSurfaceWithId( stageNum, surfaceNum ) ) {
////			surf = &staticModel.surfaces[surfaceNum];
////			R_FreeStaticTriSurfVertexCaches( surf.geometry );
////		} else {
////			surf = &staticModel.surfaces.Alloc();
////			surf.id = stageNum;
////			surf.shader = stage.material;
////			surf.geometry = R_AllocStaticTriSurf();
////			R_AllocStaticTriSurfVerts( surf.geometry, 4 * count );
////			R_AllocStaticTriSurfIndexes( surf.geometry, 6 * count );
////			R_AllocStaticTriSurfPlanes( surf.geometry, 6 * count );
////		}

////		int numVerts = 0;
////		idDrawVert *verts = surf.geometry.verts;

////		for ( int index = 0; index < stage.totalParticles; index++ ) {
////			g.index = index;

////			// bump the random
////			steppingRandom.RandomInt();
////			steppingRandom2.RandomInt();

////			// calculate local age for this index 
////			int	bunchOffset = stage.particleLife * 1000 * stage.spawnBunching * index / stage.totalParticles;

////			int particleAge = stageAge - bunchOffset;
////			int	particleCycle = particleAge / stage.cycleMsec;
////			if ( particleCycle < 0 ) {
////				// before the particleSystem spawned
////				continue;
////			}
////			if ( stage.cycles && particleCycle >= stage.cycles ) {
////				// cycled systems will only run cycle times
////				continue;
////			}

////			if ( particleCycle == stageCycle ) {
////				g.random = steppingRandom;
////			} else {
////				g.random = steppingRandom2;
////			}

////			int	inCycleTime = particleAge - particleCycle * stage.cycleMsec;

////			if ( renderEntity.shaderParms[SHADERPARM_PARTICLE_STOPTIME] && 
////				g.renderView.time - inCycleTime >= renderEntity.shaderParms[SHADERPARM_PARTICLE_STOPTIME]*1000 ) {
////				// don't fire any more particles
////				continue;
////			}

////			// supress particles before or after the age clamp
////			g.frac = (float)inCycleTime / ( stage.particleLife * 1000 );
////			if ( g.frac < 0.0 ) {
////				// yet to be spawned
////				continue;
////			}
////			if ( g.frac > 1.0f ) {
////				// this particle is in the deadTime band
////				continue;
////			}

////			// this is needed so aimed particles can calculate origins at different times
////			g.originalRandom = g.random;

////			g.age = g.frac * stage.particleLife;

////			// if the particle doesn't get drawn because it is faded out or beyond a kill region, don't increment the verts
////			numVerts += stage.CreateParticle( &g, verts + numVerts );
////		}

////		// numVerts must be a multiple of 4
////		assert( ( numVerts & 3 ) == 0 && numVerts <= 4 * count );

////		// build the indexes
////		int	numIndexes = 0;
////		glIndex_t *indexes = surf.geometry.indexes;
////		for ( int i = 0; i < numVerts; i += 4 ) {
////			indexes[numIndexes+0] = i;
////			indexes[numIndexes+1] = i+2;
////			indexes[numIndexes+2] = i+3;
////			indexes[numIndexes+3] = i;
////			indexes[numIndexes+4] = i+3;
////			indexes[numIndexes+5] = i+1;
////			numIndexes += 6;
////		}

////		surf.geometry.tangentsCalculated = false;
////		surf.geometry.facePlanesCalculated = false;
////		surf.geometry.numVerts = numVerts;
////		surf.geometry.numIndexes = numIndexes;
////		surf.geometry.bounds = stage.bounds;		// just always draw the particles
////	}

////	return staticModel;
////}

/////*
////====================
////idRenderModelPrt::IsDynamicModel
////====================
////*/
////dynamicModel_t idRenderModelPrt::IsDynamicModel() const {
////	return DM_CONTINUOUS;
////}

/////*
////====================
////idRenderModelPrt::Bounds
////====================
////*/
////idBounds idRenderModelPrt::Bounds( const struct renderEntity_s *ent ) const {
////	return particleSystem.bounds;
////}

/////*
////====================
////idRenderModelPrt::DepthHack
////====================
////*/
////float idRenderModelPrt::DepthHack() const {
////	return particleSystem.depthHack;
////}

/////*
////====================
////idRenderModelPrt::Memory
////====================
////*/
////int idRenderModelPrt::Memory() const {
////	int total = 0;

////	total += idRenderModelStatic::Memory();

////	if ( particleSystem ) {
////		total += sizeof( *particleSystem );

////		for ( int i = 0; i < particleSystem.stages.Num(); i++ ) {
////			total += sizeof( particleSystem.stages[i] );
////		}
////	}

////	return total;
////}

}

/////*
////===============================================================================

////	Beam model

////===============================================================================
////*/

class idRenderModelBeam extends idRenderModelStatic {
////public:
////	virtual dynamicModel_t		IsDynamicModel() const;
////	virtual bool				IsLoaded() const;
////	virtual idRenderModel *		InstantiateDynamicModel( const struct renderEntity_s *ent, const struct viewDef_s *view, idRenderModel *cachedModel );
////	virtual idBounds			Bounds( const struct renderEntity_s *ent ) const;
	
/*
===============
idRenderModelBeam::IsDynamicModel
===============
*/
	IsDynamicModel ( ): dynamicModel_t {
		return dynamicModel_t.DM_CONTINUOUS; // regenerate for every view
	}

/*
===============
idRenderModelBeam::IsLoaded
===============
*/
	IsLoaded ( ): boolean {
		return true; // don't ever need to load
	}

/////*
////===============
////idRenderModelBeam::InstantiateDynamicModel
////===============
////*/
////idRenderModel *idRenderModelBeam::InstantiateDynamicModel( const struct renderEntity_s *renderEntity, const struct viewDef_s *viewDef, idRenderModel *cachedModel ) {
////	idRenderModelStatic *staticModel;
////	srfTriangles_t *tri;
////	modelSurface_t surf;

////	if ( cachedModel ) {
////		delete cachedModel;
////		cachedModel = NULL;
////	}

////	if ( renderEntity == NULL || viewDef == NULL ) {
////		delete cachedModel;
////		return NULL;
////	}

////	if ( cachedModel != NULL ) {

////		assert( dynamic_cast<idRenderModelStatic *>( cachedModel ) != NULL );
////		assert( idStr::Icmp( cachedModel.Name(), beam_SnapshotName ) == 0 );

////		staticModel = static_cast<idRenderModelStatic *>( cachedModel );
////		surf = *staticModel.Surface( 0 );
////		tri = surf.geometry;

////	} else {

////		staticModel = new idRenderModelStatic;
////		staticModel.InitEmpty( beam_SnapshotName );

////		tri = R_AllocStaticTriSurf();
////		R_AllocStaticTriSurfVerts( tri, 4 );
////		R_AllocStaticTriSurfIndexes( tri, 6 );

////		tri.verts[0].Clear();
////		tri.verts[0].st[0] = 0;
////		tri.verts[0].st[1] = 0;

////		tri.verts[1].Clear();
////		tri.verts[1].st[0] = 0;
////		tri.verts[1].st[1] = 1;

////		tri.verts[2].Clear();
////		tri.verts[2].st[0] = 1;
////		tri.verts[2].st[1] = 0;

////		tri.verts[3].Clear();
////		tri.verts[3].st[0] = 1;
////		tri.verts[3].st[1] = 1;

////		tri.indexes[0] = 0;
////		tri.indexes[1] = 2;
////		tri.indexes[2] = 1;
////		tri.indexes[3] = 2;
////		tri.indexes[4] = 3;
////		tri.indexes[5] = 1;

////		tri.numVerts = 4;
////		tri.numIndexes = 6;

////		surf.geometry = tri;
////		surf.id = 0;
////		surf.shader = tr.defaultMaterial;
////		staticModel.AddSurface( surf );
////	}

////	idVec3	target = *reinterpret_cast<const idVec3 *>( &renderEntity.shaderParms[SHADERPARM_BEAM_END_X] );

////	// we need the view direction to project the minor axis of the tube
////	// as the view changes
////	idVec3	localView, localTarget;
////	float	modelMatrix[16];
////	R_AxisToModelMatrix( renderEntity.axis, renderEntity.origin, modelMatrix );
////	R_GlobalPointToLocal( modelMatrix, viewDef.renderView.vieworg, localView ); 
////	R_GlobalPointToLocal( modelMatrix, target, localTarget ); 

////	idVec3	major = localTarget;
////	idVec3	minor;

////	idVec3	mid = 0.5f * localTarget;
////	idVec3	dir = mid - localView;
////	minor.Cross( major, dir );
////	minor.Normalize();
////	if ( renderEntity.shaderParms[SHADERPARM_BEAM_WIDTH] != 0.0 ) {
////		minor *= renderEntity.shaderParms[SHADERPARM_BEAM_WIDTH] * 0.5f;
////	}

////	int red		= idMath::FtoiFast( renderEntity.shaderParms[SHADERPARM_RED] * 255.0f );
////	int green	= idMath::FtoiFast( renderEntity.shaderParms[SHADERPARM_GREEN] * 255.0f );
////	int blue	= idMath::FtoiFast( renderEntity.shaderParms[SHADERPARM_BLUE] * 255.0f );
////	int alpha	= idMath::FtoiFast( renderEntity.shaderParms[SHADERPARM_ALPHA] * 255.0f );

////	tri.verts[0].xyz = minor;
////	tri.verts[0].color[0] = red;
////	tri.verts[0].color[1] = green;
////	tri.verts[0].color[2] = blue;
////	tri.verts[0].color[3] = alpha;

////	tri.verts[1].xyz = -minor;
////	tri.verts[1].color[0] = red;
////	tri.verts[1].color[1] = green;
////	tri.verts[1].color[2] = blue;
////	tri.verts[1].color[3] = alpha;

////	tri.verts[2].xyz = localTarget + minor;
////	tri.verts[2].color[0] = red;
////	tri.verts[2].color[1] = green;
////	tri.verts[2].color[2] = blue;
////	tri.verts[2].color[3] = alpha;

////	tri.verts[3].xyz = localTarget - minor;
////	tri.verts[3].color[0] = red;
////	tri.verts[3].color[1] = green;
////	tri.verts[3].color[2] = blue;
////	tri.verts[3].color[3] = alpha;

////	R_BoundTriSurf( tri );

////	staticModel.bounds = tri.bounds;

////	return staticModel;
////}

/////*
////===============
////idRenderModelBeam::Bounds
////===============
////*/
////idBounds idRenderModelBeam::Bounds( const struct renderEntity_s *renderEntity ) const {
////	idBounds	b;

////	b.Zero();
////	if ( !renderEntity ) {
////		b.ExpandSelf( 8.0f );
////	} else {
////		idVec3	target = *reinterpret_cast<const idVec3 *>( &renderEntity.shaderParms[SHADERPARM_BEAM_END_X] );
////		idVec3	localTarget;
////		float	modelMatrix[16];
////		R_AxisToModelMatrix( renderEntity.axis, renderEntity.origin, modelMatrix );
////		R_GlobalPointToLocal( modelMatrix, target, localTarget ); 

////		b.AddPoint( localTarget );
////		if ( renderEntity.shaderParms[SHADERPARM_BEAM_WIDTH] != 0.0 ) {
////			b.ExpandSelf( renderEntity.shaderParms[SHADERPARM_BEAM_WIDTH] * 0.5f );
////		}
////	}
////	return b;
////}


}

/////*
////===============================================================================

////	Beam model

////===============================================================================
////*/
////#define MAX_TRAIL_PTS	20

////struct Trail_t {
////	int							lastUpdateTime;
////	int							duration;

////	idVec3						pts[MAX_TRAIL_PTS];
////	int							numPoints;
////}

class idRenderModelTrail extends idRenderModelStatic {
	constructor() {
		super();
		todoThrow()
	}
////	idList<Trail_t>				trails;
////	int							numActive;
////	idBounds					trailBounds;

////public:
////								idRenderModelTrail();

////	virtual dynamicModel_t		IsDynamicModel() const;
////	virtual bool				IsLoaded() const;
////	virtual idRenderModel *		InstantiateDynamicModel( const struct renderEntity_s *ent, const struct viewDef_s *view, idRenderModel *cachedModel );
////	virtual idBounds			Bounds( const struct renderEntity_s *ent ) const;

////	int							NewTrail( idVec3 pt, int duration );
////	void						UpdateTrail( int index, idVec3 pt );
////	void						DrawTrail( int index, const struct renderEntity_s *ent, srfTriangles_t *tri, float globalAlpha );
}

/////*
////===============================================================================

////	Lightning model

////===============================================================================
////*/

class idRenderModelLightning extends idRenderModelStatic {
	constructor() {
		super();
		todoThrow()
	}
////public:
////	virtual dynamicModel_t		IsDynamicModel() const;
////	virtual bool				IsLoaded() const;
////	virtual idRenderModel *		InstantiateDynamicModel( const struct renderEntity_s *ent, const struct viewDef_s *view, idRenderModel *cachedModel );
////	virtual idBounds			Bounds( const struct renderEntity_s *ent ) const;
}

/*
================================================================================

	idRenderModelSprite 

================================================================================
*/
class idRenderModelSprite extends idRenderModelStatic {
//public:
//	virtual	dynamicModel_t	IsDynamicModel() const;
//	virtual	bool			IsLoaded() const;
//	virtual	idRenderModel *	InstantiateDynamicModel( const struct renderEntity_s *ent, const struct viewDef_s *view, idRenderModel *cachedModel );
//	virtual	idBounds		Bounds( const struct renderEntity_s *ent ) const;

	/*
	===============
	idRenderModelSprite::IsDynamicModel
	===============
	*/
	IsDynamicModel ( ): dynamicModel_t {
		return dynamicModel_t.DM_CONTINUOUS;
	}

	/*
	===============
	idRenderModelSprite::IsLoaded
	===============
	*/
	IsLoaded ( ): boolean {
		return true;
	}
}

////#endif /* !__MODEL_LOCAL_H__ */
