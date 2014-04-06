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

//#include "../../idlib/precompiled.h"
//#pragma hdrstop

//#include "../Game_local.h"


//
//
//#ifndef __PHYSICS_H__
//#define __PHYSICS_H__

/*
===============================================================================

Physics abstract class

A physics object is a tool to manipulate the position and orientation of
an entity. The physics object is a container for idClipModels used for
collision detection. The physics deals with moving these collision models
through the world according to the laws of physics or other rules.

The mass of a clip model is the volume of the clip model times the density.
An arbitrary mass can however be set for specific clip models or the
whole physics object. The contents of a clip model is a set of bit flags
that define the contents. The clip mask defines the contents a clip model
collides with.

The linear velocity of a physics object is a vector that defines the
translation of the center of mass in units per second. The angular velocity
of a physics object is a vector that passes through the center of mass. The
direction of this vector defines the axis of rotation and the magnitude
defines the rate of rotation about the axis in radians per second.
The gravity is the change in velocity per second due to gravitational force.

Entities update their visual position and orientation from the physics
using GetOrigin() and GetAxis(). Direct origin and axis changes of
entities should go through the physics. In other words the physics origin
and axis are updated first and the entity updates it's visual position
from the physics.

===============================================================================
*/

var CONTACT_EPSILON = 0.25;				// maximum contact seperation distance

//class idEntity;

class impactInfo_t {
	invMass: number /*float*/; // inverse mass
	invInertiaTensor = new idMat3 ( ); // inverse inertia tensor
	position = new idVec3; // impact position relative to center of mass
	velocity = new idVec3; // velocity at the impact position

	memset0 ( ): void {
		this.invMass = 0;
		this.invInertiaTensor.memset0 ( );
		this.position.memset0 ( );
		this.velocity.memset0 ( );
	}
}


class idPhysics extends idClass {

	//public:
	//ABSTRACT_PROTOTYPE(idPhysics);
	   static	Type:idTypeInfo;
	   static	CreateInstance() : idClass{ throw "placeholder"; }
	   GetType() :idTypeInfo{ throw "placeholder"; }
	   static	eventCallbacks : idEventFunc<idPhysics>[];
	   //
	   //	virtual						~idPhysics();
	   //	static int					SnapTimeToPhysicsFrame(int t);
	   //
	   //	// Must not be virtual
	   //	void						Save(idSaveGame *savefile) const;
	   //	void						Restore(idRestoreGame *savefile);
	   //
	   //public:	// common physics interface
	   //	// set pointer to entity using physics
	   //	virtual void				SetSelf(idEntity *e) = 0;
	   //	// clip models
	   //	virtual void				SetClipModel(idClipModel *model, float density, /*int*/ id:number = 0, bool freeOld = true) = 0;
	   //	virtual void				SetClipBox(const idBounds &bounds, float density);
	   //	virtual idClipModel *		GetClipModel(/*int*/ id:number = 0) const = 0;
	GetNumClipModels ( ): number { throw "placeholder"; }
	//	// get/set the mass of a specific clip model or the whole physics object
	   //	virtual void				SetMass(float mass, /*int*/ id:number = -1) = 0;
	   //	virtual float				GetMass(/*int*/ id:number = -1) const = 0;
	   //	// get/set the contents of a specific clip model or the whole physics object
	   //	virtual void				SetContents(int contents, /*int*/ id:number = -1) = 0;
	   //	virtual int					GetContents(/*int*/ id:number = -1) const = 0;
	   //	// get/set the contents a specific clip model or the whole physics object collides with
	   //	virtual void				SetClipMask(int mask, /*int*/ id:number = -1) = 0;
	   //	virtual int					GetClipMask(/*int*/ id:number = -1) const = 0;
	   //	// get the bounds of a specific clip model or the whole physics object
	   GetBounds(/*int */id = -1):idBounds { throw "placeholder"; }
	   //	virtual const idBounds &	GetAbsBounds(/*int*/ id:number = -1) const = 0;
	   //	// evaluate the physics with the given time step, returns true if the object moved
	   //	virtual bool				Evaluate(int timeStepMSec, int endTimeMSec) = 0;
	   //	// update the time without moving
	   //	virtual void				UpdateTime(int endTimeMSec) = 0;
	   //	// get the last physics update time
	   //	virtual int					GetTime() const = 0;
	   //	// collision interaction between different physics objects
	   //	virtual void				GetImpactInfo(/*int*/ id:number, const idVec3 &point, impactInfo_t *info) const = 0;
	   //	virtual void				ApplyImpulse(/*int*/ id:number, const idVec3 &point, const idVec3 &impulse) = 0;
	   //	virtual void				AddForce(/*int*/ id:number, const idVec3 &point, const idVec3 &force) = 0;
	   //	virtual void				Activate() = 0;
	   //	virtual void				PutToRest() = 0;
	IsAtRest ( ): boolean { throw "placeholder"; }
	//	virtual int					GetRestStartTime() const = 0;
	   //	virtual bool				IsPushable() const = 0;
	   //	// save and restore the physics state
	   //	virtual void				SaveState() = 0;
	   //	virtual void				RestoreState() = 0;
	   //	// set the position and orientation in master space or world space if no master set
	SetOrigin ( newOrigin: idVec3, /*int */id = -1 ) { throw "placeholder"; }
	SetAxis(newAxis: idMat3 , /*int*/ id:number = -1) { throw "placeholder"; }
	   //	// translate or rotate the physics object in world space
	   //	virtual void				Translate(const idVec3 &translation, /*int*/ id:number = -1) = 0;
	   //	virtual void				Rotate(const idRotation &rotation, /*int*/ id:number = -1) = 0;
	   //	// get the position and orientation in world space
	GetOrigin ( /*int */id = 0 ): idVec3 { throw "placeholder"; }
	GetAxis ( /*int */id = 0 ): idMat3 { throw "placeholder"; }
	//	// set linear and angular velocity
	   //	virtual void				SetLinearVelocity(const idVec3 &newLinearVelocity, /*int*/ id:number = 0) = 0;
	   //	virtual void				SetAngularVelocity(const idVec3 &newAngularVelocity, /*int*/ id:number = 0) = 0;
	   //	// get linear and angular velocity
	   //	virtual const idVec3 &		GetLinearVelocity(/*int*/ id:number = 0) const = 0;
	   //	virtual const idVec3 &		GetAngularVelocity(/*int*/ id:number = 0) const = 0;
	   //	// gravity
	   //	virtual void				SetGravity(const idVec3 &newGravity) = 0;
	   //	virtual const idVec3 &		GetGravity() const = 0;
	   //	virtual const idVec3 &		GetGravityNormal() const = 0;
	   //	// get first collision when translating or rotating this physics object
	   //	virtual void				ClipTranslation(trace_t &results, const idVec3 &translation, const idClipModel *model) const = 0;
	   //	virtual void				ClipRotation(trace_t &results, const idRotation &rotation, const idClipModel *model) const = 0;
	   //	virtual int					ClipContents(const idClipModel *model) const = 0;
	   //	// disable/enable the clip models contained by this physics object
	   //	virtual void				DisableClip() = 0;
	   //	virtual void				EnableClip() = 0;
	   //	// link/unlink the clip models contained by this physics object
	   //	virtual void				UnlinkClip() = 0;
	   //	virtual void				LinkClip() = 0;
	   //	// contacts
	   //	virtual bool				EvaluateContacts() = 0;
	   //	virtual int					GetNumContacts() const = 0;
	   //	virtual const contactInfo_t &GetContact(int num) const = 0;
	   //	virtual void				ClearContacts() = 0;
	   //	virtual void				AddContactEntity(idEntity *e) = 0;
	   //	virtual void 				RemoveContactEntity(idEntity *e) = 0;
	   //	// ground contacts
	   //	virtual bool				HasGroundContacts() const = 0;
	   //	virtual bool				IsGroundEntity(int entityNum) const = 0;
	   //	virtual bool				IsGroundClipModel(int entityNum, /*int*/ id:number) const = 0;
	   //	// set the master entity for objects bound to a master
	   //	virtual void				SetMaster(idEntity *master, const bool orientated = true) = 0;
	   //	// set pushed state
	   //	virtual void				SetPushed(int deltaTime) = 0;
	   //	virtual const idVec3 &		GetPushedLinearVelocity(/*int*/ id:number = 0) const = 0;
	   //	virtual const idVec3 &		GetPushedAngularVelocity(/*int*/ id:number = 0) const = 0;
	   //	// get blocking info, returns NULL if the object is not blocked
	   //	virtual const trace_t *		GetBlockingInfo() const = 0;
	   //	virtual idEntity *			GetBlockingEntity() const = 0;
	   //	// movement end times in msec for reached events at the end of predefined motion
	   //	virtual int					GetLinearEndTime() const = 0;
	   //	virtual int					GetAngularEndTime() const = 0;
	   //	// networking
	   //	virtual void				WriteToSnapshot(idBitMsgDelta &msg) const = 0;
	   //	virtual void				ReadFromSnapshot(const idBitMsgDelta &msg) = 0;
	   //};
	   //
	   //#endif /* !__PHYSICS_H__ */
	   //
	   //
	   ///*
	   //================
	   //idPhysics::~idPhysics
	   //================
	   //*/
	   //idPhysics::~idPhysics( void ) {
	   //}
	   //
	   ///*
	   //================
	   //idPhysics::Save
	   //================
	   //*/
	   //void idPhysics::Save( idSaveGame *savefile ) const {
	   //}
	   //
	   ///*
	   //================
	   //idPhysics::Restore
	   //================
	   //*/
	   //void idPhysics::Restore( idRestoreGame *savefile ) {
	   //}
	   //
	   ///*
	   //================
	   //idPhysics::SetClipBox
	   //================
	   //*/
	   //void idPhysics::SetClipBox( const idBounds &bounds, float density ) {
	   //	SetClipModel( new idClipModel( idTraceModel( bounds ) ), density );
	   //}
	   //
	   ///*
	   //================
	   //idPhysics::SnapTimeToPhysicsFrame
	   //================
	   //*/
	   //int idPhysics::SnapTimeToPhysicsFrame( int t ) {
	   //	int s;
	   //	s = t + USERCMD_MSEC - 1;
	   //	return ( s - s % USERCMD_MSEC );
	   //}

}



//ABSTRACT_DECLARATION(idClass, idPhysics)
idPhysics.CreateInstance = function() : idClass{
	gameLocal.Error( "Cannot instanciate abstract class %s.", idPhysics );	
	return null;
};																	

idPhysics.prototype.GetType = function ( ): idTypeInfo {
	return ( idPhysics.Type );
};

idPhysics.eventCallbacks = [
];

idPhysics.Type = new idTypeInfo( "idPhysics", "idClass",
	idPhysics.eventCallbacks, idPhysics.CreateInstance, idPhysics.prototype.Spawn,
	idPhysics.prototype.Save, idPhysics.prototype.Restore );

//END_CLASS