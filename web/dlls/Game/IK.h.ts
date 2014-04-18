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
////							idIK( );
////	virtual					~idIK( );
////
////	void					Save( idSaveGame *savefile ) const;
////	void					Restore( idRestoreGame *savefile );
////
////	bool					IsInitialized( ) const;
////
////	virtual bool			Init( idEntity *self, const char *anim, const idVec3 &modelOffset );
////	virtual void			Evaluate( );
////	virtual void			ClearJointMods( );
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


	/*
	================
	idIK::idIK
	================
	*/
	constructor ( ) {
		this.ik_activate = false;
		this.initialized = false;
		this.self = null;
		this.animator = null;
		this.modifiedAnim = 0;
		this.modelOffset.Zero ( );
	}

	/////*
	////================
	////idIK::~idIK
	////================
	////*/
	////idIK::~idIK( ) {
	////}
	////
	/////*
	////================
	////idIK::Save
	////================
	////*/
	////void idIK::Save( idSaveGame *savefile ) const {
	////	savefile.WriteBool( initialized );
	////	savefile.WriteBool( ik_activate );
	////	savefile.WriteObject( self );
	////	savefile.WriteString( this.animator != NULL && this.animator.GetAnim( this.modifiedAnim ) ? this.animator.GetAnim( this.modifiedAnim ).Name() : "" );
	////	savefile.WriteVec3( modelOffset );
	////}
	////
	/////*
	////================
	////idIK::Restore
	////================
	////*/
	////void idIK::Restore( idRestoreGame *savefile ) {
	////	idStr anim;
	////
	////	savefile.ReadBool( initialized );
	////	savefile.ReadBool( ik_activate );
	////	savefile.ReadObject( reinterpret_cast<idClass *&>( self ) );
	////	savefile.ReadString( anim );
	////	savefile.ReadVec3( modelOffset );
	////
	////	if ( self ) {
	////		this.animator = self.GetAnimator();
	////		if ( this.animator == NULL || this.animator.ModelDef() == NULL ) {
	////			gameLocal.Warning( "idIK::Restore: IK for entity '%s' at (%s) has no model set.",
	////								self.name.c_str(), self.GetPhysics().GetOrigin().ToString(0) );
	////		}
	////		this.modifiedAnim = this.animator.GetAnim( anim );
	////		if ( this.modifiedAnim == 0 ) {
	////			gameLocal.Warning( "idIK::Restore: IK for entity '%s' at (%s) has no modified animation.",
	////									self.name.c_str(), self.GetPhysics().GetOrigin().ToString(0) );
	////		}
	////	} else {
	////		this.animator = NULL;
	////		this.modifiedAnim = 0;
	////	}
	////}
	////
	/////*
	////================
	////idIK::IsInitialized
	////================
	////*/
	////bool idIK::IsInitialized( ) const {
	////	return initialized && ik_enable.GetBool();
	////}
	
	/*
	================
	idIK::Init
	================
	*/
	Init(self: idEntity, anim: string, modelOffset: idVec3 ):boolean {
		var model: idRenderModel;
	
		if ( self == null ) {
			return false;
		}
	
		this.self = self;
	
		this.animator = self.GetAnimator();
		if (this.animator == null || this.animator.ModelDef() == null ) {
			gameLocal.Warning( "idIK::Init: IK for entity '%s' at (%s) has no model set.",
								self.name.c_str(), self.GetPhysics().GetOrigin().ToString(0) );
			return false;
		}
		if ( this.animator.ModelDef().ModelHandle() == null ) {
			gameLocal.Warning( "idIK::Init: IK for entity '%s' at (%s) uses default model.",
								self.name.c_str(), self.GetPhysics().GetOrigin().ToString(0) );
			return false;
		}
		model = this.animator.ModelHandle();
		if ( model == null ) {
			gameLocal.Warning( "idIK::Init: IK for entity '%s' at (%s) has no model set.",
								self.name.c_str(), self.GetPhysics().GetOrigin().ToString(0) );
			return false;
		}
		this.modifiedAnim = this.animator.GetAnim_name( anim );
		if ( this.modifiedAnim == 0 ) {
			gameLocal.Warning( "idIK::Init: IK for entity '%s' at (%s) has no modified animation.",
									self.name.c_str(), self.GetPhysics().GetOrigin().ToString(0) );
			return false;
		}
		
		this.modelOffset = modelOffset;
	
		return true;
	}
	
	/*
	////================
	////idIK::Evaluate
	////================
	////*/
	////void idIK::Evaluate( ) {
	////}
	////
	/////*
	////================
	////idIK::ClearJointMods
	////================
	////*/
	////void idIK::ClearJointMods( ) {
	////	ik_activate = false;
	////}
	////
	/////*
	////================
	////idIK::SolveTwoBones
	////================
	////*/
	////bool idIK::SolveTwoBones( const idVec3 &startPos, const idVec3 &endPos, const idVec3 &dir, float len0, float len1, idVec3 &jointPos ) {
	////	float length, lengthSqr, lengthInv, x, y;
	////	idVec3 vec0, vec1;
	////
	////	vec0 = endPos - startPos;
	////	lengthSqr = vec0.LengthSqr();
	////	lengthInv = idMath::InvSqrt( lengthSqr );
	////	length = lengthInv * lengthSqr;
	////
	////	// if the start and end position are too far out or too close to each other
	////	if ( length > len0 + len1 || length < idMath::Fabs( len0 - len1 ) ) {
	////		jointPos = startPos + 0.5f * vec0;
	////		return false;
	////	}
	////
	////	vec0 *= lengthInv;
	////	vec1 = dir - vec0 * dir * vec0;
	////	vec1.Normalize();
	////
	////	x = ( length * length + len0 * len0 - len1 * len1 ) * ( 0.5f * lengthInv );
	////	y = idMath::Sqrt( len0 * len0 - x * x );
	////
	////	jointPos = startPos + x * vec0 + y * vec1;
	////
	////	return true;
	////}
	////
	/*
	================
	idIK::GetBoneAxis
	================
	*/
	GetBoneAxis(startPos: idVec3, endPos: idVec3, dir: idVec3, axis: idMat3 ) :number/*float*/{
		var/*float */length:number;
		axis[0].equals( endPos.opSubtraction( startPos ) );
		length = axis[0].Normalize();
		debugger;//check line below:
		axis[1].equals(dir.opSubtraction(axis[0].timesFloat(dir.timesVec(axis[0])))); //axis[1] = dir - axis[0] * dir * axis[0];
		axis[1].Normalize();
		axis[2].Cross_2(axis[1], axis[0]);
		return length;
	}
};


/*
===============================================================================

  IK controller for a walking character with an arbitrary number of legs.	

===============================================================================
*/

class idIK_Walk extends idIK {
////public:
////
////							idIK_Walk( );
////	virtual					~idIK_Walk( );
////
////	void					Save( idSaveGame *savefile ) const;
////	void					Restore( idRestoreGame *savefile );
////
////	virtual bool			Init( idEntity *self, const char *anim, const idVec3 &modelOffset );
////	virtual void			Evaluate( );
////	virtual void			ClearJointMods( );
////
////	void					EnableAll( );
////	void					DisableAll( );
////	void					EnableLeg( int num );
////	void					DisableLeg( int num );
////
////private:
	static MAX_LEGS		= 8;
	
	footModel:idClipModel;
	
	numLegs :number/*int*/;
	enabledLegs :number/*int*/;
	footJoints = new Array<jointHandle_t>(idIK_Walk.MAX_LEGS);
	ankleJoints = new Array<jointHandle_t>(idIK_Walk.MAX_LEGS);
	kneeJoints = new Array<jointHandle_t>(idIK_Walk.MAX_LEGS);
	hipJoints = new Array<jointHandle_t>(idIK_Walk.MAX_LEGS);
	dirJoints = new Array<jointHandle_t>(idIK_Walk.MAX_LEGS);
	waistJoint:jointHandle_t;
	
	hipForward = newStructArray<idVec3>(idVec3, idIK_Walk.MAX_LEGS);
	kneeForward = newStructArray<idVec3>(idVec3, idIK_Walk.MAX_LEGS);
	
	upperLegLength = new Float32Array(idIK_Walk.MAX_LEGS);
	lowerLegLength = new Float32Array(idIK_Walk.MAX_LEGS);
	
	upperLegToHipJoint = newStructArray<idMat3>(idMat3, idIK_Walk.MAX_LEGS);
	lowerLegToKneeJoint = newStructArray<idMat3>(idMat3, idIK_Walk.MAX_LEGS);

	smoothing :number/*float*/;
	waistSmoothing :number/*float*/;
	footShift :number/*float*/;
	waistShift :number/*float*/;
	minWaistFloorDist :number/*float*/;
	minWaistAnkleDist :number/*float*/;
	footUpTrace :number/*float*/;
	footDownTrace :number/*float*/;
	tiltWaist:boolean;
	usePivot:boolean;
	
	// state
	pivotFoot :number/*int*/;
	pivotYaw :number/*float*/;
	pivotPos = new idVec3;
	oldHeightsValid:boolean;
	oldWaistHeight :number/*float*/;
	oldAnkleHeights = new Float32Array(idIK_Walk.MAX_LEGS);
	waistOffset = new idVec3;

	
/*
================
idIK_Walk::idIK_Walk
================
*/
	constructor ( ) {
		super ( );
		var /*int*/i: number;

		this.initialized = false;
		this.footModel = null;
		this.numLegs = 0;
		this.enabledLegs = 0;
		for ( i = 0; i < idIK_Walk.MAX_LEGS; i++ ) {
			this.footJoints[i] = jointHandle_t.INVALID_JOINT;
			this.ankleJoints[i] = jointHandle_t.INVALID_JOINT;
			this.kneeJoints[i] = jointHandle_t.INVALID_JOINT;
			this.hipJoints[i] = jointHandle_t.INVALID_JOINT;
			this.dirJoints[i] = jointHandle_t.INVALID_JOINT;
			this.hipForward[i].Zero ( );
			this.kneeForward[i].Zero ( );
			this.upperLegLength[i] = 0.0;
			this.lowerLegLength[i] = 0.0;
			this.upperLegToHipJoint[i].Identity ( );
			this.lowerLegToKneeJoint[i].Identity ( );
			this.oldAnkleHeights[i] = 0.0;
		}
		this.waistJoint = jointHandle_t.INVALID_JOINT;

		this.smoothing = 0.75;
		this.waistSmoothing = 0.5;
		this.footShift = 0.0;
		this.waistShift = 0.0;
		this.minWaistFloorDist = 0.0;
		this.minWaistAnkleDist = 0.0;
		this.footUpTrace = 32.0;
		this.footDownTrace = 32.0;
		this.tiltWaist = false;
		this.usePivot = false;

		this.pivotFoot = -1;
		this.pivotYaw = 0.0;
		this.pivotPos.Zero ( );

		this.oldHeightsValid = false;
		this.oldWaistHeight = 0.0;
		this.waistOffset.Zero ( );
	}

/////*
////================
////idIK_Walk::~idIK_Walk
////================
////*/
////idIK_Walk::~idIK_Walk() {
////	if ( footModel ) {
////		delete footModel;
////	}
////}
////
/////*
////================
////idIK_Walk::Save
////================
////*/
////void idIK_Walk::Save( idSaveGame *savefile ) const {
////	var/*int*/i:number;
////	
////	idIK::Save( savefile );
////
////	savefile.WriteClipModel( footModel );
////
////	savefile.WriteInt( this.numLegs );
////	savefile.WriteInt( this.enabledLegs );
////	for ( i = 0; i < idIK_Walk.MAX_LEGS; i++ ) 
////		savefile.WriteInt( footJoints[i] );
////	for ( i = 0; i < idIK_Walk.MAX_LEGS; i++ ) 
////		savefile.WriteInt( this.ankleJoints[i] );
////	for ( i = 0; i < idIK_Walk.MAX_LEGS; i++ ) 
////		savefile.WriteInt( kneeJoints[i] );
////	for ( i = 0; i < idIK_Walk.MAX_LEGS; i++ ) 
////		savefile.WriteInt( hipJoints[i] );
////	for ( i = 0; i < idIK_Walk.MAX_LEGS; i++ ) 
////		savefile.WriteInt( dirJoints[i] );
////	savefile.WriteInt( this.waistJoint );
////	
////	for ( i = 0; i < idIK_Walk.MAX_LEGS; i++ )
////		savefile.WriteVec3( hipForward[i] );
////	for ( i = 0; i < idIK_Walk.MAX_LEGS; i++ )
////		savefile.WriteVec3( kneeForward[i] );
////	
////	for ( i = 0; i < idIK_Walk.MAX_LEGS; i++ )
////		savefile.WriteFloat( upperLegLength[i] );
////	for ( i = 0; i < idIK_Walk.MAX_LEGS; i++ )
////		savefile.WriteFloat( lowerLegLength[i] );
////	
////	for ( i = 0; i < idIK_Walk.MAX_LEGS; i++ )
////		savefile.WriteMat3( upperLegToHipJoint[i] );
////	for ( i = 0; i < idIK_Walk.MAX_LEGS; i++ )
////		savefile.WriteMat3( lowerLegToKneeJoint[i] );
////	
////	savefile.WriteFloat( smoothing );
////	savefile.WriteFloat( waistSmoothing );
////	savefile.WriteFloat( footShift );
////	savefile.WriteFloat( waistShift );
////	savefile.WriteFloat( minWaistFloorDist );
////	savefile.WriteFloat( minWaistAnkleDist );
////	savefile.WriteFloat( footUpTrace );
////	savefile.WriteFloat( footDownTrace );
////	savefile.WriteBool( tiltWaist );
////	savefile.WriteBool( usePivot );
////
////	savefile.WriteInt( pivotFoot );
////	savefile.WriteFloat( pivotYaw );
////	savefile.WriteVec3( pivotPos );
////	savefile.WriteBool( this.oldHeightsValid );
////	savefile.WriteFloat( oldWaistHeight );
////	for ( i = 0; i < idIK_Walk.MAX_LEGS; i++ ) {
////		savefile.WriteFloat( oldAnkleHeights[i] );
////	}
////	savefile.WriteVec3( waistOffset );
////}
////
/////*
////================
////idIK_Walk::Restore
////================
////*/
////void idIK_Walk::Restore( idRestoreGame *savefile ) {
////	var/*int*/i:number;
////	
////	idIK::Restore( savefile );
////
////	savefile.ReadClipModel( footModel );
////
////	savefile.ReadInt( this.numLegs );
////	savefile.ReadInt( this.enabledLegs );
////	for ( i = 0; i < idIK_Walk.MAX_LEGS; i++ )
////		savefile.ReadInt( (int&)this.footJoints[i] );
////	for ( i = 0; i < idIK_Walk.MAX_LEGS; i++ )
////		savefile.ReadInt( (int&)this.ankleJoints[i] );
////	for ( i = 0; i < idIK_Walk.MAX_LEGS; i++ )
////		savefile.ReadInt( (int&)kneeJoints[i] );
////	for ( i = 0; i < idIK_Walk.MAX_LEGS; i++ )
////		savefile.ReadInt( (int&)hipJoints[i] );
////	for ( i = 0; i < idIK_Walk.MAX_LEGS; i++ )
////		savefile.ReadInt( (int&)dirJoints[i] );
////	savefile.ReadInt( (int&)this.waistJoint );
////	
////	for ( i = 0; i < idIK_Walk.MAX_LEGS; i++ )
////		savefile.ReadVec3( hipForward[i] );
////	for ( i = 0; i < idIK_Walk.MAX_LEGS; i++ )
////		savefile.ReadVec3( kneeForward[i] );
////	
////	for ( i = 0; i < idIK_Walk.MAX_LEGS; i++ )
////		savefile.ReadFloat( upperLegLength[i] );
////	for ( i = 0; i < idIK_Walk.MAX_LEGS; i++ )
////		savefile.ReadFloat( lowerLegLength[i] );
////	
////	for ( i = 0; i < idIK_Walk.MAX_LEGS; i++ )
////		savefile.ReadMat3( upperLegToHipJoint[i] );
////	for ( i = 0; i < idIK_Walk.MAX_LEGS; i++ )
////		savefile.ReadMat3( lowerLegToKneeJoint[i] );
////	
////	savefile.ReadFloat( smoothing );
////	savefile.ReadFloat( waistSmoothing );
////	savefile.ReadFloat( footShift );
////	savefile.ReadFloat( waistShift );
////	savefile.ReadFloat( minWaistFloorDist );
////	savefile.ReadFloat( minWaistAnkleDist );
////	savefile.ReadFloat( footUpTrace );
////	savefile.ReadFloat( footDownTrace );
////	savefile.ReadBool( tiltWaist );
////	savefile.ReadBool( usePivot );
////
////	savefile.ReadInt( pivotFoot );
////	savefile.ReadFloat( pivotYaw );
////	savefile.ReadVec3( pivotPos );
////	savefile.ReadBool( this.oldHeightsValid );
////	savefile.ReadFloat( oldWaistHeight );
////	for ( i = 0; i < idIK_Walk.MAX_LEGS; i++ ) {
////		savefile.ReadFloat( oldAnkleHeights[i] );
////	}
////	savefile.ReadVec3( waistOffset );
////}

/*
================
idIK_Walk::Init
================
*/
	Init ( self: idEntity, anim: string, modelOffset: idVec3 ): boolean {
		var /*int*/i: number;
		var /*float */footSize: number;
		var verts = newStructArray<idVec3>( idVec3, 4 );
		var trm = new idTraceModel;
		var jointName: string;
		var dir = new idVec3, ankleOrigin = new idVec3, kneeOrigin = new idVec3, hipOrigin = new idVec3, dirOrigin = new idVec3;
		var axis = new idMat3, ankleAxis = new idMat3, kneeAxis = new idMat3, hipAxis = new idMat3;

		var footWinding = [
			new idVec3( 1.0, 1.0, 0.0 ),
			new idVec3( -1.0, 1.0, 0.0 ),
			new idVec3( -1.0, -1.0, 0.0 ),
			new idVec3( 1.0, -1.0, 0.0 )
		];

		if ( !self ) {
			return false;
		}

		this.numLegs = Min( self.spawnArgs.GetInt( "ik_numLegs", "0" ), idIK_Walk.MAX_LEGS );
		if ( this.numLegs == 0 ) {
			return true;
		}

		if ( !super.Init( self, anim, modelOffset ) ) {
			return false;
		}

		var /**/ numJoints = this.animator.NumJoints ( );
		var joints = newStructArray<idJointMat>( idJointMat, numJoints ); //( idJointMat * )_alloca16( numJoints * sizeof( joints[0] ) );

		// create the animation frame used to setup the IK
		gameEdit.ANIM_CreateAnimFrame(this.animator.ModelHandle(), this.animator.GetAnim_index( this.modifiedAnim ).MD5Anim( 0 ), numJoints, joints, 1, this.animator.ModelDef ( ).GetVisualOffset ( ) .opAddition( modelOffset), this.animator.RemoveOrigin ( ) );

		this.enabledLegs = 0;

		// get all the joints
		for ( i = 0; i < this.numLegs; i++ ) {

			jointName = self.spawnArgs.GetString( va( "ik_foot%d", i + 1 ) );
			this.footJoints[i] = this.animator.GetJointHandle( jointName );
			if ( this.footJoints[i] == jointHandle_t.INVALID_JOINT ) {
				gameLocal.Error( "idIK_Walk::Init: invalid foot joint '%s'", jointName );
			}

			jointName = self.spawnArgs.GetString( va( "ik_ankle%d", i + 1 ) );
			this.ankleJoints[i] = this.animator.GetJointHandle( jointName );
			if ( this.ankleJoints[i] == jointHandle_t.INVALID_JOINT ) {
				gameLocal.Error( "idIK_Walk::Init: invalid ankle joint '%s'", jointName );
			}

			jointName = self.spawnArgs.GetString( va( "ik_knee%d", i + 1 ) );
			this.kneeJoints[i] = this.animator.GetJointHandle( jointName );
			if ( this.kneeJoints[i] == jointHandle_t.INVALID_JOINT ) {
				gameLocal.Error( "idIK_Walk::Init: invalid knee joint '%s'\n", jointName );
			}

			jointName = self.spawnArgs.GetString( va( "ik_hip%d", i + 1 ) );
			this.hipJoints[i] = this.animator.GetJointHandle( jointName );
			if ( this.hipJoints[i] == jointHandle_t.INVALID_JOINT ) {
				gameLocal.Error( "idIK_Walk::Init: invalid hip joint '%s'\n", jointName );
			}

			jointName = self.spawnArgs.GetString( va( "ik_dir%d", i + 1 ) );
			this.dirJoints[i] = this.animator.GetJointHandle( jointName );

			this.enabledLegs |= 1 << i;
		}

		jointName = self.spawnArgs.GetString( "ik_waist" );
		this.waistJoint = this.animator.GetJointHandle( jointName );
		if ( this.waistJoint == jointHandle_t.INVALID_JOINT ) {
			gameLocal.Error( "idIK_Walk::Init: invalid waist joint '%s'\n", jointName );
		}

		// get the leg bone lengths and rotation matrices
		for ( i = 0; i < this.numLegs; i++ ) {
			this.oldAnkleHeights[i] = 0.0;

			ankleAxis = joints[this.ankleJoints[i]].ToMat3 ( );
			ankleOrigin = joints[this.ankleJoints[i]].ToVec3 ( );

			kneeAxis = joints[this.kneeJoints[i]].ToMat3 ( );
			kneeOrigin.equals( joints[this.kneeJoints[i]].ToVec3 ( ) );

			hipAxis = joints[this.hipJoints[i]].ToMat3 ( );
			hipOrigin = joints[this.hipJoints[i]].ToVec3 ( );

			// get the IK direction
			if ( this.dirJoints[i] != jointHandle_t.INVALID_JOINT ) {
				dirOrigin = joints[this.dirJoints[i]].ToVec3 ( );
				dir.equals( dirOrigin.opSubtraction( kneeOrigin ) );
			} else {
				dir.Set( 1.0, 0.0, 0.0 );
			}

			this.hipForward[i].equals( dir.opMultiplicationAssignment_mat3( hipAxis.Transpose ( ) ) );
			this.kneeForward[i].equals( dir.opMultiplicationAssignment_mat3( kneeAxis.Transpose ( ) ) );

			// conversion from upper leg bone axis to hip joint axis
			this.upperLegLength[i] = this.GetBoneAxis( hipOrigin, kneeOrigin, dir, axis );
			this.upperLegToHipJoint[i].equals( hipAxis.opMultiplication(axis.Transpose ( )));

			// conversion from lower leg bone axis to knee joint axis
			this.lowerLegLength[i] = this.GetBoneAxis( kneeOrigin, ankleOrigin, dir, axis );
			this.lowerLegToKneeJoint[i].equals( kneeAxis.opMultiplication( axis.Transpose ( ) ) );
		}

		this.smoothing = self.spawnArgs.GetFloat( "ik_smoothing", "0.75" );
		this.waistSmoothing = self.spawnArgs.GetFloat( "ik_waistSmoothing", "0.75" );
		this.footShift = self.spawnArgs.GetFloat( "ik_footShift", "0" );
		this.waistShift = self.spawnArgs.GetFloat( "ik_waistShift", "0" );
		this.minWaistFloorDist = self.spawnArgs.GetFloat( "ik_minWaistFloorDist", "0" );
		this.minWaistAnkleDist = self.spawnArgs.GetFloat( "ik_minWaistAnkleDist", "0" );
		this.footUpTrace = self.spawnArgs.GetFloat( "ik_footUpTrace", "32" );
		this.footDownTrace = self.spawnArgs.GetFloat( "ik_footDownTrace", "32" );
		this.tiltWaist = self.spawnArgs.GetBool( "ik_tiltWaist", "0" );
		this.usePivot = self.spawnArgs.GetBool( "ik_usePivot", "0" );

		// setup a clip model for the feet
		footSize = self.spawnArgs.GetFloat( "ik_footSize", "4" ) * 0.5;
		if ( footSize > 0.0 ) {
			for ( i = 0; i < 4; i++ ) {
				verts[i].equals( footWinding[i].timesFloat( footSize ) );
			}
			trm.SetupPolygon( verts, 4 );
			this.footModel = new idClipModel( trm );
		}

		this.initialized = true;

		return true;
	}
////
/////*
////================
////idIK_Walk::Evaluate
////================
////*/
////void idIK_Walk::Evaluate( ) {
////	int i, newPivotFoot = 0;
////	float modelHeight, jointHeight, lowestHeight, floorHeights[idIK_Walk.MAX_LEGS];
////	float shift, smallestShift, newHeight, step, newPivotYaw, height, largestAnkleHeight;
////	idVec3 modelOrigin, normal, hipDir, kneeDir, start, end, jointOrigins[idIK_Walk.MAX_LEGS];
////	idVec3 footOrigin, ankleOrigin, kneeOrigin, hipOrigin, waistOrigin;
////	idMat3 modelAxis, waistAxis, axis;
////	idMat3 hipAxis[idIK_Walk.MAX_LEGS], kneeAxis[idIK_Walk.MAX_LEGS], ankleAxis[idIK_Walk.MAX_LEGS];
////	trace_t results;
////
////	if ( !self || !gameLocal.isNewFrame ) {
////		return;
////	}
////
////	// if no IK enabled on any legs
////	if ( !this.enabledLegs ) {
////		return;
////	}
////
////	normal = - self.GetPhysics().GetGravityNormal();
////	modelOrigin = self.GetPhysics().GetOrigin();
////	modelAxis = self.GetRenderEntity().axis;
////	modelHeight = modelOrigin * normal;
////
////	modelOrigin += modelOffset * modelAxis;
////
////	// create frame without joint mods
////	this.animator.CreateFrame( gameLocal.time, false );
////
////	// get the joint positions for the feet
////	lowestHeight = idMath::INFINITY;
////	for ( i = 0; i < this.numLegs; i++ ) {
////		this.animator.GetJointTransform( this.footJoints[i], gameLocal.time, footOrigin, axis );
////		jointOrigins[i] = modelOrigin + footOrigin * modelAxis;
////		jointHeight = jointOrigins[i] * normal;
////		if ( jointHeight < lowestHeight ) {
////			lowestHeight = jointHeight;
////			newPivotFoot = i;
////		}
////	}
////
////	if ( usePivot ) {
////
////		newPivotYaw = modelAxis[0].ToYaw();
////
////		// change pivot foot
////		if ( newPivotFoot != pivotFoot || idMath::Fabs( idMath::AngleNormalize180( newPivotYaw - pivotYaw ) ) > 30.0 ) {
////			pivotFoot = newPivotFoot;
////			pivotYaw = newPivotYaw;
////			this.animator.GetJointTransform( this.footJoints[pivotFoot], gameLocal.time, footOrigin, axis );
////			pivotPos = modelOrigin + footOrigin * modelAxis;
////		}
////
////		// keep pivot foot in place
////		jointOrigins[pivotFoot] = pivotPos;
////	}
////
////	// get the floor heights for the feet
////	for ( i = 0; i < this.numLegs; i++ ) {
////
////		if ( !( this.enabledLegs & ( 1 << i ) ) ) {
////			continue;
////		}
////
////		start = jointOrigins[i] + normal * footUpTrace;
////		end = jointOrigins[i] - normal * footDownTrace;
////		gameLocal.clip.Translation( results, start, end, footModel, mat3_identity, CONTENTS_SOLID|CONTENTS_IKCLIP, self );
////		floorHeights[i] = results.endpos * normal;
////
////		if ( ik_debug.GetBool() && footModel ) {
////			idFixedWinding w;
////			for ( int j = 0; j < footModel.GetTraceModel().numVerts; j++ ) {
////				w += footModel.GetTraceModel().verts[j];
////			}
////			gameRenderWorld.DebugWinding( colorRed, w, results.endpos, results.endAxis );
////		}
////	}
////
////	const idPhysics *phys = self.GetPhysics();
////
////	// test whether or not the character standing on the ground
////	bool onGround = phys.HasGroundContacts();
////
////	// test whether or not the character is standing on a plat
////	bool onPlat = false;
////	for ( i = 0; i < phys.GetNumContacts(); i++ ) {
////		var ent:idEntity = gameLocal.entities[ phys.GetContact( i ).entityNum ];
////		if ( ent != NULL && ent.IsType( idPlat::Type ) ) {
////			onPlat = true;
////			break;
////		}
////	}
////
////	// adjust heights of the ankles
////	smallestShift = idMath::INFINITY;
////	largestAnkleHeight = -idMath::INFINITY;
////	for ( i = 0; i < this.numLegs; i++ ) {
////
////		if ( onGround && ( this.enabledLegs & ( 1 << i ) ) ) {
////			shift = floorHeights[i] - modelHeight + footShift;
////		} else {
////			shift = 0.0;
////		}
////
////		if ( shift < smallestShift ) {
////			smallestShift = shift;
////		}
////
////		this.animator.GetJointTransform( this.ankleJoints[i], gameLocal.time, ankleOrigin, ankleAxis[i] );
////		jointOrigins[i] = modelOrigin + ankleOrigin * modelAxis;
////
////		height = jointOrigins[i] * normal;
////
////		if ( this.oldHeightsValid && !onPlat ) {
////			step = height + shift - oldAnkleHeights[i];
////			shift -= smoothing * step;
////		}
////
////		newHeight = height + shift;
////		if ( newHeight > largestAnkleHeight ) {
////			largestAnkleHeight = newHeight;
////		}
////
////		oldAnkleHeights[i] = newHeight;
////
////		jointOrigins[i] += shift * normal;
////	}
////
////	this.animator.GetJointTransform( this.waistJoint, gameLocal.time, waistOrigin, waistAxis );
////	waistOrigin = modelOrigin + waistOrigin * modelAxis;
////
////	// adjust position of the waist
////	waistOffset = ( smallestShift + waistShift ) * normal;
////
////	// if the waist should be at least a certain distance above the floor
////	if ( minWaistFloorDist > 0.0 && waistOffset * normal < 0.0 ) {
////		start = waistOrigin;
////		end = waistOrigin + waistOffset - normal * minWaistFloorDist;
////		gameLocal.clip.Translation( results, start, end, footModel, modelAxis, CONTENTS_SOLID|CONTENTS_IKCLIP, self );
////		height = ( waistOrigin + waistOffset - results.endpos ) * normal;
////		if ( height < minWaistFloorDist ) {
////			waistOffset += ( minWaistFloorDist - height ) * normal;
////		}
////	}
////
////	// if the waist should be at least a certain distance above the ankles
////	if ( minWaistAnkleDist > 0.0 ) {
////		height = ( waistOrigin + waistOffset ) * normal;
////		if ( height - largestAnkleHeight < minWaistAnkleDist ) {
////			waistOffset += ( minWaistAnkleDist - ( height - largestAnkleHeight ) ) * normal;
////		}
////	}
////
////	if ( this.oldHeightsValid ) {
////		// smoothly adjust height of waist
////		newHeight = ( waistOrigin + waistOffset ) * normal;
////		step = newHeight - oldWaistHeight;
////		waistOffset -= waistSmoothing * step * normal;
////	}
////
////	// save height of waist for smoothing
////	oldWaistHeight = ( waistOrigin + waistOffset ) * normal;
////
////	if ( !this.oldHeightsValid ) {
////		this.oldHeightsValid = true;
////		return;
////	}
////
////	// solve IK
////	for ( i = 0; i < this.numLegs; i++ ) {
////
////		// get the position of the hip in world space
////		this.animator.GetJointTransform( hipJoints[i], gameLocal.time, hipOrigin, axis );
////		hipOrigin = modelOrigin + waistOffset + hipOrigin * modelAxis;
////		hipDir = hipForward[i] * axis * modelAxis;
////
////		// get the IK bend direction
////		this.animator.GetJointTransform( kneeJoints[i], gameLocal.time, kneeOrigin, axis );
////		kneeDir = kneeForward[i] * axis * modelAxis;
////
////		// solve IK and calculate knee position
////		SolveTwoBones( hipOrigin, jointOrigins[i], kneeDir, upperLegLength[i], lowerLegLength[i], kneeOrigin );
////
////		if ( ik_debug.GetBool() ) {
////			gameRenderWorld.DebugLine( colorCyan, hipOrigin, kneeOrigin );
////			gameRenderWorld.DebugLine( colorRed, kneeOrigin, jointOrigins[i] );
////			gameRenderWorld.DebugLine( colorYellow, kneeOrigin, kneeOrigin + hipDir );
////			gameRenderWorld.DebugLine( colorGreen, kneeOrigin, kneeOrigin + kneeDir );
////		}
////
////		// get the axis for the hip joint
////		this.GetBoneAxis( hipOrigin, kneeOrigin, hipDir, axis );
////		hipAxis[i] = upperLegToHipJoint[i] * ( axis * modelAxis.Transpose() );
////
////		// get the axis for the knee joint
////		this.GetBoneAxis( kneeOrigin, jointOrigins[i], kneeDir, axis );
////		kneeAxis[i] = lowerLegToKneeJoint[i] * ( axis * modelAxis.Transpose() );
////	}
////
////	// set the joint mods
////	this.animator.SetJointAxis( this.waistJoint, JOINTMOD_WORLD_OVERRIDE, waistAxis );
////	this.animator.SetJointPos( this.waistJoint, JOINTMOD_WORLD_OVERRIDE, ( waistOrigin + waistOffset - modelOrigin ) * modelAxis.Transpose() );
////	for ( i = 0; i < this.numLegs; i++ ) {
////		this.animator.SetJointAxis( hipJoints[i], JOINTMOD_WORLD_OVERRIDE, hipAxis[i] );
////		this.animator.SetJointAxis( kneeJoints[i], JOINTMOD_WORLD_OVERRIDE, kneeAxis[i] );
////		this.animator.SetJointAxis( this.ankleJoints[i], JOINTMOD_WORLD_OVERRIDE, ankleAxis[i] );
////	}
////
////	ik_activate = true;
////}
////
/////*
////================
////idIK_Walk::ClearJointMods
////================
////*/
////void idIK_Walk::ClearJointMods( ) {
////	var/*int*/i:number;
////
////	if ( !self || !ik_activate ) {
////		return;
////	}
////
////	this.animator.SetJointAxis( this.waistJoint, JOINTMOD_NONE, mat3_identity );
////	this.animator.SetJointPos( this.waistJoint, JOINTMOD_NONE, vec3_origin );
////	for ( i = 0; i < this.numLegs; i++ ) {
////		this.animator.SetJointAxis( hipJoints[i], JOINTMOD_NONE, mat3_identity );
////		this.animator.SetJointAxis( kneeJoints[i], JOINTMOD_NONE, mat3_identity );
////		this.animator.SetJointAxis( this.ankleJoints[i], JOINTMOD_NONE, mat3_identity );
////	}
////
////	ik_activate = false;
////}

/*
================
idIK_Walk::EnableAll
================
*/
	EnableAll ( ): void {
		this.enabledLegs = ( 1 << this.numLegs ) - 1;
		this.oldHeightsValid = false;
	}

/*
================
idIK_Walk::DisableAll
================
*/
	DisableAll ( ): void {
		this.enabledLegs = 0;
		this.oldHeightsValid = false;
	}

/*
================
idIK_Walk::EnableLeg
================
*/
	EnableLeg ( /*int*/ num: number ): void {
		this.enabledLegs |= 1 << num;
	}

/*
================
idIK_Walk::DisableLeg
================
*/
	DisableLeg ( /*int*/ num: number ): void {
		this.enabledLegs &= ~( 1 << num );
	}


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
////							idIK_Reach( );
////	virtual					~idIK_Reach( );
////
////	void					Save( idSaveGame *savefile ) const;
////	void					Restore( idRestoreGame *savefile );
////
////	virtual bool			Init( idEntity *self, const char *anim, const idVec3 &modelOffset );
////	virtual void			Evaluate( );
////	virtual void			ClearJointMods( );
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
