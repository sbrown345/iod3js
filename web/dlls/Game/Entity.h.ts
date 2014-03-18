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
////#ifndef __GAME_ENTITY_H__
////#define __GAME_ENTITY_H__
////
/////*
////===============================================================================
////
////	Game entity base class.
////
////===============================================================================
////*/
////
////static const int DELAY_DORMANT_TIME = 3000;
////
////extern const idEventDef EV_PostSpawn;
////extern const idEventDef EV_FindTargets;
////extern const idEventDef EV_Touch;
////extern const idEventDef EV_Use;
////extern const idEventDef EV_Activate;
////extern const idEventDef EV_ActivateTargets;
////extern const idEventDef EV_Hide;
////extern const idEventDef EV_Show;
////extern const idEventDef EV_GetShaderParm;
////extern const idEventDef EV_SetShaderParm;
////extern const idEventDef EV_SetOwner;
////extern const idEventDef EV_GetAngles;
////extern const idEventDef EV_SetAngles;
////extern const idEventDef EV_SetLinearVelocity;
////extern const idEventDef EV_SetAngularVelocity;
////extern const idEventDef EV_SetSkin;
////extern const idEventDef EV_StartSoundShader;
////extern const idEventDef EV_StopSound;
////extern const idEventDef EV_CacheSoundShader;
////
////// Think flags
////enum {
////	TH_ALL					= -1,
////	TH_THINK				= 1,		// run think function each frame
////	TH_PHYSICS				= 2,		// run physics each frame
////	TH_ANIMATE				= 4,		// update animation each frame
////	TH_UPDATEVISUALS		= 8,		// update renderEntity
////	TH_UPDATEPARTICLES		= 16
////};
////
//////
////// Signals
////// make sure to change script/doom_defs.script if you add any, or change their order
//////
////typedef enum {
////	SIG_TOUCH,				// object was touched
////	SIG_USE,				// object was used
////	SIG_TRIGGER,			// object was activated
////	SIG_REMOVED,			// object was removed from the game
////	SIG_DAMAGE,				// object was damaged
////	SIG_BLOCKED,			// object was blocked
////
////	SIG_MOVER_POS1,			// mover at position 1 (door closed)
////	SIG_MOVER_POS2,			// mover at position 2 (door open)
////	SIG_MOVER_1TO2,			// mover changing from position 1 to 2
////	SIG_MOVER_2TO1,			// mover changing from position 2 to 1
////
////	NUM_SIGNALS
////} signalNum_t;
////
////// FIXME: At some point we may want to just limit it to one thread per signal, but
////// for now, I'm allowing multiple threads.  We should reevaluate this later in the project
////#define MAX_SIGNAL_THREADS 16		// probably overkill, but idList uses a granularity of 16
////
////struct signal_t {
////	int					threadnum;
////	const function_t	*function;
////};
////
////class signalList_t {
////public:
////	idList<signal_t> signal[ NUM_SIGNALS ];
////};
////
////
class idEntity extends idClass {
////public:
////	static const int		MAX_PVS_AREAS = 4;
////
	entityNumber: number;		// index into the entity list		//	int						
	entityDefNumber:number;		// index into the entity def list	//	int						
////
////	idLinkList<idEntity>	spawnNode;				// for being linked into spawnedEntities list
////	idLinkList<idEntity>	activeNode;				// for being linked into activeEntities list
////
////	idLinkList<idEntity>	snapshotNode;			// for being linked into snapshotEntities list
////	int						snapshotSequence;		// last snapshot this entity was in
////	int						snapshotBits;			// number of bits this entity occupied in the last snapshot
////
////	idStr					name;					// name of entity
////	idDict					spawnArgs;				// key/value pairs used to spawn and initialize entity
////	idScriptObject			scriptObject;			// contains all script defined data for this entity
////
////	int						thinkFlags;				// TH_? flags
////	int						dormantStart;			// time that the entity was first closed off from player
////	bool					cinematic;				// during cinematics, entity will only think if cinematic is set
////
////	renderView_t *			renderView;				// for camera views from this entity
////	idEntity *				cameraTarget;			// any remoteRenderMap shaders will use this
////
////	idList< idEntityPtr<idEntity> >	targets;		// when this entity is activated these entities entity are activated
////
////	int						health;					// FIXME: do all objects really need health?
////
////	struct entityFlags_s {
////		bool				notarget			:1;	// if true never attack or target this entity
////		bool				noknockback			:1;	// if true no knockback from hits
////		bool				takedamage			:1;	// if true this entity can be damaged
////		bool				hidden				:1;	// if true this entity is not visible
////		bool				bindOrientated		:1;	// if true both the master orientation is used for binding
////		bool				solidForTeam		:1;	// if true this entity is considered solid when a physics team mate pushes entities
////		bool				forcePhysicsUpdate	:1;	// if true always update from the physics whether the object moved or not
////		bool				selected			:1;	// if true the entity is selected for editing
////		bool				neverDormant		:1;	// if true the entity never goes dormant
////		bool				isDormant			:1;	// if true the entity is dormant
////		bool				hasAwakened			:1;	// before a monster has been awakened the first time, use full PVS for dormant instead of area-connected
////		bool				networkSync			:1; // if true the entity is synchronized over the network
////	} fl;
////
////public:
////	ABSTRACT_PROTOTYPE( idEntity );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idEntity>[];
////
////							idEntity();
	destructor ( ): void { throw "placeholder"; }
////
	Spawn ( ): void { throw "placeholder"; }

	Save ( savefile: idSaveGame ): void { throw "placeholder"; }
	Restore ( savefile: idRestoreGame ): void { throw "placeholder"; }
////
////	const char *			GetEntityDefName( ) const;
	SetName ( name: string ): void { throw "placeholder"; }
////	const char *			GetName( ) const;
////	virtual void			UpdateChangeableSpawnArgs( const idDict *source );
////
////							// clients generate views based on all the player specific options,
////							// cameras have custom code, and everything else just uses the axis orientation
////	virtual renderView_t *	GetRenderView();
////
////	// thinking
////	virtual void			Think( );
////	bool					CheckDormant( );	// dormant == on the active list, but out of PVS
////	virtual	void			DormantBegin( );	// called when entity becomes dormant
////	virtual	void			DormantEnd( );		// called when entity wakes from being dormant
////	bool					IsActive( ) const;
////	void					BecomeActive( int flags );
////	void					BecomeInactive( int flags );
////	void					UpdatePVSAreas( pos:idVec3 );
////
////	// visuals
////	virtual void			Present( );
////	virtual renderEntity_t *GetRenderEntity( );
////	virtual int				GetModelDefHandle( );
////	virtual void			SetModel( const char *modelname );
////	void					SetSkin( const idDeclSkin *skin );
////	const idDeclSkin *		GetSkin( ) const;
////	void					SetShaderParm( int parmnum, float value );
////	virtual void			SetColor( float red, float green, float blue );
////	virtual void			SetColor( color:idVec3 );
////	virtual void			GetColor( idVec3 &out ) const;
////	virtual void			SetColor( const idVec4 &color );
////	virtual void			GetColor( idVec4 &out ) const;
////	virtual void			FreeModelDef( );
////	virtual void			FreeLightDef( );
////	virtual void			Hide( );
////	virtual void			Show( );
////	bool					IsHidden( ) const;
////	void					UpdateVisuals( );
////	void					UpdateModel( );
////	void					UpdateModelTransform( );
////	virtual void			ProjectOverlay( const idVec3 &origin, const idVec3 &dir, float size, const char *material );
////	int						GetNumPVSAreas( );
////	const int *				GetPVSAreas( );
////	void					ClearPVSAreas( );
////	bool					PhysicsTeamInPVS( pvsHandle_t pvsHandle );
////
////	// animation
////	virtual bool			UpdateAnimationControllers( );
////	bool					UpdateRenderEntity( renderEntity_s *renderEntity, const renderView_t *renderView );
////	static bool				ModelCallback( renderEntity_s *renderEntity, const renderView_t *renderView );
////	virtual idAnimator *	GetAnimator( );	// returns animator object used by this entity
////
////	// sound
////	virtual bool			CanPlayChatterSounds( ) const;
////	bool					StartSound( const char *soundName, const s_channelType channel, int soundShaderFlags, bool broadcast, int *length );
////	bool					StartSoundShader( const idSoundShader *shader, const s_channelType channel, int soundShaderFlags, bool broadcast, int *length );
////	void					StopSound( const s_channelType channel, bool broadcast );	// pass SND_CHANNEL_ANY to stop all sounds
////	void					SetSoundVolume( float volume );
////	void					UpdateSound( );
////	int						GetListenerId( ) const;
////	idSoundEmitter *		GetSoundEmitter( ) const;
////	void					FreeSoundEmitter( bool immediate );
////
////	// entity binding
////	virtual void			PreBind( );
////	virtual void			PostBind( );
////	virtual void			PreUnbind( );
////	virtual void			PostUnbind( );
////	void					JoinTeam( idEntity *teammember );
////	void					Bind( idEntity *master, bool orientated );
////	void					BindToJoint( idEntity *master, jointname:string, bool orientated );
////	void					BindToJoint( idEntity *master, jointnum:jointHandle_t, bool orientated );
////	void					BindToBody( idEntity *master, int bodyId, bool orientated );
////	void					Unbind( );
////	bool					IsBound( ) const;
////	bool					IsBoundTo( idEntity *master ) const;
////	idEntity *				GetBindMaster( ) const;
////	jointHandle_t			GetBindJoint( ) const;
////	int						GetBindBody( ) const;
////	idEntity *				GetTeamMaster( ) const;
////	idEntity *				GetNextTeamEntity( ) const;
////	void					ConvertLocalToWorldTransform( idVec3 &offset, idMat3 &axis );
////	idVec3					GetLocalVector( const vec:idVec3 ) const;
////	idVec3					GetLocalCoordinates( const vec:idVec3 ) const;
////	idVec3					GetWorldVector( const vec:idVec3 ) const;
////	idVec3					GetWorldCoordinates( const vec:idVec3 ) const;
////	bool					GetMasterPosition( idVec3 &masterOrigin, idMat3 &masterAxis ) const;
////	void					GetWorldVelocities( idVec3 &linearVelocity, idVec3 &angularVelocity ) const;
////
////	// physics
////							// set a new physics object to be used by this entity
////	void					SetPhysics( idPhysics *phys );
////							// get the physics object used by this entity
////	idPhysics *				GetPhysics( ) const;
////							// restore physics pointer for save games
////	void					RestorePhysics( idPhysics *phys );
////							// run the physics for this entity
////	bool					RunPhysics( );
////							// set the origin of the physics object (relative to bindMaster if not NULL)
////	void					SetOrigin( const idVec3 &org );
////							// set the axis of the physics object (relative to bindMaster if not NULL)
////	void					SetAxis( const idMat3 &axis );
////							// use angles to set the axis of the physics object (relative to bindMaster if not NULL)
////	void					SetAngles( const ang:idAngles );
////							// get the floor position underneath the physics object
////	bool					GetFloorPos( float max_dist, idVec3 &floorpos ) const;
////							// retrieves the transformation going from the physics origin/axis to the visual origin/axis
////	virtual bool			GetPhysicsToVisualTransform( idVec3 &origin, idMat3 &axis );
////							// retrieves the transformation going from the physics origin/axis to the sound origin/axis
////	virtual bool			GetPhysicsToSoundTransform( idVec3 &origin, idMat3 &axis );
////							// called from the physics object when colliding, should return true if the physics simulation should stop
////	virtual bool			Collide( const trace_t &collision, const idVec3 &velocity );
////							// retrieves impact information, 'ent' is the entity retrieving the info
////	virtual void			GetImpactInfo( ent:idEntity, int id, const idVec3 &point, impactInfo_t *info );
////							// apply an impulse to the physics object, 'ent' is the entity applying the impulse
////	virtual void			ApplyImpulse( ent:idEntity, int id, const idVec3 &point, const idVec3 &impulse );
////							// add a force to the physics object, 'ent' is the entity adding the force
////	virtual void			AddForce( ent:idEntity, int id, const idVec3 &point, const idVec3 &force );
////							// activate the physics object, 'ent' is the entity activating this entity
////	virtual void			ActivatePhysics( ent:idEntity );
////							// returns true if the physics object is at rest
////	virtual bool			IsAtRest( ) const;
////							// returns the time the physics object came to rest
////	virtual int				GetRestStartTime( ) const;
////							// add a contact entity
////	virtual void			AddContactEntity( ent:idEntity );
////							// remove a touching entity
////	virtual void			RemoveContactEntity( ent:idEntity );
////
////	// damage
////							// returns true if this entity can be damaged from the given origin
////	virtual bool			CanDamage( const idVec3 &origin, idVec3 &damagePoint ) const;
////							// applies damage to this entity
////	virtual	void			Damage( idEntity *inflictor, idEntity *attacker, const idVec3 &dir, const char *damageDefName, const float damageScale, const int location );
////							// adds a damage effect like overlays, blood, sparks, debris etc.
////	virtual void			AddDamageEffect( const trace_t &collision, const idVec3 &velocity, const char *damageDefName );
////							// callback function for when another entity received damage from this entity.  damage can be adjusted and returned to the caller.
////	virtual void			DamageFeedback( idEntity *victim, idEntity *inflictor, int &damage );
////							// notifies this entity that it is in pain
////	virtual bool			Pain( idEntity *inflictor, idEntity *attacker, int damage, const idVec3 &dir, int location );
////							// notifies this entity that is has been killed
////	virtual void			Killed( idEntity *inflictor, idEntity *attacker, int damage, const idVec3 &dir, int location );
////
////	// scripting
////	virtual bool			ShouldConstructScriptObjectAtSpawn( ) const;
////	virtual idThread *		ConstructScriptObject( );
////	virtual void			DeconstructScriptObject( );
////	void					SetSignal( signalNum_t signalnum, idThread *thread, const function_t *function );
////	void					ClearSignal( idThread *thread, signalNum_t signalnum );
////	void					ClearSignalThread( signalNum_t signalnum, idThread *thread );
////	bool					HasSignal( signalNum_t signalnum ) const;
////	void					Signal( signalNum_t signalnum );
////	void					SignalEvent( idThread *thread, signalNum_t signalnum );
////
////	// gui
////	void					TriggerGuis( );
////	bool					HandleGuiCommands( idEntity *entityGui, const char *cmds );
////	virtual bool			HandleSingleGuiCommand( idEntity *entityGui, idLexer *src );
////
////	// targets
////	void					FindTargets( );
////	void					RemoveNullTargets( );
////	void					ActivateTargets( activator:idEntity ) const;
////
////	// misc
////	virtual void			Teleport( const idVec3 &origin, angles:idAngles, idEntity *destination );
////	bool					TouchTriggers( ) const;
////	idCurve_Spline<idVec3> *GetSpline( ) const;
////	virtual void			ShowEditingDialog( );
////
////	enum {
////		EVENT_STARTSOUNDSHADER,
////		EVENT_STOPSOUNDSHADER,
////		EVENT_MAXEVENTS
////	};
////
////	virtual void			ClientPredictionThink( );
////	virtual void			WriteToSnapshot( idBitMsgDelta &msg ) const;
////	virtual void			ReadFromSnapshot( const idBitMsgDelta &msg );
////	virtual bool			ServerReceiveEvent( int event, /*int*/time:number, const idBitMsg &msg );
////	virtual bool			ClientReceiveEvent( int event, /*int*/time:number, const idBitMsg &msg );
////
////	void					WriteBindToSnapshot( idBitMsgDelta &msg ) const;
////	void					ReadBindFromSnapshot( const idBitMsgDelta &msg );
////	void					WriteColorToSnapshot( idBitMsgDelta &msg ) const;
////	void					ReadColorFromSnapshot( const idBitMsgDelta &msg );
////	void					WriteGUIToSnapshot( idBitMsgDelta &msg ) const;
////	void					ReadGUIFromSnapshot( const idBitMsgDelta &msg );
////
////	void					ServerSendEvent( int eventId, const idBitMsg *msg, bool saveEvent, int excludeClient ) const;
////	void					ClientSendEvent( int eventId, const idBitMsg *msg ) const;
////
////protected:
////	renderEntity_t			renderEntity;						// used to present a model to the renderer
////	int						modelDefHandle;						// handle to static renderer model
////	refSound_t				refSound;							// used to present sound to the audio engine
////
////private:
////	idPhysics_Static		defaultPhysicsObj;					// default physics object
////	idPhysics *				physics;							// physics used for this entity
////	idEntity *				bindMaster;							// entity bound to if unequal NULL
////	jointHandle_t			bindJoint;							// joint bound to if unequal INVALID_JOINT
////	int						bindBody;							// body bound to if unequal -1
////	idEntity *				teamMaster;							// master of the physics team
////	idEntity *				teamChain;							// next entity in physics team
////
////	int						numPVSAreas;						// number of renderer areas the entity covers
////	int						PVSAreas[MAX_PVS_AREAS];			// numbers of the renderer areas the entity covers
////
////	signalList_t *			signals;
////
////	int						mpGUIState;							// local cache to avoid systematic SetStateInt
////
////private:
////	void					FixupLocalizedStrings();
////
////	bool					DoDormantTests( );				// dormant == on the active list, but out of PVS
////
////	// physics
////							// initialize the default physics
////	void					InitDefaultPhysics( const idVec3 &origin, const idMat3 &axis );
////							// update visual position from the physics
////	void					UpdateFromPhysics( bool moveBack );
////
////	// entity binding
////	bool					InitBind( idEntity *master );		// initialize an entity binding
////	void					FinishBind( );					// finish an entity binding
////	void					RemoveBinds( );				// deletes any entities bound to this object
////	void					QuitTeam( );					// leave the current team
////
////	void					UpdatePVSAreas( );
////
////	// events
	Event_GetName ( ): void { throw "placeholder"; }
	Event_SetName ( name: string ): void { throw "placeholder"; }
	Event_FindTargets ( ): void { throw "placeholder"; }
	Event_ActivateTargets ( activator: idEntity ): void { throw "placeholder"; }
	Event_NumTargets ( ): void { throw "placeholder"; }
	Event_GetTarget ( /*float*/ index: number ): void { throw "placeholder"; }
	Event_RandomTarget ( ignore: string ): void { throw "placeholder"; }
	Event_Bind ( master: idEntity ): void { throw "placeholder"; }
	Event_BindPosition ( master: idEntity ): void { throw "placeholder"; }
	Event_BindToJoint ( master: idEntity, jointname: string, /*float*/ orientated: number ): void { throw "placeholder"; }
	Event_Unbind ( ): void { throw "placeholder"; }
	Event_RemoveBinds ( ): void { throw "placeholder"; }
	Event_SpawnBind ( ): void { throw "placeholder"; }
	Event_SetOwner ( owner: idEntity ): void { throw "placeholder"; }
	Event_SetModel ( modelname: string ): void { throw "placeholder"; }
	Event_SetSkin ( skinname: string ): void { throw "placeholder"; }
	Event_GetShaderParm ( /*int*/ parmnum: number ): void { throw "placeholder"; }
	Event_SetShaderParm ( /*int*/ parmnum: number, /*float*/ value: number ): void { throw "placeholder"; }
	Event_SetShaderParms ( /*float*/ parm0: number, /*float*/ parm1: number, /*float*/ parm2: number, /*float*/ parm3: number ): void { throw "placeholder"; }
	Event_SetColor ( /*float*/ red: number, /*float*/ green: number, /*float*/ blue: number ): void { throw "placeholder"; }
	Event_GetColor ( ): void { throw "placeholder"; }
	Event_IsHidden ( ): void { throw "placeholder"; }
	Event_Hide ( ): void { throw "placeholder"; }
	Event_Show ( ): void { throw "placeholder"; }
	Event_CacheSoundShader ( soundName: string ): void { throw "placeholder"; }
	Event_StartSoundShader ( soundName: string, /*int*/ channel: number ): void { throw "placeholder"; }
	Event_StopSound ( /*int*/ channel: number, /*int*/ netSync: number ): void { throw "placeholder"; }
	Event_StartSound ( soundName: string, /*int*/ channel: number, /*int*/ netSync: number ): void { throw "placeholder"; }
	Event_FadeSound ( /*int*/ channel: number, /*float*/ to: number, /*float*/ over: number ): void { throw "placeholder"; }
	Event_GetWorldOrigin ( ): void { throw "placeholder"; }
	Event_SetWorldOrigin ( org: idVec3 ): void { throw "placeholder"; }
	Event_GetOrigin ( ): void { throw "placeholder"; }
	Event_SetOrigin ( org: idVec3 ): void { throw "placeholder"; }
	Event_GetAngles ( ): void { throw "placeholder"; }
	Event_SetAngles ( ang: idAngles ): void { throw "placeholder"; }
	Event_SetLinearVelocity ( velocity: idVec3 ): void { throw "placeholder"; }
	Event_GetLinearVelocity ( ): void { throw "placeholder"; }
	Event_SetAngularVelocity ( velocity: idVec3 ): void { throw "placeholder"; }
	Event_GetAngularVelocity ( ): void { throw "placeholder"; }
	Event_SetSize ( mins: idVec3, maxs: idVec3 ): void { throw "placeholder"; }
	Event_GetSize ( ): void { throw "placeholder"; }
	Event_GetMins ( ): void { throw "placeholder"; }
	Event_GetMaxs ( ): void { throw "placeholder"; }
	Event_Touches ( ent: idEntity ): void { throw "placeholder"; }
	Event_SetGuiParm ( key: string, val: string ): void { throw "placeholder"; }
	Event_SetGuiFloat ( key: string, /*float*/ f: number ): void { throw "placeholder"; }
	Event_GetNextKey ( prefix: string, lastMatch: string ): void { throw "placeholder"; }
	Event_SetKey ( key: string, value: string ): void { throw "placeholder"; }
	Event_GetKey ( key: string ): void { throw "placeholder"; }
	Event_GetIntKey ( key: string ): void { throw "placeholder"; }
	Event_GetFloatKey ( key: string ): void { throw "placeholder"; }
	Event_GetVectorKey ( key: string ): void { throw "placeholder"; }
	Event_GetEntityKey ( key: string ): void { throw "placeholder"; }
	Event_RestorePosition ( ): void { throw "placeholder"; }
	Event_UpdateCameraTarget ( ): void { throw "placeholder"; }
	Event_DistanceTo ( ent: idEntity ): void { throw "placeholder"; }
	Event_DistanceToPoint ( point: idVec3 ): void { throw "placeholder"; }
	Event_StartFx ( fx: string ): void { throw "placeholder"; }
	Event_WaitFrame ( ): void { throw "placeholder"; }
	Event_Wait ( /*float*/ time: number ): void { throw "placeholder"; }
	Event_HasFunction ( name: string ): void { throw "placeholder"; }
	Event_CallFunction ( name: string ): void { throw "placeholder"; }
	Event_SetNeverDormant ( /*int*/ enable: number ): void { throw "placeholder"; }
};

////
/////*
////===============================================================================
////
////	Animated entity base class.
////
////===============================================================================
////*/
////
////typedef struct damageEffect_s {
////	jointHandle_t			jointNum;
////	idVec3					localOrigin;
////	idVec3					localNormal;
////	int						time;
////	const idDeclParticle*	type;
////	struct damageEffect_s *	next;
////} damageEffect_t;
////
class idAnimatedEntity extends idEntity {
////public:
////	CLASS_PROTOTYPE( idAnimatedEntity );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idAnimatedEntity>[];
////
////							idAnimatedEntity();
////							~idAnimatedEntity();
////
//Save ( savefile: idSaveGame ): void { throw "placeholder"; }
////	void					Restore ( savefile: idRestoreGame ): void { throw "placeholder"; }
////
////	virtual void			ClientPredictionThink( );
////	virtual void			Think( );
////
////	void					UpdateAnimation( );
////
////	virtual idAnimator *	GetAnimator( );
////	virtual void			SetModel( const char *modelname );
////
////	bool					GetJointWorldTransform( jointHandle_t jointHandle, int currentTime, idVec3 &offset, idMat3 &axis );
////	bool					GetJointTransformForAnim( jointHandle_t jointHandle, int animNum, int currentTime, idVec3 &offset, idMat3 &axis ) const;
////
////	virtual int				GetDefaultSurfaceType( ) const;
////	virtual void			AddDamageEffect( const trace_t &collision, const idVec3 &velocity, const char *damageDefName );
////	void					AddLocalDamageEffect( jointHandle_t jointNum, const idVec3 &localPoint, const idVec3 &localNormal, const idVec3 &localDir, const idDeclEntityDef *def, const idMaterial *collisionMaterial );
////	void					UpdateDamageEffects( );
////
////	virtual bool			ClientReceiveEvent( int event, /*int*/time:number, const idBitMsg &msg );
////
////	enum {
////		EVENT_ADD_DAMAGE_EFFECT = idEntity::EVENT_MAXEVENTS,
////		EVENT_MAXEVENTS
////	};
////
////protected:
////	idAnimator				animator;
////	damageEffect_t *		damageEffects;
////
//private:
	Event_GetJointHandle( jointname:string ): void { throw "placeholder"; }
	Event_ClearAllJoints( ): void { throw "placeholder"; }
	Event_ClearJoint( jointnum:jointHandle_t ): void { throw "placeholder"; }
	Event_SetJointPos( jointnum:jointHandle_t, transform_type:jointModTransform_t, pos:idVec3 ): void { throw "placeholder"; }
	Event_SetJointAngle( jointnum:jointHandle_t, transform_type:jointModTransform_t, angles:idAngles ): void { throw "placeholder"; }
	Event_GetJointPos( jointnum:jointHandle_t ): void { throw "placeholder"; }
	Event_GetJointAngle( jointnum:jointHandle_t ): void { throw "placeholder"; }
};
////
////#endif /* !__GAME_ENTITY_H__ */
