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
/////*
////================
////idTarget_Remove::Event_Activate
////================
////*/
////void idTarget_Remove::Event_Activate( activator:idEntity ) {
////	int			i;
////	idEntity	*ent;
////
////	for( i = 0; i < targets.Num(); i++ ) {
////		ent = targets[ i ].GetEntity();
////		if ( ent ) {
////			ent->PostEventMS( &EV_Remove, 0 );
////		}
////	}
////
////	// delete our self when done
////	PostEventMS( &EV_Remove, 0 );
////}
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
/////*
////================
////idTarget_Show::Event_Activate
////================
////*/
////void idTarget_Show::Event_Activate( activator:idEntity ) {
////	int			i;
////	idEntity	*ent;
////
////	for( i = 0; i < targets.Num(); i++ ) {
////		ent = targets[ i ].GetEntity();
////		if ( ent ) {
////			ent->Show();
////		}
////	}
////
////	// delete our self when done
////	PostEventMS( &EV_Remove, 0 );
////}
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
////================
////idTarget_Damage::Event_Activate
////================
////*/
////void idTarget_Damage::Event_Activate( activator:idEntity ) {
////	int			i;
////	const char *damage;
////	idEntity *	ent;
////
////	damage = spawnArgs.GetString( "def_damage", "damage_generic" );
////	for( i = 0; i < targets.Num(); i++ ) {
////		ent = targets[ i ].GetEntity();
////		if ( ent ) {
////			ent->Damage( this, this, vec3_origin, damage, 1.0f, INVALID_JOINT );
////		}
////	}
////}
////
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
////================
////idTarget_SessionCommand::Event_Activate
////================
////*/
////void idTarget_SessionCommand::Event_Activate( activator:idEntity ) {
////	gameLocal.sessionCommand = spawnArgs.GetString( "command" );
////}
////
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
];

idTarget_EndLevel.Type = new idTypeInfo("idTarget_EndLevel", "idTarget",
	idTarget_EndLevel.eventCallbacks, idTarget_EndLevel.CreateInstance, idTarget_EndLevel.prototype.Spawn,
	idTarget_EndLevel.prototype.Save, idTarget_EndLevel.prototype.Restore );

////	EVENT( EV_Activate,		idTarget_EndLevel::Event_Activate )
////END_CLASS
////
/////*
////================
////idTarget_EndLevel::Event_Activate
////================
////*/
////void idTarget_EndLevel::Event_Activate( activator:idEntity ) {
////	idStr nextMap;
////
////#ifdef ID_DEMO_BUILD
////	if ( spawnArgs.GetBool( "endOfGame" ) ) {
////		cvarSystem->SetCVarBool( "g_nightmare", true );
////		gameLocal.sessionCommand = "endofDemo";
////		return;
////	}
////#else
////	if ( spawnArgs.GetBool( "endOfGame" ) ) {
////		cvarSystem->SetCVarBool( "g_nightmare", true );
////		gameLocal.sessionCommand = "disconnect";
////		return;
////	}
////#endif
////	if ( !spawnArgs.GetString( "nextMap", "", nextMap ) ) {
////		gameLocal.Printf( "idTarget_SessionCommand::Event_Activate: no nextMap key\n" );
////		return;
////	}
////
////	if ( spawnArgs.GetInt( "devmap", "0" ) ) {
////		gameLocal.sessionCommand = "devmap ";	// only for special demos
////	} else {
////		gameLocal.sessionCommand = "map ";
////	}
////
////	gameLocal.sessionCommand += nextMap;
////}
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
////================
////idTarget_WaitForButton::Event_Activate
////================
////*/
////void idTarget_WaitForButton::Event_Activate( activator:idEntity ) {
////	if ( thinkFlags & TH_THINK ) {
////		BecomeInactive( TH_THINK );
////	} else {
////		// always allow during cinematics
////		cinematic = true;
////		BecomeActive( TH_THINK );
////	}
////}
////
/////*
////================
////idTarget_WaitForButton::Think
////================
////*/
////void idTarget_WaitForButton::Think( void ) {
////	idPlayer *player;
////
////	if ( thinkFlags & TH_THINK ) {
////		player = gameLocal.GetLocalPlayer();
////		if ( player && ( !player->oldButtons & BUTTON_ATTACK ) && ( player->usercmd.buttons & BUTTON_ATTACK ) ) {
////			player->usercmd.buttons &= ~BUTTON_ATTACK;
////			BecomeInactive( TH_THINK );
////			ActivateTargets( player );
////		}
////	} else {
////		BecomeInactive( TH_ALL );
////	}
////}
////
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
////================
////idTarget_SetGlobalShaderTime::Event_Activate
////================
////*/
////void idTarget_SetGlobalShaderTime::Event_Activate( activator:idEntity ) {
////	int parm = spawnArgs.GetInt( "globalParm" );
////	/*float*/time:number = -MS2SEC( gameLocal.time );
////	if ( parm >= 0 && parm < MAX_GLOBAL_SHADER_PARMS ) {
////		gameLocal.globalShaderParms[parm] = time;
////	}
////}
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
////================
////idTarget_SetShaderParm::Event_Activate
////================
////*/
////void idTarget_SetShaderParm::Event_Activate( activator:idEntity ) {
////	int			i;
////	idEntity *	ent;
////	float		value;
////	idVec3		color;
////	int			parmnum;
////
////	// set the color on the targets
////	if ( spawnArgs.GetVector( "_color", "1 1 1", color ) ) {
////		for( i = 0; i < targets.Num(); i++ ) {
////			ent = targets[ i ].GetEntity();
////			if ( ent ) {
////				ent->SetColor( color[ 0 ], color[ 1 ], color[ 2 ] );
////			}
////		}
////	}
////
////	// set any shader parms on the targets
////	for( parmnum = 0; parmnum < MAX_ENTITY_SHADER_PARMS; parmnum++ ) {
////		if ( spawnArgs.GetFloat( va( "shaderParm%d", parmnum ), "0", value ) ) {
////			for( i = 0; i < targets.Num(); i++ ) {
////				ent = targets[ i ].GetEntity();
////				if ( ent ) {
////					ent->SetShaderParm( parmnum, value );
////				}
////			}
////			if (spawnArgs.GetBool("toggle") && (value == 0 || value == 1)) {
////				int val = value;
////				val ^= 1;
////				value = val;
////				spawnArgs.SetFloat(va("shaderParm%d", parmnum), value);
////			}
////		}
////	}
////}
////
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
/////*
////================
////idTarget_SetShaderTime::Event_Activate
////================
////*/
////void idTarget_SetShaderTime::Event_Activate( activator:idEntity ) {
////	int			i;
////	idEntity *	ent;
////	float		time;
////
////	time = -MS2SEC( gameLocal.time );
////	for( i = 0; i < targets.Num(); i++ ) {
////		ent = targets[ i ].GetEntity();
////		if ( ent ) {
////			ent->SetShaderParm( SHADERPARM_TIMEOFFSET, time );
////			if ( ent->IsType( idLight::Type ) ) {
////				static_cast<idLight *>(ent)->SetLightParm( SHADERPARM_TIMEOFFSET, time );
////			}
////		}
////	}
////}
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
/////*
////================
////idTarget_FadeEntity::idTarget_FadeEntity
////================
////*/
////idTarget_FadeEntity::idTarget_FadeEntity( void ) {
////	fadeFrom.Zero();
////	fadeStart = 0;
////	fadeEnd = 0;
////}
////
/////*
////================
////idTarget_FadeEntity::Save
////================
////*/
////void idTarget_FadeEntity::Save( idSaveGame *savefile ) const {
////	savefile->WriteVec4( fadeFrom );
////	savefile->WriteInt( fadeStart );
////	savefile->WriteInt( fadeEnd );
////}
////
/////*
////================
////idTarget_FadeEntity::Restore
////================
////*/
////void idTarget_FadeEntity::Restore( idRestoreGame *savefile ) {
////	savefile->ReadVec4( fadeFrom );
////	savefile->ReadInt( fadeStart );
////	savefile->ReadInt( fadeEnd );
////}
////
/////*
////================
////idTarget_FadeEntity::Event_Activate
////================
////*/
////void idTarget_FadeEntity::Event_Activate( activator:idEntity ) {
////	var ent:idEntity
////	int i;
////
////	if ( !targets.Num() ) {
////		return;
////	}
////
////	// always allow during cinematics
////	cinematic = true;
////	BecomeActive( TH_THINK );
////
////	ent = this;
////	for( i = 0; i < targets.Num(); i++ ) {
////		ent = targets[ i ].GetEntity();
////		if ( ent ) {
////			ent->GetColor( fadeFrom );
////			break;
////		}
////	}
////
////	fadeStart = gameLocal.time;
////	fadeEnd = gameLocal.time + SEC2MS( spawnArgs.GetFloat( "fadetime" ) );
////}
////
/////*
////================
////idTarget_FadeEntity::Think
////================
////*/
////void idTarget_FadeEntity::Think( void ) {
////	int			i;
////	idEntity	*ent;
////	idVec4		color;
////	idVec4		fadeTo;
////	float		frac;
////
////	if ( thinkFlags & TH_THINK ) {
////		GetColor( fadeTo );
////		if ( gameLocal.time >= fadeEnd ) {
////			color = fadeTo;
////			BecomeInactive( TH_THINK );
////		} else {
////			frac = ( float )( gameLocal.time - fadeStart ) / ( float )( fadeEnd - fadeStart );
////			color.Lerp( fadeFrom, fadeTo, frac );
////		}
////
////		// set the color on the targets
////		for( i = 0; i < targets.Num(); i++ ) {
////			ent = targets[ i ].GetEntity();
////			if ( ent ) {
////				ent->SetColor( color );
////			}
////		}
////	} else {
////		BecomeInactive( TH_ALL );
////	}
////}
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
/////*
////================
////idTarget_LightFadeIn::Event_Activate
////================
////*/
////void idTarget_LightFadeIn::Event_Activate( activator:idEntity ) {
////	var ent:idEntity
////	idLight *light;
////	int i;
////	var /*float*/time:number;
////
////	if ( !targets.Num() ) {
////		return;
////	}
////
////	time = spawnArgs.GetFloat( "fadetime" );
////	ent = this;
////	for( i = 0; i < targets.Num(); i++ ) {
////		ent = targets[ i ].GetEntity();
////		if ( !ent ) {
////			continue;
////		}
////		if ( ent->IsType( idLight::Type ) ) {
////			light = static_cast<idLight *>( ent );
////			light->FadeIn( time );
////		} else {
////			gameLocal.Printf( "'%s' targets non-light '%s'", name.c_str(), ent->GetName() );
////		}
////	}
////}
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
/////*
////================
////idTarget_LightFadeOut::Event_Activate
////================
////*/
////void idTarget_LightFadeOut::Event_Activate( activator:idEntity ) {
////	var ent:idEntity
////	idLight *light;
////	int i;
////	var /*float*/time:number;
////
////	if ( !targets.Num() ) {
////		return;
////	}
////
////	time = spawnArgs.GetFloat( "fadetime" );
////	ent = this;
////	for( i = 0; i < targets.Num(); i++ ) {
////		ent = targets[ i ].GetEntity();
////		if ( !ent ) {
////			continue;
////		}
////		if ( ent->IsType( idLight::Type ) ) {
////			light = static_cast<idLight *>( ent );
////			light->FadeOut( time );
////		} else {
////			gameLocal.Printf( "'%s' targets non-light '%s'", name.c_str(), ent->GetName() );
////		}
////	}
////}
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
////================
////idTarget_Give::Spawn
////================
////*/
////void idTarget_Give::Spawn( void ) {
////	if ( spawnArgs.GetBool( "onSpawn" ) ) {
////		PostEventMS( &EV_Activate, 50 );
////	}
////}
////
/////*
////================
////idTarget_Give::Event_Activate
////================
////*/
////void idTarget_Give::Event_Activate( activator:idEntity ) {
////	
////	if ( spawnArgs.GetBool( "development" ) && developer.GetInteger() == 0 ) {
////		return;
////	}
////
////	static int giveNum = 0;
////	idPlayer *player = gameLocal.GetLocalPlayer();
////	if ( player ) {
////		const idKeyValue *kv = spawnArgs.MatchPrefix( "item", NULL );
////		while ( kv ) {
////			const idDict *dict = gameLocal.FindEntityDefDict( kv->GetValue(), false );
////			if ( dict ) {
////				idDict d2;
////				d2.Copy( *dict );
////				d2.Set( "name", va( "givenitem_%i", giveNum++ ) );
////				var ent:idEntity = NULL;
////				if ( gameLocal.SpawnEntityDef( d2, &ent ) && ent && ent->IsType( idItem::Type ) ) {
////					idItem *item = static_cast<idItem*>(ent);
////					item->GiveToPlayer( gameLocal.GetLocalPlayer() );
////				}
////			}
////			kv = spawnArgs.MatchPrefix( "item", kv );
////		}
////	}
////}
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
/////*
////================
////idTarget_GiveEmail::Spawn
////================
////*/
////void idTarget_GiveEmail::Spawn( void ) {
////}
////
/////*
////================
////idTarget_GiveEmail::Event_Activate
////================
////*/
////void idTarget_GiveEmail::Event_Activate( activator:idEntity ) {
////	idPlayer *player = gameLocal.GetLocalPlayer();
////	const idDeclPDA *pda = player->GetPDA();
////	if ( pda ) {
////		player->GiveEmail( spawnArgs.GetString( "email" ) );
////	} else {
////		player->ShowTip( spawnArgs.GetString( "text_infoTitle" ), spawnArgs.GetString( "text_PDANeeded" ), true );
////	}
////}
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
/////*
////================
////idTarget_SetModel::Spawn
////================
////*/
////void idTarget_SetModel::Spawn( void ) {
////	const char *model;
////
////	model = spawnArgs.GetString( "newmodel" );
////	if ( declManager->FindType( DECL_MODELDEF, model, false ) == NULL ) {
////		// precache the render model
////		renderModelManager->FindModel( model );
////		// precache .cm files only
////		collisionModelManager->LoadModel( model, true );
////	}
////}
////
/////*
////================
////idTarget_SetModel::Event_Activate
////================
////*/
////void idTarget_SetModel::Event_Activate( activator:idEntity ) {
////	for( int i = 0; i < targets.Num(); i++ ) {
////		var ent:idEntity = targets[ i ].GetEntity();
////		if ( ent ) {
////			ent->SetModel( spawnArgs.GetString( "newmodel" ) );
////		}
////	}
////}
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
/////*
////================
////idTarget_SetInfluence::idTarget_SetInfluence
////================
////*/
////idTarget_SetInfluence::idTarget_SetInfluence( void ) {
////	flashIn = 0.0f;
////	flashOut = 0.0f;
////	delay = 0.0f;
////	switchToCamera = NULL;
////	soundFaded = false;
////	restoreOnTrigger = false;
////}
////
/////*
////================
////idTarget_SetInfluence::Save
////================
////*/
////void idTarget_SetInfluence::Save( idSaveGame *savefile ) const {
////	int i;
////
////	savefile->WriteInt( lightList.Num() );
////	for( i = 0; i < lightList.Num(); i++ ) {
////		savefile->WriteInt( lightList[ i ] );
////	}
////
////	savefile->WriteInt( guiList.Num() );
////	for( i = 0; i < guiList.Num(); i++ ) {
////		savefile->WriteInt( guiList[ i ] );
////	}
////
////	savefile->WriteInt( soundList.Num() );
////	for( i = 0; i < soundList.Num(); i++ ) {
////		savefile->WriteInt( soundList[ i ] );
////	}
////
////	savefile->WriteInt( genericList.Num() );
////	for( i = 0; i < genericList.Num(); i++ ) {
////		savefile->WriteInt( genericList[ i ] );
////	}
////
////	savefile->WriteFloat( flashIn );
////	savefile->WriteFloat( flashOut );
////
////	savefile->WriteFloat( delay );
////
////	savefile->WriteString( flashInSound );
////	savefile->WriteString( flashOutSound );
////
////	savefile->WriteObject( switchToCamera );
////
////	savefile->WriteFloat( fovSetting.GetStartTime() );
////	savefile->WriteFloat( fovSetting.GetDuration() );
////	savefile->WriteFloat( fovSetting.GetStartValue() );
////	savefile->WriteFloat( fovSetting.GetEndValue() );
////
////	savefile->WriteBool( soundFaded );
////	savefile->WriteBool( restoreOnTrigger );
////}
////
/////*
////================
////idTarget_SetInfluence::Restore
////================
////*/
////void idTarget_SetInfluence::Restore( idRestoreGame *savefile ) {
////	int i, num;
////	int itemNum;
////	float set;
////
////	savefile->ReadInt( num );
////	for( i = 0; i < num; i++ ) {
////		savefile->ReadInt( itemNum );
////		lightList.Append( itemNum );
////	}
////
////	savefile->ReadInt( num );
////	for( i = 0; i < num; i++ ) {
////		savefile->ReadInt( itemNum );
////		guiList.Append( itemNum );
////	}
////
////	savefile->ReadInt( num );
////	for( i = 0; i < num; i++ ) {
////		savefile->ReadInt( itemNum );
////		soundList.Append( itemNum );
////	}
////
////	savefile->ReadInt( num );
////	for ( i = 0; i < num; i++ ) {
////		savefile->ReadInt( itemNum );
////		genericList.Append( itemNum );
////	}
////
////	savefile->ReadFloat( flashIn );
////	savefile->ReadFloat( flashOut );
////
////	savefile->ReadFloat( delay );
////
////	savefile->ReadString( flashInSound );
////	savefile->ReadString( flashOutSound );
////
////	savefile->ReadObject( reinterpret_cast<idClass *&>( switchToCamera ) );
////
////	savefile->ReadFloat( set );
////	fovSetting.SetStartTime( set );
////	savefile->ReadFloat( set );
////	fovSetting.SetDuration( set );
////	savefile->ReadFloat( set );
////	fovSetting.SetStartValue( set );
////	savefile->ReadFloat( set );
////	fovSetting.SetEndValue( set );
////
////	savefile->ReadBool( soundFaded );
////	savefile->ReadBool( restoreOnTrigger );
////}
////
/////*
////================
////idTarget_SetInfluence::Spawn
////================
////*/
////void idTarget_SetInfluence::Spawn() {
////	PostEventMS( &EV_GatherEntities, 0 );
////	flashIn = spawnArgs.GetFloat( "flashIn", "0" );
////	flashOut = spawnArgs.GetFloat( "flashOut", "0" );
////	flashInSound = spawnArgs.GetString( "snd_flashin" );
////	flashOutSound = spawnArgs.GetString( "snd_flashout" );
////	delay = spawnArgs.GetFloat( "delay" );
////	soundFaded = false;
////	restoreOnTrigger = false;
////
////	// always allow during cinematics
////	cinematic = true;
////}
////
/////*
////================
////idTarget_SetInfluence::Event_Flash
////================
////*/
////void idTarget_SetInfluence::Event_Flash( float flash, int out ) {
////	idPlayer *player = gameLocal.GetLocalPlayer();
////	player->playerView.Fade( idVec4( 1, 1, 1, 1 ), flash );
////	const idSoundShader *shader = NULL;
////	if ( !out && flashInSound.Length() ){
////		shader = declManager->FindSound( flashInSound );
////		player->StartSoundShader( shader, SND_CHANNEL_VOICE, 0, false, NULL );
////	} else if ( out && ( flashOutSound.Length() || flashInSound.Length() ) ) {
////		shader = declManager->FindSound( flashOutSound.Length() ? flashOutSound : flashInSound );
////		player->StartSoundShader( shader, SND_CHANNEL_VOICE, 0, false, NULL );
////	}
////	PostEventSec( &EV_ClearFlash, flash, flash );
////}
////
////
/////*
////================
////idTarget_SetInfluence::Event_ClearFlash
////================
////*/
////void idTarget_SetInfluence::Event_ClearFlash( float flash ) {
////	idPlayer *player = gameLocal.GetLocalPlayer();
////	player->playerView.Fade( vec4_zero , flash );		
////}
/////*
////================
////idTarget_SetInfluence::Event_GatherEntities
////================
////*/
////void idTarget_SetInfluence::Event_GatherEntities() {
////	int i, listedEntities;
////	idEntity *entityList[ MAX_GENTITIES ];
////
////	//bool demonicOnly = spawnArgs.GetBool( "effect_demonic" );
////	bool lights = spawnArgs.GetBool( "effect_lights" );
////	bool sounds = spawnArgs.GetBool( "effect_sounds" );
////	bool guis = spawnArgs.GetBool( "effect_guis" );
////	bool models = spawnArgs.GetBool( "effect_models" );
////	bool vision = spawnArgs.GetBool( "effect_vision" );
////	bool targetsOnly = spawnArgs.GetBool( "targetsOnly" );
////
////	lightList.Clear();
////	guiList.Clear();
////	soundList.Clear();
////
////	if ( spawnArgs.GetBool( "effect_all" ) ) {
////		lights = sounds = guis = models = vision = true;
////	}
////
////	if ( targetsOnly ) {
////		listedEntities = targets.Num();
////		for ( i = 0; i < listedEntities; i++ ) {
////			entityList[i] = targets[i].GetEntity();
////		}
////	} else {
////		float radius = spawnArgs.GetFloat( "radius" );
////		listedEntities = gameLocal.EntitiesWithinRadius( GetPhysics()->GetOrigin(), radius, entityList, MAX_GENTITIES );
////	}
////
////	for( i = 0; i < listedEntities; i++ ) {
////		var ent:idEntity = entityList[ i ];
////		if ( ent ) {
////			if ( lights && ent->IsType( idLight::Type ) && ent->spawnArgs.FindKey( "color_demonic" ) ) {
////				lightList.Append( ent->entityNumber );
////				continue;
////			}
////			if ( sounds && ent->IsType( idSound::Type ) && ent->spawnArgs.FindKey( "snd_demonic" ) ) {
////				soundList.Append( ent->entityNumber );
////				continue;
////			}
////			if ( guis && ent->GetRenderEntity() && ent->GetRenderEntity()->gui[ 0 ] && ent->spawnArgs.FindKey( "gui_demonic" ) ) {
////				guiList.Append( ent->entityNumber );
////				continue;
////			}
////			if ( ent->IsType( idStaticEntity::Type ) && ent->spawnArgs.FindKey( "color_demonic" ) ) {
////				genericList.Append( ent->entityNumber );
////				continue;
////			}
////		}
////	}
////	idStr temp;
////	temp = spawnArgs.GetString( "switchToView" );
////	switchToCamera = ( temp.Length() ) ? gameLocal.FindEntity( temp ) : NULL;
////
////}
////
/////*
////================
////idTarget_SetInfluence::Event_Activate
////================
////*/
////void idTarget_SetInfluence::Event_Activate( activator:idEntity ) {
////	int i, j;
////	var ent:idEntity
////	idLight *light;
////	idSound *sound;
////	idStaticEntity *generic;
////	const char *parm;
////	const char *skin;
////	bool update;
////	idVec3 color;
////	idVec4 colorTo;
////	idPlayer *player;
////
////	player = gameLocal.GetLocalPlayer();
////
////	if ( spawnArgs.GetBool( "triggerActivate" ) ) {
////		if ( restoreOnTrigger ) {
////			ProcessEvent( &EV_RestoreInfluence );
////			restoreOnTrigger = false;
////			return;
////		}
////		restoreOnTrigger = true;
////	}
////
////	float fadeTime = spawnArgs.GetFloat( "fadeWorldSounds" );
////
////	if ( delay > 0.0f ) {
////		PostEventSec( &EV_Activate, delay, activator );
////		delay = 0.0f;
////		// start any sound fading now
////		if ( fadeTime ) {
////			gameSoundWorld->FadeSoundClasses( 0, -40.0f, fadeTime );
////			soundFaded = true;
////		}
////		return;
////	} else if ( fadeTime && !soundFaded ) {
////		gameSoundWorld->FadeSoundClasses( 0, -40.0f, fadeTime );
////		soundFaded = true;
////	}
////
////	if ( spawnArgs.GetBool( "triggerTargets" ) ) {
////		ActivateTargets( activator );
////	}
////
////	if ( flashIn ) {
////		PostEventSec( &EV_Flash, 0.0f, flashIn, 0 );
////	}
////
////	parm = spawnArgs.GetString( "snd_influence" );
////	if ( parm && *parm ) {
////		PostEventSec( &EV_StartSoundShader, flashIn, parm, SND_CHANNEL_ANY );
////	}
////
////	if ( switchToCamera ) {
////		switchToCamera->PostEventSec( &EV_Activate, flashIn + 0.05f, this );
////	}
////
////	int fov = spawnArgs.GetInt( "fov" );
////	if ( fov ) {
////		fovSetting.Init( gameLocal.time, SEC2MS( spawnArgs.GetFloat( "fovTime" ) ), player->DefaultFov(), fov );
////		BecomeActive( TH_THINK );
////	}
////
////	for ( i = 0; i < genericList.Num(); i++ ) {
////		ent = gameLocal.entities[genericList[i]];
////		if ( ent == NULL ) {
////			continue;
////		}
////		generic = static_cast<idStaticEntity*>( ent );
////		color = generic->spawnArgs.GetVector( "color_demonic" );
////		colorTo.Set( color.x, color.y, color.z, 1.0f );
////		generic->Fade( colorTo, spawnArgs.GetFloat( "fade_time", "0.25" ) );
////	}
////
////	for ( i = 0; i < lightList.Num(); i++ ) {
////		ent = gameLocal.entities[lightList[i]];
////		if ( ent == NULL || !ent->IsType( idLight::Type ) ) {
////			continue;
////		}
////		light = static_cast<idLight *>(ent);
////		parm = light->spawnArgs.GetString( "mat_demonic" );
////		if ( parm && *parm ) {
////			light->SetShader( parm );
////		}
////		
////		color = light->spawnArgs.GetVector( "_color" );
////		color = light->spawnArgs.GetVector( "color_demonic", color.ToString() );
////		colorTo.Set( color.x, color.y, color.z, 1.0f );
////		light->Fade( colorTo, spawnArgs.GetFloat( "fade_time", "0.25" ) );
////	}
////
////	for ( i = 0; i < soundList.Num(); i++ ) {
////		ent = gameLocal.entities[soundList[i]];
////		if ( ent == NULL || !ent->IsType( idSound::Type ) ) {
////			continue;
////		}
////		sound = static_cast<idSound *>(ent);
////		parm = sound->spawnArgs.GetString( "snd_demonic" );
////		if ( parm && *parm ) {
////			if ( sound->spawnArgs.GetBool( "overlayDemonic" ) ) {
////				sound->StartSound( "snd_demonic", SND_CHANNEL_DEMONIC, 0, false, NULL );
////			} else {
////				sound->StopSound( SND_CHANNEL_ANY, false );
////				sound->SetSound( parm );
////			}
////		}
////	}
////
////	for ( i = 0; i < guiList.Num(); i++ ) {
////		ent = gameLocal.entities[guiList[i]];
////		if ( ent == NULL || ent->GetRenderEntity() == NULL ) {
////			continue;
////		}
////		update = false;
////		for ( j = 0; j < MAX_RENDERENTITY_GUI; j++ ) {
////			if ( ent->GetRenderEntity()->gui[ j ] && ent->spawnArgs.FindKey( j == 0 ? "gui_demonic" : va( "gui_demonic%d", j+1 ) ) ) {
////				ent->GetRenderEntity()->gui[ j ] = uiManager->FindGui( ent->spawnArgs.GetString( j == 0 ? "gui_demonic" : va( "gui_demonic%d", j+1 ) ), true );
////				update = true;
////			}
////		}
////
////		if ( update ) {
////			ent->UpdateVisuals();
////			ent->Present();
////		}
////	}
////
////	player->SetInfluenceLevel( spawnArgs.GetInt( "influenceLevel" ) );
////
////	int snapAngle = spawnArgs.GetInt( "snapAngle" );
////	if ( snapAngle ) {
////		idAngles ang( 0, snapAngle, 0 );
////		player->SetViewAngles( ang );
////		player->SetAngles( ang );
////	}
////
////	if ( spawnArgs.GetBool( "effect_vision" ) ) {
////		parm = spawnArgs.GetString( "mtrVision" );
////		skin = spawnArgs.GetString( "skinVision" );
////		player->SetInfluenceView( parm, skin, spawnArgs.GetInt( "visionRadius" ), this ); 
////	}
////
////	parm = spawnArgs.GetString( "mtrWorld" );
////	if ( parm && *parm ) {
////		gameLocal.SetGlobalMaterial( declManager->FindMaterial( parm ) );
////	}
////
////	if ( !restoreOnTrigger ) {
////		PostEventMS( &EV_RestoreInfluence, SEC2MS( spawnArgs.GetFloat( "time" ) ) );
////	}
////}
////
/////*
////================
////idTarget_SetInfluence::Think
////================
////*/
////void idTarget_SetInfluence::Think( void ) {
////	if ( thinkFlags & TH_THINK ) {
////		idPlayer *player = gameLocal.GetLocalPlayer();
////		player->SetInfluenceFov( fovSetting.GetCurrentValue( gameLocal.time ) );
////		if ( fovSetting.IsDone( gameLocal.time ) ) {
////			if ( !spawnArgs.GetBool( "leaveFOV" ) ) {
////				player->SetInfluenceFov( 0 );
////			}
////			BecomeInactive( TH_THINK );
////		}
////	} else {
////		BecomeInactive( TH_ALL );
////	}
////}
////
////
/////*
////================
////idTarget_SetInfluence::Event_RestoreInfluence
////================
////*/
////void idTarget_SetInfluence::Event_RestoreInfluence() {
////	int i, j;
////	var ent:idEntity
////	idLight *light;
////	idSound *sound;
////	idStaticEntity *generic;
////	bool update;
////	idVec3 color;
////	idVec4 colorTo;
////
////	if ( flashOut ) {
////		PostEventSec( &EV_Flash, 0.0f, flashOut, 1 );
////	}
////
////	if ( switchToCamera ) {
////		switchToCamera->PostEventMS( &EV_Activate, 0.0f, this );
////	}
////
////	for ( i = 0; i < genericList.Num(); i++ ) {
////		ent = gameLocal.entities[genericList[i]];
////		if ( ent == NULL ) {
////			continue;
////		}
////		generic = static_cast<idStaticEntity*>( ent );
////		colorTo.Set( 1.0f, 1.0f, 1.0f, 1.0f );
////		generic->Fade( colorTo, spawnArgs.GetFloat( "fade_time", "0.25" ) );
////	}
////
////	for ( i = 0; i < lightList.Num(); i++ ) {
////		ent = gameLocal.entities[lightList[i]];
////		if ( ent == NULL || !ent->IsType( idLight::Type ) ) {
////			continue;
////		}
////		light = static_cast<idLight *>(ent);
////		if ( !light->spawnArgs.GetBool( "leave_demonic_mat" ) ) {
////			const char *texture = light->spawnArgs.GetString( "texture", "lights/squarelight1" );
////			light->SetShader( texture );
////		}
////		color = light->spawnArgs.GetVector( "_color" );
////		colorTo.Set( color.x, color.y, color.z, 1.0f );
////		light->Fade( colorTo, spawnArgs.GetFloat( "fade_time", "0.25" ) );
////	}
////
////	for ( i = 0; i < soundList.Num(); i++ ) {
////		ent = gameLocal.entities[soundList[i]];
////		if ( ent == NULL || !ent->IsType( idSound::Type ) ) {
////			continue;
////		}
////		sound = static_cast<idSound *>(ent);
////		sound->StopSound( SND_CHANNEL_ANY, false );
////		sound->SetSound( sound->spawnArgs.GetString( "s_shader" ) );
////	}
////
////	for ( i = 0; i < guiList.Num(); i++ ) {
////		ent = gameLocal.entities[guiList[i]];
////		if ( ent == NULL || GetRenderEntity() == NULL ) {
////			continue;
////		}
////		update = false;
////		for( j = 0; j < MAX_RENDERENTITY_GUI; j++ ) {
////			if ( ent->GetRenderEntity()->gui[ j ] ) {
////				ent->GetRenderEntity()->gui[ j ] = uiManager->FindGui( ent->spawnArgs.GetString( j == 0 ? "gui" : va( "gui%d", j+1 ) ) );
////				update = true;
////			}
////		}
////		if ( update ) {
////			ent->UpdateVisuals();
////			ent->Present();
////		}
////	}
////
////	idPlayer *player = gameLocal.GetLocalPlayer();
////	player->SetInfluenceLevel( 0 );
////	player->SetInfluenceView( NULL, NULL, 0.0f, NULL );
////	player->SetInfluenceFov( 0 );
////	gameLocal.SetGlobalMaterial( NULL );
////	float fadeTime = spawnArgs.GetFloat( "fadeWorldSounds" );
////	if ( fadeTime ) {
////		gameSoundWorld->FadeSoundClasses( 0, 0.0f, fadeTime / 2.0f );
////	}
////
////}
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
////================
////idTarget_SetKeyVal::Event_Activate
////================
////*/
////void idTarget_SetKeyVal::Event_Activate( activator:idEntity ) {
////	int i;
////	idStr key, val;
////	var ent:idEntity
////	const idKeyValue *kv;
////	int n;
////
////	for( i = 0; i < targets.Num(); i++ ) {
////		ent = targets[ i ].GetEntity();
////		if ( ent ) {
////			kv = spawnArgs.MatchPrefix("keyval");
////			while ( kv ) {
////				n = kv->GetValue().Find( ";" );
////				if ( n > 0 ) {
////					key = kv->GetValue().Left( n );
////					val = kv->GetValue().Right( kv->GetValue().Length() - n - 1 );
////					ent->spawnArgs.Set( key, val );
////					for ( int j = 0; j < MAX_RENDERENTITY_GUI; j++ ) {
////						if ( ent->GetRenderEntity()->gui[ j ] ) {
////							if ( idStr::Icmpn( key, "gui_", 4 ) == 0 ) {
////								ent->GetRenderEntity()->gui[ j ]->SetStateString( key, val );
////								ent->GetRenderEntity()->gui[ j ]->StateChanged( gameLocal.time );
////							}
////						}
////					}
////				}
////				kv = spawnArgs.MatchPrefix( "keyval", kv );
////			}
////			ent->UpdateChangeableSpawnArgs( NULL );
////			ent->UpdateVisuals();
////			ent->Present();
////		}
////	}
////}
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
////================
////idTarget_SetFov::Save
////================
////*/
////void idTarget_SetFov::Save( idSaveGame *savefile ) const {
////
////	savefile->WriteFloat( fovSetting.GetStartTime() );
////	savefile->WriteFloat( fovSetting.GetDuration() );
////	savefile->WriteFloat( fovSetting.GetStartValue() );
////	savefile->WriteFloat( fovSetting.GetEndValue() );
////}
////
/////*
////================
////idTarget_SetFov::Restore
////================
////*/
////void idTarget_SetFov::Restore( idRestoreGame *savefile ) {
////	float setting;
////
////	savefile->ReadFloat( setting );
////	fovSetting.SetStartTime( setting );
////	savefile->ReadFloat( setting );
////	fovSetting.SetDuration( setting );
////	savefile->ReadFloat( setting );
////	fovSetting.SetStartValue( setting );
////	savefile->ReadFloat( setting );
////	fovSetting.SetEndValue( setting );
////
////	fovSetting.GetCurrentValue( gameLocal.time );
////}
////
/////*
////================
////idTarget_SetFov::Event_Activate
////================
////*/
////void idTarget_SetFov::Event_Activate( activator:idEntity ) {
////	// always allow during cinematics
////	cinematic = true;
////
////	idPlayer *player = gameLocal.GetLocalPlayer();
////	fovSetting.Init( gameLocal.time, SEC2MS( spawnArgs.GetFloat( "time" ) ), player ? player->DefaultFov() : g_fov.GetFloat(), spawnArgs.GetFloat( "fov" ) );
////	BecomeActive( TH_THINK );
////}
////
/////*
////================
////idTarget_SetFov::Think
////================
////*/
////void idTarget_SetFov::Think( void ) {
////	if ( thinkFlags & TH_THINK ) {
////		idPlayer *player = gameLocal.GetLocalPlayer();
////		player->SetInfluenceFov( fovSetting.GetCurrentValue( gameLocal.time ) );
////		if ( fovSetting.IsDone( gameLocal.time ) ) {
////			player->SetInfluenceFov( 0.0f );
////			BecomeInactive( TH_THINK );
////		}
////	} else {
////		BecomeInactive( TH_ALL );
////	}
////}
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
////================
////idTarget_SetPrimaryObjective::Event_Activate
////================
////*/
////void idTarget_SetPrimaryObjective::Event_Activate( activator:idEntity ) {
////	idPlayer *player = gameLocal.GetLocalPlayer();
////	if ( player && player->objectiveSystem ) {
////		player->objectiveSystem->SetStateString( "missionobjective", spawnArgs.GetString( "text", common->GetLanguageDict()->GetString( "#str_04253" ) ) );
////	}
////}
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
////================
////idTarget_LockDoor::Event_Activate
////================
////*/
////void idTarget_LockDoor::Event_Activate( activator:idEntity ) {
////	int i;
////	var ent:idEntity
////	int lock;
////
////	lock = spawnArgs.GetInt( "locked", "1" );
////	for( i = 0; i < targets.Num(); i++ ) {
////		ent = targets[ i ].GetEntity();
////		if ( ent && ent->IsType( idDoor::Type ) ) {
////			if ( static_cast<idDoor *>( ent )->IsLocked() ) {
////				static_cast<idDoor *>( ent )->Lock( 0 );
////			} else {
////				static_cast<idDoor *>( ent )->Lock( lock );
////			}
////		}
////	}
////}
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
/////*
////================
////idTarget_CallObjectFunction::Event_Activate
////================
////*/
////void idTarget_CallObjectFunction::Event_Activate( activator:idEntity ) {
////	int					i;
////	idEntity			*ent;
////	const function_t	*func;
////	const char			*funcName;
////	idThread			*thread;
////
////	funcName = spawnArgs.GetString( "call" );
////	for( i = 0; i < targets.Num(); i++ ) {
////		ent = targets[ i ].GetEntity();
////		if ( ent && ent->scriptObject.HasObject() ) {
////			func = ent->scriptObject.GetFunction( funcName );
////			if ( !func ) {
////				gameLocal.Error( "Function '%s' not found on entity '%s' for function call from '%s'", funcName, ent->name.c_str(), name.c_str() );
////			}
////			if ( func->type->NumParameters() != 1 ) {
////				gameLocal.Error( "Function '%s' on entity '%s' has the wrong number of parameters for function call from '%s'", funcName, ent->name.c_str(), name.c_str() );
////			}
////			if ( !ent->scriptObject.GetTypeDef()->Inherits( func->type->GetParmType( 0 ) ) ) {
////				gameLocal.Error( "Function '%s' on entity '%s' is the wrong type for function call from '%s'", funcName, ent->name.c_str(), name.c_str() );
////			}
////			// create a thread and call the function
////			thread = new idThread();
////			thread->CallFunction( ent, func, true );
////			thread->Start();
////		}
////	}
////}
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
/////*
////================
////idTarget_EnableLevelWeapons::Event_Activate
////================
////*/
////void idTarget_EnableLevelWeapons::Event_Activate( activator:idEntity ) {
////	int i;
////	const char *weap;
////
////	gameLocal.world->spawnArgs.SetBool( "no_Weapons", spawnArgs.GetBool( "disable" ) );
////
////	if ( spawnArgs.GetBool( "disable" ) ) {
////		for( i = 0; i < gameLocal.numClients; i++ ) {
////			if ( gameLocal.entities[ i ] ) {
////				gameLocal.entities[ i ]->ProcessEvent( &EV_Player_DisableWeapon );
////			}
////		}
////	} else {
////		weap = spawnArgs.GetString( "weapon" );
////		for( i = 0; i < gameLocal.numClients; i++ ) {
////			if ( gameLocal.entities[ i ] ) {
////				gameLocal.entities[ i ]->ProcessEvent( &EV_Player_EnableWeapon );
////				if ( weap && weap[ 0 ] ) {
////					gameLocal.entities[ i ]->PostEventSec( &EV_Player_SelectWeapon, 0.5f, weap );
////				}
////			}
////		}
////	}
////}
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
////
/////*
////================
////idTarget_Tip::idTarget_Tip
////================
////*/
////idTarget_Tip::idTarget_Tip( void ) {
////	playerPos.Zero();
////}
////
/////*
////================
////idTarget_Tip::Spawn
////================
////*/
////void idTarget_Tip::Spawn( void ) {
////}
////
/////*
////================
////idTarget_Tip::Save
////================
////*/
////void idTarget_Tip::Save( idSaveGame *savefile ) const {
////	savefile->WriteVec3( playerPos );
////}
////
/////*
////================
////idTarget_Tip::Restore
////================
////*/
////void idTarget_Tip::Restore( idRestoreGame *savefile ) {
////	savefile->ReadVec3( playerPos );
////}
////
/////*
////================
////idTarget_Tip::Event_Activate
////================
////*/
////void idTarget_Tip::Event_GetPlayerPos( void ) {
////	idPlayer *player = gameLocal.GetLocalPlayer();
////	if ( player ) {
////		playerPos = player->GetPhysics()->GetOrigin();
////		PostEventMS( &EV_TipOff, 100 );
////	}
////}
////
/////*
////================
////idTarget_Tip::Event_Activate
////================
////*/
////void idTarget_Tip::Event_Activate( activator:idEntity ) {
////	idPlayer *player = gameLocal.GetLocalPlayer();
////	if ( player ) {
////		if ( player->IsTipVisible() ) {
////			PostEventSec( &EV_Activate, 5.1f, activator );
////			return;
////		}
////		player->ShowTip( spawnArgs.GetString( "text_title" ), spawnArgs.GetString( "text_tip" ), false );
////		PostEventMS( &EV_GetPlayerPos, 2000 );
////	}
////}
////
/////*
////================
////idTarget_Tip::Event_TipOff
////================
////*/
////void idTarget_Tip::Event_TipOff( void ) {
////	idPlayer *player = gameLocal.GetLocalPlayer();
////	if ( player ) {
////		idVec3 v = player->GetPhysics()->GetOrigin() - playerPos;
////		if ( v.Length() > 96.0f ) {
////			player->HideTip();
////		} else {
////			PostEventMS( &EV_TipOff, 100 );
////		}
////	}
////}
////
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
/////*
////================
////idTarget_GiveEmail::Event_Activate
////================
////*/
////void idTarget_GiveSecurity::Event_Activate( activator:idEntity ) {
////	idPlayer *player = gameLocal.GetLocalPlayer();
////	if ( player ) {
////		player->GiveSecurity( spawnArgs.GetString( "text_security" ) );
////	}
////}
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
////================
////idTarget_RemoveWeapons::Event_Activate
////================
////*/
////void idTarget_RemoveWeapons::Event_Activate( activator:idEntity ) {
////	for( int i = 0; i < gameLocal.numClients; i++ ) {
////		if ( gameLocal.entities[ i ] ) {
////			idPlayer *player = static_cast< idPlayer* >( gameLocal.entities[i] );
////			const idKeyValue *kv = spawnArgs.MatchPrefix( "weapon", NULL );
////			while ( kv ) {
////				player->RemoveWeapon( kv->GetValue() );
////				kv = spawnArgs.MatchPrefix( "weapon", kv );
////			}
////			player->SelectWeapon( player->weapon_fists, true );
////		}
////	}
////}
////
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
////================
////idTarget_LevelTrigger::Event_Activate
////================
////*/
////void idTarget_LevelTrigger::Event_Activate( activator:idEntity ) {
////	for( int i = 0; i < gameLocal.numClients; i++ ) {
////		if ( gameLocal.entities[ i ] ) {
////			idPlayer *player = static_cast< idPlayer* >( gameLocal.entities[i] );
////			player->SetLevelTrigger( spawnArgs.GetString( "levelName" ), spawnArgs.GetString( "triggerName" ) );
////		}
////	}
////}
////
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
/////*
////================
////idTarget_EnableStamina::Event_Activate
////================
////*/
////void idTarget_EnableStamina::Event_Activate( activator:idEntity ) {
////	for( int i = 0; i < gameLocal.numClients; i++ ) {
////		if ( gameLocal.entities[ i ] ) {
////			idPlayer *player = static_cast< idPlayer* >( gameLocal.entities[i] );
////			if ( spawnArgs.GetBool( "enable" ) ) {
////				pm_stamina.SetFloat( player->spawnArgs.GetFloat( "pm_stamina" ) );
////			} else {
////				pm_stamina.SetFloat( 0.0f );
////			}
////		}
////	}
////}
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
/////*
////================
////idTarget_FadeSoundClass::Event_Activate
////================
////*/
////void idTarget_FadeSoundClass::Event_Activate( activator:idEntity ) {
////	float fadeTime = spawnArgs.GetFloat( "fadeTime" );
////	float fadeDB = spawnArgs.GetFloat( "fadeDB" );
////	float fadeDuration = spawnArgs.GetFloat( "fadeDuration" );
////	int fadeClass = spawnArgs.GetInt( "fadeClass" );
////	// start any sound fading now
////	if ( fadeTime ) {
////		gameSoundWorld->FadeSoundClasses( fadeClass, spawnArgs.GetBool( "fadeIn" ) ? fadeDB : 0.0f - fadeDB, fadeTime );
////		if ( fadeDuration ) {
////			PostEventSec( &EV_RestoreVolume, fadeDuration );
////		}
////	}
////}
////
/////*
////================
////idTarget_FadeSoundClass::Event_RestoreVolume
////================
////*/
////void idTarget_FadeSoundClass::Event_RestoreVolume() {
////	float fadeTime = spawnArgs.GetFloat( "fadeTime" );
////	float fadeDB = spawnArgs.GetFloat( "fadeDB" );
////	//int fadeClass = spawnArgs.GetInt( "fadeClass" );
////	// restore volume
////	gameSoundWorld->FadeSoundClasses( 0, fadeDB, fadeTime );
////}
////
