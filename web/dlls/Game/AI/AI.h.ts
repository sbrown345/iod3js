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
////#ifndef __AI_H__
////#define __AI_H__
////
/*
===============================================================================

	idAI

===============================================================================
*/

var /*float*/SQUARE_ROOT_OF_2			= 1.414213562;
var /*float*/AI_TURN_PREDICTION			= 0.2;
var /*float*/AI_TURN_SCALE				= 60.0;
var /*float*/AI_SEEK_PREDICTION			= 0.3;
var /*float*/AI_FLY_DAMPENING			= 0.15;
var /*float*/AI_HEARING_RANGE			= 2048.0;
var /*int*/DEFAULT_FLY_OFFSET			= 68;

var ATTACK_IGNORE = 0;
var ATTACK_ON_DAMAGE = 1;
var ATTACK_ON_ACTIVATE = 2;
var ATTACK_ON_SIGHT = 4;

// defined in script/ai_base.script.  please keep them up to date.
enum moveType_t{
	MOVETYPE_DEAD,
	MOVETYPE_ANIM,
	MOVETYPE_SLIDE,
	MOVETYPE_FLY,
	MOVETYPE_STATIC,
	NUM_MOVETYPES
}

enum moveCommand_t{
	MOVE_NONE,
	MOVE_FACE_ENEMY,
	MOVE_FACE_ENTITY,

	// commands < NUM_NONMOVING_COMMANDS don't cause a change in position
	NUM_NONMOVING_COMMANDS,

	MOVE_TO_ENEMY = 3/*NUM_NONMOVING_COMMANDS*/,
	MOVE_TO_ENEMYHEIGHT,
	MOVE_TO_ENTITY, 
	MOVE_OUT_OF_RANGE,
	MOVE_TO_ATTACK_POSITION,
	MOVE_TO_COVER,
	MOVE_TO_POSITION,
	MOVE_TO_POSITION_DIRECT,
	MOVE_SLIDE_TO_POSITION,
	MOVE_WANDER,
	NUM_MOVE_COMMANDS
};

enum talkState_t{
	TALK_NEVER,
	TALK_DEAD,
	TALK_OK,
	TALK_BUSY,
	NUM_TALK_STATES
}

//
// status results from move commands
// make sure to change script/doom_defs.script if you add any, or change their order
//
enum moveStatus_t{
	MOVE_STATUS_DONE,
	MOVE_STATUS_MOVING,
	MOVE_STATUS_WAITING,
	MOVE_STATUS_DEST_NOT_FOUND,
	MOVE_STATUS_DEST_UNREACHABLE,
	MOVE_STATUS_BLOCKED_BY_WALL,
	MOVE_STATUS_BLOCKED_BY_OBJECT,
	MOVE_STATUS_BLOCKED_BY_ENEMY,
	MOVE_STATUS_BLOCKED_BY_MONSTER
};

var DI_NODIR = -1;
////
////// obstacle avoidance
////typedef struct obstaclePath_s {
////	idVec3				seekPos;					// seek position avoiding obstacles
////	idEntity *			firstObstacle;				// if != NULL the first obstacle along the path
////	idVec3				startPosOutsideObstacles;	// start position outside obstacles
////	idEntity *			startPosObstacle;			// if != NULL the obstacle containing the start position 
////	idVec3				seekPosOutsideObstacles;	// seek position outside obstacles
////	idEntity *			seekPosObstacle;			// if != NULL the obstacle containing the seek position 
////} obstaclePath_t;
////
////// path prediction
////typedef enum {
////	SE_BLOCKED			= BIT(0),
////	SE_ENTER_LEDGE_AREA	= BIT(1),
////	SE_ENTER_OBSTACLE	= BIT(2),
////	SE_FALL				= BIT(3),
////	SE_LAND				= BIT(4)
////} stopEvent_t;
////
////typedef struct predictedPath_s {
////	idVec3				endPos;						// final position
////	idVec3				endVelocity;				// velocity at end position
////	idVec3				endNormal;					// normal of blocking surface
////	int					endTime;					// time predicted
////	int					endEvent;					// event that stopped the prediction
////	const idEntity *	blockingEntity;				// entity that blocks the movement
////} predictedPath_t;
////
//////
////// events
//////
////extern const idEventDef AI_BeginAttack;
////extern const idEventDef AI_EndAttack;
////extern const idEventDef AI_MuzzleFlash;
////extern const idEventDef AI_CreateMissile;
////extern const idEventDef AI_AttackMissile;
////extern const idEventDef AI_FireMissileAtTarget;
////extern const idEventDef AI_AttackMelee;
////extern const idEventDef AI_DirectDamage;
////extern const idEventDef AI_JumpFrame;
////extern const idEventDef AI_EnableClip;
////extern const idEventDef AI_DisableClip;
////extern const idEventDef AI_EnableGravity;
////extern const idEventDef AI_DisableGravity;
////extern const idEventDef AI_TriggerParticles;
////extern const idEventDef AI_RandomPath;
////
////class idPathCorner;
////
class particleEmitter_t {
	constructor ( ) {
		this.particle = null;
		this.time = 0;
		this.joint = jointHandle_t.INVALID_JOINT;
	}
	particle: idDeclParticle;
	time: number /*int*/;
	joint: jointHandle_t;

	memset0 ( ): void {
		this.particle = null;
		this.time = 0;
		this.joint = 0;
	}
}


class idMoveState {
////public:
////							idMoveState();
////
//Save ( savefile: idSaveGame ): void { throw "placeholder"; }
////	void					Restore ( savefile: idRestoreGame ): void { throw "placeholder"; }
////
	moveType:moveType_t;
	moveCommand:moveCommand_t;
	moveStatus:moveStatus_t;
	moveDest = new idVec3;
	moveDir = new idVec3;			// used for wandering and slide moves
	goalEntity = new idVec3;
	goalEntityOrigin = new idVec3;	// move to entity uses this to avoid checking the floor position every frame
	toAreaNum :number/*int*/;
	startTime :number/*int*/;
	duration :number/*int*/;
	speed :number/*float*/;				// only used by flying creatures
	range :number/*float*/;
	wanderYaw :number/*float*/;
	nextWanderTime :number/*int*/;
	blockTime :number/*int*/;
	obstacle = new idEntityPtr<idEntity>();
	lastMoveOrigin = new idVec3;
	lastMoveTime :number/*int*/;
	anim :number/*int*/;
}
////
////class idAASFindCover extends idAASCallback {
////public:
////						idAASFindCover( const idVec3 &hideFromPos );
////						~idAASFindCover();
////
////	virtual bool		TestArea( const idAAS *aas, int areaNum );
////
////private:
////	pvsHandle_t			hidePVS;
////	int					PVSAreas[ idEntity::MAX_PVS_AREAS ];
////};
////
////class idAASFindAreaOutOfRange extends idAASCallback {
////public:
////						idAASFindAreaOutOfRange( const idVec3 &targetPos, float maxDist );
////
////	virtual bool		TestArea( const idAAS *aas, int areaNum );
////
////private:
////	idVec3				targetPos;
////	float				maxDistSqr;
////};
////
////class idAASFindAttackPosition extends idAASCallback {
////public:
////						idAASFindAttackPosition( const idAI *self, const idMat3 &gravityAxis, idEntity *target, const idVec3 &targetPos, const idVec3 &fireOffset );
////						~idAASFindAttackPosition();
////
////	virtual bool		TestArea( const idAAS *aas, int areaNum );
////
////private:
////	const idAI			*self;
////	idEntity			*target;
////	idBounds			excludeBounds;
////	idVec3				targetPos;
////	idVec3				fireOffset;
////	idMat3				gravityAxis;
////	pvsHandle_t			targetPVS;
////	int					PVSAreas[ idEntity::MAX_PVS_AREAS ];
////};
////
class idAI extends idActor {
////public:
////	CLASS_PROTOTYPE( idAI );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idAI>[];
////
////							idAI();
////							~idAI();
////
//Save ( savefile: idSaveGame ): void { throw "placeholder"; }
////	void					Restore ( savefile: idRestoreGame ): void { throw "placeholder"; }
////
////	void					Spawn( );
////	void					HeardSound( ent:idEntity, const char *action );
////	idActor					*GetEnemy( ) const;
////	void					TalkTo( idActor *actor );
////	talkState_t				GetTalkState( ) const;
////
////	bool					GetAimDir( const idVec3 &firePos, idEntity *aimAtEnt, const idEntity *ignore, idVec3 &aimDir ) const;
////
////	void					TouchedByFlashlight( idActor *flashlight_owner );
////
////							// Outputs a list of all monsters to the console.
////	static void				List_f( const idCmdArgs &args );
////
////							// Finds a path around dynamic obstacles.
////	static bool				FindPathAroundObstacles( const idPhysics *physics, const idAAS *aas, const idEntity *ignore, const idVec3 &startPos, const idVec3 &seekPos, obstaclePath_t &path );
////							// Frees any nodes used for the dynamic obstacle avoidance.
////	static void				FreeObstacleAvoidanceNodes( );
////							// Predicts movement, returns true if a stop event was triggered.
////	static bool				PredictPath( const ent:idEntity, const idAAS *aas, start:idVec3, const idVec3 &velocity, int totalTime, int frameTime, int stopEvent, predictedPath_t &path );
////							// Return true if the trajectory of the clip model is collision free.
////	static bool				TestTrajectory( start:idVec3, end:idVec3, float zVel, float gravity, /*float*/time:number, float max_height, const idClipModel *clip, int clipmask, const idEntity *ignore, const idEntity *targetEntity, int drawtime );
////							// Finds the best collision free trajectory for a clip model.
////	static bool				PredictTrajectory( const idVec3 &firePos, const idVec3 &target, float projectileSpeed, const idVec3 &projGravity, const idClipModel *clip, int clipmask, float max_height, const idEntity *ignore, const idEntity *targetEntity, int drawtime, idVec3 &aimDir );

//protected:
	// navigation
	aas:idAAS;
	travelFlags :number/*int*/;
	
	move = new idMoveState;
	savedMove= new idMoveState;

	kickForce :number/*float*/;
	ignore_obstacles:boolean;
	blockedRadius :number/*float*/;
	blockedMoveTime :number/*int*/;
	blockedAttackTime :number/*int*/;

	// turning
	ideal_yaw :number/*float*/;
	current_yaw :number/*float*/;
	turnRate :number/*float*/;
	turnVel :number/*float*/;
	anim_turn_yaw :number/*float*/;
	anim_turn_amount :number/*float*/;
	anim_turn_angles :number/*float*/;

	// physics
	physicsObj = new idPhysics_Monster;

	// flying
	flyTiltJoint:jointHandle_t;
	fly_speed :number/*float*/;
	fly_bob_strength :number/*float*/;
	fly_bob_vert :number/*float*/;
	fly_bob_horz :number/*float*/;
	fly_offset :number/*int*/;					// prefered offset from player's view
	fly_seek_scale :number/*float*/;
	fly_roll_scale :number/*float*/;
	fly_roll_max :number/*float*/;
	fly_roll :number/*float*/;
	fly_pitch_scale :number/*float*/;
	fly_pitch_max :number/*float*/;
	fly_pitch :number/*float*/;
	
	allowMove:boolean;					// disables any animation movement
	allowHiddenMovement:boolean;		// allows character to still move around while hidden
	disableGravity:boolean;				// disables gravity and allows vertical movement by the animation
	af_push_moveables:boolean;			// allow the articulated figure to push moveable objects
	
	// weapon/attack vars
	lastHitCheckResult:boolean;
	lastHitCheckTime :number/*int*/;
	lastAttackTime :number/*int*/;
	melee_range :number/*float*/;
	projectile_height_to_distance_ratio :number/*float*/;	// calculates the maximum height a projectile can be thrown
	missileLaunchOffset = new idList<idVec3>(idVec3);

	projectileDef: idDict;
	projectileClipModel: idClipModel;
	projectileRadius :number/*float*/;
	projectileSpeed :number/*float*/;
	projectileVelocity = new idVec3;
	projectileGravity = new idVec3;
	projectile = new idEntityPtr < idProjectile> ();
	attack = new idStr;

	// chatter/talking
	chat_snd: idSoundShader;
	chat_min :number/*int*/;
	chat_max :number/*int*/;
	chat_time :number/*int*/;
	talk_state:talkState_t;
	talkTarget = new idEntityPtr < idActor>();

	// cinematics
	num_cinematics :number/*int*/;
	current_cinematic :number/*int*/;

	allowJointMod:boolean;
	focusEntity = new idEntityPtr < idEntity>	();
	currentFocusPos = new idVec3;
	focusTime :number/*int*/;
	alignHeadTime :number/*int*/;
	forceAlignHeadTime :number/*int*/;
	eyeAng= new idAngles;
	lookAng= new idAngles;
	destLookAng= new idAngles;
	lookMin= new idAngles;
	lookMax= new idAngles;
	lookJoints = new idList</*jointHandle_t*/number>(Number);
	lookJointAngles = new idList<idAngles>(idAngles);
	eyeVerticalOffset :number/*float*/;
	eyeHorizontalOffset :number/*float*/;
	eyeFocusRate :number/*float*/;
	headFocusRate :number/*float*/;
	focusAlignTime :number/*int*/;

	// special fx
	shrivel_rate :number/*float*/;
	shrivel_start :number/*int*/;
	
	restartParticles:boolean;			// should smoke emissions restart
	useBoneAxis:boolean;				// use the bone vs the model axis
	particles = new idList<particleEmitter_t>(particleEmitter_t);				// particle data

	worldMuzzleFlash = new renderLight_t;			// positioned on world weapon bone
	worldMuzzleFlashHandle :number/*int*/;
	flashJointWorld:jointHandle_t;
	muzzleFlashEnd :number/*int*/;
	flashTime :number/*int*/;

	// joint controllers
	eyeMin = new idAngles;
	eyeMax = new idAngles;
	focusJoint:jointHandle_t;
	orientationJoint: jointHandle_t;

	// enemy variables
	enemy = new idEntityPtr < idActor>();
	lastVisibleEnemyPos = new idVec3;
	lastVisibleEnemyEyeOffset = new idVec3;
	lastVisibleReachableEnemyPos = new idVec3;
	lastReachableEnemyPos = new idVec3;
	wakeOnFlashlight:boolean;

	// script variables
	AI_TALK = new idScriptBool;
	AI_DAMAGE = new idScriptBool;
	AI_PAIN = new idScriptBool;
	AI_SPECIAL_DAMAGE = new idScriptFloat;
	AI_DEAD = new idScriptBool;
	AI_ENEMY_VISIBLE = new idScriptBool;
	AI_ENEMY_IN_FOV = new idScriptBool;
	AI_ENEMY_DEAD = new idScriptBool;
	AI_MOVE_DONE = new idScriptBool;
	AI_ONGROUND = new idScriptBool;
	AI_ACTIVATED = new idScriptBool;
	AI_FORWARD = new idScriptBool;
	AI_JUMP = new idScriptBool;
	AI_ENEMY_REACHABLE = new idScriptBool;
	AI_BLOCKED = new idScriptBool;
	AI_OBSTACLE_IN_PATH = new idScriptBool;
	AI_DEST_UNREACHABLE = new idScriptBool;
	AI_HIT_ENEMY = new idScriptBool;
	AI_PUSHED = new idScriptBool;

////	//
////	// ai/ai.cpp
////	//
////	void					SetAAS( );
////	virtual	void			DormantBegin( );	// called when entity becomes dormant
////	virtual	void			DormantEnd( );		// called when entity wakes from being dormant
////	void					Think( );
////	void					Activate( activator:idEntity );
////	int						ReactionTo( ent:idEntity );
////	bool					CheckForEnemy( );
////	void					EnemyDead( );
////	virtual bool			CanPlayChatterSounds( ) const;
////	void					SetChatSound( );
////	void					PlayChatter( );
////	virtual void			Hide( );
////	virtual void			Show( );
////	idVec3					FirstVisiblePointOnPath( const idVec3 origin, const idVec3 &target, int travelFlags ) const;
////	void					CalculateAttackOffsets( void );
////	void					PlayCinematic( void );
////
////	// movement
////	virtual void			ApplyImpulse( ent:idEntity, int id, const idVec3 &point, const idVec3 &impulse );
////	void					GetMoveDelta( const idMat3 &oldaxis, const idMat3 &axis, idVec3 &delta );
////	void					CheckObstacleAvoidance( const idVec3 &goalPos, idVec3 &newPos );
////	void					DeadMove( void );
////	void					AnimMove( void );
////	void					SlideMove( void );
////	void					AdjustFlyingAngles( void );
////	void					AddFlyBob( idVec3 &vel );
////	void					AdjustFlyHeight( idVec3 &vel, const idVec3 &goalPos );
////	void					FlySeekGoal( idVec3 &vel, idVec3 &goalPos );
////	void					AdjustFlySpeed( idVec3 &vel );
////	void					FlyTurn( void );
////	void					FlyMove( void );
////	void					StaticMove( void );
////
////	// damage
////	virtual bool			Pain( idEntity *inflictor, idEntity *attacker, int damage, const idVec3 &dir, int location );
////	virtual void			Killed( idEntity *inflictor, idEntity *attacker, int damage, const idVec3 &dir, int location );
////
////	// navigation
////	void					KickObstacles( const idVec3 &dir, float force, idEntity *alwaysKick );
////	bool					ReachedPos( pos:idVec3, const moveCommand_t moveCommand ) const;
////	float					TravelDistance( start:idVec3, const idVec3 &end ) const;
////	int						PointReachableAreaNum( pos:idVec3, const float boundsScale = 2.0 ) const;
////	bool					PathToGoal( aasPath_t &path, int areaNum, const idVec3 &origin, int goalAreaNum, const idVec3 &goalOrigin ) const;
////	void					DrawRoute( void ) const;
////	bool					GetMovePos( idVec3 &seekPos );
////	bool					MoveDone( void ) const;
////	bool					EntityCanSeePos( idActor *actor, const idVec3 &actorOrigin, pos:idVec3 );
////	void					BlockedFailSafe( void );
////
////	// movement control
////	void					StopMove( moveStatus_t status );
////	bool					FaceEnemy( void );
////	bool					FaceEntity( ent:idEntity );
////	bool					DirectMoveToPosition( pos:idVec3 );
////	bool					MoveToEnemyHeight( void );
////	bool					MoveOutOfRange( idEntity *entity, float range );
////	bool					MoveToAttackPosition( ent:idEntity, int attack_anim );
////	bool					MoveToEnemy( void );
////	bool					MoveToEntity( ent:idEntity );
////	bool					MoveToPosition( pos:idVec3 );
////	bool					MoveToCover( idEntity *entity, pos:idVec3 );
////	bool					SlideToPosition( pos:idVec3, /*float*/time:number );
////	bool					WanderAround( void );
////	bool					StepDirection( float dir );
////	bool					NewWanderDir( const idVec3 &dest );
////
////	// effects
////	const idDeclParticle	*SpawnParticlesOnJoint( particleEmitter_t &pe, const char *particleName, const char *jointName );
////	void					SpawnParticles( const char *keyName );
////	bool					ParticlesActive( void );
////
////	// turning
////	bool					FacingIdeal( void );
////	void					Turn( void );
////	bool					TurnToward( float yaw );
////	bool					TurnToward( pos:idVec3 );
////
////	// enemy management
////	void					ClearEnemy( void );
////	bool					EnemyPositionValid( void ) const;
////	void					SetEnemyPosition( void );
////	void					UpdateEnemyPosition( void );
////	void					SetEnemy( idActor *newEnemy );
////
////	// attacks
////	void					CreateProjectileClipModel( void ) const;
////	idProjectile			*CreateProjectile( pos:idVec3, const idVec3 &dir );
////	void					RemoveProjectile( void );
////	idProjectile			*LaunchProjectile( jointname:string, idEntity *target, bool clampToAttackCone );
////	virtual void			DamageFeedback( idEntity *victim, idEntity *inflictor, int &damage );
////	void					DirectDamage( const char *meleeDefName, ent:idEntity );
////	bool					TestMelee( void ) const;
////	bool					AttackMelee( const char *meleeDefName );
////	void					BeginAttack( name:string );
////	void					EndAttack( void );
////	void					PushWithAF( void );
////
////	// special effects
////	void					GetMuzzle( jointname:string, idVec3 &muzzle, idMat3 &axis );
////	void					InitMuzzleFlash( );
////	void					TriggerWeaponEffects( const idVec3 &muzzle );
////	void					UpdateMuzzleFlash( );
////	virtual bool			UpdateAnimationControllers( );
////	void					UpdateParticles( );
////	void					TriggerParticles( const char *jointName );
////
////	// AI script state management
////	void					LinkScriptVariables( );
////	void					UpdateAIScript( );
////
////	//
////	// ai/ai_events.cpp
////	//
	Event_Activate( activator :idEntity): void { throw "placeholder"; }
	Event_Touch( other:idEntity, trace :trace_t): void { throw "placeholder"; }
	Event_FindEnemy( /*int*/ useFOV:number ): void { throw "placeholder"; }
	Event_FindEnemyAI( /*int*/ useFOV:number ): void { throw "placeholder"; }
	Event_FindEnemyInCombatNodes( ): void { throw "placeholder"; }
	Event_ClosestReachableEnemyOfEntity(team_mate: idEntity): void { throw "placeholder"; }
	Event_HeardSound( /*int*/ignore_team :number): void { throw "placeholder"; }
	Event_SetEnemy( ent:idEntity ): void { throw "placeholder"; }
	Event_ClearEnemy( ): void { throw "placeholder"; }
	Event_MuzzleFlash( jointname:string ): void { throw "placeholder"; }
	Event_CreateMissile( jointname:string ): void { throw "placeholder"; }
	Event_AttackMissile( jointname:string ): void { throw "placeholder"; }
	Event_FireMissileAtTarget(jointname: string, targetname:string ): void { throw "placeholder"; }
	Event_LaunchMissile( muzzle:idVec3, ang:idAngles  ): void { throw "placeholder"; }
	Event_AttackMelee(meleeDefName: string ): void { throw "placeholder"; }
	Event_DirectDamage(damageTarget: idEntity , damageDefName: string ): void { throw "placeholder"; }
	Event_RadiusDamageFromJoint(jointname: string, damageDefName: string ): void { throw "placeholder"; }
	Event_BeginAttack(name: string ): void { throw "placeholder"; }
	Event_EndAttack( ): void { throw "placeholder"; }
	Event_MeleeAttackToJoint(jointname: string, meleeDefName: string ): void { throw "placeholder"; }
	Event_RandomPath( ): void { throw "placeholder"; }
	Event_CanBecomeSolid( ): void { throw "placeholder"; }
	Event_BecomeSolid( ): void { throw "placeholder"; }
	Event_BecomeNonSolid( ): void { throw "placeholder"; }
	Event_BecomeRagdoll( ): void { throw "placeholder"; }
	Event_StopRagdoll( ): void { throw "placeholder"; }
	Event_SetHealth( /*float*/ newHealth:number ): void { throw "placeholder"; }
	Event_GetHealth( ): void { throw "placeholder"; }
	Event_AllowDamage( ): void { throw "placeholder"; }
	Event_IgnoreDamage( ): void { throw "placeholder"; }
	Event_GetCurrentYaw( ): void { throw "placeholder"; }
	Event_TurnTo( /*float*/ angle :number): void { throw "placeholder"; }
	Event_TurnToPos( pos:idVec3 ): void { throw "placeholder"; }
	Event_TurnToEntity( ent:idEntity): void { throw "placeholder"; }
	Event_MoveStatus( ): void { throw "placeholder"; }
	Event_StopMove( ): void { throw "placeholder"; }
	Event_MoveToCover( ): void { throw "placeholder"; }
	Event_MoveToEnemy( ): void { throw "placeholder"; }
	Event_MoveToEnemyHeight( ): void { throw "placeholder"; }
	Event_MoveOutOfRange( entity:idEntity, /*float*/ range :number): void { throw "placeholder"; }
	Event_MoveToAttackPosition(entity:idEntity, attack_anim:string ): void { throw "placeholder"; }
	Event_MoveToEntity( ent:idEntity): void { throw "placeholder"; }
	Event_MoveToPosition( pos:idVec3 ): void { throw "placeholder"; }
	Event_SlideTo( pos:idVec3, /*float*/ time :number): void { throw "placeholder"; }
	Event_Wander( ): void { throw "placeholder"; }
	Event_FacingIdeal( ): void { throw "placeholder"; }
	Event_FaceEnemy( ): void { throw "placeholder"; }
	Event_FaceEntity( ent:idEntity): void { throw "placeholder"; }
	Event_WaitAction( waitForState:string ): void { throw "placeholder"; }
	Event_GetCombatNode( ): void { throw "placeholder"; }
	Event_EnemyInCombatCone(ent: idEntity, /*int*/ use_current_enemy_location:number ): void { throw "placeholder"; }
	Event_WaitMove( ): void { throw "placeholder"; }
	Event_GetJumpVelocity( pos:idVec3, /*float*/ speed:number, /*float*/ max_height :number): void { throw "placeholder"; }
	Event_EntityInAttackCone( ent:idEntity): void { throw "placeholder"; }
	Event_CanSeeEntity( ent:idEntity): void { throw "placeholder"; }
	Event_SetTalkTarget(target: idEntity): void { throw "placeholder"; }
	Event_GetTalkTarget( ): void { throw "placeholder"; }
	Event_SetTalkState( /*int*/ state :number): void { throw "placeholder"; }
	Event_EnemyRange( ): void { throw "placeholder"; }
	Event_EnemyRange2D( ): void { throw "placeholder"; }
	Event_GetEnemy( ): void { throw "placeholder"; }
	Event_GetEnemyPos( ): void { throw "placeholder"; }
	Event_GetEnemyEyePos( ): void { throw "placeholder"; }
	Event_PredictEnemyPos( /*float*/ time:number ): void { throw "placeholder"; }
	Event_CanHitEnemy( ): void { throw "placeholder"; }
	Event_CanHitEnemyFromAnim( animname:string ): void { throw "placeholder"; }
	Event_CanHitEnemyFromJoint( jointname:string ): void { throw "placeholder"; }
	Event_EnemyPositionValid( ): void { throw "placeholder"; }
	Event_ChargeAttack( damageDef:string ): void { throw "placeholder"; }
	Event_TestChargeAttack( ): void { throw "placeholder"; }
	Event_TestAnimMoveTowardEnemy( animname:string ): void { throw "placeholder"; }
	Event_TestAnimMove( animname:string ): void { throw "placeholder"; }
	Event_TestMoveToPosition(position: idVec3): void { throw "placeholder"; }
	Event_TestMeleeAttack( ): void { throw "placeholder"; }
	Event_TestAnimAttack( animname:string ): void { throw "placeholder"; }
	Event_Shrivel( /*float*/ shirvel_time:number ): void { throw "placeholder"; }
	Event_Burn( ): void { throw "placeholder"; }
	Event_PreBurn( ): void { throw "placeholder"; }
	Event_ClearBurn( ): void { throw "placeholder"; }
	Event_SetSmokeVisibility( /*int*/ num: number, /*int*/ on:number ): void { throw "placeholder"; }
	Event_NumSmokeEmitters( ): void { throw "placeholder"; }
	Event_StopThinking( ): void { throw "placeholder"; }
	Event_GetTurnDelta( ): void { throw "placeholder"; }
	Event_GetMoveType( ): void { throw "placeholder"; }
	Event_SetMoveType( /*int*/ moveType: number ): void { throw "placeholder"; }
	Event_SaveMove( ): void { throw "placeholder"; }
	Event_RestoreMove( ): void { throw "placeholder"; }
	Event_AllowMovement( /*float*/ flag:number ): void { throw "placeholder"; }
	Event_JumpFrame( ): void { throw "placeholder"; }
	Event_EnableClip( ): void { throw "placeholder"; }
	Event_DisableClip( ): void { throw "placeholder"; }
	Event_EnableGravity( ): void { throw "placeholder"; }
	Event_DisableGravity( ): void { throw "placeholder"; }
	Event_EnableAFPush( ): void { throw "placeholder"; }
	Event_DisableAFPush( ): void { throw "placeholder"; }
	Event_SetFlySpeed( /*float*/ speed:number ): void { throw "placeholder"; }
	Event_SetFlyOffset( /*int*/ offset: number ): void { throw "placeholder"; }
	Event_ClearFlyOffset( ): void { throw "placeholder"; }
	Event_GetClosestHiddenTarget( type:string ): void { throw "placeholder"; }
	Event_GetRandomTarget( type:string ): void { throw "placeholder"; }
	Event_TravelDistanceToPoint( pos:idVec3 ): void { throw "placeholder"; }
	Event_TravelDistanceToEntity( ent:idEntity): void { throw "placeholder"; }
	Event_TravelDistanceBetweenPoints( source:idVec3, dest :idVec3): void { throw "placeholder"; }
	Event_TravelDistanceBetweenEntities(source:idEntity, dest :idEntity): void { throw "placeholder"; }
	Event_LookAtEntity(ent: idEntity, /*float*/ duration:number ): void { throw "placeholder"; }
	Event_LookAtEnemy( /*float*/ duration:number ): void { throw "placeholder"; }
	Event_SetJointMod( /*int*/ allowJointMod: number ): void { throw "placeholder"; }
	Event_ThrowMoveable( ): void { throw "placeholder"; }
	Event_ThrowAF( ): void { throw "placeholder"; }
	Event_SetAngles( ang :idAngles): void { throw "placeholder"; }
	Event_GetAngles( ): void { throw "placeholder"; }
	Event_RealKill( ): void { throw "placeholder"; }
	Event_Kill( ): void { throw "placeholder"; }
	Event_WakeOnFlashlight( /*int*/ enable: number ): void { throw "placeholder"; }
	Event_LocateEnemy( ): void { throw "placeholder"; }
	Event_KickObstacles(kickEnt: idEntity, /*float*/ force:number ): void { throw "placeholder"; }
	Event_GetObstacle( ): void { throw "placeholder"; }
	Event_PushPointIntoAAS( pos:idVec3 ): void { throw "placeholder"; }
	Event_GetTurnRate( ): void { throw "placeholder"; }
	Event_SetTurnRate( /*float*/ rate:number ): void { throw "placeholder"; }
	Event_AnimTurn( /*float*/ angles:number ): void { throw "placeholder"; }
	Event_AllowHiddenMovement( /*int*/ enable: number ): void { throw "placeholder"; }
	Event_TriggerParticles( jointName:string ): void { throw "placeholder"; }
	Event_FindActorsInBounds( mins:idVec3, maxs:idVec3 ): void { throw "placeholder"; }
	Event_CanReachPosition( pos:idVec3 ): void { throw "placeholder"; }
	Event_CanReachEntity( ent:idEntity): void { throw "placeholder"; }
	Event_CanReachEnemy( ): void { throw "placeholder"; }
	Event_GetReachableEntityPosition(ent: idEntity): void { throw "placeholder"; }



	/*
	=====================
	idAI::idAI
	=====================
	*/
	constructor ( ) {
		super ( );
		this.aas = null;
		this.travelFlags = TFL_WALK | TFL_AIR;

		this.kickForce = 2048.0;
		this.ignore_obstacles = false;
		this.blockedRadius = 0.0;
		this.blockedMoveTime = 750;
		this.blockedAttackTime = 750;
		this.turnRate = 360.0;
		this.turnVel = 0.0;
		this.anim_turn_yaw = 0.0;
		this.anim_turn_amount = 0.0;
		this.anim_turn_angles = 0.0;
		this.fly_offset = 0;
		this.fly_seek_scale = 1.0;
		this.fly_roll_scale = 0.0;
		this.fly_roll_max = 0.0;
		this.fly_roll = 0.0;
		this.fly_pitch_scale = 0.0;
		this.fly_pitch_max = 0.0;
		this.fly_pitch = 0.0;
		this.allowMove = false;
		this.allowHiddenMovement = false;
		this.fly_speed = 0.0;
		this.fly_bob_strength = 0.0;
		this.fly_bob_vert = 0.0;
		this.fly_bob_horz = 0.0;
		this.lastHitCheckResult = false;
		this.lastHitCheckTime = 0;
		this.lastAttackTime = 0;
		this.melee_range = 0.0;
		this.projectile_height_to_distance_ratio = 1.0;
		this.projectileDef = null;
		this.projectile.opEquals( null );
		this.projectileClipModel = null;
		this.projectileRadius = 0.0;
		this.projectileVelocity.opEquals( vec3_origin );
		this.projectileGravity.opEquals( vec3_origin );
		this.projectileSpeed = 0.0;
		this.chat_snd = null;
		this.chat_min = 0;
		this.chat_max = 0;
		this.chat_time = 0;
		this.talk_state = talkState_t.TALK_NEVER;
		this.talkTarget.opEquals( null );

		this.particles.Clear ( );
		this.restartParticles = true;
		this.useBoneAxis = false;

		this.wakeOnFlashlight = false;
		this.worldMuzzleFlash.memset0 ( );
		this.worldMuzzleFlashHandle = -1;

		this.enemy.opEquals( null );
		this.lastVisibleEnemyPos.Zero ( );
		this.lastVisibleEnemyEyeOffset.Zero ( );
		this.lastVisibleReachableEnemyPos.Zero ( );
		this.lastReachableEnemyPos.Zero ( );
		this.shrivel_rate = 0.0;
		this.shrivel_start = 0;
		this.fl.neverDormant = false; // AI's can go dormant
		this.current_yaw = 0.0;
		this.ideal_yaw = 0.0;

		this.num_cinematics = 0;
		this.current_cinematic = 0;

		this.allowEyeFocus = true;
		this.allowPain = true;
		this.allowJointMod = true;
		this.focusEntity.opEquals( null );
		this.focusTime = 0;
		this.alignHeadTime = 0;
		this.forceAlignHeadTime = 0;

		this.currentFocusPos.Zero ( );
		this.eyeAng.Zero ( );
		this.lookAng.Zero ( );
		this.destLookAng.Zero ( );
		this.lookMin.Zero ( );
		this.lookMax.Zero ( );

		this.eyeMin.Zero ( );
		this.eyeMax.Zero ( );
		this.muzzleFlashEnd = 0;
		this.flashTime = 0;
		this.flashJointWorld = jointHandle_t.INVALID_JOINT;

		this.focusJoint = jointHandle_t.INVALID_JOINT;
		this.orientationJoint = jointHandle_t.INVALID_JOINT;
		this.flyTiltJoint = jointHandle_t.INVALID_JOINT;

		this.eyeVerticalOffset = 0.0;
		this.eyeHorizontalOffset = 0.0;
		this.eyeFocusRate = 0.0;
		this.headFocusRate = 0.0;
		this.focusAlignTime = 0;
	}

	/*
	=====================
	idAI::~idAI
	=====================
	*/
	destructor(): void {
		todoThrow ( );
		//delete this.projectileClipModel;
		//DeconstructScriptObject();
		//this.scriptObject.Free();
		//if ( this.worldMuzzleFlashHandle != -1 ) {
		//	gameRenderWorld.FreeLightDef( this.worldMuzzleFlashHandle );
		//	this.worldMuzzleFlashHandle = -1;
		//}
	}
	
	/////*
	////=====================
	////idAI::Save
	////=====================
	////*/
	////void idAI::Save( idSaveGame *savefile ) const {
	////	var/*int*/i:number;
	////
	////	savefile.WriteInt( travelFlags );
	////	this.move.Save( savefile );
	////	savedMove.Save( savefile );
	////	savefile.WriteFloat( kickForce );
	////	savefile.WriteBool( ignore_obstacles );
	////	savefile.WriteFloat( blockedRadius );
	////	savefile.WriteInt( blockedMoveTime );
	////	savefile.WriteInt( blockedAttackTime );
	////
	////	savefile.WriteFloat( this.ideal_yaw );
	////	savefile.WriteFloat( this.current_yaw );
	////	savefile.WriteFloat( turnRate );
	////	savefile.WriteFloat( turnVel );
	////	savefile.WriteFloat( anim_turn_yaw );
	////	savefile.WriteFloat( anim_turn_amount );
	////	savefile.WriteFloat( anim_turn_angles );
	////
	////	savefile.WriteStaticObject( this.physicsObj );
	////
	////	savefile.WriteFloat( fly_speed );
	////	savefile.WriteFloat( fly_bob_strength );
	////	savefile.WriteFloat( fly_bob_vert );
	////	savefile.WriteFloat( fly_bob_horz );
	////	savefile.WriteInt( fly_offset );
	////	savefile.WriteFloat( fly_seek_scale );
	////	savefile.WriteFloat( fly_roll_scale );
	////	savefile.WriteFloat( fly_roll_max );
	////	savefile.WriteFloat( fly_roll );
	////	savefile.WriteFloat( fly_pitch_scale );
	////	savefile.WriteFloat( fly_pitch_max );
	////	savefile.WriteFloat( fly_pitch );
	////
	////	savefile.WriteBool( this.allowMove );
	////	savefile.WriteBool( this.allowHiddenMovement );
	////	savefile.WriteBool( disableGravity );
	////	savefile.WriteBool( this.af_push_moveables );
	////
	////	savefile.WriteBool( lastHitCheckResult );
	////	savefile.WriteInt( lastHitCheckTime );
	////	savefile.WriteInt( lastAttackTime );
	////	savefile.WriteFloat( melee_range );
	////	savefile.WriteFloat( projectile_height_to_distance_ratio );
	////
	////	savefile.WriteInt( this.missileLaunchOffset.Num() );
	////	for( i = 0; i < this.missileLaunchOffset.Num(); i++ ) {
	////		savefile.WriteVec3( this.missileLaunchOffset[ i ] );
	////	}
	////
	////	idStr projectileName;
	////	this.spawnArgs.GetString( "def_projectile", "", projectileName );
	////	savefile.WriteString( projectileName );
	////	savefile.WriteFloat( this.projectileRadius );
	////	savefile.WriteFloat( this.projectileSpeed );
	////	savefile.WriteVec3( this.projectileVelocity );
	////	savefile.WriteVec3( this.projectileGravity );
	////	this.projectile.Save( savefile );
	////	savefile.WriteString( attack );
	////
	////	savefile.WriteSoundShader( this.chat_snd );
	////	savefile.WriteInt( this.chat_min );
	////	savefile.WriteInt( this.chat_max );
	////	savefile.WriteInt( this.chat_time );
	////	savefile.WriteInt( this.talk_state );
	////	talkTarget.Save( savefile );
	////
	////	savefile.WriteInt( this.num_cinematics );
	////	savefile.WriteInt( this.current_cinematic );
	////
	////	savefile.WriteBool( allowJointMod );
	////	focusEntity.Save( savefile );
	////	savefile.WriteVec3( currentFocusPos );
	////	savefile.WriteInt( focusTime );
	////	savefile.WriteInt( alignHeadTime );
	////	savefile.WriteInt( forceAlignHeadTime );
	////	savefile.WriteAngles( eyeAng );
	////	savefile.WriteAngles( lookAng );
	////	savefile.WriteAngles( destLookAng );
	////	savefile.WriteAngles( this.lookMin );
	////	savefile.WriteAngles( this.lookMax );
	////
	////	savefile.WriteInt( this.lookJoints.Num() );
	////	for( i = 0; i < this.lookJoints.Num(); i++ ) {
	////		savefile.WriteJoint( this.lookJoints[ i ] );
	////		savefile.WriteAngles( this.lookJointAngles[ i ] );
	////	}
	////
	////	savefile.WriteFloat( shrivel_rate );
	////	savefile.WriteInt( shrivel_start );
	////
	////	savefile.WriteInt( this.particles.Num() );
	////	for  ( i = 0; i < this.particles.Num(); i++ ) {
	////		savefile.WriteParticle( this.particles[i].particle );
	////		savefile.WriteInt( this.particles[i].time );
	////		savefile.WriteJoint( this.particles[i].joint );
	////	}
	////	savefile.WriteBool( this.restartParticles );
	////	savefile.WriteBool( this.useBoneAxis );
	////
	////	this.enemy.Save( savefile );
	////	savefile.WriteVec3( lastVisibleEnemyPos );
	////	savefile.WriteVec3( lastVisibleEnemyEyeOffset );
	////	savefile.WriteVec3( lastVisibleReachableEnemyPos );
	////	savefile.WriteVec3( lastReachableEnemyPos );
	////	savefile.WriteBool( wakeOnFlashlight );
	////
	////	savefile.WriteAngles( this.eyeMin );
	////	savefile.WriteAngles( this.eyeMax );
	////
	////	savefile.WriteFloat( this.eyeVerticalOffset );
	////	savefile.WriteFloat( this.eyeHorizontalOffset );
	////	savefile.WriteFloat( this.eyeFocusRate );
	////	savefile.WriteFloat( this.headFocusRate );
	////	savefile.WriteInt( this.focusAlignTime );
	////
	////	savefile.WriteJoint( this.flashJointWorld );
	////	savefile.WriteInt( muzzleFlashEnd );
	////
	////	savefile.WriteJoint( this.focusJoint );
	////	savefile.WriteJoint( this.orientationJoint );
	////	savefile.WriteJoint( this.flyTiltJoint );
	////
	////	savefile.WriteBool( GetPhysics() == static_cast<const idPhysics *>(&this.physicsObj) );
	////}
	////
	/////*
	////=====================
	////idAI::Restore
	////=====================
	////*/
	////void idAI::Restore( idRestoreGame *savefile ) {
	////	bool		restorePhysics;
	////	var/*int*/i:number;
	////	int			num;
	////	idBounds	bounds;
	////
	////	savefile.ReadInt( travelFlags );
	////	this.move.Restore( savefile );
	////	savedMove.Restore( savefile );
	////	savefile.ReadFloat( kickForce );
	////	savefile.ReadBool( ignore_obstacles );
	////	savefile.ReadFloat( blockedRadius );
	////	savefile.ReadInt( blockedMoveTime );
	////	savefile.ReadInt( blockedAttackTime );
	////
	////	savefile.ReadFloat( this.ideal_yaw );
	////	savefile.ReadFloat( this.current_yaw );
	////	savefile.ReadFloat( turnRate );
	////	savefile.ReadFloat( turnVel );
	////	savefile.ReadFloat( anim_turn_yaw );
	////	savefile.ReadFloat( anim_turn_amount );
	////	savefile.ReadFloat( anim_turn_angles );
	////
	////	savefile.ReadStaticObject( this.physicsObj );
	////
	////	savefile.ReadFloat( fly_speed );
	////	savefile.ReadFloat( fly_bob_strength );
	////	savefile.ReadFloat( fly_bob_vert );
	////	savefile.ReadFloat( fly_bob_horz );
	////	savefile.ReadInt( fly_offset );
	////	savefile.ReadFloat( fly_seek_scale );
	////	savefile.ReadFloat( fly_roll_scale );
	////	savefile.ReadFloat( fly_roll_max );
	////	savefile.ReadFloat( fly_roll );
	////	savefile.ReadFloat( fly_pitch_scale );
	////	savefile.ReadFloat( fly_pitch_max );
	////	savefile.ReadFloat( fly_pitch );
	////
	////	savefile.ReadBool( this.allowMove );
	////	savefile.ReadBool( this.allowHiddenMovement );
	////	savefile.ReadBool( disableGravity );
	////	savefile.ReadBool( this.af_push_moveables );
	////
	////	savefile.ReadBool( lastHitCheckResult );
	////	savefile.ReadInt( lastHitCheckTime );
	////	savefile.ReadInt( lastAttackTime );
	////	savefile.ReadFloat( melee_range );
	////	savefile.ReadFloat( projectile_height_to_distance_ratio );
	////
	////	savefile.ReadInt( num );
	////	this.missileLaunchOffset.SetGranularity( 1 );
	////	this.missileLaunchOffset.SetNum( num );
	////	for( i = 0; i < num; i++ ) {
	////		savefile.ReadVec3( this.missileLaunchOffset[ i ] );
	////	}
	////
	////	idStr projectileName;
	////	savefile.ReadString( projectileName );
	////	if ( projectileName.Length() ) {
	////		this.projectileDef = gameLocal.FindEntityDefDict( projectileName );
	////	} else {
	////		this.projectileDef = NULL;
	////	}
	////	savefile.ReadFloat( this.projectileRadius );
	////	savefile.ReadFloat( this.projectileSpeed );
	////	savefile.ReadVec3( this.projectileVelocity );
	////	savefile.ReadVec3( this.projectileGravity );
	////	this.projectile.Restore( savefile );
	////	savefile.ReadString( attack );
	////
	////	savefile.ReadSoundShader( this.chat_snd );
	////	savefile.ReadInt( this.chat_min );
	////	savefile.ReadInt( this.chat_max );
	////	savefile.ReadInt( this.chat_time );
	////	savefile.ReadInt( i );
	////	this.talk_state = static_cast<talkState_t>( i );
	////	talkTarget.Restore( savefile );
	////
	////	savefile.ReadInt( this.num_cinematics );
	////	savefile.ReadInt( this.current_cinematic );
	////
	////	savefile.ReadBool( allowJointMod );
	////	focusEntity.Restore( savefile );
	////	savefile.ReadVec3( currentFocusPos );
	////	savefile.ReadInt( focusTime );
	////	savefile.ReadInt( alignHeadTime );
	////	savefile.ReadInt( forceAlignHeadTime );
	////	savefile.ReadAngles( eyeAng );
	////	savefile.ReadAngles( lookAng );
	////	savefile.ReadAngles( destLookAng );
	////	savefile.ReadAngles( this.lookMin );
	////	savefile.ReadAngles( this.lookMax );
	////
	////	savefile.ReadInt( num );
	////	this.lookJoints.SetGranularity( 1 );
	////	this.lookJoints.SetNum( num );
	////	this.lookJointAngles.SetGranularity( 1 );
	////	this.lookJointAngles.SetNum( num );
	////	for( i = 0; i < num; i++ ) {
	////		savefile.ReadJoint( this.lookJoints[ i ] );
	////		savefile.ReadAngles( this.lookJointAngles[ i ] );
	////	}
	////
	////	savefile.ReadFloat( shrivel_rate );
	////	savefile.ReadInt( shrivel_start );
	////
	////	savefile.ReadInt( num );
	////	this.particles.SetNum( num );
	////	for  ( i = 0; i < this.particles.Num(); i++ ) {
	////		savefile.ReadParticle( this.particles[i].particle );
	////		savefile.ReadInt( this.particles[i].time );
	////		savefile.ReadJoint( this.particles[i].joint );
	////	}
	////	savefile.ReadBool( this.restartParticles );
	////	savefile.ReadBool( this.useBoneAxis );
	////
	////	this.enemy.Restore( savefile );
	////	savefile.ReadVec3( lastVisibleEnemyPos );
	////	savefile.ReadVec3( lastVisibleEnemyEyeOffset );
	////	savefile.ReadVec3( lastVisibleReachableEnemyPos );
	////	savefile.ReadVec3( lastReachableEnemyPos );
	////
	////	savefile.ReadBool( wakeOnFlashlight );
	////
	////	savefile.ReadAngles( this.eyeMin );
	////	savefile.ReadAngles( this.eyeMax );
	////
	////	savefile.ReadFloat( this.eyeVerticalOffset );
	////	savefile.ReadFloat( this.eyeHorizontalOffset );
	////	savefile.ReadFloat( this.eyeFocusRate );
	////	savefile.ReadFloat( this.headFocusRate );
	////	savefile.ReadInt( this.focusAlignTime );
	////
	////	savefile.ReadJoint( this.flashJointWorld );
	////	savefile.ReadInt( muzzleFlashEnd );
	////
	////	savefile.ReadJoint( this.focusJoint );
	////	savefile.ReadJoint( this.orientationJoint );
	////	savefile.ReadJoint( this.flyTiltJoint );
	////
	////	savefile.ReadBool( restorePhysics );
	////
	////	// Set the AAS if the character has the correct gravity vector
	////	idVec3 gravity = this.spawnArgs.GetVector( "gravityDir", "0 0 -1" );
	////	gravity *= g_gravity.GetFloat();
	////	if ( gravity == gameLocal.GetGravity() ) {
	////		this.SetAAS();
	////	}
	////
	////	this.SetCombatModel();
	////	LinkCombat();
	////
	////	this.InitMuzzleFlash();
	////
	////	// Link the script variables back to the scriptobject
	////	this.LinkScriptVariables();
	////
	////	if ( restorePhysics ) {
	////		RestorePhysics( &this.physicsObj );
	////	}
	////}
	////
	/*
	=====================
	idAI::Spawn
	=====================
	*/
	Spawn ( ): void {
		var jointname: string;
		var kv: idKeyValue;
		var jointName = new idStr;
		var jointScale = new idAngles;
		var joint: jointHandle_t;
		var local_dir = new idVec3;
		var talks: boolean;

		if ( !g_monsters.GetBool ( ) ) {
			this.PostEventMS( EV_Remove, 0 );
			return;
		}

		this.team = this.spawnArgs.GetInt( "team", "1" );
		this.rank = this.spawnArgs.GetInt( "rank", "0" );
		this.fly_offset = this.spawnArgs.GetInt( "fly_offset", "0" );
		this.fly_speed = this.spawnArgs.GetFloat( "fly_speed", "100" );
		this.fly_bob_strength = this.spawnArgs.GetFloat( "fly_bob_strength", "50" );
		this.fly_bob_horz = this.spawnArgs.GetFloat( "fly_bob_vert", "2" );
		this.fly_bob_vert = this.spawnArgs.GetFloat( "fly_bob_horz", "2.7" );
		this.fly_seek_scale = this.spawnArgs.GetFloat( "fly_seek_scale", "4" );
		this.fly_roll_scale = this.spawnArgs.GetFloat( "fly_roll_scale", "90" );
		this.fly_roll_max = this.spawnArgs.GetFloat( "fly_roll_max", "60" );
		this.fly_pitch_scale = this.spawnArgs.GetFloat( "fly_pitch_scale", "45" );
		this.fly_pitch_max = this.spawnArgs.GetFloat( "fly_pitch_max", "30" );

		this.melee_range = this.spawnArgs.GetFloat( "melee_range", "64" );
		this.projectile_height_to_distance_ratio = this.spawnArgs.GetFloat( "projectile_height_to_distance_ratio", "1" );

		this.turnRate = this.spawnArgs.GetFloat( "turn_rate", "360" );

		talks = this.spawnArgs.GetBool( "talks", "0" );
		if ( this.spawnArgs.GetString( "npc_name", null ) != null ) {
			if ( talks ) {
				this.talk_state = talkState_t.TALK_OK;
			} else {
				this.talk_state = talkState_t.TALK_BUSY;
			}
		} else {
			this.talk_state = talkState_t.TALK_NEVER;
		}

		this.disableGravity = this.spawnArgs.GetBool( "animate_z", "0" );
		this.af_push_moveables = this.spawnArgs.GetBool( "af_push_moveables", "0" );
		this.kickForce = this.spawnArgs.GetFloat( "kick_force", "4096" );
		this.ignore_obstacles = this.spawnArgs.GetBool( "ignore_obstacles", "0" );
		this.blockedRadius = this.spawnArgs.GetFloat( "blockedRadius", "-1" );
		this.blockedMoveTime = this.spawnArgs.GetInt( "blockedMoveTime", "750" );
		this.blockedAttackTime = this.spawnArgs.GetInt( "blockedAttackTime", "750" );

		this.num_cinematics = this.spawnArgs.GetInt( "num_cinematics", "0" );


		this.current_cinematic = 0;

		this.LinkScriptVariables ( );

		this.fl.takedamage = !this.spawnArgs.GetBool( "noDamage" );
		this.enemy.opEquals( null );
		this.allowMove = true;
		this.allowHiddenMovement = false;

		this.animator.RemoveOriginOffset( true );

		// create combat collision hull for exact collision detection
		this.SetCombatModel ( );

		this.lookMin.opEquals( this.spawnArgs.GetAngles( "look_min", "-80 -75 0" ) );
		this.lookMax.opEquals( this.spawnArgs.GetAngles( "look_max", "80 75 0" ) );

		this.lookJoints.SetGranularity( 1 );
		this.lookJointAngles.SetGranularity( 1 );
		kv = this.spawnArgs.MatchPrefix( "look_joint", null );
		while ( kv ) {
			jointName.opEquals( kv.GetKey ( ) );
			jointName.StripLeadingOnce( "look_joint " );
			joint = this.animator.GetJointHandle( jointName.data );
			if ( joint == jointHandle_t.INVALID_JOINT ) {
				gameLocal.Warning( "Unknown look_joint '%s' on entity %s", jointName.c_str ( ), this.name.c_str ( ) );
			} else {
				jointScale = this.spawnArgs.GetAngles( kv.GetKey ( ).data, "0 0 0" );
				jointScale.roll = 0.0;

				// if no scale on any component, then don't bother adding it.  this may be done to
				// zero out rotation from an inherited entitydef.
				if ( jointScale != ang_zero ) {
					this.lookJoints.Append( joint );
					this.lookJointAngles.Append( jointScale );
				}
			}
			kv = this.spawnArgs.MatchPrefix( "look_joint", kv );
		}

		// calculate joint positions on attack frames so we can do proper "can hit" tests
		this.CalculateAttackOffsets ( );

		this.eyeMin.opEquals( this.spawnArgs.GetAngles( "eye_turn_min", "-10 -30 0" ) );
		this.eyeMax.opEquals(this.spawnArgs.GetAngles( "eye_turn_max", "10 30 0" ) );
		this.eyeVerticalOffset = this.spawnArgs.GetFloat( "eye_verticle_offset", "5" );
		this.eyeHorizontalOffset = this.spawnArgs.GetFloat( "eye_horizontal_offset", "-8" );
		this.eyeFocusRate = this.spawnArgs.GetFloat( "eye_focus_rate", "0.5" );
		this.headFocusRate = this.spawnArgs.GetFloat( "head_focus_rate", "0.1" );
		this.focusAlignTime = SEC2MS( this.spawnArgs.GetFloat( "focus_align_time", "1" ) );

		this.flashJointWorld = this.animator.GetJointHandle( "flash" );

		if ( this.head.GetEntity ( ) ) {
			var headAnimator: idAnimator = this.head.GetEntity ( ).GetAnimator ( );

			jointname = this.spawnArgs.GetString( "bone_focus" );
			if ( jointname ) {
				this.focusJoint = headAnimator.GetJointHandle( jointname );
				if ( this.focusJoint == jointHandle_t.INVALID_JOINT ) {
					gameLocal.Warning( "Joint '%s' not found on head on '%s'", jointname, this.name.c_str ( ) );
				}
			}
		} else {
			jointname = this.spawnArgs.GetString( "bone_focus" );
			if ( jointname ) {
				this.focusJoint = this.animator.GetJointHandle( jointname );
				if ( this.focusJoint == jointHandle_t.INVALID_JOINT ) {
					gameLocal.Warning( "Joint '%s' not found on '%s'", jointname, this.name.c_str ( ) );
				}
			}
		}

		jointname = this.spawnArgs.GetString( "bone_orientation" );
		if ( jointname ) {
			this.orientationJoint = this.animator.GetJointHandle( jointname );
			if ( this.orientationJoint == jointHandle_t.INVALID_JOINT ) {
				gameLocal.Warning( "Joint '%s' not found on '%s'", jointname, this.name.c_str ( ) );
			}
		}

		jointname = this.spawnArgs.GetString( "bone_flytilt" );
		if ( jointname ) {
			this.flyTiltJoint = this.animator.GetJointHandle( jointname );
			if ( this.flyTiltJoint == jointHandle_t.INVALID_JOINT ) {
				gameLocal.Warning( "Joint '%s' not found on '%s'", jointname, this.name.c_str ( ) );
			}
		}

		this.InitMuzzleFlash ( );

		this.physicsObj.SetSelf( this );
		this.physicsObj.SetClipModel( new idClipModel( this.GetPhysics ( ).GetClipModel ( ) ), 1.0 );
		this.physicsObj.SetMass( this.spawnArgs.GetFloat( "mass", "100" ) );

		if ( this.spawnArgs.GetBool( "big_monster" ) ) {
			this.physicsObj.SetContents( 0 );
			this.physicsObj.SetClipMask( MASK_MONSTERSOLID & ~contentsFlags_t.CONTENTS_BODY );
		} else {
			if ( this.use_combat_bbox ) {
				this.physicsObj.SetContents( contentsFlags_t.CONTENTS_BODY | contentsFlags_t.CONTENTS_SOLID );
			} else {
				this.physicsObj.SetContents( contentsFlags_t.CONTENTS_BODY );
			}
			this.physicsObj.SetClipMask( MASK_MONSTERSOLID );
		}

		// move up to make sure the monster is at least an epsilon above the floor
		this.physicsObj.SetOrigin( this.GetPhysics ( ).GetOrigin ( ).opAddition( new idVec3( 0, 0, CM_CLIP_EPSILON ) ) );

		if ( this.num_cinematics ) {
			this.physicsObj.SetGravity( vec3_origin );
		} else {
			var gravity = this.spawnArgs.GetVector( "gravityDir", "0 0 -1" );
			gravity.opMultiplicationAssignment( g_gravity.GetFloat ( ) );
			this.physicsObj.SetGravity( gravity );
		}

		this.SetPhysics( this.physicsObj );

		this.physicsObj.GetGravityAxis ( ).ProjectVector( this.viewAxis[0], local_dir );
		this.current_yaw = local_dir.ToYaw ( );
		this.ideal_yaw = idMath.AngleNormalize180( this.current_yaw );

		this.move.blockTime = 0;

		this.SetAAS ( );

		this.projectile.opEquals( null);
		this.projectileDef = null;
		this.projectileClipModel = null;
		var projectileName = new idStr;
		if ( this.spawnArgs.GetString_RidStr( "def_projectile", "", projectileName ) && projectileName.Length ( ) ) {
			this.projectileDef = gameLocal.FindEntityDefDict( projectileName.data );
			this.CreateProjectile( vec3_origin, this.viewAxis[0] );
			this.projectileRadius = this.projectile.GetEntity ( ).GetPhysics ( ).GetClipModel ( ).GetBounds ( ).GetRadius ( );
			this.projectileVelocity.opEquals( idProjectile.GetVelocity( this.projectileDef ) );
			this.projectileGravity.opEquals( idProjectile.GetGravity( this.projectileDef ) );
			this.projectileSpeed = this.projectileVelocity.Length ( );
			$delete( this.projectile.GetEntity ( ) );
			this.projectile.opEquals( null);
		}

		this.particles.Clear ( );
		this.restartParticles = true;
		this.useBoneAxis = this.spawnArgs.GetBool( "useBoneAxis" );
		this.SpawnParticles( "smokeParticleSystem" );

		if ( this.num_cinematics || this.spawnArgs.GetBool( "hide" ) || this.spawnArgs.GetBool( "teleport" ) || this.spawnArgs.GetBool( "trigger_anim" ) ) {
			this.fl.takedamage = false;
			this.physicsObj.SetContents( 0 );
			this.physicsObj.GetClipModel ( ).Unlink ( );
			this.Hide ( );
		} else {
			// play a looping ambient sound if we have one
			this.StartSound( "snd_ambient", gameSoundChannel_t.SND_CHANNEL_AMBIENT, 0, false, null );
		}

		if ( this.health <= 0 ) {
			gameLocal.Warning( "entity '%s' doesn't have health set", this.name.c_str ( ) );
			this.health = 1;
		}

		// set up monster chatter
		this.SetChatSound ( );

		this.BecomeActive( TH_THINK );

		if ( this.af_push_moveables ) {
			this.af.SetupPose( this, gameLocal.time );
			this.af.GetPhysics ( ).EnableClip ( );
		}

		// init the move variables
		this.StopMove( moveStatus_t.MOVE_STATUS_DONE );
	}

/*
===================
idAI::InitMuzzleFlash
===================
*/
	InitMuzzleFlash ( ): void {
		var shader: string;
		var flashColor = new idVec3;

		shader = this.spawnArgs.GetString( "mtr_flashShader", "muzzleflash" );
		flashColor.opEquals( this.spawnArgs.GetVector( "flashColor", "0 0 0" ) );
		var /*float */flashRadius = this.spawnArgs.GetFloat( "flashRadius" );
		this.flashTime = SEC2MS( this.spawnArgs.GetFloat( "flashTime", "0.25" ) );

		this.worldMuzzleFlash.memset0 ( ); // &worldMuzzleFlash, 0, sizeof ( worldMuzzleFlash ) );

		this.worldMuzzleFlash.pointLight = true;
		this.worldMuzzleFlash.shader = declManager.FindMaterial( shader, false );
		this.worldMuzzleFlash.shaderParms[SHADERPARM_RED] = flashColor[0];
		this.worldMuzzleFlash.shaderParms[SHADERPARM_GREEN] = flashColor[1];
		this.worldMuzzleFlash.shaderParms[SHADERPARM_BLUE] = flashColor[2];
		this.worldMuzzleFlash.shaderParms[SHADERPARM_ALPHA] = 1.0;
		this.worldMuzzleFlash.shaderParms[SHADERPARM_TIMESCALE] = 1.0;
		this.worldMuzzleFlash.lightRadius[0] = flashRadius;
		this.worldMuzzleFlash.lightRadius[1] = flashRadius;
		this.worldMuzzleFlash.lightRadius[2] = flashRadius;

		this.worldMuzzleFlashHandle = -1;
	}

/////*
////===================
////idAI::List_f
////===================
////*/
////void idAI::List_f( const idCmdArgs &args ) {
////	int		e;
////	idAI	*check;
////	int		count;
////	const char *statename;
////
////	count = 0;
////
////	gameLocal.Printf( "%-4s  %-20s %s\n", " Num", "EntityDef", "Name" );
////	gameLocal.Printf( "------------------------------------------------\n" );
////	for( e = 0; e < MAX_GENTITIES; e++ ) {
////		check = static_cast<idAI *>(gameLocal.entities[ e ]);
////		if ( !check || !check.IsType( idAI::Type ) ) {
////			continue;
////		}
////
////		if ( check.state ) {
////			statename = check.state.Name();
////		} else {
////			statename = "NULL state";
////		}
////
////		gameLocal.Printf( "%4i: %-20s %-20s %s  move: %d\n", e, check.GetEntityDefName(), check.name.c_str(), statename, check.allowMove );
////		count++;
////	}
////
////	gameLocal.Printf( "...%d monsters\n", count );
////}
////
/////*
////================
////idAI::DormantBegin
////
////called when entity becomes dormant
////================
////*/
////void idAI::DormantBegin( ) {
////	// since dormant happens on a timer, we wont get to update particles to
////	// hidden through the think loop, but we need to hide them though.
////	if ( this.particles.Num() ) {
////		for ( int i = 0; i < this.particles.Num(); i++ ) {
////			this.particles[i].time = 0;
////		}
////	}
////
////	if ( enemyNode.InList() ) {
////		// remove ourselves from the enemy's enemylist
////		enemyNode.Remove();
////	}
////	idActor::DormantBegin();
////}
////
/////*
////================
////idAI::DormantEnd
////
////called when entity wakes from being dormant
////================
////*/
////void idAI::DormantEnd( ) {
////	if ( this.enemy.GetEntity() && !enemyNode.InList() ) {
////		// let our enemy know we're back on the trail
////		enemyNode.AddToEnd( this.enemy.GetEntity().enemyList );
////	}
////	
////	if ( this.particles.Num() ) {
////		for ( int i = 0; i < this.particles.Num(); i++ ) {
////			this.particles[i].time = gameLocal.time;
////		}
////	}
////
////	idActor::DormantEnd();
////}
////
/////*
////=====================
////idAI::Think
////=====================
////*/
////void idAI::Think( ) {
////	// if we are completely closed off from the player, don't do anything at all
////	if ( CheckDormant() ) {
////		return;
////	}
////
////	if ( thinkFlags & TH_THINK ) {
////		// clear out the enemy when he dies or is hidden
////		idActor *enemyEnt = this.enemy.GetEntity();
////		if ( enemyEnt ) {
////			if ( enemyEnt.health <= 0 ) {
////				EnemyDead();
////			}
////		}
////
////		this.current_yaw += deltaViewAngles.yaw;
////		this.ideal_yaw = idMath.AngleNormalize180( this.ideal_yaw + deltaViewAngles.yaw );
////		deltaViewAngles.Zero();
////		this.viewAxis = idAngles( 0, this.current_yaw, 0 ).ToMat3();
////
////		if ( this.num_cinematics ) {
////			if ( !this.IsHidden() && torsoAnim.AnimDone( 0 ) ) {
////				PlayCinematic();
////			}
////			RunPhysics();
////		} else if ( !this.allowHiddenMovement && this.IsHidden() ) {
////			// hidden monsters
////			UpdateAIScript();
////		} else {
////			// clear the ik before we do anything else so the skeleton doesn't get updated twice
////			walkIK.ClearJointMods();
////
////			switch( this.move.moveType ) {
////			case MOVETYPE_DEAD :
////				// dead monsters
////				UpdateAIScript();
////				DeadMove();
////				break;
////
////			case MOVETYPE_FLY :
////				// flying monsters
////				UpdateEnemyPosition();
////				UpdateAIScript();
////				FlyMove();
////				PlayChatter();
////				CheckBlink();
////				break;
////
////			case MOVETYPE_STATIC :
////				// static monsters
////				UpdateEnemyPosition();
////				UpdateAIScript();
////				StaticMove();
////				PlayChatter();
////				CheckBlink();
////				break;
////
////			case MOVETYPE_ANIM :
////				// animation based movement
////				UpdateEnemyPosition();
////				UpdateAIScript();
////				AnimMove();
////				PlayChatter();
////				CheckBlink();
////				break;
////
////			case MOVETYPE_SLIDE :
////				// velocity based movement
////				UpdateEnemyPosition();
////				UpdateAIScript();
////				SlideMove();
////				PlayChatter();
////				CheckBlink();
////				break;
////			}
////		}
////
////		// clear pain flag so that we recieve any damage between now and the next time we run the script
////		AI_PAIN = false;
////		AI_SPECIAL_DAMAGE = 0;
////		AI_PUSHED = false;
////	} else if ( thinkFlags & TH_PHYSICS ) {
////		RunPhysics();
////	}
////
////	if ( this.af_push_moveables ) {
////		PushWithAF();
////	}
////
////	if ( this.fl.hidden && this.allowHiddenMovement ) {
////		// UpdateAnimation won't call frame commands when hidden, so call them here when we allow hidden movement
////		this.animator.ServiceAnims( gameLocal.previousTime, gameLocal.time );
////	}
/////*	this still draws in retail builds.. not sure why.. don't care at this point.
////	if ( !this.aas && developer.GetBool() && !this.fl.hidden && !this.num_cinematics ) {
////		gameRenderWorld.DrawText( "No AAS", this.physicsObj.GetAbsBounds().GetCenter(), 0.1f, colorWhite, gameLocal.GetLocalPlayer().viewAngles.ToMat3(), 1, gameLocal.msec );
////	}
////*/
////
////	UpdateMuzzleFlash();
////	UpdateAnimation();
////	UpdateParticles();
////	Present();
////	UpdateDamageEffects();
////	LinkCombat();
////}
////
/////***********************************************************************
////
////	AI script state management
////
////***********************************************************************/

/*
=====================
idAI::LinkScriptVariables
=====================
*/
	LinkScriptVariables ( ): void {
		this.AI_TALK.LinkTo( this.scriptObject, "AI_TALK" );
		this.AI_DAMAGE.LinkTo( this.scriptObject, "AI_DAMAGE" );
		this.AI_PAIN.LinkTo( this.scriptObject, "AI_PAIN" );
		this.AI_SPECIAL_DAMAGE.LinkTo( this.scriptObject, "AI_SPECIAL_DAMAGE" );
		this.AI_DEAD.LinkTo( this.scriptObject, "AI_DEAD" );
		this.AI_ENEMY_VISIBLE.LinkTo( this.scriptObject, "AI_ENEMY_VISIBLE" );
		this.AI_ENEMY_IN_FOV.LinkTo( this.scriptObject, "AI_ENEMY_IN_FOV" );
		this.AI_ENEMY_DEAD.LinkTo( this.scriptObject, "AI_ENEMY_DEAD" );
		this.AI_MOVE_DONE.LinkTo( this.scriptObject, "AI_MOVE_DONE" );
		this.AI_ONGROUND.LinkTo( this.scriptObject, "AI_ONGROUND" );
		this.AI_ACTIVATED.LinkTo( this.scriptObject, "AI_ACTIVATED" );
		this.AI_FORWARD.LinkTo( this.scriptObject, "AI_FORWARD" );
		this.AI_JUMP.LinkTo( this.scriptObject, "AI_JUMP" );
		this.AI_BLOCKED.LinkTo( this.scriptObject, "AI_BLOCKED" );
		this.AI_DEST_UNREACHABLE.LinkTo( this.scriptObject, "AI_DEST_UNREACHABLE" );
		this.AI_HIT_ENEMY.LinkTo( this.scriptObject, "AI_HIT_ENEMY" );
		this.AI_OBSTACLE_IN_PATH.LinkTo( this.scriptObject, "AI_OBSTACLE_IN_PATH" );
		this.AI_PUSHED.LinkTo( this.scriptObject, "AI_PUSHED" );
	}

/////*
////=====================
////idAI::UpdateAIScript
////=====================
////*/
////void idAI::UpdateAIScript( ) {
////	UpdateScript();
////
////	// clear the hit enemy flag so we catch the next time we hit someone
////	this.AI_HIT_ENEMY = false;
////
////	if ( this.allowHiddenMovement || !this.IsHidden() ) {
////		// update the animstate if we're not hidden
////		UpdateAnimState();
////	}
////}
////
/////***********************************************************************
////
////	navigation
////
////***********************************************************************/
////
/////*
////============
////idAI::KickObstacles
////============
////*/
////void idAI::KickObstacles( const idVec3 &dir, float force, idEntity *alwaysKick ) {
////	int i, numListedClipModels;
////	idBounds clipBounds;
////	idEntity *obEnt;
////	idClipModel *clipModel;
////	idClipModel *clipModelList[ MAX_GENTITIES ];
////	int clipmask;
////	idVec3 org;
////	idVec3 forceVec;
////	idVec3 delta;
////	idVec2 perpendicular;
////
////	org = this.physicsObj.GetOrigin();
////
////	// find all possible obstacles
////	clipBounds = this.physicsObj.GetAbsBounds();
////	clipBounds.TranslateSelf( dir * 32.0 );
////	clipBounds.ExpandSelf( 8.0 );
////	clipBounds.AddPoint( org );
////	clipmask = this.physicsObj.GetClipMask();
////	numListedClipModels = gameLocal.clip.ClipModelsTouchingBounds( clipBounds, clipmask, clipModelList, MAX_GENTITIES );
////	for ( i = 0; i < numListedClipModels; i++ ) {
////		clipModel = clipModelList[i];
////		obEnt = clipModel.GetEntity();
////		if ( obEnt == alwaysKick ) {
////			// we'll kick this one outside the loop
////			continue;
////		}
////
////		if ( !clipModel.IsTraceModel() ) {
////			continue;
////		}
////
////		if ( obEnt.IsType( idMoveable::Type ) && obEnt.GetPhysics().IsPushable() ) {
////			delta = obEnt.GetPhysics().GetOrigin() - org;
////			delta.NormalizeFast();
////			perpendicular.x = -delta.y;
////			perpendicular.y = delta.x;
////			delta.z += 0.5f;
////			delta.ToVec2() += perpendicular * gameLocal.random.CRandomFloat() * 0.5f;
////			forceVec = delta * force * obEnt.GetPhysics().GetMass();
////			obEnt.ApplyImpulse( this, 0, obEnt.GetPhysics().GetOrigin(), forceVec );
////		}
////	}
////
////	if ( alwaysKick ) {
////		delta = alwaysKick.GetPhysics().GetOrigin() - org;
////		delta.NormalizeFast();
////		perpendicular.x = -delta.y;
////		perpendicular.y = delta.x;
////		delta.z += 0.5f;
////		delta.ToVec2() += perpendicular * gameLocal.random.CRandomFloat() * 0.5f;
////		forceVec = delta * force * alwaysKick.GetPhysics().GetMass();
////		alwaysKick.ApplyImpulse( this, 0, alwaysKick.GetPhysics().GetOrigin(), forceVec );
////	}
////}
////
/*
============
ValidForBounds
============
*/
	ValidForBounds ( settings: idAASSettings, bounds: idBounds ): boolean {
		var /*int*/i: number;

		for ( i = 0; i < 3; i++ ) {
			if ( bounds[0][i] < settings.boundingBoxes[0][0][i] ) {
				return false;
			}
			if ( bounds[1][i] > settings.boundingBoxes[0][1][i] ) {
				return false;
			}
		}
		return true;
	}

/*
=====================
idAI::SetAAS
=====================
*/
	SetAAS ( ): void {
		var use_aas = new idStr;

		use_aas.opEquals( this.spawnArgs.GetString( "use_aas" ) );
		this.aas = gameLocal.GetAAS_name( use_aas .data);
		if ( this.aas ) {
			var settings = this.aas.GetSettings ( );
			if ( settings ) {
				if ( !this.ValidForBounds( settings, this.physicsObj.GetBounds ( ) ) ) {
					gameLocal.Error( "%s cannot use use_aas %s\n", this.name.c_str ( ), use_aas.c_str ( ) );
				}
				var/*float */height = settings.maxStepHeight;
				this.physicsObj.SetMaxStepHeight( height );
				return;
			} else {
				this.aas = null;
			}
		}
		gameLocal.Printf( "WARNING: %s has no AAS file\n", this.name.c_str ( ) );
	}

/////*
////=====================
////idAI::DrawRoute
////=====================
////*/
////void idAI::DrawRoute( ) const {
////	if ( this.aas && this.move.toAreaNum && this.move.moveCommand != MOVE_NONE && this.move.moveCommand != MOVE_WANDER && this.move.moveCommand != MOVE_FACE_ENEMY && this.move.moveCommand != MOVE_FACE_ENTITY && this.move.moveCommand != moveCommand_t.MOVE_TO_POSITION_DIRECT ) {
////		if ( this.move.moveType == MOVETYPE_FLY ) {
////			this.aas.ShowFlyPath( this.physicsObj.GetOrigin(), this.move.toAreaNum, this.move.moveDest );
////		} else {
////			this.aas.ShowWalkPath( this.physicsObj.GetOrigin(), this.move.toAreaNum, this.move.moveDest );
////		}
////	}
////}
////
/////*
////=====================
////idAI::ReachedPos
////=====================
////*/
////bool idAI::ReachedPos( pos:idVec3, const moveCommand_t moveCommand ) const {
////	if ( this.move.moveType == MOVETYPE_SLIDE ) {
////		idBounds bnds( idVec3( -4, -4.0, -8.0 ), idVec3( 4.0, 4.0, 64.0 ) );
////		bnds.TranslateSelf( this.physicsObj.GetOrigin() );	
////		if ( bnds.ContainsPoint( pos ) ) {
////			return true;
////		}
////	} else {
////		if ( ( moveCommand == moveCommand_t.MOVE_TO_ENEMY ) || ( moveCommand == moveCommand_t.MOVE_TO_ENTITY ) ) {
////			if ( this.physicsObj.GetAbsBounds().IntersectsBounds( idBounds( pos ).Expand( 8.0 ) ) ) {
////				return true;
////			}
////		} else {
////			idBounds bnds( idVec3( -16.0, -16.0, -8.0 ), idVec3( 16.0, 16.0, 64.0 ) );
////			bnds.TranslateSelf( this.physicsObj.GetOrigin() );	
////			if ( bnds.ContainsPoint( pos ) ) {
////				return true;
////			}
////		}
////	}
////	return false;
////}
////
/////*
////=====================
////idAI::PointReachableAreaNum
////=====================
////*/
////int idAI::PointReachableAreaNum( pos:idVec3, const float boundsScale ) const {
////	int areaNum;
////	idVec3 size;
////	idBounds bounds;
////
////	if ( !this.aas ) {
////		return 0;
////	}
////
////	size = this.aas.GetSettings().boundingBoxes[0][1] * boundsScale;
////	bounds[0] = -size;
////	size.z = 32.0;
////	bounds[1] = size;
////
////	if ( this.move.moveType == MOVETYPE_FLY ) {
////		areaNum = this.aas.PointReachableAreaNum( pos, bounds, AREA_REACHABLE_WALK | AREA_REACHABLE_FLY );
////	} else {
////		areaNum = this.aas.PointReachableAreaNum( pos, bounds, AREA_REACHABLE_WALK );
////	}
////
////	return areaNum;
////}
////
/////*
////=====================
////idAI::PathToGoal
////=====================
////*/
////bool idAI::PathToGoal( aasPath_t &path, int areaNum, origin: idVec3, int goalAreaNum, const idVec3 &goalOrigin ) const {
////	idVec3 org;
////	idVec3 goal;
////
////	if ( !this.aas ) {
////		return false;
////	}
////
////	org = origin;
////	this.aas.PushPointIntoAreaNum( areaNum, org );
////	if ( !areaNum ) {
////		return false;
////	}
////
////	goal = goalOrigin;
////	this.aas.PushPointIntoAreaNum( goalAreaNum, goal );
////	if ( !goalAreaNum ) {
////		return false;
////	}
////
////	if ( this.move.moveType == MOVETYPE_FLY ) {
////		return this.aas.FlyPathToGoal( path, areaNum, org, goalAreaNum, goal, travelFlags );
////	} else {
////		return this.aas.WalkPathToGoal( path, areaNum, org, goalAreaNum, goal, travelFlags );
////	}
////}
////
/////*
////=====================
////idAI::TravelDistance
////
////Returns the approximate travel distance from one position to the goal, or if no AAS, the straight line distance.
////
////This is feakin' slow, so it's not good to do it too many times per frame.  It also is slower the further you
////are from the goal, so try to break the goals up into shorter distances.
////=====================
////*/
////float idAI::TravelDistance( start:idVec3, end:idVec3 ) const {
////	int			fromArea;
////	int			toArea;
////	float		dist;
////	idVec2		delta;
////	aasPath_t	path;
////
////	if ( !this.aas ) {
////		// no aas, so just take the straight line distance
////		delta = end.ToVec2() - start.ToVec2();
////		dist = delta.LengthFast();
////
////		if ( ai_debugMove.GetBool() ) {
////			gameRenderWorld.DebugLine( colorBlue, start, end, gameLocal.msec, false );
////			gameRenderWorld.DrawText( va( "%d", ( int )dist ), ( start + end ) * 0.5f, 0.1f, colorWhite, gameLocal.GetLocalPlayer().viewAngles.ToMat3() );
////		}
////
////		return dist;
////	}
////
////	fromArea = PointReachableAreaNum( start );
////	toArea = PointReachableAreaNum( end );
////
////	if ( !fromArea || !toArea ) {
////		// can't seem to get there
////		return -1;
////	}
////
////	if ( fromArea == toArea ) {
////		// same area, so just take the straight line distance
////		delta = end.ToVec2() - start.ToVec2();
////		dist = delta.LengthFast();
////
////		if ( ai_debugMove.GetBool() ) {
////			gameRenderWorld.DebugLine( colorBlue, start, end, gameLocal.msec, false );
////			gameRenderWorld.DrawText( va( "%d", ( int )dist ), ( start + end ) * 0.5f, 0.1f, colorWhite, gameLocal.GetLocalPlayer().viewAngles.ToMat3() );
////		}
////
////		return dist;
////	}
////
////	idReachability *reach;
////	int travelTime;
////	if ( !this.aas.RouteToGoalArea( fromArea, start, toArea, travelFlags, travelTime, &reach ) ) {
////		return -1;
////	}
////
////	if ( ai_debugMove.GetBool() ) {
////		if ( this.move.moveType == MOVETYPE_FLY ) {
////			this.aas.ShowFlyPath( start, toArea, end );
////		} else {
////			this.aas.ShowWalkPath( start, toArea, end );
////		}
////	}
////
////	return travelTime;
////}

/*
=====================
idAI::StopMove
=====================
*/
	StopMove ( status: moveStatus_t ): void {
		this.AI_MOVE_DONE.opEquals( true );
		this.move.moveCommand = moveCommand_t.MOVE_NONE;
		this.move.moveStatus = status;
		this.move.toAreaNum = 0;
		this.move.goalEntity = null;
		this.move.moveDest = this.physicsObj.GetOrigin ( );
		this.AI_DEST_UNREACHABLE.opEquals( false );
		this.AI_OBSTACLE_IN_PATH.opEquals( false );
		this.AI_BLOCKED.opEquals( false );
		this.move.startTime = gameLocal.time;
		this.move.duration = 0;
		this.move.range = 0.0;
		this.move.speed = 0.0;
		this.move.anim = 0;
		this.move.moveDir.Zero ( );
		this.move.lastMoveOrigin.Zero ( );
		this.move.lastMoveTime = gameLocal.time;
	}

/////*
////=====================
////idAI::FaceEnemy
////
////Continually face the enemy's last known position.  MoveDone is always true in this case.
////=====================
////*/
////bool idAI::FaceEnemy( ) {
////	idActor *enemyEnt = this.enemy.GetEntity();
////	if ( !enemyEnt ) {
////		StopMove( moveStatus_t.MOVE_STATUS_DEST_NOT_FOUND );
////		return false;
////	}
////
////	TurnToward( lastVisibleEnemyPos );
////	this.move.goalEntity		= enemyEnt;
////	this.move.moveDest		= this.physicsObj.GetOrigin();
////	this.move.moveCommand	= MOVE_FACE_ENEMY;
////	this.move.moveStatus		= moveStatus_t.MOVE_STATUS_WAITING;
////	this.move.startTime		= gameLocal.time;
////	this.move.speed			= 0.0;
////	this.AI_MOVE_DONE		= true;
////	this.AI_FORWARD			= false;
////	this.AI_DEST_UNREACHABLE = false;
////
////	return true;
////}
////
/////*
////=====================
////idAI::FaceEntity
////
////Continually face the entity position.  MoveDone is always true in this case.
////=====================
////*/
////bool idAI::FaceEntity( ent:idEntity ) {
////	if ( !ent ) {
////		StopMove( moveStatus_t.MOVE_STATUS_DEST_NOT_FOUND );
////		return false;
////	}
////
////	idVec3 entityOrg = ent.GetPhysics().GetOrigin();
////	TurnToward( entityOrg );
////	this.move.goalEntity		= ent;
////	this.move.moveDest		= this.physicsObj.GetOrigin();
////	this.move.moveCommand	= MOVE_FACE_ENTITY;
////	this.move.moveStatus		= moveStatus_t.MOVE_STATUS_WAITING;
////	this.move.startTime		= gameLocal.time;
////	this.move.speed			= 0.0;
////	this.AI_MOVE_DONE		= true;
////	this.AI_FORWARD			= false;
////	this.AI_DEST_UNREACHABLE = false;
////
////	return true;
////}
////
/////*
////=====================
////idAI::DirectMoveToPosition
////=====================
////*/
////bool idAI::DirectMoveToPosition( pos:idVec3 ) {
////	if ( ReachedPos( pos, this.move.moveCommand ) ) {
////		StopMove( moveStatus_t.MOVE_STATUS_DONE );
////		return true;
////	}
////
////	this.move.moveDest		= pos;
////	this.move.goalEntity		= NULL;
////	this.move.moveCommand	= moveCommand_t.MOVE_TO_POSITION_DIRECT;
////	this.move.moveStatus		= moveStatus_t.MOVE_STATUS_MOVING;
////	this.move.startTime		= gameLocal.time;
////	this.move.speed			= fly_speed;
////	this.AI_MOVE_DONE		= false;
////	this.AI_DEST_UNREACHABLE = false;
////	this.AI_FORWARD			= true;
////
////	if ( this.move.moveType == MOVETYPE_FLY ) {
////		idVec3 dir = pos - this.physicsObj.GetOrigin();
////		dir.Normalize();
////		dir *= fly_speed;
////		this.physicsObj.SetLinearVelocity( dir );
////	}
////
////	return true;
////}
////
/////*
////=====================
////idAI::MoveToEnemyHeight
////=====================
////*/
////bool idAI::MoveToEnemyHeight( ) {
////	idActor	*enemyEnt = this.enemy.GetEntity();
////
////	if ( !enemyEnt || ( this.move.moveType != MOVETYPE_FLY ) ) {
////		StopMove( moveStatus_t.MOVE_STATUS_DEST_NOT_FOUND );
////		return false;
////	}
////
////	this.move.moveDest.z		= lastVisibleEnemyPos.z + enemyEnt.EyeOffset().z + fly_offset;
////	this.move.goalEntity		= enemyEnt;
////	this.move.moveCommand	= moveCommand_t.MOVE_TO_ENEMYHEIGHT;
////	this.move.moveStatus		= moveStatus_t.MOVE_STATUS_MOVING;
////	this.move.startTime		= gameLocal.time;
////	this.move.speed			= 0.0;
////	this.AI_MOVE_DONE		= false;
////	this.AI_DEST_UNREACHABLE = false;
////	this.AI_FORWARD			= false;
////
////	return true;
////}
////
/////*
////=====================
////idAI::MoveToEnemy
////=====================
////*/
////bool idAI::MoveToEnemy( ) {
////	int			areaNum;
////	aasPath_t	path;
////	idActor		*enemyEnt = this.enemy.GetEntity();
////
////	if ( !enemyEnt ) {
////		StopMove( moveStatus_t.MOVE_STATUS_DEST_NOT_FOUND );
////		return false;
////	}
////
////	if ( ReachedPos( lastVisibleReachableEnemyPos, moveCommand_t.MOVE_TO_ENEMY ) ) {
////		if ( !ReachedPos( lastVisibleEnemyPos, moveCommand_t.MOVE_TO_ENEMY ) || !this.AI_ENEMY_VISIBLE ) {
////			StopMove( moveStatus_t.MOVE_STATUS_DEST_UNREACHABLE );
////			this.AI_DEST_UNREACHABLE = true;
////			return false;
////		}
////		StopMove( moveStatus_t.MOVE_STATUS_DONE );
////		return true;
////	}
////
////	idVec3 pos = lastVisibleReachableEnemyPos;
////
////	this.move.toAreaNum = 0;
////	if ( this.aas ) {
////		this.move.toAreaNum = PointReachableAreaNum( pos );
////		this.aas.PushPointIntoAreaNum( this.move.toAreaNum, pos );
////
////		areaNum	= PointReachableAreaNum( this.physicsObj.GetOrigin() );
////		if ( !PathToGoal( path, areaNum, this.physicsObj.GetOrigin(), this.move.toAreaNum, pos ) ) {
////			this.AI_DEST_UNREACHABLE = true;
////			return false;
////		}
////	}
////
////	if ( !this.move.toAreaNum ) {
////		// if only trying to update the enemy position
////		if ( this.move.moveCommand == moveCommand_t.MOVE_TO_ENEMY ) {
////			if ( !this.aas ) {
////				// keep the move destination up to date for wandering
////				this.move.moveDest = pos;
////			}
////			return false;
////		}
////
////		if ( !NewWanderDir( pos ) ) {
////			StopMove( moveStatus_t.MOVE_STATUS_DEST_UNREACHABLE );
////			this.AI_DEST_UNREACHABLE = true;
////			return false;
////		}
////	}
////
////	if ( this.move.moveCommand != moveCommand_t.MOVE_TO_ENEMY ) {
////		this.move.moveCommand	= moveCommand_t.MOVE_TO_ENEMY;
////		this.move.startTime		= gameLocal.time;
////	}
////
////	this.move.moveDest		= pos;
////	this.move.goalEntity		= enemyEnt;
////	this.move.speed			= fly_speed;
////	this.move.moveStatus		= moveStatus_t.MOVE_STATUS_MOVING;
////	this.AI_MOVE_DONE		= false;
////	this.AI_DEST_UNREACHABLE = false;
////	this.AI_FORWARD			= true;
////
////	return true;
////}
////
/////*
////=====================
////idAI::MoveToEntity
////=====================
////*/
////bool idAI::MoveToEntity( ent:idEntity ) {
////	int			areaNum;
////	aasPath_t	path;
////	idVec3		pos;
////
////	if ( !ent ) {
////		StopMove(moveStatus_t.MOVE_STATUS_DEST_NOT_FOUND );
////		return false;
////	}
////
////	pos = ent.GetPhysics().GetOrigin();
////	if ( ( this.move.moveType != MOVETYPE_FLY ) && ( ( this.move.moveCommand !=moveCommand_t.MOVE_TO_ENTITY ) || ( this.move.goalEntityOrigin != pos ) ) ) {
////		ent.GetFloorPos( 64.0, pos );
////	}
////
////	if ( ReachedPos( pos,moveCommand_t.MOVE_TO_ENTITY ) ) {
////		StopMove(moveStatus_t.MOVE_STATUS_DONE );
////		return true;
////	}
////
////	this.move.toAreaNum = 0;
////	if ( this.aas ) {
////		this.move.toAreaNum = PointReachableAreaNum( pos );
////		this.aas.PushPointIntoAreaNum( this.move.toAreaNum, pos );
////
////		areaNum	= PointReachableAreaNum( this.physicsObj.GetOrigin() );
////		if ( !PathToGoal( path, areaNum, this.physicsObj.GetOrigin(), this.move.toAreaNum, pos ) ) {
////			this.AI_DEST_UNREACHABLE = true;
////			return false;
////		}
////	}
////
////	if ( !this.move.toAreaNum ) {
////		// if only trying to update the entity position
////		if ( this.move.moveCommand ==moveCommand_t.MOVE_TO_ENTITY ) {
////			if ( !this.aas ) {
////				// keep the move destination up to date for wandering
////				this.move.moveDest = pos;
////			}
////			return false;
////		}
////
////		if ( !NewWanderDir( pos ) ) {
////			StopMove(moveStatus_t.MOVE_STATUS_DEST_UNREACHABLE );
////			this.AI_DEST_UNREACHABLE = true;
////			return false;
////		}
////	}
////
////	if ( ( this.move.moveCommand !=moveCommand_t.MOVE_TO_ENTITY ) || ( this.move.goalEntity.GetEntity() != ent ) ) {
////		this.move.startTime		= gameLocal.time;
////		this.move.goalEntity		= ent;
////		this.move.moveCommand	=moveCommand_t.MOVE_TO_ENTITY;
////	}
////
////	this.move.moveDest			= pos;
////	this.move.goalEntityOrigin	= ent.GetPhysics().GetOrigin();
////	this.move.moveStatus			=moveStatus_t.MOVE_STATUS_MOVING;
////	this.move.speed				= fly_speed;
////	this.AI_MOVE_DONE			= false;
////	this.AI_DEST_UNREACHABLE		= false;
////	this.AI_FORWARD				= true;
////
////	return true;
////}
////
/////*
////=====================
////idAI::MoveOutOfRange
////=====================
////*/
////bool idAI::MoveOutOfRange( ent:idEntity, float range ) {
////	int				areaNum;
////	aasObstacle_t	obstacle;
////	aasGoal_t		goal;
////	idBounds		bounds;
////	idVec3			pos;
////
////	if ( !this.aas || !ent ) {
////		StopMove(moveStatus_t.MOVE_STATUS_DEST_UNREACHABLE );
////		this.AI_DEST_UNREACHABLE = true;
////		return false;
////	}
////
////	const idVec3 &org = this.physicsObj.GetOrigin();
////	areaNum	= PointReachableAreaNum( org );
////
////	// consider the entity the monster is getting close to as an obstacle
////	obstacle.absBounds = ent.GetPhysics().GetAbsBounds();
////
////	if ( ent == this.enemy.GetEntity() ) {
////		pos = lastVisibleEnemyPos;
////	} else {
////		pos = ent.GetPhysics().GetOrigin();
////	}
////
////	idAASFindAreaOutOfRange findGoal( pos, range );
////	if ( !this.aas.FindNearestGoal( goal, areaNum, org, pos, travelFlags, &obstacle, 1, findGoal ) ) {
////		StopMove(moveStatus_t.MOVE_STATUS_DEST_UNREACHABLE );
////		this.AI_DEST_UNREACHABLE = true;
////		return false;
////	}
////
////	if ( ReachedPos( goal.origin, this.move.moveCommand ) ) {
////		StopMove(moveStatus_t.MOVE_STATUS_DONE );
////		return true;
////	}
////
////	this.move.moveDest		= goal.origin;
////	this.move.toAreaNum		= goal.areaNum;
////	this.move.goalEntity		= ent;
////	this.move.moveCommand	=MOVE_OUT_OF_RANGE;
////	this.move.moveStatus		=moveStatus_t.MOVE_STATUS_MOVING;
////	this.move.range			= range;
////	this.move.speed			= fly_speed;
////	this.move.startTime		= gameLocal.time;
////	this.AI_MOVE_DONE		= false;
////	this.AI_DEST_UNREACHABLE = false;
////	this.AI_FORWARD			= true;
////
////	return true;
////}
////
/////*
////=====================
////idAI::MoveToAttackPosition
////=====================
////*/
////bool idAI::MoveToAttackPosition( ent:idEntity, int attack_anim ) {
////	int				areaNum;
////	aasObstacle_t	obstacle;
////	aasGoal_t		goal;
////	idBounds		bounds;
////	idVec3			pos;
////
////	if ( !this.aas || !ent ) {
////		StopMove(moveStatus_t.MOVE_STATUS_DEST_UNREACHABLE );
////		this.AI_DEST_UNREACHABLE = true;
////		return false;
////	}
////
////	const idVec3 &org = this.physicsObj.GetOrigin();
////	areaNum	= PointReachableAreaNum( org );
////
////	// consider the entity the monster is getting close to as an obstacle
////	obstacle.absBounds = ent.GetPhysics().GetAbsBounds();
////
////	if ( ent == this.enemy.GetEntity() ) {
////		pos = lastVisibleEnemyPos;
////	} else {
////		pos = ent.GetPhysics().GetOrigin();
////	}
////
////	idAASFindAttackPosition findGoal( this, this.physicsObj.GetGravityAxis(), ent, pos, this.missileLaunchOffset[ attack_anim ] );
////	if ( !this.aas.FindNearestGoal( goal, areaNum, org, pos, travelFlags, &obstacle, 1, findGoal ) ) {
////		StopMove(moveStatus_t.MOVE_STATUS_DEST_UNREACHABLE );
////		this.AI_DEST_UNREACHABLE = true;
////		return false;
////	}
////
////	this.move.moveDest		= goal.origin;
////	this.move.toAreaNum		= goal.areaNum;
////	this.move.goalEntity		= ent;
////	this.move.moveCommand	=moveCommand_t.MOVE_TO_ATTACK_POSITION;
////	this.move.moveStatus		=moveStatus_t.MOVE_STATUS_MOVING;
////	this.move.speed			= fly_speed;
////	this.move.startTime		= gameLocal.time;
////	this.move.anim			= attack_anim;
////	this.AI_MOVE_DONE		= false;
////	this.AI_DEST_UNREACHABLE = false;
////	this.AI_FORWARD			= true;
////
////	return true;
////}
////
/////*
////=====================
////idAI::MoveToPosition
////=====================
////*/
////bool idAI::MoveToPosition( pos:idVec3 ) {
////	idVec3		org;
////	int			areaNum;
////	aasPath_t	path;
////
////	if ( ReachedPos( pos, this.move.moveCommand ) ) {
////		StopMove(moveStatus_t.MOVE_STATUS_DONE );
////		return true;
////	}
////
////	org = pos;
////	this.move.toAreaNum = 0;
////	if ( this.aas ) {
////		this.move.toAreaNum = PointReachableAreaNum( org );
////		this.aas.PushPointIntoAreaNum( this.move.toAreaNum, org );
////
////		areaNum	= PointReachableAreaNum( this.physicsObj.GetOrigin() );
////		if ( !PathToGoal( path, areaNum, this.physicsObj.GetOrigin(), this.move.toAreaNum, org ) ) {
////			StopMove(moveStatus_t.MOVE_STATUS_DEST_UNREACHABLE );
////			this.AI_DEST_UNREACHABLE = true;
////			return false;
////		}
////	}
////
////	if ( !this.move.toAreaNum && !NewWanderDir( org ) ) {
////		StopMove(moveStatus_t.MOVE_STATUS_DEST_UNREACHABLE );
////		this.AI_DEST_UNREACHABLE = true;
////		return false;
////	}
////
////	this.move.moveDest		= org;
////	this.move.goalEntity		= NULL;
////	this.move.moveCommand	=moveCommand_t.MOVE_TO_POSITION;
////	this.move.moveStatus		=moveStatus_t.MOVE_STATUS_MOVING;
////	this.move.startTime		= gameLocal.time;
////	this.move.speed			= fly_speed;
////	this.AI_MOVE_DONE		= false;
////	this.AI_DEST_UNREACHABLE = false;
////	this.AI_FORWARD			= true;
////
////	return true;
////}
////
/////*
////=====================
////idAI::MoveToCover
////=====================
////*/
////bool idAI::MoveToCover( idEntity *entity, const idVec3 &hideFromPos ) {
////	int				areaNum;
////	aasObstacle_t	obstacle;
////	aasGoal_t		hideGoal;
////	idBounds		bounds;
////
////	if ( !this.aas || !entity ) {
////		StopMove(moveStatus_t.MOVE_STATUS_DEST_UNREACHABLE );
////		this.AI_DEST_UNREACHABLE = true;
////		return false;
////	}
////
////	const idVec3 &org = this.physicsObj.GetOrigin();
////	areaNum	= PointReachableAreaNum( org );
////
////	// consider the entity the monster tries to hide from as an obstacle
////	obstacle.absBounds = entity.GetPhysics().GetAbsBounds();
////
////	idAASFindCover findCover( hideFromPos );
////	if ( !this.aas.FindNearestGoal( hideGoal, areaNum, org, hideFromPos, travelFlags, &obstacle, 1, findCover ) ) {
////		StopMove(moveStatus_t.MOVE_STATUS_DEST_UNREACHABLE );
////		this.AI_DEST_UNREACHABLE = true;
////		return false;
////	}
////
////	if ( ReachedPos( hideGoal.origin, this.move.moveCommand ) ) {
////		StopMove(moveStatus_t.MOVE_STATUS_DONE );
////		return true;
////	}
////
////	this.move.moveDest		= hideGoal.origin;
////	this.move.toAreaNum		= hideGoal.areaNum;
////	this.move.goalEntity		= entity;
////	this.move.moveCommand	=moveCommand_t.MOVE_TO_COVER;
////	this.move.moveStatus		=moveStatus_t.MOVE_STATUS_MOVING;
////	this.move.startTime		= gameLocal.time;
////	this.move.speed			= fly_speed;
////	this.AI_MOVE_DONE		= false;
////	this.AI_DEST_UNREACHABLE = false;
////	this.AI_FORWARD			= true;
////
////	return true;
////}
////
/////*
////=====================
////idAI::SlideToPosition
////=====================
////*/
////bool idAI::SlideToPosition( pos:idVec3, /*float*/time:number ) {
////	StopMove(moveStatus_t.MOVE_STATUS_DONE );
////
////	this.move.moveDest		= pos;
////	this.move.goalEntity		= NULL;
////	this.move.moveCommand	=MOVE_SLIDE_TO_POSITION;
////	this.move.moveStatus		=moveStatus_t.MOVE_STATUS_MOVING;
////	this.move.startTime		= gameLocal.time;
////	this.move.duration		= idPhysics::SnapTimeToPhysicsFrame( SEC2MS( time ) );
////	this.AI_MOVE_DONE		= false;
////	this.AI_DEST_UNREACHABLE = false;
////	this.AI_FORWARD			= false;
////
////	if ( this.move.duration > 0 ) {
////		this.move.moveDir = ( pos - this.physicsObj.GetOrigin() ) / MS2SEC( this.move.duration );
////		if ( this.move.moveType != MOVETYPE_FLY ) {
////			this.move.moveDir.z = 0.0;
////		}
////		this.move.speed = this.move.moveDir.LengthFast();
////	}
////
////	return true;
////}
////
/////*
////=====================
////idAI::WanderAround
////=====================
////*/
////bool idAI::WanderAround( ) {
////	StopMove(moveStatus_t.MOVE_STATUS_DONE );
////	
////	this.move.moveDest = this.physicsObj.GetOrigin() + this.viewAxis[ 0 ] * this.physicsObj.GetGravityAxis() * 256.0;
////	if ( !NewWanderDir( this.move.moveDest ) ) {
////		StopMove(moveStatus_t.MOVE_STATUS_DEST_UNREACHABLE );
////		this.AI_DEST_UNREACHABLE = true;
////		return false;
////	}
////
////	this.move.moveCommand	=MOVE_WANDER;
////	this.move.moveStatus		=moveStatus_t.MOVE_STATUS_MOVING;
////	this.move.startTime		= gameLocal.time;
////	this.move.speed			= fly_speed;
////	this.AI_MOVE_DONE		= false;
////	this.AI_FORWARD			= true;
////
////	return true;
////}
////
/////*
////=====================
////idAI::MoveDone
////=====================
////*/
////bool idAI::MoveDone( ) const {
////	return ( this.move.moveCommand ==MOVE_NONE );
////}
////
/////*
////================
////idAI::StepDirection
////================
////*/
////bool idAI::StepDirection( float dir ) {
////	predictedPath_t path;
////	idVec3 org;
////
////	this.move.wanderYaw = dir;
////	this.move.moveDir = idAngles( 0, this.move.wanderYaw, 0 ).ToForward();
////
////	org = this.physicsObj.GetOrigin();
////
////	idAI::PredictPath( this, this.aas, org, this.move.moveDir * 48.0, 1000, 1000, ( this.move.moveType == MOVETYPE_FLY ) ? SE_BLOCKED : ( SE_ENTER_OBSTACLE | SE_BLOCKED | SE_ENTER_LEDGE_AREA ), path );
////
////	if ( path.blockingEntity && ( ( this.move.moveCommand ==moveCommand_t.MOVE_TO_ENEMY ) || ( this.move.moveCommand ==moveCommand_t.MOVE_TO_ENTITY ) ) && ( path.blockingEntity == this.move.goalEntity.GetEntity() ) ) {
////		// don't report being blocked if we ran into our goal entity
////		return true;
////	}
////
////	if ( ( this.move.moveType == MOVETYPE_FLY ) && ( path.endEvent == SE_BLOCKED ) ) {
////		float z;
////
////		this.move.moveDir = path.endVelocity * 1.0 / 48.0;
////
////		// trace down to the floor and see if we can go forward
////		idAI::PredictPath( this, this.aas, org, idVec3( 0.0, 0.0, -1024.0 ), 1000, 1000, SE_BLOCKED, path );
////
////		idVec3 floorPos = path.endPos;
////		idAI::PredictPath( this, this.aas, floorPos, this.move.moveDir * 48.0, 1000, 1000, SE_BLOCKED, path );
////		if ( !path.endEvent ) {
////			this.move.moveDir.z = -1.0;
////			return true;
////		}
////
////		// trace up to see if we can go over something and go forward
////		idAI::PredictPath( this, this.aas, org, idVec3( 0.0, 0.0, 256.0 ), 1000, 1000, SE_BLOCKED, path );
////
////		idVec3 ceilingPos = path.endPos;
////
////		for( z = org.z; z <= ceilingPos.z + 64.0; z += 64.0 ) {
////			idVec3 start;
////			if ( z <= ceilingPos.z ) {
////				start.x = org.x;
////				start.y = org.y;
////                start.z = z;
////			} else {
////				start = ceilingPos;
////			}
////			idAI::PredictPath( this, this.aas, start, this.move.moveDir * 48.0, 1000, 1000, SE_BLOCKED, path );
////			if ( !path.endEvent ) {
////				this.move.moveDir.z = 1.0;
////				return true;
////			}
////		}
////		return false;
////	}
////
////	return ( path.endEvent == 0 );
////}
////
/////*
////================
////idAI::NewWanderDir
////================
////*/
////bool idAI::NewWanderDir( const idVec3 &dest ) {
////	float	deltax, deltay;
////	float	d[ 3 ];
////	float	tdir, olddir, turnaround;
////
////	this.move.nextWanderTime = gameLocal.time + ( gameLocal.random.RandomFloat() * 500 + 500 );
////
////	olddir = idMath.AngleNormalize360( ( int )( this.current_yaw / 45 ) * 45 );
////	turnaround = idMath.AngleNormalize360( olddir - 180 );
////
////	idVec3 org = this.physicsObj.GetOrigin();
////	deltax = dest.x - org.x;
////	deltay = dest.y - org.y;
////	if ( deltax > 10 ) {
////		d[ 1 ]= 0;
////	} else if ( deltax < -10 ) {
////		d[ 1 ] = 180;
////	} else {
////		d[ 1 ] = DI_NODIR;
////	}
////
////	if ( deltay < -10 ) {
////		d[ 2 ] = 270;
////	} else if ( deltay > 10 ) {
////		d[ 2 ] = 90;
////	} else {
////		d[ 2 ] = DI_NODIR;
////	}
////
////	// try direct route
////	if ( d[ 1 ] != DI_NODIR && d[ 2 ] != DI_NODIR ) {
////		if ( d[ 1 ] == 0 ) {
////			tdir = d[ 2 ] == 90 ? 45 : 315;
////		} else {
////			tdir = d[ 2 ] == 90 ? 135 : 215;
////		}
////
////		if ( tdir != turnaround && StepDirection( tdir ) ) {
////			return true;
////		}
////	}
////
////	// try other directions
////	if ( ( gameLocal.random.RandomInt() & 1 ) || abs( deltay ) > abs( deltax ) ) {
////		tdir = d[ 1 ];
////		d[ 1 ] = d[ 2 ];
////		d[ 2 ] = tdir;
////	}
////
////	if ( d[ 1 ] != DI_NODIR && d[ 1 ] != turnaround && StepDirection( d[1] ) ) {
////		return true;
////	}
////
////	if ( d[ 2 ] != DI_NODIR && d[ 2 ] != turnaround	&& StepDirection( d[ 2 ] ) ) {
////		return true;
////	}
////
////	// there is no direct path to the player, so pick another direction
////	if ( olddir != DI_NODIR && StepDirection( olddir ) ) {
////		return true;
////	}
////
////	 // randomly determine direction of search
////	if ( gameLocal.random.RandomInt() & 1 ) {
////		for( tdir = 0; tdir <= 315; tdir += 45 ) {
////			if ( tdir != turnaround && StepDirection( tdir ) ) {
////                return true;
////			}
////		}
////	} else {
////		for ( tdir = 315; tdir >= 0; tdir -= 45 ) {
////			if ( tdir != turnaround && StepDirection( tdir ) ) {
////				return true;
////			}
////		}
////	}
////
////	if ( turnaround != DI_NODIR && StepDirection( turnaround ) ) {
////		return true;
////	}
////
////	// can't this.move
////	StopMove(moveStatus_t.MOVE_STATUS_DEST_UNREACHABLE );
////	return false;
////}
////
/////*
////=====================
////idAI::GetMovePos
////=====================
////*/
////bool idAI::GetMovePos( idVec3 &seekPos ) {
////	int			areaNum;
////	aasPath_t	path;
////	bool		result;
////	idVec3		org;
////
////	org = this.physicsObj.GetOrigin();
////	seekPos = org;
////
////	switch( this.move.moveCommand ) {
////	case MOVE_NONE :
////		seekPos = this.move.moveDest;
////		return false;
////		break;
////
////	case MOVE_FACE_ENEMY :
////	case MOVE_FACE_ENTITY :
////		seekPos = this.move.moveDest;
////		return false;
////		break;
////
////	case moveCommand_t.MOVE_TO_POSITION_DIRECT :
////		seekPos = this.move.moveDest;
////		if ( ReachedPos( this.move.moveDest, this.move.moveCommand ) ) {
////			StopMove( moveStatus_t.MOVE_STATUS_DONE );
////		}
////		return false;
////		break;
////	
////	case MOVE_SLIDE_TO_POSITION :
////		seekPos = org;
////		return false;
////		break;
////	}
////
////	if ( this.move.moveCommand == moveCommand_t.MOVE_TO_ENTITY ) {
////		MoveToEntity( this.move.goalEntity.GetEntity() );
////	}
////
////	this.move.moveStatus = moveStatus_t.MOVE_STATUS_MOVING;
////	result = false;
////	if ( gameLocal.time > this.move.blockTime ) {
////		if ( this.move.moveCommand == MOVE_WANDER ) {
////			this.move.moveDest = org + this.viewAxis[ 0 ] * this.physicsObj.GetGravityAxis() * 256.0;
////		} else {
////			if ( ReachedPos( this.move.moveDest, this.move.moveCommand ) ) {
////				StopMove( moveStatus_t.MOVE_STATUS_DONE );
////				seekPos	= org;
////				return false;
////			}
////		}
////
////		if ( this.aas && this.move.toAreaNum ) {
////			areaNum	= PointReachableAreaNum( org );
////			if ( PathToGoal( path, areaNum, org, this.move.toAreaNum, this.move.moveDest ) ) {
////				seekPos = path.moveGoal;
////				result = true;
////				this.move.nextWanderTime = 0;
////			} else {
////				this.AI_DEST_UNREACHABLE = true;
////			}
////		}
////	}
////
////	if ( !result ) {
////		// wander around
////		if ( ( gameLocal.time > this.move.nextWanderTime ) || !StepDirection( this.move.wanderYaw ) ) {
////			result = NewWanderDir( this.move.moveDest );
////			if ( !result ) {
////				StopMove( moveStatus_t.MOVE_STATUS_DEST_UNREACHABLE );
////				this.AI_DEST_UNREACHABLE = true;
////				seekPos	= org;
////				return false;
////			}
////		} else {
////			result = true;
////		}
////
////		seekPos = org + this.move.moveDir * 2048.0;
////		if ( ai_debugMove.GetBool() ) {
////			gameRenderWorld.DebugLine( colorYellow, org, seekPos, gameLocal.msec, true );
////		}
////	} else {
////		this.AI_DEST_UNREACHABLE = false;
////	}
////
////	if ( result && ( ai_debugMove.GetBool() ) ) {
////		gameRenderWorld.DebugLine( colorCyan, this.physicsObj.GetOrigin(), seekPos );
////	}
////
////	return result;
////}
////
/////*
////=====================
////idAI::EntityCanSeePos
////=====================
////*/
////bool idAI::EntityCanSeePos( idActor *actor, const idVec3 &actorOrigin, pos:idVec3 ) {
////	idVec3 eye, point;
////	trace_t results;
////	pvsHandle_t handle;
////
////	handle = gameLocal.pvs.SetupCurrentPVS( actor.GetPVSAreas(), actor.GetNumPVSAreas() );
////
////	if ( !gameLocal.pvs.InCurrentPVS( handle, GetPVSAreas(), GetNumPVSAreas() ) ) {
////		gameLocal.pvs.FreeCurrentPVS( handle );
////		return false;
////	}
////
////	gameLocal.pvs.FreeCurrentPVS( handle );
////
////	eye = actorOrigin + actor.EyeOffset();
////
////	point = pos;
////	point[2] += 1.0;
////
////	this.physicsObj.DisableClip();
////
////	gameLocal.clip.TracePoint( results, eye, point, MASK_SOLID, actor );
////	if ( results.fraction >= 1.0 || ( gameLocal.GetTraceEntity( results ) == this ) ) {
////		this.physicsObj.EnableClip();
////		return true;
////	}
////
////	const idBounds &bounds = this.physicsObj.GetBounds();
////	point[2] += bounds[1][2] - bounds[0][2];
////
////	gameLocal.clip.TracePoint( results, eye, point, MASK_SOLID, actor );
////	this.physicsObj.EnableClip();
////	if ( results.fraction >= 1.0 || ( gameLocal.GetTraceEntity( results ) == this ) ) {
////		return true;
////	}
////	return false;
////}
////
/////*
////=====================
////idAI::BlockedFailSafe
////=====================
////*/
////void idAI::BlockedFailSafe( ) {
////	if ( !ai_blockedFailSafe.GetBool() || blockedRadius < 0.0 ) {
////		return;
////	}
////	if ( !this.physicsObj.OnGround() || this.enemy.GetEntity() == NULL ||
////			( this.physicsObj.GetOrigin() - this.move.lastMoveOrigin ).LengthSqr() > Square( blockedRadius ) ) {
////		this.move.lastMoveOrigin = this.physicsObj.GetOrigin();
////		this.move.lastMoveTime = gameLocal.time;
////	}
////	if ( this.move.lastMoveTime < gameLocal.time - blockedMoveTime ) {
////		if ( lastAttackTime < gameLocal.time - blockedAttackTime ) {
////			this.AI_BLOCKED = true;
////			this.move.lastMoveTime = gameLocal.time;
////		}
////	}
////}
////
/////***********************************************************************
////
////	turning
////
////***********************************************************************/
////
/////*
////=====================
////idAI::Turn
////=====================
////*/
////void idAI::Turn( ) {
////	float diff;
////	float diff2;
////	float turnAmount;
////	animFlags_t animflags;
////
////	if ( !turnRate ) {
////		return;
////	}
////
////	// check if the animator has marker this anim as non-turning
////	if ( !legsAnim.Disabled() && !legsAnim.AnimDone( 0 ) ) {
////		animflags = legsAnim.GetAnimFlags();
////	} else {
////		animflags = torsoAnim.GetAnimFlags();
////	}
////	if ( animflags.ai_no_turn ) {
////		return;
////	}
////
////	if ( anim_turn_angles && animflags.anim_turn ) {
////		idMat3 rotateAxis;
////
////		// set the blend between no turn and full turn
////		float frac = anim_turn_amount / anim_turn_angles;
////		this.animator.CurrentAnim( ANIMCHANNEL_LEGS ).SetSyncedAnimWeight( 0, 1.0 - frac );
////		this.animator.CurrentAnim( ANIMCHANNEL_LEGS ).SetSyncedAnimWeight( 1, frac );
////		this.animator.CurrentAnim( ANIMCHANNEL_TORSO ).SetSyncedAnimWeight( 0, 1.0 - frac );
////		this.animator.CurrentAnim( ANIMCHANNEL_TORSO ).SetSyncedAnimWeight( 1, frac );
////
////		// get the total rotation from the start of the anim
////		this.animator.GetDeltaRotation( 0, gameLocal.time, rotateAxis );
////		this.current_yaw = idMath.AngleNormalize180( anim_turn_yaw + rotateAxis[ 0 ].ToYaw() );
////	} else {
////		diff = idMath.AngleNormalize180( this.ideal_yaw - this.current_yaw );
////		turnVel += this.AI_TURN_SCALE * diff * MS2SEC( gameLocal.msec );
////		if ( turnVel > turnRate ) {
////			turnVel = turnRate;
////		} else if ( turnVel < -turnRate ) {
////			turnVel = -turnRate;
////		}
////		turnAmount = turnVel * MS2SEC( gameLocal.msec );
////		if ( ( diff >= 0.0 ) && ( turnAmount >= diff ) ) {
////			turnVel = diff / MS2SEC( gameLocal.msec );
////			turnAmount = diff;
////		} else if ( ( diff <= 0.0 ) && ( turnAmount <= diff ) ) {
////			turnVel = diff / MS2SEC( gameLocal.msec );
////			turnAmount = diff;
////		}
////		this.current_yaw += turnAmount;
////		this.current_yaw = idMath.AngleNormalize180( this.current_yaw );
////		diff2 = idMath.AngleNormalize180( this.ideal_yaw - this.current_yaw );
////		if ( idMath.Fabs( diff2 ) < 0.1f ) {
////			this.current_yaw = this.ideal_yaw;
////		}
////	}
////
////	this.viewAxis = idAngles( 0, this.current_yaw, 0 ).ToMat3();
////
////	if ( ai_debugMove.GetBool() ) {
////		const idVec3 &org = this.physicsObj.GetOrigin();
////		gameRenderWorld.DebugLine( colorRed, org, org + idAngles( 0, this.ideal_yaw, 0 ).ToForward() * 64, gameLocal.msec );
////		gameRenderWorld.DebugLine( colorGreen, org, org + idAngles( 0, this.current_yaw, 0 ).ToForward() * 48, gameLocal.msec );
////		gameRenderWorld.DebugLine( colorYellow, org, org + idAngles( 0, this.current_yaw + turnVel, 0 ).ToForward() * 32, gameLocal.msec );
////	}
////}
////
/////*
////=====================
////idAI::FacingIdeal
////=====================
////*/
////bool idAI::FacingIdeal( ) {
////	float diff;
////
////	if ( !turnRate ) {
////		return true;
////	}
////
////	diff = idMath.AngleNormalize180( this.current_yaw - this.ideal_yaw );
////	if ( idMath.Fabs( diff ) < 0.01f ) {
////		// force it to be exact
////		this.current_yaw = this.ideal_yaw;
////		return true;
////	}
////
////	return false;
////}
////
/////*
////=====================
////idAI::TurnToward
////=====================
////*/
////bool idAI::TurnToward( float yaw ) {
////	this.ideal_yaw = idMath.AngleNormalize180( yaw );
////	bool result = FacingIdeal();
////	return result;
////}
////
/////*
////=====================
////idAI::TurnToward
////=====================
////*/
////bool idAI::TurnToward( pos:idVec3 ) {
////	idVec3 dir;
////	idVec3 local_dir;
////	float lengthSqr;
////
////	dir = pos - this.physicsObj.GetOrigin();
////	this.physicsObj.GetGravityAxis().ProjectVector( dir, local_dir );
////	local_dir.z = 0.0;
////	lengthSqr = local_dir.LengthSqr();
////	if ( lengthSqr > Square( 2.0 ) || ( lengthSqr > Square( 0.1f ) && this.enemy.GetEntity() == NULL ) ) {
////		this.ideal_yaw = idMath.AngleNormalize180( local_dir.ToYaw() );
////	}
////
////	bool result = FacingIdeal();
////	return result;
////}
////
/////***********************************************************************
////
////	Movement
////
////***********************************************************************/
////
/////*
////================
////idAI::ApplyImpulse
////================
////*/
////void idAI::ApplyImpulse( ent:idEntity, /*int*/ id:number, const idVec3 &point, const idVec3 &impulse ) {
////	// FIXME: Jim take a look at this and see if this is a reasonable thing to do
////	// instead of a spawnArg flag.. Sabaoth is the only slide monster ( and should be the only one for D3 )
////	// and we don't want him taking physics impulses as it can knock him off the path
////	if ( this.move.moveType != MOVETYPE_STATIC && this.move.moveType != MOVETYPE_SLIDE ) {
////		idActor::ApplyImpulse( ent, id, point, impulse );
////	}
////}
////
/////*
////=====================
////idAI::GetMoveDelta
////=====================
////*/
////void idAI::GetMoveDelta( const idMat3 &oldaxis, const idMat3 &axis, idVec3 &delta ) {
////	idVec3 oldModelOrigin;
////	idVec3 modelOrigin;
////
////	this.animator.GetDelta( gameLocal.time - gameLocal.msec, gameLocal.time, delta );
////	delta = axis * delta;
////
////	if ( modelOffset != vec3_zero ) {
////		// the pivot of the monster's model is around its origin, and not around the bounding
////		// box's origin, so we have to compensate for this when the model is offset so that
////		// the monster still appears to rotate around it's origin.
////		oldModelOrigin = modelOffset * oldaxis;
////		modelOrigin = modelOffset * axis;
////		delta += oldModelOrigin - modelOrigin;
////	}
////
////	delta *= this.physicsObj.GetGravityAxis();
////}
////
/////*
////=====================
////idAI::CheckObstacleAvoidance
////=====================
////*/
////void idAI::CheckObstacleAvoidance( const idVec3 &goalPos, idVec3 &newPos ) {
////	idEntity		*obstacle;
////	obstaclePath_t	path;
////	idVec3			dir;
////	float			dist;
////	bool			foundPath;
////
////	if ( ignore_obstacles ) {
////		newPos = goalPos;
////		this.move.obstacle = NULL;
////		return;
////	}
////
////	const idVec3 &origin = this.physicsObj.GetOrigin();
////
////	obstacle = NULL;
////	this.AI_OBSTACLE_IN_PATH = false;
////	foundPath = FindPathAroundObstacles( &this.physicsObj, this.aas, this.enemy.GetEntity(), origin, goalPos, path );
////	if ( ai_showObstacleAvoidance.GetBool() ) {
////		gameRenderWorld.DebugLine( colorBlue, goalPos + idVec3( 1.0, 1.0, 0.0 ), goalPos + idVec3( 1.0, 1.0, 64.0 ), gameLocal.msec );
////		gameRenderWorld.DebugLine( foundPath ? colorYellow : colorRed, path.seekPos, path.seekPos + idVec3( 0.0, 0.0, 64.0 ), gameLocal.msec );
////	}
////
////	if ( !foundPath ) {
////		// couldn't get around obstacles
////		if ( path.firstObstacle ) {
////			this.AI_OBSTACLE_IN_PATH = true;
////			if ( this.physicsObj.GetAbsBounds().Expand( 2.0 ).IntersectsBounds( path.firstObstacle.GetPhysics().GetAbsBounds() ) ) {
////				obstacle = path.firstObstacle;
////			}
////		} else if ( path.startPosObstacle ) {
////			this.AI_OBSTACLE_IN_PATH = true;
////			if ( this.physicsObj.GetAbsBounds().Expand( 2.0 ).IntersectsBounds( path.startPosObstacle.GetPhysics().GetAbsBounds() ) ) {
////				obstacle = path.startPosObstacle;
////			}
////		} else {
////			// Blocked by wall
////			this.move.moveStatus = moveStatus_t.MOVE_STATUS_BLOCKED_BY_WALL;
////		}
////#if 0
////	} else if ( path.startPosObstacle ) {
////		// check if we're past where the our origin was pushed out of the obstacle
////		dir = goalPos - origin;
////		dir.Normalize();
////		dist = ( path.seekPos - origin ) * dir;
////		if ( dist < 1.0 ) {
////			this.AI_OBSTACLE_IN_PATH = true;
////			obstacle = path.startPosObstacle;
////		}
////#endif
////	} else if ( path.seekPosObstacle ) {
////		// if the AI is very close to the path.seekPos already and path.seekPosObstacle != NULL
////		// then we want to push the path.seekPosObstacle entity out of the way
////		this.AI_OBSTACLE_IN_PATH = true;
////
////		// check if we're past where the goalPos was pushed out of the obstacle
////		dir = goalPos - origin;
////		dir.Normalize();
////		dist = ( path.seekPos - origin ) * dir;
////		if ( dist < 1.0 ) {
////			obstacle = path.seekPosObstacle;
////		}
////	}
////
////	// if we had an obstacle, set our move status based on the type, and kick it out of the way if it's a moveable
////	if ( obstacle ) {
////		if ( obstacle.IsType( idActor::Type ) ) {
////			// monsters aren't kickable
////			if ( obstacle == this.enemy.GetEntity() ) {
////				this.move.moveStatus = moveStatus_t.MOVE_STATUS_BLOCKED_BY_ENEMY;
////			} else {
////				this.move.moveStatus = moveStatus_t.MOVE_STATUS_BLOCKED_BY_MONSTER;
////			}
////		} else {
////			// try kicking the object out of the way
////			this.move.moveStatus = moveStatus_t.MOVE_STATUS_BLOCKED_BY_OBJECT;
////		}
////		newPos = obstacle.GetPhysics().GetOrigin();
////		//newPos = path.seekPos;
////		this.move.obstacle = obstacle;
////	} else {
////		newPos = path.seekPos;
////		this.move.obstacle = NULL;
////	}
////}
////
/////*
////=====================
////idAI::DeadMove
////=====================
////*/
////void idAI::DeadMove( ) {
////	idVec3				delta;
////	monsterMoveResult_t	moveResult;
////
////	idVec3 org = this.physicsObj.GetOrigin();
////
////	GetMoveDelta( this.viewAxis, this.viewAxis, delta );
////	this.physicsObj.SetDelta( delta );
////
////	RunPhysics();
////
////	moveResult = this.physicsObj.GetMoveResult();
////	this.AI_ONGROUND = this.physicsObj.OnGround();
////}
////
/////*
////=====================
////idAI::AnimMove
////=====================
////*/
////void idAI::AnimMove( ) {
////	idVec3				goalPos;
////	idVec3				delta;
////	idVec3				goalDelta;
////	float				goalDist;
////	monsterMoveResult_t	moveResult;
////	idVec3				newDest;
////
////	idVec3 oldorigin = this.physicsObj.GetOrigin();
////	idMat3 oldaxis = this.viewAxis;
////
////	this.AI_BLOCKED = false;
////
////	if ( this.move.moveCommand < NUM_NONMOVING_COMMANDS ){ 
////		this.move.lastMoveOrigin.Zero();
////		this.move.lastMoveTime = gameLocal.time;
////	}
////
////	this.move.obstacle = NULL;
////	if ( ( this.move.moveCommand == MOVE_FACE_ENEMY ) && this.enemy.GetEntity() ) {
////		TurnToward( lastVisibleEnemyPos );
////		goalPos = oldorigin;
////	} else if ( ( this.move.moveCommand == MOVE_FACE_ENTITY ) && this.move.goalEntity.GetEntity() ) {
////		TurnToward( this.move.goalEntity.GetEntity().GetPhysics().GetOrigin() );
////		goalPos = oldorigin;
////	} else if ( GetMovePos( goalPos ) ) {
////		if ( this.move.moveCommand != MOVE_WANDER ) {
////			CheckObstacleAvoidance( goalPos, newDest );
////			TurnToward( newDest );
////		} else {
////			TurnToward( goalPos );
////		}
////	}
////
////	Turn();
////
////	if ( this.move.moveCommand == MOVE_SLIDE_TO_POSITION ) {
////		if ( gameLocal.time < this.move.startTime + this.move.duration ) {
////			goalPos = this.move.moveDest - this.move.moveDir * MS2SEC( this.move.startTime + this.move.duration - gameLocal.time );
////			delta = goalPos - oldorigin;
////			delta.z = 0.0;
////		} else {
////			delta = this.move.moveDest - oldorigin;
////			delta.z = 0.0;
////			StopMove( moveStatus_t.MOVE_STATUS_DONE );
////		}
////	} else if ( this.allowMove ) {
////		GetMoveDelta( oldaxis, this.viewAxis, delta );
////	} else {
////		delta.Zero();
////	}
////
////	if ( this.move.moveCommand == moveCommand_t.MOVE_TO_POSITION ) {
////		goalDelta = this.move.moveDest - oldorigin;
////		goalDist = goalDelta.LengthFast();
////		if ( goalDist < delta.LengthFast() ) {
////			delta = goalDelta;
////		}
////	}
////
////	this.physicsObj.SetDelta( delta );
////	this.physicsObj.ForceDeltaMove( disableGravity );
////
////	RunPhysics();
////
////	if ( ai_debugMove.GetBool() ) {
////		gameRenderWorld.DebugLine( colorCyan, oldorigin, this.physicsObj.GetOrigin(), 5000 );
////	}
////
////	moveResult = this.physicsObj.GetMoveResult();
////	if ( !this.af_push_moveables && attack.Length() && TestMelee() ) {
////		DirectDamage( attack, this.enemy.GetEntity() );
////	} else {
////		idEntity *blockEnt = this.physicsObj.GetSlideMoveEntity();
////		if ( blockEnt && blockEnt.IsType( idMoveable::Type ) && blockEnt.GetPhysics().IsPushable() ) {
////			KickObstacles( this.viewAxis[ 0 ], kickForce, blockEnt );
////		}
////	}
////
////	BlockedFailSafe();
////
////	this.AI_ONGROUND = this.physicsObj.OnGround();
////
////	idVec3 org = this.physicsObj.GetOrigin();
////	if ( oldorigin != org ) {
////		TouchTriggers();
////	}
////
////	if ( ai_debugMove.GetBool() ) {
////		gameRenderWorld.DebugBounds( colorMagenta, this.physicsObj.GetBounds(), org, gameLocal.msec );
////		gameRenderWorld.DebugBounds( colorMagenta, this.physicsObj.GetBounds(), this.move.moveDest, gameLocal.msec );
////		gameRenderWorld.DebugLine( colorYellow, org + EyeOffset(), org + EyeOffset() + this.viewAxis[ 0 ] * this.physicsObj.GetGravityAxis() * 16.0, gameLocal.msec, true );
////		DrawRoute();
////	}
////}
////
/////*
////=====================
////Seek
////=====================
////*/
////idVec3 Seek( idVec3 &vel, const idVec3 &org, const idVec3 &goal, float prediction ) {
////	idVec3 predictedPos;
////	idVec3 goalDelta;
////	idVec3 seekVel;
////
////	// predict our position
////	predictedPos = org + vel * prediction;
////	goalDelta = goal - predictedPos;
////	seekVel = goalDelta * MS2SEC( gameLocal.msec );
////
////	return seekVel;
////}
////
/////*
////=====================
////idAI::SlideMove
////=====================
////*/
////void idAI::SlideMove( ) {
////	idVec3				goalPos;
////	idVec3				delta;
////	idVec3				goalDelta;
////	float				goalDist;
////	monsterMoveResult_t	moveResult;
////	idVec3				newDest;
////
////	idVec3 oldorigin = this.physicsObj.GetOrigin();
////	idMat3 oldaxis = this.viewAxis;
////
////	this.AI_BLOCKED = false;
////
////	if ( this.move.moveCommand < NUM_NONMOVING_COMMANDS ){ 
////		this.move.lastMoveOrigin.Zero();
////		this.move.lastMoveTime = gameLocal.time;
////	}
////
////	this.move.obstacle = NULL;
////	if ( ( this.move.moveCommand == MOVE_FACE_ENEMY ) && this.enemy.GetEntity() ) {
////		TurnToward( lastVisibleEnemyPos );
////		goalPos = this.move.moveDest;
////	} else if ( ( this.move.moveCommand == MOVE_FACE_ENTITY ) && this.move.goalEntity.GetEntity() ) {
////		TurnToward( this.move.goalEntity.GetEntity().GetPhysics().GetOrigin() );
////		goalPos = this.move.moveDest;
////	} else if ( GetMovePos( goalPos ) ) {
////		CheckObstacleAvoidance( goalPos, newDest );
////		TurnToward( newDest );
////		goalPos = newDest;
////	}
////
////	if ( this.move.moveCommand == MOVE_SLIDE_TO_POSITION ) {
////		if ( gameLocal.time < this.move.startTime + this.move.duration ) {
////			goalPos = this.move.moveDest - this.move.moveDir * MS2SEC( this.move.startTime + this.move.duration - gameLocal.time );
////		} else {
////			goalPos = this.move.moveDest;
////			StopMove( moveStatus_t.MOVE_STATUS_DONE );
////		}
////	}
////
////	if ( this.move.moveCommand == moveCommand_t.MOVE_TO_POSITION ) {
////		goalDelta = this.move.moveDest - oldorigin;
////		goalDist = goalDelta.LengthFast();
////		if ( goalDist < delta.LengthFast() ) {
////			delta = goalDelta;
////		}
////	}
////
////	idVec3 vel = this.physicsObj.GetLinearVelocity();
////	float z = vel.z;
////	idVec3  predictedPos = oldorigin + vel * this.AI_SEEK_PREDICTION;
////
////	// seek the goal position
////	goalDelta = goalPos - predictedPos;
////	vel -= vel * this.AI_FLY_DAMPENING * MS2SEC( gameLocal.msec );
////	vel += goalDelta * MS2SEC( gameLocal.msec );
////
////	// cap our speed
////	vel.Truncate( fly_speed );
////	vel.z = z;
////	this.physicsObj.SetLinearVelocity( vel );
////	this.physicsObj.UseVelocityMove( true );
////	RunPhysics();
////
////	if ( ( this.move.moveCommand == MOVE_FACE_ENEMY ) && this.enemy.GetEntity() ) {
////		TurnToward( lastVisibleEnemyPos );
////	} else if ( ( this.move.moveCommand == MOVE_FACE_ENTITY ) && this.move.goalEntity.GetEntity() ) {
////		TurnToward( this.move.goalEntity.GetEntity().GetPhysics().GetOrigin() );
////	} else if ( this.move.moveCommand != MOVE_NONE ) {
////		if ( vel.ToVec2().LengthSqr() > 0.1f ) {
////			TurnToward( vel.ToYaw() );
////		}
////	}
////	Turn();
////
////	if ( ai_debugMove.GetBool() ) {
////		gameRenderWorld.DebugLine( colorCyan, oldorigin, this.physicsObj.GetOrigin(), 5000 );
////	}
////
////	moveResult = this.physicsObj.GetMoveResult();
////	if ( !this.af_push_moveables && attack.Length() && TestMelee() ) {
////		DirectDamage( attack, this.enemy.GetEntity() );
////	} else {
////		idEntity *blockEnt = this.physicsObj.GetSlideMoveEntity();
////		if ( blockEnt && blockEnt.IsType( idMoveable::Type ) && blockEnt.GetPhysics().IsPushable() ) {
////			KickObstacles( this.viewAxis[ 0 ], kickForce, blockEnt );
////		}
////	}
////
////	BlockedFailSafe();
////
////	this.AI_ONGROUND = this.physicsObj.OnGround();
////
////	idVec3 org = this.physicsObj.GetOrigin();
////	if ( oldorigin != org ) {
////		TouchTriggers();
////	}
////
////	if ( ai_debugMove.GetBool() ) {
////		gameRenderWorld.DebugBounds( colorMagenta, this.physicsObj.GetBounds(), org, gameLocal.msec );
////		gameRenderWorld.DebugBounds( colorMagenta, this.physicsObj.GetBounds(), this.move.moveDest, gameLocal.msec );
////		gameRenderWorld.DebugLine( colorYellow, org + EyeOffset(), org + EyeOffset() + this.viewAxis[ 0 ] * this.physicsObj.GetGravityAxis() * 16.0, gameLocal.msec, true );
////		DrawRoute();
////	}
////}
////
/////*
////=====================
////idAI::AdjustFlyingAngles
////=====================
////*/
////void idAI::AdjustFlyingAngles( ) {
////	idVec3	vel;
////	float 	speed;
////	float 	roll;
////	float 	pitch;
////
////	vel = this.physicsObj.GetLinearVelocity();
////
////	speed = vel.Length();
////	if ( speed < 5.0 ) {
////		roll = 0.0;
////		pitch = 0.0;
////	} else {
////		roll = vel * this.viewAxis[ 1 ] * -fly_roll_scale / fly_speed;
////		if ( roll > fly_roll_max ) {
////			roll = fly_roll_max;
////		} else if ( roll < -fly_roll_max ) {
////			roll = -fly_roll_max;
////		}
////
////		pitch = vel * this.viewAxis[ 2 ] * -fly_pitch_scale / fly_speed;
////		if ( pitch > fly_pitch_max ) {
////			pitch = fly_pitch_max;
////		} else if ( pitch < -fly_pitch_max ) {
////			pitch = -fly_pitch_max;
////		}
////	}
////
////	fly_roll = fly_roll * 0.95f + roll * 0.05f;
////	fly_pitch = fly_pitch * 0.95f + pitch * 0.05f;
////
////	if ( this.flyTiltJoint != jointHandle_t.INVALID_JOINT ) {
////		this.animator.SetJointAxis( this.flyTiltJoint, JOINTMOD_WORLD, idAngles( fly_pitch, 0.0, fly_roll ).ToMat3() );
////	} else {
////		this.viewAxis = idAngles( fly_pitch, this.current_yaw, fly_roll ).ToMat3();
////	}
////}
////
/////*
////=====================
////idAI::AddFlyBob
////=====================
////*/
////void idAI::AddFlyBob( idVec3 &vel ) {
////	idVec3	fly_bob_add;
////	float	t;
////
////	if ( fly_bob_strength ) {
////		t = MS2SEC( gameLocal.time + entityNumber * 497 );
////		fly_bob_add = ( this.viewAxis[ 1 ] * idMath.Sin16( t * fly_bob_horz ) + this.viewAxis[ 2 ] * idMath.Sin16( t * fly_bob_vert ) ) * fly_bob_strength;
////		vel += fly_bob_add * MS2SEC( gameLocal.msec );
////		if ( ai_debugMove.GetBool() ) {
////			const idVec3 &origin = this.physicsObj.GetOrigin();
////			gameRenderWorld.DebugArrow( colorOrange, origin, origin + fly_bob_add, 0 );
////		}
////	}
////}
////
/////*
////=====================
////idAI::AdjustFlyHeight
////=====================
////*/
////void idAI::AdjustFlyHeight( idVec3 &vel, const idVec3 &goalPos ) {
////	const idVec3	&origin = this.physicsObj.GetOrigin();
////	predictedPath_t path;
////	idVec3			end;
////	idVec3			dest;
////	trace_t			trace;
////	idActor			*enemyEnt;
////	bool			goLower;
////
////	// make sure we're not flying too high to get through doors
////	goLower = false;
////	if ( origin.z > goalPos.z ) {
////		dest = goalPos;
////		dest.z = origin.z + 128.0;
////		idAI::PredictPath( this, this.aas, goalPos, dest - origin, 1000, 1000, SE_BLOCKED, path );
////		if ( path.endPos.z < origin.z ) {
////			idVec3 addVel = Seek( vel, origin, path.endPos, this.AI_SEEK_PREDICTION );
////			vel.z += addVel.z;
////			goLower = true;
////		}
////        
////		if ( ai_debugMove.GetBool() ) {
////			gameRenderWorld.DebugBounds( goLower ? colorRed : colorGreen, this.physicsObj.GetBounds(), path.endPos, gameLocal.msec );
////		}
////	}
////
////	if ( !goLower ) {
////		// make sure we don't fly too low
////		end = origin;
////
////		enemyEnt = this.enemy.GetEntity();
////		if ( enemyEnt ) {
////			end.z = lastVisibleEnemyPos.z + lastVisibleEnemyEyeOffset.z + fly_offset;
////		} else {
////			// just use the default eye height for the player
////			end.z = goalPos.z + DEFAULT_FLY_OFFSET + fly_offset;
////		}
////
////		gameLocal.clip.Translation( trace, origin, end, this.physicsObj.GetClipModel(), mat3_identity, MASK_MONSTERSOLID, this );
////		vel += Seek( vel, origin, trace.endpos, this.AI_SEEK_PREDICTION );
////	}
////}
////
/////*
////=====================
////idAI::FlySeekGoal
////=====================
////*/
////void idAI::FlySeekGoal( idVec3 &vel, idVec3 &goalPos ) {
////	idVec3 seekVel;
////	
////	// seek the goal position
////	seekVel = Seek( vel, this.physicsObj.GetOrigin(), goalPos, this.AI_SEEK_PREDICTION );
////	seekVel *= fly_seek_scale;
////	vel += seekVel;
////}
////
/////*
////=====================
////idAI::AdjustFlySpeed
////=====================
////*/
////void idAI::AdjustFlySpeed( idVec3 &vel ) {
////	var /*float*/ speed:number
////
////	// apply dampening
////	vel -= vel * this.AI_FLY_DAMPENING * MS2SEC( gameLocal.msec );
////
////	// gradually speed up/slow down to desired speed
////	speed = vel.Normalize();
////	speed += ( this.move.speed - speed ) * MS2SEC( gameLocal.msec );
////	if ( speed < 0.0 ) {
////		speed = 0.0;
////	} else if ( this.move.speed && ( speed > this.move.speed ) ) {
////		speed = this.move.speed;
////	}
////
////	vel *= speed;
////}
////
/////*
////=====================
////idAI::FlyTurn
////=====================
////*/
////void idAI::FlyTurn( ) {
////	if ( this.move.moveCommand == MOVE_FACE_ENEMY ) {
////		TurnToward( lastVisibleEnemyPos );
////	} else if ( ( this.move.moveCommand == MOVE_FACE_ENTITY ) && this.move.goalEntity.GetEntity() ) {
////		TurnToward( this.move.goalEntity.GetEntity().GetPhysics().GetOrigin() );
////	} else if ( this.move.speed > 0.0 ) {
////		const idVec3 &vel = this.physicsObj.GetLinearVelocity();
////		if ( vel.ToVec2().LengthSqr() > 0.1f ) {
////			TurnToward( vel.ToYaw() );
////		}
////	}
////	Turn();
////}
////
/////*
////=====================
////idAI::FlyMove
////=====================
////*/
////void idAI::FlyMove( ) {
////	idVec3	goalPos;
////	idVec3	oldorigin;
////	idVec3	newDest;
////
////	this.AI_BLOCKED = false;
////	if ( ( this.move.moveCommand != MOVE_NONE ) && ReachedPos( this.move.moveDest, this.move.moveCommand ) ) {
////		StopMove( moveStatus_t.MOVE_STATUS_DONE );
////	}
////
////	if ( ai_debugMove.GetBool() ) {
////		gameLocal.Printf( "%d: %s: %s, vel = %.2f, sp = %.2f, maxsp = %.2f\n", gameLocal.time, this.name.c_str(), moveCommandString[ this.move.moveCommand ], this.physicsObj.GetLinearVelocity().Length(), this.move.speed, fly_speed );
////	}
////
////	if ( this.move.moveCommand != moveCommand_t.MOVE_TO_POSITION_DIRECT ) {
////		idVec3 vel = this.physicsObj.GetLinearVelocity();
////
////		if ( GetMovePos( goalPos ) ) {
////			CheckObstacleAvoidance( goalPos, newDest );
////			goalPos = newDest;
////		}
////
////		if ( this.move.speed	) {
////			FlySeekGoal( vel, goalPos );
////		}
////
////		// add in bobbing
////		AddFlyBob( vel );
////
////		if ( this.enemy.GetEntity() && ( this.move.moveCommand != moveCommand_t.MOVE_TO_POSITION ) ) {
////			AdjustFlyHeight( vel, goalPos );
////		}
////
////		AdjustFlySpeed( vel );
////
////		this.physicsObj.SetLinearVelocity( vel );
////	}
////
////	// turn
////	FlyTurn();
////
////	// run the physics for this frame
////	oldorigin = this.physicsObj.GetOrigin();
////	this.physicsObj.UseFlyMove( true );
////	this.physicsObj.UseVelocityMove( false );
////	this.physicsObj.SetDelta( vec3_zero );
////	this.physicsObj.ForceDeltaMove( disableGravity );
////	RunPhysics();
////
////	monsterMoveResult_t	moveResult = this.physicsObj.GetMoveResult();
////	if ( !this.af_push_moveables && attack.Length() && TestMelee() ) {
////		DirectDamage( attack, this.enemy.GetEntity() );
////	} else {
////		idEntity *blockEnt = this.physicsObj.GetSlideMoveEntity();
////		if ( blockEnt && blockEnt.IsType( idMoveable::Type ) && blockEnt.GetPhysics().IsPushable() ) {
////			KickObstacles( this.viewAxis[ 0 ], kickForce, blockEnt );
////		} else if ( moveResult == MM_BLOCKED ) {
////			this.move.blockTime = gameLocal.time + 500;
////			this.AI_BLOCKED = true;
////		}
////	}
////
////	idVec3 org = this.physicsObj.GetOrigin();
////	if ( oldorigin != org ) {
////		TouchTriggers();
////	}
////
////	if ( ai_debugMove.GetBool() ) {
////		gameRenderWorld.DebugLine( colorCyan, oldorigin, this.physicsObj.GetOrigin(), 4000 );
////		gameRenderWorld.DebugBounds( colorOrange, this.physicsObj.GetBounds(), org, gameLocal.msec );
////		gameRenderWorld.DebugBounds( colorMagenta, this.physicsObj.GetBounds(), this.move.moveDest, gameLocal.msec );
////		gameRenderWorld.DebugLine( colorRed, org, org + this.physicsObj.GetLinearVelocity(), gameLocal.msec, true );
////		gameRenderWorld.DebugLine( colorBlue, org, goalPos, gameLocal.msec, true );
////		gameRenderWorld.DebugLine( colorYellow, org + EyeOffset(), org + EyeOffset() + this.viewAxis[ 0 ] * this.physicsObj.GetGravityAxis() * 16.0, gameLocal.msec, true );
////		DrawRoute();
////	}
////}
////
/////*
////=====================
////idAI::StaticMove
////=====================
////*/
////void idAI::StaticMove( ) {
////	idActor	*enemyEnt = this.enemy.GetEntity();
////
////	if ( this.AI_DEAD ) {
////		return;
////	}
////
////	if ( ( this.move.moveCommand == MOVE_FACE_ENEMY ) && enemyEnt ) {
////		TurnToward( lastVisibleEnemyPos );
////	} else if ( ( this.move.moveCommand == MOVE_FACE_ENTITY ) && this.move.goalEntity.GetEntity() ) {
////		TurnToward( this.move.goalEntity.GetEntity().GetPhysics().GetOrigin() );
////	} else if ( this.move.moveCommand != MOVE_NONE ) {
////		TurnToward( this.move.moveDest );
////	}
////	Turn();
////
////	this.physicsObj.ForceDeltaMove( true ); // disable gravity
////	RunPhysics();
////
////	this.AI_ONGROUND = false;
////
////	if ( !this.af_push_moveables && attack.Length() && TestMelee() ) {
////		DirectDamage( attack, enemyEnt );
////	}
////
////	if ( ai_debugMove.GetBool() ) {
////		const idVec3 &org = this.physicsObj.GetOrigin();
////		gameRenderWorld.DebugBounds( colorMagenta, this.physicsObj.GetBounds(), org, gameLocal.msec );
////		gameRenderWorld.DebugLine( colorBlue, org, this.move.moveDest, gameLocal.msec, true );
////		gameRenderWorld.DebugLine( colorYellow, org + EyeOffset(), org + EyeOffset() + this.viewAxis[ 0 ] * this.physicsObj.GetGravityAxis() * 16.0, gameLocal.msec, true );
////	}
////}
////
/////***********************************************************************
////
////	Damage
////
////***********************************************************************/
////
/////*
////=====================
////idAI::ReactionTo
////=====================
////*/
////int idAI::ReactionTo( const ent:idEntity ) {
////
////	if ( ent.fl.hidden ) {
////		// ignore hidden entities
////		return ATTACK_IGNORE;
////	}
////
////	if ( !ent.IsType( idActor::Type ) ) {
////		return ATTACK_IGNORE;
////	}
////
////	const idActor *actor = static_cast<const idActor *>( ent );
////	if ( actor.IsType( idPlayer::Type ) && static_cast<const idPlayer *>(actor).noclip ) {
////		// ignore players in noclip mode
////		return ATTACK_IGNORE;
////	}
////
////	// actors on different teams will always fight each other
////	if ( actor.team != this.team ) {
////		if ( actor.fl.notarget ) {
////			// don't attack on sight when attacker is notargeted
////			return ATTACK_ON_DAMAGE | ATTACK_ON_ACTIVATE;
////		}
////		return ATTACK_ON_SIGHT | ATTACK_ON_DAMAGE | ATTACK_ON_ACTIVATE;
////	}
////
////	// monsters will fight when attacked by lower ranked monsters.  rank 0 never fights back.
////	if ( rank && ( actor.rank < rank ) ) {
////		return ATTACK_ON_DAMAGE;
////	}
////
////	// don't fight back
////	return ATTACK_IGNORE;
////}
////
////
/////*
////=====================
////idAI::Pain
////=====================
////*/
////bool idAI::Pain( idEntity *inflictor, idEntity *attacker, int damage, const idVec3 &dir, int location ) {
////	idActor	*actor;
////
////	this.AI_PAIN = idActor::Pain( inflictor, attacker, damage, dir, location );
////	this.AI_DAMAGE = true;
////
////	// force a blink
////	blink_time = 0;
////
////	// ignore damage from self
////	if ( attacker != this ) {
////		if ( inflictor ) {
////			this.AI_SPECIAL_DAMAGE = inflictor.spawnArgs.GetInt( "special_damage" );
////		} else {
////			this.AI_SPECIAL_DAMAGE = 0;
////		}
////
////		if ( this.enemy.GetEntity() != attacker && attacker.IsType( idActor::Type ) ) {
////			actor = ( idActor * )attacker;
////			if ( ReactionTo( actor ) & ATTACK_ON_DAMAGE ) {
////				gameLocal.AlertAI( actor );
////				SetEnemy( actor );
////			}
////		}
////	}
////
////	return ( this.AI_PAIN != 0 );
////}


/*
=====================
idAI::SpawnParticles
=====================
*/
	SpawnParticles ( keyName: string ): void {
		var kv = this.spawnArgs.MatchPrefix( keyName, null );
		while ( kv ) {
			var pe = new particleEmitter_t;

			var particleName = new idStr( kv.GetValue ( ) );

			if ( particleName.Length ( ) ) {

				var jointName = new idStr( kv.GetValue ( ) );
				var /*int */dash = jointName.Find( '-' );
				if ( dash > 0 ) {
					particleName = particleName.Left( dash );
					jointName.opEquals( jointName.Right( jointName.Length ( ) - dash - 1 ) );
				}

				this.SpawnParticlesOnJoint(pe, particleName.data, jointName.data );
				this.particles.Append( pe );
			}

			kv = this.spawnArgs.MatchPrefix( keyName, kv );
		}
	}

/*
=====================
idAI::SpawnParticlesOnJoint
=====================
*/
	SpawnParticlesOnJoint ( pe: particleEmitter_t, particleName: string, jointName: string ): idDeclParticle {
		var origin = new idVec3;
		var axis = new idMat3;

		if ( !particleName ) {
			pe.memset0 ( );
			return pe.particle;
		}

		pe.joint = this.animator.GetJointHandle( jointName );
		if ( pe.joint == jointHandle_t.INVALID_JOINT ) {
			gameLocal.Warning( "Unknown particleJoint '%s' on '%s'", jointName, this.name.c_str ( ) );
			pe.time = 0;
			pe.particle = null;
		} else {
			this.animator.GetJointTransform( pe.joint, gameLocal.time, origin, axis );
			origin.opEquals( this.renderEntity.origin.opAddition( idMat3.opMultiplication_VecMat( origin, this.renderEntity.axis ) ) );

			this.BecomeActive( TH_UPDATEPARTICLES );
			if ( !gameLocal.time ) {
				// this.particles with time of 0 don't show, so set the time differently on the first frame
				pe.time = 1;
			} else {
				pe.time = gameLocal.time;
			}
			pe.particle = static_cast<idDeclParticle>( declManager.FindType( declType_t.DECL_PARTICLE, particleName ) );
			gameLocal.smokeParticles.EmitSmoke( pe.particle, pe.time, gameLocal.random.CRandomFloat ( ), origin, axis );
		}

		return pe.particle;
	}

/////*
////=====================
////idAI::Killed
////=====================
////*/
////void idAI::Killed( idEntity *inflictor, idEntity *attacker, int damage, const idVec3 &dir, int location ) {
////	idAngles ang;
////	const char *modelDeath;
////
////	// make sure the monster is activated
////	EndAttack();
////
////	if ( g_debugDamage.GetBool() ) {
////		gameLocal.Printf( "Damage: joint: '%s', zone '%s'\n", this.animator.GetJointName( ( jointHandle_t )location ), 
////			GetDamageGroup( location ) );
////	}
////
////	if ( inflictor ) {
////		this.AI_SPECIAL_DAMAGE = inflictor.spawnArgs.GetInt( "special_damage" );
////	} else {
////		this.AI_SPECIAL_DAMAGE = 0;
////	}
////
////	if ( this.AI_DEAD ) {
////		this.AI_PAIN = true;
////		this.AI_DAMAGE = true;
////		return;
////	}
////
////	// stop all voice sounds
////	this.StopSound( SND_CHANNEL_VOICE, false );
////	if ( this.head.GetEntity() ) {
////		this.head.GetEntity().StopSound( SND_CHANNEL_VOICE, false );
////		this.head.GetEntity().GetAnimator().ClearAllAnims( gameLocal.time, 100 );
////	}
////
////	disableGravity = false;
////	this.move.moveType = MOVETYPE_DEAD;
////	this.af_push_moveables = false;
////
////	this.physicsObj.UseFlyMove( false );
////	this.physicsObj.ForceDeltaMove( false );
////
////	// end our looping ambient sound
////	this.StopSound( SND_CHANNEL_AMBIENT, false );
////
////	if ( attacker && attacker.IsType( idActor::Type ) ) {
////		gameLocal.AlertAI( ( idActor * )attacker );
////	}
////
////	// activate targets
////	ActivateTargets( attacker );
////
////	RemoveAttachments();
////	RemoveProjectile();
////	StopMove( moveStatus_t.MOVE_STATUS_DONE );
////
////	ClearEnemy();
////	this.AI_DEAD	= true;
////
////	// make monster nonsolid
////	this.physicsObj.SetContents( 0 );
////	this.physicsObj.GetClipModel().Unlink();
////
////	Unbind();
////
////	if ( StartRagdoll() ) {
////		this.StartSound( "snd_death", SND_CHANNEL_VOICE, 0, false, NULL );
////	}
////
////	if ( this.spawnArgs.GetString( "model_death", "", &modelDeath ) ) {
////		// lost soul is only case that does not use a ragdoll and has a model_death so get the death sound in here
////		this.StartSound( "snd_death", SND_CHANNEL_VOICE, 0, false, NULL );
////		this.renderEntity.shaderParms[ SHADERPARM_TIMEOFFSET ] = -MS2SEC( gameLocal.time );
////		SetModel( modelDeath );
////		this.physicsObj.SetLinearVelocity( vec3_zero );
////		this.physicsObj.PutToRest();
////		this.physicsObj.DisableImpact();
////	}
////
////	this.restartParticles = false;
////
////	state = GetScriptFunction( "state_Killed" );
////	SetState( state );
////	SetWaitState( "" );
////
////	const idKeyValue *kv = this.spawnArgs.MatchPrefix( "def_drops", NULL );
////	while( kv ) {
////		idDict args;
////
////		args.Set( "classname", kv.GetValue() );
////		args.Set( "origin", this.physicsObj.GetOrigin().ToString() );
////		gameLocal.SpawnEntityDef( args );
////		kv = this.spawnArgs.MatchPrefix( "def_drops", kv );
////	}
////
////	if ( ( attacker && attacker.IsType( idPlayer::Type ) ) && ( inflictor && !inflictor.IsType( idSoulCubeMissile::Type ) ) ) {
////		static_cast< idPlayer* >( attacker ).AddAIKill();
////	}
////}
////
/////***********************************************************************
////
////	Targeting/Combat
////
////***********************************************************************/
////
/////*
////=====================
////idAI::PlayCinematic
////=====================
////*/
////void idAI::PlayCinematic( ) {
////	const char *animname;
////
////	if ( this.current_cinematic >= this.num_cinematics ) {
////		if ( g_debugCinematic.GetBool() ) {
////			gameLocal.Printf( "%d: '%s' stop\n", gameLocal.framenum, GetName() );
////		}
////		if ( !this.spawnArgs.GetBool( "cinematic_no_hide" ) ) {
////			this.Hide();
////		}
////		this.current_cinematic = 0;
////		ActivateTargets( gameLocal.GetLocalPlayer() );
////		this.fl.neverDormant = false;
////		return;
////	}
////
////	Show();
////	this.current_cinematic++;
////
////	allowJointMod = false;
////	allowEyeFocus = false;
////
////	this.spawnArgs.GetString( va( "anim%d", this.current_cinematic ), NULL, &animname );
////	if ( !animname ) {
////		gameLocal.Warning( "missing 'anim%d' key on %s", this.current_cinematic, this.name.c_str() );
////		return;
////	}
////
////	if ( g_debugCinematic.GetBool() ) {
////		gameLocal.Printf( "%d: '%s' start '%s'\n", gameLocal.framenum, GetName(), animname );
////	}
////
////	headAnim.animBlendFrames = 0;
////	headAnim.lastAnimBlendFrames = 0;
////	headAnim.BecomeIdle();
////
////	legsAnim.animBlendFrames = 0;
////	legsAnim.lastAnimBlendFrames = 0;
////	legsAnim.BecomeIdle();
////
////	torsoAnim.animBlendFrames = 0;
////	torsoAnim.lastAnimBlendFrames = 0;
////	ProcessEvent( &this.AI_PlayAnim, ANIMCHANNEL_TORSO, animname );
////
////	// make sure our model gets updated
////	this.animator.ForceUpdate();
////
////	// update the anim bounds
////	UpdateAnimation();
////	UpdateVisuals();
////	Present();
////
////	if ( this.head.GetEntity() ) {
////		// since the body anim was updated, we need to run physics to update the position of the head
////		RunPhysics();
////
////		// make sure our model gets updated
////		this.head.GetEntity().GetAnimator().ForceUpdate();
////
////		// update the anim bounds
////		this.head.GetEntity().UpdateAnimation();
////		this.head.GetEntity().UpdateVisuals();
////		this.head.GetEntity().Present();
////	}
////
////	this.fl.neverDormant = true;
////}
////
/////*
////=====================
////idAI::Activate
////
////Notifies the script that a monster has been activated by a trigger or flashlight
////=====================
////*/
////void idAI::Activate( activator:idEntity ) {
////	idPlayer *player;
////
////	if ( this.AI_DEAD ) {
////		// ignore it when they're dead
////		return;
////	}
////
////	// make sure he's not dormant
////	dormantStart = 0;
////
////	if ( this.num_cinematics ) {
////		PlayCinematic();
////	} else {
////		this.AI_ACTIVATED = true;
////		if ( !activator || !activator.IsType( idPlayer::Type ) ) {
////			player = gameLocal.GetLocalPlayer();
////		} else {
////			player = static_cast<idPlayer *>( activator );
////		}
////
////		if ( ReactionTo( player ) & ATTACK_ON_ACTIVATE ) {
////			SetEnemy( player );
////		}
////
////		// update the script in cinematics so that entities don't start anims or show themselves a frame late.
////		if ( cinematic ) {
////            UpdateAIScript();
////
////			// make sure our model gets updated
////			this.animator.ForceUpdate();
////
////			// update the anim bounds
////			UpdateAnimation();
////			UpdateVisuals();
////			Present();
////
////			if ( this.head.GetEntity() ) {
////				// since the body anim was updated, we need to run physics to update the position of the head
////				RunPhysics();
////
////				// make sure our model gets updated
////				this.head.GetEntity().GetAnimator().ForceUpdate();
////
////				// update the anim bounds
////				this.head.GetEntity().UpdateAnimation();
////				this.head.GetEntity().UpdateVisuals();
////				this.head.GetEntity().Present();
////			}
////		}
////	}
////}
////
/////*
////=====================
////idAI::EnemyDead
////=====================
////*/
////void idAI::EnemyDead( ) {
////	ClearEnemy();
////	this.AI_ENEMY_DEAD = true;
////}
////
/////*
////=====================
////idAI::TalkTo
////=====================
////*/
////void idAI::TalkTo( idActor *actor ) {
////	if ( this.talk_state != talkState_t.TALK_OK ) {
////		return;
////	}
////
////	talkTarget .opEquals(actor;
////	if ( actor ) {
////		this.AI_TALK = true;
////	} else {
////		this.AI_TALK = false;
////	}
////}
////
/////*
////=====================
////idAI::GetEnemy
////=====================
////*/
////idActor	*idAI::GetEnemy( ) const {
////	return this.enemy.GetEntity();
////}
////
/////*
////=====================
////idAI::GetTalkState
////=====================
////*/
////talkState_t idAI::GetTalkState( ) const {
////	if ( ( this.talk_state != talkState_t.TALK_NEVER ) && this.AI_DEAD ) {
////		return talkState_t.TALK_DEAD;
////	}
////	if ( this.IsHidden() ) {
////		return talkState_t.TALK_NEVER;
////	}
////	return this.talk_state;
////}
////
/////*
////=====================
////idAI::TouchedByFlashlight
////=====================
////*/
////void idAI::TouchedByFlashlight( idActor *flashlight_owner ) {
////	if ( wakeOnFlashlight ) {
////		Activate( flashlight_owner );
////	}
////}
////
/////*
////=====================
////idAI::ClearEnemy
////=====================
////*/
////void idAI::ClearEnemy( ) {
////	if ( this.move.moveCommand == moveCommand_t.MOVE_TO_ENEMY ) {
////		StopMove( moveStatus_t.MOVE_STATUS_DEST_NOT_FOUND );
////	}
////
////	enemyNode.Remove();
////	this.enemy				= NULL;
////	this.AI_ENEMY_IN_FOV		= false;
////	this.AI_ENEMY_VISIBLE	= false;
////	this.AI_ENEMY_DEAD		= true;
////
////	this.SetChatSound();
////}
////
/////*
////=====================
////idAI::EnemyPositionValid
////=====================
////*/
////bool idAI::EnemyPositionValid( ) const {
////	trace_t	tr;
////	idVec3	muzzle;
////	idMat3	axis;
////
////	if ( !this.enemy.GetEntity() ) {
////		return false;
////	}
////
////	if ( this.AI_ENEMY_VISIBLE ) {
////		return true;
////	}
////
////	gameLocal.clip.TracePoint( tr, GetEyePosition(), lastVisibleEnemyPos + lastVisibleEnemyEyeOffset, MASK_OPAQUE, this );
////	if ( tr.fraction < 1.0 ) {
////		// can't see the area yet, so don't know if he's there or not
////		return true;
////	}
////
////	return false;
////}
////
/////*
////=====================
////idAI::SetEnemyPosition
////=====================
////*/
////void idAI::SetEnemyPosition( ) {
////	idActor		*enemyEnt = this.enemy.GetEntity();
////	int			enemyAreaNum;
////	int			areaNum;
////	int			lastVisibleReachableEnemyAreaNum = 0;
////	aasPath_t	path;
////	idVec3		pos;
////	bool		onGround;
////
////	if ( !enemyEnt ) {
////		return;
////	}
////
////	lastVisibleReachableEnemyPos .opEquals( lastReachableEnemyPos;
////	lastVisibleEnemyEyeOffset .opEquals( enemyEnt.EyeOffset();
////	lastVisibleEnemyPos .opEquals( enemyEnt.GetPhysics().GetOrigin();
////	if ( this.move.moveType == MOVETYPE_FLY ) {
////		pos = lastVisibleEnemyPos;
////		onGround = true;
////	} else {
////		onGround = enemyEnt.GetFloorPos( 64.0, pos );
////		if ( enemyEnt.OnLadder() ) {
////			onGround = false;
////		}
////	}
////
////	if ( !onGround ) {
////		if ( this.move.moveCommand == moveCommand_t.MOVE_TO_ENEMY ) {
////			this.AI_DEST_UNREACHABLE = true;
////		}
////		return;
////	}
////
////	// when we don't have an AAS, we can't tell if an enemy is reachable or not,
////	// so just assume that he is.
////	if ( !this.aas ) {
////		lastVisibleReachableEnemyPos .opEquals( lastVisibleEnemyPos;
////		if ( this.move.moveCommand == moveCommand_t.MOVE_TO_ENEMY ) {
////			this.AI_DEST_UNREACHABLE = false;
////		}
////		enemyAreaNum = 0;
////		areaNum = 0;
////	} else {
////		lastVisibleReachableEnemyAreaNum = this.move.toAreaNum;
////		enemyAreaNum = PointReachableAreaNum( lastVisibleEnemyPos, 1.0 );
////		if ( !enemyAreaNum ) {
////			enemyAreaNum = PointReachableAreaNum( lastReachableEnemyPos, 1.0 );
////			pos = lastReachableEnemyPos;
////		}
////		if ( !enemyAreaNum ) {
////			if ( this.move.moveCommand == moveCommand_t.MOVE_TO_ENEMY ) {
////				this.AI_DEST_UNREACHABLE = true;
////			}
////			areaNum = 0;
////		} else {
////			const idVec3 &org = this.physicsObj.GetOrigin();
////			areaNum = PointReachableAreaNum( org );
////			if ( PathToGoal( path, areaNum, org, enemyAreaNum, pos ) ) {
////				lastVisibleReachableEnemyPos .opEquals(pos;
////				lastVisibleReachableEnemyAreaNum = enemyAreaNum;
////				if ( this.move.moveCommand == moveCommand_t.MOVE_TO_ENEMY ) {
////					this.AI_DEST_UNREACHABLE = false;
////				}
////			} else if ( this.move.moveCommand == moveCommand_t.MOVE_TO_ENEMY ) {
////				this.AI_DEST_UNREACHABLE = true;
////			}
////		}
////	}
////
////	if ( this.move.moveCommand == moveCommand_t.MOVE_TO_ENEMY ) {
////		if ( !this.aas ) {
////			// keep the this.move destination up to date for wandering
////			this.move.moveDest = lastVisibleReachableEnemyPos;
////		} else if ( enemyAreaNum ) {
////			this.move.toAreaNum = lastVisibleReachableEnemyAreaNum;
////			this.move.moveDest = lastVisibleReachableEnemyPos;
////		}
////
////		if ( this.move.moveType == MOVETYPE_FLY ) {
////			predictedPath_t path;
////			idVec3 end = this.move.moveDest;
////			end.z += enemyEnt.EyeOffset().z + fly_offset;
////			idAI::PredictPath( this, this.aas, this.move.moveDest, end - this.move.moveDest, 1000, 1000, SE_BLOCKED, path );
////			this.move.moveDest = path.endPos;
////			this.move.toAreaNum = PointReachableAreaNum( this.move.moveDest, 1.0 );
////		}
////	}
////}
////
/////*
////=====================
////idAI::UpdateEnemyPosition
////=====================
////*/
////void idAI::UpdateEnemyPosition( ) {
////	idActor *enemyEnt = this.enemy.GetEntity();
////	int				enemyAreaNum;
////	int				areaNum;
////	aasPath_t		path;
////	predictedPath_t predictedPath;
////	idVec3			enemyPos;
////	bool			onGround;
////
////	if ( !enemyEnt ) {
////		return;
////	}
////
////	const idVec3 &org = this.physicsObj.GetOrigin();
////
////	if ( this.move.moveType == MOVETYPE_FLY ) {
////		enemyPos = enemyEnt.GetPhysics().GetOrigin();
////		onGround = true;
////	} else {
////		onGround = enemyEnt.GetFloorPos( 64.0, enemyPos );
////		if ( enemyEnt.OnLadder() ) {
////			onGround = false;
////		}
////	}
////
////	if ( onGround ) {
////		// when we don't have an AAS, we can't tell if an enemy is reachable or not,
////		// so just assume that he is.
////		if ( !this.aas ) {
////			enemyAreaNum = 0;
////			lastReachableEnemyPos .opEquals( enemyPos;
////		} else {
////			enemyAreaNum = PointReachableAreaNum( enemyPos, 1.0 );
////			if ( enemyAreaNum ) {
////				areaNum = PointReachableAreaNum( org );
////				if ( PathToGoal( path, areaNum, org, enemyAreaNum, enemyPos ) ) {
////					lastReachableEnemyPos .opEquals( enemyPos;
////				}
////			}
////		}
////	}
////
////	this.AI_ENEMY_IN_FOV		= false;
////	this.AI_ENEMY_VISIBLE	= false;
////
////	if ( CanSee( enemyEnt, false ) ) {
////		this.AI_ENEMY_VISIBLE = true;
////		if ( CheckFOV( enemyEnt.GetPhysics().GetOrigin() ) ) {
////			this.AI_ENEMY_IN_FOV = true;
////		}
////
////		SetEnemyPosition();
////	} else {
////		// check if we heard any sounds in the last frame
////		if ( enemyEnt == gameLocal.GetAlertEntity() ) {
////			float dist = ( enemyEnt.GetPhysics().GetOrigin() - org ).LengthSqr();
////			if ( dist < Square( this.AI_HEARING_RANGE ) ) {
////				SetEnemyPosition();
////			}
////		}
////	}
////
////	if ( ai_debugMove.GetBool() ) {
////		gameRenderWorld.DebugBounds( colorLtGrey, enemyEnt.GetPhysics().GetBounds(), lastReachableEnemyPos, gameLocal.msec );
////		gameRenderWorld.DebugBounds( colorWhite, enemyEnt.GetPhysics().GetBounds(), lastVisibleReachableEnemyPos, gameLocal.msec );
////	}
////}
////
/////*
////=====================
////idAI::SetEnemy
////=====================
////*/
////void idAI::SetEnemy( idActor *newEnemy ) {
////	int enemyAreaNum;
////
////	if ( this.AI_DEAD ) {
////		ClearEnemy();
////		return;
////	}
////
////	this.AI_ENEMY_DEAD = false;
////	if ( !newEnemy ) {
////		ClearEnemy();
////	} else if ( this.enemy.GetEntity() != newEnemy ) {
////		this.enemy = newEnemy;
////		enemyNode.AddToEnd( newEnemy.enemyList );
////		if ( newEnemy.health <= 0 ) {
////			EnemyDead();
////			return;
////		}
////		// let the monster know where the enemy is
////		newEnemy.GetAASLocation( this.aas, lastReachableEnemyPos, enemyAreaNum );
////		SetEnemyPosition();
////		this.SetChatSound();
////
////		lastReachableEnemyPos .opEquals( lastVisibleEnemyPos;
////		lastVisibleReachableEnemyPos .opEquals( lastReachableEnemyPos;
////		enemyAreaNum = PointReachableAreaNum( lastReachableEnemyPos, 1.0 );
////		if ( this.aas && enemyAreaNum ) {
////			this.aas.PushPointIntoAreaNum( enemyAreaNum, lastReachableEnemyPos );
////			lastVisibleReachableEnemyPos .opEquals( lastReachableEnemyPos;
////		}
////	}
////}
////
/////*
////============
////idAI::FirstVisiblePointOnPath
////============
////*/
////idVec3 idAI::FirstVisiblePointOnPath( const idVec3 origin, const idVec3 &target, int travelFlags ) const {
////	int i, areaNum, targetAreaNum, curAreaNum, travelTime;
////	idVec3 curOrigin;
////	idReachability *reach;
////
////	if ( !this.aas ) {
////		return origin;
////	}
////
////	areaNum = PointReachableAreaNum( origin );
////	targetAreaNum = PointReachableAreaNum( target );
////
////	if ( !areaNum || !targetAreaNum ) {
////		return origin;
////	}
////
////	if ( ( areaNum == targetAreaNum ) || PointVisible( origin ) ) {
////		return origin;
////	}
////
////	curAreaNum = areaNum;
////	curOrigin = origin;
////
////	for( i = 0; i < 10; i++ ) {
////
////		if ( !this.aas.RouteToGoalArea( curAreaNum, curOrigin, targetAreaNum, travelFlags, travelTime, &reach ) ) {
////			break;
////		}
////
////		if ( !reach ) {
////			return target;
////		}
////
////		curAreaNum = reach.toAreaNum;
////		curOrigin = reach.end;
////
////		if ( PointVisible( curOrigin ) ) {
////			return curOrigin;
////		}
////	}
////
////	return origin;
////}
////
/*
===================
idAI::CalculateAttackOffsets

calculate joint positions on attack frames so we can do proper "can hit" tests
===================
*/
	CalculateAttackOffsets ( ): void {
		var modelDef: idDeclModelDef;
		var num: number;
		var i: number /*int*/;
		var frame: number /*int*/;
		var command = new R<frameCommand_t> ( );
		var axis = new idMat3;
		var anim: idAnim;
		var joint: jointHandle_t;

		modelDef = this.animator.ModelDef ( );
		if ( !modelDef ) {
			return;
		}
		num = modelDef.NumAnims ( );

		// needs to be off while getting the offsets so that we account for the distance the monster moves in the attack anim
		this.animator.RemoveOriginOffset( false );

		// anim number 0 is reserved for non-existant anims.  to avoid off by one issues, just allocate an extra spot for
		// launch offsets so that anim number can be used without subtracting 1.
		this.missileLaunchOffset.SetGranularity( 1 );
		this.missileLaunchOffset.SetNum( num + 1 );
		this.missileLaunchOffset[0].Zero ( );

		for ( i = 1; i <= num; i++ ) {
			this.missileLaunchOffset[i].Zero ( );
			anim = modelDef.GetAnim_index( i );
			if ( anim ) {
				frame = anim.FindFrameForFrameCommand( frameCommandType_t.FC_LAUNCHMISSILE, command );
				if ( frame >= 0 ) {
					joint = this.animator.GetJointHandle( command.$.$string.c_str ( ) );
					if ( joint == jointHandle_t.INVALID_JOINT ) {
						gameLocal.Error( "Invalid joint '%s' on 'launch_missile' frame command on frame %d of model '%s'", command.$.$string.c_str ( ), frame, modelDef.GetName ( ) );
					}
					this.GetJointTransformForAnim( joint, i, FRAME2MS( frame ), this.missileLaunchOffset[i], axis );
				}
			}
		}

		this.animator.RemoveOriginOffset( true );
	}

/////*
////=====================
////idAI::CreateProjectileClipModel
////=====================
////*/
////void idAI::CreateProjectileClipModel( ) const {
////	if ( this.projectileClipModel == NULL ) {
////		idBounds projectileBounds( vec3_origin );
////		projectileBounds.ExpandSelf( this.projectileRadius );
////		this.projectileClipModel	= new idClipModel( idTraceModel( projectileBounds ) );
////	}
////}
////
/////*
////=====================
////idAI::GetAimDir
////=====================
////*/
////bool idAI::GetAimDir( const idVec3 &firePos, idEntity *aimAtEnt, const idEntity *ignore, idVec3 &aimDir ) const {
////	idVec3	targetPos1;
////	idVec3	targetPos2;
////	idVec3	delta;
////	float	max_height;
////	bool	result;
////
////	// if no aimAtEnt or projectile set
////	if ( !aimAtEnt || !this.projectileDef ) {
////		aimDir = this.viewAxis[ 0 ] * this.physicsObj.GetGravityAxis();
////		return false;
////	}
////
////	if ( this.projectileClipModel == NULL ) {
////		CreateProjectileClipModel();
////	}
////
////	if ( aimAtEnt == this.enemy.GetEntity() ) {
////		static_cast<idActor *>( aimAtEnt ).GetAIAimTargets( lastVisibleEnemyPos, targetPos1, targetPos2 );
////	} else if ( aimAtEnt.IsType( idActor::Type ) ) {
////		static_cast<idActor *>( aimAtEnt ).GetAIAimTargets( aimAtEnt.GetPhysics().GetOrigin(), targetPos1, targetPos2 );
////	} else {
////		targetPos1 = aimAtEnt.GetPhysics().GetAbsBounds().GetCenter();
////		targetPos2 = targetPos1;
////	}
////
////	// try aiming for chest
////	delta = firePos - targetPos1;
////	max_height = delta.LengthFast() * projectile_height_to_distance_ratio;
////	result = PredictTrajectory( firePos, targetPos1, this.projectileSpeed, this.projectileGravity, this.projectileClipModel, MASK_SHOT_RENDERMODEL, max_height, ignore, aimAtEnt, ai_debugTrajectory.GetBool() ? 1000 : 0, aimDir );
////	if ( result || !aimAtEnt.IsType( idActor::Type ) ) {
////		return result;
////	}
////
////	// try aiming for head
////	delta = firePos - targetPos2;
////	max_height = delta.LengthFast() * projectile_height_to_distance_ratio;
////	result = PredictTrajectory( firePos, targetPos2, this.projectileSpeed, this.projectileGravity, this.projectileClipModel, MASK_SHOT_RENDERMODEL, max_height, ignore, aimAtEnt, ai_debugTrajectory.GetBool() ? 1000 : 0, aimDir );
////
////	return result;
////}
////
/////*
////=====================
////idAI::BeginAttack
////=====================
////*/
////void idAI::BeginAttack( name:string ) {
////	attack .opEquals(name;
////	lastAttackTime = gameLocal.time;
////}
////
/////*
////=====================
////idAI::EndAttack
////=====================
////*/
////void idAI::EndAttack( ) {
////	attack .opEquals( "";
////}

/*
=====================
idAI::CreateProjectile
=====================
*/
	CreateProjectile ( pos: idVec3, dir: idVec3 ): idProjectile {
		var ent = new R<idEntity> ( );
		var clsname: string;

		if ( !this.projectile.GetEntity ( ) ) {
			gameLocal.SpawnEntityDef( this.projectileDef, ent, false );
			if ( !ent.$ ) {
				clsname = this.projectileDef.GetString( "classname" );
				gameLocal.Error( "Could not spawn entityDef '%s'", clsname );
			}

			if ( !ent.$.IsType( idProjectile.Type ) ) {
				clsname = ent.$.GetClassname ( );
				gameLocal.Error( "'%s' is not an idProjectile", clsname );
			}
			this.projectile.opEquals( <idProjectile >ent.$ );
		}

		this.projectile.GetEntity ( ).Create( this, pos, dir );

		return this.projectile.GetEntity ( );
	}

/////*
////=====================
////idAI::RemoveProjectile
////=====================
////*/
////void idAI::RemoveProjectile( ) {
////	if ( this.projectile.GetEntity() ) {
////		this.projectile.GetEntity().PostEventMS( &EV_Remove, 0 );
////		this.projectile .opEquals( NULL;
////	}
////}
////
/////*
////=====================
////idAI::LaunchProjectile
////=====================
////*/
////idProjectile *idAI::LaunchProjectile( jointname:string, idEntity *target, bool clampToAttackCone ) {
////	idVec3				muzzle;
////	idVec3				dir;
////	idVec3				start;
////	trace_t				tr;
////	idBounds			projBounds;
////	float				distance;
////	const idClipModel	*projClip;
////	float				attack_accuracy;
////	float				attack_cone;
////	float				projectile_spread;
////	float				diff;
////	float				angle;
////	float				spin;
////	idAngles			ang;
////	int					num_projectiles;
////	var i:number /*int*/;
////	idMat3				axis;
////	idVec3				tmp;
////	idProjectile		*lastProjectile;
////
////	if ( !this.projectileDef ) {
////		gameLocal.Warning( "%s (%s) doesn't have a projectile specified", this.name.c_str(), GetEntityDefName() );
////		return NULL;
////	}
////
////	attack_accuracy = this.spawnArgs.GetFloat( "attack_accuracy", "7" );
////	attack_cone = this.spawnArgs.GetFloat( "attack_cone", "70" );
////	projectile_spread = this.spawnArgs.GetFloat( "projectile_spread", "0" );
////	num_projectiles = this.spawnArgs.GetInt( "num_projectiles", "1" );
////
////	GetMuzzle( jointname, muzzle, axis );
////
////	if ( !this.projectile.GetEntity() ) {
////		CreateProjectile( muzzle, axis[ 0 ] );
////	}
////
////	lastProjectile = this.projectile.GetEntity();
////
////	if ( target != NULL ) {
////		tmp = target.GetPhysics().GetAbsBounds().GetCenter() - muzzle;
////		tmp.Normalize();
////		axis = tmp.ToMat3();
////	} else {
////		axis = this.viewAxis;
////	}
////
////	// rotate it because the cone points up by default
////	tmp = axis[2];
////	axis[2] = axis[0];
////	axis[0] = -tmp;
////
////	// make sure the projectile starts inside the monster bounding box
////	const idBounds &ownerBounds = this.physicsObj.GetAbsBounds();
////	projClip = lastProjectile.GetPhysics().GetClipModel();
////	projBounds = projClip.GetBounds().Rotate( axis );
////
////	// check if the owner bounds is bigger than the projectile bounds
////	if ( ( ( ownerBounds[1][0] - ownerBounds[0][0] ) > ( projBounds[1][0] - projBounds[0][0] ) ) &&
////		( ( ownerBounds[1][1] - ownerBounds[0][1] ) > ( projBounds[1][1] - projBounds[0][1] ) ) &&
////		( ( ownerBounds[1][2] - ownerBounds[0][2] ) > ( projBounds[1][2] - projBounds[0][2] ) ) ) {
////		if ( (ownerBounds - projBounds).RayIntersection( muzzle, this.viewAxis[ 0 ], distance ) ) {
////			start = muzzle + distance * this.viewAxis[ 0 ];
////		} else {
////			start = ownerBounds.GetCenter();
////		}
////	} else {
////		// projectile bounds bigger than the owner bounds, so just start it from the center
////		start = ownerBounds.GetCenter();
////	}
////
////	gameLocal.clip.Translation( tr, start, muzzle, projClip, axis, MASK_SHOT_RENDERMODEL, this );
////	muzzle = tr.endpos;
////
////	// set aiming direction
////	GetAimDir( muzzle, target, this, dir );
////	ang = dir.ToAngles();
////
////	// adjust his aim so it's not perfect.  uses sine based movement so the tracers appear less random in their spread.
////	float t = MS2SEC( gameLocal.time + entityNumber * 497 );
////	ang.pitch += idMath.Sin16( t * 5.1 ) * attack_accuracy;
////	ang.yaw	+= idMath.Sin16( t * 6.7 ) * attack_accuracy;
////
////	if ( clampToAttackCone ) {
////		// clamp the attack direction to be within monster's attack cone so he doesn't do
////		// things like throw the missile backwards if you're behind him
////		diff = idMath.AngleDelta( ang.yaw, this.current_yaw );
////		if ( diff > attack_cone ) {
////			ang.yaw = this.current_yaw + attack_cone;
////		} else if ( diff < -attack_cone ) {
////			ang.yaw = this.current_yaw - attack_cone;
////		}
////	}
////
////	axis = ang.ToMat3();
////
////	float spreadRad = DEG2RAD( projectile_spread );
////	for( i = 0; i < num_projectiles; i++ ) {
////		// spread the projectiles out
////		angle = idMath.Sin( spreadRad * gameLocal.random.RandomFloat() );
////		spin = (float)DEG2RAD( 360.0 ) * gameLocal.random.RandomFloat();
////		dir = axis[ 0 ] + axis[ 2 ] * ( angle * idMath.Sin( spin ) ) - axis[ 1 ] * ( angle * idMath.Cos( spin ) );
////		dir.Normalize();
////
////		// launch the projectile
////		if ( !this.projectile.GetEntity() ) {
////			CreateProjectile( muzzle, dir );
////		}
////		lastProjectile = this.projectile.GetEntity();
////		lastProjectile.Launch( muzzle, dir, vec3_origin );
////		this.projectile .opEquals( NULL;
////	}
////
////	TriggerWeaponEffects( muzzle );
////
////	lastAttackTime = gameLocal.time;
////
////	return lastProjectile;
////}
////
/////*
////================
////idAI::DamageFeedback
////
////callback function for when another entity received damage from this entity.  damage can be adjusted and returned to the caller.
////
////FIXME: This gets called when we call idPlayer::CalcDamagePoints from idAI::AttackMelee, which then checks for a saving throw,
////possibly forcing a miss.  This is harmless behavior ATM, but is not intuitive.
////================
////*/
////void idAI::DamageFeedback( idEntity *victim, idEntity *inflictor, int &damage ) {
////	if ( ( victim == this ) && inflictor.IsType( idProjectile::Type ) ) {
////		// monsters only get half damage from their own projectiles
////		damage = ( damage + 1 ) / 2;  // round up so we don't do 0 damage
////
////	} else if ( victim == this.enemy.GetEntity() ) {
////		this.AI_HIT_ENEMY = true;
////	}
////}
////
/////*
////=====================
////idAI::DirectDamage
////
////Causes direct damage to an entity
////
////kickDir is specified in the monster's coordinate system, and gives the direction
////that the view kick and knockback should go
////=====================
////*/
////void idAI::DirectDamage( const char *meleeDefName, ent:idEntity ) {
////	const idDict *meleeDef;
////	const char *p;
////	const idSoundShader *shader;
////
////	meleeDef = gameLocal.FindEntityDefDict( meleeDefName, false );
////	if ( !meleeDef ) {
////		gameLocal.Error( "Unknown damage def '%s' on '%s'", meleeDefName, this.name.c_str() );
////	}
////
////	if ( !ent.fl.takedamage ) {
////		const idSoundShader *shader = declManager.FindSound(meleeDef.GetString( "snd_miss" ));
////		StartSoundShader( shader, SND_CHANNEL_DAMAGE, 0, false, NULL );
////		return;
////	}
////
////	//
////	// do the damage
////	//
////	p = meleeDef.GetString( "snd_hit" );
////	if ( p && *p ) {
////		shader = declManager.FindSound( p );
////		StartSoundShader( shader, SND_CHANNEL_DAMAGE, 0, false, NULL );
////	}
////
////	idVec3	kickDir;
////	meleeDef.GetVector( "kickDir", "0 0 0", kickDir );
////
////	idVec3	globalKickDir;
////	globalKickDir = ( this.viewAxis * this.physicsObj.GetGravityAxis() ) * kickDir;
////
////	ent.Damage( this, this, globalKickDir, meleeDefName, 1.0, jointHandle_t.INVALID_JOINT );
////
////	// end the attack if we're a multiframe attack
////	EndAttack();
////}
////
/////*
////=====================
////idAI::TestMelee
////=====================
////*/
////bool idAI::TestMelee( ) const {
////	trace_t trace;
////	idActor *enemyEnt = this.enemy.GetEntity();
////
////	if ( !enemyEnt || !melee_range ) {
////		return false;
////	}
////
////	//FIXME: make work with gravity vector
////	idVec3 org = this.physicsObj.GetOrigin();
////	const idBounds &myBounds = this.physicsObj.GetBounds();
////	idBounds bounds;
////
////	// expand the bounds out by our melee range
////	bounds[0][0] = -melee_range;
////	bounds[0][1] = -melee_range;
////	bounds[0][2] = myBounds[0][2] - 4.0;
////	bounds[1][0] = melee_range;
////	bounds[1][1] = melee_range;
////	bounds[1][2] = myBounds[1][2] + 4.0;
////	bounds.TranslateSelf( org );
////
////	idVec3 enemyOrg = enemyEnt.GetPhysics().GetOrigin();
////	idBounds enemyBounds = enemyEnt.GetPhysics().GetBounds();
////	enemyBounds.TranslateSelf( enemyOrg );
////
////	if ( ai_debugMove.GetBool() ) {
////		gameRenderWorld.DebugBounds( colorYellow, bounds, vec3_zero, gameLocal.msec );
////	}
////
////	if ( !bounds.IntersectsBounds( enemyBounds ) ) {
////		return false;
////	}
////
////	idVec3 start = GetEyePosition();
////	idVec3 end = enemyEnt.GetEyePosition();
////
////	gameLocal.clip.TracePoint( trace, start, end, MASK_SHOT_BOUNDINGBOX, this );
////	if ( ( trace.fraction == 1.0 ) || ( gameLocal.GetTraceEntity( trace ) == enemyEnt ) ) {
////		return true;
////	}
////
////	return false;
////}
////
/////*
////=====================
////idAI::AttackMelee
////
////jointname allows the endpoint to be exactly specified in the model,
////as for the commando tentacle.  If not specified, it will be set to
////the facing direction + melee_range.
////
////kickDir is specified in the monster's coordinate system, and gives the direction
////that the view kick and knockback should go
////=====================
////*/
////bool idAI::AttackMelee( const char *meleeDefName ) {
////	const idDict *meleeDef;
////	idActor *enemyEnt = this.enemy.GetEntity();
////	const char *p;
////	const idSoundShader *shader;
////
////	meleeDef = gameLocal.FindEntityDefDict( meleeDefName, false );
////	if ( !meleeDef ) {
////		gameLocal.Error( "Unknown melee '%s'", meleeDefName );
////	}
////
////	if ( !enemyEnt ) {
////		p = meleeDef.GetString( "snd_miss" );
////		if ( p && *p ) {
////			shader = declManager.FindSound( p );
////			StartSoundShader( shader, SND_CHANNEL_DAMAGE, 0, false, NULL );
////		}
////		return false;
////	}
////
////	// check for the "saving throw" automatic melee miss on lethal blow
////	// stupid place for this.
////	bool forceMiss = false;
////	if ( enemyEnt.IsType( idPlayer::Type ) && g_skill.GetInteger() < 2 ) {
////		int	damage, armor;
////		idPlayer *player = static_cast<idPlayer*>( enemyEnt );
////		player.CalcDamagePoints( this, this, meleeDef, 1.0, jointHandle_t.INVALID_JOINT, &damage, &armor );
////
////		if ( enemyEnt.health <= damage ) {
////			int	t = gameLocal.time - player.lastSavingThrowTime;
////			if ( t > SAVING_THROW_TIME ) {
////				player.lastSavingThrowTime = gameLocal.time;
////				t = 0;
////			}
////			if ( t < 1000 ) {
////				gameLocal.Printf( "Saving throw.\n" );
////				forceMiss = true;
////			}
////		}
////	}
////
////	// make sure the trace can actually hit the enemy
////	if ( forceMiss || !TestMelee() ) {
////		// missed
////		p = meleeDef.GetString( "snd_miss" );
////		if ( p && *p ) {
////			shader = declManager.FindSound( p );
////			StartSoundShader( shader, SND_CHANNEL_DAMAGE, 0, false, NULL );
////		}
////		return false;
////	}
////
////	//
////	// do the damage
////	//
////	p = meleeDef.GetString( "snd_hit" );
////	if ( p && *p ) {
////		shader = declManager.FindSound( p );
////		StartSoundShader( shader, SND_CHANNEL_DAMAGE, 0, false, NULL );
////	}
////
////	idVec3	kickDir;
////	meleeDef.GetVector( "kickDir", "0 0 0", kickDir );
////
////	idVec3	globalKickDir;
////	globalKickDir = ( this.viewAxis * this.physicsObj.GetGravityAxis() ) * kickDir;
////
////	enemyEnt.Damage( this, this, globalKickDir, meleeDefName, 1.0, jointHandle_t.INVALID_JOINT );
////
////	lastAttackTime = gameLocal.time;
////
////	return true;
////}
////
/////*
////================
////idAI::PushWithAF
////================
////*/
////void idAI::PushWithAF( ) {
////	var /*int */i:number, j:number;
////	afTouch_t touchList[ MAX_GENTITIES ];
////	idEntity *pushed_ents[ MAX_GENTITIES ];
////	var ent:idEntity
////	idVec3 vel;
////	int num_pushed;
////
////	num_pushed = 0;
////	this.af.ChangePose( this, gameLocal.time );
////	int num = this.af.EntitiesTouchingAF( touchList );
////	for( i = 0; i < num; i++ ) {
////		if ( touchList[ i ].touchedEnt.IsType( idProjectile::Type ) ) {
////			// skip projectiles
////			continue;
////		}
////
////		// make sure we havent pushed this entity already.  this avoids causing double damage
////		for( j = 0; j < num_pushed; j++ ) {
////			if ( pushed_ents[ j ] == touchList[ i ].touchedEnt ) {
////				break;
////			}
////		}
////		if ( j >= num_pushed ) {
////			ent = touchList[ i ].touchedEnt;
////			pushed_ents[num_pushed++] = ent;
////			vel = ent.GetPhysics().GetAbsBounds().GetCenter() - touchList[ i ].touchedByBody.GetWorldOrigin();
////			vel.Normalize();
////			if ( attack.Length() && ent.IsType( idActor::Type ) ) {
////				ent.Damage( this, this, vel, attack, 1.0, jointHandle_t.INVALID_JOINT );
////			} else {
////				ent.GetPhysics().SetLinearVelocity( 100.0 * vel, touchList[ i ].touchedClipModel.GetId() );
////			}
////		}
////	}
////}
////
/////***********************************************************************
////
////	Misc
////
////***********************************************************************/
////
/////*
////================
////idAI::GetMuzzle
////================
////*/
////void idAI::GetMuzzle( jointname:string, idVec3 &muzzle, idMat3 &axis ) {
////	jointHandle_t joint;
////
////	if ( !jointname || !jointname[ 0 ] ) {
////		muzzle = this.physicsObj.GetOrigin() + this.viewAxis[ 0 ] * this.physicsObj.GetGravityAxis() * 14;
////		muzzle -= this.physicsObj.GetGravityNormal() * this.physicsObj.GetBounds()[ 1 ].z * 0.5f;
////	} else {
////		joint = this.animator.GetJointHandle( jointname );
////		if ( joint == jointHandle_t.INVALID_JOINT ) {
////			gameLocal.Error( "Unknown joint '%s' on %s", jointname, GetEntityDefName() );
////		}
////		GetJointWorldTransform( joint, gameLocal.time, muzzle, axis );
////	}
////}
////
/////*
////================
////idAI::TriggerWeaponEffects
////================
////*/
////void idAI::TriggerWeaponEffects( const idVec3 &muzzle ) {
////	idVec3 org;
////	idMat3 axis;
////
////	if ( !g_muzzleFlash.GetBool() ) {
////		return;
////	}
////
////	// muzzle flash
////	// offset the shader parms so muzzle flashes show up
////	this.renderEntity.shaderParms[SHADERPARM_TIMEOFFSET] = -MS2SEC( gameLocal.time );
////	this.renderEntity.shaderParms[ SHADERPARM_DIVERSITY ] = gameLocal.random.CRandomFloat();
////
////	if ( this.flashJointWorld != jointHandle_t.INVALID_JOINT ) {
////		GetJointWorldTransform( this.flashJointWorld, gameLocal.time, org, axis );
////
////		if ( this.worldMuzzleFlash.lightRadius.x > 0.0 ) {
////			this.worldMuzzleFlash.axis = axis;
////			this.worldMuzzleFlash.shaderParms[SHADERPARM_TIMEOFFSET] = -MS2SEC( gameLocal.time );
////			if ( this.worldMuzzleFlashHandle != - 1 ) {
////				gameRenderWorld.UpdateLightDef( this.worldMuzzleFlashHandle, &this.worldMuzzleFlash );
////			} else {
////				this.worldMuzzleFlashHandle = gameRenderWorld.AddLightDef( &this.worldMuzzleFlash );
////			}
////			muzzleFlashEnd = gameLocal.time + this.flashTime;
////			UpdateVisuals();
////		}
////	}
////}
////
/////*
////================
////idAI::UpdateMuzzleFlash
////================
////*/
////void idAI::UpdateMuzzleFlash( ) {
////	if ( this.worldMuzzleFlashHandle != -1 ) { 
////		if ( gameLocal.time >= muzzleFlashEnd ) {
////			gameRenderWorld.FreeLightDef( this.worldMuzzleFlashHandle );
////			this.worldMuzzleFlashHandle = -1;
////		} else {
////			idVec3 muzzle;
////			this.animator.GetJointTransform( this.flashJointWorld, gameLocal.time, muzzle, this.worldMuzzleFlash.axis );
////			this.animator.GetJointTransform( this.flashJointWorld, gameLocal.time, muzzle, this.worldMuzzleFlash.axis );
////			muzzle = this.physicsObj.GetOrigin() + ( muzzle + modelOffset ) * this.viewAxis * this.physicsObj.GetGravityAxis();
////			this.worldMuzzleFlash.origin = muzzle;
////			gameRenderWorld.UpdateLightDef( this.worldMuzzleFlashHandle, &this.worldMuzzleFlash );
////		}
////	}
////}

/*
================
idAI::Hide
================
*/
	Hide ( ): void {
		super.Hide ( );
		this.fl.takedamage = false;
		this.physicsObj.SetContents( 0 );
		this.physicsObj.GetClipModel ( ).Unlink ( );
		this.StopSound( gameSoundChannel_t.SND_CHANNEL_AMBIENT, false );
		this.SetChatSound ( );

		this.AI_ENEMY_IN_FOV.opEquals( false );
		this.AI_ENEMY_VISIBLE.opEquals( false );
		this.StopMove( moveStatus_t.MOVE_STATUS_DONE );
	}

/////*
////================
////idAI::Show
////================
////*/
////void idAI::Show( ) {
////	idActor::Show();
////	if ( this.spawnArgs.GetBool( "big_monster" ) ) {
////		this.physicsObj.SetContents( 0 );
////	} else if ( this.use_combat_bbox ) {
////		this.physicsObj.SetContents( contentsFlags_t.CONTENTS_BODY|contentsFlags_t.CONTENTS_SOLID );
////	} else {
////		this.physicsObj.SetContents( contentsFlags_t.CONTENTS_BODY );
////	}
////	this.physicsObj.GetClipModel().Link( gameLocal.clip );
////	this.fl.takedamage = !this.spawnArgs.GetBool( "noDamage" );
////	this.SetChatSound();
////	this.StartSound( "snd_ambient", SND_CHANNEL_AMBIENT, 0, false, NULL );
////}

/*
=====================
idAI::SetChatSound
=====================
*/
SetChatSound( ):void {
	var snd:string;

	if ( this.IsHidden() ) {
		snd = null;
	} else if ( this.enemy.GetEntity() ) {
		snd = this.spawnArgs.GetString( "snd_chatter_combat", null );
		this.chat_min = SEC2MS( this.spawnArgs.GetFloat( "chatter_combat_min", "5" ) );
		this.chat_max = SEC2MS( this.spawnArgs.GetFloat( "chatter_combat_max", "10" ) );
	} else if ( !this.spawnArgs.GetBool( "no_idle_chatter" ) ) {
		snd = this.spawnArgs.GetString("snd_chatter", null );
		this.chat_min = SEC2MS( this.spawnArgs.GetFloat( "chatter_min", "5" ) );
		this.chat_max = SEC2MS( this.spawnArgs.GetFloat( "chatter_max", "10" ) );
	} else {
		snd = null;
	}

	if ( snd /*&& *snd*/ ) {
		this.chat_snd = declManager.FindSound( snd );

		// set the next chat time
		this.chat_time = gameLocal.time + this.chat_min + gameLocal.random.RandomFloat() * ( this.chat_max - this.chat_min );
	} else {
		this.chat_snd = null;
	}
}

/////*
////================
////idAI::CanPlayChatterSounds
////
////Used for playing chatter sounds on monsters.
////================
////*/
////bool idAI::CanPlayChatterSounds( ) const {
////	if ( this.AI_DEAD ) {
////		return false;
////	}
////
////	if ( this.IsHidden() ) {
////		return false;
////	}
////
////	if ( this.enemy.GetEntity() ) {
////		return true;
////	}
////
////	if ( this.spawnArgs.GetBool( "no_idle_chatter" ) ) {
////		return false;
////	}
////
////	return true;
////}
////
/////*
////=====================
////idAI::PlayChatter
////=====================
////*/
////void idAI::PlayChatter( ) {
////	// check if it's time to play a chat sound
////	if ( this.AI_DEAD || !this.chat_snd || ( this.chat_time > gameLocal.time ) ) {
////		return;
////	}
////
////	StartSoundShader( this.chat_snd, SND_CHANNEL_VOICE, 0, false, NULL );
////
////	// set the next chat time
////	this.chat_time = gameLocal.time + this.chat_min + gameLocal.random.RandomFloat() * ( this.chat_max - this.chat_min );
////}
////
/////*
////=====================
////idAI::UpdateParticles
////=====================
////*/
////void idAI::UpdateParticles( ) {
////	if ( ( thinkFlags & TH_UPDATEPARTICLES) && !this.IsHidden() ) {
////		idVec3 realVector;
////		idMat3 realAxis;
////
////		int particlesAlive = 0;
////		for ( int i = 0; i < this.particles.Num(); i++ ) {
////			if ( this.particles[i].particle && this.particles[i].time ) {
////				particlesAlive++;
////				if (this.af.IsActive()) {
////					realAxis = mat3_identity;
////					realVector = GetPhysics().GetOrigin();
////				} else {
////					this.animator.GetJointTransform( this.particles[i].joint, gameLocal.time, realVector, realAxis );
////					realAxis *= this.renderEntity.axis;
////					realVector = this.physicsObj.GetOrigin() + ( realVector + modelOffset ) * ( this.viewAxis * this.physicsObj.GetGravityAxis() );
////				}
////
////				if ( !gameLocal.smokeParticles.EmitSmoke( this.particles[i].particle, this.particles[i].time, gameLocal.random.CRandomFloat(), realVector, realAxis )) {
////					if ( this.restartParticles ) {
////						this.particles[i].time = gameLocal.time;
////					} else {
////						this.particles[i].time = 0;
////						particlesAlive--;
////					}
////				}
////			}
////		}
////		if ( particlesAlive == 0 ) {
////			BecomeInactive( TH_UPDATEPARTICLES );
////		}
////	}
////}
////
/////*
////=====================
////idAI::TriggerParticles
////=====================
////*/
////void idAI::TriggerParticles( const char *jointName ) {
////	jointHandle_t jointNum;
////
////	jointNum = this.animator.GetJointHandle( jointName );
////	for ( int i = 0; i < this.particles.Num(); i++ ) {
////		if ( this.particles[i].joint == jointNum ) {
////			this.particles[i].time = gameLocal.time;
////			this.BecomeActive( TH_UPDATEPARTICLES );
////		}
////	}
////}
////
////
/////***********************************************************************
////
////	Head & torso aiming
////
////***********************************************************************/
////
/////*
////================
////idAI::UpdateAnimationControllers
////================
////*/
////bool idAI::UpdateAnimationControllers( ) {
////	idVec3		local;
////	idVec3		focusPos;
////	idQuat		jawQuat;
////	idVec3		left;
////	idVec3 		dir;
////	idVec3 		orientationJointPos;
////	idVec3 		localDir;
////	idAngles 	newLookAng;
////	idAngles	diff;
////	idMat3		mat;
////	idMat3		axis;
////	idMat3		orientationJointAxis;
////	idAFAttachment	*headEnt = this.head.GetEntity();
////	idVec3		eyepos;
////	idVec3		pos;
////	var/*int*/i:number;
////	idAngles	jointAng;
////	float		orientationJointYaw;
////
////	if ( this.AI_DEAD ) {
////		return idActor::UpdateAnimationControllers();
////	}
////
////	if ( this.orientationJoint == jointHandle_t.INVALID_JOINT ) {
////		orientationJointAxis = this.viewAxis;
////		orientationJointPos = this.physicsObj.GetOrigin();
////		orientationJointYaw = this.current_yaw;
////	} else {
////		GetJointWorldTransform( this.orientationJoint, gameLocal.time, orientationJointPos, orientationJointAxis );
////		orientationJointYaw = orientationJointAxis[ 2 ].ToYaw();
////		orientationJointAxis = idAngles( 0.0, orientationJointYaw, 0.0 ).ToMat3();
////	}
////
////	if ( this.focusJoint != jointHandle_t.INVALID_JOINT ) {
////		if ( headEnt ) {
////			headEnt.GetJointWorldTransform( this.focusJoint, gameLocal.time, eyepos, axis );
////		} else {
////			GetJointWorldTransform( this.focusJoint, gameLocal.time, eyepos, axis );
////		}
////		eyeOffset.z = eyepos.z - this.physicsObj.GetOrigin().z;
////		if ( ai_debugMove.GetBool() ) {
////			gameRenderWorld.DebugLine( colorRed, eyepos, eyepos + orientationJointAxis[ 0 ] * 32.0, gameLocal.msec );
////		}
////	} else {
////		eyepos = GetEyePosition();
////	}
////
////	if ( headEnt ) {
////		CopyJointsFromBodyToHead();
////	}
////
////	// Update the IK after we've gotten all the joint positions we need, but before we set any joint positions.
////	// Getting the joint positions causes the joints to be updated.  The IK gets joint positions itself (which
////	// are already up to date because of getting the joints in this function) and then sets their positions, which
////	// forces the heirarchy to be updated again next time we get a joint or present the model.  If IK is enabled,
////	// or if we have a seperate head, we end up transforming the joints twice per frame.  Characters with no
////	// head entity and no ik will only transform their joints once.  Set g_debuganim to the current entity number
////	// in order to see how many times an entity transforms the joints per frame.
////	idActor::UpdateAnimationControllers();
////
////	idEntity *focusEnt = focusEntity.GetEntity();
////	if ( !allowJointMod || !allowEyeFocus || ( gameLocal.time >= focusTime ) ) {
////	    focusPos = GetEyePosition() + orientationJointAxis[ 0 ] * 512.0;
////	} else if ( focusEnt == NULL ) {
////		// keep looking at last position until focusTime is up
////		focusPos = currentFocusPos;
////	} else if ( focusEnt == this.enemy.GetEntity() ) {
////		focusPos = lastVisibleEnemyPos + lastVisibleEnemyEyeOffset - this.eyeVerticalOffset * this.enemy.GetEntity().GetPhysics().GetGravityNormal();
////	} else if ( focusEnt.IsType( idActor::Type ) ) {
////		focusPos = static_cast<idActor *>( focusEnt ).GetEyePosition() - this.eyeVerticalOffset * focusEnt.GetPhysics().GetGravityNormal();
////	} else {
////		focusPos = focusEnt.GetPhysics().GetOrigin();
////	}
////
////	currentFocusPos.opEquals( currentFocusPos + ( focusPos - currentFocusPos ) * this.eyeFocusRate;
////
////	// determine yaw from origin instead of from focus joint since joint may be offset, which can cause us to bounce between two angles
////	dir = focusPos - orientationJointPos;
////	newLookAng.yaw = idMath.AngleNormalize180( dir.ToYaw() - orientationJointYaw );
////	newLookAng.roll = 0.0;
////	newLookAng.pitch = 0.0;
////
////#if 0
////	gameRenderWorld.DebugLine( colorRed, orientationJointPos, focusPos, gameLocal.msec );
////	gameRenderWorld.DebugLine( colorYellow, orientationJointPos, orientationJointPos + orientationJointAxis[ 0 ] * 32.0, gameLocal.msec );
////	gameRenderWorld.DebugLine( colorGreen, orientationJointPos, orientationJointPos + newLookAng.ToForward() * 48.0, gameLocal.msec );
////#endif
////
////	// determine pitch from joint position
////	dir = focusPos - eyepos;
////	dir.NormalizeFast();
////	orientationJointAxis.ProjectVector( dir, localDir );
////	newLookAng.pitch = -idMath.AngleNormalize180( localDir.ToPitch() );
////	newLookAng.roll	= 0.0;
////
////	diff = newLookAng - lookAng;
////	
////	if ( eyeAng != diff ) {
////		eyeAng .opEquals( diff;
////		eyeAng.Clamp( this.eyeMin, this.eyeMax );
////		idAngles angDelta = diff - eyeAng;
////		if ( !angDelta.Compare( ang_zero, 0.1f ) ) {
////			alignHeadTime = gameLocal.time;
////		} else {
////			alignHeadTime = gameLocal.time + ( 0.5f + 0.5f * gameLocal.random.RandomFloat() ) * this.focusAlignTime;
////		}
////	}
////
////	if ( idMath.Fabs( newLookAng.yaw ) < 0.1f ) {
////		alignHeadTime = gameLocal.time;
////	}
////
////	if ( ( gameLocal.time >= alignHeadTime ) || ( gameLocal.time < forceAlignHeadTime ) ) {
////		alignHeadTime = gameLocal.time + ( 0.5f + 0.5f * gameLocal.random.RandomFloat() ) * this.focusAlignTime;
////		destLookAng .opEquals(newLookAng);
////		destLookAng.Clamp( this.lookMin, this.lookMax );
////	}
////
////	diff = destLookAng - lookAng;
////	if ( ( this.lookMin.pitch == -180.0 ) && ( this.lookMax.pitch == 180.0 ) ) {
////		if ( ( diff.pitch > 180.0 ) || ( diff.pitch <= -180.0 ) ) {
////			diff.pitch = 360.0 - diff.pitch;
////		}
////	}
////	if ( ( this.lookMin.yaw == -180.0 ) && ( this.lookMax.yaw == 180.0 ) ) {
////		if ( diff.yaw > 180.0 ) {
////			diff.yaw -= 360.0;
////		} else if ( diff.yaw <= -180.0 ) {
////			diff.yaw += 360.0;
////		}
////	}
////	lookAng .opEquals( lookAng + diff * this.headFocusRate;
////	lookAng.Normalize180();
////
////	jointAng.roll = 0.0;
////	for( i = 0; i < this.lookJoints.Num(); i++ ) {
////		jointAng.pitch	= lookAng.pitch * this.lookJointAngles[ i ].pitch;
////		jointAng.yaw	= lookAng.yaw * this.lookJointAngles[ i ].yaw;
////		this.animator.SetJointAxis( this.lookJoints[ i ], JOINTMOD_WORLD, jointAng.ToMat3() );
////	}
////
////	if ( this.move.moveType == MOVETYPE_FLY ) {
////		// lean into turns
////		AdjustFlyingAngles();
////	}
////	
////	if ( headEnt ) {
////		idAnimator *headAnimator = headEnt.GetAnimator();
////
////		if ( allowEyeFocus ) {
////			idMat3 eyeAxis = ( lookAng + eyeAng ).ToMat3(); idMat3 headTranspose = headEnt.GetPhysics().GetAxis().Transpose();
////			axis =  eyeAxis * orientationJointAxis;
////			left = axis[ 1 ] * this.eyeHorizontalOffset;
////			eyepos -= headEnt.GetPhysics().GetOrigin();
////			headAnimator.SetJointPos( leftEyeJoint, JOINTMOD_WORLD_OVERRIDE, eyepos + ( axis[ 0 ] * 64.0 + left ) * headTranspose );
////			headAnimator.SetJointPos( rightEyeJoint, JOINTMOD_WORLD_OVERRIDE, eyepos + ( axis[ 0 ] * 64.0 - left ) * headTranspose );
////		} else {
////			headAnimator.ClearJoint( leftEyeJoint );
////			headAnimator.ClearJoint( rightEyeJoint );
////		}
////	} else {
////		if ( allowEyeFocus ) {
////			idMat3 eyeAxis = ( lookAng + eyeAng ).ToMat3();
////			axis =  eyeAxis * orientationJointAxis;
////			left = axis[ 1 ] * this.eyeHorizontalOffset;
////			eyepos += axis[ 0 ] * 64.0 - this.physicsObj.GetOrigin();
////			this.animator.SetJointPos( leftEyeJoint, JOINTMOD_WORLD_OVERRIDE, eyepos + left );
////			this.animator.SetJointPos( rightEyeJoint, JOINTMOD_WORLD_OVERRIDE, eyepos - left );
////		} else {
////			this.animator.ClearJoint( leftEyeJoint );
////			this.animator.ClearJoint( rightEyeJoint );
////		}
////	}
////
////	return true;
////}
};

class idCombatNode extends idEntity {
//public:
	//CLASS_PROTOTYPE( idCombatNode );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idCombatNode>[];

	//					idCombatNode();

	//void				Save ( savefile: idSaveGame ): void { throw "placeholder"; }
	//void				Restore ( savefile: idRestoreGame ): void { throw "placeholder"; }

	//Spawn():void{throw "placeholder";}
	//bool				IsDisabled( ) const;
	//bool				EntityInView( idActor *actor, pos:idVec3 );
	//static void			DrawDebugInfo( );

//private:
	//float				min_dist;
	//float				max_dist;
	//float				cone_dist;
	//float				min_height;
	//float				max_height;
	//idVec3			cone_left;
	//idVec3			cone_right;
	//idVec3			offset;
	//bool				disabled;

	Event_Activate ( activator: idEntity ): void { throw "placeholder"; }
	Event_MarkUsed ( ): void { throw "placeholder"; }


/////*
	////=====================
	////idCombatNode::idCombatNode
	////=====================
	////*/
	////idCombatNode::idCombatNode( ) {
	////	min_dist = 0.0;
	////	max_dist = 0.0;
	////	cone_dist = 0.0;
	////	min_height = 0.0;
	////	max_height = 0.0;
	////	cone_left.Zero();
	////	cone_right.Zero();
	////	offset.Zero();
	////	disabled = false;
	////}
	////
	/////*
	////=====================
	////idCombatNode::Save
	////=====================
	////*/
	////void idCombatNode::Save( idSaveGame *savefile ) const {
	////	savefile.WriteFloat( min_dist );
	////	savefile.WriteFloat( max_dist );
	////	savefile.WriteFloat( cone_dist );
	////	savefile.WriteFloat( min_height );
	////	savefile.WriteFloat( max_height );
	////	savefile.WriteVec3( cone_left );
	////	savefile.WriteVec3( cone_right );
	////	savefile.WriteVec3( offset );
	////	savefile.WriteBool( disabled );
	////}
	////
	/////*
	////=====================
	////idCombatNode::Restore
	////=====================
	////*/
	////void idCombatNode::Restore( idRestoreGame *savefile ) {
	////	savefile.ReadFloat( min_dist );
	////	savefile.ReadFloat( max_dist );
	////	savefile.ReadFloat( cone_dist );
	////	savefile.ReadFloat( min_height );
	////	savefile.ReadFloat( max_height );
	////	savefile.ReadVec3( cone_left );
	////	savefile.ReadVec3( cone_right );
	////	savefile.ReadVec3( offset );
	////	savefile.ReadBool( disabled );
	////}
	////
	/////*
	////=====================
	////idCombatNode::Spawn
	////=====================
	////*/
	Spawn ( ): void {
		todoThrow ( );
		////	float fov;
		////	float yaw;
		////	float height;
		////
		////	min_dist = this.spawnArgs.GetFloat( "min" );
		////	max_dist = this.spawnArgs.GetFloat( "max" );
		////	height = this.spawnArgs.GetFloat( "height" );
		////	fov = this.spawnArgs.GetFloat( "fov", "60" );
		////	offset = this.spawnArgs.GetVector( "offset" );
		////
		////	const idVec3 &org = GetPhysics().GetOrigin() + offset;
		////	min_height = org.z - height * 0.5f;
		////	max_height = min_height + height;
		////
		////	const idMat3 &axis = GetPhysics().GetAxis();
		////	yaw = axis[ 0 ].ToYaw();
		////
		////	idAngles leftang( 0.0, yaw + fov * 0.5f - 90.0, 0.0 );
		////	cone_left = leftang.ToForward();
		////
		////	idAngles rightang( 0.0, yaw - fov * 0.5f + 90.0, 0.0 );
		////	cone_right = rightang.ToForward();
		////
		////	disabled = this.spawnArgs.GetBool( "start_off" );
	}
////
/////*
////=====================
////idCombatNode::IsDisabled
////=====================
////*/
////bool idCombatNode::IsDisabled( ) const {
////	return disabled;
////}
////
/////*
////=====================
////idCombatNode::DrawDebugInfo
////=====================
////*/
////void idCombatNode::DrawDebugInfo( ) {
////	idEntity		*ent;
////	idCombatNode	*node;
////	idPlayer		*player = gameLocal.GetLocalPlayer();
////	idVec4			color;
////	idBounds		bounds( idVec3( -16, -16, 0 ), idVec3( 16, 16, 0 ) );
////	
////	for( ent = gameLocal.spawnedEntities.Next(); ent != NULL; ent = ent.spawnNode.Next() ) {
////		if ( !ent.IsType( idCombatNode::Type ) ) {
////			continue;
////		}
////
////		node = static_cast<idCombatNode *>( ent );
////		if ( node.disabled ) {
////			color = colorMdGrey;
////		} else if ( player && node.EntityInView( player, player.GetPhysics().GetOrigin() ) ) {
////			color = colorYellow;
////		} else {
////			color = colorRed;
////		}
////
////		idVec3 leftDir( -node.cone_left.y, node.cone_left.x, 0.0 );
////		idVec3 rightDir( node.cone_right.y, -node.cone_right.x, 0.0 );
////		idVec3 org = node.GetPhysics().GetOrigin() + node.offset;
////
////		bounds[ 1 ].z = node.max_height;
////
////		leftDir.NormalizeFast();
////		rightDir.NormalizeFast();
////
////		const idMat3 &axis = node.GetPhysics().GetAxis();
////		float cone_dot = node.cone_right * axis[ 1 ];
////		if ( idMath.Fabs( cone_dot ) > 0.1 ) {
////			float cone_dist = node.max_dist / cone_dot;
////			idVec3 pos1 = org + leftDir * node.min_dist;
////			idVec3 pos2 = org + leftDir * cone_dist;
////			idVec3 pos3 = org + rightDir * node.min_dist;
////			idVec3 pos4 = org + rightDir * cone_dist;
////
////			gameRenderWorld.DebugLine( color, node.GetPhysics().GetOrigin(), ( pos1 + pos3 ) * 0.5f, gameLocal.msec );
////			gameRenderWorld.DebugLine( color, pos1, pos2, gameLocal.msec );
////			gameRenderWorld.DebugLine( color, pos1, pos3, gameLocal.msec );
////			gameRenderWorld.DebugLine( color, pos3, pos4, gameLocal.msec );
////			gameRenderWorld.DebugLine( color, pos2, pos4, gameLocal.msec );
////			gameRenderWorld.DebugBounds( color, bounds, org, gameLocal.msec );
////		}
////	}
////}
////
/////*
////=====================
////idCombatNode::EntityInView
////=====================
////*/
////bool idCombatNode::EntityInView( idActor *actor, pos:idVec3 ) {
////	if ( !actor || ( actor.health <= 0 ) ) {
////		return false;
////	}
////
////	const idBounds &bounds = actor.GetPhysics().GetBounds();
////	if ( ( pos.z + bounds[ 1 ].z < min_height ) || ( pos.z + bounds[ 0 ].z >= max_height ) ) {
////		return false;
////	}
////
////	const idVec3 &org = GetPhysics().GetOrigin() + offset;
////	const idMat3 &axis = GetPhysics().GetAxis();
////	idVec3 dir = pos - org;
////	float  dist = dir * axis[ 0 ];
////	
////	if ( ( dist < min_dist ) || ( dist > max_dist ) ) {
////		return false;
////	}
////
////	float left_dot = dir * cone_left;
////	if ( left_dot < 0.0 ) {
////		return false;
////	}
////
////	float right_dot = dir * cone_right;
////	if ( right_dot < 0.0 ) {
////		return false;
////	}
////
////	return true;
////}
////
/////*
////=====================
////idCombatNode::Event_Activate
////=====================
////*/
////void idCombatNode::Event_Activate( activator:idEntity ) {
////	disabled = !disabled;
////}
////
/////*
////=====================
////idCombatNode::Event_MarkUsed
////=====================
////*/
////void idCombatNode::Event_MarkUsed( ) {
////	if ( this.spawnArgs.GetBool( "use_once" ) ) {
////		disabled = true;
////	}
////}

}

////#endif /* !__AI_H__ */
