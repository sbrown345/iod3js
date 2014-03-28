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

////#include "../idlib/precompiled.h"
////#pragma hdrstop

////#include "Game_local.h"

////#ifdef GAME_DLL

// not needed, can access the other ones anyway
////idSys *						sys = null;
////idCommon *					common = null;
////idCmdSystem *				cmdSystem = null;
////idCVarSystem *				cvarSystem = null;
////idFileSystem *				fileSystem = null;
////var networkSystem: idNetworkSystem = null;
////idRenderSystem *			renderSystem = null;
////idSoundSystem *				soundSystem = null;
////var renderModelManager:idRenderModelManager = null;
////idUserInterfaceManager *	uiManager = null;
////idDeclManager *				declManager = null;
////idAASFileManager *			AASFileManager = null;
////var collisionModelManager:idCollisionModelManager = null;
////idCVar *					idCVar::staticVars = null;

//var com_forceGenericSIMD = new idCVar( "com_forceGenericSIMD", "0", CVAR_BOOL | CVAR_SYSTEM, "force generic platform independent SIMD" );

////#endif

var gameRenderWorld: idRenderWorldLocal  = null;		// all drawing is done to this world
var gameSoundWorld: idSoundWorld = null;		// all audio goes to this world

var gameExport = new gameExport_t;

// global animation lib
var animationLib = new idAnimManager;

////const char *idGameLocal::sufaceTypeNames[ MAX_SURFACE_TYPES ] = {
////	"none",	"metal", "stone", "flesh", "wood", "cardboard", "liquid", "glass", "plastic",
////	"ricochet", "surftype10", "surftype11", "surftype12", "surftype13", "surftype14", "surftype15"
////};

/*
===========
GetGameAPI
============
*/
//#if __MWERKS__
//#pragma export on
//#endif
//#if __GNUC__ >= 4
//#pragma GCC visibility push(default)
//#endif
//extern "C" gameExport_t *GetGameAPI( gameImport_t *import ) {
//#if __MWERKS__
//#pragma export off
//#endif
function GetGameAPI ( $import: gameImport_t ) {
	if ( $import.version == GAME_API_VERSION ) {
		// already ref this stuff...

		// set interface pointers used by the game
		//sys							= $import.sys;
		//common						= $import.common;
		//cmdSystem					= $import.cmdSystem;
		//cvarSystem					= $import.cvarSystem;
		//fileSystem					= $import.fileSystem;
		//networkSystem				= $import.networkSystem;
		//renderSystem				= $import.renderSystem;
		//soundSystem					= $import.soundSystem;
		//renderModelManager			= $import.renderModelManager;
		//uiManager					= $import.uiManager;
		//declManager					= $import.declManager;
		//AASFileManager				= $import.AASFileManager;
		//collisionModelManager		= $import.collisionModelManager;
	}

	// set interface pointers used by idLib
	//idLib::sys					= sys;
	//idLib::common				= common;
	//idLib::cvarSystem			= cvarSystem;
	//idLib::fileSystem			= fileSystem;

	// setup export interface
	gameExport.version = GAME_API_VERSION;
	gameExport.game = game;
	todo( "gameExport.gameEdit = gameEdit;" );

	return gameExport;
}
//#if __GNUC__ >= 4
//#pragma GCC visibility pop
//#endif

/////*
////===========
////TestGameAPI
////============
////*/
////void TestGameAPI( ) {
////	gameImport_t testImport;
////	gameExport_t testExport;

////	testImport.sys						= ::sys;
////	testImport.common					= ::common;
////	testImport.cmdSystem				= ::cmdSystem;
////	testImport.cvarSystem				= ::cvarSystem;
////	testImport.fileSystem				= ::fileSystem;
////	testImport.networkSystem			= ::networkSystem;
////	testImport.renderSystem				= ::renderSystem;
////	testImport.soundSystem				= ::soundSystem;
////	testImport.renderModelManager		= ::renderModelManager;
////	testImport.uiManager				= ::uiManager;
////	testImport.declManager				= ::declManager;
////	testImport.AASFileManager			= ::AASFileManager;
////	testImport.collisionModelManager	= ::collisionModelManager;

////	testExport = *GetGameAPI( &testImport );
////}



// the rest of the engine will only reference the "game" variable, while all local aspects stay hidden
var gameLocal = new idGameLocal;
var game: idGame = gameLocal;	// statically pointed at an idGameLocal