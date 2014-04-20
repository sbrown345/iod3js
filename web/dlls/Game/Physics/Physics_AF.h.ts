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

// base class for all constraints
class idAFConstraint {
////
////	friend class idPhysics_AF;
////	friend class idAFTree;
////
////public:
////							idAFConstraint( );
////	virtual					~idAFConstraint( );
	GetType( ) :constraintType_t { return this.type; }
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
////
////							// simulation variables set by Evaluate
////	idMatX					J1, J2;						// matrix with left hand side of constraint equations
////	idVecX					c1, c2;						// right hand side of constraint equations
////	idVecX					lo, hi, e;					// low and high bounds and lcp epsilon
	boxConstraint:idAFConstraint;				// constraint the boxIndex refers to
	boxIndex = new Int32Array(6);				// indexes for special box constrained variables
////
////							// simulation variables used during calculations
////	idMatX					invI;						// transformed inertia
////	idMatX					J;							// transformed constraint matrix
////	idVecX					s;							// temp solution
////	idVecX					lm;							// lagrange multipliers
	firstIndex :number/*int*/;					// index of the first constraint row in the lcp matrix

////	struct constraintFlags_s {
////		bool				allowPrimary		: 1;	// true if the constraint can be used as a primary constraint
////		bool				frameConstraint		: 1;	// true if this constraint is added to the frame constraints
////		bool				noCollision			: 1;	// true if body1 and body2 never collide with each other
////		bool				isPrimary			: 1;	// true if this is a primary constraint
////		bool				isZero				: 1;	// true if 's' is zero during calculations
////	} fl;
////
////protected:
////	virtual void			Evaluate( float invTimeStep );
////	virtual void			ApplyFriction( float invTimeStep );
////	void					InitSize( int size );
};

// fixed or rigid joint which allows zero degrees of freedom
// constrains body1 to have a fixed position and orientation relative to body2
class idAFConstraint_Fixed extends idAFConstraint {
////
////public:
////							idAFConstraint_Fixed( const idStr &name, idAFBody *body1, idAFBody *body2 );
////	void					SetRelativeOrigin( const idVec3 &origin ) { this.offset = origin; }
////	void					SetRelativeAxis( const idMat3 &axis ) { this.relAxis = axis; }
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
////	idVec3					offset;						// offset of body1 relative to body2 in body2 space
////	idMat3					relAxis;					// rotation of body1 relative to body2
////
////protected:
////	virtual void			Evaluate( float invTimeStep );
////	virtual void			ApplyFriction( float invTimeStep );
////	void					InitOffset( );
};

// ball and socket or spherical joint which allows 3 degrees of freedom
// constrains body1 relative to body2 with a ball and socket joint
class idAFConstraint_BallAndSocketJoint extends idAFConstraint {
////
////public:
////							idAFConstraint_BallAndSocketJoint( const idStr &name, idAFBody *body1, idAFBody *body2 );
////							~idAFConstraint_BallAndSocketJoint( );
////	void					SetAnchor( const idVec3 &worldPosition );
////	idVec3					GetAnchor( ) const;
////	void					SetNoLimit( );
////	void					SetConeLimit( const idVec3 &coneAxis, const float coneAngle, const idVec3 &body1Axis );
////	void					SetPyramidLimit( const idVec3 &pyramidAxis, const idVec3 &baseAxis,
////											const float angle1, const float angle2, const idVec3 &body1Axis );
////	void					SetLimitEpsilon( const float e );
////	void					SetFriction( const float f ) { friction = f; }
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
////	idVec3					anchor1;					// anchor in body1 space
////	idVec3					anchor2;					// anchor in body2 space
////	float					friction;					// joint friction
////	idAFConstraint_ConeLimit *coneLimit;				// cone shaped limit
////	idAFConstraint_PyramidLimit *pyramidLimit;			// pyramid shaped limit
////	idAFConstraint_BallAndSocketJointFriction *fc;		// friction constraint
////
////protected:
////	virtual void			Evaluate( float invTimeStep );
////	virtual void			ApplyFriction( float invTimeStep );
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
};

// universal, Cardan or Hooke joint which allows 2 degrees of freedom
// like a ball and socket joint but also constrains the rotation about the cardan shafts
class idAFConstraint_UniversalJoint extends idAFConstraint {

////public:
////							idAFConstraint_UniversalJoint( const idStr &name, idAFBody *body1, idAFBody *body2 );
////							~idAFConstraint_UniversalJoint( );
////	void					SetAnchor( const idVec3 &worldPosition );
////	idVec3					GetAnchor( ) const;
////	void					SetShafts( const idVec3 &cardanShaft1, const idVec3 &cardanShaft2 );
////	void					GetShafts( idVec3 &cardanShaft1, idVec3 &cardanShaft2 ) { cardanShaft1 = shaft1; cardanShaft2 = shaft2; }
////	void					SetNoLimit( );
////	void					SetConeLimit( const idVec3 &coneAxis, const float coneAngle );
////	void					SetPyramidLimit( const idVec3 &pyramidAxis, const idVec3 &baseAxis,
////											const float angle1, const float angle2 );
////	void					SetLimitEpsilon( const float e );
////	void					SetFriction( const float f ) { friction = f; }
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
////	idVec3					anchor1;					// anchor in body1 space
////	idVec3					anchor2;					// anchor in body2 space
////	idVec3					shaft1;						// body1 cardan shaft in body1 space
////	idVec3					shaft2;						// body2 cardan shaft in body2 space
////	idVec3					axis1;						// cardan axis in body1 space
////	idVec3					axis2;						// cardan axis in body2 space
////	float					friction;					// joint friction
////	idAFConstraint_ConeLimit *coneLimit;				// cone shaped limit
////	idAFConstraint_PyramidLimit *pyramidLimit;			// pyramid shaped limit
////	idAFConstraint_UniversalJointFriction *fc;			// friction constraint
////
////protected:
////	virtual void			Evaluate( float invTimeStep );
////	virtual void			ApplyFriction( float invTimeStep );
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
};

// cylindrical joint which allows 2 degrees of freedom
// constrains body1 to lie on a line relative to body2 and allows only translation along and rotation about the line
class idAFConstraint_CylindricalJoint extends idAFConstraint {
////
////public:
////							idAFConstraint_CylindricalJoint( const idStr &name, idAFBody *body1, idAFBody *body2 );
////	virtual void			DebugDraw( );
////	virtual void			Translate( const idVec3 &translation );
////	virtual void			Rotate( const idRotation &rotation );
////
////protected:
////
////protected:
////	virtual void			Evaluate( float invTimeStep );
////	virtual void			ApplyFriction( float invTimeStep );
};

// hinge, revolute or pin joint which allows 1 degree of freedom
// constrains all motion of body1 relative to body2 except the rotation about the hinge axis
class idAFConstraint_Hinge extends idAFConstraint {
////
////public:
////							idAFConstraint_Hinge( const idStr &name, idAFBody *body1, idAFBody *body2 );
////							~idAFConstraint_Hinge( );
////	void					SetAnchor( const idVec3 &worldPosition );
////	idVec3					GetAnchor( ) const;
////	void					SetAxis( const idVec3 &axis );
////	void					GetAxis( idVec3 &a1, idVec3 &a2 ) const { a1 = axis1; a2 = axis2; }
////	idVec3					GetAxis( ) const;
////	void					SetNoLimit( );
////	void					SetLimit( const idVec3 &axis, const float angle, const idVec3 &body1Axis );
////	void					SetLimitEpsilon( const float e );
////	float					GetAngle( ) const;
////	void					SetSteerAngle( const float degrees );
////	void					SetSteerSpeed( const float speed );
////	void					SetFriction( const float f ) { friction = f; }
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
////	idVec3					anchor1;					// anchor in body1 space
////	idVec3					anchor2;					// anchor in body2 space
////	idVec3					axis1;						// axis in body1 space
////	idVec3					axis2;						// axis in body2 space
////	idMat3					initialAxis;				// initial axis of body1 relative to body2
////	float					friction;					// hinge friction
////	idAFConstraint_ConeLimit *coneLimit;				// cone limit
////	idAFConstraint_HingeSteering *steering;				// steering
////	idAFConstraint_HingeFriction *fc;					// friction constraint
////
////protected:
////	virtual void			Evaluate( float invTimeStep );
////	virtual void			ApplyFriction( float invTimeStep );
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
////	float					steerAngle;					// desired steer angle in degrees
////	float					steerSpeed;					// steer speed
////	float					epsilon;					// lcp epsilon
////
////protected:
////	virtual void			Evaluate( float invTimeStep );
////	virtual void			ApplyFriction( float invTimeStep );
};

// slider, prismatic or translational constraint which allows 1 degree of freedom
// constrains body1 to lie on a line relative to body2, the orientation is also fixed relative to body2
class idAFConstraint_Slider extends idAFConstraint {
////
////public:
////							idAFConstraint_Slider( const idStr &name, idAFBody *body1, idAFBody *body2 );
////	void					SetAxis( const idVec3 &ax );
////	virtual void			DebugDraw( );
////	virtual void			Translate( const idVec3 &translation );
////	virtual void			Rotate( const idRotation &rotation );
////	virtual void			GetCenter( idVec3 &center );
////	virtual void			Save( idSaveGame *saveFile ) const;
////	virtual void			Restore( idRestoreGame *saveFile );
////
////protected:
////	idVec3					axis;						// axis along which body1 slides in body2 space
////	idVec3					offset;						// offset of body1 relative to body2
////	idMat3					relAxis;					// rotation of body1 relative to body2
////
////protected:
////	virtual void			Evaluate( float invTimeStep );
////	virtual void			ApplyFriction( float invTimeStep );
};

// line constraint which allows 4 degrees of freedom
// constrains body1 to lie on a line relative to body2, does not constrain the orientation.
class idAFConstraint_Line extends idAFConstraint {
////
////public:
////							idAFConstraint_Line( const idStr &name, idAFBody *body1, idAFBody *body2 );
////	virtual void			DebugDraw( );
////	virtual void			Translate( const idVec3 &translation );
////	virtual void			Rotate( const idRotation &rotation );
////
////protected:
////
////protected:
////	virtual void			Evaluate( float invTimeStep );
////	virtual void			ApplyFriction( float invTimeStep );
};

// plane constraint which allows 5 degrees of freedom
// constrains body1 to lie in a plane relative to body2, does not constrain the orientation.
class idAFConstraint_Plane extends idAFConstraint {
////
////public:
////							idAFConstraint_Plane( const idStr &name, idAFBody *body1, idAFBody *body2 );
////	void					SetPlane( const idVec3 &normal, const idVec3 &anchor );
////	virtual void			DebugDraw( );
////	virtual void			Translate( const idVec3 &translation );
////	virtual void			Rotate( const idRotation &rotation );
////	virtual void			Save( idSaveGame *saveFile ) const;
////	virtual void			Restore( idRestoreGame *saveFile );
////
////protected:
////	idVec3					anchor1;					// anchor in body1 space
////	idVec3					anchor2;					// anchor in body2 space
////	idVec3					planeNormal;				// plane normal in body2 space
////
////protected:
////	virtual void			Evaluate( float invTimeStep );
////	virtual void			ApplyFriction( float invTimeStep );
};

// spring constraint which allows 6 or 5 degrees of freedom based on the spring limits
// constrains body1 relative to body2 with a spring
class idAFConstraint_Spring extends idAFConstraint {
////
////public:
////							idAFConstraint_Spring( const idStr &name, idAFBody *body1, idAFBody *body2 );
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
////	idVec3					anchor1;					// anchor in body1 space
////	idVec3					anchor2;					// anchor in body2 space
////	float					kstretch;					// spring constant when stretched
////	float					kcompress;					// spring constant when compressed
////	float					damping;					// spring damping
////	float					restLength;					// rest length of spring
////	float					minLength;					// minimum spring length
////	float					maxLength;					// maximum spring length
////
////protected:
////	virtual void			Evaluate( float invTimeStep );
////	virtual void			ApplyFriction( float invTimeStep );
};

// constrains body1 to either be in contact with or move away from body2
class idAFConstraint_Contact extends idAFConstraint {
////
////public:
////							idAFConstraint_Contact( );
////							~idAFConstraint_Contact( );
////	void					Setup( idAFBody *b1, idAFBody *b2, contactInfo_t &c );
////	const contactInfo_t &	GetContact( ) const { return contact; }
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
////	idVec3					coneAnchor;					// top of the cone in body2 space
////	idVec3					coneAxis;					// cone axis in body2 space
////	idVec3					body1Axis;					// axis in body1 space that should stay within the cone
////	float					cosAngle;					// cos( coneAngle / 2 )
////	float					sinHalfAngle;				// sin( coneAngle / 4 )
////	float					cosHalfAngle;				// cos( coneAngle / 4 )
////	float					epsilon;					// lcp epsilon
////
////protected:
////	virtual void			Evaluate( float invTimeStep );
////	virtual void			ApplyFriction( float invTimeStep );
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
////	idVec3					pyramidAnchor;				// top of the pyramid in body2 space
////	idMat3					pyramidBasis;				// pyramid basis in body2 space with base[2] being the pyramid axis
////	idVec3					body1Axis;					// axis in body1 space that should stay within the cone
////	float					cosAngle[2];				// cos( pyramidAngle / 2 )
////	float					sinHalfAngle[2];			// sin( pyramidAngle / 4 )
////	float					cosHalfAngle[2];			// cos( pyramidAngle / 4 )
////	float					epsilon;					// lcp epsilon
////
////protected:
////	virtual void			Evaluate( float invTimeStep );
////	virtual void			ApplyFriction( float invTimeStep );
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
////	float					epsilon;					// lcp epsilon
////
////protected:
////	virtual void			Evaluate( float invTimeStep );
////	virtual void			ApplyFriction( float invTimeStep );
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
////	float					GetContactFriction( ) const { return contactFriction; }
////	void					SetBouncyness( float bounce );
////	float					GetBouncyness( ) const { return bouncyness; }
////	void					SetDensity( float density, const idMat3 &inertiaScale = mat3_identity );
////	float					GetInverseMass( ) const { return invMass; }
////	idMat3					GetInverseWorldInertia( ) const { return this.current.worldAxis.Transpose() * inverseInertiaTensor * this.current.worldAxis; }
////
////	void					SetFrictionDirection( const idVec3 &dir );
////	bool					GetFrictionDirection( idVec3 &dir ) const;
////
////	void					SetContactMotorDirection( const idVec3 &dir );
////	bool					GetContactMotorDirection( idVec3 &dir ) const;
////	void					SetContactMotorVelocity( float vel ) { contactMotorVelocity = vel; }
////	float					GetContactMotorVelocity( ) const { return contactMotorVelocity; }
////	void					SetContactMotorForce( float force ) { contactMotorForce = force; }
////	float					GetContactMotorForce( ) const { return contactMotorForce; }
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
	
////							// simulation variables used during calculations
////	idMatX					inverseWorldSpatialInertia;	// inverse spatial inertia in world space
////	idMatX					I, invI;					// transformed inertia
////	idMatX					J;							// transformed constraint matrix
////	idVecX					s;							// temp solution
////	idVecX					totalForce;					// total force acting on body
////	idVecX					auxForce;					// force from auxiliary constraints
////	idVecX					acceleration;				// acceleration
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
	atRest: number /*int*/;						// >= 0 if articulated figure is at rest
	noMoveTime: number /*float*/;					// time the articulated figure is hardly moving
	activateTime: number /*float*/;				// time since last activation
	lastTimeStep: number /*float*/;				// last time step
	pushVelocity = new idVec6();				// velocity with which the af is pushed
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
////	idAFBody *				GetMasterBody( ) const { return masterBody; }
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
////	void					SetTimeScale( const float ts ) { timeScale = ts; }
////							// set time scale ramp
////	void					SetTimeScaleRamp( const float start, const float end );
////							// set the joint friction scale
////	void					SetJointFrictionScale( const float scale ) { jointFrictionScale = scale; }
////							// set joint friction dent
////	void					SetJointFrictionDent( const float dent, const float start, const float end );
////							// get the current joint friction scale
////	float					GetJointFrictionScale( ) const;
////							// set the contact friction scale
////	void					SetContactFrictionScale( const float scale ) { contactFrictionScale = scale; }
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
////	void					LockWorldConstraints( const bool lock ) { worldConstraintsLocked = lock; }
////							// set force pushable
////	void					SetForcePushable( const bool enable ) { forcePushable = enable; }
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
////	idLCP *					lcp;							// linear complementarity problem solver
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
	////	float invTimeStep;
	////	idAFBody *body;
	////	idAFConstraint *c;
	////
	////	invTimeStep = 1.0 / timeStep;
	////
	////	// setup the constraint equations for the current position and orientation of the bodies
	////	for ( i = 0; i < primaryConstraints.Num(); i++ ) {
	////		c = primaryConstraints[i];
	////		c.Evaluate( invTimeStep );
	////		c.J = c.J2;
	////	}
	////	for ( i = 0; i < auxiliaryConstraints.Num(); i++ ) {
	////		auxiliaryConstraints[i].Evaluate( invTimeStep );
	////	}
	////
	////	// add contact constraints to the list with frame constraints
	////	for ( i = 0; i < contactConstraints.Num(); i++ ) {
	////		AddFrameConstraint( contactConstraints[i] );
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
	////	idAFBody *body;
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
	////	for ( i = 0; i < frameConstraints.Num(); i++ ) {
	////		auxiliaryConstraints.Append( frameConstraints[i] );
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
	////	auxiliaryConstraints.SetNum( auxiliaryConstraints.Num() - frameConstraints.Num(), false );
	////	frameConstraints.SetNum( 0, false );
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
	////	if ( jointFrictionDentStart < MS2SEC( endTimeMSec ) && jointFrictionDentEnd > MS2SEC( endTimeMSec ) ) {
	////		float halfTime = ( jointFrictionDentEnd - jointFrictionDentStart ) * 0.f;
	////		if ( jointFrictionDentStart + halfTime > MS2SEC( endTimeMSec ) ) {
	////			jointFrictionDentScale = 1.0 - ( 1.0 - jointFrictionDent ) * ( MS2SEC( endTimeMSec ) - jointFrictionDentStart ) / halfTime;
	////		} else {
	////			jointFrictionDentScale = jointFrictionDent + ( 1.0 - jointFrictionDent ) * ( MS2SEC( endTimeMSec ) - jointFrictionDentStart - halfTime ) / halfTime;
	////		}
	////	} else {
	////		jointFrictionDentScale = 0.0;
	////	}
	////
	////	if ( contactFrictionDentStart < MS2SEC( endTimeMSec ) && contactFrictionDentEnd > MS2SEC( endTimeMSec ) ) {
	////		float halfTime = ( contactFrictionDentEnd - contactFrictionDentStart ) * 0.f;
	////		if ( contactFrictionDentStart + halfTime > MS2SEC( endTimeMSec ) ) {
	////			contactFrictionDentScale = 1.0 - ( 1.0 - contactFrictionDent ) * ( MS2SEC( endTimeMSec ) - contactFrictionDentStart ) / halfTime;
	////		} else {
	////			contactFrictionDentScale = contactFrictionDent + ( 1.0 - contactFrictionDent ) * ( MS2SEC( endTimeMSec ) - contactFrictionDentStart - halfTime ) / halfTime;
	////		}
	////	} else {
	////		contactFrictionDentScale = 0.0;
	////	}
	////
	////	invTimeStep = 1.0 / timeStep;
	////
	////	for ( i = 0; i < primaryConstraints.Num(); i++ ) {
	////		primaryConstraints[i].ApplyFriction( invTimeStep );
	////	}
	////	for ( i = 0; i < auxiliaryConstraints.Num(); i++ ) {
	////		auxiliaryConstraints[i].ApplyFriction( invTimeStep );
	////	}
	////	for ( i = 0; i < frameConstraints.Num(); i++ ) {
	////		frameConstraints[i].ApplyFriction( invTimeStep );
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
	////	for ( i = 0; i < trees.Num(); i++ ) {
	////		trees[i].Factor();
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
	////	for ( i = 0; i < trees.Num(); i++ ) {
	////		trees[i].CalculateForces( timeStep );
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
	////	idAFBody *body;
	////	idAFConstraint *constraint;
	////	idVecX tmp;
	////	idMatX jmk;
	////	idVecX rhs, w, lm, lo, hi;
	////
	////	// get the number of one dimensional auxiliary constraints
	////	for ( numAuxConstraints = 0, i = 0; i < auxiliaryConstraints.Num(); i++ ) {
	////		numAuxConstraints += auxiliaryConstraints[i].J1.GetNumRows();
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
	////		for ( k = 0, i = 0; i < auxiliaryConstraints.Num(); i++ ) {
	////			constraint = auxiliaryConstraints[i];
	////			for ( j = 0; j < constraint.J1.GetNumRows(); j++, k++ ) {
	////				if ( k > constraint.body1.maxAuxiliaryIndex ) {
	////					constraint.body1.maxAuxiliaryIndex = k;
	////				}
	////				if ( constraint.body2 && k > constraint.body2.maxAuxiliaryIndex ) {
	////					constraint.body2.maxAuxiliaryIndex = k;
	////				}
	////			}
	////		}
	////		for ( i = 0; i < trees.Num(); i++ ) {
	////			trees[i].SetMaxSubTreeAuxiliaryIndex();
	////		}
	////	}
	////
	////	// calculate forces of primary constraints in response to the auxiliary constraint forces
	////	for ( k = 0, i = 0; i < auxiliaryConstraints.Num(); i++ ) {
	////		constraint = auxiliaryConstraints[i];
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
	////	for ( k = 0, i = 0; i < auxiliaryConstraints.Num(); i++ ) {
	////		constraint = auxiliaryConstraints[i];
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
	////				constraint.body2.InverseWorldSpatialInertiaMultiply( tmp, constraint.J2[j] );
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
	////	for ( k = 0, i = 0; i < auxiliaryConstraints.Num(); i++ ) {
	////		auxiliaryConstraints[i].firstIndex = k;
	////		k += auxiliaryConstraints[i].J1.GetNumRows();
	////	}
	////
	////	// initialize right hand side and low and high bounds for auxiliary constraints
	////	for ( k = 0, i = 0; i < auxiliaryConstraints.Num(); i++ ) {
	////		constraint = auxiliaryConstraints[i];
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
	////				j2 = constraint.J2[j];
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
	////	if ( !lcp.Solve( jmk, lm, rhs, lo, hi, boxIndex ) ) {
	////		return;		// bad monkey!
	////	}
	////
	////#ifdef AF_TIMINGS
	////	timer_lcp.Stop();
	////#endif
	////
	////	// calculate auxiliary constraint forces
	////	for ( k = 0, i = 0; i < auxiliaryConstraints.Num(); i++ ) {
	////		constraint = auxiliaryConstraints[i];
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
	////				j2 = constraint.J2[j];
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
	////	idAFBody *body;
	////
	////	for ( i = 0; i < contactConstraints.Num(); i++ ) {
	////		body = contactConstraints[i].body1;
	////		const contactInfo_t &contact = contactConstraints[i].GetContact();
	////
	////		r = contact.point - body.GetCenterOfMass();
	////
	////		// calculate velocity at contact point
	////		velocity = body.GetLinearVelocity() + body.GetAngularVelocity().Cross( r );
	////
	////		// velocity along normal vector
	////		normalVelocity = ( velocity * contact.normal ) * contact.normal;
	////
	////		// if moving towards the surface at the contact point
	////		if ( normalVelocity * contact.normal < 0.0 ) {
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
	////	idAFBody *body;
	////	idVec3 normal;
	////
	////	for ( i = 0; i < contactConstraints.Num(); i++ ) {
	////		body = contactConstraints[i].body1;
	////		normal = contactConstraints[i].GetContact().normal;
	////		if ( normal * body.next.spatialVelocity.SubVec3(0) <= 0.0 ) {
	////			body.next.spatialVelocity.SubVec3(0) -= 1.0001f * (normal * body.next.spatialVelocity.SubVec3(0)) * normal;
	////		}
	////		body = contactConstraints[i].body2;
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
	////	idAFBody *body;
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
	////bool idPhysics_AF::CollisionImpulse( float timeStep, idAFBody *body, trace_t &collision ) {
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
	////	for ( i = 0; i < collisions.Num(); i++ ) {
	////		if ( CollisionImpulse( timeStep, collisions[i].body, collisions[i].trace ) ) {
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
	////idEntity *idPhysics_AF::SetupCollisionForBody( idAFBody *body ) const {
	////	var/*int*/i:number;
	////	idAFBody *b;
	////	idEntity *passEntity;
	////
	////	passEntity = NULL;
	////
	////	if ( !selfCollision || !body.fl.selfCollision || af_skipSelfCollision.GetBool() ) {
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
	////	idAFBody *body;
	////	idMat3 axis;
	////	idRotation rotation;
	////	trace_t collision;
	////	idEntity *passEntity;
	////
	////	// clear list with collisions
	////	collisions.SetNum( 0, false );
	////
	////	if ( !enableCollision ) {
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
	////				index = collisions.Num();
	////				collisions.SetNum( index + 1, false );
	////				collisions[index].trace = collision;
	////				collisions[index].body = body;
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
	////	idAFBody *body;
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
	////	if ( !enableCollision ) {
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
	////			for ( k = 0; k < contacts.Num(); k++ ) {
	////				if ( contacts[k].entityNum == contactInfo[j].entityNum ) {
	////					if ( ( contacts[k].id == i && contactInfo[j].id == contactBodies[k] ) ||
	////							( contactBodies[k] == i && contacts[k].id == contactInfo[j].id ) ) {
	////
	////						if ( ( contacts[k].point - contactInfo[j].point ).LengthSqr() < Square( 2.0 ) ) {
	////							break;
	////						}
	////						if ( idMath::Fabs( contacts[k].normal * contactInfo[j].normal ) > 0.9f ) {
	////							numBodyContacts++;
	////						}
	////					}
	////				}
	////			}
	////
	////			if ( k >= contacts.Num() && numBodyContacts < 3 ) {
	////				contacts.Append( contactInfo[j] );
	////				contactBodies.Append( i );
	////			}
	////		}
	////
	////#else
	////
	////		for ( j = 0; j < numContacts; j++ ) {
	////			contacts.Append( contactInfo[j] );
	////			contactBodies.Append( i );
	////		}
	////#endif
	////
	////	}
	////
	////	AddContactEntitiesForContacts();
	////
	////	return ( contacts.Num() != 0 );
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
	////	contactConstraints.AssureSizeAlloc( contacts.Num(), idListNewElement<idAFConstraint_Contact> );
	////	contactConstraints.SetNum( contacts.Num(), false );
	////
	////	// setup contact constraints
	////	for ( i = 0; i < contacts.Num(); i++ ) {
	////		// add contact constraint
	////		contactConstraints[i].physics = this;
	////		if ( contacts[i].entityNum == this.self.entityNumber ) {
	////			contactConstraints[i].Setup( bodies[contactBodies[i]], bodies[ contacts[i].id ], contacts[i] );
	////		}
	////		else {
	////			contactConstraints[i].Setup( bodies[contactBodies[i]], NULL, contacts[i] );
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
	////	for ( i = 0; i < contactConstraints.Num(); i++ ) {
	////		if ( contactConstraints[i].body2 != NULL ) {
	////			continue;
	////		}
	////		const contactInfo_t &contact = contactConstraints[i].GetContact();
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
	////	idAFBody *body;
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
	////	idAFBody *body;
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
	////	timeScaleRampStart = start;
	////	timeScaleRampEnd = end;
	////}
	////
	/////*
	////================
	////idPhysics_AF::SetJointFrictionDent
	////================
	////*/
	////void idPhysics_AF::SetJointFrictionDent( const float dent, const float start, const float end ) {
	////	jointFrictionDent = dent;
	////	jointFrictionDentStart = start;
	////	jointFrictionDentEnd = end;
	////}
	////
	/////*
	////================
	////idPhysics_AF::GetJointFrictionScale
	////================
	////*/
	////float idPhysics_AF::GetJointFrictionScale( ) const {
	////	if ( jointFrictionDentScale > 0.0 ) {
	////		return jointFrictionDentScale;
	////	} else if ( jointFrictionScale > 0.0 ) {
	////		return jointFrictionScale;
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
	////	if ( contactFrictionDentScale > 0.0 ) {
	////		return contactFrictionDentScale;
	////	} else if ( contactFrictionScale > 0.0 ) {
	////		return contactFrictionScale;
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
	////	idAFBody *body;
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
	////	if ( maxMoveTime > 0.0 && this.current.activateTime > maxMoveTime ) {
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
	////		if ( maxTranslationSqr < Square( noMoveTranslation ) && maxRotation < noMoveRotation ) {
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
	////		if ( body.current.spatialVelocity.SubVec3(0).LengthSqr() > Square( suspendVelocity[0] ) ) {
	////			return false;
	////		}
	////		if ( body.current.spatialVelocity.SubVec3(1).LengthSqr() > Square( suspendVelocity[1] ) ) {
	////			return false;
	////		}
	////		if ( body.acceleration.SubVec3(0).LengthSqr() > Square( suspendAcceleration[0] ) ) {
	////			return false;
	////		}
	////		if ( body.acceleration.SubVec3(1).LengthSqr() > Square( suspendAcceleration[1] ) ) {
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
	////	noImpact = false;
	////}
	////
	/////*
	////================
	////idPhysics_AF::DisableImpact
	////================
	////*/
	////void idPhysics_AF::DisableImpact( ) {
	////	noImpact = true;
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
	////	if ( timeScaleRampStart < MS2SEC( endTimeMSec ) && timeScaleRampEnd > MS2SEC( endTimeMSec ) ) {
	////		timeStep = MS2SEC( timeStepMSec ) * ( MS2SEC( endTimeMSec ) - timeScaleRampStart ) / ( timeScaleRampEnd - timeScaleRampStart );
	////	} else if ( af_timeScale.GetFloat() != 1.0 ) {
	////		timeStep = MS2SEC( timeStepMSec ) * af_timeScale.GetFloat();
	////	} else {
	////		timeStep = MS2SEC( timeStepMSec ) * timeScale;
	////	}
	////	this.current.lastTimeStep = timeStep;
	////
	////
	////	// if the articulated figure changed
	////	if ( changedAF || ( linearTime != af_useLinearTime.GetBool() ) ) {
	////		BuildTrees();
	////		changedAF = false;
	////		linearTime = af_useLinearTime.GetBool();
	////	}
	////
	////	// get the new master position
	////	if ( masterBody ) {
	////		idVec3 masterOrigin;
	////		idMat3 masterAxis;
	////		this.self.GetMasterPosition( masterOrigin, masterAxis );
	////		if ( this.current.atRest >= 0 && ( masterBody.current.worldOrigin != masterOrigin || masterBody.current.worldAxis != masterAxis ) ) {
	////			Activate();
	////		}
	////		masterBody.current.worldOrigin = masterOrigin;
	////		masterBody.current.worldAxis = masterAxis;
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
	////	for ( i = 0; i < primaryConstraints.Num(); i++ ) {
	////		numPrimary += primaryConstraints[i].J1.GetNumRows();
	////	}
	////	for ( i = 0; i < auxiliaryConstraints.Num(); i++ ) {
	////		numAuxiliary += auxiliaryConstraints[i].J1.GetNumRows();
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
	////	if ( selfCollision && !af_skipSelfCollision.GetBool() ) {
	////		DisableClip();
	////	}
	////
	////	// apply collision impulses
	////	if ( ApplyCollisions( timeStep ) ) {
	////		this.current.atRest = gameLocal.time;
	////		comeToRest = true;
	////	}
	////
	////	// test if the simulation can be suspended because the whole figure is at rest
	////	if ( comeToRest && TestIfAtRest( timeStep ) ) {
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
	////		if ( endTimeMSec > lastTimerReset ) {
	////			gameLocal.Printf( "af %d: t %1.4f pc %2d, %1.4f ac %2d %1.4f lcp %1.4f cd %1.4f\n",
	////							numArticulatedFigures,
	////							timer_total.Milliseconds(),
	////							numPrimary, timer_pc.Milliseconds(),
	////							numAuxiliary, timer_ac.Milliseconds() - timer_lcp.Milliseconds(),
	////							timer_lcp.Milliseconds(), timer_collision.Milliseconds() );
	////		}
	////	}
	////
	////	if ( endTimeMSec > lastTimerReset ) {
	////		lastTimerReset = endTimeMSec;
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
	////
	/////*
	////================
	////idPhysics_AF::UpdateTime
	////================
	////*/
	////void idPhysics_AF::UpdateTime( int endTimeMSec ) {
	////}
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
	////	idAFConstraint *constraint;
	////	idVec3 center;
	////	idMat3 axis;
	////
	////	if ( af_highlightConstraint.GetString()[0] ) {
	////		constraint = GetConstraint( af_highlightConstraint.GetString() );
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
	////		for ( i = 0; i < primaryConstraints.Num(); i++ ) {
	////			constraint = primaryConstraints[i];
	////			constraint.DebugDraw();
	////		}
	////		if ( !af_showPrimaryOnly.GetBool() ) {
	////			for ( i = 0; i < auxiliaryConstraints.Num(); i++ ) {
	////				constraint = auxiliaryConstraints[i];
	////				constraint.DebugDraw();
	////			}
	////		}
	////	}
	////
	////	if ( af_showConstraintNames.GetBool() ) {
	////		for ( i = 0; i < primaryConstraints.Num(); i++ ) {
	////			constraint = primaryConstraints[i];
	////			constraint.GetCenter( center );
	////			gameRenderWorld.DrawText( constraint.GetName().c_str(), center, 0.08f, colorCyan, gameLocal.GetLocalPlayer().viewAngles.ToMat3(), 1 );
	////		}
	////		if ( !af_showPrimaryOnly.GetBool() ) {
	////			for ( i = 0; i < auxiliaryConstraints.Num(); i++ ) {
	////				constraint = auxiliaryConstraints[i];
	////				constraint.GetCenter( center );
	////				gameRenderWorld.DrawText( constraint.GetName().c_str(), center, 0.08f, colorCyan, gameLocal.GetLocalPlayer().viewAngles.ToMat3(), 1 );
	////			}
	////		}
	////	}
	////
	////	if ( af_showTrees.GetBool() || ( af_showActive.GetBool() && this.current.atRest < 0 ) ) {
	////		for ( i = 0; i < trees.Num(); i++ ) {
	////			trees[i].DebugDraw( idStr::ColorForIndex( i+3 ) );
	////		}
	////	}
	////}
	////
	/////*
	////================
	////idPhysics_AF::idPhysics_AF
	////================
	////*/
	////idPhysics_AF::idPhysics_AF( ) {
	////	trees.Clear();
	////	this.bodies.Clear();
	////	constraints.Clear();
	////	primaryConstraints.Clear();
	////	auxiliaryConstraints.Clear();
	////	frameConstraints.Clear();
	////	contacts.Clear();
	////	collisions.Clear();
	////	changedAF = true;
	////	masterBody = NULL;
	////
	////	lcp = idLCP::AllocSymmetric();
	////
	////	memset( &current, 0, sizeof( this.current ) );
	////	this.current.atRest = -1;
	////	this.current.lastTimeStep = USERCMD_MSEC;
	////	saved = this.current;
	////
	////	this.linearFriction = 0.005f;
	////	angularFriction = 0.005f;
	////	contactFriction = 0.8f;
	////	bouncyness = 0.4f;
	////	this.totalMass = 0.0;
	////	forceTotalMass = -1.0;
	////
	////	suspendVelocity.Set( SUSPEND_LINEAR_VELOCITY, SUSPEND_ANGULAR_VELOCITY );
	////	suspendAcceleration.Set( SUSPEND_LINEAR_ACCELERATION, SUSPEND_LINEAR_ACCELERATION );
	////	noMoveTime = NO_MOVE_TIME;
	////	noMoveTranslation = NO_MOVE_TRANSLATION_TOLERANCE;
	////	noMoveRotation = NO_MOVE_ROTATION_TOLERANCE;
	////	this.minMoveTime = MIN_MOVE_TIME;
	////	maxMoveTime = MAX_MOVE_TIME;
	////	impulseThreshold = IMPULSE_THRESHOLD;
	////
	////	timeScale = 1.0;
	////	timeScaleRampStart = 0.0;
	////	timeScaleRampEnd = 0.0;
	////
	////	jointFrictionScale = 0.0;
	////	jointFrictionDent = 0.0;
	////	jointFrictionDentStart = 0.0;
	////	jointFrictionDentEnd = 0.0;
	////	jointFrictionDentScale = 0.0;
	////
	////	contactFrictionScale = 0.0;
	////	contactFrictionDent = 0.0;
	////	contactFrictionDentStart = 0.0;
	////	contactFrictionDentEnd = 0.0;
	////	contactFrictionDentScale = 0.0;
	////
	////	enableCollision = true;
	////	selfCollision = true;
	////	comeToRest = true;
	////	linearTime = true;
	////	noImpact = false;
	////	worldConstraintsLocked = false;
	////	forcePushable = false;
	////
	////#ifdef AF_TIMINGS
	////	lastTimerReset = 0;
	////#endif
	////}
	////
	/////*
	////================
	////idPhysics_AF::~idPhysics_AF
	////================
	////*/
	////idPhysics_AF::~idPhysics_AF( ) {
	////	var/*int*/i:number;
	////
	////	trees.DeleteContents( true );
	////
	////	for ( i = 0; i < this.bodies.Num(); i++ ) {
	////		delete this.bodies[i];
	////	}
	////
	////	for ( i = 0; i < this.constraints.Num(); i++ ) {
	////		delete this.constraints[i];
	////	}
	////
	////	contactConstraints.SetNum( contactConstraints.NumAllocated(), false );
	////	for ( i = 0; i < contactConstraints.NumAllocated(); i++ ) {
	////		delete contactConstraints[i];
	////	}
	////
	////	delete lcp;
	////
	////	if ( masterBody ) {
	////		delete masterBody;
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
	////	idPhysics_AF_SavePState( saveFile, saved );
	////
	////	saveFile.WriteInt( this.bodies.Num() );
	////	for ( i = 0; i < this.bodies.Num(); i++ ) {
	////		this.bodies[i].Save( saveFile );
	////	}
	////	if ( masterBody ) {
	////		saveFile.WriteBool( true );
	////		masterBody.Save( saveFile );
	////	} else {
	////		saveFile.WriteBool( false );
	////	}
	////
	////	saveFile.WriteInt( this.constraints.Num() );
	////	for ( i = 0; i < this.constraints.Num(); i++ ) {
	////		this.constraints[i].Save( saveFile );
	////	}
	////
	////	saveFile.WriteBool( changedAF );
	////
	////	saveFile.WriteFloat( this.linearFriction );
	////	saveFile.WriteFloat( angularFriction );
	////	saveFile.WriteFloat( contactFriction );
	////	saveFile.WriteFloat( bouncyness );
	////	saveFile.WriteFloat( this.totalMass );
	////	saveFile.WriteFloat( forceTotalMass );
	////
	////	saveFile.WriteVec2( suspendVelocity );
	////	saveFile.WriteVec2( suspendAcceleration );
	////	saveFile.WriteFloat( noMoveTime );
	////	saveFile.WriteFloat( noMoveTranslation );
	////	saveFile.WriteFloat( noMoveRotation );
	////	saveFile.WriteFloat( this.minMoveTime );
	////	saveFile.WriteFloat( maxMoveTime );
	////	saveFile.WriteFloat( impulseThreshold );
	////
	////	saveFile.WriteFloat( timeScale );
	////	saveFile.WriteFloat( timeScaleRampStart );
	////	saveFile.WriteFloat( timeScaleRampEnd );
	////
	////	saveFile.WriteFloat( jointFrictionScale );
	////	saveFile.WriteFloat( jointFrictionDent );
	////	saveFile.WriteFloat( jointFrictionDentStart );
	////	saveFile.WriteFloat( jointFrictionDentEnd );
	////	saveFile.WriteFloat( jointFrictionDentScale );
	////
	////	saveFile.WriteFloat( contactFrictionScale );
	////	saveFile.WriteFloat( contactFrictionDent );
	////	saveFile.WriteFloat( contactFrictionDentStart );
	////	saveFile.WriteFloat( contactFrictionDentEnd );
	////	saveFile.WriteFloat( contactFrictionDentScale );
	////
	////	saveFile.WriteBool( enableCollision );
	////	saveFile.WriteBool( selfCollision );
	////	saveFile.WriteBool( comeToRest );
	////	saveFile.WriteBool( linearTime );
	////	saveFile.WriteBool( noImpact );
	////	saveFile.WriteBool( worldConstraintsLocked );
	////	saveFile.WriteBool( forcePushable );
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
	////	idPhysics_AF_RestorePState( saveFile, saved );
	////
	////	saveFile.ReadInt( num );
	////	assert( num == this.bodies.Num() );
	////	for ( i = 0; i < this.bodies.Num(); i++ ) {
	////		this.bodies[i].Restore( saveFile );
	////	}
	////	saveFile.ReadBool( hasMaster );
	////	if ( hasMaster ) {
	////		masterBody = new idAFBody();
	////		masterBody.Restore( saveFile );
	////	}
	////
	////	saveFile.ReadInt( num );
	////	assert( num == this.constraints.Num() );
	////	for ( i = 0; i < this.constraints.Num(); i++ ) {
	////		this.constraints[i].Restore( saveFile );
	////	}
	////
	////	saveFile.ReadBool( changedAF );
	////
	////	saveFile.ReadFloat( this.linearFriction );
	////	saveFile.ReadFloat( angularFriction );
	////	saveFile.ReadFloat( contactFriction );
	////	saveFile.ReadFloat( bouncyness );
	////	saveFile.ReadFloat( this.totalMass );
	////	saveFile.ReadFloat( forceTotalMass );
	////
	////	saveFile.ReadVec2( suspendVelocity );
	////	saveFile.ReadVec2( suspendAcceleration );
	////	saveFile.ReadFloat( noMoveTime );
	////	saveFile.ReadFloat( noMoveTranslation );
	////	saveFile.ReadFloat( noMoveRotation );
	////	saveFile.ReadFloat( this.minMoveTime );
	////	saveFile.ReadFloat( maxMoveTime );
	////	saveFile.ReadFloat( impulseThreshold );
	////
	////	saveFile.ReadFloat( timeScale );
	////	saveFile.ReadFloat( timeScaleRampStart );
	////	saveFile.ReadFloat( timeScaleRampEnd );
	////
	////	saveFile.ReadFloat( jointFrictionScale );
	////	saveFile.ReadFloat( jointFrictionDent );
	////	saveFile.ReadFloat( jointFrictionDentStart );
	////	saveFile.ReadFloat( jointFrictionDentEnd );
	////	saveFile.ReadFloat( jointFrictionDentScale );
	////
	////	saveFile.ReadFloat( contactFrictionScale );
	////	saveFile.ReadFloat( contactFrictionDent );
	////	saveFile.ReadFloat( contactFrictionDentStart );
	////	saveFile.ReadFloat( contactFrictionDentEnd );
	////	saveFile.ReadFloat( contactFrictionDentScale );
	////
	////	saveFile.ReadBool( enableCollision );
	////	saveFile.ReadBool( selfCollision );
	////	saveFile.ReadBool( comeToRest );
	////	saveFile.ReadBool( linearTime );
	////	saveFile.ReadBool( noImpact );
	////	saveFile.ReadBool( worldConstraintsLocked );
	////	saveFile.ReadBool( forcePushable );
	////
	////	changedAF = true;
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
	////	for ( b1 = body1; b1.parent; b1 = b1.parent ) {
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
	////	primaryConstraints.Clear();
	////	auxiliaryConstraints.Clear();
	////	trees.DeleteContents( true );
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
	////	if ( forceTotalMass > 0.0 ) {
	////		scale = forceTotalMass / this.totalMass;
	////		for ( i = 0; i < this.bodies.Num(); i++ ) {
	////			b = this.bodies[i];
	////			b.mass *= scale;
	////			b.invMass = 1.0 / b.mass;
	////			b.inertiaTensor *= scale;
	////			b.inverseInertiaTensor = b.inertiaTensor.Inverse();
	////		}
	////		this.totalMass = forceTotalMass;
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
	////				primaryConstraints.Append( c );
	////			} else {
	////				c.fl.isPrimary = false;
	////				auxiliaryConstraints.Append( c );
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
	////				trees.Append( tree );
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
	////		if ( trees.Num() > 1 ) {
	////			gameLocal.Warning( "Articulated figure has multiple seperate tree structures for entity '%s' type '%s'.",
	////								this.self.name.c_str(), this.self.GetType().classname );
	////		}
	////
	////		// sort bodies in each tree to make sure parents come first
	////		for ( i = 0; i < trees.Num(); i++ ) {
	////			trees[i].SortBodies();
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
	////			trees.Append( tree );
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
	////			auxiliaryConstraints.Append( c );
	////		}
	////	}
	////}
	////
	/////*
	////================
	////idPhysics_AF::AddBody
	////
	////  bodies get an id in the order they are added starting at zero
	////  as such the first body added will get id zero
	////================
	////*/
	////int idPhysics_AF::AddBody( idAFBody *body ) {
	////	/*int*/ id:number = 0;
	////
	////	if ( !body.clipModel ) {
	////		gameLocal.Error( "idPhysics_AF::AddBody: body '%s' has no clip model.", body.name.c_str() );
	////	}
	////
	////	if ( this.bodies.Find( body ) ) {
	////		gameLocal.Error( "idPhysics_AF::AddBody: body '%s' added twice.", body.name.c_str() );
	////	}
	////
	////	if ( GetBody( body.name ) ) {
	////		gameLocal.Error( "idPhysics_AF::AddBody: a body with the name '%s' already exists.", body.name.c_str() );
	////	}
	////
	////	id = this.bodies.Num();
	////	body.clipModel.SetId( id );
	////	if ( body.linearFriction < 0.0 ) {
	////		body.linearFriction = this.linearFriction;
	////		body.angularFriction = angularFriction;
	////		body.contactFriction = contactFriction;
	////	}
	////	if ( body.bouncyness < 0.0 ) {
	////		body.bouncyness = bouncyness;
	////	}
	////	if ( !body.fl.clipMaskSet ) {
	////		body.clipMask = this.clipMask;
	////	}
	////
	////	this.bodies.Append( body );
	////
	////	changedAF = true;
	////
	////	return id;
	////}
	////
	/////*
	////================
	////idPhysics_AF::AddConstraint
	////================
	////*/
	////void idPhysics_AF::AddConstraint( idAFConstraint *constraint ) {
	////
	////	if ( this.constraints.Find( constraint ) ) {
	////		gameLocal.Error( "idPhysics_AF::AddConstraint: constraint '%s' added twice.", constraint.name.c_str() );
	////	}
	////	if ( GetConstraint( constraint.name ) ) {
	////		gameLocal.Error( "idPhysics_AF::AddConstraint: a constraint with the name '%s' already exists.", constraint.name.c_str() );
	////	}
	////	if ( !constraint.body1 ) {
	////		gameLocal.Error( "idPhysics_AF::AddConstraint: body1 == NULL on constraint '%s'.", constraint.name.c_str() );
	////	}
	////	if ( !this.bodies.Find( constraint.body1 ) ) {
	////		gameLocal.Error( "idPhysics_AF::AddConstraint: body1 of constraint '%s' is not part of the articulated figure.", constraint.name.c_str() );
	////	}
	////	if ( constraint.body2 && !this.bodies.Find( constraint.body2 ) ) {
	////		gameLocal.Error( "idPhysics_AF::AddConstraint: body2 of constraint '%s' is not part of the articulated figure.", constraint.name.c_str() );
	////	}
	////	if ( constraint.body1 == constraint.body2 ) {
	////		gameLocal.Error( "idPhysics_AF::AddConstraint: body1 and body2 of constraint '%s' are the same.", constraint.name.c_str() );
	////	}
	////
	////	this.constraints.Append( constraint );
	////	constraint.physics = this;
	////
	////	changedAF = true;
	////}
	////
	/////*
	////================
	////idPhysics_AF::AddFrameConstraint
	////================
	////*/
	////void idPhysics_AF::AddFrameConstraint( idAFConstraint *constraint ) {
	////	frameConstraints.Append( constraint );
	////	constraint.physics = this;
	////}
	////
	/////*
	////================
	////idPhysics_AF::ForceBodyId
	////================
	////*/
	////void idPhysics_AF::ForceBodyId( idAFBody *body, int newId ) {
	////	/*int*/ id:number;
	////
	////	id = this.bodies.FindIndex( body );
	////	if ( id == -1 ) {
	////		gameLocal.Error( "ForceBodyId: body '%s' is not part of the articulated figure.\n", body.name.c_str() );
	////	}
	////	if ( id != newId ) {
	////		idAFBody *b = this.bodies[newId];
	////		this.bodies[newId] = this.bodies[id];
	////		this.bodies[id] = b;
	////		changedAF = true;
	////	}
	////}
	////
	/////*
	////================
	////idPhysics_AF::GetBodyId
	////================
	////*/
	////int idPhysics_AF::GetBodyId( idAFBody *body ) const {
	////	/*int*/ id:number;
	////
	////	id = this.bodies.FindIndex( body );
	////	if ( id == -1 && body ) {
	////		gameLocal.Error( "GetBodyId: body '%s' is not part of the articulated figure.\n", body.name.c_str() );
	////	}
	////	return id;
	////}
	////
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
	////	/*int*/ id:number;
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
	////	changedAF = true;
	////}
	////
	/////*
	////================
	////idPhysics_AF::DeleteConstraint
	////================
	////*/
	////void idPhysics_AF::DeleteConstraint( const char *constraintName ) {
	////	var/*int*/i:number;
	////
	////	// find the constraint with the given name
	////	for ( i = 0; i < this.constraints.Num(); i++ ) {
	////		if ( !this.constraints[i].name.Icmp( constraintName ) ) {
	////			break;
	////		}
	////	}
	////
	////	if ( i >= this.constraints.Num() ) {
	////		gameLocal.Warning( "DeleteConstraint: no constriant found in the articulated figure with the name '%s' for entity '%s' type '%s'.",
	////							constraintName, this.self.name.c_str(), this.self.GetType().classname );
	////		return;
	////	}
	////
	////	DeleteConstraint( i );
	////}
	////
	/////*
	////================
	////idPhysics_AF::DeleteConstraint
	////================
	////*/
	////void idPhysics_AF::DeleteConstraint( /*int*/ id:number ) {
	////
	////	if ( id < 0 || id >= this.constraints.Num() ) {
	////		gameLocal.Error( "DeleteConstraint: no constraint with id %d.", id );
	////		return;
	////	}
	////
	////	// remove the constraint
	////	delete this.constraints[id];
	////	this.constraints.RemoveIndex( id );
	////
	////	changedAF = true;
	////}
	////
	/////*
	////================
	////idPhysics_AF::GetBodyContactConstraints
	////================
	////*/
	////int idPhysics_AF::GetBodyContactConstraints( /*int*/ id:number, idAFConstraint_Contact *contacts[], int maxContacts ) const {
	////	int i, numContacts;
	////	idAFBody *body;
	////	idAFConstraint_Contact *contact;
	////
	////	if ( id < 0 || id >= this.bodies.Num() || maxContacts <= 0 ) {
	////		return 0;
	////	}
	////
	////	numContacts = 0;
	////	body = this.bodies[id];
	////	for ( i = 0; i < contactConstraints.Num(); i++ ) {
	////		contact = contactConstraints[i];
	////		if ( contact.body1 == body || contact.body2 == body ) {
	////			contacts[numContacts++] = contact;
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
	////	if ( noImpact || impulse.LengthSqr() < Square( impulseThreshold ) ) {
	////		return;
	////	}
	////	idMat3 invWorldInertiaTensor = this.bodies[id].current.worldAxis.Transpose() * this.bodies[id].inverseInertiaTensor * this.bodies[id].current.worldAxis;
	////	this.bodies[id].current.spatialVelocity.SubVec3(0) += this.bodies[id].invMass * impulse;
	////	this.bodies[id].current.spatialVelocity.SubVec3(1) += invWorldInertiaTensor * (point - this.bodies[id].current.worldOrigin).Cross( impulse );
	////	Activate();
	////}
	////
	/////*
	////================
	////idPhysics_AF::AddForce
	////================
	////*/
	////void idPhysics_AF::AddForce( /*int*/ id:number, const idVec3 &point, const idVec3 &force ) {
	////	if ( noImpact ) {
	////		return;
	////	}
	////	if ( id < 0 || id >= this.bodies.Num() ) {
	////		return;
	////	}
	////	this.bodies[id].current.externalForce.SubVec3( 0 ) += force;
	////	this.bodies[id].current.externalForce.SubVec3( 1 ) += (point - this.bodies[id].current.worldOrigin).Cross( force );
	////	Activate();
	////}
	////
	/////*
	////================
	////idPhysics_AF::IsAtRest
	////================
	////*/
	////bool idPhysics_AF::IsAtRest( ) const {
	////	return this.current.atRest >= 0;
	////}
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
	////	return ( !noImpact && ( masterBody == NULL || forcePushable ) );
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
	////	saved = this.current;
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
	////	this.current = saved;
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
	void idPhysics_AF::SetOrigin( const idVec3 &newOrigin, /*int*/ id:number ) {
		if ( masterBody ) {
			Translate( masterBody.current.worldOrigin + masterBody.current.worldAxis * newOrigin - this.bodies[0].current.worldOrigin );
		} else {
			Translate( newOrigin - this.bodies[0].current.worldOrigin );
		}
	}
	
	/////*
	////================
	////idPhysics_AF::SetAxis
	////================
	////*/
	////void idPhysics_AF::SetAxis( const idMat3 &newAxis, /*int*/ id:number ) {
	////	idMat3 axis;
	////	idRotation rotation;
	////
	////	if ( masterBody ) {
	////		axis = this.bodies[0].current.worldAxis.Transpose() * ( newAxis * masterBody.current.worldAxis );
	////	} else {
	////		axis = this.bodies[0].current.worldAxis.Transpose() * newAxis;
	////	}
	////	rotation = axis.ToRotation();
	////	rotation.SetOrigin( this.bodies[0].current.worldOrigin );
	////
	////	Rotate( rotation );
	////}
	////
	/////*
	////================
	////idPhysics_AF::Translate
	////================
	////*/
	////void idPhysics_AF::Translate( const idVec3 &translation, /*int*/ id:number ) {
	////	var/*int*/i:number;
	////	idAFBody *body;
	////
	////	if ( !worldConstraintsLocked ) {
	////		// translate this.constraints attached to the world
	////		for ( i = 0; i < this.constraints.Num(); i++ ) {
	////			this.constraints[i].Translate( translation );
	////		}
	////	}
	////
	////	// translate all the bodies
	////	for ( i = 0; i < this.bodies.Num(); i++ ) {
	////
	////		body = this.bodies[i];
	////		body.current.worldOrigin += translation;
	////	}
	////
	////	Activate();
	////
	////	UpdateClipModels();
	////}
	////
	/////*
	////================
	////idPhysics_AF::Rotate
	////================
	////*/
	////void idPhysics_AF::Rotate( const idRotation &rotation, /*int*/ id:number ) {
	////	var/*int*/i:number;
	////	idAFBody *body;
	////
	////	if ( !worldConstraintsLocked ) {
	////		// rotate this.constraints attached to the world
	////		for ( i = 0; i < this.constraints.Num(); i++ ) {
	////			this.constraints[i].Rotate( rotation );
	////		}
	////	}
	////
	////	// rotate all the bodies
	////	for ( i = 0; i < this.bodies.Num(); i++ ) {
	////		body = this.bodies[i];
	////
	////		body.current.worldOrigin *= rotation;
	////		body.current.worldAxis *= rotation.ToMat3();
	////	}
	////
	////	Activate();
	////
	////	UpdateClipModels();
	////}
	////
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
////	Activate();
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
////	Activate();
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
////	idAFBody *body;
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
////	idAFBody *body;
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
////	idAFBody *body;
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
////	idAFBody *body;
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
/////*
////================
////idPhysics_AF::SetMaster
////
////   the binding is orientated based on the constraints being used
////================
////*/
////void idPhysics_AF::SetMaster( idEntity *master, const bool orientated ) {
////	var/*int*/i:number;
////	idVec3 masterOrigin;
////	idMat3 masterAxis;
////	idRotation rotation;
////
////	if ( master ) {
////		this.self.GetMasterPosition( masterOrigin, masterAxis );
////		if ( !masterBody ) {
////			masterBody = new idAFBody();
////			// translate and rotate all the constraints with body2 == NULL from world space to master space
////			rotation = masterAxis.Transpose().ToRotation();
////			for ( i = 0; i < this.constraints.Num(); i++ ) {
////				if ( this.constraints[i].GetBody2() == NULL ) {
////					this.constraints[i].Translate( -masterOrigin );
////					this.constraints[i].Rotate( rotation );
////				}
////			}
////			Activate();
////		}
////		masterBody.current.worldOrigin = masterOrigin;
////		masterBody.current.worldAxis = masterAxis;
////	}
////	else {
////		if ( masterBody ) {
////			// translate and rotate all the constraints with body2 == NULL from master space to world space
////			rotation = masterBody.current.worldAxis.ToRotation();
////			for ( i = 0; i < this.constraints.Num(); i++ ) {
////				if ( this.constraints[i].GetBody2() == NULL ) {
////					this.constraints[i].Rotate( rotation );
////					this.constraints[i].Translate( masterBody.current.worldOrigin );
////				}
////			}
////			delete masterBody;
////			masterBody = NULL;
////			Activate();
////		}
////	}
////}
////
////
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
