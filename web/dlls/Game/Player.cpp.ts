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
////#include "../idlib/precompiled.h"
////#pragma hdrstop
////
////#include "Game_local.h"
////
/////*
////===============================================================================
////
////	Player control of the Doom Marine.
////	This object handles all player movement and world interaction.
////
////===============================================================================
////*/
////
////// distance between ladder rungs (actually is half that distance, but this sounds better)
////const int LADDER_RUNG_DISTANCE = 32;
////
////// amount of health per dose from the health station
////const int HEALTH_PER_DOSE = 10;
////
////// time before a weapon dropped to the floor disappears
////const int WEAPON_DROP_TIME = 20 * 1000;
////
////// time before a next or prev weapon switch happens
////const int WEAPON_SWITCH_DELAY = 150;
////
////// how many units to raise spectator above default view height so it's in the head of someone
////const int SPECTATE_RAISE = 25;
////
////const int HEALTHPULSE_TIME = 333;
////
////// minimum speed to bob and play run/walk animations at
////const float MIN_BOB_SPEED = 5.0f;
////
var EV_Player_GetButtons = new idEventDef( "getButtons", null, 'd' );
var EV_Player_GetMove = new idEventDef( "getMove", null, 'v' );
var EV_Player_GetViewAngles = new idEventDef( "getViewAngles", null, 'v' );
var EV_Player_StopFxFov = new idEventDef( "stopFxFov" );
var EV_Player_EnableWeapon = new idEventDef( "enableWeapon" );
var EV_Player_DisableWeapon = new idEventDef( "disableWeapon" );
var EV_Player_GetCurrentWeapon = new idEventDef( "getCurrentWeapon", null, 's' );
var EV_Player_GetPreviousWeapon = new idEventDef( "getPreviousWeapon", null, 's' );
var EV_Player_SelectWeapon = new idEventDef( "selectWeapon", "s" );
var EV_Player_GetWeaponEntity = new idEventDef( "getWeaponEntity", null, 'e' );
var EV_Player_OpenPDA = new idEventDef( "openPDA" );
var EV_Player_InPDA = new idEventDef( "inPDA", null, 'd' );
var EV_Player_ExitTeleporter = new idEventDef( "exitTeleporter" );
var EV_Player_StopAudioLog = new idEventDef( "stopAudioLog" );
var EV_Player_HideTip = new idEventDef( "hideTip" );
var EV_Player_LevelTrigger = new idEventDef( "levelTrigger" );
var EV_SpectatorTouch = new idEventDef( "spectatorTouch", "et" );
var EV_Player_GetIdealWeapon = new idEventDef( "getIdealWeapon", null, 's' );
////
////CLASS_DECLARATION( idActor, idPlayer )
idPlayer.CreateInstance = function ( ): idClass {
	//try {
		var ptr = new idPlayer;
		ptr.FindUninitializedMemory ( );
		return ptr;
	//} catch ( e ) {
	//	return null;
	//}
};

idPlayer.prototype.GetType = function ( ): idTypeInfo {
	return ( idPlayer.Type );
};

idPlayer.eventCallbacks = [
	EVENT( EV_Player_GetButtons,			idPlayer.prototype.Event_GetButtons ),
	EVENT( EV_Player_GetMove,				idPlayer.prototype.Event_GetMove ),
	EVENT( EV_Player_GetViewAngles,			idPlayer.prototype.Event_GetViewAngles ),
	EVENT( EV_Player_StopFxFov,				idPlayer.prototype.Event_StopFxFov ),
	EVENT( EV_Player_EnableWeapon,			idPlayer.prototype.Event_EnableWeapon ),
	EVENT( EV_Player_DisableWeapon,			idPlayer.prototype.Event_DisableWeapon ),
	EVENT( EV_Player_GetCurrentWeapon,		idPlayer.prototype.Event_GetCurrentWeapon ),
	EVENT( EV_Player_GetPreviousWeapon,		idPlayer.prototype.Event_GetPreviousWeapon ),
	EVENT( EV_Player_SelectWeapon,			idPlayer.prototype.Event_SelectWeapon ),
	EVENT( EV_Player_GetWeaponEntity,		idPlayer.prototype.Event_GetWeaponEntity ),
	EVENT( EV_Player_OpenPDA,				idPlayer.prototype.Event_OpenPDA ),
	EVENT( EV_Player_InPDA,					idPlayer.prototype.Event_InPDA ),
	EVENT( EV_Player_ExitTeleporter,		idPlayer.prototype.Event_ExitTeleporter ),
	EVENT( EV_Player_StopAudioLog,			idPlayer.prototype.Event_StopAudioLog ),
	EVENT( EV_Player_HideTip,				idPlayer.prototype.Event_HideTip ),
	EVENT( EV_Player_LevelTrigger,			idPlayer.prototype.Event_LevelTrigger ),
	EVENT( EV_Gibbed,						idPlayer.prototype.Event_Gibbed ),
	EVENT( EV_Player_GetIdealWeapon,		idPlayer.prototype.Event_GetIdealWeapon ),
];

idPlayer.Type = new idTypeInfo("idPlayer", "idActor",
	idPlayer.eventCallbacks, idPlayer.CreateInstance, idPlayer.prototype.Spawn,
	idPlayer.prototype.Save, idPlayer.prototype.Restore );

//END_CLASS

var MAX_RESPAWN_TIME = 10000;
var RAGDOLL_DEATH_TIME = 3000;
var MAX_PDAS = 64;
var MAX_PDA_ITEMS = 128;
var STEPUP_TIME = 200;
var MAX_INVENTORY_ITEMS = 20;

////idVec3 idPlayer::colorBarTable[ 5 ] = {
////	idVec3( 0.25f, 0.25f, 0.25f ),
////	idVec3( 1.00f, 0.00f, 0.00f ),
////	idVec3( 0.00f, 0.80f, 0.10f ),
////	idVec3( 0.20f, 0.50f, 0.80f ),
////	idVec3( 1.00f, 0.80f, 0.10f )
////};
////