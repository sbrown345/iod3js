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
////#include "../../idlib/precompiled.h"
////#pragma hdrstop
////
////#include "../Game_local.h"

/*
===============================================================

	idClipModel trace model cache

===============================================================
*/

var traceModelCache = new idList<trmCache_t>(trmCache_t, true);
var traceModelHash = new idHashIndex;


var MAX_SECTOR_DEPTH		=		12
var MAX_SECTORS				=		((1<<(MAX_SECTOR_DEPTH+1))-1)

class clipSector_t {
	axis: number /*int*/; // -1 = leaf node
	dist: number /*float*/;
	children = new Array<clipSector_t>( 2 );
	clipLinks: clipLink_t;

	memset0 ( ): void {
		this.axis = 0;
		this.dist = 0;
		this.children[0] = null;
		this.children[1] = null;
		this.clipLinks = null;
	}
}

class clipLink_t {
	clipModel: idClipModel;
	sector: clipSector_t;
	prevInSector: clipLink_t;
	nextInSector: clipLink_t;
	nextLink: clipLink_t;
}

class trmCache_t {
	trm = new idTraceModel;
	refCount:number/*int*/;
	volume:number/*float*/;
	centerOfMass = new idVec3;
	inertiaTensor = new idMat3;
}

var vec3_boxEpsilon = new idVec3( CM_BOX_EPSILON, CM_BOX_EPSILON, CM_BOX_EPSILON );

var clipLinkAllocator = idBlockAlloc_template<clipLink_t>( clipLink_t, 1024 );


/////*
////===============================================================================
////
////  Handles collision detection with the world and between physics objects.
////
////===============================================================================
////*/
////
////#define CLIPMODEL_ID_TO_JOINT_HANDLE( id )	( ( id ) >= 0 ? jointHandle_t.INVALID_JOINT : ((jointHandle_t) ( -1 - id )) )
////#define JOINT_HANDLE_TO_CLIPMODEL_ID( id )	( -1 - id )
////
////class idClip;
////class idClipModel;
////class idEntity;
////

//===============================================================
//
//	idClipModel
//
//===============================================================

class idClipModel {

////	friend class idClip;
////
////public:
////							idClipModel( );
////							explicit idClipModel( name: string );
////							explicit idClipModel( const idTraceModel &trm );
////							explicit idClipModel( const int renderModelHandle );
////							explicit idClipModel( const idClipModel *model );
////							~idClipModel( );
////
////	bool					LoadModel( name: string );
////	void					LoadModel( const idTraceModel &trm );
////	void					LoadModel( const int renderModelHandle );
////
//Save ( savefile: idSaveGame ): void { throw "placeholder"; }
////	void					Restore ( savefile: idRestoreGame ): void { throw "placeholder"; }
////
////	void					Link( idClip &clp );				// must have been linked with an entity and id before
////	void					Link( idClip &clp, ent:idEntity, int newId, const idVec3 &newOrigin, const idMat3 &newAxis, int renderModelHandle = -1 );
////	void					Unlink( );						// unlink from sectors
////	void					SetPosition( const idVec3 &newOrigin, const idMat3 &newAxis );	// unlinks the clip model
////	void					Translate( const idVec3 &translation );							// unlinks the clip model
////	void					Rotate( const idRotation &rotation );							// unlinks the clip model
////	void					Enable( );						// enable for clipping
////	void					Disable( );					// keep linked but disable for clipping
////	void					SetMaterial( const idMaterial *m );
////	const idMaterial *		GetMaterial( ) const;
////	void					SetContents( int newContents );		// override contents
////	int						GetContents( ) const;
////	void					SetEntity( idEntity *newEntity );
////	idEntity *				GetEntity( ) const;
////	void					SetId( int newId );
////	int						GetId( ) const;
////	void					SetOwner( idEntity *newOwner );
////	idEntity *				GetOwner( ) const;
////	const idBounds &		GetBounds( ) const;
////	const idBounds &		GetAbsBounds( ) const;
////	const idVec3 &			GetOrigin( ) const;
////	const idMat3 &			GetAxis( ) const;
////	bool					IsTraceModel( ) const;			// returns true if this is a trace model
////	bool					IsRenderModel( ) const;		// returns true if this is a render model
////	bool					IsLinked( ) const;				// returns true if the clip model is linked
////	bool					IsEnabled( ) const;			// returns true if enabled for collision detection
////	bool					IsEqual( const idTraceModel &trm ) const;
////	cmHandle_t				Handle( ) const;				// returns handle used to collide vs this model
////	const idTraceModel *	GetTraceModel( ) const;
////	void					GetMassProperties( const float density, float &mass, idVec3 &centerOfMass, idMat3 &inertiaTensor ) const;
////
////	static cmHandle_t		CheckModel( name: string );
////	static void				ClearTraceModelCache( );
////	static int				TraceModelCacheSize( );
////
////	static void				SaveTraceModels( idSaveGame *savefile );
////	static void				RestoreTraceModels( idRestoreGame *savefile );

////private:
	enabled: boolean; // true if this clip model is used for clipping
	entity: idEntity; // entity using this clip model
	id: number /*int*/; // id for entities that use multiple clip models
	owner: idEntity; // owner of the entity that owns this clip model
	origin = new idVec3; // origin of clip model
	axis = new idMat3; // orientation of clip model
	bounds = new idBounds; // bounds
	absBounds = new idBounds; // absolute bounds
	material: idMaterial; // material for trace models
	contents: number /*contentsFlags_t - int*/; // all contents ored together
	collisionModelHandle: number /* cmHandle_t(int)*/; // handle to collision model
	traceModelIndex: number; // trace model used for collision detection			////	int						
	renderModelHandle: number; // render model def handle							////	int						

	clipLinks: clipLink_t; // links into sectors
	touchCount: number /*int*/;

	memset0 ( ): void {
		this.enabled = false;
		this.entity = null;
		this.id = 0;
		this.owner = null;
		this.origin.memset0 ( );
		this.axis.memset0 ( );
		this.bounds.memset0 ( );
		this.absBounds.memset0 ( );
		this.material = null;
		this.contents = 0;
		this.collisionModelHandle = 0;
		this.traceModelIndex = 0;
		this.renderModelHandle = 0;

		this.clipLinks = null;
		this.touchCount = 0;
	}

////
////	void					Init( );			// initialize
////	void					Link_r( struct clipSector_s *node );
////
////	static int				AllocTraceModel( const idTraceModel &trm );
////	static void				FreeTraceModel( int traceModelIndex );
////	static idTraceModel *	GetCachedTraceModel( int traceModelIndex );
////	static int				GetTraceModelHashKey( const idTraceModel &trm );
////};
////
////
////Translate( const idVec3 &translation ):void {
////	this.Unlink();
////	origin += translation;
////}
////
////Rotate( const idRotation &rotation ) :void{
////	this.Unlink();
////	origin *= rotation;
////	axis *= rotation.ToMat3();
////}

	Enable ( ): void {
		this.enabled = true;
	}

	Disable ( ): void {
		this.enabled = false;
	}

	etMaterial ( m: idMaterial ): void {
		this.material = m;
	}

	GetMaterial ( ): idMaterial {
		return this.material;
	}

	SetContents ( /*int*/ newContents: number ): void {
		this.contents = newContents;
	}

	GetContents ( ): number /*int*/ {
		return this.contents;
	}

	SetEntity ( newEntity: idEntity ): void {
		this.entity = newEntity;
	}

	GetEntity ( ): idEntity {
		return this.entity;
	}

	SetId ( /*int*/ newId: number ): void {
		this.id = newId;
	}

	GetId ( ): number /*int*/ {
		return this.id;
	}

	SetOwner ( newOwner: idEntity ): void {
		this.owner = newOwner;
	}

	GetOwner ( ): idEntity {
		return this.owner;
	}

	GetBounds ( ): idBounds {
		return this.bounds;
	}

	GetAbsBounds ( ): idBounds {
		return this.absBounds;
	}

	GetOrigin ( ): idVec3 {
		return this.origin;
	}

	GetAxis ( ): idMat3 {
		return this.axis;
	}

	IsRenderModel ( ): boolean {
		return ( this.renderModelHandle != -1 );
	}

	IsTraceModel ( ): boolean {
		return ( this.traceModelIndex != -1 );
	}

	IsLinked ( ): boolean {
		return ( this.clipLinks != null );
	}

	IsEnabled ( ): boolean {
		return this.enabled;
	}

	IsEqual ( trm: idTraceModel ): boolean {
		return ( this.traceModelIndex != -1 && this.GetCachedTraceModel( this.traceModelIndex ) == trm );
	}

	GetTraceModel ( ): idTraceModel {
		if ( !this.IsTraceModel ( ) ) {
			return null;
		}
		return this.GetCachedTraceModel( this.traceModelIndex );
	}


////#endif /* !__CLIP_H__ */


/*
===============
idClipModel::ClearTraceModelCache
===============
*/
	static ClearTraceModelCache ( ): void {
		traceModelCache.DeleteContents( true );
		traceModelHash.Free ( );
	}

/////*
////===============
////idClipModel::TraceModelCacheSize
////===============
////*/
////int idClipModel::TraceModelCacheSize( ) {
////	return traceModelCache.Num() * sizeof( idTraceModel );
////}

/*
===============
idClipModel::AllocTraceModel
===============
*/
	AllocTraceModel ( trm: idTraceModel ): number {
		var /*int */i: number, hashKey: number, traceModelIndex: number;
		var entry: trmCache_t;

		hashKey = this.GetTraceModelHashKey( trm );
		dlog( DEBUG_CM, "AllocTraceModel hashKey: %i\n", hashKey );
		for ( i = traceModelHash.First( hashKey ); i >= 0; i = traceModelHash.Next( i ) ) {
			if ( traceModelCache[i].trm == trm ) {
				traceModelCache[i].refCount++;
				return i;
			}
		}

		entry = new trmCache_t;
		entry.trm = trm;
		var $entryVolume = new R( entry.volume );
		entry.trm.GetMassProperties( 1.0, $entryVolume, entry.centerOfMass, entry.inertiaTensor );
		entry.volume = $entryVolume.$;
		entry.refCount = 1;

		traceModelIndex = traceModelCache.Append( entry );
		traceModelHash.Add( hashKey, traceModelIndex );
		return traceModelIndex;
	}

/*
===============
idClipModel::FreeTraceModel
===============
*/
	static FreeTraceModel ( /*int */traceModelIndex: number ): void {
		if ( traceModelIndex < 0 || traceModelIndex >= traceModelCache.Num ( ) || traceModelCache[traceModelIndex].refCount <= 0 ) {
			gameLocal.Warning( "idClipModel::FreeTraceModel: tried to free uncached trace model" );
			return;
		}
		traceModelCache[traceModelIndex].refCount--;
	}

/*
===============
idClipModel::GetCachedTraceModel
===============
*/
	GetCachedTraceModel ( /*int */traceModelIndex: number ): idTraceModel {
		return traceModelCache[traceModelIndex].trm;
	}

/*
===============
idClipModel::GetTraceModelHashKey
===============
*/
	GetTraceModelHashKey ( trm: idTraceModel ): number {
		var v = trm.bounds[0];
		return ( trm.type << 8 ) ^ ( trm.numVerts << 4 ) ^ ( trm.numEdges << 2 ) ^ ( trm.numPolys << 0 ) ^ idMath.FloatHash( v.ToFloatPtr ( ), v.GetDimension ( ) );
	}

/////*
////===============
////idClipModel::SaveTraceModels
////===============
////*/
////void idClipModel::SaveTraceModels( idSaveGame *savefile ) {
////	var/*int*/i:number;
////
////	savefile.WriteInt( traceModelCache.Num() );
////	for ( i = 0; i < traceModelCache.Num(); i++ ) {
////		trmCache_t *entry = traceModelCache[i];
////		
////		savefile.WriteTraceModel( entry.trm );
////		savefile.WriteFloat( entry.volume );
////		savefile.WriteVec3( entry.centerOfMass );
////		savefile.WriteMat3( entry.inertiaTensor );
////	}
////}
////
/////*
////===============
////idClipModel::RestoreTraceModels
////===============
////*/
////void idClipModel::RestoreTraceModels( idRestoreGame *savefile ) {
////	int i, num;
////
////	ClearTraceModelCache();
////
////	savefile.ReadInt( num );
////	traceModelCache.SetNum( num );
////
////	for ( i = 0; i < num; i++ ) {
////		trmCache_t *entry = new trmCache_t;
////		
////		savefile.ReadTraceModel( entry.trm );
////
////		savefile.ReadFloat( entry.volume );
////		savefile.ReadVec3( entry.centerOfMass );
////		savefile.ReadMat3( entry.inertiaTensor );
////		entry.refCount = 0;
////
////		traceModelCache[i] = entry;
////		traceModelHash.Add( GetTraceModelHashKey( entry.trm ), i );
////	}
////}
////
////
/*
===============================================================

	idClipModel

===============================================================
*/

/*
================
idClipModel::LoadModel
================
*/
	LoadModel_name ( name: string ): boolean {
		this.renderModelHandle = -1;
		if ( this.traceModelIndex != -1 ) {
			idClipModel.FreeTraceModel( this.traceModelIndex );
			this.traceModelIndex = -1;
		}
		this.collisionModelHandle = collisionModelManager.LoadModel( name, false );
		if ( this.collisionModelHandle ) {
			collisionModelManager.GetModelBounds( this.collisionModelHandle, this.bounds );
			var $contents = new R( this.contents );
			collisionModelManager.GetModelContents( this.collisionModelHandle, $contents );
			this.contents = $contents.$;
			return true;
		} else {
			this.bounds.Zero ( );
			return false;
		}
	}

/*
================
idClipModel::LoadModel
================
*/
	LoadModel ( trm: idTraceModel ): void {
		this.collisionModelHandle = 0;
		this.renderModelHandle = -1;
		if ( this.traceModelIndex != -1 ) {
			idClipModel.FreeTraceModel( this.traceModelIndex );
		}
		this.traceModelIndex = this.AllocTraceModel( trm );
		this.bounds.opEquals( trm.bounds );
	}

/*
================
idClipModel::LoadModel
================
*/
	LoadModel_handle ( /* int */renderModelHandle: number ): void {
		this.collisionModelHandle = 0;
		this.renderModelHandle = renderModelHandle;
		if ( renderModelHandle != -1 ) {
			var renderEntity = gameRenderWorld.GetRenderEntity( renderModelHandle );
			if ( renderEntity ) {
				this.bounds = renderEntity.bounds;
			}
		}
		if ( this.traceModelIndex != -1 ) {
			idClipModel.FreeTraceModel( this.traceModelIndex );
			this.traceModelIndex = -1;
		}
	}

/*
================
idClipModel::Init
================
*/
	Init ( ): void {
		this.enabled = true;
		this.entity = null;
		this.id = 0;
		this.owner = null;
		this.origin.Zero ( );
		this.axis.Identity ( );
		this.bounds.Zero ( );
		this.absBounds.Zero ( );
		this.material = null;
		this.contents = contentsFlags_t.CONTENTS_BODY;
		this.collisionModelHandle = 0;
		this.renderModelHandle = -1;
		this.traceModelIndex = -1;
		this.clipLinks = null;
		this.touchCount = -1;
	}

	constructor ( )
	constructor ( name: string )
	constructor ( name: number )
	constructor ( trm: idTraceModel )
	constructor ( trm: idClipModel )
	constructor ( a1?: any ) {
		if ( arguments.length === 0 ) {
			this.constructor_default ( );
			return;
		}

		switch ( typeof a1 ) {
		case "string":
			var name: string = a1;
			this.constructor_name( name );
			break;

		case "number":
			var renderModelHandle = <number>a1;
			this.constructor_handle( renderModelHandle );
			break;

		case "object":
			if ( a1 instanceof idTraceModel ) {
				var trm: idTraceModel = a1;
				this.constructor_trace( trm );
			} else if (a1 instanceof idClipModel) {
				var model = <idClipModel>a1;
				this.constructor_clipModel(model );
			} else {
				todoThrow ( );
			}
			break;

		default:
			todoThrow ( );
		}
	}

/*
================
idClipModel::idClipModel
================
*/
	private constructor_default ( ): void {
		this.Init ( );
	}
/*
================
idClipModel::idClipModel
================
*/
	private constructor_name ( name: string ): void {
		this.Init ( );
		this.LoadModel_name( name );
	}

/*
================
idClipModel::idClipModel
================
*/
	private constructor_trace ( trm: idTraceModel ): void {
		this.Init ( );
		this.LoadModel( trm );
	}

/*
================
idClipModel::idClipModel
================
*/
	private constructor_handle ( /*int */renderModelHandle: number ): void {
		this.Init ( );
		this.contents = contentsFlags_t.CONTENTS_RENDERMODEL;
		this.LoadModel_handle( renderModelHandle );
	}

/*
================
idClipModel::idClipModel
================
*/
	private constructor_clipModel ( model: idClipModel ) {
		this.enabled = model.enabled;
		this.entity = model.entity;
		this.id = model.id;
		this.owner = model.owner;
		this.origin.opEquals( model.origin );
		this.axis.opEquals( model.axis );
		this.bounds.opEquals( model.bounds );
		this.absBounds.opEquals( model.absBounds );
		this.material = model.material;
		this.contents = model.contents;
		this.collisionModelHandle = model.collisionModelHandle;
		this.traceModelIndex = -1;
		if ( model.traceModelIndex != -1 ) {
			this.LoadModel( /***/ this.GetCachedTraceModel( model.traceModelIndex ) );
		}
		this.renderModelHandle = model.renderModelHandle;
		this.clipLinks = null;
		this.touchCount = -1;
	}

/*
================
idClipModel::~idClipModel
================
*/
	destructor ( ): void {
		// make sure the clip model is no longer linked
		this.Unlink ( );
		if ( this.traceModelIndex != -1 ) {
			idClipModel.FreeTraceModel( this.traceModelIndex );
		}
	}

/////*
////================
////idClipModel::Save
////================
////*/
////void idClipModel::Save( idSaveGame *savefile ) const {
////	savefile.WriteBool( this.enabled );
////	savefile.WriteObject( this.entity );
////	savefile.WriteInt( this.id );
////	savefile.WriteObject( this.owner );
////	savefile.WriteVec3( this.origin );
////	savefile.WriteMat3( this.axis );
////	savefile.WriteBounds( this.bounds );
////	savefile.WriteBounds( this.absBounds );
////	savefile.WriteMaterial( this.material );
////	savefile.WriteInt( this.contents );
////	if ( this.collisionModelHandle >= 0 ) {
////		savefile.WriteString( collisionModelManager.GetModelName( this.collisionModelHandle ) );
////	} else {
////		savefile.WriteString( "" );
////	}
////	savefile.WriteInt( this.traceModelIndex );
////	savefile.WriteInt( renderModelHandle );
////	savefile.WriteBool( this.clipLinks != NULL );
////	savefile.WriteInt( this.touchCount );
////}
////
/////*
////================
////idClipModel::Restore
////================
////*/
////void idClipModel::Restore( idRestoreGame *savefile ) {
////	idStr collisionModelName;
////	bool linked;
////
////	savefile.ReadBool( this.enabled );
////	savefile.ReadObject( reinterpret_cast<idClass *&>( this.entity ) );
////	savefile.ReadInt( this.id );
////	savefile.ReadObject( reinterpret_cast<idClass *&>( this.owner ) );
////	savefile.ReadVec3( this.origin );
////	savefile.ReadMat3( this.axis );
////	savefile.ReadBounds( this.bounds );
////	savefile.ReadBounds( this.absBounds );
////	savefile.ReadMaterial( this.material );
////	savefile.ReadInt( this.contents );
////	savefile.ReadString( collisionModelName );
////	if ( collisionModelName.Length() ) {
////		this.collisionModelHandle = collisionModelManager.LoadModel( collisionModelName, false );
////	} else {
////		this.collisionModelHandle = -1;
////	}
////	savefile.ReadInt( this.traceModelIndex );
////	if ( this.traceModelIndex >= 0 ) {
////		traceModelCache[this.traceModelIndex].refCount++;
////	}
////	savefile.ReadInt( renderModelHandle );
////	savefile.ReadBool( linked );
////	savefile.ReadInt( this.touchCount );
////
////	// the render model will be set when the clip model is linked
////	renderModelHandle = -1;
////	this.clipLinks = NULL;
////	this.touchCount = -1;
////
////	if ( linked ) {
////		Link( gameLocal.clip, this.entity, this.id, this.origin, this.axis, renderModelHandle );
////	}
////}
////
/////*
////================
////idClipModel::SetPosition
////================
////*/
////void idClipModel::SetPosition( const idVec3 &newOrigin, const idMat3 &newAxis ) {
////	if ( this.clipLinks ) {
////		this.Unlink();	// unlink from old position
////	}
////	this.origin = newOrigin;
////	this.axis = newAxis;
////}
////
/////*
////================
////idClipModel::Handle
////================
////*/
////cmHandle_t idClipModel::Handle( ) const {
////	assert( renderModelHandle == -1 );
////	if ( this.collisionModelHandle ) {
////		return this.collisionModelHandle;
////	} else if ( this.traceModelIndex != -1 ) {
////		return collisionModelManager.SetupTrmModel( *GetCachedTraceModel( this.traceModelIndex ), this.material );
////	} else {
////		// this happens in multiplayer on the combat models
////		gameLocal.Warning( "idClipModel::Handle: clip model %d on '%s' (%x) is not a collision or trace model", this.id, entity.name.c_str(), entity.entityNumber );
////		return 0;
////	}
////}

/*
================
idClipModel::GetMassProperties
================
*/
	GetMassProperties ( /*float */density: number, /*float */ mass: R<number>, centerOfMass: idVec3, inertiaTensor: idMat3 ): void {
		if ( this.traceModelIndex == -1 ) {
			gameLocal.Error( "idClipModel::GetMassProperties: clip model %d on '%s' is not a trace model\n", this.id, this.entity.name.c_str ( ) );
		}

		var entry = traceModelCache[this.traceModelIndex];
		mass.$ = entry.volume * density;
		centerOfMass.opEquals( entry.centerOfMass );
		inertiaTensor.opEquals( idMat3.opMultiplication_floatMat( density, entry.inertiaTensor ) );
	}

/*
===============
idClipModel::Unlink
===============
*/
	Unlink ( ): void {
		var link: clipLink_t;

		for ( link = this.clipLinks; link; link = this.clipLinks ) {
			this.clipLinks = link.nextLink;
			if ( link.prevInSector ) {
				link.prevInSector.nextInSector = link.nextInSector;
			} else {
				link.sector.clipLinks = link.nextInSector;
			}
			if ( link.nextInSector ) {
				link.nextInSector.prevInSector = link.prevInSector;
			}
			clipLinkAllocator.Free( link );
		}
	}

/*
===============
idClipModel::Link_r
===============
*/
	Link_r ( node: clipSector_t ): void {
		var link: clipLink_t;

		while ( node.axis != -1 ) {
			if ( this.absBounds[0][node.axis] > node.dist ) {
				node = node.children[0];
			} else if ( this.absBounds[1][node.axis] < node.dist ) {
				node = node.children[1];
			} else {
				this.Link_r( node.children[0] );
				node = node.children[1];
			}
		}

		link = clipLinkAllocator.Alloc ( );
		link.clipModel = this;
		link.sector = node;
		link.nextInSector = node.clipLinks;
		link.prevInSector = null;
		if ( node.clipLinks ) {
			node.clipLinks.prevInSector = link;
		}
		node.clipLinks = link;
		link.nextLink = this.clipLinks;
		this.clipLinks = link;
	}

/*
===============
idClipModel::Link
===============
*/
	Link ( clp: idClip ): void {

		assert( this.entity );
		if ( !this.entity ) {
			return;
		}

		if ( this.clipLinks ) {
			this.Unlink ( ); // unlink from old position
		}

		if ( this.bounds.IsCleared ( ) ) {
			return;
		}

		// set the abs box
		if ( this.axis.IsRotated ( ) ) {
			// expand for rotation
			this.absBounds.FromTransformedBounds( this.bounds, this.origin, this.axis );
		} else {
			// normal
			this.absBounds[0].opEquals( this.bounds[0].opAddition( this.origin ) );
			this.absBounds[1].opEquals( this.bounds[1].opAddition( this.origin ) );
		}

		// because movement is clipped an epsilon away from an actual edge,
		// we must fully check even when bounding boxes don't quite touch
		this.absBounds[0].opSubtractionAssignment( vec3_boxEpsilon );
		this.absBounds[1].opAdditionAssignment( vec3_boxEpsilon );

		this.Link_r( clp.clipSectors[0] );
	}

/*
===============
idClipModel::Link
===============
*/
	Link_ent ( clp: idClip, ent: idEntity, /*int */newId: number, newOrigin: idVec3, newAxis: idMat3, /*int */renderModelHandle = -1 ): void {

		this.entity = ent;
		this.id = newId;
		this.origin = newOrigin;
		this.axis = newAxis;
		if ( renderModelHandle != -1 ) {
			this.renderModelHandle = renderModelHandle;
			var renderEntity = gameRenderWorld.GetRenderEntity( renderModelHandle );
			if ( renderEntity ) {
				this.bounds = renderEntity.bounds;
			}
		}
		this.Link( clp );
	}

/*
============
idClipModel::CheckModel
============
*/
	static CheckModel ( name: string ): number /*cmHandle_t*/ {
		return collisionModelManager.LoadModel( name, false );
	}
}

//===============================================================
//
//	idClip
//
//===============================================================

class idClip {
	////
	////	friend class idClipModel;
	////
	////public:
	////							idClip( );
	////
	////	void					Init( );
	//Shutdown ( ): void { throw "placeholder"; }
	////
	////	// clip versus the rest of the world
	////	bool					Translation( trace_t &results, start:idVec3, end:idVec3,
	////								const idClipModel *mdl, const idMat3 &trmAxis, int contentMask, passEntity:idEntity );
	////	bool					Rotation( trace_t &results, start:idVec3, const idRotation &rotation,
	////								const idClipModel *mdl, const idMat3 &trmAxis, int contentMask, passEntity:idEntity );
	////	bool					Motion( trace_t &results, start:idVec3, end:idVec3, const idRotation &rotation,
	////								const idClipModel *mdl, const idMat3 &trmAxis, int contentMask, passEntity:idEntity );
	////	int						Contacts( contactInfo_t *contacts, const int maxContacts, start:idVec3, const idVec6 &dir, const float depth,
	////								const idClipModel *mdl, const idMat3 &trmAxis, int contentMask, passEntity:idEntity );
	////	int						Contents( start:idVec3,
	////								const idClipModel *mdl, const idMat3 &trmAxis, int contentMask, passEntity:idEntity );
	////
	////	// special case translations versus the rest of the world
	////	bool					TracePoint( trace_t &results, start:idVec3, end:idVec3,
	////								int contentMask, passEntity:idEntity );
	////	bool					TraceBounds( trace_t &results, start:idVec3, end:idVec3, const bounds: idBounds,
	////								int contentMask, passEntity:idEntity );
	////
	////	// clip versus a specific model
	////	void					TranslationModel( trace_t &results, start:idVec3, end:idVec3,
	////								const idClipModel *mdl, const idMat3 &trmAxis, int contentMask,
	////								cmHandle_t model, const idVec3 &modelOrigin, const idMat3 &modelAxis );
	////	void					RotationModel( trace_t &results, start:idVec3, const idRotation &rotation,
	////								const idClipModel *mdl, const idMat3 &trmAxis, int contentMask,
	////								cmHandle_t model, const idVec3 &modelOrigin, const idMat3 &modelAxis );
	////	int						ContactsModel( contactInfo_t *contacts, const int maxContacts, start:idVec3, const idVec6 &dir, const float depth,
	////								const idClipModel *mdl, const idMat3 &trmAxis, int contentMask,
	////								cmHandle_t model, const idVec3 &modelOrigin, const idMat3 &modelAxis );
	////	int						ContentsModel( start:idVec3,
	////								const idClipModel *mdl, const idMat3 &trmAxis, int contentMask,
	////								cmHandle_t model, const idVec3 &modelOrigin, const idMat3 &modelAxis );
	////
	////	// clip versus all entities but not the world
	////	void					TranslationEntities( trace_t &results, start:idVec3, end:idVec3,
	////								const idClipModel *mdl, const idMat3 &trmAxis, int contentMask, passEntity:idEntity );
	////
	////	// get a contact feature
	////	bool					GetModelContactFeature( const contactInfo_t &contact, const idClipModel *clipModel, idFixedWinding &winding ) const;
	////
	////	// get entities/clip models within or touching the given bounds
	////	int						EntitiesTouchingBounds( const bounds: idBounds, int contentMask, idEntity **entityList, int maxCount ) const;
	////	int						ClipModelsTouchingBounds( const bounds: idBounds, int contentMask, idClipModel **clipModelList, int maxCount ) const;
	////
	////	const idBounds &		GetWorldBounds( ) const;
	////	idClipModel *			DefaultClipModel( );
	////
	////							// stats and debug drawing
	////	void					PrintStatistics( );
	////	void					DrawClipModels( const idVec3 &eye, const float radius, passEntity:idEntity );
	////	bool					DrawModelContactFeature( const contactInfo_t &contact, const idClipModel *clipModel, int lifetime ) const;
	////
	////private:
	numClipSectors: number /*int*/;
	clipSectors: clipSector_t[];
	worldBounds = new idBounds;
	temporaryClipModel = new idClipModel;
	defaultClipModel = new idClipModel;
	touchCount: number /*int*/;
	// statistics
	numTranslations: number /*int*/;
	numRotations: number /*int*/;
	numMotions: number /*int*/;
	numRenderModelTraces: number /*int*/;
	numContents: number /*int*/;
	numContacts: number /*int*/;
	////
	////private:
	////	struct clipSector_s *	CreateClipSectors_r( const int depth, const bounds: idBounds, idVec3 &maxSector );
	////	void					ClipModelsTouchingBounds_r( const struct clipSector_s *node, struct listParms_s &parms ) const;
	////	const idTraceModel *	TraceModelForClipModel( const idClipModel *mdl ) const;
	////	int						GetTraceClipModels( const bounds: idBounds, int contentMask, passEntity:idEntity, idClipModel **clipModelList ) const;
	////	void					TraceRenderModel( trace_t &trace, start:idVec3, const idVec3 &end, const float radius, const idMat3 &axis, idClipModel *touch ) const;
////
////
////ID_INLINE bool idClip::TracePoint( trace_t &results, start:idVec3, const idVec3 &end, int contentMask, const passEntity:idEntity ) {
////	Translation( results, start, end, NULL, mat3_identity, contentMask, passEntity );
////	return ( results.fraction < 1.0 );
////}
////
////ID_INLINE bool idClip::TraceBounds( trace_t &results, start:idVec3, end:idVec3, const bounds: idBounds, int contentMask, const passEntity:idEntity ) {
////	this.temporaryClipModel.LoadModel( idTraceModel( bounds ) );
////	Translation( results, start, end, &this.temporaryClipModel, mat3_identity, contentMask, passEntity );
////	return ( results.fraction < 1.0 );
////}

	GetWorldBounds ( ): idBounds {
		return this.worldBounds;
	}

	DefaultClipModel ( ): idClipModel {
		return this.defaultClipModel;
	}

/*
===============
idClip::idClip
===============
*/
	constructor ( ) {
		this.numClipSectors = 0;
		this.clipSectors = null;
		this.worldBounds.Zero ( );
		this.numRotations = this.numTranslations = this.numMotions = this.numRenderModelTraces = this.numContents = this.numContacts = 0;
	}

	memset0 ( ): void {
		this.numClipSectors = 0;
		this.clipSectors = null;
		this.worldBounds.Zero ( );
		this.temporaryClipModel.memset0 ( );
		this.defaultClipModel.memset0 ( );
		this.touchCount = 0;
		this.numRotations = this.numTranslations = this.numMotions = this.numRenderModelTraces = this.numContents = this.numContacts = 0;
	}

/*
===============
idClip::CreateClipSectors_r

Builds a uniformly subdivided tree for the given world size
===============
*/
	CreateClipSectors_r ( /*int */depth: number, bounds: idBounds, maxSector: idVec3 ): clipSector_t {
		var /*int*/i: number;
		var anode: clipSector_t;
		var size = new idVec3;
		var front = new idBounds, back = new idBounds;

		anode = this.clipSectors[this.numClipSectors];
		this.numClipSectors++;

		if ( depth == MAX_SECTOR_DEPTH ) {
			anode.axis = -1;
			anode.children[0] = anode.children[1] = null;

			for ( i = 0; i < 3; i++ ) {
				if ( bounds[1][i] - bounds[0][i] > maxSector[i] ) {
					maxSector[i] = bounds[1][i] - bounds[0][i];
				}
			}
			return anode;
		}

		size.opEquals( bounds[1].opSubtraction( bounds[0] ) );
		if ( size[0] >= size[1] && size[0] >= size[2] ) {
			anode.axis = 0;
		} else if ( size[1] >= size[0] && size[1] >= size[2] ) {
			anode.axis = 1;
		} else {
			anode.axis = 2;
		}

		anode.dist = 0.5 * ( bounds[1][anode.axis] + bounds[0][anode.axis] );

		front.opEquals( bounds );
		back.opEquals( bounds );

		front[0][anode.axis] = back[1][anode.axis] = anode.dist;

		anode.children[0] = this.CreateClipSectors_r( depth + 1, front, maxSector );
		anode.children[1] = this.CreateClipSectors_r( depth + 1, back, maxSector );

		return anode;
	}

/*
===============
idClip::Init
===============
*/
	Init ( ): void {
		var h: number /*cmHandle_t*/;
		var size = new idVec3, maxSector = new idVec3( vec3_origin.x, vec3_origin.y, vec3_origin.z );

		// clear clip sectors
		this.clipSectors = newStructArray<clipSector_t>( clipSector_t, MAX_SECTORS );
		clearStructArray( this.clipSectors ); //	memset( this.clipSectors, 0, MAX_SECTORS * sizeof( clipSector_t ) );
		this.numClipSectors = 0;
		this.touchCount = -1;
		// get world map bounds
		h = collisionModelManager.LoadModel( "worldMap", false );

		collisionModelManager.GetModelBounds( h, this.worldBounds );
		// create world sectors
		this.CreateClipSectors_r( 0, this.worldBounds, maxSector );

		size.opEquals( this.worldBounds[1].opSubtraction( this.worldBounds[0] ) );
		gameLocal.Printf( "map bounds are (%1.1f, %1.1f, %1.1f)\n", size[0], size[1], size[2] );
		gameLocal.Printf( "max clip sector is (%1.1f, %1.1f, %1.1f)\n", maxSector[0], maxSector[1], maxSector[2] );

		// initialize a default clip model
		this.defaultClipModel.LoadModel( new idTraceModel( new idBounds( new idVec3( 0, 0, 0 ) ).Expand( 8 ) ) );

		// set counters to zero
		this.numRotations = this.numTranslations = this.numMotions = this.numRenderModelTraces = this.numContents = this.numContacts = 0;
	}

/*
===============
idClip::Shutdown
===============
*/
	Shutdown ( ): void {
		$deleteArray( this.clipSectors );
		this.clipSectors = null;

		// free the trace model used for the temporaryClipModel
		if ( this.temporaryClipModel.traceModelIndex != -1 ) {
			idClipModel.FreeTraceModel( this.temporaryClipModel.traceModelIndex );
			this.temporaryClipModel.traceModelIndex = -1;
		}

		// free the trace model used for the defaultClipModel
		if ( this.defaultClipModel.traceModelIndex != -1 ) {
			idClipModel.FreeTraceModel( this.defaultClipModel.traceModelIndex );
			this.defaultClipModel.traceModelIndex = -1;
		}

		clipLinkAllocator.Shutdown ( );
	}

/////*
////====================
////idClip::ClipModelsTouchingBounds_r
////====================
////*/
////typedef struct listParms_s {
////	idBounds		bounds;
////	int				contentMask;
////	idClipModel	**	list;
////	int				count;
////	int				maxCount;
////} listParms_t;
////
////void idClip::ClipModelsTouchingBounds_r( const struct clipSector_s *node, listParms_t &parms ) const {
////
////	while( node.axis != -1 ) {
////		if ( parms.bounds[0][node.axis] > node.dist ) {
////			node = node.children[0];
////		} else if ( parms.bounds[1][node.axis] < node.dist ) {
////			node = node.children[1];
////		} else {
////			ClipModelsTouchingBounds_r( node.children[0], parms );
////			node = node.children[1];
////		}
////	}
////
////	for ( clipLink_t *link = node.clipLinks; link; link = link.nextInSector ) {
////		idClipModel	*check = link.clipModel;
////
////		// if the clip model is enabled
////		if ( !check.enabled ) {
////			continue;
////		}
////
////		// avoid duplicates in the list
////		if ( check.touchCount == this.touchCount ) {
////			continue;
////		}
////
////		// if the clip model does not have any contents we are looking for
////		if ( !( check.contents & parms.contentMask ) ) {
////			continue;
////		}
////
////		// if the bounds really do overlap
////		if (	check.absBounds[0][0] > parms.bounds[1][0] ||
////				check.absBounds[1][0] < parms.bounds[0][0] ||
////				check.absBounds[0][1] > parms.bounds[1][1] ||
////				check.absBounds[1][1] < parms.bounds[0][1] ||
////				check.absBounds[0][2] > parms.bounds[1][2] ||
////				check.absBounds[1][2] < parms.bounds[0][2] ) {
////			continue;
////		}
////
////		if ( parms.count >= parms.maxCount ) {
////			gameLocal.Warning( "idClip::ClipModelsTouchingBounds_r: max count" );
////			return;
////		}
////
////		check.touchCount = this.touchCount;
////		parms.list[parms.count] = check;
////		parms.count++;
////	}
////}
////
/////*
////================
////idClip::ClipModelsTouchingBounds
////================
////*/
////int idClip::ClipModelsTouchingBounds( const bounds: idBounds, int contentMask, idClipModel **clipModelList, int maxCount ) const {
////	listParms_t parms;
////
////	if (	bounds[0][0] > bounds[1][0] ||
////			bounds[0][1] > bounds[1][1] ||
////			bounds[0][2] > bounds[1][2] ) {
////		// we should not go through the tree for degenerate or backwards bounds
////		assert( false );
////		return 0;
////	}
////
////	parms.bounds[0] = bounds[0] - vec3_boxEpsilon;
////	parms.bounds[1] = bounds[1] + vec3_boxEpsilon;
////	parms.contentMask = contentMask;
////	parms.list = clipModelList;
////	parms.count = 0;
////	parms.maxCount = maxCount;
////
////	this.touchCount++;
////	ClipModelsTouchingBounds_r( this.clipSectors, parms );
////
////	return parms.count;
////}
////
/////*
////================
////idClip::EntitiesTouchingBounds
////================
////*/
////int idClip::EntitiesTouchingBounds( const bounds: idBounds, int contentMask, idEntity **entityList, int maxCount ) const {
////	idClipModel *clipModelList[MAX_GENTITIES];
////	int i, j, count, entCount;
////
////	count = idClip::ClipModelsTouchingBounds( bounds, contentMask, clipModelList, MAX_GENTITIES );
////	entCount = 0;
////	for ( i = 0; i < count; i++ ) {
////		// entity could already be in the list because an entity can use multiple clip models
////		for ( j = 0; j < entCount; j++ ) {
////			if ( entityList[j] == clipModelList[i].entity ) {
////				break;
////			}
////		}
////		if ( j >= entCount ) {
////			if ( entCount >= maxCount ) {
////				gameLocal.Warning( "idClip::EntitiesTouchingBounds: max count" );
////				return entCount;
////			}
////			entityList[entCount] = clipModelList[i].entity;
////			entCount++;
////		}
////	}
////
////	return entCount;
////}
////
/////*
////====================
////idClip::GetTraceClipModels
////
////  an ent will be excluded from testing if:
////  cm.entity == passEntity ( don't clip against the pass entity )
////  cm.entity == passOwner ( missiles don't clip with owner )
////  cm.owner == passEntity ( don't interact with your own missiles )
////  cm.owner == passOwner ( don't interact with other missiles from same owner )
////====================
////*/
////int idClip::GetTraceClipModels( const bounds: idBounds, int contentMask, passEntity:idEntity, idClipModel **clipModelList ) const {
////	int i, num;
////	idClipModel	*cm;
////	idEntity *passOwner;
////
////	num = ClipModelsTouchingBounds( bounds, contentMask, clipModelList, MAX_GENTITIES );
////
////	if ( !passEntity ) {
////		return num;
////	}
////
////	if ( passEntity.GetPhysics().GetNumClipModels() > 0 ) {
////		passOwner = passEntity.GetPhysics().GetClipModel().GetOwner();
////	} else {
////		passOwner = NULL;
////	}
////
////	for ( i = 0; i < num; i++ ) {
////
////		cm = clipModelList[i];
////
////		// check if we should ignore this entity
////		if ( cm.entity == passEntity ) {
////			clipModelList[i] = NULL;			// don't clip against the pass entity
////		} else if ( cm.entity == passOwner ) {
////			clipModelList[i] = NULL;			// missiles don't clip with their owner
////		} else if ( cm.owner ) {
////			if ( cm.owner == passEntity ) {
////				clipModelList[i] = NULL;		// don't clip against own missiles
////			} else if ( cm.owner == passOwner ) {
////				clipModelList[i] = NULL;		// don't clip against other missiles from same owner
////			}
////		}
////	}
////
////	return num;
////}
////
/////*
////============
////idClip::TraceRenderModel
////============
////*/
////void idClip::TraceRenderModel( trace_t &trace, start:idVec3, end:idVec3, const float radius, const idMat3 &axis, idClipModel *touch ) const {
////	trace.fraction = 1.0f;
////
////	// if the trace is passing through the bounds
////	if ( touch.absBounds.Expand( radius ).LineIntersection( start, end ) ) {
////		modelTrace_t modelTrace;
////
////		// test with exact render model and modify trace_t structure accordingly
////		if ( gameRenderWorld.ModelTrace( modelTrace, touch.renderModelHandle, start, end, radius ) ) {
////			trace.fraction = modelTrace.fraction;
////			trace.endAxis = axis;
////			trace.endpos = modelTrace.point;
////			trace.c.normal = modelTrace.normal;
////			trace.c.dist = modelTrace.point * modelTrace.normal;
////			trace.c.point = modelTrace.point;
////			trace.c.type = CONTACT_TRMVERTEX;
////			trace.c.modelFeature = 0;
////			trace.c.trmFeature = 0;
////			trace.c.contents = modelTrace.material.GetContentFlags();
////			trace.c.material = modelTrace.material;
////			// NOTE: trace.c.id will be the joint number
////			touch.id = JOINT_HANDLE_TO_CLIPMODEL_ID( modelTrace.jointNumber );
////		}
////	}
////}
////
/////*
////============
////idClip::TraceModelForClipModel
////============
////*/
////const idTraceModel *idClip::TraceModelForClipModel( const idClipModel *mdl ) const {
////	if ( !mdl ) {
////		return NULL;
////	} else {
////		if ( !mdl.IsTraceModel() ) {
////			if ( mdl.GetEntity() ) {
////				gameLocal.Error( "TraceModelForClipModel: clip model %d on '%s' is not a trace model\n", mdl.GetId(), mdl.GetEntity().name.c_str() );
////			} else {
////				gameLocal.Error( "TraceModelForClipModel: clip model %d is not a trace model\n", mdl.GetId() );
////			}
////		}
////		return idClipModel::GetCachedTraceModel( mdl.traceModelIndex );
////	}
////}
////
/////*
////============
////idClip::TestHugeTranslation
////============
////*/
////ID_INLINE bool TestHugeTranslation( trace_t &results, const idClipModel *mdl, start:idVec3, end:idVec3, const idMat3 &trmAxis ) {
////	if ( mdl != NULL && ( end - start ).LengthSqr() > Square( CM_MAX_TRACE_DIST ) ) {
////		assert( 0 );
////
////		results.fraction = 0.0f;
////		results.endpos = start;
////		results.endAxis = trmAxis;
////		memset( &results.c, 0, sizeof( results.c ) );
////		results.c.point = start;
////		results.c.entityNum = ENTITYNUM_WORLD;
////
////		if ( mdl.GetEntity() ) {
////			gameLocal.Printf( "huge translation for clip model %d on entity %d '%s'\n", mdl.GetId(), mdl.GetEntity().entityNumber, mdl.GetEntity().GetName() );
////		} else {
////			gameLocal.Printf( "huge translation for clip model %d\n", mdl.GetId() );
////		}
////		return true;
////	}
////	return false;
////}
////
/////*
////============
////idClip::TranslationEntities
////============
////*/
////void idClip::TranslationEntities( trace_t &results, start:idVec3, end:idVec3,
////						const idClipModel *mdl, const idMat3 &trmAxis, int contentMask, passEntity:idEntity ) {
////	int i, num;
////	idClipModel *touch, *clipModelList[MAX_GENTITIES];
////	idBounds traceBounds;
////	float radius;
////	trace_t trace;
////	const idTraceModel *trm;
////
////	if ( TestHugeTranslation( results, mdl, start, end, trmAxis ) ) {
////		return;
////	}
////
////	trm = TraceModelForClipModel( mdl );
////
////	results.fraction = 1.0f;
////	results.endpos = end;
////	results.endAxis = trmAxis;
////
////	if ( !trm ) {
////		traceBounds.FromPointTranslation( start, end - start );
////		radius = 0.0f;
////	} else {
////		traceBounds.FromBoundsTranslation( trm.bounds, start, trmAxis, end - start );
////		radius = trm.bounds.GetRadius();
////	}
////
////	num = GetTraceClipModels( traceBounds, contentMask, passEntity, clipModelList );
////
////	for ( i = 0; i < num; i++ ) {
////		touch = clipModelList[i];
////
////		if ( !touch ) {
////			continue;
////		}
////
////		if ( touch.renderModelHandle != -1 ) {
////			idClip::this.numRenderModelTraces++;
////			TraceRenderModel( trace, start, end, radius, trmAxis, touch );
////		} else {
////			idClip::this.numTranslations++;
////			collisionModelManager.Translation( &trace, start, end, trm, trmAxis, contentMask,
////									touch.Handle(), touch.origin, touch.axis );
////		}
////
////		if ( trace.fraction < results.fraction ) {
////			results = trace;
////			results.c.entityNum = touch.entity.entityNumber;
////			results.c.id = touch.id;
////			if ( results.fraction == 0.0f ) {
////				break;
////			}
////		}
////	}
////}
////
/////*
////============
////idClip::Translation
////============
////*/
////bool idClip::Translation( trace_t &results, start:idVec3, end:idVec3,
////						const idClipModel *mdl, const idMat3 &trmAxis, int contentMask, passEntity:idEntity ) {
////	int i, num;
////	idClipModel *touch, *clipModelList[MAX_GENTITIES];
////	idBounds traceBounds;
////	float radius;
////	trace_t trace;
////	const idTraceModel *trm;
////
////	if ( TestHugeTranslation( results, mdl, start, end, trmAxis ) ) {
////		return true;
////	}
////
////	trm = TraceModelForClipModel( mdl );
////
////	if ( !passEntity || passEntity.entityNumber != ENTITYNUM_WORLD ) {
////		// test world
////		idClip::this.numTranslations++;
////		collisionModelManager.Translation( &results, start, end, trm, trmAxis, contentMask, 0, vec3_origin, mat3_default );
////		results.c.entityNum = results.fraction != 1.0f ? ENTITYNUM_WORLD : ENTITYNUM_NONE;
////		if ( results.fraction == 0.0f ) {
////			return true;		// blocked immediately by the world
////		}
////	} else {
////		memset( &results, 0, sizeof( results ) );
////		results.fraction = 1.0f;
////		results.endpos = end;
////		results.endAxis = trmAxis;
////	}
////
////	if ( !trm ) {
////		traceBounds.FromPointTranslation( start, results.endpos - start );
////		radius = 0.0f;
////	} else {
////		traceBounds.FromBoundsTranslation( trm.bounds, start, trmAxis, results.endpos - start );
////		radius = trm.bounds.GetRadius();
////	}
////
////	num = GetTraceClipModels( traceBounds, contentMask, passEntity, clipModelList );
////
////	for ( i = 0; i < num; i++ ) {
////		touch = clipModelList[i];
////
////		if ( !touch ) {
////			continue;
////		}
////
////		if ( touch.renderModelHandle != -1 ) {
////			idClip::this.numRenderModelTraces++;
////			TraceRenderModel( trace, start, end, radius, trmAxis, touch );
////		} else {
////			idClip::this.numTranslations++;
////			collisionModelManager.Translation( &trace, start, end, trm, trmAxis, contentMask,
////									touch.Handle(), touch.origin, touch.axis );
////		}
////
////		if ( trace.fraction < results.fraction ) {
////			results = trace;
////			results.c.entityNum = touch.entity.entityNumber;
////			results.c.id = touch.id;
////			if ( results.fraction == 0.0f ) {
////				break;
////			}
////		}
////	}
////
////	return ( results.fraction < 1.0f );
////}
////
/////*
////============
////idClip::Rotation
////============
////*/
////bool idClip::Rotation( trace_t &results, start:idVec3, const idRotation &rotation,
////					const idClipModel *mdl, const idMat3 &trmAxis, int contentMask, passEntity:idEntity ) {
////	int i, num;
////	idClipModel *touch, *clipModelList[MAX_GENTITIES];
////	idBounds traceBounds;
////	trace_t trace;
////	const idTraceModel *trm;
////
////	trm = TraceModelForClipModel( mdl );
////
////	if ( !passEntity || passEntity.entityNumber != ENTITYNUM_WORLD ) {
////		// test world
////		idClip::this.numRotations++;
////		collisionModelManager.Rotation( &results, start, rotation, trm, trmAxis, contentMask, 0, vec3_origin, mat3_default );
////		results.c.entityNum = results.fraction != 1.0f ? ENTITYNUM_WORLD : ENTITYNUM_NONE;
////		if ( results.fraction == 0.0f ) {
////			return true;		// blocked immediately by the world
////		}
////	} else {
////		memset( &results, 0, sizeof( results ) );
////		results.fraction = 1.0f;
////		results.endpos = start;
////		results.endAxis = trmAxis * rotation.ToMat3();
////	}
////
////	if ( !trm ) {
////		traceBounds.FromPointRotation( start, rotation );
////	} else {
////		traceBounds.FromBoundsRotation( trm.bounds, start, trmAxis, rotation );
////	}
////
////	num = GetTraceClipModels( traceBounds, contentMask, passEntity, clipModelList );
////
////	for ( i = 0; i < num; i++ ) {
////		touch = clipModelList[i];
////
////		if ( !touch ) {
////			continue;
////		}
////
////		// no rotational collision with render models
////		if ( touch.renderModelHandle != -1 ) {
////			continue;
////		}
////
////		idClip::this.numRotations++;
////		collisionModelManager.Rotation( &trace, start, rotation, trm, trmAxis, contentMask,
////							touch.Handle(), touch.origin, touch.axis );
////
////		if ( trace.fraction < results.fraction ) {
////			results = trace;
////			results.c.entityNum = touch.entity.entityNumber;
////			results.c.id = touch.id;
////			if ( results.fraction == 0.0f ) {
////				break;
////			}
////		}
////	}
////
////	return ( results.fraction < 1.0f );
////}
////
/////*
////============
////idClip::Motion
////============
////*/
////bool idClip::Motion( trace_t &results, start:idVec3, end:idVec3, const idRotation &rotation,
////					const idClipModel *mdl, const idMat3 &trmAxis, int contentMask, passEntity:idEntity ) {
////	int i, num;
////	idClipModel *touch, *clipModelList[MAX_GENTITIES];
////	idVec3 dir, endPosition;
////	idBounds traceBounds;
////	float radius;
////	trace_t translationalTrace, rotationalTrace, trace;
////	idRotation endRotation;
////	const idTraceModel *trm;
////
////	assert( rotation.GetOrigin() == start );
////
////	if ( TestHugeTranslation( results, mdl, start, end, trmAxis ) ) {
////		return true;
////	}
////
////	if ( mdl != NULL && rotation.GetAngle() != 0.0f && rotation.GetVec() != vec3_origin ) {
////		// if no translation
////		if ( start == end ) {
////			// pure rotation
////			return Rotation( results, start, rotation, mdl, trmAxis, contentMask, passEntity );
////		}
////	} else if ( start != end ) {
////		// pure translation
////		return Translation( results, start, end, mdl, trmAxis, contentMask, passEntity );
////	} else {
////		// no motion
////		results.fraction = 1.0f;
////		results.endpos = start;
////		results.endAxis = trmAxis;
////		return false;
////	}
////
////	trm = TraceModelForClipModel( mdl );
////
////	radius = trm.bounds.GetRadius();
////
////	if ( !passEntity || passEntity.entityNumber != ENTITYNUM_WORLD ) {
////		// translational collision with world
////		idClip::this.numTranslations++;
////		collisionModelManager.Translation( &translationalTrace, start, end, trm, trmAxis, contentMask, 0, vec3_origin, mat3_default );
////		translationalTrace.c.entityNum = translationalTrace.fraction != 1.0f ? ENTITYNUM_WORLD : ENTITYNUM_NONE;
////	} else {
////		memset( &translationalTrace, 0, sizeof( translationalTrace ) );
////		translationalTrace.fraction = 1.0f;
////		translationalTrace.endpos = end;
////		translationalTrace.endAxis = trmAxis;
////	}
////
////	if ( translationalTrace.fraction != 0.0f ) {
////
////		traceBounds.FromBoundsRotation( trm.bounds, start, trmAxis, rotation );
////		dir = translationalTrace.endpos - start;
////		for ( i = 0; i < 3; i++ ) {
////			if ( dir[i] < 0.0f ) {
////				traceBounds[0][i] += dir[i];
////			}
////			else {
////				traceBounds[1][i] += dir[i];
////			}
////		}
////
////		num = GetTraceClipModels( traceBounds, contentMask, passEntity, clipModelList );
////
////		for ( i = 0; i < num; i++ ) {
////			touch = clipModelList[i];
////
////			if ( !touch ) {
////				continue;
////			}
////
////			if ( touch.renderModelHandle != -1 ) {
////				idClip::this.numRenderModelTraces++;
////				TraceRenderModel( trace, start, end, radius, trmAxis, touch );
////			} else {
////				idClip::this.numTranslations++;
////				collisionModelManager.Translation( &trace, start, end, trm, trmAxis, contentMask,
////										touch.Handle(), touch.origin, touch.axis );
////			}
////
////			if ( trace.fraction < translationalTrace.fraction ) {
////				translationalTrace = trace;
////				translationalTrace.c.entityNum = touch.entity.entityNumber;
////				translationalTrace.c.id = touch.id;
////				if ( translationalTrace.fraction == 0.0f ) {
////					break;
////				}
////			}
////		}
////	} else {
////		num = -1;
////	}
////
////	endPosition = translationalTrace.endpos;
////	endRotation = rotation;
////	endRotation.SetOrigin( endPosition );
////
////	if ( !passEntity || passEntity.entityNumber != ENTITYNUM_WORLD ) {
////		// rotational collision with world
////		idClip::this.numRotations++;
////		collisionModelManager.Rotation( &rotationalTrace, endPosition, endRotation, trm, trmAxis, contentMask, 0, vec3_origin, mat3_default );
////		rotationalTrace.c.entityNum = rotationalTrace.fraction != 1.0f ? ENTITYNUM_WORLD : ENTITYNUM_NONE;
////	} else {
////		memset( &rotationalTrace, 0, sizeof( rotationalTrace ) );
////		rotationalTrace.fraction = 1.0f;
////		rotationalTrace.endpos = endPosition;
////		rotationalTrace.endAxis = trmAxis * rotation.ToMat3();
////	}
////
////	if ( rotationalTrace.fraction != 0.0f ) {
////
////		if ( num == -1 ) {
////			traceBounds.FromBoundsRotation( trm.bounds, endPosition, trmAxis, endRotation );
////			num = GetTraceClipModels( traceBounds, contentMask, passEntity, clipModelList );
////		}
////
////		for ( i = 0; i < num; i++ ) {
////			touch = clipModelList[i];
////
////			if ( !touch ) {
////				continue;
////			}
////
////			// no rotational collision detection with render models
////			if ( touch.renderModelHandle != -1 ) {
////				continue;
////			}
////
////			idClip::this.numRotations++;
////			collisionModelManager.Rotation( &trace, endPosition, endRotation, trm, trmAxis, contentMask,
////								touch.Handle(), touch.origin, touch.axis );
////
////			if ( trace.fraction < rotationalTrace.fraction ) {
////				rotationalTrace = trace;
////				rotationalTrace.c.entityNum = touch.entity.entityNumber;
////				rotationalTrace.c.id = touch.id;
////				if ( rotationalTrace.fraction == 0.0f ) {
////					break;
////				}
////			}
////		}
////	}
////
////	if ( rotationalTrace.fraction < 1.0f ) {
////		results = rotationalTrace;
////	} else {
////		results = translationalTrace;
////		results.endAxis = rotationalTrace.endAxis;
////	}
////
////	results.fraction = Max( translationalTrace.fraction, rotationalTrace.fraction );
////
////	return ( translationalTrace.fraction < 1.0f || rotationalTrace.fraction < 1.0f );
////}
////
/////*
////============
////idClip::Contacts
////============
////*/
////int idClip::Contacts( contactInfo_t *contacts, const int maxContacts, start:idVec3, const idVec6 &dir, const float depth,
////					 const idClipModel *mdl, const idMat3 &trmAxis, int contentMask, passEntity:idEntity ) {
////	int i, j, num, n, numContacts;
////	idClipModel *touch, *clipModelList[MAX_GENTITIES];
////	idBounds traceBounds;
////	const idTraceModel *trm;
////
////	trm = TraceModelForClipModel( mdl );
////
////	if ( !passEntity || passEntity.entityNumber != ENTITYNUM_WORLD ) {
////		// test world
////		idClip::this.numContacts++;
////		numContacts = collisionModelManager.Contacts( contacts, maxContacts, start, dir, depth, trm, trmAxis, contentMask, 0, vec3_origin, mat3_default );
////	} else {
////		numContacts = 0;
////	}
////
////	for ( i = 0; i < numContacts; i++ ) {
////		contacts[i].entityNum = ENTITYNUM_WORLD;
////		contacts[i].id = 0;
////	}
////
////	if ( numContacts >= maxContacts ) {
////		return numContacts;
////	}
////
////	if ( !trm ) {
////		traceBounds = idBounds( start ).Expand( depth );
////	} else {
////		traceBounds.FromTransformedBounds( trm.bounds, start, trmAxis );
////		traceBounds.ExpandSelf( depth );
////	}
////
////	num = GetTraceClipModels( traceBounds, contentMask, passEntity, clipModelList );
////
////	for ( i = 0; i < num; i++ ) {
////		touch = clipModelList[i];
////
////		if ( !touch ) {
////			continue;
////		}
////
////		// no contacts with render models
////		if ( touch.renderModelHandle != -1 ) {
////			continue;
////		}
////
////		idClip::this.numContacts++;
////		n = collisionModelManager.Contacts( contacts + numContacts, maxContacts - numContacts,
////								start, dir, depth, trm, trmAxis, contentMask,
////									touch.Handle(), touch.origin, touch.axis );
////
////		for ( j = 0; j < n; j++ ) {
////			contacts[numContacts].entityNum = touch.entity.entityNumber;
////			contacts[numContacts].id = touch.id;
////			numContacts++;
////		}
////
////		if ( numContacts >= maxContacts ) {
////			break;
////		}
////	}
////
////	return numContacts;
////}
////
/////*
////============
////idClip::Contents
////============
////*/
////int idClip::Contents( start:idVec3, const idClipModel *mdl, const idMat3 &trmAxis, int contentMask, passEntity:idEntity ) {
////	int i, num, contents;
////	idClipModel *touch, *clipModelList[MAX_GENTITIES];
////	idBounds traceBounds;
////	const idTraceModel *trm;
////
////	trm = TraceModelForClipModel( mdl );
////
////	if ( !passEntity || passEntity.entityNumber != ENTITYNUM_WORLD ) {
////		// test world
////		idClip::this.numContents++;
////		contents = collisionModelManager.Contents( start, trm, trmAxis, contentMask, 0, vec3_origin, mat3_default );
////	} else {
////		contents = 0;
////	}
////
////	if ( !trm ) {
////		traceBounds[0] = start;
////		traceBounds[1] = start;
////	} else if ( trmAxis.IsRotated() ) {
////		traceBounds.FromTransformedBounds( trm.bounds, start, trmAxis );
////	} else {
////		traceBounds[0] = trm.bounds[0] + start;
////		traceBounds[1] = trm.bounds[1] + start;
////	}
////
////	num = GetTraceClipModels( traceBounds, -1, passEntity, clipModelList );
////
////	for ( i = 0; i < num; i++ ) {
////		touch = clipModelList[i];
////
////		if ( !touch ) {
////			continue;
////		}
////
////		// no contents test with render models
////		if ( touch.renderModelHandle != -1 ) {
////			continue;
////		}
////
////		// if the entity does not have any contents we are looking for
////		if ( ( touch.contents & contentMask ) == 0 ) {
////			continue;
////		}
////
////		// if the entity has no new contents flags
////		if ( ( touch.contents & contents ) == touch.contents ) {
////			continue;
////		}
////
////		idClip::this.numContents++;
////		if ( collisionModelManager.Contents( start, trm, trmAxis, contentMask, touch.Handle(), touch.origin, touch.axis ) ) {
////			contents |= ( touch.contents & contentMask );
////		}
////	}
////
////	return contents;
////}
////
/////*
////============
////idClip::TranslationModel
////============
////*/
////void idClip::TranslationModel( trace_t &results, start:idVec3, end:idVec3,
////					const idClipModel *mdl, const idMat3 &trmAxis, int contentMask,
////					cmHandle_t model, const idVec3 &modelOrigin, const idMat3 &modelAxis ) {
////	const idTraceModel *trm = TraceModelForClipModel( mdl );
////	idClip::this.numTranslations++;
////	collisionModelManager.Translation( &results, start, end, trm, trmAxis, contentMask, model, modelOrigin, modelAxis );
////}
////
/////*
////============
////idClip::RotationModel
////============
////*/
////void idClip::RotationModel( trace_t &results, start:idVec3, const idRotation &rotation,
////					const idClipModel *mdl, const idMat3 &trmAxis, int contentMask,
////					cmHandle_t model, const idVec3 &modelOrigin, const idMat3 &modelAxis ) {
////	const idTraceModel *trm = TraceModelForClipModel( mdl );
////	idClip::this.numRotations++;
////	collisionModelManager.Rotation( &results, start, rotation, trm, trmAxis, contentMask, model, modelOrigin, modelAxis );
////}
////
/////*
////============
////idClip::ContactsModel
////============
////*/
////int idClip::ContactsModel( contactInfo_t *contacts, const int maxContacts, start:idVec3, const idVec6 &dir, const float depth,
////					const idClipModel *mdl, const idMat3 &trmAxis, int contentMask,
////					cmHandle_t model, const idVec3 &modelOrigin, const idMat3 &modelAxis ) {
////	const idTraceModel *trm = TraceModelForClipModel( mdl );
////	idClip::this.numContacts++;
////	return collisionModelManager.Contacts( contacts, maxContacts, start, dir, depth, trm, trmAxis, contentMask, model, modelOrigin, modelAxis );
////}
////
/////*
////============
////idClip::ContentsModel
////============
////*/
////int idClip::ContentsModel( start:idVec3,
////					const idClipModel *mdl, const idMat3 &trmAxis, int contentMask,
////					cmHandle_t model, const idVec3 &modelOrigin, const idMat3 &modelAxis ) {
////	const idTraceModel *trm = TraceModelForClipModel( mdl );
////	idClip::this.numContents++;
////	return collisionModelManager.Contents( start, trm, trmAxis, contentMask, model, modelOrigin, modelAxis );
////}
////
/////*
////============
////idClip::GetModelContactFeature
////============
////*/
////bool idClip::GetModelContactFeature( const contactInfo_t &contact, const idClipModel *clipModel, idFixedWinding &winding ) const {
////	var/*int*/i:number;
////	cmHandle_t handle;
////	idVec3 start, end;
////
////	handle = -1;
////	winding.Clear();
////
////	if ( clipModel == NULL ) {
////		handle = 0;
////	} else {
////		if ( clipModel.renderModelHandle != -1 ) {
////			winding += contact.point;
////			return true;
////		} else if ( clipModel.traceModelIndex != -1 ) {
////			handle = collisionModelManager.SetupTrmModel( *idClipModel::GetCachedTraceModel( clipModel.traceModelIndex ), clipModel.material );
////		} else {
////			handle = clipModel.collisionModelHandle;
////		}
////	}
////
////	// if contact with a collision model
////	if ( handle != -1 ) {
////		switch( contact.type ) {
////			case CONTACT_EDGE: {
////				// the model contact feature is a collision model edge
////				collisionModelManager.GetModelEdge( handle, contact.modelFeature, start, end );
////				winding += start;
////				winding += end;
////				break;
////			}
////			case CONTACT_MODELVERTEX: {
////				// the model contact feature is a collision model vertex
////				collisionModelManager.GetModelVertex( handle, contact.modelFeature, start );
////				winding += start;
////				break;
////			}
////			case CONTACT_TRMVERTEX: {
////				// the model contact feature is a collision model polygon
////				collisionModelManager.GetModelPolygon( handle, contact.modelFeature, winding );
////				break;
////			}
////		}
////	}
////
////	// transform the winding to world space
////	if ( clipModel ) {
////		for ( i = 0; i < winding.GetNumPoints(); i++ ) {
////			winding[i].ToVec3() *= clipModel.axis;
////			winding[i].ToVec3() += clipModel.origin;
////		}
////	}
////
////	return true;
////}
////
/////*
////============
////idClip::PrintStatistics
////============
////*/
////void idClip::PrintStatistics( ) {
////	gameLocal.Printf( "t = %-3d, r = %-3d, m = %-3d, render = %-3d, contents = %-3d, contacts = %-3d\n",
////					this.numTranslations, this.numRotations, this.numMotions, this.numRenderModelTraces, this.numContents, this.numContacts );
////	this.numRotations = this.numTranslations = this.numMotions = this.numRenderModelTraces = this.numContents = this.numContacts = 0;
////}
////
/////*
////============
////idClip::DrawClipModels
////============
////*/
////void idClip::DrawClipModels( const idVec3 &eye, const float radius, passEntity:idEntity ) {
////	int				i, num;
////	idBounds		bounds;
////	idClipModel		*clipModelList[MAX_GENTITIES];
////	idClipModel		*clipModel;
////
////	bounds = idBounds( eye ).Expand( radius );
////
////	num = idClip::ClipModelsTouchingBounds( bounds, -1, clipModelList, MAX_GENTITIES );
////
////	for ( i = 0; i < num; i++ ) {
////		clipModel = clipModelList[i];
////		if ( clipModel.GetEntity() == passEntity ) {
////			continue;
////		}
////		if ( clipModel.renderModelHandle != -1 ) {
////			gameRenderWorld.DebugBounds( colorCyan, clipModel.GetAbsBounds() );
////		} else {
////			collisionModelManager.DrawModel( clipModel.Handle(), clipModel.GetOrigin(), clipModel.GetAxis(), eye, radius );
////		}
////	}
////}
////
/////*
////============
////idClip::DrawModelContactFeature
////============
////*/
////bool idClip::DrawModelContactFeature( const contactInfo_t &contact, const idClipModel *clipModel, int lifetime ) const {
////	var/*int*/i:number;
////	idMat3 axis;
////	idFixedWinding winding;
////
////	if ( !GetModelContactFeature( contact, clipModel, winding ) ) {
////		return false;
////	}
////
////	axis = contact.normal.ToMat3();
////
////	if ( winding.GetNumPoints() == 1 ) {
////		gameRenderWorld.DebugLine( colorCyan, winding[0].ToVec3(), winding[0].ToVec3() + 2.0f * axis[0], lifetime );
////		gameRenderWorld.DebugLine( colorWhite, winding[0].ToVec3() - 1.0f * axis[1], winding[0].ToVec3() + 1.0f * axis[1], lifetime );
////		gameRenderWorld.DebugLine( colorWhite, winding[0].ToVec3() - 1.0f * axis[2], winding[0].ToVec3() + 1.0f * axis[2], lifetime );
////	} else {
////		for ( i = 0; i < winding.GetNumPoints(); i++ ) {
////			gameRenderWorld.DebugLine( colorCyan, winding[i].ToVec3(), winding[(i+1)%winding.GetNumPoints()].ToVec3(), lifetime );
////		}
////	}
////
////	axis[0] = -axis[0];
////	axis[2] = -axis[2];
////	gameRenderWorld.DrawText( contact.material.GetName(), winding.GetCenter() - 4.0f * axis[2], 0.1f, colorWhite, axis, 1, 5000 );
////
////	return true;
////}
}