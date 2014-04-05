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

/*
===============================================================================

	idEntity

===============================================================================
*/

// overridable events
var EV_PostSpawn = new idEventDef( "<postspawn>", null );
var EV_FindTargets = new idEventDef( "<findTargets>", null );
var EV_Touch = new idEventDef( "<touch>", "et" );
var EV_GetName = new idEventDef( "getName", null, 's' );
var EV_SetName = new idEventDef( "setName", "s" );
var EV_Activate = new idEventDef( "activate", "e" );
var EV_ActivateTargets = new idEventDef( "activateTargets", "e" );
var EV_NumTargets = new idEventDef( "numTargets", null, 'f' );
var EV_GetTarget = new idEventDef( "getTarget", "f", 'e' );
var EV_RandomTarget = new idEventDef( "randomTarget", "s", 'e' );
var EV_Bind = new idEventDef( "bind", "e" );
var EV_BindPosition = new idEventDef( "bindPosition", "e" );
var EV_BindToJoint = new idEventDef( "bindToJoint", "esf" );
var EV_Unbind = new idEventDef( "unbind", null );
var EV_RemoveBinds = new idEventDef( "removeBinds" );
var EV_SpawnBind = new idEventDef( "<spawnbind>", null );
var EV_SetOwner = new idEventDef( "setOwner", "e" );
var EV_SetModel = new idEventDef( "setModel", "s" );
var EV_SetSkin = new idEventDef( "setSkin", "s" );
var EV_GetWorldOrigin = new idEventDef( "getWorldOrigin", null, 'v' );
var EV_SetWorldOrigin = new idEventDef( "setWorldOrigin", "v" );
var EV_GetOrigin = new idEventDef( "getOrigin", null, 'v' );
var EV_SetOrigin = new idEventDef( "setOrigin", "v" );
var EV_GetAngles = new idEventDef( "getAngles", null, 'v' );
var EV_SetAngles = new idEventDef( "setAngles", "v" );
var EV_GetLinearVelocity = new idEventDef( "getLinearVelocity", null, 'v' );
var EV_SetLinearVelocity = new idEventDef( "setLinearVelocity", "v" );
var EV_GetAngularVelocity = new idEventDef( "getAngularVelocity", null, 'v' );
var EV_SetAngularVelocity = new idEventDef( "setAngularVelocity", "v" );
var EV_GetSize = new idEventDef( "getSize", null, 'v' );
var EV_SetSize = new idEventDef( "setSize", "vv" );
var EV_GetMins = new idEventDef( "getMins", null, 'v' );
var EV_GetMaxs = new idEventDef( "getMaxs", null, 'v' );
var EV_IsHidden = new idEventDef( "isHidden", null, 'd' );
var EV_Hide = new idEventDef( "hide", null );
var EV_Show = new idEventDef( "show", null );
var EV_Touches = new idEventDef( "touches", "E", 'd' );
var EV_ClearSignal = new idEventDef( "clearSignal", "d" );
var EV_GetShaderParm = new idEventDef( "getShaderParm", "d", 'f' );
var EV_SetShaderParm = new idEventDef( "setShaderParm", "df" );
var EV_SetShaderParms = new idEventDef( "setShaderParms", "ffff" );
var EV_SetColor = new idEventDef( "setColor", "fff" );
var EV_GetColor = new idEventDef( "getColor", null, 'v' );
var EV_CacheSoundShader = new idEventDef( "cacheSoundShader", "s" );
var EV_StartSoundShader = new idEventDef( "startSoundShader", "sd", 'f' );
var EV_StartSound = new idEventDef( "startSound", "sdd", 'f' );
var EV_StopSound = new idEventDef( "stopSound", "dd" );
var EV_FadeSound = new idEventDef( "fadeSound", "dff" );
var EV_SetGuiParm = new idEventDef( "setGuiParm", "ss" );
var EV_SetGuiFloat = new idEventDef( "setGuiFloat", "sf" );
var EV_GetNextKey = new idEventDef( "getNextKey", "ss", 's' );
var EV_SetKey = new idEventDef( "setKey", "ss" );
var EV_GetKey = new idEventDef( "getKey", "s", 's' );
var EV_GetIntKey = new idEventDef( "getIntKey", "s", 'f' );
var EV_GetFloatKey = new idEventDef( "getFloatKey", "s", 'f' );
var EV_GetVectorKey = new idEventDef( "getVectorKey", "s", 'v' );
var EV_GetEntityKey = new idEventDef( "getEntityKey", "s", 'e' );
var EV_RestorePosition = new idEventDef( "restorePosition" );
var EV_UpdateCameraTarget = new idEventDef( "<updateCameraTarget>", null );
var EV_DistanceTo = new idEventDef( "distanceTo", "E", 'f' );
var EV_DistanceToPoint = new idEventDef( "distanceToPoint", "v", 'f' );
var EV_StartFx = new idEventDef( "startFx", "s" );
var EV_HasFunction = new idEventDef( "hasFunction", "s", 'd' );
var EV_CallFunction = new idEventDef( "callFunction", "s" );
var EV_SetNeverDormant = new idEventDef( "setNeverDormant", "d" );

//ABSTRACT_DECLARATION(idClass, idEntity)
idEntity.CreateInstance = function ( ): idClass {
	gameLocal.Error( "Cannot instanciate abstract class %s.", idEntity );
	return null;
};

idEntity.prototype.GetType = function ( ): idTypeInfo {
	return ( idEntity.Type );
};

idEntity.eventCallbacks = [
	EVENT(EV_GetName, idEntity.prototype.Event_GetName),
	EVENT(EV_SetName, idEntity.prototype.Event_SetName),
	EVENT(EV_FindTargets, idEntity.prototype.Event_FindTargets),
	EVENT(EV_ActivateTargets, idEntity.prototype.Event_ActivateTargets),
	EVENT(EV_NumTargets, idEntity.prototype.Event_NumTargets),
	EVENT(EV_GetTarget, idEntity.prototype.Event_GetTarget),
	EVENT(EV_RandomTarget, idEntity.prototype.Event_RandomTarget),
	EVENT(EV_BindToJoint, idEntity.prototype.Event_BindToJoint),
	EVENT(EV_RemoveBinds, idEntity.prototype.Event_RemoveBinds),
	EVENT(EV_Bind, idEntity.prototype.Event_Bind),
	EVENT(EV_BindPosition, idEntity.prototype.Event_BindPosition),
	EVENT(EV_Unbind, idEntity.prototype.Event_Unbind),
	EVENT(EV_SpawnBind, idEntity.prototype.Event_SpawnBind),
	EVENT(EV_SetOwner, idEntity.prototype.Event_SetOwner),
	EVENT(EV_SetModel, idEntity.prototype.Event_SetModel),
	EVENT(EV_SetSkin, idEntity.prototype.Event_SetSkin),
	EVENT(EV_GetShaderParm, idEntity.prototype.Event_GetShaderParm),
	EVENT(EV_SetShaderParm, idEntity.prototype.Event_SetShaderParm),
	EVENT(EV_SetShaderParms, idEntity.prototype.Event_SetShaderParms),
	EVENT(EV_SetColor, idEntity.prototype.Event_SetColor),
	EVENT(EV_GetColor, idEntity.prototype.Event_GetColor),
	EVENT(EV_IsHidden, idEntity.prototype.Event_IsHidden),
	EVENT(EV_Hide, idEntity.prototype.Event_Hide),
	EVENT(EV_Show, idEntity.prototype.Event_Show),
	EVENT(EV_CacheSoundShader, idEntity.prototype.Event_CacheSoundShader),
	EVENT(EV_StartSoundShader, idEntity.prototype.Event_StartSoundShader),
	EVENT(EV_StartSound, idEntity.prototype.Event_StartSound),
	EVENT(EV_StopSound, idEntity.prototype.Event_StopSound),
	EVENT(EV_FadeSound, idEntity.prototype.Event_FadeSound),
	EVENT(EV_GetWorldOrigin, idEntity.prototype.Event_GetWorldOrigin),
	EVENT(EV_SetWorldOrigin, idEntity.prototype.Event_SetWorldOrigin),
	EVENT(EV_GetOrigin, idEntity.prototype.Event_GetOrigin),
	EVENT(EV_SetOrigin, idEntity.prototype.Event_SetOrigin),
	EVENT(EV_GetAngles, idEntity.prototype.Event_GetAngles),
	EVENT(EV_SetAngles, idEntity.prototype.Event_SetAngles),
	EVENT(EV_GetLinearVelocity, idEntity.prototype.Event_GetLinearVelocity),
	EVENT(EV_SetLinearVelocity, idEntity.prototype.Event_SetLinearVelocity),
	EVENT(EV_GetAngularVelocity, idEntity.prototype.Event_GetAngularVelocity),
	EVENT(EV_SetAngularVelocity, idEntity.prototype.Event_SetAngularVelocity),
	EVENT(EV_GetSize, idEntity.prototype.Event_GetSize),
	EVENT(EV_SetSize, idEntity.prototype.Event_SetSize),
	EVENT(EV_GetMins, idEntity.prototype.Event_GetMins),
	EVENT(EV_GetMaxs, idEntity.prototype.Event_GetMaxs),
	EVENT(EV_Touches, idEntity.prototype.Event_Touches),
	EVENT(EV_SetGuiParm, idEntity.prototype.Event_SetGuiParm),
	EVENT(EV_SetGuiFloat, idEntity.prototype.Event_SetGuiFloat),
	EVENT(EV_GetNextKey, idEntity.prototype.Event_GetNextKey),
	EVENT(EV_SetKey, idEntity.prototype.Event_SetKey),
	EVENT(EV_GetKey, idEntity.prototype.Event_GetKey),
	EVENT(EV_GetIntKey, idEntity.prototype.Event_GetIntKey),
	EVENT(EV_GetFloatKey, idEntity.prototype.Event_GetFloatKey),
	EVENT(EV_GetVectorKey, idEntity.prototype.Event_GetVectorKey),
	EVENT(EV_GetEntityKey, idEntity.prototype.Event_GetEntityKey),
	EVENT(EV_RestorePosition, idEntity.prototype.Event_RestorePosition),
	EVENT(EV_UpdateCameraTarget, idEntity.prototype.Event_UpdateCameraTarget),
	EVENT(EV_DistanceTo, idEntity.prototype.Event_DistanceTo),
	EVENT(EV_DistanceToPoint, idEntity.prototype.Event_DistanceToPoint),
	EVENT(EV_StartFx, idEntity.prototype.Event_StartFx),
	EVENT(EV_Thread_WaitFrame, idEntity.prototype.Event_WaitFrame),
	EVENT(EV_Thread_Wait, idEntity.prototype.Event_Wait),
	EVENT(EV_HasFunction, idEntity.prototype.Event_HasFunction),
	EVENT(EV_CallFunction, idEntity.prototype.Event_CallFunction),
	EVENT(EV_SetNeverDormant, idEntity.prototype.Event_SetNeverDormant)
];

idEntity.Type = new idTypeInfo( "idEntity", "idClass",
	idEntity.eventCallbacks, idEntity.CreateInstance, idEntity.prototype.Spawn,
	idEntity.prototype.Save, idEntity.prototype.Restore );

/*
================
UpdateGuiParms
================
*/
function UpdateGuiParms ( gui: idUserInterface, args: idDict ): void {
	if ( gui == null || args == null ) {
		return;
	}
	var kv = args.MatchPrefix( "gui_parm", null );
	while ( kv ) {
		gui.SetStateString(kv.GetKey().data, kv.GetValue ( ).data );
		kv = args.MatchPrefix( "gui_parm", kv );
	}
	gui.SetStateBool( "noninteractive", args.GetBool( "gui_noninteractive" ) );
	gui.StateChanged( gameLocal.time );
}

/*
================
AddRenderGui
================
*/
function AddRenderGui ( name: string, gui: R<idUserInterface>, args: idDict ): void {
	var kv = args.MatchPrefix( "gui_parm", null );
	gui.$ = uiManager.FindGui( name, true, ( kv != null ) );
	UpdateGuiParms( gui.$, args );
}

/*
===============================================================================

  idAnimatedEntity

===============================================================================
*/

var EV_GetJointHandle= new idEventDef( "getJointHandle", "s", 'd' );
var EV_ClearAllJoints= new idEventDef( "clearAllJoints" );
var EV_ClearJoint= new idEventDef( "clearJoint", "d" );
var EV_SetJointPos= new idEventDef( "setJointPos", "ddv" );
var EV_SetJointAngle= new idEventDef( "setJointAngle", "ddv" );
var EV_GetJointPos= new idEventDef( "getJointPos", "d", 'v' );
var EV_GetJointAngle= new idEventDef( "getJointAngle", "d", 'v' );
////
////CLASS_DECLARATION( idEntity, idAnimatedEntity )
idAnimatedEntity.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idAnimatedEntity;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idAnimatedEntity.prototype.GetType = function ( ): idTypeInfo {
	return ( idAnimatedEntity.Type );
};

idAnimatedEntity.eventCallbacks = [
	EVENT( EV_GetJointHandle,		idAnimatedEntity.prototype.Event_GetJointHandle ),
	EVENT( EV_ClearAllJoints,		idAnimatedEntity.prototype.Event_ClearAllJoints ),
	EVENT( EV_ClearJoint,			idAnimatedEntity.prototype.Event_ClearJoint ),
	EVENT( EV_SetJointPos,			idAnimatedEntity.prototype.Event_SetJointPos ),
	EVENT( EV_SetJointAngle,		idAnimatedEntity.prototype.Event_SetJointAngle ),
	EVENT( EV_GetJointPos,			idAnimatedEntity.prototype.Event_GetJointPos ),
	EVENT( EV_GetJointAngle,		idAnimatedEntity.prototype.Event_GetJointAngle )
];

idAnimatedEntity.Type = new idTypeInfo("idAnimatedEntity", "idEntity",
	idAnimatedEntity.eventCallbacks, idAnimatedEntity.CreateInstance, idAnimatedEntity.prototype.Spawn,
	idAnimatedEntity.prototype.Save, idAnimatedEntity.prototype.Restore );


////END_CLASS
////
/////*
////================
////idAnimatedEntity::idAnimatedEntity
////================
////*/
////idAnimatedEntity::idAnimatedEntity() {
////	animator.SetEntity( this );
////	damageEffects = NULL;
////}
////
/////*
////================
////idAnimatedEntity::~idAnimatedEntity
////================
////*/
////idAnimatedEntity::~idAnimatedEntity() {
////	damageEffect_t	*de;
////
////	for ( de = damageEffects; de; de = damageEffects ) {
////		damageEffects = de.next;
////		delete de;
////	}
////}
////
/////*
////================
////idAnimatedEntity::Save
////
////archives object for save game file
////================
////*/
////void idAnimatedEntity::Save( idSaveGame *savefile ) const {
////	animator.Save( savefile );
////
////	// Wounds are very temporary, ignored at this time
////	//damageEffect_t			*damageEffects;
////}
////
/////*
////================
////idAnimatedEntity::Restore
////
////unarchives object from save game file
////================
////*/
////void idAnimatedEntity::Restore( idRestoreGame *savefile ) {
////	animator.Restore( savefile );
////
////	// check if the entity has an MD5 model
////	if ( animator.ModelHandle() ) {
////		// set the callback to update the joints
////		renderEntity.callback = idEntity::ModelCallback;
////		animator.GetJoints( &renderEntity.numJoints, &renderEntity.joints );
////		animator.GetBounds( gameLocal.time, renderEntity.bounds );
////		if ( modelDefHandle != -1 ) {
////			gameRenderWorld.UpdateEntityDef( modelDefHandle, &renderEntity );
////		}
////	}
////}
////
/////*
////================
////idAnimatedEntity::ClientPredictionThink
////================
////*/
////void idAnimatedEntity::ClientPredictionThink( ):void {
////	RunPhysics();
////	UpdateAnimation();
////	Present();
////}
////
/////*
////================
////idAnimatedEntity::Think
////================
////*/
////void idAnimatedEntity::Think( ):void {
////	RunPhysics();
////	UpdateAnimation();
////	Present();
////	UpdateDamageEffects();
////}
////
/////*
////================
////idAnimatedEntity::UpdateAnimation
////================
////*/
////void idAnimatedEntity::UpdateAnimation( ):void {
////	// don't do animations if they're not enabled
////	if ( !( thinkFlags & TH_ANIMATE ) ) {
////		return;
////	}
////
////	// is the model an MD5?
////	if ( !animator.ModelHandle() ) {
////		// no, so nothing to do
////		return;
////	}
////
////	// call any frame commands that have happened in the past frame
////	if ( !fl.hidden ) {
////		animator.ServiceAnims( gameLocal.previousTime, gameLocal.time );
////	}
////
////	// if the model is animating then we have to update it
////	if ( !animator.FrameHasChanged( gameLocal.time ) ) {
////		// still fine the way it was
////		return;
////	}
////
////	// get the latest frame bounds
////	animator.GetBounds( gameLocal.time, renderEntity.bounds );
////	if ( renderEntity.bounds.IsCleared() && !fl.hidden ) {
////		gameLocal.DPrintf( "%d: inside out bounds\n", gameLocal.time );
////	}
////
////	// update the renderEntity
////	UpdateVisuals();
////
////	// the animation is updated
////	animator.ClearForceUpdate();
////}
////
/////*
////================
////idAnimatedEntity::GetAnimator
////================
////*/
////idAnimator *idAnimatedEntity::GetAnimator( ):void {
////	return &animator;
////}
////
/////*
////================
////idAnimatedEntity::SetModel
////================
////*/
////void idAnimatedEntity::SetModel( const char *modelname ) {
////	FreeModelDef();
////
////	renderEntity.hModel = animator.SetModel( modelname );
////	if ( !renderEntity.hModel ) {
////		idEntity::SetModel( modelname );
////		return;
////	}
////
////	if ( !renderEntity.customSkin ) {
////		renderEntity.customSkin = animator.ModelDef().GetDefaultSkin();
////	}
////
////	// set the callback to update the joints
////	renderEntity.callback = idEntity::ModelCallback;
////	animator.GetJoints( &renderEntity.numJoints, &renderEntity.joints );
////	animator.GetBounds( gameLocal.time, renderEntity.bounds );
////
////	UpdateVisuals();
////}
////
/////*
////=====================
////idAnimatedEntity::GetJointWorldTransform
////=====================
////*/
////bool idAnimatedEntity::GetJointWorldTransform( jointHandle_t jointHandle, int currentTime, idVec3 &offset, idMat3 &axis ) {
////	if ( !animator.GetJointTransform( jointHandle, currentTime, offset, axis ) ) {
////		return false;
////	}
////
////	ConvertLocalToWorldTransform( offset, axis );
////	return true;
////}
////
/////*
////==============
////idAnimatedEntity::GetJointTransformForAnim
////==============
////*/
////bool idAnimatedEntity::GetJointTransformForAnim( jointHandle_t jointHandle, int animNum, int frameTime, idVec3 &offset, idMat3 &axis ) const {
////	const idAnim	*anim;
////	int				numJoints;
////	idJointMat		*frame;
////
////	anim = animator.GetAnim( animNum );
////	if ( !anim ) {
////		assert( 0 );
////		return false;
////	}
////
////	numJoints = animator.NumJoints();
////	if ( ( jointHandle < 0 ) || ( jointHandle >= numJoints ) ) {
////		assert( 0 );
////		return false;
////	}
////
////	frame = ( idJointMat * )_alloca16( numJoints * sizeof( idJointMat ) );
////	gameEdit.ANIM_CreateAnimFrame( animator.ModelHandle(), anim.MD5Anim( 0 ), renderEntity.numJoints, frame, frameTime, animator.ModelDef().GetVisualOffset(), animator.RemoveOrigin() );
////
////	offset = frame[ jointHandle ].ToVec3();
////	axis = frame[ jointHandle ].ToMat3();
////	
////	return true;
////}
////
/////*
////==============
////idAnimatedEntity::AddDamageEffect
////
////  Dammage effects track the animating impact position, spitting out particles.
////==============
////*/
////void idAnimatedEntity::AddDamageEffect( const trace_t &collision, const idVec3 &velocity, const char *damageDefName ) {
////	jointHandle_t jointNum;
////	idVec3 origin, dir, localDir, localOrigin, localNormal;
////	idMat3 axis;
////
////	if ( !g_bloodEffects.GetBool() || renderEntity.joints == NULL ) {
////		return;
////	}
////
////	const idDeclEntityDef *def = gameLocal.FindEntityDef( damageDefName, false );
////	if ( def == NULL ) {
////		return;
////	}
////
////	jointNum = CLIPMODEL_ID_TO_JOINT_HANDLE( collision.c.id );
////	if ( jointNum == INVALID_JOINT ) {
////		return;
////	}
////
////	dir = velocity;
////	dir.Normalize();
////
////	axis = renderEntity.joints[jointNum].ToMat3() * renderEntity.axis;
////	origin = renderEntity.origin + renderEntity.joints[jointNum].ToVec3() * renderEntity.axis;
////
////	localOrigin = ( collision.c.point - origin ) * axis.Transpose();
////	localNormal = collision.c.normal * axis.Transpose();
////	localDir = dir * axis.Transpose();
////
////	AddLocalDamageEffect( jointNum, localOrigin, localNormal, localDir, def, collision.c.material );
////
////	if ( gameLocal.isServer ) {
////		idBitMsg	msg;
////		byte		msgBuf[MAX_EVENT_PARAM_SIZE];
////
////		msg.Init( msgBuf, sizeof( msgBuf ) );
////		msg.BeginWriting();
////		msg.WriteShort( (int)jointNum );
////		msg.WriteFloat( localOrigin[0] );
////		msg.WriteFloat( localOrigin[1] );
////		msg.WriteFloat( localOrigin[2] );
////		msg.WriteDir( localNormal, 24 );
////		msg.WriteDir( localDir, 24 );
////		msg.WriteLong( gameLocal.ServerRemapDecl( -1, DECL_ENTITYDEF, def.Index() ) );
////		msg.WriteLong( gameLocal.ServerRemapDecl( -1, DECL_MATERIAL, collision.c.material.Index() ) );
////		ServerSendEvent( EVENT_ADD_DAMAGE_EFFECT, &msg, false, -1 );
////	}
////}
////
/////*
////==============
////idAnimatedEntity::GetDefaultSurfaceType
////==============
////*/
////int	idAnimatedEntity::GetDefaultSurfaceType( ):void const {
////	return SURFTYPE_METAL;
////}
////
/////*
////==============
////idAnimatedEntity::AddLocalDamageEffect
////==============
////*/
////void idAnimatedEntity::AddLocalDamageEffect( jointHandle_t jointNum, const idVec3 &localOrigin, const idVec3 &localNormal, const idVec3 &localDir, const idDeclEntityDef *def, const idMaterial *collisionMaterial ) {
////	const char *sound, *splat, *decal, *bleed, *key;
////	damageEffect_t	*de;
////	idVec3 origin, dir;
////	idMat3 axis;
////
////	axis = renderEntity.joints[jointNum].ToMat3() * renderEntity.axis;
////	origin = renderEntity.origin + renderEntity.joints[jointNum].ToVec3() * renderEntity.axis;
////
////	origin = origin + localOrigin * axis;
////	dir = localDir * axis;
////
////	int type = collisionMaterial.GetSurfaceType();
////	if ( type == SURFTYPE_NONE ) {
////		type = GetDefaultSurfaceType();
////	}
////
////	const char *materialType = gameLocal.sufaceTypeNames[ type ];
////
////	// start impact sound based on material type
////	key = va( "snd_%s", materialType );
////	sound = spawnArgs.GetString( key );
////	if ( *sound == '\0' ) {
////		sound = def.dict.GetString( key );
////	}
////	if ( *sound != '\0' ) {
////		StartSoundShader( declManager.FindSound( sound ), SND_CHANNEL_BODY, 0, false, NULL );
////	}
////
////	// blood splats are thrown onto nearby surfaces
////	key = va( "mtr_splat_%s", materialType );
////	splat = spawnArgs.RandomPrefix( key, gameLocal.random );
////	if ( *splat == '\0' ) {
////		splat = def.dict.RandomPrefix( key, gameLocal.random );
////	}
////	if ( *splat != '\0' ) {
////		gameLocal.BloodSplat( origin, dir, 64.0f, splat );
////	}
////
////	// can't see wounds on the player model in single player mode
////	if ( !( IsType( idPlayer::Type ) && !gameLocal.isMultiplayer ) ) {
////		// place a wound overlay on the model
////		key = va( "mtr_wound_%s", materialType );
////		decal = spawnArgs.RandomPrefix( key, gameLocal.random );
////		if ( *decal == '\0' ) {
////			decal = def.dict.RandomPrefix( key, gameLocal.random );
////		}
////		if ( *decal != '\0' ) {
////			ProjectOverlay( origin, dir, 20.0f, decal );
////		}
////	}
////
////	// a blood spurting wound is added
////	key = va( "smoke_wound_%s", materialType );
////	bleed = spawnArgs.GetString( key );
////	if ( *bleed == '\0' ) {
////		bleed = def.dict.GetString( key );
////	}
////	if ( *bleed != '\0' ) {
////		de = new damageEffect_t;
////		de.next = this.damageEffects;
////		this.damageEffects = de;
////
////		de.jointNum = jointNum;
////		de.localOrigin = localOrigin;
////		de.localNormal = localNormal;
////		de.type = static_cast<const idDeclParticle *>( declManager.FindType( DECL_PARTICLE, bleed ) );
////		de.time = gameLocal.time;
////	}
////}
////
/////*
////==============
////idAnimatedEntity::UpdateDamageEffects
////==============
////*/
////void idAnimatedEntity::UpdateDamageEffects( ):void {
////	damageEffect_t	*de, **prev;
////
////	// free any that have timed out
////	prev = &this.damageEffects;
////	while ( *prev ) {
////		de = *prev;
////		if ( de.time == 0 ) {	// FIXME:SMOKE
////			*prev = de.next;
////			delete de;
////		} else {
////			prev = &de.next;
////		}
////	}
////
////	if ( !g_bloodEffects.GetBool() ) {
////		return;
////	}
////
////	// emit a particle for each bleeding wound
////	for ( de = this.damageEffects; de; de = de.next ) {
////		idVec3 origin, start;
////		idMat3 axis;
////
////		animator.GetJointTransform( de.jointNum, gameLocal.time, origin, axis );
////		axis *= renderEntity.axis;
////		origin = renderEntity.origin + origin * renderEntity.axis;
////		start = origin + de.localOrigin * axis;
////		if ( !gameLocal.smokeParticles.EmitSmoke( de.type, de.time, gameLocal.random.CRandomFloat(), start, axis ) ) {
////			de.time = 0;
////		}
////	}
////}
////
/////*
////================
////idAnimatedEntity::ClientReceiveEvent
////================
////*/
////bool idAnimatedEntity::ClientReceiveEvent( int event, /*int*/time:number, const idBitMsg &msg ) {
////	int damageDefIndex;
////	int materialIndex;
////	jointHandle_t jointNum;
////	idVec3 localOrigin, localNormal, localDir;
////
////	switch( event ) {
////		case EVENT_ADD_DAMAGE_EFFECT: {
////			jointNum = (jointHandle_t) msg.ReadShort();
////			localOrigin[0] = msg.ReadFloat();
////			localOrigin[1] = msg.ReadFloat();
////			localOrigin[2] = msg.ReadFloat();
////			localNormal = msg.ReadDir( 24 );
////			localDir = msg.ReadDir( 24 );
////			damageDefIndex = gameLocal.ClientRemapDecl( DECL_ENTITYDEF, msg.ReadLong() );
////			materialIndex = gameLocal.ClientRemapDecl( DECL_MATERIAL, msg.ReadLong() );
////			const idDeclEntityDef *damageDef = static_cast<const idDeclEntityDef *>( declManager.DeclByIndex( DECL_ENTITYDEF, damageDefIndex ) );
////			const idMaterial *collisionMaterial = static_cast<const idMaterial *>( declManager.DeclByIndex( DECL_MATERIAL, materialIndex ) );
////			AddLocalDamageEffect( jointNum, localOrigin, localNormal, localDir, damageDef, collisionMaterial );
////			return true;
////		}
////		default: {
////			return idEntity::ClientReceiveEvent( event, time, msg );
////		}
////	}
////	return false;
////}
////
/////*
////================
////idAnimatedEntity::Event_GetJointHandle
////
////looks up the number of the specified joint.  returns INVALID_JOINT if the joint is not found.
////================
////*/
////void idAnimatedEntity::Event_GetJointHandle( jointname:string ) {
////	jointHandle_t joint;
////
////	joint = animator.GetJointHandle( jointname );
////	idThread::ReturnInt( joint );
////}
////
/////*
////================
////idAnimatedEntity::Event_ClearAllJoints
////
////removes any custom transforms on all joints
////================
////*/
////void idAnimatedEntity::Event_ClearAllJoints( ):void {
////	animator.ClearAllJoints();
////}
////
/////*
////================
////idAnimatedEntity::Event_ClearJoint
////
////removes any custom transforms on the specified joint
////================
////*/
////void idAnimatedEntity::Event_ClearJoint( jointnum:jointHandle_t ) {
////	animator.ClearJoint( jointnum );
////}
////
/////*
////================
////idAnimatedEntity::Event_SetJointPos
////
////modifies the position of the joint based on the transform type
////================
////*/
////void idAnimatedEntity::Event_SetJointPos( jointnum:jointHandle_t, transform_type:jointModTransform_t, pos:idVec3 ) {
////	animator.SetJointPos( jointnum, transform_type, pos );
////}
////
/////*
////================
////idAnimatedEntity::Event_SetJointAngle
////
////modifies the orientation of the joint based on the transform type
////================
////*/
////void idAnimatedEntity::Event_SetJointAngle( jointnum:jointHandle_t, transform_type:jointModTransform_t, angles:idAngles ) {
////	idMat3 mat;
////
////	mat = angles.ToMat3();
////	animator.SetJointAxis( jointnum, transform_type, mat );
////}
////
/////*
////================
////idAnimatedEntity::Event_GetJointPos
////
////returns the position of the joint in worldspace
////================
////*/
////void idAnimatedEntity::Event_GetJointPos( jointnum:jointHandle_t ) {
////	idVec3 offset;
////	idMat3 axis;
////
////	if ( !GetJointWorldTransform( jointnum, gameLocal.time, offset, axis ) ) {
////		gameLocal.Warning( "Joint # %d out of range on entity '%s'",  jointnum, name.c_str() );
////	}
////
////	idThread::ReturnVector( offset );
////}
////
/////*
////================
////idAnimatedEntity::Event_GetJointAngle
////
////returns the orientation of the joint in worldspace
////================
////*/
////void idAnimatedEntity::Event_GetJointAngle( jointnum:jointHandle_t ) {
////	idVec3 offset;
////	idMat3 axis;
////
////	if ( !GetJointWorldTransform( jointnum, gameLocal.time, offset, axis ) ) {
////		gameLocal.Warning( "Joint # %d out of range on entity '%s'",  jointnum, name.c_str() );
////	}
////
////	idAngles ang = axis.ToAngles();
////	idVec3 vec( ang[ 0 ], ang[ 1 ], ang[ 2 ] );
////	idThread::ReturnVector( vec );
////}
