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
////const float STOP_SPEED		= 10.0;
////
////
////#undef RB_TIMINGS
////
////#ifdef RB_TIMINGS
////static int lastTimerReset = 0;
////static int numRigidBodies = 0;
////static idTimer timer_total, timer_collision;
////#endif
////
////
////#ifndef __PHYSICS_RIGIDBODY_H__
////#define __PHYSICS_RIGIDBODY_H__
////
/////*
////===================================================================================
////
////Rigid body physics
////
////Employs an impulse based dynamic simulation which is not very accurate but
////relatively fast and still reliable due to the continuous collision detection.
////
////===================================================================================
////*/
////
////extern const float	RB_VELOCITY_MAX;
////extern const int	RB_VELOCITY_TOTAL_BITS;
////extern const int	RB_VELOCITY_EXPONENT_BITS;
////extern const int	RB_VELOCITY_MANTISSA_BITS;
////
class rigidBodyIState_t {
	position = new idVec3;					// position of trace model
	orientation = new idMat3;				// orientation of trace model
	linearMomentum = new idVec3;				// translational momentum relative to center of mass
	angularMomentum = new idVec3;			// rotational momentum relative to center of mass
}


class rigidBodyPState_t {
	atRest :number/*int*/;						// set when simulation is suspended
	lastTimeStep :number/*float*/;				// length of last time step
	localOrigin = new idVec3;				// origin relative to master
	localAxis = new idMat3;					// axis relative to master
	pushVelocity = new idVec6;				// push velocity
	externalForce = new idVec3;				// external force relative to center of mass
	externalTorque = new idVec3;				// external torque relative to center of mass
	i = new rigidBodyIState_t;							// state used for integration
}

class idPhysics_RigidBody extends idPhysics_Base {
////
////public:
////
////	CLASS_PROTOTYPE(idPhysics_RigidBody);
	static	Type:idTypeInfo;						
	static	CreateInstance( ): idClass {throw "placeholder";}
	GetType( ):idTypeInfo {throw "placeholder";}
	static	eventCallbacks : idEventFunc<idPhysics_RigidBody>[];
////
////	idPhysics_RigidBody(void);
////	~idPhysics_RigidBody(void);
////
////	void					Save(idSaveGame *savefile) const;
////	void					Restore(idRestoreGame *savefile);
////
////	// initialisation
////	void					SetFriction(const float linear, const float angular, const float contact);
////	void					SetBouncyness(const float b);
////	// same as above but drop to the floor first
////	void					DropToFloor(void);
////	// no contact determination and contact friction
////	void					NoContact(void);
////	// enable/disable activation by impact
////	void					EnableImpact(void);
////	void					DisableImpact(void);
////
////public:	// common physics interface
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
////
////	void					SetPushed(int deltaTime);
////	const idVec3 &			GetPushedLinearVelocity(/*int*/ id:number = 0) const;
////	const idVec3 &			GetPushedAngularVelocity(/*int*/ id:number = 0) const;
////
////	void					SetMaster(idEntity *master, const bool orientated);
////
////	void					WriteToSnapshot(idBitMsgDelta &msg) const;
////	void					ReadFromSnapshot(const idBitMsgDelta &msg);
////
////private:
		// state of the rigid body
		current = new rigidBodyPState_t;
		saved = new rigidBodyPState_t;
	
	// rigid body properties
	linearFriction :number/*float*/;				// translational friction
	angularFriction :number/*float*/;			// rotational friction
	contactFriction :number/*float*/;			// friction with contact surfaces
	bouncyness :number/*float*/;					// bouncyness
	clipModel:idClipModel;					// clip model used for collision detection
	
	// derived properties
	mass :number/*float*/;						// mass of body
	inverseMass :number/*float*/;				// 1 / mass
	centerOfMass = new idVec3;				// center of mass of trace model
	inertiaTensor = new idMat3;				// mass distribution
	inverseInertiaTensor = new idMat3;		// inverse inertia tensor
	
	//integrator:idODE;					// integrator
	dropToFloor:boolean;				// true if dropping to the floor and putting to rest
	testSolid:boolean;					// true if testing for solid when dropping to the floor
	noImpact:boolean;					// if true do not activate when another object collides
	noContact:boolean;					// if true do not determine contacts and no contact friction
	
	// master
	hasMaster:boolean;
	isOrientated:boolean;
////
////private:
////	friend void				RigidBodyDerivatives(const float t, const void *clientData, const float *state, float *derivatives);
////	void					Integrate(const float deltaTime, rigidBodyPState_t &next);
////	bool					CheckForCollisions(const float deltaTime, rigidBodyPState_t &next, trace_t &collision);
////	bool					CollisionImpulse(const trace_t &collision, idVec3 &impulse);
////	void					ContactFriction(float deltaTime);
////	void					DropToFloorAndRest(void);
////	bool					TestIfAtRest(void) const;
////	void					Rest(void);
////	void					DebugDraw(void);
////};
////
////#endif /* !__PHYSICS_RIGIDBODY_H__ */
////
////
////
/////*
////================
////RigidBodyDerivatives
////================
////*/
////void RigidBodyDerivatives( const float t, const void *clientData, const float *state, float *derivatives ) {
////	const idPhysics_RigidBody *p = (idPhysics_RigidBody *) clientData;
////	rigidBodyIState_t *s = (rigidBodyIState_t *) state;
////	// NOTE: this struct should be build conform rigidBodyIState_t
////	struct rigidBodyDerivatives_s {
////		idVec3				linearVelocity;
////		idMat3				angularMatrix;
////		idVec3				force;
////		idVec3				torque;
////	} *d = (struct rigidBodyDerivatives_s *) derivatives;
////	idVec3 angularVelocity;
////	idMat3 inverseWorldInertiaTensor;
////
////	inverseWorldInertiaTensor = s.orientation * p.inverseInertiaTensor * s.orientation.Transpose();
////	angularVelocity = inverseWorldInertiaTensor * s.angularMomentum;
////	// derivatives
////	d.linearVelocity = p.inverseMass * s.linearMomentum;
////	d.angularMatrix = SkewSymmetric( angularVelocity ) * s.orientation;
////	d.force = - p.linearFriction * s.linearMomentum + p.current.externalForce;
////	d.torque = - p.angularFriction * s.angularMomentum + p.current.externalTorque;
////}
////
/////*
////================
////idPhysics_RigidBody::Integrate
////
////  Calculate next state from the current state using an integrator.
////================
////*/
////void idPhysics_RigidBody::Integrate( float deltaTime, rigidBodyPState_t &next ) {
////	idVec3 position;
////
////	position = this.current.i.position;
////	this.current.i.position += this.centerOfMass * this.current.i.orientation;
////
////	this.current.i.orientation.TransposeSelf();
////
////	integrator.Evaluate( (float *) &current.i, (float *) &next.i, 0, deltaTime );
////	next.i.orientation.OrthoNormalizeSelf();
////
////	// apply gravity
////	next.i.linearMomentum += deltaTime * gravityVector * this.mass;
////
////	this.current.i.orientation.TransposeSelf();
////	next.i.orientation.TransposeSelf();
////
////	this.current.i.position = position;
////	next.i.position -= this.centerOfMass * next.i.orientation;
////
////	next.atRest = this.current.atRest;
////}
////
/////*
////================
////idPhysics_RigidBody::CollisionImpulse
////
////  Calculates the collision impulse using the velocity relative to the collision object.
////  The current state should be set to the moment of impact.
////================
////*/
////bool idPhysics_RigidBody::CollisionImpulse( const trace_t &collision, idVec3 &impulse ) {
////	idVec3 r, linearVelocity, angularVelocity, velocity;
////	idMat3 inverseWorldInertiaTensor;
////	float impulseNumerator, impulseDenominator, vel;
////	impactInfo_t info;
////	idEntity *ent;
////
////	// get info from other entity involved
////	ent = gameLocal.entities[collision.c.entityNum];
////	ent.GetImpactInfo( this.self, collision.c.id, collision.c.point, &info );
////
////	// collision point relative to the body center of mass
////	r = collision.c.point - ( this.current.i.position + this.centerOfMass * this.current.i.orientation );
////	// the velocity at the collision point
////	linearVelocity = this.inverseMass * this.current.i.linearMomentum;
////	inverseWorldInertiaTensor = this.current.i.orientation.Transpose() * inverseInertiaTensor * this.current.i.orientation;
////	angularVelocity = inverseWorldInertiaTensor * this.current.i.angularMomentum;
////	velocity = linearVelocity + angularVelocity.Cross(r);
////	// subtract velocity of other entity
////	velocity -= info.velocity;
////
////	// velocity in normal direction
////	vel = velocity * collision.c.normal;
////
////	if ( vel > -STOP_SPEED ) {
////		impulseNumerator = STOP_SPEED;
////	}
////	else {
////		impulseNumerator = -( 1.0 + this.bouncyness ) * vel;
////	}
////	impulseDenominator = this.inverseMass + ( ( inverseWorldInertiaTensor * r.Cross( collision.c.normal ) ).Cross( r ) * collision.c.normal );
////	if ( info.invMass ) {
////		impulseDenominator += info.invMass + ( ( info.invInertiaTensor * info.position.Cross( collision.c.normal ) ).Cross( info.position ) * collision.c.normal );
////	}
////	impulse = (impulseNumerator / impulseDenominator) * collision.c.normal;
////
////	// update linear and angular momentum with impulse
////	this.current.i.linearMomentum += impulse;
////	this.current.i.angularMomentum += r.Cross(impulse);
////
////	// if no movement at all don't blow up
////	if ( collision.fraction < 0.0001f ) {
////		this.current.i.linearMomentum *= 0.5f;
////		this.current.i.angularMomentum *= 0.5f;
////	}
////
////	// callback to self to let the entity know about the collision
////	return this.self.Collide( collision, velocity );
////}
////
/////*
////================
////idPhysics_RigidBody::CheckForCollisions
////
////  Check for collisions between the current and next state.
////  If there is a collision the next state is set to the state at the moment of impact.
////================
////*/
////bool idPhysics_RigidBody::CheckForCollisions( const float deltaTime, rigidBodyPState_t &next, trace_t &collision ) {
//////#define TEST_COLLISION_DETECTION
////	idMat3 axis;
////	idRotation rotation;
////	bool collided = false;
////
////#ifdef TEST_COLLISION_DETECTION
////	bool startsolid;
////	if ( gameLocal.clip.Contents( this.current.i.position, this.clipModel, this.current.i.orientation, clipMask, this.self ) ) {
////		startsolid = true;
////	}
////#endif
////
////	TransposeMultiply( this.current.i.orientation, next.i.orientation, axis );
////	rotation = axis.ToRotation();
////	rotation.SetOrigin( this.current.i.position );
////
////	// if there was a collision
////	if ( gameLocal.clip.Motion( collision, this.current.i.position, next.i.position, rotation, this.clipModel, this.current.i.orientation, clipMask, this.self ) ) {
////		// set the next state to the state at the moment of impact
////		next.i.position = collision.endpos;
////		next.i.orientation = collision.endAxis;
////		next.i.linearMomentum = this.current.i.linearMomentum;
////		next.i.angularMomentum = this.current.i.angularMomentum;
////		collided = true;
////	}
////
////#ifdef TEST_COLLISION_DETECTION
////	if ( gameLocal.clip.Contents( next.i.position, this.clipModel, next.i.orientation, clipMask, this.self ) ) {
////		if ( !startsolid ) {
////			int bah = 1;
////		}
////	}
////#endif
////	return collided;
////}
////
/////*
////================
////idPhysics_RigidBody::ContactFriction
////
////  Does not solve friction for multiple simultaneous contacts but applies contact friction in isolation.
////  Uses absolute velocity at the contact points instead of the velocity relative to the contact object.
////================
////*/
////void idPhysics_RigidBody::ContactFriction( float deltaTime ) {
////	var/*int*/i:number;
////	float magnitude, impulseNumerator, impulseDenominator;
////	idMat3 inverseWorldInertiaTensor;
////	idVec3 linearVelocity, angularVelocity;
////	idVec3 massCenter, r, velocity, normal, impulse, normalVelocity;
////
////	inverseWorldInertiaTensor = this.current.i.orientation.Transpose() * this.inverseInertiaTensor * this.current.i.orientation;
////
////	massCenter = this.current.i.position + this.centerOfMass * this.current.i.orientation;
////
////	for ( i = 0; i < contacts.Num(); i++ ) {
////
////		r = contacts[i].point - massCenter;
////
////		// calculate velocity at contact point
////		linearVelocity = this.inverseMass * this.current.i.linearMomentum;
////		angularVelocity = inverseWorldInertiaTensor * this.current.i.angularMomentum;
////		velocity = linearVelocity + angularVelocity.Cross(r);
////
////		// velocity along normal vector
////		normalVelocity = ( velocity * contacts[i].normal ) * contacts[i].normal;
////
////		// calculate friction impulse
////		normal = -( velocity - normalVelocity );
////		magnitude = normal.Normalize();
////		impulseNumerator = contactFriction * magnitude;
////		impulseDenominator = this.inverseMass + ( ( inverseWorldInertiaTensor * r.Cross( normal ) ).Cross( r ) * normal );
////		impulse = (impulseNumerator / impulseDenominator) * normal;
////
////		// apply friction impulse
////		this.current.i.linearMomentum += impulse;
////		this.current.i.angularMomentum += r.Cross(impulse);
////
////		// if moving towards the surface at the contact point
////		if ( normalVelocity * contacts[i].normal < 0.0 ) {
////			// calculate impulse
////			normal = -normalVelocity;
////			impulseNumerator = normal.Normalize();
////			impulseDenominator = this.inverseMass + ( ( inverseWorldInertiaTensor * r.Cross( normal ) ).Cross( r ) * normal );
////			impulse = (impulseNumerator / impulseDenominator) * normal;
////
////			// apply impulse
////			this.current.i.linearMomentum += impulse;
////			this.current.i.angularMomentum += r.Cross( impulse );
////		}
////	}
////}
////
/////*
////================
////idPhysics_RigidBody::TestIfAtRest
////
////  Returns true if the body is considered at rest.
////  Does not catch all cases where the body is at rest but is generally good enough.
////================
////*/
////bool idPhysics_RigidBody::TestIfAtRest( ) const {
////	var/*int*/i:number;
////	float gv;
////	idVec3 v, av, normal, point;
////	idMat3 inverseWorldInertiaTensor;
////	idFixedWinding contactWinding;
////
////	if ( this.current.atRest >= 0 ) {
////		return true;
////	}
////
////	// need at least 3 contact points to come to rest
////	if ( contacts.Num() < 3 ) {
////		return false;
////	}
////
////	// get average contact plane normal
////	normal.Zero();
////	for ( i = 0; i < contacts.Num(); i++ ) {
////		normal += contacts[i].normal;
////	}
////	normal /= (float) contacts.Num();
////	normal.Normalize();
////
////	// if on a too steep surface
////	if ( (normal * gravityNormal) > -0.7f ) {
////		return false;
////	}
////
////	// create bounds for contact points
////	contactWinding.Clear();
////	for ( i = 0; i < contacts.Num(); i++ ) {
////		// project point onto plane through origin orthogonal to the gravity
////		point = contacts[i].point - (contacts[i].point * gravityNormal) * gravityNormal;
////		contactWinding.AddToConvexHull( point, gravityNormal );
////	}
////
////	// need at least 3 contact points to come to rest
////	if ( contactWinding.GetNumPoints() < 3 ) {
////		return false;
////	}
////
////	// center of mass in world space
////	point = this.current.i.position + this.centerOfMass * this.current.i.orientation;
////	point -= (point * gravityNormal) * gravityNormal;
////
////	// if the point is not inside the winding
////	if ( !contactWinding.PointInside( gravityNormal, point, 0 ) ) {
////		return false;
////	}
////
////	// linear velocity of body
////	v = this.inverseMass * this.current.i.linearMomentum;
////	// linear velocity in gravity direction
////	gv = v * gravityNormal;
////	// linear velocity orthogonal to gravity direction
////	v -= gv * gravityNormal;
////
////	// if too much velocity orthogonal to gravity direction
////	if ( v.Length() > STOP_SPEED ) {
////		return false;
////	}
////	// if too much velocity in gravity direction
////	if ( gv > 2.0 * STOP_SPEED || gv < -2.0 * STOP_SPEED ) {
////		return false;
////	}
////
////	// calculate rotational velocity
////	inverseWorldInertiaTensor = this.current.i.orientation * this.inverseInertiaTensor * this.current.i.orientation.Transpose();
////	av = inverseWorldInertiaTensor * this.current.i.angularMomentum;
////
////	// if too much rotational velocity
////	if ( av.LengthSqr() > STOP_SPEED ) {
////		return false;
////	}
////
////	return true;
////}
////
/////*
////================
////idPhysics_RigidBody::DropToFloorAndRest
////
////  Drops the object straight down to the floor and verifies if the object is at rest on the floor.
////================
////*/
////void idPhysics_RigidBody::DropToFloorAndRest( ) {
////	idVec3 down;
////	trace_t tr;
////
////	if ( this.testSolid ) {
////
////		this.testSolid = false;
////
////		if ( gameLocal.clip.Contents( this.current.i.position, this.clipModel, this.current.i.orientation, clipMask, this.self ) ) {
////			gameLocal.DWarning( "rigid body in solid for entity '%s' type '%s' at (%s)",
////								this.self.name.c_str(), this.self.GetType().classname, this.current.i.position.ToString(0) );
////			Rest();
////			this.dropToFloor = false;
////			return;
////		}
////	}
////
////	// put the body on the floor
////	down = this.current.i.position + gravityNormal * 128.0;
////	gameLocal.clip.Translation( tr, this.current.i.position, down, this.clipModel, this.current.i.orientation, clipMask, this.self );
////	this.current.i.position = tr.endpos;
////	this.clipModel.Link( gameLocal.clip, this.self, this.clipModel.GetId(), tr.endpos, this.current.i.orientation );
////
////	// if on the floor already
////	if ( tr.fraction == 0.0 ) {
////		// test if we are really at rest
////		EvaluateContacts();
////		if ( !TestIfAtRest() ) {
////			gameLocal.DWarning( "rigid body not at rest for entity '%s' type '%s' at (%s)",
////								this.self.name.c_str(), this.self.GetType().classname, this.current.i.position.ToString(0) );
////		}
////		Rest();
////		this.dropToFloor = false;
////	} else if ( IsOutsideWorld() ) {
////		gameLocal.Warning( "rigid body outside world bounds for entity '%s' type '%s' at (%s)",
////							this.self.name.c_str(), this.self.GetType().classname, this.current.i.position.ToString(0) );
////		Rest();
////		this.dropToFloor = false;
////	}
////}
////
/////*
////================
////idPhysics_RigidBody::DebugDraw
////================
////*/
////void idPhysics_RigidBody::DebugDraw( ) {
////
////	if ( rb_showBodies.GetBool() || ( rb_showActive.GetBool() && this.current.atRest < 0 ) ) {
////		collisionModelManager.DrawModel( this.clipModel.Handle(), this.clipModel.GetOrigin(), this.clipModel.GetAxis(), vec3_origin, 0.0 );
////	}
////
////	if ( rb_showMass.GetBool() ) {
////		gameRenderWorld.DrawText( va( "\n%1.2f", this.mass ), this.current.i.position, 0.08f, colorCyan, gameLocal.GetLocalPlayer().viewAngles.ToMat3(), 1 );
////	}
////
////	if ( rb_showInertia.GetBool() ) {
////		idMat3 &I = this.inertiaTensor;
////		gameRenderWorld.DrawText( va( "\n\n\n( %.1f %.1f %.1f )\n( %.1f %.1f %.1f )\n( %.1f %.1f %.1f )",
////									I[0].x, I[0].y, I[0].z,
////									I[1].x, I[1].y, I[1].z,
////									I[2].x, I[2].y, I[2].z ),
////									this.current.i.position, 0.05f, colorCyan, gameLocal.GetLocalPlayer().viewAngles.ToMat3(), 1 );
////	}
////
////	if ( rb_showVelocity.GetBool() ) {
////		DrawVelocity( this.clipModel.GetId(), 0.1, 4.0 );
////	}
////}
////
/////*
////================
////idPhysics_RigidBody::idPhysics_RigidBody
////================
////*/
////idPhysics_RigidBody::idPhysics_RigidBody( ) {
////
////	// set default rigid body properties
////	SetClipMask( MASK_SOLID );
////	SetBouncyness( 0.6f );
////	SetFriction( 0.6f, 0.6f, 0.0 );
////	this.clipModel = NULL;
////
////	memset( &current, 0, sizeof( this.current ) );
////
////	this.current.atRest = -1;
////	this.current.lastTimeStep = USERCMD_MSEC;
////
////	this.current.i.position.Zero();
////	this.current.i.orientation.Identity();
////
////	this.current.i.linearMomentum.Zero();
////	this.current.i.angularMomentum.Zero();
////
////	this.saved = this.current;
////
////	this.mass = 1.0;
////	this.inverseMass = 1.0;
////	this.centerOfMass.Zero();
////	this.inertiaTensor.Identity();
////	this.inverseInertiaTensor.Identity();
////
////	// use the least expensive euler integrator
////	integrator = new idODE_Euler( sizeof(rigidBodyIState_t) / sizeof(float), RigidBodyDerivatives, this );
////
////	this.dropToFloor = false;
////	this.noImpact = false;
////	this.noContact = false;
////
////	this.hasMaster = false;
////	this.isOrientated = false;
////
////#ifdef RB_TIMINGS
////	lastTimerReset = 0;
////#endif
////}
////
/////*
////================
////idPhysics_RigidBody::~idPhysics_RigidBody
////================
////*/
////idPhysics_RigidBody::~idPhysics_RigidBody( ) {
////	if ( this.clipModel ) {
////		delete this.clipModel;
////		this.clipModel = NULL;
////	}
////	delete integrator;
////}
////
/////*
////================
////idPhysics_RigidBody_SavePState
////================
////*/
////void idPhysics_RigidBody_SavePState( idSaveGame *savefile, const rigidBodyPState_t &state ) {
////	savefile.WriteInt( state.atRest );
////	savefile.WriteFloat( state.lastTimeStep );
////	savefile.WriteVec3( state.localOrigin );
////	savefile.WriteMat3( state.localAxis );
////	savefile.WriteVec6( state.pushVelocity );
////	savefile.WriteVec3( state.externalForce );
////	savefile.WriteVec3( state.externalTorque );
////
////	savefile.WriteVec3( state.i.position );
////	savefile.WriteMat3( state.i.orientation );
////	savefile.WriteVec3( state.i.linearMomentum );
////	savefile.WriteVec3( state.i.angularMomentum );
////}
////
/////*
////================
////idPhysics_RigidBody_RestorePState
////================
////*/
////void idPhysics_RigidBody_RestorePState( idRestoreGame *savefile, rigidBodyPState_t &state ) {
////	savefile.ReadInt( state.atRest );
////	savefile.ReadFloat( state.lastTimeStep );
////	savefile.ReadVec3( state.localOrigin );
////	savefile.ReadMat3( state.localAxis );
////	savefile.ReadVec6( state.pushVelocity );
////	savefile.ReadVec3( state.externalForce );
////	savefile.ReadVec3( state.externalTorque );
////
////	savefile.ReadVec3( state.i.position );
////	savefile.ReadMat3( state.i.orientation );
////	savefile.ReadVec3( state.i.linearMomentum );
////	savefile.ReadVec3( state.i.angularMomentum );
////}
////
/////*
////================
////idPhysics_RigidBody::Save
////================
////*/
////void idPhysics_RigidBody::Save( idSaveGame *savefile ) const {
////
////	idPhysics_RigidBody_SavePState( savefile, this.current );
////	idPhysics_RigidBody_SavePState( savefile, this.saved );
////
////	savefile.WriteFloat( linearFriction );
////	savefile.WriteFloat( angularFriction );
////	savefile.WriteFloat( contactFriction );
////	savefile.WriteFloat( this.bouncyness );
////	savefile.WriteClipModel( this.clipModel );
////
////	savefile.WriteFloat( this.mass );
////	savefile.WriteFloat( this.inverseMass );
////	savefile.WriteVec3( this.centerOfMass );
////	savefile.WriteMat3( this.inertiaTensor );
////	savefile.WriteMat3( this.inverseInertiaTensor );
////
////	savefile.WriteBool( this.dropToFloor );
////	savefile.WriteBool( this.testSolid );
////	savefile.WriteBool( this.noImpact );
////	savefile.WriteBool( this.noContact );
////
////	savefile.WriteBool( this.hasMaster );
////	savefile.WriteBool( this.isOrientated );
////}
////
/////*
////================
////idPhysics_RigidBody::Restore
////================
////*/
////void idPhysics_RigidBody::Restore( idRestoreGame *savefile ) {
////
////	idPhysics_RigidBody_RestorePState( savefile, this.current );
////	idPhysics_RigidBody_RestorePState( savefile, this.saved );
////
////	savefile.ReadFloat( linearFriction );
////	savefile.ReadFloat( angularFriction );
////	savefile.ReadFloat( contactFriction );
////	savefile.ReadFloat( this.bouncyness );
////	savefile.ReadClipModel( this.clipModel );
////
////	savefile.ReadFloat( this.mass );
////	savefile.ReadFloat( this.inverseMass );
////	savefile.ReadVec3( this.centerOfMass );
////	savefile.ReadMat3( this.inertiaTensor );
////	savefile.ReadMat3( this.inverseInertiaTensor );
////
////	savefile.ReadBool( this.dropToFloor );
////	savefile.ReadBool( this.testSolid );
////	savefile.ReadBool( this.noImpact );
////	savefile.ReadBool( this.noContact );
////
////	savefile.ReadBool( this.hasMaster );
////	savefile.ReadBool( this.isOrientated );
////}

/*
================
idPhysics_RigidBody::SetClipModel
================
*/
static MAX_INERTIA_SCALE		= 10.0;

	SetClipModel ( model: idClipModel, /*float*/ density: number, /*int*/ id: number = 0, freeOld = true ): void {
		var /*int */minIndex: number;
		var inertiaScale = new idMat3;

		assert( this.self );
		assert( model ); // we need a clip model
		assert( model.IsTraceModel ( ) ); // and it should be a trace model
		assert( density > 0.0 ); // density should be valid

		if ( this.clipModel && this.clipModel != model && freeOld ) {
			$delete( this.clipModel );
			delete this.clipModel;
		}
		this.clipModel = model;
		this.clipModel.Link_ent( gameLocal.clip, this.self, 0, this.current.i.position, this.current.i.orientation );

		// get mass properties from the trace model
		var $mass = new R( this.mass );
		this.clipModel.GetMassProperties( density, $mass, this.centerOfMass, this.inertiaTensor );
		this.mass = $mass.$;

		// check whether or not the clip model has valid mass properties
		if ( this.mass <= 0.0 || FLOAT_IS_NAN( this.mass ) ) {
			gameLocal.Warning( "idPhysics_RigidBody::SetClipModel: invalid mass for entity '%s' type '%s'",
				this.self.name.c_str ( ), this.self.GetType ( ).classname );
			this.mass = 1.0;
			this.centerOfMass.Zero ( );
			this.inertiaTensor.Identity ( );
		}

		// check whether or not the inertia tensor is balanced
		minIndex = Min3Index( this.inertiaTensor[0][0], this.inertiaTensor[1][1], this.inertiaTensor[2][2] );
		inertiaScale.Identity ( );
		inertiaScale[0][0] = this.inertiaTensor[0][0] / this.inertiaTensor[minIndex][minIndex];
		inertiaScale[1][1] = this.inertiaTensor[1][1] / this.inertiaTensor[minIndex][minIndex];
		inertiaScale[2][2] = this.inertiaTensor[2][2] / this.inertiaTensor[minIndex][minIndex];

		if ( inertiaScale[0][0] > idPhysics_RigidBody.MAX_INERTIA_SCALE || inertiaScale[1][1] > idPhysics_RigidBody.MAX_INERTIA_SCALE || inertiaScale[2][2] > idPhysics_RigidBody.MAX_INERTIA_SCALE ) {
			gameLocal.DWarning( "idPhysics_RigidBody::SetClipModel: unbalanced inertia tensor for entity '%s' type '%s'",
				this.self.name.c_str ( ), this.self.GetType ( ).classname );
			var /*float */min = this.inertiaTensor[minIndex][minIndex] * idPhysics_RigidBody.MAX_INERTIA_SCALE;
			inertiaScale[( minIndex + 1 ) % 3][( minIndex + 1 ) % 3] = min / this.inertiaTensor[( minIndex + 1 ) % 3][( minIndex + 1 ) % 3];
			inertiaScale[( minIndex + 2 ) % 3][( minIndex + 2 ) % 3] = min / this.inertiaTensor[( minIndex + 2 ) % 3][( minIndex + 2 ) % 3];
			this.inertiaTensor.opMultiplicationAssignment( inertiaScale );
		}

		this.inverseMass = 1.0 / this.mass;

		this.inverseInertiaTensor.opEquals( this.inertiaTensor.Inverse ( ).opMultiplication_float( ( 1.0 / 6.0 ) ) );

		this.current.i.linearMomentum.Zero ( );
		this.current.i.angularMomentum.Zero ( );
	}

/*
================
idPhysics_RigidBody::GetClipModel
================
*/
	GetClipModel( /*int*/ id: number  = 0): idClipModel {
	return this.clipModel;
}

/*
================
idPhysics_RigidBody::GetNumClipModels
================
*/
	GetNumClipModels ( ): number {
		return 1;
	}

/*
================
idPhysics_RigidBody::SetMass
================
*/
SetMass(/*float*/ mass:number, /*int*/ id:number = -1  ):void {
	assert(mass > 0.0);
	todoThrow ( );
	//this.inertiaTensor *= mass / this.mass;
	//this.inverseInertiaTensor = this.inertiaTensor.Inverse() * (1.0 / 6.0);
	//this.mass = mass;
	//this.inverseMass = 1.0 / mass;
}

/*
================
idPhysics_RigidBody::GetMass
================
*/
	GetMass ( /*int*/ id: number = -1 ): number {
		return this.mass;
	}

/*
================
idPhysics_RigidBody::SetFriction
================
*/
	SetFriction ( /*float */linear: number, /*float */angular: number, /*float */contact: number ): void {
		if ( linear < 0.0 || linear > 1.0 ||
			angular < 0.0 || angular > 1.0 ||
			contact < 0.0 || contact > 1.0 ) {
			return;
		}
		this.linearFriction = linear;
		this.angularFriction = angular;
		this.contactFriction = contact;
	}

/*
================
idPhysics_RigidBody::SetBouncyness
================
*/
	SetBouncyness ( /*float */b: number ): void {
		if ( b < 0.0 || b > 1.0 ) {
			return;
		}
		this.bouncyness = b;
	}

/*
================
idPhysics_RigidBody::Rest
================
*/
	Rest ( ): void {
		this.current.atRest = gameLocal.time;
		this.current.i.linearMomentum.Zero ( );
		this.current.i.angularMomentum.Zero ( );
		this.self.BecomeInactive( TH_PHYSICS );
	}

/*
================
idPhysics_RigidBody::DropToFloor
================
*/
	DropToFloor ( ): void {
		this.dropToFloor = true;
		this.testSolid = true;
	}

/*
================
idPhysics_RigidBody::NoContact
================
*/
	NoContact ( ): void {
		this.noContact = true;
	}

/*
================
idPhysics_RigidBody::Activate
================
*/
	Activate ( ): void {
		this.current.atRest = -1;
		this.self.BecomeActive( TH_PHYSICS );
	}

/*
================
idPhysics_RigidBody::PutToRest

  put to rest untill something collides with this physics object
================
*/
	PutToRest ( ): void {
		this.Rest ( );
	}

/*
================
idPhysics_RigidBody::EnableImpact
================
*/
EnableImpact( ):void {
	this.noImpact = false;
}

/*
================
idPhysics_RigidBody::DisableImpact
================
*/
DisableImpact( ):void {
	this.noImpact = true;
}

/*
================
idPhysics_RigidBody::SetContents
================
*/
	SetContents ( /*int*/ contents: number, /*int*/ id: number = -1 ): void {
		this.clipModel.SetContents( contents );
	}

/*
================
idPhysics_RigidBody::GetContents
================
*/
GetContents( /*int*/ id:number  = -1) :number/*int*/ {
	return this.clipModel.GetContents();
}

/*
================
idPhysics_RigidBody::GetBounds
================
*/
	GetBounds( /*int*/ id: number  = -1): idBounds {
		return this.clipModel.GetBounds ( );
	}

/*
================
idPhysics_RigidBody::GetAbsBounds
================
*/
	GetAbsBounds ( /*int*/ id: number = -1 ): idBounds {
		return this.clipModel.GetAbsBounds ( );
	}

/////*
////================
////idPhysics_RigidBody::Evaluate
////
////  Evaluate the impulse based rigid body physics.
////  When a collision occurs an impulse is applied at the moment of impact but
////  the remaining time after the collision is ignored.
////================
////*/
////bool idPhysics_RigidBody::Evaluate( int timeStepMSec, int endTimeMSec ) {
////	rigidBodyPState_t next;
////	var angles = new idAngles;
////	trace_t collision;
////	idVec3 impulse;
////	idEntity *ent;
////	idVec3 oldOrigin, masterOrigin;
////	idMat3 oldAxis, masterAxis;
////	float timeStep;
////	bool collided, cameToRest = false;
////
////	timeStep = MS2SEC( timeStepMSec );
////	this.current.lastTimeStep = timeStep;
////
////	if ( this.hasMaster ) {
////		oldOrigin = this.current.i.position;
////		oldAxis = this.current.i.orientation;
////		this.self.GetMasterPosition( masterOrigin, masterAxis );
////		this.current.i.position = masterOrigin + this.current.localOrigin * masterAxis;
////		if ( this.isOrientated ) {
////			this.current.i.orientation = this.current.localAxis * masterAxis;
////		}
////		else {
////			this.current.i.orientation = this.current.localAxis;
////		}
////		this.clipModel.Link( gameLocal.clip, this.self, this.clipModel.GetId(), this.current.i.position, this.current.i.orientation );
////		this.current.i.linearMomentum = this.mass * ( ( this.current.i.position - oldOrigin ) / timeStep );
////		this.current.i.angularMomentum = this.inertiaTensor * ( ( this.current.i.orientation * oldAxis.Transpose() ).ToAngularVelocity() / timeStep );
////		this.current.externalForce.Zero();
////		this.current.externalTorque.Zero();
////
////		return ( this.current.i.position != oldOrigin || this.current.i.orientation != oldAxis );
////	}
////
////	// if the body is at rest
////	if ( this.current.atRest >= 0 || timeStep <= 0.0 ) {
////		DebugDraw();
////		return false;
////	}
////
////	// if putting the body to rest
////	if ( this.dropToFloor ) {
////		DropToFloorAndRest();
////		this.current.externalForce.Zero();
////		this.current.externalTorque.Zero();
////		return true;
////	}
////
////#ifdef RB_TIMINGS
////	timer_total.Start();
////#endif
////
////	// move the rigid body velocity into the frame of a pusher
//////	this.current.i.linearMomentum -= this.current.pushVelocity.SubVec3( 0 ) * this.mass;
//////	this.current.i.angularMomentum -= this.current.pushVelocity.SubVec3( 1 ) * this.inertiaTensor;
////
////	this.clipModel.Unlink();
////
////	next = this.current;
////
////	// calculate next position and orientation
////	Integrate( timeStep, next );
////
////#ifdef RB_TIMINGS
////	timer_collision.Start();
////#endif
////
////	// check for collisions from the this.current to the next state
////	collided = CheckForCollisions( timeStep, next, collision );
////
////#ifdef RB_TIMINGS
////	timer_collision.Stop();
////#endif
////
////	// set the new state
////	this.current = next;
////
////	if ( collided ) {
////		// apply collision impulse
////		if ( CollisionImpulse( collision, impulse ) ) {
////			this.current.atRest = gameLocal.time;
////		}
////	}
////
////	// update the position of the clip model
////	this.clipModel.Link( gameLocal.clip, this.self, this.clipModel.GetId(), this.current.i.position, this.current.i.orientation );
////
////	DebugDraw();
////
////	if ( !this.noContact ) {
////
////#ifdef RB_TIMINGS
////		timer_collision.Start();
////#endif
////		// get contacts
////		EvaluateContacts();
////
////#ifdef RB_TIMINGS
////		timer_collision.Stop();
////#endif
////
////		// check if the body has come to rest
////		if ( TestIfAtRest() ) {
////			// put to rest
////			Rest();
////			cameToRest = true;
////		}  else {
////			// apply contact friction
////			ContactFriction( timeStep );
////		}
////	}
////
////	if ( this.current.atRest < 0 ) {
////		ActivateContactEntities();
////	}
////
////	if ( collided ) {
////		// if the rigid body didn't come to rest or the other entity is not at rest
////		ent = gameLocal.entities[collision.c.entityNum];
////		if ( ent && ( !cameToRest || !ent.IsAtRest() ) ) {
////			// apply impact to other entity
////			ent.ApplyImpulse( this.self, collision.c.id, collision.c.point, -impulse );
////		}
////	}
////
////	// move the rigid body velocity back into the world frame
//////	this.current.i.linearMomentum += this.current.pushVelocity.SubVec3( 0 ) * this.mass;
//////	this.current.i.angularMomentum += this.current.pushVelocity.SubVec3( 1 ) * this.inertiaTensor;
////	this.current.pushVelocity.Zero();
////
////	this.current.lastTimeStep = timeStep;
////	this.current.externalForce.Zero();
////	this.current.externalTorque.Zero();
////
////	if ( IsOutsideWorld() ) {
////		gameLocal.Warning( "rigid body moved outside world bounds for entity '%s' type '%s' at (%s)",
////					this.self.name.c_str(), this.self.GetType().classname, this.current.i.position.ToString(0) );
////		Rest();
////	}
////
////#ifdef RB_TIMINGS
////	timer_total.Stop();
////
////	if ( rb_showTimings.integer == 1 ) {
////		gameLocal.Printf( "%12s: t %1.4f cd %1.4f\n",
////						this.self.name.c_str(),
////						timer_total.Milliseconds(), timer_collision.Milliseconds() );
////		lastTimerReset = 0;
////	}
////	else if ( rb_showTimings.integer == 2 ) {
////		numRigidBodies++;
////		if ( endTimeMSec > lastTimerReset ) {
////			gameLocal.Printf( "rb %d: t %1.4f cd %1.4f\n",
////							numRigidBodies,
////							timer_total.Milliseconds(), timer_collision.Milliseconds() );
////		}
////	}
////	if ( endTimeMSec > lastTimerReset ) {
////		lastTimerReset = endTimeMSec;
////		numRigidBodies = 0;
////		timer_total.Clear();
////		timer_collision.Clear();
////	}
////#endif
////
////	return true;
////}
////
/*
================
idPhysics_RigidBody::UpdateTime
================
*/
	UpdateTime( /*int*/ endTimeMSec: number): void {
	}
////
/////*
////================
////idPhysics_RigidBody::GetTime
////================
////*/
////int idPhysics_RigidBody::GetTime( ) const {
////	return gameLocal.time;
////}
////
/////*
////================
////idPhysics_RigidBody::GetImpactInfo
////================
////*/
////void idPhysics_RigidBody::GetImpactInfo( /*int*/ id:number, const idVec3 &point, impactInfo_t *info ) const {
////	idVec3 linearVelocity, angularVelocity;
////	idMat3 inverseWorldInertiaTensor;
////
////	linearVelocity = this.inverseMass * this.current.i.linearMomentum;
////	inverseWorldInertiaTensor = this.current.i.orientation.Transpose() * this.inverseInertiaTensor * this.current.i.orientation;
////	angularVelocity = inverseWorldInertiaTensor * this.current.i.angularMomentum;
////
////	info.invMass = this.inverseMass;
////	info.invInertiaTensor = inverseWorldInertiaTensor;
////	info.position = point - ( this.current.i.position + this.centerOfMass * this.current.i.orientation );
////	info.velocity = linearVelocity + angularVelocity.Cross( info.position );
////}
////
/////*
////================
////idPhysics_RigidBody::ApplyImpulse
////================
////*/
////void idPhysics_RigidBody::ApplyImpulse( /*int*/ id:number, const idVec3 &point, const idVec3 &impulse ) {
////	if ( this.noImpact ) {
////		return;
////	}
////	this.current.i.linearMomentum += impulse;
////	this.current.i.angularMomentum += ( point - ( this.current.i.position + this.centerOfMass * this.current.i.orientation ) ).Cross( impulse );
////	this.Activate();
////}
////
/////*
////================
////idPhysics_RigidBody::AddForce
////================
////*/
////void idPhysics_RigidBody::AddForce( /*int*/ id:number, const idVec3 &point, const idVec3 &force ) {
////	if ( this.noImpact ) {
////		return;
////	}
////	this.current.externalForce += force;
////	this.current.externalTorque += ( point - ( this.current.i.position + this.centerOfMass * this.current.i.orientation ) ).Cross( force );
////	this.Activate();
////}

/*
================
idPhysics_RigidBody::IsAtRest
================
*/
	IsAtRest(): boolean {
	return this.current.atRest >= 0;
}
////
/////*
////================
////idPhysics_RigidBody::GetRestStartTime
////================
////*/
////int idPhysics_RigidBody::GetRestStartTime( ) const {
////	return this.current.atRest;
////}
////
/////*
////================
////idPhysics_RigidBody::IsPushable
////================
////*/
////bool idPhysics_RigidBody::IsPushable( ) const {
////	return ( !this.noImpact && !this.hasMaster );
////}
////
/////*
////================
////idPhysics_RigidBody::SaveState
////================
////*/
////void idPhysics_RigidBody::SaveState( ) {
////	this.saved = this.current;
////}
////
/////*
////================
////idPhysics_RigidBody::RestoreState
////================
////*/
////void idPhysics_RigidBody::RestoreState( ) {
////	this.current = this.saved;
////
////	this.clipModel.Link( gameLocal.clip, this.self, this.clipModel.GetId(), this.current.i.position, this.current.i.orientation );
////
////	EvaluateContacts();
////}
////
/*
================
idPhysics::SetOrigin
================
*/
	SetOrigin ( newOrigin: idVec3, /*int*/ id: number = -1 ): void {
		var masterOrigin = new idVec3;
		var masterAxis = new idMat3;

		this.current.localOrigin = newOrigin;
		if ( this.hasMaster ) {
			todoThrow ( );
			//this.self.GetMasterPosition( masterOrigin, masterAxis );
			//this.current.i.position.opEquals( masterOrigin + newOrigin * masterAxis );
		} else {
			this.current.i.position = newOrigin;
		}

		this.clipModel.Link_ent( gameLocal.clip, this.self, this.clipModel.GetId ( ), this.current.i.position, this.clipModel.GetAxis ( ) );

		this.Activate ( );
	}

/////*
////================
////idPhysics::SetAxis
////================
////*/
	SetAxis(newAxis: idMat3, /*int*/ id: number = -1): void {
		todoThrow();
////	idVec3 masterOrigin;
////	idMat3 masterAxis;
////
////	this.current.localAxis = newAxis;
////	if ( this.hasMaster && this.isOrientated ) {
////		this.self.GetMasterPosition( masterOrigin, masterAxis );
////		this.current.i.orientation = newAxis * masterAxis;
////	}
////	else {
////		this.current.i.orientation = newAxis;
////	}
////
////	this.clipModel.Link( gameLocal.clip, this.self, this.clipModel.GetId(), this.clipModel.GetOrigin(), this.current.i.orientation );
////
////	this.Activate();
}

/*
================
idPhysics::Move
================
*/
	Translate ( translation: idVec3, /*int*/ id: number = -1 ): void {

		this.current.localOrigin.opAdditionAssignment( translation );
		this.current.i.position.opAdditionAssignment( translation );

		this.clipModel.Link_ent( gameLocal.clip, this.self, this.clipModel.GetId ( ), this.current.i.position, this.clipModel.GetAxis ( ) );

		this.Activate ( );
	}

/*
================
idPhysics::Rotate
================
*/
	Rotate(rotation: idRotation, /*int*/ id: number = -1): void {
		todoThrow();
////	idVec3 masterOrigin;
////	idMat3 masterAxis;
////
////	this.current.i.orientation *= rotation.ToMat3();
////	this.current.i.position *= rotation;
////
////	if ( this.hasMaster ) {
////		this.self.GetMasterPosition( masterOrigin, masterAxis );
////		this.current.localAxis *= rotation.ToMat3();
////		this.current.localOrigin = ( this.current.i.position - masterOrigin ) * masterAxis.Transpose();
////	}
////	else {
////		this.current.localAxis = this.current.i.orientation;
////		this.current.localOrigin = this.current.i.position;
////	}
////
////	this.clipModel.Link( gameLocal.clip, this.self, this.clipModel.GetId(), this.current.i.position, this.current.i.orientation );
////
////	this.Activate();
}

/*
================
idPhysics_RigidBody::GetOrigin
================
*/
GetOrigin( /*int*/ id:number = 0 ) :idVec3{
	return this.current.i.position;
}

/*
================
idPhysics_RigidBody::GetAxis
================
*/
	GetAxis( /*int*/ id: number = 0): idMat3 {
	return this.current.i.orientation;
}
////
/////*
////================
////idPhysics_RigidBody::SetLinearVelocity
////================
////*/
////void idPhysics_RigidBody::SetLinearVelocity( const idVec3 &newLinearVelocity, /*int*/ id:number ) {
////	this.current.i.linearMomentum = newLinearVelocity * this.mass;
////	this.Activate();
////}
////
/////*
////================
////idPhysics_RigidBody::SetAngularVelocity
////================
////*/
////void idPhysics_RigidBody::SetAngularVelocity( const idVec3 &newAngularVelocity, /*int*/ id:number ) {
////	this.current.i.angularMomentum = newAngularVelocity * this.inertiaTensor;
////	this.Activate();
////}
////
/////*
////================
////idPhysics_RigidBody::GetLinearVelocity
////================
////*/
////const idVec3 &idPhysics_RigidBody::GetLinearVelocity( /*int*/ id:number ) const {
////	static idVec3 curLinearVelocity;
////	curLinearVelocity = this.current.i.linearMomentum * this.inverseMass;
////	return curLinearVelocity;
////}
////
/////*
////================
////idPhysics_RigidBody::GetAngularVelocity
////================
////*/
////const idVec3 &idPhysics_RigidBody::GetAngularVelocity( /*int*/ id:number ) const {
////	static idVec3 curAngularVelocity;
////	idMat3 inverseWorldInertiaTensor;
////
////	inverseWorldInertiaTensor = this.current.i.orientation.Transpose() * this.inverseInertiaTensor * this.current.i.orientation;
////	curAngularVelocity = inverseWorldInertiaTensor * this.current.i.angularMomentum;
////	return curAngularVelocity;
////}
////
/////*
////================
////idPhysics_RigidBody::ClipTranslation
////================
////*/
////void idPhysics_RigidBody::ClipTranslation( trace_t &results, const idVec3 &translation, const idClipModel *model ) const {
////	if ( model ) {
////		gameLocal.clip.TranslationModel( results, this.clipModel.GetOrigin(), this.clipModel.GetOrigin() + translation,
////											this.clipModel, this.clipModel.GetAxis(), clipMask,
////											model.Handle(), model.GetOrigin(), model.GetAxis() );
////	}
////	else {
////		gameLocal.clip.Translation( results, this.clipModel.GetOrigin(), this.clipModel.GetOrigin() + translation,
////											this.clipModel, this.clipModel.GetAxis(), clipMask, this.self );
////	}
////}
////
/////*
////================
////idPhysics_RigidBody::ClipRotation
////================
////*/
////void idPhysics_RigidBody::ClipRotation( trace_t &results, const idRotation &rotation, const idClipModel *model ) const {
////	if ( model ) {
////		gameLocal.clip.RotationModel( results, this.clipModel.GetOrigin(), rotation,
////											this.clipModel, this.clipModel.GetAxis(), clipMask,
////											model.Handle(), model.GetOrigin(), model.GetAxis() );
////	}
////	else {
////		gameLocal.clip.Rotation( results, this.clipModel.GetOrigin(), rotation,
////											this.clipModel, this.clipModel.GetAxis(), clipMask, this.self );
////	}
////}
////
/////*
////================
////idPhysics_RigidBody::ClipContents
////================
////*/
////int idPhysics_RigidBody::ClipContents( const idClipModel *model ) const {
////	if ( model ) {
////		return gameLocal.clip.ContentsModel( this.clipModel.GetOrigin(), this.clipModel, this.clipModel.GetAxis(), -1,
////									model.Handle(), model.GetOrigin(), model.GetAxis() );
////	}
////	else {
////		return gameLocal.clip.Contents( this.clipModel.GetOrigin(), this.clipModel, this.clipModel.GetAxis(), -1, NULL );
////	}
////}
////
/////*
////================
////idPhysics_RigidBody::DisableClip
////================
////*/
////void idPhysics_RigidBody::DisableClip( ) {
////	this.clipModel.Disable();
////}
////
/////*
////================
////idPhysics_RigidBody::EnableClip
////================
////*/
////void idPhysics_RigidBody::EnableClip( ) {
////	this.clipModel.Enable();
////}
////
/////*
////================
////idPhysics_RigidBody::UnlinkClip
////================
////*/
////void idPhysics_RigidBody::UnlinkClip( ) {
////	this.clipModel.Unlink();
////}
////
/////*
////================
////idPhysics_RigidBody::LinkClip
////================
////*/
////void idPhysics_RigidBody::LinkClip( ) {
////	this.clipModel.Link( gameLocal.clip, this.self, this.clipModel.GetId(), this.current.i.position, this.current.i.orientation );
////}
////
/////*
////================
////idPhysics_RigidBody::EvaluateContacts
////================
////*/
////bool idPhysics_RigidBody::EvaluateContacts( ) {
////	idVec6 dir;
////	int num;
////
////	this.ClearContacts();
////
////	contacts.SetNum( 10, false );
////
////	dir.SubVec3(0) = this.current.i.linearMomentum + this.current.lastTimeStep * gravityVector * this.mass;
////	dir.SubVec3(1) = this.current.i.angularMomentum;
////	dir.SubVec3(0).Normalize();
////	dir.SubVec3(1).Normalize();
////	num = gameLocal.clip.Contacts( &contacts[0], 10, this.clipModel.GetOrigin(),
////					dir, CONTACT_EPSILON, this.clipModel, this.clipModel.GetAxis(), clipMask, this.self );
////	contacts.SetNum( num, false );
////
////	AddContactEntitiesForContacts();
////
////	return ( contacts.Num() != 0 );
////}
////
/////*
////================
////idPhysics_RigidBody::SetPushed
////================
////*/
////void idPhysics_RigidBody::SetPushed( int deltaTime ) {
////	idRotation rotation;
////
////	rotation = ( this.saved.i.orientation * this.current.i.orientation ).ToRotation();
////
////	// velocity with which the af is pushed
////	this.current.pushVelocity.SubVec3(0) += ( this.current.i.position - this.saved.i.position ) / ( deltaTime * idMath::M_MS2SEC );
////	this.current.pushVelocity.SubVec3(1) += rotation.GetVec() * -DEG2RAD( rotation.GetAngle() ) / ( deltaTime * idMath::M_MS2SEC );
////}
////
/////*
////================
////idPhysics_RigidBody::GetPushedLinearVelocity
////================
////*/
////const idVec3 &idPhysics_RigidBody::GetPushedLinearVelocity( /*int*/ id:number ) const {
////	return this.current.pushVelocity.SubVec3(0);
////}
////
/////*
////================
////idPhysics_RigidBody::GetPushedAngularVelocity
////================
////*/
////const idVec3 &idPhysics_RigidBody::GetPushedAngularVelocity( /*int*/ id:number ) const {
////	return this.current.pushVelocity.SubVec3(1);
////}

/*
================
idPhysics_RigidBody::SetMaster
================
*/
	SetMaster ( master: idEntity, orientated: boolean = true ) {
		var masterOrigin = new idVec3;
		var masterAxis = new idMat3;

		if ( master ) {
			if ( !this.hasMaster ) {
				// transform from world space to master space
				this.self.GetMasterPosition( masterOrigin, masterAxis );
				this.current.localOrigin.opEquals( idMat3.opMultiplication_VecMat( this.current.i.position.opSubtraction( masterOrigin ), masterAxis.Transpose ( ) ) );
				if ( orientated ) {
					this.current.localAxis.opEquals( this.current.i.orientation.opMultiplication( masterAxis.Transpose ( ) ) );
				} else {
					this.current.localAxis.opEquals( this.current.i.orientation );
				}
				this.hasMaster = true;
				this.isOrientated = orientated;
				this.ClearContacts ( );
			}
		} else {
			if ( this.hasMaster ) {
				this.hasMaster = false;
				this.Activate ( );
			}
		}
	}

////const float	RB_VELOCITY_MAX				= 16000;
////const int	RB_VELOCITY_TOTAL_BITS		= 16;
////const int	RB_VELOCITY_EXPONENT_BITS	= idMath::BitsForInteger( idMath::BitsForFloat( RB_VELOCITY_MAX ) ) + 1;
////const int	RB_VELOCITY_MANTISSA_BITS	= RB_VELOCITY_TOTAL_BITS - 1 - RB_VELOCITY_EXPONENT_BITS;
////const float	RB_MOMENTUM_MAX				= 1e20f;
////const int	RB_MOMENTUM_TOTAL_BITS		= 16;
////const int	RB_MOMENTUM_EXPONENT_BITS	= idMath::BitsForInteger( idMath::BitsForFloat( RB_MOMENTUM_MAX ) ) + 1;
////const int	RB_MOMENTUM_MANTISSA_BITS	= RB_MOMENTUM_TOTAL_BITS - 1 - RB_MOMENTUM_EXPONENT_BITS;
////const float	RB_FORCE_MAX				= 1e20f;
////const int	RB_FORCE_TOTAL_BITS			= 16;
////const int	RB_FORCE_EXPONENT_BITS		= idMath::BitsForInteger( idMath::BitsForFloat( RB_FORCE_MAX ) ) + 1;
////const int	RB_FORCE_MANTISSA_BITS		= RB_FORCE_TOTAL_BITS - 1 - RB_FORCE_EXPONENT_BITS;
////
/////*
////================
////idPhysics_RigidBody::WriteToSnapshot
////================
////*/
////void idPhysics_RigidBody::WriteToSnapshot( idBitMsgDelta &msg ) const {
////	idCQuat quat, localQuat;
////
////	quat = this.current.i.orientation.ToCQuat();
////	localQuat = this.current.localAxis.ToCQuat();
////
////	msg.WriteLong( this.current.atRest );
////	msg.WriteFloat( this.current.i.position[0] );
////	msg.WriteFloat( this.current.i.position[1] );
////	msg.WriteFloat( this.current.i.position[2] );
////	msg.WriteFloat( quat.x );
////	msg.WriteFloat( quat.y );
////	msg.WriteFloat( quat.z );
////	msg.WriteFloat( this.current.i.linearMomentum[0], RB_MOMENTUM_EXPONENT_BITS, RB_MOMENTUM_MANTISSA_BITS );
////	msg.WriteFloat( this.current.i.linearMomentum[1], RB_MOMENTUM_EXPONENT_BITS, RB_MOMENTUM_MANTISSA_BITS );
////	msg.WriteFloat( this.current.i.linearMomentum[2], RB_MOMENTUM_EXPONENT_BITS, RB_MOMENTUM_MANTISSA_BITS );
////	msg.WriteFloat( this.current.i.angularMomentum[0], RB_MOMENTUM_EXPONENT_BITS, RB_MOMENTUM_MANTISSA_BITS );
////	msg.WriteFloat( this.current.i.angularMomentum[1], RB_MOMENTUM_EXPONENT_BITS, RB_MOMENTUM_MANTISSA_BITS );
////	msg.WriteFloat( this.current.i.angularMomentum[2], RB_MOMENTUM_EXPONENT_BITS, RB_MOMENTUM_MANTISSA_BITS );
////	msg.WriteDeltaFloat( this.current.i.position[0], this.current.localOrigin[0] );
////	msg.WriteDeltaFloat( this.current.i.position[1], this.current.localOrigin[1] );
////	msg.WriteDeltaFloat( this.current.i.position[2], this.current.localOrigin[2] );
////	msg.WriteDeltaFloat( quat.x, localQuat.x );
////	msg.WriteDeltaFloat( quat.y, localQuat.y );
////	msg.WriteDeltaFloat( quat.z, localQuat.z );
////	msg.WriteDeltaFloat( 0.0, this.current.pushVelocity[0], RB_VELOCITY_EXPONENT_BITS, RB_VELOCITY_MANTISSA_BITS );
////	msg.WriteDeltaFloat( 0.0, this.current.pushVelocity[1], RB_VELOCITY_EXPONENT_BITS, RB_VELOCITY_MANTISSA_BITS );
////	msg.WriteDeltaFloat( 0.0, this.current.pushVelocity[2], RB_VELOCITY_EXPONENT_BITS, RB_VELOCITY_MANTISSA_BITS );
////	msg.WriteDeltaFloat( 0.0, this.current.externalForce[0], RB_FORCE_EXPONENT_BITS, RB_FORCE_MANTISSA_BITS );
////	msg.WriteDeltaFloat( 0.0, this.current.externalForce[1], RB_FORCE_EXPONENT_BITS, RB_FORCE_MANTISSA_BITS );
////	msg.WriteDeltaFloat( 0.0, this.current.externalForce[2], RB_FORCE_EXPONENT_BITS, RB_FORCE_MANTISSA_BITS );
////	msg.WriteDeltaFloat( 0.0, this.current.externalTorque[0], RB_FORCE_EXPONENT_BITS, RB_FORCE_MANTISSA_BITS );
////	msg.WriteDeltaFloat( 0.0, this.current.externalTorque[1], RB_FORCE_EXPONENT_BITS, RB_FORCE_MANTISSA_BITS );
////	msg.WriteDeltaFloat( 0.0, this.current.externalTorque[2], RB_FORCE_EXPONENT_BITS, RB_FORCE_MANTISSA_BITS );
////}
////
/////*
////================
////idPhysics_RigidBody::ReadFromSnapshot
////================
////*/
////void idPhysics_RigidBody::ReadFromSnapshot( const idBitMsgDelta &msg ) {
////	idCQuat quat, localQuat;
////
////	this.current.atRest = msg.ReadLong();
////	this.current.i.position[0] = msg.ReadFloat();
////	this.current.i.position[1] = msg.ReadFloat();
////	this.current.i.position[2] = msg.ReadFloat();
////	quat.x = msg.ReadFloat();
////	quat.y = msg.ReadFloat();
////	quat.z = msg.ReadFloat();
////	this.current.i.linearMomentum[0] = msg.ReadFloat( RB_MOMENTUM_EXPONENT_BITS, RB_MOMENTUM_MANTISSA_BITS );
////	this.current.i.linearMomentum[1] = msg.ReadFloat( RB_MOMENTUM_EXPONENT_BITS, RB_MOMENTUM_MANTISSA_BITS );
////	this.current.i.linearMomentum[2] = msg.ReadFloat( RB_MOMENTUM_EXPONENT_BITS, RB_MOMENTUM_MANTISSA_BITS );
////	this.current.i.angularMomentum[0] = msg.ReadFloat( RB_MOMENTUM_EXPONENT_BITS, RB_MOMENTUM_MANTISSA_BITS );
////	this.current.i.angularMomentum[1] = msg.ReadFloat( RB_MOMENTUM_EXPONENT_BITS, RB_MOMENTUM_MANTISSA_BITS );
////	this.current.i.angularMomentum[2] = msg.ReadFloat( RB_MOMENTUM_EXPONENT_BITS, RB_MOMENTUM_MANTISSA_BITS );
////	this.current.localOrigin[0] = msg.ReadDeltaFloat( this.current.i.position[0] );
////	this.current.localOrigin[1] = msg.ReadDeltaFloat( this.current.i.position[1] );
////	this.current.localOrigin[2] = msg.ReadDeltaFloat( this.current.i.position[2] );
////	localQuat.x = msg.ReadDeltaFloat( quat.x );
////	localQuat.y = msg.ReadDeltaFloat( quat.y );
////	localQuat.z = msg.ReadDeltaFloat( quat.z );
////	this.current.pushVelocity[0] = msg.ReadDeltaFloat( 0.0, RB_VELOCITY_EXPONENT_BITS, RB_VELOCITY_MANTISSA_BITS );
////	this.current.pushVelocity[1] = msg.ReadDeltaFloat( 0.0, RB_VELOCITY_EXPONENT_BITS, RB_VELOCITY_MANTISSA_BITS );
////	this.current.pushVelocity[2] = msg.ReadDeltaFloat( 0.0, RB_VELOCITY_EXPONENT_BITS, RB_VELOCITY_MANTISSA_BITS );
////	this.current.externalForce[0] = msg.ReadDeltaFloat( 0.0, RB_FORCE_EXPONENT_BITS, RB_FORCE_MANTISSA_BITS );
////	this.current.externalForce[1] = msg.ReadDeltaFloat( 0.0, RB_FORCE_EXPONENT_BITS, RB_FORCE_MANTISSA_BITS );
////	this.current.externalForce[2] = msg.ReadDeltaFloat( 0.0, RB_FORCE_EXPONENT_BITS, RB_FORCE_MANTISSA_BITS );
////	this.current.externalTorque[0] = msg.ReadDeltaFloat( 0.0, RB_FORCE_EXPONENT_BITS, RB_FORCE_MANTISSA_BITS );
////	this.current.externalTorque[1] = msg.ReadDeltaFloat( 0.0, RB_FORCE_EXPONENT_BITS, RB_FORCE_MANTISSA_BITS );
////	this.current.externalTorque[2] = msg.ReadDeltaFloat( 0.0, RB_FORCE_EXPONENT_BITS, RB_FORCE_MANTISSA_BITS );
////
////	this.current.i.orientation = quat.ToMat3();
////	this.current.localAxis = localQuat.ToMat3();
////
////	if ( this.clipModel ) {
////		this.clipModel.Link( gameLocal.clip, this.self, this.clipModel.GetId(), this.current.i.position, this.current.i.orientation );
////	}
////}
}

//CLASS_DECLARATION( idPhysics_Base, idPhysics_RigidBody )
idPhysics_RigidBody.CreateInstance = function() : idClass{
	try {
		var ptr = new idPhysics_RigidBody;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idPhysics_RigidBody.prototype.GetType = function ( ): idTypeInfo {
	return ( idPhysics_RigidBody.Type );
};

idPhysics_RigidBody.eventCallbacks = [
];

idPhysics_RigidBody.Type = new idTypeInfo( "idPhysics_RigidBody", "idPhysics_Base",
	idPhysics_RigidBody.eventCallbacks, idPhysics_RigidBody.CreateInstance, idPhysics_RigidBody.prototype.Spawn,
	idPhysics_RigidBody.prototype.Save, idPhysics_RigidBody.prototype.Restore );

//END_CLASS