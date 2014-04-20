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

/*
===============================================================================

  idItem

===============================================================================
*/

var EV_DropToFloor= new idEventDef( "<dropToFloor>" );
var EV_RespawnItem= new idEventDef( "respawn" );
var EV_RespawnFx= new idEventDef( "<respawnFx>" );
var EV_GetPlayerPos= new idEventDef( "<getplayerpos>" );
var EV_HideObjective= new idEventDef( "<hideobjective>", "e" );
var EV_CamShot= new idEventDef( "<camshot>" );


////CLASS_DECLARATION( idEntity, idItem )
idItem.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idItem;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idItem.prototype.GetType = function ( ): idTypeInfo {
	return ( idItem.Type );
};

idItem.eventCallbacks = [
	EVENT(EV_DropToFloor, idItem.prototype.Event_DropToFloor),
	EVENT(EV_Touch, idItem.prototype.Event_Touch),
	EVENT(EV_Activate, idItem.prototype.Event_Trigger),
	EVENT(EV_RespawnItem, idItem.prototype.Event_Respawn),
	EVENT(EV_RespawnFx, idItem.prototype.Event_RespawnFx)
];

idItem.Type = new idTypeInfo( "idItem", "idEntity",
	idItem.eventCallbacks, idItem.CreateInstance, idItem.prototype.Spawn,
	idItem.prototype.Save, idItem.prototype.Restore );

////
/*
===============================================================================

  idItemPowerup

===============================================================================
*/

/*
===============
idItemPowerup
===============
*/

//CLASS_DECLARATION( idItem, idItemPowerup )
idItemPowerup.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idItemPowerup;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idItemPowerup.prototype.GetType = function ( ): idTypeInfo {
	return ( idItemPowerup.Type );
};

idItemPowerup.eventCallbacks = [
];

idItemPowerup.Type = new idTypeInfo( "idItemPowerup", "idItem",
	idItemPowerup.eventCallbacks, idItemPowerup.CreateInstance, idItemPowerup.prototype.Spawn,
	idItemPowerup.prototype.Save, idItemPowerup.prototype.Restore );

/////*
////===============================================================================
////
////  idObjective
////
////===============================================================================
////*/
////
////CLASS_DECLARATION( idItem, idObjective )
idObjective.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idObjective;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idObjective.prototype.GetType = function ( ): idTypeInfo {
	return ( idObjective.Type );
};

idObjective.eventCallbacks = [
	EVENT( EV_Activate,			idObjective.prototype.Event_Trigger ),
	EVENT( EV_HideObjective,	idObjective.prototype.Event_HideObjective ),
	EVENT( EV_GetPlayerPos,		idObjective.prototype.Event_GetPlayerPos ),
	EVENT( EV_CamShot,			idObjective.prototype.Event_CamShot )
];

idObjective.Type = new idTypeInfo( "idObjective", "idItem",
	idObjective.eventCallbacks, idObjective.CreateInstance, idObjective.prototype.Spawn,
	idObjective.prototype.Save, idObjective.prototype.Restore );


////END_CLASS
////
/////*
////===============================================================================
////
////  idVideoCDItem
////
////===============================================================================
////*/
////
////CLASS_DECLARATION( idItem, idVideoCDItem )
idVideoCDItem.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idVideoCDItem;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idVideoCDItem.prototype.GetType = function ( ): idTypeInfo {
	return ( idVideoCDItem.Type );
};

idVideoCDItem.eventCallbacks = [
];

idVideoCDItem.Type = new idTypeInfo( "idVideoCDItem", "idItem",
	idVideoCDItem.eventCallbacks, idVideoCDItem.CreateInstance, idVideoCDItem.prototype.Spawn,
	idVideoCDItem.prototype.Save, idVideoCDItem.prototype.Restore );

////END_CLASS
////
/////*
////===============================================================================
////
////  idPDAItem
////
////===============================================================================
////*/
////
////CLASS_DECLARATION( idItem, idPDAItem )
idPDAItem.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idPDAItem;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idPDAItem.prototype.GetType = function ( ): idTypeInfo {
	return ( idPDAItem.Type );
};

idPDAItem.eventCallbacks = [
];

idPDAItem.Type = new idTypeInfo( "idPDAItem", "idItem",
	idPDAItem.eventCallbacks, idPDAItem.CreateInstance, idPDAItem.prototype.Spawn,
	idPDAItem.prototype.Save, idPDAItem.prototype.Restore );

////END_CLASS

////
/////*
////===============================================================================
////
////  idMoveableItem
////	
////===============================================================================
////*/
////
////CLASS_DECLARATION( idItem, idMoveableItem )
idMoveableItem.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idMoveableItem;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idMoveableItem.prototype.GetType = function ( ): idTypeInfo {
	return ( idMoveableItem.Type );
};

idMoveableItem.eventCallbacks = [
	EVENT( EV_DropToFloor,	idMoveableItem.prototype.Event_DropToFloor ),
	EVENT( EV_Gib,			idMoveableItem.prototype.Event_Gib )
];

idMoveableItem.Type = new idTypeInfo( "idMoveableItem", "idItem",
	idMoveableItem.eventCallbacks, idMoveableItem.CreateInstance, idMoveableItem.prototype.Spawn,
	idMoveableItem.prototype.Save, idMoveableItem.prototype.Restore );

////END_CLASS
////
/////*
////===============================================================================
////
////  idMoveablePDAItem
////
////===============================================================================
////*/
////
////CLASS_DECLARATION( idMoveableItem, idMoveablePDAItem )
idMoveablePDAItem.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idMoveablePDAItem;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idMoveablePDAItem.prototype.GetType = function ( ): idTypeInfo {
	return ( idMoveablePDAItem.Type );
};

idMoveablePDAItem.eventCallbacks = [
];

idMoveablePDAItem.Type = new idTypeInfo("idMoveablePDAItem", "idMoveableItem",
	idMoveablePDAItem.eventCallbacks, idMoveablePDAItem.CreateInstance, idMoveablePDAItem.prototype.Spawn,
	idMoveablePDAItem.prototype.Save, idMoveablePDAItem.prototype.Restore );

////END_CLASS
////
////
/////*
////===============================================================================
////
////  idItemRemover
////
////===============================================================================
////*/
////
////CLASS_DECLARATION( idEntity, idItemRemover )
idItemRemover.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idItemRemover;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idItemRemover.prototype.GetType = function ( ): idTypeInfo {
	return ( idItemRemover.Type );
};

idItemRemover.eventCallbacks = [
	EVENT(EV_Activate, idItemRemover.prototype.Event_Trigger)
];

idItemRemover.Type = new idTypeInfo("idItemRemover", "idEntity",
	idItemRemover.eventCallbacks, idItemRemover.CreateInstance, idItemRemover.prototype.Spawn,
	idItemRemover.prototype.Save, idItemRemover.prototype.Restore );

////	
////END_CLASS
////
/////*
////===============================================================================
////
////  idObjectiveComplete
////
////===============================================================================
////*/
////
////CLASS_DECLARATION( idItemRemover, idObjectiveComplete )
idObjectiveComplete.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idObjectiveComplete;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idObjectiveComplete.prototype.GetType = function ( ): idTypeInfo {
	return ( idObjectiveComplete.Type );
};

idObjectiveComplete.eventCallbacks = [
	EVENT( EV_Activate,			idObjectiveComplete.prototype.Event_Trigger ),
	EVENT( EV_HideObjective,	idObjectiveComplete.prototype.Event_HideObjective ),
	EVENT( EV_GetPlayerPos,		idObjectiveComplete.prototype.Event_GetPlayerPos )
];

idObjectiveComplete.Type = new idTypeInfo("idObjectiveComplete", "idItemRemover",
	idObjectiveComplete.eventCallbacks, idObjectiveComplete.CreateInstance, idObjectiveComplete.prototype.Spawn,
	idObjectiveComplete.prototype.Save, idObjectiveComplete.prototype.Restore );

////END_CLASS
////