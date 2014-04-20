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
////static const char *moveCommandString[ NUM_MOVE_COMMANDS ] = {
////	"MOVE_NONE",
////	"MOVE_FACE_ENEMY",
////	"MOVE_FACE_ENTITY",
////	"MOVE_TO_ENEMY",
////	"MOVE_TO_ENEMYHEIGHT",
////	"MOVE_TO_ENTITY",
////	"MOVE_OUT_OF_RANGE",
////	"MOVE_TO_ATTACK_POSITION",
////	"MOVE_TO_COVER",
////	"MOVE_TO_POSITION",
////	"MOVE_TO_POSITION_DIRECT",
////	"MOVE_SLIDE_TO_POSITION",
////	"MOVE_WANDER"
////};
////
/////*
////=====================
////idMoveState::idMoveState
////=====================
////*/
////idMoveState::idMoveState() {
////	moveType			= MOVETYPE_ANIM;
////	moveCommand			= MOVE_NONE;
////	moveStatus			= MOVE_STATUS_DONE;
////	moveDest.Zero();
////	moveDir.Set( 1.0f, 0.0f, 0.0f );
////	goalEntity			= NULL;
////	goalEntityOrigin.Zero();
////	toAreaNum			= 0;
////	startTime			= 0;
////	duration			= 0;
////	speed				= 0.0f;
////	range				= 0.0f;
////	wanderYaw			= 0;
////	nextWanderTime		= 0;
////	blockTime			= 0;
////	obstacle			= NULL;
////	lastMoveOrigin		= vec3_origin;
////	lastMoveTime		= 0;
////	anim				= 0;
////}
////
/////*
////=====================
////idMoveState::Save
////=====================
////*/
////void idMoveState::Save( idSaveGame *savefile ) const {
////	savefile.WriteInt( (int)moveType );
////	savefile.WriteInt( (int)moveCommand );
////	savefile.WriteInt( (int)moveStatus );
////	savefile.WriteVec3( moveDest );
////	savefile.WriteVec3( moveDir );
////	goalEntity.Save( savefile );
////	savefile.WriteVec3( goalEntityOrigin );
////	savefile.WriteInt( toAreaNum );
////	savefile.WriteInt( startTime );
////	savefile.WriteInt( duration );
////	savefile.WriteFloat( speed );
////	savefile.WriteFloat( range );
////	savefile.WriteFloat( wanderYaw );
////	savefile.WriteInt( nextWanderTime );
////	savefile.WriteInt( blockTime );
////	obstacle.Save( savefile );
////	savefile.WriteVec3( lastMoveOrigin );
////	savefile.WriteInt( lastMoveTime );
////	savefile.WriteInt( anim );
////}
////
/////*
////=====================
////idMoveState::Restore
////=====================
////*/
////void idMoveState::Restore( idRestoreGame *savefile ) {
////	savefile.ReadInt( (int &)moveType );
////	savefile.ReadInt( (int &)moveCommand );
////	savefile.ReadInt( (int &)moveStatus );
////	savefile.ReadVec3( moveDest );
////	savefile.ReadVec3( moveDir );
////	goalEntity.Restore( savefile );
////	savefile.ReadVec3( goalEntityOrigin );
////	savefile.ReadInt( toAreaNum );
////	savefile.ReadInt( startTime );
////	savefile.ReadInt( duration );
////	savefile.ReadFloat( speed );
////	savefile.ReadFloat( range );
////	savefile.ReadFloat( wanderYaw );
////	savefile.ReadInt( nextWanderTime );
////	savefile.ReadInt( blockTime );
////	obstacle.Restore( savefile );
////	savefile.ReadVec3( lastMoveOrigin );
////	savefile.ReadInt( lastMoveTime );
////	savefile.ReadInt( anim );
////}
////
/////*
////============
////idAASFindCover::idAASFindCover
////============
////*/
////idAASFindCover::idAASFindCover( const idVec3 &hideFromPos ) {
////	int			numPVSAreas;
////	idBounds	bounds( hideFromPos - idVec3( 16, 16, 0 ), hideFromPos + idVec3( 16, 16, 64 ) );
////
////	// setup PVS
////	numPVSAreas = gameLocal.pvs.GetPVSAreas( bounds, PVSAreas, idEntity::MAX_PVS_AREAS );
////	hidePVS		= gameLocal.pvs.SetupCurrentPVS( PVSAreas, numPVSAreas );
////}
////
/////*
////============
////idAASFindCover::~idAASFindCover
////============
////*/
////idAASFindCover::~idAASFindCover() {
////	gameLocal.pvs.FreeCurrentPVS( hidePVS );
////}
////
/////*
////============
////idAASFindCover::TestArea
////============
////*/
////bool idAASFindCover::TestArea( const idAAS *aas, int areaNum ) {
////	idVec3	areaCenter;
////	int		numPVSAreas;
////	int		PVSAreas[ idEntity::MAX_PVS_AREAS ];
////
////	areaCenter = aas.AreaCenter( areaNum );
////	areaCenter[ 2 ] += 1.0f;
////
////	numPVSAreas = gameLocal.pvs.GetPVSAreas( idBounds( areaCenter ).Expand( 16.0f ), PVSAreas, idEntity::MAX_PVS_AREAS );
////	if ( !gameLocal.pvs.InCurrentPVS( hidePVS, PVSAreas, numPVSAreas ) ) {
////		return true;
////	}
////
////	return false;
////}
////
/////*
////============
////idAASFindAreaOutOfRange::idAASFindAreaOutOfRange
////============
////*/
////idAASFindAreaOutOfRange::idAASFindAreaOutOfRange( const idVec3 &targetPos, float maxDist ) {
////	this.targetPos		= targetPos;
////	this.maxDistSqr	= maxDist * maxDist;
////}
////
/////*
////============
////idAASFindAreaOutOfRange::TestArea
////============
////*/
////bool idAASFindAreaOutOfRange::TestArea( const idAAS *aas, int areaNum ) {
////	const idVec3 &areaCenter = aas.AreaCenter( areaNum );
////	trace_t	trace;
////	float dist;
////
////	dist = ( targetPos.ToVec2() - areaCenter.ToVec2() ).LengthSqr();
////
////	if ( ( maxDistSqr > 0.0f ) && ( dist < maxDistSqr ) ) {
////		return false;
////	}
////
////	gameLocal.clip.TracePoint( trace, targetPos, areaCenter + idVec3( 0.0f, 0.0f, 1.0f ), MASK_OPAQUE, NULL );
////	if ( trace.fraction < 1.0f ) {
////		return false;
////	}
////
////	return true;
////}
////
/////*
////============
////idAASFindAttackPosition::idAASFindAttackPosition
////============
////*/
////idAASFindAttackPosition::idAASFindAttackPosition( const idAI *self, const idMat3 &gravityAxis, idEntity *target, const idVec3 &targetPos, const idVec3 &fireOffset ) {
////	int	numPVSAreas;
////
////	this.target		= target;
////	this.targetPos		= targetPos;
////	this.fireOffset	= fireOffset;
////	this.self			= self;
////	this.gravityAxis	= gravityAxis;
////
////	excludeBounds		= idBounds( idVec3( -64.0, -64.0f, -8.0f ), idVec3( 64.0, 64.0f, 64.0f ) );
////	excludeBounds.TranslateSelf( self.GetPhysics().GetOrigin() );	
////
////	// setup PVS
////	idBounds bounds( targetPos - idVec3( 16, 16, 0 ), targetPos + idVec3( 16, 16, 64 ) );
////	numPVSAreas = gameLocal.pvs.GetPVSAreas( bounds, PVSAreas, idEntity::MAX_PVS_AREAS );
////	targetPVS	= gameLocal.pvs.SetupCurrentPVS( PVSAreas, numPVSAreas );
////}
////
/////*
////============
////idAASFindAttackPosition::~idAASFindAttackPosition
////============
////*/
////idAASFindAttackPosition::~idAASFindAttackPosition() {
////	gameLocal.pvs.FreeCurrentPVS( targetPVS );
////}
////
/////*
////============
////idAASFindAttackPosition::TestArea
////============
////*/
////bool idAASFindAttackPosition::TestArea( const idAAS *aas, int areaNum ) {
////	idVec3	dir;
////	idVec3	local_dir;
////	idVec3	fromPos;
////	idMat3	axis;
////	idVec3	areaCenter;
////	int		numPVSAreas;
////	int		PVSAreas[ idEntity::MAX_PVS_AREAS ];
////
////	areaCenter = aas.AreaCenter( areaNum );
////	areaCenter[ 2 ] += 1.0f;
////
////	if ( excludeBounds.ContainsPoint( areaCenter ) ) {
////		// too close to where we already are
////		return false;
////	}
////
////	numPVSAreas = gameLocal.pvs.GetPVSAreas( idBounds( areaCenter ).Expand( 16.0f ), PVSAreas, idEntity::MAX_PVS_AREAS );
////	if ( !gameLocal.pvs.InCurrentPVS( targetPVS, PVSAreas, numPVSAreas ) ) {
////		return false;
////	}
////
////	// calculate the world transform of the launch position
////	dir = targetPos - areaCenter;
////	gravityAxis.ProjectVector( dir, local_dir );
////	local_dir.z = 0.0f;
////	local_dir.ToVec2().Normalize();
////	axis = local_dir.ToMat3();
////	fromPos = areaCenter + fireOffset * axis;
////
////	return self.GetAimDir( fromPos, target, self, dir );
////}
////

/***********************************************************************

idCombatNode

***********************************************************************/

var EV_CombatNode_MarkUsed = new idEventDef( "markUsed" );

//CLASS_DECLARATION(idEntity, idCombatNode)

idCombatNode.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idCombatNode;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idCombatNode.prototype.GetType = function ( ): idTypeInfo {
	return ( idCombatNode.Type );
};

idCombatNode.eventCallbacks = [
	new idEventFunc( EV_CombatNode_MarkUsed, idCombatNode.prototype.Event_MarkUsed ),
	new idEventFunc( EV_Activate, idCombatNode.prototype.Event_Activate )
];

idCombatNode.Type = new idTypeInfo( "idCombatNode", "idEntity",
	idCombatNode.eventCallbacks, idCombatNode.CreateInstance, idCombatNode.prototype.Spawn,
	idCombatNode.prototype.Save, idCombatNode.prototype.Restore );
