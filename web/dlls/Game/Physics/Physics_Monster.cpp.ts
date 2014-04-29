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
//const float OVERCLIP = 1.001f;
//
//
//#ifndef __PHYSICS_MONSTER_H__
//#define __PHYSICS_MONSTER_H__

/*
===================================================================================

Monster physics

Simulates the motion of a monster through the environment. The monster motion
is typically driven by animations.

===================================================================================
*/

enum monsterMoveResult_t{
	MM_OK,
	MM_SLIDING,
	MM_BLOCKED,
	MM_STEPPED,
	MM_FALLING
};

class monsterPState_t {
	atRest: number /*int*/;
	onGround: boolean;
	origin = new idVec3;
	velocity = new idVec3;
	localOrigin = new idVec3;
	pushVelocity = new idVec3;

	memset0 ( ): void {
		this.atRest = 0;
		this.onGround = false;
		this.origin.memset0 ( );
		this.velocity.memset0 ( );
		this.localOrigin.memset0 ( );
		this.pushVelocity.memset0 ( );
	}

	opEquals ( other: monsterPState_t ) {
		this.atRest = other.atRest;
		this.onGround = other.onGround;
		this.origin.opEquals( other.origin );
		this.velocity.opEquals( other.velocity );
		this.localOrigin.opEquals( other.localOrigin );
		this.pushVelocity.opEquals( other.pushVelocity );
	}
}

class idPhysics_Monster extends idPhysics_Actor {
	//
	//public:
	//	CLASS_PROTOTYPE(idPhysics_Monster);
	static	Type:idTypeInfo;						
	static	CreateInstance( ): idClass {throw "placeholder";}
	GetType( ):idTypeInfo {throw "placeholder";}
	static	eventCallbacks : idEventFunc<idPhysics_Monster>[];
	//
	//	idPhysics_Monster(void);
	//
	//	void					Save(idSaveGame *savefile) const;
	//	void					Restore(idRestoreGame *savefile);
	//
	//	// maximum step up the monster can take, default 18 units
	//	void					SetMaxStepHeight(const float newMaxStepHeight);
	//	float					GetMaxStepHeight(void) const;
	//	// minimum cosine of floor angle to be able to stand on the floor
	//	void					SetMinFloorCosine(const float newMinFloorCosine);
	//	// set delta for next move
	//	void					SetDelta(const idVec3 &d);
	//	// returns true if monster is standing on the ground
	//	bool					OnGround(void) const;
	//	// returns the movement result
	//	monsterMoveResult_t		GetMoveResult(void) const;
	//	// overrides any velocity for pure delta movement
	//	void					ForceDeltaMove(bool force);
	//	// whether velocity should be affected by gravity
	//	void					UseFlyMove(bool force);
	//	// don't use delta movement
	//	void					UseVelocityMove(bool force);
	//	// get entity blocking the move
	//	idEntity *				GetSlideMoveEntity(void) const;
	//	// enable/disable activation by impact
	//	void					EnableImpact(void);
	//	void					DisableImpact(void);
	//
	//public:	// common physics interface
	//	bool					Evaluate(int timeStepMSec, int endTimeMSec);
	//	void					UpdateTime(int endTimeMSec);
	//	int						GetTime(void) const;
	//
	//	void					GetImpactInfo(/*int*/ id:number, const idVec3 &point, impactInfo_t *info) const;
	//	void					ApplyImpulse(/*int*/ id:number, const idVec3 &point, const idVec3 &impulse);
	//	void					Activate(void);
	//	void					PutToRest(void);
	//	bool					IsAtRest(void) const;
	//	int						GetRestStartTime(void) const;
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
	//	void					SetLinearVelocity(const idVec3 &newLinearVelocity, /*int*/ id:number = 0);
	//
	//	const idVec3 &			GetLinearVelocity(/*int*/ id:number = 0) const;
	//
	//	void					SetPushed(int deltaTime);
	//	const idVec3 &			GetPushedLinearVelocity(/*int*/ id:number = 0) const;
	//
	//	void					SetMaster(idEntity *master, const bool orientated = true);
	//
	//	void					WriteToSnapshot(idBitMsgDelta &msg) const;
	//	void					ReadFromSnapshot(const idBitMsgDelta &msg);
	//
	//private:
	// monster physics state
	current = new monsterPState_t;
	saved = new monsterPState_t;
	//
	// properties
	maxStepHeight :number/*float*/;		// maximum step height
	minFloorCosine :number/*float*/;		// minimum cosine of floor angle
	delta = new idVec3;				// delta for next move
	
	forceDeltaMove:boolean;
	fly:boolean;
	useVelocityMove:boolean;
	noImpact:boolean;			// if true do not activate when another object collides
	//
	// results of last evaluate
	moveResult: monsterMoveResult_t;
	blockingEntity: idEntity;
	//
	//private:
	//	void					CheckGround(monsterPState_t &state);
	//	monsterMoveResult_t		SlideMove(idVec3 &start, idVec3 &velocity, const idVec3 &delta);
	//	monsterMoveResult_t		StepMove(idVec3 &start, idVec3 &velocity, const idVec3 &delta);
	//	void					Rest(void);
	//};
	//
	//#endif /* !__PHYSICS_MONSTER_H__ */
	//
	//
	///*
	//=====================
	//idPhysics_Monster::CheckGround
	//=====================
	//*/
	//void idPhysics_Monster::CheckGround( monsterPState_t &state ) {
	//	trace_t groundTrace;
	//	idVec3 down;
	//
	//	if ( gravityNormal == vec3_zero ) {
	//		state.onGround = false;
	//		groundEntityPtr = NULL;
	//		return;
	//	}
	//
	//	down = state.origin + gravityNormal * CONTACT_EPSILON;
	//	gameLocal.clip.Translation( groundTrace, state.origin, down, this.clipModel, this.clipModel.GetAxis(), clipMask, this.self );
	//
	//	if ( groundTrace.fraction == 1.0 ) {
	//		state.onGround = false;
	//		groundEntityPtr = NULL;
	//		return;
	//	}
	//
	//	groundEntityPtr = gameLocal.entities[ groundTrace.c.entityNum ];
	//
	//	if ( ( groundTrace.c.normal * -gravityNormal ) < minFloorCosine ) {
	//		state.onGround = false;
	//		return;
	//	}
	//
	//	state.onGround = true;
	//
	//	// let the entity know about the collision
	//	this.self.Collide( groundTrace, state.velocity );
	//
	//	// apply impact to a non world floor entity
	//	if ( groundTrace.c.entityNum != ENTITYNUM_WORLD && groundEntityPtr.GetEntity() ) {
	//		impactInfo_t info;
	//		groundEntityPtr.GetEntity().GetImpactInfo( this.self, groundTrace.c.id, groundTrace.c.point, &info );
	//		if ( info.invMass != 0.0 ) {
	//			groundEntityPtr.GetEntity().ApplyImpulse( this.self, 0, groundTrace.c.point, state.velocity  / ( info.invMass * 10.0 ) );
	//		}
	//	}
	//}
	//
	///*
	//=====================
	//idPhysics_Monster::SlideMove
	//=====================
	//*/
	//monsterMoveResult_t idPhysics_Monster::SlideMove( idVec3 &start, idVec3 &velocity, const idVec3 &delta ) {
	//	var/*int*/i:number;
	//	trace_t tr;
	//	idVec3 move;
	//
	//	blockingEntity = NULL;
	//	move = delta;
	//	for( i = 0; i < 3; i++ ) {
	//		gameLocal.clip.Translation( tr, start, start + move, this.clipModel, this.clipModel.GetAxis(), clipMask, this.self );
	//
	//		start = tr.endpos;
	//
	//		if ( tr.fraction == 1.0 ) {
	//			if ( i > 0 ) {
	//				return MM_SLIDING;
	//			}
	//			return MM_OK;
	//		}
	//
	//		if ( tr.c.entityNum != ENTITYNUM_NONE ) {
	//			blockingEntity = gameLocal.entities[ tr.c.entityNum ];
	//		} 
	//		
	//		// clip the movement delta and velocity
	//		move.ProjectOntoPlane( tr.c.normal, OVERCLIP );
	//		velocity.ProjectOntoPlane( tr.c.normal, OVERCLIP );
	//	}
	//
	//	return MM_BLOCKED;
	//}
	//
	///*
	//=====================
	//idPhysics_Monster::StepMove
	//
	//  move start into the delta direction
	//  the velocity is clipped conform any collisions
	//=====================
	//*/
	//monsterMoveResult_t idPhysics_Monster::StepMove( idVec3 &start, idVec3 &velocity, const idVec3 &delta ) {
	//	trace_t tr;
	//	idVec3 up, down, noStepPos, noStepVel, stepPos, stepVel;
	//	monsterMoveResult_t result1, result2;
	//	float	stepdist;
	//	float	nostepdist;
	//
	//	if ( delta == vec3_origin ) {
	//		return MM_OK;
	//	}
	//
	//	// try to move without stepping up
	//	noStepPos = start;
	//	noStepVel = velocity;
	//	result1 = SlideMove( noStepPos, noStepVel, delta );
	//	if ( result1 == MM_OK ) {
	//		velocity = noStepVel;
	//		if ( gravityNormal == vec3_zero ) {
	//			start = noStepPos;
	//			return MM_OK;
	//		}
	//
	//		// try to step down so that we walk down slopes and stairs at a normal rate
	//		down = noStepPos + gravityNormal * this.maxStepHeight;
	//		gameLocal.clip.Translation( tr, noStepPos, down, this.clipModel, this.clipModel.GetAxis(), clipMask, this.self );
	//		if ( tr.fraction < 1.0 ) {
	//			start = tr.endpos;
	//			return MM_STEPPED;
	//		} else {
	//			start = noStepPos;
	//			return MM_OK;
	//		}
	//	}
	//
	//	if ( blockingEntity && blockingEntity.IsType( idActor::Type ) ) {
	//		// try to step down in case walking into an actor while going down steps
	//		down = noStepPos + gravityNormal * this.maxStepHeight;
	//		gameLocal.clip.Translation( tr, noStepPos, down, this.clipModel, this.clipModel.GetAxis(), clipMask, this.self );
	//		start = tr.endpos;
	//		velocity = noStepVel;
	//		return MM_BLOCKED;
	//	}
	//
	//	if ( gravityNormal == vec3_zero ) {
	//		return result1;
	//	}
	//
	//	// try to step up
	//	up = start - gravityNormal * this.maxStepHeight;
	//	gameLocal.clip.Translation( tr, start, up, this.clipModel, this.clipModel.GetAxis(), clipMask, this.self );
	//	if ( tr.fraction == 0.0 ) {
	//		start = noStepPos;
	//		velocity = noStepVel;
	//		return result1;
	//	}
	//
	//	// try to move at the stepped up position
	//	stepPos = tr.endpos;
	//	stepVel = velocity;
	//	result2 = SlideMove( stepPos, stepVel, delta );
	//	if ( result2 == MM_BLOCKED ) {
	//		start = noStepPos;
	//		velocity = noStepVel;
	//		return result1;
	//	}
	//
	//	// step down again
	//	down = stepPos + gravityNormal * this.maxStepHeight;
	//	gameLocal.clip.Translation( tr, stepPos, down, this.clipModel, this.clipModel.GetAxis(), clipMask, this.self );
	//	stepPos = tr.endpos;
	//
	//	// if the move is further without stepping up, or the slope is too steap, don't step up
	//	nostepdist = ( noStepPos - start ).LengthSqr();
	//	stepdist = ( stepPos - start ).LengthSqr();
	//	if ( ( nostepdist >= stepdist ) || ( ( tr.c.normal * -gravityNormal ) < minFloorCosine ) ) {
	//		start = noStepPos;
	//		velocity = noStepVel;
	//		return MM_SLIDING;
	//	}
	//
	//	start = stepPos;
	//	velocity = stepVel;
	//
	//	return MM_STEPPED;
	//}
	
	/*
	================
	idPhysics_Monster::Activate
	================
	*/
	Activate( ):void {
		this.current.atRest = -1;
		this.self.BecomeActive( TH_PHYSICS );
	}
	
	/*
	================
	idPhysics_Monster::Rest
	================
	*/
	Rest ( ): void {
		this.current.atRest = gameLocal.time;
		this.current.velocity.Zero ( );
		this.self.BecomeInactive( TH_PHYSICS );
	}

	/*
	================
	idPhysics_Monster::PutToRest
	================
	*/
	PutToRest( ) :void{
		this.Rest();
	}
	
	/*
	================
	idPhysics_Monster::idPhysics_Monster
	================
	*/
	constructor( ) {
		super ( );
		this.current.memset0 ( );	//memset( &this.current, 0, sizeof( this.current ) );
		this.current.atRest = -1;
		this.saved .opEquals( this.current );
		
		this.delta.Zero();
		this.maxStepHeight = 18.0;
		this.minFloorCosine = 0.7;
		this.moveResult = monsterMoveResult_t.MM_OK;
		this.forceDeltaMove = false;
		this.fly = false;
		this.useVelocityMove = false;
		this.noImpact = false;
		this.blockingEntity = null;
	}
	
	///*
	//================
	//idPhysics_Monster_SavePState
	//================
	//*/
	//void idPhysics_Monster_SavePState( idSaveGame *savefile, const monsterPState_t &state ) {
	//	savefile.WriteVec3( state.origin );
	//	savefile.WriteVec3( state.velocity );
	//	savefile.WriteVec3( state.localOrigin );
	//	savefile.WriteVec3( state.pushVelocity );
	//	savefile.WriteBool( state.onGround );
	//	savefile.WriteInt( state.atRest );
	//}
	//
	///*
	//================
	//idPhysics_Monster_RestorePState
	//================
	//*/
	//void idPhysics_Monster_RestorePState( idRestoreGame *savefile, monsterPState_t &state ) {
	//	savefile.ReadVec3( state.origin );
	//	savefile.ReadVec3( state.velocity );
	//	savefile.ReadVec3( state.localOrigin );
	//	savefile.ReadVec3( state.pushVelocity );
	//	savefile.ReadBool( state.onGround );
	//	savefile.ReadInt( state.atRest );
	//}
	//
	///*
	//================
	//idPhysics_Monster::Save
	//================
	//*/
	//void idPhysics_Monster::Save( idSaveGame *savefile ) const {
	//
	//	idPhysics_Monster_SavePState( savefile, this.current );
	//	idPhysics_Monster_SavePState( savefile, saved );
	//
	//	savefile.WriteFloat( this.maxStepHeight );
	//	savefile.WriteFloat( minFloorCosine );
	//	savefile.WriteVec3( delta );
	//
	//	savefile.WriteBool( forceDeltaMove );
	//	savefile.WriteBool( fly );
	//	savefile.WriteBool( useVelocityMove );
	//	savefile.WriteBool( noImpact );
	//	
	//	savefile.WriteInt( (int)moveResult );
	//	savefile.WriteObject( blockingEntity );
	//}
	//
	///*
	//================
	//idPhysics_Monster::Restore
	//================
	//*/
	//void idPhysics_Monster::Restore( idRestoreGame *savefile ) {
	//
	//	idPhysics_Monster_RestorePState( savefile, this.current );
	//	idPhysics_Monster_RestorePState( savefile, saved );
	//
	//	savefile.ReadFloat( this.maxStepHeight );
	//	savefile.ReadFloat( minFloorCosine );
	//	savefile.ReadVec3( delta );
	//
	//	savefile.ReadBool( forceDeltaMove );
	//	savefile.ReadBool( fly );
	//	savefile.ReadBool( useVelocityMove );
	//	savefile.ReadBool( noImpact );
	//
	//	savefile.ReadInt( (int &)moveResult );
	//	savefile.ReadObject( reinterpret_cast<idClass *&>( blockingEntity ) );
	//}
	//
	///*
	//================
	//idPhysics_Monster::SetDelta
	//================
	//*/
	//void idPhysics_Monster::SetDelta( const idVec3 &d ) {
	//	delta = d;
	//	if ( delta != vec3_origin ) {
	//		this.Activate();
	//	}
	//}
	
	/*
	================
	idPhysics_Monster::SetMaxStepHeight
	================
	*/
	SetMaxStepHeight ( /*float */newMaxStepHeight: number ): void {
		this.maxStepHeight = newMaxStepHeight;
	}
	//
	///*
	//================
	//idPhysics_Monster::GetMaxStepHeight
	//================
	//*/
	//float idPhysics_Monster::GetMaxStepHeight( ) const {
	//	return this.maxStepHeight;
	//}
	//
	///*
	//================
	//idPhysics_Monster::OnGround
	//================
	//*/
	//bool idPhysics_Monster::OnGround( ) const {
	//	return this.current.onGround;
	//}
	//
	///*
	//================
	//idPhysics_Monster::GetSlideMoveEntity
	//================
	//*/
	//idEntity *idPhysics_Monster::GetSlideMoveEntity( ) const {
	//	return blockingEntity;
	//}
	//
	///*
	//================
	//idPhysics_Monster::GetMoveResult
	//================
	//*/
	//monsterMoveResult_t idPhysics_Monster::GetMoveResult( ) const {
	//	return moveResult;
	//}
	//
	///*
	//================
	//idPhysics_Monster::ForceDeltaMove
	//================
	//*/
	//void idPhysics_Monster::ForceDeltaMove( bool force ) {
	//	forceDeltaMove = force;
	//}
	//
	///*
	//================
	//idPhysics_Monster::UseFlyMove
	//================
	//*/
	//void idPhysics_Monster::UseFlyMove( bool force ) {
	//	fly = force;
	//}
	//
	///*
	//================
	//idPhysics_Monster::UseVelocityMove
	//================
	//*/
	//void idPhysics_Monster::UseVelocityMove( bool force ) {
	//	useVelocityMove = force;
	//}
	//
	///*
	//================
	//idPhysics_Monster::EnableImpact
	//================
	//*/
	//void idPhysics_Monster::EnableImpact( ) {
	//	noImpact = false;
	//}
	//
	///*
	//================
	//idPhysics_Monster::DisableImpact
	//================
	//*/
	//void idPhysics_Monster::DisableImpact( ) {
	//	noImpact = true;
	//}
	//
	///*
	//================
	//idPhysics_Monster::Evaluate
	//================
	//*/
	//bool idPhysics_Monster::Evaluate( int timeStepMSec, int endTimeMSec ) {
	//	idVec3 masterOrigin, oldOrigin;
	//	idMat3 masterAxis;
	//	float timeStep;
	//
	//	timeStep = MS2SEC( timeStepMSec );
	//
	//	moveResult = MM_OK;
	//	blockingEntity = NULL;
	//	oldOrigin = this.current.origin;
	//
	//	// if bound to a master
	//	if ( this.masterEntity ) {
	//		this.self.GetMasterPosition( masterOrigin, masterAxis );
	//		this.current.origin = masterOrigin + this.current.localOrigin * masterAxis;
	//		this.clipModel.Link( gameLocal.clip, this.self, 0, this.current.origin, this.clipModel.GetAxis() );
	//		this.current.velocity = ( this.current.origin - oldOrigin ) / timeStep;
	//		masterDeltaYaw = this.masterYaw;
	//		this.masterYaw = masterAxis[0].ToYaw();
	//		masterDeltaYaw = this.masterYaw - masterDeltaYaw;
	//		return true;
	//	}
	//
	//	// if the monster is at rest
	//	if ( this.current.atRest >= 0 ) {
	//		return false;
	//	}
	//
	//	ActivateContactEntities();
	//
	//	// move the monster velocity into the frame of a pusher
	//	this.current.velocity -= this.current.pushVelocity;
	//
	//	this.clipModel.Unlink();
	//
	//	// check if on the ground
	//	idPhysics_Monster::CheckGround( this.current );
	//
	//	// if not on the ground or moving upwards
	//	float upspeed;
	//	if ( gravityNormal != vec3_zero ) {
	//		upspeed = -( this.current.velocity * gravityNormal );
	//	} else {
	//		upspeed = this.current.velocity.z;
	//	}
	//	if ( fly || ( !forceDeltaMove && ( !this.current.onGround || upspeed > 1.0 ) ) ) {
	//		if ( upspeed < 0.0 ) {
	//			moveResult = MM_FALLING;
	//		}
	//		else {
	//			this.current.onGround = false;
	//			moveResult = MM_OK;
	//		}
	//		delta = this.current.velocity * timeStep;
	//		if ( delta != vec3_origin ) {
	//			moveResult = idPhysics_Monster::SlideMove( this.current.origin, this.current.velocity, delta );
	//            delta.Zero();
	//		}
	//
	//		if ( !fly ) {
	//			this.current.velocity += gravityVector * timeStep;
	//		}
	//	} else {
	//		if ( useVelocityMove ) {
	//			delta = this.current.velocity * timeStep;
	//		} else {
	//			this.current.velocity = delta / timeStep;
	//		}
	//
	//		this.current.velocity -= ( this.current.velocity * gravityNormal ) * gravityNormal;
	//
	//		if ( delta == vec3_origin ) {
	//			Rest();
	//		} else {
	//			// try moving into the desired direction
	//			moveResult = idPhysics_Monster::StepMove( this.current.origin, this.current.velocity, delta );
	//			delta.Zero();
	//		}
	//	}
	//
	//	this.clipModel.Link( gameLocal.clip, this.self, 0, this.current.origin, this.clipModel.GetAxis() );
	//
	//	// get all the ground contacts
	//	EvaluateContacts();
	//
	//	// move the monster velocity back into the world frame
	//	this.current.velocity += this.current.pushVelocity;
	//	this.current.pushVelocity.Zero();
	//
	//	if ( IsOutsideWorld() ) {
	//		gameLocal.Warning( "clip model outside world bounds for entity '%s' at (%s)", this.self.name.c_str(), this.current.origin.ToString(0) );
	//		Rest();
	//	}
	//
	//	return ( this.current.origin != oldOrigin );
	//}
	
	/*
	================
	idPhysics_Monster::UpdateTime
	================
	*/
	UpdateTime( /*int*/ endTimeMSec: number): void {
	}
	
	///*
	//================
	//idPhysics_Monster::GetTime
	//================
	//*/
	//int idPhysics_Monster::GetTime( ) const {
	//	return gameLocal.time;
	//}
	//
	///*
	//================
	//idPhysics_Monster::GetImpactInfo
	//================
	//*/
	//void idPhysics_Monster::GetImpactInfo( /*int*/ id:number, const idVec3 &point, impactInfo_t *info ) const {
	//	info.invMass = invMass;
	//	info.invInertiaTensor.Zero();
	//	info.position.Zero();
	//	info.velocity = this.current.velocity;
	//}
	//
	///*
	//================
	//idPhysics_Monster::ApplyImpulse
	//================
	//*/
	//void idPhysics_Monster::ApplyImpulse( /*int*/ id:number, const idVec3 &point, const idVec3 &impulse ) {
	//	if ( noImpact ) {
	//		return;
	//	}
	//	this.current.velocity += impulse * invMass;
	//	this.Activate();
	//}
	//
	///*
	//================
	//idPhysics_Monster::IsAtRest
	//================
	//*/
	//bool idPhysics_Monster::IsAtRest( ) const {
	//	return this.current.atRest >= 0;
	//}
	//
	///*
	//================
	//idPhysics_Monster::GetRestStartTime
	//================
	//*/
	//int idPhysics_Monster::GetRestStartTime( ) const {
	//	return this.current.atRest;
	//}
	//
	///*
	//================
	//idPhysics_Monster::SaveState
	//================
	//*/
	//void idPhysics_Monster::SaveState( ) {
	//	saved = this.current;
	//}
	//
	///*
	//================
	//idPhysics_Monster::RestoreState
	//================
	//*/
	//void idPhysics_Monster::RestoreState( ) {
	//	this.current = saved;
	//
	//	this.clipModel.Link( gameLocal.clip, this.self, 0, this.current.origin, this.clipModel.GetAxis() );
	//
	//	EvaluateContacts();
	//}
	
	/*
	================
	idPhysics_Player::SetOrigin
	================
	*/
	SetOrigin(newOrigin: idVec3, /*int*/ id: number = -1): void {
		var masterOrigin = new idVec3;
		var masterAxis = new idMat3;
	
		this.current.localOrigin = newOrigin;
		if (this.masterEntity) {
			todoThrow ( );
			//this.self.GetMasterPosition( masterOrigin, masterAxis );
			//this.current.origin = masterOrigin + newOrigin * masterAxis;
		}
		else {
			this.current.origin.opEquals( newOrigin );
		}
		this.clipModel.Link_ent( gameLocal.clip, this.self, 0, newOrigin, this.clipModel.GetAxis() );
		this.Activate();
	}
	//
	///*
	//================
	//idPhysics_Player::SetAxis
	//================
	//*/
	//void idPhysics_Monster::SetAxis( const idMat3 &newAxis, /*int*/ id:number ) {
	//	this.clipModel.Link( gameLocal.clip, this.self, 0, this.clipModel.GetOrigin(), newAxis );
	//	this.Activate();
	//}
	
	/*
	================
	idPhysics_Monster::Translate
	================
	*/
	Translate(translation: idVec3, /*int*/ id: number = -1): void {

		this.current.localOrigin.opAdditionAssignment( translation );
		this.current.origin.opAdditionAssignment( translation );
		this.clipModel.Link_ent( gameLocal.clip, this.self, 0, this.current.origin, this.clipModel.GetAxis() );
		this.Activate();
	}
	//
	///*
	//================
	//idPhysics_Monster::Rotate
	//================
	//*/
	//void idPhysics_Monster::Rotate( const idRotation &rotation, /*int*/ id:number ) {
	//	idVec3 masterOrigin;
	//	idMat3 masterAxis;
	//
	//	this.current.origin *= rotation;
	//	if ( this.masterEntity ) {
	//		this.self.GetMasterPosition( masterOrigin, masterAxis );
	//		this.current.localOrigin = ( this.current.origin - masterOrigin ) * masterAxis.Transpose();
	//	}
	//	else {
	//		this.current.localOrigin = this.current.origin;
	//	}
	//	this.clipModel.Link( gameLocal.clip, this.self, 0, this.current.origin, this.clipModel.GetAxis() * rotation.ToMat3() );
	//	this.Activate();
	//}
	//
	///*
	//================
	//idPhysics_Monster::SetLinearVelocity
	//================
	//*/
	//void idPhysics_Monster::SetLinearVelocity( const idVec3 &newLinearVelocity, /*int*/ id:number ) {
	//	this.current.velocity = newLinearVelocity;
	//	this.Activate();
	//}
	//
	///*
	//================
	//idPhysics_Monster::GetLinearVelocity
	//================
	//*/
	//const idVec3 &idPhysics_Monster::GetLinearVelocity( /*int*/ id:number ) const {
	//	return this.current.velocity;
	//}
	//
	///*
	//================
	//idPhysics_Monster::SetPushed
	//================
	//*/
	//void idPhysics_Monster::SetPushed( int deltaTime ) {
	//	// velocity with which the monster is pushed
	//	this.current.pushVelocity += ( this.current.origin - saved.origin ) / ( deltaTime * idMath::M_MS2SEC );
	//}
	//
	///*
	//================
	//idPhysics_Monster::GetPushedLinearVelocity
	//================
	//*/
	//const idVec3 &idPhysics_Monster::GetPushedLinearVelocity( /*int*/ id:number ) const {
	//	return this.current.pushVelocity;
	//}
	//
	///*
	//================
	//idPhysics_Monster::SetMaster
	//
	//  the binding is never orientated
	//================
	//*/
	SetMaster ( master: idEntity, orientated: boolean = true ) {
		var masterOrigin = new idVec3;
		var masterAxis = new idMat3;

		if ( master ) {
			if ( !this.masterEntity ) {
				// transform from world space to master space
				this.self.GetMasterPosition( masterOrigin, masterAxis );
				this.current.localOrigin.opEquals( idMat3.opMultiplication_VecMat( this.current.origin.opSubtraction( masterOrigin ), masterAxis.Transpose ( ) ) );
				this.masterEntity = master;
				this.masterYaw = masterAxis[0].ToYaw ( );
			}
			this.ClearContacts ( );
		} else {
			if ( this.masterEntity ) {
				this.masterEntity = null;
				this.Activate ( );
			}
		}
	}
	
	//const float	MONSTER_VELOCITY_MAX			= 4000;
	//const int	MONSTER_VELOCITY_TOTAL_BITS		= 16;
	//const int	MONSTER_VELOCITY_EXPONENT_BITS	= idMath::BitsForInteger( idMath::BitsForFloat( MONSTER_VELOCITY_MAX ) ) + 1;
	//const int	MONSTER_VELOCITY_MANTISSA_BITS	= MONSTER_VELOCITY_TOTAL_BITS - 1 - MONSTER_VELOCITY_EXPONENT_BITS;
	//
	///*
	//================
	//idPhysics_Monster::WriteToSnapshot
	//================
	//*/
	//void idPhysics_Monster::WriteToSnapshot( idBitMsgDelta &msg ) const {
	//	msg.WriteFloat( this.current.origin[0] );
	//	msg.WriteFloat( this.current.origin[1] );
	//	msg.WriteFloat( this.current.origin[2] );
	//	msg.WriteFloat( this.current.velocity[0], MONSTER_VELOCITY_EXPONENT_BITS, MONSTER_VELOCITY_MANTISSA_BITS );
	//	msg.WriteFloat( this.current.velocity[1], MONSTER_VELOCITY_EXPONENT_BITS, MONSTER_VELOCITY_MANTISSA_BITS );
	//	msg.WriteFloat( this.current.velocity[2], MONSTER_VELOCITY_EXPONENT_BITS, MONSTER_VELOCITY_MANTISSA_BITS );
	//	msg.WriteDeltaFloat( this.current.origin[0], this.current.localOrigin[0] );
	//	msg.WriteDeltaFloat( this.current.origin[1], this.current.localOrigin[1] );
	//	msg.WriteDeltaFloat( this.current.origin[2], this.current.localOrigin[2] );
	//	msg.WriteDeltaFloat( 0.0, this.current.pushVelocity[0], MONSTER_VELOCITY_EXPONENT_BITS, MONSTER_VELOCITY_MANTISSA_BITS );
	//	msg.WriteDeltaFloat( 0.0, this.current.pushVelocity[1], MONSTER_VELOCITY_EXPONENT_BITS, MONSTER_VELOCITY_MANTISSA_BITS );
	//	msg.WriteDeltaFloat( 0.0, this.current.pushVelocity[2], MONSTER_VELOCITY_EXPONENT_BITS, MONSTER_VELOCITY_MANTISSA_BITS );
	//	msg.WriteLong( this.current.atRest );
	//	msg.WriteBits( this.current.onGround, 1 );
	//}
	//
	///*
	//================
	//idPhysics_Monster::ReadFromSnapshot
	//================
	//*/
	//void idPhysics_Monster::ReadFromSnapshot( const idBitMsgDelta &msg ) {
	//	this.current.origin[0] = msg.ReadFloat();
	//	this.current.origin[1] = msg.ReadFloat();
	//	this.current.origin[2] = msg.ReadFloat();
	//	this.current.velocity[0] = msg.ReadFloat( MONSTER_VELOCITY_EXPONENT_BITS, MONSTER_VELOCITY_MANTISSA_BITS );
	//	this.current.velocity[1] = msg.ReadFloat( MONSTER_VELOCITY_EXPONENT_BITS, MONSTER_VELOCITY_MANTISSA_BITS );
	//	this.current.velocity[2] = msg.ReadFloat( MONSTER_VELOCITY_EXPONENT_BITS, MONSTER_VELOCITY_MANTISSA_BITS );
	//	this.current.localOrigin[0] = msg.ReadDeltaFloat( this.current.origin[0] );
	//	this.current.localOrigin[1] = msg.ReadDeltaFloat( this.current.origin[1] );
	//	this.current.localOrigin[2] = msg.ReadDeltaFloat( this.current.origin[2] );
	//	this.current.pushVelocity[0] = msg.ReadDeltaFloat( 0.0, MONSTER_VELOCITY_EXPONENT_BITS, MONSTER_VELOCITY_MANTISSA_BITS );
	//	this.current.pushVelocity[1] = msg.ReadDeltaFloat( 0.0, MONSTER_VELOCITY_EXPONENT_BITS, MONSTER_VELOCITY_MANTISSA_BITS );
	//	this.current.pushVelocity[2] = msg.ReadDeltaFloat( 0.0, MONSTER_VELOCITY_EXPONENT_BITS, MONSTER_VELOCITY_MANTISSA_BITS );
	//	this.current.atRest = msg.ReadLong();
	//	this.current.onGround = msg.ReadBits( 1 ) != 0;
	//}

}
//
//CLASS_DECLARATION(idPhysics_Actor, idPhysics_Monster)
idPhysics_Monster.CreateInstance = function() : idClass{
	try {
		var ptr = new idPhysics_Monster;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idPhysics_Monster.prototype.GetType = function ( ): idTypeInfo {
	return ( idPhysics_Monster.Type );
};

idPhysics_Monster.eventCallbacks = [
];

idPhysics_Monster.Type = new idTypeInfo( "idPhysics_Monster", "idPhysics_Actor",
	idPhysics_Monster.eventCallbacks, idPhysics_Monster.CreateInstance, idPhysics_Monster.prototype.Spawn,
	idPhysics_Monster.prototype.Save, idPhysics_Monster.prototype.Restore );

//END_CLASS