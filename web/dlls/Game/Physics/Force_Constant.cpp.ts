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

Constant force

===============================================================================
*/

class idForce_Constant extends idForce {
	//
	//public:
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idForce_Constant>[];
	//
	//	idForce_Constant(void);
	//	virtual				~idForce_Constant(void);
	//
	//
	//	void				Save(idSaveGame *savefile) const;
	//	void				Restore(idRestoreGame *savefile);
	//
	//	// constant force
	//	void				SetForce(const idVec3 &force);
	//	// set force position
	//	void				SetPosition(idPhysics *physics, int id, const idVec3 &point);
	//
	//	void				SetPhysics(idPhysics *physics);
	//
	//public: // common force interface
	//	virtual void		Evaluate(int time);
	//	virtual void		RemovePhysics(const idPhysics *phys);
	//
	//private:
	//	// force properties
	//	idVec3				force;
	//	idPhysics *			physics;
	//	int					id;
	//	idVec3				point;
	//};
	//
	//#endif /* !__FORCE_CONSTANT_H__ */
	//
	//
	///*
	//================
	//idForce_Constant::idForce_Constant
	//================
	//*/
	//idForce_Constant::idForce_Constant( void ) {
	//	force		= vec3_zero;
	//	physics		= NULL;
	//	id			= 0;
	//	point		= vec3_zero;
	//}
	//
	///*
	//================
	//idForce_Constant::~idForce_Constant
	//================
	//*/
	//idForce_Constant::~idForce_Constant( void ) {
	//}
	//
	///*
	//================
	//idForce_Constant::Save
	//================
	//*/
	//void idForce_Constant::Save( idSaveGame *savefile ) const {
	//	savefile.WriteVec3( force );
	//	savefile.WriteInt( id );
	//	savefile.WriteVec3( point );
	//}
	//
	///*
	//================
	//idForce_Constant::Restore
	//================
	//*/
	//void idForce_Constant::Restore( idRestoreGame *savefile ) {
	//	// Owner needs to call SetPhysics!!
	//	savefile.ReadVec3( force );
	//	savefile.ReadInt( id );
	//	savefile.ReadVec3( point );
	//}
	//
	///*
	//================
	//idForce_Constant::SetPosition
	//================
	//*/
	//void idForce_Constant::SetPosition( idPhysics *physics, int id, const idVec3 &point ) {
	//	this.physics = physics;
	//	this.id = id;
	//	this.point = point;
	//}
	//
	///*
	//================
	//idForce_Constant::SetForce
	//================
	//*/
	//void idForce_Constant::SetForce( const idVec3 &force ) {
	//	this.force = force;
	//}
	//
	///*
	//================
	//idForce_Constant::SetPhysics
	//================
	//*/
	//void idForce_Constant::SetPhysics( idPhysics *physics ) {
	//	this.physics = physics;
	//}
	//
	///*
	//================
	//idForce_Constant::Evaluate
	//================
	//*/
	//void idForce_Constant::Evaluate( int time ) {
	//	idVec3 p;
	//
	//	if ( !physics ) {
	//		return;
	//	}
	//
	//	p = physics.GetOrigin( id ) + point * physics.GetAxis( id );
	//
	//	physics.AddForce( id, p, force );
	//}
	//
	///*
	//================
	//idForce_Constant::RemovePhysics
	//================
	//*/
	//void idForce_Constant::RemovePhysics( const idPhysics *phys ) {
	//	if ( physics == phys ) {
	//		physics = NULL;
	//	}
	//}
}

idForce_Constant.CreateInstance = function() : idClass{
	try {
		var ptr = new idForce_Constant;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idForce_Constant.prototype.GetType = function ( ): idTypeInfo {
	return ( idForce_Constant.Type );
};

idForce_Constant.eventCallbacks = [
];

idForce_Constant.Type = new idTypeInfo( "idForce_Constant", "idForce",
	idForce_Constant.eventCallbacks, idForce_Constant.CreateInstance, idForce_Constant.prototype.Spawn,
	idForce_Constant.prototype.Save, idForce_Constant.prototype.Restore );

//END_CLASS