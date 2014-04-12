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
////#ifndef __GAME_TARGET_H__
////#define __GAME_TARGET_H__
////

/*
===============================================================================

idTarget

===============================================================================
*/

class idTarget extends idEntity {
////public:
	//CLASS_PROTOTYPE( idTarget );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idTarget>[];
};


/*
===============================================================================

idTarget_Remove

===============================================================================
*/

class idTarget_Remove extends idTarget {
//public:
	//CLASS_PROTOTYPE( idTarget_Remove );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idTarget_Remove>[];

//private:
	Event_Activate(activator: idEntity): void { throw "placeholder"; }


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
};


/*
===============================================================================

idTarget_Show

===============================================================================
*/

class idTarget_Show extends idTarget {
//public:
	//CLASS_PROTOTYPE( idTarget_Show );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idTarget_Show>[];

//private:
	Event_Activate(activator: idEntity): void { throw "placeholder"; }
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
};


/*
===============================================================================

idTarget_Damage

===============================================================================
*/

class idTarget_Damage extends idTarget {
//public:
	//CLASS_PROTOTYPE( idTarget_Damage );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idTarget_Damage>[];

//private:
	Event_Activate(activator: idEntity): void { throw "placeholder"; }
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
////	damage = this.spawnArgs.GetString( "def_damage", "damage_generic" );
////	for( i = 0; i < targets.Num(); i++ ) {
////		ent = targets[ i ].GetEntity();
////		if ( ent ) {
////			ent->Damage( this, this, vec3_origin, damage, 1.0, INVALID_JOINT );
////		}
////	}
////}
////
};


/*
===============================================================================

idTarget_SessionCommand

===============================================================================
*/

class idTarget_SessionCommand extends idTarget {
//public:
	//CLASS_PROTOTYPE( idTarget_SessionCommand );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idTarget_SessionCommand>[];

//private:
	Event_Activate(activator: idEntity): void { throw "placeholder"; }
////
/////*
////================
////idTarget_SessionCommand::Event_Activate
////================
////*/
////void idTarget_SessionCommand::Event_Activate( activator:idEntity ) {
////	gameLocal.sessionCommand = this.spawnArgs.GetString( "command" );
////}
////
};


/*
===============================================================================

idTarget_EndLevel

===============================================================================
*/

class idTarget_EndLevel extends idTarget {
//public:
	//CLASS_PROTOTYPE( idTarget_EndLevel );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idTarget_EndLevel>[];

//private:
	Event_Activate(activator: idEntity): void { throw "placeholder"; }
	
/////*
////================
////idTarget_EndLevel::Event_Activate
////================
////*/
////void idTarget_EndLevel::Event_Activate( activator:idEntity ) {
////	idStr nextMap;
////
////#ifdef ID_DEMO_BUILD
////	if ( this.spawnArgs.GetBool( "endOfGame" ) ) {
////		cvarSystem.SetCVarBool( "g_nightmare", true );
////		gameLocal.sessionCommand = "endofDemo";
////		return;
////	}
////#else
////	if ( this.spawnArgs.GetBool( "endOfGame" ) ) {
////		cvarSystem.SetCVarBool( "g_nightmare", true );
////		gameLocal.sessionCommand = "disconnect";
////		return;
////	}
////#endif
////	if ( !spawnArgs.GetString( "nextMap", "", nextMap ) ) {
////		gameLocal.Printf( "idTarget_SessionCommand::Event_Activate: no nextMap key\n" );
////		return;
////	}
////
////	if ( this.spawnArgs.GetInt( "devmap", "0" ) ) {
////		gameLocal.sessionCommand = "devmap ";	// only for special demos
////	} else {
////		gameLocal.sessionCommand = "map ";
////	}
////
////	gameLocal.sessionCommand += nextMap;
////}

};


/*
===============================================================================

idTarget_WaitForButton

===============================================================================
*/

class idTarget_WaitForButton extends idTarget {
//public:
	//CLASS_PROTOTYPE( idTarget_WaitForButton );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idTarget_WaitForButton>[];

	Think( ):void { throw "placeholder"; }

//private:
	Event_Activate(activator: idEntity): void { throw "placeholder"; }

	
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
////void idTarget_WaitForButton::Think( ) {
////	idPlayer *player;
////
////	if ( thinkFlags & TH_THINK ) {
////		player = gameLocal.GetLocalPlayer();
////		if ( player && ( !player.oldButtons & BUTTON_ATTACK ) && ( player.usercmd.buttons & BUTTON_ATTACK ) ) {
////			player.usercmd.buttons &= ~BUTTON_ATTACK;
////			BecomeInactive( TH_THINK );
////			ActivateTargets( player );
////		}
////	} else {
////		BecomeInactive( TH_ALL );
////	}
////}
////
};

/*
===============================================================================

idTarget_SetGlobalShaderTime

===============================================================================
*/

class idTarget_SetGlobalShaderTime extends idTarget {
//public:
	//CLASS_PROTOTYPE( idTarget_SetGlobalShaderTime );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idTarget_SetGlobalShaderTime>[];

//private:
	Event_Activate(activator: idEntity): void { throw "placeholder"; }
/////*
////================
////idTarget_SetGlobalShaderTime::Event_Activate
////================
////*/
////void idTarget_SetGlobalShaderTime::Event_Activate( activator:idEntity ) {
////	int parm = this.spawnArgs.GetInt( "globalParm" );
////	/*float*/time:number = -MS2SEC( gameLocal.time );
////	if ( parm >= 0 && parm < MAX_GLOBAL_SHADER_PARMS ) {
////		gameLocal.globalShaderParms[parm] = time;
////	}
////}
////
};


/*
===============================================================================

idTarget_SetShaderParm

===============================================================================
*/

class idTarget_SetShaderParm extends idTarget {
//public:
	//CLASS_PROTOTYPE( idTarget_SetShaderParm );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idTarget_SetShaderParm>[];

//private:
	Event_Activate(activator: idEntity): void { throw "placeholder"; }
	
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
////	if ( this.spawnArgs.GetVector( "_color", "1 1 1", color ) ) {
////		for( i = 0; i < targets.Num(); i++ ) {
////			ent = targets[ i ].GetEntity();
////			if ( ent ) {
////				ent.SetColor( color[ 0 ], color[ 1 ], color[ 2 ] );
////			}
////		}
////	}
////
////	// set any shader parms on the targets
////	for( parmnum = 0; parmnum < MAX_ENTITY_SHADER_PARMS; parmnum++ ) {
////		if ( this.spawnArgs.GetFloat( va( "shaderParm%d", parmnum ), "0", value ) ) {
////			for( i = 0; i < targets.Num(); i++ ) {
////				ent = targets[ i ].GetEntity();
////				if ( ent ) {
////					ent.SetShaderParm( parmnum, value );
////				}
////			}
////			if (this.spawnArgs.GetBool("toggle") && (value == 0 || value == 1)) {
////				int val = value;
////				val ^= 1;
////				value = val;
////				this.spawnArgs.SetFloat(va("shaderParm%d", parmnum), value);
////			}
////		}
////	}
////}
////
////
};


/*
===============================================================================

idTarget_SetShaderTime

===============================================================================
*/

class idTarget_SetShaderTime extends idTarget {
//public:
	//CLASS_PROTOTYPE( idTarget_SetShaderTime );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idTarget_SetShaderTime>[];

//private:
	Event_Activate(activator: idEntity): void { throw "placeholder"; }

	
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
////			ent.SetShaderParm( SHADERPARM_TIMEOFFSET, time );
////			if ( ent.IsType( idLight::Type ) ) {
////				static_cast<idLight *>(ent).SetLightParm( SHADERPARM_TIMEOFFSET, time );
////			}
////		}
////	}
////}
};

/*
===============================================================================

idTarget_FadeEntity

===============================================================================
*/

class idTarget_FadeEntity extends idTarget {
//public:
	//CLASS_PROTOTYPE( idTarget_FadeEntity );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idTarget_FadeEntity>[];

	//idTarget_FadeEntity( );

	//Save(savefile:idSaveGame):void{throw "placeholder";}
	//Restore(savefile:idRestoreGame):void{throw "placeholder";}

	Think():void{throw "placeholder";}

//private:
	fadeFrom = new idVec4();
	fadeStart: number;	   //int					
	fadeEnd: number;	   //int					

	Event_Activate(activator: idEntity): void { throw "placeholder"; }

	
/////*
////================
////idTarget_FadeEntity::idTarget_FadeEntity
////================
////*/
////idTarget_FadeEntity::idTarget_FadeEntity( ) {
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
////	savefile.WriteVec4( fadeFrom );
////	savefile.WriteInt( fadeStart );
////	savefile.WriteInt( fadeEnd );
////}
////
/////*
////================
////idTarget_FadeEntity::Restore
////================
////*/
////void idTarget_FadeEntity::Restore( idRestoreGame *savefile ) {
////	savefile.ReadVec4( fadeFrom );
////	savefile.ReadInt( fadeStart );
////	savefile.ReadInt( fadeEnd );
////}
////
/////*
////================
////idTarget_FadeEntity::Event_Activate
////================
////*/
////void idTarget_FadeEntity::Event_Activate( activator:idEntity ) {
////	var ent:idEntity
////	var/*int*/i:number;
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
////			ent.GetColor( fadeFrom );
////			break;
////		}
////	}
////
////	fadeStart = gameLocal.time;
////	fadeEnd = gameLocal.time + SEC2MS( this.spawnArgs.GetFloat( "fadetime" ) );
////}
////
/////*
////================
////idTarget_FadeEntity::Think
////================
////*/
////void idTarget_FadeEntity::Think( ) {
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
////				ent.SetColor( color );
////			}
////		}
////	} else {
////		BecomeInactive( TH_ALL );
////	}
////}
};

/*
===============================================================================

idTarget_LightFadeIn

===============================================================================
*/

class idTarget_LightFadeIn extends idTarget {
//public:
	//CLASS_PROTOTYPE( idTarget_LightFadeIn );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idTarget_LightFadeIn>[];	

//private:
	Event_Activate(activator: idEntity): void { throw "placeholder"; }

	
/////*
////================
////idTarget_LightFadeIn::Event_Activate
////================
////*/
////void idTarget_LightFadeIn::Event_Activate( activator:idEntity ) {
////	var ent:idEntity
////	idLight *light;
////	var/*int*/i:number;
////	var /*float*/time:number;
////
////	if ( !targets.Num() ) {
////		return;
////	}
////
////	time = this.spawnArgs.GetFloat( "fadetime" );
////	ent = this;
////	for( i = 0; i < targets.Num(); i++ ) {
////		ent = targets[ i ].GetEntity();
////		if ( !ent ) {
////			continue;
////		}
////		if ( ent.IsType( idLight::Type ) ) {
////			light = static_cast<idLight *>( ent );
////			light.FadeIn( time );
////		} else {
////			gameLocal.Printf( "'%s' targets non-light '%s'", name.c_str(), ent.GetName() );
////		}
////	}
////}
};

/*
===============================================================================

idTarget_LightFadeOut

===============================================================================
*/

class idTarget_LightFadeOut extends idTarget {
//public:
	//CLASS_PROTOTYPE( idTarget_LightFadeOut );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idTarget_LightFadeOut>[];

//private:
	Event_Activate(activator: idEntity): void { throw "placeholder"; }

	
/////*
////================
////idTarget_LightFadeOut::Event_Activate
////================
////*/
////void idTarget_LightFadeOut::Event_Activate( activator:idEntity ) {
////	var ent:idEntity
////	idLight *light;
////	var/*int*/i:number;
////	var /*float*/time:number;
////
////	if ( !targets.Num() ) {
////		return;
////	}
////
////	time = this.spawnArgs.GetFloat( "fadetime" );
////	ent = this;
////	for( i = 0; i < targets.Num(); i++ ) {
////		ent = targets[ i ].GetEntity();
////		if ( !ent ) {
////			continue;
////		}
////		if ( ent.IsType( idLight::Type ) ) {
////			light = static_cast<idLight *>( ent );
////			light.FadeOut( time );
////		} else {
////			gameLocal.Printf( "'%s' targets non-light '%s'", name.c_str(), ent.GetName() );
////		}
////	}
////}
};

/*
===============================================================================

idTarget_Give

===============================================================================
*/

class idTarget_Give extends idTarget {
//public:
	//CLASS_PROTOTYPE( idTarget_Give );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idTarget_Give>[];

	//Spawn():void{throw "placeholder";}

//private:
	Event_Activate(activator: idEntity): void { throw "placeholder"; }


/*
================
idTarget_Give::Spawn
================
*/
	Spawn(): void {
		if ( this.spawnArgs.GetBool( "onSpawn" ) ) {
			this.PostEventMS( EV_Activate, 50 );
		}
	}

/////*
////================
////idTarget_Give::Event_Activate
////================
////*/
////void idTarget_Give::Event_Activate( activator:idEntity ) {
////	
////	if ( this.spawnArgs.GetBool( "development" ) && developer.GetInteger() == 0 ) {
////		return;
////	}
////
////	static int giveNum = 0;
////	idPlayer *player = gameLocal.GetLocalPlayer();
////	if ( player ) {
////		const idKeyValue *kv = this.spawnArgs.MatchPrefix( "item", NULL );
////		while ( kv ) {
////			const idDict *dict = gameLocal.FindEntityDefDict( kv.GetValue(), false );
////			if ( dict ) {
////				idDict d2;
////				d2.Copy( *dict );
////				d2.Set( "name", va( "givenitem_%i", giveNum++ ) );
////				var ent:idEntity = NULL;
////				if ( gameLocal.SpawnEntityDef( d2, &ent ) && ent && ent.IsType( idItem::Type ) ) {
////					idItem *item = static_cast<idItem*>(ent);
////					item.GiveToPlayer( gameLocal.GetLocalPlayer() );
////				}
////			}
////			kv = this.spawnArgs.MatchPrefix( "item", kv );
////		}
////	}
////}
////
};


/*
===============================================================================

idTarget_GiveEmail

===============================================================================
*/

class idTarget_GiveEmail extends idTarget {
//public:
	//CLASS_PROTOTYPE( idTarget_GiveEmail );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idTarget_GiveEmail>[];

	//Spawn():void{throw "placeholder";}

//private:
	Event_Activate(activator: idEntity): void { throw "placeholder"; }


/*
================
idTarget_GiveEmail::Spawn
================
*/
	Spawn(): void {
}
////
/////*
////================
////idTarget_GiveEmail::Event_Activate
////================
////*/
////void idTarget_GiveEmail::Event_Activate( activator:idEntity ) {
////	idPlayer *player = gameLocal.GetLocalPlayer();
////	const idDeclPDA *pda = player.GetPDA();
////	if ( pda ) {
////		player.GiveEmail( this.spawnArgs.GetString( "email" ) );
////	} else {
////		player.ShowTip( this.spawnArgs.GetString( "text_infoTitle" ), this.spawnArgs.GetString( "text_PDANeeded" ), true );
////	}
////}
////
};

/*
===============================================================================

idTarget_SetModel

===============================================================================
*/

class idTarget_SetModel extends idTarget {
//public:
	//CLASS_PROTOTYPE( idTarget_SetModel );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idTarget_SetModel>[];

	//Spawn():void{throw "placeholder";}

//private:
	Event_Activate(activator: idEntity): void { throw "placeholder"; }


/*
================
idTarget_SetModel::Spawn
================
*/
	Spawn ( ): void {
		var model: string;

		model = this.spawnArgs.GetString( "newmodel" );
		if (declManager.FindType( declType_t.DECL_MODELDEF, model, false ) == null ) {
			// precache the render model
			renderModelManager.FindModel( model );
			// precache .cm files only
			collisionModelManager.LoadModel( model, true );
		}
	}
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
////			ent.SetModel( this.spawnArgs.GetString( "newmodel" ) );
////		}
////	}
////}
////
};


/*
===============================================================================

idTarget_SetInfluence

===============================================================================
*/

class idTarget_SetInfluence extends idTarget {
//public:
	//CLASS_PROTOTYPE( idTarget_SetInfluence );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idTarget_SetInfluence>[];

						//idTarget_SetInfluence( );

	Save(savefile:idSaveGame):void{throw "placeholder";}
	//Restore(savefile:idRestoreGame):void{throw "placeholder";}

	//Spawn():void{throw "placeholder";}

//private:
	Event_Activate( activator:idEntity ):void { throw "placeholder"; }
	Event_RestoreInfluence():void { throw "placeholder"; }
	Event_GatherEntities():void { throw "placeholder"; }
	Event_Flash( /*float*/ flash:number, /*int*/ outflash:number) :void { throw "placeholder"; }
	Event_ClearFlash( /*float*/ flash:number):void { throw "placeholder"; }
	Think():void{throw "placeholder";}

	//idList<int>			lightList;
	//idList<int>			guiList;
	//idList<int>			soundList;
	//idList<int>			genericList;
	//float				flashIn;
	//float				flashOut;
	//float				delay;
	//idStr				flashInSound;
	//idStr				flashOutSound;
	//idEntity *			switchToCamera;
	//idInterpolate<float>fovSetting;
	//bool				soundFaded;
	//bool				restoreOnTrigger;

	
/*
================
idTarget_SetInfluence::idTarget_SetInfluence
================
*/
	constructor() {
		super ( );
		todoThrow ( );
	//flashIn = 0.0;
	//flashOut = 0.0;
	//delay = 0.0;
	//switchToCamera = null;
	//soundFaded = false;
	//restoreOnTrigger = false;
}
////
/////*
////================
////idTarget_SetInfluence::Save
////================
////*/
////void idTarget_SetInfluence::Save( idSaveGame *savefile ) const {
////	var/*int*/i:number;
////
////	savefile.WriteInt( lightList.Num() );
////	for( i = 0; i < lightList.Num(); i++ ) {
////		savefile.WriteInt( lightList[ i ] );
////	}
////
////	savefile.WriteInt( guiList.Num() );
////	for( i = 0; i < guiList.Num(); i++ ) {
////		savefile.WriteInt( guiList[ i ] );
////	}
////
////	savefile.WriteInt( soundList.Num() );
////	for( i = 0; i < soundList.Num(); i++ ) {
////		savefile.WriteInt( soundList[ i ] );
////	}
////
////	savefile.WriteInt( genericList.Num() );
////	for( i = 0; i < genericList.Num(); i++ ) {
////		savefile.WriteInt( genericList[ i ] );
////	}
////
////	savefile.WriteFloat( flashIn );
////	savefile.WriteFloat( flashOut );
////
////	savefile.WriteFloat( delay );
////
////	savefile.WriteString( flashInSound );
////	savefile.WriteString( flashOutSound );
////
////	savefile.WriteObject( switchToCamera );
////
////	savefile.WriteFloat( fovSetting.GetStartTime() );
////	savefile.WriteFloat( fovSetting.GetDuration() );
////	savefile.WriteFloat( fovSetting.GetStartValue() );
////	savefile.WriteFloat( fovSetting.GetEndValue() );
////
////	savefile.WriteBool( soundFaded );
////	savefile.WriteBool( restoreOnTrigger );
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
////	savefile.ReadInt( num );
////	for( i = 0; i < num; i++ ) {
////		savefile.ReadInt( itemNum );
////		lightList.Append( itemNum );
////	}
////
////	savefile.ReadInt( num );
////	for( i = 0; i < num; i++ ) {
////		savefile.ReadInt( itemNum );
////		guiList.Append( itemNum );
////	}
////
////	savefile.ReadInt( num );
////	for( i = 0; i < num; i++ ) {
////		savefile.ReadInt( itemNum );
////		soundList.Append( itemNum );
////	}
////
////	savefile.ReadInt( num );
////	for ( i = 0; i < num; i++ ) {
////		savefile.ReadInt( itemNum );
////		genericList.Append( itemNum );
////	}
////
////	savefile.ReadFloat( flashIn );
////	savefile.ReadFloat( flashOut );
////
////	savefile.ReadFloat( delay );
////
////	savefile.ReadString( flashInSound );
////	savefile.ReadString( flashOutSound );
////
////	savefile.ReadObject( reinterpret_cast<idClass *&>( switchToCamera ) );
////
////	savefile.ReadFloat( set );
////	fovSetting.SetStartTime( set );
////	savefile.ReadFloat( set );
////	fovSetting.SetDuration( set );
////	savefile.ReadFloat( set );
////	fovSetting.SetStartValue( set );
////	savefile.ReadFloat( set );
////	fovSetting.SetEndValue( set );
////
////	savefile.ReadBool( soundFaded );
////	savefile.ReadBool( restoreOnTrigger );
////}

/*
================
idTarget_SetInfluence::Spawn
================
*/
	Spawn(): void {
		todoThrow ( );
	//PostEventMS( EV_GatherEntities, 0 );
	//flashIn = this.spawnArgs.GetFloat( "flashIn", "0" );
	//flashOut = this.spawnArgs.GetFloat( "flashOut", "0" );
	//flashInSound = this.spawnArgs.GetString( "snd_flashin" );
	//flashOutSound = this.spawnArgs.GetString( "snd_flashout" );
	//delay = this.spawnArgs.GetFloat( "delay" );
	//soundFaded = false;
	//restoreOnTrigger = false;

	//// always allow during cinematics
	//cinematic = true;
}

/////*
////================
////idTarget_SetInfluence::Event_Flash
////================
////*/
////void idTarget_SetInfluence::Event_Flash( float flash, int out ) {
////	idPlayer *player = gameLocal.GetLocalPlayer();
////	player.playerView.Fade( idVec4( 1, 1, 1, 1 ), flash );
////	const idSoundShader *shader = NULL;
////	if ( !out && flashInSound.Length() ){
////		shader = declManager.FindSound( flashInSound );
////		player.StartSoundShader( shader, SND_CHANNEL_VOICE, 0, false, NULL );
////	} else if ( out && ( flashOutSound.Length() || flashInSound.Length() ) ) {
////		shader = declManager.FindSound( flashOutSound.Length() ? flashOutSound : flashInSound );
////		player.StartSoundShader( shader, SND_CHANNEL_VOICE, 0, false, NULL );
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
////	player.playerView.Fade( vec4_zero , flash );		
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
////	//bool demonicOnly = this.spawnArgs.GetBool( "effect_demonic" );
////	bool lights = this.spawnArgs.GetBool( "effect_lights" );
////	bool sounds = this.spawnArgs.GetBool( "effect_sounds" );
////	bool guis = this.spawnArgs.GetBool( "effect_guis" );
////	bool models = this.spawnArgs.GetBool( "effect_models" );
////	bool vision = this.spawnArgs.GetBool( "effect_vision" );
////	bool targetsOnly = this.spawnArgs.GetBool( "targetsOnly" );
////
////	lightList.Clear();
////	guiList.Clear();
////	soundList.Clear();
////
////	if ( this.spawnArgs.GetBool( "effect_all" ) ) {
////		lights = sounds = guis = models = vision = true;
////	}
////
////	if ( targetsOnly ) {
////		listedEntities = targets.Num();
////		for ( i = 0; i < listedEntities; i++ ) {
////			entityList[i] = targets[i].GetEntity();
////		}
////	} else {
////		float radius = this.spawnArgs.GetFloat( "radius" );
////		listedEntities = gameLocal.EntitiesWithinRadius( GetPhysics().GetOrigin(), radius, entityList, MAX_GENTITIES );
////	}
////
////	for( i = 0; i < listedEntities; i++ ) {
////		var ent:idEntity = entityList[ i ];
////		if ( ent ) {
////			if ( lights && ent.IsType( idLight::Type ) && ent.spawnArgs.FindKey( "color_demonic" ) ) {
////				lightList.Append( ent.entityNumber );
////				continue;
////			}
////			if ( sounds && ent.IsType( idSound::Type ) && ent.spawnArgs.FindKey( "snd_demonic" ) ) {
////				soundList.Append( ent.entityNumber );
////				continue;
////			}
////			if ( guis && ent.GetRenderEntity() && ent.GetRenderEntity().gui[ 0 ] && ent.spawnArgs.FindKey( "gui_demonic" ) ) {
////				guiList.Append( ent.entityNumber );
////				continue;
////			}
////			if ( ent.IsType( idStaticEntity::Type ) && ent.spawnArgs.FindKey( "color_demonic" ) ) {
////				genericList.Append( ent.entityNumber );
////				continue;
////			}
////		}
////	}
////	idStr temp;
////	temp = this.spawnArgs.GetString( "switchToView" );
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
////	if ( this.spawnArgs.GetBool( "triggerActivate" ) ) {
////		if ( restoreOnTrigger ) {
////			ProcessEvent( &EV_RestoreInfluence );
////			restoreOnTrigger = false;
////			return;
////		}
////		restoreOnTrigger = true;
////	}
////
////	float fadeTime = this.spawnArgs.GetFloat( "fadeWorldSounds" );
////
////	if ( delay > 0.0 ) {
////		PostEventSec( &EV_Activate, delay, activator );
////		delay = 0.0;
////		// start any sound fading now
////		if ( fadeTime ) {
////			gameSoundWorld.FadeSoundClasses( 0, -40.0, fadeTime );
////			soundFaded = true;
////		}
////		return;
////	} else if ( fadeTime && !soundFaded ) {
////		gameSoundWorld.FadeSoundClasses( 0, -40.0, fadeTime );
////		soundFaded = true;
////	}
////
////	if ( this.spawnArgs.GetBool( "triggerTargets" ) ) {
////		ActivateTargets( activator );
////	}
////
////	if ( flashIn ) {
////		PostEventSec( &EV_Flash, 0.0, flashIn, 0 );
////	}
////
////	parm = this.spawnArgs.GetString( "snd_influence" );
////	if ( parm && *parm ) {
////		PostEventSec( &EV_StartSoundShader, flashIn, parm, SND_CHANNEL_ANY );
////	}
////
////	if ( switchToCamera ) {
////		switchToCamera.PostEventSec( &EV_Activate, flashIn + 0.05f, this );
////	}
////
////	int fov = this.spawnArgs.GetInt( "fov" );
////	if ( fov ) {
////		fovSetting.Init( gameLocal.time, SEC2MS( this.spawnArgs.GetFloat( "fovTime" ) ), player.DefaultFov(), fov );
////		BecomeActive( TH_THINK );
////	}
////
////	for ( i = 0; i < genericList.Num(); i++ ) {
////		ent = gameLocal.entities[genericList[i]];
////		if ( ent == NULL ) {
////			continue;
////		}
////		generic = static_cast<idStaticEntity*>( ent );
////		color = generic.spawnArgs.GetVector( "color_demonic" );
////		colorTo.Set( color.x, color.y, color.z, 1.0 );
////		generic.Fade( colorTo, this.spawnArgs.GetFloat( "fade_time", "0.25" ) );
////	}
////
////	for ( i = 0; i < lightList.Num(); i++ ) {
////		ent = gameLocal.entities[lightList[i]];
////		if ( ent == NULL || !ent.IsType( idLight::Type ) ) {
////			continue;
////		}
////		light = static_cast<idLight *>(ent);
////		parm = light.spawnArgs.GetString( "mat_demonic" );
////		if ( parm && *parm ) {
////			light.SetShader( parm );
////		}
////		
////		color = light.spawnArgs.GetVector( "_color" );
////		color = light.spawnArgs.GetVector( "color_demonic", color.ToString() );
////		colorTo.Set( color.x, color.y, color.z, 1.0 );
////		light.Fade( colorTo, this.spawnArgs.GetFloat( "fade_time", "0.25" ) );
////	}
////
////	for ( i = 0; i < soundList.Num(); i++ ) {
////		ent = gameLocal.entities[soundList[i]];
////		if ( ent == NULL || !ent.IsType( idSound::Type ) ) {
////			continue;
////		}
////		sound = static_cast<idSound *>(ent);
////		parm = sound.spawnArgs.GetString( "snd_demonic" );
////		if ( parm && *parm ) {
////			if ( sound.spawnArgs.GetBool( "overlayDemonic" ) ) {
////				sound.StartSound( "snd_demonic", SND_CHANNEL_DEMONIC, 0, false, NULL );
////			} else {
////				sound.StopSound( SND_CHANNEL_ANY, false );
////				sound.SetSound( parm );
////			}
////		}
////	}
////
////	for ( i = 0; i < guiList.Num(); i++ ) {
////		ent = gameLocal.entities[guiList[i]];
////		if ( ent == NULL || ent.GetRenderEntity() == NULL ) {
////			continue;
////		}
////		update = false;
////		for ( j = 0; j < MAX_RENDERENTITY_GUI; j++ ) {
////			if ( ent.GetRenderEntity().gui[ j ] && ent.spawnArgs.FindKey( j == 0 ? "gui_demonic" : va( "gui_demonic%d", j+1 ) ) ) {
////				ent.GetRenderEntity().gui[ j ] = uiManager.FindGui( ent.spawnArgs.GetString( j == 0 ? "gui_demonic" : va( "gui_demonic%d", j+1 ) ), true );
////				update = true;
////			}
////		}
////
////		if ( update ) {
////			ent.UpdateVisuals();
////			ent.Present();
////		}
////	}
////
////	player.SetInfluenceLevel( this.spawnArgs.GetInt( "influenceLevel" ) );
////
////	int snapAngle = this.spawnArgs.GetInt( "snapAngle" );
////	if ( snapAngle ) {
////		idAngles ang( 0, snapAngle, 0 );
////		player.SetViewAngles( ang );
////		player.SetAngles( ang );
////	}
////
////	if ( this.spawnArgs.GetBool( "effect_vision" ) ) {
////		parm = this.spawnArgs.GetString( "mtrVision" );
////		skin = this.spawnArgs.GetString( "skinVision" );
////		player.SetInfluenceView( parm, skin, this.spawnArgs.GetInt( "visionRadius" ), this ); 
////	}
////
////	parm = this.spawnArgs.GetString( "mtrWorld" );
////	if ( parm && *parm ) {
////		gameLocal.SetGlobalMaterial( declManager.FindMaterial( parm ) );
////	}
////
////	if ( !restoreOnTrigger ) {
////		PostEventMS( &EV_RestoreInfluence, SEC2MS( this.spawnArgs.GetFloat( "time" ) ) );
////	}
////}
////
/////*
////================
////idTarget_SetInfluence::Think
////================
////*/
////void idTarget_SetInfluence::Think( ) {
////	if ( thinkFlags & TH_THINK ) {
////		idPlayer *player = gameLocal.GetLocalPlayer();
////		player.SetInfluenceFov( fovSetting.GetCurrentValue( gameLocal.time ) );
////		if ( fovSetting.IsDone( gameLocal.time ) ) {
////			if ( !spawnArgs.GetBool( "leaveFOV" ) ) {
////				player.SetInfluenceFov( 0 );
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
////		PostEventSec( &EV_Flash, 0.0, flashOut, 1 );
////	}
////
////	if ( switchToCamera ) {
////		switchToCamera.PostEventMS( &EV_Activate, 0.0, this );
////	}
////
////	for ( i = 0; i < genericList.Num(); i++ ) {
////		ent = gameLocal.entities[genericList[i]];
////		if ( ent == NULL ) {
////			continue;
////		}
////		generic = static_cast<idStaticEntity*>( ent );
////		colorTo.Set( 1.0, 1.0, 1.0, 1.0 );
////		generic.Fade( colorTo, this.spawnArgs.GetFloat( "fade_time", "0.25" ) );
////	}
////
////	for ( i = 0; i < lightList.Num(); i++ ) {
////		ent = gameLocal.entities[lightList[i]];
////		if ( ent == NULL || !ent.IsType( idLight::Type ) ) {
////			continue;
////		}
////		light = static_cast<idLight *>(ent);
////		if ( !light.spawnArgs.GetBool( "leave_demonic_mat" ) ) {
////			const char *texture = light.spawnArgs.GetString( "texture", "lights/squarelight1" );
////			light.SetShader( texture );
////		}
////		color = light.spawnArgs.GetVector( "_color" );
////		colorTo.Set( color.x, color.y, color.z, 1.0 );
////		light.Fade( colorTo, this.spawnArgs.GetFloat( "fade_time", "0.25" ) );
////	}
////
////	for ( i = 0; i < soundList.Num(); i++ ) {
////		ent = gameLocal.entities[soundList[i]];
////		if ( ent == NULL || !ent.IsType( idSound::Type ) ) {
////			continue;
////		}
////		sound = static_cast<idSound *>(ent);
////		sound.StopSound( SND_CHANNEL_ANY, false );
////		sound.SetSound( sound.spawnArgs.GetString( "s_shader" ) );
////	}
////
////	for ( i = 0; i < guiList.Num(); i++ ) {
////		ent = gameLocal.entities[guiList[i]];
////		if ( ent == NULL || GetRenderEntity() == NULL ) {
////			continue;
////		}
////		update = false;
////		for( j = 0; j < MAX_RENDERENTITY_GUI; j++ ) {
////			if ( ent.GetRenderEntity().gui[ j ] ) {
////				ent.GetRenderEntity().gui[ j ] = uiManager.FindGui( ent.spawnArgs.GetString( j == 0 ? "gui" : va( "gui%d", j+1 ) ) );
////				update = true;
////			}
////		}
////		if ( update ) {
////			ent.UpdateVisuals();
////			ent.Present();
////		}
////	}
////
////	idPlayer *player = gameLocal.GetLocalPlayer();
////	player.SetInfluenceLevel( 0 );
////	player.SetInfluenceView( NULL, NULL, 0.0, NULL );
////	player.SetInfluenceFov( 0 );
////	gameLocal.SetGlobalMaterial( NULL );
////	float fadeTime = this.spawnArgs.GetFloat( "fadeWorldSounds" );
////	if ( fadeTime ) {
////		gameSoundWorld.FadeSoundClasses( 0, 0.0, fadeTime / 2.0 );
////	}
////
////}
};


/*
===============================================================================

idTarget_SetKeyVal

===============================================================================
*/

class idTarget_SetKeyVal extends idTarget {
//public:
	//CLASS_PROTOTYPE( idTarget_SetKeyVal );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idTarget_SetKeyVal>[];

//private:
	Event_Activate ( activator: idEntity ): void { throw "placeholder"; }


/////*
////================
////idTarget_SetKeyVal::Event_Activate
////================
////*/
////void idTarget_SetKeyVal::Event_Activate( activator:idEntity ) {
////	var/*int*/i:number;
////	idStr key, val;
////	var ent:idEntity
////	const idKeyValue *kv;
////	int n;
////
////	for( i = 0; i < targets.Num(); i++ ) {
////		ent = targets[ i ].GetEntity();
////		if ( ent ) {
////			kv = this.spawnArgs.MatchPrefix("keyval");
////			while ( kv ) {
////				n = kv.GetValue().Find( ";" );
////				if ( n > 0 ) {
////					key = kv.GetValue().Left( n );
////					val = kv.GetValue().Right( kv.GetValue().Length() - n - 1 );
////					ent.spawnArgs.Set( key, val );
////					for ( int j = 0; j < MAX_RENDERENTITY_GUI; j++ ) {
////						if ( ent.GetRenderEntity().gui[ j ] ) {
////							if ( idStr::Icmpn( key, "gui_", 4 ) == 0 ) {
////								ent.GetRenderEntity().gui[ j ].SetStateString( key, val );
////								ent.GetRenderEntity().gui[ j ].StateChanged( gameLocal.time );
////							}
////						}
////					}
////				}
////				kv = this.spawnArgs.MatchPrefix( "keyval", kv );
////			}
////			ent.UpdateChangeableSpawnArgs( NULL );
////			ent.UpdateVisuals();
////			ent.Present();
////		}
////	}
////}
////
}


/*
===============================================================================

idTarget_SetFov

===============================================================================
*/

class idTarget_SetFov extends idTarget {
//public:
	//CLASS_PROTOTYPE( idTarget_SetFov );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idTarget_SetFov>[];

	Save(savefile: idSaveGame): void { throw "placeholder"; }
	Restore(savefile: idRestoreGame): void { throw "placeholder"; }

	Think(  ): void { throw "placeholder"; }

//private:
	//idInterpolate<int>	fovSetting;

	Event_Activate(activator: idEntity): void { throw "placeholder"; }

	
////
/////*
////================
////idTarget_SetFov::Save
////================
////*/
////void idTarget_SetFov::Save( idSaveGame *savefile ) const {
////
////	savefile.WriteFloat( fovSetting.GetStartTime() );
////	savefile.WriteFloat( fovSetting.GetDuration() );
////	savefile.WriteFloat( fovSetting.GetStartValue() );
////	savefile.WriteFloat( fovSetting.GetEndValue() );
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
////	savefile.ReadFloat( setting );
////	fovSetting.SetStartTime( setting );
////	savefile.ReadFloat( setting );
////	fovSetting.SetDuration( setting );
////	savefile.ReadFloat( setting );
////	fovSetting.SetStartValue( setting );
////	savefile.ReadFloat( setting );
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
////	fovSetting.Init( gameLocal.time, SEC2MS( this.spawnArgs.GetFloat( "time" ) ), player ? player.DefaultFov() : g_fov.GetFloat(), this.spawnArgs.GetFloat( "fov" ) );
////	BecomeActive( TH_THINK );
////}
////
/////*
////================
////idTarget_SetFov::Think
////================
////*/
////void idTarget_SetFov::Think( ) {
////	if ( thinkFlags & TH_THINK ) {
////		idPlayer *player = gameLocal.GetLocalPlayer();
////		player.SetInfluenceFov( fovSetting.GetCurrentValue( gameLocal.time ) );
////		if ( fovSetting.IsDone( gameLocal.time ) ) {
////			player.SetInfluenceFov( 0.0 );
////			BecomeInactive( TH_THINK );
////		}
////	} else {
////		BecomeInactive( TH_ALL );
////	}
////}
////
};


/*
===============================================================================

idTarget_SetPrimaryObjective

===============================================================================
*/

class idTarget_SetPrimaryObjective extends idTarget {
//public:
	//CLASS_PROTOTYPE( idTarget_SetPrimaryObjective );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idTarget_SetPrimaryObjective>[];

//private:
	Event_Activate(activator: idEntity): void { throw "placeholder"; }

	
/////*
////================
////idTarget_SetPrimaryObjective::Event_Activate
////================
////*/
////void idTarget_SetPrimaryObjective::Event_Activate( activator:idEntity ) {
////	idPlayer *player = gameLocal.GetLocalPlayer();
////	if ( player && player.objectiveSystem ) {
////		player.objectiveSystem.SetStateString( "missionobjective", this.spawnArgs.GetString( "text", common.GetLanguageDict().GetString( "#str_04253" ) ) );
////	}
////}
////
};

/*
===============================================================================

idTarget_LockDoor

===============================================================================
*/

class idTarget_LockDoor extends idTarget {
//public:
	//CLASS_PROTOTYPE( idTarget_LockDoor );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idTarget_LockDoor>[];

//private:
	Event_Activate(activator: idEntity): void { throw "placeholder"; }

	
/////*
////================
////idTarget_LockDoor::Event_Activate
////================
////*/
////void idTarget_LockDoor::Event_Activate( activator:idEntity ) {
////	var/*int*/i:number;
////	var ent:idEntity
////	int lock;
////
////	lock = this.spawnArgs.GetInt( "locked", "1" );
////	for( i = 0; i < targets.Num(); i++ ) {
////		ent = targets[ i ].GetEntity();
////		if ( ent && ent.IsType( idDoor::Type ) ) {
////			if ( static_cast<idDoor *>( ent ).IsLocked() ) {
////				static_cast<idDoor *>( ent ).Lock( 0 );
////			} else {
////				static_cast<idDoor *>( ent ).Lock( lock );
////			}
////		}
////	}
////}
////
};

/*
===============================================================================

idTarget_CallObjectFunction

===============================================================================
*/

class idTarget_CallObjectFunction extends idTarget {
//public:
	//CLASS_PROTOTYPE( idTarget_CallObjectFunction );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idTarget_CallObjectFunction>[];

//private:
	Event_Activate(activator: idEntity): void { throw "placeholder"; }

	
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
////	funcName = this.spawnArgs.GetString( "call" );
////	for( i = 0; i < targets.Num(); i++ ) {
////		ent = targets[ i ].GetEntity();
////		if ( ent && ent.scriptObject.HasObject() ) {
////			func = ent.scriptObject.GetFunction( funcName );
////			if ( !func ) {
////				gameLocal.Error( "Function '%s' not found on entity '%s' for function call from '%s'", funcName, ent.name.c_str(), name.c_str() );
////			}
////			if ( func.type.NumParameters() != 1 ) {
////				gameLocal.Error( "Function '%s' on entity '%s' has the wrong number of parameters for function call from '%s'", funcName, ent.name.c_str(), name.c_str() );
////			}
////			if ( !ent.scriptObject.GetTypeDef().Inherits( func.type.GetParmType( 0 ) ) ) {
////				gameLocal.Error( "Function '%s' on entity '%s' is the wrong type for function call from '%s'", funcName, ent.name.c_str(), name.c_str() );
////			}
////			// create a thread and call the function
////			thread = new idThread();
////			thread.CallFunction( ent, func, true );
////			thread.Start();
////		}
////	}
////}
////
};


/*
===============================================================================

idTarget_LockDoor

===============================================================================
*/

class idTarget_EnableLevelWeapons extends idTarget {
//public:
	//CLASS_PROTOTYPE( idTarget_EnableLevelWeapons );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idTarget_EnableLevelWeapons>[];

//private:
	Event_Activate(activator: idEntity): void { throw "placeholder"; }

	
/////*
////================
////idTarget_EnableLevelWeapons::Event_Activate
////================
////*/
////void idTarget_EnableLevelWeapons::Event_Activate( activator:idEntity ) {
////	var/*int*/i:number;
////	const char *weap;
////
////	gameLocal.world.spawnArgs.SetBool( "no_Weapons", this.spawnArgs.GetBool( "disable" ) );
////
////	if ( this.spawnArgs.GetBool( "disable" ) ) {
////		for( i = 0; i < gameLocal.numClients; i++ ) {
////			if ( gameLocal.entities[ i ] ) {
////				gameLocal.entities[ i ].ProcessEvent( &EV_Player_DisableWeapon );
////			}
////		}
////	} else {
////		weap = this.spawnArgs.GetString( "weapon" );
////		for( i = 0; i < gameLocal.numClients; i++ ) {
////			if ( gameLocal.entities[ i ] ) {
////				gameLocal.entities[ i ].ProcessEvent( &EV_Player_EnableWeapon );
////				if ( weap && weap[ 0 ] ) {
////					gameLocal.entities[ i ].PostEventSec( &EV_Player_SelectWeapon, 0.5f, weap );
////				}
////			}
////		}
////	}
////}
////
};


/*
===============================================================================

idTarget_Tip

===============================================================================
*/

class idTarget_Tip extends idTarget {
//public:
	//CLASS_PROTOTYPE( idTarget_Tip );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idTarget_Tip>[];

	//					idTarget_Tip( );

	//Spawn():void{throw "placeholder";}

	Save ( savefile: idSaveGame ): void { throw "placeholder"; }
	Restore ( savefile: idRestoreGame ): void { throw "placeholder"; }

//private:
	playerPos = new idVec3 ( );

	Event_Activate ( activator: idEntity ): void { throw "placeholder"; }
	Event_TipOff ( ): void { throw "placeholder"; }
	Event_GetPlayerPos ( ): void { throw "placeholder"; }


/*
================
idTarget_Tip::idTarget_Tip
================
*/
	constructor ( ) {
		super ( );
		this.playerPos.Zero ( );
	}

/*
================
idTarget_Tip::Spawn
================
*/
	Spawn ( ): void {
	}

/////*
////================
////idTarget_Tip::Save
////================
////*/
////void idTarget_Tip::Save( idSaveGame *savefile ) const {
////	savefile.WriteVec3( this.playerPos );
////}
////
/////*
////================
////idTarget_Tip::Restore
////================
////*/
////void idTarget_Tip::Restore( idRestoreGame *savefile ) {
////	savefile.ReadVec3( this.playerPos );
////}
////
/////*
////================
////idTarget_Tip::Event_Activate
////================
////*/
////void idTarget_Tip::Event_GetPlayerPos( ) {
////	idPlayer *player = gameLocal.GetLocalPlayer();
////	if ( player ) {
////		this.playerPos = player.GetPhysics().GetOrigin();
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
////		if ( player.IsTipVisible() ) {
////			PostEventSec( &EV_Activate, 5.1f, activator );
////			return;
////		}
////		player.ShowTip( this.spawnArgs.GetString( "text_title" ), this.spawnArgs.GetString( "text_tip" ), false );
////		PostEventMS( &EV_GetPlayerPos, 2000 );
////	}
////}
////
/////*
////================
////idTarget_Tip::Event_TipOff
////================
////*/
////void idTarget_Tip::Event_TipOff( ) {
////	idPlayer *player = gameLocal.GetLocalPlayer();
////	if ( player ) {
////		idVec3 v = player.GetPhysics().GetOrigin() - this.playerPos;
////		if ( v.Length() > 96.0 ) {
////			player.HideTip();
////		} else {
////			PostEventMS( &EV_TipOff, 100 );
////		}
////	}
////}
////
////
}

/*
===============================================================================

idTarget_GiveSecurity

===============================================================================
*/
class idTarget_GiveSecurity extends idTarget {
//public:
	//CLASS_PROTOTYPE( idTarget_GiveSecurity );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idTarget_GiveSecurity>[];
//private:
	Event_Activate(activator: idEntity): void { throw "placeholder"; }

	
/////*
////================
////idTarget_GiveEmail::Event_Activate
////================
////*/
////void idTarget_GiveSecurity::Event_Activate( activator:idEntity ) {
////	idPlayer *player = gameLocal.GetLocalPlayer();
////	if ( player ) {
////		player.GiveSecurity( this.spawnArgs.GetString( "text_security" ) );
////	}
////}
////
};


/*
===============================================================================

idTarget_RemoveWeapons

===============================================================================
*/
class idTarget_RemoveWeapons extends idTarget {
//public:
	//CLASS_PROTOTYPE( idTarget_RemoveWeapons );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idTarget_RemoveWeapons>[];
//private:
	Event_Activate(activator: idEntity): void { throw "placeholder"; }

	
/////*
////================
////idTarget_RemoveWeapons::Event_Activate
////================
////*/
////void idTarget_RemoveWeapons::Event_Activate( activator:idEntity ) {
////	for( int i = 0; i < gameLocal.numClients; i++ ) {
////		if ( gameLocal.entities[ i ] ) {
////			idPlayer *player = static_cast< idPlayer* >( gameLocal.entities[i] );
////			const idKeyValue *kv = this.spawnArgs.MatchPrefix( "weapon", NULL );
////			while ( kv ) {
////				player.RemoveWeapon( kv.GetValue() );
////				kv = this.spawnArgs.MatchPrefix( "weapon", kv );
////			}
////			player.SelectWeapon( player.weapon_fists, true );
////		}
////	}
////}
////
////
};


/*
===============================================================================

idTarget_LevelTrigger

===============================================================================
*/
class idTarget_LevelTrigger extends idTarget {
//public:
	//CLASS_PROTOTYPE( idTarget_LevelTrigger );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idTarget_LevelTrigger>[];
//private:
	Event_Activate(activator: idEntity): void { throw "placeholder"; }

	
/////*
////================
////idTarget_LevelTrigger::Event_Activate
////================
////*/
////void idTarget_LevelTrigger::Event_Activate( activator:idEntity ) {
////	for( int i = 0; i < gameLocal.numClients; i++ ) {
////		if ( gameLocal.entities[ i ] ) {
////			idPlayer *player = static_cast< idPlayer* >( gameLocal.entities[i] );
////			player.SetLevelTrigger( this.spawnArgs.GetString( "levelName" ), this.spawnArgs.GetString( "triggerName" ) );
////		}
////	}
////}
////
////
};

/*
===============================================================================

idTarget_EnableStamina

===============================================================================
*/
class idTarget_EnableStamina extends idTarget {
//public:
	//CLASS_PROTOTYPE( idTarget_EnableStamina );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idTarget_EnableStamina>[];
//private:
	Event_Activate(activator: idEntity): void { throw "placeholder"; }

	
/////*
////================
////idTarget_EnableStamina::Event_Activate
////================
////*/
////void idTarget_EnableStamina::Event_Activate( activator:idEntity ) {
////	for( int i = 0; i < gameLocal.numClients; i++ ) {
////		if ( gameLocal.entities[ i ] ) {
////			idPlayer *player = static_cast< idPlayer* >( gameLocal.entities[i] );
////			if ( this.spawnArgs.GetBool( "enable" ) ) {
////				pm_stamina.SetFloat( player.spawnArgs.GetFloat( "pm_stamina" ) );
////			} else {
////				pm_stamina.SetFloat( 0.0 );
////			}
////		}
////	}
////}
////
};

/*
===============================================================================

idTarget_FadeSoundClass

===============================================================================
*/
class idTarget_FadeSoundClass extends idTarget {
//public:
	//CLASS_PROTOTYPE( idTarget_FadeSoundClass );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idTarget_FadeSoundClass>[];	
//private:
	Event_Activate( activator:idEntity ): void { throw "placeholder"; }
	Event_RestoreVolume(): void { throw "placeholder"; }

	
/////*
////================
////idTarget_FadeSoundClass::Event_Activate
////================
////*/
////void idTarget_FadeSoundClass::Event_Activate( activator:idEntity ) {
////	float fadeTime = this.spawnArgs.GetFloat( "fadeTime" );
////	float fadeDB = this.spawnArgs.GetFloat( "fadeDB" );
////	float fadeDuration = this.spawnArgs.GetFloat( "fadeDuration" );
////	int fadeClass = this.spawnArgs.GetInt( "fadeClass" );
////	// start any sound fading now
////	if ( fadeTime ) {
////		gameSoundWorld.FadeSoundClasses( fadeClass, this.spawnArgs.GetBool( "fadeIn" ) ? fadeDB : 0.0 - fadeDB, fadeTime );
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
////	float fadeTime = this.spawnArgs.GetFloat( "fadeTime" );
////	float fadeDB = this.spawnArgs.GetFloat( "fadeDB" );
////	//int fadeClass = this.spawnArgs.GetInt( "fadeClass" );
////	// restore volume
////	gameSoundWorld.FadeSoundClasses( 0, fadeDB, fadeTime );
////}
////
};

////
////#endif /* !__GAME_TARGET_H__ */
