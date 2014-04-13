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

/*
===============================================================================

	Game entity base class.

===============================================================================
*/

var DELAY_DORMANT_TIME = 3000;

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
// Think flags
////enum {
var TH_ALL = -1,
	TH_THINK = 1, // run think function each frame
	TH_PHYSICS = 2, // run physics each frame
	TH_ANIMATE = 4, // update animation each frame
	TH_UPDATEVISUALS = 8, // update renderEntity
	TH_UPDATEPARTICLES = 16;
////};

//
// Signals
// make sure to change script/doom_defs.script if you add any, or change their order
//
enum signalNum_t{
	SIG_TOUCH,				// object was touched
	SIG_USE,				// object was used
	SIG_TRIGGER,			// object was activated
	SIG_REMOVED,			// object was removed from the game
	SIG_DAMAGE,				// object was damaged
	SIG_BLOCKED,			// object was blocked

	SIG_MOVER_POS1,			// mover at position 1 (door closed)
	SIG_MOVER_POS2,			// mover at position 2 (door open)
	SIG_MOVER_1TO2,			// mover changing from position 1 to 2
	SIG_MOVER_2TO1,			// mover changing from position 2 to 1

	NUM_SIGNALS
}

// FIXME: At some point we may want to just limit it to one thread per signal, but
// for now, I'm allowing multiple threads.  We should reevaluate this later in the project
var MAX_SIGNAL_THREADS = 16		// probably overkill, but idList uses a granularity of 16

class signal_t {
	threadnum: number /*int*/;
	$function: function_t;
}

class signalList_t {
//public:
	signal: idList<signal_t>[ /*NUM_SIGNALS */];
	constructor ( ) {
		this.signal = new Array<idList<signal_t>>( signalNum_t.NUM_SIGNALS );
		for ( var i = 0; i < signalNum_t.NUM_SIGNALS; i++ ) {
			this.signal[i] = new idList<signal_t>( signal_t );
		}
	}
}


class entityFlags_s {
	// todo: bit fields
	notarget: boolean /*:1*/; // if true never attack or target this entity
	noknockback: boolean /*:1*/; // if true no knockback from hits
	takedamage: boolean /*:1*/; // if true this entity can be damaged
	hidden: boolean /*:1*/; // if true this entity is not visible
	bindOrientated: boolean /*:1*/; // if true both the master orientation is used for binding
	solidForTeam: boolean /*:1*/; // if true this entity is considered solid when a physics team mate pushes entities
	forcePhysicsUpdate: boolean /*:1*/; // if true always update from the physics whether the object moved or not
	selected: boolean /*:1*/; // if true the entity is selected for editing
	neverDormant: boolean /*:1*/; // if true the entity never goes dormant
	isDormant: boolean /*:1*/; // if true the entity is dormant
	hasAwakened: boolean /*:1*/; // before a monster has been awakened the first time, use full PVS for dormant instead of area-connected
	networkSync: boolean /*:1*/; // if true the entity is synchronized over the network

	memset0 ( ): void {
		this.notarget = false;
		this.noknockback = false;
		this.takedamage = false;
		this.hidden = false;
		this.bindOrientated = false;
		this.solidForTeam = false;
		this.forcePhysicsUpdate = false;
		this.selected = false;
		this.neverDormant = false;
		this.isDormant = false;
		this.hasAwakened = false;
		this.networkSync = false;
	}
}

class idEntity extends idClass {
////public:
	static MAX_PVS_AREAS = 4;

	entityNumber: number; // index into the entity list		//	int						
	entityDefNumber: number; // index into the entity def list	//	int						

	spawnNode = new idLinkList<idEntity> ( ); // for being linked into spawnedEntities list
	activeNode = new idLinkList<idEntity> ( ); // for being linked into activeEntities list

	snapshotNode = new idLinkList<idEntity> ( ); // for being linked into snapshotEntities list
	snapshotSequence: number /*int*/; // last snapshot this entity was in
	snapshotBits: number /*int*/; // number of bits this entity occupied in the last snapshot

	name = new idStr; // name of entity
	spawnArgs = new idDict; // key/value pairs used to spawn and initialize entity
	scriptObject = new idScriptObject; // contains all script defined data for this entity

	thinkFlags: number /*int*/; // TH_? flags
	dormantStart: number /*int*/; // time that the entity was first closed off from player
	cinematic: boolean; // during cinematics, entity will only think if cinematic is set

	renderView: renderView_t; // for camera views from this entity
	cameraTarget: idEntity; // any remoteRenderMap shaders will use this

	targets: idList<idEntityPtr<idEntity>>; // when this entity is activated these entities entity are activated

	health: number /*int*/; // FIXME: do all objects really need health?

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
	//Spawn ( ): void { throw "placeholder"; }

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
////	virtual void			GetImpactInfo( ent:idEntity, /*int*/ id:number, const idVec3 &point, impactInfo_t *info );
////							// apply an impulse to the physics object, 'ent' is the entity applying the impulse
////	virtual void			ApplyImpulse( ent:idEntity, /*int*/ id:number, const idVec3 &point, const idVec3 &impulse );
////							// add a force to the physics object, 'ent' is the entity adding the force
////	virtual void			AddForce( ent:idEntity, /*int*/ id:number, const idVec3 &point, const idVec3 &force );
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
	renderEntity = new renderEntity_t; // used to present a model to the renderer
	modelDefHandle: number /*int*/; // handle to static renderer model
	refSound = new refSound_t; // used to present sound to the audio engine
////
////private:
	defaultPhysicsObj = new idPhysics_Static; // default physics object
	physics: idPhysics; // physics used for this entity
	bindMaster: idEntity; // entity bound to if unequal NULL
	bindJoint: jointHandle_t; // joint bound to if unequal INVALID_JOINT
	bindBody: number /*int*/; // body bound to if unequal -1
	teamMaster: idEntity; // master of the physics team
	teamChain: idEntity; // next entity in physics team

	numPVSAreas: number /*int*/; // number of renderer areas the entity covers
	PVSAreas = new Int32Array( idEntity.MAX_PVS_AREAS ); // numbers of the renderer areas the entity covers

	signals: signalList_t;

	mpGUIState: number /*int*/; // local cache to avoid systematic SetStateInt
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
	Event_SetNeverDormant ( /*int*/ enable: number ): void { throw "placeholder"; }


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
////UpdateChangeableSpawnArgs( const idDict *source ) {
////	var/*int*/i:number;
////	const char *target;
////
////	if ( !source ) {
////		source = this.spawnArgs;
////	}
////	this.cameraTarget = NULL;
////	target = source.GetString( "cameraTarget" );
////	if ( target && target[0] ) {
////		// update the camera taget
////		this.PostEventMS( &EV_UpdateCameraTarget, 0 );
////	}
////
////	for ( i = 0; i < MAX_RENDERENTITY_GUI; i++ ) {
////		UpdateGuiParms( this.renderEntity.gui[ i ], source );
////	}
////}

/*
================
idEntity::idEntity
================
*/
	constructor ( ) {
		super ( );

		this.entityNumber = ENTITYNUM_NONE;
		this.entityDefNumber = -1;

		this.spawnNode.SetOwner( this );
		this.activeNode.SetOwner( this );

		this.snapshotNode.SetOwner( this );
		this.snapshotSequence = -1;
		this.snapshotBits = 0;

		this.thinkFlags = 0;
		this.dormantStart = 0;
		this.cinematic = false;
		this.renderView = null;
		this.cameraTarget = null;
		this.health = 0;

		this.physics = null;
		this.bindMaster = null;
		this.bindJoint = jointHandle_t.INVALID_JOINT;
		this.bindBody = -1;
		this.teamMaster = null;
		this.teamChain = null;
		this.signals = null;

		memset( this.PVSAreas, 0, sizeof( this.PVSAreas ) );
		this.numPVSAreas = -1;

		this.fl.memset0 ( ); //	memset( this.fl, 0, sizeof( this.fl ) );
		this.fl.neverDormant = true; // most entities never go dormant

		this.renderEntity.memset0 ( );
		this.modelDefHandle = -1;
		this.refSound.memset0 ( );

		this.mpGUIState = -1;
	}

/*
================
idEntity::FixupLocalizedStrings
================
*/
	FixupLocalizedStrings ( ) {
		for ( var i = 0; i < this.spawnArgs.GetNumKeyVals ( ); i++ ) {
			var kv = this.spawnArgs.GetKeyVal( i );
			if ( idStr.Cmpn( kv.GetValue ( ).data, STRTABLE_ID, STRTABLE_ID_LENGTH ) == 0 ) {
				this.spawnArgs.Set( kv.GetKey ( ).data, common.GetLanguageDict ( ).GetString( kv.GetValue ( ).data ) );
			}
		}
	}

/*
================
idEntity::Spawn
================
*/
	Spawn ( ): void {
		var i: number /*int*/;
		var temp = new R<string> ( ); //const char*temp;
		var origin = new idVec3;
		var axis = new idMat3;
		var networkSync: idKeyValue;
		var classname = new R<string> ( );
		var scriptObjectName = new R<string> ( );

		gameLocal.RegisterEntity( this );

		this.spawnArgs.GetString_Rstring( "classname", null, classname );
		var def = gameLocal.FindEntityDef( classname.$, false );
		if ( def ) {
			this.entityDefNumber = def.Index ( );
		}

		this.FixupLocalizedStrings ( );

		// parse static models the same way the editor display does
		gameEdit.ParseSpawnArgsToRenderEntity( this.spawnArgs, this.renderEntity );

		this.renderEntity.entityNum = this.entityNumber;

		// go dormant within 5 frames so that when the map starts most monsters are dormant
		this.dormantStart = gameLocal.time - DELAY_DORMANT_TIME + gameLocal.msec * 5;

		origin.equals( this.renderEntity.origin );
		axis.equals( this.renderEntity.axis );

		// do the audio parsing the same way dmap and the editor do
		gameEdit.ParseSpawnArgsToRefSound( this.spawnArgs, this.refSound );

		// only play SCHANNEL_PRIVATE when sndworld.PlaceListener() is called with this listenerId
		// don't spatialize sounds from the same entity
		this.refSound.listenerId = this.entityNumber + 1;

		this.cameraTarget = null;
		temp.$ = this.spawnArgs.GetString( "cameraTarget" );
		if ( temp && temp.$ ) {
			// update the camera taget
			this.PostEventMS( EV_UpdateCameraTarget, 0 );
		}

		for ( i = 0; i < MAX_RENDERENTITY_GUI; i++ ) {
			UpdateGuiParms( this.renderEntity.gui[i], this.spawnArgs );
		}

		this.fl.solidForTeam = this.spawnArgs.GetBool( "solidForTeam", "0" );
		this.fl.neverDormant = this.spawnArgs.GetBool( "neverDormant", "0" );
		this.fl.hidden = this.spawnArgs.GetBool( "hide", "0" );
		if ( this.fl.hidden ) {
			// make sure we're hidden, since a spawn function might not set it up right
			this.PostEventMS( EV_Hide, 0 );
		}
		this.cinematic = this.spawnArgs.GetBool( "cinematic", "0" );

		networkSync = this.spawnArgs.FindKey( "networkSync" );
		if ( networkSync ) {
			this.fl.networkSync = ( atoi( networkSync.GetValue ( ).data ) != 0 );
		}

//#if 0
//	if ( !gameLocal.isClient ) {
//		// common.DPrintf( "NET: DBG %s - %s is synced: %s\n", this.spawnArgs.GetString( "classname", "" ), GetType().classname, this.fl.networkSync ? "true" : "false" );
//		if ( this.spawnArgs.GetString( "classname", "" )[ 0 ] == '\0' && !this.fl.networkSync ) {
//			common.DPrintf( "NET: WRN %s entity, no classname, and no networkSync?\n", GetType().classname );
//		}
//	}
//#endif

		// every object will have a unique name
		temp.$ = this.spawnArgs.GetString( "name", va( "%s_%s_%d", this.GetClassname ( ), this.spawnArgs.GetString( "classname" ), this.entityNumber ) );
		this.SetName( temp.$ );

		// if we have targets, wait until all entities are spawned to get them
		if ( this.spawnArgs.MatchPrefix( "target" ) || this.spawnArgs.MatchPrefix( "guiTarget" ) ) {
			if ( gameLocal.GameState ( ) == gameState_t.GAMESTATE_STARTUP ) {
				this.PostEventMS( EV_FindTargets, 0 );
			} else {
				// not during spawn, so it's ok to get the targets
				this.FindTargets ( );
			}
		}

		this.health = this.spawnArgs.GetInt( "health" );

		this.InitDefaultPhysics( origin, axis );

		this.SetOrigin( origin );
		this.SetAxis( axis );

		temp.$ = this.spawnArgs.GetString( "model" );
		if ( temp.$ ) {
			this.SetModel( temp.$ );
		}

		if ( this.spawnArgs.GetString_Rstring( "bind", "", temp ) ) {
			this.PostEventMS( EV_SpawnBind, 0 );
		}

		// auto-start a sound on the entity
		if ( this.refSound.shader && !this.refSound.waitfortrigger ) {
			this.StartSoundShader( this.refSound.shader, gameSoundChannel_t.SND_CHANNEL_ANY, 0, false, null );
		}

		// setup script object
		if ( this.ShouldConstructScriptObjectAtSpawn ( ) && this.spawnArgs.GetString_Rstring( "scriptobject", null, scriptObjectName ) ) {
			if ( !this.scriptObject.SetType( scriptObjectName.$ ) ) {
				gameLocal.Error( "Script object '%s' not found on entity '%s'.", scriptObjectName.$, this.name.c_str ( ) );
			}

			this.ConstructScriptObject ( );
		}
	}

/*
================
idEntity::~idEntity
================
*/
	destructor ( ): void {
		todoThrow ( );
		////	if ( gameLocal.GameState() != GAMESTATE_SHUTDOWN && !gameLocal.isClient && this.fl.networkSync && this.entityNumber >= MAX_CLIENTS ) {
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
		////	this.scriptObject.Free();
		////
		////	if ( this.thinkFlags ) {
		////		this.BecomeInactive( this.thinkFlags );
		////	}
		////	this.activeNode.Remove();
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
		////	delete this.renderView;
		////	this.renderView = NULL;
		////
		////	delete this.signals;
		////	this.signals = NULL;
		////
		////	this.FreeModelDef();
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
////Save( idSaveGame *savefile ) const {
////	int i, j;
////
////	savefile.WriteInt( this.entityNumber );
////	savefile.WriteInt( this.entityDefNumber );
////
////	// spawnNode and activeNode are restored by gameLocal
////
////	savefile.WriteInt( this.snapshotSequence );
////	savefile.WriteInt( this.snapshotBits );
////
////	savefile.WriteDict( this.spawnArgs );
////	savefile.WriteString( this.name );
////	this.scriptObject.Save( savefile );
////
////	savefile.WriteInt( this.thinkFlags );
////	savefile.WriteInt( this.dormantStart );
////	savefile.WriteBool( this.cinematic );
////
////	savefile.WriteObject( this.cameraTarget );
////
////	savefile.WriteInt( this.health );
////
////	savefile.WriteInt( targets.Num() );
////	for( i = 0; i < targets.Num(); i++ ) {
////		targets[ i ].Save( savefile );
////	}
////
////	entityFlags_s flags = this.fl;
////	LittleBitField( &flags, sizeof( flags ) );
////	savefile.Write( &flags, sizeof( flags ) );
////
////	savefile.WriteRenderEntity( this.renderEntity );
////	savefile.WriteInt( this.modelDefHandle );
////	savefile.WriteRefSound( this.refSound );
////
////	savefile.WriteObject( this.bindMaster );
////	savefile.WriteJoint( this.bindJoint );
////	savefile.WriteInt( this.bindBody );
////	savefile.WriteObject( this.teamMaster );
////	savefile.WriteObject( this.teamChain );
////
////	savefile.WriteStaticObject( defaultPhysicsObj );
////
////	savefile.WriteInt( this.numPVSAreas );
////	for( i = 0; i < MAX_PVS_AREAS; i++ ) {
////		savefile.WriteInt( this.PVSAreas[ i ] );
////	}
////
////	if ( !this.signals ) {
////		savefile.WriteBool( false );
////	} else {
////		savefile.WriteBool( true );
////		for( i = 0; i < NUM_SIGNALS; i++ ) {
////			savefile.WriteInt( this.signals.signal[ i ].Num() );
////			for( j = 0; j < this.signals.signal[ i ].Num(); j++ ) {
////				savefile.WriteInt( this.signals.signal[ i ][ j ].threadnum );
////				savefile.WriteString( this.signals.signal[ i ][ j ].function.Name() );
////			}
////		}
////	}
////
////	savefile.WriteInt( this.mpGUIState );
////}
////
/////*
////================
////idEntity::Restore
////================
////*/
////Restore( idRestoreGame *savefile ) {
////	int			i, j;
////	int			num;
////	idStr		funcname;
////
////	savefile.ReadInt( this.entityNumber );
////	savefile.ReadInt( this.entityDefNumber );
////
////	// spawnNode and activeNode are restored by gameLocal
////
////	savefile.ReadInt( this.snapshotSequence );
////	savefile.ReadInt( this.snapshotBits );
////
////	savefile.ReadDict( this.spawnArgs );
////	savefile.ReadString( this.name );
////	this.SetName( this.name );
////
////	this.scriptObject.Restore( savefile );
////
////	savefile.ReadInt( this.thinkFlags );
////	savefile.ReadInt( this.dormantStart );
////	savefile.ReadBool( this.cinematic );
////
////	savefile.ReadObject( reinterpret_cast<idClass *&>( this.cameraTarget ) );
////
////	savefile.ReadInt( this.health );
////
////	targets.Clear();
////	savefile.ReadInt( num );
////	targets.SetNum( num );
////	for( i = 0; i < num; i++ ) {
////		targets[ i ].Restore( savefile );
////	}
////
////	savefile.Read( &this.fl, sizeof( this.fl ) );
////	LittleBitField( &this.fl, sizeof( this.fl ) );
////	
////	savefile.ReadRenderEntity( this.renderEntity );
////	savefile.ReadInt( this.modelDefHandle );
////	savefile.ReadRefSound( this.refSound );
////
////	savefile.ReadObject( reinterpret_cast<idClass *&>( this.bindMaster ) );
////	savefile.ReadJoint( this.bindJoint );
////	savefile.ReadInt( this.bindBody );
////	savefile.ReadObject( reinterpret_cast<idClass *&>( this.teamMaster ) );
////	savefile.ReadObject( reinterpret_cast<idClass *&>( this.teamChain ) );
////
////	savefile.ReadStaticObject( this.defaultPhysicsObj );
////	RestorePhysics( &this.defaultPhysicsObj );
////
////	savefile.ReadInt( this.numPVSAreas );
////	for( i = 0; i < MAX_PVS_AREAS; i++ ) {
////		savefile.ReadInt( this.PVSAreas[ i ] );
////	}
////
////	bool readsignals;
////	savefile.ReadBool( readsignals );
////	if ( readsignals ) {
////		this.signals = new signalList_t;
////		for( i = 0; i < NUM_SIGNALS; i++ ) {
////			savefile.ReadInt( num );
////			this.signals.signal[ i ].SetNum( num );
////			for( j = 0; j < num; j++ ) {
////				savefile.ReadInt( this.signals.signal[ i ][ j ].threadnum );
////				savefile.ReadString( funcname );
////				this.signals.signal[ i ][ j ].function = gameLocal.program.FindFunction( funcname );
////				if ( !this.signals.signal[ i ][ j ].function ) {
////					savefile.Error( "Function '%s' not found", funcname.c_str() );
////				}
////			}
////		}
////	}
////
////	savefile.ReadInt( this.mpGUIState );
////
////	// restore must retrieve modelDefHandle from the renderer
////	if ( this.modelDefHandle != -1 ) {
////		this.modelDefHandle = gameRenderWorld.AddEntityDef( &this.renderEntity );
////	}
////}
////
/////*
////================
////idEntity::GetEntityDefName
////================
////*/
////const char * idEntity::GetEntityDefName( ):void const {
////	if ( this.entityDefNumber < 0 ) {
////		return "*unknown*";
////	}
////	return declManager.DeclByIndex( DECL_ENTITYDEF, this.entityDefNumber, false ).GetName();
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

/*
================
idEntity::GetName
================
*/
	GetName ( ): string {
		return this.name.c_str ( );
	}


/***********************************************************************

	Thinking
	
***********************************************************************/

/*
================
idEntity::Think
================
*/
	Think ( ): void {
		this.RunPhysics ( );
		this.Present ( );
	}

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
////	if ( this.fl.neverDormant ) {
////		return false;
////	}
////
////	// if the monster area is not topologically connected to a player
////	if ( !gameLocal.InPlayerConnectedArea( this ) ) {
////		if ( this.dormantStart == 0 ) {
////			this.dormantStart = gameLocal.time;
////		}
////		if ( gameLocal.time - this.dormantStart < DELAY_DORMANT_TIME ) {
////			// just got closed off, don't go dormant yet
////			return false;
////		}
////		return true;
////	} else {
////		// the monster area is topologically connected to a player, but if
////		// the monster hasn't been woken up before, do the more precise PVS check
////		if ( !this.fl.hasAwakened ) {
////			if ( !gameLocal.InPlayerPVS( this ) ) {
////				return true;		// stay dormant
////			}
////		}
////
////		// wake up
////		this.dormantStart = 0;
////		this.fl.hasAwakened = true;		// only go dormant when area closed off now, not just out of PVS
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
////	if ( dormant && !this.fl.isDormant ) {
////		this.fl.isDormant = true;
////		DormantBegin();
////	} else if ( !dormant && this.fl.isDormant ) {
////		this.fl.isDormant = false;
////		DormantEnd();
////	}
////
////	return dormant;
////}

/*
================
idEntity::DormantBegin

called when entity becomes dormant
================
*/
	DormantBegin ( ): void {
	}

/*
================
idEntity::DormantEnd

called when entity wakes from being dormant
================
*/
	DormantEnd ( ): void {
	}

/*
================
idEntity::IsActive
================
*/
	IsActive ( ): boolean {
		return this.activeNode.InList ( );
	}

/*
================
idEntity::BecomeActive
================
*/
	BecomeActive ( /*int*/ flags: number ): void {
		if ( ( flags & TH_PHYSICS ) ) {
			// enable the team master if this entity is part of a physics team
			if ( this.teamMaster && this.teamMaster != this ) {
				this.teamMaster.BecomeActive( TH_PHYSICS );
			} else if ( !( this.thinkFlags & TH_PHYSICS ) ) {
				// if this is a pusher
				if ( this.physics.IsType( idPhysics_Parametric.Type ) || this.physics.IsType( idPhysics_Actor.Type ) ) {
					gameLocal.sortPushers = true;
				}
			}
		}

		var /*int */oldFlags = this.thinkFlags;
		this.thinkFlags |= flags;
		if ( this.thinkFlags ) {
			if ( !this.IsActive ( ) ) {
				this.activeNode.AddToEnd( gameLocal.activeEntities );
			} else if ( !oldFlags ) {
				// we became inactive this frame, so we have to decrease the count of entities to deactivate
				gameLocal.numEntitiesToDeactivate--;
			}
		}
	}

/*
================
idEntity::BecomeInactive
================
*/
	BecomeInactive ( /*int*/ flags: number ): void {
		if ( ( flags & TH_PHYSICS ) ) {
			// may only disable physics on a team master if no team members are running physics or bound to a joints
			if ( this.teamMaster == this ) {
				for ( var ent: idEntity = this.teamMaster.teamChain; ent; ent = ent.teamChain ) {
					if ( ( ent.thinkFlags & TH_PHYSICS ) || ( ( ent.bindMaster == this ) && ( ent.bindJoint != jointHandle_t.INVALID_JOINT ) ) ) {
						flags &= ~TH_PHYSICS;
						break;
					}
				}
			}
		}

		if ( this.thinkFlags ) {
			this.thinkFlags &= ~flags;
			if ( !this.thinkFlags && this.IsActive ( ) ) {
				gameLocal.numEntitiesToDeactivate++;
			}
		}

		if ( ( flags & TH_PHYSICS ) ) {
			// if this entity has a team master
			if ( this.teamMaster && this.teamMaster != this ) {
				// if the team master is at rest
				if ( this.teamMaster.IsAtRest ( ) ) {
					this.teamMaster.BecomeInactive( TH_PHYSICS );
				}
			}
		}
	}
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
////SetShaderParm( int parmnum, float value ) {
////	if ( ( parmnum < 0 ) || ( parmnum >= MAX_ENTITY_SHADER_PARMS ) ) {
////		gameLocal.Warning( "shader parm index (%d) out of range", parmnum );
////		return;
////	}
////
////	this.renderEntity.shaderParms[ parmnum ] = value;
////	this.UpdateVisuals();
////}
////
/////*
////================
////idEntity::SetColor
////================
////*/
////SetColor( float red, float green, float blue ) {
////	this.renderEntity.shaderParms[ SHADERPARM_RED ]		= red;
////	this.renderEntity.shaderParms[ SHADERPARM_GREEN ]	= green;
////	this.renderEntity.shaderParms[ SHADERPARM_BLUE ]		= blue;
////	this.UpdateVisuals();
////}
////
/////*
////================
////idEntity::SetColor
////================
////*/
////SetColor( color:idVec3 ) {
////	SetColor( color[ 0 ], color[ 1 ], color[ 2 ] );
////	this.UpdateVisuals();
////}
////
/////*
////================
////idEntity::GetColor
////================
////*/
////GetColor( idVec3 &out ) const {
////	out[ 0 ] = this.renderEntity.shaderParms[ SHADERPARM_RED ];
////	out[ 1 ] = this.renderEntity.shaderParms[ SHADERPARM_GREEN ];
////	out[ 2 ] = this.renderEntity.shaderParms[ SHADERPARM_BLUE ];
////}
////
/////*
////================
////idEntity::SetColor
////================
////*/
////SetColor( const idVec4 &color ) {
////	this.renderEntity.shaderParms[ SHADERPARM_RED ]		= color[ 0 ];
////	this.renderEntity.shaderParms[ SHADERPARM_GREEN ]	= color[ 1 ];
////	this.renderEntity.shaderParms[ SHADERPARM_BLUE ]		= color[ 2 ];
////	this.renderEntity.shaderParms[ SHADERPARM_ALPHA ]	= color[ 3 ];
////	this.UpdateVisuals();
////}
////
/////*
////================
////idEntity::GetColor
////================
////*/
////GetColor( idVec4 &out ) const {
////	out[ 0 ] = this.renderEntity.shaderParms[ SHADERPARM_RED ];
////	out[ 1 ] = this.renderEntity.shaderParms[ SHADERPARM_GREEN ];
////	out[ 2 ] = this.renderEntity.shaderParms[ SHADERPARM_BLUE ];
////	out[ 3 ] = this.renderEntity.shaderParms[ SHADERPARM_ALPHA ];
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
/*
================
idEntity::SetModel
================
*/
	SetModel ( modelname: string ): void {
		assert( modelname );

		this.FreeModelDef ( );

		this.renderEntity.hModel = renderModelManager.FindModel( modelname );

		if ( this.renderEntity.hModel ) {
			this.renderEntity.hModel.Reset ( );
		}

		this.renderEntity.callback = null;
		this.renderEntity.numJoints = 0;
		this.renderEntity.joints = null;
		if ( this.renderEntity.hModel ) {
			this.renderEntity.bounds = this.renderEntity.hModel.Bounds( this.renderEntity );
		} else {
			this.renderEntity.bounds.Zero ( );
		}

		this.UpdateVisuals ( );
	}
////
/////*
////================
////idEntity::SetSkin
////================
////*/
////SetSkin( const idDeclSkin *skin ) {
////	this.renderEntity.customSkin = skin;
////	this.UpdateVisuals();
////}
////
/////*
////================
////idEntity::GetSkin
////================
////*/
////const idDeclSkin *idEntity::GetSkin( ):void const {
////	return this.renderEntity.customSkin;
////}

/*
================
idEntity::FreeModelDef
================
*/
	FreeModelDef ( ): void {
		if ( this.modelDefHandle != -1 ) {
			gameRenderWorld.FreeEntityDef( this.modelDefHandle );
			this.modelDefHandle = -1;
		}
	}

/*
================
idEntity::FreeLightDef
================
*/
FreeLightDef( ):void {
}

/*
================
idEntity::IsHidden
================
*/
	IsHidden ( ): boolean {
		return this.fl.hidden;
	}

/*
================
idEntity::Hide
================
*/
	Hide ( ): void {
		if ( !this.IsHidden ( ) ) {
			this.fl.hidden = true;
			this.FreeModelDef ( );
			this.UpdateVisuals ( );
		}
	}

/////*
////================
////idEntity::Show
////================
////*/
////Show( ):void {
////	if ( IsHidden() ) {
////		this.fl.hidden = false;
////		this.UpdateVisuals();
////	}
////}
////
/*
================
idEntity::UpdateModelTransform
================
*/
UpdateModelTransform( ):void {
	var origin = new idVec3;
	var axis = new idMat3;

	if (this.GetPhysicsToVisualTransform(origin, axis)) {
		todoThrow ( );
		//this.renderEntity.axis = axis * this.GetPhysics().GetAxis();
		//this.renderEntity.origin = this.GetPhysics().GetOrigin() + origin * this.renderEntity.axis;
	} else {
		this.renderEntity.axis.equals( this.GetPhysics ( ).GetAxis ( ) );
		this.renderEntity.origin.equals( this.GetPhysics ( ).GetOrigin ( ) );
	}
}

/*
================
idEntity::UpdateModel
================
*/
	UpdateModel ( ): void {
		this.UpdateModelTransform();

		// check if the entity has an MD5 model
		var animator = this.GetAnimator();
		if ( animator && animator.ModelHandle() ) {
			// set the callback to update the joints
			this.renderEntity.callback = idEntity.ModelCallback;
		}

		// set to invalid number to force an update the next time the PVS areas are retrieved
		this.ClearPVSAreas();

		// ensure that we call Present this frame
		this.BecomeActive( TH_UPDATEVISUALS );
	}

/*
================
idEntity::UpdateVisuals
================
*/
	UpdateVisuals ( ): void {
		this.UpdateModel ( );
		this.UpdateSound ( );
	}

/////*
////================
////idEntity::UpdatePVSAreas
////================
////*/
////UpdatePVSAreas( ):void {
////	int localNumPVSAreas, localPVSAreas[32];
////	idBounds modelAbsBounds;
////	var/*int*/i:number;
////
////	modelAbsBounds.FromTransformedBounds( this.renderEntity.bounds, this.renderEntity.origin, this.renderEntity.axis );
////	localNumPVSAreas = gameLocal.pvs.GetPVSAreas( modelAbsBounds, localPVSAreas, sizeof( localPVSAreas ) / sizeof( localPVSAreas[0] ) );
////
////	// FIXME: some particle systems may have huge bounds and end up in many PVS areas
////	// the first MAX_PVS_AREAS may not be visible to a network client and as a result the particle system may not show up when it should
////	if ( localNumPVSAreas > MAX_PVS_AREAS ) {
////		localNumPVSAreas = gameLocal.pvs.GetPVSAreas( idBounds( modelAbsBounds.GetCenter() ).Expand( 64.0 ), localPVSAreas, sizeof( localPVSAreas ) / sizeof( localPVSAreas[0] ) );
////	}
////
////	for ( this.numPVSAreas = 0; this.numPVSAreas < MAX_PVS_AREAS && this.numPVSAreas < localNumPVSAreas; this.numPVSAreas++ ) {
////		this.PVSAreas[this.numPVSAreas] = localPVSAreas[this.numPVSAreas];
////	}
////
////	for( i = this.numPVSAreas; i < MAX_PVS_AREAS; i++ ) {
////		this.PVSAreas[ i ] = 0;
////	}
////}
////
/////*
////================
////idEntity::UpdatePVSAreas
////================
////*/
////UpdatePVSAreas( pos:idVec3 ) {
////	var/*int*/i:number;
////
////	this.numPVSAreas = gameLocal.pvs.GetPVSAreas( idBounds( pos ), this.PVSAreas, MAX_PVS_AREAS );
////	i = this.numPVSAreas;
////	while ( i < MAX_PVS_AREAS ) {
////		this.PVSAreas[ i++ ] = 0;
////	}
////}
////
/////*
////================
////idEntity::GetNumPVSAreas
////================
////*/
////int idEntity::GetNumPVSAreas( ):void {
////	if ( this.numPVSAreas < 0 ) {
////		UpdatePVSAreas();
////	}
////	return this.numPVSAreas;
////}
////
/////*
////================
////idEntity::GetPVSAreas
////================
////*/
////const int *idEntity::GetPVSAreas( ):void {
////	if ( this.numPVSAreas < 0 ) {
////		UpdatePVSAreas();
////	}
////	return this.PVSAreas;
////}

/*
================
idEntity::ClearPVSAreas
================
*/
	ClearPVSAreas ( ): void {
		this.numPVSAreas = -1;
	}

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
////	if ( this.teamMaster ) {
////		for ( part = this.teamMaster; part; part = part.teamChain ) {
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
////ProjectOverlay( const idVec3 &origin, const idVec3 &dir, float size, const char *material ) {
////	float s, c;
////	idMat3 axis, axistemp;
////	idVec3 localOrigin, localAxis[2];
////	idPlane localPlane[2];
////
////	// make sure the entity has a valid model handle
////	if ( this.modelDefHandle < 0 ) {
////		return;
////	}
////
////	// only do this on dynamic md5 models
////	if ( this.renderEntity.hModel.IsDynamicModel() != DM_CACHED ) {
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
////	this.renderEntity.axis.ProjectVector( origin - this.renderEntity.origin, localOrigin );
////	this.renderEntity.axis.ProjectVector( axis[0], localAxis[0] );
////	this.renderEntity.axis.ProjectVector( axis[1], localAxis[1] );
////
////	size = 1.0 / size;
////	localAxis[0] *= size;
////	localAxis[1] *= size;
////
////	localPlane[0] = localAxis[0];
////	localPlane[0][3] = -( localOrigin * localAxis[0] ) + 0.5;
////
////	localPlane[1] = localAxis[1];
////	localPlane[1][3] = -( localOrigin * localAxis[1] ) + 0.5;
////
////	const idMaterial *mtr = declManager.FindMaterial( material );
////
////	// project an overlay onto the model
////	gameRenderWorld.ProjectOverlay( this.modelDefHandle, localPlane, mtr );
////
////	// make sure non-animating models update their overlay
////	UpdateVisuals();
////}

/*
================
idEntity::Present

Present is called to allow entities to generate refEntities, lights, etc for the renderer.
================
*/
	Present ( ): void {

		if ( !gameLocal.isNewFrame ) {
			return;
		}

		// don't present to the renderer if the entity hasn't changed
		if ( !( this.thinkFlags & TH_UPDATEVISUALS ) ) {
			return;
		}
		this.BecomeInactive( TH_UPDATEVISUALS );

		// camera target for remote render views
		if ( this.cameraTarget && gameLocal.InPlayerPVS( this ) ) {
			this.renderEntity.remoteRenderView = this.cameraTarget.GetRenderView ( );
		}

		// if set to invisible, skip
		if ( !this.renderEntity.hModel || this.IsHidden ( ) ) {
			return;
		}

		// add to refresh list
		if ( this.modelDefHandle == -1 ) {
			this.modelDefHandle = gameRenderWorld.AddEntityDef(   this.renderEntity );
		} else {
			gameRenderWorld.UpdateEntityDef( this.modelDefHandle,  this.renderEntity );
		}
	}

/*
================
idEntity::GetRenderEntity
================
*/
	GetRenderEntity ( ): renderEntity_t {
		return this.renderEntity;
	}

/*
================
idEntity::GetModelDefHandle
================
*/
	GetModelDefHandle ( ): number {
		return this.modelDefHandle;
	}

/*
================
idEntity::UpdateRenderEntity
================
*/
	UpdateRenderEntity ( renderEntity: renderEntity_t, renderView: renderView_t ): boolean {
		if ( gameLocal.inCinematic && gameLocal.skipCinematic ) {
			return false;
		}

		var animator = this.GetAnimator ( );
		if ( animator ) {
			return animator.CreateFrame( gameLocal.time, false );
		}

		return false;
	}

/*
================
idEntity::ModelCallback

	NOTE: may not change the game state whatsoever!
================
*/
	static ModelCallback ( renderEntity: renderEntity_t, renderView: renderView_t ): boolean {
		var ent: idEntity;

		ent = gameLocal.entities[renderEntity.entityNum];
		if ( !ent ) {
			gameLocal.Error( "idEntity::ModelCallback: callback with NULL game entity" );
		}

		return ent.UpdateRenderEntity( renderEntity, renderView );
	}

/*
================
idEntity::GetAnimator

Subclasses will be responsible for allocating animator.
================
*/
	GetAnimator ( ): idAnimator {
		return null;
	}

/*
=============
idEntity::GetRenderView

This is used by remote camera views to look from an entity
=============
*/
	GetRenderView ( ): renderView_t {
		if ( !this.renderView ) {
			this.renderView = new renderView_t;
		}
		this.renderView.memset0 ( );

		this.renderView.vieworg = this.GetPhysics ( ).GetOrigin ( );
		this.renderView.fov_x = 120;
		this.renderView.fov_y = 120;
		this.renderView.viewaxis = this.GetPhysics ( ).GetAxis ( );

		// copy global shader parms
		for ( var i = 0; i < MAX_GLOBAL_SHADER_PARMS; i++ ) {
			this.renderView.shaderParms[i] = gameLocal.globalShaderParms[i];
		}

		this.renderView.globalMaterial = gameLocal.GetGlobalMaterial ( );

		this.renderView.time = gameLocal.time;

		return this.renderView;
	}

/***********************************************************************

  Sound
	
***********************************************************************/

/*
================
idEntity::CanPlayChatterSounds

Used for playing chatter sounds on monsters.
================
*/
	CanPlayChatterSounds ( ): boolean {
		return true;
	}

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
////	return this.StartSoundShader( shader, channel, soundShaderFlags, broadcast, length );
////}

/*
================
idEntity::StartSoundShader
================
*/
	StartSoundShader ( shader: idSoundShader, /*s_channelType*/ channel: number, /*int */soundShaderFlags: number, broadcast: boolean, /*int **/length: R<number> ): boolean {
		var /*float */diversity: number;
		var /*int */len: number;

		if ( length ) {
			length.$ = 0;
		}

		if ( !shader ) {
			return false;
		}

		if ( !gameLocal.isNewFrame ) {
			return true;
		}
		todoThrow ( );
		//if ( gameLocal.isServer && broadcast ) {
		//	idBitMsg	msg;
		//	byte		msgBuf[MAX_EVENT_PARAM_SIZE];

		//	msg.Init( msgBuf, sizeof( msgBuf ) );
		//	msg.BeginWriting();
		//	msg.WriteLong( gameLocal.ServerRemapDecl( -1, DECL_SOUND, shader.Index() ) );
		//	msg.WriteByte( channel );
		//	ServerSendEvent( EVENT_STARTSOUNDSHADER, &msg, false, -1 );
		//}

		//// set a random value for diversity unless one was parsed from the entity
		//if ( this.refSound.diversity < 0.0 ) {
		//	diversity = gameLocal.random.RandomFloat();
		//} else {
		//	diversity = this.refSound.diversity;
		//}

		//// if we don't have a soundEmitter allocated yet, get one now
		//if ( !this.refSound.referenceSound ) {
		//	this.refSound.referenceSound = gameSoundWorld.AllocSoundEmitter();
		//}

		//this.UpdateSound();

		//len = this.refSound.referenceSound.StartSound( shader, channel, diversity, soundShaderFlags );
		//if ( length ) {
		//	length.$ = len;
		//}

		//// set reference to the sound for shader synced effects
		//this.renderEntity.referenceSound = this.refSound.referenceSound;

		return true;
	}

/*
================
idEntity::StopSound
================
*/
	StopSound ( /*const s_channelType */channel: number, broadcast: boolean ): void {
		if ( !gameLocal.isNewFrame ) {
			return;
		}

		if ( gameLocal.isServer && broadcast ) {
			todoThrow ( );
			//idBitMsg	msg;
			//byte		msgBuf[MAX_EVENT_PARAM_SIZE];

			//msg.Init( msgBuf, sizeof( msgBuf ) );
			//msg.BeginWriting();
			//msg.WriteByte( channel );
			//ServerSendEvent( EVENT_STOPSOUNDSHADER, &msg, false, -1 );
		}

		if ( this.refSound.referenceSound ) {
			this.refSound.referenceSound.StopSound( channel );
		}
	}

/*
================
idEntity::SetSoundVolume

  Must be called before starting a new sound.
================
*/
	SetSoundVolume ( /*float*/ volume: number ): void {
		this.refSound.parms.volume = volume;
	}

/*
================
idEntity::UpdateSound
================
*/
	UpdateSound ( ): void {
		if ( this.refSound.referenceSound ) {
			todoThrow ( );
			//var origin = new idVec3;
			//var axis = new idMat3 ;

			//if ( this.GetPhysicsToSoundTransform( origin, axis ) ) {
			//	this.refSound.origin = this.GetPhysics().GetOrigin() + origin * axis;
			//} else {
			//	this.refSound.origin.opEquals( this.GetPhysics ( ).GetOrigin ( ) );
			//}

			//this.refSound.referenceSound.UpdateEmitter( this.refSound.origin, this.refSound.listenerId, this.refSound.parms );
		}
	}

/*
================
idEntity::GetListenerId
================
*/
	GetListenerId ( ): number {
		return this.refSound.listenerId;
	}

/*
================
idEntity::GetSoundEmitter
================
*/
	GetSoundEmitter ( ): idSoundEmitter {
		return this.refSound.referenceSound;
	}

/*
================
idEntity::FreeSoundEmitter
================
*/
	FreeSoundEmitter ( /*bool*/ immediate: boolean ): void {
		if (this.refSound.referenceSound) {
			todoThrow ( );
			//this.refSound.referenceSound.Free( immediate );
			//this.refSound.referenceSound = null;
		}
	}
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
////PreBind( ):void {
////}
////
/////*
////================
////idEntity::PostBind
////================
////*/
////PostBind( ):void {
////}
////
/////*
////================
////idEntity::PreUnbind
////================
////*/
////PreUnbind( ):void {
////}
////
/////*
////================
////idEntity::PostUnbind
////================
////*/
////PostUnbind( ):void {
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
////FinishBind( ):void {
////
////	// set the master on the physics object
////	this.physics.SetMaster( this.bindMaster, this.fl.bindOrientated );
////
////	// We are now separated from our previous team and are either
////	// an individual, or have a team of our own.  Now we can join
////	// the new bindMaster's team.  Bindmaster must be set before
////	// joining the team, or we will be placed in the wrong position
////	// on the team.
////	JoinTeam( this.bindMaster );
////
////	// if our bindMaster is enabled during a cinematic, we must be, too
////	this.cinematic = this.bindMaster.cinematic;
////
////	// make sure the team master is active so that physics get run
////	this.teamMaster.BecomeActive( TH_PHYSICS );
////}
////
/////*
////================
////idEntity::Bind
////
////  bind relative to the visual position of the master
////================
////*/
////Bind( idEntity *master, bool orientated ) {
////
////	if ( !InitBind( master ) ) {
////		return;
////	}
////
////	PreBind();
////
////	this.bindJoint = INVALID_JOINT;
////	this.bindBody = -1;
////	this.bindMaster = master;
////	this.fl.bindOrientated = orientated;
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
////BindToJoint( idEntity *master, jointname:string, bool orientated ) {
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
////	this.bindJoint = jointnum;
////	this.bindBody = -1;
////	this.bindMaster = master;
////	this.fl.bindOrientated = orientated;
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
////BindToJoint( idEntity *master, jointnum:jointHandle_t, bool orientated ) {
////
////	if ( !InitBind( master ) ) {
////		return;
////	}
////
////	PreBind();
////
////	this.bindJoint = jointnum;
////	this.bindBody = -1;
////	this.bindMaster = master;
////	this.fl.bindOrientated = orientated;
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
////BindToBody( idEntity *master, int bodyId, bool orientated ) {
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
////	this.bindJoint = INVALID_JOINT;
////	this.bindBody = bodyId;
////	this.bindMaster = master;
////	this.fl.bindOrientated = orientated;
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
////Unbind( ):void {
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
////	if ( !this.bindMaster ) {
////		return;
////	}
////
////	if ( !this.teamMaster ) {
////		// Teammaster already has been freed
////		this.bindMaster = NULL;
////		return;
////	}
////
////	PreUnbind();
////
////	if ( this.physics ) {
////		this.physics.SetMaster( NULL, this.fl.bindOrientated );
////	}
////
////	// We're still part of a team, so that means I have to extricate myself
////	// and any entities that are bound to me from the old team.
////	// Find the node previous to me in the team
////	prev = this.teamMaster;
////	for( ent = this.teamMaster.teamChain; ent && ( ent != this ); ent = ent.teamChain ) {
////		prev = ent;
////	}
////
////	assert( ent == this ); // If ent is not pointing to this, then something is very wrong.
////
////	// Find the last node in my team that is bound to me.
////	// Also find the first node not bound to me, if one exists.
////	last = this;
////	for( next = this.teamChain; next != NULL; next = next.teamChain ) {
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
////	if ( this.teamMaster != this ) {
////		prev.teamChain = next;
////		if ( !next && ( this.teamMaster == prev ) ) {
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
////	if ( this.teamChain ) {
////		// make myself my own team
////		this.teamMaster = this;
////	} else {
////		// no longer a team
////		this.teamMaster = NULL;
////	}
////
////	this.bindJoint = INVALID_JOINT;
////	this.bindBody = -1;
////	this.bindMaster = NULL;
////
////	PostUnbind();
////}
////
/////*
////================
////idEntity::RemoveBinds
////================
////*/
////RemoveBinds( ):void {
////	var ent:idEntity
////	idEntity *next;
////
////	for( ent = this.teamChain; ent != NULL; ent = next ) {
////		next = ent.teamChain;
////		if ( ent.bindMaster == this ) {
////			ent.Unbind();
////			ent.PostEventMS( &EV_Remove, 0 );
////			next = this.teamChain;
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
////	if ( this.bindMaster ) {
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
////	if ( !this.bindMaster ) {
////		return false;
////	}
////
////	for ( ent = this.bindMaster; ent != NULL; ent = ent.bindMaster ) {
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
////	return this.bindMaster;
////}
////
/////*
////================
////idEntity::GetBindJoint
////================
////*/
////jointHandle_t idEntity::GetBindJoint( ):void const {
////	return this.bindJoint;
////}
////
/////*
////================
////idEntity::GetBindBody
////================
////*/
////int idEntity::GetBindBody( ):void const {
////	return this.bindBody;
////}
////
/////*
////================
////idEntity::GetTeamMaster
////================
////*/
////idEntity *idEntity::GetTeamMaster( ):void const {
////	return this.teamMaster;
////}
////
/////*
////================
////idEntity::GetNextTeamEntity
////================
////*/
////idEntity *idEntity::GetNextTeamEntity( ):void const {
////	return this.teamChain;
////}
////
/////*
////=====================
////idEntity::ConvertLocalToWorldTransform
////=====================
////*/
////ConvertLocalToWorldTransform( idVec3 &offset, idMat3 &axis ) {
////	this.UpdateModelTransform();
////
////	offset = this.renderEntity.origin + offset * this.renderEntity.axis;
////	axis *= this.renderEntity.axis;
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
////	if ( !this.bindMaster ) {
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
////	if ( !this.bindMaster ) {
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
////	if ( !this.bindMaster ) {
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
////	if ( !this.bindMaster ) {
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
////	if ( this.bindMaster ) {
////		// if bound to a joint of an animated model
////		if ( this.bindJoint != INVALID_JOINT ) {
////			masterAnimator = this.bindMaster.GetAnimator();
////			if ( !masterAnimator ) {
////				masterOrigin = vec3_origin;
////				masterAxis = mat3_identity;
////				return false;
////			} else {
////				masterAnimator.GetJointTransform( this.bindJoint, gameLocal.time, masterOrigin, masterAxis );
////				masterAxis *= this.bindMaster.renderEntity.axis;
////				masterOrigin = this.bindMaster.renderEntity.origin + masterOrigin * this.bindMaster.renderEntity.axis;
////			}
////		} else if ( this.bindBody >= 0 && this.bindMaster.GetPhysics() ) {
////			masterOrigin = this.bindMaster.GetPhysics().GetOrigin( this.bindBody );
////			masterAxis = this.bindMaster.GetPhysics().GetAxis( this.bindBody );
////		} else {
////			masterOrigin = this.bindMaster.renderEntity.origin;
////			masterAxis = this.bindMaster.renderEntity.axis;
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
////GetWorldVelocities( idVec3 &linearVelocity, idVec3 &angularVelocity ) const {
////
////	linearVelocity = this.physics.GetLinearVelocity();
////	angularVelocity = this.physics.GetAngularVelocity();
////
////	if ( this.bindMaster ) {
////		idVec3 masterOrigin, masterLinearVelocity, masterAngularVelocity;
////		idMat3 masterAxis;
////
////		// get position of master
////		GetMasterPosition( masterOrigin, masterAxis );
////
////		// get master velocities
////		this.bindMaster.GetWorldVelocities( masterLinearVelocity, masterAngularVelocity );
////
////		// linear velocity relative to master plus master linear and angular velocity
////		linearVelocity = linearVelocity * masterAxis + masterLinearVelocity +
////								masterAngularVelocity.Cross( this.GetPhysics().GetOrigin() - masterOrigin );
////	}
////}
////
/////*
////================
////idEntity::JoinTeam
////================
////*/
////JoinTeam( idEntity *teammember ) {
////	var ent:idEntity
////	idEntity *master;
////	idEntity *prev;
////	idEntity *next;
////
////	// if we're already on a team, quit it so we can join this one
////	if ( this.teamMaster && ( this.teamMaster != this ) ) {
////		QuitTeam();
////	}
////
////	assert( teammember );
////
////	if ( teammember == this ) {
////		this.teamMaster = this;
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
////		for( ent = this.teamChain; ent != NULL; ent = ent.teamChain ) {
////			ent.teamMaster = master;
////		}
////	} else {
////		// skip past the chain members bound to the entity we're teaming up with
////		prev = teammember;
////		next = teammember.teamChain;
////		if ( this.bindMaster ) {
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
////	this.teamMaster = master;
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
////QuitTeam( ):void {
////	var ent:idEntity
////
////	if ( !this.teamMaster ) {
////		return;
////	}
////
////	// check if I'm the teamMaster
////	if ( this.teamMaster == this ) {
////		// do we have more than one teammate?
////		if ( !teamChain.teamChain ) {
////			// no, break up the team
////			this.teamChain.teamMaster = NULL;
////		} else {
////			// yes, so make the first teammate the teamMaster
////			for( ent = this.teamChain; ent; ent = ent.teamChain ) {
////				ent.teamMaster = this.teamChain;
////			}
////		}
////	} else {
////		assert( this.teamMaster );
////		assert( this.teamMaster.teamChain );
////
////		// find the previous member of the teamChain
////		ent = this.teamMaster;
////		while( ent.teamChain != this ) {
////			assert( ent.teamChain ); // this should never happen
////			ent = ent.teamChain;
////		}
////
////		// remove this from the teamChain
////		ent.teamChain = this.teamChain;
////
////		// if no one is left on the team, break it up
////		if ( !this.teamMaster.teamChain ) {
////			this.teamMaster.teamMaster = NULL;
////		}
////	}
////
////	this.teamMaster = NULL;
////	this.teamChain = NULL;
////}

/***********************************************************************

  Physics.
	
***********************************************************************/

/*
================
idEntity::InitDefaultPhysics
================
*/
	InitDefaultPhysics ( origin: idVec3, axis: idMat3 ): void {
		var temp = new R<string> ( );
		var clipModel: idClipModel = null;

		// check if a clipmodel key/value pair is set
		if ( this.spawnArgs.GetString_Rstring( "clipmodel", "", temp ) ) {
			if ( idClipModel.CheckModel( temp .$) ) {
				clipModel = new idClipModel( temp .$);
			}
		}

		if ( !this.spawnArgs.GetBool( "noclipmodel", "0" ) ) {

			// check if mins/maxs or size key/value pairs are set
			if ( !clipModel ) {
				var size = new idVec3;
				var bounds = new idBounds;
				var setClipModel = false;

				if (this.spawnArgs.GetVector_R( "mins", null, bounds[0] ) &&
					this.spawnArgs.GetVector_R("maxs", null, bounds[1] ) ) {
					setClipModel = true;
					if ( bounds[0][0] > bounds[1][0] || bounds[0][1] > bounds[1][1] || bounds[0][2] > bounds[1][2] ) {
						gameLocal.Error( "Invalid bounds '%s'-'%s' on entity '%s'", bounds[0].ToString(), bounds[1].ToString(), this.name.c_str() );
					}
				} else if (this.spawnArgs.GetVector_R("size", null, size ) ) {
					if ( ( size.x < 0.0 ) || ( size.y < 0.0 ) || ( size.z < 0.0 ) ) {
						gameLocal.Error( "Invalid size '%s' on entity '%s'", size.ToString(), this.name.c_str() );
					}
					bounds[0].Set( size.x * -0.5, size.y * -0.5, 0.0 );
					bounds[1].Set( size.x * 0.5, size.y * 0.5, size.z );
					setClipModel = true;
				}

				if ( setClipModel ) {
					var /*int */numSides = new R<number> ( );
					var trm = new idTraceModel ;
					if (this.spawnArgs.GetInt_R("cylinder", "0", numSides) && numSides.$ > 0 ) {
						trm.SetupCylinder(bounds, numSides.$ < 3 ? 3 : numSides.$ );
					} else if (this.spawnArgs.GetInt_R("cone", "0", numSides) && numSides.$> 0 ) {
						trm.SetupCone(bounds, numSides.$ < 3 ? 3 : numSides.$ );
					} else {
						trm.SetupBox( bounds );
					}
					clipModel = new idClipModel( trm );
				}
			}

			// check if the visual model can be used as collision model
			if ( !clipModel ) {
				temp.$ = this.spawnArgs.GetString( "model" );
				if ( temp && temp.$) {
					if (idClipModel.CheckModel(temp.$ ) ) {
						clipModel = new idClipModel( temp .$);
					}
				}
			}
		}

		this.defaultPhysicsObj.SetSelf( this );
		this.defaultPhysicsObj.SetClipModel( clipModel, 1.0 );
		this.defaultPhysicsObj.SetOrigin( origin );
		this.defaultPhysicsObj.SetAxis( axis );

		this.physics = this.defaultPhysicsObj;
	}

/////*
////================
////idEntity::SetPhysics
////================
////*/
////SetPhysics( idPhysics *phys ) {
////	// clear any contacts the current physics object has
////	if ( this.physics ) {
////		this.physics.ClearContacts();
////	}
////	// set new physics object or set the default physics if NULL
////	if ( phys != NULL ) {
////		this.defaultPhysicsObj.SetClipModel( NULL, 1.0 );
////		this.physics = phys;
////		this.physics.Activate();
////	} else {
////		this.physics = &this.defaultPhysicsObj;
////	}
////	this.physics.UpdateTime( gameLocal.time );
////	this.physics.SetMaster( this.bindMaster, this.fl.bindOrientated );
////}
////
/////*
////================
////idEntity::RestorePhysics
////================
////*/
////RestorePhysics( idPhysics *phys ) {
////	assert( phys != NULL );
////	// restore physics pointer
////	this.physics = phys;
////}

/*
================
idEntity::GetPhysics
================
*/
	GetPhysics ( ): idPhysics {
		return this.physics;
	}

/*
================
idEntity::RunPhysics
================
*/
	RunPhysics ( ): boolean {
		todoThrow ( );
		//int			i, reachedTime, startTime, endTime;
		//idEntity *	part, *blockedPart, *blockingEntity = NULL;
		//trace_t		results;
		//bool		moved;

		//// don't run physics if not enabled
		//if ( !( this.thinkFlags & TH_PHYSICS ) ) {
		//	// however do update any animation controllers
		//	if ( UpdateAnimationControllers() ) {
		//		this.BecomeActive( TH_ANIMATE );
		//	}
		//	return false;
		//}

		//// if this entity is a team slave don't do anything because the team master will handle everything
		//if ( this.teamMaster && this.teamMaster != this ) {
		//	return false;
		//}

		//startTime = gameLocal.previousTime;
		//endTime = gameLocal.time;

		//gameLocal.push.InitSavingPushedEntityPositions();
		//blockedPart = NULL;

		//// save the physics state of the whole team and disable the team for collision detection
		//for ( part = this; part != NULL; part = part.teamChain ) {
		//	if ( part.physics ) {
		//		if ( !part.fl.solidForTeam ) {
		//			part.physics.DisableClip();
		//		}
		//		part.physics.SaveState();
		//	}
		//}

		//// move the whole team
		//for ( part = this; part != NULL; part = part.teamChain ) {

		//	if ( part.physics ) {

		//		// run physics
		//		moved = part.physics.Evaluate( endTime - startTime, endTime );

		//		// check if the object is blocked
		//		blockingEntity = part.physics.GetBlockingEntity();
		//		if ( blockingEntity ) {
		//			blockedPart = part;
		//			break;
		//		}

		//		// if moved or forced to update the visual position and orientation from the physics
		//		if ( moved || part.fl.forcePhysicsUpdate ) {
		//			part.UpdateFromPhysics( false );
		//		}

		//		// update any animation controllers here so an entity bound
		//		// to a joint of this entity gets the correct position
		//		if ( part.UpdateAnimationControllers() ) {
		//			part.BecomeActive( TH_ANIMATE );
		//		}
		//	}
		//}

		//// enable the whole team for collision detection
		//for ( part = this; part != NULL; part = part.teamChain ) {
		//	if ( part.physics ) {
		//		if ( !part.fl.solidForTeam ) {
		//			part.physics.EnableClip();
		//		}
		//	}
		//}

		//// if one of the team entities is a pusher and blocked
		//if ( blockedPart ) {
		//	// move the parts back to the previous position
		//	for ( part = this; part != blockedPart; part = part.teamChain ) {

		//		if ( part.physics ) {

		//			// restore the physics state
		//			part.physics.RestoreState();

		//			// move back the visual position and orientation
		//			part.UpdateFromPhysics( true );
		//		}
		//	}
		//	for ( part = this; part != NULL; part = part.teamChain ) {
		//		if ( part.physics ) {
		//			// update the physics time without moving
		//			part.physics.UpdateTime( endTime );
		//		}
		//	}

		//	// restore the positions of any pushed entities
		//	gameLocal.push.RestorePushedEntityPositions();

		//	if ( gameLocal.isClient ) {
		//		return false;
		//	}

		//	// if the master pusher has a "blocked" function, call it
		//	Signal( SIG_BLOCKED );
		//	ProcessEvent( &EV_TeamBlocked, blockedPart, blockingEntity );
		//	// call the blocked function on the blocked part
		//	blockedPart.ProcessEvent( &EV_PartBlocked, blockingEntity );
		//	return false;
		//}

		//// set pushed
		//for ( i = 0; i < gameLocal.push.GetNumPushedEntities(); i++ ) {
		//	var ent:idEntity = gameLocal.push.GetPushedEntity( i );
		//	ent.physics.SetPushed( endTime - startTime );
		//}

		//if ( gameLocal.isClient ) {
		//	return true;
		//}

		//// post reached event if the current time is at or past the end point of the motion
		//for ( part = this; part != NULL; part = part.teamChain ) {

		//	if ( part.physics ) {

		//		reachedTime = part.physics.GetLinearEndTime();
		//		if ( startTime < reachedTime && endTime >= reachedTime ) {
		//			part.ProcessEvent( &EV_ReachedPos );
		//		}
		//		reachedTime = part.physics.GetAngularEndTime();
		//		if ( startTime < reachedTime && endTime >= reachedTime ) {
		//			part.ProcessEvent( &EV_ReachedAng );
		//		}
		//	}
		//}

		return true;
	}

/////*
////================
////idEntity::UpdateFromPhysics
////================
////*/
////UpdateFromPhysics( bool moveBack ) {
////
////	if ( IsType( idActor::Type ) ) {
////		idActor *actor = static_cast<idActor *>( this );
////
////		// set master delta angles for actors
////		if ( GetBindMaster() ) {
////			idAngles delta = actor.GetDeltaViewAngles();
////			if ( moveBack ) {
////				delta.yaw -= static_cast<idPhysics_Actor *>(this.physics).GetMasterDeltaYaw();
////			} else {
////				delta.yaw += static_cast<idPhysics_Actor *>(this.physics).GetMasterDeltaYaw();
////			}
////			actor.SetDeltaViewAngles( delta );
////		}
////	}
////
////	UpdateVisuals();
////}
////
/*
================
idEntity::SetOrigin
================
*/
	SetOrigin ( org: idVec3 ) {

		this.GetPhysics ( ).SetOrigin( org );

		this.UpdateVisuals ( );
	}

/*
================
idEntity::SetAxis
================
*/
	SetAxis ( axis: idMat3 ) {
		if ( this.GetPhysics().IsType( idPhysics_Actor.Type ) ) {
			static_cast<idActor >(this).viewAxis = axis;
		} else {
			this.GetPhysics().SetAxis( axis );
		}

		this.UpdateVisuals();
	}
////
/////*
////================
////idEntity::SetAngles
////================
////*/
////SetAngles( const ang:idAngles ) {
////	this.SetAxis( ang.ToMat3() );
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
////	if ( !this.GetPhysics().HasGroundContacts() ) {
////		this.GetPhysics().ClipTranslation( result, this.GetPhysics().GetGravityNormal() * max_dist, NULL );
////		if ( result.fraction < 1.0 ) {
////			floorpos = result.endpos;
////			return true;
////		} else {
////			floorpos = this.GetPhysics().GetOrigin();
////			return false;
////		}
////	} else {
////		floorpos = this.GetPhysics().GetOrigin();
////		return true;
////	}
////}

/*
================
idEntity::GetPhysicsToVisualTransform
================
*/
	GetPhysicsToVisualTransform ( origin: idVec3, axis: idMat3 ): boolean {
		return false;
	}

/*
================
idEntity::GetPhysicsToSoundTransform
================
*/
	GetPhysicsToSoundTransform ( origin: idVec3, axis: idMat3 ): boolean {
		// by default play the sound at the center of the bounding box of the first clip model
		if ( this.GetPhysics ( ).GetNumClipModels ( ) > 0 ) {
			origin = this.GetPhysics ( ).GetBounds ( ).GetCenter ( );
			axis.Identity ( );
			return true;
		}
		return false;
	}
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
////GetImpactInfo( ent:idEntity, /*int*/ id:number, const idVec3 &point, impactInfo_t *info ) {
////	this.GetPhysics().GetImpactInfo( id, point, info );
////}
////
/////*
////================
////idEntity::ApplyImpulse
////================
////*/
////ApplyImpulse( ent:idEntity, /*int*/ id:number, const idVec3 &point, const idVec3 &impulse ) {
////	this.GetPhysics().ApplyImpulse( id, point, impulse );
////}
////
/////*
////================
////idEntity::AddForce
////================
////*/
////AddForce( ent:idEntity, /*int*/ id:number, const idVec3 &point, const idVec3 &force ) {
////	this.GetPhysics().AddForce( id, point, force );
////}
////
/////*
////================
////idEntity::ActivatePhysics
////================
////*/
////ActivatePhysics( ent:idEntity ) {
////	this.GetPhysics().Activate();
////}

/*
================
idEntity::IsAtRest
================
*/
	IsAtRest ( ): boolean {
		return this.GetPhysics ( ).IsAtRest ( );
	}

/////*
////================
////idEntity::GetRestStartTime
////================
////*/
////int idEntity::GetRestStartTime( ):void const {
////	return this.GetPhysics().GetRestStartTime();
////}
////
/////*
////================
////idEntity::AddContactEntity
////================
////*/
////AddContactEntity( ent:idEntity ) {
////	this.GetPhysics().AddContactEntity( ent );
////}

/*
================
idEntity::RemoveContactEntity
================
*/
	RemoveContactEntity ( ent: idEntity ) {
		this.GetPhysics ( ).RemoveContactEntity( ent );
	}


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
////	midpoint = ( this.GetPhysics().GetAbsBounds()[0] + this.GetPhysics().GetAbsBounds()[1] ) * 0.5;
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
////DamageFeedback( idEntity *victim, idEntity *inflictor, int &damage ) {
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
////Damage( idEntity *inflictor, idEntity *attacker, const idVec3 &dir, 
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
////		this.health -= damage;
////		if ( this.health <= 0 ) {
////			if ( this.health < -999 ) {
////				this.health = -999;
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
////AddDamageEffect( const trace_t &collision, const idVec3 &velocity, const char *damageDefName ) {
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
////			ProjectOverlay( collision.c.point, dir, 20.0, decal );
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
////Killed( idEntity *inflictor, idEntity *attacker, int damage, const idVec3 &dir, int location ) {
////}


/***********************************************************************

  Script functions
	
***********************************************************************/

/*
================
idEntity::ShouldConstructScriptObjectAtSpawn

Called during idEntity::Spawn to see if it should construct the script object or not.
Overridden by subclasses that need to spawn the script object themselves.
================
*/
ShouldConstructScriptObjectAtSpawn( ):boolean {
	return true;
}

/*
================
idEntity::ConstructScriptObject

Called during idEntity::Spawn.  Calls the constructor on the script object.
Can be overridden by subclasses when a thread doesn't need to be allocated.
================
*/
	ConstructScriptObject ( ): idThread {
		var thread: idThread;
		var $constructor: function_t;

		// init the script object's data
		this.scriptObject.ClearObject ( );

		// call script object's constructor
		$constructor = this.scriptObject.GetConstructor ( );
		if ( $constructor ) {
			// start a thread that will initialize after Spawn is done being called
			thread = new idThread ( );
			thread.SetThreadName( this.name.c_str ( ) );
			thread.CallFunction( this, $constructor, true );
			thread.DelayedStart( 0 );
		} else {
			thread = null;
		}

		// clear out the object's memory
		this.scriptObject.ClearObject ( );

		return thread;
	}

/////*
////================
////idEntity::DeconstructScriptObject
////
////Called during idEntity::~idEntity.  Calls the destructor on the script object.
////Can be overridden by subclasses when a thread doesn't need to be allocated.
////Not called during idGameLocal::MapShutdown.
////================
////*/
////DeconstructScriptObject( ):void {
////	idThread		*thread;
////	const function_t *destructor;
////
////	// don't bother calling the script object's destructor on map shutdown
////	if ( gameLocal.GameState() == GAMESTATE_SHUTDOWN ) {
////		return;
////	}
////
////	// call script object's destructor
////	destructor = this.scriptObject.GetDestructor();
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
////	if ( !this.signals ) {
////		return false;
////	}
////	assert( ( signalnum >= 0 ) && ( signalnum < NUM_SIGNALS ) );
////	return ( this.signals.signal[ signalnum ].Num() > 0 );
////}
////
/////*
////================
////idEntity::SetSignal
////================
////*/
////SetSignal( signalNum_t signalnum, idThread *thread, const function_t *function ) {
////	int			i;
////	int			num;
////	signal_t	sig;
////	int			threadnum;
////
////	assert( ( signalnum >= 0 ) && ( signalnum < NUM_SIGNALS ) );
////
////	if ( !this.signals ) {
////		this.signals = new signalList_t;
////	}
////
////	assert( thread );
////	threadnum = thread.GetThreadNum();
////
////	num = this.signals.signal[ signalnum ].Num();
////	for( i = 0; i < num; i++ ) {
////		if ( this.signals.signal[ signalnum ][ i ].threadnum == threadnum ) {
////			this.signals.signal[ signalnum ][ i ].function = function;
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
////	this.signals.signal[ signalnum ].Append( sig );
////}
////
/////*
////================
////idEntity::ClearSignal
////================
////*/
////ClearSignal( idThread *thread, signalNum_t signalnum ) {
////	assert( thread );
////	if ( ( signalnum < 0 ) || ( signalnum >= NUM_SIGNALS ) ) {
////		gameLocal.Error( "Signal out of range" );
////	}
////
////	if ( !this.signals ) {
////		return;
////	}
////
////	this.signals.signal[ signalnum ].Clear();
////}
////
/////*
////================
////idEntity::ClearSignalThread
////================
////*/
////ClearSignalThread( signalNum_t signalnum, idThread *thread ) {
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
////	if ( !this.signals ) {
////		return;
////	}
////
////	threadnum = thread.GetThreadNum();
////
////	num = this.signals.signal[ signalnum ].Num();
////	for( i = 0; i < num; i++ ) {
////		if ( this.signals.signal[ signalnum ][ i ].threadnum == threadnum ) {
////			this.signals.signal[ signalnum ].RemoveIndex( i );
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
////Signal( signalNum_t signalnum ) {
////	int			i;
////	int			num;
////	signal_t	sigs[ MAX_SIGNAL_THREADS ];
////	idThread	*thread;
////
////	assert( ( signalnum >= 0 ) && ( signalnum < NUM_SIGNALS ) );
////
////	if ( !this.signals ) {
////		return;
////	}
////
////	// we copy the signal list since each thread has the potential
////	// to end any of the threads in the list.  By copying the list
////	// we don't have to worry about the list changing as we're
////	// processing it.
////	num = this.signals.signal[ signalnum ].Num();
////	for( i = 0; i < num; i++ ) {
////		sigs[ i ] = this.signals.signal[ signalnum ][ i ];
////	}
////
////	// clear out the signal list so that we don't get into an infinite loop
////	this.signals.signal[ signalnum ].Clear();
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
////SignalEvent( idThread *thread, signalNum_t signalnum ) {
////	if ( ( signalnum < 0 ) || ( signalnum >= NUM_SIGNALS ) ) {
////		gameLocal.Error( "Signal out of range" );
////	}
////
////	if ( !this.signals ) {
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
////TriggerGuis( ):void {
////	var/*int*/i:number;
////	for ( i = 0; i < MAX_RENDERENTITY_GUI; i++ ) {
////		if ( this.renderEntity.gui[ i ] ) {
////			this.renderEntity.gui[ i ].Trigger( gameLocal.time );
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
////				entityGui.renderEntity.shaderParms[ SHADERPARM_MODE ] = 1.0;
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
////					entityGui.StartSoundShader( shader, gameSoundChannel_t.SND_CHANNEL_ANY, 0, false, NULL );
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
////				common.Printf( "ent gui 0x%x '%s': %s\n", this.entityNumber, this.name.c_str(), msg.c_str() );
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
////				var/*int*/i:number;
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
////RemoveNullTargets( ):void {
////	var/*int*/i:number;
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
////ActivateTargets( activator:idEntity ) const {
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
////Teleport( const idVec3 &origin, angles:idAngles, idEntity *destination ) {
////	this.GetPhysics().SetOrigin( origin );
////	this.GetPhysics().SetAxis( angles.ToMat3() );
////
////	this.UpdateVisuals();
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
////	trace.endpos = this.GetPhysics().GetOrigin();
////	trace.endAxis = this.GetPhysics().GetAxis();
////
////	numClipModels = gameLocal.clip.ClipModelsTouchingBounds( this.GetPhysics().GetAbsBounds(), CONTENTS_TRIGGER, clipModels, MAX_GENTITIES );
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
////		if ( !this.GetPhysics().ClipContents( cm ) ) {
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
////		if ( !gameLocal.entities[ this.entityNumber ] ) {
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
////ShowEditingDialog( ):void {
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
////Event_ActivateTargets( activator:idEntity ) {
////	ActivateTargets( activator );
////}
////
/////*
////================
////idEntity::Event_NumTargets
////================
////*/
////Event_NumTargets( ):void {
////	idThread::ReturnFloat( this.targets.Num() );
////}
////
/////*
////================
////idEntity::Event_GetTarget
////================
////*/
////Event_GetTarget( float index ) {
////	var/*int*/i:number;
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
////Event_RandomTarget( const char *ignore ) {
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
////Event_BindToJoint( idEntity *master, jointname:string, float orientated ) {
////	BindToJoint( master, jointname, ( orientated != 0.0 ) );
////}
////
/////*
////================
////idEntity::Event_RemoveBinds
////================
////*/
////Event_RemoveBinds( ):void {
////	RemoveBinds();
////}
////
/////*
////================
////idEntity::Event_Bind
////================
////*/
////Event_Bind( idEntity *master ) {
////	Bind( master, true );
////}
////
/////*
////================
////idEntity::Event_BindPosition
////================
////*/
////Event_BindPosition( idEntity *master ) {
////	Bind( master, false );
////}
////
/////*
////================
////idEntity::Event_Unbind
////================
////*/
////Event_Unbind( ):void {
////	Unbind();
////}
////
/////*
////================
////idEntity::Event_SpawnBind
////================
////*/
////Event_SpawnBind( ):void {
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
////Event_SetOwner( idEntity *owner ) {
////	var/*int*/i:number;
////
////	for ( i = 0; i < this.GetPhysics().GetNumClipModels(); i++ ) {
////		this.GetPhysics().GetClipModel( i ).SetOwner( owner );
////	}
////}
////
/////*
////================
////idEntity::Event_SetModel
////================
////*/
////Event_SetModel( const char *modelname ) {
////	this.SetModel( modelname );
////}
////
/////*
////================
////idEntity::Event_SetSkin
////================
////*/
////Event_SetSkin( const char *skinname ) {
////	this.renderEntity.customSkin = declManager.FindSkin( skinname );
////	this.UpdateVisuals();
////}
////
/////*
////================
////idEntity::Event_GetShaderParm
////================
////*/
////Event_GetShaderParm( int parmnum ) {
////	if ( ( parmnum < 0 ) || ( parmnum >= MAX_ENTITY_SHADER_PARMS ) ) {
////		gameLocal.Error( "shader parm index (%d) out of range", parmnum );
////	}
////
////	idThread::ReturnFloat( this.renderEntity.shaderParms[ parmnum ] );
////}
////
/////*
////================
////idEntity::Event_SetShaderParm
////================
////*/
////Event_SetShaderParm( int parmnum, float value ) {
////	SetShaderParm( parmnum, value );
////}
////
/////*
////================
////idEntity::Event_SetShaderParms
////================
////*/
////Event_SetShaderParms( float parm0, float parm1, float parm2, float parm3 ) {
////	this.renderEntity.shaderParms[ SHADERPARM_RED ]		= parm0;
////	this.renderEntity.shaderParms[ SHADERPARM_GREEN ]	= parm1;
////	this.renderEntity.shaderParms[ SHADERPARM_BLUE ]		= parm2;
////	this.renderEntity.shaderParms[ SHADERPARM_ALPHA ]	= parm3;
////	this.UpdateVisuals();
////}
////
////
/////*
////================
////idEntity::Event_SetColor
////================
////*/
////Event_SetColor( float red, float green, float blue ) {
////	SetColor( red, green, blue );
////}
////
/////*
////================
////idEntity::Event_GetColor
////================
////*/
////Event_GetColor( ):void {
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
////Event_IsHidden( ):void {
////	idThread::ReturnInt( this.fl.hidden );
////}
////
/////*
////================
////idEntity::Event_Hide
////================
////*/
////Event_Hide( ):void {
////	Hide();
////}
////
/////*
////================
////idEntity::Event_Show
////================
////*/
////Event_Show( ):void {
////	Show();
////}
////
/////*
////================
////idEntity::Event_CacheSoundShader
////================
////*/
////Event_CacheSoundShader( const char *soundName ) {
////	declManager.FindSound( soundName );
////}
////
/////*
////================
////idEntity::Event_StartSoundShader
////================
////*/
////Event_StartSoundShader( const char *soundName, int channel ) {
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
////Event_StopSound( int channel, int netSync ) {
////	StopSound( channel, ( netSync != 0 ) );
////}
////
/////*
////================
////idEntity::Event_StartSound 
////================
////*/
////Event_StartSound( const char *soundName, int channel, int netSync ) {
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
////Event_FadeSound( int channel, float to, float over ) {
////	if ( this.refSound.referenceSound ) {
////		this.refSound.referenceSound.FadeSound( channel, to, over );
////	}
////}
////
/////*
////================
////idEntity::Event_GetWorldOrigin
////================
////*/
////Event_GetWorldOrigin( ):void {
////	idThread::ReturnVector( this.GetPhysics().GetOrigin() );
////}
////
/////*
////================
////idEntity::Event_SetWorldOrigin
////================
////*/
////Event_SetWorldOrigin( idVec3 const &org ) {
////	idVec3 neworg = GetLocalCoordinates( org );
////	SetOrigin( neworg );
////}
////
/////*
////================
////idEntity::Event_SetOrigin
////================
////*/
////Event_SetOrigin( idVec3 const &org ) {
////	SetOrigin( org );
////}
////
/////*
////================
////idEntity::Event_GetOrigin
////================
////*/
////Event_GetOrigin( ):void {
////	idThread::ReturnVector( GetLocalCoordinates( this.GetPhysics().GetOrigin() ) );
////}
////
/////*
////================
////idEntity::Event_SetAngles
////================
////*/
////Event_SetAngles( idAngles const &ang ) {
////	SetAngles( ang );
////}
////
/////*
////================
////idEntity::Event_GetAngles
////================
////*/
////Event_GetAngles( ):void {
////	idAngles ang = this.GetPhysics().GetAxis().ToAngles();
////	idThread::ReturnVector( idVec3( ang[0], ang[1], ang[2] ) );
////}
////
/////*
////================
////idEntity::Event_SetLinearVelocity
////================
////*/
////Event_SetLinearVelocity( const idVec3 &velocity ) {
////	this.GetPhysics().SetLinearVelocity( velocity );
////}
////
/////*
////================
////idEntity::Event_GetLinearVelocity
////================
////*/
////Event_GetLinearVelocity( ):void {
////	idThread::ReturnVector( this.GetPhysics().GetLinearVelocity() );
////}
////
/////*
////================
////idEntity::Event_SetAngularVelocity
////================
////*/
////Event_SetAngularVelocity( const idVec3 &velocity ) {
////	this.GetPhysics().SetAngularVelocity( velocity );
////}
////
/////*
////================
////idEntity::Event_GetAngularVelocity
////================
////*/
////Event_GetAngularVelocity( ):void {
////	idThread::ReturnVector( this.GetPhysics().GetAngularVelocity() );
////}
////
/////*
////================
////idEntity::Event_SetSize
////================
////*/
////Event_SetSize( idVec3 const &mins, idVec3 const &maxs ) {
////	this.GetPhysics().SetClipBox( idBounds( mins, maxs ), 1.0 );
////}
////
/////*
////================
////idEntity::Event_GetSize
////================
////*/
////Event_GetSize( ):void {
////	idBounds bounds;
////
////	bounds = this.GetPhysics().GetBounds();
////	idThread::ReturnVector( bounds[1] - bounds[0] );
////}
////
/////*
////================
////idEntity::Event_GetMins
////================
////*/
////Event_GetMins( ):void {
////	idThread::ReturnVector( this.GetPhysics().GetBounds()[0] );
////}
////
/////*
////================
////idEntity::Event_GetMaxs
////================
////*/
////Event_GetMaxs( ):void {
////	idThread::ReturnVector( this.GetPhysics().GetBounds()[1] );
////}
////
/////*
////================
////idEntity::Event_Touches
////================
////*/
////Event_Touches( ent:idEntity ) {
////	if ( !ent ) {
////		idThread::ReturnInt( false );
////		return;
////	}
////
////	const idBounds &myBounds = this.GetPhysics().GetAbsBounds();
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
////Event_SetGuiParm( key:string, const char *val ) {
////	for ( int i = 0; i < MAX_RENDERENTITY_GUI; i++ ) {
////		if ( this.renderEntity.gui[ i ] ) {
////			if ( idStr::Icmpn( key, "gui_", 4 ) == 0 ) {
////				this.spawnArgs.Set( key, val );
////			}
////			this.renderEntity.gui[ i ].SetStateString( key, val );
////			this.renderEntity.gui[ i ].StateChanged( gameLocal.time );
////		}
////	}
////}
////
/////*
////================
////idEntity::Event_SetGuiParm
////================
////*/
////Event_SetGuiFloat( key:string, float f ) {
////	for ( int i = 0; i < MAX_RENDERENTITY_GUI; i++ ) {
////		if ( this.renderEntity.gui[ i ] ) {
////			this.renderEntity.gui[ i ].SetStateString( key, va( "%f", f ) );
////			this.renderEntity.gui[ i ].StateChanged( gameLocal.time );
////		}
////	}
////}
////
/////*
////================
////idEntity::Event_GetNextKey
////================
////*/
////Event_GetNextKey( const char *prefix, const char *lastMatch ) {
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
////Event_SetKey( key:string, value:string ) {
////	this.spawnArgs.Set( key, value );
////}
////
/////*
////================
////idEntity::Event_GetKey
////================
////*/
////Event_GetKey( key:string ) {
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
////Event_GetIntKey( key:string ) {
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
////Event_GetFloatKey( key:string ) {
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
////Event_GetVectorKey( key:string ) {
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
////Event_GetEntityKey( key:string ) {
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
////Event_RestorePosition( ):void {
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
////	for ( part = this.teamChain; part != NULL; part = part.teamChain ) {
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
////Event_UpdateCameraTarget( ):void {
////	const char *target;
////	const idKeyValue *kv;
////	idVec3 dir;
////
////	target = this.spawnArgs.GetString( "cameraTarget" );
////
////	this.cameraTarget = gameLocal.FindEntity( target );
////
////	if ( this.cameraTarget ) {
////		kv = this.cameraTarget.spawnArgs.MatchPrefix( "target", NULL );
////		while( kv ) {
////			var ent:idEntity = gameLocal.FindEntity( kv.GetValue() );
////			if ( ent && idStr::Icmp( ent.GetEntityDefName(), "target_null" ) == 0) {
////				dir = ent.GetPhysics().GetOrigin() - this.cameraTarget.GetPhysics().GetOrigin();
////				dir.Normalize();
////				this.cameraTarget.SetAxis( dir.ToMat3() );
////				this.SetAxis(dir.ToMat3());
////				break;						
////			}
////			kv = this.cameraTarget.spawnArgs.MatchPrefix( "target", kv );
////		}
////	}
////	this.UpdateVisuals();
////}
////
/////*
////================
////idEntity::Event_DistanceTo
////================
////*/
////Event_DistanceTo( ent:idEntity ) {
////	if ( !ent ) {
////		// just say it's really far away
////		idThread::ReturnFloat( MAX_WORLD_SIZE );
////	} else {
////		float dist = ( this.GetPhysics().GetOrigin() - ent.GetPhysics().GetOrigin() ).LengthFast();
////		idThread::ReturnFloat( dist );
////	}
////}
////
/////*
////================
////idEntity::Event_DistanceToPoint
////================
////*/
////Event_DistanceToPoint( const idVec3 &point ) {
////	float dist = ( this.GetPhysics().GetOrigin() - point ).LengthFast();
////	idThread::ReturnFloat( dist );
////}
////
/////*
////================
////idEntity::Event_StartFx
////================
////*/
////Event_StartFx( const char *fx ) {
////	idEntityFx::StartFx( fx, NULL, NULL, this, true );
////}
////
/////*
////================
////idEntity::Event_WaitFrame
////================
////*/
////Event_WaitFrame( ):void {
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
////Event_Wait( /*float*/time:number ) {
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
////Event_HasFunction( name:string ) {
////	const function_t *func;
////
////	func = this.scriptObject.GetFunction( name );
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
////Event_CallFunction( const char *funcname ) {
////	const function_t *func;
////	idThread *thread;
////
////	thread = idThread::CurrentThread();
////	if ( !thread ) {
////		gameLocal.Error( "Event 'callFunction' called from outside thread" );
////	}
////
////	func = this.scriptObject.GetFunction( funcname );
////	if ( !func ) {
////		gameLocal.Error( "Unknown function '%s' in '%s'", funcname, this.scriptObject.GetTypeName() );
////	}
////
////	if ( func.type.NumParameters() != 1 ) {
////		gameLocal.Error( "Function '%s' has the wrong number of parameters for 'callFunction'", funcname );
////	}
////	if ( !this.scriptObject.GetTypeDef().Inherits( func.type.GetParmType( 0 ) ) ) {
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
////Event_SetNeverDormant( int enable ) {
////	this.fl.neverDormant	= ( enable != 0 );
////	this.dormantStart = 0;
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
////ClientPredictionThink( ):void {
////	this.RunPhysics();
////	Present();
////}
////
/////*
////================
////idEntity::WriteBindToSnapshot
////================
////*/
////WriteBindToSnapshot( idBitMsgDelta &msg ) const {
////	int bindInfo;
////
////	if ( this.bindMaster ) {
////		bindInfo = this.bindMaster.entityNumber;
////		bindInfo |= ( this.fl.bindOrientated & 1 ) << GENTITYNUM_BITS;
////		if ( this.bindJoint != INVALID_JOINT ) {
////			bindInfo |= 1 << ( GENTITYNUM_BITS + 1 );
////			bindInfo |= this.bindJoint << ( 3 + GENTITYNUM_BITS );
////		} else if ( this.bindBody != -1 ) {
////			bindInfo |= 2 << ( GENTITYNUM_BITS + 1 );
////			bindInfo |= this.bindBody << ( 3 + GENTITYNUM_BITS );
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
////ReadBindFromSnapshot( const idBitMsgDelta &msg ) {
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
////	} else if ( this.bindMaster ) {
////		Unbind();
////	}
////}
////
/////*
////================
////idEntity::WriteColorToSnapshot
////================
////*/
////WriteColorToSnapshot( idBitMsgDelta &msg ) const {
////	idVec4 color;
////
////	color[0] = this.renderEntity.shaderParms[ SHADERPARM_RED ];
////	color[1] = this.renderEntity.shaderParms[ SHADERPARM_GREEN ];
////	color[2] = this.renderEntity.shaderParms[ SHADERPARM_BLUE ];
////	color[3] = this.renderEntity.shaderParms[ SHADERPARM_ALPHA ];
////	msg.WriteLong( PackColor( color ) );
////}
////
/////*
////================
////idEntity::ReadColorFromSnapshot
////================
////*/
////ReadColorFromSnapshot( const idBitMsgDelta &msg ) {
////	idVec4 color;
////
////	UnpackColor( msg.ReadLong(), color );
////	this.renderEntity.shaderParms[ SHADERPARM_RED ] = color[0];
////	this.renderEntity.shaderParms[ SHADERPARM_GREEN ] = color[1];
////	this.renderEntity.shaderParms[ SHADERPARM_BLUE ] = color[2];
////	this.renderEntity.shaderParms[ SHADERPARM_ALPHA ] = color[3];
////}
////
/////*
////================
////idEntity::WriteGUIToSnapshot
////================
////*/
////WriteGUIToSnapshot( idBitMsgDelta &msg ) const {
////	// no need to loop over MAX_RENDERENTITY_GUI at this time
////	if ( this.renderEntity.gui[ 0 ] ) {
////		msg.WriteByte( this.renderEntity.gui[ 0 ].State().GetInt( "networkState" ) );
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
////ReadGUIFromSnapshot( const idBitMsgDelta &msg ) {
////	int state;
////	idUserInterface *gui;
////	state = msg.ReadByte( );
////	gui = this.renderEntity.gui[ 0 ];
////	if ( gui && state != this.mpGUIState ) {
////		this.mpGUIState = state;
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
////WriteToSnapshot( idBitMsgDelta &msg ) const {
////}
////
/////*
////================
////idEntity::ReadFromSnapshot
////================
////*/
////ReadFromSnapshot( const idBitMsgDelta &msg ) {
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
////ServerSendEvent( int eventId, const idBitMsg *msg, bool saveEvent, int excludeClient ) const {
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
////ClientSendEvent( int eventId, const idBitMsg *msg ) const {
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
////				common.DPrintf( "ent 0x%x: start sound shader too old (%d ms)\n", this.entityNumber, gameLocal.realClientTime - time );
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


/*
===============================================================================

	Animated entity base class.

===============================================================================
*/

class damageEffect_t {
	//jointHandle_t			jointNum;
	//idVec3					localOrigin;
	//idVec3					localNormal;
	//int						time;
	//const idDeclParticle*	type;
	//struct damageEffect_s *	next;
};

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
	animator = new idAnimator;
	damageEffects:damageEffect_t;
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
