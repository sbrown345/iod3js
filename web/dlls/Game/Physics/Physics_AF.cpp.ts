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
var ERROR_REDUCTION					= 0.5;
var ERROR_REDUCTION_MAX				= 256.0;
var LIMIT_ERROR_REDUCTION			= 0.3;
var LCP_EPSILON						= 1e-7;
var LIMIT_LCP_EPSILON				= 1e-4;
var CONTACT_LCP_EPSILON				= 1e-6;
var CENTER_OF_MASS_EPSILON			= 1e-4;
var NO_MOVE_TIME					= 1.0;
var NO_MOVE_TRANSLATION_TOLERANCE	= 10.0;
var NO_MOVE_ROTATION_TOLERANCE		= 10.0;
var MIN_MOVE_TIME					= -1.0;
var MAX_MOVE_TIME					= -1.0;
var IMPULSE_THRESHOLD				= 500.0;
var SUSPEND_LINEAR_VELOCITY			= 10.0;
var SUSPEND_ANGULAR_VELOCITY		= 15.0;
var SUSPEND_LINEAR_ACCELERATION		= 20.0;
var SUSPEND_ANGULAR_ACCELERATION	= 30.0;
var vec6_lcp_epsilon				= new idVec6( LCP_EPSILON, LCP_EPSILON, LCP_EPSILON,
													 LCP_EPSILON, LCP_EPSILON, LCP_EPSILON );
////
////#define AF_TIMINGS
////
////#ifdef AF_TIMINGS
var /*int*/ lastTimerReset = 0;
var /*int*/ numArticulatedFigures = 0;
////static idTimer timer_total, timer_pc, timer_ac, timer_collision, timer_lcp;
////#endif
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
////	invStep = 1.0 / timeStep;
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

