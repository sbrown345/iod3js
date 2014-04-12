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
/////*
////
////Invisible entities that affect other entities or the world when activated.
////
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
////idTarget
////
////===============================================================================
////*/
////
////CLASS_DECLARATION( idEntity, idTarget )
idTarget.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idTarget;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idTarget.prototype.GetType = function ( ): idTypeInfo {
	return ( idTarget.Type );
};

idTarget.eventCallbacks = [
];

idTarget.Type = new idTypeInfo("idTarget", "idEntity",
	idTarget.eventCallbacks, idTarget.CreateInstance, idTarget.prototype.Spawn,
	idTarget.prototype.Save, idTarget.prototype.Restore );

////END_CLASS
////
////
/////*
////===============================================================================
////
////idTarget_Remove
////
////===============================================================================
////*/
////
////CLASS_DECLARATION( idTarget, idTarget_Remove )
idTarget_Remove.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idTarget_Remove;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idTarget_Remove.prototype.GetType = function ( ): idTypeInfo {
	return ( idTarget_Remove.Type );
};

idTarget_Remove.eventCallbacks = [
	EVENT( EV_Activate, idTarget_Remove.prototype.Event_Activate )
];

idTarget_Remove.Type = new idTypeInfo("idTarget_Remove", "idTarget",
	idTarget_Remove.eventCallbacks, idTarget_Remove.CreateInstance, idTarget_Remove.prototype.Spawn,
	idTarget_Remove.prototype.Save, idTarget_Remove.prototype.Restore );

////END_CLASS

////
////
/////*
////===============================================================================
////
////idTarget_Show
////
////===============================================================================
////*/
////
////CLASS_DECLARATION( idTarget, idTarget_Show )
idTarget_Show.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idTarget_Show;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idTarget_Show.prototype.GetType = function ( ): idTypeInfo {
	return ( idTarget_Show.Type );
};

idTarget_Show.eventCallbacks = [
	EVENT( EV_Activate, idTarget_Show.prototype.Event_Activate )
];

idTarget_Show.Type = new idTypeInfo("idTarget_Show", "idTarget",
	idTarget_Show.eventCallbacks, idTarget_Show.CreateInstance, idTarget_Show.prototype.Spawn,
	idTarget_Show.prototype.Save, idTarget_Show.prototype.Restore );

////END_CLASS
////

////
////
/////*
////===============================================================================
////
////idTarget_Damage
////
////===============================================================================
////*/
////
////CLASS_DECLARATION( idTarget, idTarget_Damage )
idTarget_Damage.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idTarget_Damage;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idTarget_Damage.prototype.GetType = function ( ): idTypeInfo {
	return ( idTarget_Damage.Type );
};

idTarget_Damage.eventCallbacks = [
	EVENT( EV_Activate, idTarget_Damage.prototype.Event_Activate )
];

idTarget_Damage.Type = new idTypeInfo("idTarget_Damage", "idTarget",
	idTarget_Damage.eventCallbacks, idTarget_Damage.CreateInstance, idTarget_Damage.prototype.Spawn,
	idTarget_Damage.prototype.Save, idTarget_Damage.prototype.Restore );

////END_CLASS

////
/////*
////===============================================================================
////
////idTarget_SessionCommand
////
////===============================================================================
////*/
////
////CLASS_DECLARATION( idTarget, idTarget_SessionCommand )
idTarget_SessionCommand.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idTarget_SessionCommand;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idTarget_SessionCommand.prototype.GetType = function ( ): idTypeInfo {
	return ( idTarget_SessionCommand.Type );
};

idTarget_SessionCommand.eventCallbacks = [
	EVENT( EV_Activate, idTarget_SessionCommand.prototype.Event_Activate )
];

idTarget_SessionCommand.Type = new idTypeInfo("idTarget_SessionCommand", "idTarget",
	idTarget_SessionCommand.eventCallbacks, idTarget_SessionCommand.CreateInstance, idTarget_SessionCommand.prototype.Spawn,
	idTarget_SessionCommand.prototype.Save, idTarget_SessionCommand.prototype.Restore );

////END_CLASS

////
/////*
////===============================================================================
////
////idTarget_EndLevel
////
////Just a modified form of idTarget_SessionCommand
////===============================================================================
////*/
////
////CLASS_DECLARATION( idTarget, idTarget_EndLevel )
idTarget_EndLevel.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idTarget_EndLevel;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idTarget_EndLevel.prototype.GetType = function ( ): idTypeInfo {
	return ( idTarget_EndLevel.Type );
};

idTarget_EndLevel.eventCallbacks = [
	EVENT(EV_Activate, idTarget_EndLevel.prototype.Event_Activate )
];

idTarget_EndLevel.Type = new idTypeInfo("idTarget_EndLevel", "idTarget",
	idTarget_EndLevel.eventCallbacks, idTarget_EndLevel.CreateInstance, idTarget_EndLevel.prototype.Spawn,
	idTarget_EndLevel.prototype.Save, idTarget_EndLevel.prototype.Restore );


////END_CLASS
////
////
////
/////*
////===============================================================================
////
////idTarget_WaitForButton
////
////===============================================================================
////*/
////
////CLASS_DECLARATION( idTarget, idTarget_WaitForButton )
idTarget_WaitForButton.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idTarget_WaitForButton;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idTarget_WaitForButton.prototype.GetType = function ( ): idTypeInfo {
	return ( idTarget_WaitForButton.Type );
};

idTarget_WaitForButton.eventCallbacks = [
	EVENT(EV_Activate, idTarget_WaitForButton.prototype.Event_Activate)
];

idTarget_WaitForButton.Type = new idTypeInfo( "idTarget_WaitForButton", "idTarget",
	idTarget_WaitForButton.eventCallbacks, idTarget_WaitForButton.CreateInstance, idTarget_WaitForButton.prototype.Spawn,
	idTarget_WaitForButton.prototype.Save, idTarget_WaitForButton.prototype.Restore );


////END_CLASS
////
/////*
////===============================================================================
////
////idTarget_SetGlobalShaderParm
////
////===============================================================================
////*/
////
////CLASS_DECLARATION( idTarget, idTarget_SetGlobalShaderTime )
idTarget_SetGlobalShaderTime.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idTarget_SetGlobalShaderTime;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idTarget_SetGlobalShaderTime.prototype.GetType = function ( ): idTypeInfo {
	return ( idTarget_SetGlobalShaderTime.Type );
};

idTarget_SetGlobalShaderTime.eventCallbacks = [
	EVENT(EV_Activate, idTarget_SetGlobalShaderTime.prototype.Event_Activate)
];

idTarget_SetGlobalShaderTime.Type = new idTypeInfo("idTarget_SetGlobalShaderTime", "idTarget",
	idTarget_SetGlobalShaderTime.eventCallbacks, idTarget_SetGlobalShaderTime.CreateInstance, idTarget_SetGlobalShaderTime.prototype.Spawn,
	idTarget_SetGlobalShaderTime.prototype.Save, idTarget_SetGlobalShaderTime.prototype.Restore );


////END_CLASS
////
/////*
////===============================================================================
////
////idTarget_SetShaderParm
////
////===============================================================================
////*/
////
////CLASS_DECLARATION( idTarget, idTarget_SetShaderParm )
idTarget_SetShaderParm.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idTarget_SetShaderParm;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idTarget_SetShaderParm.prototype.GetType = function ( ): idTypeInfo {
	return ( idTarget_SetShaderParm.Type );
};

idTarget_SetShaderParm.eventCallbacks = [
	EVENT( EV_Activate,	idTarget_SetShaderParm.prototype.Event_Activate )
];

idTarget_SetShaderParm.Type = new idTypeInfo("idTarget_SetShaderParm", "idTarget",
	idTarget_SetShaderParm.eventCallbacks, idTarget_SetShaderParm.CreateInstance, idTarget_SetShaderParm.prototype.Spawn,
	idTarget_SetShaderParm.prototype.Save, idTarget_SetShaderParm.prototype.Restore );

////END_CLASS
////
/////*
////===============================================================================
////
////idTarget_SetShaderTime
////
////===============================================================================
////*/
////
////CLASS_DECLARATION( idTarget, idTarget_SetShaderTime )
idTarget_SetShaderTime.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idTarget_SetShaderTime;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idTarget_SetShaderTime.prototype.GetType = function ( ): idTypeInfo {
	return ( idTarget_SetShaderTime.Type );
};

idTarget_SetShaderTime.eventCallbacks = [
	EVENT( EV_Activate,	idTarget_SetShaderTime.prototype.Event_Activate )
];

idTarget_SetShaderTime.Type = new idTypeInfo("idTarget_SetShaderTime", "idTarget",
	idTarget_SetShaderTime.eventCallbacks, idTarget_SetShaderTime.CreateInstance, idTarget_SetShaderTime.prototype.Spawn,
	idTarget_SetShaderTime.prototype.Save, idTarget_SetShaderTime.prototype.Restore );

////END_CLASS
////
////
/////*
////===============================================================================
////
////idTarget_FadeEntity
////
////===============================================================================
////*/
////
////CLASS_DECLARATION( idTarget, idTarget_FadeEntity )
idTarget_FadeEntity.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idTarget_FadeEntity;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idTarget_FadeEntity.prototype.GetType = function ( ): idTypeInfo {
	return ( idTarget_FadeEntity.Type );
};

idTarget_FadeEntity.eventCallbacks = [
	EVENT( EV_Activate,				idTarget_FadeEntity.prototype.Event_Activate )
];

idTarget_FadeEntity.Type = new idTypeInfo("idTarget_FadeEntity", "idTarget",
	idTarget_FadeEntity.eventCallbacks, idTarget_FadeEntity.CreateInstance, idTarget_FadeEntity.prototype.Spawn,
	idTarget_FadeEntity.prototype.Save, idTarget_FadeEntity.prototype.Restore );

////END_CLASS
////
////
/////*
////===============================================================================
////
////idTarget_LightFadeIn
////
////===============================================================================
////*/
////
////CLASS_DECLARATION( idTarget, idTarget_LightFadeIn )
idTarget_LightFadeIn.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idTarget_LightFadeIn;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idTarget_LightFadeIn.prototype.GetType = function ( ): idTypeInfo {
	return ( idTarget_LightFadeIn.Type );
};

idTarget_LightFadeIn.eventCallbacks = [
	EVENT( EV_Activate,				idTarget_LightFadeIn.prototype.Event_Activate )
];

idTarget_LightFadeIn.Type = new idTypeInfo("idTarget_LightFadeIn", "idTarget",
	idTarget_LightFadeIn.eventCallbacks, idTarget_LightFadeIn.CreateInstance, idTarget_LightFadeIn.prototype.Spawn,
	idTarget_LightFadeIn.prototype.Save, idTarget_LightFadeIn.prototype.Restore );

////END_CLASS
////
////
/////*
////===============================================================================
////
////idTarget_LightFadeOut
////
////===============================================================================
////*/
////
////CLASS_DECLARATION( idTarget, idTarget_LightFadeOut )
idTarget_LightFadeOut.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idTarget_LightFadeOut;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idTarget_LightFadeOut.prototype.GetType = function ( ): idTypeInfo {
	return ( idTarget_LightFadeOut.Type );
};

idTarget_LightFadeOut.eventCallbacks = [
	EVENT( EV_Activate,				idTarget_LightFadeOut.prototype.Event_Activate )
];

idTarget_LightFadeOut.Type = new idTypeInfo("idTarget_LightFadeOut", "idTarget",
	idTarget_LightFadeOut.eventCallbacks, idTarget_LightFadeOut.CreateInstance, idTarget_LightFadeOut.prototype.Spawn,
	idTarget_LightFadeOut.prototype.Save, idTarget_LightFadeOut.prototype.Restore );

////END_CLASS
////
////
/////*
////===============================================================================
////
////idTarget_Give
////
////===============================================================================
////*/
////
////CLASS_DECLARATION( idTarget, idTarget_Give )
idTarget_Give.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idTarget_Give;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idTarget_Give.prototype.GetType = function ( ): idTypeInfo {
	return ( idTarget_Give.Type );
};

idTarget_Give.eventCallbacks = [
	EVENT( EV_Activate,				idTarget_Give.prototype.Event_Activate )
];

idTarget_Give.Type = new idTypeInfo( "idTarget_Give", "idTarget",
	idTarget_Give.eventCallbacks, idTarget_Give.CreateInstance, idTarget_Give.prototype.Spawn,
	idTarget_Give.prototype.Save, idTarget_Give.prototype.Restore );

////END_CLASS
////
/////*
////===============================================================================
////
////idTarget_GiveEmail
////
////===============================================================================
////*/
////
////CLASS_DECLARATION( idTarget, idTarget_GiveEmail )
idTarget_GiveEmail.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idTarget_GiveEmail;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idTarget_GiveEmail.prototype.GetType = function ( ): idTypeInfo {
	return ( idTarget_GiveEmail.Type );
};

idTarget_GiveEmail.eventCallbacks = [
	EVENT( EV_Activate,				idTarget_GiveEmail.prototype.Event_Activate )
];

idTarget_GiveEmail.Type = new idTypeInfo("idTarget_GiveEmail", "idTarget",
	idTarget_GiveEmail.eventCallbacks, idTarget_GiveEmail.CreateInstance, idTarget_GiveEmail.prototype.Spawn,
	idTarget_GiveEmail.prototype.Save, idTarget_GiveEmail.prototype.Restore );

////END_CLASS
////
////
/////*
////===============================================================================
////
////idTarget_SetModel
////
////===============================================================================
////*/
////
////CLASS_DECLARATION( idTarget, idTarget_SetModel )
idTarget_SetModel.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idTarget_SetModel;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idTarget_SetModel.prototype.GetType = function ( ): idTypeInfo {
	return ( idTarget_SetModel.Type );
};

idTarget_SetModel.eventCallbacks = [
	EVENT( EV_Activate,	idTarget_SetModel.prototype.Event_Activate )
];

idTarget_SetModel.Type = new idTypeInfo("idTarget_SetModel", "idTarget",
	idTarget_SetModel.eventCallbacks, idTarget_SetModel.CreateInstance, idTarget_SetModel.prototype.Spawn,
	idTarget_SetModel.prototype.Save, idTarget_SetModel.prototype.Restore );

////END_CLASS
////

/*
===============================================================================

idTarget_SetInfluence

===============================================================================
*/

var EV_RestoreInfluence = new idEventDef( "<RestoreInfluece>" );
var EV_GatherEntities = new idEventDef( "<GatherEntities>" );
var EV_Flash = new idEventDef( "<Flash>", "fd" );
var EV_ClearFlash = new idEventDef( "<ClearFlash>", "f" );

////CLASS_DECLARATION( idTarget, idTarget_SetInfluence )
idTarget_SetInfluence.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idTarget_SetInfluence;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idTarget_SetInfluence.prototype.GetType = function ( ): idTypeInfo {
	return ( idTarget_SetInfluence.Type );
};

idTarget_SetInfluence.eventCallbacks = [
	EVENT( EV_Activate,	idTarget_SetInfluence.prototype.Event_Activate ),
	EVENT(EV_RestoreInfluence, idTarget_SetInfluence.prototype.Event_RestoreInfluence ),
	EVENT(EV_GatherEntities, idTarget_SetInfluence.prototype.Event_GatherEntities ),
	EVENT(EV_Flash, idTarget_SetInfluence.prototype.Event_Flash ),
	EVENT(EV_ClearFlash, idTarget_SetInfluence.prototype.Event_ClearFlash )
];

idTarget_SetInfluence.Type = new idTypeInfo("idTarget_SetInfluence", "idTarget",
	idTarget_SetInfluence.eventCallbacks, idTarget_SetInfluence.CreateInstance, idTarget_SetInfluence.prototype.Spawn,
	idTarget_SetInfluence.prototype.Save, idTarget_SetInfluence.prototype.Restore );

////END_CLASS
////
////
/////*
////===============================================================================
////
////idTarget_SetKeyVal
////
////===============================================================================
////*/
////
////CLASS_DECLARATION( idTarget, idTarget_SetKeyVal )
idTarget_SetKeyVal.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idTarget_SetKeyVal;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idTarget_SetKeyVal.prototype.GetType = function ( ): idTypeInfo {
	return ( idTarget_SetKeyVal.Type );
};

idTarget_SetKeyVal.eventCallbacks = [
	EVENT( EV_Activate,	idTarget_SetKeyVal.prototype.Event_Activate )
];

idTarget_SetKeyVal.Type = new idTypeInfo("idTarget_SetKeyVal", "idTarget",
	idTarget_SetKeyVal.eventCallbacks, idTarget_SetKeyVal.CreateInstance, idTarget_SetKeyVal.prototype.Spawn,
	idTarget_SetKeyVal.prototype.Save, idTarget_SetKeyVal.prototype.Restore );

////END_CLASS
////
/////*
////===============================================================================
////
////idTarget_SetFov
////
////===============================================================================
////*/
////
////CLASS_DECLARATION( idTarget, idTarget_SetFov )
idTarget_SetFov.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idTarget_SetFov;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idTarget_SetFov.prototype.GetType = function ( ): idTypeInfo {
	return ( idTarget_SetFov.Type );
};

idTarget_SetFov.eventCallbacks = [
	EVENT(EV_Activate, idTarget_SetFov.prototype.Event_Activate)
];

idTarget_SetFov.Type = new idTypeInfo("idTarget_SetFov", "idTarget",
	idTarget_SetFov.eventCallbacks, idTarget_SetFov.CreateInstance, idTarget_SetFov.prototype.Spawn,
	idTarget_SetFov.prototype.Save, idTarget_SetFov.prototype.Restore );


////END_CLASS
////
////
/////*
////===============================================================================
////
////idTarget_SetPrimaryObjective
////
////===============================================================================
////*/
////
////CLASS_DECLARATION( idTarget, idTarget_SetPrimaryObjective )
idTarget_SetPrimaryObjective.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idTarget_SetPrimaryObjective;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idTarget_SetPrimaryObjective.prototype.GetType = function ( ): idTypeInfo {
	return ( idTarget_SetPrimaryObjective.Type );
};

idTarget_SetPrimaryObjective.eventCallbacks = [
	EVENT( EV_Activate,	idTarget_SetPrimaryObjective.prototype.Event_Activate )
];

idTarget_SetPrimaryObjective.Type = new idTypeInfo("idTarget_SetPrimaryObjective", "idTarget",
	idTarget_SetPrimaryObjective.eventCallbacks, idTarget_SetPrimaryObjective.CreateInstance, idTarget_SetPrimaryObjective.prototype.Spawn,
	idTarget_SetPrimaryObjective.prototype.Save, idTarget_SetPrimaryObjective.prototype.Restore );

////END_CLASS
////
/////*
////===============================================================================
////
////idTarget_LockDoor
////
////===============================================================================
////*/
////
////CLASS_DECLARATION( idTarget, idTarget_LockDoor )
idTarget_LockDoor.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idTarget_LockDoor;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idTarget_LockDoor.prototype.GetType = function ( ): idTypeInfo {
	return ( idTarget_LockDoor.Type );
};

idTarget_LockDoor.eventCallbacks = [
	EVENT( EV_Activate,	idTarget_LockDoor.prototype.Event_Activate )
];

idTarget_LockDoor.Type = new idTypeInfo("idTarget_LockDoor", "idTarget",
	idTarget_LockDoor.eventCallbacks, idTarget_LockDoor.CreateInstance, idTarget_LockDoor.prototype.Spawn,
	idTarget_LockDoor.prototype.Save, idTarget_LockDoor.prototype.Restore );

////END_CLASS
////
/////*
////===============================================================================
////
////idTarget_CallObjectFunction
////
////===============================================================================
////*/
////
////CLASS_DECLARATION( idTarget, idTarget_CallObjectFunction )
idTarget_CallObjectFunction.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idTarget_CallObjectFunction;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idTarget_CallObjectFunction.prototype.GetType = function ( ): idTypeInfo {
	return ( idTarget_CallObjectFunction.Type );
};

idTarget_CallObjectFunction.eventCallbacks = [
	EVENT( EV_Activate,	idTarget_CallObjectFunction.prototype.Event_Activate )
];

idTarget_CallObjectFunction.Type = new idTypeInfo("idTarget_CallObjectFunction", "idTarget",
	idTarget_CallObjectFunction.eventCallbacks, idTarget_CallObjectFunction.CreateInstance, idTarget_CallObjectFunction.prototype.Spawn,
	idTarget_CallObjectFunction.prototype.Save, idTarget_CallObjectFunction.prototype.Restore );

////END_CLASS
////
////
/////*
////===============================================================================
////
////idTarget_EnableLevelWeapons
////
////===============================================================================
////*/
////
////CLASS_DECLARATION( idTarget, idTarget_EnableLevelWeapons )
idTarget_EnableLevelWeapons.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idTarget_EnableLevelWeapons;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idTarget_EnableLevelWeapons.prototype.GetType = function ( ): idTypeInfo {
	return ( idTarget_EnableLevelWeapons.Type );
};

idTarget_EnableLevelWeapons.eventCallbacks = [
	EVENT( EV_Activate,	idTarget_EnableLevelWeapons.prototype.Event_Activate )
];

idTarget_EnableLevelWeapons.Type = new idTypeInfo("idTarget_EnableLevelWeapons", "idTarget",
	idTarget_EnableLevelWeapons.eventCallbacks, idTarget_EnableLevelWeapons.CreateInstance, idTarget_EnableLevelWeapons.prototype.Spawn,
	idTarget_EnableLevelWeapons.prototype.Save, idTarget_EnableLevelWeapons.prototype.Restore );

////END_CLASS
////
/*
===============================================================================

idTarget_Tip

===============================================================================
*/

var EV_TipOff = new idEventDef( "<TipOff>" );
////extern const idEventDef EV_GetPlayerPos( "<getplayerpos>" );
////
////CLASS_DECLARATION( idTarget, idTarget_Tip )
idTarget_Tip.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idTarget_Tip;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idTarget_Tip.prototype.GetType = function ( ): idTypeInfo {
	return ( idTarget_Tip.Type );
};

idTarget_Tip.eventCallbacks = [
	EVENT( EV_Activate,		idTarget_Tip.prototype.Event_Activate ),
	EVENT( EV_TipOff,		idTarget_Tip.prototype.Event_TipOff ),
	EVENT( EV_GetPlayerPos,	idTarget_Tip.prototype.Event_GetPlayerPos )
];

idTarget_Tip.Type = new idTypeInfo("idTarget_Tip", "idTarget",
	idTarget_Tip.eventCallbacks, idTarget_Tip.CreateInstance, idTarget_Tip.prototype.Spawn,
	idTarget_Tip.prototype.Save, idTarget_Tip.prototype.Restore );

////END_CLASS
////
/////*
////===============================================================================
////
////idTarget_GiveSecurity
////
////===============================================================================
////*/
//
//CLASS_DECLARATION( idTarget, idTarget_GiveSecurity )
idTarget_GiveSecurity.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idTarget_GiveSecurity;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idTarget_GiveSecurity.prototype.GetType = function ( ): idTypeInfo {
	return ( idTarget_GiveSecurity.Type );
};

idTarget_GiveSecurity.eventCallbacks = [
	EVENT( EV_Activate,	idTarget_GiveSecurity.prototype.Event_Activate )
];

idTarget_GiveSecurity.Type = new idTypeInfo("idTarget_GiveSecurity", "idTarget",
	idTarget_GiveSecurity.eventCallbacks, idTarget_GiveSecurity.CreateInstance, idTarget_GiveSecurity.prototype.Spawn,
	idTarget_GiveSecurity.prototype.Save, idTarget_GiveSecurity.prototype.Restore );

//END_CLASS
////
////
/////*
////===============================================================================
////
////idTarget_RemoveWeapons
////
////===============================================================================
////*/
////
////CLASS_DECLARATION( idTarget, idTarget_RemoveWeapons )
idTarget_RemoveWeapons.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idTarget_RemoveWeapons;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idTarget_RemoveWeapons.prototype.GetType = function ( ): idTypeInfo {
	return ( idTarget_RemoveWeapons.Type );
};

idTarget_RemoveWeapons.eventCallbacks = [
	EVENT( EV_Activate,	idTarget_RemoveWeapons.prototype.Event_Activate )
];

idTarget_RemoveWeapons.Type = new idTypeInfo("idTarget_RemoveWeapons", "idTarget",
	idTarget_RemoveWeapons.eventCallbacks, idTarget_RemoveWeapons.CreateInstance, idTarget_RemoveWeapons.prototype.Spawn,
	idTarget_RemoveWeapons.prototype.Save, idTarget_RemoveWeapons.prototype.Restore );

////END_CLASS
////
/////*
////===============================================================================
////
////idTarget_LevelTrigger
////
////===============================================================================
////*/
////
////CLASS_DECLARATION( idTarget, idTarget_LevelTrigger )
idTarget_LevelTrigger.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idTarget_LevelTrigger;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idTarget_LevelTrigger.prototype.GetType = function ( ): idTypeInfo {
	return ( idTarget_LevelTrigger.Type );
};

idTarget_LevelTrigger.eventCallbacks = [
	EVENT( EV_Activate,	idTarget_LevelTrigger.prototype.Event_Activate )
];

idTarget_LevelTrigger.Type = new idTypeInfo("idTarget_LevelTrigger", "idTarget",
	idTarget_LevelTrigger.eventCallbacks, idTarget_LevelTrigger.CreateInstance, idTarget_LevelTrigger.prototype.Spawn,
	idTarget_LevelTrigger.prototype.Save, idTarget_LevelTrigger.prototype.Restore );

////END_CLASS
////
/////*
////===============================================================================
////
////idTarget_EnableStamina
////
////===============================================================================
////*/
////
////CLASS_DECLARATION( idTarget, idTarget_EnableStamina )
idTarget_EnableStamina.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idTarget_EnableStamina;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idTarget_EnableStamina.prototype.GetType = function ( ): idTypeInfo {
	return ( idTarget_EnableStamina.Type );
};

idTarget_EnableStamina.eventCallbacks = [
	EVENT( EV_Activate,	idTarget_EnableStamina.prototype.Event_Activate )
];

idTarget_EnableStamina.Type = new idTypeInfo("idTarget_EnableStamina", "idTarget",
	idTarget_EnableStamina.eventCallbacks, idTarget_EnableStamina.CreateInstance, idTarget_EnableStamina.prototype.Spawn,
	idTarget_EnableStamina.prototype.Save, idTarget_EnableStamina.prototype.Restore );

////END_CLASS
////
/*
===============================================================================

idTarget_FadeSoundClass

===============================================================================
*/

var EV_RestoreVolume = new idEventDef( "<RestoreVolume>" );
////CLASS_DECLARATION( idTarget, idTarget_FadeSoundClass )
idTarget_FadeSoundClass.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idTarget_FadeSoundClass;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idTarget_FadeSoundClass.prototype.GetType = function ( ): idTypeInfo {
	return ( idTarget_FadeSoundClass.Type );
};

idTarget_FadeSoundClass.eventCallbacks = [
	EVENT( EV_Activate,	idTarget_FadeSoundClass.prototype.Event_Activate ),
	EVENT( EV_RestoreVolume, idTarget_FadeSoundClass.prototype.Event_RestoreVolume )
];

idTarget_FadeSoundClass.Type = new idTypeInfo("idTarget_FadeSoundClass", "idTarget",
	idTarget_FadeSoundClass.eventCallbacks, idTarget_FadeSoundClass.CreateInstance, idTarget_FadeSoundClass.prototype.Spawn,
	idTarget_FadeSoundClass.prototype.Save, idTarget_FadeSoundClass.prototype.Restore );

////END_CLASS
////
