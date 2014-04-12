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
////
/*
===============================================================================

  idMultiModelAF

===============================================================================
*/

//CLASS_DECLARATION(idEntity, idMultiModelAF)
idMultiModelAF.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idMultiModelAF;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idMultiModelAF.prototype.GetType = function ( ): idTypeInfo {
	return ( idMultiModelAF.Type );
};

idMultiModelAF.eventCallbacks = [
];

idMultiModelAF.Type = new idTypeInfo( "idMultiModelAF", "idEntity",
	idMultiModelAF.eventCallbacks, idMultiModelAF.CreateInstance, idMultiModelAF.prototype.Spawn,
	idMultiModelAF.prototype.Save, idMultiModelAF.prototype.Restore );

//END_CLASS


/*
===============================================================================

  idChain

===============================================================================
*/

//CLASS_DECLARATION( idMultiModelAF, idChain )
idChain.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idChain;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idChain.prototype.GetType = function ( ): idTypeInfo {
	return ( idChain.Type );
};

idChain.eventCallbacks = [
];

idChain.Type = new idTypeInfo("idChain", "idMultiModelAF",
	idChain.eventCallbacks, idChain.CreateInstance, idChain.prototype.Spawn,
	idChain.prototype.Save, idChain.prototype.Restore );

/*
===============================================================================

  idAFAttachment

===============================================================================
*/

//CLASS_DECLARATION( idAnimatedEntity, idAFAttachment )
idAFAttachment.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idAFAttachment;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idAFAttachment.prototype.GetType = function ( ): idTypeInfo {
	return ( idAFAttachment.Type );
};

idAFAttachment.eventCallbacks = [
];

idAFAttachment.Type = new idTypeInfo("idAFAttachment", "idAnimatedEntity",
	idAFAttachment.eventCallbacks, idAFAttachment.CreateInstance, idAFAttachment.prototype.Spawn,
	idAFAttachment.prototype.Save, idAFAttachment.prototype.Restore );

/*
===============================================================================

  idAFEntity_Base

===============================================================================
*/

var EV_SetConstraintPosition = new idEventDef( "SetConstraintPosition", "sv" );

////CLASS_DECLARATION( idAnimatedEntity, idAFEntity_Base )
idAFEntity_Base.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idAFEntity_Base;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idAFEntity_Base.prototype.GetType = function ( ): idTypeInfo {
	return ( idAFEntity_Base.Type );
};

idAFEntity_Base.eventCallbacks = [
	EVENT(EV_SetConstraintPosition, idAFEntity_Base.prototype.Event_SetConstraintPosition)
];

idAFEntity_Base.Type = new idTypeInfo("idAFEntity_Base", "idAnimatedEntity",
	idAFEntity_Base.eventCallbacks, idAFEntity_Base.CreateInstance, idAFEntity_Base.prototype.Spawn,
	idAFEntity_Base.prototype.Save, idAFEntity_Base.prototype.Restore );


var BOUNCE_SOUND_MIN_VELOCITY	= 80.0;
var BOUNCE_SOUND_MAX_VELOCITY	= 200.0;
////
/*
===============================================================================

idAFEntity_Gibbable

===============================================================================
*/

var EV_Gib = new idEventDef(  "gib", "s" );
var EV_Gibbed = new idEventDef(  "<gibbed>" );
////
////CLASS_DECLARATION( idAFEntity_Base, idAFEntity_Gibbable )
idAFEntity_Gibbable.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idAFEntity_Gibbable;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idAFEntity_Gibbable.prototype.GetType = function ( ): idTypeInfo {
	return ( idAFEntity_Gibbable.Type );
};

idAFEntity_Gibbable.eventCallbacks = [
	EVENT( EV_Gib,		idAFEntity_Gibbable.prototype.Event_Gib),
	EVENT(EV_Gibbed, idAFEntity_Base.prototype.Event_Remove)
];

idAFEntity_Gibbable.Type = new idTypeInfo("idAFEntity_Gibbable", "idAFEntity_Base",
	idAFEntity_Gibbable.eventCallbacks, idAFEntity_Gibbable.CreateInstance, idAFEntity_Gibbable.prototype.Spawn,
	idAFEntity_Gibbable.prototype.Save, idAFEntity_Gibbable.prototype.Restore );

////
/////*
////===============================================================================
////
////  idAFEntity_Generic
////
////===============================================================================
////*/
////
//CLASS_DECLARATION( idAFEntity_Gibbable, idAFEntity_Generic )
idAFEntity_Generic.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idAFEntity_Generic;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idAFEntity_Generic.prototype.GetType = function ( ): idTypeInfo {
	return ( idAFEntity_Generic.Type );
};

idAFEntity_Generic.eventCallbacks = [
	EVENT(EV_Activate, idAFEntity_Generic.prototype.Event_Activate)
];

idAFEntity_Generic.Type = new idTypeInfo("idAFEntity_Generic", "idAFEntity_Gibbable",
	idAFEntity_Generic.eventCallbacks, idAFEntity_Generic.CreateInstance, idAFEntity_Generic.prototype.Spawn,
	idAFEntity_Generic.prototype.Save, idAFEntity_Generic.prototype.Restore );

//	
//END_CLASS
////
/////*
////===============================================================================
////
////  idAFEntity_WithAttachedHead
////
////===============================================================================
////*/

//CLASS_DECLARATION( idAFEntity_Gibbable, idAFEntity_WithAttachedHead )
idAFEntity_WithAttachedHead.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idAFEntity_WithAttachedHead;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idAFEntity_WithAttachedHead.prototype.GetType = function ( ): idTypeInfo {
	return ( idAFEntity_WithAttachedHead.Type );
};

idAFEntity_WithAttachedHead.eventCallbacks = [
	EVENT(EV_Gib, idAFEntity_WithAttachedHead.prototype.Event_Gib),
	EVENT(EV_Activate, idAFEntity_WithAttachedHead.prototype.Event_Activate)
];

idAFEntity_WithAttachedHead.Type = new idTypeInfo("idAFEntity_WithAttachedHead", "idAFEntity_Gibbable",
	idAFEntity_WithAttachedHead.eventCallbacks, idAFEntity_WithAttachedHead.CreateInstance, idAFEntity_WithAttachedHead.prototype.Spawn,
	idAFEntity_WithAttachedHead.prototype.Save, idAFEntity_WithAttachedHead.prototype.Restore );


////
/////*
////===============================================================================
////
////  idAFEntity_Vehicle
////
////===============================================================================
////*/
////
////CLASS_DECLARATION( idAFEntity_Base, idAFEntity_Vehicle )
idAFEntity_Vehicle.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idAFEntity_Vehicle;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idAFEntity_Vehicle.prototype.GetType = function ( ): idTypeInfo {
	return ( idAFEntity_Vehicle.Type );
};

idAFEntity_Vehicle.eventCallbacks = [
];

idAFEntity_Vehicle.Type = new idTypeInfo("idAFEntity_Vehicle", "idAFEntity_Base",
	idAFEntity_Vehicle.eventCallbacks, idAFEntity_Vehicle.CreateInstance, idAFEntity_Vehicle.prototype.Spawn,
	idAFEntity_Vehicle.prototype.Save, idAFEntity_Vehicle.prototype.Restore );

////END_CLASS
////
////
/////*
////===============================================================================
////
////  idAFEntity_VehicleSimple
////
////===============================================================================
////*/
////
////CLASS_DECLARATION( idAFEntity_Vehicle, idAFEntity_VehicleSimple )
idAFEntity_VehicleSimple.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idAFEntity_VehicleSimple;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idAFEntity_VehicleSimple.prototype.GetType = function ( ): idTypeInfo {
	return ( idAFEntity_VehicleSimple.Type );
};

idAFEntity_VehicleSimple.eventCallbacks = [
];

idAFEntity_VehicleSimple.Type = new idTypeInfo("idAFEntity_VehicleSimple", "idAFEntity_Vehicle",
	idAFEntity_VehicleSimple.eventCallbacks, idAFEntity_VehicleSimple.CreateInstance, idAFEntity_VehicleSimple.prototype.Spawn,
	idAFEntity_VehicleSimple.prototype.Save, idAFEntity_VehicleSimple.prototype.Restore );


////END_CLASS
////
/////*
////===============================================================================
////
////  idAFEntity_VehicleFourWheels
////
////===============================================================================
////*/
////
////CLASS_DECLARATION( idAFEntity_Vehicle, idAFEntity_VehicleFourWheels )
idAFEntity_VehicleFourWheels.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idAFEntity_VehicleFourWheels;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idAFEntity_VehicleFourWheels.prototype.GetType = function ( ): idTypeInfo {
	return ( idAFEntity_VehicleFourWheels.Type );
};

idAFEntity_VehicleFourWheels.eventCallbacks = [
];

idAFEntity_VehicleFourWheels.Type = new idTypeInfo("idAFEntity_VehicleFourWheels", "idAFEntity_Vehicle",
	idAFEntity_VehicleFourWheels.eventCallbacks, idAFEntity_VehicleFourWheels.CreateInstance, idAFEntity_VehicleFourWheels.prototype.Spawn,
	idAFEntity_VehicleFourWheels.prototype.Save, idAFEntity_VehicleFourWheels.prototype.Restore );

////END_CLASS
////
////
////
/////*
////===============================================================================
////
////  idAFEntity_VehicleSixWheels
////
////===============================================================================
////*/
////
////CLASS_DECLARATION( idAFEntity_Vehicle, idAFEntity_VehicleSixWheels )
idAFEntity_VehicleSixWheels.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idAFEntity_VehicleSixWheels;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idAFEntity_VehicleSixWheels.prototype.GetType = function ( ): idTypeInfo {
	return ( idAFEntity_VehicleSixWheels.Type );
};

idAFEntity_VehicleSixWheels.eventCallbacks = [
];

idAFEntity_VehicleSixWheels.Type = new idTypeInfo("idAFEntity_VehicleSixWheels", "idAFEntity_Vehicle",
	idAFEntity_VehicleSixWheels.eventCallbacks, idAFEntity_VehicleSixWheels.CreateInstance, idAFEntity_VehicleSixWheels.prototype.Spawn,
	idAFEntity_VehicleSixWheels.prototype.Save, idAFEntity_VehicleSixWheels.prototype.Restore );

////END_CLASS
////
////
/////*
////===============================================================================
////
////  idAFEntity_SteamPipe
////
////===============================================================================
////*/
////
////CLASS_DECLARATION( idAFEntity_Base, idAFEntity_SteamPipe )
idAFEntity_SteamPipe.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idAFEntity_SteamPipe;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idAFEntity_SteamPipe.prototype.GetType = function ( ): idTypeInfo {
	return ( idAFEntity_SteamPipe.Type );
};

idAFEntity_SteamPipe.eventCallbacks = [
];

idAFEntity_SteamPipe.Type = new idTypeInfo("idAFEntity_SteamPipe", "idAFEntity_Base",
	idAFEntity_SteamPipe.eventCallbacks, idAFEntity_SteamPipe.CreateInstance, idAFEntity_SteamPipe.prototype.Spawn,
	idAFEntity_SteamPipe.prototype.Save, idAFEntity_SteamPipe.prototype.Restore );

////END_CLASS
////
/*
===============================================================================

  idAFEntity_ClawFourFingers

===============================================================================
*/

var EV_SetFingerAngle = new idEventDef(  "setFingerAngle", "f" );
var EV_StopFingers = new idEventDef(  "stopFingers" );
////
////CLASS_DECLARATION( idAFEntity_Base, idAFEntity_ClawFourFingers )
idAFEntity_ClawFourFingers.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idAFEntity_ClawFourFingers;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idAFEntity_ClawFourFingers.prototype.GetType = function ( ): idTypeInfo {
	return ( idAFEntity_ClawFourFingers.Type );
};

idAFEntity_ClawFourFingers.eventCallbacks = [
	EVENT(EV_SetFingerAngle, idAFEntity_ClawFourFingers.prototype.Event_SetFingerAngle),
	EVENT(EV_StopFingers, idAFEntity_ClawFourFingers.prototype.Event_StopFingers)
];

idAFEntity_ClawFourFingers.Type = new idTypeInfo("idAFEntity_ClawFourFingers", "idAFEntity_Base",
	idAFEntity_ClawFourFingers.eventCallbacks, idAFEntity_ClawFourFingers.CreateInstance, idAFEntity_ClawFourFingers.prototype.Spawn,
	idAFEntity_ClawFourFingers.prototype.Save, idAFEntity_ClawFourFingers.prototype.Restore );

////	
////	
////END_CLASS
////
////static const char *clawConstraintNames[] = {
////	"claw1", "claw2", "claw3", "claw4"
////};
////
////
/////*
////===============================================================================
////
////  editor support routines
////
////===============================================================================
////*/
////
////
/////*
////================
////idGameEdit::AF_SpawnEntity
////================
////*/
////bool idGameEdit::AF_SpawnEntity( const char *fileName ) {
////	idDict args;
////	idPlayer *player;
////	idAFEntity_Generic *ent;
////	const idDeclAF *af;
////	idVec3 org;
////	float yaw;
////
////	player = gameLocal.GetLocalPlayer();
////	if ( !player || !gameLocal.CheatsOk( false ) ) {
////		return false;
////	}
////
////	af = static_cast<const idDeclAF *>( declManager.FindType( DECL_AF, fileName ) );
////	if ( !af ) {
////		return false;
////	}
////
////	yaw = player.viewAngles.yaw;
////	args.Set( "angle", va( "%f", yaw + 180 ) );
////	org = player.GetPhysics().GetOrigin() + idAngles( 0, yaw, 0 ).ToForward() * 80 + idVec3( 0, 0, 1 );
////	args.Set( "origin", org.ToString() );
////	args.Set( "spawnclass", "idAFEntity_Generic" );
////	if ( af.model[0] ) {
////		args.Set( "model", af.model.c_str() );
////	} else {
////		args.Set( "model", fileName );
////	}
////	if ( af.skin[0] ) {
////		args.Set( "skin", af.skin.c_str() );
////	}
////	args.Set( "articulatedFigure", fileName );
////	args.Set( "nodrop", "1" );
////	ent = static_cast<idAFEntity_Generic *>(gameLocal.SpawnEntityType( idAFEntity_Generic::Type, &args));
////
////	// always update this entity
////	ent.BecomeActive( TH_THINK );
////	ent.KeepRunningPhysics();
////	ent.fl.forcePhysicsUpdate = true;
////
////	player.dragEntity.SetSelected( ent );
////
////	return true;
////}
////
/////*
////================
////idGameEdit::AF_UpdateEntities
////================
////*/
////void idGameEdit::AF_UpdateEntities( const char *fileName ) {
////	var ent:idEntity
////	idAFEntity_Base *af;
////	idStr name;
////
////	name = fileName;
////	name.StripFileExtension();
////
////	// reload any idAFEntity_Generic which uses the given articulated figure file
////	for( ent = gameLocal.spawnedEntities.Next(); ent != NULL; ent = ent.spawnNode.Next() ) {
////		if ( ent.IsType( idAFEntity_Base::Type ) ) {
////			af = static_cast<idAFEntity_Base *>(ent);
////			if ( name.Icmp( af.GetAFName() ) == 0 ) {
////				af.LoadAF();
////				af.GetAFPhysics().PutToRest();
////			}
////		}
////	}
////}
////
/////*
////================
////idGameEdit::AF_UndoChanges
////================
////*/
////void idGameEdit::AF_UndoChanges( ) {
////	int i, c;
////	var ent:idEntity
////	idAFEntity_Base *af;
////	idDeclAF *decl;
////
////	c = declManager.GetNumDecls( DECL_AF );
////	for ( i = 0; i < c; i++ ) {
////		decl = static_cast<idDeclAF *>( const_cast<idDecl *>( declManager.DeclByIndex( DECL_AF, i, false ) ) );
////		if ( !decl.modified ) {
////			continue;
////		}
////
////		decl.Invalidate();
////		declManager.FindType( DECL_AF, decl.GetName() );
////
////		// reload all AF entities using the file
////		for( ent = gameLocal.spawnedEntities.Next(); ent != NULL; ent = ent.spawnNode.Next() ) {
////			if ( ent.IsType( idAFEntity_Base::Type ) ) {
////				af = static_cast<idAFEntity_Base *>(ent);
////				if ( idStr::Icmp( decl.GetName(), af.GetAFName() ) == 0 ) {
////					af.LoadAF();
////				}
////			}
////		}
////	}
////}
////
/////*
////================
////GetJointTransform
////================
////*/
////typedef struct {
////	renderEntity_t *ent;
////	const idMD5Joint *joints;
////} jointTransformData_t;
////
////static bool GetJointTransform( void *model, const idJointMat *frame, const char *jointName, idVec3 &origin, idMat3 &axis ) {
////	var/*int*/i:number;
////	jointTransformData_t *data = reinterpret_cast<jointTransformData_t *>(model);
////
////	for ( i = 0; i < data.ent.numJoints; i++ ) {
////		if ( data.joints[i].name.Icmp( jointName ) == 0 ) {
////			break;
////		}
////	}
////	if ( i >= data.ent.numJoints ) {
////		return false;
////	}
////	origin = frame[i].ToVec3();
////	axis = frame[i].ToMat3();
////	return true;
////}
////
/////*
////================
////GetArgString
////================
////*/
////static const char *GetArgString( const idDict &args, const idDict *defArgs, const char *key ) {
////	const char *s;
////
////	s = args.GetString( key );
////	if ( !s[0] && defArgs ) {
////		s = defArgs.GetString( key );
////	}
////	return s;
////}
////
/////*
////================
////idGameEdit::AF_CreateMesh
////================
////*/
////idRenderModel *idGameEdit::AF_CreateMesh( const idDict &args, idVec3 &meshOrigin, idMat3 &meshAxis, bool &poseIsSet ) {
////	int i, jointNum;
////	const idDeclAF *af;
////	const idDeclAF_Body *fb = NULL;
////	renderEntity_t ent;
////	idVec3 origin, *bodyOrigin, *newBodyOrigin, *modifiedOrigin;
////	idMat3 axis, *bodyAxis, *newBodyAxis, *modifiedAxis;
////	declAFJointMod_t *jointMod;
////	idAngles angles;
////	const idDict *defArgs;
////	const idKeyValue *arg;
////	idStr name;
////	jointTransformData_t data;
////	const char *classname, *afName, *modelName;
////	idRenderModel *md5;
////	const idDeclModelDef *modelDef;
////	const idMD5Anim *MD5anim;
////	const idMD5Joint *MD5joint;
////	const idMD5Joint *MD5joints;
////	int numMD5joints;
////	idJointMat *originalJoints;
////	int parentNum;
////
////	poseIsSet = false;
////	meshOrigin.Zero();
////	meshAxis.Identity();
////
////	classname = args.GetString( "classname" );
////	defArgs = gameLocal.FindEntityDefDict( classname );
////
////	// get the articulated figure
////	afName = GetArgString( args, defArgs, "articulatedFigure" );
////	af = static_cast<const idDeclAF *>( declManager.FindType( DECL_AF, afName ) );
////	if ( !af ) {
////		return NULL;
////	}
////
////	// get the md5 model
////	modelName = GetArgString( args, defArgs, "model" );
////	modelDef = static_cast< const idDeclModelDef *>( declManager.FindType( DECL_MODELDEF, modelName, false ) );
////	if ( !modelDef ) {
////		return NULL;
////	}
////
////	// make sure model hasn't been purged
////	if ( modelDef.ModelHandle() && !modelDef.ModelHandle().IsLoaded() ) {
////		modelDef.ModelHandle().LoadModel();
////	}
////
////	// get the md5
////	md5 = modelDef.ModelHandle();
////	if ( !md5 || md5.IsDefaultModel() ) {
////		return NULL;
////	}
////
////	// get the articulated figure pose anim
////	int animNum = modelDef.GetAnim( "af_pose" );
////	if ( !animNum ) {
////		return NULL;
////	}
////	const idAnim *anim = modelDef.GetAnim( animNum );
////	if ( !anim ) {
////		return NULL;
////	}
////	MD5anim = anim.MD5Anim( 0 );
////	MD5joints = md5.GetJoints();
////	numMD5joints = md5.NumJoints();
////
////	// setup a render entity
////	memset( &ent, 0, sizeof( ent ) );
////	ent.customSkin = modelDef.GetSkin();
////	ent.bounds.Clear();
////	ent.numJoints = numMD5joints;
////	ent.joints = ( idJointMat * )_alloca16( ent.numJoints * sizeof( *ent.joints ) );
////
////	// create animation from of the af_pose
////	ANIM_CreateAnimFrame( md5, MD5anim, ent.numJoints, ent.joints, 1, modelDef.GetVisualOffset(), false );
////
////	// buffers to store the initial origin and axis for each body
////	bodyOrigin = (idVec3 *) _alloca16( af.bodies.Num() * sizeof( idVec3 ) );
////	bodyAxis = (idMat3 *) _alloca16( af.bodies.Num() * sizeof( idMat3 ) );
////	newBodyOrigin = (idVec3 *) _alloca16( af.bodies.Num() * sizeof( idVec3 ) );
////	newBodyAxis = (idMat3 *) _alloca16( af.bodies.Num() * sizeof( idMat3 ) );
////
////	// finish the AF positions
////	data.ent = &ent;
////	data.joints = MD5joints;
////	af.Finish( GetJointTransform, ent.joints, &data );
////
////	// get the initial origin and axis for each AF body
////	for ( i = 0; i < af.bodies.Num(); i++ ) {
////		fb = af.bodies[i];
////
////		if ( fb.modelType == TRM_BONE ) {
////			// axis of bone trace model
////			axis[2] = fb.v2.ToVec3() - fb.v1.ToVec3();
////			axis[2].Normalize();
////			axis[2].NormalVectors( axis[0], axis[1] );
////			axis[1] = -axis[1];
////		} else {
////			axis = fb.angles.ToMat3();
////		}
////
////		newBodyOrigin[i] = bodyOrigin[i] = fb.origin.ToVec3();
////		newBodyAxis[i] = bodyAxis[i] = axis;
////	}
////
////	// get any new body transforms stored in the key/value pairs
////	for ( arg = args.MatchPrefix( "body ", NULL ); arg; arg = args.MatchPrefix( "body ", arg ) ) {
////		name = arg.GetKey();
////		name.Strip( "body " );
////		for ( i = 0; i < af.bodies.Num(); i++ ) {
////			fb = af.bodies[i];
////			if ( fb.name.Icmp( name ) == 0 ) {
////				break;
////			}
////		}
////		if ( i >= af.bodies.Num() ) {
////			continue;
////		}
////		sscanf( arg.GetValue(), "%f %f %f %f %f %f", &origin.x, &origin.y, &origin.z, &angles.pitch, &angles.yaw, &angles.roll );
////
////		if ( fb.jointName.Icmp( "origin" ) == 0 ) {
////			meshAxis = bodyAxis[i].Transpose() * angles.ToMat3();
////			meshOrigin = origin - bodyOrigin[i] * meshAxis;
////			poseIsSet = true;
////		} else {
////			newBodyOrigin[i] = origin;
////			newBodyAxis[i] = angles.ToMat3();
////		}
////	}
////
////	// save the original joints
////	originalJoints = ( idJointMat * )_alloca16( numMD5joints * sizeof( originalJoints[0] ) );
////	memcpy( originalJoints, ent.joints, numMD5joints * sizeof( originalJoints[0] ) );
////
////	// buffer to store the joint mods
////	jointMod = (declAFJointMod_t *) _alloca16( numMD5joints * sizeof( declAFJointMod_t ) );
////	memset( jointMod, -1, numMD5joints * sizeof( declAFJointMod_t ) );
////	modifiedOrigin = (idVec3 *) _alloca16( numMD5joints * sizeof( idVec3 ) );
////	memset( modifiedOrigin, 0, numMD5joints * sizeof( idVec3 ) );
////	modifiedAxis = (idMat3 *) _alloca16( numMD5joints * sizeof( idMat3 ) );
////	memset( modifiedAxis, 0, numMD5joints * sizeof( idMat3 ) );
////
////	// get all the joint modifications
////	for ( i = 0; i < af.bodies.Num(); i++ ) {
////		fb = af.bodies[i];
////
////		if ( fb.jointName.Icmp( "origin" ) == 0 ) {
////			continue;
////		}
////
////		for ( jointNum = 0; jointNum < numMD5joints; jointNum++ ) {
////			if ( MD5joints[jointNum].name.Icmp( fb.jointName ) == 0 ) {
////				break;
////			}
////		}
////
////		if ( jointNum >= 0 && jointNum < ent.numJoints ) {
////			jointMod[ jointNum ] = fb.jointMod;
////			modifiedAxis[ jointNum ] = ( bodyAxis[i] * originalJoints[jointNum].ToMat3().Transpose() ).Transpose() * ( newBodyAxis[i] * meshAxis.Transpose() );
////			// FIXME: calculate correct modifiedOrigin
////			modifiedOrigin[ jointNum ] = originalJoints[ jointNum ].ToVec3();
//// 		}
////	}
////
////	// apply joint modifications to the skeleton
////	MD5joint = MD5joints + 1;
////	for( i = 1; i < numMD5joints; i++, MD5joint++ ) {
////
////		parentNum = MD5joint.parent - MD5joints;
////		idMat3 parentAxis = originalJoints[ parentNum ].ToMat3();
////		idMat3 localm = originalJoints[i].ToMat3() * parentAxis.Transpose();
////		idVec3 localt = ( originalJoints[i].ToVec3() - originalJoints[ parentNum ].ToVec3() ) * parentAxis.Transpose();
////
////		switch( jointMod[i] ) {
////			case DECLAF_JOINTMOD_ORIGIN: {
////				ent.joints[ i ].SetRotation( localm * ent.joints[ parentNum ].ToMat3() );
////				ent.joints[ i ].SetTranslation( modifiedOrigin[ i ] );
////				break;
////			}
////			case DECLAF_JOINTMOD_AXIS: {
////				ent.joints[ i ].SetRotation( modifiedAxis[ i ] );
////				ent.joints[ i ].SetTranslation( ent.joints[ parentNum ].ToVec3() + localt * ent.joints[ parentNum ].ToMat3() );
////				break;
////			}
////			case DECLAF_JOINTMOD_BOTH: {
////				ent.joints[ i ].SetRotation( modifiedAxis[ i ] );
////				ent.joints[ i ].SetTranslation( modifiedOrigin[ i ] );
////				break;
////			}
////			default: {
////				ent.joints[ i ].SetRotation( localm * ent.joints[ parentNum ].ToMat3() );
////				ent.joints[ i ].SetTranslation( ent.joints[ parentNum ].ToVec3() + localt * ent.joints[ parentNum ].ToMat3() );
////				break;
////			}
////		}
////	}
////
////	// instantiate a mesh using the joint information from the render entity
////	return md5.InstantiateDynamicModel( &ent, NULL, NULL );
////}
