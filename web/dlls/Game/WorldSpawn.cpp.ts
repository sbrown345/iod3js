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
////game_worldspawn.cpp
////
////Worldspawn class.  Each map has one worldspawn which handles global spawnargs.
////
////*/
////
////#include "../idlib/precompiled.h"
////#pragma hdrstop
////
////#include "Game_local.h"

/*
===============================================================================

World entity.

===============================================================================
*/

class idWorldspawn extends idEntity {
	////public:
	////	CLASS_PROTOTYPE(idWorldspawn);
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idWorldspawn>[];
	////
	////	~idWorldspawn();
	////
	////	void			Spawn(void);
	////
	////	void			Save(idRestoreGame *savefile);
	////	void			Restore(idRestoreGame *savefile);
	////
	////private:
	Event_Remove(): void { throw "placeholder"; }
	////};
	////
	////#endif /* !__GAME_WORLDSPAWN_H__ */
	////
	/////*
	////================
	////idWorldspawn
	////
	////Every map should have exactly one worldspawn.
	////================
	////*/

	
	/*
	================
	idWorldspawn::Spawn
	================
	*/
	Spawn ( ): void {
		var scriptname = new idStr;
		var thread: idThread;
		var func: function_t;
		var kv: idKeyValue;

		assert( gameLocal.world == null );
		gameLocal.world = this;

		g_gravity.SetFloat( this.spawnArgs.GetFloat( "gravity", va( "%f", DEFAULT_GRAVITY ) ) );

		// disable stamina on hell levels
		if ( this.spawnArgs.GetBool( "no_stamina" ) ) {
			pm_stamina.SetFloat( 0.0 );
		}

		// load script
		scriptname.equals( gameLocal.GetMapName ( ) );
		scriptname.SetFileExtension( ".script" );
		if ( fileSystem.ReadFile( scriptname.data, null, null ) > 0 ) {
			gameLocal.program.CompileFile( scriptname.data );

			// call the main function by default
			func = gameLocal.program.FindFunction( "main" );
			if ( func != null ) {
				thread = new idThread( func );
				thread.DelayedStart( 0 );
			}
		}

		// call any functions specified in worldspawn
		kv = this.spawnArgs.MatchPrefix( "call" );
		while ( kv != null ) {
			func = gameLocal.program.FindFunction( kv.GetValue ( ).data );
			if ( func == null ) {
				gameLocal.Error( "Function '%s' not found in script for '%s' key on worldspawn", kv.GetValue ( ).c_str ( ), kv.GetKey ( ).c_str ( ) );
			}

			thread = new idThread( func );
			thread.DelayedStart( 0 );
			kv = this.spawnArgs.MatchPrefix( "call", kv );
		}
	}

	/////*
	////=================
	////idWorldspawn::Save
	////=================
	////*/
	////void idWorldspawn::Save( idRestoreGame *savefile ) {
	////}
	////
	/////*
	////=================
	////idWorldspawn::Restore
	////=================
	////*/
	////void idWorldspawn::Restore( idRestoreGame *savefile ) {
	////	assert( gameLocal.world == this );
	////
	////	g_gravity.SetFloat( this.spawnArgs.GetFloat( "gravity", va( "%f", DEFAULT_GRAVITY ) ) );
	////
	////	// disable stamina on hell levels
	////	if ( this.spawnArgs.GetBool( "no_stamina" ) ) {
	////		pm_stamina.SetFloat( 0.0 );
	////	}
	////}
	////
	/*
	================
	idWorldspawn::~idWorldspawn
	================
	*/
	destrcutor ( ): void {
		if ( gameLocal.world == this ) {
			gameLocal.world = null;
		}
	}

	/////*
	////================
	////idWorldspawn::Event_Remove
	////================
	////*/
	////void idWorldspawn::Event_Remove( ) {
	////	gameLocal.Error( "Tried to remove world" );
	////}
}


////CLASS_DECLARATION( idEntity, idWorldspawn )
idWorldspawn.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idWorldspawn;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idWorldspawn.prototype.GetType = function ( ): idTypeInfo {
	return ( idWorldspawn.Type );
};

idWorldspawn.eventCallbacks = [
	EVENT( EV_Remove,				idWorldspawn.prototype.Event_Remove ),
	EVENT( EV_SafeRemove,			idWorldspawn.prototype.Event_Remove )
];

idWorldspawn.Type = new idTypeInfo("idWorldspawn", "idEntity",
	idWorldspawn.eventCallbacks, idWorldspawn.CreateInstance, idWorldspawn.prototype.Spawn,
	idWorldspawn.prototype.Save, idWorldspawn.prototype.Restore );

////END_CLASS