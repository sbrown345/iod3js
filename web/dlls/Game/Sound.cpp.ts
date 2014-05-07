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
////  SOUND
////
////===============================================================================
////*/
////
var EV_Speaker_On = new idEventDef( "On", null );
var EV_Speaker_Off = new idEventDef("Off", null );
var EV_Speaker_Timer = new idEventDef("<timer>", null );
////
////CLASS_DECLARATION( idEntity, idSound )
idSound.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idSound;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idSound.prototype.GetType = function ( ): idTypeInfo {
	return ( idSound.Type );
};

idSound.eventCallbacks = [
	EVENT( EV_Activate,				idSound.prototype.Event_Trigger ),
	EVENT( EV_Speaker_On,			idSound.prototype.Event_On ),
	EVENT( EV_Speaker_Off,			idSound.prototype.Event_Off ),
	EVENT( EV_Speaker_Timer,		idSound.prototype.Event_Timer )
];

idSound.Type = new idTypeInfo("idSound", "idEntity",
	idSound.eventCallbacks, idSound.CreateInstance, idSound.prototype.Spawn,
	idSound.prototype.Save, idSound.prototype.Restore );

////END_CLASS
////
