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
//
//#include "../../idlib/precompiled.h"
//#pragma hdrstop
//
//#include "../Game_local.h"
//

//
//
//
//#ifndef __PHYSICS_PARAMETRIC_H__
//#define __PHYSICS_PARAMETRIC_H__

/*
===================================================================================

Parametric physics

Used for predefined or scripted motion. The motion of an object is completely
parametrized. By adjusting the parameters an object is forced to follow a
predefined path. The parametric physics is typically used for doors, bridges,
rotating fans etc.

===================================================================================
*/
//
class parametricPState_t{
	time :number/*int*/;					// physics time
	atRest :number/*int*/;					// set when simulation is suspended
	origin = new idVec3;					// world origin
	angles = new idAngles;					// world angles
	axis = new idMat3;					// world axis
	localOrigin = new idVec3;			// local origin
	localAngles = new idAngles;			// local angles
	linearExtrapolation = new idExtrapolate<idVec3>(idVec3);	// extrapolation based description of the position over time
	angularExtrapolation = new idExtrapolate<idAngles>(idAngles);	// extrapolation based description of the orientation over time
	linearInterpolation = new idInterpolateAccelDecelLinear<idVec3>(idVec3);	// interpolation based description of the position over time
	angularInterpolation = new idInterpolateAccelDecelLinear<idAngles>(idAngles);	// interpolation based description of the orientation over time
	spline:idCurve_Spline<idVec3> [];					// spline based description of the position over time
	splineInterpolate = new idInterpolateAccelDecelLinear</*float*/number>(Number);		// position along the spline over time
	useSplineAngles:boolean;		// set the orientation using the spline
}

class idPhysics_Parametric extends idPhysics_Base {
//
//public:
//	CLASS_PROTOTYPE(idPhysics_Parametric);
	static	Type:idTypeInfo;						
	static	CreateInstance( ): idClass {throw "placeholder";}
	GetType( ):idTypeInfo {throw "placeholder";}
	static	eventCallbacks : idEventFunc<idPhysics_Parametric>[];
	//
//	idPhysics_Parametric(void);
//	~idPhysics_Parametric(void);
//
//	void					Save(idSaveGame *savefile) const;
//	void					Restore(idRestoreGame *savefile);
//
//	void					SetPusher(int flags);
//	bool					IsPusher(void) const;
//
//	void					SetLinearExtrapolation(extrapolation_t type, int time, int duration, const idVec3 &base, const idVec3 &speed, const idVec3 &baseSpeed);
//	void					SetAngularExtrapolation(extrapolation_t type, int time, int duration, const idAngles &base, const idAngles &speed, const idAngles &baseSpeed);
//	extrapolation_t			GetLinearExtrapolationType(void) const;
//	extrapolation_t			GetAngularExtrapolationType(void) const;
//
//	void					SetLinearInterpolation(int time, int accelTime, int decelTime, int duration, const idVec3 &startPos, const idVec3 &endPos);
//	void					SetAngularInterpolation(int time, int accelTime, int decelTime, int duration, const idAngles &startAng, const idAngles &endAng);
//
//	void					SetSpline(idCurve_Spline<idVec3> *spline, int accelTime, int decelTime, bool useSplineAngles);
//	idCurve_Spline<idVec3> *GetSpline(void) const;
//	int						GetSplineAcceleration(void) const;
//	int						GetSplineDeceleration(void) const;
//	bool					UsingSplineAngles(void) const;
//
//	void					GetLocalOrigin(idVec3 &curOrigin) const;
//	void					GetLocalAngles(idAngles &curAngles) const;
//
//	void					GetAngles(idAngles &curAngles) const;
//
//public:	// common physics interface
//	void					SetClipModel(idClipModel *model, float density, /*int*/ id:number = 0, bool freeOld = true);
//	idClipModel *			GetClipModel(/*int*/ id:number = 0) const;
//	int						GetNumClipModels(void) const;
//
//	void					SetMass(float mass, /*int*/ id:number = -1);
//	float					GetMass(/*int*/ id:number = -1) const;
//
//	void					SetContents(int contents, /*int*/ id:number = -1);
//	int						GetContents(/*int*/ id:number = -1) const;
//
//	const idBounds &		GetBounds(/*int*/ id:number = -1) const;
//	const idBounds &		GetAbsBounds(/*int*/ id:number = -1) const;
//
//	bool					Evaluate(int timeStepMSec, int endTimeMSec);
//	void					UpdateTime(int endTimeMSec);
//	int						GetTime(void) const;
//
//	void					Activate(void);
//	bool					IsAtRest(void) const;
//	int						GetRestStartTime(void) const;
//	bool					IsPushable(void) const;
//
//	void					SaveState(void);
//	void					RestoreState(void);
//
//	void					SetOrigin(const idVec3 &newOrigin, /*int*/ id:number = -1);
//	void					SetAxis(const idMat3 &newAxis, /*int*/ id:number = -1);
//
//	void					Translate(const idVec3 &translation, /*int*/ id:number = -1);
//	void					Rotate(const idRotation &rotation, /*int*/ id:number = -1);
//
//	const idVec3 &			GetOrigin(/*int*/ id:number = 0) const;
//	const idMat3 &			GetAxis(/*int*/ id:number = 0) const;
//
//	void					SetLinearVelocity(const idVec3 &newLinearVelocity, /*int*/ id:number = 0);
//	void					SetAngularVelocity(const idVec3 &newAngularVelocity, /*int*/ id:number = 0);
//
//	const idVec3 &			GetLinearVelocity(/*int*/ id:number = 0) const;
//	const idVec3 &			GetAngularVelocity(/*int*/ id:number = 0) const;
//
//	void					DisableClip(void);
//	void					EnableClip(void);
//
//	void					UnlinkClip(void);
//	void					LinkClip(void);
//
//	void					SetMaster(idEntity *master, const bool orientated = true);
//
//	const trace_t *			GetBlockingInfo(void) const;
//	idEntity *				GetBlockingEntity(void) const;
//
//	int						GetLinearEndTime(void) const;
//	int						GetAngularEndTime(void) const;
//
//	void					WriteToSnapshot(idBitMsgDelta &msg) const;
//	void					ReadFromSnapshot(const idBitMsgDelta &msg);
//
//private:
	// parametric physics state
	current = new parametricPState_t;
	saved = new parametricPState_t;

	// pusher
	isPusher:boolean;
	clipModel:idClipModel;
	pushFlags :number/*int*/;

	// results of last evaluate
	pushResults = new trace_t;
	isBlocked:boolean;

	// master
	hasMaster:boolean;
	isOrientated:boolean;
//
//private:
//	bool					TestIfAtRest(void) const;
//	void					Rest(void);
//};
//
//#endif /* !__PHYSICS_PARAMETRIC_H__ */
//
//
/*
================
idPhysics_Parametric::Activate
================
*/
	Activate ( ) {
		this.current.atRest = -1;
		this.self.BecomeActive( TH_PHYSICS );
	}
//
///*
//================
//idPhysics_Parametric::TestIfAtRest
//================
//*/
//bool idPhysics_Parametric::TestIfAtRest( ) const {
//
//	if ( ( this.current.linearExtrapolation.GetExtrapolationType() & ~EXTRAPOLATION_NOSTOP ) == EXTRAPOLATION_NONE &&
//			( this.current.angularExtrapolation.GetExtrapolationType() & ~EXTRAPOLATION_NOSTOP ) == EXTRAPOLATION_NONE &&
//				this.current.linearInterpolation.GetDuration() == 0 &&
//					this.current.angularInterpolation.GetDuration() == 0 &&
//						this.current.spline == NULL ) {
//		return true;
//	}
//
//	if ( !this.current.linearExtrapolation.IsDone( this.current.time ) ) {
//		return false;
//	}
//
//	if ( !this.current.angularExtrapolation.IsDone( this.current.time ) ) {
//		return false;
//	}
//
//	if ( !this.current.linearInterpolation.IsDone( this.current.time ) ) {
//		return false;
//	}
//
//	if ( !this.current.angularInterpolation.IsDone( this.current.time ) ) {
//		return false;
//	}
//
//	if ( this.current.spline != NULL && !this.current.spline.IsDone( this.current.time ) ) {
//		return false;
//	}
//
//	return true;
//}
//
///*
//================
//idPhysics_Parametric::Rest
//================
//*/
//void idPhysics_Parametric::Rest( ) {
//	this.current.atRest = gameLocal.time;
//	this.self.BecomeInactive( TH_PHYSICS );
//}

/*
================
idPhysics_Parametric::idPhysics_Parametric
================
*/
constructor( ) {
	super ( );
	this.current.time = gameLocal.time;
	this.current.atRest = -1;
	this.current.useSplineAngles = false;
	this.current.origin.Zero();
	this.current.angles.Zero();
	this.current.axis.Identity();
	this.current.localOrigin.Zero();
	this.current.localAngles.Zero();
	this.current.linearExtrapolation.Init(0, 0, vec3_zero, vec3_zero, vec3_zero, extrapolation_t.EXTRAPOLATION_NONE );
	this.current.angularExtrapolation.Init(0, 0, ang_zero, ang_zero, ang_zero, extrapolation_t.EXTRAPOLATION_NONE );
	this.current.linearInterpolation.Init( 0, 0, 0, 0, vec3_zero, vec3_zero );
	this.current.angularInterpolation.Init( 0, 0, 0, 0, ang_zero, ang_zero );
	this.current.spline = null;
	this.current.splineInterpolate.Init( 0, 1, 1, 2, 0, 0 );

	this.saved = this.current;

	this.isPusher = false;
	this.pushFlags = 0;
	this.clipModel = null;
	this.isBlocked = false;
	this.pushResults.memset0 ( );

	this.hasMaster = false;
	this.isOrientated = false;
}

/*
================
idPhysics_Parametric::~idPhysics_Parametric
================
*/
//idPhysics_Parametric::~idPhysics_Parametric( ) {
//	if ( this.clipModel != NULL ) {
//		delete this.clipModel;
//		this.clipModel = NULL;
//	}
//	if ( this.current.spline != NULL ) {
//		delete this.current.spline;
//		this.current.spline = NULL;
//	}
//}
//
///*
//================
//idPhysics_Parametric_SavePState
//================
//*/
//void idPhysics_Parametric_SavePState( idSaveGame *savefile, const parametricPState_t &state ) {
//	savefile.WriteInt( state.time );
//	savefile.WriteInt( state.atRest );
//	savefile.WriteBool( state.useSplineAngles );
//	savefile.WriteVec3( state.origin );
//	savefile.WriteAngles( state.angles );
//	savefile.WriteMat3( state.axis );
//	savefile.WriteVec3( state.localOrigin );
//	savefile.WriteAngles( state.localAngles );
//
//	savefile.WriteInt( (int)state.linearExtrapolation.GetExtrapolationType() );
//	savefile.WriteFloat( state.linearExtrapolation.GetStartTime() );
//	savefile.WriteFloat( state.linearExtrapolation.GetDuration() );
//	savefile.WriteVec3( state.linearExtrapolation.GetStartValue() );
//	savefile.WriteVec3( state.linearExtrapolation.GetBaseSpeed() );
//	savefile.WriteVec3( state.linearExtrapolation.GetSpeed() );
//
//	savefile.WriteInt( (int)state.angularExtrapolation.GetExtrapolationType() );
//	savefile.WriteFloat( state.angularExtrapolation.GetStartTime() );
//	savefile.WriteFloat( state.angularExtrapolation.GetDuration() );
//	savefile.WriteAngles( state.angularExtrapolation.GetStartValue() );
//	savefile.WriteAngles( state.angularExtrapolation.GetBaseSpeed() );
//	savefile.WriteAngles( state.angularExtrapolation.GetSpeed() );
//
//	savefile.WriteFloat( state.linearInterpolation.GetStartTime() );
//	savefile.WriteFloat( state.linearInterpolation.GetAcceleration() );
//	savefile.WriteFloat( state.linearInterpolation.GetDeceleration() );
//	savefile.WriteFloat( state.linearInterpolation.GetDuration() );
//	savefile.WriteVec3( state.linearInterpolation.GetStartValue() );
//	savefile.WriteVec3( state.linearInterpolation.GetEndValue() );
//
//	savefile.WriteFloat( state.angularInterpolation.GetStartTime() );
//	savefile.WriteFloat( state.angularInterpolation.GetAcceleration() );
//	savefile.WriteFloat( state.angularInterpolation.GetDeceleration() );
//	savefile.WriteFloat( state.angularInterpolation.GetDuration() );
//	savefile.WriteAngles( state.angularInterpolation.GetStartValue() );
//	savefile.WriteAngles( state.angularInterpolation.GetEndValue() );
//
//	// spline is handled by owner
//
//	savefile.WriteFloat( state.splineInterpolate.GetStartTime() );
//	savefile.WriteFloat( state.splineInterpolate.GetAcceleration() );
//	savefile.WriteFloat( state.splineInterpolate.GetDuration() );
//	savefile.WriteFloat( state.splineInterpolate.GetDeceleration() );
//	savefile.WriteFloat( state.splineInterpolate.GetStartValue() );
//	savefile.WriteFloat( state.splineInterpolate.GetEndValue() );
//}
//
///*
//================
//idPhysics_Parametric_RestorePState
//================
//*/
//void idPhysics_Parametric_RestorePState( idRestoreGame *savefile, parametricPState_t &state ) {
//	extrapolation_t etype;
//	float startTime, duration, accelTime, decelTime, startValue, endValue;
//	idVec3 linearStartValue, linearBaseSpeed, linearSpeed, startPos, endPos;
//	idAngles angularStartValue, angularBaseSpeed, angularSpeed, startAng, endAng;
//
//	savefile.ReadInt( state.time );
//	savefile.ReadInt( state.atRest );
//	savefile.ReadBool( state.useSplineAngles );
//	savefile.ReadVec3( state.origin );
//	savefile.ReadAngles( state.angles );
//	savefile.ReadMat3( state.axis );
//	savefile.ReadVec3( state.localOrigin );
//	savefile.ReadAngles( state.localAngles );
//
//	savefile.ReadInt( (int &)etype );
//	savefile.ReadFloat( startTime );
//	savefile.ReadFloat( duration );
//	savefile.ReadVec3( linearStartValue );
//	savefile.ReadVec3( linearBaseSpeed );
//	savefile.ReadVec3( linearSpeed );
//
//	state.linearExtrapolation.Init( startTime, duration, linearStartValue, linearBaseSpeed, linearSpeed, etype );
//
//	savefile.ReadInt( (int &)etype );
//	savefile.ReadFloat( startTime );
//	savefile.ReadFloat( duration );
//	savefile.ReadAngles( angularStartValue );
//	savefile.ReadAngles( angularBaseSpeed );
//	savefile.ReadAngles( angularSpeed );
//
//	state.angularExtrapolation.Init( startTime, duration, angularStartValue, angularBaseSpeed, angularSpeed, etype );
//
//	savefile.ReadFloat( startTime );
//	savefile.ReadFloat( accelTime );
//	savefile.ReadFloat( decelTime );
//	savefile.ReadFloat( duration );
//	savefile.ReadVec3( startPos );
//	savefile.ReadVec3( endPos );
//
//	state.linearInterpolation.Init( startTime, accelTime, decelTime, duration, startPos, endPos );
//
//	savefile.ReadFloat( startTime );
//	savefile.ReadFloat( accelTime );
//	savefile.ReadFloat( decelTime );
//	savefile.ReadFloat( duration );
//	savefile.ReadAngles( startAng );
//	savefile.ReadAngles( endAng );
//
//	state.angularInterpolation.Init( startTime, accelTime, decelTime, duration, startAng, endAng );
//
//	// spline is handled by owner
//
//	savefile.ReadFloat( startTime );
//	savefile.ReadFloat( accelTime );
//	savefile.ReadFloat( duration );
//	savefile.ReadFloat( decelTime );
//	savefile.ReadFloat( startValue );
//	savefile.ReadFloat( endValue );
//
//	state.splineInterpolate.Init( startTime, accelTime, decelTime, duration, startValue, endValue );
//}
//
///*
//================
//idPhysics_Parametric::Save
//================
//*/
//void idPhysics_Parametric::Save( idSaveGame *savefile ) const {
//
//	idPhysics_Parametric_SavePState( savefile, this.current );
//	idPhysics_Parametric_SavePState( savefile, saved );
//
//	savefile.WriteBool( this.isPusher );
//	savefile.WriteClipModel( this.clipModel );
//	savefile.WriteInt( pushFlags );
//
//	savefile.WriteTrace( pushResults );
//	savefile.WriteBool( isBlocked );
//
//	savefile.WriteBool( hasMaster );
//	savefile.WriteBool( isOrientated );
//}
//
///*
//================
//idPhysics_Parametric::Restore
//================
//*/
//void idPhysics_Parametric::Restore( idRestoreGame *savefile ) {
//
//	idPhysics_Parametric_RestorePState( savefile, this.current );
//	idPhysics_Parametric_RestorePState( savefile, saved );
//
//	savefile.ReadBool( this.isPusher );
//	savefile.ReadClipModel( this.clipModel );
//	savefile.ReadInt( pushFlags );
//
//	savefile.ReadTrace( pushResults );
//	savefile.ReadBool( isBlocked );
//
//	savefile.ReadBool( hasMaster );
//	savefile.ReadBool( isOrientated );
//}

/*
================
idPhysics_Parametric::SetPusher
================
*/
SetPusher( /*int */flags :number):void {
	assert( this.clipModel );
	this.isPusher = true;
	this.pushFlags = flags;
}

/*
================
idPhysics_Parametric::IsPusher
================
*/
	IsPusher ( ): boolean {
		return this.isPusher;
	}

/*
================
idPhysics_Parametric::SetLinearExtrapolation
================
*/
	SetLinearExtrapolation ( type: extrapolation_t, /*int*/ time: number, /*int*/ duration: number, base: idVec3, speed: idVec3, baseSpeed: idVec3 ): void {
		this.current.time = gameLocal.time;
		this.current.linearExtrapolation.Init( time, duration, base, baseSpeed, speed, type );
		this.current.localOrigin = base;
		this.Activate ( );
	}

/*
================
idPhysics_Parametric::SetAngularExtrapolation
================
*/
	SetAngularExtrapolation ( type: extrapolation_t, /*int*/ time: number, /*int*/ duration: number, base: idAngles, speed: idAngles, baseSpeed: idAngles ): void {
		this.current.time = gameLocal.time;
		this.current.angularExtrapolation.Init( time, duration, base, baseSpeed, speed, type );
		this.current.localAngles = base;
		this.Activate ( );
	}

///*
//================
//idPhysics_Parametric::GetLinearExtrapolationType
//================
//*/
//extrapolation_t idPhysics_Parametric::GetLinearExtrapolationType( ) const {
//	return this.current.linearExtrapolation.GetExtrapolationType();
//}
//
///*
//================
//idPhysics_Parametric::GetAngularExtrapolationType
//================
//*/
//extrapolation_t idPhysics_Parametric::GetAngularExtrapolationType( ) const {
//	return this.current.angularExtrapolation.GetExtrapolationType();
//}
//
///*
//================
//idPhysics_Parametric::SetLinearInterpolation
//================
//*/
//void idPhysics_Parametric::SetLinearInterpolation( /*int*/ time:number, int accelTime, int decelTime, /*int*/ duration:number, const idVec3 &startPos, const idVec3 &endPos ) {
//	this.current.time = gameLocal.time;
//	this.current.linearInterpolation.Init( time, accelTime, decelTime, duration, startPos, endPos );
//	this.current.localOrigin = startPos;
//	this.Activate();
//}
//
///*
//================
//idPhysics_Parametric::SetAngularInterpolation
//================
//*/
//void idPhysics_Parametric::SetAngularInterpolation( /*int*/ time:number, int accelTime, int decelTime, /*int*/ duration:number, const idAngles &startAng, const idAngles &endAng ) {
//	this.current.time = gameLocal.time;
//	this.current.angularInterpolation.Init( time, accelTime, decelTime, duration, startAng, endAng );
//	this.current.localAngles = startAng;
//	this.Activate();
//}
//
///*
//================
//idPhysics_Parametric::SetSpline
//================
//*/
//void idPhysics_Parametric::SetSpline( idCurve_Spline<idVec3> *spline, int accelTime, int decelTime, bool useSplineAngles ) {
//	if ( this.current.spline != NULL ) {
//		delete this.current.spline;
//		this.current.spline = NULL;
//	}
//	this.current.spline = spline;
//	if ( this.current.spline != NULL ) {
//		float startTime = this.current.spline.GetTime( 0 );
//		float endTime = this.current.spline.GetTime( this.current.spline.GetNumValues() - 1 );
//		float length = this.current.spline.GetLengthForTime( endTime );
//		this.current.splineInterpolate.Init( startTime, accelTime, decelTime, endTime - startTime, 0.0, length );
//	}
//	this.current.useSplineAngles = useSplineAngles;
//	this.Activate();
//}
//
///*
//================
//idPhysics_Parametric::GetSpline
//================
//*/
//idCurve_Spline<idVec3> *idPhysics_Parametric::GetSpline( ) const {
//	return this.current.spline;
//}
//
///*
//================
//idPhysics_Parametric::GetSplineAcceleration
//================
//*/
//int idPhysics_Parametric::GetSplineAcceleration( ) const {
//	return this.current.splineInterpolate.GetAcceleration();
//}
//
///*
//================
//idPhysics_Parametric::GetSplineDeceleration
//================
//*/
//int idPhysics_Parametric::GetSplineDeceleration( ) const {
//	return this.current.splineInterpolate.GetDeceleration();
//}
//
///*
//================
//idPhysics_Parametric::UsingSplineAngles
//================
//*/
//bool idPhysics_Parametric::UsingSplineAngles( ) const {
//	return this.current.useSplineAngles;
//}
//
///*
//================
//idPhysics_Parametric::GetLocalOrigin
//================
//*/
//void idPhysics_Parametric::GetLocalOrigin( idVec3 &curOrigin ) const {
//	curOrigin = this.current.localOrigin;
//}
//
///*
//================
//idPhysics_Parametric::GetLocalAngles
//================
//*/
//void idPhysics_Parametric::GetLocalAngles( idAngles &curAngles ) const {
//	curAngles = this.current.localAngles;
//}

/*
================
idPhysics_Parametric::SetClipModel
================
*/
	SetClipModel ( model: idClipModel, /*float*/ density: number, /*int*/ id: number = 0, freeOld = true ): void {

		assert( this.self );
		assert( model );

		if ( this.clipModel && this.clipModel != model && freeOld ) {
			delete this.clipModel;
		}
		this.clipModel = model;
		this.clipModel.Link_ent( gameLocal.clip, this.self, 0, this.current.origin, this.current.axis );
	}

/*
================
idPhysics_Parametric::GetClipModel
================
*/
	GetClipModel( /*int*/ id: number  = 0): idClipModel {
		return this.clipModel;
	}

/*
================
idPhysics_Parametric::GetNumClipModels
================
*/
	GetNumClipModels ( ): number {
		return ( this.clipModel != null ) ? 1 : 0;
	}

/*
================
idPhysics_Parametric::SetMass
================
*/
	SetMass ( /*float*/ mass: number, /*int*/ id: number = -1 ): void {
	}

/*
================
idPhysics_Parametric::GetMass
================
*/
	GetMass ( /*int*/ id: number= -1 ): number {
		return 0.0;
	}

/*
================
idPhysics_Parametric::SetClipMask
================
*/
	SetContents( /*int*/ contents: number, /*int*/ id: number  = -1) :void{
	if ( this.clipModel ) {
		this.clipModel.SetContents( contents );
	}
}

/*
================
idPhysics_Parametric::SetClipMask
================
*/
	GetContents ( /*int*/ id: number = -1 ): number {
		if ( this.clipModel ) {
			return this.clipModel.GetContents ( );
		}
		return 0;
	}

/*
================
idPhysics_Parametric::GetBounds
================
*/
	GetBounds ( /*int*/ id: number = -1 ): idBounds {
		if ( this.clipModel ) {
			return this.clipModel.GetBounds ( );
		}
		return super.GetBounds ( );
	}

/*
================
idPhysics_Parametric::GetAbsBounds
================
*/
	GetAbsBounds ( /*int*/ id: number = -1 ): idBounds {
		if ( this.clipModel ) {
			return this.clipModel.GetAbsBounds ( );
		}
		return super.GetAbsBounds ( );
	}
//
///*
//================
//idPhysics_Parametric::Evaluate
//================
//*/
//bool idPhysics_Parametric::Evaluate( int timeStepMSec, int endTimeMSec ) {
//	idVec3 oldLocalOrigin, oldOrigin, masterOrigin;
//	idAngles oldLocalAngles, oldAngles;
//	idMat3 oldAxis, masterAxis;
//
//	isBlocked = false;
//	oldLocalOrigin = this.current.localOrigin;
//	oldOrigin = this.current.origin;
//	oldLocalAngles = this.current.localAngles;
//	oldAngles = this.current.angles;
//	oldAxis = this.current.axis;
//
//	this.current.localOrigin.Zero();
//	this.current.localAngles.Zero();
//
//	if ( this.current.spline != NULL ) {
//		float length = this.current.splineInterpolate.GetCurrentValue( endTimeMSec );
//		float t = this.current.spline.GetTimeForLength( length, 0.01f );
//		this.current.localOrigin = this.current.spline.GetCurrentValue( t );
//		if ( this.current.useSplineAngles ) {
//			this.current.localAngles = this.current.spline.GetCurrentFirstDerivative( t ).ToAngles();
//		}
//	} else if ( this.current.linearInterpolation.GetDuration() != 0 ) {
//		this.current.localOrigin += this.current.linearInterpolation.GetCurrentValue( endTimeMSec );
//	} else {
//		this.current.localOrigin += this.current.linearExtrapolation.GetCurrentValue( endTimeMSec );
//	}
//
//	if ( this.current.angularInterpolation.GetDuration() != 0 ) {
//		this.current.localAngles += this.current.angularInterpolation.GetCurrentValue( endTimeMSec );
//	} else {
//		this.current.localAngles += this.current.angularExtrapolation.GetCurrentValue( endTimeMSec );
//	}
//
//	this.current.localAngles.Normalize360();
//	this.current.origin = this.current.localOrigin;
//	this.current.angles = this.current.localAngles;
//	this.current.axis = this.current.localAngles.ToMat3();
//
//	if ( hasMaster ) {
//		this.self.GetMasterPosition( masterOrigin, masterAxis );
//		if ( masterAxis.IsRotated() ) {
//			this.current.origin = this.current.origin * masterAxis + masterOrigin;
//			if ( isOrientated ) {
//				this.current.axis *= masterAxis;
//				this.current.angles = this.current.axis.ToAngles();
//			}
//		}
//		else {
//			this.current.origin += masterOrigin;
//		}
//	}
//
//	if ( this.isPusher ) {
//
//		gameLocal.push.ClipPush( pushResults, this.self, pushFlags, oldOrigin, oldAxis, this.current.origin, this.current.axis );
//		if ( pushResults.fraction < 1.0 ) {
//			this.clipModel.Link( gameLocal.clip, this.self, 0, oldOrigin, oldAxis );
//			this.current.localOrigin = oldLocalOrigin;
//			this.current.origin = oldOrigin;
//			this.current.localAngles = oldLocalAngles;
//			this.current.angles = oldAngles;
//			this.current.axis = oldAxis;
//			isBlocked = true;
//			return false;
//		}
//
//		this.current.angles = this.current.axis.ToAngles();
//	}
//
//	if ( this.clipModel ) {
//		this.clipModel.Link( gameLocal.clip, this.self, 0, this.current.origin, this.current.axis );
//	}
//
//	this.current.time = endTimeMSec;
//
//	if ( TestIfAtRest() ) {
//		Rest();
//	}
//
//	return ( this.current.origin != oldOrigin || this.current.axis != oldAxis );
//}
//
///*
//================
//idPhysics_Parametric::UpdateTime
//================
//*/
//void idPhysics_Parametric::UpdateTime( int endTimeMSec ) {
//	int timeLeap = endTimeMSec - this.current.time;
//
//	this.current.time = endTimeMSec;
//	// move the trajectory start times to sync the trajectory with the this.current endTime
//	this.current.linearExtrapolation.SetStartTime( this.current.linearExtrapolation.GetStartTime() + timeLeap );
//	this.current.angularExtrapolation.SetStartTime( this.current.angularExtrapolation.GetStartTime() + timeLeap );
//	this.current.linearInterpolation.SetStartTime( this.current.linearInterpolation.GetStartTime() + timeLeap );
//	this.current.angularInterpolation.SetStartTime( this.current.angularInterpolation.GetStartTime() + timeLeap );
//	if ( this.current.spline != NULL ) {
//		this.current.spline.ShiftTime( timeLeap );
//		this.current.splineInterpolate.SetStartTime( this.current.splineInterpolate.GetStartTime() + timeLeap );
//	}
//}
//
///*
//================
//idPhysics_Parametric::GetTime
//================
//*/
//int idPhysics_Parametric::GetTime( ) const {
//	return this.current.time;
//}
//
///*
//================
//idPhysics_Parametric::IsAtRest
//================
//*/
//bool idPhysics_Parametric::IsAtRest( ) const {
//	return this.current.atRest >= 0;
//}
//
///*
//================
//idPhysics_Parametric::GetRestStartTime
//================
//*/
//int idPhysics_Parametric::GetRestStartTime( ) const {
//	return this.current.atRest;
//}
//
///*
//================
//idPhysics_Parametric::IsPushable
//================
//*/
//bool idPhysics_Parametric::IsPushable( ) const {
//	return false;
//}
//
///*
//================
//idPhysics_Parametric::SaveState
//================
//*/
//void idPhysics_Parametric::SaveState( ) {
//	saved = this.current;
//}
//
///*
//================
//idPhysics_Parametric::RestoreState
//================
//*/
//void idPhysics_Parametric::RestoreState( ) {
//
//	this.current = saved;
//
//	if ( this.clipModel ) {
//		this.clipModel.Link( gameLocal.clip, this.self, 0, this.current.origin, this.current.axis );
//	}
//}
//
/*
================
idPhysics_Parametric::SetOrigin
================
*/
void idPhysics_Parametric::SetOrigin( const idVec3 &newOrigin, /*int*/ id:number ) {
	idVec3 masterOrigin;
	idMat3 masterAxis;

	this.current.linearExtrapolation.SetStartValue( newOrigin );
	this.current.linearInterpolation.SetStartValue( newOrigin );

	this.current.localOrigin = this.current.linearExtrapolation.GetCurrentValue( this.current.time );
	if ( hasMaster ) {
		this.self.GetMasterPosition( masterOrigin, masterAxis );
		this.current.origin = masterOrigin + this.current.localOrigin * masterAxis;
	}
	else {
		this.current.origin = this.current.localOrigin;
	}
	if ( this.clipModel ) {
		this.clipModel.Link( gameLocal.clip, this.self, 0, this.current.origin, this.current.axis );
	}
	this.Activate();
}

///*
//================
//idPhysics_Parametric::SetAxis
//================
//*/
//void idPhysics_Parametric::SetAxis( const idMat3 &newAxis, /*int*/ id:number ) {
//	idVec3 masterOrigin;
//	idMat3 masterAxis;
//
//	this.current.localAngles = newAxis.ToAngles();
//
//	this.current.angularExtrapolation.SetStartValue( this.current.localAngles );
//	this.current.angularInterpolation.SetStartValue( this.current.localAngles );
//
//	this.current.localAngles = this.current.angularExtrapolation.GetCurrentValue( this.current.time );
//	if ( hasMaster && isOrientated ) {
//		this.self.GetMasterPosition( masterOrigin, masterAxis );
//		this.current.axis = this.current.localAngles.ToMat3() * masterAxis;
//		this.current.angles = this.current.axis.ToAngles();
//	}
//	else {
//		this.current.axis = this.current.localAngles.ToMat3();
//		this.current.angles = this.current.localAngles;
//	}
//	if ( this.clipModel ) {
//		this.clipModel.Link( gameLocal.clip, this.self, 0, this.current.origin, this.current.axis );
//	}
//	this.Activate();
//}
//
///*
//================
//idPhysics_Parametric::Move
//================
//*/
//void idPhysics_Parametric::Translate( const idVec3 &translation, /*int*/ id:number ) {
//}
//
///*
//================
//idPhysics_Parametric::Rotate
//================
//*/
//void idPhysics_Parametric::Rotate( const idRotation &rotation, /*int*/ id:number ) {
//}
//
/*
================
idPhysics_Parametric::GetOrigin
================
*/
	GetOrigin ( /*int*/ id: number = 0 ): idVec3 {
		return this.current.origin;
	}

/*
================
idPhysics_Parametric::GetAxis
================
*/
	GetAxis ( /*int*/ id: number = 0 ): idMat3 {
		return this.current.axis;
	}

///*
//================
//idPhysics_Parametric::GetAngles
//================
//*/
//void idPhysics_Parametric::GetAngles( idAngles &curAngles ) const {
//	curAngles = this.current.angles;
//}
//
///*
//================
//idPhysics_Parametric::SetLinearVelocity
//================
//*/
//void idPhysics_Parametric::SetLinearVelocity( const idVec3 &newLinearVelocity, /*int*/ id:number ) {
//	SetLinearExtrapolation( extrapolation_t(EXTRAPOLATION_LINEAR|EXTRAPOLATION_NOSTOP), gameLocal.time, 0, this.current.origin, newLinearVelocity, vec3_origin );
//	this.current.linearInterpolation.Init( 0, 0, 0, 0, vec3_zero, vec3_zero );
//	this.Activate();
//}
//
///*
//================
//idPhysics_Parametric::SetAngularVelocity
//================
//*/
//void idPhysics_Parametric::SetAngularVelocity( const idVec3 &newAngularVelocity, /*int*/ id:number ) {
//	idRotation rotation;
//	idVec3 vec;
//	float angle;
//
//	vec = newAngularVelocity;
//	angle = vec.Normalize();
//	rotation.Set( vec3_origin, vec, (float) RAD2DEG( angle ) );
//
//	SetAngularExtrapolation( extrapolation_t(EXTRAPOLATION_LINEAR|EXTRAPOLATION_NOSTOP), gameLocal.time, 0, this.current.angles, rotation.ToAngles(), ang_zero );
//	this.current.angularInterpolation.Init( 0, 0, 0, 0, ang_zero, ang_zero );
//	this.Activate();
//}
//
///*
//================
//idPhysics_Parametric::GetLinearVelocity
//================
//*/
//const idVec3 &idPhysics_Parametric::GetLinearVelocity( /*int*/ id:number ) const {
//	static idVec3 curLinearVelocity;
//
//	curLinearVelocity = this.current.linearExtrapolation.GetCurrentSpeed( gameLocal.time );
//	return curLinearVelocity;
//}
//
///*
//================
//idPhysics_Parametric::GetAngularVelocity
//================
//*/
//const idVec3 &idPhysics_Parametric::GetAngularVelocity( /*int*/ id:number ) const {
//	static idVec3 curAngularVelocity;
//	idAngles angles;
//
//	angles = this.current.angularExtrapolation.GetCurrentSpeed( gameLocal.time );
//	curAngularVelocity = angles.ToAngularVelocity();
//	return curAngularVelocity;
//}
//
///*
//================
//idPhysics_Parametric::DisableClip
//================
//*/
//void idPhysics_Parametric::DisableClip( ) {
//	if ( this.clipModel ) {
//		this.clipModel.Disable();
//	}
//}
//
///*
//================
//idPhysics_Parametric::EnableClip
//================
//*/
//void idPhysics_Parametric::EnableClip( ) {
//	if ( this.clipModel ) {
//		this.clipModel.Enable();
//	}
//}
//
///*
//================
//idPhysics_Parametric::UnlinkClip
//================
//*/
//void idPhysics_Parametric::UnlinkClip( ) {
//	if ( this.clipModel ) {
//		this.clipModel.Unlink();
//	}
//}
//
///*
//================
//idPhysics_Parametric::LinkClip
//================
//*/
//void idPhysics_Parametric::LinkClip( ) {
//	if ( this.clipModel ) {
//		this.clipModel.Link( gameLocal.clip, this.self, 0, this.current.origin, this.current.axis );
//	}
//}
//
///*
//================
//idPhysics_Parametric::GetBlockingInfo
//================
//*/
//const trace_t *idPhysics_Parametric::GetBlockingInfo( ) const {
//	return ( isBlocked ? &pushResults : NULL );
//}
//
///*
//================
//idPhysics_Parametric::GetBlockingEntity
//================
//*/
//idEntity *idPhysics_Parametric::GetBlockingEntity( ) const {
//	if ( isBlocked ) {
//		return gameLocal.entities[ pushResults.c.entityNum ];
//	}
//	return NULL;
//}
//
///*
//================
//idPhysics_Parametric::SetMaster
//================
//*/
//void idPhysics_Parametric::SetMaster( idEntity *master, const bool orientated ) {
//	idVec3 masterOrigin;
//	idMat3 masterAxis;
//
//	if ( master ) {
//		if ( !hasMaster ) {
//
//			// transform from world space to master space
//			this.self.GetMasterPosition( masterOrigin, masterAxis );
//			this.current.localOrigin = ( this.current.origin - masterOrigin ) * masterAxis.Transpose();
//			if ( orientated ) {
//				this.current.localAngles = ( this.current.axis * masterAxis.Transpose() ).ToAngles();
//			}
//			else {
//				this.current.localAngles = this.current.axis.ToAngles();
//			}
//
//			this.current.linearExtrapolation.SetStartValue( this.current.localOrigin );
//			this.current.angularExtrapolation.SetStartValue( this.current.localAngles );
//			hasMaster = true;
//			isOrientated = orientated;
//		}
//	}
//	else {
//		if ( hasMaster ) {
//			// transform from master space to world space
//			this.current.localOrigin = this.current.origin;
//			this.current.localAngles = this.current.angles;
//			SetLinearExtrapolation( EXTRAPOLATION_NONE, 0, 0, this.current.origin, vec3_origin, vec3_origin );
//			SetAngularExtrapolation( EXTRAPOLATION_NONE, 0, 0, this.current.angles, ang_zero, ang_zero );
//			hasMaster = false;
//		}
//	}
//}
//
///*
//================
//idPhysics_Parametric::GetLinearEndTime
//================
//*/
//int idPhysics_Parametric::GetLinearEndTime( ) const {
//	if ( this.current.spline != NULL ) {
//		if ( this.current.spline.GetBoundaryType() != idCurve_Spline<idVec3>::BT_CLOSED ) {
//			return this.current.spline.GetTime( this.current.spline.GetNumValues() - 1 );
//		} else {
//			return 0;
//		}
//	} else if ( this.current.linearInterpolation.GetDuration() != 0 ) {
//		return this.current.linearInterpolation.GetEndTime();
//	} else {
//		return this.current.linearExtrapolation.GetEndTime();
//	}
//}
//
///*
//================
//idPhysics_Parametric::GetAngularEndTime
//================
//*/
//int idPhysics_Parametric::GetAngularEndTime( ) const {
//	if ( this.current.angularInterpolation.GetDuration() != 0 ) {
//		return this.current.angularInterpolation.GetEndTime();
//	} else {
//		return this.current.angularExtrapolation.GetEndTime();
//	}
//}
//
///*
//================
//idPhysics_Parametric::WriteToSnapshot
//================
//*/
//void idPhysics_Parametric::WriteToSnapshot( idBitMsgDelta &msg ) const {
//	msg.WriteLong( this.current.time );
//	msg.WriteLong( this.current.atRest );
//	msg.WriteFloat( this.current.origin[0] );
//	msg.WriteFloat( this.current.origin[1] );
//	msg.WriteFloat( this.current.origin[2] );
//	msg.WriteFloat( this.current.angles[0] );
//	msg.WriteFloat( this.current.angles[1] );
//	msg.WriteFloat( this.current.angles[2] );
//	msg.WriteDeltaFloat( this.current.origin[0], this.current.localOrigin[0] );
//	msg.WriteDeltaFloat( this.current.origin[1], this.current.localOrigin[1] );
//	msg.WriteDeltaFloat( this.current.origin[2], this.current.localOrigin[2] );
//	msg.WriteDeltaFloat( this.current.angles[0], this.current.localAngles[0] );
//	msg.WriteDeltaFloat( this.current.angles[1], this.current.localAngles[1] );
//	msg.WriteDeltaFloat( this.current.angles[2], this.current.localAngles[2] );
//
//	msg.WriteBits( this.current.linearExtrapolation.GetExtrapolationType(), 8 );
//	msg.WriteDeltaFloat( 0.0, this.current.linearExtrapolation.GetStartTime() );
//	msg.WriteDeltaFloat( 0.0, this.current.linearExtrapolation.GetDuration() );
//	msg.WriteDeltaFloat( 0.0, this.current.linearExtrapolation.GetStartValue()[0] );
//	msg.WriteDeltaFloat( 0.0, this.current.linearExtrapolation.GetStartValue()[1] );
//	msg.WriteDeltaFloat( 0.0, this.current.linearExtrapolation.GetStartValue()[2] );
//	msg.WriteDeltaFloat( 0.0, this.current.linearExtrapolation.GetSpeed()[0] );
//	msg.WriteDeltaFloat( 0.0, this.current.linearExtrapolation.GetSpeed()[1] );
//	msg.WriteDeltaFloat( 0.0, this.current.linearExtrapolation.GetSpeed()[2] );
//	msg.WriteDeltaFloat( 0.0, this.current.linearExtrapolation.GetBaseSpeed()[0] );
//	msg.WriteDeltaFloat( 0.0, this.current.linearExtrapolation.GetBaseSpeed()[1] );
//	msg.WriteDeltaFloat( 0.0, this.current.linearExtrapolation.GetBaseSpeed()[2] );
//
//	msg.WriteBits( this.current.angularExtrapolation.GetExtrapolationType(), 8 );
//	msg.WriteDeltaFloat( 0.0, this.current.angularExtrapolation.GetStartTime() );
//	msg.WriteDeltaFloat( 0.0, this.current.angularExtrapolation.GetDuration() );
//	msg.WriteDeltaFloat( 0.0, this.current.angularExtrapolation.GetStartValue()[0] );
//	msg.WriteDeltaFloat( 0.0, this.current.angularExtrapolation.GetStartValue()[1] );
//	msg.WriteDeltaFloat( 0.0, this.current.angularExtrapolation.GetStartValue()[2] );
//	msg.WriteDeltaFloat( 0.0, this.current.angularExtrapolation.GetSpeed()[0] );
//	msg.WriteDeltaFloat( 0.0, this.current.angularExtrapolation.GetSpeed()[1] );
//	msg.WriteDeltaFloat( 0.0, this.current.angularExtrapolation.GetSpeed()[2] );
//	msg.WriteDeltaFloat( 0.0, this.current.angularExtrapolation.GetBaseSpeed()[0] );
//	msg.WriteDeltaFloat( 0.0, this.current.angularExtrapolation.GetBaseSpeed()[1] );
//	msg.WriteDeltaFloat( 0.0, this.current.angularExtrapolation.GetBaseSpeed()[2] );
//
//	msg.WriteDeltaFloat( 0.0, this.current.linearInterpolation.GetStartTime() );
//	msg.WriteDeltaFloat( 0.0, this.current.linearInterpolation.GetAcceleration() );
//	msg.WriteDeltaFloat( 0.0, this.current.linearInterpolation.GetDeceleration() );
//	msg.WriteDeltaFloat( 0.0, this.current.linearInterpolation.GetDuration() );
//	msg.WriteDeltaFloat( 0.0, this.current.linearInterpolation.GetStartValue()[0] );
//	msg.WriteDeltaFloat( 0.0, this.current.linearInterpolation.GetStartValue()[1] );
//	msg.WriteDeltaFloat( 0.0, this.current.linearInterpolation.GetStartValue()[2] );
//	msg.WriteDeltaFloat( 0.0, this.current.linearInterpolation.GetEndValue()[0] );
//	msg.WriteDeltaFloat( 0.0, this.current.linearInterpolation.GetEndValue()[1] );
//	msg.WriteDeltaFloat( 0.0, this.current.linearInterpolation.GetEndValue()[2] );
//
//	msg.WriteDeltaFloat( 0.0, this.current.angularInterpolation.GetStartTime() );
//	msg.WriteDeltaFloat( 0.0, this.current.angularInterpolation.GetAcceleration() );
//	msg.WriteDeltaFloat( 0.0, this.current.angularInterpolation.GetDeceleration() );
//	msg.WriteDeltaFloat( 0.0, this.current.angularInterpolation.GetDuration() );
//	msg.WriteDeltaFloat( 0.0, this.current.angularInterpolation.GetStartValue()[0] );
//	msg.WriteDeltaFloat( 0.0, this.current.angularInterpolation.GetStartValue()[1] );
//	msg.WriteDeltaFloat( 0.0, this.current.angularInterpolation.GetStartValue()[2] );
//	msg.WriteDeltaFloat( 0.0, this.current.angularInterpolation.GetEndValue()[0] );
//	msg.WriteDeltaFloat( 0.0, this.current.angularInterpolation.GetEndValue()[1] );
//	msg.WriteDeltaFloat( 0.0, this.current.angularInterpolation.GetEndValue()[2] );
//}
//
///*
//================
//idPhysics_Parametric::ReadFromSnapshot
//================
//*/
//void idPhysics_Parametric::ReadFromSnapshot( const idBitMsgDelta &msg ) {
//	extrapolation_t linearType, angularType;
//	float startTime, duration, accelTime, decelTime;
//	idVec3 linearStartValue, linearSpeed, linearBaseSpeed, startPos, endPos;
//	idAngles angularStartValue, angularSpeed, angularBaseSpeed, startAng, endAng;
//
//	this.current.time = msg.ReadLong();
//	this.current.atRest = msg.ReadLong();
//	this.current.origin[0] = msg.ReadFloat();
//	this.current.origin[1] = msg.ReadFloat();
//	this.current.origin[2] = msg.ReadFloat();
//	this.current.angles[0] = msg.ReadFloat();
//	this.current.angles[1] = msg.ReadFloat();
//	this.current.angles[2] = msg.ReadFloat();
//	this.current.localOrigin[0] = msg.ReadDeltaFloat( this.current.origin[0] );
//	this.current.localOrigin[1] = msg.ReadDeltaFloat( this.current.origin[1] );
//	this.current.localOrigin[2] = msg.ReadDeltaFloat( this.current.origin[2] );
//	this.current.localAngles[0] = msg.ReadDeltaFloat( this.current.angles[0] );
//	this.current.localAngles[1] = msg.ReadDeltaFloat( this.current.angles[1] );
//	this.current.localAngles[2] = msg.ReadDeltaFloat( this.current.angles[2] );
//
//	linearType = (extrapolation_t) msg.ReadBits( 8 );
//	startTime = msg.ReadDeltaFloat( 0.0 );
//	duration = msg.ReadDeltaFloat( 0.0 );
//	linearStartValue[0] = msg.ReadDeltaFloat( 0.0 );
//	linearStartValue[1] = msg.ReadDeltaFloat( 0.0 );
//	linearStartValue[2] = msg.ReadDeltaFloat( 0.0 );
//	linearSpeed[0] = msg.ReadDeltaFloat( 0.0 );
//	linearSpeed[1] = msg.ReadDeltaFloat( 0.0 );
//	linearSpeed[2] = msg.ReadDeltaFloat( 0.0 );
//	linearBaseSpeed[0] = msg.ReadDeltaFloat( 0.0 );
//	linearBaseSpeed[1] = msg.ReadDeltaFloat( 0.0 );
//	linearBaseSpeed[2] = msg.ReadDeltaFloat( 0.0 );
//	this.current.linearExtrapolation.Init( startTime, duration, linearStartValue, linearBaseSpeed, linearSpeed, linearType );
//
//	angularType = (extrapolation_t) msg.ReadBits( 8 );
//	startTime = msg.ReadDeltaFloat( 0.0 );
//	duration = msg.ReadDeltaFloat( 0.0 );
//	angularStartValue[0] = msg.ReadDeltaFloat( 0.0 );
//	angularStartValue[1] = msg.ReadDeltaFloat( 0.0 );
//	angularStartValue[2] = msg.ReadDeltaFloat( 0.0 );
//	angularSpeed[0] = msg.ReadDeltaFloat( 0.0 );
//	angularSpeed[1] = msg.ReadDeltaFloat( 0.0 );
//	angularSpeed[2] = msg.ReadDeltaFloat( 0.0 );
//	angularBaseSpeed[0] = msg.ReadDeltaFloat( 0.0 );
//	angularBaseSpeed[1] = msg.ReadDeltaFloat( 0.0 );
//	angularBaseSpeed[2] = msg.ReadDeltaFloat( 0.0 );
//	this.current.angularExtrapolation.Init( startTime, duration, angularStartValue, angularBaseSpeed, angularSpeed, angularType );
//
//	startTime = msg.ReadDeltaFloat( 0.0 );
//	accelTime = msg.ReadDeltaFloat( 0.0 );
//	decelTime = msg.ReadDeltaFloat( 0.0 );
//	duration = msg.ReadDeltaFloat( 0.0 );
//	startPos[0] = msg.ReadDeltaFloat( 0.0 );
//	startPos[1] = msg.ReadDeltaFloat( 0.0 );
//	startPos[2] = msg.ReadDeltaFloat( 0.0 );
//	endPos[0] = msg.ReadDeltaFloat( 0.0 );
//	endPos[1] = msg.ReadDeltaFloat( 0.0 );
//	endPos[2] = msg.ReadDeltaFloat( 0.0 );
//	this.current.linearInterpolation.Init( startTime, accelTime, decelTime, duration, startPos, endPos );
//
//	startTime = msg.ReadDeltaFloat( 0.0 );
//	accelTime = msg.ReadDeltaFloat( 0.0 );
//	decelTime = msg.ReadDeltaFloat( 0.0 );
//	duration = msg.ReadDeltaFloat( 0.0 );
//	startAng[0] = msg.ReadDeltaFloat( 0.0 );
//	startAng[1] = msg.ReadDeltaFloat( 0.0 );
//	startAng[2] = msg.ReadDeltaFloat( 0.0 );
//	endAng[0] = msg.ReadDeltaFloat( 0.0 );
//	endAng[1] = msg.ReadDeltaFloat( 0.0 );
//	endAng[2] = msg.ReadDeltaFloat( 0.0 );
//	this.current.angularInterpolation.Init( startTime, accelTime, decelTime, duration, startAng, endAng );
//
//	this.current.axis = this.current.angles.ToMat3();
//
//	if ( this.clipModel ) {
//		this.clipModel.Link( gameLocal.clip, this.self, 0, this.current.origin, this.current.axis );
//	}
//}
}
//CLASS_DECLARATION( idPhysics_Base, idPhysics_Parametric )
idPhysics_Parametric.CreateInstance = function() : idClass{
	try {
		var ptr = new idPhysics_Parametric;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idPhysics_Parametric.prototype.GetType = function ( ): idTypeInfo {
	return ( idPhysics_Parametric.Type );
};

idPhysics_Parametric.eventCallbacks = [
];

idPhysics_Parametric.Type = new idTypeInfo( "idPhysics_Parametric", "idPhysics_Base",
	idPhysics_Parametric.eventCallbacks, idPhysics_Parametric.CreateInstance, idPhysics_Parametric.prototype.Spawn,
	idPhysics_Parametric.prototype.Save, idPhysics_Parametric.prototype.Restore );

//END_CLASS