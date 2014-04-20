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

  idMoveable
	
===============================================================================
*/

var EV_BecomeNonSolid = new idEventDef( "becomeNonSolid" );
var EV_SetOwnerFromSpawnArgs = new idEventDef( "<setOwnerFromSpawnArgs>" );
var EV_IsAtRest = new idEventDef( "isAtRest", null, 'd' );
var EV_EnableDamage = new idEventDef( "enableDamage", "f" );
////
////CLASS_DECLARATION( idEntity, idMoveable )
idMoveable.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idMoveable;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idMoveable.prototype.GetType = function ( ): idTypeInfo {
	return ( idMoveable.Type );
};

idMoveable.eventCallbacks = [
	EVENT( EV_Activate,					idMoveable.prototype.Event_Activate ),
	EVENT( EV_BecomeNonSolid,			idMoveable.prototype.Event_BecomeNonSolid ),
	EVENT( EV_SetOwnerFromSpawnArgs,	idMoveable.prototype.Event_SetOwnerFromSpawnArgs ),
	EVENT( EV_IsAtRest,					idMoveable.prototype.Event_IsAtRest ),
	EVENT( EV_EnableDamage,				idMoveable.prototype.Event_EnableDamage )
];

idMoveable.Type = new idTypeInfo( "idMoveable", "idEntity",
	idMoveable.eventCallbacks, idMoveable.CreateInstance, idMoveable.prototype.Spawn,
	idMoveable.prototype.Save, idMoveable.prototype.Restore );

////END_CLASS
////
////
////static const float BOUNCE_SOUND_MIN_VELOCITY	= 80.0f;
////static const float BOUNCE_SOUND_MAX_VELOCITY	= 200.0f;
////
////
/////*
////===============================================================================
////
////  idBarrel
////	
////===============================================================================
////*/
////
////CLASS_DECLARATION( idMoveable, idBarrel )
idBarrel.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idBarrel;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idBarrel.prototype.GetType = function ( ): idTypeInfo {
	return ( idBarrel.Type );
};

idBarrel.eventCallbacks = [
];

idBarrel.Type = new idTypeInfo("idBarrel", "idMoveable",
	idBarrel.eventCallbacks, idBarrel.CreateInstance, idBarrel.prototype.Spawn,
	idBarrel.prototype.Save, idBarrel.prototype.Restore );

////END_CLASS
////
////
/*
===============================================================================

idExplodingBarrel

===============================================================================
*/
var EV_Respawn = new idEventDef( "<respawn>" );
var EV_TriggerTargets = new idEventDef( "<triggertargets>" );
////
////CLASS_DECLARATION( idBarrel, idExplodingBarrel )
idExplodingBarrel.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idExplodingBarrel;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idExplodingBarrel.prototype.GetType = function ( ): idTypeInfo {
	return ( idExplodingBarrel.Type );
};

idExplodingBarrel.eventCallbacks = [
	EVENT( EV_Activate,					idExplodingBarrel.prototype.Event_Activate ),
	EVENT( EV_Respawn,					idExplodingBarrel.prototype.Event_Respawn ),
	EVENT( EV_Explode,					idExplodingBarrel.prototype.Event_Explode ),
	EVENT( EV_TriggerTargets,			idExplodingBarrel.prototype.Event_TriggerTargets ),
];

idExplodingBarrel.Type = new idTypeInfo("idExplodingBarrel", "idBarrel",
	idExplodingBarrel.eventCallbacks, idExplodingBarrel.CreateInstance, idExplodingBarrel.prototype.Spawn,
	idExplodingBarrel.prototype.Save, idExplodingBarrel.prototype.Restore );

////END_CLASS
////