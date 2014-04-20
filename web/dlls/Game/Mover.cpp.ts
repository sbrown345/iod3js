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
////// a mover will update any gui entities in it's target list with 
////// a key/val pair of "mover" "state" from below.. guis can represent
////// realtime info like this
////// binary only
////static const char *guiBinaryMoverStates[] = {
////	"1",	// pos 1
////	"2",	// pos 2
////	"3",	// moving 1 to 2
////	"4"		// moving 2 to 1
////};
////
////
/*
===============================================================================

idMover

===============================================================================
*/

var EV_FindGuiTargets = new idEventDef( "<FindGuiTargets>", null );
var EV_TeamBlocked = new idEventDef( "<teamblocked>", "ee" );
var EV_PartBlocked = new idEventDef( "<partblocked>", "e" );
var EV_ReachedPos = new idEventDef( "<reachedpos>", null );
var EV_ReachedAng = new idEventDef( "<reachedang>", null );
var EV_PostRestore = new idEventDef( "<postrestore>", "ddddd" );
var EV_StopMoving = new idEventDef( "stopMoving", null );
var EV_StopRotating = new idEventDef( "stopRotating", null );
var EV_Speed = new idEventDef( "speed", "f" );
var EV_Time = new idEventDef( "time", "f" );
var EV_AccelTime = new idEventDef( "accelTime", "f" );
var EV_DecelTime = new idEventDef( "decelTime", "f" );
var EV_MoveTo = new idEventDef( "moveTo", "e" );
var EV_MoveToPos = new idEventDef( "moveToPos", "v" );
var EV_Move = new idEventDef( "move", "ff" );
var EV_MoveAccelerateTo = new idEventDef( "accelTo", "ff" );
var EV_MoveDecelerateTo = new idEventDef( "decelTo", "ff" );
var EV_RotateDownTo = new idEventDef( "rotateDownTo", "df" );
var EV_RotateUpTo = new idEventDef( "rotateUpTo", "df" );
var EV_RotateTo = new idEventDef( "rotateTo", "v" );
var EV_Rotate = new idEventDef( "rotate", "v" );
var EV_RotateOnce = new idEventDef( "rotateOnce", "v" );
var EV_Bob = new idEventDef( "bob", "ffv" );
var EV_Sway = new idEventDef( "sway", "ffv" );
var EV_Mover_OpenPortal = new idEventDef( "openPortal" );
var EV_Mover_ClosePortal = new idEventDef( "closePortal" );
var EV_AccelSound = new idEventDef( "accelSound", "s" );
var EV_DecelSound = new idEventDef( "decelSound", "s" );
var EV_MoveSound = new idEventDef( "moveSound", "s" );
var EV_Mover_InitGuiTargets = new idEventDef( "<initguitargets>", null );
var EV_EnableSplineAngles = new idEventDef( "enableSplineAngles", null );
var EV_DisableSplineAngles = new idEventDef( "disableSplineAngles", null );
var EV_RemoveInitialSplineAngles = new idEventDef( "removeInitialSplineAngles", null );
var EV_StartSpline = new idEventDef( "startSpline", "e" );
var EV_StopSpline = new idEventDef( "stopSpline", null );
var EV_IsMoving = new idEventDef( "isMoving", null, 'd' );
var EV_IsRotating = new idEventDef( "isRotating", null, 'd' );

////CLASS_DECLARATION( idEntity, idMover )
idMover.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idMover;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idMover.prototype.GetType = function ( ): idTypeInfo {
	return ( idMover.Type );
};

idMover.eventCallbacks = [
	EVENT( EV_FindGuiTargets,		idMover.prototype.Event_FindGuiTargets ),
	EVENT( EV_Thread_SetCallback,	idMover.prototype.Event_SetCallback ),
	EVENT( EV_TeamBlocked,			idMover.prototype.Event_TeamBlocked ),
	EVENT( EV_PartBlocked,			idMover.prototype.Event_PartBlocked ),
	EVENT( EV_ReachedPos,			idMover.prototype.Event_UpdateMove ),
	EVENT( EV_ReachedAng,			idMover.prototype.Event_UpdateRotation ),
	EVENT( EV_PostRestore,			idMover.prototype.Event_PostRestore ),
	EVENT( EV_StopMoving,			idMover.prototype.Event_StopMoving ),
	EVENT( EV_StopRotating,			idMover.prototype.Event_StopRotating ),
	EVENT( EV_Speed,				idMover.prototype.Event_SetMoveSpeed ),
	EVENT( EV_Time,					idMover.prototype.Event_SetMoveTime ),
	EVENT( EV_AccelTime,			idMover.prototype.Event_SetAccellerationTime ),
	EVENT( EV_DecelTime,			idMover.prototype.Event_SetDecelerationTime ),
	EVENT( EV_MoveTo,				idMover.prototype.Event_MoveTo ),
	EVENT( EV_MoveToPos,			idMover.prototype.Event_MoveToPos ),
	EVENT( EV_Move,					idMover.prototype.Event_MoveDir ),
	EVENT( EV_MoveAccelerateTo,		idMover.prototype.Event_MoveAccelerateTo ),
	EVENT( EV_MoveDecelerateTo,		idMover.prototype.Event_MoveDecelerateTo ),
	EVENT( EV_RotateDownTo,			idMover.prototype.Event_RotateDownTo ),
	EVENT( EV_RotateUpTo,			idMover.prototype.Event_RotateUpTo ),
	EVENT( EV_RotateTo,				idMover.prototype.Event_RotateTo ),
	EVENT( EV_Rotate,				idMover.prototype.Event_Rotate ),
	EVENT( EV_RotateOnce,			idMover.prototype.Event_RotateOnce ),
	EVENT( EV_Bob,					idMover.prototype.Event_Bob ),
	EVENT( EV_Sway,					idMover.prototype.Event_Sway ),
	EVENT( EV_Mover_OpenPortal,		idMover.prototype.Event_OpenPortal ),
	EVENT( EV_Mover_ClosePortal,	idMover.prototype.Event_ClosePortal ),
	EVENT( EV_AccelSound,			idMover.prototype.Event_SetAccelSound ),
	EVENT( EV_DecelSound,			idMover.prototype.Event_SetDecelSound ),
	EVENT( EV_MoveSound,			idMover.prototype.Event_SetMoveSound ),
	EVENT( EV_Mover_InitGuiTargets,	idMover.prototype.Event_InitGuiTargets ),
	EVENT( EV_EnableSplineAngles,	idMover.prototype.Event_EnableSplineAngles ),
	EVENT( EV_DisableSplineAngles,	idMover.prototype.Event_DisableSplineAngles ),
	EVENT( EV_RemoveInitialSplineAngles, idMover.prototype.Event_RemoveInitialSplineAngles ),
	EVENT( EV_StartSpline,			idMover.prototype.Event_StartSpline ),
	EVENT( EV_StopSpline,			idMover.prototype.Event_StopSpline ),
	EVENT( EV_Activate,				idMover.prototype.Event_Activate ),
	EVENT( EV_IsMoving,				idMover.prototype.Event_IsMoving ),
	EVENT( EV_IsRotating,			idMover.prototype.Event_IsRotating )
];

idMover.Type = new idTypeInfo("idMover", "idEntity",
	idMover.eventCallbacks, idMover.CreateInstance, idMover.prototype.Spawn,
	idMover.prototype.Save, idMover.prototype.Restore );

////END_CLASS
////
/////*
////===============================================================================
////
////	idSplinePath, holds a spline path to be used by an idMover
////
////===============================================================================
////*/
////
////CLASS_DECLARATION( idEntity, idSplinePath )
idSplinePath.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idSplinePath;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idSplinePath.prototype.GetType = function ( ): idTypeInfo {
	return ( idSplinePath.Type );
};

idSplinePath.eventCallbacks = [
];

idSplinePath.Type = new idTypeInfo("idSplinePath", "idEntity",
	idSplinePath.eventCallbacks, idSplinePath.CreateInstance, idSplinePath.prototype.Spawn,
	idSplinePath.prototype.Save, idSplinePath.prototype.Restore );

////END_CLASS

/*
===============================================================================

idElevator

===============================================================================
*/
var EV_PostArrival= new idEventDef( "postArrival", null );
var EV_GotoFloor= new idEventDef( "gotoFloor", "d" );
////
////CLASS_DECLARATION( idMover, idElevator )
idElevator.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idElevator;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idElevator.prototype.GetType = function ( ): idTypeInfo {
	return ( idElevator.Type );
};

idElevator.eventCallbacks = [
	EVENT( EV_Activate,				idElevator.prototype.Event_Activate ),
	EVENT( EV_TeamBlocked,			idElevator.prototype.Event_TeamBlocked ),
	EVENT( EV_PartBlocked,			idElevator.prototype.Event_PartBlocked ),
	EVENT( EV_PostArrival,			idElevator.prototype.Event_PostFloorArrival ),
	EVENT( EV_GotoFloor,			idElevator.prototype.Event_GotoFloor ),
	EVENT( EV_Touch,				idElevator.prototype.Event_Touch )
];

idElevator.Type = new idTypeInfo("idElevator", "idMover",
	idElevator.eventCallbacks, idElevator.CreateInstance, idElevator.prototype.Spawn,
	idElevator.prototype.Save, idElevator.prototype.Restore );

////END_CLASS
////

/*
===============================================================================

idMover_Binary

Doors, plats, and buttons are all binary (two position) movers
Pos1 is "at rest", pos2 is "activated"

===============================================================================
*/

var EV_Mover_ReturnToPos1= new idEventDef( "<returntopos1>", null );
var EV_Mover_MatchTeam= new idEventDef( "<matchteam>", "dd" );
var EV_Mover_Enable= new idEventDef( "enable", null );
var EV_Mover_Disable= new idEventDef( "disable", null );
////
////CLASS_DECLARATION( idEntity, idMover_Binary )
idMover_Binary.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idMover_Binary;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idMover_Binary.prototype.GetType = function ( ): idTypeInfo {
	return ( idMover_Binary.Type );
};

idMover_Binary.eventCallbacks = [
	EVENT( EV_FindGuiTargets,			idMover_Binary.prototype.Event_FindGuiTargets ),
	EVENT( EV_Thread_SetCallback,		idMover_Binary.prototype.Event_SetCallback ),
	EVENT( EV_Mover_ReturnToPos1,		idMover_Binary.prototype.Event_ReturnToPos1 ),
	EVENT( EV_Activate,					idMover_Binary.prototype.Event_Use_BinaryMover ),
	EVENT( EV_ReachedPos,				idMover_Binary.prototype.Event_Reached_BinaryMover ),
	EVENT( EV_Mover_MatchTeam,			idMover_Binary.prototype.Event_MatchActivateTeam ),
	EVENT( EV_Mover_Enable,				idMover_Binary.prototype.Event_Enable ),
	EVENT( EV_Mover_Disable,			idMover_Binary.prototype.Event_Disable ),
	EVENT( EV_Mover_OpenPortal,			idMover_Binary.prototype.Event_OpenPortal ),
	EVENT( EV_Mover_ClosePortal,		idMover_Binary.prototype.Event_ClosePortal ),
	EVENT( EV_Mover_InitGuiTargets,		idMover_Binary.prototype.Event_InitGuiTargets )
];

idMover_Binary.Type = new idTypeInfo("idMover_Binary", "idEntity",
	idMover_Binary.eventCallbacks, idMover_Binary.CreateInstance, idMover_Binary.prototype.Spawn,
	idMover_Binary.prototype.Save, idMover_Binary.prototype.Restore );
////END_CLASS
////

/*
===============================================================================

idDoor

A use can be triggered either by a touch function, by being shot, or by being
targeted by another entity.

===============================================================================
*/

var EV_Door_StartOpen = new idEventDef( "<startOpen>", null );
var EV_Door_SpawnDoorTrigger = new idEventDef( "<spawnDoorTrigger>", null );
var EV_Door_SpawnSoundTrigger = new idEventDef( "<spawnSoundTrigger>", null );
var EV_Door_Open = new idEventDef( "open", null );
var EV_Door_Close = new idEventDef( "close", null );
var EV_Door_Lock = new idEventDef( "lock", "d" );
var EV_Door_IsOpen = new idEventDef( "isOpen", null, 'f' );
var EV_Door_IsLocked = new idEventDef( "isLocked", null, 'f' );

////CLASS_DECLARATION( idMover_Binary, idDoor )
idDoor.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idDoor;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idDoor.prototype.GetType = function ( ): idTypeInfo {
	return ( idDoor.Type );
};

idDoor.eventCallbacks = [
	EVENT( EV_TeamBlocked,				idDoor.prototype.Event_TeamBlocked ),
	EVENT( EV_PartBlocked,				idDoor.prototype.Event_PartBlocked ),
	EVENT( EV_Touch,					idDoor.prototype.Event_Touch ),
	EVENT( EV_Activate,					idDoor.prototype.Event_Activate ),
	EVENT( EV_Door_StartOpen,			idDoor.prototype.Event_StartOpen ),
	EVENT( EV_Door_SpawnDoorTrigger,	idDoor.prototype.Event_SpawnDoorTrigger ),
	EVENT( EV_Door_SpawnSoundTrigger,	idDoor.prototype.Event_SpawnSoundTrigger ),
	EVENT( EV_Door_Open,				idDoor.prototype.Event_Open ),
	EVENT( EV_Door_Close,				idDoor.prototype.Event_Close ),
	EVENT( EV_Door_Lock,				idDoor.prototype.Event_Lock ),
	EVENT( EV_Door_IsOpen,				idDoor.prototype.Event_IsOpen ),
	EVENT( EV_Door_IsLocked,			idDoor.prototype.Event_Locked ),
	EVENT( EV_ReachedPos,				idDoor.prototype.Event_Reached_BinaryMover ),
	EVENT( EV_SpectatorTouch,			idDoor.prototype.Event_SpectatorTouch ),
	EVENT( EV_Mover_OpenPortal,			idDoor.prototype.Event_OpenPortal ),
	EVENT( EV_Mover_ClosePortal,		idDoor.prototype.Event_ClosePortal ),
];

idDoor.Type = new idTypeInfo("idDoor", "idMover_Binary",
	idDoor.eventCallbacks, idDoor.CreateInstance, idDoor.prototype.Spawn,
	idDoor.prototype.Save, idDoor.prototype.Restore );

////END_CLASS
////
////
/////*
////===============================================================================
////
////idPlat
////
////===============================================================================
////*/
////
////CLASS_DECLARATION( idMover_Binary, idPlat )
idPlat.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idPlat;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idPlat.prototype.GetType = function ( ): idTypeInfo {
	return ( idPlat.Type );
};

idPlat.eventCallbacks = [
	EVENT( EV_Touch,			idPlat.prototype.Event_Touch ),
	EVENT( EV_TeamBlocked,		idPlat.prototype.Event_TeamBlocked ),
	EVENT( EV_PartBlocked,		idPlat.prototype.Event_PartBlocked )
];

idPlat.Type = new idTypeInfo("idPlat", "idMover_Binary",
	idPlat.eventCallbacks, idPlat.CreateInstance, idPlat.prototype.Spawn,
	idPlat.prototype.Save, idPlat.prototype.Restore );

////END_CLASS
////
////
/////*
////===============================================================================
////
////idMover_Periodic
////
////===============================================================================
////*/
////
////CLASS_DECLARATION( idEntity, idMover_Periodic )
idMover_Periodic.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idMover_Periodic;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idMover_Periodic.prototype.GetType = function ( ): idTypeInfo {
	return ( idMover_Periodic.Type );
};

idMover_Periodic.eventCallbacks = [
	EVENT( EV_TeamBlocked,		idMover_Periodic.prototype.Event_TeamBlocked ),
	EVENT( EV_PartBlocked,		idMover_Periodic.prototype.Event_PartBlocked )
];

idMover_Periodic.Type = new idTypeInfo( "idMover_Periodic", "idEntity",
	idMover_Periodic.eventCallbacks, idMover_Periodic.CreateInstance, idMover_Periodic.prototype.Spawn,
	idMover_Periodic.prototype.Save, idMover_Periodic.prototype.Restore );

////END_CLASS
////
////
/////*
////===============================================================================
////
////idRotater
////
////===============================================================================
////*/
////
////CLASS_DECLARATION( idMover_Periodic, idRotater )
idRotater.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idRotater;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idRotater.prototype.GetType = function ( ): idTypeInfo {
	return ( idRotater.Type );
};

idRotater.eventCallbacks = [
	EVENT( EV_Activate,			idRotater.prototype.Event_Activate )
];

idRotater.Type = new idTypeInfo("idRotater", "idMover_Periodic",
	idRotater.eventCallbacks, idRotater.CreateInstance, idRotater.prototype.Spawn,
	idRotater.prototype.Save, idRotater.prototype.Restore );

////END_CLASS
////
////
/////*
////===============================================================================
////
////idBobber
////
////===============================================================================
////*/
////
////CLASS_DECLARATION( idMover_Periodic, idBobber )
idBobber.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idBobber;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idBobber.prototype.GetType = function ( ): idTypeInfo {
	return ( idBobber.Type );
};

idBobber.eventCallbacks = [
];

idBobber.Type = new idTypeInfo("idBobber", "idMover_Periodic",
	idBobber.eventCallbacks, idBobber.CreateInstance, idBobber.prototype.Spawn,
	idBobber.prototype.Save, idBobber.prototype.Restore );

////END_CLASS
////
/////*
////===============================================================================
////
////idPendulum
////
////===============================================================================
////*/
////
////CLASS_DECLARATION( idMover_Periodic, idPendulum )
idPendulum.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idPendulum;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idPendulum.prototype.GetType = function ( ): idTypeInfo {
	return ( idPendulum.Type );
};

idPendulum.eventCallbacks = [
];

idPendulum.Type = new idTypeInfo("idPendulum", "idMover_Periodic",
	idPendulum.eventCallbacks, idPendulum.CreateInstance, idPendulum.prototype.Spawn,
	idPendulum.prototype.Save, idPendulum.prototype.Restore );

////END_CLASS
////
////
////
/////*
////===============================================================================
////
////idBobber
////
////===============================================================================
////*/
////
////CLASS_DECLARATION( idMover_Periodic, idRiser )
idRiser.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idRiser;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idRiser.prototype.GetType = function ( ): idTypeInfo {
	return ( idRiser.Type );
};

idRiser.eventCallbacks = [
	EVENT( EV_Activate,				idRiser.prototype.Event_Activate )
];

idRiser.Type = new idTypeInfo("idRiser", "idMover_Periodic",
	idRiser.eventCallbacks, idRiser.CreateInstance, idRiser.prototype.Spawn,
	idRiser.prototype.Save, idRiser.prototype.Restore );

////END_CLASS
////