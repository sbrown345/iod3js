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
////#ifndef __PHYSICS_AF_H__
////#define __PHYSICS_AF_H__
////
/////*
////===================================================================================
////
////	Articulated Figure physics
////
////	Employs a constraint force based dynamic simulation using a lagrangian
////	multiplier method to solve for the constraint forces.
////
////===================================================================================
////*/
////
////class idAFConstraint;
////class idAFConstraint_Fixed;
////class idAFConstraint_BallAndSocketJoint;
////class idAFConstraint_BallAndSocketJointFriction;
////class idAFConstraint_UniversalJoint;
////class idAFConstraint_UniversalJointFriction;
////class idAFConstraint_CylindricalJoint;
////class idAFConstraint_Hinge;
////class idAFConstraint_HingeFriction;
////class idAFConstraint_HingeSteering;
////class idAFConstraint_Slider;
////class idAFConstraint_Line;
////class idAFConstraint_Plane;
////class idAFConstraint_Spring;
////class idAFConstraint_Contact;
////class idAFConstraint_ContactFriction;
////class idAFConstraint_ConeLimit;
////class idAFConstraint_PyramidLimit;
////class idAFConstraint_Suspension;
////class idAFBody;
////class idAFTree;
////class idPhysics_AF;

enum constraintType_t{
	CONSTRAINT_INVALID,
	CONSTRAINT_FIXED,
	CONSTRAINT_BALLANDSOCKETJOINT,
	CONSTRAINT_UNIVERSALJOINT,
	CONSTRAINT_HINGE,
	CONSTRAINT_HINGESTEERING,
	CONSTRAINT_SLIDER,
	CONSTRAINT_CYLINDRICALJOINT,
	CONSTRAINT_LINE,
	CONSTRAINT_PLANE,
	CONSTRAINT_SPRING,
	CONSTRAINT_CONTACT,
	CONSTRAINT_FRICTION,
	CONSTRAINT_CONELIMIT,
	CONSTRAINT_PYRAMIDLIMIT,
	CONSTRAINT_SUSPENSION
};


//===============================================================
//
//	idAFConstraint
//
//===============================================================

class constraintFlags_s {
	allowPrimary: boolean; //	: 1;	// true if the constraint can be used as a primary constraint
	frameConstraint: boolean; //	: 1;	// true if this constraint is added to the frame constraints
	noCollision: boolean; //	: 1;	// true if body1 and body2 never collide with each other
	isPrimary: boolean; //	: 1;	// true if this is a primary constraint
	isZero: boolean; //	: 1;	// true if 's' is zero during calculations

	memset0 ( ): void {
		this.allowPrimary = false;
		this.frameConstraint = false;
		this.noCollision = false;
		this.isPrimary = false;
		this.isZero = false;
	}
}

// base class for all constraints
class idAFConstraint {
////
////	friend class idPhysics_AF;
////	friend class idAFTree;
////
////public:
////							idAFConstraint( );
////	virtual					~idAFConstraint( );
	GetType ( ): constraintType_t { return this.type; }
	GetName(): idStr { return this.name; }
	GetBody1(): idAFBody { return this.body1; }
	GetBody2(): idAFBody { return this.body2; }
	SetPhysics(p: idPhysics_AF) { this.physics = p; }
////	const idVecX &			GetMultiplier( );
////	virtual void			SetBody1( idAFBody *body );
////	virtual void			SetBody2( idAFBody *body );
////	virtual void			DebugDraw( );
////	virtual void			GetForce( idAFBody *body, idVec6 &force );
////	virtual void			Translate( const idVec3 &translation );
////	virtual void			Rotate( const idRotation &rotation );
////	virtual void			GetCenter( idVec3 &center );
////	virtual void			Save( idSaveGame *saveFile ) const;
////	virtual void			Restore( idRestoreGame *saveFile );
////
////protected:
	type:constraintType_t;						// constraint type
	name = new idStr;						// name of constraint
	body1:idAFBody;						// first constrained body
	body2:idAFBody;						// second constrained body, NULL for world
	physics:idPhysics_AF;					// for adding additional constraints like limits

	// simulation variables set by Evaluate
	J1 = new idMatX; J2 = new idMatX;						// matrix with left hand side of constraint equations
	c1 = new idVecX; c2 = new idVecX;						// right hand side of constraint equations
	lo = new idVecX; hi = new idVecX; e = new idVecX;					// low and high bounds and lcp epsilon
	boxConstraint:idAFConstraint;				// constraint the boxIndex refers to
	boxIndex = new Int32Array(6);				// indexes for special box constrained variables

	// simulation variables used during calculations
	invI = new idMatX;						// transformed inertia
	J = new idMatX;							// transformed constraint matrix
	s = new idVecX;							// temp solution
	lm = new idVecX;							// lagrange multipliers
	firstIndex :number/*int*/;					// index of the first constraint row in the lcp matrix

////	struct constraintFlags_s {
////		bool				allowPrimary		: 1;	// true if the constraint can be used as a primary constraint
////		bool				frameConstraint		: 1;	// true if this constraint is added to the frame constraints
////		bool				noCollision			: 1;	// true if body1 and body2 never collide with each other
////		bool				isPrimary			: 1;	// true if this is a primary constraint
////		bool				isZero				: 1;	// true if 's' is zero during calculations
////	} fl;
	fl = new constraintFlags_s;
////
////protected:
////	virtual void			Evaluate( float invTimeStep );
////	virtual void			ApplyFriction( float invTimeStep );
////	void					InitSize( int size );


/*
================
idAFConstraint::idAFConstraint
================
*/
	constructor ( ) {
		this.type = constraintType_t.CONSTRAINT_INVALID;
		this.name.opEquals( "noname" );
		this.body1 = null;
		this.body2 = null;
		this.physics = null;

		this.lo.Zero( 6 );
		this.lo.SubVec6( 0 ).opEquals( vec6_infinity.opUnaryMinus ( ) );
		this.hi.Zero( 6 );
		this.hi.SubVec6( 0 ).opEquals( vec6_infinity );
		this.e.SetSize( 6 );
		this.e.SubVec6( 0 ).opEquals( vec6_lcp_epsilon );

		this.boxConstraint = null;
		this.boxIndex[0] = -1;
		this.boxIndex[1] = -1;
		this.boxIndex[2] = -1;
		this.boxIndex[3] = -1;
		this.boxIndex[4] = -1;
		this.boxIndex[5] = -1;

		this.firstIndex = 0;

		this.fl.memset0 ( );
	}
	////
	/////*
	////================
	////idAFConstraint::~idAFConstraint
	////================
	////*/
	////idAFConstraint::~idAFConstraint( ) {
	////}
	
	/*
	================
	idAFConstraint::SetBody1
	================
	*/
	SetBody1( body: idAFBody ) :void{
		if ( this.body1 != body) {
			this.body1 = body;
			if ( this.physics ) {
				this.physics.SetChanged();
			}
		}
	}
	
	/*
	================
	idAFConstraint::SetBody2
	================
	*/
	SetBody2( body: idAFBody ):void {
		if ( this.body2 != body ) {
			this.body2 = body;
			if ( this.physics ) {
				this.physics.SetChanged();
			}
		}
	}
	
	/*
	================
	idAFConstraint::GetMultiplier
	================
	*/
	GetMultiplier(): idVecX {
		return this.lm;
	}
	
	/*
	================
	idAFConstraint::Evaluate
	================
	*/
	Evaluate( /*float*/ invTimeStep:number ):void {
		assert( 0 );
	}
	
	/*
	================
	idAFConstraint::ApplyFriction
	================
	*/
	ApplyFriction( /*float*/ invTimeStep:number ) :void{
	}
	
	/*
	================
	idAFConstraint::GetForce
	================
	*/
	GetForce(body: idAFBody, force: idVec6):void {
		var v = new idVecX ;
		todoThrow ( );
		//v.SetData( 6, VECX_ALLOCA( 6 ) );
		//if ( body == this.body1 ) {
		//	this.J1.TransposeMultiply( v, this.lm );
		//}
		//else if ( body == this.body2 ) {
		//	this.J2.TransposeMultiply( v, this.lm );
		//}
		//else {
		//	v.Zero();
		//}
		//force[0] = v[0]; force[1] = v[1]; force[2] = v[2]; force[3] = v[3]; force[4] = v[4]; force[5] = v[5];
	}
	
	/*
	================
	idAFConstraint::Translate
	================
	*/
	Translate ( translation: idVec3 ) {
		assert( 0 );
	}

/*
================
idAFConstraint::Rotate
================
*/
	Rotate ( rotation: idRotation ): void {
		assert( 0 );
	}

/*
================
idAFConstraint::GetCenter
================
*/
	GetCenter ( center: idVec3 ): void {
		center.Zero ( );
	}

/*
================
idAFConstraint::DebugDraw
================
*/
	DebugDraw ( ): void {
	}

/*
================
idAFConstraint::InitSize
================
*/
	InitSize ( /*int */size: number ): void {
		this.J1.Zero( size, 6 );
		this.J2.Zero( size, 6 );
		this.c1.Zero( size );
		this.c2.Zero( size );
		this.s.Zero( size );
		this.lm.Zero( size );
	}

/////*
////================
////idAFConstraint::Save
////================
////*/
////Save( idSaveGame *saveFile ) :void {
////	saveFile.WriteInt( this.type );
////}
////
/////*
////================
////idAFConstraint::Restore
////================
////*/
////Restore( idRestoreGame *saveFile ) :void{
////	constraintType_t t;
////	saveFile.ReadInt( (int &)t );
////	assert( t == this.type );
////}
////
};

// fixed or rigid joint which allows zero degrees of freedom
// constrains body1 to have a fixed position and orientation relative to body2
class idAFConstraint_Fixed extends idAFConstraint {
////
////public:
////							idAFConstraint_Fixed( name: idStr, body1: idAFBody, body2: idAFBody );
	SetRelativeOrigin( origin :idVec3):void { this.offset.opEquals( origin ); }
	SetRelativeAxis(axis: idMat3): void { this.relAxis.opEquals(axis); }
////	virtual void			SetBody1( idAFBody *body );
////	virtual void			SetBody2( idAFBody *body );
////	virtual void			DebugDraw( );
////	virtual void			Translate( const idVec3 &translation );
////	virtual void			Rotate( const idRotation &rotation );
////	virtual void			GetCenter( idVec3 &center );
////	virtual void			Save( idSaveGame *saveFile ) const;
////	virtual void			Restore( idRestoreGame *saveFile );
////
////protected:
	offset = new idVec3;						 // offset of body1 relative to body2 in body2 space
	relAxis = new idMat3;					// rotation of body1 relative to body2
////
////protected:
////	virtual void			Evaluate( float invTimeStep );
////	virtual void			ApplyFriction( float invTimeStep );
////	void					InitOffset( );

	
/*
================
idAFConstraint_Fixed::idAFConstraint_Fixed
================
*/
	constructor(name: idStr, body1: idAFBody, body2: idAFBody) {
		super ( );
		assert( body1 );
		this.type = constraintType_t.CONSTRAINT_FIXED;
        this.name.opEquals(name);
		this.body1 = body1;
		this.body2 = body2;
		this.InitSize( 6 );
		this.fl.allowPrimary = true;
		this.fl.noCollision = true;

		this.InitOffset ( );
	}

/*
================
idAFConstraint_Fixed::InitOffset
================
*/
InitOffset( ) :void{
	if ( this.body2 ) {
		this.offset.opEquals( idMat3.opMultiplication_VecMat( ( this.body1.GetWorldOrigin ( ).opSubtraction( this.body2.GetWorldOrigin ( ) ) ), this.body2.GetWorldAxis ( ).Transpose ( ) ) );
		this.relAxis.opEquals( this.body1.GetWorldAxis ( ).opMultiplication( this.body2.GetWorldAxis ( ).Transpose ( ) ) );
	}
	else {
		this.offset = this.body1.GetWorldOrigin();
		this.relAxis = this.body1.GetWorldAxis();
	}
}

/*
================
idAFConstraint_Fixed::SetBody1
================
*/
	SetBody1 ( body: idAFBody ): void {
		if ( this.body1 != body ) {
			this.body1 = body;
			this.InitOffset ( );
			if ( this.physics ) {
				this.physics.SetChanged ( );
			}
		}
	}

/*
================
idAFConstraint_Fixed::SetBody2
================
*/
	SetBody2 ( body: idAFBody ): void {
		if ( this.body2 != body ) {
			this.body2 = body;
			this.InitOffset ( );
			if ( this.physics ) {
				this.physics.SetChanged ( );
			}
		}
	}
////
/////*
////================
////idAFConstraint_Fixed::Evaluate
////================
////*/
////void idAFConstraint_Fixed::Evaluate( /*float*/ invTimeStep:number ) {
////	idVec3 ofs, a2;
////	idMat3 ax;
////	idRotation r;
////	idAFBody *master;
////
////	master = this.body2 ? this.body2 : this.physics.GetMasterBody();
////
////	if ( master ) {
////		a2 = this.offset * master.GetWorldAxis();
////		ofs = a2 + master.GetWorldOrigin();
////		ax = this.relAxis * master.GetWorldAxis();
////	}
////	else {
////		a2.Zero();
////		ofs = this.offset;
////		ax = this.relAxis;
////	}
////
////	this.J1.Set(	mat3_identity, mat3_zero,
////				mat3_zero, mat3_identity );
////
////	if ( this.body2 ) {
////		this.J2.Set(	-mat3_identity, SkewSymmetric( a2 ),
////					mat3_zero, -mat3_identity );
////	}
////	else {
////		this.J2.Zero( 6, 6 );
////	}
////
////	c1.SubVec3(0) = -( invTimeStep * ERROR_REDUCTION ) * ( ofs - this.body1.GetWorldOrigin() );
////	r = ( this.body1.GetWorldAxis().Transpose() * ax ).ToRotation();
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
////void idAFConstraint_Fixed::ApplyFriction( /*float*/ invTimeStep:number ) {
////	// no friction
////}
//////
///*
//================
//idAFConstraint_Fixed::Translate
//================
//*/
//void idAFConstraint_Fixed::Translate( const idVec3 &translation ) {
//	if ( !this.body2 ) {
//		this.offset += translation;
//	}
//}

///*
//================
//idAFConstraint_Fixed::Rotate
//================
//*/
//void idAFConstraint_Fixed::Rotate( const idRotation &rotation ) {
//	if ( !this.body2 ) {
//		this.offset *= rotation;
//		this.relAxis *= rotation.ToMat3();
//	}
//}
////
/////*
////================
////idAFConstraint_Fixed::GetCenter
////================
////*/
////void idAFConstraint_Fixed::GetCenter( idVec3 &center ) {
////	center = this.body1.GetWorldOrigin();
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
////	master = this.body2 ? this.body2 : this.physics.GetMasterBody();
////	if ( master ) {
////		gameRenderWorld.DebugLine( colorRed, this.body1.GetWorldOrigin(), master.GetWorldOrigin() );
////	}
////	else {
////		gameRenderWorld.DebugLine( colorRed, this.body1.GetWorldOrigin(), vec3_origin );
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
////	saveFile.WriteVec3( this.offset );
////	saveFile.WriteMat3( this.relAxis );
////}
////
/////*
////================
////idAFConstraint_Fixed::Restore
////================
////*/
////void idAFConstraint_Fixed::Restore( idRestoreGame *saveFile ) {
////	idAFConstraint::Restore( saveFile );
////	saveFile.ReadVec3( this.offset );
////	saveFile.ReadMat3( this.relAxis );
////}
////
};

// ball and socket or spherical joint which allows 3 degrees of freedom
// constrains body1 relative to body2 with a ball and socket joint
class idAFConstraint_BallAndSocketJoint extends idAFConstraint {
////
////public:
////							idAFConstraint_BallAndSocketJoint( name: idStr, body1: idAFBody, body2: idAFBody );
////							~idAFConstraint_BallAndSocketJoint( );
////	void					SetAnchor( const idVec3 &worldPosition );
////	idVec3					GetAnchor( ) const;
////	void					SetNoLimit( );
////	void					SetConeLimit( const idVec3 &coneAxis, const float coneAngle, const idVec3 &body1Axis );
////	void					SetPyramidLimit( const idVec3 &pyramidAxis, const idVec3 &baseAxis,
////											const float angle1, const float angle2, const idVec3 &body1Axis );
////	void					SetLimitEpsilon( const float e );
    SetFriction( /*const float */f: number) { this.friction = f; }
////	float					GetFriction( ) const;
////	virtual void			DebugDraw( );
////	virtual void			GetForce( idAFBody *body, idVec6 &force );
////	virtual void			Translate( const idVec3 &translation );
////	virtual void			Rotate( const idRotation &rotation );
////	virtual void			GetCenter( idVec3 &center );
////	virtual void			Save( idSaveGame *saveFile ) const;
////	virtual void			Restore( idRestoreGame *saveFile );
////
////protected:
	anchor1 = new idVec3;					// anchor in body1 space
	anchor2 = new idVec3;					// anchor in body2 space
	friction: number /*float*/;					// joint friction
	coneLimit: idAFConstraint_ConeLimit ;				// cone shaped limit
	pyramidLimit: idAFConstraint_PyramidLimit ;			// pyramid shaped limit
	fc: idAFConstraint_BallAndSocketJointFriction;		// friction constraint
////
////protected:
////	virtual void			Evaluate( float invTimeStep );
////	virtual void			ApplyFriction( float invTimeStep );

	
/*
================
idAFConstraint_BallAndSocketJoint::idAFConstraint_BallAndSocketJoint
================
*/
	constructor(name: idStr, body1: idAFBody, body2: idAFBody) {
		super ( );
		assert( body1 );
		this.type = constraintType_t.CONSTRAINT_BALLANDSOCKETJOINT;
        this.name.opEquals( name);
		this.body1 = body1;
		this.body2 = body2;
		this.InitSize( 3 );
		this.coneLimit = null;
		this.pyramidLimit = null;
		this.friction = 0.0;
		this.fc = null;
		this.fl.allowPrimary = true;
		this.fl.noCollision = true;
	}
////
/////*
////================
////idAFConstraint_BallAndSocketJoint::~idAFConstraint_BallAndSocketJoint
////================
////*/
////idAFConstraint_BallAndSocketJoint::~idAFConstraint_BallAndSocketJoint( ) {
////	if ( this.coneLimit ) {
////		delete this.coneLimit;
////	}
////	if ( this.pyramidLimit ) {
////		delete this.pyramidLimit;
////	}
////}

/*
================
idAFConstraint_BallAndSocketJoint::SetAnchor
================
*/
	SetAnchor(worldPosition: idVec3 ):void {

	// get anchor relative to center of mass of body1
		this.anchor1.opEquals(idMat3.opMultiplication_VecMat(( worldPosition.opSubtraction( this.body1.GetWorldOrigin ( ) )), this.body1.GetWorldAxis ( ).Transpose ( ) ) );
	if ( this.body2 ) {
		// get anchor relative to center of mass of body2
		this.anchor2.opEquals( idMat3.opMultiplication_VecMat( ( worldPosition.opSubtraction( this.body2.GetWorldOrigin ( ) ) ), this.body2.GetWorldAxis ( ).Transpose ( ) ) );
	}
	else {
		this.anchor2.opEquals( worldPosition);
	}

	if ( this.coneLimit ) {
		this.coneLimit.SetAnchor( this.anchor2 );
	}
		if ( this.pyramidLimit ) {
			this.pyramidLimit.SetAnchor( this.anchor2 );
		}
	}

/*
================
idAFConstraint_BallAndSocketJoint::GetAnchor
================
*/
	GetAnchor ( ): idVec3 {
		if ( this.body2 ) {
			return this.body2.GetWorldOrigin ( ).opAddition( this.body2.GetWorldAxis ( ).opMultiplication_Vec( this.anchor2 ) );
		}
		return this.anchor2;
	}

/*
================
idAFConstraint_BallAndSocketJoint::SetNoLimit
================
*/
	SetNoLimit ( ): void {
		if ( this.coneLimit ) {
			delete this.coneLimit;
			this.coneLimit = null;
		}
		if ( this.pyramidLimit ) {
			delete this.pyramidLimit;
			this.pyramidLimit = null;
		}
	}

/*
================
idAFConstraint_BallAndSocketJoint::SetConeLimit
================
*/
    SetConeLimit ( coneAxis: idVec3, /*float */coneAngle: number, body1Axis: idVec3 ): void {
        if ( this.pyramidLimit ) {
            $delete( this.pyramidLimit );
            this.pyramidLimit = null;
        }
        if ( !this.coneLimit ) {
            this.coneLimit = new idAFConstraint_ConeLimit;
            this.coneLimit.SetPhysics( this.physics );
        }
        if ( this.body2 ) {
            this.coneLimit.Setup( this.body1, this.body2, this.anchor2, idMat3.opMultiplication_VecMat( coneAxis, this.body2.GetWorldAxis ( ).Transpose ( ) ), coneAngle, idMat3.opMultiplication_VecMat( body1Axis, this.body1.GetWorldAxis ( ).Transpose ( ) ) );
        } else {
            this.coneLimit.Setup( this.body1, this.body2, this.anchor2, coneAxis, coneAngle, idMat3.opMultiplication_VecMat( body1Axis, this.body1.GetWorldAxis ( ).Transpose ( ) ) );
        }
    }

/*
================
idAFConstraint_BallAndSocketJoint::SetPyramidLimit
================
*/
    SetPyramidLimit ( pyramidAxis: idVec3, baseAxis: idVec3,
        /*float */angle1: number, /*float */angle2: number, body1Axis: idVec3 ): void {
        if ( this.coneLimit ) {
            delete this.coneLimit;
            this.coneLimit = null;
        }
        if ( !this.pyramidLimit ) {
            this.pyramidLimit = new idAFConstraint_PyramidLimit;
            this.pyramidLimit.SetPhysics( this.physics );
        }
        if ( this.body2 ) {
            this.pyramidLimit.Setup( this.body1, this.body2, this.anchor2, idMat3.opMultiplication_VecMat( pyramidAxis, this.body2.GetWorldAxis ( ).Transpose ( ) ),
                idMat3.opMultiplication_VecMat( baseAxis, this.body2.GetWorldAxis ( ).Transpose ( ) ), angle1, angle2,
                idMat3.opMultiplication_VecMat( body1Axis, this.body1.GetWorldAxis ( ).Transpose ( ) ) );
        } else {
            this.pyramidLimit.Setup( this.body1, this.body2, this.anchor2, pyramidAxis, baseAxis, angle1, angle2,
                idMat3.opMultiplication_VecMat( body1Axis, this.body1.GetWorldAxis ( ).Transpose ( ) ) );
        }
    }

/////*
////================
////idAFConstraint_BallAndSocketJoint::SetLimitEpsilon
////================
////*/
////void idAFConstraint_BallAndSocketJoint::SetLimitEpsilon( const float e ) {
////	if ( this.coneLimit ) {
////		this.coneLimit.SetEpsilon( e );
////	}
////	if ( this.pyramidLimit ) {
////		this.pyramidLimit.SetEpsilon( e );
////	}
////}
////
/////*
////================
////idAFConstraint_BallAndSocketJoint::GetFriction
////================
////*/
////float idAFConstraint_BallAndSocketJoint::GetFriction( ) const {
////	if ( af_forceFriction.GetFloat() > 0.0 ) {
////		return af_forceFriction.GetFloat();
////	}
////	return this.friction * this.physics.GetJointFrictionScale();
////}
////
/////*
////================
////idAFConstraint_BallAndSocketJoint::Evaluate
////================
////*/
////void idAFConstraint_BallAndSocketJoint::Evaluate( /*float*/ invTimeStep:number ) {
////	idVec3 a1, a2;
////	idAFBody *master;
////
////	master = this.body2 ? this.body2 : this.physics.GetMasterBody();
////
////	a1 = this.anchor1 * this.body1.GetWorldAxis();
////
////	if ( master ) {
////		a2 = this.anchor2 * master.GetWorldAxis();
////		c1.SubVec3(0) = -( invTimeStep * ERROR_REDUCTION ) * ( a2 + master.GetWorldOrigin() - ( a1 + this.body1.GetWorldOrigin() ) );
////	}
////	else {
////		c1.SubVec3(0) = -( invTimeStep * ERROR_REDUCTION ) * ( this.anchor2 - ( a1 + this.body1.GetWorldOrigin() ) );
////	}
////
////	c1.Clamp( -ERROR_REDUCTION_MAX, ERROR_REDUCTION_MAX );
////
////	this.J1.Set( mat3_identity, -SkewSymmetric( a1 ) );
////
////	if ( this.body2 ) {
////		this.J2.Set( -mat3_identity, SkewSymmetric( a2 ) );
////	}
////	else {
////		this.J2.Zero( 3, 6 );
////	}
////
////	if ( this.coneLimit ) {
////		this.coneLimit.Add( this.physics, invTimeStep );
////	}
////	else if ( this.pyramidLimit ) {
////		this.pyramidLimit.Add( this.physics, invTimeStep );
////	}
////}
////
/////*
////================
////idAFConstraint_BallAndSocketJoint::ApplyFriction
////================
////*/
////void idAFConstraint_BallAndSocketJoint::ApplyFriction( /*float*/ invTimeStep:number ) {
////	idVec3 angular;
////	float invMass, currentFriction;
////
////	currentFriction = GetFriction();
////
////	if ( currentFriction <= 0.0 ) {
////		return;
////	}
////
////	if ( af_useImpulseFriction.GetBool() || af_useJointImpulseFriction.GetBool() ) {
////
////		angular = this.body1.GetAngularVelocity();
////		invMass = this.body1.GetInverseMass();
////		if ( this.body2 ) {
////			angular -= this.body2.GetAngularVelocity();
////			invMass += this.body2.GetInverseMass();
////		}
////
////		angular *= currentFriction / invMass;
////
////		this.body1.SetAngularVelocity( this.body1.GetAngularVelocity() - angular * this.body1.GetInverseMass() );
////		if ( this.body2 ) {
////			this.body2.SetAngularVelocity( this.body2.GetAngularVelocity() + angular * this.body2.GetInverseMass() );
////		}
////	}
////	else {
////		if ( !this.fc ) {
////			this.fc = new idAFConstraint_BallAndSocketJointFriction;
////			this.fc.Setup( this );
////		}
////
////		this.fc.Add( this.physics, invTimeStep );
////	}
////}
////
/////*
////================
////idAFConstraint_BallAndSocketJoint::GetForce
////================
////*/
////void idAFConstraint_BallAndSocketJoint::GetForce( body: idAFBody, idVec6 &force ) {
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
////	if ( !this.body2 ) {
////		this.anchor2 += translation;
////	}
////	if ( this.coneLimit ) {
////		this.coneLimit.Translate( translation );
////	}
////	else if ( this.pyramidLimit ) {
////		this.pyramidLimit.Translate( translation );
////	}
////}
////
/////*
////================
////idAFConstraint_BallAndSocketJoint::Rotate
////================
////*/
////void idAFConstraint_BallAndSocketJoint::Rotate( const idRotation &rotation ) {
////	if ( !this.body2 ) {
////		this.anchor2 *= rotation;
////	}
////	if ( this.coneLimit ) {
////		this.coneLimit.Rotate( rotation );
////	}
////	else if ( this.pyramidLimit ) {
////		this.pyramidLimit.Rotate( rotation );
////	}
////}
////
/////*
////================
////idAFConstraint_BallAndSocketJoint::GetCenter
////================
////*/
////void idAFConstraint_BallAndSocketJoint::GetCenter( idVec3 &center ) {
////	center = this.body1.GetWorldOrigin() + this.anchor1 * this.body1.GetWorldAxis();
////}
////
/////*
////================
////idAFConstraint_BallAndSocketJoint::DebugDraw
////================
////*/
////void idAFConstraint_BallAndSocketJoint::DebugDraw( ) {
////	idVec3 a1 = this.body1.GetWorldOrigin() + this.anchor1 * this.body1.GetWorldAxis();
////	gameRenderWorld.DebugLine( colorBlue, a1 - idVec3( 5, 0, 0 ), a1 + idVec3( 5, 0, 0 ) );
////	gameRenderWorld.DebugLine( colorBlue, a1 - idVec3( 0, 5, 0 ), a1 + idVec3( 0, 5, 0 ) );
////	gameRenderWorld.DebugLine( colorBlue, a1 - idVec3( 0, 0, 5 ), a1 + idVec3( 0, 0, 5 ) );
////
////	if ( af_showLimits.GetBool() ) {
////		if ( this.coneLimit ) {
////			this.coneLimit.DebugDraw();
////		}
////		if ( this.pyramidLimit ) {
////			this.pyramidLimit.DebugDraw();
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
////	saveFile.WriteVec3( this.anchor1 );
////	saveFile.WriteVec3( this.anchor2 );
////	saveFile.WriteFloat( this.friction );
////	if ( this.coneLimit ) {
////		this.coneLimit.Save( saveFile );
////	}
////	if ( this.pyramidLimit ) {
////		this.pyramidLimit.Save( saveFile );
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
////	saveFile.ReadVec3( this.anchor1 );
////	saveFile.ReadVec3( this.anchor2 );
////	saveFile.ReadFloat( this.friction );
////	if ( this.coneLimit ) {
////		this.coneLimit.Restore( saveFile );
////	}
////	if ( this.pyramidLimit ) {
////		this.pyramidLimit.Restore( saveFile );
////	}
////}
////
////
};

// ball and socket joint friction
class idAFConstraint_BallAndSocketJointFriction extends idAFConstraint {
////
////public:
////							idAFConstraint_BallAndSocketJointFriction( );
////	void					Setup( idAFConstraint_BallAndSocketJoint *cc );
////	bool					Add( idPhysics_AF *phys, float invTimeStep );
////	virtual void			Translate( const idVec3 &translation );
////	virtual void			Rotate( const idRotation &rotation );
////
////protected:
////	idAFConstraint_BallAndSocketJoint *joint;
////
////protected:
////	virtual void			Evaluate( float invTimeStep );
////	virtual void			ApplyFriction( float invTimeStep );

	
/////*
////================
////idAFConstraint_BallAndSocketJointFriction::idAFConstraint_BallAndSocketJointFriction
////================
////*/
////idAFConstraint_BallAndSocketJointFriction::idAFConstraint_BallAndSocketJointFriction( ) {
////	this.type = constraintType_t.CONSTRAINT_FRICTION;
////	this.name .opEquals( "ballAndSocketJointFriction");
////	this.InitSize( 3 );
////	joint = NULL;
////	this.fl.allowPrimary = false;
////	this.fl.frameConstraint = true;
////}
////
/////*
////================
////idAFConstraint_BallAndSocketJointFriction::Setup
////================
////*/
////void idAFConstraint_BallAndSocketJointFriction::Setup( idAFConstraint_BallAndSocketJoint *bsj ) {
////	this.joint = bsj;
////	this.body1 = bsj.GetBody1();
////	body2 = bsj.GetBody2();
////}
////
/////*
////================
////idAFConstraint_BallAndSocketJointFriction::Evaluate
////================
////*/
////void idAFConstraint_BallAndSocketJointFriction::Evaluate( /*float*/ invTimeStep:number ) {
////	// do nothing
////}
////
/////*
////================
////idAFConstraint_BallAndSocketJointFriction::ApplyFriction
////================
////*/
////void idAFConstraint_BallAndSocketJointFriction::ApplyFriction( /*float*/ invTimeStep:number ) {
////	// do nothing
////}
////
/////*
////================
////idAFConstraint_BallAndSocketJointFriction::Add
////================
////*/
////bool idAFConstraint_BallAndSocketJointFriction::Add( idPhysics_AF *phys, /*float*/ invTimeStep:number ) {
////	float f;
////
////	this.physics = phys;
////
////	f = joint.GetFriction() * joint.GetMultiplier().Length();
////	if ( f == 0.0 ) {
////		return false;
////	}
////
////	lo[0] = lo[1] = lo[2] = -f;
////	hi[0] = hi[1] = hi[2] = f;
////
////	J1.Zero( 3, 6 );
////	J1[0][3] = J1[1][4] = J1[2][5] = 1.0;
////
////	if ( body2 ) {
////
////		this.J2.Zero( 3, 6 );
////		this.J2[0][3] = this.J2[1][4] = this.J2[2][5] = 1.0;
////	}
////
////	this.physics.AddFrameConstraint( this );
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
};

// universal, Cardan or Hooke joint which allows 2 degrees of freedom
// like a ball and socket joint but also constrains the rotation about the cardan shafts
class idAFConstraint_UniversalJoint extends idAFConstraint {

////public:
////							idAFConstraint_UniversalJoint( name: idStr, body1: idAFBody, body2: idAFBody );
////							~idAFConstraint_UniversalJoint( );
////	void					SetAnchor( const idVec3 &worldPosition );
////	idVec3					GetAnchor( ) const;
////	void					SetShafts( const idVec3 &cardanShaft1, const idVec3 &cardanShaft2 );
////	void					GetShafts( idVec3 &cardanShaft1, idVec3 &cardanShaft2 ) { cardanShaft1 = shaft1; cardanShaft2 = this.shaft2; }
////	void					SetNoLimit( );
////	void					SetConeLimit( const idVec3 &coneAxis, const float coneAngle );
////	void					SetPyramidLimit( const idVec3 &pyramidAxis, const idVec3 &baseAxis,
////											const float angle1, const float angle2 );
////	void					SetLimitEpsilon( const float e );
    SetFriction( /*const float */f: number) { this.friction = f; }
////	float					GetFriction( ) const;
////	virtual void			DebugDraw( );
////	virtual void			GetForce( idAFBody *body, idVec6 &force );
////	virtual void			Translate( const idVec3 &translation );
////	virtual void			Rotate( const idRotation &rotation );
////	virtual void			GetCenter( idVec3 &center );
////	virtual void			Save( idSaveGame *saveFile ) const;
////	virtual void			Restore( idRestoreGame *saveFile );
////
////protected:
	anchor1 = new idVec3;					// anchor in body1 space
	anchor2 = new idVec3;					// anchor in body2 space
	shaft1 = new idVec3;						// body1 cardan shaft in body1 space
	shaft2 = new idVec3;						// body2 cardan shaft in body2 space
	axis1 = new idVec3;						// cardan axis in body1 space
	axis2 = new idVec3;						// cardan axis in body2 space
	friction :number/*float*/;					// joint friction
	coneLimit:idAFConstraint_ConeLimit// cone shaped limit
	pyramidLimit:idAFConstraint_PyramidLimit;			// pyramid shaped limit
	fc:idAFConstraint_UniversalJointFriction;			// friction constraint
////
////protected:
////	virtual void			Evaluate( float invTimeStep );
////	virtual void			ApplyFriction( float invTimeStep );

	
/*
================
idAFConstraint_UniversalJoint::idAFConstraint_UniversalJoint
================
*/
	constructor ( name: idStr, body1: idAFBody, body2: idAFBody ) {
		super ( );
		assert( body1 );
		this.type = constraintType_t.CONSTRAINT_UNIVERSALJOINT;
        this.name.opEquals( name);
		this.body1 = body1;
		this.body2 = body2;
		this.InitSize( 4 );
		this.coneLimit = null;
		this.pyramidLimit = null;
		this.friction = 0.0;
		this.fc = null;
		this.fl.allowPrimary = true;
		this.fl.noCollision = true;
	}

/////*
////================
////idAFConstraint_UniversalJoint::~idAFConstraint_UniversalJoint
////================
////*/
////idAFConstraint_UniversalJoint::~idAFConstraint_UniversalJoint( ) {
////	if ( this.coneLimit ) {
////		delete this.coneLimit;
////	}
////	if ( this.pyramidLimit ) {
////		delete this.pyramidLimit;
////	}
////	if ( this.fc ) {
////		delete this.fc;
////	}
////}

/*
================
idAFConstraint_UniversalJoint::SetAnchor
================
*/
	SetAnchor ( worldPosition: idVec3 ): void {

		// get anchor relative to center of mass of body1
		this.anchor1.opEquals( idMat3.opMultiplication_VecMat( ( worldPosition.opSubtraction( this.body1.GetWorldOrigin ( ) ) ), this.body1.GetWorldAxis ( ).Transpose ( ) ) );
		if ( this.body2 ) {
			// get anchor relative to center of mass of body2
			this.anchor2.opEquals( idMat3.opMultiplication_VecMat( ( worldPosition.opSubtraction( this.body2.GetWorldOrigin ( ) ) ), this.body2.GetWorldAxis ( ).Transpose ( ) ) );
		} else {
			this.anchor2.opEquals( worldPosition );
		}

		if ( this.coneLimit ) {
			this.coneLimit.SetAnchor( this.anchor2 );
		}
		if ( this.pyramidLimit ) {
			this.pyramidLimit.SetAnchor( this.anchor2 );
		}
	}

/*
================
idAFConstraint_UniversalJoint::GetAnchor
================
*/
	GetAnchor ( ): idVec3 {
		if ( this.body2 ) {
			return this.body2.GetWorldOrigin ( ).opAddition( this.body2.GetWorldAxis ( ).opMultiplication_Vec( this.anchor2 ) );
		}
		return this.anchor2;
	}

/*
================
idAFConstraint_UniversalJoint::SetShafts
================
*/
	SetShafts ( cardanShaft1: idVec3, cardanShaft2: idVec3 ): void {
		var cardanAxis = new idVec3;
		var l: number /*float*/;

		this.shaft1 = cardanShaft1;
		l = this.shaft1.Normalize ( );
		assert( l != 0.0 );
		this.shaft2 = cardanShaft2;
		l = this.shaft2.Normalize ( );
		assert( l != 0.0 );

		// the cardan axis is a vector orthogonal to both cardan shafts
		cardanAxis.opEquals( this.shaft1.Cross( this.shaft2 ) );
		if ( cardanAxis.Normalize ( ) == 0.0 ) {
			var vecY = new idVec3;
			this.shaft1.OrthogonalBasis( cardanAxis, vecY );
			cardanAxis.Normalize ( );
		}

		this.shaft1.opMultiplicationAssignment_mat3( this.body1.GetWorldAxis ( ).Transpose ( ) );
		this.axis1.opEquals( idMat3.opMultiplication_VecMat( cardanAxis, this.body1.GetWorldAxis ( ).Transpose ( ) ) );
		if ( this.body2 ) {
			this.shaft2.opMultiplicationAssignment_mat3( this.body2.GetWorldAxis ( ).Transpose ( ) );
			this.axis2.opEquals( idMat3.opMultiplication_VecMat( cardanAxis, this.body2.GetWorldAxis ( ).Transpose ( ) ) );
		} else {
			this.axis2.opEquals( cardanAxis );
		}

		if ( this.coneLimit ) {
			this.coneLimit.SetBody1Axis( this.shaft1 );
		}
		if ( this.pyramidLimit ) {
			this.pyramidLimit.SetBody1Axis( this.shaft1 );
		}
	}

/*
================
idAFConstraint_UniversalJoint::SetNoLimit
================
*/
	SetNoLimit ( ): void {
		if ( this.coneLimit ) {
			delete this.coneLimit;
			$delete( this.coneLimit );
			this.coneLimit = null;
		}
		if ( this.pyramidLimit ) {
			delete this.pyramidLimit;
			$delete( this.pyramidLimit );
			this.pyramidLimit = null;
		}
	}

/*
================
idAFConstraint_UniversalJoint::SetConeLimit
================
*/
    SetConeLimit ( coneAxis: idVec3, /*float */coneAngle: number ): void {
        if ( this.pyramidLimit ) {
            $delete( this.pyramidLimit );
            this.pyramidLimit = null;
        }
        if ( !this.coneLimit ) {
            this.coneLimit = new idAFConstraint_ConeLimit;
            this.coneLimit.SetPhysics( this.physics );
        }
        if ( this.body2 ) {
            this.coneLimit.Setup( this.body1, this.body2, this.anchor2, idMat3.opMultiplication_VecMat( coneAxis, this.body2.GetWorldAxis ( ).Transpose ( ) ), coneAngle, this.shaft1 );
        } else {
            this.coneLimit.Setup( this.body1, this.body2, this.anchor2, coneAxis, coneAngle, this.shaft1 );
        }
    }

/*
================
idAFConstraint_UniversalJoint::SetPyramidLimit
================
*/
    SetPyramidLimit ( pyramidAxis: idVec3, baseAxis: idVec3,
        /*float */angle1: number, /*float */angle2: number ): void {
        if ( this.coneLimit ) {
            $delete( this.coneLimit );
            this.coneLimit = null;
        }
        if ( !this.pyramidLimit ) {
            this.pyramidLimit = new idAFConstraint_PyramidLimit;
            this.pyramidLimit.SetPhysics( this.physics );
        }
        if ( this.body2 ) {
            this.pyramidLimit.Setup( this.body1, this.body2, this.anchor2, idMat3.opMultiplication_VecMat( pyramidAxis, this.body2.GetWorldAxis ( ).Transpose ( ) ),
                idMat3.opMultiplication_VecMat( baseAxis, this.body2.GetWorldAxis ( ).Transpose ( ) ), angle1, angle2, this.shaft1 );
        } else {
            this.pyramidLimit.Setup( this.body1, this.body2, this.anchor2, pyramidAxis, baseAxis, angle1, angle2, this.shaft1 );
        }
    }

/////*
////================
////idAFConstraint_UniversalJoint::SetLimitEpsilon
////================
////*/
////void idAFConstraint_UniversalJoint::SetLimitEpsilon( const float e ) {
////	if ( this.coneLimit ) {
////		this.coneLimit.SetEpsilon( e );
////	}
////	if ( this.pyramidLimit ) {
////		this.pyramidLimit.SetEpsilon( e );
////	}
////}
////
/////*
////================
////idAFConstraint_UniversalJoint::GetFriction
////================
////*/
////float idAFConstraint_UniversalJoint::GetFriction( ) const {
////	if ( af_forceFriction.GetFloat() > 0.0 ) {
////		return af_forceFriction.GetFloat();
////	}
////	return this.friction * this.physics.GetJointFrictionScale();
////}
////
/////*
////================
////idAFConstraint_UniversalJoint::Evaluate
////
////  NOTE: this joint is homokinetic
////================
////*/
////void idAFConstraint_UniversalJoint::Evaluate( /*float*/ invTimeStep:number ) {
////	idVec3 a1, a2, s1, s2, d1, d2, v;
////	idAFBody *master;
////
////	master = this.body2 ? this.body2 : this.physics.GetMasterBody();
////
////	a1 = this.anchor1 * this.body1.GetWorldAxis();
////	s1 = this.shaft1 * this.body1.GetWorldAxis();
////	d1 = s1.Cross( this.axis1 * this.body1.GetWorldAxis() );
////
////	if ( master ) {
////		a2 = this.anchor2 * master.GetWorldAxis();
////		s2 = this.shaft2 * master.GetWorldAxis();
////		d2 = this.axis2 * master.GetWorldAxis();
////		c1.SubVec3(0) = -( invTimeStep * ERROR_REDUCTION ) * ( a2 + master.GetWorldOrigin() - ( a1 + this.body1.GetWorldOrigin() ) );
////	}
////	else {
////		a2 = this.anchor2;
////		s2 = this.shaft2;
////		d2 = this.axis2;
////		c1.SubVec3(0) = -( invTimeStep * ERROR_REDUCTION ) * ( a2 - ( a1 + this.body1.GetWorldOrigin() ) );
////	}
////
////	J1.Set(	mat3_identity,	-SkewSymmetric( a1 ),
////				mat3_zero,		idMat3( s1[0], s1[1], s1[2],
////										0.0, 0.0, 0.0,
////										0.0, 0.0, 0.0 ) );
////	J1.SetSize( 4, 6 );
////
////	if ( this.body2 ) {
////		this.J2.Set(	-mat3_identity,	SkewSymmetric( a2 ),
////					mat3_zero,		idMat3( s2[0], s2[1], s2[2],
////											0.0, 0.0, 0.0,
////											0.0, 0.0, 0.0 ) );
////		this.J2.SetSize( 4, 6 );
////	}
////	else {
////		this.J2.Zero( 4, 6 );
////	}
////
////	v = s1.Cross( s2 );
////	if ( v.Normalize() != 0.0 ) {
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
////	if ( this.coneLimit ) {
////		this.coneLimit.Add( this.physics, invTimeStep );
////	}
////	else if ( this.pyramidLimit ) {
////		this.pyramidLimit.Add( this.physics, invTimeStep );
////	}
////}
////
/////*
////================
////idAFConstraint_UniversalJoint::ApplyFriction
////================
////*/
////void idAFConstraint_UniversalJoint::ApplyFriction( /*float*/ invTimeStep:number ) {
////	idVec3 angular;
////	float invMass, currentFriction;
////
////	currentFriction = GetFriction();
////
////	if ( currentFriction <= 0.0 ) {
////		return;
////	}
////
////	if ( af_useImpulseFriction.GetBool() || af_useJointImpulseFriction.GetBool() ) {
////
////		angular = this.body1.GetAngularVelocity();
////		invMass = this.body1.GetInverseMass();
////		if ( this.body2 ) {
////			angular -= this.body2.GetAngularVelocity();
////			invMass += this.body2.GetInverseMass();
////		}
////
////		angular *= currentFriction / invMass;
////
////		this.body1.SetAngularVelocity( this.body1.GetAngularVelocity() - angular * this.body1.GetInverseMass() );
////		if ( this.body2 ) {
////			this.body2.SetAngularVelocity( this.body2.GetAngularVelocity() + angular * this.body2.GetInverseMass() );
////		}
////	}
////	else {
////		if ( !this.fc ) {
////			this.fc = new idAFConstraint_UniversalJointFriction;
////			this.fc.Setup( this );
////		}
////
////		this.fc.Add( this.physics, invTimeStep );
////	}
////}
////
/////*
////================
////idAFConstraint_UniversalJoint::GetForce
////================
////*/
////void idAFConstraint_UniversalJoint::GetForce( body: idAFBody, idVec6 &force ) {
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
////	if ( !this.body2 ) {
////		this.anchor2 += translation;
////	}
////	if ( this.coneLimit ) {
////		this.coneLimit.Translate( translation );
////	}
////	else if ( this.pyramidLimit ) {
////		this.pyramidLimit.Translate( translation );
////	}
////}
////
/////*
////================
////idAFConstraint_UniversalJoint::Rotate
////================
////*/
////void idAFConstraint_UniversalJoint::Rotate( const idRotation &rotation ) {
////	if ( !this.body2 ) {
////		this.anchor2 *= rotation;
////		this.shaft2 *= rotation.ToMat3();
////		this.axis2 *= rotation.ToMat3();
////	}
////	if ( this.coneLimit ) {
////		this.coneLimit.Rotate( rotation );
////	}
////	else if ( this.pyramidLimit ) {
////		this.pyramidLimit.Rotate( rotation );
////	}
////}
////
/////*
////================
////idAFConstraint_UniversalJoint::GetCenter
////================
////*/
////void idAFConstraint_UniversalJoint::GetCenter( idVec3 &center ) {
////	center = this.body1.GetWorldOrigin() + this.anchor1 * this.body1.GetWorldAxis();
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
////	master = this.body2 ? this.body2 : this.physics.GetMasterBody();
////
////	a1.opEquals( this.body1.GetWorldOrigin() + this.anchor1 * this.body1.GetWorldAxis();
////	s1.opEquals( this.shaft1 * this.body1.GetWorldAxis();
////	d1.opEquals( this.axis1 * this.body1.GetWorldAxis();
////
////	if ( master ) {
////        a2.opEquals( master.GetWorldOrigin() + this.anchor2 * master.GetWorldAxis();
////		s2.opEquals( this.shaft2 * master.GetWorldAxis();
////		d2.opEquals( this.axis2 * master.GetWorldAxis();
////	}
////	else {
////        a2 .opEquals(  this.anchor2;
////		s2 .opEquals(  this.shaft2;
////		d2 .opEquals(  this.axis2;
////	}
////
////	v = s1.Cross( s2 );
////	if ( v.Normalize() != 0.0 ) {
////		idMat3 m1, m2;
////
////		m1[0] .opEquals(  s1;
////		m1[1] .opEquals(  v;
////		m1[2] .opEquals(  v.Cross( m1[0] );
////
////		m2[0] .opEquals(  -s2;
////		m2[1] .opEquals(  v;
////		m2[2] .opEquals(  v.Cross( m2[0] );
////
////		d2 *= m2.Transpose() * m1;
////	}
////
////	gameRenderWorld.DebugArrow( colorCyan, a1, a1 + s1 * 5.0, 1.0 );
////	gameRenderWorld.DebugArrow( colorBlue, a2, a2 + s2 * 5.0, 1.0 );
////	gameRenderWorld.DebugLine( colorGreen, a1, a1 + d1 * 5.0 );
////	gameRenderWorld.DebugLine( colorGreen, a2, a2 + d2 * 5.0 );
////
////	if ( af_showLimits.GetBool() ) {
////		if ( this.coneLimit ) {
////			this.coneLimit.DebugDraw();
////		}
////		if ( this.pyramidLimit ) {
////			this.pyramidLimit.DebugDraw();
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
////	saveFile.WriteVec3( this.anchor1 );
////	saveFile.WriteVec3( this.anchor2 );
////	saveFile.WriteVec3( this.shaft1 );
////	saveFile.WriteVec3( this.shaft2 );
////	saveFile.WriteVec3( this.axis1 );
////	saveFile.WriteVec3( this.axis2 );
////	saveFile.WriteFloat( this.friction );
////	if ( this.coneLimit ) {
////		this.coneLimit.Save( saveFile );
////	}
////	if ( this.pyramidLimit ) {
////		this.pyramidLimit.Save( saveFile );
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
////	saveFile.ReadVec3( this.anchor1 );
////	saveFile.ReadVec3( this.anchor2 );
////	saveFile.ReadVec3( this.shaft1 );
////	saveFile.ReadVec3( this.shaft2 );
////	saveFile.ReadVec3( this.axis1 );
////	saveFile.ReadVec3( this.axis2 );
////	saveFile.ReadFloat( this.friction );
////	if ( this.coneLimit ) {
////		this.coneLimit.Restore( saveFile );
////	}
////	if ( this.pyramidLimit ) {
////		this.pyramidLimit.Restore( saveFile );
////	}
////}
////
};

// universal joint friction
class idAFConstraint_UniversalJointFriction extends idAFConstraint {

////public:
////							idAFConstraint_UniversalJointFriction( );
////	void					Setup( idAFConstraint_UniversalJoint *cc );
////	bool					Add( idPhysics_AF *phys, float invTimeStep );
////	virtual void			Translate( const idVec3 &translation );
////	virtual void			Rotate( const idRotation &rotation );
////
////protected:
////	idAFConstraint_UniversalJoint *joint;			// universal joint
////
////protected:
////	virtual void			Evaluate( float invTimeStep );
////	virtual void			ApplyFriction( float invTimeStep );

	
/////*
////================
////idAFConstraint_UniversalJointFriction::idAFConstraint_UniversalJointFriction
////================
////*/
////idAFConstraint_UniversalJointFriction::idAFConstraint_UniversalJointFriction( ) {
////	this.type = constraintType_t.CONSTRAINT_FRICTION;
////	this.name .opEquals( "universalJointFriction");
////	this.InitSize( 2 );
////	joint = NULL;
////	this.fl.allowPrimary = false;
////	this.fl.frameConstraint = true;
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
////	this.body2 = uj.GetBody2();
////}
////
/////*
////================
////idAFConstraint_UniversalJointFriction::Evaluate
////================
////*/
////void idAFConstraint_UniversalJointFriction::Evaluate( /*float*/ invTimeStep:number ) {
////	// do nothing
////}
////
/////*
////================
////idAFConstraint_UniversalJointFriction::ApplyFriction
////================
////*/
////void idAFConstraint_UniversalJointFriction::ApplyFriction( /*float*/ invTimeStep:number ) {
////	// do nothing
////}
////
/////*
////================
////idAFConstraint_UniversalJointFriction::Add
////================
////*/
////bool idAFConstraint_UniversalJointFriction::Add( idPhysics_AF *phys, /*float*/ invTimeStep:number ) {
////	idVec3 s1, s2, dir1, dir2;
////	float f;
////
////	this.physics = phys;
////
////	f = joint.GetFriction() * joint.GetMultiplier().Length();
////	if ( f == 0.0 ) {
////		return false;
////	}
////
////	lo[0] = lo[1] = -f;
////	hi[0] = hi[1] = f;
////
////	joint.GetShafts( s1, s2 );
////
////	s1 *= this.body1.GetWorldAxis();
////	s1.NormalVectors( dir1, dir2 );
////
////	J1.SetSize( 2, 6 );
////	J1.SubVec6(0).SubVec3(0).Zero();
////	J1.SubVec6(0).SubVec3(1) = dir1;
////	J1.SubVec6(1).SubVec3(0).Zero();
////	J1.SubVec6(1).SubVec3(1) = dir2;
////
////	if ( this.body2 ) {
////
////		this.J2.SetSize( 2, 6 );
////		this.J2.SubVec6(0).SubVec3(0).Zero();
////		this.J2.SubVec6(0).SubVec3(1) = -dir1;
////		this.J2.SubVec6(1).SubVec3(0).Zero();
////		this.J2.SubVec6(1).SubVec3(1) = -dir2;
////	}
////
////	this.physics.AddFrameConstraint( this );
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
};

// cylindrical joint which allows 2 degrees of freedom
// constrains body1 to lie on a line relative to body2 and allows only translation along and rotation about the line
class idAFConstraint_CylindricalJoint extends idAFConstraint {
////
////public:
////							idAFConstraint_CylindricalJoint( name: idStr, body1: idAFBody, body2: idAFBody );
////	virtual void			DebugDraw( );
////	virtual void			Translate( const idVec3 &translation );
////	virtual void			Rotate( const idRotation &rotation );
////
////protected:
////
////protected:
////	virtual void			Evaluate( float invTimeStep );
////	virtual void			ApplyFriction( float invTimeStep );

	
/////*
////================
////idAFConstraint_CylindricalJoint::idAFConstraint_CylindricalJoint
////================
////*/
////idAFConstraint_CylindricalJoint::idAFConstraint_CylindricalJoint( name: idStr, body1: idAFBody, body2: idAFBody ) {
////	assert( 0 );	// FIXME: implement
////}
////
/////*
////================
////idAFConstraint_CylindricalJoint::Evaluate
////================
////*/
////void idAFConstraint_CylindricalJoint::Evaluate( /*float*/ invTimeStep:number ) {
////	assert( 0 );	// FIXME: implement
////}
////
/////*
////================
////idAFConstraint_CylindricalJoint::ApplyFriction
////================
////*/
////void idAFConstraint_CylindricalJoint::ApplyFriction( /*float*/ invTimeStep:number ) {
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
};

// hinge, revolute or pin joint which allows 1 degree of freedom
// constrains all motion of body1 relative to body2 except the rotation about the hinge axis
class idAFConstraint_Hinge extends idAFConstraint {
////
////public:
////							idAFConstraint_Hinge( name: idStr, body1: idAFBody, body2: idAFBody );
////							~idAFConstraint_Hinge( );
////	void					SetAnchor( const idVec3 &worldPosition );
////	idVec3					GetAnchor( ) const;
////	void					SetAxis( const idVec3 &axis );
////	void					GetAxis( idVec3 &a1, idVec3 &a2 ) const { a1 = this.axis1; a2 = this.axis2; }
////	idVec3					GetAxis( ) const;
////	void					SetNoLimit( );
////	void					SetLimit( const idVec3 &axis, const float angle, const idVec3 &body1Axis );
////	void					SetLimitEpsilon( const float e );
////	float					GetAngle( ) const;
////	void					SetSteerAngle( const float degrees );
////	void					SetSteerSpeed( const float speed );
    SetFriction( /*const float */f: number) { this.friction = f; }
////	float					GetFriction( ) const;
////	virtual void			DebugDraw( );
////	virtual void			GetForce( idAFBody *body, idVec6 &force );
////	virtual void			Translate( const idVec3 &translation );
////	virtual void			Rotate( const idRotation &rotation );
////	virtual void			GetCenter( idVec3 &center );
////	virtual void			Save( idSaveGame *saveFile ) const;
////	virtual void			Restore( idRestoreGame *saveFile );
////
////protected:
	anchor1 = new idVec3;					// anchor in body1 space
	anchor2 = new idVec3;					// anchor in body2 space
	axis1 = new idVec3;						// axis in body1 space
	axis2 = new idVec3;						// axis in body2 space
	initialAxis = new idMat3;				// initial axis of body1 relative to body2
	friction :number/*float*/;					// hinge friction
	coneLimit:idAFConstraint_ConeLimit;				// cone limit
	steering:idAFConstraint_HingeSteering;				// steering
	fc:idAFConstraint_HingeFriction;					// friction constraint
////
////protected:
////	virtual void			Evaluate( float invTimeStep );
////	virtual void			ApplyFriction( float invTimeStep );

	
/*
================
idAFConstraint_Hinge::idAFConstraint_Hinge
================
*/
    constructor(name: idStr, body1: idAFBody, body2: idAFBody) {
        super ( );
        assert( body1 );
        this.type = constraintType_t.CONSTRAINT_HINGE;
        this.name.opEquals( name );
        this.body1 = body1;
        this.body2 = body2;
        this.InitSize( 5 );
        this.coneLimit = null;
        this.steering = null;
        this.friction = 0.0;
        this.fc = null;
        this.fl.allowPrimary = true;
        this.fl.noCollision = true;
        this.initialAxis.opEquals( body1.GetWorldAxis ( ) );
        if ( this.body2 ) {
            this.initialAxis.opMultiplicationAssignment( this.body2.GetWorldAxis ( ).Transpose ( ) );
        }
    }
////
/////*
////================
////idAFConstraint_Hinge::~idAFConstraint_Hinge
////================
////*/
////idAFConstraint_Hinge::~idAFConstraint_Hinge( ) {
////	if ( this.coneLimit ) {
////		delete this.coneLimit;
////	}
////	if ( this.fc ) {
////		delete this.fc;
////	}
////	if ( steering ) {
////		delete steering;
////	}
////}

/*
================
idAFConstraint_Hinge::SetAnchor
================
*/
    SetAnchor ( worldPosition: idVec3 ): void {
        // get anchor relative to center of mass of body1
        this.anchor1.opEquals( ( idMat3.opMultiplication_VecMat( worldPosition.opSubtraction( this.body1.GetWorldOrigin ( ) ), this.body1.GetWorldAxis ( ).Transpose ( ) ) ) );
        if ( this.body2 ) {
            // get anchor relative to center of mass of body2
            this.anchor2.opEquals( idMat3.opMultiplication_VecMat( ( worldPosition.opSubtraction( this.body2.GetWorldOrigin ( ) ) ), this.body2.GetWorldAxis ( ).Transpose ( ) ) );
        } else {
            this.anchor2.opEquals( worldPosition );
        }

        if ( this.coneLimit ) {
            this.coneLimit.SetAnchor( this.anchor2 );
        }
    }

/////*
////================
////idAFConstraint_Hinge::GetAnchor
////================
////*/
////idVec3 idAFConstraint_Hinge::GetAnchor( ) const {
////	if ( this.body2 ) {
////		return this.body2.GetWorldOrigin() + this.body2.GetWorldAxis() * this.anchor2;
////	}
////	return this.anchor2;
////}
////
/*
================
idAFConstraint_Hinge::SetAxis
================
*/
    SetAxis ( axis: idVec3 ): void {
        var normAxis = new idVec3;

        normAxis.opEquals( axis );
        normAxis.Normalize ( );

        // get axis relative to body1
        this.axis1.opEquals( idMat3.opMultiplication_VecMat( normAxis, this.body1.GetWorldAxis ( ).Transpose ( ) ) );
        if ( this.body2 ) {
            // get axis relative to body2
            this.axis2.opEquals( idMat3.opMultiplication_VecMat( normAxis, this.body2.GetWorldAxis ( ).Transpose ( ) ) );
        } else {
            this.axis2.opEquals( normAxis );
        }
    }

/*
================
idAFConstraint_Hinge::GetAxis
================
*/
    GetAxis ( ): idVec3 {
        if ( this.body2 ) {
            return this.axis2.timesFloat( this.body2.GetWorldAxis ( ) );
        }
        return this.axis2;
    }

/*
================
idAFConstraint_Hinge::SetNoLimit
================
*/
    SetNoLimit ( ): void {
        if ( this.coneLimit ) {
            $delete( this.coneLimit );
            this.coneLimit = null;
        }
    }

/////*
////================
////idAFConstraint_Hinge::SetLimit
////================
////*/
////void idAFConstraint_Hinge::SetLimit( const idVec3 &axis, const float angle, const idVec3 &body1Axis ) {
////	if ( !this.coneLimit ) {
////		this.coneLimit = new idAFConstraint_ConeLimit;
////		this.coneLimit.SetPhysics( this.physics );
////	}
////	if ( this.body2 ) {
////		this.coneLimit.Setup( this.body1, this.body2, this.anchor2, axis * this.body2.GetWorldAxis().Transpose(), angle, body1Axis * this.body1.GetWorldAxis().Transpose() );
////	}
////	else {
////		this.coneLimit.Setup( this.body1, this.body2, this.anchor2, axis, angle, body1Axis * this.body1.GetWorldAxis().Transpose() );
////	}
////}
////
/////*
////================
////idAFConstraint_Hinge::SetLimitEpsilon
////================
////*/
////void idAFConstraint_Hinge::SetLimitEpsilon( const float e ) {
////	if ( this.coneLimit ) {
////		this.coneLimit.SetEpsilon( e );
////	}
////}
////
/////*
////================
////idAFConstraint_Hinge::GetFriction
////================
////*/
////float idAFConstraint_Hinge::GetFriction( ) const {
////	if ( af_forceFriction.GetFloat() > 0.0 ) {
////		return af_forceFriction.GetFloat();
////	}
////	return this.friction * this.physics.GetJointFrictionScale();
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
////	axis = this.body1.GetWorldAxis() * this.body2.GetWorldAxis().Transpose() * this.initialAxis.Transpose();
////	rotation = axis.ToRotation();
////	angle = rotation.GetAngle();
////	if ( rotation.GetVec() * this.axis1 < 0.0 ) {
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
////	if ( this.coneLimit ) {
////		delete this.coneLimit;
////		this.coneLimit = NULL;
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
////void idAFConstraint_Hinge::Evaluate( /*float*/ invTimeStep:number ) {
////	idVec3 a1, a2;
////	idVec3 x1, x2, cross;
////	idVec3 vecX, vecY;
////	idAFBody *master;
////
////	master = this.body2 ? this.body2 : this.physics.GetMasterBody();
////
////	x1 = this.axis1 * this.body1.GetWorldAxis();		// axis in body1 space
////	x1.OrthogonalBasis( vecX, vecY );				// basis for axis in body1 space
////
////	a1 = this.anchor1 * this.body1.GetWorldAxis();	// anchor in body1 space
////
////	if ( master ) {
////		a2 = this.anchor2 * master.GetWorldAxis();	// anchor in master space
////		x2 = this.axis2 * master.GetWorldAxis();
////		c1.SubVec3(0) = -( invTimeStep * ERROR_REDUCTION ) * ( a2 + master.GetWorldOrigin() - ( a1 + this.body1.GetWorldOrigin() ) );
////	}
////	else {
////		a2 = this.anchor2;
////		x2 = this.axis2;
////		c1.SubVec3(0) = -( invTimeStep * ERROR_REDUCTION ) * ( a2 - ( a1 + this.body1.GetWorldOrigin() ) );
////	}
////
////	J1.Set(	mat3_identity,	-SkewSymmetric( a1 ),
////				mat3_zero,		idMat3(	vecX[0], vecX[1], vecX[2],
////										vecY[0], vecY[1], vecY[2],
////										0.0, 0.0, 0.0 ) );
////	J1.SetSize( 5, 6 );
////
////	if ( this.body2 ) {
////		this.J2.Set(	-mat3_identity,	SkewSymmetric( a2 ),
////					mat3_zero,		idMat3(	-vecX[0], -vecX[1], -vecX[2],
////											-vecY[0], -vecY[1], -vecY[2],
////											0.0, 0.0, 0.0 ) );
////		this.J2.SetSize( 5, 6 );
////	}
////	else {
////		this.J2.Zero( 5, 6 );
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
////		steering.Add( this.physics, invTimeStep );
////	}
////	else if ( this.coneLimit ) {
////		this.coneLimit.Add( this.physics, invTimeStep );
////	}
////}
////
/////*
////================
////idAFConstraint_Hinge::ApplyFriction
////================
////*/
////void idAFConstraint_Hinge::ApplyFriction( /*float*/ invTimeStep:number ) {
////	idVec3 angular;
////	float invMass, currentFriction;
////
////	currentFriction = GetFriction();
////
////	if ( currentFriction <= 0.0 ) {
////		return;
////	}
////
////	if ( af_useImpulseFriction.GetBool() || af_useJointImpulseFriction.GetBool() ) {
////
////		angular = this.body1.GetAngularVelocity();
////		invMass = this.body1.GetInverseMass();
////		if ( this.body2 ) {
////			angular -= this.body2.GetAngularVelocity();
////			invMass += this.body2.GetInverseMass();
////		}
////
////		angular *= currentFriction / invMass;
////
////		body1.SetAngularVelocity( this.body1.GetAngularVelocity() - angular * this.body1.GetInverseMass() );
////		if ( this.body2 ) {
////			this.body2.SetAngularVelocity( this.body2.GetAngularVelocity() + angular * this.body2.GetInverseMass() );
////		}
////	}
////	else {
////		if ( !this.fc ) {
////			this.fc = new idAFConstraint_HingeFriction;
////			this.fc.Setup( this );
////		}
////
////		this.fc.Add( this.physics, invTimeStep );
////	}
////}
////
/////*
////================
////idAFConstraint_Hinge::GetForce
////================
////*/
////void idAFConstraint_Hinge::GetForce( body: idAFBody, idVec6 &force ) {
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
////	if ( !this.body2 ) {
////		this.anchor2 += translation;
////	}
////	if ( this.coneLimit ) {
////		this.coneLimit.Translate( translation );
////	}
////}
////
/////*
////================
////idAFConstraint_Hinge::Rotate
////================
////*/
////void idAFConstraint_Hinge::Rotate( const idRotation &rotation ) {
////	if ( !this.body2 ) {
////		this.anchor2 *= rotation;
////		this.axis2 *= rotation.ToMat3();
////	}
////	if ( this.coneLimit ) {
////		this.coneLimit.Rotate( rotation );
////	}
////}
////
/////*
////================
////idAFConstraint_Hinge::GetCenter
////================
////*/
////void idAFConstraint_Hinge::GetCenter( idVec3 &center ) {
////	center = this.body1.GetWorldOrigin() + this.anchor1 * this.body1.GetWorldAxis();
////}
////
/////*
////================
////idAFConstraint_Hinge::DebugDraw
////================
////*/
////void idAFConstraint_Hinge::DebugDraw( ) {
////	idVec3 vecX, vecY;
////	idVec3 a1 = this.body1.GetWorldOrigin() + this.anchor1 * this.body1.GetWorldAxis();
////	idVec3 x1 = this.axis1 * this.body1.GetWorldAxis();
////	x1.OrthogonalBasis( vecX, vecY );
////
////	gameRenderWorld.DebugArrow( colorBlue, a1 - 4.0 * x1, a1 + 4.0 * x1, 1 );
////	gameRenderWorld.DebugLine( colorBlue, a1 - 2.0 * vecX, a1 + 2.0 * vecX );
////	gameRenderWorld.DebugLine( colorBlue, a1 - 2.0 * vecY, a1 + 2.0 * vecY );
////
////	if ( af_showLimits.GetBool() ) {
////		if ( this.coneLimit ) {
////			this.coneLimit.DebugDraw();
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
////	saveFile.WriteVec3( this.anchor1 );
////	saveFile.WriteVec3( this.anchor2 );
////	saveFile.WriteVec3( this.axis1 );
////	saveFile.WriteVec3( this.axis2 );
////	saveFile.WriteMat3( this.initialAxis );
////	saveFile.WriteFloat( this.friction );
////	if ( this.coneLimit ) {
////		saveFile.WriteBool( true );
////		this.coneLimit.Save( saveFile );
////	} else {
////		saveFile.WriteBool( false );
////	}
////	if ( steering ) {
////		saveFile.WriteBool( true );
////		steering.Save( saveFile );
////	} else {
////		saveFile.WriteBool( false );
////	}
////	if ( this.fc ) {
////		saveFile.WriteBool( true );
////		this.fc.Save( saveFile );
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
////	saveFile.ReadVec3( this.anchor1 );
////	saveFile.ReadVec3( this.anchor2 );
////	saveFile.ReadVec3( this.axis1 );
////	saveFile.ReadVec3( this.axis2 );
////	saveFile.ReadMat3( this.initialAxis );
////	saveFile.ReadFloat( this.friction );
////
////	saveFile.ReadBool( b );
////	if ( b ) {
////		if ( !this.coneLimit ) {
////			this.coneLimit = new idAFConstraint_ConeLimit;
////		}
////		this.coneLimit.SetPhysics( this.physics );
////		this.coneLimit.Restore( saveFile );
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
////		if ( !this.fc ) {
////			this.fc = new idAFConstraint_HingeFriction;
////		}
////		this.fc.Setup( this );
////		this.fc.Restore( saveFile );
////	}
////}
////
////
};

// hinge joint friction
class idAFConstraint_HingeFriction extends idAFConstraint {
////
////public:
////							idAFConstraint_HingeFriction( );
////	void					Setup( idAFConstraint_Hinge *cc );
////	bool					Add( idPhysics_AF *phys, float invTimeStep );
////	virtual void			Translate( const idVec3 &translation );
////	virtual void			Rotate( const idRotation &rotation );
////
////protected:
////	idAFConstraint_Hinge *	hinge;						// hinge
////
////protected:
////	virtual void			Evaluate( float invTimeStep );
////	virtual void			ApplyFriction( float invTimeStep );

	
/////*
////================
////idAFConstraint_HingeFriction::idAFConstraint_HingeFriction
////================
////*/
////idAFConstraint_HingeFriction::idAFConstraint_HingeFriction( ) {
////	this.type = constraintType_t.CONSTRAINT_FRICTION;
////	this.name .opEquals( "hingeFriction");
////	this.InitSize( 1 );
////	hinge = NULL;
////	this.fl.allowPrimary = false;
////	this.fl.frameConstraint = true;
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
////	this.body2 = h.GetBody2();
////}
////
/////*
////================
////idAFConstraint_HingeFriction::Evaluate
////================
////*/
////void idAFConstraint_HingeFriction::Evaluate( /*float*/ invTimeStep:number ) {
////	// do nothing
////}
////
/////*
////================
////idAFConstraint_HingeFriction::ApplyFriction
////================
////*/
////void idAFConstraint_HingeFriction::ApplyFriction( /*float*/ invTimeStep:number ) {
////	// do nothing
////}
////
/////*
////================
////idAFConstraint_HingeFriction::Add
////================
////*/
////bool idAFConstraint_HingeFriction::Add( idPhysics_AF *phys, /*float*/ invTimeStep:number ) {
////	idVec3 a1, a2;
////	float f;
////
////	this.physics = phys;
////
////	f = hinge.GetFriction() * hinge.GetMultiplier().Length();
////	if ( f == 0.0 ) {
////		return false;
////	}
////
////	lo[0] = -f;
////	hi[0] = f;
////
////	hinge.GetAxis( a1, a2 );
////
////	a1 *= this.body1.GetWorldAxis();
////
////	J1.SetSize( 1, 6 );
////	J1.SubVec6(0).SubVec3(0).Zero();
////	J1.SubVec6(0).SubVec3(1) = a1;
////
////	if ( this.body2 ) {
////		a2 *= this.body2.GetWorldAxis();
////
////		this.J2.SetSize( 1, 6 );
////		this.J2.SubVec6(0).SubVec3(0).Zero();
////		this.J2.SubVec6(0).SubVec3(1) = -a2;
////	}
////
////	this.physics.AddFrameConstraint( this );
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
};

// constrains two bodies attached to each other with a hinge to get a specified relative orientation
class idAFConstraint_HingeSteering extends idAFConstraint {
////
////public:
////							idAFConstraint_HingeSteering( );
////	void					Setup( idAFConstraint_Hinge *cc );
////	void					SetSteerAngle( const float degrees ) { steerAngle = degrees; }
////	void					SetSteerSpeed( const float speed ) { steerSpeed = speed; }
////	void					SetEpsilon( const float e ) { epsilon = e; }
////	bool					Add( idPhysics_AF *phys, float invTimeStep );
////	virtual void			Translate( const idVec3 &translation );
////	virtual void			Rotate( const idRotation &rotation );
////
////	virtual void			Save( idSaveGame *saveFile ) const;
////	virtual void			Restore( idRestoreGame *saveFile );
////
////protected:
////	idAFConstraint_Hinge *	hinge;						// hinge
	steerAngle :number/*float*/;					// desired steer angle in degrees
	steerSpeed :number/*float*/;					// steer speed
	epsilon: number /*float*/;					// lcp epsilon
////
////protected:
////	virtual void			Evaluate( float invTimeStep );
////	virtual void			ApplyFriction( float invTimeStep );

	
/////*
////================
////idAFConstraint_HingeSteering::idAFConstraint_HingeSteering
////================
////*/
////idAFConstraint_HingeSteering::idAFConstraint_HingeSteering( ) {
////	this.type = constraintType_t.CONSTRAINT_HINGESTEERING;
////	this.name .opEquals( "hingeFriction");
////	this.InitSize( 1 );
////	hinge = NULL;
////	this.fl.allowPrimary = false;
////	this.fl.frameConstraint = true;
////	steerSpeed = 0.0;
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
////	this.body2 = h.GetBody2();
////}
////
/////*
////================
////idAFConstraint_HingeSteering::Evaluate
////================
////*/
////void idAFConstraint_HingeSteering::Evaluate( /*float*/ invTimeStep:number ) {
////	// do nothing
////}
////
/////*
////================
////idAFConstraint_HingeSteering::ApplyFriction
////================
////*/
////void idAFConstraint_HingeSteering::ApplyFriction( /*float*/ invTimeStep:number ) {
////	// do nothing
////}
////
/////*
////================
////idAFConstraint_HingeSteering::Add
////================
////*/
////bool idAFConstraint_HingeSteering::Add( idPhysics_AF *phys, /*float*/ invTimeStep:number ) {
////	float angle, speed;
////	idVec3 a1, a2;
////
////	this.physics = phys;
////
////	hinge.GetAxis( a1, a2 );
////	angle = hinge.GetAngle();
////
////	a1 *= this.body1.GetWorldAxis();
////
////	J1.SetSize( 1, 6 );
////	J1.SubVec6(0).SubVec3(0).Zero();
////	J1.SubVec6(0).SubVec3(1) = a1;
////
////	if ( this.body2 ) {
////		a2 *= this.body2.GetWorldAxis();
////
////		this.J2.SetSize( 1, 6 );
////		this.J2.SubVec6(0).SubVec3(0).Zero();
////		this.J2.SubVec6(0).SubVec3(1) = -a2;
////	}
////
////	speed = steerAngle - angle;
////	if ( steerSpeed != 0.0 ) {
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
////	this.physics.AddFrameConstraint( this );
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
};

// slider, prismatic or translational constraint which allows 1 degree of freedom
// constrains body1 to lie on a line relative to body2, the orientation is also fixed relative to body2
class idAFConstraint_Slider extends idAFConstraint {
////
////public:
////							idAFConstraint_Slider( name: idStr, body1: idAFBody, body2: idAFBody );
////	void					SetAxis( const idVec3 &ax );
////	virtual void			DebugDraw( );
////	virtual void			Translate( const idVec3 &translation );
////	virtual void			Rotate( const idRotation &rotation );
////	virtual void			GetCenter( idVec3 &center );
////	virtual void			Save( idSaveGame *saveFile ) const;
////	virtual void			Restore( idRestoreGame *saveFile );
////
////protected:
    axis = new idVec3; // axis along which body1 slides in body2 space
    offset = new idVec3; // offset of body1 relative to body2
    relAxis = new idMat3; // rotation of body1 relative to body2
////
////protected:
////	virtual void			Evaluate( float invTimeStep );
////	virtual void			ApplyFriction( float invTimeStep );


/*
================
idAFConstraint_Slider::idAFConstraint_Slider
================
*/
    constructor ( name: idStr, body1: idAFBody, body2: idAFBody ) {
        super ( );
        assert( body1 );
        this.type = constraintType_t.CONSTRAINT_SLIDER;
        this.name.opEquals( name );
        this.body1 = body1;
        this.body2 = body2;
        this.InitSize( 5 );
        this.fl.allowPrimary = true;
        this.fl.noCollision = true;

        if ( body2 ) {
            this.offset.opEquals( idMat3.opMultiplication_VecMat( ( body1.GetWorldOrigin ( ).opSubtraction( body2.GetWorldOrigin ( ) ) ), body1.GetWorldAxis ( ).Transpose ( ) ) );
            this.relAxis.opEquals( body1.GetWorldAxis ( ) .opMultiplication( body2.GetWorldAxis ( ).Transpose ( )));
        } else {
            this.offset.opEquals(body1.GetWorldOrigin ( ));
            this.relAxis.opEquals( body1.GetWorldAxis ( ));
        }
    }

/*
================
idAFConstraint_Slider::SetAxis
================
*/
    SetAxis ( ax: idVec3 ): void {
        var normAxis = new idVec3;

        // get normalized axis relative to body1
        normAxis.opEquals( ax );
        normAxis.Normalize ( );
        if ( this.body2 ) {
            this.axis.opEquals( idMat3.opMultiplication_VecMat( normAxis, this.body2.GetWorldAxis ( ).Transpose ( ) ) );
        } else {
            this.axis.opEquals( normAxis );
        }
    }

/////*
////================
////idAFConstraint_Slider::Evaluate
////================
////*/
////void idAFConstraint_Slider::Evaluate( /*float*/ invTimeStep:number ) {
////	idVec3 vecX, vecY, ofs;
////	idRotation r;
////	idAFBody *master;
////
////	master = this.body2 ? this.body2 : this.physics.GetMasterBody();
////
////	if ( master ) {
////		(this.axis * master.GetWorldAxis()).OrthogonalBasis( vecX, vecY );
////		ofs = master.GetWorldOrigin() + master.GetWorldAxis() * this.offset - this.body1.GetWorldOrigin();
////		r = ( this.body1.GetWorldAxis().Transpose() * (this.relAxis * master.GetWorldAxis()) ).ToRotation();
////	}
////	else {
////		this.axis.OrthogonalBasis( vecX, vecY );
////		ofs = this.offset - this.body1.GetWorldOrigin();
////		r = ( this.body1.GetWorldAxis().Transpose() * this.relAxis ).ToRotation();
////	}
////
////	J1.Set(	mat3_zero, mat3_identity,
////			idMat3( vecX, vecY, vec3_origin ), mat3_zero );
////	J1.SetSize( 5, 6 );
////
////	if ( this.body2 ) {
////
////		this.J2.Set(	mat3_zero, -mat3_identity,
////				idMat3( -vecX, -vecY, vec3_origin ), mat3_zero );
////		this.J2.SetSize( 5, 6 );
////	}
////	else {
////		this.J2.Zero( 5, 6 );
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
////void idAFConstraint_Slider::ApplyFriction( /*float*/ invTimeStep:number ) {
////	// no friction
////}
////
/////*
////================
////idAFConstraint_Slider::Translate
////================
////*/
////void idAFConstraint_Slider::Translate( const idVec3 &translation ) {
////	if ( !this.body2 ) {
////		this.offset += translation;
////	}
////}
////
/////*
////================
////idAFConstraint_Slider::Rotate
////================
////*/
////void idAFConstraint_Slider::Rotate( const idRotation &rotation ) {
////	if ( !this.body2 ) {
////		this.offset *= rotation;
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
////	master = this.body2 ? this.body2 : this.physics.GetMasterBody();
////	if ( master ) {
////		center = master.GetWorldOrigin() + master.GetWorldAxis() * this.offset - this.body1.GetWorldOrigin();
////	}
////	else {
////		center = this.offset - this.body1.GetWorldOrigin();
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
////	master = this.body2 ? this.body2 : this.physics.GetMasterBody();
////	if ( master ) {
////		ofs = master.GetWorldOrigin() + master.GetWorldAxis() * this.offset - this.body1.GetWorldOrigin();
////	}
////	else {
////		ofs = this.offset - this.body1.GetWorldOrigin();
////	}
////	gameRenderWorld.DebugLine( colorGreen, ofs, ofs + this.axis * this.body1.GetWorldAxis() );
////}
////
/////*
////================
////idAFConstraint_Slider::Save
////================
////*/
////void idAFConstraint_Slider::Save( idSaveGame *saveFile ) const {
////	idAFConstraint::Save( saveFile );
////	saveFile.WriteVec3( this.axis );
////	saveFile.WriteVec3( this.offset );
////	saveFile.WriteMat3( this.relAxis );
////}
////
/////*
////================
////idAFConstraint_Slider::Restore
////================
////*/
////void idAFConstraint_Slider::Restore( idRestoreGame *saveFile ) {
////	idAFConstraint::Restore( saveFile );
////	saveFile.ReadVec3( this.axis );
////	saveFile.ReadVec3( this.offset );
////	saveFile.ReadMat3( this.relAxis );
////}
////
////
}

// line constraint which allows 4 degrees of freedom
// constrains body1 to lie on a line relative to body2, does not constrain the orientation.
class idAFConstraint_Line extends idAFConstraint {
////
////public:
////							idAFConstraint_Line( name: idStr, body1: idAFBody, body2: idAFBody );
////	virtual void			DebugDraw( );
////	virtual void			Translate( const idVec3 &translation );
////	virtual void			Rotate( const idRotation &rotation );
////
////protected:
////
////protected:
////	virtual void			Evaluate( float invTimeStep );
////	virtual void			ApplyFriction( float invTimeStep );

	
/////*
////================
////idAFConstraint_Line::idAFConstraint_Line
////================
////*/
////idAFConstraint_Line::idAFConstraint_Line( name: idStr, body1: idAFBody, body2: idAFBody ) {
////	assert( 0 );	// FIXME: implement
////}
////
/////*
////================
////idAFConstraint_Line::Evaluate
////================
////*/
////void idAFConstraint_Line::Evaluate( /*float*/ invTimeStep:number ) {
////	assert( 0 );	// FIXME: implement
////}
////
/////*
////================
////idAFConstraint_Line::ApplyFriction
////================
////*/
////void idAFConstraint_Line::ApplyFriction( /*float*/ invTimeStep:number ) {
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
};

// plane constraint which allows 5 degrees of freedom
// constrains body1 to lie in a plane relative to body2, does not constrain the orientation.
class idAFConstraint_Plane extends idAFConstraint {
////
////public:
////							idAFConstraint_Plane( name: idStr, body1: idAFBody, body2: idAFBody );
////	void					SetPlane( const idVec3 &normal, const idVec3 &anchor );
////	virtual void			DebugDraw( );
////	virtual void			Translate( const idVec3 &translation );
////	virtual void			Rotate( const idRotation &rotation );
////	virtual void			Save( idSaveGame *saveFile ) const;
////	virtual void			Restore( idRestoreGame *saveFile );
////
////protected:
	anchor1 = new idVec3;					// anchor in body1 space
	anchor2 = new idVec3;					// anchor in body2 space
    planeNormal = new idVec3;				// plane normal in body2 space
////
////protected:
////	virtual void			Evaluate( float invTimeStep );
////	virtual void			ApplyFriction( float invTimeStep );
	
/////*
////================
////idAFConstraint_Plane::idAFConstraint_Plane
////================
////*/
////idAFConstraint_Plane::idAFConstraint_Plane( name: idStr, body1: idAFBody, body2: idAFBody ) {
////	assert( body1 );
////	this.type = constraintType_t.CONSTRAINT_PLANE;
////	this.name .opEquals( name);
////	this.body1 = body1;
////	this.body2 = body2;
////	this.InitSize( 1 );
////	this.fl.allowPrimary = true;
////	this.fl.noCollision = true;
////}
////
/////*
////================
////idAFConstraint_Plane::SetPlane
////================
////*/
////void idAFConstraint_Plane::SetPlane( const idVec3 &normal, const idVec3 &anchor ) {
////	// get anchor relative to center of mass of body1
////	this.anchor1 .opEquals( ( anchor - body1.GetWorldOrigin() ) * body1.GetWorldAxis().Transpose();
////	if ( this.body2 ) {
////		// get anchor relative to center of mass of body2
////		this.anchor2 .opEquals( ( anchor - this.body2.GetWorldOrigin() ) * this.body2.GetWorldAxis().Transpose();
////		planeNormal = normal * this.body2.GetWorldAxis().Transpose();
////	}
////	else {
////		this.anchor2 .opEquals( anchor;
////		planeNormal = normal;
////	}
////}
////
/////*
////================
////idAFConstraint_Plane::Evaluate
////================
////*/
////void idAFConstraint_Plane::Evaluate( /*float*/ invTimeStep:number ) {
////	idVec3 a1, a2, normal, p;
////	idVec6 v;
////	idAFBody *master;
////
////	master = this.body2 ? this.body2 : this.physics.GetMasterBody();
////
////	a1 = this.body1.GetWorldOrigin() + this.anchor1 * this.body1.GetWorldAxis();
////	if ( master ) {
////		a2 = master.GetWorldOrigin() + this.anchor2 * master.GetWorldAxis();
////		normal = planeNormal * master.GetWorldAxis();
////	}
////	else {
////		a2 = this.anchor2;
////		normal = planeNormal;
////	}
////
////	p = a1 - this.body1.GetWorldOrigin();
////	v.SubVec3(0) = normal;
////	v.SubVec3(1) = p.Cross( normal );
////	J1.Set( 1, 6, v.ToFloatPtr() );
////
////	if ( this.body2 ) {
////		p = a1 - this.body2.GetWorldOrigin();
////		v.SubVec3(0) = -normal;
////		v.SubVec3(1) = p.Cross( -normal );
////		this.J2.Set( 1, 6, v.ToFloatPtr() );
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
////void idAFConstraint_Plane::ApplyFriction( /*float*/ invTimeStep:number ) {
////	// no friction
////}
////
/////*
////================
////idAFConstraint_Plane::Translate
////================
////*/
////void idAFConstraint_Plane::Translate( const idVec3 &translation ) {
////	if ( !this.body2 ) {
////		this.anchor2 += translation;
////	}
////}
////
/////*
////================
////idAFConstraint_Plane::Rotate
////================
////*/
////void idAFConstraint_Plane::Rotate( const idRotation &rotation ) {
////	if ( !this.body2 ) {
////		this.anchor2 *= rotation;
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
////	master = this.body2 ? this.body2 : this.physics.GetMasterBody();
////
////	a1 = this.body1.GetWorldOrigin() + this.anchor1 * this.body1.GetWorldAxis();
////	if ( master ) {
////		normal = planeNormal * master.GetWorldAxis();
////	}
////	else {
////		normal = planeNormal;
////	}
////	normal.NormalVectors( right, up );
////	normal *= 4.0;
////	right *= 4.0;
////	up *= 4.0;
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
////	saveFile.WriteVec3( this.anchor1 );
////	saveFile.WriteVec3( this.anchor2 );
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
////	saveFile.ReadVec3( this.anchor1 );
////	saveFile.ReadVec3( this.anchor2 );
////	saveFile.ReadVec3( planeNormal );
////}
////
};

// spring constraint which allows 6 or 5 degrees of freedom based on the spring limits
// constrains body1 relative to body2 with a spring
class idAFConstraint_Spring extends idAFConstraint {
////
////public:
////							idAFConstraint_Spring( name: idStr, body1: idAFBody, body2: idAFBody );
////	void					SetAnchor( const idVec3 &worldAnchor1, const idVec3 &worldAnchor2 );
////	void					SetSpring( const float stretch, const float compress, const float damping, const float restLength );
////	void					SetLimit( const float minLength, const float maxLength );
////	virtual void			DebugDraw( );
////	virtual void			Translate( const idVec3 &translation );
////	virtual void			Rotate( const idRotation &rotation );
////	virtual void			GetCenter( idVec3 &center );
////	virtual void			Save( idSaveGame *saveFile ) const;
////	virtual void			Restore( idRestoreGame *saveFile );
////
////protected:
	anchor1 = new idVec3;					// anchor in body1 space
	anchor2 = new idVec3;					// anchor in body2 space
    kstretch:number/*float*/;					// spring constant when stretched
    kcompress:number/*float*/;					// spring constant when compressed
    damping:number/*float*/;					// spring damping
    restLength:number/*float*/;					// rest length of spring
    minLength:number/*float*/;					// minimum spring length
    maxLength:number/*float*/;					// maximum spring length
////
////protected:
////	virtual void			Evaluate( float invTimeStep );
////	virtual void			ApplyFriction( float invTimeStep );
	
/*
================
idAFConstraint_Spring::idAFConstraint_Spring
================
*/
    constructor ( name: idStr, body1: idAFBody, body2: idAFBody ) {
        super();
        assert( body1 );
        this.type = constraintType_t.CONSTRAINT_SPRING;
        this.name.opEquals( name );
        this.body1 = body1;
        this.body2 = body2;
        this.InitSize( 1 );
        this.fl.allowPrimary = false;
        this.kstretch = this.kcompress = this.damping = 1.0;
        this.minLength = this.maxLength = this.restLength = 0.0;
    }

/*
================
idAFConstraint_Spring::SetAnchor
================
*/
    SetAnchor ( worldAnchor1: idVec3, worldAnchor2: idVec3 ): void {
        // get anchor relative to center of mass of body1
        this.anchor1.opEquals( idMat3.opMultiplication_VecMat( worldAnchor1.opSubtraction( this.body1.GetWorldOrigin ( ) ), this.body1.GetWorldAxis ( ).Transpose ( ) ) );
        if ( this.body2 ) {
            // get anchor relative to center of mass of body2
            this.anchor2.opEquals( idMat3.opMultiplication_VecMat( ( worldAnchor2.opSubtraction( this.body2.GetWorldOrigin ( ) ) ), this.body2.GetWorldAxis ( ).Transpose ( ) ) );
        } else {
            this.anchor2.opEquals( worldAnchor2 );
        }
    }

/*
================
idAFConstraint_Spring::SetSpring
================
*/
    SetSpring ( /* float */stretch: number, /*float */compress: number, /*float */damping: number, /*float */restLength: number ): void {
        assert( stretch >= 0.0 && compress >= 0.0 && restLength >= 0.0 );
        this.kstretch = stretch;
        this.kcompress = compress;
        this.damping = damping;
        this.restLength = restLength;
    }

/*
================
idAFConstraint_Spring::SetLimit
================
*/
    SetLimit ( /*float */minLength: number, /*float */maxLength: number ): void {
        assert( minLength >= 0.0 && maxLength >= 0.0 && maxLength >= minLength );
        this.minLength = minLength;
        this.maxLength = maxLength;
    }

/////*
////================
////idAFConstraint_Spring::Evaluate
////================
////*/
////void idAFConstraint_Spring::Evaluate( /*float*/ invTimeStep:number ) {
////	idVec3 a1, a2, velocity1, velocity2, force;
////	idVec6 v1, v2;
////	float d, dampingForce, length, error;
////	bool limit;
////	idAFBody *master;
////
////	master = this.body2 ? this.body2 : this.physics.GetMasterBody();
////
////	a1 = this.body1.GetWorldOrigin() + this.anchor1 * this.body1.GetWorldAxis();
////	velocity1 = this.body1.GetPointVelocity( a1 );
////
////	if ( master ) {
////		a2 = master.GetWorldOrigin() + this.anchor2 * master.GetWorldAxis();
////		velocity2 = master.GetPointVelocity( a2 );
////	}
////	else {
////		a2 = this.anchor2;
////		velocity2.Zero();
////	}
////
////	force = a2 - a1;
////	d = force * force;
////	if ( d != 0.0 ) {
////		dampingForce = damping * idMath::Fabs( (velocity2 - velocity1) * force ) / d;
////	}
////	else {
////		dampingForce = 0.0;
////	}
////	length = force.Normalize();
////
////	if ( length > restLength ) {
////		if ( kstretch > 0.0 ) {
////			idVec3 springForce = force * ( Square( length - restLength ) * kstretch - dampingForce );
////			body1.AddForce( a1, springForce );
////			if ( master ) {
////				master.AddForce( a2, -springForce );
////			}
////		}
////	}
////	else {
////		if ( kcompress > 0.0 ) {
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
////	else if ( maxLength > 0.0 && length > maxLength ) {
////		error = length - maxLength;
////		limit = true;
////	}
////	else {
////		error = 0.0;
////		limit = false;
////	}
////
////	if ( limit ) {
////		a1 -= this.body1.GetWorldOrigin();
////		v1.SubVec3(0) = force;
////		v1.SubVec3(1) = a1.Cross( force );
////		J1.Set( 1, 6, v1.ToFloatPtr() );
////		if ( this.body2 ) {
////			a2 -= this.body2.GetWorldOrigin();
////			v2.SubVec3(0) = -force;
////			v2.SubVec3(1) = a2.Cross( -force );
////			this.J2.Set( 1, 6, v2.ToFloatPtr() );
////		}
////		c1[0] = -( invTimeStep * ERROR_REDUCTION ) * error;
////		lo[0] = 0.0;
////	}
////	else {
////		J1.Zero( 0, 0 );
////		this.J2.Zero( 0, 0 );
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
////void idAFConstraint_Spring::ApplyFriction( /*float*/ invTimeStep:number ) {
////	// no friction
////}
////
/////*
////================
////idAFConstraint_Spring::Translate
////================
////*/
////void idAFConstraint_Spring::Translate( const idVec3 &translation ) {
////	if ( !this.body2 ) {
////		this.anchor2 += translation;
////	}
////}
////
/////*
////================
////idAFConstraint_Spring::Rotate
////================
////*/
////void idAFConstraint_Spring::Rotate( const idRotation &rotation ) {
////	if ( !this.body2 ) {
////		this.anchor2 *= rotation;
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
////	master = this.body2 ? this.body2 : this.physics.GetMasterBody();
////	a1 = this.body1.GetWorldOrigin() + this.anchor1 * this.body1.GetWorldAxis();
////	if ( master ) {
////		a2 = master.GetWorldOrigin() + this.anchor2 * master.GetWorldAxis();
////	}
////	else {
////		a2 = this.anchor2;
////	}
////	center = ( a1 + a2 ) * 0.5;
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
////	master = this.body2 ? this.body2 : this.physics.GetMasterBody();
////	a1 = this.body1.GetWorldOrigin() + this.anchor1 * this.body1.GetWorldAxis();
////	if ( master ) {
////		a2 = master.GetWorldOrigin() + this.anchor2 * master.GetWorldAxis();
////	}
////	else {
////		a2 = this.anchor2;
////	}
////	dir = a2 - a1;
////	mid = a1 + 0.5 * dir;
////	length = dir.Normalize();
////
////	// draw spring
////	gameRenderWorld.DebugLine( colorGreen, a1, a2 );
////
////	// draw rest length
////	p = restLength * 0.5 * dir;
////	gameRenderWorld.DebugCircle( colorWhite, mid + p, dir, 1.0, 10 );
////	gameRenderWorld.DebugCircle( colorWhite, mid - p, dir, 1.0, 10 );
////	if ( restLength > length ) {
////		gameRenderWorld.DebugLine( colorWhite, a2, mid + p );
////		gameRenderWorld.DebugLine( colorWhite, a1, mid - p );
////	}
////
////	if ( minLength > 0.0 ) {
////		// draw min length
////		gameRenderWorld.DebugCircle( colorBlue, mid + minLength * 0.5 * dir, dir, 2.0, 10 );
////		gameRenderWorld.DebugCircle( colorBlue, mid - minLength * 0.5 * dir, dir, 2.0, 10 );
////	}
////
////	if ( maxLength > 0.0 ) {
////		// draw max length
////		gameRenderWorld.DebugCircle( colorRed, mid + maxLength * 0.5 * dir, dir, 2.0, 10 );
////		gameRenderWorld.DebugCircle( colorRed, mid - maxLength * 0.5 * dir, dir, 2.0, 10 );
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
////	saveFile.WriteVec3( this.anchor1 );
////	saveFile.WriteVec3( this.anchor2 );
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
////	saveFile.ReadVec3( this.anchor1 );
////	saveFile.ReadVec3( this.anchor2 );
////	saveFile.ReadFloat( kstretch );
////	saveFile.ReadFloat( kcompress );
////	saveFile.ReadFloat( damping );
////	saveFile.ReadFloat( restLength );
////	saveFile.ReadFloat( minLength );
////	saveFile.ReadFloat( maxLength );
////}
////
////
};

// constrains body1 to either be in contact with or move away from body2
class idAFConstraint_Contact extends idAFConstraint {
////
////public:
////							idAFConstraint_Contact( );
////							~idAFConstraint_Contact( );
////	void					Setup( idAFBody *b1, idAFBody *b2, contactInfo_t &c );
////	const contactInfo_t &	GetContact( ) const { return this.contact; }
////	virtual void			DebugDraw( );
////	virtual void			Translate( const idVec3 &translation );
////	virtual void			Rotate( const idRotation &rotation );
////	virtual void			GetCenter( idVec3 &center );
////
////protected:
////	contactInfo_t			contact;					// contact information
////	idAFConstraint_ContactFriction *fc;					// contact friction
////
////protected:
////	virtual void			Evaluate( float invTimeStep );
////	virtual void			ApplyFriction( float invTimeStep );

	
/////*
////================
////idAFConstraint_Contact::idAFConstraint_Contact
////================
////*/
////idAFConstraint_Contact::idAFConstraint_Contact( ) {
////	this.name .opEquals( "contact");
////	this.type = constraintType_t.CONSTRAINT_CONTACT;
////	this.InitSize( 1 );
////	this.fc = NULL;
////	this.fl.allowPrimary = false;
////	this.fl.frameConstraint = true;
////}
////
/////*
////================
////idAFConstraint_Contact::~idAFConstraint_Contact
////================
////*/
////idAFConstraint_Contact::~idAFConstraint_Contact( ) {
////	if ( this.fc ) {
////		delete this.fc;
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
////	float minBounceVelocity = 2.0;
////
////	assert( b1 );
////
////	body1 = b1;
////	this.body2 = b2;
////	contact = c;
////
////	p = c.point - this.body1.GetWorldOrigin();
////	v.SubVec3(0) = c.normal;
////	v.SubVec3(1) = p.Cross( c.normal );
////	J1.Set( 1, 6, v.ToFloatPtr() );
////	vel = v.SubVec3(0) * this.body1.GetLinearVelocity() + v.SubVec3(1) * this.body1.GetAngularVelocity();
////
////	if ( this.body2 ) {
////		p = c.point - this.body2.GetWorldOrigin();
////		v.SubVec3(0) = -c.normal;
////		v.SubVec3(1) = p.Cross( -c.normal );
////		this.J2.Set( 1, 6, v.ToFloatPtr() );
////		vel += v.SubVec3(0) * this.body2.GetLinearVelocity() + v.SubVec3(1) * this.body2.GetAngularVelocity();
////		c2[0] = 0.0;
////	}
////
////	if ( this.body1.GetBouncyness() > 0.0 && -vel > minBounceVelocity ) {
////		c1[0] = this.body1.GetBouncyness() * vel;
////	} else {
////		c1[0] = 0.0;
////	}
////
////	e[0] = CONTACT_LCP_EPSILON;
////	lo[0] = 0.0;
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
////void idAFConstraint_Contact::Evaluate( /*float*/ invTimeStep:number ) {
////	// do nothing
////}
////
/////*
////================
////idAFConstraint_Contact::ApplyFriction
////================
////*/
////void idAFConstraint_Contact::ApplyFriction( /*float*/ invTimeStep:number ) {
////	idVec3 r, velocity, normal, dir1, dir2;
////	float friction, magnitude, forceNumerator, forceDenominator;
////	idVecX impulse, dv;
////
////	friction = this.body1.GetContactFriction();
////	if ( this.body2 && this.body2.GetContactFriction() < friction ) {
////		friction = this.body2.GetContactFriction();
////	}
////
////	friction *= this.physics.GetContactFrictionScale();
////
////	if ( friction <= 0.0 ) {
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
////		r = contact.point - this.body1.GetWorldOrigin();
////		velocity = this.body1.GetLinearVelocity() + this.body1.GetAngularVelocity().Cross( r );
////		velocity -= contact.normal * velocity * contact.normal;
////
////		// get normalized direction of friction and magnitude of velocity
////		normal = -velocity;
////		magnitude = normal.Normalize();
////
////		forceNumerator = friction * magnitude;
////		forceDenominator = this.body1.GetInverseMass() + ( ( this.body1.GetInverseWorldInertia() * r.Cross( normal ) ).Cross( r ) * normal );
////		impulse.SubVec3(0) = (forceNumerator / forceDenominator) * normal;
////		impulse.SubVec3(1) = r.Cross( impulse.SubVec3(0) );
////		body1.InverseWorldSpatialInertiaMultiply( dv, impulse.ToFloatPtr() );
////
////		// modify velocity with friction force
////		body1.SetLinearVelocity( this.body1.GetLinearVelocity() + dv.SubVec3(0) );
////		body1.SetAngularVelocity( this.body1.GetAngularVelocity() + dv.SubVec3(1) );
////	}
////	else {
////
////		if ( !this.fc ) {
////			this.fc = new idAFConstraint_ContactFriction;
////		}
////		// call setup each frame because contact constraints are re-used for different bodies
////		this.fc.Setup( this );
////		this.fc.Add( this.physics, invTimeStep );
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
////	gameRenderWorld.DebugLine( colorWhite, contact.point, contact.point + 6.0 * contact.normal );
////	gameRenderWorld.DebugLine( colorWhite, contact.point - 2.0 * x, contact.point + 2.0 * x );
////	gameRenderWorld.DebugLine( colorWhite, contact.point - 2.0 * y, contact.point + 2.0 * y );
////}
////
////
};

// contact friction
class idAFConstraint_ContactFriction extends idAFConstraint {
////
////public:
////							idAFConstraint_ContactFriction( );
////	void					Setup( idAFConstraint_Contact *cc );
////	bool					Add( idPhysics_AF *phys, float invTimeStep );
////	virtual void			DebugDraw( );
////	virtual void			Translate( const idVec3 &translation );
////	virtual void			Rotate( const idRotation &rotation );
////
////protected:
////	idAFConstraint_Contact *cc;							// contact constraint
////
////protected:
////	virtual void			Evaluate( float invTimeStep );
////	virtual void			ApplyFriction( float invTimeStep );

	
/////*
////================
////idAFConstraint_ContactFriction::idAFConstraint_ContactFriction
////================
////*/
////idAFConstraint_ContactFriction::idAFConstraint_ContactFriction( ) {
////	this.type = constraintType_t.CONSTRAINT_FRICTION;
////	this.name .opEquals( "contactFriction");
////	this.InitSize( 2 );
////	cc = NULL;
////	this.fl.allowPrimary = false;
////	this.fl.frameConstraint = true;
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
////	this.body2 = cc.GetBody2();
////}
////
/////*
////================
////idAFConstraint_ContactFriction::Evaluate
////================
////*/
////void idAFConstraint_ContactFriction::Evaluate( /*float*/ invTimeStep:number ) {
////	// do nothing
////}
////
/////*
////================
////idAFConstraint_ContactFriction::ApplyFriction
////================
////*/
////void idAFConstraint_ContactFriction::ApplyFriction( /*float*/ invTimeStep:number ) {
////	// do nothing
////}
////
/////*
////================
////idAFConstraint_ContactFriction::Add
////================
////*/
////bool idAFConstraint_ContactFriction::Add( idPhysics_AF *phys, /*float*/ invTimeStep:number ) {
////	idVec3 r, dir1, dir2;
////	float friction;
////	int newRow;
////
////	this.physics = phys;
////
////	friction = this.body1.GetContactFriction() * this.physics.GetContactFrictionScale();
////
////	// if the body only has friction in one direction
////	if ( this.body1.GetFrictionDirection( dir1 ) ) {
////		// project the friction direction into the contact plane
////		dir1 -= dir1 * cc.GetContact().normal * dir1;
////		dir1.Normalize();
////
////		r = cc.GetContact().point - this.body1.GetWorldOrigin();
////
////		J1.SetSize( 1, 6 );
////		J1.SubVec6(0).SubVec3(0) = dir1;
////		J1.SubVec6(0).SubVec3(1) = r.Cross( dir1 );
////		c1.SetSize( 1 );
////		c1[0] = 0.0;
////
////		if ( this.body2 ) {
////			r = cc.GetContact().point - this.body2.GetWorldOrigin();
////
////			this.J2.SetSize( 1, 6 );
////			this.J2.SubVec6(0).SubVec3(0) = -dir1;
////			this.J2.SubVec6(0).SubVec3(1) = r.Cross( -dir1 );
////			c2.SetSize( 1 );
////			c2[0] = 0.0;
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
////		r = cc.GetContact().point - this.body1.GetWorldOrigin();
////
////		J1.SetSize( 2, 6 );
////		J1.SubVec6(0).SubVec3(0) = dir1;
////		J1.SubVec6(0).SubVec3(1) = r.Cross( dir1 );
////		J1.SubVec6(1).SubVec3(0) = dir2;
////		J1.SubVec6(1).SubVec3(1) = r.Cross( dir2 );
////		c1.SetSize( 2 );
////		c1[0] = c1[1] = 0.0;
////
////		if ( this.body2 ) {
////			r = cc.GetContact().point - this.body2.GetWorldOrigin();
////
////			this.J2.SetSize( 2, 6 );
////			this.J2.SubVec6(0).SubVec3(0) = -dir1;
////			this.J2.SubVec6(0).SubVec3(1) = r.Cross( -dir1 );
////			this.J2.SubVec6(1).SubVec3(0) = -dir2;
////			this.J2.SubVec6(1).SubVec3(1) = r.Cross( -dir2 );
////			c2.SetSize( 2 );
////			c2[0] = c2[1] = 0.0;
////
////			if ( this.body2.GetContactFriction() < friction ) {
////				friction = this.body2.GetContactFriction();
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
////	if ( this.body1.GetContactMotorDirection( dir1 ) && this.body1.GetContactMotorForce() > 0.0 ) {
////		// project the motor force direction into the contact plane
////		dir1 -= dir1 * cc.GetContact().normal * dir1;
////		dir1.Normalize();
////
////		r = cc.GetContact().point - this.body1.GetWorldOrigin();
////
////		newRow = J1.GetNumRows();
////		J1.ChangeSize( newRow+1, J1.GetNumColumns() );
////		J1.SubVec6(newRow).SubVec3(0) = -dir1;
////		J1.SubVec6(newRow).SubVec3(1) = r.Cross( -dir1 );
////		c1.ChangeSize( newRow+1 );
////		c1[newRow] = this.body1.GetContactMotorVelocity();
////
////		if ( this.body2 ) {
////			r = cc.GetContact().point - this.body2.GetWorldOrigin();
////
////			this.J2.ChangeSize( newRow+1, this.J2.GetNumColumns() );
////			this.J2.SubVec6(newRow).SubVec3(0) = -dir1;
////			this.J2.SubVec6(newRow).SubVec3(1) = r.Cross( -dir1 );
////			c2.ChangeSize( newRow+1 );
////			c2[newRow] = 0.0;
////		}
////
////		lo[newRow] = -body1.GetContactMotorForce();
////		hi[newRow] = this.body1.GetContactMotorForce();
////		boxIndex[newRow] = -1;
////	}
////
////	this.physics.AddFrameConstraint( this );
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
};

// constrains an axis attached to body1 to be inside a cone relative to body2
class idAFConstraint_ConeLimit extends idAFConstraint {
////
////public:
////							idAFConstraint_ConeLimit( );
////	void					Setup( idAFBody *b1, idAFBody *b2, const idVec3 &coneAnchor, const idVec3 &coneAxis,
////									const float coneAngle, const idVec3 &body1Axis );
////	void					SetAnchor( const idVec3 &coneAnchor );
////	void					SetBody1Axis( const idVec3 &body1Axis );
////	void					SetEpsilon( const float e ) { epsilon = e; }
////	bool					Add( idPhysics_AF *phys, float invTimeStep );
////	virtual void			DebugDraw( );
////	virtual void			Translate( const idVec3 &translation );
////	virtual void			Rotate( const idRotation &rotation );
////	virtual void			Save( idSaveGame *saveFile ) const;
////	virtual void			Restore( idRestoreGame *saveFile );
////
////protected:
	coneAnchor = new idVec3;					// top of the cone in body2 space
	coneAxis = new idVec3;					// cone axis in body2 space
	body1Axis = new idVec3;					// axis in body1 space that should stay within the cone
	cosAngle :number/*float*/;					// cos( coneAngle / 2 )
	sinHalfAngle :number/*float*/;				// sin( coneAngle / 4 )
	cosHalfAngle :number/*float*/;				// cos( coneAngle / 4 )
	epsilon :number/*float*/;					// lcp epsilon
////
////protected:
////	virtual void			Evaluate( float invTimeStep );
////	virtual void			ApplyFriction( float invTimeStep );

	
/*
================
idAFConstraint_ConeLimit::idAFConstraint_ConeLimit
================
*/
	constructor ( ) {
		super ( );
		this.type = constraintType_t.CONSTRAINT_CONELIMIT;
		this.name.opEquals( "coneLimit" );
		this.InitSize( 1 );
		this.fl.allowPrimary = false;
		this.fl.frameConstraint = true;
	}

/*
================
idAFConstraint_ConeLimit::Setup

  the coneAnchor is the top of the cone in body2 space
  the coneAxis is the axis of the cone in body2 space
  the coneAngle is the angle the cone hull makes at the top
  the body1Axis is the axis in body1 space that should stay within the cone
================
*/
    Setup ( b1: idAFBody, b2: idAFBody, coneAnchor: idVec3, coneAxis: idVec3, /*float */coneAngle: number, body1Axis: idVec3 ): void {
        this.body1 = b1;
        this.body2 = b2;
        this.coneAxis.opEquals( coneAxis );
        this.coneAxis.Normalize ( );
        this.coneAnchor.opEquals( coneAnchor );
        this.body1Axis.opEquals( body1Axis );
        this.body1Axis.Normalize ( );
        this.cosAngle = /*(float)*/ cos( DEG2RAD( coneAngle * 0.5 ) );
        this.sinHalfAngle = /*(float)*/ sin( DEG2RAD( coneAngle * 0.25 ) );
        this.cosHalfAngle = /*(float)*/ cos( DEG2RAD( coneAngle * 0.25 ) );
    }

/*
================
idAFConstraint_ConeLimit::SetAnchor
================
*/
SetAnchor(coneAnchor :idVec3) :void {
	this.coneAnchor.opEquals( coneAnchor );
}

/*
================
idAFConstraint_ConeLimit::SetBody1Axis
================
*/
	SetBody1Axis(body1Axis: idVec3):void {
		this.body1Axis.opEquals( body1Axis );
	}

/*
================
idAFConstraint_ConeLimit::Evaluate
================
*/
Evaluate( /*float*/ invTimeStep :number) :void{
	// do nothing
}

/*
================
idAFConstraint_ConeLimit::ApplyFriction
================
*/
ApplyFriction( /*float*/ invTimeStep :number) :void{
}

/////*
////================
////idAFConstraint_ConeLimit::Add
////================
////*/
////bool idAFConstraint_ConeLimit::Add( idPhysics_AF *phys, /*float*/ invTimeStep:number ) {
////	float a;
////	idVec6 J1row, J2row;
////	idVec3 ax, anchor, body1ax, normal, coneVector, p1, p2;
////	idQuat q;
////	idAFBody *master;
////
////	if ( af_skipLimits.GetBool() ) {
////		this.lm.Zero();	// constraint exerts no force
////		return false;
////	}
////
////	this.physics = phys;
////
////	master = this.body2 ? this.body2 : this.physics.GetMasterBody();
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
////		this.lm.Zero();	// constraint exerts no force
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
////	p1 = anchor + 32.0 * coneVector - this.body1.GetWorldOrigin();
////
////	J1row.SubVec3(0) = normal;
////	J1row.SubVec3(1) = p1.Cross( normal );
////	J1.Set( 1, 6, J1row.ToFloatPtr() );
////
////	c1[0] = (invTimeStep * LIMIT_ERROR_REDUCTION) * ( normal * (32.0 * body1ax) );
////
////	if ( this.body2 ) {
////
////		p2 = anchor + 32.0 * coneVector - master.GetWorldOrigin();
////
////		J2row.SubVec3(0) = -normal;
////		J2row.SubVec3(1) = p2.Cross( -normal );
////		this.J2.Set( 1, 6, J2row.ToFloatPtr() );
////
////		c2[0] = 0.0;
////	}
////
////	lo[0] = 0.0;
////	e[0] = LIMIT_LCP_EPSILON;
////
////	this.physics.AddFrameConstraint( this );
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
////	if ( !this.body2 ) {
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
////	if ( !this.body2 ) {
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
////	float sinAngle, a, size = 10.0;
////	idAFBody *master;
////
////	master = this.body2 ? this.body2 : this.physics.GetMasterBody();
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
////	gameRenderWorld.DebugLine( colorGreen, anchor, anchor + size * (body1Axis * this.body1.GetWorldAxis()) );
////
////	// draw cone
////	ax.NormalVectors( x, y );
////	sinAngle = idMath::Sqrt( 1.0 - cosAngle * cosAngle );
////	x *= size * sinAngle;
////	y *= size * sinAngle;
////	z = anchor + ax * size * cosAngle;
////	start = x + z;
////	for ( a = 0.0; a < 360.0; a += 45.0 ) {
////		end = x * (float) cos( DEG2RAD(a + 45.0) ) + y * (float) sin( DEG2RAD(a + 45.0) ) + z;
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
};

// constrains an axis attached to body1 to be inside a pyramid relative to body2
class idAFConstraint_PyramidLimit extends idAFConstraint {
////
////public:
////							idAFConstraint_PyramidLimit( );
////	void					Setup( idAFBody *b1, idAFBody *b2, const idVec3 &pyramidAnchor,
////									const idVec3 &pyramidAxis, const idVec3 &baseAxis,
////									const float pyramidAngle1, const float pyramidAngle2, const idVec3 &body1Axis );
////	void					SetAnchor( const idVec3 &pyramidAxis );
////	void					SetBody1Axis( const idVec3 &body1Axis );
////	void					SetEpsilon( const float e ) { epsilon = e; }
////	bool					Add( idPhysics_AF *phys, float invTimeStep );
////	virtual void			DebugDraw( );
////	virtual void			Translate( const idVec3 &translation );
////	virtual void			Rotate( const idRotation &rotation );
////	virtual void			Save( idSaveGame *saveFile ) const;
////	virtual void			Restore( idRestoreGame *saveFile );
////
////protected:
	pyramidAnchor = new idVec3;				// top of the pyramid in body2 space
	pyramidBasis = new idMat3;				// pyramid basis in body2 space with base[2] being the pyramid axis
	body1Axis = new idVec3;					// axis in body1 space that should stay within the cone
	cosAngle = new Float32Array(2);				// cos( pyramidAngle / 2 )
	sinHalfAngle = new Float32Array(2);			// sin( pyramidAngle / 4 )
    cosHalfAngle = new Float32Array(2);			// cos( pyramidAngle / 4 )
	epsilon: number /*float*/;					// lcp epsilon
////
////protected:
////	virtual void			Evaluate( float invTimeStep );
////	virtual void			ApplyFriction( float invTimeStep );

	
/*
================
idAFConstraint_PyramidLimit::idAFConstraint_PyramidLimit
================
*/
	constructor ( ) {
		super ( );
		this.type = constraintType_t.CONSTRAINT_PYRAMIDLIMIT;
		this.name.opEquals( "pyramidLimit" );
		this.InitSize( 1 );
		this.fl.allowPrimary = false;
		this.fl.frameConstraint = true;
	}

/*
================
idAFConstraint_PyramidLimit::Setup
================
*/
    Setup ( b1: idAFBody, b2: idAFBody, pyramidAnchor: idVec3,
        pyramidAxis: idVec3, baseAxis: idVec3,
/*float */pyramidAngle1: number, /*float */pyramidAngle2: number, body1Axis: idVec3 ): void {
        this.body1 = b1;
        this.body2 = b2;
        // setup the base and make sure the basis is orthonormal
        this.pyramidBasis[2] = pyramidAxis;
        this.pyramidBasis[2].Normalize ( );
        this.pyramidBasis[0].opEquals(baseAxis);
        todoThrow ( );
        //this.pyramidBasis[0].opSubtractionAssignment( pyramidBasis[2] * baseAxis * pyramidBasis[2] );
        //this.pyramidBasis[0].Normalize ( );
        //this.pyramidBasis[1].opEquals( pyramidBasis[0].Cross( pyramidBasis[2] ) );
        //// pyramid top
        //this.pyramidAnchor = pyramidAnchor;
        //// angles
        //this.cosAngle[0] = /*(float)*/ cos( DEG2RAD( pyramidAngle1 * 0.5 ) );
        //this.cosAngle[1] = /*(float)*/ cos( DEG2RAD( pyramidAngle2 * 0.5 ) );
        //this.sinHalfAngle[0] = /*(float)*/ sin( DEG2RAD( pyramidAngle1 * 0.25 ) );
        //this.sinHalfAngle[1] = /*(float)*/ sin( DEG2RAD( pyramidAngle2 * 0.25 ) );
        //this.cosHalfAngle[0] = /*(float)*/ cos( DEG2RAD( pyramidAngle1 * 0.25 ) );
        //this.cosHalfAngle[1] = /*(float)*/ cos( DEG2RAD( pyramidAngle2 * 0.25 ) );

        this.body1Axis.opEquals( body1Axis );
    }

/*
================
idAFConstraint_PyramidLimit::SetAnchor
================
*/
	SetAnchor ( pyramidAnchor: idVec3 ): void {
		this.pyramidAnchor.opEquals( pyramidAnchor );
	}

/*
================
idAFConstraint_PyramidLimit::SetBody1Axis
================
*/
	SetBody1Axis ( body1Axis: idVec3 ): void {
		this.body1Axis.opEquals( body1Axis );
	}

/*
================
idAFConstraint_PyramidLimit::Evaluate
================
*/
Evaluate( /*float*/ invTimeStep:number ):void {
	// do nothing
}

/*
================
idAFConstraint_PyramidLimit::ApplyFriction
================
*/
ApplyFriction( /*float*/ invTimeStep:number ):void {
}

/////*
////================
////idAFConstraint_PyramidLimit::Add
////================
////*/
////bool idAFConstraint_PyramidLimit::Add( idPhysics_AF *phys, /*float*/ invTimeStep:number ) {
////	var/*int*/i:number;
////	float a[2];
////	idVec6 J1row, J2row;
////	idMat3 worldBase;
////	idVec3 anchor, body1ax, ax[2], v, normal, pyramidVector, p1, p2;
////	idQuat q;
////	idAFBody *master;
////
////	if ( af_skipLimits.GetBool() ) {
////		this.lm.Zero();	// constraint exerts no force
////		return false;
////	}
////
////	this.physics = phys;
////	master = this.body2 ? this.body2 : this.physics.GetMasterBody();
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
////	body1ax = body1Axis * this.body1.GetWorldAxis();
////
////	for ( i = 0; i < 2; i++ ) {
////		ax[i] = body1ax - worldBase[!i] * body1ax * worldBase[!i];
////		ax[i].Normalize();
////		a[i] = worldBase[2] * ax[i];
////	}
////
////	// if the body1 axis is inside the pyramid
////	if ( a[0] > cosAngle[0] && a[1] > cosAngle[1] ) {
////		this.lm.Zero();	// constraint exerts no force
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
////	p1 = anchor + 32.0 * pyramidVector - this.body1.GetWorldOrigin();
////
////	J1row.SubVec3(0) = normal;
////	J1row.SubVec3(1) = p1.Cross( normal );
////	J1.Set( 1, 6, J1row.ToFloatPtr() );
////
////	c1[0] = (invTimeStep * LIMIT_ERROR_REDUCTION) * ( normal * (32.0 * body1ax) );
////
////	if ( this.body2 ) {
////
////		p2 = anchor + 32.0 * pyramidVector - master.GetWorldOrigin();
////
////		J2row.SubVec3(0) = -normal;
////		J2row.SubVec3(1) = p2.Cross( -normal );
////		this.J2.Set( 1, 6, J2row.ToFloatPtr() );
////
////		c2[0] = 0.0;
////	}
////
////	lo[0] = 0.0;
////	e[0] = LIMIT_LCP_EPSILON;
////
////	this.physics.AddFrameConstraint( this );
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
////	if ( !this.body2 ) {
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
////	if ( !this.body2 ) {
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
////	float size = 10.0;
////	idVec3 anchor, dir, p[4];
////	idMat3 worldBase, m[2];
////	idQuat q;
////	idAFBody *master;
////
////	master = this.body2 ? this.body2 : this.physics.GetMasterBody();
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
};

// vehicle suspension
class idAFConstraint_Suspension extends idAFConstraint {
////
////public:
////							idAFConstraint_Suspension( );
////
////	void					Setup( const char *name, idAFBody *body, const idVec3 &origin, const idMat3 &axis, idClipModel *clipModel );
////	void					SetSuspension( const float up, const float down, const float k, const float d, const float f );
////
////	void					SetSteerAngle( const float degrees ) { steerAngle = degrees; }
////	void					EnableMotor( const bool enable ) { motorEnabled = enable; }
////	void					SetMotorForce( const float force ) { motorForce = force; }
////	void					SetMotorVelocity( const float vel ) { motorVelocity = vel; }
////	void					SetEpsilon( const float e ) { epsilon = e; }
////	const idVec3			GetWheelOrigin( ) const;
////
////	virtual void			DebugDraw( );
////	virtual void			Translate( const idVec3 &translation );
////	virtual void			Rotate( const idRotation &rotation );
////
////protected:
////	idVec3					localOrigin;				// position of suspension relative to body1
////	idMat3					localAxis;					// orientation of suspension relative to body1
////	float					suspensionUp;				// suspension up movement
////	float					suspensionDown;				// suspension down movement
////	float					suspensionKCompress;		// spring compress constant
////	float					suspensionDamping;			// spring damping
////	float					steerAngle;					// desired steer angle in degrees
////	float					friction;					// friction
////	bool					motorEnabled;				// whether the motor is enabled or not
////	float					motorForce;					// motor force
////	float					motorVelocity;				// desired velocity
////	idClipModel *			wheelModel;					// wheel model
////	idVec3					wheelOffset;				// wheel position relative to body1
////	trace_t					trace;						// contact point with the ground
epsilon: number /*float*/;					// lcp epsilon
////
////protected:
////	virtual void			Evaluate( float invTimeStep );
////	virtual void			ApplyFriction( float invTimeStep );

	
/////*
////================
////idAFConstraint_Suspension::idAFConstraint_Suspension
////================
////*/
////idAFConstraint_Suspension::idAFConstraint_Suspension( ) {
////	this.type = constraintType_t.CONSTRAINT_SUSPENSION;
////	this.name .opEquals( "suspension");
////	this.InitSize( 3 );
////	this..allowPrimary = false;
////	fl.frameConstraint = true;
////
////	localOrigin.Zero();
////	localAxis.Identity();
////	suspensionUp = 0.0;
////	suspensionDown = 0.0;
////	suspensionKCompress = 0.0;
////	suspensionDamping = 0.0;
////	steerAngle = 0.0;
////	friction = 2.0;
////	motorEnabled = false;
////	motorForce = 0.0;
////	motorVelocity = 0.0;
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
////void idAFConstraint_Suspension::Setup( const char *name, body: idAFBody, origin: idVec3, const idMat3 &axis, idClipModel *clipModel ) {
////	this.name .opEquals( name);
////	body1 = body;
////	this.body2 = NULL;
////	localOrigin = ( origin - body.GetWorldOrigin() ) * body.GetWorldAxis().Transpose();
////	localAxis = this.axis * body.GetWorldAxis().Transpose();
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
////	return this.body1.GetWorldOrigin() + wheelOffset * this.body1.GetWorldAxis();
////}
////
/////*
////================
////idAFConstraint_Suspension::Evaluate
////================
////*/
////void idAFConstraint_Suspension::Evaluate( /*float*/ invTimeStep:number ) {
////	float velocity, suspensionLength, springLength, compression, dampingForce, springForce;
////	idVec3 origin, start, end, vel1, vel2, springDir, r, frictionDir, motorDir;
////	idMat3 axis;
////	idRotation rotation;
////
////	axis = localAxis * this.body1.GetWorldAxis();
////	origin = this.body1.GetWorldOrigin() + localOrigin * this.body1.GetWorldAxis();
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
////	wheelOffset = ( trace.endpos - this.body1.GetWorldOrigin() ) * this.body1.GetWorldAxis().Transpose();
////
////	if ( trace.fraction >= 1.0 ) {
////		J1.SetSize( 0, 6 );
////		if ( this.body2 ) {
////			this.J2.SetSize( 0, 6 );
////		}
////		return;
////	}
////
////	// calculate and add spring force
////	vel1 = this.body1.GetPointVelocity( start );
////	if ( this.body2 ) {
////		vel2 = this.body2.GetPointVelocity( trace.c.point );
////	} else {
////		vel2.Zero();
////	}
////
////	suspensionLength = suspensionUp + suspensionDown;
////	springDir = trace.endpos - start;
////	springLength = trace.fraction * suspensionLength;
////	dampingForce = suspensionDamping * idMath::Fabs( ( vel2 - vel1 ) * springDir ) / ( 1.0 + springLength * springLength );
////	compression = suspensionLength - springLength;
////	springForce = compression * compression * suspensionKCompress - dampingForce;
////
////	r = trace.c.point - this.body1.GetWorldOrigin();
////	J1.SetSize( 2, 6 );
////	J1.SubVec6(0).SubVec3(0) = trace.c.normal;
////	J1.SubVec6(0).SubVec3(1) = r.Cross( trace.c.normal );
////	c1.SetSize( 2 );
////	c1[0] = 0.0;
////	velocity = J1.SubVec6(0).SubVec3(0) * this.body1.GetLinearVelocity() + J1.SubVec6(0).SubVec3(1) * this.body1.GetAngularVelocity();
////
////	if ( this.body2 ) {
////		r = trace.c.point - this.body2.GetWorldOrigin();
////		this.J2.SetSize( 2, 6 );
////		this.J2.SubVec6(0).SubVec3(0) = -trace.c.normal;
////		this.J2.SubVec6(0).SubVec3(1) = r.Cross( -trace.c.normal );
////		c2.SetSize( 2 );
////		c2[0] = 0.0;
////		velocity += this.J2.SubVec6(0).SubVec3(0) * this.body2.GetLinearVelocity() + this.J2.SubVec6(0).SubVec3(1) * this.body2.GetAngularVelocity();
////	}
////
////	c1[0] = -compression;		// + 0.5 * -velocity;
////
////	e[0] = 1e-4f;
////	lo[0] = 0.0;
////	hi[0] = springForce;
////	boxConstraint = NULL;
////	boxIndex[0] = -1;
////
////	// project the friction direction into the contact plane
////	frictionDir = axis[1] - axis[1] * trace.c.normal * axis[1];
////	frictionDir.Normalize();
////
////	r = trace.c.point - this.body1.GetWorldOrigin();
////
////	J1.SubVec6(1).SubVec3(0) = frictionDir;
////	J1.SubVec6(1).SubVec3(1) = r.Cross( frictionDir );
////	c1[1] = 0.0;
////
////	if ( this.body2 ) {
////		r = trace.c.point - this.body2.GetWorldOrigin();
////
////		this.J2.SubVec6(1).SubVec3(0) = -frictionDir;
////		this.J2.SubVec6(1).SubVec3(1) = r.Cross( -frictionDir );
////		c2[1] = 0.0;
////	}
////
////	lo[1] = -friction * this.physics.GetContactFrictionScale();
////	hi[1] = friction * this.physics.GetContactFrictionScale();
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
////		r = trace.c.point - this.body1.GetWorldOrigin();
////
////		J1.ChangeSize( 3, J1.GetNumColumns() );
////		J1.SubVec6(2).SubVec3(0) = -motorDir;
////		J1.SubVec6(2).SubVec3(1) = r.Cross( -motorDir );
////		c1.ChangeSize( 3 );
////		c1[2] = motorVelocity;
////
////		if ( this.body2 ) {
////			r = trace.c.point - this.body2.GetWorldOrigin();
////
////			this.J2.ChangeSize( 3, this.J2.GetNumColumns() );
////			this.J2.SubVec6(2).SubVec3(0) = -motorDir;
////			this.J2.SubVec6(2).SubVec3(1) = r.Cross( -motorDir );
////			c2.ChangeSize( 3 );
////			c2[2] = 0.0;
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
////void idAFConstraint_Suspension::ApplyFriction( /*float*/ invTimeStep:number ) {
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
////	axis = localAxis * this.body1.GetWorldAxis();
////
////	rotation.SetVec( axis[2] );
////	rotation.SetAngle( steerAngle );
////
////	axis *= rotation.ToMat3();
////
////	if ( trace.fraction < 1.0 ) {
////		origin = trace.c.point;
////
////		gameRenderWorld.DebugLine( colorWhite, origin, origin + 6.0 * axis[2] );
////		gameRenderWorld.DebugLine( colorWhite, origin - 4.0 * axis[0], origin + 4.0 * axis[0] );
////		gameRenderWorld.DebugLine( colorWhite, origin - 2.0 * axis[1], origin + 2.0 * axis[1] );
////	}
////}
////
};


//===============================================================
//
//	idAFBody
//
//===============================================================

class AFBodyPState_t {
	worldOrigin = new idVec3;				// position in world space
	worldAxis = new idMat3;					// axis at worldOrigin
	spatialVelocity = new idVec6;			// linear and rotational velocity of body
	externalForce = new idVec6;				// external force and torque applied to body

	opEquals ( other: AFBodyPState_t ): AFBodyPState_t {
		this.worldOrigin.opEquals( other.worldOrigin );
		this.worldAxis.opEquals( other.worldAxis );
		this.spatialVelocity.opEquals( other.spatialVelocity );
		this.externalForce.opEquals( other.externalForce );
		return this;
	}
}


class idAFBody {
////
////	friend class idPhysics_AF;
////	friend class idAFTree;
////
////public:
////							idAFBody( );
////							idAFBody( const idStr &name, idClipModel *clipModel, float density );
////							~idAFBody( );
////
////	void					Init( );
	GetName( ) :idStr { return this.name; }
	GetWorldOrigin(): idVec3 { return this.current.worldOrigin; }
	GetWorldAxis(): idMat3 { return this.current.worldAxis; }
////	const idVec3 &			GetLinearVelocity( ) const { return this.current.spatialVelocity.SubVec3(0); }
////	const idVec3 &			GetAngularVelocity( ) const { return this.current.spatialVelocity.SubVec3(1); }
////	idVec3					GetPointVelocity( const idVec3 &point ) const;
////	const idVec3 &			GetCenterOfMass( ) const { return centerOfMass; }
////	void					SetClipModel( idClipModel *clipModel );
	GetClipModel ( ): idClipModel { return this.clipModel; }
	SetClipMask(  /*int */mask :number):void { this.clipMask = mask; this.fl.clipMaskSet = true; }
	GetClipMask ( ): number { return this.clipMask; }
	SetSelfCollision ( enable: boolean ): void { this.fl.selfCollision = enable; }
	SetWorldOrigin(origin: idVec3) { this.current.worldOrigin = origin; }
	SetWorldAxis ( axis: idMat3 ) { this.current.worldAxis = axis; }
////	void					SetLinearVelocity( const idVec3 &linear ) const { this.current.spatialVelocity.SubVec3(0) = linear; }
////	void					SetAngularVelocity( const idVec3 &angular ) const { this.current.spatialVelocity.SubVec3(1) = angular; }
////	void					SetFriction( float linear, float angular, float contact );
////	float					GetContactFriction( ) const { return this.contactFriction; }
////	void					SetBouncyness( float bounce );
////	float					GetBouncyness( ) const { return this.bouncyness; }
////	void					SetDensity( float density, const idMat3 &inertiaScale = mat3_identity );
    GetInverseMass ( ): number { return this.invMass; }
////	idMat3					GetInverseWorldInertia( ) const { return this.current.worldAxis.Transpose() * inverseInertiaTensor * this.current.worldAxis; }
////
////	void					SetFrictionDirection( const idVec3 &dir );
////	bool					GetFrictionDirection( idVec3 &dir ) const;
////
////	void					SetContactMotorDirection( const idVec3 &dir );
////	bool					GetContactMotorDirection( idVec3 &dir ) const;
////	void					SetContactMotorVelocity( float vel ) { this.contactMotorVelocity = vel; }
////	float					GetContactMotorVelocity( ) const { return this.contactMotorVelocity; }
////	void					SetContactMotorForce( float force ) { this.contactMotorForce = force; }
////	float					GetContactMotorForce( ) const { return this.contactMotorForce; }
////
////	void					AddForce( const idVec3 &point, const idVec3 &force );
////	void					InverseWorldSpatialInertiaMultiply( idVecX &dst, const float *v ) const;
////	idVec6 &				GetResponseForce( int index ) { return reinterpret_cast<idVec6 &>(response[ index * 8 ]); }
////
////	void					Save( idSaveGame *saveFile );
////	void					Restore( idRestoreGame *saveFile );
////
////private:
	// properties
	name = new idStr;						// name of body
	parent:idAFBody;						// parent of this body
	children = new idList<idAFBody >	(idAFBody,true);					// children of this body
	clipModel: idClipModel;					// model used for collision detection
	primaryConstraint:idAFConstraint;			// primary constraint (this.constraint.body1 = this)
	constraints = new idList<idAFConstraint>(idAFConstraint, true);				// all constraints attached to this body
	tree:idAFTree;						// tree structure this body is part of
	linearFriction :number/*float*/;				// translational friction
	angularFriction :number/*float*/;			// rotational friction
	contactFriction :number/*float*/;			// friction with contact surfaces
	bouncyness :number/*float*/;					// bounce
	clipMask :number/*int*/;					// contents this body collides with
	frictionDir = new idVec3;				// specifies a single direction of friction in body space
	contactMotorDir = new idVec3;			// contact motor direction
	contactMotorVelocity :number/*float*/;		// contact motor velocity
	contactMotorForce :number/*float*/;			// maximum force applied to reach the motor velocity
	
	// derived properties
	mass :number/*float*/;						// mass of body
	invMass :number/*float*/;					// inverse mass
	centerOfMass = new idVec3;				// center of mass of body
	inertiaTensor = new idMat3;				// inertia tensor
	inverseInertiaTensor = new idMat3;		// inverse inertia tensor
	
	// physics state
	state = newStructArray<AFBodyPState_t>(AFBodyPState_t, 2);
	current:AFBodyPState_t;					// current physics state
	next: AFBodyPState_t;						// next physics state
	saved = new AFBodyPState_t;						// saved physics state
	atRestOrigin = new idVec3;				// origin at rest
	atRestAxis = new idMat3;					// axis at rest
	
	// simulation variables used during calculations
	inverseWorldSpatialInertia = new idMatX;	// inverse spatial inertia in world space
	I = new idMatX; invI = new idMatX;					// transformed inertia
	J = new idMatX;							// transformed constraint matrix
	s = new idVecX;							// temp solution
	totalForce = new idVecX;					// total force acting on body
	auxForce = new idVecX;					// force from auxiliary constraints
	acceleration = new idVecX;				// acceleration
	response:Float32Array;					// forces on body in response to auxiliary constraint forces
	responseIndex:Int32Array;				// index to response forces
	numResponses :number/*int*/;				// number of response forces
	maxAuxiliaryIndex :number/*int*/;			// largest index of an auxiliary constraint constraining this body
	maxSubTreeAuxiliaryIndex :number/*int*/;	// largest index of an auxiliary constraint constraining this body or one of it's children
////
////	struct bodyFlags_s {
////		bool				clipMaskSet			: 1;	// true if this body has a clip mask set
////		bool				selfCollision		: 1;	// true if this body can collide with other bodies of this AF
////		bool				spatialInertiaSparse: 1;	// true if the spatial inertia matrix is sparse
////		bool				useFrictionDir		: 1;	// true if a single friction direction should be used
////		bool				useContactMotorDir	: 1;	// true if a contact motor should be used
////		bool				isZero				: 1;	// true if 's' is zero during calculations
////	} fl;

	fl = {
		clipMaskSet: false,			//: 1 // true if this body has a clip mask set
		selfCollision: false,		//: 1// true if this body can collide with other bodies of this AF
		spatialInertiaSparse: false,//: 1// true if the spatial inertia matrix is sparse
		useFrictionDir: false,		//: 1// true if a single friction direction should be used
		useContactMotorDir: false,	//: 1// true if a contact motor should be used
		isZero: false				//: 1// true if 's' is zero during calculations
	}


	/*
	================
	idAFBody::idAFBody
	================
	*/
    constructor()
    constructor(name: idStr, clipModel: idClipModel, /*float */density: number)
    constructor(name?: idStr, clipModel?: idClipModel, /*float */density?: number) {
        if ( !arguments ) {
            this.constructor_default ( );
        } else {
            this.constructor_args(name, clipModel, density );
        }
    }

    private constructor_default():void {
		this.Init();
	}
	
	/*
	================
	idAFBody::idAFBody
	================
	*/
    private constructor_args(name: idStr, clipModel: idClipModel , /*float */density :number):void {
	
		assert( clipModel );
		assert( clipModel.IsTraceModel() );
	
		this.Init();

        this.name.opEquals( name );
		this.clipModel = null;
	
		this.SetClipModel( clipModel );
		this.SetDensity( density );
	
		this.current.worldOrigin .opEquals( clipModel.GetOrigin());
        this.current.worldAxis.opEquals( clipModel.GetAxis());
        this.next.opEquals( this.current );

    }
	////
	/////*
	////================
	////idAFBody::~idAFBody
	////================
	////*/
	////idAFBody::~idAFBody( ) {
	////	delete clipModel;
	////}

	/*
	================
	idAFBody::Init
	================
	*/
	Init ( ): void {
		this.name.opEquals( "noname" );
		this.parent = null;
		this.clipModel = null;
		this.primaryConstraint = null;
		this.tree = null;

		this.linearFriction = -1.0;
		this.angularFriction = -1.0;
		this.contactFriction = -1.0;
		this.bouncyness = -1.0;
		this.clipMask = 0;

		this.frictionDir.opEquals( vec3_zero );
		this.contactMotorDir.opEquals( vec3_zero );
		this.contactMotorVelocity = 0.0;
		this.contactMotorForce = 0.0;

		this.mass = 1.0;
		this.invMass = 1.0;
		this.centerOfMass.opEquals( vec3_zero );
		this.inertiaTensor.opEquals( mat3_identity );
		this.inverseInertiaTensor.opEquals( mat3_identity );

		this.current = this.state[0];
		this.next = this.state[1];
		this.current.worldOrigin.opEquals( vec3_zero );
		this.current.worldAxis.opEquals( mat3_identity );
		this.current.spatialVelocity.opEquals( vec6_zero );
		this.current.externalForce.opEquals( vec6_zero );
		this.next.opEquals( this.current );
		this.saved.opEquals( this.current );
		this.atRestOrigin.opEquals( vec3_zero );
		this.atRestAxis.opEquals( mat3_identity );

		this.s.Zero( 6 );
		this.totalForce.Zero( 6 );
		this.auxForce.Zero( 6 );
		this.acceleration.Zero( 6 );

		this.response = null;
		this.responseIndex = null;
		this.numResponses = 0;
		this.maxAuxiliaryIndex = 0;
		this.maxSubTreeAuxiliaryIndex = 0;

		//memset( &fl, 0, sizeof(fl) );
		this.fl.clipMaskSet = false;
		this.fl.selfCollision = false;
		this.fl.spatialInertiaSparse = false;
		this.fl.useFrictionDir = false;
		this.fl.useContactMotorDir = false;
		this.fl.isZero = false;

		this.fl.selfCollision = true;
		this.fl.isZero = true;
	}

	/*
	================
	idAFBody::SetClipModel
	================
	*/
	SetClipModel ( clipModel: idClipModel ): void {
		if ( this.clipModel && this.clipModel != clipModel ) {
			delete this.clipModel;
		}
		this.clipModel = clipModel;
	}

	/*
	================
	idAFBody::SetFriction
	================
	*/
	SetFriction( /*float */linear: number, /*float */angular: number, /*float */contact: number):void {
		if ( linear < 0.0 || linear > 1.0 ||
				angular < 0.0 || angular > 1.0 ||
					contact < 0.0 ) {
			gameLocal.Warning( "idAFBody::SetFriction: friction out of range, linear = %.1f, angular = %.1f, contact = %.1f", linear, angular, contact );
			return;
		}
		this.linearFriction = linear;
		this.angularFriction = angular;
		this.contactFriction = contact;
	}

	/*
	================
	idAFBody::SetBouncyness
	================
	*/
	SetBouncyness( /*float*/ bounce: number): void {
		if (bounce < 0.0 || bounce > 1.0) {
			gameLocal.Warning("idAFBody::SetBouncyness: bouncyness out of range, bounce = %.1f", bounce);
			return;
		}
		this.bouncyness = bounce;
	}

/*
================
idAFBody::SetDensity
================
*/
    SetDensity ( /*float */density: number, /*const idMat3 &*/inertiaScale: idMat3 = mat3_identity ): void {

        // get the body mass properties
        var $mass = new R( this.mass );
        this.clipModel.GetMassProperties(density, $mass, this.centerOfMass, this.inertiaTensor);
        this.mass = $mass.$;

        // make sure we have a valid mass
        if ( this.mass <= 0.0 || FLOAT_IS_NAN( this.mass ) ) {
            gameLocal.Warning( "idAFBody::SetDensity: invalid mass for body '%s'", this.name.c_str ( ) );
            this.mass = 1.0;
            this.centerOfMass.Zero ( );
            this.inertiaTensor.Identity ( );
        }

        // make sure the center of mass is at the body origin
        if (!this.centerOfMass.Compare_epsilon( vec3_origin, CENTER_OF_MASS_EPSILON ) ) {
            gameLocal.Warning( "idAFBody::SetDentity: center of mass not at origin for body '%s'", this.name.c_str ( ) );
        }
        this.centerOfMass.Zero ( );

        // calculate the inverse mass and inverse inertia tensor
        this.invMass = 1.0 / this.mass;
        if ( inertiaScale.opNotEqualTo( mat3_identity ) ) {
            this.inertiaTensor.opMultiplicationAssignment( inertiaScale );
        }
        if ( this.inertiaTensor.IsDiagonal( 1e-3 ) ) {
            this.inertiaTensor[0][1] = this.inertiaTensor[0][2] = 0.0;
            this.inertiaTensor[1][0] = this.inertiaTensor[1][2] = 0.0;
            this.inertiaTensor[2][0] = this.inertiaTensor[2][1] = 0.0;
            this.inverseInertiaTensor.Identity ( );
            this.inverseInertiaTensor[0][0] = 1.0 / this.inertiaTensor[0][0];
            this.inverseInertiaTensor[1][1] = 1.0 / this.inertiaTensor[1][1];
            this.inverseInertiaTensor[2][2] = 1.0 / this.inertiaTensor[2][2];
        } else {
            this.inverseInertiaTensor.opEquals( this.inertiaTensor.Inverse ( ) );
        }
    }

/*
================
idAFBody::SetFrictionDirection
================
*/
    SetFrictionDirection ( dir: idVec3 ): void {
        this.frictionDir.opEquals( idMat3.opMultiplication_VecMat( dir, this.current.worldAxis.Transpose ( ) ) );
        this.fl.useFrictionDir = true;
    }

/////*
////================
////idAFBody::GetFrictionDirection
////================
////*/
////bool idAFBody::GetFrictionDirection( idVec3 &dir ) const {
////	if ( this.fl.useFrictionDir ) {
////		dir = frictionDir * this.current.worldAxis;
////		return true;
////	}
////	return false;
////}

/*
================
idAFBody::SetContactMotorDirection
================
*/
    SetContactMotorDirection ( dir: idVec3 ): void {
        this.contactMotorDir.opEquals( idMat3.opMultiplication_VecMat( dir, this.current.worldAxis.Transpose ( ) ) );
        this.fl.useContactMotorDir = true;
    }

/////*
////================
////idAFBody::GetContactMotorDirection
////================
////*/
////bool idAFBody::GetContactMotorDirection( idVec3 &dir ) const {
////	if ( this.fl.useContactMotorDir ) {
////		dir = this.contactMotorDir * this.current.worldAxis;
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
////	idVec3 r = point - this.current.worldOrigin;
////	return this.current.spatialVelocity.SubVec3(0) + this.current.spatialVelocity.SubVec3(1).Cross( r );
////}
////
/////*
////================
////idAFBody::AddForce
////================
////*/
////void idAFBody::AddForce( const idVec3 &point, const idVec3 &force ) {
////	this.current.externalForce.SubVec3(0) += force;
////	this.current.externalForce.SubVec3(1) += (point - this.current.worldOrigin).Cross( force );
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
////	if ( this.fl.spatialInertiaSparse ) {
////		dstPtr[0] = mPtr[0*6+0] * vPtr[0];
////		dstPtr[1] = mPtr[1*6+1] * vPtr[1];
////		dstPtr[2] = mPtr[2*6+2] * vPtr[2];
////		dstPtr[3] = mPtr[3*6+3] * vPtr[3] + mPtr[3*6+4] * vPtr[4] + mPtr[3*6+5] * vPtr[5];
////		dstPtr[4] = mPtr[4*6+3] * vPtr[3] + mPtr[4*6+4] * vPtr[4] + mPtr[4*6+5] * vPtr[5];
////		dstPtr[5] = mPtr[5*6+3] * vPtr[3] + mPtr[5*6+4] * vPtr[4] + mPtr[5*6+5] * vPtr[5];
////	} else {
////		gameLocal.Warning( "spatial inertia is not sparse for body %s", this.name.c_str() );
////	}
////}
////
/////*
////================
////idAFBody::Save
////================
////*/
////void idAFBody::Save( idSaveGame *saveFile ) {
////	saveFile.WriteFloat( this.linearFriction );
////	saveFile.WriteFloat( this.angularFriction );
////	saveFile.WriteFloat( this.contactFriction );
////	saveFile.WriteFloat( this.bouncyness );
////	saveFile.WriteInt( clipMask );
////	saveFile.WriteVec3( frictionDir );
////	saveFile.WriteVec3( this.contactMotorDir );
////	saveFile.WriteFloat( this.contactMotorVelocity );
////	saveFile.WriteFloat( this.contactMotorForce );
////
////	saveFile.WriteFloat( this.mass );
////	saveFile.WriteFloat( this.invMass );
////	saveFile.WriteVec3( this.centerOfMass );
////	saveFile.WriteMat3( this.inertiaTensor );
////	saveFile.WriteMat3( this.inverseInertiaTensor );
////
////	saveFile.WriteVec3( this.current.worldOrigin );
////	saveFile.WriteMat3( this.current.worldAxis );
////	saveFile.WriteVec6( this.current.spatialVelocity );
////	saveFile.WriteVec6( this.current.externalForce );
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
////	saveFile.ReadFloat( this.linearFriction );
////	saveFile.ReadFloat( this.angularFriction );
////	saveFile.ReadFloat( this.contactFriction );
////	saveFile.ReadFloat( this.bouncyness );
////	saveFile.ReadInt( clipMask );
////	saveFile.ReadVec3( frictionDir );
////	saveFile.ReadVec3( this.contactMotorDir );
////	saveFile.ReadFloat( this.contactMotorVelocity );
////	saveFile.ReadFloat( this.contactMotorForce );
////
////	saveFile.ReadFloat( this.mass );
////	saveFile.ReadFloat( this.invMass );
////	saveFile.ReadVec3( this.centerOfMass );
////	saveFile.ReadMat3( this.inertiaTensor );
////	saveFile.ReadMat3( this.inverseInertiaTensor );
////
////	saveFile.ReadVec3( this.current.worldOrigin );
////	saveFile.ReadMat3( this.current.worldAxis );
////	saveFile.ReadVec6( this.current.spatialVelocity );
////	saveFile.ReadVec6( this.current.externalForce );
////	saveFile.ReadVec3( atRestOrigin );
////	saveFile.ReadMat3( atRestAxis );
////}
////
////
};




//===============================================================
//
//	idAFTree
//
//===============================================================

class idAFTree {
////	friend class idPhysics_AF;
////
////public:
////	void					Factor( ) const;
////	void					Solve( int auxiliaryIndex = 0 ) const;
////	void					Response( const idAFConstraint *constraint, int row, int auxiliaryIndex ) const;
////	void					CalculateForces( float timeStep ) const;
////	void					SetMaxSubTreeAuxiliaryIndex( );
////	void					SortBodies( );
////	void					SortBodies_r( idList<idAFBody*>&sortedList, idAFBody *body );
////	void					DebugDraw( const idVec4 &color ) const;
////
////private:
	sortedBodies = new idList<idAFBody>(idAFBody, true);
};


//===============================================================
//
//	idPhysics_AF
//
//===============================================================

class AFPState_t {
	atRest: number /*int*/; // >= 0 if articulated figure is at rest
	noMoveTime: number /*float*/; // time the articulated figure is hardly moving
	activateTime: number /*float*/; // time since last activation
	lastTimeStep: number /*float*/; // last time step
	pushVelocity = new idVec6 ( ); // velocity with which the af is pushed

	memset0 ( ): void {
		this.atRest = this.noMoveTime = this.activateTime = this.lastTimeStep = 0;
		this.pushVelocity.Zero ( );
	}
}

class AFCollision_t{
	trace = new trace_t;
	body: idAFBody;
}


class idPhysics_AF extends idPhysics_Base {
////
////public:
////	CLASS_PROTOTYPE( idPhysics_AF );
////
////							idPhysics_AF( );
////							~idPhysics_AF( );
////
////	void					Save( idSaveGame *savefile ) const;
////	void					Restore( idRestoreGame *savefile );
////
////							// initialisation
////	int						AddBody( idAFBody *body );	// returns body id
////	void					AddConstraint( idAFConstraint *constraint );
////	void					AddFrameConstraint( idAFConstraint *constraint );
////							// force a body to have a certain id
////	void					ForceBodyId( idAFBody *body, int newId );
////							// get body or constraint id
////	int						GetBodyId( idAFBody *body ) const;
////	int						GetBodyId( const char *bodyName ) const;
////	int						GetConstraintId( idAFConstraint *constraint ) const;
////	int						GetConstraintId( const char *constraintName ) const;
////							// number of bodies and constraints
////	int						GetNumBodies( ) const;
////	int						GetNumConstraints( ) const;
////							// retrieve body or constraint
////	idAFBody *				GetBody( const char *bodyName ) const;
////	idAFBody *				GetBody( /*int*/ id:number ) const;
////	idAFBody *				GetMasterBody( ) const { return this.masterBody; }
////	idAFConstraint *		GetConstraint( const char *constraintName ) const;
////	idAFConstraint *		GetConstraint( /*int*/ id:number ) const;
////							// delete body or constraint
////	void					DeleteBody( const char *bodyName );
////	void					DeleteBody( /*int*/ id:number );
////	void					DeleteConstraint( const char *constraintName );
////	void					DeleteConstraint( /*int*/ id:number );
////							// get all the contact constraints acting on the body
////	int						GetBodyContactConstraints( /*int*/ id:number, idAFConstraint_Contact *contacts[], int maxContacts ) const;
////							// set the default friction for bodies
////	void					SetDefaultFriction( float linear, float angular, float contact );
////							// suspend settings
////	void					SetSuspendSpeed( const idVec2 &velocity, const idVec2 &acceleration );
////							// set the time and tolerances used to determine if the simulation can be suspended when the figure hardly moves for a while
////	void					SetSuspendTolerance( const float noMoveTime, const float translationTolerance, const float rotationTolerance );
////							// set minimum and maximum simulation time in seconds
////	void					SetSuspendTime( const float minTime, const float maxTime );
////							// set the time scale value
////	void					SetTimeScale( const float ts ) { this.timeScale = ts; }
////							// set time scale ramp
////	void					SetTimeScaleRamp( const float start, const float end );
////							// set the joint friction scale
////	void					SetJointFrictionScale( const float scale ) { this.jointFrictionScale = scale; }
////							// set joint friction dent
////	void					SetJointFrictionDent( const float dent, const float start, const float end );
////							// get the current joint friction scale
////	float					GetJointFrictionScale( ) const;
////							// set the contact friction scale
////	void					SetContactFrictionScale( const float scale ) { this.contactFrictionScale = scale; }
////							// set contact friction dent
////	void					SetContactFrictionDent( const float dent, const float start, const float end );
////							// get the current contact friction scale
////	float					GetContactFrictionScale( ) const;
							// enable or disable collision detection
	SetCollision ( enable: boolean ): void { this.enableCollision = enable; }
	// enable or disable self collision
	SetSelfCollision ( enable: boolean ): void { this.selfCollision = enable; }
	// enable or disable coming to a dead stop
	SetComeToRest( enable :boolean) { this.comeToRest = enable; }
	// call when structure of articulated figure changes
	SetChanged ( ): void { this.changedAF = true; }
////							// enable/disable activation by impact
////	void					EnableImpact( );
////	void					DisableImpact( );
////							// lock of unlock the world constraints
////	void					LockWorldConstraints( const bool lock ) { this.worldConstraintsLocked = lock; }
////							// set force pushable
////	void					SetForcePushable( const bool enable ) { this.forcePushable = enable; }
////							// update the clip model positions
////	void					UpdateClipModels( );
////
////public:	// common physics interface
////	void					SetClipModel( idClipModel *model, float density, /*int*/ id:number = 0, bool freeOld = true );
////	idClipModel *			GetClipModel( /*int*/ id:number = 0 ) const;
////	int						GetNumClipModels( ) const;
////
////	void					SetMass( float mass, /*int*/ id:number = -1 );
////	float					GetMass( /*int*/ id:number = -1 ) const;
////
////	void					SetContents( int contents, /*int*/ id:number = -1 );
////	int						GetContents( /*int*/ id:number = -1 ) const;
////
////	const idBounds &		GetBounds( /*int*/ id:number = -1 ) const;
////	const idBounds &		GetAbsBounds( /*int*/ id:number = -1 ) const;
////
////	bool					Evaluate( int timeStepMSec, int endTimeMSec );
////	void					UpdateTime( int endTimeMSec );
////	int						GetTime( ) const;
////
////	void					GetImpactInfo( /*int*/ id:number, const idVec3 &point, impactInfo_t *info ) const;
////	void					ApplyImpulse( /*int*/ id:number, const idVec3 &point, const idVec3 &impulse );
////	void					AddForce( /*int*/ id:number, const idVec3 &point, const idVec3 &force );
////	bool					IsAtRest( ) const;
////	int						GetRestStartTime( ) const;
////	void					Activate( );
////	void					PutToRest( );
////	bool					IsPushable( ) const;
////
////	void					SaveState( );
////	void					RestoreState( );
////
////	void					SetOrigin( const idVec3 &newOrigin, /*int*/ id:number = -1 );
////	void					SetAxis( const idMat3 &newAxis, /*int*/ id:number = -1 );
////
////	void					Translate( const idVec3 &translation, /*int*/ id:number = -1 );
////	void					Rotate( const idRotation &rotation, /*int*/ id:number = -1 );
////
////	const idVec3 &			GetOrigin( /*int*/ id:number = 0 ) const;
////	const idMat3 &			GetAxis( /*int*/ id:number = 0 ) const;
////
////	void					SetLinearVelocity( const idVec3 &newLinearVelocity, /*int*/ id:number = 0 );
////	void					SetAngularVelocity( const idVec3 &newAngularVelocity, /*int*/ id:number = 0 );
////
////	const idVec3 &			GetLinearVelocity( /*int*/ id:number = 0 ) const;
////	const idVec3 &			GetAngularVelocity( /*int*/ id:number = 0 ) const;
////
////	void					ClipTranslation( trace_t &results, const idVec3 &translation, const idClipModel *model ) const;
////	void					ClipRotation( trace_t &results, const idRotation &rotation, const idClipModel *model ) const;
////	int						ClipContents( const idClipModel *model ) const;
////
////	void					DisableClip( );
////	void					EnableClip( );
////
////	void					UnlinkClip( );
////	void					LinkClip( );
////
////	bool					EvaluateContacts( );
////
////	void					SetPushed( int deltaTime );
////	const idVec3 &			GetPushedLinearVelocity( /*int*/ id:number = 0 ) const;
////	const idVec3 &			GetPushedAngularVelocity( /*int*/ id:number = 0 ) const;
////
////	void					SetMaster( idEntity *master, const bool orientated = true );
////
////	void					WriteToSnapshot( idBitMsgDelta &msg ) const;
////	void					ReadFromSnapshot( const idBitMsgDelta &msg );
////
////private:
	// articulated figure
	trees = new idList<idAFTree>(idAFTree, true);							// tree structures
	bodies = new idList<idAFBody>(idAFBody,true);							// all bodies
	constraints = new idList<idAFConstraint>(idAFConstraint, true);					// all frame independent constraints
	primaryConstraints = new idList<idAFConstraint>(idAFConstraint, true);				// list with primary constraints
	auxiliaryConstraints = new idList<idAFConstraint>(idAFConstraint, true);			// list with auxiliary constraints
	frameConstraints = new idList<idAFConstraint>(idAFConstraint, true);				// constraints that only live one frame
	contactConstraints = new idList<idAFConstraint_Contact>(idAFConstraint_Contact, true);		// contact constraints
	contactBodies = new idList</*int*/number>(Number);					// body id for each contact
	collisions = new idList<AFCollision_t>(AFCollision_t);						// collisions
	changedAF:boolean;						// true when the articulated figure just changed
	
	// properties
	linearFriction: number/*float*/;					// default translational friction
	angularFriction: number/*float*/;				// default rotational friction
	contactFriction: number/*float*/;				// default friction with contact surfaces
	bouncyness: number/*float*/;						// default bouncyness
	totalMass: number/*float*/;						// total mass of articulated figure
	forceTotalMass: number/*float*/;					// force this total mass

	suspendVelocity = new idVec2;				// simulation may not be suspended if a body has more velocity
	suspendAcceleration = new idVec2;			// simulation may not be suspended if a body has more acceleration
	noMoveTime: number/*float*/;						// suspend simulation if hardly any movement for this many seconds
	noMoveTranslation: number/*float*/;				// maximum translation considered no movement
	noMoveRotation: number/*float*/;					// maximum rotation considered no movement
	minMoveTime: number/*float*/;					// if > 0 the simulation is never suspended before running this many seconds
	maxMoveTime: number/*float*/;					// if > 0 the simulation is always suspeded after running this many seconds
	impulseThreshold: number/*float*/;				// threshold below which impulses are ignored to avoid continuous activation

	timeScale: number/*float*/;						// the time is scaled with this value for slow motion effects
	timeScaleRampStart: number/*float*/;				// start of time scale change
	timeScaleRampEnd: number/*float*/;				// end of time scale change

	jointFrictionScale: number/*float*/;				// joint friction scale
	jointFrictionDent: number/*float*/;				// joint friction dives from 1 to this value and goes up again
	jointFrictionDentStart: number/*float*/;			// start time of joint friction dent
	jointFrictionDentEnd: number/*float*/;			// end time of joint friction dent
	jointFrictionDentScale: number/*float*/;			// dent scale

	contactFrictionScale: number/*float*/;			// contact friction scale
	contactFrictionDent: number/*float*/;			// contact friction dives from 1 to this value and goes up again
	contactFrictionDentStart: number/*float*/;		// start time of contact friction dent
	contactFrictionDentEnd: number/*float*/;			// end time of contact friction dent
	contactFrictionDentScale: number/*float*/;		// dent scale

	enableCollision: boolean;				// if true collision detection is enabled
	selfCollision: boolean;					// if true the self collision is allowed
	comeToRest: boolean;						// if true the figure can come to rest
	linearTime: boolean;						// if true use the linear time algorithm
	noImpact: boolean;						// if true do not activate when another object collides
	worldConstraintsLocked: boolean;			// if true world constraints cannot be moved
	forcePushable:boolean;					// if true can be pushed even when bound to a master
////
	// physics state
	current = new AFPState_t;
	saved = new AFPState_t;

	masterBody:idAFBody;						// master body
	lcp: idLCP;							// linear complementarity problem solver
////
////private:
////	void					BuildTrees( );
////	bool					IsClosedLoop( const idAFBody *body1, const idAFBody *body2 ) const;
////	void					PrimaryFactor( );
////	void					EvaluateBodies( float timeStep );
////	void					EvaluateConstraints( float timeStep );
////	void					AddFrameConstraints( );
////	void					RemoveFrameConstraints( );
////	void					ApplyFriction( float timeStep, float endTimeMSec );
////	void					PrimaryForces( float timeStep  );
////	void					AuxiliaryForces( float timeStep );
////	void					VerifyContactConstraints( );
////	void					SetupContactConstraints( );
////	void					ApplyContactForces( );
////	void					Evolve( float timeStep );
////	idEntity *				SetupCollisionForBody( idAFBody *body ) const;
////	bool					CollisionImpulse( float timeStep, idAFBody *body, trace_t &collision );
////	bool					ApplyCollisions( float timeStep );
////	void					CheckForCollisions( float timeStep );
////	void					ClearExternalForce( );
////	void					AddGravity( );
////	void					SwapStates( );
////	bool					TestIfAtRest( float timeStep );
////	void					Rest( );
////	void					AddPushVelocity( const idVec6 &pushVelocity );
////	void					DebugDraw( );

	//////===============================================================
	//////                                                        M
	//////  idPhysics_AF                                         MrE
	//////                                                        E
	//////===============================================================
	////
	/////*
	////================
	////idPhysics_AF::EvaluateConstraints
	////================
	////*/
	////void idPhysics_AF::EvaluateConstraints( float timeStep ) {
	////	var/*int*/i:number;
	////	var/*float */invTimeStep:number;
	////	var body:idAFBody;
	////	idAFConstraint *c;
	////
	////	invTimeStep = 1.0 / timeStep;
	////
	////	// setup the constraint equations for the current position and orientation of the bodies
	////	for ( i = 0; i < this.primaryConstraints.Num(); i++ ) {
	////		c = this.primaryConstraints[i];
	////		c.Evaluate( invTimeStep );
	////		c.J = c.this.J2;
	////	}
	////	for ( i = 0; i < this.auxiliaryConstraints.Num(); i++ ) {
	////		this.auxiliaryConstraints[i].Evaluate( invTimeStep );
	////	}
	////
	////	// add contact constraints to the list with frame constraints
	////	for ( i = 0; i < this.contactConstraints.Num(); i++ ) {
	////		AddFrameConstraint( this.contactConstraints[i] );
	////	}
	////
	////	// setup body primary constraint matrix
	////	for ( i = 0; i < bodies.Num(); i++ ) {
	////		body = bodies[i];
	////
	////		if ( body.primaryConstraint ) {
	////			body.J = body.primaryConstraint.J1.Transpose();
	////		}
	////	}
	////}
	////
	/////*
	////================
	////idPhysics_AF::EvaluateBodies
	////================
	////*/
	////void idPhysics_AF::EvaluateBodies( float timeStep ) {
	////	var/*int*/i:number;
	////	var body:idAFBody;
	////	idMat3 axis;
	////
	////	for ( i = 0; i < bodies.Num(); i++ ) {
	////		body = bodies[i];
	////
	////		// we transpose the axis before using it because idMat3 is column-major
	////		axis = body.current.worldAxis.Transpose();
	////
	////		// if the center of mass is at the body point of reference
	////		if ( body.centerOfMass.Compare( vec3_origin, CENTER_OF_MASS_EPSILON ) ) {
	////
	////			// spatial inertia in world space
	////			body.I.Set( body.mass * mat3_identity, mat3_zero,
	////							mat3_zero, axis * body.inertiaTensor * axis.Transpose() );
	////
	////			// inverse spatial inertia in world space
	////			body.inverseWorldSpatialInertia.Set( body.invMass * mat3_identity, mat3_zero,
	////											mat3_zero, axis * body.inverseInertiaTensor * axis.Transpose() );
	////
	////			body.fl.spatialInertiaSparse = true;
	////		}
	////		else {
	////			idMat3 massMoment = body.mass * SkewSymmetric( body.centerOfMass );
	////
	////			// spatial inertia in world space
	////			body.I.Set( body.mass * mat3_identity, massMoment,
	////								massMoment.Transpose(), axis * body.inertiaTensor * axis.Transpose() );
	////
	////			// inverse spatial inertia in world space
	////			body.inverseWorldSpatialInertia = body.I.InverseFast();
	////
	////			body.fl.spatialInertiaSparse = false;
	////		}
	////
	////		// initialize auxiliary constraint force to zero
	////		body.auxForce.Zero();
	////	}
	////}
	////
	/////*
	////================
	////idPhysics_AF::AddFrameConstraints
	////================
	////*/
	////void idPhysics_AF::AddFrameConstraints( ) {
	////	var/*int*/i:number;
	////
	////	// add frame constraints to auxiliary constraints
	////	for ( i = 0; i < this.frameConstraints.Num(); i++ ) {
	////		this.auxiliaryConstraints.Append( this.frameConstraints[i] );
	////	}
	////}
	////
	/////*
	////================
	////idPhysics_AF::RemoveFrameConstraints
	////================
	////*/
	////void idPhysics_AF::RemoveFrameConstraints( ) {
	////	// remove all the frame constraints from the auxiliary constraints
	////	this.auxiliaryConstraints.SetNum( this.auxiliaryConstraints.Num() - this.frameConstraints.Num(), false );
	////	this.frameConstraints.SetNum( 0, false );
	////}
	////
	/////*
	////================
	////idPhysics_AF::ApplyFriction
	////================
	////*/
	////void idPhysics_AF::ApplyFriction( float timeStep, float endTimeMSec ) {
	////	var/*int*/i:number;
	////	float invTimeStep;
	////
	////	if ( af_skipFriction.GetBool() ) {
	////		return;
	////	}
	////
	////	if ( this.jointFrictionDentStart < MS2SEC( endTimeMSec ) && this.jointFrictionDentEnd > MS2SEC( endTimeMSec ) ) {
	////		float halfTime = ( this.jointFrictionDentEnd - this.jointFrictionDentStart ) * 0.f;
	////		if ( this.jointFrictionDentStart + halfTime > MS2SEC( endTimeMSec ) ) {
	////			this.jointFrictionDentScale = 1.0 - ( 1.0 - this.jointFrictionDent ) * ( MS2SEC( endTimeMSec ) - this.jointFrictionDentStart ) / halfTime;
	////		} else {
	////			this.jointFrictionDentScale = this.jointFrictionDent + ( 1.0 - this.jointFrictionDent ) * ( MS2SEC( endTimeMSec ) - this.jointFrictionDentStart - halfTime ) / halfTime;
	////		}
	////	} else {
	////		this.jointFrictionDentScale = 0.0;
	////	}
	////
	////	if ( this.contactFrictionDentStart < MS2SEC( endTimeMSec ) && this.contactFrictionDentEnd > MS2SEC( endTimeMSec ) ) {
	////		float halfTime = ( this.contactFrictionDentEnd - this.contactFrictionDentStart ) * 0.f;
	////		if ( this.contactFrictionDentStart + halfTime > MS2SEC( endTimeMSec ) ) {
	////			contactFrictionDentScale = 1.0 - ( 1.0 - this.contactFrictionDent ) * ( MS2SEC( endTimeMSec ) - this.contactFrictionDentStart ) / halfTime;
	////		} else {
	////			contactFrictionDentScale = this.contactFrictionDent + ( 1.0 - this.contactFrictionDent ) * ( MS2SEC( endTimeMSec ) - this.contactFrictionDentStart - halfTime ) / halfTime;
	////		}
	////	} else {
	////		contactFrictionDentScale = 0.0;
	////	}
	////
	////	invTimeStep = 1.0 / timeStep;
	////
	////	for ( i = 0; i < this.primaryConstraints.Num(); i++ ) {
	////		this.primaryConstraints[i].ApplyFriction( invTimeStep );
	////	}
	////	for ( i = 0; i < this.auxiliaryConstraints.Num(); i++ ) {
	////		this.auxiliaryConstraints[i].ApplyFriction( invTimeStep );
	////	}
	////	for ( i = 0; i < this.frameConstraints.Num(); i++ ) {
	////		this.frameConstraints[i].ApplyFriction( invTimeStep );
	////	}
	////}
	////
	/////*
	////================
	////idPhysics_AF::PrimaryFactor
	////================
	////*/
	////void idPhysics_AF::PrimaryFactor( ) {
	////	var/*int*/i:number;
	////
	////	for ( i = 0; i < this.trees.Num(); i++ ) {
	////		this.trees[i].Factor();
	////	}
	////}
	////
	/////*
	////================
	////idPhysics_AF::PrimaryForces
	////================
	////*/
	////void idPhysics_AF::PrimaryForces( float timeStep ) {
	////	var/*int*/i:number;
	////
	////	for ( i = 0; i < this.trees.Num(); i++ ) {
	////		this.trees[i].CalculateForces( timeStep );
	////	}
	////}
	////
	/////*
	////================
	////idPhysics_AF::AuxiliaryForces
	////================
	////*/
	////void idPhysics_AF::AuxiliaryForces( float timeStep ) {
	////	int i, j, k, l, n, m, s, numAuxConstraints, *index, *boxIndex;
	////	float *ptr, *j1, *j2, *dstPtr, *forcePtr;
	////	float invStep, u;
	////	var body:idAFBody;
	////	var constraint:idAFConstraint ;
	////	idVecX tmp;
	////	idMatX jmk;
	////	idVecX rhs, w, lm, lo, hi;
	////
	////	// get the number of one dimensional auxiliary constraints
	////	for ( numAuxConstraints = 0, i = 0; i < this.auxiliaryConstraints.Num(); i++ ) {
	////		numAuxConstraints += this.auxiliaryConstraints[i].J1.GetNumRows();
	////	}
	////
	////	if ( numAuxConstraints == 0 ) {
	////		return;
	////	}
	////
	////	// allocate memory to store the body response to auxiliary constraint forces
	////	forcePtr = (float *) _alloca16( bodies.Num() * numAuxConstraints * 8 * sizeof( float ) );
	////	index = (int *) _alloca16( bodies.Num() * numAuxConstraints * sizeof( int ) );
	////	for ( i = 0; i < bodies.Num(); i++ ) {
	////		body = bodies[i];
	////		body.response = forcePtr;
	////		body.responseIndex = index;
	////		body.numResponses = 0;
	////		body.maxAuxiliaryIndex = 0;
	////		forcePtr += numAuxConstraints * 8;
	////		index += numAuxConstraints;
	////	}
	////
	////	// set on each body the largest index of an auxiliary constraint constraining the body
	////	if ( af_useSymmetry.GetBool() ) {
	////		for ( k = 0, i = 0; i < this.auxiliaryConstraints.Num(); i++ ) {
	////			constraint = this.auxiliaryConstraints[i];
	////			for ( j = 0; j < constraint.J1.GetNumRows(); j++, k++ ) {
	////				if ( k > constraint.body1.maxAuxiliaryIndex ) {
	////					constraint.body1.maxAuxiliaryIndex = k;
	////				}
	////				if ( constraint.body2 && k > constraint.body2.maxAuxiliaryIndex ) {
	////					constraint.body2.maxAuxiliaryIndex = k;
	////				}
	////			}
	////		}
	////		for ( i = 0; i < this.trees.Num(); i++ ) {
	////			this.trees[i].SetMaxSubTreeAuxiliaryIndex();
	////		}
	////	}
	////
	////	// calculate forces of primary constraints in response to the auxiliary constraint forces
	////	for ( k = 0, i = 0; i < this.auxiliaryConstraints.Num(); i++ ) {
	////		constraint = this.auxiliaryConstraints[i];
	////
	////		for ( j = 0; j < constraint.J1.GetNumRows(); j++, k++ ) {
	////
	////			// calculate body forces in the tree in response to the constraint force
	////			constraint.body1.tree.Response( constraint, j, k );
	////			// if there is a second body which is part of a different tree
	////			if ( constraint.body2 && constraint.body2.tree != constraint.body1.tree ) {
	////				// calculate body forces in the second tree in response to the constraint force
	////				constraint.body2.tree.Response( constraint, j, k );
	////			}
	////		}
	////	}
	////
	////	// NOTE: the rows are 16 byte padded
	////	jmk.SetData( numAuxConstraints, ((numAuxConstraints+3)&~3), MATX_ALLOCA( numAuxConstraints * ((numAuxConstraints+3)&~3) ) );
	////	tmp.SetData( 6, VECX_ALLOCA( 6 ) );
	////
	////	// create constraint matrix for auxiliary constraints using a mass matrix adjusted for the primary constraints
	////	for ( k = 0, i = 0; i < this.auxiliaryConstraints.Num(); i++ ) {
	////		constraint = this.auxiliaryConstraints[i];
	////
	////		for ( j = 0; j < constraint.J1.GetNumRows(); j++, k++ ) {
	////			constraint.body1.InverseWorldSpatialInertiaMultiply( tmp, constraint.J1[j] );
	////			j1 = tmp.ToFloatPtr();
	////			ptr = constraint.body1.response;
	////			index = constraint.body1.responseIndex;
	////			dstPtr = jmk[k];
	////			s = af_useSymmetry.GetBool() ? k + 1 : numAuxConstraints;
	////			for ( l = n = 0, m = index[n]; n < constraint.body1.numResponses && m < s; n++, m = index[n] ) {
	////				while( l < m ) {
	////					dstPtr[l++] = 0.0;
	////				}
	////				dstPtr[l++] = j1[0] * ptr[0] + j1[1] * ptr[1] + j1[2] * ptr[2] +
	////								j1[3] * ptr[3] + j1[4] * ptr[4] + j1[5] * ptr[5];
	////				ptr += 8;
	////			}
	////
	////			while( l < s ) {
	////				dstPtr[l++] = 0.0;
	////			}
	////
	////			if ( constraint.body2 ) {
	////				constraint.body2.InverseWorldSpatialInertiaMultiply( tmp, constraint.this.J2[j] );
	////				j2 = tmp.ToFloatPtr();
	////				ptr = constraint.body2.response;
	////				index = constraint.body2.responseIndex;
	////				for ( n = 0, m = index[n]; n < constraint.body2.numResponses && m < s; n++, m = index[n] ) {
	////					dstPtr[m] += j2[0] * ptr[0] + j2[1] * ptr[1] + j2[2] * ptr[2] +
	////										j2[3] * ptr[3] + j2[4] * ptr[4] + j2[5] * ptr[5];
	////					ptr += 8;
	////				}
	////			}
	////		}
	////	}
	////
	////	if ( af_useSymmetry.GetBool() ) {
	////		n = jmk.GetNumColumns();
	////		for ( i = 0; i < numAuxConstraints; i++ ) {
	////			ptr = jmk.ToFloatPtr() + ( i + 1 ) * n + i;
	////			dstPtr = jmk.ToFloatPtr() + i * n + i + 1;
	////			for ( j = i+1; j < numAuxConstraints; j++ ) {
	////				*dstPtr++ = *ptr;
	////				ptr += n;
	////			}
	////		}
	////	}
	////
	////	invStep = 1.0 / timeStep;
	////
	////	// calculate body acceleration
	////	for ( i = 0; i < bodies.Num(); i++ ) {
	////		body = bodies[i];
	////		body.InverseWorldSpatialInertiaMultiply( body.acceleration, body.totalForce.ToFloatPtr() );
	////		body.acceleration.SubVec6(0) += body.current.spatialVelocity * invStep;
	////	}
	////
	////	rhs.SetData( numAuxConstraints, VECX_ALLOCA( numAuxConstraints ) );
	////	lo.SetData( numAuxConstraints, VECX_ALLOCA( numAuxConstraints ) );
	////	hi.SetData( numAuxConstraints, VECX_ALLOCA( numAuxConstraints ) );
	////	lm.SetData( numAuxConstraints, VECX_ALLOCA( numAuxConstraints ) );
	////	boxIndex = (int *) _alloca16( numAuxConstraints * sizeof( int ) );
	////
	////	// set first index for special box constrained variables
	////	for ( k = 0, i = 0; i < this.auxiliaryConstraints.Num(); i++ ) {
	////		this.auxiliaryConstraints[i].firstIndex = k;
	////		k += this.auxiliaryConstraints[i].J1.GetNumRows();
	////	}
	////
	////	// initialize right hand side and low and high bounds for auxiliary constraints
	////	for ( k = 0, i = 0; i < this.auxiliaryConstraints.Num(); i++ ) {
	////		constraint = this.auxiliaryConstraints[i];
	////		n = k;
	////
	////		for ( j = 0; j < constraint.J1.GetNumRows(); j++, k++ ) {
	////
	////			j1 = constraint.J1[j];
	////			ptr = constraint.body1.acceleration.ToFloatPtr();
	////			rhs[k] = j1[0] * ptr[0] + j1[1] * ptr[1] + j1[2] * ptr[2] + j1[3] * ptr[3] + j1[4] * ptr[4] + j1[5] * ptr[5];
	////			rhs[k] += constraint.c1[j] * invStep;
	////
	////			if ( constraint.body2 ) {
	////				j2 = constraint.this.J2[j];
	////				ptr = constraint.body2.acceleration.ToFloatPtr();
	////				rhs[k] += j2[0] * ptr[0] + j2[1] * ptr[1] + j2[2] * ptr[2] + j2[3] * ptr[3] + j2[4] * ptr[4] + j2[5] * ptr[5];
	////				rhs[k] += constraint.c2[j] * invStep;
	////			}
	////
	////			rhs[k] = -rhs[k];
	////			lo[k] = constraint.lo[j];
	////			hi[k] = constraint.hi[j];
	////
	////			if ( constraint.boxIndex[j] >= 0 ) {
	////				if ( constraint.boxConstraint.fl.isPrimary ) {
	////					gameLocal.Error( "cannot reference primary constraints for the box index" );
	////				}
	////				boxIndex[k] = constraint.boxConstraint.firstIndex + constraint.boxIndex[j];
	////			}
	////			else {
	////				boxIndex[k] = -1;
	////			}
	////			jmk[k][k] += constraint.e[j] * invStep;
	////		}
	////	}
	////
	////#ifdef AF_TIMINGS
	////	timer_lcp.Start();
	////#endif
	////
	////	// calculate lagrange multipliers for auxiliary constraints
	////	if ( !this.lcp.Solve( jmk, lm, rhs, lo, hi, boxIndex ) ) {
	////		return;		// bad monkey!
	////	}
	////
	////#ifdef AF_TIMINGS
	////	timer_lcp.Stop();
	////#endif
	////
	////	// calculate auxiliary constraint forces
	////	for ( k = 0, i = 0; i < this.auxiliaryConstraints.Num(); i++ ) {
	////		constraint = this.auxiliaryConstraints[i];
	////
	////		for ( j = 0; j < constraint.J1.GetNumRows(); j++, k++ ) {
	////			constraint.lm[j] = u = lm[k];
	////
	////			j1 = constraint.J1[j];
	////			ptr = constraint.body1.auxForce.ToFloatPtr();
	////			ptr[0] += j1[0] * u; ptr[1] += j1[1] * u; ptr[2] += j1[2] * u;
	////			ptr[3] += j1[3] * u; ptr[4] += j1[4] * u; ptr[5] += j1[5] * u;
	////
	////			if ( constraint.body2 ) {
	////				j2 = constraint.this.J2[j];
	////				ptr = constraint.body2.auxForce.ToFloatPtr();
	////				ptr[0] += j2[0] * u; ptr[1] += j2[1] * u; ptr[2] += j2[2] * u;
	////				ptr[3] += j2[3] * u; ptr[4] += j2[4] * u; ptr[5] += j2[5] * u;
	////			}
	////		}
	////	}
	////
	////	// recalculate primary constraint forces in response to auxiliary constraint forces
	////	PrimaryForces( timeStep );
	////
	////	// clear pointers pointing to stack space so tools don't get confused
	////	for ( i = 0; i < bodies.Num(); i++ ) {
	////		body = bodies[i];
	////		body.response = NULL;
	////		body.responseIndex = NULL;
	////	}
	////}
	////
	/////*
	////================
	////idPhysics_AF::VerifyContactConstraints
	////================
	////*/
	////void idPhysics_AF::VerifyContactConstraints( ) {
	////#if 0
	////	var/*int*/i:number;
	////	float impulseNumerator, impulseDenominator;
	////	idVec3 r, velocity, normalVelocity, normal, impulse;
	////	var body:idAFBody ;
	////
	////	for ( i = 0; i < this.contactConstraints.Num(); i++ ) {
	////		body = this.contactConstraints[i].body1;
	////		const this.contactInfo_t &contact = this.contactConstraints[i].GetContact();
	////
	////		r = this.contact.point - body.GetCenterOfMass();
	////
	////		// calculate velocity at contact point
	////		velocity = body.GetLinearVelocity() + body.GetAngularVelocity().Cross( r );
	////
	////		// velocity along normal vector
	////		normalVelocity = ( velocity * this.contact.normal ) * this.contact.normal;
	////
	////		// if moving towards the surface at the contact point
	////		if ( normalVelocity * this.contact.normal < 0.0 ) {
	////			// calculate impulse
	////			normal = -normalVelocity;
	////			impulseNumerator = normal.Normalize();
	////			impulseDenominator = body.GetInverseMass() + ( ( body.GetInverseWorldInertia() * r.Cross( normal ) ).Cross( r ) * normal );
	////			impulse = (impulseNumerator / impulseDenominator) * normal * 1.0001f;
	////
	////			// apply impulse
	////			body.SetLinearVelocity( body.GetLinearVelocity() + impulse );
	////			body.SetAngularVelocity( body.GetAngularVelocity() + r.Cross( impulse ) );
	////		}
	////	}
	////#else
	////	var/*int*/i:number;
	////	var body:idAFBody ;
	////	idVec3 normal;
	////
	////	for ( i = 0; i < this.contactConstraints.Num(); i++ ) {
	////		body = this.contactConstraints[i].body1;
	////		normal = this.contactConstraints[i].GetContact().normal;
	////		if ( normal * body.next.spatialVelocity.SubVec3(0) <= 0.0 ) {
	////			body.next.spatialVelocity.SubVec3(0) -= 1.0001f * (normal * body.next.spatialVelocity.SubVec3(0)) * normal;
	////		}
	////		body = this.contactConstraints[i].body2;
	////		if ( !body ) {
	////			continue;
	////		}
	////		normal = -normal;
	////		if ( normal * body.next.spatialVelocity.SubVec3(0) <= 0.0 ) {
	////			body.next.spatialVelocity.SubVec3(0) -= 1.0001f * (normal * body.next.spatialVelocity.SubVec3(0)) * normal;
	////		}
	////	}
	////#endif
	////}
	////
	/////*
	////================
	////idPhysics_AF::Evolve
	////================
	////*/
	////void idPhysics_AF::Evolve( float timeStep ) {
	////	var/*int*/i:number;
	////	float angle;
	////	idVec3 vec;
	////	var body:idAFBody;
	////	idVec6 force;
	////	idRotation rotation;
	////	float vSqr, maxLinearVelocity, maxAngularVelocity;
	////	
	////	maxLinearVelocity = af_maxLinearVelocity.GetFloat() / timeStep;
	////	maxAngularVelocity = af_maxAngularVelocity.GetFloat() / timeStep;
	////
	////	for ( i = 0; i < bodies.Num(); i++ ) {
	////		body = bodies[i];
	////
	////		// calculate the spatial velocity for the next physics state
	////		body.InverseWorldSpatialInertiaMultiply( body.acceleration, body.totalForce.ToFloatPtr() );
	////		body.next.spatialVelocity = body.current.spatialVelocity + timeStep * body.acceleration.SubVec6(0);
	////
	////		if ( maxLinearVelocity > 0.0 ) {
	////			// cap the linear velocity
	////			vSqr = body.next.spatialVelocity.SubVec3(0).LengthSqr();
	////			if ( vSqr > Square( maxLinearVelocity ) ) {
	////				body.next.spatialVelocity.SubVec3(0) *= idMath::InvSqrt( vSqr ) * maxLinearVelocity;
	////			}
	////		}
	////
	////		if ( maxAngularVelocity > 0.0 ) {
	////			// cap the angular velocity
	////			vSqr = body.next.spatialVelocity.SubVec3(1).LengthSqr();
	////			if ( vSqr > Square( maxAngularVelocity ) ) {
	////				body.next.spatialVelocity.SubVec3(1) *= idMath::InvSqrt( vSqr ) * maxAngularVelocity;
	////			}
	////		}
	////	}
	////
	////	// make absolutely sure all contact constraints are satisfied
	////	VerifyContactConstraints();
	////
	////	// calculate the position of the bodies for the next physics state
	////	for ( i = 0; i < bodies.Num(); i++ ) {
	////		body = bodies[i];
	////
	////		// translate world origin
	////		body.next.worldOrigin = body.current.worldOrigin + timeStep * body.next.spatialVelocity.SubVec3( 0 );
	////
	////		// convert angular velocity to a rotation matrix
	////		vec = body.next.spatialVelocity.SubVec3( 1 );
	////		angle = -timeStep * (float) RAD2DEG( vec.Normalize() );
	////		rotation = idRotation( vec3_origin, vec, angle );
	////		rotation.Normalize180();
	////
	////		// rotate world axis
	////		body.next.worldAxis = body.current.worldAxis * rotation.ToMat3();
	////		body.next.worldAxis.OrthoNormalizeSelf();
	////
	////		// linear and angular friction
	////		body.next.spatialVelocity.SubVec3(0) -= body.linearFriction * body.next.spatialVelocity.SubVec3(0);
	////		body.next.spatialVelocity.SubVec3(1) -= body.angularFriction * body.next.spatialVelocity.SubVec3(1);
	////	}
	////}
	////
	/////*
	////================
	////idPhysics_AF::CollisionImpulse
	////
	////  apply impulse to the colliding bodies
	////  the current state of the body should be set to the moment of impact
	////  this is silly as it doesn't take the AF structure into account
	////================
	////*/
	////bool idPhysics_AF::CollisionImpulse( float timeStep, body: idAFBody, trace_t &collision ) {
	////	idVec3 r, velocity, impulse;
	////	idMat3 inverseWorldInertiaTensor;
	////	float impulseNumerator, impulseDenominator;
	////	impactInfo_t info;
	////	idEntity *ent;
	////
	////	ent = gameLocal.entities[collision.c.entityNum];
	////	if ( ent == this.self ) {
	////		return false;
	////	}
	////
	////	// get info from other entity involved
	////	ent.GetImpactInfo( this.self, collision.c.id, collision.c.point, &info );
	////	// collision point relative to the body center of mass
	////	r = collision.c.point - (body.current.worldOrigin + body.centerOfMass * body.current.worldAxis);
	////	// the velocity at the collision point
	////	velocity = body.current.spatialVelocity.SubVec3(0) + body.current.spatialVelocity.SubVec3(1).Cross(r);
	////	// subtract velocity of other entity
	////	velocity -= info.velocity;
	////	// never stick
	////	if ( velocity * collision.c.normal > 0.0 ) {
	////		velocity = collision.c.normal;
	////	}
	////	inverseWorldInertiaTensor = body.current.worldAxis.Transpose() * body.inverseInertiaTensor * body.current.worldAxis;
	////	impulseNumerator = -( 1.0 + body.bouncyness ) * ( velocity * collision.c.normal );
	////	impulseDenominator = body.invMass + ( ( inverseWorldInertiaTensor * r.Cross( collision.c.normal ) ).Cross( r ) * collision.c.normal );
	////	if ( info.invMass ) {
	////		impulseDenominator += info.invMass + ( ( info.invInertiaTensor * info.position.Cross( collision.c.normal ) ).Cross( info.position ) * collision.c.normal );
	////	}
	////	impulse = (impulseNumerator / impulseDenominator) * collision.c.normal;
	////
	////	// apply impact to other entity
	////	ent.ApplyImpulse( this.self, collision.c.id, collision.c.point, -impulse );
	////
	////	// callback to self to let the entity know about the impact
	////	return this.self.Collide( collision, velocity );
	////}
	////
	/////*
	////================
	////idPhysics_AF::ApplyCollisions
	////================
	////*/
	////bool idPhysics_AF::ApplyCollisions( float timeStep ) {
	////	var/*int*/i:number;
	////
	////	for ( i = 0; i < this.collisions.Num(); i++ ) {
	////		if ( CollisionImpulse( timeStep, this.collisions[i].body, this.collisions[i].trace ) ) {
	////			return true;
	////		}
	////	}
	////	return false;
	////}
	////
	/////*
	////================
	////idPhysics_AF::SetupCollisionForBody
	////================
	////*/
	////idEntity *idPhysics_AF::SetupCollisionForBody( body: idAFBody ) const {
	////	var/*int*/i:number;
	////	idAFBody *b;
	////	idEntity *passEntity;
	////
	////	passEntity = NULL;
	////
	////	if ( !this.selfCollision || !body.fl.selfCollision || af_skipSelfCollision.GetBool() ) {
	////
	////		// disable all bodies
	////		for ( i = 0; i < bodies.Num(); i++ ) {
	////			bodies[i].clipModel.Disable();
	////		}
	////
	////		// don't collide with world collision model if attached to the world
	////		for ( i = 0; i < body.constraints.Num(); i++ ) {
	////			if ( !body.constraints[i].fl.noCollision ) {
	////				continue;
	////			}
	////			// if this constraint attaches the body to the world
	////			if ( body.constraints[i].body2 == NULL ) {
	////				// don't collide with the world collision model
	////				passEntity = gameLocal.world;
	////			}
	////		}
	////
	////	} else {
	////
	////		// enable all bodies that have self collision
	////		for ( i = 0; i < bodies.Num(); i++ ) {
	////			if ( bodies[i].fl.selfCollision ) {
	////				bodies[i].clipModel.Enable();
	////			} else {
	////				bodies[i].clipModel.Disable();
	////			}
	////		}
	////
	////		// don't let the body collide with itself
	////		body.clipModel.Disable();
	////
	////		// disable any bodies attached with constraints
	////		for ( i = 0; i < body.constraints.Num(); i++ ) {
	////			if ( !body.constraints[i].fl.noCollision ) {
	////				continue;
	////			}
	////			// if this constraint attaches the body to the world
	////			if ( body.constraints[i].body2 == NULL ) {
	////				// don't collide with the world collision model
	////				passEntity = gameLocal.world;
	////			} else {
	////				if ( body.constraints[i].body1 == body ) {
	////					b = body.constraints[i].body2;
	////				} else if ( body.constraints[i].body2 == body ) {
	////					b = body.constraints[i].body1;
	////				} else {
	////					continue;
	////				}
	////				// don't collide with this body
	////				b.clipModel.Disable();
	////			}
	////		}
	////	}
	////
	////	return passEntity;
	////}
	////
	/////*
	////================
	////idPhysics_AF::CheckForCollisions
	////
	////  check for collisions between the current and next state
	////  if there is a collision the next state is set to the state at the moment of impact
	////  assumes all bodies are linked for collision detection and relinks all bodies after moving them
	////================
	////*/
	////void idPhysics_AF::CheckForCollisions( float timeStep ) {
	//////	#define TEST_COLLISION_DETECTION
	////	int i, index;
	////	var body:idAFBody;
	////	idMat3 axis;
	////	idRotation rotation;
	////	trace_t collision;
	////	idEntity *passEntity;
	////
	////	// clear list with collisions
	////	this.collisions.SetNum( 0, false );
	////
	////	if ( !this.enableCollision ) {
	////		return;
	////	}
	////
	////	for ( i = 0; i < bodies.Num(); i++ ) {
	////		body = bodies[i];
	////
	////		if ( body.clipMask != 0 ) {
	////
	////			passEntity = SetupCollisionForBody( body );
	////
	////#ifdef TEST_COLLISION_DETECTION
	////			bool startsolid = false;
	////			if ( gameLocal.clip.Contents( body.current.worldOrigin, body.clipModel,
	////															body.current.worldAxis, body.clipMask, passEntity ) ) {
	////				startsolid = true;
	////			}
	////#endif
	////
	////			TransposeMultiply( body.current.worldAxis, body.next.worldAxis, axis );
	////			rotation = axis.ToRotation();
	////			rotation.SetOrigin( body.current.worldOrigin );
	////
	////			// if there was a collision
	////			if ( gameLocal.clip.Motion( collision, body.current.worldOrigin, body.next.worldOrigin, rotation,
	////										body.clipModel, body.current.worldAxis, body.clipMask, passEntity ) ) {
	////
	////				// set the next state to the state at the moment of impact
	////				body.next.worldOrigin = collision.endpos;
	////				body.next.worldAxis = collision.endAxis;
	////
	////				// add collision to the list
	////				index = this.collisions.Num();
	////				this.collisions.SetNum( index + 1, false );
	////				this.collisions[index].trace = collision;
	////				this.collisions[index].body = body;
	////			}
	////
	////#ifdef TEST_COLLISION_DETECTION
	////			if ( gameLocal.clip.Contents( body.next.worldOrigin, body.clipModel,
	////														body.next.worldAxis, body.clipMask, passEntity ) ) {
	////				if ( !startsolid ) {
	////					int bah = 1;
	////				}
	////			}
	////#endif
	////		}
	////
	////		body.clipModel.Link( gameLocal.clip, this.self, body.clipModel.GetId(), body.next.worldOrigin, body.next.worldAxis );
	////	}
	////}
	////
	/////*
	////================
	////idPhysics_AF::EvaluateContacts
	////================
	////*/
	////bool idPhysics_AF::EvaluateContacts( ) {
	////	int i, j, k, numContacts, numBodyContacts;
	////	var body:idAFBody;
	////	contactInfo_t contactInfo[10];
	////	idEntity *passEntity;
	////	idVecX dir( 6, VECX_ALLOCA( 6 ) );
	////
	////	// evaluate bodies
	////	EvaluateBodies( this.current.lastTimeStep );
	////
	////	// remove all existing contacts
	////	ClearContacts();
	////
	////	contactBodies.SetNum( 0, false );
	////
	////	if ( !this.enableCollision ) {
	////		return false;
	////	}
	////
	////	// find all the contacts
	////	for ( i = 0; i < bodies.Num(); i++ ) {
	////		body = bodies[i];
	////
	////		if ( body.clipMask == 0 ) {
	////			continue;
	////		}
	////
	////		passEntity = SetupCollisionForBody( body );
	////
	////		body.InverseWorldSpatialInertiaMultiply( dir, body.current.externalForce.ToFloatPtr() );
	////		dir.SubVec6(0) = body.current.spatialVelocity + this.current.lastTimeStep * dir.SubVec6(0);
	////		dir.SubVec3(0).Normalize();
	////		dir.SubVec3(1).Normalize();
	////
	////		numContacts = gameLocal.clip.Contacts( contactInfo, 10, body.current.worldOrigin, dir.SubVec6(0), 2.0, //CONTACT_EPSILON,
	////						body.clipModel, body.current.worldAxis, body.clipMask, passEntity );
	////
	////#if 1
	////		// merge nearby contacts between the same bodies
	////		// and assure there are at most three planar contacts between any pair of bodies
	////		for ( j = 0; j < numContacts; j++ ) {
	////
	////			numBodyContacts = 0;
	////			for ( k = 0; k < this.contacts.Num(); k++ ) {
	////				if ( this.contacts[k].entityNum == contactInfo[j].entityNum ) {
	////					if ( ( this.contacts[k].id == i && contactInfo[j].id == contactBodies[k] ) ||
	////							( contactBodies[k] == i && this.contacts[k].id == contactInfo[j].id ) ) {
	////
	////						if ( ( this.contacts[k].point - contactInfo[j].point ).LengthSqr() < Square( 2.0 ) ) {
	////							break;
	////						}
	////						if ( idMath::Fabs( this.contacts[k].normal * contactInfo[j].normal ) > 0.9f ) {
	////							numBodyContacts++;
	////						}
	////					}
	////				}
	////			}
	////
	////			if ( k >= this.contacts.Num() && numBodyContacts < 3 ) {
	////				this.contacts.Append( contactInfo[j] );
	////				contactBodies.Append( i );
	////			}
	////		}
	////
	////#else
	////
	////		for ( j = 0; j < numContacts; j++ ) {
	////			this.contacts.Append( contactInfo[j] );
	////			contactBodies.Append( i );
	////		}
	////#endif
	////
	////	}
	////
	////	AddContactEntitiesForContacts();
	////
	////	return ( this.contacts.Num() != 0 );
	////}
	////
	/////*
	////================
	////idPhysics_AF::SetupContactConstraints
	////================
	////*/
	////void idPhysics_AF::SetupContactConstraints( ) {
	////	var/*int*/i:number;
	////
	////	// make sure enough contact constraints are allocated
	////	contactConstraints.AssureSizeAlloc( this.contacts.Num(), idListNewElement<idAFConstraint_Contact> );
	////	contactConstraints.SetNum( this.contacts.Num(), false );
	////
	////	// setup contact constraints
	////	for ( i = 0; i < this.contacts.Num(); i++ ) {
	////		// add contact constraint
	////		contactConstraints[i].physics = this;
	////		if ( this.contacts[i].entityNum == this.self.entityNumber ) {
	////			contactConstraints[i].Setup( bodies[contactBodies[i]], bodies[ this.contacts[i].id ], this.contacts[i] );
	////		}
	////		else {
	////			contactConstraints[i].Setup( bodies[contactBodies[i]], NULL, this.contacts[i] );
	////		}
	////	}
	////}
	////
	/////*
	////================
	////idPhysics_AF::ApplyContactForces
	////================
	////*/
	////void idPhysics_AF::ApplyContactForces( ) {
	////#if 0
	////	var/*int*/i:number;
	////	idEntity *ent;
	////	idVec3 force;
	////
	////	for ( i = 0; i < this.contactConstraints.Num(); i++ ) {
	////		if ( this.contactConstraints[i].body2 != NULL ) {
	////			continue;
	////		}
	////		const contactInfo_t &contact = this.contactConstraints[i].GetContact();
	////		ent = gameLocal.entities[contact.entityNum];
	////		if ( !ent ) {
	////			continue;
	////		}
	////		force.Zero();
	////		ent.AddForce( this.self, contact.id, contact.point, force );
	////	}
	////#endif
	////}
	////
	/////*
	////================
	////idPhysics_AF::ClearExternalForce
	////================
	////*/
	////void idPhysics_AF::ClearExternalForce( ) {
	////	var/*int*/i:number;
	////	var body:idAFBody;
	////
	////	for ( i = 0; i < bodies.Num(); i++ ) {
	////		body = bodies[i];
	////
	////		// clear external force
	////		body.current.externalForce.Zero();
	////		body.next.externalForce.Zero();
	////	}
	////}
	
	/*
	================
	idPhysics_AF::AddGravity
	================
	*/
	AddGravity ( ): void {
		var /*int*/i: number;
		var body: idAFBody;

		for ( i = 0; i < this.bodies.Num ( ); i++ ) {
			body = this.bodies[i];
			// add gravitational force
			todoThrow ( );
			//body.current.externalForce.SubVec3( 0 ) += body.mass * gravityVector;
		}
	}

	/////*
	////================
	////idPhysics_AF::SwapStates
	////================
	////*/
	////void idPhysics_AF::SwapStates( ) {
	////	var/*int*/i:number;
	////	var body:idAFBody;
	////	AFBodyPState_t *swap;
	////
	////	for ( i = 0; i < this.bodies.Num(); i++ ) {
	////
	////		body = this.bodies[i];
	////
	////		// swap the current and next state for next simulation step
	////		swap = body.current;
	////		body.current = body.next;
	////		body.next = swap;
	////	}
	////}
	
	/*
	================
	idPhysics_AF::UpdateClipModels
	================
	*/
	UpdateClipModels ( ): void {
		var i: number /*int*/;
		var body: idAFBody;

		for ( i = 0; i < this.bodies.Num ( ); i++ ) {
			body = this.bodies[i];
			body.clipModel.Link_ent( gameLocal.clip, this.self, body.clipModel.GetId ( ), body.current.worldOrigin, body.current.worldAxis );
		}
	}

	/*
	================
	idPhysics_AF::SetSuspendSpeed
	================
	*/
	SetSuspendSpeed ( velocity: idVec2, acceleration: idVec2 ): void {
		this.suspendVelocity.opEquals( velocity );
		this.suspendAcceleration.opEquals( acceleration );
	}

	/*
	================
	idPhysics_AF::SetSuspendTime
	================
	*/
	SetSuspendTime( /*const float */minTime: number, /*const float */maxTime: number):void {
		this.minMoveTime = minTime;
		this.maxMoveTime = maxTime;
	}
	
	/*
	================
	idPhysics_AF::SetSuspendTolerance
	================
	*/
	SetSuspendTolerance(/* const float */noMoveTime: number, /*const float */noMoveTranslation: number, /*const float */noMoveRotation: number) :void{
		this.noMoveTime = noMoveTime;
		this.noMoveTranslation = noMoveTranslation;
		this.noMoveRotation = noMoveRotation;
	}
	
	/////*
	////================
	////idPhysics_AF::SetTimeScaleRamp
	////================
	////*/
	////void idPhysics_AF::SetTimeScaleRamp( const float start, const float end ) {
	////	this.timeScaleRampStart = start;
	////	this.timeScaleRampEnd = end;
	////}
	////
	/////*
	////================
	////idPhysics_AF::SetJointFrictionDent
	////================
	////*/
	////void idPhysics_AF::SetJointFrictionDent( const float dent, const float start, const float end ) {
	////	this.jointFrictionDent = dent;
	////	this.jointFrictionDentStart = start;
	////	this.jointFrictionDentEnd = end;
	////}
	////
	/////*
	////================
	////idPhysics_AF::GetJointFrictionScale
	////================
	////*/
	////float idPhysics_AF::GetJointFrictionScale( ) const {
	////	if ( this.jointFrictionDentScale > 0.0 ) {
	////		return this.jointFrictionDentScale;
	////	} else if ( this.jointFrictionScale > 0.0 ) {
	////		return this.jointFrictionScale;
	////	} else if ( af_jointFrictionScale.GetFloat() > 0.0 ) {
	////		return af_jointFrictionScale.GetFloat();
	////	}
	////	return 1.0;
	////}
	////
	/////*
	////================
	////idPhysics_AF::SetContactFrictionDent
	////================
	////*/
	////void idPhysics_AF::SetContactFrictionDent( const float dent, const float start, const float end ) {
	////	contactFrictionDent = dent;
	////	contactFrictionDentStart = start;
	////	contactFrictionDentEnd = end;
	////}
	////
	/////*
	////================
	////idPhysics_AF::GetContactFrictionScale
	////================
	////*/
	////float idPhysics_AF::GetContactFrictionScale( ) const {
	////	if ( this.contactFrictionDentScale > 0.0 ) {
	////		return this.contactFrictionDentScale;
	////	} else if ( this.contactFrictionScale > 0.0 ) {
	////		return this.contactFrictionScale;
	////	} else if ( af_contactFrictionScale.GetFloat() > 0.0 ) {
	////		return af_contactFrictionScale.GetFloat();
	////	}
	////	return 1.0;
	////}
	////
	/////*
	////================
	////idPhysics_AF::TestIfAtRest
	////================
	////*/
	////bool idPhysics_AF::TestIfAtRest( float timeStep ) {
	////	var/*int*/i:number;
	////	float translationSqr, maxTranslationSqr, rotation, maxRotation;
	////	var body:idAFBody;
	////
	////	if ( this.current.atRest >= 0 ) {
	////		return true;
	////	}
	////
	////	this.current.activateTime += timeStep;
	////
	////	// if the simulation should never be suspended before a certaint amount of time passed
	////	if ( this.minMoveTime > 0.0 && this.current.activateTime < this.minMoveTime ) {
	////		return false;
	////	}
	////
	////	// if the simulation should always be suspended after a certain amount time passed
	////	if ( this.maxMoveTime > 0.0 && this.current.activateTime > this.maxMoveTime ) {
	////		return true;
	////	}
	////
	////	// test if all bodies hardly moved over a period of time
	////	if ( this.current.noMoveTime == 0.0 ) {
	////		for ( i = 0; i < this.bodies.Num(); i++ ) {
	////			body = this.bodies[i];
	////			body.atRestOrigin = body.current.worldOrigin;
	////			body.atRestAxis = body.current.worldAxis;
	////		}
	////		this.current.noMoveTime += timeStep;
	////	}
	////	else if ( this.current.noMoveTime > noMoveTime ) {
	////		this.current.noMoveTime = 0.0;
	////		maxTranslationSqr = 0.0;
	////		maxRotation = 0.0;
	////		for ( i = 0; i < this.bodies.Num(); i++ ) {
	////			body = this.bodies[i];
	////
	////			translationSqr = ( body.current.worldOrigin - body.atRestOrigin ).LengthSqr();
	////			if ( translationSqr > maxTranslationSqr ) {
	////				maxTranslationSqr = translationSqr;
	////			}
	////			rotation = ( body.atRestAxis.Transpose() * body.current.worldAxis ).ToRotation().GetAngle();
	////			if ( rotation > maxRotation ) {
	////				maxRotation = rotation;
	////			}
	////		}
	////
	////		if ( maxTranslationSqr < Square( this.noMoveTranslation ) && maxRotation < this.noMoveRotation ) {
	////			// hardly moved over a period of time so the articulated figure may come to rest
	////			return true;
	////		}
	////	} else {
	////		this.current.noMoveTime += timeStep;
	////	}
	////
	////	// test if the velocity or acceleration of any body is still too large to come to rest
	////	for ( i = 0; i < this.bodies.Num(); i++ ) {
	////		body = this.bodies[i];
	////
	////		if ( body.current.spatialVelocity.SubVec3(0).LengthSqr() > Square( this.suspendVelocity[0] ) ) {
	////			return false;
	////		}
	////		if ( body.current.spatialVelocity.SubVec3(1).LengthSqr() > Square( this.suspendVelocity[1] ) ) {
	////			return false;
	////		}
	////		if ( body.acceleration.SubVec3(0).LengthSqr() > Square( this.suspendAcceleration[0] ) ) {
	////			return false;
	////		}
	////		if ( body.acceleration.SubVec3(1).LengthSqr() > Square( this.suspendAcceleration[1] ) ) {
	////			return false;
	////		}
	////	}
	////
	////	// all bodies have a velocity and acceleration small enough to come to rest
	////	return true;
	////}
	////
	/*
	================
	idPhysics_AF::Rest
	================
	*/
	Rest( ) :void{
		var/*int*/i:number;
	
		this.current.atRest = gameLocal.time;
	
		for ( i = 0; i < this.bodies.Num(); i++ ) {
			this.bodies[i].current.spatialVelocity.Zero();
			this.bodies[i].current.externalForce.Zero();
		}
	
		this.self.BecomeInactive( TH_PHYSICS );
	}
	
	/*
	================
	idPhysics_AF::Activate
	================
	*/
	Activate( ):void {
		// if the articulated figure was at rest
		if ( this.current.atRest >= 0 ) {
			// normally gravity is added at the end of a simulation frame
			// if the figure was at rest add gravity here so it is applied this simulation frame
			this.AddGravity();
			// reset the active time for the max move time
			this.current.activateTime = 0.0;
		}
		this.current.atRest = -1;
		this.current.noMoveTime = 0.0;
		this.self.BecomeActive( TH_PHYSICS );
	}
	
	/*
	================
	idPhysics_AF::PutToRest
	
	  put to rest untill something collides with this physics object
	================
	*/
	PutToRest( ):void {
		this.Rest();
	}
	////
	/////*
	////================
	////idPhysics_AF::EnableImpact
	////================
	////*/
	////void idPhysics_AF::EnableImpact( ) {
	////	this.noImpact = false;
	////}
	////
	/////*
	////================
	////idPhysics_AF::DisableImpact
	////================
	////*/
	////void idPhysics_AF::DisableImpact( ) {
	////	this.noImpact = true;
	////}
	////
	/////*
	////================
	////idPhysics_AF::AddPushVelocity
	////================
	////*/
	////void idPhysics_AF::AddPushVelocity( const idVec6 &pushVelocity ) {
	////	var/*int*/i:number;
	////
	////	if ( pushVelocity != vec6_origin ) {
	////		for ( i = 0; i < this.bodies.Num(); i++ ) {
	////			this.bodies[i].current.spatialVelocity += pushVelocity;
	////		}
	////	}
	////}
	
	/*
	================
	idPhysics_AF::SetClipModel
	================
	*/
	SetClipModel(model: idClipModel, /*float*/ density: number, /*int*/ id: number = 0, freeOld = true): void {
	}
	
	/*
	================
	idPhysics_AF::GetClipModel
	================
	*/
	GetClipModel( /*int*/ id: number = 0): idClipModel {
		if ( id >= 0 && id < this.bodies.Num() ) {
			return this.bodies[id].GetClipModel();
		}
		return null;
	}
	
	/*
	================
	idPhysics_AF::GetNumClipModels
	================
	*/
	GetNumClipModels ( ): number {
		return this.bodies.Num ( );
	}

	/*
	================
	idPhysics_AF::SetMass
	================
	*/
	SetMass( /*float*/ mass:number, /*int*/ id:number  = -1 ):void {
		if ( id >= 0 && id < this.bodies.Num() ) {
		}
		else {
			this.forceTotalMass = mass;
		}
		this.SetChanged();
	}
	
	/*
	================
	idPhysics_AF::GetMass
	================
	*/
	GetMass( /*int*/ id:number  = -1 ) :number/*float*/ {
		if ( id >= 0 && id < this.bodies.Num() ) {
			return this.bodies[id].mass;
		}
		return this.totalMass;
	}
	
	/*
	================
	idPhysics_AF::SetContents
	================
	*/
	SetContents( /*int*/ contents: number, /*int*/ id: number  = -1):void {
		var/*int*/i:number;
	
		if ( id >= 0 && id < this.bodies.Num() ) {
			this.bodies[id].GetClipModel().SetContents( contents );
		}
		else {
			for ( i = 0; i < this.bodies.Num(); i++ ) {
				this.bodies[i].GetClipModel().SetContents( contents );
			}
		}
	}
	
	/////*
	////================
	////idPhysics_AF::GetContents
	////================
	////*/
	////int idPhysics_AF::GetContents( /*int*/ id:number  = -1) const {
	////	int i, contents;
	////
	////	if ( id >= 0 && id < this.bodies.Num() ) {
	////		return this.bodies[id].GetClipModel().GetContents();
	////	}
	////	else {
	////		contents = 0;
	////		for ( i = 0; i < this.bodies.Num(); i++ ) {
	////			contents |= this.bodies[i].GetClipModel().GetContents();
	////		}
	////		return contents;
	////	}
	////}
	////
	/*
	================
	idPhysics_AF::GetBounds
	================
	*/
	static relBounds = new idBounds;
	GetBounds( /*int*/ id: number  = -1): idBounds {
		var /*int*/i: number;
		//static idBounds relBounds;

		if ( id >= 0 && id < this.bodies.Num ( ) ) {
			return this.bodies[id].GetClipModel ( ).GetBounds ( );
		} else if ( !this.bodies.Num ( ) ) {
			idPhysics_AF.relBounds.Zero ( );
			return idPhysics_AF.relBounds;
		} else {
			idPhysics_AF.relBounds.opEquals( this.bodies[0].GetClipModel ( ).GetBounds ( ) );
			for ( i = 1; i < this.bodies.Num ( ); i++ ) {
				todoThrow ( );
				//var bounds = new idBounds;
				//idVec3 origin = ( this.bodies[i].GetWorldOrigin() - this.bodies[0].GetWorldOrigin() ) * this.bodies[0].GetWorldAxis().Transpose();
				//idMat3 axis = this.bodies[i].GetWorldAxis() * this.bodies[0].GetWorldAxis().Transpose();
				//bounds.FromTransformedBounds( this.bodies[i].GetClipModel().GetBounds(), origin, axis );
				//idPhysics_AF.relBounds += bounds;
			}
			return idPhysics_AF.relBounds;
		}
	}
	
	/*
	================
	idPhysics_AF::GetAbsBounds
	================
	*/
	static absBounds =  new idBounds;
	GetAbsBounds ( /*int*/ id: number = -1 ): idBounds {

		var /*int*/i: number;

		if ( id >= 0 && id < this.bodies.Num ( ) ) {
			return this.bodies[id].GetClipModel ( ).GetAbsBounds ( );
		} else if ( !this.bodies.Num ( ) ) {
			idPhysics_AF.absBounds.Zero ( );
			return idPhysics_AF.absBounds;
		} else {
			idPhysics_AF.absBounds = this.bodies[0].GetClipModel ( ).GetAbsBounds ( );
			for ( i = 1; i < this.bodies.Num ( ); i++ ) {
				idPhysics_AF.absBounds.opAdditionAssignment( this.bodies[i].GetClipModel ( ).GetAbsBounds ( ) );
			}
			return idPhysics_AF.absBounds;
		}
	}

	/////*
	////================
	////idPhysics_AF::Evaluate
	////================
	////*/
	////bool idPhysics_AF::Evaluate( int timeStepMSec, int endTimeMSec ) {
	////	float timeStep;
	////
	////	if ( this.timeScaleRampStart < MS2SEC( endTimeMSec ) && this.timeScaleRampEnd > MS2SEC( endTimeMSec ) ) {
	////		timeStep = MS2SEC( timeStepMSec ) * ( MS2SEC( endTimeMSec ) - this.timeScaleRampStart ) / ( this.timeScaleRampEnd - this.timeScaleRampStart );
	////	} else if ( af_timeScale.GetFloat() != 1.0 ) {
	////		timeStep = MS2SEC( timeStepMSec ) * af_timeScale.GetFloat();
	////	} else {
	////		timeStep = MS2SEC( timeStepMSec ) * this.timeScale;
	////	}
	////	this.current.lastTimeStep = timeStep;
	////
	////
	////	// if the articulated figure changed
	////	if ( this.changedAF || ( this.linearTime != af_useLinearTime.GetBool() ) ) {
	////		BuildTrees();
	////		this.changedAF = false;
	////		this.linearTime = af_useLinearTime.GetBool();
	////	}
	////
	////	// get the new master position
	////	if ( this.masterBody ) {
	////		idVec3 masterOrigin;
	////		idMat3 masterAxis;
	////		this.self.GetMasterPosition( masterOrigin, masterAxis );
	////		if ( this.current.atRest >= 0 && ( this.masterBody.current.worldOrigin != masterOrigin || this.masterBody.current.worldAxis != masterAxis ) ) {
	////			this.Activate();
	////		}
	////		this.masterBody.current.worldOrigin = masterOrigin;
	////		this.masterBody.current.worldAxis = masterAxis;
	////	}
	////
	////	// if the simulation is suspended because the figure is at rest
	////	if ( this.current.atRest >= 0 || timeStep <= 0.0 ) {
	////		DebugDraw();
	////		return false;
	////	}
	////
	////	// move the af velocity into the frame of a pusher
	////	AddPushVelocity( -current.pushVelocity );
	////
	////#ifdef AF_TIMINGS
	////	timer_total.Start();
	////#endif
	////
	////#ifdef AF_TIMINGS
	////	timer_collision.Start();
	////#endif
	////
	////	// evaluate contacts
	////	EvaluateContacts();
	////
	////	// setup contact constraints
	////	SetupContactConstraints();
	////
	////#ifdef AF_TIMINGS
	////	timer_collision.Stop();
	////#endif
	////
	////	// evaluate constraint equations
	////	EvaluateConstraints( timeStep );
	////
	////	// apply friction
	////	ApplyFriction( timeStep, endTimeMSec );
	////
	////	// add frame constraints
	////	AddFrameConstraints();
	////
	////#ifdef AF_TIMINGS
	////	int i, numPrimary = 0, numAuxiliary = 0;
	////	for ( i = 0; i < this.primaryConstraints.Num(); i++ ) {
	////		numPrimary += this.primaryConstraints[i].J1.GetNumRows();
	////	}
	////	for ( i = 0; i < this.auxiliaryConstraints.Num(); i++ ) {
	////		numAuxiliary += this.auxiliaryConstraints[i].J1.GetNumRows();
	////	}
	////	timer_pc.Start();
	////#endif
	////
	////	// factor matrices for primary constraints
	////	PrimaryFactor();
	////
	////	// calculate forces on bodies after applying primary constraints
	////	PrimaryForces( timeStep );
	////
	////#ifdef AF_TIMINGS
	////	timer_pc.Stop();
	////	timer_ac.Start();
	////#endif
	////
	////	// calculate and apply auxiliary constraint forces
	////	AuxiliaryForces( timeStep );
	////
	////#ifdef AF_TIMINGS
	////	timer_ac.Stop();
	////#endif
	////
	////	// evolve current state to next state
	////	Evolve( timeStep );
	////
	////	// debug graphics
	////	DebugDraw();
	////
	////	// clear external forces on all bodies
	////	ClearExternalForce();
	////
	////	// apply contact force to other entities
	////	ApplyContactForces();
	////
	////	// remove all frame constraints
	////	RemoveFrameConstraints();
	////
	////#ifdef AF_TIMINGS
	////	timer_collision.Start();
	////#endif
	////
	////	// check for collisions between current and next state
	////	CheckForCollisions( timeStep );
	////
	////#ifdef AF_TIMINGS
	////	timer_collision.Stop();
	////#endif
	////
	////	// swap the current and next state
	////	SwapStates();
	////
	////	// make sure all clip models are disabled in case they were enabled for self collision
	////	if ( this.selfCollision && !af_skipSelfCollision.GetBool() ) {
	////		DisableClip();
	////	}
	////
	////	// apply collision impulses
	////	if ( ApplyCollisions( timeStep ) ) {
	////		this.current.atRest = gameLocal.time;
	////		this.comeToRest = true;
	////	}
	////
	////	// test if the simulation can be suspended because the whole figure is at rest
	////	if ( this.comeToRest && TestIfAtRest( timeStep ) ) {
	////		this.Rest();
	////	} else {
	////		ActivateContactEntities();
	////	}
	////
	////	// add gravitational force
	////	this.AddGravity();
	////
	////	// move the af velocity back into the world frame
	////	AddPushVelocity( this.current.pushVelocity );
	////	this.current.pushVelocity.Zero();
	////
	////	if ( IsOutsideWorld() ) {
	////		gameLocal.Warning( "articulated figure moved outside world bounds for entity '%s' type '%s' at (%s)",
	////							this.self.name.c_str(), this.self.GetType().classname, this.bodies[0].current.worldOrigin.ToString(0) );
	////		this.Rest();
	////	}
	////
	////#ifdef AF_TIMINGS
	////	timer_total.Stop();
	////
	////	if ( af_showTimings.GetInteger() == 1 ) {
	////		gameLocal.Printf( "%12s: t %1.4f pc %2d, %1.4f ac %2d %1.4f lcp %1.4f cd %1.4f\n",
	////						this.self.name.c_str(),
	////						timer_total.Milliseconds(),
	////						numPrimary, timer_pc.Milliseconds(),
	////						numAuxiliary, timer_ac.Milliseconds() - timer_lcp.Milliseconds(),
	////						timer_lcp.Milliseconds(), timer_collision.Milliseconds() );
	////	}
	////	else if ( af_showTimings.GetInteger() == 2 ) {
	////		numArticulatedFigures++;
	////		if ( endTimeMSec > this.lastTimerReset ) {
	////			gameLocal.Printf( "af %d: t %1.4f pc %2d, %1.4f ac %2d %1.4f lcp %1.4f cd %1.4f\n",
	////							numArticulatedFigures,
	////							timer_total.Milliseconds(),
	////							numPrimary, timer_pc.Milliseconds(),
	////							numAuxiliary, timer_ac.Milliseconds() - timer_lcp.Milliseconds(),
	////							timer_lcp.Milliseconds(), timer_collision.Milliseconds() );
	////		}
	////	}
	////
	////	if ( endTimeMSec > this.lastTimerReset ) {
	////		this.lastTimerReset = endTimeMSec;
	////		numArticulatedFigures = 0;
	////		timer_total.Clear();
	////		timer_pc.Clear();
	////		timer_ac.Clear();
	////		timer_collision.Clear();
	////		timer_lcp.Clear();
	////	}
	////#endif
	////
	////	return true;
	////}
	
	/*
	================
	idPhysics_AF::UpdateTime
	================
	*/
	UpdateTime ( /*int*/ endTimeMSec: number ): void {
	}
	////
	/////*
	////================
	////idPhysics_AF::GetTime
	////================
	////*/
	////int idPhysics_AF::GetTime( ) const {
	////	return gameLocal.time;
	////}
	////
	/////*
	////================
	////DrawTraceModelSilhouette
	////================
	////*/
	////void DrawTraceModelSilhouette( const idVec3 &projectionOrigin, const idClipModel *clipModel ) {
	////	int i, numSilEdges;
	////	int silEdges[MAX_TRACEMODEL_EDGES];
	////	idVec3 v1, v2;
	////	const idTraceModel *trm = clipModel.GetTraceModel();
	////	const idVec3 &origin = clipModel.GetOrigin();
	////	const idMat3 &axis = clipModel.GetAxis();
	////
	////	numSilEdges = trm.GetProjectionSilhouetteEdges( ( projectionOrigin - origin ) * axis.Transpose(), silEdges );
	////	for ( i = 0; i < numSilEdges; i++ ) {
	////		v1 = trm.verts[ trm.edges[ abs(silEdges[i]) ].v[ INTSIGNBITSET( silEdges[i] ) ] ];
	////		v2 = trm.verts[ trm.edges[ abs(silEdges[i]) ].v[ INTSIGNBITNOTSET( silEdges[i] ) ] ];
	////		gameRenderWorld.DebugArrow( colorRed, origin + v1 * axis, origin + v2 * axis, 1 );
	////	}
	////}
	////
	/////*
	////================
	////idPhysics_AF::DebugDraw
	////================
	////*/
	////void idPhysics_AF::DebugDraw( ) {
	////	var/*int*/i:number;
	////	idAFBody *body, *highlightBody = NULL, *constrainedBody1 = NULL, *constrainedBody2 = NULL;
	////	var constraint:idAFConstraint ;
	////	idVec3 center;
	////	idMat3 axis;
	////
	////	if ( af_highlightConstraint.GetString()[0] ) {
	////		constraint = this.GetConstraint( af_highlightConstraint.GetString() );
	////		if ( constraint ) {
	////			constraint.GetCenter( center );
	////			axis = gameLocal.GetLocalPlayer().viewAngles.ToMat3();
	////			gameRenderWorld.DebugCone( colorYellow, center, (axis[2] - axis[1]) * 4.0, 0.0, 1.0, 0 );
	////
	////			if ( af_showConstrainedBodies.GetBool() ) {
	////				cvarSystem.SetCVarString( "cm_drawColor", colorCyan.ToString( 0 ) );
	////				constrainedBody1 = constraint.body1;
	////				if ( constrainedBody1 ) {
	////					collisionModelManager.DrawModel( constrainedBody1.clipModel.Handle(), constrainedBody1.clipModel.GetOrigin(),
	////											constrainedBody1.clipModel.GetAxis(), vec3_origin, 0.0 );
	////				}
	////				cvarSystem.SetCVarString( "cm_drawColor", colorBlue.ToString( 0 ) );
	////				constrainedBody2 = constraint.body2;
	////				if ( constrainedBody2 ) {
	////					collisionModelManager.DrawModel( constrainedBody2.clipModel.Handle(), constrainedBody2.clipModel.GetOrigin(),
	////											constrainedBody2.clipModel.GetAxis(), vec3_origin, 0.0 );
	////				}
	////				cvarSystem.SetCVarString( "cm_drawColor", colorRed.ToString( 0 ) );
	////			}
	////		}
	////	}
	////
	////	if ( af_highlightBody.GetString()[0] ) {
	////		highlightBody = GetBody( af_highlightBody.GetString() );
	////		if ( highlightBody ) {
	////			cvarSystem.SetCVarString( "cm_drawColor", colorYellow.ToString( 0 ) );
	////			collisionModelManager.DrawModel( highlightBody.clipModel.Handle(), highlightBody.clipModel.GetOrigin(),
	////									highlightBody.clipModel.GetAxis(), vec3_origin, 0.0 );
	////			cvarSystem.SetCVarString( "cm_drawColor", colorRed.ToString( 0 ) );
	////		}
	////	}
	////
	////	if ( af_showBodies.GetBool() ) {
	////		for ( i = 0; i < this.bodies.Num(); i++ ) {
	////			body = this.bodies[i];
	////			if ( body == constrainedBody1 || body == constrainedBody2 ) {
	////				continue;
	////			}
	////			if ( body == highlightBody ) {
	////				continue;
	////			}
	////			collisionModelManager.DrawModel( body.clipModel.Handle(), body.clipModel.GetOrigin(),
	////										body.clipModel.GetAxis(), vec3_origin, 0.0 );
	////			//DrawTraceModelSilhouette( gameLocal.GetLocalPlayer().GetEyePosition(), body.clipModel );
	////		}
	////	}
	////
	////	if ( af_showBodyNames.GetBool() ) {
	////		for ( i = 0; i < this.bodies.Num(); i++ ) {
	////			body = this.bodies[i];
	////			gameRenderWorld.DrawText( body.GetName().c_str(), body.GetWorldOrigin(), 0.08f, colorCyan, gameLocal.GetLocalPlayer().viewAngles.ToMat3(), 1 );
	////		}
	////	}
	////
	////	if ( af_showMass.GetBool() ) {
	////		for ( i = 0; i < this.bodies.Num(); i++ ) {
	////			body = this.bodies[i];
	////			gameRenderWorld.DrawText( va( "\n%1.2f", 1.0 / body.GetInverseMass() ), body.GetWorldOrigin(), 0.08f, colorCyan, gameLocal.GetLocalPlayer().viewAngles.ToMat3(), 1 );
	////		}
	////	}
	////
	////	if ( af_showTotalMass.GetBool() ) {
	////		axis = gameLocal.GetLocalPlayer().viewAngles.ToMat3();
	////		gameRenderWorld.DrawText( va( "\n%1.2f", this.totalMass ), this.bodies[0].GetWorldOrigin() + axis[2] * 8.0, 0.15f, colorCyan, axis, 1 );
	////	}
	////
	////	if ( af_showInertia.GetBool() ) {
	////		for ( i = 0; i < this.bodies.Num(); i++ ) {
	////			body = this.bodies[i];
	////			idMat3 &I = body.inertiaTensor;
	////			gameRenderWorld.DrawText( va( "\n\n\n( %.1f %.1f %.1f )\n( %.1f %.1f %.1f )\n( %.1f %.1f %.1f )",
	////										I[0].x, I[0].y, I[0].z,
	////										I[1].x, I[1].y, I[1].z,
	////										I[2].x, I[2].y, I[2].z ),
	////										body.GetWorldOrigin(), 0.05f, colorCyan, gameLocal.GetLocalPlayer().viewAngles.ToMat3(), 1 );
	////		}
	////	}
	////
	////	if ( af_showVelocity.GetBool() ) {
	////		for ( i = 0; i < this.bodies.Num(); i++ ) {
	////			DrawVelocity( this.bodies[i].clipModel.GetId(), 0.1f, 4.0 );
	////		}
	////	}
	////
	////	if ( af_showConstraints.GetBool() ) {
	////		for ( i = 0; i < this.primaryConstraints.Num(); i++ ) {
	////			constraint = this.primaryConstraints[i];
	////			constraint.DebugDraw();
	////		}
	////		if ( !af_showPrimaryOnly.GetBool() ) {
	////			for ( i = 0; i < this.auxiliaryConstraints.Num(); i++ ) {
	////				constraint = this.auxiliaryConstraints[i];
	////				constraint.DebugDraw();
	////			}
	////		}
	////	}
	////
	////	if ( af_showConstraintNames.GetBool() ) {
	////		for ( i = 0; i < this.primaryConstraints.Num(); i++ ) {
	////			constraint = this.primaryConstraints[i];
	////			constraint.GetCenter( center );
	////			gameRenderWorld.DrawText( constraint.GetName().c_str(), center, 0.08f, colorCyan, gameLocal.GetLocalPlayer().viewAngles.ToMat3(), 1 );
	////		}
	////		if ( !af_showPrimaryOnly.GetBool() ) {
	////			for ( i = 0; i < this.auxiliaryConstraints.Num(); i++ ) {
	////				constraint = this.auxiliaryConstraints[i];
	////				constraint.GetCenter( center );
	////				gameRenderWorld.DrawText( constraint.GetName().c_str(), center, 0.08f, colorCyan, gameLocal.GetLocalPlayer().viewAngles.ToMat3(), 1 );
	////			}
	////		}
	////	}
	////
	////	if ( af_showTrees.GetBool() || ( af_showActive.GetBool() && this.current.atRest < 0 ) ) {
	////		for ( i = 0; i < this.trees.Num(); i++ ) {
	////			this.trees[i].DebugDraw( idStr::ColorForIndex( i+3 ) );
	////		}
	////	}
	////}
	
	/*
	================
	idPhysics_AF::idPhysics_AF
	================
	*/
	constructor() {
		super ( );
		this.trees.Clear();
		this.bodies.Clear();
		this.constraints.Clear();
		this.primaryConstraints.Clear();
		this.auxiliaryConstraints.Clear();
		this.frameConstraints.Clear();
		this.contacts.Clear();
		this.collisions.Clear();
		this.changedAF = true;
		this.masterBody = null;
	
		this.lcp = idLCP.AllocSymmetric();

		this.current.memset0 ( );
		this.current.atRest = -1;
		this.current.lastTimeStep = USERCMD_MSEC;
		this.saved = this.current;
	
		this.linearFriction = 0.005;
		this.angularFriction = 0.005;
		this.contactFriction = 0.8;
		this.bouncyness = 0.4;
		this.totalMass = 0.0;
		this.forceTotalMass = -1.0;
	
		this.suspendVelocity.Set( SUSPEND_LINEAR_VELOCITY, SUSPEND_ANGULAR_VELOCITY );
		this.suspendAcceleration.Set( SUSPEND_LINEAR_ACCELERATION, SUSPEND_LINEAR_ACCELERATION );
		this.noMoveTime = NO_MOVE_TIME;
		this.noMoveTranslation = NO_MOVE_TRANSLATION_TOLERANCE;
		this.noMoveRotation = NO_MOVE_ROTATION_TOLERANCE;
		this.minMoveTime = MIN_MOVE_TIME;
		this.maxMoveTime = MAX_MOVE_TIME;
		this.impulseThreshold = IMPULSE_THRESHOLD;
	
		this.timeScale = 1.0;
		this.timeScaleRampStart = 0.0;
		this.timeScaleRampEnd = 0.0;
	
		this.jointFrictionScale = 0.0;
		this.jointFrictionDent = 0.0;
		this.jointFrictionDentStart = 0.0;
		this.jointFrictionDentEnd = 0.0;
		this.jointFrictionDentScale = 0.0;
	
		this.contactFrictionScale = 0.0;
		this.contactFrictionDent = 0.0;
		this.contactFrictionDentStart = 0.0;
		this.contactFrictionDentEnd = 0.0;
		this.contactFrictionDentScale = 0.0;
	
		this.enableCollision = true;
		this.selfCollision = true;
		this.comeToRest = true;
		this.linearTime = true;
		this.noImpact = false;
		this.worldConstraintsLocked = false;
		this.forcePushable = false;
	
	//#ifdef AF_TIMINGS
		lastTimerReset = 0;
	//#endif
	}
	
	/////*
	////================
	////idPhysics_AF::~idPhysics_AF
	////================
	////*/
	////idPhysics_AF::~idPhysics_AF( ) {
	////	var/*int*/i:number;
	////
	////	this.trees.DeleteContents( true );
	////
	////	for ( i = 0; i < this.bodies.Num(); i++ ) {
	////		delete this.bodies[i];
	////	}
	////
	////	for ( i = 0; i < this.constraints.Num(); i++ ) {
	////		delete this.constraints[i];
	////	}
	////
	////	this.contactConstraints.SetNum( this.contactConstraints.NumAllocated(), false );
	////	for ( i = 0; i < this.contactConstraints.NumAllocated(); i++ ) {
	////		delete this.contactConstraints[i];
	////	}
	////
	////	delete lcp;
	////
	////	if ( this.masterBody ) {
	////		delete this.masterBody;
	////	}
	////}
	////
	/////*
	////================
	////idPhysics_AF_SavePState
	////================
	////*/
	////void idPhysics_AF_SavePState( idSaveGame *saveFile, const AFPState_t &state ) {
	////	saveFile.WriteInt( state.atRest );
	////	saveFile.WriteFloat( state.noMoveTime );
	////	saveFile.WriteFloat( state.activateTime );
	////	saveFile.WriteFloat( state.lastTimeStep );
	////	saveFile.WriteVec6( state.pushVelocity );
	////}
	////
	/////*
	////================
	////idPhysics_AF_RestorePState
	////================
	////*/
	////void idPhysics_AF_RestorePState( idRestoreGame *saveFile, AFPState_t &state ) {
	////	saveFile.ReadInt( state.atRest );
	////	saveFile.ReadFloat( state.noMoveTime );
	////	saveFile.ReadFloat( state.activateTime );
	////	saveFile.ReadFloat( state.lastTimeStep );
	////	saveFile.ReadVec6( state.pushVelocity );
	////}
	////
	/////*
	////================
	////idPhysics_AF::Save
	////================
	////*/
	////void idPhysics_AF::Save( idSaveGame *saveFile ) const {
	////	var/*int*/i:number;
	////
	////	// the articulated figure structure is handled by the owner
	////
	////	idPhysics_AF_SavePState( saveFile, this.current );
	////	idPhysics_AF_SavePState( saveFile, this.saved );
	////
	////	saveFile.WriteInt( this.bodies.Num() );
	////	for ( i = 0; i < this.bodies.Num(); i++ ) {
	////		this.bodies[i].Save( saveFile );
	////	}
	////	if ( this.masterBody ) {
	////		saveFile.WriteBool( true );
	////		this.masterBody.Save( saveFile );
	////	} else {
	////		saveFile.WriteBool( false );
	////	}
	////
	////	saveFile.WriteInt( this.constraints.Num() );
	////	for ( i = 0; i < this.constraints.Num(); i++ ) {
	////		this.constraints[i].Save( saveFile );
	////	}
	////
	////	saveFile.WriteBool( this.changedAF );
	////
	////	saveFile.WriteFloat( this.linearFriction );
	////	saveFile.WriteFloat( this.angularFriction );
	////	saveFile.WriteFloat( this.contactFriction );
	////	saveFile.WriteFloat( this.bouncyness );
	////	saveFile.WriteFloat( this.totalMass );
	////	saveFile.WriteFloat( this.forceTotalMass );
	////
	////	saveFile.WriteVec2( this.suspendVelocity );
	////	saveFile.WriteVec2( this.suspendAcceleration );
	////	saveFile.WriteFloat( this.noMoveTime );
	////	saveFile.WriteFloat( this.noMoveTranslation );
	////	saveFile.WriteFloat( this.noMoveRotation );
	////	saveFile.WriteFloat( this.minMoveTime );
	////	saveFile.WriteFloat( this.maxMoveTime );
	////	saveFile.WriteFloat( this.impulseThreshold );
	////
	////	saveFile.WriteFloat( this.timeScale );
	////	saveFile.WriteFloat( this.timeScaleRampStart );
	////	saveFile.WriteFloat( this.timeScaleRampEnd );
	////
	////	saveFile.WriteFloat( this.jointFrictionScale );
	////	saveFile.WriteFloat( this.jointFrictionDent );
	////	saveFile.WriteFloat( this.jointFrictionDentStart );
	////	saveFile.WriteFloat( this.jointFrictionDentEnd );
	////	saveFile.WriteFloat( this.jointFrictionDentScale );
	////
	////	saveFile.WriteFloat( this.contactFrictionScale );
	////	saveFile.WriteFloat( this.contactFrictionDent );
	////	saveFile.WriteFloat( this.contactFrictionDentStart );
	////	saveFile.WriteFloat( this.contactFrictionDentEnd );
	////	saveFile.WriteFloat( this.contactFrictionDentScale );
	////
	////	saveFile.WriteBool( this.enableCollision );
	////	saveFile.WriteBool( this.selfCollision );
	////	saveFile.WriteBool( this.comeToRest );
	////	saveFile.WriteBool( this.linearTime );
	////	saveFile.WriteBool( this.noImpact );
	////	saveFile.WriteBool( this.worldConstraintsLocked );
	////	saveFile.WriteBool( this.forcePushable );
	////}
	////
	/////*
	////================
	////idPhysics_AF::Restore
	////================
	////*/
	////void idPhysics_AF::Restore( idRestoreGame *saveFile ) {
	////	int i, num;
	////	bool hasMaster;
	////
	////	// the articulated figure structure should have already been restored
	////
	////	idPhysics_AF_RestorePState( saveFile, this.current );
	////	idPhysics_AF_RestorePState( saveFile, this.saved );
	////
	////	saveFile.ReadInt( num );
	////	assert( num == this.bodies.Num() );
	////	for ( i = 0; i < this.bodies.Num(); i++ ) {
	////		this.bodies[i].Restore( saveFile );
	////	}
	////	saveFile.ReadBool( hasMaster );
	////	if ( hasMaster ) {
	////		this.masterBody = new idAFBody();
	////		this.masterBody.Restore( saveFile );
	////	}
	////
	////	saveFile.ReadInt( num );
	////	assert( num == this.constraints.Num() );
	////	for ( i = 0; i < this.constraints.Num(); i++ ) {
	////		this.constraints[i].Restore( saveFile );
	////	}
	////
	////	saveFile.ReadBool( this.changedAF );
	////
	////	saveFile.ReadFloat( this.linearFriction );
	////	saveFile.ReadFloat( this.angularFriction );
	////	saveFile.ReadFloat( this.contactFriction );
	////	saveFile.ReadFloat( this.bouncyness );
	////	saveFile.ReadFloat( this.totalMass );
	////	saveFile.ReadFloat( this.forceTotalMass );
	////
	////	saveFile.ReadVec2( this.suspendVelocity );
	////	saveFile.ReadVec2( this.suspendAcceleration );
	////	saveFile.ReadFloat( this.noMoveTime );
	////	saveFile.ReadFloat( this.noMoveTranslation );
	////	saveFile.ReadFloat( this.noMoveRotation );
	////	saveFile.ReadFloat( this.minMoveTime );
	////	saveFile.ReadFloat( this.maxMoveTime );
	////	saveFile.ReadFloat( this.impulseThreshold );
	////
	////	saveFile.ReadFloat( this.timeScale );
	////	saveFile.ReadFloat( this.timeScaleRampStart );
	////	saveFile.ReadFloat( this.timeScaleRampEnd );
	////
	////	saveFile.ReadFloat( this.jointFrictionScale );
	////	saveFile.ReadFloat( this.jointFrictionDent );
	////	saveFile.ReadFloat( this.jointFrictionDentStart );
	////	saveFile.ReadFloat( this.jointFrictionDentEnd );
	////	saveFile.ReadFloat( this.jointFrictionDentScale );
	////
	////	saveFile.ReadFloat( this.contactFrictionScale );
	////	saveFile.ReadFloat( this.contactFrictionDent );
	////	saveFile.ReadFloat( this.contactFrictionDentStart );
	////	saveFile.ReadFloat( this.contactFrictionDentEnd );
	////	saveFile.ReadFloat( this.contactFrictionDentScale );
	////
	////	saveFile.ReadBool( this.enableCollision );
	////	saveFile.ReadBool( this.selfCollision );
	////	saveFile.ReadBool( this.comeToRest );
	////	saveFile.ReadBool( this.linearTime );
	////	saveFile.ReadBool( this.noImpact );
	////	saveFile.ReadBool( this.worldConstraintsLocked );
	////	saveFile.ReadBool( this.forcePushable );
	////
	////	this.changedAF = true;
	////
	////	UpdateClipModels();
	////}
	////
	/////*
	////================
	////idPhysics_AF::IsClosedLoop
	////================
	////*/
	////bool idPhysics_AF::IsClosedLoop( const idAFBody *body1, const idAFBody *body2 ) const {
	////	const idAFBody *b1, *b2;
	////
	////	for ( b1 = this.body1; b1.parent; b1 = b1.parent ) {
	////	}
	////	for ( b2 = body2; b2.parent; b2 = b2.parent ) {
	////	}
	////	return ( b1 == b2 );
	////}
	////
	/////*
	////================
	////idPhysics_AF::BuildTrees
	////================
	////*/
	////void idPhysics_AF::BuildTrees( ) {
	////	var/*int*/i:number;
	////	float scale;
	////	idAFBody *b;
	////	idAFConstraint *c;
	////	idAFTree *tree;
	////
	////	this.primaryConstraints.Clear();
	////	this.auxiliaryConstraints.Clear();
	////	this.trees.DeleteContents( true );
	////
	////	this.totalMass = 0.0;
	////	for ( i = 0; i < this.bodies.Num(); i++ ) {
	////		b = this.bodies[i];
	////		b.parent = NULL;
	////		b.primaryConstraint = NULL;
	////		b.constraints.SetNum( 0, false );
	////		b.children.Clear();
	////		b.tree = NULL;
	////		this.totalMass += b.mass;
	////	}
	////
	////	if ( this.forceTotalMass > 0.0 ) {
	////		scale = this.forceTotalMass / this.totalMass;
	////		for ( i = 0; i < this.bodies.Num(); i++ ) {
	////			b = this.bodies[i];
	////			b.mass *= scale;
	////			b.invMass = 1.0 / b.mass;
	////			b.inertiaTensor *= scale;
	////			b.inverseInertiaTensor = b.inertiaTensor.Inverse();
	////		}
	////		this.totalMass = this.forceTotalMass;
	////	}
	////
	////	if ( af_useLinearTime.GetBool() ) {
	////
	////		for ( i = 0; i < this.constraints.Num(); i++ ) {
	////			c = this.constraints[i];
	////
	////			c.body1.this.constraints.Append( c );
	////			if ( c.body2 ) {
	////				c.body2.this.constraints.Append( c );
	////			}
	////
	////			// only bilateral constraints between two non-world bodies that do not
	////			// create loops can be used as primary constraints
	////			if ( !c.body1.primaryConstraint && c.fl.allowPrimary && c.body2 != NULL && !IsClosedLoop( c.body1, c.body2 ) ) {
	////				c.body1.primaryConstraint = c;
	////				c.body1.parent = c.body2;
	////				c.body2.children.Append( c.body1 );
	////				c.fl.isPrimary = true;
	////				c.firstIndex = 0;
	////				this.primaryConstraints.Append( c );
	////			} else {
	////				c.fl.isPrimary = false;
	////				this.auxiliaryConstraints.Append( c );
	////			}
	////		}
	////
	////		// create trees for all parent bodies
	////		for ( i = 0; i < this.bodies.Num(); i++ ) {
	////			if ( !this.bodies[i].parent ) {
	////				tree = new idAFTree();
	////				tree.sortedBodies.Clear();
	////				tree.sortedBodies.Append( this.bodies[i] );
	////				this.bodies[i].tree = tree;
	////				this.trees.Append( tree );
	////			}
	////		}
	////
	////		// add each child body to the appropriate tree
	////		for ( i = 0; i < this.bodies.Num(); i++ ) {
	////			if ( this.bodies[i].parent ) {
	////				for ( b = this.bodies[i].parent; !b.tree; b = b.parent ) {
	////				}
	////				b.tree.sortedBodies.Append( this.bodies[i] );
	////				this.bodies[i].tree = b.tree;
	////			}
	////		}
	////
	////		if ( this.trees.Num() > 1 ) {
	////			gameLocal.Warning( "Articulated figure has multiple seperate tree structures for entity '%s' type '%s'.",
	////								this.self.name.c_str(), this.self.GetType().classname );
	////		}
	////
	////		// sort bodies in each tree to make sure parents come first
	////		for ( i = 0; i < this.trees.Num(); i++ ) {
	////			this.trees[i].SortBodies();
	////		}
	////
	////	} else {
	////
	////		// create a tree for each body
	////		for ( i = 0; i < this.bodies.Num(); i++ ) {
	////			tree = new idAFTree();
	////			tree.sortedBodies.Clear();
	////			tree.sortedBodies.Append( this.bodies[i] );
	////			this.bodies[i].tree = tree;
	////			this.trees.Append( tree );
	////		}
	////
	////		for ( i = 0; i < this.constraints.Num(); i++ ) {
	////			c = this.constraints[i];
	////
	////			c.body1.constraints.Append( c );
	////			if ( c.body2 ) {
	////				c.body2.constraints.Append( c );
	////			}
	////
	////			c.fl.isPrimary = false;
	////			this.auxiliaryConstraints.Append( c );
	////		}
	////	}
	////}
	
	/*
	================
	idPhysics_AF::AddBody
	
	  bodies get an id in the order they are added starting at zero
	  as such the first body added will get id zero
	================
	*/
    AddBody ( body: idAFBody ): number {
        /*int*/
        var id:number = 0;

        if ( !body.clipModel ) {
            gameLocal.Error( "idPhysics_AF::AddBody: body '%s' has no clip model.", body.name.c_str ( ) );
        }

        if ( this.bodies.Find( body ) ) {
            gameLocal.Error( "idPhysics_AF::AddBody: body '%s' added twice.", body.name.c_str ( ) );
        }

        if ( this.GetBody( body.name.data ) ) {
            gameLocal.Error( "idPhysics_AF::AddBody: a body with the name '%s' already exists.", body.name.c_str ( ) );
        }

        id = this.bodies.Num ( );
        body.clipModel.SetId( id );
        if ( body.linearFriction < 0.0 ) {
            body.linearFriction = this.linearFriction;
            body.angularFriction = this.angularFriction;
            body.contactFriction = this.contactFriction;
        }
        if ( body.bouncyness < 0.0 ) {
            body.bouncyness = this.bouncyness;
        }
        if ( !body.fl.clipMaskSet ) {
            body.clipMask = this.clipMask;
        }

        this.bodies.Append( body );

        this.changedAF = true;

        return id;
    }

    /*
	================
	idPhysics_AF::AddConstraint
	================
	*/
	AddConstraint ( constraint: idAFConstraint ): void {

		if ( this.constraints.Find( constraint ) ) {
			gameLocal.Error( "idPhysics_AF::AddConstraint: constraint '%s' added twice.", constraint.name.c_str ( ) );
		}
		if ( this.GetConstraint( constraint.name.data ) ) {
			gameLocal.Error( "idPhysics_AF::AddConstraint: a constraint with the name '%s' already exists.", constraint.name.c_str ( ) );
		}
		if ( !constraint.body1 ) {
			gameLocal.Error( "idPhysics_AF::AddConstraint: body1 == NULL on constraint '%s'.", constraint.name.c_str ( ) );
		}
		if ( !this.bodies.Find( constraint.body1 ) ) {
			gameLocal.Error( "idPhysics_AF::AddConstraint: body1 of constraint '%s' is not part of the articulated figure.", constraint.name.c_str ( ) );
		}
		if ( constraint.body2 && !this.bodies.Find( constraint.body2 ) ) {
			gameLocal.Error( "idPhysics_AF::AddConstraint: body2 of constraint '%s' is not part of the articulated figure.", constraint.name.c_str ( ) );
		}
		if ( constraint.body1 == constraint.body2 ) {
			gameLocal.Error( "idPhysics_AF::AddConstraint: body1 and body2 of constraint '%s' are the same.", constraint.name.c_str ( ) );
		}

		this.constraints.Append( constraint );
		constraint.physics = this;

		this.changedAF = true;
	}
	
	/////*
	////================
	////idPhysics_AF::AddFrameConstraint
	////================
	////*/
	////void idPhysics_AF::AddFrameConstraint( idAFConstraint *constraint ) {
	////	this.frameConstraints.Append( constraint );
	////	constraint.physics = this;
	////}
	
	/*
	================
	idPhysics_AF::ForceBodyId
	================
	*/
    ForceBodyId ( body: idAFBody, /*int */newId: number ): void {
        var /*int*/ id: number;

        id = this.bodies.FindIndex( body );
        if ( id == -1 ) {
            gameLocal.Error( "ForceBodyId: body '%s' is not part of the articulated figure.\n", body.name.c_str ( ) );
        }
        if ( id != newId ) {
            var b = this.bodies[newId];
            this.bodies[newId] = this.bodies[id];
            this.bodies[id] = b;
            this.changedAF = true;
        }
    }

    /*
	================
	idPhysics_AF::GetBodyId
	================
	*/
    GetBodyId ( body: idAFBody ): number {
        var /*int*/ id: number;

        id = this.bodies.FindIndex( body );
        if ( id == -1 && body ) {
            gameLocal.Error( "GetBodyId: body '%s' is not part of the articulated figure.\n", body.name.c_str ( ) );
        }
        return id;
    }
    
	/////*
	////================
	////idPhysics_AF::GetBodyId
	////================
	////*/
	////int idPhysics_AF::GetBodyId( const char *bodyName ) const {
	////	var/*int*/i:number;
	////
	////	for ( i = 0; i < this.bodies.Num(); i++ ) {
	////		if ( !this.bodies[i].name.Icmp( bodyName ) ) {
	////			return i;
	////		}
	////	}
	////	gameLocal.Error( "GetBodyId: no body with the name '%s' is not part of the articulated figure.\n", bodyName );
	////	return 0;
	////}
	////
	/////*
	////================
	////idPhysics_AF::GetConstraintId
	////================
	////*/
	////int idPhysics_AF::GetConstraintId( idAFConstraint *constraint ) const {
	////	var /*int*/ id:number;
	////
	////	id = this.constraints.FindIndex( constraint );
	////	if ( id == -1 && constraint ) {
	////		gameLocal.Error( "GetConstraintId: constraint '%s' is not part of the articulated figure.\n", constraint.name.c_str() );
	////	}
	////	return id;
	////}
	////
	/////*
	////================
	////idPhysics_AF::GetConstraintId
	////================
	////*/
	////int idPhysics_AF::GetConstraintId( const char *constraintName ) const {
	////	var/*int*/i:number;
	////
	////	for ( i = 0; i < this.constraints.Num(); i++ ) {
	////		if ( this.constraints[i].name.Icmp( constraintName ) == 0 ) {
	////			return i;
	////		}
	////	}
	////	gameLocal.Error( "GetConstraintId: no constraint with the name '%s' is not part of the articulated figure.\n", constraintName );
	////	return 0;
	////}
	////
	/*
	================
	idPhysics_AF::GetNumBodies
	================
	*/
	GetNumBodies ( ): number {
		return this.bodies.Num ( );
	}

	/*
	================
	idPhysics_AF::GetNumConstraints
	================
	*/
	GetNumConstraints ( ): number {
		return this.constraints.Num ( );
	}

	/*
	================
	idPhysics_AF::GetBody
	================
	*/
	GetBody ( bodyName: string ): idAFBody {
		var /*int*/i: number;

		for ( i = 0; i < this.bodies.Num ( ); i++ ) {
			if ( !this.bodies[i].name.Icmp( bodyName ) ) {
				return this.bodies[i];
			}
		}

		return null;
	}

	/*
	================
	idPhysics_AF::GetBody
	================
	*/
	GetBody_id ( /*int*/ id: number ): idAFBody {
		if ( id < 0 || id >= this.bodies.Num ( ) ) {
			gameLocal.Error( "GetBody: no body with id %d exists\n", id );
			return null;
		}
		return this.bodies[id];
	}

	/*
	================
	idPhysics_AF::GetConstraint
	================
	*/
	GetConstraint(constraintName: string): idAFConstraint {
		var /*int*/i: number;

		for ( i = 0; i < this.constraints.Num ( ); i++ ) {
			if ( this.constraints[i].name.Icmp( constraintName ) == 0 ) {
				return this.constraints[i];
			}
		}

		return null;
	}

	/*
	================
	idPhysics_AF::GetConstraint
	================
	*/
	GetConstraint_id( /*int*/ id: number): idAFConstraint {
		if ( id < 0 || id >= this.constraints.Num ( ) ) {
			gameLocal.Error( "GetConstraint: no constraint with id %d exists\n", id );
			return null;
		}
		return this.constraints[id];
	}

	/////*
	////================
	////idPhysics_AF::DeleteBody
	////================
	////*/
	////void idPhysics_AF::DeleteBody( const char *bodyName ) {
	////	var/*int*/i:number;
	////
	////	// find the body with the given name
	////	for ( i = 0; i < this.bodies.Num(); i++ ) {
	////		if ( !this.bodies[i].name.Icmp( bodyName ) ) {
	////			break;
	////		}
	////	}
	////
	////	if ( i >= this.bodies.Num() ) {
	////		gameLocal.Warning( "DeleteBody: no body found in the articulated figure with the name '%s' for entity '%s' type '%s'.",
	////							bodyName, this.self.name.c_str(), this.self.GetType().classname );
	////		return;
	////	}
	////
	////	DeleteBody( i );
	////}
	////
	/////*
	////================
	////idPhysics_AF::DeleteBody
	////================
	////*/
	////void idPhysics_AF::DeleteBody( /*int*/ id:number ) {
	////	int j;
	////
	////	if ( id < 0 || id > this.bodies.Num() ) {
	////		gameLocal.Error( "DeleteBody: no body with id %d.", id );
	////		return;
	////	}
	////
	////	// remove any constraints attached to this body
	////	for ( j = 0; j < this.constraints.Num(); j++ ) {
	////		if ( this.constraints[j].body1 == this.bodies[id] || this.constraints[j].body2 == this.bodies[id] ) {
	////			delete this.constraints[j];
	////			this.constraints.RemoveIndex( j );
	////			j--;
	////		}
	////	}
	////
	////	// remove the body
	////	delete this.bodies[id];
	////	this.bodies.RemoveIndex( id );
	////
	////	// set new body ids
	////	for ( j = 0; j < this.bodies.Num(); j++ ) {
	////		this.bodies[j].clipModel.SetId( j );
	////	}
	////
	////	this.changedAF = true;
	////}
	////
	/*
	================
	idPhysics_AF::DeleteConstraint
	================
	*/
	DeleteConstraint ( constraintName: string ): void {
		var /*int*/i: number;

		// find the constraint with the given name
		for ( i = 0; i < this.constraints.Num ( ); i++ ) {
			if ( !this.constraints[i].name.Icmp( constraintName ) ) {
				break;
			}
		}

		if ( i >= this.constraints.Num ( ) ) {
			gameLocal.Warning( "DeleteConstraint: no constriant found in the articulated figure with the name '%s' for entity '%s' type '%s'.",
				constraintName, this.self.name.c_str ( ), this.self.GetType ( ).classname );
			return;
		}

		this.DeleteConstraint_id( i );
	}

	/*
	================
	idPhysics_AF::DeleteConstraint
	================
	*/
	DeleteConstraint_id( /*int*/ id:number ) :void{
	
		if ( id < 0 || id >= this.constraints.Num() ) {
			gameLocal.Error( "DeleteConstraint: no constraint with id %d.", id );
			return;
		}
	
		// remove the constraint
		$delete (this.constraints[id]);
		delete this.constraints[id];
		this.constraints.RemoveIndex( id );
	
		this.changedAF = true;
	}
	
	/////*
	////================
	////idPhysics_AF::GetBodyContactConstraints
	////================
	////*/
	////int idPhysics_AF::GetBodyContactConstraints( /*int*/ id:number, idAFConstraint_Contact *contacts[], int maxContacts ) const {
	////	int i, numContacts;
	////	var body:idAFBody;
	////	idAFConstraint_Contact *contact;
	////
	////	if ( id < 0 || id >= this.bodies.Num() || maxContacts <= 0 ) {
	////		return 0;
	////	}
	////
	////	numContacts = 0;
	////	body = this.bodies[id];
	////	for ( i = 0; i < this.contactConstraints.Num(); i++ ) {
	////		contact = this.contactConstraints[i];
	////		if ( this.contact.body1 == body || this.contact.body2 == body ) {
	////			contacts[numContacts++] = this.contact;
	////			if ( numContacts >= maxContacts ) {
	////				return numContacts;
	////			}
	////		}
	////	}
	////	return numContacts;
	////}
	
	/*
	================
	idPhysics_AF::SetDefaultFriction
	================
	*/
	SetDefaultFriction ( /*float */linear: number, /*float */angular: number, /*float */contact: number ): void {
		if ( linear < 0.0 || linear > 1.0 ||
			angular < 0.0 || angular > 1.0 ||
			contact < 0.0 || contact > 1.0 ) {
			return;
		}
		this.linearFriction = linear;
		this.angularFriction = angular;
		this.contactFriction = contact;
	}

	/////*
	////================
	////idPhysics_AF::GetImpactInfo
	////================
	////*/
	////void idPhysics_AF::GetImpactInfo( /*int*/ id:number, const idVec3 &point, impactInfo_t *info ) const {
	////	if ( id < 0 || id >= this.bodies.Num() ) {
	////		memset( info, 0, sizeof( *info ) );
	////		return;
	////	}
	////	info.invMass = 1.0 / this.bodies[id].mass;
	////	info.invInertiaTensor = this.bodies[id].current.worldAxis.Transpose() * this.bodies[id].inverseInertiaTensor * this.bodies[id].current.worldAxis;
	////	info.position = point - this.bodies[id].current.worldOrigin;
	////	info.velocity = this.bodies[id].current.spatialVelocity.SubVec3(0) + this.bodies[id].current.spatialVelocity.SubVec3(1).Cross( info.position );
	////}
	////
	/////*
	////================
	////idPhysics_AF::ApplyImpulse
	////================
	////*/
	////void idPhysics_AF::ApplyImpulse( /*int*/ id:number, const idVec3 &point, const idVec3 &impulse ) {
	////	if ( id < 0 || id >= this.bodies.Num() ) {
	////		return;
	////	}
	////	if ( this.noImpact || impulse.LengthSqr() < Square( this.impulseThreshold ) ) {
	////		return;
	////	}
	////	idMat3 invWorldInertiaTensor = this.bodies[id].current.worldAxis.Transpose() * this.bodies[id].inverseInertiaTensor * this.bodies[id].current.worldAxis;
	////	this.bodies[id].current.spatialVelocity.SubVec3(0) += this.bodies[id].invMass * impulse;
	////	this.bodies[id].current.spatialVelocity.SubVec3(1) += invWorldInertiaTensor * (point - this.bodies[id].current.worldOrigin).Cross( impulse );
	////	this.Activate();
	////}
	////
	/////*
	////================
	////idPhysics_AF::AddForce
	////================
	////*/
	////void idPhysics_AF::AddForce( /*int*/ id:number, const idVec3 &point, const idVec3 &force ) {
	////	if ( this.noImpact ) {
	////		return;
	////	}
	////	if ( id < 0 || id >= this.bodies.Num() ) {
	////		return;
	////	}
	////	this.bodies[id].current.externalForce.SubVec3( 0 ) += force;
	////	this.bodies[id].current.externalForce.SubVec3( 1 ) += (point - this.bodies[id].current.worldOrigin).Cross( force );
	////	this.Activate();
	////}
	////
	/*
	================
	idPhysics_AF::IsAtRest
	================
	*/
	IsAtRest(): boolean {
		return this.current.atRest >= 0;
	}
	////
	/////*
	////================
	////idPhysics_AF::GetRestStartTime
	////================
	////*/
	////int idPhysics_AF::GetRestStartTime( ) const {
	////	return this.current.atRest;
	////}
	////
	/////*
	////================
	////idPhysics_AF::IsPushable
	////================
	////*/
	////bool idPhysics_AF::IsPushable( ) const {
	////	return ( !this.noImpact && ( this.masterBody == NULL || this.forcePushable ) );
	////}
	////
	/////*
	////================
	////idPhysics_AF::SaveState
	////================
	////*/
	////void idPhysics_AF::SaveState( ) {
	////	var/*int*/i:number;
	////
	////	this.saved = this.current;
	////
	////	for ( i = 0; i < this.bodies.Num(); i++ ) {
	////		memcpy( &this.bodies[i].saved, this.bodies[i].current, sizeof( AFBodyPState_t ) );
	////	}
	////}
	////
	/////*
	////================
	////idPhysics_AF::RestoreState
	////================
	////*/
	////void idPhysics_AF::RestoreState( ) {
	////	var/*int*/i:number;
	////
	////	this.current = this.saved;
	////
	////	for ( i = 0; i < this.bodies.Num(); i++ ) {
	////		*(this.bodies[i].current) = this.bodies[i].saved;
	////	}
	////
	////	EvaluateContacts();
	////}
	
	/*
	================
	idPhysics_AF::SetOrigin
	================
	*/
	SetOrigin(newOrigin: idVec3, /*int*/ id: number = -1): void {
		if (this.masterBody) {
			debugger;// translate argument
			this.Translate(this.masterBody.current.worldOrigin.opAddition(this.masterBody.current.worldAxis.opMultiplication_Vec( newOrigin ).opSubtraction( this.bodies[0].current.worldOrigin ) ) );
		} else {
			this.Translate( newOrigin.opSubtraction( this.bodies[0].current.worldOrigin ) );
		}
	}
	
	/*
	================
	idPhysics_AF::SetAxis
	================
	*/
    SetAxis ( newAxis: idMat3, /*int*/ id: number = -1 ): void {
        var axis = new idMat3;
        var rotation = new idRotation;

        if ( this.masterBody ) {
            axis.opEquals( this.bodies[0].current.worldAxis.Transpose ( ).opMultiplication( ( newAxis.opMultiplication( this.masterBody.current.worldAxis ) ) ) );
        } else {
            axis.opEquals( this.bodies[0].current.worldAxis.Transpose ( ) .opMultiplication( newAxis ));
        }
        rotation.opEquals( axis.ToRotation ( ) );
        rotation.SetOrigin( this.bodies[0].current.worldOrigin );

        this.Rotate( rotation );
    }

    /*
	================
	idPhysics_AF::Translate
	================
	*/
    Translate ( translation: idVec3, id: number = -1 ): void {
        todoThrow ( );
        //var/*int*/i:number;
        //var body:idAFBody;

        //if ( !this.worldConstraintsLocked ) {
        //	// translate this.constraints attached to the world
        //	for ( i = 0; i < this.constraints.Num(); i++ ) {
        //		this.constraints[i].Translate( translation );
        //	}
        //}

        //// translate all the bodies
        //for ( i = 0; i < this.bodies.Num(); i++ ) {

        //	body = this.bodies[i];
        //	body.current.worldOrigin += translation;
        //}

        //this.Activate();

        //UpdateClipModels();
    }

    /*
	================
	idPhysics_AF::Rotate
	================
	*/
    Rotate(rotation: idRotation , /*int*/ id:number  = -1) :void{
		var/*int*/i:number;
		var body:idAFBody;
	
		if ( !this.worldConstraintsLocked ) {
			// rotate this.constraints attached to the world
			for ( i = 0; i < this.constraints.Num(); i++ ) {
				this.constraints[i].Rotate( rotation );
			}
		}
	
		// rotate all the bodies
		for ( i = 0; i < this.bodies.Num(); i++ ) {
			body = this.bodies[i];
		    todoThrow ( );
			//body.current.worldOrigin.opMultiplicationAssignment(rotation);
            //body.current.worldAxis.opMultiplicationAssignment(rotation.ToMat3());
		}
	
		this.Activate();
	
		this.UpdateClipModels();
	}
	
	/*
	================
	idPhysics_AF::GetOrigin
	================
	*/
	GetOrigin( /*int*/ id: number = 0): idVec3 {
		if ( id < 0 || id >= this.bodies.Num() ) {
			return vec3_origin;
		}
		else {
			return this.bodies[id].current.worldOrigin;
		}
	}

	/*
	================
	idPhysics_AF::GetAxis
	================
	*/
	GetAxis( /*int*/ id: number = 0): idMat3 {
		if ( id < 0 || id >= this.bodies.Num() ) {
			return mat3_identity;
		}
		else {
			return this.bodies[id].current.worldAxis;
		}
	}

/////*
////================
////idPhysics_AF::SetLinearVelocity
////================
////*/
////void idPhysics_AF::SetLinearVelocity( const idVec3 &newLinearVelocity, /*int*/ id:number ) {
////	if ( id < 0 || id >= this.bodies.Num() ) {
////		return;
////	}
////	this.bodies[id].current.spatialVelocity.SubVec3( 0 ) = newLinearVelocity;
////	this.Activate();
////}
////
/////*
////================
////idPhysics_AF::SetAngularVelocity
////================
////*/
////void idPhysics_AF::SetAngularVelocity( const idVec3 &newAngularVelocity, /*int*/ id:number ) {
////	if ( id < 0 || id >= this.bodies.Num() ) {
////		return;
////	}
////	this.bodies[id].current.spatialVelocity.SubVec3( 1 ) = newAngularVelocity;
////	this.Activate();
////}
////
/////*
////================
////idPhysics_AF::GetLinearVelocity
////================
////*/
////const idVec3 &idPhysics_AF::GetLinearVelocity( /*int*/ id:number ) const {
////	if ( id < 0 || id >= this.bodies.Num() ) {
////		return vec3_origin;
////	}
////	else {
////		return this.bodies[id].current.spatialVelocity.SubVec3( 0 );
////	}
////}
////
/////*
////================
////idPhysics_AF::GetAngularVelocity
////================
////*/
////const idVec3 &idPhysics_AF::GetAngularVelocity( /*int*/ id:number ) const {
////	if ( id < 0 || id >= this.bodies.Num() ) {
////		return vec3_origin;
////	}
////	else {
////		return this.bodies[id].current.spatialVelocity.SubVec3( 1 );
////	}
////}
////
/////*
////================
////idPhysics_AF::ClipTranslation
////================
////*/
////void idPhysics_AF::ClipTranslation( trace_t &results, const idVec3 &translation, const idClipModel *model ) const {
////	var/*int*/i:number;
////	var body:idAFBody;
////	trace_t bodyResults;
////
////	results.fraction = 1.0;
////
////	for ( i = 0; i < this.bodies.Num(); i++ ) {
////		body = this.bodies[i];
////
////		if ( body.clipModel.IsTraceModel() ) {
////			if ( model ) {
////				gameLocal.clip.TranslationModel( bodyResults, body.current.worldOrigin, body.current.worldOrigin + translation,
////									body.clipModel, body.current.worldAxis, body.clipMask,
////										model.Handle(), model.GetOrigin(), model.GetAxis() );
////			}
////			else {
////				gameLocal.clip.Translation( bodyResults, body.current.worldOrigin, body.current.worldOrigin + translation,
////									body.clipModel, body.current.worldAxis, body.clipMask, this.self );
////			}
////			if ( bodyResults.fraction < results.fraction ) {
////				results = bodyResults;
////			}
////		}
////	}
////
////	results.endpos = this.bodies[0].current.worldOrigin + results.fraction * translation;
////	results.endAxis = this.bodies[0].current.worldAxis;
////}
////
/////*
////================
////idPhysics_AF::ClipRotation
////================
////*/
////void idPhysics_AF::ClipRotation( trace_t &results, const idRotation &rotation, const idClipModel *model ) const {
////	var/*int*/i:number;
////	var body:idAFBody;
////	trace_t bodyResults;
////	idRotation partialRotation;
////
////	results.fraction = 1.0;
////
////	for ( i = 0; i < this.bodies.Num(); i++ ) {
////		body = this.bodies[i];
////
////		if ( body.clipModel.IsTraceModel() ) {
////			if ( model ) {
////				gameLocal.clip.RotationModel( bodyResults, body.current.worldOrigin, rotation,
////									body.clipModel, body.current.worldAxis, body.clipMask,
////										model.Handle(), model.GetOrigin(), model.GetAxis() );
////			}
////			else {
////				gameLocal.clip.Rotation( bodyResults, body.current.worldOrigin, rotation,
////									body.clipModel, body.current.worldAxis, body.clipMask, this.self );
////			}
////			if ( bodyResults.fraction < results.fraction ) {
////				results = bodyResults;
////			}
////		}
////	}
////
////	partialRotation = rotation * results.fraction;
////	results.endpos = this.bodies[0].current.worldOrigin * partialRotation;
////	results.endAxis = this.bodies[0].current.worldAxis * partialRotation.ToMat3();
////}
////
/////*
////================
////idPhysics_AF::ClipContents
////================
////*/
////int idPhysics_AF::ClipContents( const idClipModel *model ) const {
////	int i, contents;
////	var body:idAFBody;
////
////	contents = 0;
////
////	for ( i = 0; i < this.bodies.Num(); i++ ) {
////		body = this.bodies[i];
////
////		if ( body.clipModel.IsTraceModel() ) {
////			if ( model ) {
////				contents |= gameLocal.clip.ContentsModel( body.current.worldOrigin,
////									body.clipModel, body.current.worldAxis, -1,
////										model.Handle(), model.GetOrigin(), model.GetAxis() );
////			}
////			else {
////				contents |= gameLocal.clip.Contents( body.current.worldOrigin,
////									body.clipModel, body.current.worldAxis, -1, NULL );
////			}
////		}
////	}
////
////	return contents;
////}

/*
================
idPhysics_AF::DisableClip
================
*/
	DisableClip ( ): void {
		var /*int*/i: number;

		for ( i = 0; i < this.bodies.Num ( ); i++ ) {
			this.bodies[i].clipModel.Disable ( );
		}
	}

/*
================
idPhysics_AF::EnableClip
================
*/
	EnableClip ( ): void {
		var /*int*/i: number;

		for ( i = 0; i < this.bodies.Num ( ); i++ ) {
			this.bodies[i].clipModel.Enable ( );
		}
	}

/////*
////================
////idPhysics_AF::UnlinkClip
////================
////*/
////void idPhysics_AF::UnlinkClip( ) {
////	var/*int*/i:number;
////
////	for ( i = 0; i < this.bodies.Num(); i++ ) {
////		this.bodies[i].clipModel.Unlink();
////	}
////}
////
/////*
////================
////idPhysics_AF::LinkClip
////================
////*/
////void idPhysics_AF::LinkClip( ) {
////	UpdateClipModels();
////}
////
/////*
////================
////idPhysics_AF::SetPushed
////================
////*/
////void idPhysics_AF::SetPushed( int deltaTime ) {
////	var body:idAFBody;
////	idRotation rotation;
////
////	if ( this.bodies.Num() ) {
////		body = this.bodies[0];
////		rotation = ( body.saved.worldAxis.Transpose() * body.current.worldAxis ).ToRotation();
////
////		// velocity with which the af is pushed
////		this.current.pushVelocity.SubVec3(0) += ( body.current.worldOrigin - body.saved.worldOrigin ) / ( deltaTime * idMath::M_MS2SEC );
////		this.current.pushVelocity.SubVec3(1) += rotation.GetVec() * -DEG2RAD( rotation.GetAngle() ) / ( deltaTime * idMath::M_MS2SEC );
////	}
////}
////
/////*
////================
////idPhysics_AF::GetPushedLinearVelocity
////================
////*/
////const idVec3 &idPhysics_AF::GetPushedLinearVelocity( const /*int*/ id:number ) const {
////	return this.current.pushVelocity.SubVec3(0);
////}
////
/////*
////================
////idPhysics_AF::GetPushedAngularVelocity
////================
////*/
////const idVec3 &idPhysics_AF::GetPushedAngularVelocity( const /*int*/ id:number ) const {
////	return this.current.pushVelocity.SubVec3(1);
////}
////
/*
================
idPhysics_AF::SetMaster

   the binding is orientated based on the constraints being used
================
*/
SetMaster(master:idEntity , orientated:boolean = true):void {
	var/*int*/i:number;
	var masterOrigin = new idVec3 ;
	var masterAxis = new idMat3;
	var rotation = new idRotation;

	if ( master ) {
		this.self.GetMasterPosition( masterOrigin, masterAxis );
		if ( !this.masterBody ) {
			this.masterBody = new idAFBody();
			// translate and rotate all the constraints with body2 == NULL from world space to master space
			rotation.opEquals( masterAxis.Transpose ( ).ToRotation ( ) );
			for ( i = 0; i < this.constraints.Num(); i++ ) {
				if ( this.constraints[i].GetBody2() == null ) {
					this.constraints[i].Translate( masterOrigin.opUnaryMinus() );
					this.constraints[i].Rotate( rotation );
				}
			}
			this.Activate();
		}
		this.masterBody.current.worldOrigin.opEquals( masterOrigin );
		this.masterBody.current.worldAxis.opEquals( masterAxis );
	}
	else {
		if ( this.masterBody ) {
			// translate and rotate all the constraints with body2 == NULL from master space to world space
			rotation = this.masterBody.current.worldAxis.ToRotation();
			for ( i = 0; i < this.constraints.Num(); i++ ) {
				if ( this.constraints[i].GetBody2() == null ) {
					this.constraints[i].Rotate( rotation );
					this.constraints[i].Translate( this.masterBody.current.worldOrigin );
				}
			}
            $delete(this.masterBody);
			delete this.masterBody;
			this.masterBody = null;
			this.Activate();
		}
	}
}


////const float	AF_VELOCITY_MAX				= 16000;
////const int	AF_VELOCITY_TOTAL_BITS		= 16;
////const int	AF_VELOCITY_EXPONENT_BITS	= idMath::BitsForInteger( idMath::BitsForFloat( AF_VELOCITY_MAX ) ) + 1;
////const int	AF_VELOCITY_MANTISSA_BITS	= AF_VELOCITY_TOTAL_BITS - 1 - AF_VELOCITY_EXPONENT_BITS;
////const float	AF_FORCE_MAX				= 1e20f;
////const int	AF_FORCE_TOTAL_BITS			= 16;
////const int	AF_FORCE_EXPONENT_BITS		= idMath::BitsForInteger( idMath::BitsForFloat( AF_FORCE_MAX ) ) + 1;
////const int	AF_FORCE_MANTISSA_BITS		= AF_FORCE_TOTAL_BITS - 1 - AF_FORCE_EXPONENT_BITS;
////
/////*
////================
////idPhysics_AF::WriteToSnapshot
////================
////*/
////void idPhysics_AF::WriteToSnapshot( idBitMsgDelta &msg ) const {
////	var/*int*/i:number;
////	idCQuat quat;
////
////	msg.WriteLong( this.current.atRest );
////	msg.WriteFloat( this.current.noMoveTime );
////	msg.WriteFloat( this.current.activateTime );
////	msg.WriteDeltaFloat( 0.0, this.current.pushVelocity[0], AF_VELOCITY_EXPONENT_BITS, AF_VELOCITY_MANTISSA_BITS );
////	msg.WriteDeltaFloat( 0.0, this.current.pushVelocity[1], AF_VELOCITY_EXPONENT_BITS, AF_VELOCITY_MANTISSA_BITS );
////	msg.WriteDeltaFloat( 0.0, this.current.pushVelocity[2], AF_VELOCITY_EXPONENT_BITS, AF_VELOCITY_MANTISSA_BITS );
////	msg.WriteDeltaFloat( 0.0, this.current.pushVelocity[3], AF_VELOCITY_EXPONENT_BITS, AF_VELOCITY_MANTISSA_BITS );
////	msg.WriteDeltaFloat( 0.0, this.current.pushVelocity[4], AF_VELOCITY_EXPONENT_BITS, AF_VELOCITY_MANTISSA_BITS );
////	msg.WriteDeltaFloat( 0.0, this.current.pushVelocity[5], AF_VELOCITY_EXPONENT_BITS, AF_VELOCITY_MANTISSA_BITS );
////
////	msg.WriteByte( this.bodies.Num() );
////
////	for ( i = 0; i < this.bodies.Num(); i++ ) {
////		AFBodyPState_t *state = this.bodies[i].current;
////		quat = state.worldAxis.ToCQuat();
////
////		msg.WriteFloat( state.worldOrigin[0] );
////		msg.WriteFloat( state.worldOrigin[1] );
////		msg.WriteFloat( state.worldOrigin[2] );
////		msg.WriteFloat( quat.x );
////		msg.WriteFloat( quat.y );
////		msg.WriteFloat( quat.z );
////		msg.WriteDeltaFloat( 0.0, state.spatialVelocity[0], AF_VELOCITY_EXPONENT_BITS, AF_VELOCITY_MANTISSA_BITS );
////		msg.WriteDeltaFloat( 0.0, state.spatialVelocity[1], AF_VELOCITY_EXPONENT_BITS, AF_VELOCITY_MANTISSA_BITS );
////		msg.WriteDeltaFloat( 0.0, state.spatialVelocity[2], AF_VELOCITY_EXPONENT_BITS, AF_VELOCITY_MANTISSA_BITS );
////		msg.WriteDeltaFloat( 0.0, state.spatialVelocity[3], AF_VELOCITY_EXPONENT_BITS, AF_VELOCITY_MANTISSA_BITS );
////		msg.WriteDeltaFloat( 0.0, state.spatialVelocity[4], AF_VELOCITY_EXPONENT_BITS, AF_VELOCITY_MANTISSA_BITS );
////		msg.WriteDeltaFloat( 0.0, state.spatialVelocity[5], AF_VELOCITY_EXPONENT_BITS, AF_VELOCITY_MANTISSA_BITS );
/////*		msg.WriteDeltaFloat( 0.0, state.externalForce[0], AF_FORCE_EXPONENT_BITS, AF_FORCE_MANTISSA_BITS );
////		msg.WriteDeltaFloat( 0.0, state.externalForce[1], AF_FORCE_EXPONENT_BITS, AF_FORCE_MANTISSA_BITS );
////		msg.WriteDeltaFloat( 0.0, state.externalForce[2], AF_FORCE_EXPONENT_BITS, AF_FORCE_MANTISSA_BITS );
////		msg.WriteDeltaFloat( 0.0, state.externalForce[3], AF_FORCE_EXPONENT_BITS, AF_FORCE_MANTISSA_BITS );
////		msg.WriteDeltaFloat( 0.0, state.externalForce[4], AF_FORCE_EXPONENT_BITS, AF_FORCE_MANTISSA_BITS );
////		msg.WriteDeltaFloat( 0.0, state.externalForce[5], AF_FORCE_EXPONENT_BITS, AF_FORCE_MANTISSA_BITS );
////*/
////	}
////}
////
/////*
////================
////idPhysics_AF::ReadFromSnapshot
////================
////*/
////void idPhysics_AF::ReadFromSnapshot( const idBitMsgDelta &msg ) {
////	int i, num;
////	idCQuat quat;
////
////	this.current.atRest = msg.ReadLong();
////	this.current.noMoveTime = msg.ReadFloat();
////	this.current.activateTime = msg.ReadFloat();
////	this.current.pushVelocity[0] = msg.ReadDeltaFloat( 0.0, AF_VELOCITY_EXPONENT_BITS, AF_VELOCITY_MANTISSA_BITS );
////	this.current.pushVelocity[1] = msg.ReadDeltaFloat( 0.0, AF_VELOCITY_EXPONENT_BITS, AF_VELOCITY_MANTISSA_BITS );
////	this.current.pushVelocity[2] = msg.ReadDeltaFloat( 0.0, AF_VELOCITY_EXPONENT_BITS, AF_VELOCITY_MANTISSA_BITS );
////	this.current.pushVelocity[3] = msg.ReadDeltaFloat( 0.0, AF_VELOCITY_EXPONENT_BITS, AF_VELOCITY_MANTISSA_BITS );
////	this.current.pushVelocity[4] = msg.ReadDeltaFloat( 0.0, AF_VELOCITY_EXPONENT_BITS, AF_VELOCITY_MANTISSA_BITS );
////	this.current.pushVelocity[5] = msg.ReadDeltaFloat( 0.0, AF_VELOCITY_EXPONENT_BITS, AF_VELOCITY_MANTISSA_BITS );
////
////	num = msg.ReadByte();
////	assert( num == this.bodies.Num() );
////
////	for ( i = 0; i < this.bodies.Num(); i++ ) {
////		AFBodyPState_t *state = this.bodies[i].current;
////
////		state.worldOrigin[0] = msg.ReadFloat();
////		state.worldOrigin[1] = msg.ReadFloat();
////		state.worldOrigin[2] = msg.ReadFloat();
////		quat.x = msg.ReadFloat();
////		quat.y = msg.ReadFloat();
////		quat.z = msg.ReadFloat();
////		state.spatialVelocity[0] = msg.ReadDeltaFloat( 0.0, AF_VELOCITY_EXPONENT_BITS, AF_VELOCITY_MANTISSA_BITS );
////		state.spatialVelocity[1] = msg.ReadDeltaFloat( 0.0, AF_VELOCITY_EXPONENT_BITS, AF_VELOCITY_MANTISSA_BITS );
////		state.spatialVelocity[2] = msg.ReadDeltaFloat( 0.0, AF_VELOCITY_EXPONENT_BITS, AF_VELOCITY_MANTISSA_BITS );
////		state.spatialVelocity[3] = msg.ReadDeltaFloat( 0.0, AF_VELOCITY_EXPONENT_BITS, AF_VELOCITY_MANTISSA_BITS );
////		state.spatialVelocity[4] = msg.ReadDeltaFloat( 0.0, AF_VELOCITY_EXPONENT_BITS, AF_VELOCITY_MANTISSA_BITS );
////		state.spatialVelocity[5] = msg.ReadDeltaFloat( 0.0, AF_VELOCITY_EXPONENT_BITS, AF_VELOCITY_MANTISSA_BITS );
/////*		state.externalForce[0] = msg.ReadDeltaFloat( 0.0, AF_FORCE_EXPONENT_BITS, AF_FORCE_MANTISSA_BITS );
////		state.externalForce[1] = msg.ReadDeltaFloat( 0.0, AF_FORCE_EXPONENT_BITS, AF_FORCE_MANTISSA_BITS );
////		state.externalForce[2] = msg.ReadDeltaFloat( 0.0, AF_FORCE_EXPONENT_BITS, AF_FORCE_MANTISSA_BITS );
////		state.externalForce[3] = msg.ReadDeltaFloat( 0.0, AF_FORCE_EXPONENT_BITS, AF_FORCE_MANTISSA_BITS );
////		state.externalForce[4] = msg.ReadDeltaFloat( 0.0, AF_FORCE_EXPONENT_BITS, AF_FORCE_MANTISSA_BITS );
////		state.externalForce[5] = msg.ReadDeltaFloat( 0.0, AF_FORCE_EXPONENT_BITS, AF_FORCE_MANTISSA_BITS );
////*/
////		state.worldAxis = quat.ToMat3();
////	}
////
////	UpdateClipModels();
////}
};

////#endif /* !__PHYSICS_AF_H__ */
