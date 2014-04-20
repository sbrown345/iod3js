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

/*
===============================================================================

	idEntity

===============================================================================
*/

// overridable events
var EV_PostSpawn = new idEventDef( "<postspawn>", null );
var EV_FindTargets = new idEventDef( "<findTargets>", null );
var EV_Touch = new idEventDef( "<touch>", "et" );
var EV_GetName = new idEventDef( "getName", null, 's' );
var EV_SetName = new idEventDef( "setName", "s" );
var EV_Activate = new idEventDef( "activate", "e" );
var EV_ActivateTargets = new idEventDef( "activateTargets", "e" );
var EV_NumTargets = new idEventDef( "numTargets", null, 'f' );
var EV_GetTarget = new idEventDef( "getTarget", "f", 'e' );
var EV_RandomTarget = new idEventDef( "randomTarget", "s", 'e' );
var EV_Bind = new idEventDef( "bind", "e" );
var EV_BindPosition = new idEventDef( "bindPosition", "e" );
var EV_BindToJoint = new idEventDef( "bindToJoint", "esf" );
var EV_Unbind = new idEventDef( "unbind", null );
var EV_RemoveBinds = new idEventDef( "removeBinds" );
var EV_SpawnBind = new idEventDef( "<spawnbind>", null );
var EV_SetOwner = new idEventDef( "setOwner", "e" );
var EV_SetModel = new idEventDef( "setModel", "s" );
var EV_SetSkin = new idEventDef( "setSkin", "s" );
var EV_GetWorldOrigin = new idEventDef( "getWorldOrigin", null, 'v' );
var EV_SetWorldOrigin = new idEventDef( "setWorldOrigin", "v" );
var EV_GetOrigin = new idEventDef( "getOrigin", null, 'v' );
var EV_SetOrigin = new idEventDef( "setOrigin", "v" );
var EV_GetAngles = new idEventDef( "getAngles", null, 'v' );
var EV_SetAngles = new idEventDef( "setAngles", "v" );
var EV_GetLinearVelocity = new idEventDef( "getLinearVelocity", null, 'v' );
var EV_SetLinearVelocity = new idEventDef( "setLinearVelocity", "v" );
var EV_GetAngularVelocity = new idEventDef( "getAngularVelocity", null, 'v' );
var EV_SetAngularVelocity = new idEventDef( "setAngularVelocity", "v" );
var EV_GetSize = new idEventDef( "getSize", null, 'v' );
var EV_SetSize = new idEventDef( "setSize", "vv" );
var EV_GetMins = new idEventDef( "getMins", null, 'v' );
var EV_GetMaxs = new idEventDef( "getMaxs", null, 'v' );
var EV_IsHidden = new idEventDef( "isHidden", null, 'd' );
var EV_Hide = new idEventDef( "hide", null );
var EV_Show = new idEventDef( "show", null );
var EV_Touches = new idEventDef( "touches", "E", 'd' );
var EV_ClearSignal = new idEventDef( "clearSignal", "d" );
var EV_GetShaderParm = new idEventDef( "getShaderParm", "d", 'f' );
var EV_SetShaderParm = new idEventDef( "setShaderParm", "df" );
var EV_SetShaderParms = new idEventDef( "setShaderParms", "ffff" );
var EV_SetColor = new idEventDef( "setColor", "fff" );
var EV_GetColor = new idEventDef( "getColor", null, 'v' );
var EV_CacheSoundShader = new idEventDef( "cacheSoundShader", "s" );
var EV_StartSoundShader = new idEventDef( "startSoundShader", "sd", 'f' );
var EV_StartSound = new idEventDef( "startSound", "sdd", 'f' );
var EV_StopSound = new idEventDef( "stopSound", "dd" );
var EV_FadeSound = new idEventDef( "fadeSound", "dff" );
var EV_SetGuiParm = new idEventDef( "setGuiParm", "ss" );
var EV_SetGuiFloat = new idEventDef( "setGuiFloat", "sf" );
var EV_GetNextKey = new idEventDef( "getNextKey", "ss", 's' );
var EV_SetKey = new idEventDef( "setKey", "ss" );
var EV_GetKey = new idEventDef( "getKey", "s", 's' );
var EV_GetIntKey = new idEventDef( "getIntKey", "s", 'f' );
var EV_GetFloatKey = new idEventDef( "getFloatKey", "s", 'f' );
var EV_GetVectorKey = new idEventDef( "getVectorKey", "s", 'v' );
var EV_GetEntityKey = new idEventDef( "getEntityKey", "s", 'e' );
var EV_RestorePosition = new idEventDef( "restorePosition" );
var EV_UpdateCameraTarget = new idEventDef( "<updateCameraTarget>", null );
var EV_DistanceTo = new idEventDef( "distanceTo", "E", 'f' );
var EV_DistanceToPoint = new idEventDef( "distanceToPoint", "v", 'f' );
var EV_StartFx = new idEventDef( "startFx", "s" );
var EV_HasFunction = new idEventDef( "hasFunction", "s", 'd' );
var EV_CallFunction = new idEventDef( "callFunction", "s" );
var EV_SetNeverDormant = new idEventDef( "setNeverDormant", "d" );

//ABSTRACT_DECLARATION(idClass, idEntity)
idEntity.CreateInstance = function ( ): idClass {
	gameLocal.Error( "Cannot instanciate abstract class %s.", idEntity );
	return null;
};

idEntity.prototype.GetType = function ( ): idTypeInfo {
	return ( idEntity.Type );
};

idEntity.eventCallbacks = [
	EVENT(EV_GetName, idEntity.prototype.Event_GetName),
	EVENT(EV_SetName, idEntity.prototype.Event_SetName),
	EVENT(EV_FindTargets, idEntity.prototype.Event_FindTargets),
	EVENT(EV_ActivateTargets, idEntity.prototype.Event_ActivateTargets),
	EVENT(EV_NumTargets, idEntity.prototype.Event_NumTargets),
	EVENT(EV_GetTarget, idEntity.prototype.Event_GetTarget),
	EVENT(EV_RandomTarget, idEntity.prototype.Event_RandomTarget),
	EVENT(EV_BindToJoint, idEntity.prototype.Event_BindToJoint),
	EVENT(EV_RemoveBinds, idEntity.prototype.Event_RemoveBinds),
	EVENT(EV_Bind, idEntity.prototype.Event_Bind),
	EVENT(EV_BindPosition, idEntity.prototype.Event_BindPosition),
	EVENT(EV_Unbind, idEntity.prototype.Event_Unbind),
	EVENT(EV_SpawnBind, idEntity.prototype.Event_SpawnBind),
	EVENT(EV_SetOwner, idEntity.prototype.Event_SetOwner),
	EVENT(EV_SetModel, idEntity.prototype.Event_SetModel),
	EVENT(EV_SetSkin, idEntity.prototype.Event_SetSkin),
	EVENT(EV_GetShaderParm, idEntity.prototype.Event_GetShaderParm),
	EVENT(EV_SetShaderParm, idEntity.prototype.Event_SetShaderParm),
	EVENT(EV_SetShaderParms, idEntity.prototype.Event_SetShaderParms),
	EVENT(EV_SetColor, idEntity.prototype.Event_SetColor),
	EVENT(EV_GetColor, idEntity.prototype.Event_GetColor),
	EVENT(EV_IsHidden, idEntity.prototype.Event_IsHidden),
	EVENT(EV_Hide, idEntity.prototype.Event_Hide),
	EVENT(EV_Show, idEntity.prototype.Event_Show),
	EVENT(EV_CacheSoundShader, idEntity.prototype.Event_CacheSoundShader),
	EVENT(EV_StartSoundShader, idEntity.prototype.Event_StartSoundShader),
	EVENT(EV_StartSound, idEntity.prototype.Event_StartSound),
	EVENT(EV_StopSound, idEntity.prototype.Event_StopSound),
	EVENT(EV_FadeSound, idEntity.prototype.Event_FadeSound),
	EVENT(EV_GetWorldOrigin, idEntity.prototype.Event_GetWorldOrigin),
	EVENT(EV_SetWorldOrigin, idEntity.prototype.Event_SetWorldOrigin),
	EVENT(EV_GetOrigin, idEntity.prototype.Event_GetOrigin),
	EVENT(EV_SetOrigin, idEntity.prototype.Event_SetOrigin),
	EVENT(EV_GetAngles, idEntity.prototype.Event_GetAngles),
	EVENT(EV_SetAngles, idEntity.prototype.Event_SetAngles),
	EVENT(EV_GetLinearVelocity, idEntity.prototype.Event_GetLinearVelocity),
	EVENT(EV_SetLinearVelocity, idEntity.prototype.Event_SetLinearVelocity),
	EVENT(EV_GetAngularVelocity, idEntity.prototype.Event_GetAngularVelocity),
	EVENT(EV_SetAngularVelocity, idEntity.prototype.Event_SetAngularVelocity),
	EVENT(EV_GetSize, idEntity.prototype.Event_GetSize),
	EVENT(EV_SetSize, idEntity.prototype.Event_SetSize),
	EVENT(EV_GetMins, idEntity.prototype.Event_GetMins),
	EVENT(EV_GetMaxs, idEntity.prototype.Event_GetMaxs),
	EVENT(EV_Touches, idEntity.prototype.Event_Touches),
	EVENT(EV_SetGuiParm, idEntity.prototype.Event_SetGuiParm),
	EVENT(EV_SetGuiFloat, idEntity.prototype.Event_SetGuiFloat),
	EVENT(EV_GetNextKey, idEntity.prototype.Event_GetNextKey),
	EVENT(EV_SetKey, idEntity.prototype.Event_SetKey),
	EVENT(EV_GetKey, idEntity.prototype.Event_GetKey),
	EVENT(EV_GetIntKey, idEntity.prototype.Event_GetIntKey),
	EVENT(EV_GetFloatKey, idEntity.prototype.Event_GetFloatKey),
	EVENT(EV_GetVectorKey, idEntity.prototype.Event_GetVectorKey),
	EVENT(EV_GetEntityKey, idEntity.prototype.Event_GetEntityKey),
	EVENT(EV_RestorePosition, idEntity.prototype.Event_RestorePosition),
	EVENT(EV_UpdateCameraTarget, idEntity.prototype.Event_UpdateCameraTarget),
	EVENT(EV_DistanceTo, idEntity.prototype.Event_DistanceTo),
	EVENT(EV_DistanceToPoint, idEntity.prototype.Event_DistanceToPoint),
	EVENT(EV_StartFx, idEntity.prototype.Event_StartFx),
	EVENT(EV_Thread_WaitFrame, idEntity.prototype.Event_WaitFrame),
	EVENT(EV_Thread_Wait, idEntity.prototype.Event_Wait),
	EVENT(EV_HasFunction, idEntity.prototype.Event_HasFunction),
	EVENT(EV_CallFunction, idEntity.prototype.Event_CallFunction),
	EVENT(EV_SetNeverDormant, idEntity.prototype.Event_SetNeverDormant)
];

idEntity.Type = new idTypeInfo( "idEntity", "idClass",
	idEntity.eventCallbacks, idEntity.CreateInstance, idEntity.prototype.Spawn,
	idEntity.prototype.Save, idEntity.prototype.Restore );

/*
================
UpdateGuiParms
================
*/
function UpdateGuiParms ( gui: idUserInterface, args: idDict ): void {
	if ( gui == null || args == null ) {
		return;
	}
	var kv = args.MatchPrefix( "gui_parm", null );
	while ( kv ) {
		gui.SetStateString(kv.GetKey().data, kv.GetValue ( ).data );
		kv = args.MatchPrefix( "gui_parm", kv );
	}
	gui.SetStateBool( "noninteractive", args.GetBool( "gui_noninteractive" ) );
	gui.StateChanged( gameLocal.time );
}

/*
================
AddRenderGui
================
*/
function AddRenderGui ( name: string, gui: R<idUserInterface>, args: idDict ): void {
	var kv = args.MatchPrefix( "gui_parm", null );
	gui.$ = uiManager.FindGui( name, true, ( kv != null ) );
	UpdateGuiParms( gui.$, args );
}

/*
===============================================================================

  idAnimatedEntity

===============================================================================
*/

var EV_GetJointHandle= new idEventDef( "getJointHandle", "s", 'd' );
var EV_ClearAllJoints= new idEventDef( "clearAllJoints" );
var EV_ClearJoint= new idEventDef( "clearJoint", "d" );
var EV_SetJointPos= new idEventDef( "setJointPos", "ddv" );
var EV_SetJointAngle= new idEventDef( "setJointAngle", "ddv" );
var EV_GetJointPos= new idEventDef( "getJointPos", "d", 'v' );
var EV_GetJointAngle= new idEventDef( "getJointAngle", "d", 'v' );
////
////CLASS_DECLARATION( idEntity, idAnimatedEntity )
idAnimatedEntity.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idAnimatedEntity;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idAnimatedEntity.prototype.GetType = function ( ): idTypeInfo {
	return ( idAnimatedEntity.Type );
};

idAnimatedEntity.eventCallbacks = [
	EVENT( EV_GetJointHandle,		idAnimatedEntity.prototype.Event_GetJointHandle ),
	EVENT( EV_ClearAllJoints,		idAnimatedEntity.prototype.Event_ClearAllJoints ),
	EVENT( EV_ClearJoint,			idAnimatedEntity.prototype.Event_ClearJoint ),
	EVENT( EV_SetJointPos,			idAnimatedEntity.prototype.Event_SetJointPos ),
	EVENT( EV_SetJointAngle,		idAnimatedEntity.prototype.Event_SetJointAngle ),
	EVENT( EV_GetJointPos,			idAnimatedEntity.prototype.Event_GetJointPos ),
	EVENT( EV_GetJointAngle,		idAnimatedEntity.prototype.Event_GetJointAngle )
];

idAnimatedEntity.Type = new idTypeInfo("idAnimatedEntity", "idEntity",
	idAnimatedEntity.eventCallbacks, idAnimatedEntity.CreateInstance, idAnimatedEntity.prototype.Spawn,
	idAnimatedEntity.prototype.Save, idAnimatedEntity.prototype.Restore );


////END_CLASS
////