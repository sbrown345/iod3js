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
////  idCamera
////
////  Base class for cameras
////
////===============================================================================
////*/
////
////ABSTRACT_DECLARATION( idEntity, idCamera )
idCamera.CreateInstance = function ( ): idClass {
	gameLocal.Error( "Cannot instanciate abstract class %s.", idCamera );
	return null;
};

idCamera.prototype.GetType = function ( ): idTypeInfo {
	return ( idCamera.Type );
};

idCamera.eventCallbacks = [
];

idCamera.Type = new idTypeInfo("idCamera", "idEntity",
	idCamera.eventCallbacks, idCamera.CreateInstance, idCamera.prototype.Spawn,
	idCamera.prototype.Save, idCamera.prototype.Restore );

////END_CLASS


/***********************************************************************

  idCameraView

***********************************************************************/
var EV_Camera_SetAttachments = new idEventDef( "<getattachments>", null );
////
////CLASS_DECLARATION( idCamera, idCameraView )
idCameraView.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idCameraView;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idCameraView.prototype.GetType = function ( ): idTypeInfo {
	return ( idCameraView.Type );
};

idCameraView.eventCallbacks = [
	EVENT(EV_Activate, idCameraView.prototype.Event_Activate),
	EVENT(EV_Camera_SetAttachments, idCameraView.prototype.Event_SetAttachments)
];

idCameraView.Type = new idTypeInfo("idCameraView", "idCamera",
	idCameraView.eventCallbacks, idCameraView.CreateInstance, idCameraView.prototype.Spawn,
	idCameraView.prototype.Save, idCameraView.prototype.Restore );

////	
////	
////END_CLASS
////
////
/*
===============================================================================

  idCameraAnim

===============================================================================
*/

var EV_Camera_Start = new idEventDef( "start", null );
var EV_Camera_Stop = new idEventDef( "stop", null );
////
////CLASS_DECLARATION( idCamera, idCameraAnim )
idCameraAnim.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idCameraAnim;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idCameraAnim.prototype.GetType = function ( ): idTypeInfo {
	return ( idCameraAnim.Type );
};

idCameraAnim.eventCallbacks = [
	EVENT(EV_Thread_SetCallback, idCameraAnim.prototype.Event_SetCallback),
	EVENT(EV_Camera_Stop, idCameraAnim.prototype.Event_Stop),
	EVENT(EV_Camera_Start, idCameraAnim.prototype.Event_Start),
	EVENT(EV_Activate, idCameraAnim.prototype.Event_Activate)
];

idCameraAnim.Type = new idTypeInfo("idCameraAnim", "idCamera",
	idCameraAnim.eventCallbacks, idCameraAnim.CreateInstance, idCameraAnim.prototype.Spawn,
	idCameraAnim.prototype.Save, idCameraAnim.prototype.Restore );

////	
////	
////	
////	
////END_CLASS
////