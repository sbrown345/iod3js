///*
//===========================================================================
//
//Doom 3 GPL Source Code
//Copyright (C) 1999-2011 id Software LLC, a ZeniMax Media company. 
//
//This file is part of the Doom 3 GPL Source Code (?Doom 3 Source Code?).  
//
//Doom 3 Source Code is free software: you can redistribute it and/or modify
//it under the terms of the GNU General Public License as published by
//the Free Software Foundation, either version 3 of the License, or
//(at your option) any later version.
//
//Doom 3 Source Code is distributed in the hope that it will be useful,
//but WITHOUT ANY WARRANTY; without even the implied warranty of
//MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//GNU General Public License for more details.
//
//You should have received a copy of the GNU General Public License
//along with Doom 3 Source Code.  If not, see <http://www.gnu.org/licenses/>.
//
//In addition, the Doom 3 Source Code is also subject to certain additional terms. You should have received a copy of these additional terms immediately following the terms and conditions of the GNU General Public License which accompanied the Doom 3 Source Code.  If not, please request a copy in writing from id Software at the address below.
//
//If you have questions concerning this license or the applicable additional terms, you may contact in writing id Software LLC, c/o ZeniMax Media Inc., Suite 120, Rockville, Maryland 20850 USA.
//
//===========================================================================
//*/
//
//#ifndef __GAME_MISC_H__
//#define __GAME_MISC_H__
//
//
///*
//===============================================================================
//
//idSpawnableEntity
//
//A simple, spawnable entity with a model and no functionable ability of it's own.
//For example, it can be used as a placeholder during development, for marking
//locations on maps for script, or for simple placed models without any behavior
//that can be bound to other entities.  Should not be subclassed.
//===============================================================================
//*/
//
class idSpawnableEntity extends idEntity {
//public:
	//CLASS_PROTOTYPE(idSpawnableEntity);
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idSpawnableEntity>[];

	Spawn():void{throw "placeholder";}

};

/*
===============================================================================

  Potential spawning position for players.
  The first time a player enters the game, they will be at an 'initial' spot.
  Targets will be fired when someone spawns in on them.

  When triggered, will cause player to be teleported to spawn spot.

===============================================================================
*/

class idPlayerStart extends idEntity {
//public:
//	CLASS_PROTOTYPE( idPlayerStart );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idPlayerStart>[];
//
//	enum {
//		EVENT_TELEPORTPLAYER = idEntity::EVENT_MAXEVENTS,
//		EVENT_MAXEVENTS
//	};
//
//						idPlayerStart( );
//
	Spawn():void{throw "placeholder";}
//
//	void				Save ( savefile: idSaveGame ): void { throw "placeholder"; }
//	void				Restore ( savefile: idRestoreGame ): void { throw "placeholder"; }
//
//	virtual bool		ClientReceiveEvent( int event, /*int*/time:number, const idBitMsg &msg );
//
//private:
//	int					teleportStage;
//
	Event_TeleportPlayer( activator:idEntity ): void { throw "placeholder"; }
	Event_TeleportStage( player:idEntity ): void { throw "placeholder"; }
	TeleportPlayer( player:idPlayer ): void { throw "placeholder"; }
};


/*
===============================================================================

  Non-displayed entity used to activate triggers when it touches them.
  Bind to a mover to have the mover activate a trigger as it moves.
  When target by triggers, activating the trigger will toggle the
  activator on and off. Check "start_off" to have it spawn disabled.
	
===============================================================================
*/

class idActivator extends idEntity {
//public:
//	CLASS_PROTOTYPE( idActivator );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idActivator>[];
//
Spawn():void{throw "placeholder";}
//
//	void				Save ( savefile: idSaveGame ): void { throw "placeholder"; }
//	void				Restore ( savefile: idRestoreGame ): void { throw "placeholder"; }
//
//	virtual void		Think( );
//
//private:
//	bool				stay_on;
//
	Event_Activate( activator:idEntity ):void { throw "placeholder"; }
};


/*
===============================================================================

  Path entities for monsters to follow.

===============================================================================
*/
class idPathCorner extends idEntity {
//public:
//	CLASS_PROTOTYPE( idPathCorner );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idPathCorner>[];
//
	//Spawn():void{throw "placeholder";}
//
//	static void			DrawDebugInfo( );
//
//	static idPathCorner *RandomPath( const idEntity *source, const idEntity *ignore );
//
//private:
	Event_RandomPath(): void { throw "placeholder"; }

	
/*
=====================
idPathCorner::Spawn
=====================
*/
	Spawn ( ): void {
	}

/////*
////=====================
////idPathCorner::DrawDebugInfo
////=====================
////*/
////void idPathCorner::DrawDebugInfo( ) {
////	var ent:idEntity
////	idBounds bnds( idVec3( -4.0, -4.0f, -8.0f ), idVec3( 4.0, 4.0f, 64.0f ) );
////
////	for( ent = gameLocal.spawnedEntities.Next(); ent != NULL; ent = ent.spawnNode.Next() ) {
////		if ( !ent.IsType( idPathCorner::Type ) ) {
////			continue;
////		}
////
////		idVec3 org = ent.GetPhysics().GetOrigin();
////		gameRenderWorld.DebugBounds( colorRed, bnds, org, 0 );
////	}
////}
////
/////*
////============
////idPathCorner::RandomPath
////============
////*/
////idPathCorner *idPathCorner::RandomPath( const idEntity *source, const idEntity *ignore ) {
////	int	i;
////	int	num;
////	int which;
////	var ent:idEntity
////	idPathCorner *path[ MAX_GENTITIES ];
////
////	num = 0;
////	for( i = 0; i < source.targets.Num(); i++ ) {
////		ent = source.targets[ i ].GetEntity();
////		if ( ent && ( ent != ignore ) && ent.IsType( idPathCorner::Type ) ) {
////			path[ num++ ] = static_cast<idPathCorner *>( ent );
////			if ( num >= MAX_GENTITIES ) {
////				break;
////			}
////		}
////	}
////
////	if ( !num ) {
////		return NULL;
////	}
////
////	which = gameLocal.random.RandomInt( num );
////	return path[ which ];
////}
////
/////*
////=====================
////idPathCorner::Event_RandomPath
////=====================
////*/
////void idPathCorner::Event_RandomPath( ) {
////	idPathCorner *path;
////
////	path = RandomPath( this, NULL );
////	idThread::ReturnEntity( path );
////}
};


/*
===============================================================================

  Object that fires targets and changes shader parms when damaged.

===============================================================================
*/

class idDamagable extends idEntity {
//public:
//	CLASS_PROTOTYPE( idDamagable );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idDamagable>[];
//
//						idDamagable( );
//
//	void				Save ( savefile: idSaveGame ): void { throw "placeholder"; }
//	void				Restore ( savefile: idRestoreGame ): void { throw "placeholder"; }
//
Spawn():void{throw "placeholder";}
//	void				Killed( idEntity *inflictor, idEntity *attacker, int damage, const idVec3 &dir, int location );
//
//private:
//	int					count;
//	int					nextTriggerTime;

	BecomeBroken( activator:idEntity ): void { throw "placeholder"; }
	Event_BecomeBroken( activator:idEntity ): void { throw "placeholder"; }
	Event_RestoreDamagable( ): void { throw "placeholder"; }
};


/*
===============================================================================

  Hidden object that explodes when activated

===============================================================================
*/

class idExplodable extends idEntity {
//public:
//	CLASS_PROTOTYPE( idExplodable );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idExplodable>[];
//
Spawn():void{throw "placeholder";}
//
//private:
	Event_Explode( activator:idEntity ): void { throw "placeholder"; }
};


/*
===============================================================================

  idSpring

===============================================================================
*/

class idSpring extends idEntity {
//public:
//	CLASS_PROTOTYPE( idSpring );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idSpring>[];
//
Spawn():void{throw "placeholder";}
//
//	virtual void		Think( );
//
//private:
//	idEntity *			ent1;
//	idEntity *			ent2;
//	int					id1;
//	int					id2;
//	idVec3				p1;
//	idVec3				p2;
//	idForce_Spring		spring;
//
	Event_LinkSpring( ): void { throw "placeholder"; }
};


/*
===============================================================================

  idForceField

===============================================================================
*/

class idForceField extends idEntity {
//public:
//	CLASS_PROTOTYPE( idForceField );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idForceField>[];
//
//	void				Save ( savefile: idSaveGame ): void { throw "placeholder"; }
//	void				Restore ( savefile: idRestoreGame ): void { throw "placeholder"; }
//
Spawn():void{throw "placeholder";}
//
//	virtual void		Think( );
//
//private:
//	idForce_Field		forceField;
//
//	void				Toggle( );
//
	Event_Activate( activator:idEntity ): void { throw "placeholder"; }
	Event_Toggle( ): void { throw "placeholder"; }
	Event_FindTargets( ): void { throw "placeholder"; }
};


/*
===============================================================================

  idAnimated

===============================================================================
*/

class idAnimated extends idAFEntity_Gibbable {
//public:
//	CLASS_PROTOTYPE( idAnimated );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idAnimated>[];
//
//							idAnimated();
//							~idAnimated();
//
//Save ( savefile: idSaveGame ): void { throw "placeholder"; }
//	void					Restore ( savefile: idRestoreGame ): void { throw "placeholder"; }
//
//	void					Spawn( );
//	virtual bool			LoadAF( );
//	bool					StartRagdoll( );
//	virtual bool			GetPhysicsToSoundTransform( idVec3 &origin, idMat3 &axis );
//
//private:
//	int						num_anims;
//	int						current_anim_index;
//	int						anim;
//	int						blendFrames;
//	jointHandle_t			soundJoint;
//	idEntityPtr<idEntity>	activator;
//	bool					activated;
//
//	void					PlayNextAnim( );
//
	Event_Activate( activator:idEntity ): void { throw "placeholder"; }	
	Event_Start( ): void { throw "placeholder"; }
	Event_StartRagdoll( ): void { throw "placeholder"; }
	Event_AnimDone( /*int */animIndex :number): void { throw "placeholder"; }
	Event_Footstep( ): void { throw "placeholder"; }
	Event_LaunchMissiles( projectilename:string, sound:string, launchjoint:string, targetjoint:string, /*int */numshots:number, /*int */framedelay :number): void { throw "placeholder"; }
	Event_LaunchMissilesUpdate( /*int*/ launchjoint:number, /*int */targetjoint:number, /*int */numshots:number, /*int */framedelay :number): void { throw "placeholder"; }
};


/*
===============================================================================

  idStaticEntity

===============================================================================
*/

class idStaticEntity extends idEntity {
//public:
//	CLASS_PROTOTYPE( idStaticEntity );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idStaticEntity>[];
//
//						idStaticEntity( );
//
//	void				Save ( savefile: idSaveGame ): void { throw "placeholder"; }
//	void				Restore ( savefile: idRestoreGame ): void { throw "placeholder"; }
//
//Spawn():void{throw "placeholder";}
//	void				ShowEditingDialog( );
//	virtual void		Hide( );
//	virtual void		Show( );
//	void				Fade( const idVec4 &to, float fadeTime );
//	virtual void		Think( );
//
//	virtual void		WriteToSnapshot( idBitMsgDelta &msg ) const;
//	virtual void		ReadFromSnapshot( const idBitMsgDelta &msg );
//
//private:
	//Event_Activate(activator: idEntity): void { throw "placeholder"; }
	
	spawnTime :number/*int*/;
	active:boolean;
	fadeFrom = new idVec4;
	fadeTo = new idVec4;
	fadeStart :number/*int*/;
	fadeEnd :number/*int*/;
	runGui:boolean;


	
////END_CLASS

/*
===============
idStaticEntity::idStaticEntity
===============
*/
	constructor ( ) {
		super ( );
		this.spawnTime = 0;
		this.active = false;
		this.fadeFrom.Set( 1, 1, 1, 1 );
		this.fadeTo.Set( 1, 1, 1, 1 );
		this.fadeStart = 0;
		this.fadeEnd = 0;
		this.runGui = false;
	}

/////*
////===============
////idStaticEntity::Save
////===============
////*/
////void idStaticEntity::Save( idSaveGame *savefile ) const {
////	savefile.WriteInt( this.spawnTime );
////	savefile.WriteBool( this.active );
////	savefile.WriteVec4( this.fadeFrom );
////	savefile.WriteVec4( fadeTo );
////	savefile.WriteInt( this.fadeStart );
////	savefile.WriteInt( this.fadeEnd );
////	savefile.WriteBool( this.runGui );
////}
////
/////*
////===============
////idStaticEntity::Restore
////===============
////*/
////void idStaticEntity::Restore( idRestoreGame *savefile ) {
////	savefile.ReadInt( this.spawnTime );
////	savefile.ReadBool( this.active );
////	savefile.ReadVec4( this.fadeFrom );
////	savefile.ReadVec4( fadeTo );
////	savefile.ReadInt( this.fadeStart );
////	savefile.ReadInt( this.fadeEnd );
////	savefile.ReadBool( this.runGui );
////}

/*
===============
idStaticEntity::Spawn
===============
*/
Spawn( ):void {
	var solid: boolean;
	var hidden:boolean;

	// an inline static model will not do anything at all
	if (this.spawnArgs.GetBool( "inline" ) || gameLocal.world.spawnArgs.GetBool( "inlineAllStatics" ) ) {
		this.Hide();
		return;
	}

	solid = this. spawnArgs.GetBool( "solid" );
	hidden = this.spawnArgs.GetBool( "hide" );

	if ( solid && !hidden ) {
		this.GetPhysics().SetContents( contentsFlags_t.CONTENTS_SOLID );
	} else {
		this.GetPhysics().SetContents( 0 );
	}

	this.spawnTime = gameLocal.time;
	this.active = false;

	var model = new idStr( this.spawnArgs.GetString( "model" ) );
	if ( model.Find( ".prt" ) >= 0 ) {
		// we want the parametric particles out of sync with each other
		this.renderEntity.shaderParms[SHADERPARM_TIMEOFFSET] = gameLocal.random.RandomInt_max( 32767 );
	}

	this.fadeFrom.Set( 1, 1, 1, 1 );
	this.fadeTo.Set( 1, 1, 1, 1 );
	this.fadeStart = 0;
	this.fadeEnd	= 0;

	// NOTE: this should be used very rarely because it is expensive
	this.runGui = this.spawnArgs.GetBool( "runGui" );
	if ( this.runGui ) {
		this.BecomeActive( TH_THINK );
	}
}

/////*
////================
////idStaticEntity::ShowEditingDialog
////================
////*/
////void idStaticEntity::ShowEditingDialog( ) {
////	common.InitTool( EDITOR_PARTICLE, &this.spawnArgs );
////}
/////*
////================
////idStaticEntity::Think
////================
////*/
////void idStaticEntity::Think( ) {
////	idEntity::Think();
////	if ( thinkFlags & TH_THINK ) {
////		if ( this.runGui && this.renderEntity.gui[0] ) {
////			idPlayer *player = gameLocal.GetLocalPlayer();
////			if ( player ) {
////				if ( !player.objectiveSystemOpen ) {
////					this.renderEntity.gui[0].StateChanged( gameLocal.time, true );
////					if ( this.renderEntity.gui[1] ) {
////						this.renderEntity.gui[1].StateChanged( gameLocal.time, true );
////					}
////					if ( this.renderEntity.gui[2] ) {
////						this.renderEntity.gui[2].StateChanged( gameLocal.time, true );
////					}
////				}
////			}
////		}
////		if ( this.fadeEnd > 0 ) {
////			idVec4 color;
////			if ( gameLocal.time < this.fadeEnd ) {
////				color.Lerp( this.fadeFrom, fadeTo, ( float )( gameLocal.time - this.fadeStart ) / ( float )( this.fadeEnd - this.fadeStart ) );
////			} else {
////				color = fadeTo;
////				this.fadeEnd = 0;
////				BecomeInactive( TH_THINK );
////			}
////			SetColor( color );
////		}
////	}
////}
////
/////*
////================
////idStaticEntity::Fade
////================
////*/
////void idStaticEntity::Fade( const idVec4 &to, float fadeTime ) {
////	GetColor( this.fadeFrom );
////	fadeTo = to;
////	this.fadeStart = gameLocal.time;
////	this.fadeEnd = gameLocal.time + SEC2MS( fadeTime );
////	this.BecomeActive( TH_THINK );
////}
////
/*
================
idStaticEntity::Hide
================
*/
	Hide ( ): void {
		super.Hide ( );
		this.GetPhysics ( ).SetContents( 0 );
	}

/////*
////================
////idStaticEntity::Show
////================
////*/
////void idStaticEntity::Show( ) {
////	idEntity::Show();
////	if ( this.spawnArgs.GetBool( "solid" ) ) {
////		this.GetPhysics().SetContents( CONTENTS_SOLID );
////	}
////}
////
/*
================
idStaticEntity::Event_Activate
================
*/
Event_Activate( activator:idEntity ):void  {
	todoThrow();
	//idStr activateGui;

	//this.spawnTime = gameLocal.time;
	//this.active = !this.active;

	//const idKeyValue *kv = this.spawnArgs.FindKey( "hide" );
	//if ( kv ) {
	//	if ( IsHidden() ) {
	//		Show();
	//	} else {
	//		Hide();
	//	}
	//}

	//this.renderEntity.shaderParms[ SHADERPARM_TIMEOFFSET ] = -MS2SEC( this.spawnTime );
	//this.renderEntity.shaderParms[5] = this.active;
	//// this change should be a good thing, it will automatically turn on 
	//// lights etc.. when triggered so that does not have to be specifically done
	//// with trigger parms.. it MIGHT break things so need to keep an eye on it
	//this.renderEntity.shaderParms[ SHADERPARM_MODE ] = ( this.renderEntity.shaderParms[ SHADERPARM_MODE ] ) ?  0.0f : 1.0f;
	//this.BecomeActive( TH_UPDATEVISUALS );
}

/////*
////================
////idStaticEntity::WriteToSnapshot
////================
////*/
////void idStaticEntity::WriteToSnapshot( idBitMsgDelta &msg ) const {
////	this.GetPhysics().WriteToSnapshot( msg );
////	WriteBindToSnapshot( msg );
////	WriteColorToSnapshot( msg );
////	WriteGUIToSnapshot( msg );
////	msg.WriteBits( IsHidden()?1:0, 1 );
////}
////
/////*
////================
////idStaticEntity::ReadFromSnapshot
////================
////*/
////void idStaticEntity::ReadFromSnapshot( const idBitMsgDelta &msg ) {
////	bool hidden;
////
////	this.GetPhysics().ReadFromSnapshot( msg );
////	ReadBindFromSnapshot( msg );
////	ReadColorFromSnapshot( msg );
////	ReadGUIFromSnapshot( msg );
////	hidden = msg.ReadBits( 1 ) == 1;
////	if ( hidden != IsHidden() ) {
////		if ( hidden ) {
////			Hide();
////		} else {
////			Show();
////		}
////	}
////	if ( msg.HasChanged() ) {
////		UpdateVisuals();
////	}
////}
////
////
};


/*
===============================================================================

idFuncEmitter

===============================================================================
*/

class idFuncEmitter extends idStaticEntity {
//public:
//	CLASS_PROTOTYPE( idFuncEmitter );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idFuncEmitter>[];
//
//						idFuncEmitter( );
//
//	void				Save ( savefile: idSaveGame ): void { throw "placeholder"; }
//	void				Restore ( savefile: idRestoreGame ): void { throw "placeholder"; }
//
Spawn():void{throw "placeholder";}
	Event_Activate(activator: idEntity): void { throw "placeholder"; }
//
//	virtual void		WriteToSnapshot( idBitMsgDelta &msg ) const;
//	virtual void		ReadFromSnapshot( const idBitMsgDelta &msg );
//
//private:
//	bool				hidden;
//
};


/*
===============================================================================

idFuncSmoke

===============================================================================
*/

class idFuncSmoke extends idEntity {
//public:
//	CLASS_PROTOTYPE( idFuncSmoke );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idFuncSmoke>[];
//
//							idFuncSmoke();
//
//	void					Spawn( );
//
//Save ( savefile: idSaveGame ): void { throw "placeholder"; }
//	void					Restore ( savefile: idRestoreGame ): void { throw "placeholder"; }
//
//	virtual void			Think( );
	Event_Activate( activator:idEntity ): void { throw "placeholder"; }
//
//private:
//	int						smokeTime;
//	const idDeclParticle *	smoke;
//	bool					restart;
};


/*
===============================================================================

idFuncSplat

===============================================================================
*/

class idFuncSplat extends idFuncEmitter {
//public:
//	CLASS_PROTOTYPE( idFuncSplat );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idFuncSplat>[];
//
//	idFuncSplat( );
//
Spawn():void{throw "placeholder";}
//
//private:
	Event_Activate( activator:idEntity ): void { throw "placeholder"; }
	Event_Splat(): void { throw "placeholder"; }
};


/*
===============================================================================

idTextEntity

===============================================================================
*/

class idTextEntity extends idEntity {
//public:
//	CLASS_PROTOTYPE( idTextEntity );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idTextEntity>[];
//
Spawn():void{throw "placeholder";}
//
//	void				Save ( savefile: idSaveGame ): void { throw "placeholder"; }
//	void				Restore ( savefile: idRestoreGame ): void { throw "placeholder"; }
//
//	virtual void		Think( );
//
//private:
//	idStr				text;
//	bool				playerOriented;
};


/*
===============================================================================

idLocationEntity

===============================================================================
*/

class idLocationEntity extends idEntity {
//public:
//	CLASS_PROTOTYPE( idLocationEntity );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idLocationEntity>[];
//
Spawn():void{throw "placeholder";}
//
//	const char *		GetLocation( ) const;
//
//private:
};
//
class idLocationSeparatorEntity extends idEntity {
//public:
//	CLASS_PROTOTYPE( idLocationSeparatorEntity );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idLocationSeparatorEntity>[];
//
Spawn():void{throw "placeholder";}
//
//private:
};

class idVacuumSeparatorEntity extends idEntity {
//public:
//	CLASS_PROTOTYPE( idVacuumSeparatorEntity );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idVacuumSeparatorEntity>[];
//
//						idVacuumSeparatorEntity( );
//
Spawn():void{throw "placeholder";}
//
//	void				Save ( savefile: idSaveGame ): void { throw "placeholder"; }
//	void				Restore ( savefile: idRestoreGame ): void { throw "placeholder"; }
//
	Event_Activate(activator: idEntity): void { throw "placeholder"; }
//
//private:
//	qhandle_t			portal;
};

class idVacuumEntity extends idEntity {
//public:
//	CLASS_PROTOTYPE( idVacuumEntity );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idVacuumEntity>[];
//
Spawn():void{throw "placeholder";}
//
//private:
};


/*
===============================================================================

  idBeam

===============================================================================
*/

class idBeam extends idEntity {
//public:
//	CLASS_PROTOTYPE( idBeam );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idBeam>[];
//
//						idBeam();
//
Spawn():void{throw "placeholder";}
//
//	void				Save ( savefile: idSaveGame ): void { throw "placeholder"; }
//	void				Restore ( savefile: idRestoreGame ): void { throw "placeholder"; }
//
//	virtual void		Think( );
//
//	void				SetMaster( idBeam *masterbeam );
//	void				SetBeamTarget( const idVec3 &origin );
//
//	virtual void		Show( );
//
//	virtual void		WriteToSnapshot( idBitMsgDelta &msg ) const;
//	virtual void		ReadFromSnapshot( const idBitMsgDelta &msg );
//
//private:
	Event_MatchTarget( ): void { throw "placeholder"; }
	Event_Activate( activator:idEntity ): void { throw "placeholder"; }
//
//	idEntityPtr<idBeam>	target;
//	idEntityPtr<idBeam>	master;
};


/*
===============================================================================

  idLiquid

===============================================================================
*/

//class idRenderModelLiquid;
//
class idLiquid extends idEntity {
//public:
//	CLASS_PROTOTYPE( idLiquid );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idLiquid>[];
//
Spawn():void{throw "placeholder";}
//
//	void				Save ( savefile: idSaveGame ): void { throw "placeholder"; }
//	void				Restore ( savefile: idRestoreGame ): void { throw "placeholder"; }
//
//private:
	Event_Touch( other:idEntity, trace:trace_t ): void { throw "placeholder"; }
//
//
//	idRenderModelLiquid *model;
};


/*
===============================================================================

  idShaking

===============================================================================
*/

class idShaking extends idEntity {
//public:
//	CLASS_PROTOTYPE( idShaking );
//
//							idShaking();
//
//	void					Spawn( );
//
//Save ( savefile: idSaveGame ): void { throw "placeholder"; }
//	void					Restore ( savefile: idRestoreGame ): void { throw "placeholder"; }
//
//private:
//	idPhysics_Parametric	physicsObj;
//	bool					active;
//
//	void					BeginShaking( ): void { throw "placeholder"; }
	Event_Activate( activator:idEntity ): void { throw "placeholder"; }
};


/*
===============================================================================

  idEarthQuake

===============================================================================
*/

class idEarthQuake extends idEntity {
//public:
//	CLASS_PROTOTYPE( idEarthQuake );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idEarthQuake>[];
//			
//						idEarthQuake();
//
Spawn():void{throw "placeholder";}
//
//	void				Save ( savefile: idSaveGame ): void { throw "placeholder"; }
//	void				Restore ( savefile: idRestoreGame ): void { throw "placeholder"; }
//
//	virtual void		Think( );
//
//private:
//	int					nextTriggerTime;
//	int					shakeStopTime;
//	float				wait;
//	float				random;
//	bool				triggered;
//	bool				playerOriented;
//	bool				disabled;
//	float				shakeTime;
//
	Event_Activate( activator:idEntity ): void { throw "placeholder"; }
};


/*
===============================================================================

  idFuncPortal

===============================================================================
*/

class idFuncPortal extends idEntity {
//public:
//	CLASS_PROTOTYPE( idFuncPortal );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idFuncPortal>[];
//			
//						idFuncPortal();
//
Spawn():void{throw "placeholder";}
//
//	void				Save ( savefile: idSaveGame ): void { throw "placeholder"; }
//	void				Restore ( savefile: idRestoreGame ): void { throw "placeholder"; }
//
//private:
//	qhandle_t			portal;
//	bool				state;
//
	Event_Activate( activator:idEntity ): void { throw "placeholder"; }
};

/*
===============================================================================

  idFuncAASPortal

===============================================================================
*/

class idFuncAASPortal extends idEntity {
//public:
//	CLASS_PROTOTYPE( idFuncAASPortal );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idFuncAASPortal>[];
//			
//						idFuncAASPortal();
//
Spawn():void{throw "placeholder";}
//
//	void				Save ( savefile: idSaveGame ): void { throw "placeholder"; }
//	void				Restore ( savefile: idRestoreGame ): void { throw "placeholder"; }
//
//private:
//	bool				state;
//
	Event_Activate( activator:idEntity ): void { throw "placeholder"; }
};

/*
===============================================================================

  idFuncAASObstacle

===============================================================================
*/

class idFuncAASObstacle extends idEntity {
//public:
//	CLASS_PROTOTYPE( idFuncAASObstacle );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idFuncAASObstacle>[];
//			
//						idFuncAASObstacle();
//
Spawn():void{throw "placeholder";}
//
//	void				Save ( savefile: idSaveGame ): void { throw "placeholder"; }
//	void				Restore ( savefile: idRestoreGame ): void { throw "placeholder"; }
//
//private:
//	bool				state;
//
	Event_Activate( activator:idEntity ): void { throw "placeholder"; }
};


/*
===============================================================================

idFuncRadioChatter

===============================================================================
*/

class idFuncRadioChatter extends idEntity {
//public:
//	CLASS_PROTOTYPE( idFuncRadioChatter );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idFuncRadioChatter>[];
//
//						idFuncRadioChatter();
//
Spawn():void{throw "placeholder";}
//
//	void				Save ( savefile: idSaveGame ): void { throw "placeholder"; }
//	void				Restore ( savefile: idRestoreGame ): void { throw "placeholder"; }
//
//private:
//	float				time;
	Event_Activate( activator:idEntity ): void { throw "placeholder"; }
	Event_ResetRadioHud( activator:idEntity ): void { throw "placeholder"; }
};


/*
===============================================================================

  idPhantomObjects

===============================================================================
*/

class idPhantomObjects extends idEntity {
//public:
//	CLASS_PROTOTYPE( idPhantomObjects );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idPhantomObjects>[];
//			
//						idPhantomObjects();
//
Spawn():void{throw "placeholder";}
//
//	void				Save ( savefile: idSaveGame ): void { throw "placeholder"; }
//	void				Restore ( savefile: idRestoreGame ): void { throw "placeholder"; }
//
//	virtual void		Think( );
//
//private:
	Event_Activate( activator:idEntity ): void { throw "placeholder"; }
	Event_Throw( ): void { throw "placeholder"; }
	Event_ShakeObject(object: idEntity, /*int */starttime:number ): void { throw "placeholder"; }
//
//	int					end_time;
//	float				throw_time;
//	float				shake_time;
//	idVec3				shake_ang;
//	float				speed;
//	int					min_wait;
//	int					max_wait;
//	idEntityPtr<idActor>target;
//	idList<int>			targetTime;
//	idList<idVec3>		lastTargetPos;
};
//
//#endif /* !__GAME_MISC_H__ */
