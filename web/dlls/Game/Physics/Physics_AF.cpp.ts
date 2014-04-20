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
////#include "../../idlib/precompiled.h"
////#pragma hdrstop
////
////#include "../Game_local.h"
////
////CLASS_DECLARATION( idPhysics_Base, idPhysics_AF )
idPhysics_AF.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idPhysics_AF;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idPhysics_AF.prototype.GetType = function ( ): idTypeInfo {
	return ( idPhysics_AF.Type );
};

idPhysics_AF.eventCallbacks = [
];

idPhysics_AF.Type = new idTypeInfo("idPhysics_AF", "idPhysics_Base",
	idPhysics_AF.eventCallbacks, idPhysics_AF.CreateInstance, idPhysics_AF.prototype.Spawn,
	idPhysics_AF.prototype.Save, idPhysics_AF.prototype.Restore );

////END_CLASS
////
////const float ERROR_REDUCTION					= 0.5f;
////const float ERROR_REDUCTION_MAX				= 256.0f;
////const float LIMIT_ERROR_REDUCTION			= 0.3f;
////const float LCP_EPSILON						= 1e-7f;
////const float LIMIT_LCP_EPSILON				= 1e-4f;
////const float CONTACT_LCP_EPSILON				= 1e-6f;
////const float CENTER_OF_MASS_EPSILON			= 1e-4f;
////const float NO_MOVE_TIME					= 1.0f;
////const float NO_MOVE_TRANSLATION_TOLERANCE	= 10.0f;
////const float NO_MOVE_ROTATION_TOLERANCE		= 10.0f;
////const float MIN_MOVE_TIME					= -1.0f;
////const float MAX_MOVE_TIME					= -1.0f;
////const float IMPULSE_THRESHOLD				= 500.0f;
////const float SUSPEND_LINEAR_VELOCITY			= 10.0f;
////const float SUSPEND_ANGULAR_VELOCITY		= 15.0f;
////const float SUSPEND_LINEAR_ACCELERATION		= 20.0f;
////const float SUSPEND_ANGULAR_ACCELERATION	= 30.0f;
////const idVec6 vec6_lcp_epsilon				= idVec6( LCP_EPSILON, LCP_EPSILON, LCP_EPSILON,
////													 LCP_EPSILON, LCP_EPSILON, LCP_EPSILON );
////
////#define AF_TIMINGS
////
////#ifdef AF_TIMINGS
////static int lastTimerReset = 0;
////static int numArticulatedFigures = 0;
////static idTimer timer_total, timer_pc, timer_ac, timer_collision, timer_lcp;
////#endif
////
////
////
//////===============================================================
//////
//////	idAFConstraint
//////
//////===============================================================
////
/////*
////================
////idAFConstraint::idAFConstraint
////================
////*/
////idAFConstraint::idAFConstraint( ) {
////	type				= CONSTRAINT_INVALID;
////	name				= "noname";
////	body1				= NULL;
////	body2				= NULL;
////	physics				= NULL;
////
////	lo.Zero( 6 );
////	lo.SubVec6(0)		= -vec6_infinity;
////	hi.Zero( 6 );
////	hi.SubVec6(0)		= vec6_infinity;
////	e.SetSize( 6 );
////	e.SubVec6(0)		= vec6_lcp_epsilon;
////
////	boxConstraint		= NULL;
////	boxIndex[0]			= -1;
////	boxIndex[1]			= -1;
////	boxIndex[2]			= -1;
////	boxIndex[3]			= -1;
////	boxIndex[4]			= -1;
////	boxIndex[5]			= -1;
////
////	firstIndex			= 0;
////
////	memset( &fl, 0, sizeof( fl ) );
////}
////
/////*
////================
////idAFConstraint::~idAFConstraint
////================
////*/
////idAFConstraint::~idAFConstraint( ) {
////}
////
/////*
////================
////idAFConstraint::SetBody1
////================
////*/
////void idAFConstraint::SetBody1( idAFBody *body ) {
////	if ( body1 != body) {
////		body1 = body;
////		if ( physics ) {
////			physics.SetChanged();
////		}
////	}
////}
////
/////*
////================
////idAFConstraint::SetBody2
////================
////*/
////void idAFConstraint::SetBody2( idAFBody *body ) {
////	if ( body2 != body ) {
////		body2 = body;
////		if ( physics ) {
////			physics.SetChanged();
////		}
////	}
////}
////
/////*
////================
////idAFConstraint::GetMultiplier
////================
////*/
////const idVecX &idAFConstraint::GetMultiplier( ) {
////	return lm;
////}
////
/////*
////================
////idAFConstraint::Evaluate
////================
////*/
////void idAFConstraint::Evaluate( float invTimeStep ) {
////	assert( 0 );
////}
////
/////*
////================
////idAFConstraint::ApplyFriction
////================
////*/
////void idAFConstraint::ApplyFriction( float invTimeStep ) {
////}
////
/////*
////================
////idAFConstraint::GetForce
////================
////*/
////void idAFConstraint::GetForce( idAFBody *body, idVec6 &force ) {
////	idVecX v;
////
////	v.SetData( 6, VECX_ALLOCA( 6 ) );
////	if ( body == body1 ) {
////		J1.TransposeMultiply( v, lm );
////	}
////	else if ( body == body2 ) {
////		J2.TransposeMultiply( v, lm );
////	}
////	else {
////		v.Zero();
////	}
////	force[0] = v[0]; force[1] = v[1]; force[2] = v[2]; force[3] = v[3]; force[4] = v[4]; force[5] = v[5];
////}
////
/////*
////================
////idAFConstraint::Translate
////================
////*/
////void idAFConstraint::Translate( const idVec3 &translation ) {
////	assert( 0 );
////}
////
/////*
////================
////idAFConstraint::Rotate
////================
////*/
////void idAFConstraint::Rotate( const idRotation &rotation ) {
////	assert( 0 );
////}
////
/////*
////================
////idAFConstraint::GetCenter
////================
////*/
////void idAFConstraint::GetCenter( idVec3 &center ) {
////	center.Zero();
////}
////
/////*
////================
////idAFConstraint::DebugDraw
////================
////*/
////void idAFConstraint::DebugDraw( ) {
////}
////
/////*
////================
////idAFConstraint::InitSize
////================
////*/
////void idAFConstraint::InitSize( int size ) {
////	J1.Zero( size, 6 );
////	J2.Zero( size, 6 );
////	c1.Zero( size );
////	c2.Zero( size );
////	s.Zero( size );
////	lm.Zero( size );
////}
////
/////*
////================
////idAFConstraint::Save
////================
////*/
////void idAFConstraint::Save( idSaveGame *saveFile ) const {
////	saveFile.WriteInt( type );
////}
////
/////*
////================
////idAFConstraint::Restore
////================
////*/
////void idAFConstraint::Restore( idRestoreGame *saveFile ) {
////	constraintType_t t;
////	saveFile.ReadInt( (int &)t );
////	assert( t == type );
////}
////
////
//////===============================================================
//////
//////	idAFConstraint_Fixed
//////
//////===============================================================
////
/////*
////================
////idAFConstraint_Fixed::idAFConstraint_Fixed
////================
////*/
////idAFConstraint_Fixed::idAFConstraint_Fixed( const idStr &name, idAFBody *body1, idAFBody *body2 ) {
////	assert( body1 );
////	type = CONSTRAINT_FIXED;
////	this.name = name;
////	this.body1 = body1;
////	this.body2 = body2;
////	InitSize( 6 );
////	fl.allowPrimary = true;
////	fl.noCollision = true;
////
////	InitOffset();
////}
////
/////*
////================
////idAFConstraint_Fixed::InitOffset
////================
////*/
////void idAFConstraint_Fixed::InitOffset( ) {
////	if ( body2 ) {
////		offset = ( body1.GetWorldOrigin() - body2.GetWorldOrigin() ) * body2.GetWorldAxis().Transpose();
////		relAxis = body1.GetWorldAxis() * body2.GetWorldAxis().Transpose();
////	}
////	else {
////		offset = body1.GetWorldOrigin();
////		relAxis = body1.GetWorldAxis();
////	}
////}
////
/////*
////================
////idAFConstraint_Fixed::SetBody1
////================
////*/
////void idAFConstraint_Fixed::SetBody1( idAFBody *body ) {
////	if ( body1 != body) {
////		body1 = body;
////		InitOffset();
////		if ( physics ) {
////			physics.SetChanged();
////		}
////	}
////}
////
/////*
////================
////idAFConstraint_Fixed::SetBody2
////================
////*/
////void idAFConstraint_Fixed::SetBody2( idAFBody *body ) {
////	if ( body2 != body ) {
////		body2 = body;
////		InitOffset();
////		if ( physics ) {
////			physics.SetChanged();
////		}
////	}
////}
////
/////*
////================
////idAFConstraint_Fixed::Evaluate
////================
////*/
////void idAFConstraint_Fixed::Evaluate( float invTimeStep ) {
////	idVec3 ofs, a2;
////	idMat3 ax;
////	idRotation r;
////	idAFBody *master;
////
////	master = body2 ? body2 : physics.GetMasterBody();
////
////	if ( master ) {
////		a2 = offset * master.GetWorldAxis();
////		ofs = a2 + master.GetWorldOrigin();
////		ax = relAxis * master.GetWorldAxis();
////	}
////	else {
////		a2.Zero();
////		ofs = offset;
////		ax = relAxis;
////	}
////
////	J1.Set(	mat3_identity, mat3_zero,
////				mat3_zero, mat3_identity );
////
////	if ( body2 ) {
////		J2.Set(	-mat3_identity, SkewSymmetric( a2 ),
////					mat3_zero, -mat3_identity );
////	}
////	else {
////		J2.Zero( 6, 6 );
////	}
////
////	c1.SubVec3(0) = -( invTimeStep * ERROR_REDUCTION ) * ( ofs - body1.GetWorldOrigin() );
////	r = ( body1.GetWorldAxis().Transpose() * ax ).ToRotation();
////	c1.SubVec3(1) = -( invTimeStep * ERROR_REDUCTION ) * ( r.GetVec() * -(float) DEG2RAD( r.GetAngle() ) );
////
////	c1.Clamp( -ERROR_REDUCTION_MAX, ERROR_REDUCTION_MAX );
////}
////
/////*
////================
////idAFConstraint_Fixed::ApplyFriction
////================
////*/
////void idAFConstraint_Fixed::ApplyFriction( float invTimeStep ) {
////	// no friction
////}
////
/////*
////================
////idAFConstraint_Fixed::Translate
////================
////*/
////void idAFConstraint_Fixed::Translate( const idVec3 &translation ) {
////	if ( !body2 ) {
////		offset += translation;
////	}
////}
////
/////*
////================
////idAFConstraint_Fixed::Rotate
////================
////*/
////void idAFConstraint_Fixed::Rotate( const idRotation &rotation ) {
////	if ( !body2 ) {
////		offset *= rotation;
////		relAxis *= rotation.ToMat3();
////	}
////}
////
/////*
////================
////idAFConstraint_Fixed::GetCenter
////================
////*/
////void idAFConstraint_Fixed::GetCenter( idVec3 &center ) {
////	center = body1.GetWorldOrigin();
////}
////
/////*
////================
////idAFConstraint_Fixed::DebugDraw
////================
////*/
////void idAFConstraint_Fixed::DebugDraw( ) {
////	idAFBody *master;
////
////	master = body2 ? body2 : physics.GetMasterBody();
////	if ( master ) {
////		gameRenderWorld.DebugLine( colorRed, body1.GetWorldOrigin(), master.GetWorldOrigin() );
////	}
////	else {
////		gameRenderWorld.DebugLine( colorRed, body1.GetWorldOrigin(), vec3_origin );
////	}
////}
////
/////*
////================
////idAFConstraint_Fixed::Save
////================
////*/
////void idAFConstraint_Fixed::Save( idSaveGame *saveFile ) const {
////	idAFConstraint::Save( saveFile );
////	saveFile.WriteVec3( offset );
////	saveFile.WriteMat3( relAxis );
////}
////
/////*
////================
////idAFConstraint_Fixed::Restore
////================
////*/
////void idAFConstraint_Fixed::Restore( idRestoreGame *saveFile ) {
////	idAFConstraint::Restore( saveFile );
////	saveFile.ReadVec3( offset );
////	saveFile.ReadMat3( relAxis );
////}
////
////
//////===============================================================
//////
//////	idAFConstraint_BallAndSocketJoint
//////
//////===============================================================
////
/////*
////================
////idAFConstraint_BallAndSocketJoint::idAFConstraint_BallAndSocketJoint
////================
////*/
////idAFConstraint_BallAndSocketJoint::idAFConstraint_BallAndSocketJoint( const idStr &name, idAFBody *body1, idAFBody *body2 ) {
////	assert( body1 );
////	type = CONSTRAINT_BALLANDSOCKETJOINT;
////	this.name = name;
////	this.body1 = body1;
////	this.body2 = body2;
////	InitSize( 3 );
////	coneLimit = NULL;
////	pyramidLimit = NULL;
////	friction = 0.0f;
////	fc = NULL;
////	fl.allowPrimary = true;
////	fl.noCollision = true;
////}
////
/////*
////================
////idAFConstraint_BallAndSocketJoint::~idAFConstraint_BallAndSocketJoint
////================
////*/
////idAFConstraint_BallAndSocketJoint::~idAFConstraint_BallAndSocketJoint( ) {
////	if ( coneLimit ) {
////		delete coneLimit;
////	}
////	if ( pyramidLimit ) {
////		delete pyramidLimit;
////	}
////}
////
/////*
////================
////idAFConstraint_BallAndSocketJoint::SetAnchor
////================
////*/
////void idAFConstraint_BallAndSocketJoint::SetAnchor( const idVec3 &worldPosition ) {
////
////	// get anchor relative to center of mass of body1
////	anchor1 = ( worldPosition - body1.GetWorldOrigin() ) * body1.GetWorldAxis().Transpose();
////	if ( body2 ) {
////		// get anchor relative to center of mass of body2
////		anchor2 = ( worldPosition - body2.GetWorldOrigin() ) * body2.GetWorldAxis().Transpose();
////	}
////	else {
////		anchor2 = worldPosition;
////	}
////
////	if ( coneLimit ) {
////		coneLimit.SetAnchor( anchor2 );
////	}
////	if ( pyramidLimit ) {
////		pyramidLimit.SetAnchor( anchor2 );
////	}
////}
////
/////*
////================
////idAFConstraint_BallAndSocketJoint::GetAnchor
////================
////*/
////idVec3 idAFConstraint_BallAndSocketJoint::GetAnchor( ) const {
////	if ( body2 ) {
////		return body2.GetWorldOrigin() + body2.GetWorldAxis() * anchor2;
////	}
////	return anchor2;
////}
////
/////*
////================
////idAFConstraint_BallAndSocketJoint::SetNoLimit
////================
////*/
////void idAFConstraint_BallAndSocketJoint::SetNoLimit( ) {
////	if ( coneLimit ) {
////		delete coneLimit;
////		coneLimit = NULL;
////	}
////	if ( pyramidLimit ) {
////		delete pyramidLimit;
////		pyramidLimit = NULL;
////	}
////}
////
/////*
////================
////idAFConstraint_BallAndSocketJoint::SetConeLimit
////================
////*/
////void idAFConstraint_BallAndSocketJoint::SetConeLimit( const idVec3 &coneAxis, const float coneAngle, const idVec3 &body1Axis ) {
////	if ( pyramidLimit ) {
////		delete pyramidLimit;
////		pyramidLimit = NULL;
////	}
////	if ( !coneLimit ) {
////		coneLimit = new idAFConstraint_ConeLimit;
////		coneLimit.SetPhysics( physics );
////	}
////	if ( body2 ) {
////		coneLimit.Setup( body1, body2, anchor2, coneAxis * body2.GetWorldAxis().Transpose(), coneAngle, body1Axis * body1.GetWorldAxis().Transpose() );
////	}
////	else {
////		coneLimit.Setup( body1, body2, anchor2, coneAxis, coneAngle, body1Axis * body1.GetWorldAxis().Transpose() );
////	}
////}
////
/////*
////================
////idAFConstraint_BallAndSocketJoint::SetPyramidLimit
////================
////*/
////void idAFConstraint_BallAndSocketJoint::SetPyramidLimit( const idVec3 &pyramidAxis, const idVec3 &baseAxis,
////														const float angle1, const float angle2, const idVec3 &body1Axis ) {
////	if ( coneLimit ) {
////		delete coneLimit;
////		coneLimit = NULL;
////	}
////	if ( !pyramidLimit ) {
////		pyramidLimit = new idAFConstraint_PyramidLimit;
////		pyramidLimit.SetPhysics( physics );
////	}
////	if ( body2 ) {
////		pyramidLimit.Setup( body1, body2, anchor2, pyramidAxis * body2.GetWorldAxis().Transpose(),
////									baseAxis * body2.GetWorldAxis().Transpose(), angle1, angle2,
////											body1Axis * body1.GetWorldAxis().Transpose() );
////	}
////	else {
////		pyramidLimit.Setup( body1, body2, anchor2, pyramidAxis, baseAxis, angle1, angle2,
////											body1Axis * body1.GetWorldAxis().Transpose() );
////	}
////}
////
/////*
////================
////idAFConstraint_BallAndSocketJoint::SetLimitEpsilon
////================
////*/
////void idAFConstraint_BallAndSocketJoint::SetLimitEpsilon( const float e ) {
////	if ( coneLimit ) {
////		coneLimit.SetEpsilon( e );
////	}
////	if ( pyramidLimit ) {
////		pyramidLimit.SetEpsilon( e );
////	}
////}
////
/////*
////================
////idAFConstraint_BallAndSocketJoint::GetFriction
////================
////*/
////float idAFConstraint_BallAndSocketJoint::GetFriction( ) const {
////	if ( af_forceFriction.GetFloat() > 0.0f ) {
////		return af_forceFriction.GetFloat();
////	}
////	return friction * physics.GetJointFrictionScale();
////}
////
/////*
////================
////idAFConstraint_BallAndSocketJoint::Evaluate
////================
////*/
////void idAFConstraint_BallAndSocketJoint::Evaluate( float invTimeStep ) {
////	idVec3 a1, a2;
////	idAFBody *master;
////
////	master = body2 ? body2 : physics.GetMasterBody();
////
////	a1 = anchor1 * body1.GetWorldAxis();
////
////	if ( master ) {
////		a2 = anchor2 * master.GetWorldAxis();
////		c1.SubVec3(0) = -( invTimeStep * ERROR_REDUCTION ) * ( a2 + master.GetWorldOrigin() - ( a1 + body1.GetWorldOrigin() ) );
////	}
////	else {
////		c1.SubVec3(0) = -( invTimeStep * ERROR_REDUCTION ) * ( anchor2 - ( a1 + body1.GetWorldOrigin() ) );
////	}
////
////	c1.Clamp( -ERROR_REDUCTION_MAX, ERROR_REDUCTION_MAX );
////
////	J1.Set( mat3_identity, -SkewSymmetric( a1 ) );
////
////	if ( body2 ) {
////		J2.Set( -mat3_identity, SkewSymmetric( a2 ) );
////	}
////	else {
////		J2.Zero( 3, 6 );
////	}
////
////	if ( coneLimit ) {
////		coneLimit.Add( physics, invTimeStep );
////	}
////	else if ( pyramidLimit ) {
////		pyramidLimit.Add( physics, invTimeStep );
////	}
////}
////
/////*
////================
////idAFConstraint_BallAndSocketJoint::ApplyFriction
////================
////*/
////void idAFConstraint_BallAndSocketJoint::ApplyFriction( float invTimeStep ) {
////	idVec3 angular;
////	float invMass, currentFriction;
////
////	currentFriction = GetFriction();
////
////	if ( currentFriction <= 0.0f ) {
////		return;
////	}
////
////	if ( af_useImpulseFriction.GetBool() || af_useJointImpulseFriction.GetBool() ) {
////
////		angular = body1.GetAngularVelocity();
////		invMass = body1.GetInverseMass();
////		if ( body2 ) {
////			angular -= body2.GetAngularVelocity();
////			invMass += body2.GetInverseMass();
////		}
////
////		angular *= currentFriction / invMass;
////
////		body1.SetAngularVelocity( body1.GetAngularVelocity() - angular * body1.GetInverseMass() );
////		if ( body2 ) {
////			body2.SetAngularVelocity( body2.GetAngularVelocity() + angular * body2.GetInverseMass() );
////		}
////	}
////	else {
////		if ( !fc ) {
////			fc = new idAFConstraint_BallAndSocketJointFriction;
////			fc.Setup( this );
////		}
////
////		fc.Add( physics, invTimeStep );
////	}
////}
////
/////*
////================
////idAFConstraint_BallAndSocketJoint::GetForce
////================
////*/
////void idAFConstraint_BallAndSocketJoint::GetForce( idAFBody *body, idVec6 &force ) {
////	idAFConstraint::GetForce( body, force );
////	// FIXME: add limit force
////}
////
/////*
////================
////idAFConstraint_BallAndSocketJoint::Translate
////================
////*/
////void idAFConstraint_BallAndSocketJoint::Translate( const idVec3 &translation ) {
////	if ( !body2 ) {
////		anchor2 += translation;
////	}
////	if ( coneLimit ) {
////		coneLimit.Translate( translation );
////	}
////	else if ( pyramidLimit ) {
////		pyramidLimit.Translate( translation );
////	}
////}
////
/////*
////================
////idAFConstraint_BallAndSocketJoint::Rotate
////================
////*/
////void idAFConstraint_BallAndSocketJoint::Rotate( const idRotation &rotation ) {
////	if ( !body2 ) {
////		anchor2 *= rotation;
////	}
////	if ( coneLimit ) {
////		coneLimit.Rotate( rotation );
////	}
////	else if ( pyramidLimit ) {
////		pyramidLimit.Rotate( rotation );
////	}
////}
////
/////*
////================
////idAFConstraint_BallAndSocketJoint::GetCenter
////================
////*/
////void idAFConstraint_BallAndSocketJoint::GetCenter( idVec3 &center ) {
////	center = body1.GetWorldOrigin() + anchor1 * body1.GetWorldAxis();
////}
////
/////*
////================
////idAFConstraint_BallAndSocketJoint::DebugDraw
////================
////*/
////void idAFConstraint_BallAndSocketJoint::DebugDraw( ) {
////	idVec3 a1 = body1.GetWorldOrigin() + anchor1 * body1.GetWorldAxis();
////	gameRenderWorld.DebugLine( colorBlue, a1 - idVec3( 5, 0, 0 ), a1 + idVec3( 5, 0, 0 ) );
////	gameRenderWorld.DebugLine( colorBlue, a1 - idVec3( 0, 5, 0 ), a1 + idVec3( 0, 5, 0 ) );
////	gameRenderWorld.DebugLine( colorBlue, a1 - idVec3( 0, 0, 5 ), a1 + idVec3( 0, 0, 5 ) );
////
////	if ( af_showLimits.GetBool() ) {
////		if ( coneLimit ) {
////			coneLimit.DebugDraw();
////		}
////		if ( pyramidLimit ) {
////			pyramidLimit.DebugDraw();
////		}
////	}
////}
////
/////*
////================
////idAFConstraint_BallAndSocketJoint::Save
////================
////*/
////void idAFConstraint_BallAndSocketJoint::Save( idSaveGame *saveFile ) const {
////	idAFConstraint::Save( saveFile );
////	saveFile.WriteVec3( anchor1 );
////	saveFile.WriteVec3( anchor2 );
////	saveFile.WriteFloat( friction );
////	if ( coneLimit ) {
////		coneLimit.Save( saveFile );
////	}
////	if ( pyramidLimit ) {
////		pyramidLimit.Save( saveFile );
////	}
////}
////
/////*
////================
////idAFConstraint_BallAndSocketJoint::Restore
////================
////*/
////void idAFConstraint_BallAndSocketJoint::Restore( idRestoreGame *saveFile ) {
////	idAFConstraint::Restore( saveFile );
////	saveFile.ReadVec3( anchor1 );
////	saveFile.ReadVec3( anchor2 );
////	saveFile.ReadFloat( friction );
////	if ( coneLimit ) {
////		coneLimit.Restore( saveFile );
////	}
////	if ( pyramidLimit ) {
////		pyramidLimit.Restore( saveFile );
////	}
////}
////
////
//////===============================================================
//////
//////	idAFConstraint_BallAndSocketJointFriction
//////
//////===============================================================
////
/////*
////================
////idAFConstraint_BallAndSocketJointFriction::idAFConstraint_BallAndSocketJointFriction
////================
////*/
////idAFConstraint_BallAndSocketJointFriction::idAFConstraint_BallAndSocketJointFriction( ) {
////	type = CONSTRAINT_FRICTION;
////	name = "ballAndSocketJointFriction";
////	InitSize( 3 );
////	joint = NULL;
////	fl.allowPrimary = false;
////	fl.frameConstraint = true;
////}
////
/////*
////================
////idAFConstraint_BallAndSocketJointFriction::Setup
////================
////*/
////void idAFConstraint_BallAndSocketJointFriction::Setup( idAFConstraint_BallAndSocketJoint *bsj ) {
////	this.joint = bsj;
////	body1 = bsj.GetBody1();
////	body2 = bsj.GetBody2();
////}
////
/////*
////================
////idAFConstraint_BallAndSocketJointFriction::Evaluate
////================
////*/
////void idAFConstraint_BallAndSocketJointFriction::Evaluate( float invTimeStep ) {
////	// do nothing
////}
////
/////*
////================
////idAFConstraint_BallAndSocketJointFriction::ApplyFriction
////================
////*/
////void idAFConstraint_BallAndSocketJointFriction::ApplyFriction( float invTimeStep ) {
////	// do nothing
////}
////
/////*
////================
////idAFConstraint_BallAndSocketJointFriction::Add
////================
////*/
////bool idAFConstraint_BallAndSocketJointFriction::Add( idPhysics_AF *phys, float invTimeStep ) {
////	float f;
////
////	physics = phys;
////
////	f = joint.GetFriction() * joint.GetMultiplier().Length();
////	if ( f == 0.0f ) {
////		return false;
////	}
////
////	lo[0] = lo[1] = lo[2] = -f;
////	hi[0] = hi[1] = hi[2] = f;
////
////	J1.Zero( 3, 6 );
////	J1[0][3] = J1[1][4] = J1[2][5] = 1.0f;
////
////	if ( body2 ) {
////
////		J2.Zero( 3, 6 );
////		J2[0][3] = J2[1][4] = J2[2][5] = 1.0f;
////	}
////
////	physics.AddFrameConstraint( this );
////
////	return true;
////}
////
/////*
////================
////idAFConstraint_BallAndSocketJointFriction::Translate
////================
////*/
////void idAFConstraint_BallAndSocketJointFriction::Translate( const idVec3 &translation ) {
////}
////
/////*
////================
////idAFConstraint_BallAndSocketJointFriction::Rotate
////================
////*/
////void idAFConstraint_BallAndSocketJointFriction::Rotate( const idRotation &rotation ) {
////}
////
////
//////===============================================================
//////
//////	idAFConstraint_UniversalJoint
//////
//////===============================================================
////
/////*
////================
////idAFConstraint_UniversalJoint::idAFConstraint_UniversalJoint
////================
////*/
////idAFConstraint_UniversalJoint::idAFConstraint_UniversalJoint( const idStr &name, idAFBody *body1, idAFBody *body2 ) {
////	assert( body1 );
////	type = CONSTRAINT_UNIVERSALJOINT;
////	this.name = name;
////	this.body1 = body1;
////	this.body2 = body2;
////	InitSize( 4 );
////	coneLimit = NULL;
////	pyramidLimit = NULL;
////	friction = 0.0f;
////	fc = NULL;
////	fl.allowPrimary = true;
////	fl.noCollision = true;
////}
////
/////*
////================
////idAFConstraint_UniversalJoint::~idAFConstraint_UniversalJoint
////================
////*/
////idAFConstraint_UniversalJoint::~idAFConstraint_UniversalJoint( ) {
////	if ( coneLimit ) {
////		delete coneLimit;
////	}
////	if ( pyramidLimit ) {
////		delete pyramidLimit;
////	}
////	if ( fc ) {
////		delete fc;
////	}
////}
////
/////*
////================
////idAFConstraint_UniversalJoint::SetAnchor
////================
////*/
////void idAFConstraint_UniversalJoint::SetAnchor( const idVec3 &worldPosition ) {
////
////	// get anchor relative to center of mass of body1
////	anchor1 = ( worldPosition - body1.GetWorldOrigin() ) * body1.GetWorldAxis().Transpose();
////	if ( body2 ) {
////		// get anchor relative to center of mass of body2
////		anchor2 = ( worldPosition - body2.GetWorldOrigin() ) * body2.GetWorldAxis().Transpose();
////	}
////	else {
////		anchor2 = worldPosition;
////	}
////
////	if ( coneLimit ) {
////		coneLimit.SetAnchor( anchor2 );
////	}
////	if ( pyramidLimit ) {
////		pyramidLimit.SetAnchor( anchor2 );
////	}
////}
////
/////*
////================
////idAFConstraint_UniversalJoint::GetAnchor
////================
////*/
////idVec3 idAFConstraint_UniversalJoint::GetAnchor( ) const {
////	if ( body2 ) {
////		return body2.GetWorldOrigin() + body2.GetWorldAxis() * anchor2;
////	}
////	return anchor2;
////}
////
/////*
////================
////idAFConstraint_UniversalJoint::SetShafts
////================
////*/
////void idAFConstraint_UniversalJoint::SetShafts( const idVec3 &cardanShaft1, const idVec3 &cardanShaft2 ) {
////	idVec3 cardanAxis;
////	float l;
////
////	shaft1 = cardanShaft1;
////	l = shaft1.Normalize();
////	assert( l != 0.0f );
////	shaft2 = cardanShaft2;
////	l = shaft2.Normalize();
////	assert( l != 0.0f );
////
////	// the cardan axis is a vector orthogonal to both cardan shafts
////	cardanAxis = shaft1.Cross( shaft2 );
////	if ( cardanAxis.Normalize() == 0.0f ) {
////		idVec3 vecY;
////		shaft1.OrthogonalBasis( cardanAxis, vecY );
////		cardanAxis.Normalize();
////	}
////
////	shaft1 *= body1.GetWorldAxis().Transpose();
////	axis1 = cardanAxis * body1.GetWorldAxis().Transpose();
////	if ( body2 ) {
////		shaft2 *= body2.GetWorldAxis().Transpose();
////		axis2 = cardanAxis * body2.GetWorldAxis().Transpose();
////	}
////	else {
////		axis2 = cardanAxis;
////	}
////
////	if ( coneLimit ) {
////		coneLimit.SetBody1Axis( shaft1 );
////	}
////	if ( pyramidLimit ) {
////		pyramidLimit.SetBody1Axis( shaft1 );
////	}
////}
////
/////*
////================
////idAFConstraint_UniversalJoint::SetNoLimit
////================
////*/
////void idAFConstraint_UniversalJoint::SetNoLimit( ) {
////	if ( coneLimit ) {
////		delete coneLimit;
////		coneLimit = NULL;
////	}
////	if ( pyramidLimit ) {
////		delete pyramidLimit;
////		pyramidLimit = NULL;
////	}
////}
////
/////*
////================
////idAFConstraint_UniversalJoint::SetConeLimit
////================
////*/
////void idAFConstraint_UniversalJoint::SetConeLimit( const idVec3 &coneAxis, const float coneAngle ) {
////	if ( pyramidLimit ) {
////		delete pyramidLimit;
////		pyramidLimit = NULL;
////	}
////	if ( !coneLimit ) {
////		coneLimit = new idAFConstraint_ConeLimit;
////		coneLimit.SetPhysics( physics );
////	}
////	if ( body2 ) {
////		coneLimit.Setup( body1, body2, anchor2, coneAxis * body2.GetWorldAxis().Transpose(), coneAngle, shaft1 );
////	}
////	else {
////		coneLimit.Setup( body1, body2, anchor2, coneAxis, coneAngle, shaft1 );
////	}
////}
////
/////*
////================
////idAFConstraint_UniversalJoint::SetPyramidLimit
////================
////*/
////void idAFConstraint_UniversalJoint::SetPyramidLimit( const idVec3 &pyramidAxis, const idVec3 &baseAxis,
////														const float angle1, const float angle2 ) {
////	if ( coneLimit ) {
////		delete coneLimit;
////		coneLimit = NULL;
////	}
////	if ( !pyramidLimit ) {
////		pyramidLimit = new idAFConstraint_PyramidLimit;
////		pyramidLimit.SetPhysics( physics );
////	}
////	if ( body2 ) {
////		pyramidLimit.Setup( body1, body2, anchor2, pyramidAxis * body2.GetWorldAxis().Transpose(),
////									baseAxis * body2.GetWorldAxis().Transpose(), angle1, angle2, shaft1 );
////	}
////	else {
////		pyramidLimit.Setup( body1, body2, anchor2, pyramidAxis, baseAxis, angle1, angle2, shaft1 );
////	}
////}
////
/////*
////================
////idAFConstraint_UniversalJoint::SetLimitEpsilon
////================
////*/
////void idAFConstraint_UniversalJoint::SetLimitEpsilon( const float e ) {
////	if ( coneLimit ) {
////		coneLimit.SetEpsilon( e );
////	}
////	if ( pyramidLimit ) {
////		pyramidLimit.SetEpsilon( e );
////	}
////}
////
/////*
////================
////idAFConstraint_UniversalJoint::GetFriction
////================
////*/
////float idAFConstraint_UniversalJoint::GetFriction( ) const {
////	if ( af_forceFriction.GetFloat() > 0.0f ) {
////		return af_forceFriction.GetFloat();
////	}
////	return friction * physics.GetJointFrictionScale();
////}
////
/////*
////================
////idAFConstraint_UniversalJoint::Evaluate
////
////  NOTE: this joint is homokinetic
////================
////*/
////void idAFConstraint_UniversalJoint::Evaluate( float invTimeStep ) {
////	idVec3 a1, a2, s1, s2, d1, d2, v;
////	idAFBody *master;
////
////	master = body2 ? body2 : physics.GetMasterBody();
////
////	a1 = anchor1 * body1.GetWorldAxis();
////	s1 = shaft1 * body1.GetWorldAxis();
////	d1 = s1.Cross( axis1 * body1.GetWorldAxis() );
////
////	if ( master ) {
////		a2 = anchor2 * master.GetWorldAxis();
////		s2 = shaft2 * master.GetWorldAxis();
////		d2 = axis2 * master.GetWorldAxis();
////		c1.SubVec3(0) = -( invTimeStep * ERROR_REDUCTION ) * ( a2 + master.GetWorldOrigin() - ( a1 + body1.GetWorldOrigin() ) );
////	}
////	else {
////		a2 = anchor2;
////		s2 = shaft2;
////		d2 = axis2;
////		c1.SubVec3(0) = -( invTimeStep * ERROR_REDUCTION ) * ( a2 - ( a1 + body1.GetWorldOrigin() ) );
////	}
////
////	J1.Set(	mat3_identity,	-SkewSymmetric( a1 ),
////				mat3_zero,		idMat3( s1[0], s1[1], s1[2],
////										0.0f, 0.0f, 0.0f,
////										0.0f, 0.0f, 0.0f ) );
////	J1.SetSize( 4, 6 );
////
////	if ( body2 ) {
////		J2.Set(	-mat3_identity,	SkewSymmetric( a2 ),
////					mat3_zero,		idMat3( s2[0], s2[1], s2[2],
////											0.0f, 0.0f, 0.0f,
////											0.0f, 0.0f, 0.0f ) );
////		J2.SetSize( 4, 6 );
////	}
////	else {
////		J2.Zero( 4, 6 );
////	}
////
////	v = s1.Cross( s2 );
////	if ( v.Normalize() != 0.0f ) {
////		idMat3 m1, m2;
////
////		m1[0] = s1;
////		m1[1] = v;
////		m1[2] = v.Cross( m1[0] );
////
////		m2[0] = -s2;
////		m2[1] = v;
////		m2[2] = v.Cross( m2[0] );
////
////		d2 *= m2.Transpose() * m1;
////	}
////
////	c1[3] = -( invTimeStep * ERROR_REDUCTION ) * ( d1 * d2 );
////
////	c1.Clamp( -ERROR_REDUCTION_MAX, ERROR_REDUCTION_MAX );
////
////	if ( coneLimit ) {
////		coneLimit.Add( physics, invTimeStep );
////	}
////	else if ( pyramidLimit ) {
////		pyramidLimit.Add( physics, invTimeStep );
////	}
////}
////
/////*
////================
////idAFConstraint_UniversalJoint::ApplyFriction
////================
////*/
////void idAFConstraint_UniversalJoint::ApplyFriction( float invTimeStep ) {
////	idVec3 angular;
////	float invMass, currentFriction;
////
////	currentFriction = GetFriction();
////
////	if ( currentFriction <= 0.0f ) {
////		return;
////	}
////
////	if ( af_useImpulseFriction.GetBool() || af_useJointImpulseFriction.GetBool() ) {
////
////		angular = body1.GetAngularVelocity();
////		invMass = body1.GetInverseMass();
////		if ( body2 ) {
////			angular -= body2.GetAngularVelocity();
////			invMass += body2.GetInverseMass();
////		}
////
////		angular *= currentFriction / invMass;
////
////		body1.SetAngularVelocity( body1.GetAngularVelocity() - angular * body1.GetInverseMass() );
////		if ( body2 ) {
////			body2.SetAngularVelocity( body2.GetAngularVelocity() + angular * body2.GetInverseMass() );
////		}
////	}
////	else {
////		if ( !fc ) {
////			fc = new idAFConstraint_UniversalJointFriction;
////			fc.Setup( this );
////		}
////
////		fc.Add( physics, invTimeStep );
////	}
////}
////
/////*
////================
////idAFConstraint_UniversalJoint::GetForce
////================
////*/
////void idAFConstraint_UniversalJoint::GetForce( idAFBody *body, idVec6 &force ) {
////	idAFConstraint::GetForce( body, force );
////	// FIXME: add limit force
////}
////
/////*
////================
////idAFConstraint_UniversalJoint::Translate
////================
////*/
////void idAFConstraint_UniversalJoint::Translate( const idVec3 &translation ) {
////	if ( !body2 ) {
////		anchor2 += translation;
////	}
////	if ( coneLimit ) {
////		coneLimit.Translate( translation );
////	}
////	else if ( pyramidLimit ) {
////		pyramidLimit.Translate( translation );
////	}
////}
////
/////*
////================
////idAFConstraint_UniversalJoint::Rotate
////================
////*/
////void idAFConstraint_UniversalJoint::Rotate( const idRotation &rotation ) {
////	if ( !body2 ) {
////		anchor2 *= rotation;
////		shaft2 *= rotation.ToMat3();
////		axis2 *= rotation.ToMat3();
////	}
////	if ( coneLimit ) {
////		coneLimit.Rotate( rotation );
////	}
////	else if ( pyramidLimit ) {
////		pyramidLimit.Rotate( rotation );
////	}
////}
////
/////*
////================
////idAFConstraint_UniversalJoint::GetCenter
////================
////*/
////void idAFConstraint_UniversalJoint::GetCenter( idVec3 &center ) {
////	center = body1.GetWorldOrigin() + anchor1 * body1.GetWorldAxis();
////}
////
/////*
////================
////idAFConstraint_UniversalJoint::DebugDraw
////================
////*/
////void idAFConstraint_UniversalJoint::DebugDraw( ) {
////	idVec3 a1, a2, s1, s2, d1, d2, v;
////	idAFBody *master;
////
////	master = body2 ? body2 : physics.GetMasterBody();
////
////	a1 = body1.GetWorldOrigin() + anchor1 * body1.GetWorldAxis();
////	s1 = shaft1 * body1.GetWorldAxis();
////	d1 = axis1 * body1.GetWorldAxis();
////
////	if ( master ) {
////        a2 = master.GetWorldOrigin() + anchor2 * master.GetWorldAxis();
////		s2 = shaft2 * master.GetWorldAxis();
////		d2 = axis2 * master.GetWorldAxis();
////	}
////	else {
////        a2 = anchor2;
////		s2 = shaft2;
////		d2 = axis2;
////	}
////
////	v = s1.Cross( s2 );
////	if ( v.Normalize() != 0.0f ) {
////		idMat3 m1, m2;
////
////		m1[0] = s1;
////		m1[1] = v;
////		m1[2] = v.Cross( m1[0] );
////
////		m2[0] = -s2;
////		m2[1] = v;
////		m2[2] = v.Cross( m2[0] );
////
////		d2 *= m2.Transpose() * m1;
////	}
////
////	gameRenderWorld.DebugArrow( colorCyan, a1, a1 + s1 * 5.0f, 1.0f );
////	gameRenderWorld.DebugArrow( colorBlue, a2, a2 + s2 * 5.0f, 1.0f );
////	gameRenderWorld.DebugLine( colorGreen, a1, a1 + d1 * 5.0f );
////	gameRenderWorld.DebugLine( colorGreen, a2, a2 + d2 * 5.0f );
////
////	if ( af_showLimits.GetBool() ) {
////		if ( coneLimit ) {
////			coneLimit.DebugDraw();
////		}
////		if ( pyramidLimit ) {
////			pyramidLimit.DebugDraw();
////		}
////	}
////}
////
/////*
////================
////idAFConstraint_UniversalJoint::Save
////================
////*/
////void idAFConstraint_UniversalJoint::Save( idSaveGame *saveFile ) const {
////	idAFConstraint::Save( saveFile );
////	saveFile.WriteVec3( anchor1 );
////	saveFile.WriteVec3( anchor2 );
////	saveFile.WriteVec3( shaft1 );
////	saveFile.WriteVec3( shaft2 );
////	saveFile.WriteVec3( axis1 );
////	saveFile.WriteVec3( axis2 );
////	saveFile.WriteFloat( friction );
////	if ( coneLimit ) {
////		coneLimit.Save( saveFile );
////	}
////	if ( pyramidLimit ) {
////		pyramidLimit.Save( saveFile );
////	}
////}
////
/////*
////================
////idAFConstraint_UniversalJoint::Restore
////================
////*/
////void idAFConstraint_UniversalJoint::Restore( idRestoreGame *saveFile ) {
////	idAFConstraint::Restore( saveFile );
////	saveFile.ReadVec3( anchor1 );
////	saveFile.ReadVec3( anchor2 );
////	saveFile.ReadVec3( shaft1 );
////	saveFile.ReadVec3( shaft2 );
////	saveFile.ReadVec3( axis1 );
////	saveFile.ReadVec3( axis2 );
////	saveFile.ReadFloat( friction );
////	if ( coneLimit ) {
////		coneLimit.Restore( saveFile );
////	}
////	if ( pyramidLimit ) {
////		pyramidLimit.Restore( saveFile );
////	}
////}
////
////
//////===============================================================
//////
//////	idAFConstraint_UniversalJointFriction
//////
//////===============================================================
////
/////*
////================
////idAFConstraint_UniversalJointFriction::idAFConstraint_UniversalJointFriction
////================
////*/
////idAFConstraint_UniversalJointFriction::idAFConstraint_UniversalJointFriction( ) {
////	type = CONSTRAINT_FRICTION;
////	name = "universalJointFriction";
////	InitSize( 2 );
////	joint = NULL;
////	fl.allowPrimary = false;
////	fl.frameConstraint = true;
////}
////
/////*
////================
////idAFConstraint_UniversalJointFriction::Setup
////================
////*/
////void idAFConstraint_UniversalJointFriction::Setup( idAFConstraint_UniversalJoint *uj ) {
////	this.joint = uj;
////	body1 = uj.GetBody1();
////	body2 = uj.GetBody2();
////}
////
/////*
////================
////idAFConstraint_UniversalJointFriction::Evaluate
////================
////*/
////void idAFConstraint_UniversalJointFriction::Evaluate( float invTimeStep ) {
////	// do nothing
////}
////
/////*
////================
////idAFConstraint_UniversalJointFriction::ApplyFriction
////================
////*/
////void idAFConstraint_UniversalJointFriction::ApplyFriction( float invTimeStep ) {
////	// do nothing
////}
////
/////*
////================
////idAFConstraint_UniversalJointFriction::Add
////================
////*/
////bool idAFConstraint_UniversalJointFriction::Add( idPhysics_AF *phys, float invTimeStep ) {
////	idVec3 s1, s2, dir1, dir2;
////	float f;
////
////	physics = phys;
////
////	f = joint.GetFriction() * joint.GetMultiplier().Length();
////	if ( f == 0.0f ) {
////		return false;
////	}
////
////	lo[0] = lo[1] = -f;
////	hi[0] = hi[1] = f;
////
////	joint.GetShafts( s1, s2 );
////
////	s1 *= body1.GetWorldAxis();
////	s1.NormalVectors( dir1, dir2 );
////
////	J1.SetSize( 2, 6 );
////	J1.SubVec6(0).SubVec3(0).Zero();
////	J1.SubVec6(0).SubVec3(1) = dir1;
////	J1.SubVec6(1).SubVec3(0).Zero();
////	J1.SubVec6(1).SubVec3(1) = dir2;
////
////	if ( body2 ) {
////
////		J2.SetSize( 2, 6 );
////		J2.SubVec6(0).SubVec3(0).Zero();
////		J2.SubVec6(0).SubVec3(1) = -dir1;
////		J2.SubVec6(1).SubVec3(0).Zero();
////		J2.SubVec6(1).SubVec3(1) = -dir2;
////	}
////
////	physics.AddFrameConstraint( this );
////
////	return true;
////}
////
/////*
////================
////idAFConstraint_UniversalJointFriction::Translate
////================
////*/
////void idAFConstraint_UniversalJointFriction::Translate( const idVec3 &translation ) {
////}
////
/////*
////================
////idAFConstraint_UniversalJointFriction::Rotate
////================
////*/
////void idAFConstraint_UniversalJointFriction::Rotate( const idRotation &rotation ) {
////}
////
////
//////===============================================================
//////
//////	idAFConstraint_CylindricalJoint
//////
//////===============================================================
////
/////*
////================
////idAFConstraint_CylindricalJoint::idAFConstraint_CylindricalJoint
////================
////*/
////idAFConstraint_CylindricalJoint::idAFConstraint_CylindricalJoint( const idStr &name, idAFBody *body1, idAFBody *body2 ) {
////	assert( 0 );	// FIXME: implement
////}
////
/////*
////================
////idAFConstraint_CylindricalJoint::Evaluate
////================
////*/
////void idAFConstraint_CylindricalJoint::Evaluate( float invTimeStep ) {
////	assert( 0 );	// FIXME: implement
////}
////
/////*
////================
////idAFConstraint_CylindricalJoint::ApplyFriction
////================
////*/
////void idAFConstraint_CylindricalJoint::ApplyFriction( float invTimeStep ) {
////	assert( 0 );	// FIXME: implement
////}
////
/////*
////================
////idAFConstraint_CylindricalJoint::Translate
////================
////*/
////void idAFConstraint_CylindricalJoint::Translate( const idVec3 &translation ) {
////	assert( 0 );	// FIXME: implement
////}
////
/////*
////================
////idAFConstraint_CylindricalJoint::Rotate
////================
////*/
////void idAFConstraint_CylindricalJoint::Rotate( const idRotation &rotation ) {
////	assert( 0 );	// FIXME: implement
////}
////
/////*
////================
////idAFConstraint_CylindricalJoint::DebugDraw
////================
////*/
////void idAFConstraint_CylindricalJoint::DebugDraw( ) {
////	assert( 0 );	// FIXME: implement
////}
////
////
//////===============================================================
//////
//////	idAFConstraint_Hinge
//////
//////===============================================================
////
/////*
////================
////idAFConstraint_Hinge::idAFConstraint_Hinge
////================
////*/
////idAFConstraint_Hinge::idAFConstraint_Hinge( const idStr &name, idAFBody *body1, idAFBody *body2 ) {
////	assert( body1 );
////	type = CONSTRAINT_HINGE;
////	this.name = name;
////	this.body1 = body1;
////	this.body2 = body2;
////	InitSize( 5 );
////	coneLimit = NULL;
////	steering = NULL;
////	friction = 0.0f;
////	fc = NULL;
////	fl.allowPrimary = true;
////	fl.noCollision = true;
////	initialAxis = body1.GetWorldAxis();
////	if ( body2 ) {
////		initialAxis *= body2.GetWorldAxis().Transpose();
////	}
////}
////
/////*
////================
////idAFConstraint_Hinge::~idAFConstraint_Hinge
////================
////*/
////idAFConstraint_Hinge::~idAFConstraint_Hinge( ) {
////	if ( coneLimit ) {
////		delete coneLimit;
////	}
////	if ( fc ) {
////		delete fc;
////	}
////	if ( steering ) {
////		delete steering;
////	}
////}
////
/////*
////================
////idAFConstraint_Hinge::SetAnchor
////================
////*/
////void idAFConstraint_Hinge::SetAnchor( const idVec3 &worldPosition ) {
////	// get anchor relative to center of mass of body1
////	anchor1 = ( worldPosition - body1.GetWorldOrigin() ) * body1.GetWorldAxis().Transpose();
////	if ( body2 ) {
////		// get anchor relative to center of mass of body2
////		anchor2 = ( worldPosition - body2.GetWorldOrigin() ) * body2.GetWorldAxis().Transpose();
////	}
////	else {
////		anchor2 = worldPosition;
////	}
////
////	if ( coneLimit ) {
////		coneLimit.SetAnchor( anchor2 );
////	}
////}
////
/////*
////================
////idAFConstraint_Hinge::GetAnchor
////================
////*/
////idVec3 idAFConstraint_Hinge::GetAnchor( ) const {
////	if ( body2 ) {
////		return body2.GetWorldOrigin() + body2.GetWorldAxis() * anchor2;
////	}
////	return anchor2;
////}
////
/////*
////================
////idAFConstraint_Hinge::SetAxis
////================
////*/
////void idAFConstraint_Hinge::SetAxis( const idVec3 &axis ) {
////	idVec3 normAxis;
////
////	normAxis = axis;
////	normAxis.Normalize();
////
////	// get axis relative to body1
////	axis1 = normAxis * body1.GetWorldAxis().Transpose();
////	if ( body2 ) {
////		// get axis relative to body2
////		axis2 = normAxis * body2.GetWorldAxis().Transpose();
////	}
////	else {
////		axis2 = normAxis;
////	}
////}
////
/////*
////================
////idAFConstraint_Hinge::GetAxis
////================
////*/
////idVec3 idAFConstraint_Hinge::GetAxis( ) const {
////	if ( body2 ) {
////		return axis2 * body2.GetWorldAxis();
////	}
////	return axis2;
////}

/////*
////================
////idAFConstraint_Hinge::SetNoLimit
////================
////*/
////void idAFConstraint_Hinge::SetNoLimit( ) {
////	if ( coneLimit ) {
////		delete coneLimit;
////		coneLimit = NULL;
////	}
////}
////
/////*
////================
////idAFConstraint_Hinge::SetLimit
////================
////*/
////void idAFConstraint_Hinge::SetLimit( const idVec3 &axis, const float angle, const idVec3 &body1Axis ) {
////	if ( !coneLimit ) {
////		coneLimit = new idAFConstraint_ConeLimit;
////		coneLimit.SetPhysics( physics );
////	}
////	if ( body2 ) {
////		coneLimit.Setup( body1, body2, anchor2, axis * body2.GetWorldAxis().Transpose(), angle, body1Axis * body1.GetWorldAxis().Transpose() );
////	}
////	else {
////		coneLimit.Setup( body1, body2, anchor2, axis, angle, body1Axis * body1.GetWorldAxis().Transpose() );
////	}
////}
////
/////*
////================
////idAFConstraint_Hinge::SetLimitEpsilon
////================
////*/
////void idAFConstraint_Hinge::SetLimitEpsilon( const float e ) {
////	if ( coneLimit ) {
////		coneLimit.SetEpsilon( e );
////	}
////}
////
/////*
////================
////idAFConstraint_Hinge::GetFriction
////================
////*/
////float idAFConstraint_Hinge::GetFriction( ) const {
////	if ( af_forceFriction.GetFloat() > 0.0f ) {
////		return af_forceFriction.GetFloat();
////	}
////	return friction * physics.GetJointFrictionScale();
////}
////
/////*
////================
////idAFConstraint_Hinge::GetAngle
////================
////*/
////float idAFConstraint_Hinge::GetAngle( ) const {
////	idMat3 axis;
////	idRotation rotation;
////	float angle;
////
////	axis = body1.GetWorldAxis() * body2.GetWorldAxis().Transpose() * initialAxis.Transpose();
////	rotation = axis.ToRotation();
////	angle = rotation.GetAngle();
////	if ( rotation.GetVec() * axis1 < 0.0f ) {
////		return -angle;
////	}
////	return angle;
////}
////
/////*
////================
////idAFConstraint_Hinge::SetSteerAngle
////================
////*/
////void idAFConstraint_Hinge::SetSteerAngle( const float degrees ) {
////	if ( coneLimit ) {
////		delete coneLimit;
////		coneLimit = NULL;
////	}
////	if ( !steering ) {
////		steering = new idAFConstraint_HingeSteering();
////		steering.Setup( this );
////	}
////	steering.SetSteerAngle( degrees );
////}
////
/////*
////================
////idAFConstraint_Hinge::SetSteerSpeed
////================
////*/
////void idAFConstraint_Hinge::SetSteerSpeed( const float speed ) {
////	if ( steering ) {
////		steering.SetSteerSpeed( speed );
////	}
////}
////
/////*
////================
////idAFConstraint_Hinge::Evaluate
////================
////*/
////void idAFConstraint_Hinge::Evaluate( float invTimeStep ) {
////	idVec3 a1, a2;
////	idVec3 x1, x2, cross;
////	idVec3 vecX, vecY;
////	idAFBody *master;
////
////	master = body2 ? body2 : physics.GetMasterBody();
////
////	x1 = axis1 * body1.GetWorldAxis();		// axis in body1 space
////	x1.OrthogonalBasis( vecX, vecY );				// basis for axis in body1 space
////
////	a1 = anchor1 * body1.GetWorldAxis();	// anchor in body1 space
////
////	if ( master ) {
////		a2 = anchor2 * master.GetWorldAxis();	// anchor in master space
////		x2 = axis2 * master.GetWorldAxis();
////		c1.SubVec3(0) = -( invTimeStep * ERROR_REDUCTION ) * ( a2 + master.GetWorldOrigin() - ( a1 + body1.GetWorldOrigin() ) );
////	}
////	else {
////		a2 = anchor2;
////		x2 = axis2;
////		c1.SubVec3(0) = -( invTimeStep * ERROR_REDUCTION ) * ( a2 - ( a1 + body1.GetWorldOrigin() ) );
////	}
////
////	J1.Set(	mat3_identity,	-SkewSymmetric( a1 ),
////				mat3_zero,		idMat3(	vecX[0], vecX[1], vecX[2],
////										vecY[0], vecY[1], vecY[2],
////										0.0f, 0.0f, 0.0f ) );
////	J1.SetSize( 5, 6 );
////
////	if ( body2 ) {
////		J2.Set(	-mat3_identity,	SkewSymmetric( a2 ),
////					mat3_zero,		idMat3(	-vecX[0], -vecX[1], -vecX[2],
////											-vecY[0], -vecY[1], -vecY[2],
////											0.0f, 0.0f, 0.0f ) );
////		J2.SetSize( 5, 6 );
////	}
////	else {
////		J2.Zero( 5, 6 );
////	}
////
////	cross = x1.Cross( x2 );
////
////	c1[3] = -( invTimeStep * ERROR_REDUCTION ) * ( cross * vecX );
////	c1[4] = -( invTimeStep * ERROR_REDUCTION ) * ( cross * vecY );
////
////	c1.Clamp( -ERROR_REDUCTION_MAX, ERROR_REDUCTION_MAX );
////
////	if ( steering ) {
////		steering.Add( physics, invTimeStep );
////	}
////	else if ( coneLimit ) {
////		coneLimit.Add( physics, invTimeStep );
////	}
////}
////
/////*
////================
////idAFConstraint_Hinge::ApplyFriction
////================
////*/
////void idAFConstraint_Hinge::ApplyFriction( float invTimeStep ) {
////	idVec3 angular;
////	float invMass, currentFriction;
////
////	currentFriction = GetFriction();
////
////	if ( currentFriction <= 0.0f ) {
////		return;
////	}
////
////	if ( af_useImpulseFriction.GetBool() || af_useJointImpulseFriction.GetBool() ) {
////
////		angular = body1.GetAngularVelocity();
////		invMass = body1.GetInverseMass();
////		if ( body2 ) {
////			angular -= body2.GetAngularVelocity();
////			invMass += body2.GetInverseMass();
////		}
////
////		angular *= currentFriction / invMass;
////
////		body1.SetAngularVelocity( body1.GetAngularVelocity() - angular * body1.GetInverseMass() );
////		if ( body2 ) {
////			body2.SetAngularVelocity( body2.GetAngularVelocity() + angular * body2.GetInverseMass() );
////		}
////	}
////	else {
////		if ( !fc ) {
////			fc = new idAFConstraint_HingeFriction;
////			fc.Setup( this );
////		}
////
////		fc.Add( physics, invTimeStep );
////	}
////}
////
/////*
////================
////idAFConstraint_Hinge::GetForce
////================
////*/
////void idAFConstraint_Hinge::GetForce( idAFBody *body, idVec6 &force ) {
////	idAFConstraint::GetForce( body, force );
////	// FIXME: add limit force
////}
////
/////*
////================
////idAFConstraint_Hinge::Translate
////================
////*/
////void idAFConstraint_Hinge::Translate( const idVec3 &translation ) {
////	if ( !body2 ) {
////		anchor2 += translation;
////	}
////	if ( coneLimit ) {
////		coneLimit.Translate( translation );
////	}
////}
////
/////*
////================
////idAFConstraint_Hinge::Rotate
////================
////*/
////void idAFConstraint_Hinge::Rotate( const idRotation &rotation ) {
////	if ( !body2 ) {
////		anchor2 *= rotation;
////		axis2 *= rotation.ToMat3();
////	}
////	if ( coneLimit ) {
////		coneLimit.Rotate( rotation );
////	}
////}
////
/////*
////================
////idAFConstraint_Hinge::GetCenter
////================
////*/
////void idAFConstraint_Hinge::GetCenter( idVec3 &center ) {
////	center = body1.GetWorldOrigin() + anchor1 * body1.GetWorldAxis();
////}
////
/////*
////================
////idAFConstraint_Hinge::DebugDraw
////================
////*/
////void idAFConstraint_Hinge::DebugDraw( ) {
////	idVec3 vecX, vecY;
////	idVec3 a1 = body1.GetWorldOrigin() + anchor1 * body1.GetWorldAxis();
////	idVec3 x1 = axis1 * body1.GetWorldAxis();
////	x1.OrthogonalBasis( vecX, vecY );
////
////	gameRenderWorld.DebugArrow( colorBlue, a1 - 4.0f * x1, a1 + 4.0f * x1, 1 );
////	gameRenderWorld.DebugLine( colorBlue, a1 - 2.0f * vecX, a1 + 2.0f * vecX );
////	gameRenderWorld.DebugLine( colorBlue, a1 - 2.0f * vecY, a1 + 2.0f * vecY );
////
////	if ( af_showLimits.GetBool() ) {
////		if ( coneLimit ) {
////			coneLimit.DebugDraw();
////		}
////	}
////}
////
/////*
////================
////idAFConstraint_Hinge::Save
////================
////*/
////void idAFConstraint_Hinge::Save( idSaveGame *saveFile ) const {
////	idAFConstraint::Save( saveFile );
////	saveFile.WriteVec3( anchor1 );
////	saveFile.WriteVec3( anchor2 );
////	saveFile.WriteVec3( axis1 );
////	saveFile.WriteVec3( axis2 );
////	saveFile.WriteMat3( initialAxis );
////	saveFile.WriteFloat( friction );
////	if ( coneLimit ) {
////		saveFile.WriteBool( true );
////		coneLimit.Save( saveFile );
////	} else {
////		saveFile.WriteBool( false );
////	}
////	if ( steering ) {
////		saveFile.WriteBool( true );
////		steering.Save( saveFile );
////	} else {
////		saveFile.WriteBool( false );
////	}
////	if ( fc ) {
////		saveFile.WriteBool( true );
////		fc.Save( saveFile );
////	} else {
////		saveFile.WriteBool( false );
////	}
////}
////
/////*
////================
////idAFConstraint_Hinge::Restore
////================
////*/
////void idAFConstraint_Hinge::Restore( idRestoreGame *saveFile ) {
////	bool b;
////	idAFConstraint::Restore( saveFile );
////	saveFile.ReadVec3( anchor1 );
////	saveFile.ReadVec3( anchor2 );
////	saveFile.ReadVec3( axis1 );
////	saveFile.ReadVec3( axis2 );
////	saveFile.ReadMat3( initialAxis );
////	saveFile.ReadFloat( friction );
////
////	saveFile.ReadBool( b );
////	if ( b ) {
////		if ( !coneLimit ) {
////			coneLimit = new idAFConstraint_ConeLimit;
////		}
////		coneLimit.SetPhysics( physics );
////		coneLimit.Restore( saveFile );
////	}
////	saveFile.ReadBool( b );
////	if ( b ) {
////		if ( !steering ) {
////			steering = new idAFConstraint_HingeSteering;
////		}
////		steering.Setup( this );
////		steering.Restore( saveFile );
////	}
////	saveFile.ReadBool( b );
////	if ( b ) {
////		if ( !fc ) {
////			fc = new idAFConstraint_HingeFriction;
////		}
////		fc.Setup( this );
////		fc.Restore( saveFile );
////	}
////}
////
////
//////===============================================================
//////
//////	idAFConstraint_HingeFriction
//////
//////===============================================================
////
/////*
////================
////idAFConstraint_HingeFriction::idAFConstraint_HingeFriction
////================
////*/
////idAFConstraint_HingeFriction::idAFConstraint_HingeFriction( ) {
////	type = CONSTRAINT_FRICTION;
////	name = "hingeFriction";
////	InitSize( 1 );
////	hinge = NULL;
////	fl.allowPrimary = false;
////	fl.frameConstraint = true;
////}
////
/////*
////================
////idAFConstraint_HingeFriction::Setup
////================
////*/
////void idAFConstraint_HingeFriction::Setup( idAFConstraint_Hinge *h ) {
////	this.hinge = h;
////	body1 = h.GetBody1();
////	body2 = h.GetBody2();
////}
////
/////*
////================
////idAFConstraint_HingeFriction::Evaluate
////================
////*/
////void idAFConstraint_HingeFriction::Evaluate( float invTimeStep ) {
////	// do nothing
////}
////
/////*
////================
////idAFConstraint_HingeFriction::ApplyFriction
////================
////*/
////void idAFConstraint_HingeFriction::ApplyFriction( float invTimeStep ) {
////	// do nothing
////}
////
/////*
////================
////idAFConstraint_HingeFriction::Add
////================
////*/
////bool idAFConstraint_HingeFriction::Add( idPhysics_AF *phys, float invTimeStep ) {
////	idVec3 a1, a2;
////	float f;
////
////	physics = phys;
////
////	f = hinge.GetFriction() * hinge.GetMultiplier().Length();
////	if ( f == 0.0f ) {
////		return false;
////	}
////
////	lo[0] = -f;
////	hi[0] = f;
////
////	hinge.GetAxis( a1, a2 );
////
////	a1 *= body1.GetWorldAxis();
////
////	J1.SetSize( 1, 6 );
////	J1.SubVec6(0).SubVec3(0).Zero();
////	J1.SubVec6(0).SubVec3(1) = a1;
////
////	if ( body2 ) {
////		a2 *= body2.GetWorldAxis();
////
////		J2.SetSize( 1, 6 );
////		J2.SubVec6(0).SubVec3(0).Zero();
////		J2.SubVec6(0).SubVec3(1) = -a2;
////	}
////
////	physics.AddFrameConstraint( this );
////
////	return true;
////}
////
/////*
////================
////idAFConstraint_HingeFriction::Translate
////================
////*/
////void idAFConstraint_HingeFriction::Translate( const idVec3 &translation ) {
////}
////
/////*
////================
////idAFConstraint_HingeFriction::Rotate
////================
////*/
////void idAFConstraint_HingeFriction::Rotate( const idRotation &rotation ) {
////}
////
////
//////===============================================================
//////
//////	idAFConstraint_HingeSteering
//////
//////===============================================================
////
/////*
////================
////idAFConstraint_HingeSteering::idAFConstraint_HingeSteering
////================
////*/
////idAFConstraint_HingeSteering::idAFConstraint_HingeSteering( ) {
////	type = CONSTRAINT_HINGESTEERING;
////	name = "hingeFriction";
////	InitSize( 1 );
////	hinge = NULL;
////	fl.allowPrimary = false;
////	fl.frameConstraint = true;
////	steerSpeed = 0.0f;
////	epsilon = LCP_EPSILON;
////}
////
/////*
////================
////idAFConstraint_HingeSteering::Save
////================
////*/
////void idAFConstraint_HingeSteering::Save( idSaveGame *saveFile ) const {
////	saveFile.WriteFloat(steerAngle);
////	saveFile.WriteFloat(steerSpeed);
////	saveFile.WriteFloat(epsilon);
////}
////
/////*
////================
////idAFConstraint_HingeSteering::Restore
////================
////*/
////void idAFConstraint_HingeSteering::Restore( idRestoreGame *saveFile ) {
////	saveFile.ReadFloat(steerAngle);
////	saveFile.ReadFloat(steerSpeed);
////	saveFile.ReadFloat(epsilon);
////}
////
/////*
////================
////idAFConstraint_HingeSteering::Setup
////================
////*/
////void idAFConstraint_HingeSteering::Setup( idAFConstraint_Hinge *h ) {
////	this.hinge = h;
////	body1 = h.GetBody1();
////	body2 = h.GetBody2();
////}
////
/////*
////================
////idAFConstraint_HingeSteering::Evaluate
////================
////*/
////void idAFConstraint_HingeSteering::Evaluate( float invTimeStep ) {
////	// do nothing
////}
////
/////*
////================
////idAFConstraint_HingeSteering::ApplyFriction
////================
////*/
////void idAFConstraint_HingeSteering::ApplyFriction( float invTimeStep ) {
////	// do nothing
////}
////
/////*
////================
////idAFConstraint_HingeSteering::Add
////================
////*/
////bool idAFConstraint_HingeSteering::Add( idPhysics_AF *phys, float invTimeStep ) {
////	float angle, speed;
////	idVec3 a1, a2;
////
////	physics = phys;
////
////	hinge.GetAxis( a1, a2 );
////	angle = hinge.GetAngle();
////
////	a1 *= body1.GetWorldAxis();
////
////	J1.SetSize( 1, 6 );
////	J1.SubVec6(0).SubVec3(0).Zero();
////	J1.SubVec6(0).SubVec3(1) = a1;
////
////	if ( body2 ) {
////		a2 *= body2.GetWorldAxis();
////
////		J2.SetSize( 1, 6 );
////		J2.SubVec6(0).SubVec3(0).Zero();
////		J2.SubVec6(0).SubVec3(1) = -a2;
////	}
////
////	speed = steerAngle - angle;
////	if ( steerSpeed != 0.0f ) {
////		if ( speed > steerSpeed ) {
////			speed = steerSpeed;
////		}
////		else if ( speed < -steerSpeed ) {
////			speed = -steerSpeed;
////		}
////	}
////
////	c1[0] = DEG2RAD( speed ) * invTimeStep;
////
////	physics.AddFrameConstraint( this );
////
////	return true;
////}
////
/////*
////================
////idAFConstraint_HingeSteering::Translate
////================
////*/
////void idAFConstraint_HingeSteering::Translate( const idVec3 &translation ) {
////}
////
/////*
////================
////idAFConstraint_HingeSteering::Rotate
////================
////*/
////void idAFConstraint_HingeSteering::Rotate( const idRotation &rotation ) {
////}
////
////
//////===============================================================
//////
//////	idAFConstraint_Slider
//////
//////===============================================================
////
/////*
////================
////idAFConstraint_Slider::idAFConstraint_Slider
////================
////*/
////idAFConstraint_Slider::idAFConstraint_Slider( const idStr &name, idAFBody *body1, idAFBody *body2 ) {
////	assert( body1 );
////	type = CONSTRAINT_SLIDER;
////	this.name = name;
////	this.body1 = body1;
////	this.body2 = body2;
////	InitSize( 5 );
////	fl.allowPrimary = true;
////	fl.noCollision = true;
////
////	if ( body2 ) {
////		offset = ( body1.GetWorldOrigin() - body2.GetWorldOrigin() ) * body1.GetWorldAxis().Transpose();
////		relAxis = body1.GetWorldAxis() * body2.GetWorldAxis().Transpose();
////	}
////	else {
////		offset = body1.GetWorldOrigin();
////		relAxis = body1.GetWorldAxis();
////	}
////}
////
/////*
////================
////idAFConstraint_Slider::SetAxis
////================
////*/
////void idAFConstraint_Slider::SetAxis( const idVec3 &ax ) {
////	idVec3 normAxis;
////
////	// get normalized axis relative to body1
////	normAxis = ax;
////	normAxis.Normalize();
////	if ( body2 ) {
////		axis = normAxis * body2.GetWorldAxis().Transpose();
////	}
////	else {
////		axis = normAxis;
////	}
////}
////
/////*
////================
////idAFConstraint_Slider::Evaluate
////================
////*/
////void idAFConstraint_Slider::Evaluate( float invTimeStep ) {
////	idVec3 vecX, vecY, ofs;
////	idRotation r;
////	idAFBody *master;
////
////	master = body2 ? body2 : physics.GetMasterBody();
////
////	if ( master ) {
////		(axis * master.GetWorldAxis()).OrthogonalBasis( vecX, vecY );
////		ofs = master.GetWorldOrigin() + master.GetWorldAxis() * offset - body1.GetWorldOrigin();
////		r = ( body1.GetWorldAxis().Transpose() * (relAxis * master.GetWorldAxis()) ).ToRotation();
////	}
////	else {
////		axis.OrthogonalBasis( vecX, vecY );
////		ofs = offset - body1.GetWorldOrigin();
////		r = ( body1.GetWorldAxis().Transpose() * relAxis ).ToRotation();
////	}
////
////	J1.Set(	mat3_zero, mat3_identity,
////			idMat3( vecX, vecY, vec3_origin ), mat3_zero );
////	J1.SetSize( 5, 6 );
////
////	if ( body2 ) {
////
////		J2.Set(	mat3_zero, -mat3_identity,
////				idMat3( -vecX, -vecY, vec3_origin ), mat3_zero );
////		J2.SetSize( 5, 6 );
////	}
////	else {
////		J2.Zero( 5, 6 );
////	}
////
////	c1.SubVec3(0) = -( invTimeStep * ERROR_REDUCTION ) * ( r.GetVec() * - (float) DEG2RAD( r.GetAngle() ) );
////
////	c1[3] = -( invTimeStep * ERROR_REDUCTION ) * ( vecX * ofs );
////	c1[4] = -( invTimeStep * ERROR_REDUCTION ) * ( vecY * ofs );
////
////	c1.Clamp( -ERROR_REDUCTION_MAX, ERROR_REDUCTION_MAX );
////}
////
/////*
////================
////idAFConstraint_Slider::ApplyFriction
////================
////*/
////void idAFConstraint_Slider::ApplyFriction( float invTimeStep ) {
////	// no friction
////}
////
/////*
////================
////idAFConstraint_Slider::Translate
////================
////*/
////void idAFConstraint_Slider::Translate( const idVec3 &translation ) {
////	if ( !body2 ) {
////		offset += translation;
////	}
////}
////
/////*
////================
////idAFConstraint_Slider::Rotate
////================
////*/
////void idAFConstraint_Slider::Rotate( const idRotation &rotation ) {
////	if ( !body2 ) {
////		offset *= rotation;
////	}
////}
////
/////*
////================
////idAFConstraint_Slider::GetCenter
////================
////*/
////void idAFConstraint_Slider::GetCenter( idVec3 &center ) {
////	idAFBody *master;
////
////	master = body2 ? body2 : physics.GetMasterBody();
////	if ( master ) {
////		center = master.GetWorldOrigin() + master.GetWorldAxis() * offset - body1.GetWorldOrigin();
////	}
////	else {
////		center = offset - body1.GetWorldOrigin();
////	}
////}
////
/////*
////================
////idAFConstraint_Slider::DebugDraw
////================
////*/
////void idAFConstraint_Slider::DebugDraw( ) {
////	idVec3 ofs;
////	idAFBody *master;
////
////	master = body2 ? body2 : physics.GetMasterBody();
////	if ( master ) {
////		ofs = master.GetWorldOrigin() + master.GetWorldAxis() * offset - body1.GetWorldOrigin();
////	}
////	else {
////		ofs = offset - body1.GetWorldOrigin();
////	}
////	gameRenderWorld.DebugLine( colorGreen, ofs, ofs + axis * body1.GetWorldAxis() );
////}
////
/////*
////================
////idAFConstraint_Slider::Save
////================
////*/
////void idAFConstraint_Slider::Save( idSaveGame *saveFile ) const {
////	idAFConstraint::Save( saveFile );
////	saveFile.WriteVec3( axis );
////	saveFile.WriteVec3( offset );
////	saveFile.WriteMat3( relAxis );
////}
////
/////*
////================
////idAFConstraint_Slider::Restore
////================
////*/
////void idAFConstraint_Slider::Restore( idRestoreGame *saveFile ) {
////	idAFConstraint::Restore( saveFile );
////	saveFile.ReadVec3( axis );
////	saveFile.ReadVec3( offset );
////	saveFile.ReadMat3( relAxis );
////}
////
////
//////===============================================================
//////
//////	idAFConstraint_Line
//////
//////===============================================================
////
/////*
////================
////idAFConstraint_Line::idAFConstraint_Line
////================
////*/
////idAFConstraint_Line::idAFConstraint_Line( const idStr &name, idAFBody *body1, idAFBody *body2 ) {
////	assert( 0 );	// FIXME: implement
////}
////
/////*
////================
////idAFConstraint_Line::Evaluate
////================
////*/
////void idAFConstraint_Line::Evaluate( float invTimeStep ) {
////	assert( 0 );	// FIXME: implement
////}
////
/////*
////================
////idAFConstraint_Line::ApplyFriction
////================
////*/
////void idAFConstraint_Line::ApplyFriction( float invTimeStep ) {
////	assert( 0 );	// FIXME: implement
////}
////
/////*
////================
////idAFConstraint_Line::Translate
////================
////*/
////void idAFConstraint_Line::Translate( const idVec3 &translation ) {
////	assert( 0 );	// FIXME: implement
////}
////
/////*
////================
////idAFConstraint_Line::Rotate
////================
////*/
////void idAFConstraint_Line::Rotate( const idRotation &rotation ) {
////	assert( 0 );	// FIXME: implement
////}
////
/////*
////================
////idAFConstraint_Line::DebugDraw
////================
////*/
////void idAFConstraint_Line::DebugDraw( ) {
////	assert( 0 );	// FIXME: implement
////}
////
////
//////===============================================================
//////
//////	idAFConstraint_Plane
//////
//////===============================================================
////
/////*
////================
////idAFConstraint_Plane::idAFConstraint_Plane
////================
////*/
////idAFConstraint_Plane::idAFConstraint_Plane( const idStr &name, idAFBody *body1, idAFBody *body2 ) {
////	assert( body1 );
////	type = CONSTRAINT_PLANE;
////	this.name = name;
////	this.body1 = body1;
////	this.body2 = body2;
////	InitSize( 1 );
////	fl.allowPrimary = true;
////	fl.noCollision = true;
////}
////
/////*
////================
////idAFConstraint_Plane::SetPlane
////================
////*/
////void idAFConstraint_Plane::SetPlane( const idVec3 &normal, const idVec3 &anchor ) {
////	// get anchor relative to center of mass of body1
////	anchor1 = ( anchor - body1.GetWorldOrigin() ) * body1.GetWorldAxis().Transpose();
////	if ( body2 ) {
////		// get anchor relative to center of mass of body2
////		anchor2 = ( anchor - body2.GetWorldOrigin() ) * body2.GetWorldAxis().Transpose();
////		planeNormal = normal * body2.GetWorldAxis().Transpose();
////	}
////	else {
////		anchor2 = anchor;
////		planeNormal = normal;
////	}
////}
////
/////*
////================
////idAFConstraint_Plane::Evaluate
////================
////*/
////void idAFConstraint_Plane::Evaluate( float invTimeStep ) {
////	idVec3 a1, a2, normal, p;
////	idVec6 v;
////	idAFBody *master;
////
////	master = body2 ? body2 : physics.GetMasterBody();
////
////	a1 = body1.GetWorldOrigin() + anchor1 * body1.GetWorldAxis();
////	if ( master ) {
////		a2 = master.GetWorldOrigin() + anchor2 * master.GetWorldAxis();
////		normal = planeNormal * master.GetWorldAxis();
////	}
////	else {
////		a2 = anchor2;
////		normal = planeNormal;
////	}
////
////	p = a1 - body1.GetWorldOrigin();
////	v.SubVec3(0) = normal;
////	v.SubVec3(1) = p.Cross( normal );
////	J1.Set( 1, 6, v.ToFloatPtr() );
////
////	if ( body2 ) {
////		p = a1 - body2.GetWorldOrigin();
////		v.SubVec3(0) = -normal;
////		v.SubVec3(1) = p.Cross( -normal );
////		J2.Set( 1, 6, v.ToFloatPtr() );
////	}
////
////	c1[0] = -( invTimeStep * ERROR_REDUCTION ) * (a1 * normal - a2 * normal);
////
////	c1.Clamp( -ERROR_REDUCTION_MAX, ERROR_REDUCTION_MAX );
////}
////
/////*
////================
////idAFConstraint_Plane::ApplyFriction
////================
////*/
////void idAFConstraint_Plane::ApplyFriction( float invTimeStep ) {
////	// no friction
////}
////
/////*
////================
////idAFConstraint_Plane::Translate
////================
////*/
////void idAFConstraint_Plane::Translate( const idVec3 &translation ) {
////	if ( !body2 ) {
////		anchor2 += translation;
////	}
////}
////
/////*
////================
////idAFConstraint_Plane::Rotate
////================
////*/
////void idAFConstraint_Plane::Rotate( const idRotation &rotation ) {
////	if ( !body2 ) {
////		anchor2 *= rotation;
////		planeNormal *= rotation.ToMat3();
////	}
////}
////
/////*
////================
////idAFConstraint_Plane::DebugDraw
////================
////*/
////void idAFConstraint_Plane::DebugDraw( ) {
////	idVec3 a1, normal, right, up;
////	idAFBody *master;
////
////	master = body2 ? body2 : physics.GetMasterBody();
////
////	a1 = body1.GetWorldOrigin() + anchor1 * body1.GetWorldAxis();
////	if ( master ) {
////		normal = planeNormal * master.GetWorldAxis();
////	}
////	else {
////		normal = planeNormal;
////	}
////	normal.NormalVectors( right, up );
////	normal *= 4.0f;
////	right *= 4.0f;
////	up *= 4.0f;
////
////	gameRenderWorld.DebugLine( colorCyan, a1 - right, a1 + right );
////	gameRenderWorld.DebugLine( colorCyan, a1 - up, a1 + up );
////	gameRenderWorld.DebugArrow( colorCyan, a1, a1 + normal, 1 );
////}
////
/////*
////================
////idAFConstraint_Plane::Save
////================
////*/
////void idAFConstraint_Plane::Save( idSaveGame *saveFile ) const {
////	idAFConstraint::Save( saveFile );
////	saveFile.WriteVec3( anchor1 );
////	saveFile.WriteVec3( anchor2 );
////	saveFile.WriteVec3( planeNormal );
////}
////
/////*
////================
////idAFConstraint_Plane::Restore
////================
////*/
////void idAFConstraint_Plane::Restore( idRestoreGame *saveFile ) {
////	idAFConstraint::Restore( saveFile );
////	saveFile.ReadVec3( anchor1 );
////	saveFile.ReadVec3( anchor2 );
////	saveFile.ReadVec3( planeNormal );
////}
////
////
//////===============================================================
//////
//////	idAFConstraint_Spring
//////
//////===============================================================
////
/////*
////================
////idAFConstraint_Spring::idAFConstraint_Spring
////================
////*/
////idAFConstraint_Spring::idAFConstraint_Spring( const idStr &name, idAFBody *body1, idAFBody *body2 ) {
////	assert( body1 );
////	type = CONSTRAINT_SPRING;
////	this.name = name;
////	this.body1 = body1;
////	this.body2 = body2;
////	InitSize( 1 );
////	fl.allowPrimary = false;
////	kstretch = kcompress = damping = 1.0f;
////	minLength = maxLength = restLength = 0.0f;
////}
////
/////*
////================
////idAFConstraint_Spring::SetAnchor
////================
////*/
////void idAFConstraint_Spring::SetAnchor( const idVec3 &worldAnchor1, const idVec3 &worldAnchor2 ) {
////	// get anchor relative to center of mass of body1
////	anchor1 = ( worldAnchor1 - body1.GetWorldOrigin() ) * body1.GetWorldAxis().Transpose();
////	if ( body2 ) {
////		// get anchor relative to center of mass of body2
////		anchor2 = ( worldAnchor2 - body2.GetWorldOrigin() ) * body2.GetWorldAxis().Transpose();
////	}
////	else {
////		anchor2 = worldAnchor2;
////	}
////}
////
/////*
////================
////idAFConstraint_Spring::SetSpring
////================
////*/
////void idAFConstraint_Spring::SetSpring( const float stretch, const float compress, const float damping, const float restLength ) {
////	assert( stretch >= 0.0f && compress >= 0.0f && restLength >= 0.0f );
////	this.kstretch = stretch;
////	this.kcompress = compress;
////	this.damping = damping;
////	this.restLength = restLength;
////}
////
/////*
////================
////idAFConstraint_Spring::SetLimit
////================
////*/
////void idAFConstraint_Spring::SetLimit( const float minLength, const float maxLength ) {
////	assert( minLength >= 0.0f && maxLength >= 0.0f && maxLength >= minLength );
////	this.minLength = minLength;
////	this.maxLength = maxLength;
////}
////
/////*
////================
////idAFConstraint_Spring::Evaluate
////================
////*/
////void idAFConstraint_Spring::Evaluate( float invTimeStep ) {
////	idVec3 a1, a2, velocity1, velocity2, force;
////	idVec6 v1, v2;
////	float d, dampingForce, length, error;
////	bool limit;
////	idAFBody *master;
////
////	master = body2 ? body2 : physics.GetMasterBody();
////
////	a1 = body1.GetWorldOrigin() + anchor1 * body1.GetWorldAxis();
////	velocity1 = body1.GetPointVelocity( a1 );
////
////	if ( master ) {
////		a2 = master.GetWorldOrigin() + anchor2 * master.GetWorldAxis();
////		velocity2 = master.GetPointVelocity( a2 );
////	}
////	else {
////		a2 = anchor2;
////		velocity2.Zero();
////	}
////
////	force = a2 - a1;
////	d = force * force;
////	if ( d != 0.0f ) {
////		dampingForce = damping * idMath::Fabs( (velocity2 - velocity1) * force ) / d;
////	}
////	else {
////		dampingForce = 0.0f;
////	}
////	length = force.Normalize();
////
////	if ( length > restLength ) {
////		if ( kstretch > 0.0f ) {
////			idVec3 springForce = force * ( Square( length - restLength ) * kstretch - dampingForce );
////			body1.AddForce( a1, springForce );
////			if ( master ) {
////				master.AddForce( a2, -springForce );
////			}
////		}
////	}
////	else {
////		if ( kcompress > 0.0f ) {
////			idVec3 springForce = force * -( Square( restLength - length ) * kcompress - dampingForce );
////			body1.AddForce( a1, springForce );
////			if ( master ) {
////				master.AddForce( a2, -springForce );
////			}
////		}
////	}
////
////	// check for spring limits
////	if ( length < minLength ) {
////		force = -force;
////		error = minLength - length;
////		limit = true;
////	}
////	else if ( maxLength > 0.0f && length > maxLength ) {
////		error = length - maxLength;
////		limit = true;
////	}
////	else {
////		error = 0.0f;
////		limit = false;
////	}
////
////	if ( limit ) {
////		a1 -= body1.GetWorldOrigin();
////		v1.SubVec3(0) = force;
////		v1.SubVec3(1) = a1.Cross( force );
////		J1.Set( 1, 6, v1.ToFloatPtr() );
////		if ( body2 ) {
////			a2 -= body2.GetWorldOrigin();
////			v2.SubVec3(0) = -force;
////			v2.SubVec3(1) = a2.Cross( -force );
////			J2.Set( 1, 6, v2.ToFloatPtr() );
////		}
////		c1[0] = -( invTimeStep * ERROR_REDUCTION ) * error;
////		lo[0] = 0.0f;
////	}
////	else {
////		J1.Zero( 0, 0 );
////		J2.Zero( 0, 0 );
////	}
////
////	c1.Clamp( -ERROR_REDUCTION_MAX, ERROR_REDUCTION_MAX );
////}
////
/////*
////================
////idAFConstraint_Spring::ApplyFriction
////================
////*/
////void idAFConstraint_Spring::ApplyFriction( float invTimeStep ) {
////	// no friction
////}
////
/////*
////================
////idAFConstraint_Spring::Translate
////================
////*/
////void idAFConstraint_Spring::Translate( const idVec3 &translation ) {
////	if ( !body2 ) {
////		anchor2 += translation;
////	}
////}
////
/////*
////================
////idAFConstraint_Spring::Rotate
////================
////*/
////void idAFConstraint_Spring::Rotate( const idRotation &rotation ) {
////	if ( !body2 ) {
////		anchor2 *= rotation;
////	}
////}
////
/////*
////================
////idAFConstraint_Spring::GetCenter
////================
////*/
////void idAFConstraint_Spring::GetCenter( idVec3 &center ) {
////	idAFBody *master;
////	idVec3 a1, a2;
////
////	master = body2 ? body2 : physics.GetMasterBody();
////	a1 = body1.GetWorldOrigin() + anchor1 * body1.GetWorldAxis();
////	if ( master ) {
////		a2 = master.GetWorldOrigin() + anchor2 * master.GetWorldAxis();
////	}
////	else {
////		a2 = anchor2;
////	}
////	center = ( a1 + a2 ) * 0.5f;
////}
////
/////*
////================
////idAFConstraint_Spring::DebugDraw
////================
////*/
////void idAFConstraint_Spring::DebugDraw( ) {
////	idAFBody *master;
////	float length;
////	idVec3 a1, a2, dir, mid, p;
////
////	master = body2 ? body2 : physics.GetMasterBody();
////	a1 = body1.GetWorldOrigin() + anchor1 * body1.GetWorldAxis();
////	if ( master ) {
////		a2 = master.GetWorldOrigin() + anchor2 * master.GetWorldAxis();
////	}
////	else {
////		a2 = anchor2;
////	}
////	dir = a2 - a1;
////	mid = a1 + 0.5f * dir;
////	length = dir.Normalize();
////
////	// draw spring
////	gameRenderWorld.DebugLine( colorGreen, a1, a2 );
////
////	// draw rest length
////	p = restLength * 0.5f * dir;
////	gameRenderWorld.DebugCircle( colorWhite, mid + p, dir, 1.0f, 10 );
////	gameRenderWorld.DebugCircle( colorWhite, mid - p, dir, 1.0f, 10 );
////	if ( restLength > length ) {
////		gameRenderWorld.DebugLine( colorWhite, a2, mid + p );
////		gameRenderWorld.DebugLine( colorWhite, a1, mid - p );
////	}
////
////	if ( minLength > 0.0f ) {
////		// draw min length
////		gameRenderWorld.DebugCircle( colorBlue, mid + minLength * 0.5f * dir, dir, 2.0f, 10 );
////		gameRenderWorld.DebugCircle( colorBlue, mid - minLength * 0.5f * dir, dir, 2.0f, 10 );
////	}
////
////	if ( maxLength > 0.0f ) {
////		// draw max length
////		gameRenderWorld.DebugCircle( colorRed, mid + maxLength * 0.5f * dir, dir, 2.0f, 10 );
////		gameRenderWorld.DebugCircle( colorRed, mid - maxLength * 0.5f * dir, dir, 2.0f, 10 );
////	}
////}
////
/////*
////================
////idAFConstraint_Spring::Save
////================
////*/
////void idAFConstraint_Spring::Save( idSaveGame *saveFile ) const {
////	idAFConstraint::Save( saveFile );
////	saveFile.WriteVec3( anchor1 );
////	saveFile.WriteVec3( anchor2 );
////	saveFile.WriteFloat( kstretch );
////	saveFile.WriteFloat( kcompress );
////	saveFile.WriteFloat( damping );
////	saveFile.WriteFloat( restLength );
////	saveFile.WriteFloat( minLength );
////	saveFile.WriteFloat( maxLength );
////}
////
/////*
////================
////idAFConstraint_Spring::Restore
////================
////*/
////void idAFConstraint_Spring::Restore( idRestoreGame *saveFile ) {
////	idAFConstraint::Restore( saveFile );
////	saveFile.ReadVec3( anchor1 );
////	saveFile.ReadVec3( anchor2 );
////	saveFile.ReadFloat( kstretch );
////	saveFile.ReadFloat( kcompress );
////	saveFile.ReadFloat( damping );
////	saveFile.ReadFloat( restLength );
////	saveFile.ReadFloat( minLength );
////	saveFile.ReadFloat( maxLength );
////}
////
////
//////===============================================================
//////
//////	idAFConstraint_Contact
//////
//////===============================================================
////
/////*
////================
////idAFConstraint_Contact::idAFConstraint_Contact
////================
////*/
////idAFConstraint_Contact::idAFConstraint_Contact( ) {
////	name = "contact";
////	type = CONSTRAINT_CONTACT;
////	InitSize( 1 );
////	fc = NULL;
////	fl.allowPrimary = false;
////	fl.frameConstraint = true;
////}
////
/////*
////================
////idAFConstraint_Contact::~idAFConstraint_Contact
////================
////*/
////idAFConstraint_Contact::~idAFConstraint_Contact( ) {
////	if ( fc ) {
////		delete fc;
////	}
////}
////
/////*
////================
////idAFConstraint_Contact::Setup
////================
////*/
////void idAFConstraint_Contact::Setup( idAFBody *b1, idAFBody *b2, contactInfo_t &c ) {
////	idVec3 p;
////	idVec6 v;
////	float vel;
////	float minBounceVelocity = 2.0f;
////
////	assert( b1 );
////
////	body1 = b1;
////	body2 = b2;
////	contact = c;
////
////	p = c.point - body1.GetWorldOrigin();
////	v.SubVec3(0) = c.normal;
////	v.SubVec3(1) = p.Cross( c.normal );
////	J1.Set( 1, 6, v.ToFloatPtr() );
////	vel = v.SubVec3(0) * body1.GetLinearVelocity() + v.SubVec3(1) * body1.GetAngularVelocity();
////
////	if ( body2 ) {
////		p = c.point - body2.GetWorldOrigin();
////		v.SubVec3(0) = -c.normal;
////		v.SubVec3(1) = p.Cross( -c.normal );
////		J2.Set( 1, 6, v.ToFloatPtr() );
////		vel += v.SubVec3(0) * body2.GetLinearVelocity() + v.SubVec3(1) * body2.GetAngularVelocity();
////		c2[0] = 0.0f;
////	}
////
////	if ( body1.GetBouncyness() > 0.0f && -vel > minBounceVelocity ) {
////		c1[0] = body1.GetBouncyness() * vel;
////	} else {
////		c1[0] = 0.0f;
////	}
////
////	e[0] = CONTACT_LCP_EPSILON;
////	lo[0] = 0.0f;
////	hi[0] = idMath::INFINITY;
////	boxConstraint = NULL;
////	boxIndex[0] = -1;
////}
////
/////*
////================
////idAFConstraint_Contact::Evaluate
////================
////*/
////void idAFConstraint_Contact::Evaluate( float invTimeStep ) {
////	// do nothing
////}
////
/////*
////================
////idAFConstraint_Contact::ApplyFriction
////================
////*/
////void idAFConstraint_Contact::ApplyFriction( float invTimeStep ) {
////	idVec3 r, velocity, normal, dir1, dir2;
////	float friction, magnitude, forceNumerator, forceDenominator;
////	idVecX impulse, dv;
////
////	friction = body1.GetContactFriction();
////	if ( body2 && body2.GetContactFriction() < friction ) {
////		friction = body2.GetContactFriction();
////	}
////
////	friction *= physics.GetContactFrictionScale();
////
////	if ( friction <= 0.0f ) {
////		return;
////	}
////
////	// seperate friction per contact is silly but it's fast and often looks close enough
////	if ( af_useImpulseFriction.GetBool() ) {
////
////		impulse.SetData( 6, VECX_ALLOCA( 6 ) );
////		dv.SetData( 6, VECX_ALLOCA( 6 ) );
////
////		// calculate velocity in the contact plane
////		r = contact.point - body1.GetWorldOrigin();
////		velocity = body1.GetLinearVelocity() + body1.GetAngularVelocity().Cross( r );
////		velocity -= contact.normal * velocity * contact.normal;
////
////		// get normalized direction of friction and magnitude of velocity
////		normal = -velocity;
////		magnitude = normal.Normalize();
////
////		forceNumerator = friction * magnitude;
////		forceDenominator = body1.GetInverseMass() + ( ( body1.GetInverseWorldInertia() * r.Cross( normal ) ).Cross( r ) * normal );
////		impulse.SubVec3(0) = (forceNumerator / forceDenominator) * normal;
////		impulse.SubVec3(1) = r.Cross( impulse.SubVec3(0) );
////		body1.InverseWorldSpatialInertiaMultiply( dv, impulse.ToFloatPtr() );
////
////		// modify velocity with friction force
////		body1.SetLinearVelocity( body1.GetLinearVelocity() + dv.SubVec3(0) );
////		body1.SetAngularVelocity( body1.GetAngularVelocity() + dv.SubVec3(1) );
////	}
////	else {
////
////		if ( !fc ) {
////			fc = new idAFConstraint_ContactFriction;
////		}
////		// call setup each frame because contact constraints are re-used for different bodies
////		fc.Setup( this );
////		fc.Add( physics, invTimeStep );
////	}
////}
////
/////*
////================
////idAFConstraint_Contact::Translate
////================
////*/
////void idAFConstraint_Contact::Translate( const idVec3 &translation ) {
////	assert( 0 );	// contact should never be translated
////}
////
/////*
////================
////idAFConstraint_Contact::Rotate
////================
////*/
////void idAFConstraint_Contact::Rotate( const idRotation &rotation ) {
////	assert( 0 );	// contact should never be rotated
////}
////
/////*
////================
////idAFConstraint_Contact::GetCenter
////================
////*/
////void idAFConstraint_Contact::GetCenter( idVec3 &center ) {
////	center = contact.point;
////}
////
/////*
////================
////idAFConstraint_Contact::DebugDraw
////================
////*/
////void idAFConstraint_Contact::DebugDraw( ) {
////	idVec3 x, y;
////	contact.normal.NormalVectors( x, y );
////	gameRenderWorld.DebugLine( colorWhite, contact.point, contact.point + 6.0f * contact.normal );
////	gameRenderWorld.DebugLine( colorWhite, contact.point - 2.0f * x, contact.point + 2.0f * x );
////	gameRenderWorld.DebugLine( colorWhite, contact.point - 2.0f * y, contact.point + 2.0f * y );
////}
////
////
//////===============================================================
//////
//////	idAFConstraint_ContactFriction
//////
//////===============================================================
////
/////*
////================
////idAFConstraint_ContactFriction::idAFConstraint_ContactFriction
////================
////*/
////idAFConstraint_ContactFriction::idAFConstraint_ContactFriction( ) {
////	type = CONSTRAINT_FRICTION;
////	name = "contactFriction";
////	InitSize( 2 );
////	cc = NULL;
////	fl.allowPrimary = false;
////	fl.frameConstraint = true;
////}
////
/////*
////================
////idAFConstraint_ContactFriction::Setup
////================
////*/
////void idAFConstraint_ContactFriction::Setup( idAFConstraint_Contact *cc ) {
////	this.cc = cc;
////	body1 = cc.GetBody1();
////	body2 = cc.GetBody2();
////}
////
/////*
////================
////idAFConstraint_ContactFriction::Evaluate
////================
////*/
////void idAFConstraint_ContactFriction::Evaluate( float invTimeStep ) {
////	// do nothing
////}
////
/////*
////================
////idAFConstraint_ContactFriction::ApplyFriction
////================
////*/
////void idAFConstraint_ContactFriction::ApplyFriction( float invTimeStep ) {
////	// do nothing
////}
////
/////*
////================
////idAFConstraint_ContactFriction::Add
////================
////*/
////bool idAFConstraint_ContactFriction::Add( idPhysics_AF *phys, float invTimeStep ) {
////	idVec3 r, dir1, dir2;
////	float friction;
////	int newRow;
////
////	physics = phys;
////
////	friction = body1.GetContactFriction() * physics.GetContactFrictionScale();
////
////	// if the body only has friction in one direction
////	if ( body1.GetFrictionDirection( dir1 ) ) {
////		// project the friction direction into the contact plane
////		dir1 -= dir1 * cc.GetContact().normal * dir1;
////		dir1.Normalize();
////
////		r = cc.GetContact().point - body1.GetWorldOrigin();
////
////		J1.SetSize( 1, 6 );
////		J1.SubVec6(0).SubVec3(0) = dir1;
////		J1.SubVec6(0).SubVec3(1) = r.Cross( dir1 );
////		c1.SetSize( 1 );
////		c1[0] = 0.0f;
////
////		if ( body2 ) {
////			r = cc.GetContact().point - body2.GetWorldOrigin();
////
////			J2.SetSize( 1, 6 );
////			J2.SubVec6(0).SubVec3(0) = -dir1;
////			J2.SubVec6(0).SubVec3(1) = r.Cross( -dir1 );
////			c2.SetSize( 1 );
////			c2[0] = 0.0f;
////		}
////
////		lo[0] = -friction;
////		hi[0] = friction;
////		boxConstraint = cc;
////		boxIndex[0] = 0;
////	}
////	else {
////		// get two friction directions orthogonal to contact normal
////		cc.GetContact().normal.NormalVectors( dir1, dir2 );
////
////		r = cc.GetContact().point - body1.GetWorldOrigin();
////
////		J1.SetSize( 2, 6 );
////		J1.SubVec6(0).SubVec3(0) = dir1;
////		J1.SubVec6(0).SubVec3(1) = r.Cross( dir1 );
////		J1.SubVec6(1).SubVec3(0) = dir2;
////		J1.SubVec6(1).SubVec3(1) = r.Cross( dir2 );
////		c1.SetSize( 2 );
////		c1[0] = c1[1] = 0.0f;
////
////		if ( body2 ) {
////			r = cc.GetContact().point - body2.GetWorldOrigin();
////
////			J2.SetSize( 2, 6 );
////			J2.SubVec6(0).SubVec3(0) = -dir1;
////			J2.SubVec6(0).SubVec3(1) = r.Cross( -dir1 );
////			J2.SubVec6(1).SubVec3(0) = -dir2;
////			J2.SubVec6(1).SubVec3(1) = r.Cross( -dir2 );
////			c2.SetSize( 2 );
////			c2[0] = c2[1] = 0.0f;
////
////			if ( body2.GetContactFriction() < friction ) {
////				friction = body2.GetContactFriction();
////			}
////		}
////
////		lo[0] = -friction;
////		hi[0] = friction;
////		boxConstraint = cc;
////		boxIndex[0] = 0;
////		lo[1] = -friction;
////		hi[1] = friction;
////		boxIndex[1] = 0;
////	}
////
////	if ( body1.GetContactMotorDirection( dir1 ) && body1.GetContactMotorForce() > 0.0f ) {
////		// project the motor force direction into the contact plane
////		dir1 -= dir1 * cc.GetContact().normal * dir1;
////		dir1.Normalize();
////
////		r = cc.GetContact().point - body1.GetWorldOrigin();
////
////		newRow = J1.GetNumRows();
////		J1.ChangeSize( newRow+1, J1.GetNumColumns() );
////		J1.SubVec6(newRow).SubVec3(0) = -dir1;
////		J1.SubVec6(newRow).SubVec3(1) = r.Cross( -dir1 );
////		c1.ChangeSize( newRow+1 );
////		c1[newRow] = body1.GetContactMotorVelocity();
////
////		if ( body2 ) {
////			r = cc.GetContact().point - body2.GetWorldOrigin();
////
////			J2.ChangeSize( newRow+1, J2.GetNumColumns() );
////			J2.SubVec6(newRow).SubVec3(0) = -dir1;
////			J2.SubVec6(newRow).SubVec3(1) = r.Cross( -dir1 );
////			c2.ChangeSize( newRow+1 );
////			c2[newRow] = 0.0f;
////		}
////
////		lo[newRow] = -body1.GetContactMotorForce();
////		hi[newRow] = body1.GetContactMotorForce();
////		boxIndex[newRow] = -1;
////	}
////
////	physics.AddFrameConstraint( this );
////
////	return true;
////}
////
/////*
////================
////idAFConstraint_ContactFriction::Translate
////================
////*/
////void idAFConstraint_ContactFriction::Translate( const idVec3 &translation ) {
////}
////
/////*
////================
////idAFConstraint_ContactFriction::Rotate
////================
////*/
////void idAFConstraint_ContactFriction::Rotate( const idRotation &rotation ) {
////}
////
/////*
////================
////idAFConstraint_ContactFriction::DebugDraw
////================
////*/
////void idAFConstraint_ContactFriction::DebugDraw( ) {
////}
////
////
//////===============================================================
//////
//////	idAFConstraint_ConeLimit
//////
//////===============================================================
////
/////*
////================
////idAFConstraint_ConeLimit::idAFConstraint_ConeLimit
////================
////*/
////idAFConstraint_ConeLimit::idAFConstraint_ConeLimit( ) {
////	type = CONSTRAINT_CONELIMIT;
////	name = "coneLimit";
////	InitSize( 1 );
////	fl.allowPrimary = false;
////	fl.frameConstraint = true;
////}
////
/////*
////================
////idAFConstraint_ConeLimit::Setup
////
////  the coneAnchor is the top of the cone in body2 space
////  the coneAxis is the axis of the cone in body2 space
////  the coneAngle is the angle the cone hull makes at the top
////  the body1Axis is the axis in body1 space that should stay within the cone
////================
////*/
////void idAFConstraint_ConeLimit::Setup( idAFBody *b1, idAFBody *b2, const idVec3 &coneAnchor, const idVec3 &coneAxis, const float coneAngle, const idVec3 &body1Axis ) {
////	this.body1 = b1;
////	this.body2 = b2;
////	this.coneAxis = coneAxis;
////	this.coneAxis.Normalize();
////	this.coneAnchor = coneAnchor;
////	this.body1Axis = body1Axis;
////	this.body1Axis.Normalize();
////	this.cosAngle = (float) cos( DEG2RAD( coneAngle * 0.5f ) );
////	this.sinHalfAngle = (float) sin( DEG2RAD( coneAngle * 0.25f ) );
////	this.cosHalfAngle = (float) cos( DEG2RAD( coneAngle * 0.25f ) );
////}
////
/////*
////================
////idAFConstraint_ConeLimit::SetAnchor
////================
////*/
////void idAFConstraint_ConeLimit::SetAnchor( const idVec3 &coneAnchor ) {
////	this.coneAnchor = coneAnchor;
////}
////
/////*
////================
////idAFConstraint_ConeLimit::SetBody1Axis
////================
////*/
////void idAFConstraint_ConeLimit::SetBody1Axis( const idVec3 &body1Axis ) {
////	this.body1Axis = body1Axis;
////}
////
/////*
////================
////idAFConstraint_ConeLimit::Evaluate
////================
////*/
////void idAFConstraint_ConeLimit::Evaluate( float invTimeStep ) {
////	// do nothing
////}
////
/////*
////================
////idAFConstraint_ConeLimit::ApplyFriction
////================
////*/
////void idAFConstraint_ConeLimit::ApplyFriction( float invTimeStep ) {
////}
////
/////*
////================
////idAFConstraint_ConeLimit::Add
////================
////*/
////bool idAFConstraint_ConeLimit::Add( idPhysics_AF *phys, float invTimeStep ) {
////	float a;
////	idVec6 J1row, J2row;
////	idVec3 ax, anchor, body1ax, normal, coneVector, p1, p2;
////	idQuat q;
////	idAFBody *master;
////
////	if ( af_skipLimits.GetBool() ) {
////		lm.Zero();	// constraint exerts no force
////		return false;
////	}
////
////	physics = phys;
////
////	master = body2 ? body2 : physics.GetMasterBody();
////
////	if ( master ) {
////		ax = coneAxis * master.GetWorldAxis();
////		anchor = master.GetWorldOrigin() + coneAnchor * master.GetWorldAxis();
////	}
////	else {
////		ax = coneAxis;
////		anchor = coneAnchor;
////	}
////
////	body1ax = body1Axis * body1.GetWorldAxis();
////
////	a = ax * body1ax;
////
////	// if the body1 axis is inside the cone
////	if ( a > cosAngle ) {
////		lm.Zero();	// constraint exerts no force
////		return false;
////	}
////
////	// calculate the inward cone normal for the position the body1 axis went outside the cone
////	normal = body1ax.Cross( ax );
////	normal.Normalize();
////	q.x = normal.x * sinHalfAngle;
////	q.y = normal.y * sinHalfAngle;
////	q.z = normal.z * sinHalfAngle;
////	q.w = cosHalfAngle;
////	coneVector = ax * q.ToMat3();
////	normal = coneVector.Cross( ax ).Cross( coneVector );
////	normal.Normalize();
////
////	p1 = anchor + 32.0f * coneVector - body1.GetWorldOrigin();
////
////	J1row.SubVec3(0) = normal;
////	J1row.SubVec3(1) = p1.Cross( normal );
////	J1.Set( 1, 6, J1row.ToFloatPtr() );
////
////	c1[0] = (invTimeStep * LIMIT_ERROR_REDUCTION) * ( normal * (32.0f * body1ax) );
////
////	if ( body2 ) {
////
////		p2 = anchor + 32.0f * coneVector - master.GetWorldOrigin();
////
////		J2row.SubVec3(0) = -normal;
////		J2row.SubVec3(1) = p2.Cross( -normal );
////		J2.Set( 1, 6, J2row.ToFloatPtr() );
////
////		c2[0] = 0.0f;
////	}
////
////	lo[0] = 0.0f;
////	e[0] = LIMIT_LCP_EPSILON;
////
////	physics.AddFrameConstraint( this );
////
////	return true;
////}
////
/////*
////================
////idAFConstraint_ConeLimit::Translate
////================
////*/
////void idAFConstraint_ConeLimit::Translate( const idVec3 &translation ) {
////	if ( !body2 ) {
////		coneAnchor += translation;
////	}
////}
////
/////*
////================
////idAFConstraint_ConeLimit::Rotate
////================
////*/
////void idAFConstraint_ConeLimit::Rotate( const idRotation &rotation ) {
////	if ( !body2 ) {
////		coneAnchor *= rotation;
////		coneAxis *= rotation.ToMat3();
////	}
////}
////
/////*
////================
////idAFConstraint_ConeLimit::DebugDraw
////================
////*/
////void idAFConstraint_ConeLimit::DebugDraw( ) {
////	idVec3 ax, anchor, x, y, z, start, end;
////	float sinAngle, a, size = 10.0f;
////	idAFBody *master;
////
////	master = body2 ? body2 : physics.GetMasterBody();
////
////	if ( master ) {
////		ax = coneAxis * master.GetWorldAxis();
////		anchor = master.GetWorldOrigin() + coneAnchor * master.GetWorldAxis();
////	}
////	else {
////		ax = coneAxis;
////		anchor = coneAnchor;
////	}
////
////	// draw body1 axis
////	gameRenderWorld.DebugLine( colorGreen, anchor, anchor + size * (body1Axis * body1.GetWorldAxis()) );
////
////	// draw cone
////	ax.NormalVectors( x, y );
////	sinAngle = idMath::Sqrt( 1.0f - cosAngle * cosAngle );
////	x *= size * sinAngle;
////	y *= size * sinAngle;
////	z = anchor + ax * size * cosAngle;
////	start = x + z;
////	for ( a = 0.0f; a < 360.0f; a += 45.0f ) {
////		end = x * (float) cos( DEG2RAD(a + 45.0f) ) + y * (float) sin( DEG2RAD(a + 45.0f) ) + z;
////		gameRenderWorld.DebugLine( colorMagenta, anchor, start );
////		gameRenderWorld.DebugLine( colorMagenta, start, end );
////		start = end;
////	}
////}
////
/////*
////================
////idAFConstraint_ConeLimit::Save
////================
////*/
////void idAFConstraint_ConeLimit::Save( idSaveGame *saveFile ) const {
////	idAFConstraint::Save( saveFile );
////	saveFile.WriteVec3( coneAnchor );
////	saveFile.WriteVec3( coneAxis );
////	saveFile.WriteVec3( body1Axis );
////	saveFile.WriteFloat( cosAngle );
////	saveFile.WriteFloat( sinHalfAngle );
////	saveFile.WriteFloat( cosHalfAngle );
////	saveFile.WriteFloat( epsilon );
////}
////
/////*
////================
////idAFConstraint_ConeLimit::Restore
////================
////*/
////void idAFConstraint_ConeLimit::Restore( idRestoreGame *saveFile ) {
////	idAFConstraint::Restore( saveFile );
////	saveFile.ReadVec3( coneAnchor );
////	saveFile.ReadVec3( coneAxis );
////	saveFile.ReadVec3( body1Axis );
////	saveFile.ReadFloat( cosAngle );
////	saveFile.ReadFloat( sinHalfAngle );
////	saveFile.ReadFloat( cosHalfAngle );
////	saveFile.ReadFloat( epsilon );
////}
////
////
//////===============================================================
//////
//////	idAFConstraint_PyramidLimit
//////
//////===============================================================
////
/////*
////================
////idAFConstraint_PyramidLimit::idAFConstraint_PyramidLimit
////================
////*/
////idAFConstraint_PyramidLimit::idAFConstraint_PyramidLimit( ) {
////	type = CONSTRAINT_PYRAMIDLIMIT;
////	name = "pyramidLimit";
////	InitSize( 1 );
////	fl.allowPrimary = false;
////	fl.frameConstraint = true;
////}
////
/////*
////================
////idAFConstraint_PyramidLimit::Setup
////================
////*/
////void idAFConstraint_PyramidLimit::Setup( idAFBody *b1, idAFBody *b2, const idVec3 &pyramidAnchor,
////								const idVec3 &pyramidAxis, const idVec3 &baseAxis,
////								const float pyramidAngle1, const float pyramidAngle2, const idVec3 &body1Axis ) {
////	body1 = b1;
////	body2 = b2;
////	// setup the base and make sure the basis is orthonormal
////	pyramidBasis[2] = pyramidAxis;
////	pyramidBasis[2].Normalize();
////	pyramidBasis[0] = baseAxis;
////	pyramidBasis[0] -= pyramidBasis[2] * baseAxis * pyramidBasis[2];
////	pyramidBasis[0].Normalize();
////	pyramidBasis[1] = pyramidBasis[0].Cross( pyramidBasis[2] );
////	// pyramid top
////	this.pyramidAnchor = pyramidAnchor;
////	// angles
////	cosAngle[0] = (float) cos( DEG2RAD( pyramidAngle1 * 0.5f ) );
////	cosAngle[1] = (float) cos( DEG2RAD( pyramidAngle2 * 0.5f ) );
////	sinHalfAngle[0] = (float) sin( DEG2RAD( pyramidAngle1 * 0.25f ) );
////	sinHalfAngle[1] = (float) sin( DEG2RAD( pyramidAngle2 * 0.25f ) );
////	cosHalfAngle[0] = (float) cos( DEG2RAD( pyramidAngle1 * 0.25f ) );
////	cosHalfAngle[1] = (float) cos( DEG2RAD( pyramidAngle2 * 0.25f ) );
////
////	this.body1Axis = body1Axis;
////}
////
/////*
////================
////idAFConstraint_PyramidLimit::SetAnchor
////================
////*/
////void idAFConstraint_PyramidLimit::SetAnchor( const idVec3 &pyramidAnchor ) {
////	this.pyramidAnchor = pyramidAnchor;
////}
////
/////*
////================
////idAFConstraint_PyramidLimit::SetBody1Axis
////================
////*/
////void idAFConstraint_PyramidLimit::SetBody1Axis( const idVec3 &body1Axis ) {
////	this.body1Axis = body1Axis;
////}
////
/////*
////================
////idAFConstraint_PyramidLimit::Evaluate
////================
////*/
////void idAFConstraint_PyramidLimit::Evaluate( float invTimeStep ) {
////	// do nothing
////}
////
/////*
////================
////idAFConstraint_PyramidLimit::ApplyFriction
////================
////*/
////void idAFConstraint_PyramidLimit::ApplyFriction( float invTimeStep ) {
////}
////
/////*
////================
////idAFConstraint_PyramidLimit::Add
////================
////*/
////bool idAFConstraint_PyramidLimit::Add( idPhysics_AF *phys, float invTimeStep ) {
////	var/*int*/i:number;
////	float a[2];
////	idVec6 J1row, J2row;
////	idMat3 worldBase;
////	idVec3 anchor, body1ax, ax[2], v, normal, pyramidVector, p1, p2;
////	idQuat q;
////	idAFBody *master;
////
////	if ( af_skipLimits.GetBool() ) {
////		lm.Zero();	// constraint exerts no force
////		return false;
////	}
////
////	physics = phys;
////	master = body2 ? body2 : physics.GetMasterBody();
////
////	if ( master ) {
////		worldBase[0] = pyramidBasis[0] * master.GetWorldAxis();
////		worldBase[1] = pyramidBasis[1] * master.GetWorldAxis();
////		worldBase[2] = pyramidBasis[2] * master.GetWorldAxis();
////		anchor = master.GetWorldOrigin() + pyramidAnchor * master.GetWorldAxis();
////	}
////	else {
////		worldBase = pyramidBasis;
////		anchor = pyramidAnchor;
////	}
////
////	body1ax = body1Axis * body1.GetWorldAxis();
////
////	for ( i = 0; i < 2; i++ ) {
////		ax[i] = body1ax - worldBase[!i] * body1ax * worldBase[!i];
////		ax[i].Normalize();
////		a[i] = worldBase[2] * ax[i];
////	}
////
////	// if the body1 axis is inside the pyramid
////	if ( a[0] > cosAngle[0] && a[1] > cosAngle[1] ) {
////		lm.Zero();	// constraint exerts no force
////		return false;
////	}
////
////	// calculate the inward pyramid normal for the position the body1 axis went outside the pyramid
////	pyramidVector = worldBase[2];
////	for ( i = 0; i < 2; i++ ) {
////		if ( a[i] <= cosAngle[i] ) {
////			v = ax[i].Cross( worldBase[2] );
////			v.Normalize();
////			q.x = v.x * sinHalfAngle[i];
////			q.y = v.y * sinHalfAngle[i];
////			q.z = v.z * sinHalfAngle[i];
////			q.w = cosHalfAngle[i];
////			pyramidVector *= q.ToMat3();
////		}
////	}
////	normal = pyramidVector.Cross( worldBase[2] ).Cross( pyramidVector );
////	normal.Normalize();
////
////	p1 = anchor + 32.0f * pyramidVector - body1.GetWorldOrigin();
////
////	J1row.SubVec3(0) = normal;
////	J1row.SubVec3(1) = p1.Cross( normal );
////	J1.Set( 1, 6, J1row.ToFloatPtr() );
////
////	c1[0] = (invTimeStep * LIMIT_ERROR_REDUCTION) * ( normal * (32.0f * body1ax) );
////
////	if ( body2 ) {
////
////		p2 = anchor + 32.0f * pyramidVector - master.GetWorldOrigin();
////
////		J2row.SubVec3(0) = -normal;
////		J2row.SubVec3(1) = p2.Cross( -normal );
////		J2.Set( 1, 6, J2row.ToFloatPtr() );
////
////		c2[0] = 0.0f;
////	}
////
////	lo[0] = 0.0f;
////	e[0] = LIMIT_LCP_EPSILON;
////
////	physics.AddFrameConstraint( this );
////
////	return true;
////}
////
/////*
////================
////idAFConstraint_PyramidLimit::Translate
////================
////*/
////void idAFConstraint_PyramidLimit::Translate( const idVec3 &translation ) {
////	if ( !body2 ) {
////		pyramidAnchor += translation;
////	}
////}
////
/////*
////================
////idAFConstraint_PyramidLimit::Rotate
////================
////*/
////void idAFConstraint_PyramidLimit::Rotate( const idRotation &rotation ) {
////	if ( !body2 ) {
////		pyramidAnchor *= rotation;
////		pyramidBasis[0] *= rotation.ToMat3();
////		pyramidBasis[1] *= rotation.ToMat3();
////		pyramidBasis[2] *= rotation.ToMat3();
////	}
////}
////
/////*
////================
////idAFConstraint_PyramidLimit::DebugDraw
////================
////*/
////void idAFConstraint_PyramidLimit::DebugDraw( ) {
////	var/*int*/i:number;
////	float size = 10.0f;
////	idVec3 anchor, dir, p[4];
////	idMat3 worldBase, m[2];
////	idQuat q;
////	idAFBody *master;
////
////	master = body2 ? body2 : physics.GetMasterBody();
////
////	if ( master ) {
////		worldBase[0] = pyramidBasis[0] * master.GetWorldAxis();
////		worldBase[1] = pyramidBasis[1] * master.GetWorldAxis();
////		worldBase[2] = pyramidBasis[2] * master.GetWorldAxis();
////		anchor = master.GetWorldOrigin() + pyramidAnchor * master.GetWorldAxis();
////	}
////	else {
////		worldBase = pyramidBasis;
////		anchor = pyramidAnchor;
////	}
////
////	// draw body1 axis
////	gameRenderWorld.DebugLine( colorGreen, anchor, anchor + size * (body1Axis * body1.GetWorldAxis()) );
////
////	// draw the pyramid
////	for ( i = 0; i < 2; i++ ) {
////		q.x = worldBase[!i].x * sinHalfAngle[i];
////		q.y = worldBase[!i].y * sinHalfAngle[i];
////		q.z = worldBase[!i].z * sinHalfAngle[i];
////		q.w = cosHalfAngle[i];
////		m[i] = q.ToMat3();
////	}
////
////	dir = worldBase[2] * size;
////	p[0] = anchor + m[0] * (m[1] * dir);
////	p[1] = anchor + m[0] * (m[1].Transpose() * dir);
////	p[2] = anchor + m[0].Transpose() * (m[1].Transpose() * dir);
////	p[3] = anchor + m[0].Transpose() * (m[1] * dir);
////
////	for ( i = 0; i < 4; i++ ) {
////		gameRenderWorld.DebugLine( colorMagenta, anchor, p[i] );
////		gameRenderWorld.DebugLine( colorMagenta, p[i], p[(i+1)&3] );
////	}
////}
////
/////*
////================
////idAFConstraint_PyramidLimit::Save
////================
////*/
////void idAFConstraint_PyramidLimit::Save( idSaveGame *saveFile ) const {
////	idAFConstraint::Save( saveFile );
////	saveFile.WriteVec3( pyramidAnchor );
////	saveFile.WriteMat3( pyramidBasis );
////	saveFile.WriteVec3( body1Axis );
////	saveFile.WriteFloat( cosAngle[0] );
////	saveFile.WriteFloat( cosAngle[1] );
////	saveFile.WriteFloat( sinHalfAngle[0] );
////	saveFile.WriteFloat( sinHalfAngle[1] );
////	saveFile.WriteFloat( cosHalfAngle[0] );
////	saveFile.WriteFloat( cosHalfAngle[1] );
////	saveFile.WriteFloat( epsilon );
////}
////
/////*
////================
////idAFConstraint_PyramidLimit::Restore
////================
////*/
////void idAFConstraint_PyramidLimit::Restore( idRestoreGame *saveFile ) {
////	idAFConstraint::Restore( saveFile );
////	saveFile.ReadVec3( pyramidAnchor );
////	saveFile.ReadMat3( pyramidBasis );
////	saveFile.ReadVec3( body1Axis );
////	saveFile.ReadFloat( cosAngle[0] );
////	saveFile.ReadFloat( cosAngle[1] );
////	saveFile.ReadFloat( sinHalfAngle[0] );
////	saveFile.ReadFloat( sinHalfAngle[1] );
////	saveFile.ReadFloat( cosHalfAngle[0] );
////	saveFile.ReadFloat( cosHalfAngle[1] );
////	saveFile.ReadFloat( epsilon );
////}
////
////
//////===============================================================
//////
//////	idAFConstraint_Suspension
//////
//////===============================================================
////
/////*
////================
////idAFConstraint_Suspension::idAFConstraint_Suspension
////================
////*/
////idAFConstraint_Suspension::idAFConstraint_Suspension( ) {
////	type = CONSTRAINT_SUSPENSION;
////	name = "suspension";
////	InitSize( 3 );
////	fl.allowPrimary = false;
////	fl.frameConstraint = true;
////
////	localOrigin.Zero();
////	localAxis.Identity();
////	suspensionUp = 0.0f;
////	suspensionDown = 0.0f;
////	suspensionKCompress = 0.0f;
////	suspensionDamping = 0.0f;
////	steerAngle = 0.0f;
////	friction = 2.0f;
////	motorEnabled = false;
////	motorForce = 0.0f;
////	motorVelocity = 0.0f;
////	wheelModel = NULL;
////	memset( &trace, 0, sizeof( trace ) );
////	epsilon = LCP_EPSILON;
////}
////
/////*
////================
////idAFConstraint_Suspension::Setup
////================
////*/
////void idAFConstraint_Suspension::Setup( const char *name, idAFBody *body, origin: idVec3, const idMat3 &axis, idClipModel *clipModel ) {
////	this.name = name;
////	body1 = body;
////	body2 = NULL;
////	localOrigin = ( origin - body.GetWorldOrigin() ) * body.GetWorldAxis().Transpose();
////	localAxis = axis * body.GetWorldAxis().Transpose();
////	wheelModel = clipModel;
////}
////
/////*
////================
////idAFConstraint_Suspension::SetSuspension
////================
////*/
////void idAFConstraint_Suspension::SetSuspension( const float up, const float down, const float k, const float d, const float f ) {
////	suspensionUp = up;
////	suspensionDown = down;
////	suspensionKCompress = k;
////	suspensionDamping = d;
////	friction = f;
////}
////
/////*
////================
////idAFConstraint_Suspension::GetWheelOrigin
////================
////*/
////const idVec3 idAFConstraint_Suspension::GetWheelOrigin( ) const {
////	return body1.GetWorldOrigin() + wheelOffset * body1.GetWorldAxis();
////}
////
/////*
////================
////idAFConstraint_Suspension::Evaluate
////================
////*/
////void idAFConstraint_Suspension::Evaluate( float invTimeStep ) {
////	float velocity, suspensionLength, springLength, compression, dampingForce, springForce;
////	idVec3 origin, start, end, vel1, vel2, springDir, r, frictionDir, motorDir;
////	idMat3 axis;
////	idRotation rotation;
////
////	axis = localAxis * body1.GetWorldAxis();
////	origin = body1.GetWorldOrigin() + localOrigin * body1.GetWorldAxis();
////	start = origin + suspensionUp * axis[2];
////	end = origin - suspensionDown * axis[2];
////
////	rotation.SetVec( axis[2] );
////	rotation.SetAngle( steerAngle );
////
////	axis *= rotation.ToMat3();
////
////	gameLocal.clip.Translation( trace, start, end, wheelModel, axis, MASK_SOLID, NULL );
////
////	wheelOffset = ( trace.endpos - body1.GetWorldOrigin() ) * body1.GetWorldAxis().Transpose();
////
////	if ( trace.fraction >= 1.0f ) {
////		J1.SetSize( 0, 6 );
////		if ( body2 ) {
////			J2.SetSize( 0, 6 );
////		}
////		return;
////	}
////
////	// calculate and add spring force
////	vel1 = body1.GetPointVelocity( start );
////	if ( body2 ) {
////		vel2 = body2.GetPointVelocity( trace.c.point );
////	} else {
////		vel2.Zero();
////	}
////
////	suspensionLength = suspensionUp + suspensionDown;
////	springDir = trace.endpos - start;
////	springLength = trace.fraction * suspensionLength;
////	dampingForce = suspensionDamping * idMath::Fabs( ( vel2 - vel1 ) * springDir ) / ( 1.0f + springLength * springLength );
////	compression = suspensionLength - springLength;
////	springForce = compression * compression * suspensionKCompress - dampingForce;
////
////	r = trace.c.point - body1.GetWorldOrigin();
////	J1.SetSize( 2, 6 );
////	J1.SubVec6(0).SubVec3(0) = trace.c.normal;
////	J1.SubVec6(0).SubVec3(1) = r.Cross( trace.c.normal );
////	c1.SetSize( 2 );
////	c1[0] = 0.0f;
////	velocity = J1.SubVec6(0).SubVec3(0) * body1.GetLinearVelocity() + J1.SubVec6(0).SubVec3(1) * body1.GetAngularVelocity();
////
////	if ( body2 ) {
////		r = trace.c.point - body2.GetWorldOrigin();
////		J2.SetSize( 2, 6 );
////		J2.SubVec6(0).SubVec3(0) = -trace.c.normal;
////		J2.SubVec6(0).SubVec3(1) = r.Cross( -trace.c.normal );
////		c2.SetSize( 2 );
////		c2[0] = 0.0f;
////		velocity += J2.SubVec6(0).SubVec3(0) * body2.GetLinearVelocity() + J2.SubVec6(0).SubVec3(1) * body2.GetAngularVelocity();
////	}
////
////	c1[0] = -compression;		// + 0.5f * -velocity;
////
////	e[0] = 1e-4f;
////	lo[0] = 0.0f;
////	hi[0] = springForce;
////	boxConstraint = NULL;
////	boxIndex[0] = -1;
////
////	// project the friction direction into the contact plane
////	frictionDir = axis[1] - axis[1] * trace.c.normal * axis[1];
////	frictionDir.Normalize();
////
////	r = trace.c.point - body1.GetWorldOrigin();
////
////	J1.SubVec6(1).SubVec3(0) = frictionDir;
////	J1.SubVec6(1).SubVec3(1) = r.Cross( frictionDir );
////	c1[1] = 0.0f;
////
////	if ( body2 ) {
////		r = trace.c.point - body2.GetWorldOrigin();
////
////		J2.SubVec6(1).SubVec3(0) = -frictionDir;
////		J2.SubVec6(1).SubVec3(1) = r.Cross( -frictionDir );
////		c2[1] = 0.0f;
////	}
////
////	lo[1] = -friction * physics.GetContactFrictionScale();
////	hi[1] = friction * physics.GetContactFrictionScale();
////
////	boxConstraint = this;
////	boxIndex[1] = 0;
////
////
////	if ( motorEnabled ) {
////		// project the motor force direction into the contact plane
////		motorDir = axis[0] - axis[0] * trace.c.normal * axis[0];
////		motorDir.Normalize();
////
////		r = trace.c.point - body1.GetWorldOrigin();
////
////		J1.ChangeSize( 3, J1.GetNumColumns() );
////		J1.SubVec6(2).SubVec3(0) = -motorDir;
////		J1.SubVec6(2).SubVec3(1) = r.Cross( -motorDir );
////		c1.ChangeSize( 3 );
////		c1[2] = motorVelocity;
////
////		if ( body2 ) {
////			r = trace.c.point - body2.GetWorldOrigin();
////
////			J2.ChangeSize( 3, J2.GetNumColumns() );
////			J2.SubVec6(2).SubVec3(0) = -motorDir;
////			J2.SubVec6(2).SubVec3(1) = r.Cross( -motorDir );
////			c2.ChangeSize( 3 );
////			c2[2] = 0.0f;
////		}
////
////		lo[2] = -motorForce;
////		hi[2] = motorForce;
////		boxIndex[2] = -1;
////	}
////}
////
/////*
////================
////idAFConstraint_Suspension::ApplyFriction
////================
////*/
////void idAFConstraint_Suspension::ApplyFriction( float invTimeStep ) {
////	// do nothing
////}
////
/////*
////================
////idAFConstraint_Suspension::Translate
////================
////*/
////void idAFConstraint_Suspension::Translate( const idVec3 &translation ) {
////}
////
/////*
////================
////idAFConstraint_Suspension::Rotate
////================
////*/
////void idAFConstraint_Suspension::Rotate( const idRotation &rotation ) {
////}
////
/////*
////================
////idAFConstraint_Suspension::DebugDraw
////================
////*/
////void idAFConstraint_Suspension::DebugDraw( ) {
////	idVec3 origin;
////	idMat3 axis;
////	idRotation rotation;
////
////	axis = localAxis * body1.GetWorldAxis();
////
////	rotation.SetVec( axis[2] );
////	rotation.SetAngle( steerAngle );
////
////	axis *= rotation.ToMat3();
////
////	if ( trace.fraction < 1.0f ) {
////		origin = trace.c.point;
////
////		gameRenderWorld.DebugLine( colorWhite, origin, origin + 6.0f * axis[2] );
////		gameRenderWorld.DebugLine( colorWhite, origin - 4.0f * axis[0], origin + 4.0f * axis[0] );
////		gameRenderWorld.DebugLine( colorWhite, origin - 2.0f * axis[1], origin + 2.0f * axis[1] );
////	}
////}
////
////
//////===============================================================
//////
//////	idAFBody
//////
//////===============================================================
////
/////*
////================
////idAFBody::idAFBody
////================
////*/
////idAFBody::idAFBody( ) {
////	Init();
////}
////
/////*
////================
////idAFBody::idAFBody
////================
////*/
////idAFBody::idAFBody( const idStr &name, idClipModel *clipModel, float density ) {
////
////	assert( clipModel );
////	assert( clipModel.IsTraceModel() );
////
////	Init();
////
////	this.name = name;
////	this.clipModel = NULL;
////
////	SetClipModel( clipModel );
////	SetDensity( density );
////
////	current.worldOrigin = clipModel.GetOrigin();
////	current.worldAxis = clipModel.GetAxis();
////	*next = *current;
////
////}
////
/////*
////================
////idAFBody::~idAFBody
////================
////*/
////idAFBody::~idAFBody( ) {
////	delete clipModel;
////}
////
/////*
////================
////idAFBody::Init
////================
////*/
////void idAFBody::Init( ) {
////	name						= "noname";
////	parent						= NULL;
////	clipModel					= NULL;
////	primaryConstraint			= NULL;
////	tree						= NULL;
////
////	linearFriction				= -1.0f;
////	angularFriction				= -1.0f;
////	contactFriction				= -1.0f;
////	bouncyness					= -1.0f;
////	clipMask					= 0;
////
////	frictionDir					= vec3_zero;
////	contactMotorDir				= vec3_zero;
////	contactMotorVelocity		= 0.0f;
////	contactMotorForce			= 0.0f;
////
////	mass						= 1.0f;
////	invMass						= 1.0f;
////	centerOfMass				 .opEquals(  vec3_zero);
////	inertiaTensor				 .opEquals(  mat3_identity);
////	inverseInertiaTensor		 .opEquals(  mat3_identity);
////
////	current						= &state[0];
////	next						= &state[1];
////	current.worldOrigin		= vec3_zero;
////	current.worldAxis			= mat3_identity;
////	current.spatialVelocity	= vec6_zero;
////	current.externalForce		= vec6_zero;
////	*next						= *current;
////	saved						= *current;
////	atRestOrigin				= vec3_zero;
////	atRestAxis					= mat3_identity;
////
////	s.Zero( 6 );
////	totalForce.Zero( 6 );
////	auxForce.Zero( 6 );
////	acceleration.Zero( 6 );
////
////	response					= NULL;
////	responseIndex				= NULL;
////	numResponses				= 0;
////	maxAuxiliaryIndex			= 0;
////	maxSubTreeAuxiliaryIndex	= 0;
////
////	memset( &fl, 0, sizeof( fl ) );
////
////	fl.selfCollision			= true;
////	fl.isZero					= true;
////}
////
/////*
////================
////idAFBody::SetClipModel
////================
////*/
////void idAFBody::SetClipModel( idClipModel *clipModel ) {
////	if ( this.clipModel && this.clipModel != clipModel ) {
////		delete this.clipModel;
////	}
////	this.clipModel = clipModel;
////}
////
/////*
////================
////idAFBody::SetFriction
////================
////*/
////void idAFBody::SetFriction( float linear, float angular, float contact ) {
////	if ( linear < 0.0f || linear > 1.0f ||
////			angular < 0.0f || angular > 1.0f ||
////				contact < 0.0f ) {
////		gameLocal.Warning( "idAFBody::SetFriction: friction out of range, linear = %.1f, angular = %.1f, contact = %.1f", linear, angular, contact );
////		return;
////	}
////	linearFriction = linear;
////	angularFriction = angular;
////	contactFriction = contact;
////}
////
/////*
////================
////idAFBody::SetBouncyness
////================
////*/
////void idAFBody::SetBouncyness( float bounce ) {
////	if ( bounce < 0.0f || bounce > 1.0f ) {
////		gameLocal.Warning( "idAFBody::SetBouncyness: bouncyness out of range, bounce = %.1f", bounce );
////		return;
////	}
////	bouncyness = bounce;
////}
////
/////*
////================
////idAFBody::SetDensity
////================
////*/
////void idAFBody::SetDensity( float density, const idMat3 &inertiaScale ) {
////
////	// get the body mass properties
////	clipModel.GetMassProperties( density, mass, centerOfMass, inertiaTensor );
////
////	// make sure we have a valid mass
////	if ( mass <= 0.0f || FLOAT_IS_NAN( mass ) ) {
////		gameLocal.Warning( "idAFBody::SetDensity: invalid mass for body '%s'", name.c_str() );
////		mass = 1.0f;
////		centerOfMass.Zero();
////		inertiaTensor.Identity();
////	}
////
////	// make sure the center of mass is at the body origin
////	if ( !centerOfMass.Compare( vec3_origin, CENTER_OF_MASS_EPSILON ) ) {
////		gameLocal.Warning( "idAFBody::SetDentity: center of mass not at origin for body '%s'", name.c_str() );
////	}
////	centerOfMass.Zero();
////
////	// calculate the inverse mass and inverse inertia tensor
////	invMass = 1.0 / mass;
////	if ( inertiaScale != mat3_identity ) {
////		inertiaTensor *= inertiaScale;
////	}
////	if ( inertiaTensor.IsDiagonal( 1e-3f ) ) {
////		inertiaTensor[0][1] = inertiaTensor[0][2] = 0.0f;
////		inertiaTensor[1][0] = inertiaTensor[1][2] = 0.0f;
////		inertiaTensor[2][0] = inertiaTensor[2][1] = 0.0f;
////		inverseInertiaTensor.Identity();
////		inverseInertiaTensor[0][0] = 1.0f / inertiaTensor[0][0];
////		inverseInertiaTensor[1][1] = 1.0f / inertiaTensor[1][1];
////		inverseInertiaTensor[2][2] = 1.0f / inertiaTensor[2][2];
////	}
////	else {
////		inverseInertiaTensor = inertiaTensor.Inverse();
////	}
////}
////
/////*
////================
////idAFBody::SetFrictionDirection
////================
////*/
////void idAFBody::SetFrictionDirection( const idVec3 &dir ) {
////	frictionDir = dir * current.worldAxis.Transpose();
////	fl.useFrictionDir = true;
////}
////
/////*
////================
////idAFBody::GetFrictionDirection
////================
////*/
////bool idAFBody::GetFrictionDirection( idVec3 &dir ) const {
////	if ( fl.useFrictionDir ) {
////		dir = frictionDir * current.worldAxis;
////		return true;
////	}
////	return false;
////}
////
/////*
////================
////idAFBody::SetContactMotorDirection
////================
////*/
////void idAFBody::SetContactMotorDirection( const idVec3 &dir ) {
////	contactMotorDir = dir * current.worldAxis.Transpose();
////	fl.useContactMotorDir = true;
////}
////
/////*
////================
////idAFBody::GetContactMotorDirection
////================
////*/
////bool idAFBody::GetContactMotorDirection( idVec3 &dir ) const {
////	if ( fl.useContactMotorDir ) {
////		dir = contactMotorDir * current.worldAxis;
////		return true;
////	}
////	return false;
////}
////
/////*
////================
////idAFBody::GetPointVelocity
////================
////*/
////idVec3 idAFBody::GetPointVelocity( const idVec3 &point ) const {
////	idVec3 r = point - current.worldOrigin;
////	return current.spatialVelocity.SubVec3(0) + current.spatialVelocity.SubVec3(1).Cross( r );
////}
////
/////*
////================
////idAFBody::AddForce
////================
////*/
////void idAFBody::AddForce( const idVec3 &point, const idVec3 &force ) {
////	current.externalForce.SubVec3(0) += force;
////	current.externalForce.SubVec3(1) += (point - current.worldOrigin).Cross( force );
////}
////
/////*
////================
////idAFBody::InverseWorldSpatialInertiaMultiply
////
////  dst = this.inverseWorldSpatialInertia * v;
////================
////*/
////ID_INLINE void idAFBody::InverseWorldSpatialInertiaMultiply( idVecX &dst, const float *v ) const {
////	const float *mPtr = inverseWorldSpatialInertia.ToFloatPtr();
////	const float *vPtr = v;
////	float *dstPtr = dst.ToFloatPtr();
////
////	if ( fl.spatialInertiaSparse ) {
////		dstPtr[0] = mPtr[0*6+0] * vPtr[0];
////		dstPtr[1] = mPtr[1*6+1] * vPtr[1];
////		dstPtr[2] = mPtr[2*6+2] * vPtr[2];
////		dstPtr[3] = mPtr[3*6+3] * vPtr[3] + mPtr[3*6+4] * vPtr[4] + mPtr[3*6+5] * vPtr[5];
////		dstPtr[4] = mPtr[4*6+3] * vPtr[3] + mPtr[4*6+4] * vPtr[4] + mPtr[4*6+5] * vPtr[5];
////		dstPtr[5] = mPtr[5*6+3] * vPtr[3] + mPtr[5*6+4] * vPtr[4] + mPtr[5*6+5] * vPtr[5];
////	} else {
////		gameLocal.Warning( "spatial inertia is not sparse for body %s", name.c_str() );
////	}
////}
////
/////*
////================
////idAFBody::Save
////================
////*/
////void idAFBody::Save( idSaveGame *saveFile ) {
////	saveFile.WriteFloat( linearFriction );
////	saveFile.WriteFloat( angularFriction );
////	saveFile.WriteFloat( contactFriction );
////	saveFile.WriteFloat( bouncyness );
////	saveFile.WriteInt( clipMask );
////	saveFile.WriteVec3( frictionDir );
////	saveFile.WriteVec3( contactMotorDir );
////	saveFile.WriteFloat( contactMotorVelocity );
////	saveFile.WriteFloat( contactMotorForce );
////
////	saveFile.WriteFloat( mass );
////	saveFile.WriteFloat( invMass );
////	saveFile.WriteVec3( centerOfMass );
////	saveFile.WriteMat3( inertiaTensor );
////	saveFile.WriteMat3( inverseInertiaTensor );
////
////	saveFile.WriteVec3( current.worldOrigin );
////	saveFile.WriteMat3( current.worldAxis );
////	saveFile.WriteVec6( current.spatialVelocity );
////	saveFile.WriteVec6( current.externalForce );
////	saveFile.WriteVec3( atRestOrigin );
////	saveFile.WriteMat3( atRestAxis );
////}
////
/////*
////================
////idAFBody::Restore
////================
////*/
////void idAFBody::Restore( idRestoreGame *saveFile ) {
////	saveFile.ReadFloat( linearFriction );
////	saveFile.ReadFloat( angularFriction );
////	saveFile.ReadFloat( contactFriction );
////	saveFile.ReadFloat( bouncyness );
////	saveFile.ReadInt( clipMask );
////	saveFile.ReadVec3( frictionDir );
////	saveFile.ReadVec3( contactMotorDir );
////	saveFile.ReadFloat( contactMotorVelocity );
////	saveFile.ReadFloat( contactMotorForce );
////
////	saveFile.ReadFloat( mass );
////	saveFile.ReadFloat( invMass );
////	saveFile.ReadVec3( centerOfMass );
////	saveFile.ReadMat3( inertiaTensor );
////	saveFile.ReadMat3( inverseInertiaTensor );
////
////	saveFile.ReadVec3( current.worldOrigin );
////	saveFile.ReadMat3( current.worldAxis );
////	saveFile.ReadVec6( current.spatialVelocity );
////	saveFile.ReadVec6( current.externalForce );
////	saveFile.ReadVec3( atRestOrigin );
////	saveFile.ReadMat3( atRestAxis );
////}
////
////
////
//////===============================================================
//////                                                        M
//////  idAFTree                                             MrE
//////                                                        E
//////===============================================================
////
/////*
////================
////idAFTree::Factor
////
////  factor matrix for the primary constraints in the tree
////================
////*/
////void idAFTree::Factor( ) const {
////	var /*int */i:number, j:number;
////	idAFBody *body;
////	idAFConstraint *child;
////	idMatX childI;
////
////	childI.SetData( 6, 6, MATX_ALLOCA( 6 * 6 ) );
////
////	// from the leaves up towards the root
////	for ( i = sortedBodies.Num() - 1; i >= 0; i-- ) {
////		body = sortedBodies[i];
////
////		if ( body.children.Num() ) {
////
////			for ( j = 0; j < body.children.Num(); j++ ) {
////
////				child = body.children[j].primaryConstraint;
////
////				// child.I = - child.body1.J.Transpose() * child.body1.I * child.body1.J;
////				childI.SetSize( child.J1.GetNumRows(), child.J1.GetNumRows() );
////				child.body1.J.TransposeMultiply( child.body1.I ).Multiply( childI, child.body1.J );
////				childI.Negate();
////
////				child.invI = childI;
////				if ( !child.invI.InverseFastSelf() ) {
////					gameLocal.Warning( "idAFTree::Factor: couldn't invert %dx%d matrix for constraint '%s'",
////									child.invI.GetNumRows(), child.invI.GetNumColumns(), child.GetName().c_str() );
////				}
////				child.J = child.invI * child.J;
////
////				body.I -= child.J.TransposeMultiply( childI ) * child.J;
////			}
////
////			body.invI = body.I;
////			if ( !body.invI.InverseFastSelf() ) {
////				gameLocal.Warning( "idAFTree::Factor: couldn't invert %dx%d matrix for body %s",
////								child.invI.GetNumRows(), child.invI.GetNumColumns(), body.GetName().c_str() );
////			}
////			if ( body.primaryConstraint ) {
////				body.J = body.invI * body.J;
////			}
////		}
////		else if ( body.primaryConstraint ) {
////			body.J = body.inverseWorldSpatialInertia * body.J;
////		}
////	}
////}
////
/////*
////================
////idAFTree::Solve
////
////  solve for primary constraints in the tree
////================
////*/
////void idAFTree::Solve( int auxiliaryIndex ) const {
////	var /*int */i:number, j:number;
////	idAFBody *body, *child;
////	idAFConstraint *primaryConstraint;
////
////	// from the leaves up towards the root
////	for ( i = sortedBodies.Num() - 1; i >= 0; i-- ) {
////		body = sortedBodies[i];
////
////		for ( j = 0; j < body.children.Num(); j++ ) {
////			child = body.children[j];
////			primaryConstraint = child.primaryConstraint;
////
////			if ( !child.fl.isZero ) {
////				child.J.TransposeMultiplySub( primaryConstraint.s, child.s );
////				primaryConstraint.fl.isZero = false;
////			}
////			if ( !primaryConstraint.fl.isZero ) {
////				primaryConstraint.J.TransposeMultiplySub( body.s, primaryConstraint.s );
////				body.fl.isZero = false;
////			}
////		}
////	}
////
////	bool useSymmetry = af_useSymmetry.GetBool();
////
////	// from the root down towards the leaves
////	for ( i = 0; i < sortedBodies.Num(); i++ ) {
////		body = sortedBodies[i];
////		primaryConstraint = body.primaryConstraint;
////
////		if ( primaryConstraint ) {
////
////			if ( useSymmetry && body.parent.maxSubTreeAuxiliaryIndex < auxiliaryIndex ) {
////				continue;
////			}
////
////			if ( !primaryConstraint.fl.isZero ) {
////				primaryConstraint.s = primaryConstraint.invI * primaryConstraint.s;
////			}
////			primaryConstraint.J.MultiplySub( primaryConstraint.s, primaryConstraint.body2.s );
////
////			primaryConstraint.lm = primaryConstraint.s;
////
////			if ( useSymmetry && body.maxSubTreeAuxiliaryIndex < auxiliaryIndex ) {
////				continue;
////			}
////
////			if ( body.children.Num() ) {
////				if ( !body.fl.isZero ) {
////					body.s = body.invI * body.s;
////				}
////				body.J.MultiplySub( body.s, primaryConstraint.s );
////			}
////		} else if ( body.children.Num() ) {
////			body.s = body.invI * body.s;
////		}
////	}
////}
////
/////*
////================
////idAFTree::Response
////
////  calculate body forces in the tree in response to a constraint force
////================
////*/
////void idAFTree::Response( const idAFConstraint *constraint, int row, int auxiliaryIndex ) const {
////	var /*int */i:number, j:number;
////	idAFBody *body;
////	idAFConstraint *child, *primaryConstraint;
////	idVecX v;
////
////	// if a single body don't waste time because there aren't any primary constraints
////	if ( sortedBodies.Num() == 1 ) {
////		body = constraint.body1;
////		if ( body.tree == this ) {
////			body.GetResponseForce( body.numResponses ) = constraint.J1.SubVec6( row );
////			body.responseIndex[body.numResponses++] = auxiliaryIndex;
////		}
////		else {
////			body = constraint.body2;
////			body.GetResponseForce( body.numResponses ) = constraint.J2.SubVec6( row );
////			body.responseIndex[body.numResponses++] = auxiliaryIndex;
////		}
////		return;
////	}
////
////	v.SetData( 6, VECX_ALLOCA( 6 ) );
////
////	// initialize right hand side to zero
////	for ( i = 0; i < sortedBodies.Num(); i++ ) {
////		body = sortedBodies[i];
////		primaryConstraint = body.primaryConstraint;
////		if ( primaryConstraint ) {
////			primaryConstraint.s.Zero();
////			primaryConstraint.fl.isZero = true;
////		}
////		body.s.Zero();
////		body.fl.isZero = true;
////		body.GetResponseForce( body.numResponses ).Zero();
////	}
////
////	// set right hand side for first constrained body
////	body = constraint.body1;
////	if ( body.tree == this ) {
////		body.InverseWorldSpatialInertiaMultiply( v, constraint.J1[row] );
////		primaryConstraint = body.primaryConstraint;
////		if ( primaryConstraint ) {
////			primaryConstraint.J1.Multiply( primaryConstraint.s, v );
////			primaryConstraint.fl.isZero = false;
////		}
////		for ( i = 0; i < body.children.Num(); i++ ) {
////			child = body.children[i].primaryConstraint;
////			child.J2.Multiply( child.s, v );
////			child.fl.isZero = false;
////		}
////		body.GetResponseForce( body.numResponses ) = constraint.J1.SubVec6( row );
////	}
////
////	// set right hand side for second constrained body
////	body = constraint.body2;
////	if ( body && body.tree == this ) {
////		body.InverseWorldSpatialInertiaMultiply( v, constraint.J2[row] );
////		primaryConstraint = body.primaryConstraint;
////		if ( primaryConstraint ) {
////			primaryConstraint.J1.MultiplyAdd( primaryConstraint.s, v );
////			primaryConstraint.fl.isZero = false;
////		}
////		for ( i = 0; i < body.children.Num(); i++ ) {
////			child = body.children[i].primaryConstraint;
////			child.J2.MultiplyAdd( child.s, v );
////			child.fl.isZero = false;
////		}
////		body.GetResponseForce( body.numResponses ) = constraint.J2.SubVec6( row );
////	}
////
////
////	// solve for primary constraints
////	Solve( auxiliaryIndex );
////
////	bool useSymmetry = af_useSymmetry.GetBool();
////
////	// store body forces in response to the constraint force
////	idVecX force;
////	for ( i = 0; i < sortedBodies.Num(); i++ ) {
////		body = sortedBodies[i];
////
////		if ( useSymmetry && body.maxAuxiliaryIndex < auxiliaryIndex ) {
////			continue;
////		}
////
////		force.SetData( 6, body.response + body.numResponses * 8 );
////
////		// add forces of all primary constraints acting on this body
////		primaryConstraint = body.primaryConstraint;
////		if ( primaryConstraint ) {
////			primaryConstraint.J1.TransposeMultiplyAdd( force, primaryConstraint.lm );
////		}
////		for ( j = 0; j < body.children.Num(); j++ ) {
////			child = body.children[j].primaryConstraint;
////			child.J2.TransposeMultiplyAdd( force, child.lm );
////		}
////
////		body.responseIndex[body.numResponses++] = auxiliaryIndex;
////	}
////}
////
/////*
////================
////idAFTree::CalculateForces
////
////  calculate forces on the bodies in the tree
////================
////*/
////void idAFTree::CalculateForces( float timeStep ) const {
////	var /*int */i:number, j:number;
////	float invStep;
////	idAFBody *body;
////	idAFConstraint *child, *c, *primaryConstraint;
////
////	// forces on bodies
////	for ( i = 0; i < sortedBodies.Num(); i++ ) {
////		body = sortedBodies[i];
////
////		body.totalForce.SubVec6(0) = body.current.externalForce + body.auxForce.SubVec6(0);
////	}
////
////	// if a single body don't waste time because there aren't any primary constraints
////	if ( sortedBodies.Num() == 1 ) {
////		return;
////	}
////
////	invStep = 1.0f / timeStep;
////
////	// initialize right hand side
////	for ( i = 0; i < sortedBodies.Num(); i++ ) {
////		body = sortedBodies[i];
////
////		body.InverseWorldSpatialInertiaMultiply( body.acceleration, body.totalForce.ToFloatPtr() );
////		body.acceleration.SubVec6(0) += body.current.spatialVelocity * invStep;
////		primaryConstraint = body.primaryConstraint;
////		if ( primaryConstraint ) {
////			// b = ( J * acc + c )
////			c = primaryConstraint;
////			c.s = c.J1 * c.body1.acceleration + c.J2 * c.body2.acceleration + invStep * ( c.c1 + c.c2 );
////			c.fl.isZero = false;
////		}
////		body.s.Zero();
////		body.fl.isZero = true;
////	}
////
////	// solve for primary constraints
////	Solve();
////
////	// calculate forces on bodies after applying primary constraints
////	for ( i = 0; i < sortedBodies.Num(); i++ ) {
////		body = sortedBodies[i];
////
////		// add forces of all primary constraints acting on this body
////		primaryConstraint = body.primaryConstraint;
////		if ( primaryConstraint ) {
////			primaryConstraint.J1.TransposeMultiplyAdd( body.totalForce, primaryConstraint.lm );
////		}
////		for ( j = 0; j < body.children.Num(); j++ ) {
////			child = body.children[j].primaryConstraint;
////			child.J2.TransposeMultiplyAdd( body.totalForce, child.lm );
////		}
////	}
////}
////
/////*
////================
////idAFTree::SetMaxSubTreeAuxiliaryIndex
////================
////*/
////void idAFTree::SetMaxSubTreeAuxiliaryIndex( ) {
////	var /*int */i:number, j:number;
////	idAFBody *body, *child;
////
////	// from the leaves up towards the root
////	for ( i = sortedBodies.Num() - 1; i >= 0; i-- ) {
////		body = sortedBodies[i];
////
////		body.maxSubTreeAuxiliaryIndex = body.maxAuxiliaryIndex;
////		for ( j = 0; j < body.children.Num(); j++ ) {
////			child = body.children[j];
////			if ( child.maxSubTreeAuxiliaryIndex > body.maxSubTreeAuxiliaryIndex ) {
////				body.maxSubTreeAuxiliaryIndex = child.maxSubTreeAuxiliaryIndex;
////			}
////		}
////	}
////}
////
/////*
////================
////idAFTree::SortBodies_r
////================
////*/
////void idAFTree::SortBodies_r( idList<idAFBody*>&sortedList, idAFBody *body ) {
////	var/*int*/i:number;
////
////	for ( i = 0; i < body.children.Num(); i++ ) {
////		sortedList.Append( body.children[i] );
////	}
////	for ( i = 0; i < body.children.Num(); i++ ) {
////		SortBodies_r( sortedList, body.children[i] );
////	}
////}
////
/////*
////================
////idAFTree::SortBodies
////
////  sort body list to make sure parents come first
////================
////*/
////void idAFTree::SortBodies( ) {
////	var/*int*/i:number;
////	idAFBody *body;
////
////	// find the root
////	for ( i = 0; i < sortedBodies.Num(); i++ ) {
////		if ( !sortedBodies[i].parent ) {
////			break;
////		}
////	}
////
////	if ( i >= sortedBodies.Num() ) {
////		gameLocal.Error( "Articulated figure tree has no root." );
////	}
////
////	body = sortedBodies[i];
////	sortedBodies.Clear();
////	sortedBodies.Append( body );
////	SortBodies_r( sortedBodies, body );
////}
////
/////*
////================
////idAFTree::DebugDraw
////================
////*/
////void idAFTree::DebugDraw( const idVec4 &color ) const {
////	var/*int*/i:number;
////	idAFBody *body;
////
////	for ( i = 1; i < sortedBodies.Num(); i++ ) {
////		body = sortedBodies[i];
////		gameRenderWorld.DebugArrow( color, body.parent.current.worldOrigin, body.current.worldOrigin, 1 );
////	}
////}
////
////

