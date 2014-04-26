/////*
////===========================================================================

////Doom 3 GPL Source Code
////Copyright (C) 1999-2011 id Software LLC, a ZeniMax Media company. 

////This file is part of the Doom 3 GPL Source Code (?Doom 3 Source Code?).  

////Doom 3 Source Code is free software: you can redistribute it and/or modify
////it under the terms of the GNU General Public License as published by
////the Free Software Foundation, either version 3 of the License, or
////(at your option) any later version.

////Doom 3 Source Code is distributed in the hope that it will be useful,
////but WITHOUT ANY WARRANTY; without even the implied warranty of
////MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
////GNU General Public License for more details.

////You should have received a copy of the GNU General Public License
////along with Doom 3 Source Code.  If not, see <http://www.gnu.org/licenses/>.

////In addition, the Doom 3 Source Code is also subject to certain additional terms. You should have received a copy of these additional terms immediately following the terms and conditions of the GNU General Public License which accompanied the Doom 3 Source Code.  If not, please request a copy in writing from id Software at the address below.

////If you have questions concerning this license or the applicable additional terms, you may contact in writing id Software LLC, c/o ZeniMax Media Inc., Suite 120, Rockville, Maryland 20850 USA.

////===========================================================================
////*/

////#ifndef __GAME_MOVER_H__
////#define __GAME_MOVER_H__

////extern const idEventDef EV_TeamBlocked;
////extern const idEventDef EV_PartBlocked;
////extern const idEventDef EV_ReachedPos;
////extern const idEventDef EV_ReachedAng;

/*
===============================================================================

  General movers.

===============================================================================
*/
enum moveStage_t{
	ACCELERATION_STAGE,
	LINEAR_STAGE,
	DECELERATION_STAGE,
	FINISHED_STAGE
}

enum moverCommand_t{
	MOVER_NONE,
	MOVER_ROTATING,
	MOVER_MOVING,
	MOVER_SPLINE
} 

//
// mover directions.  make sure to change script/doom_defs.script if you add any, or change their order
//
enum moverDir_t{
	DIR_UP				= -1,
	DIR_DOWN			= -2,
	DIR_LEFT			= -3,
	DIR_RIGHT			= -4,
	DIR_FORWARD			= -5,
	DIR_BACK			= -6,
	DIR_REL_UP			= -7,
	DIR_REL_DOWN		= -8,
	DIR_REL_LEFT		= -9,
	DIR_REL_RIGHT		= -10,
	DIR_REL_FORWARD		= -11,
	DIR_REL_BACK		= -12
} 



class moveState_t {
	stage : moveStage_t;
	acceleration:number/*int*/;
	movetime:number/*int*/;
	deceleration :number/*int*/;
	dir = new idVec3;

	memset0(): void {
		this.stage = moveStage_t.ACCELERATION_STAGE;
		this.acceleration = 0;
		this.movetime = 0;
		this.deceleration = 0;
		this.dir.memset0 ( );
	}
}

class rotationState_t {
	stage: moveStage_t;
	acceleration: number /*int*/;
	movetime: number /*int*/;
	deceleration: number /*int*/;
	rot = new idAngles;

	memset0 ( ): void {
		this.stage = moveStage_t.ACCELERATION_STAGE;
		this.acceleration = 0;
		this.movetime = 0;
		this.deceleration = 0;
		this.rot.memset0 ( );
	}
}

class idMover extends idEntity {
////public:
////	CLASS_PROTOTYPE( idMover );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idMover>[];

////							idMover( );

////	void					Spawn( );

////	void					Save( idSaveGame *savefile ) const;
////	void					Restore( idRestoreGame *savefile );

////	virtual void			Killed( idEntity *inflictor, idEntity *attacker, int damage, const idVec3 &dir, int location );

////	virtual void			WriteToSnapshot( idBitMsgDelta &msg ) const;
////	virtual void			ReadFromSnapshot( const idBitMsgDelta &msg );

////	virtual void			Hide( );
////	virtual void			Show( );

////	void					SetPortalState( bool open );

////protected:


	physicsObj = new idPhysics_Parametric;

	Event_OpenPortal( ): void { throw "placeholder"; }
	Event_ClosePortal( ): void { throw "placeholder"; }
	Event_PartBlocked( blockingEntity:idEntity  ): void { throw "placeholder"; }

////	void					MoveToPos( pos:idVec3): void { throw "placeholder"; }
////	void					UpdateMoveSound( moveStage_t stage ): void { throw "placeholder"; }
////	void					UpdateRotationSound( moveStage_t stage ): void { throw "placeholder"; }
////	void					SetGuiStates( const char *state ): void { throw "placeholder"; }
////	void					FindGuiTargets( ): void { throw "placeholder"; }
////	void					SetGuiState( key:string, const char *val ) const;

////	virtual void			DoneMoving( ): void {throw "placeholder";}
////	virtual void			DoneRotating( ): void {throw "placeholder";}
////	virtual void			BeginMove( idThread *thread = NULL );
////	virtual void			BeginRotation( idThread *thread, bool stopwhendone );
	move = new moveState_t;

////private:
	rot = new rotationState_t;
	
	move_thread :number/*int*/;
	rotate_thread :number/*int*/;
	dest_angles = new idAngles;
	angle_delta = new idAngles;
	dest_position = new idVec3;
	move_delta = new idVec3;
	move_speed :number/*float*/;
	move_time :number/*int*/;
	deceltime :number/*int*/;
	acceltime :number/*int*/;
	stopRotation:boolean;
	useSplineAngles:boolean;
	splineEnt = new idEntityPtr<idEntity>();
	lastCommand:moverCommand_t;
	damage:number/*float*/;

	areaPortal:number/*qhandle_t*/;		// 0 = no portal

	guiTargets = new idList<idEntityPtr<idEntity>>(idEntityPtr);

////	void					VectorForDir( float dir, vec:idVec3 );
////	idCurve_Spline<idVec3> *GetSpline( idEntity *splineEntity ) const;

	Event_SetCallback( ): void { throw "placeholder"; }	
	Event_TeamBlocked(blockedPart: idEntity, blockingEntity: idEntity ): void { throw "placeholder"; }
	Event_StopMoving( ): void { throw "placeholder"; }
	Event_StopRotating( ): void { throw "placeholder"; }
	Event_UpdateMove( ): void { throw "placeholder"; }
	Event_UpdateRotation( ): void { throw "placeholder"; }
	Event_SetMoveSpeed( /*float*/speed:number ): void { throw "placeholder"; }
	Event_SetMoveTime( /*float*/time:number ): void { throw "placeholder"; }
	Event_SetDecelerationTime( /*float*/time:number ): void { throw "placeholder"; }
	Event_SetAccellerationTime( /*float*/time:number ): void { throw "placeholder"; }
	Event_MoveTo( ent:idEntity ): void { throw "placeholder"; }
	Event_MoveToPos( pos:idVec3 ): void { throw "placeholder"; }
	Event_MoveDir( /*float*/angle:number, /*float*/ distance :number): void { throw "placeholder"; }
	Event_MoveAccelerateTo( /*float*/speed:number, /*float*/time:number ): void { throw "placeholder"; }
	Event_MoveDecelerateTo( /*float*/speed:number, /*float*/time:number ): void { throw "placeholder"; }
	Event_RotateDownTo( /*int*/axis:number, /*float*/angle:number ): void { throw "placeholder"; }
	Event_RotateUpTo( /*int*/axis:number, /*float*/angle:number ): void { throw "placeholder"; }
	Event_RotateTo( angles:idAngles ): void { throw "placeholder"; }
	Event_Rotate( angles:idAngles ): void { throw "placeholder"; }
	Event_RotateOnce( angles:idAngles ): void { throw "placeholder"; }
	Event_Bob( /*float*/speed: number, /*float*/ phase: number, depth: idVec3): void { throw "placeholder"; }
	Event_Sway( /*float*/speed: number, /*float*/ phase: number, depth: idAngles ): void { throw "placeholder"; }
	Event_SetAccelSound( sound:string ): void { throw "placeholder"; }
	Event_SetDecelSound( sound:string ): void { throw "placeholder"; }
	Event_SetMoveSound( sound:string ): void { throw "placeholder"; }
	Event_FindGuiTargets( ): void { throw "placeholder"; }
	Event_InitGuiTargets( ): void { throw "placeholder"; }
	Event_EnableSplineAngles( ): void { throw "placeholder"; }
	Event_DisableSplineAngles( ): void { throw "placeholder"; }
	Event_RemoveInitialSplineAngles( ): void { throw "placeholder"; }
	Event_StartSpline(splineEntity: idEntity ): void { throw "placeholder"; }
	Event_StopSpline( ): void { throw "placeholder"; }
	Event_Activate( activator:idEntity ): void { throw "placeholder"; }
	Event_PostRestore( /*int*/ start: number, /*int */total: number, /*int */accel: number, /*int */decel: number, /*int */useSplineAng: number ): void { throw "placeholder"; }
	Event_IsMoving( ): void { throw "placeholder"; }
	Event_IsRotating(): void { throw "placeholder"; }


	/*
	================
	idMover::idMover
	================
	*/
	constructor() {
		super ( );
		this.move.memset0 ( );//memset( &move, 0, sizeof( move ) );
		this.rot.memset0();//	memset( &rot, 0, sizeof( rot ) );
		this.move_thread = 0;
		this.rotate_thread = 0;
		this.dest_angles.Zero();
		this.angle_delta.Zero();
		this.dest_position.Zero();
		this.move_delta.Zero();
		this.move_speed = 0.0;
		this.move_time = 0;
		this.deceltime = 0;
		this.acceltime = 0;
		this.stopRotation = false;
		this.useSplineAngles = true;
		this.lastCommand = moverCommand_t.MOVER_NONE;
		this.damage = 0.0;
		this.areaPortal = 0;
		this.fl.networkSync = true;
	}
	
	/////*
	////================
	////idMover::Save
	////================
	////*/
	////void idMover::Save( idSaveGame *savefile ) const {
	////	var/*int*/i:number;
	////
	////	savefile.WriteStaticObject( this.physicsObj );
	////
	////	savefile.WriteInt( move.stage );
	////	savefile.WriteInt( move.acceleration );
	////	savefile.WriteInt( move.movetime );
	////	savefile.WriteInt( move.deceleration );
	////	savefile.WriteVec3( move.dir );
	////	
	////	savefile.WriteInt( rot.stage );
	////	savefile.WriteInt( rot.acceleration );
	////	savefile.WriteInt( rot.movetime );
	////	savefile.WriteInt( rot.deceleration );
	////	savefile.WriteFloat( rot.rot.pitch );
	////	savefile.WriteFloat( rot.rot.yaw );
	////	savefile.WriteFloat( rot.rot.roll );
	////	
	////	savefile.WriteInt( this.move_thread );
	////	savefile.WriteInt( this.rotate_thread );
	////
	////	savefile.WriteAngles( this.dest_angles );
	////	savefile.WriteAngles( angle_delta );
	////	savefile.WriteVec3( this.dest_position );
	////	savefile.WriteVec3( move_delta );
	////
	////	savefile.WriteFloat( move_speed );
	////	savefile.WriteInt( move_time );
	////	savefile.WriteInt( deceltime );
	////	savefile.WriteInt( acceltime );
	////	savefile.WriteBool( this.stopRotation );
	////	savefile.WriteBool( useSplineAngles );
	////	savefile.WriteInt( lastCommand );
	////	savefile.WriteFloat( damage );
	////
	////	savefile.WriteInt( this.areaPortal );
	////	if ( this.areaPortal > 0 ) {
	////		savefile.WriteInt( gameRenderWorld.GetPortalState( this.areaPortal ) );
	////	}
	////
	////	savefile.WriteInt( guiTargets.Num() );
	////	for( i = 0; i < guiTargets.Num(); i++ ) {
	////		guiTargets[ i ].Save( savefile );
	////	}
	////
	////	if ( splineEnt.GetEntity() && splineEnt.GetEntity().GetSpline() ) {
	////		idCurve_Spline<idVec3> *spline = this.physicsObj.GetSpline();
	////
	////		savefile.WriteBool( true );
	////		splineEnt.Save( savefile );
	////		savefile.WriteInt( spline.GetTime( 0 ) );
	////		savefile.WriteInt( spline.GetTime( spline.GetNumValues() - 1 ) - spline.GetTime( 0 ) );
	////		savefile.WriteInt( this.physicsObj.GetSplineAcceleration() );
	////		savefile.WriteInt( this.physicsObj.GetSplineDeceleration() );
	////		savefile.WriteInt( (int)this.physicsObj.UsingSplineAngles() );
	////
	////	} else {
	////		savefile.WriteBool( false );
	////	}
	////}
	////
	/////*
	////================
	////idMover::Restore
	////================
	////*/
	////void idMover::Restore( idRestoreGame *savefile ) {
	////	int i, num;
	////	bool hasSpline = false;
	////
	////	savefile.ReadStaticObject( this.physicsObj );
	////	RestorePhysics( &this.physicsObj );
	////
	////	savefile.ReadInt( (int&)move.stage );
	////	savefile.ReadInt( move.acceleration );
	////	savefile.ReadInt( move.movetime );
	////	savefile.ReadInt( move.deceleration );
	////	savefile.ReadVec3( move.dir );
	////	
	////	savefile.ReadInt( (int&)rot.stage );
	////	savefile.ReadInt( rot.acceleration );
	////	savefile.ReadInt( rot.movetime );
	////	savefile.ReadInt( rot.deceleration );
	////	savefile.ReadFloat( rot.rot.pitch );
	////	savefile.ReadFloat( rot.rot.yaw );
	////	savefile.ReadFloat( rot.rot.roll );
	////	
	////	savefile.ReadInt( this.move_thread );
	////	savefile.ReadInt( this.rotate_thread );
	////
	////	savefile.ReadAngles( this.dest_angles );
	////	savefile.ReadAngles( angle_delta );
	////	savefile.ReadVec3( this.dest_position );
	////	savefile.ReadVec3( move_delta );
	////
	////	savefile.ReadFloat( move_speed );
	////	savefile.ReadInt( move_time );
	////	savefile.ReadInt( deceltime );
	////	savefile.ReadInt( acceltime );
	////	savefile.ReadBool( this.stopRotation );
	////	savefile.ReadBool( useSplineAngles );
	////	savefile.ReadInt( (int &)lastCommand );
	////	savefile.ReadFloat( damage );
	////
	////	savefile.ReadInt( this.areaPortal );
	////	if ( this.areaPortal > 0 ) {
	////		int portalState = 0;
	////		savefile.ReadInt( portalState );
	////		gameLocal.SetPortalState( this.areaPortal, portalState );
	////	}
	////
	////	guiTargets.Clear();
	////	savefile.ReadInt( num );
	////	guiTargets.SetNum( num );
	////	for( i = 0; i < num; i++ ) {
	////		guiTargets[ i ].Restore( savefile );
	////	}
	////
	////	savefile.ReadBool( hasSpline );
	////	if ( hasSpline ) {
	////		int starttime;
	////		int totaltime;
	////		int accel;
	////		int decel;
	////		int useAngles;
	////
	////		splineEnt.Restore( savefile );
	////		savefile.ReadInt( starttime );
	////		savefile.ReadInt( totaltime );
	////		savefile.ReadInt( accel );
	////		savefile.ReadInt( decel );
	////		savefile.ReadInt( useAngles );
	////
	////		this.PostEventMS( &EV_PostRestore, 0, starttime, totaltime, accel, decel, useAngles );
	////	} 
	////}
	////
	/////*
	////================
	////idMover::Event_PostRestore
	////================
	////*/
	////void idMover::Event_PostRestore( int start, int total, int accel, int decel, int useSplineAng ) {
	////	idCurve_Spline<idVec3> *spline;
	////
	////	idEntity *splineEntity = splineEnt.GetEntity();
	////	if ( !splineEntity ) {
	////		// We should never get this event if splineEnt is invalid
	////		common.Warning( "Invalid spline entity during restore\n" );
	////		return;
	////	}
	////
	////	spline = splineEntity.GetSpline();
	////
	////	spline.MakeUniform( total );
	////	spline.ShiftTime( start - spline.GetTime( 0 ) );
	////
	////	this.physicsObj.SetSpline( spline, accel, decel, ( useSplineAng != 0 ) );
	////	this.physicsObj.SetLinearExtrapolation( EXTRAPOLATION_NONE, 0, 0, this.dest_position, vec3_origin, vec3_origin );
	////}
	////
	/////*
	////================
	////idMover::Spawn
	////================
	////*/
	Spawn(): void {
		this.move_thread		= 0;
		this.rotate_thread	= 0;
		this.stopRotation	= false;
		this.lastCommand		= moverCommand_t.MOVER_NONE;
		
		this.acceltime = 1000.0 * this.spawnArgs.GetFloat("accel_time", "0");
		this.deceltime = 1000.0 * this.spawnArgs.GetFloat("decel_time", "0");
		this.move_time = 1000.0 * this.spawnArgs.GetFloat("move_time", "1");	// safe default value
		this.move_speed		= this.spawnArgs.GetFloat( "move_speed", "0" );

		var $damage = new R( this.damage );
		this.spawnArgs.GetFloat_R("damage", "0", $damage);
		this.damage = $damage.$;

		this.dest_position.opEquals( this.GetPhysics ( ).GetOrigin ( ) );
		this.dest_angles.opEquals( this.GetPhysics ( ).GetAxis ( ).ToAngles ( ) );
		
		this.physicsObj.SetSelf(this);
		this.physicsObj.SetClipModel(new idClipModel(this.GetPhysics().GetClipModel()), 1.0);
		this.physicsObj.SetOrigin(this.GetPhysics().GetOrigin());
		this.physicsObj.SetAxis(this.GetPhysics().GetAxis());
		this.physicsObj.SetClipMask( MASK_SOLID );
		if ( !this.spawnArgs.GetBool( "solid", "1" ) ) {
			this.physicsObj.SetContents( 0 );
		}
		if ( !this.renderEntity.hModel || !this.spawnArgs.GetBool( "nopush" ) ) {
			this.physicsObj.SetPusher( 0 );
		}
		this.physicsObj.SetLinearExtrapolation( extrapolation_t.EXTRAPOLATION_NONE, 0, 0, this.dest_position, vec3_origin, vec3_origin );
		this.physicsObj.SetAngularExtrapolation(extrapolation_t.EXTRAPOLATION_NONE, 0, 0, this.dest_angles, ang_zero, ang_zero );
		this.SetPhysics( this.physicsObj );
		
		// see if we are on an areaportal
		this.areaPortal = gameRenderWorld.FindPortal( this.GetPhysics().GetAbsBounds() );
		
		if ( this.spawnArgs.MatchPrefix( "guiTarget" ) ) {
			if (gameLocal.GameState() == gameState_t.GAMESTATE_STARTUP ) {
				this.PostEventMS( EV_FindGuiTargets, 0 );
			} else {
				// not during spawn, so it's ok to get the targets
				this.FindGuiTargets();
			}
		}
		
		this.health = this.spawnArgs.GetInt( "health" );
		if ( this.health ) {
			this.fl.takedamage = true;
		}
		
	}
////
/////*
////================
////idMover::Hide
////================
////*/
////void idMover::Hide( ) {
////	idEntity::Hide();
////	this.physicsObj.SetContents( 0 );
////}
////
/////*
////================
////idMover::Show
////================
////*/
////void idMover::Show( ) {
////	idEntity::Show();
////	if ( this.spawnArgs.GetBool( "solid", "1" ) ) {
////		this.physicsObj.SetContents( CONTENTS_SOLID );
////	}
////	this.SetPhysics( &this.physicsObj );
////}
////
/////*
////============
////idMover::Killed
////============
////*/
////void idMover::Killed( idEntity *inflictor, idEntity *attacker, int damage, const idVec3 &dir, int location ) {
////	fl.takedamage = false;
////	ActivateTargets( this );
////}
////
////
/////*
////================
////idMover::Event_SetCallback
////================
////*/
////void idMover::Event_SetCallback( ) {
////	if ( ( lastCommand == moverCommand_t.MOVER_ROTATING ) && !this.rotate_thread ) {
////		lastCommand	= moverCommand_t.MOVER_NONE;
////		this.rotate_thread = idThread::CurrentThreadNum();
////		idThread::ReturnInt( true );
////	} else if ( ( lastCommand == moverCommand_t.MOVER_MOVING || lastCommand == moverCommand_t.MOVER_SPLINE ) && !this.move_thread ) {
////		lastCommand	= moverCommand_t.MOVER_NONE;
////		this.move_thread = idThread::CurrentThreadNum();
////		idThread::ReturnInt( true );
////	} else {
////		idThread::ReturnInt( false );
////	}
////}
////
/////*
////================
////idMover::VectorForDir
////================
////*/
////void idMover::VectorForDir( /*float*/angle:number, vec:idVec3 ) {
////	idAngles ang;
////
////	switch( ( int )angle ) {
////	case DIR_UP :
////		vec.Set( 0, 0, 1 );
////		break;
////
////	case DIR_DOWN :
////		vec.Set( 0, 0, -1 );
////		break;
////
////	case DIR_LEFT :
////		this.physicsObj.GetLocalAngles( ang );
////		ang.pitch	= 0;
////		ang.roll	= 0;
////		ang.yaw		+= 90;
////		vec			= ang.ToForward();
////		break;
////
////	case DIR_RIGHT :
////		this.physicsObj.GetLocalAngles( ang );
////		ang.pitch	= 0;
////		ang.roll	= 0;
////		ang.yaw		-= 90;
////		vec			= ang.ToForward();
////		break;
////
////	case DIR_FORWARD :
////		this.physicsObj.GetLocalAngles( ang );
////		ang.pitch	= 0;
////		ang.roll	= 0;
////		vec			= ang.ToForward();
////		break;
////
////	case DIR_BACK :
////		this.physicsObj.GetLocalAngles( ang );
////		ang.pitch	= 0;
////		ang.roll	= 0;
////		ang.yaw		+= 180;
////		vec			= ang.ToForward();
////		break;
////
////	case DIR_REL_UP :
////		vec.Set( 0, 0, 1 );
////		break;
////
////	case DIR_REL_DOWN :
////		vec.Set( 0, 0, -1 );
////		break;
////
////	case DIR_REL_LEFT :
////		this.physicsObj.GetLocalAngles( ang );
////		ang.ToVectors( NULL, &vec );
////		vec *= -1;
////		break;
////
////	case DIR_REL_RIGHT :
////		this.physicsObj.GetLocalAngles( ang );
////		ang.ToVectors( NULL, &vec );
////		break;
////
////	case DIR_REL_FORWARD :
////		this.physicsObj.GetLocalAngles( ang );
////		vec = ang.ToForward();
////		break;
////
////	case DIR_REL_BACK :
////		this.physicsObj.GetLocalAngles( ang );
////		vec = ang.ToForward() * -1;
////		break;
////
////	default:
////		ang.Set( 0, angle, 0 );
////		vec = GetWorldVector( ang.ToForward() );
////		break;
////	}
////}
////
/*
================
idMover::FindGuiTargets
================
*/
FindGuiTargets( ) :void{
   	gameLocal.GetTargets( this.spawnArgs, this.guiTargets, "guiTarget" );
}

/////*
////==============================
////idMover::SetGuiState
////
////key/val will be set to any renderEntity.gui's on the list
////==============================
////*/
////void idMover::SetGuiState( const char *key, const char *val ) const {
////	gameLocal.Printf( "Setting %s to %s\n", key, val );
////	for( int i = 0; i < this.guiTargets.Num(); i++ ) {
////		var ent:idEntity = this.guiTargets[ i ].GetEntity();
////		if ( ent ) {
////			for ( int j = 0; j < MAX_RENDERENTITY_GUI; j++ ) {
////				if ( ent.GetRenderEntity() && ent.GetRenderEntity().gui[ j ] ) {
////					ent.GetRenderEntity().gui[ j ].SetStateString( key, val );
////					ent.GetRenderEntity().gui[ j ].StateChanged( gameLocal.time, true );
////				}
////			}
////			ent.UpdateVisuals();
////		}
////	}
////}
////
/////*
////================
////idMover::Event_InitGuiTargets
////================
////*/
////void idMover::Event_FindGuiTargets( ) {
////	FindGuiTargets();
////}
////
/////*
////================
////idMover::SetGuiStates
////================
////*/
////void idMover::SetGuiStates( const char *state ) {
////	var/*int*/i:number;
////	if ( this.guiTargets.Num() ) {
////		SetGuiState( "movestate", state );
////	}
////	for ( i = 0; i < MAX_RENDERENTITY_GUI; i++ ) {
////		if ( this.renderEntity.gui[ i ] ) {
////			this.renderEntity.gui[ i ].SetStateString( "movestate", state );
////			this.renderEntity.gui[ i ].StateChanged( gameLocal.time, true );
////		}
////	}
////}
////
/////*
////================
////idMover::Event_InitGuiTargets
////================
////*/
////void idMover::Event_InitGuiTargets( ) {
////	SetGuiStates( guiBinaryMoverStates[moverCommand_t.MOVER_POS1] );
////}
////
/////***********************************************************************
////
////	Translation control functions
////	
////***********************************************************************/
////
/////*
////================
////idMover::Event_StopMoving
////================
////*/
////void idMover::Event_StopMoving( ) {
////	this.physicsObj.GetLocalOrigin( this.dest_position );
////	DoneMoving();
////}
////
/////*
////================
////idMover::DoneMoving
////================
////*/
////void idMover::DoneMoving( ) {
////
////	if ( lastCommand != moverCommand_t.MOVER_SPLINE ) {
////		// set our final position so that we get rid of any numerical inaccuracy
////		this.physicsObj.SetLinearExtrapolation( EXTRAPOLATION_NONE, 0, 0, this.dest_position, vec3_origin, vec3_origin );
////	}
////
////	lastCommand	= moverCommand_t.MOVER_NONE;
////	idThread::ObjectMoveDone( this.move_thread, this );
////	this.move_thread = 0;
////
////	StopSound( SND_CHANNEL_BODY, false );
////}
////
/////*
////================
////idMover::UpdateMoveSound
////================
////*/
////void idMover::UpdateMoveSound( moveStage_t stage ) {
////	switch( stage ) {
////		case ACCELERATION_STAGE: {
////			StartSound( "snd_accel", SND_CHANNEL_BODY2, 0, false, NULL );
////			StartSound( "snd_move", SND_CHANNEL_BODY, 0, false, NULL );
////			break;
////		}
////		case LINEAR_STAGE: {
////			StartSound( "snd_move", SND_CHANNEL_BODY, 0, false, NULL );
////			break;
////		}
////		case DECELERATION_STAGE: {
////			StopSound( SND_CHANNEL_BODY, false );
////			StartSound( "snd_decel", SND_CHANNEL_BODY2, 0, false, NULL );
////			break;
////		}
////		case FINISHED_STAGE: {
////			StopSound( SND_CHANNEL_BODY, false );
////			break;
////		}
////	}
////}
////
/////*
////================
////idMover::Event_UpdateMove
////================
////*/
////void idMover::Event_UpdateMove( ) {
////	idVec3	org;
////
////	this.physicsObj.GetLocalOrigin( org );
////
////	UpdateMoveSound( move.stage );
////
////	switch( move.stage ) {
////		case ACCELERATION_STAGE: {
////			this.physicsObj.SetLinearExtrapolation( EXTRAPOLATION_ACCELLINEAR, gameLocal.time, move.acceleration, org, move.dir, vec3_origin );
////			if ( move.movetime > 0 ) {
////				move.stage = LINEAR_STAGE;
////			} else if ( move.deceleration > 0 ) {
////				move.stage = DECELERATION_STAGE;
////			} else {
////				move.stage = FINISHED_STAGE;
////			}
////			break;
////		}
////		case LINEAR_STAGE: {
////			this.physicsObj.SetLinearExtrapolation( EXTRAPOLATION_LINEAR, gameLocal.time, move.movetime, org, move.dir, vec3_origin );
////			if ( move.deceleration ) {
////				move.stage = DECELERATION_STAGE;
////			} else {
////				move.stage = FINISHED_STAGE;
////			}
////			break;
////		}
////		case DECELERATION_STAGE: {
////			this.physicsObj.SetLinearExtrapolation( EXTRAPOLATION_DECELLINEAR, gameLocal.time, move.deceleration, org, move.dir, vec3_origin );
////			move.stage = FINISHED_STAGE;
////			break;
////		}
////		case FINISHED_STAGE: {
////			if ( g_debugMover.GetBool() ) {
////				gameLocal.Printf( "%d: '%s' move done\n", gameLocal.time, name.c_str() );
////			}
////			DoneMoving();
////			break;
////		}
////	}
////}
////
/////*
////================
////idMover::BeginMove
////================
////*/
////void idMover::BeginMove( idThread *thread ) {
////	moveStage_t stage;
////	idVec3		org;
////	float		dist;
////	float		acceldist;
////	int			totalacceltime;
////	int			at;
////	int			dt;
////
////	lastCommand	= moverCommand_t.MOVER_MOVING;
////	this.move_thread = 0;
////
////	this.physicsObj.GetLocalOrigin( org );
////
////	move_delta = this.dest_position - org;
////	if ( move_delta.Compare( vec3_zero ) ) {
////		DoneMoving();
////		return;
////	}
////
////	// scale times up to whole physics frames
////	at = idPhysics::SnapTimeToPhysicsFrame( acceltime );
////	move_time += at - acceltime;
////	acceltime = at;
////	dt = idPhysics::SnapTimeToPhysicsFrame( deceltime );
////	move_time += dt - deceltime;
////	deceltime = dt;
////
////	// if we're moving at a specific speed, we need to calculate the move time
////	if ( move_speed ) {
////		dist = move_delta.Length();
////
////		totalacceltime = acceltime + deceltime;
////
////		// calculate the distance we'll move during acceleration and deceleration
////		acceldist = totalacceltime * 0.5f * 0.001f * move_speed;
////		if ( acceldist >= dist ) {
////			// going too slow for this distance to move at a constant speed
////			move_time = totalacceltime;
////		} else {
////			// calculate move time taking acceleration into account
////			move_time = totalacceltime + 1000.0 * ( dist - acceldist ) / move_speed;
////		}
////	}
////
////	// scale time up to a whole physics frames
////	move_time = idPhysics::SnapTimeToPhysicsFrame( move_time );
////
////	if ( acceltime ) {
////		stage = ACCELERATION_STAGE;
////	} else if ( move_time <= deceltime ) {
////		stage = DECELERATION_STAGE;
////	} else {
////		stage = LINEAR_STAGE;
////	}
////
////	at = acceltime;
////	dt = deceltime;
////
////	if ( at + dt > move_time ) {
////		// there's no real correct way to handle this, so we just scale
////		// the times to fit into the move time in the same proportions
////		at = idPhysics::SnapTimeToPhysicsFrame( at * move_time / ( at + dt ) );
////		dt = move_time - at;
////	}
////
////	move_delta = move_delta * ( 1000.0 / ( (float) move_time - ( at + dt ) * 0.5f ) );
////
////	move.stage			= stage;
////	move.acceleration	= at;
////	move.movetime		= move_time - at - dt;
////	move.deceleration	= dt;
////	move.dir			= move_delta;
////
////	ProcessEvent( &EV_ReachedPos );
////}
////
/////***********************************************************************
////
////	Rotation control functions
////	
////***********************************************************************/
////
/////*
////================
////idMover::Event_StopRotating
////================
////*/
////void idMover::Event_StopRotating( ) {
////	this.physicsObj.GetLocalAngles( this.dest_angles );
////	this.physicsObj.SetAngularExtrapolation( EXTRAPOLATION_NONE, 0, 0, this.dest_angles, ang_zero, ang_zero );
////	DoneRotating();
////}
////
/////*
////================
////idMover::DoneRotating
////================
////*/
////void idMover::DoneRotating( ) {
////	lastCommand	= moverCommand_t.MOVER_NONE;
////	idThread::ObjectMoveDone( this.rotate_thread, this );
////	this.rotate_thread = 0;
////
////	StopSound( SND_CHANNEL_BODY, false );
////}
////
/////*
////================
////idMover::UpdateRotationSound
////================
////*/
////void idMover::UpdateRotationSound( moveStage_t stage ) {
////	switch( stage ) {
////		case ACCELERATION_STAGE: {
////			StartSound( "snd_accel", SND_CHANNEL_BODY2, 0, false, NULL );
////			StartSound( "snd_move", SND_CHANNEL_BODY, 0, false, NULL );
////			break;
////		}
////		case LINEAR_STAGE: {
////			StartSound( "snd_move", SND_CHANNEL_BODY, 0, false, NULL );
////			break;
////		}
////		case DECELERATION_STAGE: {
////			StopSound( SND_CHANNEL_BODY, false );
////			StartSound( "snd_decel", SND_CHANNEL_BODY2, 0, false, NULL );
////			break;
////		}
////		case FINISHED_STAGE: {
////			StopSound( SND_CHANNEL_BODY, false );
////			break;
////		}
////	}
////}
////
/////*
////================
////idMover::Event_UpdateRotation
////================
////*/
////void idMover::Event_UpdateRotation( ) {
////	idAngles	ang;
////
////	this.physicsObj.GetLocalAngles( ang );
////
////	UpdateRotationSound( rot.stage );
////
////	switch( rot.stage ) {
////		case ACCELERATION_STAGE: {
////			this.physicsObj.SetAngularExtrapolation( EXTRAPOLATION_ACCELLINEAR, gameLocal.time, rot.acceleration, ang, rot.rot, ang_zero );
////			if ( rot.movetime > 0 ) {
////				rot.stage = LINEAR_STAGE;
////			} else if ( rot.deceleration > 0 ) {
////				rot.stage = DECELERATION_STAGE;
////			} else {
////				rot.stage = FINISHED_STAGE;
////			}
////			break;
////		}
////		case LINEAR_STAGE: {
////			if ( !this.stopRotation && !rot.deceleration ) {
////				this.physicsObj.SetAngularExtrapolation( extrapolation_t(EXTRAPOLATION_LINEAR|EXTRAPOLATION_NOSTOP), gameLocal.time, rot.movetime, ang, rot.rot, ang_zero );
////			} else {
////				this.physicsObj.SetAngularExtrapolation( EXTRAPOLATION_LINEAR, gameLocal.time, rot.movetime, ang, rot.rot, ang_zero );
////			}
////
////			if ( rot.deceleration ) {
////				rot.stage = DECELERATION_STAGE;
////			} else {
////				rot.stage = FINISHED_STAGE;
////			}
////			break;
////		}
////		case DECELERATION_STAGE: {
////			this.physicsObj.SetAngularExtrapolation( EXTRAPOLATION_DECELLINEAR, gameLocal.time, rot.deceleration, ang, rot.rot, ang_zero );
////			rot.stage = FINISHED_STAGE;
////			break;
////		}
////		case FINISHED_STAGE: {
////			lastCommand	= moverCommand_t.MOVER_NONE;
////			if ( this.stopRotation ) {
////				// set our final angles so that we get rid of any numerical inaccuracy
////				this.dest_angles.Normalize360();
////				this.physicsObj.SetAngularExtrapolation( EXTRAPOLATION_NONE, 0, 0, this.dest_angles, ang_zero, ang_zero );
////				this.stopRotation = false;
////			} else if ( this.physicsObj.GetAngularExtrapolationType() == EXTRAPOLATION_ACCELLINEAR ) {
////				// keep our angular velocity constant
////				this.physicsObj.SetAngularExtrapolation( extrapolation_t(EXTRAPOLATION_LINEAR|EXTRAPOLATION_NOSTOP), gameLocal.time, 0, ang, rot.rot, ang_zero );
////			}
////
////			if ( g_debugMover.GetBool() ) {
////				gameLocal.Printf( "%d: '%s' rotation done\n", gameLocal.time, name.c_str() );
////			}
////
////			DoneRotating();
////			break;
////		}
////	}
////}
////
/////*
////================
////idMover::BeginRotation
////================
////*/
////void idMover::BeginRotation( idThread *thread, bool stopwhendone ) {
////	moveStage_t stage;
////	idAngles	ang;
////	int			at;
////	int			dt;
////
////	lastCommand	= moverCommand_t.MOVER_ROTATING;
////	this.rotate_thread = 0;
////
////	// rotation always uses move_time so that if a move was started before the rotation,
////	// the rotation will take the same amount of time as the move.  If no move has been
////	// started and no time is set, the rotation takes 1 second.
////	if ( !move_time ) {
////		move_time = 1;
////	}
////
////	this.physicsObj.GetLocalAngles( ang );
////	angle_delta = this.dest_angles - ang;
////	if ( angle_delta == ang_zero ) {
////		// set our final angles so that we get rid of any numerical inaccuracy
////		this.dest_angles.Normalize360();
////		this.physicsObj.SetAngularExtrapolation( EXTRAPOLATION_NONE, 0, 0, this.dest_angles, ang_zero, ang_zero );
////		this.stopRotation = false;
////		DoneRotating();
////		return;
////	}
////
////	// scale times up to whole physics frames
////	at = idPhysics::SnapTimeToPhysicsFrame( acceltime );
////	move_time += at - acceltime;
////	acceltime = at;
////	dt = idPhysics::SnapTimeToPhysicsFrame( deceltime );
////	move_time += dt - deceltime;
////	deceltime = dt;
////	move_time = idPhysics::SnapTimeToPhysicsFrame( move_time );
////
////	if ( acceltime ) {
////		stage = ACCELERATION_STAGE;
////	} else if ( move_time <= deceltime ) {
////		stage = DECELERATION_STAGE;
////	} else {
////		stage = LINEAR_STAGE;
////	}
////
////	at = acceltime;
////	dt = deceltime;
////
////	if ( at + dt > move_time ) {
////		// there's no real correct way to handle this, so we just scale
////		// the times to fit into the move time in the same proportions
////		at = idPhysics::SnapTimeToPhysicsFrame( at * move_time / ( at + dt ) );
////		dt = move_time - at;
////	}
////
////	angle_delta = angle_delta * ( 1000.0 / ( (float) move_time - ( at + dt ) * 0.5f ) );
////
////	this.stopRotation = stopwhendone || ( dt != 0 );
////
////	rot.stage			= stage;
////	rot.acceleration	= at;
////	rot.movetime		= move_time - at - dt;
////	rot.deceleration	= dt;
////	rot.rot				= angle_delta;
////
////	ProcessEvent( &EV_ReachedAng );
////}
////
////
/////***********************************************************************
////
////	Script callable routines  
////	
////***********************************************************************/
////
/////*
////===============
////idMover::Event_TeamBlocked
////===============
////*/
////void idMover::Event_TeamBlocked(blockedEntity:idEntity , blockingEntity:idEntity  ) {
////	if ( g_debugMover.GetBool() ) {
////		gameLocal.Printf( "%d: '%s' stopped due to team member '%s' blocked by '%s'\n", gameLocal.time, name.c_str(), blockedEntity.name.c_str(), blockingEntity.name.c_str() );
////	}
////}
////
/////*
////===============
////idMover::Event_PartBlocked
////===============
////*/
////void idMover::Event_PartBlocked( blockingEntity:idEntity  ) {
////	if ( damage > 0.0 ) {
////		blockingEntity.Damage( this, this, vec3_origin, "damage_moverCrush", damage, jointHandle_t.INVALID_JOINT );
////	}
////	if ( g_debugMover.GetBool() ) {
////		gameLocal.Printf( "%d: '%s' blocked by '%s'\n", gameLocal.time, name.c_str(), blockingEntity.name.c_str() );
////	}
////}
////
/////*
////================
////idMover::Event_SetMoveSpeed
////================
////*/
////void idMover::Event_SetMoveSpeed( /*float*/ speed:number ) {
////	if ( speed <= 0 ) {
////		gameLocal.Error( "Cannot set speed less than or equal to 0." );
////	}
////
////	move_speed = speed;
////	move_time = 0;			// move_time is calculated for each move when move_speed is non-0
////}
////
/////*
////================
////idMover::Event_SetMoveTime
////================
////*/
////void idMover::Event_SetMoveTime( /*float*/time:number ) {
////	if ( time <= 0 ) {
////		gameLocal.Error( "Cannot set time less than or equal to 0." );
////	}
////
////	move_speed = 0;
////	move_time = SEC2MS( time );
////}
////
/////*
////================
////idMover::Event_SetAccellerationTime
////================
////*/
////void idMover::Event_SetAccellerationTime( /*float*/time:number ) {
////	if ( time < 0 ) {
////		gameLocal.Error( "Cannot set acceleration time less than 0." );
////	}
////
////	acceltime = SEC2MS( time );
////}
////
/////*
////================
////idMover::Event_SetDecelerationTime
////================
////*/
////void idMover::Event_SetDecelerationTime( /*float*/time:number ) {
////	if ( time < 0 ) {
////		gameLocal.Error( "Cannot set deceleration time less than 0." );
////	}
////
////	deceltime = SEC2MS( time );
////}
////
/////*
////================
////idMover::Event_MoveTo
////================
////*/
////void idMover::Event_MoveTo( ent:idEntity ) {
////	if ( !ent ) {
////		gameLocal.Warning( "Entity not found" );
////	}
////
////	this.dest_position = GetLocalCoordinates( ent.GetPhysics().GetOrigin() );
////	BeginMove( idThread::CurrentThread() );
////}
////
/////*
////================
////idMover::MoveToPos
////================
////*/
////void idMover::MoveToPos( pos:idVec3 ) {
////	this.dest_position = GetLocalCoordinates( pos );
////	BeginMove( NULL );
////}
////
/////*
////================
////idMover::Event_MoveToPos
////================
////*/
////void idMover::Event_MoveToPos( pos:idVec3 ) {
////	MoveToPos( pos );
////}
////
/////*
////================
////idMover::Event_MoveDir
////================
////*/
////void idMover::Event_MoveDir( /*float*/angle:number, float distance ) {
////	idVec3 dir;
////	idVec3 org;
////
////	this.physicsObj.GetLocalOrigin( org );
////	VectorForDir( angle, dir );
////	this.dest_position = org + dir * distance;
////
////	BeginMove( idThread::CurrentThread() );
////}
////
/////*
////================
////idMover::Event_MoveAccelerateTo
////================
////*/
////void idMover::Event_MoveAccelerateTo( /*float*/ speed:number, /*float*/time:number ) {
////	float v;
////	idVec3 org, dir;
////	int at;
////
////	if ( time < 0 ) {
////		gameLocal.Error( "idMover::Event_MoveAccelerateTo: cannot set acceleration time less than 0." );
////	}
////
////	dir = this.physicsObj.GetLinearVelocity();
////	v = dir.Normalize();
////
////	// if not moving already
////	if ( v == 0.0 ) {
////		gameLocal.Error( "idMover::Event_MoveAccelerateTo: not moving." );
////	}
////
////	// if already moving faster than the desired speed
////	if ( v >= speed ) {
////		return;
////	}
////
////	at = idPhysics::SnapTimeToPhysicsFrame( SEC2MS( time ) );
////
////	lastCommand	= moverCommand_t.MOVER_MOVING;
////
////	this.physicsObj.GetLocalOrigin( org );
////
////	move.stage			= ACCELERATION_STAGE;
////	move.acceleration	= at;
////	move.movetime		= 0;
////	move.deceleration	= 0;
////
////	StartSound( "snd_accel", SND_CHANNEL_BODY2, 0, false, NULL );
////	StartSound( "snd_move", SND_CHANNEL_BODY, 0, false, NULL );
////	this.physicsObj.SetLinearExtrapolation( EXTRAPOLATION_ACCELLINEAR, gameLocal.time, move.acceleration, org, dir * ( speed - v ), dir * v );
////}
////
/////*
////================
////idMover::Event_MoveDecelerateTo
////================
////*/
////void idMover::Event_MoveDecelerateTo( /*float*/ speed:number, /*float*/time:number ) {
////	float v;
////	idVec3 org, dir;
////	int dt;
////
////	if ( time < 0 ) {
////		gameLocal.Error( "idMover::Event_MoveDecelerateTo: cannot set deceleration time less than 0." );
////	}
////
////	dir = this.physicsObj.GetLinearVelocity();
////	v = dir.Normalize();
////
////	// if not moving already
////	if ( v == 0.0 ) {
////		gameLocal.Error( "idMover::Event_MoveDecelerateTo: not moving." );
////	}
////
////	// if already moving slower than the desired speed
////	if ( v <= speed ) {
////		return;
////	}
////
////	dt = idPhysics::SnapTimeToPhysicsFrame( SEC2MS( time ) );
////
////	lastCommand	= moverCommand_t.MOVER_MOVING;
////
////	this.physicsObj.GetLocalOrigin( org );
////
////	move.stage			= DECELERATION_STAGE;
////	move.acceleration	= 0;
////	move.movetime		= 0;
////	move.deceleration	= dt;
////
////	StartSound( "snd_decel", SND_CHANNEL_BODY2, 0, false, NULL );
////	StartSound( "snd_move", SND_CHANNEL_BODY, 0, false, NULL );
////	this.physicsObj.SetLinearExtrapolation( EXTRAPOLATION_DECELLINEAR, gameLocal.time, move.deceleration, org, dir * ( v - speed ), dir * speed );
////}
////
/////*
////================
////idMover::Event_RotateDownTo
////================
////*/
////void idMover::Event_RotateDownTo( /*int*/axis:number, /*float*/angle:number ) {
////	idAngles ang;
////
////	if ( ( axis < 0 ) || ( axis > 2 ) ) {
////		gameLocal.Error( "Invalid axis" );
////	}
////
////	this.physicsObj.GetLocalAngles( ang );
////
////	this.dest_angles[ axis ] = angle;
////	if ( this.dest_angles[ axis ] > ang[ axis ] ) {
////		this.dest_angles[ axis ] -= 360;
////	}
////
////	BeginRotation( idThread::CurrentThread(), true );
////}
////
/////*
////================
////idMover::Event_RotateUpTo
////================
////*/
////void idMover::Event_RotateUpTo( /*int*/axis:number, /*float*/angle:number ) {
////	idAngles ang;
////
////	if ( ( axis < 0 ) || ( axis > 2 ) ) {
////		gameLocal.Error( "Invalid axis" );
////	}
////
////	this.physicsObj.GetLocalAngles( ang );
////
////	this.dest_angles[ axis ] = angle;
////	if ( this.dest_angles[ axis ] < ang[ axis ] ) {
////		this.dest_angles[ axis ] += 360;
////	}
////
////	BeginRotation( idThread::CurrentThread(), true );
////}
////
/////*
////================
////idMover::Event_RotateTo
////================
////*/
////void idMover::Event_RotateTo( angles:idAngles ) {
////	this.dest_angles = angles;
////	BeginRotation( idThread::CurrentThread(), true );
////}
////
/////*
////================
////idMover::Event_Rotate
////================
////*/
////void idMover::Event_Rotate( angles:idAngles ) {
////	idAngles ang;
////
////	if ( this.rotate_thread ) {
////		DoneRotating();
////	}
////
////	this.physicsObj.GetLocalAngles( ang );
////	this.dest_angles = ang + angles * ( move_time - ( acceltime + deceltime ) / 2 ) * 0.001f;
////
////	BeginRotation( idThread::CurrentThread(), false );
////}
////
/////*
////================
////idMover::Event_RotateOnce
////================
////*/
////void idMover::Event_RotateOnce( angles:idAngles ) {
////	idAngles ang;
////
////	if ( this.rotate_thread ) {
////		DoneRotating();
////	}
////
////	this.physicsObj.GetLocalAngles( ang );
////	this.dest_angles = ang + angles;
////
////	BeginRotation( idThread::CurrentThread(), true );
////}
////
/////*
////================
////idMover::Event_Bob
////================
////*/
////void idMover::Event_Bob( /*float*/ speed:number, float phase, idVec3 &depth ) {
////	idVec3 org;
////
////	this.physicsObj.GetLocalOrigin( org );
////	this.physicsObj.SetLinearExtrapolation( extrapolation_t(EXTRAPOLATION_DECELSINE|EXTRAPOLATION_NOSTOP), speed * 1000 * phase, speed * 500, org, depth * 2.0, vec3_origin );
////}
////
/////*
////================
////idMover::Event_Sway
////================
////*/
////void idMover::Event_Sway( /*float*/ speed:number, float phase, idAngles &depth ) {
////	idAngles ang, angSpeed;
////	float duration;
////
////	this.physicsObj.GetLocalAngles( ang );
////	assert ( speed > 0.0 );
////	duration = idMath::Sqrt( depth[0] * depth[0] + depth[1] * depth[1] + depth[2] * depth[2] ) / speed;
////	angSpeed = depth / ( duration * idMath::SQRT_1OVER2 );
////	this.physicsObj.SetAngularExtrapolation( extrapolation_t(EXTRAPOLATION_DECELSINE|EXTRAPOLATION_NOSTOP), duration * 1000.0 * phase, duration * 1000.0, ang, angSpeed, ang_zero );
////}
////
/////*
////================
////idMover::Event_OpenPortal
////
////Sets the portal associtated with this mover to be open
////================
////*/
////void idMover::Event_OpenPortal( ) {
////	if ( this.areaPortal ) {
////		SetPortalState( true );
////	}
////}
////
/////*
////================
////idMover::Event_ClosePortal
////
////Sets the portal associtated with this mover to be closed
////================
////*/
////void idMover::Event_ClosePortal( ) {
////	if ( this.areaPortal ) {
////		SetPortalState( false );
////	}
////}
////
/////*
////================
////idMover::Event_SetAccelSound
////================
////*/
////void idMover::Event_SetAccelSound( sound:string ) {
//////	refSound.SetSound( "accel", sound );
////}
////
/////*
////================
////idMover::Event_SetDecelSound
////================
////*/
////void idMover::Event_SetDecelSound( sound:string ) {
//////	refSound.SetSound( "decel", sound );
////}
////
/////*
////================
////idMover::Event_SetMoveSound
////================
////*/
////void idMover::Event_SetMoveSound( sound:string ) {
//////	refSound.SetSound( "move", sound );
////}
////
/////*
////================
////idMover::Event_EnableSplineAngles
////================
////*/
////void idMover::Event_EnableSplineAngles( ) {
////	useSplineAngles = true;
////}
////
/////*
////================
////idMover::Event_DisableSplineAngles
////================
////*/
////void idMover::Event_DisableSplineAngles( ) {
////	useSplineAngles = false;
////}
////
/////*
////================
////idMover::Event_RemoveInitialSplineAngles
////================
////*/
////void idMover::Event_RemoveInitialSplineAngles( ) {
////	idCurve_Spline<idVec3> *spline;
////	idAngles ang;
////
////	spline = this.physicsObj.GetSpline();
////	if ( !spline ) {
////		return;
////	}
////	ang = spline.GetCurrentFirstDerivative( 0 ).ToAngles();
////	this.physicsObj.SetAngularExtrapolation( EXTRAPOLATION_NONE, 0, 0, -ang, ang_zero, ang_zero );
////}
////
/////*
////================
////idMover::Event_StartSpline
////================
////*/
////void idMover::Event_StartSpline( idEntity *splineEntity ) {
////	idCurve_Spline<idVec3> *spline;
////
////	if ( !splineEntity ) {
////		return;
////	}
////
////	// Needed for savegames
////	splineEnt = splineEntity;
////
////	spline = splineEntity.GetSpline();
////	if ( !spline ) {
////		return;
////	}
////
////	lastCommand = moverCommand_t.MOVER_SPLINE;
////	this.move_thread = 0;
////
////	if ( acceltime + deceltime > move_time ) {
////		acceltime = move_time / 2;
////		deceltime = move_time - acceltime;
////	}
////	move.stage			= FINISHED_STAGE;
////	move.acceleration	= acceltime;
////	move.movetime		= move_time;
////	move.deceleration	= deceltime;
////
////	spline.MakeUniform( move_time );
////	spline.ShiftTime( gameLocal.time - spline.GetTime( 0 ) );
////
////	this.physicsObj.SetSpline( spline, move.acceleration, move.deceleration, useSplineAngles );
////	this.physicsObj.SetLinearExtrapolation( EXTRAPOLATION_NONE, 0, 0, this.dest_position, vec3_origin, vec3_origin );
////}
////
/////*
////================
////idMover::Event_StopSpline
////================
////*/
////void idMover::Event_StopSpline( ) {
////	this.physicsObj.SetSpline( NULL, 0, 0, useSplineAngles );
////	splineEnt = NULL;
////}
////
/////*
////================
////idMover::Event_Activate
////================
////*/
////void idMover::Event_Activate( activator:idEntity ) {
////	Show();
////	Event_StartSpline( this );
////}
////
/////*
////================
////idMover::Event_IsMoving
////================
////*/
////void idMover::Event_IsMoving( ) {
////	if ( this.physicsObj.GetLinearExtrapolationType() == EXTRAPOLATION_NONE ) {
////		idThread::ReturnInt( false );
////	} else {
////		idThread::ReturnInt( true );
////	}
////}
////
/////*
////================
////idMover::Event_IsRotating
////================
////*/
////void idMover::Event_IsRotating( ) {
////	if ( this.physicsObj.GetAngularExtrapolationType() == EXTRAPOLATION_NONE ) {
////		idThread::ReturnInt( false );
////	} else {
////		idThread::ReturnInt( true );
////	}
////}
////
/////*
////================
////idMover::WriteToSnapshot
////================
////*/
////void idMover::WriteToSnapshot( idBitMsgDelta &msg ) const {
////	this.physicsObj.WriteToSnapshot( msg );
////	msg.WriteBits( move.stage, 3 );
////	msg.WriteBits( rot.stage, 3 );
////	WriteBindToSnapshot( msg );
////	WriteGUIToSnapshot( msg );
////}
////
/////*
////================
////idMover::ReadFromSnapshot
////================
////*/
////void idMover::ReadFromSnapshot( const idBitMsgDelta &msg ) {
////	moveStage_t oldMoveStage = move.stage;
////	moveStage_t oldRotStage = rot.stage;
////
////	this.physicsObj.ReadFromSnapshot( msg );
////	move.stage = (moveStage_t) msg.ReadBits( 3 );
////	rot.stage = (moveStage_t) msg.ReadBits( 3 );
////	ReadBindFromSnapshot( msg );
////	ReadGUIFromSnapshot( msg );
////
////	if ( msg.HasChanged() ) {
////		if ( move.stage != oldMoveStage ) {
////			UpdateMoveSound( oldMoveStage );
////		}
////		if ( rot.stage != oldRotStage ) {
////			UpdateRotationSound( oldRotStage );
////		}
////		UpdateVisuals();
////	}
////}
////
/////*
////================
////idMover::SetPortalState
////================
////*/
////void idMover::SetPortalState( bool open ) {
////	assert( this.areaPortal );
////	gameLocal.SetPortalState( this.areaPortal, open ? PS_BLOCK_NONE : PS_BLOCK_ALL );
////}
////
};

class idSplinePath extends idEntity {
////public:
////	CLASS_PROTOTYPE( idSplinePath );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idSplinePath>[];

////							idSplinePath();


	////
	/////*
	////================
	////idSplinePath::idSplinePath
	////================
	////*/
	////idSplinePath::idSplinePath() {
	////}
	////
	/////*
	////================
	////idSplinePath::Spawn
	////================
	////*/
	Spawn ( ): void {

	}
////
////
}


////struct floorInfo_s {
////	idVec3					pos;
////	idStr					door;
////	int						floor;
////};

class idElevator extends idMover {
////public:
////	CLASS_PROTOTYPE( idElevator );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idElevator>[];

////							idElevator( );

////	void					Spawn();

////	void					Save( idSaveGame *savefile ) const;
////	void					Restore( idRestoreGame *savefile );

////	virtual bool			HandleSingleGuiCommand( idEntity *entityGui, idLexer *src );
	Event_GotoFloor(/*int*/ floor:number): void { throw "placeholder"; }
////	floorInfo_s *			GetFloorInfo( int floor );

////protected:
////	virtual void			DoneMoving( );
////	virtual void			BeginMove( idThread *thread = NULL );
////	void					SpawnTrigger( pos:idVec3 );
////	void					GetLocalTriggerPosition();
	Event_Touch(other: idEntity, trace: trace_t): void { throw "placeholder"; }

////private:
////	typedef enum {
////		INIT,
////		IDLE,
////		WAITING_ON_DOORS
////	} elevatorState_t;

////	elevatorState_t			state;
////	idList<floorInfo_s>		floorInfo;
////	int						currentFloor;
////	int						pendingFloor;
////	int						lastFloor;
////	bool					controlsDisabled;
////	float					returnTime;
////	int						returnFloor;
////	int						lastTouchTime;

////	class idDoor *			GetDoor( name:string );
////	void					Think( ): void {throw "placeholder";}
////	void					OpenInnerDoor( ): void {throw "placeholder";}
////	void					OpenFloorDoor( int floor );
////	void					CloseAllDoors( ): void {throw "placeholder";}
////	void					DisableAllDoors( ): void {throw "placeholder";}
////	void					EnableProperDoors( ): void {throw "placeholder";}

	Event_TeamBlocked(blockedEntity: idEntity, blockingEntity: idEntity): void { throw "placeholder"; }
	Event_Activate(activator: idEntity): void { throw "placeholder"; }
	Event_PostFloorArrival(): void { throw "placeholder"; }


	/////*
	////================
	////idElevator::idElevator
	////================
	////*/
	////idElevator::idElevator( ) {
	////	state = INIT;
	////	floorInfo.Clear();
	////	currentFloor = 0;
	////	pendingFloor = 0;
	////	lastFloor = 0;
	////	controlsDisabled = false;
	////	lastTouchTime = 0;
	////	returnFloor = 0;
	////	returnTime = 0;
	////}
	////
	/////*
	////================
	////idElevator::Save
	////================
	////*/
	////void idElevator::Save( idSaveGame *savefile ) const {
	////	var/*int*/i:number;
	////
	////	savefile.WriteInt( (int)state );
	////
	////	savefile.WriteInt( floorInfo.Num() );
	////	for ( i = 0; i < floorInfo.Num(); i++ ) {
	////		savefile.WriteVec3( floorInfo[ i ].pos );
	////		savefile.WriteString( floorInfo[ i ].door );
	////		savefile.WriteInt( floorInfo[ i ].floor );
	////	}
	////
	////	savefile.WriteInt( currentFloor );
	////	savefile.WriteInt( pendingFloor );
	////	savefile.WriteInt( lastFloor );
	////	savefile.WriteBool( controlsDisabled );
	////	savefile.WriteFloat( returnTime );
	////	savefile.WriteInt( returnFloor );
	////	savefile.WriteInt( lastTouchTime );
	////}
	////
	/////*
	////================
	////idElevator::Restore
	////================
	////*/
	////void idElevator::Restore( idRestoreGame *savefile ) {
	////	int i, num;
	////
	////	savefile.ReadInt( (int &)state );
	////
	////	savefile.ReadInt( num );
	////	for ( i = 0; i < num; i++ ) {
	////		floorInfo_s floor;
	////
	////		savefile.ReadVec3( floor.pos );
	////		savefile.ReadString( floor.door );
	////		savefile.ReadInt( floor.floor );
	////
	////		floorInfo.Append( floor );
	////	}
	////
	////	savefile.ReadInt( currentFloor );
	////	savefile.ReadInt( pendingFloor );
	////	savefile.ReadInt( lastFloor );
	////	savefile.ReadBool( controlsDisabled );
	////	savefile.ReadFloat( returnTime );
	////	savefile.ReadInt( returnFloor );
	////	savefile.ReadInt( lastTouchTime );
	////}
	////
	/////*
	////================
	////idElevator::Spawn
	////================
	////*/
	Spawn(): void {
		todoThrow();
		////	idStr str;
		////	int len1;
		////
		////	lastFloor = 0;
		////	currentFloor = 0;
		////	pendingFloor = this.spawnArgs.GetInt( "floor", "1" );
		////	SetGuiStates( ( pendingFloor == 1 ) ? guiBinaryMoverStates[0] : guiBinaryMoverStates[1]);
		////
		////	returnTime = this.spawnArgs.GetFloat( "returnTime" );
		////	returnFloor = this.spawnArgs.GetInt( "returnFloor" );
		////
		////	len1 = strlen( "floorPos_" );
		////	const idKeyValue *kv = this.spawnArgs.MatchPrefix( "floorPos_", NULL );
		////	while( kv ) {
		////		str = kv.GetKey().Right( kv.GetKey().Length() - len1 );
		////		floorInfo_s fi;
		////		fi.floor = atoi( str );
		////		fi.door = this.spawnArgs.GetString( va( "floorDoor_%i", fi.floor ) );
		////		fi.pos = this.spawnArgs.GetVector( kv.GetKey() );
		////		floorInfo.Append( fi );
		////		kv = this.spawnArgs.MatchPrefix( "floorPos_", kv );
		////	}
		////	lastTouchTime = 0;
		////	state = INIT;
		////	BecomeActive( TH_THINK | TH_PHYSICS );
		////	this.PostEventMS( &EV_Mover_InitGuiTargets, 0 );
		////	controlsDisabled = false;
	}
////
/////*
////==============
////idElevator::Event_Touch
////===============
////*/
////void idElevator::Event_Touch( other:idEntity, trace:trace_t ) {
////	
////	if ( gameLocal.time < lastTouchTime + 2000 ) {
////		return;
////	}
////
////	if ( !other.IsType( idPlayer::Type ) ) {
////		return;
////	}
////
////	lastTouchTime = gameLocal.time;
////
////	if ( thinkFlags & TH_PHYSICS ) {
////		return;
////	}
////
////	int triggerFloor = this.spawnArgs.GetInt( "triggerFloor" );
////	if ( this.spawnArgs.GetBool( "trigger" ) && triggerFloor != currentFloor ) {
////		PostEventSec( &EV_GotoFloor, 0.25f, triggerFloor );
////	}
////}
////
/////*
////================
////idElevator::Think
////================
////*/
////void idElevator::Think( ) {
////	idVec3 masterOrigin;
////	idMat3 masterAxis;
////	idDoor *doorent = GetDoor( this.spawnArgs.GetString( "innerdoor" ) );
////	if ( state == INIT ) {
////		state = IDLE;
////		if ( doorent ) {
////			doorent.BindTeam( this );
////			doorent.spawnArgs.Set( "snd_open", "" );
////			doorent.spawnArgs.Set( "snd_close", "" );
////			doorent.spawnArgs.Set( "snd_opened", "" );
////		}
////		for ( int i = 0; i < floorInfo.Num(); i++ ) {
////			idDoor *door = GetDoor( floorInfo[i].door );
////			if ( door ) {
////				door.SetCompanion( doorent );
////			}
////		}
////
////		Event_GotoFloor( pendingFloor );
////		DisableAllDoors();
////		SetGuiStates( ( pendingFloor == 1 ) ? guiBinaryMoverStates[0] : guiBinaryMoverStates[1] );
////	} else if ( state == WAITING_ON_DOORS ) {
////		if ( doorent ) {
////			state = doorent.IsOpen() ? WAITING_ON_DOORS : IDLE;
////		} else {
////			state = IDLE;
////		}
////		if ( state == IDLE ) {
////			lastFloor = currentFloor;
////			currentFloor = pendingFloor;
////			floorInfo_s *fi = GetFloorInfo( currentFloor );
////			if ( fi ) {
////				MoveToPos( fi.pos );
////			}
////		}
////	} 
////	RunPhysics();
////	Present();
////}
////
/////*
////================
////idElevator::Event_Activate
////================
////*/
////void idElevator::Event_Activate( activator:idEntity ) {
////	int triggerFloor = this.spawnArgs.GetInt( "triggerFloor" );
////	if ( this.spawnArgs.GetBool( "trigger" ) && triggerFloor != currentFloor ) {
////		Event_GotoFloor( triggerFloor );
////	}
////}
////
/////*
////================
////idElevator::Event_TeamBlocked
////================
////*/
////void idElevator::Event_TeamBlocked(blockedEntity:idEntity , blockingEntity:idEntity  ) {
////	if ( blockedEntity == this ) {
////		Event_GotoFloor( lastFloor );
////	} else if ( blockedEntity && blockedEntity.IsType( idDoor::Type ) ) {
////		// open the inner doors if one is blocked
////		idDoor *blocked = static_cast<idDoor *>( blockedEntity );
////		idDoor *door = GetDoor( this.spawnArgs.GetString( "innerdoor" ) );
////		if ( door && blocked.GetMoveMaster() == door.GetMoveMaster() ) {
////			door.SetBlocked(true);
////			OpenInnerDoor();
////			OpenFloorDoor( currentFloor );
////		}
////	}
////}
////
////
/////*
////===============
////idElevator::HandleSingleGuiCommand
////===============
////*/
////bool idElevator::HandleSingleGuiCommand( idEntity *entityGui, idLexer *src ) {
////	idToken token;
////
////	if ( controlsDisabled ) {
////		return false;
////	}
////
////	if ( !src.ReadToken( &token ) ) {
////		return false;
////	}
////
////	if ( token == ";" ) {
////		return false;
////	}
////
////	if ( token.Icmp( "changefloor" ) == 0 ) {
////		if ( src.ReadToken( &token ) ) {
////			int newFloor = atoi( token );
////			if ( newFloor == currentFloor ) {
////				// open currentFloor and interior doors
////				OpenInnerDoor();
////				OpenFloorDoor( currentFloor );
////			} else {
////				idDoor *door = GetDoor( this.spawnArgs.GetString( "innerdoor" ) );
////				if ( door && door.IsOpen() ) {
////					PostEventSec( &EV_GotoFloor, 0.5f, newFloor );
////				} else {
////					ProcessEvent( &EV_GotoFloor, newFloor );
////				}
////			}
////			return true;
////		}
////	}
////
////	src.UnreadToken( &token );
////	return false;
////}
////
/////*
////================
////idElevator::OpenFloorDoor
////================
////*/
////void idElevator::OpenFloorDoor( int floor ) {
////	floorInfo_s *fi = GetFloorInfo( floor );
////	if ( fi ) {
////		idDoor *door = GetDoor( fi.door );
////		if ( door ) {
////			door.Open();
////		}
////	}
////}
////
/////*
////================
////idElevator::OpenInnerDoor
////================
////*/
////void idElevator::OpenInnerDoor( ) {
////	idDoor *door = GetDoor( this.spawnArgs.GetString( "innerdoor" ) );
////	if ( door ) {
////		door.Open();
////	}
////}
////
/////*
////================
////idElevator::GetFloorInfo
////================
////*/
////floorInfo_s *idElevator::GetFloorInfo( int floor ) {
////	for ( int i = 0; i < floorInfo.Num(); i++ ) {
////		if ( floorInfo[i].floor == floor ) {
////			return &floorInfo[i];
////		}
////	}
////	return NULL;
////}
////
/////*
////================
////idElevator::Event_GotoFloor
////================
////*/
////void idElevator::Event_GotoFloor( int floor ) {
////	floorInfo_s *fi = GetFloorInfo( floor );
////	if ( fi ) {
////		idDoor *door = GetDoor( this.spawnArgs.GetString( "innerdoor" ) );
////		if ( door ) {
////			if ( door.IsBlocked() || door.IsOpen() ) {
////				PostEventSec( &EV_GotoFloor, 0.5f, floor );
////				return;
////			}
////		}
////		DisableAllDoors();
////		CloseAllDoors();
////		state = WAITING_ON_DOORS;
////		pendingFloor = floor;
////	}
////}
////
/////*
////================
////idElevator::BeginMove
////================
////*/
////void idElevator::BeginMove( idThread *thread ) {
////	controlsDisabled = true;
////	CloseAllDoors();
////	DisableAllDoors();
////	const idKeyValue *kv = this.spawnArgs.MatchPrefix( "statusGui" );
////	while( kv ) {
////		var ent:idEntity = gameLocal.FindEntity( kv.GetValue() );
////		if ( ent ) {
////			for ( int j = 0; j < MAX_RENDERENTITY_GUI; j++ ) {
////				if ( ent.GetRenderEntity() && ent.GetRenderEntity().gui[ j ] ) {
////					ent.GetRenderEntity().gui[ j ].SetStateString( "floor", "" );
////					ent.GetRenderEntity().gui[ j ].StateChanged( gameLocal.time, true );
////				}
////			}
////			ent.UpdateVisuals();
////		}
////		kv = this.spawnArgs.MatchPrefix( "statusGui", kv );
////	}
////	SetGuiStates( ( pendingFloor == 1 ) ? guiBinaryMoverStates[3] : guiBinaryMoverStates[2] );
////	idMover::BeginMove( thread );
////}
////
/////*
////================
////idElevator::GetDoor
////================
////*/
////idDoor *idElevator::GetDoor( name:string ) {
////	idEntity	*ent;
////	idEntity	*master;
////	idDoor		*doorEnt;
////
////	doorEnt = NULL;
////	if ( name && *name ) {
////		ent = gameLocal.FindEntity( name );
////		if ( ent && ent.IsType( idDoor::Type ) ) {
////			doorEnt = static_cast<idDoor*>( ent );
////			master = doorEnt.GetMoveMaster();
////			if ( master != doorEnt ) {
////				if ( master.IsType( idDoor::Type ) ) {
////					doorEnt = static_cast<idDoor*>( master );
////				} else {
////					doorEnt = NULL;
////				}
////			}
////		}
////	}
////
////	return doorEnt;
////}
////
/////*
////================
////idElevator::Event_PostFloorArrival
////================
////*/
////void idElevator::Event_PostFloorArrival() {
////	OpenFloorDoor( currentFloor );
////	OpenInnerDoor();
////	SetGuiStates( ( currentFloor == 1 ) ? guiBinaryMoverStates[0] : guiBinaryMoverStates[1] );
////	controlsDisabled = false;
////	if ( returnTime > 0.0 && returnFloor != currentFloor ) {
////		PostEventSec( &EV_GotoFloor, returnTime, returnFloor );
////	}
////}
////
/////*
////================
////idElevator::DoneMoving
////================
////*/
////void idElevator::DoneMoving( ) {
////	idMover::DoneMoving();
////	EnableProperDoors();
////	const idKeyValue *kv = this.spawnArgs.MatchPrefix( "statusGui" );
////	while( kv ) {
////		var ent:idEntity = gameLocal.FindEntity( kv.GetValue() );
////		if ( ent ) {
////			for ( int j = 0; j < MAX_RENDERENTITY_GUI; j++ ) {
////				if ( ent.GetRenderEntity() && ent.GetRenderEntity().gui[ j ] ) {
////					ent.GetRenderEntity().gui[ j ].SetStateString( "floor", va( "%i", currentFloor ) );
////					ent.GetRenderEntity().gui[ j ].StateChanged( gameLocal.time, true );
////				}
////			}
////			ent.UpdateVisuals();
////		}
////		kv = this.spawnArgs.MatchPrefix( "statusGui", kv );
////	}
////	if ( this.spawnArgs.GetInt( "pauseOnFloor", "-1" ) == currentFloor ) {
////		PostEventSec( &EV_PostArrival, this.spawnArgs.GetFloat( "pauseTime" ) );
////	} else {
////		Event_PostFloorArrival();
////	}
////}
////
/////*
////================
////idElevator::CloseAllDoors
////================
////*/
////void idElevator::CloseAllDoors( ) {
////	idDoor *door = GetDoor( this.spawnArgs.GetString( "innerdoor" ) );
////	if ( door ) {
////		door.Close();
////	}
////	for ( int i = 0; i < floorInfo.Num(); i++ ) {
////		door = GetDoor( floorInfo[i].door );
////		if ( door ) {
////			door.Close();
////		}
////	}
////}
////
/////*
////================
////idElevator::DisableAllDoors
////================
////*/
////void idElevator::DisableAllDoors( ) {
////	idDoor *door = GetDoor( this.spawnArgs.GetString( "innerdoor" ) );
////	if ( door ) {
////		door.Enable( false );
////	}
////	for ( int i = 0; i < floorInfo.Num(); i++ ) {
////		door = GetDoor( floorInfo[i].door );
////		if ( door ) {
////			door.Enable( false );
////		}
////	}
////}
////
/////*
////================
////idElevator::EnableProperDoors
////================
////*/
////void idElevator::EnableProperDoors( ) {
////	idDoor *door = GetDoor( this.spawnArgs.GetString( "innerdoor" ) );
////	if ( door ) {
////		door.Enable( true );
////	}
////	for ( int i = 0; i < floorInfo.Num(); i++ ) {
////		if ( floorInfo[i].floor == currentFloor ) {
////			door = GetDoor( floorInfo[i].door );
////			if ( door ) {
////				door.Enable( true );
////				break;
////			}
////		}
////	}
////}
////

};


/*
===============================================================================

  Binary movers.

===============================================================================
*/

enum moverState_t{
	MOVER_POS1,
	MOVER_POS2,
	MOVER_1TO2,
	MOVER_2TO1
};

class idMover_Binary extends idEntity {
////public:
////	CLASS_PROTOTYPE( idMover_Binary );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idMover_Binary>[];

////							idMover_Binary();
////							~idMover_Binary();

////	void					Spawn( ): void {throw "placeholder";}

////	void					Save( idSaveGame *savefile ) const;
////	void					Restore( idRestoreGame *savefile );

////	virtual void			PreBind( ): void {throw "placeholder";}
////	virtual void			PostBind( ): void {throw "placeholder";}

////	void					Enable( bool b );
////	void					InitSpeed( idVec3 &mpos1, idVec3 &mpos2, float mspeed, float maccelTime, float mdecelTime );
////	void					InitTime( idVec3 &mpos1, idVec3 &mpos2, float mtime, float maccelTime, float mdecelTime );
////	void					GotoPosition1( ): void {throw "placeholder";}
////	void					GotoPosition2( ): void {throw "placeholder";}
////	void					Use_BinaryMover( activator:idEntity );
////	void					SetGuiStates( const char *state );
////	void					UpdateBuddies( int val );
////	idMover_Binary *		GetActivateChain( ) const { return activateChain; }
////	idMover_Binary *		GetMoveMaster( ) const { return moveMaster; }
////	void					BindTeam( idEntity *bindTo );
////	void					SetBlocked( bool b );
////	bool					IsBlocked( ): void {throw "placeholder";}
////	idEntity *				GetActivator( ) const;

////	virtual void			WriteToSnapshot( idBitMsgDelta &msg ) const;
////	virtual void			ReadFromSnapshot( const idBitMsgDelta &msg );

////	void					SetPortalState( bool open );

////protected:
////	idVec3					pos1;
////	idVec3					pos2;
////	moverState_t			moverState;
////	idMover_Binary *		moveMaster;
////	idMover_Binary *		activateChain;
////	int						soundPos1;
////	int						sound1to2;
////	int						sound2to1;
////	int						soundPos2;
////	int						soundLoop;
////	float					wait;
////	float					damage;
////	int						duration;
////	int						accelTime;
////	int						decelTime;
////	idEntityPtr<idEntity>	activatedBy;
////	int						stateStartTime;
////	idStr					team;
////	bool					enabled;
////	int						move_thread;
////	int						updateStatus;		// 1 = lock behaviour, 2 = open close status
////	idStrList				buddies;
////	idPhysics_Parametric	physicsObj;
////	qhandle_t				areaPortal;			// 0 = no portal
////	bool					blocked;
////	idList< idEntityPtr<idEntity> >	guiTargets;

////	void					MatchActivateTeam( moverState_t newstate, /*int*/time:number );
////	void					JoinActivateTeam( idMover_Binary *master );

////	void					UpdateMoverSound( moverState_t state );
////	void					SetMoverState( moverState_t newstate, /*int*/time:number );
////	moverState_t			GetMoverState( ) const { return moverState; }
////	void					FindGuiTargets( ): void {throw "placeholder";}
////	void					SetGuiState( const char *key, const char *val ) const;

	Event_SetCallback( ): void {throw "placeholder";}
	Event_ReturnToPos1( ): void {throw "placeholder";}
	Event_Use_BinaryMover( activator:idEntity ) { throw "placeholder"; }
	Event_Reached_BinaryMover( ): void {throw "placeholder";}
	Event_MatchActivateTeam(newstate: moverState_t, /*int*/time:number ):void { throw "placeholder"; }
	Event_Enable( ): void {throw "placeholder";}
	Event_Disable( ): void {throw "placeholder";}
	Event_OpenPortal( ): void {throw "placeholder";}
	Event_ClosePortal( ): void {throw "placeholder";}
	Event_FindGuiTargets( ): void {throw "placeholder";}
	Event_InitGuiTargets( ): void {throw "placeholder";}

////	static void				GetMovedir( float dir, idVec3 &movedir );

	
/////*
////================
////idMover_Binary::idMover_Binary()
////================
////*/
////idMover_Binary::idMover_Binary() {
////	pos1.Zero();
////	pos2.Zero();
////	moverState = MOVER_POS1;
////	moveMaster = NULL;
////	activateChain = NULL;
////	soundPos1 = 0;
////	sound1to2 = 0;
////	sound2to1 = 0;
////	soundPos2 = 0;
////	soundLoop = 0;
////	wait = 0.0;
////	damage = 0.0;
////	duration = 0;
////	accelTime = 0;
////	decelTime = 0;
////	activatedBy = this;
////	stateStartTime = 0;
////	team.Clear();
////	enabled = false;
////	this.move_thread = 0;
////	updateStatus = 0;
////	this.areaPortal = 0;
////	blocked = false;
////	fl.networkSync = true;
////}
////
/////*
////================
////idMover_Binary::~idMover_Binary
////================
////*/
////idMover_Binary::~idMover_Binary() {
////	idMover_Binary *mover;
////
////	// if this is the mover master
////	if ( this == moveMaster ) {
////		// make the next mover in the chain the move master
////		for ( mover = moveMaster; mover; mover = mover.activateChain ) {
////			mover.moveMaster = this.activateChain;
////		}
////	}
////	else {
////		// remove mover from the activate chain
////		for ( mover = moveMaster; mover; mover = mover.activateChain ) {
////			if ( mover.activateChain == this ) {
////				mover.activateChain = this.activateChain;
////				break;
////			}
////		}
////	}
////}
////
/////*
////================
////idMover_Binary::Save
////================
////*/
////void idMover_Binary::Save( idSaveGame *savefile ) const {
////	var/*int*/i:number;
////
////	savefile.WriteVec3( pos1 );
////	savefile.WriteVec3( pos2 );
////	savefile.WriteInt( (moverState_t)moverState );
////
////	savefile.WriteObject( moveMaster );
////	savefile.WriteObject( activateChain );
////
////	savefile.WriteInt( soundPos1 );
////	savefile.WriteInt( sound1to2 );
////	savefile.WriteInt( sound2to1 );
////	savefile.WriteInt( soundPos2 );
////	savefile.WriteInt( soundLoop );
////
////	savefile.WriteFloat( wait );
////	savefile.WriteFloat( damage );
////
////	savefile.WriteInt( duration );
////	savefile.WriteInt( accelTime );
////	savefile.WriteInt( decelTime );
////
////	activatedBy.Save( savefile );
////
////	savefile.WriteInt( stateStartTime );
////	savefile.WriteString( team );
////	savefile.WriteBool( enabled );
////
////	savefile.WriteInt( this.move_thread );
////	savefile.WriteInt( updateStatus );
////
////	savefile.WriteInt( buddies.Num() );
////	for ( i = 0; i < buddies.Num(); i++ ) {
////		savefile.WriteString( buddies[ i ] );
////	}
////
////	savefile.WriteStaticObject( this.physicsObj );
////
////	savefile.WriteInt( this.areaPortal );
////	if ( this.areaPortal ) {
////		savefile.WriteInt( gameRenderWorld.GetPortalState( this.areaPortal ) );
////	}
////	savefile.WriteBool( blocked );
////
////	savefile.WriteInt( this.guiTargets.Num() );
////	for( i = 0; i < this.guiTargets.Num(); i++ ) {
////		this.guiTargets[ i ].Save( savefile );
////	}
////}
////
/////*
////================
////idMover_Binary::Restore
////================
////*/
////void idMover_Binary::Restore( idRestoreGame *savefile ) {
////	int		i, num, portalState;
////	idStr	temp;
////
////	savefile.ReadVec3( pos1 );
////	savefile.ReadVec3( pos2 );
////	savefile.ReadInt( (int &)moverState );
////
////	savefile.ReadObject( reinterpret_cast<idClass *&>( moveMaster ) );
////	savefile.ReadObject( reinterpret_cast<idClass *&>( activateChain ) );
////
////	savefile.ReadInt( soundPos1 );
////	savefile.ReadInt( sound1to2 );
////	savefile.ReadInt( sound2to1 );
////	savefile.ReadInt( soundPos2 );
////	savefile.ReadInt( soundLoop );
////
////	savefile.ReadFloat( wait );
////	savefile.ReadFloat( damage );
////
////	savefile.ReadInt( duration );
////	savefile.ReadInt( accelTime );
////	savefile.ReadInt( decelTime );
////
////	activatedBy.Restore( savefile );
////
////	savefile.ReadInt( stateStartTime );
////
////	savefile.ReadString( team );
////	savefile.ReadBool( enabled );
////
////	savefile.ReadInt( this.move_thread );
////	savefile.ReadInt( updateStatus );
////
////	savefile.ReadInt( num );
////	for ( i = 0; i < num; i++ ) {
////		savefile.ReadString( temp );
////		buddies.Append( temp );
////	}
////
////	savefile.ReadStaticObject( this.physicsObj );
////	RestorePhysics( &this.physicsObj );
////
////	savefile.ReadInt( this.areaPortal );
////	if ( this.areaPortal ) {
////		savefile.ReadInt( portalState );
////		gameLocal.SetPortalState( this.areaPortal, portalState );
////	}
////	savefile.ReadBool( blocked );
////
////	this.guiTargets.Clear();
////	savefile.ReadInt( num );
////	this.guiTargets.SetNum( num );
////	for( i = 0; i < num; i++ ) {
////		this.guiTargets[ i ].Restore( savefile );
////	}
////}
////
/////*
////================
////idMover_Binary::Spawn
////
////Base class for all movers.
////
////"wait"		wait before returning (3 default, -1 = never return)
////"speed"		movement speed
////================
////*/
	Spawn(): void {
		todoThrow();
////	idEntity	*ent;
////	const char	*temp;
////
////	this.move_thread		= 0;
////	enabled			= true;
////	this.areaPortal		= 0;
////
////	activateChain = NULL;
////
////	this.spawnArgs.GetFloat( "wait", "0", wait );
////
////	this.spawnArgs.GetInt( "updateStatus", "0", updateStatus );
////
////	const idKeyValue *kv = this.spawnArgs.MatchPrefix( "buddy", NULL );
////	while( kv ) {
////		buddies.Append( kv.GetValue() );
////		kv = this.spawnArgs.MatchPrefix( "buddy", kv );
////	}
////
////	this.spawnArgs.GetString( "team", "", &temp );
////	team = temp;
////
////	if ( !team.Length() ) {
////		ent = this;
////	} else {
////		// find the first entity spawned on this team (which could be us)
////		for( ent = gameLocal.spawnedEntities.Next(); ent != NULL; ent = ent.spawnNode.Next() ) {
////			if ( ent.IsType( idMover_Binary::Type ) && !idStr::Icmp( static_cast<idMover_Binary *>(ent).team.c_str(), temp ) ) {
////				break;
////			}
////		}
////		if ( !ent ) {
////			ent = this;
////		}
////	}
////	moveMaster = static_cast<idMover_Binary *>(ent);
////
////	// create a physics team for the binary mover parts
////	if ( ent != this ) {
////		JoinTeam( ent );
////	}
////
////	this.physicsObj.SetSelf( this );
////	this.physicsObj.SetClipModel( new idClipModel( this.GetPhysics().GetClipModel() ), 1.0 );
////	this.physicsObj.SetOrigin( this.GetPhysics().GetOrigin() );
////	this.physicsObj.SetAxis( this.GetPhysics().GetAxis() );
////	this.physicsObj.SetClipMask( MASK_SOLID );
////	if ( !this.spawnArgs.GetBool( "solid", "1" ) ) {
////		this.physicsObj.SetContents( 0 );
////	}
////	if ( !this.spawnArgs.GetBool( "nopush" ) ) {
////		this.physicsObj.SetPusher( 0 );
////	}
////	this.physicsObj.SetLinearExtrapolation( EXTRAPOLATION_NONE, 0, 0, this.GetPhysics().GetOrigin(), vec3_origin, vec3_origin );
////	this.physicsObj.SetAngularExtrapolation( EXTRAPOLATION_NONE, 0, 0, this.GetPhysics().GetAxis().ToAngles(), ang_zero, ang_zero );
////	this.SetPhysics( &this.physicsObj );
////
////	if ( moveMaster != this ) {
////		JoinActivateTeam( moveMaster );
////	}
////
////	idBounds soundOrigin;
////	idMover_Binary *slave;
////
////	soundOrigin.Clear();
////	for ( slave = moveMaster; slave != NULL; slave = slave.activateChain ) {
////		soundOrigin += slave.GetPhysics().GetAbsBounds();
////	}
////	moveMaster.refSound.origin = soundOrigin.GetCenter();
////
////	if ( this.spawnArgs.MatchPrefix( "guiTarget" ) ) {
////		if ( gameLocal.GameState() == GAMESTATE_STARTUP ) {
////			this.PostEventMS( &EV_FindGuiTargets, 0 );
////		} else {
////			// not during spawn, so it's ok to get the targets
////			this.FindGuiTargets();
////		}
////	}
}
////
/////*
////===============
////idMover_Binary::GetMovedir
////
////The editor only specifies a single value for angles (yaw),
////but we have special constants to generate an up or down direction.
////Angles will be cleared, because it is being used to represent a direction
////instead of an orientation.
////===============
////*/
////void idMover_Binary::GetMovedir( /*float*/angle:number, idVec3 &movedir ) {
////	if ( angle == -1 ) {
////		movedir.Set( 0, 0, 1 );
////	} else if ( angle == -2 ) {
////		movedir.Set( 0, 0, -1 );
////	} else {
////		movedir = idAngles( 0, angle, 0 ).ToForward();
////	}
////}
////
/////*
////================
////idMover_Binary::Event_SetCallback
////================
////*/
////void idMover_Binary::Event_SetCallback( ) {
////	if ( ( moverState == MOVER_1TO2 ) || ( moverState == MOVER_2TO1 ) ) {
////		this.move_thread = idThread::CurrentThreadNum();
////		idThread::ReturnInt( true );
////	} else {
////		idThread::ReturnInt( false );
////	}
////}
////
/////*
////===============
////idMover_Binary::UpdateMoverSound
////===============
////*/
////void idMover_Binary::UpdateMoverSound( moverState_t state ) {
////	if ( moveMaster == this ) {
////		switch( state ) {
////			case MOVER_POS1:
////				break;
////			case MOVER_POS2:
////				break;
////			case MOVER_1TO2:
////				StartSound( "snd_open", SND_CHANNEL_ANY, 0, false, NULL );
////				break;
////			case MOVER_2TO1:
////				StartSound( "snd_close", SND_CHANNEL_ANY, 0, false, NULL );
////				break;
////		}
////	}
////}
////
/////*
////===============
////idMover_Binary::SetMoverState
////===============
////*/
////void idMover_Binary::SetMoverState( moverState_t newstate, /*int*/time:number ) {
////	idVec3 	delta;
////
////	moverState = newstate;
////	this.move_thread = 0;
////
////	UpdateMoverSound( newstate );
////
////	stateStartTime = time;
////	switch( moverState ) {
////		case MOVER_POS1: {
////			Signal( SIG_MOVER_POS1 );
////			this.physicsObj.SetLinearExtrapolation( EXTRAPOLATION_NONE, time, 0, pos1, vec3_origin, vec3_origin );
////			break;
////		}
////		case MOVER_POS2: {
////			Signal( SIG_MOVER_POS2 );
////			this.physicsObj.SetLinearExtrapolation( EXTRAPOLATION_NONE, time, 0, pos2, vec3_origin, vec3_origin );
////			break;
////		}
////		case MOVER_1TO2: {
////			Signal( SIG_MOVER_1TO2 );
////			this.physicsObj.SetLinearExtrapolation( EXTRAPOLATION_LINEAR, time, duration, pos1, ( pos2 - pos1 ) * 1000.0 / duration, vec3_origin );
////			if ( accelTime != 0 || decelTime != 0 ) {
////				this.physicsObj.SetLinearInterpolation( time, accelTime, decelTime, duration, pos1, pos2 );
////			} else {
////				this.physicsObj.SetLinearInterpolation( 0, 0, 0, 0, pos1, pos2 );
////			}
////			break;
////		}
////		case MOVER_2TO1: {
////			Signal( SIG_MOVER_2TO1 );
////			this.physicsObj.SetLinearExtrapolation( EXTRAPOLATION_LINEAR, time, duration, pos2, ( pos1 - pos2 ) * 1000.0 / duration, vec3_origin );
////			if ( accelTime != 0 || decelTime != 0 ) {
////				this.physicsObj.SetLinearInterpolation( time, accelTime, decelTime, duration, pos2, pos1 );
////			} else {
////				this.physicsObj.SetLinearInterpolation( 0, 0, 0, 0, pos1, pos2 );
////			}
////			break;
////		}
////	}
////}
////
/////*
////================
////idMover_Binary::MatchActivateTeam
////
////All entities in a mover team will move from pos1 to pos2
////in the same amount of time
////================
////*/
////void idMover_Binary::MatchActivateTeam( moverState_t newstate, /*int*/time:number ) {
////	idMover_Binary *slave;
////
////	for ( slave = this; slave != NULL; slave = slave.activateChain ) {
////		slave.SetMoverState( newstate, time );
////	}
////}
////
/////*
////================
////idMover_Binary::Enable
////================
////*/
////void idMover_Binary::Enable( bool b ) {
////	enabled = b;
////}
////
/////*
////================
////idMover_Binary::Event_MatchActivateTeam
////================
////*/
////void idMover_Binary::Event_MatchActivateTeam( moverState_t newstate, /*int*/time:number ) {
////	MatchActivateTeam( newstate, time );
////}
////
/////*
////================
////idMover_Binary::BindTeam
////
////All entities in a mover team will be bound 
////================
////*/
////void idMover_Binary::BindTeam( idEntity *bindTo ) {
////	idMover_Binary *slave;
////
////	for ( slave = this; slave != NULL; slave = slave.activateChain ) {
////		slave.Bind( bindTo, true );
////	}
////}
////
/////*
////================
////idMover_Binary::JoinActivateTeam
////
////Set all entities in a mover team to be enabled
////================
////*/
////void idMover_Binary::JoinActivateTeam( idMover_Binary *master ) {
////	this.activateChain = master.activateChain;
////	master.activateChain = this;
////}
////
/////*
////================
////idMover_Binary::Event_Enable
////
////Set all entities in a mover team to be enabled
////================
////*/
////void idMover_Binary::Event_Enable( ) {
////	idMover_Binary *slave;
////
////	for ( slave = moveMaster; slave != NULL; slave = slave.activateChain ) {
////		slave.Enable( false );
////	}
////}
////
/////*
////================
////idMover_Binary::Event_Disable
////
////Set all entities in a mover team to be disabled
////================
////*/
////void idMover_Binary::Event_Disable( ) {
////	idMover_Binary *slave;
////
////	for ( slave = moveMaster; slave != NULL; slave = slave.activateChain ) {
////		slave.Enable( false );
////	}
////}
////
/////*
////================
////idMover_Binary::Event_OpenPortal
////
////Sets the portal associtated with this mover to be open
////================
////*/
////void idMover_Binary::Event_OpenPortal( ) {
////	idMover_Binary *slave;
////
////	for ( slave = moveMaster; slave != NULL; slave = slave.activateChain ) {
////		if ( slave.areaPortal ) {
////			slave.SetPortalState( true );
////		}
////	}
////}
////
/////*
////================
////idMover_Binary::Event_ClosePortal
////
////Sets the portal associtated with this mover to be closed
////================
////*/
////void idMover_Binary::Event_ClosePortal( ) {
////	idMover_Binary *slave;
////
////	for ( slave = moveMaster; slave != NULL; slave = slave.activateChain ) {
////		if ( !slave.IsHidden() ) {
////			if ( slave.areaPortal ) {
////				slave.SetPortalState( false );
////			}
////		}
////	}
////}
////
/////*
////================
////idMover_Binary::Event_ReturnToPos1
////================
////*/
////void idMover_Binary::Event_ReturnToPos1( ) {
////	MatchActivateTeam( MOVER_2TO1, gameLocal.time );
////}
////
/////*
////================
////idMover_Binary::Event_Reached_BinaryMover
////================
////*/
////void idMover_Binary::Event_Reached_BinaryMover( ) {
////
////	if ( moverState == MOVER_1TO2 ) {
////		// reached pos2
////		idThread::ObjectMoveDone( this.move_thread, this );
////		this.move_thread = 0;
////
////		if ( moveMaster == this ) {
////			StartSound( "snd_opened", SND_CHANNEL_ANY, 0, false, NULL );
////		}
////
////		SetMoverState( MOVER_POS2, gameLocal.time );
////
////		SetGuiStates( guiBinaryMoverStates[MOVER_POS2] );
////
////		UpdateBuddies( 1 );
////
////		if ( enabled && wait >= 0 && !this.spawnArgs.GetBool( "toggle" ) ) {
////			// return to pos1 after a delay
////			PostEventSec( &EV_Mover_ReturnToPos1, wait );
////		}
////		
////		// fire targets
////		ActivateTargets( moveMaster.GetActivator() );
////
////		SetBlocked(false);
////	} else if ( moverState == MOVER_2TO1 ) {
////		// reached pos1
////		idThread::ObjectMoveDone( this.move_thread, this );
////		this.move_thread = 0;
////
////		SetMoverState( MOVER_POS1, gameLocal.time );
////
////		SetGuiStates( guiBinaryMoverStates[MOVER_POS1] );
////
////		UpdateBuddies( 0 );
////
////		// close areaportals
////		if ( moveMaster == this ) {
////			ProcessEvent( &EV_Mover_ClosePortal );
////		}
////
////		if ( enabled && wait >= 0 && this.spawnArgs.GetBool( "continuous" ) ) {
////			PostEventSec( &EV_Activate, wait, this );
////		}
////
////		SetBlocked(false);
////	} else {
////		gameLocal.Error( "Event_Reached_BinaryMover: bad moverState" );
////	}
////}
////
/////*
////================
////idMover_Binary::GotoPosition1
////================
////*/
////void idMover_Binary::GotoPosition1( ) {
////	idMover_Binary *slave;
////	int	partial;
////
////	// only the master should control this
////	if ( moveMaster != this ) {
////		moveMaster.GotoPosition1();
////		return;
////	}
////
////	SetGuiStates( guiBinaryMoverStates[MOVER_2TO1] );
////
////	if ( ( moverState == MOVER_POS1 ) || ( moverState == MOVER_2TO1 ) ) {
////		// already there, or on the way
////		return;
////	}
////
////	if ( moverState == MOVER_POS2 ) {
////		for ( slave = this; slave != NULL; slave = slave.activateChain ) {
////			slave.CancelEvents( &EV_Mover_ReturnToPos1 );
////		}
////		if ( !this.spawnArgs.GetBool( "toggle" ) ) {
////			ProcessEvent( &EV_Mover_ReturnToPos1 );
////		}
////		return;
////	}
////
////	// only partway up before reversing
////	if ( moverState == MOVER_1TO2 ) {
////		// use the physics times because this might be executed during the physics simulation
////		partial = this.physicsObj.GetLinearEndTime() - this.physicsObj.GetTime();
////		assert( partial >= 0 );
////		if ( partial < 0 ) {
////			partial = 0;
////		}
////		MatchActivateTeam( MOVER_2TO1, this.physicsObj.GetTime() - partial );
////		// if already at at position 1 (partial == duration) execute the reached event
////		if ( partial >= duration ) {
////			Event_Reached_BinaryMover();
////		}
////	}
////}
////
/////*
////================
////idMover_Binary::GotoPosition2
////================
////*/
////void idMover_Binary::GotoPosition2( ) {
////	int	partial;
////
////	// only the master should control this
////	if ( moveMaster != this ) {
////		moveMaster.GotoPosition2();
////		return;
////	}
////
////	SetGuiStates( guiBinaryMoverStates[MOVER_1TO2] );
////
////	if ( ( moverState == MOVER_POS2 ) || ( moverState == MOVER_1TO2 ) ) {
////		// already there, or on the way
////		return;
////	}
////
////	if ( moverState == MOVER_POS1 ) {
////		MatchActivateTeam( MOVER_1TO2, gameLocal.time );
////
////		// open areaportal
////		ProcessEvent( &EV_Mover_OpenPortal );
////		return;
////	}
////
////
////	// only partway up before reversing
////	if ( moverState == MOVER_2TO1 ) {
////		// use the physics times because this might be executed during the physics simulation
////		partial = this.physicsObj.GetLinearEndTime() - this.physicsObj.GetTime();
////		assert( partial >= 0 );
////		if ( partial < 0 ) {
////			partial = 0;
////		}
////		MatchActivateTeam( MOVER_1TO2, this.physicsObj.GetTime() - partial );
////		// if already at at position 2 (partial == duration) execute the reached event
////		if ( partial >= duration ) {
////			Event_Reached_BinaryMover();
////		}
////	}
////}
////
/////*
////================
////idMover_Binary::UpdateBuddies
////================
////*/
////void idMover_Binary::UpdateBuddies( int val ) {
////	int i, c;
////
////	if ( updateStatus == 2 ) {
////		 c = buddies.Num();
////		for ( i = 0; i < c; i++ ) {
////			idEntity *buddy = gameLocal.FindEntity( buddies[i] );
////			if ( buddy ) {
////				buddy.SetShaderParm( SHADERPARM_MODE, val );
////				buddy.UpdateVisuals();
////			}
////		}
////	}
////}
////
/////*
////================
////idMover_Binary::SetGuiStates
////================
////*/
////void idMover_Binary::SetGuiStates( const char *state ) {
////	if ( this.guiTargets.Num() ) {
////		SetGuiState( "movestate", state );
////	}
////
////	idMover_Binary *mb = activateChain;
////	while( mb ) {
////		if ( mb.guiTargets.Num() ) {
////			mb.SetGuiState( "movestate", state );
////		}
////		mb = mb.activateChain;
////	}
////}
////
/////*
////================
////idMover_Binary::Use_BinaryMover
////================
////*/
////void idMover_Binary::Use_BinaryMover( activator:idEntity ) {
////	// only the master should be used
////	if ( moveMaster != this ) {
////		moveMaster.Use_BinaryMover( activator );
////		return;
////	}
////
////	if ( !enabled ) {
////		return;
////	}
////
////	activatedBy = activator;
////
////	if ( moverState == MOVER_POS1 ) {
////		// FIXME: start moving USERCMD_MSEC later, because if this was player
////		// triggered, gameLocal.time hasn't been advanced yet
////		MatchActivateTeam( MOVER_1TO2, gameLocal.time + USERCMD_MSEC );
////
////		SetGuiStates( guiBinaryMoverStates[MOVER_1TO2] );
////		// open areaportal
////		ProcessEvent( &EV_Mover_OpenPortal );
////		return;
////	}
////
////	// if all the way up, just delay before coming down
////	if ( moverState == MOVER_POS2 ) {
////		idMover_Binary *slave;
////
////		if ( wait == -1 ) {
////			return;
////		}
////
////		SetGuiStates( guiBinaryMoverStates[MOVER_2TO1] );
////
////		for ( slave = this; slave != NULL; slave = slave.activateChain ) {
////			slave.CancelEvents( &EV_Mover_ReturnToPos1 );
////			slave.PostEventSec( &EV_Mover_ReturnToPos1, this.spawnArgs.GetBool( "toggle" ) ? 0 : wait );
////		}
////		return;
////	}
////
////	// only partway down before reversing
////	if ( moverState == MOVER_2TO1 ) {
////		GotoPosition2();
////		return;
////	}
////
////	// only partway up before reversing
////	if ( moverState == MOVER_1TO2 ) {
////		GotoPosition1();
////		return;
////	}
////}
////
/////*
////================
////idMover_Binary::Event_Use_BinaryMover
////================
////*/
////void idMover_Binary::Event_Use_BinaryMover( activator:idEntity ) {
////	Use_BinaryMover( activator );
////}
////
/*
================
idMover_Binary::PreBind
================
*/
	PreBind ( ): void {
		todoThrow ( );
		//pos1 = GetWorldCoordinates( pos1 );
		//pos2 = GetWorldCoordinates( pos2 );
	}

/*
================
idMover_Binary::PostBind
================
*/
	PostBind ( ): void {
		todoThrow ( );
		//pos1 = GetLocalCoordinates( pos1 );
		//pos2 = GetLocalCoordinates( pos2 );
	}

/////*
////================
////idMover_Binary::FindGuiTargets
////================
////*/
////void idMover_Binary::FindGuiTargets( ) {
////   	gameLocal.GetTargets( this.spawnArgs, this.guiTargets, "guiTarget" );
////}
////
/////*
////==============================
////idMover_Binary::SetGuiState
////
////key/val will be set to any renderEntity.gui's on the list
////==============================
////*/
////void idMover_Binary::SetGuiState( const char *key, const char *val ) const {
////	var/*int*/i:number;
////
////	for( i = 0; i < this.guiTargets.Num(); i++ ) {
////		var ent:idEntity = this.guiTargets[ i ].GetEntity();
////		if ( ent ) {
////			for ( int j = 0; j < MAX_RENDERENTITY_GUI; j++ ) {
////				if ( ent.GetRenderEntity() && ent.GetRenderEntity().gui[ j ] ) {
////					ent.GetRenderEntity().gui[ j ].SetStateString( key, val );
////					ent.GetRenderEntity().gui[ j ].StateChanged( gameLocal.time, true );
////				}
////			}
////			ent.UpdateVisuals();
////		}
////	}
////}
////
/////*
////================
////idMover_Binary::Event_InitGuiTargets
////================
////*/
////void idMover_Binary::Event_FindGuiTargets( ) {
////	this.FindGuiTargets();
////}
////
/////*
////================
////idMover_Binary::Event_InitGuiTargets
////================
////*/
////void idMover_Binary::Event_InitGuiTargets( ) {
////	if ( this.guiTargets.Num() ) {
////		SetGuiState( "movestate", guiBinaryMoverStates[MOVER_POS1] );
////	}
////}
////
/////*
////================
////idMover_Binary::InitSpeed
////
////pos1, pos2, and speed are passed in so the movement delta can be calculated
////================
////*/
////void idMover_Binary::InitSpeed( idVec3 &mpos1, idVec3 &mpos2, float mspeed, float maccelTime, float mdecelTime ) {
////	idVec3		move;
////	float		distance;
////	float		speed;
////
////	pos1		= mpos1;
////	pos2		= mpos2;
////
////	accelTime	= idPhysics::SnapTimeToPhysicsFrame( SEC2MS( maccelTime ) );
////	decelTime	= idPhysics::SnapTimeToPhysicsFrame( SEC2MS( mdecelTime ) );
////
////	speed		= mspeed ? mspeed : 100;
////
////	// calculate time to reach second position from speed
////	move = pos2 - pos1;
////	distance = move.Length();
////	duration = idPhysics::SnapTimeToPhysicsFrame( distance * 1000 / speed );
////	if ( duration <= 0 ) {
////		duration = 1;
////	}
////
////	moverState = MOVER_POS1;
////
////	this.physicsObj.SetLinearExtrapolation( EXTRAPOLATION_NONE, 0, 0, pos1, vec3_origin, vec3_origin );
////	this.physicsObj.SetLinearInterpolation( 0, 0, 0, 0, vec3_origin, vec3_origin );
////	SetOrigin( pos1 );
////
////	this.PostEventMS( &EV_Mover_InitGuiTargets, 0 );
////}
////
/////*
////================
////idMover_Binary::InitTime
////
////pos1, pos2, and time are passed in so the movement delta can be calculated
////================
////*/
////void idMover_Binary::InitTime( idVec3 &mpos1, idVec3 &mpos2, float mtime, float maccelTime, float mdecelTime ) {
////
////	pos1		= mpos1;
////	pos2		= mpos2;
////
////	accelTime	= idPhysics::SnapTimeToPhysicsFrame( SEC2MS( maccelTime ) );
////	decelTime	= idPhysics::SnapTimeToPhysicsFrame( SEC2MS( mdecelTime ) );
////
////	duration	= idPhysics::SnapTimeToPhysicsFrame( SEC2MS( mtime ) );
////	if ( duration <= 0 ) {
////		duration = 1;
////	}
////
////	moverState = MOVER_POS1;
////
////	this.physicsObj.SetLinearExtrapolation( EXTRAPOLATION_NONE, 0, 0, pos1, vec3_origin, vec3_origin );
////	this.physicsObj.SetLinearInterpolation( 0, 0, 0, 0, vec3_origin, vec3_origin );
////	SetOrigin( pos1 );
////
////	this.PostEventMS( &EV_Mover_InitGuiTargets, 0 );
////}
////
/////*
////================
////idMover_Binary::SetBlocked
////================
////*/
////void idMover_Binary::SetBlocked( bool b ) {
////	for ( idMover_Binary *slave = moveMaster; slave != NULL; slave = slave.activateChain ) {
////		slave.blocked = b;
////		if ( b ) {
////			const idKeyValue *kv = slave.spawnArgs.MatchPrefix( "triggerBlocked" );
////			while( kv ) {
////				var ent:idEntity = gameLocal.FindEntity( kv.GetValue() );
////				if ( ent ) {
////					ent.this.PostEventMS( &EV_Activate, 0, moveMaster.GetActivator() );
////				}
////				kv = slave.spawnArgs.MatchPrefix( "triggerBlocked", kv );
////			}
////		}
////	}
////}
////
/////*
////================
////idMover_Binary::IsBlocked
////================
////*/
////bool idMover_Binary::IsBlocked( ) {
////	return blocked;
////}
////
/////*
////================
////idMover_Binary::GetActivator
////================
////*/
////idEntity *idMover_Binary::GetActivator( ) const {
////	return activatedBy.GetEntity();
////}
////
/////*
////================
////idMover_Binary::WriteToSnapshot
////================
////*/
////void idMover_Binary::WriteToSnapshot( idBitMsgDelta &msg ) const {
////	this.physicsObj.WriteToSnapshot( msg );
////	msg.WriteBits( moverState, 3 );
////	WriteBindToSnapshot( msg );
////}
////
/////*
////================
////idMover_Binary::ReadFromSnapshot
////================
////*/
////void idMover_Binary::ReadFromSnapshot( const idBitMsgDelta &msg ) {
////	moverState_t oldMoverState = moverState;
////
////	this.physicsObj.ReadFromSnapshot( msg );
////	moverState = (moverState_t) msg.ReadBits( 3 );
////	ReadBindFromSnapshot( msg );
////
////	if ( msg.HasChanged() ) {
////		if ( moverState != oldMoverState ) {
////			UpdateMoverSound( moverState );
////		}
////		UpdateVisuals();
////	}
////}
////
/////*
////================
////idMover_Binary::SetPortalState
////================
////*/
////void idMover_Binary::SetPortalState( bool open ) {
////	assert( this.areaPortal );
////	gameLocal.SetPortalState( this.areaPortal, open ? PS_BLOCK_NONE : PS_BLOCK_ALL );
////}
};

class idDoor extends idMover_Binary {
////public:
////	CLASS_PROTOTYPE( idDoor );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idDoor>[];

////							idDoor( );
////							~idDoor( );

////	void					Spawn( ): void {throw "placeholder";}

////	void					Save( idSaveGame *savefile ) const;
////	void					Restore( idRestoreGame *savefile );

////	virtual void			Think( ): void {throw "placeholder";}
////	virtual void			PreBind( ): void {throw "placeholder";}
////	virtual void			PostBind( ): void {throw "placeholder";}
////	virtual void			Hide( ): void {throw "placeholder";}
////	virtual void			Show( ): void {throw "placeholder";}

////	bool					IsOpen( ): void {throw "placeholder";}
////	bool					IsNoTouch( ): void {throw "placeholder";}
////	int						IsLocked( ): void {throw "placeholder";}
////	void					Lock( int f );
////	void					Use( other:idEntity, activator:idEntity );
////	void					Close( ): void {throw "placeholder";}
////	void					Open( ): void {throw "placeholder";}
////	void					SetCompanion( idDoor *door );

////private:
////	float					triggersize;
////	bool					crusher;
////	bool					noTouch;
////	bool					aas_area_closed;
////	idStr					buddyStr;
////	idClipModel *			trigger;
////	idClipModel *			sndTrigger;
////	int						nextSndTriggerTime;
////	idVec3					localTriggerOrigin;
////	idMat3					localTriggerAxis;
////	idStr					requires;
////	int						removeItem;
////	idStr					syncLock;
////	int						normalAxisIndex;		// door faces X or Y for spectator teleports
////	idDoor *				companionDoor;

////	void					SetAASAreaState( bool closed );

////	void					GetLocalTriggerPosition( const idClipModel *trigger );
////	void					CalcTriggerBounds( float size, idBounds &bounds );

	Event_Reached_BinaryMover( ): void { throw "placeholder"; }
	Event_TeamBlocked(blockedEntity: idEntity, blockingEntity: idEntity): void { throw "placeholder"; }
	Event_PartBlocked(blockingEntity: idEntity ): void { throw "placeholder"; }
	Event_Touch( other:idEntity, trace:trace_t ): void { throw "placeholder"; }
	Event_Activate( activator:idEntity ): void { throw "placeholder"; }
	Event_StartOpen( ): void { throw "placeholder"; }
	Event_SpawnDoorTrigger( ): void { throw "placeholder"; }
	Event_SpawnSoundTrigger( ): void { throw "placeholder"; }
	Event_Close( ): void { throw "placeholder"; }
	Event_Open( ): void { throw "placeholder"; }
	Event_Lock( /*int*/ f:number ): void { throw "placeholder"; }
	Event_IsOpen( ): void { throw "placeholder"; }
	Event_Locked( ): void { throw "placeholder"; }
	Event_SpectatorTouch( other:idEntity, trace:trace_t ): void { throw "placeholder"; }
	Event_OpenPortal( ): void { throw "placeholder"; }
	Event_ClosePortal(): void { throw "placeholder"; }

	
/////*
////================
////idDoor::idDoor
////================
////*/
////idDoor::idDoor( ) {
////	triggersize = 1.0;
////	crusher = false;
////	noTouch = false;
////	aas_area_closed = false;
////	buddyStr.Clear();
////	trigger = NULL;
////	sndTrigger = NULL;
////	nextSndTriggerTime = 0;
////	localTriggerOrigin.Zero();
////	localTriggerAxis.Identity();
////	requires.Clear();
////	removeItem = 0;
////	syncLock.Clear();
////	companionDoor = NULL;
////	normalAxisIndex = 0;
////}
////
/////*
////================
////idDoor::~idDoor
////================
////*/
////idDoor::~idDoor( ) {
////	if ( trigger ) {
////		delete trigger;
////	}
////	if ( sndTrigger ) {
////		delete sndTrigger;
////	}
////}
////
/////*
////================
////idDoor::Save
////================
////*/
////void idDoor::Save( idSaveGame *savefile ) const {
////
////	savefile.WriteFloat( triggersize );
////	savefile.WriteBool( crusher );
////	savefile.WriteBool( noTouch );
////	savefile.WriteBool( aas_area_closed );
////	savefile.WriteString( buddyStr );
////	savefile.WriteInt( nextSndTriggerTime );
////
////	savefile.WriteVec3( localTriggerOrigin );
////	savefile.WriteMat3( localTriggerAxis );
////
////	savefile.WriteString( requires );
////	savefile.WriteInt( removeItem );
////	savefile.WriteString( syncLock );
////	savefile.WriteInt( normalAxisIndex );
////
////	savefile.WriteClipModel( trigger );
////	savefile.WriteClipModel( sndTrigger );
////
////	savefile.WriteObject( companionDoor );
////}
////
/////*
////================
////idDoor::Restore
////================
////*/
////void idDoor::Restore( idRestoreGame *savefile ) {
////
////	savefile.ReadFloat( triggersize );
////	savefile.ReadBool( crusher );
////	savefile.ReadBool( noTouch );
////	savefile.ReadBool( aas_area_closed );
////	SetAASAreaState( aas_area_closed );
////	savefile.ReadString( buddyStr );
////	savefile.ReadInt( nextSndTriggerTime );
////
////	savefile.ReadVec3( localTriggerOrigin );
////	savefile.ReadMat3( localTriggerAxis );
////
////	savefile.ReadString( requires );
////	savefile.ReadInt( removeItem );
////	savefile.ReadString( syncLock );
////	savefile.ReadInt( normalAxisIndex );
////
////	savefile.ReadClipModel( trigger );
////	savefile.ReadClipModel( sndTrigger );
////
////	savefile.ReadObject( reinterpret_cast<idClass *&>( companionDoor ) );
////}
////
/////*
////================
////idDoor::Spawn
////================
////*/
	Spawn(): void {
		todoThrow();
////	idVec3		abs_movedir;
////	float		distance;
////	idVec3		size;
////	idVec3		movedir;
////	float		dir;
////	float		lip;
////	bool		start_open;
////	float		time;
////	float		speed;
////
////	// get the direction to move
////	if ( !this.spawnArgs.GetFloat( "movedir", "0", dir ) ) {
////		// no movedir, so angle defines movement direction and not orientation,
////		// a la oldschool Quake
////		SetAngles( ang_zero );
////		this.spawnArgs.GetFloat( "angle", "0", dir );
////	}
////	GetMovedir( dir, movedir );
////
////	// default speed of 400
////	this.spawnArgs.GetFloat( "speed", "400", speed );
////
////	// default wait of 2 seconds
////	this.spawnArgs.GetFloat( "wait", "3", wait );
////
////	// default lip of 8 units
////	this.spawnArgs.GetFloat( "lip", "8", lip );
////
////	// by default no damage
////	this.spawnArgs.GetFloat( "damage", "0", damage );
////
////	// trigger size
////	this.spawnArgs.GetFloat( "triggersize", "120", triggersize );
////
////	this.spawnArgs.GetBool( "crusher", "0", crusher );
////	this.spawnArgs.GetBool( "start_open", "0", start_open );
////	this.spawnArgs.GetBool( "no_touch", "0", noTouch );
////
////	// expects syncLock to be a door that must be closed before this door will open
////	this.spawnArgs.GetString( "syncLock", "", syncLock );
////
////	this.spawnArgs.GetString( "buddy", "", buddyStr );
////
////	this.spawnArgs.GetString( "requires", "", requires );
////	this.spawnArgs.GetInt( "removeItem", "0", removeItem );
////
////	// ever separate piece of a door is considered solid when other team mates push entities
////	fl.solidForTeam = true;
////
////	// first position at start
////	pos1 = this.GetPhysics().GetOrigin();
////
////	// calculate second position
////	abs_movedir[0] = idMath::Fabs( movedir[ 0 ] );
////	abs_movedir[1] = idMath::Fabs( movedir[ 1 ] );
////	abs_movedir[2] = idMath::Fabs( movedir[ 2 ] );
////	size = this.GetPhysics().GetAbsBounds()[1] - this.GetPhysics().GetAbsBounds()[0];
////	distance = ( abs_movedir * size ) - lip;
////	pos2 = pos1 + distance * movedir;
////
////	// if "start_open", reverse position 1 and 2
////	if ( start_open ) {
////		// post it after EV_SpawnBind
////		this.PostEventMS( &EV_Door_StartOpen, 1 );		
////	}
////
////	if ( this.spawnArgs.GetFloat( "time", "1", time ) ) {
////		InitTime( pos1, pos2, time, 0, 0 );
////	} else {
////		InitSpeed( pos1, pos2, speed, 0, 0 );
////	}
////
////	if ( moveMaster == this ) {
////		if ( this.health ) {
////			fl.takedamage = true;
////		}
////		if ( noTouch || this.health ) {
////			// non touch/shoot doors
////			this.PostEventMS( &EV_Mover_MatchTeam, 0, moverState, gameLocal.time );
////
////			const char *sndtemp = this.spawnArgs.GetString( "snd_locked" );
////			if ( this.spawnArgs.GetInt( "locked" ) && sndtemp && *sndtemp ) {
////				this.PostEventMS( &EV_Door_SpawnSoundTrigger, 0 );
////			}
////		} else {
////			// spawn trigger
////			this.PostEventMS( &EV_Door_SpawnDoorTrigger, 0 );
////		}
////	}
////
////	// see if we are on an areaportal
////	this.areaPortal = gameRenderWorld.FindPortal( this.GetPhysics().GetAbsBounds() );
////	if ( !start_open ) {
////		// start closed
////		ProcessEvent( &EV_Mover_ClosePortal );
////	}
////
////	int locked = this.spawnArgs.GetInt( "locked" );
////	if ( locked ) {
////		// make sure all members of the team get locked
////		this.PostEventMS( &EV_Door_Lock, 0, locked );
////	}
////
////	if ( this.spawnArgs.GetBool( "continuous" ) ) {
////		PostEventSec( &EV_Activate, this.spawnArgs.GetFloat( "delay" ), this );
////	}
////
////	// sounds have a habit of stuttering when portals close, so make them unoccluded
////	refSound.parms.soundShaderFlags |= SSF_NO_OCCLUSION;
////
////	companionDoor = NULL;
////
////	enabled = true;
////	blocked = false;
}
////
/////*
////================
////idDoor::Think
////================
////*/
////void idDoor::Think( ) {
////	idVec3 masterOrigin;
////	idMat3 masterAxis;
////
////	idMover_Binary::Think();
////
////	if ( thinkFlags & TH_PHYSICS ) {
////		// update trigger position
////		if ( GetMasterPosition( masterOrigin, masterAxis ) ) {
////			if ( trigger ) {
////				trigger.Link( gameLocal.clip, this, 0, masterOrigin + localTriggerOrigin * masterAxis, localTriggerAxis * masterAxis );
////			}
////			if ( sndTrigger ) {
////				sndTrigger.Link( gameLocal.clip, this, 0, masterOrigin + localTriggerOrigin * masterAxis, localTriggerAxis * masterAxis );
////			}
////		}
////	}
////}
////
/*
================
idDoor::PreBind
================
*/
	PreBind ( ): void {
		super.PreBind ( );
	}

/*
================
idDoor::PostBind
================
*/
	PostBind ( ): void {
		super.PostBind ( );
		todoThrow ( )
		//this.GetLocalTriggerPosition( trigger ? trigger : sndTrigger );
	}

/////*
////================
////idDoor::SetAASAreaState
////================
////*/
////void idDoor::SetAASAreaState( bool closed ) {
////	aas_area_closed = closed;
////	gameLocal.SetAASAreaState( physicsObj.GetAbsBounds(), AREACONTENTS_CLUSTERPORTAL|AREACONTENTS_OBSTACLE, closed );
////}
////
/////*
////================
////idDoor::Hide
////================
////*/
////void idDoor::Hide( ) {
////	idMover_Binary *slave;
////	idMover_Binary *master;
////	idDoor *slaveDoor;
////	idDoor *companion;
////
////	master = GetMoveMaster();
////	if ( this != master ) {
////		master.Hide();
////	} else {
////		for ( slave = this; slave != NULL; slave = slave.GetActivateChain() ) {
////			if ( slave.IsType( idDoor::Type ) ) {
////				slaveDoor = static_cast<idDoor *>( slave );
////				companion = slaveDoor.companionDoor;
////				if ( companion && ( companion != master ) && ( companion.GetMoveMaster() != master ) ) {
////					companion.Hide();
////				}
////				if ( slaveDoor.trigger ) {
////					slaveDoor.trigger.Disable();
////				}
////				if ( slaveDoor.sndTrigger ) {
////					slaveDoor.sndTrigger.Disable();
////				}
////				if ( slaveDoor.areaPortal ) {
////					slaveDoor.SetPortalState( true );
////				}
////				slaveDoor.SetAASAreaState( false );
////			}
////			slave.GetPhysics().GetClipModel().Disable();
////			slave.idMover_Binary::Hide();
////		}
////	}
////}
////
/////*
////================
////idDoor::Show
////================
////*/
////void idDoor::Show( ) {
////	idMover_Binary *slave;
////	idMover_Binary *master;
////	idDoor *slaveDoor;
////	idDoor *companion;
////
////	master = GetMoveMaster();
////	if ( this != master ) {
////		master.Show();
////	} else {
////		for ( slave = this; slave != NULL; slave = slave.GetActivateChain() ) {
////			if ( slave.IsType( idDoor::Type ) ) {
////				slaveDoor = static_cast<idDoor *>( slave );
////				companion = slaveDoor.companionDoor;
////				if ( companion && ( companion != master ) && ( companion.GetMoveMaster() != master ) ) {
////					companion.Show();
////				}
////				if ( slaveDoor.trigger ) {
////					slaveDoor.trigger.Enable();
////				}
////				if ( slaveDoor.sndTrigger ) {
////					slaveDoor.sndTrigger.Enable();
////				}
////				if ( slaveDoor.areaPortal && ( slaveDoor.moverState == MOVER_POS1 ) ) {
////					slaveDoor.SetPortalState( false );
////				}
////				slaveDoor.SetAASAreaState( IsLocked() || IsNoTouch() );
////			}
////			slave.GetPhysics().GetClipModel().Enable();
////			slave.idMover_Binary::Show();
////		}
////	}
////}
////
/////*
////================
////idDoor::GetLocalTriggerPosition
////================
////*/
////void idDoor::GetLocalTriggerPosition( const idClipModel *trigger ) {
////	idVec3 origin;
////	idMat3 axis;
////
////	if ( !trigger ) {
////		return;
////	}
////
////	GetMasterPosition( origin, axis );
////	localTriggerOrigin = ( trigger.GetOrigin() - origin ) * axis.Transpose();
////	localTriggerAxis = trigger.GetAxis() * axis.Transpose();
////}
////
/////*
////================
////idDoor::Use
////================
////*/
////void idDoor::Use( other:idEntity, activator:idEntity ) {
////	if ( gameLocal.RequirementMet( activator, requires, removeItem ) ) {
////		if ( syncLock.Length() ) {
////			idEntity *sync = gameLocal.FindEntity( syncLock );
////			if ( sync && sync.IsType( idDoor::Type ) ) {
////				if ( static_cast<idDoor *>( sync ).IsOpen() ) {
////					return;
////				}
////			}
////		}
////		ActivateTargets( activator );
////		Use_BinaryMover( activator );
////	} 
////}
////
/////*
////================
////idDoor::Open
////================
////*/
////void idDoor::Open( ) {
////	GotoPosition2();
////}
////
/////*
////================
////idDoor::Close
////================
////*/
////void idDoor::Close( ) {
////	GotoPosition1();
////}
////
/////*
////================
////idDoor::Lock
////================
////*/
////void idDoor::Lock( int f ) {
////	idMover_Binary *other;
////
////	// lock all the doors on the team
////	for( other = moveMaster; other != NULL; other = other.GetActivateChain() ) {
////		if ( other.IsType( idDoor::Type ) ) {
////			idDoor *door = static_cast<idDoor *>( other );
////			if ( other == moveMaster ) {
////				if ( door.sndTrigger == NULL ) {
////					// in this case the sound trigger never got spawned
////					const char *sndtemp = door.spawnArgs.GetString( "snd_locked" );
////					if ( sndtemp && *sndtemp ) {
////						door.PostEventMS( &EV_Door_SpawnSoundTrigger, 0 );
////					}
////				}
////				if ( !f && ( door.spawnArgs.GetInt( "locked" ) != 0 ) ) {
////					door.StartSound( "snd_unlocked", SND_CHANNEL_ANY, 0, false, NULL );
////				}
////			}
////			door.spawnArgs.SetInt( "locked", f );
////			if ( ( f == 0 ) || ( !IsHidden() && ( door.moverState == MOVER_POS1 ) ) ) {
////				door.SetAASAreaState( f != 0 );
////			}
////		}
////	}
////
////	if ( f ) {
////		Close();
////	}
////}
////
/////*
////================
////idDoor::IsLocked
////================
////*/
////int idDoor::IsLocked( ) {
////	return this.spawnArgs.GetInt( "locked" );
////}
////
/////*
////================
////idDoor::IsOpen
////================
////*/
////bool idDoor::IsOpen( ) {
////	return ( moverState != MOVER_POS1 );
////}
////
/////*
////================
////idDoor::IsNoTouch
////================
////*/
////bool idDoor::IsNoTouch( ) {
////	return noTouch;
////}
////
/////*
////======================
////idDoor::CalcTriggerBounds
////
////Calcs bounds for a trigger.
////======================
////*/
////void idDoor::CalcTriggerBounds( float size, idBounds &bounds ) {
////	idMover_Binary	*other;
////	int				i;
////	int				best;
////
////	// find the bounds of everything on the team
////	bounds = this.GetPhysics().GetAbsBounds();
////	
////	fl.takedamage = true;
////	for( other = activateChain; other != NULL; other = other.GetActivateChain() ) {
////		if ( other.IsType( idDoor::Type ) ) {
////			// find the bounds of everything on the team
////			bounds.AddBounds( other.GetPhysics().GetAbsBounds() );
////
////			// set all of the slaves as shootable
////			other.fl.takedamage = true;
////		}
////	}
////
////	// find the thinnest axis, which will be the one we expand
////	best = 0;
////	for ( i = 1 ; i < 3 ; i++ ) {
////		if ( bounds[1][ i ] - bounds[0][ i ] < bounds[1][ best ] - bounds[0][ best ] ) {
////			best = i;
////		}
////	}
////	normalAxisIndex = best;
////	bounds[0][ best ] -= size;
////	bounds[1][ best ] += size;
////	bounds[0] -= this.GetPhysics().GetOrigin();
////	bounds[1] -= this.GetPhysics().GetOrigin();
////}
////
/////*
////======================
////idDoor::Event_StartOpen
////
////if "start_open", reverse position 1 and 2
////======================
////*/
////void idDoor::Event_StartOpen( ) {
////	var /*float*/time:number;
////	var /*float*/ speed:number
////
////	// if "start_open", reverse position 1 and 2
////	pos1 = pos2;
////	pos2 = this.GetPhysics().GetOrigin();
////
////	this.spawnArgs.GetFloat( "speed", "400", speed );
////
////	if ( this.spawnArgs.GetFloat( "time", "1", time ) ) {
////		InitTime( pos1, pos2, time, 0, 0 );
////	} else {
////		InitSpeed( pos1, pos2, speed, 0, 0 );
////	}
////}
////
/////*
////======================
////idDoor::Event_SpawnDoorTrigger
////
////All of the parts of a door have been spawned, so create
////a trigger that encloses all of them.
////======================
////*/
////void idDoor::Event_SpawnDoorTrigger( ) {
////	idBounds		bounds;
////	idMover_Binary	*other;
////	bool			toggle;
////
////	if ( trigger ) {
////		// already have a trigger, so don't spawn a new one.
////		return;
////	}
////
////	// check if any of the doors are marked as toggled
////	toggle = false;
////	for( other = moveMaster; other != NULL; other = other.GetActivateChain() ) {
////		if ( other.IsType( idDoor::Type ) && other.spawnArgs.GetBool( "toggle" ) ) {
////			toggle = true;
////			break;
////		}
////	}
////
////	if ( toggle ) {
////		// mark them all as toggled
////		for( other = moveMaster; other != NULL; other = other.GetActivateChain() ) {
////			if ( other.IsType( idDoor::Type ) ) {
////				other.spawnArgs.Set( "toggle", "1" );
////			}
////		}
////		// don't spawn trigger
////		return;
////	}
////
////	const char *sndtemp = this.spawnArgs.GetString( "snd_locked" );
////	if ( this.spawnArgs.GetInt( "locked" ) && sndtemp && *sndtemp ) {
////		this.PostEventMS( &EV_Door_SpawnSoundTrigger, 0 );
////	}
////
////	CalcTriggerBounds( triggersize, bounds );
////
////	// create a trigger clip model
////	trigger = new idClipModel( idTraceModel( bounds ) );
////	trigger.Link( gameLocal.clip, this, 255, this.GetPhysics().GetOrigin(), mat3_identity );
////	trigger.SetContents( CONTENTS_TRIGGER );
////
////	this.GetLocalTriggerPosition( trigger );
////
////	MatchActivateTeam( moverState, gameLocal.time );
////}
////
/////*
////======================
////idDoor::Event_SpawnSoundTrigger
////
////Spawn a sound trigger to activate locked sound if it exists.
////======================
////*/
////void idDoor::Event_SpawnSoundTrigger( ) {
////	idBounds bounds;
////
////	if ( sndTrigger ) {
////		return;
////	}
////
////	CalcTriggerBounds( triggersize * 0.5f, bounds );
////
////	// create a trigger clip model
////	sndTrigger = new idClipModel( idTraceModel( bounds ) );
////	sndTrigger.Link( gameLocal.clip, this, 254, this.GetPhysics().GetOrigin(), mat3_identity );
////	sndTrigger.SetContents( CONTENTS_TRIGGER );
////
////	this.GetLocalTriggerPosition( sndTrigger );
////}
////
/////*
////================
////idDoor::Event_Reached_BinaryMover
////================
////*/
////void idDoor::Event_Reached_BinaryMover( ) {
////	if ( moverState == MOVER_2TO1 ) {
////		SetBlocked( false );
////		const idKeyValue *kv = this.spawnArgs.MatchPrefix( "triggerClosed" );
////		while( kv ) {
////			var ent:idEntity = gameLocal.FindEntity( kv.GetValue() );
////			if ( ent ) {
////				ent.PostEventMS( &EV_Activate, 0, moveMaster.GetActivator() );
////			}
////			kv = this.spawnArgs.MatchPrefix( "triggerClosed", kv );
////		}
////	} else if ( moverState == MOVER_1TO2 ) {
////		const idKeyValue *kv = this.spawnArgs.MatchPrefix( "triggerOpened" );
////		while( kv ) {
////			var ent:idEntity = gameLocal.FindEntity( kv.GetValue() );
////			if ( ent ) {
////				ent.PostEventMS( &EV_Activate, 0, moveMaster.GetActivator() );
////			}
////			kv = this.spawnArgs.MatchPrefix( "triggerOpened", kv );
////		}
////	}
////	idMover_Binary::Event_Reached_BinaryMover();
////}
////
/////*
////================
////idDoor::Blocked_Door
////================
////*/
////void idDoor::Event_TeamBlocked(blockedEntity:idEntity , blockingEntity:idEntity  ) {
////	SetBlocked( true );
////
////	if ( crusher ) {
////		return;		// crushers don't reverse
////	}
////
////	// reverse direction
////	Use_BinaryMover( moveMaster.GetActivator() );
////
////	if ( companionDoor ) {
////		companionDoor.ProcessEvent( &EV_TeamBlocked, blockedEntity, blockingEntity );
////	}
////}
////
/////*
////===============
////idDoor::SetCompanion
////===============
////*/
////void idDoor::SetCompanion( idDoor *door ) {
////	companionDoor = door;
////}
////
/////*
////===============
////idDoor::Event_PartBlocked
////===============
////*/
////void idDoor::Event_PartBlocked( blockingEntity:idEntity  ) {
////	if ( damage > 0.0 ) {
////		blockingEntity.Damage( this, this, vec3_origin, "damage_moverCrush", damage, jointHandle_t.INVALID_JOINT );
////	}
////}
////
/////*
////================
////idDoor::Event_Touch
////================
////*/
////void idDoor::Event_Touch( other:idEntity, trace:trace_t ) {
////	idVec3		contact, translate;
////	idVec3		planeaxis1, planeaxis2, normal;
////	idBounds	bounds;
////
////	if ( !enabled ) {
////		return;
////	}
////
////	if ( trigger && trace.c.id == trigger.GetId() ) {
////		if ( !IsNoTouch() && !IsLocked() && GetMoverState() != MOVER_1TO2 ) {
////			Use( this, other );
////		}
////	} else if ( sndTrigger && trace.c.id == sndTrigger.GetId() ) {
////		if ( other && other.IsType( idPlayer::Type ) && IsLocked() && gameLocal.time > nextSndTriggerTime ) {
////			StartSound( "snd_locked", SND_CHANNEL_ANY, 0, false, NULL );
////			nextSndTriggerTime = gameLocal.time + 10000;
////		}
////	}
////}
////
/////*
////================
////idDoor::Event_SpectatorTouch
////================
////*/
////void idDoor::Event_SpectatorTouch( other:idEntity, trace:trace_t ) {
////	idVec3		contact, translate, normal;
////	idBounds	bounds;
////	idPlayer	*p;
////
////	assert( other && other.IsType( idPlayer::Type ) && static_cast< idPlayer * >( other ).spectating );
////
////	p = static_cast< idPlayer * >( other );
////	// avoid flicker when stopping right at clip box boundaries
////	if ( p.lastSpectateTeleport > gameLocal.time - 1000 ) {
////		return;
////	}
////	if ( trigger && !IsOpen() ) {
////		// teleport to the other side, center to the middle of the trigger brush
////		bounds = trigger.GetAbsBounds();
////		contact = trace.endpos - bounds.GetCenter();
////		translate = bounds.GetCenter();
////		normal.Zero();
////		normal[ normalAxisIndex ] = 1.0;
////		if ( normal * contact > 0 ) {
////			translate[ normalAxisIndex ] += ( bounds[ 0 ][ normalAxisIndex ] - translate[ normalAxisIndex ] ) * 0.5f;
////		} else {
////			translate[ normalAxisIndex ] += ( bounds[ 1 ][ normalAxisIndex ] - translate[ normalAxisIndex ] ) * 0.5f;
////		}
////		p.SetOrigin( translate );
////		p.lastSpectateTeleport = gameLocal.time;
////	}
////}
////
/////*
////================
////idDoor::Event_Activate
////================
////*/
////void idDoor::Event_Activate( activator:idEntity ) {
////	int old_lock;
////
////	if ( this.spawnArgs.GetInt( "locked" ) ) {
////		if ( !trigger ) {
////			this.PostEventMS( &EV_Door_SpawnDoorTrigger, 0 );
////		}
////		if ( buddyStr.Length() ) {
////			idEntity *buddy = gameLocal.FindEntity( buddyStr );
////			if ( buddy ) {
////				buddy.SetShaderParm( SHADERPARM_MODE, 1 );
////				buddy.UpdateVisuals();
////			}
////		}
////
////		old_lock = this.spawnArgs.GetInt( "locked" );
////		Lock( 0 );
////		if ( old_lock == 2 ) {
////			return;
////		}
////	}
////
////  	if ( syncLock.Length() ) {
////		idEntity *sync = gameLocal.FindEntity( syncLock );
////		if ( sync && sync.IsType( idDoor::Type ) ) {
////			if ( static_cast<idDoor *>( sync ).IsOpen() ) {
////  				return;
////  			}
////  		}
////	}
////
////	ActivateTargets( activator );
////
////	this.renderEntity.shaderParms[ SHADERPARM_MODE ] = 1;
////	UpdateVisuals();
////
////	Use_BinaryMover( activator );
////}
////
/////*
////================
////idDoor::Event_Open
////================
////*/
////void idDoor::Event_Open( ) {
////	Open();
////}
////
/////*
////================
////idDoor::Event_Close
////================
////*/
////void idDoor::Event_Close( ) {
////	Close();
////}
////
/////*
////================
////idDoor::Event_Lock
////================
////*/
////void idDoor::Event_Lock( int f ) {
////	Lock( f );
////}
////
/////*
////================
////idDoor::Event_IsOpen
////================
////*/
////void idDoor::Event_IsOpen( ) {
////	bool state;
////
////	state = IsOpen();
////	idThread::ReturnFloat( state );
////}
////
/////*
////================
////idDoor::Event_Locked
////================
////*/
////void idDoor::Event_Locked( ) {
////	idThread::ReturnFloat( this.spawnArgs.GetInt("locked") );
////}
////
/////*
////================
////idDoor::Event_OpenPortal
////
////Sets the portal associtated with this door to be open
////================
////*/
////void idDoor::Event_OpenPortal( ) {
////	idMover_Binary *slave;
////	idDoor *slaveDoor;
////
////	for ( slave = this; slave != NULL; slave = slave.GetActivateChain() ) {
////		if ( slave.IsType( idDoor::Type ) ) {
////			slaveDoor = static_cast<idDoor *>( slave );
////			if ( slaveDoor.areaPortal ) {
////				slaveDoor.SetPortalState( true );
////			}
////			slaveDoor.SetAASAreaState( false );
////		}
////	}
////}
////
/////*
////================
////idDoor::Event_ClosePortal
////
////Sets the portal associtated with this door to be closed
////================
////*/
////void idDoor::Event_ClosePortal( ) {
////	idMover_Binary *slave;
////	idDoor *slaveDoor;
////
////	for ( slave = this; slave != NULL; slave = slave.GetActivateChain() ) {
////		if ( !slave.IsHidden() ) {
////			if ( slave.IsType( idDoor::Type ) ) {
////				slaveDoor = static_cast<idDoor *>( slave );
////				if ( slaveDoor.areaPortal ) {
////					slaveDoor.SetPortalState( false );
////				}
////				slaveDoor.SetAASAreaState( IsLocked() || IsNoTouch() );
////			}
////		}
////	}
////}
////
};

class idPlat extends idMover_Binary {
////public:
////	CLASS_PROTOTYPE( idPlat );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idPlat>[];

////							idPlat( );
////							~idPlat( );

////	void					Spawn( ): void {throw "placeholder";}

////	void					Save( idSaveGame *savefile ) const;
////	void					Restore( idRestoreGame *savefile );

////	virtual void			Think( ): void {throw "placeholder";}
////	virtual void			PreBind( ): void {throw "placeholder";}
////	virtual void			PostBind( ): void {throw "placeholder";}

////private:
////	idClipModel *			trigger;
////	idVec3					localTriggerOrigin;
////	idMat3					localTriggerAxis;

////	void					GetLocalTriggerPosition( const idClipModel *trigger );
////	void					SpawnPlatTrigger( pos:idVec3 );

	Event_TeamBlocked(blockedEntity: idEntity, blockingEntity: idEntity ): void { throw "placeholder"; }
	Event_PartBlocked(blockingEntity: idEntity ): void { throw "placeholder"; }
	Event_Touch(other: idEntity, trace: trace_t): void { throw "placeholder"; }

	
/////*
////===============
////idPlat::idPlat
////===============
////*/
////idPlat::idPlat( ) {
////	trigger = NULL;
////	localTriggerOrigin.Zero();
////	localTriggerAxis.Identity();
////}
////
/////*
////===============
////idPlat::~idPlat
////===============
////*/
////idPlat::~idPlat( ) {
////	if ( trigger ) {
////		delete trigger;
////	}
////}
////
/////*
////===============
////idPlat::Save
////===============
////*/
////void idPlat::Save( idSaveGame *savefile ) const {
////	savefile.WriteClipModel( trigger );
////	savefile.WriteVec3( localTriggerOrigin );
////	savefile.WriteMat3( localTriggerAxis );
////}
////
/////*
////===============
////idPlat::Restore
////===============
////*/
////void idPlat::Restore( idRestoreGame *savefile ) {
////	savefile.ReadClipModel( trigger );
////	savefile.ReadVec3( localTriggerOrigin );
////	savefile.ReadMat3( localTriggerAxis );
////}
////
/////*
////===============
////idPlat::Spawn
////===============
////*/
	Spawn(): void {
		todoThrow();
////	float	lip;
////	float	height;
////	float	time;
////	float	speed;
////	float	accel;
////	float	decel;
////	bool	noTouch;
////
////	this.spawnArgs.GetFloat( "speed", "100", speed );
////	this.spawnArgs.GetFloat( "damage", "0", damage );
////	this.spawnArgs.GetFloat( "wait", "1", wait );
////	this.spawnArgs.GetFloat( "lip", "8", lip );
////	this.spawnArgs.GetFloat( "accel_time", "0.25", accel );
////	this.spawnArgs.GetFloat( "decel_time", "0.25", decel );
////
////	// create second position
////	if ( !this.spawnArgs.GetFloat( "height", "0", height ) ) {
////		height = ( this.GetPhysics().GetBounds()[1][2] - this.GetPhysics().GetBounds()[0][2] ) - lip;
////	}
////
////	this.spawnArgs.GetBool( "no_touch", "0", noTouch );
////
////	// pos1 is the rest (bottom) position, pos2 is the top
////	pos2 = this.GetPhysics().GetOrigin();
////	pos1 = pos2;
////	pos1[2] -= height;
////
////	if ( this.spawnArgs.GetFloat( "time", "1", time ) ) {
////		InitTime( pos1, pos2, time, accel, decel );
////	} else {
////		InitSpeed( pos1, pos2, speed, accel, decel );
////	}
////
////	SetMoverState( MOVER_POS1, gameLocal.time );
////	UpdateVisuals();
////
////	// spawn the trigger if one hasn't been custom made
////	if ( !noTouch ) {
////		// spawn trigger
////		SpawnPlatTrigger( pos1 );
////	}
}
////
/////*
////================
////idPlat::Think
////================
////*/
////void idPlat::Think( ) {
////	idVec3 masterOrigin;
////	idMat3 masterAxis;
////
////	idMover_Binary::Think();
////
////	if ( thinkFlags & TH_PHYSICS ) {
////		// update trigger position
////		if ( GetMasterPosition( masterOrigin, masterAxis ) ) {
////			if ( trigger ) {
////				trigger.Link( gameLocal.clip, this, 0, masterOrigin + localTriggerOrigin * masterAxis, localTriggerAxis * masterAxis );
////			}
////		}
////	}
////}
////
/*
================
idPlat::PreBind
================
*/
	PreBind ( ): void {
		super.PreBind ( );
	}

/*
================
idPlat::PostBind
================
*/
	PostBind ( ) {
		super.PostBind ( );
		todoThrow ( );
		//this.GetLocalTriggerPosition( trigger );
	}

/////*
////================
////idPlat::GetLocalTriggerPosition
////================
////*/
////void idPlat::GetLocalTriggerPosition( const idClipModel *trigger ) {
////	idVec3 origin;
////	idMat3 axis;
////
////	if ( !trigger ) {
////		return;
////	}
////
////	GetMasterPosition( origin, axis );
////	localTriggerOrigin = ( trigger.GetOrigin() - origin ) * axis.Transpose();
////	localTriggerAxis = trigger.GetAxis() * axis.Transpose();
////}
////
/////*
////==============
////idPlat::SpawnPlatTrigger
////===============
////*/
////void idPlat::SpawnPlatTrigger( pos:idVec3 ) {
////	idBounds		bounds;
////	idVec3			tmin;
////	idVec3			tmax;
////
////	// the middle trigger will be a thin trigger just
////	// above the starting position
////
////	bounds = this.GetPhysics().GetBounds();
////
////	tmin[0] = bounds[0][0] + 33;
////	tmin[1] = bounds[0][1] + 33;
////	tmin[2] = bounds[0][2];
////
////	tmax[0] = bounds[1][0] - 33;
////	tmax[1] = bounds[1][1] - 33;
////	tmax[2] = bounds[1][2] + 8;
////
////	if ( tmax[0] <= tmin[0] ) {
////		tmin[0] = ( bounds[0][0] + bounds[1][0] ) * 0.5f;
////		tmax[0] = tmin[0] + 1;
////	}
////	if ( tmax[1] <= tmin[1] ) {
////		tmin[1] = ( bounds[0][1] + bounds[1][1] ) * 0.5f;
////		tmax[1] = tmin[1] + 1;
////	}
////	
////	trigger = new idClipModel( idTraceModel( idBounds( tmin, tmax ) ) );
////	trigger.Link( gameLocal.clip, this, 255, this.GetPhysics().GetOrigin(), mat3_identity );
////	trigger.SetContents( CONTENTS_TRIGGER );
////}
////
/////*
////==============
////idPlat::Event_Touch
////===============
////*/
////void idPlat::Event_Touch( other:idEntity, trace:trace_t ) {
////	if ( !other.IsType( idPlayer::Type ) ) {
////		return;
////	}
////
////	if ( ( GetMoverState() == MOVER_POS1 ) && trigger && ( trace.c.id == trigger.GetId() ) && ( other.health > 0 ) ) {
////		Use_BinaryMover( other );
////	}
////}
////
/////*
////================
////idPlat::Event_TeamBlocked
////================
////*/
////void idPlat::Event_TeamBlocked(blockedEntity:idEntity , blockingEntity:idEntity  ) {
////	// reverse direction
////	Use_BinaryMover( activatedBy.GetEntity() );
////}
////
/////*
////===============
////idPlat::Event_PartBlocked
////===============
////*/
////void idPlat::Event_PartBlocked( blockingEntity:idEntity  ) {
////	if ( damage > 0.0 ) {
////		blockingEntity.Damage( this, this, vec3_origin, "damage_moverCrush", damage, jointHandle_t.INVALID_JOINT );
////	}
////}
////
};


/*
===============================================================================

  Special periodic movers.

===============================================================================
*/

class idMover_Periodic extends idEntity {
////public:
////	CLASS_PROTOTYPE( idMover_Periodic );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idMover_Periodic>[];

////							idMover_Periodic( );

////	void					Spawn( );
	
////	void					Save( idSaveGame *savefile ) const;
////	void					Restore( idRestoreGame *savefile );

	Think( ): void {throw "placeholder";}

////	virtual void			WriteToSnapshot( idBitMsgDelta &msg ) const;
////	virtual void			ReadFromSnapshot( const idBitMsgDelta &msg );

////protected:
////	idPhysics_Parametric	physicsObj;
////	float					damage;

	Event_TeamBlocked(blockedEntity:idEntity , blockingEntity:idEntity  ): void { throw "placeholder"; }
	Event_PartBlocked(blockingEntity: idEntity): void { throw "placeholder"; }

	
/////*
////===============
////idMover_Periodic::idMover_Periodic
////===============
////*/
////idMover_Periodic::idMover_Periodic( ) {
////	damage = 0.0;
////	fl.neverDormant	= false;
////}
////
/////*
////===============
////idMover_Periodic::Spawn
////===============
////*/
	Spawn(): void {
		todoThrow();
////	this.spawnArgs.GetFloat( "damage", "0", damage );
////	if ( !this.spawnArgs.GetBool( "solid", "1" ) ) {
////		this.GetPhysics().SetContents( 0 );
////	}
}
////
/////*
////===============
////idMover_Periodic::Save
////===============
////*/
////void idMover_Periodic::Save( idSaveGame *savefile ) const {
////	savefile.WriteFloat( damage );
////	savefile.WriteStaticObject( this.physicsObj );
////}
////
/////*
////===============
////idMover_Periodic::Restore
////===============
////*/
////void idMover_Periodic::Restore( idRestoreGame *savefile ) {
////	savefile.ReadFloat( damage );
////	savefile.ReadStaticObject( this.physicsObj );
////	RestorePhysics( &this.physicsObj );
////}
////
/////*
////================
////idMover_Periodic::Think
////================
////*/
////void idMover_Periodic::Think( ) {
////	// if we are completely closed off from the player, don't do anything at all
////	if ( CheckDormant() ) {
////		return;
////	}
////
////	RunPhysics();
////	Present();
////}
////
/////*
////===============
////idMover_Periodic::Event_TeamBlocked
////===============
////*/
////void idMover_Periodic::Event_TeamBlocked(blockedEntity:idEntity , blockingEntity:idEntity  ) {
////}
////
/////*
////===============
////idMover_Periodic::Event_PartBlocked
////===============
////*/
////void idMover_Periodic::Event_PartBlocked( blockingEntity:idEntity  ) {
////	if ( damage > 0.0 ) {
////		blockingEntity.Damage( this, this, vec3_origin, "damage_moverCrush", damage, jointHandle_t.INVALID_JOINT );
////	}
////}
////
/////*
////================
////idMover_Periodic::WriteToSnapshot
////================
////*/
////void idMover_Periodic::WriteToSnapshot( idBitMsgDelta &msg ) const {
////	this.physicsObj.WriteToSnapshot( msg );
////	WriteBindToSnapshot( msg );
////}
////
/////*
////================
////idMover_Periodic::ReadFromSnapshot
////================
////*/
////void idMover_Periodic::ReadFromSnapshot( const idBitMsgDelta &msg ) {
////	this.physicsObj.ReadFromSnapshot( msg );
////	ReadBindFromSnapshot( msg );
////
////	if ( msg.HasChanged() ) {
////		UpdateVisuals();
////	}
////}
////
};

class idRotater extends idMover_Periodic {
////public:
////	CLASS_PROTOTYPE( idRotater );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idRotater>[];

////							idRotater( );

////	void					Spawn( ): void {throw "placeholder";}

////	void					Save( idSaveGame *savefile ) const;
////	void					Restore( idRestoreGame *savefile );

////private:
////	idEntityPtr<idEntity>	activatedBy;

	Event_Activate(activator: idEntity): void { throw "placeholder"; }

	
/////*
////===============
////idRotater::idRotater
////===============
////*/
////idRotater::idRotater( ) {
////	activatedBy = this;
////}
////
/////*
////===============
////idRotater::Spawn
////===============
////*/
	Spawn(): void {
		todoThrow();
////	this.physicsObj.SetSelf( this );
////	this.physicsObj.SetClipModel( new idClipModel( this.GetPhysics().GetClipModel() ), 1.0 );
////	this.physicsObj.SetOrigin( this.GetPhysics().GetOrigin() );
////	this.physicsObj.SetAxis( this.GetPhysics().GetAxis() );
////	this.physicsObj.SetClipMask( MASK_SOLID );
////	if ( !this.spawnArgs.GetBool( "nopush" ) ) {
////		this.physicsObj.SetPusher( 0 );
////	}
////	this.physicsObj.SetLinearExtrapolation( EXTRAPOLATION_NONE, gameLocal.time, 0, this.GetPhysics().GetOrigin(), vec3_origin, vec3_origin );
////	this.physicsObj.SetAngularExtrapolation( extrapolation_t(EXTRAPOLATION_LINEAR|EXTRAPOLATION_NOSTOP), gameLocal.time, 0, this.GetPhysics().GetAxis().ToAngles(), ang_zero, ang_zero );
////	this.SetPhysics( &this.physicsObj );
////
////	if ( this.spawnArgs.GetBool( "start_on" ) ) {
////		ProcessEvent( &EV_Activate, this );
////	}
}
////
/////*
////===============
////idRotater::Save
////===============
////*/
////void idRotater::Save( idSaveGame *savefile ) const {
////	activatedBy.Save( savefile );
////}
////
/////*
////===============
////idRotater::Restore
////===============
////*/
////void idRotater::Restore( idRestoreGame *savefile ) {
////	activatedBy.Restore( savefile );
////}
////
/////*
////===============
////idRotater::Event_Activate
////===============
////*/
////void idRotater::Event_Activate( activator:idEntity ) {
////	float		speed;
////	bool		x_axis;
////	bool		y_axis;
////	idAngles	delta;
////
////	activatedBy = activator;
////
////	delta.Zero();
////
////	if ( !this.spawnArgs.GetBool( "rotate" ) ) {
////		this.spawnArgs.Set( "rotate", "1" );
////		this.spawnArgs.GetFloat( "speed", "100", speed );
////		this.spawnArgs.GetBool( "x_axis", "0", x_axis );
////		this.spawnArgs.GetBool( "y_axis", "0", y_axis );
////		
////		// set the axis of rotation
////		if ( x_axis ) {
////			delta[2] = speed;
////		} else if ( y_axis ) {
////			delta[0] = speed;
////		} else {
////			delta[1] = speed;
////		}
////	} else {
////		this.spawnArgs.Set( "rotate", "0" );
////	}
////
////	this.physicsObj.SetAngularExtrapolation( extrapolation_t(EXTRAPOLATION_LINEAR|EXTRAPOLATION_NOSTOP), gameLocal.time, 0, this.physicsObj.GetAxis().ToAngles(), delta, ang_zero );
////}
////
};

class idBobber extends idMover_Periodic {
////public:
////	CLASS_PROTOTYPE( idBobber );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idBobber>[];

////	void					Spawn( ): void {throw "placeholder";}

////private:

	
/////*
////===============
////idBobber::idBobber
////===============
////*/
////idBobber::idBobber( ) {
////}
////
/////*
////===============
////idBobber::Spawn
////===============
////*/
	Spawn(): void {
		todoThrow();
////	float	speed;
////	float	height;
////	float	phase;
////	bool	x_axis;
////	bool	y_axis;
////	idVec3	delta;
////
////	this.spawnArgs.GetFloat( "speed", "4", speed );
////	this.spawnArgs.GetFloat( "height", "32", height );
////	this.spawnArgs.GetFloat( "phase", "0", phase );
////	this.spawnArgs.GetBool( "x_axis", "0", x_axis );
////	this.spawnArgs.GetBool( "y_axis", "0", y_axis );
////
////	// set the axis of bobbing
////	delta = vec3_origin;
////	if ( x_axis ) {
////		delta[ 0 ] = height;
////	} else if ( y_axis ) {
////		delta[ 1 ] = height;
////	} else {
////		delta[ 2 ] = height;
////	}
////
////	this.physicsObj.SetSelf( this );
////	this.physicsObj.SetClipModel( new idClipModel( this.GetPhysics().GetClipModel() ), 1.0 );
////	this.physicsObj.SetOrigin( this.GetPhysics().GetOrigin() );
////	this.physicsObj.SetAxis( this.GetPhysics().GetAxis() );
////	this.physicsObj.SetClipMask( MASK_SOLID );
////	if ( !this.spawnArgs.GetBool( "nopush" ) ) {
////		this.physicsObj.SetPusher( 0 );
////	}
////	this.physicsObj.SetLinearExtrapolation( extrapolation_t(EXTRAPOLATION_DECELSINE|EXTRAPOLATION_NOSTOP), phase * 1000, speed * 500, this.GetPhysics().GetOrigin(), delta * 2.0, vec3_origin );
////	this.SetPhysics( &this.physicsObj );
}
////
////
};

class idPendulum extends idMover_Periodic {
////public:
////	CLASS_PROTOTYPE( idPendulum );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idPendulum>[];

////							idPendulum( );

////	void					Spawn( );

////private:


/////*
////===============
////idPendulum::idPendulum
////===============
////*/
////idPendulum::idPendulum( ) {
////}
////
/////*
////===============
////idPendulum::Spawn
////===============
////*/
	Spawn ( ): void {
		todoThrow ( );
////	float	speed;
////	float	freq;
////	float	length;
////	float	phase;
////
////	this.spawnArgs.GetFloat( "speed", "30", speed );
////	this.spawnArgs.GetFloat( "phase", "0", phase );
////
////	if ( this.spawnArgs.GetFloat( "freq", "", freq ) ) {
////		if ( freq <= 0.0 ) {
////			gameLocal.Error( "Invalid frequency on entity '%s'", GetName() );
////		}
////	} else {
////		// find pendulum length
////		length = idMath::Fabs( this.GetPhysics().GetBounds()[0][2] );
////		if ( length < 8 ) {
////			length = 8;
////		}
////
////		freq = 1 / ( idMath::TWO_PI ) * idMath::Sqrt( g_gravity.GetFloat() / ( 3 * length ) );
////	}
////
////	this.physicsObj.SetSelf( this );
////	this.physicsObj.SetClipModel( new idClipModel( this.GetPhysics().GetClipModel() ), 1.0 );
////	this.physicsObj.SetOrigin( this.GetPhysics().GetOrigin() );
////	this.physicsObj.SetAxis( this.GetPhysics().GetAxis() );
////	this.physicsObj.SetClipMask( MASK_SOLID );
////	if ( !this.spawnArgs.GetBool( "nopush" ) ) {
////		this.physicsObj.SetPusher( 0 );
////	}
////	this.physicsObj.SetLinearExtrapolation( EXTRAPOLATION_NONE, 0, 0, this.GetPhysics().GetOrigin(), vec3_origin, vec3_origin );
////	this.physicsObj.SetAngularExtrapolation( extrapolation_t(EXTRAPOLATION_DECELSINE|EXTRAPOLATION_NOSTOP), phase * 1000, 500/freq, this.GetPhysics().GetAxis().ToAngles(), idAngles( 0, 0, speed * 2.0 ), ang_zero );
////	this.SetPhysics( &this.physicsObj );
	}
}

class idRiser extends idMover_Periodic {
////public:
////	CLASS_PROTOTYPE( idRiser );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idRiser>[];

////	idRiser( );

////	void					Spawn( );

////private:
	Event_Activate(activator: idEntity): void { throw "placeholder"; }


	/////*
	////===============
	////idRiser::idRiser
	////===============
	////*/
	////idRiser::idRiser( ) {
	////}
	////
	/////*
	////===============
	////idRiser::Spawn
	////===============
	////*/
	Spawn(): void {
		todoThrow();
		////	this.physicsObj.SetSelf( this );
		////	this.physicsObj.SetClipModel( new idClipModel( this.GetPhysics().GetClipModel() ), 1.0 );
		////	this.physicsObj.SetOrigin( this.GetPhysics().GetOrigin() );
		////	this.physicsObj.SetAxis( this.GetPhysics().GetAxis() );
		////
		////	this.physicsObj.SetClipMask( MASK_SOLID );
		////	if ( !this.spawnArgs.GetBool( "solid", "1" ) ) {
		////		this.physicsObj.SetContents( 0 );
		////	}
		////	if ( !this.spawnArgs.GetBool( "nopush" ) ) {
		////		this.physicsObj.SetPusher( 0 );
		////	}
		////	this.physicsObj.SetLinearExtrapolation( EXTRAPOLATION_NONE, 0, 0, this.GetPhysics().GetOrigin(), vec3_origin, vec3_origin );
		////	this.SetPhysics( &this.physicsObj );
	}
////
/////*
////================
////idRiser::Event_Activate
////================
////*/
////void idRiser::Event_Activate( activator:idEntity ) {
////
////	if ( !IsHidden() && this.spawnArgs.GetBool("hide")  ) {
////		Hide();
////	} else {
////		Show();
////		float	time;
////		float	height;
////		idVec3	delta;
////
////		this.spawnArgs.GetFloat( "time", "4", time );
////		this.spawnArgs.GetFloat( "height", "32", height );
////
////		delta = vec3_origin;
////		delta[ 2 ] = height;
////
////		this.physicsObj.SetLinearExtrapolation( EXTRAPOLATION_LINEAR, gameLocal.time, time * 1000, this.physicsObj.GetOrigin(), delta, vec3_origin );
////	}
////}

};

////#endif /* !__GAME_MOVER_H__ */
