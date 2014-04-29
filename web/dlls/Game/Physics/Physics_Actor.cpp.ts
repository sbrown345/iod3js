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
//#ifndef __PHYSICS_ACTOR_H__
//#define __PHYSICS_ACTOR_H__

/*
===================================================================================

Actor physics base class

An actor typically uses one collision model which is aligned with the gravity
direction. The collision model is usually a simple box with the origin at the
bottom center.

===================================================================================
*/

class idPhysics_Actor extends idPhysics_Base {
	//
	//public:
	//	CLASS_PROTOTYPE(idPhysics_Actor);
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idPhysics_Actor>[];
	//
	//	idPhysics_Actor(void);
	//	~idPhysics_Actor(void);
	//
	//	void					Save(idSaveGame *savefile) const;
	//	void					Restore(idRestoreGame *savefile);
	//
	//	// get delta yaw of master
	//	float					GetMasterDeltaYaw(void) const;
	//	// returns the ground entity
	//	idEntity *				GetGroundEntity(void) const;
	//	// align the clip model with the gravity direction
	//	void					SetClipModelAxis(void);
	//
	//public:	// common physics interface
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
	//	const idBounds &		GetBounds(/*int*/ id:number = -1) const;
	//	const idBounds &		GetAbsBounds(/*int*/ id:number = -1) const;
	//
	//	bool					IsPushable(void) const;
	//
	//	const idVec3 &			GetOrigin(/*int*/ id:number = 0) const;
	//	const idMat3 &			GetAxis(/*int*/ id:number = 0) const;
	//
	//	void					SetGravity(const idVec3 &newGravity);
	//	const idMat3 &			GetGravityAxis(void) const;
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
	//
	//protected:
	clipModel: idClipModel; // clip model used for collision detection
	clipModelAxis: idMat3; /*= new idMat3;  */ // axis of clip model aligned with gravity direction

	// derived properties
	mass: number /*float*/;
	invMass: number /*float*/;

	// master
	masterEntity: idEntity;
	masterYaw: number /*float*/;
	masterDeltaYaw: number /*float*/;

	// results of last evaluate
	groundEntityPtr = new idEntityPtr<idEntity> ( );
	//};
	//
	//#endif /* !__PHYSICS_ACTOR_H__ */
	//


	/*
	================
	idPhysics_Actor::idPhysics_Actor
	================
	*/
	constructor ( ) {
		super ( );
		this.clipModel = null;
		this.SetClipModelAxis ( );
		this.mass = 100.0;
		this.invMass = 1.0 / this.mass;
		this.masterEntity = null;
		this.masterYaw = 0.0;
		this.masterDeltaYaw = 0.0;
		this.groundEntityPtr = null;

		assert(this.clipModelAxis); // it should have been created in SetClipModelAxis
	}

	/*
	================
	idPhysics_Actor::~idPhysics_Actor
	================
	*/
	destructor ( ) {
		if ( this.clipModel ) {
			delete this.clipModel;
			this.clipModel = null;
		}
	}
	//
	///*
	//================
	//idPhysics_Actor::Save
	//================
	//*/
	//void idPhysics_Actor::Save( idSaveGame *savefile ) const {
	//
	//	savefile.WriteClipModel( this.clipModel );
	//	savefile.WriteMat3( this.clipModelAxis );
	//
	//	savefile.WriteFloat( this.mass );
	//	savefile.WriteFloat( this.invMass );
	//
	//	savefile.WriteObject( this.masterEntity );
	//	savefile.WriteFloat( masterYaw );
	//	savefile.WriteFloat( this.masterDeltaYaw );
	//
	//	this.groundEntityPtr.Save( savefile );
	//}
	//
	///*
	//================
	//idPhysics_Actor::Restore
	//================
	//*/
	//void idPhysics_Actor::Restore( idRestoreGame *savefile ) {
	//
	//	savefile.ReadClipModel( this.clipModel );
	//	savefile.ReadMat3( this.clipModelAxis );
	//
	//	savefile.ReadFloat( this.mass );
	//	savefile.ReadFloat( this.invMass );
	//
	//	savefile.ReadObject( reinterpret_cast<idClass *&>( this.masterEntity ) );
	//	savefile.ReadFloat( masterYaw );
	//	savefile.ReadFloat( this.masterDeltaYaw );
	//
	//	this.groundEntityPtr.Restore( savefile );
	//}

	/*
	================
	idPhysics_Actor::SetClipModelAxis
	================
	*/
	SetClipModelAxis ( ): void {
		if ( !this.clipModelAxis ) {
			this.clipModelAxis = new idMat3; // it hasn't been created yet in the relevant ctor
		}

		// align clip model to gravity direction
		if ( ( this.gravityNormal[2] == -1.0 ) || ( this.gravityNormal.opEqualTo( vec3_zero ) ) ) {
			this.clipModelAxis.Identity ( );
		} else {
			this.clipModelAxis[2].opEquals( this.gravityNormal.opUnaryMinus ( ) );
			this.clipModelAxis[2].NormalVectors( this.clipModelAxis[0], this.clipModelAxis[1] );
			this.clipModelAxis[1].opEquals( this.clipModelAxis[1].opUnaryMinus ( ) );
		}

		if ( this.clipModel ) {
			this.clipModel.Link_ent( gameLocal.clip, this.self, 0, this.clipModel.GetOrigin ( ), this.clipModelAxis );
		}
	}

	/*
	================
	idPhysics_Actor::GetGravityAxis
	================
	*/
	GetGravityAxis ( ): idMat3 {
		return this.clipModelAxis;
	}

	/*
	================
	idPhysics_Actor::GetMasterDeltaYaw
	================
	*/
	GetMasterDeltaYaw ( ): number /*float*/ {
		return this.masterDeltaYaw;
	}

	/*
	================
	idPhysics_Actor::GetGroundEntity
	================
	*/
	GetGroundEntity ( ): idEntity {
		return this.groundEntityPtr.GetEntity ( );
	}

	/*
	================
	idPhysics_Actor::SetClipModel
	================
	*/
	SetClipModel(model: idClipModel, /*float */density: number, /*int*/ id: number = 0, freeOld: boolean=true ): void {
		assert( this.self );
		assert( model ); // a clip model is required
		assert( model.IsTraceModel ( ) ); // and it should be a trace model
		assert( density > 0.0 ); // density should be valid

		if ( this.clipModel && this.clipModel != model && freeOld ) {
			delete this.clipModel;
		}
		this.clipModel = model;
		this.clipModel.Link_ent( gameLocal.clip, this.self, 0, this.clipModel.GetOrigin ( ), this.clipModelAxis );
	}

	/*
	================
	idPhysics_Actor::GetClipModel
	================
	*/
	GetClipModel( /*int*/ id: number  = 0): idClipModel {
		return this.clipModel;
	}

	/*
	================
	idPhysics_Actor::GetNumClipModels
	================
	*/
	GetNumClipModels ( ): number {
		return 1;
	}

	/*
	================
	idPhysics_Actor::SetMass
	================
	*/
	SetMass( /*float*/ _mass: number, /*int*/ id: number  = -1): void {
		assert( _mass > 0.0 );
		this.mass = _mass;
		this.invMass = 1.0 / _mass;
	}

	/*
	================
	idPhysics_Actor::GetMass
	================
	*/
	GetMass( /*int*/ id: number  = -1): number /*float*/ {
		return this.mass;
	}

	/*
	================
	idPhysics_Actor::SetClipMask
	================
	*/
	SetContents ( /*int*/ contents: number, /*int*/ id: number = -1 ): void {
		this.clipModel.SetContents( contents );
	}

	/*
	================
	idPhysics_Actor::SetClipMask
	================
	*/
	GetContents ( /*int*/ id: number ): number {
		return this.clipModel.GetContents ( );
	}

	/*
	================
	idPhysics_Actor::GetBounds
	================
	*/
	GetBounds ( /*int*/ id: number = -1): idBounds {
		return this.clipModel.GetBounds ( );
	}

	/*
	================
	idPhysics_Actor::GetAbsBounds
	================
	*/
	GetAbsBounds( /*int*/ id: number  = -1): idBounds {
		return this.clipModel.GetAbsBounds ( );
	}

	/*
	================
	idPhysics_Actor::IsPushable
	================
	*/
	IsPushable ( ): boolean {
		return ( this.masterEntity == null );
	}

	/*
	================
	idPhysics_Actor::GetOrigin
	================
	*/
	GetOrigin ( /*int*/ id: number=0 ): idVec3 {
		return this.clipModel.GetOrigin ( );
	}

	/*
	================
	idPhysics_Player::GetAxis
	================
	*/
	GetAxis ( /*int*/ id: number = 0 ): idMat3 {
		return this.clipModel.GetAxis ( );
	}

	/*
	================
	idPhysics_Actor::SetGravity
	================
	*/
	SetGravity ( newGravity: idVec3 ): void {
		if ( newGravity.opNotEqualTo( this.gravityVector ) ) {
			super.SetGravity( newGravity );
			this.SetClipModelAxis ( );
		}
	}

	/*
	================
	idPhysics_Actor::ClipTranslation
	================
	*/
	ClipTranslation ( results: trace_t, translation: idVec3, model: idClipModel ): void {
		todoThrow ( );
		//if ( model ) {
		//	gameLocal.clip.TranslationModel( results, this.clipModel.GetOrigin(), this.clipModel.GetOrigin() + translation,
		//							this.clipModel, this.clipModel.GetAxis(), this.clipMask,
		//							model.Handle(), model.GetOrigin(), model.GetAxis() );
		//}
		//else {
		//	gameLocal.clip.Translation( results, this.clipModel.GetOrigin(), this.clipModel.GetOrigin() + translation,
		//							this.clipModel, this.clipModel.GetAxis(), this.clipMask, this.self );
		//}
	}

	/*
	================
	idPhysics_Actor::ClipRotation
	================
	*/
	//ClipRotation(results:trace_t, rotation:idRotation , model :idClipModel ) :void {
	//	//todoThrow ( );
	//	//if ( model ) {
	//	//	gameLocal.clip.RotationModel( results, this.clipModel.GetOrigin(), rotation,
	//	//							this.clipModel, this.clipModel.GetAxis(), this.clipMask,
	//	//							model.Handle(), model.GetOrigin(), model.GetAxis() );
	//	//}
	//	//else {
	//	//	gameLocal.clip.Rotation( results, this.clipModel.GetOrigin(), rotation,
	//	//							this.clipModel, this.clipModel.GetAxis(), this.clipMask, this.self );
	//	//}
	//}

	/*
	================
	idPhysics_Actor::ClipContents
	================
	*/
	//ClipContents( model :idClipModel ) :number {
	//	if ( model ) {
	//		return gameLocal.clip.ContentsModel( this.clipModel.GetOrigin(), this.clipModel, this.clipModel.GetAxis(), -1,
	//									model.Handle(), model.GetOrigin(), model.GetAxis() );
	//	}
	//	else {
	//		return gameLocal.clip.Contents( this.clipModel.GetOrigin(), this.clipModel, this.clipModel.GetAxis(), -1, NULL );
	//	}
	//}

	/*
	================
	idPhysics_Actor::DisableClip
	================
	*/
	DisableClip ( ): void {
		this.clipModel.Disable ( );
	}

	/*
	================
	idPhysics_Actor::EnableClip
	================
	*/
	EnableClip ( ): void {
		this.clipModel.Enable ( );
	}

	/*
	================
	idPhysics_Actor::UnlinkClip
	================
	*/
	UnlinkClip ( ): void {
		this.clipModel.Unlink ( );
	}

	/*
	================
	idPhysics_Actor::LinkClip
	================
	*/
	LinkClip ( ): void {
		this.clipModel.Link_ent( gameLocal.clip, this.self, 0, this.clipModel.GetOrigin ( ), this.clipModel.GetAxis ( ) );
	}

	/*
	================
	idPhysics_Actor::EvaluateContacts
	================
	*/
	EvaluateContacts ( ): boolean {
		todoThrow ( );
		//// get all the ground contacts
		//this.ClearContacts ( );
		//this.AddGroundContacts( this.clipModel );
		//this.AddContactEntitiesForContacts ( );

		return ( this.contacts.Num ( ) != 0 );
	}
}

//CLASS_DECLARATION(idPhysics_Base, idPhysics_Actor)
idPhysics_Actor.CreateInstance = function() : idClass{
	try {
		var ptr = new idPhysics_Actor;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idPhysics_Actor.prototype.GetType = function ( ): idTypeInfo {
	return ( idPhysics_Actor.Type );
};

idPhysics_Actor.eventCallbacks = [
];

idPhysics_Actor.Type = new idTypeInfo( "idPhysics_Actor", "idPhysics_Base",
	idPhysics_Actor.eventCallbacks, idPhysics_Actor.CreateInstance, idPhysics_Actor.prototype.Spawn,
	idPhysics_Actor.prototype.Save, idPhysics_Actor.prototype.Restore );

//END_CLASS
