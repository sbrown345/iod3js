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


// movement parameters
var PM_STOPSPEED		= 100.0;
var PM_SWIMSCALE		= 0.5;
var PM_LADDERSPEED		= 100.0;
var PM_STEPSCALE		= 1.0;

var PM_ACCELERATE		= 10.0;
var PM_AIRACCELERATE	= 1.0;
var PM_WATERACCELERATE	= 4.0;
var PM_FLYACCELERATE	= 8.0;

var PM_FRICTION			= 6.0;
var PM_AIRFRICTION		= 0.0;
var PM_WATERFRICTION	= 1.0;
var PM_FLYFRICTION		= 3.0;
var PM_NOCLIPFRICTION	= 12.0;

var MIN_WALK_NORMAL		= 0.7;		// can't walk on very steep slopes
var OVERCLIP			= 1.001;

// movementFlags
var PMF_DUCKED			= 1;		// set when ducking
var PMF_JUMPED			= 2;		// set when the player jumped this frame
var PMF_STEPPED_UP		= 4;		// set when the player stepped up this frame
var PMF_STEPPED_DOWN		= 8;		// set when the player stepped down this frame
var PMF_JUMP_HELD			= 16;		// set when jump button is held down
var PMF_TIME_LAND			= 32;		// movementTime is time before rejump
var PMF_TIME_KNOCKBACK	= 64;		// movementTime is an air-accelerate only time
var PMF_TIME_WATERJUMP	= 128;		// movementTime is waterjump
var PMF_ALL_TIMES			= (PMF_TIME_WATERJUMP|PMF_TIME_LAND|PMF_TIME_KNOCKBACK);

var c_pmove = 0;


////#ifndef __PHYSICS_PLAYER_H__
////#define __PHYSICS_PLAYER_H__

/*
===================================================================================

Player physics

Simulates the motion of a player through the environment. Input from the
player is used to allow a certain degree of control over the motion.

===================================================================================
*/

// movementType
enum pmtype_t{
	PM_NORMAL,				// normal physics
	PM_DEAD,				// no acceleration or turning, but free falling
	PM_SPECTATOR,			// flying without gravity but with collision detection
	PM_FREEZE,				// stuck in place without control
	PM_NOCLIP				// flying without collision detection nor gravity
} pmtype_t;

enum waterLevel_t{
	WATERLEVEL_NONE,
	WATERLEVEL_FEET,
	WATERLEVEL_WAIST,
	WATERLEVEL_HEAD
};

var MAXTOUCH = 32;

class playerPState_t {
	origin = new idVec3;
	velocity = new idVec3;
	localOrigin = new idVec3;
	pushVelocity = new idVec3;
	stepUp :number/*float*/;
	movementType :number/*int*/;
	movementFlags :number/*int*/;
	movementTime: number/*int*/;

	memset0 ( ): void {
		this.origin.memset0 ( );
		this.velocity.memset0 ( );
		this.localOrigin.memset0 ( );
		this.pushVelocity.memset0 ( );
		this.stepUp = 0.0;
		this.movementType = 0;
		this.movementFlags = 0;
		this.movementTime = 0;
	}
};

class idPhysics_Player extends idPhysics_Actor {
////
////public:
////	CLASS_PROTOTYPE(idPhysics_Player);
////
////	idPhysics_Player(void);
////
////	void					Save(idSaveGame *savefile) const;
////	void					Restore(idRestoreGame *savefile);
////
////	// initialisation
////	void					SetSpeed(const float newWalkSpeed, const float newCrouchSpeed);
////	void					SetMaxStepHeight(const float newMaxStepHeight);
////	float					GetMaxStepHeight(void) const;
////	void					SetMaxJumpHeight(const float newMaxJumpHeight);
////	void					SetMovementType(const pmtype_t type);
////	void					SetPlayerInput(const usercmd_t &cmd, const idAngles &newViewAngles);
////	void					SetKnockBack(const int knockBackTime);
////	void					SetDebugLevel(bool set);
////	// feed back from last physics frame
////	waterLevel_t			GetWaterLevel(void) const;
////	int						GetWaterType(void) const;
////	bool					HasJumped(void) const;
////	bool					HasSteppedUp(void) const;
////	float					GetStepUp(void) const;
////	bool					IsCrouching(void) const;
////	bool					OnLadder(void) const;
////	const idVec3 &			PlayerGetOrigin(void) const;	// != GetOrigin
////
////public:	// common physics interface
////	bool					Evaluate(int timeStepMSec, int endTimeMSec);
////	void					UpdateTime(int endTimeMSec);
////	int						GetTime(void) const;
////
////	void					GetImpactInfo(/*int*/ id:number, const idVec3 &point, impactInfo_t *info) const;
////	void					ApplyImpulse(/*int*/ id:number, const idVec3 &point, const idVec3 &impulse);
////	bool					IsAtRest(void) const;
////	int						GetRestStartTime(void) const;
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
////	void					SetLinearVelocity(const idVec3 &newLinearVelocity, /*int*/ id:number = 0);
////
////	const idVec3 &			GetLinearVelocity(/*int*/ id:number = 0) const;
////
////	void					SetPushed(int deltaTime);
////	const idVec3 &			GetPushedLinearVelocity(/*int*/ id:number = 0) const;
////	void					ClearPushedVelocity(void);
////
////	void					SetMaster(idEntity *master, const bool orientated = true);
////
////	void					WriteToSnapshot(idBitMsgDelta &msg) const;
////	void					ReadFromSnapshot(const idBitMsgDelta &msg);
////
////private:
	// player physics state
	current = new playerPState_t;
	saved = new playerPState_t;

	// properties
	walkSpeed :number/*float*/;
	crouchSpeed :number/*float*/;
	maxStepHeight :number/*float*/;
	maxJumpHeight :number/*float*/;
	debugLevel :number/*int*/;				// if set, diagnostic output will be printed

	// player input
	command = new usercmd_t;
	viewAngles = new idAngles;

	// run-time variables
	framemsec :number/*int*/;
	frametime :number/*float*/;
	playerSpeed :number/*float*/;
	viewForward = new idVec3;
	viewRight = new idVec3;

	// walk movement
	walking:boolean;
	groundPlane:boolean;
	groundTrace = new trace_t;
	groundMaterial: idMaterial;

	// ladder movement
	ladder:boolean;
	ladderNormal = new idVec3;

	// results of last evaluate
	waterLevel: waterLevel_t;
	waterType :number/*int*/;
////
////private:
////	float					CmdScale(const usercmd_t &cmd) const;
////	void					Accelerate(const idVec3 &wishdir, const float wishspeed, const float accel);
////	bool					SlideMove(bool gravity, bool stepUp, bool stepDown, bool push);
////	void					Friction(void);
////	void					WaterJumpMove(void);
////	void					WaterMove(void);
////	void					FlyMove(void);
////	void					AirMove(void);
////	void					WalkMove(void);
////	void					DeadMove(void);
////	void					NoclipMove(void);
////	void					SpectatorMove(void);
////	void					LadderMove(void);
////	void					CorrectAllSolid(trace_t &trace, int contents);
////	void					CheckGround(void);
////	void					CheckDuck(void);
////	void					CheckLadder(void);
////	bool					CheckJump(void);
////	bool					CheckWaterJump(void);
////	void					SetWaterLevel(void);
////	void					DropTimers(void);
////	void					MovePlayer(int msec);
////};
////
////#endif /* !__PHYSICS_PLAYER_H__ */
////
////
/////*
////============
////idPhysics_Player::CmdScale
////
////Returns the scale factor to apply to cmd movements
////This allows the clients to use axial -127 to 127 values for all directions
////without getting a sqrt(2) distortion in speed.
////============
////*/
////float idPhysics_Player::CmdScale( const usercmd_t &cmd ) const {
////	int		max;
////	float	total;
////	float	scale;
////	int		forwardmove;
////	int		rightmove;
////	int		upmove;
////
////	forwardmove = cmd.forwardmove;
////	rightmove = cmd.rightmove;
////
////	// since the crouch key doubles as downward movement, ignore downward movement when we're on the ground
////	// otherwise crouch speed will be lower than specified
////	if ( walking ) {
////		upmove = 0;
////	} else {
////		upmove = cmd.upmove;
////	}
////
////	max = abs( forwardmove );
////	if ( abs( rightmove ) > max ) {
////		max = abs( rightmove );
////	}
////	if ( abs( upmove ) > max ) {
////		max = abs( upmove );
////	}
////
////	if ( !max ) {
////		return 0.0;
////	}
////
////	total = idMath.Sqrt( (float) forwardmove * forwardmove + rightmove * rightmove + upmove * upmove );
////	scale = (float) playerSpeed * max / ( 127.0 * total );
////
////	return scale;
////}
////
/////*
////==============
////idPhysics_Player::Accelerate
////
////Handles user intended acceleration
////==============
////*/
////void idPhysics_Player::Accelerate( const idVec3 &wishdir, const float wishspeed, const float accel ) {
////#if 1
////	// q2 style
////	float addspeed, accelspeed, currentspeed;
////
////	currentspeed = this.current.velocity * wishdir;
////	addspeed = wishspeed - currentspeed;
////	if (addspeed <= 0) {
////		return;
////	}
////	accelspeed = accel * frametime * wishspeed;
////	if (accelspeed > addspeed) {
////		accelspeed = addspeed;
////	}
////	
////	this.current.velocity += accelspeed * wishdir;
////#else
////	// proper way (avoids strafe jump maxspeed bug), but feels bad
////	idVec3		wishVelocity;
////	idVec3		pushDir;
////	float		pushLen;
////	float		canPush;
////
////	wishVelocity = wishdir * wishspeed;
////	pushDir = wishVelocity - this.current.velocity;
////	pushLen = pushDir.Normalize();
////
////	canPush = accel * frametime * wishspeed;
////	if (canPush > pushLen) {
////		canPush = pushLen;
////	}
////
////	this.current.velocity += canPush * pushDir;
////#endif
////}

/*
==================
idPhysics_Player::SlideMove

Returns true if the velocity was clipped in some way
==================
*/
	MAX_CLIP_PLANES	= 5;

////bool idPhysics_Player::SlideMove( bool gravity, bool stepUp, bool stepDown, bool push ) {
////	int			i, j, k, pushFlags;
////	int			bumpcount, numbumps, numplanes;
////	float		d, time_left, into, totalMass;
////	idVec3		dir, planes[this.MAX_CLIP_PLANES];
////	idVec3		end, stepEnd, primal_velocity, endVelocity, endClipVelocity, clipVelocity;
////	trace_t		trace, stepTrace, downTrace;
////	bool		nearGround, stepped, pushed;
////
////	numbumps = 4;
////
////	primal_velocity = this.current.velocity;
////
////	if ( gravity ) {
////		endVelocity = this.current.velocity + gravityVector * frametime;
////		this.current.velocity = ( this.current.velocity + endVelocity ) * 0.5;
////		primal_velocity = endVelocity;
////		if ( groundPlane ) {
////			// slide along the ground plane
////			this.current.velocity.ProjectOntoPlane( this.groundTrace.c.normal, OVERCLIP );
////		}
////	}
////	else {
////		endVelocity = this.current.velocity;
////	}
////
////	time_left = frametime;
////
////	// never turn against the ground plane
////	if ( groundPlane ) {
////		numplanes = 1;
////		planes[0] = this.groundTrace.c.normal;
////	} else {
////		numplanes = 0;
////	}
////
////	// never turn against original velocity
////	planes[numplanes] = this.current.velocity;
////	planes[numplanes].Normalize();
////	numplanes++;
////
////	for ( bumpcount = 0; bumpcount < numbumps; bumpcount++ ) {
////
////		// calculate position we are trying to move to
////		end = this.current.origin + time_left * this.current.velocity;
////
////		// see if we can make it there
////		gameLocal.clip.Translation( trace, this.current.origin, end, this.clipModel, this.clipModel.GetAxis(), clipMask, this.self );
////
////		time_left -= time_left * trace.fraction;
////		this.current.origin = trace.endpos;
////
////		// if moved the entire distance
////		if ( trace.fraction >= 1.0 ) {
////			break;
////		}
////
////		stepped = pushed = false;
////
////		// if we are allowed to step up
////		if ( stepUp ) {
////
////			nearGround = groundPlane | ladder;
////
////			if ( !nearGround ) {
////				// trace down to see if the player is near the ground
////				// step checking when near the ground allows the player to move up stairs smoothly while jumping
////				stepEnd = this.current.origin + maxStepHeight * gravityNormal;
////				gameLocal.clip.Translation( downTrace, this.current.origin, stepEnd, this.clipModel, this.clipModel.GetAxis(), clipMask, this.self );
////				nearGround = ( downTrace.fraction < 1.0 && (downTrace.c.normal * -gravityNormal) > MIN_WALK_NORMAL );
////			}
////
////			// may only step up if near the ground or on a ladder
////			if ( nearGround ) {
////
////				// step up
////				stepEnd = this.current.origin - maxStepHeight * gravityNormal;
////				gameLocal.clip.Translation( downTrace, this.current.origin, stepEnd, this.clipModel, this.clipModel.GetAxis(), clipMask, this.self );
////
////				// trace along velocity
////				stepEnd = downTrace.endpos + time_left * this.current.velocity;
////				gameLocal.clip.Translation( stepTrace, downTrace.endpos, stepEnd, this.clipModel, this.clipModel.GetAxis(), clipMask, this.self );
////
////				// step down
////				stepEnd = stepTrace.endpos + maxStepHeight * gravityNormal;
////				gameLocal.clip.Translation( downTrace, stepTrace.endpos, stepEnd, this.clipModel, this.clipModel.GetAxis(), clipMask, this.self );
////
////				if ( downTrace.fraction >= 1.0 || (downTrace.c.normal * -gravityNormal) > MIN_WALK_NORMAL ) {
////
////					// if moved the entire distance
////					if ( stepTrace.fraction >= 1.0 ) {
////						time_left = 0;
////						this.current.stepUp -= ( downTrace.endpos - this.current.origin ) * gravityNormal;
////						this.current.origin = downTrace.endpos;
////						this.current.movementFlags |= PMF_STEPPED_UP;
////						this.current.velocity *= PM_STEPSCALE;
////						break;
////					}
////
////					// if the move is further when stepping up
////					if ( stepTrace.fraction > trace.fraction ) {
////						time_left -= time_left * stepTrace.fraction;
////						this.current.stepUp -= ( downTrace.endpos - this.current.origin ) * gravityNormal;
////						this.current.origin = downTrace.endpos;
////						this.current.movementFlags |= PMF_STEPPED_UP;
////						this.current.velocity *= PM_STEPSCALE;
////						trace = stepTrace;
////						stepped = true;
////					}
////				}
////			}
////		}
////
////		// if we can push other entities and not blocked by the world
////		if ( push && trace.c.entityNum != ENTITYNUM_WORLD ) {
////
////			this.clipModel.SetPosition( this.current.origin, this.clipModel.GetAxis() );
////
////			// clip movement, only push idMoveables, don't push entities the player is standing on
////			// apply impact to pushed objects
////			pushFlags = PUSHFL_CLIP|PUSHFL_ONLYMOVEABLE|PUSHFL_NOGROUNDENTITIES|PUSHFL_APPLYIMPULSE;
////
////			// clip & push
////			totalMass = gameLocal.push.ClipTranslationalPush( trace, this.self, pushFlags, end, end - this.current.origin );
////
////			if ( totalMass > 0.0 ) {
////				// decrease velocity based on the total mass of the objects being pushed ?
////				this.current.velocity *= 1.0 - idMath.ClampFloat( 0.0, 1000.0, totalMass - 20.0 ) * ( 1.0 / 950.0 );
////				pushed = true;
////			}
////	
////			this.current.origin = trace.endpos;
////			time_left -= time_left * trace.fraction;
////
////			// if moved the entire distance
////			if ( trace.fraction >= 1.0 ) {
////				break;
////			}
////		}
////
////		if ( !stepped ) {
////			// let the entity know about the collision
////			this.self.Collide( trace, this.current.velocity );
////		}
////
////		if ( numplanes >= this.MAX_CLIP_PLANES ) {
////			// MrElusive: I think we have some relatively high poly LWO models with a lot of slanted tris
////			// where it may hit the max clip planes
////			this.current.velocity = vec3_origin;
////			return true;
////		}
////
////		//
////		// if this is the same plane we hit before, nudge velocity
////		// out along it, which fixes some epsilon issues with
////		// non-axial planes
////		//
////		for ( i = 0; i < numplanes; i++ ) {
////			if ( ( trace.c.normal * planes[i] ) > 0.999f ) {
////				this.current.velocity += trace.c.normal;
////				break;
////			}
////		}
////		if ( i < numplanes ) {
////			continue;
////		}
////		planes[numplanes] = trace.c.normal;
////		numplanes++;
////
////		//
////		// modify velocity so it parallels all of the clip planes
////		//
////
////		// find a plane that it enters
////		for ( i = 0; i < numplanes; i++ ) {
////			into = this.current.velocity * planes[i];
////			if ( into >= 0.1f ) {
////				continue;		// move doesn't interact with the plane
////			}
////
////			// slide along the plane
////			clipVelocity = this.current.velocity;
////			clipVelocity.ProjectOntoPlane( planes[i], OVERCLIP );
////
////			// slide along the plane
////			endClipVelocity = endVelocity;
////			endClipVelocity.ProjectOntoPlane( planes[i], OVERCLIP );
////
////			// see if there is a second plane that the new move enters
////			for ( j = 0; j < numplanes; j++ ) {
////				if ( j == i ) {
////					continue;
////				}
////				if ( ( clipVelocity * planes[j] ) >= 0.1f ) {
////					continue;		// move doesn't interact with the plane
////				}
////
////				// try clipping the move to the plane
////				clipVelocity.ProjectOntoPlane( planes[j], OVERCLIP );
////				endClipVelocity.ProjectOntoPlane( planes[j], OVERCLIP );
////
////				// see if it goes back into the first clip plane
////				if ( ( clipVelocity * planes[i] ) >= 0 ) {
////					continue;
////				}
////
////				// slide the original velocity along the crease
////				dir = planes[i].Cross( planes[j] );
////				dir.Normalize();
////				d = dir * this.current.velocity;
////				clipVelocity = d * dir;
////
////				dir = planes[i].Cross( planes[j] );
////				dir.Normalize();
////				d = dir * endVelocity;
////				endClipVelocity = d * dir;
////
////				// see if there is a third plane the the new move enters
////				for ( k = 0; k < numplanes; k++ ) {
////					if ( k == i || k == j ) {
////						continue;
////					}
////					if ( ( clipVelocity * planes[k] ) >= 0.1f ) {
////						continue;		// move doesn't interact with the plane
////					}
////
////					// stop dead at a tripple plane interaction
////					this.current.velocity = vec3_origin;
////					return true;
////				}
////			}
////
////			// if we have fixed all interactions, try another move
////			this.current.velocity = clipVelocity;
////			endVelocity = endClipVelocity;
////			break;
////		}
////	}
////
////	// step down
////	if ( stepDown && groundPlane ) {
////		stepEnd = this.current.origin + gravityNormal * maxStepHeight;
////		gameLocal.clip.Translation( downTrace, this.current.origin, stepEnd, this.clipModel, this.clipModel.GetAxis(), clipMask, this.self );
////		if ( downTrace.fraction > 1e-4f && downTrace.fraction < 1.0 ) {
////			this.current.stepUp -= ( downTrace.endpos - this.current.origin ) * gravityNormal;
////			this.current.origin = downTrace.endpos;
////			this.current.movementFlags |= PMF_STEPPED_DOWN;
////			this.current.velocity *= PM_STEPSCALE;
////		}
////	}
////
////	if ( gravity ) {
////		this.current.velocity = endVelocity;
////	}
////
////	// come to a dead stop when the velocity orthogonal to the gravity flipped
////	clipVelocity = this.current.velocity - gravityNormal * this.current.velocity * gravityNormal;
////	endClipVelocity = endVelocity - gravityNormal * endVelocity * gravityNormal;
////	if ( clipVelocity * endClipVelocity < 0.0 ) {
////		this.current.velocity = gravityNormal * this.current.velocity * gravityNormal;
////	}
////
////	return (bool)( bumpcount == 0 );
////}
////
/////*
////==================
////idPhysics_Player::Friction
////
////Handles both ground friction and water friction
////==================
////*/
////void idPhysics_Player::Friction( ) {
////	idVec3	vel;
////	float	speed, newspeed, control;
////	float	drop;
////	
////	vel = this.current.velocity;
////	if ( walking ) {
////		// ignore slope movement, remove all velocity in gravity direction
////		vel += (vel * gravityNormal) * gravityNormal;
////	}
////
////	speed = vel.Length();
////	if ( speed < 1.0 ) {
////		// remove all movement orthogonal to gravity, allows for sinking underwater
////		if ( fabs( this.current.velocity * gravityNormal ) < 1e-5f ) {
////			this.current.velocity.Zero();
////		} else {
////			this.current.velocity = (this.current.velocity * gravityNormal) * gravityNormal;
////		}
////		// FIXME: still have z friction underwater?
////		return;
////	}
////
////	drop = 0;
////
////	// spectator friction
////	if ( this.current.movementType == PM_SPECTATOR ) {
////		drop += speed * PM_FLYFRICTION * frametime;
////	}
////	// apply ground friction
////	else if ( walking && waterLevel <= WATERLEVEL_FEET ) {
////		// no friction on slick surfaces
////		if ( !(groundMaterial && groundMaterial.GetSurfaceFlags() & SURF_SLICK) ) {
////			// if getting knocked back, no friction
////			if ( !(this.current.movementFlags & PMF_TIME_KNOCKBACK) ) {
////				control = speed < PM_STOPSPEED ? PM_STOPSPEED : speed;
////				drop += control * PM_FRICTION * frametime;
////			}
////		}
////	}
////	// apply water friction even if just wading
////	else if ( waterLevel ) {
////		drop += speed * PM_WATERFRICTION * waterLevel * frametime;
////	}
////	// apply air friction
////	else {
////		drop += speed * PM_AIRFRICTION * frametime;
////	}
////
////	// scale the velocity
////	newspeed = speed - drop;
////	if (newspeed < 0) {
////		newspeed = 0;
////	}
////	this.current.velocity *= ( newspeed / speed );
////}
////
/////*
////===================
////idPhysics_Player::WaterJumpMove
////
////Flying out of the water
////===================
////*/
////void idPhysics_Player::WaterJumpMove( ) {
////
////	// waterjump has no control, but falls
////	idPhysics_Player::SlideMove( true, true, false, false );
////
////	// add gravity
////	this.current.velocity += gravityNormal * frametime;
////	// if falling down
////	if ( this.current.velocity * gravityNormal > 0.0 ) {
////		// cancel as soon as we are falling down again
////		this.current.movementFlags &= ~PMF_ALL_TIMES;
////		this.current.movementTime = 0;
////	}
////}
////
/////*
////===================
////idPhysics_Player::WaterMove
////===================
////*/
////void idPhysics_Player::WaterMove( ) {
////	idVec3	wishvel;
////	float	wishspeed;
////	idVec3	wishdir;
////	float	scale;
////	float	vel;
////
////	if ( idPhysics_Player::CheckWaterJump() ) {
////		idPhysics_Player::WaterJumpMove();
////		return;
////	}
////
////	idPhysics_Player::Friction();
////
////	scale = idPhysics_Player::CmdScale( command );
////
////	// user intentions
////	if ( !scale ) {
////		wishvel = gravityNormal * 60; // sink towards bottom
////	} else {
////		wishvel = scale * (viewForward * command.forwardmove + viewRight * command.rightmove);
////		wishvel -= scale * gravityNormal * command.upmove;
////	}
////
////	wishdir = wishvel;
////	wishspeed = wishdir.Normalize();
////
////	if ( wishspeed > playerSpeed * PM_SWIMSCALE ) {
////		wishspeed = playerSpeed * PM_SWIMSCALE;
////	}
////
////	idPhysics_Player::Accelerate( wishdir, wishspeed, PM_WATERACCELERATE );
////
////	// make sure we can go up slopes easily under water
////	if ( groundPlane && ( this.current.velocity * this.groundTrace.c.normal ) < 0.0 ) {
////		vel = this.current.velocity.Length();
////		// slide along the ground plane
////		this.current.velocity.ProjectOntoPlane( this.groundTrace.c.normal, OVERCLIP );
////
////		this.current.velocity.Normalize();
////		this.current.velocity *= vel;
////	}
////
////	idPhysics_Player::SlideMove( false, true, false, false );
////}
////
/////*
////===================
////idPhysics_Player::FlyMove
////===================
////*/
////void idPhysics_Player::FlyMove( ) {
////	idVec3	wishvel;
////	float	wishspeed;
////	idVec3	wishdir;
////	float	scale;
////
////	// normal slowdown
////	idPhysics_Player::Friction();
////
////	scale = idPhysics_Player::CmdScale( command );
////
////	if ( !scale ) {
////		wishvel = vec3_origin;
////	} else {
////		wishvel = scale * (viewForward * command.forwardmove + viewRight * command.rightmove);
////		wishvel -= scale * gravityNormal * command.upmove;
////	}
////
////	wishdir = wishvel;
////	wishspeed = wishdir.Normalize();
////
////	idPhysics_Player::Accelerate( wishdir, wishspeed, PM_FLYACCELERATE );
////
////	idPhysics_Player::SlideMove( false, false, false, false );
////}
////
/////*
////===================
////idPhysics_Player::AirMove
////===================
////*/
////void idPhysics_Player::AirMove( ) {
////	idVec3		wishvel;
////	idVec3		wishdir;
////	float		wishspeed;
////	float		scale;
////
////	idPhysics_Player::Friction();
////
////	scale = idPhysics_Player::CmdScale( command );
////
////	// project moves down to flat plane
////	viewForward -= (viewForward * gravityNormal) * gravityNormal;
////	viewRight -= (viewRight * gravityNormal) * gravityNormal;
////	viewForward.Normalize();
////	viewRight.Normalize();
////
////	wishvel = viewForward * command.forwardmove + viewRight * command.rightmove;
////	wishvel -= (wishvel * gravityNormal) * gravityNormal;
////	wishdir = wishvel;
////	wishspeed = wishdir.Normalize();
////	wishspeed *= scale;
////
////	// not on ground, so little effect on velocity
////	idPhysics_Player::Accelerate( wishdir, wishspeed, PM_AIRACCELERATE );
////
////	// we may have a ground plane that is very steep, even
////	// though we don't have a groundentity
////	// slide along the steep plane
////	if ( groundPlane ) {
////		this.current.velocity.ProjectOntoPlane( this.groundTrace.c.normal, OVERCLIP );
////	}
////
////	idPhysics_Player::SlideMove( true, false, false, false );
////}
////
/////*
////===================
////idPhysics_Player::WalkMove
////===================
////*/
////void idPhysics_Player::WalkMove( ) {
////	idVec3		wishvel;
////	idVec3		wishdir;
////	float		wishspeed;
////	float		scale;
////	float		accelerate;
////	idVec3		oldVelocity, vel;
////	float		oldVel, newVel;
////
////	if ( waterLevel > WATERLEVEL_WAIST && ( viewForward * this.groundTrace.c.normal ) > 0.0 ) {
////		// begin swimming
////		idPhysics_Player::WaterMove();
////		return;
////	}
////
////	if ( idPhysics_Player::CheckJump() ) {
////		// jumped away
////		if ( waterLevel > WATERLEVEL_FEET ) {
////			idPhysics_Player::WaterMove();
////		}
////		else {
////			idPhysics_Player::AirMove();
////		}
////		return;
////	}
////
////	idPhysics_Player::Friction();
////
////	scale = idPhysics_Player::CmdScale( command );
////
////	// project moves down to flat plane
////	viewForward -= (viewForward * gravityNormal) * gravityNormal;
////	viewRight -= (viewRight * gravityNormal) * gravityNormal;
////
////	// project the forward and right directions onto the ground plane
////	viewForward.ProjectOntoPlane( this.groundTrace.c.normal, OVERCLIP );
////	viewRight.ProjectOntoPlane( this.groundTrace.c.normal, OVERCLIP );
////	//
////	viewForward.Normalize();
////	viewRight.Normalize();
////
////	wishvel = viewForward * command.forwardmove + viewRight * command.rightmove;
////	wishdir = wishvel;
////	wishspeed = wishdir.Normalize();
////	wishspeed *= scale;
////
////	// clamp the speed lower if wading or walking on the bottom
////	if ( waterLevel ) {
////		float	waterScale;
////
////		waterScale = waterLevel / 3.0;
////		waterScale = 1.0 - ( 1.0 - PM_SWIMSCALE ) * waterScale;
////		if ( wishspeed > playerSpeed * waterScale ) {
////			wishspeed = playerSpeed * waterScale;
////		}
////	}
////
////	// when a player gets hit, they temporarily lose full control, which allows them to be moved a bit
////	if ( ( groundMaterial && groundMaterial.GetSurfaceFlags() & SURF_SLICK ) || this.current.movementFlags & PMF_TIME_KNOCKBACK ) {
////		accelerate = PM_AIRACCELERATE;
////	}
////	else {
////		accelerate = PM_ACCELERATE;
////	}
////
////	idPhysics_Player::Accelerate( wishdir, wishspeed, accelerate );
////
////	if ( ( groundMaterial && groundMaterial.GetSurfaceFlags() & SURF_SLICK ) || this.current.movementFlags & PMF_TIME_KNOCKBACK ) {
////		this.current.velocity += gravityVector * frametime;
////	}
////
////	oldVelocity = this.current.velocity;
////
////	// slide along the ground plane
////	this.current.velocity.ProjectOntoPlane( this.groundTrace.c.normal, OVERCLIP );
////
////	// if not clipped into the opposite direction
////	if ( oldVelocity * this.current.velocity > 0.0 ) {
////		newVel = this.current.velocity.LengthSqr();
////		if ( newVel > 1.0 ) {
////			oldVel = oldVelocity.LengthSqr();
////			if ( oldVel > 1.0 ) {
////				// don't decrease velocity when going up or down a slope
////				this.current.velocity *= idMath.Sqrt( oldVel / newVel );
////			}
////		}
////	}
////
////	// don't do anything if standing still
////	vel = this.current.velocity - (this.current.velocity * gravityNormal) * gravityNormal;
////	if ( !vel.LengthSqr() ) {
////		return;
////	}
////
////	gameLocal.push.InitSavingPushedEntityPositions();
////
////	idPhysics_Player::SlideMove( false, true, true, true );
////}
////
/////*
////==============
////idPhysics_Player::DeadMove
////==============
////*/
////void idPhysics_Player::DeadMove( ) {
////	float	forward;
////
////	if ( !walking ) {
////		return;
////	}
////
////	// extra friction
////	forward = this.current.velocity.Length();
////	forward -= 20;
////	if ( forward <= 0 ) {
////		this.current.velocity = vec3_origin;
////	}
////	else {
////		this.current.velocity.Normalize();
////		this.current.velocity *= forward;
////	}
////}
////
/////*
////===============
////idPhysics_Player::NoclipMove
////===============
////*/
////void idPhysics_Player::NoclipMove( ) {
////	float		speed, drop, friction, newspeed, stopspeed;
////	float		scale, wishspeed;
////	idVec3		wishdir;
////
////	// friction
////	speed = this.current.velocity.Length();
////	if ( speed < 20.0 ) {
////		this.current.velocity = vec3_origin;
////	}
////	else {
////		stopspeed = playerSpeed * 0.3;
////		if ( speed < stopspeed ) {
////			speed = stopspeed;
////		}
////		friction = PM_NOCLIPFRICTION;
////		drop = speed * friction * frametime;
////
////		// scale the velocity
////		newspeed = speed - drop;
////		if (newspeed < 0) {
////			newspeed = 0;
////		}
////
////		this.current.velocity *= newspeed / speed;
////	}
////
////	// accelerate
////	scale = idPhysics_Player::CmdScale( command );
////
////	wishdir = scale * (viewForward * command.forwardmove + viewRight * command.rightmove);
////	wishdir -= scale * gravityNormal * command.upmove;
////	wishspeed = wishdir.Normalize();
////	wishspeed *= scale;
////
////	idPhysics_Player::Accelerate( wishdir, wishspeed, PM_ACCELERATE );
////
////	// move
////	this.current.origin += frametime * this.current.velocity;
////}
////
/////*
////===============
////idPhysics_Player::SpectatorMove
////===============
////*/
////void idPhysics_Player::SpectatorMove( ) {
////	idVec3	wishvel;
////	float	wishspeed;
////	idVec3	wishdir;
////	float	scale;
////
////	trace_t	trace;
////	idVec3	end;
////
////	// fly movement
////
////	idPhysics_Player::Friction();
////
////	scale = idPhysics_Player::CmdScale( command );
////
////	if ( !scale ) {
////		wishvel = vec3_origin;
////	} else {
////		wishvel = scale * (viewForward * command.forwardmove + viewRight * command.rightmove);
////	}
////
////	wishdir = wishvel;
////	wishspeed = wishdir.Normalize();
////
////	idPhysics_Player::Accelerate( wishdir, wishspeed, PM_FLYACCELERATE );
////
////	idPhysics_Player::SlideMove( false, false, false, false );
////}
////
/////*
////============
////idPhysics_Player::LadderMove
////============
////*/
////void idPhysics_Player::LadderMove( ) {
////	idVec3	wishdir, wishvel, right;
////	float	wishspeed, scale;
////	float	upscale;
////
////	// stick to the ladder
////	wishvel = -100.0 * ladderNormal;
////	this.current.velocity = (gravityNormal * this.current.velocity) * gravityNormal + wishvel;
////
////	upscale = (-gravityNormal * viewForward + 0.5) * 2.5;
////	if ( upscale > 1.0 ) {
////		upscale = 1.0;
////	}
////	else if ( upscale < -1.0 ) {
////		upscale = -1.0;
////	}
////
////	scale = idPhysics_Player::CmdScale( command );
////	wishvel = -0.9f * gravityNormal * upscale * scale * (float)command.forwardmove;
////
////	// strafe
////	if ( command.rightmove ) {
////		// right vector orthogonal to gravity
////		right = viewRight - (gravityNormal * viewRight) * gravityNormal;
////		// project right vector into ladder plane
////		right = right - (ladderNormal * right) * ladderNormal;
////		right.Normalize();
////
////		// if we are looking away from the ladder, reverse the right vector
////		if ( ladderNormal * viewForward > 0.0 ) {
////			right = -right;
////		}
////		wishvel += 2.0 * right * scale * (float) command.rightmove;
////	}
////
////	// up down movement
////	if ( command.upmove ) {
////		wishvel += -0.5 * gravityNormal * scale * (float) command.upmove;
////	}
////
////	// do strafe friction
////	idPhysics_Player::Friction();
////
////	// accelerate
////	wishspeed = wishvel.Normalize();
////	idPhysics_Player::Accelerate( wishvel, wishspeed, PM_ACCELERATE );
////
////	// cap the vertical velocity
////	upscale = this.current.velocity * -gravityNormal;
////	if ( upscale < -PM_LADDERSPEED ) {
////		this.current.velocity += gravityNormal * (upscale + PM_LADDERSPEED);
////	}
////	else if ( upscale > PM_LADDERSPEED ) {
////		this.current.velocity += gravityNormal * (upscale - PM_LADDERSPEED);
////	}
////
////	if ( (wishvel * gravityNormal) == 0.0 ) {
////		if ( this.current.velocity * gravityNormal < 0.0 ) {
////			this.current.velocity += gravityVector * frametime;
////			if ( this.current.velocity * gravityNormal > 0.0 ) {
////				this.current.velocity -= (gravityNormal * this.current.velocity) * gravityNormal;
////			}
////		}
////		else {
////			this.current.velocity -= gravityVector * frametime;
////			if ( this.current.velocity * gravityNormal < 0.0 ) {
////				this.current.velocity -= (gravityNormal * this.current.velocity) * gravityNormal;
////			}
////		}
////	}
////
////	idPhysics_Player::SlideMove( false, ( command.forwardmove > 0 ), false, false );
////}
////
/////*
////=============
////idPhysics_Player::CorrectAllSolid
////=============
////*/
////void idPhysics_Player::CorrectAllSolid( trace_t &trace, int contents ) {
////	if ( debugLevel ) {
////		gameLocal.Printf( "%i:allsolid\n", c_pmove );
////	}
////
////	// FIXME: jitter around to find a free spot ?
////
////	if ( trace.fraction >= 1.0 ) {
////		memset( &trace, 0, sizeof( trace ) );
////		trace.endpos = this.current.origin;
////		trace.endAxis = clipModelAxis;
////		trace.fraction = 0.0;
////		trace.c.dist = this.current.origin.z;
////		trace.c.normal.Set( 0, 0, 1 );
////		trace.c.point = this.current.origin;
////		trace.c.entityNum = ENTITYNUM_WORLD;
////		trace.c.id = 0;
////		trace.c.type = CONTACT_TRMVERTEX;
////		trace.c.material = NULL;
////		trace.c.contents = contents;
////	}
////}
////
/////*
////=============
////idPhysics_Player::CheckGround
////=============
////*/
////void idPhysics_Player::CheckGround( ) {
////	int i, contents;
////	idVec3 point;
////	bool hadGroundContacts;
////
////	hadGroundContacts = HasGroundContacts();
////
////	// set the clip model origin before getting the contacts
////	this.clipModel.SetPosition( this.current.origin, this.clipModel.GetAxis() );
////
////	EvaluateContacts();
////
////	// setup a ground trace from the contacts
////	this.groundTrace.endpos = this.current.origin;
////	this.groundTrace.endAxis = this.clipModel.GetAxis();
////	if ( contacts.Num() ) {
////		this.groundTrace.fraction = 0.0;
////		this.groundTrace.c = contacts[0];
////		for ( i = 1; i < contacts.Num(); i++ ) {
////			this.groundTrace.c.normal += contacts[i].normal;
////		}
////		this.groundTrace.c.normal.Normalize();
////	} else {
////		this.groundTrace.fraction = 1.0;
////	}
////
////	contents = gameLocal.clip.Contents( this.current.origin, this.clipModel, this.clipModel.GetAxis(), -1, this.self );
////	if ( contents & MASK_SOLID ) {
////		// do something corrective if stuck in solid
////		idPhysics_Player::CorrectAllSolid( this.groundTrace, contents );
////	}
////
////	// if the trace didn't hit anything, we are in free fall
////	if ( this.groundTrace.fraction == 1.0 ) {
////		groundPlane = false;
////		walking = false;
////		groundEntityPtr = NULL;
////		return;
////	}
////
////	groundMaterial = this.groundTrace.c.material;
////	groundEntityPtr = gameLocal.entities[ this.groundTrace.c.entityNum ];
////
////	// check if getting thrown off the ground
////	if ( (this.current.velocity * -gravityNormal) > 0.0 && ( this.current.velocity * this.groundTrace.c.normal ) > 10.0 ) {
////		if ( debugLevel ) {
////			gameLocal.Printf( "%i:kickoff\n", c_pmove );
////		}
////
////		groundPlane = false;
////		walking = false;
////		return;
////	}
////	
////	// slopes that are too steep will not be considered onground
////	if ( ( this.groundTrace.c.normal * -gravityNormal ) < MIN_WALK_NORMAL ) {
////		if ( debugLevel ) {
////			gameLocal.Printf( "%i:steep\n", c_pmove );
////		}
////
////		// FIXME: if they can't slide down the slope, let them walk (sharp crevices)
////
////		// make sure we don't die from sliding down a steep slope
////		if ( this.current.velocity * gravityNormal > 150.0 ) {
////			this.current.velocity -= ( this.current.velocity * gravityNormal - 150.0 ) * gravityNormal;
////		}
////
////		groundPlane = true;
////		walking = false;
////		return;
////	}
////
////	groundPlane = true;
////	walking = true;
////
////	// hitting solid ground will end a waterjump
////	if ( this.current.movementFlags & PMF_TIME_WATERJUMP ) {
////		this.current.movementFlags &= ~( PMF_TIME_WATERJUMP | PMF_TIME_LAND );
////		this.current.movementTime = 0;
////	}
////
////	// if the player didn't have ground contacts the previous frame
////	if ( !hadGroundContacts ) {
////
////		// don't do landing time if we were just going down a slope
////		if ( (this.current.velocity * -gravityNormal) < -200.0 ) {
////			// don't allow another jump for a little while
////			this.current.movementFlags |= PMF_TIME_LAND;
////			this.current.movementTime = 250;
////		}
////	}
////
////	// let the entity know about the collision
////	this.self.Collide( this.groundTrace, this.current.velocity );
////
////	if ( groundEntityPtr.GetEntity() ) {
////		impactInfo_t info;
////		groundEntityPtr.GetEntity().GetImpactInfo( this.self, this.groundTrace.c.id, this.groundTrace.c.point, &info );
////		if ( info.invMass != 0.0 ) {
////			groundEntityPtr.GetEntity().ApplyImpulse( this.self, this.groundTrace.c.id, this.groundTrace.c.point, this.current.velocity / ( info.invMass * 10.0 ) );
////		}
////	}
////}
////
/////*
////==============
////idPhysics_Player::CheckDuck
////
////Sets clip model size
////==============
////*/
////void idPhysics_Player::CheckDuck( ) {
////	trace_t	trace;
////	idVec3 end;
////	idBounds bounds;
////	float maxZ;
////
////	if ( this.current.movementType == PM_DEAD ) {
////		maxZ = pm_deadheight.GetFloat();
////	} else {
////		// stand up when up against a ladder
////		if ( command.upmove < 0 && !ladder ) {
////			// duck
////			this.current.movementFlags |= PMF_DUCKED;
////		} else {
////			// stand up if possible
////			if ( this.current.movementFlags & PMF_DUCKED ) {
////				// try to stand up
////				end = this.current.origin - ( pm_normalheight.GetFloat() - pm_crouchheight.GetFloat() ) * gravityNormal;
////				gameLocal.clip.Translation( trace, this.current.origin, end, this.clipModel, this.clipModel.GetAxis(), clipMask, this.self );
////				if ( trace.fraction >= 1.0 ) {
////					this.current.movementFlags &= ~PMF_DUCKED;
////				}
////			}
////		}
////
////		if ( this.current.movementFlags & PMF_DUCKED ) {
////			playerSpeed = crouchSpeed;
////			maxZ = pm_crouchheight.GetFloat();
////		} else {
////			maxZ = pm_normalheight.GetFloat();
////		}
////	}
////	// if the clipModel height should change
////	if ( this.clipModel.GetBounds()[1][2] != maxZ ) {
////
////		bounds = this.clipModel.GetBounds();
////		bounds[1][2] = maxZ;
////		if ( pm_usecylinder.GetBool() ) {
////			this.clipModel.LoadModel( idTraceModel( bounds, 8 ) );
////		} else {
////			this.clipModel.LoadModel( idTraceModel( bounds ) );
////		}
////	}
////}
////
/////*
////================
////idPhysics_Player::CheckLadder
////================
////*/
////void idPhysics_Player::CheckLadder( ) {
////	idVec3		forward, start, end;
////	trace_t		trace;
////	float		tracedist;
////	
////	if ( this.current.movementTime ) {
////		return;
////	}
////
////	// if on the ground moving backwards
////	if ( walking && command.forwardmove <= 0 ) {
////		return;
////	}
////
////	// forward vector orthogonal to gravity
////	forward = viewForward - (gravityNormal * viewForward) * gravityNormal;
////	forward.Normalize();
////
////	if ( walking ) {
////		// don't want to get sucked towards the ladder when still walking
////		tracedist = 1.0;
////	} else {
////		tracedist = 48.0;
////	}
////
////	end = this.current.origin + tracedist * forward;
////	gameLocal.clip.Translation( trace, this.current.origin, end, this.clipModel, this.clipModel.GetAxis(), clipMask, this.self );
////
////	// if near a surface
////	if ( trace.fraction < 1.0 ) {
////
////		// if a ladder surface
////		if ( trace.c.material && ( trace.c.material.GetSurfaceFlags() & SURF_LADDER ) ) {
////
////			// check a step height higher
////			end = this.current.origin - gravityNormal * ( maxStepHeight * 0.75f );
////			gameLocal.clip.Translation( trace, this.current.origin, end, this.clipModel, this.clipModel.GetAxis(), clipMask, this.self );
////			start = trace.endpos;
////			end = start + tracedist * forward;
////			gameLocal.clip.Translation( trace, start, end, this.clipModel, this.clipModel.GetAxis(), clipMask, this.self );
////
////			// if also near a surface a step height higher
////			if ( trace.fraction < 1.0 ) {
////
////				// if it also is a ladder surface
////				if ( trace.c.material && trace.c.material.GetSurfaceFlags() & SURF_LADDER ) {
////					ladder = true;
////					ladderNormal = trace.c.normal;
////				}
////			}
////		}
////	}
////}
////
/////*
////=============
////idPhysics_Player::CheckJump
////=============
////*/
////bool idPhysics_Player::CheckJump( ) {
////	idVec3 addVelocity;
////
////	if ( command.upmove < 10 ) {
////		// not holding jump
////		return false;
////	}
////
////	// must wait for jump to be released
////	if ( this.current.movementFlags & PMF_JUMP_HELD ) {
////		return false;
////	}
////
////	// don't jump if we can't stand up
////	if ( this.current.movementFlags & PMF_DUCKED ) {
////		return false;
////	}
////
////	groundPlane = false;		// jumping away
////	walking = false;
////	this.current.movementFlags |= PMF_JUMP_HELD | PMF_JUMPED;
////
////	addVelocity = 2.0 * maxJumpHeight * -gravityVector;
////	addVelocity *= idMath.Sqrt( addVelocity.Normalize() );
////	this.current.velocity += addVelocity;
////
////	return true;
////}
////
/////*
////=============
////idPhysics_Player::CheckWaterJump
////=============
////*/
////bool idPhysics_Player::CheckWaterJump( ) {
////	idVec3	spot;
////	int		cont;
////	idVec3	flatforward;
////
////	if ( this.current.movementTime ) {
////		return false;
////	}
////
////	// check for water jump
////	if ( waterLevel != WATERLEVEL_WAIST ) {
////		return false;
////	}
////
////	flatforward = viewForward - (viewForward * gravityNormal) * gravityNormal;
////	flatforward.Normalize();
////
////	spot = this.current.origin + 30.0 * flatforward;
////	spot -= 4.0 * gravityNormal;
////	cont = gameLocal.clip.Contents( spot, NULL, mat3_identity, -1, this.self );
////	if ( !(cont & CONTENTS_SOLID) ) {
////		return false;
////	}
////
////	spot -= 16.0 * gravityNormal;
////	cont = gameLocal.clip.Contents( spot, NULL, mat3_identity, -1, this.self );
////	if ( cont ) {
////		return false;
////	}
////
////	// jump out of water
////	this.current.velocity = 200.0 * viewForward - 350.0 * gravityNormal;
////	this.current.movementFlags |= PMF_TIME_WATERJUMP;
////	this.current.movementTime = 2000;
////
////	return true;
////}
////
/////*
////=============
////idPhysics_Player::SetWaterLevel
////=============
////*/
////void idPhysics_Player::SetWaterLevel( ) {
////	idVec3		point;
////	idBounds	bounds;
////	int			contents;
////
////	//
////	// get waterlevel, accounting for ducking
////	//
////	waterLevel = WATERLEVEL_NONE;
////	waterType = 0;
////
////	bounds = this.clipModel.GetBounds();
////
////	// check at feet level
////	point = this.current.origin - ( bounds[0][2] + 1.0 ) * gravityNormal;
////	contents = gameLocal.clip.Contents( point, NULL, mat3_identity, -1, this.self );
////	if ( contents & MASK_WATER ) {
////
////		waterType = contents;
////		waterLevel = WATERLEVEL_FEET;
////
////		// check at waist level
////		point = this.current.origin - ( bounds[1][2] - bounds[0][2] ) * 0.5 * gravityNormal;
////		contents = gameLocal.clip.Contents( point, NULL, mat3_identity, -1, this.self );
////		if ( contents & MASK_WATER ) {
////
////			waterLevel = WATERLEVEL_WAIST;
////
////			// check at head level
////			point = this.current.origin - ( bounds[1][2] - 1.0 ) * gravityNormal;
////			contents = gameLocal.clip.Contents( point, NULL, mat3_identity, -1, this.self );
////			if ( contents & MASK_WATER ) {
////				waterLevel = WATERLEVEL_HEAD;
////			}
////		}
////	}
////}
////
/////*
////================
////idPhysics_Player::DropTimers
////================
////*/
////void idPhysics_Player::DropTimers( ) {
////	// drop misc timing counter
////	if ( this.current.movementTime ) {
////		if ( framemsec >= this.current.movementTime ) {
////			this.current.movementFlags &= ~PMF_ALL_TIMES;
////			this.current.movementTime = 0;
////		}
////		else {
////			this.current.movementTime -= framemsec;
////		}
////	}
////}
////
/////*
////================
////idPhysics_Player::MovePlayer
////================
////*/
////void idPhysics_Player::MovePlayer( int msec ) {
////
////	// this counter lets us debug movement problems with a journal
////	// by setting a conditional breakpoint for the previous frame
////	c_pmove++;
////
////	walking = false;
////	groundPlane = false;
////	ladder = false;
////
////	// determine the time
////	framemsec = msec;
////	frametime = framemsec * 0.001;
////
////	// default speed
////	playerSpeed = walkSpeed;
////
////	// remove jumped and stepped up flag
////	this.current.movementFlags &= ~(PMF_JUMPED|PMF_STEPPED_UP|PMF_STEPPED_DOWN);
////	this.current.stepUp = 0.0;
////
////	if ( command.upmove < 10 ) {
////		// not holding jump
////		this.current.movementFlags &= ~PMF_JUMP_HELD;
////	}
////
////	// if no movement at all
////	if ( this.current.movementType == PM_FREEZE ) {
////		return;
////	}
////
////	// move the player velocity into the frame of a pusher
////	this.current.velocity -= this.current.pushVelocity;
////
////	// view vectors
////	viewAngles.ToVectors( &viewForward, NULL, NULL );
////	viewForward *= clipModelAxis;
////	viewRight = gravityNormal.Cross( viewForward );
////	viewRight.Normalize();
////
////	// fly in spectator mode
////	if ( this.current.movementType == PM_SPECTATOR ) {
////		SpectatorMove();
////		idPhysics_Player::DropTimers();
////		return;
////	}
////
////	// special no clip mode
////	if ( this.current.movementType == PM_NOCLIP ) {
////		idPhysics_Player::NoclipMove();
////		idPhysics_Player::DropTimers();
////		return;
////	}
////
////	// no control when dead
////	if ( this.current.movementType == PM_DEAD ) {
////		command.forwardmove = 0;
////		command.rightmove = 0;
////		command.upmove = 0;
////	}
////
////	// set watertype and waterlevel
////	idPhysics_Player::SetWaterLevel();
////
////	// check for ground
////	idPhysics_Player::CheckGround();
////
////	// check if up against a ladder
////	idPhysics_Player::CheckLadder();
////
////	// set clip model size
////	idPhysics_Player::CheckDuck();
////
////	// handle timers
////	idPhysics_Player::DropTimers();
////
////	// move
////	if ( this.current.movementType == PM_DEAD ) {
////		// dead
////		idPhysics_Player::DeadMove();
////	}
////	else if ( ladder ) {
////		// going up or down a ladder
////		idPhysics_Player::LadderMove();
////	}
////	else if ( this.current.movementFlags & PMF_TIME_WATERJUMP ) {
////		// jumping out of water
////		idPhysics_Player::WaterJumpMove();
////	}
////	else if ( waterLevel > 1 ) {
////		// swimming
////		idPhysics_Player::WaterMove();
////	}
////	else if ( walking ) {
////		// walking on ground
////		idPhysics_Player::WalkMove();
////	}
////	else {
////		// airborne
////		idPhysics_Player::AirMove();
////	}
////
////	// set watertype, waterlevel and groundentity
////	idPhysics_Player::SetWaterLevel();
////	idPhysics_Player::CheckGround();
////
////	// move the player velocity back into the world frame
////	this.current.velocity += this.current.pushVelocity;
////	this.current.pushVelocity.Zero();
////}
////
/////*
////================
////idPhysics_Player::GetWaterLevel
////================
////*/
////waterLevel_t idPhysics_Player::GetWaterLevel( ) const {
////	return waterLevel;
////}
////
/////*
////================
////idPhysics_Player::GetWaterType
////================
////*/
////int idPhysics_Player::GetWaterType( ) const {
////	return waterType;
////}
////
/////*
////================
////idPhysics_Player::HasJumped
////================
////*/
////bool idPhysics_Player::HasJumped( ) const {
////	return ( ( this.current.movementFlags & PMF_JUMPED ) != 0 );
////}
////
/////*
////================
////idPhysics_Player::HasSteppedUp
////================
////*/
////bool idPhysics_Player::HasSteppedUp( ) const {
////	return ( ( this.current.movementFlags & ( PMF_STEPPED_UP | PMF_STEPPED_DOWN ) ) != 0 );
////}
////
/////*
////================
////idPhysics_Player::GetStepUp
////================
////*/
////float idPhysics_Player::GetStepUp( ) const {
////	return this.current.stepUp;
////}
////
/////*
////================
////idPhysics_Player::IsCrouching
////================
////*/
////bool idPhysics_Player::IsCrouching( ) const {
////	return ( ( this.current.movementFlags & PMF_DUCKED ) != 0 );
////}
////
/////*
////================
////idPhysics_Player::OnLadder
////================
////*/
////bool idPhysics_Player::OnLadder( ) const {
////	return ladder;
////}
////
/*
================
idPhysics_Player::idPhysics_Player
================
*/
	constructor ( ) {
		super ( );
		this.debugLevel = 0/*false*/;
		this.clipModel = null;
		this.clipMask = 0;
		this.current.memset0 ( );
		this.saved = this.current;
		this.walkSpeed = 0;
		this.crouchSpeed = 0;
		this.maxStepHeight = 0;
		this.maxJumpHeight = 0;
		this.command.memset0 ( );
		this.viewAngles.Zero ( );
		this.framemsec = 0;
		this.frametime = 0;
		this.playerSpeed = 0;
		this.viewForward.Zero ( );
		this.viewRight.Zero ( );
		this.walking = false;
		this.groundPlane = false;
		this.groundTrace.memset0 ( );
		this.groundMaterial = null;
		this.ladder = false;
		this.ladderNormal.Zero ( );
		this.waterLevel = waterLevel_t.WATERLEVEL_NONE;
		this.waterType = 0;
	}

/////*
////================
////idPhysics_Player_SavePState
////================
////*/
////void idPhysics_Player_SavePState( idSaveGame *savefile, const playerPState_t &state ) {
////	savefile.WriteVec3( state.origin );
////	savefile.WriteVec3( state.velocity );
////	savefile.WriteVec3( state.localOrigin );
////	savefile.WriteVec3( state.pushVelocity );
////	savefile.WriteFloat( state.stepUp );
////	savefile.WriteInt( state.movementType );
////	savefile.WriteInt( state.movementFlags );
////	savefile.WriteInt( state.movementTime );
////}
////
/////*
////================
////idPhysics_Player_RestorePState
////================
////*/
////void idPhysics_Player_RestorePState( idRestoreGame *savefile, playerPState_t &state ) {
////	savefile.ReadVec3( state.origin );
////	savefile.ReadVec3( state.velocity );
////	savefile.ReadVec3( state.localOrigin );
////	savefile.ReadVec3( state.pushVelocity );
////	savefile.ReadFloat( state.stepUp );
////	savefile.ReadInt( state.movementType );
////	savefile.ReadInt( state.movementFlags );
////	savefile.ReadInt( state.movementTime );
////}
////
/////*
////================
////idPhysics_Player::Save
////================
////*/
////void idPhysics_Player::Save( idSaveGame *savefile ) const {
////
////	idPhysics_Player_SavePState( savefile, this.current );
////	idPhysics_Player_SavePState( savefile, saved );
////
////	savefile.WriteFloat( walkSpeed );
////	savefile.WriteFloat( crouchSpeed );
////	savefile.WriteFloat( maxStepHeight );
////	savefile.WriteFloat( maxJumpHeight );
////	savefile.WriteInt( debugLevel );
////
////	savefile.WriteUsercmd( command );
////	savefile.WriteAngles( viewAngles );
////
////	savefile.WriteInt( framemsec );
////	savefile.WriteFloat( frametime );
////	savefile.WriteFloat( playerSpeed );
////	savefile.WriteVec3( viewForward );
////	savefile.WriteVec3( viewRight );
////
////	savefile.WriteBool( walking );
////	savefile.WriteBool( groundPlane );
////	savefile.WriteTrace( this.groundTrace );
////	savefile.WriteMaterial( groundMaterial );
////
////	savefile.WriteBool( ladder );
////	savefile.WriteVec3( ladderNormal );
////
////	savefile.WriteInt( (int)waterLevel );
////	savefile.WriteInt( waterType );
////}
////
/////*
////================
////idPhysics_Player::Restore
////================
////*/
////void idPhysics_Player::Restore( idRestoreGame *savefile ) {
////
////	idPhysics_Player_RestorePState( savefile, this.current );
////	idPhysics_Player_RestorePState( savefile, saved );
////
////	savefile.ReadFloat( walkSpeed );
////	savefile.ReadFloat( crouchSpeed );
////	savefile.ReadFloat( maxStepHeight );
////	savefile.ReadFloat( maxJumpHeight );
////	savefile.ReadInt( debugLevel );
////
////	savefile.ReadUsercmd( command );
////	savefile.ReadAngles( viewAngles );
////
////	savefile.ReadInt( framemsec );
////	savefile.ReadFloat( frametime );
////	savefile.ReadFloat( playerSpeed );
////	savefile.ReadVec3( viewForward );
////	savefile.ReadVec3( viewRight );
////
////	savefile.ReadBool( walking );
////	savefile.ReadBool( groundPlane );
////	savefile.ReadTrace( this.groundTrace );
////	savefile.ReadMaterial( groundMaterial );
////
////	savefile.ReadBool( ladder );
////	savefile.ReadVec3( ladderNormal );
////
////	savefile.ReadInt( (int &)waterLevel );
////	savefile.ReadInt( waterType );
////}
////
/////*
////================
////idPhysics_Player::SetPlayerInput
////================
////*/
////void idPhysics_Player::SetPlayerInput( const usercmd_t &cmd, const idAngles &newViewAngles ) {
////	command = cmd;
////	viewAngles = newViewAngles;		// can't use cmd.angles cause of the delta_angles
////}
////
/////*
////================
////idPhysics_Player::SetSpeed
////================
////*/
////void idPhysics_Player::SetSpeed( const float newWalkSpeed, const float newCrouchSpeed ) {
////	walkSpeed = newWalkSpeed;
////	crouchSpeed = newCrouchSpeed;
////}

/*
================
idPhysics_Player::SetMaxStepHeight
================
*/
	SetMaxStepHeight ( /*float */newMaxStepHeight: number ): void {
		this.maxStepHeight = newMaxStepHeight;
	}

/////*
////================
////idPhysics_Player::GetMaxStepHeight
////================
////*/
////float idPhysics_Player::GetMaxStepHeight( ) const {
////	return maxStepHeight;
////}
////
/////*
////================
////idPhysics_Player::SetMaxJumpHeight
////================
////*/
////void idPhysics_Player::SetMaxJumpHeight( const float newMaxJumpHeight ) {
////	maxJumpHeight = newMaxJumpHeight;
////}
////
/////*
////================
////idPhysics_Player::SetMovementType
////================
////*/
////void idPhysics_Player::SetMovementType( const pmtype_t type ) {
////	this.current.movementType = type;
////}
////
/////*
////================
////idPhysics_Player::SetKnockBack
////================
////*/
////void idPhysics_Player::SetKnockBack( const int knockBackTime ) {
////	if ( this.current.movementTime ) {
////		return;
////	}
////	this.current.movementFlags |= PMF_TIME_KNOCKBACK;
////	this.current.movementTime = knockBackTime;
////}
////
/////*
////================
////idPhysics_Player::SetDebugLevel
////================
////*/
////void idPhysics_Player::SetDebugLevel( bool set ) {
////	debugLevel = set;
////}
////
/////*
////================
////idPhysics_Player::Evaluate
////================
////*/
////bool idPhysics_Player::Evaluate( int timeStepMSec, int endTimeMSec ) {
////	idVec3 masterOrigin, oldOrigin;
////	idMat3 masterAxis;
////
////	waterLevel = WATERLEVEL_NONE;
////	waterType = 0;
////	oldOrigin = this.current.origin;
////
////	this.clipModel.Unlink();
////
////	// if bound to a master
////	if ( this.masterEntity ) {
////		this.self.GetMasterPosition( masterOrigin, masterAxis );
////		this.current.origin = masterOrigin + this.current.localOrigin * masterAxis;
////		this.clipModel.Link( gameLocal.clip, this.self, 0, this.current.origin, this.clipModel.GetAxis() );
////		this.current.velocity = ( this.current.origin - oldOrigin ) / ( timeStepMSec * 0.001f );
////		masterDeltaYaw = this.masterYaw;
////		this.masterYaw = masterAxis[0].ToYaw();
////		masterDeltaYaw = this.masterYaw - masterDeltaYaw;
////		return true;
////	}
////
////	ActivateContactEntities();
////
////	idPhysics_Player::MovePlayer( timeStepMSec );
////
////	this.clipModel.Link( gameLocal.clip, this.self, 0, this.current.origin, this.clipModel.GetAxis() );
////
////	if ( IsOutsideWorld() ) {
////		gameLocal.Warning( "clip model outside world bounds for entity '%s' at (%s)", this.self.name.c_str(), this.current.origin.ToString(0) );
////	}
////
////	return true; //( this.current.origin != oldOrigin );
////}

/*
================
idPhysics_Player::UpdateTime
================
*/
	UpdateTime( /*int*/ endTimeMSec: number): void {
	}
////
/////*
////================
////idPhysics_Player::GetTime
////================
////*/
////int idPhysics_Player::GetTime( ) const {
////	return gameLocal.time;
////}
////
/////*
////================
////idPhysics_Player::GetImpactInfo
////================
////*/
////void idPhysics_Player::GetImpactInfo( /*int*/ id:number, const idVec3 &point, impactInfo_t *info ) const {
////	info.invMass = invMass;
////	info.invInertiaTensor.Zero();
////	info.position.Zero();
////	info.velocity = this.current.velocity;
////}
////
/////*
////================
////idPhysics_Player::ApplyImpulse
////================
////*/
////void idPhysics_Player::ApplyImpulse( /*int*/ id:number, const idVec3 &point, const idVec3 &impulse ) {
////	if ( this.current.movementType != PM_NOCLIP ) {
////		this.current.velocity += impulse * invMass;
////	}
////}

/*
================
idPhysics_Player::IsAtRest
================
*/
	IsAtRest ( ): boolean {
		return false;
	}
////
/////*
////================
////idPhysics_Player::GetRestStartTime
////================
////*/
////int idPhysics_Player::GetRestStartTime( ) const {
////	return -1;
////}
////
/////*
////================
////idPhysics_Player::SaveState
////================
////*/
////void idPhysics_Player::SaveState( ) {
////	saved = this.current;
////}
////
/////*
////================
////idPhysics_Player::RestoreState
////================
////*/
////void idPhysics_Player::RestoreState( ) {
////	this.current = saved;
////
////	this.clipModel.Link( gameLocal.clip, this.self, 0, this.current.origin, this.clipModel.GetAxis() );
////
////	EvaluateContacts();
////}
////
/*
================
idPhysics_Player::SetOrigin
================
*/
	SetOrigin ( newOrigin: idVec3, /*int*/ id: number = -1 ): void {
		var masterOrigin = new idVec3;
		var masterAxis = new idMat3;


		this.current.localOrigin = newOrigin;
		if ( this.masterEntity ) {
			todoThrow ( );
			//this.self.GetMasterPosition( masterOrigin, masterAxis );
			//this.current.origin.opEquals( masterOrigin.opAddition(  newOrigin.times??( masterAxis ) ) );
		} else {
			this.current.origin.opEquals( newOrigin );
		}

		this.clipModel.Link_ent( gameLocal.clip, this.self, 0, newOrigin, this.clipModel.GetAxis ( ) );
	}

/*
================
idPhysics_Player::GetOrigin
================
*/
	PlayerGetOrigin ( ): idVec3 {
		return this.current.origin;
	}

/*
================
idPhysics_Player::SetAxis
================
*/
	SetAxis(newAxis: idMat3, /*int*/ id: number = -1): void {
		todoThrow();
	//this.clipModel.Link( gameLocal.clip, this.self, 0, this.clipModel.GetOrigin(), newAxis );
}

/*
================
idPhysics_Player::Translate
================
*/
	Translate ( translation: idVec3, /*int*/ id: number = -1 ): void {

		this.current.localOrigin.opAdditionAssignment( translation );
		this.current.origin.opAdditionAssignment( translation );

		this.clipModel.Link_ent( gameLocal.clip, this.self, 0, this.current.origin, this.clipModel.GetAxis ( ) );
	}

/*
================
idPhysics_Player::Rotate
================
*/
	Rotate(rotation: idRotation, /*int*/ id: number = -1): void {
		todoThrow();
	//idVec3 masterOrigin;
	//idMat3 masterAxis;

	//this.current.origin *= rotation;
	//if ( this.masterEntity ) {
	//	this.self.GetMasterPosition( masterOrigin, masterAxis );
	//	this.current.localOrigin = ( this.current.origin - masterOrigin ) * masterAxis.Transpose();
	//}
	//else {
	//	this.current.localOrigin = this.current.origin;
	//}

	//this.clipModel.Link( gameLocal.clip, this.self, 0, this.current.origin, this.clipModel.GetAxis() * rotation.ToMat3() );
}

/////*
////================
////idPhysics_Player::SetLinearVelocity
////================
////*/
////void idPhysics_Player::SetLinearVelocity( const idVec3 &newLinearVelocity, /*int*/ id:number ) {
////	this.current.velocity = newLinearVelocity;
////}
////
/////*
////================
////idPhysics_Player::GetLinearVelocity
////================
////*/
////const idVec3 &idPhysics_Player::GetLinearVelocity( /*int*/ id:number ) const {
////	return this.current.velocity;
////}
////
/////*
////================
////idPhysics_Player::SetPushed
////================
////*/
////void idPhysics_Player::SetPushed( int deltaTime ) {
////	idVec3 velocity;
////	float d;
////
////	// velocity with which the player is pushed
////	velocity = ( this.current.origin - saved.origin ) / ( deltaTime * idMath.M_MS2SEC );
////
////	// remove any downward push velocity
////	d = velocity * gravityNormal;
////	if ( d > 0.0 ) {
////		velocity -= d * gravityNormal;
////	}
////
////	this.current.pushVelocity += velocity;
////}
////
/////*
////================
////idPhysics_Player::GetPushedLinearVelocity
////================
////*/
////const idVec3 &idPhysics_Player::GetPushedLinearVelocity( /*int*/ id:number ) const {
////	return this.current.pushVelocity;
////}
////
/////*
////================
////idPhysics_Player::ClearPushedVelocity
////================
////*/
////void idPhysics_Player::ClearPushedVelocity( ) {
////	this.current.pushVelocity.Zero();
////}
////
/*
================
idPhysics_Player::SetMaster

  the binding is never orientated
================
*/
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
			}
		}
	}

///*float*/	PLAYER_VELOCITY_MAX				= 4000;
///*int*/PLAYER_VELOCITY_TOTAL_BITS = 16;
///*int*/PLAYER_VELOCITY_EXPONENT_BITS	= idMath.BitsForInteger(idMath.BitsForFloat(PLAYER_VELOCITY_MAX)) + 1;
///*int*/PLAYER_VELOCITY_MANTISSA_BITS = PLAYER_VELOCITY_TOTAL_BITS - 1 - PLAYER_VELOCITY_EXPONENT_BITS;
///*int*/PLAYER_MOVEMENT_TYPE_BITS		= 3;
///*int*/	PLAYER_MOVEMENT_FLAGS_BITS		= 8;
////
/////*
////================
////idPhysics_Player::WriteToSnapshot
////================
////*/
////void idPhysics_Player::WriteToSnapshot( idBitMsgDelta &msg ) const {
////	msg.WriteFloat( this.current.origin[0] );
////	msg.WriteFloat( this.current.origin[1] );
////	msg.WriteFloat( this.current.origin[2] );
////	msg.WriteFloat( this.current.velocity[0], PLAYER_VELOCITY_EXPONENT_BITS, PLAYER_VELOCITY_MANTISSA_BITS );
////	msg.WriteFloat( this.current.velocity[1], PLAYER_VELOCITY_EXPONENT_BITS, PLAYER_VELOCITY_MANTISSA_BITS );
////	msg.WriteFloat( this.current.velocity[2], PLAYER_VELOCITY_EXPONENT_BITS, PLAYER_VELOCITY_MANTISSA_BITS );
////	msg.WriteDeltaFloat( this.current.origin[0], this.current.localOrigin[0] );
////	msg.WriteDeltaFloat( this.current.origin[1], this.current.localOrigin[1] );
////	msg.WriteDeltaFloat( this.current.origin[2], this.current.localOrigin[2] );
////	msg.WriteDeltaFloat( 0.0, this.current.pushVelocity[0], PLAYER_VELOCITY_EXPONENT_BITS, PLAYER_VELOCITY_MANTISSA_BITS );
////	msg.WriteDeltaFloat( 0.0, this.current.pushVelocity[1], PLAYER_VELOCITY_EXPONENT_BITS, PLAYER_VELOCITY_MANTISSA_BITS );
////	msg.WriteDeltaFloat( 0.0, this.current.pushVelocity[2], PLAYER_VELOCITY_EXPONENT_BITS, PLAYER_VELOCITY_MANTISSA_BITS );
////	msg.WriteDeltaFloat( 0.0, this.current.stepUp );
////	msg.WriteBits( this.current.movementType, PLAYER_MOVEMENT_TYPE_BITS );
////	msg.WriteBits( this.current.movementFlags, PLAYER_MOVEMENT_FLAGS_BITS );
////	msg.WriteDeltaLong( 0, this.current.movementTime );
////}
////
/////*
////================
////idPhysics_Player::ReadFromSnapshot
////================
////*/
////void idPhysics_Player::ReadFromSnapshot( const idBitMsgDelta &msg ) {
////	this.current.origin[0] = msg.ReadFloat();
////	this.current.origin[1] = msg.ReadFloat();
////	this.current.origin[2] = msg.ReadFloat();
////	this.current.velocity[0] = msg.ReadFloat( PLAYER_VELOCITY_EXPONENT_BITS, PLAYER_VELOCITY_MANTISSA_BITS );
////	this.current.velocity[1] = msg.ReadFloat( PLAYER_VELOCITY_EXPONENT_BITS, PLAYER_VELOCITY_MANTISSA_BITS );
////	this.current.velocity[2] = msg.ReadFloat( PLAYER_VELOCITY_EXPONENT_BITS, PLAYER_VELOCITY_MANTISSA_BITS );
////	this.current.localOrigin[0] = msg.ReadDeltaFloat( this.current.origin[0] );
////	this.current.localOrigin[1] = msg.ReadDeltaFloat( this.current.origin[1] );
////	this.current.localOrigin[2] = msg.ReadDeltaFloat( this.current.origin[2] );
////	this.current.pushVelocity[0] = msg.ReadDeltaFloat( 0.0, PLAYER_VELOCITY_EXPONENT_BITS, PLAYER_VELOCITY_MANTISSA_BITS );
////	this.current.pushVelocity[1] = msg.ReadDeltaFloat( 0.0, PLAYER_VELOCITY_EXPONENT_BITS, PLAYER_VELOCITY_MANTISSA_BITS );
////	this.current.pushVelocity[2] = msg.ReadDeltaFloat( 0.0, PLAYER_VELOCITY_EXPONENT_BITS, PLAYER_VELOCITY_MANTISSA_BITS );
////	this.current.stepUp = msg.ReadDeltaFloat( 0.0 );
////	this.current.movementType = msg.ReadBits( PLAYER_MOVEMENT_TYPE_BITS );
////	this.current.movementFlags = msg.ReadBits( PLAYER_MOVEMENT_FLAGS_BITS );
////	this.current.movementTime = msg.ReadDeltaLong( 0 );
////
////	if ( this.clipModel ) {
////		this.clipModel.Link( gameLocal.clip, this.self, 0, this.current.origin, this.clipModel.GetAxis() );
////	}
////}
////
}


//CLASS_DECLARATION( idPhysics_Actor, idPhysics_Player )
idPhysics_Player.CreateInstance = function() : idClass{
	try {
		var ptr = new idPhysics_Player;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idPhysics_Player.prototype.GetType = function ( ): idTypeInfo {
	return ( idPhysics_Player.Type );
};

idPhysics_Player.eventCallbacks = [
];

idPhysics_Player.Type = new idTypeInfo( "idPhysics_Player", "idPhysics_Actor",
	idPhysics_Player.eventCallbacks, idPhysics_Player.CreateInstance, idPhysics_Player.prototype.Spawn,
	idPhysics_Player.prototype.Save, idPhysics_Player.prototype.Restore );

//END_CLASS

