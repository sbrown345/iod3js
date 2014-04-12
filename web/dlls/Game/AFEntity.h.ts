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
////::
////===========================================================================
////*/
////
////#ifndef __GAME_AFENTITY_H__
////#define __GAME_AFENTITY_H__
////
////
/*
===============================================================================

idMultiModelAF

Entity using multiple separate visual models animated with a single
articulated figure. Only used for debugging!

===============================================================================
*/
var GIB_DELAY = 200;  // only gib this often to keep performace hits when blowing up several mobs

class idMultiModelAF extends idEntity {
////public:
//	CLASS_PROTOTYPE( idMultiModelAF );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idMultiModelAF>[];
////	void					Spawn( );
////							~idMultiModelAF( );
////
////	virtual void			Think( );
////	virtual void			Present( );
////
////protected:
	physicsObj = new idPhysics_AF;
////
////	void					SetModelForId( int id, const idStr &modelName );
////
////private:
////	idList<idRenderModel *>	modelHandles;
////	idList<int>				modelDefHandles;


	/*
	================
	idMultiModelAF::Spawn
	================
	*/
	Spawn ( ): void {
		this.physicsObj.SetSelf( this );
	}

/////*
////================
////idMultiModelAF::~idMultiModelAF
////================
////*/
////idMultiModelAF::~idMultiModelAF( ) {
////	var/*int*/i:number;
////
////	for ( i = 0; i < modelDefHandles.Num(); i++ ) {
////		if ( modelDefHandles[i] != -1 ) {
////			gameRenderWorld.FreeEntityDef( modelDefHandles[i] );
////			modelDefHandles[i] = -1;
////		}
////	}
////}
////
/////*
////================
////idMultiModelAF::SetModelForId
////================
////*/
////void idMultiModelAF::SetModelForId( /*int*/ id:number, const idStr &modelName ) {
////	modelHandles.AssureSize( id+1, NULL );
////	modelDefHandles.AssureSize( id+1, -1 );
////	modelHandles[id] = renderModelManager.FindModel( modelName );
////}
////
/////*
////================
////idMultiModelAF::Present
////================
////*/
////void idMultiModelAF::Present( ) {
////	var/*int*/i:number;
////
////	// don't present to the renderer if the entity hasn't changed
////	if ( !( thinkFlags & TH_UPDATEVISUALS ) ) {
////		return;
////	}
////	BecomeInactive( TH_UPDATEVISUALS );
////
////	for ( i = 0; i < modelHandles.Num(); i++ ) {
////
////		if ( !modelHandles[i] ) {
////			continue;
////		}
////
////		renderEntity.origin = physicsObj.GetOrigin( i );
////		renderEntity.axis = physicsObj.GetAxis( i );
////		renderEntity.hModel = modelHandles[i];
////		renderEntity.bodyId = i;
////
////		// add to refresh list
////		if ( modelDefHandles[i] == -1 ) {
////			modelDefHandles[i] = gameRenderWorld.AddEntityDef( &renderEntity );
////		} else {
////			gameRenderWorld.UpdateEntityDef( modelDefHandles[i], &renderEntity );
////		}
////	}
////}
////
/////*
////================
////idMultiModelAF::Think
////================
////*/
////void idMultiModelAF::Think( ) {
////	RunPhysics();
////	Present();
////}
////
};
////
////
/////*
////===============================================================================
////
////idChain
////
////Chain hanging down from the ceiling. Only used for debugging!
////
////===============================================================================
////*/
////
class idChain extends idMultiModelAF {
////public:
////	CLASS_PROTOTYPE( idChain );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idChain>[];
////
////	void					Spawn( );
////
////protected:
////	void					BuildChain( const idStr &name, const idVec3 &origin, float linkLength, float linkWidth, float density, int numLinks, bool bindToWorld = true );

	////
	/////*
	////================
	////idChain::BuildChain
	////
	////  builds a chain hanging down from the ceiling
	////  the highest link is a child of the link below it etc.
	////  this allows an object to be attached to multiple chains while keeping a single tree structure
	////================
	////*/
	////void idChain::BuildChain( const idStr &name, const idVec3 &origin, float linkLength, float linkWidth, float density, int numLinks, bool bindToWorld ) {
	////	var/*int*/i:number;
	////	float halfLinkLength = linkLength * 0.5f;
	////	idTraceModel trm;
	////	idClipModel *clip;
	////	idAFBody *body, *lastBody;
	////	idAFConstraint_BallAndSocketJoint *bsj;
	////	idAFConstraint_UniversalJoint *uj;
	////	idVec3 org;
	////
	////	// create a trace model
	////	trm = idTraceModel( linkLength, linkWidth );
	////	trm.Translate( -trm.offset );
	////
	////	org = origin - idVec3( 0, 0, halfLinkLength );
	////
	////	lastBody = NULL;
	////	for ( i = 0; i < numLinks; i++ ) {
	////
	////		// add body
	////		clip = new idClipModel( trm );
	////		clip.SetContents( CONTENTS_SOLID );
	////		clip.Link( gameLocal.clip, this, 0, org, mat3_identity );
	////		body = new idAFBody( name + idStr(i), clip, density );
	////		physicsObj.AddBody( body );
	////
	////		// visual model for body
	////		SetModelForId( physicsObj.GetBodyId( body ), spawnArgs.GetString( "model" ) );
	////
	////		// add constraint
	////		if ( bindToWorld ) {
	////			if ( !lastBody ) {
	////				uj = new idAFConstraint_UniversalJoint( name + idStr(i), body, lastBody );
	////				uj.SetShafts( idVec3( 0, 0, -1 ), idVec3( 0, 0, 1 ) );
	////				//uj.SetConeLimit( idVec3( 0, 0, -1 ), 30.0f );
	////				//uj.SetPyramidLimit( idVec3( 0, 0, -1 ), idVec3( 1, 0, 0 ), 90.0f, 30.0f );
	////			}
	////			else {
	////				uj = new idAFConstraint_UniversalJoint( name + idStr(i), lastBody, body );
	////				uj.SetShafts( idVec3( 0, 0, 1 ), idVec3( 0, 0, -1 ) );
	////				//uj.SetConeLimit( idVec3( 0, 0, 1 ), 30.0f );
	////			}
	////			uj.SetAnchor( org + idVec3( 0, 0, halfLinkLength ) );
	////			uj.SetFriction( 0.9f );
	////			physicsObj.AddConstraint( uj );
	////		}
	////		else {
	////			if ( lastBody ) {
	////				bsj = new idAFConstraint_BallAndSocketJoint( "joint" + idStr(i), lastBody, body );
	////				bsj.SetAnchor( org + idVec3( 0, 0, halfLinkLength ) );
	////				bsj.SetConeLimit( idVec3( 0, 0, 1 ), 60.0f, idVec3( 0, 0, 1 ) );
	////				physicsObj.AddConstraint( bsj );
	////			}
	////		}
	////
	////		org[2] -= linkLength;
	////
	////		lastBody = body;
	////	}
	////}
	////
	/////*
	////================
	////idChain::Spawn
	////================
	////*/
	Spawn(): void {
		todoThrow();
		////	int numLinks;
		////	float length, linkLength, linkWidth, density;
		////	bool drop;
		////	idVec3 origin;
		////
		////	spawnArgs.GetBool( "drop", "0", drop );
		////	spawnArgs.GetInt( "links", "3", numLinks );
		////	spawnArgs.GetFloat( "length", idStr( numLinks * 32.0f ), length );
		////	spawnArgs.GetFloat( "width", "8", linkWidth );
		////	spawnArgs.GetFloat( "density", "0.2", density );
		////	linkLength = length / numLinks;
		////	origin = GetPhysics().GetOrigin();
		////
		////	// initialize physics
		////	physicsObj.SetSelf( this );
		////	physicsObj.SetGravity( gameLocal.GetGravity() );
		////	physicsObj.SetClipMask( MASK_SOLID | CONTENTS_BODY );
		////	SetPhysics( &physicsObj );
		////
		////	BuildChain( "link", origin, linkLength, linkWidth, density, numLinks, !drop );
	}

};


/*
===============================================================================

idAFAttachment

===============================================================================
*/

class idAFAttachment extends  idAnimatedEntity {
////public:
////	CLASS_PROTOTYPE( idAFAttachment );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idAFAttachment>[];
////
////							idAFAttachment( );
////	virtual					~idAFAttachment( );
////
////	void					Spawn( );
////
//Save ( savefile: idSaveGame ): void { throw "placeholder"; }
////	void					Restore ( savefile: idRestoreGame ): void { throw "placeholder"; }
////
////	void					SetBody( idEntity *bodyEnt, const char *headModel, jointHandle_t attachJoint );
////	void					ClearBody( );
////	idEntity *				GetBody( ) const;
////
////	virtual void			Think( );
////
////	virtual void			Hide( );
////	virtual void			Show( );
////
////	void					PlayIdleAnim( int blendTime );
////
////	virtual void			GetImpactInfo( ent:idEntity, int id, const idVec3 &point, impactInfo_t *info );
////	virtual void			ApplyImpulse( ent:idEntity, int id, const idVec3 &point, const idVec3 &impulse );
////	virtual void			AddForce( ent:idEntity, int id, const idVec3 &point, const idVec3 &force );
////
////	virtual	void			Damage( idEntity *inflictor, idEntity *attacker, const idVec3 &dir, const char *damageDefName, const float damageScale, const int location );
////	virtual void			AddDamageEffect( const trace_t &collision, const idVec3 &velocity, const char *damageDefName );
////
////	void					SetCombatModel( );
////	idClipModel *			GetCombatModel( ) const;
////	virtual void			LinkCombat( );
////	virtual void			UnlinkCombat( );
////
////protected:
	body:idEntity;
	combatModel:idClipModel;	// render model for hit detection of head
	idleAnim :number/*int*/;
	attachJoint:jointHandle_t;

	
////END_CLASS

/*
=====================
idAFAttachment::idAFAttachment
=====================
*/
	constructor() {
		super ( );
	this.body			= null;
	this.combatModel = null;
	this.idleAnim		= 0;
	this.attachJoint = jointHandle_t.INVALID_JOINT;
}

/*
=====================
idAFAttachment::~idAFAttachment
=====================
*/
destructor( ):void {

	this.StopSound( gameSoundChannel_t.SND_CHANNEL_ANY, false );

	$delete( this.combatModel );
	delete this.combatModel;
	this.combatModel = null;
}

/*
=====================
idAFAttachment::Spawn
=====================
*/
Spawn( ):void {
	this.idleAnim = this.animator.GetAnim_str( "idle" );
}
////
/////*
////=====================
////idAFAttachment::SetBody
////=====================
////*/
////void idAFAttachment::SetBody( idEntity *bodyEnt, const char *model, jointHandle_t attachJoint ) {
////	bool bleed;
////
////	this.body = bodyEnt;
////	this.attachJoint = attachJoint;
////	SetModel( model );
////	fl.takedamage = true;
////
////	bleed = this.body.spawnArgs.GetBool( "bleed" );
////	spawnArgs.SetBool( "bleed", bleed );
////}
////
/*
=====================
idAFAttachment::ClearBody
=====================
*/
ClearBody( ) :void{
	this.body = null;
	this.attachJoint = jointHandle_t.INVALID_JOINT;
	this.Hide();
}
////
/////*
////=====================
////idAFAttachment::GetBody
////=====================
////*/
////idEntity *idAFAttachment::GetBody( ) const {
////	return this.body;
////}
////
/////*
////================
////idAFAttachment::Save
////
////archive object for savegame file
////================
////*/
////void idAFAttachment::Save( idSaveGame *savefile ) const {
////	savefile.WriteObject( this.body );
////	savefile.WriteInt( this.idleAnim );
////	savefile.WriteJoint( this.attachJoint );
////}
////
/////*
////================
////idAFAttachment::Restore
////
////unarchives object from save game file
////================
////*/
////void idAFAttachment::Restore( idRestoreGame *savefile ) {
////	savefile.ReadObject( reinterpret_cast<idClass *&>( this.body ) );
////	savefile.ReadInt( this.idleAnim );
////	savefile.ReadJoint( this.attachJoint );
////
////	SetCombatModel();
////	LinkCombat();
////}
////
/*
================
idAFAttachment::Hide
================
*/
Hide( ) :void{
	super.Hide();
	this.UnlinkCombat();
}

/////*
////================
////idAFAttachment::Show
////================
////*/
////void idAFAttachment::Show( ) {
////	idEntity::Show();
////	LinkCombat();
////}
////
/////*
////============
////idAFAttachment::Damage
////
////Pass damage to this.body at the bindjoint
////============
////*/
////void idAFAttachment::Damage( idEntity *inflictor, idEntity *attacker, const idVec3 &dir, 
////	const char *damageDefName, const float damageScale, const int location ) {
////	
////	if ( this.body ) {
////		this.body.Damage( inflictor, attacker, dir, damageDefName, damageScale, this.attachJoint );
////	}
////}
////
/////*
////================
////idAFAttachment::AddDamageEffect
////================
////*/
////void idAFAttachment::AddDamageEffect( const trace_t &collision, const idVec3 &velocity, const char *damageDefName ) {
////	if ( this.body ) {
////		trace_t c = collision;
////		c.c.id = JOINT_HANDLE_TO_CLIPMODEL_ID( this.attachJoint );
////		this.body.AddDamageEffect( c, velocity, damageDefName );
////	}
////}
////
/////*
////================
////idAFAttachment::GetImpactInfo
////================
////*/
////void idAFAttachment::GetImpactInfo( ent:idEntity, /*int*/ id:number, const idVec3 &point, impactInfo_t *info ) {
////	if ( this.body ) {
////		this.body.GetImpactInfo( ent, JOINT_HANDLE_TO_CLIPMODEL_ID( this.attachJoint ), point, info );
////	} else {
////		idEntity::GetImpactInfo( ent, id, point, info );
////	}
////}
////
/////*
////================
////idAFAttachment::ApplyImpulse
////================
////*/
////void idAFAttachment::ApplyImpulse( ent:idEntity, /*int*/ id:number, const idVec3 &point, const idVec3 &impulse ) {
////	if ( this.body ) {
////		this.body.ApplyImpulse( ent, JOINT_HANDLE_TO_CLIPMODEL_ID( this.attachJoint ), point, impulse );
////	} else {
////		idEntity::ApplyImpulse( ent, id, point, impulse );
////	}
////}
////
/////*
////================
////idAFAttachment::AddForce
////================
////*/
////void idAFAttachment::AddForce( ent:idEntity, /*int*/ id:number, const idVec3 &point, const idVec3 &force ) {
////	if ( this.body ) {
////		this.body.AddForce( ent, JOINT_HANDLE_TO_CLIPMODEL_ID( this.attachJoint ), point, force );
////	} else {
////		idEntity::AddForce( ent, id, point, force );
////	}
////}
////
/////*
////================
////idAFAttachment::PlayIdleAnim
////================
////*/
////void idAFAttachment::PlayIdleAnim( int blendTime ) {
////	if ( this.idleAnim && ( this.idleAnim != this.animator.CurrentAnim( ANIMCHANNEL_ALL ).AnimNum() ) ) {
////		this.animator.CycleAnim( ANIMCHANNEL_ALL, this.idleAnim, gameLocal.time, blendTime );
////	}
////}
////
/////*
////================
////idAfAttachment::Think
////================
////*/
////void idAFAttachment::Think( ) {
////	idAnimatedEntity::Think();
////	if ( thinkFlags & TH_UPDATEPARTICLES ) {
////		UpdateDamageEffects();
////	}
////}
////
/////*
////================
////idAFAttachment::SetCombatModel
////================
////*/
////void idAFAttachment::SetCombatModel( ) {
////	if ( this.combatModel ) {
////		this.combatModel.Unlink();
////		this.combatModel.LoadModel( modelDefHandle );
////	} else {
////		this.combatModel = new idClipModel( modelDefHandle );
////	}
////	this.combatModel.SetOwner( this.body );
////}
////
/////*
////================
////idAFAttachment::GetCombatModel
////================
////*/
////idClipModel *idAFAttachment::GetCombatModel( ) const {
////	return this.combatModel;
////}
////
/////*
////================
////idAFAttachment::LinkCombat
////================
////*/
////void idAFAttachment::LinkCombat( ) {
////	if ( fl.hidden ) {
////		return;
////	}
////
////	if ( this.combatModel ) {
////		this.combatModel.Link( gameLocal.clip, this, 0, renderEntity.origin, renderEntity.axis, modelDefHandle );
////	}
////}

/*
================
idAFAttachment::UnlinkCombat
================
*/
	UnlinkCombat ( ): void {
		if ( this.combatModel ) {
			this.combatModel.Unlink ( );
		}
	}


};


/*
===============================================================================

idAFEntity_Base

===============================================================================
*/

class idAFEntity_Base extends idAnimatedEntity {
////public:
////	CLASS_PROTOTYPE( idAFEntity_Base );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idAFEntity_Base>[];
////
////							idAFEntity_Base( );
////	virtual					~idAFEntity_Base( );
////
////	void					Spawn( );
////
//Save ( savefile: idSaveGame ): void { throw "placeholder"; }
////	void					Restore ( savefile: idRestoreGame ): void { throw "placeholder"; }
////
////	virtual void			Think( );
////	virtual void			GetImpactInfo( ent:idEntity, int id, const idVec3 &point, impactInfo_t *info );
////	virtual void			ApplyImpulse( ent:idEntity, int id, const idVec3 &point, const idVec3 &impulse );
////	virtual void			AddForce( ent:idEntity, int id, const idVec3 &point, const idVec3 &force );
////	virtual bool			Collide( const trace_t &collision, const idVec3 &velocity );
////	virtual bool			GetPhysicsToVisualTransform( idVec3 &origin, idMat3 &axis );
////	virtual bool			UpdateAnimationControllers( );
////	virtual void			FreeModelDef( );
////
////	virtual bool			LoadAF( );
////	bool					IsActiveAF( ) const { return af.IsActive(); }
////	const char *			GetAFName( ) const { return af.GetName(); }
////	idPhysics_AF *			GetAFPhysics( ) { return af.GetPhysics(); }
////
////	void					SetCombatModel( );
////	idClipModel *			GetCombatModel( ) const;
////							// contents of combatModel can be set to 0 or re-enabled (mp)
////	void					SetCombatContents( bool enable );
////	virtual void			LinkCombat( );
////	virtual void			UnlinkCombat( );
////
////	int						BodyForClipModelId( int id ) const;
////
////	void					SaveState( idDict &args ) const;
////	void					LoadState( const idDict &args );
////
////	void					AddBindConstraints( );
////	void					RemoveBindConstraints( );
////
////	virtual void			ShowEditingDialog( );
////
////	static void				DropAFs( ent:idEntity, const char *type, idList<idEntity *> *list );
////
////protected:
	af = new idAF;				// articulated figure
	combatModel:idClipModel;	// render model for hit detection
	combatModelContents :number/*int*/;
	spawnOrigin = new idVec3;	// spawn origin
	spawnAxis = new idMat3;		// rotation axis used when spawned
	nextSoundTime :number/*int*/;	// next time this can make a sound

	Event_SetConstraintPosition(name: string, pos: idVec3): void { throw "placeholder"; }

	
/*
================
idAFEntity_Base::idAFEntity_Base
================
*/
	constructor() {
		super ( );
		this.combatModel = null;
		this.combatModelContents = 0;
		this.nextSoundTime = 0;
		this.spawnOrigin.Zero();
		this.spawnAxis.Identity();
}

/////*
////================
////idAFEntity_Base::~idAFEntity_Base
////================
////*/
////idAFEntity_Base::~idAFEntity_Base( ) {
////	delete this.combatModel;
////	this.combatModel = NULL;
////}
////
/////*
////================
////idAFEntity_Base::Save
////================
////*/
////void idAFEntity_Base::Save( idSaveGame *savefile ) const {
////	savefile.WriteInt( this.combatModelContents );
////	savefile.WriteClipModel( this.combatModel );
////	savefile.WriteVec3( this.spawnOrigin );
////	savefile.WriteMat3( this.spawnAxis );
////	savefile.WriteInt( this.nextSoundTime );
////	af.Save( savefile );
////}
////
/////*
////================
////idAFEntity_Base::Restore
////================
////*/
////void idAFEntity_Base::Restore( idRestoreGame *savefile ) {
////	savefile.ReadInt( this.combatModelContents );
////	savefile.ReadClipModel( this.combatModel );
////	savefile.ReadVec3( this.spawnOrigin );
////	savefile.ReadMat3( this.spawnAxis );
////	savefile.ReadInt( this.nextSoundTime );
////	LinkCombat();
////
////	af.Restore( savefile );
////}

/*
================
idAFEntity_Base::Spawn
================
*/
Spawn( ):void {
	this.spawnOrigin = this.GetPhysics().GetOrigin();
	this.spawnAxis = this.GetPhysics().GetAxis();
	this.nextSoundTime = 0;
}

/////*
////================
////idAFEntity_Base::LoadAF
////================
////*/
////bool idAFEntity_Base::LoadAF( ) {
////	idStr fileName;
////
////	if ( !spawnArgs.GetString( "articulatedFigure", "*unknown*", fileName ) ) {
////		return false;
////	}
////
////	af.SetAnimator( GetAnimator() );
////	if ( !af.Load( this, fileName ) ) {
////		gameLocal.Error( "idAFEntity_Base::LoadAF: Couldn't load af file '%s' on entity '%s'", fileName.c_str(), name.c_str() );
////	}
////
////	af.Start();
////
////	af.GetPhysics().Rotate( spawnAxis.ToRotation() );
////	af.GetPhysics().Translate( this.spawnOrigin );
////
////	LoadState( spawnArgs );
////
////	af.UpdateAnimation();
////	this.animator.CreateFrame( gameLocal.time, true );
////	UpdateVisuals();
////
////	return true;
////}
////
/////*
////================
////idAFEntity_Base::Think
////================
////*/
////void idAFEntity_Base::Think( ) {
////	RunPhysics();
////	UpdateAnimation();
////	if ( thinkFlags & TH_UPDATEVISUALS ) {
////		Present();
////		LinkCombat();
////	}
////}
////
/////*
////================
////idAFEntity_Base::BodyForClipModelId
////================
////*/
////int idAFEntity_Base::BodyForClipModelId( /*int*/ id:number ) const {
////	return af.BodyForClipModelId( id );
////}
////
/////*
////================
////idAFEntity_Base::SaveState
////================
////*/
////void idAFEntity_Base::SaveState( idDict &args ) const {
////	const idKeyValue *kv;
////
////	// save the ragdoll pose
////	af.SaveState( args );
////
////	// save all the bind constraints
////	kv = spawnArgs.MatchPrefix( "bindConstraint ", NULL );
////	while ( kv ) {
////		args.Set( kv.GetKey(), kv.GetValue() );
////		kv = spawnArgs.MatchPrefix( "bindConstraint ", kv );
////	}
////
////	// save the bind if it exists
////	kv = spawnArgs.FindKey( "bind" );
////	if ( kv ) {
////		args.Set( kv.GetKey(), kv.GetValue() );
////	}
////	kv = spawnArgs.FindKey( "bindToJoint" );
////	if ( kv ) {
////		args.Set( kv.GetKey(), kv.GetValue() );
////	}
////	kv = spawnArgs.FindKey( "bindToBody" );
////	if ( kv ) {
////		args.Set( kv.GetKey(), kv.GetValue() );
////	}
////}
////
/////*
////================
////idAFEntity_Base::LoadState
////================
////*/
////void idAFEntity_Base::LoadState( const idDict &args ) {
////	af.LoadState( args );
////}
////
/////*
////================
////idAFEntity_Base::AddBindConstraints
////================
////*/
////void idAFEntity_Base::AddBindConstraints( ) {
////	af.AddBindConstraints();
////}
////
/////*
////================
////idAFEntity_Base::RemoveBindConstraints
////================
////*/
////void idAFEntity_Base::RemoveBindConstraints( ) {
////	af.RemoveBindConstraints();
////}
////
/////*
////================
////idAFEntity_Base::GetImpactInfo
////================
////*/
////void idAFEntity_Base::GetImpactInfo( ent:idEntity, /*int*/ id:number, const idVec3 &point, impactInfo_t *info ) {
////	if ( af.IsActive() ) {
////		af.GetImpactInfo( ent, id, point, info );
////	} else {
////		idEntity::GetImpactInfo( ent, id, point, info );
////	}
////}
////
/////*
////================
////idAFEntity_Base::ApplyImpulse
////================
////*/
////void idAFEntity_Base::ApplyImpulse( ent:idEntity, /*int*/ id:number, const idVec3 &point, const idVec3 &impulse ) {
////	if ( af.IsLoaded() ) {
////		af.ApplyImpulse( ent, id, point, impulse );
////	}
////	if ( !af.IsActive() ) {
////		idEntity::ApplyImpulse( ent, id, point, impulse );
////	}
////}
////
/////*
////================
////idAFEntity_Base::AddForce
////================
////*/
////void idAFEntity_Base::AddForce( ent:idEntity, /*int*/ id:number, const idVec3 &point, const idVec3 &force ) {
////	if ( af.IsLoaded() ) {
////		af.AddForce( ent, id, point, force );
////	}
////	if ( !af.IsActive() ) {
////		idEntity::AddForce( ent, id, point, force );
////	}
////}
////
/////*
////================
////idAFEntity_Base::Collide
////================
////*/
////bool idAFEntity_Base::Collide( const trace_t &collision, const idVec3 &velocity ) {
////	float v, f;
////
////	if ( af.IsActive() ) {
////		v = -( velocity * collision.c.normal );
////		if ( v > BOUNCE_SOUND_MIN_VELOCITY && gameLocal.time > this.nextSoundTime ) {
////			f = v > BOUNCE_SOUND_MAX_VELOCITY ? 1.0f : idMath::Sqrt( v - BOUNCE_SOUND_MIN_VELOCITY ) * ( 1.0f / idMath::Sqrt( BOUNCE_SOUND_MAX_VELOCITY - BOUNCE_SOUND_MIN_VELOCITY ) );
////			if ( StartSound( "snd_bounce", SND_CHANNEL_ANY, 0, false, NULL ) ) {
////				// don't set the volume unless there is a bounce sound as it overrides the entire channel
////				// which causes footsteps on ai's to not honor their shader parms
////				SetSoundVolume( f );
////			}
////			this.nextSoundTime = gameLocal.time + 500;
////		}
////	}
////
////	return false;
////}
////
/////*
////================
////idAFEntity_Base::GetPhysicsToVisualTransform
////================
////*/
////bool idAFEntity_Base::GetPhysicsToVisualTransform( idVec3 &origin, idMat3 &axis ) {
////	if ( af.IsActive() ) {
////		af.GetPhysicsToVisualTransform( origin, axis );
////		return true;
////	}
////	return idEntity::GetPhysicsToVisualTransform( origin, axis );
////}
////
/////*
////================
////idAFEntity_Base::UpdateAnimationControllers
////================
////*/
////bool idAFEntity_Base::UpdateAnimationControllers( ) {
////	if ( af.IsActive() ) {
////		if ( af.UpdateAnimation() ) {
////			return true;
////		}
////	}
////	return false;
////}
////
/////*
////================
////idAFEntity_Base::SetCombatModel
////================
////*/
////void idAFEntity_Base::SetCombatModel( ) {
////	if ( this.combatModel ) {
////		this.combatModel.Unlink();
////		this.combatModel.LoadModel( modelDefHandle );
////	} else {
////		this.combatModel = new idClipModel( modelDefHandle );
////	}
////}
////
/////*
////================
////idAFEntity_Base::GetCombatModel
////================
////*/
////idClipModel *idAFEntity_Base::GetCombatModel( ) const {
////	return this.combatModel;
////}
////
/////*
////================
////idAFEntity_Base::SetCombatContents
////================
////*/
////void idAFEntity_Base::SetCombatContents( bool enable ) {
////	assert( this.combatModel );
////	if ( enable && this.combatModelContents ) {
////		assert( !this.combatModel.GetContents() );
////		this.combatModel.SetContents( this.combatModelContents );
////		this.combatModelContents = 0;
////	} else if ( !enable && this.combatModel.GetContents() ) {
////		assert( !this.combatModelContents );
////		this.combatModelContents = this.combatModel.GetContents();
////		this.combatModel.SetContents( 0 );
////	}
////}
////
/////*
////================
////idAFEntity_Base::LinkCombat
////================
////*/
////void idAFEntity_Base::LinkCombat( ) {
////	if ( fl.hidden ) {
////		return;
////	}
////	if ( this.combatModel ) {
////		this.combatModel.Link( gameLocal.clip, this, 0, renderEntity.origin, renderEntity.axis, modelDefHandle );
////	}
////}
////
/////*
////================
////idAFEntity_Base::UnlinkCombat
////================
////*/
////void idAFEntity_Base::UnlinkCombat( ) {
////	if ( this.combatModel ) {
////		this.combatModel.Unlink();
////	}
////}
////
/////*
////================
////idAFEntity_Base::FreeModelDef
////================
////*/
////void idAFEntity_Base::FreeModelDef( ) {
////	UnlinkCombat();
////	idEntity::FreeModelDef();
////}
////
/////*
////===============
////idAFEntity_Base::ShowEditingDialog
////===============
////*/
////void idAFEntity_Base::ShowEditingDialog( ) {
////	common.InitTool( EDITOR_AF, &spawnArgs );
////}
////
/////*
////================
////idAFEntity_Base::DropAFs
////
////  The entity should have the following key/value pairs set:
////	"def_drop<type>AF"		"af def"
////	"drop<type>Skin"		"skin name"
////  To drop multiple articulated figures the following key/value pairs can be used:
////	"def_drop<type>AF*"		"af def"
////  where * is an aribtrary string.
////================
////*/
////void idAFEntity_Base::DropAFs( ent:idEntity, const char *type, idList<idEntity *> *list ) {
////	const idKeyValue *kv;
////	const char *skinName;
////	idEntity *newEnt;
////	idAFEntity_Base *af;
////	idDict args;
////	const idDeclSkin *skin;
////
////	// drop the articulated figures
////	kv = ent.spawnArgs.MatchPrefix( va( "def_drop%sAF", type ), NULL );
////	while ( kv ) {
////
////		args.Set( "classname", kv.GetValue() );
////		gameLocal.SpawnEntityDef( args, &newEnt );
////
////		if ( newEnt && newEnt.IsType( idAFEntity_Base::Type ) ) {
////			af = static_cast<idAFEntity_Base *>(newEnt);
////			af.GetPhysics().SetOrigin( ent.GetPhysics().GetOrigin() );
////			af.GetPhysics().SetAxis( ent.GetPhysics().GetAxis() );
////			af.af.SetupPose( ent, gameLocal.time );
////			if ( list ) {
////				list.Append( af );
////			}
////		}
////
////		kv = ent.spawnArgs.MatchPrefix( va( "def_drop%sAF", type ), kv );
////	}
////
////	// change the skin to hide all the dropped articulated figures
////	skinName = ent.spawnArgs.GetString( va( "skin_drop%s", type ) );
////	if ( skinName[0] ) {
////		skin = declManager.FindSkin( skinName );
////		ent.SetSkin( skin );
////	}
////}
////
/////*
////================
////idAFEntity_Base::Event_SetConstraintPosition
////================
////*/
////void idAFEntity_Base::Event_SetConstraintPosition( name:string, pos:idVec3 ) {
////	af.SetConstraintPosition( name, pos );
////}
////
};
////
/////*
////===============================================================================
////
////idAFEntity_Gibbable
////
////===============================================================================
////*/
////
////extern const idEventDef		EV_Gib;
////extern const idEventDef		EV_Gibbed;
////
class idAFEntity_Gibbable extends idAFEntity_Base {
////public:
////	CLASS_PROTOTYPE( idAFEntity_Gibbable );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idAFEntity_Gibbable>[];
////
////							idAFEntity_Gibbable( );
////							~idAFEntity_Gibbable( );
////
////	void					Spawn( );
//Save ( savefile: idSaveGame ): void { throw "placeholder"; }
////	void					Restore ( savefile: idRestoreGame ): void { throw "placeholder"; }
////	virtual void			Present( );
////	virtual	void			Damage( idEntity *inflictor, idEntity *attacker, const idVec3 &dir, const char *damageDefName, const float damageScale, const int location );
////	virtual void			SpawnGibs( const idVec3 &dir, const char *damageDefName );
////
////protected:
	skeletonModel: idRenderModel;
	skeletonModelDefHandle :number/*int*/;
	gibbed:boolean;

////	virtual void			Gib( const idVec3 &dir, const char *damageDefName );
////	void					InitSkeletonModel( );
////
	Event_Gib(damageDefName: string): void { throw "placeholder"; }
	

/*
================
idAFEntity_Gibbable::idAFEntity_Gibbable
================
*/
	constructor() {
		super ( );
	this.skeletonModel = null;
	this.skeletonModelDefHandle = -1;
	this.gibbed = false;
}

/*
================
idAFEntity_Gibbable::~idAFEntity_Gibbable
================
*/
destructor():void {
	if ( this.skeletonModelDefHandle != -1 ) {
		gameRenderWorld.FreeEntityDef( this.skeletonModelDefHandle );
		this.skeletonModelDefHandle = -1;
	}
}
//
///*
////================
////idAFEntity_Gibbable::Save
////================
////*/
////void idAFEntity_Gibbable::Save( idSaveGame *savefile ) const {
////	savefile.WriteBool( this.gibbed );
////	savefile.WriteBool( this.combatModel != NULL );
////}
////
/////*
////================
////idAFEntity_Gibbable::Restore
////================
////*/
////void idAFEntity_Gibbable::Restore( idRestoreGame *savefile ) {
////	bool hasCombatModel;
////
////	savefile.ReadBool( this.gibbed );
////	savefile.ReadBool( hasCombatModel );
////
////	InitSkeletonModel();
////
////	if ( hasCombatModel ) {
////		SetCombatModel();
////		LinkCombat();
////	}
////}

/*
================
idAFEntity_Gibbable::Spawn
================
*/
Spawn( ):void {
	this.InitSkeletonModel();

	this.gibbed = false;
}

/*
================
idAFEntity_Gibbable::InitSkeletonModel
================
*/
	InitSkeletonModel(): void {
		todoThrow ( );
		//const char *modelName;
		//const idDeclModelDef *modelDef;

		//this.skeletonModel = NULL;
		//this.skeletonModelDefHandle = -1;

		//modelName = spawnArgs.GetString( "model_gib" );

		//modelDef = NULL;
		//if ( modelName[0] != '\0' ) {
		//	modelDef = static_cast<const idDeclModelDef *>( declManager.FindType( DECL_MODELDEF, modelName, false ) );
		//	if ( modelDef ) {
		//		this.skeletonModel = modelDef.ModelHandle();
		//	} else {
		//		this.skeletonModel = renderModelManager.FindModel( modelName );
		//	}
		//	if ( this.skeletonModel != NULL && renderEntity.hModel != NULL ) {
		//		if ( this.skeletonModel.NumJoints() != renderEntity.hModel.NumJoints() ) {
		//			gameLocal.Error( "gib model '%s' has different number of joints than model '%s'",
		//								this.skeletonModel.Name(), renderEntity.hModel.Name() );
		//		}
		//	}
		//}
	}
////
/////*
////================
////idAFEntity_Gibbable::Present
////================
////*/
////void idAFEntity_Gibbable::Present( ) {
////	renderEntity_t skeleton;
////
////	if ( !gameLocal.isNewFrame ) {
////		return;
////	}
////
////	// don't present to the renderer if the entity hasn't changed
////	if ( !( thinkFlags & TH_UPDATEVISUALS ) ) {
////		return;
////	}
////
////	// update skeleton model
////	if ( this.gibbed && !IsHidden() && this.skeletonModel != NULL ) {
////		skeleton = renderEntity;
////		skeleton.hModel = this.skeletonModel;
////		// add to refresh list
////		if ( this.skeletonModelDefHandle == -1 ) {
////			this.skeletonModelDefHandle = gameRenderWorld.AddEntityDef( &skeleton );
////		} else {
////			gameRenderWorld.UpdateEntityDef( this.skeletonModelDefHandle, &skeleton );
////		}
////	}
////
////	idEntity::Present();
////}
////
/////*
////================
////idAFEntity_Gibbable::Damage
////================
////*/
////void idAFEntity_Gibbable::Damage( idEntity *inflictor, idEntity *attacker, const idVec3 &dir, const char *damageDefName, const float damageScale, const int location ) {
////	if ( !fl.takedamage ) {
////		return;
////	}
////	idAFEntity_Base::Damage( inflictor, attacker, dir, damageDefName, damageScale, location );
////	if ( health < -20 && spawnArgs.GetBool( "gib" ) ) {
////		Gib( dir, damageDefName );
////	}
////}
////
/////*
////=====================
////idAFEntity_Gibbable::SpawnGibs
////=====================
////*/
////void idAFEntity_Gibbable::SpawnGibs( const idVec3 &dir, const char *damageDefName ) {
////	var/*int*/i:number;
////	bool gibNonSolid;
////	idVec3 entityCenter, velocity;
////	idList<idEntity *> list;
////
////	assert( !gameLocal.isClient );
////
////	const idDict *damageDef = gameLocal.FindEntityDefDict( damageDefName );
////	if ( !damageDef ) {
////		gameLocal.Error( "Unknown damageDef '%s'", damageDefName );
////	}
////
////	// spawn gib articulated figures
////	idAFEntity_Base::DropAFs( this, "gib", &list );
////
////	// spawn gib items
////	idMoveableItem::DropItems( this, "gib", &list );
////
////	// blow out the gibs in the given direction away from the center of the entity
////	entityCenter = this.GetPhysics().GetAbsBounds().GetCenter();
////	gibNonSolid = damageDef.GetBool( "gibNonSolid" );
////	for ( i = 0; i < list.Num(); i++ ) {
////		if ( gibNonSolid ) {
////			list[i].GetPhysics().SetContents( 0 );
////			list[i].GetPhysics().SetClipMask( 0 );
////			list[i].GetPhysics().UnlinkClip();
////			list[i].GetPhysics().PutToRest();
////		} else {
////			list[i].GetPhysics().SetContents( CONTENTS_CORPSE );
////			list[i].GetPhysics().SetClipMask( CONTENTS_SOLID );
////			velocity = list[i].GetPhysics().GetAbsBounds().GetCenter() - entityCenter;
////			velocity.NormalizeFast();
////			velocity += ( i & 1 ) ? dir : -dir;
////			list[i].GetPhysics().SetLinearVelocity( velocity * 75.0f );
////		}
////		list[i].GetRenderEntity().noShadow = true;
////		list[i].GetRenderEntity().shaderParms[ SHADERPARM_TIME_OF_DEATH ] = gameLocal.time * 0.001f;
////		list[i].PostEventSec( &EV_Remove, 4.0f );
////	}
////}
////
/////*
////============
////idAFEntity_Gibbable::Gib
////============
////*/
////void idAFEntity_Gibbable::Gib( const idVec3 &dir, const char *damageDefName ) {
////	// only gib once
////	if ( this.gibbed ) {
////		return;
////	}
////
////	const idDict *damageDef = gameLocal.FindEntityDefDict( damageDefName );
////	if ( !damageDef ) {
////		gameLocal.Error( "Unknown damageDef '%s'", damageDefName );
////	}
////
////	if ( damageDef.GetBool( "gibNonSolid" ) ) {
////		GetAFPhysics().SetContents( 0 );
////		GetAFPhysics().SetClipMask( 0 );
////		GetAFPhysics().UnlinkClip();
////		GetAFPhysics().PutToRest();
////	} else {
////		GetAFPhysics().SetContents( CONTENTS_CORPSE );
////		GetAFPhysics().SetClipMask( CONTENTS_SOLID );
////	}
////
////	UnlinkCombat();
////
////	if ( g_bloodEffects.GetBool() ) {
////		if ( gameLocal.time > gameLocal.GetGibTime() ) {
////			gameLocal.SetGibTime( gameLocal.time + GIB_DELAY );
////			SpawnGibs( dir, damageDefName );
////			renderEntity.noShadow = true;
////			renderEntity.shaderParms[ SHADERPARM_TIME_OF_DEATH ] = gameLocal.time * 0.001f;
////			StartSound( "snd_gibbed", SND_CHANNEL_ANY, 0, false, NULL );
////			this.gibbed = true;
////		}
////	} else {
////		this.gibbed = true;
////	}
////
////
////	PostEventSec( &EV_Gibbed, 4.0f );
////}
////
/////*
////============
////idAFEntity_Gibbable::Event_Gib
////============
////*/
////void idAFEntity_Gibbable::Event_Gib( const char *damageDefName ) {
////	Gib( idVec3( 0, 0, 1 ), damageDefName );
////}
};

/*
===============================================================================

	idAFEntity_Generic

===============================================================================
*/

class idAFEntity_Generic extends  idAFEntity_Gibbable
{
////public:
////	CLASS_PROTOTYPE( idAFEntity_Generic );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idAFEntity_Generic>[];
////
////							idAFEntity_Generic( );
////							~idAFEntity_Generic( );
////
////	void					Spawn( );
////
//Save ( savefile: idSaveGame ): void { throw "placeholder"; }
////	void					Restore ( savefile: idRestoreGame ): void { throw "placeholder"; }
////
////	virtual void			Think( );
	KeepRunningPhysics( ):void { this.keepRunningPhysics = true; }
////
////private:
	Event_Activate(activator: idEntity): void { throw "placeholder"; }

	keepRunningPhysics: boolean;


/*
================
idAFEntity_Generic::idAFEntity_Generic
================
*/
	constructor() {
		super ( );
	this.keepRunningPhysics = false;
}
////
/////*
////================
////idAFEntity_Generic::~idAFEntity_Generic
////================
////*/
////idAFEntity_Generic::~idAFEntity_Generic( ) {
////}
////
/////*
////================
////idAFEntity_Generic::Save
////================
////*/
////void idAFEntity_Generic::Save( idSaveGame *savefile ) const {
////	savefile.WriteBool( this.keepRunningPhysics );
////}
////
/////*
////================
////idAFEntity_Generic::Restore
////================
////*/
////void idAFEntity_Generic::Restore( idRestoreGame *savefile ) {
////	savefile.ReadBool( this.keepRunningPhysics );
////}
////
/////*
////================
////idAFEntity_Generic::Think
////================
////*/
////void idAFEntity_Generic::Think( ) {
////	idAFEntity_Base::Think();
////
////	if ( this.keepRunningPhysics ) {
////		BecomeActive( TH_PHYSICS );
////	}
////}

/*
================
idAFEntity_Generic::Spawn
================
*/
	Spawn(): void {
		todoThrow();
	//if ( !LoadAF() ) {
	//	gameLocal.Error( "Couldn't load af file on entity '%s'", name.c_str() );
	//}

	//SetCombatModel();

	//SetPhysics( af.GetPhysics() );

	//af.GetPhysics().PutToRest();
	//if ( !spawnArgs.GetBool( "nodrop", "0" ) ) {
	//	af.GetPhysics().Activate();
	//}

	//fl.takedamage = true;
}
////
/////*
////================
////idAFEntity_Generic::Event_Activate
////================
////*/
////void idAFEntity_Generic::Event_Activate( activator:idEntity ) {
////	float delay;
////	idVec3 init_velocity, init_avelocity;
////
////	Show();
////
////	af.GetPhysics().EnableImpact();
////	af.GetPhysics().Activate();
////
////	spawnArgs.GetVector( "init_velocity", "0 0 0", init_velocity );
////	spawnArgs.GetVector( "init_avelocity", "0 0 0", init_avelocity );
////
////	delay = spawnArgs.GetFloat( "init_velocityDelay", "0" );
////	if ( delay == 0.0f ) {
////		af.GetPhysics().SetLinearVelocity( init_velocity );
////	} else {
////		PostEventSec( &EV_SetLinearVelocity, delay, init_velocity );
////	}
////
////	delay = spawnArgs.GetFloat( "init_avelocityDelay", "0" );
////	if ( delay == 0.0f ) {
////		af.GetPhysics().SetAngularVelocity( init_avelocity );
////	} else {
////		PostEventSec( &EV_SetAngularVelocity, delay, init_avelocity );
////	}
////}
////
////
};


/*
===============================================================================

idAFEntity_WithAttachedHead

===============================================================================
*/

class idAFEntity_WithAttachedHead extends  idAFEntity_Gibbable {
////public:
////	CLASS_PROTOTYPE( idAFEntity_WithAttachedHead );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idAFEntity_WithAttachedHead>[];
////
////							idAFEntity_WithAttachedHead();
////							~idAFEntity_WithAttachedHead();
////
////	void					Spawn( );
////
//Save ( savefile: idSaveGame ): void { throw "placeholder"; }
////	void					Restore ( savefile: idRestoreGame ): void { throw "placeholder"; }
////
////	void					SetupHead( );
////
////	virtual void			Think( );
////
////	virtual void			Hide( );
////	virtual void			Show( );
////	virtual void			ProjectOverlay( const idVec3 &origin, const idVec3 &dir, float size, const char *material );
////
////	virtual void			LinkCombat( );
////	virtual void			UnlinkCombat( );
////
////protected:
////	virtual void			Gib( const idVec3 &dir, const char *damageDefName );
////
////private:
	head:idEntityPtr<idAFAttachment>;

	Event_Gib( damageDefName:string ): void { throw "placeholder"; }
	Event_Activate(activator: idEntity): void { throw "placeholder"; }


/*
================
idAFEntity_WithAttachedHead::idAFEntity_WithAttachedHead
================
*/
	constructor() {
		super ( );
	this.head = null;
}

/*
================
idAFEntity_WithAttachedHead::~idAFEntity_WithAttachedHead
================
*/
destructor():void {
	if ( this.head.GetEntity() ) {
		this.head.GetEntity().ClearBody();
		this.head.GetEntity().PostEventMS( EV_Remove, 0 );
	}
}

/*
================
idAFEntity_WithAttachedHead::Spawn
================
*/
	Spawn(): void {
	//	todoThrow();
	//SetupHead();

	//LoadAF();

	//SetCombatModel();

	//SetPhysics( af.GetPhysics() );

	//af.GetPhysics().PutToRest();
	//if ( !spawnArgs.GetBool( "nodrop", "0" ) ) {
	//	af.GetPhysics().Activate();
	//}

	//fl.takedamage = true;

	//if ( this.head.GetEntity() ) {
	//	int anim = this.head.GetEntity().GetAnimator().GetAnim( "dead" );

	//	if ( anim ) {
	//		this.head.GetEntity().GetAnimator().SetFrame( ANIMCHANNEL_ALL, anim, 0, gameLocal.time, 0 );
	//	}
	//}
}

/////*
////================
////idAFEntity_WithAttachedHead::Save
////================
////*/
////void idAFEntity_WithAttachedHead::Save( idSaveGame *savefile ) const {
////	this.head.Save( savefile );
////}
////
/////*
////================
////idAFEntity_WithAttachedHead::Restore
////================
////*/
////void idAFEntity_WithAttachedHead::Restore( idRestoreGame *savefile ) {
////	this.head.Restore( savefile );
////}
////
/////*
////================
////idAFEntity_WithAttachedHead::SetupHead
////================
////*/
////void idAFEntity_WithAttachedHead::SetupHead( ) {
////	idAFAttachment		*headEnt;
////	idStr				jointName;
////	const char			*headModel;
////	jointHandle_t		joint;
////	idVec3				origin;
////	idMat3				axis;
////
////	headModel = spawnArgs.GetString( "def_head", "" );
////	if ( headModel[ 0 ] ) {
////		jointName = spawnArgs.GetString( "head_joint" );
////		joint = this.animator.GetJointHandle( jointName );
////		if ( joint == jointHandle_t.INVALID_JOINT ) {
////			gameLocal.Error( "Joint '%s' not found for 'head_joint' on '%s'", jointName.c_str(), name.c_str() );
////		}
////
////		headEnt = static_cast<idAFAttachment *>( gameLocal.SpawnEntityType( idAFAttachment::Type, NULL ) );
////		headEnt.SetName( va( "%s_head", name.c_str() ) );
////		headEnt.SetBody( this, headModel, joint );
////		headEnt.SetCombatModel();
////		this.head = headEnt;
////
////		this.animator.GetJointTransform( joint, gameLocal.time, origin, axis );
////		origin = renderEntity.origin + origin * renderEntity.axis;
////		headEnt.SetOrigin( origin );
////		headEnt.SetAxis( renderEntity.axis );
////		headEnt.BindToJoint( this, joint, true );
////	}
////}
////
/////*
////================
////idAFEntity_WithAttachedHead::Think
////================
////*/
////void idAFEntity_WithAttachedHead::Think( ) {
////	idAFEntity_Base::Think();
////}
////
/////*
////================
////idAFEntity_WithAttachedHead::LinkCombat
////================
////*/
////void idAFEntity_WithAttachedHead::LinkCombat( ) {
////	idAFAttachment *headEnt;
////
////	if ( fl.hidden ) {
////		return;
////	}
////
////	if ( this.combatModel ) {
////		this.combatModel.Link( gameLocal.clip, this, 0, renderEntity.origin, renderEntity.axis, modelDefHandle );
////	}
////	headEnt = this.head.GetEntity();
////	if ( headEnt ) {
////		headEnt.LinkCombat();
////	}
////}
////
/////*
////================
////idAFEntity_WithAttachedHead::UnlinkCombat
////================
////*/
////void idAFEntity_WithAttachedHead::UnlinkCombat( ) {
////	idAFAttachment *headEnt;
////
////	if ( this.combatModel ) {
////		this.combatModel.Unlink();
////	}
////	headEnt = this.head.GetEntity();
////	if ( headEnt ) {
////		headEnt.UnlinkCombat();
////	}
////}
////
/////*
////================
////idAFEntity_WithAttachedHead::Hide
////================
////*/
////void idAFEntity_WithAttachedHead::Hide( ) {
////	idAFEntity_Base::Hide();
////	if ( this.head.GetEntity() ) {
////		this.head.GetEntity().Hide();
////	}
////	UnlinkCombat();
////}
////
/////*
////================
////idAFEntity_WithAttachedHead::Show
////================
////*/
////void idAFEntity_WithAttachedHead::Show( ) {
////	idAFEntity_Base::Show();
////	if ( this.head.GetEntity() ) {
////		this.head.GetEntity().Show();
////	}
////	LinkCombat();
////}
////
/////*
////================
////idAFEntity_WithAttachedHead::ProjectOverlay
////================
////*/
////void idAFEntity_WithAttachedHead::ProjectOverlay( const idVec3 &origin, const idVec3 &dir, float size, const char *material ) {
////
////	idEntity::ProjectOverlay( origin, dir, size, material );
////
////	if ( this.head.GetEntity() ) {
////		this.head.GetEntity().ProjectOverlay( origin, dir, size, material );
////	}
////}
////
/////*
////============
////idAFEntity_WithAttachedHead::Gib
////============
////*/
////void idAFEntity_WithAttachedHead::Gib( const idVec3 &dir, const char *damageDefName ) {
////	// only gib once
////	if ( this.gibbed ) {
////		return;
////	}
////	idAFEntity_Gibbable::Gib( dir, damageDefName );
////	if ( this.head.GetEntity() ) {
////		this.head.GetEntity().Hide();
////	}
////}
////
/////*
////============
////idAFEntity_WithAttachedHead::Event_Gib
////============
////*/
////void idAFEntity_WithAttachedHead::Event_Gib( const char *damageDefName ) {
////	Gib( idVec3( 0, 0, 1 ), damageDefName );
////}
////
/////*
////================
////idAFEntity_WithAttachedHead::Event_Activate
////================
////*/
////void idAFEntity_WithAttachedHead::Event_Activate( activator:idEntity ) {
////	float delay;
////	idVec3 init_velocity, init_avelocity;
////
////	Show();
////
////	af.GetPhysics().EnableImpact();
////	af.GetPhysics().Activate();
////
////	spawnArgs.GetVector( "init_velocity", "0 0 0", init_velocity );
////	spawnArgs.GetVector( "init_avelocity", "0 0 0", init_avelocity );
////
////	delay = spawnArgs.GetFloat( "init_velocityDelay", "0" );
////	if ( delay == 0.0f ) {
////		af.GetPhysics().SetLinearVelocity( init_velocity );
////	} else {
////		PostEventSec( &EV_SetLinearVelocity, delay, init_velocity );
////	}
////
////	delay = spawnArgs.GetFloat( "init_avelocityDelay", "0" );
////	if ( delay == 0.0f ) {
////		af.GetPhysics().SetAngularVelocity( init_avelocity );
////	} else {
////		PostEventSec( &EV_SetAngularVelocity, delay, init_avelocity );
////	}
////}
////
};


/*
===============================================================================

idAFEntity_Vehicle

===============================================================================
*/

class idAFEntity_Vehicle extends idAFEntity_Base {
////public:
////	CLASS_PROTOTYPE( idAFEntity_Vehicle );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idAFEntity_Vehicle>[];
////
////							idAFEntity_Vehicle( );
////
////	void					Spawn( );
////	void					Use( idPlayer *player );
////
////protected:
////	idPlayer *				player;
////	jointHandle_t			eyesJoint;
////	jointHandle_t			steeringWheelJoint;
////	float					wheelRadius;
////	float					steerAngle;
////	float					steerSpeed;
////	const idDeclParticle *	dustSmoke;
////
////	float					GetSteerAngle( );
	
/*
================
idAFEntity_Vehicle::idAFEntity_Vehicle
================
*/
	constructor() {
		super ( );
		todoThrow ( );
	//player				= NULL;
	//eyesJoint			= jointHandle_t.INVALID_JOINT;
	//steeringWheelJoint	= jointHandle_t.INVALID_JOINT;
	//wheelRadius			= 0.0f;
	//steerAngle			= 0.0f;
	//steerSpeed			= 0.0f;
	//dustSmoke			= NULL;
}

/////*
////================
////idAFEntity_Vehicle::Spawn
////================
////*/
	Spawn(): void {
		todoThrow();
////	const char *eyesJointName = spawnArgs.GetString( "eyesJoint", "eyes" );
////	const char *steeringWheelJointName = spawnArgs.GetString( "steeringWheelJoint", "steeringWheel" );
////
////	LoadAF();
////
////	SetCombatModel();
////
////	SetPhysics( af.GetPhysics() );
////
////	fl.takedamage = true;
////
////	if ( !eyesJointName[0] ) {
////		gameLocal.Error( "idAFEntity_Vehicle '%s' no eyes joint specified", name.c_str() );
////	}
////	eyesJoint = this.animator.GetJointHandle( eyesJointName );
////	if ( !steeringWheelJointName[0] ) {
////		gameLocal.Error( "idAFEntity_Vehicle '%s' no steering wheel joint specified", name.c_str() );
////	}
////	steeringWheelJoint = this.animator.GetJointHandle( steeringWheelJointName );
////
////	spawnArgs.GetFloat( "wheelRadius", "20", wheelRadius );
////	spawnArgs.GetFloat( "steerSpeed", "5", steerSpeed ); 
////
////	player = NULL;
////	steerAngle = 0.0f;
////
////	const char *smokeName = spawnArgs.GetString( "smoke_vehicle_dust", "muzzlesmoke" );
////	if ( *smokeName != '\0' ) {
////		dustSmoke = static_cast<const idDeclParticle *>( declManager.FindType( DECL_PARTICLE, smokeName ) );
////	}
}
////
/////*
////================
////idAFEntity_Vehicle::Use
////================
////*/
////void idAFEntity_Vehicle::Use( idPlayer *other ) {
////	idVec3 origin;
////	idMat3 axis;
////
////	if ( player ) {
////		if ( player == other ) {
////			other.Unbind();
////			player = NULL;
////
////			af.GetPhysics().SetComeToRest( true );
////		}
////	}
////	else {
////		player = other;
////		this.animator.GetJointTransform( eyesJoint, gameLocal.time, origin, axis );
////		origin = renderEntity.origin + origin * renderEntity.axis;
////		player.GetPhysics().SetOrigin( origin );
////		player.BindToBody( this, 0, true );
////
////		af.GetPhysics().SetComeToRest( false );
////		af.GetPhysics().Activate();
////	}
////}
////
/////*
////================
////idAFEntity_Vehicle::GetSteerAngle
////================
////*/
////float idAFEntity_Vehicle::GetSteerAngle( ) {
////	float idealSteerAngle, angleDelta;
////
////	idealSteerAngle = player.usercmd.rightmove * ( 30.0f / 128.0f );
////	angleDelta = idealSteerAngle - steerAngle;
////
////	if ( angleDelta > steerSpeed ) {
////		steerAngle += steerSpeed;
////	} else if ( angleDelta < -steerSpeed ) {
////		steerAngle -= steerSpeed;
////	} else {
////		steerAngle = idealSteerAngle;
////	}
////
////	return steerAngle;
////}
////
};


/*
===============================================================================

idAFEntity_VehicleSimple

===============================================================================
*/

class idAFEntity_VehicleSimple extends idAFEntity_Vehicle {
////public:
////	CLASS_PROTOTYPE( idAFEntity_VehicleSimple );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idAFEntity_VehicleSimple>[];
////
////							idAFEntity_VehicleSimple( );
////							~idAFEntity_VehicleSimple( );
////
////	void					Spawn( );
////	virtual void			Think( );
////
////protected:
////	idClipModel *			wheelModel;
////	idAFConstraint_Suspension *	suspension[4];
////	jointHandle_t			wheelJoints[4];
////	float					wheelAngles[4];
	
/*
================
idAFEntity_VehicleSimple::idAFEntity_VehicleSimple
================
*/
	constructor() {
		super ( );
		todoThrow ( );
	//var/*int*/i:number;
	//for ( i = 0; i < 4; i++ ) {
	//	suspension[i] = NULL;
	//}
}

/////*
////================
////idAFEntity_VehicleSimple::~idAFEntity_VehicleSimple
////================
////*/
////idAFEntity_VehicleSimple::~idAFEntity_VehicleSimple( ) {
////	delete wheelModel;
////	wheelModel = NULL;
////}
////
/////*
////================
////idAFEntity_VehicleSimple::Spawn
////================
////*/
	Spawn(): void {
		todoThrow();
////	static const char *wheelJointKeys[] = {
////		"wheelJointFrontLeft",
////		"wheelJointFrontRight",
////		"wheelJointRearLeft",
////		"wheelJointRearRight"
////	};
////	static idVec3 wheelPoly[4] = { idVec3( 2, 2, 0 ), idVec3( 2, -2, 0 ), idVec3( -2, -2, 0 ), idVec3( -2, 2, 0 ) };
////
////	var/*int*/i:number;
////	idVec3 origin;
////	idMat3 axis;
////	idTraceModel trm;
////
////	trm.SetupPolygon( wheelPoly, 4 );
////	trm.Translate( idVec3( 0, 0, -wheelRadius ) );
////	wheelModel = new idClipModel( trm );
////
////	for ( i = 0; i < 4; i++ ) {
////		const char *wheelJointName = spawnArgs.GetString( wheelJointKeys[i], "" );
////		if ( !wheelJointName[0] ) {
////			gameLocal.Error( "idAFEntity_VehicleSimple '%s' no '%s' specified", name.c_str(), wheelJointKeys[i] );
////		}
////		wheelJoints[i] = this.animator.GetJointHandle( wheelJointName );
////		if ( wheelJoints[i] == jointHandle_t.INVALID_JOINT ) {
////			gameLocal.Error( "idAFEntity_VehicleSimple '%s' can't find wheel joint '%s'", name.c_str(), wheelJointName );
////		}
////
////		GetAnimator().GetJointTransform( wheelJoints[i], 0, origin, axis );
////		origin = renderEntity.origin + origin * renderEntity.axis;
////
////		suspension[i] = new idAFConstraint_Suspension();
////		suspension[i].Setup( va( "suspension%d", i ), af.GetPhysics().GetBody( 0 ), origin, af.GetPhysics().GetAxis( 0 ), wheelModel );
////		suspension[i].SetSuspension(	g_vehicleSuspensionUp.GetFloat(),
////										g_vehicleSuspensionDown.GetFloat(),
////										g_vehicleSuspensionKCompress.GetFloat(),
////										g_vehicleSuspensionDamping.GetFloat(),
////										g_vehicleTireFriction.GetFloat() );
////
////		af.GetPhysics().AddConstraint( suspension[i] );
////	}
////
////	memset( wheelAngles, 0, sizeof( wheelAngles ) );
////	BecomeActive( TH_THINK );
}
////
/////*
////================
////idAFEntity_VehicleSimple::Think
////================
////*/
////void idAFEntity_VehicleSimple::Think( ) {
////	var/*int*/i:number;
////	float force = 0.0f, velocity = 0.0f, steerAngle = 0.0f;
////	idVec3 origin;
////	idMat3 axis;
////	idRotation wheelRotation, steerRotation;
////
////	if ( thinkFlags & TH_THINK ) {
////
////		if ( player ) {
////			// capture the input from a player
////			velocity = g_vehicleVelocity.GetFloat();
////			if ( player.usercmd.forwardmove < 0 ) {
////				velocity = -velocity;
////			}
////			force = idMath::Fabs( player.usercmd.forwardmove * g_vehicleForce.GetFloat() ) * (1.0f / 128.0f);
////			steerAngle = GetSteerAngle();
////		}
////
////		// update the wheel motor force and steering
////		for ( i = 0; i < 2; i++ ) {
////
////			// front wheel drive
////			if ( velocity != 0.0f ) {
////				suspension[i].EnableMotor( true );
////			} else {
////				suspension[i].EnableMotor( false );
////			}
////			suspension[i].SetMotorVelocity( velocity );
////			suspension[i].SetMotorForce( force );
////
////			// update the wheel steering
////			suspension[i].SetSteerAngle( steerAngle );
////		}
////
////		// adjust wheel velocity for better steering because there are no differentials between the wheels
////		if ( steerAngle < 0.0f ) {
////			suspension[0].SetMotorVelocity( velocity * 0.5f );
////		} else if ( steerAngle > 0.0f ) {
////			suspension[1].SetMotorVelocity( velocity * 0.5f );
////		}
////
////		// update suspension with latest cvar settings
////		for ( i = 0; i < 4; i++ ) {
////			suspension[i].SetSuspension(	g_vehicleSuspensionUp.GetFloat(),
////											g_vehicleSuspensionDown.GetFloat(),
////											g_vehicleSuspensionKCompress.GetFloat(),
////											g_vehicleSuspensionDamping.GetFloat(),
////											g_vehicleTireFriction.GetFloat() );
////		}
////
////		// run the physics
////		RunPhysics();
////
////		// move and rotate the wheels visually
////		for ( i = 0; i < 4; i++ ) {
////			idAFBody *body = af.GetPhysics().GetBody( 0 );
////
////			origin = suspension[i].GetWheelOrigin();
////			velocity = body.GetPointVelocity( origin ) * body.GetWorldAxis()[0];
////			wheelAngles[i] += velocity * MS2SEC( gameLocal.msec ) / wheelRadius;
////
////			// additional rotation about the wheel axis
////			wheelRotation.SetAngle( RAD2DEG( wheelAngles[i] ) );
////			wheelRotation.SetVec( 0, -1, 0 );
////
////			if ( i < 2 ) {
////				// rotate the wheel for steering
////				steerRotation.SetAngle( steerAngle );
////				steerRotation.SetVec( 0, 0, 1 );
////				// set wheel rotation
////				this.animator.SetJointAxis( wheelJoints[i], JOINTMOD_WORLD, wheelRotation.ToMat3() * steerRotation.ToMat3() );
////			} else {
////				// set wheel rotation
////				this.animator.SetJointAxis( wheelJoints[i], JOINTMOD_WORLD, wheelRotation.ToMat3() );
////			}
////
////			// set wheel position for suspension
////			origin = ( origin - renderEntity.origin ) * renderEntity.axis.Transpose();
////			GetAnimator().SetJointPos( wheelJoints[i], JOINTMOD_WORLD_OVERRIDE, origin );
////		}
/////*
////		// spawn dust particle effects
////		if ( force != 0.0f && !( gameLocal.framenum & 7 ) ) {
////			int numContacts;
////			idAFConstraint_Contact *contacts[2];
////			for ( i = 0; i < 4; i++ ) {
////				numContacts = af.GetPhysics().GetBodyContactConstraints( wheels[i].GetClipModel().GetId(), contacts, 2 );
////				for ( int j = 0; j < numContacts; j++ ) {
////					gameLocal.smokeParticles.EmitSmoke( dustSmoke, gameLocal.time, gameLocal.random.RandomFloat(), contacts[j].GetContact().point, contacts[j].GetContact().normal.ToMat3() );
////				}
////			}
////		}
////*/
////	}
////
////	UpdateAnimation();
////	if ( thinkFlags & TH_UPDATEVISUALS ) {
////		Present();
////		LinkCombat();
////	}
////}
////
////
};


/*
===============================================================================

idAFEntity_VehicleFourWheels

===============================================================================
*/

class idAFEntity_VehicleFourWheels extends idAFEntity_Vehicle {
////public:
////	CLASS_PROTOTYPE( idAFEntity_VehicleFourWheels );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idAFEntity_VehicleFourWheels>[];
////
////							idAFEntity_VehicleFourWheels( );
////
////	void					Spawn( );
////	virtual void			Think( );
////
////protected:
////	idAFBody *				wheels[4];
////	idAFConstraint_Hinge *	steering[2];
////	jointHandle_t			wheelJoints[4];
////	float					wheelAngles[4];

	
/*
================
idAFEntity_VehicleFourWheels::idAFEntity_VehicleFourWheels
================
*/
	constructor() {
		super ( );
		todoThrow ( );
	//var/*int*/i:number;

	//for ( i = 0; i < 4; i++ ) {
	//	wheels[i]		= NULL;
	//	wheelJoints[i]	= jointHandle_t.INVALID_JOINT;
	//	wheelAngles[i]	= 0.0f;
	//}
	//steering[0]			= NULL;
	//steering[1]			= NULL;
}
////
/////*
////================
////idAFEntity_VehicleFourWheels::Spawn
////================
////*/
	Spawn(): void {
		todoThrow();
////	var/*int*/i:number;
////	static const char *wheelBodyKeys[] = {
////		"wheelBodyFrontLeft",
////		"wheelBodyFrontRight",
////		"wheelBodyRearLeft",
////		"wheelBodyRearRight"
////	};
////	static const char *wheelJointKeys[] = {
////		"wheelJointFrontLeft",
////		"wheelJointFrontRight",
////		"wheelJointRearLeft",
////		"wheelJointRearRight"
////	};
////	static const char *steeringHingeKeys[] = {
////		"steeringHingeFrontLeft",
////		"steeringHingeFrontRight",
////	};
////
////	const char *wheelBodyName, *wheelJointName, *steeringHingeName;
////
////	for ( i = 0; i < 4; i++ ) {
////		wheelBodyName = spawnArgs.GetString( wheelBodyKeys[i], "" );
////		if ( !wheelBodyName[0] ) {
////			gameLocal.Error( "idAFEntity_VehicleFourWheels '%s' no '%s' specified", name.c_str(), wheelBodyKeys[i] );
////		}
////		wheels[i] = af.GetPhysics().GetBody( wheelBodyName );
////		if ( !wheels[i] ) {
////			gameLocal.Error( "idAFEntity_VehicleFourWheels '%s' can't find wheel body '%s'", name.c_str(), wheelBodyName );
////		}
////		wheelJointName = spawnArgs.GetString( wheelJointKeys[i], "" );
////		if ( !wheelJointName[0] ) {
////			gameLocal.Error( "idAFEntity_VehicleFourWheels '%s' no '%s' specified", name.c_str(), wheelJointKeys[i] );
////		}
////		wheelJoints[i] = this.animator.GetJointHandle( wheelJointName );
////		if ( wheelJoints[i] == jointHandle_t.INVALID_JOINT ) {
////			gameLocal.Error( "idAFEntity_VehicleFourWheels '%s' can't find wheel joint '%s'", name.c_str(), wheelJointName );
////		}
////	}
////
////	for ( i = 0; i < 2; i++ ) {
////		steeringHingeName = spawnArgs.GetString( steeringHingeKeys[i], "" );
////		if ( !steeringHingeName[0] ) {
////			gameLocal.Error( "idAFEntity_VehicleFourWheels '%s' no '%s' specified", name.c_str(), steeringHingeKeys[i] );
////		}
////		steering[i] = static_cast<idAFConstraint_Hinge *>(af.GetPhysics().GetConstraint( steeringHingeName ));
////		if ( !steering[i] ) {
////			gameLocal.Error( "idAFEntity_VehicleFourWheels '%s': can't find steering hinge '%s'", name.c_str(), steeringHingeName );
////		}
////	}
////
////	memset( wheelAngles, 0, sizeof( wheelAngles ) );
////	BecomeActive( TH_THINK );
}
////
/////*
////================
////idAFEntity_VehicleFourWheels::Think
////================
////*/
////void idAFEntity_VehicleFourWheels::Think( ) {
////	var/*int*/i:number;
////	float force = 0.0f, velocity = 0.0f, steerAngle = 0.0f;
////	idVec3 origin;
////	idMat3 axis;
////	idRotation rotation;
////
////	if ( thinkFlags & TH_THINK ) {
////
////		if ( player ) {
////			// capture the input from a player
////			velocity = g_vehicleVelocity.GetFloat();
////			if ( player.usercmd.forwardmove < 0 ) {
////				velocity = -velocity;
////			}
////			force = idMath::Fabs( player.usercmd.forwardmove * g_vehicleForce.GetFloat() ) * (1.0f / 128.0f);
////			steerAngle = GetSteerAngle();
////		}
////
////		// update the wheel motor force
////		for ( i = 0; i < 2; i++ ) {
////			wheels[2+i].SetContactMotorVelocity( velocity );
////			wheels[2+i].SetContactMotorForce( force );
////		}
////
////		// adjust wheel velocity for better steering because there are no differentials between the wheels
////		if ( steerAngle < 0.0f ) {
////			wheels[2].SetContactMotorVelocity( velocity * 0.5f );
////		}
////		else if ( steerAngle > 0.0f ) {
////			wheels[3].SetContactMotorVelocity( velocity * 0.5f );
////		}
////
////		// update the wheel steering
////		steering[0].SetSteerAngle( steerAngle );
////		steering[1].SetSteerAngle( steerAngle );
////		for ( i = 0; i < 2; i++ ) {
////			steering[i].SetSteerSpeed( 3.0f );
////		}
////
////		// update the steering wheel
////		this.animator.GetJointTransform( steeringWheelJoint, gameLocal.time, origin, axis );
////		rotation.SetVec( axis[2] );
////		rotation.SetAngle( -steerAngle );
////		this.animator.SetJointAxis( steeringWheelJoint, JOINTMOD_WORLD, rotation.ToMat3() );
////
////		// run the physics
////		RunPhysics();
////
////		// rotate the wheels visually
////		for ( i = 0; i < 4; i++ ) {
////			if ( force == 0.0f ) {
////				velocity = wheels[i].GetLinearVelocity() * wheels[i].GetWorldAxis()[0];
////			}
////			wheelAngles[i] += velocity * MS2SEC( gameLocal.msec ) / wheelRadius;
////			// give the wheel joint an additional rotation about the wheel axis
////			rotation.SetAngle( RAD2DEG( wheelAngles[i] ) );
////			axis = af.GetPhysics().GetAxis( 0 );
////			rotation.SetVec( (wheels[i].GetWorldAxis() * axis.Transpose())[2] );
////			this.animator.SetJointAxis( wheelJoints[i], JOINTMOD_WORLD, rotation.ToMat3() );
////		}
////
////		// spawn dust particle effects
////		if ( force != 0.0f && !( gameLocal.framenum & 7 ) ) {
////			int numContacts;
////			idAFConstraint_Contact *contacts[2];
////			for ( i = 0; i < 4; i++ ) {
////				numContacts = af.GetPhysics().GetBodyContactConstraints( wheels[i].GetClipModel().GetId(), contacts, 2 );
////				for ( int j = 0; j < numContacts; j++ ) {
////					gameLocal.smokeParticles.EmitSmoke( dustSmoke, gameLocal.time, gameLocal.random.RandomFloat(), contacts[j].GetContact().point, contacts[j].GetContact().normal.ToMat3() );
////				}
////			}
////		}
////	}
////
////	UpdateAnimation();
////	if ( thinkFlags & TH_UPDATEVISUALS ) {
////		Present();
////		LinkCombat();
////	}
////}
////
};


/*
===============================================================================

idAFEntity_VehicleSixWheels

===============================================================================
*/

class idAFEntity_VehicleSixWheels extends idAFEntity_Vehicle {
////public:
////	CLASS_PROTOTYPE( idAFEntity_VehicleSixWheels );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idAFEntity_VehicleSixWheels>[];
////
////							idAFEntity_VehicleSixWheels( );
////
////	void					Spawn( );
////	virtual void			Think( );
////
////private:
////	idAFBody *				wheels[6];
////	idAFConstraint_Hinge *	steering[4];
////	jointHandle_t			wheelJoints[6];
////	float					wheelAngles[6];
	
/*
================
idAFEntity_VehicleSixWheels::idAFEntity_VehicleSixWheels
================
*/
	constructor() {
		super ( );
		todoThrow ( );
	//var/*int*/i:number;

	//for ( i = 0; i < 6; i++ ) {
	//	wheels[i]		= NULL;
	//	wheelJoints[i]	= jointHandle_t.INVALID_JOINT;
	//	wheelAngles[i]	= 0.0f;
	//}
	//steering[0]			= NULL;
	//steering[1]			= NULL;
	//steering[2]			= NULL;
	//steering[3]			= NULL;
}

/////*
////================
////idAFEntity_VehicleSixWheels::Spawn
////================
////*/
	Spawn(): void {
		todoThrow();
////	var/*int*/i:number;
////	static const char *wheelBodyKeys[] = {
////		"wheelBodyFrontLeft",
////		"wheelBodyFrontRight",
////		"wheelBodyMiddleLeft",
////		"wheelBodyMiddleRight",
////		"wheelBodyRearLeft",
////		"wheelBodyRearRight"
////	};
////	static const char *wheelJointKeys[] = {
////		"wheelJointFrontLeft",
////		"wheelJointFrontRight",
////		"wheelJointMiddleLeft",
////		"wheelJointMiddleRight",
////		"wheelJointRearLeft",
////		"wheelJointRearRight"
////	};
////	static const char *steeringHingeKeys[] = {
////		"steeringHingeFrontLeft",
////		"steeringHingeFrontRight",
////		"steeringHingeRearLeft",
////		"steeringHingeRearRight"
////	};
////
////	const char *wheelBodyName, *wheelJointName, *steeringHingeName;
////
////	for ( i = 0; i < 6; i++ ) {
////		wheelBodyName = spawnArgs.GetString( wheelBodyKeys[i], "" );
////		if ( !wheelBodyName[0] ) {
////			gameLocal.Error( "idAFEntity_VehicleSixWheels '%s' no '%s' specified", name.c_str(), wheelBodyKeys[i] );
////		}
////		wheels[i] = af.GetPhysics().GetBody( wheelBodyName );
////		if ( !wheels[i] ) {
////			gameLocal.Error( "idAFEntity_VehicleSixWheels '%s' can't find wheel body '%s'", name.c_str(), wheelBodyName );
////		}
////		wheelJointName = spawnArgs.GetString( wheelJointKeys[i], "" );
////		if ( !wheelJointName[0] ) {
////			gameLocal.Error( "idAFEntity_VehicleSixWheels '%s' no '%s' specified", name.c_str(), wheelJointKeys[i] );
////		}
////		wheelJoints[i] = this.animator.GetJointHandle( wheelJointName );
////		if ( wheelJoints[i] == jointHandle_t.INVALID_JOINT ) {
////			gameLocal.Error( "idAFEntity_VehicleSixWheels '%s' can't find wheel joint '%s'", name.c_str(), wheelJointName );
////		}
////	}
////
////	for ( i = 0; i < 4; i++ ) {
////		steeringHingeName = spawnArgs.GetString( steeringHingeKeys[i], "" );
////		if ( !steeringHingeName[0] ) {
////			gameLocal.Error( "idAFEntity_VehicleSixWheels '%s' no '%s' specified", name.c_str(), steeringHingeKeys[i] );
////		}
////		steering[i] = static_cast<idAFConstraint_Hinge *>(af.GetPhysics().GetConstraint( steeringHingeName ));
////		if ( !steering[i] ) {
////			gameLocal.Error( "idAFEntity_VehicleSixWheels '%s': can't find steering hinge '%s'", name.c_str(), steeringHingeName );
////		}
////	}
////
////	memset( wheelAngles, 0, sizeof( wheelAngles ) );
////	BecomeActive( TH_THINK );
}
////
/////*
////================
////idAFEntity_VehicleSixWheels::Think
////================
////*/
////void idAFEntity_VehicleSixWheels::Think( ) {
////	var/*int*/i:number;
////	float force = 0.0f, velocity = 0.0f, steerAngle = 0.0f;
////	idVec3 origin;
////	idMat3 axis;
////	idRotation rotation;
////
////	if ( thinkFlags & TH_THINK ) {
////
////		if ( player ) {
////			// capture the input from a player
////			velocity = g_vehicleVelocity.GetFloat();
////			if ( player.usercmd.forwardmove < 0 ) {
////				velocity = -velocity;
////			}
////			force = idMath::Fabs( player.usercmd.forwardmove * g_vehicleForce.GetFloat() ) * (1.0f / 128.0f);
////			steerAngle = GetSteerAngle();
////		}
////
////		// update the wheel motor force
////		for ( i = 0; i < 6; i++ ) {
////			wheels[i].SetContactMotorVelocity( velocity );
////			wheels[i].SetContactMotorForce( force );
////		}
////
////		// adjust wheel velocity for better steering because there are no differentials between the wheels
////		if ( steerAngle < 0.0f ) {
////			for ( i = 0; i < 3; i++ ) {
////				wheels[(i<<1)].SetContactMotorVelocity( velocity * 0.5f );
////			}
////		}
////		else if ( steerAngle > 0.0f ) {
////			for ( i = 0; i < 3; i++ ) {
////				wheels[1+(i<<1)].SetContactMotorVelocity( velocity * 0.5f );
////			}
////		}
////
////		// update the wheel steering
////		steering[0].SetSteerAngle( steerAngle );
////		steering[1].SetSteerAngle( steerAngle );
////		steering[2].SetSteerAngle( -steerAngle );
////		steering[3].SetSteerAngle( -steerAngle );
////		for ( i = 0; i < 4; i++ ) {
////			steering[i].SetSteerSpeed( 3.0f );
////		}
////
////		// update the steering wheel
////		this.animator.GetJointTransform( steeringWheelJoint, gameLocal.time, origin, axis );
////		rotation.SetVec( axis[2] );
////		rotation.SetAngle( -steerAngle );
////		this.animator.SetJointAxis( steeringWheelJoint, JOINTMOD_WORLD, rotation.ToMat3() );
////
////		// run the physics
////		RunPhysics();
////
////		// rotate the wheels visually
////		for ( i = 0; i < 6; i++ ) {
////			if ( force == 0.0f ) {
////				velocity = wheels[i].GetLinearVelocity() * wheels[i].GetWorldAxis()[0];
////			}
////			wheelAngles[i] += velocity * MS2SEC( gameLocal.msec ) / wheelRadius;
////			// give the wheel joint an additional rotation about the wheel axis
////			rotation.SetAngle( RAD2DEG( wheelAngles[i] ) );
////			axis = af.GetPhysics().GetAxis( 0 );
////			rotation.SetVec( (wheels[i].GetWorldAxis() * axis.Transpose())[2] );
////			this.animator.SetJointAxis( wheelJoints[i], JOINTMOD_WORLD, rotation.ToMat3() );
////		}
////
////		// spawn dust particle effects
////		if ( force != 0.0f && !( gameLocal.framenum & 7 ) ) {
////			int numContacts;
////			idAFConstraint_Contact *contacts[2];
////			for ( i = 0; i < 6; i++ ) {
////				numContacts = af.GetPhysics().GetBodyContactConstraints( wheels[i].GetClipModel().GetId(), contacts, 2 );
////				for ( int j = 0; j < numContacts; j++ ) {
////					gameLocal.smokeParticles.EmitSmoke( dustSmoke, gameLocal.time, gameLocal.random.RandomFloat(), contacts[j].GetContact().point, contacts[j].GetContact().normal.ToMat3() );
////				}
////			}
////		}
////	}
////
////	UpdateAnimation();
////	if ( thinkFlags & TH_UPDATEVISUALS ) {
////		Present();
////		LinkCombat();
////	}
////}
////
};


/*
===============================================================================

idAFEntity_SteamPipe

===============================================================================
*/

class idAFEntity_SteamPipe extends idAFEntity_Base {
////public:
////	CLASS_PROTOTYPE( idAFEntity_SteamPipe );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idAFEntity_SteamPipe>[];
////
////							idAFEntity_SteamPipe( );
////							~idAFEntity_SteamPipe( );
////
////	void					Spawn( );
//Save ( savefile: idSaveGame ): void { throw "placeholder"; }
////	void					Restore ( savefile: idRestoreGame ): void { throw "placeholder"; }
////
////	virtual void			Think( );
////
////private:
////	int						steamBody;
////	float					steamForce;
////	float					steamUpForce;
////	idForce_Constant		force;
////	renderEntity_t			steamRenderEntity;
////	qhandle_t				steamModelDefHandle;
////
////	void					InitSteamRenderEntity( );


/*
================
idAFEntity_SteamPipe::idAFEntity_SteamPipe
================
*/
	constructor() {
		super ( );
		todoThrow ( );
		//steamBody			= 0;
		//steamForce			= 0.0f;
		//steamUpForce		= 0.0f;
		//steamModelDefHandle	= -1;
		//memset( &steamRenderEntity, 0, sizeof( steamRenderEntity ) );
	}
////
/////*
////================
////idAFEntity_SteamPipe::~idAFEntity_SteamPipe
////================
////*/
////idAFEntity_SteamPipe::~idAFEntity_SteamPipe( ) {
////	if ( steamModelDefHandle >= 0 ){
////		gameRenderWorld.FreeEntityDef( steamModelDefHandle );
////	}
////}
////
/////*
////================
////idAFEntity_SteamPipe::Save
////================
////*/
////void idAFEntity_SteamPipe::Save( idSaveGame *savefile ) const {
////}
////
/////*
////================
////idAFEntity_SteamPipe::Restore
////================
////*/
////void idAFEntity_SteamPipe::Restore( idRestoreGame *savefile ) {
////	Spawn();
////}
////
/////*
////================
////idAFEntity_SteamPipe::Spawn
////================
////*/
	Spawn(): void {
		todoThrow();
////	idVec3 steamDir;
////	const char *steamBodyName;
////
////	LoadAF();
////
////	SetCombatModel();
////
////	SetPhysics( af.GetPhysics() );
////
////	fl.takedamage = true;
////
////	steamBodyName = spawnArgs.GetString( "steamBody", "" );
////	steamForce = spawnArgs.GetFloat( "steamForce", "2000" );
////	steamUpForce = spawnArgs.GetFloat( "steamUpForce", "10" );
////	steamDir = af.GetPhysics().GetAxis( steamBody )[2];
////	steamBody = af.GetPhysics().GetBodyId( steamBodyName );
////	force.SetPosition( af.GetPhysics(), steamBody, af.GetPhysics().GetOrigin( steamBody ) );
////	force.SetForce( steamDir * -steamForce );
////
////	InitSteamRenderEntity();
////
////	BecomeActive( TH_THINK );
}
////
/////*
////================
////idAFEntity_SteamPipe::InitSteamRenderEntity
////================
////*/
////void idAFEntity_SteamPipe::InitSteamRenderEntity( ) {
////	const char	*temp;
////	const idDeclModelDef *modelDef;
////
////	memset( &steamRenderEntity, 0, sizeof( steamRenderEntity ) );
////	steamRenderEntity.shaderParms[ SHADERPARM_RED ]		= 1.0f;
////	steamRenderEntity.shaderParms[ SHADERPARM_GREEN ]	= 1.0f;
////	steamRenderEntity.shaderParms[ SHADERPARM_BLUE ]	= 1.0f;
////	modelDef = NULL;
////	temp = spawnArgs.GetString ( "model_steam" );
////	if ( *temp != '\0' ) {
////		if ( !strstr( temp, "." ) ) {
////			modelDef = static_cast<const idDeclModelDef *>( declManager.FindType( DECL_MODELDEF, temp, false ) );
////			if ( modelDef ) {
////				steamRenderEntity.hModel = modelDef.ModelHandle();
////			}
////		}
////
////		if ( !steamRenderEntity.hModel ) {
////			steamRenderEntity.hModel = renderModelManager.FindModel( temp );
////		}
////
////		if ( steamRenderEntity.hModel ) {
////			steamRenderEntity.bounds = steamRenderEntity.hModel.Bounds( &steamRenderEntity );
////		} else {
////			steamRenderEntity.bounds.Zero();
////		}
////		steamRenderEntity.origin = af.GetPhysics().GetOrigin( steamBody );
////		steamRenderEntity.axis = af.GetPhysics().GetAxis( steamBody );
////		steamModelDefHandle = gameRenderWorld.AddEntityDef( &steamRenderEntity );
////	}
////}
////
/////*
////================
////idAFEntity_SteamPipe::Think
////================
////*/
////void idAFEntity_SteamPipe::Think( ) {
////	idVec3 steamDir;
////
////	if ( thinkFlags & TH_THINK ) {
////		steamDir.x = gameLocal.random.CRandomFloat() * steamForce;
////		steamDir.y = gameLocal.random.CRandomFloat() * steamForce;
////		steamDir.z = steamUpForce;
////		force.SetForce( steamDir );
////		force.Evaluate( gameLocal.time );
////		//gameRenderWorld.DebugArrow( colorWhite, af.GetPhysics().GetOrigin( steamBody ), af.GetPhysics().GetOrigin( steamBody ) - 10.0f * steamDir, 4 );
////	}
////
////	if ( steamModelDefHandle >= 0 ){
////		steamRenderEntity.origin = af.GetPhysics().GetOrigin( steamBody );
////		steamRenderEntity.axis = af.GetPhysics().GetAxis( steamBody );
////		gameRenderWorld.UpdateEntityDef( steamModelDefHandle, &steamRenderEntity );
////	}
////
////	idAFEntity_Base::Think();
////}


};


/*
===============================================================================

idAFEntity_ClawFourFingers

===============================================================================
*/

class idAFEntity_ClawFourFingers extends idAFEntity_Base {
////public:
////	CLASS_PROTOTYPE( idAFEntity_ClawFourFingers );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idAFEntity_ClawFourFingers>[];
////
////							idAFEntity_ClawFourFingers( );
////
////	void					Spawn( );
//Save ( savefile: idSaveGame ): void { throw "placeholder"; }
////	void					Restore ( savefile: idRestoreGame ): void { throw "placeholder"; }
////
////private:
////	idAFConstraint_Hinge *	fingers[4];
////
	Event_SetFingerAngle( /*float*/ angle :number): void { throw "placeholder"; }
	Event_StopFingers(): void { throw "placeholder"; }

/*
================
idAFEntity_ClawFourFingers::idAFEntity_ClawFourFingers
================
*/
	constructor() {
		super ( );
		todoThrow();
	//fingers[0]	= NULL;
	//fingers[1]	= NULL;
	//fingers[2]	= NULL;
	//fingers[3]	= NULL;
}
////
/////*
////================
////idAFEntity_ClawFourFingers::Save
////================
////*/
////void idAFEntity_ClawFourFingers::Save( idSaveGame *savefile ) const {
////	var/*int*/i:number;
////
////	for ( i = 0; i < 4; i++ ) {
////		fingers[i].Save( savefile );
////	}
////}
////
/////*
////================
////idAFEntity_ClawFourFingers::Restore
////================
////*/
////void idAFEntity_ClawFourFingers::Restore( idRestoreGame *savefile ) {
////	var/*int*/i:number;
////
////	for ( i = 0; i < 4; i++ ) {
////		fingers[i] = static_cast<idAFConstraint_Hinge *>(af.GetPhysics().GetConstraint( clawConstraintNames[i] ));
////		fingers[i].Restore( savefile );
////	}
////
////	SetCombatModel();
////	LinkCombat();
////}
////
/////*
////================
////idAFEntity_ClawFourFingers::Spawn
////================
////*/
	Spawn(): void {
		todoThrow();
////	var/*int*/i:number;
////
////	LoadAF();
////
////	SetCombatModel();
////
////	af.GetPhysics().LockWorldConstraints( true );
////	af.GetPhysics().SetForcePushable( true );
////	SetPhysics( af.GetPhysics() );
////
////	fl.takedamage = true;
////
////	for ( i = 0; i < 4; i++ ) {
////		fingers[i] = static_cast<idAFConstraint_Hinge *>(af.GetPhysics().GetConstraint( clawConstraintNames[i] ));
////		if ( !fingers[i] ) {
////			gameLocal.Error( "idClaw_FourFingers '%s': can't find claw constraint '%s'", name.c_str(), clawConstraintNames[i] );
////		}
////	}
}
////
/////*
////================
////idAFEntity_ClawFourFingers::Event_SetFingerAngle
////================
////*/
////void idAFEntity_ClawFourFingers::Event_SetFingerAngle( /*float*/angle:number ) {
////	var/*int*/i:number;
////
////	for ( i = 0; i < 4; i++ ) {
////		fingers[i].SetSteerAngle( angle );
////		fingers[i].SetSteerSpeed( 0.5f );
////	}
////	af.GetPhysics().Activate();
////}
////
/////*
////================
////idAFEntity_ClawFourFingers::Event_StopFingers
////================
////*/
////void idAFEntity_ClawFourFingers::Event_StopFingers( ) {
////	var/*int*/i:number;
////
////	for ( i = 0; i < 4; i++ ) {
////		fingers[i].SetSteerAngle( fingers[i].GetAngle() );
////	}
////}
////
};
////
////#endif /* !__GAME_AFENTITY_H__ */
