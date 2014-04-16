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
////Various utility objects and functions.
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
////idSpawnableEntity
////
////A simple, spawnable entity with a model and no functionable ability of it's own.
////For example, it can be used as a placeholder during development, for marking
////locations on maps for script, or for simple placed models without any behavior
////that can be bound to other entities.  Should not be subclassed.
////===============================================================================
////*/
////
////CLASS_DECLARATION( idEntity, idSpawnableEntity )
idSpawnableEntity.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idSpawnableEntity;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idSpawnableEntity.prototype.GetType = function ( ): idTypeInfo {
	return ( idSpawnableEntity.Type );
};

idSpawnableEntity.eventCallbacks = [
];

idSpawnableEntity.Type = new idTypeInfo("idSpawnableEntity", "idEntity",
	idSpawnableEntity.eventCallbacks, idSpawnableEntity.CreateInstance, idSpawnableEntity.prototype.Spawn,
	idSpawnableEntity.prototype.Save, idSpawnableEntity.prototype.Restore );

////END_CLASS
////
/*
===============================================================================

	idPlayerStart

===============================================================================
*/

var EV_TeleportStage= new idEventDef( "<TeleportStage>", "e" );
////
////CLASS_DECLARATION( idEntity, idPlayerStart )
idPlayerStart.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idPlayerStart;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idPlayerStart.prototype.GetType = function ( ): idTypeInfo {
	return ( idPlayerStart.Type );
};

idPlayerStart.eventCallbacks = [
	EVENT( EV_Activate,			idPlayerStart.prototype.Event_TeleportPlayer ),
	EVENT( EV_TeleportStage,	idPlayerStart.prototype.Event_TeleportStage )
];

idPlayerStart.Type = new idTypeInfo( "idPlayerStart", "idEntity",
	idPlayerStart.eventCallbacks, idPlayerStart.CreateInstance, idPlayerStart.prototype.Spawn,
	idPlayerStart.prototype.Save, idPlayerStart.prototype.Restore );

////END_CLASS
////
/////*
////===============================================================================
////
////	idActivator
////
////===============================================================================
////*/
////
////CLASS_DECLARATION( idEntity, idActivator )
idActivator.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idActivator;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idActivator.prototype.GetType = function ( ): idTypeInfo {
	return ( idActivator.Type );
};

idActivator.eventCallbacks = [
	EVENT( EV_Activate,		idActivator.prototype.Event_Activate )
];

idActivator.Type = new idTypeInfo("idActivator", "idEntity",
	idActivator.eventCallbacks, idActivator.CreateInstance, idActivator.prototype.Spawn,
	idActivator.prototype.Save, idActivator.prototype.Restore );

////END_CLASS
////
/////*
////===============================================================================
////
////idPathCorner
////
////===============================================================================
////*/
////
////CLASS_DECLARATION( idEntity, idPathCorner )
idPathCorner.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idPathCorner;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idPathCorner.prototype.GetType = function ( ): idTypeInfo {
	return ( idPathCorner.Type );
};

idPathCorner.eventCallbacks = [
	EVENT( AI_RandomPath,		idPathCorner.prototype.Event_RandomPath )
];

idPathCorner.Type = new idTypeInfo("idPathCorner", "idEntity",
	idPathCorner.eventCallbacks, idPathCorner.CreateInstance, idPathCorner.prototype.Spawn,
	idPathCorner.prototype.Save, idPathCorner.prototype.Restore );

////END_CLASS

/*
===============================================================================

  idDamagable
	
===============================================================================
*/

var EV_RestoreDamagable= new idEventDef( "<RestoreDamagable>" );
////
////CLASS_DECLARATION( idEntity, idDamagable )
idDamagable.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idDamagable;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idDamagable.prototype.GetType = function ( ): idTypeInfo {
	return ( idDamagable.Type );
};

idDamagable.eventCallbacks = [
	EVENT( EV_Activate,			idDamagable.prototype.Event_BecomeBroken ),
	EVENT( EV_RestoreDamagable,	idDamagable.prototype.Event_RestoreDamagable )
];

idDamagable.Type = new idTypeInfo("idDamagable", "idEntity",
	idDamagable.eventCallbacks, idDamagable.CreateInstance, idDamagable.prototype.Spawn,
	idDamagable.prototype.Save, idDamagable.prototype.Restore );

////END_CLASS
////
/////*
////===============================================================================
////
////  idExplodable
////	
////===============================================================================
////*/
////
////CLASS_DECLARATION( idEntity, idExplodable )
idExplodable.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idExplodable;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idExplodable.prototype.GetType = function ( ): idTypeInfo {
	return ( idExplodable.Type );
};

idExplodable.eventCallbacks = [
	EVENT(EV_Activate, idExplodable.prototype.Event_Explode)
];

idExplodable.Type = new idTypeInfo("idExplodable", "idEntity",
	idExplodable.eventCallbacks, idExplodable.CreateInstance, idExplodable.prototype.Spawn,
	idExplodable.prototype.Save, idExplodable.prototype.Restore );


////END_CLASS
////
////
/////*
////===============================================================================
////
////  idSpring
////	
////===============================================================================
////*/
////
////CLASS_DECLARATION( idEntity, idSpring )
idSpring.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idSpring;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idSpring.prototype.GetType = function ( ): idTypeInfo {
	return ( idSpring.Type );
};

idSpring.eventCallbacks = [
	EVENT( EV_PostSpawn,	idSpring.prototype.Event_LinkSpring )
];

idSpring.Type = new idTypeInfo( "idSpring", "idEntity",
	idSpring.eventCallbacks, idSpring.CreateInstance, idSpring.prototype.Spawn,
	idSpring.prototype.Save, idSpring.prototype.Restore );

////END_CLASS
////
/*
===============================================================================

  idForceField
	
===============================================================================
*/

var EV_Toggle = new idEventDef( "Toggle", null );
////
////CLASS_DECLARATION( idEntity, idForceField )
idForceField.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idForceField;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idForceField.prototype.GetType = function ( ): idTypeInfo {
	return ( idForceField.Type );
};

idForceField.eventCallbacks = [
	EVENT( EV_Activate,		idForceField.prototype.Event_Activate ),
	EVENT( EV_Toggle,		idForceField.prototype.Event_Toggle ),
	EVENT( EV_FindTargets,	idForceField.prototype.Event_FindTargets )
];

idForceField.Type = new idTypeInfo("idForceField", "idEntity",
	idForceField.eventCallbacks, idForceField.CreateInstance, idForceField.prototype.Spawn,
	idForceField.prototype.Save, idForceField.prototype.Restore );

////END_CLASS
////
////
/*
===============================================================================

	idAnimated

===============================================================================
*/

var EV_Animated_Start= new idEventDef( "<start>" );
var EV_LaunchMissiles= new idEventDef( "launchMissiles", "ssssdf" );
var EV_LaunchMissilesUpdate= new idEventDef( "<launchMissiles>", "dddd" );
var EV_AnimDone= new idEventDef( "<AnimDone>", "d" );
var EV_StartRagdoll= new idEventDef( "startRagdoll" );
////
////CLASS_DECLARATION( idAFEntity_Gibbable, idAnimated )
idAnimated.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idAnimated;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idAnimated.prototype.GetType = function ( ): idTypeInfo {
	return ( idAnimated.Type );
};

idAnimated.eventCallbacks = [
	EVENT( EV_Activate,				idAnimated.prototype.Event_Activate ),
	EVENT( EV_Animated_Start,		idAnimated.prototype.Event_Start ),
	EVENT( EV_StartRagdoll,			idAnimated.prototype.Event_StartRagdoll ),
	EVENT( EV_AnimDone,				idAnimated.prototype.Event_AnimDone ),
	EVENT( EV_Footstep,				idAnimated.prototype.Event_Footstep ),
	EVENT( EV_FootstepLeft,			idAnimated.prototype.Event_Footstep ),
	EVENT( EV_FootstepRight,		idAnimated.prototype.Event_Footstep ),
	EVENT( EV_LaunchMissiles,		idAnimated.prototype.Event_LaunchMissiles ),
	EVENT( EV_LaunchMissilesUpdate,	idAnimated.prototype.Event_LaunchMissilesUpdate )
];

idAnimated.Type = new idTypeInfo("idAnimated", "idAFEntity_Gibbable",
	idAnimated.eventCallbacks, idAnimated.CreateInstance, idAnimated.prototype.Spawn,
	idAnimated.prototype.Save, idAnimated.prototype.Restore );

////END_CLASS
////
/////*
////===============================================================================
////
////	idStaticEntity
////
////	Some static entities may be optimized into inline geometry by dmap
////
////===============================================================================
////*/
////
////CLASS_DECLARATION( idEntity, idStaticEntity )
idStaticEntity.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idStaticEntity;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idStaticEntity.prototype.GetType = function ( ): idTypeInfo {
	return ( idStaticEntity.Type );
};

idStaticEntity.eventCallbacks = [
	EVENT( EV_Activate,				idStaticEntity.prototype.Event_Activate )
];

idStaticEntity.Type = new idTypeInfo("idStaticEntity", "idEntity",
	idStaticEntity.eventCallbacks, idStaticEntity.CreateInstance, idStaticEntity.prototype.Spawn,
	idStaticEntity.prototype.Save, idStaticEntity.prototype.Restore );

/////*
////===============================================================================
////
////idFuncEmitter
////
////===============================================================================
////*/
////
////
////CLASS_DECLARATION( idStaticEntity, idFuncEmitter )
idFuncEmitter.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idFuncEmitter;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idFuncEmitter.prototype.GetType = function ( ): idTypeInfo {
	return ( idFuncEmitter.Type );
};

idFuncEmitter.eventCallbacks = [
	EVENT( EV_Activate,				idFuncEmitter.prototype.Event_Activate )
];

idFuncEmitter.Type = new idTypeInfo("idFuncEmitter", "idStaticEntity",
	idFuncEmitter.eventCallbacks, idFuncEmitter.CreateInstance, idFuncEmitter.prototype.Spawn,
	idFuncEmitter.prototype.Save, idFuncEmitter.prototype.Restore );

////END_CLASS
////

/*
===============================================================================

idFuncSplat

===============================================================================
*/


var EV_Splat= new idEventDef( "<Splat>" );
////CLASS_DECLARATION( idFuncEmitter, idFuncSplat )
idFuncSplat.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idFuncSplat;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idFuncSplat.prototype.GetType = function ( ): idTypeInfo {
	return ( idFuncSplat.Type );
};

idFuncSplat.eventCallbacks = [
	EVENT( EV_Activate,		idFuncSplat.prototype.Event_Activate ),
	EVENT( EV_Splat,		idFuncSplat.prototype.Event_Splat )
];

idFuncSplat.Type = new idTypeInfo("idFuncSplat", "idFuncEmitter",
	idFuncSplat.eventCallbacks, idFuncSplat.CreateInstance, idFuncSplat.prototype.Spawn,
	idFuncSplat.prototype.Save, idFuncSplat.prototype.Restore );

////END_CLASS
////
////
/////*
////===============================================================================
////
////idFuncSmoke
////
////===============================================================================
////*/
////
////CLASS_DECLARATION( idEntity, idFuncSmoke )
idFuncSmoke.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idFuncSmoke;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idFuncSmoke.prototype.GetType = function ( ): idTypeInfo {
	return ( idFuncSmoke.Type );
};

idFuncSmoke.eventCallbacks = [
	EVENT( EV_Activate,				idFuncSmoke.prototype.Event_Activate )
];

idFuncSmoke.Type = new idTypeInfo("idFuncSmoke", "idEntity",
	idFuncSmoke.eventCallbacks, idFuncSmoke.CreateInstance, idFuncSmoke.prototype.Spawn,
	idFuncSmoke.prototype.Save, idFuncSmoke.prototype.Restore );

////END_CLASS
////
////
/////*
////===============================================================================
////
////	idTextEntity
////
////===============================================================================
////*/
////
////CLASS_DECLARATION( idEntity, idTextEntity )
idTextEntity.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idTextEntity;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idTextEntity.prototype.GetType = function ( ): idTypeInfo {
	return ( idTextEntity.Type );
};

idTextEntity.eventCallbacks = [
];

idTextEntity.Type = new idTypeInfo("idTextEntity", "idEntity",
	idTextEntity.eventCallbacks, idTextEntity.CreateInstance, idTextEntity.prototype.Spawn,
	idTextEntity.prototype.Save, idTextEntity.prototype.Restore );

////END_CLASS
////
////
/////*
////===============================================================================
////
////	idVacuumSeperatorEntity
////
////	Can be triggered to let vacuum through a portal (blown out window)
////
////===============================================================================
////*/
////
////CLASS_DECLARATION( idEntity, idVacuumSeparatorEntity )
idVacuumSeparatorEntity.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idVacuumSeparatorEntity;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idVacuumSeparatorEntity.prototype.GetType = function ( ): idTypeInfo {
	return ( idVacuumSeparatorEntity.Type );
};

idVacuumSeparatorEntity.eventCallbacks = [
	EVENT( EV_Activate,		idVacuumSeparatorEntity.prototype.Event_Activate )
];

idVacuumSeparatorEntity.Type = new idTypeInfo("idVacuumSeparatorEntity", "idEntity",
	idVacuumSeparatorEntity.eventCallbacks, idVacuumSeparatorEntity.CreateInstance, idVacuumSeparatorEntity.prototype.Spawn,
	idVacuumSeparatorEntity.prototype.Save, idVacuumSeparatorEntity.prototype.Restore );

////END_CLASS
////
////
/////*
////===============================================================================
////
////idLocationSeparatorEntity
////
////===============================================================================
////*/
////
////CLASS_DECLARATION( idEntity, idLocationSeparatorEntity )
idLocationSeparatorEntity.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idLocationSeparatorEntity;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idLocationSeparatorEntity.prototype.GetType = function ( ): idTypeInfo {
	return ( idLocationSeparatorEntity.Type );
};

idLocationSeparatorEntity.eventCallbacks = [
];

idLocationSeparatorEntity.Type = new idTypeInfo("idLocationSeparatorEntity", "idEntity",
	idLocationSeparatorEntity.eventCallbacks, idLocationSeparatorEntity.CreateInstance, idLocationSeparatorEntity.prototype.Spawn,
	idLocationSeparatorEntity.prototype.Save, idLocationSeparatorEntity.prototype.Restore );

////END_CLASS
////
////
/////*
////===============================================================================
////
////	idVacuumEntity
////
////	Levels should only have a single vacuum entity.
////
////===============================================================================
////*/
////
////CLASS_DECLARATION( idEntity, idVacuumEntity )
idVacuumEntity.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idVacuumEntity;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idVacuumEntity.prototype.GetType = function ( ): idTypeInfo {
	return ( idVacuumEntity.Type );
};

idVacuumEntity.eventCallbacks = [
];

idVacuumEntity.Type = new idTypeInfo("idVacuumEntity", "idEntity",
	idVacuumEntity.eventCallbacks, idVacuumEntity.CreateInstance, idVacuumEntity.prototype.Spawn,
	idVacuumEntity.prototype.Save, idVacuumEntity.prototype.Restore );

////END_CLASS
////
////
/////*
////===============================================================================
////
////idLocationEntity
////
////===============================================================================
////*/
////
////CLASS_DECLARATION( idEntity, idLocationEntity )
idLocationEntity.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idLocationEntity;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idLocationEntity.prototype.GetType = function ( ): idTypeInfo {
	return ( idLocationEntity.Type );
};

idLocationEntity.eventCallbacks = [
];

idLocationEntity.Type = new idTypeInfo("idLocationEntity", "idEntity",
	idLocationEntity.eventCallbacks, idLocationEntity.CreateInstance, idLocationEntity.prototype.Spawn,
	idLocationEntity.prototype.Save, idLocationEntity.prototype.Restore );

////END_CLASS
////
/////*
////===============================================================================
////
////	idBeam
////
////===============================================================================
////*/
////
////CLASS_DECLARATION( idEntity, idBeam )
idBeam.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idBeam;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idBeam.prototype.GetType = function ( ): idTypeInfo {
	return ( idBeam.Type );
};

idBeam.eventCallbacks = [
	EVENT( EV_PostSpawn,			idBeam.prototype.Event_MatchTarget ),
	EVENT( EV_Activate,				idBeam.prototype.Event_Activate )
];

idBeam.Type = new idTypeInfo("idBeam", "idEntity",
	idBeam.eventCallbacks, idBeam.CreateInstance, idBeam.prototype.Spawn,
	idBeam.prototype.Save, idBeam.prototype.Restore );

////END_CLASS
////
////
/////*
////===============================================================================
////
////	idLiquid
////
////===============================================================================
////*/
////
////CLASS_DECLARATION( idEntity, idLiquid )
idLiquid.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idLiquid;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idLiquid.prototype.GetType = function ( ): idTypeInfo {
	return ( idLiquid.Type );
};

idLiquid.eventCallbacks = [
	EVENT( EV_Touch,			idLiquid.prototype.Event_Touch )
];

idLiquid.Type = new idTypeInfo( "idLiquid", "idEntity",
	idLiquid.eventCallbacks, idLiquid.CreateInstance, idLiquid.prototype.Spawn,
	idLiquid.prototype.Save, idLiquid.prototype.Restore );

////END_CLASS
////
////
/////*
////===============================================================================
////
////	idShaking
////
////===============================================================================
////*/
////
////CLASS_DECLARATION( idEntity, idShaking )
idShaking.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idShaking;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idShaking.prototype.GetType = function ( ): idTypeInfo {
	return ( idShaking.Type );
};

idShaking.eventCallbacks = [
	EVENT( EV_Activate,				idShaking.prototype.Event_Activate )
];

idShaking.Type = new idTypeInfo("idShaking", "idEntity",
	idShaking.eventCallbacks, idShaking.CreateInstance, idShaking.prototype.Spawn,
	idShaking.prototype.Save, idShaking.prototype.Restore );

////END_CLASS
////
/////*
////===============================================================================
////
////	idEarthQuake
////
////===============================================================================
////*/
////
////CLASS_DECLARATION( idEntity, idEarthQuake )
idEarthQuake.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idEarthQuake;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idEarthQuake.prototype.GetType = function ( ): idTypeInfo {
	return ( idEarthQuake.Type );
};

idEarthQuake.eventCallbacks = [
	EVENT( EV_Activate,				idEarthQuake.prototype.Event_Activate )
];

idEarthQuake.Type = new idTypeInfo("idEarthQuake", "idEntity",
	idEarthQuake.eventCallbacks, idEarthQuake.CreateInstance, idEarthQuake.prototype.Spawn,
	idEarthQuake.prototype.Save, idEarthQuake.prototype.Restore );

////END_CLASS
////
////
/////*
////===============================================================================
////
////	idFuncPortal
////
////===============================================================================
////*/
////
////CLASS_DECLARATION( idEntity, idFuncPortal )
idFuncPortal.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idFuncPortal;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idFuncPortal.prototype.GetType = function ( ): idTypeInfo {
	return ( idFuncPortal.Type );
};

idFuncPortal.eventCallbacks = [
	EVENT( EV_Activate,				idFuncPortal.prototype.Event_Activate )
];

idFuncPortal.Type = new idTypeInfo("idFuncPortal", "idEntity",
	idFuncPortal.eventCallbacks, idFuncPortal.CreateInstance, idFuncPortal.prototype.Spawn,
	idFuncPortal.prototype.Save, idFuncPortal.prototype.Restore );

////END_CLASS
////
/////*
////===============================================================================
////
////	idFuncAASPortal
////
////===============================================================================
////*/
////
////CLASS_DECLARATION( idEntity, idFuncAASPortal )
idFuncAASPortal.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idFuncAASPortal;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idFuncAASPortal.prototype.GetType = function ( ): idTypeInfo {
	return ( idFuncAASPortal.Type );
};

idFuncAASPortal.eventCallbacks = [
	EVENT( EV_Activate,				idFuncAASPortal.prototype.Event_Activate )
];

idFuncAASPortal.Type = new idTypeInfo("idFuncAASPortal", "idEntity",
	idFuncAASPortal.eventCallbacks, idFuncAASPortal.CreateInstance, idFuncAASPortal.prototype.Spawn,
	idFuncAASPortal.prototype.Save, idFuncAASPortal.prototype.Restore );

////END_CLASS
////
/////*
////===============================================================================
////
////	idFuncAASObstacle
////
////===============================================================================
////*/
////
////CLASS_DECLARATION( idEntity, idFuncAASObstacle )
idFuncAASObstacle.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idFuncAASObstacle;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idFuncAASObstacle.prototype.GetType = function ( ): idTypeInfo {
	return ( idFuncAASObstacle.Type );
};

idFuncAASObstacle.eventCallbacks = [
	EVENT( EV_Activate,				idFuncAASObstacle.prototype.Event_Activate )
];

idFuncAASObstacle.Type = new idTypeInfo("idFuncAASObstacle", "idEntity",
	idFuncAASObstacle.eventCallbacks, idFuncAASObstacle.CreateInstance, idFuncAASObstacle.prototype.Spawn,
	idFuncAASObstacle.prototype.Save, idFuncAASObstacle.prototype.Restore );

////END_CLASS
////
////
////
/*
===============================================================================

idFuncRadioChatter

===============================================================================
*/

var EV_ResetRadioHud= new idEventDef( "<resetradiohud>", "e" );


////CLASS_DECLARATION( idEntity, idFuncRadioChatter )
idFuncRadioChatter.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idFuncRadioChatter;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idFuncRadioChatter.prototype.GetType = function ( ): idTypeInfo {
	return ( idFuncRadioChatter.Type );
};

idFuncRadioChatter.eventCallbacks = [
	EVENT( EV_Activate,				idFuncRadioChatter.prototype.Event_Activate ),
	EVENT( EV_ResetRadioHud,		idFuncRadioChatter.prototype.Event_ResetRadioHud )
];

idFuncRadioChatter.Type = new idTypeInfo("idFuncRadioChatter", "idEntity",
	idFuncRadioChatter.eventCallbacks, idFuncRadioChatter.CreateInstance, idFuncRadioChatter.prototype.Spawn,
	idFuncRadioChatter.prototype.Save, idFuncRadioChatter.prototype.Restore );

////END_CLASS
////
/////*
////===============================================================================
////
////	idPhantomObjects
////
////===============================================================================
////*/
////
////CLASS_DECLARATION( idEntity, idPhantomObjects )
idPhantomObjects.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idPhantomObjects;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idPhantomObjects.prototype.GetType = function ( ): idTypeInfo {
	return ( idPhantomObjects.Type );
};

idPhantomObjects.eventCallbacks = [
	EVENT( EV_Activate,				idPhantomObjects.prototype.Event_Activate )
];

idPhantomObjects.Type = new idTypeInfo( "idPhantomObjects", "idEntity",
	idPhantomObjects.eventCallbacks, idPhantomObjects.CreateInstance, idPhantomObjects.prototype.Spawn,
	idPhantomObjects.prototype.Save, idPhantomObjects.prototype.Restore );

////END_CLASS
////