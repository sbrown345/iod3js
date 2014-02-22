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
/////*
////===============================================================================
////
////	idAI
////
////===============================================================================
////*/
////
////const float	SQUARE_ROOT_OF_2			= 1.414213562f;
////const float	AI_TURN_PREDICTION			= 0.2f;
////const float	AI_TURN_SCALE				= 60.0f;
////const float	AI_SEEK_PREDICTION			= 0.3f;
////const float	AI_FLY_DAMPENING			= 0.15f;
////const float	AI_HEARING_RANGE			= 2048.0f;
////const int	DEFAULT_FLY_OFFSET			= 68;
////
////#define ATTACK_IGNORE			0
////#define ATTACK_ON_DAMAGE		1
////#define ATTACK_ON_ACTIVATE		2
////#define ATTACK_ON_SIGHT			4
////
////// defined in script/ai_base.script.  please keep them up to date.
////typedef enum {
////	MOVETYPE_DEAD,
////	MOVETYPE_ANIM,
////	MOVETYPE_SLIDE,
////	MOVETYPE_FLY,
////	MOVETYPE_STATIC,
////	NUM_MOVETYPES
////} moveType_t;
////
////typedef enum {
////	MOVE_NONE,
////	MOVE_FACE_ENEMY,
////	MOVE_FACE_ENTITY,
////
////	// commands < NUM_NONMOVING_COMMANDS don't cause a change in position
////	NUM_NONMOVING_COMMANDS,
////
////	MOVE_TO_ENEMY = NUM_NONMOVING_COMMANDS,
////	MOVE_TO_ENEMYHEIGHT,
////	MOVE_TO_ENTITY, 
////	MOVE_OUT_OF_RANGE,
////	MOVE_TO_ATTACK_POSITION,
////	MOVE_TO_COVER,
////	MOVE_TO_POSITION,
////	MOVE_TO_POSITION_DIRECT,
////	MOVE_SLIDE_TO_POSITION,
////	MOVE_WANDER,
////	NUM_MOVE_COMMANDS
////} moveCommand_t;
////
////typedef enum {
////	TALK_NEVER,
////	TALK_DEAD,
////	TALK_OK,
////	TALK_BUSY,
////	NUM_TALK_STATES
////} talkState_t;
////
//////
////// status results from move commands
////// make sure to change script/doom_defs.script if you add any, or change their order
//////
////typedef enum {
////	MOVE_STATUS_DONE,
////	MOVE_STATUS_MOVING,
////	MOVE_STATUS_WAITING,
////	MOVE_STATUS_DEST_NOT_FOUND,
////	MOVE_STATUS_DEST_UNREACHABLE,
////	MOVE_STATUS_BLOCKED_BY_WALL,
////	MOVE_STATUS_BLOCKED_BY_OBJECT,
////	MOVE_STATUS_BLOCKED_BY_ENEMY,
////	MOVE_STATUS_BLOCKED_BY_MONSTER
////} moveStatus_t;
////
////#define	DI_NODIR	-1
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
////typedef struct particleEmitter_s {
////	particleEmitter_s() {
////		particle = NULL;
////		time = 0;
////		joint = INVALID_JOINT;
////	};
////	const idDeclParticle *particle;
////	int					time;
////	jointHandle_t		joint;
////} particleEmitter_t;
////
////class idMoveState {
////public:
////							idMoveState();
////
//Save ( savefile: idSaveGame ): void { throw "placeholder"; }
////	void					Restore ( savefile: idRestoreGame ): void { throw "placeholder"; }
////
////	moveType_t				moveType;
////	moveCommand_t			moveCommand;
////	moveStatus_t			moveStatus;
////	idVec3					moveDest;
////	idVec3					moveDir;			// used for wandering and slide moves
////	idEntityPtr<idEntity>	goalEntity;
////	idVec3					goalEntityOrigin;	// move to entity uses this to avoid checking the floor position every frame
////	int						toAreaNum;
////	int						startTime;
////	int						duration;
////	float					speed;				// only used by flying creatures
////	float					range;
////	float					wanderYaw;
////	int						nextWanderTime;
////	int						blockTime;
////	idEntityPtr<idEntity>	obstacle;
////	idVec3					lastMoveOrigin;
////	int						lastMoveTime;
////	int						anim;
////};
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
////
////							idAI();
////							~idAI();
////
//Save ( savefile: idSaveGame ): void { throw "placeholder"; }
////	void					Restore ( savefile: idRestoreGame ): void { throw "placeholder"; }
////
////	void					Spawn( void );
////	void					HeardSound( idEntity *ent, const char *action );
////	idActor					*GetEnemy( void ) const;
////	void					TalkTo( idActor *actor );
////	talkState_t				GetTalkState( void ) const;
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
////	static void				FreeObstacleAvoidanceNodes( void );
////							// Predicts movement, returns true if a stop event was triggered.
////	static bool				PredictPath( const idEntity *ent, const idAAS *aas, const idVec3 &start, const idVec3 &velocity, int totalTime, int frameTime, int stopEvent, predictedPath_t &path );
////							// Return true if the trajectory of the clip model is collision free.
////	static bool				TestTrajectory( const idVec3 &start, const idVec3 &end, float zVel, float gravity, float time, float max_height, const idClipModel *clip, int clipmask, const idEntity *ignore, const idEntity *targetEntity, int drawtime );
////							// Finds the best collision free trajectory for a clip model.
////	static bool				PredictTrajectory( const idVec3 &firePos, const idVec3 &target, float projectileSpeed, const idVec3 &projGravity, const idClipModel *clip, int clipmask, float max_height, const idEntity *ignore, const idEntity *targetEntity, int drawtime, idVec3 &aimDir );
////
////protected:
////	// navigation
////	idAAS *					aas;
////	int						travelFlags;
////
////	idMoveState				move;
////	idMoveState				savedMove;
////
////	float					kickForce;
////	bool					ignore_obstacles;
////	float					blockedRadius;
////	int						blockedMoveTime;
////	int						blockedAttackTime;
////
////	// turning
////	float					ideal_yaw;
////	float					current_yaw;
////	float					turnRate;
////	float					turnVel;
////	float					anim_turn_yaw;
////	float					anim_turn_amount;
////	float					anim_turn_angles;
////
////	// physics
////	idPhysics_Monster		physicsObj;
////
////	// flying
////	jointHandle_t			flyTiltJoint;
////	float					fly_speed;
////	float					fly_bob_strength;
////	float					fly_bob_vert;
////	float					fly_bob_horz;
////	int						fly_offset;					// prefered offset from player's view
////	float					fly_seek_scale;
////	float					fly_roll_scale;
////	float					fly_roll_max;
////	float					fly_roll;
////	float					fly_pitch_scale;
////	float					fly_pitch_max;
////	float					fly_pitch;
////
////	bool					allowMove;					// disables any animation movement
////	bool					allowHiddenMovement;		// allows character to still move around while hidden
////	bool					disableGravity;				// disables gravity and allows vertical movement by the animation
////	bool					af_push_moveables;			// allow the articulated figure to push moveable objects
////	
////	// weapon/attack vars
////	bool					lastHitCheckResult;
////	int						lastHitCheckTime;
////	int						lastAttackTime;
////	float					melee_range;
////	float					projectile_height_to_distance_ratio;	// calculates the maximum height a projectile can be thrown
////	idList<idVec3>			missileLaunchOffset;
////
////	const idDict *			projectileDef;
////	mutable idClipModel		*projectileClipModel;
////	float					projectileRadius;
////	float					projectileSpeed;
////	idVec3					projectileVelocity;
////	idVec3					projectileGravity;
////	idEntityPtr<idProjectile> projectile;
////	idStr					attack;
////
////	// chatter/talking
////	const idSoundShader		*chat_snd;
////	int						chat_min;
////	int						chat_max;
////	int						chat_time;
////	talkState_t				talk_state;
////	idEntityPtr<idActor>	talkTarget;
////
////	// cinematics
////	int						num_cinematics;
////	int						current_cinematic;
////
////	bool					allowJointMod;
////	idEntityPtr<idEntity>	focusEntity;
////	idVec3					currentFocusPos;
////	int						focusTime;
////	int						alignHeadTime;
////	int						forceAlignHeadTime;
////	idAngles				eyeAng;
////	idAngles				lookAng;
////	idAngles				destLookAng;
////	idAngles				lookMin;
////	idAngles				lookMax;
////	idList<jointHandle_t>	lookJoints;
////	idList<idAngles>		lookJointAngles;
////	float					eyeVerticalOffset;
////	float					eyeHorizontalOffset;
////	float					eyeFocusRate;
////	float					headFocusRate;
////	int						focusAlignTime;
////
////	// special fx
////	float					shrivel_rate;
////	int						shrivel_start;
////	
////	bool					restartParticles;			// should smoke emissions restart
////	bool					useBoneAxis;				// use the bone vs the model axis
////	idList<particleEmitter_t> particles;				// particle data
////
////	renderLight_t			worldMuzzleFlash;			// positioned on world weapon bone
////	int						worldMuzzleFlashHandle;
////	jointHandle_t			flashJointWorld;
////	int						muzzleFlashEnd;
////	int						flashTime;
////
////	// joint controllers
////	idAngles				eyeMin;
////	idAngles				eyeMax;
////	jointHandle_t			focusJoint;
////	jointHandle_t			orientationJoint;
////
////	// enemy variables
////	idEntityPtr<idActor>	enemy;
////	idVec3					lastVisibleEnemyPos;
////	idVec3					lastVisibleEnemyEyeOffset;
////	idVec3					lastVisibleReachableEnemyPos;
////	idVec3					lastReachableEnemyPos;
////	bool					wakeOnFlashlight;
////
////	// script variables
////	idScriptBool			AI_TALK;
////	idScriptBool			AI_DAMAGE;
////	idScriptBool			AI_PAIN;
////	idScriptFloat			AI_SPECIAL_DAMAGE;
////	idScriptBool			AI_DEAD;
////	idScriptBool			AI_ENEMY_VISIBLE;
////	idScriptBool			AI_ENEMY_IN_FOV;
////	idScriptBool			AI_ENEMY_DEAD;
////	idScriptBool			AI_MOVE_DONE;
////	idScriptBool			AI_ONGROUND;
////	idScriptBool			AI_ACTIVATED;
////	idScriptBool			AI_FORWARD;
////	idScriptBool			AI_JUMP;
////	idScriptBool			AI_ENEMY_REACHABLE;
////	idScriptBool			AI_BLOCKED;
////	idScriptBool			AI_OBSTACLE_IN_PATH;
////	idScriptBool			AI_DEST_UNREACHABLE;
////	idScriptBool			AI_HIT_ENEMY;
////	idScriptBool			AI_PUSHED;
////
////	//
////	// ai/ai.cpp
////	//
////	void					SetAAS( void );
////	virtual	void			DormantBegin( void );	// called when entity becomes dormant
////	virtual	void			DormantEnd( void );		// called when entity wakes from being dormant
////	void					Think( void );
////	void					Activate( idEntity *activator );
////	int						ReactionTo( const idEntity *ent );
////	bool					CheckForEnemy( void );
////	void					EnemyDead( void );
////	virtual bool			CanPlayChatterSounds( void ) const;
////	void					SetChatSound( void );
////	void					PlayChatter( void );
////	virtual void			Hide( void );
////	virtual void			Show( void );
////	idVec3					FirstVisiblePointOnPath( const idVec3 origin, const idVec3 &target, int travelFlags ) const;
////	void					CalculateAttackOffsets( void );
////	void					PlayCinematic( void );
////
////	// movement
////	virtual void			ApplyImpulse( idEntity *ent, int id, const idVec3 &point, const idVec3 &impulse );
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
////	bool					ReachedPos( const idVec3 &pos, const moveCommand_t moveCommand ) const;
////	float					TravelDistance( const idVec3 &start, const idVec3 &end ) const;
////	int						PointReachableAreaNum( const idVec3 &pos, const float boundsScale = 2.0f ) const;
////	bool					PathToGoal( aasPath_t &path, int areaNum, const idVec3 &origin, int goalAreaNum, const idVec3 &goalOrigin ) const;
////	void					DrawRoute( void ) const;
////	bool					GetMovePos( idVec3 &seekPos );
////	bool					MoveDone( void ) const;
////	bool					EntityCanSeePos( idActor *actor, const idVec3 &actorOrigin, const idVec3 &pos );
////	void					BlockedFailSafe( void );
////
////	// movement control
////	void					StopMove( moveStatus_t status );
////	bool					FaceEnemy( void );
////	bool					FaceEntity( idEntity *ent );
////	bool					DirectMoveToPosition( const idVec3 &pos );
////	bool					MoveToEnemyHeight( void );
////	bool					MoveOutOfRange( idEntity *entity, float range );
////	bool					MoveToAttackPosition( idEntity *ent, int attack_anim );
////	bool					MoveToEnemy( void );
////	bool					MoveToEntity( idEntity *ent );
////	bool					MoveToPosition( const idVec3 &pos );
////	bool					MoveToCover( idEntity *entity, const idVec3 &pos );
////	bool					SlideToPosition( const idVec3 &pos, float time );
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
////	bool					TurnToward( const idVec3 &pos );
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
////	idProjectile			*CreateProjectile( const idVec3 &pos, const idVec3 &dir );
////	void					RemoveProjectile( void );
////	idProjectile			*LaunchProjectile( const char *jointname, idEntity *target, bool clampToAttackCone );
////	virtual void			DamageFeedback( idEntity *victim, idEntity *inflictor, int &damage );
////	void					DirectDamage( const char *meleeDefName, idEntity *ent );
////	bool					TestMelee( void ) const;
////	bool					AttackMelee( const char *meleeDefName );
////	void					BeginAttack( const char *name );
////	void					EndAttack( void );
////	void					PushWithAF( void );
////
////	// special effects
////	void					GetMuzzle( const char *jointname, idVec3 &muzzle, idMat3 &axis );
////	void					InitMuzzleFlash( void );
////	void					TriggerWeaponEffects( const idVec3 &muzzle );
////	void					UpdateMuzzleFlash( void );
////	virtual bool			UpdateAnimationControllers( void );
////	void					UpdateParticles( void );
////	void					TriggerParticles( const char *jointName );
////
////	// AI script state management
////	void					LinkScriptVariables( void );
////	void					UpdateAIScript( void );
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
	Event_GetReachableEntityPosition( ent:idEntity): void { throw "placeholder"; }
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

	//void				Spawn( void );
	//bool				IsDisabled( void ) const;
	//bool				EntityInView( idActor *actor, const idVec3 &pos );
	//static void			DrawDebugInfo( void );

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
};

////#endif /* !__AI_H__ */
