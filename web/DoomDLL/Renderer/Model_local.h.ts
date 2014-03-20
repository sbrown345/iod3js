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

/////*
////===============================================================================

////	Static model

////===============================================================================
////*/

class idRenderModelStatic extends idRenderModel {
////public:
////	// the inherited public interface
////	static idRenderModel *		Alloc();

////								idRenderModelStatic();
	destructor ( ): void { throw "placeholder"; }

	InitFromFile( fileName:string ): void { throw "placeholder"; }
	PartialInitFromFile( fileName:string ): void { throw "placeholder"; }
	PurgeModel(): void { throw "placeholder"; }
	Reset(): void { throw "placeholder"; }
	LoadModel(): void { throw "placeholder"; }
	IsLoaded(): boolean { throw "placeholder"; }
	SetLevelLoadReferenced( referenced:boolean ): void { throw "placeholder"; }
	IsLevelLoadReferenced(): boolean { throw "placeholder"; }
	TouchData(): void { throw "placeholder"; }
	InitEmpty ( name: string ): void { throw "placeholder"; }

	AddSurface(surface: modelSurface_t ): void { throw "placeholder"; }
	FinishSurfaces(): void { throw "placeholder"; }
	FreeVertexCache(): void { throw "placeholder"; }
	Name():string { throw "placeholder"; }
	Print() : void { throw "placeholder"; }
	List() : void { throw "placeholder"; }
////	virtual int					Memory() const;
////	virtual ID_TIME_T				Timestamp() const;
////	virtual int					NumSurfaces() const;
////	virtual int					NumBaseSurfaces() const;
	Surface ( surfaceNum: number ): modelSurface_t { throw "placeholder"; }
////	virtual srfTriangles_t *	AllocSurfaceTriangles( int numVerts, int numIndexes ) const;
////	virtual void				FreeSurfaceTriangles( srfTriangles_t *tris ) : void { throw "placeholder"; }
////	virtual srfTriangles_t *	ShadowHull() const;
////	virtual bool				IsStaticWorldModel() const;
////	virtual dynamicModel_t		IsDynamicModel() const;
	IsDefaultModel(): boolean { throw "placeholder"; }
	IsReloadable(): boolean { throw "placeholder"; }
////	virtual idRenderModel *		InstantiateDynamicModel( const struct renderEntity_s *ent, const struct viewDef_s *view, idRenderModel *cachedModel );
////	virtual int					NumJoints( void ) const;
////	virtual const idMD5Joint *	GetJoints( void ) const;
////	virtual jointHandle_t		GetJointHandle( const char *name ) const;
////	virtual const char *		GetJointName( jointHandle_t handle ) const;
////	virtual const idJointQuat *	GetDefaultPose( void ) const;
////	virtual int					NearestJoint( int surfaceNum, int a, int b, int c ) const;
////	virtual idBounds			Bounds( const struct renderEntity_s *ent ) const;
////	virtual void				ReadFromDemoFile( class idDemoFile *f );: void { throw "placeholder"; }
////	virtual void				WriteToDemoFile( class idDemoFile *f );: void { throw "placeholder"; }
////	virtual float				DepthHack() const;

    MakeDefaultModel(): void { throw "placeholder"; }

////	bool						LoadASE( const char *fileName );
////	bool						LoadLWO( const char *fileName );
////	bool						LoadFLT( const char *fileName );
////	bool						LoadMA( const char *filename );

////	bool						ConvertASEToModelSurfaces( const struct aseModel_s *ase );
////	bool						ConvertLWOToModelSurfaces( const struct st_lwObject *lwo );
////	bool						ConvertMAToModelSurfaces (const struct maModel_s *ma );

////	struct aseModel_s *			ConvertLWOToASE( const struct st_lwObject *obj, const char *fileName );

////	bool						DeleteSurfaceWithId( int id );
////	void						DeleteSurfacesWithNegativeId( void );
////	bool						FindSurfaceWithId( int id, int &surfaceNum );

//public:
	surfaces:idList<modelSurface_t>;
	bounds:idBounds;
	overlaysAdded:number;//	int							

//protected:
	lastModifiedFrame:number;//	int							
	lastArchivedFrame:number;//	int							

	name:idStr;
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
		this.name = new idStr("<undefined>");
		this.bounds = new idBounds ( );
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

		this.surfaces = new idList<modelSurface_t>( modelSurface_t );
	}
};

/////*
////===============================================================================

////	MD5 animated model

////===============================================================================
////*/

////class idMD5Mesh {
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
////};

////class idRenderModelMD5 extends idRenderModelStatic {
////public:
////	virtual void				InitFromFile( const char *fileName );
////	virtual dynamicModel_t		IsDynamicModel() const;
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
////	virtual jointHandle_t		GetJointHandle( const char *name ) const;
////	virtual const char *		GetJointName( jointHandle_t handle ) const;
////	virtual const idJointQuat *	GetDefaultPose( void ) const;
////	virtual int					NearestJoint( int surfaceNum, int a, int b, int c ) const;

////private:
////	idList<idMD5Joint>			joints;
////	idList<idJointQuat>			defaultPose;
////	idList<idMD5Mesh>			meshes;

////	void						CalculateBounds( const idJointMat *joints );
////	void						GetFrameBounds( const renderEntity_t *ent, idBounds &bounds ) const;
////	void						DrawJoints( const renderEntity_t *ent, const struct viewDef_s *view ) const;
////	void						ParseJoint( idLexer &parser, idMD5Joint *joint, idJointQuat *defaultPose );
////};

/////*
////===============================================================================

////	MD3 animated model

////===============================================================================
////*/

////struct md3Header_s;
////struct md3Surface_s;

////class idRenderModelMD3 extends idRenderModelStatic {
////public:
////	virtual void				InitFromFile( const char *fileName );
////	virtual dynamicModel_t		IsDynamicModel() const;
////	virtual idRenderModel *		InstantiateDynamicModel( const struct renderEntity_s *ent, const struct viewDef_s *view, idRenderModel *cachedModel );
////	virtual idBounds			Bounds( const struct renderEntity_s *ent ) const;

////private:
////	int							index;			// model = tr.models[model.index]
////	int							dataSize;		// just for listing purposes
////	struct md3Header_s *		md3;			// only if type == MOD_MESH
////	int							numLods;

////	void						LerpMeshVertexes( srfTriangles_t *tri, const struct md3Surface_s *surf, const float backlerp, const int frame, const int oldframe ) const;
////};

/////*
////===============================================================================

////	Liquid model

////===============================================================================
////*/

////class idRenderModelLiquid extends idRenderModelStatic {
////public:
////								idRenderModelLiquid();

////	virtual void				InitFromFile( const char *fileName );
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

////};

/////*
////===============================================================================

////	PRT model

////===============================================================================
////*/

////class idRenderModelPrt extends idRenderModelStatic {
////public:
////								idRenderModelPrt();

////	virtual void				InitFromFile( const char *fileName );
////	virtual void				TouchData();
////	virtual dynamicModel_t		IsDynamicModel() const;
////	virtual idRenderModel *		InstantiateDynamicModel( const struct renderEntity_s *ent, const struct viewDef_s *view, idRenderModel *cachedModel );
////	virtual idBounds			Bounds( const struct renderEntity_s *ent ) const;
////	virtual float				DepthHack() const;
////	virtual int					Memory() const;

////private:
////	const idDeclParticle *		particleSystem;
////};

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
};

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
////};

////class idRenderModelTrail extends idRenderModelStatic {
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
////};

/////*
////===============================================================================

////	Lightning model

////===============================================================================
////*/

////class idRenderModelLightning extends idRenderModelStatic {
////public:
////	virtual dynamicModel_t		IsDynamicModel() const;
////	virtual bool				IsLoaded() const;
////	virtual idRenderModel *		InstantiateDynamicModel( const struct renderEntity_s *ent, const struct viewDef_s *view, idRenderModel *cachedModel );
////	virtual idBounds			Bounds( const struct renderEntity_s *ent ) const;
////};

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
};

////#endif /* !__MODEL_LOCAL_H__ */
