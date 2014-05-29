/*
===========================================================================

Doom 3 GPL Source Code
Copyright (C) 1999-2011 id Software LLC, a ZeniMax Media company. 

This file is part of the Doom 3 GPL Source Code (?Doom 3 Source Code?).  

Doom 3 Source Code is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Doom 3 Source Code is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with Doom 3 Source Code.  If not, see <http://www.gnu.org/licenses/>.

In addition, the Doom 3 Source Code is also subject to certain additional terms. You should have received a copy of these additional terms immediately following the terms and conditions of the GNU General Public License which accompanied the Doom 3 Source Code.  If not, please request a copy in writing from id Software at the address below.

If you have questions concerning this license or the applicable additional terms, you may contact in writing id Software LLC, c/o ZeniMax Media Inc., Suite 120, Rockville, Maryland 20850 USA.

===========================================================================
*/
//
//#include "../../idlib/precompiled.h"
//#pragma hdrstop
//
//#include "../Game_local.h"
//

//
//
//
//#ifndef __PHYSICS_BASE_H__
//#define __PHYSICS_BASE_H__

/*
===============================================================================

Physics base for a moving object using one or more collision models.

===============================================================================
*/

//#define contactEntity_t		idEntityPtr<idEntity>
//class contactEntity_t extends idEntityPtr<idEntity> {} // moved to Game_local, after idEntityPtr

class idPhysics_Base extends idPhysics {
	//
	//public:
	//	CLASS_PROTOTYPE(idPhysics_Base);
	static	Type:idTypeInfo;						
	static	CreateInstance( ): idClass {throw "placeholder";}
	GetType( ):idTypeInfo {throw "placeholder";}
	static	eventCallbacks : idEventFunc<idPhysics_Base>[];
	//
	//	idPhysics_Base(void);
	//	~idPhysics_Base(void);
	//
	//	void					Save(idSaveGame *savefile) const;
	//	void					Restore(idRestoreGame *savefile);
	//
	//public:	// common physics interface
	//
	//SetSelf ( e: idEntity ): void { throw "placeholder"; }
	//
	//	void					SetClipModel(idClipModel *model, float density, /*int*/ id:number = 0, bool freeOld = true);
	//	idClipModel *			GetClipModel(/*int*/ id:number = 0) const;
	//	int						GetNumClipModels(void) const;
	//
	//	void					SetMass(float mass, /*int*/ id:number = -1);
	//	float					GetMass(/*int*/ id:number = -1) const;
	//
	//	void					SetContents(int contents, /*int*/ id:number = -1);
	//	int						GetContents(/*int*/ id:number = -1) const;
	//
	//	void					SetClipMask(int mask, /*int*/ id:number = -1);
	//	int						GetClipMask(/*int*/ id:number = -1) const;
	//
	//	const idBounds &		GetBounds(/*int*/ id:number = -1) const;
	//	const idBounds &		GetAbsBounds(/*int*/ id:number = -1) const;
	//
	//	bool					Evaluate(int timeStepMSec, int endTimeMSec);
	//	void					UpdateTime(int endTimeMSec);
	//	int						GetTime(void) const;
	//
	//	void					GetImpactInfo(const /*int*/ id:number, const idVec3 &point, impactInfo_t *info) const;
	//	void					ApplyImpulse(const /*int*/ id:number, const idVec3 &point, const idVec3 &impulse);
	//	void					AddForce(const /*int*/ id:number, const idVec3 &point, const idVec3 &force);
	//	void					Activate(void);
	//	void					PutToRest(void);
	//	bool					IsAtRest(void) const;
	//	int						GetRestStartTime(void) const;
	//	bool					IsPushable(void) const;
	//
	//	void					SaveState(void);
	//	void					RestoreState(void);
	//
	//	void					SetOrigin(const idVec3 &newOrigin, /*int*/ id:number = -1);
	//	void					SetAxis(const idMat3 &newAxis, /*int*/ id:number = -1);
	//
	//	void					Translate(const idVec3 &translation, /*int*/ id:number = -1);
	//	void					Rotate(const idRotation &rotation, /*int*/ id:number = -1);
	//
	//	const idVec3 &			GetOrigin(/*int*/ id:number = 0) const;
	//	const idMat3 &			GetAxis(/*int*/ id:number = 0) const;
	//
	//	void					SetLinearVelocity(const idVec3 &newLinearVelocity, /*int*/ id:number = 0);
	//	void					SetAngularVelocity(const idVec3 &newAngularVelocity, /*int*/ id:number = 0);
	//
	//	const idVec3 &			GetLinearVelocity(/*int*/ id:number = 0) const;
	//	const idVec3 &			GetAngularVelocity(/*int*/ id:number = 0) const;
	//
	//	void					SetGravity(const idVec3 &newGravity);
	//	const idVec3 &			GetGravity(void) const;
	//	const idVec3 &			GetGravityNormal(void) const;
	//
	//	void					ClipTranslation(trace_t &results, const idVec3 &translation, const idClipModel *model) const;
	//	void					ClipRotation(trace_t &results, const idRotation &rotation, const idClipModel *model) const;
	//	int						ClipContents(const idClipModel *model) const;
	//
	//	void					DisableClip(void);
	//	void					EnableClip(void);
	//
	//	void					UnlinkClip(void);
	//	void					LinkClip(void);
	//
	//	bool					EvaluateContacts(void);
	//	int						GetNumContacts(void) const;
	//	const contactInfo_t &	GetContact(int num) const;
	//	void					ClearContacts(void);
	//	void					AddContactEntity(idEntity *e);
	//	void					RemoveContactEntity(idEntity *e);
	//
	//	bool					HasGroundContacts(void) const;
	//	bool					IsGroundEntity(int entityNum) const;
	//	bool					IsGroundClipModel(int entityNum, /*int*/ id:number) const;
	//
	//	void					SetPushed(int deltaTime);
	//	const idVec3 &			GetPushedLinearVelocity(const /*int*/ id:number = 0) const;
	//	const idVec3 &			GetPushedAngularVelocity(const /*int*/ id:number = 0) const;
	//
	//	void					SetMaster(idEntity *master, const bool orientated = true);
	//
	//	const trace_t *			GetBlockingInfo(void) const;
	//	idEntity *				GetBlockingEntity(void) const;
	//
	//	int						GetLinearEndTime(void) const;
	//	int						GetAngularEndTime(void) const;
	//
	//	void					WriteToSnapshot(idBitMsgDelta &msg) const;
	//	void					ReadFromSnapshot(const idBitMsgDelta &msg);
	//
	//protected:
	self:idEntity;					// entity using this physics object
	clipMask :number/*int*/;				// contents the physics object collides with
	gravityVector = new idVec3;			// direction and magnitude of gravity
	gravityNormal = new idVec3;			// normalized direction of gravity
	contacts = new idList<contactInfo_t>(contactInfo_t);				// contacts with other physics objects
	contactEntities = new idList<contactEntity_t>(contactEntity_t);		// entities touching this physics object
	//
	//protected:
	//	// add ground contacts for the clip model
	//	void					AddGroundContacts(const idClipModel *clipModel);
	//	// add contact entity links to contact entities
	//	void					AddContactEntitiesForContacts(void);
	//	// active all contact entities
	//	void					ActivateContactEntities(void);
	//	// returns true if the whole physics object is outside the world bounds
	//	bool					IsOutsideWorld(void) const;
	//	// draw linear and angular velocity
	//	void					DrawVelocity(/*int*/ id:number, float linearScale, float angularScale) const;
	//};
	//
	//#endif /* !__PHYSICS_BASE_H__ */
	//
	
	/*
	================
	idPhysics_Base::idPhysics_Base
	================
	*/
	constructor() {
		super ( );
		this.self = null;
		this.clipMask = 0;
		this.SetGravity( gameLocal.GetGravity() );
		this.ClearContacts();
	}
	
	/*
	================
	idPhysics_Base::~idPhysics_Base
	================
	*/
	destructor(): void {
		todoThrow ( );
		//if ( this.self && this.self.GetPhysics() == this ) {
		//	this.self.SetPhysics( null );
		//}
		//idForce.DeletePhysics( this );
		//this.ClearContacts();
	}
	//
	///*
	//================
	//idPhysics_Base::Save
	//================
	//*/
	//void idPhysics_Base::Save( idSaveGame *savefile ) const {
	//	var/*int*/i:number;
	//
	//	savefile.WriteObject( this.self );
	//	savefile.WriteInt( this.clipMask );
	//	savefile.WriteVec3( gravityVector );
	//	savefile.WriteVec3( this.gravityNormal );
	//
	//	savefile.WriteInt( this.contacts.Num() );
	//	for ( i = 0; i < this.contacts.Num(); i++ ) {
	//		savefile.WriteContactInfo( this.contacts[i] );
	//	}
	//
	//	savefile.WriteInt( contactEntities.Num() );
	//	for ( i = 0; i < contactEntities.Num(); i++ ) {
	//		contactEntities[i].Save( savefile );
	//	}
	//}
	//
	///*
	//================
	//idPhysics_Base::Restore
	//================
	//*/
	//void idPhysics_Base::Restore( idRestoreGame *savefile ) {
	//	int i, num;
	//
	//	savefile.ReadObject( reinterpret_cast<idClass *&>( this.self ) );
	//	savefile.ReadInt( this.clipMask );
	//	savefile.ReadVec3( gravityVector );
	//	savefile.ReadVec3( this.gravityNormal );
	//
	//	savefile.ReadInt( num );
	//	this.contacts.SetNum( num );
	//	for ( i = 0; i < this.contacts.Num(); i++ ) {
	//		savefile.ReadContactInfo( this.contacts[i] );
	//	}
	//
	//	savefile.ReadInt( num );
	//	contactEntities.SetNum( num );
	//	for ( i = 0; i < contactEntities.Num(); i++ ) {
	//		contactEntities[i].Restore( savefile );
	//	}
	//}
	
	/*
	================
	idPhysics_Base::SetSelf
	================
	*/
	SetSelf(e: idEntity): void {
		assert(e);
		this.self = e;
	}

	/*
	================
	idPhysics_Base::SetClipModel
	================
	*/
	SetClipModel ( model: idClipModel, /*float*/ density: number, /*int*/ id: number = 0, freeOld = true ): void {
	}

	/*
	================
	idPhysics_Base::GetClipModel
	================
	*/
	GetClipModel( /*int*/ id: number  = 0): idClipModel {
		return null;
	}

	/*
	================
	idPhysics_Base::GetNumClipModels
	================
	*/
	GetNumClipModels ( ): number {
		return 0;
	}
	
	/*
	================
	idPhysics_Base::SetMass
	================
	*/
	SetMass( /*float*/ mass: number, /*int*/ id: number = -1 ):void {
	}
	
	/*
	================
	idPhysics_Base::GetMass
	================
	*/
	GetMass( /*int*/ id: number= -1  ) :number {
		return 0.0;
	}
	
	/*
	================
	idPhysics_Base::SetContents
	================
	*/
	SetContents ( /*int*/ contents: number, /*int*/ id: number = -1): void {
	}
	//
	///*
	//================
	//idPhysics_Base::GetContents
	//================
	//*/
	//int idPhysics_Base::GetContents( /*int*/ id:number  = -1) const {
	//	return 0;
	//}
	
	/*
	================
	idPhysics_Base::SetClipMask
	================
	*/
	SetClipMask ( /*int*/ mask: number, /*int*/ id: number = -1 ): void {
		this.clipMask = mask;
	}

	/*
	================
	idPhysics_Base::GetClipMask
	================
	*/
	GetClipMask ( /*int*/ id: number = -1 ): number {
		return this.clipMask;
	}

	/*
	================
	idPhysics_Base::GetBounds
	================
	*/
	GetBounds( /*int*/ id: number = -1): idBounds {
		return bounds_zero;
	}
	
	/*
	================
	idPhysics_Base::GetAbsBounds
	================
	*/
	GetAbsBounds( /*int*/ id: number  = -1): idBounds {
		return bounds_zero;
	}
	//
	///*
	//================
	//idPhysics_Base::Evaluate
	//================
	//*/
	//bool idPhysics_Base::Evaluate( int timeStepMSec, int endTimeMSec ) {
	//	return false;
	//}
	
	/*
	================
	idPhysics_Base::UpdateTime
	================
	*/
	UpdateTime ( /*int*/ endTimeMSec: number ): void {
	}
	//
	/*
	================
	idPhysics_Base::GetTime
	================
	*/
    GetTime(): number {
		return 0;
	}
	
	///*
	//================
	//idPhysics_Base::GetImpactInfo
	//================
	//*/
	//void idPhysics_Base::GetImpactInfo( /*int*/ id:number, const idVec3 &point, impactInfo_t *info ) const {
	//	memset( info, 0, sizeof( *info ) );
	//}
	//
	///*
	//================
	//idPhysics_Base::ApplyImpulse
	//================
	//*/
	//void idPhysics_Base::ApplyImpulse( /*int*/ id:number, const idVec3 &point, const idVec3 &impulse ) {
	//}
	//
	///*
	//================
	//idPhysics_Base::AddForce
	//================
	//*/
	//void idPhysics_Base::AddForce( /*int*/ id:number, const idVec3 &point, const idVec3 &force ) {
	//}
	//
	/*
	================
	idPhysics_Base::Activate
	================
	*/
	Activate( ):void {
	}
	
	/*
	================
	idPhysics_Base::PutToRest
	================
	*/
	PutToRest ( ): void {
	}
	
	/*
	================
	idPhysics_Base::IsAtRest
	================
	*/
	IsAtRest(): boolean {
		return true;
	}
	//
	///*
	//================
	//idPhysics_Base::GetRestStartTime
	//================
	//*/
	//int idPhysics_Base::GetRestStartTime( ) const {
	//	return 0;
	//}
	//
	///*
	//================
	//idPhysics_Base::IsPushable
	//================
	//*/
	//bool idPhysics_Base::IsPushable( ) const {
	//	return true;
	//}
	//
	///*
	//================
	//idPhysics_Base::SaveState
	//================
	//*/
	//void idPhysics_Base::SaveState( ) {
	//}
	//
	///*
	//================
	//idPhysics_Base::RestoreState
	//================
	//*/
	//RestoreState ( ): void {
	//}

	/*
	================
	idPhysics_Base::SetOrigin
	================
	*/
	SetOrigin ( newOrigin: idVec3, /*int*/ id: number = -1 ): void {
	}

	/*
	================
	idPhysics_Base::SetAxis
	================
	*/
	SetAxis ( newAxis: idMat3, /*int*/ id: number = -1 ): void {
	}

	/*
	================
	idPhysics_Base::Translate
	================
	*/
	Translate ( translation: idVec3, /*int*/ id: number = -1 ): void {
	}

	/*
	================
	idPhysics_Base::Rotate
	================
	*/
	Rotate ( rotation: idRotation, /*int*/ id: number = -1 ): void {
	}

	/*
	================
	idPhysics_Base::GetOrigin
	================
	*/
	GetOrigin ( /*int*/ id: number = 0 ): idVec3 {
		return vec3_origin;
	}

	/*
	================
	idPhysics_Base::GetAxis
	================
	*/
	GetAxis ( /*int*/ id: number = 0 ): idMat3 {
		return mat3_identity;
	}
	
	///*
	//================
	//idPhysics_Base::SetLinearVelocity
	//================
	//*/
	//void idPhysics_Base::SetLinearVelocity( const idVec3 &newLinearVelocity, /*int*/ id:number = 0) {
	//}
	//
	///*
	//================
	//idPhysics_Base::SetAngularVelocity
	//================
	//*/
	//void idPhysics_Base::SetAngularVelocity( const idVec3 &newAngularVelocity, /*int*/ id:number = 0) {
	//}
	//
	///*
	//================
	//idPhysics_Base::GetLinearVelocity
	//================
	//*/
	//const idVec3 &idPhysics_Base::GetLinearVelocity( /*int*/ id:number = 0) const {
	//	return vec3_origin;
	//}
	//
	///*
	//================
	//idPhysics_Base::GetAngularVelocity
	//================
	//*/
	//const idVec3 &idPhysics_Base::GetAngularVelocity( /*int*/ id:number = 0) const {
	//	return vec3_origin;
	//}
	//
	/*
	================
	idPhysics_Base::SetGravity
	================
	*/
	SetGravity ( newGravity: idVec3 ): void {
		this.gravityVector.opEquals( newGravity );
		this.gravityNormal.opEquals( newGravity );
		this.gravityNormal.Normalize ( );
	}

	///*
	//================
	//idPhysics_Base::GetGravity
	//================
	//*/
	//const idVec3 &idPhysics_Base::GetGravity( ) const {
	//	return gravityVector;
	//}
	//
	/*
	================
	idPhysics_Base::GetGravityNormal
	================
	*/
    GetGravityNormal ( ): idVec3 {
        return this.gravityNormal
    }
    
	/*
	================
	idPhysics_Base::ClipTranslation
	================
	*/
	ClipTranslation ( results: trace_t, translation: idVec3, model: idClipModel ): void {
	    results.memset0 ( );
	}
	
	///*
	//================
	//idPhysics_Base::ClipRotation
	//================
	//*/
	//void idPhysics_Base::ClipRotation( trace_t &results, const idRotation &rotation, const idClipModel *model ) const {
	//	memset( &results, 0, sizeof( trace_t ) );
	//}
	//
	///*
	//================
	//idPhysics_Base::ClipContents
	//================
	//*/
	//int idPhysics_Base::ClipContents( const idClipModel *model ) const {
	//	return 0;
	//}
	//
	///*
	//================
	//idPhysics_Base::DisableClip
	//================
	//*/
	//void idPhysics_Base::DisableClip( ) {
	//}
	//
	///*
	//================
	//idPhysics_Base::EnableClip
	//================
	//*/
	//void idPhysics_Base::EnableClip( ) {
	//}
	//
	///*
	//================
	//idPhysics_Base::UnlinkClip
	//================
	//*/
	//void idPhysics_Base::UnlinkClip( ) {
	//}
	//
	///*
	//================
	//idPhysics_Base::LinkClip
	//================
	//*/
	//void idPhysics_Base::LinkClip( ) {
	//}
	//
	///*
	//================
	//idPhysics_Base::EvaluateContacts
	//================
	//*/
	//bool idPhysics_Base::EvaluateContacts( ) {
	//	return false;
	//}
	//
	///*
	//================
	//idPhysics_Base::GetNumContacts
	//================
	//*/
	//int idPhysics_Base::GetNumContacts( ) const {
	//	return this.contacts.Num();
	//}
	//
	///*
	//================
	//idPhysics_Base::GetContact
	//================
	//*/
	//const contactInfo_t &idPhysics_Base::GetContact( int num ) const {
	//	return this.contacts[num];
	//}
	
	/*
	================
	idPhysics_Base::ClearContacts
	================
	*/
	ClearContacts( ):void {
		var/*int*/i:number;
		var ent: idEntity ;
	
		for ( i = 0; i < this.contacts.Num(); i++ ) {
			ent = gameLocal.entities[ this.contacts[i].entityNum ];
			if ( ent ) {
				ent.RemoveContactEntity( this.self );
			}
		}
		this.contacts.SetNum( 0, false );
	}
	//
	///*
	//================
	//idPhysics_Base::AddContactEntity
	//================
	//*/
	//void idPhysics_Base::AddContactEntity( idEntity *e ) {
	//	var/*int*/i:number;
	//	idEntity *ent;
	//	bool found = false;
	//
	//	for ( i = 0; i < contactEntities.Num(); i++ ) {
	//		ent = contactEntities[i].GetEntity();
	//		if ( ent == NULL ) {
	//			contactEntities.RemoveIndex( i-- );
	//		}
	//		if ( ent == e ) {
	//			found = true;
	//		}
	//	}
	//	if ( !found ) {
	//		contactEntities.Alloc() = e;
	//	}
	//}
	//
	///*
	//================
	//idPhysics_Base::RemoveContactEntity
	//================
	//*/
	//void idPhysics_Base::RemoveContactEntity( idEntity *e ) {
	//	var/*int*/i:number;
	//	idEntity *ent;
	//
	//	for ( i = 0; i < contactEntities.Num(); i++ ) {
	//		ent = contactEntities[i].GetEntity();
	//		if ( !ent ) {
	//			contactEntities.RemoveIndex( i-- );
	//			continue;
	//		}
	//		if ( ent == e ) {
	//			contactEntities.RemoveIndex( i-- );
	//			return;
	//		}
	//	}
	//}
	//
	/*
	================
	idPhysics_Base::HasGroundContacts
	================
	*/
	HasGroundContacts( ):boolean {
		var/*int*/i:number;

	    for ( i = 0; i < this.contacts.Num ( ); i++ ) {
	        if ( this.contacts[i].normal.timesVec( this.gravityNormal.opUnaryMinus ( ) ) > 0.0 ) {
	            return true;
	        }
	    }
	    return false;
	}
	//
	///*
	//================
	//idPhysics_Base::IsGroundEntity
	//================
	//*/
	//bool idPhysics_Base::IsGroundEntity( int entityNum ) const {
	//	var/*int*/i:number;
	//
	//	for ( i = 0; i < this.contacts.Num(); i++ ) {
	//		if ( this.contacts[i].entityNum == entityNum && ( this.contacts[i].normal * -this.gravityNormal > 0.0 ) ) {
	//			return true;
	//		}
	//	}
	//	return false;
	//}
	//
	///*
	//================
	//idPhysics_Base::IsGroundClipModel
	//================
	//*/
	//bool idPhysics_Base::IsGroundClipModel( int entityNum, /*int*/ id:number ) const {
	//	var/*int*/i:number;
	//
	//	for ( i = 0; i < this.contacts.Num(); i++ ) {
	//		if ( this.contacts[i].entityNum == entityNum && this.contacts[i].id == id && ( this.contacts[i].normal * -this.gravityNormal > 0.0 ) ) {
	//			return true;
	//		}
	//	}
	//	return false;
	//}
	//
	///*
	//================
	//idPhysics_Base::SetPushed
	//================
	//*/
	//void idPhysics_Base::SetPushed( int deltaTime ) {
	//}
	//
	///*
	//================
	//idPhysics_Base::GetPushedLinearVelocity
	//================
	//*/
	//const idVec3 &idPhysics_Base::GetPushedLinearVelocity( const /*int*/ id:number ) const {
	//	return vec3_origin;
	//}
	//
	///*
	//================
	//idPhysics_Base::GetPushedAngularVelocity
	//================
	//*/
	//const idVec3 &idPhysics_Base::GetPushedAngularVelocity( const /*int*/ id:number ) const {
	//	return vec3_origin;
	//}
	//
	/*
	================
	idPhysics_Base::SetMaster
	================
	*/
	SetMaster ( master: idEntity, orientated: boolean = true ) {
	}
	//
	///*
	//================
	//idPhysics_Base::GetBlockingInfo
	//================
	//*/
	//const trace_t *idPhysics_Base::GetBlockingInfo( ) const {
	//	return NULL;
	//}
	//
	///*
	//================
	//idPhysics_Base::GetBlockingEntity
	//================
	//*/
	//idEntity *idPhysics_Base::GetBlockingEntity( ) const {
	//	return NULL;
	//}
	//
	///*
	//================
	//idPhysics_Base::GetLinearEndTime
	//================
	//*/
	//int idPhysics_Base::GetLinearEndTime( ) const {
	//	return 0;
	//}
	//
	///*
	//================
	//idPhysics_Base::GetAngularEndTime
	//================
	//*/
	//int idPhysics_Base::GetAngularEndTime( ) const {
	//	return 0;
	//}
	//
	///*
	//================
	//idPhysics_Base::AddGroundContacts
	//================
	//*/
	//void idPhysics_Base::AddGroundContacts( const idClipModel *clipModel ) {
	//	idVec6 dir;
	//	int index, num;
	//
	//	index = this.contacts.Num();
	//	this.contacts.SetNum( index + 10, false );
	//
	//	dir.SubVec3(0) = this.gravityNormal;
	//	dir.SubVec3(1) = vec3_origin;
	//	num = gameLocal.clip.Contacts( &this.contacts[index], 10, clipModel.GetOrigin(),
	//					dir, CONTACT_EPSILON, clipModel, clipModel.GetAxis(), this.clipMask, this.self );
	//	this.contacts.SetNum( index + num, false );
	//}
	//
	///*
	//================
	//idPhysics_Base::AddContactEntitiesForContacts
	//================
	//*/
	//void idPhysics_Base::AddContactEntitiesForContacts( ) {
	//	var/*int*/i:number;
	//	idEntity *ent;
	//
	//	for ( i = 0; i < this.contacts.Num(); i++ ) {
	//		ent = gameLocal.entities[ this.contacts[i].entityNum ];
	//		if ( ent && ent != this.self ) {
	//			ent.AddContactEntity( this.self );
	//		}
	//	}
	//}
	//
	///*
	//================
	//idPhysics_Base::ActivateContactEntities
	//================
	//*/
	//void idPhysics_Base::ActivateContactEntities( ) {
	//	var/*int*/i:number;
	//	idEntity *ent;
	//
	//	for ( i = 0; i < contactEntities.Num(); i++ ) {
	//		ent = contactEntities[i].GetEntity();
	//		if ( ent ) {
	//			ent.ActivatePhysics( this.self );
	//		} else {
	//			contactEntities.RemoveIndex( i-- );
	//		}
	//	}
	//}
	//
	///*
	//================
	//idPhysics_Base::IsOutsideWorld
	//================
	//*/
	//bool idPhysics_Base::IsOutsideWorld( ) const {
	//	if ( !gameLocal.clip.GetWorldBounds().Expand( 128.0 ).IntersectsBounds( GetAbsBounds() ) ) {
	//		return true;
	//	}
	//	return false;
	//}
	//
	///*
	//================
	//idPhysics_Base::DrawVelocity
	//================
	//*/
	//void idPhysics_Base::DrawVelocity( /*int*/ id:number, float linearScale, float angularScale ) const {
	//	idVec3 dir, org, vec, start, end;
	//	idMat3 axis;
	//	float length, a;
	//
	//	dir = GetLinearVelocity( id );
	//	dir *= linearScale;
	//	if ( dir.LengthSqr() > Square( 0.1f ) ) {
	//		dir.Truncate( 10.0 );
	//		org = GetOrigin( id );
	//		gameRenderWorld.DebugArrow( colorRed, org, org + dir, 1 );
	//	}
	//
	//	dir = GetAngularVelocity( id );
	//	length = dir.Normalize();
	//	length *= angularScale;
	//	if ( length > 0.1f ) {
	//		if ( length < 60.0 ) {
	//			length = 60.0;
	//		}
	//		else if ( length > 360.0 ) {
	//			length = 360.0;
	//		}
	//		axis = GetAxis( id );
	//		vec = axis[2];
	//		if ( idMath::Fabs( dir * vec ) > 0.99f ) {
	//			vec = axis[0];
	//		}
	//		vec -= vec * dir * vec;
	//		vec.Normalize();
	//		vec *= 4.0;
	//		start = org + vec;
	//		for ( a = 20.0; a < length; a += 20.0 ) {
	//			end = org + idRotation( vec3_origin, dir, -a ).ToMat3() * vec;
	//			gameRenderWorld.DebugLine( colorBlue, start, end, 1 );
	//			start = end;
	//		}
	//		end = org + idRotation( vec3_origin, dir, -length ).ToMat3() * vec;
	//		gameRenderWorld.DebugArrow( colorBlue, start, end, 1 );
	//	}
	//}
	//
	///*
	//================
	//idPhysics_Base::WriteToSnapshot
	//================
	//*/
	//void idPhysics_Base::WriteToSnapshot( idBitMsgDelta &msg ) const {
	//}
	//
	///*
	//================
	//idPhysics_Base::ReadFromSnapshot
	//================
	//*/
	//void idPhysics_Base::ReadFromSnapshot( const idBitMsgDelta &msg ) {
	//}
}


//CLASS_DECLARATION( idPhysics, idPhysics_Base )
idPhysics_Base.CreateInstance = function() : idClass{
	try {
		var ptr = new idPhysics_Base;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idPhysics_Base.prototype.GetType = function ( ): idTypeInfo {
	return ( idPhysics_Base.Type );
};

idPhysics_Base.eventCallbacks = [
];

idPhysics_Base.Type = new idTypeInfo( "idPhysics_Base", "idPhysics",
	idPhysics_Base.eventCallbacks, idPhysics_Base.CreateInstance, idPhysics_Base.prototype.Spawn,
	idPhysics_Base.prototype.Save, idPhysics_Base.prototype.Restore );

//END_CLASS