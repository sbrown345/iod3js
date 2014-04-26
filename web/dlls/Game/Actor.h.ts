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
////#ifndef __GAME_ACTOR_H__
////#define __GAME_ACTOR_H__
////
/////*
////===============================================================================
////
////	idActor
////
////===============================================================================
////*/
////
////extern const idEventDef AI_EnableEyeFocus;
////extern const idEventDef AI_DisableEyeFocus;
////extern const idEventDef EV_Footstep;
////extern const idEventDef EV_FootstepLeft;
////extern const idEventDef EV_FootstepRight;
////extern const idEventDef EV_EnableWalkIK;
////extern const idEventDef EV_DisableWalkIK;
////extern const idEventDef EV_EnableLegIK;
////extern const idEventDef EV_DisableLegIK;
////extern const idEventDef AI_SetAnimPrefix;
////extern const idEventDef AI_PlayAnim;
////extern const idEventDef AI_PlayCycle;
////extern const idEventDef AI_AnimDone;
////extern const idEventDef AI_SetBlendFrames;
////extern const idEventDef AI_GetBlendFrames;
////
////class idDeclParticle;
////
class idAnimState {
////public:
////	bool					idleAnim;
////	idStr					state;
////	int						animBlendFrames;
////	int						lastAnimBlendFrames;		// allows override anims to blend based on the last transition time
////
////public:
////							idAnimState();
////							~idAnimState();
////
//Save ( savefile: idSaveGame ): void { throw "placeholder"; }
////	void					Restore ( savefile: idRestoreGame ): void { throw "placeholder"; }
////
////	void					Init( idActor *owner, idAnimator *_animator, int animchannel );
////	void					Shutdown( void );
////	void					SetState( name:string, int blendFrames );
////	void					StopAnim( int frames );
////	void					PlayAnim( int anim );
////	void					CycleAnim( int anim );
////	void					BecomeIdle( void );
////	bool					UpdateState( void );
////	bool					Disabled( void ) const;
////	void					Enable( int blendFrames );
////	void					Disable( void );
////	bool					AnimDone( int blendFrames ) const;
////	bool					IsIdle( void ) const;
////	animFlags_t				GetAnimFlags( void ) const;
////
////private:
////	idActor *				self;
////	idAnimator *			animator;
////	idThread *				thread;
////	int						channel;
////	bool					disabled;
};

class idAttachInfo {
////public:
	ent = new idEntityPtr<idEntity>	();
	channel :number/*int*/;
};

class copyJoints_t {
	mod:jointModTransform_t;
	from:jointHandle_t;
	to:jointHandle_t;
};

class idActor extends idAFEntity_Gibbable {
////public:
////	CLASS_PROTOTYPE( idActor );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idActor>[];
	
	team :number/*int*/;
	rank :number/*int*/;				// monsters don't fight back if the attacker's rank is higher
	viewAxis = new idMat3;			// view axis of the actor
	
	enemyNode = new idLinkList<idActor>();			// node linked into an entity's enemy list for quick lookups of who is attacking him
	enemyList = new idLinkList<idActor>();			// list of characters that have targeted the player as their enemy
////
////public:
////							idActor( void );
////	virtual					~idActor( void );
////
////	void					Spawn( void );
////	virtual void			Restart( void );
////
//Save ( savefile: idSaveGame ): void { throw "placeholder"; }
////	void					Restore ( savefile: idRestoreGame ): void { throw "placeholder"; }
////
////	virtual void			Hide( void );
////	virtual void			Show( void );
////	virtual int				GetDefaultSurfaceType( void ) const;
////	virtual void			ProjectOverlay( const idVec3 &origin, const idVec3 &dir, float size, const char *material );
////
////	virtual bool			LoadAF( void );
////	void					SetupBody( void );
////
////	void					CheckBlink( void );
////
////	virtual bool			GetPhysicsToVisualTransform( idVec3 &origin, idMat3 &axis );
////	virtual bool			GetPhysicsToSoundTransform( idVec3 &origin, idMat3 &axis );
////
////							// script state management
////	void					ShutdownThreads( void );
////	virtual bool			ShouldConstructScriptObjectAtSpawn( void ) const;
////	virtual idThread *		ConstructScriptObject( void );
////	void					UpdateScript( void );
////	const function_t		*GetScriptFunction( const char *funcname );
////	void					SetState( const function_t *newState );
////	void					SetState( const char *statename );
////
////							// vision testing
////	void					SetEyeHeight( float height );
////	float					EyeHeight( void ) const;
////	idVec3					EyeOffset( void ) const;
////	idVec3					GetEyePosition( void ) const;
////	virtual void			GetViewPos( idVec3 &origin, idMat3 &axis ) const;
////	void					SetFOV( float fov );
////	bool					CheckFOV( pos:idVec3 ) const;
////	bool					CanSee( ent:idEntity, bool useFOV ) const;
////	bool					PointVisible( const idVec3 &point ) const;
////	virtual void			GetAIAimTargets( const idVec3 &lastSightPos, idVec3 &headPos, idVec3 &chestPos );
////
////							// damage
////	void					SetupDamageGroups( void );
////	virtual	void			Damage( idEntity *inflictor, idEntity *attacker, const idVec3 &dir, const char *damageDefName, const float damageScale, const int location );
////	int						GetDamageForLocation( int damage, int location );
////	const char *			GetDamageGroup( int location );
////	void					ClearPain( void );
////	virtual bool			Pain( idEntity *inflictor, idEntity *attacker, int damage, const idVec3 &dir, int location );
////
////							// model/combat model/ragdoll
////	void					SetCombatModel( void );
////	idClipModel *			GetCombatModel( void ) const;
////	virtual void			LinkCombat( void );
////	virtual void			UnlinkCombat( void );
////	bool					StartRagdoll( void );
////	void					StopRagdoll( void );
////	virtual bool			UpdateAnimationControllers( void );
////
////							// delta view angles to allow movers to rotate the view of the actor
////	const idAngles &		GetDeltaViewAngles( void ) const;
////	void					SetDeltaViewAngles( const idAngles &delta );
////
////	bool					HasEnemies( void ) const;
////	idActor *				ClosestEnemyToPoint( pos:idVec3 );
////	idActor *				EnemyWithMostHealth();
////
////	virtual bool			OnLadder( void ) const;
////
////	virtual void			GetAASLocation( idAAS *aas, pos:idVec3, int &areaNum ) const;
////
////	void					Attach( ent:idEntity );
////
////	virtual void			Teleport( const idVec3 &origin, angles:idAngles, idEntity *destination );
////
////	virtual	renderView_t *	GetRenderView();	
////	
							// animation state control
//	int						GetAnim( int channel, name:string );
//	void					UpdateAnimState( void );
//	void					SetAnimState( int channel, name:string, int blendFrames );
//	const char *			GetAnimState( int channel ) const;
//	bool					InAnimState( int channel, name:string ) const;
//	const char *			WaitState( void ) const;
//	void					SetWaitState( const char *_waitstate );
//	bool					AnimDone( int channel, int blendFrames ) const;
//	virtual void			SpawnGibs( const idVec3 &dir, const char *damageDefName );

//protected:
	//friend class			idAnimState;

	fovDot :number/*float*/;				// cos( fovDegrees )
	eyeOffset = new idVec3;			// offset of eye relative to physics origin
	modelOffset= new idVec3;		// offset of visual model relative to the physics origin

	deltaViewAngles = new idAngles;	// delta angles relative to view input angles

	pain_debounce_time :number/*int*/;	// next time the actor can show pain
	pain_delay :number/*int*/;			// time between playing pain sound
	pain_threshold :number/*int*/;		// how much damage monster can take at any one time before playing pain animation

	damageGroups = new idStrList;		// body damage groups
	damageScale = new idList</*float*/number>(Number);		// damage scale per damage gruop

	use_combat_bbox:boolean;	// whether to use the bounding box for combat collision
	head = new idEntityPtr<idAFAttachment>();
	copyJoints = new idList<copyJoints_t>(copyJoints_t);			// copied from the body animation to the head model

	// state variables
	state:function_t;
	idealState:function_t;

	// joint handles
	leftEyeJoint:jointHandle_t;
	rightEyeJoint:jointHandle_t;
	soundJoint:jointHandle_t;

	walkIK = new idIK_Walk;

	animPrefix = new idStr;
	painAnim = new idStr;

	// blinking
	blink_anim :number/*int*/;
	blink_time :number/*int*/;
	blink_min :number/*int*/;
	blink_max :number/*int*/;

	// script variables
	scriptThread:idThread;
	waitState = new idStr;
	headAnim = new idAnimState;
	torsoAnim = new idAnimState;
	legsAnim = new idAnimState;

	allowPain:boolean;
	allowEyeFocus:boolean;
	finalBoss:boolean;

	painTime :number/*int*/;

	attachments = new idList<idAttachInfo>(idAttachInfo);
////
////	virtual void			Gib( const idVec3 &dir, const char *damageDefName );
////
////							// removes attachments with "remove" set for when character dies
////	void					RemoveAttachments( void );
////
////							// copies animation from body to head joints
////	void					CopyJointsFromBodyToHead( void );
////
////private:
////	void					SyncAnimChannels( int channel, int syncToChannel, int blendFrames );
////	void					FinishSetup( void );
////	void					SetupHead( void );
////	void					PlayFootStepSound( void );
////
	Event_EnableEyeFocus ( ): void { throw "placeholder"; }
	Event_DisableEyeFocus ( ): void { throw "placeholder"; }
	Event_Footstep ( ): void { throw "placeholder"; }
	Event_EnableWalkIK ( ): void { throw "placeholder"; }
	Event_DisableWalkIK ( ): void { throw "placeholder"; }
	Event_EnableLegIK ( /*int*/ num: number ): void { throw "placeholder"; }
	Event_DisableLegIK ( /*int*/ num: number ): void { throw "placeholder"; }
	Event_SetAnimPrefix ( name: string ): void { throw "placeholder"; }
	Event_LookAtEntity ( ent: idEntity, /*float*/ duration: number ): void { throw "placeholder"; }
	Event_PreventPain ( /*float*/ duration: number ): void { throw "placeholder"; }
	Event_DisablePain ( ): void { throw "placeholder"; }
	Event_EnablePain ( ): void { throw "placeholder"; }
	Event_GetPainAnim ( ): void { throw "placeholder"; }
	Event_StopAnim ( /*int*/ channel: number, /*int*/ frames: number ): void { throw "placeholder"; }
	Event_PlayAnim ( /*int*/ channel: number, name: string ): void { throw "placeholder"; }
	Event_PlayCycle ( /*int*/ channel: number, name: string ): void { throw "placeholder"; }
	Event_IdleAnim ( /*int*/ channel: number, name: string ): void { throw "placeholder"; }
	Event_SetSyncedAnimWeight ( /*int*/ channel: number, /*int*/ anim: number, /*float*/ weight: number ): void { throw "placeholder"; }
	Event_OverrideAnim ( /*int*/ channel: number ): void { throw "placeholder"; }
	Event_EnableAnim ( /*int*/ channel: number, /*int*/ blendFrames: number ): void { throw "placeholder"; }
	Event_SetBlendFrames ( /*int*/ channel: number, /*int*/ blendFrames: number ): void { throw "placeholder"; }
	Event_GetBlendFrames ( /*int*/ channel: number ): void { throw "placeholder"; }
	Event_AnimState ( /*int*/ channel: number, name: string, /*int*/ blendFrames: number ): void { throw "placeholder"; }
	Event_GetAnimState ( /*int*/ channel: number ): void { throw "placeholder"; }
	Event_InAnimState ( /*int*/ channel: number, name: string ): void { throw "placeholder"; }
	Event_FinishAction ( name: string ): void { throw "placeholder"; }
	Event_AnimDone ( /*int*/ channel: number, /*int*/ blendFrames: number ): void { throw "placeholder"; }
	Event_HasAnim ( /*int*/ channel: number, name: string ): void { throw "placeholder"; }
	Event_CheckAnim ( /*int*/ channel: number, animname: string ): void { throw "placeholder"; }
	Event_ChooseAnim ( /*int*/ channel: number, animname: string ): void { throw "placeholder"; }
	Event_AnimLength ( /*int*/ channel: number, animname: string ): void { throw "placeholder"; }
	Event_AnimDistance ( /*int*/ channel: number, animname: string ): void { throw "placeholder"; }
	Event_HasEnemies ( ): void { throw "placeholder"; }
	Event_NextEnemy ( ent: idEntity ): void { throw "placeholder"; }
	Event_ClosestEnemyToPoint ( pos: idVec3 ): void { throw "placeholder"; }
	Event_StopSound ( /*int*/ channel: number, /*int*/ netsync: number ): void { throw "placeholder"; }
	Event_SetNextState ( name: string ): void { throw "placeholder"; }
	Event_SetState ( name: string ): void { throw "placeholder"; }
	Event_GetState ( ): void { throw "placeholder"; }
	Event_GetHead(): void { throw "placeholder"; }



	
	/*
	=====================
	idActor::idActor
	=====================
	*/
	constructor ( ) {
		super ( );
		this.viewAxis.Identity ( );

		this.scriptThread = null; // initialized by ConstructScriptObject, which is called by idEntity::Spawn

		this.use_combat_bbox = false;
		this.head.opEquals( null );

		this.team = 0;
		this.rank = 0;
		this.fovDot = 0.0;
		this.eyeOffset.Zero ( );
		this.pain_debounce_time = 0;
		this.pain_delay = 0;
		this.pain_threshold = 0;

		this.state = null;
		this.idealState = null;

		this.leftEyeJoint = jointHandle_t.INVALID_JOINT;
		this.rightEyeJoint = jointHandle_t.INVALID_JOINT;
		this.soundJoint = jointHandle_t.INVALID_JOINT;

		this.modelOffset.Zero ( );
		this.deltaViewAngles.Zero ( );

		this.painTime = 0;
		this.allowPain = false;
		this.allowEyeFocus = false;

		this.waitState.opEquals( "" );

		this.blink_anim = NULL;
		this.blink_time = 0;
		this.blink_min = 0;
		this.blink_max = 0;

		this.finalBoss = false;

		this.attachments.SetGranularity( 1 );

		this.enemyNode.SetOwner( this );
		this.enemyList.SetOwner( this );
	}

	/*
	=====================
	idActor::~idActor
	=====================
	*/
	destructor(): void {
		todoThrow();
		//	var/*int*/i:number;
		//	var ent:idEntity

		//	DeconstructScriptObject();
		//	this.scriptObject.Free();

		//	StopSound( SND_CHANNEL_ANY, false );

		//	delete combatModel;
		//	combatModel = NULL;

		//	if ( this.head.GetEntity() ) {
		//		this.head.GetEntity().ClearBody();
		//		this.head.GetEntity().PostEventMS( &EV_Remove, 0 );
		//	}

		//	// remove any attached entities
		//	for( i = 0; i < this.attachments.Num(); i++ ) {
		//		ent = this.attachments[ i ].ent.GetEntity();
		//		if ( ent ) {
		//			ent.PostEventMS( &EV_Remove, 0 );
		//		}
		//	}

		//	ShutdownThreads();
	}

/*
=====================
idActor::Spawn
=====================
*/
	Spawn ( ): void {
		var ent: idEntity;
		var jointName = new idStr;
		var fovDegrees = new R<number>()/*float*/;
		var copyJoint = new copyJoints_t;

		this.animPrefix.opEquals( "" );
		this.state = null;
		this.idealState = null;

		var $rank = new R(this.rank) ;
		this.spawnArgs.GetInt_R("rank", "0", $rank);
		this.rank = $rank.$;

		var $team = new R(this.team );
		this.spawnArgs.GetInt_R("team", "0", $team);
		this.team = $team.$;
		this.spawnArgs.GetVector_R( "offsetModel", "0 0 0", this.modelOffset );

		var $use_combat_box = new R(this.use_combat_bbox  );
		this.spawnArgs.GetBool_R("use_combat_bbox", "0", $use_combat_box);
		this.use_combat_bbox = $use_combat_box.$;

		this.viewAxis.opEquals( this.GetPhysics ( ).GetAxis ( ) );

		this.spawnArgs.GetFloat_R("fov", "90", fovDegrees);
		this.SetFOV( fovDegrees.$ );

		this.pain_debounce_time = 0;

		this.pain_delay = SEC2MS( this.spawnArgs.GetFloat( "pain_delay" ) );
		this.pain_threshold = this.spawnArgs.GetInt( "pain_threshold" );

		this.LoadAF ( );

		this.walkIK.Init( this, IK_ANIM, this.modelOffset );

		// the animation used to be set to the IK_ANIM at this point, but that was fixed, resulting in
		// attachments not binding correctly, so we're stuck setting the IK_ANIM before attaching things.
		this.animator.ClearAllAnims( gameLocal.time, 0 );
		this.animator.SetFrame( ANIMCHANNEL_ALL, this.animator.GetAnim_name( IK_ANIM ), 0, 0, 0 );

		// spawn any attachments we might have
		var kv = this.spawnArgs.MatchPrefix( "def_attach", null );
		while ( kv ) {
			var args = new idDict;

			args.Set( "classname", kv.GetValue ( ).c_str ( ) );

			// make items non-touchable so the player can't take them out of the character's hands
			args.Set( "no_touch", "1" );

			// don't let them drop to the floor
			args.Set( "dropToFloor", "0" );

			var $ent = new R( ent );
			gameLocal.SpawnEntityDef(args, $ent);
			ent = $ent.$;
			if ( !ent ) {
				gameLocal.Error( "Couldn't spawn '%s' to attach to entity '%s'", kv.GetValue ( ).c_str ( ), this.name.c_str ( ) );
			} else {
				this.Attach( ent );
			}
			kv = this.spawnArgs.MatchPrefix( "def_attach", kv );
		}

		this.SetupDamageGroups ( );
		this.SetupHead ( );

		// clear the bind anim
		this.animator.ClearAllAnims( gameLocal.time, 0 );

		var headEnt = this.head.GetEntity ( );
		var headAnimator: idAnimator;
		if ( headEnt ) {
			headAnimator = headEnt.GetAnimator ( );
		} else {
			headAnimator = this.animator;
		}

		if ( headEnt ) {
			// set up the list of joints to copy to the head
			for ( kv = this.spawnArgs.MatchPrefix( "copy_joint", null ); kv != null; kv = this.spawnArgs.MatchPrefix( "copy_joint", kv ) ) {
				if ( kv.GetValue ( ).data == "" ) {
					// probably clearing out inherited key, so skip it
					continue;
				}

				jointName.opEquals( kv.GetKey ( ) );
				if ( jointName.StripLeadingOnce( "copy_joint_world " ) ) {
					copyJoint.mod = jointModTransform_t.JOINTMOD_WORLD_OVERRIDE;
				} else {
					jointName.StripLeadingOnce( "copy_joint " );
					copyJoint.mod = jointModTransform_t.JOINTMOD_LOCAL_OVERRIDE;
				}

				copyJoint.from = this.animator.GetJointHandle(jointName.data);
				if ( copyJoint.from == jointHandle_t.INVALID_JOINT ) {
					gameLocal.Warning( "Unknown copy_joint '%s' on entity %s", jointName.c_str ( ), this.name.c_str ( ) );
					continue;
				}

				jointName.opEquals( kv.GetValue ( ) );
				copyJoint.to = headAnimator.GetJointHandle( jointName.data );
				if ( copyJoint.to == jointHandle_t.INVALID_JOINT ) {
					gameLocal.Warning( "Unknown copy_joint '%s' on head of entity %s", jointName.c_str ( ), this.name.c_str ( ) );
					continue;
				}

				this.copyJoints.Append( copyJoint );
			}
		}

		// set up blinking
		this.blink_anim = headAnimator.GetAnim_name( "blink" );
		this.blink_time = 0; // it's ok to blink right away
		this.blink_min = SEC2MS( this.spawnArgs.GetFloat( "blink_min", "0.5" ) );
		this.blink_max = SEC2MS( this.spawnArgs.GetFloat( "blink_max", "8" ) );

		// set up the head anim if necessary
		var /*int */headAnim = headAnimator.GetAnim_name( "def_head" );
		if ( headAnim ) {
			if ( headEnt ) {
				headAnimator.CycleAnim( ANIMCHANNEL_ALL, headAnim, gameLocal.time, 0 );
			} else {
				headAnimator.CycleAnim( ANIMCHANNEL_HEAD, headAnim, gameLocal.time, 0 );
			}
		}

		if ( this.spawnArgs.GetString_RidStr( "sound_bone", "", jointName ) ) {
			this.soundJoint = this.animator.GetJointHandle( jointName .data);
			if ( this.soundJoint == jointHandle_t.INVALID_JOINT ) {
				gameLocal.Warning( "idAnimated '%s' at (%s): cannot find joint '%s' for sound playback", this.name.c_str ( ), this.GetPhysics ( ).GetOrigin ( ).ToString( 0 ), jointName.c_str ( ) );
			}
		}

		this.finalBoss = this.spawnArgs.GetBool( "finalBoss" );

		this.FinishSetup ( );
	}

/*
================
idActor::FinishSetup
================
*/
	FinishSetup ( ): void {
		var scriptObjectName = new R<string> ( );

		// setup script object
		if ( this.spawnArgs.GetString_Rstring( "scriptobject", null, scriptObjectName ) ) {
			if ( !this.scriptObject.SetType( scriptObjectName.$ ) ) {
				gameLocal.Error( "Script object '%s' not found on entity '%s'.", scriptObjectName, this.name.c_str ( ) );
			}

			this.ConstructScriptObject ( );
		}

		this.SetupBody ( );
	}

/*
================
idActor::SetupHead
================
*/
	SetupHead ( ): void {
		var headEnt: idAFAttachment;
		var jointName = new idStr;
		var headModel: string;
		var joint: jointHandle_t;
		var damageJoint: jointHandle_t;
		var i: number /*int*/;
		var sndKV: idKeyValue;

		if ( gameLocal.isClient ) {
			return;
		}

		headModel = this.spawnArgs.GetString( "def_head", "" );
		if ( headModel ) {
			jointName.opEquals( this.spawnArgs.GetString( "head_joint" ) );
			joint = this.animator.GetJointHandle( jointName.data );
			if ( joint == jointHandle_t.INVALID_JOINT ) {
				gameLocal.Error( "Joint '%s' not found for 'head_joint' on '%s'", jointName.c_str ( ), this.name.c_str ( ) );
			}

			// set the damage joint to be part of the head damage group
			damageJoint = joint;
			for ( i = 0; i < this.damageGroups.Num ( ); i++ ) {
				if ( this.damageGroups[i].data == "head" ) {
					damageJoint = static_cast<jointHandle_t>( i );
					break;
				}
			}

			// copy any sounds in case we have frame commands on the head
			var args = new idDict;
			sndKV = this.spawnArgs.MatchPrefix( "snd_", null );
			while ( sndKV ) {
				args.Set( sndKV.GetKey ( ).data, sndKV.GetValue ( ).data );
				sndKV = this.spawnArgs.MatchPrefix( "snd_", sndKV );
			}

			headEnt = static_cast<idAFAttachment>( gameLocal.SpawnEntityType( idAFAttachment.Type, args ) );
			headEnt.SetName( va( "%s_head", this.name.c_str ( ) ) );
			headEnt.SetBody( this, headModel, damageJoint );
			this.head.opEquals( headEnt );

			var origin = new idVec3;
			var axis = new idMat3;
			var attach = this.attachments.Alloc ( );
			attach.channel = this.animator.GetChannelForJoint(joint);
			this.animator.GetJointTransform(joint, gameLocal.time, origin, axis);
			debugger; //check b
			origin.opEquals( this.renderEntity.origin.opAddition( idMat3.opMultiplication_VecMat( origin.opAddition( this.modelOffset ), this.renderEntity.axis ) ) );
			attach.ent.opEquals( headEnt );
			headEnt.SetOrigin( origin );
			headEnt.SetAxis( this.renderEntity.axis );
			headEnt.BindToJoint_num( this, joint, true );
		}
	}
////
/////*
////================
////idActor::CopyJointsFromBodyToHead
////================
////*/
////void idActor::CopyJointsFromBodyToHead( ) {
////	idEntity	*headEnt = this.head.GetEntity();
////	idAnimator	*headAnimator;
////	var/*int*/i:number;
////	idMat3		mat;
////	idMat3		axis;
////	idVec3		pos;
////
////	if ( !headEnt ) {
////		return;
////	}
////
////	headAnimator = headEnt.GetAnimator();
////
////	// copy the animation from the body to the head
////	for( i = 0; i < copyJoints.Num(); i++ ) {
////		if ( copyJoints[ i ].mod == JOINTMOD_WORLD_OVERRIDE ) {
////			mat = headEnt.GetPhysics().GetAxis().Transpose();
////			GetJointWorldTransform( copyJoints[ i ].from, gameLocal.time, pos, axis );
////			pos -= headEnt.GetPhysics().GetOrigin();
////			headAnimator.SetJointPos( copyJoints[ i ].to, copyJoints[ i ].mod, pos * mat );
////			headAnimator.SetJointAxis( copyJoints[ i ].to, copyJoints[ i ].mod, axis * mat );
////		} else {
////			this.animator.GetJointLocalTransform( copyJoints[ i ].from, gameLocal.time, pos, axis );
////			headAnimator.SetJointPos( copyJoints[ i ].to, copyJoints[ i ].mod, pos );
////			headAnimator.SetJointAxis( copyJoints[ i ].to, copyJoints[ i ].mod, axis );
////		}
////	}
////}
////
/////*
////================
////idActor::Restart
////================
////*/
////void idActor::Restart( ) {
////	assert( !this.head.GetEntity() );
////	SetupHead();
////	FinishSetup();
////}
////
/////*
////================
////idActor::Save
////
////archive object for savegame file
////================
////*/
////void idActor::Save( idSaveGame *savefile ) const {
////	idActor *ent;
////	var/*int*/i:number;
////
////	savefile.WriteInt( this.team );
////	savefile.WriteInt( this.rank );
////	savefile.WriteMat3( this.viewAxis );
////
////	savefile.WriteInt( enemyList.Num() );
////	for ( ent = enemyList.Next(); ent != NULL; ent = ent.enemyNode.Next() ) {
////		savefile.WriteObject( ent );
////	}
////
////	savefile.WriteFloat( fovDot );
////	savefile.WriteVec3( this.eyeOffset );
////	savefile.WriteVec3( this.modelOffset );
////	savefile.WriteAngles( deltaViewAngles );
////
////	savefile.WriteInt( this.pain_debounce_time );
////	savefile.WriteInt( this.pain_delay );
////	savefile.WriteInt( this.pain_threshold );
////
////	savefile.WriteInt( this.damageGroups.Num() );
////	for( i = 0; i < this.damageGroups.Num(); i++ ) {
////		savefile.WriteString( this.damageGroups[ i ] );
////	}
////
////	savefile.WriteInt( this.damageScale.Num() );
////	for( i = 0; i < this.damageScale.Num(); i++ ) {
////		savefile.WriteFloat( this.damageScale[ i ] );
////	}
////
////	savefile.WriteBool( this.use_combat_bbox );
////	this.head.Save( savefile );
////
////	savefile.WriteInt( copyJoints.Num() );
////	for( i = 0; i < copyJoints.Num(); i++ ) {
////		savefile.WriteInt( copyJoints[i].mod );
////		savefile.WriteJoint( copyJoints[i].from );
////		savefile.WriteJoint( copyJoints[i].to );
////	}
////
////	savefile.WriteJoint( this.leftEyeJoint );
////	savefile.WriteJoint( this.rightEyeJoint );
////	savefile.WriteJoint( soundJoint );
////
////	this.walkIK.Save( savefile );
////
////	savefile.WriteString( this.animPrefix );
////	savefile.WriteString( painAnim );
////
////	savefile.WriteInt( this.blink_anim );
////	savefile.WriteInt( blink_time );
////	savefile.WriteInt( blink_min );
////	savefile.WriteInt( blink_max );
////
////	// script variables
////	savefile.WriteObject( this.scriptThread );
////
////	savefile.WriteString( this.waitState );
////
////	this..Save( savefile );
////	this.torsoAnim.Save( savefile );
////	this.legsAnim.Save( savefile );
////
////	savefile.WriteBool( allowPain );
////	savefile.WriteBool( allowEyeFocus );
////
////	savefile.WriteInt( painTime );
////
////	savefile.WriteInt( this.attachments.Num() );
////	for ( i = 0; i < this.attachments.Num(); i++ ) {
////		this.attachments[i].ent.Save( savefile );
////		savefile.WriteInt( this.attachments[i].channel );
////	}
////
////	savefile.WriteBool( finalBoss );
////
////	idToken token;
////
////	//FIXME: this is unneccesary
////	if ( this.state ) {
////		idLexer src( this.state.Name(), idStr::Length( this.state.Name() ), "idAI::Save" );
////
////		src.ReadTokenOnLine( &token );
////		src.ExpectTokenString( "::" );
////		src.ReadTokenOnLine( &token );
////
////		savefile.WriteString( token );
////	} else {
////		savefile.WriteString( "" );
////	}
////
////	if ( this.idealState ) {
////		idLexer src( this.idealState.Name(), idStr::Length( this.idealState.Name() ), "idAI::Save" );
////
////		src.ReadTokenOnLine( &token );
////		src.ExpectTokenString( "::" );
////		src.ReadTokenOnLine( &token );
////
////		savefile.WriteString( token );
////	} else {
////		savefile.WriteString( "" );
////	}
////
////}
////
/////*
////================
////idActor::Restore
////
////unarchives object from save game file
////================
////*/
////void idActor::Restore( idRestoreGame *savefile ) {
////	int i, num;
////	idActor *ent;
////
////	savefile.ReadInt( this.team );
////	savefile.ReadInt( this.rank );
////	savefile.ReadMat3( this.viewAxis );
////
////	savefile.ReadInt( num );
////	for ( i = 0; i < num; i++ ) {
////		savefile.ReadObject( reinterpret_cast<idClass *&>( ent ) );
////		assert( ent );
////		if ( ent ) {
////			ent.enemyNode.AddToEnd( enemyList );
////		}
////	}
////
////	savefile.ReadFloat( fovDot );
////	savefile.ReadVec3( this.eyeOffset );
////	savefile.ReadVec3( this.modelOffset );
////	savefile.ReadAngles( deltaViewAngles );
////
////	savefile.ReadInt( this.pain_debounce_time );
////	savefile.ReadInt( this.pain_delay );
////	savefile.ReadInt( this.pain_threshold );
////
////	savefile.ReadInt( num );
////	this.damageGroups.SetGranularity( 1 );
////	this.damageGroups.SetNum( num );
////	for( i = 0; i < num; i++ ) {
////		savefile.ReadString( this.damageGroups[ i ] );
////	}
////
////	savefile.ReadInt( num );
////	this.damageScale.SetNum( num );
////	for( i = 0; i < num; i++ ) {
////		savefile.ReadFloat( this.damageScale[ i ] );
////	}
////
////	savefile.ReadBool( this.use_combat_bbox );
////	this.head.Restore( savefile );
////
////	savefile.ReadInt( num );
////	copyJoints.SetNum( num );
////	for( i = 0; i < num; i++ ) {
////		int val;
////		savefile.ReadInt( val );
////		copyJoints[i].mod = static_cast<jointModTransform_t>( val );
////		savefile.ReadJoint( copyJoints[i].from );
////		savefile.ReadJoint( copyJoints[i].to );
////	}
////
////	savefile.ReadJoint( this.leftEyeJoint );
////	savefile.ReadJoint( this.rightEyeJoint );
////	savefile.ReadJoint( soundJoint );
////
////	this.walkIK.Restore( savefile );
////
////	savefile.ReadString( this.animPrefix );
////	savefile.ReadString( painAnim );
////
////	savefile.ReadInt( this.blink_anim );
////	savefile.ReadInt( blink_time );
////	savefile.ReadInt( blink_min );
////	savefile.ReadInt( blink_max );
////
////	savefile.ReadObject( reinterpret_cast<idClass *&>( this.scriptThread ) );
////
////	savefile.ReadString( this.waitState );
////
////	this..Restore( savefile );
////	this.torsoAnim.Restore( savefile );
////	this.legsAnim.Restore( savefile );
////
////	savefile.ReadBool( allowPain );
////	savefile.ReadBool( allowEyeFocus );
////
////	savefile.ReadInt( painTime );
////
////	savefile.ReadInt( num );
////	for ( i = 0; i < num; i++ ) {
////		idAttachInfo &attach = this.attachments.Alloc();
////		attach.ent.Restore( savefile );
////		savefile.ReadInt( attach.channel );
////	}
////
////	savefile.ReadBool( finalBoss );
////
////	idStr statename;
////
////	savefile.ReadString( statename );
////	if ( statename.Length() > 0 ) {
////		this.state = GetScriptFunction( statename );
////	}
////
////	savefile.ReadString( statename );
////	if ( statename.Length() > 0 ) {
////		this.idealState = GetScriptFunction( statename );
////	}
////}
////
/////*
////================
////idActor::Hide
////================
////*/
////void idActor::Hide( ) {
////	ent:idEntity;
////	idEntity *next;
////
////	idAFEntity_Base::Hide();
////	if ( this.head.GetEntity() ) {
////		this.head.GetEntity().Hide();
////	}
////
////	for( ent = GetNextTeamEntity(); ent != NULL; ent = next ) {
////		next = ent.GetNextTeamEntity();
////		if ( ent.GetBindMaster() == this ) {
////			ent.Hide();
////			if ( ent.IsType( idLight::Type ) ) {
////				static_cast<idLight *>( ent ).Off();
////			}
////		}
////	}
////	UnlinkCombat();
////}
////
/////*
////================
////idActor::Show
////================
////*/
////void idActor::Show( ) {
////	var ent:idEntity
////	idEntity *next;
////
////	idAFEntity_Base::Show();
////	if ( this.head.GetEntity() ) {
////		this.head.GetEntity().Show();
////	}
////	for( ent = GetNextTeamEntity(); ent != NULL; ent = next ) {
////		next = ent.GetNextTeamEntity();
////		if ( ent.GetBindMaster() == this ) {
////			ent.Show();
////			if ( ent.IsType( idLight::Type ) ) {
////				static_cast<idLight *>( ent ).On();
////			}
////		}
////	}
////	LinkCombat();
////}
////
/////*
////==============
////idActor::GetDefaultSurfaceType
////==============
////*/
////int	idActor::GetDefaultSurfaceType( ) const {
////	return SURFTYPE_FLESH;
////}
////
/////*
////================
////idActor::ProjectOverlay
////================
////*/
////void idActor::ProjectOverlay( const idVec3 &origin, const idVec3 &dir, float size, const char *material ) {
////	var ent:idEntity
////	idEntity *next;
////
////	idEntity::ProjectOverlay( origin, dir, size, material );
////
////	for( ent = GetNextTeamEntity(); ent != NULL; ent = next ) {
////		next = ent.GetNextTeamEntity();
////		if ( ent.GetBindMaster() == this ) {
////			if ( ent.fl.takedamage && ent.spawnArgs.GetBool( "bleed" ) ) {
////				ent.ProjectOverlay( origin, dir, size, material );
////			}
////		}
////	}
////}

/*
================
idActor::LoadAF
================
*/
	LoadAF ( ): boolean {
		var fileName = new idStr;

		if ( !this.spawnArgs.GetString_RidStr( "ragdoll", "*unknown*", fileName ) || !fileName.Length ( ) ) {
			return false;
		}
		this.af.SetAnimator( this.GetAnimator ( ) );
		return this.af.Load( this, fileName.data );
	}

/*
=====================
idActor::SetupBody
=====================
*/
	SetupBody ( ): void {
		var jointname: string;

		todoThrow();
		////this.animator.ClearAllAnims( gameLocal.time, 0 );
		////this.animator.ClearAllJoints ( );

		////var headEnt: idEntity = this.head.GetEntity ( );
		////if ( headEnt ) {
		////	jointname = this.spawnArgs.GetString( "bone_leftEye" );
		////	this.leftEyeJoint = headEnt.GetAnimator ( ).GetJointHandle( jointname );

		////	jointname = this.spawnArgs.GetString( "bone_rightEye" );
		////	this.rightEyeJoint = headEnt.GetAnimator ( ).GetJointHandle( jointname );

		////	// set up the eye height.  check if it's specified in the def.
		////	var $z = new R<number>();
		////	var gotEyeHeight = this.spawnArgs.GetFloat_R("eye_height", "0", $z);
		////	this.eyeOffset.z = $z.$;
		////	if (!gotEyeHeight ) {
		////		// if not in the def, then try to base it off the idle animation
		////		var /*int */anim = headEnt.GetAnimator ( ).GetAnim( "idle" );
		////		if ( anim && ( this.leftEyeJoint != jointHandle_t.INVALID_JOINT ) ) {
		////			var pos = new idVec3;
		////			var axis = new idMat3;
		////			headEnt.GetAnimator ( ).PlayAnim( ANIMCHANNEL_ALL, anim, gameLocal.time, 0 );
		////			headEnt.GetAnimator ( ).GetJointTransform( this.leftEyeJoint, gameLocal.time, pos, axis );
		////			headEnt.GetAnimator ( ).ClearAllAnims( gameLocal.time, 0 );
		////			headEnt.GetAnimator ( ).ForceUpdate ( );
		////			pos.opAdditionAssignment( headEnt.GetPhysics ( ).GetOrigin ( ).opSubtraction( this.GetPhysics ( ).GetOrigin ( ) ) );
		////			this.eyeOffset.opEquals( pos.opAddition( this.modelOffset ) );
		////		} else {
		////			// just base it off the bounding box size
		////			this.eyeOffset.z = this.GetPhysics ( ).GetBounds ( )[1].z - 6;
		////		}
		////	}
		////	this.headAnim.Init( this, headEnt.GetAnimator ( ), ANIMCHANNEL_ALL );
		////} else {
		////	jointname = this.spawnArgs.GetString( "bone_leftEye" );
		////	this.leftEyeJoint = this.animator.GetJointHandle( jointname );

		////	jointname = this.spawnArgs.GetString( "bone_rightEye" );
		////	this.rightEyeJoint = this.animator.GetJointHandle( jointname );

		////	// set up the eye height.  check if it's specified in the def.
		////	if ( !this.spawnArgs.GetFloat( "eye_height", "0", this.eyeOffset.z ) ) {
		////		// if not in the def, then try to base it off the idle animation
		////		var /*int */anim = this.animator.GetAnim( "idle" );
		////		if ( anim && ( this.leftEyeJoint != jointHandle_t.INVALID_JOINT ) ) {
		////			var pos = new idVec3;
		////			var axis = new idMat3;
		////			this.animator.PlayAnim( ANIMCHANNEL_ALL, anim, gameLocal.time, 0 );
		////			this.animator.GetJointTransform( this.leftEyeJoint, gameLocal.time, pos, axis );
		////			this.animator.ClearAllAnims( gameLocal.time, 0 );
		////			this.animator.ForceUpdate ( );
		////			this.eyeOffset.opEquals( pos.opAddition( this.modelOffset ) );
		////		} else {
		////			// just base it off the bounding box size
		////			this.eyeOffset.z = this.GetPhysics ( ).GetBounds ( )[1].z - 6;
		////		}
		////	}
		////	this.headAnim.Init( this, this.animator, ANIMCHANNEL_HEAD );
		////}

		////this.waitState.opEquals( "" );

		////this.torsoAnim.Init( this, this.animator, ANIMCHANNEL_TORSO );
		////this.legsAnim.Init( this, this.animator, ANIMCHANNEL_LEGS );
	}

/////*
////=====================
////idActor::CheckBlink
////=====================
////*/
////void idActor::CheckBlink( ) {
////	// check if it's time to blink
////	if ( !this.blink_anim || ( health <= 0 ) || !allowEyeFocus || ( blink_time > gameLocal.time ) ) {
////		return;
////	}
////
////	idEntity *headEnt = this.head.GetEntity();
////	if ( headEnt ) {
////		headEnt.GetAnimator().PlayAnim( ANIMCHANNEL_EYELIDS, this.blink_anim, gameLocal.time, 1 );
////	} else {
////		this.animator.PlayAnim( ANIMCHANNEL_EYELIDS, this.blink_anim, gameLocal.time, 1 );
////	}
////
////	// set the next blink time
////	blink_time = gameLocal.time + blink_min + gameLocal.random.RandomFloat() * ( blink_max - blink_min );
////}
////
/////*
////================
////idActor::GetPhysicsToVisualTransform
////================
////*/
////bool idActor::GetPhysicsToVisualTransform( idVec3 &origin, idMat3 &axis ) {
////	if ( this.af.IsActive() ) {
////		this.af.GetPhysicsToVisualTransform( origin, axis );
////		return true;
////	}
////	origin = this.modelOffset;
////	axis = this.viewAxis;
////	return true;
////}
////
/////*
////================
////idActor::GetPhysicsToSoundTransform
////================
////*/
////bool idActor::GetPhysicsToSoundTransform( idVec3 &origin, idMat3 &axis ) {
////	if ( soundJoint != jointHandle_t.INVALID_JOINT ) {
////		this.animator.GetJointTransform( soundJoint, gameLocal.time, origin, axis );
////		origin += this.modelOffset;
////		axis = this.viewAxis;
////	} else {
////		origin = this.GetPhysics().GetGravityNormal() * -this.eyeOffset.z;
////		axis.Identity();
////	}
////	return true;
////}
////
/////***********************************************************************
////
////	script state management
////
////***********************************************************************/
////
/////*
////================
////idActor::ShutdownThreads
////================
////*/
////void idActor::ShutdownThreads( ) {
////	this.headAnim.Shutdown();
////	this.torsoAnim.Shutdown();
////	this.legsAnim.Shutdown();
////
////	if ( this.scriptThread ) {
////		this.scriptThread.EndThread();
////		this.scriptThread.PostEventMS( &EV_Remove, 0 );
////		delete this.scriptThread;
////		this.scriptThread = NULL;
////	}
////}
////
/////*
////================
////idActor::ShouldConstructScriptObjectAtSpawn
////
////Called during idEntity::Spawn to see if it should construct the script object or not.
////Overridden by subclasses that need to spawn the script object themselves.
////================
////*/
////bool idActor::ShouldConstructScriptObjectAtSpawn( ) const {
////	return false;
////}
////
/////*
////================
////idActor::ConstructScriptObject
////
////Called during idEntity::Spawn.  Calls the constructor on the script object.
////Can be overridden by subclasses when a thread doesn't need to be allocated.
////================
////*/
////idThread *idActor::ConstructScriptObject( ) {
////	const function_t *constructor;
////
////	// make sure we have a scriptObject
////	if ( !this.scriptObject.HasObject() ) {
////		gameLocal.Error( "No scriptobject set on '%s'.  Check the '%s' entityDef.", this.name.c_str(), GetEntityDefName() );
////	}
////
////	if ( !this.scriptThread ) {
////		// create script thread
////		this.scriptThread = new idThread();
////		this.scriptThread.ManualDelete();
////		this.scriptThread.ManualControl();
////		this.scriptThread.SetThreadName( this.name.c_str() );
////	} else {
////		this.scriptThread.EndThread();
////	}
////	
////	// call script object's constructor
////	constructor = this.scriptObject.GetConstructor();
////	if ( !constructor ) {
////		gameLocal.Error( "Missing constructor on '%s' for entity '%s'", this.scriptObject.GetTypeName(), this.name.c_str() );
////	}
////
////	// init the script object's data
////	this.scriptObject.ClearObject();
////
////	// just set the current function on the script.  we'll execute in the subclasses.
////	this.scriptThread.CallFunction( this, constructor, true );
////
////	return this.scriptThread;
////}
////
/////*
////=====================
////idActor::GetScriptFunction
////=====================
////*/
////const function_t *idActor::GetScriptFunction( const char *funcname ) {
////	const function_t *func;
////
////	func = this.scriptObject.GetFunction( funcname );
////	if ( !func ) {
////		this.scriptThread.Error( "Unknown function '%s' in '%s'", funcname, this.scriptObject.GetTypeName() );
////	}
////
////	return func;
////}
////
/////*
////=====================
////idActor::SetState
////=====================
////*/
////void idActor::SetState( const function_t *newState ) {
////	if ( !newState ) {
////		gameLocal.Error( "idActor::SetState: Null state" );
////	}
////
////	if ( ai_debugScript.GetInteger() == entityNumber ) {
////		gameLocal.Printf( "%d: %s: State: %s\n", gameLocal.time, this.name.c_str(), newState.Name() );
////	}
////
////	this.state = newState;
////	this.idealState = this.state;
////	this.scriptThread.CallFunction( this, this.state, true );
////}
////
/////*
////=====================
////idActor::SetState
////=====================
////*/
////void idActor::SetState( const char *statename ) {
////	const function_t *newState;
////
////	newState = GetScriptFunction( statename );
////	SetState( newState );
////}
////
/////*
////=====================
////idActor::UpdateScript
////=====================
////*/
////void idActor::UpdateScript( ) {
////	int	i;
////
////	if ( ai_debugScript.GetInteger() == entityNumber ) {
////		this.scriptThread.EnableDebugInfo();
////	} else {
////		this.scriptThread.DisableDebugInfo();
////	}
////
////	// a series of state changes can happen in a single frame.
////	// this loop limits them in case we've entered an infinite loop.
////	for( i = 0; i < 20; i++ ) {
////		if ( this.idealState != this.state ) {
////			SetState( this.idealState );
////		}
////
////		// don't call script until it's done waiting
////		if ( this.scriptThread.IsWaiting() ) {
////			break;
////		}
////        
////		this.scriptThread.Execute();
////		if ( this.idealState == this.state ) {
////			break;
////		}
////	}
////
////	if ( i == 20 ) {
////		this.scriptThread.Warning( "idActor::UpdateScript: exited loop to prevent lockup" );
////	}
////}

/***********************************************************************

	vision

***********************************************************************/

/*
=====================
idActor::setFov
=====================
*/
	SetFOV ( /*float*/ fov: number ): void {
		this.fovDot = /*(float)*/cos( DEG2RAD( fov * 0.5 ) );
	}
////
/////*
////=====================
////idActor::SetEyeHeight
////=====================
////*/
////void idActor::SetEyeHeight( float height ):void {
////	this.eyeOffset.z = height;
////}
////
/////*
////=====================
////idActor::EyeHeight
////=====================
////*/
////float idActor::EyeHeight( ) const {
////	return this.eyeOffset.z;
////}
////
/////*
////=====================
////idActor::EyeOffset
////=====================
////*/
////idVec3 idActor::EyeOffset( ) const {
////	return this.GetPhysics().GetGravityNormal() * -this.eyeOffset.z;
////}
////
/////*
////=====================
////idActor::GetEyePosition
////=====================
////*/
////idVec3 idActor::GetEyePosition( ) const {
////	return this.GetPhysics().GetOrigin() + ( this.GetPhysics().GetGravityNormal() * -this.eyeOffset.z );
////}
////
/////*
////=====================
////idActor::GetViewPos
////=====================
////*/
////void idActor::GetViewPos( idVec3 &origin, idMat3 &axis ) :void {
////	origin = GetEyePosition();
////	axis = this.viewAxis;
////}
////
/////*
////=====================
////idActor::CheckFOV
////=====================
////*/
////bool idActor::CheckFOV( pos:idVec3 ) const {
////	if ( fovDot == 1.0f ) {
////		return true;
////	}
////
////	float	dot;
////	idVec3	delta;
////	
////	delta = pos - GetEyePosition();
////
////	// get our gravity normal
////	const idVec3 &gravityDir = this.GetPhysics().GetGravityNormal();
////
////	// infinite vertical vision, so project it onto our orientation plane
////	delta -= gravityDir * ( gravityDir * delta );
////
////	delta.Normalize();
////	dot = this.viewAxis[ 0 ] * delta;
////
////	return ( dot >= fovDot );
////}
////
/////*
////=====================
////idActor::CanSee
////=====================
////*/
////bool idActor::CanSee( ent:idEntity, bool useFov ) const {
////	trace_t		tr;
////	idVec3		eye;
////	idVec3		toPos;
////
////	if ( ent.IsHidden() ) {
////		return false;
////	}
////
////	if ( ent.IsType( idActor::Type ) ) {
////		toPos = ( ( idActor * )ent ).GetEyePosition();
////	} else {
////		toPos = ent.GetPhysics().GetOrigin();
////	}
////
////	if ( useFov && !CheckFOV( toPos ) ) {
////		return false;
////	}
////
////	eye = GetEyePosition();
////
////	gameLocal.clip.TracePoint( tr, eye, toPos, MASK_OPAQUE, this );
////	if ( tr.fraction >= 1.0f || ( gameLocal.GetTraceEntity( tr ) == ent ) ) {
////		return true;
////	}
////
////	return false;
////}
////
/////*
////=====================
////idActor::PointVisible
////=====================
////*/
////bool idActor::PointVisible( const idVec3 &point ) const {
////	trace_t results;
////	idVec3 start, end;
////
////	start = GetEyePosition();
////	end = point;
////	end[2] += 1.0f;
////
////	gameLocal.clip.TracePoint( results, start, end, MASK_OPAQUE, this );
////	return ( results.fraction >= 1.0f );
////}
////
/////*
////=====================
////idActor::GetAIAimTargets
////
////Returns positions for the AI to aim at.
////=====================
////*/
////void idActor::GetAIAimTargets( const idVec3 &lastSightPos, idVec3 &headPos, idVec3 &chestPos ) {
////	headPos = lastSightPos + EyeOffset();
////	chestPos = ( headPos + lastSightPos + this.GetPhysics().GetBounds().GetCenter() ) * 0.5;
////}
////
/////*
////=====================
////idActor::GetRenderView
////=====================
////*/
////renderView_t *idActor::GetRenderView() {
////	renderView_t *rv = idEntity::GetRenderView();
////	rv.viewaxis = this.viewAxis;
////	rv.vieworg = GetEyePosition();
////	return rv;
////}
////
/////***********************************************************************
////
////	Model/Ragdoll
////
////***********************************************************************/
////
/////*
////================
////idActor::SetCombatModel
////================
////*/
////void idActor::SetCombatModel( ):void {
////	idAFAttachment *headEnt;
////
////	if ( !this.use_combat_bbox ) {
////		if ( combatModel ) {
////			combatModel.Unlink();
////			combatModel.LoadModel( modelDefHandle );
////		} else {
////			combatModel = new idClipModel( modelDefHandle );
////		}
////
////		headEnt = this.head.GetEntity();
////		if ( headEnt ) {
////			headEnt.SetCombatModel();
////		}
////	}
////}
////
/////*
////================
////idActor::GetCombatModel
////================
////*/
////idClipModel *idActor::GetCombatModel( ) const {
////	return combatModel;
////}
////
/////*
////================
////idActor::LinkCombat
////================
////*/
////void idActor::LinkCombat( ):void {
////	idAFAttachment *headEnt;
////
////	if ( fl.hidden || this.use_combat_bbox ) {
////		return;
////	}
////
////	if ( combatModel ) {
////		combatModel.Link( gameLocal.clip, this, 0, this.renderEntity.origin, this.renderEntity.axis, modelDefHandle );
////	}
////	headEnt = this.head.GetEntity();
////	if ( headEnt ) {
////		headEnt.LinkCombat();
////	}
////}
////
/////*
////================
////idActor::UnlinkCombat
////================
////*/
////void idActor::UnlinkCombat( ) :void{
////	idAFAttachment *headEnt;
////
////	if ( combatModel ) {
////		combatModel.Unlink();
////	}
////	headEnt = this.head.GetEntity();
////	if ( headEnt ) {
////		headEnt.UnlinkCombat();
////	}
////}
////
/////*
////================
////idActor::StartRagdoll
////================
////*/
////bool idActor::StartRagdoll( ) {
////	float slomoStart, slomoEnd;
////	float jointFrictionDent, jointFrictionDentStart, jointFrictionDentEnd;
////	float contactFrictionDent, contactFrictionDentStart, contactFrictionDentEnd;
////
////	// if no AF loaded
////	if ( !this.af.IsLoaded() ) {
////		return false;
////	}
////
////	// if the AF is already active
////	if ( this.af.IsActive() ) {
////		return true;
////	}
////
////	// disable the monster bounding box
////	this.GetPhysics().DisableClip();
////
////	// start using the AF
////	this.af.StartFromCurrentPose( this.spawnArgs.GetInt( "velocityTime", "0" ) );
////
////	slomoStart = MS2SEC( gameLocal.time ) + this.spawnArgs.GetFloat( "ragdoll_slomoStart", "-1.6" );
////	slomoEnd = MS2SEC( gameLocal.time ) + this.spawnArgs.GetFloat( "ragdoll_slomoEnd", "0.8" );
////
////	// do the first part of the death in slow motion
////	this.af.GetPhysics().SetTimeScaleRamp( slomoStart, slomoEnd );
////
////	jointFrictionDent = this.spawnArgs.GetFloat( "ragdoll_jointFrictionDent", "0.1" );
////	jointFrictionDentStart = MS2SEC( gameLocal.time ) + this.spawnArgs.GetFloat( "ragdoll_jointFrictionStart", "0.2" );
////	jointFrictionDentEnd = MS2SEC( gameLocal.time ) + this.spawnArgs.GetFloat( "ragdoll_jointFrictionEnd", "1.2" );
////
////	// set joint friction dent
////	this.af.GetPhysics().SetJointFrictionDent( jointFrictionDent, jointFrictionDentStart, jointFrictionDentEnd );
////
////	contactFrictionDent = this.spawnArgs.GetFloat( "ragdoll_contactFrictionDent", "0.1" );
////	contactFrictionDentStart = MS2SEC( gameLocal.time ) + this.spawnArgs.GetFloat( "ragdoll_contactFrictionStart", "1.0" );
////	contactFrictionDentEnd = MS2SEC( gameLocal.time ) + this.spawnArgs.GetFloat( "ragdoll_contactFrictionEnd", "2.0" );
////
////	// set contact friction dent
////	this.af.GetPhysics().SetContactFrictionDent( contactFrictionDent, contactFrictionDentStart, contactFrictionDentEnd );
////
////	// drop any items the actor is holding
////	idMoveableItem::DropItems( this, "death", NULL );
////
////	// drop any articulated figures the actor is holding
////	idAFEntity_Base::DropAFs( this, "death", NULL );
////
////	RemoveAttachments();
////
////	return true;
////}
////
/////*
////================
////idActor::StopRagdoll
////================
////*/
////void idActor::StopRagdoll( ):void {
////	if ( this.af.IsActive() ) {
////		this.af.Stop();
////	}
////}
////
/////*
////================
////idActor::UpdateAnimationControllers
////================
////*/
////bool idActor::UpdateAnimationControllers( ) {
////
////	if ( this.af.IsActive() ) {
////		return idAFEntity_Base::UpdateAnimationControllers();
////	} else {
////		this.animator.ClearAFPose();
////	}
////
////	if ( this.walkIK.IsInitialized() ) {
////		this.walkIK.Evaluate();
////		return true;
////	}
////
////	return false;
////}
////
/////*
////================
////idActor::RemoveAttachments
////================
////*/
////void idActor::RemoveAttachments( ) :void{
////	var/*int*/i:number;
////	var ent:idEntity
////
////	// remove any attached entities
////	for( i = 0; i < this.attachments.Num(); i++ ) {
////		ent = this.attachments[ i ].ent.GetEntity();
////		if ( ent && ent.spawnArgs.GetBool( "remove" ) ) {
////			ent.PostEventMS( &EV_Remove, 0 );
////		}
////	}
////}

/*
================
idActor::Attach
================
*/
	Attach(ent: idEntity): void {
		todoThrow ( );
////	idVec3			origin;
////	idMat3			axis;
////	jointHandle_t	joint;
////	idStr			jointName;
////	idAttachInfo	&attach = this.attachments.Alloc();
////	idAngles		angleOffset;
////	idVec3			originOffset;
////
////	jointName = ent.spawnArgs.GetString( "joint" );
////	joint = this.animator.GetJointHandle( jointName );
////	if ( joint == jointHandle_t.INVALID_JOINT ) {
////		gameLocal.Error( "Joint '%s' not found for attaching '%s' on '%s'", jointName.c_str(), ent.GetClassname(), this.name.c_str() );
////	}
////
////	angleOffset = ent.spawnArgs.GetAngles( "angles" );
////	originOffset = ent.spawnArgs.GetVector( "origin" );
////
////	attach.channel = this.animator.GetChannelForJoint( joint );
////	GetJointWorldTransform( joint, gameLocal.time, origin, axis );
////	attach.ent = ent;
////
////	ent.SetOrigin( origin + originOffset * this.renderEntity.axis );
////	idMat3 rotate = angleOffset.ToMat3();
////	idMat3 newAxis = rotate * axis;
////	ent.SetAxis( newAxis );
////	ent.BindToJoint( this, joint, true );
////	ent.cinematic = cinematic;
	}
////
/////*
////================
////idActor::Teleport
////================
////*/
////void idActor::Teleport( const idVec3 &origin, angles:idAngles, idEntity *destination ) :void{
////	this.GetPhysics().SetOrigin( origin + idVec3( 0, 0, CM_CLIP_EPSILON ) );
////	this.GetPhysics().SetLinearVelocity( vec3_origin );
////
////	this.viewAxis.opEquals( angles.ToMat3();
////
////	UpdateVisuals();
////
////	if ( !IsHidden() ) {
////		// kill anything at the new position
////		gameLocal.KillBox( this );
////	}
////}
////
/////*
////================
////idActor::GetDeltaViewAngles
////================
////*/
////const idAngles &idActor::GetDeltaViewAngles( ) const {
////	return deltaViewAngles;
////}
////
/////*
////================
////idActor::SetDeltaViewAngles
////================
////*/
////void idActor::SetDeltaViewAngles( const idAngles &delta ) :void{
////	deltaViewAngles = delta;
////}
////
/////*
////================
////idActor::HasEnemies
////================
////*/
////bool idActor::HasEnemies( ) const {
////	idActor *ent;
////
////	for( ent = enemyList.Next(); ent != NULL; ent = ent.enemyNode.Next() ) {
////		if ( !ent.fl.hidden ) {
////			return true;
////		}
////	}
////
////	return false;
////}
////
/////*
////================
////idActor::ClosestEnemyToPoint
////================
////*/
////idActor *idActor::ClosestEnemyToPoint( pos:idVec3 ) {
////	idActor		*ent;
////	idActor		*bestEnt;
////	float		bestDistSquared;
////	float		distSquared;
////	idVec3		delta;
////
////	bestDistSquared = idMath::INFINITY;
////	bestEnt = NULL;
////	for( ent = enemyList.Next(); ent != NULL; ent = ent.enemyNode.Next() ) {
////		if ( ent.fl.hidden ) {
////			continue;
////		}
////		delta = ent.GetPhysics().GetOrigin() - pos;
////		distSquared = delta.LengthSqr();
////		if ( distSquared < bestDistSquared ) {
////			bestEnt = ent;
////			bestDistSquared = distSquared;
////		}
////	}
////
////	return bestEnt;
////}
////
/////*
////================
////idActor::EnemyWithMostHealth
////================
////*/
////idActor *idActor::EnemyWithMostHealth() {
////	idActor		*ent;
////	idActor		*bestEnt;
////
////	int most = -9999;
////	bestEnt = NULL;
////	for( ent = enemyList.Next(); ent != NULL; ent = ent.enemyNode.Next() ) {
////		if ( !ent.fl.hidden && ( ent.health > most ) ) {
////			bestEnt = ent;
////			most = ent.health;
////		}
////	}
////	return bestEnt;
////}
////
/////*
////================
////idActor::OnLadder
////================
////*/
////bool idActor::OnLadder( ) const {
////	return false;
////}
////
/////*
////==============
////idActor::GetAASLocation
////==============
////*/
////void idActor::GetAASLocation( idAAS *aas, pos:idVec3, int &areaNum ) :void {
////	idVec3		size;
////	idBounds	bounds;
////
////	GetFloorPos( 64.0f, pos );
////	if ( !aas ) {
////		areaNum = 0;
////		return;
////	}
////	
////	size = aas.GetSettings().boundingBoxes[0][1];
////	bounds[0] = -size;
////	size.z = 32.0f;
////	bounds[1] = size;
////
////	areaNum = aas.PointReachableAreaNum( pos, bounds, AREA_REACHABLE_WALK );
////	if ( areaNum ) {
////		aas.PushPointIntoAreaNum( areaNum, pos );
////	}
////}
////
/////***********************************************************************
////
////	animation state
////
////***********************************************************************/
////
/////*
////=====================
////idActor::SetAnimState
////=====================
////*/
////void idActor::SetAnimState( int channel, const char *statename, int blendFrames ):void {
////	const function_t *func;
////
////	func = this.scriptObject.GetFunction( statename );
////	if ( !func ) {
////		assert( 0 );
////		gameLocal.Error( "Can't find function '%s' in object '%s'", statename, this.scriptObject.GetTypeName() );
////	}
////
////	switch( channel ) {
////	case ANIMCHANNEL_HEAD :
////		this.headAnim.SetState( statename, blendFrames );
////		allowEyeFocus = true;
////		break;
////		
////	case ANIMCHANNEL_TORSO :
////		this.torsoAnim.SetState( statename, blendFrames );
////		this.legsAnim.Enable( blendFrames );
////		allowPain = true;
////		allowEyeFocus = true;
////		break;
////
////	case ANIMCHANNEL_LEGS :
////		this.legsAnim.SetState( statename, blendFrames );
////		this.torsoAnim.Enable( blendFrames );
////		allowPain = true;
////		allowEyeFocus = true;
////		break;
////
////	default:
////		gameLocal.Error( "idActor::SetAnimState: Unknown anim group" );
////		break;
////	}
////}
////
/////*
////=====================
////idActor::GetAnimState
////=====================
////*/
////const char *idActor::GetAnimState( int channel ) const {
////	switch( channel ) {
////	case ANIMCHANNEL_HEAD :
////		return this.headAnim.state;
////		break;
////
////	case ANIMCHANNEL_TORSO :
////		return this.torsoAnim.state;
////		break;
////
////	case ANIMCHANNEL_LEGS :
////		return this.legsAnim.state;
////		break;
////
////	default:
////		gameLocal.Error( "idActor::GetAnimState: Unknown anim group" );
////		return NULL;
////		break;
////	}
////}
////
/////*
////=====================
////idActor::InAnimState
////=====================
////*/
////bool idActor::InAnimState( int channel, const char *statename ) const {
////	switch( channel ) {
////	case ANIMCHANNEL_HEAD :
////		if ( this.headAnim.state == statename ) {
////			return true;
////		}
////		break;
////
////	case ANIMCHANNEL_TORSO :
////		if ( this.torsoAnim.state == statename ) {
////			return true;
////		}
////		break;
////
////	case ANIMCHANNEL_LEGS :
////		if ( this.legsAnim.state == statename ) {
////			return true;
////		}
////		break;
////
////	default:
////		gameLocal.Error( "idActor::InAnimState: Unknown anim group" );
////		break;
////	}
////
////	return false;
////}
////
/////*
////=====================
////idActor::WaitState
////=====================
////*/
////const char *idActor::WaitState( ) const {
////	if ( this.waitState.Length() ) {
////		return this.waitState;
////	} else {
////		return NULL;
////	}
////}
////
/////*
////=====================
////idActor::SetWaitState
////=====================
////*/
////void idActor::SetWaitState( const char *_waitstate ):void {
////	this.waitState = _waitstate;
////}
////
/////*
////=====================
////idActor::UpdateAnimState
////=====================
////*/
////void idActor::UpdateAnimState( ):void {
////	this.headAnim.UpdateState();
////	this.torsoAnim.UpdateState();
////	this.legsAnim.UpdateState();
////}
////
/////*
////=====================
////idActor::GetAnim
////=====================
////*/
////int idActor::GetAnim( int channel, const char *animname ) {
////	int			anim;
////	const char *temp;
////	idAnimator *animatorPtr;
////
////	if ( channel == ANIMCHANNEL_HEAD ) {
////		if ( !this.head.GetEntity() ) {
////			return 0;
////		}
////		animatorPtr = this.head.GetEntity().GetAnimator();
////	} else {
////		animatorPtr = &this.animator;
////	}
////
////	if ( this.animPrefix.Length() ) {
////		temp = va( "%s_%s", this.animPrefix.c_str(), animname );
////		anim = animatorPtr.GetAnim( temp );
////		if ( anim ) {
////			return anim;
////		}
////	}
////
////	anim = animatorPtr.GetAnim( animname );
////
////	return anim;
////}
////
/////*
////===============
////idActor::SyncAnimChannels
////===============
////*/
////void idActor::SyncAnimChannels( int channel, int syncToChannel, int blendFrames ) :void{
////	idAnimator		*headAnimator;
////	idAFAttachment	*headEnt;
////	int				anim;
////	idAnimBlend		*syncAnim;
////	int				starttime;
////	int				blendTime;
////	int				cycle;
////
////	blendTime = FRAME2MS( blendFrames );
////	if ( channel == ANIMCHANNEL_HEAD ) {
////		headEnt = this.head.GetEntity();
////		if ( headEnt ) {
////			headAnimator = headEnt.GetAnimator();
////			syncAnim = this.animator.CurrentAnim( syncToChannel );
////			if ( syncAnim ) {
////				anim = headAnimator.GetAnim( syncAnim.AnimFullName() );
////				if ( !anim ) {
////					anim = headAnimator.GetAnim( syncAnim.AnimName() );
////				}
////				if ( anim ) {
////					cycle = this.animator.CurrentAnim( syncToChannel ).GetCycleCount();
////					starttime = this.animator.CurrentAnim( syncToChannel ).GetStartTime();
////					headAnimator.PlayAnim( ANIMCHANNEL_ALL, anim, gameLocal.time, blendTime );
////					headAnimator.CurrentAnim( ANIMCHANNEL_ALL ).SetCycleCount( cycle );
////					headAnimator.CurrentAnim( ANIMCHANNEL_ALL ).SetStartTime( starttime );
////				} else {
////					headEnt.PlayIdleAnim( blendTime );
////				}
////			}
////		}
////	} else if ( syncToChannel == ANIMCHANNEL_HEAD ) {
////		headEnt = this.head.GetEntity();
////		if ( headEnt ) {
////			headAnimator = headEnt.GetAnimator();
////			syncAnim = headAnimator.CurrentAnim( ANIMCHANNEL_ALL );
////			if ( syncAnim ) {
////				anim = GetAnim( channel, syncAnim.AnimFullName() );
////				if ( !anim ) {
////					anim = GetAnim( channel, syncAnim.AnimName() );
////				}
////				if ( anim ) {
////					cycle = headAnimator.CurrentAnim( ANIMCHANNEL_ALL ).GetCycleCount();
////					starttime = headAnimator.CurrentAnim( ANIMCHANNEL_ALL ).GetStartTime();
////					this.animator.PlayAnim( channel, anim, gameLocal.time, blendTime );
////					this.animator.CurrentAnim( channel ).SetCycleCount( cycle );
////					this.animator.CurrentAnim( channel ).SetStartTime( starttime );
////				}
////			}
////		}
////	} else {
////		this.animator.SyncAnimChannels( channel, syncToChannel, gameLocal.time, blendTime );
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
////============
////idActor::Gib
////============
////*/
////void idActor::Gib( const idVec3 &dir, const char *damageDefName ):void {
////	// no gibbing in multiplayer - by self damage or by moving objects
////	if ( gameLocal.isMultiplayer ) {
////		return;
////	}
////	// only gib once
////	if ( gibbed ) {
////		return;
////	}
////	idAFEntity_Gibbable::Gib( dir, damageDefName );
////	if ( this.head.GetEntity() ) {
////		this.head.GetEntity().Hide();
////	}
////	StopSound( SND_CHANNEL_VOICE, false );
////}
////
////
/////*
////============
////idActor::Damage
////
////this		entity that is being damaged
////inflictor	entity that is causing the damage
////attacker	entity that caused the inflictor to damage targ
////	example: this=monster, inflictor=rocket, attacker=player
////
////dir			direction of the attack for knockback in global space
////point		point at which the damage is being inflicted, used for headshots
////damage		amount of damage being inflicted
////
////inflictor, attacker, dir, and point can be NULL for environmental effects
////
////Bleeding wounds and surface overlays are applied in the collision code that
////calls Damage()
////============
////*/
////void idActor::Damage( idEntity *inflictor, idEntity *attacker, const idVec3 &dir, 
////					  const char *damageDefName, const float damageScale, const int location ) {
////	if ( !fl.takedamage ) {
////		return;
////	}
////
////	if ( !inflictor ) {
////		inflictor = gameLocal.world;
////	}
////	if ( !attacker ) {
////		attacker = gameLocal.world;
////	}
////
////	if ( finalBoss && !inflictor.IsType( idSoulCubeMissile::Type ) ) {
////		return;
////	}
////
////	const idDict *damageDef = gameLocal.FindEntityDefDict( damageDefName );
////	if ( !damageDef ) {
////		gameLocal.Error( "Unknown damageDef '%s'", damageDefName );
////	}
////
////	int	damage = damageDef.GetInt( "damage" ) * this.damageScale;
////	damage = GetDamageForLocation( damage, location );
////
////	// inform the attacker that they hit someone
////	attacker.DamageFeedback( this, inflictor, damage );
////	if ( damage > 0 ) {
////		health -= damage;
////		if ( health <= 0 ) {
////			if ( health < -999 ) {
////				health = -999;
////			}
////			Killed( inflictor, attacker, damage, dir, location );
////			if ( ( health < -20 ) && this.spawnArgs.GetBool( "gib" ) && damageDef.GetBool( "gib" ) ) {
////				Gib( dir, damageDefName );
////			}
////		} else {
////			Pain( inflictor, attacker, damage, dir, location );
////		}
////	} else {
////		// don't accumulate knockback
////		if ( this.af.IsLoaded() ) {
////			// clear impacts
////			this.af.Rest();
////
////			// physics is turned off by calling af.Rest()
////			BecomeActive( TH_PHYSICS );
////		}
////	}
////}
////
/////*
////=====================
////idActor::ClearPain
////=====================
////*/
////void idActor::ClearPain( ):void {
////	this.pain_debounce_time = 0;
////}
////
/////*
////=====================
////idActor::Pain
////=====================
////*/
////bool idActor::Pain( idEntity *inflictor, idEntity *attacker, int damage, const idVec3 &dir, int location ) {
////	if ( this.af.IsLoaded() ) {
////		// clear impacts
////		this.af.Rest();
////
////		// physics is turned off by calling af.Rest()
////		BecomeActive( TH_PHYSICS );
////	}
////
////	if ( gameLocal.time < this.pain_debounce_time ) {
////		return false;
////	}
////
////	// don't play pain sounds more than necessary
////	this.pain_debounce_time = gameLocal.time + this.pain_delay;
////
////	if ( health > 75  ) {
////		StartSound( "snd_pain_small", SND_CHANNEL_VOICE, 0, false, NULL );
////	} else if ( health > 50 ) {
////		StartSound( "snd_pain_medium", SND_CHANNEL_VOICE, 0, false, NULL );
////	} else if ( health > 25 ) {
////		StartSound( "snd_pain_large", SND_CHANNEL_VOICE, 0, false, NULL );
////	} else {
////		StartSound( "snd_pain_huge", SND_CHANNEL_VOICE, 0, false, NULL );
////	}
////
////	if ( !allowPain || ( gameLocal.time < painTime ) ) {
////		// don't play a pain anim
////		return false;
////	}
////
////	if ( this.pain_threshold && ( damage < this.pain_threshold ) ) {
////		return false;
////	}
////
////	// set the pain anim
////	idStr damageGroup = GetDamageGroup( location );
////
////	painAnim = "";
////	if ( this.animPrefix.Length() ) {
////		if ( damageGroup.Length() && ( damageGroup != "legs" ) ) {
////			sprintf( painAnim, "%s_pain_%s", this.animPrefix.c_str(), damageGroup.c_str() );
////			if ( !this.animator.HasAnim( painAnim ) ) {
////				sprintf( painAnim, "pain_%s", damageGroup.c_str() );
////				if ( !this.animator.HasAnim( painAnim ) ) {
////					painAnim = "";
////				}
////			}
////		}
////
////		if ( !painAnim.Length() ) {
////			sprintf( painAnim, "%s_pain", this.animPrefix.c_str() );
////			if ( !this.animator.HasAnim( painAnim ) ) {
////				painAnim = "";
////			}
////		}
////	} else if ( damageGroup.Length() && ( damageGroup != "legs" ) ) {
////		sprintf( painAnim, "pain_%s", damageGroup.c_str() );
////		if ( !this.animator.HasAnim( painAnim ) ) {
////			sprintf( painAnim, "pain_%s", damageGroup.c_str() );
////			if ( !this.animator.HasAnim( painAnim ) ) {
////				painAnim = "";
////			}
////		}
////	}
////
////	if ( !painAnim.Length() ) {
////		painAnim = "pain";
////	}
////
////	if ( g_debugDamage.GetBool() ) {
////		gameLocal.Printf( "Damage: joint: '%s', zone '%s', anim '%s'\n", this.animator.GetJointName( ( jointHandle_t )location ), 
////			damageGroup.c_str(), painAnim.c_str() );
////	}
////
////	return true;
////}
////
/////*
////=====================
////idActor::SpawnGibs
////=====================
////*/
////void idActor::SpawnGibs( const idVec3 &dir, const char *damageDefName ) :void{
////	idAFEntity_Gibbable::SpawnGibs( dir, damageDefName );
////	RemoveAttachments();
////}
////
/*
=====================
idActor::SetupDamageGroups

FIXME: only store group names once and store an index for each joint
=====================
*/
	SetupDamageGroups ( ): void {
		var /*int*/i: number;
		var arg: idKeyValue;
		var groupname = new idStr;
		var jointList = new idList<jointHandle_t>( Number );
		var jointnum: number /*int*/;
		var scale: number /*float*/;

		// create damage zones
		this.damageGroups.SetNum( this.animator.NumJoints ( ) );
		arg = this.spawnArgs.MatchPrefix( "damage_zone ", null );
		while ( arg ) {
			groupname.opEquals( arg.GetKey ( ) );
			groupname.Strip( "damage_zone " );
			this.animator.GetJointList( arg.GetValue ( ).data, jointList );
			for ( i = 0; i < jointList.Num ( ); i++ ) {
				jointnum = jointList[i];
				this.damageGroups[jointnum] = groupname;
			}
			jointList.Clear ( );
			arg = this.spawnArgs.MatchPrefix( "damage_zone ", arg );
		}

		// initilize the damage zones to normal damage
		this.damageScale.SetNum( this.animator.NumJoints ( ) );
		for ( i = 0; i < this.damageScale.Num ( ); i++ ) {
			this.damageScale[i] = 1.0;
		}

		// set the percentage on damage zones
		arg = this.spawnArgs.MatchPrefix( "damage_scale ", null );
		while ( arg ) {
			scale = atof( arg.GetValue ( ) );
			groupname.opEquals( arg.GetKey ( ) );
			groupname.Strip( "damage_scale " );
			for ( i = 0; i < this.damageScale.Num ( ); i++ ) {
				if ( this.damageGroups[i].equalTo( groupname ) )
					this.damageScale[i] = scale;
			}
			arg = this.spawnArgs.MatchPrefix( "damage_scale ", arg );
		}
	}
////
/////*
////=====================
////idActor::GetDamageForLocation
////=====================
////*/
////int idActor::GetDamageForLocation( int damage, int location ) {
////	if ( ( location < 0 ) || ( location >= this.damageScale.Num() ) ) {
////		return damage;
////	}
////
////	return (int)ceil( damage * this.damageScale[ location ] );
////}
////
/////*
////=====================
////idActor::GetDamageGroup
////=====================
////*/
////const char *idActor::GetDamageGroup( int location ) {
////	if ( ( location < 0 ) || ( location >= this.damageGroups.Num() ) ) {
////		return "";
////	}
////
////	return this.damageGroups[ location ];
////}
////
////
/////***********************************************************************
////
////	Events
////
////***********************************************************************/
////
/////*
////=====================
////idActor::Event_EnableEyeFocus
////=====================
////*/
////void idActor::PlayFootStepSound( ) :void{
////	const char *sound = NULL;
////	const idMaterial *material;
////
////	if ( !this.GetPhysics().HasGroundContacts() ) {
////		return;
////	}
////
////	// start footstep sound based on material type
////	material = this.GetPhysics().GetContact( 0 ).material;
////	if ( material != NULL ) {
////		sound = this.spawnArgs.GetString( va( "snd_footstep_%s", gameLocal.sufaceTypeNames[ material.GetSurfaceType() ] ) );
////	}
////	if ( *sound == '\0' ) {
////		sound = this.spawnArgs.GetString( "snd_footstep" );
////	}
////	if ( *sound != '\0' ) {
////		StartSoundShader( declManager.FindSound( sound ), SND_CHANNEL_BODY, 0, false, NULL );
////	}
////}
////
/////*
////=====================
////idActor::Event_EnableEyeFocus
////=====================
////*/
////void idActor::Event_EnableEyeFocus( ):void {
////	allowEyeFocus = true;
////	blink_time = gameLocal.time + blink_min + gameLocal.random.RandomFloat() * ( blink_max - blink_min );
////}
////
/////*
////=====================
////idActor::Event_DisableEyeFocus
////=====================
////*/
////void idActor::Event_DisableEyeFocus( ):void {
////	allowEyeFocus = false;
////	
////	idEntity *headEnt = this.head.GetEntity();
////	if ( headEnt ) {
////		headEnt.GetAnimator().Clear( ANIMCHANNEL_EYELIDS, gameLocal.time, FRAME2MS( 2 ) );
////	} else {
////		this.animator.Clear( ANIMCHANNEL_EYELIDS, gameLocal.time, FRAME2MS( 2 ) );
////	}
////}
////
/////*
////===============
////idActor::Event_Footstep
////===============
////*/
////void idActor::Event_Footstep( ) :void{
////	PlayFootStepSound();
////}
////
/////*
////=====================
////idActor::Event_EnableWalkIK
////=====================
////*/
////void idActor::Event_EnableWalkIK( ):void {
////	this.walkIK.EnableAll();
////}
////
/////*
////=====================
////idActor::Event_DisableWalkIK
////=====================
////*/
////void idActor::Event_DisableWalkIK( ) :void{
////	this.walkIK.DisableAll();
////}
////
/////*
////=====================
////idActor::Event_EnableLegIK
////=====================
////*/
////void idActor::Event_EnableLegIK( int num ) :void{
////	this.walkIK.EnableLeg( num );
////}
////
/////*
////=====================
////idActor::Event_DisableLegIK
////=====================
////*/
////void idActor::Event_DisableLegIK( int num ):void {
////	this.walkIK.DisableLeg( num );
////}
////
/////*
////=====================
////idActor::Event_PreventPain
////=====================
////*/
////void idActor::Event_PreventPain( float duration ):void {
////	painTime = gameLocal.time + SEC2MS( duration );
////}
////
/////*
////===============
////idActor::Event_DisablePain
////===============
////*/
////void idActor::Event_DisablePain( ) :void{
////	allowPain = false;
////}
////
/////*
////===============
////idActor::Event_EnablePain
////===============
////*/
////void idActor::Event_EnablePain( ) :void{
////	allowPain = true;
////}
////
/////*
////=====================
////idActor::Event_GetPainAnim
////=====================
////*/
////void idActor::Event_GetPainAnim( ) :void{
////	if ( !painAnim.Length() ) {
////		idThread::ReturnString( "pain" );
////	} else {
////		idThread::ReturnString( painAnim );
////	}
////}
////
/////*
////=====================
////idActor::Event_SetAnimPrefix
////=====================
////*/
////void idActor::Event_SetAnimPrefix( const char *prefix ):void {
////	this.animPrefix.opEquals(prefix);
////}
////
/////*
////===============
////idActor::Event_StopAnim
////===============
////*/
////void idActor::Event_StopAnim( int channel, int frames ):void {
////	switch( channel ) {
////	case ANIMCHANNEL_HEAD :
////		this.headAnim.StopAnim( frames );
////		break;
////
////	case ANIMCHANNEL_TORSO :
////		this.torsoAnim.StopAnim( frames );
////		break;
////
////	case ANIMCHANNEL_LEGS :
////		this.legsAnim.StopAnim( frames );
////		break;
////
////	default:
////		gameLocal.Error( "Unknown anim group" );
////		break;
////	}
////}
////
/////*
////===============
////idActor::Event_PlayAnim
////===============
////*/
////void idActor::Event_PlayAnim( int channel, const char *animname ):void {
////	animFlags_t	flags;
////	idEntity *headEnt;
////	int	anim;
////	
////	anim = GetAnim( channel, animname );
////	if ( !anim ) {
////		if ( ( channel == ANIMCHANNEL_HEAD ) && this.head.GetEntity() ) {
////			gameLocal.DPrintf( "missing '%s' animation on '%s' (%s)\n", animname, this.name.c_str(), this.spawnArgs.GetString( "def_head", "" ) );
////		} else {
////			gameLocal.DPrintf( "missing '%s' animation on '%s' (%s)\n", animname, this.name.c_str(), GetEntityDefName() );
////		}
////		idThread::ReturnInt( 0 );
////		return;
////	}
////
////	switch( channel ) {
////	case ANIMCHANNEL_HEAD :
////		headEnt = this.head.GetEntity();
////		if ( headEnt ) {
////			this.headAnim.idleAnim = false;
////			this.headAnim.PlayAnim( anim );
////			flags = this.headAnim.GetAnimFlags();
////			if ( !flags.prevent_idle_override ) {
////				if ( this.torsoAnim.IsIdle() ) {
////					this.torsoAnim.animBlendFrames = this.headAnim.lastAnimBlendFrames;
////					SyncAnimChannels( ANIMCHANNEL_TORSO, ANIMCHANNEL_HEAD, this.headAnim.lastAnimBlendFrames );
////					if ( this.legsAnim.IsIdle() ) {
////						this.legsAnim.animBlendFrames = this.headAnim.lastAnimBlendFrames;
////						SyncAnimChannels( ANIMCHANNEL_LEGS, ANIMCHANNEL_HEAD, this.headAnim.lastAnimBlendFrames );
////					}
////				}
////			}
////		}
////		break;
////
////	case ANIMCHANNEL_TORSO :
////		this.torsoAnim.idleAnim = false;
////		this.torsoAnim.PlayAnim( anim );
////		flags = this.torsoAnim.GetAnimFlags();
////		if ( !flags.prevent_idle_override ) {
////			if ( this.headAnim.IsIdle() ) {
////				this.headAnim.animBlendFrames = this.torsoAnim.lastAnimBlendFrames;
////				SyncAnimChannels( ANIMCHANNEL_HEAD, ANIMCHANNEL_TORSO, this.torsoAnim.lastAnimBlendFrames );
////			}
////			if ( this.legsAnim.IsIdle() ) {
////				this.legsAnim.animBlendFrames = this.torsoAnim.lastAnimBlendFrames;
////				SyncAnimChannels( ANIMCHANNEL_LEGS, ANIMCHANNEL_TORSO, this.torsoAnim.lastAnimBlendFrames );
////			}
////		}
////		break;
////
////	case ANIMCHANNEL_LEGS :
////		this.legsAnim.idleAnim = false;
////		this.legsAnim.PlayAnim( anim );
////		flags = this.legsAnim.GetAnimFlags();
////		if ( !flags.prevent_idle_override ) {
////			if ( this.torsoAnim.IsIdle() ) {
////				this.torsoAnim.animBlendFrames = this.legsAnim.lastAnimBlendFrames;
////				SyncAnimChannels( ANIMCHANNEL_TORSO, ANIMCHANNEL_LEGS, this.legsAnim.lastAnimBlendFrames );
////				if ( this.headAnim.IsIdle() ) {
////					this.headAnim.animBlendFrames = this.legsAnim.lastAnimBlendFrames;
////					SyncAnimChannels( ANIMCHANNEL_HEAD, ANIMCHANNEL_LEGS, this.legsAnim.lastAnimBlendFrames );
////				}
////			}
////		}
////		break;
////
////	default :
////		gameLocal.Error( "Unknown anim group" );
////		break;
////	}
////	idThread::ReturnInt( 1 );
////}
////
/////*
////===============
////idActor::Event_PlayCycle
////===============
////*/
////void idActor::Event_PlayCycle( int channel, const char *animname ) :void{
////	animFlags_t	flags;
////	int			anim;
////	
////	anim = GetAnim( channel, animname );
////	if ( !anim ) {
////		if ( ( channel == ANIMCHANNEL_HEAD ) && this.head.GetEntity() ) {
////			gameLocal.DPrintf( "missing '%s' animation on '%s' (%s)\n", animname, this.name.c_str(), this.spawnArgs.GetString( "def_head", "" ) );
////		} else {
////			gameLocal.DPrintf( "missing '%s' animation on '%s' (%s)\n", animname, this.name.c_str(), GetEntityDefName() );
////		}
////		idThread::ReturnInt( false );
////		return;
////	}
////
////	switch( channel ) {
////	case ANIMCHANNEL_HEAD :
////		this.headAnim.idleAnim = false;
////		this.headAnim.CycleAnim( anim );
////		flags = this.headAnim.GetAnimFlags();
////		if ( !flags.prevent_idle_override ) {
////			if ( this.torsoAnim.IsIdle() && this.legsAnim.IsIdle() ) {
////				this.torsoAnim.animBlendFrames = this.headAnim.lastAnimBlendFrames;
////				SyncAnimChannels( ANIMCHANNEL_TORSO, ANIMCHANNEL_HEAD, this.headAnim.lastAnimBlendFrames );
////				this.legsAnim.animBlendFrames = this.headAnim.lastAnimBlendFrames;
////				SyncAnimChannels( ANIMCHANNEL_LEGS, ANIMCHANNEL_HEAD, this.headAnim.lastAnimBlendFrames );
////			}
////		}
////		break;
////
////	case ANIMCHANNEL_TORSO :
////		this.torsoAnim.idleAnim = false;
////		this.torsoAnim.CycleAnim( anim );
////		flags = this.torsoAnim.GetAnimFlags();
////		if ( !flags.prevent_idle_override ) {
////			if ( this.headAnim.IsIdle() ) {
////				this.headAnim.animBlendFrames = this.torsoAnim.lastAnimBlendFrames;
////				SyncAnimChannels( ANIMCHANNEL_HEAD, ANIMCHANNEL_TORSO, this.torsoAnim.lastAnimBlendFrames );
////			}
////			if ( this.legsAnim.IsIdle() ) {
////				this.legsAnim.animBlendFrames = this.torsoAnim.lastAnimBlendFrames;
////				SyncAnimChannels( ANIMCHANNEL_LEGS, ANIMCHANNEL_TORSO, this.torsoAnim.lastAnimBlendFrames );
////			}
////		}
////		break;
////
////	case ANIMCHANNEL_LEGS :
////		this.legsAnim.idleAnim = false;
////		this.legsAnim.CycleAnim( anim );
////		flags = this.legsAnim.GetAnimFlags();
////		if ( !flags.prevent_idle_override ) {
////			if ( this.torsoAnim.IsIdle() ) {
////				this.torsoAnim.animBlendFrames = this.legsAnim.lastAnimBlendFrames;
////				SyncAnimChannels( ANIMCHANNEL_TORSO, ANIMCHANNEL_LEGS, this.legsAnim.lastAnimBlendFrames );
////				if ( this.headAnim.IsIdle() ) {
////					this.headAnim.animBlendFrames = this.legsAnim.lastAnimBlendFrames;
////					SyncAnimChannels( ANIMCHANNEL_HEAD, ANIMCHANNEL_LEGS, this.legsAnim.lastAnimBlendFrames );
////				}
////			}
////		}
////		break;
////
////	default:
////		gameLocal.Error( "Unknown anim group" );
////	}
////
////	idThread::ReturnInt( true );
////}
////
/////*
////===============
////idActor::Event_IdleAnim
////===============
////*/
////void idActor::Event_IdleAnim( int channel, const char *animname ) :void{
////	int anim;
////	
////	anim = GetAnim( channel, animname );	
////	if ( !anim ) {
////		if ( ( channel == ANIMCHANNEL_HEAD ) && this.head.GetEntity() ) {
////			gameLocal.DPrintf( "missing '%s' animation on '%s' (%s)\n", animname, this.name.c_str(), this.spawnArgs.GetString( "def_head", "" ) );
////		} else {
////			gameLocal.DPrintf( "missing '%s' animation on '%s' (%s)\n", animname, this.name.c_str(), GetEntityDefName() );
////		}
////
////		switch( channel ) {
////		case ANIMCHANNEL_HEAD :
////			this.headAnim.BecomeIdle();
////			break;
////
////		case ANIMCHANNEL_TORSO :
////			this.torsoAnim.BecomeIdle();
////			break;
////
////		case ANIMCHANNEL_LEGS :
////			this.legsAnim.BecomeIdle();
////			break;
////
////		default:
////			gameLocal.Error( "Unknown anim group" );
////		}
////
////		idThread::ReturnInt( false );
////		return;
////	}
////
////	switch( channel ) {
////	case ANIMCHANNEL_HEAD :
////		this.headAnim.BecomeIdle();
////		if ( this.torsoAnim.GetAnimFlags().prevent_idle_override ) {
////			// don't sync to torso body if it doesn't override idle anims
////			this.headAnim.CycleAnim( anim );
////		} else if ( this.torsoAnim.IsIdle() && this.legsAnim.IsIdle() ) {
////			// everything is idle, so play the anim on the head and copy it to the torso and legs
////			this.headAnim.CycleAnim( anim );
////			this.torsoAnim.animBlendFrames = this.headAnim.lastAnimBlendFrames;
////			SyncAnimChannels( ANIMCHANNEL_TORSO, ANIMCHANNEL_HEAD, this.headAnim.lastAnimBlendFrames );
////			this.legsAnim.animBlendFrames = this.headAnim.lastAnimBlendFrames;
////			SyncAnimChannels( ANIMCHANNEL_LEGS, ANIMCHANNEL_HEAD, this.headAnim.lastAnimBlendFrames );
////		} else if ( this.torsoAnim.IsIdle() ) {
////			// sync the head and torso to the legs
////			SyncAnimChannels( ANIMCHANNEL_HEAD, ANIMCHANNEL_LEGS, this.headAnim.animBlendFrames );
////			this.torsoAnim.animBlendFrames = this.headAnim.lastAnimBlendFrames;
////			SyncAnimChannels( ANIMCHANNEL_TORSO, ANIMCHANNEL_LEGS, this.torsoAnim.animBlendFrames );
////		} else {
////			// sync the head to the torso
////			SyncAnimChannels( ANIMCHANNEL_HEAD, ANIMCHANNEL_TORSO, this.headAnim.animBlendFrames );
////		}
////		break;
////
////	case ANIMCHANNEL_TORSO :
////		this.torsoAnim.BecomeIdle();
////		if ( this.legsAnim.GetAnimFlags().prevent_idle_override ) {
////			// don't sync to legs if legs anim doesn't override idle anims
////			this.torsoAnim.CycleAnim( anim );
////		} else if ( this.legsAnim.IsIdle() ) {
////			// play the anim in both legs and torso
////			this.torsoAnim.CycleAnim( anim );
////			this.legsAnim.animBlendFrames = this.torsoAnim.lastAnimBlendFrames;
////			SyncAnimChannels( ANIMCHANNEL_LEGS, ANIMCHANNEL_TORSO, this.torsoAnim.lastAnimBlendFrames );
////		} else {
////			// sync the anim to the legs
////			SyncAnimChannels( ANIMCHANNEL_TORSO, ANIMCHANNEL_LEGS, this.torsoAnim.animBlendFrames );
////		}
////
////		if ( this.headAnim.IsIdle() ) {
////			SyncAnimChannels( ANIMCHANNEL_HEAD, ANIMCHANNEL_TORSO, this.torsoAnim.lastAnimBlendFrames );
////		}
////		break;
////
////	case ANIMCHANNEL_LEGS :
////		this.legsAnim.BecomeIdle();
////		if ( this.torsoAnim.GetAnimFlags().prevent_idle_override ) {
////			// don't sync to torso if torso anim doesn't override idle anims
////			this.legsAnim.CycleAnim( anim );
////		} else if ( this.torsoAnim.IsIdle() ) {
////			// play the anim in both legs and torso
////			this.legsAnim.CycleAnim( anim );
////			this.torsoAnim.animBlendFrames = this.legsAnim.lastAnimBlendFrames;
////			SyncAnimChannels( ANIMCHANNEL_TORSO, ANIMCHANNEL_LEGS, this.legsAnim.lastAnimBlendFrames );
////			if ( this.headAnim.IsIdle() ) {
////				SyncAnimChannels( ANIMCHANNEL_HEAD, ANIMCHANNEL_LEGS, this.legsAnim.lastAnimBlendFrames );
////			}
////		} else {
////			// sync the anim to the torso
////			SyncAnimChannels( ANIMCHANNEL_LEGS, ANIMCHANNEL_TORSO, this.legsAnim.animBlendFrames );
////		}
////		break;
////
////	default:
////		gameLocal.Error( "Unknown anim group" );
////	}
////
////	idThread::ReturnInt( true );
////}
////
/////*
////================
////idActor::Event_SetSyncedAnimWeight
////================
////*/
////void idActor::Event_SetSyncedAnimWeight( int channel, int anim, float weight ) :void{
////	idEntity *headEnt;
////
////	headEnt = this.head.GetEntity();
////	switch( channel ) {
////	case ANIMCHANNEL_HEAD :
////		if ( headEnt ) {
////			this.animator.CurrentAnim( ANIMCHANNEL_ALL ).SetSyncedAnimWeight( anim, weight );
////		} else {
////			this.animator.CurrentAnim( ANIMCHANNEL_HEAD ).SetSyncedAnimWeight( anim, weight );
////		}
////		if ( this.torsoAnim.IsIdle() ) {
////			this.animator.CurrentAnim( ANIMCHANNEL_TORSO ).SetSyncedAnimWeight( anim, weight );
////			if ( this.legsAnim.IsIdle() ) {
////				this.animator.CurrentAnim( ANIMCHANNEL_LEGS ).SetSyncedAnimWeight( anim, weight );
////			}
////		}
////		break;
////
////	case ANIMCHANNEL_TORSO :
////		this.animator.CurrentAnim( ANIMCHANNEL_TORSO ).SetSyncedAnimWeight( anim, weight );
////		if ( this.legsAnim.IsIdle() ) {
////			this.animator.CurrentAnim( ANIMCHANNEL_LEGS ).SetSyncedAnimWeight( anim, weight );
////		}
////		if ( headEnt && this.headAnim.IsIdle() ) {
////			this.animator.CurrentAnim( ANIMCHANNEL_ALL ).SetSyncedAnimWeight( anim, weight );
////		}
////		break;
////
////	case ANIMCHANNEL_LEGS :
////		this.animator.CurrentAnim( ANIMCHANNEL_LEGS ).SetSyncedAnimWeight( anim, weight );
////		if ( this.torsoAnim.IsIdle() ) {
////			this.animator.CurrentAnim( ANIMCHANNEL_TORSO ).SetSyncedAnimWeight( anim, weight );
////			if ( headEnt && this.headAnim.IsIdle() ) {
////				this.animator.CurrentAnim( ANIMCHANNEL_ALL ).SetSyncedAnimWeight( anim, weight );
////			}
////		}
////		break;
////
////	default:
////		gameLocal.Error( "Unknown anim group" );
////	}
////}
////
/////*
////===============
////idActor::Event_OverrideAnim
////===============
////*/
////void idActor::Event_OverrideAnim( int channel ):void {
////	switch( channel ) {
////	case ANIMCHANNEL_HEAD :
////		this.headAnim.Disable();
////		if ( !this.torsoAnim.IsIdle() ) {
////			SyncAnimChannels( ANIMCHANNEL_HEAD, ANIMCHANNEL_TORSO, this.torsoAnim.lastAnimBlendFrames );
////		} else {
////			SyncAnimChannels( ANIMCHANNEL_HEAD, ANIMCHANNEL_LEGS, this.legsAnim.lastAnimBlendFrames );
////		}
////		break;
////
////	case ANIMCHANNEL_TORSO :
////		this.torsoAnim.Disable();
////		SyncAnimChannels( ANIMCHANNEL_TORSO, ANIMCHANNEL_LEGS, this.legsAnim.lastAnimBlendFrames );
////		if ( this.headAnim.IsIdle() ) {
////			SyncAnimChannels( ANIMCHANNEL_HEAD, ANIMCHANNEL_TORSO, this.torsoAnim.lastAnimBlendFrames );
////		}
////		break;
////
////	case ANIMCHANNEL_LEGS :
////		this.legsAnim.Disable();
////		SyncAnimChannels( ANIMCHANNEL_LEGS, ANIMCHANNEL_TORSO, this.torsoAnim.lastAnimBlendFrames );
////		break;
////
////	default:
////		gameLocal.Error( "Unknown anim group" );
////		break;
////	}
////}
////
/////*
////===============
////idActor::Event_EnableAnim
////===============
////*/
////void idActor::Event_EnableAnim( int channel, int blendFrames ) :void{
////	switch( channel ) {
////	case ANIMCHANNEL_HEAD :
////		this.headAnim.Enable( blendFrames );
////		break;
////
////	case ANIMCHANNEL_TORSO :
////		this.torsoAnim.Enable( blendFrames );
////		break;
////
////	case ANIMCHANNEL_LEGS :
////		this.legsAnim.Enable( blendFrames );
////		break;
////
////	default:
////		gameLocal.Error( "Unknown anim group" );
////		break;
////	}
////}
////
/////*
////===============
////idActor::Event_SetBlendFrames
////===============
////*/
////void idActor::Event_SetBlendFrames( int channel, int blendFrames ) {
////	switch( channel ) {
////	case ANIMCHANNEL_HEAD :
////		this.headAnim.animBlendFrames = blendFrames;
////		this.headAnim.lastAnimBlendFrames = blendFrames;
////		break;
////
////	case ANIMCHANNEL_TORSO :
////		this.torsoAnim.animBlendFrames = blendFrames;
////		this.torsoAnim.lastAnimBlendFrames = blendFrames;
////		break;
////
////	case ANIMCHANNEL_LEGS :
////		this.legsAnim.animBlendFrames = blendFrames;
////		this.legsAnim.lastAnimBlendFrames = blendFrames;
////		break;
////
////	default:
////		gameLocal.Error( "Unknown anim group" );
////		break;
////	}
////}
////
/////*
////===============
////idActor::Event_GetBlendFrames
////===============
////*/
////void idActor::Event_GetBlendFrames( int channel ) :void{
////	switch( channel ) {
////	case ANIMCHANNEL_HEAD :
////		idThread::ReturnInt( this.headAnim.animBlendFrames );
////		break;
////
////	case ANIMCHANNEL_TORSO :
////		idThread::ReturnInt( this.torsoAnim.animBlendFrames );
////		break;
////
////	case ANIMCHANNEL_LEGS :
////		idThread::ReturnInt( this.legsAnim.animBlendFrames );
////		break;
////
////	default:
////		gameLocal.Error( "Unknown anim group" );
////		break;
////	}
////}
////
/////*
////===============
////idActor::Event_AnimState
////===============
////*/
////void idActor::Event_AnimState( int channel, const char *statename, int blendFrames ):void {
////	SetAnimState( channel, statename, blendFrames );
////}
////
/////*
////===============
////idActor::Event_GetAnimState
////===============
////*/
////void idActor::Event_GetAnimState( int channel ):void {
////	const char *state;
////
////	state = GetAnimState( channel );
////	idThread::ReturnString( state );
////}
////
/////*
////===============
////idActor::Event_InAnimState
////===============
////*/
////void idActor::Event_InAnimState( int channel, const char *statename ) :void{
////	bool instate;
////
////	instate = InAnimState( channel, statename );
////	idThread::ReturnInt( instate );
////}
////
/////*
////===============
////idActor::Event_FinishAction
////===============
////*/
////void idActor::Event_FinishAction( const char *actionname ):void {
////	if ( this.waitState == actionname ) {
////		SetWaitState( "" );
////	}
////}
////
/////*
////===============
////idActor::Event_AnimDone
////===============
////*/
////void idActor::Event_AnimDone( int channel, int blendFrames ):void {
////	bool result;
////
////	switch( channel ) {
////	case ANIMCHANNEL_HEAD :
////		result = this.headAnim.AnimDone( blendFrames );
////		idThread::ReturnInt( result );
////		break;
////
////	case ANIMCHANNEL_TORSO :
////		result = this.torsoAnim.AnimDone( blendFrames );
////		idThread::ReturnInt( result );
////		break;
////
////	case ANIMCHANNEL_LEGS :
////		result = this.legsAnim.AnimDone( blendFrames );
////		idThread::ReturnInt( result );
////		break;
////
////	default:
////		gameLocal.Error( "Unknown anim group" );
////	}
////}
////
/////*
////================
////idActor::Event_HasAnim
////================
////*/
////void idActor::Event_HasAnim( int channel, const char *animname ) {
////	if ( GetAnim( channel, animname ) != NULL ) {
////		idThread::ReturnFloat( 1.0f );
////	} else {
////		idThread::ReturnFloat( 0.0f );
////	}
////}
////
/////*
////================
////idActor::Event_CheckAnim
////================
////*/
////void idActor::Event_CheckAnim( int channel, const char *animname ) :void{
////	if ( !GetAnim( channel, animname ) ) {
////		if ( this.animPrefix.Length() ) {
////			gameLocal.Error( "Can't find anim '%s_%s' for '%s'", this.animPrefix.c_str(), animname, this.name.c_str() );
////		} else {
////			gameLocal.Error( "Can't find anim '%s' for '%s'", animname, this.name.c_str() );
////		}
////	}
////}
////
/////*
////================
////idActor::Event_ChooseAnim
////================
////*/
////void idActor::Event_ChooseAnim( int channel, const char *animname ):void {
////	int anim;
////
////	anim = GetAnim( channel, animname );
////	if ( anim ) {
////		if ( channel == ANIMCHANNEL_HEAD ) {
////			if ( this.head.GetEntity() ) {
////				idThread::ReturnString( this.head.GetEntity().GetAnimator().AnimFullName( anim ) );
////				return;
////			}
////		} else {
////			idThread::ReturnString( this.animator.AnimFullName( anim ) );
////			return;
////		}
////	}
////
////	idThread::ReturnString( "" );
////}
////
/////*
////================
////idActor::Event_AnimLength
////================
////*/
////void idActor::Event_AnimLength( int channel, const char *animname ) :void{
////	int anim;
////
////	anim = GetAnim( channel, animname );
////	if ( anim ) {
////		if ( channel == ANIMCHANNEL_HEAD ) {
////			if ( this.head.GetEntity() ) {
////				idThread::ReturnFloat( MS2SEC( this.head.GetEntity().GetAnimator().AnimLength( anim ) ) );
////				return;
////			}
////		} else {
////			idThread::ReturnFloat( MS2SEC( this.animator.AnimLength( anim ) ) );
////			return;
////		}		
////	}
////	
////	idThread::ReturnFloat( 0.0f );
////}
////
/////*
////================
////idActor::Event_AnimDistance
////================
////*/
////void idActor::Event_AnimDistance( int channel, const char *animname ):void {
////	int anim;
////
////	anim = GetAnim( channel, animname );
////	if ( anim ) {
////		if ( channel == ANIMCHANNEL_HEAD ) {
////			if ( this.head.GetEntity() ) {
////				idThread::ReturnFloat( this.head.GetEntity().GetAnimator().TotalMovementDelta( anim ).Length() );
////				return;
////			}
////		} else {
////			idThread::ReturnFloat( this.animator.TotalMovementDelta( anim ).Length() );
////			return;
////		}
////	}
////	
////	idThread::ReturnFloat( 0.0f );
////}
////
/////*
////================
////idActor::Event_HasEnemies
////================
////*/
////void idActor::Event_HasEnemies( ) :void{
////	bool hasEnemy;
////
////	hasEnemy = HasEnemies();
////	idThread::ReturnInt( hasEnemy );
////}
////
/////*
////================
////idActor::Event_NextEnemy
////================
////*/
////void idActor::Event_NextEnemy( ent:idEntity ):void {
////	idActor *actor;
////
////	if ( !ent || ( ent == this ) ) {
////		actor = enemyList.Next();
////	} else {
////		if ( !ent.IsType( idActor::Type ) ) {
////			gameLocal.Error( "'%s' cannot be an enemy", ent.name.c_str() );
////		}
////
////		actor = static_cast<idActor *>( ent );
////		if ( actor.enemyNode.ListHead() != &enemyList ) {
////			gameLocal.Error( "'%s' is not in '%s' enemy list", actor.name.c_str(), this.name.c_str() );
////		}
////	}
////
////	for( ; actor != NULL; actor = actor.enemyNode.Next() ) {
////		if ( !actor.fl.hidden ) {
////			idThread::ReturnEntity( actor );
////			return;
////		}
////	}
////
////    idThread::ReturnEntity( NULL );
////}
////
/////*
////================
////idActor::Event_ClosestEnemyToPoint
////================
////*/
////void idActor::Event_ClosestEnemyToPoint( pos:idVec3 ) :void{
////	idActor *bestEnt = ClosestEnemyToPoint( pos );
////	idThread::ReturnEntity( bestEnt );
////}
////
/////*
////================
////idActor::Event_StopSound
////================
////*/
////void idActor::Event_StopSound( int channel, int netSync ) :void{
////	if ( channel == SND_CHANNEL_VOICE ) {
////		idEntity *headEnt = this.head.GetEntity();
////		if ( headEnt ) {
////			headEnt.StopSound( channel, ( netSync != 0 ) );
////		}
////	}
////	StopSound( channel, ( netSync != 0 ) );
////}
////
/////*
////=====================
////idActor::Event_SetNextState
////=====================
////*/
////void idActor::Event_SetNextState( name:string ):void {
////	this.idealState = GetScriptFunction( name );
////	if ( this.idealState == this.state ) {
////		this.state = NULL;
////	}
////}
////
/////*
////=====================
////idActor::Event_SetState
////=====================
////*/
////void idActor::Event_SetState( name:string ):void {
////	this.idealState = GetScriptFunction( name );
////	if ( this.idealState == this.state ) {
////		this.state = NULL;
////	}
////	this.scriptThread.DoneProcessing();
////}
////
/////*
////=====================
////idActor::Event_GetState
////=====================
////*/
////void idActor::Event_GetState( ) :void{
////	if ( this.state ) {
////		idThread::ReturnString( this.state.Name() );
////	} else {
////		idThread::ReturnString( "" );
////	}
////}
////
/////*
////=====================
////idActor::Event_GetHead
////=====================
////*/
////void idActor::Event_GetHead( ) :void{
////	idThread::ReturnEntity( this.head.GetEntity() );
////}

}

////#endif /* !__GAME_ACTOR_H__ */
