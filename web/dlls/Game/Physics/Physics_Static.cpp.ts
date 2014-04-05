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
////
////
////#ifndef __PHYSICS_STATIC_H__
////#define __PHYSICS_STATIC_H__

/*
===============================================================================

Physics for a non moving object using at most one collision model.

===============================================================================
*/

class staticPState_t {
	origin = new idVec3;
	axis = new idMat3;
	localOrigin = new idVec3;
	localAxis = new idMat3;
}

class idPhysics_Static extends idPhysics {
	////
	////public:
	////	CLASS_PROTOTYPE(idPhysics_Static);
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idPhysics_Static>[];
	////
	////	idPhysics_Static(void);
	////	~idPhysics_Static(void);
	////
	////	void					Save(idSaveGame *savefile) const;
	////	void					Restore(idRestoreGame *savefile);
	////
	////public:	// common physics interface
	////	void					SetSelf(idEntity *e);
	////
	////	void					SetClipModel(model:idClipModel, float density, /*int*/ id:number = 0, bool freeOld = true);
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
	////	void					GetImpactInfo(const /*int*/ id:number, const idVec3 &point, impactInfo_t *info) const;
	////	void					ApplyImpulse(const /*int*/ id:number, const idVec3 &point, const idVec3 &impulse);
	////	void					AddForce(const /*int*/ id:number, const idVec3 &point, const idVec3 &force);
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
	////	void					ClipTranslation(trace_t &results, const idVec3 &translation, const model:idClipModel) const;
	////	void					ClipRotation(trace_t &results, const idRotation &rotation, const model:idClipModel) const;
	////	int						ClipContents(const model:idClipModel) const;
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
	////	const idVec3 &			GetPushedLinearVelocity(const /*int*/ id:number = 0) const;
	////	const idVec3 &			GetPushedAngularVelocity(const /*int*/ id:number = 0) const;
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
	self: idEntity; // entity using this physics object
	current = new staticPState_t; // physics state
	clipModel: idClipModel; // collision model

	// master
	hasMaster: boolean;
	isOrientated: boolean;

	////#endif /* !__PHYSICS_STATIC_H__ */

/*
================
idPhysics_Static::idPhysics_Static
================
*/
	constructor ( ) {
		super ( );
		this.self = null;
		this.clipModel = null;
		this.current.origin.Zero ( );
		this.current.axis.Identity ( );
		this.current.localOrigin.Zero ( );
		this.current.localAxis.Identity ( );
		this.hasMaster = false;
		this.isOrientated = false;
	}

	/////*
	////================
	////idPhysics_Static::~idPhysics_Static
	////================
	////*/
	////idPhysics_Static::~idPhysics_Static( ) {
	////	if ( this.self && this.self.GetPhysics() == this ) {
	////		this.self.SetPhysics( NULL );
	////	}
	////	idForce::DeletePhysics( this );
	////	if ( this.clipModel ) {
	////		delete this.clipModel;
	////	}
	////}
	////
	/////*
	////================
	////idPhysics_Static::Save
	////================
	////*/
	////void idPhysics_Static::Save( idSaveGame *savefile ) const {
	////	savefile.WriteObject( this.self );
	////
	////	savefile.WriteVec3( this.current.origin );
	////	savefile.WriteMat3( this.current.axis );
	////	savefile.WriteVec3( this.current.localOrigin );
	////	savefile.WriteMat3( this.current.localAxis );
	////	savefile.WriteClipModel( this.clipModel );
	////
	////	savefile.WriteBool( this.hasMaster );
	////	savefile.WriteBool( this.isOrientated );
	////}
	////
	/////*
	////================
	////idPhysics_Static::Restore
	////================
	////*/
	////void idPhysics_Static::Restore( idRestoreGame *savefile ) {
	////	savefile.ReadObject( reinterpret_cast<idClass *&>( this.self ) );
	////
	////	savefile.ReadVec3( this.current.origin );
	////	savefile.ReadMat3( this.current.axis );
	////	savefile.ReadVec3( this.current.localOrigin );
	////	savefile.ReadMat3( this.current.localAxis );
	////	savefile.ReadClipModel( this.clipModel );
	////
	////	savefile.ReadBool( this.hasMaster );
	////	savefile.ReadBool( this.isOrientated );
	////}

	/*
	================
	idPhysics_Static::SetSelf
	================
	*/
	SetSelf ( e: idEntity ): void {
		assert( e );
		this.self = e;
	}

	/*
	================
	idPhysics_Static::SetClipModel
	================
	*/
	SetClipModel ( model: idClipModel, /*float */density: number, /*int*/ id: number = 0, freeOld: boolean = true): void {
		assert( this.self );

		if ( this.clipModel && this.clipModel != model && freeOld ) {
			delete this.clipModel;
		}
		this.clipModel = model;
		if ( this.clipModel ) {
			this.clipModel.Link_ent( gameLocal.clip, this.self, 0, this.current.origin, this.current.axis );
		}
	}

	/////*
	////================
	////idPhysics_Static::GetClipModel
	////================
	////*/
	////idClipModel *idPhysics_Static::GetClipModel( /*int*/ id:number ) const {
	////	if ( this.clipModel ) {
	////		return this.clipModel;
	////	}
	////	return gameLocal.clip.DefaultClipModel();
	////}
	////
	/////*
	////================
	////idPhysics_Static::GetNumClipModels
	////================
	////*/
	////int idPhysics_Static::GetNumClipModels( ) const {
	////	return ( this.clipModel != NULL );
	////}
	////
	/////*
	////================
	////idPhysics_Static::SetMass
	////================
	////*/
	////void idPhysics_Static::SetMass( float mass, /*int*/ id:number = -1  ) {
	////}
	////
	/////*
	////================
	////idPhysics_Static::GetMass
	////================
	////*/
	////float idPhysics_Static::GetMass( /*int*/ id:number ) const {
	////	return 0.0f;
	////}
	////
	/////*
	////================
	////idPhysics_Static::SetContents
	////================
	////*/
	////void idPhysics_Static::SetContents( int contents, /*int*/ id:number = -1  ) {
	////	if ( this.clipModel ) {
	////		this.clipModel.SetContents( contents );
	////	}
	////}
	////
	/////*
	////================
	////idPhysics_Static::GetContents
	////================
	////*/
	////int idPhysics_Static::GetContents( /*int*/ id:number  = -1 ) const {
	////	if ( this.clipModel ) {
	////		return this.clipModel.GetContents();
	////	}
	////	return 0;
	////}
	////
	/////*
	////================
	////idPhysics_Static::SetClipMask
	////================
	////*/
	////void idPhysics_Static::SetClipMask( int mask, /*int*/ id:number = -1  ) {
	////}
	////
	/////*
	////================
	////idPhysics_Static::GetClipMask
	////================
	////*/
	////int idPhysics_Static::GetClipMask( /*int*/ id:number  = -1 ) const {
	////	return 0;
	////}
	////
	/////*
	////================
	////idPhysics_Static::GetBounds
	////================
	////*/
	////const idBounds &idPhysics_Static::GetBounds( /*int*/ id:number = -1  ) const {
	////	if ( this.clipModel ) {
	////		return this.clipModel.GetBounds();
	////	}
	////	return bounds_zero;
	////}
	////
	/////*
	////================
	////idPhysics_Static::GetAbsBounds
	////================
	////*/
	////const idBounds &idPhysics_Static::GetAbsBounds( /*int*/ id:number = -1  ) const {
	////	static idBounds absBounds;
	////
	////	if ( this.clipModel ) {
	////		return this.clipModel.GetAbsBounds();
	////	}
	////	absBounds[0] = absBounds[1] = this.current.origin;
	////	return absBounds;
	////}
	////
	/////*
	////================
	////idPhysics_Static::Evaluate
	////================
	////*/
	////bool idPhysics_Static::Evaluate( int timeStepMSec, int endTimeMSec ) {
	////	idVec3 masterOrigin, oldOrigin;
	////	idMat3 masterAxis, oldAxis;
	////
	////
	////	if ( this.hasMaster ) {
	////		oldOrigin = this.current.origin;
	////		oldAxis = this.current.axis;
	////
	////		this.self.GetMasterPosition( masterOrigin, masterAxis );
	////		this.current.origin = masterOrigin + this.current.localOrigin * masterAxis;
	////		if ( this.isOrientated ) {
	////			this.current.axis = this.current.localAxis * masterAxis;
	////		} else {
	////			this.current.axis = this.current.localAxis;
	////		}
	////		if ( this.clipModel ) {
	////			this.clipModel.Link( gameLocal.clip, this.self, 0, this.current.origin, this.current.axis );
	////		}
	////
	////		return ( this.current.origin != oldOrigin || this.current.axis != oldAxis );
	////	}
	////	return false;
	////}

	/*
	================
	idPhysics_Static::UpdateTime
	================
	*/
	UpdateTime ( /*int*/ endTimeMSec: number ): void {
	}

	/*
	================
	idPhysics_Static::GetTime
	================
	*/
	GetTime ( ): number /*int*/ {
		return 0;
	}

	/*
	================
	idPhysics_Static::GetImpactInfo
	================
	*/
	GetImpactInfo ( /*int*/ id: number, point: idVec3, info: impactInfo_t ): void {
		info.memset0 ( );
	}

	/*
	================
	idPhysics_Static::ApplyImpulse
	================
	*/
	ApplyImpulse ( /*int*/ id: number, point: idVec3, impulse: idVec3 ): void {
	}

	/*
	================
	idPhysics_Static::AddForce
	================
	*/
	AddForce ( /*int*/ id: number, point: idVec3, force: idVec3 ): void {
	}

	/*
	================
	idPhysics_Static::Activate
	================
	*/
	vActivate ( ): void {
	}

	/*
	================
	idPhysics_Static::PutToRest
	================
	*/
	PutToRest ( ): void {
	}

	/*
	================
	idPhysics_Static::IsAtRest
	================
	*/
	IsAtRest ( ): boolean {
		return true;
	}

	/*
	================
	idPhysics_Static::GetRestStartTime
	================
	*/
	GetRestStartTime ( ): number /*int*/ {
		return 0;
	}

	/*
	================
	idPhysics_Static::IsPushable
	================
	*/
	IsPushable ( ): boolean {
		return false;
	}

	/*
	================
	idPhysics_Static::SaveState
	================
	*/
	SaveState ( ): void {
	}

	/*
	================
	idPhysics_Static::RestoreState
	================
	*/
	RestoreState ( ): void {
	}

	/*
	================
	idPhysics_Static::SetOrigin
	================
	*/
	SetOrigin(newOrigin: idVec3, /*int*/ id: number = -1): void {
		var masterOrigin = new idVec3;
		var masterAxis = new idMat3;

		this.current.localOrigin = newOrigin;

		if ( this.hasMaster ) {
			todoThrow ( );
			//this.self.GetMasterPosition( masterOrigin, masterAxis );
			//this.current.origin .equals( masterOrigin + newOrigin * masterAxis);
		} else {
			this.current.origin = newOrigin;
		}

		if ( this.clipModel ) {
			this.clipModel.Link_ent( gameLocal.clip, this.self, 0, this.current.origin, this.current.axis );
		}
	}

	/*
	================
	idPhysics_Static::SetAxis
	================
	*/
	SetAxis(newAxis: idMat3, /*int*/ id: number = -1): void {
		var masterOrigin = new idVec3;
		var masterAxis = new idMat3;

		this.current.localAxis = newAxis;

		if ( this.hasMaster && this.isOrientated ) {
			todoThrow ( );
			//this.self.GetMasterPosition( masterOrigin, masterAxis );
			//this.current.axis = newAxis * masterAxis;
		} else {
			this.current.axis = newAxis;
		}

		if ( this.clipModel ) {
			this.clipModel.Link_ent( gameLocal.clip, this.self, 0, this.current.origin, this.current.axis );
		}
	}

	/////*
	////================
	////idPhysics_Static::Translate
	////================
	////*/
	////void idPhysics_Static::Translate( const idVec3 &translation, /*int*/ id:number = -1) {
	////	this.current.localOrigin += translation;
	////	this.current.origin += translation;
	////
	////	if ( this.clipModel ) {
	////		this.clipModel.Link( gameLocal.clip, this.self, 0, this.current.origin, this.current.axis );
	////	}
	////}
	////
	/////*
	////================
	////idPhysics_Static::Rotate
	////================
	////*/
	////void idPhysics_Static::Rotate( const idRotation &rotation, /*int*/ id:number= -1 ) {
	////	idVec3 masterOrigin;
	////	idMat3 masterAxis;
	////
	////	this.current.origin *= rotation;
	////	this.current.axis *= rotation.ToMat3();
	////
	////	if ( this.hasMaster ) {
	////		this.self.GetMasterPosition( masterOrigin, masterAxis );
	////		this.current.localAxis *= rotation.ToMat3();
	////		this.current.localOrigin = ( this.current.origin - masterOrigin ) * masterAxis.Transpose();
	////	} else {
	////		this.current.localAxis = this.current.axis;
	////		this.current.localOrigin = this.current.origin;
	////	}
	////
	////	if ( this.clipModel ) {
	////		this.clipModel.Link( gameLocal.clip, this.self, 0, this.current.origin, this.current.axis );
	////	}
	////}
	////
	/////*
	////================
	////idPhysics_Static::GetOrigin
	////================
	////*/
	////const idVec3 &idPhysics_Static::GetOrigin( /*int*/ id:number  = 0) const {
	////	return this.current.origin;
	////}
	////
	/////*
	////================
	////idPhysics_Static::GetAxis
	////================
	////*/
	////const idMat3 &idPhysics_Static::GetAxis( /*int*/ id:number  = 0) const {
	////	return this.current.axis;
	////}
	////
	/////*
	////================
	////idPhysics_Static::SetLinearVelocity
	////================
	////*/
	////void idPhysics_Static::SetLinearVelocity( const idVec3 &newLinearVelocity, /*int*/ id:number  = 0) {
	////}
	////
	/////*
	////================
	////idPhysics_Static::SetAngularVelocity
	////================
	////*/
	////void idPhysics_Static::SetAngularVelocity( const idVec3 &newAngularVelocity, /*int*/ id:number  = 0) {
	////}
	////
	/////*
	////================
	////idPhysics_Static::GetLinearVelocity
	////================
	////*/
	////const idVec3 &idPhysics_Static::GetLinearVelocity( /*int*/ id:number  = 0) const {
	////	return vec3_origin;
	////}
	////
	/////*
	////================
	////idPhysics_Static::GetAngularVelocity
	////================
	////*/
	////const idVec3 &idPhysics_Static::GetAngularVelocity( /*int*/ id:number  = 0) const {
	////	return vec3_origin;
	////}
	////
	/////*
	////================
	////idPhysics_Static::SetGravity
	////================
	////*/
	////void idPhysics_Static::SetGravity( const idVec3 &newGravity ) {
	////}
	////
	/////*
	////================
	////idPhysics_Static::GetGravity
	////================
	////*/
	////const idVec3 &idPhysics_Static::GetGravity( ) const {
	////	static idVec3 gravity( 0, 0, -g_gravity.GetFloat() );
	////	return gravity;
	////}
	////
	/////*
	////================
	////idPhysics_Static::GetGravityNormal
	////================
	////*/
	////const idVec3 &idPhysics_Static::GetGravityNormal( ) const {
	////	static idVec3 gravity( 0, 0, -1 );
	////	return gravity;
	////}
	////
	/////*
	////================
	////idPhysics_Static::ClipTranslation
	////================
	////*/
	////void idPhysics_Static::ClipTranslation( trace_t &results, const idVec3 &translation, const model:idClipModel ) const {
	////	if ( model ) {
	////		gameLocal.clip.TranslationModel( results, this.current.origin, this.current.origin + translation,
	////			this.clipModel, this.current.axis, MASK_SOLID, model.Handle(), model.GetOrigin(), model.GetAxis() );
	////	} else {
	////		gameLocal.clip.Translation( results, this.current.origin, this.current.origin + translation,
	////			this.clipModel, this.current.axis, MASK_SOLID, this.self );
	////	}	
	////}
	////
	/////*
	////================
	////idPhysics_Static::ClipRotation
	////================
	////*/
	////void idPhysics_Static::ClipRotation( trace_t &results, const idRotation &rotation, const model:idClipModel ) const {
	////	if ( model ) {
	////		gameLocal.clip.RotationModel( results, this.current.origin, rotation,
	////			this.clipModel, this.current.axis, MASK_SOLID, model.Handle(), model.GetOrigin(), model.GetAxis() );
	////	} else {
	////		gameLocal.clip.Rotation( results, this.current.origin, rotation, this.clipModel, this.current.axis, MASK_SOLID, this.self );
	////	}
	////}
	////
	/////*
	////================
	////idPhysics_Static::ClipContents
	////================
	////*/
	////int idPhysics_Static::ClipContents( const model:idClipModel ) const {
	////	if ( this.clipModel ) {
	////		if ( model ) {
	////			return gameLocal.clip.ContentsModel( this.clipModel.GetOrigin(), this.clipModel, this.clipModel.GetAxis(), -1,
	////				model.Handle(), model.GetOrigin(), model.GetAxis() );
	////		} else {
	////			return gameLocal.clip.Contents( this.clipModel.GetOrigin(), this.clipModel, this.clipModel.GetAxis(), -1, NULL );
	////		}
	////	}
	////	return 0;
	////}
	
	/*
	================
	idPhysics_Static::DisableClip
	================
	*/
	DisableClip( ):void {
		if ( this.clipModel ) {
			this.clipModel.Disable();
		}
	}
	
	/*
	================
	idPhysics_Static::EnableClip
	================
	*/
	EnableClip( ):void {
		if ( this.clipModel ) {
			this.clipModel.Enable();
		}
	}
	
	/*
	================
	idPhysics_Static::UnlinkClip
	================
	*/
	UnlinkClip( ):void {
		if ( this.clipModel ) {
			this.clipModel.Unlink();
		}
	}
	
	/////*
	////================
	////idPhysics_Static::LinkClip
	////================
	////*/
	////void idPhysics_Static::LinkClip( ) {
	////	if ( this.clipModel ) {
	////		this.clipModel.Link( gameLocal.clip, this.self, 0, this.current.origin, this.current.axis );
	////	}
	////}
	////
	/////*
	////================
	////idPhysics_Static::EvaluateContacts
	////================
	////*/
	////bool idPhysics_Static::EvaluateContacts( ) {
	////	return false;
	////}
	////
	/////*
	////================
	////idPhysics_Static::GetNumContacts
	////================
	////*/
	////int idPhysics_Static::GetNumContacts( ) const {
	////	return 0;
	////}
	////
	/////*
	////================
	////idPhysics_Static::GetContact
	////================
	////*/
	////const contactInfo_t &idPhysics_Static::GetContact( int num ) const {
	////	static contactInfo_t info;
	////	memset( &info, 0, sizeof( info ) );
	////	return info;
	////}
	////
	/////*
	////================
	////idPhysics_Static::ClearContacts
	////================
	////*/
	////void idPhysics_Static::ClearContacts( ) {
	////}
	////
	/////*
	////================
	////idPhysics_Static::AddContactEntity
	////================
	////*/
	////void idPhysics_Static::AddContactEntity( idEntity *e ) {
	////}
	////
	/////*
	////================
	////idPhysics_Static::RemoveContactEntity
	////================
	////*/
	////void idPhysics_Static::RemoveContactEntity( idEntity *e ) {
	////}
	////
	/////*
	////================
	////idPhysics_Static::HasGroundContacts
	////================
	////*/
	////bool idPhysics_Static::HasGroundContacts( ) const {
	////	return false;
	////}
	////
	/////*
	////================
	////idPhysics_Static::IsGroundEntity
	////================
	////*/
	////bool idPhysics_Static::IsGroundEntity( int entityNum ) const {
	////	return false;
	////}
	////
	/////*
	////================
	////idPhysics_Static::IsGroundClipModel
	////================
	////*/
	////bool idPhysics_Static::IsGroundClipModel( int entityNum, /*int*/ id:number ) const {
	////	return false;
	////}
	////
	/////*
	////================
	////idPhysics_Static::SetPushed
	////================
	////*/
	////void idPhysics_Static::SetPushed( int deltaTime ) {
	////}
	////
	/////*
	////================
	////idPhysics_Static::GetPushedLinearVelocity
	////================
	////*/
	////const idVec3 &idPhysics_Static::GetPushedLinearVelocity( const /*int*/ id:number  = 0) const {
	////	return vec3_origin;
	////}
	////
	/////*
	////================
	////idPhysics_Static::GetPushedAngularVelocity
	////================
	////*/
	////const idVec3 &idPhysics_Static::GetPushedAngularVelocity( const /*int*/ id:number = 0 ) const {
	////	return vec3_origin;
	////}
	////
	/////*
	////================
	////idPhysics_Static::SetMaster
	////================
	////*/
	////void idPhysics_Static::SetMaster( idEntity *master, const bool orientated ) {
	////	idVec3 masterOrigin;
	////	idMat3 masterAxis;
	////
	////	if ( master ) {
	////		if ( !this.hasMaster ) {
	////			// transform from world space to master space
	////			this.self.GetMasterPosition( masterOrigin, masterAxis );
	////			this.current.localOrigin = ( this.current.origin - masterOrigin ) * masterAxis.Transpose();
	////			if ( orientated ) {
	////				this.current.localAxis = this.current.axis * masterAxis.Transpose();
	////			} else {
	////				this.current.localAxis = this.current.axis;
	////			}
	////			this.hasMaster = true;
	////			this.isOrientated = orientated;
	////		}
	////	} else {
	////		if ( this.hasMaster ) {
	////			this.hasMaster = false;
	////		}
	////	}
	////}
	
	/*
	================
	idPhysics_Static::GetBlockingInfo
	================
	*/
	GetBlockingInfo(): trace_t {
		return null;
	}
	
	/*
	================
	idPhysics_Static::GetBlockingEntity
	================
	*/
	GetBlockingEntity(): idEntity {
		return null;
	}
	
	/*
	================
	idPhysics_Static::GetLinearEndTime
	================
	*/
	GetLinearEndTime ( ): number /*int*/ {
		return 0;
	}

	/*
	================
	idPhysics_Static::GetAngularEndTime
	================
	*/
	GetAngularEndTime ( ): number /*int*/ {
		return 0;
	}
	
	/////*
	////================
	////idPhysics_Static::WriteToSnapshot
	////================
	////*/
	////void idPhysics_Static::WriteToSnapshot( idBitMsgDelta &msg ) const {
	////	idCQuat quat, localQuat;
	////
	////	quat = this.current.axis.ToCQuat();
	////	localQuat = this.current.localAxis.ToCQuat();
	////
	////	msg.WriteFloat( this.current.origin[0] );
	////	msg.WriteFloat( this.current.origin[1] );
	////	msg.WriteFloat( this.current.origin[2] );
	////	msg.WriteFloat( quat.x );
	////	msg.WriteFloat( quat.y );
	////	msg.WriteFloat( quat.z );
	////	msg.WriteDeltaFloat( this.current.origin[0], this.current.localOrigin[0] );
	////	msg.WriteDeltaFloat( this.current.origin[1], this.current.localOrigin[1] );
	////	msg.WriteDeltaFloat( this.current.origin[2], this.current.localOrigin[2] );
	////	msg.WriteDeltaFloat( quat.x, localQuat.x );
	////	msg.WriteDeltaFloat( quat.y, localQuat.y );
	////	msg.WriteDeltaFloat( quat.z, localQuat.z );
	////}
	////
	/////*
	////================
	////idPhysics_Base::ReadFromSnapshot
	////================
	////*/
	////void idPhysics_Static::ReadFromSnapshot( const idBitMsgDelta &msg ) {
	////	idCQuat quat, localQuat;
	////
	////	this.current.origin[0] = msg.ReadFloat();
	////	this.current.origin[1] = msg.ReadFloat();
	////	this.current.origin[2] = msg.ReadFloat();
	////	quat.x = msg.ReadFloat();
	////	quat.y = msg.ReadFloat();
	////	quat.z = msg.ReadFloat();
	////	this.current.localOrigin[0] = msg.ReadDeltaFloat( this.current.origin[0] );
	////	this.current.localOrigin[1] = msg.ReadDeltaFloat( this.current.origin[1] );
	////	this.current.localOrigin[2] = msg.ReadDeltaFloat( this.current.origin[2] );
	////	localQuat.x = msg.ReadDeltaFloat( quat.x );
	////	localQuat.y = msg.ReadDeltaFloat( quat.y );
	////	localQuat.z = msg.ReadDeltaFloat( quat.z );
	////
	////	this.current.axis = quat.ToMat3();
	////	this.current.localAxis = localQuat.ToMat3();
	////}
}

//
//CLASS_DECLARATION(idPhysics, idPhysics_Static)
idPhysics_Static.CreateInstance = function() : idClass{
	try {
		var ptr = new idPhysics_Static;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idPhysics_Static.prototype.GetType = function ( ): idTypeInfo {
	return ( idPhysics_Static.Type );
};

idPhysics_Static.eventCallbacks = [
];

idPhysics_Static.Type = new idTypeInfo( "idPhysics_Static", "idPhysics",
	idPhysics_Static.eventCallbacks, idPhysics_Static.CreateInstance, idPhysics_Static.prototype.Spawn,
	idPhysics_Static.prototype.Save, idPhysics_Static.prototype.Restore );

//END_CLASS