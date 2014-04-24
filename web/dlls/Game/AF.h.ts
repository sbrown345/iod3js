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
////#ifndef __GAME_AF_H__
////#define __GAME_AF_H__


/*
===============================================================================

  Articulated figure controller.

===============================================================================
*/

class jointConversion_t {
	bodyId :number/*int*/;				// id of the body
	jointHandle:jointHandle_t;		// handle of joint this body modifies
	jointMod: AFJointModType_t;			// modify joint axis, origin or both
	jointBodyOrigin = new idVec3;	// origin of body relative to joint
	jointBodyAxis = new idMat3;		// axis of body relative to joint
};

class afTouch_t {
	touchedEnt:idEntity;
	touchedClipModel:idClipModel;
	touchedByBody:idAFBody;
};

class idAF {
////public:
////							idAF( );
////							~idAF( );
////
////	void					Save( idSaveGame *savefile ) const;
////	void					Restore( idRestoreGame *savefile );
////
	SetAnimator(a: idAnimator ):void { this.animator = a; }
////	bool					Load( ent:idEntity, const char *fileName );
////	bool					IsLoaded( ) const { return this.isLoaded && this.self != NULL; }
////	const char *			GetName( ) const { return this.name.c_str(); }
////	void					SetupPose( ent:idEntity, /*int*/time:number );
////	void					ChangePose( ent:idEntity, /*int*/time:number );
////	int						EntitiesTouchingAF( afTouch_t touchList[ MAX_GENTITIES ] ) const;
////	void					Start( );
////	void					StartFromCurrentPose( int inheritVelocityTime );
////	void					Stop( );
////	void					Rest( );
////	bool					IsActive( ) const { return isActive; }
////	void					SetConstraintPosition( this.name:string, pos:idVec3 );
////
	GetPhysics ( ): idPhysics_AF { return this.physicsObj; }
////	const idPhysics_AF *	GetPhysics( ) const { return &this.physicsObj; }
////	idBounds				GetBounds( ) const;
////	bool					UpdateAnimation( );
////
////	void					GetPhysicsToVisualTransform( idVec3 &origin, idMat3 &axis ) const;
////	void					GetImpactInfo( ent:idEntity, int id, const idVec3 &point, impactInfo_t *info );
////	void					ApplyImpulse( ent:idEntity, int id, const idVec3 &point, const idVec3 &impulse );
////	void					AddForce( ent:idEntity, int id, const idVec3 &point, const idVec3 &force );
////	int						BodyForClipModelId( int id ) const;
////
////	void					SaveState( idDict &args ) const;
////	void					LoadState( const idDict &args );
////
////	void					AddBindConstraints( );
////	void					RemoveBindConstraints( );
////
////protected:
	name = new idStr;				// name of the loaded .af file
	physicsObj = new idPhysics_AF;			// articulated figure physics
	self:idEntity;				// entity using the animated model
	animator:idAnimator;			// animator on entity
	modifiedAnim :number/*int*/;		// anim to modify
	baseOrigin = new idVec3;			// offset of base body relative to skeletal model origin
	baseAxis = new idMat3;			// axis of base body relative to skeletal model origin
	jointMods = new idList<jointConversion_t>(jointConversion_t);			// list with transforms from skeletal model joints to articulated figure bodies
	jointBody = new idList</*int*/number>(Number);			// table to find the nearest articulated figure body for a joint of the skeletal model
	poseTime:number/*int*/;			// last time the articulated figure was transformed to reflect the current animation pose
	restStartTime:number/*int*/;		// time the articulated figure came to rest
	isLoaded:boolean;			// true when the articulated figure is properly loaded
	isActive:boolean;			// true if the articulated figure physics is active
	hasBindConstraints:boolean;	// true if the bind constraints have been added
////
////protected:
////	void					SetBase( idAFBody *body, const idJointMat *joints );
////	void					AddBody( idAFBody *body, const idJointMat *joints, const char *jointName, const AFJointModType_t mod );
////
////	bool					LoadBody( const idDeclAF_Body *fb, const idJointMat *joints );
////	bool					LoadConstraint( const idDeclAF_Constraint *fc );
////
////	bool					TestSolid( ) const;


	/*
	================
	idAF::idAF
	================
	*/
	constructor( ) {
		this.self = null;
		this.animator = null;
		this.modifiedAnim = 0;
		this.baseOrigin.Zero();
		this.baseAxis.Identity();
		this.poseTime = -1;
		this.restStartTime = -1;
		this.isLoaded = false;
		this.isActive = false;
		this.hasBindConstraints = false;
	}
	////
	/////*
	////================
	////idAF::~idAF
	////================
	////*/
	////idAF::~idAF( ) {
	////}
	////
	/////*
	////================
	////idAF::Save
	////================
	////*/
	////void idAF::Save( idSaveGame *savefile ) const {
	////	savefile.WriteObject( this.self );
	////	savefile.WriteString( GetName() );
	////	savefile.WriteBool( hasBindConstraints );
	////	savefile.WriteVec3( baseOrigin );
	////	savefile.WriteMat3( baseAxis );
	////	savefile.WriteInt( poseTime );
	////	savefile.WriteInt( restStartTime );
	////	savefile.WriteBool( this.isLoaded );
	////	savefile.WriteBool( isActive );
	////	savefile.WriteStaticObject( this.physicsObj );
	////}
	////
	/////*
	////================
	////idAF::Restore
	////================
	////*/
	////void idAF::Restore( idRestoreGame *savefile ) {
	////	savefile.ReadObject( reinterpret_cast<idClass *&>( this.self ) );
	////	savefile.ReadString( this.name );
	////	savefile.ReadBool( hasBindConstraints );
	////	savefile.ReadVec3( baseOrigin );
	////	savefile.ReadMat3( baseAxis );
	////	savefile.ReadInt( poseTime );
	////	savefile.ReadInt( restStartTime );
	////	savefile.ReadBool( this.isLoaded );
	////	savefile.ReadBool( isActive );
	////
	////	this.animator = NULL;
	////	this.modifiedAnim = 0;
	////
	////	if ( this.self ) {
	////		SetAnimator( this.self.GetAnimator() );
	////		Load( this.self, this.name );
	////		if ( hasBindConstraints ) {
	////			AddBindConstraints();
	////		}
	////	}
	////
	////	savefile.ReadStaticObject( this.physicsObj );
	////
	////	if ( this.self ) {
	////		if ( isActive ) {
	////			// clear all animations
	////			this.animator.ClearAllAnims( gameLocal.time, 0 );
	////			this.animator.ClearAllJoints();
	////
	////			// switch to articulated figure physics
	////			this.self.RestorePhysics( &this.physicsObj );
	////			this.physicsObj.EnableClip();
	////		}
	////		UpdateAnimation();
	////	}
	////}
	////
	/////*
	////================
	////idAF::UpdateAnimation
	////================
	////*/
	////bool idAF::UpdateAnimation( ) {
	////	var/*int*/i:number;
	////	idVec3 origin, renderOrigin, bodyOrigin;
	////	idMat3 axis, renderAxis, bodyAxis;
	////	renderEntity_t *renderEntity;
	////
	////	if ( !IsLoaded() ) {
	////		return false;
	////	}
	////
	////	if ( !IsActive() ) {
	////		return false;
	////	}
	////
	////	renderEntity = this.self.GetRenderEntity();
	////	if ( !renderEntity ) {
	////		return false;
	////	}
	////
	////	if ( this.physicsObj.IsAtRest() ) {
	////		if ( restStartTime == this.physicsObj.GetRestStartTime() ) {
	////			return false;
	////		}
	////		restStartTime = this.physicsObj.GetRestStartTime();
	////	}
	////
	////	// get the render position
	////	origin = this.physicsObj.GetOrigin( 0 );
	////	axis = this.physicsObj.GetAxis( 0 );
	////	renderAxis = baseAxis.Transpose() * axis;
	////	renderOrigin = origin - baseOrigin * renderAxis;
	////
	////	// create an animation frame which reflects the current pose of the articulated figure
	////	this.animator.InitAFPose();
	////	for ( i = 0; i < this.jointMods.Num(); i++ ) {
	////		// check for the origin joint
	////		if ( this.jointMods[i].jointHandle == 0 ) {
	////			continue;
	////		}
	////		bodyOrigin = this.physicsObj.GetOrigin( this.jointMods[i].bodyId );
	////		bodyAxis = this.physicsObj.GetAxis( this.jointMods[i].bodyId );
	////		axis = this.jointMods[i].jointBodyAxis.Transpose() * ( bodyAxis * renderAxis.Transpose() );
	////		origin = ( bodyOrigin - this.jointMods[i].jointBodyOrigin * axis - renderOrigin ) * renderAxis.Transpose();
	////		this.animator.SetAFPoseJointMod( this.jointMods[i].jointHandle, this.jointMods[i].jointMod, axis, origin );
	////	}
	////	this.animator.FinishAFPose( this.modifiedAnim, GetBounds().Expand( POSE_BOUNDS_EXPANSION ), gameLocal.time );
	////	this.animator.SetAFPoseBlendWeight( 1.0f );
	////
	////	return true;
	////}
	////
	/////*
	////================
	////idAF::GetBounds
	////
	////  returns bounds for the current pose
	////================
	////*/
	////idBounds idAF::GetBounds( ) const {
	////	var/*int*/i:number;
	////	idAFBody *body;
	////	idVec3 origin, entityOrigin;
	////	idMat3 axis, entityAxis;
	////	idBounds bounds, b;
	////
	////	bounds.Clear();
	////
	////	// get model base transform
	////	origin = this.physicsObj.GetOrigin( 0 );
	////	axis = this.physicsObj.GetAxis( 0 );
	////
	////	entityAxis = baseAxis.Transpose() * axis;
	////	entityOrigin = origin - baseOrigin * entityAxis;
	////
	////	// get bounds relative to base
	////	for ( i = 0; i < this.jointMods.Num(); i++ ) {
	////		body = this.physicsObj.GetBody( this.jointMods[i].bodyId );
	////		origin = ( body.GetWorldOrigin() - entityOrigin ) * entityAxis.Transpose();
	////		axis = body.GetWorldAxis() * entityAxis.Transpose();
	////		b.FromTransformedBounds( body.GetClipModel().GetBounds(), origin, axis );
	////
	////		bounds += b;
	////	}
	////
	////	return bounds;
	////}
	////
	/////*
	////================
	////idAF::SetupPose
	////
	////  Transforms the articulated figure to match the current animation pose of the given entity.
	////================
	////*/
	////void idAF::SetupPose( ent:idEntity, /*int*/time:number ) {
	////	var/*int*/i:number;
	////	idAFBody *body;
	////	idVec3 origin;
	////	idMat3 axis;
	////	idAnimator *animatorPtr;
	////	renderEntity_t *renderEntity;
	////
	////	if ( !IsLoaded() || !ent ) {
	////		return;
	////	}
	////
	////	animatorPtr = ent.GetAnimator();
	////	if ( !animatorPtr ) {
	////		return;
	////	}
	////
	////	renderEntity = ent.GetRenderEntity();
	////	if ( !renderEntity ) {
	////		return;
	////	}
	////
	////	// if the animation is driven by the physics
	////	if ( this.self.GetPhysics() == &this.physicsObj ) {
	////		return;
	////	}
	////
	////	// if the pose was already updated this frame
	////	if ( poseTime == time ) {
	////		return;
	////	}
	////	poseTime = time;
	////
	////	for ( i = 0; i < this.jointMods.Num(); i++ ) {
	////		body = this.physicsObj.GetBody( this.jointMods[i].bodyId );
	////		animatorPtr.GetJointTransform( this.jointMods[i].jointHandle, time, origin, axis );
	////		body.SetWorldOrigin( renderEntity.origin + ( origin + this.jointMods[i].jointBodyOrigin * axis ) * renderEntity.axis );
	////		body.SetWorldAxis( this.jointMods[i].jointBodyAxis * axis * renderEntity.axis );
	////	}
	////
	////	if ( isActive ) {
	////		this.physicsObj.UpdateClipModels();
	////	}
	////}
	////
	/////*
	////================
	////idAF::ChangePose
	////
	////   Change the articulated figure to match the current animation pose of the given entity
	////   and set the velocity relative to the previous pose.
	////================
	////*/
	////void idAF::ChangePose( ent:idEntity, /*int*/time:number ) {
	////	var/*int*/i:number;
	////	float invDelta;
	////	idAFBody *body;
	////	idVec3 origin, lastOrigin;
	////	idMat3 axis;
	////	idAnimator *animatorPtr;
	////	renderEntity_t *renderEntity;
	////
	////	if ( !IsLoaded() || !ent ) {
	////		return;
	////	}
	////
	////	animatorPtr = ent.GetAnimator();
	////	if ( !animatorPtr ) {
	////		return;
	////	}
	////
	////	renderEntity = ent.GetRenderEntity();
	////	if ( !renderEntity ) {
	////		return;
	////	}
	////
	////	// if the animation is driven by the physics
	////	if ( this.self.GetPhysics() == &this.physicsObj ) {
	////		return;
	////	}
	////
	////	// if the pose was already updated this frame
	////	if ( poseTime == time ) {
	////		return;
	////	}
	////	invDelta = 1.0f / MS2SEC( time - poseTime );
	////	poseTime = time;
	////
	////	for ( i = 0; i < this.jointMods.Num(); i++ ) {
	////		body = this.physicsObj.GetBody( this.jointMods[i].bodyId );
	////		animatorPtr.GetJointTransform( this.jointMods[i].jointHandle, time, origin, axis );
	////		lastOrigin = body.GetWorldOrigin();
	////		body.SetWorldOrigin( renderEntity.origin + ( origin + this.jointMods[i].jointBodyOrigin * axis ) * renderEntity.axis );
	////		body.SetWorldAxis( this.jointMods[i].jointBodyAxis * axis * renderEntity.axis );
	////		body.SetLinearVelocity( ( body.GetWorldOrigin() - lastOrigin ) * invDelta );
	////	}
	////
	////	this.physicsObj.UpdateClipModels();
	////}
	////
	/////*
	////================
	////idAF::EntitiesTouchingAF
	////================
	////*/
	////int idAF::EntitiesTouchingAF( afTouch_t touchList[ MAX_GENTITIES ] ) const {
	////	int i, j, numClipModels;
	////	idAFBody *body;
	////	idClipModel *cm;
	////	idClipModel *clipModels[ MAX_GENTITIES ];
	////	int numTouching;
	////
	////	if ( !IsLoaded() ) {
	////		return 0;
	////	}
	////
	////	numTouching = 0;
	////	numClipModels = gameLocal.clip.ClipModelsTouchingBounds( this.physicsObj.GetAbsBounds(), -1, clipModels, MAX_GENTITIES );
	////
	////	for ( i = 0; i < this.jointMods.Num(); i++ ) {
	////		body = this.physicsObj.GetBody( this.jointMods[i].bodyId );
	////
	////		for ( j = 0; j < numClipModels; j++ ) {
	////			cm = clipModels[j];
	////
	////			if ( !cm || cm.GetEntity() == this.self ) {
	////				continue;
	////			}
	////
	////			if ( !cm.IsTraceModel() ) {
	////				continue;
	////			}
	////
	////			if ( !body.GetClipModel().GetAbsBounds().IntersectsBounds( cm.GetAbsBounds() ) ) {
	////				continue;
	////			}
	////
	////			if ( gameLocal.clip.ContentsModel( body.GetWorldOrigin(), body.GetClipModel(), body.GetWorldAxis(), -1, cm.Handle(), cm.GetOrigin(), cm.GetAxis() ) ) {
	////				touchList[ numTouching ].touchedByBody = body;
	////				touchList[ numTouching ].touchedClipModel = cm;
	////				touchList[ numTouching ].touchedEnt  = cm.GetEntity();
	////				numTouching++;
	////				clipModels[j] = NULL;
	////			}
	////		}
	////	}
	////
	////	return numTouching;
	////}
	////
	/////*
	////================
	////idAF::BodyForClipModelId
	////================
	////*/
	////int idAF::BodyForClipModelId( /*int*/ id:number ) const {
	////	if ( id >= 0 ) {
	////		return id;
	////	} else {
	////		id = CLIPMODEL_ID_TO_JOINT_HANDLE( id );
	////		if ( id < this.jointBody.Num() ) {
	////			return this.jointBody[id];
	////		} else {
	////			return 0;
	////		}
	////	}
	////}
	////
	/////*
	////================
	////idAF::GetPhysicsToVisualTransform
	////================
	////*/
	////void idAF::GetPhysicsToVisualTransform( idVec3 &origin, idMat3 &axis ) const {
	////	origin = - baseOrigin;
	////	axis = baseAxis.Transpose();
	////}
	////
	/////*
	////================
	////idAF::GetImpactInfo
	////================
	////*/
	////void idAF::GetImpactInfo( ent:idEntity, /*int*/ id:number, const idVec3 &point, impactInfo_t *info ) {
	////	SetupPose( this.self, gameLocal.time );
	////	this.physicsObj.GetImpactInfo( BodyForClipModelId( id ), point, info );
	////}
	////
	/////*
	////================
	////idAF::ApplyImpulse
	////================
	////*/
	////void idAF::ApplyImpulse( ent:idEntity, /*int*/ id:number, const idVec3 &point, const idVec3 &impulse ) {
	////	SetupPose( this.self, gameLocal.time );
	////	this.physicsObj.ApplyImpulse( BodyForClipModelId( id ), point, impulse );
	////}
	////
	/////*
	////================
	////idAF::AddForce
	////================
	////*/
	////void idAF::AddForce( ent:idEntity, /*int*/ id:number, const idVec3 &point, const idVec3 &force ) {
	////	SetupPose( this.self, gameLocal.time );
	////	this.physicsObj.AddForce( BodyForClipModelId( id ), point, force );
	////}
	////
	/////*
	////================
	////idAF::AddBody
	////
	////  Adds a body.
	////================
	////*/
	////void idAF::AddBody( idAFBody *body, const idJointMat *joints, const char *jointName, const AFJointModType_t mod ) {
	////	int index;
	////	jointHandle_t handle;
	////	idVec3 origin;
	////	idMat3 axis;
	////
	////	handle = this.animator.GetJointHandle( jointName );
	////	if ( handle == jointHandle_t.INVALID_JOINT ) {
	////		gameLocal.Error( "idAF for entity '%s' at (%s) modifies unknown joint '%s'", this.self.name.c_str(), this.self.GetPhysics().GetOrigin().ToString(0), jointName );
	////	}
	////
	////	assert( handle < this.animator.NumJoints() );
	////	origin = joints[ handle ].ToVec3();
	////	axis = joints[ handle ].ToMat3();
	////
	////	index = this.jointMods.Num();
	////	this.jointMods.SetNum( index + 1, false );
	////	this.jointMods[index].bodyId = this.physicsObj.GetBodyId( body );
	////	this.jointMods[index].jointHandle = handle;
	////	this.jointMods[index].jointMod = mod;
	////	this.jointMods[index].jointBodyOrigin = ( body.GetWorldOrigin() - origin ) * axis.Transpose();
	////	this.jointMods[index].jointBodyAxis = body.GetWorldAxis() * axis.Transpose();
	////}
	////
	/////*
	////================
	////idAF::SetBase
	////
	////  Sets the base body.
	////================
	////*/
	////void idAF::SetBase( idAFBody *body, const idJointMat *joints ) {
	////	this.physicsObj.ForceBodyId( body, 0 );
	////	baseOrigin = body.GetWorldOrigin();
	////	baseAxis = body.GetWorldAxis();
	////	AddBody( body, joints, this.animator.GetJointName( this.animator.GetFirstChild( "origin" ) ), AF_JOINTMOD_AXIS );
	////}
	
	/*
	================
	idAF::LoadBody
	================
	*/
	LoadBody ( fb: idDeclAF_Body, joints: idJointMat [] ): boolean {
		todoThrow ( );
		////	/*int*/ id:number, i;
		////	float length, mass;
		////	idTraceModel trm;
		////	idClipModel *clip;
		////	idAFBody *body;
		////	idMat3 axis, inertiaTensor;
		////	idVec3 centerOfMass, origin;
		////	idBounds bounds;
		////	idList<jointHandle_t> jointList;
		////
		////	origin = fb.origin.ToVec3();
		////	axis = fb.angles.ToMat3();
		////	bounds[0] = fb.v1.ToVec3();
		////	bounds[1] = fb.v2.ToVec3();
		////
		////	switch( fb.modelType ) {
		////		case TRM_BOX: {
		////			trm.SetupBox( bounds );
		////			break;
		////		}
		////		case TRM_OCTAHEDRON: {
		////			trm.SetupOctahedron( bounds );
		////			break;
		////		}
		////		case TRM_DODECAHEDRON: {
		////			trm.SetupDodecahedron( bounds );
		////			break;
		////		}
		////		case TRM_CYLINDER: {
		////			trm.SetupCylinder( bounds, fb.numSides );
		////			break;
		////		}
		////		case TRM_CONE: {
		////			// place the apex at the origin
		////			bounds[0].z -= bounds[1].z;
		////			bounds[1].z = 0.0f;
		////			trm.SetupCone( bounds, fb.numSides );
		////			break;
		////		}
		////		case TRM_BONE: {
		////			// direction of bone
		////			axis[2] = fb.v2.ToVec3() - fb.v1.ToVec3();
		////			length = axis[2].Normalize();
		////			// axis of bone trace model
		////			axis[2].NormalVectors( axis[0], axis[1] );
		////			axis[1] = -axis[1];
		////			// create bone trace model
		////			trm.SetupBone( length, fb.width );
		////			break;
		////		}
		////		default:
		////			assert( 0 );
		////			break;
		////	}
		////	trm.GetMassProperties( 1.0f, mass, centerOfMass, inertiaTensor );
		////	trm.Translate( -centerOfMass );
		////	origin += centerOfMass * axis;
		////
		////	body = this.physicsObj.GetBody( fb.name );
		////	if ( body ) {
		////		clip = body.GetClipModel();
		////		if ( !clip.IsEqual( trm ) ) {
		////			clip = new idClipModel( trm );
		////			clip.SetContents( fb.contents );
		////			clip.Link( gameLocal.clip, this.self, 0, origin, axis );
		////			body.SetClipModel( clip );
		////		}
		////		clip.SetContents( fb.contents );
		////		body.SetDensity( fb.density, fb.inertiaScale );
		////		body.SetWorldOrigin( origin );
		////		body.SetWorldAxis( axis );
		////		id = this.physicsObj.GetBodyId( body );
		////	}
		////	else {
		////		clip = new idClipModel( trm );
		////		clip.SetContents( fb.contents );
		////		clip.Link( gameLocal.clip, this.self, 0, origin, axis );
		////		body = new idAFBody( fb.name, clip, fb.density );
		////		if ( fb.inertiaScale != mat3_identity ) {
		////			body.SetDensity( fb.density, fb.inertiaScale );
		////		}
		////		id = this.physicsObj.AddBody( body );
		////	}
		////	if ( fb.linearFriction != -1.0f ) {
		////		body.SetFriction( fb.linearFriction, fb.angularFriction, fb.contactFriction );
		////	}
		////	body.SetClipMask( fb.clipMask );
		////	body.SetSelfCollision( fb.selfCollision );
		////
		////	if ( fb.jointName == "origin" ) {
		////		SetBase( body, joints );
		////	} else {
		////		AFJointModType_t mod;
		////		if ( fb.jointMod == DECLAF_JOINTMOD_AXIS ) {
		////			mod = AF_JOINTMOD_AXIS;
		////		} else if ( fb.jointMod == DECLAF_JOINTMOD_ORIGIN ) {
		////			mod = AF_JOINTMOD_ORIGIN;
		////		} else if ( fb.jointMod == DECLAF_JOINTMOD_BOTH ) {
		////			mod = AF_JOINTMOD_BOTH;
		////		} else {
		////			mod = AF_JOINTMOD_AXIS;
		////		}
		////		AddBody( body, joints, fb.jointName, mod );
		////	}
		////
		////	if ( fb.frictionDirection.ToVec3() != vec3_origin ) {
		////		body.SetFrictionDirection( fb.frictionDirection.ToVec3() );
		////	}
		////	if ( fb.contactMotorDirection.ToVec3() != vec3_origin ) {
		////		body.SetContactMotorDirection( fb.contactMotorDirection.ToVec3() );
		////	}
		////
		////	// update table to find the nearest articulated figure body for a joint of the skeletal model
		////	this.animator.GetJointList( fb.containedJoints, jointList );
		////	for( i = 0; i < jointList.Num(); i++ ) {
		////		if ( this.jointBody[ jointList[ i ] ] != -1 ) {
		////			gameLocal.Warning( "%s: joint '%s' is already contained by body '%s'",
		////						name.c_str(), this.animator.GetJointName( (jointHandle_t)jointList[i] ),
		////							this.physicsObj.GetBody( this.jointBody[ jointList[ i ] ] ).GetName().c_str() );
		////		}
		////		this.jointBody[ jointList[ i ] ] = id;
		////	}
		////
		return true;
	}
	
	/*
	================
	idAF::LoadConstraint
	================
	*/
	LoadConstraint(fc: idDeclAF_Constraint) :boolean {
		todoThrow ( );
	////	idAFBody *body1, *body2;
	////	var angles = new idAngles;
	////	idMat3 axis;	
	////
	////	body1 = this.physicsObj.GetBody( fc.body1 );
	////	body2 = this.physicsObj.GetBody( fc.body2 );
	////
	////	switch( fc.type ) {
	////		case DECLAF_CONSTRAINT_FIXED: {
	////			idAFConstraint_Fixed *c;
	////			c = static_cast<idAFConstraint_Fixed *>(this.physicsObj.GetConstraint( fc.name ));
	////			if ( c ) {
	////				c.SetBody1( body1 );
	////				c.SetBody2( body2 );
	////			}
	////			else {
	////				c = new idAFConstraint_Fixed( fc.name, body1, body2 );
	////				this.physicsObj.AddConstraint( c );
	////			}
	////			break;
	////		}
	////		case DECLAF_CONSTRAINT_BALLANDSOCKETJOINT: {
	////			idAFConstraint_BallAndSocketJoint *c;
	////			c = static_cast<idAFConstraint_BallAndSocketJoint *>(this.physicsObj.GetConstraint( fc.name ));
	////			if ( c ) {
	////				c.SetBody1( body1 );
	////				c.SetBody2( body2 );
	////			}
	////			else {
	////				c = new idAFConstraint_BallAndSocketJoint( fc.name, body1, body2 );
	////				this.physicsObj.AddConstraint( c );
	////			}
	////			c.SetAnchor( fc.anchor.ToVec3() );
	////			c.SetFriction( fc.friction );
	////			switch( fc.limit ) {
	////				case idDeclAF_Constraint::LIMIT_CONE: {
	////					c.SetConeLimit( fc.limitAxis.ToVec3(), fc.limitAngles[0], fc.shaft[0].ToVec3() );
	////					break;
	////				}
	////				case idDeclAF_Constraint::LIMIT_PYRAMID: {
	////					angles = fc.limitAxis.ToVec3().ToAngles();
	////					angles.roll = fc.limitAngles[2];
	////					axis = angles.ToMat3();
	////					c.SetPyramidLimit( axis[0], axis[1], fc.limitAngles[0], fc.limitAngles[1], fc.shaft[0].ToVec3() );
	////					break;
	////				}
	////				default: {
	////					c.SetNoLimit();
	////					break;
	////				}
	////			}
	////			break;
	////		}
	////		case DECLAF_CONSTRAINT_UNIVERSALJOINT: {
	////			idAFConstraint_UniversalJoint *c;
	////			c = static_cast<idAFConstraint_UniversalJoint *>(this.physicsObj.GetConstraint( fc.name ));
	////			if ( c ) {
	////				c.SetBody1( body1 );
	////				c.SetBody2( body2 );
	////			}
	////			else {
	////				c = new idAFConstraint_UniversalJoint( fc.name, body1, body2 );
	////				this.physicsObj.AddConstraint( c );
	////			}
	////			c.SetAnchor( fc.anchor.ToVec3() );
	////			c.SetShafts( fc.shaft[0].ToVec3(), fc.shaft[1].ToVec3() );
	////			c.SetFriction( fc.friction );
	////			switch( fc.limit ) {
	////				case idDeclAF_Constraint::LIMIT_CONE: {
	////					c.SetConeLimit( fc.limitAxis.ToVec3(), fc.limitAngles[0] );
	////					break;
	////				}
	////				case idDeclAF_Constraint::LIMIT_PYRAMID: {
	////					angles = fc.limitAxis.ToVec3().ToAngles();
	////					angles.roll = fc.limitAngles[2];
	////					axis = angles.ToMat3();
	////					c.SetPyramidLimit( axis[0], axis[1], fc.limitAngles[0], fc.limitAngles[1] );
	////					break;
	////				}
	////				default: {
	////					c.SetNoLimit();
	////					break;
	////				}
	////			}
	////			break;
	////		}
	////		case DECLAF_CONSTRAINT_HINGE: {
	////			idAFConstraint_Hinge *c;
	////			c = static_cast<idAFConstraint_Hinge *>(this.physicsObj.GetConstraint( fc.name ));
	////			if ( c ) {
	////				c.SetBody1( body1 );
	////				c.SetBody2( body2 );
	////			}
	////			else {
	////				c = new idAFConstraint_Hinge( fc.name, body1, body2 );
	////				this.physicsObj.AddConstraint( c );
	////			}
	////			c.SetAnchor( fc.anchor.ToVec3() );
	////			c.SetAxis( fc.axis.ToVec3() );
	////			c.SetFriction( fc.friction );
	////			switch( fc.limit ) {
	////				case idDeclAF_Constraint::LIMIT_CONE: {
	////					idVec3 left, up, axis, shaft;
	////					fc.axis.ToVec3().OrthogonalBasis( left, up );
	////					axis = left * idRotation( vec3_origin, fc.axis.ToVec3(), fc.limitAngles[0] );
	////					shaft = left * idRotation( vec3_origin, fc.axis.ToVec3(), fc.limitAngles[2] );
	////					c.SetLimit( axis, fc.limitAngles[1], shaft );
	////					break;
	////				}
	////				default: {
	////					c.SetNoLimit();
	////					break;
	////				}
	////			}
	////			break;
	////		}
	////		case DECLAF_CONSTRAINT_SLIDER: {
	////			idAFConstraint_Slider *c;
	////			c = static_cast<idAFConstraint_Slider *>(this.physicsObj.GetConstraint( fc.name ));
	////			if ( c ) {
	////				c.SetBody1( body1 );
	////				c.SetBody2( body2 );
	////			}
	////			else {
	////				c = new idAFConstraint_Slider( fc.name, body1, body2 );
	////				this.physicsObj.AddConstraint( c );
	////			}
	////			c.SetAxis( fc.axis.ToVec3() );
	////			break;
	////		}
	////		case DECLAF_CONSTRAINT_SPRING: {
	////			idAFConstraint_Spring *c;
	////			c = static_cast<idAFConstraint_Spring *>(this.physicsObj.GetConstraint( fc.name ));
	////			if ( c ) {
	////				c.SetBody1( body1 );
	////				c.SetBody2( body2 );
	////			}
	////			else {
	////				c = new idAFConstraint_Spring( fc.name, body1, body2 );
	////				this.physicsObj.AddConstraint( c );
	////			}
	////			c.SetAnchor( fc.anchor.ToVec3(), fc.anchor2.ToVec3() );
	////			c.SetSpring( fc.stretch, fc.compress, fc.damping, fc.restLength );
	////			c.SetLimit( fc.minLength, fc.maxLength );
	////			break;
	////		}
	////	}
		return true;
	}
	
	/*
	================
	GetJointTransform
	================
	*/
	static GetJointTransform ( model: any, frame: idJointMat[], jointName: string, origin: idVec3, axis: idMat3 ): boolean {
		var joint: jointHandle_t;

		joint = reinterpret_cast<idAnimator>( model ).GetJointHandle( jointName );
		if ( ( joint >= 0 ) && ( joint < reinterpret_cast<idAnimator>( model ).NumJoints ( ) ) ) {
			origin.opEquals( frame[joint].ToVec3 ( ) );
			axis.opEquals( frame[joint].ToMat3 ( ) );
			return true;
		} else {
			return false;
		}
	}

	/*
	================
	idAF::Load
	================
	*/
	Load(ent: idEntity, fileName: string): boolean {
		var /*int */i:number, j:number;
		var file: idDeclAF ;
		var modelDef: idDeclModelDef ;
		var model: idRenderModel ;
		var/*int */numJoints:number;
		var joints: idJointMat[] ;

		assert( ent );

		this.self = ent;
		this.physicsObj.SetSelf( this.self );

		if ( this.animator == null ) {
			gameLocal.Warning( "Couldn't load af '%s' for entity '%s' at (%s): NULL animator\n", this.name.c_str(), ent.name.c_str(), ent.GetPhysics().GetOrigin().ToString(0) );
			return false;
		}

		this.name.opEquals( fileName );
		this.name.StripFileExtension();

		file = static_cast<idDeclAF>(declManager.FindType( declType_t.DECL_AF, this.name.data ) );
		if ( !file ) {
			gameLocal.Warning( "Couldn't load af '%s' for entity '%s' at (%s)\n", this.name.c_str(), ent.name.c_str(), ent.GetPhysics().GetOrigin().ToString(0) );
			return false;
		}

		if ( file.bodies.Num() == 0 || file.bodies[0].jointName.data != "origin" ) {
			gameLocal.Warning( "idAF::Load: articulated figure '%s' for entity '%s' at (%s) has no body which modifies the origin joint.",
								this.name.c_str(), ent.name.c_str(), ent.GetPhysics().GetOrigin().ToString(0) );
			return false;
		}

		modelDef = this.animator.ModelDef();
		if (modelDef == null || modelDef.GetState() == declState_t.DS_DEFAULTED ) {
			gameLocal.Warning( "idAF::Load: articulated figure '%s' for entity '%s' at (%s) has no or defaulted modelDef '%s'",
				this.name.c_str(), ent.name.c_str(), ent.GetPhysics().GetOrigin().ToString(0), modelDef ? modelDef.GetName() : "" );
			return false;
		}

		model = this.animator.ModelHandle();
		if ( model == null || model.IsDefaultModel() ) {
			gameLocal.Warning( "idAF::Load: articulated figure '%s' for entity '%s' at (%s) has no or defaulted model '%s'",
				this.name.c_str(), ent.name.c_str(), ent.GetPhysics().GetOrigin().ToString(0), model ? model.Name() : "" );
			return false;
		}

		// get the modified animation
		this.modifiedAnim = this.animator.GetAnim_name( ARTICULATED_FIGURE_ANIM );
		if ( !this.modifiedAnim ) {
			gameLocal.Warning( "idAF::Load: articulated figure '%s' for entity '%s' at (%s) has no modified animation '%s'",
				this.name.c_str(), ent.name.c_str(), ent.GetPhysics().GetOrigin().ToString(0), ARTICULATED_FIGURE_ANIM );
			return false;
		}

		// create the animation frame used to setup the articulated figure
		numJoints = this.animator.NumJoints();
		joints = new Array<idJointMat>( numJoints );// ( idJointMat * )_alloca16( numJoints * sizeof( joints[0] ) );
		gameEdit.ANIM_CreateAnimFrame(model, this.animator.GetAnim_index( this.modifiedAnim ).MD5Anim( 0 ), numJoints, joints, 1, this.animator.ModelDef().GetVisualOffset(), this.animator.RemoveOrigin() );

		// set all vector positions from model joints
		file.Finish( idAF.GetJointTransform, joints, this.animator );

		// initialize articulated figure physics
		this.physicsObj.SetGravity( gameLocal.GetGravity() );
		this.physicsObj.SetClipMask( file.clipMask );
		this.physicsObj.SetDefaultFriction( file.defaultLinearFriction, file.defaultAngularFriction, file.defaultContactFriction );
		this.physicsObj.SetSuspendSpeed( file.suspendVelocity, file.suspendAcceleration );
		this.physicsObj.SetSuspendTolerance( file.noMoveTime, file.noMoveTranslation, file.noMoveRotation );
		this.physicsObj.SetSuspendTime( file.minMoveTime, file.maxMoveTime );
		this.physicsObj.SetSelfCollision( file.selfCollision );

		// clear the list with transforms from joints to bodies
		this.jointMods.SetNum( 0, false );

		// clear the joint to body conversion list
		this.jointBody.AssureSize( this.animator.NumJoints() );
		for ( i = 0; i < this.jointBody.Num(); i++ ) {
			this.jointBody[i] = -1;
		}

		// delete any bodies in the physicsObj that are no longer in the idDeclAF
		for ( i = 0; i < this.physicsObj.GetNumBodies(); i++ ) {
			var body: idAFBody= this.physicsObj.GetBody_id( i );
			for ( j = 0; j < file.bodies.Num(); j++ ) {
				if ( file.bodies[j].name.Icmp( body.GetName() ) == 0 ) {
					break;
				}
			}
			if (j >= file.bodies.Num()) {
				todoThrow ( );
				//this.physicsObj.DeleteBody( i );
				//i--;
			}
		}

		// delete any constraints in the physicsObj that are no longer in the idDeclAF
		for ( i = 0; i < this.physicsObj.GetNumConstraints(); i++ ) {
			var constraint: idAFConstraint= this.physicsObj.GetConstraint_id( i );
			for ( j = 0; j < file.constraints.Num(); j++ ) {
				if ( file.constraints[j].name.Icmp( constraint.GetName() ) == 0 &&
					<number>file.constraints[j].type == <number>constraint.GetType() ) {
					break;
				}
			}
			if ( j >= file.constraints.Num() ) {
				todoThrow();
				//this.physicsObj.DeleteConstraint( i );
				//i--;
			}
		}

		// load bodies from the file
		for ( i = 0; i < file.bodies.Num(); i++ ) {
			this.LoadBody( file.bodies[i], joints );
		}

		// load constraints from the file
		for ( i = 0; i < file.constraints.Num(); i++ ) {
			this.LoadConstraint( file.constraints[i] );
		}

		this.physicsObj.UpdateClipModels();

		// check if each joint is contained by a body
		for( i = 0; i < this.animator.NumJoints(); i++ ) {
			if ( this.jointBody[i] == -1 ) {
				gameLocal.Warning( "idAF::Load: articulated figure '%s' for entity '%s' at (%s) joint '%s' is not contained by a body",
					this.name.c_str(), this.self.name.c_str(), this.self.GetPhysics().GetOrigin().ToString(0), this.animator.GetJointName( <jointHandle_t>i ) );
			}
		}

		this.physicsObj.SetMass( file.totalMass );
		this.physicsObj.SetChanged();

		// disable the articulated figure for collision detection until activated
		this.physicsObj.DisableClip();

		this.isLoaded = true;

		return true;
	}

/////*
////================
////idAF::Start
////================
////*/
////void idAF::Start( ) {
////	if ( !IsLoaded() ) {
////		return;
////	}
////	// clear all animations
////	this.animator.ClearAllAnims( gameLocal.time, 0 );
////	this.animator.ClearAllJoints();
////	// switch to articulated figure physics
////	this.self.SetPhysics( &this.physicsObj );
////	// start the articulated figure physics simulation
////	this.physicsObj.EnableClip();
////	this.physicsObj.Activate();
////	isActive = true;
////}
////
/////*
////================
////idAF::TestSolid
////================
////*/
////bool idAF::TestSolid( ) const {
////	var/*int*/i:number;
////	idAFBody *body;
////	trace_t trace;
////	idStr str;
////	bool solid;
////
////	if ( !IsLoaded() ) {
////		return false;
////	}
////
////	if ( !af_testSolid.GetBool() ) {
////		return false;
////	}
////
////	solid = false;
////
////	for ( i = 0; i < this.physicsObj.GetNumBodies(); i++ ) {
////		body = this.physicsObj.GetBody( i );
////		if ( gameLocal.clip.Translation( trace, body.GetWorldOrigin(), body.GetWorldOrigin(), body.GetClipModel(), body.GetWorldAxis(), body.GetClipMask(), this.self ) ) {
////			float depth = idMath::Fabs( trace.c.point * trace.c.normal - trace.c.dist );
////
////			body.SetWorldOrigin( body.GetWorldOrigin() + trace.c.normal * ( depth + 8.0f ) );
////
////			gameLocal.DWarning( "%s: body '%s' stuck in %d (normal = %.2f %.2f %.2f, depth = %.2f)", this.self.name.c_str(),
////						body.GetName().c_str(), trace.c.contents, trace.c.normal.x, trace.c.normal.y, trace.c.normal.z, depth );
////			solid = true;
////
////		}
////	}
////	return solid;
////}
////
/////*
////================
////idAF::StartFromCurrentPose
////================
////*/
////void idAF::StartFromCurrentPose( int inheritVelocityTime ) {
////
////	if ( !IsLoaded() ) {
////		return;
////	}
////
////	// if the ragdoll should inherit velocity from the animation
////	if ( inheritVelocityTime > 0 ) {
////
////		// make sure the ragdoll is at rest
////		this.physicsObj.PutToRest();
////
////		// set the pose for some time back
////		SetupPose( this.self, gameLocal.time - inheritVelocityTime );
////
////		// change the pose for the current time and set velocities
////		ChangePose( this.self, gameLocal.time );
////	}
////	else {
////		// transform the articulated figure to reflect the current animation pose
////		SetupPose( this.self, gameLocal.time );
////	}
////
////	this.physicsObj.UpdateClipModels();
////
////	TestSolid();
////
////	Start();
////
////	UpdateAnimation();
////
////	// update the render entity origin and axis
////	this.self.UpdateModel();
////
////	// make sure the renderer gets the updated origin and axis
////	this.self.Present();
////}
////
/////*
////================
////idAF::Stop
////================
////*/
////void idAF::Stop( ) {
////	// disable the articulated figure for collision detection
////	this.physicsObj.UnlinkClip();
////	isActive = false;
////}
////
/////*
////================
////idAF::Rest
////================
////*/
////void idAF::Rest( ) {
////	this.physicsObj.PutToRest();
////}
////
/////*
////================
////idAF::SetConstraintPosition
////
////  Only moves constraints that bind the entity to another entity.
////================
////*/
////void idAF::SetConstraintPosition( const char *name, pos:idVec3 ) {
////	idAFConstraint *constraint;
////
////	constraint = GetPhysics().GetConstraint( this.name );
////
////	if ( !constraint ) {
////		gameLocal.Warning( "can't find a constraint with the name '%s'", this.name );
////		return;
////	}
////
////	if ( constraint.GetBody2() != NULL ) {
////		gameLocal.Warning( "constraint '%s' does not bind to another entity", this.name );
////		return;
////	}
////
////	switch( constraint.GetType() ) {
////		case CONSTRAINT_BALLANDSOCKETJOINT: {
////			idAFConstraint_BallAndSocketJoint *bs = static_cast<idAFConstraint_BallAndSocketJoint *>(constraint);
////			bs.Translate( pos - bs.GetAnchor() );
////			break;
////		}
////		case CONSTRAINT_UNIVERSALJOINT: {
////			idAFConstraint_UniversalJoint *uj = static_cast<idAFConstraint_UniversalJoint *>(constraint);
////			uj.Translate( pos - uj.GetAnchor() );
////			break;
////		}
////		case CONSTRAINT_HINGE: {
////			idAFConstraint_Hinge *hinge = static_cast<idAFConstraint_Hinge *>(constraint);
////			hinge.Translate( pos - hinge.GetAnchor() );
////			break;
////		}
////		default: {
////			gameLocal.Warning( "cannot set the constraint position for '%s'", this.name );
////			break;
////		}
////	}
////}
////
/////*
////================
////idAF::SaveState
////================
////*/
////void idAF::SaveState( idDict &args ) const {
////	var/*int*/i:number;
////	idAFBody *body;
////	idStr key, value;
////
////	for ( i = 0; i < this.jointMods.Num(); i++ ) {
////		body = this.physicsObj.GetBody( this.jointMods[i].bodyId );
////
////		key = "body " + body.GetName();
////		value = body.GetWorldOrigin().ToString( 8 );
////		value += " ";
////		value += body.GetWorldAxis().ToAngles().ToString( 8 );
////		args.Set( key, value );
////	}
////}

/*
================
idAF::LoadState
================
*/
	LoadState(args: idDict): void {
		todoThrow ( );
////	const idKeyValue *kv;
////	idStr name;
////	idAFBody *body;
////	idVec3 origin;
////	var angles = new idAngles;
////
////	kv = args.MatchPrefix( "body ", NULL );
////	while ( kv ) {
////
////		name = kv.GetKey();
////		name.Strip( "body " );
////		body = this.physicsObj.GetBody( name );
////		if ( body ) {
////			sscanf( kv.GetValue(), "%f %f %f %f %f %f", &origin.x, &origin.y, &origin.z, &angles.pitch, &angles.yaw, &angles.roll );
////			body.SetWorldOrigin( origin );
////			body.SetWorldAxis( angles.ToMat3() );
////		} else {
////			gameLocal.Warning("Unknown body part %s in articulated figure %s", name.c_str(), this.name.c_str()); 
////		}
////
////		kv = args.MatchPrefix( "body ", kv );
////	}
////
////	this.physicsObj.UpdateClipModels();
	}
////
/////*
////================
////idAF::AddBindConstraints
////================
////*/
////void idAF::AddBindConstraints( ) {
////	const idKeyValue *kv;
////	idStr name;
////	idAFBody *body;
////	idLexer lexer;
////	idToken type, bodyName, jointName;
////	idVec3 origin, renderOrigin;
////	idMat3 axis, renderAxis;
////
////	if ( !IsLoaded() ) {
////		return;
////	}
////
////	const idDict &args = this.self.spawnArgs;
////
////	// get the render position
////	origin = this.physicsObj.GetOrigin( 0 );
////	axis = this.physicsObj.GetAxis( 0 );
////	renderAxis = baseAxis.Transpose() * axis;
////	renderOrigin = origin - baseOrigin * renderAxis;
////
////	// parse all the bind constraints
////	for ( kv = args.MatchPrefix( "bindConstraint ", NULL ); kv; kv = args.MatchPrefix( "bindConstraint ", kv ) ) {
////		name = kv.GetKey();
////		name.Strip( "bindConstraint " );
////
////		lexer.LoadMemory( kv.GetValue(), kv.GetValue().Length(), kv.GetKey() );
////		lexer.ReadToken( &type );
////
////		lexer.ReadToken( &bodyName );
////		body = this.physicsObj.GetBody( bodyName );
////		if ( !body ) {
////			gameLocal.Warning( "idAF::AddBindConstraints: body '%s' not found on entity '%s'", bodyName.c_str(), this.self.name.c_str() );
////			lexer.FreeSource();
////			continue;
////		}
////
////		if ( type.Icmp( "fixed" ) == 0 ) {
////			idAFConstraint_Fixed *c;
////
////			c = new idAFConstraint_Fixed( name, body, NULL );
////			this.physicsObj.AddConstraint( c );
////		}
////		else if ( type.Icmp( "ballAndSocket" ) == 0 ) {
////			idAFConstraint_BallAndSocketJoint *c;
////
////			c = new idAFConstraint_BallAndSocketJoint( name, body, NULL );
////			this.physicsObj.AddConstraint( c );
////			lexer.ReadToken( &jointName );
////
////			jointHandle_t joint = this.animator.GetJointHandle( jointName );
////			if ( joint == jointHandle_t.INVALID_JOINT ) {
////				gameLocal.Warning( "idAF::AddBindConstraints: joint '%s' not found", jointName.c_str() );
////			}
////
////			this.animator.GetJointTransform( joint, gameLocal.time, origin, axis );
////			c.SetAnchor( renderOrigin + origin * renderAxis );
////		}
////		else if ( type.Icmp( "universal" ) == 0 ) {
////			idAFConstraint_UniversalJoint *c;
////
////			c = new idAFConstraint_UniversalJoint( name, body, NULL );
////			this.physicsObj.AddConstraint( c );
////			lexer.ReadToken( &jointName );
////
////			jointHandle_t joint = this.animator.GetJointHandle( jointName );
////			if ( joint == jointHandle_t.INVALID_JOINT ) {
////				gameLocal.Warning( "idAF::AddBindConstraints: joint '%s' not found", jointName.c_str() );
////			}
////			this.animator.GetJointTransform( joint, gameLocal.time, origin, axis );
////			c.SetAnchor( renderOrigin + origin * renderAxis );
////			c.SetShafts( idVec3( 0, 0, 1 ), idVec3( 0, 0, -1 ) );
////		}
////		else {
////			gameLocal.Warning( "idAF::AddBindConstraints: unknown constraint type '%s' on entity '%s'", type.c_str(), this.self.name.c_str() );
////		}
////
////		lexer.FreeSource();
////	}
////
////	hasBindConstraints = true;
////}
////
/////*
////================
////idAF::RemoveBindConstraints
////================
////*/
////void idAF::RemoveBindConstraints( ) {
////	const idKeyValue *kv;
////
////	if ( !IsLoaded() ) {
////		return;
////	}
////
////	const idDict &args = this.self.spawnArgs;
////	idStr name;
////
////	kv = args.MatchPrefix( "bindConstraint ", NULL );
////	while ( kv ) {
////		name = kv.GetKey();
////		name.Strip( "bindConstraint " );
////
////		if ( this.physicsObj.GetConstraint( name ) ) {
////            this.physicsObj.DeleteConstraint( name );
////		}
////
////		kv = args.MatchPrefix( "bindConstraint ", kv );
////	}
////
////	hasBindConstraints = false;
////}

};
////
////#endif /* !__GAME_AF_H__ */
