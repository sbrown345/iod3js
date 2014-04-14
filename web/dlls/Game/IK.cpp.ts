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
////  idIK
////
////===============================================================================
////*/
////

////
/////*
////===============================================================================
////
////  idIK_Walk
////
////===============================================================================
////*/
////
/////*
////===============================================================================
////
////  idIK_Reach
////
////===============================================================================
////*/
////
/////*
////================
////idIK_Reach::idIK_Reach
////================
////*/
////idIK_Reach::idIK_Reach() {
////	var/*int*/i:number;
////
////	initialized = false;
////	numArms = 0;
////	enabledArms = 0;
////	for ( i = 0; i < MAX_ARMS; i++ ) {
////		handJoints[i] = INVALID_JOINT;
////		elbowJoints[i] = INVALID_JOINT;
////		shoulderJoints[i] = INVALID_JOINT;
////		dirJoints[i] = INVALID_JOINT;
////		shoulderForward[i].Zero();
////		elbowForward[i].Zero();
////		upperArmLength[i] = 0.0f;
////		lowerArmLength[i] = 0.0f;
////		upperArmToShoulderJoint[i].Identity();
////		lowerArmToElbowJoint[i].Identity();
////	}
////}
////
/////*
////================
////idIK_Reach::~idIK_Reach
////================
////*/
////idIK_Reach::~idIK_Reach() {
////}
////
/////*
////================
////idIK_Reach::Save
////================
////*/
////void idIK_Reach::Save( idSaveGame *savefile ) const {
////	var/*int*/i:number;
////	idIK::Save( savefile );
////
////	savefile.WriteInt( numArms );
////	savefile.WriteInt( enabledArms );
////	for ( i = 0; i <  MAX_ARMS; i++ )
////		savefile.WriteInt( handJoints[i] );
////	for ( i = 0; i <  MAX_ARMS; i++ )
////		savefile.WriteInt( elbowJoints[i] );
////	for ( i = 0; i <  MAX_ARMS; i++ )
////		savefile.WriteInt( shoulderJoints[i] );
////	for ( i = 0; i <  MAX_ARMS; i++ )
////		savefile.WriteInt( dirJoints[i] );
////		
////	for ( i = 0; i <  MAX_ARMS; i++ )
////		savefile.WriteVec3( shoulderForward[i] );
////	for ( i = 0; i <  MAX_ARMS; i++ )
////		savefile.WriteVec3( elbowForward[i] );
////		
////	for ( i = 0; i <  MAX_ARMS; i++ )
////		savefile.WriteFloat( upperArmLength[i] );
////	for ( i = 0; i <  MAX_ARMS; i++ )
////		savefile.WriteFloat( lowerArmLength[i] );
////		
////	for ( i = 0; i <  MAX_ARMS; i++ )
////		savefile.WriteMat3( upperArmToShoulderJoint[i] );
////	for ( i = 0; i <  MAX_ARMS; i++ )
////		savefile.WriteMat3( lowerArmToElbowJoint[i] );
////}
////
/////*
////================
////idIK_Reach::Restore
////================
////*/
////void idIK_Reach::Restore( idRestoreGame *savefile ) {
////	var/*int*/i:number;
////	idIK::Restore( savefile );
////
////	savefile.ReadInt( numArms );
////	savefile.ReadInt( enabledArms );
////	for ( i = 0; i <  MAX_ARMS; i++ )
////		savefile.ReadInt( (int&)handJoints[i] );
////	for ( i = 0; i <  MAX_ARMS; i++ )
////		savefile.ReadInt( (int&)elbowJoints[i] );
////	for ( i = 0; i <  MAX_ARMS; i++ )
////		savefile.ReadInt( (int&)shoulderJoints[i] );
////	for ( i = 0; i <  MAX_ARMS; i++ )
////		savefile.ReadInt( (int&)dirJoints[i] );
////		
////	for ( i = 0; i <  MAX_ARMS; i++ )
////		savefile.ReadVec3( shoulderForward[i] );
////	for ( i = 0; i <  MAX_ARMS; i++ )
////		savefile.ReadVec3( elbowForward[i] );
////		
////	for ( i = 0; i <  MAX_ARMS; i++ )
////		savefile.ReadFloat( upperArmLength[i] );
////	for ( i = 0; i <  MAX_ARMS; i++ )
////		savefile.ReadFloat( lowerArmLength[i] );
////		
////	for ( i = 0; i <  MAX_ARMS; i++ )
////		savefile.ReadMat3( upperArmToShoulderJoint[i] );
////	for ( i = 0; i <  MAX_ARMS; i++ )
////		savefile.ReadMat3( lowerArmToElbowJoint[i] );
////}
////
/////*
////================
////idIK_Reach::Init
////================
////*/
////bool idIK_Reach::Init( idEntity *self, const char *anim, const idVec3 &modelOffset ) {
////	var/*int*/i:number;
////	const char *jointName;
////	idTraceModel trm;
////	idVec3 dir, handOrigin, elbowOrigin, shoulderOrigin, dirOrigin;
////	idMat3 axis, handAxis, elbowAxis, shoulderAxis;
////
////	if ( !self ) {
////		return false;
////	}
////
////	numArms = Min( self.spawnArgs.GetInt( "ik_numArms", "0" ), MAX_ARMS );
////	if ( numArms == 0 ) {
////		return true;
////	}
////
////	if ( !idIK::Init( self, anim, modelOffset ) ) {
////		return false;
////	}
////
////	int numJoints = animator.NumJoints();
////	idJointMat *joints = ( idJointMat * )_alloca16( numJoints * sizeof( joints[0] ) );
////
////	// create the animation frame used to setup the IK
////	gameEdit.ANIM_CreateAnimFrame( animator.ModelHandle(), animator.GetAnim( modifiedAnim ).MD5Anim( 0 ), numJoints, joints, 1, animator.ModelDef().GetVisualOffset() + modelOffset, animator.RemoveOrigin() );
////
////	enabledArms = 0;
////
////	// get all the joints
////	for ( i = 0; i < numArms; i++ ) {
////
////		jointName = self.spawnArgs.GetString( va( "ik_hand%d", i+1 ) );
////		handJoints[i] = animator.GetJointHandle( jointName );
////		if ( handJoints[i] == INVALID_JOINT ) {
////			gameLocal.Error( "idIK_Reach::Init: invalid hand joint '%s'", jointName );
////		}
////
////		jointName = self.spawnArgs.GetString( va( "ik_elbow%d", i+1 ) );
////		elbowJoints[i] = animator.GetJointHandle( jointName );
////		if ( elbowJoints[i] == INVALID_JOINT ) {
////			gameLocal.Error( "idIK_Reach::Init: invalid elbow joint '%s'\n", jointName );
////		}
////
////		jointName = self.spawnArgs.GetString( va( "ik_shoulder%d", i+1 ) );
////		shoulderJoints[i] = animator.GetJointHandle( jointName );
////		if ( shoulderJoints[i] == INVALID_JOINT ) {
////			gameLocal.Error( "idIK_Reach::Init: invalid shoulder joint '%s'\n", jointName );
////		}
////
////		jointName = self.spawnArgs.GetString( va( "ik_elbowDir%d", i+1 ) );
////		dirJoints[i] = animator.GetJointHandle( jointName );
////
////		enabledArms |= 1 << i;
////	}
////
////	// get the arm bone lengths and rotation matrices
////	for ( i = 0; i < numArms; i++ ) {
////
////		handAxis = joints[ handJoints[ i ] ].ToMat3();
////		handOrigin = joints[ handJoints[ i ] ].ToVec3();
////
////		elbowAxis = joints[ elbowJoints[ i ] ].ToMat3();
////		elbowOrigin = joints[ elbowJoints[ i ] ].ToVec3();
////
////		shoulderAxis = joints[ shoulderJoints[ i ] ].ToMat3();
////		shoulderOrigin = joints[ shoulderJoints[ i ] ].ToVec3();
////
////		// get the IK direction
////		if ( dirJoints[i] != INVALID_JOINT ) {
////			dirOrigin = joints[ dirJoints[ i ] ].ToVec3();
////			dir = dirOrigin - elbowOrigin;
////		} else {
////			dir.Set( -1.0f, 0.0f, 0.0f );
////		}
////
////		shoulderForward[i] = dir * shoulderAxis.Transpose();
////		elbowForward[i] = dir * elbowAxis.Transpose();
////
////		// conversion from upper arm bone axis to should joint axis
////		upperArmLength[i] = GetBoneAxis( shoulderOrigin, elbowOrigin, dir, axis );
////		upperArmToShoulderJoint[i] = shoulderAxis * axis.Transpose();
////
////		// conversion from lower arm bone axis to elbow joint axis
////		lowerArmLength[i] = GetBoneAxis( elbowOrigin, handOrigin, dir, axis );
////		lowerArmToElbowJoint[i] = elbowAxis * axis.Transpose();
////	}
////
////	initialized = true;
////
////	return true;
////}
////
/////*
////================
////idIK_Reach::Evaluate
////================
////*/
////void idIK_Reach::Evaluate( void ) {
////	var/*int*/i:number;
////	idVec3 modelOrigin, shoulderOrigin, elbowOrigin, handOrigin, shoulderDir, elbowDir;
////	idMat3 modelAxis, axis;
////	idMat3 shoulderAxis[MAX_ARMS], elbowAxis[MAX_ARMS];
////	trace_t trace;
////
////	modelOrigin = self.GetRenderEntity().origin;
////	modelAxis = self.GetRenderEntity().axis;
////
////	// solve IK
////	for ( i = 0; i < numArms; i++ ) {
////
////		// get the position of the shoulder in world space
////		animator.GetJointTransform( shoulderJoints[i], gameLocal.time, shoulderOrigin, axis );
////		shoulderOrigin = modelOrigin + shoulderOrigin * modelAxis;
////		shoulderDir = shoulderForward[i] * axis * modelAxis;
////
////		// get the position of the hand in world space
////		animator.GetJointTransform( handJoints[i], gameLocal.time, handOrigin, axis );
////		handOrigin = modelOrigin + handOrigin * modelAxis;
////
////		// get first collision going from shoulder to hand
////		gameLocal.clip.TracePoint( trace, shoulderOrigin, handOrigin, CONTENTS_SOLID, self );
////		handOrigin = trace.endpos;
////
////		// get the IK bend direction
////		animator.GetJointTransform( elbowJoints[i], gameLocal.time, elbowOrigin, axis );
////		elbowDir = elbowForward[i] * axis * modelAxis;
////
////		// solve IK and calculate elbow position
////		SolveTwoBones( shoulderOrigin, handOrigin, elbowDir, upperArmLength[i], lowerArmLength[i], elbowOrigin );
////
////		if ( ik_debug.GetBool() ) {
////			gameRenderWorld.DebugLine( colorCyan, shoulderOrigin, elbowOrigin );
////			gameRenderWorld.DebugLine( colorRed, elbowOrigin, handOrigin );
////			gameRenderWorld.DebugLine( colorYellow, elbowOrigin, elbowOrigin + elbowDir );
////			gameRenderWorld.DebugLine( colorGreen, elbowOrigin, elbowOrigin + shoulderDir );
////		}
////
////		// get the axis for the shoulder joint
////		GetBoneAxis( shoulderOrigin, elbowOrigin, shoulderDir, axis );
////		shoulderAxis[i] = upperArmToShoulderJoint[i] * ( axis * modelAxis.Transpose() );
////
////		// get the axis for the elbow joint
////		GetBoneAxis( elbowOrigin, handOrigin, elbowDir, axis );
////		elbowAxis[i] = lowerArmToElbowJoint[i] * ( axis * modelAxis.Transpose() );
////	}
////
////	for ( i = 0; i < numArms; i++ ) {
////		animator.SetJointAxis( shoulderJoints[i], JOINTMOD_WORLD_OVERRIDE, shoulderAxis[i] );
////		animator.SetJointAxis( elbowJoints[i], JOINTMOD_WORLD_OVERRIDE, elbowAxis[i] );
////	}
////
////	ik_activate = true;
////}
////
/////*
////================
////idIK_Reach::ClearJointMods
////================
////*/
////void idIK_Reach::ClearJointMods( void ) {
////	var/*int*/i:number;
////
////	if ( !self || !ik_activate ) {
////		return;
////	}
////
////	for ( i = 0; i < numArms; i++ ) {
////		animator.SetJointAxis( shoulderJoints[i], JOINTMOD_NONE, mat3_identity );
////		animator.SetJointAxis( elbowJoints[i], JOINTMOD_NONE, mat3_identity );
////		animator.SetJointAxis( handJoints[i], JOINTMOD_NONE, mat3_identity );
////	}
////
////	ik_activate = false;
////}
