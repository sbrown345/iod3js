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


var defaultState = new staticPState_t;

////
////#ifndef __PHYSICS_STATICMULTI_H__
////#define __PHYSICS_STATICMULTI_H__

/*
===============================================================================

Physics for a non moving object using no or multiple collision models.

===============================================================================
*/

class idPhysics_StaticMulti extends idPhysics {
////
////public:
////	CLASS_PROTOTYPE(idPhysics_StaticMulti);
	static	Type:idTypeInfo;						
	static	CreateInstance( ): idClass {throw "placeholder";}
	GetType( ):idTypeInfo {throw "placeholder";}
	static	eventCallbacks : idEventFunc<idPhysics>[];
////
////	idPhysics_StaticMulti(void);
////	~idPhysics_StaticMulti(void);
////
////	void					Save(idSaveGame *savefile) const;
////	void					Restore(idRestoreGame *savefile);
////
////	void					RemoveIndex(/*int*/ id:number = 0, bool freeClipModel = true);
////
////public:	// common physics interface
////
////	void					SetSelf(idEntity *e);
////
////	void					SetClipModel(idClipModel *model, float density, /*int*/ id:number = 0, bool freeOld = true);
////	idClipModel *			GetClipModel(/*int*/ id:number = 0) const;
////	int						GetNumClipModels(void) const;
////
////	void					SetMass(float mass, /*int*/ id:number = -1);
////	float					GetMass(/*int*/ id:number = -1) const;
////
////	void					SetContents(int contents, /*int*/ id:number = -1);
////	int						GetContents(/*int*/ id:number = -1) const;
////
////	void					SetClipMask(int mask, /*int*/ id:number = -1);
////	int						GetClipMask(/*int*/ id:number = -1) const;
////
////	const idBounds &		GetBounds(/*int*/ id:number = -1) const;
////	const idBounds &		GetAbsBounds(/*int*/ id:number = -1) const;
////
////	bool					Evaluate(int timeStepMSec, int endTimeMSec);
////	void					UpdateTime(int endTimeMSec);
////	int						GetTime(void) const;
////
////	void					GetImpactInfo(/*int*/ id:number, const idVec3 &point, impactInfo_t *info) const;
////	void					ApplyImpulse(/*int*/ id:number, const idVec3 &point, const idVec3 &impulse);
////	void					AddForce(/*int*/ id:number, const idVec3 &point, const idVec3 &force);
////	void					Activate(void);
////	void					PutToRest(void);
////	bool					IsAtRest(void) const;
////	int						GetRestStartTime(void) const;
////	bool					IsPushable(void) const;
////
////	void					SaveState(void);
////	void					RestoreState(void);
////
////	void					SetOrigin(const idVec3 &newOrigin, /*int*/ id:number = -1);
////	void					SetAxis(const idMat3 &newAxis, /*int*/ id:number = -1);
////
////	void					Translate(const idVec3 &translation, /*int*/ id:number = -1);
////	void					Rotate(const idRotation &rotation, /*int*/ id:number = -1);
////
////	const idVec3 &			GetOrigin(/*int*/ id:number = 0) const;
////	const idMat3 &			GetAxis(/*int*/ id:number = 0) const;
////
////	void					SetLinearVelocity(const idVec3 &newLinearVelocity, /*int*/ id:number = 0);
////	void					SetAngularVelocity(const idVec3 &newAngularVelocity, /*int*/ id:number = 0);
////
////	const idVec3 &			GetLinearVelocity(/*int*/ id:number = 0) const;
////	const idVec3 &			GetAngularVelocity(/*int*/ id:number = 0) const;
////
////	void					SetGravity(const idVec3 &newGravity);
////	const idVec3 &			GetGravity(void) const;
////	const idVec3 &			GetGravityNormal(void) const;
////
////	void					ClipTranslation(trace_t &results, const idVec3 &translation, const idClipModel *model) const;
////	void					ClipRotation(trace_t &results, const idRotation &rotation, const idClipModel *model) const;
////	int						ClipContents(const idClipModel *model) const;
////
////	void					DisableClip(void);
////	void					EnableClip(void);
////
////	void					UnlinkClip(void);
////	void					LinkClip(void);
////
////	bool					EvaluateContacts(void);
////	int						GetNumContacts(void) const;
////	const contactInfo_t &	GetContact(int num) const;
////	void					ClearContacts(void);
////	void					AddContactEntity(idEntity *e);
////	void					RemoveContactEntity(idEntity *e);
////
////	bool					HasGroundContacts(void) const;
////	bool					IsGroundEntity(int entityNum) const;
////	bool					IsGroundClipModel(int entityNum, /*int*/ id:number) const;
////
////	void					SetPushed(int deltaTime);
////	const idVec3 &			GetPushedLinearVelocity(/*int*/ id:number = 0) const;
////	const idVec3 &			GetPushedAngularVelocity(/*int*/ id:number = 0) const;
////
////	void					SetMaster(idEntity *master, const bool orientated = true);
////
////	const trace_t *			GetBlockingInfo(void) const;
////	idEntity *				GetBlockingEntity(void) const;
////
////	int						GetLinearEndTime(void) const;
////	int						GetAngularEndTime(void) const;
////
////	void					WriteToSnapshot(idBitMsgDelta &msg) const;
////	void					ReadFromSnapshot(const idBitMsgDelta &msg);
////
////protected:
	self: idEntity;					// entity using this physics object
	current = new idList<staticPState_t>(staticPState_t);	// physics state
	clipModels = new idList<idClipModel>(idClipModel, true); // collision model

	// master
	hasMaster: boolean;
	isOrientated:boolean;
////};
////
////#endif /* !__PHYSICS_STATICMULTI_H__ */
////

/*
================
idPhysics_StaticMulti::idPhysics_StaticMulti
================
*/
	constructor() {
		super ( );
		this.self = null;
		this.hasMaster = false;
		this.isOrientated = false;

		defaultState.origin.Zero ( );
		defaultState.axis.Identity ( );
		defaultState.localOrigin.Zero ( );
		defaultState.localAxis.Identity ( );

		this.current.SetNum( 1 );
		this.current[0] = defaultState;
		this.clipModels.SetNum( 1 );
		this.clipModels[0] = null;
	}

/////*
////================
////idPhysics_StaticMulti::~idPhysics_StaticMulti
////================
////*/
////idPhysics_StaticMulti::~idPhysics_StaticMulti( ) {
////	if ( self && self.GetPhysics() == this ) {
////		self.SetPhysics( NULL );
////	}
////	idForce::DeletePhysics( this );
////	for ( int i = 0; i < this.clipModels.Num(); i++ ) {
////		delete this.clipModels[i];
////	}
////}
////
/////*
////================
////idPhysics_StaticMulti::Save
////================
////*/
////void idPhysics_StaticMulti::Save( idSaveGame *savefile ) const {
////	var/*int*/i:number;
////
////	savefile.WriteObject( self );
////
////	savefile.WriteInt(this.current.Num());
////	for  ( i = 0; i < this.current.Num(); i++ ) {
////		savefile.WriteVec3( this.current[i].origin );
////		savefile.WriteMat3( this.current[i].axis );
////		savefile.WriteVec3( this.current[i].localOrigin );
////		savefile.WriteMat3( this.current[i].localAxis );
////	}
////
////	savefile.WriteInt( this.clipModels.Num() );
////	for ( i = 0; i < this.clipModels.Num(); i++ ) {
////		savefile.WriteClipModel( this.clipModels[i] );
////	}
////
////	savefile.WriteBool(hasMaster);
////	savefile.WriteBool(isOrientated);
////}
////
/////*
////================
////idPhysics_StaticMulti::Restore
////================
////*/
////void idPhysics_StaticMulti::Restore( idRestoreGame *savefile ) {
////	int i, num;
////
////	savefile.ReadObject( reinterpret_cast<idClass *&>( self ) );
////
////	savefile.ReadInt(num);
////	this.current.AssureSize( num );
////	for ( i = 0; i < num; i++ ) {
////		savefile.ReadVec3( this.current[i].origin );
////		savefile.ReadMat3( this.current[i].axis );
////		savefile.ReadVec3( this.current[i].localOrigin );
////		savefile.ReadMat3( this.current[i].localAxis );
////	}
////
////	savefile.ReadInt(num);
////	this.clipModels.SetNum( num );
////	for ( i = 0; i < num; i++ ) {
////		savefile.ReadClipModel( this.clipModels[i] );
////	}
////
////	savefile.ReadBool(hasMaster);
////	savefile.ReadBool(isOrientated);
////}
////
/////*
////================
////idPhysics_StaticMulti::SetSelf
////================
////*/
////void idPhysics_StaticMulti::SetSelf( idEntity *e ) {
////	assert( e );
////	self = e;
////}
////
/////*
////================
////idPhysics_StaticMulti::RemoveIndex
////================
////*/
////void idPhysics_StaticMulti::RemoveIndex( /*int*/ id:number, bool freeClipModel ) {
////	if ( id < 0 || id >= this.clipModels.Num() ) {
////		return;
////	}
////	if ( this.clipModels[id] && freeClipModel ) {
////		delete this.clipModels[id];
////		this.clipModels[id] = NULL;
////	}
////	this.clipModels.RemoveIndex( id );
////	this.current.RemoveIndex( id );
////}
////
/////*
////================
////idPhysics_StaticMulti::SetClipModel
////================
////*/
////void idPhysics_StaticMulti::SetClipModel( idClipModel *model, float density, /*int*/ id:number, bool freeOld ) {
////	var/*int*/i:number;
////
////	assert( self );
////
////	if ( id >= this.clipModels.Num() ) {
////		this.current.AssureSize( id+1, defaultState );
////		this.clipModels.AssureSize( id+1, NULL );
////	}
////
////	if ( this.clipModels[id] && this.clipModels[id] != model && freeOld ) {
////		delete this.clipModels[id];
////	}
////	this.clipModels[id] = model;
////	if ( this.clipModels[id] ) {
////		this.clipModels[id].Link( gameLocal.clip, self, id, this.current[id].origin, this.current[id].axis );
////	}
////
////	for ( i = this.clipModels.Num() - 1; i >= 1; i-- ) {
////		if ( this.clipModels[i] ) {
////			break;
////		}
////	}
////	this.current.SetNum( i+1, false );
////	this.clipModels.SetNum( i+1, false );
////}
////
/////*
////================
////idPhysics_StaticMulti::GetClipModel
////================
////*/
////idClipModel *idPhysics_StaticMulti::GetClipModel( /*int*/ id:number ) const {
////	if ( id >= 0 && id < this.clipModels.Num() && this.clipModels[id] ) {
////		return this.clipModels[id];
////	}
////	return gameLocal.clip.DefaultClipModel();
////}

/*
================
idPhysics_StaticMulti::GetNumClipModels
================
*/
	GetNumClipModels ( ): number {
		return this.clipModels.Num ( );
	}

/////*
////================
////idPhysics_StaticMulti::SetMass
////================
////*/
////void idPhysics_StaticMulti::SetMass( float mass, /*int*/ id:number ) {
////}
////
/////*
////================
////idPhysics_StaticMulti::GetMass
////================
////*/
////float idPhysics_StaticMulti::GetMass( /*int*/ id:number ) const {
////	return 0.0f;
////}
////
/*
================
idPhysics_StaticMulti::SetContents
================
*/
	SetContents( /*int*/ contents: number, /*int*/ id: number = -1 ) :void{
	var/*int*/i:number;

	if ( id >= 0 && id < this.clipModels.Num() ) {
		if ( this.clipModels[id] ) {
			this.clipModels[id].SetContents( contents );
		}
	} else if ( id == -1 ) {
		for ( i = 0; i < this.clipModels.Num(); i++ ) {
			if ( this.clipModels[i] ) {
				this.clipModels[i].SetContents( contents );
			}
		}
	}
}

/////*
////================
////idPhysics_StaticMulti::GetContents
////================
////*/
////int idPhysics_StaticMulti::GetContents( /*int*/ id:number ) const {
////	int i, contents = 0;
////
////	if ( id >= 0 && id < this.clipModels.Num() ) {
////		if ( this.clipModels[id] ) {
////			contents = this.clipModels[id].GetContents();
////		}
////	} else if ( id == -1 ) {
////		for ( i = 0; i < this.clipModels.Num(); i++ ) {
////			if ( this.clipModels[i] ) {
////				contents |= this.clipModels[i].GetContents();
////			}
////		}
////	}
////	return contents;
////}
////
/////*
////================
////idPhysics_StaticMulti::SetClipMask
////================
////*/
////void idPhysics_StaticMulti::SetClipMask( int mask, /*int*/ id:number ) {
////}
////
/////*
////================
////idPhysics_StaticMulti::GetClipMask
////================
////*/
////int idPhysics_StaticMulti::GetClipMask( /*int*/ id:number ) const {
////	return 0;
////}

/*
================
idPhysics_StaticMulti::GetBounds
================
*/
const idBounds &idPhysics_StaticMulti::GetBounds( /*int*/ id:number ) const {
	var/*int*/i:number;
	static idBounds bounds;

	if ( id >= 0 && id < this.clipModels.Num() ) {
		if ( this.clipModels[id] ) {
			return this.clipModels[id].GetBounds();
		}
	}
	if ( id == -1 ) {
		bounds.Clear();
		for ( i = 0; i < this.clipModels.Num(); i++ ) {
			if ( this.clipModels[i] ) {
				bounds.AddBounds( this.clipModels[i].GetAbsBounds() );
			}
		}
		for ( i = 0; i < this.clipModels.Num(); i++ ) {
			if ( this.clipModels[i] ) {
				bounds[0] -= this.clipModels[i].GetOrigin();
				bounds[1] -= this.clipModels[i].GetOrigin();
				break;
			}
		}
		return bounds;
	}
	return bounds_zero;
}

/////*
////================
////idPhysics_StaticMulti::GetAbsBounds
////================
////*/
////const idBounds &idPhysics_StaticMulti::GetAbsBounds( /*int*/ id:number ) const {
////	var/*int*/i:number;
////	static idBounds absBounds;
////
////	if ( id >= 0 && id < this.clipModels.Num() ) {
////		if ( this.clipModels[id] ) {
////			return this.clipModels[id].GetAbsBounds();
////		}
////	}
////	if ( id == -1 ) {
////		absBounds.Clear();
////		for ( i = 0; i < this.clipModels.Num(); i++ ) {
////			if ( this.clipModels[i] ) {
////				absBounds.AddBounds( this.clipModels[i].GetAbsBounds() );
////			}
////		}
////		return absBounds;
////	}
////	return bounds_zero;
////}
////
/////*
////================
////idPhysics_StaticMulti::Evaluate
////================
////*/
////bool idPhysics_StaticMulti::Evaluate( int timeStepMSec, int endTimeMSec ) {
////	var/*int*/i:number;
////	idVec3 masterOrigin;
////	idMat3 masterAxis;
////
////	if ( hasMaster ) {
////		self.GetMasterPosition( masterOrigin, masterAxis );
////		for ( i = 0; i < this.clipModels.Num(); i++ ) {
////			this.current[i].origin = masterOrigin + this.current[i].localOrigin * masterAxis;
////			if ( isOrientated ) {
////				this.current[i].axis = this.current[i].localAxis * masterAxis;
////			} else {
////				this.current[i].axis = this.current[i].localAxis;
////			}
////			if ( this.clipModels[i] ) {
////				this.clipModels[i].Link( gameLocal.clip, self, i, this.current[i].origin, this.current[i].axis );
////			}
////		}
////
////		// FIXME: return false if master did not move
////		return true;
////	}
////	return false;
////}
////
/////*
////================
////idPhysics_StaticMulti::UpdateTime
////================
////*/
////void idPhysics_StaticMulti::UpdateTime( int endTimeMSec ) {
////}
////
/////*
////================
////idPhysics_StaticMulti::GetTime
////================
////*/
////int idPhysics_StaticMulti::GetTime( ) const {
////	return 0;
////}
////
/////*
////================
////idPhysics_StaticMulti::GetImpactInfo
////================
////*/
////void idPhysics_StaticMulti::GetImpactInfo( /*int*/ id:number, const idVec3 &point, impactInfo_t *info ) const {
////	memset( info, 0, sizeof( *info ) );
////}
////
/////*
////================
////idPhysics_StaticMulti::ApplyImpulse
////================
////*/
////void idPhysics_StaticMulti::ApplyImpulse( /*int*/ id:number, const idVec3 &point, const idVec3 &impulse ) {
////}
////
/////*
////================
////idPhysics_StaticMulti::AddForce
////================
////*/
////void idPhysics_StaticMulti::AddForce( /*int*/ id:number, const idVec3 &point, const idVec3 &force ) {
////}
////
/*
================
idPhysics_StaticMulti::Activate
================
*/
	Activate(): void {
	}

/*
================
idPhysics_StaticMulti::PutToRest
================
*/
	PutToRest(): void {
	}

/////*
////================
////idPhysics_StaticMulti::IsAtRest
////================
////*/
////bool idPhysics_StaticMulti::IsAtRest( ) const {
////	return true;
////}
////
/////*
////================
////idPhysics_StaticMulti::GetRestStartTime
////================
////*/
////int idPhysics_StaticMulti::GetRestStartTime( ) const {
////	return 0;
////}
////
/////*
////================
////idPhysics_StaticMulti::IsPushable
////================
////*/
////bool idPhysics_StaticMulti::IsPushable( ) const {
////	return false;
////}
////
/////*
////================
////idPhysics_StaticMulti::SaveState
////================
////*/
////void idPhysics_StaticMulti::SaveState( ) {
////}
////
/////*
////================
////idPhysics_StaticMulti::RestoreState
////================
////*/
////void idPhysics_StaticMulti::RestoreState( ) {
////}
////
/////*
////================
////idPhysics_StaticMulti::SetOrigin
////================
////*/
////void idPhysics_StaticMulti::SetOrigin( const idVec3 &newOrigin, /*int*/ id:number ) {
////	idVec3 masterOrigin;
////	idMat3 masterAxis;
////
////	if ( id >= 0 && id < this.clipModels.Num() ) {
////		this.current[id].localOrigin = newOrigin;
////		if ( hasMaster ) {
////			self.GetMasterPosition( masterOrigin, masterAxis );
////			this.current[id].origin = masterOrigin + newOrigin * masterAxis;
////		} else {
////			this.current[id].origin = newOrigin;
////		}
////		if ( this.clipModels[id] ) {
////			this.clipModels[id].Link( gameLocal.clip, self, id, this.current[id].origin, this.current[id].axis );
////		}
////	} else if ( id == -1 ) {
////		if ( hasMaster ) {
////			self.GetMasterPosition( masterOrigin, masterAxis );
////			Translate( masterOrigin + masterAxis * newOrigin - this.current[0].origin );
////		} else {
////			Translate( newOrigin - this.current[0].origin );
////		}
////	}
////}
////
/////*
////================
////idPhysics_StaticMulti::SetAxis
////================
////*/
////void idPhysics_StaticMulti::SetAxis( const idMat3 &newAxis, /*int*/ id:number ) {
////	idVec3 masterOrigin;
////	idMat3 masterAxis;
////
////	if ( id >= 0 && id < this.clipModels.Num() ) {
////		this.current[id].localAxis = newAxis;
////		if ( hasMaster && isOrientated ) {
////			self.GetMasterPosition( masterOrigin, masterAxis );
////			this.current[id].axis = newAxis * masterAxis;
////		} else {
////			this.current[id].axis = newAxis;
////		}
////		if ( this.clipModels[id] ) {
////			this.clipModels[id].Link( gameLocal.clip, self, id, this.current[id].origin, this.current[id].axis );
////		}
////	} else if ( id == -1 ) {
////		idMat3 axis;
////		idRotation rotation;
////
////		if ( hasMaster ) {
////			self.GetMasterPosition( masterOrigin, masterAxis );
////			axis = this.current[0].axis.Transpose() * ( newAxis * masterAxis );
////		} else {
////			axis = this.current[0].axis.Transpose() * newAxis;
////		}
////		rotation = axis.ToRotation();
////		rotation.SetOrigin( this.current[0].origin );
////
////		Rotate( rotation );
////	}
////}
////
/////*
////================
////idPhysics_StaticMulti::Translate
////================
////*/
////void idPhysics_StaticMulti::Translate( const idVec3 &translation, /*int*/ id:number ) {
////	var/*int*/i:number;
////
////	if ( id >= 0 && id < this.clipModels.Num() ) {
////		this.current[id].localOrigin += translation;
////		this.current[id].origin += translation;
////
////		if ( this.clipModels[id] ) {
////			this.clipModels[id].Link( gameLocal.clip, self, id, this.current[id].origin, this.current[id].axis );
////		}
////	} else if ( id == -1 ) {
////		for ( i = 0; i < this.clipModels.Num(); i++ ) {
////			this.current[i].localOrigin += translation;
////			this.current[i].origin += translation;
////
////			if ( this.clipModels[i] ) {
////				this.clipModels[i].Link( gameLocal.clip, self, i, this.current[i].origin, this.current[i].axis );
////			}
////		}
////	}
////}
////
/////*
////================
////idPhysics_StaticMulti::Rotate
////================
////*/
////void idPhysics_StaticMulti::Rotate( const idRotation &rotation, /*int*/ id:number ) {
////	var/*int*/i:number;
////	idVec3 masterOrigin;
////	idMat3 masterAxis;
////
////	if ( id >= 0 && id < this.clipModels.Num() ) {
////		this.current[id].origin *= rotation;
////		this.current[id].axis *= rotation.ToMat3();
////
////		if ( hasMaster ) {
////			self.GetMasterPosition( masterOrigin, masterAxis );
////			this.current[id].localAxis *= rotation.ToMat3();
////			this.current[id].localOrigin = ( this.current[id].origin - masterOrigin ) * masterAxis.Transpose();
////		} else {
////			this.current[id].localAxis = this.current[id].axis;
////			this.current[id].localOrigin = this.current[id].origin;
////		}
////
////		if ( this.clipModels[id] ) {
////			this.clipModels[id].Link( gameLocal.clip, self, id, this.current[id].origin, this.current[id].axis );
////		}
////	} else if ( id == -1 ) {
////		for ( i = 0; i < this.clipModels.Num(); i++ ) {
////			this.current[i].origin *= rotation;
////			this.current[i].axis *= rotation.ToMat3();
////
////			if ( hasMaster ) {
////				self.GetMasterPosition( masterOrigin, masterAxis );
////				this.current[i].localAxis *= rotation.ToMat3();
////				this.current[i].localOrigin = ( this.current[i].origin - masterOrigin ) * masterAxis.Transpose();
////			} else {
////				this.current[i].localAxis = this.current[i].axis;
////				this.current[i].localOrigin = this.current[i].origin;
////			}
////
////			if ( this.clipModels[i] ) {
////				this.clipModels[i].Link( gameLocal.clip, self, i, this.current[i].origin, this.current[i].axis );
////			}
////		}
////	}
////}

/*
================
idPhysics_StaticMulti::GetOrigin
================
*/
GetOrigin( /*int*/ id:number = 0) :idVec3 {
	if ( id >= 0 && id < this.clipModels.Num() ) {
		return this.current[id].origin;
	}
	if ( this.clipModels.Num() ) {
		return this.current[0].origin;
	} else {
		return vec3_origin;
	}
}

/*
================
idPhysics_StaticMulti::GetAxis
================
*/
	GetAxis ( /*int*/ id: number = 0): idMat3 {
		if ( id >= 0 && id < this.clipModels.Num ( ) ) {
			return this.current[id].axis;
		}
		if ( this.clipModels.Num ( ) ) {
			return this.current[0].axis;
		} else {
			return mat3_identity;
		}
	}
////
/////*
////================
////idPhysics_StaticMulti::SetLinearVelocity
////================
////*/
////void idPhysics_StaticMulti::SetLinearVelocity( const idVec3 &newLinearVelocity, /*int*/ id:number ) {
////}
////
/////*
////================
////idPhysics_StaticMulti::SetAngularVelocity
////================
////*/
////void idPhysics_StaticMulti::SetAngularVelocity( const idVec3 &newAngularVelocity, /*int*/ id:number ) {
////}
////
/////*
////================
////idPhysics_StaticMulti::GetLinearVelocity
////================
////*/
////const idVec3 &idPhysics_StaticMulti::GetLinearVelocity( /*int*/ id:number ) const {
////	return vec3_origin;
////}
////
/////*
////================
////idPhysics_StaticMulti::GetAngularVelocity
////================
////*/
////const idVec3 &idPhysics_StaticMulti::GetAngularVelocity( /*int*/ id:number ) const {
////	return vec3_origin;
////}
////
/////*
////================
////idPhysics_StaticMulti::SetGravity
////================
////*/
////void idPhysics_StaticMulti::SetGravity( const idVec3 &newGravity ) {
////}
////
/////*
////================
////idPhysics_StaticMulti::GetGravity
////================
////*/
////const idVec3 &idPhysics_StaticMulti::GetGravity( ) const {
////	static idVec3 gravity( 0, 0, -g_gravity.GetFloat() );
////	return gravity;
////}
////
/////*
////================
////idPhysics_StaticMulti::GetGravityNormal
////================
////*/
////const idVec3 &idPhysics_StaticMulti::GetGravityNormal( ) const {
////	static idVec3 gravity( 0, 0, -1 );
////	return gravity;
////}
////
/////*
////================
////idPhysics_StaticMulti::ClipTranslation
////================
////*/
////void idPhysics_StaticMulti::ClipTranslation( trace_t &results, const idVec3 &translation, const idClipModel *model ) const {
////	memset( &results, 0, sizeof( trace_t ) );
////	gameLocal.Warning( "idPhysics_StaticMulti::ClipTranslation called" );
////}
////
/////*
////================
////idPhysics_StaticMulti::ClipRotation
////================
////*/
////void idPhysics_StaticMulti::ClipRotation( trace_t &results, const idRotation &rotation, const idClipModel *model ) const {
////	memset( &results, 0, sizeof( trace_t ) );
////	gameLocal.Warning( "idPhysics_StaticMulti::ClipRotation called" );
////}
////
/////*
////================
////idPhysics_StaticMulti::ClipContents
////================
////*/
////int idPhysics_StaticMulti::ClipContents( const idClipModel *model ) const {
////	int i, contents;
////
////	contents = 0;
////	for ( i = 0; i < this.clipModels.Num(); i++ ) {
////		if ( this.clipModels[i] ) {
////			if ( model ) {
////				contents |= gameLocal.clip.ContentsModel( this.clipModels[i].GetOrigin(), this.clipModels[i], this.clipModels[i].GetAxis(), -1,
////											model.Handle(), model.GetOrigin(), model.GetAxis() );
////			} else {
////				contents |= gameLocal.clip.Contents( this.clipModels[i].GetOrigin(), this.clipModels[i], this.clipModels[i].GetAxis(), -1, NULL );
////			}
////		}
////	}
////	return contents;
////}
////
/////*
////================
////idPhysics_StaticMulti::DisableClip
////================
////*/
////void idPhysics_StaticMulti::DisableClip( ) {
////	var/*int*/i:number;
////
////	for ( i = 0; i < this.clipModels.Num(); i++ ) {
////        if ( this.clipModels[i] ) {
////			this.clipModels[i].Disable();
////		}
////	}
////}
////
/////*
////================
////idPhysics_StaticMulti::EnableClip
////================
////*/
////void idPhysics_StaticMulti::EnableClip( ) {
////	var/*int*/i:number;
////
////	for ( i = 0; i < this.clipModels.Num(); i++ ) {
////		if ( this.clipModels[i] ) {
////			this.clipModels[i].Enable();
////		}
////	}
////}
////
/////*
////================
////idPhysics_StaticMulti::UnlinkClip
////================
////*/
////void idPhysics_StaticMulti::UnlinkClip( ) {
////	var/*int*/i:number;
////
////	for ( i = 0; i < this.clipModels.Num(); i++ ) {
////        if ( this.clipModels[i] ) {
////			this.clipModels[i].Unlink();
////		}
////	}
////}
////
/////*
////================
////idPhysics_StaticMulti::LinkClip
////================
////*/
////void idPhysics_StaticMulti::LinkClip( ) {
////	var/*int*/i:number;
////
////	for ( i = 0; i < this.clipModels.Num(); i++ ) {
////		if ( this.clipModels[i] ) {
////			this.clipModels[i].Link( gameLocal.clip, self, i, this.current[i].origin, this.current[i].axis );
////		}
////	}
////}
////
/////*
////================
////idPhysics_StaticMulti::EvaluateContacts
////================
////*/
////bool idPhysics_StaticMulti::EvaluateContacts( ) {
////	return false;
////}
////
/////*
////================
////idPhysics_StaticMulti::GetNumContacts
////================
////*/
////int idPhysics_StaticMulti::GetNumContacts( ) const {
////	return 0;
////}
////
/////*
////================
////idPhysics_StaticMulti::GetContact
////================
////*/
////const contactInfo_t &idPhysics_StaticMulti::GetContact( int num ) const {
////	static contactInfo_t info;
////	memset( &info, 0, sizeof( info ) );
////	return info;
////}
////
/*
================
idPhysics_StaticMulti::ClearContacts
================
*/
	ClearContacts(): void {
	}
////
/////*
////================
////idPhysics_StaticMulti::AddContactEntity
////================
////*/
////void idPhysics_StaticMulti::AddContactEntity( idEntity *e ) {
////}
////
/////*
////================
////idPhysics_StaticMulti::RemoveContactEntity
////================
////*/
////void idPhysics_StaticMulti::RemoveContactEntity( idEntity *e ) {
////}
////
/////*
////================
////idPhysics_StaticMulti::HasGroundContacts
////================
////*/
////bool idPhysics_StaticMulti::HasGroundContacts( ) const {
////	return false;
////}
////
/////*
////================
////idPhysics_StaticMulti::IsGroundEntity
////================
////*/
////bool idPhysics_StaticMulti::IsGroundEntity( int entityNum ) const {
////	return false;
////}
////
/////*
////================
////idPhysics_StaticMulti::IsGroundClipModel
////================
////*/
////bool idPhysics_StaticMulti::IsGroundClipModel( int entityNum, /*int*/ id:number ) const {
////	return false;
////}
////
/////*
////================
////idPhysics_StaticMulti::SetPushed
////================
////*/
////void idPhysics_StaticMulti::SetPushed( int deltaTime ) {
////}
////
/////*
////================
////idPhysics_StaticMulti::GetPushedLinearVelocity
////================
////*/
////const idVec3 &idPhysics_StaticMulti::GetPushedLinearVelocity( /*int*/ id:number ) const {
////	return vec3_origin;
////}
////
/////*
////================
////idPhysics_StaticMulti::GetPushedAngularVelocity
////================
////*/
////const idVec3 &idPhysics_StaticMulti::GetPushedAngularVelocity( /*int*/ id:number ) const {
////	return vec3_origin;
////}
////
/////*
////================
////idPhysics_StaticMulti::SetMaster
////================
////*/
////void idPhysics_StaticMulti::SetMaster( idEntity *master, const bool orientated ) {
////	var/*int*/i:number;
////	idVec3 masterOrigin;
////	idMat3 masterAxis;
////
////	if ( master ) {
////		if ( !hasMaster ) {
////			// transform from world space to master space
////			self.GetMasterPosition( masterOrigin, masterAxis );
////			for ( i = 0; i < this.clipModels.Num(); i++ ) {
////                this.current[i].localOrigin = ( this.current[i].origin - masterOrigin ) * masterAxis.Transpose();
////				if ( orientated ) {
////					this.current[i].localAxis = this.current[i].axis * masterAxis.Transpose();
////				} else {
////					this.current[i].localAxis = this.current[i].axis;
////				}
////			}
////			hasMaster = true;
////			isOrientated = orientated;
////		}
////	} else {
////		if ( hasMaster ) {
////			hasMaster = false;
////		}
////	}
////}
////
/////*
////================
////idPhysics_StaticMulti::GetBlockingInfo
////================
////*/
////const trace_t *idPhysics_StaticMulti::GetBlockingInfo( ) const {
////	return NULL;
////}
////
/////*
////================
////idPhysics_StaticMulti::GetBlockingEntity
////================
////*/
////idEntity *idPhysics_StaticMulti::GetBlockingEntity( ) const {
////	return NULL;
////}
////
/////*
////================
////idPhysics_StaticMulti::GetLinearEndTime
////================
////*/
////int idPhysics_StaticMulti::GetLinearEndTime( ) const {
////	return 0;
////}
////
/////*
////================
////idPhysics_StaticMulti::GetAngularEndTime
////================
////*/
////int idPhysics_StaticMulti::GetAngularEndTime( ) const {
////	return 0;
////}
////
/////*
////================
////idPhysics_StaticMulti::WriteToSnapshot
////================
////*/
////void idPhysics_StaticMulti::WriteToSnapshot( idBitMsgDelta &msg ) const {
////	var/*int*/i:number;
////	idCQuat quat, localQuat;
////
////	msg.WriteByte( this.current.Num() );
////
////	for ( i = 0; i < this.current.Num(); i++ ) {
////		quat = this.current[i].axis.ToCQuat();
////		localQuat = this.current[i].localAxis.ToCQuat();
////
////		msg.WriteFloat( this.current[i].origin[0] );
////		msg.WriteFloat( this.current[i].origin[1] );
////		msg.WriteFloat( this.current[i].origin[2] );
////		msg.WriteFloat( quat.x );
////		msg.WriteFloat( quat.y );
////		msg.WriteFloat( quat.z );
////		msg.WriteDeltaFloat( this.current[i].origin[0], this.current[i].localOrigin[0] );
////		msg.WriteDeltaFloat( this.current[i].origin[1], this.current[i].localOrigin[1] );
////		msg.WriteDeltaFloat( this.current[i].origin[2], this.current[i].localOrigin[2] );
////		msg.WriteDeltaFloat( quat.x, localQuat.x );
////		msg.WriteDeltaFloat( quat.y, localQuat.y );
////		msg.WriteDeltaFloat( quat.z, localQuat.z );
////	}
////}
////
/////*
////================
////idPhysics_StaticMulti::ReadFromSnapshot
////================
////*/
////void idPhysics_StaticMulti::ReadFromSnapshot( const idBitMsgDelta &msg ) {
////	int i, num;
////	idCQuat quat, localQuat;
////
////	num = msg.ReadByte();
////	assert( num == this.current.Num() );
////
////	for ( i = 0; i < this.current.Num(); i++ ) {
////		this.current[i].origin[0] = msg.ReadFloat();
////		this.current[i].origin[1] = msg.ReadFloat();
////		this.current[i].origin[2] = msg.ReadFloat();
////		quat.x = msg.ReadFloat();
////		quat.y = msg.ReadFloat();
////		quat.z = msg.ReadFloat();
////		this.current[i].localOrigin[0] = msg.ReadDeltaFloat( this.current[i].origin[0] );
////		this.current[i].localOrigin[1] = msg.ReadDeltaFloat( this.current[i].origin[1] );
////		this.current[i].localOrigin[2] = msg.ReadDeltaFloat( this.current[i].origin[2] );
////		localQuat.x = msg.ReadDeltaFloat( quat.x );
////		localQuat.y = msg.ReadDeltaFloat( quat.y );
////		localQuat.z = msg.ReadDeltaFloat( quat.z );
////
////		this.current[i].axis = quat.ToMat3();
////		this.current[i].localAxis = localQuat.ToMat3();
////	}
////}

}

//CLASS_DECLARATION( idPhysics, idPhysics_StaticMulti )
idPhysics_StaticMulti.CreateInstance = function() : idClass{
	try {
		var ptr = new idPhysics_StaticMulti;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idPhysics_StaticMulti.prototype.GetType = function ( ): idTypeInfo {
	return ( idPhysics_StaticMulti.Type );
};

idPhysics_StaticMulti.eventCallbacks = [
];

idPhysics_StaticMulti.Type = new idTypeInfo( "idPhysics_StaticMulti", "idPhysics",
	idPhysics_StaticMulti.eventCallbacks, idPhysics_StaticMulti.CreateInstance, idPhysics_StaticMulti.prototype.Spawn,
	idPhysics_StaticMulti.prototype.Save, idPhysics_StaticMulti.prototype.Restore );

//END_CLASS