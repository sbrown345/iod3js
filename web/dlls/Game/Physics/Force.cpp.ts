/*
===========================================================================

Doom 3 GPL Source Code
Copyright (C) 1999-2011 id Software LLC, a ZeniMax Media company. 

This file is part of the Doom 3 GPL Source Code (?Doom 3 Source Code?).  

Doom 3 Source Code is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Doom 3 Source Code is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with Doom 3 Source Code.  If not, see <http://www.gnu.org/licenses/>.

In addition, the Doom 3 Source Code is also subject to certain additional terms. You should have received a copy of these additional terms immediately following the terms and conditions of the GNU General Public License which accompanied the Doom 3 Source Code.  If not, please request a copy in writing from id Software at the address below.

If you have questions concerning this license or the applicable additional terms, you may contact in writing id Software LLC, c/o ZeniMax Media Inc., Suite 120, Rockville, Maryland 20850 USA.

===========================================================================
*/

//#include "../../idlib/precompiled.h"
//#pragma hdrstop

//#include "../Game_local.h"




/*
===============================================================================

	Force base class

	A force object applies a force to a physics object.

===============================================================================
*/

//class idEntity;
//class idPhysics;

class idForce extends idClass {
	//
	//public:
	//	CLASS_PROTOTYPE( idForce );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idForce>[];
	//
	//						idForce( void );
	//	virtual				~idForce( void );
	//	static void			DeletePhysics( const idPhysics *phys );
	//	static void			ClearForceList( void );
	//
	//public: // common force interface
	//						// evalulate the force up to the given time
	//	virtual void		Evaluate( int time );
	//						// removes any pointers to the physics object
	//	virtual void		RemovePhysics( const idPhysics *phys );
	//
	//private:
	//
	//	static idList<idForce*> forceList;
	//};
	//
	//#endif /* !__FORCE_H__ */

	//
	///*
	//================
	//idForce::idForce
	//================
	//*/
	//idForce::idForce( void ) {
	//	forceList.Append( this );
	//}
	//
	///*
	//================
	//idForce::~idForce
	//================
	//*/
	//idForce::~idForce( void ) {
	//	forceList.Remove( this );
	//}
	//
	///*
	//================
	//idForce::DeletePhysics
	//================
	//*/
	//void idForce::DeletePhysics( const idPhysics *phys ) {
	//	var/*int*/i:number;
	//
	//	for ( i = 0; i < forceList.Num(); i++ ) {
	//		forceList[i]->RemovePhysics( phys );
	//	}
	//}
	//
	///*
	//================
	//idForce::ClearForceList
	//================
	//*/
	//void idForce::ClearForceList( void ) {
	//	forceList.Clear();
	//}
	//
	///*
	//================
	//idForce::Evaluate
	//================
	//*/
	//void idForce::Evaluate( int time ) {
	//}
	//
	///*
	//================
	//idForce::RemovePhysics
	//================
	//*/
	//void idForce::RemovePhysics( const idPhysics *phys ) {
	//}
}

//CLASS_DECLARATION( idClass, idForce )
idForce.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idForce;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idForce.prototype.GetType = function ( ): idTypeInfo {
	return ( idForce.Type );
};

idForce.eventCallbacks = [
];

idForce.Type = new idTypeInfo("idForce", "idClass",
	idForce.eventCallbacks, idForce.CreateInstance, idForce.prototype.Spawn,
	idForce.prototype.Save, idForce.prototype.Restore );


//END_CLASS

//idList<idForce*> idForce::forceList;