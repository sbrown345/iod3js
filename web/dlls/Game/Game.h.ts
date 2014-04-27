///*
//===========================================================================
//
//Doom 3 GPL Source Code
//Copyright (C) 1999-2011 id Software LLC, a ZeniMax Media company. 
//
//This file is part of the Doom 3 GPL Source Code (?Doom 3 Source Code?).  
//
//Doom 3 Source Code is free software: you can redistribute it and/or modify
//it under the terms of the GNU General Public License as published by
//the Free Software Foundation, either version 3 of the License, or
//(at your option) any later version.
//
//Doom 3 Source Code is distributed in the hope that it will be useful,
//but WITHOUT ANY WARRANTY; without even the implied warranty of
//MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//GNU General Public License for more details.
//
//You should have received a copy of the GNU General Public License
//along with Doom 3 Source Code.  If not, see <http://www.gnu.org/licenses/>.
//
//In addition, the Doom 3 Source Code is also subject to certain additional terms. You should have received a copy of these additional terms immediately following the terms and conditions of the GNU General Public License which accompanied the Doom 3 Source Code.  If not, please request a copy in writing from id Software at the address below.
//
//If you have questions concerning this license or the applicable additional terms, you may contact in writing id Software LLC, c/o ZeniMax Media Inc., Suite 120, Rockville, Maryland 20850 USA.
//
//===========================================================================
//*/
//
//#ifndef __GAME_H__
//#define __GAME_H__
//
/*
===============================================================================

	Public game interface with methods to run the game.

===============================================================================
*/

// default scripts
var SCRIPT_DEFAULTDEFS = "script/doom_defs.script";
var SCRIPT_DEFAULT = "script/doom_main.script";
var SCRIPT_DEFAULTFUNC = "doom_main";

//typedef struct {
//	char		sessionCommand[MAX_STRING_CHARS];	// "map", "disconnect", "victory", etc
//	int			consistencyHash;					// used to check for network game divergence
//	int			health;
//	int			heartRate;
//	int			stamina;
//	int			combat;
//	bool		syncNextGameFrame;					// used when cinematics are skipped to prevent session from simulating several game frames to
//													// keep the game time in sync with real time
//} gameReturn_t;
//
//typedef enum {
//	ALLOW_YES = 0,
//	ALLOW_BADPASS,	// core will prompt for password and connect again
//	ALLOW_NOTYET,	// core will wait with transmitted message
//	ALLOW_NO		// core will abort with transmitted message
//} allowReply_t;
//
//typedef enum {
//	ESC_IGNORE = 0,	// do nothing
//	ESC_MAIN,		// start main menu GUI
//	ESC_GUI			// set an explicit GUI
//} escReply_t;
//
//#define TIME_GROUP1		0
//#define TIME_GROUP2		1
//
class idGame {
//public:
//	virtual						~idGame() {}
//
//	// Initialize the game for the first time.
	Init ( ): void {throw "placeholder";}
//
//	// Shut down the entire game.
//	virtual void				Shutdown( void ) = 0;
//
//	// Set the local client number. Distinguishes listen ( == 0 ) / dedicated ( == -1 )
//	virtual void				SetLocalClient( int clientNum ) = 0;

	// Sets the user info for a client.
	// if canModify is true, the game can modify the user info in the returned dictionary pointer, server will forward the change back
	// canModify is never true on network client
	SetUserInfo ( /*int */clientNum: number, userInfo: idDict, isClient: boolean, canModify: boolean ): idDict { throw "placeholder"; }
//
//	// Retrieve the game's userInfo dict for a client.
//	virtual const idDict *		GetUserInfo( int clientNum ) = 0;
//
//	// The game gets a chance to alter userinfo before they are emitted to server.
//	virtual void				ThrottleUserInfo( void ) = 0;
//
	// Sets the serverinfo at map loads and when it changes.
	SetServerInfo ( serverInfo: idDict ): void { throw "placeholder"; }
//
//	// The session calls this before moving the single player game to a new level.
//	virtual const idDict &		GetPersistentPlayerInfo( int clientNum ) = 0;
//
	// The session calls this right before a new level is loaded.
	SetPersistentPlayerInfo ( /*int */clientNum: number, playerInfo: idDict ): void { throw "placeholder"; }

	// Loads a map and spawns all the entities.
	InitFromNewMap ( mapName: string, renderWorld: idRenderWorld, soundWorld: idSoundWorld, isServer: boolean, isClient: boolean, randseed: number /*int*/ ): void { throw "placeholder"; }
//
//	// Loads a map from a savegame file.
//	virtual bool				InitFromSaveGame( const char *mapName, idRenderWorld *renderWorld, idSoundWorld *soundWorld, idFile *saveGameFile ) = 0;
//
//	// Saves the current game state, the session may have written some data to the file already.
//	virtual void				SaveGame( idFile *saveGameFile ) = 0;
//
	// Shut down the current map.
	MapShutdown(  ) :void { throw "placeholder"; }

	// Caches media referenced from in key/value pairs in the given dictionary.
	CacheDictionaryMedia ( dict: idDict ): void { throw "placeholder"; }
//
//	// Spawns the player entity to be used by the client.
//	virtual void				SpawnPlayer( int clientNum ) = 0;
//
//	// Runs a game frame, may return a session command for level changing, etc
//	virtual gameReturn_t		RunFrame( const usercmd_t *clientCmds ) = 0;
//
//	// Makes rendering and sound system calls to display for a given clientNum.
//	virtual bool				Draw( int clientNum ) = 0;
//
//	// Let the game do it's own UI when ESCAPE is used
//	virtual escReply_t			HandleESC( idUserInterface **gui ) = 0;
//
//	// get the games menu if appropriate ( multiplayer )
//	virtual idUserInterface *	StartMenu() = 0;
//
//	// When the game is running it's own UI fullscreen, GUI commands are passed through here
//	// return NULL once the fullscreen UI mode should stop, or "main" to go to main menu
//	virtual const char *		HandleGuiCommands( const char *menuCommand ) = 0;
//
//	// main menu commands not caught in the engine are passed here
//	virtual void				HandleMainMenuCommands( const char *menuCommand, idUserInterface *gui ) = 0;
//
//	// Early check to deny connect.
//	virtual allowReply_t		ServerAllowClient( int numClients, const char *IP, const char *guid, const char *password, char reason[MAX_STRING_CHARS] ) = 0;
//
//	// Connects a client.
//	virtual void				ServerClientConnect( int clientNum, const char *guid ) = 0;
//
//	// Spawns the player entity to be used by the client.
//	virtual void				ServerClientBegin( int clientNum ) = 0;
//
//	// Disconnects a client and removes the player entity from the game.
//	virtual void				ServerClientDisconnect( int clientNum ) = 0;
//
//	// Writes initial reliable messages a client needs to recieve when first joining the game.
//	virtual void				ServerWriteInitialReliableMessages( int clientNum ) = 0;
//
//	// Writes a snapshot of the server game state for the given client.
//	virtual void				ServerWriteSnapshot( int clientNum, int sequence, idBitMsg &msg, byte *clientInPVS, int numPVSClients ) = 0;
//
//	// Patches the network entity states at the server with a snapshot for the given client.
//	virtual bool				ServerApplySnapshot( int clientNum, int sequence ) = 0;
//
//	// Processes a reliable message from a client.
//	virtual void				ServerProcessReliableMessage( int clientNum, const idBitMsg &msg ) = 0;
//
//	// Reads a snapshot and updates the client game state.
//	virtual void				ClientReadSnapshot( int clientNum, int sequence, const int gameFrame, const int gameTime, const int dupeUsercmds, const int aheadOfServer, const idBitMsg &msg ) = 0;
//
//	// Patches the network entity states at the client with a snapshot.
//	virtual bool				ClientApplySnapshot( int clientNum, int sequence ) = 0;
//
//	// Processes a reliable message from the server.
//	virtual void				ClientProcessReliableMessage( int clientNum, const idBitMsg &msg ) = 0;
//
//	// Runs prediction on entities at the client.
//	virtual gameReturn_t		ClientPrediction( int clientNum, const usercmd_t *clientCmds, bool lastPredictFrame ) = 0;
//
//	// Used to manage divergent time-lines
//	virtual void				SelectTimeGroup( int timeGroup ) = 0;
//	virtual int					GetTimeGroupTime( int timeGroup ) = 0;
//
//	virtual void				GetBestGameType( const char* map, const char* gametype, char buf[ MAX_STRING_CHARS ] ) = 0;
//
//	// Returns a summary of stats for a given client
//	virtual void				GetClientStats( int clientNum, char *data, const int len ) = 0;
//
//	// Switch a player to a particular team
//	virtual void				SwitchTeam( int clientNum, int team ) = 0;
//
//	virtual bool				DownloadRequest( const char *IP, const char *guid, const char *paks, char urls[ MAX_STRING_CHARS ] ) = 0;
//
	GetMapLoadingGUI ( gui /*[ MAX_STRING_CHARS ]*/: Uint8Array ): void { throw "placeholder"; }
};
//
//extern idGame *					game;


/*
===============================================================================

	Public game interface with methods for in-game editing.

===============================================================================
*/

class refSound_t {
	referenceSound: idSoundEmitter; // this is the interface to the sound system, created
	// with idSoundWorld::AllocSoundEmitter() when needed
	origin = new idVec3;
	listenerId: number /*int*/; // SSF_PRIVATE_SOUND only plays if == listenerId from PlaceListener
	// no spatialization will be performed if == listenerID
	shader: idSoundShader; // this really shouldn't be here, it is a holdover from single channel behavior
	diversity: number /*float*/; // 0.0 to 1.0 value used to select which
	// samples in a multi-sample list from the shader are used
	waitfortrigger: boolean; // don't start it at spawn time
	parms = new soundShaderParms_t; // override volume, flags, etc

	memset0 ( ): void {
		this.referenceSound = null;
		this.origin.memset0 ( );
		this.listenerId = 0;
		this.shader = null;
		this.diversity = 0;
		this.waitfortrigger = false;
		this.parms.memset0 ( );
	}
}


var TEST_PARTICLE_MODEL = 0,
	TEST_PARTICLE_IMPACT = 1,
	TEST_PARTICLE_MUZZLE = 2,
	TEST_PARTICLE_FLIGHT = 3,
	TEST_PARTICLE_SELECTED = 4;

//
//class idEntity;
//class idMD5Anim;
//
//// FIXME: this interface needs to be reworked but it properly separates code for the time being
class idGameEdit {
//public:
//	virtual						~idGameEdit( void ) {}
//
//	// These are the canonical idDict to parameter parsing routines used by both the game and tools.
//	virtual void				ParseSpawnArgsToRenderLight( const idDict *args, renderLight_t *renderLight );
//	virtual void				ParseSpawnArgsToRenderEntity( const idDict *args, renderEntity_t *renderEntity );
//	virtual void				ParseSpawnArgsToRefSound( const idDict *args, refSound_t *refSound );
//
//	// Animation system calls for non-game based skeletal rendering.
//	virtual idRenderModel *		ANIM_GetModelFromEntityDef( const char *classname );
//	virtual const idVec3 		&ANIM_GetModelOffsetFromEntityDef( const char *classname );
//	virtual idRenderModel *		ANIM_GetModelFromEntityDef( const idDict *args );
//	virtual idRenderModel *		ANIM_GetModelFromName( const char *modelName );
//	virtual const idMD5Anim *	ANIM_GetAnimFromEntityDef( const char *classname, const char *animname );
//	virtual int					ANIM_GetNumAnimsFromEntityDef( const idDict *args );
//	virtual const char *		ANIM_GetAnimNameFromEntityDef( const idDict *args, int animNum );
//	virtual const idMD5Anim *	ANIM_GetAnim( const char *fileName );
//	virtual int					ANIM_GetLength( const idMD5Anim *anim );
//	virtual int					ANIM_GetNumFrames( const idMD5Anim *anim );
//	virtual void				ANIM_CreateAnimFrame( const idRenderModel *model, const idMD5Anim *anim, int numJoints, idJointMat *frame, /*int*/time:number, const idVec3 &offset, bool remove_origin_offset );
//	virtual idRenderModel *		ANIM_CreateMeshForAnim( idRenderModel *model, const char *classname, const char *animname, int frame, bool remove_origin_offset );
//
//	// Articulated Figure calls for AF editor and Radiant.
//	virtual bool				AF_SpawnEntity( const char *fileName );
//	virtual void				AF_UpdateEntities( const char *fileName );
//	virtual void				AF_UndoChanges( void );
//	virtual idRenderModel *		AF_CreateMesh( const idDict &args, idVec3 &meshOrigin, idMat3 &meshAxis, bool &poseIsSet );
//
//
//	// Entity selection.
//	virtual void				ClearEntitySelection( void );
//	virtual int					GetSelectedEntities( idEntity *list[], int max );
//	virtual void				AddSelectedEntity( ent:idEntity );
//
//	// Selection methods
//	virtual void				TriggerSelected();
//
//	// Entity defs and spawning.
//	virtual const idDict *		FindEntityDefDict( name:string, bool makeDefault = true ) const;
//	virtual void				SpawnEntityDef( const idDict &args, idEntity **ent );
//	virtual idEntity *			FindEntity( name:string ) const;
//	virtual const char *		GetUniqueEntityName( const char *classname ) const;
//
//	// Entity methods.
//	virtual void				EntityGetOrigin( ent:idEntity, idVec3 &org ) const;
//	virtual void				EntityGetAxis( ent:idEntity, idMat3 &axis ) const;
//	virtual void				EntitySetOrigin( ent:idEntity, const idVec3 &org );
//	virtual void				EntitySetAxis( ent:idEntity, const idMat3 &axis );
//	virtual void				EntityTranslate( ent:idEntity, const idVec3 &org );
//	virtual const idDict *		EntityGetSpawnArgs( ent:idEntity ) const;
//	virtual void				EntityUpdateChangeableSpawnArgs( ent:idEntity, const idDict *dict );
//	virtual void				EntityChangeSpawnArgs( ent:idEntity, const idDict *newArgs );
//	virtual void				EntityUpdateVisuals( ent:idEntity );
//	virtual void				EntitySetModel( ent:idEntity, const char *val );
//	virtual void				EntityStopSound( ent:idEntity );
//	virtual void				EntityDelete( ent:idEntity );
//	virtual void				EntitySetColor( ent:idEntity, const idVec3 color );
//
//	// Player methods.
//	virtual bool				PlayerIsValid() const;
//	virtual void				PlayerGetOrigin( idVec3 &org ) const;
//	virtual void				PlayerGetAxis( idMat3 &axis ) const;
//	virtual void				PlayerGetViewAngles( angles:idAngles ) const;
//	virtual void				PlayerGetEyePosition( idVec3 &org ) const;
//
//	// In game map editing support.
//	virtual const idDict *		MapGetEntityDict( name:string ) const;
//	virtual void				MapSave( const char *path = NULL ) const;
//	virtual void				MapSetEntityKeyVal( name:string, key:string, const char *val ) const ;
//	virtual void				MapCopyDictToEntity( name:string, const idDict *dict ) const;
//	virtual int					MapGetUniqueMatchingKeyVals( const char *key, const char *list[], const int max ) const;
//	virtual void				MapAddEntity( const idDict *dict ) const;
//	virtual int					MapGetEntitiesMatchingClassWithString( const char *classname, const char *match, const char *list[], const int max ) const;
//	virtual void				MapRemoveEntity( name:string ) const;
//	virtual void				MapEntityTranslate( name:string, const idVec3 &v ) const;

	/*
	================
	idGameEdit::ParseSpawnArgsToRenderEntity

	parse the static model parameters
	this is the canonical renderEntity parm parsing,
	which should be used by dmap and the editor
	================
	*/
	ParseSpawnArgsToRenderEntity ( args: idDict, renderEntity: renderEntity_t ): void {
		var i: number /*int*/;
		var temp: string;
		var color = new idVec3;
		var angle: number /*float*/;
		var modelDef: idDeclModelDef;

		renderEntity.memset0 ( );

		temp = args.GetString( "model" );

		modelDef = null;
		if ( temp /*[0] != '\0'*/ ) {
			modelDef = static_cast<idDeclModelDef>( declManager.FindType( declType_t.DECL_MODELDEF, temp, false ) );
			if ( modelDef ) {
				renderEntity.hModel = modelDef.ModelHandle ( );
			}
			if ( !renderEntity.hModel ) {
				renderEntity.hModel = renderModelManager.FindModel( temp );
			}
		}
		if ( renderEntity.hModel ) {
			renderEntity.bounds = renderEntity.hModel.Bounds( renderEntity );
		} else {
			renderEntity.bounds.Zero ( );
		}

		temp = args.GetString( "skin" );
		if ( temp /*[0] != '\0'*/ ) {
			renderEntity.customSkin = declManager.FindSkin( temp );
		} else if ( modelDef ) {
			renderEntity.customSkin = modelDef.GetDefaultSkin ( );
		}

		temp = args.GetString( "shader" );
		if ( temp /*[0] != '\0'*/ ) {
			renderEntity.customShader = declManager.FindMaterial( temp );
		}

		args.GetVector_R( "origin", "0 0 0", renderEntity.origin );

		// get the rotation matrix in either full form, or single angle form
		if ( !args.GetMatrix_R( "rotation", "1 0 0 0 1 0 0 0 1", renderEntity.axis ) ) {
			angle = args.GetFloat( "angle" );
			if ( angle != 0.0 ) {
				renderEntity.axis.opEquals( new idAngles( 0.0, angle, 0.0 ).ToMat3 ( ) );
			} else {
				renderEntity.axis.Identity ( );
			}
		}

		renderEntity.referenceSound = null;

		// get shader parms
		args.GetVector_R( "_color", "1 1 1", color );
		renderEntity.shaderParms[SHADERPARM_RED] = color[0];
		renderEntity.shaderParms[SHADERPARM_GREEN] = color[1];
		renderEntity.shaderParms[SHADERPARM_BLUE] = color[2];
		renderEntity.shaderParms[3] = args.GetFloat( "shaderParm3", "1" );
		renderEntity.shaderParms[4] = args.GetFloat( "shaderParm4", "0" );
		renderEntity.shaderParms[5] = args.GetFloat( "shaderParm5", "0" );
		renderEntity.shaderParms[6] = args.GetFloat( "shaderParm6", "0" );
		renderEntity.shaderParms[7] = args.GetFloat( "shaderParm7", "0" );
		renderEntity.shaderParms[8] = args.GetFloat( "shaderParm8", "0" );
		renderEntity.shaderParms[9] = args.GetFloat( "shaderParm9", "0" );
		renderEntity.shaderParms[10] = args.GetFloat( "shaderParm10", "0" );
		renderEntity.shaderParms[11] = args.GetFloat( "shaderParm11", "0" );

		// check noDynamicInteractions flag
		renderEntity.noDynamicInteractions = args.GetBool( "noDynamicInteractions" );

		// check noshadows flag
		renderEntity.noShadow = args.GetBool( "noshadows" );

		// check noselfshadows flag
		renderEntity.noSelfShadow = args.GetBool( "noselfshadows" );

		// init any guis, including entity-specific states
		for ( i = 0; i < MAX_RENDERENTITY_GUI; i++ ) {
			temp = args.GetString( i == 0 ? "gui" : va( "gui%d", i + 1 ) );
			if ( temp /*[ 0 ] != '\0'*/ ) {
				var $gui = new R( renderEntity.gui[i] );
				AddRenderGui( temp, $gui, args );
				renderEntity.gui[i] = $gui.$;
			}
		}
	}

/*
================
idGameEdit::ParseSpawnArgsToRefSound

parse the sound parameters
this is the canonical refSound parm parsing,
which should be used by dmap and the editor
================
*/
	ParseSpawnArgsToRefSound ( args: idDict, refSound: refSound_t ): void {
		var temp: string;

		refSound.memset0 ( );

		refSound.parms.minDistance = args.GetFloat( "s_mindistance" );
		refSound.parms.maxDistance = args.GetFloat( "s_maxdistance" );
		refSound.parms.volume = args.GetFloat( "s_volume" );
		refSound.parms.shakes = args.GetFloat( "s_shakes" );

		args.GetVector_R( "origin", "0 0 0", refSound.origin );

		refSound.referenceSound = null;

		// if a diversity is not specified, every sound start will make
		// a random one.  Specifying diversity is usefull to make multiple
		// lights all share the same buzz sound offset, for instance.
		refSound.diversity = args.GetFloat( "s_diversity", "-1" );
		refSound.waitfortrigger = args.GetBool( "s_waitfortrigger" );

		if ( args.GetBool( "s_omni" ) ) {
			refSound.parms.soundShaderFlags |= SSF_OMNIDIRECTIONAL;
		}
		if ( args.GetBool( "s_looping" ) ) {
			refSound.parms.soundShaderFlags |= SSF_LOOPING;
		}
		if ( args.GetBool( "s_occlusion" ) ) {
			refSound.parms.soundShaderFlags |= SSF_NO_OCCLUSION;
		}
		if ( args.GetBool( "s_global" ) ) {
			refSound.parms.soundShaderFlags |= SSF_GLOBAL;
		}
		if ( args.GetBool( "s_unclamped" ) ) {
			refSound.parms.soundShaderFlags |= SSF_UNCLAMPED;
		}
		refSound.parms.soundClass = args.GetInt( "s_soundClass" );

		temp = args.GetString( "s_shader" );
		if ( temp /*[0] != '\0' */ ) {
			refSound.shader = declManager.FindSound( temp );
		}
	}


/////*
////=============
////idGameEdit::GetSelectedEntities
////=============
////*/
////int idGameEdit::GetSelectedEntities( idEntity *list[], int max ) {
////	int num = 0;
////	var ent:idEntity
////
////	for( ent = gameLocal.spawnedEntities.Next(); ent != NULL; ent = ent.spawnNode.Next() ) {
////		if ( ent.fl.selected ) {
////			list[num++] = ent;
////			if ( num >= max ) {
////				break;
////			}
////		}
////	}
////	return num;
////}
////
/////*
////=============
////idGameEdit::TriggerSelected
////=============
////*/
////void idGameEdit::TriggerSelected() {
////	var ent:idEntity
////	for( ent = gameLocal.spawnedEntities.Next(); ent != NULL; ent = ent.spawnNode.Next() ) {
////		if ( ent.fl.selected ) {
////			ent.ProcessEvent( &EV_Activate, gameLocal.GetLocalPlayer() );
////		}
////	}
////}
////
/////*
////================
////idGameEdit::ClearEntitySelection
////================
////*/
////void idGameEdit::ClearEntitySelection() {
////	var ent:idEntity
////
////	for( ent = gameLocal.spawnedEntities.Next(); ent != NULL; ent = ent.spawnNode.Next() ) {
////		ent.fl.selected = false;
////	}
////	gameLocal.editEntities.ClearSelectedEntities();
////}
////
/////*
////================
////idGameEdit::AddSelectedEntity
////================
////*/
////void idGameEdit::AddSelectedEntity( ent:idEntity ) {
////	if ( ent ) {
////		gameLocal.editEntities.AddSelectedEntity( ent );
////	}
////}
////
/////*
////================
////idGameEdit::FindEntityDefDict
////================
////*/
////const idDict *idGameEdit::FindEntityDefDict( name:string, bool makeDefault ) const {
////	return gameLocal.FindEntityDefDict( name, makeDefault );
////}
////
/////*
////================
////idGameEdit::SpawnEntityDef
////================
////*/
////void idGameEdit::SpawnEntityDef( const idDict &args, idEntity **ent ) {
////	gameLocal.SpawnEntityDef( args, ent );
////}
////
/////*
////================
////idGameEdit::FindEntity
////================
////*/
////idEntity *idGameEdit::FindEntity( name:string ) const {
////	return gameLocal.FindEntity( name ); 
////}
////
/////*
////=============
////idGameEdit::GetUniqueEntityName
////
////generates a unique name for a given classname
////=============
////*/
////const char *idGameEdit::GetUniqueEntityName( const char *classname ) const {
////	int			id;
////	static char	name[1024];
////
////	// can only have MAX_GENTITIES, so if we have a spot available, we're guaranteed to find one
////	for( id = 0; id < MAX_GENTITIES; id++ ) {
////		idStr::snPrintf( name, sizeof( name ), "%s_%d", classname, id );
////		if ( !gameLocal.FindEntity( name ) ) {
////			return name;
////		}
////	}
////
////	// id == MAX_GENTITIES + 1, which can't be in use if we get here
////	idStr::snPrintf( name, sizeof( name ), "%s_%d", classname, id );
////	return name;
////}
////
/////*
////================
////idGameEdit::EntityGetOrigin
////================
////*/
////void  idGameEdit::EntityGetOrigin( ent:idEntity, idVec3 &org ) const {
////	if ( ent ) {
////		org = ent.GetPhysics().GetOrigin();
////	}
////}
////
/////*
////================
////idGameEdit::EntityGetAxis
////================
////*/
////void idGameEdit::EntityGetAxis( ent:idEntity, idMat3 &axis ) const {
////	if ( ent ) {
////		axis = ent.GetPhysics().GetAxis();
////	}
////}
////
/////*
////================
////idGameEdit::EntitySetOrigin
////================
////*/
////void idGameEdit::EntitySetOrigin( ent:idEntity, const idVec3 &org ) {
////	if ( ent ) {
////		ent.SetOrigin( org );
////	}
////}
////
/////*
////================
////idGameEdit::EntitySetAxis
////================
////*/
////void idGameEdit::EntitySetAxis( ent:idEntity, const idMat3 &axis ) {
////	if ( ent ) {
////		ent.SetAxis( axis );
////	}
////}
////
/////*
////================
////idGameEdit::EntitySetColor
////================
////*/
////void idGameEdit::EntitySetColor( ent:idEntity, const idVec3 color ) {
////	if ( ent ) {
////		ent.SetColor( color );
////	}
////}
////
/////*
////================
////idGameEdit::EntityTranslate
////================
////*/
////void idGameEdit::EntityTranslate( ent:idEntity, const idVec3 &org ) {
////	if ( ent ) {
////		ent.GetPhysics().Translate( org );
////	}
////}
////
/////*
////================
////idGameEdit::EntityGetSpawnArgs
////================
////*/
////const idDict *idGameEdit::EntityGetSpawnArgs( ent:idEntity ) const {
////	if ( ent ) {
////		return &ent.spawnArgs;
////	}
////	return NULL;
////}
////
/////*
////================
////idGameEdit::EntityUpdateChangeableSpawnArgs
////================
////*/
////void idGameEdit::EntityUpdateChangeableSpawnArgs( ent:idEntity, const idDict *dict ) {
////	if ( ent ) {
////		ent.UpdateChangeableSpawnArgs( dict );
////	}
////}
////
/////*
////================
////idGameEdit::EntityChangeSpawnArgs
////================
////*/
////void idGameEdit::EntityChangeSpawnArgs( ent:idEntity, const idDict *newArgs ) {
////	if ( ent ) {
////		for ( int i = 0 ; i < newArgs.GetNumKeyVals () ; i ++ ) {
////			const idKeyValue *kv = newArgs.GetKeyVal( i );
////	        
////			if ( kv.GetValue().Length() > 0 ) {
////				ent.spawnArgs.Set ( kv.GetKey() ,kv.GetValue() );
////			} else {
////				ent.spawnArgs.Delete ( kv.GetKey() );
////			}
////		}
////	}
////}
////
/////*
////================
////idGameEdit::EntityUpdateVisuals
////================
////*/
////void idGameEdit::EntityUpdateVisuals( ent:idEntity ) {
////	if ( ent ) {
////		ent.UpdateVisuals();
////	}
////}
////
/////*
////================
////idGameEdit::EntitySetModel
////================
////*/
////void idGameEdit::EntitySetModel( ent:idEntity, const char *val ) {
////	if ( ent ) {
////		ent.spawnArgs.Set( "model", val );
////		ent.SetModel( val );
////	}
////}
////
/////*
////================
////idGameEdit::EntityStopSound
////================
////*/
////void idGameEdit::EntityStopSound( ent:idEntity ) {
////	if ( ent ) {
////		ent.StopSound( SND_CHANNEL_ANY, false );
////	}
////}
////
/////*
////================
////idGameEdit::EntityDelete
////================
////*/
////void idGameEdit::EntityDelete( ent:idEntity ) {
////	delete ent;
////}
////
/////*
////================
////idGameEdit::PlayerIsValid
////================
////*/
////bool idGameEdit::PlayerIsValid() const {
////	return ( gameLocal.GetLocalPlayer() != NULL );
////}
////
/////*
////================
////idGameEdit::PlayerGetOrigin
////================
////*/
////void idGameEdit::PlayerGetOrigin( idVec3 &org ) const {
////	org = gameLocal.GetLocalPlayer().GetPhysics().GetOrigin();
////}
////
/////*
////================
////idGameEdit::PlayerGetAxis
////================
////*/
////void idGameEdit::PlayerGetAxis( idMat3 &axis ) const {
////	axis = gameLocal.GetLocalPlayer().GetPhysics().GetAxis();
////}
////
/////*
////================
////idGameEdit::PlayerGetViewAngles
////================
////*/
////void idGameEdit::PlayerGetViewAngles( angles:idAngles ) const {
////	angles = gameLocal.GetLocalPlayer().viewAngles;
////}
////
/////*
////================
////idGameEdit::PlayerGetEyePosition
////================
////*/
////void idGameEdit::PlayerGetEyePosition( idVec3 &org ) const {
////	org = gameLocal.GetLocalPlayer().GetEyePosition();
////}
////
////
/////*
////================
////idGameEdit::MapGetEntityDict
////================
////*/
////const idDict *idGameEdit::MapGetEntityDict( name:string ) const {
////	idMapFile *mapFile = gameLocal.GetLevelMap();
////	if ( mapFile && name && *name ) {
////		idMapEntity *mapent = mapFile.FindEntity( name );
////		if ( mapent ) {
////			return &mapent.epairs;
////		}
////	}
////	return NULL;
////}
////
/////*
////================
////idGameEdit::MapSave
////================
////*/
////void idGameEdit::MapSave( const char *path ) const {
////	idMapFile *mapFile = gameLocal.GetLevelMap();
////	if (mapFile) {
////		mapFile.Write( (path) ? path : mapFile.GetName(), ".map");
////	}
////}
////
/////*
////================
////idGameEdit::MapSetEntityKeyVal
////================
////*/
////void idGameEdit::MapSetEntityKeyVal( name:string, const char *key, const char *val ) const {
////	idMapFile *mapFile = gameLocal.GetLevelMap();
////	if ( mapFile && name && *name ) {
////		idMapEntity *mapent = mapFile.FindEntity( name );
////		if ( mapent ) {
////			mapent.epairs.Set( key, val );
////		}
////	}
////}
////
/////*
////================
////idGameEdit::MapCopyDictToEntity
////================
////*/
////void idGameEdit::MapCopyDictToEntity( name:string, const idDict *dict ) const {
////	idMapFile *mapFile = gameLocal.GetLevelMap();
////	if ( mapFile && name && *name ) {
////		idMapEntity *mapent = mapFile.FindEntity( name );
////		if ( mapent ) {
////			for ( int i = 0; i < dict.GetNumKeyVals(); i++ ) {
////				const idKeyValue *kv = dict.GetKeyVal( i );
////				const char *key = kv.GetKey();
////				const char *val = kv.GetValue();
////				mapent.epairs.Set( key, val );
////			}
////		}
////	}
////}
////
////
////
/////*
////================
////idGameEdit::MapGetUniqueMatchingKeyVals
////================
////*/
////int idGameEdit::MapGetUniqueMatchingKeyVals( const char *key, const char *list[], int max ) const {
////	idMapFile *mapFile = gameLocal.GetLevelMap();
////	int count = 0;
////	if ( mapFile ) {
////		for ( int i = 0; i < mapFile.GetNumEntities(); i++ ) {
////			idMapEntity *ent = mapFile.GetEntity( i );
////			if ( ent ) {
////				const char *k = ent.epairs.GetString( key );
////				if ( k && *k && count < max ) {
////					list[count++] = k;
////				}
////			}
////		}
////	}
////	return count;
////}
////
/////*
////================
////idGameEdit::MapAddEntity
////================
////*/
////void idGameEdit::MapAddEntity( const idDict *dict ) const {
////	idMapFile *mapFile = gameLocal.GetLevelMap();
////	if ( mapFile ) {
////		idMapEntity *ent = new idMapEntity();
////		ent.epairs = *dict;
////		mapFile.AddEntity( ent );
////	}
////}
////
/////*
////================
////idGameEdit::MapRemoveEntity
////================
////*/
////void idGameEdit::MapRemoveEntity( name:string ) const {
////	idMapFile *mapFile = gameLocal.GetLevelMap();
////	if ( mapFile ) {
////		idMapEntity *ent = mapFile.FindEntity( name );
////		if ( ent ) {
////			mapFile.RemoveEntity( ent );
////		}
////	}
////}
////
////
/////*
////================
////idGameEdit::MapGetEntitiesMatchignClassWithString
////================
////*/
////int idGameEdit::MapGetEntitiesMatchingClassWithString( const char *classname, const char *match, const char *list[], const int max ) const {
////	idMapFile *mapFile = gameLocal.GetLevelMap();
////	int count = 0;
////	if ( mapFile ) {
////		int entCount = mapFile.GetNumEntities();
////		for ( int i = 0 ; i < entCount; i++ ) {
////			idMapEntity *ent = mapFile.GetEntity(i);
////			if (ent) {
////				idStr work = ent.epairs.GetString("classname");
////				if ( work.Icmp( classname ) == 0 ) {
////					if ( match && *match ) { 
////						work = ent.epairs.GetString( "soundgroup" );
////						if ( count < max && work.Icmp( match ) == 0 ) {
////							list[count++] = ent.epairs.GetString( "name" );
////						}
////					} else if ( count < max ) {
////						list[count++] = ent.epairs.GetString( "name" );
////					}
////				}
////			}
////		}
////	}
////	return count;
////}
////
////
/////*
////================
////idGameEdit::MapEntityTranslate
////================
////*/
////void idGameEdit::MapEntityTranslate( name:string, const idVec3 &v ) const {
////	idMapFile *mapFile = gameLocal.GetLevelMap();
////	if ( mapFile && name && *name ) {
////		idMapEntity *mapent = mapFile.FindEntity( name );
////		if ( mapent ) {
////			idVec3 origin;
////			mapent.epairs.GetVector( "origin", "", origin );
////			origin += v;
////			mapent.epairs.SetVector( "origin", origin );
////		}
////	}
////}

	// Anim_Blend.cpp:

	///*
	//=====================
	//idGameEdit::ANIM_GetModelFromEntityDef
	//=====================
	//*/
	//idRenderModel *idGameEdit::ANIM_GetModelFromEntityDef( const idDict *args ) {
	//	idRenderModel *model;
	//	const idDeclModelDef *modelDef;
	//
	//	model = NULL;
	//
	//	idStr name = args.GetString( "model" );
	//	modelDef = static_cast<const idDeclModelDef *>( declManager.FindType( declType_t.DECL_MODELDEF, name, false ) );
	//	if ( modelDef ) {
	//		model = modelDef.ModelHandle();
	//	}
	//
	//	if ( !model ) {
	//		model = renderModelManager.FindModel( name );
	//	}
	//
	//	if ( model && model.IsDefaultModel() ) {
	//		return NULL;
	//	}
	//
	//	return model;
	//}
	//
	///*
	//=====================
	//idGameEdit::ANIM_GetModelFromEntityDef
	//=====================
	//*/
	//idRenderModel *idGameEdit::ANIM_GetModelFromEntityDef( const char *classname ) {
	//	const idDict *args;
	//
	//	args = gameLocal.FindEntityDefDict( classname, false );
	//	if ( !args ) {
	//		return NULL;
	//	}
	//
	//	return ANIM_GetModelFromEntityDef( args );
	//}
	//
	///*
	//=====================
	//idGameEdit::ANIM_GetModelOffsetFromEntityDef
	//=====================
	//*/
	//const idVec3 &idGameEdit::ANIM_GetModelOffsetFromEntityDef( const char *classname ) {
	//	const idDict *args;
	//	const idDeclModelDef *modelDef;
	//
	//	args = gameLocal.FindEntityDefDict( classname, false );
	//	if ( !args ) {
	//		return vec3_origin;
	//	}
	//
	//	modelDef = ANIM_GetModelDefFromEntityDef( args );
	//	if ( !modelDef ) {
	//		return vec3_origin;
	//	}
	//
	//	return modelDef.GetVisualOffset();
	//}
	//
	///*
	//=====================
	//idGameEdit::ANIM_GetModelFromName
	//=====================
	//*/
	//idRenderModel *idGameEdit::ANIM_GetModelFromName( const char *modelName ) {
	//	const idDeclModelDef *modelDef;
	//	idRenderModel *model;
	//
	//	model = NULL;
	//	modelDef = static_cast<const idDeclModelDef *>( declManager.FindType( declType_t.DECL_MODELDEF, modelName, false ) );
	//	if ( modelDef ) {
	//		model = modelDef.ModelHandle();
	//	}
	//	if ( !model ) {
	//		model = renderModelManager.FindModel( modelName );
	//	}
	//	return model;
	//}
	//
	///*
	//=====================
	//idGameEdit::ANIM_GetAnimFromEntityDef
	//=====================
	//*/
	//const idMD5Anim *idGameEdit::ANIM_GetAnimFromEntityDef( const char *classname, const char *animname ) {
	//	const idDict *args;
	//	const idMD5Anim *md5anim;
	//	const idAnim *anim;
	//	int	animNum;
	//	const char	*modelname;
	//	const idDeclModelDef *modelDef;
	//
	//	args = gameLocal.FindEntityDefDict( classname, false );
	//	if ( !args ) {
	//		return NULL;
	//	}
	//
	//	md5anim = NULL;
	//	modelname = args.GetString( "model" );
	//	modelDef = static_cast<const idDeclModelDef *>( declManager.FindType( declType_t.DECL_MODELDEF, modelname, false ) );
	//	if ( modelDef ) {
	//		animNum = modelDef.GetAnim( animname );
	//		if ( animNum ) {
	//			anim = modelDef.GetAnim( animNum );
	//			if ( anim ) {
	//				md5anim = anim.MD5Anim( 0 );
	//			}
	//		}
	//	}
	//	return md5anim;
	//}
	//
	///*
	//=====================
	//idGameEdit::ANIM_GetNumAnimsFromEntityDef
	//=====================
	//*/
	//int idGameEdit::ANIM_GetNumAnimsFromEntityDef( const idDict *args ) {
	//	const char *modelname;
	//	const idDeclModelDef *modelDef;
	//
	//	modelname = args.GetString( "model" );
	//	modelDef = static_cast<const idDeclModelDef *>( declManager.FindType( declType_t.DECL_MODELDEF, modelname, false ) );
	//	if ( modelDef ) {
	//		return modelDef.NumAnims();
	//	}
	//	return 0;
	//}
	//
	///*
	//=====================
	//idGameEdit::ANIM_GetAnimNameFromEntityDef
	//=====================
	//*/
	//const char *idGameEdit::ANIM_GetAnimNameFromEntityDef( const idDict *args, int animNum ) {
	//	const char *modelname;
	//	const idDeclModelDef *modelDef;
	//
	//	modelname = args.GetString( "model" );
	//	modelDef = static_cast<const idDeclModelDef *>( declManager.FindType( declType_t.DECL_MODELDEF, modelname, false ) );
	//	if ( modelDef ) {
	//		const idAnim* anim = modelDef.GetAnim( animNum );
	//		if ( anim ) {
	//			return anim.FullName();
	//		}
	//	}
	//	return "";
	//}
	//
	///*
	//=====================
	//idGameEdit::ANIM_GetAnim
	//=====================
	//*/
	//const idMD5Anim *idGameEdit::ANIM_GetAnim( const char *fileName ) {
	//	return animationLib.GetAnim( fileName );
	//}
	//
	///*
	//=====================
	//idGameEdit::ANIM_GetLength
	//=====================
	//*/
	//int	idGameEdit::ANIM_GetLength( anim:idMD5Anim ) {
	//	if ( !anim ) {
	//		return 0;
	//	}
	//	return anim.Length();
	//}
	//
	///*
	//=====================
	//idGameEdit::ANIM_GetNumFrames
	//=====================
	//*/
	//int idGameEdit::ANIM_GetNumFrames( anim:idMD5Anim ) {
	//	if ( !anim ) {
	//		return 0;
	//	}
	//	return anim.NumFrames();
	//}
	//
	/*
	=====================
	idGameEdit::ANIM_CreateAnimFrame
	=====================
	*/
	ANIM_CreateAnimFrame ( model: idRenderModel, anim: idMD5Anim, /* int */numJoints: number, joints: idJointMat[], /*int*/time: number, offset: idVec3, remove_origin_offset: boolean ): void {
		var i: number /*int*/;
		var frame = new frameBlend_t;
		var md5joints: idMD5Joint[];
		var index: number[];

		if ( !model || model.IsDefaultModel ( ) || !anim ) {
			return;
		}

		if ( numJoints != model.NumJoints ( ) ) {
			gameLocal.Error( "ANIM_CreateAnimFrame: different # of joints in renderEntity_t than in model (%s)", model.Name ( ) );
		}

		if ( !model.NumJoints ( ) ) {
			// FIXME: Print out a warning?
			return;
		}

		if ( !joints ) {
			gameLocal.Error( "ANIM_CreateAnimFrame: NULL joint frame pointer on model (%s)", model.Name ( ) );
		}

		if ( numJoints != anim.NumJoints ( ) ) {
			gameLocal.Warning( "Model '%s' has different # of joints than anim '%s'", model.Name ( ), anim.Name ( ) );
			for ( i = 0; i < numJoints; i++ ) {
				todoThrow ( );
				//joints[i].SetRotation(mat3_identity);
				//joints[i].SetTranslation(offset);
			}
			return;
		}

		// create index for all joints
		index = Array.apply( [], new Int32Array( numJoints ) ); //( int * )_alloca16( numJoints * sizeof( int ) );
		for ( i = 0; i < numJoints; i++ ) {
			index[i] = i;
		}

		// create the frame
		anim.ConvertTimeToFrame( time, 1, frame );
		var jointFrame = newStructArray<idJointQuat>( idJointQuat, numJoints ); // ( idJointQuat *) _alloca16(numJoints * sizeof( *jointFrame ));
		anim.GetInterpolatedFrame( frame, jointFrame, index, numJoints );

		// convert joint quaternions to joint matrices
		SIMDProcessor.ConvertJointQuatsToJointMats( joints, jointFrame, numJoints );

		// first joint is always root of entire hierarchy
		if ( remove_origin_offset ) {
			joints[0].SetTranslation( offset );
		} else {
			joints[0].SetTranslation( joints[0].ToVec3 ( ).opAddition( offset ) );
		}

		// transform the children
		md5joints = model.GetJoints ( );
		for ( i = 1; i < numJoints; i++ ) {
			joints[i].opMultiplicationAssignment( joints[md5joints.indexOf( md5joints[i].parent ) /*md5joints[i].parent - md5joints*/] );
		}
	}
//
///*
//=====================
//idGameEdit::ANIM_CreateMeshForAnim
//=====================
//*/
//idRenderModel *idGameEdit::ANIM_CreateMeshForAnim( idRenderModel *model, const char *classname, const char *animname, int frame, bool remove_origin_offset ) {
//	renderEntity_t			ent;
//	const idDict			*args;
//	const char				*temp;
//	idRenderModel			*newmodel;
//	const idMD5Anim 		*md5anim;
//	idStr					filename;
//	idStr					extension;
//	const idAnim			*anim;
//	int						animNum;
//	idVec3					offset;
//	const idDeclModelDef	*modelDef;
//
//	if ( !model || model.IsDefaultModel() ) {
//		return NULL;
//	}
//
//	args = gameLocal.FindEntityDefDict( classname, false );
//	if ( !args ) {
//		return NULL;
//	}
//
//	memset( &ent, 0, sizeof( ent ) );
//
//	ent.bounds.Clear();
//	ent.suppressSurfaceInViewID = 0;
//
//	modelDef = ANIM_GetModelDefFromEntityDef( args );
//	if ( modelDef ) {
//		animNum = modelDef.GetAnim( animname );
//		if ( !animNum ) {
//			return NULL;
//		}
//		anim = modelDef.GetAnim( animNum );
//		if ( !anim ) {
//			return NULL;
//		}
//		md5anim = anim.MD5Anim( 0 );
//		ent.customSkin = modelDef.GetDefaultSkin();
//		offset = modelDef.GetVisualOffset();
//	} else {
//		filename = animname;
//		filename.ExtractFileExtension( extension );
//		if ( !extension.Length() ) {
//			animname = args.GetString( va( "anim %s", animname ) );
//		}
//
//		md5anim = animationLib.GetAnim( animname );
//		offset.Zero();
//	}
//
//	if ( !md5anim ) {
//		return NULL;
//	}
//
//	temp = args.GetString( "skin", "" );
//	if ( temp[ 0 ] ) {
//		ent.customSkin = declManager.FindSkin( temp );
//	}
//
//	ent.numJoints = model.NumJoints();
//	ent.joints = ( idJointMat * )Mem_Alloc16( ent.numJoints * sizeof( *ent.joints ) );
//
//	ANIM_CreateAnimFrame( model, md5anim, ent.numJoints, ent.joints, FRAME2MS( frame ), offset, remove_origin_offset );
//
//	newmodel = model.InstantiateDynamicModel( &ent, NULL, NULL );
//
//	Mem_Free16( ent.joints );
//	ent.joints = NULL;
//
//	return newmodel;
//}


// from Light
	/*
	================
	idGameEdit::ParseSpawnArgsToRenderLight

	parse the light parameters
	this is the canonical renderLight parm parsing,
	which should be used by dmap and the editor
	================
	*/
	ParseSpawnArgsToRenderLight ( args: idDict, renderLight: renderLight_t ): void {
		var /*bool	*/gotTarget: boolean, gotUp: boolean, gotRight: boolean;
		var texture: string;
		var color = new idVec3;

		renderLight.memset0 ( );

		if ( !args.GetVector_R( "light_origin", "", renderLight.origin ) ) {
			args.GetVector_R( "origin", "", renderLight.origin );
		}

		gotTarget = args.GetVector_R( "light_target", "", renderLight.target );
		gotUp = args.GetVector_R( "light_up", "", renderLight.up );
		gotRight = args.GetVector_R( "light_right", "", renderLight.right );
		args.GetVector_R( "light_start", "0 0 0", renderLight.start );
		if ( !args.GetVector_R( "light_end", "", renderLight.end ) ) {
			renderLight.end = renderLight.target;
		}

		// we should have all of the target/right/up or none of them
		if ( ( gotTarget || gotUp || gotRight ) != ( gotTarget && gotUp && gotRight ) ) {
			gameLocal.Printf( "Light at (%f,%f,%f) has bad target info\n",
				renderLight.origin[0], renderLight.origin[1], renderLight.origin[2] );
			return;
		}

		if ( !gotTarget ) {
			renderLight.pointLight = true;

			// allow an optional relative center of light and shadow offset
			args.GetVector_R( "light_center", "0 0 0", renderLight.lightCenter );

			// create a point light
			if ( !args.GetVector_R( "light_radius", "300 300 300", renderLight.lightRadius ) ) {
				var /*float */radius: number;

				radius = args.GetFloat( "light", "300" );
				renderLight.lightRadius[0] = renderLight.lightRadius[1] = renderLight.lightRadius[2] = radius;
			}
		}

		// get the rotation matrix in either full form, or single angle form
		var angles = new idAngles;

		var mat = new idMat3;
		if ( !args.GetMatrix_R( "light_rotation", "1 0 0 0 1 0 0 0 1", mat ) ) {
			if ( !args.GetMatrix_R( "rotation", "1 0 0 0 1 0 0 0 1", mat ) ) {
				angles[1] = args.GetFloat( "angle", "0" );
				angles[0] = 0;
				angles[1] = idMath.AngleNormalize360( angles[1] );
				angles[2] = 0;
				mat.opEquals( angles.ToMat3 ( ) );
			}
		}

		// fix degenerate identity matrices
		mat[0].FixDegenerateNormal ( );
		mat[1].FixDegenerateNormal ( );
		mat[2].FixDegenerateNormal ( );

		renderLight.axis.opEquals( mat );

		// check for other attributes
		args.GetVector_R( "_color", "1 1 1", color );
		renderLight.shaderParms[SHADERPARM_RED] = color[0];
		renderLight.shaderParms[SHADERPARM_GREEN] = color[1];
		renderLight.shaderParms[SHADERPARM_BLUE] = color[2];
		renderLight.shaderParms[SHADERPARM_TIMESCALE] = args.GetFloat( "shaderParm3", "1" );
		var $timeOffset = new R<number> ( );
		if ( !args.GetFloat_R( "shaderParm4", "0", $timeOffset ) ) {
			// offset the start time of the shader to sync it to the game time
			renderLight.shaderParms[SHADERPARM_TIMEOFFSET] = -MS2SEC( gameLocal.time );
		} else {
			renderLight.shaderParms[SHADERPARM_TIMEOFFSET] = $timeOffset.$;
		}

		renderLight.shaderParms[5] = args.GetFloat( "shaderParm5", "0" );
		renderLight.shaderParms[6] = args.GetFloat( "shaderParm6", "0" );
		renderLight.shaderParms[SHADERPARM_MODE] = args.GetFloat( "shaderParm7", "0" );
		renderLight.noShadows = args.GetBool( "noshadows", "0" );
		renderLight.noSpecular = args.GetBool( "nospecular", "0" );
		renderLight.parallel = args.GetBool( "parallel", "0" );

		texture = args.GetString( "texture", "lights/squarelight1" );
		// allow this to be NULL
		renderLight.shader = declManager.FindMaterial( texture, false );
	}

}

var gameEditLocal = new idGameEdit;
var gameEdit/*:idGameEdit*/ = gameEditLocal;


//
//extern idGameEdit *				gameEdit;
//

/*
===============================================================================

	Game API.

===============================================================================
*/

var GAME_API_VERSION		= 8;

class gameImport_t {
	version: number; // API version						  					
	//sys: idSys;					// non-portable system services		  /
	common: idCommon; // common							
	cmdSystem: idCmdSystem; // console command system			
	cvarSystem: idCVarSystem; // console variable system		
	fileSystem: idFileSystem; // file system					
	//networkSystem: idNetworkSystem;			// network system				
	renderSystem: idRenderSystem; // render system				
	//soundSystem: idSoundSystem;			// sound system						
	renderModelManager: idRenderModelManager; // render model manager
	uiManager: idUserInterfaceManager; // user interface manager
	declManager: idDeclManager; // declaration manager				 
	//AASFileManager: idAASFileManager;			// AAS file manager			
	collisionModelManager: idCollisionModelManager;	// collision model manager
}


class gameExport_t {
	version:number;				// API version
	game:idGame;					// interface to run the game
//	idGameEdit *				gameEdit;				// interface for in-game editing
}

//
//extern "C" {
//typedef gameExport_t * (*GetGameAPI_t)( gameImport_t *import );
//}
//
//#endif /* !__GAME_H__ */
