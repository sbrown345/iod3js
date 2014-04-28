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
////
/////***********************************************************************
////
////	idAnimState
////
////***********************************************************************/
////
/***********************************************************************

	idActor

***********************************************************************/

var AI_EnableEyeFocus = new idEventDef(  "enableEyeFocus" );
var AI_DisableEyeFocus = new idEventDef(  "disableEyeFocus" );
var EV_Footstep = new idEventDef(  "footstep" );
var EV_FootstepLeft = new idEventDef(  "leftFoot" );
var EV_FootstepRight = new idEventDef(  "rightFoot" );
var EV_EnableWalkIK = new idEventDef(  "EnableWalkIK" );
var EV_DisableWalkIK = new idEventDef(  "DisableWalkIK" );
var EV_EnableLegIK = new idEventDef(  "EnableLegIK", "d" );
var EV_DisableLegIK = new idEventDef(  "DisableLegIK", "d" );
var AI_StopAnim = new idEventDef(  "stopAnim", "dd" );
var AI_PlayAnim = new idEventDef(  "playAnim", "ds", 'd' );
var AI_PlayCycle = new idEventDef(  "playCycle", "ds", 'd' );
var AI_IdleAnim = new idEventDef(  "idleAnim", "ds", 'd' );
var AI_SetSyncedAnimWeight = new idEventDef(  "setSyncedAnimWeight", "ddf" );
var AI_SetBlendFrames = new idEventDef(  "setBlendFrames", "dd" );
var AI_GetBlendFrames = new idEventDef(  "getBlendFrames", "d", 'd' );
var AI_AnimState = new idEventDef(  "animState", "dsd" );
var AI_GetAnimState = new idEventDef(  "getAnimState", "d", 's' );
var AI_InAnimState = new idEventDef(  "inAnimState", "ds", 'd' );
var AI_FinishAction = new idEventDef(  "finishAction", "s" );
var AI_AnimDone = new idEventDef(  "animDone", "dd", 'd' );
var AI_OverrideAnim = new idEventDef(  "overrideAnim", "d" );
var AI_EnableAnim = new idEventDef(  "enableAnim", "dd" );
var AI_PreventPain = new idEventDef(  "preventPain", "f" );
var AI_DisablePain = new idEventDef(  "disablePain" );
var AI_EnablePain = new idEventDef(  "enablePain" );
var AI_GetPainAnim = new idEventDef(  "getPainAnim", null, 's' );
var AI_SetAnimPrefix = new idEventDef(  "setAnimPrefix", "s" );
var AI_HasAnim = new idEventDef(  "hasAnim", "ds", 'f' );
var AI_CheckAnim = new idEventDef(  "checkAnim", "ds" );
var AI_ChooseAnim = new idEventDef(  "chooseAnim", "ds", 's' );
var AI_AnimLength = new idEventDef(  "animLength", "ds", 'f' );
var AI_AnimDistance = new idEventDef(  "animDistance", "ds", 'f' );
var AI_HasEnemies = new idEventDef(  "hasEnemies", null, 'd' );
var AI_NextEnemy = new idEventDef(  "nextEnemy", "E", 'e' );
var AI_ClosestEnemyToPoint = new idEventDef(  "closestEnemyToPoint", "v", 'e' );
var AI_SetNextState = new idEventDef(  "setNextState", "s" );
var AI_SetState = new idEventDef(  "setState", "s" );
var AI_GetState = new idEventDef(  "getState", null, 's' );
var AI_GetHead = new idEventDef(  "getHead", null, 'e' );

//CLASS_DECLARATION( idAFEntity_Gibbable, idActor )
idActor.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idActor;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idActor.prototype.GetType = function ( ): idTypeInfo {
	return ( idActor.Type );
};

idActor.eventCallbacks = [
	EVENT( AI_EnableEyeFocus,			idActor.prototype.Event_EnableEyeFocus ),
	EVENT( AI_DisableEyeFocus,			idActor.prototype.Event_DisableEyeFocus ),
	EVENT( EV_Footstep,					idActor.prototype.Event_Footstep ),
	EVENT( EV_FootstepLeft,				idActor.prototype.Event_Footstep ),
	EVENT( EV_FootstepRight,			idActor.prototype.Event_Footstep ),
	EVENT( EV_EnableWalkIK,				idActor.prototype.Event_EnableWalkIK ),
	EVENT( EV_DisableWalkIK,			idActor.prototype.Event_DisableWalkIK ),
	EVENT( EV_EnableLegIK,				idActor.prototype.Event_EnableLegIK ),
	EVENT( EV_DisableLegIK,				idActor.prototype.Event_DisableLegIK ),
	EVENT( AI_PreventPain,				idActor.prototype.Event_PreventPain ),
	EVENT( AI_DisablePain,				idActor.prototype.Event_DisablePain ),
	EVENT( AI_EnablePain,				idActor.prototype.Event_EnablePain ),
	EVENT( AI_GetPainAnim,				idActor.prototype.Event_GetPainAnim ),
	EVENT( AI_SetAnimPrefix,			idActor.prototype.Event_SetAnimPrefix ),
	EVENT( AI_StopAnim,					idActor.prototype.Event_StopAnim ),
	EVENT( AI_PlayAnim,					idActor.prototype.Event_PlayAnim ),
	EVENT( AI_PlayCycle,				idActor.prototype.Event_PlayCycle ),
	EVENT( AI_IdleAnim,					idActor.prototype.Event_IdleAnim ),
	EVENT( AI_SetSyncedAnimWeight,		idActor.prototype.Event_SetSyncedAnimWeight ),
	EVENT( AI_SetBlendFrames,			idActor.prototype.Event_SetBlendFrames ),
	EVENT( AI_GetBlendFrames,			idActor.prototype.Event_GetBlendFrames ),
	EVENT( AI_AnimState,				idActor.prototype.Event_AnimState ),
	EVENT( AI_GetAnimState,				idActor.prototype.Event_GetAnimState ),
	EVENT( AI_InAnimState,				idActor.prototype.Event_InAnimState ),
	EVENT( AI_FinishAction,				idActor.prototype.Event_FinishAction ),
	EVENT( AI_AnimDone,					idActor.prototype.Event_AnimDone ),
	EVENT( AI_OverrideAnim,				idActor.prototype.Event_OverrideAnim ),
	EVENT( AI_EnableAnim,				idActor.prototype.Event_EnableAnim ),
	EVENT( AI_HasAnim,					idActor.prototype.Event_HasAnim ),
	EVENT( AI_CheckAnim,				idActor.prototype.Event_CheckAnim ),
	EVENT( AI_ChooseAnim,				idActor.prototype.Event_ChooseAnim ),
	EVENT( AI_AnimLength,				idActor.prototype.Event_AnimLength ),
	EVENT( AI_AnimDistance,				idActor.prototype.Event_AnimDistance ),
	EVENT( AI_HasEnemies,				idActor.prototype.Event_HasEnemies ),
	EVENT( AI_NextEnemy,				idActor.prototype.Event_NextEnemy ),
	EVENT( AI_ClosestEnemyToPoint,		idActor.prototype.Event_ClosestEnemyToPoint ),
	EVENT( EV_StopSound,				idActor.prototype.Event_StopSound ),
	EVENT( AI_SetNextState,				idActor.prototype.Event_SetNextState ),
	EVENT( AI_SetState,					idActor.prototype.Event_SetState ),
	EVENT( AI_GetState,					idActor.prototype.Event_GetState ),
	EVENT( AI_GetHead,					idActor.prototype.Event_GetHead )
];

idActor.Type = new idTypeInfo("idActor", "idAFEntity_Gibbable",
	idActor.eventCallbacks, idActor.CreateInstance, idActor.prototype.Spawn,
	idActor.prototype.Save, idActor.prototype.Restore);

