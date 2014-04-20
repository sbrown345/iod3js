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
////	idProjectile
////
////===============================================================================
////*/
////
////
////static const int BFG_DAMAGE_FREQUENCY			= 333;
////static const float BOUNCE_SOUND_MIN_VELOCITY	= 200.0f;
////static const float BOUNCE_SOUND_MAX_VELOCITY	= 400.0f;
////
var EV_Explode = new idEventDef( "<explode>", null );
var EV_Fizzle = new idEventDef( "<fizzle>", null );
var EV_RadiusDamage = new idEventDef( "<radiusdmg>", "e" );
var EV_GetProjectileState = new idEventDef( "getProjectileState", null, 'd' );
////
////CLASS_DECLARATION( idEntity, idProjectile )
idProjectile.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idProjectile;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idProjectile.prototype.GetType = function ( ): idTypeInfo {
	return ( idProjectile.Type );
};

idProjectile.eventCallbacks = [
	EVENT( EV_Explode,				idProjectile.prototype.Event_Explode ),
	EVENT( EV_Fizzle,				idProjectile.prototype.Event_Fizzle ),
	EVENT( EV_Touch,				idProjectile.prototype.Event_Touch ),
	EVENT( EV_RadiusDamage,			idProjectile.prototype.Event_RadiusDamage ),
	EVENT( EV_GetProjectileState,	idProjectile.prototype.Event_GetProjectileState )
];

idProjectile.Type = new idTypeInfo("idProjectile", "idEntity",
	idProjectile.eventCallbacks, idProjectile.CreateInstance, idProjectile.prototype.Spawn,
	idProjectile.prototype.Save, idProjectile.prototype.Restore );

/////*
////===============================================================================
////
////	idGuidedProjectile
////
////===============================================================================
////*/
////
////CLASS_DECLARATION( idProjectile, idGuidedProjectile )
idGuidedProjectile.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idGuidedProjectile;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idGuidedProjectile.prototype.GetType = function ( ): idTypeInfo {
	return ( idGuidedProjectile.Type );
};

idGuidedProjectile.eventCallbacks = [
];

idGuidedProjectile.Type = new idTypeInfo("idGuidedProjectile", "idProjectile",
	idGuidedProjectile.eventCallbacks, idGuidedProjectile.CreateInstance, idGuidedProjectile.prototype.Spawn,
	idGuidedProjectile.prototype.Save, idGuidedProjectile.prototype.Restore );

////END_CLASS
////
/////*
////===============================================================================
////
////idSoulCubeMissile
////
////===============================================================================
////*/
////
////CLASS_DECLARATION( idGuidedProjectile, idSoulCubeMissile )
idSoulCubeMissile.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idSoulCubeMissile;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idSoulCubeMissile.prototype.GetType = function ( ): idTypeInfo {
	return ( idSoulCubeMissile.Type );
};

idSoulCubeMissile.eventCallbacks = [
];

idSoulCubeMissile.Type = new idTypeInfo("idSoulCubeMissile", "idGuidedProjectile",
	idSoulCubeMissile.eventCallbacks, idSoulCubeMissile.CreateInstance, idSoulCubeMissile.prototype.Spawn,
	idSoulCubeMissile.prototype.Save, idSoulCubeMissile.prototype.Restore );

////END_CLASS
////
////
/////*
////===============================================================================
////
////idBFGProjectile
////
////===============================================================================
////*/
var EV_RemoveBeams = new idEventDef( "<removeBeams>", null );
////
////CLASS_DECLARATION( idProjectile, idBFGProjectile )
idBFGProjectile.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idBFGProjectile;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idBFGProjectile.prototype.GetType = function ( ): idTypeInfo {
	return ( idBFGProjectile.Type );
};

idBFGProjectile.eventCallbacks = [
	EVENT( EV_RemoveBeams,		idBFGProjectile.prototype.Event_RemoveBeams )
];

idBFGProjectile.Type = new idTypeInfo("idBFGProjectile", "idProjectile",
	idBFGProjectile.eventCallbacks, idBFGProjectile.CreateInstance, idBFGProjectile.prototype.Spawn,
	idBFGProjectile.prototype.Save, idBFGProjectile.prototype.Restore );

////END_CLASS
////
////
////
/////*
////===============================================================================
////
////	idDebris
////
////===============================================================================
////*/
////
////CLASS_DECLARATION( idEntity, idDebris )
idDebris.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idDebris;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idDebris.prototype.GetType = function ( ): idTypeInfo {
	return ( idDebris.Type );
};

idDebris.eventCallbacks = [
	EVENT( EV_Explode,			idDebris.prototype.Event_Explode ),
	EVENT( EV_Fizzle,			idDebris.prototype.Event_Fizzle )
];

idDebris.Type = new idTypeInfo("idDebris", "idEntity",
	idDebris.eventCallbacks, idDebris.CreateInstance, idDebris.prototype.Spawn,
	idDebris.prototype.Save, idDebris.prototype.Restore );

////END_CLASS
////