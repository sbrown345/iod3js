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
////#ifndef __GAME_WEAPON_H__
////#define __GAME_WEAPON_H__
////
/////*
////===============================================================================
////
////	Player Weapon
////	
////===============================================================================
////*/
////
////typedef enum {
////	WP_READY,
////	WP_OUTOFAMMO,
////	WP_RELOAD,
////	WP_HOLSTERED,
////	WP_RISING,
////	WP_LOWERING
////} weaponStatus_t;
////
////typedef int ammo_t;
////static const int AMMO_NUMTYPES = 16;
////
////class idPlayer;
////
var LIGHTID_WORLD_MUZZLE_FLASH = 1;
var LIGHTID_VIEW_MUZZLE_FLASH = 100;
////
////class idMoveableItem;
////
class idWeapon extends idAnimatedEntity {
////public:
////	CLASS_PROTOTYPE( idWeapon );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idWeapon>[];
////
////							idWeapon();
////	virtual					~idWeapon();
////
////	// Init
////	void					Spawn( );
////	void					SetOwner( idPlayer *owner );
////	idPlayer*				GetOwner( );
////	virtual bool			ShouldConstructScriptObjectAtSpawn( ) const;
////
////	static void				CacheWeapon( const char *weaponName );
////
////	// save games
////	void					Save( idSaveGame *savefile ) const;					// archives object for save game file
////	void					Restore( idRestoreGame *savefile );					// unarchives object from save game file
////
////	// Weapon definition management
////	void					Clear( );
////	void					GetWeaponDef( const char *objectname, int ammoinclip );
////	bool					IsLinked( );
////	bool					IsWorldModelReady( );
////
////	// GUIs
////	const char *			Icon( ) const;
////	void					UpdateGUI( );
////
////	virtual void			SetModel( const char *modelname );
////	bool					GetGlobalJointTransform( bool viewModel, const jointHandle_t jointHandle, idVec3 &offset, idMat3 &axis );
////	void					SetPushVelocity( const idVec3 &pushVelocity );
////	bool					UpdateSkin( );
////
////	// State control/player interface
////	void					Think( );
////	void					Raise( );
////	void					PutAway( );
////	void					Reload( );
////	void					LowerWeapon( );
////	void					RaiseWeapon( );
////	void					HideWeapon( );
////	void					ShowWeapon( );
////	void					HideWorldModel( );
////	void					ShowWorldModel( );
////	void					OwnerDied( );
////	void					BeginAttack( );
////	void					EndAttack( );
////	bool					IsReady( ) const;
////	bool					IsReloading( ) const;
////	bool					IsHolstered( ) const;
////	bool					ShowCrosshair( ) const;
////	idEntity *				DropItem( const idVec3 &velocity, int activateDelay, int removeDelay, bool died );
////	bool					CanDrop( ) const;
////	void					WeaponStolen( );
////
////	// Script state management
////	virtual idThread *		ConstructScriptObject( );
////	virtual void			DeconstructScriptObject( );
////	void					SetState( const char *statename, int blendFrames );
////	void					UpdateScript( );
////	void					EnterCinematic( );
////	void					ExitCinematic( );
////	void					NetCatchup( );
////
////	// Visual presentation
////	void					PresentWeapon( bool showViewModel );
////	int						GetZoomFov( );
////	void					GetWeaponAngleOffsets( int *average, float *scale, float *max );
////	void					GetWeaponTimeOffsets( float *time, float *scale );
////	bool					BloodSplat( float size );
////
////	// Ammo
////	static ammo_t			GetAmmoNumForName( const char *ammoname );
////	static const char		*GetAmmoNameForNum( ammo_t ammonum );
////	static const char		*GetAmmoPickupNameForNum( ammo_t ammonum );
////	ammo_t					GetAmmoType( ) const;
////	int						AmmoAvailable( ) const;
////	int						AmmoInClip( ) const;
////	void					ResetAmmoClip( );
////	int						ClipSize( ) const;
////	int						LowAmmo( ) const;
////	int						AmmoRequired( ) const;
////
////	virtual void			WriteToSnapshot( idBitMsgDelta &msg ) const;
////	virtual void			ReadFromSnapshot( const idBitMsgDelta &msg );
////
////	enum {
////		EVENT_RELOAD = idEntity::EVENT_MAXEVENTS,
////		EVENT_ENDRELOAD,
////		EVENT_CHANGESKIN,
////		EVENT_MAXEVENTS
////	};
////	virtual bool			ClientReceiveEvent( int event, /*int*/time:number, const idBitMsg &msg );
////
////	virtual void			ClientPredictionThink( );
////
////private:
////	// script control
////	idScriptBool			WEAPON_ATTACK;
////	idScriptBool			WEAPON_RELOAD;
////	idScriptBool			WEAPON_NETRELOAD;
////	idScriptBool			WEAPON_NETENDRELOAD;
////	idScriptBool			WEAPON_NETFIRING;
////	idScriptBool			WEAPON_RAISEWEAPON;
////	idScriptBool			WEAPON_LOWERWEAPON;
////	weaponStatus_t			status;
	thread:idThread;
////	idStr					state;
////	idStr					idealState;
////	int						animBlendFrames;
////	int						animDoneTime;
////	bool					isLinked;
////
////	// precreated projectile
////	idEntity				*projectileEnt;
////
	owner:idPlayer;
////	idEntityPtr<idAnimatedEntity>	worldModel;
////
////	// hiding (for GUIs and NPCs)
////	int						hideTime;
////	float					hideDistance;
////	int						hideStartTime;
////	float					hideStart;
////	float					hideEnd;
////	float					hideOffset;
////	bool					hide;
////	bool					disabled;
////
////	// berserk
////	int						berserk;
////
////	// these are the player render view parms, which include bobbing
////	idVec3					playerViewOrigin;
////	idMat3					playerViewAxis;
////
////	// the view weapon render entity parms
////	idVec3					viewWeaponOrigin;
////	idMat3					viewWeaponAxis;
////	
////	// the muzzle bone's position, used for launching projectiles and trailing smoke
////	idVec3					muzzleOrigin;
////	idMat3					muzzleAxis;
////
////	idVec3					pushVelocity;
////
////	// weapon definition
////	// we maintain local copies of the projectile and brass dictionaries so they
////	// do not have to be copied across the DLL boundary when entities are spawned
////	const idDeclEntityDef *	weaponDef;
////	const idDeclEntityDef *	meleeDef;
////	idDict					projectileDict;
////	float					meleeDistance;
////	idStr					meleeDefName;
////	idDict					brassDict;
////	int						brassDelay;
////	idStr					icon;
////
////	// view weapon gui light
////	renderLight_t			guiLight;
////	int						guiLightHandle;
////
////	// muzzle flash
////	renderLight_t			muzzleFlash;		// positioned on view weapon bone
////	int						muzzleFlashHandle;
////
////	renderLight_t			worldMuzzleFlash;	// positioned on world weapon bone
////	int						worldMuzzleFlashHandle;
////
////	idVec3					flashColor;
////	int						muzzleFlashEnd;
////	int						flashTime;
////	bool					lightOn;
////	bool					silent_fire;
////	bool					allowDrop;
////
////	// effects
////	bool					hasBloodSplat;
////
////	// weapon kick
////	int						kick_endtime;
////	int						muzzle_kick_time;
////	int						muzzle_kick_maxtime;
////	idAngles				muzzle_kick_angles;
////	idVec3					muzzle_kick_offset;
////
////	// ammo management
////	ammo_t					ammoType;
////	int						ammoRequired;		// amount of ammo to use each shot.  0 means weapon doesn't need ammo.
////	int						clipSize;			// 0 means no reload
////	int						ammoClip;
////	int						lowAmmo;			// if ammo in clip hits this threshold, snd_
////	bool					powerAmmo;			// true if the clip reduction is a factor of the power setting when
////												// a projectile is launched
////	// mp client
////	bool					isFiring;
////
////	// zoom
////    int						zoomFov;			// variable zoom fov per weapon
////
////	// joints from models
////	jointHandle_t			barrelJointView;
////	jointHandle_t			flashJointView;
////	jointHandle_t			ejectJointView;
////	jointHandle_t			guiLightJointView;
////	jointHandle_t			ventLightJointView;
////
////	jointHandle_t			flashJointWorld;
////	jointHandle_t			barrelJointWorld;
////	jointHandle_t			ejectJointWorld;
////
////	// sound
////	const idSoundShader *	sndHum;
////
////	// new style muzzle smokes
////	const idDeclParticle *	weaponSmoke;			// null if it doesn't smoke
////	int						weaponSmokeStartTime;	// set to gameLocal.time every weapon fire
////	bool					continuousSmoke;		// if smoke is continuous ( chainsaw )
////	const idDeclParticle *  strikeSmoke;			// striking something in melee
////	int						strikeSmokeStartTime;	// timing	
////	idVec3					strikePos;				// position of last melee strike	
////	idMat3					strikeAxis;				// axis of last melee strike
////	int						nextStrikeFx;			// used for sound and decal ( may use for strike smoke too )
////
////	// nozzle effects
////	bool					nozzleFx;			// does this use nozzle effects ( parm5 at rest, parm6 firing )
////										// this also assumes a nozzle light atm
////	int						nozzleFxFade;		// time it takes to fade between the effects
////	int						lastAttack;			// last time an attack occured
////	renderLight_t			nozzleGlow;			// nozzle light
////	int						nozzleGlowHandle;	// handle for nozzle light
////
////	idVec3					nozzleGlowColor;	// color of the nozzle glow
////	const idMaterial *		nozzleGlowShader;	// shader for glow light
////	float					nozzleGlowRadius;	// radius of glow light
////
////	// weighting for viewmodel angles
////	int						weaponAngleOffsetAverages;
////	float					weaponAngleOffsetScale;
////	float					weaponAngleOffsetMax;
////	float					weaponOffsetTime;
////	float					weaponOffsetScale;
////
////	// flashlight
////	void					AlertMonsters( );
////
////	// Visual presentation
////	void					InitWorldModel( const idDeclEntityDef *def );
////	void					MuzzleFlashLight( );
////	void					MuzzleRise( idVec3 &origin, idMat3 &axis );
////	void					UpdateNozzleFx( );
////	void					UpdateFlashPosition( );
////
////	// script events
	Event_Clear( ): void { throw "placeholder"; }
	Event_GetOwner( ): void { throw "placeholder"; }
	Event_WeaponState( statename:string, /*int*/ blendFrames: number ): void { throw "placeholder"; }
	Event_SetWeaponStatus(/*float*/ newStatus:number ): void { throw "placeholder"; }
	Event_WeaponReady( ): void { throw "placeholder"; }
	Event_WeaponOutOfAmmo( ): void { throw "placeholder"; }
	Event_WeaponReloading( ): void { throw "placeholder"; }
	Event_WeaponHolstered( ): void { throw "placeholder"; }
	Event_WeaponRising( ): void { throw "placeholder"; }
	Event_WeaponLowering( ): void { throw "placeholder"; }
	Event_UseAmmo( /*int*/ amount: number ): void { throw "placeholder"; }
	Event_AddToClip( /*int*/ amount: number ): void { throw "placeholder"; }
	Event_AmmoInClip( ): void { throw "placeholder"; }
	Event_AmmoAvailable( ): void { throw "placeholder"; }
	Event_TotalAmmoCount( ): void { throw "placeholder"; }
	Event_ClipSize( ): void { throw "placeholder"; }
	Event_PlayAnim( /*int*/ channel: number, animname:string ): void { throw "placeholder"; }
	Event_PlayCycle( /*int*/ channel: number, animname:string ): void { throw "placeholder"; }
	Event_AnimDone( /*int*/ channel: number, /*int*/ blendFrames: number ): void { throw "placeholder"; }
	Event_SetBlendFrames( /*int*/ channel: number, /*int*/ blendFrames: number ): void { throw "placeholder"; }
	Event_GetBlendFrames( /*int*/ channel: number ): void { throw "placeholder"; }
	Event_Next( ): void { throw "placeholder"; }
	Event_SetSkin( skinname:string ): void { throw "placeholder"; }
	Event_Flashlight( /*int*/ enable: number ): void { throw "placeholder"; }
	Event_GetLightParm( /*int*/ parmnum: number ): void { throw "placeholder"; }
	Event_SetLightParm(/*int*/ parmnum: number, /*float*/ value:number ): void { throw "placeholder"; }
	Event_SetLightParms(/*float*/ parm0:number, /*float*/ parm1:number, /*float*/ parm2:number, /*float*/ parm3:number ): void { throw "placeholder"; }
	Event_LaunchProjectiles(/*int*/ num_projectiles: number, /*float*/ spread:number, /*float*/ fuseOffset:number, /*float*/ launchPower:number, /*float*/ dmgPower:number ): void { throw "placeholder"; }
	Event_CreateProjectile( ): void { throw "placeholder"; }
	Event_EjectBrass( ): void { throw "placeholder"; }
	Event_Melee( ): void { throw "placeholder"; }
	Event_GetWorldModel( ): void { throw "placeholder"; }
	Event_AllowDrop(/*int*/ allow:number ): void { throw "placeholder"; }
	Event_AutoReload( ): void { throw "placeholder"; }
	Event_NetReload( ): void { throw "placeholder"; }
	Event_IsInvisible( ): void { throw "placeholder"; }
	Event_NetEndReload( ): void { throw "placeholder"; }
////
////ID_INLINE bool idWeapon::IsLinked( ) {
////	return isLinked;
////}
////
////ID_INLINE bool idWeapon::IsWorldModelReady( ) {
////	return ( worldModel.GetEntity() != NULL );
////}
////
////ID_INLINE idPlayer* idWeapon::GetOwner( ) {
////	return this.owner;
////}
////



	/*
	================
	idWeapon::idWeapon()
	================
	*/
	constructor() {
		super();
		todoThrow ( );
		//this.owner = NULL;
		//worldModel = NULL;
		//weaponDef = NULL;
		//this.thread = NULL;

		//memset( &guiLight, 0, sizeof(guiLight) );
		//memset( &muzzleFlash, 0, sizeof(muzzleFlash) );
		//memset( &worldMuzzleFlash, 0, sizeof(worldMuzzleFlash) );
		//memset( &nozzleGlow, 0, sizeof(nozzleGlow) );

		//muzzleFlashEnd = 0;
		//flashColor = vec3_origin;
		//muzzleFlashHandle = -1;
		//worldMuzzleFlashHandle = -1;
		//guiLightHandle = -1;
		//nozzleGlowHandle = -1;
		//this.modelDefHandle = -1;

		//berserk = 2;
		//brassDelay = 0;

		//allowDrop = true;

		//Clear();

		//fl.networkSync = true;
	}
	////
	/////*
	////================
	////idWeapon::~idWeapon()
	////================
	////*/
	////idWeapon::~idWeapon() {
	////	Clear();
	////	delete worldModel.GetEntity();
	////}
	////
	////
/*
================
idWeapon::Spawn
================
*/
	Spawn ( ): void {
		todoThrow ( );
		//if ( !gameLocal.isClient ) {
		//	// setup the world model
		//	worldModel = static_cast< idAnimatedEntity * >( gameLocal.SpawnEntityType( idAnimatedEntity::Type, NULL ) );
		//	worldModel.GetEntity().fl.networkSync = true;
		//}

		//this.thread = new idThread();
		//this.thread.ManualDelete();
		//this.thread.ManualControl();
	}
	////
	/////*
	////================
	////idWeapon::SetOwner
	////
	////Only called at player spawn time, not each weapon switch
	////================
	////*/
	////void idWeapon::SetOwner( idPlayer *_owner ) {
	////	assert( !this.owner );
	////	this.owner = _owner;
	////	SetName( va( "%s_weapon", this.owner.name.c_str() ) );
	////
	////	if ( worldModel.GetEntity() ) {
	////		worldModel.GetEntity().SetName( va( "%s_weapon_worldmodel", this.owner.name.c_str() ) );
	////	}
	////}
	////
	/////*
	////================
	////idWeapon::ShouldConstructScriptObjectAtSpawn
	////
	////Called during idEntity::Spawn to see if it should construct the script object or not.
	////Overridden by subclasses that need to spawn the script object themselves.
	////================
	////*/
	ShouldConstructScriptObjectAtSpawn(): boolean {
		return false;
	}
	////
	/////*
	////================
	////idWeapon::CacheWeapon
	////================
	////*/
	////void idWeapon::CacheWeapon( const char *weaponName ) {
	////	const idDeclEntityDef *weaponDef;
	////	const char *brassDefName;
	////	const char *clipModelName;
	////	idTraceModel trm;
	////	const char *guiName;
	////
	////	weaponDef = gameLocal.FindEntityDef( weaponName, false );
	////	if ( !weaponDef ) {
	////		return;
	////	}
	////
	////	// precache the brass collision model
	////	brassDefName = weaponDef.dict.GetString( "def_ejectBrass" );
	////	if ( brassDefName[0] ) {
	////		const idDeclEntityDef *brassDef = gameLocal.FindEntityDef( brassDefName, false );
	////		if ( brassDef ) {
	////			brassDef.dict.GetString( "clipmodel", "", &clipModelName );
	////			if ( !clipModelName[0] ) {
	////				clipModelName = brassDef.dict.GetString( "model" );		// use the visual model
	////			}
	////			// load the trace model
	////			collisionModelManager.TrmFromModel( clipModelName, trm );
	////		}
	////	}
	////
	////	guiName = weaponDef.dict.GetString( "gui" );
	////	if ( guiName[0] ) {
	////		uiManager.FindGui( guiName, true, false, true );
	////	}
	////}
	////
	/////*
	////================
	////idWeapon::Save
	////================
	////*/
	////void idWeapon::Save( idSaveGame *savefile ) const {
	////
	////	savefile.WriteInt( status );
	////	savefile.WriteObject( this.thread );
	////	savefile.WriteString( state );
	////	savefile.WriteString( idealState );
	////	savefile.WriteInt( animBlendFrames );
	////	savefile.WriteInt( animDoneTime );
	////	savefile.WriteBool( isLinked );
	////
	////	savefile.WriteObject( this.owner );
	////	worldModel.Save( savefile );
	////
	////	savefile.WriteInt( hideTime );
	////	savefile.WriteFloat( hideDistance );
	////	savefile.WriteInt( hideStartTime );
	////	savefile.WriteFloat( hideStart );
	////	savefile.WriteFloat( hideEnd );
	////	savefile.WriteFloat( hideOffset );
	////	savefile.WriteBool( hide );
	////	savefile.WriteBool( disabled );
	////
	////	savefile.WriteInt( berserk );
	////
	////	savefile.WriteVec3( playerViewOrigin );
	////	savefile.WriteMat3( playerViewAxis );
	////
	////	savefile.WriteVec3( viewWeaponOrigin );
	////	savefile.WriteMat3( viewWeaponAxis );
	////
	////	savefile.WriteVec3( muzzleOrigin );
	////	savefile.WriteMat3( muzzleAxis );
	////
	////	savefile.WriteVec3( pushVelocity );
	////
	////	savefile.WriteString( weaponDef.GetName() );
	////	savefile.WriteFloat( meleeDistance );
	////	savefile.WriteString( meleeDefName );
	////	savefile.WriteInt( brassDelay );
	////	savefile.WriteString( icon );
	////
	////	savefile.WriteInt( guiLightHandle );
	////	savefile.WriteRenderLight( guiLight );
	////
	////	savefile.WriteInt( muzzleFlashHandle );
	////	savefile.WriteRenderLight( muzzleFlash );
	////
	////	savefile.WriteInt( worldMuzzleFlashHandle );
	////	savefile.WriteRenderLight( worldMuzzleFlash );
	////
	////	savefile.WriteVec3( flashColor );
	////	savefile.WriteInt( muzzleFlashEnd );
	////	savefile.WriteInt( flashTime );
	////
	////	savefile.WriteBool( lightOn );
	////	savefile.WriteBool( silent_fire );
	////
	////	savefile.WriteInt( kick_endtime );
	////	savefile.WriteInt( muzzle_kick_time );
	////	savefile.WriteInt( muzzle_kick_maxtime );
	////	savefile.WriteAngles( muzzle_kick_angles );
	////	savefile.WriteVec3( muzzle_kick_offset );
	////
	////	savefile.WriteInt( ammoType );
	////	savefile.WriteInt( ammoRequired );
	////	savefile.WriteInt( clipSize );
	////	savefile.WriteInt( ammoClip );
	////	savefile.WriteInt( lowAmmo );
	////	savefile.WriteBool( powerAmmo );
	////
	////	// savegames <= 17
	////	savefile.WriteInt( 0 );
	////
	////	savefile.WriteInt( zoomFov );
	////
	////	savefile.WriteJoint( barrelJointView );
	////	savefile.WriteJoint( flashJointView );
	////	savefile.WriteJoint( ejectJointView );
	////	savefile.WriteJoint( guiLightJointView );
	////	savefile.WriteJoint( ventLightJointView );
	////
	////	savefile.WriteJoint( flashJointWorld );
	////	savefile.WriteJoint( barrelJointWorld );
	////	savefile.WriteJoint( ejectJointWorld );
	////
	////	savefile.WriteBool( hasBloodSplat );
	////
	////	savefile.WriteSoundShader( sndHum );
	////
	////	savefile.WriteParticle( weaponSmoke );
	////	savefile.WriteInt( weaponSmokeStartTime );
	////	savefile.WriteBool( continuousSmoke );
	////	savefile.WriteParticle( strikeSmoke );
	////	savefile.WriteInt( strikeSmokeStartTime );
	////	savefile.WriteVec3( strikePos );
	////	savefile.WriteMat3( strikeAxis );
	////	savefile.WriteInt( nextStrikeFx );
	////
	////	savefile.WriteBool( nozzleFx );
	////	savefile.WriteInt( nozzleFxFade );
	////
	////	savefile.WriteInt( lastAttack );
	////
	////	savefile.WriteInt( nozzleGlowHandle );
	////	savefile.WriteRenderLight( nozzleGlow );
	////
	////	savefile.WriteVec3( nozzleGlowColor );
	////	savefile.WriteMaterial( nozzleGlowShader );
	////	savefile.WriteFloat( nozzleGlowRadius );
	////
	////	savefile.WriteInt( weaponAngleOffsetAverages );
	////	savefile.WriteFloat( weaponAngleOffsetScale );
	////	savefile.WriteFloat( weaponAngleOffsetMax );
	////	savefile.WriteFloat( weaponOffsetTime );
	////	savefile.WriteFloat( weaponOffsetScale );
	////
	////	savefile.WriteBool( allowDrop );
	////	savefile.WriteObject( projectileEnt );
	////
	////}
	////
	/////*
	////================
	////idWeapon::Restore
	////================
	////*/
	////void idWeapon::Restore( idRestoreGame *savefile ) {
	////
	////	savefile.ReadInt( (int &)status );
	////	savefile.ReadObject( reinterpret_cast<idClass *&>( this.thread ) );
	////	savefile.ReadString( state );
	////	savefile.ReadString( idealState );
	////	savefile.ReadInt( animBlendFrames );
	////	savefile.ReadInt( animDoneTime );
	////	savefile.ReadBool( isLinked );
	////
	////	// Re-link script fields
	////	WEAPON_ATTACK.LinkTo(		this.scriptObject, "WEAPON_ATTACK" );
	////	WEAPON_RELOAD.LinkTo(		this.scriptObject, "WEAPON_RELOAD" );
	////	WEAPON_NETRELOAD.LinkTo(	this.scriptObject, "WEAPON_NETRELOAD" );
	////	WEAPON_NETENDRELOAD.LinkTo(	this.scriptObject, "WEAPON_NETENDRELOAD" );
	////	WEAPON_NETFIRING.LinkTo(	this.scriptObject, "WEAPON_NETFIRING" );
	////	WEAPON_RAISEWEAPON.LinkTo(	this.scriptObject, "WEAPON_RAISEWEAPON" );
	////	WEAPON_LOWERWEAPON.LinkTo(	this.scriptObject, "WEAPON_LOWERWEAPON" );
	////
	////	savefile.ReadObject( reinterpret_cast<idClass *&>( this.owner ) );
	////	worldModel.Restore( savefile );
	////
	////	savefile.ReadInt( hideTime );
	////	savefile.ReadFloat( hideDistance );
	////	savefile.ReadInt( hideStartTime );
	////	savefile.ReadFloat( hideStart );
	////	savefile.ReadFloat( hideEnd );
	////	savefile.ReadFloat( hideOffset );
	////	savefile.ReadBool( hide );
	////	savefile.ReadBool( disabled );
	////
	////	savefile.ReadInt( berserk );
	////
	////	savefile.ReadVec3( playerViewOrigin );
	////	savefile.ReadMat3( playerViewAxis );
	////
	////	savefile.ReadVec3( viewWeaponOrigin );
	////	savefile.ReadMat3( viewWeaponAxis );
	////
	////	savefile.ReadVec3( muzzleOrigin );
	////	savefile.ReadMat3( muzzleAxis );
	////
	////	savefile.ReadVec3( pushVelocity );
	////
	////	idStr objectname;
	////	savefile.ReadString( objectname );
	////	weaponDef = gameLocal.FindEntityDef( objectname );
	////	meleeDef = gameLocal.FindEntityDef( weaponDef.dict.GetString( "def_melee" ), false );
	////
	////	const idDeclEntityDef *projectileDef = gameLocal.FindEntityDef( weaponDef.dict.GetString( "def_projectile" ), false );
	////	if ( projectileDef ) {
	////		projectileDict = projectileDef.dict;
	////	} else {
	////		projectileDict.Clear();
	////	}
	////
	////	const idDeclEntityDef *brassDef = gameLocal.FindEntityDef( weaponDef.dict.GetString( "def_ejectBrass" ), false );
	////	if ( brassDef ) {
	////		brassDict = brassDef.dict;
	////	} else {
	////		brassDict.Clear();
	////	}
	////
	////	savefile.ReadFloat( meleeDistance );
	////	savefile.ReadString( meleeDefName );
	////	savefile.ReadInt( brassDelay );
	////	savefile.ReadString( icon );
	////
	////	savefile.ReadInt( guiLightHandle );
	////	savefile.ReadRenderLight( guiLight );
	////
	////	savefile.ReadInt( muzzleFlashHandle );
	////	savefile.ReadRenderLight( muzzleFlash );
	////
	////	savefile.ReadInt( worldMuzzleFlashHandle );
	////	savefile.ReadRenderLight( worldMuzzleFlash );
	////
	////	savefile.ReadVec3( flashColor );
	////	savefile.ReadInt( muzzleFlashEnd );
	////	savefile.ReadInt( flashTime );
	////
	////	savefile.ReadBool( lightOn );
	////	savefile.ReadBool( silent_fire );
	////
	////	savefile.ReadInt( kick_endtime );
	////	savefile.ReadInt( muzzle_kick_time );
	////	savefile.ReadInt( muzzle_kick_maxtime );
	////	savefile.ReadAngles( muzzle_kick_angles );
	////	savefile.ReadVec3( muzzle_kick_offset );
	////
	////	savefile.ReadInt( (int &)ammoType );
	////	savefile.ReadInt( ammoRequired );
	////	savefile.ReadInt( clipSize );
	////	savefile.ReadInt( ammoClip );
	////	savefile.ReadInt( lowAmmo );
	////	savefile.ReadBool( powerAmmo );
	////
	////	// savegame versions <= 17
	////	int foo;
	////	savefile.ReadInt( foo );
	////
	////	savefile.ReadInt( zoomFov );
	////
	////	savefile.ReadJoint( barrelJointView );
	////	savefile.ReadJoint( flashJointView );
	////	savefile.ReadJoint( ejectJointView );
	////	savefile.ReadJoint( guiLightJointView );
	////	savefile.ReadJoint( ventLightJointView );
	////
	////	savefile.ReadJoint( flashJointWorld );
	////	savefile.ReadJoint( barrelJointWorld );
	////	savefile.ReadJoint( ejectJointWorld );
	////
	////	savefile.ReadBool( hasBloodSplat );
	////
	////	savefile.ReadSoundShader( sndHum );
	////
	////	savefile.ReadParticle( weaponSmoke );
	////	savefile.ReadInt( weaponSmokeStartTime );
	////	savefile.ReadBool( continuousSmoke );
	////	savefile.ReadParticle( strikeSmoke );
	////	savefile.ReadInt( strikeSmokeStartTime );
	////	savefile.ReadVec3( strikePos );
	////	savefile.ReadMat3( strikeAxis );
	////	savefile.ReadInt( nextStrikeFx );
	////
	////	savefile.ReadBool( nozzleFx );
	////	savefile.ReadInt( nozzleFxFade );
	////
	////	savefile.ReadInt( lastAttack );
	////
	////	savefile.ReadInt( nozzleGlowHandle );
	////	savefile.ReadRenderLight( nozzleGlow );
	////
	////	savefile.ReadVec3( nozzleGlowColor );
	////	savefile.ReadMaterial( nozzleGlowShader );
	////	savefile.ReadFloat( nozzleGlowRadius );
	////
	////	savefile.ReadInt( weaponAngleOffsetAverages );
	////	savefile.ReadFloat( weaponAngleOffsetScale );
	////	savefile.ReadFloat( weaponAngleOffsetMax );
	////	savefile.ReadFloat( weaponOffsetTime );
	////	savefile.ReadFloat( weaponOffsetScale );
	////
	////	savefile.ReadBool( allowDrop );
	////	savefile.ReadObject( reinterpret_cast<idClass *&>( projectileEnt ) );
	////}
	////
	/////***********************************************************************
	////
	////	Weapon definition management
	////
	////***********************************************************************/
	////
	/////*
	////================
	////idWeapon::Clear
	////================
	////*/
	////void idWeapon::Clear( ) {
	////	CancelEvents( &EV_Weapon_Clear );
	////
	////	DeconstructScriptObject();
	////	this.scriptObject.Free();
	////
	////	WEAPON_ATTACK.Unlink();
	////	WEAPON_RELOAD.Unlink();
	////	WEAPON_NETRELOAD.Unlink();
	////	WEAPON_NETENDRELOAD.Unlink();
	////	WEAPON_NETFIRING.Unlink();
	////	WEAPON_RAISEWEAPON.Unlink();
	////	WEAPON_LOWERWEAPON.Unlink();
	////
	////	if ( muzzleFlashHandle != -1 ) {
	////		gameRenderWorld.FreeLightDef( muzzleFlashHandle );
	////		muzzleFlashHandle = -1;
	////	}
	////	if ( muzzleFlashHandle != -1 ) {
	////		gameRenderWorld.FreeLightDef( muzzleFlashHandle );
	////		muzzleFlashHandle = -1;
	////	}
	////	if ( worldMuzzleFlashHandle != -1 ) {
	////		gameRenderWorld.FreeLightDef( worldMuzzleFlashHandle );
	////		worldMuzzleFlashHandle = -1;
	////	}
	////	if ( guiLightHandle != -1 ) {
	////		gameRenderWorld.FreeLightDef( guiLightHandle );
	////		guiLightHandle = -1;
	////	}
	////	if ( nozzleGlowHandle != -1 ) {
	////		gameRenderWorld.FreeLightDef( nozzleGlowHandle );
	////		nozzleGlowHandle = -1;
	////	}
	////
	////	memset( &this.renderEntity, 0, sizeof( this.renderEntity ) );
	////	this.renderEntity.entityNum	= entityNumber;
	////
	////	this.renderEntity.noShadow		= true;
	////	this.renderEntity.noSelfShadow	= true;
	////	this.renderEntity.customSkin		= NULL;
	////
	////	// set default shader parms
	////	this.renderEntity.shaderParms[ SHADERPARM_RED ]	= 1.0f;
	////	this.renderEntity.shaderParms[ SHADERPARM_GREEN ]= 1.0f;
	////	this.renderEntity.shaderParms[ SHADERPARM_BLUE ]	= 1.0f;
	////	this.renderEntity.shaderParms[3] = 1.0f;
	////	this.renderEntity.shaderParms[ SHADERPARM_TIMEOFFSET ] = 0.0f;
	////	this.renderEntity.shaderParms[5] = 0.0f;
	////	this.renderEntity.shaderParms[6] = 0.0f;
	////	this.renderEntity.shaderParms[7] = 0.0f;
	////
	////	if ( refSound.referenceSound ) {
	////		refSound.referenceSound.Free( true );
	////	}
	////	memset( &refSound, 0, sizeof( refSound_t ) );
	////	
	////	// setting diversity to 0 results in no random sound.  -1 indicates random.
	////	refSound.diversity = -1.0f;
	////
	////	if ( this.owner ) {
	////		// don't spatialize the weapon sounds
	////		refSound.listenerId = this.owner.GetListenerId();
	////	}
	////
	////	// clear out the sounds from our spawnargs since we'll copy them from the weapon def
	////	const idKeyValue *kv = spawnArgs.MatchPrefix( "snd_" );
	////	while( kv ) {
	////		spawnArgs.Delete( kv.GetKey() );
	////		kv = spawnArgs.MatchPrefix( "snd_" );
	////	}
	////
	////	hideTime		= 300;
	////	hideDistance	= -15.0f;
	////	hideStartTime	= gameLocal.time - hideTime;
	////	hideStart		= 0.0f;
	////	hideEnd			= 0.0f;
	////	hideOffset		= 0.0f;
	////	hide			= false;
	////	disabled		= false;
	////
	////	weaponSmoke		= NULL;
	////	weaponSmokeStartTime = 0;
	////	continuousSmoke = false;
	////	strikeSmoke		= NULL;
	////	strikeSmokeStartTime = 0;
	////	strikePos.Zero();
	////	strikeAxis = mat3_identity;
	////	nextStrikeFx = 0;
	////
	////	icon			= "";
	////
	////	playerViewAxis.Identity();
	////	playerViewOrigin.Zero();
	////	viewWeaponAxis.Identity();
	////	viewWeaponOrigin.Zero();
	////	muzzleAxis.Identity();
	////	muzzleOrigin.Zero();
	////	pushVelocity.Zero();
	////
	////	status			= WP_HOLSTERED;
	////	state			= "";
	////	idealState		= "";
	////	animBlendFrames	= 0;
	////	animDoneTime	= 0;
	////
	////	projectileDict.Clear();
	////	meleeDef		= NULL;
	////	meleeDefName	= "";
	////	meleeDistance	= 0.0f;
	////	brassDict.Clear();
	////
	////	flashTime		= 250;
	////	lightOn			= false;
	////	silent_fire		= false;
	////
	////	ammoType		= 0;
	////	ammoRequired	= 0;
	////	ammoClip		= 0;
	////	clipSize		= 0;
	////	lowAmmo			= 0;
	////	powerAmmo		= false;
	////
	////	kick_endtime		= 0;
	////	muzzle_kick_time	= 0;
	////	muzzle_kick_maxtime	= 0;
	////	muzzle_kick_angles.Zero();
	////	muzzle_kick_offset.Zero();
	////
	////	zoomFov = 90;
	////
	////	barrelJointView		= jointHandle_t.INVALID_JOINT;
	////	flashJointView		= jointHandle_t.INVALID_JOINT;
	////	ejectJointView		= jointHandle_t.INVALID_JOINT;
	////	guiLightJointView	= jointHandle_t.INVALID_JOINT;
	////	ventLightJointView	= jointHandle_t.INVALID_JOINT;
	////
	////	barrelJointWorld	= jointHandle_t.INVALID_JOINT;
	////	flashJointWorld		= jointHandle_t.INVALID_JOINT;
	////	ejectJointWorld		= jointHandle_t.INVALID_JOINT;
	////
	////	hasBloodSplat		= false;
	////	nozzleFx			= false;
	////	nozzleFxFade		= 1500;
	////	lastAttack			= 0;
	////	nozzleGlowHandle	= -1;
	////	nozzleGlowShader	= NULL;
	////	nozzleGlowRadius	= 10;
	////	nozzleGlowColor.Zero();
	////
	////	weaponAngleOffsetAverages	= 0;
	////	weaponAngleOffsetScale		= 0.0f;
	////	weaponAngleOffsetMax		= 0.0f;
	////	weaponOffsetTime			= 0.0f;
	////	weaponOffsetScale			= 0.0f;
	////
	////	allowDrop			= true;
	////
	////	this.animator.ClearAllAnims( gameLocal.time, 0 );
	////	FreeModelDef();
	////
	////	sndHum				= NULL;
	////
	////	isLinked			= false;
	////	projectileEnt		= NULL;
	////
	////	isFiring			= false;
	////}
	////
	/////*
	////================
	////idWeapon::InitWorldModel
	////================
	////*/
	////void idWeapon::InitWorldModel( const idDeclEntityDef *def ) {
	////	var ent:idEntity
	////
	////	ent = worldModel.GetEntity();
	////
	////	assert( ent );
	////	assert( def );
	////
	////	const char *model = def.dict.GetString( "model_world" );
	////	const char *attach = def.dict.GetString( "joint_attach" );
	////
	////	ent.SetSkin( NULL );
	////	if ( model[0] && attach[0] ) {
	////		ent.Show();
	////		ent.SetModel( model );
	////		if ( ent.GetAnimator().ModelDef() ) {
	////			ent.SetSkin( ent.GetAnimator().ModelDef().GetDefaultSkin() );
	////		}
	////		ent.GetPhysics().SetContents( 0 );
	////		ent.GetPhysics().SetClipModel( NULL, 1.0f );
	////		ent.BindToJoint( this.owner, attach, true );
	////		ent.GetPhysics().SetOrigin( vec3_origin );
	////		ent.GetPhysics().SetAxis( mat3_identity );
	////
	////		// supress model in player views, but allow it in mirrors and remote views
	////		renderEntity_t *worldModelRenderEntity = ent.GetRenderEntity();
	////		if ( worldModelRenderEntity ) {
	////			worldModelRenderEntity.suppressSurfaceInViewID = this.owner.entityNumber+1;
	////			worldModelRenderEntity.suppressShadowInViewID = this.owner.entityNumber+1;
	////			worldModelRenderEntity.suppressShadowInLightID = LIGHTID_VIEW_MUZZLE_FLASH + this.owner.entityNumber;
	////		}
	////	} else {
	////		ent.SetModel( "" );
	////		ent.Hide();
	////	}
	////
	////	flashJointWorld = ent.GetAnimator().GetJointHandle( "flash" );
	////	barrelJointWorld = ent.GetAnimator().GetJointHandle( "muzzle" );
	////	ejectJointWorld = ent.GetAnimator().GetJointHandle( "eject" );
	////}
	////
	/////*
	////================
	////idWeapon::GetWeaponDef
	////================
	////*/
	////void idWeapon::GetWeaponDef( const char *objectname, int ammoinclip ) {
	////	const char *shader;
	////	const char *objectType;
	////	const char *vmodel;
	////	const char *guiName;
	////	const char *projectileName;
	////	const char *brassDefName;
	////	const char *smokeName;
	////	int			ammoAvail;
	////
	////	Clear();
	////
	////	if ( !objectname || !objectname[ 0 ] ) {
	////		return;
	////	}
	////
	////	assert( this.owner );
	////
	////	weaponDef			= gameLocal.FindEntityDef( objectname );
	////
	////	ammoType			= GetAmmoNumForName( weaponDef.dict.GetString( "ammoType" ) );
	////	ammoRequired		= weaponDef.dict.GetInt( "ammoRequired" );
	////	clipSize			= weaponDef.dict.GetInt( "clipSize" );
	////	lowAmmo				= weaponDef.dict.GetInt( "lowAmmo" );
	////
	////	icon				= weaponDef.dict.GetString( "icon" );
	////	silent_fire			= weaponDef.dict.GetBool( "silent_fire" );
	////	powerAmmo			= weaponDef.dict.GetBool( "powerAmmo" );
	////
	////	muzzle_kick_time	= SEC2MS( weaponDef.dict.GetFloat( "muzzle_kick_time" ) );
	////	muzzle_kick_maxtime	= SEC2MS( weaponDef.dict.GetFloat( "muzzle_kick_maxtime" ) );
	////	muzzle_kick_angles	= weaponDef.dict.GetAngles( "muzzle_kick_angles" );
	////	muzzle_kick_offset	= weaponDef.dict.GetVector( "muzzle_kick_offset" );
	////
	////	hideTime			= SEC2MS( weaponDef.dict.GetFloat( "hide_time", "0.3" ) );
	////	hideDistance		= weaponDef.dict.GetFloat( "hide_distance", "-15" );
	////
	////	// muzzle smoke
	////	smokeName = weaponDef.dict.GetString( "smoke_muzzle" );
	////	if ( *smokeName != '\0' ) {
	////		weaponSmoke = static_cast<const idDeclParticle *>( declManager.FindType( DECL_PARTICLE, smokeName ) );
	////	} else {
	////		weaponSmoke = NULL;
	////	}
	////	continuousSmoke = weaponDef.dict.GetBool( "continuousSmoke" );
	////	weaponSmokeStartTime = ( continuousSmoke ) ? gameLocal.time : 0;
	////
	////	smokeName = weaponDef.dict.GetString( "smoke_strike" );
	////	if ( *smokeName != '\0' ) {
	////		strikeSmoke = static_cast<const idDeclParticle *>( declManager.FindType( DECL_PARTICLE, smokeName ) );
	////	} else {
	////		strikeSmoke = NULL;
	////	}
	////	strikeSmokeStartTime = 0;
	////	strikePos.Zero();
	////	strikeAxis = mat3_identity;
	////	nextStrikeFx = 0;
	////
	////	// setup gui light
	////	memset( &guiLight, 0, sizeof( guiLight ) );
	////	const char *guiLightShader = weaponDef.dict.GetString( "mtr_guiLightShader" );
	////	if ( *guiLightShader != '\0' ) {
	////		guiLight.shader = declManager.FindMaterial( guiLightShader, false );
	////		guiLight.lightRadius[0] = guiLight.lightRadius[1] = guiLight.lightRadius[2] = 3;
	////		guiLight.pointLight = true;
	////	}
	////
	////	// setup the view model
	////	vmodel = weaponDef.dict.GetString( "model_view" );
	////	SetModel( vmodel );
	////
	////	// setup the world model
	////	InitWorldModel( weaponDef );
	////
	////	// copy the sounds from the weapon view model def into out spawnargs
	////	const idKeyValue *kv = weaponDef.dict.MatchPrefix( "snd_" );
	////	while( kv ) {
	////		spawnArgs.Set( kv.GetKey(), kv.GetValue() );
	////		kv = weaponDef.dict.MatchPrefix( "snd_", kv );
	////	}
	////
	////	// find some joints in the model for locating effects
	////	barrelJointView = this.animator.GetJointHandle( "barrel" );
	////	flashJointView = this.animator.GetJointHandle( "flash" );
	////	ejectJointView = this.animator.GetJointHandle( "eject" );
	////	guiLightJointView = this.animator.GetJointHandle( "guiLight" );
	////	ventLightJointView = this.animator.GetJointHandle( "ventLight" );
	////
	////	// get the projectile
	////	projectileDict.Clear();
	////
	////	projectileName = weaponDef.dict.GetString( "def_projectile" );
	////	if ( projectileName[0] != '\0' ) {
	////		const idDeclEntityDef *projectileDef = gameLocal.FindEntityDef( projectileName, false );
	////		if ( !projectileDef ) {
	////			gameLocal.Warning( "Unknown projectile '%s' in weapon '%s'", projectileName, objectname );
	////		} else {
	////			const char *spawnclass = projectileDef.dict.GetString( "spawnclass" );
	////			idTypeInfo *cls = idClass::GetClass( spawnclass );
	////			if ( !cls || !cls.IsType( idProjectile::Type ) ) {
	////				gameLocal.Warning( "Invalid spawnclass '%s' on projectile '%s' (used by weapon '%s')", spawnclass, projectileName, objectname );
	////			} else {
	////				projectileDict = projectileDef.dict;
	////			}
	////		}
	////	}
	////
	////	// set up muzzleflash render light
	////	const idMaterial*flashShader;
	////	idVec3			flashTarget;
	////	idVec3			flashUp;
	////	idVec3			flashRight;
	////	float			flashRadius;
	////	bool			flashPointLight;
	////
	////	weaponDef.dict.GetString( "mtr_flashShader", "", &shader );
	////	flashShader = declManager.FindMaterial( shader, false );
	////	flashPointLight = weaponDef.dict.GetBool( "flashPointLight", "1" );
	////	weaponDef.dict.GetVector( "flashColor", "0 0 0", flashColor );
	////	flashRadius		= (float)weaponDef.dict.GetInt( "flashRadius" );	// if 0, no light will spawn
	////	flashTime		= SEC2MS( weaponDef.dict.GetFloat( "flashTime", "0.25" ) );
	////	flashTarget		= weaponDef.dict.GetVector( "flashTarget" );
	////	flashUp			= weaponDef.dict.GetVector( "flashUp" );
	////	flashRight		= weaponDef.dict.GetVector( "flashRight" );
	////
	////	memset( &muzzleFlash, 0, sizeof( muzzleFlash ) );
	////	muzzleFlash.lightId = LIGHTID_VIEW_MUZZLE_FLASH + this.owner.entityNumber;
	////	muzzleFlash.allowLightInViewID = this.owner.entityNumber+1;
	////
	////	// the weapon lights will only be in first person
	////	guiLight.allowLightInViewID = this.owner.entityNumber+1;
	////	nozzleGlow.allowLightInViewID = this.owner.entityNumber+1;
	////
	////	muzzleFlash.pointLight								= flashPointLight;
	////	muzzleFlash.shader									= flashShader;
	////	muzzleFlash.shaderParms[ SHADERPARM_RED ]			= flashColor[0];
	////	muzzleFlash.shaderParms[ SHADERPARM_GREEN ]			= flashColor[1];
	////	muzzleFlash.shaderParms[ SHADERPARM_BLUE ]			= flashColor[2];
	////	muzzleFlash.shaderParms[ SHADERPARM_TIMESCALE ]		= 1.0f;
	////
	////	muzzleFlash.lightRadius[0]							= flashRadius;
	////	muzzleFlash.lightRadius[1]							= flashRadius;
	////	muzzleFlash.lightRadius[2]							= flashRadius;
	////
	////	if ( !flashPointLight ) {
	////		muzzleFlash.target								= flashTarget;
	////		muzzleFlash.up									= flashUp;
	////		muzzleFlash.right								= flashRight;
	////		muzzleFlash.end									= flashTarget;
	////	}
	////
	////	// the world muzzle flash is the same, just positioned differently
	////	worldMuzzleFlash = muzzleFlash;
	////	worldMuzzleFlash.suppressLightInViewID = this.owner.entityNumber+1;
	////	worldMuzzleFlash.allowLightInViewID = 0;
	////	worldMuzzleFlash.lightId = LIGHTID_WORLD_MUZZLE_FLASH + this.owner.entityNumber;
	////
	////	//-----------------------------------
	////
	////	nozzleFx			= weaponDef.dict.GetBool("nozzleFx");
	////	nozzleFxFade		= weaponDef.dict.GetInt("nozzleFxFade", "1500");
	////	nozzleGlowColor		= weaponDef.dict.GetVector("nozzleGlowColor", "1 1 1");
	////	nozzleGlowRadius	= weaponDef.dict.GetFloat("nozzleGlowRadius", "10");
	////	weaponDef.dict.GetString( "mtr_nozzleGlowShader", "", &shader );
	////	nozzleGlowShader = declManager.FindMaterial( shader, false );
	////
	////	// get the melee damage def
	////	meleeDistance = weaponDef.dict.GetFloat( "melee_distance" );
	////	meleeDefName = weaponDef.dict.GetString( "def_melee" );
	////	if ( meleeDefName.Length() ) {
	////		meleeDef = gameLocal.FindEntityDef( meleeDefName, false );
	////		if ( !meleeDef ) {
	////			gameLocal.Error( "Unknown melee '%s'", meleeDefName.c_str() );
	////		}
	////	}
	////
	////	// get the brass def
	////	brassDict.Clear();
	////	brassDelay = weaponDef.dict.GetInt( "ejectBrassDelay", "0" );
	////	brassDefName = weaponDef.dict.GetString( "def_ejectBrass" );
	////
	////	if ( brassDefName[0] ) {
	////		const idDeclEntityDef *brassDef = gameLocal.FindEntityDef( brassDefName, false );
	////		if ( !brassDef ) {
	////			gameLocal.Warning( "Unknown brass '%s'", brassDefName );
	////		} else {
	////			brassDict = brassDef.dict;
	////		}
	////	}
	////
	////	if ( ( ammoType < 0 ) || ( ammoType >= AMMO_NUMTYPES ) ) {
	////		gameLocal.Warning( "Unknown ammotype in object '%s'", objectname );
	////	}
	////
	////	ammoClip = ammoinclip;
	////	if ( ( ammoClip < 0 ) || ( ammoClip > clipSize ) ) {
	////		// first time using this weapon so have it fully loaded to start
	////		ammoClip = clipSize;
	////		ammoAvail = this.owner.inventory.HasAmmo( ammoType, ammoRequired );
	////		if ( ammoClip > ammoAvail ) {
	////			ammoClip = ammoAvail;
	////		}
	////	}
	////
	////	this.renderEntity.gui[ 0 ] = NULL;
	////	guiName = weaponDef.dict.GetString( "gui" );
	////	if ( guiName[0] ) {
	////		this.renderEntity.gui[ 0 ] = uiManager.FindGui( guiName, true, false, true );
	////	}
	////
	////	zoomFov = weaponDef.dict.GetInt( "zoomFov", "70" );
	////	berserk = weaponDef.dict.GetInt( "berserk", "2" );
	////
	////	weaponAngleOffsetAverages = weaponDef.dict.GetInt( "weaponAngleOffsetAverages", "10" );
	////	weaponAngleOffsetScale = weaponDef.dict.GetFloat( "weaponAngleOffsetScale", "0.25" );
	////	weaponAngleOffsetMax = weaponDef.dict.GetFloat( "weaponAngleOffsetMax", "10" );
	////
	////	weaponOffsetTime = weaponDef.dict.GetFloat( "weaponOffsetTime", "400" );
	////	weaponOffsetScale = weaponDef.dict.GetFloat( "weaponOffsetScale", "0.005" );
	////
	////	if ( !weaponDef.dict.GetString( "weapon_scriptobject", NULL, &objectType ) ) {
	////		gameLocal.Error( "No 'weapon_scriptobject' set on '%s'.", objectname );
	////	}
	////	
	////	// setup script object
	////	if ( !this.scriptObject.SetType( objectType ) ) {
	////		gameLocal.Error( "Script object '%s' not found on weapon '%s'.", objectType, objectname );
	////	}
	////
	////	WEAPON_ATTACK.LinkTo(		this.scriptObject, "WEAPON_ATTACK" );
	////	WEAPON_RELOAD.LinkTo(		this.scriptObject, "WEAPON_RELOAD" );
	////	WEAPON_NETRELOAD.LinkTo(	this.scriptObject, "WEAPON_NETRELOAD" );
	////	WEAPON_NETENDRELOAD.LinkTo(	this.scriptObject, "WEAPON_NETENDRELOAD" );
	////	WEAPON_NETFIRING.LinkTo(	this.scriptObject, "WEAPON_NETFIRING" );
	////	WEAPON_RAISEWEAPON.LinkTo(	this.scriptObject, "WEAPON_RAISEWEAPON" );
	////	WEAPON_LOWERWEAPON.LinkTo(	this.scriptObject, "WEAPON_LOWERWEAPON" );
	////
	////	spawnArgs = opEquals(? weaponDef.dict;
	////
	////	shader = spawnArgs.GetString( "snd_hum" );
	////	if ( shader && *shader ) {
	////		sndHum = declManager.FindSound( shader );
	////		StartSoundShader( sndHum, SND_CHANNEL_BODY, 0, false, NULL );
	////	}
	////
	////	isLinked = true;
	////
	////	// call script object's constructor
	////	ConstructScriptObject();
	////
	////	// make sure we have the correct skin
	////	UpdateSkin();
	////}
	////
	/////***********************************************************************
	////
	////	GUIs
	////
	////***********************************************************************/
	////
	/////*
	////================
	////idWeapon::Icon
	////================
	////*/
	////const char *idWeapon::Icon( ) const {
	////	return icon;
	////}
	////
	/////*
	////================
	////idWeapon::UpdateGUI
	////================
	////*/
	////void idWeapon::UpdateGUI( ) {
	////	if ( !this.renderEntity.gui[ 0 ] ) {
	////		return;
	////	}
	////	
	////	if ( status == WP_HOLSTERED ) {
	////		return;
	////	}
	////
	////	if ( this.owner.weaponGone ) {
	////		// dropping weapons was implemented wierd, so we have to not update the gui when it happens or we'll get a negative ammo count
	////		return;
	////	}
	////
	////	if ( gameLocal.localClientNum != this.owner.entityNumber ) {
	////		// if updating the hud for a followed client
	////		if ( gameLocal.localClientNum >= 0 && gameLocal.entities[ gameLocal.localClientNum ] && gameLocal.entities[ gameLocal.localClientNum ].IsType( idPlayer::Type ) ) {
	////			idPlayer *p = static_cast< idPlayer * >( gameLocal.entities[ gameLocal.localClientNum ] );
	////			if ( !p.spectating || p.spectator != this.owner.entityNumber ) {
	////				return;
	////			}
	////		} else {
	////			return;
	////		}
	////	}
	////
	////	int inclip = AmmoInClip();
	////	int ammoamount = AmmoAvailable();
	////
	////	if ( ammoamount < 0 ) {
	////		// show infinite ammo
	////		this.renderEntity.gui[ 0 ].SetStateString( "player_ammo", "" );
	////	} else {
	////		// show remaining ammo
	////		this.renderEntity.gui[ 0 ].SetStateString( "player_totalammo", va( "%i", ammoamount - inclip) );
	////		this.renderEntity.gui[ 0 ].SetStateString( "player_ammo", ClipSize() ? va( "%i", inclip ) : "--" );
	////		this.renderEntity.gui[ 0 ].SetStateString( "player_clips", ClipSize() ? va("%i", ammoamount / ClipSize()) : "--" );
	////		this.renderEntity.gui[ 0 ].SetStateString( "player_allammo", va( "%i/%i", inclip, ammoamount - inclip ) );
	////	}
	////	this.renderEntity.gui[ 0 ].SetStateBool( "player_ammo_empty", ( ammoamount == 0 ) );
	////	this.renderEntity.gui[ 0 ].SetStateBool( "player_clip_empty", ( inclip == 0 ) );
	////	this.renderEntity.gui[ 0 ].SetStateBool( "player_clip_low", ( inclip <= lowAmmo ) );
	////}
	////
	/////***********************************************************************
	////
	////	Model and muzzleflash
	////
	////***********************************************************************/
	////
	/////*
	////================
	////idWeapon::UpdateFlashPosition
	////================
	////*/
	////void idWeapon::UpdateFlashPosition( ) {
	////	// the flash has an explicit joint for locating it
	////	GetGlobalJointTransform( true, flashJointView, muzzleFlash.origin, muzzleFlash.axis );
	////
	////	// if the desired point is inside or very close to a wall, back it up until it is clear
	////	idVec3	start = muzzleFlash.origin - playerViewAxis[0] * 16;
	////	idVec3	end = muzzleFlash.origin + playerViewAxis[0] * 8;
	////	trace_t	tr;
	////	gameLocal.clip.TracePoint( tr, start, end, MASK_SHOT_RENDERMODEL, this.owner );
	////	// be at least 8 units away from a solid
	////	muzzleFlash.origin = tr.endpos - playerViewAxis[0] * 8;
	////
	////	// put the world muzzle flash on the end of the joint, no matter what
	////	GetGlobalJointTransform( false, flashJointWorld, worldMuzzleFlash.origin, worldMuzzleFlash.axis );
	////}
	////
	/////*
	////================
	////idWeapon::MuzzleFlashLight
	////================
	////*/
	////void idWeapon::MuzzleFlashLight( ) {
	////	
	////	if ( !lightOn && ( !g_muzzleFlash.GetBool() || !muzzleFlash.lightRadius[0] ) ) {
	////		return;
	////	}
	////
	////	if ( flashJointView == jointHandle_t.INVALID_JOINT ) {
	////		return;
	////	}
	////
	////	UpdateFlashPosition();
	////
	////	// these will be different each fire
	////	muzzleFlash.shaderParms[ SHADERPARM_TIMEOFFSET ]	= -MS2SEC( gameLocal.time );
	////	muzzleFlash.shaderParms[ SHADERPARM_DIVERSITY ]		= this.renderEntity.shaderParms[ SHADERPARM_DIVERSITY ];
	////
	////	worldMuzzleFlash.shaderParms[ SHADERPARM_TIMEOFFSET ]	= -MS2SEC( gameLocal.time );
	////	worldMuzzleFlash.shaderParms[ SHADERPARM_DIVERSITY ]	= this.renderEntity.shaderParms[ SHADERPARM_DIVERSITY ];
	////
	////	// the light will be removed at this time
	////	muzzleFlashEnd = gameLocal.time + flashTime;
	////
	////	if ( muzzleFlashHandle != -1 ) {
	////		gameRenderWorld.UpdateLightDef( muzzleFlashHandle, &muzzleFlash );
	////		gameRenderWorld.UpdateLightDef( worldMuzzleFlashHandle, &worldMuzzleFlash );
	////	} else {
	////		muzzleFlashHandle = gameRenderWorld.AddLightDef( &muzzleFlash );
	////		worldMuzzleFlashHandle = gameRenderWorld.AddLightDef( &worldMuzzleFlash );
	////	}
	////}
	////
	/////*
	////================
	////idWeapon::UpdateSkin
	////================
	////*/
	////bool idWeapon::UpdateSkin( ) {
	////	const function_t *func;
	////
	////	if ( !isLinked ) {
	////		return false;
	////	}
	////
	////	func = this.scriptObject.GetFunction( "UpdateSkin" );
	////	if ( !func ) {
	////		common.Warning( "Can't find function 'UpdateSkin' in object '%s'", this.scriptObject.GetTypeName() );
	////		return false;
	////	}
	////	
	////	// use the frameCommandThread since it's safe to use outside of framecommands
	////	gameLocal.frameCommandThread.CallFunction( this, func, true );
	////	gameLocal.frameCommandThread.Execute();
	////
	////	return true;
	////}

	/*
	================
	idWeapon::SetModel
	================
	*/
	SetModel ( modelname: string ): void {
		assert( modelname );

		if ( this.modelDefHandle >= 0 ) {
			gameRenderWorld.RemoveDecals( this.modelDefHandle );
		}

		this.renderEntity.hModel = this.animator.SetModel( modelname );
		if ( this.renderEntity.hModel ) {
			this.renderEntity.customSkin = this.animator.ModelDef ( ).GetDefaultSkin ( );
			var $numJoints = new R( this.renderEntity.numJoints );
			var $joints = new R( this.renderEntity.joints );
			this.animator.GetJoints( $numJoints, $joints );
			this.renderEntity.numJoints = $numJoints.$;
			this.renderEntity.joints = $joints.$;
		} else {
			this.renderEntity.customSkin = null;
			this.renderEntity.callback = null;
			this.renderEntity.numJoints = 0;
			this.renderEntity.joints = null;
		}

		// hide the model until an animation is played
		this.Hide ( );
	}

/////*
////================
////idWeapon::GetGlobalJointTransform
////
////This returns the offset and axis of a weapon bone in world space, suitable for attaching models or lights
////================
////*/
////bool idWeapon::GetGlobalJointTransform( bool viewModel, const jointHandle_t jointHandle, idVec3 &offset, idMat3 &axis ) {
////	if ( viewModel ) {
////		// view model
////		if ( this.animator.GetJointTransform( jointHandle, gameLocal.time, offset, axis ) ) {
////			offset = offset * viewWeaponAxis + viewWeaponOrigin;
////			axis = axis * viewWeaponAxis;
////			return true;
////		}
////	} else {
////		// world model
////		if ( worldModel.GetEntity() && worldModel.GetEntity().GetAnimator().GetJointTransform( jointHandle, gameLocal.time, offset, axis ) ) {
////			offset = worldModel.GetEntity().GetPhysics().GetOrigin() + offset * worldModel.GetEntity().GetPhysics().GetAxis();
////			axis = axis * worldModel.GetEntity().GetPhysics().GetAxis();
////			return true;
////		}
////	}
////	offset = viewWeaponOrigin;
////	axis = viewWeaponAxis;
////	return false;
////}
////
/////*
////================
////idWeapon::SetPushVelocity
////================
////*/
////void idWeapon::SetPushVelocity( const idVec3 &pushVelocity ) {
////	this.pushVelocity = pushVelocity;
////}
////
////
/////***********************************************************************
////
////	State control/player interface
////
////***********************************************************************/
////
/////*
////================
////idWeapon::Think
////================
////*/
	Think(): void {
		todoThrow();
////	// do nothing because the present is called from the player through PresentWeapon
}
////
/////*
////================
////idWeapon::Raise
////================
////*/
////void idWeapon::Raise( ) {
////	if ( isLinked ) {
////		WEAPON_RAISEWEAPON = true;
////	}
////}
////
/////*
////================
////idWeapon::PutAway
////================
////*/
////void idWeapon::PutAway( ) {
////	hasBloodSplat = false;
////	if ( isLinked ) {
////		WEAPON_LOWERWEAPON = true;
////	}
////}
////
/////*
////================
////idWeapon::Reload
////NOTE: this is only for impulse-triggered reload, auto reload is scripted
////================
////*/
////void idWeapon::Reload( ) {
////	if ( isLinked ) {
////		WEAPON_RELOAD = true;
////	}
////}
////
/////*
////================
////idWeapon::LowerWeapon
////================
////*/
////void idWeapon::LowerWeapon( ) {
////	if ( !hide ) {
////		hideStart	= 0.0f;
////		hideEnd		= hideDistance;
////		if ( gameLocal.time - hideStartTime < hideTime ) {
////			hideStartTime = gameLocal.time - ( hideTime - ( gameLocal.time - hideStartTime ) );
////		} else {
////			hideStartTime = gameLocal.time;
////		}
////		hide = true;
////	}
////}
////
/////*
////================
////idWeapon::RaiseWeapon
////================
////*/
////void idWeapon::RaiseWeapon( ) {
////	Show();
////
////	if ( hide ) {
////		hideStart	= hideDistance;
////		hideEnd		= 0.0f;
////		if ( gameLocal.time - hideStartTime < hideTime ) {
////			hideStartTime = gameLocal.time - ( hideTime - ( gameLocal.time - hideStartTime ) );
////		} else {
////			hideStartTime = gameLocal.time;
////		}
////		hide = false;
////	}
////}
////
/////*
////================
////idWeapon::HideWeapon
////================
////*/
////void idWeapon::HideWeapon( ) {
////	this.Hide();
////	if ( worldModel.GetEntity() ) {
////		worldModel.GetEntity().Hide();
////	}
////	muzzleFlashEnd = 0;
////}
////
/////*
////================
////idWeapon::ShowWeapon
////================
////*/
////void idWeapon::ShowWeapon( ) {
////	Show();
////	if ( worldModel.GetEntity() ) {
////		worldModel.GetEntity().Show();
////	}
////	if ( lightOn ) {
////		MuzzleFlashLight();
////	}
////}

/*
================
idWeapon::HideWorldModel
================
*/
	HideWorldModel(): void {
		todoThrow ( );
		//if ( worldModel.GetEntity ( ) ) {
		//	worldModel.GetEntity ( ).Hide ( );
		//}
	}

/////*
////================
////idWeapon::ShowWorldModel
////================
////*/
////void idWeapon::ShowWorldModel( ) {
////	if ( worldModel.GetEntity() ) {
////		worldModel.GetEntity().Show();
////	}
////}
////
/////*
////================
////idWeapon::OwnerDied
////================
////*/
////void idWeapon::OwnerDied( ) {
////	if ( isLinked ) {
////		SetState( "OwnerDied", 0 );
////		this.thread.Execute();
////	}
////
////	this.Hide();
////	if ( worldModel.GetEntity() ) {
////		worldModel.GetEntity().Hide();
////	}
////
////	// don't clear the weapon immediately since the owner might have killed himself by firing the weapon
////	// within the current stack frame
////	PostEventMS( &EV_Weapon_Clear, 0 );
////}
////
/////*
////================
////idWeapon::BeginAttack
////================
////*/
////void idWeapon::BeginAttack( ) {	
////	if ( status != WP_OUTOFAMMO ) {
////		lastAttack = gameLocal.time;
////	}
////
////	if ( !isLinked ) {
////		return;
////	}
////
////	if ( !WEAPON_ATTACK ) {
////		if ( sndHum ) {
////			StopSound( SND_CHANNEL_BODY, false );
////		}
////	}
////	WEAPON_ATTACK = true;
////}
////
/////*
////================
////idWeapon::EndAttack
////================
////*/
////void idWeapon::EndAttack( ) {
////	if ( !WEAPON_ATTACK.IsLinked() ) {
////		return;
////	}
////	if ( WEAPON_ATTACK ) {
////		WEAPON_ATTACK = false;
////		if ( sndHum ) {
////			StartSoundShader( sndHum, SND_CHANNEL_BODY, 0, false, NULL );
////		}
////	}
////}
////
/////*
////================
////idWeapon::isReady
////================
////*/
////bool idWeapon::IsReady( ) const {
////	return !hide && !IsHidden() && ( ( status == WP_RELOAD ) || ( status == WP_READY ) || ( status == WP_OUTOFAMMO ) );
////}
////
/////*
////================
////idWeapon::IsReloading
////================
////*/
////bool idWeapon::IsReloading( ) const {
////	return ( status == WP_RELOAD );
////}
////
/////*
////================
////idWeapon::IsHolstered
////================
////*/
////bool idWeapon::IsHolstered( ) const {
////	return ( status == WP_HOLSTERED );
////}
////
/////*
////================
////idWeapon::ShowCrosshair
////================
////*/
////bool idWeapon::ShowCrosshair( ) const {
////	return !( state == idStr( WP_RISING ) || state == idStr( WP_LOWERING ) || state == idStr( WP_HOLSTERED ) );
////}
////
/////*
////=====================
////idWeapon::CanDrop
////=====================
////*/
////bool idWeapon::CanDrop( ) const {
////	if ( !weaponDef || !worldModel.GetEntity() ) {
////		return false;
////	}
////	const char *classname = weaponDef.dict.GetString( "def_dropItem" );
////	if ( !classname[ 0 ] ) {
////		return false;
////	}
////	return true;
////}
////
/////*
////================
////idWeapon::WeaponStolen
////================
////*/
////void idWeapon::WeaponStolen( ) {
////	assert( !gameLocal.isClient );
////	if ( projectileEnt ) {
////		if ( isLinked ) {
////			SetState( "WeaponStolen", 0 );
////			this.thread.Execute();
////		}
////		projectileEnt = NULL;
////	}
////
////	// set to holstered so we can switch weapons right away
////	status = WP_HOLSTERED;
////
////	HideWeapon();
////}
////
/////*
////=====================
////idWeapon::DropItem
////=====================
////*/
////idEntity * idWeapon::DropItem( const idVec3 &velocity, int activateDelay, int removeDelay, bool died ) {
////	if ( !weaponDef || !worldModel.GetEntity() ) {
////		return NULL;
////	}
////	if ( !allowDrop ) {
////		return NULL;
////	}
////	const char *classname = weaponDef.dict.GetString( "def_dropItem" );
////	if ( !classname[0] ) {
////		return NULL;
////	}
////	StopSound( SND_CHANNEL_BODY, true );
////	StopSound( SND_CHANNEL_BODY3, true );
////
////	return idMoveableItem::DropItem( classname, worldModel.GetEntity().GetPhysics().GetOrigin(), worldModel.GetEntity().GetPhysics().GetAxis(), velocity, activateDelay, removeDelay );
////}
////
/////***********************************************************************
////
////	Script state management
////
////***********************************************************************/
////
/////*
////=====================
////idWeapon::SetState
////=====================
////*/
////void idWeapon::SetState( const char *statename, int blendFrames ) {
////	const function_t *func;
////
////	if ( !isLinked ) {
////		return;
////	}
////
////	func = this.scriptObject.GetFunction( statename );
////	if ( !func ) {
////		assert( 0 );
////		gameLocal.Error( "Can't find function '%s' in object '%s'", statename, this.scriptObject.GetTypeName() );
////	}
////
////	this.thread.CallFunction( this, func, true );
////	state = statename;
////
////	animBlendFrames = blendFrames;
////	if ( g_debugWeapon.GetBool() ) {
////		gameLocal.Printf( "%d: weapon state : %s\n", gameLocal.time, statename );
////	}
////
////	idealState = "";
////}
////
////
/////***********************************************************************
////
////	Particles/Effects
////
////***********************************************************************/
////
/////*
////================
////idWeapon::UpdateNozzelFx
////================
////*/
////void idWeapon::UpdateNozzleFx( ) {
////	if ( !nozzleFx ) {
////		return;
////	}
////
////	//
////	// shader parms
////	//
////	int la = gameLocal.time - lastAttack + 1;
////	float s = 1.0f;
////	float l = 0.0f;
////	if ( la < nozzleFxFade ) {
////		s = ((float)la / nozzleFxFade);
////		l = 1.0f - s;
////	}
////	this.renderEntity.shaderParms[5] = s;
////	this.renderEntity.shaderParms[6] = l;
////
////	if ( ventLightJointView == jointHandle_t.INVALID_JOINT ) {
////		return;
////	}
////
////	//
////	// vent light
////	//
////	if ( nozzleGlowHandle == -1 ) {
////		memset(&nozzleGlow, 0, sizeof(nozzleGlow));
////		if ( this.owner ) {
////			nozzleGlow.allowLightInViewID = this.owner.entityNumber+1;
////		}
////		nozzleGlow.pointLight = true;
////		nozzleGlow.noShadows = true;
////		nozzleGlow.lightRadius.x = nozzleGlowRadius;
////		nozzleGlow.lightRadius.y = nozzleGlowRadius;
////		nozzleGlow.lightRadius.z = nozzleGlowRadius;
////		nozzleGlow.shader = nozzleGlowShader;
////		nozzleGlow.shaderParms[ SHADERPARM_TIMESCALE ]	= 1.0f;
////		nozzleGlow.shaderParms[ SHADERPARM_TIMEOFFSET ]	= -MS2SEC( gameLocal.time );
////		GetGlobalJointTransform( true, ventLightJointView, nozzleGlow.origin, nozzleGlow.axis );
////		nozzleGlowHandle = gameRenderWorld.AddLightDef(&nozzleGlow);
////	}
////
////	GetGlobalJointTransform( true, ventLightJointView, nozzleGlow.origin, nozzleGlow.axis );
////
////	nozzleGlow.shaderParms[ SHADERPARM_RED ] = nozzleGlowColor.x * s;
////	nozzleGlow.shaderParms[ SHADERPARM_GREEN ] = nozzleGlowColor.y * s;
////	nozzleGlow.shaderParms[ SHADERPARM_BLUE ] = nozzleGlowColor.z * s;
////	gameRenderWorld.UpdateLightDef(nozzleGlowHandle, &nozzleGlow);
////}
////
////
/////*
////================
////idWeapon::BloodSplat
////================
////*/
////bool idWeapon::BloodSplat( float size ) {
////	float s, c;
////	idMat3 localAxis, axistemp;
////	idVec3 localOrigin, normal;
////
////	if ( hasBloodSplat ) {
////		return true;
////	}
////
////	hasBloodSplat = true;
////
////	if ( this.modelDefHandle < 0 ) {
////		return false;
////	}
////
////	if ( !GetGlobalJointTransform( true, ejectJointView, localOrigin, localAxis ) ) {
////		return false;
////	}
////
////	localOrigin[0] += gameLocal.random.RandomFloat() * -10.0f;
////	localOrigin[1] += gameLocal.random.RandomFloat() * 1.0f;
////	localOrigin[2] += gameLocal.random.RandomFloat() * -2.0f;
////
////	normal = idVec3( gameLocal.random.CRandomFloat(), -gameLocal.random.RandomFloat(), -1 );
////	normal.Normalize();
////
////	idMath::SinCos16( gameLocal.random.RandomFloat() * idMath::TWO_PI, s, c );
////
////	localAxis[2] = -normal;
////	localAxis[2].NormalVectors( axistemp[0], axistemp[1] );
////	localAxis[0] = axistemp[ 0 ] * c + axistemp[ 1 ] * -s;
////	localAxis[1] = axistemp[ 0 ] * -s + axistemp[ 1 ] * -c;
////
////	localAxis[0] *= 1.0f / size;
////	localAxis[1] *= 1.0f / size;
////
////	idPlane		localPlane[2];
////
////	localPlane[0] = localAxis[0];
////	localPlane[0][3] = -(localOrigin * localAxis[0]) + 0.5f;
////
////	localPlane[1] = localAxis[1];
////	localPlane[1][3] = -(localOrigin * localAxis[1]) + 0.5f;
////
////	const idMaterial *mtr = declManager.FindMaterial( "textures/decals/duffysplatgun" );
////
////	gameRenderWorld.ProjectOverlay( this.modelDefHandle, localPlane, mtr );
////
////	return true;
////}
////
////
/////***********************************************************************
////
////	Visual presentation
////
////***********************************************************************/
////
/////*
////================
////idWeapon::MuzzleRise
////
////The machinegun and chaingun will incrementally back up as they are being fired
////================
////*/
////void idWeapon::MuzzleRise(origin: idVec3, idMat3 &axis ) {
////	int			time;
////	float		amount;
////	idAngles	ang;
////	idVec3		offset;
////
////	time = kick_endtime - gameLocal.time;
////	if ( time <= 0 ) {
////		return;
////	}
////
////	if ( muzzle_kick_maxtime <= 0 ) {
////		return;
////	}
////
////	if ( time > muzzle_kick_maxtime ) {
////		time = muzzle_kick_maxtime;
////	}
////	
////	amount = ( float )time / ( float )muzzle_kick_maxtime;
////	ang		= muzzle_kick_angles * amount;
////	offset	= muzzle_kick_offset * amount;
////
////	origin = origin - axis * offset;
////	axis = ang.ToMat3() * axis;
////}
////
/*
================
idWeapon::ConstructScriptObject

Called during idEntity::Spawn.  Calls the constructor on the script object.
Can be overridden by subclasses when a thread doesn't need to be allocated.
================
*/
	ConstructScriptObject ( ): idThread {
		var $constructor: function_t;

		this.thread.EndThread ( );

		// call script object's constructor
		$constructor = this.scriptObject.GetConstructor ( );
		if (!$constructor ) {
			gameLocal.Error( "Missing constructor on '%s' for weapon", this.scriptObject.GetTypeName ( ) );
		}

		// init the script object's data
		this.scriptObject.ClearObject ( );
		this.thread.CallFunction(this, $constructor, true );
		this.thread.Execute ( );

		return this.thread;
	}

/*
================
idWeapon::DeconstructScriptObject

Called during idEntity::~idEntity.  Calls the destructor on the script object.
Can be overridden by subclasses when a thread doesn't need to be allocated.
Not called during idGameLocal::MapShutdown.
================
*/
////void idWeapon::DeconstructScriptObject( ) {
////	const function_t *destructor;
////
////	if ( !this.thread ) {
////		return;
////	}
////	
////	// don't bother calling the script object's destructor on map shutdown
////	if ( gameLocal.GameState() == GAMESTATE_SHUTDOWN ) {
////		return;
////	}
////
////	this.thread.EndThread();
////
////	// call script object's destructor
////	destructor = this.scriptObject.GetDestructor();
////	if ( destructor ) {
////		// start a thread that will run immediately and end
////		this.thread.CallFunction( this, destructor, true );
////		this.thread.Execute();
////		this.thread.EndThread();
////	}
////
////	// clear out the object's memory
////	this.scriptObject.ClearObject();
////}
////
/////*
////================
////idWeapon::UpdateScript
////================
////*/
////void idWeapon::UpdateScript( ) {
////	int	count;
////
////	if ( !isLinked ) {
////		return;
////	}
////
////	// only update the script on new frames
////	if ( !gameLocal.isNewFrame ) {
////		return;
////	}
////
////	if ( idealState.Length() ) {
////		SetState( idealState, animBlendFrames );
////	}
////
////	// update script state, which may call Event_LaunchProjectiles, among other things
////	count = 10;
////	while( ( this.thread.Execute() || idealState.Length() ) && count-- ) {
////		// happens for weapons with no clip (like grenades)
////		if ( idealState.Length() ) {
////			SetState( idealState, animBlendFrames );
////		}
////	}
////
////	WEAPON_RELOAD = false;
////}
////
/////*
////================
////idWeapon::AlertMonsters
////================
////*/
////void idWeapon::AlertMonsters( ) {
////	trace_t	tr;
////	var ent:idEntity
////	idVec3 end = muzzleFlash.origin + muzzleFlash.axis * muzzleFlash.target;
////
////	gameLocal.clip.TracePoint( tr, muzzleFlash.origin, end, CONTENTS_OPAQUE | MASK_SHOT_RENDERMODEL | CONTENTS_FLASHLIGHT_TRIGGER, this.owner );
////	if ( g_debugWeapon.GetBool() ) {
////		gameRenderWorld.DebugLine( colorYellow, muzzleFlash.origin, end, 0 );
////		gameRenderWorld.DebugArrow( colorGreen, muzzleFlash.origin, tr.endpos, 2, 0 );
////	}
////
////	if ( tr.fraction < 1.0f ) {
////		ent = gameLocal.GetTraceEntity( tr );
////		if ( ent.IsType( idAI::Type ) ) {
////			static_cast<idAI *>( ent ).TouchedByFlashlight( this.owner );
////		} else if ( ent.IsType( idTrigger::Type ) ) {
////			ent.Signal( SIG_TOUCH );
////			ent.ProcessEvent( &EV_Touch, this.owner, &tr );
////		}
////	}
////
////	// jitter the trace to try to catch cases where a trace down the center doesn't hit the monster
////	end += muzzleFlash.axis * muzzleFlash.right * idMath::Sin16( MS2SEC( gameLocal.time ) * 31.34f );
////	end += muzzleFlash.axis * muzzleFlash.up * idMath::Sin16( MS2SEC( gameLocal.time ) * 12.17f );
////	gameLocal.clip.TracePoint( tr, muzzleFlash.origin, end, CONTENTS_OPAQUE | MASK_SHOT_RENDERMODEL | CONTENTS_FLASHLIGHT_TRIGGER, this.owner );
////	if ( g_debugWeapon.GetBool() ) {
////		gameRenderWorld.DebugLine( colorYellow, muzzleFlash.origin, end, 0 );
////		gameRenderWorld.DebugArrow( colorGreen, muzzleFlash.origin, tr.endpos, 2, 0 );
////	}
////
////	if ( tr.fraction < 1.0f ) {
////		ent = gameLocal.GetTraceEntity( tr );
////		if ( ent.IsType( idAI::Type ) ) {
////			static_cast<idAI *>( ent ).TouchedByFlashlight( this.owner );
////		} else if ( ent.IsType( idTrigger::Type ) ) {
////			ent.Signal( SIG_TOUCH );
////			ent.ProcessEvent( &EV_Touch, this.owner, &tr );
////		}
////	}
////}
////
/////*
////================
////idWeapon::PresentWeapon
////================
////*/
////void idWeapon::PresentWeapon( bool showViewModel ) {
////	playerViewOrigin = this.owner.firstPersonViewOrigin;
////	playerViewAxis = this.owner.firstPersonViewAxis;
////
////	// calculate weapon position based on player movement bobbing
////	this.owner.CalculateViewWeaponPos( viewWeaponOrigin, viewWeaponAxis );
////
////	// hide offset is for dropping the gun when approaching a GUI or NPC
////	// This is simpler to manage than doing the weapon put-away animation
////	if ( gameLocal.time - hideStartTime < hideTime ) {		
////		float frac = ( float )( gameLocal.time - hideStartTime ) / ( float )hideTime;
////		if ( hideStart < hideEnd ) {
////			frac = 1.0f - frac;
////			frac = 1.0f - frac * frac;
////		} else {
////			frac = frac * frac;
////		}
////		hideOffset = hideStart + ( hideEnd - hideStart ) * frac;
////	} else {
////		hideOffset = hideEnd;
////		if ( hide && disabled ) {
////			this.Hide();
////		}
////	}
////	viewWeaponOrigin += hideOffset * viewWeaponAxis[ 2 ];
////
////	// kick up based on repeat firing
////	MuzzleRise( viewWeaponOrigin, viewWeaponAxis );
////
////	// set the physics position and orientation
////	GetPhysics().SetOrigin( viewWeaponOrigin );
////	GetPhysics().SetAxis( viewWeaponAxis );
////	UpdateVisuals();
////
////	// update the weapon script
////	UpdateScript();
////
////	UpdateGUI();
////
////	// update animation
////	UpdateAnimation();
////
////	// only show the surface in player view
////	this.renderEntity.allowSurfaceInViewID = this.owner.entityNumber+1;
////
////	// crunch the depth range so it never pokes into walls this breaks the machine gun gui
////	this.renderEntity.weaponDepthHack = true;
////
////	// present the model
////	if ( showViewModel ) {
////		Present();
////	} else {
////		FreeModelDef();
////	}
////
////	if ( worldModel.GetEntity() && worldModel.GetEntity().GetRenderEntity() ) {
////		// deal with the third-person visible world model
////		// don't show shadows of the world model in first person
////		if ( gameLocal.isMultiplayer || g_showPlayerShadow.GetBool() || pm_thirdPerson.GetBool() ) {
////			worldModel.GetEntity().GetRenderEntity().suppressShadowInViewID	= 0;
////		} else {
////			worldModel.GetEntity().GetRenderEntity().suppressShadowInViewID	= this.owner.entityNumber+1;
////			worldModel.GetEntity().GetRenderEntity().suppressShadowInLightID = LIGHTID_VIEW_MUZZLE_FLASH + this.owner.entityNumber;
////		}
////	}
////
////	if ( nozzleFx ) {
////		UpdateNozzleFx();
////	}
////
////	// muzzle smoke
////	if ( showViewModel && !disabled && weaponSmoke && ( weaponSmokeStartTime != 0 ) ) {
////		// use the barrel joint if available
////		if ( barrelJointView ) {
////			GetGlobalJointTransform( true, barrelJointView, muzzleOrigin, muzzleAxis );
////		} else {
////			// default to going straight out the view
////			muzzleOrigin = playerViewOrigin;
////			muzzleAxis = playerViewAxis;
////		}
////		// spit out a particle
////		if ( !gameLocal.smokeParticles.EmitSmoke( weaponSmoke, weaponSmokeStartTime, gameLocal.random.RandomFloat(), muzzleOrigin, muzzleAxis ) ) {
////			weaponSmokeStartTime = ( continuousSmoke ) ? gameLocal.time : 0;
////		}
////	}
////
////	if ( showViewModel && strikeSmoke && strikeSmokeStartTime != 0 ) {
////		// spit out a particle
////		if ( !gameLocal.smokeParticles.EmitSmoke( strikeSmoke, strikeSmokeStartTime, gameLocal.random.RandomFloat(), strikePos, strikeAxis ) ) {
////			strikeSmokeStartTime = 0;
////		}
////	}
////
////	// remove the muzzle flash light when it's done
////	if ( ( !lightOn && ( gameLocal.time >= muzzleFlashEnd ) ) || IsHidden() ) {
////		if ( muzzleFlashHandle != -1 ) {
////			gameRenderWorld.FreeLightDef( muzzleFlashHandle );
////			muzzleFlashHandle = -1;
////		}
////		if ( worldMuzzleFlashHandle != -1 ) {
////			gameRenderWorld.FreeLightDef( worldMuzzleFlashHandle );
////			worldMuzzleFlashHandle = -1;
////		}
////	}
////
////	// update the muzzle flash light, so it moves with the gun
////	if ( muzzleFlashHandle != -1 ) {
////		UpdateFlashPosition();
////		gameRenderWorld.UpdateLightDef( muzzleFlashHandle, &muzzleFlash );
////		gameRenderWorld.UpdateLightDef( worldMuzzleFlashHandle, &worldMuzzleFlash );
////
////		// wake up monsters with the flashlight
////		if ( !gameLocal.isMultiplayer && lightOn && !this.owner.fl.notarget ) {
////			AlertMonsters();
////		}
////	}
////
////	// update the gui light
////	if ( guiLight.lightRadius[0] && guiLightJointView != jointHandle_t.INVALID_JOINT ) {
////		GetGlobalJointTransform( true, guiLightJointView, guiLight.origin, guiLight.axis );
////
////		if ( ( guiLightHandle != -1 ) ) {
////			gameRenderWorld.UpdateLightDef( guiLightHandle, &guiLight );
////		} else {
////			guiLightHandle = gameRenderWorld.AddLightDef( &guiLight );
////		}
////	}
////
////	if ( status != WP_READY && sndHum ) {
////		StopSound( SND_CHANNEL_BODY, false );
////	}
////
////	UpdateSound();
////}
////
/////*
////================
////idWeapon::EnterCinematic
////================
////*/
////void idWeapon::EnterCinematic( ) {
////	StopSound( SND_CHANNEL_ANY, false );
////
////	if ( isLinked ) {
////		SetState( "EnterCinematic", 0 );
////		this.thread.Execute();
////
////		WEAPON_ATTACK		= false;
////		WEAPON_RELOAD		= false;
////		WEAPON_NETRELOAD	= false;
////		WEAPON_NETENDRELOAD	= false;
////		WEAPON_NETFIRING	= false;
////		WEAPON_RAISEWEAPON	= false;
////		WEAPON_LOWERWEAPON	= false;
////	}
////
////	disabled = true;
////
////	LowerWeapon();
////}
////
/////*
////================
////idWeapon::ExitCinematic
////================
////*/
////void idWeapon::ExitCinematic( ) {
////	disabled = false;
////
////	if ( isLinked ) {
////		SetState( "ExitCinematic", 0 );
////		this.thread.Execute();
////	}
////
////	RaiseWeapon();
////}
////
/////*
////================
////idWeapon::NetCatchup
////================
////*/
////void idWeapon::NetCatchup( ) {
////	if ( isLinked ) {
////		SetState( "NetCatchup", 0 );
////		this.thread.Execute();
////	}
////}
////
/////*
////================
////idWeapon::GetZoomFov
////================
////*/
////int	idWeapon::GetZoomFov( ) {
////	return zoomFov;
////}
////
/////*
////================
////idWeapon::GetWeaponAngleOffsets
////================
////*/
////void idWeapon::GetWeaponAngleOffsets( int *average, float *scale, float *max ) {
////	*average = weaponAngleOffsetAverages;
////	*scale = weaponAngleOffsetScale;
////	*max = weaponAngleOffsetMax;
////}
////
/////*
////================
////idWeapon::GetWeaponTimeOffsets
////================
////*/
////void idWeapon::GetWeaponTimeOffsets( float *time, float *scale ) {
////	*time = weaponOffsetTime;
////	*scale = weaponOffsetScale;
////}
////
////
/////***********************************************************************
////
////	Ammo
////
////***********************************************************************/
////
/////*
////================
////idWeapon::GetAmmoNumForName
////================
////*/
////ammo_t idWeapon::GetAmmoNumForName( const char *ammoname ) {
////	int num;
////	const idDict *ammoDict;
////
////	assert( ammoname );
////
////	ammoDict = gameLocal.FindEntityDefDict( "ammo_types", false );
////	if ( !ammoDict ) {
////		gameLocal.Error( "Could not find entity definition for 'ammo_types'\n" );
////	}
////
////	if ( !ammoname[ 0 ] ) {
////		return 0;
////	}
////
////	if ( !ammoDict.GetInt( ammoname, "-1", num ) ) {
////		gameLocal.Error( "Unknown ammo type '%s'", ammoname );
////	}
////
////	if ( ( num < 0 ) || ( num >= AMMO_NUMTYPES ) ) {
////		gameLocal.Error( "Ammo type '%s' value out of range.  Maximum ammo types is %d.\n", ammoname, AMMO_NUMTYPES );
////	}
////
////	return ( ammo_t )num;
////}
////
/////*
////================
////idWeapon::GetAmmoNameForNum
////================
////*/
////const char *idWeapon::GetAmmoNameForNum( ammo_t ammonum ) {
////	var/*int*/i:number;
////	int num;
////	const idDict *ammoDict;
////	const idKeyValue *kv;
////	char text[ 32 ];
////
////	ammoDict = gameLocal.FindEntityDefDict( "ammo_types", false );
////	if ( !ammoDict ) {
////		gameLocal.Error( "Could not find entity definition for 'ammo_types'\n" );
////	}
////
////	sprintf( text, "%d", ammonum );
////
////	num = ammoDict.GetNumKeyVals();
////	for( i = 0; i < num; i++ ) {
////		kv = ammoDict.GetKeyVal( i );
////		if ( kv.GetValue() == text ) {
////			return kv.GetKey();
////		}
////	}
////
////	return NULL;
////}
////
/////*
////================
////idWeapon::GetAmmoPickupNameForNum
////================
////*/
////const char *idWeapon::GetAmmoPickupNameForNum( ammo_t ammonum ) {
////	var/*int*/i:number;
////	int num;
////	const idDict *ammoDict;
////	const idKeyValue *kv;
////
////	ammoDict = gameLocal.FindEntityDefDict( "ammo_names", false );
////	if ( !ammoDict ) {
////		gameLocal.Error( "Could not find entity definition for 'ammo_names'\n" );
////	}
////
////	name:string = GetAmmoNameForNum( ammonum );
////
////	if ( name && *name ) {
////		num = ammoDict.GetNumKeyVals();
////		for( i = 0; i < num; i++ ) {
////			kv = ammoDict.GetKeyVal( i );
////			if ( idStr::Icmp( kv.GetKey(), name) == 0 ) {
////				return kv.GetValue();
////			}
////		}
////	}
////
////	return "";
////}
////
/////*
////================
////idWeapon::AmmoAvailable
////================
////*/
////int idWeapon::AmmoAvailable( ) const {
////	if ( this.owner ) {
////		return this.owner.inventory.HasAmmo( ammoType, ammoRequired );
////	} else {
////		return 0;
////	}
////}
////
/////*
////================
////idWeapon::AmmoInClip
////================
////*/
////int idWeapon::AmmoInClip( ) const {
////	return ammoClip;
////}
////
/////*
////================
////idWeapon::ResetAmmoClip
////================
////*/
////void idWeapon::ResetAmmoClip( ) {
////	ammoClip = -1;
////}
////
/////*
////================
////idWeapon::GetAmmoType
////================
////*/
////ammo_t idWeapon::GetAmmoType( ) const {
////	return ammoType;
////}
////
/////*
////================
////idWeapon::ClipSize
////================
////*/
////int	idWeapon::ClipSize( ) const {
////	return clipSize;
////}
////
/////*
////================
////idWeapon::LowAmmo
////================
////*/
////int	idWeapon::LowAmmo() const {
////	return lowAmmo;
////}
////
/////*
////================
////idWeapon::AmmoRequired
////================
////*/
////int	idWeapon::AmmoRequired( ) const {
////	return ammoRequired;
////}
////
/////*
////================
////idWeapon::WriteToSnapshot
////================
////*/
////void idWeapon::WriteToSnapshot( idBitMsgDelta &msg ) const {
////	msg.WriteBits( ammoClip, ASYNC_PLAYER_INV_CLIP_BITS );
////	msg.WriteBits( worldModel.GetSpawnId(), 32 );
////	msg.WriteBits( lightOn, 1 );
////	msg.WriteBits( isFiring ? 1 : 0, 1 );
////}
////
/////*
////================
////idWeapon::ReadFromSnapshot
////================
////*/
////void idWeapon::ReadFromSnapshot( const idBitMsgDelta &msg ) {	
////	ammoClip = msg.ReadBits( ASYNC_PLAYER_INV_CLIP_BITS );
////	worldModel.SetSpawnId( msg.ReadBits( 32 ) );
////	bool snapLight = msg.ReadBits( 1 ) != 0;
////	isFiring = msg.ReadBits( 1 ) != 0;
////
////	// WEAPON_NETFIRING is only turned on for other clients we're predicting. not for local client
////	if ( this.owner && gameLocal.localClientNum != this.owner.entityNumber && WEAPON_NETFIRING.IsLinked() ) {
////
////		// immediately go to the firing state so we don't skip fire animations
////		if ( !WEAPON_NETFIRING && isFiring ) {
////			idealState = "Fire";
////		}
////
////        // immediately switch back to idle
////        if ( WEAPON_NETFIRING && !isFiring ) {
////            idealState = "Idle";
////        }
////
////		WEAPON_NETFIRING = isFiring;
////	}
////
////	if ( snapLight != lightOn ) {
////		Reload();
////	}
////}
////
/////*
////================
////idWeapon::ClientReceiveEvent
////================
////*/
////bool idWeapon::ClientReceiveEvent( int event, /*int*/time:number, const idBitMsg &msg ) {
////
////	switch( event ) {
////		case EVENT_RELOAD: {
////			if ( gameLocal.time - time < 1000 ) {
////				if ( WEAPON_NETRELOAD.IsLinked() ) {
////					WEAPON_NETRELOAD = true;
////					WEAPON_NETENDRELOAD = false;
////				}
////			}
////			return true;
////		}
////		case EVENT_ENDRELOAD: {
////			if ( WEAPON_NETENDRELOAD.IsLinked() ) {
////				WEAPON_NETENDRELOAD = true;
////			}
////			return true;
////		}
////		case EVENT_CHANGESKIN: {
////			int index = gameLocal.ClientRemapDecl( DECL_SKIN, msg.ReadLong() );
////			this.renderEntity.customSkin = ( index != -1 ) ? static_cast<const idDeclSkin *>( declManager.DeclByIndex( DECL_SKIN, index ) ) : NULL;
////			UpdateVisuals();
////			if ( worldModel.GetEntity() ) {
////				worldModel.GetEntity().SetSkin( this.renderEntity.customSkin );
////			}
////			return true;
////		}
////		default: {
////			return idEntity::ClientReceiveEvent( event, time, msg );
////		}
////	}
////	return false;
////}
////
/////***********************************************************************
////
////	Script events
////
////***********************************************************************/
////
/////*
////===============
////idWeapon::Event_Clear
////===============
////*/
////void idWeapon::Event_Clear( ) {
////	Clear();
////}
////
/////*
////===============
////idWeapon::Event_GetOwner
////===============
////*/
////void idWeapon::Event_GetOwner( ) {
////	idThread::ReturnEntity( this.owner );
////}
////
/////*
////===============
////idWeapon::Event_WeaponState
////===============
////*/
////void idWeapon::Event_WeaponState( const char *statename, int blendFrames ) {
////	const function_t *func;
////
////	func = this.scriptObject.GetFunction( statename );
////	if ( !func ) {
////		assert( 0 );
////		gameLocal.Error( "Can't find function '%s' in object '%s'", statename, this.scriptObject.GetTypeName() );
////	}
////
////	idealState = statename;
////
////	if ( !idealState.Icmp( "Fire" ) ) {
////		isFiring = true;
////	} else {
////		isFiring = false;
////	}
////
////	animBlendFrames = blendFrames;
////	this.thread.DoneProcessing();
////}
////
/////*
////===============
////idWeapon::Event_WeaponReady
////===============
////*/
////void idWeapon::Event_WeaponReady( ) {
////	status = WP_READY;
////	if ( isLinked ) {
////		WEAPON_RAISEWEAPON = false;
////	}
////	if ( sndHum ) {
////		StartSoundShader( sndHum, SND_CHANNEL_BODY, 0, false, NULL );
////	}
////
////}
////
/////*
////===============
////idWeapon::Event_WeaponOutOfAmmo
////===============
////*/
////void idWeapon::Event_WeaponOutOfAmmo( ) {
////	status = WP_OUTOFAMMO;
////	if ( isLinked ) {
////		WEAPON_RAISEWEAPON = false;
////	}
////}
////
/////*
////===============
////idWeapon::Event_WeaponReloading
////===============
////*/
////void idWeapon::Event_WeaponReloading( ) {
////	status = WP_RELOAD;
////}
////
/////*
////===============
////idWeapon::Event_WeaponHolstered
////===============
////*/
////void idWeapon::Event_WeaponHolstered( ) {
////	status = WP_HOLSTERED;
////	if ( isLinked ) {
////		WEAPON_LOWERWEAPON = false;
////	}
////}
////
/////*
////===============
////idWeapon::Event_WeaponRising
////===============
////*/
////void idWeapon::Event_WeaponRising( ) {
////	status = WP_RISING;
////	if ( isLinked ) {
////		WEAPON_LOWERWEAPON = false;
////	}
////	this.owner.WeaponRisingCallback();
////}
////
/////*
////===============
////idWeapon::Event_WeaponLowering
////===============
////*/
////void idWeapon::Event_WeaponLowering( ) {
////	status = WP_LOWERING;
////	if ( isLinked ) {
////		WEAPON_RAISEWEAPON = false;
////	}
////	this.owner.WeaponLoweringCallback();
////}
////
/////*
////===============
////idWeapon::Event_UseAmmo
////===============
////*/
////void idWeapon::Event_UseAmmo( int amount ) {
////	if ( gameLocal.isClient ) {
////		return;
////	}
////
////	this.owner.inventory.UseAmmo( ammoType, ( powerAmmo ) ? amount : ( amount * ammoRequired ) );
////	if ( clipSize && ammoRequired ) {
////		ammoClip -= powerAmmo ? amount : ( amount * ammoRequired );
////		if ( ammoClip < 0 ) {
////			ammoClip = 0;
////		}
////	}
////}
////
/////*
////===============
////idWeapon::Event_AddToClip
////===============
////*/
////void idWeapon::Event_AddToClip( int amount ) {
////	int ammoAvail;
////
////	if ( gameLocal.isClient ) {
////		return;
////	}
////
////	ammoClip += amount;
////	if ( ammoClip > clipSize ) {
////		ammoClip = clipSize;
////	}
////
////	ammoAvail = this.owner.inventory.HasAmmo( ammoType, ammoRequired );
////	if ( ammoClip > ammoAvail ) {
////		ammoClip = ammoAvail;
////	}
////}
////
/////*
////===============
////idWeapon::Event_AmmoInClip
////===============
////*/
////void idWeapon::Event_AmmoInClip( ) {
////	int ammo = AmmoInClip();
////	idThread::ReturnFloat( ammo );	
////}
////
/////*
////===============
////idWeapon::Event_AmmoAvailable
////===============
////*/
////void idWeapon::Event_AmmoAvailable( ) {
////	int ammoAvail = this.owner.inventory.HasAmmo( ammoType, ammoRequired );
////	idThread::ReturnFloat( ammoAvail );
////}
////
/////*
////===============
////idWeapon::Event_TotalAmmoCount
////===============
////*/
////void idWeapon::Event_TotalAmmoCount( ) {
////	int ammoAvail = this.owner.inventory.HasAmmo( ammoType, 1 );
////	idThread::ReturnFloat( ammoAvail );
////}
////
/////*
////===============
////idWeapon::Event_ClipSize
////===============
////*/
////void idWeapon::Event_ClipSize( ) {
////	idThread::ReturnFloat( clipSize );	
////}
////
/////*
////===============
////idWeapon::Event_AutoReload
////===============
////*/
////void idWeapon::Event_AutoReload( ) {
////	assert( this.owner );
////	if ( gameLocal.isClient ) {
////		idThread::ReturnFloat( 0.0f );
////		return;
////	}
////	idThread::ReturnFloat( gameLocal.userInfo[ this.owner.entityNumber ].GetBool( "ui_autoReload" ) );
////}
////
/////*
////===============
////idWeapon::Event_NetReload
////===============
////*/
////void idWeapon::Event_NetReload( ) {
////	assert( this.owner );
////	if ( gameLocal.isServer ) {
////		ServerSendEvent( EVENT_RELOAD, NULL, false, -1 );
////	}
////}
////
/////*
////===============
////idWeapon::Event_NetEndReload
////===============
////*/
////void idWeapon::Event_NetEndReload( ) {
////	assert( this.owner );
////	if ( gameLocal.isServer ) {
////		ServerSendEvent( EVENT_ENDRELOAD, NULL, false, -1 );
////	}
////}
////
/////*
////===============
////idWeapon::Event_PlayAnim
////===============
////*/
////void idWeapon::Event_PlayAnim( int channel, const char *animname ) {
////	int anim;
////	
////	anim = this.animator.GetAnim( animname );
////	if ( !anim ) {
////		gameLocal.Warning( "missing '%s' animation on '%s' (%s)", animname, name.c_str(), GetEntityDefName() );
////		this.animator.Clear( channel, gameLocal.time, FRAME2MS( animBlendFrames ) );
////		animDoneTime = 0;
////	} else {
////		if ( !( this.owner && this.owner.GetInfluenceLevel() ) ) {
////			Show();
////		}
////		this.animator.PlayAnim( channel, anim, gameLocal.time, FRAME2MS( animBlendFrames ) );
////		animDoneTime = this.animator.CurrentAnim( channel ).GetEndTime();
////		if ( worldModel.GetEntity() ) {
////			anim = worldModel.GetEntity().GetAnimator().GetAnim( animname );
////			if ( anim ) {
////				worldModel.GetEntity().GetAnimator().PlayAnim( channel, anim, gameLocal.time, FRAME2MS( animBlendFrames ) );
////			}
////		}
////	}
////	animBlendFrames = 0;
////	idThread::ReturnInt( 0 );
////}
////
/////*
////===============
////idWeapon::Event_PlayCycle
////===============
////*/
////void idWeapon::Event_PlayCycle( int channel, const char *animname ) {
////	int anim;
////
////	anim = this.animator.GetAnim( animname );
////	if ( !anim ) {
////		gameLocal.Warning( "missing '%s' animation on '%s' (%s)", animname, name.c_str(), GetEntityDefName() );
////		this.animator.Clear( channel, gameLocal.time, FRAME2MS( animBlendFrames ) );
////		animDoneTime = 0;
////	} else {
////		if ( !( this.owner && this.owner.GetInfluenceLevel() ) ) {
////			Show();
////		}
////		this.animator.CycleAnim( channel, anim, gameLocal.time, FRAME2MS( animBlendFrames ) );
////		animDoneTime = this.animator.CurrentAnim( channel ).GetEndTime();
////		if ( worldModel.GetEntity() ) {
////			anim = worldModel.GetEntity().GetAnimator().GetAnim( animname );
////			worldModel.GetEntity().GetAnimator().CycleAnim( channel, anim, gameLocal.time, FRAME2MS( animBlendFrames ) );
////		}
////	}
////	animBlendFrames = 0;
////	idThread::ReturnInt( 0 );
////}
////
/////*
////===============
////idWeapon::Event_AnimDone
////===============
////*/
////void idWeapon::Event_AnimDone( int channel, int blendFrames ) {
////	if ( animDoneTime - FRAME2MS( blendFrames ) <= gameLocal.time ) {
////		idThread::ReturnInt( true );
////	} else {
////		idThread::ReturnInt( false );
////	}
////}
////
/////*
////===============
////idWeapon::Event_SetBlendFrames
////===============
////*/
////void idWeapon::Event_SetBlendFrames( int channel, int blendFrames ) {
////	animBlendFrames = blendFrames;
////}
////
/////*
////===============
////idWeapon::Event_GetBlendFrames
////===============
////*/
////void idWeapon::Event_GetBlendFrames( int channel ) {
////	idThread::ReturnInt( animBlendFrames );
////}
////
/////*
////================
////idWeapon::Event_Next
////================
////*/
////void idWeapon::Event_Next( ) {
////	// change to another weapon if possible
////	this.owner.NextBestWeapon();
////}
////
/////*
////================
////idWeapon::Event_SetSkin
////================
////*/
////void idWeapon::Event_SetSkin( const char *skinname ) {
////	const idDeclSkin *skinDecl;
////
////	if ( !skinname || !skinname[ 0 ] ) {
////		skinDecl = NULL;
////	} else {
////		skinDecl = declManager.FindSkin( skinname );
////	}
////
////	this.renderEntity.customSkin = skinDecl;
////	UpdateVisuals();
////
////	if ( worldModel.GetEntity() ) {
////		worldModel.GetEntity().SetSkin( skinDecl );
////	}
////
////	if ( gameLocal.isServer ) {
////		idBitMsg	msg;
////		byte		msgBuf[MAX_EVENT_PARAM_SIZE];
////
////		msg.Init( msgBuf, sizeof( msgBuf ) );
////		msg.WriteLong( ( skinDecl != NULL ) ? gameLocal.ServerRemapDecl( -1, DECL_SKIN, skinDecl.Index() ) : -1 );
////		ServerSendEvent( EVENT_CHANGESKIN, &msg, false, -1 );
////	}
////}
////
/////*
////================
////idWeapon::Event_Flashlight
////================
////*/
////void idWeapon::Event_Flashlight( int enable ) {
////	if ( enable ) {
////		lightOn = true;
////		MuzzleFlashLight();
////	} else {
////		lightOn = false;
////		muzzleFlashEnd = 0;
////	}
////}
////
/////*
////================
////idWeapon::Event_GetLightParm
////================
////*/
////void idWeapon::Event_GetLightParm( int parmnum ) {
////	if ( ( parmnum < 0 ) || ( parmnum >= MAX_ENTITY_SHADER_PARMS ) ) {
////		gameLocal.Error( "shader parm index (%d) out of range", parmnum );
////	}
////
////	idThread::ReturnFloat( muzzleFlash.shaderParms[ parmnum ] );
////}
////
/////*
////================
////idWeapon::Event_SetLightParm
////================
////*/
////void idWeapon::Event_SetLightParm( int parmnum, float value ) {
////	if ( ( parmnum < 0 ) || ( parmnum >= MAX_ENTITY_SHADER_PARMS ) ) {
////		gameLocal.Error( "shader parm index (%d) out of range", parmnum );
////	}
////
////	muzzleFlash.shaderParms[ parmnum ]		= value;
////	worldMuzzleFlash.shaderParms[ parmnum ]	= value;
////	UpdateVisuals();
////}
////
/////*
////================
////idWeapon::Event_SetLightParms
////================
////*/
////void idWeapon::Event_SetLightParms( float parm0, float parm1, float parm2, float parm3 ) {
////	muzzleFlash.shaderParms[ SHADERPARM_RED ]			= parm0;
////	muzzleFlash.shaderParms[ SHADERPARM_GREEN ]			= parm1;
////	muzzleFlash.shaderParms[ SHADERPARM_BLUE ]			= parm2;
////	muzzleFlash.shaderParms[ SHADERPARM_ALPHA ]			= parm3;
////
////	worldMuzzleFlash.shaderParms[ SHADERPARM_RED ]		= parm0;
////	worldMuzzleFlash.shaderParms[ SHADERPARM_GREEN ]	= parm1;
////	worldMuzzleFlash.shaderParms[ SHADERPARM_BLUE ]		= parm2;
////	worldMuzzleFlash.shaderParms[ SHADERPARM_ALPHA ]	= parm3;
////
////	UpdateVisuals();
////}
////
/////*
////================
////idWeapon::Event_CreateProjectile
////================
////*/
////void idWeapon::Event_CreateProjectile( ) {
////	if ( !gameLocal.isClient ) {
////		projectileEnt = NULL;
////		gameLocal.SpawnEntityDef( projectileDict, &projectileEnt, false );
////		if ( projectileEnt ) {
////			projectileEnt.SetOrigin( GetPhysics().GetOrigin() );
////			projectileEnt.Bind( this.owner, false );
////			projectileEnt.Hide();
////		}
////		idThread::ReturnEntity( projectileEnt );
////	} else {
////		idThread::ReturnEntity( NULL );
////	}
////}
////
/////*
////================
////idWeapon::Event_LaunchProjectiles
////================
////*/
////void idWeapon::Event_LaunchProjectiles( int num_projectiles, float spread, float fuseOffset, float launchPower, float dmgPower ) {
////	idProjectile	*proj;
////	idEntity		*ent;
////	var i:number /*int*/;
////	idVec3			dir;
////	float			ang;
////	float			spin;
////	float			distance;
////	trace_t			tr;
////	idVec3			start;
////	idVec3			muzzle_pos;
////	idBounds		ownerBounds, projBounds;
////
////	if ( IsHidden() ) {
////		return;
////	}
////
////	if ( !projectileDict.GetNumKeyVals() ) {
////		const char *classname = weaponDef.dict.GetString( "classname" );
////		gameLocal.Warning( "No projectile defined on '%s'", classname );
////		return;
////	}
////
////	// avoid all ammo considerations on an MP client
////	if ( !gameLocal.isClient ) {
////
////		// check if we're out of ammo or the clip is empty
////		int ammoAvail = this.owner.inventory.HasAmmo( ammoType, ammoRequired );
////		if ( !ammoAvail || ( ( clipSize != 0 ) && ( ammoClip <= 0 ) ) ) {
////			return;
////		}
////
////		// if this is a power ammo weapon ( currently only the bfg ) then make sure 
////		// we only fire as much power as available in each clip
////		if ( powerAmmo ) {
////			// power comes in as a float from zero to max
////			// if we use this on more than the bfg will need to define the max
////			// in the .def as opposed to just in the script so proper calcs
////			// can be done here. 
////			dmgPower = ( int )dmgPower + 1;
////			if ( dmgPower > ammoClip ) {
////				dmgPower = ammoClip;
////			}
////		}
////
////		this.owner.inventory.UseAmmo( ammoType, ( powerAmmo ) ? dmgPower : ammoRequired );
////		if ( clipSize && ammoRequired ) {
////			ammoClip -= powerAmmo ? dmgPower : 1;
////		}
////
////	}
////
////	if ( !silent_fire ) {
////		// wake up nearby monsters
////		gameLocal.AlertAI( this.owner );
////	}
////
////	// set the shader parm to the time of last projectile firing,
////	// which the gun material shaders can reference for single shot barrel glows, etc
////	this.renderEntity.shaderParms[ SHADERPARM_DIVERSITY ]	= gameLocal.random.CRandomFloat();
////	this.renderEntity.shaderParms[ SHADERPARM_TIMEOFFSET ]	= -MS2SEC( gameLocal.realClientTime );
////
////	if ( worldModel.GetEntity() ) {
////		worldModel.GetEntity().SetShaderParm( SHADERPARM_DIVERSITY, this.renderEntity.shaderParms[ SHADERPARM_DIVERSITY ] );
////		worldModel.GetEntity().SetShaderParm( SHADERPARM_TIMEOFFSET, this.renderEntity.shaderParms[ SHADERPARM_TIMEOFFSET ] );
////	}
////
////	// calculate the muzzle position
////	if ( barrelJointView != jointHandle_t.INVALID_JOINT && projectileDict.GetBool( "launchFromBarrel" ) ) {
////		// there is an explicit joint for the muzzle
////		GetGlobalJointTransform( true, barrelJointView, muzzleOrigin, muzzleAxis );
////	} else {
////		// go straight out of the view
////		muzzleOrigin = playerViewOrigin;
////		muzzleAxis = playerViewAxis;
////	}
////
////	// add some to the kick time, incrementally moving repeat firing weapons back
////	if ( kick_endtime < gameLocal.realClientTime ) {
////		kick_endtime = gameLocal.realClientTime;
////	}
////	kick_endtime += muzzle_kick_time;
////	if ( kick_endtime > gameLocal.realClientTime + muzzle_kick_maxtime ) {
////		kick_endtime = gameLocal.realClientTime + muzzle_kick_maxtime;
////	}
////
////	if ( gameLocal.isClient ) {
////
////		// predict instant hit projectiles
////		if ( projectileDict.GetBool( "net_instanthit" ) ) {
////			float spreadRad = DEG2RAD( spread );
////			muzzle_pos = muzzleOrigin + playerViewAxis[ 0 ] * 2.0f;
////			for( i = 0; i < num_projectiles; i++ ) {
////				ang = idMath::Sin( spreadRad * gameLocal.random.RandomFloat() );
////				spin = (float)DEG2RAD( 360.0f ) * gameLocal.random.RandomFloat();
////				dir = playerViewAxis[ 0 ] + playerViewAxis[ 2 ] * ( ang * idMath::Sin( spin ) ) - playerViewAxis[ 1 ] * ( ang * idMath::Cos( spin ) );
////				dir.Normalize();
////				gameLocal.clip.Translation( tr, muzzle_pos, muzzle_pos + dir * 4096.0f, NULL, mat3_identity, MASK_SHOT_RENDERMODEL, this.owner );
////				if ( tr.fraction < 1.0f ) {
////					idProjectile::ClientPredictionCollide( this, projectileDict, tr, vec3_origin, true );
////				}
////			}
////		}
////
////	} else {
////
////		ownerBounds = this.owner.GetPhysics().GetAbsBounds();
////
////		this.owner.AddProjectilesFired( num_projectiles );
////
////		float spreadRad = DEG2RAD( spread );
////		for( i = 0; i < num_projectiles; i++ ) {
////			ang = idMath::Sin( spreadRad * gameLocal.random.RandomFloat() );
////			spin = (float)DEG2RAD( 360.0f ) * gameLocal.random.RandomFloat();
////			dir = playerViewAxis[ 0 ] + playerViewAxis[ 2 ] * ( ang * idMath::Sin( spin ) ) - playerViewAxis[ 1 ] * ( ang * idMath::Cos( spin ) );
////			dir.Normalize();
////
////			if ( projectileEnt ) {
////				ent = projectileEnt;
////				ent.Show();
////				ent.Unbind();
////				projectileEnt = NULL;
////			} else {
////				gameLocal.SpawnEntityDef( projectileDict, &ent, false );
////			}
////
////			if ( !ent || !ent.IsType( idProjectile::Type ) ) {
////				const char *projectileName = weaponDef.dict.GetString( "def_projectile" );
////				gameLocal.Error( "'%s' is not an idProjectile", projectileName );
////			}
////
////			if ( projectileDict.GetBool( "net_instanthit" ) ) {
////				// don't synchronize this on top of the already predicted effect
////				ent.fl.networkSync = false;
////			}
////
////			proj = static_cast<idProjectile *>(ent);
////			proj.Create( this.owner, muzzleOrigin, dir );
////
////			projBounds = proj.GetPhysics().GetBounds().Rotate( proj.GetPhysics().GetAxis() );
////
////			// make sure the projectile starts inside the bounding box of the this.owner
////			if ( i == 0 ) {
////				muzzle_pos = muzzleOrigin + playerViewAxis[ 0 ] * 2.0f;
////				if ( ( ownerBounds - projBounds).RayIntersection( muzzle_pos, playerViewAxis[0], distance ) ) {
////					start = muzzle_pos + distance * playerViewAxis[0];
////				} else {
////					start = ownerBounds.GetCenter();
////				}
////				gameLocal.clip.Translation( tr, start, muzzle_pos, proj.GetPhysics().GetClipModel(), proj.GetPhysics().GetClipModel().GetAxis(), MASK_SHOT_RENDERMODEL, this.owner );
////				muzzle_pos = tr.endpos;
////			}
////
////			proj.Launch( muzzle_pos, dir, pushVelocity, fuseOffset, launchPower, dmgPower );
////		}
////
////		// toss the brass
////		PostEventMS( &EV_Weapon_EjectBrass, brassDelay );
////	}
////
////	// add the light for the muzzleflash
////	if ( !lightOn ) {
////		MuzzleFlashLight();
////	}
////
////	this.owner.WeaponFireFeedback( &weaponDef.dict );
////
////	// reset muzzle smoke
////	weaponSmokeStartTime = gameLocal.realClientTime;
////}
////
/////*
////=====================
////idWeapon::Event_Melee
////=====================
////*/
////void idWeapon::Event_Melee( ) {
////	idEntity	*ent;
////	trace_t		tr;
////
////	if ( !meleeDef ) {
////		gameLocal.Error( "No meleeDef on '%s'", weaponDef.dict.GetString( "classname" ) );
////	}
////
////	if ( !gameLocal.isClient ) {
////		idVec3 start = playerViewOrigin;
////		idVec3 end = start + playerViewAxis[0] * ( meleeDistance * this.owner.PowerUpModifier( MELEE_DISTANCE ) );
////		gameLocal.clip.TracePoint( tr, start, end, MASK_SHOT_RENDERMODEL, this.owner );
////		if ( tr.fraction < 1.0f ) {
////			ent = gameLocal.GetTraceEntity( tr );
////		} else {
////			ent = NULL;
////		}
////
////		if ( g_debugWeapon.GetBool() ) {
////			gameRenderWorld.DebugLine( colorYellow, start, end, 100 );
////			if ( ent ) {
////				gameRenderWorld.DebugBounds( colorRed, ent.GetPhysics().GetBounds(), ent.GetPhysics().GetOrigin(), 100 );
////			}
////		}
////
////		bool hit = false;
////		const char *hitSound = meleeDef.dict.GetString( "snd_miss" );
////
////		if ( ent ) {
////
////			float push = meleeDef.dict.GetFloat( "push" );
////			idVec3 impulse = -push * this.owner.PowerUpModifier( SPEED ) * tr.c.normal;
////
////			if ( gameLocal.world.spawnArgs.GetBool( "no_Weapons" ) && ( ent.IsType( idActor::Type ) || ent.IsType( idAFAttachment::Type) ) ) {
////				idThread::ReturnInt( 0 );
////				return;
////			}
////
////			ent.ApplyImpulse( this, tr.c.id, tr.c.point, impulse );
////
////			// weapon stealing - do this before damaging so weapons are not dropped twice
////			if ( gameLocal.isMultiplayer
////				&& weaponDef && weaponDef.dict.GetBool( "stealing" )
////				&& ent.IsType( idPlayer::Type )
////				&& !this.owner.PowerUpActive( BERSERK )
////				&& ( gameLocal.gameType != GAME_TDM || gameLocal.serverInfo.GetBool( "si_teamDamage" ) || ( this.owner.team != static_cast< idPlayer * >( ent ).team ) )
////				) {
////				this.owner.StealWeapon( static_cast< idPlayer * >( ent ) );
////			}
////
////			if ( ent.fl.takedamage ) {
////				idVec3 kickDir, globalKickDir;
////				meleeDef.dict.GetVector( "kickDir", "0 0 0", kickDir );
////				globalKickDir = muzzleAxis * kickDir;
////				ent.Damage( this.owner, this.owner, globalKickDir, meleeDefName, this.owner.PowerUpModifier( MELEE_DAMAGE ), tr.c.id );
////				hit = true;
////			}
////
////			if ( weaponDef.dict.GetBool( "impact_damage_effect" ) ) {
////
////				if ( ent.spawnArgs.GetBool( "bleed" ) ) {
////
////					hitSound = meleeDef.dict.GetString( this.owner.PowerUpActive( BERSERK ) ? "snd_hit_berserk" : "snd_hit" );
////
////					ent.AddDamageEffect( tr, impulse, meleeDef.dict.GetString( "classname" ) );
////
////				} else {
////
////					int type = tr.c.material.GetSurfaceType();
////					if ( type == SURFTYPE_NONE ) {
////						type = GetDefaultSurfaceType();
////					}
////
////					const char *materialType = gameLocal.sufaceTypeNames[ type ];
////
////					// start impact sound based on material type
////					hitSound = meleeDef.dict.GetString( va( "snd_%s", materialType ) );
////					if ( *hitSound == '\0' ) {
////						hitSound = meleeDef.dict.GetString( "snd_metal" );
////					}
////
////					if ( gameLocal.time > nextStrikeFx ) {
////						const char *decal;
////						// project decal
////						decal = weaponDef.dict.GetString( "mtr_strike" );
////						if ( decal && *decal ) {
////							gameLocal.ProjectDecal( tr.c.point, -tr.c.normal, 8.0f, true, 6.0, decal );
////						}
////						nextStrikeFx = gameLocal.time + 200;
////					} else {
////						hitSound = "";
////					}
////
////					strikeSmokeStartTime = gameLocal.time;
////					strikePos = tr.c.point;
////					strikeAxis = -tr.endAxis;
////				}
////			}
////		}
////
////		if ( *hitSound != '\0' ) {
////			const idSoundShader *snd = declManager.FindSound( hitSound );
////			StartSoundShader( snd, SND_CHANNEL_BODY2, 0, true, NULL );
////		}
////
////		idThread::ReturnInt( hit );
////		this.owner.WeaponFireFeedback( &weaponDef.dict );
////		return;
////	}
////
////	idThread::ReturnInt( 0 );
////	this.owner.WeaponFireFeedback( &weaponDef.dict );
////}
////
/////*
////=====================
////idWeapon::Event_GetWorldModel
////=====================
////*/
////void idWeapon::Event_GetWorldModel( ) {
////	idThread::ReturnEntity( worldModel.GetEntity() );
////}
////
/////*
////=====================
////idWeapon::Event_AllowDrop
////=====================
////*/
////void idWeapon::Event_AllowDrop( int allow ) {
////	if ( allow ) {
////		allowDrop = true;
////	} else {
////		allowDrop = false;
////	}
////}
////
/////*
////================
////idWeapon::Event_EjectBrass
////
////Toss a shell model out from the breach if the bone is present
////================
////*/
////void idWeapon::Event_EjectBrass( ) {
////	if ( !g_showBrass.GetBool() || !this.owner.CanShowWeaponViewmodel() ) {
////		return;
////	}
////
////	if ( ejectJointView == jointHandle_t.INVALID_JOINT || !brassDict.GetNumKeyVals() ) {
////		return;
////	}
////
////	if ( gameLocal.isClient ) {
////		return;
////	}
////
////	idMat3 axis;
////	idVec3 origin, linear_velocity, angular_velocity;
////	var ent:idEntity
////
////	if ( !GetGlobalJointTransform( true, ejectJointView, origin, axis ) ) {
////		return;
////	}
////
////	gameLocal.SpawnEntityDef( brassDict, &ent, false );
////	if ( !ent || !ent.IsType( idDebris::Type ) ) {
////		gameLocal.Error( "'%s' is not an idDebris", weaponDef ? weaponDef.dict.GetString( "def_ejectBrass" ) : "def_ejectBrass" );
////	}
////	idDebris *debris = static_cast<idDebris *>(ent);
////	debris.Create( this.owner, origin, axis );
////	debris.Launch();
////
////	linear_velocity = 40 * ( playerViewAxis[0] + playerViewAxis[1] + playerViewAxis[2] );
////	angular_velocity.Set( 10 * gameLocal.random.CRandomFloat(), 10 * gameLocal.random.CRandomFloat(), 10 * gameLocal.random.CRandomFloat() );
////
////	debris.GetPhysics().SetLinearVelocity( linear_velocity );
////	debris.GetPhysics().SetAngularVelocity( angular_velocity );
////}
////
/////*
////===============
////idWeapon::Event_IsInvisible
////===============
////*/
////void idWeapon::Event_IsInvisible( ) {
////	if ( !this.owner ) {
////		idThread::ReturnFloat( 0 );
////		return;
////	}
////	idThread::ReturnFloat( this.owner.PowerUpActive( INVISIBILITY ) ? 1 : 0 );
////}
////
/////*
////===============
////idWeapon::ClientPredictionThink
////===============
////*/
////void idWeapon::ClientPredictionThink( ) {
////	UpdateAnimation();	
////}

}
////#endif /* !__GAME_WEAPON_H__ */
