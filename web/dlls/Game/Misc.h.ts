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

	
/////*
////======================
////idSpawnableEntity::Spawn
////======================
////*/
////void idSpawnableEntity::Spawn() {
////	// this just holds dict information
////}
////

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
//
//	void				Save ( savefile: idSaveGame ): void { throw "placeholder"; }
//	void				Restore ( savefile: idRestoreGame ): void { throw "placeholder"; }
//
//	virtual bool		ClientReceiveEvent( int event, /*int*/time:number, const idBitMsg &msg );
//
//private:
	teleportStage :number/*int*/;

	Event_TeleportPlayer( activator:idEntity ): void { throw "placeholder"; }
	Event_TeleportStage( player:idEntity ): void { throw "placeholder"; }
	TeleportPlayer(player: idPlayer): void { throw "placeholder"; }

	
/*
===============
idPlayerStart::idPlayerStart
================
*/
	constructor() {
		super ( );
		this.teleportStage = 0;
	}

/*
===============
idPlayerStart::Spawn
================
*/
	Spawn ( ): void {
		this.teleportStage = 0;
	}

/////*
////================
////idPlayerStart::Save
////================
////*/
////void idPlayerStart::Save( idSaveGame *savefile ) const {
////	savefile.WriteInt( this.teleportStage );
////}
////
/////*
////================
////idPlayerStart::Restore
////================
////*/
////void idPlayerStart::Restore( idRestoreGame *savefile ) {
////	savefile.ReadInt( this.teleportStage );
////}
////
/////*
////================
////idPlayerStart::ClientReceiveEvent
////================
////*/
////bool idPlayerStart::ClientReceiveEvent( int event, /*int*/time:number, const idBitMsg &msg ) {
////	int entityNumber;
////
////	switch( event ) {
////		case EVENT_TELEPORTPLAYER: {
////			entityNumber = msg.ReadBits( GENTITYNUM_BITS );
////			idPlayer *player = static_cast<idPlayer *>( gameLocal.entities[entityNumber] );
////			if ( player != NULL && player.IsType( idPlayer::Type ) ) {
////				Event_TeleportPlayer( player );
////			}
////			return true;
////		}
////		default: {
////			return idEntity::ClientReceiveEvent( event, time, msg );
////		}
////	}
////	return false;
////}
////
/////*
////===============
////idPlayerStart::Event_TeleportStage
////
////FIXME: add functionality to fx system ( could be done with player scripting too )
////================
////*/
////void idPlayerStart::Event_TeleportStage( idEntity *_player ) {
////	idPlayer *player;
////	if ( !_player.IsType( idPlayer::Type ) ) {
////		common.Warning( "idPlayerStart::Event_TeleportStage: entity is not an idPlayer\n" );
////		return;
////	}
////	player = static_cast<idPlayer*>(_player);
////	float teleportDelay = this.spawnArgs.GetFloat( "teleportDelay" );
////	switch ( this.teleportStage ) {
////		case 0:
////			player.playerView.Flash( colorWhite, 125 );
////			player.SetInfluenceLevel( INFLUENCE_LEVEL3 );
////			player.SetInfluenceView( this.spawnArgs.GetString( "mtr_teleportFx" ), NULL, 0.0f, NULL );
////			gameSoundWorld.FadeSoundClasses( 0, -20.0f, teleportDelay );
////			player.StartSound( "snd_teleport_start", SND_CHANNEL_BODY2, 0, false, NULL );
////			this.teleportStage++;
////			this.PostEventSec( &EV_TeleportStage, teleportDelay, player );
////			break;
////		case 1:
////			gameSoundWorld.FadeSoundClasses( 0, 0.0f, 0.25f );
////			this.teleportStage++;
////			this.PostEventSec( &EV_TeleportStage, 0.25f, player );
////			break;
////		case 2:
////			player.SetInfluenceView( NULL, NULL, 0.0f, NULL );
////			TeleportPlayer( player );
////			player.StopSound( SND_CHANNEL_BODY2, false );
////			player.SetInfluenceLevel( INFLUENCE_NONE );
////			this.teleportStage = 0;
////			break;
////		default:
////			break;
////	}
////}
////
/////*
////===============
////idPlayerStart::TeleportPlayer
////================
////*/
////void idPlayerStart::TeleportPlayer( idPlayer *player ) {
////	float pushVel = this.spawnArgs.GetFloat( "push", "300" );
////	float f = this.spawnArgs.GetFloat( "visualEffect", "0" );
////	const char *viewName = this.spawnArgs.GetString( "visualView", "" );
////	var ent:idEntity = viewName ? gameLocal.FindEntity( viewName ) : NULL;
////
////	if ( f && ent ) {
////		// place in private camera view for some time
////		// the entity needs to teleport to where the camera view is to have the PVS right
////		player.Teleport( ent.GetPhysics().GetOrigin(), ang_zero, this );
////		player.StartSound( "snd_teleport_enter", SND_CHANNEL_ANY, 0, false, NULL );
////		player.SetPrivateCameraView( static_cast<idCamera*>(ent) );
////		// the player entity knows where to spawn from the previous Teleport call
////		if ( !gameLocal.isClient ) {
////			player.PostEventSec( &EV_Player_ExitTeleporter, f );
////		}
////	} else {
////		// direct to exit, Teleport will take care of the killbox
////		player.Teleport( this.GetPhysics().GetOrigin(), this.GetPhysics().GetAxis().ToAngles(), NULL );
////
////		// multiplayer hijacked this entity, so only push the player in multiplayer
////		if ( gameLocal.isMultiplayer ) {
////			player.GetPhysics().SetLinearVelocity( this.GetPhysics().GetAxis()[0] * pushVel );
////		}
////	}
////}
////
/////*
////===============
////idPlayerStart::Event_TeleportPlayer
////================
////*/
////void idPlayerStart::Event_TeleportPlayer( activator:idEntity ) {
////	idPlayer *player;
////
////	if ( activator.IsType( idPlayer::Type ) ) {
////		player = static_cast<idPlayer*>( activator );
////	} else {
////		player = gameLocal.GetLocalPlayer();
////	}
////	if ( player ) {
////		if ( this.spawnArgs.GetBool( "visualFx" ) ) {
////
////			this.teleportStage = 0;
////			Event_TeleportStage( player );
////
////		} else {
////
////			if ( gameLocal.isServer ) {
////				idBitMsg	msg;
////				byte		msgBuf[MAX_EVENT_PARAM_SIZE];
////
////				msg.Init( msgBuf, sizeof( msgBuf ) );
////				msg.BeginWriting();
////				msg.WriteBits( player.entityNumber, GENTITYNUM_BITS );
////				ServerSendEvent( EVENT_TELEPORTPLAYER, &msg, false, -1 );
////			}
////
////			TeleportPlayer( player );
////		}
////	}
////}
////
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
//
//	void				Save ( savefile: idSaveGame ): void { throw "placeholder"; }
//	void				Restore ( savefile: idRestoreGame ): void { throw "placeholder"; }
//
//	virtual void		Think( );
//
//private:
	stay_on:boolean;
//
	Event_Activate(activator: idEntity): void { throw "placeholder"; }

	
/////*
////===============
////idActivator::Save
////================
////*/
////void idActivator::Save( idSaveGame *savefile ) const {
////	savefile.WriteBool( stay_on );
////}
////
/////*
////===============
////idActivator::Restore
////================
////*/
////void idActivator::Restore( idRestoreGame *savefile ) {
////	savefile.ReadBool( stay_on );
////
////	if ( stay_on ) {
////		BecomeActive( TH_THINK );
////	}
////}

/*
===============
idActivator::Spawn
================
*/
	Spawn ( ): void {
		var start_off = new R<boolean> ( );

		var $stay_on = new R( this.stay_on );
		this.spawnArgs.GetBool_R("stay_on", "0", $stay_on);
		this.stay_on = $stay_on.$;
		this.spawnArgs.GetBool_R( "start_off", "0", start_off );

		this.GetPhysics ( ).SetClipBox( new idBounds( vec3_origin ).Expand( 4 ), 1.0 );
		this.GetPhysics ( ).SetContents( 0 );

		if ( !start_off.$ ) {
			this.BecomeActive( TH_THINK );
		}
	}
////
/////*
////===============
////idActivator::Think
////================
////*/
////void idActivator::Think( ) {
////	RunPhysics();
////	if ( thinkFlags & TH_THINK ) {
////		if ( TouchTriggers() ) {
////			if ( !stay_on ) {
////				BecomeInactive( TH_THINK );
////			}
////		}
////	}
////	Present();
////}
////
/////*
////===============
////idActivator::Activate
////================
////*/
////void idActivator::Event_Activate( activator:idEntity ) {
////	if ( thinkFlags & TH_THINK ) {
////		BecomeInactive( TH_THINK );
////	} else {
////		this.BecomeActive( TH_THINK );
////	}
////}
////
////
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
	Event_RestoreDamagable(): void { throw "placeholder"; }

	
/////*
////================
////idDamagable::idDamagable
////================
////*/
////idDamagable::idDamagable( ) {
////	count = 0;
////	nextTriggerTime = 0;
////}
////
/////*
////================
////idDamagable::Save
////================
////*/
////void idDamagable::Save( idSaveGame *savefile ) const {
////	savefile.WriteInt( count );
////	savefile.WriteInt( nextTriggerTime );
////}
////
/////*
////================
////idDamagable::Restore
////================
////*/
////void idDamagable::Restore( idRestoreGame *savefile ) {
////	savefile.ReadInt( count );
////	savefile.ReadInt( nextTriggerTime );
////}
////
/////*
////================
////idDamagable::Spawn
////================
////*/
////void idDamagable::Spawn( ) {
////	idStr broken;
////
////	health = this.spawnArgs.GetInt( "health", "5" );
////	this.spawnArgs.GetInt( "count", "1", count );	
////	nextTriggerTime = 0;
////	
////	// make sure the model gets cached
////	this.spawnArgs.GetString( "broken", "", broken );
////	if ( broken.Length() && !renderModelManager.CheckModel( broken ) ) {
////		gameLocal.Error( "idDamagable '%s' at (%s): cannot load broken model '%s'", this.name.c_str(), this.GetPhysics().GetOrigin().ToString(0), broken.c_str() );
////	}
////
////	this.fl.takedamage = true;
////	GetPhysics().SetContents( CONTENTS_SOLID );
////}
////
/////*
////================
////idDamagable::BecomeBroken
////================
////*/
////void idDamagable::BecomeBroken( activator:idEntity ) {
////	float	forceState;
////	int		numStates;
////	int		cycle;
////	float	wait;
////	
////	if ( gameLocal.time < nextTriggerTime ) {
////		return;
////	}
////
////	this.spawnArgs.GetFloat( "wait", "0.1", wait );
////	nextTriggerTime = gameLocal.time + SEC2MS( wait );
////	if ( count > 0 ) {
////		count--;
////		if ( !count ) {
////			this.fl.takedamage = false;
////		} else {
////			health = this.spawnArgs.GetInt( "health", "5" );
////		}
////	}
////
////	idStr	broken;
////
////	this.spawnArgs.GetString( "broken", "", broken );
////	if ( broken.Length() ) {
////		SetModel( broken );
////	}
////
////	// offset the start time of the shader to sync it to the gameLocal time
////	renderEntity.shaderParms[ SHADERPARM_TIMEOFFSET ] = -MS2SEC( gameLocal.time );
////
////	this.spawnArgs.GetInt( "numstates", "1", numStates );
////	this.spawnArgs.GetInt( "cycle", "0", cycle );
////	this.spawnArgs.GetFloat( "forcestate", "0", forceState );
////
////	// set the state parm
////	if ( cycle ) {
////		renderEntity.shaderParms[ SHADERPARM_MODE ]++;
////		if ( renderEntity.shaderParms[ SHADERPARM_MODE ] > numStates ) {
////			renderEntity.shaderParms[ SHADERPARM_MODE ] = 0;
////		}
////	} else if ( forceState ) {
////		renderEntity.shaderParms[ SHADERPARM_MODE ] = forceState;
////	} else {
////		renderEntity.shaderParms[ SHADERPARM_MODE ] = gameLocal.random.RandomInt( numStates ) + 1;
////	}
////
////	renderEntity.shaderParms[ SHADERPARM_TIMEOFFSET ] = -MS2SEC( gameLocal.time );
////
////	ActivateTargets( activator );
////
////	if ( this.spawnArgs.GetBool( "hideWhenBroken" ) ) {
////		this.Hide();
////		PostEventMS( &EV_RestoreDamagable, nextTriggerTime - gameLocal.time );
////		this.BecomeActive( TH_THINK );
////	}
////}
////
/////*
////================
////idDamagable::Killed
////================
////*/
////void idDamagable::Killed( idEntity *inflictor, idEntity *attacker, int damage, const idVec3 &dir, int location ) {
////	if ( gameLocal.time < nextTriggerTime ) {
////		health += damage;
////		return;
////	}
////
////	BecomeBroken( attacker );
////}
////
/////*
////================
////idDamagable::Event_BecomeBroken
////================
////*/
////void idDamagable::Event_BecomeBroken( activator:idEntity ) {
////	BecomeBroken( activator );
////}
////
/////*
////================
////idDamagable::Event_RestoreDamagable
////================
////*/
////void idDamagable::Event_RestoreDamagable( ) {
////	health = this.spawnArgs.GetInt( "health", "5" );
////	Show();
////}
////
////
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
//
//private:
	Event_Explode(activator: idEntity): void { throw "placeholder"; }


/*
================
idExplodable::Spawn
================
*/
	Spawn ( ): void {
		this.Hide ( );
	}

/////*
////================
////idExplodable::Event_Explode
////================
////*/
////void idExplodable::Event_Explode( activator:idEntity ) {
////	const char *temp;
////
////	if ( this.spawnArgs.GetString( "def_damage", "damage_explosion", &temp ) ) {
////		gameLocal.RadiusDamage( this.GetPhysics().GetOrigin(), activator, activator, this, this, temp );
////	}
////
////	StartSound( "snd_explode", SND_CHANNEL_ANY, 0, false, NULL );
////
////	// Show() calls UpdateVisuals, so we don't need to call it ourselves after setting the shaderParms
////	renderEntity.shaderParms[SHADERPARM_RED]		= 1.0f;
////	renderEntity.shaderParms[SHADERPARM_GREEN]		= 1.0f;
////	renderEntity.shaderParms[SHADERPARM_BLUE]		= 1.0f;
////	renderEntity.shaderParms[SHADERPARM_ALPHA]		= 1.0f;
////	renderEntity.shaderParms[SHADERPARM_TIMEOFFSET] = -MS2SEC( gameLocal.time );
////	renderEntity.shaderParms[SHADERPARM_DIVERSITY]	= 0.0f;
////	Show();
////
////	PostEventMS( &EV_Remove, 2000 );
////
////	ActivateTargets( activator );
////}
////
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
	Event_LinkSpring ( ): void { throw "placeholder"; }


/////*
////================
////idSpring::Think
////================
////*/
////void idSpring::Think( ) {
////	idVec3 start, end, origin;
////	idMat3 axis;
////
////	// run physics
////	RunPhysics();
////
////	if ( thinkFlags & TH_THINK ) {
////		// evaluate force
////		spring.Evaluate( gameLocal.time );
////
////		start = p1;
////		if ( ent1.GetPhysics() ) {
////			axis = ent1.GetPhysics().GetAxis();
////			origin = ent1.GetPhysics().GetOrigin();
////			start = origin + start * axis;
////		}
////
////		end = p2;
////		if ( ent2.GetPhysics() ) {
////			axis = ent2.GetPhysics().GetAxis();
////			origin = ent2.GetPhysics().GetOrigin();
////			end = origin + p2 * axis;
////		}
////		
////		gameRenderWorld.DebugLine( idVec4(1, 1, 0, 1), start, end, 0, true );
////	}
////
////	Present();
////}
////
/////*
////================
////idSpring::Event_LinkSpring
////================
////*/
////void idSpring::Event_LinkSpring( ) {
////	idStr name1, name2;
////
////	this.spawnArgs.GetString( "ent1", "", name1 );
////	this.spawnArgs.GetString( "ent2", "", name2 );
////
////	if ( name1.Length() ) {
////		ent1 = gameLocal.FindEntity( name1 );
////		if ( !ent1 ) {
////			gameLocal.Error( "idSpring '%s' at (%s): cannot find first entity '%s'", this.name.c_str(), this.GetPhysics().GetOrigin().ToString(0), name1.c_str() );
////		}
////	}
////	else {
////		ent1 = gameLocal.entities[ENTITYNUM_WORLD];
////	}
////
////	if ( name2.Length() ) {
////		ent2 = gameLocal.FindEntity( name2 );
////		if ( !ent2 ) {
////			gameLocal.Error( "idSpring '%s' at (%s): cannot find second entity '%s'", this.name.c_str(), this.GetPhysics().GetOrigin().ToString(0), name2.c_str() );
////		}
////	}
////	else {
////		ent2 = gameLocal.entities[ENTITYNUM_WORLD];
////	}
////	spring.SetPosition( ent1.GetPhysics(), id1, p1, ent2.GetPhysics(), id2, p2 );
////	this.BecomeActive( TH_THINK );
////}
////
/*
================
idSpring::Spawn
================
*/
	Spawn ( ): void {
		todoThrow ( );
		//float Kstretch, damping, restLength;

		//this.spawnArgs.GetInt( "id1", "0", id1 );
		//this.spawnArgs.GetInt( "id2", "0", id2 );
		//this.spawnArgs.GetVector( "point1", "0 0 0", p1 );
		//this.spawnArgs.GetVector( "point2", "0 0 0", p2 );
		//this.spawnArgs.GetFloat( "constant", "100.0f", Kstretch );
		//this.spawnArgs.GetFloat( "damping", "10.0f", damping );
		//this.spawnArgs.GetFloat( "restlength", "0.0f", restLength );

		//spring.InitSpring( Kstretch, 0.0f, damping, restLength );

		//ent1 = ent2 = NULL;

		//PostEventMS( &EV_PostSpawn, 0 );
	}

}


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
	Event_FindTargets(): void { throw "placeholder"; }

	
/////*
////===============
////idForceField::Toggle
////================
////*/
////void idForceField::Toggle( ) {
////	if ( thinkFlags & TH_THINK ) {
////		BecomeInactive( TH_THINK );
////	} else {
////		this.BecomeActive( TH_THINK );
////	}
////}
////
/////*
////================
////idForceField::Think
////================
////*/
////void idForceField::Think( ) {
////	if ( thinkFlags & TH_THINK ) {
////		// evaluate force
////		forceField.Evaluate( gameLocal.time );
////	}
////	Present();
////}
////
/////*
////================
////idForceField::Save
////================
////*/
////void idForceField::Save( idSaveGame *savefile ) const {
////	savefile.WriteStaticObject( forceField );
////}
////
/////*
////================
////idForceField::Restore
////================
////*/
////void idForceField::Restore( idRestoreGame *savefile ) {
////	savefile.ReadStaticObject( forceField );
////}
////
/////*
////================
////idForceField::Spawn
////================
////*/
	Spawn(): void {
		todoThrow ( );
////	idVec3 uniform;
////	float explosion, implosion, randomTorque;
////
////	if ( this.spawnArgs.GetVector( "uniform", "0 0 0", uniform ) ) {
////		forceField.Uniform( uniform );
////	} else if ( this.spawnArgs.GetFloat( "explosion", "0", explosion ) ) {
////		forceField.Explosion( explosion );
////	} else if ( this.spawnArgs.GetFloat( "implosion", "0", implosion ) ) {
////		forceField.Implosion( implosion );
////	}
////
////	if ( this.spawnArgs.GetFloat( "randomTorque", "0", randomTorque ) ) {
////		forceField.RandomTorque( randomTorque );
////	}
////
////	if ( this.spawnArgs.GetBool( "applyForce", "0" ) ) {
////		forceField.SetApplyType( FORCEFIELD_APPLY_FORCE );
////	} else if ( this.spawnArgs.GetBool( "applyImpulse", "0" ) ) {
////		forceField.SetApplyType( FORCEFIELD_APPLY_IMPULSE );
////	} else {
////		forceField.SetApplyType( FORCEFIELD_APPLY_VELOCITY );
////	}
////
////	forceField.SetPlayerOnly( this.spawnArgs.GetBool( "playerOnly", "0" ) );
////	forceField.SetMonsterOnly( this.spawnArgs.GetBool( "monsterOnly", "0" ) );
////
////	// set the collision model on the force field
////	forceField.SetClipModel( new idClipModel( this.GetPhysics().GetClipModel() ) );
////
////	// remove the collision model from the physics object
////	GetPhysics().SetClipModel( NULL, 1.0f );
////
////	if ( this.spawnArgs.GetBool( "start_on" ) ) {
////		this.BecomeActive( TH_THINK );
////	}
}
////
/////*
////===============
////idForceField::Event_Toggle
////================
////*/
////void idForceField::Event_Toggle( ) {
////	Toggle();
////}
////
/////*
////================
////idForceField::Event_Activate
////================
////*/
////void idForceField::Event_Activate( activator:idEntity ) {
////	float wait;
////
////	Toggle();
////	if ( this.spawnArgs.GetFloat( "wait", "0.01", wait ) ) {
////		this.PostEventSec( &EV_Toggle, wait );
////	}
////}
////
/////*
////================
////idForceField::Event_FindTargets
////================
////*/
////void idForceField::Event_FindTargets( ) {
////	FindTargets();
////	RemoveNullTargets();
////	if ( targets.Num() ) {
////		forceField.Uniform( targets[0].GetEntity().GetPhysics().GetOrigin() - this.GetPhysics().GetOrigin() );
////	}
////}
////
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
	num_anims :number/*int*/;
	current_anim_index :number/*int*/
	anim :number/*int*/
	blendFrames :number/*int*/
	soundJoint:jointHandle_t;
	activator = new idEntityPtr<idEntity>();
	activated:boolean;
//
//	void					PlayNextAnim( );
//
	Event_Activate( activator:idEntity ): void { throw "placeholder"; }	
	Event_Start( ): void { throw "placeholder"; }
	Event_StartRagdoll( ): void { throw "placeholder"; }
	Event_AnimDone( /*int */animIndex :number): void { throw "placeholder"; }
	Event_Footstep( ): void { throw "placeholder"; }
	Event_LaunchMissiles( projectilename:string, sound:string, launchjoint:string, targetjoint:string, /*int */numshots:number, /*int */framedelay :number): void { throw "placeholder"; }
	Event_LaunchMissilesUpdate( /*int*/ launchjoint: number, /*int */targetjoint: number, /*int */numshots: number, /*int */framedelay: number): void { throw "placeholder"; }


	
/*
===============
idAnimated::idAnimated
================
*/
	constructor() {
		super ( );
		this.anim = 0;
		this.blendFrames = 0;
		this.soundJoint = jointHandle_t.INVALID_JOINT;
		this.activated = false;
		this.combatModel = null;
		this.activator = null;
		this.current_anim_index = 0;
		this.num_anims = 0;
	}

/////*
////===============
////idAnimated::idAnimated
////================
////*/
////idAnimated::~idAnimated() {
////	delete this.combatModel;
////	this.combatModel = NULL;
////}
////
/////*
////===============
////idAnimated::Save
////================
////*/
////void idAnimated::Save( idSaveGame *savefile ) const {
////	savefile.WriteInt( this.current_anim_index );
////	savefile.WriteInt( this.num_anims );
////	savefile.WriteInt( this.anim );
////	savefile.WriteInt( this.blendFrames );
////	savefile.WriteJoint( this.soundJoint );
////	activator.Save( savefile );
////	savefile.WriteBool( activated );
////}
////
/////*
////===============
////idAnimated::Restore
////================
////*/
////void idAnimated::Restore( idRestoreGame *savefile ) {
////	savefile.ReadInt( this.current_anim_index );
////	savefile.ReadInt( this.num_anims );
////	savefile.ReadInt( this.anim );
////	savefile.ReadInt( this.blendFrames );
////	savefile.ReadJoint( this.soundJoint );
////	activator.Restore( savefile );
////	savefile.ReadBool( activated );
////}

/*
===============
idAnimated::Spawn
================
*/
	Spawn ( ): void {
		var animname = new idStr;
		var anim2: number /*int*/;
		var wait = new R<number> ( ) /*float*/;
		var joint: string;

		joint = this.spawnArgs.GetString( "sound_bone", "origin" );
		this.soundJoint = this.animator.GetJointHandle( joint );
		if ( this.soundJoint == jointHandle_t.INVALID_JOINT ) {
			gameLocal.Warning( "idAnimated '%s' at (%s): cannot find joint '%s' for sound playback", this.name.c_str ( ), this.GetPhysics ( ).GetOrigin ( ).ToString( 0 ), joint );
		}

		this.LoadAF ( );

		// allow bullets to collide with a combat model
		if ( this.spawnArgs.GetBool( "combatModel", "0" ) ) {
			this.combatModel = new idClipModel( this.modelDefHandle );
		}

		// allow the entity to take damage
		if ( this.spawnArgs.GetBool( "takeDamage", "0" ) ) {
			this.fl.takedamage = true;
		}

		this.blendFrames = 0;

		this.current_anim_index = 0;
		var $num_anims = new R( this.num_anims );
		this.spawnArgs.GetInt_R( "num_anims", "0", $num_anims );
		this.num_anims = $num_anims.$;

		this.blendFrames = this.spawnArgs.GetInt( "blend_in" );

		animname.equals( this.spawnArgs.GetString( this.num_anims ? "anim1" : "anim" ) );
		if ( !animname.Length ( ) ) {
			this.anim = 0;
		} else {
			this.anim = this.animator.GetAnim_name( animname.data );
			if ( !this.anim ) {
				gameLocal.Error( "idAnimated '%s' at (%s): cannot find anim '%s'", this.name.c_str ( ), this.GetPhysics ( ).GetOrigin ( ).ToString( 0 ), animname.c_str ( ) );
			}
		}

		if ( this.spawnArgs.GetBool( "hide" ) ) {
			this.Hide ( );

			if ( !this.num_anims ) {
				this.blendFrames = 0;
			}
		} else if ( this.spawnArgs.GetString_RidStr( "start_anim", "", animname ) ) {
			anim2 = this.animator.GetAnim_name( animname.data );
			if ( !anim2 ) {
				gameLocal.Error( "idAnimated '%s' at (%s): cannot find anim '%s'", this.name.c_str ( ), this.GetPhysics ( ).GetOrigin ( ).ToString( 0 ), animname.c_str ( ) );
			}
			this.animator.CycleAnim( ANIMCHANNEL_ALL, anim2, gameLocal.time, 0 );
		} else if ( this.anim ) {
			// init joints to the first frame of the animation
			this.animator.SetFrame( ANIMCHANNEL_ALL, this.anim, 1, gameLocal.time, 0 );

			if ( !this.num_anims ) {
				this.blendFrames = 0;
			}
		}

		this.spawnArgs.GetFloat_R( "wait", "-1", wait );

		if ( wait.$ >= 0 ) {
			this.PostEventSec( EV_Activate, wait.$, this );
		}
	}

/*
===============
idAnimated::LoadAF
===============
*/
	LoadAF ( ): boolean {
		var fileName = new idStr;

		if ( !this.spawnArgs.GetString_RidStr( "ragdoll", "*unknown*", fileName ) ) {
			return false;
		}
		this.af.SetAnimator( this.GetAnimator ( ) );
		return this.af.Load( this, fileName.data );
	}

/////*
////===============
////idAnimated::GetPhysicsToSoundTransform
////===============
////*/
////bool idAnimated::GetPhysicsToSoundTransform( idVec3 &origin, idMat3 &axis ) {
////	this.animator.GetJointTransform( this.soundJoint, gameLocal.time, origin, axis );
////	axis = renderEntity.axis;
////	return true;
////}
////
/////*
////================
////idAnimated::StartRagdoll
////================
////*/
////bool idAnimated::StartRagdoll( ) {
////	// if no AF loaded
////	if ( !this.af.IsLoaded() ) {
////		return false;
////	}
////
////	// if the AF is already active
////	if ( this.af.IsActive() ) {
////		return true;
////	}
////
////	// disable any collision model used
////	GetPhysics().DisableClip();
////
////	// start using the AF
////	this.af.StartFromCurrentPose( this.spawnArgs.GetInt( "velocityTime", "0" ) );
////	
////	return true;
////}
////
/////*
////=====================
////idAnimated::PlayNextAnim
////=====================
////*/
////void idAnimated::PlayNextAnim( ) {
////	const char *animname;
////	int len;
////	int cycle;
////
////	if ( this.current_anim_index >= this.num_anims ) {
////		this.Hide();
////		if ( this.spawnArgs.GetBool( "remove" ) ) {
////			PostEventMS( &EV_Remove, 0 );
////		} else {
////			this.current_anim_index = 0;
////		}
////		return;
////	}
////
////	Show();
////	this.current_anim_index++;
////
////	this.spawnArgs.GetString( va( "anim%d", this.current_anim_index ), NULL, &animname );
////	if ( !animname ) {
////		this.anim = 0;
////		this.animator.Clear( ANIMCHANNEL_ALL, gameLocal.time, FRAME2MS( this.blendFrames ) );
////		return;
////	}
////
////	this.anim = this.animator.GetAnim( animname );
////	if ( !this.anim ) {
////		gameLocal.Warning( "missing anim '%s' on %s", animname, this.name.c_str() );
////		return;
////	}
////
////	if ( g_debugCinematic.GetBool() ) {
////		gameLocal.Printf( "%d: '%s' start anim '%s'\n", gameLocal.framenum, GetName(), animname );
////	}
////		
////	this.spawnArgs.GetInt( "cycle", "1", cycle );
////	if ( ( this.current_anim_index == this.num_anims ) && this.spawnArgs.GetBool( "loop_last_anim" ) ) {
////		cycle = -1;
////	}
////
////	this.animator.CycleAnim( ANIMCHANNEL_ALL, this.anim, gameLocal.time, FRAME2MS( this.blendFrames ) );
////	this.animator.CurrentAnim( ANIMCHANNEL_ALL ).SetCycleCount( cycle );
////
////	len = this.animator.CurrentAnim( ANIMCHANNEL_ALL ).PlayLength();
////	if ( len >= 0 ) {
////		PostEventMS( &EV_AnimDone, len, this.current_anim_index );
////	}
////
////	// offset the start time of the shader to sync it to the game time
////	renderEntity.shaderParms[ SHADERPARM_TIMEOFFSET ] = -MS2SEC( gameLocal.time );
////
////	this.animator.ForceUpdate();
////	UpdateAnimation();
////	UpdateVisuals();
////	Present();
////}
////
/////*
////===============
////idAnimated::Event_StartRagdoll
////================
////*/
////void idAnimated::Event_StartRagdoll( ) {
////	StartRagdoll();
////}
////
/////*
////===============
////idAnimated::Event_AnimDone
////================
////*/
////void idAnimated::Event_AnimDone( int animindex ) {
////	if ( g_debugCinematic.GetBool() ) {
////		const idAnim *animPtr = this.animator.GetAnim( this.anim );
////		gameLocal.Printf( "%d: '%s' end anim '%s'\n", gameLocal.framenum, GetName(), animPtr ? animPtr.Name() : "" );
////	}
////
////	if ( ( animindex >= this.num_anims ) && this.spawnArgs.GetBool( "remove" ) ) {
////		this.Hide();
////		PostEventMS( &EV_Remove, 0 );
////	} else if ( this.spawnArgs.GetBool( "auto_advance" ) ) {
////		PlayNextAnim();
////	} else {
////		activated = false;
////	}
////
////	ActivateTargets( activator.GetEntity() );
////}
////
/////*
////===============
////idAnimated::Event_Activate
////================
////*/
////void idAnimated::Event_Activate( idEntity *_activator ) {
////	if ( this.num_anims ) {
////		PlayNextAnim();
////		activator = _activator;
////		return;
////	}
////
////	if ( activated ) {
////		// already activated
////		return;
////	}
////
////	activated = true;
////	activator = _activator;
////	ProcessEvent( &EV_Animated_Start );
////}
////
/////*
////===============
////idAnimated::Event_Start
////================
////*/
////void idAnimated::Event_Start( ) {
////	int cycle;
////	int len;
////
////	Show();
////
////	if ( this.num_anims ) {
////		PlayNextAnim();
////		return;
////	}
////
////	if ( this.anim ) {
////		if ( g_debugCinematic.GetBool() ) {
////			const idAnim *animPtr = this.animator.GetAnim( this.anim );
////			gameLocal.Printf( "%d: '%s' start anim '%s'\n", gameLocal.framenum, GetName(), animPtr ? animPtr.Name() : "" );
////		}
////		this.spawnArgs.GetInt( "cycle", "1", cycle );
////		this.animator.CycleAnim( ANIMCHANNEL_ALL, this.anim, gameLocal.time, FRAME2MS( this.blendFrames ) );
////		this.animator.CurrentAnim( ANIMCHANNEL_ALL ).SetCycleCount( cycle );
////
////		len = this.animator.CurrentAnim( ANIMCHANNEL_ALL ).PlayLength();
////		if ( len >= 0 ) {
////			PostEventMS( &EV_AnimDone, len, 1 );
////		}
////	}
////
////	// offset the start time of the shader to sync it to the game time
////	renderEntity.shaderParms[ SHADERPARM_TIMEOFFSET ] = -MS2SEC( gameLocal.time );
////
////	this.animator.ForceUpdate();
////	UpdateAnimation();
////	UpdateVisuals();
////	Present();
////}
////
/////*
////===============
////idAnimated::Event_Footstep
////===============
////*/
////void idAnimated::Event_Footstep( ) {
////	StartSound( "snd_footstep", SND_CHANNEL_BODY, 0, false, NULL );
////}
////
/////*
////=====================
////idAnimated::Event_LaunchMissilesUpdate
////=====================
////*/
////void idAnimated::Event_LaunchMissilesUpdate( int launchjoint, int targetjoint, int numshots, int framedelay ) {
////	idVec3			launchPos;
////	idVec3			targetPos;
////	idMat3			axis;
////	idVec3			dir;
////	idEntity *		ent;
////	idProjectile *	projectile;
////	const idDict *	projectileDef;
////	const char *	projectilename;
////
////	projectilename = this.spawnArgs.GetString( "projectilename" );
////	projectileDef = gameLocal.FindEntityDefDict( projectilename, false );
////	if ( !projectileDef ) {
////		gameLocal.Warning( "idAnimated '%s' at (%s): 'launchMissiles' called with unknown projectile '%s'", this.name.c_str(), this.GetPhysics().GetOrigin().ToString(0), projectilename );
////		return;
////	}
////
////	StartSound( "snd_missile", SND_CHANNEL_WEAPON, 0, false, NULL );
////
////	this.animator.GetJointTransform( ( jointHandle_t )launchjoint, gameLocal.time, launchPos, axis );
////	launchPos = renderEntity.origin + launchPos * renderEntity.axis;
////	
////	this.animator.GetJointTransform( ( jointHandle_t )targetjoint, gameLocal.time, targetPos, axis );
////	targetPos = renderEntity.origin + targetPos * renderEntity.axis;
////
////	dir = targetPos - launchPos;
////	dir.Normalize();
////
////	gameLocal.SpawnEntityDef( *projectileDef, &ent, false );
////	if ( !ent || !ent.IsType( idProjectile::Type ) ) {
////		gameLocal.Error( "idAnimated '%s' at (%s): in 'launchMissiles' call '%s' is not an idProjectile", this.name.c_str(), this.GetPhysics().GetOrigin().ToString(0), projectilename );
////	}
////	projectile = ( idProjectile * )ent;
////	projectile.Create( this, launchPos, dir );
////	projectile.Launch( launchPos, dir, vec3_origin );
////
////	if ( numshots > 0 ) {
////		PostEventMS( &EV_LaunchMissilesUpdate, FRAME2MS( framedelay ), launchjoint, targetjoint, numshots - 1, framedelay );
////	}
////}
////
/////*
////=====================
////idAnimated::Event_LaunchMissiles
////=====================
////*/
////void idAnimated::Event_LaunchMissiles( const char *projectilename, sound:string, const char *launchjoint, const char *targetjoint, int numshots, int framedelay ) {
////	const idDict *	projectileDef;
////	jointHandle_t	launch;
////	jointHandle_t	target;
////
////	projectileDef = gameLocal.FindEntityDefDict( projectilename, false );
////	if ( !projectileDef ) {
////		gameLocal.Warning( "idAnimated '%s' at (%s): unknown projectile '%s'", this.name.c_str(), this.GetPhysics().GetOrigin().ToString(0), projectilename );
////		return;
////	}
////
////	launch = this.animator.GetJointHandle( launchjoint );
////	if ( launch == jointHandle_t.INVALID_JOINT ) {
////		gameLocal.Warning( "idAnimated '%s' at (%s): unknown launch joint '%s'", this.name.c_str(), this.GetPhysics().GetOrigin().ToString(0), launchjoint );
////		gameLocal.Error( "Unknown joint '%s'", launchjoint );
////	}
////
////	target = this.animator.GetJointHandle( targetjoint );
////	if ( target == jointHandle_t.INVALID_JOINT ) {
////		gameLocal.Warning( "idAnimated '%s' at (%s): unknown target joint '%s'", this.name.c_str(), this.GetPhysics().GetOrigin().ToString(0), targetjoint );
////	}
////
////	this.spawnArgs.Set( "projectilename", projectilename );
////	this.spawnArgs.Set( "missilesound", sound );
////
////	CancelEvents( &EV_LaunchMissilesUpdate );
////	ProcessEvent( &EV_LaunchMissilesUpdate, launch, target, numshots - 1, framedelay );
////}
////
////
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
	//		this.Hide();
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
////			this.Hide();
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
//Spawn():void{throw "placeholder";}
	Event_Activate(activator: idEntity): void { throw "placeholder"; }
//
//	virtual void		WriteToSnapshot( idBitMsgDelta &msg ) const;
//	virtual void		ReadFromSnapshot( const idBitMsgDelta &msg );
//
//private:
	hidden:boolean;

/*
===============
idFuncEmitter::idFuncEmitter
===============
*/
	constructor() {
		super ( );
		this.hidden = false;
	}

/*
===============
idFuncEmitter::Spawn
===============
*/
	Spawn ( ): void {
		if ( this.spawnArgs.GetBool( "start_off" ) ) {
			this.hidden = true;
			this.renderEntity.shaderParms[SHADERPARM_PARTICLE_STOPTIME] = MS2SEC( 1 );
			this.UpdateVisuals ( );
		} else {
			this.hidden = false;
		}
	}
////
/////*
////===============
////idFuncEmitter::Save
////===============
////*/
////void idFuncEmitter::Save( idSaveGame *savefile ) const {
////	savefile.WriteBool( this.hidden );
////}
////
/////*
////===============
////idFuncEmitter::Restore
////===============
////*/
////void idFuncEmitter::Restore( idRestoreGame *savefile ) {
////	savefile.ReadBool( this.hidden );
////}
////
/////*
////================
////idFuncEmitter::Event_Activate
////================
////*/
////void idFuncEmitter::Event_Activate( activator:idEntity ) {
////	if ( this.hidden || this.spawnArgs.GetBool( "cycleTrigger" ) ) {
////		renderEntity.shaderParms[SHADERPARM_PARTICLE_STOPTIME] = 0;
////		renderEntity.shaderParms[SHADERPARM_TIMEOFFSET] = -MS2SEC( gameLocal.time );
////		this.hidden = false;
////	} else {
////		renderEntity.shaderParms[SHADERPARM_PARTICLE_STOPTIME] = MS2SEC( gameLocal.time );
////		this.hidden = true;
////	}
////	UpdateVisuals();
////}
////
/////*
////================
////idFuncEmitter::WriteToSnapshot
////================
////*/
////void idFuncEmitter::WriteToSnapshot( idBitMsgDelta &msg ) const {
////	msg.WriteBits( this.hidden ? 1 : 0, 1 );
////	msg.WriteFloat( renderEntity.shaderParms[ SHADERPARM_PARTICLE_STOPTIME ] );
////	msg.WriteFloat( renderEntity.shaderParms[ SHADERPARM_TIMEOFFSET ] );
////}
////
/////*
////================
////idFuncEmitter::ReadFromSnapshot
////================
////*/
////void idFuncEmitter::ReadFromSnapshot( const idBitMsgDelta &msg ) {
////	this.hidden = msg.ReadBits( 1 ) != 0;
////	renderEntity.shaderParms[ SHADERPARM_PARTICLE_STOPTIME ] = msg.ReadFloat();
////	renderEntity.shaderParms[ SHADERPARM_TIMEOFFSET ] = msg.ReadFloat();
////	if ( msg.HasChanged() ) {
////		UpdateVisuals();
////	}
////}

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

	
/////*
////===============
////idFuncSmoke::idFuncSmoke
////===============
////*/
////idFuncSmoke::idFuncSmoke() {
////	smokeTime = 0;
////	smoke = NULL;
////	restart = false;
////}
////
/////*
////===============
////idFuncSmoke::Save
////===============
////*/
////void idFuncSmoke::Save(	idSaveGame *savefile ) const {
////	savefile.WriteInt( smokeTime );
////	savefile.WriteParticle( smoke );
////	savefile.WriteBool( restart );
////}
////
/////*
////===============
////idFuncSmoke::Restore
////===============
////*/
////void idFuncSmoke::Restore( idRestoreGame *savefile ) {
////	savefile.ReadInt( smokeTime );
////	savefile.ReadParticle( smoke );
////	savefile.ReadBool( restart );
////}
////
/////*
////===============
////idFuncSmoke::Spawn
////===============
////*/
	Spawn(): void {
		todoThrow()
////	const char *smokeName = this.spawnArgs.GetString( "smoke" );
////	if ( *smokeName != '\0' ) {
////		smoke = static_cast<const idDeclParticle *>( declManager.FindType( DECL_PARTICLE, smokeName ) );
////	} else {
////		smoke = NULL;
////	}
////	if ( this.spawnArgs.GetBool( "start_off" ) ) {
////		smokeTime = 0;
////		restart = false;
////	} else if ( smoke ) {
////		smokeTime = gameLocal.time;
////		BecomeActive( TH_UPDATEPARTICLES );
////		restart = true;
////	}
////	GetPhysics().SetContents( 0 );
}
////
/////*
////================
////idFuncSmoke::Event_Activate
////================
////*/
////void idFuncSmoke::Event_Activate( activator:idEntity ) {
////	if ( thinkFlags & TH_UPDATEPARTICLES ) {
////		restart = false;
////		return;
////	} else {
////		BecomeActive( TH_UPDATEPARTICLES );
////		restart = true;
////		smokeTime = gameLocal.time;
////	}
////}
////
/////*
////===============
////idFuncSmoke::Think
////================
////*/
////void idFuncSmoke::Think( ) {
////
////	// if we are completely closed off from the player, don't do anything at all
////	if ( CheckDormant() || smoke == NULL || smokeTime == -1 ) {
////		return;
////	}
////
////	if ( ( thinkFlags & TH_UPDATEPARTICLES) && !IsHidden() ) {
////		if ( !gameLocal.smokeParticles.EmitSmoke( smoke, smokeTime, gameLocal.random.CRandomFloat(), this.GetPhysics().GetOrigin(), this.GetPhysics().GetAxis() ) ) {
////			if ( restart ) {
////				smokeTime = gameLocal.time;
////			} else {
////				smokeTime = 0;
////				BecomeInactive( TH_UPDATEPARTICLES );
////			}
////		}
////	}
////
////}
////
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
//Spawn():void{throw "placeholder";}
//
//private:
	Event_Activate( activator:idEntity ): void { throw "placeholder"; }
	Event_Splat(): void { throw "placeholder"; }

	
/////*
////===============
////idFuncSplat::idFuncSplat
////===============
////*/
////idFuncSplat::idFuncSplat( ) {
////}
////
/*
===============
idFuncSplat::Spawn
===============
*/
	Spawn ( ): void {
	}

/////*
////================
////idFuncSplat::Event_Splat
////================
////*/
////void idFuncSplat::Event_Splat( ) {
////	const char *splat = NULL;
////	int count = this.spawnArgs.GetInt( "splatCount", "1" );
////	for ( int i = 0; i < count; i++ ) {
////		splat = this.spawnArgs.RandomPrefix( "mtr_splat", gameLocal.random );
////		if ( splat && *splat ) {
////			float size = this.spawnArgs.GetFloat( "splatSize", "128" );
////			float dist = this.spawnArgs.GetFloat( "splatDistance", "128" );
////			/*float*/angle:number = this.spawnArgs.GetFloat( "splatAngle", "0" );
////			gameLocal.ProjectDecal( this.GetPhysics().GetOrigin(), this.GetPhysics().GetAxis()[2], dist, true, size, splat, angle );
////		}
////	}
////	StartSound( "snd_splat", SND_CHANNEL_ANY, 0, false, NULL );
////}
////
/////*
////================
////idFuncSplat::Event_Activate
////================
////*/
////void idFuncSplat::Event_Activate( activator:idEntity ) {
////	idFuncEmitter::Event_Activate( activator );
////	this.PostEventSec( &EV_Splat, this.spawnArgs.GetFloat( "splatDelay", "0.25" ) );
////	StartSound( "snd_spurt", SND_CHANNEL_ANY, 0, false, NULL );
////}
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
//
//	void				Save ( savefile: idSaveGame ): void { throw "placeholder"; }
//	void				Restore ( savefile: idRestoreGame ): void { throw "placeholder"; }
//
//	virtual void		Think( );
//
//private:
//	idStr				text;
//	bool				playerOriented;

	
/*
================
idTextEntity::Spawn
================
*/
	Spawn(): void {
		todoThrow ( );
		//// these are cached as the are used each frame
		//text = this.spawnArgs.GetString( "text" );
		//playerOriented = this.spawnArgs.GetBool( "playerOriented" );
		//bool force = this.spawnArgs.GetBool( "force" );
		//if ( developer.GetBool() || force ) {
		//	BecomeActive(TH_THINK);
		//}
	}
////
/////*
////================
////idTextEntity::Save
////================
////*/
////void idTextEntity::Save( idSaveGame *savefile ) const {
////	savefile.WriteString( text );
////	savefile.WriteBool( playerOriented );
////}
////
/////*
////================
////idTextEntity::Restore
////================
////*/
////void idTextEntity::Restore( idRestoreGame *savefile ) {
////	savefile.ReadString( text );
////	savefile.ReadBool( playerOriented );
////}
////
/////*
////================
////idTextEntity::Think
////================
////*/
////void idTextEntity::Think( ) {
////	if ( thinkFlags & TH_THINK ) {
////		gameRenderWorld.DrawText( text, this.GetPhysics().GetOrigin(), 0.25, colorWhite, playerOriented ? gameLocal.GetLocalPlayer().viewAngles.ToMat3() : this.GetPhysics().GetAxis().Transpose(), 1 );
////		for ( int i = 0; i < targets.Num(); i++ ) {
////			if ( targets[i].GetEntity() ) {
////				gameRenderWorld.DebugArrow( colorBlue, this.GetPhysics().GetOrigin(), targets[i].GetEntity().GetPhysics().GetOrigin(), 1 );
////			}
////		}
////	} else {
////		BecomeInactive( TH_ALL );
////	}
////}
////
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
//Spawn():void{throw "placeholder";}
//
//	const char *		GetLocation( ) const;
//
//private:

	
/*
======================
idLocationEntity::Spawn
======================
*/
	Spawn ( ): void {
		todoThrow ( );
////	idStr realName;
////
////	// this just holds dict information
////
////	// if "location" not already set, use the entity name.
////	if ( !this.spawnArgs.GetString( "location", "", realName ) ) {
////		this.spawnArgs.Set( "location", this.name );
////	}
	}
////
/////*
////======================
////idLocationEntity::GetLocation
////======================
////*/
////const char *idLocationEntity::GetLocation( ) const {
////	return this.spawnArgs.GetString( "location" );
////}
////
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

	
/////*
////================
////idVacuumSeparatorEntity::idVacuumSeparatorEntity
////================
////*/
////idVacuumSeparatorEntity::idVacuumSeparatorEntity( ) {
////	portal = 0;
////}
////
/////*
////================
////idVacuumSeparatorEntity::Save
////================
////*/
////void idVacuumSeparatorEntity::Save( idSaveGame *savefile ) const {
////	savefile.WriteInt( (int)portal );
////	savefile.WriteInt( gameRenderWorld.GetPortalState( portal ) );
////}
////
/////*
////================
////idVacuumSeparatorEntity::Restore
////================
////*/
////void idVacuumSeparatorEntity::Restore( idRestoreGame *savefile ) {
////	int state;
////
////	savefile.ReadInt( (int &)portal );
////	savefile.ReadInt( state );
////
////	gameLocal.SetPortalState( portal, state );
////}
////
/////*
////================
////idVacuumSeparatorEntity::Spawn
////================
////*/
////void idVacuumSeparatorEntity::Spawn() {
////	idBounds b;
////
////	b = idBounds( this.spawnArgs.GetVector( "origin" ) ).Expand( 16 );
////	portal = gameRenderWorld.FindPortal( b );
////	if ( !portal ) {
////		gameLocal.Warning( "VacuumSeparator '%s' didn't contact a portal", this.spawnArgs.GetString( "name" ) );
////		return;
////	}
////	gameLocal.SetPortalState( portal, PS_BLOCK_AIR | PS_BLOCK_LOCATION );
////}
////
/////*
////================
////idVacuumSeparatorEntity::Event_Activate
////================
////*/
////void idVacuumSeparatorEntity::Event_Activate( activator:idEntity ) {
////	if ( !portal ) {
////		return;
////	}
////	gameLocal.SetPortalState( portal, PS_BLOCK_NONE );
////}
////
////


	
/////*
////================
////idLocationSeparatorEntity::Spawn
////================
////*/
////void idLocationSeparatorEntity::Spawn() {
////	idBounds b;
////
////	b = idBounds( this.spawnArgs.GetVector( "origin" ) ).Expand( 16 );
////	qhandle_t portal = gameRenderWorld.FindPortal( b );
////	if ( !portal ) {
////		gameLocal.Warning( "LocationSeparator '%s' didn't contact a portal", this.spawnArgs.GetString( "name" ) );
////	}
////	gameLocal.SetPortalState( portal, PS_BLOCK_LOCATION );
////}
////

};

class idVacuumEntity extends idEntity {
//public:
//	CLASS_PROTOTYPE( idVacuumEntity );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idVacuumEntity>[];
//
//
//private:


	
/////*
////================
////idVacuumEntity::Spawn
////================
////*/
////void idVacuumEntity::Spawn() {
////	if ( gameLocal.vacuumAreaNum != -1 ) {
////		gameLocal.Warning( "idVacuumEntity::Spawn: multiple idVacuumEntity in level" );
////		return;
////	}
////
////	idVec3 org = this.spawnArgs.GetVector( "origin" );
////
////	gameLocal.vacuumAreaNum = gameRenderWorld.PointInArea( org );
////}
////

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

	
/////*
////===============
////idBeam::idBeam
////===============
////*/
////idBeam::idBeam() {
////	target = NULL;
////	master = NULL;
////}
////
/////*
////===============
////idBeam::Save
////===============
////*/
////void idBeam::Save( idSaveGame *savefile ) const {
////	target.Save( savefile );
////	master.Save( savefile );
////}
////
/////*
////===============
////idBeam::Restore
////===============
////*/
////void idBeam::Restore( idRestoreGame *savefile ) {
////	target.Restore( savefile );
////	master.Restore( savefile );
////}
////
/////*
////===============
////idBeam::Spawn
////===============
////*/
////void idBeam::Spawn( ) {
////	float width;
////
////	if ( this.spawnArgs.GetFloat( "width", "0", width ) ) {
////		renderEntity.shaderParms[ SHADERPARM_BEAM_WIDTH ] = width;
////	}
////
////	SetModel( "_BEAM" );
////	this.Hide();
////	PostEventMS( &EV_PostSpawn, 0 );
////}
////
/////*
////================
////idBeam::Think
////================
////*/
////void idBeam::Think( ) {
////	idBeam *masterEnt;
////
////	if ( !IsHidden() && !target.GetEntity() ) {
////		// hide if our target is removed
////		this.Hide();
////	}
////
////	RunPhysics();
////
////	masterEnt = master.GetEntity();
////	if ( masterEnt ) {
////		const idVec3 &origin = this.GetPhysics().GetOrigin();
////		masterEnt.SetBeamTarget( origin );
////	}
////	Present();
////}
////
/////*
////================
////idBeam::SetMaster
////================
////*/
////void idBeam::SetMaster( idBeam *masterbeam ) {
////	master = masterbeam;
////}
////
/////*
////================
////idBeam::SetBeamTarget
////================
////*/
////void idBeam::SetBeamTarget( const idVec3 &origin ) {
////	if ( ( renderEntity.shaderParms[ SHADERPARM_BEAM_END_X ] != origin.x ) || ( renderEntity.shaderParms[ SHADERPARM_BEAM_END_Y ] != origin.y ) || ( renderEntity.shaderParms[ SHADERPARM_BEAM_END_Z ] != origin.z ) ) {
////		renderEntity.shaderParms[ SHADERPARM_BEAM_END_X ] = origin.x;
////		renderEntity.shaderParms[ SHADERPARM_BEAM_END_Y ] = origin.y;
////		renderEntity.shaderParms[ SHADERPARM_BEAM_END_Z ] = origin.z;
////		UpdateVisuals();
////	}
////}
////
/////*
////================
////idBeam::Show
////================
////*/
////void idBeam::Show( ) {
////	idBeam *targetEnt;
////
////	idEntity::Show();
////
////	targetEnt = target.GetEntity();
////	if ( targetEnt ) {
////		const idVec3 &origin = targetEnt.GetPhysics().GetOrigin();
////		SetBeamTarget( origin );
////	}
////}
////
/////*
////================
////idBeam::Event_MatchTarget
////================
////*/
////void idBeam::Event_MatchTarget( ) {
////	var/*int*/i:number;
////	idEntity *targetEnt;
////	idBeam *targetBeam;
////
////	if ( !targets.Num() ) {
////		return;
////	}
////
////	targetBeam = NULL;
////	for( i = 0; i < targets.Num(); i++ ) {
////		targetEnt = targets[ i ].GetEntity();
////		if ( targetEnt && targetEnt.IsType( idBeam::Type ) ) {
////			targetBeam = static_cast<idBeam *>( targetEnt );
////			break;
////		}
////	}
////
////	if ( !targetBeam ) {
////		gameLocal.Error( "Could not find valid beam target for '%s'", this.name.c_str() );
////	}
////
////	target = targetBeam;
////	targetBeam.SetMaster( this );
////	if ( !this.spawnArgs.GetBool( "start_off" ) ) {
////		Show();
////	}
////}
////
/////*
////================
////idBeam::Event_Activate
////================
////*/
////void idBeam::Event_Activate( activator:idEntity ) {
////	if ( IsHidden() ) {
////		Show();
////	} else {
////		this.Hide();		
////	}
////}
////
/////*
////================
////idBeam::WriteToSnapshot
////================
////*/
////void idBeam::WriteToSnapshot( idBitMsgDelta &msg ) const {
////	GetPhysics().WriteToSnapshot( msg );
////	WriteBindToSnapshot( msg );
////	WriteColorToSnapshot( msg );
////	msg.WriteFloat( renderEntity.shaderParms[SHADERPARM_BEAM_END_X] );
////	msg.WriteFloat( renderEntity.shaderParms[SHADERPARM_BEAM_END_Y] );
////	msg.WriteFloat( renderEntity.shaderParms[SHADERPARM_BEAM_END_Z] );
////}
////
/////*
////================
////idBeam::ReadFromSnapshot
////================
////*/
////void idBeam::ReadFromSnapshot( const idBitMsgDelta &msg ) {
////	GetPhysics().ReadFromSnapshot( msg );
////	ReadBindFromSnapshot( msg );
////	ReadColorFromSnapshot( msg );
////	renderEntity.shaderParms[SHADERPARM_BEAM_END_X] = msg.ReadFloat();
////	renderEntity.shaderParms[SHADERPARM_BEAM_END_Y] = msg.ReadFloat();
////	renderEntity.shaderParms[SHADERPARM_BEAM_END_Z] = msg.ReadFloat();
////	if ( msg.HasChanged() ) {
////		UpdateVisuals();
////	}
////}
////
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
//Spawn():void{throw "placeholder";}
//
//	void				Save ( savefile: idSaveGame ): void { throw "placeholder"; }
//	void				Restore ( savefile: idRestoreGame ): void { throw "placeholder"; }
//
//private:
	Event_Touch( other:idEntity, trace:trace_t ): void { throw "placeholder"; }
//
//
//	idRenderModelLiquid *model;

	
/////*
////================
////idLiquid::Save
////================
////*/
////void idLiquid::Save( idSaveGame *savefile ) const {
////	// Nothing to save
////}
////
/////*
////================
////idLiquid::Restore
////================
////*/
////void idLiquid::Restore( idRestoreGame *savefile ) {
////	//FIXME: NO!
////	Spawn();
////}
////
/////*
////================
////idLiquid::Spawn
////================
////*/
////void idLiquid::Spawn() {
/////*
////	model = dynamic_cast<idRenderModelLiquid *>( renderEntity.hModel );
////	if ( !model ) {
////		gameLocal.Error( "Entity '%s' must have liquid model", this.name.c_str() );
////	}
////	model.Reset();
////	GetPhysics().SetContents( CONTENTS_TRIGGER );
////*/
////}
////
/////*
////================
////idLiquid::Event_Touch
////================
////*/
////void idLiquid::Event_Touch( other:idEntity, trace:trace_t ) {
////	// FIXME: for QuakeCon
/////*
////	idVec3 pos;
////
////	pos = other.GetPhysics().GetOrigin() - this.GetPhysics().GetOrigin();
////	model.IntersectBounds( other.GetPhysics().GetBounds().Translate( pos ), -10.0f );
////*/
////}
////
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
	Event_Activate(activator: idEntity): void { throw "placeholder"; }

	
/////*
////===============
////idShaking::idShaking
////===============
////*/
////idShaking::idShaking() {
////	this.active = false;
////}
////
/////*
////===============
////idShaking::Save
////===============
////*/
////void idShaking::Save( idSaveGame *savefile ) const {
////	savefile.WriteBool( this.active );
////	savefile.WriteStaticObject( physicsObj );
////}
////
/////*
////===============
////idShaking::Restore
////===============
////*/
////void idShaking::Restore( idRestoreGame *savefile ) {
////	savefile.ReadBool( this.active );
////	savefile.ReadStaticObject( physicsObj );
////	RestorePhysics( &physicsObj );
////}
////
/////*
////===============
////idShaking::Spawn
////===============
////*/
////void idShaking::Spawn( ) {
////	physicsObj.SetSelf( this );
////	physicsObj.SetClipModel( new idClipModel( this.GetPhysics().GetClipModel() ), 1.0f );
////	physicsObj.SetOrigin( this.GetPhysics().GetOrigin() );
////	physicsObj.SetAxis( this.GetPhysics().GetAxis() );
////	physicsObj.SetClipMask( MASK_SOLID );
////	SetPhysics( &physicsObj );
////	
////	this.active = false;
////	if ( !this.spawnArgs.GetBool( "start_off" ) ) {
////		BeginShaking();
////	}
////}
////
/////*
////================
////idShaking::BeginShaking
////================
////*/
////void idShaking::BeginShaking( ) {
////	int			phase;
////	idAngles	shake;
////	int			period;
////
////	this.active = true;
////	phase = gameLocal.random.RandomInt( 1000 );
////	shake = this.spawnArgs.GetAngles( "shake", "0.5 0.5 0.5" );
////	period = this.spawnArgs.GetFloat( "period", "0.05" ) * 1000;
////	physicsObj.SetAngularExtrapolation( extrapolation_t(EXTRAPOLATION_DECELSINE|EXTRAPOLATION_NOSTOP), phase, period * 0.25f, this.GetPhysics().GetAxis().ToAngles(), shake, ang_zero );
////}
////
/////*
////================
////idShaking::Event_Activate
////================
////*/
////void idShaking::Event_Activate( activator:idEntity ) {
////	if ( !this.active ) {
////		BeginShaking();
////	} else {
////		this.active = false;
////		physicsObj.SetAngularExtrapolation( EXTRAPOLATION_NONE, 0, 0, physicsObj.GetAxis().ToAngles(), ang_zero, ang_zero );
////	}
////}
////
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
	Event_Activate(activator: idEntity): void { throw "placeholder"; }

	
/////*
////===============
////idEarthQuake::idEarthQuake
////===============
////*/
////idEarthQuake::idEarthQuake() {
////	wait = 0.0f;
////	random = 0.0f;
////	nextTriggerTime = 0;
////	shakeStopTime = 0;
////	triggered = false;
////	playerOriented = false;
////	disabled = false;
////	shakeTime = 0.0f;
////}
////
/////*
////===============
////idEarthQuake::Save
////===============
////*/
////void idEarthQuake::Save( idSaveGame *savefile ) const {
////	savefile.WriteInt( nextTriggerTime );
////	savefile.WriteInt( shakeStopTime );
////	savefile.WriteFloat( wait );
////	savefile.WriteFloat( random );
////	savefile.WriteBool( triggered );
////	savefile.WriteBool( playerOriented );
////	savefile.WriteBool( disabled );
////	savefile.WriteFloat( shakeTime );
////}
////
/////*
////===============
////idEarthQuake::Restore
////===============
////*/
////void idEarthQuake::Restore( idRestoreGame *savefile ) {
////	savefile.ReadInt( nextTriggerTime );
////	savefile.ReadInt( shakeStopTime );
////	savefile.ReadFloat( wait );
////	savefile.ReadFloat( random );
////	savefile.ReadBool( triggered );
////	savefile.ReadBool( playerOriented );
////	savefile.ReadBool( disabled );
////	savefile.ReadFloat( shakeTime );
////
////	if ( shakeStopTime > gameLocal.time ) {
////		BecomeActive( TH_THINK );
////	}
////}
////
/////*
////===============
////idEarthQuake::Spawn
////===============
////*/
////void idEarthQuake::Spawn( ) {
////	nextTriggerTime = 0;
////	shakeStopTime = 0;
////	wait = this.spawnArgs.GetFloat( "wait", "15" );
////	random = this.spawnArgs.GetFloat( "random", "5" );
////	triggered = this.spawnArgs.GetBool( "triggered" );
////	playerOriented = this.spawnArgs.GetBool( "playerOriented" );
////	disabled = false;
////	shakeTime = this.spawnArgs.GetFloat( "shakeTime", "0" );
////
////	if ( !triggered ){
////		this.PostEventSec( &EV_Activate, this.spawnArgs.GetFloat( "wait" ), this );
////	}
////	BecomeInactive( TH_THINK );
////}
////
/////*
////================
////idEarthQuake::Event_Activate
////================
////*/
////void idEarthQuake::Event_Activate( activator:idEntity ) {
////	
////	if ( nextTriggerTime > gameLocal.time ) {
////		return;
////	}
////
////	if ( disabled && activator == this ) {
////		return;
////	}
////
////	idPlayer *player = gameLocal.GetLocalPlayer();
////	if ( player == NULL ) {
////		return;
////	}
////
////	nextTriggerTime = 0;
////
////	if ( !triggered && activator != this ){
////		// if we are not triggered ( i.e. random ), disable or enable
////		disabled ^= 1;
////		if (disabled) {
////			return;
////		} else {
////			this.PostEventSec( &EV_Activate, wait + random * gameLocal.random.CRandomFloat(), this );
////		}
////	}
////
////	ActivateTargets( activator );
////
////	const idSoundShader *shader = declManager.FindSound( this.spawnArgs.GetString( "snd_quake" ) );
////	if ( playerOriented ) {
////		player.StartSoundShader( shader, SND_CHANNEL_ANY, SSF_GLOBAL, false, NULL );
////	} else {
////		StartSoundShader( shader, SND_CHANNEL_ANY, SSF_GLOBAL, false, NULL );
////	}
////
////	if ( shakeTime > 0.0f ) {
////		shakeStopTime = gameLocal.time + SEC2MS( shakeTime );
////		BecomeActive( TH_THINK );
////	}
////
////	if ( wait > 0.0f ) {
////		if ( !triggered ) {
////			this.PostEventSec( &EV_Activate, wait + random * gameLocal.random.CRandomFloat(), this );
////		} else {
////			nextTriggerTime = gameLocal.time + SEC2MS( wait + random * gameLocal.random.CRandomFloat() );
////		}
////	} else if ( shakeTime == 0.0f ) {
////		PostEventMS( &EV_Remove, 0 );
////	}
////}
////
////
/////*
////===============
////idEarthQuake::Think
////================
////*/
////void idEarthQuake::Think( ) {
////	if ( thinkFlags & TH_THINK ) {
////		if ( gameLocal.time > shakeStopTime ) {
////			BecomeInactive( TH_THINK );
////			if ( wait <= 0.0f ) {
////				PostEventMS( &EV_Remove, 0 );
////			}
////			return;
////		}
////		float shakeVolume = gameSoundWorld.CurrentShakeAmplitudeForPosition( gameLocal.time, gameLocal.GetLocalPlayer().firstPersonViewOrigin );
////		gameLocal.RadiusPush( this.GetPhysics().GetOrigin(), 256, 1500 * shakeVolume, this, this, 1.0f, true );
////	}
////	BecomeInactive( TH_UPDATEVISUALS );
////}
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
	Event_Activate(activator: idEntity): void { throw "placeholder"; }

	
/////*
////===============
////idFuncPortal::idFuncPortal
////===============
////*/
////idFuncPortal::idFuncPortal() {
////	portal = 0;
////	state = false;
////}
////
/////*
////===============
////idFuncPortal::Save
////===============
////*/
////void idFuncPortal::Save( idSaveGame *savefile ) const {
////	savefile.WriteInt( (int)portal );
////	savefile.WriteBool( state );
////}
////
/////*
////===============
////idFuncPortal::Restore
////===============
////*/
////void idFuncPortal::Restore( idRestoreGame *savefile ) {
////	savefile.ReadInt( (int &)portal );
////	savefile.ReadBool( state );
////	gameLocal.SetPortalState( portal, state ? PS_BLOCK_ALL : PS_BLOCK_NONE );
////}
////
/////*
////===============
////idFuncPortal::Spawn
////===============
////*/
////void idFuncPortal::Spawn( ) {
////	portal = gameRenderWorld.FindPortal( this.GetPhysics().GetAbsBounds().Expand( 32.0f ) );
////	if ( portal > 0 ) {
////		state = this.spawnArgs.GetBool( "start_on" );
////		gameLocal.SetPortalState( portal, state ? PS_BLOCK_ALL : PS_BLOCK_NONE );
////	}
////}
////
/////*
////================
////idFuncPortal::Event_Activate
////================
////*/
////void idFuncPortal::Event_Activate( activator:idEntity ) {
////	if ( portal > 0 ) {
////		state = !state;
////		gameLocal.SetPortalState( portal, state ? PS_BLOCK_ALL : PS_BLOCK_NONE );
////	}
////}
////
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
	Event_Activate(activator: idEntity): void { throw "placeholder"; }


	
/////*
////===============
////idFuncAASPortal::idFuncAASPortal
////===============
////*/
////idFuncAASPortal::idFuncAASPortal() {
////	state = false;
////}
////
/////*
////===============
////idFuncAASPortal::Save
////===============
////*/
////void idFuncAASPortal::Save( idSaveGame *savefile ) const {
////	savefile.WriteBool( state );
////}
////
/////*
////===============
////idFuncAASPortal::Restore
////===============
////*/
////void idFuncAASPortal::Restore( idRestoreGame *savefile ) {
////	savefile.ReadBool( state );
////	gameLocal.SetAASAreaState( this.GetPhysics().GetAbsBounds(), AREACONTENTS_CLUSTERPORTAL, state );
////}
////
/////*
////===============
////idFuncAASPortal::Spawn
////===============
////*/
////void idFuncAASPortal::Spawn( ) {
////	state = this.spawnArgs.GetBool( "start_on" );
////	gameLocal.SetAASAreaState( this.GetPhysics().GetAbsBounds(), AREACONTENTS_CLUSTERPORTAL, state );
////}
////
/////*
////================
////idFuncAASPortal::Event_Activate
////================
////*/
////void idFuncAASPortal::Event_Activate( activator:idEntity ) {
////	state ^= 1;
////	gameLocal.SetAASAreaState( this.GetPhysics().GetAbsBounds(), AREACONTENTS_CLUSTERPORTAL, state );
////}
////
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
	Event_Activate(activator: idEntity): void { throw "placeholder"; }

	
/////*
////===============
////idFuncAASObstacle::idFuncAASObstacle
////===============
////*/
////idFuncAASObstacle::idFuncAASObstacle() {
////	state = false;
////}
////
/////*
////===============
////idFuncAASObstacle::Save
////===============
////*/
////void idFuncAASObstacle::Save( idSaveGame *savefile ) const {
////	savefile.WriteBool( state );
////}
////
/////*
////===============
////idFuncAASObstacle::Restore
////===============
////*/
////void idFuncAASObstacle::Restore( idRestoreGame *savefile ) {
////	savefile.ReadBool( state );
////	gameLocal.SetAASAreaState( this.GetPhysics().GetAbsBounds(), AREACONTENTS_OBSTACLE, state );
////}
////
/////*
////===============
////idFuncAASObstacle::Spawn
////===============
////*/
////void idFuncAASObstacle::Spawn( ) {
////	state = this.spawnArgs.GetBool( "start_on" );
////	gameLocal.SetAASAreaState( this.GetPhysics().GetAbsBounds(), AREACONTENTS_OBSTACLE, state );
////}
////
/////*
////================
////idFuncAASObstacle::Event_Activate
////================
////*/
////void idFuncAASObstacle::Event_Activate( activator:idEntity ) {
////	state ^= 1;
////	gameLocal.SetAASAreaState( this.GetPhysics().GetAbsBounds(), AREACONTENTS_OBSTACLE, state );
////}
////
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
	Event_ResetRadioHud(activator: idEntity): void { throw "placeholder"; }

	
/////*
////===============
////idFuncRadioChatter::idFuncRadioChatter
////===============
////*/
////idFuncRadioChatter::idFuncRadioChatter() {
////	time = 0.0;
////}
////
/////*
////===============
////idFuncRadioChatter::Save
////===============
////*/
////void idFuncRadioChatter::Save( idSaveGame *savefile ) const {
////	savefile.WriteFloat( time );
////}
////
/////*
////===============
////idFuncRadioChatter::Restore
////===============
////*/
////void idFuncRadioChatter::Restore( idRestoreGame *savefile ) {
////	savefile.ReadFloat( time );
////}
////
/////*
////===============
////idFuncRadioChatter::Spawn
////===============
////*/
////void idFuncRadioChatter::Spawn( ) {
////	time = this.spawnArgs.GetFloat( "time", "5.0" );
////}
////
/////*
////================
////idFuncRadioChatter::Event_Activate
////================
////*/
////void idFuncRadioChatter::Event_Activate( activator:idEntity ) {
////	idPlayer *player;
////	const char	*sound;
////	const idSoundShader *shader;
////	int length;
////	
////	if ( activator.IsType( idPlayer::Type ) ) {
////		player = static_cast<idPlayer *>( activator );
////	} else {
////		player = gameLocal.GetLocalPlayer();
////	}
////
////	player.hud.HandleNamedEvent( "radioChatterUp" );
////
////	sound = this.spawnArgs.GetString( "snd_radiochatter", "" );
////	if ( sound && *sound ) {
////		shader = declManager.FindSound( sound );
////		player.StartSoundShader( shader, SND_CHANNEL_RADIO, SSF_GLOBAL, false, &length );
////		time = MS2SEC( length + 150 );
////	}
////	// we still put the hud up because this is used with no sound on 
////	// certain frame commands when the chatter is triggered
////	this.PostEventSec( &EV_ResetRadioHud, time, player );
////
////}
////
/////*
////================
////idFuncRadioChatter::Event_ResetRadioHud
////================
////*/
////void idFuncRadioChatter::Event_ResetRadioHud( activator:idEntity ) {
////	idPlayer *player = ( activator.IsType( idPlayer::Type ) ) ? static_cast<idPlayer *>( activator ) : gameLocal.GetLocalPlayer();
////	player.hud.HandleNamedEvent( "radioChatterDown" );
////	ActivateTargets( activator );
////}
////
////
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


	
/////*
////===============
////idPhantomObjects::idPhantomObjects
////===============
////*/
////idPhantomObjects::idPhantomObjects() {
////	target			= NULL;
////	end_time		= 0;
////	throw_time 		= 0.0f;
////	shake_time 		= 0.0f;
////	shake_ang.Zero();
////	speed			= 0.0f;
////	min_wait		= 0;
////	max_wait		= 0;
////	this.fl.neverDormant	= false;
////}
////
/////*
////===============
////idPhantomObjects::Save
////===============
////*/
////void idPhantomObjects::Save( idSaveGame *savefile ) const {
////	var/*int*/i:number;
////
////	savefile.WriteInt( end_time );
////	savefile.WriteFloat( throw_time );
////	savefile.WriteFloat( shake_time );
////	savefile.WriteVec3( shake_ang );
////	savefile.WriteFloat( speed );
////	savefile.WriteInt( min_wait );
////	savefile.WriteInt( max_wait );
////	target.Save( savefile );
////	savefile.WriteInt( targetTime.Num() );
////	for( i = 0; i < targetTime.Num(); i++ ) {
////		savefile.WriteInt( targetTime[ i ] );
////	}
////
////	for( i = 0; i < lastTargetPos.Num(); i++ ) {
////		savefile.WriteVec3( lastTargetPos[ i ] );
////	}
////}
////
/////*
////===============
////idPhantomObjects::Restore
////===============
////*/
////void idPhantomObjects::Restore( idRestoreGame *savefile ) {
////	int num;
////	var/*int*/i:number;
////
////	savefile.ReadInt( end_time );
////	savefile.ReadFloat( throw_time );
////	savefile.ReadFloat( shake_time );
////	savefile.ReadVec3( shake_ang );
////	savefile.ReadFloat( speed );
////	savefile.ReadInt( min_wait );
////	savefile.ReadInt( max_wait );
////	target.Restore( savefile );
////	
////	savefile.ReadInt( num );	
////	targetTime.SetGranularity( 1 );
////	targetTime.SetNum( num );
////	lastTargetPos.SetGranularity( 1 );
////	lastTargetPos.SetNum( num );
////
////	for( i = 0; i < num; i++ ) {
////		savefile.ReadInt( targetTime[ i ] );
////	}
////
////	if ( savefile.GetBuildNumber() == INITIAL_RELEASE_BUILD_NUMBER ) {
////		// these weren't saved out in the first release
////		for( i = 0; i < num; i++ ) {
////			lastTargetPos[ i ].Zero();
////		}
////	} else {
////		for( i = 0; i < num; i++ ) {
////			savefile.ReadVec3( lastTargetPos[ i ] );
////		}
////	}
////}
////
/////*
////===============
////idPhantomObjects::Spawn
////===============
////*/
////void idPhantomObjects::Spawn( ) {
////	throw_time = this.spawnArgs.GetFloat( "time", "5" );
////	speed = this.spawnArgs.GetFloat( "speed", "1200" );
////	shake_time = this.spawnArgs.GetFloat( "shake_time", "1" );
////	throw_time -= shake_time;
////	if ( throw_time < 0.0f ) {
////		throw_time = 0.0f;
////	}
////	min_wait = SEC2MS( this.spawnArgs.GetFloat( "min_wait", "1" ) );
////	max_wait = SEC2MS( this.spawnArgs.GetFloat( "max_wait", "3" ) );
////
////	shake_ang = this.spawnArgs.GetVector( "shake_ang", "65 65 65" );
////	this.Hide();
////	GetPhysics().SetContents( 0 );
////}
////
/////*
////================
////idPhantomObjects::Event_Activate
////================
////*/
////void idPhantomObjects::Event_Activate( activator:idEntity ) {
////	var/*int*/i:number;
////	var /*float*/time:number;
////	float frac;
////	float scale;
////
////	if ( thinkFlags & TH_THINK ) {
////		BecomeInactive( TH_THINK );
////		return;
////	}
////
////	RemoveNullTargets();
////	if ( !targets.Num() ) {
////		return;
////	}
////
////	if ( !activator || !activator.IsType( idActor::Type ) ) {
////		target = gameLocal.GetLocalPlayer();
////	} else {
////		target = static_cast<idActor *>( activator );
////	}
////	
////	end_time = gameLocal.time + SEC2MS( this.spawnArgs.GetFloat( "end_time", "0" ) );
////
////	targetTime.SetNum( targets.Num() );
////	lastTargetPos.SetNum( targets.Num() );
////
////	const idVec3 &toPos = target.GetEntity().GetEyePosition();
////
////    // calculate the relative times of all the objects
////	time = 0.0f;
////	for( i = 0; i < targetTime.Num(); i++ ) {
////		targetTime[ i ] = SEC2MS( time );
////		lastTargetPos[ i ] = toPos;
////
////		frac = 1.0f - ( float )i / ( float )targetTime.Num();
////		time += ( gameLocal.random.RandomFloat() + 1.0f ) * 0.5f * frac + 0.1f;
////	}
////
////	// scale up the times to fit within throw_time
////	scale = throw_time / time;
////	for( i = 0; i < targetTime.Num(); i++ ) {
////		targetTime[ i ] = gameLocal.time + SEC2MS( shake_time )+ targetTime[ i ] * scale;
////	}
////
////	BecomeActive( TH_THINK );
////}
////
/////*
////===============
////idPhantomObjects::Think
////================
////*/
////void idPhantomObjects::Think( ) {
////	int			i;
////	int			num;
////	float		time;
////	idVec3		vel;
////	idVec3		ang;
////	idEntity	*ent;
////	idActor		*targetEnt;
////	idPhysics	*entPhys;
////	trace_t		tr;
////
////	// if we are completely closed off from the player, don't do anything at all
////	if ( CheckDormant() ) {
////		return;
////	}
////
////	if ( !( thinkFlags & TH_THINK ) ) {
////		BecomeInactive( thinkFlags & ~TH_THINK );
////		return;
////	}
////
////	targetEnt = target.GetEntity();
////	if ( !targetEnt || ( targetEnt.health <= 0 ) || ( end_time && ( gameLocal.time > end_time ) ) || gameLocal.inCinematic ) {
////		BecomeInactive( TH_THINK );
////	}
////
////	const idVec3 &toPos = targetEnt.GetEyePosition();
////
////	num = 0;
////	for ( i = 0; i < targets.Num(); i++ ) {
////		ent = targets[ i ].GetEntity();
////		if ( !ent ) {
////			continue;
////		}
////		
////		if ( ent.fl.hidden ) {
////			// don't throw hidden objects
////			continue;
////		}
////
////		if ( !targetTime[ i ] ) {
////			// already threw this object
////			continue;
////		}
////
////		num++;
////
////		time = MS2SEC( targetTime[ i ] - gameLocal.time );
////		if ( time > shake_time ) {
////			continue;
////		}
////
////		entPhys = ent.GetPhysics();
////		const idVec3 &entOrg = entPhys.GetOrigin();
////
////		gameLocal.clip.TracePoint( tr, entOrg, toPos, MASK_OPAQUE, ent );
////		if ( tr.fraction >= 1.0f || ( gameLocal.GetTraceEntity( tr ) == targetEnt ) ) {
////			lastTargetPos[ i ] = toPos;
////		}
////
////		if ( time < 0.0f ) {
////			idAI::PredictTrajectory( entPhys.GetOrigin(), lastTargetPos[ i ], speed, entPhys.GetGravity(), 
////				entPhys.GetClipModel(), entPhys.GetClipMask(), 256.0f, ent, targetEnt, ai_debugTrajectory.GetBool() ? 1 : 0, vel );
////			vel *= speed;
////			entPhys.SetLinearVelocity( vel );
////			if ( !end_time ) {
////				targetTime[ i ] = 0;
////			} else {
////				targetTime[ i ] = gameLocal.time + gameLocal.random.RandomInt( max_wait - min_wait ) + min_wait;
////			}
////			if ( ent.IsType( idMoveable::Type ) ) {
////				idMoveable *ment = static_cast<idMoveable*>( ent );
////				ment.EnableDamage( true, 2.5f );
////			}
////		} else {
////			// this is not the right way to set the angular velocity, but the effect is nice, so I'm keeping it. :)
////			ang.Set( gameLocal.random.CRandomFloat() * shake_ang.x, gameLocal.random.CRandomFloat() * shake_ang.y, gameLocal.random.CRandomFloat() * shake_ang.z );
////			ang *= ( 1.0f - time / shake_time );
////			entPhys.SetAngularVelocity( ang );
////		}
////	}
////
////	if ( !num ) {
////		BecomeInactive( TH_THINK );
////	}
////}

};
//
//#endif /* !__GAME_MISC_H__ */
