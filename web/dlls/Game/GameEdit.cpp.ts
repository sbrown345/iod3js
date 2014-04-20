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

/*
===============================================================================

	Ingame cursor.

===============================================================================
*/

////CLASS_DECLARATION( idEntity, idCursor3D )
idCursor3D.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idCursor3D;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idCursor3D.prototype.GetType = function ( ): idTypeInfo {
	return ( idCursor3D.Type );
};

idCursor3D.eventCallbacks = [
];

idCursor3D.Type = new idTypeInfo( "idCursor3D", "idEntity",
	idCursor3D.eventCallbacks, idCursor3D.CreateInstance, idCursor3D.prototype.Spawn,
	idCursor3D.prototype.Save, idCursor3D.prototype.Restore );

////END_CLASS
////
////
/////*
////===============================================================================
////
////	Allows entities to be dragged through the world with physics.
////
////===============================================================================
////*/
////
////#define MAX_DRAG_TRACE_DISTANCE			2048.0f
////