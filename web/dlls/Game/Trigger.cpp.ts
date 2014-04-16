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
/*
===============================================================================

  idTrigger
	
===============================================================================
*/

var EV_Enable = new idEventDef( "enable", null );
var EV_Disable = new idEventDef( "disable", null );

////CLASS_DECLARATION( idEntity, idTrigger )
idTrigger.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idTrigger;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idTrigger.prototype.GetType = function ( ): idTypeInfo {
	return ( idTrigger.Type );
};

idTrigger.eventCallbacks = [
	EVENT( EV_Enable,	idTrigger.prototype.Event_Enable ),
	EVENT( EV_Disable,	idTrigger.prototype.Event_Disable )
];

idTrigger.Type = new idTypeInfo("idTrigger", "idEntity",
	idTrigger.eventCallbacks, idTrigger.CreateInstance, idTrigger.prototype.Spawn,
	idTrigger.prototype.Save, idTrigger.prototype.Restore );

////END_CLASS
////

/*
===============================================================================

  idTrigger_Multi
	
===============================================================================
*/

var EV_TriggerAction = new idEventDef( "<triggerAction>", "e" );
////
////CLASS_DECLARATION( idTrigger, idTrigger_Multi )
idTrigger_Multi.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idTrigger_Multi;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idTrigger_Multi.prototype.GetType = function ( ): idTypeInfo {
	return ( idTrigger_Multi.Type );
};

idTrigger_Multi.eventCallbacks = [
	EVENT( EV_Touch,			idTrigger_Multi.prototype.Event_Touch ),
	EVENT( EV_Activate,			idTrigger_Multi.prototype.Event_Trigger ),
	EVENT( EV_TriggerAction,	idTrigger_Multi.prototype.Event_TriggerAction )
];

idTrigger_Multi.Type = new idTypeInfo("idTrigger_Multi", "idTrigger",
	idTrigger_Multi.eventCallbacks, idTrigger_Multi.CreateInstance, idTrigger_Multi.prototype.Spawn,
	idTrigger_Multi.prototype.Save, idTrigger_Multi.prototype.Restore );

////END_CLASS
////
////
/////*
////===============================================================================
////
////  idTrigger_EntityName
////	
////===============================================================================
////*/
////
////CLASS_DECLARATION( idTrigger, idTrigger_EntityName )
idTrigger_EntityName.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idTrigger_EntityName;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idTrigger_EntityName.prototype.GetType = function ( ): idTypeInfo {
	return ( idTrigger_EntityName.Type );
};

idTrigger_EntityName.eventCallbacks = [
	EVENT( EV_Touch,			idTrigger_EntityName.prototype.Event_Touch ),
	EVENT( EV_Activate,			idTrigger_EntityName.prototype.Event_Trigger ),
	EVENT( EV_TriggerAction,	idTrigger_EntityName.prototype.Event_TriggerAction )
];

idTrigger_EntityName.Type = new idTypeInfo("idTrigger_EntityName", "idTrigger",
	idTrigger_EntityName.eventCallbacks, idTrigger_EntityName.CreateInstance, idTrigger_EntityName.prototype.Spawn,
	idTrigger_EntityName.prototype.Save, idTrigger_EntityName.prototype.Restore );

////END_CLASS
////
/*
===============================================================================

  idTrigger_Timer
	
===============================================================================
*/

var EV_Timer = new idEventDef( "<timer>", null );
////
////CLASS_DECLARATION( idTrigger, idTrigger_Timer )
idTrigger_Timer.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idTrigger_Timer;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idTrigger_Timer.prototype.GetType = function ( ): idTypeInfo {
	return ( idTrigger_Timer.Type );
};

idTrigger_Timer.eventCallbacks = [
	EVENT( EV_Timer,		idTrigger_Timer.prototype.Event_Timer ),
	EVENT( EV_Activate,		idTrigger_Timer.prototype.Event_Use )
];

idTrigger_Timer.Type = new idTypeInfo("idTrigger_Timer", "idTrigger",
	idTrigger_Timer.eventCallbacks, idTrigger_Timer.CreateInstance, idTrigger_Timer.prototype.Spawn,
	idTrigger_Timer.prototype.Save, idTrigger_Timer.prototype.Restore );

////END_CLASS
////
/////*
////===============================================================================
////
////  idTrigger_Count
////	
////===============================================================================
////*/
////
////CLASS_DECLARATION( idTrigger, idTrigger_Count )
idTrigger_Count.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idTrigger_Count;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idTrigger_Count.prototype.GetType = function ( ): idTypeInfo {
	return ( idTrigger_Count.Type );
};

idTrigger_Count.eventCallbacks = [
	EVENT( EV_Activate,	idTrigger_Count.prototype.Event_Trigger ),
	EVENT( EV_TriggerAction,	idTrigger_Count.prototype.Event_TriggerAction )
];

idTrigger_Count.Type = new idTypeInfo("idTrigger_Count", "idTrigger",
	idTrigger_Count.eventCallbacks, idTrigger_Count.CreateInstance, idTrigger_Count.prototype.Spawn,
	idTrigger_Count.prototype.Save, idTrigger_Count.prototype.Restore );

////END_CLASS
////
/////*
////===============================================================================
////
////  idTrigger_Hurt
////	
////===============================================================================
////*/
////
////CLASS_DECLARATION( idTrigger, idTrigger_Hurt )
idTrigger_Hurt.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idTrigger_Hurt;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idTrigger_Hurt.prototype.GetType = function ( ): idTypeInfo {
	return ( idTrigger_Hurt.Type );
};

idTrigger_Hurt.eventCallbacks = [
	EVENT( EV_Touch,		idTrigger_Hurt.prototype.Event_Touch ),
	EVENT( EV_Activate,		idTrigger_Hurt.prototype.Event_Toggle )
];

idTrigger_Hurt.Type = new idTypeInfo("idTrigger_Hurt", "idTrigger",
	idTrigger_Hurt.eventCallbacks, idTrigger_Hurt.CreateInstance, idTrigger_Hurt.prototype.Spawn,
	idTrigger_Hurt.prototype.Save, idTrigger_Hurt.prototype.Restore );

////END_CLASS
////
////
/////*
////===============================================================================
////
////  idTrigger_Fade
////
////===============================================================================
////*/
////
////CLASS_DECLARATION( idTrigger, idTrigger_Fade )
idTrigger_Fade.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idTrigger_Fade;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idTrigger_Fade.prototype.GetType = function ( ): idTypeInfo {
	return ( idTrigger_Fade.Type );
};

idTrigger_Fade.eventCallbacks = [
	EVENT( EV_Activate,		idTrigger_Fade.prototype.Event_Trigger )
];

idTrigger_Fade.Type = new idTypeInfo("idTrigger_Fade", "idTrigger",
	idTrigger_Fade.eventCallbacks, idTrigger_Fade.CreateInstance, idTrigger_Fade.prototype.Spawn,
	idTrigger_Fade.prototype.Save, idTrigger_Fade.prototype.Restore );

////END_CLASS
////
/////*
////===============================================================================
////
////  idTrigger_Touch
////	
////===============================================================================
////*/
////
////CLASS_DECLARATION( idTrigger, idTrigger_Touch )
idTrigger_Touch.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idTrigger_Touch;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idTrigger_Touch.prototype.GetType = function ( ): idTypeInfo {
	return ( idTrigger_Touch.Type );
};

idTrigger_Touch.eventCallbacks = [
	EVENT( EV_Activate,		idTrigger_Touch.prototype.Event_Trigger )
];

idTrigger_Touch.Type = new idTypeInfo("idTrigger_Touch", "idTrigger",
	idTrigger_Touch.eventCallbacks, idTrigger_Touch.CreateInstance, idTrigger_Touch.prototype.Spawn,
	idTrigger_Touch.prototype.Save, idTrigger_Touch.prototype.Restore );

////END_CLASS
////
////