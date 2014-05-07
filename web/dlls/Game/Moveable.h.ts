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
////#ifndef __GAME_MOVEABLE_H__
////#define __GAME_MOVEABLE_H__
////
/*
===============================================================================

  Entity using rigid body physics.

===============================================================================
*/
////
////extern const idEventDef EV_BecomeNonSolid;
////extern const idEventDef EV_IsAtRest;
////
class idMoveable extends idEntity {
////public:
////	CLASS_PROTOTYPE( idMoveable );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idMoveable>[];
////
////							idMoveable( );
////							~idMoveable( );
////
////	void					Spawn( );
////
////	void					Save( idSaveGame *savefile ) const;
////	void					Restore( idRestoreGame *savefile );
////
////	virtual void			Think( );
////
////	virtual void			Hide( );
////	virtual void			Show( );
////
////	bool					AllowStep( ) const;
////	void					EnableDamage( bool enable, float duration );
////	virtual bool			Collide( const trace_t &collision, const idVec3 &velocity );
////	virtual void			Killed( idEntity *inflictor, idEntity *attacker, int damage, const idVec3 &dir, int location );
////	virtual void			WriteToSnapshot( idBitMsgDelta &msg ) const;
////	virtual void			ReadFromSnapshot( const idBitMsgDelta &msg );
////
////protected:
	physicsObj = new idPhysics_RigidBody;				// physics object
	brokenModel = new idStr;			// model set when health drops down to or below zero
	damage = new idStr;					// if > 0 apply damage to hit entities
	fxCollide = new idStr;				// fx system to start when collides with something
	nextCollideFxTime :number/*int*/;		// next time it is ok to spawn collision fx
	minDamageVelocity :number/*float*/;		// minimum velocity before moveable applies damage
	maxDamageVelocity :number/*float*/;		// velocity at which the maximum damage is applied
	initialSpline:idCurve_Spline<idVec3>;			// initial spline path the moveable follows
	initialSplineDir = new idVec3;		// initial relative direction along the spline path
	explode:boolean;				// entity explodes when health drops down to or below zero
	unbindOnDeath:boolean;			// unbind from master when health drops down to or below zero
	allowStep:boolean;				// allow monsters to step on the object
	canDamage:boolean;				// only apply damage when this is set
	nextDamageTime :number/*int*/;			// next time the movable can hurt the player
	nextSoundTime :number/*int*/;			// next time the moveable can make a sound
////
////	const idMaterial *		GetRenderModelMaterial( ) const;
////	void					BecomeNonSolid( );
////	void					InitInitialSpline( int startTime );
////	bool					FollowInitialSplinePath( );
////
	Event_Activate( activator:idEntity ): void { throw "placeholder"; }
	Event_BecomeNonSolid( ): void { throw "placeholder"; }
	Event_SetOwnerFromSpawnArgs( ): void { throw "placeholder"; }
	Event_IsAtRest( ): void { throw "placeholder"; }
	Event_EnableDamage( /*float*/ enable: number): void { throw "placeholder"; }


	/*
	================
	idMoveable::idMoveable
	================
	*/
	constructor() {
		super ( );
		this.minDamageVelocity	= 100.0;
		this.maxDamageVelocity	= 200.0;
		this.nextCollideFxTime	= 0;
		this.nextDamageTime		= 0;
		this.nextSoundTime		= 0;
		this.initialSpline		= null;
		this.initialSplineDir.opEquals( vec3_zero );
		this.explode				= false;
		this.unbindOnDeath		= false;
		this.allowStep			= false;
		this.canDamage			= false;
	}
	
	/////*
	////================
	////idMoveable::~idMoveable
	////================
	////*/
	////idMoveable::~idMoveable( ) {
	////	delete initialSpline;
	////	initialSpline = NULL;
	////}
	////
	/////*
	////================
	////idMoveable::Spawn
	////================
	////*/
	Spawn ( ): void {
		var trm = new idTraceModel;
		var /*float */density = new R<number> ( ), friction = new R<number> ( ), bouncyness = new R<number> ( ), mass: number;
		var /*int */clipShrink: number;
		var clipModelName = new idStr;

		// check if a clip model is set
		this.spawnArgs.GetString_RidStr( "clipmodel", "", clipModelName );
		if ( !clipModelName.data ) {
			clipModelName.opEquals( this.spawnArgs.GetString( "model" ) ); // use the visual model
		}

		if ( !collisionModelManager.TrmFromModel_name( clipModelName.data, trm ) ) {
			gameLocal.Error( "idMoveable '%s': cannot load collision model %s", this.name.c_str ( ), clipModelName.c_str ( ) );
			return;
		}

		// if the model should be shrinked
		clipShrink = this.spawnArgs.GetInt( "clipshrink" );
		if ( clipShrink != 0 ) {
			trm.Shrink( clipShrink * CM_CLIP_EPSILON );
		}

		// get rigid body properties
		this.spawnArgs.GetFloat_R( "density", "0.5", density );
		density.$ = idMath.ClampFloat( 0.001, 1000.0, density.$ );
		this.spawnArgs.GetFloat_R( "friction", "0.05", friction );
		friction.$ = idMath.ClampFloat( 0.0, 1.0, friction.$ );
		this.spawnArgs.GetFloat_R( "bouncyness", "0.6", bouncyness );
		bouncyness.$ = idMath.ClampFloat( 0.0, 1.0, bouncyness.$ );
		this.explode = this.spawnArgs.GetBool( "explode" );
		this.unbindOnDeath = this.spawnArgs.GetBool( "unbindondeath" );

		this.fxCollide.opEquals( this.spawnArgs.GetString( "fx_collide" ) );
		this.nextCollideFxTime = 0;

		this.fl.takedamage = true;
		this.damage.opEquals( this.spawnArgs.GetString( "def_damage", "" ) );
		this.canDamage = this.spawnArgs.GetBool( "damageWhenActive" ) ? false : true;
		this.minDamageVelocity = this.spawnArgs.GetFloat( "minDamageVelocity", "100" );
		this.maxDamageVelocity = this.spawnArgs.GetFloat( "maxDamageVelocity", "200" );
		this.nextDamageTime = 0;
		this.nextSoundTime = 0;

		this.health = this.spawnArgs.GetInt( "health", "0" );
		this.spawnArgs.GetString_RidStr( "broken", "", this.brokenModel );

		if ( this.health ) {
			if ( this.brokenModel.data != "" && !renderModelManager.CheckModel( this.brokenModel.data ) ) {
				gameLocal.Error( "idMoveable '%s' at (%s): cannot load broken model '%s'", this.name.c_str ( ), this.GetPhysics ( ).GetOrigin ( ).ToString( 0 ), this.brokenModel.c_str ( ) );
			}
		}

		// setup the physics
		this.physicsObj.SetSelf( this );
		this.physicsObj.SetClipModel( new idClipModel( trm ), density.$ );
		this.physicsObj.GetClipModel ( ).SetMaterial( this.GetRenderModelMaterial ( ) );
		this.physicsObj.SetOrigin( this.GetPhysics ( ).GetOrigin ( ) );
		this.physicsObj.SetAxis( this.GetPhysics ( ).GetAxis ( ) );
		this.physicsObj.SetBouncyness( bouncyness.$ );
		this.physicsObj.SetFriction( 0.6, 0.6, friction.$ );
		this.physicsObj.SetGravity( gameLocal.GetGravity ( ) );
		this.physicsObj.SetContents( contentsFlags_t.CONTENTS_SOLID );
		this.physicsObj.SetClipMask( MASK_SOLID | contentsFlags_t.CONTENTS_BODY | contentsFlags_t.CONTENTS_CORPSE | contentsFlags_t.CONTENTS_MOVEABLECLIP );
		this.SetPhysics( this.physicsObj );

		var $mass = new R( mass );
		if ( this.spawnArgs.GetFloat_R( "mass", "10", $mass ) ) {
			mass = $mass.$;
			this.physicsObj.SetMass( mass );
		}

		if ( this.spawnArgs.GetBool( "nodrop" ) ) {
			this.physicsObj.PutToRest ( );
		} else {
			this.physicsObj.DropToFloor ( );
		}

		if ( this.spawnArgs.GetBool( "noimpact" ) || this.spawnArgs.GetBool( "notPushable" ) ) {
			this.physicsObj.DisableImpact ( );
		}

		if ( this.spawnArgs.GetBool( "nonsolid" ) ) {
			this.BecomeNonSolid ( );
		}

		this.allowStep = this.spawnArgs.GetBool( "allowStep", "1" );

		this.PostEventMS( EV_SetOwnerFromSpawnArgs, 0 );
	}
////
/////*
////================
////idMoveable::Save
////================
////*/
////void idMoveable::Save( idSaveGame *savefile ) const {
////
////	savefile.WriteString( this.brokenModel );
////	savefile.WriteString( this.damage );
////	savefile.WriteString( this.fxCollide );
////	savefile.WriteInt( this.nextCollideFxTime );
////	savefile.WriteFloat( this.minDamageVelocity );
////	savefile.WriteFloat( this.maxDamageVelocity );
////	savefile.WriteBool( this.explode );
////	savefile.WriteBool( this.unbindOnDeath );
////	savefile.WriteBool( this.allowStep );
////	savefile.WriteBool( this.canDamage );
////	savefile.WriteInt( this.nextDamageTime );
////	savefile.WriteInt( this.nextSoundTime );
////	savefile.WriteInt( initialSpline != NULL ? initialSpline.GetTime( 0 ) : -1 );
////	savefile.WriteVec3( initialSplineDir );
////
////	savefile.WriteStaticObject( this.physicsObj );
////}
////
/////*
////================
////idMoveable::Restore
////================
////*/
////void idMoveable::Restore( idRestoreGame *savefile ) {
////	int initialSplineTime;
////
////	savefile.ReadString( this.brokenModel );
////	savefile.ReadString( this.damage );
////	savefile.ReadString( this.fxCollide );
////	savefile.ReadInt( this.nextCollideFxTime );
////	savefile.ReadFloat( this.minDamageVelocity );
////	savefile.ReadFloat( this.maxDamageVelocity );
////	savefile.ReadBool( this.explode );
////	savefile.ReadBool( this.unbindOnDeath );
////	savefile.ReadBool( this.allowStep );
////	savefile.ReadBool( this.canDamage );
////	savefile.ReadInt( this.nextDamageTime );
////	savefile.ReadInt( this.nextSoundTime );
////	savefile.ReadInt( initialSplineTime );
////	savefile.ReadVec3( initialSplineDir );
////
////	if ( initialSplineTime != -1 ) {
////		InitInitialSpline( initialSplineTime );
////	} else {
////		initialSpline = NULL;
////	}
////
////	savefile.ReadStaticObject( this.physicsObj );
////	RestorePhysics( &this.physicsObj );
////}

/*
================
idMoveable::Hide
================
*/
	Hide ( ): void {
		super.Hide ( );
		this.physicsObj.SetContents( 0 );
	}

/////*
////================
////idMoveable::Show
////================
////*/
////void idMoveable::Show( ) {
////	idEntity::Show();
////	if ( !this.spawnArgs.GetBool( "nonsolid" ) ) {
////		this.physicsObj.SetContents( contentsFlags_t.CONTENTS_SOLID );
////	}
////}
////
/////*
////=================
////idMoveable::Collide
////=================
////*/
////bool idMoveable::Collide( const trace_t &collision, const idVec3 &velocity ) {
////	float v, f;
////	idVec3 dir;
////	var ent:idEntity
////
////	v = -( velocity * collision.c.normal );
////	if ( v > BOUNCE_SOUND_MIN_VELOCITY && gameLocal.time > this.nextSoundTime ) {
////		f = v > BOUNCE_SOUND_MAX_VELOCITY ? 1.0 : idMath.Sqrt( v - BOUNCE_SOUND_MIN_VELOCITY ) * ( 1.0 / idMath.Sqrt( BOUNCE_SOUND_MAX_VELOCITY - BOUNCE_SOUND_MIN_VELOCITY ) );
////		if ( StartSound( "snd_bounce", SND_CHANNEL_ANY, 0, false, NULL ) ) {
////			// don't set the volume unless there is a bounce sound as it overrides the entire channel
////			// which causes footsteps on ai's to not honor their shader parms
////			SetSoundVolume( f );
////		}
////		this.nextSoundTime = gameLocal.time + 500;
////	}
////
////	if ( this.canDamage && this.damage.Length() && gameLocal.time > this.nextDamageTime ) {
////		ent = gameLocal.entities[ collision.c.entityNum ];
////		if ( ent && v > this.minDamageVelocity ) {
////			f = v > this.maxDamageVelocity ? 1.0 : idMath.Sqrt( v - this.minDamageVelocity ) * ( 1.0 / idMath.Sqrt( this.maxDamageVelocity - this.minDamageVelocity ) );
////			dir = velocity;
////			dir.NormalizeFast();
////			ent.Damage( this, this.GetPhysics().GetClipModel().GetOwner(), dir, this.damage, f, jointHandle_t.INVALID_JOINT );
////			this.nextDamageTime = gameLocal.time + 1000;
////		}
////	}
////
////	if ( this.fxCollide.Length() && gameLocal.time > this.nextCollideFxTime ) {
////		idEntityFx::StartFx( this.fxCollide, &collision.c.point, NULL, this, false );
////		this.nextCollideFxTime = gameLocal.time + 3500;
////	}
////
////	return false;
////}
////
/////*
////============
////idMoveable::Killed
////============
////*/
////void idMoveable::Killed( idEntity *inflictor, idEntity *attacker, int damage, const idVec3 &dir, int location ) {
////	if ( this.unbindOnDeath ) {
////		Unbind();
////	}
////
////	if ( this.brokenModel.data != "" ) {
////		SetModel( this.brokenModel );
////	}
////
////	if ( this.explode ) {
////		if ( this.brokenModel.data == "" ) {
////			this.PostEventMS( &EV_Remove, 1000 );
////		}
////	}
////
////	if ( this.renderEntity.gui[ 0 ] ) {
////		this.renderEntity.gui[ 0 ] = NULL;
////	}
////
////	ActivateTargets( this );
////
////	this.fl.takedamage = false;
////}
////
/////*
////================
////idMoveable::AllowStep
////================
////*/
////bool idMoveable::AllowStep( ) const {
////	return this.allowStep;
////}

/*
================
idMoveable::BecomeNonSolid
================
*/
	BecomeNonSolid ( ): void {
		// set CONTENTS_RENDERMODEL so bullets still collide with the moveable
		this.physicsObj.SetContents( contentsFlags_t.CONTENTS_CORPSE | contentsFlags_t.CONTENTS_RENDERMODEL );
		this.physicsObj.SetClipMask( MASK_SOLID | contentsFlags_t.CONTENTS_CORPSE | contentsFlags_t.CONTENTS_MOVEABLECLIP );
	}

/////*
////================
////idMoveable::EnableDamage
////================
////*/
////void idMoveable::EnableDamage( bool enable, float duration ) {
////	this.canDamage = enable;
////	if ( duration ) {
////		PostEventSec( &EV_EnableDamage, duration, ( !enable ) ? 0.0 : 1.0 );
////	}
////}
////
/////*
////================
////idMoveable::InitInitialSpline
////================
////*/
////void idMoveable::InitInitialSpline( int startTime ) {
////	int initialSplineTime;
////
////	initialSpline = GetSpline();
////	initialSplineTime = this.spawnArgs.GetInt( "initialSplineTime", "300" );
////
////	if ( initialSpline != NULL ) {
////		initialSpline.MakeUniform( initialSplineTime );
////		initialSpline.ShiftTime( startTime - initialSpline.GetTime( 0 ) );
////		initialSplineDir = initialSpline.GetCurrentFirstDerivative( startTime );
////		initialSplineDir *= this.physicsObj.GetAxis().Transpose();
////		initialSplineDir.Normalize();
////		BecomeActive( TH_THINK );
////	}
////}
////
/////*
////================
////idMoveable::FollowInitialSplinePath
////================
////*/
////bool idMoveable::FollowInitialSplinePath( ) {
////	if ( initialSpline != NULL ) {
////		if ( gameLocal.time < initialSpline.GetTime( initialSpline.GetNumValues() - 1 ) ) {
////			idVec3 splinePos = initialSpline.GetCurrentValue( gameLocal.time );
////			idVec3 linearVelocity = ( splinePos - this.physicsObj.GetOrigin() ) * USERCMD_HZ;
////			this.physicsObj.SetLinearVelocity( linearVelocity );
////
////			idVec3 splineDir = initialSpline.GetCurrentFirstDerivative( gameLocal.time );
////			idVec3 dir = initialSplineDir * this.physicsObj.GetAxis();
////			idVec3 angularVelocity = dir.Cross( splineDir );
////			angularVelocity.Normalize();
////			angularVelocity *= idMath.ACos16( dir * splineDir / splineDir.Length() ) * USERCMD_HZ;
////			this.physicsObj.SetAngularVelocity( angularVelocity );
////			return true;
////		} else {
////			delete initialSpline;
////			initialSpline = NULL;
////		}
////	}
////	return false;
////}
////
/////*
////================
////idMoveable::Think
////================
////*/
	Think(): void {
		todoThrow();
////	if ( thinkFlags & TH_THINK ) {
////		if ( !FollowInitialSplinePath() ) {
////			BecomeInactive( TH_THINK );
////		}
////	}
////	idEntity::Think();
}
//
/*
================
idMoveable::GetRenderModelMaterial
================
*/
	GetRenderModelMaterial ( ): idMaterial {
		if ( this.renderEntity.customShader ) {
			return this.renderEntity.customShader;
		}
		if ( this.renderEntity.hModel && this.renderEntity.hModel.NumSurfaces ( ) ) {
			return this.renderEntity.hModel.Surface( 0 ).shader;
		}
		return null;
	}

/////*
////================
////idMoveable::WriteToSnapshot
////================
////*/
////void idMoveable::WriteToSnapshot( idBitMsgDelta &msg ) const {
////	this.physicsObj.WriteToSnapshot( msg );
////}
////
/////*
////================
////idMoveable::ReadFromSnapshot
////================
////*/
////void idMoveable::ReadFromSnapshot( const idBitMsgDelta &msg ) {
////	this.physicsObj.ReadFromSnapshot( msg );
////	if ( msg.HasChanged() ) {
////		UpdateVisuals();
////	}
////}
////
/////*
////================
////idMoveable::Event_BecomeNonSolid
////================
////*/
////void idMoveable::Event_BecomeNonSolid( ) {
////	this.BecomeNonSolid();
////}
////
/////*
////================
////idMoveable::Event_Activate
////================
////*/
////void idMoveable::Event_Activate( activator:idEntity ) {
////	float delay;
////	idVec3 init_velocity, init_avelocity;
////
////	Show();
////
////	if ( !this.spawnArgs.GetInt( "notPushable" ) ) {
////        this.physicsObj.EnableImpact();
////	}
////
////	this.physicsObj.Activate();
////
////	this.spawnArgs.GetVector( "init_velocity", "0 0 0", init_velocity );
////	this.spawnArgs.GetVector( "init_avelocity", "0 0 0", init_avelocity );
////
////	delay = this.spawnArgs.GetFloat( "init_velocityDelay", "0" );
////	if ( delay == 0.0 ) {
////		this.physicsObj.SetLinearVelocity( init_velocity );
////	} else {
////		PostEventSec( &EV_SetLinearVelocity, delay, init_velocity );
////	}
////
////	delay = this.spawnArgs.GetFloat( "init_avelocityDelay", "0" );
////	if ( delay == 0.0 ) {
////		this.physicsObj.SetAngularVelocity( init_avelocity );
////	} else {
////		PostEventSec( &EV_SetAngularVelocity, delay, init_avelocity );
////	}
////
////	InitInitialSpline( gameLocal.time );
////}
////
/////*
////================
////idMoveable::Event_SetOwnerFromSpawnArgs
////================
////*/
////void idMoveable::Event_SetOwnerFromSpawnArgs( ) {
////	idStr owner;
////
////	if ( this.spawnArgs.GetString( "owner", "", owner ) ) {
////		ProcessEvent( &EV_SetOwner, gameLocal.FindEntity( owner ) );
////	}
////}
////
/////*
////================
////idMoveable::Event_IsAtRest
////================
////*/
////void idMoveable::Event_IsAtRest( ) {
////	idThread::ReturnInt( this.physicsObj.IsAtRest() );
////}
////
/////*
////================
////idMoveable::Event_EnableDamage
////================
////*/
////void idMoveable::Event_EnableDamage( float enable ) {
////	this.canDamage = ( enable != 0.0 );
////}
////
};


/*
===============================================================================

  A barrel using rigid body physics. The barrel has special handling of
  the view model orientation to make it look like it rolls instead of slides.

===============================================================================
*/

class idBarrel extends idMoveable {
////
////public:
////	CLASS_PROTOTYPE( idBarrel );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idBarrel>[];
////							idBarrel();
////
////	void					Spawn( );
////
////	void					Save( idSaveGame *savefile ) const;
////	void					Restore( idRestoreGame *savefile );
////
////	void					BarrelThink( );
////	virtual void			Think( );
////	virtual bool			GetPhysicsToVisualTransform( idVec3 &origin, idMat3 &axis );
////	virtual void			ClientPredictionThink( );
////
////private:
////	float					radius;					// radius of barrel
////	int						barrelAxis;				// one of the coordinate axes the barrel cylinder is parallel to
////	idVec3					lastOrigin;				// origin of the barrel the last think frame
////	idMat3					lastAxis;				// axis of the barrel the last think frame
////	float					additionalRotation;		// additional rotation of the barrel about it's axis
	additionalAxis = new idMat3;			// additional rotation axis

	
/////*
////================
////idBarrel::idBarrel
////================
////*/
////idBarrel::idBarrel() {
////	radius = 1.0;
////	barrelAxis = 0;
////	lastOrigin.Zero();
////	lastAxis.Identity();
////	additionalRotation = 0.0;
////	additionalAxis.Identity();
////	this.fl.networkSync = true;
////}
////
/////*
////================
////idBarrel::Save
////================
////*/
////void idBarrel::Save( idSaveGame *savefile ) const {
////	savefile.WriteFloat( radius );
////	savefile.WriteInt( barrelAxis );
////	savefile.WriteVec3( lastOrigin );
////	savefile.WriteMat3( lastAxis );
////	savefile.WriteFloat( additionalRotation );
////	savefile.WriteMat3( additionalAxis );
////}
////
/////*
////================
////idBarrel::Restore
////================
////*/
////void idBarrel::Restore( idRestoreGame *savefile ) {
////	savefile.ReadFloat( radius );
////	savefile.ReadInt( barrelAxis );
////	savefile.ReadVec3( lastOrigin );
////	savefile.ReadMat3( lastAxis );
////	savefile.ReadFloat( additionalRotation );
////	savefile.ReadMat3( additionalAxis );
////}
////
/////*
////================
////idBarrel::BarrelThink
////================
////*/
////void idBarrel::BarrelThink( ) {
////	bool wasAtRest, onGround;
////	float movedDistance, rotatedDistance, angle;
////	idVec3 curOrigin, gravityNormal, dir;
////	idMat3 curAxis, axis;
////
////	wasAtRest = IsAtRest();
////
////	// run physics
////	RunPhysics();
////
////	// only need to give the visual model an additional rotation if the physics were run
////	if ( !wasAtRest ) {
////
////		// current physics state
////		onGround = this.GetPhysics().HasGroundContacts();
////		curOrigin = this.GetPhysics().GetOrigin();
////		curAxis = this.GetPhysics().GetAxis();
////
////		// if the barrel is on the ground
////		if ( onGround ) {
////			gravityNormal = this.GetPhysics().GetGravityNormal();
////
////			dir = curOrigin - lastOrigin;
////			dir -= gravityNormal * dir * gravityNormal;
////			movedDistance = dir.LengthSqr();
////
////			// if the barrel moved and the barrel is not aligned with the gravity direction
////			if ( movedDistance > 0.0 && idMath.Fabs( gravityNormal * curAxis[barrelAxis] ) < 0.7f ) {
////
////				// barrel movement since last think frame orthogonal to the barrel axis
////				movedDistance = idMath.Sqrt( movedDistance );
////				dir *= 1.0 / movedDistance;
////				movedDistance = ( 1.0 - idMath.Fabs( dir * curAxis[barrelAxis] ) ) * movedDistance;
////
////				// get rotation about barrel axis since last think frame
////				angle = lastAxis[(barrelAxis+1)%3] * curAxis[(barrelAxis+1)%3];
////				angle = idMath.ACos( angle );
////				// distance along cylinder hull
////				rotatedDistance = angle * radius;
////
////				// if the barrel moved further than it rotated about it's axis
////				if ( movedDistance > rotatedDistance ) {
////
////					// additional rotation of the visual model to make it look
////					// like the barrel rolls instead of slides
////					angle = 180.0 * (movedDistance - rotatedDistance) / (radius * idMath.PI);
////					if ( gravityNormal.Cross( curAxis[barrelAxis] ) * dir < 0.0 ) {
////						additionalRotation += angle;
////					} else {
////						additionalRotation -= angle;
////					}
////					dir = vec3_origin;
////					dir[barrelAxis] = 1.0;
////					additionalAxis = idRotation( vec3_origin, dir, additionalRotation ).ToMat3();
////				}
////			}
////		}
////
////		// save state for next think
////		lastOrigin = curOrigin;
////		lastAxis = curAxis;
////	}
////
////	Present();
////}
////
/////*
////================
////idBarrel::Think
////================
////*/
	Think(): void {
		todoThrow();
////	if ( thinkFlags & TH_THINK ) {
////		if ( !FollowInitialSplinePath() ) {
////			BecomeInactive( TH_THINK );
////		}
////	}
////
////	BarrelThink();
}
////
/////*
////================
////idBarrel::GetPhysicsToVisualTransform
////================
////*/
	GetPhysicsToVisualTransform ( origin: idVec3, axis: idMat3 ): boolean {
		origin.opEquals( vec3_origin );
		axis.opEquals( this.additionalAxis );
		return true;
	}
////
/////*
////================
////idBarrel::Spawn
////================
////*/
	Spawn(): void {
		todoThrow();
////	const idBounds &bounds = this.GetPhysics().GetBounds();
////
////	// radius of the barrel cylinder
////	radius = ( bounds[1][0] - bounds[0][0] ) * 0.5f;
////
////	// always a vertical barrel with cylinder axis parallel to the z-axis
////	barrelAxis = 2;
////
////	lastOrigin = this.GetPhysics().GetOrigin();
////	lastAxis = this.GetPhysics().GetAxis();
////
////	additionalRotation = 0.0;
////	additionalAxis.Identity();
}
////
/////*
////================
////idBarrel::ClientPredictionThink
////================
////*/
////void idBarrel::ClientPredictionThink( ) {
////	Think();
////}
////
};


/*
===============================================================================

  A barrel using rigid body physics and special handling of the view model
  orientation to make it look like it rolls instead of slides. The barrel
  can burn and explode when damaged.

===============================================================================
*/

class idExplodingBarrel extends idBarrel {
////public:
////	CLASS_PROTOTYPE( idExplodingBarrel );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idExplodingBarrel>[];
////
////							idExplodingBarrel();
////							~idExplodingBarrel();
////
////	void					Spawn( );
////
////	void					Save( idSaveGame *savefile ) const;
////	void					Restore( idRestoreGame *savefile );
////
////	virtual void			Think( );
////	virtual void			Damage( idEntity *inflictor, idEntity *attacker, const idVec3 &dir, 
////								const char *damageDefName, const float damageScale, const int location );
////	virtual void			Killed( idEntity *inflictor, idEntity *attacker, int damage, const idVec3 &dir, int location );
////
////	virtual void			WriteToSnapshot( idBitMsgDelta &msg ) const;
////	virtual void			ReadFromSnapshot( const idBitMsgDelta &msg );
////	virtual bool			ClientReceiveEvent( int event, /*int*/time:number, const idBitMsg &msg );
////
////	enum {
////		EVENT_EXPLODE = idEntity::EVENT_MAXEVENTS,
////		EVENT_MAXEVENTS
////	};
////
////private:
////	typedef enum {
////		NORMAL = 0,
////		BURNING,
////		BURNEXPIRED,
////		EXPLODING
////	} explode_state_t;
////	explode_state_t			state;
////
////	idVec3					spawnOrigin;
////	idMat3					spawnAxis;
////	qhandle_t				particleModelDefHandle;
////	qhandle_t				lightDefHandle;
////	renderEntity_t			particleRenderEntity;
////	renderLight_t			light;
////	int						particleTime;
////	int						lightTime;
////	float					time;
////
////	void					AddParticles( const char *name, bool burn );
////	void					AddLight( const char *name , bool burn );
////	void					ExplodingEffects( );
////
	Event_Activate( activator:idEntity ): void { throw "placeholder"; }
	Event_Respawn(): void { throw "placeholder"; }
	Event_Explode(): void { throw "placeholder"; }
	Event_TriggerTargets(): void { throw "placeholder"; }



	/////*
	////================
	////idExplodingBarrel::idExplodingBarrel
	////================
	////*/
	////idExplodingBarrel::idExplodingBarrel() {
	////	spawnOrigin.Zero();
	////	spawnAxis.Zero();
	////	state = NORMAL;
	////	particleModelDefHandle = -1;
	////	lightDefHandle = -1;
	////	memset( &particleRenderEntity, 0, sizeof( particleRenderEntity ) );
	////	memset( &light, 0, sizeof( light ) );
	////	particleTime = 0;
	////	lightTime = 0;
	////	time = 0.0;
	////}
	////
	/////*
	////================
	////idExplodingBarrel::~idExplodingBarrel
	////================
	////*/
	////idExplodingBarrel::~idExplodingBarrel() {
	////	if ( particleModelDefHandle >= 0 ){
	////		gameRenderWorld.FreeEntityDef( particleModelDefHandle );
	////	}
	////	if ( lightDefHandle >= 0 ) {
	////		gameRenderWorld.FreeLightDef( lightDefHandle );
	////	}
	////}
	////
	/////*
	////================
	////idExplodingBarrel::Save
	////================
	////*/
	////void idExplodingBarrel::Save( idSaveGame *savefile ) const {
	////	savefile.WriteVec3( spawnOrigin );
	////	savefile.WriteMat3( spawnAxis );
	////
	////	savefile.WriteInt( state );
	////	savefile.WriteInt( particleModelDefHandle );
	////	savefile.WriteInt( lightDefHandle );
	////
	////	savefile.WriteRenderEntity( particleRenderEntity );
	////	savefile.WriteRenderLight( light );
	////
	////	savefile.WriteInt( particleTime );
	////	savefile.WriteInt( lightTime );
	////	savefile.WriteFloat( time );
	////}
	////
	/////*
	////================
	////idExplodingBarrel::Restore
	////================
	////*/
	////void idExplodingBarrel::Restore( idRestoreGame *savefile ) {
	////	savefile.ReadVec3( spawnOrigin );
	////	savefile.ReadMat3( spawnAxis );
	////
	////	savefile.ReadInt( (int &)state );
	////	savefile.ReadInt( (int &)particleModelDefHandle );
	////	savefile.ReadInt( (int &)lightDefHandle );
	////
	////	savefile.ReadRenderEntity( particleRenderEntity );
	////	savefile.ReadRenderLight( light );
	////
	////	savefile.ReadInt( particleTime );
	////	savefile.ReadInt( lightTime );
	////	savefile.ReadFloat( time );
	////}
	////
	/////*
	////================
	////idExplodingBarrel::Spawn
	////================
	////*/
	Spawn(): void {
		todoThrow();
		////	this.health = this.spawnArgs.GetInt( "health", "5" );
		////	this.fl.takedamage = true;
		////	spawnOrigin = this.GetPhysics().GetOrigin();
		////	spawnAxis = this.GetPhysics().GetAxis();
		////	state = NORMAL;
		////	particleModelDefHandle = -1;
		////	lightDefHandle = -1;
		////	lightTime = 0;
		////	particleTime = 0;
		////	time = this.spawnArgs.GetFloat( "time" );
		////	memset( &particleRenderEntity, 0, sizeof( particleRenderEntity ) );
		////	memset( &light, 0, sizeof( light ) );
	}
////
/////*
////================
////idExplodingBarrel::Think
////================
////*/
	Think(): void {
		todoThrow();
////	idBarrel::BarrelThink();
////
////	if ( lightDefHandle >= 0 ){
////		if ( state == BURNING ) {
////			// ramp the color up over 250 ms
////			float pct = (gameLocal.time - lightTime) / 250.f;
////			if ( pct > 1.0 ) {
////				pct = 1.0;
////			}
////			light.origin = this.physicsObj.GetAbsBounds().GetCenter();
////			light.axis = mat3_identity;
////			light.shaderParms[ SHADERPARM_RED ] = pct;
////			light.shaderParms[ SHADERPARM_GREEN ] = pct;
////			light.shaderParms[ SHADERPARM_BLUE ] = pct;
////			light.shaderParms[ SHADERPARM_ALPHA ] = pct;
////			gameRenderWorld.UpdateLightDef( lightDefHandle, &light );
////		} else {
////			if ( gameLocal.time - lightTime > 250 ) {
////				gameRenderWorld.FreeLightDef( lightDefHandle );
////				lightDefHandle = -1;
////			}
////			return;
////		}
////	}
////
////	if ( !gameLocal.isClient && state != BURNING && state != EXPLODING ) {
////		BecomeInactive( TH_THINK );
////		return;
////	}
////
////	if ( particleModelDefHandle >= 0 ){
////		particleRenderEntity.origin = this.physicsObj.GetAbsBounds().GetCenter();
////		particleRenderEntity.axis = mat3_identity;
////		gameRenderWorld.UpdateEntityDef( particleModelDefHandle, &particleRenderEntity );
////	}
}
////
/////*
////================
////idExplodingBarrel::AddParticles
////================
////*/
////void idExplodingBarrel::AddParticles( const char *name, bool burn ) {
////	if ( name && *name ) {
////		if ( particleModelDefHandle >= 0 ){
////			gameRenderWorld.FreeEntityDef( particleModelDefHandle );
////		}
////		memset( &particleRenderEntity, 0, sizeof ( particleRenderEntity ) );
////		const idDeclModelDef *modelDef = static_cast<const idDeclModelDef *>( declManager.FindType( DECL_MODELDEF, name ) );
////		if ( modelDef ) {
////			particleRenderEntity.origin = this.physicsObj.GetAbsBounds().GetCenter();
////			particleRenderEntity.axis = mat3_identity;
////			particleRenderEntity.hModel = modelDef.ModelHandle();
////			float rgb = ( burn ) ? 0.0 : 1.0;
////			particleRenderEntity.shaderParms[ SHADERPARM_RED ] = rgb;
////			particleRenderEntity.shaderParms[ SHADERPARM_GREEN ] = rgb;
////			particleRenderEntity.shaderParms[ SHADERPARM_BLUE ] = rgb;
////			particleRenderEntity.shaderParms[ SHADERPARM_ALPHA ] = rgb;
////			particleRenderEntity.shaderParms[ SHADERPARM_TIMEOFFSET ] = -MS2SEC( gameLocal.realClientTime );
////			particleRenderEntity.shaderParms[ SHADERPARM_DIVERSITY ] = ( burn ) ? 1.0 : gameLocal.random.RandomInt( 90 );
////			if ( !particleRenderEntity.hModel ) {
////				particleRenderEntity.hModel = renderModelManager.FindModel( name );
////			}
////			particleModelDefHandle = gameRenderWorld.AddEntityDef( &particleRenderEntity );
////			if ( burn ) {
////				BecomeActive( TH_THINK );
////			}
////			particleTime = gameLocal.realClientTime;
////		}
////	}
////}
////
/////*
////================
////idExplodingBarrel::AddLight
////================
////*/
////void idExplodingBarrel::AddLight( const char *name, bool burn ) {
////	if ( lightDefHandle >= 0 ){
////		gameRenderWorld.FreeLightDef( lightDefHandle );
////	}
////	memset( &light, 0, sizeof ( light ) );
////	light.axis .opEquals( mat3_identity);
////	light.lightRadius.x = this.spawnArgs.GetFloat( "light_radius" );
////	light.lightRadius.y = light.lightRadius.z = light.lightRadius.x;
////	light.origin = this.physicsObj.GetOrigin();
////	light.origin.z += 128;
////	light.pointLight = true;
////	light.shader = declManager.FindMaterial( name );
////	light.shaderParms[ SHADERPARM_RED ] = 2.0;
////	light.shaderParms[ SHADERPARM_GREEN ] = 2.0;
////	light.shaderParms[ SHADERPARM_BLUE ] = 2.0;
////	light.shaderParms[ SHADERPARM_ALPHA ] = 2.0;
////	lightDefHandle = gameRenderWorld.AddLightDef( &light );
////	lightTime = gameLocal.realClientTime;
////	BecomeActive( TH_THINK );
////}
////
/////*
////================
////idExplodingBarrel::ExplodingEffects
////================
////*/
////void idExplodingBarrel::ExplodingEffects( ) {
////	const char *temp;
////
////	StartSound( "snd_explode", SND_CHANNEL_ANY, 0, false, NULL );
////
////	temp = this.spawnArgs.GetString( "model_damage" );
////	if ( *temp != '\0' ) {
////		SetModel( temp );
////		Show();
////	}
////
////	temp = this.spawnArgs.GetString( "model_detonate" );
////	if ( *temp != '\0' ) {
////		AddParticles( temp, false );
////	}
////
////	temp = this.spawnArgs.GetString( "mtr_lightexplode" );
////	if ( *temp != '\0' ) {
////		AddLight( temp, false );
////	}
////
////	temp = this.spawnArgs.GetString( "mtr_burnmark" );
////	if ( *temp != '\0' ) {
////		gameLocal.ProjectDecal( this.GetPhysics().GetOrigin(), this.GetPhysics().GetGravity(), 128.0, true, 96.0, temp );
////	}
////}
////
/////*
////================
////idExplodingBarrel::Killed
////================
////*/
////void idExplodingBarrel::Killed( idEntity *inflictor, idEntity *attacker, int damage, const idVec3 &dir, int location ) {
////
////	if ( IsHidden() || state == EXPLODING || state == BURNING ) {
////		return;
////	}
////
////	float f = this.spawnArgs.GetFloat( "burn" );
////	if ( f > 0.0 && state == NORMAL ) {
////		state = BURNING;
////		PostEventSec( &EV_Explode, f );
////		StartSound( "snd_burn", SND_CHANNEL_ANY, 0, false, NULL );
////		AddParticles( this.spawnArgs.GetString ( "model_burn", "" ), true );
////		return;
////	} else {
////		state = EXPLODING;
////		if ( gameLocal.isServer ) {
////			idBitMsg	msg;
////			byte		msgBuf[MAX_EVENT_PARAM_SIZE];
////
////			msg.Init( msgBuf, sizeof( msgBuf ) );
////			msg.WriteLong( gameLocal.time );
////			ServerSendEvent( EVENT_EXPLODE, &msg, false, -1 );
////		}		
////	}
////
////	// do this before applying radius damage so the ent can trace to any damagable ents nearby
////	Hide();
////	this.physicsObj.SetContents( 0 );
////
////	const char *splash = this.spawnArgs.GetString( "def_splash_damage", "damage_explosion" );
////	if ( splash && *splash ) {
////		gameLocal.RadiusDamage( this.GetPhysics().GetOrigin(), this, attacker, this, this, splash );
////	}
////
////	ExplodingEffects( );
////	
////	//FIXME: need to precache all the debris stuff here and in the projectiles
////	const idKeyValue *kv = this.spawnArgs.MatchPrefix( "def_debris" );
////	// bool first = true;
////	while ( kv ) {
////		const idDict *debris_args = gameLocal.FindEntityDefDict( kv.GetValue(), false );
////		if ( debris_args ) {
////			var ent:idEntity
////			idVec3 dir;
////			idDebris *debris;
////			//if ( first ) {
////				dir = this.physicsObj.GetAxis()[1];
////			//	first = false;
////			//} else {
////				dir.x += gameLocal.random.CRandomFloat() * 4.0;
////				dir.y += gameLocal.random.CRandomFloat() * 4.0;
////				//dir.z = gameLocal.random.RandomFloat() * 8.0;
////			//}
////			dir.Normalize();
////
////			gameLocal.SpawnEntityDef( *debris_args, &ent, false );
////			if ( !ent || !ent.IsType( idDebris::Type ) ) {
////				gameLocal.Error( "'projectile_debris' is not an idDebris" );
////			}
////
////			debris = static_cast<idDebris *>(ent);
////			debris.Create( this, this.physicsObj.GetOrigin(), dir.ToMat3() );
////			debris.Launch();
////			debris.GetRenderEntity().shaderParms[ SHADERPARM_TIME_OF_DEATH ] = ( gameLocal.time + 1500 ) * 0.001f;
////			debris.UpdateVisuals();
////			
////		}
////		kv = this.spawnArgs.MatchPrefix( "def_debris", kv );
////	}
////
////	this.physicsObj.PutToRest();
////	CancelEvents( &EV_Explode );
////	CancelEvents( &EV_Activate );
////
////	f = this.spawnArgs.GetFloat( "respawn" );
////	if ( f > 0.0 ) {
////		PostEventSec( &EV_Respawn, f );
////	} else {
////		this.PostEventMS( &EV_Remove, 5000 );
////	}
////
////	if ( this.spawnArgs.GetBool( "triggerTargets" ) ) {
////		ActivateTargets( this );
////	}
////}
////
/////*
////================
////idExplodingBarrel::Damage
////================
////*/
////void idExplodingBarrel::Damage( idEntity *inflictor, idEntity *attacker, const idVec3 &dir, 
////					  const char *damageDefName, const float damageScale, const int location ) {
////
////	const idDict *damageDef = gameLocal.FindEntityDefDict( damageDefName );
////	if ( !damageDef ) {
////		gameLocal.Error( "Unknown damageDef '%s'\n", damageDefName );
////	}
////	if ( damageDef.FindKey( "radius" ) && this.GetPhysics().GetContents() != 0 && GetBindMaster() == NULL ) {
////		this.PostEventMS( &EV_Explode, 400 );
////	} else {
////		idEntity::Damage( inflictor, attacker, dir, damageDefName, damageScale, location );
////	}
////}
////
/////*
////================
////idExplodingBarrel::Event_TriggerTargets
////================
////*/
////void idExplodingBarrel::Event_TriggerTargets() {
////	ActivateTargets( this );
////}
////
/////*
////================
////idExplodingBarrel::Event_Explode
////================
////*/
////void idExplodingBarrel::Event_Explode() {
////	if ( state == NORMAL || state == BURNING ) {
////		state = BURNEXPIRED;
////		Killed( NULL, NULL, 0, vec3_zero, 0 );
////	}
////}
////
/////*
////================
////idExplodingBarrel::Event_Respawn
////================
////*/
////void idExplodingBarrel::Event_Respawn() {
////	var/*int*/i:number;
////	int minRespawnDist = this.spawnArgs.GetInt( "respawn_range", "256" );
////	if ( minRespawnDist ) {
////		float minDist = -1;
////		for ( i = 0; i < gameLocal.numClients; i++ ) {
////			if ( !gameLocal.entities[ i ] || !gameLocal.entities[ i ].IsType( idPlayer::Type ) ) {
////				continue;
////			}
////			idVec3 v = gameLocal.entities[ i ].this.GetPhysics().GetOrigin() - this.GetPhysics().GetOrigin();
////			float dist = v.Length();
////			if ( minDist < 0 || dist < minDist ) {
////				minDist = dist;
////			}
////		}
////		if ( minDist < minRespawnDist ) {
////			PostEventSec( &EV_Respawn, this.spawnArgs.GetInt( "respawn_again", "10" ) );
////			return;
////		}
////	}
////	const char *temp = this.spawnArgs.GetString( "model" );
////	if ( temp && *temp ) {
////		SetModel( temp );
////	}
////	this.health = this.spawnArgs.GetInt( "health", "5" );
////	this.fl.takedamage = true;
////	this.physicsObj.SetOrigin( spawnOrigin );
////	this.physicsObj.SetAxis( spawnAxis );
////	this.physicsObj.SetContents( contentsFlags_t.CONTENTS_SOLID );
////	this.physicsObj.DropToFloor();
////	state = NORMAL;
////	Show();
////	UpdateVisuals();
////}
////
/////*
////================
////idMoveable::Event_Activate
////================
////*/
////void idExplodingBarrel::Event_Activate( activator:idEntity ) {
////	Killed( activator, activator, 0, vec3_origin, 0 );
////}
////
/////*
////================
////idMoveable::WriteToSnapshot
////================
////*/
////void idExplodingBarrel::WriteToSnapshot( idBitMsgDelta &msg ) const {
////	idMoveable::WriteToSnapshot( msg );
////	msg.WriteBits( IsHidden(), 1 );
////}
////
/////*
////================
////idMoveable::ReadFromSnapshot
////================
////*/
////void idExplodingBarrel::ReadFromSnapshot( const idBitMsgDelta &msg ) {
////
////	idMoveable::ReadFromSnapshot( msg );
////	if ( msg.ReadBits( 1 ) ) {
////		Hide();
////	} else {
////		Show();
////	}
////}
////
/////*
////================
////idExplodingBarrel::ClientReceiveEvent
////================
////*/
////bool idExplodingBarrel::ClientReceiveEvent( int event, /*int*/time:number, const idBitMsg &msg ) {
////
////	switch( event ) {
////		case EVENT_EXPLODE: {
////			if ( gameLocal.realClientTime - msg.ReadLong() < this.spawnArgs.GetInt( "explode_lapse", "1000" ) ) {
////				ExplodingEffects( );
////			}
////			return true;
////		}
////		default: {
////			return idBarrel::ClientReceiveEvent( event, time, msg );
////		}
////	}
////	return false;
////}

};
////
////#endif /* !__GAME_MOVEABLE_H__ */
