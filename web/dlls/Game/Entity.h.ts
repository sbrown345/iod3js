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

class entityFlags_s {
	// todo: bit fields
	notarget			:boolean/*:1*/;	// if true never attack or target this entity
	noknockback			:boolean/*:1*/;	// if true no knockback from hits
	takedamage			:boolean/*:1*/;	// if true this entity can be damaged
	hidden				:boolean/*:1*/;	// if true this entity is not visible
	bindOrientated		:boolean/*:1*/;	// if true both the master orientation is used for binding
	solidForTeam		:boolean/*:1*/;	// if true this entity is considered solid when a physics team mate pushes entities
	forcePhysicsUpdate	:boolean/*:1*/;	// if true always update from the physics whether the object moved or not
	selected			:boolean/*:1*/;	// if true the entity is selected for editing
	neverDormant		:boolean/*:1*/;	// if true the entity never goes dormant
	isDormant			:boolean/*:1*/;	// if true the entity is dormant
	hasAwakened			:boolean/*:1*/;	// before a monster has been awakened the first time, use full PVS for dormant instead of area-connected
	networkSync			:boolean/*:1*/; // if true the entity is synchronized over the network
};

class idEntity extends idClass {
////public:
////	static const int		MAX_PVS_AREAS = 4;
////
	entityNumber: number;		// index into the entity list		//	int						
	entityDefNumber:number;		// index into the entity def list	//	int						

	spawnNode = new idLinkList<idEntity>();				// for being linked into spawnedEntities list
	activeNode = new idLinkList<idEntity>();				// for being linked into activeEntities list

	snapshotNode = new idLinkList<idEntity>();			// for being linked into snapshotEntities list
	snapshotSequence: number /*int*/;		// last snapshot this entity was in
	snapshotBits: number /*int*/;			// number of bits this entity occupied in the last snapshot

	name = new idStr;					// name of entity
	spawnArgs = new idDict;				// key/value pairs used to spawn and initialize entity
	scriptObject = new idScriptObject;			// contains all script defined data for this entity
	
	thinkFlags:number/*int*/;				// TH_? flags
	dormantStart :number/*int*/;			// time that the entity was first closed off from player
	cinematic:boolean;				// during cinematics, entity will only think if cinematic is set

	renderView:renderView_t;				// for camera views from this entity
	cameraTarget: idEntity;			// any remoteRenderMap shaders will use this

	targets: idList<idEntityPtr<idEntity>>;		// when this entity is activated these entities entity are activated

	health :number/*int*/;					// FIXME: do all objects really need health?

	fl = new entityFlags_s;

////public:
////	ABSTRACT_PROTOTYPE( idEntity );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idEntity>[];

////							idEntity();
	//destructor ( ): void { throw "placeholder"; }
////
	Spawn ( ): void { throw "placeholder"; }

	Save ( savefile: idSaveGame ): void { throw "placeholder"; }
	Restore ( savefile: idRestoreGame ): void { throw "placeholder"; }
////
////	const char *			GetEntityDefName( ) const;
	//SetName ( name: string ): void { throw "placeholder"; }
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
	//Event_GetName ( ): void { throw "placeholder"; }
	//Event_SetName ( name: string ): void { throw "placeholder"; }
	//Event_FindTargets ( ): void { throw "placeholder"; }
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
	Event_SetNeverDormant( /*int*/ enable: number): void { throw "placeholder"; }



/////*
////===============
////idEntity::UpdateChangeableSpawnArgs
////
////Any key val pair that might change during the course of the game ( via a gui or whatever )
////should be initialize here so a gui or other trigger can change something and have it updated
////properly. An optional source may be provided if the values reside in an outside dictionary and
////first need copied over to spawnArgs
////===============
////*/
////idEntity.prototype.UpdateChangeableSpawnArgs( const idDict *source ) {
////	int i;
////	const char *target;
////
////	if ( !source ) {
////		source = &spawnArgs;
////	}
////	cameraTarget = NULL;
////	target = source.GetString( "cameraTarget" );
////	if ( target && target[0] ) {
////		// update the camera taget
////		PostEventMS( &EV_UpdateCameraTarget, 0 );
////	}
////
////	for ( i = 0; i < MAX_RENDERENTITY_GUI; i++ ) {
////		UpdateGuiParms( renderEntity.gui[ i ], source );
////	}
////}
////
/////*
////================
////idEntity::idEntity
////================
////*/
////idEntity::idEntity() {
////
////	entityNumber	= ENTITYNUM_NONE;
////	entityDefNumber = -1;
////
////	spawnNode.SetOwner( this );
////	activeNode.SetOwner( this );
////
////	snapshotNode.SetOwner( this );
////	snapshotSequence = -1;
////	snapshotBits = 0;
////
////	thinkFlags		= 0;
////	dormantStart	= 0;
////	cinematic		= false;
////	renderView		= NULL;
////	cameraTarget	= NULL;
////	health			= 0;
////
////	physics			= NULL;
////	bindMaster		= NULL;
////	bindJoint		= INVALID_JOINT;
////	bindBody		= -1;
////	teamMaster		= NULL;
////	teamChain		= NULL;
////	signals			= NULL;
////
////	memset( PVSAreas, 0, sizeof( PVSAreas ) );
////	numPVSAreas		= -1;
////
////	memset( &fl, 0, sizeof( fl ) );
////	fl.neverDormant	= true;			// most entities never go dormant
////
////	memset( &renderEntity, 0, sizeof( renderEntity ) );
////	modelDefHandle	= -1;
////	memset( &refSound, 0, sizeof( refSound ) );
////
////	mpGUIState = -1;
////}
////
/////*
////================
////idEntity::FixupLocalizedStrings
////================
////*/
////idEntity.prototype.FixupLocalizedStrings() {
////	for ( int i = 0; i < this.spawnArgs.GetNumKeyVals(); i++ ) {
////		const idKeyValue *kv = this.spawnArgs.GetKeyVal( i );
////		if ( idStr::Cmpn( kv.GetValue(), STRTABLE_ID, STRTABLE_ID_LENGTH ) == 0 ){
////			this.spawnArgs.Set( kv.GetKey(), common.GetLanguageDict().GetString( kv.GetValue() ) );
////		}
////	}
////}

/*
================
idEntity::Spawn
================
*/
idEntity.prototype.Spawn( ):void {
	int					i;
	const char			*temp;
	idVec3				origin;
	idMat3				axis;
	const idKeyValue	*networkSync;
	const char			*classname;
	const char			*scriptObjectName;

	gameLocal.RegisterEntity( this );

	this.spawnArgs.GetString( "classname", NULL, &classname );
	const idDeclEntityDef *def = gameLocal.FindEntityDef( classname, false );
	if ( def ) {
		entityDefNumber = def.Index();
	}

	FixupLocalizedStrings();

	// parse static models the same way the editor display does
	gameEdit.ParseSpawnArgsToRenderEntity( &spawnArgs, &renderEntity );

	renderEntity.entityNum = entityNumber;
	
	// go dormant within 5 frames so that when the map starts most monsters are dormant
	dormantStart = gameLocal.time - DELAY_DORMANT_TIME + gameLocal.msec * 5;

	origin = renderEntity.origin;
	axis = renderEntity.axis;

	// do the audio parsing the same way dmap and the editor do
	gameEdit.ParseSpawnArgsToRefSound( &spawnArgs, &refSound );

	// only play SCHANNEL_PRIVATE when sndworld.PlaceListener() is called with this listenerId
	// don't spatialize sounds from the same entity
	refSound.listenerId = entityNumber + 1;

	cameraTarget = NULL;
	temp = this.spawnArgs.GetString( "cameraTarget" );
	if ( temp && temp[0] ) {
		// update the camera taget
		PostEventMS( &EV_UpdateCameraTarget, 0 );
	}

	for ( i = 0; i < MAX_RENDERENTITY_GUI; i++ ) {
		UpdateGuiParms( renderEntity.gui[ i ], &spawnArgs );
	}

	fl.solidForTeam = this.spawnArgs.GetBool( "solidForTeam", "0" );
	fl.neverDormant = this.spawnArgs.GetBool( "neverDormant", "0" );
	fl.hidden = this.spawnArgs.GetBool( "hide", "0" );
	if ( fl.hidden ) {
		// make sure we're hidden, since a spawn function might not set it up right
		PostEventMS( &EV_Hide, 0 );
	}
	cinematic = this.spawnArgs.GetBool( "cinematic", "0" );

	networkSync = this.spawnArgs.FindKey( "networkSync" );
	if ( networkSync ) {
		fl.networkSync = ( atoi( networkSync.GetValue() ) != 0 );
	}

#if 0
	if ( !gameLocal.isClient ) {
		// common.DPrintf( "NET: DBG %s - %s is synced: %s\n", this.spawnArgs.GetString( "classname", "" ), GetType().classname, fl.networkSync ? "true" : "false" );
		if ( this.spawnArgs.GetString( "classname", "" )[ 0 ] == '\0' && !fl.networkSync ) {
			common.DPrintf( "NET: WRN %s entity, no classname, and no networkSync?\n", GetType().classname );
		}
	}
#endif

	// every object will have a unique name
	temp = this.spawnArgs.GetString( "name", va( "%s_%s_%d", GetClassname(), this.spawnArgs.GetString( "classname" ), entityNumber ) );
	SetName( temp );

	// if we have targets, wait until all entities are spawned to get them
	if ( this.spawnArgs.MatchPrefix( "target" ) || this.spawnArgs.MatchPrefix( "guiTarget" ) ) {
		if ( gameLocal.GameState() == GAMESTATE_STARTUP ) {
			PostEventMS( &EV_FindTargets, 0 );
		} else {
			// not during spawn, so it's ok to get the targets
			this.FindTargets();
		}
	}

	health = this.spawnArgs.GetInt( "health" );

	InitDefaultPhysics( origin, axis );

	SetOrigin( origin );
	SetAxis( axis );

	temp = this.spawnArgs.GetString( "model" );
	if ( temp && *temp ) {
		SetModel( temp );
	}

	if ( this.spawnArgs.GetString( "bind", "", &temp ) ) {
		PostEventMS( &EV_SpawnBind, 0 );
	}

	// auto-start a sound on the entity
	if ( refSound.shader && !refSound.waitfortrigger ) {
		StartSoundShader( refSound.shader, SND_CHANNEL_ANY, 0, false, NULL );
	}

	// setup script object
	if ( ShouldConstructScriptObjectAtSpawn() && this.spawnArgs.GetString( "scriptobject", NULL, &scriptObjectName ) ) {
		if ( !scriptObject.SetType( scriptObjectName ) ) {
			gameLocal.Error( "Script object '%s' not found on entity '%s'.", scriptObjectName, this.name.c_str() );
		}

		ConstructScriptObject();
	}
}

/*
================
idEntity::~idEntity
================
*/
	destructor ( ): void {
		todoThrow ( );
		////	if ( gameLocal.GameState() != GAMESTATE_SHUTDOWN && !gameLocal.isClient && fl.networkSync && entityNumber >= MAX_CLIENTS ) {
		////		idBitMsg	msg;
		////		byte		msgBuf[ MAX_GAME_MESSAGE_SIZE ];
		////
		////		msg.Init( msgBuf, sizeof( msgBuf ) );
		////		msg.WriteByte( GAME_RELIABLE_MESSAGE_DELETE_ENT );
		////		msg.WriteBits( gameLocal.GetSpawnId( this ), 32 );
		////		networkSystem.ServerSendReliableMessage( -1, msg );
		////	}
		////
		////	DeconstructScriptObject();
		////	scriptObject.Free();
		////
		////	if ( thinkFlags ) {
		////		BecomeInactive( thinkFlags );
		////	}
		////	activeNode.Remove();
		////
		////	Signal( SIG_REMOVED );
		////
		////	// we have to set back the default physics object before unbinding because the entity
		////	// specific physics object might be an entity variable and as such could already be destroyed.
		////	SetPhysics( NULL );
		////
		////	// remove any entities that are bound to me
		////	RemoveBinds();
		////
		////	// unbind from master
		////	Unbind();
		////	QuitTeam();
		////
		////	gameLocal.RemoveEntityFromHash( this.name.c_str(), this );
		////
		////	delete renderView;
		////	renderView = NULL;
		////
		////	delete signals;
		////	signals = NULL;
		////
		////	FreeModelDef();
		////	FreeSoundEmitter( false );
		////
		////	gameLocal.UnregisterEntity( this );
	}
////
/////*
////================
////idEntity::Save
////================
////*/
////idEntity.prototype.Save( idSaveGame *savefile ) const {
////	int i, j;
////
////	savefile.WriteInt( entityNumber );
////	savefile.WriteInt( entityDefNumber );
////
////	// spawnNode and activeNode are restored by gameLocal
////
////	savefile.WriteInt( snapshotSequence );
////	savefile.WriteInt( snapshotBits );
////
////	savefile.WriteDict( &spawnArgs );
////	savefile.WriteString( this.name );
////	scriptObject.Save( savefile );
////
////	savefile.WriteInt( thinkFlags );
////	savefile.WriteInt( dormantStart );
////	savefile.WriteBool( cinematic );
////
////	savefile.WriteObject( cameraTarget );
////
////	savefile.WriteInt( health );
////
////	savefile.WriteInt( targets.Num() );
////	for( i = 0; i < targets.Num(); i++ ) {
////		targets[ i ].Save( savefile );
////	}
////
////	entityFlags_s flags = fl;
////	LittleBitField( &flags, sizeof( flags ) );
////	savefile.Write( &flags, sizeof( flags ) );
////
////	savefile.WriteRenderEntity( renderEntity );
////	savefile.WriteInt( modelDefHandle );
////	savefile.WriteRefSound( refSound );
////
////	savefile.WriteObject( bindMaster );
////	savefile.WriteJoint( bindJoint );
////	savefile.WriteInt( bindBody );
////	savefile.WriteObject( teamMaster );
////	savefile.WriteObject( teamChain );
////
////	savefile.WriteStaticObject( defaultPhysicsObj );
////
////	savefile.WriteInt( numPVSAreas );
////	for( i = 0; i < MAX_PVS_AREAS; i++ ) {
////		savefile.WriteInt( PVSAreas[ i ] );
////	}
////
////	if ( !signals ) {
////		savefile.WriteBool( false );
////	} else {
////		savefile.WriteBool( true );
////		for( i = 0; i < NUM_SIGNALS; i++ ) {
////			savefile.WriteInt( signals.signal[ i ].Num() );
////			for( j = 0; j < signals.signal[ i ].Num(); j++ ) {
////				savefile.WriteInt( signals.signal[ i ][ j ].threadnum );
////				savefile.WriteString( signals.signal[ i ][ j ].function.Name() );
////			}
////		}
////	}
////
////	savefile.WriteInt( mpGUIState );
////}
////
/////*
////================
////idEntity::Restore
////================
////*/
////idEntity.prototype.Restore( idRestoreGame *savefile ) {
////	int			i, j;
////	int			num;
////	idStr		funcname;
////
////	savefile.ReadInt( entityNumber );
////	savefile.ReadInt( entityDefNumber );
////
////	// spawnNode and activeNode are restored by gameLocal
////
////	savefile.ReadInt( snapshotSequence );
////	savefile.ReadInt( snapshotBits );
////
////	savefile.ReadDict( &spawnArgs );
////	savefile.ReadString( this.name );
////	SetName( this.name );
////
////	scriptObject.Restore( savefile );
////
////	savefile.ReadInt( thinkFlags );
////	savefile.ReadInt( dormantStart );
////	savefile.ReadBool( cinematic );
////
////	savefile.ReadObject( reinterpret_cast<idClass *&>( cameraTarget ) );
////
////	savefile.ReadInt( health );
////
////	targets.Clear();
////	savefile.ReadInt( num );
////	targets.SetNum( num );
////	for( i = 0; i < num; i++ ) {
////		targets[ i ].Restore( savefile );
////	}
////
////	savefile.Read( &fl, sizeof( fl ) );
////	LittleBitField( &fl, sizeof( fl ) );
////	
////	savefile.ReadRenderEntity( renderEntity );
////	savefile.ReadInt( modelDefHandle );
////	savefile.ReadRefSound( refSound );
////
////	savefile.ReadObject( reinterpret_cast<idClass *&>( bindMaster ) );
////	savefile.ReadJoint( bindJoint );
////	savefile.ReadInt( bindBody );
////	savefile.ReadObject( reinterpret_cast<idClass *&>( teamMaster ) );
////	savefile.ReadObject( reinterpret_cast<idClass *&>( teamChain ) );
////
////	savefile.ReadStaticObject( defaultPhysicsObj );
////	RestorePhysics( &defaultPhysicsObj );
////
////	savefile.ReadInt( numPVSAreas );
////	for( i = 0; i < MAX_PVS_AREAS; i++ ) {
////		savefile.ReadInt( PVSAreas[ i ] );
////	}
////
////	bool readsignals;
////	savefile.ReadBool( readsignals );
////	if ( readsignals ) {
////		signals = new signalList_t;
////		for( i = 0; i < NUM_SIGNALS; i++ ) {
////			savefile.ReadInt( num );
////			signals.signal[ i ].SetNum( num );
////			for( j = 0; j < num; j++ ) {
////				savefile.ReadInt( signals.signal[ i ][ j ].threadnum );
////				savefile.ReadString( funcname );
////				signals.signal[ i ][ j ].function = gameLocal.program.FindFunction( funcname );
////				if ( !signals.signal[ i ][ j ].function ) {
////					savefile.Error( "Function '%s' not found", funcname.c_str() );
////				}
////			}
////		}
////	}
////
////	savefile.ReadInt( mpGUIState );
////
////	// restore must retrieve modelDefHandle from the renderer
////	if ( modelDefHandle != -1 ) {
////		modelDefHandle = gameRenderWorld.AddEntityDef( &renderEntity );
////	}
////}
////
/////*
////================
////idEntity::GetEntityDefName
////================
////*/
////const char * idEntity::GetEntityDefName( ):void const {
////	if ( entityDefNumber < 0 ) {
////		return "*unknown*";
////	}
////	return declManager.DeclByIndex( DECL_ENTITYDEF, entityDefNumber, false ).GetName();
////}
////
/*
================
idEntity::SetName
================
*/
	SetName ( newname: string ): void {
		if ( this.name.Length ( ) ) {
			gameLocal.RemoveEntityFromHash( this.name.c_str ( ), this );
			gameLocal.program.SetEntity( this.name.data, null );
		}

		this.name.equals( newname );
		if ( this.name.Length ( ) ) {
			if ( ( this.name.data == "NULL" ) || ( this.name.data == "null_entity" ) ) {
				gameLocal.Error( "Cannot name entity '%s'.  '%s' is reserved for script.", this.name.c_str ( ), this.name.c_str ( ) );
			}
			gameLocal.AddEntityToHash( this.name.c_str ( ), this );
			gameLocal.program.SetEntity( this.name.data, this );
		}
	}

/////*
////================
////idEntity::GetName
////================
////*/
////const char * idEntity::GetName( ):void const {
////	return this.name.c_str();
////}
////
////
/////***********************************************************************
////
////	Thinking
////	
////***********************************************************************/
////
/////*
////================
////idEntity::Think
////================
////*/
////idEntity.prototype.Think( ):void {
////	RunPhysics();
////	Present();
////}
////
/////*
////================
////idEntity::DoDormantTests
////
////Monsters and other expensive entities that are completely closed
////off from the player can skip all of their work
////================
////*/
////bool idEntity::DoDormantTests( ):void {
////
////	if ( fl.neverDormant ) {
////		return false;
////	}
////
////	// if the monster area is not topologically connected to a player
////	if ( !gameLocal.InPlayerConnectedArea( this ) ) {
////		if ( dormantStart == 0 ) {
////			dormantStart = gameLocal.time;
////		}
////		if ( gameLocal.time - dormantStart < DELAY_DORMANT_TIME ) {
////			// just got closed off, don't go dormant yet
////			return false;
////		}
////		return true;
////	} else {
////		// the monster area is topologically connected to a player, but if
////		// the monster hasn't been woken up before, do the more precise PVS check
////		if ( !fl.hasAwakened ) {
////			if ( !gameLocal.InPlayerPVS( this ) ) {
////				return true;		// stay dormant
////			}
////		}
////
////		// wake up
////		dormantStart = 0;
////		fl.hasAwakened = true;		// only go dormant when area closed off now, not just out of PVS
////		return false;
////	}
////
////	return false;
////}
////
/////*
////================
////idEntity::CheckDormant
////
////Monsters and other expensive entities that are completely closed
////off from the player can skip all of their work
////================
////*/
////bool idEntity::CheckDormant( ):void {
////	bool dormant;
////	
////	dormant = DoDormantTests();
////	if ( dormant && !fl.isDormant ) {
////		fl.isDormant = true;
////		DormantBegin();
////	} else if ( !dormant && fl.isDormant ) {
////		fl.isDormant = false;
////		DormantEnd();
////	}
////
////	return dormant;
////}
////
/////*
////================
////idEntity::DormantBegin
////
////called when entity becomes dormant
////================
////*/
////idEntity.prototype.DormantBegin( ):void {
////}
////
/////*
////================
////idEntity::DormantEnd
////
////called when entity wakes from being dormant
////================
////*/
////idEntity.prototype.DormantEnd( ):void {
////}
////
/////*
////================
////idEntity::IsActive
////================
////*/
////bool idEntity::IsActive( ):void const {
////	return activeNode.InList();
////}
////
/////*
////================
////idEntity::BecomeActive
////================
////*/
////idEntity.prototype.BecomeActive( int flags ) {
////	if ( ( flags & TH_PHYSICS ) ) {
////		// enable the team master if this entity is part of a physics team
////		if ( teamMaster && teamMaster != this ) {
////			teamMaster.BecomeActive( TH_PHYSICS );
////		} else if ( !( thinkFlags & TH_PHYSICS ) ) {
////			// if this is a pusher
////			if ( physics.IsType( idPhysics_Parametric::Type ) || physics.IsType( idPhysics_Actor::Type ) ) {
////				gameLocal.sortPushers = true;
////			}
////		}
////	}
////
////	int oldFlags = thinkFlags;
////	thinkFlags |= flags;
////	if ( thinkFlags ) {
////		if ( !IsActive() ) {
////			activeNode.AddToEnd( gameLocal.activeEntities );
////		} else if ( !oldFlags ) {
////			// we became inactive this frame, so we have to decrease the count of entities to deactivate
////			gameLocal.numEntitiesToDeactivate--;
////		}
////	}
////}
////
/////*
////================
////idEntity::BecomeInactive
////================
////*/
////idEntity.prototype.BecomeInactive( int flags ) {
////	if ( ( flags & TH_PHYSICS ) ) {
////		// may only disable physics on a team master if no team members are running physics or bound to a joints
////		if ( teamMaster == this ) {
////			for ( var ent:idEntity = teamMaster.teamChain; ent; ent = ent.teamChain ) {
////				if ( ( ent.thinkFlags & TH_PHYSICS ) || ( ( ent.bindMaster == this ) && ( ent.bindJoint != INVALID_JOINT ) ) ) {
////					flags &= ~TH_PHYSICS;
////					break;
////				}
////			}
////		}
////	}
////
////	if ( thinkFlags ) {
////		thinkFlags &= ~flags;
////		if ( !thinkFlags && IsActive() ) {
////			gameLocal.numEntitiesToDeactivate++;
////		}
////	}
////
////	if ( ( flags & TH_PHYSICS ) ) {
////		// if this entity has a team master
////		if ( teamMaster && teamMaster != this ) {
////			// if the team master is at rest
////			if ( teamMaster.IsAtRest() ) {
////				teamMaster.BecomeInactive( TH_PHYSICS );
////			}
////		}
////	}
////}
////
/////***********************************************************************
////
////	Visuals
////	
////***********************************************************************/
////
/////*
////================
////idEntity::SetShaderParm
////================
////*/
////idEntity.prototype.SetShaderParm( int parmnum, float value ) {
////	if ( ( parmnum < 0 ) || ( parmnum >= MAX_ENTITY_SHADER_PARMS ) ) {
////		gameLocal.Warning( "shader parm index (%d) out of range", parmnum );
////		return;
////	}
////
////	renderEntity.shaderParms[ parmnum ] = value;
////	UpdateVisuals();
////}
////
/////*
////================
////idEntity::SetColor
////================
////*/
////idEntity.prototype.SetColor( float red, float green, float blue ) {
////	renderEntity.shaderParms[ SHADERPARM_RED ]		= red;
////	renderEntity.shaderParms[ SHADERPARM_GREEN ]	= green;
////	renderEntity.shaderParms[ SHADERPARM_BLUE ]		= blue;
////	UpdateVisuals();
////}
////
/////*
////================
////idEntity::SetColor
////================
////*/
////idEntity.prototype.SetColor( color:idVec3 ) {
////	SetColor( color[ 0 ], color[ 1 ], color[ 2 ] );
////	UpdateVisuals();
////}
////
/////*
////================
////idEntity::GetColor
////================
////*/
////idEntity.prototype.GetColor( idVec3 &out ) const {
////	out[ 0 ] = renderEntity.shaderParms[ SHADERPARM_RED ];
////	out[ 1 ] = renderEntity.shaderParms[ SHADERPARM_GREEN ];
////	out[ 2 ] = renderEntity.shaderParms[ SHADERPARM_BLUE ];
////}
////
/////*
////================
////idEntity::SetColor
////================
////*/
////idEntity.prototype.SetColor( const idVec4 &color ) {
////	renderEntity.shaderParms[ SHADERPARM_RED ]		= color[ 0 ];
////	renderEntity.shaderParms[ SHADERPARM_GREEN ]	= color[ 1 ];
////	renderEntity.shaderParms[ SHADERPARM_BLUE ]		= color[ 2 ];
////	renderEntity.shaderParms[ SHADERPARM_ALPHA ]	= color[ 3 ];
////	UpdateVisuals();
////}
////
/////*
////================
////idEntity::GetColor
////================
////*/
////idEntity.prototype.GetColor( idVec4 &out ) const {
////	out[ 0 ] = renderEntity.shaderParms[ SHADERPARM_RED ];
////	out[ 1 ] = renderEntity.shaderParms[ SHADERPARM_GREEN ];
////	out[ 2 ] = renderEntity.shaderParms[ SHADERPARM_BLUE ];
////	out[ 3 ] = renderEntity.shaderParms[ SHADERPARM_ALPHA ];
////}
////
/////*
////================
////idEntity::UpdateAnimationControllers
////================
////*/
////bool idEntity::UpdateAnimationControllers( ):void {
////	// any ragdoll and IK animation controllers should be updated here
////	return false;
////}
////
/////*
////================
////idEntity::SetModel
////================
////*/
////idEntity.prototype.SetModel( const char *modelname ) {
////	assert( modelname );
////
////	FreeModelDef();
////
////	renderEntity.hModel = renderModelManager.FindModel( modelname );
////
////	if ( renderEntity.hModel ) {
////		renderEntity.hModel.Reset();
////	}
////
////	renderEntity.callback = NULL;
////	renderEntity.numJoints = 0;
////	renderEntity.joints = NULL;
////	if ( renderEntity.hModel ) {
////		renderEntity.bounds = renderEntity.hModel.Bounds( &renderEntity );
////	} else {
////		renderEntity.bounds.Zero();
////	}
////
////	UpdateVisuals();
////}
////
/////*
////================
////idEntity::SetSkin
////================
////*/
////idEntity.prototype.SetSkin( const idDeclSkin *skin ) {
////	renderEntity.customSkin = skin;
////	UpdateVisuals();
////}
////
/////*
////================
////idEntity::GetSkin
////================
////*/
////const idDeclSkin *idEntity::GetSkin( ):void const {
////	return renderEntity.customSkin;
////}
////
/////*
////================
////idEntity::FreeModelDef
////================
////*/
////idEntity.prototype.FreeModelDef( ):void {
////	if ( modelDefHandle != -1 ) {
////		gameRenderWorld.FreeEntityDef( modelDefHandle );
////		modelDefHandle = -1;
////	}
////}
////
/////*
////================
////idEntity::FreeLightDef
////================
////*/
////idEntity.prototype.FreeLightDef( ):void {
////}
////
/////*
////================
////idEntity::IsHidden
////================
////*/
////bool idEntity::IsHidden( ):void const {
////	return fl.hidden;
////}
////
/////*
////================
////idEntity::Hide
////================
////*/
////idEntity.prototype.Hide( ):void {
////	if ( !IsHidden() ) {
////		fl.hidden = true;
////		FreeModelDef();
////		UpdateVisuals();
////	}
////}
////
/////*
////================
////idEntity::Show
////================
////*/
////idEntity.prototype.Show( ):void {
////	if ( IsHidden() ) {
////		fl.hidden = false;
////		UpdateVisuals();
////	}
////}
////
/////*
////================
////idEntity::UpdateModelTransform
////================
////*/
////idEntity.prototype.UpdateModelTransform( ):void {
////	idVec3 origin;
////	idMat3 axis;
////
////	if ( GetPhysicsToVisualTransform( origin, axis ) ) {
////		renderEntity.axis = axis * GetPhysics().GetAxis();
////		renderEntity.origin = GetPhysics().GetOrigin() + origin * renderEntity.axis;
////	} else {
////		renderEntity.axis = GetPhysics().GetAxis();
////		renderEntity.origin = GetPhysics().GetOrigin();
////	}
////}
////
/////*
////================
////idEntity::UpdateModel
////================
////*/
////idEntity.prototype.UpdateModel( ):void {
////	UpdateModelTransform();
////
////	// check if the entity has an MD5 model
////	idAnimator *animator = GetAnimator();
////	if ( animator && animator.ModelHandle() ) {
////		// set the callback to update the joints
////		renderEntity.callback = idEntity::ModelCallback;
////	}
////
////	// set to invalid number to force an update the next time the PVS areas are retrieved
////	ClearPVSAreas();
////
////	// ensure that we call Present this frame
////	BecomeActive( TH_UPDATEVISUALS );
////}
////
/////*
////================
////idEntity::UpdateVisuals
////================
////*/
////idEntity.prototype.UpdateVisuals( ):void {
////	UpdateModel();
////	UpdateSound();
////}
////
/////*
////================
////idEntity::UpdatePVSAreas
////================
////*/
////idEntity.prototype.UpdatePVSAreas( ):void {
////	int localNumPVSAreas, localPVSAreas[32];
////	idBounds modelAbsBounds;
////	int i;
////
////	modelAbsBounds.FromTransformedBounds( renderEntity.bounds, renderEntity.origin, renderEntity.axis );
////	localNumPVSAreas = gameLocal.pvs.GetPVSAreas( modelAbsBounds, localPVSAreas, sizeof( localPVSAreas ) / sizeof( localPVSAreas[0] ) );
////
////	// FIXME: some particle systems may have huge bounds and end up in many PVS areas
////	// the first MAX_PVS_AREAS may not be visible to a network client and as a result the particle system may not show up when it should
////	if ( localNumPVSAreas > MAX_PVS_AREAS ) {
////		localNumPVSAreas = gameLocal.pvs.GetPVSAreas( idBounds( modelAbsBounds.GetCenter() ).Expand( 64.0f ), localPVSAreas, sizeof( localPVSAreas ) / sizeof( localPVSAreas[0] ) );
////	}
////
////	for ( numPVSAreas = 0; numPVSAreas < MAX_PVS_AREAS && numPVSAreas < localNumPVSAreas; numPVSAreas++ ) {
////		PVSAreas[numPVSAreas] = localPVSAreas[numPVSAreas];
////	}
////
////	for( i = numPVSAreas; i < MAX_PVS_AREAS; i++ ) {
////		PVSAreas[ i ] = 0;
////	}
////}
////
/////*
////================
////idEntity::UpdatePVSAreas
////================
////*/
////idEntity.prototype.UpdatePVSAreas( pos:idVec3 ) {
////	int i;
////
////	numPVSAreas = gameLocal.pvs.GetPVSAreas( idBounds( pos ), PVSAreas, MAX_PVS_AREAS );
////	i = numPVSAreas;
////	while ( i < MAX_PVS_AREAS ) {
////		PVSAreas[ i++ ] = 0;
////	}
////}
////
/////*
////================
////idEntity::GetNumPVSAreas
////================
////*/
////int idEntity::GetNumPVSAreas( ):void {
////	if ( numPVSAreas < 0 ) {
////		UpdatePVSAreas();
////	}
////	return numPVSAreas;
////}
////
/////*
////================
////idEntity::GetPVSAreas
////================
////*/
////const int *idEntity::GetPVSAreas( ):void {
////	if ( numPVSAreas < 0 ) {
////		UpdatePVSAreas();
////	}
////	return PVSAreas;
////}
////
/////*
////================
////idEntity::ClearPVSAreas
////================
////*/
////idEntity.prototype.ClearPVSAreas( ):void {
////	numPVSAreas = -1;
////}
////
/////*
////================
////idEntity::PhysicsTeamInPVS
////
////  FIXME: for networking also return true if any of the entity shadows is in the PVS
////================
////*/
////bool idEntity::PhysicsTeamInPVS( pvsHandle_t pvsHandle ) {
////	idEntity *part;
////
////	if ( teamMaster ) {
////		for ( part = teamMaster; part; part = part.teamChain ) {
////			if ( gameLocal.pvs.InCurrentPVS( pvsHandle, part.GetPVSAreas(), part.GetNumPVSAreas() ) ) {
////				return true;
////			}
////		}
////	} else {
////		return gameLocal.pvs.InCurrentPVS( pvsHandle, GetPVSAreas(), GetNumPVSAreas() );
////	}
////	return false;
////}
////
/////*
////==============
////idEntity::ProjectOverlay
////==============
////*/
////idEntity.prototype.ProjectOverlay( const idVec3 &origin, const idVec3 &dir, float size, const char *material ) {
////	float s, c;
////	idMat3 axis, axistemp;
////	idVec3 localOrigin, localAxis[2];
////	idPlane localPlane[2];
////
////	// make sure the entity has a valid model handle
////	if ( modelDefHandle < 0 ) {
////		return;
////	}
////
////	// only do this on dynamic md5 models
////	if ( renderEntity.hModel.IsDynamicModel() != DM_CACHED ) {
////		return;
////	}
////
////	idMath::SinCos16( gameLocal.random.RandomFloat() * idMath::TWO_PI, s, c );
////
////	axis[2] = -dir;
////	axis[2].NormalVectors( axistemp[0], axistemp[1] );
////	axis[0] = axistemp[ 0 ] * c + axistemp[ 1 ] * -s;
////	axis[1] = axistemp[ 0 ] * -s + axistemp[ 1 ] * -c;
////
////	renderEntity.axis.ProjectVector( origin - renderEntity.origin, localOrigin );
////	renderEntity.axis.ProjectVector( axis[0], localAxis[0] );
////	renderEntity.axis.ProjectVector( axis[1], localAxis[1] );
////
////	size = 1.0f / size;
////	localAxis[0] *= size;
////	localAxis[1] *= size;
////
////	localPlane[0] = localAxis[0];
////	localPlane[0][3] = -( localOrigin * localAxis[0] ) + 0.5f;
////
////	localPlane[1] = localAxis[1];
////	localPlane[1][3] = -( localOrigin * localAxis[1] ) + 0.5f;
////
////	const idMaterial *mtr = declManager.FindMaterial( material );
////
////	// project an overlay onto the model
////	gameRenderWorld.ProjectOverlay( modelDefHandle, localPlane, mtr );
////
////	// make sure non-animating models update their overlay
////	UpdateVisuals();
////}
////
/////*
////================
////idEntity::Present
////
////Present is called to allow entities to generate refEntities, lights, etc for the renderer.
////================
////*/
////idEntity.prototype.Present( ):void {
////
////	if ( !gameLocal.isNewFrame ) {
////		return;
////	}
////
////	// don't present to the renderer if the entity hasn't changed
////	if ( !( thinkFlags & TH_UPDATEVISUALS ) ) {
////		return;
////	}
////	BecomeInactive( TH_UPDATEVISUALS );
////
////	// camera target for remote render views
////	if ( cameraTarget && gameLocal.InPlayerPVS( this ) ) {
////		renderEntity.remoteRenderView = cameraTarget.GetRenderView();
////	}
////
////	// if set to invisible, skip
////	if ( !renderEntity.hModel || IsHidden() ) {
////		return;
////	}
////
////	// add to refresh list
////	if ( modelDefHandle == -1 ) {
////		modelDefHandle = gameRenderWorld.AddEntityDef( &renderEntity );
////	} else {
////		gameRenderWorld.UpdateEntityDef( modelDefHandle, &renderEntity );
////	}
////}
////
/////*
////================
////idEntity::GetRenderEntity
////================
////*/
////renderEntity_t *idEntity::GetRenderEntity( ):void {
////	return &renderEntity;
////}
////
/////*
////================
////idEntity::GetModelDefHandle
////================
////*/
////int idEntity::GetModelDefHandle( ):void {
////	return modelDefHandle;
////}
////
/////*
////================
////idEntity::UpdateRenderEntity
////================
////*/
////bool idEntity::UpdateRenderEntity( renderEntity_s *renderEntity, const renderView_t *renderView ) {
////	if ( gameLocal.inCinematic && gameLocal.skipCinematic ) {
////		return false;
////	}
////
////	idAnimator *animator = GetAnimator();
////	if ( animator ) {
////		return animator.CreateFrame( gameLocal.time, false );
////	}
////
////	return false;
////}
////
/////*
////================
////idEntity::ModelCallback
////
////	NOTE: may not change the game state whatsoever!
////================
////*/
////bool idEntity::ModelCallback( renderEntity_s *renderEntity, const renderView_t *renderView ) {
////	var ent:idEntity
////
////	ent = gameLocal.entities[ renderEntity.entityNum ];
////	if ( !ent ) {
////		gameLocal.Error( "idEntity::ModelCallback: callback with NULL game entity" );
////	}
////
////	return ent.UpdateRenderEntity( renderEntity, renderView );
////}
////
/////*
////================
////idEntity::GetAnimator
////
////Subclasses will be responsible for allocating animator.
////================
////*/
////idAnimator *idEntity::GetAnimator( ):void {
////	return NULL;
////}
////
/////*
////=============
////idEntity::GetRenderView
////
////This is used by remote camera views to look from an entity
////=============
////*/
////renderView_t *idEntity::GetRenderView( ):void {
////	if ( !renderView ) {
////		renderView = new renderView_t;
////	}
////	memset( renderView, 0, sizeof( *renderView ) );
////
////	renderView.vieworg = GetPhysics().GetOrigin();
////	renderView.fov_x = 120;
////	renderView.fov_y = 120;
////	renderView.viewaxis = GetPhysics().GetAxis();
////
////	// copy global shader parms
////	for( int i = 0; i < MAX_GLOBAL_SHADER_PARMS; i++ ) {
////		renderView.shaderParms[ i ] = gameLocal.globalShaderParms[ i ];
////	}
////
////	renderView.globalMaterial = gameLocal.GetGlobalMaterial();
////
////	renderView.time = gameLocal.time;
////
////	return renderView;
////}
////
/////***********************************************************************
////
////  Sound
////	
////***********************************************************************/
////
/////*
////================
////idEntity::CanPlayChatterSounds
////
////Used for playing chatter sounds on monsters.
////================
////*/
////bool idEntity::CanPlayChatterSounds( ):void const {
////	return true;
////}
////
/////*
////================
////idEntity::StartSound
////================
////*/
////bool idEntity::StartSound( const char *soundName, const s_channelType channel, int soundShaderFlags, bool broadcast, int *length ) {
////	const idSoundShader *shader;
////	const char *sound;
////
////	if ( length ) {
////		*length = 0;
////	}
////
////	// we should ALWAYS be playing sounds from the def.
////	// hardcoded sounds MUST be avoided at all times because they won't get precached.
////	assert( idStr::Icmpn( soundName, "snd_", 4 ) == 0 );
////
////	if ( !spawnArgs.GetString( soundName, "", &sound ) ) {
////		return false;
////	}
////
////	if ( sound[0] == '\0' ) {
////		return false;
////	}
////
////	if ( !gameLocal.isNewFrame ) {
////		// don't play the sound, but don't report an error
////		return true;
////	}
////
////	shader = declManager.FindSound( sound );
////	return StartSoundShader( shader, channel, soundShaderFlags, broadcast, length );
////}
////
/////*
////================
////idEntity::StartSoundShader
////================
////*/
////bool idEntity::StartSoundShader( const idSoundShader *shader, const s_channelType channel, int soundShaderFlags, bool broadcast, int *length ) {
////	float diversity;
////	int len;
////
////	if ( length ) {
////		*length = 0;
////	}
////
////	if ( !shader ) {
////		return false;
////	}
////
////	if ( !gameLocal.isNewFrame ) {
////		return true;
////	}
////
////	if ( gameLocal.isServer && broadcast ) {
////		idBitMsg	msg;
////		byte		msgBuf[MAX_EVENT_PARAM_SIZE];
////
////		msg.Init( msgBuf, sizeof( msgBuf ) );
////		msg.BeginWriting();
////		msg.WriteLong( gameLocal.ServerRemapDecl( -1, DECL_SOUND, shader.Index() ) );
////		msg.WriteByte( channel );
////		ServerSendEvent( EVENT_STARTSOUNDSHADER, &msg, false, -1 );
////	}
////
////	// set a random value for diversity unless one was parsed from the entity
////	if ( refSound.diversity < 0.0f ) {
////		diversity = gameLocal.random.RandomFloat();
////	} else {
////		diversity = refSound.diversity;
////	}
////
////	// if we don't have a soundEmitter allocated yet, get one now
////	if ( !refSound.referenceSound ) {
////		refSound.referenceSound = gameSoundWorld.AllocSoundEmitter();
////	}
////
////	UpdateSound();
////
////	len = refSound.referenceSound.StartSound( shader, channel, diversity, soundShaderFlags );
////	if ( length ) {
////		*length = len;
////	}
////
////	// set reference to the sound for shader synced effects
////	renderEntity.referenceSound = refSound.referenceSound;
////
////	return true;
////}
////
/////*
////================
////idEntity::StopSound
////================
////*/
////idEntity.prototype.StopSound( const s_channelType channel, bool broadcast ) {
////	if ( !gameLocal.isNewFrame ) {
////		return;
////	}
////
////	if ( gameLocal.isServer && broadcast ) {
////		idBitMsg	msg;
////		byte		msgBuf[MAX_EVENT_PARAM_SIZE];
////
////		msg.Init( msgBuf, sizeof( msgBuf ) );
////		msg.BeginWriting();
////		msg.WriteByte( channel );
////		ServerSendEvent( EVENT_STOPSOUNDSHADER, &msg, false, -1 );
////	}
////
////	if ( refSound.referenceSound ) {
////		refSound.referenceSound.StopSound( channel );
////	}
////}
////
/////*
////================
////idEntity::SetSoundVolume
////
////  Must be called before starting a new sound.
////================
////*/
////idEntity.prototype.SetSoundVolume( float volume ) {
////	refSound.parms.volume = volume;
////}
////
/////*
////================
////idEntity::UpdateSound
////================
////*/
////idEntity.prototype.UpdateSound( ):void {
////	if ( refSound.referenceSound ) {
////		idVec3 origin;
////		idMat3 axis;
////
////		if ( GetPhysicsToSoundTransform( origin, axis ) ) {
////			refSound.origin = GetPhysics().GetOrigin() + origin * axis;
////		} else {
////			refSound.origin = GetPhysics().GetOrigin();
////		}
////
////		refSound.referenceSound.UpdateEmitter( refSound.origin, refSound.listenerId, &refSound.parms );
////	}
////}
////
/////*
////================
////idEntity::GetListenerId
////================
////*/
////int idEntity::GetListenerId( ):void const {
////	return refSound.listenerId;
////}
////
/////*
////================
////idEntity::GetSoundEmitter
////================
////*/
////idSoundEmitter *idEntity::GetSoundEmitter( ):void const {
////	return refSound.referenceSound;
////}
////
/////*
////================
////idEntity::FreeSoundEmitter
////================
////*/
////idEntity.prototype.FreeSoundEmitter( bool immediate ) {
////	if ( refSound.referenceSound ) {
////		refSound.referenceSound.Free( immediate );
////		refSound.referenceSound = NULL;
////	}
////}
////
/////***********************************************************************
////
////  entity binding
////	
////***********************************************************************/
////
/////*
////================
////idEntity::PreBind
////================
////*/
////idEntity.prototype.PreBind( ):void {
////}
////
/////*
////================
////idEntity::PostBind
////================
////*/
////idEntity.prototype.PostBind( ):void {
////}
////
/////*
////================
////idEntity::PreUnbind
////================
////*/
////idEntity.prototype.PreUnbind( ):void {
////}
////
/////*
////================
////idEntity::PostUnbind
////================
////*/
////idEntity.prototype.PostUnbind( ):void {
////}
////
/////*
////================
////idEntity::InitBind
////================
////*/
////bool idEntity::InitBind( idEntity *master ) {
////
////	if ( master == this ) {
////		gameLocal.Error( "Tried to bind an object to itself." );
////		return false;
////	}
////
////	if ( this == gameLocal.world ) {
////		gameLocal.Error( "Tried to bind world to another entity" );
////		return false;
////	}
////
////	// unbind myself from my master
////	Unbind();
////
////	// add any bind constraints to an articulated figure
////	if ( master && IsType( idAFEntity_Base::Type ) ) {
////		static_cast<idAFEntity_Base *>(this).AddBindConstraints();
////	}
////
////	if ( !master || master == gameLocal.world ) {
////		// this can happen in scripts, so safely exit out.
////		return false;
////	}
////
////	return true;
////}
////
/////*
////================
////idEntity::FinishBind
////================
////*/
////idEntity.prototype.FinishBind( ):void {
////
////	// set the master on the physics object
////	physics.SetMaster( bindMaster, fl.bindOrientated );
////
////	// We are now separated from our previous team and are either
////	// an individual, or have a team of our own.  Now we can join
////	// the new bindMaster's team.  Bindmaster must be set before
////	// joining the team, or we will be placed in the wrong position
////	// on the team.
////	JoinTeam( bindMaster );
////
////	// if our bindMaster is enabled during a cinematic, we must be, too
////	cinematic = bindMaster.cinematic;
////
////	// make sure the team master is active so that physics get run
////	teamMaster.BecomeActive( TH_PHYSICS );
////}
////
/////*
////================
////idEntity::Bind
////
////  bind relative to the visual position of the master
////================
////*/
////idEntity.prototype.Bind( idEntity *master, bool orientated ) {
////
////	if ( !InitBind( master ) ) {
////		return;
////	}
////
////	PreBind();
////
////	bindJoint = INVALID_JOINT;
////	bindBody = -1;
////	bindMaster = master;
////	fl.bindOrientated = orientated;
////
////	FinishBind();
////
////	PostBind( );
////}
////
/////*
////================
////idEntity::BindToJoint
////
////  bind relative to a joint of the md5 model used by the master
////================
////*/
////idEntity.prototype.BindToJoint( idEntity *master, jointname:string, bool orientated ) {
////	jointHandle_t	jointnum;
////	idAnimator		*masterAnimator;
////
////	if ( !InitBind( master ) ) {
////		return;
////	}
////
////	masterAnimator = master.GetAnimator();
////	if ( !masterAnimator ) {
////		gameLocal.Warning( "idEntity::BindToJoint: entity '%s' cannot support skeletal models.", master.GetName() );
////		return;
////	}
////
////	jointnum = masterAnimator.GetJointHandle( jointname );
////	if ( jointnum == INVALID_JOINT ) {
////		gameLocal.Warning( "idEntity::BindToJoint: joint '%s' not found on entity '%s'.", jointname, master.GetName() );
////	}
////
////	PreBind();
////
////	bindJoint = jointnum;
////	bindBody = -1;
////	bindMaster = master;
////	fl.bindOrientated = orientated;
////
////	FinishBind();
////
////	PostBind();
////}
////
/////*
////================
////idEntity::BindToJoint
////
////  bind relative to a joint of the md5 model used by the master
////================
////*/
////idEntity.prototype.BindToJoint( idEntity *master, jointnum:jointHandle_t, bool orientated ) {
////
////	if ( !InitBind( master ) ) {
////		return;
////	}
////
////	PreBind();
////
////	bindJoint = jointnum;
////	bindBody = -1;
////	bindMaster = master;
////	fl.bindOrientated = orientated;
////
////	FinishBind();
////
////	PostBind();
////}
////
/////*
////================
////idEntity::BindToBody
////
////  bind relative to a collision model used by the physics of the master
////================
////*/
////idEntity.prototype.BindToBody( idEntity *master, int bodyId, bool orientated ) {
////
////	if ( !InitBind( master ) ) {
////		return;
////	}
////
////	if ( bodyId < 0 ) {
////		gameLocal.Warning( "idEntity::BindToBody: body '%d' not found.", bodyId );
////	}
////
////	PreBind();
////
////	bindJoint = INVALID_JOINT;
////	bindBody = bodyId;
////	bindMaster = master;
////	fl.bindOrientated = orientated;
////
////	FinishBind();
////
////	PostBind();
////}
////
/////*
////================
////idEntity::Unbind
////================
////*/
////idEntity.prototype.Unbind( ):void {
////	idEntity *	prev;
////	idEntity *	next;
////	idEntity *	last;
////	idEntity *	ent;
////
////	// remove any bind constraints from an articulated figure
////	if ( IsType( idAFEntity_Base::Type ) ) {
////		static_cast<idAFEntity_Base *>(this).RemoveBindConstraints();
////	}
////
////	if ( !bindMaster ) {
////		return;
////	}
////
////	if ( !teamMaster ) {
////		// Teammaster already has been freed
////		bindMaster = NULL;
////		return;
////	}
////
////	PreUnbind();
////
////	if ( physics ) {
////		physics.SetMaster( NULL, fl.bindOrientated );
////	}
////
////	// We're still part of a team, so that means I have to extricate myself
////	// and any entities that are bound to me from the old team.
////	// Find the node previous to me in the team
////	prev = teamMaster;
////	for( ent = teamMaster.teamChain; ent && ( ent != this ); ent = ent.teamChain ) {
////		prev = ent;
////	}
////
////	assert( ent == this ); // If ent is not pointing to this, then something is very wrong.
////
////	// Find the last node in my team that is bound to me.
////	// Also find the first node not bound to me, if one exists.
////	last = this;
////	for( next = teamChain; next != NULL; next = next.teamChain ) {
////		if ( !next.IsBoundTo( this ) ) {
////			break;
////		}
////
////		// Tell them I'm now the teamMaster
////		next.teamMaster = this;
////		last = next;
////	}
////
////	// disconnect the last member of our team from the old team
////	last.teamChain = NULL;
////
////	// connect up the previous member of the old team to the node that
////	// follow the last node bound to me (if one exists).
////	if ( teamMaster != this ) {
////		prev.teamChain = next;
////		if ( !next && ( teamMaster == prev ) ) {
////			prev.teamMaster = NULL;
////		}
////	} else if ( next ) {
////		// If we were the teamMaster, then the nodes that were not bound to me are now
////		// a disconnected chain.  Make them into their own team.
////		for( ent = next; ent.teamChain != NULL; ent = ent.teamChain ) {
////			ent.teamMaster = next;
////		}
////		next.teamMaster = next;
////	}
////
////	// If we don't have anyone on our team, then clear the team variables.
////	if ( teamChain ) {
////		// make myself my own team
////		teamMaster = this;
////	} else {
////		// no longer a team
////		teamMaster = NULL;
////	}
////
////	bindJoint = INVALID_JOINT;
////	bindBody = -1;
////	bindMaster = NULL;
////
////	PostUnbind();
////}
////
/////*
////================
////idEntity::RemoveBinds
////================
////*/
////idEntity.prototype.RemoveBinds( ):void {
////	var ent:idEntity
////	idEntity *next;
////
////	for( ent = teamChain; ent != NULL; ent = next ) {
////		next = ent.teamChain;
////		if ( ent.bindMaster == this ) {
////			ent.Unbind();
////			ent.PostEventMS( &EV_Remove, 0 );
////			next = teamChain;
////		}
////	}
////}
////
/////*
////================
////idEntity::IsBound
////================
////*/
////bool idEntity::IsBound( ):void const {
////	if ( bindMaster ) {
////		return true;
////	}
////	return false;
////}
////
/////*
////================
////idEntity::IsBoundTo
////================
////*/
////bool idEntity::IsBoundTo( idEntity *master ) const {
////	var ent:idEntity
////
////	if ( !bindMaster ) {
////		return false;
////	}
////
////	for ( ent = bindMaster; ent != NULL; ent = ent.bindMaster ) {
////		if ( ent == master ) {
////			return true;
////		}
////	}
////
////	return false;
////}
////
/////*
////================
////idEntity::GetBindMaster
////================
////*/
////idEntity *idEntity::GetBindMaster( ):void const {
////	return bindMaster;
////}
////
/////*
////================
////idEntity::GetBindJoint
////================
////*/
////jointHandle_t idEntity::GetBindJoint( ):void const {
////	return bindJoint;
////}
////
/////*
////================
////idEntity::GetBindBody
////================
////*/
////int idEntity::GetBindBody( ):void const {
////	return bindBody;
////}
////
/////*
////================
////idEntity::GetTeamMaster
////================
////*/
////idEntity *idEntity::GetTeamMaster( ):void const {
////	return teamMaster;
////}
////
/////*
////================
////idEntity::GetNextTeamEntity
////================
////*/
////idEntity *idEntity::GetNextTeamEntity( ):void const {
////	return teamChain;
////}
////
/////*
////=====================
////idEntity::ConvertLocalToWorldTransform
////=====================
////*/
////idEntity.prototype.ConvertLocalToWorldTransform( idVec3 &offset, idMat3 &axis ) {
////	UpdateModelTransform();
////
////	offset = renderEntity.origin + offset * renderEntity.axis;
////	axis *= renderEntity.axis;
////}
////
/////*
////================
////idEntity::GetLocalVector
////
////Takes a vector in worldspace and transforms it into the parent
////object's localspace.
////
////Note: Does not take origin into acount.  Use getLocalCoordinate to
////convert coordinates.
////================
////*/
////idVec3 idEntity::GetLocalVector( const vec:idVec3 ) const {
////	idVec3	pos;
////
////	if ( !bindMaster ) {
////		return vec;
////	}
////
////	idVec3	masterOrigin;
////	idMat3	masterAxis;
////
////	GetMasterPosition( masterOrigin, masterAxis );
////	masterAxis.ProjectVector( vec, pos );
////
////	return pos;
////}
////
/////*
////================
////idEntity::GetLocalCoordinates
////
////Takes a vector in world coordinates and transforms it into the parent
////object's local coordinates.
////================
////*/
////idVec3 idEntity::GetLocalCoordinates( vec:idVec3 ) const {
////	idVec3	pos;
////
////	if ( !bindMaster ) {
////		return vec;
////	}
////
////	idVec3	masterOrigin;
////	idMat3	masterAxis;
////
////	GetMasterPosition( masterOrigin, masterAxis );
////	masterAxis.ProjectVector( vec - masterOrigin, pos );
////
////	return pos;
////}
////
/////*
////================
////idEntity::GetWorldVector
////
////Takes a vector in the parent object's local coordinates and transforms
////it into world coordinates.
////
////Note: Does not take origin into acount.  Use getWorldCoordinate to
////convert coordinates.
////================
////*/
////idVec3 idEntity::GetWorldVector( vec:idVec3 ) const {
////	idVec3	pos;
////
////	if ( !bindMaster ) {
////		return vec;
////	}
////
////	idVec3	masterOrigin;
////	idMat3	masterAxis;
////
////	GetMasterPosition( masterOrigin, masterAxis );
////	masterAxis.UnprojectVector( vec, pos );
////
////	return pos;
////}
////
/////*
////================
////idEntity::GetWorldCoordinates
////
////Takes a vector in the parent object's local coordinates and transforms
////it into world coordinates.
////================
////*/
////idVec3 idEntity::GetWorldCoordinates( vec:idVec3 ) const {
////	idVec3	pos;
////
////	if ( !bindMaster ) {
////		return vec;
////	}
////
////	idVec3	masterOrigin;
////	idMat3	masterAxis;
////
////	GetMasterPosition( masterOrigin, masterAxis );
////	masterAxis.UnprojectVector( vec, pos );
////	pos += masterOrigin;
////
////	return pos;
////}
////
/////*
////================
////idEntity::GetMasterPosition
////================
////*/
////bool idEntity::GetMasterPosition( idVec3 &masterOrigin, idMat3 &masterAxis ) const {
////	idVec3		localOrigin;
////	idMat3		localAxis;
////	idAnimator	*masterAnimator;
////
////	if ( bindMaster ) {
////		// if bound to a joint of an animated model
////		if ( bindJoint != INVALID_JOINT ) {
////			masterAnimator = bindMaster.GetAnimator();
////			if ( !masterAnimator ) {
////				masterOrigin = vec3_origin;
////				masterAxis = mat3_identity;
////				return false;
////			} else {
////				masterAnimator.GetJointTransform( bindJoint, gameLocal.time, masterOrigin, masterAxis );
////				masterAxis *= bindMaster.renderEntity.axis;
////				masterOrigin = bindMaster.renderEntity.origin + masterOrigin * bindMaster.renderEntity.axis;
////			}
////		} else if ( bindBody >= 0 && bindMaster.GetPhysics() ) {
////			masterOrigin = bindMaster.GetPhysics().GetOrigin( bindBody );
////			masterAxis = bindMaster.GetPhysics().GetAxis( bindBody );
////		} else {
////			masterOrigin = bindMaster.renderEntity.origin;
////			masterAxis = bindMaster.renderEntity.axis;
////		}
////		return true;
////	} else {
////		masterOrigin = vec3_origin;
////		masterAxis = mat3_identity;
////		return false;
////	}
////}
////
/////*
////================
////idEntity::GetWorldVelocities
////================
////*/
////idEntity.prototype.GetWorldVelocities( idVec3 &linearVelocity, idVec3 &angularVelocity ) const {
////
////	linearVelocity = physics.GetLinearVelocity();
////	angularVelocity = physics.GetAngularVelocity();
////
////	if ( bindMaster ) {
////		idVec3 masterOrigin, masterLinearVelocity, masterAngularVelocity;
////		idMat3 masterAxis;
////
////		// get position of master
////		GetMasterPosition( masterOrigin, masterAxis );
////
////		// get master velocities
////		bindMaster.GetWorldVelocities( masterLinearVelocity, masterAngularVelocity );
////
////		// linear velocity relative to master plus master linear and angular velocity
////		linearVelocity = linearVelocity * masterAxis + masterLinearVelocity +
////								masterAngularVelocity.Cross( GetPhysics().GetOrigin() - masterOrigin );
////	}
////}
////
/////*
////================
////idEntity::JoinTeam
////================
////*/
////idEntity.prototype.JoinTeam( idEntity *teammember ) {
////	var ent:idEntity
////	idEntity *master;
////	idEntity *prev;
////	idEntity *next;
////
////	// if we're already on a team, quit it so we can join this one
////	if ( teamMaster && ( teamMaster != this ) ) {
////		QuitTeam();
////	}
////
////	assert( teammember );
////
////	if ( teammember == this ) {
////		teamMaster = this;
////		return;
////	}
////
////	// check if our new team mate is already on a team
////	master = teammember.teamMaster;
////	if ( !master ) {
////		// he's not on a team, so he's the new teamMaster
////		master = teammember;
////		teammember.teamMaster = teammember;
////		teammember.teamChain = this;
////
////		// make anyone who's bound to me part of the new team
////		for( ent = teamChain; ent != NULL; ent = ent.teamChain ) {
////			ent.teamMaster = master;
////		}
////	} else {
////		// skip past the chain members bound to the entity we're teaming up with
////		prev = teammember;
////		next = teammember.teamChain;
////		if ( bindMaster ) {
////			// if we have a bindMaster, join after any entities bound to the entity
////			// we're joining
////			while( next && next.IsBoundTo( teammember ) ) {
////				prev = next;
////				next = next.teamChain;
////			}
////		} else {
////			// if we're not bound to someone, then put us at the end of the team
////			while( next ) {
////				prev = next;
////				next = next.teamChain;
////			}
////		}
////
////		// make anyone who's bound to me part of the new team and
////		// also find the last member of my team
////		for( ent = this; ent.teamChain != NULL; ent = ent.teamChain ) {
////			ent.teamChain.teamMaster = master;
////		}
////
////    	prev.teamChain = this;
////		ent.teamChain = next;
////	}
////
////	teamMaster = master;
////
////	// reorder the active entity list 
////	gameLocal.sortTeamMasters = true;
////}
////
/////*
////================
////idEntity::QuitTeam
////================
////*/
////idEntity.prototype.QuitTeam( ):void {
////	var ent:idEntity
////
////	if ( !teamMaster ) {
////		return;
////	}
////
////	// check if I'm the teamMaster
////	if ( teamMaster == this ) {
////		// do we have more than one teammate?
////		if ( !teamChain.teamChain ) {
////			// no, break up the team
////			teamChain.teamMaster = NULL;
////		} else {
////			// yes, so make the first teammate the teamMaster
////			for( ent = teamChain; ent; ent = ent.teamChain ) {
////				ent.teamMaster = teamChain;
////			}
////		}
////	} else {
////		assert( teamMaster );
////		assert( teamMaster.teamChain );
////
////		// find the previous member of the teamChain
////		ent = teamMaster;
////		while( ent.teamChain != this ) {
////			assert( ent.teamChain ); // this should never happen
////			ent = ent.teamChain;
////		}
////
////		// remove this from the teamChain
////		ent.teamChain = teamChain;
////
////		// if no one is left on the team, break it up
////		if ( !teamMaster.teamChain ) {
////			teamMaster.teamMaster = NULL;
////		}
////	}
////
////	teamMaster = NULL;
////	teamChain = NULL;
////}
////
/////***********************************************************************
////
////  Physics.
////	
////***********************************************************************/
////
/////*
////================
////idEntity::InitDefaultPhysics
////================
////*/
////idEntity.prototype.InitDefaultPhysics( const idVec3 &origin, const idMat3 &axis ) {
////	const char *temp;
////	idClipModel *clipModel = NULL;
////
////	// check if a clipmodel key/value pair is set
////	if ( this.spawnArgs.GetString( "clipmodel", "", &temp ) ) {
////		if ( idClipModel::CheckModel( temp ) ) {
////			clipModel = new idClipModel( temp );
////		}
////	}
////
////	if ( !spawnArgs.GetBool( "noclipmodel", "0" ) ) {
////
////		// check if mins/maxs or size key/value pairs are set
////		if ( !clipModel ) {
////			idVec3 size;
////			idBounds bounds;
////			bool setClipModel = false;
////
////			if ( this.spawnArgs.GetVector( "mins", NULL, bounds[0] ) &&
////				this.spawnArgs.GetVector( "maxs", NULL, bounds[1] ) ) {
////				setClipModel = true;
////				if ( bounds[0][0] > bounds[1][0] || bounds[0][1] > bounds[1][1] || bounds[0][2] > bounds[1][2] ) {
////					gameLocal.Error( "Invalid bounds '%s'-'%s' on entity '%s'", bounds[0].ToString(), bounds[1].ToString(), this.name.c_str() );
////				}
////			} else if ( this.spawnArgs.GetVector( "size", NULL, size ) ) {
////				if ( ( size.x < 0.0f ) || ( size.y < 0.0f ) || ( size.z < 0.0f ) ) {
////					gameLocal.Error( "Invalid size '%s' on entity '%s'", size.ToString(), this.name.c_str() );
////				}
////				bounds[0].Set( size.x * -0.5f, size.y * -0.5f, 0.0f );
////				bounds[1].Set( size.x * 0.5f, size.y * 0.5f, size.z );
////				setClipModel = true;
////			}
////
////			if ( setClipModel ) {
////				int numSides;
////				idTraceModel trm;
////
////				if ( this.spawnArgs.GetInt( "cylinder", "0", numSides ) && numSides > 0 ) {
////					trm.SetupCylinder( bounds, numSides < 3 ? 3 : numSides );
////				} else if ( this.spawnArgs.GetInt( "cone", "0", numSides ) && numSides > 0 ) {
////					trm.SetupCone( bounds, numSides < 3 ? 3 : numSides );
////				} else {
////					trm.SetupBox( bounds );
////				}
////				clipModel = new idClipModel( trm );
////			}
////		}
////
////		// check if the visual model can be used as collision model
////		if ( !clipModel ) {
////			temp = this.spawnArgs.GetString( "model" );
////			if ( ( temp != NULL ) && ( *temp != 0 ) ) {
////				if ( idClipModel::CheckModel( temp ) ) {
////					clipModel = new idClipModel( temp );
////				}
////			}
////		}
////	}
////
////	defaultPhysicsObj.SetSelf( this );
////	defaultPhysicsObj.SetClipModel( clipModel, 1.0f );
////	defaultPhysicsObj.SetOrigin( origin );
////	defaultPhysicsObj.SetAxis( axis );
////
////	physics = &defaultPhysicsObj;
////}
////
/////*
////================
////idEntity::SetPhysics
////================
////*/
////idEntity.prototype.SetPhysics( idPhysics *phys ) {
////	// clear any contacts the current physics object has
////	if ( physics ) {
////		physics.ClearContacts();
////	}
////	// set new physics object or set the default physics if NULL
////	if ( phys != NULL ) {
////		defaultPhysicsObj.SetClipModel( NULL, 1.0f );
////		physics = phys;
////		physics.Activate();
////	} else {
////		physics = &defaultPhysicsObj;
////	}
////	physics.UpdateTime( gameLocal.time );
////	physics.SetMaster( bindMaster, fl.bindOrientated );
////}
////
/////*
////================
////idEntity::RestorePhysics
////================
////*/
////idEntity.prototype.RestorePhysics( idPhysics *phys ) {
////	assert( phys != NULL );
////	// restore physics pointer
////	physics = phys;
////}
////
/////*
////================
////idEntity::GetPhysics
////================
////*/
////idPhysics *idEntity::GetPhysics( ):void const {
////	return physics;
////}
////
/////*
////================
////idEntity::RunPhysics
////================
////*/
////bool idEntity::RunPhysics( ):void {
////	int			i, reachedTime, startTime, endTime;
////	idEntity *	part, *blockedPart, *blockingEntity = NULL;
////	trace_t		results;
////	bool		moved;
////
////	// don't run physics if not enabled
////	if ( !( thinkFlags & TH_PHYSICS ) ) {
////		// however do update any animation controllers
////		if ( UpdateAnimationControllers() ) {
////			BecomeActive( TH_ANIMATE );
////		}
////		return false;
////	}
////
////	// if this entity is a team slave don't do anything because the team master will handle everything
////	if ( teamMaster && teamMaster != this ) {
////		return false;
////	}
////
////	startTime = gameLocal.previousTime;
////	endTime = gameLocal.time;
////
////	gameLocal.push.InitSavingPushedEntityPositions();
////	blockedPart = NULL;
////
////	// save the physics state of the whole team and disable the team for collision detection
////	for ( part = this; part != NULL; part = part.teamChain ) {
////		if ( part.physics ) {
////			if ( !part.fl.solidForTeam ) {
////				part.physics.DisableClip();
////			}
////			part.physics.SaveState();
////		}
////	}
////
////	// move the whole team
////	for ( part = this; part != NULL; part = part.teamChain ) {
////
////		if ( part.physics ) {
////
////			// run physics
////			moved = part.physics.Evaluate( endTime - startTime, endTime );
////
////			// check if the object is blocked
////			blockingEntity = part.physics.GetBlockingEntity();
////			if ( blockingEntity ) {
////				blockedPart = part;
////				break;
////			}
////
////			// if moved or forced to update the visual position and orientation from the physics
////			if ( moved || part.fl.forcePhysicsUpdate ) {
////				part.UpdateFromPhysics( false );
////			}
////
////			// update any animation controllers here so an entity bound
////			// to a joint of this entity gets the correct position
////			if ( part.UpdateAnimationControllers() ) {
////				part.BecomeActive( TH_ANIMATE );
////			}
////		}
////	}
////
////	// enable the whole team for collision detection
////	for ( part = this; part != NULL; part = part.teamChain ) {
////		if ( part.physics ) {
////			if ( !part.fl.solidForTeam ) {
////				part.physics.EnableClip();
////			}
////		}
////	}
////
////	// if one of the team entities is a pusher and blocked
////	if ( blockedPart ) {
////		// move the parts back to the previous position
////		for ( part = this; part != blockedPart; part = part.teamChain ) {
////
////			if ( part.physics ) {
////
////				// restore the physics state
////				part.physics.RestoreState();
////
////				// move back the visual position and orientation
////				part.UpdateFromPhysics( true );
////			}
////		}
////		for ( part = this; part != NULL; part = part.teamChain ) {
////			if ( part.physics ) {
////				// update the physics time without moving
////				part.physics.UpdateTime( endTime );
////			}
////		}
////
////		// restore the positions of any pushed entities
////		gameLocal.push.RestorePushedEntityPositions();
////
////		if ( gameLocal.isClient ) {
////			return false;
////		}
////
////		// if the master pusher has a "blocked" function, call it
////		Signal( SIG_BLOCKED );
////		ProcessEvent( &EV_TeamBlocked, blockedPart, blockingEntity );
////		// call the blocked function on the blocked part
////		blockedPart.ProcessEvent( &EV_PartBlocked, blockingEntity );
////		return false;
////	}
////
////	// set pushed
////	for ( i = 0; i < gameLocal.push.GetNumPushedEntities(); i++ ) {
////		var ent:idEntity = gameLocal.push.GetPushedEntity( i );
////		ent.physics.SetPushed( endTime - startTime );
////	}
////
////	if ( gameLocal.isClient ) {
////		return true;
////	}
////
////	// post reached event if the current time is at or past the end point of the motion
////	for ( part = this; part != NULL; part = part.teamChain ) {
////
////		if ( part.physics ) {
////
////			reachedTime = part.physics.GetLinearEndTime();
////			if ( startTime < reachedTime && endTime >= reachedTime ) {
////				part.ProcessEvent( &EV_ReachedPos );
////			}
////			reachedTime = part.physics.GetAngularEndTime();
////			if ( startTime < reachedTime && endTime >= reachedTime ) {
////				part.ProcessEvent( &EV_ReachedAng );
////			}
////		}
////	}
////
////	return true;
////}
////
/////*
////================
////idEntity::UpdateFromPhysics
////================
////*/
////idEntity.prototype.UpdateFromPhysics( bool moveBack ) {
////
////	if ( IsType( idActor::Type ) ) {
////		idActor *actor = static_cast<idActor *>( this );
////
////		// set master delta angles for actors
////		if ( GetBindMaster() ) {
////			idAngles delta = actor.GetDeltaViewAngles();
////			if ( moveBack ) {
////				delta.yaw -= static_cast<idPhysics_Actor *>(physics).GetMasterDeltaYaw();
////			} else {
////				delta.yaw += static_cast<idPhysics_Actor *>(physics).GetMasterDeltaYaw();
////			}
////			actor.SetDeltaViewAngles( delta );
////		}
////	}
////
////	UpdateVisuals();
////}
////
/////*
////================
////idEntity::SetOrigin
////================
////*/
////idEntity.prototype.SetOrigin( const idVec3 &org ) {
////
////	GetPhysics().SetOrigin( org );
////
////	UpdateVisuals();
////}
////
/////*
////================
////idEntity::SetAxis
////================
////*/
////idEntity.prototype.SetAxis( const idMat3 &axis ) {
////
////	if ( GetPhysics().IsType( idPhysics_Actor::Type ) ) {
////		static_cast<idActor *>(this).viewAxis = axis;
////	} else {
////		GetPhysics().SetAxis( axis );
////	}
////
////	UpdateVisuals();
////}
////
/////*
////================
////idEntity::SetAngles
////================
////*/
////idEntity.prototype.SetAngles( const ang:idAngles ) {
////	SetAxis( ang.ToMat3() );
////}
////
/////*
////================
////idEntity::GetFloorPos
////================
////*/
////bool idEntity::GetFloorPos( float max_dist, idVec3 &floorpos ) const {
////	trace_t result;
////
////	if ( !GetPhysics().HasGroundContacts() ) {
////		GetPhysics().ClipTranslation( result, GetPhysics().GetGravityNormal() * max_dist, NULL );
////		if ( result.fraction < 1.0f ) {
////			floorpos = result.endpos;
////			return true;
////		} else {
////			floorpos = GetPhysics().GetOrigin();
////			return false;
////		}
////	} else {
////		floorpos = GetPhysics().GetOrigin();
////		return true;
////	}
////}
////
/////*
////================
////idEntity::GetPhysicsToVisualTransform
////================
////*/
////bool idEntity::GetPhysicsToVisualTransform( idVec3 &origin, idMat3 &axis ) {
////	return false;
////}
////
/////*
////================
////idEntity::GetPhysicsToSoundTransform
////================
////*/
////bool idEntity::GetPhysicsToSoundTransform( idVec3 &origin, idMat3 &axis ) {
////	// by default play the sound at the center of the bounding box of the first clip model
////	if ( GetPhysics().GetNumClipModels() > 0 ) {
////		origin = GetPhysics().GetBounds().GetCenter();
////		axis.Identity();
////		return true;
////	}
////	return false;
////}
////
/////*
////================
////idEntity::Collide
////================
////*/
////bool idEntity::Collide( const trace_t &collision, const idVec3 &velocity ) {
////	// this entity collides with collision.c.entityNum
////	return false;
////}
////
/////*
////================
////idEntity::GetImpactInfo
////================
////*/
////idEntity.prototype.GetImpactInfo( ent:idEntity, int id, const idVec3 &point, impactInfo_t *info ) {
////	GetPhysics().GetImpactInfo( id, point, info );
////}
////
/////*
////================
////idEntity::ApplyImpulse
////================
////*/
////idEntity.prototype.ApplyImpulse( ent:idEntity, int id, const idVec3 &point, const idVec3 &impulse ) {
////	GetPhysics().ApplyImpulse( id, point, impulse );
////}
////
/////*
////================
////idEntity::AddForce
////================
////*/
////idEntity.prototype.AddForce( ent:idEntity, int id, const idVec3 &point, const idVec3 &force ) {
////	GetPhysics().AddForce( id, point, force );
////}
////
/////*
////================
////idEntity::ActivatePhysics
////================
////*/
////idEntity.prototype.ActivatePhysics( ent:idEntity ) {
////	GetPhysics().Activate();
////}
////
/////*
////================
////idEntity::IsAtRest
////================
////*/
////bool idEntity::IsAtRest( ):void const {
////	return GetPhysics().IsAtRest();
////}
////
/////*
////================
////idEntity::GetRestStartTime
////================
////*/
////int idEntity::GetRestStartTime( ):void const {
////	return GetPhysics().GetRestStartTime();
////}
////
/////*
////================
////idEntity::AddContactEntity
////================
////*/
////idEntity.prototype.AddContactEntity( ent:idEntity ) {
////	GetPhysics().AddContactEntity( ent );
////}
////
/////*
////================
////idEntity::RemoveContactEntity
////================
////*/
////idEntity.prototype.RemoveContactEntity( ent:idEntity ) {
////	GetPhysics().RemoveContactEntity( ent );
////}
////
////
////
/////***********************************************************************
////
////	Damage
////	
////***********************************************************************/
////
/////*
////============
////idEntity::CanDamage
////
////Returns true if the inflictor can directly damage the target.  Used for
////explosions and melee attacks.
////============
////*/
////bool idEntity::CanDamage( const idVec3 &origin, idVec3 &damagePoint ) const {
////	idVec3 	dest;
////	trace_t	tr;
////	idVec3 	midpoint;
////
////	// use the midpoint of the bounds instead of the origin, because
////	// bmodels may have their origin at 0,0,0
////	midpoint = ( GetPhysics().GetAbsBounds()[0] + GetPhysics().GetAbsBounds()[1] ) * 0.5;
////
////	dest = midpoint;
////	gameLocal.clip.TracePoint( tr, origin, dest, MASK_SOLID, NULL );
////	if ( tr.fraction == 1.0 || ( gameLocal.GetTraceEntity( tr ) == this ) ) {
////		damagePoint = tr.endpos;
////		return true;
////	}
////
////	// this should probably check in the plane of projection, rather than in world coordinate
////	dest = midpoint;
////	dest[0] += 15.0;
////	dest[1] += 15.0;
////	gameLocal.clip.TracePoint( tr, origin, dest, MASK_SOLID, NULL );
////	if ( tr.fraction == 1.0 || ( gameLocal.GetTraceEntity( tr ) == this ) ) {
////		damagePoint = tr.endpos;
////		return true;
////	}
////
////	dest = midpoint;
////	dest[0] += 15.0;
////	dest[1] -= 15.0;
////	gameLocal.clip.TracePoint( tr, origin, dest, MASK_SOLID, NULL );
////	if ( tr.fraction == 1.0 || ( gameLocal.GetTraceEntity( tr ) == this ) ) {
////		damagePoint = tr.endpos;
////		return true;
////	}
////
////	dest = midpoint;
////	dest[0] -= 15.0;
////	dest[1] += 15.0;
////	gameLocal.clip.TracePoint( tr, origin, dest, MASK_SOLID, NULL );
////	if ( tr.fraction == 1.0 || ( gameLocal.GetTraceEntity( tr ) == this ) ) {
////		damagePoint = tr.endpos;
////		return true;
////	}
////
////	dest = midpoint;
////	dest[0] -= 15.0;
////	dest[1] -= 15.0;
////	gameLocal.clip.TracePoint( tr, origin, dest, MASK_SOLID, NULL );
////	if ( tr.fraction == 1.0 || ( gameLocal.GetTraceEntity( tr ) == this ) ) {
////		damagePoint = tr.endpos;
////		return true;
////	}
////
////	dest = midpoint;
////	dest[2] += 15.0;
////	gameLocal.clip.TracePoint( tr, origin, dest, MASK_SOLID, NULL );
////	if ( tr.fraction == 1.0 || ( gameLocal.GetTraceEntity( tr ) == this ) ) {
////		damagePoint = tr.endpos;
////		return true;
////	}
////
////	dest = midpoint;
////	dest[2] -= 15.0;
////	gameLocal.clip.TracePoint( tr, origin, dest, MASK_SOLID, NULL );
////	if ( tr.fraction == 1.0 || ( gameLocal.GetTraceEntity( tr ) == this ) ) {
////		damagePoint = tr.endpos;
////		return true;
////	}
////
////	return false;
////}
////
/////*
////================
////idEntity::DamageFeedback
////
////callback function for when another entity received damage from this entity.  damage can be adjusted and returned to the caller.
////================
////*/
////idEntity.prototype.DamageFeedback( idEntity *victim, idEntity *inflictor, int &damage ) {
////	// implemented in subclasses
////}
////
/////*
////============
////Damage
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
////============
////*/
////idEntity.prototype.Damage( idEntity *inflictor, idEntity *attacker, const idVec3 &dir, 
////					  const char *damageDefName, const float damageScale, const int location ) {
////	if ( !fl.takedamage ) {
////		return;
////	}
////
////	if ( !inflictor ) {
////		inflictor = gameLocal.world;
////	}
////
////	if ( !attacker ) {
////		attacker = gameLocal.world;
////	}
////
////	const idDict *damageDef = gameLocal.FindEntityDefDict( damageDefName );
////	if ( !damageDef ) {
////		gameLocal.Error( "Unknown damageDef '%s'\n", damageDefName );
////	}
////
////	int	damage = damageDef.GetInt( "damage" );
////
////	// inform the attacker that they hit someone
////	attacker.DamageFeedback( this, inflictor, damage );
////	if ( damage ) {
////		// do the damage
////		health -= damage;
////		if ( health <= 0 ) {
////			if ( health < -999 ) {
////				health = -999;
////			}
////
////			Killed( inflictor, attacker, damage, dir, location );
////		} else {
////			Pain( inflictor, attacker, damage, dir, location );
////		}
////	}
////}
////
/////*
////================
////idEntity::AddDamageEffect
////================
////*/
////idEntity.prototype.AddDamageEffect( const trace_t &collision, const idVec3 &velocity, const char *damageDefName ) {
////	const char *sound, *decal, *key;
////
////	const idDeclEntityDef *def = gameLocal.FindEntityDef( damageDefName, false );
////	if ( def == NULL ) {
////		return;
////	}
////
////	const char *materialType = gameLocal.sufaceTypeNames[ collision.c.material.GetSurfaceType() ];
////
////	// start impact sound based on material type
////	key = va( "snd_%s", materialType );
////	sound = this.spawnArgs.GetString( key );
////	if ( *sound == '\0' ) {
////		sound = def.dict.GetString( key );
////	}
////	if ( *sound != '\0' ) {
////		StartSoundShader( declManager.FindSound( sound ), SND_CHANNEL_BODY, 0, false, NULL );
////	}
////
////	if ( g_decals.GetBool() ) {
////		// place a wound overlay on the model
////		key = va( "mtr_wound_%s", materialType );
////		decal = this.spawnArgs.RandomPrefix( key, gameLocal.random );
////		if ( *decal == '\0' ) {
////			decal = def.dict.RandomPrefix( key, gameLocal.random );
////		}
////		if ( *decal != '\0' ) {
////			idVec3 dir = velocity;
////			dir.Normalize();
////			ProjectOverlay( collision.c.point, dir, 20.0f, decal );
////		}
////	}
////}
////
/////*
////============
////idEntity::Pain
////
////Called whenever an entity recieves damage.  Returns whether the entity responds to the pain.
////This is a virtual function that subclasses are expected to implement.
////============
////*/
////bool idEntity::Pain( idEntity *inflictor, idEntity *attacker, int damage, const idVec3 &dir, int location ) {
////	return false;
////}
////
/////*
////============
////idEntity::Killed
////
////Called whenever an entity's health is reduced to 0 or less.
////This is a virtual function that subclasses are expected to implement.
////============
////*/
////idEntity.prototype.Killed( idEntity *inflictor, idEntity *attacker, int damage, const idVec3 &dir, int location ) {
////}
////
////
/////***********************************************************************
////
////  Script functions
////	
////***********************************************************************/
////
/////*
////================
////idEntity::ShouldConstructScriptObjectAtSpawn
////
////Called during idEntity::Spawn to see if it should construct the script object or not.
////Overridden by subclasses that need to spawn the script object themselves.
////================
////*/
////bool idEntity::ShouldConstructScriptObjectAtSpawn( ):void const {
////	return true;
////}
////
/////*
////================
////idEntity::ConstructScriptObject
////
////Called during idEntity::Spawn.  Calls the constructor on the script object.
////Can be overridden by subclasses when a thread doesn't need to be allocated.
////================
////*/
////idThread *idEntity::ConstructScriptObject( ):void {
////	idThread *thread;
////	const function_t *constructor;
////
////	// init the script object's data
////	scriptObject.ClearObject();
////
////	// call script object's constructor
////	constructor = scriptObject.GetConstructor();
////	if ( constructor ) {
////		// start a thread that will initialize after Spawn is done being called
////		thread = new idThread();
////		thread.SetThreadName( this.name.c_str() );
////		thread.CallFunction( this, constructor, true );
////		thread.DelayedStart( 0 );
////	} else {
////		thread = NULL;
////	}
////
////	// clear out the object's memory
////	scriptObject.ClearObject();
////
////	return thread;
////}
////
/////*
////================
////idEntity::DeconstructScriptObject
////
////Called during idEntity::~idEntity.  Calls the destructor on the script object.
////Can be overridden by subclasses when a thread doesn't need to be allocated.
////Not called during idGameLocal::MapShutdown.
////================
////*/
////idEntity.prototype.DeconstructScriptObject( ):void {
////	idThread		*thread;
////	const function_t *destructor;
////
////	// don't bother calling the script object's destructor on map shutdown
////	if ( gameLocal.GameState() == GAMESTATE_SHUTDOWN ) {
////		return;
////	}
////
////	// call script object's destructor
////	destructor = scriptObject.GetDestructor();
////	if ( destructor ) {
////		// start a thread that will run immediately and be destroyed
////		thread = new idThread();
////		thread.SetThreadName( this.name.c_str() );
////		thread.CallFunction( this, destructor, true );
////		thread.Execute();
////		delete thread;
////	}
////}
////
/////*
////================
////idEntity::HasSignal
////================
////*/
////bool idEntity::HasSignal( signalNum_t signalnum ) const {
////	if ( !signals ) {
////		return false;
////	}
////	assert( ( signalnum >= 0 ) && ( signalnum < NUM_SIGNALS ) );
////	return ( signals.signal[ signalnum ].Num() > 0 );
////}
////
/////*
////================
////idEntity::SetSignal
////================
////*/
////idEntity.prototype.SetSignal( signalNum_t signalnum, idThread *thread, const function_t *function ) {
////	int			i;
////	int			num;
////	signal_t	sig;
////	int			threadnum;
////
////	assert( ( signalnum >= 0 ) && ( signalnum < NUM_SIGNALS ) );
////
////	if ( !signals ) {
////		signals = new signalList_t;
////	}
////
////	assert( thread );
////	threadnum = thread.GetThreadNum();
////
////	num = signals.signal[ signalnum ].Num();
////	for( i = 0; i < num; i++ ) {
////		if ( signals.signal[ signalnum ][ i ].threadnum == threadnum ) {
////			signals.signal[ signalnum ][ i ].function = function;
////			return;
////		}
////	}
////
////	if ( num >= MAX_SIGNAL_THREADS ) {
////		thread.Error( "Exceeded maximum number of signals per object" );
////	}
////
////	sig.threadnum = threadnum;
////	sig.function = function;
////	signals.signal[ signalnum ].Append( sig );
////}
////
/////*
////================
////idEntity::ClearSignal
////================
////*/
////idEntity.prototype.ClearSignal( idThread *thread, signalNum_t signalnum ) {
////	assert( thread );
////	if ( ( signalnum < 0 ) || ( signalnum >= NUM_SIGNALS ) ) {
////		gameLocal.Error( "Signal out of range" );
////	}
////
////	if ( !signals ) {
////		return;
////	}
////
////	signals.signal[ signalnum ].Clear();
////}
////
/////*
////================
////idEntity::ClearSignalThread
////================
////*/
////idEntity.prototype.ClearSignalThread( signalNum_t signalnum, idThread *thread ) {
////	int	i;
////	int	num;
////	int	threadnum;
////
////	assert( thread );
////
////	if ( ( signalnum < 0 ) || ( signalnum >= NUM_SIGNALS ) ) {
////		gameLocal.Error( "Signal out of range" );
////	}
////
////	if ( !signals ) {
////		return;
////	}
////
////	threadnum = thread.GetThreadNum();
////
////	num = signals.signal[ signalnum ].Num();
////	for( i = 0; i < num; i++ ) {
////		if ( signals.signal[ signalnum ][ i ].threadnum == threadnum ) {
////			signals.signal[ signalnum ].RemoveIndex( i );
////			return;
////		}
////	}
////}
////
/////*
////================
////idEntity::Signal
////================
////*/
////idEntity.prototype.Signal( signalNum_t signalnum ) {
////	int			i;
////	int			num;
////	signal_t	sigs[ MAX_SIGNAL_THREADS ];
////	idThread	*thread;
////
////	assert( ( signalnum >= 0 ) && ( signalnum < NUM_SIGNALS ) );
////
////	if ( !signals ) {
////		return;
////	}
////
////	// we copy the signal list since each thread has the potential
////	// to end any of the threads in the list.  By copying the list
////	// we don't have to worry about the list changing as we're
////	// processing it.
////	num = signals.signal[ signalnum ].Num();
////	for( i = 0; i < num; i++ ) {
////		sigs[ i ] = signals.signal[ signalnum ][ i ];
////	}
////
////	// clear out the signal list so that we don't get into an infinite loop
////	signals.signal[ signalnum ].Clear();
////
////	for( i = 0; i < num; i++ ) {
////		thread = idThread::GetThread( sigs[ i ].threadnum );
////		if ( thread ) {
////			thread.CallFunction( this, sigs[ i ].function, true );
////			thread.Execute();
////		}
////	}
////}
////
/////*
////================
////idEntity::SignalEvent
////================
////*/
////idEntity.prototype.SignalEvent( idThread *thread, signalNum_t signalnum ) {
////	if ( ( signalnum < 0 ) || ( signalnum >= NUM_SIGNALS ) ) {
////		gameLocal.Error( "Signal out of range" );
////	}
////
////	if ( !signals ) {
////		return;
////	}
////
////	Signal( signalnum );
////}
////
/////***********************************************************************
////
////  Guis.
////	
////***********************************************************************/
////
////
/////*
////================
////idEntity::TriggerGuis
////================
////*/
////idEntity.prototype.TriggerGuis( ):void {
////	int i;
////	for ( i = 0; i < MAX_RENDERENTITY_GUI; i++ ) {
////		if ( renderEntity.gui[ i ] ) {
////			renderEntity.gui[ i ].Trigger( gameLocal.time );
////		}
////	}
////}
////
/////*
////================
////idEntity::HandleGuiCommands
////================
////*/
////bool idEntity::HandleGuiCommands( idEntity *entityGui, const char *cmds ) {
////	idEntity *targetEnt;
////	bool ret = false;
////	if ( entityGui && cmds && *cmds ) {
////		idLexer src;
////		idToken token, token2, token3, token4;
////		src.LoadMemory( cmds, strlen( cmds ), "guiCommands" );
////		while( true ) {
////
////			if ( !src.ReadToken( &token ) ) {
////				return ret;
////			}
////
////			if ( token == ";" ) {
////				continue;
////			}
////
////			if ( token.Icmp( "activate" ) == 0 ) {
////				bool targets = true;
////				if ( src.ReadToken( &token2 ) ) {
////					if ( token2 == ";" ) {
////						src.UnreadToken( &token2 );
////					} else {
////						targets = false;
////					}
////				}
////
////				if ( targets ) {
////					entityGui.ActivateTargets( this );
////				} else {
////					var ent:idEntity = gameLocal.FindEntity( token2 );
////					if ( ent ) {
////						ent.Signal( SIG_TRIGGER );
////						ent.PostEventMS( &EV_Activate, 0, this );
////					}
////				}
////
////				entityGui.renderEntity.shaderParms[ SHADERPARM_MODE ] = 1.0f;
////				continue;
////			}
////
////
////			if ( token.Icmp( "runScript" ) == 0 ) {
////				if ( src.ReadToken( &token2 ) ) {
////					while( src.CheckTokenString( "::" ) ) {
////						idToken token3;
////						if ( !src.ReadToken( &token3 ) ) {
////							gameLocal.Error( "Expecting function name following '::' in gui for entity '%s'", entityGui.name.c_str() );
////						}
////						token2 += "::" + token3;
////					}
////					const function_t *func = gameLocal.program.FindFunction( token2 );
////					if ( !func ) {
////						gameLocal.Error( "Can't find function '%s' for gui in entity '%s'", token2.c_str(), entityGui.name.c_str() );
////					} else {
////						idThread *thread = new idThread( func );
////						thread.DelayedStart( 0 );
////					}
////				}
////				continue;
////			}
////
////			if ( token.Icmp("play") == 0 ) {
////				if ( src.ReadToken( &token2 ) ) {
////					const idSoundShader *shader = declManager.FindSound(token2);
////					entityGui.StartSoundShader( shader, SND_CHANNEL_ANY, 0, false, NULL );
////				}
////				continue;
////			}
////
////			if ( token.Icmp( "setkeyval" ) == 0 ) {
////				if ( src.ReadToken( &token2 ) && src.ReadToken(&token3) && src.ReadToken( &token4 ) ) {
////					var ent:idEntity = gameLocal.FindEntity( token2 );
////					if ( ent ) {
////						ent.spawnArgs.Set( token3, token4 );
////						ent.UpdateChangeableSpawnArgs( NULL );
////						ent.UpdateVisuals();
////					}
////				}
////				continue;
////			}
////
////			if ( token.Icmp( "setshaderparm" ) == 0 ) {
////				if ( src.ReadToken( &token2 ) && src.ReadToken(&token3) ) {
////					entityGui.SetShaderParm( atoi( token2 ), atof( token3 ) );
////					entityGui.UpdateVisuals();
////				}
////				continue;
////			}
////
////			if ( token.Icmp("close") == 0 ) {
////				ret = true;
////				continue;
////			}
////
////			if ( !token.Icmp( "turkeyscore" ) ) {
////				if ( src.ReadToken( &token2 ) && entityGui.renderEntity.gui[0] ) {
////					int score = entityGui.renderEntity.gui[0].State().GetInt( "score" );
////					score += atoi( token2 );
////					entityGui.renderEntity.gui[0].SetStateInt( "score", score );
////					if ( gameLocal.GetLocalPlayer() && score >= 25000 && !gameLocal.GetLocalPlayer().inventory.turkeyScore ) {
////						gameLocal.GetLocalPlayer().GiveEmail( "highScore" );
////						gameLocal.GetLocalPlayer().inventory.turkeyScore = true;
////					}
////				}
////				continue;
////			}
////
////
////			// handy for debugging GUI stuff
////			if ( !token.Icmp( "print" ) ) {
////				idStr msg;
////				while ( src.ReadToken( &token2 ) ) {
////					if ( token2 == ";" ) {
////						src.UnreadToken( &token2 );
////						break;
////					}
////					msg += token2.c_str();
////				}
////				common.Printf( "ent gui 0x%x '%s': %s\n", entityNumber, this.name.c_str(), msg.c_str() );
////				continue;
////			}
////
////			// if we get to this point we don't know how to handle it
////			src.UnreadToken(&token);
////			if ( !HandleSingleGuiCommand( entityGui, &src ) ) {
////				// not handled there see if entity or any of its targets can handle it
////				// this will only work for one target atm
////				if ( entityGui.HandleSingleGuiCommand( entityGui, &src ) ) {
////					continue;
////				}
////
////				int c = entityGui.targets.Num();
////				int i;
////				for ( i = 0; i < c; i++) {
////					targetEnt = entityGui.targets[ i ].GetEntity();
////					if ( targetEnt && targetEnt.HandleSingleGuiCommand( entityGui, &src ) ) {
////						break;
////					}
////				}
////
////				if ( i == c ) {
////					// not handled
////					common.DPrintf( "idEntity::HandleGuiCommands: '%s' not handled\n", token.c_str() );
////					src.ReadToken( &token );
////				}
////			}
////
////		}
////	}
////	return ret;
////}
////
/////*
////================
////idEntity::HandleSingleGuiCommand
////================
////*/
////bool idEntity::HandleSingleGuiCommand( idEntity *entityGui, idLexer *src ) {
////	return false;
////}

/***********************************************************************

  Targets
	
***********************************************************************/

/*
===============
idEntity::FindTargets

We have to wait until all entities are spawned
Used to build lists of targets after the entity is spawned.  Since not all entities
have been spawned when the entity is created at map load time, we have to wait
===============
*/
	FindTargets ( ): void {
		var /*int*/i: number;

		// targets can be a list of multiple names
		gameLocal.GetTargets( this.spawnArgs, this.targets, "target" );

		// ensure that we don't target ourselves since that could cause an infinite loop when activating entities
		for ( i = 0; i < this.targets.Num ( ); i++ ) {
			if ( this.targets[i].GetEntity ( ) == this ) {
				gameLocal.Error( "Entity '%s' is targeting itself", this.name.c_str ( ) );
			}
		}
	}

/////*
////================
////idEntity::RemoveNullTargets
////================
////*/
////idEntity.prototype.RemoveNullTargets( ):void {
////	int i;
////
////	for( i = this.targets.Num() - 1; i >= 0; i-- ) {
////		if ( !this.targets[ i ].GetEntity() ) {
////			this.targets.RemoveIndex( i );
////		}
////	}
////}
////
/////*
////==============================
////idEntity::ActivateTargets
////
////"activator" should be set to the entity that initiated the firing.
////==============================
////*/
////idEntity.prototype.ActivateTargets( activator:idEntity ) const {
////	idEntity	*ent;
////	int			i, j;
////	
////	for( i = 0; i < this.targets.Num(); i++ ) {
////		ent = this.targets[ i ].GetEntity();
////		if ( !ent ) {
////			continue;
////		}
////		if ( ent.RespondsTo( EV_Activate ) || ent.HasSignal( SIG_TRIGGER ) ) {
////			ent.Signal( SIG_TRIGGER );
////			ent.ProcessEvent( &EV_Activate, activator );
////		} 		
////		for ( j = 0; j < MAX_RENDERENTITY_GUI; j++ ) {
////			if ( ent.renderEntity.gui[ j ] ) {
////				ent.renderEntity.gui[ j ].Trigger( gameLocal.time );
////			}
////		}
////	}
////}
////
/////***********************************************************************
////
////  Misc.
////	
////***********************************************************************/
////
/////*
////================
////idEntity::Teleport
////================
////*/
////idEntity.prototype.Teleport( const idVec3 &origin, angles:idAngles, idEntity *destination ) {
////	GetPhysics().SetOrigin( origin );
////	GetPhysics().SetAxis( angles.ToMat3() );
////
////	UpdateVisuals();
////}
////
/////*
////============
////idEntity::TouchTriggers
////
////  Activate all trigger entities touched at the current position.
////============
////*/
////bool idEntity::TouchTriggers( ):void const {
////	int				i, numClipModels, numEntities;
////	idClipModel *	cm;
////	idClipModel *	clipModels[ MAX_GENTITIES ];
////	idEntity *		ent;
////	trace_t			trace;
////
////	memset( &trace, 0, sizeof( trace ) );
////	trace.endpos = GetPhysics().GetOrigin();
////	trace.endAxis = GetPhysics().GetAxis();
////
////	numClipModels = gameLocal.clip.ClipModelsTouchingBounds( GetPhysics().GetAbsBounds(), CONTENTS_TRIGGER, clipModels, MAX_GENTITIES );
////	numEntities = 0;
////
////	for ( i = 0; i < numClipModels; i++ ) {
////		cm = clipModels[ i ];
////
////		// don't touch it if we're the owner
////		if ( cm.GetOwner() == this ) {
////			continue;
////		}
////
////		ent = cm.GetEntity();
////
////		if ( !ent.RespondsTo( EV_Touch ) && !ent.HasSignal( SIG_TOUCH ) ) {
////			continue;
////		}
////
////		if ( !GetPhysics().ClipContents( cm ) ) {
////			continue;
////		}
////
////		numEntities++;
////
////		trace.c.contents = cm.GetContents();
////		trace.c.entityNum = cm.GetEntity().entityNumber;
////		trace.c.id = cm.GetId();
////
////		ent.Signal( SIG_TOUCH );
////		ent.ProcessEvent( &EV_Touch, this, &trace );
////
////		if ( !gameLocal.entities[ entityNumber ] ) {
////			gameLocal.Printf( "entity was removed while touching triggers\n" );
////			return true;
////		}
////	}
////
////	return ( numEntities != 0 );
////}
////
/////*
////================
////idEntity::GetSpline
////================
////*/
////idCurve_Spline<idVec3> *idEntity::GetSpline( ):void const {
////	int i, numPoints, t;
////	const idKeyValue *kv;
////	idLexer lex;
////	idVec3 v;
////	idCurve_Spline<idVec3> *spline;
////	const char *curveTag = "curve_";
////
////	kv = this.spawnArgs.MatchPrefix( curveTag );
////	if ( !kv ) {
////		return NULL;
////	}
////
////	idStr str = kv.GetKey().Right( kv.GetKey().Length() - strlen( curveTag ) );
////	if ( str.Icmp( "CatmullRomSpline" ) == 0 ) {
////		spline = new idCurve_CatmullRomSpline<idVec3>();
////	} else if ( str.Icmp( "nubs" ) == 0 ) {
////		spline = new idCurve_NonUniformBSpline<idVec3>();
////	} else if ( str.Icmp( "nurbs" ) == 0 ) {
////		spline = new idCurve_NURBS<idVec3>();
////	} else {
////		spline = new idCurve_BSpline<idVec3>();
////	}
////
////	spline.SetBoundaryType( idCurve_Spline<idVec3>::BT_CLAMPED );
////
////	lex.LoadMemory( kv.GetValue(), kv.GetValue().Length(), curveTag );
////	numPoints = lex.ParseInt();
////	lex.ExpectTokenString( "(" );
////	for ( t = i = 0; i < numPoints; i++, t += 100 ) {
////		v.x = lex.ParseFloat();
////		v.y = lex.ParseFloat();
////		v.z = lex.ParseFloat();
////		spline.AddValue( t, v );
////	}
////	lex.ExpectTokenString( ")" );
////
////	return spline;
////}
////
/////*
////===============
////idEntity::ShowEditingDialog
////===============
////*/
////idEntity.prototype.ShowEditingDialog( ):void {
////}

/***********************************************************************

   Events
	
***********************************************************************/

/*
================
idEntity::Event_GetName
================
*/
Event_GetName(): void {
		idThread.ReturnString(this.name.c_str());
	}

/*
================
idEntity::Event_SetName
================
*/
Event_SetName  (newname: string): void {
		this.SetName(newname);
	}

/*
===============
idEntity::Event_FindTargets
===============
*/
	Event_FindTargets ( ): void {
		this.FindTargets ( );
	}

/////*
////============
////idEntity::Event_ActivateTargets
////
////Activates any entities targeted by this entity.  Mainly used as an
////event to delay activating targets.
////============
////*/
////idEntity.prototype.Event_ActivateTargets( activator:idEntity ) {
////	ActivateTargets( activator );
////}
////
/////*
////================
////idEntity::Event_NumTargets
////================
////*/
////idEntity.prototype.Event_NumTargets( ):void {
////	idThread::ReturnFloat( this.targets.Num() );
////}
////
/////*
////================
////idEntity::Event_GetTarget
////================
////*/
////idEntity.prototype.Event_GetTarget( float index ) {
////	int i;
////
////	i = ( int )index;
////	if ( ( i < 0 ) || i >= this.targets.Num() ) {
////		idThread::ReturnEntity( NULL );
////	} else {
////		idThread::ReturnEntity( this.targets[ i ].GetEntity() );
////	}
////}
////
/////*
////================
////idEntity::Event_RandomTarget
////================
////*/
////idEntity.prototype.Event_RandomTarget( const char *ignore ) {
////	int			num;
////	idEntity	*ent;
////	int			i;
////	int			ignoreNum;
////
////	RemoveNullTargets();
////	if ( !this.targets.Num() ) {
////		idThread::ReturnEntity( NULL );
////		return;
////	}
////
////	ignoreNum = -1;
////	if ( ignore && ( ignore[ 0 ] != 0 ) && ( this.targets.Num() > 1 ) ) {
////		for( i = 0; i < this.targets.Num(); i++ ) {
////			ent = this.targets[ i ].GetEntity();
////			if ( ent && ( ent.name == ignore ) ) {
////				ignoreNum = i;
////				break;
////			}
////		}
////	}
////
////	if ( ignoreNum >= 0 ) {
////		num = gameLocal.random.RandomInt( this.targets.Num() - 1 );
////		if ( num >= ignoreNum ) {
////			num++;
////		}
////	} else {
////		num = gameLocal.random.RandomInt( this.targets.Num() );
////	}
////
////	ent = this.targets[ num ].GetEntity();
////	idThread::ReturnEntity( ent );
////}
////
/////*
////================
////idEntity::Event_BindToJoint
////================
////*/
////idEntity.prototype.Event_BindToJoint( idEntity *master, jointname:string, float orientated ) {
////	BindToJoint( master, jointname, ( orientated != 0.0f ) );
////}
////
/////*
////================
////idEntity::Event_RemoveBinds
////================
////*/
////idEntity.prototype.Event_RemoveBinds( ):void {
////	RemoveBinds();
////}
////
/////*
////================
////idEntity::Event_Bind
////================
////*/
////idEntity.prototype.Event_Bind( idEntity *master ) {
////	Bind( master, true );
////}
////
/////*
////================
////idEntity::Event_BindPosition
////================
////*/
////idEntity.prototype.Event_BindPosition( idEntity *master ) {
////	Bind( master, false );
////}
////
/////*
////================
////idEntity::Event_Unbind
////================
////*/
////idEntity.prototype.Event_Unbind( ):void {
////	Unbind();
////}
////
/////*
////================
////idEntity::Event_SpawnBind
////================
////*/
////idEntity.prototype.Event_SpawnBind( ):void {
////	idEntity		*parent;
////	const char		*bind, *joint, *bindanim;
////	jointHandle_t	bindJoint;
////	bool			bindOrientated;
////	int				id;
////	const idAnim	*anim;
////	int				animNum;
////	idAnimator		*parentAnimator;
////	
////	if ( this.spawnArgs.GetString( "bind", "", &bind ) ) {
////		if ( idStr::Icmp( bind, "worldspawn" ) == 0 ) {
////			//FIXME: Completely unneccessary since the worldspawn is called "world"
////			parent = gameLocal.world;
////		} else {
////			parent = gameLocal.FindEntity( bind );
////		}
////		bindOrientated = this.spawnArgs.GetBool( "bindOrientated", "1" );
////		if ( parent ) {
////			// bind to a joint of the skeletal model of the parent
////			if ( this.spawnArgs.GetString( "bindToJoint", "", &joint ) && *joint ) {
////				parentAnimator = parent.GetAnimator();
////				if ( !parentAnimator ) {
////					gameLocal.Error( "Cannot bind to joint '%s' on '%s'.  Entity does not support skeletal models.", joint, this.name.c_str() );
////				}
////				bindJoint = parentAnimator.GetJointHandle( joint );
////				if ( bindJoint == INVALID_JOINT ) {
////					gameLocal.Error( "Joint '%s' not found for bind on '%s'", joint, this.name.c_str() );
////				}
////
////				// bind it relative to a specific anim
////				if ( ( parent.spawnArgs.GetString( "bindanim", "", &bindanim ) || parent.spawnArgs.GetString( "anim", "", &bindanim ) ) && *bindanim ) {
////					animNum = parentAnimator.GetAnim( bindanim );
////					if ( !animNum ) {
////						gameLocal.Error( "Anim '%s' not found for bind on '%s'", bindanim, this.name.c_str() );
////					}
////					anim = parentAnimator.GetAnim( animNum );
////					if ( !anim ) {
////						gameLocal.Error( "Anim '%s' not found for bind on '%s'", bindanim, this.name.c_str() );
////					}
////
////					// make sure parent's render origin has been set
////					parent.UpdateModelTransform();
////
////					//FIXME: need a BindToJoint that accepts a joint position
////					parentAnimator.CreateFrame( gameLocal.time, true );
////					idJointMat *frame = parent.renderEntity.joints;
////					gameEdit.ANIM_CreateAnimFrame( parentAnimator.ModelHandle(), anim.MD5Anim( 0 ), parent.renderEntity.numJoints, frame, 0, parentAnimator.ModelDef().GetVisualOffset(), parentAnimator.RemoveOrigin() );
////					BindToJoint( parent, joint, bindOrientated );
////					parentAnimator.ForceUpdate();
////				} else {
////					BindToJoint( parent, joint, bindOrientated );
////				}
////			}
////			// bind to a body of the physics object of the parent
////			else if ( this.spawnArgs.GetInt( "bindToBody", "0", id ) ) {
////				BindToBody( parent, id, bindOrientated );
////			}
////			// bind to the parent
////			else {
////				Bind( parent, bindOrientated );
////			}
////		}
////	}
////}
////
/////*
////================
////idEntity::Event_SetOwner
////================
////*/
////idEntity.prototype.Event_SetOwner( idEntity *owner ) {
////	int i;
////
////	for ( i = 0; i < GetPhysics().GetNumClipModels(); i++ ) {
////		GetPhysics().GetClipModel( i ).SetOwner( owner );
////	}
////}
////
/////*
////================
////idEntity::Event_SetModel
////================
////*/
////idEntity.prototype.Event_SetModel( const char *modelname ) {
////	SetModel( modelname );
////}
////
/////*
////================
////idEntity::Event_SetSkin
////================
////*/
////idEntity.prototype.Event_SetSkin( const char *skinname ) {
////	renderEntity.customSkin = declManager.FindSkin( skinname );
////	UpdateVisuals();
////}
////
/////*
////================
////idEntity::Event_GetShaderParm
////================
////*/
////idEntity.prototype.Event_GetShaderParm( int parmnum ) {
////	if ( ( parmnum < 0 ) || ( parmnum >= MAX_ENTITY_SHADER_PARMS ) ) {
////		gameLocal.Error( "shader parm index (%d) out of range", parmnum );
////	}
////
////	idThread::ReturnFloat( renderEntity.shaderParms[ parmnum ] );
////}
////
/////*
////================
////idEntity::Event_SetShaderParm
////================
////*/
////idEntity.prototype.Event_SetShaderParm( int parmnum, float value ) {
////	SetShaderParm( parmnum, value );
////}
////
/////*
////================
////idEntity::Event_SetShaderParms
////================
////*/
////idEntity.prototype.Event_SetShaderParms( float parm0, float parm1, float parm2, float parm3 ) {
////	renderEntity.shaderParms[ SHADERPARM_RED ]		= parm0;
////	renderEntity.shaderParms[ SHADERPARM_GREEN ]	= parm1;
////	renderEntity.shaderParms[ SHADERPARM_BLUE ]		= parm2;
////	renderEntity.shaderParms[ SHADERPARM_ALPHA ]	= parm3;
////	UpdateVisuals();
////}
////
////
/////*
////================
////idEntity::Event_SetColor
////================
////*/
////idEntity.prototype.Event_SetColor( float red, float green, float blue ) {
////	SetColor( red, green, blue );
////}
////
/////*
////================
////idEntity::Event_GetColor
////================
////*/
////idEntity.prototype.Event_GetColor( ):void {
////	idVec3 out;
////
////	GetColor( out );
////	idThread::ReturnVector( out );
////}
////
/////*
////================
////idEntity::Event_IsHidden
////================
////*/
////idEntity.prototype.Event_IsHidden( ):void {
////	idThread::ReturnInt( fl.hidden );
////}
////
/////*
////================
////idEntity::Event_Hide
////================
////*/
////idEntity.prototype.Event_Hide( ):void {
////	Hide();
////}
////
/////*
////================
////idEntity::Event_Show
////================
////*/
////idEntity.prototype.Event_Show( ):void {
////	Show();
////}
////
/////*
////================
////idEntity::Event_CacheSoundShader
////================
////*/
////idEntity.prototype.Event_CacheSoundShader( const char *soundName ) {
////	declManager.FindSound( soundName );
////}
////
/////*
////================
////idEntity::Event_StartSoundShader
////================
////*/
////idEntity.prototype.Event_StartSoundShader( const char *soundName, int channel ) {
////	int length;
////
////	StartSoundShader( declManager.FindSound( soundName ), (s_channelType)channel, 0, false, &length );
////	idThread::ReturnFloat( MS2SEC( length ) );
////}
////
/////*
////================
////idEntity::Event_StopSound
////================
////*/
////idEntity.prototype.Event_StopSound( int channel, int netSync ) {
////	StopSound( channel, ( netSync != 0 ) );
////}
////
/////*
////================
////idEntity::Event_StartSound 
////================
////*/
////idEntity.prototype.Event_StartSound( const char *soundName, int channel, int netSync ) {
////	/*int*/time:number;
////	
////	StartSound( soundName, ( s_channelType )channel, 0, ( netSync != 0 ), &time );
////	idThread::ReturnFloat( MS2SEC( time ) );
////}
////
/////*
////================
////idEntity::Event_FadeSound
////================
////*/
////idEntity.prototype.Event_FadeSound( int channel, float to, float over ) {
////	if ( refSound.referenceSound ) {
////		refSound.referenceSound.FadeSound( channel, to, over );
////	}
////}
////
/////*
////================
////idEntity::Event_GetWorldOrigin
////================
////*/
////idEntity.prototype.Event_GetWorldOrigin( ):void {
////	idThread::ReturnVector( GetPhysics().GetOrigin() );
////}
////
/////*
////================
////idEntity::Event_SetWorldOrigin
////================
////*/
////idEntity.prototype.Event_SetWorldOrigin( idVec3 const &org ) {
////	idVec3 neworg = GetLocalCoordinates( org );
////	SetOrigin( neworg );
////}
////
/////*
////================
////idEntity::Event_SetOrigin
////================
////*/
////idEntity.prototype.Event_SetOrigin( idVec3 const &org ) {
////	SetOrigin( org );
////}
////
/////*
////================
////idEntity::Event_GetOrigin
////================
////*/
////idEntity.prototype.Event_GetOrigin( ):void {
////	idThread::ReturnVector( GetLocalCoordinates( GetPhysics().GetOrigin() ) );
////}
////
/////*
////================
////idEntity::Event_SetAngles
////================
////*/
////idEntity.prototype.Event_SetAngles( idAngles const &ang ) {
////	SetAngles( ang );
////}
////
/////*
////================
////idEntity::Event_GetAngles
////================
////*/
////idEntity.prototype.Event_GetAngles( ):void {
////	idAngles ang = GetPhysics().GetAxis().ToAngles();
////	idThread::ReturnVector( idVec3( ang[0], ang[1], ang[2] ) );
////}
////
/////*
////================
////idEntity::Event_SetLinearVelocity
////================
////*/
////idEntity.prototype.Event_SetLinearVelocity( const idVec3 &velocity ) {
////	GetPhysics().SetLinearVelocity( velocity );
////}
////
/////*
////================
////idEntity::Event_GetLinearVelocity
////================
////*/
////idEntity.prototype.Event_GetLinearVelocity( ):void {
////	idThread::ReturnVector( GetPhysics().GetLinearVelocity() );
////}
////
/////*
////================
////idEntity::Event_SetAngularVelocity
////================
////*/
////idEntity.prototype.Event_SetAngularVelocity( const idVec3 &velocity ) {
////	GetPhysics().SetAngularVelocity( velocity );
////}
////
/////*
////================
////idEntity::Event_GetAngularVelocity
////================
////*/
////idEntity.prototype.Event_GetAngularVelocity( ):void {
////	idThread::ReturnVector( GetPhysics().GetAngularVelocity() );
////}
////
/////*
////================
////idEntity::Event_SetSize
////================
////*/
////idEntity.prototype.Event_SetSize( idVec3 const &mins, idVec3 const &maxs ) {
////	GetPhysics().SetClipBox( idBounds( mins, maxs ), 1.0f );
////}
////
/////*
////================
////idEntity::Event_GetSize
////================
////*/
////idEntity.prototype.Event_GetSize( ):void {
////	idBounds bounds;
////
////	bounds = GetPhysics().GetBounds();
////	idThread::ReturnVector( bounds[1] - bounds[0] );
////}
////
/////*
////================
////idEntity::Event_GetMins
////================
////*/
////idEntity.prototype.Event_GetMins( ):void {
////	idThread::ReturnVector( GetPhysics().GetBounds()[0] );
////}
////
/////*
////================
////idEntity::Event_GetMaxs
////================
////*/
////idEntity.prototype.Event_GetMaxs( ):void {
////	idThread::ReturnVector( GetPhysics().GetBounds()[1] );
////}
////
/////*
////================
////idEntity::Event_Touches
////================
////*/
////idEntity.prototype.Event_Touches( ent:idEntity ) {
////	if ( !ent ) {
////		idThread::ReturnInt( false );
////		return;
////	}
////
////	const idBounds &myBounds = GetPhysics().GetAbsBounds();
////	const idBounds &entBounds = ent.GetPhysics().GetAbsBounds();
////
////	idThread::ReturnInt( myBounds.IntersectsBounds( entBounds ) );
////}
////
/////*
////================
////idEntity::Event_SetGuiParm
////================
////*/
////idEntity.prototype.Event_SetGuiParm( key:string, const char *val ) {
////	for ( int i = 0; i < MAX_RENDERENTITY_GUI; i++ ) {
////		if ( renderEntity.gui[ i ] ) {
////			if ( idStr::Icmpn( key, "gui_", 4 ) == 0 ) {
////				this.spawnArgs.Set( key, val );
////			}
////			renderEntity.gui[ i ].SetStateString( key, val );
////			renderEntity.gui[ i ].StateChanged( gameLocal.time );
////		}
////	}
////}
////
/////*
////================
////idEntity::Event_SetGuiParm
////================
////*/
////idEntity.prototype.Event_SetGuiFloat( key:string, float f ) {
////	for ( int i = 0; i < MAX_RENDERENTITY_GUI; i++ ) {
////		if ( renderEntity.gui[ i ] ) {
////			renderEntity.gui[ i ].SetStateString( key, va( "%f", f ) );
////			renderEntity.gui[ i ].StateChanged( gameLocal.time );
////		}
////	}
////}
////
/////*
////================
////idEntity::Event_GetNextKey
////================
////*/
////idEntity.prototype.Event_GetNextKey( const char *prefix, const char *lastMatch ) {
////	const idKeyValue *kv;
////	const idKeyValue *previous;
////
////	if ( *lastMatch ) {
////		previous = this.spawnArgs.FindKey( lastMatch );
////	} else {
////		previous = NULL;
////	}
////
////	kv = this.spawnArgs.MatchPrefix( prefix, previous );
////	if ( !kv ) {
////		idThread::ReturnString( "" );
////	} else {
////		idThread::ReturnString( kv.GetKey() );
////	}
////}
////
/////*
////================
////idEntity::Event_SetKey
////================
////*/
////idEntity.prototype.Event_SetKey( key:string, value:string ) {
////	this.spawnArgs.Set( key, value );
////}
////
/////*
////================
////idEntity::Event_GetKey
////================
////*/
////idEntity.prototype.Event_GetKey( key:string ) {
////	var value:string;
////
////	this.spawnArgs.GetString( key, "", &value );
////	idThread::ReturnString( value );
////}
////
/////*
////================
////idEntity::Event_GetIntKey
////================
////*/
////idEntity.prototype.Event_GetIntKey( key:string ) {
////	int value;
////
////	this.spawnArgs.GetInt( key, "0", value );
////
////	// scripts only support floats
////	idThread::ReturnFloat( value );
////}
////
/////*
////================
////idEntity::Event_GetFloatKey
////================
////*/
////idEntity.prototype.Event_GetFloatKey( key:string ) {
////	float value;
////
////	this.spawnArgs.GetFloat( key, "0", value );
////	idThread::ReturnFloat( value );
////}
////
/////*
////================
////idEntity::Event_GetVectorKey
////================
////*/
////idEntity.prototype.Event_GetVectorKey( key:string ) {
////	idVec3 value;
////
////	this.spawnArgs.GetVector( key, "0 0 0", value );
////	idThread::ReturnVector( value );
////}
////
/////*
////================
////idEntity::Event_GetEntityKey
////================
////*/
////idEntity.prototype.Event_GetEntityKey( key:string ) {
////	var ent:idEntity
////	const char *entname;
////
////	if ( !spawnArgs.GetString( key, NULL, &entname ) ) {
////		idThread::ReturnEntity( NULL );
////		return;
////	}
////
////	ent = gameLocal.FindEntity( entname );
////	if ( !ent ) {
////		gameLocal.Warning( "Couldn't find entity '%s' specified in '%s' key in entity '%s'", entname, key, this.name.c_str() );
////	}
////
////	idThread::ReturnEntity( ent );
////}
////
/////*
////================
////idEntity::Event_RestorePosition
////================
////*/
////idEntity.prototype.Event_RestorePosition( ):void {
////	idVec3		org;
////	idAngles	angles;
////	idMat3		axis;
////	idEntity *	part;
////
////	this.spawnArgs.GetVector( "origin", "0 0 0", org );
////
////	// get the rotation matrix in either full form, or single angle form
////	if ( this.spawnArgs.GetMatrix( "rotation", "1 0 0 0 1 0 0 0 1", axis ) ) {
////		angles = axis.ToAngles();
////	} else {
////   		angles[ 0 ] = 0;
////   		angles[ 1 ] = this.spawnArgs.GetFloat( "angle" );
////   		angles[ 2 ] = 0;
////	}
////
////	Teleport( org, angles, NULL );
////
////	for ( part = teamChain; part != NULL; part = part.teamChain ) {
////		if ( part.bindMaster != this ) {
////			continue;
////		}
////		if ( part.GetPhysics().IsType( idPhysics_Parametric::Type ) ) {
////			if ( static_cast<idPhysics_Parametric *>(part.GetPhysics()).IsPusher() ) {
////				gameLocal.Warning( "teleported '%s' which has the pushing mover '%s' bound to it\n", GetName(), part.GetName() );
////			}
////		} else if ( part.GetPhysics().IsType( idPhysics_AF::Type ) ) {
////			gameLocal.Warning( "teleported '%s' which has the articulated figure '%s' bound to it\n", GetName(), part.GetName() );
////		}
////	}
////}
////
/////*
////================
////idEntity::Event_UpdateCameraTarget
////================
////*/
////idEntity.prototype.Event_UpdateCameraTarget( ):void {
////	const char *target;
////	const idKeyValue *kv;
////	idVec3 dir;
////
////	target = this.spawnArgs.GetString( "cameraTarget" );
////
////	cameraTarget = gameLocal.FindEntity( target );
////
////	if ( cameraTarget ) {
////		kv = cameraTarget.spawnArgs.MatchPrefix( "target", NULL );
////		while( kv ) {
////			var ent:idEntity = gameLocal.FindEntity( kv.GetValue() );
////			if ( ent && idStr::Icmp( ent.GetEntityDefName(), "target_null" ) == 0) {
////				dir = ent.GetPhysics().GetOrigin() - cameraTarget.GetPhysics().GetOrigin();
////				dir.Normalize();
////				cameraTarget.SetAxis( dir.ToMat3() );
////				SetAxis(dir.ToMat3());
////				break;						
////			}
////			kv = cameraTarget.spawnArgs.MatchPrefix( "target", kv );
////		}
////	}
////	UpdateVisuals();
////}
////
/////*
////================
////idEntity::Event_DistanceTo
////================
////*/
////idEntity.prototype.Event_DistanceTo( ent:idEntity ) {
////	if ( !ent ) {
////		// just say it's really far away
////		idThread::ReturnFloat( MAX_WORLD_SIZE );
////	} else {
////		float dist = ( GetPhysics().GetOrigin() - ent.GetPhysics().GetOrigin() ).LengthFast();
////		idThread::ReturnFloat( dist );
////	}
////}
////
/////*
////================
////idEntity::Event_DistanceToPoint
////================
////*/
////idEntity.prototype.Event_DistanceToPoint( const idVec3 &point ) {
////	float dist = ( GetPhysics().GetOrigin() - point ).LengthFast();
////	idThread::ReturnFloat( dist );
////}
////
/////*
////================
////idEntity::Event_StartFx
////================
////*/
////idEntity.prototype.Event_StartFx( const char *fx ) {
////	idEntityFx::StartFx( fx, NULL, NULL, this, true );
////}
////
/////*
////================
////idEntity::Event_WaitFrame
////================
////*/
////idEntity.prototype.Event_WaitFrame( ):void {
////	idThread *thread;
////	
////	thread = idThread::CurrentThread();
////	if ( thread ) {
////		thread.WaitFrame();
////	}
////}
////
/////*
////=====================
////idEntity::Event_Wait
////=====================
////*/
////idEntity.prototype.Event_Wait( /*float*/time:number ) {
////	idThread *thread = idThread::CurrentThread();
////
////	if ( !thread ) {
////		gameLocal.Error( "Event 'wait' called from outside thread" );
////	}
////
////	thread.WaitSec( time );
////}
////
/////*
////=====================
////idEntity::Event_HasFunction
////=====================
////*/
////idEntity.prototype.Event_HasFunction( name:string ) {
////	const function_t *func;
////
////	func = scriptObject.GetFunction( name );
////	if ( func ) {
////		idThread::ReturnInt( true );
////	} else {
////		idThread::ReturnInt( false );
////	}
////}
////
/////*
////=====================
////idEntity::Event_CallFunction
////=====================
////*/
////idEntity.prototype.Event_CallFunction( const char *funcname ) {
////	const function_t *func;
////	idThread *thread;
////
////	thread = idThread::CurrentThread();
////	if ( !thread ) {
////		gameLocal.Error( "Event 'callFunction' called from outside thread" );
////	}
////
////	func = scriptObject.GetFunction( funcname );
////	if ( !func ) {
////		gameLocal.Error( "Unknown function '%s' in '%s'", funcname, scriptObject.GetTypeName() );
////	}
////
////	if ( func.type.NumParameters() != 1 ) {
////		gameLocal.Error( "Function '%s' has the wrong number of parameters for 'callFunction'", funcname );
////	}
////	if ( !scriptObject.GetTypeDef().Inherits( func.type.GetParmType( 0 ) ) ) {
////		gameLocal.Error( "Function '%s' is the wrong type for 'callFunction'", funcname );
////	}
////
////	// function args will be invalid after this call
////	thread.CallFunction( this, func, false );
////}
////
/////*
////================
////idEntity::Event_SetNeverDormant
////================
////*/
////idEntity.prototype.Event_SetNeverDormant( int enable ) {
////	fl.neverDormant	= ( enable != 0 );
////	dormantStart = 0;
////}
////
/////***********************************************************************
////
////   Network
////	
////***********************************************************************/
////
/////*
////================
////idEntity::ClientPredictionThink
////================
////*/
////idEntity.prototype.ClientPredictionThink( ):void {
////	RunPhysics();
////	Present();
////}
////
/////*
////================
////idEntity::WriteBindToSnapshot
////================
////*/
////idEntity.prototype.WriteBindToSnapshot( idBitMsgDelta &msg ) const {
////	int bindInfo;
////
////	if ( bindMaster ) {
////		bindInfo = bindMaster.entityNumber;
////		bindInfo |= ( fl.bindOrientated & 1 ) << GENTITYNUM_BITS;
////		if ( bindJoint != INVALID_JOINT ) {
////			bindInfo |= 1 << ( GENTITYNUM_BITS + 1 );
////			bindInfo |= bindJoint << ( 3 + GENTITYNUM_BITS );
////		} else if ( bindBody != -1 ) {
////			bindInfo |= 2 << ( GENTITYNUM_BITS + 1 );
////			bindInfo |= bindBody << ( 3 + GENTITYNUM_BITS );
////		}
////	} else {
////		bindInfo = ENTITYNUM_NONE;
////	}
////	msg.WriteBits( bindInfo, GENTITYNUM_BITS + 3 + 9 );
////}
////
/////*
////================
////idEntity::ReadBindFromSnapshot
////================
////*/
////idEntity.prototype.ReadBindFromSnapshot( const idBitMsgDelta &msg ) {
////	int bindInfo, bindEntityNum, bindPos;
////	bool bindOrientated;
////	idEntity *master;
////
////	bindInfo = msg.ReadBits( GENTITYNUM_BITS + 3 + 9 );
////	bindEntityNum = bindInfo & ( ( 1 << GENTITYNUM_BITS ) - 1 );
////
////	if ( bindEntityNum != ENTITYNUM_NONE ) {
////		master = gameLocal.entities[ bindEntityNum ];
////
////		bindOrientated = ( bindInfo >> GENTITYNUM_BITS ) & 1;
////		bindPos = ( bindInfo >> ( GENTITYNUM_BITS + 3 ) );
////		switch( ( bindInfo >> ( GENTITYNUM_BITS + 1 ) ) & 3 ) {
////			case 1: {
////				BindToJoint( master, (jointHandle_t) bindPos, bindOrientated );
////				break;
////			}
////			case 2: {
////				BindToBody( master, bindPos, bindOrientated );
////				break;
////			}
////			default: {
////				Bind( master, bindOrientated );
////				break;
////			}
////		}
////	} else if ( bindMaster ) {
////		Unbind();
////	}
////}
////
/////*
////================
////idEntity::WriteColorToSnapshot
////================
////*/
////idEntity.prototype.WriteColorToSnapshot( idBitMsgDelta &msg ) const {
////	idVec4 color;
////
////	color[0] = renderEntity.shaderParms[ SHADERPARM_RED ];
////	color[1] = renderEntity.shaderParms[ SHADERPARM_GREEN ];
////	color[2] = renderEntity.shaderParms[ SHADERPARM_BLUE ];
////	color[3] = renderEntity.shaderParms[ SHADERPARM_ALPHA ];
////	msg.WriteLong( PackColor( color ) );
////}
////
/////*
////================
////idEntity::ReadColorFromSnapshot
////================
////*/
////idEntity.prototype.ReadColorFromSnapshot( const idBitMsgDelta &msg ) {
////	idVec4 color;
////
////	UnpackColor( msg.ReadLong(), color );
////	renderEntity.shaderParms[ SHADERPARM_RED ] = color[0];
////	renderEntity.shaderParms[ SHADERPARM_GREEN ] = color[1];
////	renderEntity.shaderParms[ SHADERPARM_BLUE ] = color[2];
////	renderEntity.shaderParms[ SHADERPARM_ALPHA ] = color[3];
////}
////
/////*
////================
////idEntity::WriteGUIToSnapshot
////================
////*/
////idEntity.prototype.WriteGUIToSnapshot( idBitMsgDelta &msg ) const {
////	// no need to loop over MAX_RENDERENTITY_GUI at this time
////	if ( renderEntity.gui[ 0 ] ) {
////		msg.WriteByte( renderEntity.gui[ 0 ].State().GetInt( "networkState" ) );
////	} else {
////		msg.WriteByte( 0 );
////	}
////}
////
/////*
////================
////idEntity::ReadGUIFromSnapshot
////================
////*/
////idEntity.prototype.ReadGUIFromSnapshot( const idBitMsgDelta &msg ) {
////	int state;
////	idUserInterface *gui;
////	state = msg.ReadByte( );
////	gui = renderEntity.gui[ 0 ];
////	if ( gui && state != mpGUIState ) {
////		mpGUIState = state;
////		gui.SetStateInt( "networkState", state );
////		gui.HandleNamedEvent( "networkState" );
////	}
////}
////
/////*
////================
////idEntity::WriteToSnapshot
////================
////*/
////idEntity.prototype.WriteToSnapshot( idBitMsgDelta &msg ) const {
////}
////
/////*
////================
////idEntity::ReadFromSnapshot
////================
////*/
////idEntity.prototype.ReadFromSnapshot( const idBitMsgDelta &msg ) {
////}
////
/////*
////================
////idEntity::ServerSendEvent
////
////   Saved events are also sent to any client that connects late so all clients
////   always receive the events nomatter what time they join the game.
////================
////*/
////idEntity.prototype.ServerSendEvent( int eventId, const idBitMsg *msg, bool saveEvent, int excludeClient ) const {
////	idBitMsg	outMsg;
////	byte		msgBuf[MAX_GAME_MESSAGE_SIZE];
////
////	if ( !gameLocal.isServer ) {
////		return;
////	}
////
////	// prevent dupe events caused by frame re-runs
////	if ( !gameLocal.isNewFrame ) {
////		return;
////	}
////
////	outMsg.Init( msgBuf, sizeof( msgBuf ) );
////	outMsg.BeginWriting();
////	outMsg.WriteByte( GAME_RELIABLE_MESSAGE_EVENT );	
////	outMsg.WriteBits( gameLocal.GetSpawnId( this ), 32 );
////	outMsg.WriteByte( eventId );
////	outMsg.WriteLong( gameLocal.time );
////	if ( msg ) {
////		outMsg.WriteBits( msg.GetSize(), idMath::BitsForInteger( MAX_EVENT_PARAM_SIZE ) );
////		outMsg.WriteData( msg.GetData(), msg.GetSize() );
////	} else {
////		outMsg.WriteBits( 0, idMath::BitsForInteger( MAX_EVENT_PARAM_SIZE ) );
////	}
////
////	if ( excludeClient != -1 ) {
////		networkSystem.ServerSendReliableMessageExcluding( excludeClient, outMsg );
////	} else {
////		networkSystem.ServerSendReliableMessage( -1, outMsg );
////	}
////
////	if ( saveEvent ) {
////		gameLocal.SaveEntityNetworkEvent( this, eventId, msg );
////	}
////}
////
/////*
////================
////idEntity::ClientSendEvent
////================
////*/
////idEntity.prototype.ClientSendEvent( int eventId, const idBitMsg *msg ) const {
////	idBitMsg	outMsg;
////	byte		msgBuf[MAX_GAME_MESSAGE_SIZE];
////
////	if ( !gameLocal.isClient ) {
////		return;
////	}
////
////	// prevent dupe events caused by frame re-runs
////	if ( !gameLocal.isNewFrame ) {
////		return;
////	}
////
////	outMsg.Init( msgBuf, sizeof( msgBuf ) );
////	outMsg.BeginWriting();
////	outMsg.WriteByte( GAME_RELIABLE_MESSAGE_EVENT );
////	outMsg.WriteBits( gameLocal.GetSpawnId( this ), 32 );
////	outMsg.WriteByte( eventId );
////	outMsg.WriteLong( gameLocal.time );
////	if ( msg ) {
////		outMsg.WriteBits( msg.GetSize(), idMath::BitsForInteger( MAX_EVENT_PARAM_SIZE ) );
////		outMsg.WriteData( msg.GetData(), msg.GetSize() );
////	} else {
////		outMsg.WriteBits( 0, idMath::BitsForInteger( MAX_EVENT_PARAM_SIZE ) );
////	}
////
////	networkSystem.ClientSendReliableMessage( outMsg );
////}
////
/////*
////================
////idEntity::ServerReceiveEvent
////================
////*/
////bool idEntity::ServerReceiveEvent( int event, /*int*/time:number, const idBitMsg &msg ) {
////	switch( event ) {
////		case 0: {
////		}
////		default: {
////			return false;
////		}
////	}
////}
////
/////*
////================
////idEntity::ClientReceiveEvent
////================
////*/
////bool idEntity::ClientReceiveEvent( int event, /*int*/time:number, const idBitMsg &msg ) {
////	int					index;
////	const idSoundShader	*shader;
////	s_channelType		channel;
////
////	switch( event ) {
////		case EVENT_STARTSOUNDSHADER: {
////			// the sound stuff would early out
////			assert( gameLocal.isNewFrame );
////			if ( time < gameLocal.realClientTime - 1000 ) {
////				// too old, skip it ( reliable messages don't need to be parsed in full )
////				common.DPrintf( "ent 0x%x: start sound shader too old (%d ms)\n", entityNumber, gameLocal.realClientTime - time );
////				return true;
////			}
////			index = gameLocal.ClientRemapDecl( DECL_SOUND, msg.ReadLong() );
////			if ( index >= 0 && index < declManager.GetNumDecls( DECL_SOUND ) ) {
////				shader = declManager.SoundByIndex( index, false );
////				channel = (s_channelType)msg.ReadByte();
////				StartSoundShader( shader, channel, 0, false, NULL );
////			}
////			return true;
////		}
////		case EVENT_STOPSOUNDSHADER: {
////			// the sound stuff would early out
////			assert( gameLocal.isNewFrame );
////			channel = (s_channelType)msg.ReadByte();
////			StopSound( channel, false );
////			return true;
////		}
////		default: {
////			return false;
////		}
////	}
////	return false;
////}
////
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
