/////*
////===========================================================================

////Doom 3 GPL Source Code
////Copyright (C) 1999-2011 id Software LLC, a ZeniMax Media company. 

////This file is part of the Doom 3 GPL Source Code (?Doom 3 Source Code?).  

////Doom 3 Source Code is free software: you can redistribute it and/or modify
////it under the terms of the GNU General Public License as published by
////the Free Software Foundation, either version 3 of the License, or
////(at your option) any later version.

////Doom 3 Source Code is distributed in the hope that it will be useful,
////but WITHOUT ANY WARRANTY; without even the implied warranty of
////MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
////GNU General Public License for more details.

////You should have received a copy of the GNU General Public License
////along with Doom 3 Source Code.  If not, see <http://www.gnu.org/licenses/>.

////In addition, the Doom 3 Source Code is also subject to certain additional terms. You should have received a copy of these additional terms immediately following the terms and conditions of the GNU General Public License which accompanied the Doom 3 Source Code.  If not, please request a copy in writing from id Software at the address below.

////If you have questions concerning this license or the applicable additional terms, you may contact in writing id Software LLC, c/o ZeniMax Media Inc., Suite 120, Rockville, Maryland 20850 USA.

////===========================================================================
////*/
/////*

////  SecurityCamera.cpp

////  Security camera that triggers targets when player is in view

////*/

////#include "../idlib/precompiled.h"
////#pragma hdrstop

////#include "Game_local.h"


/////***********************************************************************

////  idSecurityCamera
	
////***********************************************************************/

var EV_SecurityCam_ReverseSweep = new idEventDef( "<reverseSweep>" );
var EV_SecurityCam_ContinueSweep = new idEventDef( "<continueSweep>" );
var EV_SecurityCam_Pause = new idEventDef( "<pause>" );
var EV_SecurityCam_Alert = new idEventDef( "<alert>" );
var EV_SecurityCam_AddLight = new idEventDef( "<addLight>" );

////CLASS_DECLARATION( idEntity, idSecurityCamera )
idSecurityCamera.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idSecurityCamera;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idSecurityCamera.prototype.GetType = function ( ): idTypeInfo {
	return ( idSecurityCamera.Type );
};

idSecurityCamera.eventCallbacks = [
	EVENT( EV_SecurityCam_ReverseSweep,		idSecurityCamera.prototype.Event_ReverseSweep ),
	EVENT( EV_SecurityCam_ContinueSweep,	idSecurityCamera.prototype.Event_ContinueSweep ),
	EVENT( EV_SecurityCam_Pause,			idSecurityCamera.prototype.Event_Pause ),
	EVENT( EV_SecurityCam_Alert,			idSecurityCamera.prototype.Event_Alert ),
	EVENT( EV_SecurityCam_AddLight,			idSecurityCamera.prototype.Event_AddLight )
];

idSecurityCamera.Type = new idTypeInfo("idSecurityCamera", "idEntity",
	idSecurityCamera.eventCallbacks, idSecurityCamera.CreateInstance, idSecurityCamera.prototype.Spawn,
	idSecurityCamera.prototype.Save, idSecurityCamera.prototype.Restore );

////END_CLASS
