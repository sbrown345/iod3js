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
////#ifndef __GAME_TRIGGER_H__
////#define __GAME_TRIGGER_H__
////
////extern const idEventDef EV_Enable;
////extern const idEventDef EV_Disable;

/*
===============================================================================

  Trigger base.

===============================================================================
*/

class idTrigger extends idEntity {
////public:
////	CLASS_PROTOTYPE( idTrigger );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idTrigger>[];
////
////	static void			DrawDebugInfo( );
////
////						idTrigger();
////	Spawn():void{throw "placeholder";}
////
////	const function_t *	GetScriptFunction( ) const;
////
////	Save(savefile:idSaveGame):void{throw "placeholder";}
////	Restore(savefile:idRestoreGame):void{throw "placeholder";}
////
////	virtual void		Enable( ): void { throw "placeholder"; }
////	virtual void		Disable( ): void { throw "placeholder"; }
////
////protected:
////	void				CallScript( ) const;
////
	Event_Enable( ): void { throw "placeholder"; }
	Event_Disable( ): void { throw "placeholder"; }
////
////	const function_t *	scriptFunction;

	
/////*
////================
////idTrigger::DrawDebugInfo
////================
////*/
////void idTrigger::DrawDebugInfo( ) {
////	idMat3		axis = gameLocal.GetLocalPlayer().viewAngles.ToMat3();
////	idVec3		up = axis[ 2 ] * 5.0;
////	idBounds	viewTextBounds( gameLocal.GetLocalPlayer().GetPhysics().GetOrigin() );
////	idBounds	viewBounds( gameLocal.GetLocalPlayer().GetPhysics().GetOrigin() );
////	idBounds	box( idVec3( -4.0, -4.0, -4.0 ), idVec3( 4.0, 4.0, 4.0 ) );
////	idEntity	*ent;
////	idEntity	*target;
////	int			i;
////	bool		show;
////	const function_t *func;
////
////	viewTextBounds.ExpandSelf( 128.0 );
////	viewBounds.ExpandSelf( 512.0 );
////	for( ent = gameLocal.spawnedEntities.Next(); ent != NULL; ent = ent.spawnNode.Next() ) {
////		if ( ent.GetPhysics().GetContents() & ( CONTENTS_TRIGGER | CONTENTS_FLASHLIGHT_TRIGGER ) ) {
////			show = viewBounds.IntersectsBounds( ent.GetPhysics().GetAbsBounds() );
////			if ( !show ) {
////				for( i = 0; i < ent.targets.Num(); i++ ) {
////					target = ent.targets[ i ].GetEntity();
////					if ( target && viewBounds.IntersectsBounds( target.GetPhysics().GetAbsBounds() ) ) {
////						show = true;
////						break;
////					}
////				}
////			}
////
////			if ( !show ) {
////				continue;
////			}
////
////			gameRenderWorld.DebugBounds( colorOrange, ent.GetPhysics().GetAbsBounds() );
////			if ( viewTextBounds.IntersectsBounds( ent.GetPhysics().GetAbsBounds() ) ) {
////				gameRenderWorld.DrawText( ent.name.c_str(), ent.GetPhysics().GetAbsBounds().GetCenter(), 0.1f, colorWhite, axis, 1 );
////				gameRenderWorld.DrawText( ent.GetEntityDefName(), ent.GetPhysics().GetAbsBounds().GetCenter() + up, 0.1f, colorWhite, axis, 1 );
////				if ( ent.IsType( idTrigger::Type ) ) {
////					func = static_cast<idTrigger *>( ent ).GetScriptFunction();
////				} else {
////					func = NULL;
////				}
////
////				if ( func ) {
////					gameRenderWorld.DrawText( va( "call script '%s'", func.Name() ), ent.GetPhysics().GetAbsBounds().GetCenter() - up, 0.1f, colorWhite, axis, 1 );
////				}
////			}
////
////			for( i = 0; i < ent.targets.Num(); i++ ) {
////				target = ent.targets[ i ].GetEntity();
////				if ( target ) {
////					gameRenderWorld.DebugArrow( colorYellow, ent.GetPhysics().GetAbsBounds().GetCenter(), target.GetPhysics().GetOrigin(), 10, 0 );
////					gameRenderWorld.DebugBounds( colorGreen, box, target.GetPhysics().GetOrigin() );
////					if ( viewTextBounds.IntersectsBounds( target.GetPhysics().GetAbsBounds() ) ) {
////						gameRenderWorld.DrawText( target.name.c_str(), target.GetPhysics().GetAbsBounds().GetCenter(), 0.1f, colorWhite, axis, 1 );
////					}
////				}
////			}
////		}
////	}
////}
////
/*
================
idTrigger::Enable
================
*/
	Enable ( ): void {
		this.GetPhysics ( ).SetContents( contentsFlags_t.CONTENTS_TRIGGER );
		this.GetPhysics ( ).EnableClip ( );
	}

/////*
////================
////idTrigger::Disable
////================
////*/
////void idTrigger::Disable( ) {
////	// we may be relinked if we're bound to another object, so clear the contents as well
////	this.GetPhysics().SetContents( 0 );
////	this.GetPhysics().DisableClip();
////}
////
/////*
////================
////idTrigger::CallScript
////================
////*/
////void idTrigger::CallScript( ) const {
////	idThread *thread;
////
////	if ( scriptFunction ) {
////		thread = new idThread( scriptFunction );
////		thread.DelayedStart( 0 );
////	}
////}
////
/////*
////================
////idTrigger::GetScriptFunction
////================
////*/
////const function_t *idTrigger::GetScriptFunction( ) const {
////	return scriptFunction;
////}
////
/////*
////================
////idTrigger::Save
////================
////*/
////void idTrigger::Save( idSaveGame *savefile ) const {
////	if ( scriptFunction ) {
////		savefile.WriteString( scriptFunction.Name() );
////	} else {
////		savefile.WriteString( "" );
////	}
////}
////
/////*
////================
////idTrigger::Restore
////================
////*/
////void idTrigger::Restore( idRestoreGame *savefile ) {
////	idStr funcname;
////	savefile.ReadString( funcname );
////	if ( funcname.Length() ) {
////		scriptFunction = gameLocal.program.FindFunction( funcname );
////		if ( scriptFunction == NULL ) {
////			gameLocal.Warning( "idTrigger_Multi '%s' at (%s) calls unknown function '%s'", name.c_str(), this.GetPhysics().GetOrigin().ToString(0), funcname.c_str() );
////		}
////	} else {
////		scriptFunction = NULL;
////	}
////}
////
/////*
////================
////idTrigger::Event_Enable
////================
////*/
////void idTrigger::Event_Enable( ) {
////	this.Enable();
////}
////
/////*
////================
////idTrigger::Event_Disable
////================
////*/
////void idTrigger::Event_Disable( ) {
////	Disable();
////}
////
/////*
////================
////idTrigger::idTrigger
////================
////*/
////idTrigger::idTrigger() {
////	scriptFunction = NULL;
////}
////
/////*
////================
////idTrigger::Spawn
////================
////*/
////void idTrigger::Spawn( ) {
////	this.GetPhysics().SetContents( CONTENTS_TRIGGER );
////
////	idStr funcname = this.spawnArgs.GetString( "call", "" );
////	if ( funcname.Length() ) {
////		scriptFunction = gameLocal.program.FindFunction( funcname );
////		if ( scriptFunction == NULL ) {
////			gameLocal.Warning( "trigger '%s' at (%s) calls unknown function '%s'", name.c_str(), this.GetPhysics().GetOrigin().ToString(0), funcname.c_str() );
////		}
////	} else {
////		scriptFunction = NULL;
////	}
////}

};


/*
===============================================================================

  Trigger which can be activated multiple times.

===============================================================================
*/

class idTrigger_Multi extends idTrigger {
////public:
////	CLASS_PROTOTYPE( idTrigger_Multi );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idTrigger_Multi>[];
////
////						idTrigger_Multi( );
////
////	Spawn():void{throw "placeholder";}
////
////	Save(savefile:idSaveGame):void{throw "placeholder";}
////	Restore(savefile:idRestoreGame):void{throw "placeholder";}
////
////private:
////	float				wait;
////	float				random;
////	float				delay;
////	float				random_delay;
////	int					nextTriggerTime;
////	idStr				requires;
////	int					removeItem;
////	bool				touchClient;
////	bool				touchOther;
////	bool				triggerFirst;
////	bool				triggerWithSelf;
////
	CheckFacing( activator:idEntity ): boolean { throw "placeholder"; }
	TriggerAction( activator:idEntity ): void { throw "placeholder"; }
	Event_TriggerAction( activator:idEntity ): void { throw "placeholder"; }
	Event_Trigger( activator:idEntity ): void { throw "placeholder"; }
	Event_Touch(other: idEntity, trace: trace_t): void { throw "placeholder"; }

	
////
/////*
////================
////idTrigger_Multi::idTrigger_Multi
////================
////*/
////idTrigger_Multi::idTrigger_Multi( ) {
////	wait = 0.0;
////	random = 0.0;
////	delay = 0.0;
////	random_delay = 0.0;
////	nextTriggerTime = 0;
////	removeItem = 0;
////	touchClient = false;
////	touchOther = false;
////	triggerFirst = false;
////	triggerWithSelf = false;
////}
////
/////*
////================
////idTrigger_Multi::Save
////================
////*/
////void idTrigger_Multi::Save( idSaveGame *savefile ) const {
////	savefile.WriteFloat( wait );
////	savefile.WriteFloat( random );
////	savefile.WriteFloat( delay );
////	savefile.WriteFloat( random_delay );
////	savefile.WriteInt( nextTriggerTime );
////	savefile.WriteString( requires );
////	savefile.WriteInt( removeItem );
////	savefile.WriteBool( touchClient );
////	savefile.WriteBool( touchOther );
////	savefile.WriteBool( triggerFirst );
////	savefile.WriteBool( triggerWithSelf );
////}
////
/////*
////================
////idTrigger_Multi::Restore
////================
////*/
////void idTrigger_Multi::Restore( idRestoreGame *savefile ) {
////	savefile.ReadFloat( wait );
////	savefile.ReadFloat( random );
////	savefile.ReadFloat( delay );
////	savefile.ReadFloat( random_delay );
////	savefile.ReadInt( nextTriggerTime );
////	savefile.ReadString( requires );
////	savefile.ReadInt( removeItem );
////	savefile.ReadBool( touchClient );
////	savefile.ReadBool( touchOther );
////	savefile.ReadBool( triggerFirst );
////	savefile.ReadBool( triggerWithSelf );
////}
////
/////*
////================
////idTrigger_Multi::Spawn
////
////"wait" : Seconds between triggerings, 0.5 default, -1 = one time only.
////"call" : Script function to call when triggered
////"random"	wait variance, default is 0
////Variable sized repeatable trigger.  Must be targeted at one or more entities.
////so, the basic time between firing is a random time between
////(wait - random) and (wait + random)
////================
////*/
////void idTrigger_Multi::Spawn( ) {
////	this.spawnArgs.GetFloat( "wait", "0.5", wait );
////	this.spawnArgs.GetFloat( "random", "0", random );
////	this.spawnArgs.GetFloat( "delay", "0", delay );
////	this.spawnArgs.GetFloat( "random_delay", "0", random_delay );
////	
////	if ( random && ( random >= wait ) && ( wait >= 0 ) ) {
////		random = wait - 1;
////		gameLocal.Warning( "idTrigger_Multi '%s' at (%s) has random >= wait", name.c_str(), this.GetPhysics().GetOrigin().ToString(0) );
////	}
////
////	if ( random_delay && ( random_delay >= delay ) && ( delay >= 0 ) ) {
////		random_delay = delay - 1;
////		gameLocal.Warning( "idTrigger_Multi '%s' at (%s) has random_delay >= delay", name.c_str(), this.GetPhysics().GetOrigin().ToString(0) );
////	}
////
////	this.spawnArgs.GetString( "requires", "", requires );
////	this.spawnArgs.GetInt( "removeItem", "0", removeItem );
////	this.spawnArgs.GetBool( "triggerFirst", "0", triggerFirst );
////	this.spawnArgs.GetBool( "triggerWithSelf", "0", triggerWithSelf );
////
////	if ( this.spawnArgs.GetBool( "anyTouch" ) ) {
////		touchClient = true;
////		touchOther = true;
////	} else if ( this.spawnArgs.GetBool( "noTouch" ) ) {
////		touchClient = false;
////		touchOther = false;
////	} else if ( this.spawnArgs.GetBool( "noClient" ) ) {
////		touchClient = false;
////		touchOther = true;
////	} else {
////		touchClient = true;
////		touchOther = false;
////	}
////
////	nextTriggerTime = 0;
////
////	if ( this.spawnArgs.GetBool( "flashlight_trigger" ) ) {
////		this.GetPhysics().SetContents( CONTENTS_FLASHLIGHT_TRIGGER );
////	} else {
////		this.GetPhysics().SetContents( CONTENTS_TRIGGER );
////	}
////}
////
/////*
////================
////idTrigger_Multi::CheckFacing
////================
////*/
////bool idTrigger_Multi::CheckFacing( activator:idEntity ) {
////	if ( this.spawnArgs.GetBool( "facing" ) ) {
////		if ( !activator.IsType( idPlayer::Type ) ) {
////			return true;
////		}
////		idPlayer *player = static_cast< idPlayer* >( activator );
////		float dot = player.viewAngles.ToForward() * this.GetPhysics().GetAxis()[0];
////		/*float*/angle:number = RAD2DEG( idMath::ACos( dot ) );
////		if ( angle  > this.spawnArgs.GetFloat( "angleLimit", "30" ) ) {
////			return false;
////		}
////	}
////	return true;
////}
////
////
/////*
////================
////idTrigger_Multi::TriggerAction
////================
////*/
////void idTrigger_Multi::TriggerAction( activator:idEntity ) {
////	ActivateTargets( triggerWithSelf ? this : activator );
////	CallScript();
////
////	if ( wait >= 0 ) {
////		nextTriggerTime = gameLocal.time + SEC2MS( wait + random * gameLocal.random.CRandomFloat() );
////	} else {
////		// we can't just remove (this) here, because this is a touch function
////		// called while looping through area links...
////		nextTriggerTime = gameLocal.time + 1;
////		PostEventMS( &EV_Remove, 0 );
////	}
////}
////
/////*
////================
////idTrigger_Multi::Event_TriggerAction
////================
////*/
////void idTrigger_Multi::Event_TriggerAction( activator:idEntity ) {
////	TriggerAction( activator );
////}
////
/////*
////================
////idTrigger_Multi::Event_Trigger
////
////the trigger was just activated
////activated should be the entity that originated the activation sequence (ie. the original target)
////activator should be set to the activator so it can be held through a delay
////so wait for the delay time before firing
////================
////*/
////void idTrigger_Multi::Event_Trigger( activator:idEntity ) {
////	if ( nextTriggerTime > gameLocal.time ) {
////		// can't retrigger until the wait is over
////		return;
////	}
////
////	// see if this trigger requires an item
////	if ( !gameLocal.RequirementMet( activator, requires, removeItem ) ) {
////		return;
////	}
////
////	if ( !CheckFacing( activator ) ) {
////		return;
////	}
////
////	if ( triggerFirst ) {
////		triggerFirst = false;
////		return;
////	}
////
////	// don't allow it to trigger twice in a single frame
////	nextTriggerTime = gameLocal.time + 1;
////
////	if ( delay > 0 ) {
////		// don't allow it to trigger again until our delay has passed
////		nextTriggerTime += SEC2MS( delay + random_delay * gameLocal.random.CRandomFloat() );
////		PostEventSec( &EV_TriggerAction, delay, activator );
////	} else {
////		TriggerAction( activator );
////	}
////}
////
/////*
////================
////idTrigger_Multi::Event_Touch
////================
////*/
////void idTrigger_Multi::Event_Touch( other:idEntity, trace:trace_t ) {
////	if( triggerFirst ) {
////		return;
////	}
////
////	bool player = other.IsType( idPlayer::Type );
////	if ( player ) {
////		if ( !touchClient ) {
////			return;
////		}
////		if ( static_cast< idPlayer * >( other ).spectating ) {
////			return;
////		}
////	} else if ( !touchOther ) {
////		return;
////	}
////
////	if ( nextTriggerTime > gameLocal.time ) {
////		// can't retrigger until the wait is over
////		return;
////	}
////
////	// see if this trigger requires an item
////	if ( !gameLocal.RequirementMet( other, requires, removeItem ) ) {
////		return;
////	}
////
////	if ( !CheckFacing( other ) ) {
////		return;
////	}
////
////	if ( this.spawnArgs.GetBool( "toggleTriggerFirst" ) ) {
////		triggerFirst = true;
////	}
////
////	nextTriggerTime = gameLocal.time + 1;
////	if ( delay > 0 ) {
////		// don't allow it to trigger again until our delay has passed
////		nextTriggerTime += SEC2MS( delay + random_delay * gameLocal.random.CRandomFloat() );
////		PostEventSec( &EV_TriggerAction, delay, other );
////	} else {
////		TriggerAction( other );
////	}
////}
};


/*
===============================================================================

  Trigger which can only be activated by an entity with a specific name.

===============================================================================
*/

class idTrigger_EntityName extends idTrigger {
////public:
////	CLASS_PROTOTYPE( idTrigger_EntityName );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idTrigger_EntityName>[];
////
////						idTrigger_EntityName( );
////
	Save(savefile:idSaveGame):void{throw "placeholder";}
	Restore(savefile:idRestoreGame):void{throw "placeholder";}
////
////	Spawn():void{throw "placeholder";}
////
////private:
////	float				wait;
////	float				random;
////	float				delay;
////	float				random_delay;
////	int					nextTriggerTime;
////	bool				triggerFirst;
////	idStr				entityName;
////
	TriggerAction( activator:idEntity ): void { throw "placeholder"; }
	Event_TriggerAction( activator:idEntity ): void { throw "placeholder"; }
	Event_Trigger( activator:idEntity ): void { throw "placeholder"; }
	Event_Touch(other: idEntity, trace: trace_t): void { throw "placeholder"; }

	
/////*
////================
////idTrigger_EntityName::idTrigger_EntityName
////================
////*/
////idTrigger_EntityName::idTrigger_EntityName( ) {
////	wait = 0.0;
////	random = 0.0;
////	delay = 0.0;
////	random_delay = 0.0;
////	nextTriggerTime = 0;
////	triggerFirst = false;
////}
////
/////*
////================
////idTrigger_EntityName::Save
////================
////*/
////void idTrigger_EntityName::Save( idSaveGame *savefile ) const {
////	savefile.WriteFloat( wait );
////	savefile.WriteFloat( random );
////	savefile.WriteFloat( delay );
////	savefile.WriteFloat( random_delay );
////	savefile.WriteInt( nextTriggerTime );
////	savefile.WriteBool( triggerFirst );
////	savefile.WriteString( entityName );
////}
////
/////*
////================
////idTrigger_EntityName::Restore
////================
////*/
////void idTrigger_EntityName::Restore( idRestoreGame *savefile ) {
////	savefile.ReadFloat( wait );
////	savefile.ReadFloat( random );
////	savefile.ReadFloat( delay );
////	savefile.ReadFloat( random_delay );
////	savefile.ReadInt( nextTriggerTime );
////	savefile.ReadBool( triggerFirst );
////	savefile.ReadString( entityName );
////}
////
/////*
////================
////idTrigger_EntityName::Spawn
////================
////*/
////void idTrigger_EntityName::Spawn( ) {
////	this.spawnArgs.GetFloat( "wait", "0.5", wait );
////	this.spawnArgs.GetFloat( "random", "0", random );
////	this.spawnArgs.GetFloat( "delay", "0", delay );
////	this.spawnArgs.GetFloat( "random_delay", "0", random_delay );
////	
////	if ( random && ( random >= wait ) && ( wait >= 0 ) ) {
////		random = wait - 1;
////		gameLocal.Warning( "idTrigger_EntityName '%s' at (%s) has random >= wait", name.c_str(), this.GetPhysics().GetOrigin().ToString(0) );
////	}
////
////	if ( random_delay && ( random_delay >= delay ) && ( delay >= 0 ) ) {
////		random_delay = delay - 1;
////		gameLocal.Warning( "idTrigger_EntityName '%s' at (%s) has random_delay >= delay", name.c_str(), this.GetPhysics().GetOrigin().ToString(0) );
////	}
////
////	this.spawnArgs.GetBool( "triggerFirst", "0", triggerFirst );
////
////	entityName = this.spawnArgs.GetString( "entityname" );
////	if ( !entityName.Length() ) {
////		gameLocal.Error( "idTrigger_EntityName '%s' at (%s) doesn't have 'entityname' key specified", name.c_str(), this.GetPhysics().GetOrigin().ToString(0) );
////	}
////
////	nextTriggerTime = 0;
////
////	if ( !this.spawnArgs.GetBool( "noTouch" ) ) {
////		this.GetPhysics().SetContents( CONTENTS_TRIGGER );
////	}
////}
////
/////*
////================
////idTrigger_EntityName::TriggerAction
////================
////*/
////void idTrigger_EntityName::TriggerAction( activator:idEntity ) {
////	ActivateTargets( activator );
////	CallScript();
////
////	if ( wait >= 0 ) {
////		nextTriggerTime = gameLocal.time + SEC2MS( wait + random * gameLocal.random.CRandomFloat() );
////	} else {
////		// we can't just remove (this) here, because this is a touch function
////		// called while looping through area links...
////		nextTriggerTime = gameLocal.time + 1;
////		PostEventMS( &EV_Remove, 0 );
////	}
////}
////
/////*
////================
////idTrigger_EntityName::Event_TriggerAction
////================
////*/
////void idTrigger_EntityName::Event_TriggerAction( activator:idEntity ) {
////	TriggerAction( activator );
////}
////
/////*
////================
////idTrigger_EntityName::Event_Trigger
////
////the trigger was just activated
////activated should be the entity that originated the activation sequence (ie. the original target)
////activator should be set to the activator so it can be held through a delay
////so wait for the delay time before firing
////================
////*/
////void idTrigger_EntityName::Event_Trigger( activator:idEntity ) {
////	if ( nextTriggerTime > gameLocal.time ) {
////		// can't retrigger until the wait is over
////		return;
////	}
////
////	if ( !activator || ( activator.name != entityName ) ) {
////		return;
////	}
////
////	if ( triggerFirst ) {
////		triggerFirst = false;
////		return;
////	}
////
////	// don't allow it to trigger twice in a single frame
////	nextTriggerTime = gameLocal.time + 1;
////
////	if ( delay > 0 ) {
////		// don't allow it to trigger again until our delay has passed
////		nextTriggerTime += SEC2MS( delay + random_delay * gameLocal.random.CRandomFloat() );
////		PostEventSec( &EV_TriggerAction, delay, activator );
////	} else {
////		TriggerAction( activator );
////	}
////}
////
/////*
////================
////idTrigger_EntityName::Event_Touch
////================
////*/
////void idTrigger_EntityName::Event_Touch( other:idEntity, trace:trace_t ) {
////	if( triggerFirst ) {
////		return;
////	}
////
////	if ( nextTriggerTime > gameLocal.time ) {
////		// can't retrigger until the wait is over
////		return;
////	}
////
////	if ( !other || ( other.name != entityName ) ) {
////		return;
////	}
////
////	nextTriggerTime = gameLocal.time + 1;
////	if ( delay > 0 ) {
////		// don't allow it to trigger again until our delay has passed
////		nextTriggerTime += SEC2MS( delay + random_delay * gameLocal.random.CRandomFloat() );
////		PostEventSec( &EV_TriggerAction, delay, other );
////	} else {
////		TriggerAction( other );
////	}
////}
////
};

/*
===============================================================================

  Trigger which repeatedly fires targets.

===============================================================================
*/

class idTrigger_Timer extends idTrigger {
////public:
////	CLASS_PROTOTYPE( idTrigger_Timer );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idTrigger_Timer>[];
////
////						idTrigger_Timer( );
////
	Save(savefile:idSaveGame):void{throw "placeholder";}
	Restore(savefile:idRestoreGame):void{throw "placeholder";}
////
////	Spawn():void{throw "placeholder";}
////
////	virtual void		Enable( );
////	virtual void		Disable( );
////
////private:
////	float				random;
////	float				wait;
////	bool				on;
////	float				delay;
////	idStr				onName;
////	idStr				offName;
////
	Event_Timer( ): void { throw "placeholder"; }
	Event_Use(activator: idEntity): void { throw "placeholder"; }

	
/////*
////================
////idTrigger_Timer::idTrigger_Timer
////================
////*/
////idTrigger_Timer::idTrigger_Timer( ) {
////	random = 0.0;
////	wait = 0.0;
////	on = false;
////	delay = 0.0;
////}
////
/////*
////================
////idTrigger_Timer::Save
////================
////*/
////void idTrigger_Timer::Save( idSaveGame *savefile ) const {
////	savefile.WriteFloat( random );
////	savefile.WriteFloat( wait );
////	savefile.WriteBool( on );
////	savefile.WriteFloat( delay );
////	savefile.WriteString( onName );
////	savefile.WriteString( offName );
////}
////
/////*
////================
////idTrigger_Timer::Restore
////================
////*/
////void idTrigger_Timer::Restore( idRestoreGame *savefile ) {
////	savefile.ReadFloat( random );
////	savefile.ReadFloat( wait );
////	savefile.ReadBool( on );
////	savefile.ReadFloat( delay );
////	savefile.ReadString( onName );
////	savefile.ReadString( offName );
////}
////
/////*
////================
////idTrigger_Timer::Spawn
////
////Repeatedly fires its targets.
////Can be turned on or off by using.
////================
////*/
////void idTrigger_Timer::Spawn( ) {
////	this.spawnArgs.GetFloat( "random", "1", random );
////	this.spawnArgs.GetFloat( "wait", "1", wait );
////	this.spawnArgs.GetBool( "start_on", "0", on );
////	this.spawnArgs.GetFloat( "delay", "0", delay );
////	onName = this.spawnArgs.GetString( "onName" );
////	offName = this.spawnArgs.GetString( "offName" );
////
////	if ( random >= wait && wait >= 0 ) {
////		random = wait - 0.001;
////		gameLocal.Warning( "idTrigger_Timer '%s' at (%s) has random >= wait", name.c_str(), this.GetPhysics().GetOrigin().ToString(0) );
////	}
////
////	if ( on ) {
////		PostEventSec( &EV_Timer, delay );
////	}
////}
////
/////*
////================
////idTrigger_Timer::Enable
////================
////*/
////void idTrigger_Timer::Enable( ) {
////	// if off, turn it on
////	if ( !on ) {
////		on = true;
////		PostEventSec( &EV_Timer, delay );
////	}
////}
////
/////*
////================
////idTrigger_Timer::Disable
////================
////*/
////void idTrigger_Timer::Disable( ) {
////	// if on, turn it off
////	if ( on ) {
////		on = false;
////		CancelEvents( &EV_Timer );
////	}
////}
////
/////*
////================
////idTrigger_Timer::Event_Timer
////================
////*/
////void idTrigger_Timer::Event_Timer( ) {
////	ActivateTargets( this );
////
////	// set time before next firing
////	if ( wait >= 0.0 ) {
////		PostEventSec( &EV_Timer, wait + gameLocal.random.CRandomFloat() * random );
////	}
////}
////
/////*
////================
////idTrigger_Timer::Event_Use
////================
////*/
////void idTrigger_Timer::Event_Use( activator:idEntity ) {
////	// if on, turn it off
////	if ( on ) {
////		if ( offName.Length() && offName.Icmp( activator.GetName() ) ) {
////			return;
////		}
////		on = false;
////		CancelEvents( &EV_Timer );
////	} else {
////		// turn it on
////		if ( onName.Length() && onName.Icmp( activator.GetName() ) ) {
////			return;
////		}
////		on = true;
////		PostEventSec( &EV_Timer, delay );
////	}
////}
////
};


/*
===============================================================================

  Trigger which fires targets after being activated a specific number of times.

===============================================================================
*/

class idTrigger_Count extends idTrigger {
////public:
////	CLASS_PROTOTYPE( idTrigger_Count );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idTrigger_Count>[];
////
////						idTrigger_Count( );
////
	Save(savefile:idSaveGame):void{throw "placeholder";}
	Restore(savefile:idRestoreGame):void{throw "placeholder";}
////
	//Spawn():void{throw "placeholder";}
////
////private:
	goal :number/*int*/;
	count :number/*int*/;
	delay :number/*float*/;

	Event_Trigger( activator:idEntity ): void { throw "placeholder"; }
	Event_TriggerAction(activator: idEntity): void { throw "placeholder"; }

	
/*
================
idTrigger_Count::idTrigger_Count
================
*/
	constructor ( ) {
		super ( );
		this.goal = 0;
		this.count = 0;
		this.delay = 0.0;
	}

/////*
////================
////idTrigger_Count::Save
////================
////*/
////void idTrigger_Count::Save( idSaveGame *savefile ) const {
////	savefile.WriteInt( goal );
////	savefile.WriteInt( count );
////	savefile.WriteFloat( delay );
////}
////
/////*
////================
////idTrigger_Count::Restore
////================
////*/
////void idTrigger_Count::Restore( idRestoreGame *savefile ) {
////	savefile.ReadInt( goal );
////	savefile.ReadInt( count );
////	savefile.ReadFloat( delay );
////}

/*
================
idTrigger_Count::Spawn
================
*/
	Spawn ( ): void {
		var $goal = new R( this.goal );
		this.spawnArgs.GetInt_R( "count", "1", $goal );
		this.goal = $goal.$;
		var $delay = new R( this.delay );
		this.spawnArgs.GetFloat_R( "delay", "0", $delay );
		this.delay = $delay.$;


		this.count = 0;
	}

/////*
////================
////idTrigger_Count::Event_Trigger
////================
////*/
////void idTrigger_Count::Event_Trigger( activator:idEntity ) {
////	// goal of -1 means trigger has been exhausted
////	if (goal >= 0) {
////		this.count++;
////		if ( this.count >= goal ) {
////			if (this.spawnArgs.GetBool("repeat")) {
////				this.count = 0;
////			} else {
////				goal = -1;
////			}
////			PostEventSec( &EV_TriggerAction, delay, activator );
////		}
////	}
////}
////
/////*
////================
////idTrigger_Count::Event_TriggerAction
////================
////*/
////void idTrigger_Count::Event_TriggerAction( activator:idEntity ) {
////	ActivateTargets( activator );
////	CallScript();
////	if ( goal == -1 ) {
////		PostEventMS( &EV_Remove, 0 );
////	}
////}
////
};


/*
===============================================================================

  Trigger which hurts touching entities.

===============================================================================
*/

class idTrigger_Hurt extends idTrigger {
////public:
////	CLASS_PROTOTYPE( idTrigger_Hurt );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idTrigger_Hurt>[];
////
////						idTrigger_Hurt( );
////
	Save(savefile:idSaveGame):void{throw "placeholder";}
	Restore(savefile:idRestoreGame):void{throw "placeholder";}
////
	//Spawn():void{throw "placeholder";}
////
////private:
	on:boolean;
	delay :number/*float*/;
	nextTime :number/*int*/;

	Event_Touch( other:idEntity, trace:trace_t ): void { throw "placeholder"; }
	Event_Toggle(activator: idEntity): void { throw "placeholder"; }



/*
================
idTrigger_Hurt::idTrigger_Hurt
================
*/
	constructor ( ) {
		super ( );
		this.on = false;
		this.delay = 0.0;
		this.nextTime = 0;
	}

/////*
////================
////idTrigger_Hurt::Save
////================
////*/
////void idTrigger_Hurt::Save( idSaveGame *savefile ) const {
////	savefile.WriteBool( on );
////	savefile.WriteFloat( delay );
////	savefile.WriteInt( this.nextTime );
////}
////
/////*
////================
////idTrigger_Hurt::Restore
////================
////*/
////void idTrigger_Hurt::Restore( idRestoreGame *savefile ) {
////	savefile.ReadBool( on );
////	savefile.ReadFloat( delay );
////	savefile.ReadInt( this.nextTime );
////}

/*
================
idTrigger_Hurt::Spawn

	Damages activator
	Can be turned on or off by using.
================
*/
	Spawn ( ) {
		var $on = new R( this.on );
		this.spawnArgs.GetBool_R( "on", "1", $on );
		this.on = $on.$;
		var $delay = new R( this.delay );
		this.spawnArgs.GetFloat_R( "delay", "1.0", $delay );
		this.delay = $delay.$;
		this.nextTime = gameLocal.time;
		this.Enable ( );
	}

/////*
////================
////idTrigger_Hurt::Event_Touch
////================
////*/
////void idTrigger_Hurt::Event_Touch( other:idEntity, trace:trace_t ) {
////	const char *damage;
////
////	if ( on && other && gameLocal.time >= this.nextTime ) {
////		damage = this.spawnArgs.GetString( "def_damage", "damage_painTrigger" );
////		other.Damage( NULL, NULL, vec3_origin, damage, 1.0, INVALID_JOINT );
////
////		ActivateTargets( other );
////		CallScript();
////
////		this.nextTime = gameLocal.time + SEC2MS( delay );
////	}
////}
////
/////*
////================
////idTrigger_Hurt::Event_Toggle
////================
////*/
////void idTrigger_Hurt::Event_Toggle( activator:idEntity ) {
////	on = !on;
////}
////
};


/*
===============================================================================

  Trigger which fades the player view.

===============================================================================
*/

class idTrigger_Fade extends idTrigger {
////public:
////
////	CLASS_PROTOTYPE( idTrigger_Fade );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idTrigger_Fade>[];
////
////private:
	Event_Trigger(activator: idEntity): void { throw "placeholder"; }

	
/////*
////================
////idTrigger_Fade::Event_Trigger
////================
////*/
////void idTrigger_Fade::Event_Trigger( activator:idEntity ) {
////	idVec4		fadeColor;
////	int			fadeTime;
////	idPlayer	*player;
////
////	player = gameLocal.GetLocalPlayer();
////	if ( player ) {
////		fadeColor = this.spawnArgs.GetVec4( "fadeColor", "0, 0, 0, 1" );
////		fadeTime = SEC2MS( this.spawnArgs.GetFloat( "fadeTime", "0.5" ) );
////		player.playerView.Fade( fadeColor, fadeTime );
////		PostEventMS( &EV_ActivateTargets, fadeTime, activator );
////	}
////}
////
};


/*
===============================================================================

  Trigger which continuously tests whether other entities are touching it.

===============================================================================
*/

class idTrigger_Touch extends idTrigger {
////public:
////
////	CLASS_PROTOTYPE( idTrigger_Touch );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idTrigger_Touch>[];
////
////						idTrigger_Touch( );
////
////	Spawn():void{throw "placeholder";}
////	virtual void		Think( );
////
////	void				Save( idSaveGame *savefile );
////	Restore(savefile:idRestoreGame):void{throw "placeholder";}
////
////	virtual void		Enable( );
////	virtual void		Disable( );
////
////	void				TouchEntities( );
////
////private:
////	idClipModel *		clipModel;
////
	Event_Trigger(activator: idEntity): void { throw "placeholder"; }

	
/////*
////================
////idTrigger_Touch::idTrigger_Touch
////================
////*/
////idTrigger_Touch::idTrigger_Touch( ) {
////	clipModel = NULL;
////}
////
/////*
////================
////idTrigger_Touch::Spawn
////================
////*/
////void idTrigger_Touch::Spawn( ) {
////	// get the clip model
////	clipModel = new idClipModel( this.GetPhysics().GetClipModel() );
////
////	// remove the collision model from the physics object
////	this.GetPhysics().SetClipModel( NULL, 1.0 );
////
////	if ( this.spawnArgs.GetBool( "start_on" ) ) {
////		BecomeActive( TH_THINK );
////	}
////}
////
/////*
////================
////idTrigger_Touch::Save
////================
////*/
////void idTrigger_Touch::Save( idSaveGame *savefile ) {
////	savefile.WriteClipModel( clipModel );
////}
////
/////*
////================
////idTrigger_Touch::Restore
////================
////*/
////void idTrigger_Touch::Restore( idRestoreGame *savefile ) {
////	savefile.ReadClipModel( clipModel );
////}
////
/////*
////================
////idTrigger_Touch::TouchEntities
////================
////*/
////void idTrigger_Touch::TouchEntities( ) {
////	int numClipModels, i;
////	idBounds bounds;
////	idClipModel *cm, *clipModelList[ MAX_GENTITIES ];
////
////	if ( clipModel == NULL || scriptFunction == NULL ) {
////		return;
////	}
////
////	bounds.FromTransformedBounds( clipModel.GetBounds(), clipModel.GetOrigin(), clipModel.GetAxis() );
////	numClipModels = gameLocal.clip.ClipModelsTouchingBounds( bounds, -1, clipModelList, MAX_GENTITIES );
////
////	for ( i = 0; i < numClipModels; i++ ) {
////		cm = clipModelList[ i ];
////
////		if ( !cm.IsTraceModel() ) {
////			continue;
////		}
////
////		idEntity *entity = cm.GetEntity();
////
////		if ( !entity ) {
////			continue;
////		}
////		
////		if ( !gameLocal.clip.ContentsModel( cm.GetOrigin(), cm, cm.GetAxis(), -1,
////									clipModel.Handle(), clipModel.GetOrigin(), clipModel.GetAxis() ) ) {
////			continue;
////		}
////
////		ActivateTargets( entity );
////
////		idThread *thread = new idThread();
////		thread.CallFunction( entity, scriptFunction, false );
////		thread.DelayedStart( 0 );
////	}
////}
////
/////*
////================
////idTrigger_Touch::Think
////================
////*/
////void idTrigger_Touch::Think( ) {
////	if ( thinkFlags & TH_THINK ) {
////		TouchEntities();
////	}
////	idEntity::Think();
////}
////
/////*
////================
////idTrigger_Touch::Event_Trigger
////================
////*/
////void idTrigger_Touch::Event_Trigger( activator:idEntity ) {
////	if ( thinkFlags & TH_THINK ) {
////		BecomeInactive( TH_THINK );
////	} else {
////		BecomeActive( TH_THINK );
////	}
////}
////
/////*
////================
////idTrigger_Touch::Enable
////================
////*/
////void idTrigger_Touch::Enable( ) {
////	BecomeActive( TH_THINK );
////}
////
/////*
////================
////idTrigger_Touch::Disable
////================
////*/
////void idTrigger_Touch::Disable( ) {
////	BecomeInactive( TH_THINK );
////}

};
////
////#endif /* !__GAME_TRIGGER_H__ */
