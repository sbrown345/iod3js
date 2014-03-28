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

////#ifndef __GAME_LOCAL_H__
////#define	__GAME_LOCAL_H__

/*
===============================================================================

	Local implementation of the public game interface.

===============================================================================
*/

var LAGO_IMG_WIDTH = 64;
var LAGO_IMG_HEIGHT = 64;
var LAGO_WIDTH = 64;
var LAGO_HEIGHT = 44;
var LAGO_MATERIAL = "textures/sfx/lagometer";
var LAGO_IMAGE = "textures/sfx/lagometer.tga";

////// if set to 1 the server sends the client PVS with snapshots and the client compares against what it sees
////#ifndef ASYNC_WRITE_PVS
////	#define ASYNC_WRITE_PVS 0
////#endif

////#ifdef ID_DEBUG_UNINITIALIZED_MEMORY
////// This is real evil but allows the code to inspect arbitrary class variables.
////#define private		public
////#define protected	public
////#endif

////extern idRenderWorld *				gameRenderWorld;
////extern idSoundWorld *				gameSoundWorld;

// the "gameversion" client command will print this plus compile date
var GAME_VERSION = "baseDOOM-1";

////// classes used by idGameLocal
////class idEntity;
////class idActor;
////class idPlayer;
////class idCamera;
////class idWorldspawn;
////class idTestModel;
////class idAAS;
////class idAI;
////class idSmokeParticles;
////class idEntityFx;
////class idTypeInfo;
////class idProgram;
////class idThread;
////class idEditEntities;
////class idLocationEntity;

var MAX_CLIENTS = 32;
var GENTITYNUM_BITS = 12;
var MAX_GENTITIES = ( 1 << GENTITYNUM_BITS );
var ENTITYNUM_NONE = ( MAX_GENTITIES - 1 );
var ENTITYNUM_WORLD = ( MAX_GENTITIES - 2 );
var ENTITYNUM_MAX_NORMAL = ( MAX_GENTITIES - 2 );

//////============================================================================

////void gameError( const char *fmt, ... );

////#include "gamesys/Event.h"
////#include "gamesys/Class.h"
////#include "gamesys/SysCvar.h"
////#include "gamesys/SysCmds.h"
////#include "gamesys/SaveGame.h"
////#include "gamesys/DebugGraph.h"

////#include "script/Script_Program.h"

////#include "anim/Anim.h"

////#include "ai/AAS.h"

////#include "physics/Clip.h"
////#include "physics/Push.h"

////#include "Pvs.h"
////#include "MultiplayerGame.h"

//============================================================================

var MAX_GAME_MESSAGE_SIZE		= 8192;
var MAX_ENTITY_STATE_SIZE		= 512;
var ENTITY_PVS_SIZE			= ((MAX_GENTITIES+31)>>5);
var NUM_RENDER_PORTAL_BITS = idMath.BitsForInteger( portalConnection_t.PS_BLOCK_ALL );

class entityState_t {
	//int						entityNumber;
	//idBitMsg				state;
	//byte					stateBuf[MAX_ENTITY_STATE_SIZE];
	//struct entityState_s *	next;

	memset0 ( ): void {
		
	}
}

class snapshot_t {
////	int						sequence;
////	entityState_t *			firstEntityState;
////	int						pvs[ENTITY_PVS_SIZE];
	////	struct snapshot_s *		next;
	memset0(): void {

	}
}

var  MAX_EVENT_PARAM_SIZE		= 128;

class entityNetEvent_t {
////	int						spawnId;
////	int						event;
////	int						time;
////	int						paramsSize;
////	byte					paramsBuf[MAX_EVENT_PARAM_SIZE];
////	struct entityNetEvent_s	*next;
////	struct entityNetEvent_s *prev;
};

////enum {
var GAME_RELIABLE_MESSAGE_INIT_DECL_REMAP = 0,
	GAME_RELIABLE_MESSAGE_REMAP_DECL = 1,
	GAME_RELIABLE_MESSAGE_SPAWN_PLAYER = 2,
	GAME_RELIABLE_MESSAGE_DELETE_ENT = 3,
	GAME_RELIABLE_MESSAGE_CHAT = 4,
	GAME_RELIABLE_MESSAGE_TCHAT = 5,
	GAME_RELIABLE_MESSAGE_SOUND_EVENT = 6,
	GAME_RELIABLE_MESSAGE_SOUND_INDEX = 7,
	GAME_RELIABLE_MESSAGE_DB = 8,
	GAME_RELIABLE_MESSAGE_KILL = 9,
	GAME_RELIABLE_MESSAGE_DROPWEAPON = 10,
	GAME_RELIABLE_MESSAGE_RESTART = 11,
	GAME_RELIABLE_MESSAGE_SERVERINFO = 12,
	GAME_RELIABLE_MESSAGE_TOURNEYLINE = 13,
	GAME_RELIABLE_MESSAGE_CALLVOTE = 14,
	GAME_RELIABLE_MESSAGE_CASTVOTE = 15,
	GAME_RELIABLE_MESSAGE_STARTVOTE = 16,
	GAME_RELIABLE_MESSAGE_UPDATEVOTE = 17,
	GAME_RELIABLE_MESSAGE_PORTALSTATES = 18,
	GAME_RELIABLE_MESSAGE_PORTAL = 19,
	GAME_RELIABLE_MESSAGE_VCHAT = 20,
	GAME_RELIABLE_MESSAGE_STARTSTATE = 21,
	GAME_RELIABLE_MESSAGE_MENU = 22,
	GAME_RELIABLE_MESSAGE_WARMUPTIME = 23,
	GAME_RELIABLE_MESSAGE_EVENT = 24;
////};

enum gameState_t{
	GAMESTATE_UNINITIALIZED,		// prior to Init being called
	GAMESTATE_NOMAP,				// no map loaded
	GAMESTATE_STARTUP,				// inside InitFromNewMap().  spawning map entities.
	GAMESTATE_ACTIVE,				// normal gameplay
	GAMESTATE_SHUTDOWN				// inside MapShutdown().  clearing memory.
};

////typedef struct {
////	idEntity	*ent;
////	int			dist;
////} spawnSpot_t;

//============================================================================

class idEventQueue {
////public:
////	typedef enum {
////		OUTOFORDER_IGNORE,
////		OUTOFORDER_DROP,
////		OUTOFORDER_SORT
////	} outOfOrderBehaviour_t;

////							idEventQueue() : start( NULL ), end( NULL ) {}

////	entityNetEvent_t *		Alloc();
////	void					Free( entityNetEvent_t *event );
	Shutdown():void { throw "placeholder"; }

	Init():void { throw "placeholder"; }
////	void					Enqueue( entityNetEvent_t* event, outOfOrderBehaviour_t oooBehaviour );
////	entityNetEvent_t *		Dequeue( ):void { throw "placeholder"; }
////	entityNetEvent_t *		RemoveLast( ):void { throw "placeholder"; }

////	entityNetEvent_t *		Start( ) { return start; }

	////private:
	start: entityNetEvent_t;
	end: entityNetEvent_t;
	eventAllocator = idBlockAlloc_template<entityNetEvent_t>(entityNetEvent_t, 32);
};

//============================================================================

////template< class type >
class idEntityPtr<type> {
////public:
////							idEntityPtr();

////	// save games
//Save ( savefile: idSaveGame ): void { throw "placeholder"; }					// archives object for save game file
////	void					Restore ( savefile: idRestoreGame ): void { throw "placeholder"; }					// unarchives object from save game file

////	idEntityPtr<type> &		operator=( type *ent );

////	// synchronize entity pointers over the network
////	int						GetSpawnId( ) const { return spawnId; }
////	bool					SetSpawnId( int id );
////	bool					UpdateSpawnId( );

////	bool					IsValid( ) const;
////	type *					GetEntity( ) const;
////	int						GetEntityNum( ) const;

////private:
////	int						spawnId;
};

//============================================================================

class idGameLocal extends idGame {
////public:
	serverInfo = new idDict; // all the tunable parameters, like numclients, etc
/*int*/
	numClients: number; // pulled from serverInfo and verified
	userInfo = newStructArray<idDict>( idDict, MAX_CLIENTS ); // client specific settings
	usercmds = newStructArray<usercmd_t>( usercmd_t, MAX_CLIENTS ); // client input commands
	persistentPlayerInfo = newStructArray<idDict>( idDict, MAX_CLIENTS );
	entities = new Array<idEntity>( MAX_GENTITIES ); // index to entities
	spawnIds = new Int32Array( MAX_GENTITIES ); // for use in idEntityPtr
	firstFreeIndex: number; // first free index in the entities array	////	int	
	num_entities: number; // current number <= MAX_GENTITIES			////	int	
	entityHash = new idHashIndex; // hash table to quickly find entities by name
	world: idWorldspawn; // world entity
	spawnedEntities = new idLinkList<idEntity> ( ); // all spawned entities
	activeEntities = new idLinkList<idEntity> ( ); // all thinking entities (idEntity::thinkFlags != 0)
/*int*/
	numEntitiesToDeactivate: number; // number of entities that became inactive in current frame
	sortPushers: boolean; // true if active lists needs to be reordered to place pushers at the front
	sortTeamMasters: boolean; // true if active lists needs to be reordered to place physics team masters before their slaves
	persistentLevelInfo = new idDict ( ); // contains args that are kept around between levels

	// can be used to automatically effect every material in the world that references globalParms
	globalShaderParms = new Float32Array( MAX_GLOBAL_SHADER_PARMS );

	random = new idRandom; // random number generator used throughout the game

	program = new idProgram; // currently loaded script and data space
	frameCommandThread: idThread;

	clip = new idClip; // collision detection
////	idPush					push;					// geometric pushing
	pvs = new idPVS; // potential visible set

	testmodel: idTestModel; // for development testing of models
	testFx: idEntityFx; // for development testing of fx

	sessionCommand = new idStr; // a target_sessionCommand can set this to return something to the session 

	mpGame = new idMultiplayerGame;					// handles rules for standard dm

	smokeParticles: idSmokeParticles; // global smoke trails
	editEntities: idEditEntities; // in game editing

	cinematicSkipTime: number /*int*/; // don't allow skipping cinemetics until this time has passed so player doesn't skip out accidently from a firefight
	cinematicStopTime: number /*int*/; // cinematics have several camera changes, so keep track of when we stop them so that we don't reset cinematicSkipTime unnecessarily
	cinematicMaxSkipTime: number /*int*/; // time to end cinematic when skipping.  there's a possibility of an infinite loop if the map isn't set up right.
	inCinematic: boolean; // game is playing cinematic (player controls frozen)
	skipCinematic: boolean;

	// are kept up to date with changes to serverInfo
	framenum: number /*int*/;
	previousTime: number /*int*/; // time in msec of last frame
	time: number /*int*/; // in msec
	/*static*/ msec = USERCMD_MSEC;	// time since last update in milliseconds

	vacuumAreaNum: number /*int*/; // -1 if level doesn't have any outside areas

	gameType: gameType_t;
	isMultiplayer: boolean; // set if the game is run in multiplayer mode
	isServer: boolean; // set if the game is run for a dedicated or listen server
	isClient: boolean; // set if the game is run for a client
////													// discriminates between the RunFrame path and the ClientPrediction path
////													// NOTE: on a listen server, isClient is false
	localClientNum: number /*int*/; // number of the local client. MP: -1 on a dedicated
	snapshotEntities = new idLinkList<idEntity> ( ); // entities from the last snapshot
	realClientTime: number /*int*/; // real client time
	isNewFrame: boolean; // true if this is a new game frame, not a rerun due to prediction
	clientSmoothing: number /*float*/; // smoothing of other clients in the view
	entityDefBits: number /*int*/; // bits required to store an entity def number

////	static const char *		sufaceTypeNames[ MAX_SURFACE_TYPES ];	// text names for surface types

	lastGUIEnt = new idEntityPtr<idEntity> ( ); // last entity with a GUI, used by Cmd_NextGUI_f
	lastGUI: number /*int*/; // last GUI on the lastGUIEnt
	
	// ---------------------- Public idGame Interface -------------------

	////						idGameLocal();

	////virtual void			Init( void );
	////virtual void			Shutdown( void );
	////virtual void			SetLocalClient( int clientNum );
	////virtual void			ThrottleUserInfo( void );
	////virtual const idDict *	SetUserInfo( int clientNum, const idDict &userInfo, bool isClient, bool canModify );
	////virtual const idDict *	GetUserInfo( int clientNum );
	////virtual void			SetServerInfo( const idDict &serverInfo );

	////virtual const idDict &	GetPersistentPlayerInfo( int clientNum );
	////virtual void			SetPersistentPlayerInfo( int clientNum, const idDict &playerInfo );
	////virtual void			InitFromNewMap( const char *mapName, idRenderWorld *renderWorld, idSoundWorld *soundWorld, bool isServer, bool isClient, int randSeed );
	////virtual bool			InitFromSaveGame( const char *mapName, idRenderWorld *renderWorld, idSoundWorld *soundWorld, idFile *saveGameFile );
	////virtual void			SaveGame( idFile *saveGameFile );
	////virtual void			MapShutdown( void );
	////virtual void			CacheDictionaryMedia( const idDict *dict );
	////virtual void			SpawnPlayer( int clientNum );
	////virtual gameReturn_t	RunFrame( const usercmd_t *clientCmds );
	////virtual bool			Draw( int clientNum );
	////virtual escReply_t		HandleESC( idUserInterface **gui );
	////virtual idUserInterface	*StartMenu( void );
	////virtual const char *	HandleGuiCommands( const char *menuCommand );
	////virtual void			HandleMainMenuCommands( const char *menuCommand, idUserInterface *gui );
	////virtual allowReply_t	ServerAllowClient( int numClients, const char *IP, const char *guid, const char *password, char reason[MAX_STRING_CHARS] );
	////virtual void			ServerClientConnect( int clientNum, const char *guid );
	////virtual void			ServerClientBegin( int clientNum );
	////virtual void			ServerClientDisconnect( int clientNum );
	////virtual void			ServerWriteInitialReliableMessages( int clientNum );
	////virtual void			ServerWriteSnapshot( int clientNum, int sequence, idBitMsg &msg, byte *clientInPVS, int numPVSClients );
	////virtual bool			ServerApplySnapshot( int clientNum, int sequence );
	////virtual void			ServerProcessReliableMessage( int clientNum, const idBitMsg &msg );
	////virtual void			ClientReadSnapshot( int clientNum, int sequence, const int gameFrame, const int gameTime, const int dupeUsercmds, const int aheadOfServer, const idBitMsg &msg );
	////virtual bool			ClientApplySnapshot( int clientNum, int sequence );
	////virtual void			ClientProcessReliableMessage( int clientNum, const idBitMsg &msg );
	////virtual gameReturn_t	ClientPrediction( int clientNum, const usercmd_t *clientCmds, bool lastPredictFrame );

	////virtual void			GetClientStats( int clientNum, char *data, const int len );
	////virtual void			SwitchTeam( int clientNum, int team );

	////virtual bool			DownloadRequest( const char *IP, const char *guid, const char *paks, char urls[ MAX_STRING_CHARS ] );

	////// ---------------------- Public idGameLocal Interface -------------------

	////void					Printf( const char *fmt, ... ) const id_attribute((format(printf,2,3)));
	////void					DPrintf( const char *fmt, ... ) const id_attribute((format(printf,2,3)));
	////void					Warning( const char *fmt, ... ) const id_attribute((format(printf,2,3)));
	////void					DWarning( const char *fmt, ... ) const id_attribute((format(printf,2,3)));
	////void					Error( const char *fmt, ... ) const id_attribute((format(printf,2,3)));

	////						// Initializes all map variables common to both save games and spawned games
	////void					LoadMap( const char *mapName, int randseed );

	////void					LocalMapRestart( void );
	////void					MapRestart( void );
	////static void				MapRestart_f( const idCmdArgs &args );
	////bool					NextMap( void );	// returns wether serverinfo settings have been modified
	////static void				NextMap_f( const idCmdArgs &args );

	////idMapFile *				GetLevelMap( void );
	////const char *			GetMapName( void ) const;

	////int						NumAAS( void ) const;
	////idAAS *					GetAAS( int num ) const;
	////idAAS *					GetAAS( const char *name ) const;
	////void					SetAASAreaState( const idBounds &bounds, const int areaContents, bool closed );
	////aasHandle_t				AddAASObstacle( const idBounds &bounds );
	////void					RemoveAASObstacle( const aasHandle_t handle );
	////void					RemoveAllAASObstacles( void );

	////bool					CheatsOk( bool requirePlayer = true );
	////void					SetSkill( int value );
	////gameState_t				GameState( void ) const;
	////idEntity *				SpawnEntityType( const idTypeInfo &classdef, const idDict *args = NULL, bool bIsClientReadSnapshot = false );
	////bool					SpawnEntityDef( const idDict &args, idEntity **ent = NULL, bool setDefaults = true );
	////int						GetSpawnId( const idEntity *ent ) const;

	////const idDeclEntityDef *	FindEntityDef( const char *name, bool makeDefault = true ) const;
	////const idDict *			FindEntityDefDict( const char *name, bool makeDefault = true ) const;

	////void					RegisterEntity( idEntity *ent );
	////void					UnregisterEntity( idEntity *ent );

	////bool					RequirementMet( idEntity *activator, const idStr &requires, int removeItem );

	////void					AlertAI( idEntity *ent );
	////idActor *				GetAlertEntity( void );

	////bool					InPlayerPVS( idEntity *ent ) const;
	////bool					InPlayerConnectedArea( idEntity *ent ) const;

	////void					SetCamera( idCamera *cam );
	////idCamera *				GetCamera( void ) const;
	////bool					SkipCinematic( void );
	////void					CalcFov( float base_fov, float &fov_x, float &fov_y ) const;

	////void					AddEntityToHash( const char *name, idEntity *ent );
	////bool					RemoveEntityFromHash( const char *name, idEntity *ent );
	////int						GetTargets( const idDict &args, idList< idEntityPtr<idEntity> > &list, const char *ref ) const;

	////						// returns the master entity of a trace.  for example, if the trace entity is the player's head, it will return the player.
	////idEntity *				GetTraceEntity( const trace_t &trace ) const;

	////static void				ArgCompletion_EntityName( const idCmdArgs &args, void(*callback)( const char *s ) );
	////idEntity *				FindTraceEntity( idVec3 start, idVec3 end, const idTypeInfo &c, const idEntity *skip ) const;
	////idEntity *				FindEntity( const char *name ) const;
	////idEntity *				FindEntityUsingDef( idEntity *from, const char *match ) const;
	////int						EntitiesWithinRadius( const idVec3 org, float radius, idEntity **entityList, int maxCount ) const;

	////void					KillBox( idEntity *ent, bool catch_teleport = false );
	////void					RadiusDamage( const idVec3 &origin, idEntity *inflictor, idEntity *attacker, idEntity *ignoreDamage, idEntity *ignorePush, const char *damageDefName, float dmgPower = 1.0f );
	////void					RadiusPush( const idVec3 &origin, const float radius, const float push, const idEntity *inflictor, const idEntity *ignore, float inflictorScale, const bool quake );
	////void					RadiusPushClipModel( const idVec3 &origin, const float push, const idClipModel *clipModel );

	////void					ProjectDecal( const idVec3 &origin, const idVec3 &dir, float depth, bool parallel, float size, const char *material, float angle = 0 );
	////void					BloodSplat( const idVec3 &origin, const idVec3 &dir, float size, const char *material );

	////void					CallFrameCommand( idEntity *ent, const function_t *frameCommand );
	////void					CallObjectFrameCommand( idEntity *ent, const char *frameCommand );

	////const idVec3 &			GetGravity( void ) const;

	////// added the following to assist licensees with merge issues
	////int						GetFrameNum() const { return framenum; };
	////int						GetTime() const { return time; };
	////int						GetMSec() const { return msec; };

	////int						GetNextClientNum( int current ) const;
	////idPlayer *				GetClientByNum( int current ) const;
	////idPlayer *				GetClientByName( const char *name ) const;
	////idPlayer *				GetClientByCmdArgs( const idCmdArgs &args ) const;

	////idPlayer *				GetLocalPlayer() const;

	////void					SpreadLocations();
	////idLocationEntity *		LocationForPoint( const idVec3 &point );	// May return NULL
	////idEntity *				SelectInitialSpawnPoint( idPlayer *player );

	////void					SetPortalState( qhandle_t portal, int blockingBits );
	////void					SaveEntityNetworkEvent( const idEntity *ent, int event, const idBitMsg *msg );
	////void					ServerSendChatMessage( int to, const char *name, const char *text );
	////int						ServerRemapDecl( int clientNum, declType_t type, int index );
	////int						ClientRemapDecl( declType_t type, int index );

	////void					SetGlobalMaterial( const idMaterial *mat );
	////const idMaterial *		GetGlobalMaterial();

	////void					SetGibTime( int _time ) { nextGibTime = _time; };
	////int						GetGibTime() { return nextGibTime; };

	////bool					NeedRestart();
////private:
	static INITIAL_SPAWN_COUNT = 1;

	mapFileName = new idStr ( ); // name of the map, empty string if no map loaded
	mapFile: idMapFile; // will be NULL during the game unless in-game editing is used
	mapCycleLoaded: boolean;

	spawnCount: number /*int*/;
	mapSpawnCount: number /*int*/; // it's handy to know which entities are part of the map

	locationEntities: Array<idLocationEntity>; // for location names, etc //idLocationEntity **	

	camera: idCamera;
	globalMaterial: idMaterial; // for overriding everything

	aasList = new idList<idAAS>( idAAS, true ); // area system
	aasNames = new idStrList;

	lastAIAlertEntity = new idEntityPtr<idActor> ( );
	lastAIAlertTime: number /*int*/;

	spawnArgs = new idDict; // spawn args used during entity spawning  FIXME: shouldn't be necessary anymore

	playerPVS = new pvsHandle_t; // merged pvs of all players
	playerConnectedAreas = new pvsHandle_t; // all areas connected to any player area

	gravity = new idVec3; // global gravity vector
	gamestate: gameState_t; // keeps track of whether we're spawning, shutting down, or normal gameplay
	influenceActive: boolean; // true when a phantasm is happening
	nextGibTime: number /*int*/;

	clientDeclRemap: idList<number/*int*/>[/*MAX_CLIENTS*/][/*DECL_MAX_TYPES*/];

	clientEntityStates: entityState_t[][] = multiDimEmptyArray<entityState_t>( MAX_CLIENTS, MAX_GENTITIES );
	clientPVS = multiDimArray<Int32Array>( Int32Array, MAX_CLIENTS, ENTITY_PVS_SIZE );
	clientSnapshots = new Array<snapshot_t>( MAX_CLIENTS );
	entityStateAllocator = idBlockAlloc_template < entityState_t>(entityState_t, 256);//	idBlockAlloc<entityState_t,256>entityStateAllocator;
	snapshotAllocator = idBlockAlloc_template<snapshot_t>(snapshot_t, 64);//	idBlockAlloc<snapshot_t,64>;

	eventQueue = new idEventQueue;
	savedEventQueue = new idEventQueue;

////	idStaticList<spawnSpot_t, MAX_GENTITIES> spawnSpots;
////	idStaticList<idEntity *, MAX_GENTITIES> initialSpots;
////	int						currentInitialSpot:number/*int*/;

	newInfo = new idDict ( );

	shakeSounds = new idStrList;

	lagometer = $3dArray( Uint8Array, LAGO_IMG_HEIGHT, LAGO_IMG_WIDTH, 4 );
	

	////void					Clear( void );
	////						// returns true if the entity shouldn't be spawned at all in this game type or difficulty level
	////bool					InhibitEntitySpawn( idDict &spawnArgs );
	////						// spawn entities from the map file
	////void					SpawnMapEntities( void );
	////						// commons used by init, shutdown, and restart
	////void					MapPopulate( void );
	////void					MapClear( bool clearClients );

	////pvsHandle_t				GetClientPVS( idPlayer *player, pvsType_t type );
	////void					SetupPlayerPVS( void );
	////void					FreePlayerPVS( void );
	////void					UpdateGravity( void );
	////void					SortActiveEntityList( void );
	////void					ShowTargets( void );
	////void					RunDebugInfo( void );

	////void					InitScriptForMap( void );

	////void					InitConsoleCommands( void );
	////void					ShutdownConsoleCommands( void );

	InitAsyncNetwork( ):void { throw "placeholder"; }
	ShutdownAsyncNetwork( ):void { throw "placeholder"; }
	////void					InitLocalClient( int clientNum );
	////void					InitClientDeclRemap( int clientNum );
	////void					ServerSendDeclRemapToClient( int clientNum, declType_t type, int index );
	////void					FreeSnapshotsOlderThanSequence( int clientNum, int sequence );
	////bool					ApplySnapshot( int clientNum, int sequence );
	////void					WriteGameStateToSnapshot( idBitMsgDelta &msg ) const;
	////void					ReadGameStateFromSnapshot( const idBitMsgDelta &msg );
	////void					NetworkEventWarning( const entityNetEvent_t *event, const char *fmt, ... ) id_attribute((format(printf,3,4)));
	////void					ServerProcessEntityNetworkEventQueue( void );
	////void					ClientProcessEntityNetworkEventQueue( void );
	////void					ClientShowSnapshot( int clientNum ) const;
	////						// call after any change to serverInfo. Will update various quick-access flags
	////void					UpdateServerInfoFlags( void );
	////void					RandomizeInitialSpawns( void );
	////static int				sortSpawnPoints( const void *ptr1, const void *ptr2 );

	////void					DumpOggSounds( void );
	////void					GetShakeSounds( const idDict *dict );

	////void					SelectTimeGroup( int timeGroup );
	////int						GetTimeGroupTime( int timeGroup );
	////void					GetBestGameType( const char* map, const char* gametype, char buf[ MAX_STRING_CHARS ] );

	////void					Tokenize( idStrList &out, const char *in );

	////void					UpdateLagometer( int aheadOfServer, int dupeUsercmds );

	////void					GetMapLoadingGUI( char gui[ MAX_STRING_CHARS ] );

	constructor() {
		super();

		this.clientDeclRemap = multiDimEmptyArray<idList<number>>( MAX_CLIENTS, declType_t.DECL_MAX_TYPES );
		for ( var i = 0; i < MAX_CLIENTS; i++ ) {
			for ( var j = 0; j < declType_t.DECL_MAX_TYPES; j++ ) {
				this.clientDeclRemap[i][j] = new idList<number>( Number );
			}
		}

		this.Clear ( );
	}




///*
//===========
//idGameLocal::idGameLocal
//============
//*/
//constructor() {
//	this.Clear();
//}

/*
===========
idGameLocal::Clear
============
*/
Clear (): void {
		var /*int */i: number;

		this.serverInfo.Clear();
		this.numClients = 0;
		for (i = 0; i < MAX_CLIENTS; i++) {
			this.userInfo[i].Clear();
			this.persistentPlayerInfo[i].Clear();
		}
		clearStructArray(this.usercmds);
		for (var j = 0; j < this.entities.length; j++) {
			this.entities[j] = null;
		}
		memset(this.spawnIds, -1, sizeof(this.spawnIds));
		this.firstFreeIndex = 0;
		this.num_entities = 0;
		this.spawnedEntities.Clear();
		this.activeEntities.Clear();
		this.numEntitiesToDeactivate = 0;
		this.sortPushers = false;
		this.sortTeamMasters = false;
		this.persistentLevelInfo.Clear();
		memset(this.globalShaderParms, 0, sizeof(this.globalShaderParms));
		this.random.SetSeed(0);
		this.world = null;
		this.frameCommandThread = null;
		this.testmodel = null;
		this.testFx = null;
		this.clip.Shutdown();
		this.pvs.Shutdown();
		this.sessionCommand.Clear();
		this.locationEntities = null;
		this.smokeParticles = null;
		this.editEntities = null;
		this.entityHash.Clear(1024, MAX_GENTITIES);
		this.inCinematic = false;
		this.cinematicSkipTime = 0;
		this.cinematicStopTime = 0;
		this.cinematicMaxSkipTime = 0;
		this.framenum = 0;
		this.previousTime = 0;
		this.time = 0;
		this.vacuumAreaNum = 0;
		this.mapFileName.Clear();
		this.mapFile = null;
		this.spawnCount = idGameLocal.INITIAL_SPAWN_COUNT;
		this.mapSpawnCount = 0;
		this.camera = null;
		this.aasList.Clear();
		this.aasNames.Clear();
		this.lastAIAlertEntity = null;
		this.lastAIAlertTime = 0;
		this.spawnArgs.Clear();
		this.gravity.Set(0, 0, -1);
		this.playerPVS.h = -1 >>> 0;
		this.playerConnectedAreas.h = -1 >>> 0;
		this.gamestate = gameState_t.GAMESTATE_UNINITIALIZED;
		this.skipCinematic = false;
		this.influenceActive = false;

		this.localClientNum = 0;
		this.isMultiplayer = false;
		this.isServer = false;
		this.isClient = false;
		this.realClientTime = 0;
		this.isNewFrame = true;
		this.clientSmoothing = 0.1;
		this.entityDefBits = 0;

		this.nextGibTime = 0;
		this.globalMaterial = null;
		this.newInfo.Clear();
		this.lastGUIEnt = null;
		this.lastGUI = 0;

		//memset( this.clientEntityStates, 0, sizeof( this.clientEntityStates ) );
		for (var k = 0; k < this.clientEntityStates.length; k++) {
			for (var l = 0; l < this.clientEntityStates[k].length; l++) {
				this.clientEntityStates[k][l] = null;
			}
		}

		for (var m = 0; m < this.clientPVS.length; m++) {
			memset(this.clientPVS[m], 0, this.clientPVS[m].byteLength);
		}
		for (var n = 0; n < this.clientSnapshots.length; n++) {
			this.clientSnapshots[n] = null;
		}

		this.eventQueue.Init();
		this.savedEventQueue.Init();

		memset3DArray(this.lagometer, 0);
	}

/*
===========
idGameLocal::Init

  initialize the game object, only happens once at startup, not each level load
============
*/
Init (): void {
		var dict: idDict;
		var aas: idAAS;

		//#ifndef GAME_DLL

		//	TestGameAPI();

		//#else

		// initialize idLib
		//idLib::Init();

		// register static cvars declared in the game
		todoMaybeGameDLL("idCVar::RegisterStaticVars();");

		// initialize processor specific SIMD
		//idSIMD::InitProcessor( "game", com_forceGenericSIMD.GetBool() );

		//#endif

		this.Printf("--------- Initializing Game ----------\n");
		this.Printf("gamename: %s\n", GAME_VERSION);
		this.Printf("gamedate: %s\n", __DATE__);

		// register game specific decl types
		declManager.RegisterDeclType("model", declType_t.DECL_MODELDEF, idDeclAllocator<idDeclModelDef>(idDeclModelDef));
		declManager.RegisterDeclType("export", declType_t.DECL_MODELEXPORT, idDeclAllocator<idDecl>(idDecl));

		// register game specific decl folders
		declManager.RegisterDeclFolder("def", ".def", declType_t.DECL_ENTITYDEF);
		declManager.RegisterDeclFolder("fx", ".fx", declType_t.DECL_FX);
		declManager.RegisterDeclFolder("particles", ".prt", declType_t.DECL_PARTICLE);
		declManager.RegisterDeclFolder("af", ".af", declType_t.DECL_AF);
		declManager.RegisterDeclFolder("newpdas", ".pda", declType_t.DECL_PDA);

		cmdSystem.AddCommand("listModelDefs", idListDecls_f(declType_t.DECL_MODELDEF), cmdFlags_t.CMD_FL_SYSTEM | cmdFlags_t.CMD_FL_GAME, "lists model defs");
		cmdSystem.AddCommand("printModelDefs", idPrintDecls_f(declType_t.DECL_MODELDEF), cmdFlags_t.CMD_FL_SYSTEM | cmdFlags_t.CMD_FL_GAME, "prints a model def", ArgCompletion_Decl_Template(declType_t.DECL_MODELDEF) /*idCmdSystem::ArgCompletion_Decl<DECL_MODELDEF>*/ );
		idLexer.RTCount = 0;
		this.Clear();

		idEvent.Init();
		idClass.Init();
		this.InitConsoleCommands();

		// load default scripts
		this.program.Startup(SCRIPT_DEFAULT);

		this.smokeParticles = new idSmokeParticles;

		// set up the aas
		dict = this.FindEntityDefDict("aas_types");
		if (!dict) {
			this.Error("Unable to find entityDef for 'aas_types'");
		}

		// allocate space for the aas
		var kv = dict.MatchPrefix("type");
		while (kv != null) {
			aas = idAAS.Alloc();
			this.aasList.Append(aas);
			this.aasNames.Append(kv.GetValue());
			kv = dict.MatchPrefix("type", kv);
		}

		this.gamestate = gameState_t.GAMESTATE_NOMAP;

		this.Printf("...%d aas types\n", this.aasList.Num());
		this.Printf("game initialized.\n");
		this.Printf("--------------------------------------\n");
	}

/////*
////===========
////idGameLocal::Shutdown

////  shut down the entire game
////============
////*/
////Shutdown( ):void  {

////	if ( !common ) {
////		return;
////	}

////	this.Printf( "------------ Game Shutdown -----------\n" );

////	this.mpGame.Shutdown();

////	this.MapShutdown();

////	this.aasList.DeleteContents( true );
////	this.aasNames.Clear();

////	idAI::FreeObstacleAvoidanceNodes();

////	// shutdown the model exporter
////	idModelExport::Shutdown();

////	idEvent::Shutdown();

////	$deleteArray(this.locationEntities);
////	this.locationEntities = NULL;

////	delete this.smokeParticles;
////	this.smokeParticles = NULL;

////	idClass::Shutdown();

////	// clear list with forces
////	idForce::ClearForceList();

////	// free the program data
////	this.program.FreeData();

////	// delete the .map file
////	delete this.mapFile;
////	this.mapFile = NULL;

////	// free the collision map
////	collisionModelManager.FreeMap();

////	ShutdownConsoleCommands();

////	// free memory allocated by class objects
////	Clear();

////	// shut down the animation manager
////	animationLib.Shutdown();

////	this.Printf( "--------------------------------------\n" );

////#ifdef GAME_DLL

////	// remove auto-completion function pointers pointing into this DLL
////	cvarSystem.RemoveFlaggedAutoCompletion( CVAR_GAME );

////	// enable leak test
////	Mem_EnableLeakTest( "game" );

////	// shutdown idLib
////	idLib::ShutDown();

////#endif
////}

/////*
////===========
////idGameLocal::SaveGame

////save the current player state, level name, and level state
////the session may have written some data to the file already
////============
////*/
////SaveGame( idFile *f ) {
////	var/*int */i:number;
////	var ent:idEntity
////	idEntity *link;

////	idSaveGame savegame( f );

////	if (g_flushSave.GetBool( ) == true ) { 
////		// force flushing with each write... for tracking down
////		// save game bugs.
////		f.ForceFlush();
////	}

////	savegame.WriteBuildNumber( BUILD_NUMBER );

////	// go through all entities and threads and add them to the object list
////	for( i = 0; i < MAX_GENTITIES; i++ ) {
////		ent = this.entities[i];

////		if ( ent ) {
////			if ( ent.GetTeamMaster() && ent.GetTeamMaster() != ent ) {
////				continue;
////			}
////			for ( link = ent; link != NULL; link = link.GetNextTeamEntity() ) {
////				savegame.AddObject( link );
////			}
////		}
////	}

////	idList<idThread *> threads;
////	threads = idThread::GetThreads();

////	for( i = 0; i < threads.Num(); i++ ) {
////		savegame.AddObject( threads[i] );
////	}

////	// write out complete object list
////	savegame.WriteObjectList();

////	this.program.Save( &savegame );

////	savegame.WriteInt( g_skill.GetInteger() );

////	savegame.WriteDict( &this.serverInfo );

////	savegame.WriteInt( this.numClients );
////	for( i = 0; i < this.numClients; i++ ) {
////		savegame.WriteDict( &this.userInfo[ i ] );
////		savegame.WriteUsercmd( usercmds[ i ] );
////		savegame.WriteDict( &persistentPlayerInfo[ i ] );
////	}

////	for( i = 0; i < MAX_GENTITIES; i++ ) {
////		savegame.WriteObject( this.entities[ i ] );
////		savegame.WriteInt( this.spawnIds[ i ] );
////	}

////	savegame.WriteInt( this.firstFreeIndex );
////	savegame.WriteInt( this.num_entities );

////	// enityHash is restored by idEntity::Restore setting the entity name.

////	savegame.WriteObject( this.world );

////	savegame.WriteInt( this.spawnedEntities.Num() );
////	for( ent = this.spawnedEntities.Next(); ent != NULL; ent = ent.spawnNode.Next() ) {
////		savegame.WriteObject( ent );
////	}

////	savegame.WriteInt( this.activeEntities.Num() );
////	for( ent = this.activeEntities.Next(); ent != NULL; ent = ent.activeNode.Next() ) {
////		savegame.WriteObject( ent );
////	}

////	savegame.WriteInt( this.numEntitiesToDeactivate );
////	savegame.WriteBool( this.sortPushers );
////	savegame.WriteBool( this.sortTeamMasters );
////	savegame.WriteDict( &persistentLevelInfo );

////	for( i = 0; i < MAX_GLOBAL_SHADER_PARMS; i++ ) {
////		savegame.WriteFloat( this.globalShaderParms[ i ] );
////	}

////	savegame.WriteInt( this.random.GetSeed() );
////	savegame.WriteObject( this.frameCommandThread );

////	// clip
////	// push
////	// pvs

////	this.testmodel = NULL;
////	this.testFx = NULL;

////	savegame.WriteString( this.sessionCommand );

////	// FIXME: save smoke particles

////	savegame.WriteInt( this.cinematicSkipTime );
////	savegame.WriteInt( this.cinematicStopTime );
////	savegame.WriteInt( this.cinematicMaxSkipTime );
////	savegame.WriteBool( this.inCinematic );
////	savegame.WriteBool( this.skipCinematic );

////	savegame.WriteBool( isMultiplayer );
////	savegame.WriteInt( this.gameType );

////	savegame.WriteInt( this.framenum );
////	savegame.WriteInt( this.previousTime );
////	savegame.WriteInt( this.time );

////	savegame.WriteInt( this.vacuumAreaNum );

////	savegame.WriteInt( entityDefBits );
////	savegame.WriteBool( isServer );
////	savegame.WriteBool( isClient );

////	savegame.WriteInt( localClientNum );

////	// snapshotEntities is used for multiplayer only

////	savegame.WriteInt( realClientTime );
////	savegame.WriteBool( isNewFrame );
////	savegame.WriteFloat( clientSmoothing );

////	savegame.WriteBool( mapCycleLoaded );
////	savegame.WriteInt( this.spawnCount );

////	if ( !this.locationEntities ) {
////		savegame.WriteInt( 0 );
////	} else {
////		savegame.WriteInt( gameRenderWorld.NumAreas() );
////		for( i = 0; i < gameRenderWorld.NumAreas(); i++ ) {
////			savegame.WriteObject( this.locationEntities[ i ] );
////		}
////	}

////	savegame.WriteObject( this.camera );

////	savegame.WriteMaterial( this.globalMaterial );

////	this.lastAIAlertEntity.Save( &savegame );
////	savegame.WriteInt( this.lastAIAlertTime );

////	savegame.WriteDict( &this.spawnArgs );

////	savegame.WriteInt( this.playerPVS.i );
////	savegame.WriteInt( this.playerPVS.h );
////	savegame.WriteInt( this.playerConnectedAreas.i );
////	savegame.WriteInt( this.playerConnectedAreas.h );

////	savegame.WriteVec3( this.gravity );

////	// gamestate

////	savegame.WriteBool( influenceActive );
////	savegame.WriteInt( this.nextGibTime );

////	// spawnSpots
////	// initialSpots
////	// currentInitialSpot
////	// newInfo
////	// makingBuild
////	// shakeSounds

////	// write out pending events
////	idEvent::Save( &savegame );

////	savegame.Close();
////}

/////*
////===========
////idGameLocal::GetPersistentPlayerInfo
////============
////*/
////const idDict &idGameLocal::GetPersistentPlayerInfo( int clientNum ) {
////	idEntity	*ent;

////	persistentPlayerInfo[ clientNum ].Clear();
////	ent = this.entities[ clientNum ];
////	if ( ent && ent.IsType( idPlayer::Type ) ) {
////		static_cast<idPlayer *>(ent).SavePersistantInfo();
////	}

////	return persistentPlayerInfo[ clientNum ];
////}

/*
===========
idGameLocal::SetPersistentPlayerInfo
============
*/
SetPersistentPlayerInfo ( /*int */clientNum: number, playerInfo: idDict): void {
		this.persistentPlayerInfo[clientNum].equals(playerInfo);
	}

/*
============
idGameLocal::Printf
============
*/
Printf ( /*const char **/ fmt: string, ...args: any[]): void {
		var argArr = args.slice(0);
		argArr.unshift(fmt.trim());
		console.log.apply(console, argArr);
	}

/*
============
idGameLocal::DPrintf
============
*/
DPrintf ( /*const char **/ fmt: string, ...args: any[]): void {
		if (!developer.GetBool()) {
			return;
		}
		var argArr = args.slice(0);
		argArr.unshift(fmt.trim());
		console.log.apply(console, argArr);
	}

/*
============
idGameLocal::Warning
============
*/
Warning (fmt: string, ...args: any[]): void {
		todoThrow();
		//va_list		argptr;
		//char		text[MAX_STRING_CHARS];
		//idThread *	thread;

		//va_start( argptr, fmt );
		//idStr::vsnPrintf( text, sizeof( text ), fmt, argptr );
		//va_end( argptr );

		//thread = idThread::CurrentThread();
		//if ( thread ) {
		//	thread.Warning( "%s", text );
		//} else {
		//	common.Warning( "%s", text );
		//}
	}

/////*
////============
////idGameLocal::DWarning
////============
////*/
////DWarning( const char *fmt, ... ) :void  {
////	va_list		argptr;
////	char		text[MAX_STRING_CHARS];
////	idThread *	thread;

////	if ( !developer.GetBool() ) {
////		return;
////	}

////	va_start( argptr, fmt );
////	idStr::vsnPrintf( text, sizeof( text ), fmt, argptr );
////	va_end( argptr );

////	thread = idThread::CurrentThread();
////	if ( thread ) {
////		thread.Warning( "%s", text );
////	} else {
////		common.DWarning( "%s", text );
////	}
////}

/*
============
idGameLocal::Error
============
*/
Error (fmt: string, ...args: any[]): void {
		todoThrow();
		//va_list		argptr;
		//char		text[MAX_STRING_CHARS];
		//idThread *	thread;

		//va_start( argptr, fmt );
		//idStr::vsnPrintf( text, sizeof( text ), fmt, argptr );
		//va_end( argptr );

		//thread = idThread::CurrentThread();
		//if ( thread ) {
		//	thread.Error( "%s", text );
		//} else {
		//	common.Error( "%s", text );
		//}
	}

/////*
////===============
////gameError
////===============
////*/
////void gameError( const char *fmt, ... ) {
////	va_list		argptr;
////	char		text[MAX_STRING_CHARS];

////	va_start( argptr, fmt );
////	idStr::vsnPrintf( text, sizeof( text ), fmt, argptr );
////	va_end( argptr );

////	gameLocal.Error( "%s", text );
////}

/////*
////===========
////idGameLocal::SetLocalClient
////============
////*/
////SetLocalClient( int clientNum ) :void {
////	localClientNum = clientNum;
////}

/*
===========
idGameLocal::SetUserInfo
============
*/
SetUserInfo ( /*int */clientNum: number, userInfo: idDict, isClient: boolean, canModify: boolean): idDict {
		var /*int */i: number;
		var modifiedInfo = 0/*false*/;

		this.isClient = isClient;

		if (clientNum >= 0 && clientNum < MAX_CLIENTS) {
			this.userInfo[clientNum] = userInfo;

			// server sanity
			if (canModify) {
				todoThrow();
				//// don't let numeric nicknames, it can be exploited to go around kick and ban commands from the server
				//if ( idStr.IsNumeric( userInfo[ clientNum ].GetString( "ui_name" ) ) ) {
				//	idGameLocal::userInfo[ clientNum ].Set( "ui_name", va( "%s_", idGameLocal::userInfo[ clientNum ].GetString( "ui_name" ) ) );
				//	modifiedInfo = 1/*true*/;
				//}

				//// don't allow dupe nicknames
				//for ( i = 0; i < this.numClients; i++ ) {
				//	if ( i == clientNum ) {
				//		continue;
				//	}
				//	if ( this.entities[ i ] && this.entities[ i ].IsType( idPlayer::Type ) ) {
				//		if ( !idStr.Icmp( idGameLocal::userInfo[ clientNum ].GetString( "ui_name" ), idGameLocal::userInfo[ i ].GetString( "ui_name" ) ) ) {
				//			idGameLocal::userInfo[ clientNum ].Set( "ui_name", va( "%s_", idGameLocal::userInfo[ clientNum ].GetString( "ui_name" ) ) );
				//			modifiedInfo = 1/*true*/;
				//			i = -1;	// rescan
				//			continue;
				//		}
				//	}
				//}
			}

			if (this.entities[clientNum] && this.entities[clientNum].IsType(idPlayer.Type)) {
				modifiedInfo |= (static_cast<idPlayer>(this.entities[clientNum]).UserInfoChanged(canModify) ? 1 : 0);
			}

			if (!isClient) {
				// now mark this client in game
				this.mpGame.EnterGame(clientNum);
			}
		}

		if (modifiedInfo) {
			assert(canModify);
			this.newInfo.equals(this.userInfo[clientNum]);
			return this.newInfo;
		}
		return null;
	}

/////*
////===========
////idGameLocal::GetUserInfo
////============
////*/
////const idDict* idGameLocal::GetUserInfo( int clientNum ) {
////	if ( this.entities[ clientNum ] && this.entities[ clientNum ].IsType( idPlayer::Type ) ) {
////		return &this.userInfo[ clientNum ];
////	}
////	return NULL;
////}

/*
===========
idGameLocal::SetServerInfo
============
*/
SetServerInfo (_serverInfo: idDict): void {
		var outMsg = new idBitMsg;
		var msgBuf = new Uint8Array(MAX_GAME_MESSAGE_SIZE);
		this.serverInfo.equals(_serverInfo);
		this.UpdateServerInfoFlags();

		if (!this.isClient) {
			// Let our clients know the server info changed
			outMsg.Init(msgBuf, sizeof(msgBuf));
			outMsg.WriteByte(GAME_RELIABLE_MESSAGE_SERVERINFO);
			outMsg.WriteDeltaDict(gameLocal.serverInfo, null);
			networkSystem.ServerSendReliableMessage(-1, outMsg);
		}
	}


/*
===================
idGameLocal::LoadMap

Initializes all map variables common to both save games and spawned games.
===================
*/
	LoadMap ( mapName: string, /*int */randseed: number ): void {
		var /*int */i: number;
		var sameMap = ( this.mapFile && idStr.Icmp( this.mapFileName, mapName ) == 0 );

		// clear the sound system
		gameSoundWorld.ClearAllSoundEmitters ( );

		this.InitAsyncNetwork ( );

		if ( !sameMap || ( this.mapFile && this.mapFile.NeedsReload ( ) ) ) {
			// load the .map file
			if ( this.mapFile ) {
				$delete( this.mapFile );
				delete this.mapFile;
			}
			this.mapFile = new idMapFile;
			if ( !this.mapFile.Parse( mapName + ".map" ) ) {
				$delete( this.mapFile );
				delete this.mapFile;
				this.mapFile = null;
				this.Error( "Couldn't load %s", mapName );
			}
		}
		this.mapFileName.equals( this.mapFile.GetName ( ) );

		// load the collision map
		collisionModelManager.LoadMap( this.mapFile );

		this.numClients = 0;

		// initialize all entities for this game
		//memset( this.entities, 0, sizeof( this.entities ) );
		for ( var j = 0; j < this.entities.length; j++ ) {
			this.entities[j] = null;
		}
		clearStructArray( this.usercmds ); // memset( usercmds, 0, sizeof( usercmds ) );
		memset( this.spawnIds, -1, sizeof( this.spawnIds ) );
		this.spawnCount = idGameLocal.INITIAL_SPAWN_COUNT;

		this.spawnedEntities.Clear ( );
		this.activeEntities.Clear ( );
		this.numEntitiesToDeactivate = 0;
		this.sortTeamMasters = false;
		this.sortPushers = false;
		this.lastGUIEnt = null;
		this.lastGUI = 0;

		this.globalMaterial = null;

		memset( this.globalShaderParms, 0, sizeof( this.globalShaderParms ) );

		// always leave room for the max number of clients,
		// even if they aren't all used, so numbers inside that
		// range are NEVER anything but clients
		this.num_entities = MAX_CLIENTS;
		this.firstFreeIndex = MAX_CLIENTS;

		// reset the random number generator.
		this.random.SetSeed( this.isMultiplayer ? randseed : 0 );

		this.camera = null;
		this.world = null;
		this.testmodel = null;
		this.testFx = null;

		this.lastAIAlertEntity = null;
		this.lastAIAlertTime = 0;

		this.previousTime = 0;
		this.time = 0;
		this.framenum = 0;
		this.sessionCommand.equals( "" );
		this.nextGibTime = 0;

		this.vacuumAreaNum = -1; // if an info_vacuum is spawned, it will set this

		if ( !this.editEntities ) {
			this.editEntities = new idEditEntities;
		}

		this.gravity.Set( 0, 0, -g_gravity.GetFloat ( ) );

		this.spawnArgs.Clear ( );

		this.skipCinematic = false;
		this.inCinematic = false;
		this.cinematicSkipTime = 0;
		this.cinematicStopTime = 0;
		this.cinematicMaxSkipTime = 0;

		this.clip.Init ( );
		this.pvs.Init ( );
		this.playerPVS.i = -1;
		this.playerConnectedAreas.i = -1;

		// load navigation system for all the different monster sizes
		for ( i = 0; i < this.aasNames.Num ( ); i++ ) {
			this.aasList[i].Init( new idStr( this.mapFileName.SetFileExtension( this.aasNames[i].data ) ), this.mapFile.GetGeometryCRC ( ) );
		}

		// clear the smoke particle free list
		this.smokeParticles.Init ( );

		// cache miscellanious media references
		this.FindEntityDef( "preCacheExtras", false );

		if ( !sameMap ) {
			this.mapFile.RemovePrimitiveData ( );
		}
	}

/////*
////===================
////idGameLocal::LocalMapRestart
////===================
////*/
////LocalMapRestart( ):void  {
////	int i, latchSpawnCount;

////	this.Printf( "----------- Game Map Restart ------------\n" );

////	this.gamestate = gameState_t.GAMESTATE_SHUTDOWN;

////	for ( i = 0; i < MAX_CLIENTS; i++ ) {
////		if ( this.entities[ i ] && this.entities[ i ].IsType( idPlayer::Type ) ) {
////			static_cast< idPlayer * >( this.entities[ i ] ).PrepareForRestart();
////		}
////	}

////	eventQueue.Shutdown();
////	savedEventQueue.Shutdown();

////	this.MapClear( false );

////	// clear the smoke particle free list
////	this.smokeParticles.Init();

////	// clear the sound system
////	if ( gameSoundWorld ) {
////		gameSoundWorld.ClearAllSoundEmitters();
////	}

////	// the spawnCount is reset to zero temporarily to spawn the map entities with the same spawnId
////	// if we don't do that, network clients are confused and don't show any map entities
////	latchSpawnCount = this.spawnCount;
////	this.spawnCount = idGameLocal.INITIAL_SPAWN_COUNT;

////	this.gamestate = GAMESTATE_STARTUP;

////	this.program.Restart();

////	this.InitScriptForMap();

////	this.MapPopulate();

////	// once the map is populated, set the spawnCount back to where it was so we don't risk any collision
////	// (note that if there are no players in the game, we could just leave it at it's current value)
////	this.spawnCount = latchSpawnCount;

////	// setup the client entities again
////	for ( i = 0; i < MAX_CLIENTS; i++ ) {
////		if ( this.entities[ i ] && this.entities[ i ].IsType( idPlayer::Type ) ) {
////			static_cast< idPlayer * >( this.entities[ i ] ).Restart();
////		}
////	}

////	this.gamestate = GAMESTATE_ACTIVE;

////	this.Printf( "--------------------------------------\n" );
////}

/////*
////===================
////idGameLocal::MapRestart
////===================
////*/
////MapRestart( ):void  {
////	idBitMsg	outMsg;
////	byte		msgBuf[MAX_GAME_MESSAGE_SIZE];
////	idDict		newInfo;
////	int			i;
////	const idKeyValue *keyval, *keyval2;

////	if ( isClient ) {
////		LocalMapRestart();
////	} else {
////		newInfo = *cvarSystem.MoveCVarsToDict( CVAR_SERVERINFO );
////		for ( i = 0; i < newInfo.GetNumKeyVals(); i++ ) {
////			keyval = newInfo.GetKeyVal( i );
////			keyval2 = this.serverInfo.FindKey( keyval.GetKey() );
////			if ( !keyval2 ) {
////				break;
////			}
////			// a select set of si_ changes will cause a full restart of the server
////			if ( keyval.GetValue().Cmp( keyval2.GetValue() ) &&
////				( !keyval.GetKey().Cmp( "si_pure" ) || !keyval.GetKey().Cmp( "si_map" ) ) ) {
////				break;
////			}
////		}
////		cmdSystem.BufferCommandText( CMD_EXEC_NOW, "rescanSI" );
////		if ( i != newInfo.GetNumKeyVals() ) {
////			cmdSystem.BufferCommandText( CMD_EXEC_APPEND, "nextMap" );
////		} else {
////			outMsg.Init( msgBuf, sizeof( msgBuf ) );
////			outMsg.WriteByte( GAME_RELIABLE_MESSAGE_RESTART );
////			outMsg.WriteBits( 1, 1 );
////			outMsg.WriteDeltaDict( this.serverInfo, NULL );
////			networkSystem.ServerSendReliableMessage( -1, outMsg );

////			LocalMapRestart();
////			this.mpGame.MapRestart();
////		}
////	}
////}

/////*
////===================
////idGameLocal::MapRestart_f
////===================
////*/
////MapRestart_f( args:idCmdArgs ) :void {
////	if ( !gameLocal.isMultiplayer || gameLocal.isClient ) {
////		common.Printf( "server is not running - use spawnServer\n" );
////		cmdSystem.BufferCommandText( CMD_EXEC_APPEND, "spawnServer\n" );
////		return;
////	}

////	gameLocal.MapRestart( );
////}

/////*
////===================
////idGameLocal::NextMap
////===================
////*/
////bool idGameLocal::NextMap( ) {
////	const function_t	*func;
////	idThread			*thread;
////	idDict				newInfo;
////	const idKeyValue	*keyval, *keyval2;
////	int					i;

////	if ( !g_mapCycle.GetString()[0] ) {
////		this.Printf( common.GetLanguageDict().GetString( "#str_04294" ) );
////		return false;
////	}
////	if ( fileSystem.ReadFile( g_mapCycle.GetString(), NULL, NULL ) < 0 ) {
////		if ( fileSystem.ReadFile( va( "%s.scriptcfg", g_mapCycle.GetString() ), NULL, NULL ) < 0 ) {
////			this.Printf( "map cycle script '%s': not found\n", g_mapCycle.GetString() );
////			return false;
////		} else {
////			g_mapCycle.SetString( va( "%s.scriptcfg", g_mapCycle.GetString() ) );
////		}
////	}

////	this.Printf( "map cycle script: '%s'\n", g_mapCycle.GetString() );
////	func = this.program.FindFunction( "mapcycle::cycle" );
////	if ( !func ) {
////		this.program.CompileFile( g_mapCycle.GetString() );
////		func = this.program.FindFunction( "mapcycle::cycle" );
////	}
////	if ( !func ) {
////		this.Printf( "Couldn't find mapcycle::cycle\n" );
////		return false;
////	}
////	thread = new idThread( func );
////	thread.Start();
////	delete thread;

////	newInfo = *cvarSystem.MoveCVarsToDict( CVAR_SERVERINFO );
////	for ( i = 0; i < newInfo.GetNumKeyVals(); i++ ) {
////		keyval = newInfo.GetKeyVal( i );
////		keyval2 = this.serverInfo.FindKey( keyval.GetKey() );
////		if ( !keyval2 || keyval.GetValue().Cmp( keyval2.GetValue() ) ) {
////			break;
////		}
////	}
////	return ( i != newInfo.GetNumKeyVals() );
////}

/////*
////===================
////idGameLocal::NextMap_f
////===================
////*/
////NextMap_f( args:idCmdArgs ) :void {
////	if ( !gameLocal.isMultiplayer || gameLocal.isClient ) {
////		common.Printf( "server is not running\n" );
////		return;
////	}

////	gameLocal.NextMap( );
////	// next map was either voted for or triggered by a server command - always restart
////	gameLocal.MapRestart( );
////}

/*
===================
idGameLocal::MapPopulate
===================
*/
MapPopulate (): void {

		if (this.isMultiplayer) {
			cvarSystem.SetCVarBool("r_skipSpecular", false);
		}
		// parse the key/value pairs and spawn entities
		this.SpawnMapEntities();

		// mark location entities in all connected areas
		this.SpreadLocations();

		// prepare the list of randomized initial spawn spots
		this.RandomizeInitialSpawns();

		// spawnCount - 1 is the number of entities spawned into the map, their indexes started at MAX_CLIENTS (included)
		// mapSpawnCount is used as the max index of map entities, it's the first index of non-map entities
		this.mapSpawnCount = MAX_CLIENTS + this.spawnCount - 1;

		// execute pending events before the very first game frame
		// this makes sure the map script main() function is called
		// before the physics are run so entities can bind correctly
		this.Printf("==== Processing events ====\n");
		idEvent.ServiceEvents();
	}

/*
===================
idGameLocal::InitFromNewMap
===================
*/
InitFromNewMap (mapName: string, renderWorld: idRenderWorld, soundWorld: idSoundWorld, isServer: boolean, isClient: boolean, randseed: number /*int*/ ): void {

		this.isServer = isServer;
		this.isClient = isClient;
		this.isMultiplayer = isServer || isClient;

		if (this.mapFileName.Length()) {
			this.MapShutdown();
		}

		this.Printf("----------- Game Map Init ------------\n");

		this.gamestate = gameState_t.GAMESTATE_STARTUP;

		gameRenderWorld = <idRenderWorldLocal>renderWorld;
		gameSoundWorld = soundWorld;
		debugger;//todo: test LoadMap outcome
		this.LoadMap(mapName, randseed);

		this.InitScriptForMap();

		this.MapPopulate();

		this.mpGame.Reset();

		this.mpGame.Precache();

		// free up any unused animations
		animationLib.FlushUnusedAnims();

		this.gamestate = gameState_t.GAMESTATE_ACTIVE;

		this.Printf("--------------------------------------\n");
	}

/////*
////=================
////idGameLocal::InitFromSaveGame
////=================
////*/
////bool idGameLocal::InitFromSaveGame( const char *mapName, idRenderWorld *renderWorld, idSoundWorld *soundWorld, idFile *saveGameFile ) {
////	var/*int */i:number;
////	int num;
////	var ent:idEntity
////	idDict si;

////	if ( this.mapFileName.Length() ) {
////		this.MapShutdown();
////	}

////	this.Printf( "------- Game Map Init SaveGame -------\n" );

////	this.gamestate = GAMESTATE_STARTUP;

////	gameRenderWorld = renderWorld;
////	gameSoundWorld = soundWorld;

////	idRestoreGame savegame( saveGameFile );

////	savegame.ReadBuildNumber();

////	// Create the list of all objects in the game
////	savegame.CreateObjects();

////	// Load the idProgram, also checking to make sure scripting hasn't changed since the savegame
////	if ( this.program.Restore( &savegame ) == false ) {

////		// Abort the load process, and let the session know so that it can restart the level
////		// with the player persistent data.
////		savegame.DeleteObjects();
////		this.program.Restart();

////		return false;
////	}

////	// load the map needed for this savegame
////	LoadMap( mapName, 0 );

////	savegame.ReadInt( i );
////	g_skill.SetInteger( i );

////	// precache the player
////	this.FindEntityDef( "player_doommarine", false );

////	// precache any media specified in the map
////	for ( i = 0; i < this.mapFile.GetNumEntities(); i++ ) {
////		idMapEntity *mapEnt = this.mapFile.GetEntity( i );

////		if ( !this.InhibitEntitySpawn( mapEnt.epairs ) ) {
////			this.CacheDictionaryMedia( &mapEnt.epairs );
////			const char *classname = mapEnt.epairs.GetString( "classname" );
////			if ( classname != '\0' ) {
////				this.FindEntityDef( classname, false );
////			}
////		}
////	}

////	savegame.ReadDict( &si );
////	SetServerInfo( si );

////	savegame.ReadInt( this.numClients );
////	for( i = 0; i < this.numClients; i++ ) {
////		savegame.ReadDict( &this.userInfo[ i ] );
////		savegame.ReadUsercmd( usercmds[ i ] );
////		savegame.ReadDict( &persistentPlayerInfo[ i ] );
////	}

////	for( i = 0; i < MAX_GENTITIES; i++ ) {
////		savegame.ReadObject( reinterpret_cast<idClass *&>( this.entities[ i ] ) );
////		savegame.ReadInt( this.spawnIds[ i ] );

////		// restore the entityNumber
////		if ( this.entities[ i ] != NULL ) {
////			this.entities[ i ].entityNumber = i;
////		}
////	}

////	savegame.ReadInt( this.firstFreeIndex );
////	savegame.ReadInt( this.num_entities );

////	// enityHash is restored by idEntity::Restore setting the entity name.

////	savegame.ReadObject( reinterpret_cast<idClass *&>( this.world ) );

////	savegame.ReadInt( num );
////	for( i = 0; i < num; i++ ) {
////		savegame.ReadObject( reinterpret_cast<idClass *&>( ent ) );
////		assert( ent );
////		if ( ent ) {
////			ent.spawnNode.AddToEnd( this.spawnedEntities );
////		}
////	}

////	savegame.ReadInt( num );
////	for( i = 0; i < num; i++ ) {
////		savegame.ReadObject( reinterpret_cast<idClass *&>( ent ) );
////		assert( ent );
////		if ( ent ) {
////			ent.activeNode.AddToEnd( this.activeEntities );
////		}
////	}

////	savegame.ReadInt( this.numEntitiesToDeactivate );
////	savegame.ReadBool( this.sortPushers );
////	savegame.ReadBool( this.sortTeamMasters );
////	savegame.ReadDict( &persistentLevelInfo );

////	for( i = 0; i < MAX_GLOBAL_SHADER_PARMS; i++ ) {
////		savegame.ReadFloat( this.globalShaderParms[ i ] );
////	}

////	savegame.ReadInt( i );
////	this.random.SetSeed( i );

////	savegame.ReadObject( reinterpret_cast<idClass *&>( this.frameCommandThread ) );

////	// clip
////	// push
////	// pvs

////	// this.testmodel = "<NULL>"
////	// this.testFx = "<NULL>"

////	savegame.ReadString( this.sessionCommand );

////	// FIXME: save smoke particles

////	savegame.ReadInt( this.cinematicSkipTime );
////	savegame.ReadInt( this.cinematicStopTime );
////	savegame.ReadInt( this.cinematicMaxSkipTime );
////	savegame.ReadBool( this.inCinematic );
////	savegame.ReadBool( this.skipCinematic );

////	savegame.ReadBool( isMultiplayer );
////	savegame.ReadInt( (int &)this.gameType );

////	savegame.ReadInt( this.framenum );
////	savegame.ReadInt( this.previousTime );
////	savegame.ReadInt( this.time );

////	savegame.ReadInt( this.vacuumAreaNum );

////	savegame.ReadInt( entityDefBits );
////	savegame.ReadBool( isServer );
////	savegame.ReadBool( isClient );

////	savegame.ReadInt( localClientNum );

////	// snapshotEntities is used for multiplayer only

////	savegame.ReadInt( realClientTime );
////	savegame.ReadBool( isNewFrame );
////	savegame.ReadFloat( clientSmoothing );

////	savegame.ReadBool( mapCycleLoaded );
////	savegame.ReadInt( this.spawnCount );

////	savegame.ReadInt( num );
////	if ( num ) {
////		if ( num != gameRenderWorld.NumAreas() ) {
////			savegame.Error( "idGameLocal::InitFromSaveGame: number of areas in map differs from save game." );
////		}

////		this.locationEntities = new idLocationEntity *[ num ];
////		for( i = 0; i < num; i++ ) {
////			savegame.ReadObject( reinterpret_cast<idClass *&>( this.locationEntities[ i ] ) );
////		}
////	}

////	savegame.ReadObject( reinterpret_cast<idClass *&>( this.camera ) );

////	savegame.ReadMaterial( this.globalMaterial );

////	this.lastAIAlertEntity.Restore( &savegame );
////	savegame.ReadInt( this.lastAIAlertTime );

////	savegame.ReadDict( &this.spawnArgs );

////	savegame.ReadInt( this.playerPVS.i );
////	savegame.ReadInt( (int &)this.playerPVS.h );
////	savegame.ReadInt( this.playerConnectedAreas.i );
////	savegame.ReadInt( (int &)this.playerConnectedAreas.h );

////	savegame.ReadVec3( this.gravity );

////	// gamestate is restored after restoring everything else

////	savegame.ReadBool( influenceActive );
////	savegame.ReadInt( this.nextGibTime );

////	// spawnSpots
////	// initialSpots
////	// currentInitialSpot
////	// newInfo
////	// makingBuild
////	// shakeSounds

////	// Read out pending events
////	idEvent::Restore( &savegame );

////	savegame.RestoreObjects();

////	this.mpGame.Reset();

////	this.mpGame.Precache();

////	// free up any unused animations
////	animationLib.FlushUnusedAnims();

////	this.gamestate = GAMESTATE_ACTIVE;

////	this.Printf( "--------------------------------------\n" );

////	return true;
////}

/*
===========
idGameLocal::MapClear
===========
*/
MapClear (clearClients: boolean): void {
		var i: number;

		for (i = (clearClients ? 0 : MAX_CLIENTS); i < MAX_GENTITIES; i++) {
			$delete(this.entities[i]);
			delete this.entities[i];
			// ~idEntity is in charge of setting the pointer to NULL
			// it will also clear pending events for this entity
			assert(!this.entities[i]);
			this.spawnIds[i] = -1;
		}

		this.entityHash.Clear(1024, MAX_GENTITIES);

		if (!clearClients) {
			// add back the hashes of the clients
			for (i = 0; i < MAX_CLIENTS; i++) {
				if (!this.entities[i]) {
					continue;
				}
				this.entityHash.Add(this.entityHash.GenerateKey(this.entities[i].name.c_str(), true), i);
			}
		}

		$delete(this.frameCommandThread);
		delete this.frameCommandThread;
		this.frameCommandThread = null;

		if (this.editEntities) {
			$delete(this.editEntities);
			delete this.editEntities;
			this.editEntities = null;
		}

		$deleteArray(this.locationEntities);
		this.locationEntities = null;
	}

/*
===========
idGameLocal::MapShutdown
============
*/
MapShutdown (): void {
		this.Printf("--------- Game Map Shutdown ----------\n");

		this.gamestate = gameState_t.GAMESTATE_SHUTDOWN;

		if (gameRenderWorld) {
			// clear any debug lines, text, and polygons
			gameRenderWorld.DebugClearLines(0);
			gameRenderWorld.DebugClearPolygons(0);
		}

		// clear out camera if we're in a cinematic
		if (this.inCinematic) {
			this.camera = null;
			this.inCinematic = false;
		}

		this.MapClear(true);

		// reset the script to the state it was before the map was started
		this.program.Restart();

		if (this.smokeParticles) {
			this.smokeParticles.Shutdown();
		}

		this.pvs.Shutdown();

		this.clip.Shutdown();
		idClipModel.ClearTraceModelCache();

		this.ShutdownAsyncNetwork();

		this.mapFileName.Clear();

		gameRenderWorld = null;
		gameSoundWorld = null;

		this.gamestate = gameState_t.GAMESTATE_NOMAP;

		this.Printf("--------------------------------------\n");
	}

/////*
////===================
////idGameLocal::DumpOggSounds
////===================
////*/
////DumpOggSounds( ):void  {
////	int i, j, k, size, totalSize;
////	idFile *file;
////	idStrList oggSounds, weaponSounds;
////	const idSoundShader *soundShader;
////	const soundShaderParms_t *parms;
////	idStr soundName;

////	for ( i = 0; i < declManager.GetNumDecls( declType_t.DECL_SOUND ); i++ ) {
////		soundShader = static_cast<const idSoundShader *>(declManager.DeclByIndex( declType_t.DECL_SOUND, i, false ));
////		parms = soundShader.GetParms();

////		if ( soundShader.EverReferenced() && soundShader.GetState() != DS_DEFAULTED ) {

////			const_cast<idSoundShader *>(soundShader).EnsureNotPurged();

////			for ( j = 0; j < soundShader.GetNumSounds(); j++ ) {
////				soundName = soundShader.GetSound( j );
////				soundName.BackSlashesToSlashes();

////				// don't OGG sounds that cause a shake because that would
////				// cause continuous seeking on the OGG file which is expensive
////				if ( parms.shakes != 0.0 ) {
////					shakeSounds.AddUnique( soundName );
////					continue;
////				}

////				// if not voice over or combat chatter
////				if (	soundName.Find( "/vo/", false ) == -1 &&
////						soundName.Find( "/combat_chatter/", false ) == -1 &&
////						soundName.Find( "/bfgcarnage/", false ) == -1 &&
////						soundName.Find( "/enpro/", false ) == - 1 &&
////						soundName.Find( "/soulcube/energize_01.wav", false ) == -1 ) {
////					// don't OGG weapon sounds
////					if (	soundName.Find( "weapon", false ) != -1 ||
////							soundName.Find( "gun", false ) != -1 ||
////							soundName.Find( "bullet", false ) != -1 ||
////							soundName.Find( "bfg", false ) != -1 ||
////							soundName.Find( "plasma", false ) != -1 ) {
////						weaponSounds.AddUnique( soundName );
////						continue;
////					}
////				}

////				for ( k = 0; k < shakeSounds.Num(); k++ ) {
////					if ( shakeSounds[k].IcmpPath( soundName ) == 0 ) {
////						break;
////					}
////				}
////				if ( k < shakeSounds.Num() ) {
////					continue;
////				}

////				oggSounds.AddUnique( soundName );
////			}
////		}
////	}

////	file = fileSystem.OpenFileWrite( "makeogg.bat", "fs_savepath" );
////	if ( file == NULL ) {
////		common.Warning( "Couldn't open makeogg.bat" );
////		return;
////	}

////	// list all the shake sounds
////	totalSize = 0;
////	for ( i = 0; i < shakeSounds.Num(); i++ ) {
////		size = fileSystem.ReadFile( shakeSounds[i], NULL, NULL );
////		totalSize += size;
////		shakeSounds[i].Replace( "/", "\\" );
////		file.Printf( "echo \"%s\" (%d kB)\n", shakeSounds[i].c_str(), size >> 10 );
////	}
////	file.Printf( "echo %d kB in shake sounds\n\n\n", totalSize >> 10 );

////	// list all the weapon sounds
////	totalSize = 0;
////	for ( i = 0; i < weaponSounds.Num(); i++ ) {
////		size = fileSystem.ReadFile( weaponSounds[i], NULL, NULL );
////		totalSize += size;
////		weaponSounds[i].Replace( "/", "\\" );
////		file.Printf( "echo \"%s\" (%d kB)\n", weaponSounds[i].c_str(), size >> 10 );
////	}
////	file.Printf( "echo %d kB in weapon sounds\n\n\n", totalSize >> 10 );

////	// list commands to convert all other sounds to ogg
////	totalSize = 0;
////	for ( i = 0; i < oggSounds.Num(); i++ ) {
////		size = fileSystem.ReadFile( oggSounds[i], NULL, NULL );
////		totalSize += size;
////		oggSounds[i].Replace( "/", "\\" );
////		file.Printf( "w:\\doom\\ogg\\oggenc -q 0 \"c:\\doom\\base\\%s\"\n", oggSounds[i].c_str() );
////		file.Printf( "del \"c:\\doom\\base\\%s\"\n", oggSounds[i].c_str() );
////	}
////	file.Printf( "\n\necho %d kB in OGG sounds\n\n\n", totalSize >> 10 );

////	fileSystem.CloseFile( file );

////	shakeSounds.Clear();
////}

/////*
////===================
////idGameLocal::GetShakeSounds
////===================
////*/
////GetShakeSounds( const idDict *dict ):void  {
////	const idSoundShader *soundShader;
////	const char *soundShaderName;
////	idStr soundName;

////	soundShaderName = dict.GetString( "s_shader" );
////	if ( soundShaderName != '\0' && dict.GetFloat( "s_shakes" ) != 0.0 ) {
////		soundShader = declManager.FindSound( soundShaderName );

////		for ( int i = 0; i < soundShader.GetNumSounds(); i++ ) {
////			soundName = soundShader.GetSound( i );
////			soundName.BackSlashesToSlashes();

////			shakeSounds.AddUnique( soundName );
////		}
////	}
////}

/*
===================
idGameLocal::CacheDictionaryMedia

This is called after parsing an EntityDef and for each entity spawnArgs before
merging the entitydef.  It could be done post-merge, but that would
avoid the fast pre-cache check associated with each entityDef
===================
*/
CacheDictionaryMedia (dict: idDict): void {
		var kv: idKeyValue;
		if (!dict) {
			if (cvarSystem.GetCVarBool("com_makingBuild")) {
				todoThrow ( );
				//this.DumpOggSounds();
			}
			return;
		}

		if (cvarSystem.GetCVarBool("com_makingBuild")) {
			todoThrow();
			//this.GetShakeSounds(dict);
		}

		kv = dict.MatchPrefix("model");
		while (kv) {
			if (kv.GetValue().Length()) {
				declManager.MediaPrint("Precaching model %s\n", kv.GetValue().c_str());
				// precache model/animations
				if (declManager.FindType(declType_t.DECL_MODELDEF, kv.GetValue().data, false) == null) {
					// precache the render model
					renderModelManager.FindModel(kv.GetValue().data);
					// precache .cm files only
					collisionModelManager.LoadModel(kv.GetValue().data, true);
				}
			}
			kv = dict.MatchPrefix("model", kv);
		}

		kv = dict.FindKey("s_shader");
		if (kv && kv.GetValue().Length()) {
			declManager.FindType(declType_t.DECL_SOUND, kv.GetValue().data);
		}

		kv = dict.MatchPrefix("snd", null);
		while (kv) {
			if (kv.GetValue().Length()) {
				declManager.FindType(declType_t.DECL_SOUND, kv.GetValue().data);
			}
			kv = dict.MatchPrefix("snd", kv);
		}


		kv = dict.MatchPrefix("gui", null);
		while (kv) {
			if (kv.GetValue().Length()) {
				if (!idStr.Icmp(kv.GetKey(), "gui_noninteractive")
					|| !idStr.Icmpn(kv.GetKey(), "gui_parm", 8)
					|| !idStr.Icmp(kv.GetKey(), "gui_inventory")) {
					// unfortunate flag names, they aren't actually a gui
				} else {
					declManager.MediaPrint("Precaching gui %s\n", kv.GetValue().c_str());
					var gui = uiManager.Alloc();
					if (gui) {
						gui.InitFromFile(kv.GetValue().data);
						uiManager.DeAlloc(gui);
					}
				}
			}
			kv = dict.MatchPrefix("gui", kv);
		}

		kv = dict.FindKey("texture");
		if (kv && kv.GetValue().Length()) {
			declManager.FindType(declType_t.DECL_MATERIAL, kv.GetValue().data);
		}

		kv = dict.MatchPrefix("mtr", null);
		while (kv) {
			if (kv.GetValue().Length()) {
				declManager.FindType(declType_t.DECL_MATERIAL, kv.GetValue().data);
			}
			kv = dict.MatchPrefix("mtr", kv);
		}

		// handles hud icons
		kv = dict.MatchPrefix("inv_icon", null);
		while (kv) {
			if (kv.GetValue().Length()) {
				declManager.FindType(declType_t.DECL_MATERIAL, kv.GetValue().data);
			}
			kv = dict.MatchPrefix("inv_icon", kv);
		}

		// handles teleport fx.. this is not ideal but the actual decision on which fx to use
		// is handled by script code based on the teleport number
		kv = dict.MatchPrefix("teleport", null);
		if (kv && kv.GetValue().Length()) {
			var teleportType = atoi(kv.GetValue().data);
			var p = (teleportType) ? va("fx/teleporter%i.fx", teleportType) : "fx/teleporter.fx";
			declManager.FindType(declType_t.DECL_FX, p);
		}

		kv = dict.MatchPrefix("fx", null);
		while (kv) {
			if (kv.GetValue().Length()) {
				declManager.MediaPrint("Precaching fx %s\n", kv.GetValue().c_str());
				declManager.FindType(declType_t.DECL_FX, kv.GetValue().data);
			}
			kv = dict.MatchPrefix("fx", kv);
		}

		kv = dict.MatchPrefix("smoke", null);
		while (kv) {
			if (kv.GetValue().Length()) {
				var prtName = kv.GetValue();
				var /*int */dash = prtName.Find('-');
				if (dash > 0) {
					prtName = prtName.Left(dash);
				}
				declManager.FindType(declType_t.DECL_PARTICLE, prtName.data);
			}
			kv = dict.MatchPrefix("smoke", kv);
		}

		kv = dict.MatchPrefix("skin", null);
		while (kv) {
			if (kv.GetValue().Length()) {
				declManager.MediaPrint("Precaching skin %s\n", kv.GetValue().c_str());
				declManager.FindType(declType_t.DECL_SKIN, kv.GetValue().data);
			}
			kv = dict.MatchPrefix("skin", kv);
		}

		kv = dict.MatchPrefix("def", null);
		while (kv) {
			if (kv.GetValue().Length()) {
				this.FindEntityDef(kv.GetValue().c_str(), false);
			}
			kv = dict.MatchPrefix("def", kv);
		}

		kv = dict.MatchPrefix("pda_name", null);
		while (kv) {
			if (kv.GetValue().Length()) {
				declManager.FindType(declType_t.DECL_PDA, kv.GetValue().c_str(), false);
			}
			kv = dict.MatchPrefix("pda_name", kv);
		}

		kv = dict.MatchPrefix("video", null);
		while (kv) {
			if (kv.GetValue().Length()) {
				declManager.FindType(declType_t.DECL_VIDEO, kv.GetValue().c_str(), false);
			}
			kv = dict.MatchPrefix("video", kv);
		}

		kv = dict.MatchPrefix("audio", null);
		while (kv) {
			if (kv.GetValue().Length()) {
				declManager.FindType(declType_t.DECL_AUDIO, kv.GetValue().c_str(), false);
			}
			kv = dict.MatchPrefix("audio", kv);
		}
	}

/*
===========
idGameLocal::InitScriptForMap
============
*/
InitScriptForMap (): void {
		// create a thread to run frame commands on
		this.frameCommandThread = new idThread();
		this.frameCommandThread.ManualDelete();
		this.frameCommandThread.SetThreadName("frameCommands");

		// run the main game script function (not the level specific main)
		var /*function_t */func = this.program.FindFunction(SCRIPT_DEFAULTFUNC);
		if (func != null) {
			var thread = new idThread(func);
			if (thread.Start()) {
				// thread has finished executing, so delete it
				$delete(thread);
			}
		}
	}

/////*
////===========
////idGameLocal::SpawnPlayer
////============
////*/
////SpawnPlayer( int clientNum ):void  {
////	idEntity	*ent;
////	idDict		args;

////	// they can connect
////	this.Printf( "SpawnPlayer: %i\n", clientNum );

////	args.SetInt( "spawn_entnum", clientNum );
////	args.Set( "name", va( "player%d", clientNum + 1 ) );
////	args.Set( "classname", isMultiplayer ? "player_doommarine_mp" : "player_doommarine" );
////	if ( !this.SpawnEntityDef( args, &ent ) || !this.entities[ clientNum ] ) {
////		this.Error( "Failed to spawn player as '%s'", args.GetString( "classname" ) );
////	}

////	// make sure it's a compatible class
////	if ( !ent.IsType( idPlayer::Type ) ) {
////		this.Error( "'%s' spawned the player as a '%s'.  Player spawnclass must be a subclass of idPlayer.", args.GetString( "classname" ), ent.GetClassname() );
////	}

////	if ( clientNum >= this.numClients ) {
////		this.numClients = clientNum + 1;
////	}

////	this.mpGame.SpawnPlayer( clientNum );
////}

/////*
////================
////idGameLocal::GetClientByNum
////================
////*/
////idPlayer *idGameLocal::GetClientByNum( int current ) const {
////	if ( current < 0 || current >= this.numClients ) {
////		current = 0;
////	}
////	if ( this.entities[current] ) {
////		return static_cast<idPlayer *>( this.entities[ current ] );
////	}
////	return NULL;
////}

/////*
////================
////idGameLocal::GetClientByName
////================
////*/
////idPlayer *idGameLocal::GetClientByName( name:string ) const {
////	var/*int */i:number;
////	var ent:idEntity
////	for ( i = 0 ; i < this.numClients ; i++ ) {
////		ent = this.entities[ i ];
////		if ( ent && ent.IsType( idPlayer::Type ) ) {
////			if ( idStr::IcmpNoColor( name, this.userInfo[ i ].GetString( "ui_name" ) ) == 0 ) {
////				return static_cast<idPlayer *>( ent );
////			}
////		}
////	}
////	return NULL;
////}

/////*
////================
////idGameLocal::GetClientByCmdArgs
////================
////*/
////idPlayer *idGameLocal::GetClientByCmdArgs( args:idCmdArgs ) const {
////	idPlayer *player;
////	idStr client = args.Argv( 1 );
////	if ( !client.Length() ) {
////		return NULL;
////	}
////	// we don't allow numeric ui_name so this can't go wrong
////	if ( client.IsNumeric() ) {
////		player = GetClientByNum( atoi( client.c_str() ) );
////	} else {
////		player = GetClientByName( client.c_str() );
////	}
////	if ( !player ) {
////		common.Printf( "Player '%s' not found\n", client.c_str() );
////	}
////	return player;
////}

/////*
////================
////idGameLocal::GetNextClientNum
////================
////*/
////int idGameLocal::GetNextClientNum( int _current ) const {
////	int i, current;

////	current = 0;
////	for ( i = 0; i < this.numClients; i++) {
////		current = ( _current + i + 1 ) % this.numClients;
////		if ( this.entities[ current ] && this.entities[ current ].IsType( idPlayer::Type ) ) {
////			return current;
////		}
////	}

////	return current;
////}

/////*
////================
////idGameLocal::GetLocalPlayer

////Nothing in the game tic should EVER make a decision based on what the
////local client number is, it shouldn't even be aware that there is a
////draw phase even happening.  This just returns client 0, which will
////be correct for single player.
////================
////*/
////idPlayer *idGameLocal::GetLocalPlayer() const {
////	if ( localClientNum < 0 ) {
////		return NULL;
////	}

////	if ( !this.entities[ localClientNum ] || !this.entities[ localClientNum ].IsType( idPlayer::Type ) ) {
////		// not fully in game yet
////		return NULL;
////	}
////	return static_cast<idPlayer *>( this.entities[ localClientNum ] );
////}

/////*
////================
////idGameLocal::SetupClientPVS
////================
////*/
////pvsHandle_t idGameLocal::GetClientPVS( idPlayer *player, pvsType_t type ) {
////	if ( player.GetPrivateCameraView() ) {
////		return this.pvs.SetupCurrentPVS( player.GetPrivateCameraView().GetPVSAreas(), player.GetPrivateCameraView().GetNumPVSAreas() );
////	} else if ( this.camera ) {
////		return this.pvs.SetupCurrentPVS( this.camera.GetPVSAreas(), this.camera.GetNumPVSAreas() );
////	} else {
////		return this.pvs.SetupCurrentPVS( player.GetPVSAreas(), player.GetNumPVSAreas() );
////	}
////}

/////*
////================
////idGameLocal::SetupPlayerPVS
////================
////*/
////SetupPlayerPVS( ) :void {
////	int			i;
////	idEntity *	ent;
////	idPlayer *	player;
////	pvsHandle_t	otherPVS, newPVS;

////	this.playerPVS.i = -1;
////	for ( i = 0; i < this.numClients; i++ ) {
////		ent = this.entities[i];
////		if ( !ent || !ent.IsType( idPlayer::Type ) ) {
////			continue;
////		}

////		player = static_cast<idPlayer *>(ent);

////		if ( this.playerPVS.i == -1 ) {
////			this.playerPVS = GetClientPVS( player, PVS_NORMAL );
////		} else {
////			otherPVS = GetClientPVS( player, PVS_NORMAL );
////			newPVS = this.pvs.MergeCurrentPVS( this.playerPVS, otherPVS );
////			this.pvs.FreeCurrentPVS( this.playerPVS );
////			this.pvs.FreeCurrentPVS( otherPVS );
////			this.playerPVS = newPVS;
////		}

////		if ( this.playerConnectedAreas.i == -1 ) {
////			this.playerConnectedAreas = GetClientPVS( player, PVS_CONNECTED_AREAS );
////		} else {
////			otherPVS = GetClientPVS( player, PVS_CONNECTED_AREAS );
////			newPVS = this.pvs.MergeCurrentPVS( this.playerConnectedAreas, otherPVS );
////			this.pvs.FreeCurrentPVS( this.playerConnectedAreas );
////			this.pvs.FreeCurrentPVS( otherPVS );
////			this.playerConnectedAreas = newPVS;
////		}
////	}
////}

/////*
////================
////idGameLocal::FreePlayerPVS
////================
////*/
////FreePlayerPVS( ):void  {
////	if ( this.playerPVS.i != -1 ) {
////		this.pvs.FreeCurrentPVS( this.playerPVS );
////		this.playerPVS.i = -1;
////	}
////	if ( this.playerConnectedAreas.i != -1 ) {
////		this.pvs.FreeCurrentPVS( this.playerConnectedAreas );
////		this.playerConnectedAreas.i = -1;
////	}
////}

/////*
////================
////idGameLocal::InPlayerPVS

////  should only be called during entity thinking and event handling
////================
////*/
////bool idGameLocal::InPlayerPVS( ent: idEntity ) const {
////	if ( this.playerPVS.i == -1 ) {
////		return false;
////	}
////    return this.pvs.InCurrentPVS( this.playerPVS, ent.GetPVSAreas(), ent.GetNumPVSAreas() );
////}

/////*
////================
////idGameLocal::InPlayerConnectedArea

////  should only be called during entity thinking and event handling
////================
////*/
////bool idGameLocal::InPlayerConnectedArea( ent: idEntity ) const {
////	if ( this.playerConnectedAreas.i == -1 ) {
////		return false;
////	}
////    return this.pvs.InCurrentPVS( this.playerConnectedAreas, ent.GetPVSAreas(), ent.GetNumPVSAreas() );
////}

/////*
////================
////idGameLocal::UpdateGravity
////================
////*/
////UpdateGravity( ):void  {
////	var ent:idEntity

////	if ( g_gravity.IsModified() ) {
////		if ( g_gravity.GetFloat() == 0.0 ) {
////			g_gravity.SetFloat( 1.0f );
////		}
////        this.gravity.Set( 0, 0, -g_gravity.GetFloat() );

////		// update all physics objects
////		for( ent = this.spawnedEntities.Next(); ent != NULL; ent = ent.spawnNode.Next() ) {
////			if ( ent.IsType( idAFEntity_Generic::Type ) ) {
////				idPhysics *phys = ent.GetPhysics();
////				if ( phys ) {
////					phys.SetGravity( this.gravity );
////				}
////			}
////		}
////		g_gravity.ClearModified();
////	}
////}

/////*
////================
////idGameLocal::GetGravity
////================
////*/
////const idVec3 &idGameLocal::GetGravity( ) const {
////	return this.gravity;
////}

/////*
////================
////idGameLocal::SortActiveEntityList

////  Sorts the active entity list such that pushing entities come first,
////  actors come next and physics team slaves appear after their master.
////================
////*/
////SortActiveEntityList( ):void  {
////	ent:idEntity, *next_ent, *master, *part;

////	// if the active entity list needs to be reordered to place physics team masters at the front
////	if ( this.sortTeamMasters ) {
////		for ( ent = this.activeEntities.Next(); ent != NULL; ent = next_ent ) {
////			next_ent = ent.activeNode.Next();
////			master = ent.GetTeamMaster();
////			if ( master && master == ent ) {
////				ent.activeNode.Remove();
////				ent.activeNode.AddToFront( this.activeEntities );
////			}
////		}
////	}

////	// if the active entity list needs to be reordered to place pushers at the front
////	if ( this.sortPushers ) {

////		for ( ent = this.activeEntities.Next(); ent != NULL; ent = next_ent ) {
////			next_ent = ent.activeNode.Next();
////			master = ent.GetTeamMaster();
////			if ( !master || master == ent ) {
////				// check if there is an actor on the team
////				for ( part = ent; part != NULL; part = part.GetNextTeamEntity() ) {
////					if ( part.GetPhysics().IsType( idPhysics_Actor::Type ) ) {
////						break;
////					}
////				}
////				// if there is an actor on the team
////				if ( part ) {
////					ent.activeNode.Remove();
////					ent.activeNode.AddToFront( this.activeEntities );
////				}
////			}
////		}

////		for ( ent = this.activeEntities.Next(); ent != NULL; ent = next_ent ) {
////			next_ent = ent.activeNode.Next();
////			master = ent.GetTeamMaster();
////			if ( !master || master == ent ) {
////				// check if there is an entity on the team using parametric physics
////				for ( part = ent; part != NULL; part = part.GetNextTeamEntity() ) {
////					if ( part.GetPhysics().IsType( idPhysics_Parametric::Type ) ) {
////						break;
////					}
////				}
////				// if there is an entity on the team using parametric physics
////				if ( part ) {
////					ent.activeNode.Remove();
////					ent.activeNode.AddToFront( this.activeEntities );
////				}
////			}
////		}
////	}

////	this.sortTeamMasters = false;
////	this.sortPushers = false;
////}

/////*
////================
////idGameLocal::RunFrame
////================
////*/
////gameReturn_t idGameLocal::RunFrame( const usercmd_t *clientCmds ) {
////	idEntity *	ent;
////	int			num;
////	float		ms;
////	idTimer		timer_think, timer_events, timer_singlethink;
////	gameReturn_t ret;
////	idPlayer	*player;
////	const renderView_t *view;

////#ifdef _DEBUG
////	if ( isMultiplayer ) {
////		assert( !isClient );
////	}
////#endif

////	player = GetLocalPlayer();

////	if ( !isMultiplayer && g_stopTime.GetBool() ) {
////		// clear any debug lines from a previous frame
////		gameRenderWorld.DebugClearLines( this.time + 1 );

////		// set the user commands for this frame
////		memcpy( usercmds, clientCmds, this.numClients * sizeof( usercmds[ 0 ] ) );

////		if ( player ) {
////			player.Think();
////		}
////	} else do {
////		// update the game time
////		this.framenum++;
////		this.previousTime = this.time;
////		this.time += msec;
////		realClientTime = this.time;

////#ifdef GAME_DLL
////		// allow changing SIMD usage on the fly
////		if ( com_forceGenericSIMD.IsModified() ) {
////			idSIMD::InitProcessor( "game", com_forceGenericSIMD.GetBool() );
////		}
////#endif

////		// make sure the random number counter is used each frame so random events
////		// are influenced by the player's actions
////		this.random.RandomInt();

////		if ( player ) {
////			// update the renderview so that any gui videos play from the right frame
////			view = player.GetRenderView();
////			if ( view ) {
////				gameRenderWorld.SetRenderView( view );
////			}
////		}

////		// clear any debug lines from a previous frame
////		gameRenderWorld.DebugClearLines( this.time );

////		// clear any debug polygons from a previous frame
////		gameRenderWorld.DebugClearPolygons( this.time );

////		// set the user commands for this frame
////		memcpy( usercmds, clientCmds, this.numClients * sizeof( usercmds[ 0 ] ) );

////		// free old smoke particles
////		this.smokeParticles.FreeSmokes();

////		// process events on the server
////		ServerProcessEntityNetworkEventQueue();

////		// update our gravity vector if needed.
////		UpdateGravity();

////		// create a merged pvs for all players
////		SetupPlayerPVS();

////		// sort the active entity list
////		SortActiveEntityList();

////		timer_think.Clear();
////		timer_think.Start();

////		// let entities think
////		if ( g_timeentities.GetFloat() ) {
////			num = 0;
////			for( ent = this.activeEntities.Next(); ent != NULL; ent = ent.activeNode.Next() ) {
////				if ( g_cinematic.GetBool() && this.inCinematic && !ent.cinematic ) {
////					ent.GetPhysics().UpdateTime( this.time );
////					continue;
////				}
////				timer_singlethink.Clear();
////				timer_singlethink.Start();
////				ent.Think();
////				timer_singlethink.Stop();
////				ms = timer_singlethink.Milliseconds();
////				if ( ms >= g_timeentities.GetFloat() ) {
////					this.Printf( "%d: entity '%s': %.1f ms\n", this.time, ent.name.c_str(), ms );
////				}
////				num++;
////			}
////		} else {
////			if ( this.inCinematic ) {
////				num = 0;
////				for( ent = this.activeEntities.Next(); ent != NULL; ent = ent.activeNode.Next() ) {
////					if ( g_cinematic.GetBool() && !ent.cinematic ) {
////						ent.GetPhysics().UpdateTime( this.time );
////						continue;
////					}
////					ent.Think();
////					num++;
////				}
////			} else {
////				num = 0;
////				for( ent = this.activeEntities.Next(); ent != NULL; ent = ent.activeNode.Next() ) {
////					ent.Think();
////					num++;
////				}
////			}
////		}

////		// remove any entities that have stopped thinking
////		if ( this.numEntitiesToDeactivate ) {
////			idEntity *next_ent;
////			int c = 0;
////			for( ent = this.activeEntities.Next(); ent != NULL; ent = next_ent ) {
////				next_ent = ent.activeNode.Next();
////				if ( !ent.thinkFlags ) {
////					ent.activeNode.Remove();
////					c++;
////				}
////			}
////			//assert( this.numEntitiesToDeactivate == c );
////			this.numEntitiesToDeactivate = 0;
////		}

////		timer_think.Stop();
////		timer_events.Clear();
////		timer_events.Start();

////		// service any pending events
////		idEvent::ServiceEvents();

////		timer_events.Stop();

////		// free the player pvs
////		FreePlayerPVS();

////		// do multiplayer related stuff
////		if ( isMultiplayer ) {
////			this.mpGame.Run();
////		}

////		// display how long it took to calculate the current game frame
////		if ( g_frametime.GetBool() ) {
////			this.Printf( "game %d: all:%.1f th:%.1f ev:%.1f %d ents \n",
////				this.time, timer_think.Milliseconds() + timer_events.Milliseconds(),
////				timer_think.Milliseconds(), timer_events.Milliseconds(), num );
////		}

////		// build the return value
////		ret.consistencyHash = 0;
////		ret.sessionCommand[0] = 0;

////		if ( !isMultiplayer && player ) {
////			ret.health = player.health;
////			ret.heartRate = player.heartRate;
////			ret.stamina = idMath::FtoiFast( player.stamina );
////			// combat is a 0-100 value based on lastHitTime and lastDmgTime
////			// each make up 50% of the time spread over 10 seconds
////			ret.combat = 0;
////			if ( player.lastDmgTime > 0 && this.time < player.lastDmgTime + 10000 ) {
////				ret.combat += 50.0f * (float) ( this.time - player.lastDmgTime ) / 10000;
////			}
////			if ( player.lastHitTime > 0 && this.time < player.lastHitTime + 10000 ) {
////				ret.combat += 50.0f * (float) ( this.time - player.lastHitTime ) / 10000;
////			}
////		}

////		// see if a target_sessionCommand has forced a changelevel
////		if ( this.sessionCommand.Length() ) {
////			strncpy( ret.sessionCommand, this.sessionCommand, sizeof( ret.sessionCommand ) );
////			break;
////		}

////		// make sure we don't loop forever when skipping a cinematic
////		if ( this.skipCinematic && ( this.time > this.cinematicMaxSkipTime ) ) {
////			this.Warning( "Exceeded maximum cinematic skip length.  Cinematic may be looping infinitely." );
////			this.skipCinematic = false;
////			break;
////		}
////	} while( ( this.inCinematic || ( this.time < this.cinematicStopTime ) ) && this.skipCinematic );

////	ret.syncNextGameFrame = this.skipCinematic;
////	if ( this.skipCinematic ) {
////		soundSystem.SetMute( false );
////		this.skipCinematic = false;		
////	}

////	// show any debug info for this frame
////	RunDebugInfo();
////	D_DrawDebugLines();

////	return ret;
////}


/////*
////======================================================================

////  Game view drawing

////======================================================================
////*/

/////*
////====================
////idGameLocal::CalcFov

////Calculates the horizontal and vertical field of view based on a horizontal field of view and custom aspect ratio
////====================
////*/
////CalcFov( float base_fov, float &fov_x, float &fov_y ) :void  {
////	float	x;
////	float	y;
////	float	ratio_x;
////	float	ratio_y;

////	if ( !sys.FPU_StackIsEmpty() ) {
////		this.Printf( sys.FPU_GetState() );
////		this.Error( "idGameLocal::CalcFov: FPU stack not empty" );
////	}

////	// first, calculate the vertical fov based on a 640x480 view
////	x = 640.0f / tan( base_fov / 360.0f * idMath::PI );
////	y = atan2( 480.0f, x );
////	fov_y = y * 360.0f / idMath::PI;

////	// FIXME: somehow, this is happening occasionally
////	assert( fov_y > 0 );
////	if ( fov_y <= 0 ) {
////		this.Printf( sys.FPU_GetState() );
////		this.Error( "idGameLocal::CalcFov: bad result" );
////	}

////	switch( r_aspectRatio.GetInteger() ) {
////	default :
////	case 0 :
////		// 4:3
////		fov_x = base_fov;
////		return;
////		break;

////	case 1 :
////		// 16:9
////		ratio_x = 16.0f;
////		ratio_y = 9.0f;
////		break;

////	case 2 :
////		// 16:10
////		ratio_x = 16.0f;
////		ratio_y = 10.0f;
////		break;
////	}

////	y = ratio_y / tan( fov_y / 360.0f * idMath::PI );
////	fov_x = atan2( ratio_x, y ) * 360.0f / idMath::PI;

////	if ( fov_x < base_fov ) {
////		fov_x = base_fov;
////		x = ratio_x / tan( fov_x / 360.0f * idMath::PI );
////		fov_y = atan2( ratio_y, x ) * 360.0f / idMath::PI;
////	}

////	// FIXME: somehow, this is happening occasionally
////	assert( ( fov_x > 0 ) && ( fov_y > 0 ) );
////	if ( ( fov_y <= 0 ) || ( fov_x <= 0 ) ) {
////		this.Printf( sys.FPU_GetState() );
////		this.Error( "idGameLocal::CalcFov: bad result" );
////	}
////}

/////*
////================
////idGameLocal::Draw

////makes rendering and sound system calls
////================
////*/
////bool idGameLocal::Draw( int clientNum ) {
////	if ( isMultiplayer ) {
////		return this.mpGame.Draw( clientNum );
////	}

////	idPlayer *player = static_cast<idPlayer *>(this.entities[ clientNum ]);

////	if ( !player ) {
////		return false;
////	}

////	// render the scene
////	player.playerView.RenderPlayerView( player.hud );

////	return true;
////}

/////*
////================
////idGameLocal::HandleESC
////================
////*/
////escReply_t idGameLocal::HandleESC( idUserInterface **gui ) {
////	if ( isMultiplayer ) {
////		*gui = StartMenu();
////		// we may set the gui back to NULL to hide it
////		return ESC_GUI;
////	}
////	idPlayer *player = GetLocalPlayer();
////	if ( player ) {
////		if ( player.HandleESC() ) {
////			return ESC_IGNORE;
////		} else {
////			return ESC_MAIN;
////		}
////	}
////	return ESC_MAIN;
////}

/////*
////================
////idGameLocal::StartMenu
////================
////*/
////idUserInterface* idGameLocal::StartMenu( ) {
////	if ( !isMultiplayer ) {
////		return NULL;
////	}
////	return this.mpGame.StartMenu();
////}

/////*
////================
////idGameLocal::HandleGuiCommands
////================
////*/
////const char* idGameLocal::HandleGuiCommands( const char *menuCommand ) {
////	if ( !isMultiplayer ) {
////		return NULL;
////	}
////	return this.mpGame.HandleGuiCommands( menuCommand );
////}

/////*
////================
////idGameLocal::HandleMainMenuCommands
////================
////*/
////HandleMainMenuCommands( const char *menuCommand, idUserInterface *gui ):void  { }

/////*
////================
////idGameLocal::GetLevelMap

////  should only be used for in-game level editing
////================
////*/
////idMapFile *idGameLocal::GetLevelMap( ) {
////	if ( this.mapFile && this.mapFile.HasPrimitiveData()) {
////		return this.mapFile;
////	}
////	if ( !this.mapFileName.Length() ) {
////		return NULL;
////	}

////	if ( this.mapFile ) {
////		delete this.mapFile;
////	}

////	this.mapFile = new idMapFile;
////	if ( !this.mapFile.Parse( this.mapFileName ) ) {
////		delete this.mapFile;
////		this.mapFile = NULL;
////	}

////	return this.mapFile;
////}

/////*
////================
////idGameLocal::GetMapName
////================
////*/
////const char *idGameLocal::GetMapName( ) const {
////	return this.mapFileName.c_str();
////}

/////*
////================
////idGameLocal::CallFrameCommand
////================
////*/
////CallFrameCommand( ent: idEntity, const function_t *frameCommand ) :void {
////	this.frameCommandThread.CallFunction( ent, frameCommand, true );
////	this.frameCommandThread.Execute();
////}

/////*
////================
////idGameLocal::CallObjectFrameCommand
////================
////*/
////CallObjectFrameCommand( ent: idEntity, const char *frameCommand ) :void {
////	const function_t *func;

////	func = ent.scriptObject.GetFunction( frameCommand );
////	if ( !func ) {
////		if ( !ent.IsType( idTestModel::Type ) ) {
////			this.Error( "Unknown function '%s' called for frame command on entity '%s'", frameCommand, ent.name.c_str() );
////		}
////	} else {
////		this.frameCommandThread.CallFunction( ent, func, true );
////		this.frameCommandThread.Execute();
////	}
////}

/////*
////================
////idGameLocal::ShowTargets
////================
////*/
////ShowTargets( ) :void {
////	idMat3		axis = GetLocalPlayer().viewAngles.ToMat3();
////	idVec3		up = axis[ 2 ] * 5.0f;
////	const idVec3 &viewPos = GetLocalPlayer().GetPhysics().GetOrigin();
////	idBounds	viewTextBounds( viewPos );
////	idBounds	viewBounds( viewPos );
////	idBounds	box( idVec3( -4.0f, -4.0f, -4.0f ), idVec3( 4.0f, 4.0f, 4.0f ) );
////	idEntity	*ent;
////	idEntity	*target;
////	int			i;
////	idBounds	totalBounds;

////	viewTextBounds.ExpandSelf( 128.0f );
////	viewBounds.ExpandSelf( 512.0f );
////	for( ent = this.spawnedEntities.Next(); ent != NULL; ent = ent.spawnNode.Next() ) {
////		totalBounds = ent.GetPhysics().GetAbsBounds();
////		for( i = 0; i < ent.targets.Num(); i++ ) {
////			target = ent.targets[ i ].GetEntity();
////			if ( target ) {
////				totalBounds.AddBounds( target.GetPhysics().GetAbsBounds() );
////			}
////		}

////		if ( !viewBounds.IntersectsBounds( totalBounds ) ) {
////			continue;
////		}

////		float dist;
////		idVec3 dir = totalBounds.GetCenter() - viewPos;
////		dir.NormalizeFast();
////		totalBounds.RayIntersection( viewPos, dir, dist );
////		float frac = ( 512.0f - dist ) / 512.0f;
////		if ( frac < 0.0 ) {
////			continue;
////		}

////		gameRenderWorld.DebugBounds( ( ent.IsHidden() ? colorLtGrey : colorOrange ) * frac, ent.GetPhysics().GetAbsBounds() );
////		if ( viewTextBounds.IntersectsBounds( ent.GetPhysics().GetAbsBounds() ) ) {
////			idVec3 center = ent.GetPhysics().GetAbsBounds().GetCenter();
////			gameRenderWorld.DrawText( ent.name.c_str(), center - up, 0.1f, colorWhite * frac, axis, 1 );
////			gameRenderWorld.DrawText( ent.GetEntityDefName(), center, 0.1f, colorWhite * frac, axis, 1 );
////			gameRenderWorld.DrawText( va( "#%d", ent.entityNumber ), center + up, 0.1f, colorWhite * frac, axis, 1 );
////		}

////		for( i = 0; i < ent.targets.Num(); i++ ) {
////			target = ent.targets[ i ].GetEntity();
////			if ( target ) {
////				gameRenderWorld.DebugArrow( colorYellow * frac, ent.GetPhysics().GetAbsBounds().GetCenter(), target.GetPhysics().GetOrigin(), 10, 0 );
////				gameRenderWorld.DebugBounds( colorGreen * frac, box, target.GetPhysics().GetOrigin() );
////			}
////		}
////	}
////}

/////*
////================
////idGameLocal::RunDebugInfo
////================
////*/
////RunDebugInfo( ) :void {
////	var ent:idEntity
////	idPlayer *player;

////	player = GetLocalPlayer();
////	if ( !player ) {
////		return;
////	}

////	const idVec3 &origin = player.GetPhysics().GetOrigin();

////	if ( g_showEntityInfo.GetBool() ) {
////		idMat3		axis = player.viewAngles.ToMat3();
////		idVec3		up = axis[ 2 ] * 5.0f;
////		idBounds	viewTextBounds( origin );
////		idBounds	viewBounds( origin );

////		viewTextBounds.ExpandSelf( 128.0f );
////		viewBounds.ExpandSelf( 512.0f );
////		for( ent = this.spawnedEntities.Next(); ent != NULL; ent = ent.spawnNode.Next() ) {
////			// don't draw the worldspawn
////			if ( ent == this.world ) {
////				continue;
////			}

////			// skip if the entity is very far away
////			if ( !viewBounds.IntersectsBounds( ent.GetPhysics().GetAbsBounds() ) ) {
////				continue;
////			}

////			const idBounds &entBounds = ent.GetPhysics().GetAbsBounds();
////			int contents = ent.GetPhysics().GetContents();
////			if ( contents & CONTENTS_BODY ) {
////				gameRenderWorld.DebugBounds( colorCyan, entBounds );
////			} else if ( contents & CONTENTS_TRIGGER ) {
////				gameRenderWorld.DebugBounds( colorOrange, entBounds );
////			} else if ( contents & CONTENTS_SOLID ) {
////				gameRenderWorld.DebugBounds( colorGreen, entBounds );
////			} else {
////				if ( !entBounds.GetVolume() ) {
////					gameRenderWorld.DebugBounds( colorMdGrey, entBounds.Expand( 8.0f ) );
////				} else {
////					gameRenderWorld.DebugBounds( colorMdGrey, entBounds );
////				}
////			}
////			if ( viewTextBounds.IntersectsBounds( entBounds ) ) {
////				gameRenderWorld.DrawText( ent.name.c_str(), entBounds.GetCenter(), 0.1f, colorWhite, axis, 1 );
////				gameRenderWorld.DrawText( va( "#%d", ent.entityNumber ), entBounds.GetCenter() + up, 0.1f, colorWhite, axis, 1 );
////			}
////		}
////	}

////	// debug tool to draw bounding boxes around active entities
////	if ( g_showActiveEntities.GetBool() ) {
////		for( ent = this.activeEntities.Next(); ent != NULL; ent = ent.activeNode.Next() ) {
////			idBounds	b = ent.GetPhysics().GetBounds();
////			if ( b.GetVolume() <= 0 ) {
////				b[0][0] = b[0][1] = b[0][2] = -8;
////				b[1][0] = b[1][1] = b[1][2] = 8;
////			}
////			if ( ent.fl.isDormant ) {
////				gameRenderWorld.DebugBounds( colorYellow, b, ent.GetPhysics().GetOrigin() );
////			} else {
////				gameRenderWorld.DebugBounds( colorGreen, b, ent.GetPhysics().GetOrigin() );
////			}
////		}
////	}

////	if ( g_showTargets.GetBool() ) {
////		ShowTargets();
////	}

////	if ( g_showTriggers.GetBool() ) {
////		idTrigger::DrawDebugInfo();
////	}

////	if ( ai_showCombatNodes.GetBool() ) {
////		idCombatNode::DrawDebugInfo();
////	}

////	if ( ai_showPaths.GetBool() ) {
////		idPathCorner::DrawDebugInfo();
////	}

////	if ( g_editEntityMode.GetBool() ) {
////		this.editEntities.DisplayEntities();
////	}

////	if ( g_showCollisionWorld.GetBool() ) {
////		collisionModelManager.DrawModel( 0, vec3_origin, mat3_identity, origin, 128.0f );
////	}

////	if ( g_showCollisionModels.GetBool() ) {
////		this.clip.DrawClipModels( player.GetEyePosition(), g_maxShowDistance.GetFloat(), pm_thirdPerson.GetBool() ? NULL : player );
////	}

////	if ( g_showCollisionTraces.GetBool() ) {
////		this.clip.PrintStatistics();
////	}

////	if ( g_showPVS.GetInteger() ) {
////		this.pvs.DrawPVS( origin, ( g_showPVS.GetInteger() == 2 ) ? PVS_ALL_PORTALS_OPEN : PVS_NORMAL );
////	}

////	if ( aas_test.GetInteger() >= 0 ) {
////		idAAS *aas = GetAAS( aas_test.GetInteger() );
////		if ( aas ) {
////			aas.Test( origin );
////			if ( ai_testPredictPath.GetBool() ) {
////				idVec3 velocity;
////				predictedPath_t path;

////				velocity.x = cos( DEG2RAD( player.viewAngles.yaw ) ) * 100.0f;
////				velocity.y = sin( DEG2RAD( player.viewAngles.yaw ) ) * 100.0f;
////				velocity.z = 0.0;
////				idAI::PredictPath( player, aas, origin, velocity, 1000, 100, SE_ENTER_OBSTACLE | SE_BLOCKED | SE_ENTER_LEDGE_AREA, path );
////			}
////		}
////	}

////	if ( ai_showObstacleAvoidance.GetInteger() == 2 ) {
////		idAAS *aas = GetAAS( 0 );
////		if ( aas ) {
////			idVec3 seekPos;
////			obstaclePath_t path;

////			seekPos = player.GetPhysics().GetOrigin() + player.viewAxis[0] * 200.0f;
////			idAI::FindPathAroundObstacles( player.GetPhysics(), aas, NULL, player.GetPhysics().GetOrigin(), seekPos, path );
////		}
////	}

////	// collision map debug output
////	collisionModelManager.DebugOutput( player.GetEyePosition() );
////}

/////*
////==================
////idGameLocal::NumAAS
////==================
////*/
////int	idGameLocal::NumAAS( ) const {
////	return this.aasList.Num();
////}

/////*
////==================
////idGameLocal::GetAAS
////==================
////*/
////idAAS *idGameLocal::GetAAS( int num ) const {
////	if ( ( num >= 0 ) && ( num < this.aasList.Num() ) ) {
////		if ( this.aasList[ num ] && this.aasList[ num ].GetSettings() ) {
////			return this.aasList[ num ];
////		}
////	}
////	return NULL;
////}

/////*
////==================
////idGameLocal::GetAAS
////==================
////*/
////idAAS *idGameLocal::GetAAS( name:string ) const {
////	var/*int */i:number;

////	for ( i = 0; i < this.aasNames.Num(); i++ ) {
////		if ( this.aasNames[ i ] == name ) {
////			if ( !this.aasList[ i ].GetSettings() ) {
////				return NULL;
////			} else {
////				return this.aasList[ i ];
////			}
////		}
////	}
////	return NULL;
////}

/////*
////==================
////idGameLocal::SetAASAreaState
////==================
////*/
////SetAASAreaState( const idBounds &bounds, const int areaContents, bool closed ):void  {
////	var/*int */i:number;

////	for( i = 0; i < this.aasList.Num(); i++ ) {
////		this.aasList[ i ].SetAreaState( bounds, areaContents, closed );
////	}
////}

/////*
////==================
////idGameLocal::AddAASObstacle
////==================
////*/
////aasHandle_t idGameLocal::AddAASObstacle( const idBounds &bounds ) {
////	var/*int */i:number;
////	aasHandle_t obstacle;
////	aasHandle_t check;

////	if ( !this.aasList.Num() ) {
////		return -1;
////	}

////	obstacle = this.aasList[ 0 ].AddObstacle( bounds );
////	for( i = 1; i < this.aasList.Num(); i++ ) {
////		check = this.aasList[ i ].AddObstacle( bounds );
////		assert( check == obstacle );
////	}

////	return obstacle;
////}

/////*
////==================
////idGameLocal::RemoveAASObstacle
////==================
////*/
////RemoveAASObstacle( const aasHandle_t handle ) :void {
////	var/*int */i:number;

////	for( i = 0; i < this.aasList.Num(); i++ ) {
////		this.aasList[ i ].RemoveObstacle( handle );
////	}
////}

/////*
////==================
////idGameLocal::RemoveAllAASObstacles
////==================
////*/
////RemoveAllAASObstacles( ) :void {
////	var/*int */i:number;

////	for( i = 0; i < this.aasList.Num(); i++ ) {
////		this.aasList[ i ].RemoveAllObstacles();
////	}
////}

/////*
////==================
////idGameLocal::CheatsOk
////==================
////*/
////bool idGameLocal::CheatsOk( bool requirePlayer ) {
////	idPlayer *player;

////	if ( isMultiplayer && !cvarSystem.GetCVarBool( "net_allowCheats" ) ) {
////		this.Printf( "Not allowed in multiplayer.\n" );
////		return false;
////	}

////	if ( developer.GetBool() ) {
////		return true;
////	}

////	player = GetLocalPlayer();
////	if ( !requirePlayer || ( player && ( player.health > 0 ) ) ) {
////		return true;
////	}

////	this.Printf( "You must be alive to use this command.\n" );

////	return false;
////}

/////*
////===================
////idGameLocal::RegisterEntity
////===================
////*/
////RegisterEntity( ent: idEntity ):void  {
////	int spawn_entnum;

////	if ( this.spawnCount >= ( 1 << ( 32 - GENTITYNUM_BITS ) ) ) {
////		this.Error( "idGameLocal::RegisterEntity: spawn count overflow" );
////	}

////	if ( !this.spawnArgs.GetInt( "spawn_entnum", "0", spawn_entnum ) ) {
////		while( this.entities[this.firstFreeIndex] && this.firstFreeIndex < ENTITYNUM_MAX_NORMAL ) {
////			this.firstFreeIndex++;
////		}
////		if ( this.firstFreeIndex >= ENTITYNUM_MAX_NORMAL ) {
////			this.Error( "no free entities" );
////		}
////		spawn_entnum = this.firstFreeIndex++;
////	}

////	this.entities[ spawn_entnum ] = ent;
////	this.spawnIds[ spawn_entnum ] = this.spawnCount++;
////	ent.entityNumber = spawn_entnum;
////	ent.spawnNode.AddToEnd( this.spawnedEntities );
////	ent.spawnArgs.TransferKeyValues( this.spawnArgs );

////	if ( spawn_entnum >= this.num_entities ) {
////		this.num_entities++;
////	}
////}

/////*
////===================
////idGameLocal::UnregisterEntity
////===================
////*/
////UnregisterEntity( ent: idEntity ):void  {
////	assert( ent );

////	if ( this.editEntities ) {
////		this.editEntities.RemoveSelectedEntity( ent );
////	}

////	if ( ( ent.entityNumber != ENTITYNUM_NONE ) && ( this.entities[ ent.entityNumber ] == ent ) ) {
////		ent.spawnNode.Remove();
////		this.entities[ ent.entityNumber ] = NULL;
////		this.spawnIds[ ent.entityNumber ] = -1;
////		if ( ent.entityNumber >= MAX_CLIENTS && ent.entityNumber < this.firstFreeIndex ) {
////			this.firstFreeIndex = ent.entityNumber;
////		}
////		ent.entityNumber = ENTITYNUM_NONE;
////	}
////}

/////*
////================
////idGameLocal::SpawnEntityType
////================
////*/
////idEntity *idGameLocal::SpawnEntityType( const idTypeInfo &classdef, const idDict *args, bool bIsClientReadSnapshot ) {
////	idClass *obj;

////#if _DEBUG
////	if ( isClient ) {
////		assert( bIsClientReadSnapshot );
////	}
////#endif

////	if ( !classdef.IsType( idEntity::Type ) ) {
////		this.Error( "Attempted to spawn non-entity class '%s'", classdef.classname );
////	}

////	try {
////		if ( args ) {
////			this.spawnArgs = *args;
////		} else {
////			this.spawnArgs.Clear();
////		}
////		obj = classdef.CreateInstance();
////		obj.CallSpawn();
////	}

////	catch( idAllocError & ) {
////		obj = NULL;
////	}
////	this.spawnArgs.Clear();

////	return static_cast<idEntity *>(obj);
////}

/*
===================
idGameLocal::SpawnEntityDef

Finds the spawn function for the entity and calls it,
returning false if not found
===================
*/
	SpawnEntityDef ( args: idDict, ent: R<idEntity> = new R<idEntity> ( ), setDefaults: boolean = true ): boolean {
		var classname = new R<string> ( );
		var spawn = new R<string> ( );
		var cls: idTypeInfo;
		var obj: idClass;
		var error = new idStr;
		var name = new R<string> ( );

		if ( ent ) {
			ent.$ = null;
		}

		this.spawnArgs = args;

		if ( this.spawnArgs.GetString_Rstring( "name", "", name ) ) {
			error.equals( sprintf( " on '%s'", name.$ ) );
		}

		this.spawnArgs.GetString_Rstring( "classname", null, classname );

		var def = this.FindEntityDef( classname.$, false );

		if ( !def ) {
			this.Warning( "Unknown classname '%s'%s.", classname.$, error.c_str ( ) );
			return false;
		}

		this.spawnArgs.SetDefaults( def.dict );

		// check if we should spawn a class object
		this.spawnArgs.GetString_Rstring( "spawnclass", null, spawn );
		if ( spawn.$ ) {

			cls = idClass.GetClass( spawn.$ );
			if ( !cls ) {
				this.Warning( "Could not spawn '%s'.  Class '%s' not found%s.", classname.$, spawn.$, error.c_str ( ) );
				return false;
			}

			obj = cls.CreateInstance ( );
			if ( !obj ) {
				this.Warning( "Could not spawn '%s'. Instance could not be created%s.", classname.$, error.c_str ( ) );
				return false;
			}

			obj.CallSpawn ( );

			if ( ent && obj.IsType( idEntity.Type ) ) {
				ent.$ = static_cast<idEntity>( obj );
			}

			return true;
		}

		// check if we should call a script function to spawn
		this.spawnArgs.GetString_Rstring( "spawnfunc", null, spawn );
		if ( spawn.$ ) {
			var func: function_t = this.program.FindFunction( spawn.$ );
			if ( !func ) {
				this.Warning( "Could not spawn '%s'.  Script function '%s' not found%s.", classname.$, spawn.$, error.c_str ( ) );
				return false;
			}
			var thread = new idThread( func );
			thread.DelayedStart( 0 );
			return true;
		}

		this.Warning( "%s doesn't include a spawnfunc or spawnclass%s.", classname.$, error.c_str ( ) );
		return false;
	}

/*
================
idGameLocal::FindEntityDef
================
*/
FindEntityDef (name: string, makeDefault = true): idDeclEntityDef {
		var decl: idDecl = null;
		if (this.isMultiplayer) {
			decl = declManager.FindType(declType_t.DECL_ENTITYDEF, va("%s_mp", name), false);
		}
		if (!decl) {
			decl = declManager.FindType(declType_t.DECL_ENTITYDEF, name, makeDefault);
		}
		//return static_cast < constidDeclEntityDef *  > ( decl );
		return <idDeclEntityDef>decl;
	}

/*
================
idGameLocal::FindEntityDefDict
================
*/
FindEntityDefDict (name: string, makeDefault = true): idDict {
		var decl = this.FindEntityDef(name, makeDefault);
		return decl ? decl.dict : null;
	}

/*
================
idGameLocal::InhibitEntitySpawn
================
*/
InhibitEntitySpawn (spawnArgs: idDict): boolean {

		var result = new R<boolean>(false);

		if (this.isMultiplayer) {
			spawnArgs.GetBool_R("not_multiplayer", "0", result);
		} else if (g_skill.GetInteger() == 0) {
			spawnArgs.GetBool_R("not_easy", "0", result);
		} else if (g_skill.GetInteger() == 1) {
			spawnArgs.GetBool_R("not_medium", "0", result);
		} else {
			spawnArgs.GetBool_R("not_hard", "0", result);
		}

		var name: string;
		//#ifndef ID_DEMO_BUILD
		//	if ( g_skill.GetInteger() == 3 ) { 
		//		name = spawnArgs.GetString( "classname" );
		//		if ( idStr.Icmp( name, "item_medkit" ) == 0 || idStr.Icmp( name, "item_medkit_small" ) == 0 ) {
		//			result = true;
		//		}
		//	}
		//#endif

		if (gameLocal.isMultiplayer) {
			name = spawnArgs.GetString("classname");
			if (idStr.Icmp(name, "weapon_bfg") == 0 || idStr.Icmp(name, "weapon_soulcube") == 0) {
				result.$ = true;
			}
		}

		return result.$;
	}

/*
================
idGameLocal::SetSkill
================
*/
SetSkill ( /*int*/ value: number): void {
		var /*int */skill_level: number;

		if (value < 0) {
			skill_level = 0;
		} else if (value > 3) {
			skill_level = 3;
		} else {
			skill_level = value;
		}

		g_skill.SetInteger(skill_level);
	}

/*
==============
idGameLocal::GameState

Used to allow entities to know if they're being spawned during the initial spawn.
==============
*/
GameState (): gameState_t {
		return this.gamestate;
	}

/*
==============
idGameLocal::SpawnMapEntities

Parses textual entity definitions out of an entstring and spawns gentities.
==============
*/
SpawnMapEntities (): void {
		var i: number /*int*/;
		var num: number /*int*/;
		var inhibit: number /*int*/;
		var mapEnt: idMapEntity;
		var numEntities: number /*int*/;
		var args = new idDict;

		this.Printf("Spawning entities\n");

		if (this.mapFile == null) {
			this.Printf("No mapfile present\n");
			return;
		}

		this.SetSkill(g_skill.GetInteger());

		numEntities = this.mapFile.GetNumEntities();
		if (numEntities == 0) {
			this.Error("...no entities");
		}

		// the worldspawn is a special that performs any global setup
		// needed by a level
		mapEnt = this.mapFile.GetEntity(0);
		args = mapEnt.epairs;
		args.SetInt("spawn_entnum", ENTITYNUM_WORLD);
		if (!this.SpawnEntityDef(args) || !this.entities[ENTITYNUM_WORLD] || !this.entities[ENTITYNUM_WORLD].IsType(idWorldspawn.Type)) {
			this.Error("Problem spawning world entity");
		}

		num = 1;
		inhibit = 0;

		for (i = 1; i < numEntities; i++) {
			mapEnt = this.mapFile.GetEntity(i);
			args = mapEnt.epairs;

			if (!this.InhibitEntitySpawn(args)) {
				// precache any media specified in the map entity
				this.CacheDictionaryMedia(args);

				this.SpawnEntityDef(args);
				num++;
			} else {
				inhibit++;
			}
		}

		this.Printf("...%i entities spawned, %i inhibited\n\n", num, inhibit);
	}

/*
================
idGameLocal::AddEntityToHash
================
*/
AddEntityToHash (name: string, ent: idEntity) {
		if (this.FindEntity(name)) {
			this.Error("Multiple entities named '%s'", name);
		}
		this.entityHash.Add(this.entityHash.GenerateKey(name, true), ent.entityNumber);
	}

/*
================
idGameLocal::RemoveEntityFromHash
================
*/
RemoveEntityFromHash (name: string, ent: idEntity): boolean {
		var /*int */hash: number, i: number;

		hash = this.entityHash.GenerateKey(name, true);
		for (i = this.entityHash.First(hash); i != -1; i = this.entityHash.Next(i)) {
			if (this.entities[i] && this.entities[i] == ent && this.entities[i].name.Icmp(name) == 0) {
				this.entityHash.Remove(hash, i);
				return true;
			}
		}
		return false;
	}

/////*
////================
////idGameLocal::GetTargets
////================
////*/
////int idGameLocal::GetTargets( const idDict &args, idList< idEntityPtr<idEntity> > &list, const char *ref ) const {
////	int i, num, refLength;
////	const idKeyValue *arg;
////	var ent:idEntity

////	list.Clear();

////	refLength = strlen( ref );
////	num = args.GetNumKeyVals();
////	for( i = 0; i < num; i++ ) {

////		arg = args.GetKeyVal( i );
////		if ( arg.GetKey().Icmpn( ref, refLength ) == 0 ) {

////			ent = FindEntity( arg.GetValue() );
////			if ( ent ) {
////				idEntityPtr<idEntity> &entityPtr = list.Alloc();
////                entityPtr = ent;
////			}
////		}
////	}

////	return list.Num();
////}

/////*
////=============
////idGameLocal::GetTraceEntity

////returns the master entity of a trace.  for example, if the trace entity is the player's head, it will return the player.
////=============
////*/
////idEntity *idGameLocal::GetTraceEntity( const trace_t &trace ) const {
////	idEntity *master;

////	if ( !this.entities[ trace.c.entityNum ] ) {
////		return NULL;
////	}
////	master = this.entities[ trace.c.entityNum ].GetBindMaster();
////	if ( master ) {
////		return master;
////	}
////	return this.entities[ trace.c.entityNum ];
////}

/////*
////=============
////idGameLocal::ArgCompletion_EntityName

////Argument completion for entity names
////=============
////*/
////ArgCompletion_EntityName( const idCmdArgs &args, void(*callback)( const char *s ) ) {
////	var/*int */i:number;

////	for( i = 0; i < gameLocal.num_entities; i++ ) {
////		if ( gameLocal.entities[ i ] ) {
////			callback( va( "%s %s", args.Argv( 0 ), gameLocal.entities[ i ].name.c_str() ) );
////		}
////	}
////}

/*
=============
idGameLocal::FindEntity

Returns the entity whose name matches the specified string.
=============
*/
	FindEntity ( name: string ): idEntity {
		var /*int */hash: number, i: number;

		hash = this.entityHash.GenerateKey( name, true );
		for ( i = this.entityHash.First( hash ); i != -1; i = this.entityHash.Next( i ) ) {
			if ( this.entities[i] && this.entities[i].name.Icmp( name ) == 0 ) {
				return this.entities[i];
			}
		}

		return null;
	}

/////*
////=============
////idGameLocal::FindEntityUsingDef

////Searches all active entities for the next one using the specified entityDef.

////Searches beginning at the entity after from, or the beginning if NULL
////NULL will be returned if the end of the list is reached.
////=============
////*/
////idEntity *idGameLocal::FindEntityUsingDef( idEntity *from, const char *match ) const {
////	idEntity	*ent;

////	if ( !from ) {
////		ent = this.spawnedEntities.Next();
////	} else {
////		ent = from.spawnNode.Next();
////	}

////	for ( ; ent != NULL; ent = ent.spawnNode.Next() ) {
////		assert( ent );
////		if ( idStr.Icmp( ent.GetEntityDefName(), match ) == 0 ) {
////			return ent;
////		}
////	}

////	return NULL;
////}

/////*
////=============
////idGameLocal::FindTraceEntity

////Searches all active entities for the closest ( to start ) match that intersects
////the line start,end
////=============
////*/
////idEntity *idGameLocal::FindTraceEntity( idVec3 start, idVec3 end, const idTypeInfo &c, const idEntity *skip ) const {
////	var ent:idEntity
////	idEntity *bestEnt;
////	float scale;
////	float bestScale;
////	idBounds b;

////	bestEnt = NULL;
////	bestScale = 1.0f;
////	for( ent = this.spawnedEntities.Next(); ent != NULL; ent = ent.spawnNode.Next() ) {
////		if ( ent.IsType( c ) && ent != skip ) {
////			b = ent.GetPhysics().GetAbsBounds().Expand( 16 );
////			if ( b.RayIntersection( start, end-start, scale ) ) {
////				if ( scale >= 0.0 && scale < bestScale ) {
////					bestEnt = ent;
////					bestScale = scale;
////				}
////			}
////		}
////	}

////	return bestEnt;
////}

/////*
////================
////idGameLocal::EntitiesWithinRadius
////================
////*/
////int idGameLocal::EntitiesWithinRadius( const idVec3 org, float radius, idEntity **entityList, int maxCount ) const {
////	var ent:idEntity
////	idBounds bo( org );
////	int entCount = 0;

////	bo.ExpandSelf( radius );
////	for( ent = this.spawnedEntities.Next(); ent != NULL; ent = ent.spawnNode.Next() ) {
////		if ( ent.GetPhysics().GetAbsBounds().IntersectsBounds( bo ) ) {
////			entityList[entCount++] = ent;
////		}
////	}

////	return entCount;
////}

/////*
////=================
////idGameLocal::KillBox

////Kills all entities that would touch the proposed new positioning of ent. The ent itself will not being killed.
////Checks if player entities are in the teleporter, and marks them to die at teleport exit instead of immediately.
////If catch_teleport, this only marks teleport players for death on exit
////=================
////*/
////KillBox( ent: idEntity, bool catch_teleport ) :void {
////	int			i;
////	int			num;
////	idEntity *	hit;
////	idClipModel *cm;
////	idClipModel *clipModels[ MAX_GENTITIES ];
////	idPhysics	*phys;

////	phys = ent.GetPhysics();
////	if ( !phys.GetNumClipModels() ) {
////		return;
////	}

////	num = this.clip.ClipModelsTouchingBounds( phys.GetAbsBounds(), phys.GetClipMask(), clipModels, MAX_GENTITIES );
////	for ( i = 0; i < num; i++ ) {
////		cm = clipModels[ i ];

////		// don't check render entities
////		if ( cm.IsRenderModel() ) {
////			continue;
////		}

////		hit = cm.GetEntity();
////		if ( ( hit == ent ) || !hit.fl.takedamage ) {
////			continue;
////		}

////		if ( !phys.ClipContents( cm ) ) {
////			continue;
////		}

////		// nail it
////		if ( hit.IsType( idPlayer::Type ) && static_cast< idPlayer * >( hit ).IsInTeleport() ) {
////			static_cast< idPlayer * >( hit ).TeleportDeath( ent.entityNumber );
////		} else if ( !catch_teleport ) {
////			hit.Damage( ent, ent, vec3_origin, "damage_telefrag", 1.0f, INVALID_JOINT );
////		}

////		if ( !gameLocal.isMultiplayer ) {
////			// let the mapper know about it
////			this.Warning( "'%s' telefragged '%s'", ent.name.c_str(), hit.name.c_str() );
////		}
////	}
////}

/////*
////================
////idGameLocal::RequirementMet
////================
////*/
////bool idGameLocal::RequirementMet( activator:idEntity, const idStr &requires, int removeItem ) {
////	if ( requires.Length() ) {
////		if ( activator.IsType( idPlayer::Type ) ) {
////			idPlayer *player = static_cast<idPlayer *>(activator);
////			idDict *item = player.FindInventoryItem( requires );
////			if ( item ) {
////				if ( removeItem ) {
////					player.RemoveInventoryItem( item );
////				}
////				return true;
////			} else {
////				return false;
////			}
////		}
////	}

////	return true;
////}

/////*
////============
////idGameLocal::AlertAI
////============
////*/
////AlertAI( ent: idEntity ) {
////	if ( ent && ent.IsType( idActor::Type ) ) {
////		// alert them for the next frame
////		this.lastAIAlertTime = this.time + msec;
////		this.lastAIAlertEntity = static_cast<idActor *>( ent );
////	}
////}

/////*
////============
////idGameLocal::GetAlertEntity
////============
////*/
////idActor *idGameLocal::GetAlertEntity( ) {
////	if ( this.lastAIAlertTime >= this.time ) {
////		return this.lastAIAlertEntity.GetEntity();
////	}

////	return NULL;
////}

/////*
////============
////idGameLocal::RadiusDamage
////============
////*/
////RadiusDamage( const idVec3 &origin, idEntity *inflictor, idEntity *attacker, idEntity *ignoreDamage, idEntity *ignorePush, const char *damageDefName, float dmgPower ):void  {
////	float		dist, damageScale, attackerDamageScale, attackerPushScale;
////	idEntity *	ent;
////	idEntity *	entityList[ MAX_GENTITIES ];
////	int			numListedEntities;
////	idBounds	bounds;
////	idVec3 		v, damagePoint, dir;
////	int			i, e, damage, radius, push;

////	const idDict *damageDef = FindEntityDefDict( damageDefName, false );
////	if ( !damageDef ) {
////		this.Warning( "Unknown damageDef '%s'", damageDefName );
////		return;
////	}

////	damageDef.GetInt( "damage", "20", damage );
////	damageDef.GetInt( "radius", "50", radius );
////	damageDef.GetInt( "push", va( "%d", damage * 100 ), push );
////	damageDef.GetFloat( "attackerDamageScale", "0.5", attackerDamageScale );
////	damageDef.GetFloat( "attackerPushScale", "0", attackerPushScale );

////	if ( radius < 1 ) {
////		radius = 1;
////	}

////	bounds = idBounds( origin ).Expand( radius );

////	// get all entities touching the bounds
////	numListedEntities = this.clip.EntitiesTouchingBounds( bounds, -1, entityList, MAX_GENTITIES );

////	if ( inflictor && inflictor.IsType( idAFAttachment::Type ) ) {
////		inflictor = static_cast<idAFAttachment*>(inflictor).GetBody();
////	}
////	if ( attacker && attacker.IsType( idAFAttachment::Type ) ) {
////		attacker = static_cast<idAFAttachment*>(attacker).GetBody();
////	}
////	if ( ignoreDamage && ignoreDamage.IsType( idAFAttachment::Type ) ) {
////		ignoreDamage = static_cast<idAFAttachment*>(ignoreDamage).GetBody();
////	}

////	// apply damage to the entities
////	for ( e = 0; e < numListedEntities; e++ ) {
////		ent = entityList[ e ];
////		assert( ent );

////		if ( !ent.fl.takedamage ) {
////			continue;
////		}

////		if ( ent == inflictor || ( ent.IsType( idAFAttachment::Type ) && static_cast<idAFAttachment*>(ent).GetBody() == inflictor ) ) {
////			continue;
////		}

////		if ( ent == ignoreDamage || ( ent.IsType( idAFAttachment::Type ) && static_cast<idAFAttachment*>(ent).GetBody() == ignoreDamage ) ) {
////			continue;
////		}

////		// don't damage a dead player
////		if ( isMultiplayer && ent.entityNumber < MAX_CLIENTS && ent.IsType( idPlayer::Type ) && static_cast< idPlayer * >( ent ).health < 0 ) {
////			continue;
////		}

////		// find the distance from the edge of the bounding box
////		for ( i = 0; i < 3; i++ ) {
////			if ( origin[ i ] < ent.GetPhysics().GetAbsBounds()[0][ i ] ) {
////				v[ i ] = ent.GetPhysics().GetAbsBounds()[0][ i ] - origin[ i ];
////			} else if ( origin[ i ] > ent.GetPhysics().GetAbsBounds()[1][ i ] ) {
////				v[ i ] = origin[ i ] - ent.GetPhysics().GetAbsBounds()[1][ i ];
////			} else {
////				v[ i ] = 0;
////			}
////		}

////		dist = v.Length();
////		if ( dist >= radius ) {
////			continue;
////		}

////		if ( ent.CanDamage( origin, damagePoint ) ) {
////			// push the center of mass higher than the origin so players
////			// get knocked into the air more
////			dir = ent.GetPhysics().GetOrigin() - origin;
////			dir[ 2 ] += 24;

////			// get the damage scale
////			damageScale = dmgPower * ( 1.0f - dist / radius );
////			if ( ent == attacker || ( ent.IsType( idAFAttachment::Type ) && static_cast<idAFAttachment*>(ent).GetBody() == attacker ) ) {
////				damageScale *= attackerDamageScale;
////			}

////			ent.Damage( inflictor, attacker, dir, damageDefName, damageScale, INVALID_JOINT );
////		} 
////	}

////	// push physics objects
////	if ( push ) {
////		RadiusPush( origin, radius, push * dmgPower, attacker, ignorePush, attackerPushScale, false );
////	}
////}

/////*
////==============
////idGameLocal::RadiusPush
////==============
////*/
////RadiusPush( const idVec3 &origin, const float radius, const float push, const idEntity *inflictor, const idEntity *ignore, float inflictorScale, const bool quake ):void  {
////	int i, numListedClipModels;
////	idClipModel *clipModel;
////	idClipModel *clipModelList[ MAX_GENTITIES ];
////	idVec3 dir;
////	idBounds bounds;
////	modelTrace_t result;
////	var ent:idEntity
////	float scale;

////	dir.Set( 0.0, 0.0, 1.0f );

////	bounds = idBounds( origin ).Expand( radius );

////	// get all clip models touching the bounds
////	numListedClipModels = this.clip.ClipModelsTouchingBounds( bounds, -1, clipModelList, MAX_GENTITIES );

////	if ( inflictor && inflictor.IsType( idAFAttachment::Type ) ) {
////		inflictor = static_cast<const idAFAttachment*>(inflictor).GetBody();
////	}
////	if ( ignore && ignore.IsType( idAFAttachment::Type ) ) {
////		ignore = static_cast<const idAFAttachment*>(ignore).GetBody();
////	}

////	// apply impact to all the clip models through their associated physics objects
////	for ( i = 0; i < numListedClipModels; i++ ) {

////		clipModel = clipModelList[i];

////		// never push render models
////		if ( clipModel.IsRenderModel() ) {
////			continue;
////		}

////		ent = clipModel.GetEntity();

////		// never push projectiles
////		if ( ent.IsType( idProjectile::Type ) ) {
////			continue;
////		}

////		// players use "knockback" in idPlayer::Damage
////		if ( ent.IsType( idPlayer::Type ) && !quake ) {
////			continue;
////		}

////		// don't push the ignore entity
////		if ( ent == ignore || ( ent.IsType( idAFAttachment::Type ) && static_cast<idAFAttachment*>(ent).GetBody() == ignore ) ) {
////			continue;
////		}

////		if ( gameRenderWorld.FastWorldTrace( result, origin, clipModel.GetOrigin() ) ) {
////			continue;
////		}

////		// scale the push for the inflictor
////		if ( ent == inflictor || ( ent.IsType( idAFAttachment::Type ) && static_cast<idAFAttachment*>(ent).GetBody() == inflictor ) ) {
////			scale = inflictorScale;
////		} else {
////			scale = 1.0f;
////		}

////		if ( quake ) {
////			clipModel.GetEntity().ApplyImpulse( this.world, clipModel.GetId(), clipModel.GetOrigin(), scale * push * dir );
////		} else {
////			RadiusPushClipModel( origin, scale * push, clipModel );
////		}
////	}
////}

/////*
////==============
////idGameLocal::RadiusPushClipModel
////==============
////*/
////RadiusPushClipModel( const idVec3 &origin, const float push, const idClipModel *clipModel ):void  {
////	int i, j;
////	float dot, dist, area;
////	const idTraceModel *trm;
////	const traceModelPoly_t *poly;
////	idFixedWinding w;
////	idVec3 v, localOrigin, center, impulse;

////	trm = clipModel.GetTraceModel();
////	if ( !trm || true ) {
////		impulse = clipModel.GetAbsBounds().GetCenter() - origin;
////		impulse.Normalize();
////		impulse.z += 1.0f;
////		clipModel.GetEntity().ApplyImpulse( this.world, clipModel.GetId(), clipModel.GetOrigin(), push * impulse );
////		return;
////	}

////	localOrigin = ( origin - clipModel.GetOrigin() ) * clipModel.GetAxis().Transpose();
////	for ( i = 0; i < trm.numPolys; i++ ) {
////		poly = &trm.polys[i];

////		center.Zero();
////		for ( j = 0; j < poly.numEdges; j++ ) {
////			v = trm.verts[ trm.edges[ abs(poly.edges[j]) ].v[ INTSIGNBITSET( poly.edges[j] ) ] ];
////			center += v;
////			v -= localOrigin;
////			v.NormalizeFast();	// project point on a unit sphere
////			w.AddPoint( v );
////		}
////		center /= poly.numEdges;
////		v = center - localOrigin;
////		dist = v.NormalizeFast();
////		dot = v * poly.normal;
////		if ( dot > 0.0 ) {
////			continue;
////		}
////		area = w.GetArea();
////		// impulse in polygon normal direction
////		impulse = poly.normal * clipModel.GetAxis();
////		// always push up for nicer effect
////		impulse.z -= 1.0f;
////		// scale impulse based on visible surface area and polygon angle
////		impulse *= push * ( dot * area * ( 1.0f / ( 4.0f * idMath::PI ) ) );
////		// scale away distance for nicer effect
////		impulse *= ( dist * 2.0f );
////		// impulse is applied to the center of the polygon
////		center = clipModel.GetOrigin() + center * clipModel.GetAxis();

////		clipModel.GetEntity().ApplyImpulse( this.world, clipModel.GetId(), center, impulse );
////	}
////}

/////*
////===============
////idGameLocal::ProjectDecal
////===============
////*/
////ProjectDecal( const idVec3 &origin, const idVec3 &dir, float depth, bool parallel, float size, const char *material, /*float*/angle:number ):void  {
////	float s, c;
////	idMat3 axis, axistemp;
////	idFixedWinding winding;
////	idVec3 windingOrigin, projectionOrigin;

////	static idVec3 decalWinding[4] = {
////		idVec3(  1.0f,  1.0f, 0.0 ),
////		idVec3( -1.0f,  1.0f, 0.0 ),
////		idVec3( -1.0f, -1.0f, 0.0 ),
////		idVec3(  1.0f, -1.0f, 0.0 )
////	};

////	if ( !g_decals.GetBool() ) {
////		return;
////	}

////	// randomly rotate the decal winding
////	idMath::SinCos16( ( angle ) ? angle : this.random.RandomFloat() * idMath::TWO_PI, s, c );

////	// winding orientation
////	axis[2] = dir;
////	axis[2].Normalize();
////	axis[2].NormalVectors( axistemp[0], axistemp[1] );
////	axis[0] = axistemp[ 0 ] * c + axistemp[ 1 ] * -s;
////	axis[1] = axistemp[ 0 ] * -s + axistemp[ 1 ] * -c;

////	windingOrigin = origin + depth * axis[2];
////	if ( parallel ) {
////		projectionOrigin = origin - depth * axis[2];
////	} else {
////		projectionOrigin = origin;
////	}

////	size *= 0.5f;

////	winding.Clear();
////	winding += idVec5( windingOrigin + ( axis * decalWinding[0] ) * size, idVec2( 1, 1 ) );
////	winding += idVec5( windingOrigin + ( axis * decalWinding[1] ) * size, idVec2( 0, 1 ) );
////	winding += idVec5( windingOrigin + ( axis * decalWinding[2] ) * size, idVec2( 0, 0 ) );
////	winding += idVec5( windingOrigin + ( axis * decalWinding[3] ) * size, idVec2( 1, 0 ) );
////	gameRenderWorld.ProjectDecalOntoWorld( winding, projectionOrigin, parallel, depth * 0.5f, declManager.FindMaterial( material ), this.time );
////}

/////*
////==============
////idGameLocal::BloodSplat
////==============
////*/
////BloodSplat( const idVec3 &origin, const idVec3 &dir, float size, const char *material ):void  {
////	float halfSize = size * 0.5f;
////	idVec3 verts[] = {	idVec3( 0.0, +halfSize, +halfSize ),
////						idVec3( 0.0, +halfSize, -halfSize ),
////						idVec3( 0.0, -halfSize, -halfSize ),
////						idVec3( 0.0, -halfSize, +halfSize ) };
////	idTraceModel trm;
////	idClipModel mdl;
////	trace_t results;

////	// FIXME: get from damage def
////	if ( !g_bloodEffects.GetBool() ) {
////		return;
////	}

////	size = halfSize + this.random.RandomFloat() * halfSize;
////	trm.SetupPolygon( verts, 4 );
////	mdl.LoadModel( trm );
////	this.clip.Translation( results, origin, origin + dir * 64.0f, &mdl, mat3_identity, CONTENTS_SOLID, NULL );
////	ProjectDecal( results.endpos, dir, 2.0f * size, true, size, material );
////}

/////*
////=============
////idGameLocal::SetCamera
////=============
////*/
////SetCamera( idCamera *cam ):void  {
////	var/*int */i:number;
////	var ent:idEntity
////	idAI *ai;

////	// this should fix going into a cinematic when dead.. rare but happens
////	idPlayer *client = GetLocalPlayer();
////	if ( client.health <= 0 || client.AI_DEAD ) {
////		return;
////	}

////	this.camera = cam;
////	if ( this.camera ) {
////		this.inCinematic = true;

////		if ( this.skipCinematic && this.camera.spawnArgs.GetBool( "disconnect" ) ) {
////			this.camera.spawnArgs.SetBool( "disconnect", false );
////			cvarSystem.SetCVarFloat( "r_znear", 3.0f );
////			cmdSystem.BufferCommandText( CMD_EXEC_APPEND, "disconnect\n" );
////			this.skipCinematic = false;
////			return;
////		}

////		if ( this.time > this.cinematicStopTime ) {
////			this.cinematicSkipTime = this.time + CINEMATIC_SKIP_DELAY;
////		}

////		// set r_znear so that transitioning into/out of the player's head doesn't clip through the view
////		cvarSystem.SetCVarFloat( "r_znear", 1.0f );

////		// hide all the player models
////		for( i = 0; i < this.numClients; i++ ) {
////			if ( this.entities[ i ] ) {
////				client = static_cast< idPlayer* >( this.entities[ i ] );
////				client.EnterCinematic();
////			}
////		}

////		if ( !cam.spawnArgs.GetBool( "ignore_enemies" ) ) {
////			// kill any active monsters that are enemies of the player
////			for ( ent = this.spawnedEntities.Next(); ent != NULL; ent = ent.spawnNode.Next() ) {
////				if ( ent.cinematic || ent.fl.isDormant ) {
////					// only kill entities that aren't needed for cinematics and aren't dormant
////					continue;
////				}

////				if ( ent.IsType( idAI::Type ) ) {
////					ai = static_cast<idAI *>( ent );
////					if ( !ai.GetEnemy() || !ai.IsActive() ) {
////						// no enemy, or inactive, so probably safe to ignore
////						continue;
////					}
////				} else if ( ent.IsType( idProjectile::Type ) ) {
////					// remove all projectiles
////				} else if ( ent.spawnArgs.GetBool( "cinematic_remove" ) ) {
////					// remove anything marked to be removed during cinematics
////				} else {
////					// ignore everything else
////					continue;
////				}

////				// remove it
////				DPrintf( "removing '%s' for cinematic\n", ent.GetName() );
////				ent.PostEventMS( &EV_Remove, 0 );
////			}
////		}

////	} else {
////		this.inCinematic = false;
////		this.cinematicStopTime = this.time + msec;

////		// restore r_znear
////		cvarSystem.SetCVarFloat( "r_znear", 3.0f );

////		// show all the player models
////		for( i = 0; i < this.numClients; i++ ) {
////			if ( this.entities[ i ] ) {
////				idPlayer *client = static_cast< idPlayer* >( this.entities[ i ] );
////				client.ExitCinematic();
////			}
////		}
////	}
////}

/////*
////=============
////idGameLocal::GetCamera
////=============
////*/
////idCamera *idGameLocal::GetCamera( ) const {
////	return this.camera;
////}

/////*
////=============
////idGameLocal::SkipCinematic
////=============
////*/
////bool idGameLocal::SkipCinematic( ) {
////	if ( this.camera ) {
////		if ( this.camera.spawnArgs.GetBool( "disconnect" ) ) {
////			this.camera.spawnArgs.SetBool( "disconnect", false );
////			cvarSystem.SetCVarFloat( "r_znear", 3.0f );
////			cmdSystem.BufferCommandText( CMD_EXEC_APPEND, "disconnect\n" );
////			this.skipCinematic = false;
////			return false;
////		}

////		if ( this.camera.spawnArgs.GetBool( "instantSkip" ) ) {
////			this.camera.Stop();
////			return false;
////		}
////	}

////	soundSystem.SetMute( true );
////	if ( !this.skipCinematic ) {
////		this.skipCinematic = true;
////		this.cinematicMaxSkipTime = gameLocal.time + SEC2MS( g_cinematicMaxSkipTime.GetFloat() );
////	}

////	return true;
////}


/*
======================
idGameLocal::SpreadLocations

Now that everything has been spawned, associate areas with location entities
======================
*/
	SpreadLocations ( ): void {

		todoThrow ( );
////	var ent:idEntity

////	// allocate the area table
////	int	numAreas = gameRenderWorld.NumAreas();
////	this.locationEntities = new idLocationEntity *[ numAreas ];
////	memset( this.locationEntities, 0, numAreas * sizeof( *this.locationEntities ) );

////	// for each location entity, make pointers from every area it touches
////	for( ent = this.spawnedEntities.Next(); ent != NULL; ent = ent.spawnNode.Next() ) {
////		if ( !ent.IsType( idLocationEntity::Type ) ) {
////			continue;
////		}
////		idVec3	point = ent.spawnArgs.GetVector( "origin" );
////		int areaNum = gameRenderWorld.PointInArea( point );
////		if ( areaNum < 0 ) {
////			this.Printf( "SpreadLocations: location '%s' is not in a valid area\n", ent.spawnArgs.GetString( "name" ) );
////			continue;
////		}
////		if ( areaNum >= numAreas ) {
////			Error( "idGameLocal::SpreadLocations: areaNum >= gameRenderWorld.NumAreas()" );
////		}
////		if ( this.locationEntities[areaNum] ) {
////			this.Warning( "location entity '%s' overlaps '%s'", ent.spawnArgs.GetString( "name" ),
////				this.locationEntities[areaNum].spawnArgs.GetString( "name" ) );
////			continue;
////		}
////		this.locationEntities[areaNum] = static_cast<idLocationEntity *>(ent);

////		// spread to all other connected areas
////		for ( int i = 0 ; i < numAreas ; i++ ) {
////			if ( i == areaNum ) {
////				continue;
////			}
////			if ( gameRenderWorld.AreasAreConnected( areaNum, i, PS_BLOCK_LOCATION ) ) {
////				this.locationEntities[i] = static_cast<idLocationEntity *>(ent);
////			}
////		}
////	}
	}

/////*
////===================
////idGameLocal::LocationForPoint

////The player checks the location each frame to update the HUD text display
////May return NULL
////===================
////*/
////idLocationEntity *idGameLocal::LocationForPoint( const idVec3 &point ) {
////	if ( !this.locationEntities ) {
////		// before SpreadLocations() has been called
////		return NULL;
////	}

////	int areaNum = gameRenderWorld.PointInArea( point );
////	if ( areaNum < 0 ) {
////		return NULL;
////	}
////	if ( areaNum >= gameRenderWorld.NumAreas() ) {
////		this.Error( "idGameLocal::LocationForPoint: areaNum >= gameRenderWorld.NumAreas()" );
////	}

////	return this.locationEntities[ areaNum ];
////}

/////*
////============
////idGameLocal::SetPortalState
////============
////*/
////SetPortalState( qhandle_t portal, int blockingBits ):void  {
////	idBitMsg outMsg;
////	byte msgBuf[ MAX_GAME_MESSAGE_SIZE ];

////	if ( !gameLocal.isClient ) {
////		outMsg.Init( msgBuf, sizeof( msgBuf ) );
////		outMsg.WriteByte( GAME_RELIABLE_MESSAGE_PORTAL );
////		outMsg.WriteLong( portal );
////		outMsg.WriteBits( blockingBits, NUM_RENDER_PORTAL_BITS );
////		networkSystem.ServerSendReliableMessage( -1, outMsg );
////	}
////	gameRenderWorld.SetPortalState( portal, blockingBits );
////}

/////*
////============
////idGameLocal::sortSpawnPoints
////============
////*/
////int idGameLocal::sortSpawnPoints( const void *ptr1, const void *ptr2 ) {
////	const spawnSpot_t *spot1 = static_cast<const spawnSpot_t *>( ptr1 );
////	const spawnSpot_t *spot2 = static_cast<const spawnSpot_t *>( ptr2 );
////	float diff;

////	diff = spot1.dist - spot2.dist;
////	if ( diff < 0.0 ) {
////		return 1;
////	} else if ( diff > 0.0 ) {
////		return -1;
////	} else {
////		return 0;
////	}
////}

/*
===========
idGameLocal::RandomizeInitialSpawns
randomize the order of the initial spawns
prepare for a sequence of initial player spawns
============
*/
	RandomizeInitialSpawns(): void {
		todoThrow ( );
////	spawnSpot_t	spot;
////	int i, j;
////	var ent:idEntity

////	if ( !isMultiplayer || isClient ) {
////		return;
////	}
////	spawnSpots.Clear();
////	initialSpots.Clear();
////	spot.dist = 0;
////	spot.ent = FindEntityUsingDef( NULL, "info_player_deathmatch" );
////	while( spot.ent ) {
////		spawnSpots.Append( spot );
////		if ( spot.ent.spawnArgs.GetBool( "initial" ) ) {
////			initialSpots.Append( spot.ent );
////		}
////		spot.ent = FindEntityUsingDef( spot.ent, "info_player_deathmatch" );
////	}
////	if ( !spawnSpots.Num() ) {
////		common.Warning( "no info_player_deathmatch in map" );
////		return;
////	}
////	common.Printf( "%d spawns (%d initials)\n", spawnSpots.Num(), initialSpots.Num() );
////	// if there are no initial spots in the map, consider they can all be used as initial
////	if ( !initialSpots.Num() ) {
////		common.Warning( "no info_player_deathmatch entities marked initial in map" );
////		for ( i = 0; i < spawnSpots.Num(); i++ ) {
////			initialSpots.Append( spawnSpots[ i ].ent );
////		}
////	}
////	for ( i = 0; i < initialSpots.Num(); i++ ) {
////		j = this.random.RandomInt( initialSpots.Num() );
////		ent = initialSpots[ i ];
////		initialSpots[ i ] = initialSpots[ j ];
////		initialSpots[ j ] = ent;
////	}
////	// reset the counter
////	currentInitialSpot = 0;
}

/////*
////===========
////idGameLocal::SelectInitialSpawnPoint
////spectators are spawned randomly anywhere
////in-game clients are spawned based on distance to active players (randomized on the first half)
////upon map restart, initial spawns are used (randomized ordered list of spawns flagged "initial")
////  if there are more players than initial spots, overflow to regular spawning
////============
////*/
////idEntity *idGameLocal::SelectInitialSpawnPoint( idPlayer *player ) {
////	int				i, j, which;
////	spawnSpot_t		spot;
////	idVec3			pos;
////	float			dist;
////	bool			alone;

////	if ( !isMultiplayer || !spawnSpots.Num() ) {
////		spot.ent = FindEntityUsingDef( NULL, "info_player_start" );
////		if ( !spot.ent ) {
////			this.Error( "No info_player_start on map.\n" );
////		}
////		return spot.ent;
////	}
////	if ( player.spectating ) {
////		// plain random spot, don't bother
////		return spawnSpots[ this.random.RandomInt( spawnSpots.Num() ) ].ent;
////	} else if ( player.useInitialSpawns && currentInitialSpot < initialSpots.Num() ) {
////		return initialSpots[ currentInitialSpot++ ];
////	} else {
////		// check if we are alone in map
////		alone = true;
////		for ( j = 0; j < MAX_CLIENTS; j++ ) {
////			if ( this.entities[ j ] && this.entities[ j ] != player ) {
////				alone = false;
////				break;
////			}
////		}
////		if ( alone ) {
////			// don't do distance-based
////			return spawnSpots[ this.random.RandomInt( spawnSpots.Num() ) ].ent;
////		}

////		// find the distance to the closest active player for each spawn spot
////		for( i = 0; i < spawnSpots.Num(); i++ ) {
////			pos = spawnSpots[ i ].ent.GetPhysics().GetOrigin();
////			spawnSpots[ i ].dist = 0x7fffffff;
////			for( j = 0; j < MAX_CLIENTS; j++ ) {
////				if ( !this.entities[ j ] || !this.entities[ j ].IsType( idPlayer::Type )
////					|| this.entities[ j ] == player
////					|| static_cast< idPlayer * >( this.entities[ j ] ).spectating ) {
////					continue;
////				}

////				dist = ( pos - this.entities[ j ].GetPhysics().GetOrigin() ).LengthSqr();
////				if ( dist < spawnSpots[ i ].dist ) {
////					spawnSpots[ i ].dist = dist;
////				}
////			}
////		}

////		// sort the list
////		qsort( ( void * )spawnSpots.Ptr(), spawnSpots.Num(), sizeof( spawnSpot_t ), ( int (*)(const void *, const void *) )sortSpawnPoints );

////		// choose a random one in the top half
////		which = this.random.RandomInt( spawnSpots.Num() / 2 );
////		spot = spawnSpots[ which ];
////	}
////	return spot.ent;
////}

/*
================
idGameLocal::UpdateServerInfoFlags
================
*/
UpdateServerInfoFlags (): void {
		this.gameType = gameType_t.GAME_SP;
		if ((idStr.Icmp(this.serverInfo.GetString("si_gameType"), "deathmatch") == 0)) {
			this.gameType = gameType_t.GAME_DM;
		} else if ((idStr.Icmp(this.serverInfo.GetString("si_gameType"), "Tourney") == 0)) {
			this.gameType = gameType_t.GAME_TOURNEY;
		} else if ((idStr.Icmp(this.serverInfo.GetString("si_gameType"), "Team DM") == 0)) {
			this.gameType = gameType_t.GAME_TDM;
		} else if ((idStr.Icmp(this.serverInfo.GetString("si_gameType"), "Last Man") == 0)) {
			this.gameType = gameType_t.GAME_LASTMAN;
		}
		if (this.gameType == gameType_t.GAME_LASTMAN) {
			if (!this.serverInfo.GetInt("si_warmup")) {
				common.Warning("Last Man Standing - forcing warmup on");
				this.serverInfo.SetInt("si_warmup", 1);
			}
			if (this.serverInfo.GetInt("si_fraglimit") <= 0) {
				common.Warning("Last Man Standing - setting fraglimit 1");
				this.serverInfo.SetInt("si_fraglimit", 1);
			}
		}
	}


/////*
////================
////idGameLocal::SetGlobalMaterial
////================
////*/
////SetGlobalMaterial( const idMaterial *mat ):void  {
////	this.globalMaterial = mat;
////}

/////*
////================
////idGameLocal::GetGlobalMaterial
////================
////*/
////const idMaterial *idGameLocal::GetGlobalMaterial() {
////	return this.globalMaterial;
////}

/////*
////================
////idGameLocal::GetSpawnId
////================
////*/
////int idGameLocal::GetSpawnId( const idEntity* ent ) const {
////	return ( gameLocal.spawnIds[ ent.entityNumber ] << GENTITYNUM_BITS ) | ent.entityNumber;
////}

/////*
////================
////idGameLocal::ThrottleUserInfo
////================
////*/
////ThrottleUserInfo( ):void  {
////	this.mpGame.ThrottleUserInfo();
////}

/////*
////===========
////idGameLocal::SelectTimeGroup
////============
////*/
////SelectTimeGroup( int timeGroup ):void  { }

/////*
////===========
////idGameLocal::GetTimeGroupTime
////============
////*/
////int idGameLocal::GetTimeGroupTime( int timeGroup ) {
////	return gameLocal.time;
////}

/////*
////===========
////idGameLocal::GetBestGameType
////============
////*/
////GetBestGameType( const char* map, const char* gametype, char buf[ MAX_STRING_CHARS ] ):void  {
////	strncpy( buf, gametype, MAX_STRING_CHARS );
////	buf[ MAX_STRING_CHARS - 1 ] = '\0';
////}

/////*
////===========
////idGameLocal::NeedRestart
////============
////*/
////bool idGameLocal::NeedRestart() {

////	idDict		newInfo;
////	const idKeyValue *keyval, *keyval2;

////	newInfo = *cvarSystem.MoveCVarsToDict( CVAR_SERVERINFO );

////	for ( int i = 0; i < newInfo.GetNumKeyVals(); i++ ) {
////		keyval = newInfo.GetKeyVal( i );
////		keyval2 = this.serverInfo.FindKey( keyval.GetKey() );
////		if ( !keyval2 ) {
////			return true;
////		}
////		// a select set of si_ changes will cause a full restart of the server
////		if ( keyval.GetValue().Cmp( keyval2.GetValue() ) && ( !keyval.GetKey().Cmp( "si_pure" ) || !keyval.GetKey().Cmp( "si_map" ) ) ) {
////			return true;
////		}
////	}
////	return false;
////}

/////*
////================
////idGameLocal::GetClientStats
////================
////*/
////GetClientStats( int clientNum, char *data, const int len ):void  {
////	this.mpGame.PlayerStats( clientNum, data, len );
////}


/////*
////================
////idGameLocal::SwitchTeam
////================
////*/
////SwitchTeam( int clientNum, int team ) :void {

////	idPlayer *   player;
////	player = clientNum >= 0 ? static_cast<idPlayer *>( gameLocal.entities[ clientNum ] ) : NULL;

////	if ( !player )
////		return;

////	int oldTeam = player.team;

////	// Put in spectator mode
////	if ( team == -1 ) {
////		static_cast< idPlayer * >( this.entities[ clientNum ] ).Spectate( true );
////	}
////	// Switch to a team
////	else {
////		this.mpGame.SwitchToTeam ( clientNum, oldTeam, team );
////	}
////}

/*
===============
idGameLocal::GetMapLoadingGUI
===============
*/
	GetMapLoadingGUI(gui: Uint8Array /* MAX_STRING_CHARS */ ) { }


/*
=================
idGameLocal::InitConsoleCommands

Let the system know about all of our commands
so it can perform tab completion
=================
*/
	InitConsoleCommands(): void {
		todo( "idGameLocal::InitConsoleCommands" );
		//	cmdSystem.AddCommand( "listTypeInfo",			ListTypeInfo_f,				CMD_FL_GAME,				"list type info" );
		//	cmdSystem.AddCommand( "writeGameState",		WriteGameState_f,			CMD_FL_GAME,				"write game state" );
		//	cmdSystem.AddCommand( "testSaveGame",			TestSaveGame_f,				CMD_FL_GAME|CMD_FL_CHEAT,	"test a save game for a level" );
		//	cmdSystem.AddCommand( "game_memory",			idClass::DisplayInfo_f,		CMD_FL_GAME,				"displays game class info" );
		//	cmdSystem.AddCommand( "listClasses",			idClass::ListClasses_f,		CMD_FL_GAME,				"lists game classes" );
		//	cmdSystem.AddCommand( "listThreads",			idThread::ListThreads_f,	CMD_FL_GAME|CMD_FL_CHEAT,	"lists script threads" );
		//	cmdSystem.AddCommand( "listEntities",			Cmd_EntityList_f,			CMD_FL_GAME|CMD_FL_CHEAT,	"lists game entities" );
		//	cmdSystem.AddCommand( "listActiveEntities",	Cmd_ActiveEntityList_f,		CMD_FL_GAME|CMD_FL_CHEAT,	"lists active game entities" );
		//	cmdSystem.AddCommand( "listMonsters",			idAI::List_f,				CMD_FL_GAME|CMD_FL_CHEAT,	"lists monsters" );
		//	cmdSystem.AddCommand( "listSpawnArgs",			Cmd_ListSpawnArgs_f,		CMD_FL_GAME|CMD_FL_CHEAT,	"list the spawn args of an entity", idGameLocal::ArgCompletion_EntityName );
		//	cmdSystem.AddCommand( "say",					Cmd_Say_f,					CMD_FL_GAME,				"text chat" );
		//	cmdSystem.AddCommand( "sayTeam",				Cmd_SayTeam_f,				CMD_FL_GAME,				"team text chat" );
		//	cmdSystem.AddCommand( "addChatLine",			Cmd_AddChatLine_f,			CMD_FL_GAME,				"internal use - core to game chat lines" );
		//	cmdSystem.AddCommand( "gameKick",				Cmd_Kick_f,					CMD_FL_GAME,				"same as kick, but recognizes player names" );
		//	cmdSystem.AddCommand( "give",					Cmd_Give_f,					CMD_FL_GAME|CMD_FL_CHEAT,	"gives one or more items" );
		//	cmdSystem.AddCommand( "centerview",			Cmd_CenterView_f,			CMD_FL_GAME,				"centers the view" );
		//	cmdSystem.AddCommand( "god",					Cmd_God_f,					CMD_FL_GAME|CMD_FL_CHEAT,	"enables god mode" );
		//	cmdSystem.AddCommand( "notarget",				Cmd_Notarget_f,				CMD_FL_GAME|CMD_FL_CHEAT,	"disables the player as a target" );
		//	cmdSystem.AddCommand( "noclip",				Cmd_Noclip_f,				CMD_FL_GAME|CMD_FL_CHEAT,	"disables collision detection for the player" );
		//	cmdSystem.AddCommand( "kill",					Cmd_Kill_f,					CMD_FL_GAME,				"kills the player" );
		//	cmdSystem.AddCommand( "where",					Cmd_GetViewpos_f,			CMD_FL_GAME|CMD_FL_CHEAT,	"prints the current view position" );
		//	cmdSystem.AddCommand( "getviewpos",			Cmd_GetViewpos_f,			CMD_FL_GAME|CMD_FL_CHEAT,	"prints the current view position" );
		//	cmdSystem.AddCommand( "setviewpos",			Cmd_SetViewpos_f,			CMD_FL_GAME|CMD_FL_CHEAT,	"sets the current view position" );
		//	cmdSystem.AddCommand( "teleport",				Cmd_Teleport_f,				CMD_FL_GAME|CMD_FL_CHEAT,	"teleports the player to an entity location", idGameLocal::ArgCompletion_EntityName );
		//	cmdSystem.AddCommand( "trigger",				Cmd_Trigger_f,				CMD_FL_GAME|CMD_FL_CHEAT,	"triggers an entity", idGameLocal::ArgCompletion_EntityName );
		//	cmdSystem.AddCommand( "spawn",					Cmd_Spawn_f,				CMD_FL_GAME|CMD_FL_CHEAT,	"spawns a game entity", idCmdSystem::ArgCompletion_Decl<DECL_ENTITYDEF> );
		//	cmdSystem.AddCommand( "damage",				Cmd_Damage_f,				CMD_FL_GAME|CMD_FL_CHEAT,	"apply damage to an entity", idGameLocal::ArgCompletion_EntityName );
		//	cmdSystem.AddCommand( "remove",				Cmd_Remove_f,				CMD_FL_GAME|CMD_FL_CHEAT,	"removes an entity", idGameLocal::ArgCompletion_EntityName );
		//	cmdSystem.AddCommand( "killMonsters",			Cmd_KillMonsters_f,			CMD_FL_GAME|CMD_FL_CHEAT,	"removes all monsters" );
		//	cmdSystem.AddCommand( "killMoveables",			Cmd_KillMovables_f,			CMD_FL_GAME|CMD_FL_CHEAT,	"removes all moveables" );
		//	cmdSystem.AddCommand( "killRagdolls",			Cmd_KillRagdolls_f,			CMD_FL_GAME|CMD_FL_CHEAT,	"removes all ragdolls" );
		//	cmdSystem.AddCommand( "addline",				Cmd_AddDebugLine_f,			CMD_FL_GAME|CMD_FL_CHEAT,	"adds a debug line" );
		//	cmdSystem.AddCommand( "addarrow",				Cmd_AddDebugLine_f,			CMD_FL_GAME|CMD_FL_CHEAT,	"adds a debug arrow" );
		//	cmdSystem.AddCommand( "removeline",			Cmd_RemoveDebugLine_f,		CMD_FL_GAME|CMD_FL_CHEAT,	"removes a debug line" );
		//	cmdSystem.AddCommand( "blinkline",				Cmd_BlinkDebugLine_f,		CMD_FL_GAME|CMD_FL_CHEAT,	"blinks a debug line" );
		//	cmdSystem.AddCommand( "listLines",				Cmd_ListDebugLines_f,		CMD_FL_GAME|CMD_FL_CHEAT,	"lists all debug lines" );
		//	cmdSystem.AddCommand( "playerModel",			Cmd_PlayerModel_f,			CMD_FL_GAME|CMD_FL_CHEAT,	"sets the given model on the player", idCmdSystem::ArgCompletion_Decl<DECL_MODELDEF> );
		//	cmdSystem.AddCommand( "testFx",				Cmd_TestFx_f,				CMD_FL_GAME|CMD_FL_CHEAT,	"tests an FX system", idCmdSystem::ArgCompletion_Decl<DECL_FX> );
		//	cmdSystem.AddCommand( "testBoneFx",			Cmd_TestBoneFx_f,			CMD_FL_GAME|CMD_FL_CHEAT,	"tests an FX system bound to a joint", idCmdSystem::ArgCompletion_Decl<DECL_FX> );
		//	cmdSystem.AddCommand( "testLight",				Cmd_TestLight_f,			CMD_FL_GAME|CMD_FL_CHEAT,	"tests a light" );
		//	cmdSystem.AddCommand( "testPointLight",		Cmd_TestPointLight_f,		CMD_FL_GAME|CMD_FL_CHEAT,	"tests a point light" );
		//	cmdSystem.AddCommand( "popLight",				Cmd_PopLight_f,				CMD_FL_GAME|CMD_FL_CHEAT,	"removes the last created light" );
		//	cmdSystem.AddCommand( "testDeath",				Cmd_TestDeath_f,			CMD_FL_GAME|CMD_FL_CHEAT,	"tests death" );
		//	cmdSystem.AddCommand( "testSave",				Cmd_TestSave_f,				CMD_FL_GAME|CMD_FL_CHEAT,	"writes out a test savegame" );
		//	cmdSystem.AddCommand( "testModel",				idTestModel::TestModel_f,			CMD_FL_GAME|CMD_FL_CHEAT,	"tests a model", idTestModel::ArgCompletion_TestModel );
		//	cmdSystem.AddCommand( "testSkin",				idTestModel::TestSkin_f,			CMD_FL_GAME|CMD_FL_CHEAT,	"tests a skin on an existing testModel", idCmdSystem::ArgCompletion_Decl<DECL_SKIN> );
		//	cmdSystem.AddCommand( "testShaderParm",		idTestModel::TestShaderParm_f,		CMD_FL_GAME|CMD_FL_CHEAT,	"sets a shaderParm on an existing testModel" );
		//	cmdSystem.AddCommand( "keepTestModel",			idTestModel::KeepTestModel_f,		CMD_FL_GAME|CMD_FL_CHEAT,	"keeps the last test model in the game" );
		//	cmdSystem.AddCommand( "testAnim",				idTestModel::TestAnim_f,			CMD_FL_GAME|CMD_FL_CHEAT,	"tests an animation", idTestModel::ArgCompletion_TestAnim );
		//	cmdSystem.AddCommand( "testParticleStopTime",	idTestModel::TestParticleStopTime_f,CMD_FL_GAME|CMD_FL_CHEAT,	"tests particle stop time on a test model" );
		//	cmdSystem.AddCommand( "nextAnim",				idTestModel::TestModelNextAnim_f,	CMD_FL_GAME|CMD_FL_CHEAT,	"shows next animation on test model" );
		//	cmdSystem.AddCommand( "prevAnim",				idTestModel::TestModelPrevAnim_f,	CMD_FL_GAME|CMD_FL_CHEAT,	"shows previous animation on test model" );
		//	cmdSystem.AddCommand( "nextFrame",				idTestModel::TestModelNextFrame_f,	CMD_FL_GAME|CMD_FL_CHEAT,	"shows next animation frame on test model" );
		//	cmdSystem.AddCommand( "prevFrame",				idTestModel::TestModelPrevFrame_f,	CMD_FL_GAME|CMD_FL_CHEAT,	"shows previous animation frame on test model" );
		//	cmdSystem.AddCommand( "testBlend",				idTestModel::TestBlend_f,			CMD_FL_GAME|CMD_FL_CHEAT,	"tests animation blending" );
		//	cmdSystem.AddCommand( "reloadScript",			Cmd_ReloadScript_f,			CMD_FL_GAME|CMD_FL_CHEAT,	"reloads scripts" );
		//	cmdSystem.AddCommand( "script",				Cmd_Script_f,				CMD_FL_GAME|CMD_FL_CHEAT,	"executes a line of script" );
		//	cmdSystem.AddCommand( "listCollisionModels",	Cmd_ListCollisionModels_f,	CMD_FL_GAME,				"lists collision models" );
		//	cmdSystem.AddCommand( "collisionModelInfo",	Cmd_CollisionModelInfo_f,	CMD_FL_GAME,				"shows collision model info" );
		//	cmdSystem.AddCommand( "reexportmodels",		Cmd_ReexportModels_f,		CMD_FL_GAME|CMD_FL_CHEAT,	"reexports models", ArgCompletion_DefFile );
		//	cmdSystem.AddCommand( "reloadanims",			Cmd_ReloadAnims_f,			CMD_FL_GAME|CMD_FL_CHEAT,	"reloads animations" );
		//	cmdSystem.AddCommand( "listAnims",				Cmd_ListAnims_f,			CMD_FL_GAME,				"lists all animations" );
		//	cmdSystem.AddCommand( "aasStats",				Cmd_AASStats_f,				CMD_FL_GAME,				"shows AAS stats" );
		//	cmdSystem.AddCommand( "testDamage",			Cmd_TestDamage_f,			CMD_FL_GAME|CMD_FL_CHEAT,	"tests a damage def", idCmdSystem::ArgCompletion_Decl<DECL_ENTITYDEF> );
		//	cmdSystem.AddCommand( "weaponSplat",			Cmd_WeaponSplat_f,			CMD_FL_GAME|CMD_FL_CHEAT,	"projects a blood splat on the player weapon" );
		//	cmdSystem.AddCommand( "saveSelected",			Cmd_SaveSelected_f,			CMD_FL_GAME|CMD_FL_CHEAT,	"saves the selected entity to the .map file" );
		//	cmdSystem.AddCommand( "deleteSelected",		Cmd_DeleteSelected_f,		CMD_FL_GAME|CMD_FL_CHEAT,	"deletes selected entity" );
		//	cmdSystem.AddCommand( "saveMoveables",			Cmd_SaveMoveables_f,		CMD_FL_GAME|CMD_FL_CHEAT,	"save all moveables to the .map file" );
		//	cmdSystem.AddCommand( "saveRagdolls",			Cmd_SaveRagdolls_f,			CMD_FL_GAME|CMD_FL_CHEAT,	"save all ragdoll poses to the .map file" );
		//	cmdSystem.AddCommand( "bindRagdoll",			Cmd_BindRagdoll_f,			CMD_FL_GAME|CMD_FL_CHEAT,	"binds ragdoll at the current drag position" );
		//	cmdSystem.AddCommand( "unbindRagdoll",			Cmd_UnbindRagdoll_f,		CMD_FL_GAME|CMD_FL_CHEAT,	"unbinds the selected ragdoll" );
		//	cmdSystem.AddCommand( "saveLights",			Cmd_SaveLights_f,			CMD_FL_GAME|CMD_FL_CHEAT,	"saves all lights to the .map file" );
		//	cmdSystem.AddCommand( "saveParticles",			Cmd_SaveParticles_f,		CMD_FL_GAME|CMD_FL_CHEAT,	"saves all lights to the .map file" );
		//	cmdSystem.AddCommand( "clearLights",			Cmd_ClearLights_f,			CMD_FL_GAME|CMD_FL_CHEAT,	"clears all lights" );
		//	cmdSystem.AddCommand( "gameError",				Cmd_GameError_f,			CMD_FL_GAME|CMD_FL_CHEAT,	"causes a game error" );

		////////#ifndef	ID_DEMO_BUILD
		////////	cmdSystem.AddCommand( "disasmScript",			Cmd_DisasmScript_f,			CMD_FL_GAME|CMD_FL_CHEAT,	"disassembles script" );
		////////	cmdSystem.AddCommand( "recordViewNotes",		Cmd_RecordViewNotes_f,		CMD_FL_GAME|CMD_FL_CHEAT,	"record the current view position with notes" );
		////////	cmdSystem.AddCommand( "showViewNotes",			Cmd_ShowViewNotes_f,		CMD_FL_GAME|CMD_FL_CHEAT,	"show any view notes for the current map, successive calls will cycle to the next note" );
		////////	cmdSystem.AddCommand( "closeViewNotes",		Cmd_CloseViewNotes_f,		CMD_FL_GAME|CMD_FL_CHEAT,	"close the view showing any notes for this map" );
		////////	cmdSystem.AddCommand( "exportmodels",			Cmd_ExportModels_f,			CMD_FL_GAME|CMD_FL_CHEAT,	"exports models", ArgCompletion_DefFile );

		////////	// multiplayer client commands ( replaces old impulses stuff )
		////////	cmdSystem.AddCommand( "clientDropWeapon",		idMultiplayerGame::DropWeapon_f, CMD_FL_GAME,			"drop current weapon" );
		////////	cmdSystem.AddCommand( "clientMessageMode",		idMultiplayerGame::MessageMode_f, CMD_FL_GAME,			"ingame gui message mode" );
		////////	// FIXME: implement
		//////////	cmdSystem.AddCommand( "clientVote",			idMultiplayerGame::Vote_f,	CMD_FL_GAME,				"cast your vote: clientVote yes | no" );
		//////////	cmdSystem.AddCommand( "clientCallVote",		idMultiplayerGame::CallVote_f,	CMD_FL_GAME,			"call a vote: clientCallVote si_.. proposed_value" );
		////////	cmdSystem.AddCommand( "clientVoiceChat",		idMultiplayerGame::VoiceChat_f,	CMD_FL_GAME,			"voice chats: clientVoiceChat <sound shader>" );
		////////	cmdSystem.AddCommand( "clientVoiceChatTeam",	idMultiplayerGame::VoiceChatTeam_f,	CMD_FL_GAME,		"team voice chats: clientVoiceChat <sound shader>" );

		////////	// multiplayer server commands
		////////	cmdSystem.AddCommand( "serverMapRestart",		idGameLocal::MapRestart_f,	CMD_FL_GAME,				"restart the current game" );
		////////	cmdSystem.AddCommand( "serverForceReady",	idMultiplayerGame::ForceReady_f,CMD_FL_GAME,				"force all players ready" );
		////////	cmdSystem.AddCommand( "serverNextMap",			idGameLocal::NextMap_f,		CMD_FL_GAME,				"change to the next map" );
		////////#endif

		//	// localization help commands
		//	cmdSystem.AddCommand( "nextGUI",				Cmd_NextGUI_f,				CMD_FL_GAME|CMD_FL_CHEAT,	"teleport the player to the next func_static with a gui" );
		//	cmdSystem.AddCommand( "testid",				Cmd_TestId_f,				CMD_FL_GAME|CMD_FL_CHEAT,	"output the string for the specified id." );
	}

/////*
////=================
////idGameLocal::ShutdownConsoleCommands
////=================
////*/
////void idGameLocal::ShutdownConsoleCommands( void ) {
////	cmdSystem.RemoveFlaggedCommands( CMD_FL_GAME );
////}


}

//////============================================================================

////extern idGameLocal			gameLocal;
////extern idAnimManager		animationLib;

//////============================================================================

////template< class type >
////ID_INLINE idEntityPtr<type>::idEntityPtr() {
////	spawnId = 0;
////}

////template< class type >
////ID_INLINE void idEntityPtr<type>::Save( idSaveGame *savefile ) const {
////	savefile->WriteInt( spawnId );
////}

////template< class type >
////ID_INLINE void idEntityPtr<type>::Restore( idRestoreGame *savefile ) {
////	savefile->ReadInt( spawnId );
////}

////template< class type >
////ID_INLINE idEntityPtr<type> &idEntityPtr<type>::operator=( type *ent ) {
////	if ( ent == NULL ) {
////		spawnId = 0;
////	} else {
////		spawnId = ( gameLocal.spawnIds[ent->entityNumber] << GENTITYNUM_BITS ) | ent->entityNumber;
////	}
////	return *this;
////}

////template< class type >
////ID_INLINE bool idEntityPtr<type>::SetSpawnId( int id ) {
////	// the reason for this first check is unclear:
////	// the function returning false may mean the spawnId is already set right, or the entity is missing
////	if ( id == spawnId ) {
////		return false;
////	}
////	if ( ( id >> GENTITYNUM_BITS ) == gameLocal.spawnIds[ id & ( ( 1 << GENTITYNUM_BITS ) - 1 ) ] ) {
////		spawnId = id;
////		return true;
////	}
////	return false;
////}

////template< class type >
////ID_INLINE bool idEntityPtr<type>::IsValid( ) const {
////	return ( gameLocal.spawnIds[ spawnId & ( ( 1 << GENTITYNUM_BITS ) - 1 ) ] == ( spawnId >> GENTITYNUM_BITS ) );
////}

////template< class type >
////ID_INLINE type *idEntityPtr<type>::GetEntity( ) const {
////	int entityNum = spawnId & ( ( 1 << GENTITYNUM_BITS ) - 1 );
////	if ( ( gameLocal.spawnIds[ entityNum ] == ( spawnId >> GENTITYNUM_BITS ) ) ) {
////		return static_cast<type *>( gameLocal.entities[ entityNum ] );
////	}
////	return NULL;
////}

////template< class type >
////ID_INLINE int idEntityPtr<type>::GetEntityNum( ) const {
////	return ( spawnId & ( ( 1 << GENTITYNUM_BITS ) - 1 ) );
////}

//////============================================================================

////class idGameError extends idException {
////public:
////	idGameError( text:string ) : idException( text ) {}
////};

//////============================================================================


//////
////// these defines work for all startsounds from all entity types
////// make sure to change script/doom_defs.script if you add any channels, or change their order
//////
////typedef enum {
////	SND_CHANNEL_ANY = SCHANNEL_ANY,
////	SND_CHANNEL_VOICE = SCHANNEL_ONE,
////	SND_CHANNEL_VOICE2,
////	SND_CHANNEL_BODY,
////	SND_CHANNEL_BODY2,
////	SND_CHANNEL_BODY3,
////	SND_CHANNEL_WEAPON,
////	SND_CHANNEL_ITEM,
////	SND_CHANNEL_HEART,
////	SND_CHANNEL_PDA,
////	SND_CHANNEL_DEMONIC,
////	SND_CHANNEL_RADIO,

////	// internal use only.  not exposed to script or framecommands.
////	SND_CHANNEL_AMBIENT,
////	SND_CHANNEL_DAMAGE
////} gameSoundChannel_t;

////// content masks
////#define	MASK_ALL					(-1)
////#define	MASK_SOLID					(CONTENTS_SOLID)
////#define	MASK_MONSTERSOLID			(CONTENTS_SOLID|CONTENTS_MONSTERCLIP|CONTENTS_BODY)
////#define	MASK_PLAYERSOLID			(CONTENTS_SOLID|CONTENTS_PLAYERCLIP|CONTENTS_BODY)
////#define	MASK_DEADSOLID				(CONTENTS_SOLID|CONTENTS_PLAYERCLIP)
////#define	MASK_WATER					(CONTENTS_WATER)
////#define	MASK_OPAQUE					(contentsFlags_t.CONTENTS_OPAQUE)
////#define	MASK_SHOT_RENDERMODEL		(CONTENTS_SOLID|CONTENTS_RENDERMODEL)
////#define	MASK_SHOT_BOUNDINGBOX		(CONTENTS_SOLID|CONTENTS_BODY)

//var DEFAULT_GRAVITY			= 1066.0; // moved to SysCvar
//var DEFAULT_GRAVITY_STRING = "1066";
//var DEFAULT_GRAVITY_VEC3 = new idVec3( 0, 0, -DEFAULT_GRAVITY );

////const int	CINEMATIC_SKIP_DELAY	= SEC2MS( 2.0f );

//////============================================================================

////#include "physics/Force.h"
////#include "physics/Force_Constant.h"
////#include "physics/Force_Drag.h"
////#include "physics/Force_Field.h"
////#include "physics/Force_Spring.h"
////#include "physics/Physics.h"
////#include "physics/Physics_Static.h"
////#include "physics/Physics_StaticMulti.h"
////#include "physics/Physics_Base.h"
////#include "physics/Physics_Actor.h"
////#include "physics/Physics_Monster.h"
////#include "physics/Physics_Player.h"
////#include "physics/Physics_Parametric.h"
////#include "physics/Physics_RigidBody.h"
////#include "physics/Physics_AF.h"

////#include "SmokeParticles.h"

////#include "Entity.h"
////#include "GameEdit.h"
////#include "AF.h"
////#include "IK.h"
////#include "AFEntity.h"
////#include "Misc.h"
////#include "Actor.h"
////#include "Projectile.h"
////#include "Weapon.h"
////#include "Light.h"
////#include "WorldSpawn.h"
////#include "Item.h"
////#include "PlayerView.h"
////#include "PlayerIcon.h"
////#include "Player.h"
////#include "Mover.h"
////#include "Camera.h"
////#include "Moveable.h"
////#include "Target.h"
////#include "Trigger.h"
////#include "Sound.h"
////#include "Fx.h"
////#include "SecurityCamera.h"
////#include "BrittleFracture.h"

////#include "ai/AI.h"
////#include "anim/Anim_Testmodel.h"

////#include "script/Script_Compiler.h"
////#include "script/Script_Interpreter.h"
////#include "script/Script_Thread.h"

////#endif	/* !__GAME_LOCAL_H__ */
