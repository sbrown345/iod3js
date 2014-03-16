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
////#include "../../idlib/precompiled.h"
////#pragma hdrstop
////
////#include "../Game_local.h"
////
////#if defined( _DEBUG )
var BUILD_DEBUG = "-debug";
////	#define	BUILD_DEBUG	"-debug"
////#else
////	#define	BUILD_DEBUG "-release"
////#endif
////
/*

All game cvars should be defined here.

*/

var si_gameTypeArgs: string[] = ["singleplayer", "deathmatch", "Tourney", "Team DM", "Last Man" /*, NULL */];
var si_readyArgs:string[] = ["Not Ready", "Ready"/*, NULL */];
var si_spectateArgs: string[] = ["Play", "Spectate"/*, NULL */];

var ui_skinArgs: string[] = ["skins/characters/player/marine_mp", "skins/characters/player/marine_mp_red", "skins/characters/player/marine_mp_blue", "skins/characters/player/marine_mp_green", "skins/characters/player/marine_mp_yellow"/*, NULL */];
var ui_teamArgs: string[] = ["Red", "Blue"/*, NULL */];

class gameVersion_s {
	constructor ( ) {
		this.$string = sprintf( "%s.%d%s %s %s", ENGINE_VERSION, BUILD_NUMBER, BUILD_DEBUG, BUILD_STRING, __DATE__, __TIME__ );
	}
	$string:string;
};

var gameVersion = new gameVersion_s;

var g_version = new idCVar ( 					"g_version",				gameVersion.$string,	CVAR_GAME | CVAR_ROM, "game version" );
////
////// noset vars
var gamename = new idCVar ( 					"gamename",					GAME_VERSION,	CVAR_GAME | CVAR_SERVERINFO | CVAR_ROM, "" );
var gamedate = new idCVar ( 					"gamedate",					__DATE__,		CVAR_GAME | CVAR_ROM, "" );
////
////// server info
var si_name = new idCVar ( 						"si_name",					"DOOM Server",	CVAR_GAME | CVAR_SERVERINFO | CVAR_ARCHIVE, "name of the server" );
var si_gameType = new idCVar ( 					"si_gameType",			si_gameTypeArgs[ 0 ],CVAR_GAME | CVAR_SERVERINFO | CVAR_ARCHIVE, "game type - singleplayer, deathmatch, Tourney, Team DM or Last Man", si_gameTypeArgs, ArgCompletion_String_Template(si_gameTypeArgs) );
var si_map = new idCVar ( 						"si_map",					"game/mp/d3dm1",CVAR_GAME | CVAR_SERVERINFO | CVAR_ARCHIVE, "map to be played next on server", ArgCompletion_MapName);
var si_maxPlayers = new idCVar ( 				"si_maxPlayers",			"4",			CVAR_GAME | CVAR_SERVERINFO | CVAR_ARCHIVE | CVAR_INTEGER, "max number of players allowed on the server", 1, 4 );
var si_fragLimit = new idCVar ( 				"si_fragLimit",				"10",			CVAR_GAME | CVAR_SERVERINFO | CVAR_ARCHIVE | CVAR_INTEGER, "frag limit", 1, MP_PLAYER_MAXFRAGS );
var si_timeLimit = new idCVar ( 				"si_timeLimit",				"10",			CVAR_GAME | CVAR_SERVERINFO | CVAR_ARCHIVE | CVAR_INTEGER, "time limit in minutes", 0, 60 );
var si_teamDamage = new idCVar ( 				"si_teamDamage",			"0",			CVAR_GAME | CVAR_SERVERINFO | CVAR_ARCHIVE | CVAR_BOOL, "enable team damage" );
var si_warmup = new idCVar ( 					"si_warmup",				"0",			CVAR_GAME | CVAR_SERVERINFO | CVAR_ARCHIVE | CVAR_BOOL, "do pre-game warmup" );
var si_usePass = new idCVar ( 					"si_usePass",				"0",			CVAR_GAME | CVAR_SERVERINFO | CVAR_ARCHIVE | CVAR_BOOL, "enable client password checking" );
var si_pure = new idCVar ( 						"si_pure",					"1",			CVAR_GAME | CVAR_SERVERINFO | CVAR_BOOL, "server is pure and does not allow modified data" );
var si_spectators = new idCVar ( 				"si_spectators",			"1",			CVAR_GAME | CVAR_SERVERINFO | CVAR_ARCHIVE | CVAR_BOOL, "allow spectators or require all clients to play" );
var si_serverURL = new idCVar ( 				"si_serverURL",				"",				CVAR_GAME | CVAR_SERVERINFO | CVAR_ARCHIVE, "where to reach the server admins and get information about the server" );
//
//// user info
var ui_name = new idCVar ( 						"ui_name",					"Player",		CVAR_GAME | CVAR_USERINFO | CVAR_ARCHIVE, "player name" );
var ui_skin = new idCVar ( 						"ui_skin",				ui_skinArgs[ 0 ],	CVAR_GAME | CVAR_USERINFO | CVAR_ARCHIVE, "player skin", ui_skinArgs, ArgCompletion_String_Template(ui_skinArgs));
var ui_team = new idCVar ( 						"ui_team",				ui_teamArgs[0],		CVAR_GAME | CVAR_USERINFO | CVAR_ARCHIVE, "player team", ui_teamArgs, ArgCompletion_String_Template(ui_teamArgs) );
var ui_autoSwitch = new idCVar ( 				"ui_autoSwitch",			"1",			CVAR_GAME | CVAR_USERINFO | CVAR_ARCHIVE | CVAR_BOOL, "auto switch weapon" );
var ui_autoReload = new idCVar ( 				"ui_autoReload",			"1",			CVAR_GAME | CVAR_USERINFO | CVAR_ARCHIVE | CVAR_BOOL, "auto reload weapon" );
var ui_showGun = new idCVar ( 					"ui_showGun",				"1",			CVAR_GAME | CVAR_USERINFO | CVAR_ARCHIVE | CVAR_BOOL, "show gun" );
var ui_ready = new idCVar ( 					"ui_ready",				 si_readyArgs[0],		CVAR_GAME | CVAR_USERINFO,							"player is ready to start playing", ArgCompletion_String_Template(si_readyArgs) );
var ui_spectate = new idCVar ( 					"ui_spectate",			si_spectateArgs[0], CVAR_GAME | CVAR_USERINFO,								 "play or spectate", ArgCompletion_String_Template(si_spectateArgs) );
var ui_chat = new idCVar ( 						"ui_chat",					"0",			CVAR_GAME | CVAR_USERINFO | CVAR_BOOL | CVAR_ROM | CVAR_CHEAT, "player is chatting" );

// change anytime vars
var developer = new idCVar(					"developer",				"1",			CVAR_GAME | CVAR_BOOL, "" );

var r_aspectRatio = new idCVar( 				"r_aspectRatio",			"0",			CVAR_RENDERER | CVAR_INTEGER | CVAR_ARCHIVE, "aspect ratio of view:\n0 = 4:3\n1 = 16:9\n2 = 16:10", 0, 2 );

var g_cinematic = new idCVar(					"g_cinematic",				"1",			CVAR_GAME | CVAR_BOOL, "skips updating entities that aren't marked 'cinematic' '1' during cinematics" );
var g_cinematicMaxSkipTime = new idCVar(		"g_cinematicMaxSkipTime",	"600",			CVAR_GAME | CVAR_FLOAT, "# of seconds to allow game to run when skipping cinematic.  prevents lock-up when cinematic doesn't end.", 0, 3600 );

var DEFAULT_GRAVITY = 1066.0;
var DEFAULT_GRAVITY_STRING = "1066";
var DEFAULT_GRAVITY_VEC3 = new idVec3(0, 0, -DEFAULT_GRAVITY);

var g_muzzleFlash = new idCVar ( 				"g_muzzleFlash",			"1",			CVAR_GAME | CVAR_ARCHIVE | CVAR_BOOL, "show muzzle flashes" );
var g_projectileLights = new idCVar ( 			"g_projectileLights",		"1",			CVAR_GAME | CVAR_ARCHIVE | CVAR_BOOL, "show dynamic lights on projectiles" );
var g_bloodEffects = new idCVar ( 				"g_bloodEffects",			"1",			CVAR_GAME | CVAR_ARCHIVE | CVAR_BOOL, "show blood splats, sprays and gibs" );
var g_doubleVision = new idCVar ( 				"g_doubleVision",			"1",			CVAR_GAME | CVAR_ARCHIVE | CVAR_BOOL, "show double vision when taking damage" );
var g_monsters = new idCVar ( 					"g_monsters",				"1",			CVAR_GAME | CVAR_BOOL, "" );
var g_decals = new idCVar ( 					"g_decals",					"1",			CVAR_GAME | CVAR_ARCHIVE | CVAR_BOOL, "show decals such as bullet holes" );
var g_knockback = new idCVar ( 					"g_knockback",				"1000",			CVAR_GAME | CVAR_INTEGER, "" );
var g_skill = new idCVar ( 						"g_skill",					"1",			CVAR_GAME | CVAR_INTEGER, "" );
var g_nightmare = new idCVar ( 					"g_nightmare",				"0",			CVAR_GAME | CVAR_ARCHIVE | CVAR_BOOL, "if nightmare mode is allowed" );
var g_gravity = new idCVar ( 					"g_gravity",		DEFAULT_GRAVITY_STRING, CVAR_GAME | CVAR_FLOAT, "" );
var g_skipFX = new idCVar ( 					"g_skipFX",					"0",			CVAR_GAME | CVAR_BOOL, "" );
var g_skipParticles = new idCVar ( 				"g_skipParticles",			"0",			CVAR_GAME | CVAR_BOOL, "" );

var g_disasm = new idCVar ( 					"g_disasm",					"0",			CVAR_GAME | CVAR_BOOL, "disassemble script into base/script/disasm.txt on the local drive when script is compiled" );
var g_debugBounds = new idCVar ( 				"g_debugBounds",			"0",			CVAR_GAME | CVAR_BOOL, "checks for models with bounds > 2048" );
var g_debugAnim = new idCVar ( 					"g_debugAnim",				"-1",			CVAR_GAME | CVAR_INTEGER, "displays information on which animations are playing on the specified entity number.  set to -1 to disable." );
var g_debugMove = new idCVar ( 					"g_debugMove",				"0",			CVAR_GAME | CVAR_BOOL, "" );
var g_debugDamage = new idCVar ( 				"g_debugDamage",			"0",			CVAR_GAME | CVAR_BOOL, "" );
var g_debugWeapon = new idCVar ( 				"g_debugWeapon",			"0",			CVAR_GAME | CVAR_BOOL, "" );
var g_debugScript = new idCVar ( 				"g_debugScript",			"0",			CVAR_GAME | CVAR_BOOL, "" );
var g_debugMover = new idCVar ( 				"g_debugMover",				"0",			CVAR_GAME | CVAR_BOOL, "" );
var g_debugTriggers = new idCVar ( 				"g_debugTriggers",			"0",			CVAR_GAME | CVAR_BOOL, "" );
var g_debugCinematic = new idCVar ( 			"g_debugCinematic",			"0",			CVAR_GAME | CVAR_BOOL, "" );
var g_stopTime = new idCVar ( 					"g_stopTime",				"0",			CVAR_GAME | CVAR_BOOL, "" );
var g_damageScale = new idCVar ( 				"g_damageScale",			"1",			CVAR_GAME | CVAR_FLOAT | CVAR_ARCHIVE, "scale final damage on player by this factor" );
var g_armorProtection = new idCVar ( 			"g_armorProtection",		"0.3",			CVAR_GAME | CVAR_FLOAT | CVAR_ARCHIVE, "armor takes this percentage of damage" );
var g_armorProtectionMP = new idCVar ( 			"g_armorProtectionMP",		"0.6",			CVAR_GAME | CVAR_FLOAT | CVAR_ARCHIVE, "armor takes this percentage of damage in mp" );
var g_useDynamicProtection = new idCVar ( 		"g_useDynamicProtection",	"1",			CVAR_GAME | CVAR_BOOL | CVAR_ARCHIVE, "scale damage and armor dynamically to keep the player alive more often" );
var g_healthTakeTime = new idCVar ( 			"g_healthTakeTime",			"5",			CVAR_GAME | CVAR_INTEGER | CVAR_ARCHIVE, "how often to take health in nightmare mode" );
var g_healthTakeAmt = new idCVar ( 				"g_healthTakeAmt",			"5",			CVAR_GAME | CVAR_INTEGER | CVAR_ARCHIVE, "how much health to take in nightmare mode" );
var g_healthTakeLimit = new idCVar ( 			"g_healthTakeLimit",		"25",			CVAR_GAME | CVAR_INTEGER | CVAR_ARCHIVE, "how low can health get taken in nightmare mode" );



var g_showPVS = new idCVar ( 					"g_showPVS",				"0",			CVAR_GAME | CVAR_INTEGER, "", 0, 2 );
var g_showTargets = new idCVar ( 				"g_showTargets",			"0",			CVAR_GAME | CVAR_BOOL, "draws entities and thier targets.  hidden entities are drawn grey." );
var g_showTriggers = new idCVar ( 				"g_showTriggers",			"0",			CVAR_GAME | CVAR_BOOL, "draws trigger entities  = new idCVar ( orange) and thier targets  = new idCVar ( green).  disabled triggers are drawn grey." );
var g_showCollisionWorld = new idCVar ( 		"g_showCollisionWorld",		"0",			CVAR_GAME | CVAR_BOOL, "" );
var g_showCollisionModels = new idCVar ( 		"g_showCollisionModels",	"0",			CVAR_GAME | CVAR_BOOL, "" );
var g_showCollisionTraces = new idCVar ( 		"g_showCollisionTraces",	"0",			CVAR_GAME | CVAR_BOOL, "" );
var g_maxShowDistance = new idCVar ( 			"g_maxShowDistance",		"128",			CVAR_GAME | CVAR_FLOAT, "" );
var g_showEntityInfo = new idCVar ( 			"g_showEntityInfo",			"0",			CVAR_GAME | CVAR_BOOL, "" );
var g_showviewpos = new idCVar ( 				"g_showviewpos",			"0",			CVAR_GAME | CVAR_BOOL, "" );
var g_showcamerainfo = new idCVar ( 			"g_showcamerainfo",			"0",			CVAR_GAME | CVAR_ARCHIVE, "displays the current frame # for the camera when playing cinematics" );
var g_showTestModelFrame = new idCVar ( 		"g_showTestModelFrame",		"0",			CVAR_GAME | CVAR_BOOL, "displays the current animation and frame # for testmodels" );
var g_showActiveEntities = new idCVar ( 		"g_showActiveEntities",		"0",			CVAR_GAME | CVAR_BOOL, "draws boxes around thinking entities.  dormant entities  = new idCVar ( outside of pvs) are drawn yellow.  non-dormant are green." );
var g_showEnemies = new idCVar ( 				"g_showEnemies",			"0",			CVAR_GAME | CVAR_BOOL, "draws boxes around monsters that have targeted the the player" );

var g_frametime = new idCVar ( 					"g_frametime",				"0",			CVAR_GAME | CVAR_BOOL, "displays timing information for each game frame" );
var g_timeentities = new idCVar ( 				"g_timeEntities",			"0",			CVAR_GAME | CVAR_FLOAT, "when non-zero, shows entities whose think functions exceeded the # of milliseconds specified" );

var ai_debugScript = new idCVar ( 				"ai_debugScript",			"-1",			CVAR_GAME | CVAR_INTEGER, "displays script calls for the specified monster entity number" );
var ai_debugMove = new idCVar ( 				"ai_debugMove",				"0",			CVAR_GAME | CVAR_BOOL, "draws movement information for monsters" );
var ai_debugTrajectory = new idCVar ( 			"ai_debugTrajectory",		"0",			CVAR_GAME | CVAR_BOOL, "draws trajectory tests for monsters" );
var ai_testPredictPath = new idCVar ( 			"ai_testPredictPath",		"0",			CVAR_GAME | CVAR_BOOL, "" );
var ai_showCombatNodes = new idCVar ( 			"ai_showCombatNodes",		"0",			CVAR_GAME | CVAR_BOOL, "draws attack cones for monsters" );
var ai_showPaths = new idCVar ( 				"ai_showPaths",				"0",			CVAR_GAME | CVAR_BOOL, "draws path_* entities" );
var ai_showObstacleAvoidance = new idCVar ( 	"ai_showObstacleAvoidance",	"0",			CVAR_GAME | CVAR_INTEGER, "draws obstacle avoidance information for monsters.  if 2, draws obstacles for player, as well", 0, 2, ArgCompletion_Integer_Template(0,2) );
var ai_blockedFailSafe = new idCVar ( 			"ai_blockedFailSafe",		"1",			CVAR_GAME | CVAR_BOOL, "enable blocked fail safe handling" );
	
var g_dvTime = new idCVar ( 					"g_dvTime",					"1",			CVAR_GAME | CVAR_FLOAT, "" );
var g_dvAmplitude = new idCVar ( 				"g_dvAmplitude",			"0.001",		CVAR_GAME | CVAR_FLOAT, "" );
var g_dvFrequency = new idCVar ( 				"g_dvFrequency",			"0.5",			CVAR_GAME | CVAR_FLOAT, "" );

var g_kickTime = new idCVar ( 					"g_kickTime",				"1",			CVAR_GAME | CVAR_FLOAT, "" );
var g_kickAmplitude = new idCVar ( 				"g_kickAmplitude",			"0.0001",		CVAR_GAME | CVAR_FLOAT, "" );
var g_blobTime = new idCVar ( 					"g_blobTime",				"1",			CVAR_GAME | CVAR_FLOAT, "" );
var g_blobSize = new idCVar ( 					"g_blobSize",				"1",			CVAR_GAME | CVAR_FLOAT, "" );

var g_testHealthVision = new idCVar ( 			"g_testHealthVision",		"0",			CVAR_GAME | CVAR_FLOAT, "" );
var g_editEntityMode = new idCVar( "g_editEntityMode", "0", CVAR_GAME | CVAR_INTEGER, "0 = off\n" +
	"1 = lights\n" +
	"2 = sounds\n" +
	"3 = articulated figures\n" +
	"4 = particle systems\n" +
	"5 = monsters\n" +
	"6 = entity names\n" +
	"7 = entity models", 0, 7, ArgCompletion_Integer_Template( 0, 7 ) );
var g_dragEntity = new idCVar ( 				"g_dragEntity",				"0",			CVAR_GAME | CVAR_BOOL, "allows dragging physics objects around by placing the crosshair over them and holding the fire button" );
var g_dragDamping = new idCVar ( 				"g_dragDamping",			"0.5",			CVAR_GAME | CVAR_FLOAT, "" );
var g_dragShowSelection = new idCVar ( 			"g_dragShowSelection",		"0",			CVAR_GAME | CVAR_BOOL, "" );
var g_dropItemRotation = new idCVar ( 			"g_dropItemRotation",		"",				CVAR_GAME, "" );

var g_vehicleVelocity = new idCVar ( 			"g_vehicleVelocity",		"1000",			CVAR_GAME | CVAR_FLOAT, "" );
var g_vehicleForce = new idCVar ( 				"g_vehicleForce",			"50000",		CVAR_GAME | CVAR_FLOAT, "" );
var g_vehicleSuspensionUp = new idCVar ( 		"g_vehicleSuspensionUp",	"32",			CVAR_GAME | CVAR_FLOAT, "" );
var g_vehicleSuspensionDown = new idCVar ( 		"g_vehicleSuspensionDown",	"20",			CVAR_GAME | CVAR_FLOAT, "" );
var g_vehicleSuspensionKCompress = new idCVar ( "g_vehicleSuspensionKCompress","200",		CVAR_GAME | CVAR_FLOAT, "" );
var g_vehicleSuspensionDamping = new idCVar ( 	"g_vehicleSuspensionDamping","400",			CVAR_GAME | CVAR_FLOAT, "" );
var g_vehicleTireFriction = new idCVar ( 		"g_vehicleTireFriction",	"0.8",			CVAR_GAME | CVAR_FLOAT, "" );

var ik_enable = new idCVar ( 					"ik_enable",				"1",			CVAR_GAME | CVAR_BOOL, "enable IK" );
var ik_debug = new idCVar ( 					"ik_debug",					"0",			CVAR_GAME | CVAR_BOOL, "show IK debug lines" );

var af_useLinearTime = new idCVar ( 			"af_useLinearTime",			"1",			CVAR_GAME | CVAR_BOOL, "use linear time algorithm for tree-like structures" );
var af_useImpulseFriction = new idCVar ( 		"af_useImpulseFriction",	"0",			CVAR_GAME | CVAR_BOOL, "use impulse based contact friction" );
var af_useJointImpulseFriction = new idCVar ( 	"af_useJointImpulseFriction","0",			CVAR_GAME | CVAR_BOOL, "use impulse based joint friction" );
var af_useSymmetry = new idCVar ( 				"af_useSymmetry",			"1",			CVAR_GAME | CVAR_BOOL, "use constraint matrix symmetry" );
var af_skipSelfCollision = new idCVar ( 		"af_skipSelfCollision",		"0",			CVAR_GAME | CVAR_BOOL, "skip self collision detection" );
var af_skipLimits = new idCVar ( 				"af_skipLimits",			"0",			CVAR_GAME | CVAR_BOOL, "skip joint limits" );
var af_skipFriction = new idCVar ( 				"af_skipFriction",			"0",			CVAR_GAME | CVAR_BOOL, "skip friction" );
var af_forceFriction = new idCVar ( 			"af_forceFriction",			"-1",			CVAR_GAME | CVAR_FLOAT, "force the given friction value" );
var af_maxLinearVelocity = new idCVar ( 		"af_maxLinearVelocity",		"128",			CVAR_GAME | CVAR_FLOAT, "maximum linear velocity" );
var af_maxAngularVelocity = new idCVar ( 		"af_maxAngularVelocity",	"1.57",			CVAR_GAME | CVAR_FLOAT, "maximum angular velocity" );
var af_timeScale = new idCVar ( 				"af_timeScale",				"1",			CVAR_GAME | CVAR_FLOAT, "scales the time" );
var af_jointFrictionScale = new idCVar ( 		"af_jointFrictionScale",	"0",			CVAR_GAME | CVAR_FLOAT, "scales the joint friction" );
var af_contactFrictionScale = new idCVar ( 		"af_contactFrictionScale",	"0",			CVAR_GAME | CVAR_FLOAT, "scales the contact friction" );
var af_highlightBody = new idCVar ( 			"af_highlightBody",			"",				CVAR_GAME, "name of the body to highlight" );
var af_highlightConstraint = new idCVar ( 		"af_highlightConstraint",	"",				CVAR_GAME, "name of the constraint to highlight" );
var af_showTimings = new idCVar ( 				"af_showTimings",			"0",			CVAR_GAME | CVAR_BOOL, "show articulated figure cpu usage" );
var af_showConstraints = new idCVar ( 			"af_showConstraints",		"0",			CVAR_GAME | CVAR_BOOL, "show constraints" );
var af_showConstraintNames = new idCVar ( 		"af_showConstraintNames",	"0",			CVAR_GAME | CVAR_BOOL, "show constraint names" );
var af_showConstrainedBodies = new idCVar ( 	"af_showConstrainedBodies",	"0",			CVAR_GAME | CVAR_BOOL, "show the two bodies contrained by the highlighted constraint" );
var af_showPrimaryOnly = new idCVar ( 			"af_showPrimaryOnly",		"0",			CVAR_GAME | CVAR_BOOL, "show primary constraints only" );
var af_showTrees = new idCVar ( 				"af_showTrees",				"0",			CVAR_GAME | CVAR_BOOL, "show tree-like structures" );
var af_showLimits = new idCVar ( 				"af_showLimits",			"0",			CVAR_GAME | CVAR_BOOL, "show joint limits" );
var af_showBodies = new idCVar ( 				"af_showBodies",			"0",			CVAR_GAME | CVAR_BOOL, "show bodies" );
var af_showBodyNames = new idCVar ( 			"af_showBodyNames",			"0",			CVAR_GAME | CVAR_BOOL, "show body names" );
var af_showMass = new idCVar ( 					"af_showMass",				"0",			CVAR_GAME | CVAR_BOOL, "show the mass of each body" );
var af_showTotalMass = new idCVar ( 			"af_showTotalMass",			"0",			CVAR_GAME | CVAR_BOOL, "show the total mass of each articulated figure" );
var af_showInertia = new idCVar ( 				"af_showInertia",			"0",			CVAR_GAME | CVAR_BOOL, "show the inertia tensor of each body" );
var af_showVelocity = new idCVar ( 				"af_showVelocity",			"0",			CVAR_GAME | CVAR_BOOL, "show the velocity of each body" );
var af_showActive = new idCVar ( 				"af_showActive",			"0",			CVAR_GAME | CVAR_BOOL, "show tree-like structures of articulated figures not at rest" );
var af_testSolid = new idCVar ( 				"af_testSolid",				"1",			CVAR_GAME | CVAR_BOOL, "test for bodies initially stuck in solid" );

var rb_showTimings = new idCVar ( 				"rb_showTimings",			"0",			CVAR_GAME | CVAR_BOOL, "show rigid body cpu usage" );
var rb_showBodies = new idCVar ( 				"rb_showBodies",			"0",			CVAR_GAME | CVAR_BOOL, "show rigid bodies" );
var rb_showMass = new idCVar ( 					"rb_showMass",				"0",			CVAR_GAME | CVAR_BOOL, "show the mass of each rigid body" );
var rb_showInertia = new idCVar ( 				"rb_showInertia",			"0",			CVAR_GAME | CVAR_BOOL, "show the inertia tensor of each rigid body" );
var rb_showVelocity = new idCVar ( 				"rb_showVelocity",			"0",			CVAR_GAME | CVAR_BOOL, "show the velocity of each rigid body" );
var rb_showActive = new idCVar ( 				"rb_showActive",			"0",			CVAR_GAME | CVAR_BOOL, "show rigid bodies that are not at rest" );

// The default values for player movement cvars are set in def/player.def
var pm_jumpheight = new idCVar ( 				"pm_jumpheight",			"48",			CVAR_GAME | CVAR_NETWORKSYNC | CVAR_FLOAT, "approximate hieght the player can jump" );
var pm_stepsize = new idCVar ( 					"pm_stepsize",				"16",			CVAR_GAME | CVAR_NETWORKSYNC | CVAR_FLOAT, "maximum height the player can step up without jumping" );
var pm_crouchspeed = new idCVar ( 				"pm_crouchspeed",			"80",			CVAR_GAME | CVAR_NETWORKSYNC | CVAR_FLOAT, "speed the player can move while crouched" );
var pm_walkspeed = new idCVar ( 				"pm_walkspeed",				"140",			CVAR_GAME | CVAR_NETWORKSYNC | CVAR_FLOAT, "speed the player can move while walking" );
var pm_runspeed = new idCVar ( 					"pm_runspeed",				"220",			CVAR_GAME | CVAR_NETWORKSYNC | CVAR_FLOAT, "speed the player can move while running" );
var pm_noclipspeed = new idCVar ( 				"pm_noclipspeed",			"200",			CVAR_GAME | CVAR_NETWORKSYNC | CVAR_FLOAT, "speed the player can move while in noclip" );
var pm_spectatespeed = new idCVar ( 			"pm_spectatespeed",			"450",			CVAR_GAME | CVAR_NETWORKSYNC | CVAR_FLOAT, "speed the player can move while spectating" );
var pm_spectatebbox = new idCVar ( 				"pm_spectatebbox",			"32",			CVAR_GAME | CVAR_NETWORKSYNC | CVAR_FLOAT, "size of the spectator bounding box" );
var pm_usecylinder = new idCVar ( 				"pm_usecylinder",			"0",			CVAR_GAME | CVAR_NETWORKSYNC | CVAR_BOOL, "use a cylinder approximation instead of a bounding box for player collision detection" );
var pm_minviewpitch = new idCVar ( 				"pm_minviewpitch",			"-89",			CVAR_GAME | CVAR_NETWORKSYNC | CVAR_FLOAT, "amount player's view can look up (negative values are up)" );
var pm_maxviewpitch = new idCVar ( 				"pm_maxviewpitch",			"89",			CVAR_GAME | CVAR_NETWORKSYNC | CVAR_FLOAT, "amount player's view can look down" );
var pm_stamina = new idCVar ( 					"pm_stamina",				"24",			CVAR_GAME | CVAR_NETWORKSYNC | CVAR_FLOAT, "length of time player can run" );
var pm_staminathreshold = new idCVar ( 			"pm_staminathreshold",		"45",			CVAR_GAME | CVAR_NETWORKSYNC | CVAR_FLOAT, "when stamina drops below this value, player gradually slows to a walk" );
var pm_staminarate = new idCVar ( 				"pm_staminarate",			"0.75",			CVAR_GAME | CVAR_NETWORKSYNC | CVAR_FLOAT, "rate that player regains stamina. divide pm_stamina by this value to determine how long it takes to fully recharge." );
var pm_crouchheight = new idCVar ( 				"pm_crouchheight",			"38",			CVAR_GAME | CVAR_NETWORKSYNC | CVAR_FLOAT, "height of player's bounding box while crouched" );
var pm_crouchviewheight = new idCVar ( 			"pm_crouchviewheight",		"32",			CVAR_GAME | CVAR_NETWORKSYNC | CVAR_FLOAT, "height of player's view while crouched" );
var pm_normalheight = new idCVar ( 				"pm_normalheight",			"74",			CVAR_GAME | CVAR_NETWORKSYNC | CVAR_FLOAT, "height of player's bounding box while standing" );
var pm_normalviewheight = new idCVar ( 			"pm_normalviewheight",		"68",			CVAR_GAME | CVAR_NETWORKSYNC | CVAR_FLOAT, "height of player's view while standing" );
var pm_deadheight = new idCVar ( 				"pm_deadheight",			"20",			CVAR_GAME | CVAR_NETWORKSYNC | CVAR_FLOAT, "height of player's bounding box while dead" );
var pm_deadviewheight = new idCVar ( 			"pm_deadviewheight",		"10",			CVAR_GAME | CVAR_NETWORKSYNC | CVAR_FLOAT, "height of player's view while dead" );
var pm_crouchrate = new idCVar ( 				"pm_crouchrate",			"0.87",			CVAR_GAME | CVAR_NETWORKSYNC | CVAR_FLOAT, "time it takes for player's view to change from standing to crouching" );
var pm_bboxwidth = new idCVar ( 				"pm_bboxwidth",				"32",			CVAR_GAME | CVAR_NETWORKSYNC | CVAR_FLOAT, "x/y size of player's bounding box" );
var pm_crouchbob = new idCVar ( 				"pm_crouchbob",				"0.5",			CVAR_GAME | CVAR_NETWORKSYNC | CVAR_FLOAT, "bob much faster when crouched" );
var pm_walkbob = new idCVar ( 					"pm_walkbob",				"0.3",			CVAR_GAME | CVAR_NETWORKSYNC | CVAR_FLOAT, "bob slowly when walking" );
var pm_runbob = new idCVar ( 					"pm_runbob",				"0.4",			CVAR_GAME | CVAR_NETWORKSYNC | CVAR_FLOAT, "bob faster when running" );
var pm_runpitch = new idCVar ( 					"pm_runpitch",				"0.002",		CVAR_GAME | CVAR_NETWORKSYNC | CVAR_FLOAT, "" );
var pm_runroll = new idCVar ( 					"pm_runroll",				"0.005",		CVAR_GAME | CVAR_NETWORKSYNC | CVAR_FLOAT, "" );
var pm_bobup = new idCVar ( 					"pm_bobup",					"0.005",		CVAR_GAME | CVAR_NETWORKSYNC | CVAR_FLOAT, "" );
var pm_bobpitch = new idCVar ( 					"pm_bobpitch",				"0.002",		CVAR_GAME | CVAR_NETWORKSYNC | CVAR_FLOAT, "" );
var pm_bobroll = new idCVar ( 					"pm_bobroll",				"0.002",		CVAR_GAME | CVAR_NETWORKSYNC | CVAR_FLOAT, "" );
var pm_thirdPersonRange = new idCVar ( 			"pm_thirdPersonRange",		"80",			CVAR_GAME | CVAR_NETWORKSYNC | CVAR_FLOAT, "camera distance from player in 3rd person" );
var pm_thirdPersonHeight = new idCVar ( 		"pm_thirdPersonHeight",		"0",			CVAR_GAME | CVAR_NETWORKSYNC | CVAR_FLOAT, "height of camera from normal view height in 3rd person" );
var pm_thirdPersonAngle = new idCVar ( 			"pm_thirdPersonAngle",		"0",			CVAR_GAME | CVAR_NETWORKSYNC | CVAR_FLOAT, "direction of camera from player in 3rd person in degrees (0 = behind player, 180 = in front)" );
var pm_thirdPersonClip = new idCVar ( 			"pm_thirdPersonClip",		"1",			CVAR_GAME | CVAR_NETWORKSYNC | CVAR_BOOL, "clip third person view into world space" );
var pm_thirdPerson = new idCVar ( 				"pm_thirdPerson",			"0",			CVAR_GAME | CVAR_NETWORKSYNC | CVAR_BOOL, "enables third person view" );
var pm_thirdPersonDeath = new idCVar ( 			"pm_thirdPersonDeath",		"0",			CVAR_GAME | CVAR_NETWORKSYNC | CVAR_BOOL, "enables third person view when player dies" );
var pm_modelView = new idCVar ( 				"pm_modelView",				"0",			CVAR_GAME | CVAR_NETWORKSYNC | CVAR_INTEGER, "draws camera from POV of player model (1 = always, 2 = when dead)", 0, 2, ArgCompletion_Integer_Template(0,2) )
var pm_airTics = new idCVar ( 					"pm_air",					"1800",			CVAR_GAME | CVAR_NETWORKSYNC | CVAR_INTEGER, "how long in milliseconds the player can go without air before he starts taking damage" );

var g_showPlayerShadow = new idCVar ( 			"g_showPlayerShadow",		"0",			CVAR_GAME | CVAR_ARCHIVE | CVAR_BOOL, "enables shadow of player model" );
var g_showHud = new idCVar ( 					"g_showHud",				"1",			CVAR_GAME | CVAR_ARCHIVE | CVAR_BOOL, "" );
var g_showProjectilePct = new idCVar ( 			"g_showProjectilePct",		"0",			CVAR_GAME | CVAR_ARCHIVE | CVAR_BOOL, "enables display of player hit percentage" );
var g_showBrass = new idCVar ( 					"g_showBrass",				"1",			CVAR_GAME | CVAR_ARCHIVE | CVAR_BOOL, "enables ejected shells from weapon" );
var g_gun_x = new idCVar ( 						"g_gunX",					"0",			CVAR_GAME | CVAR_FLOAT, "" );
var g_gun_y = new idCVar ( 						"g_gunY",					"0",			CVAR_GAME | CVAR_FLOAT, "" );
var g_gun_z = new idCVar ( 						"g_gunZ",					"0",			CVAR_GAME | CVAR_FLOAT, "" );
var g_viewNodalX = new idCVar ( 				"g_viewNodalX",				"0",			CVAR_GAME | CVAR_FLOAT, "" );
var g_viewNodalZ = new idCVar ( 				"g_viewNodalZ",				"0",			CVAR_GAME | CVAR_FLOAT, "" );
var g_fov = new idCVar ( 						"g_fov",					"90",			CVAR_GAME | CVAR_INTEGER | CVAR_NOCHEAT, "" );
var g_skipViewEffects = new idCVar ( 			"g_skipViewEffects",		"0",			CVAR_GAME | CVAR_BOOL, "skip damage and other view effects" );
var g_mpWeaponAngleScale = new idCVar ( 		"g_mpWeaponAngleScale",		"0",			CVAR_GAME | CVAR_FLOAT, "Control the weapon sway in MP" );

var g_testParticle = new idCVar ( 				"g_testParticle",			"0",			CVAR_GAME | CVAR_INTEGER, "test particle visualation, set by the particle editor" );
var g_testParticleName = new idCVar ( 			"g_testParticleName",		"",				CVAR_GAME, "name of the particle being tested by the particle editor" );
var g_testModelRotate = new idCVar ( 			"g_testModelRotate",		"0",			CVAR_GAME, "test model rotation speed" );
var g_testPostProcess = new idCVar ( 			"g_testPostProcess",		"",				CVAR_GAME, "name of material to draw over screen" );
var g_testModelAnimate = new idCVar( "g_testModelAnimate", "0", CVAR_GAME | CVAR_INTEGER, "test model animation,\n" +
	"0 = cycle anim with origin reset\n" +
	"1 = cycle anim with fixed origin\n" +
	"2 = cycle anim with continuous origin\n" +
	"3 = frame by frame with continuous origin\n" +
	"4 = play anim once", 0, 4, ArgCompletion_Integer_Template( 0, 4 ) );
var g_testModelBlend = new idCVar ( 			"g_testModelBlend",			"0",			CVAR_GAME | CVAR_INTEGER, "number of frames to blend" );
var g_testDeath = new idCVar ( 					"g_testDeath",				"0",			CVAR_GAME | CVAR_BOOL, "" );
var g_exportMask = new idCVar ( 				"g_exportMask",				"",				CVAR_GAME, "" );
var g_flushSave = new idCVar ( 					"g_flushSave",				"0",			CVAR_GAME | CVAR_BOOL, "1 = don't buffer file writing for save games." );

var aas_test = new idCVar ( 					"aas_test",					"0",			CVAR_GAME | CVAR_INTEGER, "" );
var aas_showAreas = new idCVar ( 				"aas_showAreas",			"0",			CVAR_GAME | CVAR_BOOL, "" );
var aas_showPath = new idCVar ( 				"aas_showPath",				"0",			CVAR_GAME | CVAR_INTEGER, "" );
var aas_showFlyPath = new idCVar ( 				"aas_showFlyPath",			"0",			CVAR_GAME | CVAR_INTEGER, "" );
var aas_showWallEdges = new idCVar ( 			"aas_showWallEdges",		"0",			CVAR_GAME | CVAR_BOOL, "" );
var aas_showHideArea = new idCVar ( 			"aas_showHideArea",			"0",			CVAR_GAME | CVAR_INTEGER, "" );
var aas_pullPlayer = new idCVar ( 				"aas_pullPlayer",			"0",			CVAR_GAME | CVAR_INTEGER, "" );
var aas_randomPullPlayer = new idCVar ( 		"aas_randomPullPlayer",		"0",			CVAR_GAME | CVAR_BOOL, "" );
var aas_goalArea = new idCVar ( 				"aas_goalArea",				"0",			CVAR_GAME | CVAR_INTEGER, "" );
var aas_showPushIntoArea = new idCVar ( 		"aas_showPushIntoArea",		"0",			CVAR_GAME | CVAR_BOOL, "" );

var g_password = new idCVar ( 					"g_password",				"",				CVAR_GAME | CVAR_ARCHIVE, "game password" );
var password = new idCVar ( 					"password",					"",				CVAR_GAME | CVAR_NOCHEAT, "client password used when connecting" );

var g_countDown = new idCVar ( 					"g_countDown",				"10",			CVAR_GAME | CVAR_INTEGER | CVAR_ARCHIVE, "pregame countdown in seconds", 4, 3600 );
var g_gameReviewPause = new idCVar ( 			"g_gameReviewPause",		"10",			CVAR_GAME | CVAR_NETWORKSYNC | CVAR_INTEGER | CVAR_ARCHIVE, "scores review time in seconds (at end game)", 2, 3600 );
var g_TDMArrows = new idCVar ( 					"g_TDMArrows",				"1",			CVAR_GAME | CVAR_NETWORKSYNC | CVAR_BOOL, "draw arrows over teammates in team deathmatch" );
var g_balanceTDM = new idCVar ( 				"g_balanceTDM",				"1",			CVAR_GAME | CVAR_BOOL, "maintain even teams" );

var net_clientPredictGUI = new idCVar ( 		"net_clientPredictGUI",		"1",			CVAR_GAME | CVAR_BOOL, "test guis in networking without prediction" );

var g_voteFlags = new idCVar( "g_voteFlags", "0", CVAR_GAME | CVAR_NETWORKSYNC | CVAR_INTEGER | CVAR_ARCHIVE, "vote flags. bit mask of votes not allowed on this server\n" +
	"bit 0 (+1)   restart now\n" +
	"bit 1 (+2)   time limit\n" +
	"bit 2 (+4)   frag limit\n" +
	"bit 3 (+8)   game type\n" +
	"bit 4 (+16)  kick player\n" +
	"bit 5 (+32)  change map\n" +
	"bit 6 (+64)  spectators\n" +
	"bit 7 (+128) next map" );
var g_mapCycle = new idCVar ( 					"g_mapCycle",				"mapcycle",		CVAR_GAME | CVAR_ARCHIVE, "map cycling script for multiplayer games - see mapcycle.scriptcfg" );

var mod_validSkins = new idCVar ( 				"mod_validSkins",			"skins/characters/player/marine_mp;skins/characters/player/marine_mp_green;skins/characters/player/marine_mp_blue;skins/characters/player/marine_mp_red;skins/characters/player/marine_mp_yellow",		CVAR_GAME | CVAR_ARCHIVE, "valid skins for the game" );

var net_serverDownload = new idCVar ( 			"net_serverDownload",		"0",			CVAR_GAME | CVAR_INTEGER | CVAR_ARCHIVE, "enable server download redirects. 0: off 1: redirect to si_serverURL 2: use builtin download. see net_serverDl cvars for configuration" );
var net_serverDlBaseURL = new idCVar ( 			"net_serverDlBaseURL",		"",				CVAR_GAME | CVAR_ARCHIVE, "base URL for the download redirection" );
var net_serverDlTable = new idCVar ( 			"net_serverDlTable",		"",				CVAR_GAME | CVAR_ARCHIVE, "pak names for which download is provided, seperated by ;" );
