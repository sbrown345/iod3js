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
///*
//=============================================================================
//
//  MODEL TESTING
//
//Model viewing can begin with either "testmodel <modelname>"
//
//The names must be the full pathname after the basedir, like 
//"models/weapons/v_launch/tris.md3" or "players/male/tris.md3"
//
//Extension will default to ".ase" if not specified.
//
//Testmodel will create a fake entity 100 units in front of the current view
//position, directly facing the viewer.  It will remain immobile, so you can
//move around it to view it from different angles.
//
//  g_testModelRotate
//  g_testModelAnimate
//  g_testModelBlend
//
//=============================================================================
//*/
//
//#include "../../idlib/precompiled.h"
//#pragma hdrstop
//
//#include "../Game_local.h"
//
//CLASS_DECLARATION( idAnimatedEntity, idTestModel )
idTestModel.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idTestModel;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idTestModel.prototype.GetType = function ( ): idTypeInfo {
	return ( idTestModel.Type );
};

idTestModel.eventCallbacks = [
	EVENT( EV_FootstepLeft,			idTestModel.prototype.Event_Footstep ),
	EVENT( EV_FootstepRight,		idTestModel.prototype.Event_Footstep )	
];

idTestModel.Type = new idTypeInfo("idTestModel", "idAnimatedEntity",
	idTestModel.eventCallbacks, idTestModel.CreateInstance, idTestModel.prototype.Spawn,
	idTestModel.prototype.Save, idTestModel.prototype.Restore );

//END_CLASS
//