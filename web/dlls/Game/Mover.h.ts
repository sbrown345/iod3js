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

class idMover extends idEntity {
////public:
////	CLASS_PROTOTYPE( idMover );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idMover>[];

////							idMover( void );

////	void					Spawn( void );

////	void					Save( idSaveGame *savefile ) const;
////	void					Restore( idRestoreGame *savefile );

////	virtual void			Killed( idEntity *inflictor, idEntity *attacker, int damage, const idVec3 &dir, int location );

////	virtual void			WriteToSnapshot( idBitMsgDelta &msg ) const;
////	virtual void			ReadFromSnapshot( const idBitMsgDelta &msg );

////	virtual void			Hide( void );
////	virtual void			Show( void );

////	void					SetPortalState( bool open );

////protected:
////	typedef enum {
////		ACCELERATION_STAGE,
////		LINEAR_STAGE,
////		DECELERATION_STAGE,
////		FINISHED_STAGE
////	} moveStage_t;

////	typedef enum {
////		MOVER_NONE,
////		MOVER_ROTATING,
////		MOVER_MOVING,
////		MOVER_SPLINE
////	} moverCommand_t;

////	//
////	// mover directions.  make sure to change script/doom_defs.script if you add any, or change their order
////	//
////	typedef enum {
////		DIR_UP				= -1,
////		DIR_DOWN			= -2,
////		DIR_LEFT			= -3,
////		DIR_RIGHT			= -4,
////		DIR_FORWARD			= -5,
////		DIR_BACK			= -6,
////		DIR_REL_UP			= -7,
////		DIR_REL_DOWN		= -8,
////		DIR_REL_LEFT		= -9,
////		DIR_REL_RIGHT		= -10,
////		DIR_REL_FORWARD		= -11,
////		DIR_REL_BACK		= -12
////	} moverDir_t;

////	typedef struct {
////		moveStage_t			stage;
////		int					acceleration;
////		int					movetime;
////		int					deceleration;
////		idVec3				dir;
////	} moveState_t;

////	typedef struct {
////		moveStage_t			stage;
////		int					acceleration;
////		int					movetime;
////		int					deceleration;
////		idAngles			rot;
////	} rotationState_t;

////	idPhysics_Parametric	physicsObj;

	Event_OpenPortal( ): void { throw "placeholder"; }
	Event_ClosePortal( ): void { throw "placeholder"; }
	Event_PartBlocked( blockingEntity:idEntity  ): void { throw "placeholder"; }

////	void					MoveToPos( pos:idVec3): void { throw "placeholder"; }
////	void					UpdateMoveSound( moveStage_t stage ): void { throw "placeholder"; }
////	void					UpdateRotationSound( moveStage_t stage ): void { throw "placeholder"; }
////	void					SetGuiStates( const char *state ): void { throw "placeholder"; }
////	void					FindGuiTargets( ): void { throw "placeholder"; }
////	void					SetGuiState( const char *key, const char *val ) const;

////	virtual void			DoneMoving( ): void {throw "placeholder";}
////	virtual void			DoneRotating( ): void {throw "placeholder";}
////	virtual void			BeginMove( idThread *thread = NULL );
////	virtual void			BeginRotation( idThread *thread, bool stopwhendone );
////	moveState_t				move;

////private:
////	rotationState_t			rot;

////	int						move_thread;
////	int						rotate_thread;
////	idAngles				dest_angles;
////	idAngles				angle_delta;
////	idVec3					dest_position;
////	idVec3					move_delta;
////	float					move_speed;
////	int						move_time;
////	int						deceltime;
////	int						acceltime;
////	bool					stopRotation;
////	bool					useSplineAngles;
////	idEntityPtr<idEntity>	splineEnt;
////	moverCommand_t			lastCommand;
////	float					damage;

////	qhandle_t				areaPortal;		// 0 = no portal

////	idList< idEntityPtr<idEntity> >	guiTargets;

////	void					VectorForDir( float dir, idVec3 &vec );
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
	Event_IsRotating( ): void { throw "placeholder"; }
};

class idSplinePath extends idEntity {
////public:
////	CLASS_PROTOTYPE( idSplinePath );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idSplinePath>[];

////							idSplinePath();

////	void					Spawn( ): void {throw "placeholder";}
};


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

////							idElevator( void );

////	void					Spawn();

////	void					Save( idSaveGame *savefile ) const;
////	void					Restore( idRestoreGame *savefile );

////	virtual bool			HandleSingleGuiCommand( idEntity *entityGui, idLexer *src );
	Event_GotoFloor(/*int*/ floor:number): void { throw "placeholder"; }
////	floorInfo_s *			GetFloorInfo( int floor );

////protected:
////	virtual void			DoneMoving( void );
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

////	class idDoor *			GetDoor( const char *name );
////	void					Think( ): void {throw "placeholder";}
////	void					OpenInnerDoor( ): void {throw "placeholder";}
////	void					OpenFloorDoor( int floor );
////	void					CloseAllDoors( ): void {throw "placeholder";}
////	void					DisableAllDoors( ): void {throw "placeholder";}
////	void					EnableProperDoors( ): void {throw "placeholder";}

	Event_TeamBlocked(blockedEntity: idEntity, blockingEntity: idEntity): void { throw "placeholder"; }
	Event_Activate(activator: idEntity): void { throw "placeholder"; }
	Event_PostFloorArrival(): void { throw "placeholder"; }

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
////	idMover_Binary *		GetActivateChain( void ) const { return activateChain; }
////	idMover_Binary *		GetMoveMaster( void ) const { return moveMaster; }
////	void					BindTeam( idEntity *bindTo );
////	void					SetBlocked( bool b );
////	bool					IsBlocked( ): void {throw "placeholder";}
////	idEntity *				GetActivator( void ) const;

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
////	moverState_t			GetMoverState( void ) const { return moverState; }
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
};

class idDoor extends idMover_Binary {
////public:
////	CLASS_PROTOTYPE( idDoor );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idDoor>[];

////							idDoor( void );
////							~idDoor( void );

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
	Event_ClosePortal( ): void { throw "placeholder"; }
};

class idPlat extends idMover_Binary {
////public:
////	CLASS_PROTOTYPE( idPlat );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idPlat>[];

////							idPlat( void );
////							~idPlat( void );

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
	Event_Touch( other:idEntity, trace:trace_t ): void { throw "placeholder"; }
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

////							idMover_Periodic( void );

////	void					Spawn( void );
	
////	void					Save( idSaveGame *savefile ) const;
////	void					Restore( idRestoreGame *savefile );

	Think( ): void {throw "placeholder";}

////	virtual void			WriteToSnapshot( idBitMsgDelta &msg ) const;
////	virtual void			ReadFromSnapshot( const idBitMsgDelta &msg );

////protected:
////	idPhysics_Parametric	physicsObj;
////	float					damage;

	Event_TeamBlocked(blockedEntity:idEntity , blockingEntity:idEntity  ): void { throw "placeholder"; }
	Event_PartBlocked( blockingEntity:idEntity  ): void { throw "placeholder"; }
};

class idRotater extends idMover_Periodic {
////public:
////	CLASS_PROTOTYPE( idRotater );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idRotater>[];

////							idRotater( void );

////	void					Spawn( ): void {throw "placeholder";}

////	void					Save( idSaveGame *savefile ) const;
////	void					Restore( idRestoreGame *savefile );

////private:
////	idEntityPtr<idEntity>	activatedBy;

	Event_Activate(activator: idEntity): void { throw "placeholder"; }
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
};

class idPendulum extends idMover_Periodic {
////public:
////	CLASS_PROTOTYPE( idPendulum );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idPendulum>[];

////							idPendulum( void );

////	void					Spawn( void );

////private:
};

class idRiser extends idMover_Periodic {
////public:
////	CLASS_PROTOTYPE( idRiser );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idRiser>[];

////	idRiser( void );

////	void					Spawn( void );

////private:
	Event_Activate( activator:idEntity ): void { throw "placeholder"; }
};

////#endif /* !__GAME_MOVER_H__ */
