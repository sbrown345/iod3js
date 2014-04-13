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
////#ifndef __GAME_IK_H__
////#define __GAME_IK_H__

/*
===============================================================================

  IK base class with a simple fast two bone solver.

===============================================================================
*/

var IK_ANIM		=		"ik_pose"

class idIK {
////public:
////							idIK( void );
////	virtual					~idIK( void );
////
////	void					Save( idSaveGame *savefile ) const;
////	void					Restore( idRestoreGame *savefile );
////
////	bool					IsInitialized( void ) const;
////
////	virtual bool			Init( idEntity *self, const char *anim, const idVec3 &modelOffset );
////	virtual void			Evaluate( void );
////	virtual void			ClearJointMods( void );
////
////	bool					SolveTwoBones( const idVec3 &startPos, const idVec3 &endPos, const idVec3 &dir, float len0, float len1, idVec3 &jointPos );
////	float					GetBoneAxis( const idVec3 &startPos, const idVec3 &endPos, const idVec3 &dir, idMat3 &axis );
////
////protected:
	initialized:boolean;
	ik_activate:boolean;
	self:idEntity;				// entity using the animated model
	animator:idAnimator;			// animator on entity
	modifiedAnim :number/*int*/;		// animation modified by the IK
	modelOffset = new idVec3;
};


/*
===============================================================================

  IK controller for a walking character with an arbitrary number of legs.	

===============================================================================
*/

class idIK_Walk extends idIK {
////public:
////
////							idIK_Walk( void );
////	virtual					~idIK_Walk( void );
////
////	void					Save( idSaveGame *savefile ) const;
////	void					Restore( idRestoreGame *savefile );
////
////	virtual bool			Init( idEntity *self, const char *anim, const idVec3 &modelOffset );
////	virtual void			Evaluate( void );
////	virtual void			ClearJointMods( void );
////
////	void					EnableAll( void );
////	void					DisableAll( void );
////	void					EnableLeg( int num );
////	void					DisableLeg( int num );
////
////private:
	static MAX_LEGS		= 8;
////
////	idClipModel *			footModel;
////
////	int						numLegs :number/*int*/;
////	int						enabledLegs :number/*int*/;
////	jointHandle_t			footJoints[MAX_LEGS];
////	jointHandle_t			ankleJoints[MAX_LEGS];
////	jointHandle_t			kneeJoints[MAX_LEGS];
////	jointHandle_t			hipJoints[MAX_LEGS];
////	jointHandle_t			dirJoints[MAX_LEGS];
////	jointHandle_t			waistJoint:jointHandle_t;
////
////	idVec3					hipForward[MAX_LEGS];
////	idVec3					kneeForward[MAX_LEGS];
////
////	float					upperLegLength[MAX_LEGS];
////	float					lowerLegLength[MAX_LEGS];
////
////	idMat3					upperLegToHipJoint[MAX_LEGS];
////	idMat3					lowerLegToKneeJoint[MAX_LEGS];
////
////	float					smoothing :number/*float*/;
////	float					waistSmoothing :number/*float*/;
////	float					footShift :number/*float*/;
////	float					waistShift :number/*float*/;
////	float					minWaistFloorDist :number/*float*/;
////	float					minWaistAnkleDist :number/*float*/;
////	float					footUpTrace :number/*float*/;
////	float					footDownTrace :number/*float*/;
////	bool					tiltWaist:boolean;
////	bool					usePivot:boolean;
////
////	// state
////	int						pivotFoot :number/*int*/;
////	float					pivotYaw :number/*float*/;
////	idVec3					pivotPos = new idVec3;
////	bool					oldHeightsValid:boolean;
////	float					oldWaistHeight :number/*float*/;
////	float					oldAnkleHeights = new Float32Array(MAX_LEGS);
////	idVec3					waistOffset = new idVec3;
};
////
////
/////*
////===============================================================================
////
////  IK controller for reaching a position with an arm or leg.
////
////===============================================================================
////*/
////
////class idIK_Reach extends idIK {
////public:
////
////							idIK_Reach( void );
////	virtual					~idIK_Reach( void );
////
////	void					Save( idSaveGame *savefile ) const;
////	void					Restore( idRestoreGame *savefile );
////
////	virtual bool			Init( idEntity *self, const char *anim, const idVec3 &modelOffset );
////	virtual void			Evaluate( void );
////	virtual void			ClearJointMods( void );
////
////private:
////
////	static const int		MAX_ARMS	= 2;
////
////	int						numArms;
////	int						enabledArms;
////	jointHandle_t			handJoints[MAX_ARMS];
////	jointHandle_t			elbowJoints[MAX_ARMS];
////	jointHandle_t			shoulderJoints[MAX_ARMS];
////	jointHandle_t			dirJoints[MAX_ARMS];
////
////	idVec3					shoulderForward[MAX_ARMS];
////	idVec3					elbowForward[MAX_ARMS];
////
////	float					upperArmLength[MAX_ARMS];
////	float					lowerArmLength[MAX_ARMS];
////
////	idMat3					upperArmToShoulderJoint[MAX_ARMS];
////	idMat3					lowerArmToElbowJoint[MAX_ARMS];
////};
////
////#endif /* !__GAME_IK_H__ */
