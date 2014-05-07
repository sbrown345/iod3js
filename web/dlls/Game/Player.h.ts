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
////#ifndef __GAME_PLAYER_H__
////#define __GAME_PLAYER_H__
////
/////*
////===============================================================================
////
////	Player entity.
////	
////===============================================================================
////*/
////
////extern const idEventDef EV_Player_GetButtons;
////extern const idEventDef EV_Player_GetMove;
////extern const idEventDef EV_Player_GetViewAngles;
////extern const idEventDef EV_Player_EnableWeapon;
////extern const idEventDef EV_Player_DisableWeapon;
////extern const idEventDef EV_Player_ExitTeleporter;
////extern const idEventDef EV_Player_SelectWeapon;
////extern const idEventDef EV_SpectatorTouch;

var THIRD_PERSON_FOCUS_DISTANCE	= 512.0;
var	LAND_DEFLECT_TIME = 150;
var	LAND_RETURN_TIME = 300;
var	FOCUS_TIME = 300;
var	FOCUS_GUI_TIME = 500;

var  MAX_WEAPONS = 16;

var  DEAD_HEARTRATE = 0;			// fall to as you die
var  LOWHEALTH_HEARTRATE_ADJ = 20; // 
var  DYING_HEARTRATE = 30;			// used for volumen calc when dying/dead
var  BASE_HEARTRATE = 70;			// default
var  ZEROSTAMINA_HEARTRATE = 115;  // no stamina
var  MAX_HEARTRATE = 130;			// maximum
var  ZERO_VOLUME = -40;			// volume at zero
var  DMG_VOLUME = 5;				// volume when taking damage
var  DEATH_VOLUME = 15;			// volume at death

var SAVING_THROW_TIME = 5000;		// maximum one "saving throw" every five seconds

var ASYNC_PLAYER_INV_AMMO_BITS = idMath.BitsForInteger( 999 );	// 9 bits to cover the range [0, 999]
var ASYNC_PLAYER_INV_CLIP_BITS = -7;								// -7 bits to cover the range [-1, 60]
////
////struct idItemInfo {
////	name = new idStr;
	//icon = new idStr;
////};
////
////struct idObjectiveInfo {
////	idStr title;
////	idStr text;
////	idStr screenshot;
////};
////
////struct idLevelTriggerInfo {
////	idStr levelName;
////	idStr triggerName;
////};
////
////// powerups - the "type" in item .def must match
////enum {
////	BERSERK = 0, 
////	INVISIBILITY,
////	MEGAHEALTH,
////	ADRENALINE,
////	MAX_POWERUPS
////};
////
////// powerup modifiers
////enum {
////	SPEED = 0,
////	PROJECTILE_DAMAGE,
////	MELEE_DAMAGE,
////	MELEE_DISTANCE
////};
////
////// influence levels
////enum {
////	INFLUENCE_NONE = 0,			// none
////	INFLUENCE_LEVEL1,			// no gun or hud
////	INFLUENCE_LEVEL2,			// no gun, hud, movement
////	INFLUENCE_LEVEL3,			// slow player movement
////};
////
class idInventory {
////public:
////	int						maxHealth;
////	int						weapons;
////	int						powerups;
////	int						armor;
////	int						maxarmor;
////	int						ammo[ AMMO_NUMTYPES ];
////	int						clip[ MAX_WEAPONS ];
////	int						powerupEndTime[ MAX_POWERUPS ];
////
////	// mp
////	int						ammoPredictTime;
////
////	int						deplete_armor;
////	float					deplete_rate;
////	int						deplete_ammount;
////	int						nextArmorDepleteTime;
////
////	int						pdasViewed[4]; // 128 bit flags for indicating if a pda has been viewed
////
////	int						selPDA;
////	int						selEMail;
////	int						selVideo;
////	int						selAudio;
////	bool					pdaOpened;
////	bool					turkeyScore;
////	idList<idDict *>		items;
////	idStrList				pdas;
////	idStrList				pdaSecurity;
////	idStrList				videos;
////	idStrList				emails;
////
////	bool					ammoPulse;
////	bool					weaponPulse;
////	bool					armorPulse;
////	int						lastGiveTime;
////
////	idList<idLevelTriggerInfo> levelTriggers;
////
////							idInventory() { Clear(); }
////							~idInventory() { Clear(); }
////
////	// save games
////	void					Save( idSaveGame *savefile ) const;					// archives object for save game file
////	void					Restore( idRestoreGame *savefile );					// unarchives object from save game file
////
////	void					Clear( );
////	void					GivePowerUp( idPlayer *player, int powerup, int msec );
////	void					ClearPowerUps( );
////	void					GetPersistantData( idDict &dict );
////	void					RestoreInventory( idPlayer *owner, const idDict &dict );
////	bool					Give( idPlayer *owner, const idDict &spawnArgs, const char *statname, value:string, int *idealWeapon, bool updateHud );
////	void					Drop( const idDict &spawnArgs, const char *weapon_classname, int weapon_index );
////	ammo_t					AmmoIndexForAmmoClass( const char *ammo_classname ) const;
////	int						MaxAmmoForAmmoClass( idPlayer *owner, const char *ammo_classname ) const;
////	int						WeaponIndexForAmmoClass( const idDict & spawnArgs, const char *ammo_classname ) const;
////	ammo_t					AmmoIndexForWeaponClass( const char *weapon_classname, int *ammoRequired );
////	const char *			AmmoPickupNameForIndex( ammo_t ammonum ) const;
////	void					AddPickupName( name:string, const char *icon );
////
////	int						HasAmmo( ammo_t type, int amount );
////	bool					UseAmmo( ammo_t type, int amount );
////	int						HasAmmo( const char *weapon_classname );			// looks up the ammo information for the weapon class first
////
////	void					UpdateArmor( );
////
////	int						nextItemPickup;
////	int						nextItemNum;
////	int						onePickupTime;
////	idList<idItemInfo>		pickupItemNames;
////	idList<idObjectiveInfo>	objectiveNames;
};

class loggedAccel_t {
	time: number/*int*/;
	dir = new idVec3;		// scaled larger for running
};

class aasLocation_t{
	areaNum: number/*int*/;
	pos = new idVec3;
}

class idPlayer extends idActor {
////public:
////	enum {
////		EVENT_IMPULSE = idEntity::EVENT_MAXEVENTS,
////		EVENT_EXIT_TELEPORTER,
////		EVENT_ABORT_TELEPORTER,
////		EVENT_POWERUP,
////		EVENT_SPECTATE,
////		EVENT_MAXEVENTS
////	};
////
	usercmd = new usercmd_t;
////
////	class idPlayerView		playerView;			// handles damage kicks and effects
////
	noclip: boolean;
	godmode: boolean;
	
	spawnAnglesSet: boolean;		// on first usercmd, we must set deltaAngles
	spawnAngles = new idAngles;
	viewAngles = new idAngles;			// player view angles
	cmdAngles = new idAngles;			// player cmd angles
	
	buttonMask: number/*int*/;
	oldButtons: number/*int*/;
	oldFlags: number/*int*/;
	
	lastHitTime: number/*int*/;			// last time projectile fired by player hit target
	lastSndHitTime: number/*int*/;			// MP hit sound - != lastHitTime because we throttle
	lastSavingThrowTime: number/*int*/;	// for the "free miss" effect
////
////	idScriptBool			AI_FORWARD;
////	idScriptBool			AI_BACKWARD;
////	idScriptBool			AI_STRAFE_LEFT;
////	idScriptBool			AI_STRAFE_RIGHT;
////	idScriptBool			AI_ATTACK_HELD;
////	idScriptBool			AI_WEAPON_FIRED;
////	idScriptBool			AI_JUMP;
////	idScriptBool			AI_CROUCH;
////	idScriptBool			AI_ONGROUND;
////	idScriptBool			AI_ONLADDER;
////	idScriptBool			AI_DEAD;
////	idScriptBool			AI_RUN;
////	idScriptBool			AI_PAIN;
////	idScriptBool			AI_HARDLANDING;
////	idScriptBool			AI_SOFTLANDING;
////	idScriptBool			AI_RELOAD;
////	idScriptBool			AI_TELEPORT;
////	idScriptBool			AI_TURN_LEFT;
////	idScriptBool			AI_TURN_RIGHT;
////
	// inventory
	inventory = new idInventory;
	
	weapon = new idEntityPtr<idWeapon>();
	hud: idUserInterface;				// MP: is NULL if not local player
	objectiveSystem: idUserInterface;
	objectiveSystemOpen: boolean;
	
	weapon_soulcube: number/*int*/;
	weapon_pda: number/*int*/;
	weapon_fists: number/*int*/;
	
	heartRate: number/*int*/;
	heartInfo = new idInterpolate(float);
	lastHeartAdjust: number/*int*/;
	lastHeartBeat: number/*int*/;
	lastDmgTime: number/*int*/;
	deathClearContentsTime: number/*int*/;
	doingDeathSkin: boolean;
	lastArmorPulse: number/*int*/;		// lastDmgTime if we had armor at time of hit
	stamina: number/*float*/;
	healthPool: number/*float*/;			// amount of health to give over time
	nextHealthPulse: number/*int*/;
	healthPulse: boolean;
	healthTake: boolean;
	nextHealthTake: number/*int*/;
	
	
	hiddenWeapon: boolean;		// if the weapon is hidden ( in noWeapons maps )
	soulCubeProjectile = new idEntityPtr<idProjectile>();

	// mp stuff
	static colorBarTable = newStructArray<idVec3>(idVec3, 5 );
	spectator: number/*int*/;
	colorBar = new idVec3;			// used for scoreboard and hud display
	colorBarIndex: number/*int*/;
	scoreBoardOpen: boolean;
	forceScoreBoard: boolean;
	forceRespawn: boolean;
	spectating: boolean;
	lastSpectateTeleport: number/*int*/;
	lastHitToggle: boolean;
	forcedReady: boolean;
	wantSpectate: boolean;		// from userInfo
	weaponGone: boolean;			// force stop firing
	useInitialSpawns: boolean;	// toggled by a map restart to be active for the first game spawn
	latchedTeam: number/*int*/;		// need to track when team gets changed
	tourneyRank: number/*int*/;		// for tourney cycling - the higher, the more likely to play next - server
	tourneyLine: number/*int*/;		// client side - our spot in the wait line. 0 means no info.
	spawnedTime: number/*int*/;		// when client first enters the game

	teleportEntity = new idEntityPtr<idEntity>();		// while being teleported, this is set to the entity we'll use for exit
	teleportKiller: number/*int*/;		// entity number of an entity killing us at teleporter exit
	lastManOver: boolean;		// can't respawn in last man anymore (srv only)
	lastManPlayAgain: boolean;	// play again when end game delay is cancelled out before expiring (srv only)
	lastManPresent: boolean;		// true when player was in when game started (spectators can't join a running LMS)
	isLagged: boolean;			// replicated from server, true if packets haven't been received from client.
	isChatting: boolean;			// replicated from server, true if the player is chatting.
   
	// timers
	minRespawnTime: number/*int*/;		// can respawn when time > this, force after g_forcerespawn
	maxRespawnTime: number/*int*/;		// force respawn after this time

	// the first person view values are always calculated, even
	// if a third person view is used
	firstPersonViewOrigin = new idVec3;
	firstPersonViewAxis = new idMat3;

	dragEntity = new idDragEntity;

////public:
////	CLASS_PROTOTYPE( idPlayer );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idPlayer>[];
////
////							idPlayer();
////	virtual					~idPlayer();
////
////	void					Spawn( );
////	void					Think( );
////
////	// save games
////	void					Save( idSaveGame *savefile ) const;					// archives object for save game file
////	void					Restore( idRestoreGame *savefile );					// unarchives object from save game file
////
////	virtual void			Hide( );
////	virtual void			Show( );
////
////	void					Init( );
////	void					PrepareForRestart( );
////	virtual void			Restart( );
////	void					LinkScriptVariables( );
////	void					SetupWeaponEntity( );
////	void					SelectInitialSpawnPoint( idVec3 &origin, angles:idAngles );
////	void					SpawnFromSpawnSpot( );
////	void					SpawnToPoint( const idVec3	&spawn_origin, const idAngles &spawn_angles );
////	void					SetClipModel( );	// spectator mode uses a different bbox size
////
////	void					SavePersistantInfo( );
////	void					RestorePersistantInfo( );
////	void					SetLevelTrigger( const char *levelName, const char *triggerName );
////
	//UserInfoChanged ( canModify: boolean ): boolean { throw "placeholder"; }
////	idDict *				GetUserInfo( );
////	bool					BalanceTDM( );
////
////	void					CacheWeapons( );
////
////	void					EnterCinematic( );
////	void					ExitCinematic( );
////	bool					HandleESC( );
////	bool					SkipCinematic( );
////
////	void					UpdateConditions( );
////	void					SetViewAngles( angles:idAngles );
////
////							// delta view angles to allow movers to rotate the view of the player
////	void					UpdateDeltaViewAngles( angles:idAngles );
////
////	virtual bool			Collide( const trace_t &collision, const idVec3 &velocity );
////
////	virtual void			GetAASLocation( idAAS *aas, pos:idVec3, int &areaNum ) const;
////	virtual void			GetAIAimTargets( const idVec3 &lastSightPos, idVec3 &headPos, idVec3 &chestPos );
////	virtual void			DamageFeedback( idEntity *victim, idEntity *inflictor, int &damage );
////	void					CalcDamagePoints(  idEntity *inflictor, idEntity *attacker, const idDict *damageDef,
////							   const float damageScale, const int location, int *health, int *armor );
////	virtual	void			Damage( idEntity *inflictor, idEntity *attacker, const idVec3 &dir, const char *damageDefName, const float damageScale, const int location );
////
////							// use exitEntityNum to specify a teleport with private camera view and delayed exit
////	virtual void			Teleport( const idVec3 &origin, angles:idAngles, idEntity *destination );
////
////	void					Kill( bool delayRespawn, bool nodamage );
////	virtual void			Killed( idEntity *inflictor, idEntity *attacker, int damage, const idVec3 &dir, int location );
////	void					StartFxOnBone(const char *fx, const char *bone);
////
////	renderView_t *			GetRenderView( );
////	void					CalculateRenderView( );	// called every tic by player code
////	void					CalculateFirstPersonView( );
////
////	void					DrawHUD( idUserInterface *hud );
////
////	void					WeaponFireFeedback( const idDict *weaponDef );
////
////	float					DefaultFov( ) const;
////	float					CalcFov( bool honorZoom );
////	void					CalculateViewWeaponPos( idVec3 &origin, idMat3 &axis );
////	idVec3					GetEyePosition( ) const;
////	void					GetViewPos( idVec3 &origin, idMat3 &axis ) const;
////	void					OffsetThirdPersonView( /*float*/angle:number, float range, float height, bool clip );
////
////	bool					Give( const char *statname, value:string );
////	bool					GiveItem( idItem *item );
////	void					GiveItem( name:string );
////	void					GiveHealthPool( float amt );
////	
////	bool					GiveInventoryItem( idDict *item );
////	void					RemoveInventoryItem( idDict *item );
////	bool					GiveInventoryItem( name:string );
////	void					RemoveInventoryItem( name:string );
////	idDict *				FindInventoryItem( name:string );
////
////	void					GivePDA( const char *pdaName, idDict *item );
////	void					GiveVideo( const char *videoName, idDict *item );
////	void					GiveEmail( const char *emailName );
////	void					GiveSecurity( const char *security );
////	void					GiveObjective( const char *title, text:string, const char *screenshot );
////	void					CompleteObjective( const char *title );
////
////	bool					GivePowerUp( int powerup, /*int*/time:number );
////	void					ClearPowerUps( );
////	bool					PowerUpActive( int powerup ) const;
////	float					PowerUpModifier( int type );
////
////	int						SlotForWeapon( const char *weaponName );
////	void					Reload( );
////	void					NextWeapon( );
////	void					NextBestWeapon( );
////	void					PrevWeapon( );
////	void					SelectWeapon( int num, bool force );
////	void					DropWeapon( bool died ) ;
////	void					StealWeapon( idPlayer *player );
////	void					AddProjectilesFired( int count );
////	void					AddProjectileHits( int count );
////	void					SetLastHitTime( /*int*/time:number );
////	void					LowerWeapon( );
////	void					RaiseWeapon( );
////	void					WeaponLoweringCallback( );
////	void					WeaponRisingCallback( );
////	void					RemoveWeapon( const char *weap );
////	bool					CanShowWeaponViewmodel( ) const;
////
////	void					AddAIKill( );
////	void					SetSoulCubeProjectile( idProjectile *projectile );
////
////	void					AdjustHeartRate( int target, float timeInSecs, float delay, bool force );
////	void					SetCurrentHeartRate( );
////	int						GetBaseHeartRate( );
////	void					UpdateAir( );
////
////	virtual bool			HandleSingleGuiCommand( idEntity *entityGui, idLexer *src );
////	bool					GuiActive( ) { return focusGUIent != NULL; }
////
////	void					PerformImpulse( int impulse );
////	void					Spectate( bool spectate );
////	void					TogglePDA( );
////	void					ToggleScoreboard( );
////	void					RouteGuiMouse( idUserInterface *gui );
////	void					UpdateHud( );
////	const idDeclPDA *		GetPDA( ) const;
////	const idDeclVideo *		GetVideo( int index );
////	void					SetInfluenceFov( float fov );
////	void					SetInfluenceView( const char *mtr, const char *skinname, float radius, ent:idEntity );
////	void					SetInfluenceLevel( int level );
////	int						GetInfluenceLevel( ) { return influenceActive; };
////	void					SetPrivateCameraView( idCamera *camView );
////	idCamera *				GetPrivateCameraView( ) const { return privateCameraView; }
////	void					StartFxFov( float duration  );
////	void					UpdateHudWeapon( bool flashWeapon = true );
////	void					UpdateHudStats( idUserInterface *hud );
////	void					UpdateHudAmmo( idUserInterface *hud );
	Event_StopAudioLog( ):void { throw "placeholder"; }
////	void					StartAudioLog( );
////	void					StopAudioLog( );
////	void					ShowTip( const char *title, const char *tip, bool autoHide );
////	void					HideTip( );
////	bool					IsTipVisible( ) { return tipUp; };
////	void					ShowObjective( const char *obj );
////	void					HideObjective( );
////
////	virtual void			ClientPredictionThink( );
////	virtual void			WriteToSnapshot( idBitMsgDelta &msg ) const;
////	virtual void			ReadFromSnapshot( const idBitMsgDelta &msg );
////	void					WritePlayerStateToSnapshot( idBitMsgDelta &msg ) const;
////	void					ReadPlayerStateFromSnapshot( const idBitMsgDelta &msg );
////
////	virtual bool			ServerReceiveEvent( int event, /*int*/time:number, const idBitMsg &msg );
////
////	virtual bool			GetPhysicsToVisualTransform( idVec3 &origin, idMat3 &axis );
////	virtual bool			GetPhysicsToSoundTransform( idVec3 &origin, idMat3 &axis );
////
////	virtual bool			ClientReceiveEvent( int event, /*int*/time:number, const idBitMsg &msg );
////	bool					IsReady( );
////	bool					IsRespawning( );
////	bool					IsInTeleport( );
////
////	idEntity				*GetInfluenceEntity( ) { return influenceEntity; };
////	const idMaterial		*GetInfluenceMaterial( ) { return influenceMaterial; };
////	float					GetInfluenceRadius( ) { return influenceRadius; };
////
////	// server side work for in/out of spectate. takes care of spawning it into the world as well
////	void					ServerSpectate( bool spectate );
////	// for very specific usage. != GetPhysics()
////	idPhysics				*GetPlayerPhysics( );
////	void					TeleportDeath( int killer );
////	void					SetLeader( bool lead );
////	bool					IsLeader( );
////
////	void					UpdateSkinSetup( bool restart );
////
////	bool					OnLadder( ) const;
////
////	virtual	void			UpdatePlayerIcons( );
////	virtual	void			DrawPlayerIcons( );
////	virtual	void			HidePlayerIcons( );
////	bool					NeedsIcon( );
////
////	bool					SelfSmooth( );
////	void					SetSelfSmooth( bool b );
////
////private:
	hipJoint:jointHandle_t;
	chestJoint:jointHandle_t;
	headJoint:jointHandle_t;

	physicsObj = new idPhysics_Player;			// player physics
	
	aasLocation = new idList<aasLocation_t>(aasLocation_t);		// for AI tracking the player
	
	bobFoot: number/*int*/;
	bobFrac: number/*float*/;
	bobfracsin: number/*float*/;
	bobCycle: number/*int*/;			// for view bobbing and footstep generation
	xyspeed: number/*float*/;
	stepUpTime: number/*int*/;
	stepUpDelta: number/*float*/;
	idealLegsYaw: number/*float*/;
	legsYaw: number/*float*/;
	legsForward:boolean;
	oldViewYaw: number/*float*/;
	viewBobAngles = new idAngles;
	viewBob = new idVec3;
	landChange: number/*int*/;
	landTime: number/*int*/;
	
	currentWeapon: number/*int*/;
	idealWeapon: number/*int*/;
	previousWeapon: number/*int*/;
	weaponSwitchTime: number/*int*/;
	weaponEnabled:boolean;
	showWeaponViewModel:boolean;
	
	skin:idDeclSkin;
	powerUpSkin:idDeclSkin;
	baseSkinName = new idStr;
	
	numProjectilesFired: number/*int*/;	// number of projectiles fired
	numProjectileHits: number/*int*/;		// number of hits on mobs
	
	airless:boolean;
	airTics: number/*int*/;				// set to pm_airTics at start, drops in vacuum
	lastAirDamage: number/*int*/;
	
	gibDeath:boolean;
	gibsLaunched:boolean;
	gibsDir = new idVec3;
	
	zoomFov = new idInterpolate(float);
	centerView = new idInterpolate(float);
	fxFov:boolean;
	
	influenceFov: number/*float*/;
	influenceActive: number/*int*/;		// level of influence.. 1 == no gun or hud .. 2 == 1 + no movement
	influenceEntity:idEntity;
	influenceMaterial:idMaterial;
	influenceRadius: number/*float*/;
	influenceSkin:idDeclSkin;
	
	privateCameraView:idCamera;

	static NUM_LOGGED_VIEW_ANGLES = 64;		// for weapon turning angle offsets
	loggedViewAngles = newStructArray <idAngles>(idAngles,idPlayer.NUM_LOGGED_VIEW_ANGLES);	// [gameLocal.framenum&(LOGGED_VIEW_ANGLES-1)]
	static NUM_LOGGED_ACCELS = 16;			// for weapon turning angle offsets
	loggedAccel = newStructArray<loggedAccel_t>(loggedAccel_t, idPlayer.NUM_LOGGED_ACCELS);	// [currentLoggedAccel & (NUM_LOGGED_ACCELS-1)]
	currentLoggedAccel: number/*int*/;
	
	// if there is a focusGUIent, the attack button will be changed into mouse clicks
	focusGUIent:idEntity;
	focusUI:idUserInterface;				// focusGUIent->renderEntity.gui, gui2, or gui3
	focusCharacter:idAI;
	talkCursor: number/*int*/;				// show the state of the focusCharacter (0 == can't talk/dead, 1 == ready to talk, 2 == busy talking)
	focusTime: number/*int*/;
	focusVehicle:idAFEntity_Vehicle;
	cursor:idUserInterface;
	
	// full screen guis track mouse movements directly
	oldMouseX: number/*int*/;
	oldMouseY: number/*int*/;
	
	pdaAudio = new idStr;
	pdaVideo = new idStr;
	pdaVideoWave = new idStr;
	
	tipUp:boolean;
	objectiveUp:boolean;
	
	lastDamageDef: number/*int*/;
	lastDamageDir = new idVec3;
	lastDamageLocation: number/*int*/;
	smoothedFrame: number/*int*/;
	smoothedOriginUpdated:boolean;
	smoothedOrigin = new idVec3;
	smoothedAngles = new idAngles;
	
	// mp
	ready:boolean;					// from userInfo
	respawning:boolean;				// set to true while in SpawnToPoint for telefrag checks
	leader:boolean;					// for sudden death situations
	lastSpectateChange: number/*int*/;
	lastTeleFX: number/*int*/;
	lastSnapshotSequence: number/*int*/;	// track state hitches on clients
	weaponCatchup:boolean;			// raise up the weapon silently ( state catchups )
	MPAim: number/*int*/;					// player num in aim
	lastMPAim: number/*int*/;
	lastMPAimTime: number/*int*/;			// last time the aim changed
	MPAimFadeTime: number/*int*/;			// for GUI fade
	MPAimHighlight:boolean;
	isTelefragged:boolean;			// proper obituaries
	
	playerIcon = new idPlayerIcon;
	
	selfSmooth:boolean;
	
////	void					LookAtKiller( idEntity *inflictor, idEntity *attacker );
////
////	void					StopFiring( );
////	void					FireWeapon( );
////	void					Weapon_Combat( );
////	void					Weapon_NPC( );
////	void					Weapon_GUI( );
////	void					UpdateWeapon( );
////	void					UpdateSpectating( );
////	void					SpectateFreeFly( bool force );	// ignore the timeout to force when followed spec is no longer valid
////	void					SpectateCycle( );
////	idAngles				GunTurningOffset( );
////	idVec3					GunAcceleratingOffset( );
////
////	void					UseObjects( );
////	void					CrashLand( const idVec3 &oldOrigin, const idVec3 &oldVelocity );
////	void					BobCycle( const idVec3 &pushVelocity );
////	void					UpdateViewAngles( );
////	void					EvaluateControls( );
////	void					AdjustSpeed( );
////	void					AdjustBodyAngles( );
////	void					InitAASLocation( );
////	void					SetAASLocation( );
////	void					Move( );
////	void					UpdatePowerUps( );
////	void					UpdateDeathSkin( bool state_hitch );
////	void					ClearPowerup( int i );
////	void					SetSpectateOrigin( );
////
////	void					ClearFocus( );
////	void					UpdateFocus( );
////	void					UpdateLocation( );
////	idUserInterface *		ActiveGui( );
////	void					UpdatePDAInfo( bool updatePDASel );
////	int						AddGuiPDAData( const declType_t dataType, const char *listName, const idDeclPDA *src, idUserInterface *gui );
////	void					ExtractEmailInfo( const idStr &email, const char *scan, idStr &out );
////	void					UpdateObjectiveInfo( );
////
////	void					UseVehicle( );
////
	Event_GetButtons( ): void { throw "placeholder"; }
	Event_GetMove( ): void { throw "placeholder"; }
	Event_GetViewAngles( ): void { throw "placeholder"; }
	Event_StopFxFov( ): void { throw "placeholder"; }
	Event_EnableWeapon( ): void { throw "placeholder"; }
	Event_DisableWeapon( ): void { throw "placeholder"; }
	Event_GetCurrentWeapon( ): void { throw "placeholder"; }
	Event_GetPreviousWeapon( ): void { throw "placeholder"; }
	Event_SelectWeapon( weaponName:string ): void { throw "placeholder"; }
	Event_GetWeaponEntity( ): void { throw "placeholder"; }
	Event_OpenPDA( ): void { throw "placeholder"; }
	Event_PDAAvailable( ): void { throw "placeholder"; }
	Event_InPDA( ): void { throw "placeholder"; }
	Event_ExitTeleporter( ): void { throw "placeholder"; }
	Event_HideTip( ): void { throw "placeholder"; }
	Event_LevelTrigger( ): void { throw "placeholder"; }
	Event_Gibbed( ): void { throw "placeholder"; }
	Event_GetIdealWeapon( ): void { throw "placeholder"; }

////
////ID_INLINE bool idPlayer::IsReady( ) {
////	return ready || forcedReady;
////}
////
////ID_INLINE bool idPlayer::IsRespawning( ) {
////	return respawning;
////}
////
////ID_INLINE idPhysics* idPlayer::GetPlayerPhysics( ) {
////	return &physicsObj;
////}
////
////ID_INLINE bool idPlayer::IsInTeleport( ) {
////	return ( teleportEntity.GetEntity() != NULL );
////}
////
////ID_INLINE void idPlayer::SetLeader( bool lead ) {
////	leader = lead;
////}
////
////ID_INLINE bool idPlayer::IsLeader( ) {
////	return leader;
////}
////
////ID_INLINE bool idPlayer::SelfSmooth( ) {
////	return selfSmooth;
////}
////
////ID_INLINE void idPlayer::SetSelfSmooth( bool b ) {
////	selfSmooth = b;
////}
////
////#endif /* !__GAME_PLAYER_H__ */
////

/*
==============
idPlayer::idPlayer
==============
*/
	constructor ( ) {
		super ( );
		this.usercmd.memset0 ( ); //memset( &usercmd, 0, sizeof( usercmd ) );

		this.noclip = false;
		this.godmode = false;

		this.spawnAnglesSet = false;
		this.spawnAngles.opEquals( ang_zero );
		this.viewAngles.opEquals( ang_zero );
		this.cmdAngles.opEquals( ang_zero );

		this.oldButtons = 0;
		this.buttonMask = 0;
		this.oldFlags = 0;

		this.lastHitTime = 0;
		this.lastSndHitTime = 0;
		this.lastSavingThrowTime = 0;

		this.weapon = null;

		this.hud = null;
		this.objectiveSystem = null;
		this.objectiveSystemOpen = false;

		this.heartRate = BASE_HEARTRATE;
		this.heartInfo.Init( 0, 0, 0, 0 );
		this.lastHeartAdjust = 0;
		this.lastHeartBeat = 0;
		this.lastDmgTime = 0;
		this.deathClearContentsTime = 0;
		this.lastArmorPulse = -10000;
		this.stamina = 0.0;
		this.healthPool = 0.0;
		this.nextHealthPulse = 0;
		this.healthPulse = false;
		this.nextHealthTake = 0;
		this.healthTake = false;

		this.scoreBoardOpen = false;
		this.forceScoreBoard = false;
		this.forceRespawn = false;
		this.spectating = false;
		this.spectator = 0;
		this.colorBar.opEquals( vec3_zero );
		this.colorBarIndex = 0;
		this.forcedReady = false;
		this.wantSpectate = false;

		this.lastHitToggle = false;

		this.minRespawnTime = 0;
		this.maxRespawnTime = 0;

		this.firstPersonViewOrigin.opEquals( vec3_zero );
		this.firstPersonViewAxis.opEquals( mat3_identity );

		this.hipJoint = jointHandle_t.INVALID_JOINT;
		this.chestJoint = jointHandle_t.INVALID_JOINT;
		this.headJoint = jointHandle_t.INVALID_JOINT;

		this.bobFoot = 0;
		this.bobFrac = 0.0;
		this.bobfracsin = 0.0;
		this.bobCycle = 0;
		this.xyspeed = 0.0;
		this.stepUpTime = 0;
		this.stepUpDelta = 0.0;
		this.idealLegsYaw = 0.0;
		this.legsYaw = 0.0;
		this.legsForward = true;
		this.oldViewYaw = 0.0;
		this.viewBobAngles.opEquals( ang_zero );
		this.viewBob.opEquals( vec3_zero );
		this.landChange = 0;
		this.landTime = 0;

		this.currentWeapon = -1;
		this.idealWeapon = -1;
		this.previousWeapon = -1;
		this.weaponSwitchTime = 0;
		this.weaponEnabled = true;
		this.weapon_soulcube = -1;
		this.weapon_pda = -1;
		this.weapon_fists = -1;
		this.showWeaponViewModel = true;

		this.skin = null;
		this.powerUpSkin = null;
		this.baseSkinName.opEquals( "" );

		this.numProjectilesFired = 0;
		this.numProjectileHits = 0;

		this.airless = false;
		this.airTics = 0;
		this.lastAirDamage = 0;

		this.gibDeath = false;
		this.gibsLaunched = false;
		this.gibsDir.opEquals( vec3_zero );

		this.zoomFov.Init( 0, 0, 0, 0 );
		this.centerView.Init( 0, 0, 0, 0 );
		this.fxFov = false;

		this.influenceFov = 0;
		this.influenceActive = 0;
		this.influenceRadius = 0.0;
		this.influenceEntity = null;
		this.influenceMaterial = null;
		this.influenceSkin = null;

		this.privateCameraView = null;

		clearStructArray( this.loggedViewAngles ); //memset(this.loggedViewAngles, 0, sizeof(this.loggedViewAngles ) );
		clearStructArray( this.loggedAccel );//	memset(this.loggedAccel, 0, sizeof(this.loggedAccel ) );
		this.currentLoggedAccel = 0;

		this.focusTime = 0;
		this.focusGUIent = null;
		this.focusUI = null;
		this.focusCharacter = null;
		this.talkCursor = 0;
		this.focusVehicle = null;
		this.cursor = null;

		this.oldMouseX = 0;
		this.oldMouseY = 0;

		this.pdaAudio.opEquals( "" );
		this.pdaVideo.opEquals( "" );
		this.pdaVideoWave.opEquals( "" );

		this.lastDamageDef = 0;
		this.lastDamageDir.opEquals( vec3_zero );
		this.lastDamageLocation = 0;
		this.smoothedFrame = 0;
		this.smoothedOriginUpdated = false;
		this.smoothedOrigin.opEquals( vec3_zero );
		this.smoothedAngles.opEquals( ang_zero );

		this.fl.networkSync = true;

		this.latchedTeam = -1;
		this.doingDeathSkin = false;
		this.weaponGone = false;
		this.useInitialSpawns = false;
		this.tourneyRank = 0;
		this.lastSpectateTeleport = 0;
		this.tourneyLine = 0;
		this.hiddenWeapon = false;
		this.tipUp = false;
		this.objectiveUp = false;
		this.teleportEntity = null;
		this.teleportKiller = -1;
		this.respawning = false;
		this.ready = false;
		this.leader = false;
		this.lastSpectateChange = 0;
		this.lastTeleFX = -9999;
		this.weaponCatchup = false;
		this.lastSnapshotSequence = 0;

		this.MPAim = -1;
		this.lastMPAim = -1;
		this.lastMPAimTime = 0;
		this.MPAimFadeTime = 0;
		this.MPAimHighlight = false;

		this.spawnedTime = 0;
		this.lastManOver = false;
		this.lastManPlayAgain = false;
		this.lastManPresent = false;

		this.isTelefragged = false;

		this.isLagged = false;
		this.isChatting = false;

		this.selfSmooth = false;
	}

/////*
////==============
////idPlayer::LinkScriptVariables
////
////set up conditions for animation
////==============
////*/
////void idPlayer::LinkScriptVariables( ) {
////	AI_FORWARD.LinkTo(			scriptObject, "AI_FORWARD" );
////	AI_BACKWARD.LinkTo(			scriptObject, "AI_BACKWARD" );
////	AI_STRAFE_LEFT.LinkTo(		scriptObject, "AI_STRAFE_LEFT" );
////	AI_STRAFE_RIGHT.LinkTo(		scriptObject, "AI_STRAFE_RIGHT" );
////	AI_ATTACK_HELD.LinkTo(		scriptObject, "AI_ATTACK_HELD" );
////	AI_WEAPON_FIRED.LinkTo(		scriptObject, "AI_WEAPON_FIRED" );
////	AI_JUMP.LinkTo(				scriptObject, "AI_JUMP" );
////	AI_DEAD.LinkTo(				scriptObject, "AI_DEAD" );
////	AI_CROUCH.LinkTo(			scriptObject, "AI_CROUCH" );
////	AI_ONGROUND.LinkTo(			scriptObject, "AI_ONGROUND" );
////	AI_ONLADDER.LinkTo(			scriptObject, "AI_ONLADDER" );
////	AI_HARDLANDING.LinkTo(		scriptObject, "AI_HARDLANDING" );
////	AI_SOFTLANDING.LinkTo(		scriptObject, "AI_SOFTLANDING" );
////	AI_RUN.LinkTo(				scriptObject, "AI_RUN" );
////	AI_PAIN.LinkTo(				scriptObject, "AI_PAIN" );
////	AI_RELOAD.LinkTo(			scriptObject, "AI_RELOAD" );
////	AI_TELEPORT.LinkTo(			scriptObject, "AI_TELEPORT" );
////	AI_TURN_LEFT.LinkTo(		scriptObject, "AI_TURN_LEFT" );
////	AI_TURN_RIGHT.LinkTo(		scriptObject, "AI_TURN_RIGHT" );
////}
////
/////*
////==============
////idPlayer::SetupWeaponEntity
////==============
////*/
////void idPlayer::SetupWeaponEntity( ) {
////	int w;
////	const char *weap;
////
////	if ( this.weapon.GetEntity() ) {
////		// get rid of old weapon
////		this.weapon.GetEntity().Clear();
////		currentWeapon = -1;
////	} else if ( !gameLocal.isClient ) {
////		this.weapon = static_cast<idWeapon *>( gameLocal.SpawnEntityType( idWeapon::Type, NULL ) );
////		this.weapon.GetEntity().SetOwner( this );
////		currentWeapon = -1;
////	}
////
////	for( w = 0; w < MAX_WEAPONS; w++ ) {
////		weap = spawnArgs.GetString( va( "def_weapon%d", w ) );
////		if ( weap && *weap ) {
////			idWeapon::CacheWeapon( weap );
////		}
////	}
////}
////
/////*
////==============
////idPlayer::Init
////==============
////*/
////void idPlayer::Init( ) {
////	const char			*value;
////	const idKeyValue	*kv;
////
////	this.noclip					= false;
////	this.godmode					= false;
////
////	this.oldButtons				= 0;
////	this.oldFlags				= 0;
////
////	currentWeapon			= -1;
////	idealWeapon				= -1;
////	previousWeapon			= -1;
////	weaponSwitchTime		= 0;
////	weaponEnabled			= true;
////	this.weapon_soulcube			= SlotForWeapon( "weapon_soulcube" );
////	this.weapon_pda				= SlotForWeapon( "weapon_pda" );
////	this.weapon_fists			= SlotForWeapon( "weapon_fists" );
////	this.showWeaponViewModel		= GetUserInfo().GetBool( "ui_showGun" );
////
////
////	this.lastDmgTime				= 0;
////	lastArmorPulse			= -10000;
////	this.lastHeartAdjust			= 0;
////	this.lastHeartBeat			= 0;
////	this.heartInfo.Init( 0, 0, 0, 0 );
////
////	bobCycle				= 0;
////	bobFrac					= 0.0;
////	landChange				= 0;
////	landTime				= 0;
////	zoomFov.Init( 0, 0, 0, 0 );
////	centerView.Init( 0, 0, 0, 0 );
////	fxFov					= false;
////
////	influenceFov			= 0;
////	influenceActive			= 0;
////	influenceRadius			= 0.0;
////	influenceEntity			= NULL;
////	influenceMaterial		= NULL;
////	influenceSkin			= NULL;
////
////	currentLoggedAccel		= 0;
////
////	focusTime				= 0;
////	focusGUIent				= NULL;
////	focusUI					= NULL;
////	focusCharacter			= NULL;
////	talkCursor				= 0;
////	focusVehicle			= NULL;
////
////	// remove any damage effects
////	playerView.ClearEffects();
////
////	// damage values
////	this.fl.takedamage			= true;
////	ClearPain();
////
////	// restore persistent data
////	RestorePersistantInfo();
////
////	bobCycle		= 0;
////	stamina			= 0.0;
////	healthPool		= 0.0;
////	nextHealthPulse = 0;
////	healthPulse		= false;
////	nextHealthTake	= 0;
////	healthTake		= false;
////
////	SetupWeaponEntity();
////	currentWeapon = -1;
////	previousWeapon = -1;
////
////	this.heartRate = BASE_HEARTRATE;
////	AdjustHeartRate( BASE_HEARTRATE, 0.0, 0.0, true );
////
////	idealLegsYaw = 0.0;
////	legsYaw = 0.0;
////	legsForward	= true;
////	oldViewYaw = 0.0;
////
////	// set the pm_ cvars
////	if ( !gameLocal.isMultiplayer || gameLocal.isServer ) {
////		kv = spawnArgs.MatchPrefix( "pm_", NULL );
////		while( kv ) {
////			cvarSystem.SetCVarString( kv.GetKey(), kv.GetValue() );
////			kv = spawnArgs.MatchPrefix( "pm_", kv );
////		}
////	}
////
////	// disable stamina on hell levels
////	if ( gameLocal.world && gameLocal.world.spawnArgs.GetBool( "no_stamina" ) ) {
////		pm_stamina.SetFloat( 0.0 );
////	}
////
////	// stamina always initialized to maximum
////	stamina = pm_stamina.GetFloat();
////
////	// air always initialized to maximum too
////	airTics = pm_airTics.GetFloat();
////	airless = false;
////
////	gibDeath = false;
////	gibsLaunched = false;
////	gibsDir.Zero();
////
////	// set the gravity
////	physicsObj.SetGravity( gameLocal.GetGravity() );
////
////	// start out standing
////	SetEyeHeight( pm_normalviewheight.GetFloat() );
////
////	stepUpTime = 0;
////	stepUpDelta = 0.0;
////	viewBobAngles.Zero();
////	viewBob.Zero();
////
////	value = spawnArgs.GetString( "model" );
////	if ( value && ( *value != 0 ) ) {
////		SetModel( value );
////	}
////
////	if ( cursor ) {
////		cursor.SetStateInt( "talkcursor", 0 );
////		cursor.SetStateString( "combatcursor", "1" );
////		cursor.SetStateString( "itemcursor", "0" );
////		cursor.SetStateString( "guicursor", "0" );
////	}
////
////	if ( ( gameLocal.isMultiplayer || g_testDeath.GetBool() ) && skin ) {
////		SetSkin( skin );
////		renderEntity.shaderParms[6] = 0.0;
////	} else if ( spawnArgs.GetString( "spawn_skin", NULL, &value ) ) {
////		skin = declManager.FindSkin( value );
////		SetSkin( skin );
////		renderEntity.shaderParms[6] = 0.0;
////	}
////
////	value = spawnArgs.GetString( "bone_hips", "" );
////	hipJoint = animator.GetJointHandle( value );
////	if ( hipJoint == jointHandle_t.INVALID_JOINT ) {
////		gameLocal.Error( "Joint '%s' not found for 'bone_hips' on '%s'", value, name.c_str() );
////	}
////
////	value = spawnArgs.GetString( "bone_chest", "" );
////	chestJoint = animator.GetJointHandle( value );
////	if ( chestJoint == jointHandle_t.INVALID_JOINT ) {
////		gameLocal.Error( "Joint '%s' not found for 'bone_chest' on '%s'", value, name.c_str() );
////	}
////
////	value = spawnArgs.GetString( "bone_head", "" );
////	headJoint = animator.GetJointHandle( value );
////	if ( headJoint == jointHandle_t.INVALID_JOINT ) {
////		gameLocal.Error( "Joint '%s' not found for 'bone_head' on '%s'", value, name.c_str() );
////	}
////
////	// initialize the script variables
////	AI_FORWARD		= false;
////	AI_BACKWARD		= false;
////	AI_STRAFE_LEFT	= false;
////	AI_STRAFE_RIGHT	= false;
////	AI_ATTACK_HELD	= false;
////	AI_WEAPON_FIRED	= false;
////	AI_JUMP			= false;
////	AI_DEAD			= false;
////	AI_CROUCH		= false;
////	AI_ONGROUND		= true;
////	AI_ONLADDER		= false;
////	AI_HARDLANDING	= false;
////	AI_SOFTLANDING	= false;
////	AI_RUN			= false;
////	AI_PAIN			= false;
////	AI_RELOAD		= false;
////	AI_TELEPORT		= false;
////	AI_TURN_LEFT	= false;
////	AI_TURN_RIGHT	= false;
////
////	// reset the script object
////	ConstructScriptObject();
////
////	// execute the script so the script object's constructor takes effect immediately
////	scriptThread.Execute();
////	
////	forceScoreBoard		= false;
////	forcedReady			= false;
////
////	privateCameraView	= NULL;
////
////	lastSpectateChange	= 0;
////	lastTeleFX			= -9999;
////
////	hiddenWeapon		= false;
////	tipUp				= false;
////	objectiveUp			= false;
////	teleportEntity		= NULL;
////	teleportKiller		= -1;
////	leader				= false;
////
////	SetPrivateCameraView( NULL );
////
////	lastSnapshotSequence	= 0;
////
////	MPAim				= -1;
////	lastMPAim			= -1;
////	lastMPAimTime		= 0;
////	MPAimFadeTime		= 0;
////	MPAimHighlight		= false;
////
////	if ( this.hud ) {
////		this.hud.HandleNamedEvent( "aim_clear" );
////	}
////
////	cvarSystem.SetCVarBool( "ui_chat", false );
////}
////
/////*
////==============
////idPlayer::Spawn
////
////Prepare any resources used by the player.
////==============
////*/
	Spawn(): void {
		todoThrow();
////	idStr		temp;
////	idBounds	bounds;
////
////	if ( this.entityNumber >= MAX_CLIENTS ) {
////		gameLocal.Error( "entityNum > MAX_CLIENTS for player.  Player may only be spawned with a client." );
////	}
////
////	// allow thinking during cinematics
////	cinematic = true;
////
////	if ( gameLocal.isMultiplayer ) {
////		// always start in spectating state waiting to be spawned in
////		// do this before SetClipModel to get the right bounding box
////		spectating = true;
////	}
////
////	// set our collision model
////	physicsObj.SetSelf( this );
////	SetClipModel();
////	physicsObj.SetMass( spawnArgs.GetFloat( "mass", "100" ) );
////	physicsObj.SetContents( CONTENTS_BODY );
////	physicsObj.SetClipMask( MASK_PLAYERSOLID );
////	SetPhysics( &physicsObj );
////	InitAASLocation();
////
////	skin = renderEntity.customSkin;
////
////	// only the local player needs guis
////	if ( !gameLocal.isMultiplayer || this.entityNumber == gameLocal.localClientNum ) {
////
////		// load HUD
////		if ( gameLocal.isMultiplayer ) {
////			this.hud = uiManager.FindGui( "guis/mphud.gui", true, false, true );
////		} else if ( spawnArgs.GetString( "hud", "", temp ) ) {
////			this.hud = uiManager.FindGui( temp, true, false, true );
////		}
////		if ( this.hud ) {
////			this.hud.Activate( true, gameLocal.time );
////		}
////
////		// load cursor
////		if ( spawnArgs.GetString( "cursor", "", temp ) ) {
////			cursor = uiManager.FindGui( temp, true, gameLocal.isMultiplayer, gameLocal.isMultiplayer );
////		}
////		if ( cursor ) {
////			cursor.Activate( true, gameLocal.time );
////		}
////
////		this.objectiveSystem = uiManager.FindGui( "guis/pda.gui", true, false, true );
////		this.objectiveSystemOpen = false;
////	}
////
////	SetLastHitTime( 0 );
////
////	// load the armor sound feedback
////	declManager.FindSound( "player_sounds_hitArmor" );
////
////	// set up conditions for animation
////	LinkScriptVariables();
////
////	animator.RemoveOriginOffset( true );
////
////	// initialize user info related settings
////	// on server, we wait for the userinfo broadcast, as this controls when the player is initially spawned in game
////	if ( gameLocal.isClient || this.entityNumber == gameLocal.localClientNum ) {
////		this.UserInfoChanged( false );
////	}
////
////	// create combat collision hull for exact collision detection
////	SetCombatModel();
////
////	// init the damage effects
////	playerView.SetPlayerEntity( this );
////
////	// supress model in non-player views, but allow it in mirrors and remote views
////	renderEntity.suppressSurfaceInViewID = this.entityNumber+1;
////
////	// don't project shadow on self or weapon
////	renderEntity.noSelfShadow = true;
////
////	idAFAttachment *headEnt = head.GetEntity();
////	if ( headEnt ) {
////		headEnt.GetRenderEntity().suppressSurfaceInViewID = this.entityNumber+1;
////		headEnt.GetRenderEntity().noSelfShadow = true;
////	}
////
////	if ( gameLocal.isMultiplayer ) {
////		Init();
////		Hide();	// properly hidden if starting as a spectator
////		if ( !gameLocal.isClient ) {
////			// set yourself ready to spawn. idMultiplayerGame will decide when/if appropriate and call SpawnFromSpawnSpot
////			SetupWeaponEntity();
////			SpawnFromSpawnSpot();
////			forceRespawn = true;
////			assert( spectating );
////		}
////	} else {
////		SetupWeaponEntity();
////		SpawnFromSpawnSpot();
////	}
////
////	// trigger playtesting item gives, if we didn't get here from a previous level
////	// the devmap key will be set on the first devmap, but cleared on any level
////	// transitions
////	if ( !gameLocal.isMultiplayer && gameLocal.serverInfo.FindKey( "devmap" ) ) {
////		// fire a trigger with the name "devmap"
////		var ent:idEntity = gameLocal.FindEntity( "devmap" );
////		if ( ent ) {
////			ent.ActivateTargets( this );
////		}
////	}
////	if ( this.hud ) {
////		// We can spawn with a full soul cube, so we need to make sure the hud knows this
////		if ( this.weapon_soulcube > 0 && ( this.inventory.weapons & ( 1 << this.weapon_soulcube ) ) ) {
////			int max_souls = this.inventory.MaxAmmoForAmmoClass( this, "ammo_souls" );
////			if ( this.inventory.ammo[ idWeapon::GetAmmoNumForName( "ammo_souls" ) ] >= max_souls ) {
////				this.hud.HandleNamedEvent( "soulCubeReady" );
////			}
////		}
////		this.hud.HandleNamedEvent( "itemPickup" );
////	}
////
////	if ( GetPDA() ) {
////		// Add any emails from the this.inventory
////		for ( int i = 0; i < this.inventory.emails.Num(); i++ ) {
////			GetPDA().AddEmail( this.inventory.emails[i] );
////		}
////		GetPDA().SetSecurity( common.GetLanguageDict().GetString( "#str_00066" ) );
////	}
////
////	if ( gameLocal.world.spawnArgs.GetBool( "no_Weapons" ) ) {
////		hiddenWeapon = true;
////		if ( this.weapon.GetEntity() ) {
////			this.weapon.GetEntity().LowerWeapon();
////		}
////		idealWeapon = 0;
////	} else {
////		hiddenWeapon = false;
////	}
////	
////	if ( this.hud ) {
////		UpdateHudWeapon();
////		this.hud.StateChanged( gameLocal.time );
////	}
////
////	tipUp = false;
////	objectiveUp = false;
////
////	if ( this.inventory.levelTriggers.Num() ) {
////		PostEventMS( &EV_Player_LevelTrigger, 0 );
////	}
////
////	this.inventory.pdaOpened = false;
////	this.inventory.selPDA = 0;
////
////	if ( !gameLocal.isMultiplayer ) {
////		if ( g_skill.GetInteger() < 2 ) {
////			if ( health < 25 ) {
////				health = 25;
////			}
////			if ( g_useDynamicProtection.GetBool() ) {
////				g_damageScale.SetFloat( 1.0f );
////			}
////		} else {
////			g_damageScale.SetFloat( 1.0f );
////			g_armorProtection.SetFloat( ( g_skill.GetInteger() < 2 ) ? 0.4f : 0.2f );
////#ifndef ID_DEMO_BUILD
////			if ( g_skill.GetInteger() == 3 ) {
////				healthTake = true;
////				nextHealthTake = gameLocal.time + g_healthTakeTime.GetInteger() * 1000;
////			}
////#endif
////		}
////	}
}
////
/////*
////==============
////idPlayer::~idPlayer()
////
////Release any resources used by the player.
////==============
////*/
////idPlayer::~idPlayer() {
////	delete this.weapon.GetEntity();
////	this.weapon = NULL;
////}
////
/////*
////===========
////idPlayer::Save
////===========
////*/
////void idPlayer::Save( idSaveGame *savefile ) const {
////	var/*int*/i:number;
////
////	savefile.WriteUsercmd( usercmd );
////	playerView.Save( savefile );
////
////	savefile.WriteBool( this.noclip );
////	savefile.WriteBool( this.godmode );
////
////	// don't save spawnAnglesSet, since we'll have to reset them after loading the savegame
////	savefile.WriteAngles( this.spawnAngles );
////	savefile.WriteAngles( this.viewAngles );
////	savefile.WriteAngles( this.cmdAngles );
////
////	savefile.WriteInt( this.buttonMask );
////	savefile.WriteInt( this.oldButtons );
////	savefile.WriteInt( this.oldFlags );
////
////	savefile.WriteInt( this.lastHitTime );
////	savefile.WriteInt( this.lastSndHitTime );
////	savefile.WriteInt( this.lastSavingThrowTime );
////
////	// idBoolFields don't need to be saved, just re-linked in Restore
////
////	this.inventory.Save( savefile );
////	this.weapon.Save( savefile );
////
////	savefile.WriteUserInterface( this.hud, false );
////	savefile.WriteUserInterface( this.objectiveSystem, false );
////	savefile.WriteBool( this.objectiveSystemOpen );
////
////	savefile.WriteInt( this.weapon_soulcube );
////	savefile.WriteInt( this.weapon_pda );
////	savefile.WriteInt( this.weapon_fists );
////
////	savefile.WriteInt( this.heartRate );
////
////	savefile.WriteFloat( this.heartInfo.GetStartTime() );
////	savefile.WriteFloat( this.heartInfo.GetDuration() );
////	savefile.WriteFloat( this.heartInfo.GetStartValue() );
////	savefile.WriteFloat( this.heartInfo.GetEndValue() );
////
////	savefile.WriteInt( this.lastHeartAdjust );
////	savefile.WriteInt( this.lastHeartBeat );
////	savefile.WriteInt( this.lastDmgTime );
////	savefile.WriteInt( deathClearContentsTime );
////	savefile.WriteBool( doingDeathSkin );
////	savefile.WriteInt( lastArmorPulse );
////	savefile.WriteFloat( stamina );
////	savefile.WriteFloat( healthPool );
////	savefile.WriteInt( nextHealthPulse );
////	savefile.WriteBool( healthPulse );
////	savefile.WriteInt( nextHealthTake );
////	savefile.WriteBool( healthTake );
////
////	savefile.WriteBool( hiddenWeapon );
////	soulCubeProjectile.Save( savefile );
////
////	savefile.WriteInt( spectator );
////	savefile.WriteVec3( colorBar );
////	savefile.WriteInt( colorBarIndex );
////	savefile.WriteBool( scoreBoardOpen );
////	savefile.WriteBool( forceScoreBoard );
////	savefile.WriteBool( forceRespawn );
////	savefile.WriteBool( spectating );
////	savefile.WriteInt( lastSpectateTeleport );
////	savefile.WriteBool( lastHitToggle );
////	savefile.WriteBool( forcedReady );
////	savefile.WriteBool( wantSpectate );
////	savefile.WriteBool( weaponGone );
////	savefile.WriteBool( useInitialSpawns );
////	savefile.WriteInt( latchedTeam );
////	savefile.WriteInt( tourneyRank );
////	savefile.WriteInt( tourneyLine );
////
////	teleportEntity.Save( savefile );
////	savefile.WriteInt( teleportKiller );
////
////	savefile.WriteInt( minRespawnTime );
////	savefile.WriteInt( maxRespawnTime );
////
////	savefile.WriteVec3( firstPersonViewOrigin );
////	savefile.WriteMat3( firstPersonViewAxis );
////
////	// don't bother saving dragEntity since it's a dev tool
////
////	savefile.WriteJoint( hipJoint );
////	savefile.WriteJoint( chestJoint );
////	savefile.WriteJoint( headJoint );
////
////	savefile.WriteStaticObject( physicsObj );
////
////	savefile.WriteInt( aasLocation.Num() );
////	for( i = 0; i < aasLocation.Num(); i++ ) {
////		savefile.WriteInt( aasLocation[ i ].areaNum );
////		savefile.WriteVec3( aasLocation[ i ].pos );
////	}
////
////	savefile.WriteInt( bobFoot );
////	savefile.WriteFloat( bobFrac );
////	savefile.WriteFloat( bobfracsin );
////	savefile.WriteInt( bobCycle );
////	savefile.WriteFloat( xyspeed );
////	savefile.WriteInt( stepUpTime );
////	savefile.WriteFloat( stepUpDelta );
////	savefile.WriteFloat( idealLegsYaw );
////	savefile.WriteFloat( legsYaw );
////	savefile.WriteBool( legsForward );
////	savefile.WriteFloat( oldViewYaw );
////	savefile.WriteAngles( viewBobAngles );
////	savefile.WriteVec3( viewBob );
////	savefile.WriteInt( landChange );
////	savefile.WriteInt( landTime );
////
////	savefile.WriteInt( currentWeapon );
////	savefile.WriteInt( idealWeapon );
////	savefile.WriteInt( previousWeapon );
////	savefile.WriteInt( weaponSwitchTime );
////	savefile.WriteBool( weaponEnabled );
////	savefile.WriteBool( this.showWeaponViewModel );
////
////	savefile.WriteSkin( skin );
////	savefile.WriteSkin( this.powerUpSkin );
////	savefile.WriteString( this.baseSkinName );
////
////	savefile.WriteInt( numProjectilesFired );
////	savefile.WriteInt( numProjectileHits );
////
////	savefile.WriteBool( airless );
////	savefile.WriteInt( airTics );
////	savefile.WriteInt( lastAirDamage );
////
////	savefile.WriteBool( gibDeath );
////	savefile.WriteBool( gibsLaunched );
////	savefile.WriteVec3( gibsDir );
////
////	savefile.WriteFloat( zoomFov.GetStartTime() );
////	savefile.WriteFloat( zoomFov.GetDuration() );
////	savefile.WriteFloat( zoomFov.GetStartValue() );
////	savefile.WriteFloat( zoomFov.GetEndValue() );
////
////	savefile.WriteFloat( centerView.GetStartTime() );
////	savefile.WriteFloat( centerView.GetDuration() );
////	savefile.WriteFloat( centerView.GetStartValue() );
////	savefile.WriteFloat( centerView.GetEndValue() );
////
////	savefile.WriteBool( fxFov );
////
////	savefile.WriteFloat( influenceFov );
////	savefile.WriteInt( influenceActive );
////	savefile.WriteFloat( influenceRadius );
////	savefile.WriteObject( influenceEntity );
////	savefile.WriteMaterial( influenceMaterial );
////	savefile.WriteSkin( influenceSkin );
////
////	savefile.WriteObject( privateCameraView );
////
////	for( i = 0; i < NUM_LOGGED_VIEW_ANGLES; i++ ) {
////		savefile.WriteAngles( loggedViewAngles[ i ] );
////	}
////	for( i = 0; i < NUM_LOGGED_ACCELS; i++ ) {
////		savefile.WriteInt( this.loggedAccel[ i ].time );
////		savefile.WriteVec3( this.loggedAccel[ i ].dir );
////	}
////	savefile.WriteInt( currentLoggedAccel );
////
////	savefile.WriteObject( focusGUIent );
////	// can't save focusUI
////	savefile.WriteObject( focusCharacter );
////	savefile.WriteInt( talkCursor );
////	savefile.WriteInt( focusTime );
////	savefile.WriteObject( focusVehicle );
////	savefile.WriteUserInterface( cursor, false );
////
////	savefile.WriteInt( oldMouseX );
////	savefile.WriteInt( oldMouseY );
////
////	savefile.WriteString( pdaAudio );
////	savefile.WriteString( pdaVideo );
////	savefile.WriteString( pdaVideoWave );
////
////	savefile.WriteBool( tipUp );
////	savefile.WriteBool( objectiveUp );
////
////	savefile.WriteInt( lastDamageDef );
////	savefile.WriteVec3( lastDamageDir );
////	savefile.WriteInt( lastDamageLocation );
////	savefile.WriteInt( smoothedFrame );
////	savefile.WriteBool( smoothedOriginUpdated );
////	savefile.WriteVec3( smoothedOrigin );
////	savefile.WriteAngles( smoothedAngles );
////
////	savefile.WriteBool( ready );
////	savefile.WriteBool( respawning );
////	savefile.WriteBool( leader );
////	savefile.WriteInt( lastSpectateChange );
////	savefile.WriteInt( lastTeleFX );
////
////	savefile.WriteFloat( pm_stamina.GetFloat() );
////
////	if ( this.hud ) {
////		this.hud.SetStateString( "message", common.GetLanguageDict().GetString( "#str_02916" ) );
////		this.hud.HandleNamedEvent( "Message" );
////	}
////}
////
/////*
////===========
////idPlayer::Restore
////===========
////*/
////void idPlayer::Restore( idRestoreGame *savefile ) {
////	var i:number /*int*/;
////	int	  num;
////	float set;
////
////	savefile.ReadUsercmd( usercmd );
////	playerView.Restore( savefile );
////
////	savefile.ReadBool( this.noclip );
////	savefile.ReadBool( this.godmode );
////
////	savefile.ReadAngles( this.spawnAngles );
////	savefile.ReadAngles( this.viewAngles );
////	savefile.ReadAngles( this.cmdAngles );
////
////	memset( usercmd.angles, 0, sizeof( usercmd.angles ) );
////	SetViewAngles( this.viewAngles );
////	this.spawnAnglesSet = true;
////
////	savefile.ReadInt( this.buttonMask );
////	savefile.ReadInt( this.oldButtons );
////	savefile.ReadInt( this.oldFlags );
////
////	usercmd.flags = 0;
////	this.oldFlags = 0;
////
////	savefile.ReadInt( this.lastHitTime );
////	savefile.ReadInt( this.lastSndHitTime );
////	savefile.ReadInt( this.lastSavingThrowTime );
////
////	// Re-link idBoolFields to the scriptObject, values will be restored in scriptObject's restore
////	LinkScriptVariables();
////
////	this.inventory.Restore( savefile );
////	this.weapon.Restore( savefile );
////
////	for ( i = 0; i < this.inventory.emails.Num(); i++ ) {
////		GetPDA().AddEmail( this.inventory.emails[i] );
////	}
////
////	savefile.ReadUserInterface( this.hud );
////	savefile.ReadUserInterface( this.objectiveSystem );
////	savefile.ReadBool( this.objectiveSystemOpen );
////
////	savefile.ReadInt( this.weapon_soulcube );
////	savefile.ReadInt( this.weapon_pda );
////	savefile.ReadInt( this.weapon_fists );
////
////	savefile.ReadInt( this.heartRate );
////
////	savefile.ReadFloat( set );
////	this.heartInfo.SetStartTime( set );
////	savefile.ReadFloat( set );
////	this.heartInfo.SetDuration( set );
////	savefile.ReadFloat( set );
////	this.heartInfo.SetStartValue( set );
////	savefile.ReadFloat( set );
////	this.heartInfo.SetEndValue( set );
////
////	savefile.ReadInt( this.lastHeartAdjust );
////	savefile.ReadInt( this.lastHeartBeat );
////	savefile.ReadInt( this.lastDmgTime );
////	savefile.ReadInt( deathClearContentsTime );
////	savefile.ReadBool( doingDeathSkin );
////	savefile.ReadInt( lastArmorPulse );
////	savefile.ReadFloat( stamina );
////	savefile.ReadFloat( healthPool );
////	savefile.ReadInt( nextHealthPulse );
////	savefile.ReadBool( healthPulse );
////	savefile.ReadInt( nextHealthTake );
////	savefile.ReadBool( healthTake );
////
////	savefile.ReadBool( hiddenWeapon );
////	soulCubeProjectile.Restore( savefile );
////
////	savefile.ReadInt( spectator );
////	savefile.ReadVec3( colorBar );
////	savefile.ReadInt( colorBarIndex );
////	savefile.ReadBool( scoreBoardOpen );
////	savefile.ReadBool( forceScoreBoard );
////	savefile.ReadBool( forceRespawn );
////	savefile.ReadBool( spectating );
////	savefile.ReadInt( lastSpectateTeleport );
////	savefile.ReadBool( lastHitToggle );
////	savefile.ReadBool( forcedReady );
////	savefile.ReadBool( wantSpectate );
////	savefile.ReadBool( weaponGone );
////	savefile.ReadBool( useInitialSpawns );
////	savefile.ReadInt( latchedTeam );
////	savefile.ReadInt( tourneyRank );
////	savefile.ReadInt( tourneyLine );
////
////	teleportEntity.Restore( savefile );
////	savefile.ReadInt( teleportKiller );
////
////	savefile.ReadInt( minRespawnTime );
////	savefile.ReadInt( maxRespawnTime );
////
////	savefile.ReadVec3( firstPersonViewOrigin );
////	savefile.ReadMat3( firstPersonViewAxis );
////
////	// don't bother saving dragEntity since it's a dev tool
////	dragEntity.Clear();
////
////	savefile.ReadJoint( hipJoint );
////	savefile.ReadJoint( chestJoint );
////	savefile.ReadJoint( headJoint );
////
////	savefile.ReadStaticObject( physicsObj );
////	RestorePhysics( &physicsObj );
////
////	savefile.ReadInt( num );
////	aasLocation.SetGranularity( 1 );
////	aasLocation.SetNum( num );
////	for( i = 0; i < num; i++ ) {
////		savefile.ReadInt( aasLocation[ i ].areaNum );
////		savefile.ReadVec3( aasLocation[ i ].pos );
////	}
////
////	savefile.ReadInt( bobFoot );
////	savefile.ReadFloat( bobFrac );
////	savefile.ReadFloat( bobfracsin );
////	savefile.ReadInt( bobCycle );
////	savefile.ReadFloat( xyspeed );
////	savefile.ReadInt( stepUpTime );
////	savefile.ReadFloat( stepUpDelta );
////	savefile.ReadFloat( idealLegsYaw );
////	savefile.ReadFloat( legsYaw );
////	savefile.ReadBool( legsForward );
////	savefile.ReadFloat( oldViewYaw );
////	savefile.ReadAngles( viewBobAngles );
////	savefile.ReadVec3( viewBob );
////	savefile.ReadInt( landChange );
////	savefile.ReadInt( landTime );
////
////	savefile.ReadInt( currentWeapon );
////	savefile.ReadInt( idealWeapon );
////	savefile.ReadInt( previousWeapon );
////	savefile.ReadInt( weaponSwitchTime );
////	savefile.ReadBool( weaponEnabled );
////	savefile.ReadBool( this.showWeaponViewModel );
////
////	savefile.ReadSkin( skin );
////	savefile.ReadSkin( this.powerUpSkin );
////	savefile.ReadString( this.baseSkinName );
////
////	savefile.ReadInt( numProjectilesFired );
////	savefile.ReadInt( numProjectileHits );
////
////	savefile.ReadBool( airless );
////	savefile.ReadInt( airTics );
////	savefile.ReadInt( lastAirDamage );
////
////	savefile.ReadBool( gibDeath );
////	savefile.ReadBool( gibsLaunched );
////	savefile.ReadVec3( gibsDir );
////
////	savefile.ReadFloat( set );
////	zoomFov.SetStartTime( set );
////	savefile.ReadFloat( set );
////	zoomFov.SetDuration( set );
////	savefile.ReadFloat( set );
////	zoomFov.SetStartValue( set );
////	savefile.ReadFloat( set );
////	zoomFov.SetEndValue( set );
////
////	savefile.ReadFloat( set );
////	centerView.SetStartTime( set );
////	savefile.ReadFloat( set );
////	centerView.SetDuration( set );
////	savefile.ReadFloat( set );
////	centerView.SetStartValue( set );
////	savefile.ReadFloat( set );
////	centerView.SetEndValue( set );
////
////	savefile.ReadBool( fxFov );
////
////	savefile.ReadFloat( influenceFov );
////	savefile.ReadInt( influenceActive );
////	savefile.ReadFloat( influenceRadius );
////	savefile.ReadObject( reinterpret_cast<idClass *&>( influenceEntity ) );
////	savefile.ReadMaterial( influenceMaterial );
////	savefile.ReadSkin( influenceSkin );
////
////	savefile.ReadObject( reinterpret_cast<idClass *&>( privateCameraView ) );
////
////	for( i = 0; i < NUM_LOGGED_VIEW_ANGLES; i++ ) {
////		savefile.ReadAngles( loggedViewAngles[ i ] );
////	}
////	for( i = 0; i < NUM_LOGGED_ACCELS; i++ ) {
////		savefile.ReadInt( this.loggedAccel[ i ].time );
////		savefile.ReadVec3( this.loggedAccel[ i ].dir );
////	}
////	savefile.ReadInt( currentLoggedAccel );
////
////	savefile.ReadObject( reinterpret_cast<idClass *&>( focusGUIent ) );
////	// can't save focusUI
////	focusUI = NULL;
////	savefile.ReadObject( reinterpret_cast<idClass *&>( focusCharacter ) );
////	savefile.ReadInt( talkCursor );
////	savefile.ReadInt( focusTime );
////	savefile.ReadObject( reinterpret_cast<idClass *&>( focusVehicle ) );
////	savefile.ReadUserInterface( cursor );
////
////	savefile.ReadInt( oldMouseX );
////	savefile.ReadInt( oldMouseY );
////
////	savefile.ReadString( pdaAudio );
////	savefile.ReadString( pdaVideo );
////	savefile.ReadString( pdaVideoWave );
////
////	savefile.ReadBool( tipUp );
////	savefile.ReadBool( objectiveUp );
////
////	savefile.ReadInt( lastDamageDef );
////	savefile.ReadVec3( lastDamageDir );
////	savefile.ReadInt( lastDamageLocation );
////	savefile.ReadInt( smoothedFrame );
////	savefile.ReadBool( smoothedOriginUpdated );
////	savefile.ReadVec3( smoothedOrigin );
////	savefile.ReadAngles( smoothedAngles );
////
////	savefile.ReadBool( ready );
////	savefile.ReadBool( respawning );
////	savefile.ReadBool( leader );
////	savefile.ReadInt( lastSpectateChange );
////	savefile.ReadInt( lastTeleFX );
////
////	// set the pm_ cvars
////	const idKeyValue	*kv;
////	kv = spawnArgs.MatchPrefix( "pm_", NULL );
////	while( kv ) {
////		cvarSystem.SetCVarString( kv.GetKey(), kv.GetValue() );
////		kv = spawnArgs.MatchPrefix( "pm_", kv );
////	}
////
////	savefile.ReadFloat( set );
////	pm_stamina.SetFloat( set );
////
////	// create combat collision hull for exact collision detection
////	SetCombatModel();
////}
////
/////*
////===============
////idPlayer::PrepareForRestart
////================
////*/
////void idPlayer::PrepareForRestart( ) {
////	ClearPowerUps();
////	Spectate( true );
////	forceRespawn = true;
////	
////	// we will be restarting program, clear the client entities from program-related things first
////	ShutdownThreads();
////
////	// the sound world is going to be cleared, don't keep references to emitters
////	FreeSoundEmitter( false );
////}
////
/////*
////===============
////idPlayer::Restart
////================
////*/
////void idPlayer::Restart( ) {
////	idActor::Restart();
////	
////	// client needs to setup the animation script object again
////	if ( gameLocal.isClient ) {
////		Init();
////	} else {
////		// choose a random spot and prepare the point of view in case player is left spectating
////		assert( spectating );
////		SpawnFromSpawnSpot();
////	}
////
////	useInitialSpawns = true;
////	UpdateSkinSetup( true );
////}
////
/////*
////===============
////idPlayer::ServerSpectate
////================
////*/
////void idPlayer::ServerSpectate( bool spectate ) {
////	assert( !gameLocal.isClient );
////
////	if ( spectating != spectate ) {
////		Spectate( spectate );
////		if ( spectate ) {
////			SetSpectateOrigin();
////		} else {
////			if ( gameLocal.gameType == GAME_DM ) {
////				// make sure the scores are reset so you can't exploit by spectating and entering the game back
////				// other game types don't matter, as you either can't join back, or it's team scores
////				gameLocal.mpGame.ClearFrags( this.entityNumber );
////			}
////		}
////	}
////	if ( !spectate ) {
////		SpawnFromSpawnSpot();
////	}
////}
////
/////*
////===========
////idPlayer::SelectInitialSpawnPoint
////
////Try to find a spawn point marked 'initial', otherwise
////use normal spawn selection.
////============
////*/
////void idPlayer::SelectInitialSpawnPoint( idVec3 &origin, angles:idAngles ) {
////	idEntity *spot;
////	idStr skin;
////
////	spot = gameLocal.SelectInitialSpawnPoint( this );
////
////	// set the player skin from the spawn location
////	if ( spot.spawnArgs.GetString( "skin", NULL, skin ) ) {
////		spawnArgs.Set( "spawn_skin", skin );
////	}
////
////	// activate the spawn locations targets
////	spot.PostEventMS( &EV_ActivateTargets, 0, this );
////
////	origin = spot.GetPhysics().GetOrigin();
////	origin[2] += 4.0f + CM_BOX_EPSILON;		// move up to make sure the player is at least an epsilon above the floor
////	angles = spot.GetPhysics().GetAxis().ToAngles();
////}
////
/////*
////===========
////idPlayer::SpawnFromSpawnSpot
////
////Chooses a spawn location and spawns the player
////============
////*/
////void idPlayer::SpawnFromSpawnSpot( ) {
////	idVec3		spawn_origin;
////	idAngles	spawn_angles;
////	
////	SelectInitialSpawnPoint( spawn_origin, spawn_angles );
////	SpawnToPoint( spawn_origin, spawn_angles );
////}
////
/////*
////===========
////idPlayer::SpawnToPoint
////
////Called every time a client is placed fresh in the world:
////after the first ClientBegin, and after each respawn
////Initializes all non-persistant parts of playerState
////
////when called here with spectating set to true, just place yourself and init
////============
////*/
////void idPlayer::SpawnToPoint( const idVec3 &spawn_origin, const idAngles &spawn_angles ) {
////	idVec3 spec_origin;
////
////	assert( !gameLocal.isClient );
////
////	respawning = true;
////
////	Init();
////
////	this.fl.noknockback = false;
////
////	// stop any ragdolls being used
////	StopRagdoll();
////
////	// set back the player physics
////	SetPhysics( &physicsObj );
////
////	physicsObj.SetClipModelAxis();
////	physicsObj.EnableClip();
////
////	if ( !spectating ) {
////		SetCombatContents( true );
////	}
////
////	physicsObj.SetLinearVelocity( vec3_origin );
////
////	// setup our initial view
////	if ( !spectating ) {
////		SetOrigin( spawn_origin );
////	} else {
////		spec_origin = spawn_origin;
////		spec_origin[ 2 ] += pm_normalheight.GetFloat();
////		spec_origin[ 2 ] += SPECTATE_RAISE;
////		SetOrigin( spec_origin );
////	}
////
////	// if this is the first spawn of the map, we don't have a usercmd yet,
////	// so the delta angles won't be correct.  This will be fixed on the first think.
////	this.viewAngles = ang_zero;
////	SetDeltaViewAngles( ang_zero );
////	SetViewAngles( spawn_angles );
////	this.spawnAngles = spawn_angles;
////	this.spawnAnglesSet = false;
////
////	legsForward = true;
////	legsYaw = 0.0;
////	idealLegsYaw = 0.0;
////	oldViewYaw = this.viewAngles.yaw;
////
////	if ( spectating ) {
////		Hide();
////	} else {
////		Show();
////	}
////
////	if ( gameLocal.isMultiplayer ) {
////		if ( !spectating ) {
////			// we may be called twice in a row in some situations. avoid a double fx and 'fly to the roof'
////			if ( lastTeleFX < gameLocal.time - 1000 ) {
////				idEntityFx::StartFx( spawnArgs.GetString( "fx_spawn" ), &spawn_origin, NULL, this, true );
////				lastTeleFX = gameLocal.time;
////			}
////		}
////		AI_TELEPORT = true;
////	} else {
////		AI_TELEPORT = false;
////	}
////
////	// kill anything at the new position
////	if ( !spectating ) {
////		physicsObj.SetClipMask( MASK_PLAYERSOLID ); // the clip mask is usually maintained in Move(), but KillBox requires it
////		gameLocal.KillBox( this );
////	}
////
////	// don't allow full run speed for a bit
////	physicsObj.SetKnockBack( 100 );
////
////	// set our respawn time and buttons so that if we're killed we don't respawn immediately
////	minRespawnTime = gameLocal.time;
////	maxRespawnTime = gameLocal.time;
////	if ( !spectating ) {
////		forceRespawn = false;
////	}
////
////	privateCameraView = NULL;
////
////	BecomeActive( TH_THINK );
////
////	// run a client frame to drop exactly to the floor,
////	// initialize animations and other things
////	Think();
////
////	respawning			= false;
////	lastManOver			= false;
////	lastManPlayAgain	= false;
////	isTelefragged		= false;
////}
////
/////*
////===============
////idPlayer::SavePersistantInfo
////
////Saves any inventory and player stats when changing levels.
////===============
////*/
////void idPlayer::SavePersistantInfo( ) {
////	idDict &playerInfo = gameLocal.persistentPlayerInfo[this.entityNumber];
////
////	playerInfo.Clear();
////	this.inventory.GetPersistantData( playerInfo );
////	playerInfo.SetInt( "health", health );
////	playerInfo.SetInt( "current_weapon", currentWeapon );
////}
////
/////*
////===============
////idPlayer::RestorePersistantInfo
////
////Restores any inventory and player stats when changing levels.
////===============
////*/
////void idPlayer::RestorePersistantInfo( ) {
////	if ( gameLocal.isMultiplayer ) {
////		gameLocal.persistentPlayerInfo[this.entityNumber].Clear();
////	}
////
////	spawnArgs.Copy( gameLocal.persistentPlayerInfo[this.entityNumber] );
////
////	this.inventory.RestoreInventory( this, spawnArgs );
////	health = spawnArgs.GetInt( "health", "100" );
////	if ( !gameLocal.isClient ) {
////		idealWeapon = spawnArgs.GetInt( "current_weapon", "1" );
////	}
////}

/*
================
idPlayer::GetUserInfo
================
*/
	GetUserInfo ( ): idDict {
		return gameLocal.userInfo[this.entityNumber];
	}

/////*
////==============
////idPlayer::UpdateSkinSetup
////==============
////*/
////void idPlayer::UpdateSkinSetup( bool restart ) {
////	if ( restart ) {
////		team = ( idStr.Icmp( GetUserInfo().GetString( "ui_team" ), "Blue" ) == 0 );
////	}
////	if ( gameLocal.gameType == GAME_TDM ) {
////		if ( team ) {
////			this.baseSkinName.opEquals("skins/characters/player/marine_mp_blue");
////		} else {
////			this.baseSkinName .opEquals( "skins/characters/player/marine_mp_red");
////		}
////		if ( !gameLocal.isClient && team != latchedTeam ) {
////			gameLocal.mpGame.SwitchToTeam( this.entityNumber, latchedTeam, team );
////		}
////		latchedTeam = team;
////	} else {
////		this.baseSkinName .opEquals( GetUserInfo().GetString( "ui_skin" ));
////	}
////	if ( !this.baseSkinName.Length() ) {
////		this.baseSkinName .opEquals( "skins/characters/player/marine_mp");
////	}
////	skin = declManager.FindSkin( this.baseSkinName, false );
////	assert( skin );
////	// match the skin to a color band for scoreboard
////	if ( this.baseSkinName.Find( "red" ) != -1 ) {
////		colorBarIndex = 1;
////	} else if ( this.baseSkinName.Find( "green" ) != -1 ) {
////		colorBarIndex = 2;
////	} else if ( this.baseSkinName.Find( "blue" ) != -1 ) {
////		colorBarIndex = 3;
////	} else if ( this.baseSkinName.Find( "yellow" ) != -1 ) {
////		colorBarIndex = 4;
////	} else {
////		colorBarIndex = 0;
////	}
////	colorBar = colorBarTable[ colorBarIndex ];
////	if ( PowerUpActive( BERSERK ) ) {
////		this.powerUpSkin = declManager.FindSkin( this.baseSkinName.data + "_berserk" );
////	}
////}
////
/////*
////==============
////idPlayer::BalanceTDM
////==============
////*/
////bool idPlayer::BalanceTDM( ) {
////	int			i, balanceTeam, teamCount[2];
////	idEntity	*ent;
////
////	teamCount[ 0 ] = teamCount[ 1 ] = 0;
////	for( i = 0; i < gameLocal.numClients; i++ ) {
////		ent = gameLocal.entities[ i ];
////		if ( ent && ent.IsType( idPlayer::Type ) ) {
////			teamCount[ static_cast< idPlayer * >( ent ).team ]++;
////		}
////	}
////	balanceTeam = -1;
////	if ( teamCount[ 0 ] < teamCount[ 1 ] ) {
////		balanceTeam = 0;
////	} else if ( teamCount[ 0 ] > teamCount[ 1 ] ) {
////		balanceTeam = 1;
////	}
////	if ( balanceTeam != -1 && team != balanceTeam ) {
////		common.DPrintf( "team balance: forcing player %d to %s team\n", this.entityNumber, balanceTeam ? "blue" : "red" );
////		team = balanceTeam;
////		GetUserInfo().Set( "ui_team", team ? "Blue" : "Red" );
////		return true;
////	}
////	return false;
////}
////
/*
==============
idPlayer::UserInfoChanged
==============
*/
	UserInfoChanged ( canModify: boolean ): boolean {
		var userInfo: idDict;
		var modifiedInfo: boolean;
		var spec: boolean;
		var newready: boolean;

		userInfo = this.GetUserInfo ( );
		this.showWeaponViewModel = userInfo.GetBool( "ui_showGun" );

		if ( !gameLocal.isMultiplayer ) {
			return false;
		}
		todoThrow ( );
		//modifiedInfo = false;

		//spec = ( idStr.Icmp( userInfo.GetString( "ui_spectate" ), "Spectate" ) == 0 );
		//if ( gameLocal.serverInfo.GetBool( "si_spectators" ) ) {
		//	// never let spectators go back to game while sudden death is on
		//	if ( canModify && gameLocal.mpGame.GetGameState() == idMultiplayerGame::SUDDENDEATH && !spec && wantSpectate == true ) {
		//		userInfo.Set( "ui_spectate", "Spectate" );
		//		modifiedInfo |= true;
		//	} else {
		//		if ( spec != wantSpectate && !spec ) {
		//			// returning from spectate, set forceRespawn so we don't get stuck in spectate forever
		//			forceRespawn = true;
		//		}
		//		wantSpectate = spec;
		//	}
		//} else {
		//	if ( canModify && spec ) {
		//		userInfo.Set( "ui_spectate", "Play" );
		//		modifiedInfo |= true;
		//	} else if ( spectating ) {  
		//		// allow player to leaving spectator mode if they were in it when si_spectators got turned off
		//		forceRespawn = true;
		//	}
		//	wantSpectate = false;
		//}

		//newready = ( idStr.Icmp( userInfo.GetString( "ui_ready" ), "Ready" ) == 0 );
		//if ( ready != newready && gameLocal.mpGame.GetGameState() == idMultiplayerGame::WARMUP && !wantSpectate ) {
		//	gameLocal.mpGame.AddChatLine( common.GetLanguageDict().GetString( "#str_07180" ), userInfo.GetString( "ui_name" ), newready ? common.GetLanguageDict().GetString( "#str_04300" ) : common.GetLanguageDict().GetString( "#str_04301" ) );
		//}
		//ready = newready;
		//team = ( idStr.Icmp( userInfo.GetString( "ui_team" ), "Blue" ) == 0 );
		//// server maintains TDM balance
		//if ( canModify && gameLocal.gameType == GAME_TDM && !gameLocal.mpGame.IsInGame( this.entityNumber ) && g_balanceTDM.GetBool() ) {
		//	modifiedInfo |= BalanceTDM( );
		//}
		//UpdateSkinSetup( false );

		//isChatting = userInfo.GetBool( "ui_chat", "0" );
		//if ( canModify && isChatting && AI_DEAD ) {
		//	// if dead, always force chat icon off.
		//	isChatting = false;
		//	userInfo.SetBool( "ui_chat", false );
		//	modifiedInfo |= true;
		//}

		return modifiedInfo;
	}

/////*
////===============
////idPlayer::UpdateHudAmmo
////===============
////*/
////void idPlayer::UpdateHudAmmo( idUserInterface *_hud ) {
////	int inclip;
////	int ammoamount;
////
////	assert( this.weapon.GetEntity() );
////	assert( _hud );
////
////	inclip		= this.weapon.GetEntity().AmmoInClip();
////	ammoamount	= this.weapon.GetEntity().AmmoAvailable();
////	if ( ammoamount < 0 || !this.weapon.GetEntity().IsReady() ) {
////		// show infinite ammo
////		_hud.SetStateString( "player_ammo", "" );
////		_hud.SetStateString( "player_totalammo", "" );
////	} else { 
////		// show remaining ammo
////		_hud.SetStateString( "player_totalammo", va( "%i", ammoamount - inclip ) );
////		_hud.SetStateString( "player_ammo", this.weapon.GetEntity().ClipSize() ? va( "%i", inclip ) : "--" );		// how much in the current clip
////		_hud.SetStateString( "player_clips", this.weapon.GetEntity().ClipSize() ? va( "%i", ammoamount / this.weapon.GetEntity().ClipSize() ) : "--" );
////		_hud.SetStateString( "player_allammo", va( "%i/%i", inclip, ammoamount - inclip ) );
////	} 
////
////	_hud.SetStateBool( "player_ammo_empty", ( ammoamount == 0 ) );
////	_hud.SetStateBool( "player_clip_empty", ( this.weapon.GetEntity().ClipSize() ? inclip == 0 : false ) );
////	_hud.SetStateBool( "player_clip_low", ( this.weapon.GetEntity().ClipSize() ? inclip <= this.weapon.GetEntity().LowAmmo() : false ) );
////
////	_hud.HandleNamedEvent( "updateAmmo" );
////}
////
/////*
////===============
////idPlayer::UpdateHudStats
////===============
////*/
////void idPlayer::UpdateHudStats( idUserInterface *_hud ) {
////	int staminapercentage;
////	float max_stamina;
////
////	assert( _hud );
////
////	max_stamina = pm_stamina.GetFloat();
////	if ( !max_stamina ) {
////		// stamina disabled, so show full stamina bar
////		staminapercentage = 100.0f;
////	} else {
////		staminapercentage = idMath::FtoiFast( 100.0f * stamina / max_stamina );
////	}
////
////	_hud.SetStateInt( "player_health", health );
////	_hud.SetStateInt( "player_stamina", staminapercentage );
////	_hud.SetStateInt( "player_armor", this.inventory.armor );
////	_hud.SetStateInt( "player_hr", this.heartRate );
////	_hud.SetStateInt( "player_nostamina", ( max_stamina == 0 ) ? 1 : 0 );
////
////	_hud.HandleNamedEvent( "updateArmorHealthAir" );
////
////	if ( healthPulse ) {
////		_hud.HandleNamedEvent( "healthPulse" );
////		StartSound( "snd_healthpulse", SND_CHANNEL_ITEM, 0, false, NULL );
////		healthPulse = false;
////	}
////
////	if ( healthTake ) {
////		_hud.HandleNamedEvent( "healthPulse" );
////		StartSound( "snd_healthtake", SND_CHANNEL_ITEM, 0, false, NULL );
////		healthTake = false;
////	}
////
////	if ( this.inventory.ammoPulse ) { 
////		_hud.HandleNamedEvent( "ammoPulse" );
////		this.inventory.ammoPulse = false;
////	}
////	if ( this.inventory.weaponPulse ) {
////		// We need to update the weapon hud manually, but not
////		// the armor/ammo/health because they are updated every
////		// frame no matter what
////		UpdateHudWeapon();
////		_hud.HandleNamedEvent( "weaponPulse" );
////		this.inventory.weaponPulse = false;
////	}
////	if ( this.inventory.armorPulse ) { 
////		_hud.HandleNamedEvent( "armorPulse" );
////		this.inventory.armorPulse = false;
////	}
////
////	UpdateHudAmmo( _hud );
////}
////
/////*
////===============
////idPlayer::UpdateHudWeapon
////===============
////*/
////void idPlayer::UpdateHudWeapon( bool flashWeapon ) {
////	idUserInterface *hud = this.hud;
////
////	// if updating the hud of a followed client
////	if ( gameLocal.localClientNum >= 0 && gameLocal.entities[ gameLocal.localClientNum ] && gameLocal.entities[ gameLocal.localClientNum ].IsType( idPlayer::Type ) ) {
////		idPlayer *p = static_cast< idPlayer * >( gameLocal.entities[ gameLocal.localClientNum ] );
////		if ( p.spectating && p.spectator == this.entityNumber ) {
////			assert( p.hud );
////			hud = p.hud;
////		}
////	}
////
////	if ( !hud ) {
////		return;
////	}
////
////	for ( int i = 0; i < MAX_WEAPONS; i++ ) {
////		const char *weapnum = va( "def_weapon%d", i );
////		const char *hudWeap = va( "weapon%d", i );
////		int weapstate = 0;
////		if ( this.inventory.weapons & ( 1 << i ) ) {
////			const char *weap = spawnArgs.GetString( weapnum );
////			if ( weap && *weap ) {
////				weapstate++;
////			}
////			if ( idealWeapon == i ) {
////				weapstate++;
////			}
////		}
////		hud.SetStateInt( hudWeap, weapstate );
////	}
////	if ( flashWeapon ) {
////		hud.HandleNamedEvent( "weaponChange" );
////	}
////}
////
/////*
////===============
////idPlayer::DrawHUD
////===============
////*/
////void idPlayer::DrawHUD( idUserInterface *_hud ) {
////
////	if ( !this.weapon.GetEntity() || influenceActive != INFLUENCE_NONE || privateCameraView || gameLocal.GetCamera() || !_hud || !g_showHud.GetBool() ) {
////		return;
////	}
////
////	UpdateHudStats( _hud );
////
////	_hud.SetStateString( "weapicon", this.weapon.GetEntity().Icon() );
////
////	// FIXME: this is temp to allow the sound meter to show up in the hud
////	// it should be commented out before shipping but the code can remain
////	// for mod developers to enable for the same functionality
////	_hud.SetStateInt( "s_debug", cvarSystem.GetCVarInteger( "s_showLevelMeter" ) );
////
////	this.weapon.GetEntity().UpdateGUI();
////
////	_hud.Redraw( gameLocal.realClientTime );
////
////	// weapon targeting crosshair
////	if ( !GuiActive() ) {
////		if ( cursor && this.weapon.GetEntity().ShowCrosshair() ) {
////			cursor.Redraw( gameLocal.realClientTime );
////		}
////	}
////}
////
/////*
////===============
////idPlayer::EnterCinematic
////===============
////*/
////void idPlayer::EnterCinematic( ) {
////	Hide();
////	StopAudioLog();
////	StopSound( SND_CHANNEL_PDA, false );
////	if ( this.hud ) {
////		this.hud.HandleNamedEvent( "radioChatterDown" );
////	}
////	
////	physicsObj.SetLinearVelocity( vec3_origin );
////	
////	SetState( "EnterCinematic" );
////	UpdateScript();
////
////	if ( weaponEnabled && this.weapon.GetEntity() ) {
////		this.weapon.GetEntity().EnterCinematic();
////	}
////
////	AI_FORWARD		= false;
////	AI_BACKWARD		= false;
////	AI_STRAFE_LEFT	= false;
////	AI_STRAFE_RIGHT	= false;
////	AI_RUN			= false;
////	AI_ATTACK_HELD	= false;
////	AI_WEAPON_FIRED	= false;
////	AI_JUMP			= false;
////	AI_CROUCH		= false;
////	AI_ONGROUND		= true;
////	AI_ONLADDER		= false;
////	AI_DEAD			= ( health <= 0 );
////	AI_RUN			= false;
////	AI_PAIN			= false;
////	AI_HARDLANDING	= false;
////	AI_SOFTLANDING	= false;
////	AI_RELOAD		= false;
////	AI_TELEPORT		= false;
////	AI_TURN_LEFT	= false;
////	AI_TURN_RIGHT	= false;
////}
////
/////*
////===============
////idPlayer::ExitCinematic
////===============
////*/
////void idPlayer::ExitCinematic( ) {
////	Show();
////
////	if ( weaponEnabled && this.weapon.GetEntity() ) {
////		this.weapon.GetEntity().ExitCinematic();
////	}
////
////	SetState( "ExitCinematic" );
////	UpdateScript();
////}
////
/////*
////=====================
////idPlayer::UpdateConditions
////=====================
////*/
////void idPlayer::UpdateConditions( ) {
////	idVec3	velocity;
////	float	fallspeed;
////	float	forwardspeed;
////	float	sidespeed;
////
////	// minus the push velocity to avoid playing the walking animation and sounds when riding a mover
////	velocity = physicsObj.GetLinearVelocity() - physicsObj.GetPushedLinearVelocity();
////	fallspeed = velocity * physicsObj.GetGravityNormal();
////
////	if ( influenceActive ) {
////		AI_FORWARD		= false;
////		AI_BACKWARD		= false;
////		AI_STRAFE_LEFT	= false;
////		AI_STRAFE_RIGHT	= false;
////	} else if ( gameLocal.time - this.lastDmgTime < 500 ) {
////		forwardspeed = velocity * viewAxis[ 0 ];
////		sidespeed = velocity * viewAxis[ 1 ];
////		AI_FORWARD		= AI_ONGROUND && ( forwardspeed > 20.01f );
////		AI_BACKWARD		= AI_ONGROUND && ( forwardspeed < -20.01f );
////		AI_STRAFE_LEFT	= AI_ONGROUND && ( sidespeed > 20.01f );
////		AI_STRAFE_RIGHT	= AI_ONGROUND && ( sidespeed < -20.01f );
////	} else if ( xyspeed > MIN_BOB_SPEED ) {
////		AI_FORWARD		= AI_ONGROUND && ( usercmd.forwardmove > 0 );
////		AI_BACKWARD		= AI_ONGROUND && ( usercmd.forwardmove < 0 );
////		AI_STRAFE_LEFT	= AI_ONGROUND && ( usercmd.rightmove < 0 );
////		AI_STRAFE_RIGHT	= AI_ONGROUND && ( usercmd.rightmove > 0 );
////	} else {
////		AI_FORWARD		= false;
////		AI_BACKWARD		= false;
////		AI_STRAFE_LEFT	= false;
////		AI_STRAFE_RIGHT	= false;
////	}
////
////	AI_RUN			= ( usercmd.buttons & BUTTON_RUN ) && ( ( !pm_stamina.GetFloat() ) || ( stamina > pm_staminathreshold.GetFloat() ) );
////	AI_DEAD			= ( health <= 0 );
////}
////
/////*
////==================
////WeaponFireFeedback
////
////Called when a weapon fires, generates head twitches, etc
////==================
////*/
////void idPlayer::WeaponFireFeedback( const idDict *weaponDef ) {
////	// force a blink
////	blink_time = 0;
////
////	// play the fire animation
////	AI_WEAPON_FIRED = true;
////
////	// update view feedback
////	playerView.WeaponFireFeedback( weaponDef );
////}
////
/////*
////===============
////idPlayer::StopFiring
////===============
////*/
////void idPlayer::StopFiring( ) {
////	AI_ATTACK_HELD	= false;
////	AI_WEAPON_FIRED = false;
////	AI_RELOAD		= false;
////	if ( this.weapon.GetEntity() ) {
////		this.weapon.GetEntity().EndAttack();
////	}
////}
////
/////*
////===============
////idPlayer::FireWeapon
////===============
////*/
////void idPlayer::FireWeapon( ) {
////	idMat3 axis;
////	idVec3 muzzle;
////
////	if ( privateCameraView ) {
////		return;
////	}
////
////	if ( g_editEntityMode.GetInteger() ) {
////		GetViewPos( muzzle, axis );
////		if ( gameLocal.editEntities.SelectEntity( muzzle, axis[0], this ) ) {
////			return;
////		}
////	}
////
////	if ( !hiddenWeapon && this.weapon.GetEntity().IsReady() ) {
////		if ( this.weapon.GetEntity().AmmoInClip() || this.weapon.GetEntity().AmmoAvailable() ) {
////			AI_ATTACK_HELD = true;
////			this.weapon.GetEntity().BeginAttack();
////			if ( ( this.weapon_soulcube >= 0 ) && ( currentWeapon == this.weapon_soulcube ) ) {
////				if ( this.hud ) {
////					this.hud.HandleNamedEvent( "soulCubeNotReady" );
////				}
////				SelectWeapon( previousWeapon, false );
////			}
////		} else {
////			NextBestWeapon();
////		}
////	}
////
////	if ( this.hud ) {
////		if ( tipUp ) {
////			HideTip();
////		}
////		// may want to track with with a bool as well
////		// keep from looking up named events so often
////		if ( objectiveUp ) {
////			HideObjective();
////		}
////	}
////}
////
/////*
////===============
////idPlayer::CacheWeapons
////===============
////*/
////void idPlayer::CacheWeapons( ) {
////	idStr	weap;
////	int		w;
////
////	// check if we have any weapons
////	if ( !this.inventory.weapons ) {
////		return;
////	}
////	
////	for( w = 0; w < MAX_WEAPONS; w++ ) {
////		if ( this.inventory.weapons & ( 1 << w ) ) {
////			weap = spawnArgs.GetString( va( "def_weapon%d", w ) );
////			if ( weap != "" ) {
////				idWeapon::CacheWeapon( weap );
////			} else {
////				this.inventory.weapons &= ~( 1 << w );
////			}
////		}
////	}
////}
////
/////*
////===============
////idPlayer::Give
////===============
////*/
////bool idPlayer::Give( const char *statname, value:string ) {
////	int amount;
////
////	if ( AI_DEAD ) {
////		return false;
////	}
////
////	if ( !idStr.Icmp( statname, "health" ) ) {
////		if ( health >= this.inventory.maxHealth ) {
////			return false;
////		}
////		amount = atoi( value );
////		if ( amount ) {
////			health += amount;
////			if ( health > this.inventory.maxHealth ) {
////				health = this.inventory.maxHealth;
////			}
////			if ( this.hud ) {
////				this.hud.HandleNamedEvent( "healthPulse" );
////			}
////		}
////
////	} else if ( !idStr.Icmp( statname, "stamina" ) ) {
////		if ( stamina >= 100 ) {
////			return false;
////		}
////		stamina += atof( value );
////		if ( stamina > 100 ) {
////			stamina = 100;
////		}
////
////	} else if ( !idStr.Icmp( statname, "heartRate" ) ) {
////		this.heartRate += atoi( value );
////		if ( this.heartRate > MAX_HEARTRATE ) {
////			this.heartRate = MAX_HEARTRATE;
////		}
////
////	} else if ( !idStr.Icmp( statname, "air" ) ) {
////		if ( airTics >= pm_airTics.GetInteger() ) {
////			return false;
////		}
////		airTics += atoi( value ) / 100.0 * pm_airTics.GetInteger();
////		if ( airTics > pm_airTics.GetInteger() ) {
////			airTics = pm_airTics.GetInteger();
////		}
////	} else {
////		return this.inventory.Give( this, spawnArgs, statname, value, &idealWeapon, true );
////	}
////	return true;
////}
////
////
/////*
////===============
////idPlayer::GiveHealthPool
////
////adds health to the player health pool
////===============
////*/
////void idPlayer::GiveHealthPool( float amt ) {
////	
////	if ( AI_DEAD ) {
////		return;
////	}
////
////	if ( health > 0 ) {
////		healthPool += amt;
////		if ( healthPool > this.inventory.maxHealth - health ) {
////			healthPool = this.inventory.maxHealth - health;
////		}
////		nextHealthPulse = gameLocal.time;
////	}
////}
////
/////*
////===============
////idPlayer::GiveItem
////
////Returns false if the item shouldn't be picked up
////===============
////*/
////bool idPlayer::GiveItem( idItem *item ) {
////	var i:number /*int*/;
////	const idKeyValue	*arg;
////	idDict				attr;
////	bool				gave;
////	int					numPickup;
////
////	if ( gameLocal.isMultiplayer && spectating ) {
////		return false;
////	}
////
////	item.GetAttributes( attr );
////	
////	gave = false;
////	numPickup = this.inventory.pickupItemNames.Num();
////	for( i = 0; i < attr.GetNumKeyVals(); i++ ) {
////		arg = attr.GetKeyVal( i );
////		if ( Give( arg.GetKey(), arg.GetValue() ) ) {
////			gave = true;
////		}
////	}
////
////	arg = item.spawnArgs.MatchPrefix( "inv_weapon", NULL );
////	if ( arg && this.hud ) {
////		// We need to update the weapon hud manually, but not
////		// the armor/ammo/health because they are updated every
////		// frame no matter what
////		UpdateHudWeapon( false );
////		this.hud.HandleNamedEvent( "weaponPulse" );
////	}
////
////	// display the pickup feedback on the hud
////	if ( gave && ( numPickup == this.inventory.pickupItemNames.Num() ) ) {
////		this.inventory.AddPickupName( item.spawnArgs.GetString( "inv_name" ), item.spawnArgs.GetString( "inv_icon" ) );
////	}
////
////	return gave;
////}
////
/////*
////===============
////idPlayer::PowerUpModifier
////===============
////*/
////float idPlayer::PowerUpModifier( int type ) {
////	float mod = 1.0f;
////
////	if ( PowerUpActive( BERSERK ) ) {
////		switch( type ) {
////			case SPEED: {
////				mod *= 1.7f;
////				break;
////			}
////			case PROJECTILE_DAMAGE: {
////				mod *= 2.0f;
////				break;
////			}
////			case MELEE_DAMAGE: {
////				mod *= 30.0f;
////				break;
////			}
////			case MELEE_DISTANCE: {
////				mod *= 2.0f;
////				break;
////			}
////		}
////	}
////
////	if ( gameLocal.isMultiplayer && !gameLocal.isClient ) {
////		if ( PowerUpActive( MEGAHEALTH ) ) {
////			if ( healthPool <= 0 ) {
////				GiveHealthPool( 100 );
////			}
////		} else {
////			healthPool = 0;
////		}
////	}
////
////	return mod;
////}
////
/////*
////===============
////idPlayer::PowerUpActive
////===============
////*/
////bool idPlayer::PowerUpActive( int powerup ) const {
////	return ( this.inventory.powerups & ( 1 << powerup ) ) != 0;
////}
////
/////*
////===============
////idPlayer::GivePowerUp
////===============
////*/
////bool idPlayer::GivePowerUp( int powerup, /*int*/time:number ) {
////	const char *sound;
////	const char *skin;
////
////	if ( powerup >= 0 && powerup < MAX_POWERUPS ) {
////
////		if ( gameLocal.isServer ) {
////			idBitMsg	msg;
////			byte		msgBuf[MAX_EVENT_PARAM_SIZE];
////
////			msg.Init( msgBuf, sizeof( msgBuf ) );
////			msg.WriteShort( powerup );
////			msg.WriteBits( 1, 1 );
////			ServerSendEvent( EVENT_POWERUP, &msg, false, -1 );
////		}
////
////		if ( powerup != MEGAHEALTH ) {
////			this.inventory.GivePowerUp( this, powerup, time );
////		}
////
////		const idDeclEntityDef *def = NULL;
////
////		switch( powerup ) {
////			case BERSERK: {
////				if ( spawnArgs.GetString( "snd_berserk_third", "", &sound ) ) {
////					StartSoundShader( declManager.FindSound( sound ), SND_CHANNEL_DEMONIC, 0, false, NULL );
////				}
////				if ( this.baseSkinName.Length() ) {
////					this.powerUpSkin = declManager.FindSkin( this.baseSkinName.data + "_berserk" );
////				}
////				if ( !gameLocal.isClient ) {
////					idealWeapon = 0;
////				}
////				break;
////			}
////			case INVISIBILITY: {
////				spawnArgs.GetString( "skin_invisibility", "", &skin );
////				this.powerUpSkin = declManager.FindSkin( skin );
////				// remove any decals from the model
////				if ( modelDefHandle != -1 ) {
////					gameRenderWorld.RemoveDecals( modelDefHandle );
////				}
////				if ( this.weapon.GetEntity() ) {
////					this.weapon.GetEntity().UpdateSkin();
////				}
////				if ( spawnArgs.GetString( "snd_invisibility", "", &sound ) ) {
////					StartSoundShader( declManager.FindSound( sound ), SND_CHANNEL_ANY, 0, false, NULL );
////				}
////				break;
////			}
////			case ADRENALINE: {
////				stamina = 100.0f;
////				break;
////			 }
////			case MEGAHEALTH: {
////				if ( spawnArgs.GetString( "snd_megahealth", "", &sound ) ) {
////					StartSoundShader( declManager.FindSound( sound ), SND_CHANNEL_ANY, 0, false, NULL );
////				}
////				def = gameLocal.FindEntityDef( "powerup_megahealth", false );
////				if ( def ) {
////					health = def.dict.GetInt( "inv_health" );
////				}
////				break;
////			 }
////		}
////
////		if ( this.hud ) {
////			this.hud.HandleNamedEvent( "itemPickup" );
////		}
////
////		return true;
////	} else {
////		gameLocal.Warning( "Player given power up %i\n which is out of range", powerup );
////	}
////	return false;
////}
////
/////*
////==============
////idPlayer::ClearPowerup
////==============
////*/
////void idPlayer::ClearPowerup( int i ) {
////
////	if ( gameLocal.isServer ) {
////		idBitMsg	msg;
////		byte		msgBuf[MAX_EVENT_PARAM_SIZE];
////
////		msg.Init( msgBuf, sizeof( msgBuf ) );
////		msg.WriteShort( i );
////		msg.WriteBits( 0, 1 );
////		ServerSendEvent( EVENT_POWERUP, &msg, false, -1 );
////	}
////
////	this.powerUpSkin = NULL;
////	this.inventory.powerups &= ~( 1 << i );
////	this.inventory.powerupEndTime[ i ] = 0;
////	switch( i ) {
////		case BERSERK: {
////			StopSound( SND_CHANNEL_DEMONIC, false );
////			break;
////		}
////		case INVISIBILITY: {
////			if ( this.weapon.GetEntity() ) {
////				this.weapon.GetEntity().UpdateSkin();
////			}
////			break;
////		}
////	}
////}
////
/////*
////==============
////idPlayer::UpdatePowerUps
////==============
////*/
////void idPlayer::UpdatePowerUps( ) {
////	var/*int*/i:number;
////
////	if ( !gameLocal.isClient ) {
////		for ( i = 0; i < MAX_POWERUPS; i++ ) {
////			if ( PowerUpActive( i ) && this.inventory.powerupEndTime[i] <= gameLocal.time ) {
////				ClearPowerup( i );
////			}
////		}
////	}
////
////	if ( health > 0 ) {
////		if ( this.powerUpSkin ) {
////			renderEntity.customSkin = this.powerUpSkin;
////		} else {
////			renderEntity.customSkin = skin;
////		}
////	}
////
////	if ( healthPool && gameLocal.time > nextHealthPulse && !AI_DEAD && health > 0 ) {
////		assert( !gameLocal.isClient );	// healthPool never be set on client
////		int amt = ( healthPool > 5 ) ? 5 : healthPool;
////		health += amt;
////		if ( health > this.inventory.maxHealth ) {
////			health = this.inventory.maxHealth;
////			healthPool = 0;
////		} else {
////			healthPool -= amt;
////		}
////		nextHealthPulse = gameLocal.time + HEALTHPULSE_TIME;
////		healthPulse = true;
////	}
////#ifndef ID_DEMO_BUILD
////	if ( !gameLocal.inCinematic && influenceActive == 0 && g_skill.GetInteger() == 3 && gameLocal.time > nextHealthTake && !AI_DEAD && health > g_healthTakeLimit.GetInteger() ) {
////		assert( !gameLocal.isClient );	// healthPool never be set on client
////		health -= g_healthTakeAmt.GetInteger();
////		if ( health < g_healthTakeLimit.GetInteger() ) {
////			health = g_healthTakeLimit.GetInteger();
////		}
////		nextHealthTake = gameLocal.time + g_healthTakeTime.GetInteger() * 1000;
////		healthTake = true;
////	}
////#endif
////}
////
/////*
////===============
////idPlayer::ClearPowerUps
////===============
////*/
////void idPlayer::ClearPowerUps( ) {
////	var/*int*/i:number;
////	for ( i = 0; i < MAX_POWERUPS; i++ ) {
////		if ( PowerUpActive( i ) ) {
////			ClearPowerup( i );
////		}
////	}
////	this.inventory.ClearPowerUps();
////}
////
/////*
////===============
////idPlayer::GiveInventoryItem
////===============
////*/
////bool idPlayer::GiveInventoryItem( idDict *item ) {
////	if ( gameLocal.isMultiplayer && spectating ) {
////		return false;
////	}
////	this.inventory.items.Append( new idDict( *item ) );
////	idItemInfo info;
////	const char* itemName = item.GetString( "inv_name" );
////	if ( idStr::Cmpn( itemName, STRTABLE_ID, STRTABLE_ID_LENGTH ) == 0 ) {
////		info.name = common.GetLanguageDict().GetString( itemName );
////	} else {
////		info.name = itemName;
////	}
////	info.icon = item.GetString( "inv_icon" );
////	this.inventory.pickupItemNames.Append( info );
////	if ( this.hud ) {
////		this.hud.SetStateString( "itemicon", info.icon );
////		this.hud.HandleNamedEvent( "invPickup" );
////	}
////	return true;
////}
////
/////*
////==============
////idPlayer::UpdateObjectiveInfo
////==============
//// */
////void idPlayer::UpdateObjectiveInfo( ) {
////	if ( this.objectiveSystem == NULL ) {
////		return;
////	}
////	this.objectiveSystem.SetStateString( "objective1", "" );
////	this.objectiveSystem.SetStateString( "objective2", "" );
////	this.objectiveSystem.SetStateString( "objective3", "" );
////	for ( int i = 0; i < this.inventory.objectiveNames.Num(); i++ ) {
////		this.objectiveSystem.SetStateString( va( "objective%i", i+1 ), "1" );
////		this.objectiveSystem.SetStateString( va( "objectivetitle%i", i+1 ), this.inventory.objectiveNames[i].title.c_str() );
////		this.objectiveSystem.SetStateString( va( "objectivetext%i", i+1 ), this.inventory.objectiveNames[i].text.c_str() );
////		this.objectiveSystem.SetStateString( va( "objectiveshot%i", i+1 ), this.inventory.objectiveNames[i].screenshot.c_str() );
////	}
////	this.objectiveSystem.StateChanged( gameLocal.time );
////}
////
/////*
////===============
////idPlayer::GiveObjective
////===============
////*/
////void idPlayer::GiveObjective( const char *title, text:string, const char *screenshot ) {
////	idObjectiveInfo info;
////	info.title = title;
////	info.text = text;
////	info.screenshot = screenshot;
////	this.inventory.objectiveNames.Append( info );
////	ShowObjective( "newObjective" );
////	if ( this.hud ) {
////		this.hud.HandleNamedEvent( "newObjective" );
////	}
////}
////
/////*
////===============
////idPlayer::CompleteObjective
////===============
////*/
////void idPlayer::CompleteObjective( const char *title ) {
////	int c = this.inventory.objectiveNames.Num();
////	for ( int i = 0;  i < c; i++ ) {
////		if ( idStr.Icmp(this.inventory.objectiveNames[i].title, title) == 0 ) {
////			this.inventory.objectiveNames.RemoveIndex( i );
////			break;
////		}
////	}
////	ShowObjective( "newObjectiveComplete" );
////
////	if ( this.hud ) {
////		this.hud.HandleNamedEvent( "newObjectiveComplete" );
////	}
////}
////
/////*
////===============
////idPlayer::GiveVideo
////===============
////*/
////void idPlayer::GiveVideo( const char *videoName, idDict *item ) {
////
////	if ( videoName == NULL || *videoName == NULL ) {
////		return;
////	}
////
////	this.inventory.videos.AddUnique( videoName );
////
////	if ( item ) {
////		idItemInfo info;
////		info.name = item.GetString( "inv_name" );
////		info.icon = item.GetString( "inv_icon" );
////		this.inventory.pickupItemNames.Append( info );
////	}
////	if ( this.hud ) {
////		this.hud.HandleNamedEvent( "videoPickup" );
////	}
////}
////
/////*
////===============
////idPlayer::GiveSecurity
////===============
////*/
////void idPlayer::GiveSecurity( const char *security ) {
////	GetPDA().SetSecurity( security );
////	if ( this.hud ) {
////		this.hud.SetStateString( "pda_security", "1" );
////		this.hud.HandleNamedEvent( "securityPickup" );
////	}
////}
////
/////*
////===============
////idPlayer::GiveEmail
////===============
////*/
////void idPlayer::GiveEmail( const char *emailName ) {
////
////	if ( emailName == NULL || *emailName == NULL ) {
////		return;
////	}
////
////	this.inventory.emails.AddUnique( emailName );
////	GetPDA().AddEmail( emailName );
////
////	if ( this.hud ) {
////		this.hud.HandleNamedEvent( "emailPickup" );
////	}
////}
////
/////*
////===============
////idPlayer::GivePDA
////===============
////*/
////void idPlayer::GivePDA( const char *pdaName, idDict *item )
////{
////	if ( gameLocal.isMultiplayer && spectating ) {
////		return;
////	}
////
////	if ( item ) {
////		this.inventory.pdaSecurity.AddUnique( item.GetString( "inv_name" ) );
////	}
////
////	if ( pdaName == NULL || *pdaName == NULL ) {
////		pdaName = "personal";
////	}
////
////	const idDeclPDA *pda = static_cast< const idDeclPDA* >( declManager.FindType( DECL_PDA, pdaName ) );
////
////	this.inventory.pdas.AddUnique( pdaName );
////
////	// Copy any videos over
////	for ( int i = 0; i < pda.GetNumVideos(); i++ ) {
////		const idDeclVideo *video = pda.GetVideoByIndex( i );
////		if ( video ) {
////			this.inventory.videos.AddUnique( video.GetName() );
////		}
////	}
////
////	// This is kind of a hack, but it works nicely
////	// We don't want to display the 'you got a new pda' message during a map load
////	if ( gameLocal.GetFrameNum() > 10 ) {
////		if ( pda && this.hud ) {
////			idStr pdaName = pda.GetPdaName();
////			pdaName.RemoveColors();
////			this.hud.SetStateString( "pda", "1" );
////			this.hud.SetStateString( "pda_text", pdaName );
////			const char *sec = pda.GetSecurity();
////			this.hud.SetStateString( "pda_security", ( sec && *sec ) ? "1" : "0" );
////			this.hud.HandleNamedEvent( "pdaPickup" );
////		}
////
////		if ( this.inventory.pdas.Num() == 1 ) {
////			GetPDA().RemoveAddedEmailsAndVideos();
////			if ( !this.objectiveSystemOpen ) {
////				TogglePDA();
////			}
////			this.objectiveSystem.HandleNamedEvent( "showPDATip" );
////			//ShowTip( spawnArgs.GetString( "text_infoTitle" ), spawnArgs.GetString( "text_firstPDA" ), true );
////		}
////
////		if ( this.inventory.pdas.Num() > 1 && pda.GetNumVideos() > 0 && this.hud ) {
////			this.hud.HandleNamedEvent( "videoPickup" );
////		}
////	}
////}
////
/////*
////===============
////idPlayer::FindInventoryItem
////===============
////*/
////idDict *idPlayer::FindInventoryItem( name:string ) {
////	for ( int i = 0; i < this.inventory.items.Num(); i++ ) {
////		const char *iname = this.inventory.items[i].GetString( "inv_name" );
////		if ( iname && *iname ) {
////			if ( idStr.Icmp( name, iname ) == 0 ) {
////				return this.inventory.items[i];
////			}
////		}
////	}
////	return NULL;
////}
////
/////*
////===============
////idPlayer::RemoveInventoryItem
////===============
////*/
////void idPlayer::RemoveInventoryItem( name:string ) {
////	idDict *item = FindInventoryItem(name);
////	if ( item ) {
////		RemoveInventoryItem( item );
////	}
////}
////
/////*
////===============
////idPlayer::RemoveInventoryItem
////===============
////*/
////void idPlayer::RemoveInventoryItem( idDict *item ) {
////	this.inventory.items.Remove( item );
////	delete item;
////}
////
/////*
////===============
////idPlayer::GiveItem
////===============
////*/
////void idPlayer::GiveItem( const char *itemname ) {
////	idDict args;
////
////	args.Set( "classname", itemname );
////	args.Set( "owner", name.c_str() );
////	gameLocal.SpawnEntityDef( args );
////	if ( this.hud ) {
////		this.hud.HandleNamedEvent( "itemPickup" );
////	}
////}
////
/////*
////==================
////idPlayer::SlotForWeapon
////==================
////*/
////int idPlayer::SlotForWeapon( const char *weaponName ) {
////	var/*int*/i:number;
////
////	for( i = 0; i < MAX_WEAPONS; i++ ) {
////		const char *weap = spawnArgs.GetString( va( "def_weapon%d", i ) );
////		if ( !idStr::Cmp( weap, weaponName ) ) {
////			return i;
////		}
////	}
////
////	// not found
////	return -1;
////}
////
/////*
////===============
////idPlayer::Reload
////===============
////*/
////void idPlayer::Reload( ) {
////	if ( gameLocal.isClient ) {
////		return;
////	}
////
////	if ( spectating || gameLocal.inCinematic || influenceActive ) {
////		return;
////	}
////
////	if ( this.weapon.GetEntity() && this.weapon.GetEntity().IsLinked() ) {
////		this.weapon.GetEntity().Reload();
////	}
////}
////
/////*
////===============
////idPlayer::NextBestWeapon
////===============
////*/
////void idPlayer::NextBestWeapon( ) {
////	const char *weap;
////	int w = MAX_WEAPONS;
////
////	if ( gameLocal.isClient || !weaponEnabled ) {
////		return;
////	}
////
////	while ( w > 0 ) {
////		w--;
////		weap = spawnArgs.GetString( va( "def_weapon%d", w ) );
////		if ( !weap[ 0 ] || ( ( this.inventory.weapons & ( 1 << w ) ) == 0 ) || ( !this.inventory.HasAmmo( weap ) ) ) {
////			continue;
////		}
////		if ( !spawnArgs.GetBool( va( "weapon%d_best", w ) ) ) {
////			continue;
////		}
////		break;
////	}
////	idealWeapon = w;
////	weaponSwitchTime = gameLocal.time + WEAPON_SWITCH_DELAY;
////	UpdateHudWeapon();
////}
////
/////*
////===============
////idPlayer::NextWeapon
////===============
////*/
////void idPlayer::NextWeapon( ) {
////	const char *weap;
////	int w;
////
////	if ( !weaponEnabled || spectating || hiddenWeapon || gameLocal.inCinematic || gameLocal.world.spawnArgs.GetBool( "no_Weapons" ) || health < 0 ) {
////		return;
////	}
////
////	if ( gameLocal.isClient ) {
////		return;
////	}
////
////	// check if we have any weapons
////	if ( !this.inventory.weapons ) {
////		return;
////	}
////	
////	w = idealWeapon;
////	while( true ) {
////		w++;
////		if ( w >= MAX_WEAPONS ) {
////			w = 0;
////		} 
////		weap = spawnArgs.GetString( va( "def_weapon%d", w ) );
////		if ( !spawnArgs.GetBool( va( "weapon%d_cycle", w ) ) ) {
////			continue;
////		}
////		if ( !weap[ 0 ] ) {
////			continue;
////		}
////		if ( ( this.inventory.weapons & ( 1 << w ) ) == 0 ) {
////			continue;
////		}
////		if ( this.inventory.HasAmmo( weap ) ) {
////			break;
////		}
////	}
////
////	if ( ( w != currentWeapon ) && ( w != idealWeapon ) ) {
////		idealWeapon = w;
////		weaponSwitchTime = gameLocal.time + WEAPON_SWITCH_DELAY;
////		UpdateHudWeapon();
////	}
////}
////
/////*
////===============
////idPlayer::PrevWeapon
////===============
////*/
////void idPlayer::PrevWeapon( ) {
////	const char *weap;
////	int w;
////
////	if ( !weaponEnabled || spectating || hiddenWeapon || gameLocal.inCinematic || gameLocal.world.spawnArgs.GetBool( "no_Weapons" ) || health < 0 ) {
////		return;
////	}
////
////	if ( gameLocal.isClient ) {
////		return;
////	}
////
////	// check if we have any weapons
////	if ( !this.inventory.weapons ) {
////		return;
////	}
////
////	w = idealWeapon;
////	while( true ) {
////		w--;
////		if ( w < 0 ) {
////			w = MAX_WEAPONS - 1;
////		}
////		weap = spawnArgs.GetString( va( "def_weapon%d", w ) );
////		if ( !spawnArgs.GetBool( va( "this.weapon%d_cycle", w ) ) ) {
////			continue;
////		}
////		if ( !weap[ 0 ] ) {
////			continue;
////		}
////		if ( ( this.inventory.weapons & ( 1 << w ) ) == 0 ) {
////			continue;
////		}
////		if ( this.inventory.HasAmmo( weap ) ) {
////			break;
////		}
////	}
////
////	if ( ( w != currentWeapon ) && ( w != idealWeapon ) ) {
////		idealWeapon = w;
////		weaponSwitchTime = gameLocal.time + WEAPON_SWITCH_DELAY;
////		UpdateHudWeapon();
////	}
////}
////
/////*
////===============
////idPlayer::SelectWeapon
////===============
////*/
////void idPlayer::SelectWeapon( int num, bool force ) {
////	const char *weap;
////
////	if ( !weaponEnabled || spectating || gameLocal.inCinematic || health < 0 ) {
////		return;
////	}
////
////	if ( ( num < 0 ) || ( num >= MAX_WEAPONS ) ) {
////		return;
////	}
////
////	if ( gameLocal.isClient ) {
////		return;
////	}
////
////	if ( ( num != this.weapon_pda ) && gameLocal.world.spawnArgs.GetBool( "no_Weapons" ) ) {
////		num = this.weapon_fists;
////		hiddenWeapon ^= 1;
////		if ( hiddenWeapon && this.weapon.GetEntity() ) {
////			this.weapon.GetEntity().LowerWeapon();
////		} else {
////			this.weapon.GetEntity().RaiseWeapon();
////		}
////	}	
////
////	weap = spawnArgs.GetString( va( "def_weapon%d", num ) );
////	if ( !weap[ 0 ] ) {
////		gameLocal.Printf( "Invalid weapon\n" );
////		return;
////	}
////
////	if ( force || ( this.inventory.weapons & ( 1 << num ) ) ) {
////		if ( !this.inventory.HasAmmo( weap ) && !spawnArgs.GetBool( va( "weapon%d_allowempty", num ) ) ) {
////			return;
////		}
////		if ( ( previousWeapon >= 0 ) && ( idealWeapon == num ) && ( spawnArgs.GetBool( va( "weapon%d_toggle", num ) ) ) ) {
////			weap = spawnArgs.GetString( va( "def_weapon%d", previousWeapon ) );
////			if ( !this.inventory.HasAmmo( weap ) && !spawnArgs.GetBool( va( "weapon%d_allowempty", previousWeapon ) ) ) {
////				return;
////			}
////			idealWeapon = previousWeapon;
////		} else if ( ( this.weapon_pda >= 0 ) && ( num == this.weapon_pda ) && ( this.inventory.pdas.Num() == 0 ) ) {
////			ShowTip( spawnArgs.GetString( "text_infoTitle" ), spawnArgs.GetString( "text_noPDA" ), true );
////			return;
////		} else {
////			idealWeapon = num;
////		}
////		UpdateHudWeapon();
////	}
////}
////
/////*
////=================
////idPlayer::DropWeapon
////=================
////*/
////void idPlayer::DropWeapon( bool died ) {
////	idVec3 forward, up;
////	int inclip, ammoavailable;
////
////	assert( !gameLocal.isClient );
////	
////	if ( spectating || weaponGone || this.weapon.GetEntity() == NULL ) {
////		return;
////	}
////	
////	if ( ( !died && !this.weapon.GetEntity().IsReady() ) || this.weapon.GetEntity().IsReloading() ) {
////		return;
////	}
////	// ammoavailable is how many shots we can fire
////	// inclip is which amount is in clip right now
////	ammoavailable = this.weapon.GetEntity().AmmoAvailable();
////	inclip = this.weapon.GetEntity().AmmoInClip();
////	
////	// don't drop a grenade if we have none left
////	if ( !idStr.Icmp( idWeapon::GetAmmoNameForNum( this.weapon.GetEntity().GetAmmoType() ), "ammo_grenades" ) && ( ammoavailable - inclip <= 0 ) ) {
////		return;
////	}
////
////	// expect an ammo setup that makes sense before doing any dropping
////	// ammoavailable is -1 for infinite ammo, and weapons like chainsaw
////	// a bad ammo config usually indicates a bad weapon state, so we should not drop
////	// used to be an assertion check, but it still happens in edge cases
////	if ( ( ammoavailable != -1 ) && ( ammoavailable - inclip < 0 ) ) {
////		common.DPrintf( "idPlayer::DropWeapon: bad ammo setup\n" );
////		return;
////	}
////	idEntity *item = NULL;
////	if ( died ) {
////		// ain't gonna throw you no weapon if I'm dead
////		item = this.weapon.GetEntity().DropItem( vec3_origin, 0, WEAPON_DROP_TIME, died );
////	} else {
////		this.viewAngles.ToVectors( &forward, NULL, &up );
////		item = this.weapon.GetEntity().DropItem( 250.0f * forward + 150.0f * up, 500, WEAPON_DROP_TIME, died );
////	}
////	if ( !item ) {
////		return;
////	}
////	// set the appropriate ammo in the dropped object
////	const idKeyValue * keyval = item.spawnArgs.MatchPrefix( "inv_ammo_" );
////	if ( keyval ) {
////		item.spawnArgs.SetInt( keyval.GetKey(), ammoavailable );
////		idStr inclipKey = keyval.GetKey();
////		inclipKey.Insert( "inclip_", 4 );
////		item.spawnArgs.SetInt( inclipKey, inclip );
////	}
////	if ( !died ) {
////		// remove from our local this.inventory completely
////		this.inventory.Drop( spawnArgs, item.spawnArgs.GetString( "inv_weapon" ), -1 );
////		this.weapon.GetEntity().ResetAmmoClip();
////		NextWeapon();
////		this.weapon.GetEntity().WeaponStolen();
////		weaponGone = true;
////	}
////}
////
/////*
////=================
////idPlayer::StealWeapon
////steal the target player's current weapon
////=================
////*/
////void idPlayer::StealWeapon( idPlayer *player ) {
////	assert( !gameLocal.isClient );
////
////	// make sure there's something to steal
////	idWeapon *player_weapon = static_cast< idWeapon * >( player.weapon.GetEntity() );
////	if ( !player_weapon || !player_weapon.CanDrop() || weaponGone ) {
////		return;
////	}
////	// steal - we need to effectively force the other player to abandon his weapon
////	int newweap = player.currentWeapon;
////	if ( newweap == -1 ) {
////		return;
////	}
////	// might be just dropped - check this.inventory
////	if ( ! ( player.this.inventory.weapons & ( 1 << newweap ) ) ) {
////		return;
////	}
////	const char *weapon_classname = spawnArgs.GetString( va( "def_weapon%d", newweap ) );
////	assert( weapon_classname );
////	int ammoavailable = player.weapon.GetEntity().AmmoAvailable();
////	int inclip = player.weapon.GetEntity().AmmoInClip();
////	if ( ( ammoavailable != -1 ) && ( ammoavailable - inclip < 0 ) ) {
////		// see DropWeapon
////		common.DPrintf( "idPlayer::StealWeapon: bad ammo setup\n" );
////		// we still steal the weapon, so let's use the default ammo levels
////		inclip = -1;
////		const idDeclEntityDef *decl = gameLocal.FindEntityDef( weapon_classname );
////		assert( decl );
////		const idKeyValue *keypair = decl.dict.MatchPrefix( "inv_ammo_" );
////		assert( keypair );
////		ammoavailable = atoi( keypair.GetValue() );
////	}
////
////	player.weapon.GetEntity().WeaponStolen();
////	player.this.inventory.Drop( player.spawnArgs, NULL, newweap );
////	player.SelectWeapon( this.weapon_fists, false );
////	// in case the robbed player is firing rounds with a continuous fire weapon like the chaingun/plasma etc.
////	// this will ensure the firing actually stops
////	player.weaponGone = true;
////
////	// give weapon, setup the ammo count
////	Give( "weapon", weapon_classname );
////	ammo_t ammo_i = player.this.inventory.AmmoIndexForWeaponClass( weapon_classname, NULL );
////	idealWeapon = newweap;
////	this.inventory.ammo[ ammo_i ] += ammoavailable;
////	this.inventory.clip[ newweap ] = inclip;
////}
////
/////*
////===============
////idPlayer::ActiveGui
////===============
////*/
////idUserInterface *idPlayer::ActiveGui( ) {
////	if ( this.objectiveSystemOpen ) {
////		return this.objectiveSystem;
////	}
////
////	return focusUI;
////}
////
/////*
////===============
////idPlayer::Weapon_Combat
////===============
////*/
////void idPlayer::Weapon_Combat( ) {
////	if ( influenceActive || !weaponEnabled || gameLocal.inCinematic || privateCameraView ) {
////		return;
////	}
////
////	this.weapon.GetEntity().RaiseWeapon();
////	if ( this.weapon.GetEntity().IsReloading() ) {
////		if ( !AI_RELOAD ) {
////			AI_RELOAD = true;
////			SetState( "ReloadWeapon" );
////			UpdateScript();
////		}
////	} else {
////		AI_RELOAD = false;
////	}
////
////	if ( idealWeapon == this.weapon_soulcube && soulCubeProjectile.GetEntity() != NULL ) {
////		idealWeapon = currentWeapon;
////	}
////
////	if ( idealWeapon != currentWeapon ) {
////		if ( weaponCatchup ) {
////			assert( gameLocal.isClient );
////
////			currentWeapon = idealWeapon;
////			weaponGone = false;
////			animPrefix = spawnArgs.GetString( va( "def_weapon%d", currentWeapon ) );
////			this.weapon.GetEntity().GetWeaponDef( animPrefix, this.inventory.clip[ currentWeapon ] );
////			animPrefix.Strip( "weapon_" );
////
////			this.weapon.GetEntity().NetCatchup();
////			const function_t *newstate = GetScriptFunction( "NetCatchup" );
////			if ( newstate ) {
////				SetState( newstate );
////				UpdateScript();
////			}
////			weaponCatchup = false;			
////		} else {
////			if ( this.weapon.GetEntity().IsReady() ) {
////				this.weapon.GetEntity().PutAway();
////			}
////
////			if ( this.weapon.GetEntity().IsHolstered() ) {
////				assert( idealWeapon >= 0 );
////				assert( idealWeapon < MAX_WEAPONS );
////
////				if ( currentWeapon != this.weapon_pda && !spawnArgs.GetBool( va( "weapon%d_toggle", currentWeapon ) ) ) {
////					previousWeapon = currentWeapon;
////				}
////				currentWeapon = idealWeapon;
////				weaponGone = false;
////				animPrefix = spawnArgs.GetString( va( "def_weapon%d", currentWeapon ) );
////				this.weapon.GetEntity().GetWeaponDef( animPrefix, this.inventory.clip[ currentWeapon ] );
////				animPrefix.Strip( "weapon_" );
////
////				this.weapon.GetEntity().Raise();
////			}
////		}
////	} else {
////		weaponGone = false;	// if you drop and re-get weap, you may miss the = false above 
////		if ( this.weapon.GetEntity().IsHolstered() ) {
////			if ( !this.weapon.GetEntity().AmmoAvailable() ) {
////				// weapons can switch automatically if they have no more ammo
////				NextBestWeapon();
////			} else {
////				this.weapon.GetEntity().Raise();
////				state = GetScriptFunction( "RaiseWeapon" );
////				if ( state ) {
////					SetState( state );
////				}
////			}
////		}
////	}
////
////	// check for attack
////	AI_WEAPON_FIRED = false;
////	if ( !influenceActive ) {
////		if ( ( usercmd.buttons & BUTTON_ATTACK ) && !weaponGone ) {
////			FireWeapon();
////		} else if ( this.oldButtons & BUTTON_ATTACK ) {
////			AI_ATTACK_HELD = false;
////			this.weapon.GetEntity().EndAttack();
////		}
////	}
////
////	// update our ammo clip in our this.inventory
////	if ( ( currentWeapon >= 0 ) && ( currentWeapon < MAX_WEAPONS ) ) {
////		this.inventory.clip[ currentWeapon ] = this.weapon.GetEntity().AmmoInClip();
////		if ( this.hud && ( currentWeapon == idealWeapon ) ) {
////			UpdateHudAmmo( this.hud );
////		}
////	}
////}
////
/////*
////===============
////idPlayer::Weapon_NPC
////===============
////*/
////void idPlayer::Weapon_NPC( ) {
////	if ( idealWeapon != currentWeapon ) {
////		Weapon_Combat();
////	}
////	StopFiring();
////	this.weapon.GetEntity().LowerWeapon();
////
////	if ( ( usercmd.buttons & BUTTON_ATTACK ) && !( this.oldButtons & BUTTON_ATTACK ) ) {
////		this.buttonMask |= BUTTON_ATTACK;
////		focusCharacter.TalkTo( this );
////	}
////}
////
/////*
////===============
////idPlayer::LowerWeapon
////===============
////*/
////void idPlayer::LowerWeapon( ) {
////	if ( this.weapon.GetEntity() && !this.weapon.GetEntity().IsHidden() ) {
////		this.weapon.GetEntity().LowerWeapon();
////	}
////}
////
/////*
////===============
////idPlayer::RaiseWeapon
////===============
////*/
////void idPlayer::RaiseWeapon( ) {
////	if ( this.weapon.GetEntity() && this.weapon.GetEntity().IsHidden() ) {
////		this.weapon.GetEntity().RaiseWeapon();
////	}
////}
////
/////*
////===============
////idPlayer::WeaponLoweringCallback
////===============
////*/
////void idPlayer::WeaponLoweringCallback( ) {
////	SetState( "LowerWeapon" );
////	UpdateScript();
////}
////
/////*
////===============
////idPlayer::WeaponRisingCallback
////===============
////*/
////void idPlayer::WeaponRisingCallback( ) {
////	SetState( "RaiseWeapon" );
////	UpdateScript();
////}
////
/////*
////===============
////idPlayer::Weapon_GUI
////===============
////*/
////void idPlayer::Weapon_GUI( ) {
////
////	if ( !this.objectiveSystemOpen ) {
////		if ( idealWeapon != currentWeapon ) {
////			Weapon_Combat();
////		}
////		StopFiring();
////		this.weapon.GetEntity().LowerWeapon();
////	}
////
////	// disable click prediction for the GUIs. handy to check the state sync does the right thing
////	if ( gameLocal.isClient && !net_clientPredictGUI.GetBool() ) {
////		return;
////	}
////
////	if ( ( this.oldButtons ^ usercmd.buttons ) & BUTTON_ATTACK ) {
////		sysEvent_t ev;
////		const char *command = NULL;
////		bool updateVisuals = false;
////
////		idUserInterface *ui = ActiveGui();
////		if ( ui ) {
////			ev = sys.GenerateMouseButtonEvent( 1, ( usercmd.buttons & BUTTON_ATTACK ) != 0 );
////			command = ui.HandleEvent( &ev, gameLocal.time, &updateVisuals );
////			if ( updateVisuals && focusGUIent && ui == focusUI ) {
////				focusGUIent.UpdateVisuals();
////			}
////		}
////		if ( gameLocal.isClient ) {
////			// we predict enough, but don't want to execute commands
////			return;
////		}
////		if ( focusGUIent ) {
////			HandleGuiCommands( focusGUIent, command );
////		} else {
////			HandleGuiCommands( this, command );
////		}
////	}
////}
////
/////*
////===============
////idPlayer::UpdateWeapon
////===============
////*/
////void idPlayer::UpdateWeapon( ) {
////	if ( health <= 0 ) {
////		return;
////	}
////
////	assert( !spectating );
////
////	if ( gameLocal.isClient ) {
////		// clients need to wait till the weapon and it's world model entity
////		// are present and synchronized ( weapon.worldModel idEntityPtr to idAnimatedEntity )
////		if ( !this.weapon.GetEntity().IsWorldModelReady() ) {
////			return;
////		}
////	}
////
////	// always make sure the weapon is correctly setup before accessing it
////	if ( !this.weapon.GetEntity().IsLinked() ) {
////		if ( idealWeapon != -1 ) {
////			animPrefix = spawnArgs.GetString( va( "def_weapon%d", idealWeapon ) );
////			this.weapon.GetEntity().GetWeaponDef( animPrefix, this.inventory.clip[ idealWeapon ] );
////			assert( this.weapon.GetEntity().IsLinked() );
////		} else {
////			return;
////		}
////	}
////
////	if ( hiddenWeapon && tipUp && usercmd.buttons & BUTTON_ATTACK ) {
////		HideTip();
////	}
////	
////	if ( g_dragEntity.GetBool() ) {
////		StopFiring();
////		this.weapon.GetEntity().LowerWeapon();
////		dragEntity.Update( this );
////	} else if ( ActiveGui() ) {
////		// gui handling overrides weapon use
////		Weapon_GUI();
////	} else 	if ( focusCharacter && ( focusCharacter.health > 0 ) ) {
////		Weapon_NPC();
////	} else {
////		Weapon_Combat();
////	}
////	
////	if ( hiddenWeapon ) {
////		this.weapon.GetEntity().LowerWeapon();
////	}
////
////	// update weapon state, particles, dlights, etc
////	this.weapon.GetEntity().PresentWeapon( this.showWeaponViewModel );
////}
////
/////*
////===============
////idPlayer::SpectateFreeFly
////===============
////*/
////void idPlayer::SpectateFreeFly( bool force ) {
////	idPlayer	*player;
////	idVec3		newOrig;
////	idVec3		spawn_origin;
////	idAngles	spawn_angles;
////
////	player = gameLocal.GetClientByNum( spectator );
////	if ( force || gameLocal.time > lastSpectateChange ) {
////		spectator = this.entityNumber;
////		if ( player && player != this && !player.spectating && !player.IsInTeleport() ) {
////			newOrig = player.GetPhysics().GetOrigin();
////			if ( player.physicsObj.IsCrouching() ) {
////				newOrig[ 2 ] += pm_crouchviewheight.GetFloat();
////			} else {
////				newOrig[ 2 ] += pm_normalviewheight.GetFloat();
////			}
////			newOrig[ 2 ] += SPECTATE_RAISE;
////			idBounds b = idBounds( vec3_origin ).Expand( pm_spectatebbox.GetFloat() * 0.5f );
////			idVec3 start = player.GetPhysics().GetOrigin();
////			start[2] += pm_spectatebbox.GetFloat() * 0.5f;
////			trace_t t;
////			// assuming spectate bbox is inside stand or crouch box
////			gameLocal.clip.TraceBounds( t, start, newOrig, b, MASK_PLAYERSOLID, player );
////			newOrig.Lerp( start, newOrig, t.fraction );
////			SetOrigin( newOrig );
////			idAngles angle = player.viewAngles;
////			angle[ 2 ] = 0;
////			SetViewAngles( angle );
////		} else {	
////			SelectInitialSpawnPoint( spawn_origin, spawn_angles );
////			spawn_origin[ 2 ] += pm_normalviewheight.GetFloat();
////			spawn_origin[ 2 ] += SPECTATE_RAISE;
////			SetOrigin( spawn_origin );
////			SetViewAngles( spawn_angles );
////		}
////		lastSpectateChange = gameLocal.time + 500;
////	}
////}
////
/////*
////===============
////idPlayer::SpectateCycle
////===============
////*/
////void idPlayer::SpectateCycle( ) {
////	idPlayer *player;
////
////	if ( gameLocal.time > lastSpectateChange ) {
////		int latchedSpectator = spectator;
////		spectator = gameLocal.GetNextClientNum( spectator );
////		player = gameLocal.GetClientByNum( spectator );
////		assert( player ); // never call here when the current spectator is wrong
////		// ignore other spectators
////		while ( latchedSpectator != spectator && player.spectating ) {
////			spectator = gameLocal.GetNextClientNum( spectator );
////			player = gameLocal.GetClientByNum( spectator );
////		}
////		lastSpectateChange = gameLocal.time + 500;
////	}
////}
////
/////*
////===============
////idPlayer::UpdateSpectating
////===============
////*/
////void idPlayer::UpdateSpectating( ) {
////	assert( spectating );
////	assert( !gameLocal.isClient );
////	assert( IsHidden() );
////	idPlayer *player;
////	if ( !gameLocal.isMultiplayer ) {
////		return;
////	}
////	player = gameLocal.GetClientByNum( spectator );
////	if ( !player || ( player.spectating && player != this ) ) {
////		SpectateFreeFly( true );
////	} else if ( usercmd.upmove > 0 ) {
////		SpectateFreeFly( false );
////	} else if ( usercmd.buttons & BUTTON_ATTACK ) {
////		SpectateCycle();
////	}
////}
////
/////*
////===============
////idPlayer::HandleSingleGuiCommand
////===============
////*/
////bool idPlayer::HandleSingleGuiCommand( idEntity *entityGui, idLexer *src ) {
////	idToken token;
////
////	if ( !src.ReadToken( &token ) ) {
////		return false;
////	}
////
////	if ( token == ";" ) {
////		return false;
////	}
////
////	if ( token.Icmp( "addhealth" ) == 0 ) {
////		if ( entityGui && health < 100 ) {
////			int _health = entityGui.spawnArgs.GetInt( "gui_parm1" );
////			int amt = ( _health >= HEALTH_PER_DOSE ) ? HEALTH_PER_DOSE : _health;
////			_health -= amt;
////			entityGui.spawnArgs.SetInt( "gui_parm1", _health );
////			if ( entityGui.GetRenderEntity() && entityGui.GetRenderEntity().gui[ 0 ] ) {
////				entityGui.GetRenderEntity().gui[ 0 ].SetStateInt( "gui_parm1", _health );
////			}
////			health += amt;
////			if ( health > 100 ) {
////				health = 100;
////			}
////		}
////		return true;
////	}
////
////	if ( token.Icmp( "ready" ) == 0 ) {
////		PerformImpulse( IMPULSE_17 );
////		return true;
////	}
////
////	if ( token.Icmp( "updatepda" ) == 0 ) {
////		UpdatePDAInfo( true );
////		return true;
////	}
////
////	if ( token.Icmp( "updatepda2" ) == 0 ) {
////		UpdatePDAInfo( false );
////		return true;
////	}
////
////	if ( token.Icmp( "stoppdavideo" ) == 0 ) {
////		if ( this.objectiveSystem && this.objectiveSystemOpen && pdaVideoWave.Length() > 0 ) {
////			StopSound( SND_CHANNEL_PDA, false );
////		}
////		return true;
////	}
////
////	if ( token.Icmp( "close" ) == 0 ) {
////		if ( this.objectiveSystem && this.objectiveSystemOpen ) {
////			TogglePDA();
////		}
////	}
////
////	if ( token.Icmp( "playpdavideo" ) == 0 ) {
////		if ( this.objectiveSystem && this.objectiveSystemOpen && pdaVideo.Length() > 0 ) {
////			const idMaterial *mat = declManager.FindMaterial( pdaVideo );
////			if ( mat ) {
////				int c = mat.GetNumStages();
////				for ( int i = 0; i < c; i++ ) {
////					const shaderStage_t *stage = mat.GetStage(i);
////					if ( stage && stage.texture.cinematic ) {
////						stage.texture.cinematic.ResetTime( gameLocal.time );
////					}
////				}
////				if ( pdaVideoWave.Length() ) {
////					const idSoundShader *shader = declManager.FindSound( pdaVideoWave );
////					StartSoundShader( shader, SND_CHANNEL_PDA, 0, false, NULL );
////				}
////			}
////		}
////	}
////
////	if ( token.Icmp( "playpdaaudio" ) == 0 ) {
////		if ( this.objectiveSystem && this.objectiveSystemOpen && pdaAudio.Length() > 0 ) {
////			const idSoundShader *shader = declManager.FindSound( pdaAudio );
////			int ms;
////			StartSoundShader( shader, SND_CHANNEL_PDA, 0, false, &ms );
////			StartAudioLog();
////			CancelEvents( &EV_Player_StopAudioLog );
////			PostEventMS( &EV_Player_StopAudioLog, ms + 150 );
////		}
////		return true;
////	}
////
////	if ( token.Icmp( "stoppdaaudio" ) == 0 ) {
////		if ( this.objectiveSystem && this.objectiveSystemOpen && pdaAudio.Length() > 0 ) {
////			// idSoundShader *shader = declManager.FindSound( pdaAudio );
////			StopAudioLog();
////			StopSound( SND_CHANNEL_PDA, false );
////		}
////		return true;
////	}
////
////	src.UnreadToken( &token );
////	return false;
////}
////
/////*
////==============
////idPlayer::Collide
////==============
////*/
////bool idPlayer::Collide( const trace_t &collision, const idVec3 &velocity ) {
////	other:idEntity;
////
////	if ( gameLocal.isClient ) {
////		return false;
////	}
////
////	other = gameLocal.entities[ collision.c.entityNum ];
////	if ( other ) {
////		other.Signal( SIG_TOUCH );
////		if ( !spectating ) {
////			if ( other.RespondsTo( EV_Touch ) ) {
////				other.ProcessEvent( &EV_Touch, this, &collision );
////			}
////		} else {
////			if ( other.RespondsTo( EV_SpectatorTouch ) ) {
////				other.ProcessEvent( &EV_SpectatorTouch, this, &collision );
////			}
////		}
////	}
////	return false;
////}
////
////
/////*
////================
////idPlayer::UpdateLocation
////
////Searches nearby locations 
////================
////*/
////void idPlayer::UpdateLocation( ) {
////	if ( this.hud ) {
////		idLocationEntity *locationEntity = gameLocal.LocationForPoint( GetEyePosition() );
////		if ( locationEntity ) {
////			this.hud.SetStateString( "location", locationEntity.GetLocation() );
////		} else {
////			this.hud.SetStateString( "location", common.GetLanguageDict().GetString( "#str_02911" ) );
////		}
////	}
////}
////
/////*
////================
////idPlayer::ClearFocus
////
////Clears the focus cursor
////================
////*/
////void idPlayer::ClearFocus( ) {
////	focusCharacter	= NULL;
////	focusGUIent		= NULL;
////	focusUI			= NULL;
////	focusVehicle	= NULL;
////	talkCursor		= 0;
////}
////
/////*
////================
////idPlayer::UpdateFocus
////
////Searches nearby entities for interactive guis, possibly making one of them
////the focus and sending it a mouse move event
////================
////*/
////void idPlayer::UpdateFocus( ) {
////	idClipModel *clipModelList[ MAX_GENTITIES ];
////	idClipModel *clip;
////	int			listedClipModels;
////	idEntity	*oldFocus;
////	idEntity	*ent;
////	idUserInterface *oldUI;
////	idAI		*oldChar;
////	int			oldTalkCursor;
////	idAFEntity_Vehicle *oldVehicle;
////	int			i, j;
////	idVec3		start, end;
////	bool		allowFocus;
////	const char *command;
////	trace_t		trace;
////	guiPoint_t	pt;
////	const idKeyValue *kv;
////	sysEvent_t	ev;
////	idUserInterface *ui;
////
////	if ( gameLocal.inCinematic ) {
////		return;
////	}
////
////	// only update the focus character when attack button isn't pressed so players
////	// can still chainsaw NPC's
////	if ( gameLocal.isMultiplayer || ( !focusCharacter && ( usercmd.buttons & BUTTON_ATTACK ) ) ) {
////		allowFocus = false;
////	} else {
////		allowFocus = true;
////	}
////
////	oldFocus		= focusGUIent;
////	oldUI			= focusUI;
////	oldChar			= focusCharacter;
////	oldTalkCursor	= talkCursor;
////	oldVehicle		= focusVehicle;
////
////	if ( focusTime <= gameLocal.time ) {
////		ClearFocus();
////	}
////
////	// don't let spectators interact with GUIs
////	if ( spectating ) {
////		return;
////	}
////
////	start = GetEyePosition();
////	end = start + this.viewAngles.ToForward() * 80.0f;
////
////	// player identification . names to the hud
////	if ( gameLocal.isMultiplayer && this.entityNumber == gameLocal.localClientNum ) {
////		idVec3 end = start + this.viewAngles.ToForward() * 768.0f;
////		gameLocal.clip.TracePoint( trace, start, end, MASK_SHOT_BOUNDINGBOX, this );
////		int iclient = -1;
////		if ( ( trace.fraction < 1.0f ) && ( trace.c.entityNum < MAX_CLIENTS ) ) {
////			iclient = trace.c.entityNum;
////		}
////		if ( MPAim != iclient ) {
////			lastMPAim = MPAim;
////			MPAim = iclient;
////			lastMPAimTime = gameLocal.realClientTime;
////		}
////	}
////
////	idBounds bounds( start );
////	bounds.AddPoint( end );
////
////	listedClipModels = gameLocal.clip.ClipModelsTouchingBounds( bounds, -1, clipModelList, MAX_GENTITIES );
////
////	// no pretense at sorting here, just assume that there will only be one active
////	// gui within range along the trace
////	for ( i = 0; i < listedClipModels; i++ ) {
////		clip = clipModelList[ i ];
////		ent = clip.GetEntity();
////
////		if ( ent.IsHidden() ) {
////			continue;
////		}
////
////		if ( allowFocus ) {
////			if ( ent.IsType( idAFAttachment::Type ) ) {
////				idEntity *body = static_cast<idAFAttachment *>( ent ).GetBody();
////				if ( body && body.IsType( idAI::Type ) && ( static_cast<idAI *>( body ).GetTalkState() >= TALK_OK ) ) {
////					gameLocal.clip.TracePoint( trace, start, end, MASK_SHOT_RENDERMODEL, this );
////					if ( ( trace.fraction < 1.0f ) && ( trace.c.entityNum == ent.entityNumber ) ) {
////						ClearFocus();
////						focusCharacter = static_cast<idAI *>( body );
////						talkCursor = 1;
////						focusTime = gameLocal.time + FOCUS_TIME;
////						break;
////					}
////				}
////				continue;
////			}
////
////			if ( ent.IsType( idAI::Type ) ) {
////				if ( static_cast<idAI *>( ent ).GetTalkState() >= TALK_OK ) {
////					gameLocal.clip.TracePoint( trace, start, end, MASK_SHOT_RENDERMODEL, this );
////					if ( ( trace.fraction < 1.0f ) && ( trace.c.entityNum == ent.entityNumber ) ) {
////						ClearFocus();
////						focusCharacter = static_cast<idAI *>( ent );
////						talkCursor = 1;
////						focusTime = gameLocal.time + FOCUS_TIME;
////						break;
////					}
////				}
////				continue;
////			}
////
////			if ( ent.IsType( idAFEntity_Vehicle::Type ) ) {
////				gameLocal.clip.TracePoint( trace, start, end, MASK_SHOT_RENDERMODEL, this );
////				if ( ( trace.fraction < 1.0f ) && ( trace.c.entityNum == ent.entityNumber ) ) {
////					ClearFocus();
////					focusVehicle = static_cast<idAFEntity_Vehicle *>( ent );
////					focusTime = gameLocal.time + FOCUS_TIME;
////					break;
////				}
////				continue;
////			}
////		}
////
////		if ( !ent.GetRenderEntity() || !ent.GetRenderEntity().gui[ 0 ] || !ent.GetRenderEntity().gui[ 0 ].IsInteractive() ) {
////			continue;
////		}
////
////		if ( ent.spawnArgs.GetBool( "inv_item" ) ) {
////			// don't allow guis on pickup items focus
////			continue;
////		}
////
////		pt = gameRenderWorld.GuiTrace( ent.GetModelDefHandle(), start, end );
////		if ( pt.x != -1 ) {
////			// we have a hit
////			renderEntity_t *focusGUIrenderEntity = ent.GetRenderEntity();
////			if ( !focusGUIrenderEntity ) {
////				continue;
////			}
////
////			if ( pt.guiId == 1 ) {
////				ui = focusGUIrenderEntity.gui[ 0 ];
////			} else if ( pt.guiId == 2 ) {
////				ui = focusGUIrenderEntity.gui[ 1 ];
////			} else {
////				ui = focusGUIrenderEntity.gui[ 2 ];
////			}
////			
////			if ( ui == NULL ) {
////				continue;
////			}
////
////			ClearFocus();
////			focusGUIent = ent;
////			focusUI = ui;
////
////			if ( oldFocus != ent ) {
////				// new activation
////				// going to see if we have anything in inventory a gui might be interested in
////				// need to enumerate inventory items
////				focusUI.SetStateInt( "inv_count", this.inventory.items.Num() );
////				for ( j = 0; j < this.inventory.items.Num(); j++ ) {
////					idDict *item = this.inventory.items[ j ];
////					const char *iname = item.GetString( "inv_name" );
////					const char *iicon = item.GetString( "inv_icon" );
////					const char *itext = item.GetString( "inv_text" );
////
////					focusUI.SetStateString( va( "inv_name_%i", j), iname );
////					focusUI.SetStateString( va( "inv_icon_%i", j), iicon );
////					focusUI.SetStateString( va( "inv_text_%i", j), itext );
////					kv = item.MatchPrefix("inv_id", NULL);
////					if ( kv ) {
////						focusUI.SetStateString( va( "inv_id_%i", j ), kv.GetValue() );
////					}
////					focusUI.SetStateInt( iname, 1 );
////				}
////
////
////				for( j = 0; j < this.inventory.pdaSecurity.Num(); j++ ) {
////					const char *p = this.inventory.pdaSecurity[ j ];
////					if ( p && *p ) {
////						focusUI.SetStateInt( p, 1 );
////					}
////				}
////
////				int staminapercentage = ( int )( 100.0f * stamina / pm_stamina.GetFloat() );
////				focusUI.SetStateString( "player_health", va("%i", health ) );
////				focusUI.SetStateString( "player_stamina", va( "%i%%", staminapercentage ) );
////				focusUI.SetStateString( "player_armor", va( "%i%%", this.inventory.armor ) );
////
////				kv = focusGUIent.spawnArgs.MatchPrefix( "gui_parm", NULL );
////				while ( kv ) {
////					focusUI.SetStateString( kv.GetKey(), kv.GetValue() );
////					kv = focusGUIent.spawnArgs.MatchPrefix( "gui_parm", kv );
////				}
////			}
////
////			// clamp the mouse to the corner
////			ev = sys.GenerateMouseMoveEvent( -2000, -2000 );
////			command = focusUI.HandleEvent( &ev, gameLocal.time );
//// 			HandleGuiCommands( focusGUIent, command );
////
////			// move to an absolute position
////			ev = sys.GenerateMouseMoveEvent( pt.x * SCREEN_WIDTH, pt.y * SCREEN_HEIGHT );
////			command = focusUI.HandleEvent( &ev, gameLocal.time );
////			HandleGuiCommands( focusGUIent, command );
////			focusTime = gameLocal.time + FOCUS_GUI_TIME;
////			break;
////		}
////	}
////
////	if ( focusGUIent && focusUI ) {
////		if ( !oldFocus || oldFocus != focusGUIent ) {
////			command = focusUI.Activate( true, gameLocal.time );
////			HandleGuiCommands( focusGUIent, command );
////			StartSound( "snd_guienter", SND_CHANNEL_ANY, 0, false, NULL );
////			// HideTip();
////			// HideObjective();
////		}
////	} else if ( oldFocus && oldUI ) {
////		command = oldUI.Activate( false, gameLocal.time );
////		HandleGuiCommands( oldFocus, command );
////		StartSound( "snd_guiexit", SND_CHANNEL_ANY, 0, false, NULL );
////	}
////
////	if ( cursor && ( oldTalkCursor != talkCursor ) ) {
////		cursor.SetStateInt( "talkcursor", talkCursor );
////	}
////
////	if ( oldChar != focusCharacter && this.hud ) {
////		if ( focusCharacter ) {
////			this.hud.SetStateString( "npc", focusCharacter.spawnArgs.GetString( "npc_name", "Joe" ) );
////			this.hud.HandleNamedEvent( "showNPC" );
////			// HideTip();
////			// HideObjective();
////		} else {
////			this.hud.SetStateString( "npc", "" );
////			this.hud.HandleNamedEvent( "hideNPC" );
////		}
////	}
////}
////
/////*
////=================
////idPlayer::CrashLand
////
////Check for hard landings that generate sound events
////=================
////*/
////void idPlayer::CrashLand( const idVec3 &oldOrigin, const idVec3 &oldVelocity ) {
////	idVec3		origin, velocity;
////	idVec3		gravityVector, gravityNormal;
////	float		delta;
////	float		hardDelta, fatalDelta;
////	float		dist;
////	float		vel, acc;
////	float		t;
////	float		a, b, c, den;
////	waterLevel_t waterLevel;
////	bool		noDamage;
////
////	AI_SOFTLANDING = false;
////	AI_HARDLANDING = false;
////
////	// if the player is not on the ground
////	if ( !physicsObj.HasGroundContacts() ) {
////		return;
////	}
////
////	gravityNormal = physicsObj.GetGravityNormal();
////
////	// if the player wasn't going down
////	if ( ( oldVelocity * -gravityNormal ) >= 0.0 ) {
////		return;
////	}
////
////	waterLevel = physicsObj.GetWaterLevel();
////
////	// never take falling damage if completely underwater
////	if ( waterLevel == WATERLEVEL_HEAD ) {
////		return;
////	}
////
////	// no falling damage if touching a nodamage surface
////	noDamage = false;
////	for ( int i = 0; i < physicsObj.GetNumContacts(); i++ ) {
////		const contactInfo_t &contact = physicsObj.GetContact( i );
////		if ( contact.material.GetSurfaceFlags() & SURF_NODAMAGE ) {
////			noDamage = true;
////			StartSound( "snd_land_hard", SND_CHANNEL_ANY, 0, false, NULL );
////			break;
////		}
////	}
////
////	origin = GetPhysics().GetOrigin();
////	gravityVector = physicsObj.GetGravity();
////
////	// calculate the exact velocity on landing
////	dist = ( origin - oldOrigin ) * -gravityNormal;
////	vel = oldVelocity * -gravityNormal;
////	acc = -gravityVector.Length();
////
////	a = acc / 2.0f;
////	b = vel;
////	c = -dist;
////
////	den = b * b - 4.0f * a * c;
////	if ( den < 0 ) {
////		return;
////	}
////	t = ( -b - idMath::Sqrt( den ) ) / ( 2.0f * a );
////
////	delta = vel + t * acc;
////	delta = delta * delta * 0.0001;
////
////	// reduce falling damage if there is standing water
////	if ( waterLevel == WATERLEVEL_WAIST ) {
////		delta *= 0.25f;
////	}
////	if ( waterLevel == WATERLEVEL_FEET ) {
////		delta *= 0.5f;
////	}
////
////	if ( delta < 1.0f ) {
////		return;
////	}
////
////	// allow falling a bit further for multiplayer
////	if ( gameLocal.isMultiplayer ) {
////		fatalDelta	= 75.0f;
////		hardDelta	= 50.0f;
////	} else {
////		fatalDelta	= 65.0f;
////		hardDelta	= 45.0f;
////	}
////
////	if ( delta > fatalDelta ) {
////		AI_HARDLANDING = true;
////		landChange = -32;
////		landTime = gameLocal.time;
////		if ( !noDamage ) {
////			pain_debounce_time = gameLocal.time + pain_delay + 1;  // ignore pain since we'll play our landing anim
////			Damage( NULL, NULL, idVec3( 0, 0, -1 ), "damage_fatalfall", 1.0f, 0 );
////		}
////	} else if ( delta > hardDelta ) {
////		AI_HARDLANDING = true;
////		landChange	= -24;
////		landTime	= gameLocal.time;
////		if ( !noDamage ) {
////			pain_debounce_time = gameLocal.time + pain_delay + 1;  // ignore pain since we'll play our landing anim
////			Damage( NULL, NULL, idVec3( 0, 0, -1 ), "damage_hardfall", 1.0f, 0 );
////		}
////	} else if ( delta > 30 ) {
////		AI_HARDLANDING = true;
////		landChange	= -16;
////		landTime	= gameLocal.time;
////		if ( !noDamage ) {
////			pain_debounce_time = gameLocal.time + pain_delay + 1;  // ignore pain since we'll play our landing anim
////			Damage( NULL, NULL, idVec3( 0, 0, -1 ), "damage_softfall", 1.0f, 0 );
////		}
////	} else if ( delta > 7 ) {
////		AI_SOFTLANDING = true;
////		landChange	= -8;
////		landTime	= gameLocal.time;
////	} else if ( delta > 3 ) {
////		// just walk on
////	}
////}
////
/////*
////===============
////idPlayer::BobCycle
////===============
////*/
////void idPlayer::BobCycle( const idVec3 &pushVelocity ) {
////	float		bobmove;
////	int			old, deltaTime;
////	idVec3		vel, gravityDir, velocity;
////	idMat3		viewaxis;
////	float		bob;
////	float		delta;
////	float		speed;
////	float		f;
////
////	//
////	// calculate speed and cycle to be used for
////	// all cyclic walking effects
////	//
////	velocity = physicsObj.GetLinearVelocity() - pushVelocity;
////
////	gravityDir = physicsObj.GetGravityNormal();
////	vel = velocity - ( velocity * gravityDir ) * gravityDir;
////	xyspeed = vel.LengthFast();
////
////	// do not evaluate the bob for other clients
////	// when doing a spectate follow, don't do any weapon bobbing
////	if ( gameLocal.isClient && this.entityNumber != gameLocal.localClientNum ) {
////		viewBobAngles.Zero();
////		viewBob.Zero();
////		return;
////	}
////
////	if ( !physicsObj.HasGroundContacts() || influenceActive == INFLUENCE_LEVEL2 || ( gameLocal.isMultiplayer && spectating ) ) {
////		// airborne
////		bobCycle = 0;
////		bobFoot = 0;
////		bobfracsin = 0;
////	} else if ( ( !usercmd.forwardmove && !usercmd.rightmove ) || ( xyspeed <= MIN_BOB_SPEED ) ) {
////		// start at beginning of cycle again
////		bobCycle = 0;
////		bobFoot = 0;
////		bobfracsin = 0;
////	} else {
////		if ( physicsObj.IsCrouching() ) {
////			bobmove = pm_crouchbob.GetFloat();
////			// ducked characters never play footsteps
////		} else {
////			// vary the bobbing based on the speed of the player
////			bobmove = pm_walkbob.GetFloat() * ( 1.0f - bobFrac ) + pm_runbob.GetFloat() * bobFrac;
////		}
////
////		// check for footstep / splash sounds
////		old = bobCycle;
////		bobCycle = (int)( old + bobmove * gameLocal.msec ) & 255;
////		bobFoot = ( bobCycle & 128 ) >> 7;
////		bobfracsin = idMath::Fabs( sin( ( bobCycle & 127 ) / 127.0 * idMath::PI ) );
////	}
////
////	// calculate angles for view bobbing
////	viewBobAngles.Zero();
////
////	viewaxis = this.viewAngles.ToMat3() * physicsObj.GetGravityAxis();
////
////	// add angles based on velocity
////	delta = velocity * viewaxis[0];
////	viewBobAngles.pitch += delta * pm_runpitch.GetFloat();
////	
////	delta = velocity * viewaxis[1];
////	viewBobAngles.roll -= delta * pm_runroll.GetFloat();
////
////	// add angles based on bob
////	// make sure the bob is visible even at low speeds
////	speed = xyspeed > 200 ? xyspeed : 200;
////
////	delta = bobfracsin * pm_bobpitch.GetFloat() * speed;
////	if ( physicsObj.IsCrouching() ) {
////		delta *= 3;		// crouching
////	}
////	viewBobAngles.pitch += delta;
////	delta = bobfracsin * pm_bobroll.GetFloat() * speed;
////	if ( physicsObj.IsCrouching() ) {
////		delta *= 3;		// crouching accentuates roll
////	}
////	if ( bobFoot & 1 ) {
////		delta = -delta;
////	}
////	viewBobAngles.roll += delta;
////
////	// calculate position for view bobbing
////	viewBob.Zero();
////
////	if ( physicsObj.HasSteppedUp() ) {
////
////		// check for stepping up before a previous step is completed
////		deltaTime = gameLocal.time - stepUpTime;
////		if ( deltaTime < STEPUP_TIME ) {
////			stepUpDelta = stepUpDelta * ( STEPUP_TIME - deltaTime ) / STEPUP_TIME + physicsObj.GetStepUp();
////		} else {
////			stepUpDelta = physicsObj.GetStepUp();
////		}
////		if ( stepUpDelta > 2.0f * pm_stepsize.GetFloat() ) {
////			stepUpDelta = 2.0f * pm_stepsize.GetFloat();
////		}
////		stepUpTime = gameLocal.time;
////	}
////
////	idVec3 gravity = physicsObj.GetGravityNormal();
////
////	// if the player stepped up recently
////	deltaTime = gameLocal.time - stepUpTime;
////	if ( deltaTime < STEPUP_TIME ) {
////		viewBob += gravity * ( stepUpDelta * ( STEPUP_TIME - deltaTime ) / STEPUP_TIME );
////	}
////
////	// add bob height after any movement smoothing
////	bob = bobfracsin * xyspeed * pm_bobup.GetFloat();
////	if ( bob > 6 ) {
////		bob = 6;
////	}
////	viewBob[2] += bob;
////
////	// add fall height
////	delta = gameLocal.time - landTime;
////	if ( delta < LAND_DEFLECT_TIME ) {
////		f = delta / LAND_DEFLECT_TIME;
////		viewBob -= gravity * ( landChange * f );
////	} else if ( delta < LAND_DEFLECT_TIME + LAND_RETURN_TIME ) {
////		delta -= LAND_DEFLECT_TIME;
////		f = 1.0 - ( delta / LAND_RETURN_TIME );
////		viewBob -= gravity * ( landChange * f );
////	}
////}
////
/////*
////================
////idPlayer::UpdateDeltaViewAngles
////================
////*/
////void idPlayer::UpdateDeltaViewAngles( angles:idAngles ) {
////	// set the delta angle
////	idAngles delta;
////	for( int i = 0; i < 3; i++ ) {
////		delta[ i ] = angles[ i ] - SHORT2ANGLE( usercmd.angles[ i ] );
////	}
////	SetDeltaViewAngles( delta );
////}
////
/////*
////================
////idPlayer::SetViewAngles
////================
////*/
////void idPlayer::SetViewAngles( angles:idAngles ) {
////	UpdateDeltaViewAngles( angles );
////	this.viewAngles = angles;
////}
////
/////*
////================
////idPlayer::UpdateViewAngles
////================
////*/
////void idPlayer::UpdateViewAngles( ) {
////	var/*int*/i:number;
////	idAngles delta;
////
////	if ( !this.noclip && ( gameLocal.inCinematic || privateCameraView || gameLocal.GetCamera() || influenceActive == INFLUENCE_LEVEL2 || this.objectiveSystemOpen ) ) {
////		// no view changes at all, but we still want to update the deltas or else when
////		// we get out of this mode, our view will snap to a kind of random angle
////		UpdateDeltaViewAngles( this.viewAngles );
////		return;
////	}
////
////	// if dead
////	if ( health <= 0 ) {
////		if ( pm_thirdPersonDeath.GetBool() ) {
////			this.viewAngles.roll = 0.0;
////			this.viewAngles.pitch = 30.0f;
////		} else {
////			this.viewAngles.roll = 40.0f;
////			this.viewAngles.pitch = -15.0f;
////		}
////		return;
////	}
////
////	// circularly clamp the angles with deltas
////	for ( i = 0; i < 3; i++ ) {
////		this.cmdAngles[i] = SHORT2ANGLE( usercmd.angles[i] );
////		if ( influenceActive == INFLUENCE_LEVEL3 ) {
////			this.viewAngles[i] += idMath::ClampFloat( -1.0f, 1.0f, idMath::AngleDelta( idMath::AngleNormalize180( SHORT2ANGLE( usercmd.angles[i]) + deltaViewAngles[i] ) , this.viewAngles[i] ) );
////		} else {
////			this.viewAngles[i] = idMath::AngleNormalize180( SHORT2ANGLE( usercmd.angles[i]) + deltaViewAngles[i] );
////		}
////	}
////	if ( !centerView.IsDone( gameLocal.time ) ) {
////		this.viewAngles.pitch = centerView.GetCurrentValue(gameLocal.time);
////	}
////
////	// clamp the pitch
////	if ( this.noclip ) {
////		if ( this.viewAngles.pitch > 89.0f ) {
////			// don't let the player look down more than 89 degrees while noclipping
////			this.viewAngles.pitch = 89.0f;
////		} else if ( this.viewAngles.pitch < -89.0f ) {
////			// don't let the player look up more than 89 degrees while noclipping
////			this.viewAngles.pitch = -89.0f;
////		}
////	} else {
////		if ( this.viewAngles.pitch > pm_maxviewpitch.GetFloat() ) {
////			// don't let the player look down enough to see the shadow of his (non-existant) feet
////			this.viewAngles.pitch = pm_maxviewpitch.GetFloat();
////		} else if ( this.viewAngles.pitch < pm_minviewpitch.GetFloat() ) {
////			// don't let the player look up more than 89 degrees
////			this.viewAngles.pitch = pm_minviewpitch.GetFloat();
////		}
////	}
////
////	UpdateDeltaViewAngles( this.viewAngles );
////
////	// orient the model towards the direction we're looking
////	SetAngles( idAngles( 0, this.viewAngles.yaw, 0 ) );
////
////	// save in the log for analyzing weapon angle offsets
////	loggedViewAngles[ gameLocal.framenum & (NUM_LOGGED_VIEW_ANGLES-1) ] = this.viewAngles;
////}
////
/////*
////==============
////idPlayer::AdjustHeartRate
////
////Player heartrate works as follows
////
////DEF_HEARTRATE is resting heartrate
////
////Taking damage when health is above 75 adjusts heart rate by 1 beat per second
////Taking damage when health is below 75 adjusts heart rate by 5 beats per second
////Maximum heartrate from damage is MAX_HEARTRATE
////
////Firing a weapon adds 1 beat per second up to a maximum of COMBAT_HEARTRATE
////
////Being at less than 25% stamina adds 5 beats per second up to ZEROSTAMINA_HEARTRATE
////
////All heartrates are target rates.. the heart rate will start falling as soon as there have been no adjustments for 5 seconds
////Once it starts falling it always tries to get to DEF_HEARTRATE
////
////The exception to the above rule is upon death at which point the rate is set to DYING_HEARTRATE and starts falling 
////immediately to zero
////
////Heart rate volumes go from zero ( -40 db for DEF_HEARTRATE to 5 db for MAX_HEARTRATE ) the volume is 
////scaled linearly based on the actual rate
////
////Exception to the above rule is once the player is dead, the dying heart rate starts at either the current volume if
////it is audible or -10db and scales to 8db on the last few beats
////==============
////*/
////void idPlayer::AdjustHeartRate( int target, float timeInSecs, float delay, bool force ) {
////
////	if ( this.heartInfo.GetEndValue() == target ) {
////		return;
////	}
////
////	if ( AI_DEAD && !force ) {
////		return;
////	}
////
////    this.lastHeartAdjust = gameLocal.time;
////
////	this.heartInfo.Init( gameLocal.time + delay * 1000, timeInSecs * 1000, this.heartRate, target );
////}
////
/////*
////==============
////idPlayer::GetBaseHeartRate
////==============
////*/
////int idPlayer::GetBaseHeartRate( ) {
////	int base = idMath::FtoiFast( ( BASE_HEARTRATE + LOWHEALTH_HEARTRATE_ADJ ) - ( (float)health / 100.0f ) * LOWHEALTH_HEARTRATE_ADJ );
////	int rate = idMath::FtoiFast( base + ( ZEROSTAMINA_HEARTRATE - base ) * ( 1.0f - stamina / pm_stamina.GetFloat() ) );
////	int diff = ( this.lastDmgTime ) ? gameLocal.time - this.lastDmgTime : 99999;
////	rate += ( diff < 5000 ) ? ( diff < 2500 ) ? ( diff < 1000 ) ? 15 : 10 : 5 : 0;
////	return rate;
////}
////
/////*
////==============
////idPlayer::SetCurrentHeartRate
////==============
////*/
////void idPlayer::SetCurrentHeartRate( ) {
////
////	int base = idMath::FtoiFast( ( BASE_HEARTRATE + LOWHEALTH_HEARTRATE_ADJ ) - ( (float) health / 100.0f ) * LOWHEALTH_HEARTRATE_ADJ );
////
////	if ( PowerUpActive( ADRENALINE )) {
////		this.heartRate = 135;
////	} else {
////		this.heartRate = idMath::FtoiFast( this.heartInfo.GetCurrentValue( gameLocal.time ) );
////		int currentRate = GetBaseHeartRate();
////		if ( health >= 0 && gameLocal.time > this.lastHeartAdjust + 2500 ) {
////			AdjustHeartRate( currentRate, 2.5f, 0.0, false );
////		}
////	}
////
////	int bps = idMath::FtoiFast( 60.0f / this.heartRate * 1000.0f );
////	if ( gameLocal.time - this.lastHeartBeat > bps ) {
////		int dmgVol = DMG_VOLUME;
////		int deathVol = DEATH_VOLUME;
////		int zeroVol = ZERO_VOLUME;
////		float pct = 0.0;
////		if ( this.heartRate > BASE_HEARTRATE && health > 0 ) {
////			pct = (float)(this.heartRate - base) / (MAX_HEARTRATE - base);
////			pct *= ((float)dmgVol - (float)zeroVol);
////		} else if ( health <= 0 ) {
////			pct = (float)(this.heartRate - DYING_HEARTRATE) / (BASE_HEARTRATE - DYING_HEARTRATE);
////			if ( pct > 1.0f ) {
////				pct = 1.0f;
////			} else if (pct < 0.0) {
////				pct = 0.0;
////			}
////			pct *= ((float)deathVol - (float)zeroVol);
////		} 
////
////		pct += (float)zeroVol;
////
////		if ( pct != zeroVol ) {
////			StartSound( "snd_heartbeat", SND_CHANNEL_HEART, SSF_PRIVATE_SOUND, false, NULL );
////			// modify just this channel to a custom volume
////			soundShaderParms_t	parms;
////			memset( &parms, 0, sizeof( parms ) );
////			parms.volume = pct;
////			refSound.referenceSound.ModifySound( SND_CHANNEL_HEART, &parms );
////		}
////
////		this.lastHeartBeat = gameLocal.time;
////	}
////}
////
/////*
////==============
////idPlayer::UpdateAir
////==============
////*/
////void idPlayer::UpdateAir( ) {	
////	if ( health <= 0 ) {
////		return;
////	}
////
////	// see if the player is connected to the info_vacuum
////	bool	newAirless = false;
////
////	if ( gameLocal.vacuumAreaNum != -1 ) {
////		int	num = GetNumPVSAreas();
////		if ( num > 0 ) {
////			int		areaNum;
////
////			// if the player box spans multiple areas, get the area from the origin point instead,
////			// otherwise a rotating player box may poke into an outside area
////			if ( num == 1 ) {
////				const int	*pvsAreas = GetPVSAreas();
////				areaNum = pvsAreas[0];
////			} else {
////				areaNum = gameRenderWorld.PointInArea( this.GetPhysics().GetOrigin() );
////			}
////			newAirless = gameRenderWorld.AreasAreConnected( gameLocal.vacuumAreaNum, areaNum, PS_BLOCK_AIR );
////		}
////	}
////
////	if ( newAirless ) {
////		if ( !airless ) {
////			StartSound( "snd_decompress", SND_CHANNEL_ANY, SSF_GLOBAL, false, NULL );
////			StartSound( "snd_noAir", SND_CHANNEL_BODY2, 0, false, NULL );
////			if ( this.hud ) {
////				this.hud.HandleNamedEvent( "noAir" );
////			}
////		}
////		airTics--;
////		if ( airTics < 0 ) {
////			airTics = 0;
////			// check for damage
////			const idDict *damageDef = gameLocal.FindEntityDefDict( "damage_noair", false );
////			int dmgTiming = 1000 * ((damageDef) ? damageDef.GetFloat( "delay", "3.0" ) : 3.0f );
////			if ( gameLocal.time > lastAirDamage + dmgTiming ) {
////				Damage( NULL, NULL, vec3_origin, "damage_noair", 1.0f, 0 );
////				lastAirDamage = gameLocal.time;
////			}
////		}
////		
////	} else {
////		if ( airless ) {
////			StartSound( "snd_recompress", SND_CHANNEL_ANY, SSF_GLOBAL, false, NULL );
////			StopSound( SND_CHANNEL_BODY2, false );
////			if ( this.hud ) {
////				this.hud.HandleNamedEvent( "Air" );
////			}
////		}
////		airTics+=2;	// regain twice as fast as lose
////		if ( airTics > pm_airTics.GetInteger() ) {
////			airTics = pm_airTics.GetInteger();
////		}
////	}
////
////	airless = newAirless;
////
////	if ( this.hud ) {
////		this.hud.SetStateInt( "player_air", 100 * airTics / pm_airTics.GetInteger() );
////	}
////}
////
/////*
////==============
////idPlayer::AddGuiPDAData
////==============
//// */
////int idPlayer::AddGuiPDAData( const declType_t dataType, const char *listName, const idDeclPDA *src, idUserInterface *gui ) {
////	int c, i;
////	idStr work;
////	if ( dataType == DECL_EMAIL ) {
////		c = src.GetNumEmails();
////		for ( i = 0; i < c; i++ ) {
////			const idDeclEmail *email = src.GetEmailByIndex( i );
////			if ( email == NULL ) {
////				work = va( "-\tEmail %d not found\t-", i );
////			} else {
////				work = email.GetFrom();
////				work += "\t";
////				work += email.GetSubject();
////				work += "\t";
////				work += email.GetDate();
////			}
////			gui.SetStateString( va( "%s_item_%i", listName, i ), work );
////		}
////		return c;
////	} else if ( dataType == DECL_AUDIO ) {
////		c = src.GetNumAudios();
////		for ( i = 0; i < c; i++ ) {
////			const idDeclAudio *audio = src.GetAudioByIndex( i );
////			if ( audio == NULL ) {
////				work = va( "Audio Log %d not found", i );
////			} else {
////				work = audio.GetAudioName();
////			}
////			gui.SetStateString( va( "%s_item_%i", listName, i ), work );
////		}
////		return c;
////	} else if ( dataType == DECL_VIDEO ) {
////		c = this.inventory.videos.Num();
////		for ( i = 0; i < c; i++ ) {
////			const idDeclVideo *video = GetVideo( i );
////			if ( video == NULL ) {
////				work = va( "Video CD %s not found", this.inventory.videos[i].c_str() );
////			} else {
////				work = video.GetVideoName();
////			}
////			gui.SetStateString( va( "%s_item_%i", listName, i ), work );
////		}
////		return c;
////	}
////	return 0;
////}
////
/////*
////==============
////idPlayer::GetPDA
////==============
//// */
////const idDeclPDA *idPlayer::GetPDA( ) const {
////	if ( this.inventory.pdas.Num() ) {
////		return static_cast< const idDeclPDA* >( declManager.FindType( DECL_PDA, this.inventory.pdas[ 0 ] ) );
////	} else {
////		return NULL;
////	}
////}
////
////
/////*
////==============
////idPlayer::GetVideo
////==============
////*/
////const idDeclVideo *idPlayer::GetVideo( int index ) {
////	if ( index >= 0 && index < this.inventory.videos.Num() ) {
////		return static_cast< const idDeclVideo* >( declManager.FindType( DECL_VIDEO, this.inventory.videos[index], false ) );
////	}
////	return NULL;
////}
////
////
/////*
////==============
////idPlayer::UpdatePDAInfo
////==============
////*/
////void idPlayer::UpdatePDAInfo( bool updatePDASel ) {
////	int j, sel;
////
////	if ( this.objectiveSystem == NULL ) {
////		return;
////	}
////
////	assert( this.hud );
////
////	int currentPDA = this.objectiveSystem.State().GetInt( "listPDA_sel_0", "0" );
////	if ( currentPDA == -1 ) {
////		currentPDA = 0;
////	}
////
////	if ( updatePDASel ) {
////		this.objectiveSystem.SetStateInt( "listPDAVideo_sel_0", 0 );
////		this.objectiveSystem.SetStateInt( "listPDAEmail_sel_0", 0 );
////		this.objectiveSystem.SetStateInt( "listPDAAudio_sel_0", 0 );
////	}
////
////	if ( currentPDA > 0 ) {
////		currentPDA = this.inventory.pdas.Num() - currentPDA;
////	}
////
////	// Mark in the bit array that this pda has been read
////	if ( currentPDA < 128 ) {
////		this.inventory.pdasViewed[currentPDA >> 5] |= 1 << (currentPDA & 31);
////	}
////
////	pdaAudio .opEquals( "");
////	pdaVideo .opEquals("");
////	pdaVideoWave .opEquals( "");
////	idStr name, data, preview, info, wave;
////	for ( j = 0; j < MAX_PDAS; j++ ) {
////		this.objectiveSystem.SetStateString( va( "listPDA_item_%i", j ), "" );
////	}
////	for ( j = 0; j < MAX_PDA_ITEMS; j++ ) {
////		this.objectiveSystem.SetStateString( va( "listPDAVideo_item_%i", j ), "" );
////		this.objectiveSystem.SetStateString( va( "listPDAAudio_item_%i", j ), "" );
////		this.objectiveSystem.SetStateString( va( "listPDAEmail_item_%i", j ), "" );
////		this.objectiveSystem.SetStateString( va( "listPDASecurity_item_%i", j ), "" );
////	}
////	for ( j = 0; j < this.inventory.pdas.Num(); j++ ) {
////
////		const idDeclPDA *pda = static_cast< const idDeclPDA* >( declManager.FindType( DECL_PDA, this.inventory.pdas[j], false ) );
////
////		if ( pda == NULL ) {
////			continue;
////		}
////
////		int index = this.inventory.pdas.Num() - j;
////		if ( j == 0 ) {
////			// Special case for the first PDA
////			index = 0;
////		}
////
////		if ( j != currentPDA && j < 128 && this.inventory.pdasViewed[j >> 5] & (1 << (j & 31)) ) {
////			// This pda has been read already, mark in gray
////			this.objectiveSystem.SetStateString( va( "listPDA_item_%i", index), va(S_COLOR_GRAY "%s", pda.GetPdaName()) );
////		} else {
////			// This pda has not been read yet
////		this.objectiveSystem.SetStateString( va( "listPDA_item_%i", index), pda.GetPdaName() );
////		}
////
////		const char *security = pda.GetSecurity();
////		if ( j == currentPDA || (currentPDA == 0 && security && *security ) ) {
////			if ( *security == NULL ) {
////				security = common.GetLanguageDict().GetString( "#str_00066" );
////			}
////			this.objectiveSystem.SetStateString( "PDASecurityClearance", security );
////		}
////
////		if ( j == currentPDA ) {
////
////			this.objectiveSystem.SetStateString( "pda_icon", pda.GetIcon() );
////			this.objectiveSystem.SetStateString( "pda_id", pda.GetID() );
////			this.objectiveSystem.SetStateString( "pda_title", pda.GetTitle() );
////
////			if ( j == 0 ) {
////				// Selected, personal pda
////				// Add videos
////				if ( updatePDASel || !this.inventory.pdaOpened ) {
////				this.objectiveSystem.HandleNamedEvent( "playerPDAActive" );
////				this.objectiveSystem.SetStateString( "pda_personal", "1" );
////					this.inventory.pdaOpened = true;
////				}
////				this.objectiveSystem.SetStateString( "pda_location", this.hud.State().GetString("location") );
////				this.objectiveSystem.SetStateString( "pda_name", cvarSystem.GetCVarString( "ui_name") );
////				AddGuiPDAData( DECL_VIDEO, "listPDAVideo", pda, this.objectiveSystem );
////				sel = this.objectiveSystem.State().GetInt( "listPDAVideo_sel_0", "0" );
////				const idDeclVideo *vid = NULL;
////				if ( sel >= 0 && sel < this.inventory.videos.Num() ) {
////					vid = static_cast< const idDeclVideo * >( declManager.FindType( DECL_VIDEO, this.inventory.videos[ sel ], false ) );
////				}
////				if ( vid ) {
////					pdaVideo = vid.GetRoq();
////					pdaVideoWave .opEquals( vid.GetWave());
////					this.objectiveSystem.SetStateString( "PDAVideoTitle", vid.GetVideoName() );
////					this.objectiveSystem.SetStateString( "PDAVideoVid", vid.GetRoq() );
////					this.objectiveSystem.SetStateString( "PDAVideoIcon", vid.GetPreview() );
////					this.objectiveSystem.SetStateString( "PDAVideoInfo", vid.GetInfo() );
////				} else {
////					//FIXME: need to precache these in the player def
////					this.objectiveSystem.SetStateString( "PDAVideoVid", "sound/vo/video/welcome.tga" );
////					this.objectiveSystem.SetStateString( "PDAVideoIcon", "sound/vo/video/welcome.tga" );
////					this.objectiveSystem.SetStateString( "PDAVideoTitle", "" );
////					this.objectiveSystem.SetStateString( "PDAVideoInfo", "" );
////				}
////			} else {
////				// Selected, non-personal pda
////				// Add audio logs
////				if ( updatePDASel ) {
////				this.objectiveSystem.HandleNamedEvent( "playerPDANotActive" );
////				this.objectiveSystem.SetStateString( "pda_personal", "0" );
////					this.inventory.pdaOpened = true;
////				}
////				this.objectiveSystem.SetStateString( "pda_location", pda.GetPost() );
////				this.objectiveSystem.SetStateString( "pda_name", pda.GetFullName() );
////				int audioCount = AddGuiPDAData( DECL_AUDIO, "listPDAAudio", pda, this.objectiveSystem );
////				this.objectiveSystem.SetStateInt( "audioLogCount", audioCount );
////				sel = this.objectiveSystem.State().GetInt( "listPDAAudio_sel_0", "0" );
////				const idDeclAudio *aud = NULL;
////				if ( sel >= 0 ) {
////					aud = pda.GetAudioByIndex( sel );
////				}
////				if ( aud ) {
////					pdaAudio.opEquals( aud.GetWave());
////					this.objectiveSystem.SetStateString( "PDAAudioTitle", aud.GetAudioName() );
////					this.objectiveSystem.SetStateString( "PDAAudioIcon", aud.GetPreview() );
////					this.objectiveSystem.SetStateString( "PDAAudioInfo", aud.GetInfo() );
////				} else {
////					this.objectiveSystem.SetStateString( "PDAAudioIcon", "sound/vo/video/welcome.tga" );
////					this.objectiveSystem.SetStateString( "PDAAutioTitle", "" );
////					this.objectiveSystem.SetStateString( "PDAAudioInfo", "" );
////				}
////			}
////			// add emails
////			name = "";
////			data = "";
////			int numEmails = pda.GetNumEmails();
////			if ( numEmails > 0 ) {
////				AddGuiPDAData( DECL_EMAIL, "listPDAEmail", pda, this.objectiveSystem );
////				sel = this.objectiveSystem.State().GetInt( "listPDAEmail_sel_0", "-1" );
////				if ( sel >= 0 && sel < numEmails ) {
////					const idDeclEmail *email = pda.GetEmailByIndex( sel );
////					name = email.GetSubject();
////					data = email.GetBody();
////				}
////			}
////			this.objectiveSystem.SetStateString( "PDAEmailTitle", name );
////			this.objectiveSystem.SetStateString( "PDAEmailText", data );
////		}
////	}
////	if ( this.objectiveSystem.State().GetInt( "listPDA_sel_0", "-1" ) == -1 ) {
////		this.objectiveSystem.SetStateInt( "listPDA_sel_0", 0 );
////	}
////	this.objectiveSystem.StateChanged( gameLocal.time );
////}
////
/////*
////==============
////idPlayer::TogglePDA
////==============
////*/
////void idPlayer::TogglePDA( ) {
////	if ( this.objectiveSystem == NULL ) {
////		return;
////	}
////
////	if ( this.inventory.pdas.Num() == 0 ) {
////		ShowTip( spawnArgs.GetString( "text_infoTitle" ), spawnArgs.GetString( "text_noPDA" ), true );
////		return;
////	}
////
////	assert( this.hud );
////
////	if ( !this.objectiveSystemOpen ) {
////		int j, c = this.inventory.items.Num();
////		this.objectiveSystem.SetStateInt( "inv_count", c );
////		for ( j = 0; j < MAX_INVENTORY_ITEMS; j++ ) {
////			this.objectiveSystem.SetStateString( va( "inv_name_%i", j ), "" );
////			this.objectiveSystem.SetStateString( va( "inv_icon_%i", j ), "" );
////			this.objectiveSystem.SetStateString( va( "inv_text_%i", j ), "" );
////		}
////		for ( j = 0; j < c; j++ ) {
////			idDict *item = this.inventory.items[j];
////			if ( !item.GetBool( "inv_pda" ) ) {
////				const char *iname = item.GetString( "inv_name" );
////				const char *iicon = item.GetString( "inv_icon" );
////				const char *itext = item.GetString( "inv_text" );
////				this.objectiveSystem.SetStateString( va( "inv_name_%i", j ), iname );
////				this.objectiveSystem.SetStateString( va( "inv_icon_%i", j ), iicon );
////				this.objectiveSystem.SetStateString( va( "inv_text_%i", j ), itext );
////				const idKeyValue *kv = item.MatchPrefix( "inv_id", NULL );
////				if ( kv ) {
////					this.objectiveSystem.SetStateString( va( "inv_id_%i", j ), kv.GetValue() );
////				}
////			}
////		}
////
////		for ( j = 0; j < MAX_WEAPONS; j++ ) {
////			const char *weapnum = va( "def_weapon%d", j );
////			const char *hudWeap = va( "weapon%d", j );
////			int weapstate = 0;
////			if ( this.inventory.weapons & ( 1 << j ) ) {
////				const char *weap = spawnArgs.GetString( weapnum );
////				if ( weap && *weap ) {
////					weapstate++;
////				}
////			}
////			this.objectiveSystem.SetStateInt( hudWeap, weapstate );
////		}
////
////		this.objectiveSystem.SetStateInt( "listPDA_sel_0", this.inventory.selPDA );
////		this.objectiveSystem.SetStateInt( "listPDAVideo_sel_0", this.inventory.selVideo );
////		this.objectiveSystem.SetStateInt( "listPDAAudio_sel_0", this.inventory.selAudio );
////		this.objectiveSystem.SetStateInt( "listPDAEmail_sel_0", this.inventory.selEMail );
////		UpdatePDAInfo( false );
////		UpdateObjectiveInfo();
////		this.objectiveSystem.Activate( true, gameLocal.time );
////		this.hud.HandleNamedEvent( "pdaPickupHide" );
////		this.hud.HandleNamedEvent( "videoPickupHide" );
////	} else {
////		this.inventory.selPDA = this.objectiveSystem.State().GetInt( "listPDA_sel_0" );
////		this.inventory.selVideo = this.objectiveSystem.State().GetInt( "listPDAVideo_sel_0" );
////		this.inventory.selAudio = this.objectiveSystem.State().GetInt( "listPDAAudio_sel_0" );
////		this.inventory.selEMail = this.objectiveSystem.State().GetInt( "listPDAEmail_sel_0" );
////		this.objectiveSystem.Activate( false, gameLocal.time );
////	}
////	this.objectiveSystemOpen ^= 1;
////}
////
/////*
////==============
////idPlayer::ToggleScoreboard
////==============
////*/
////void idPlayer::ToggleScoreboard( ) {
////	scoreBoardOpen ^= 1;
////}
////
/////*
////==============
////idPlayer::Spectate
////==============
////*/
////void idPlayer::Spectate( bool spectate ) {
////	idBitMsg	msg;
////	byte		msgBuf[MAX_EVENT_PARAM_SIZE];
////
////	// track invisible player bug
////	// all hiding and showing should be performed through Spectate calls
////	// except for the private camera view, which is used for teleports
////	assert( ( teleportEntity.GetEntity() != NULL ) || ( IsHidden() == spectating ) );
////
////	if ( spectating == spectate ) {
////		return;
////	}
////
////	spectating = spectate;
////
////	if ( gameLocal.isServer ) {
////		msg.Init( msgBuf, sizeof( msgBuf ) );
////		msg.WriteBits( spectating, 1 );
////		ServerSendEvent( EVENT_SPECTATE, &msg, false, -1 );
////	}
////
////	if ( spectating ) {
////		// join the spectators
////		ClearPowerUps();
////		spectator = this.entityNumber;
////		Init();
////		StopRagdoll();
////		SetPhysics( &physicsObj );
////		physicsObj.DisableClip();
////		Hide();
////		Event_DisableWeapon();
////		if ( this.hud ) {
////			this.hud.HandleNamedEvent( "aim_clear" );
////			MPAimFadeTime = 0;
////		}
////	} else {
////		// put everything back together again
////		currentWeapon = -1;	// to make sure the def will be loaded if necessary
////		Show();
////		Event_EnableWeapon();
////	}
////	SetClipModel();
////}
////
/////*
////==============
////idPlayer::SetClipModel
////==============
////*/
////void idPlayer::SetClipModel( ) {
////	idBounds bounds;
////
////	if ( spectating ) {
////		bounds = idBounds( vec3_origin ).Expand( pm_spectatebbox.GetFloat() * 0.5f );
////	} else {
////		bounds[0].Set( -pm_bboxwidth.GetFloat() * 0.5f, -pm_bboxwidth.GetFloat() * 0.5f, 0 );
////		bounds[1].Set( pm_bboxwidth.GetFloat() * 0.5f, pm_bboxwidth.GetFloat() * 0.5f, pm_normalheight.GetFloat() );
////	}
////	// the origin of the clip model needs to be set before calling SetClipModel
////	// otherwise our physics object's current origin value gets reset to 0
////	idClipModel *newClip;
////	if ( pm_usecylinder.GetBool() ) {
////		newClip = new idClipModel( idTraceModel( bounds, 8 ) );
////		newClip.Translate( physicsObj.PlayerGetOrigin() );
////		physicsObj.SetClipModel( newClip, 1.0f );
////	} else {
////		newClip = new idClipModel( idTraceModel( bounds ) );
////		newClip.Translate( physicsObj.PlayerGetOrigin() );
////		physicsObj.SetClipModel( newClip, 1.0f );
////	}
////}
////
/////*
////==============
////idPlayer::UseVehicle
////==============
////*/
////void idPlayer::UseVehicle( ) {
////	trace_t	trace;
////	idVec3 start, end;
////	var ent:idEntity
////
////	if ( GetBindMaster() && GetBindMaster().IsType( idAFEntity_Vehicle::Type ) ) {
////		Show();
////		static_cast<idAFEntity_Vehicle*>(GetBindMaster()).Use( this );
////	} else {
////		start = GetEyePosition();
////		end = start + this.viewAngles.ToForward() * 80.0f;
////		gameLocal.clip.TracePoint( trace, start, end, MASK_SHOT_RENDERMODEL, this );
////		if ( trace.fraction < 1.0f ) {
////			ent = gameLocal.entities[ trace.c.entityNum ];
////			if ( ent && ent.IsType( idAFEntity_Vehicle::Type ) ) {
////				Hide();
////				static_cast<idAFEntity_Vehicle*>(ent).Use( this );
////			}
////		}
////	}
////}
////
/////*
////==============
////idPlayer::PerformImpulse
////==============
////*/
////void idPlayer::PerformImpulse( int impulse ) {
////
////	if ( gameLocal.isClient ) {
////		idBitMsg	msg;
////		byte		msgBuf[MAX_EVENT_PARAM_SIZE];
////
////		assert( this.entityNumber == gameLocal.localClientNum );
////		msg.Init( msgBuf, sizeof( msgBuf ) );
////		msg.BeginWriting();
////		msg.WriteBits( impulse, 6 );
////		ClientSendEvent( EVENT_IMPULSE, &msg );
////	}
////
////	if ( impulse >= IMPULSE_0 && impulse <= IMPULSE_12 ) {
////		SelectWeapon( impulse, false );
////		return;
////	}
////
////	switch( impulse ) {
////		case IMPULSE_13: {
////			Reload();
////			break;
////		}
////		case IMPULSE_14: {
////			NextWeapon();
////			break;
////		}
////		case IMPULSE_15: {
////			PrevWeapon();
////			break;
////		}
////		case IMPULSE_17: {
////			if ( gameLocal.isClient || this.entityNumber == gameLocal.localClientNum ) {
////				gameLocal.mpGame.ToggleReady();
////			}
////			break;
////		}
////		case IMPULSE_18: {
////			centerView.Init(gameLocal.time, 200, this.viewAngles.pitch, 0);
////			break;
////		}
////		case IMPULSE_19: {
////			// when we're not in single player, IMPULSE_19 is used for showScores
////			// otherwise it opens the pda
////			if ( !gameLocal.isMultiplayer ) {
////				if ( this.objectiveSystemOpen ) {
////					TogglePDA();
////				} else if ( this.weapon_pda >= 0 ) {
////					SelectWeapon( this.weapon_pda, true );
////				}
////			}
////			break;
////		}
////		case IMPULSE_20: {
////			if ( gameLocal.isClient || this.entityNumber == gameLocal.localClientNum ) {
////				gameLocal.mpGame.ToggleTeam();
////			}
////			break;
////		}
////		case IMPULSE_22: {
////			if ( gameLocal.isClient || this.entityNumber == gameLocal.localClientNum ) {
////				gameLocal.mpGame.ToggleSpectate();
////			}
////			break;
////		}
////		case IMPULSE_28: {
////			if ( gameLocal.isClient || this.entityNumber == gameLocal.localClientNum ) {
////				gameLocal.mpGame.CastVote( gameLocal.localClientNum, true );
////			}
////			break;
////		}
////		case IMPULSE_29: {
////			if ( gameLocal.isClient || this.entityNumber == gameLocal.localClientNum ) {
////				gameLocal.mpGame.CastVote( gameLocal.localClientNum, false );
////			}
////			break;
////		}
////		case IMPULSE_40: {
////			UseVehicle();
////			break;
////		}
////	} 
////}
////
////bool idPlayer::HandleESC( ) {
////	if ( gameLocal.inCinematic ) {
////		return SkipCinematic();
////	}
////
////	if ( this.objectiveSystemOpen ) {
////		TogglePDA();
////		return true;
////	}
////
////	return false;
////}
////
////bool idPlayer::SkipCinematic( ) {
////	StartSound( "snd_skipcinematic", SND_CHANNEL_ANY, 0, false, NULL );
////	return gameLocal.SkipCinematic();
////}
////
/////*
////==============
////idPlayer::EvaluateControls
////==============
////*/
////void idPlayer::EvaluateControls( ) {
////	// check for respawning
////	if ( health <= 0 ) {
////		if ( ( gameLocal.time > minRespawnTime ) && ( usercmd.buttons & BUTTON_ATTACK ) ) {
////			forceRespawn = true;
////		} else if ( gameLocal.time > maxRespawnTime ) {
////			forceRespawn = true;
////		}
////	}
////
////	// in MP, idMultiplayerGame decides spawns
////	if ( forceRespawn && !gameLocal.isMultiplayer && !g_testDeath.GetBool() ) {
////		// in single player, we let the session handle restarting the level or loading a game
////		gameLocal.sessionCommand = "died";
////	}
////
////	if ( ( usercmd.flags & UCF_IMPULSE_SEQUENCE ) != ( this.oldFlags & UCF_IMPULSE_SEQUENCE ) ) {
////		PerformImpulse( usercmd.impulse );
////	}
////
////	scoreBoardOpen = ( ( usercmd.buttons & BUTTON_SCORES ) != 0 || forceScoreBoard );
////
////	this.oldFlags = usercmd.flags;
////
////	AdjustSpeed();
////
////	// update the viewangles
////	UpdateViewAngles();
////}
////
/////*
////==============
////idPlayer::AdjustSpeed
////==============
////*/
////void idPlayer::AdjustSpeed( ) {
////	var /*float*/ speed:number
////	float rate;
////
////	if ( spectating ) {
////		speed = pm_spectatespeed.GetFloat();
////		bobFrac = 0.0;
////	} else if ( this.noclip ) {
////		speed = pm_noclipspeed.GetFloat();
////		bobFrac = 0.0;
////	} else if ( !physicsObj.OnLadder() && ( usercmd.buttons & BUTTON_RUN ) && ( usercmd.forwardmove || usercmd.rightmove ) && ( usercmd.upmove >= 0 ) ) {
////		if ( !gameLocal.isMultiplayer && !physicsObj.IsCrouching() && !PowerUpActive( ADRENALINE ) ) {
////			stamina -= MS2SEC( gameLocal.msec );
////		}
////		if ( stamina < 0 ) {
////			stamina = 0;
////		}
////		if ( ( !pm_stamina.GetFloat() ) || ( stamina > pm_staminathreshold.GetFloat() ) ) {
////			bobFrac = 1.0f;
////		} else if ( pm_staminathreshold.GetFloat() <= 0.0001f ) {
////			bobFrac = 0.0;
////		} else {
////			bobFrac = stamina / pm_staminathreshold.GetFloat();
////		}
////		speed = pm_walkspeed.GetFloat() * ( 1.0f - bobFrac ) + pm_runspeed.GetFloat() * bobFrac;
////	} else {
////		rate = pm_staminarate.GetFloat();
////		
////		// increase 25% faster when not moving
////		if ( ( usercmd.forwardmove == 0 ) && ( usercmd.rightmove == 0 ) && ( !physicsObj.OnLadder() || ( usercmd.upmove == 0 ) ) ) {
////			 rate *= 1.25f;
////		}
////
////		stamina += rate * MS2SEC( gameLocal.msec );
////		if ( stamina > pm_stamina.GetFloat() ) {
////			stamina = pm_stamina.GetFloat();
////		}
////		speed = pm_walkspeed.GetFloat();
////		bobFrac = 0.0;
////	}
////
////	speed *= PowerUpModifier(SPEED);
////
////	if ( influenceActive == INFLUENCE_LEVEL3 ) {
////		speed *= 0.33f;
////	}
////
////	physicsObj.SetSpeed( speed, pm_crouchspeed.GetFloat() );
////}
////
/////*
////==============
////idPlayer::AdjustBodyAngles
////==============
////*/
////void idPlayer::AdjustBodyAngles( ) {
////	idMat3	lookAxis;
////	idMat3	legsAxis;
////	bool	blend;
////	float	diff;
////	float	frac;
////	float	upBlend;
////	float	forwardBlend;
////	float	downBlend;
////
////	if ( health < 0 ) {
////		return;
////	}
////
////	blend = true;
////
////	if ( !physicsObj.HasGroundContacts() ) {
////		idealLegsYaw = 0.0;
////		legsForward = true;
////	} else if ( usercmd.forwardmove < 0 ) {
////		idealLegsYaw = idMath::AngleNormalize180( idVec3( -usercmd.forwardmove, usercmd.rightmove, 0.0 ).ToYaw() );
////		legsForward = false;
////	} else if ( usercmd.forwardmove > 0 ) {
////		idealLegsYaw = idMath::AngleNormalize180( idVec3( usercmd.forwardmove, -usercmd.rightmove, 0.0 ).ToYaw() );
////		legsForward = true;
////	} else if ( ( usercmd.rightmove != 0 ) && physicsObj.IsCrouching() ) {
////		if ( !legsForward ) {
////			idealLegsYaw = idMath::AngleNormalize180( idVec3( idMath::Abs( usercmd.rightmove ), usercmd.rightmove, 0.0 ).ToYaw() );
////		} else {
////			idealLegsYaw = idMath::AngleNormalize180( idVec3( idMath::Abs( usercmd.rightmove ), -usercmd.rightmove, 0.0 ).ToYaw() );
////		}
////	} else if ( usercmd.rightmove != 0 ) {
////		idealLegsYaw = 0.0;
////		legsForward = true;
////	} else {
////		legsForward = true;
////		diff = idMath::Fabs( idealLegsYaw - legsYaw );
////		idealLegsYaw = idealLegsYaw - idMath::AngleNormalize180( this.viewAngles.yaw - oldViewYaw );
////		if ( diff < 0.1f ) {
////			legsYaw = idealLegsYaw;
////			blend = false;
////		}
////	}
////
////	if ( !physicsObj.IsCrouching() ) {
////		legsForward = true;
////	}
////
////	oldViewYaw = this.viewAngles.yaw;
////
////	AI_TURN_LEFT = false;
////	AI_TURN_RIGHT = false;
////	if ( idealLegsYaw < -45.0f ) {
////		idealLegsYaw = 0;
////		AI_TURN_RIGHT = true;
////		blend = true;
////	} else if ( idealLegsYaw > 45.0f ) {
////		idealLegsYaw = 0;
////		AI_TURN_LEFT = true;
////		blend = true;
////	}
////
////	if ( blend ) {
////		legsYaw = legsYaw * 0.9f + idealLegsYaw * 0.1f;
////	}
////	legsAxis = idAngles( 0.0, legsYaw, 0.0 ).ToMat3();
////	animator.SetJointAxis( hipJoint, JOINTMOD_WORLD, legsAxis );
////
////	// calculate the blending between down, straight, and up
////	frac = this.viewAngles.pitch / 90.0f;
////	if ( frac > 0.0 ) {
////		downBlend		= frac;
////		forwardBlend	= 1.0f - frac;
////		upBlend			= 0.0;
////	} else {
////		downBlend		= 0.0;
////		forwardBlend	= 1.0f + frac;
////		upBlend			= -frac;
////	}
////
////    animator.CurrentAnim( ANIMCHANNEL_TORSO ).SetSyncedAnimWeight( 0, downBlend );
////	animator.CurrentAnim( ANIMCHANNEL_TORSO ).SetSyncedAnimWeight( 1, forwardBlend );
////	animator.CurrentAnim( ANIMCHANNEL_TORSO ).SetSyncedAnimWeight( 2, upBlend );
////
////	animator.CurrentAnim( ANIMCHANNEL_LEGS ).SetSyncedAnimWeight( 0, downBlend );
////	animator.CurrentAnim( ANIMCHANNEL_LEGS ).SetSyncedAnimWeight( 1, forwardBlend );
////	animator.CurrentAnim( ANIMCHANNEL_LEGS ).SetSyncedAnimWeight( 2, upBlend );
////}
////
/////*
////==============
////idPlayer::InitAASLocation
////==============
////*/
////void idPlayer::InitAASLocation( ) {
////	var i:number /*int*/;
////	var /*int*/num:number;
////	idVec3	size;
////	idBounds bounds;
////	idAAS	*aas;
////	idVec3	origin;
////
////	GetFloorPos( 64.0f, origin );
////
////	num = gameLocal.NumAAS();
////	aasLocation.SetGranularity( 1 );
////	aasLocation.SetNum( num );	
////	for( i = 0; i < aasLocation.Num(); i++ ) {
////		aasLocation[ i ].areaNum = 0;
////		aasLocation[ i ].pos = origin;
////		aas = gameLocal.GetAAS( i );
////		if ( aas && aas.GetSettings() ) {
////			size = aas.GetSettings().boundingBoxes[0][1];
////			bounds[0] = -size;
////			size.z = 32.0f;
////			bounds[1] = size;
////
////			aasLocation[ i ].areaNum = aas.PointReachableAreaNum( origin, bounds, AREA_REACHABLE_WALK );
////		}
////	}
////}
////
/////*
////==============
////idPlayer::SetAASLocation
////==============
////*/
////void idPlayer::SetAASLocation( ) {
////	var i:number /*int*/;
////	int		areaNum;
////	idVec3	size;
////	idBounds bounds;
////	idAAS	*aas;
////	idVec3	origin;
////
////	if ( !GetFloorPos( 64.0f, origin ) ) {
////		return;
////	}
////	
////	for( i = 0; i < aasLocation.Num(); i++ ) {
////		aas = gameLocal.GetAAS( i );
////		if ( !aas ) {
////			continue;
////		}
////
////		size = aas.GetSettings().boundingBoxes[0][1];
////		bounds[0] = -size;
////		size.z = 32.0f;
////		bounds[1] = size;
////
////		areaNum = aas.PointReachableAreaNum( origin, bounds, AREA_REACHABLE_WALK );
////		if ( areaNum ) {
////			aasLocation[ i ].pos = origin;
////			aasLocation[ i ].areaNum = areaNum;
////		}
////	}
////}
////
/////*
////==============
////idPlayer::GetAASLocation
////==============
////*/
////void idPlayer::GetAASLocation( idAAS *aas, pos:idVec3, int &areaNum ) const {
////	var/*int*/i:number;
////
////	if ( aas != NULL ) {
////		for( i = 0; i < aasLocation.Num(); i++ ) {
////			if ( aas == gameLocal.GetAAS( i ) ) {
////				areaNum = aasLocation[ i ].areaNum;
////				pos = aasLocation[ i ].pos;
////				return;
////			}
////		}
////	}
////
////	areaNum = 0;
////	pos = physicsObj.GetOrigin();
////}
////
/////*
////==============
////idPlayer::Move
////==============
////*/
////void idPlayer::Move( ) {
////	float newEyeOffset;
////	idVec3 oldOrigin;
////	idVec3 oldVelocity;
////	idVec3 pushVelocity;
////
////	// save old origin and velocity for crashlanding
////	oldOrigin = physicsObj.GetOrigin();
////	oldVelocity = physicsObj.GetLinearVelocity();
////	pushVelocity = physicsObj.GetPushedLinearVelocity();
////
////	// set physics variables
////	physicsObj.SetMaxStepHeight( pm_stepsize.GetFloat() );
////	physicsObj.SetMaxJumpHeight( pm_jumpheight.GetFloat() );
////
////	if ( this.noclip ) {
////		physicsObj.SetContents( 0 );
////		physicsObj.SetMovementType( PM_NOCLIP );
////	} else if ( spectating ) {
////		physicsObj.SetContents( 0 );
////		physicsObj.SetMovementType( PM_SPECTATOR );
////	} else if ( health <= 0 ) {
////		physicsObj.SetContents( CONTENTS_CORPSE | CONTENTS_MONSTERCLIP );
////		physicsObj.SetMovementType( PM_DEAD );
////	} else if ( gameLocal.inCinematic || gameLocal.GetCamera() || privateCameraView || ( influenceActive == INFLUENCE_LEVEL2 ) ) {
////		physicsObj.SetContents( CONTENTS_BODY );
////		physicsObj.SetMovementType( PM_FREEZE );
////	} else {
////		physicsObj.SetContents( CONTENTS_BODY );
////		physicsObj.SetMovementType( PM_NORMAL );
////	}
////
////	if ( spectating ) {
////		physicsObj.SetClipMask( MASK_DEADSOLID );
////	} else if ( health <= 0 ) {
////		physicsObj.SetClipMask( MASK_DEADSOLID );
////	} else {
////		physicsObj.SetClipMask( MASK_PLAYERSOLID );
////	}
////
////	physicsObj.SetDebugLevel( g_debugMove.GetBool() );
////	physicsObj.SetPlayerInput( usercmd, this.viewAngles );
////
////	// FIXME: physics gets disabled somehow
////	BecomeActive( TH_PHYSICS );
////	RunPhysics();
////
////	// update our last valid AAS location for the AI
////	SetAASLocation();
////
////	if ( spectating ) {
////		newEyeOffset = 0.0;
////	} else if ( health <= 0 ) {
////		newEyeOffset = pm_deadviewheight.GetFloat();
////	} else if ( physicsObj.IsCrouching() ) {
////		newEyeOffset = pm_crouchviewheight.GetFloat();
////	} else if ( GetBindMaster() && GetBindMaster().IsType( idAFEntity_Vehicle::Type ) ) {
////		newEyeOffset = 0.0;
////	} else {
////		newEyeOffset = pm_normalviewheight.GetFloat();
////	}
////
////	if ( EyeHeight() != newEyeOffset ) {
////		if ( spectating ) {
////			SetEyeHeight( newEyeOffset );
////		} else {
////			// smooth out duck height changes
////			SetEyeHeight( EyeHeight() * pm_crouchrate.GetFloat() + newEyeOffset * ( 1.0f - pm_crouchrate.GetFloat() ) );
////		}
////	}
////
////	if ( this.noclip || gameLocal.inCinematic || ( influenceActive == INFLUENCE_LEVEL2 ) ) {
////		AI_CROUCH	= false;
////		AI_ONGROUND	= ( influenceActive == INFLUENCE_LEVEL2 );
////		AI_ONLADDER	= false;
////		AI_JUMP		= false;
////	} else {
////		AI_CROUCH	= physicsObj.IsCrouching();
////		AI_ONGROUND	= physicsObj.HasGroundContacts();
////		AI_ONLADDER	= physicsObj.OnLadder();
////		AI_JUMP		= physicsObj.HasJumped();
////
////		// check if we're standing on top of a monster and give a push if we are
////		idEntity *groundEnt = physicsObj.GetGroundEntity();
////		if ( groundEnt && groundEnt.IsType( idAI::Type ) ) {
////			idVec3 vel = physicsObj.GetLinearVelocity();
////			if ( vel.ToVec2().LengthSqr() < 0.1f ) {
////				vel.ToVec2() = physicsObj.GetOrigin().ToVec2() - groundEnt.GetPhysics().GetAbsBounds().GetCenter().ToVec2();
////				vel.ToVec2().NormalizeFast();
////				vel.ToVec2() *= pm_walkspeed.GetFloat();
////			} else {
////				// give em a push in the direction they're going
////				vel *= 1.1f;
////			}
////			physicsObj.SetLinearVelocity( vel );
////		}
////	}
////
////	if ( AI_JUMP ) {
////		// bounce the view weapon
//// 		loggedAccel_t	*acc = &this.loggedAccel[currentLoggedAccel&(NUM_LOGGED_ACCELS-1)];
////		currentLoggedAccel++;
////		acc.time = gameLocal.time;
////		acc.dir[2] = 200;
////		acc.dir[0] = acc.dir[1] = 0;
////	}
////
////	if ( AI_ONLADDER ) {
////		int old_rung = oldOrigin.z / LADDER_RUNG_DISTANCE;
////		int new_rung = physicsObj.GetOrigin().z / LADDER_RUNG_DISTANCE;
////
////		if ( old_rung != new_rung ) {
////			StartSound( "snd_stepladder", SND_CHANNEL_ANY, 0, false, NULL );
////		}
////	}
////
////	BobCycle( pushVelocity );
////	CrashLand( oldOrigin, oldVelocity );
////}
////
/////*
////==============
////idPlayer::UpdateHud
////==============
////*/
////void idPlayer::UpdateHud( ) {
////	idPlayer *aimed;
////
////	if ( !this.hud ) {
////		return;
////	}
////
////	if ( this.entityNumber != gameLocal.localClientNum ) {
////		return;
////	}
////
////	int c = this.inventory.pickupItemNames.Num();
////	if ( c > 0 ) {
////		if ( gameLocal.time > this.inventory.nextItemPickup ) {
////			if ( this.inventory.nextItemPickup && gameLocal.time - this.inventory.nextItemPickup > 2000 ) {
////				this.inventory.nextItemNum = 1;
////			}
////			var/*int*/i:number;
////			for ( i = 0; i < 5, i < c; i++ ) {
////				this.hud.SetStateString( va( "itemtext%i", this.inventory.nextItemNum ), this.inventory.pickupItemNames[0].name );
////				this.hud.SetStateString( va( "itemicon%i", this.inventory.nextItemNum ), this.inventory.pickupItemNames[0].icon );
////				this.hud.HandleNamedEvent( va( "itemPickup%i", this.inventory.nextItemNum++ ) );
////				this.inventory.pickupItemNames.RemoveIndex( 0 );
////				if (this.inventory.nextItemNum == 1 ) {
////					this.inventory.onePickupTime = gameLocal.time;
////				} else 	if ( this.inventory.nextItemNum > 5 ) {
////					this.inventory.nextItemNum = 1;
////					this.inventory.nextItemPickup = this.inventory.onePickupTime + 2000;
////				} else {
////					this.inventory.nextItemPickup = gameLocal.time + 400;
////				}
////			}
////		}
////	}
////
////	if ( gameLocal.realClientTime == lastMPAimTime ) {
////		if ( MPAim != -1 && gameLocal.gameType == GAME_TDM
////			&& gameLocal.entities[ MPAim ] && gameLocal.entities[ MPAim ].IsType( idPlayer::Type )
////			&& static_cast< idPlayer * >( gameLocal.entities[ MPAim ] ).team == team ) {
////				aimed = static_cast< idPlayer * >( gameLocal.entities[ MPAim ] );
////				this.hud.SetStateString( "aim_text", gameLocal.userInfo[ MPAim ].GetString( "ui_name" ) );
////				this.hud.SetStateFloat( "aim_color", aimed.colorBarIndex );
////				this.hud.HandleNamedEvent( "aim_flash" );
////				MPAimHighlight = true;
////				MPAimFadeTime = 0;	// no fade till loosing focus
////		} else if ( MPAimHighlight ) {
////			this.hud.HandleNamedEvent( "aim_fade" );
////			MPAimFadeTime = gameLocal.realClientTime;
////			MPAimHighlight = false;
////		}
////	}
////	if ( MPAimFadeTime ) {
////		assert( !MPAimHighlight );
////		if ( gameLocal.realClientTime - MPAimFadeTime > 2000 ) {
////			MPAimFadeTime = 0;
////		}
////	}
////
////	this.hud.SetStateInt( "g_showProjectilePct", g_showProjectilePct.GetInteger() );
////	if ( numProjectilesFired ) {
////		this.hud.SetStateString( "projectilepct", va( "Hit %% %.1f", ( (float) numProjectileHits / numProjectilesFired ) * 100 ) );
////	} else {
////		this.hud.SetStateString( "projectilepct", "Hit % 0.0" );
////	}
////
////	if ( isLagged && gameLocal.isMultiplayer && gameLocal.localClientNum == this.entityNumber ) {
////		this.hud.SetStateString( "hudLag", "1" );
////	} else {
////		this.hud.SetStateString( "hudLag", "0" );
////	}
////}
////
/////*
////==============
////idPlayer::UpdateDeathSkin
////==============
////*/
////void idPlayer::UpdateDeathSkin( bool state_hitch ) {
////	if ( !( gameLocal.isMultiplayer || g_testDeath.GetBool() ) ) {
////		return;
////	}
////	if ( health <= 0 ) {
////		if ( !doingDeathSkin ) {
////			deathClearContentsTime = spawnArgs.GetInt( "deathSkinTime" );
////			doingDeathSkin = true;
////			renderEntity.noShadow = true;
////			if ( state_hitch ) {
////				renderEntity.shaderParms[ SHADERPARM_TIME_OF_DEATH ] = gameLocal.time * 0.001f - 2.0f;
////			} else {
////				renderEntity.shaderParms[ SHADERPARM_TIME_OF_DEATH ] = gameLocal.time * 0.001f;
////			}
////			UpdateVisuals();
////		}
////
////		// wait a bit before switching off the content
////		if ( deathClearContentsTime && gameLocal.time > deathClearContentsTime ) {
////			SetCombatContents( false );
////			deathClearContentsTime = 0;
////		}
////	} else {
////		renderEntity.noShadow = false;
////		renderEntity.shaderParms[ SHADERPARM_TIME_OF_DEATH ] = 0.0;
////		UpdateVisuals();
////		doingDeathSkin = false;
////	}
////}
////
/////*
////==============
////idPlayer::StartFxOnBone
////==============
////*/
////void idPlayer::StartFxOnBone( const char *fx, const char *bone ) {
////	idVec3 offset;
////	idMat3 axis;
////	jointHandle_t jointHandle = GetAnimator().GetJointHandle( bone );
////
////	if ( jointHandle == jointHandle_t.INVALID_JOINT ) {
////		gameLocal.Printf( "Cannot find bone %s\n", bone );
////		return;
////	}
////
////	if ( GetAnimator().GetJointTransform( jointHandle, gameLocal.time, offset, axis ) ) {
////		offset = GetPhysics().GetOrigin() + offset * GetPhysics().GetAxis();
////		axis = axis * GetPhysics().GetAxis();
////	}
////
////	idEntityFx::StartFx( fx, &offset, &axis, this, true );
////}
////
/////*
////==============
////idPlayer::Think
////
////Called every tic for each player
////==============
////*/
	Think(): void {
		todoThrow();
////	renderEntity_t *headRenderEnt;
////
////	UpdatePlayerIcons();
////
////	// latch button actions
////	this.oldButtons = usercmd.buttons;
////
////	// grab out usercmd
////	usercmd_t oldCmd = usercmd;
////	usercmd = gameLocal.usercmds[ this.entityNumber ];
////	this.buttonMask &= usercmd.buttons;
////	usercmd.buttons &= ~this.buttonMask;
////
////	if ( gameLocal.inCinematic && gameLocal.skipCinematic ) {
////		return;
////	}
////
////	// clear the ik before we do anything else so the skeleton doesn't get updated twice
////	walkIK.ClearJointMods();
////	
////	// if this is the very first frame of the map, set the delta view angles
////	// based on the usercmd angles
////	if ( !this.spawnAnglesSet && ( gameLocal.GameState() != GAMESTATE_STARTUP ) ) {
////		this.spawnAnglesSet = true;
////		SetViewAngles( this.spawnAngles );
////		this.oldFlags = usercmd.flags;
////	}
////
////	if ( this.objectiveSystemOpen || gameLocal.inCinematic || influenceActive ) {
////		if ( this.objectiveSystemOpen && AI_PAIN ) {
////			TogglePDA();
////		}
////		usercmd.forwardmove = 0;
////		usercmd.rightmove = 0;
////		usercmd.upmove = 0;
////	}
////
////	// log movement changes for weapon bobbing effects
////	if ( usercmd.forwardmove != oldCmd.forwardmove ) {
////		loggedAccel_t	*acc = &this.loggedAccel[currentLoggedAccel&(NUM_LOGGED_ACCELS-1)];
////		currentLoggedAccel++;
////		acc.time = gameLocal.time;
////		acc.dir[0] = usercmd.forwardmove - oldCmd.forwardmove;
////		acc.dir[1] = acc.dir[2] = 0;
////	}
////
////	if ( usercmd.rightmove != oldCmd.rightmove ) {
////		loggedAccel_t	*acc = &this.loggedAccel[currentLoggedAccel&(NUM_LOGGED_ACCELS-1)];
////		currentLoggedAccel++;
////		acc.time = gameLocal.time;
////		acc.dir[1] = usercmd.rightmove - oldCmd.rightmove;
////		acc.dir[0] = acc.dir[2] = 0;
////	}
////
////	// freelook centering
////	if ( ( usercmd.buttons ^ oldCmd.buttons ) & BUTTON_MLOOK ) {
////		centerView.Init( gameLocal.time, 200, this.viewAngles.pitch, 0 );
////	}
////
////	// zooming
////	if ( ( usercmd.buttons ^ oldCmd.buttons ) & BUTTON_ZOOM ) {
////		if ( ( usercmd.buttons & BUTTON_ZOOM ) && this.weapon.GetEntity() ) {
////			zoomFov.Init( gameLocal.time, 200.0f, CalcFov( false ), this.weapon.GetEntity().GetZoomFov() );
////		} else {
////			zoomFov.Init( gameLocal.time, 200.0f, zoomFov.GetCurrentValue( gameLocal.time ), DefaultFov() );
////		}
////	}
////
////	// if we have an active gui, we will unrotate the view angles as
////	// we turn the mouse movements into gui events
////	idUserInterface *gui = ActiveGui();
////	if ( gui && gui != focusUI ) {
////		RouteGuiMouse( gui );
////	}
////
////	// set the push velocity on the weapon before running the physics
////	if ( this.weapon.GetEntity() ) {
////		this.weapon.GetEntity().SetPushVelocity( physicsObj.GetPushedLinearVelocity() );
////	}
////
////	EvaluateControls();
////
////	if ( !af.IsActive() ) {
////		AdjustBodyAngles();
////		CopyJointsFromBodyToHead();
////	}
////
////	Move();
////
////	if ( !g_stopTime.GetBool() ) {
////
////		if ( !this.noclip && !spectating && ( health > 0 ) && !IsHidden() ) {
////			TouchTriggers();
////		}
////
////		// not done on clients for various reasons. don't do it on server and save the sound channel for other things
////		if ( !gameLocal.isMultiplayer ) {
////			SetCurrentHeartRate();
////			float scale = g_damageScale.GetFloat();
////			if ( g_useDynamicProtection.GetBool() && scale < 1.0f && gameLocal.time - this.lastDmgTime > 500 ) {
////				if ( scale < 1.0f ) {
////					scale += 0.05f;
////				}
////				if ( scale > 1.0f ) {
////					scale = 1.0f;
////				}
////				g_damageScale.SetFloat( scale );
////			}
////		}
////
////		// update GUIs, Items, and character interactions
////		UpdateFocus();
////		
////		UpdateLocation();
////
////		// update player script
////		UpdateScript();
////
////		// service animations
////		if ( !spectating && !af.IsActive() && !gameLocal.inCinematic ) {
////    		UpdateConditions();
////			UpdateAnimState();
////			CheckBlink();
////		}
////
////		// clear out our pain flag so we can tell if we recieve any damage between now and the next time we think
////		AI_PAIN = false;
////	}
////
////	// calculate the exact bobbed view position, which is used to
////	// position the view weapon, among other things
////	CalculateFirstPersonView();
////
////	// this may use firstPersonView, or a thirdPeroson / camera view
////	CalculateRenderView();
////
////	this.inventory.UpdateArmor();
////
////	if ( spectating ) {
////		UpdateSpectating();
////	} else if ( health > 0 ) {
////		UpdateWeapon();
////	}
////
////	UpdateAir();
////	
////	UpdateHud();
////
////	UpdatePowerUps();
////
////	UpdateDeathSkin( false );
////
////	if ( gameLocal.isMultiplayer ) {
////		DrawPlayerIcons();
////	}
////
////	if ( head.GetEntity() ) {
////		headRenderEnt = head.GetEntity().GetRenderEntity();
////	} else {
////		headRenderEnt = NULL;
////	}
////
////	if ( headRenderEnt ) {
////		if ( influenceSkin ) {
////			headRenderEnt.customSkin = influenceSkin;
////		} else {
////			headRenderEnt.customSkin = NULL;
////		}
////	}
////
////	if ( gameLocal.isMultiplayer || g_showPlayerShadow.GetBool() ) {
////		renderEntity.suppressShadowInViewID	= 0;
////		if ( headRenderEnt ) {
////			headRenderEnt.suppressShadowInViewID = 0;
////		}
////	} else {
////		renderEntity.suppressShadowInViewID	= this.entityNumber+1;
////		if ( headRenderEnt ) {
////			headRenderEnt.suppressShadowInViewID = this.entityNumber+1;
////		}
////	}
////	// never cast shadows from our first-person muzzle flashes
////	renderEntity.suppressShadowInLightID = LIGHTID_VIEW_MUZZLE_FLASH + this.entityNumber;
////	if ( headRenderEnt ) {
////		headRenderEnt.suppressShadowInLightID = LIGHTID_VIEW_MUZZLE_FLASH + this.entityNumber;
////	}
////
////	if ( !g_stopTime.GetBool() ) {
////		UpdateAnimation();
////
////        Present();
////
////		UpdateDamageEffects();
////
////		LinkCombat();
////
////		playerView.CalculateShake();
////	}
////
////	if ( !( thinkFlags & TH_THINK ) ) {
////		gameLocal.Printf( "player %d not thinking?\n", this.entityNumber );
////	}
////
////	if ( g_showEnemies.GetBool() ) {
////		idActor *ent;
////		int num = 0;
////		for( ent = enemyList.Next(); ent != NULL; ent = ent.enemyNode.Next() ) {
////			gameLocal.Printf( "enemy (%d)'%s'\n", ent.entityNumber, ent.name.c_str() );
////			gameRenderWorld.DebugBounds( colorRed, ent.GetPhysics().GetBounds().Expand( 2 ), ent.GetPhysics().GetOrigin() );
////			num++;
////		}
////		gameLocal.Printf( "%d: enemies\n", num );
////	}
}
////
/////*
////=================
////idPlayer::RouteGuiMouse
////=================
////*/
////void idPlayer::RouteGuiMouse( idUserInterface *gui ) {
////	sysEvent_t ev;
////	const char *command;
////
////	if ( usercmd.mx != oldMouseX || usercmd.my != oldMouseY ) {
////		ev = sys.GenerateMouseMoveEvent( usercmd.mx - oldMouseX, usercmd.my - oldMouseY );
////		command = gui.HandleEvent( &ev, gameLocal.time );
////		oldMouseX = usercmd.mx;
////		oldMouseY = usercmd.my;
////	}
////}
////
/////*
////==================
////idPlayer::LookAtKiller
////==================
////*/
////void idPlayer::LookAtKiller( idEntity *inflictor, idEntity *attacker ) {
////	idVec3 dir;
////	
////	if ( attacker && attacker != this ) {
////		dir = attacker.GetPhysics().GetOrigin() - GetPhysics().GetOrigin();
////	} else if ( inflictor && inflictor != this ) {
////		dir = inflictor.GetPhysics().GetOrigin() - GetPhysics().GetOrigin();
////	} else {
////		dir = viewAxis[ 0 ];
////	}
////
////	idAngles ang( 0, dir.ToYaw(), 0 );
////	SetViewAngles( ang );
////}
////
/////*
////==============
////idPlayer::Kill
////==============
////*/
////void idPlayer::Kill( bool delayRespawn, bool nodamage ) {
////	if ( spectating ) {
////		SpectateFreeFly( false );
////	} else if ( health > 0 ) {
////		this.godmode = false;
////		if ( nodamage ) {
////			ServerSpectate( true );
////			forceRespawn = true;
////		} else {
////			Damage( this, this, vec3_origin, "damage_suicide", 1.0f, jointHandle_t.INVALID_JOINT );
////			if ( delayRespawn ) {
////				forceRespawn = false;
////				int delay = spawnArgs.GetFloat( "respawn_delay" );
////				minRespawnTime = gameLocal.time + SEC2MS( delay );
////				maxRespawnTime = minRespawnTime + MAX_RESPAWN_TIME;
////			}
////		}
////	}
////}
////
/////*
////==================
////idPlayer::Killed
////==================
////*/
////void idPlayer::Killed( idEntity *inflictor, idEntity *attacker, int damage, const idVec3 &dir, int location ) {
////	float delay;
////
////	assert( !gameLocal.isClient );
////
////	// stop taking knockback once dead
////	this.fl.noknockback = true;
////	if ( health < -999 ) {
////		health = -999;
////	}
////
////	if ( AI_DEAD ) {
////		AI_PAIN = true;
////		return;
////	}
////
////	this.heartInfo.Init( 0, 0, 0, BASE_HEARTRATE );
////	AdjustHeartRate( DEAD_HEARTRATE, 10.0f, 0.0, true );
////
////	if ( !g_testDeath.GetBool() ) {
////		playerView.Fade( colorBlack, 12000 );
////	}
////
////	AI_DEAD = true;
////	SetAnimState( ANIMCHANNEL_LEGS, "Legs_Death", 4 );
////	SetAnimState( ANIMCHANNEL_TORSO, "Torso_Death", 4 );
////	SetWaitState( "" );
////
////	animator.ClearAllJoints();
////
////	if ( StartRagdoll() ) {
////		pm_modelView.SetInteger( 0 );
////		minRespawnTime = gameLocal.time + RAGDOLL_DEATH_TIME;
////		maxRespawnTime = minRespawnTime + MAX_RESPAWN_TIME;
////	} else {
////		// don't allow respawn until the death anim is done
////		// g_forcerespawn may force spawning at some later time
////		delay = spawnArgs.GetFloat( "respawn_delay" );
////		minRespawnTime = gameLocal.time + SEC2MS( delay );
////		maxRespawnTime = minRespawnTime + MAX_RESPAWN_TIME;
////	}
////
////	physicsObj.SetMovementType( PM_DEAD );
////	StartSound( "snd_death", SND_CHANNEL_VOICE, 0, false, NULL );
////	StopSound( SND_CHANNEL_BODY2, false );
////
////	this.fl.takedamage = true;		// can still be gibbed
////
////	// get rid of weapon
////	this.weapon.GetEntity().OwnerDied();
////
////	// drop the weapon as an item
////	DropWeapon( true );
////
////	if ( !g_testDeath.GetBool() ) {
////		LookAtKiller( inflictor, attacker );
////	}
////
////	if ( gameLocal.isMultiplayer || g_testDeath.GetBool() ) {
////		idPlayer *killer = NULL;
////		// no gibbing in MP. Event_Gib will early out in MP
////		if ( attacker.IsType( idPlayer::Type ) ) {
////			killer = static_cast<idPlayer*>(attacker);
////			if ( health < -20 || killer.PowerUpActive( BERSERK ) ) {
////				gibDeath = true;
////				gibsDir = dir;
////				gibsLaunched = false;
////			}
////		}
////		gameLocal.mpGame.PlayerDeath( this, killer, isTelefragged );
////	} else {
////		physicsObj.SetContents( CONTENTS_CORPSE | CONTENTS_MONSTERCLIP );
////	}
////
////	ClearPowerUps();
////
////	UpdateVisuals();
////
////	isChatting = false;
////}
////
/////*
////=====================
////idPlayer::GetAIAimTargets
////
////Returns positions for the AI to aim at.
////=====================
////*/
////void idPlayer::GetAIAimTargets( const idVec3 &lastSightPos, idVec3 &headPos, idVec3 &chestPos ) {
////	idVec3 offset;
////	idMat3 axis;
////	idVec3 origin;
////	
////	origin = lastSightPos - physicsObj.GetOrigin();
////
////	GetJointWorldTransform( chestJoint, gameLocal.time, offset, axis );
////	headPos = offset + origin;
////
////	GetJointWorldTransform( headJoint, gameLocal.time, offset, axis );
////	chestPos = offset + origin;
////}
////
/////*
////================
////idPlayer::DamageFeedback
////
////callback function for when another entity received damage from this entity.  damage can be adjusted and returned to the caller.
////================
////*/
////void idPlayer::DamageFeedback( idEntity *victim, idEntity *inflictor, int &damage ) {
////	assert( !gameLocal.isClient );
////	damage *= PowerUpModifier( BERSERK );
////	if ( damage && ( victim != this ) && victim.IsType( idActor::Type ) ) {
////		SetLastHitTime( gameLocal.time );
////	}
////}
////
/////*
////=================
////idPlayer::CalcDamagePoints
////
////Calculates how many health and armor points will be inflicted, but
////doesn't actually do anything with them.  This is used to tell when an attack
////would have killed the player, possibly allowing a "saving throw"
////=================
////*/
////void idPlayer::CalcDamagePoints( idEntity *inflictor, idEntity *attacker, const idDict *damageDef,
////							   const float damageScale, const int location, int *health, int *armor ) {
////	int		damage;
////	int		armorSave;
////
////	damageDef.GetInt( "damage", "20", damage );
////	damage = GetDamageForLocation( damage, location );
////
////	idPlayer *player = attacker.IsType( idPlayer::Type ) ? static_cast<idPlayer*>(attacker) : NULL;
////	if ( !gameLocal.isMultiplayer ) {
////		if ( inflictor != gameLocal.world ) {
////			switch ( g_skill.GetInteger() ) {
////				case 0: 
////					damage *= 0.80f;
////					if ( damage < 1 ) {
////						damage = 1;
////					}
////					break;
////				case 2:
////					damage *= 1.70f;
////					break;
////				case 3:
////					damage *= 3.5f;
////					break;
////				default:
////					break;
////			}
////		}
////	}
////
////	damage *= damageScale;
////
////	// always give half damage if hurting self
////	if ( attacker == this ) {
////		if ( gameLocal.isMultiplayer ) {
////			// only do this in mp so single player plasma and rocket splash is very dangerous in close quarters
////			damage *= damageDef.GetFloat( "selfDamageScale", "0.5" );
////		} else {
////			damage *= damageDef.GetFloat( "selfDamageScale", "1" );
////		}
////	}
////
////	// check for completely getting out of the damage
////	if ( !damageDef.GetBool( "noGod" ) ) {
////		// check for this.godmode
////		if ( this.godmode ) {
////			damage = 0;
////		}
////	}
////
////	// inform the attacker that they hit someone
////	attacker.DamageFeedback( this, inflictor, damage );
////
////	// save some from armor
////	if ( !damageDef.GetBool( "noArmor" ) ) {
////		float armor_protection;
////
////		armor_protection = ( gameLocal.isMultiplayer ) ? g_armorProtectionMP.GetFloat() : g_armorProtection.GetFloat();
////
////		armorSave = ceil( damage * armor_protection );
////		if ( armorSave >= this.inventory.armor ) {
////			armorSave = this.inventory.armor;
////		}
////
////		if ( !damage ) {
////			armorSave = 0;
////		} else if ( armorSave >= damage ) {
////			armorSave = damage - 1;
////			damage = 1;
////		} else {
////			damage -= armorSave;
////		}
////	} else {
////		armorSave = 0;
////	}
////
////	// check for team damage
////	if ( gameLocal.gameType == GAME_TDM
////		&& !gameLocal.serverInfo.GetBool( "si_teamDamage" )
////		&& !damageDef.GetBool( "noTeam" )
////		&& player
////		&& player != this		// you get self damage no matter what
////		&& player.team == team ) {
////			damage = 0;
////	}
////
////	*health = damage;
////	*armor = armorSave;
////}
////
/////*
////============
////Damage
////
////this		entity that is being damaged
////inflictor	entity that is causing the damage
////attacker	entity that caused the inflictor to damage targ
////	example: this=monster, inflictor=rocket, attacker=player
////
////dir			direction of the attack for knockback in global space
////
////damageDef	an idDict with all the options for damage effects
////
////inflictor, attacker, dir, and point can be NULL for environmental effects
////============
////*/
////void idPlayer::Damage( idEntity *inflictor, idEntity *attacker, const idVec3 &dir,
////					   const char *damageDefName, const float damageScale, const int location ) {
////	idVec3		kick;
////	int			damage;
////	int			armorSave;
////	int			knockback;
////	idVec3		damage_from;
////	idVec3		localDamageVector;	
////	float		attackerPushScale;
////
////	// damage is only processed on server
////	if ( gameLocal.isClient ) {
////		return;
////	}
////	
////	if ( !this.fl.takedamage || this.noclip || spectating || gameLocal.inCinematic ) {
////		return;
////	}
////
////	if ( !inflictor ) {
////		inflictor = gameLocal.world;
////	}
////	if ( !attacker ) {
////		attacker = gameLocal.world;
////	}
////
////	if ( attacker.IsType( idAI::Type ) ) {
////		if ( PowerUpActive( BERSERK ) ) {
////			return;
////		}
////		// don't take damage from monsters during influences
////		if ( influenceActive != 0 ) {
////			return;
////		}
////	}
////
////	const idDeclEntityDef *damageDef = gameLocal.FindEntityDef( damageDefName, false );
////	if ( !damageDef ) {
////		gameLocal.Warning( "Unknown damageDef '%s'", damageDefName );
////		return;
////	}
////
////	if ( damageDef.dict.GetBool( "ignore_player" ) ) {
////		return;
////	}
////
////	CalcDamagePoints( inflictor, attacker, &damageDef.dict, damageScale, location, &damage, &armorSave );
////
////	// determine knockback
////	damageDef.dict.GetInt( "knockback", "20", knockback );
////
////	if ( knockback != 0 && !this.fl.noknockback ) {
////		if ( attacker == this ) {
////			damageDef.dict.GetFloat( "attackerPushScale", "0", attackerPushScale );
////		} else {
////			attackerPushScale = 1.0f;
////		}
////
////		kick = dir;
////		kick.Normalize();
////		kick *= g_knockback.GetFloat() * knockback * attackerPushScale / 200.0f;
////		physicsObj.SetLinearVelocity( physicsObj.GetLinearVelocity() + kick );
////
////		// set the timer so that the player can't cancel out the movement immediately
////		physicsObj.SetKnockBack( idMath::ClampInt( 50, 200, knockback * 2 ) );
////	}
////
////	// give feedback on the player view and audibly when armor is helping
////	if ( armorSave ) {
////		this.inventory.armor -= armorSave;
////
////		if ( gameLocal.time > lastArmorPulse + 200 ) {
////			StartSound( "snd_hitArmor", SND_CHANNEL_ITEM, 0, false, NULL );
////		}
////		lastArmorPulse = gameLocal.time;
////	}
////	
////	if ( damageDef.dict.GetBool( "burn" ) ) {
////		StartSound( "snd_burn", SND_CHANNEL_BODY3, 0, false, NULL );
////	} else if ( damageDef.dict.GetBool( "no_air" ) ) {
////		if ( !armorSave && health > 0 ) {
////			StartSound( "snd_airGasp", SND_CHANNEL_ITEM, 0, false, NULL );
////		}
////	}
////
////	if ( g_debugDamage.GetInteger() ) {
////		gameLocal.Printf( "client:%i health:%i damage:%i armor:%i\n", 
////			entityNumber, health, damage, armorSave );
////	}
////
////	// move the world direction vector to local coordinates
////	damage_from = dir;
////	damage_from.Normalize();
////	
////	viewAxis.ProjectVector( damage_from, localDamageVector );
////
////	// add to the damage inflicted on a player this frame
////	// the total will be turned into screen blends and view angle kicks
////	// at the end of the frame
////	if ( health > 0 ) {
////		playerView.DamageImpulse( localDamageVector, &damageDef.dict );
////	}
////
////	// do the damage
////	if ( damage > 0 ) {
////
////		if ( !gameLocal.isMultiplayer ) {
////			float scale = g_damageScale.GetFloat();
////			if ( g_useDynamicProtection.GetBool() && g_skill.GetInteger() < 2 ) {
////				if ( gameLocal.time > this.lastDmgTime + 500 && scale > 0.25f ) {
////					scale -= 0.05f;
////					g_damageScale.SetFloat( scale );
////				}
////			}
////
////			if ( scale > 0.0 ) {
////				damage *= scale;
////			}
////		}
////
////		if ( damage < 1 ) {
////			damage = 1;
////		}
////
////		//int oldHealth = health;
////		health -= damage;
////
////		if ( health <= 0 ) {
////
////			if ( health < -999 ) {
////				health = -999;
////			}
////
////			isTelefragged = damageDef.dict.GetBool( "telefrag" );
////
////			this.lastDmgTime = gameLocal.time;
////			Killed( inflictor, attacker, damage, dir, location );
////
////		} else {
////			// force a blink
////			blink_time = 0;
////
////			// let the anim script know we took damage
////			AI_PAIN = Pain( inflictor, attacker, damage, dir, location );
////			if ( !g_testDeath.GetBool() ) {
////				this.lastDmgTime = gameLocal.time;
////			}
////		}
////	} else {
////		// don't accumulate impulses
////		if ( af.IsLoaded() ) {
////			// clear impacts
////			af.Rest();
////
////			// physics is turned off by calling af.Rest()
////			BecomeActive( TH_PHYSICS );
////		}
////	}
////
////	lastDamageDef = damageDef.Index();
////	lastDamageDir = damage_from;
////	lastDamageLocation = location;
////}
////
/////*
////===========
////idPlayer::Teleport
////============
////*/
////void idPlayer::Teleport( const idVec3 &origin, angles:idAngles, idEntity *destination ) {
////	idVec3 org;
////
////	if ( this.weapon.GetEntity() ) {
////		this.weapon.GetEntity().LowerWeapon();
////	}
////
////	SetOrigin( origin + idVec3( 0, 0, CM_CLIP_EPSILON ) );
////	if ( !gameLocal.isMultiplayer && GetFloorPos( 16.0f, org ) ) {
////		SetOrigin( org );
////	}
////
////	// clear the ik heights so model doesn't appear in the wrong place
////	walkIK.EnableAll();
////
////	GetPhysics().SetLinearVelocity( vec3_origin );
////
////	SetViewAngles( angles );
////
////	legsYaw = 0.0;
////	idealLegsYaw = 0.0;
////	oldViewYaw = this.viewAngles.yaw;
////
////	if ( gameLocal.isMultiplayer ) {
////		playerView.Flash( colorWhite, 140 );
////	}
////
////	UpdateVisuals();
////
////	teleportEntity = destination;
////
////	if ( !gameLocal.isClient && !this.noclip ) {
////		if ( gameLocal.isMultiplayer ) {
////			// kill anything at the new position or mark for kill depending on immediate or delayed teleport
////			gameLocal.KillBox( this, destination != NULL );
////		} else {
////			// kill anything at the new position
////			gameLocal.KillBox( this, true );
////		}
////	}
////}
////
/////*
////====================
////idPlayer::SetPrivateCameraView
////====================
////*/
////void idPlayer::SetPrivateCameraView( idCamera *camView ) {
////	privateCameraView = camView;
////	if ( camView ) {
////		StopFiring();
////		Hide();
////	} else {
////		if ( !spectating ) {
////			Show();
////		}
////	}
////}
////
/////*
////====================
////idPlayer::DefaultFov
////
////Returns the base FOV
////====================
////*/
////float idPlayer::DefaultFov( ) const {
////	float fov;
////
////	fov = g_fov.GetFloat();
////	if ( gameLocal.isMultiplayer ) {
////		if ( fov < 90.0f ) {
////			return 90.0f;
////		} else if ( fov > 110.0f ) {
////			return 110.0f;
////		}
////	}
////
////	return fov;
////}
////
/////*
////====================
////idPlayer::CalcFov
////
////Fixed fov at intermissions, otherwise account for fov variable and zooms.
////====================
////*/
////float idPlayer::CalcFov( bool honorZoom ) {
////	float fov;
////
////	if ( fxFov ) {
////		return DefaultFov() + 10.0f + cos( ( gameLocal.time + 2000 ) * 0.01 ) * 10.0f;
////	}
////
////	if ( influenceFov ) {
////		return influenceFov;
////	}
////
////	if ( zoomFov.IsDone( gameLocal.time ) ) {
////		fov = ( honorZoom && usercmd.buttons & BUTTON_ZOOM ) && this.weapon.GetEntity() ? this.weapon.GetEntity().GetZoomFov() : DefaultFov();
////	} else {
////		fov = zoomFov.GetCurrentValue( gameLocal.time );
////	}
////
////	// bound normal viewsize
////	if ( fov < 1 ) {
////		fov = 1;
////	} else if ( fov > 179 ) {
////		fov = 179;
////	}
////
////	return fov;
////}
////
/////*
////==============
////idPlayer::GunTurningOffset
////
////generate a rotational offset for the gun based on the view angle
////history in loggedViewAngles
////==============
////*/
////idAngles idPlayer::GunTurningOffset( ) {
////	idAngles	a;
////
////	a.Zero();
////
////	if ( gameLocal.framenum < NUM_LOGGED_VIEW_ANGLES ) {
////		return a;
////	}
////
////	idAngles current = loggedViewAngles[ gameLocal.framenum & (NUM_LOGGED_VIEW_ANGLES-1) ];
////
////	idAngles	av, base;
////	int weaponAngleOffsetAverages;
////	float weaponAngleOffsetScale, weaponAngleOffsetMax;
////
////	this.weapon.GetEntity().GetWeaponAngleOffsets( &weaponAngleOffsetAverages, &weaponAngleOffsetScale, &weaponAngleOffsetMax );
////
////	av = current;
////
////	// calcualte this so the wrap arounds work properly
////	for ( int j = 1 ; j < weaponAngleOffsetAverages ; j++ ) {
////		idAngles a2 = loggedViewAngles[ ( gameLocal.framenum - j ) & (NUM_LOGGED_VIEW_ANGLES-1) ];
////
////		idAngles delta = a2 - current;
////
////		if ( delta[1] > 180 ) {
////			delta[1] -= 360;
////		} else if ( delta[1] < -180 ) {
////			delta[1] += 360;
////		}
////
////		av += delta * ( 1.0f / weaponAngleOffsetAverages );
////	}
////
////	a = ( av - current ) * weaponAngleOffsetScale;
////
////	for ( int i = 0 ; i < 3 ; i++ ) {
////		if ( a[i] < -weaponAngleOffsetMax ) {
////			a[i] = -weaponAngleOffsetMax;
////		} else if ( a[i] > weaponAngleOffsetMax ) {
////			a[i] = weaponAngleOffsetMax;
////		}
////	}
////
////	return a;
////}
////
/////*
////==============
////idPlayer::GunAcceleratingOffset
////
////generate a positional offset for the gun based on the movement
////history in loggedAccelerations
////==============
////*/
////idVec3	idPlayer::GunAcceleratingOffset( ) {
////	idVec3	ofs;
////
////	float weaponOffsetTime, weaponOffsetScale;
////
////	ofs.Zero();
////
////	this.weapon.GetEntity().GetWeaponTimeOffsets( &weaponOffsetTime, &weaponOffsetScale );
////
////	int stop = currentLoggedAccel - NUM_LOGGED_ACCELS;
////	if ( stop < 0 ) {
////		stop = 0;
////	}
////	for ( int i = currentLoggedAccel-1 ; i > stop ; i-- ) {
////		loggedAccel_t	*acc = &this.loggedAccel[i&(NUM_LOGGED_ACCELS-1)];
////
////		float	f;
////		float	t = gameLocal.time - acc.time;
////		if ( t >= weaponOffsetTime ) {
////			break;	// remainder are too old to care about
////		}
////
////		f = t / weaponOffsetTime;
////		f = ( cos( f * 2.0f * idMath::PI ) - 1.0f ) * 0.5f;
////		ofs += f * weaponOffsetScale * acc.dir;
////	}
////
////	return ofs;
////}
////
/////*
////==============
////idPlayer::CalculateViewWeaponPos
////
////Calculate the bobbing position of the view weapon
////==============
////*/
////void idPlayer::CalculateViewWeaponPos( idVec3 &origin, idMat3 &axis ) {
////	float		scale;
////	float		fracsin;
////	idAngles	angles;
////	int			delta;
////
////	// CalculateRenderView must have been called first
////	const idVec3 &viewOrigin = firstPersonViewOrigin;
////	const idMat3 &viewAxis = firstPersonViewAxis;
////
////	// these cvars are just for hand tweaking before moving a value to the weapon def
////	idVec3	gunpos( g_gun_x.GetFloat(), g_gun_y.GetFloat(), g_gun_z.GetFloat() );
////
////	// as the player changes direction, the gun will take a small lag
////	idVec3	gunOfs = GunAcceleratingOffset();
////	origin = viewOrigin + ( gunpos + gunOfs ) * viewAxis;
////
////	// on odd legs, invert some angles
////	if ( bobCycle & 128 ) {
////		scale = -xyspeed;
////	} else {
////		scale = xyspeed;
////	}
////
////	// gun angles from bobbing
////	angles.roll		= scale * bobfracsin * 0.005f;
////	angles.yaw		= scale * bobfracsin * 0.01f;
////	angles.pitch	= xyspeed * bobfracsin * 0.005f;
////
////	// gun angles from turning
////	if ( gameLocal.isMultiplayer ) {
////		idAngles offset = GunTurningOffset();
////		offset *= g_mpWeaponAngleScale.GetFloat();
////		angles += offset;
////	} else {
////		angles += GunTurningOffset();
////	}
////
////	idVec3 gravity = physicsObj.GetGravityNormal();
////
////	// drop the weapon when landing after a jump / fall
////	delta = gameLocal.time - landTime;
////	if ( delta < LAND_DEFLECT_TIME ) {
////		origin -= gravity * ( landChange*0.25f * delta / LAND_DEFLECT_TIME );
////	} else if ( delta < LAND_DEFLECT_TIME + LAND_RETURN_TIME ) {
////		origin -= gravity * ( landChange*0.25f * (LAND_DEFLECT_TIME + LAND_RETURN_TIME - delta) / LAND_RETURN_TIME );
////	}
////
////	// speed sensitive idle drift
////	scale = xyspeed + 40.0f;
////	fracsin = scale * sin( MS2SEC( gameLocal.time ) ) * 0.01f;
////	angles.roll		+= fracsin;
////	angles.yaw		+= fracsin;
////	angles.pitch	+= fracsin;
////
////	axis = angles.ToMat3() * viewAxis;
////}
////
/////*
////===============
////idPlayer::OffsetThirdPersonView
////===============
////*/
////void idPlayer::OffsetThirdPersonView( /*float*/angle:number, float range, float height, bool clip ) {
////	idVec3			view;
////	idVec3			focusAngles;
////	trace_t			trace;
////	idVec3			focusPoint;
////	float			focusDist;
////	float			forwardScale, sideScale;
////	idVec3			origin;
////	idAngles		angles;
////	idMat3			axis;
////	idBounds		bounds;
////
////	angles = this.viewAngles;
////	GetViewPos( origin, axis );
////
////	if ( angle ) {
////		angles.pitch = 0.0;
////	}
////
////	if ( angles.pitch > 45.0f ) {
////		angles.pitch = 45.0f;		// don't go too far overhead
////	}
////
////	focusPoint = origin + angles.ToForward() * THIRD_PERSON_FOCUS_DISTANCE;
////	focusPoint.z += height;
////	view = origin;
////	view.z += 8 + height;
////
////	angles.pitch *= 0.5f;
////	renderView.viewaxis = angles.ToMat3() * physicsObj.GetGravityAxis();
////
////	idMath::SinCos( DEG2RAD( angle ), sideScale, forwardScale );
////	view -= range * forwardScale * renderView.viewaxis[ 0 ];
////	view += range * sideScale * renderView.viewaxis[ 1 ];
////
////	if ( clip ) {
////		// trace a ray from the origin to the viewpoint to make sure the view isn't
////		// in a solid block.  Use an 8 by 8 block to prevent the view from near clipping anything
////		bounds = idBounds( idVec3( -4, -4, -4 ), idVec3( 4, 4, 4 ) );
////		gameLocal.clip.TraceBounds( trace, origin, view, bounds, MASK_SOLID, this );
////		if ( trace.fraction != 1.0f ) {
////			view = trace.endpos;
////			view.z += ( 1.0f - trace.fraction ) * 32.0f;
////
////			// try another trace to this position, because a tunnel may have the ceiling
////			// close enough that this is poking out
////			gameLocal.clip.TraceBounds( trace, origin, view, bounds, MASK_SOLID, this );
////			view = trace.endpos;
////		}
////	}
////
////	// select pitch to look at focus point from vieword
////	focusPoint -= view;
////	focusDist = idMath::Sqrt( focusPoint[0] * focusPoint[0] + focusPoint[1] * focusPoint[1] );
////	if ( focusDist < 1.0f ) {
////		focusDist = 1.0f;	// should never happen
////	}
////
////	angles.pitch = - RAD2DEG( atan2( focusPoint.z, focusDist ) );
////	angles.yaw -= angle;
////
////	renderView.vieworg = view;
////	renderView.viewaxis = angles.ToMat3() * physicsObj.GetGravityAxis();
////	renderView.viewID = 0;
////}
////
/////*
////===============
////idPlayer::GetEyePosition
////===============
////*/
////idVec3 idPlayer::GetEyePosition( ) const {
////	idVec3 org;
//// 
////	// use the smoothed origin if spectating another player in multiplayer
////	if ( gameLocal.isClient && this.entityNumber != gameLocal.localClientNum ) {
////		org = smoothedOrigin;
////	} else {
////		org = GetPhysics().GetOrigin();
////	}
////	return org + ( GetPhysics().GetGravityNormal() * -eyeOffset.z );
////}
////
/////*
////===============
////idPlayer::GetViewPos
////===============
////*/
////void idPlayer::GetViewPos( idVec3 &origin, idMat3 &axis ) const {
////	var angles = new idAngles;
////
////	// if dead, fix the angle and don't add any kick
////	if ( health <= 0 ) {
////		angles.yaw = this.viewAngles.yaw;
////		angles.roll = 40;
////		angles.pitch = -15;
////		axis = angles.ToMat3();
////		origin = GetEyePosition();
////	} else {
////		origin = GetEyePosition() + viewBob;
////		angles = this.viewAngles + viewBobAngles + playerView.AngleOffset();
////
////		axis = angles.ToMat3() * physicsObj.GetGravityAxis();
////
////		// adjust the origin based on the camera nodal distance (eye distance from neck)
////		origin += physicsObj.GetGravityNormal() * g_viewNodalZ.GetFloat();
////		origin += axis[0] * g_viewNodalX.GetFloat() + axis[2] * g_viewNodalZ.GetFloat();
////	}
////}
////
/////*
////===============
////idPlayer::CalculateFirstPersonView
////===============
////*/
////void idPlayer::CalculateFirstPersonView( ) {
////	if ( ( pm_modelView.GetInteger() == 1 ) || ( ( pm_modelView.GetInteger() == 2 ) && ( health <= 0 ) ) ) {
////		//	Displays the view from the point of view of the "camera" joint in the player model
////
////		idMat3 axis;
////		idVec3 origin;
////		idAngles ang;
////
////		ang = viewBobAngles + playerView.AngleOffset();
////		ang.yaw += viewAxis[ 0 ].ToYaw();
////		
////		jointHandle_t joint = animator.GetJointHandle( "camera" );
////		animator.GetJointTransform( joint, gameLocal.time, origin, axis );
////		firstPersonViewOrigin = ( origin + modelOffset ) * ( viewAxis * physicsObj.GetGravityAxis() ) + physicsObj.GetOrigin() + viewBob;
////		firstPersonViewAxis = axis * ang.ToMat3() * physicsObj.GetGravityAxis();
////	} else {
////		// offset for local bobbing and kicks
////		GetViewPos( firstPersonViewOrigin, firstPersonViewAxis );
////#if 0
////		// shakefrom sound stuff only happens in first person
////		firstPersonViewAxis = firstPersonViewAxis * playerView.ShakeAxis();
////#endif
////	}
////}
////
/////*
////==================
////idPlayer::GetRenderView
////
////Returns the renderView that was calculated for this tic
////==================
////*/
	GetRenderView ( ): renderView_t {
		return this.renderView;
	}

/////*
////==================
////idPlayer::CalculateRenderView
////
////create the renderView for the current tic
////==================
////*/
////void idPlayer::CalculateRenderView( ) {
////	var/*int*/i:number;
////	float range;
////
////	if ( !renderView ) {
////		renderView = new renderView_t;
////	}
////	memset( renderView, 0, sizeof( *renderView ) );
////
////	// copy global shader parms
////	for( i = 0; i < MAX_GLOBAL_SHADER_PARMS; i++ ) {
////		renderView.shaderParms[ i ] = gameLocal.globalShaderParms[ i ];
////	}
////	renderView.globalMaterial = gameLocal.GetGlobalMaterial();
////	renderView.time = gameLocal.time;
////
////	// calculate size of 3D view
////	renderView.x = 0;
////	renderView.y = 0;
////	renderView.width = SCREEN_WIDTH;
////	renderView.height = SCREEN_HEIGHT;
////	renderView.viewID = 0;
////
////	// check if we should be drawing from a camera's POV
////	if ( !this.noclip && (gameLocal.GetCamera() || privateCameraView) ) {
////		// get origin, axis, and fov
////		if ( privateCameraView ) {
////			privateCameraView.GetViewParms( renderView );
////		} else {
////			gameLocal.GetCamera().GetViewParms( renderView );
////		}
////	} else {
////		if ( g_stopTime.GetBool() ) {
////			renderView.vieworg = firstPersonViewOrigin;
////			renderView.viewaxis = firstPersonViewAxis;
////
////			if ( !pm_thirdPerson.GetBool() ) {
////				// set the viewID to the clientNum + 1, so we can suppress the right player bodies and
////				// allow the right player view weapons
////				renderView.viewID = this.entityNumber + 1;
////			}
////		} else if ( pm_thirdPerson.GetBool() ) {
////			OffsetThirdPersonView( pm_thirdPersonAngle.GetFloat(), pm_thirdPersonRange.GetFloat(), pm_thirdPersonHeight.GetFloat(), pm_thirdPersonClip.GetBool() );
////		} else if ( pm_thirdPersonDeath.GetBool() ) {
////			range = gameLocal.time < minRespawnTime ? ( gameLocal.time + RAGDOLL_DEATH_TIME - minRespawnTime ) * ( 120.0f / RAGDOLL_DEATH_TIME ) : 120.0f;
////			OffsetThirdPersonView( 0.0, 20.0f + range, 0.0, false );
////		} else {
////			renderView.vieworg = firstPersonViewOrigin;
////			renderView.viewaxis = firstPersonViewAxis;
////
////			// set the viewID to the clientNum + 1, so we can suppress the right player bodies and
////			// allow the right player view weapons
////			renderView.viewID = this.entityNumber + 1;
////		}
////		
////		// field of view
////		gameLocal.CalcFov( CalcFov( true ), renderView.fov_x, renderView.fov_y );
////	}
////
////	if ( renderView.fov_y == 0 ) {
////		common.Error( "renderView.fov_y == 0" );
////	}
////
////	if ( g_showviewpos.GetBool() ) {
////		gameLocal.Printf( "%s : %s\n", renderView.vieworg.ToString(), renderView.viewaxis.ToAngles().ToString() );
////	}
////}
////
/////*
////=============
////idPlayer::AddAIKill
////=============
////*/
////void idPlayer::AddAIKill( ) {
////	int max_souls;
////	int ammo_souls;
////
////	if ( ( this.weapon_soulcube < 0 ) || ( this.inventory.weapons & ( 1 << this.weapon_soulcube ) ) == 0 ) {
////		return;
////	}
////
////	assert( this.hud );
////
////	ammo_souls = idWeapon::GetAmmoNumForName( "ammo_souls" );
////	max_souls = this.inventory.MaxAmmoForAmmoClass( this, "ammo_souls" );
////	if ( this.inventory.ammo[ ammo_souls ] < max_souls ) {
////		this.inventory.ammo[ ammo_souls ]++;
////		if ( this.inventory.ammo[ ammo_souls ] >= max_souls ) {
////			this.hud.HandleNamedEvent( "soulCubeReady" );
////			StartSound( "snd_soulcube_ready", SND_CHANNEL_ANY, 0, false, NULL );
////		}
////	}
////}
////
/////*
////=============
////idPlayer::SetSoulCubeProjectile
////=============
////*/
////void idPlayer::SetSoulCubeProjectile( idProjectile *projectile ) {
////	soulCubeProjectile = projectile;
////}
////
/////*
////=============
////idPlayer::AddProjectilesFired
////=============
////*/
////void idPlayer::AddProjectilesFired( int count ) {
////	numProjectilesFired += count;
////}
////
/////*
////=============
////idPlayer::AddProjectileHites
////=============
////*/
////void idPlayer::AddProjectileHits( int count ) {
////	numProjectileHits += count;
////}
////
/////*
////=============
////idPlayer::SetLastHitTime
////=============
////*/
////void idPlayer::SetLastHitTime( /*int*/time:number ) {
////	idPlayer *aimed = NULL;
////
////	if ( time && this.lastHitTime != time ) {
////		lastHitToggle ^= 1;
////	}
////	this.lastHitTime = time;
////	if ( !time ) {
////		// level start and inits
////		return;
////	}
////	if ( gameLocal.isMultiplayer && ( time - this.lastSndHitTime ) > 10 ) {
////		this.lastSndHitTime = time;
////		StartSound( "snd_hit_feedback", SND_CHANNEL_ANY, SSF_PRIVATE_SOUND, false, NULL );
////	}
////	if ( cursor ) {
////		cursor.HandleNamedEvent( "hitTime" );
////	}
////	if ( this.hud ) {
////		if ( MPAim != -1 ) {
////			if ( gameLocal.entities[ MPAim ] && gameLocal.entities[ MPAim ].IsType( idPlayer::Type ) ) {
////				aimed = static_cast< idPlayer * >( gameLocal.entities[ MPAim ] );
////			}
////			assert( aimed );
////			// full highlight, no fade till loosing aim
////			this.hud.SetStateString( "aim_text", gameLocal.userInfo[ MPAim ].GetString( "ui_name" ) );
////			if ( aimed ) {
////				this.hud.SetStateFloat( "aim_color", aimed.colorBarIndex );
////			}
////			this.hud.HandleNamedEvent( "aim_flash" );
////			MPAimHighlight = true;
////			MPAimFadeTime = 0;
////		} else if ( lastMPAim != -1 ) {
////			if ( gameLocal.entities[ lastMPAim ] && gameLocal.entities[ lastMPAim ].IsType( idPlayer::Type ) ) {
////				aimed = static_cast< idPlayer * >( gameLocal.entities[ lastMPAim ] );
////			}
////			assert( aimed );
////			// start fading right away
////			this.hud.SetStateString( "aim_text", gameLocal.userInfo[ lastMPAim ].GetString( "ui_name" ) );
////			if ( aimed ) {
////				this.hud.SetStateFloat( "aim_color", aimed.colorBarIndex );
////			}
////			this.hud.HandleNamedEvent( "aim_flash" );
////			this.hud.HandleNamedEvent( "aim_fade" );
////			MPAimHighlight = false;
////			MPAimFadeTime = gameLocal.realClientTime;
////		}
////	}
////}
////
/////*
////=============
////idPlayer::SetInfluenceLevel
////=============
////*/
////void idPlayer::SetInfluenceLevel( int level ) {
////	if ( level != influenceActive ) {
////		if ( level ) {
////			for ( var ent:idEntity = gameLocal.spawnedEntities.Next(); ent != NULL; ent = ent.spawnNode.Next() ) {
////				if ( ent.IsType( idProjectile::Type ) ) {
////					// remove all projectiles
////					ent.PostEventMS( &EV_Remove, 0 );
////				}
////			}
////			if ( weaponEnabled && this.weapon.GetEntity() ) {
////				this.weapon.GetEntity().EnterCinematic();
////			}
////		} else {
////			physicsObj.SetLinearVelocity( vec3_origin );
////			if ( weaponEnabled && this.weapon.GetEntity() ) {
////				this.weapon.GetEntity().ExitCinematic();
////			}
////		}
////		influenceActive = level;
////	}
////}
////
/////*
////=============
////idPlayer::SetInfluenceView
////=============
////*/
////void idPlayer::SetInfluenceView( const char *mtr, const char *skinname, float radius, ent:idEntity ) {
////	influenceMaterial = NULL;
////	influenceEntity = NULL;
////	influenceSkin = NULL;
////	if ( mtr && *mtr ) {
////		influenceMaterial = declManager.FindMaterial( mtr );
////	}
////	if ( skinname && *skinname ) {
////		influenceSkin = declManager.FindSkin( skinname );
////		if ( head.GetEntity() ) {
////			head.GetEntity().GetRenderEntity().shaderParms[ SHADERPARM_TIMEOFFSET ] = -MS2SEC( gameLocal.time );
////		}
////		UpdateVisuals();
////	}
////	influenceRadius = radius;
////	if ( radius > 0.0 ) {
////		influenceEntity = ent;
////	}
////}
////
/////*
////=============
////idPlayer::SetInfluenceFov
////=============
////*/
////void idPlayer::SetInfluenceFov( float fov ) {
////	influenceFov = fov;
////}
////
/////*
////================
////idPlayer::OnLadder
////================
////*/
////bool idPlayer::OnLadder( ) const {
////	return physicsObj.OnLadder();
////}
////
/////*
////==================
////idPlayer::Event_GetButtons
////==================
////*/
////void idPlayer::Event_GetButtons( ) {
////	idThread::ReturnInt( usercmd.buttons );
////}
////
/////*
////==================
////idPlayer::Event_GetMove
////==================
////*/
////void idPlayer::Event_GetMove( ) {
////	idVec3 move( usercmd.forwardmove, usercmd.rightmove, usercmd.upmove );
////	idThread::ReturnVector( move );
////}
////
/////*
////================
////idPlayer::Event_GetViewAngles
////================
////*/
////void idPlayer::Event_GetViewAngles( ) {
////	idThread::ReturnVector( idVec3( this.viewAngles[0], this.viewAngles[1], this.viewAngles[2] ) );
////}
////
/////*
////==================
////idPlayer::Event_StopFxFov
////==================
////*/
////void idPlayer::Event_StopFxFov( ) {
////	fxFov = false;
////}
////
/////*
////==================
////idPlayer::StartFxFov 
////==================
////*/
////void idPlayer::StartFxFov( float duration ) { 
////	fxFov = true;
////	PostEventSec( &EV_Player_StopFxFov, duration );
////}
////
/////*
////==================
////idPlayer::Event_EnableWeapon 
////==================
////*/
////void idPlayer::Event_EnableWeapon( ) {
////	hiddenWeapon = gameLocal.world.spawnArgs.GetBool( "no_Weapons" );
////	weaponEnabled = true;
////	if ( this.weapon.GetEntity() ) {
////		this.weapon.GetEntity().ExitCinematic();
////	}
////}
////
/////*
////==================
////idPlayer::Event_DisableWeapon
////==================
////*/
////void idPlayer::Event_DisableWeapon( ) {
////	hiddenWeapon = gameLocal.world.spawnArgs.GetBool( "no_Weapons" );
////	weaponEnabled = false;
////	if ( this.weapon.GetEntity() ) {
////		this.weapon.GetEntity().EnterCinematic();
////	}
////}
////
/////*
////==================
////idPlayer::Event_GetCurrentWeapon
////==================
////*/
////void idPlayer::Event_GetCurrentWeapon( ) {
////	const char *weapon;
////
////	if ( currentWeapon >= 0 ) {
////		weapon = spawnArgs.GetString( va( "def_weapon%d", currentWeapon ) );
////		idThread::ReturnString( weapon );
////	} else {
////		idThread::ReturnString( "" );
////	}
////}
////
/////*
////==================
////idPlayer::Event_GetPreviousWeapon
////==================
////*/
////void idPlayer::Event_GetPreviousWeapon( ) {
////	const char *weapon;
////
////	if ( previousWeapon >= 0 ) {
////		int pw = ( gameLocal.world.spawnArgs.GetBool( "no_Weapons" ) ) ? 0 : previousWeapon;
////		weapon = spawnArgs.GetString( va( "def_weapon%d", pw) );
////		idThread::ReturnString( weapon );
////	} else {
////		idThread::ReturnString( spawnArgs.GetString( "def_weapon0" ) );
////	}
////}
////
/////*
////==================
////idPlayer::Event_SelectWeapon
////==================
////*/
////void idPlayer::Event_SelectWeapon( const char *weaponName ) {
////	var/*int*/i:number;
////	int weaponNum;
////
////	if ( gameLocal.isClient ) {
////		gameLocal.Warning( "Cannot switch weapons from script in multiplayer" );
////		return;
////	}
////
////	if ( hiddenWeapon && gameLocal.world.spawnArgs.GetBool( "no_Weapons" ) ) {
////		idealWeapon = this.weapon_fists;
////		this.weapon.GetEntity().HideWeapon();
////		return;
////	}
////
////	weaponNum = -1;
////	for( i = 0; i < MAX_WEAPONS; i++ ) {
////		if ( this.inventory.weapons & ( 1 << i ) ) {
////			const char *weap = spawnArgs.GetString( va( "def_weapon%d", i ) );
////			if ( !idStr::Cmp( weap, weaponName ) ) {
////				weaponNum = i;
////				break;
////			}
////		}
////	}
////
////	if ( weaponNum < 0 ) {
////		gameLocal.Warning( "%s is not carrying weapon '%s'", name.c_str(), weaponName );
////		return;
////	}
////
////	hiddenWeapon = false;
////	idealWeapon = weaponNum;
////
////	UpdateHudWeapon();
////}
////
/////*
////==================
////idPlayer::Event_GetWeaponEntity
////==================
////*/
////void idPlayer::Event_GetWeaponEntity( ) {
////	idThread::ReturnEntity( this.weapon.GetEntity() );
////}
////
/////*
////==================
////idPlayer::Event_OpenPDA
////==================
////*/
////void idPlayer::Event_OpenPDA( ) {
////	if ( !gameLocal.isMultiplayer ) {
////		TogglePDA();
////	}
////}
////
/////*
////==================
////idPlayer::Event_InPDA
////==================
////*/
////void idPlayer::Event_InPDA( ) {
////	idThread::ReturnInt( this.objectiveSystemOpen );
////}
////
/////*
////==================
////idPlayer::TeleportDeath
////==================
////*/
////void idPlayer::TeleportDeath( int killer ) {
////	teleportKiller = killer;
////}
////
/////*
////==================
////idPlayer::Event_ExitTeleporter
////==================
////*/
////void idPlayer::Event_ExitTeleporter( ) {
////	idEntity	*exitEnt;
////	float		pushVel;
////
////	// verify and setup
////	exitEnt = teleportEntity.GetEntity();
////	if ( !exitEnt ) {
////		common.DPrintf( "Event_ExitTeleporter player %d while not being teleported\n", this.entityNumber );
////		return;
////	}
////
////	pushVel = exitEnt.spawnArgs.GetFloat( "push", "300" );
////
////	if ( gameLocal.isServer ) {
////		ServerSendEvent( EVENT_EXIT_TELEPORTER, NULL, false, -1 );
////	}
////
////	SetPrivateCameraView( NULL );
////	// setup origin and push according to the exit target
////	SetOrigin( exitEnt.GetPhysics().GetOrigin() + idVec3( 0, 0, CM_CLIP_EPSILON ) );
////	SetViewAngles( exitEnt.GetPhysics().GetAxis().ToAngles() );
////	physicsObj.SetLinearVelocity( exitEnt.GetPhysics().GetAxis()[ 0 ] * pushVel );
////	physicsObj.ClearPushedVelocity();
////	// teleport fx
////	playerView.Flash( colorWhite, 120 );
////
////	// clear the ik heights so model doesn't appear in the wrong place
////	walkIK.EnableAll();
////
////	UpdateVisuals();
////
////	StartSound( "snd_teleport_exit", SND_CHANNEL_ANY, 0, false, NULL );
////
////	if ( teleportKiller != -1 ) {
////		// we got killed while being teleported
////		Damage( gameLocal.entities[ teleportKiller ], gameLocal.entities[ teleportKiller ], vec3_origin, "damage_telefrag", 1.0f, jointHandle_t.INVALID_JOINT );
////		teleportKiller = -1;
////	} else {
////		// kill anything that would have waited at teleport exit
////		gameLocal.KillBox( this );
////	}
////	teleportEntity = NULL;
////}
////
/////*
////================
////idPlayer::ClientPredictionThink
////================
////*/
////void idPlayer::ClientPredictionThink( ) {
////	renderEntity_t *headRenderEnt;
////
////	this.oldFlags = usercmd.flags;
////	this.oldButtons = usercmd.buttons;
////
////	usercmd = gameLocal.usercmds[ this.entityNumber ];
////
////	if ( this.entityNumber != gameLocal.localClientNum ) {
////		// ignore attack button of other clients. that's no good for predictions
////		usercmd.buttons &= ~BUTTON_ATTACK;
////	}
////
////	this.buttonMask &= usercmd.buttons;
////	usercmd.buttons &= ~this.buttonMask;
////
////	if ( this.objectiveSystemOpen ) {
////		usercmd.forwardmove = 0;
////		usercmd.rightmove = 0;
////		usercmd.upmove = 0;
////	}
////
////	// clear the ik before we do anything else so the skeleton doesn't get updated twice
////	walkIK.ClearJointMods();
////
////	if ( gameLocal.isNewFrame ) {
////		if ( ( usercmd.flags & UCF_IMPULSE_SEQUENCE ) != ( this.oldFlags & UCF_IMPULSE_SEQUENCE ) ) {
////			PerformImpulse( usercmd.impulse );
////		}
////	}
////
////	scoreBoardOpen = ( ( usercmd.buttons & BUTTON_SCORES ) != 0 || forceScoreBoard );
////
////	AdjustSpeed();
////
////	UpdateViewAngles();
////
////	// update the smoothed view angles
////	if ( gameLocal.framenum >= smoothedFrame && this.entityNumber != gameLocal.localClientNum ) {
////		idAngles anglesDiff = this.viewAngles - smoothedAngles;
////		anglesDiff.Normalize180();
////		if ( idMath::Fabs( anglesDiff.yaw ) < 90.0f && idMath::Fabs( anglesDiff.pitch ) < 90.0f ) {
////			// smoothen by pushing back to the previous angles
////			this.viewAngles -= gameLocal.clientSmoothing * anglesDiff;
////			this.viewAngles.Normalize180();
////		}
////		smoothedAngles = this.viewAngles;
////	}
////	smoothedOriginUpdated = false;
////
////	if ( !af.IsActive() ) {
////		AdjustBodyAngles();
////	}
////
////	if ( !isLagged ) {
////		// don't allow client to move when lagged
////		Move();
////	} 
////
////	// update GUIs, Items, and character interactions
////	UpdateFocus();
////
////	// service animations
////	if ( !spectating && !af.IsActive() ) {
////    	UpdateConditions();
////		UpdateAnimState();
////		CheckBlink();
////	}
////
////	// clear out our pain flag so we can tell if we recieve any damage between now and the next time we think
////	AI_PAIN = false;
////
////	// calculate the exact bobbed view position, which is used to
////	// position the view weapon, among other things
////	CalculateFirstPersonView();
////
////	// this may use firstPersonView, or a thirdPerson / camera view
////	CalculateRenderView();
////
////	if ( !gameLocal.inCinematic && this.weapon.GetEntity() && ( health > 0 ) && !( gameLocal.isMultiplayer && spectating ) ) {
////		UpdateWeapon();
////	}
////
////	UpdateHud();
////
////	if ( gameLocal.isNewFrame ) {
////		UpdatePowerUps();
////	}
////
////	UpdateDeathSkin( false );
////
////	if ( head.GetEntity() ) {
////		headRenderEnt = head.GetEntity().GetRenderEntity();
////	} else {
////		headRenderEnt = NULL;
////	}
////
////	if ( headRenderEnt ) {
////		if ( influenceSkin ) {
////			headRenderEnt.customSkin = influenceSkin;
////		} else {
////			headRenderEnt.customSkin = NULL;
////		}
////	}
////
////	if ( gameLocal.isMultiplayer || g_showPlayerShadow.GetBool() ) {
////		renderEntity.suppressShadowInViewID	= 0;
////		if ( headRenderEnt ) {
////			headRenderEnt.suppressShadowInViewID = 0;
////		}
////	} else {
////		renderEntity.suppressShadowInViewID	= this.entityNumber+1;
////		if ( headRenderEnt ) {
////			headRenderEnt.suppressShadowInViewID = this.entityNumber+1;
////		}
////	}
////	// never cast shadows from our first-person muzzle flashes
////	renderEntity.suppressShadowInLightID = LIGHTID_VIEW_MUZZLE_FLASH + this.entityNumber;
////	if ( headRenderEnt ) {
////		headRenderEnt.suppressShadowInLightID = LIGHTID_VIEW_MUZZLE_FLASH + this.entityNumber;
////	}
////
////	if ( !gameLocal.inCinematic ) {
////		UpdateAnimation();
////	}
////
////	if ( gameLocal.isMultiplayer ) {
////		DrawPlayerIcons();
////	}
////
////	Present();
////
////	UpdateDamageEffects();
////
////	LinkCombat();
////
////	if ( gameLocal.isNewFrame && this.entityNumber == gameLocal.localClientNum ) {
////		playerView.CalculateShake();
////	}
////}

/*
================
idPlayer::GetPhysicsToVisualTransform
================
*/
		GetPhysicsToVisualTransform ( origin: idVec3, axis: idMat3 ): boolean {
			todoThrow ( );
////	if ( af.IsActive() ) {
////		af.GetPhysicsToVisualTransform( origin, axis );
////		return true;
////	}
////
////	// smoothen the rendered origin and angles of other clients
////	// smooth self origin if snapshots are telling us prediction is off
////	if ( gameLocal.isClient && gameLocal.framenum >= smoothedFrame && ( this.entityNumber != gameLocal.localClientNum || selfSmooth ) ) {
////		// render origin and axis
////		idMat3 renderAxis = viewAxis * GetPhysics().GetAxis();
////		idVec3 renderOrigin = GetPhysics().GetOrigin() + modelOffset * renderAxis;
////
////		// update the smoothed origin
////		if ( !smoothedOriginUpdated ) {
////			idVec2 originDiff = renderOrigin.ToVec2() - smoothedOrigin.ToVec2();
////			if ( originDiff.LengthSqr() < Square( 100.0f ) ) {
////				// smoothen by pushing back to the previous position
////				if ( selfSmooth ) {
////					assert( this.entityNumber == gameLocal.localClientNum );
////					renderOrigin.ToVec2() -= net_clientSelfSmoothing.GetFloat() * originDiff;
////				} else {
////					renderOrigin.ToVec2() -= gameLocal.clientSmoothing * originDiff;
////				}
////			}
////			smoothedOrigin = renderOrigin;
////
////			smoothedFrame = gameLocal.framenum;
////			smoothedOriginUpdated = true;
////		}
////
////		axis = idAngles( 0.0, smoothedAngles.yaw, 0.0 ).ToMat3();
////		origin = ( smoothedOrigin - GetPhysics().GetOrigin() ) * axis.Transpose();
////
////	} else {
////
////		axis = viewAxis;
////		origin = modelOffset;
////	}
	return true;
}
	
/*
================
idPlayer::GetPhysicsToSoundTransform
================
*/
	GetPhysicsToSoundTransform(origin: idVec3, axis: idMat3): boolean {
		var camera :idCamera ;
		todoThrow ( );
		//if ( privateCameraView ) {
		//	camera = privateCameraView;
		//} else {
		//	camera = gameLocal.GetCamera();
		//}
	
		//if (camera) {
		//	renderView_t view;
	
		//	memset( &view, 0, sizeof( view ) );
		//	camera.GetViewParms( &view );
		//	origin = view.vieworg;
		//	axis = view.viewaxis;
			return true;
		//} else {
		//	return surfTypes_t.GetPhysicsToSoundTransform( origin, axis );
		//}
	}
////
/////*
////================
////idPlayer::WriteToSnapshot
////================
////*/
////void idPlayer::WriteToSnapshot( idBitMsgDelta &msg ) const {
////	physicsObj.WriteToSnapshot( msg );
////	WriteBindToSnapshot( msg );
////	msg.WriteDeltaFloat( 0.0, deltaViewAngles[0] );
////	msg.WriteDeltaFloat( 0.0, deltaViewAngles[1] );
////	msg.WriteDeltaFloat( 0.0, deltaViewAngles[2] );
////	msg.WriteShort( health );
////	msg.WriteBits( gameLocal.ServerRemapDecl( -1, DECL_ENTITYDEF, lastDamageDef ), gameLocal.entityDefBits );
////	msg.WriteDir( lastDamageDir, 9 );
////	msg.WriteShort( lastDamageLocation );
////	msg.WriteBits( idealWeapon, idMath.BitsForInteger( MAX_WEAPONS ) );
////	msg.WriteBits( this.inventory.weapons, MAX_WEAPONS );
////	msg.WriteBits( this.weapon.GetSpawnId(), 32 );
////	msg.WriteBits( spectator, idMath.BitsForInteger( MAX_CLIENTS ) );
////	msg.WriteBits( lastHitToggle, 1 );
////	msg.WriteBits( weaponGone, 1 );
////	msg.WriteBits( isLagged, 1 );
////	msg.WriteBits( isChatting, 1 );
////}
////
/////*
////================
////idPlayer::ReadFromSnapshot
////================
////*/
////void idPlayer::ReadFromSnapshot( const idBitMsgDelta &msg ) {
////	int		i, oldHealth, newIdealWeapon, weaponSpawnId;
////	bool	newHitToggle, stateHitch;
////
////	if ( snapshotSequence - lastSnapshotSequence > 1 ) {
////		stateHitch = true;
////	} else {
////		stateHitch = false;
////	}
////	lastSnapshotSequence = snapshotSequence;
////
////	oldHealth = health;
////
////	physicsObj.ReadFromSnapshot( msg );
////	ReadBindFromSnapshot( msg );
////	deltaViewAngles[0] = msg.ReadDeltaFloat( 0.0 );
////	deltaViewAngles[1] = msg.ReadDeltaFloat( 0.0 );
////	deltaViewAngles[2] = msg.ReadDeltaFloat( 0.0 );
////	health = msg.ReadShort();
////	lastDamageDef = gameLocal.ClientRemapDecl( DECL_ENTITYDEF, msg.ReadBits( gameLocal.entityDefBits ) );
////	lastDamageDir = msg.ReadDir( 9 );
////	lastDamageLocation = msg.ReadShort();
////	newIdealWeapon = msg.ReadBits( idMath.BitsForInteger( MAX_WEAPONS ) );
////	this.inventory.weapons = msg.ReadBits( MAX_WEAPONS );
////	weaponSpawnId = msg.ReadBits( 32 );
////	spectator = msg.ReadBits( idMath.BitsForInteger( MAX_CLIENTS ) );
////	newHitToggle = msg.ReadBits( 1 ) != 0;
////	weaponGone = msg.ReadBits( 1 ) != 0;
////	isLagged = msg.ReadBits( 1 ) != 0;
////	isChatting = msg.ReadBits( 1 ) != 0;
////
////	// no msg reading below this
////
////	if ( this.weapon.SetSpawnId( weaponSpawnId ) ) {
////		if ( this.weapon.GetEntity() ) {
////			// maintain ownership locally
////			this.weapon.GetEntity().SetOwner( this );
////		}
////		currentWeapon = -1;
////	}
////	// if not a local client assume the client has all ammo types
////	if ( this.entityNumber != gameLocal.localClientNum ) {
////		for( i = 0; i < AMMO_NUMTYPES; i++ ) {
////			this.inventory.ammo[ i ] = 999;
////		}
////	}
////
////	if ( oldHealth > 0 && health <= 0 ) {
////		if ( stateHitch ) {
////			// so we just hide and don't show a death skin
////			UpdateDeathSkin( true );
////		}
////		// die
////		AI_DEAD = true;
////		ClearPowerUps();
////		SetAnimState( ANIMCHANNEL_LEGS, "Legs_Death", 4 );
////		SetAnimState( ANIMCHANNEL_TORSO, "Torso_Death", 4 );
////		SetWaitState( "" );
////		animator.ClearAllJoints();
////		if ( this.entityNumber == gameLocal.localClientNum ) {
////			playerView.Fade( colorBlack, 12000 );
////		}
////		StartRagdoll();
////		physicsObj.SetMovementType( PM_DEAD );
////		if ( !stateHitch ) {
////			StartSound( "snd_death", SND_CHANNEL_VOICE, 0, false, NULL );
////		}
////		if ( this.weapon.GetEntity() ) {
////			this.weapon.GetEntity().OwnerDied();
////		}
////	} else if ( oldHealth <= 0 && health > 0 ) {
////		// respawn
////		Init();
////		StopRagdoll();
////		SetPhysics( &physicsObj );
////		physicsObj.EnableClip();
////		SetCombatContents( true );
////	} else if ( health < oldHealth && health > 0 ) {
////		if ( stateHitch ) {
////			this.lastDmgTime = gameLocal.time;
////		} else {
////			// damage feedback
////			const idDeclEntityDef *def = static_cast<const idDeclEntityDef *>( declManager.DeclByIndex( DECL_ENTITYDEF, lastDamageDef, false ) );
////			if ( def ) {
////				playerView.DamageImpulse( lastDamageDir * viewAxis.Transpose(), &def.dict );
////				AI_PAIN = Pain( NULL, NULL, oldHealth - health, lastDamageDir, lastDamageLocation );
////				this.lastDmgTime = gameLocal.time;
////			} else {
////				common.Warning( "NET: no damage def for damage feedback '%d'\n", lastDamageDef );
////			}
////		}
////	} else if ( health > oldHealth && PowerUpActive( MEGAHEALTH ) && !stateHitch ) {
////		// just pulse, for any health raise
////		healthPulse = true;
////	}
////
////	// If the player is alive, restore proper physics object
////	if ( health > 0 && IsActiveAF() ) {
////		StopRagdoll();
////		SetPhysics( &physicsObj );
////		physicsObj.EnableClip();
////		SetCombatContents( true );
////	}
////
////	if ( idealWeapon != newIdealWeapon ) {
////		if ( stateHitch ) {
////			weaponCatchup = true;
////		}
////		idealWeapon = newIdealWeapon;
////		UpdateHudWeapon();
////	}
////
////	if ( lastHitToggle != newHitToggle ) {
////		SetLastHitTime( gameLocal.realClientTime );
////	}
////
////	if ( msg.HasChanged() ) {
////		UpdateVisuals();
////	}
////}
////
/////*
////================
////idPlayer::WritePlayerStateToSnapshot
////================
////*/
////void idPlayer::WritePlayerStateToSnapshot( idBitMsgDelta &msg ) const {
////	var/*int*/i:number;
////
////	msg.WriteByte( bobCycle );
////	msg.WriteLong( stepUpTime );
////	msg.WriteFloat( stepUpDelta );
////	msg.WriteShort( this.inventory.weapons );
////	msg.WriteByte( this.inventory.armor );
////
////	for( i = 0; i < AMMO_NUMTYPES; i++ ) {
////		msg.WriteBits( this.inventory.ammo[i], ASYNC_PLAYER_INV_AMMO_BITS );
////	}
////	for( i = 0; i < MAX_WEAPONS; i++ ) {
////		msg.WriteBits( this.inventory.clip[i], ASYNC_PLAYER_INV_CLIP_BITS );
////	}
////}
////
/////*
////================
////idPlayer::ReadPlayerStateFromSnapshot
////================
////*/
////void idPlayer::ReadPlayerStateFromSnapshot( const idBitMsgDelta &msg ) {
////	int i, ammo;
////
////	bobCycle = msg.ReadByte();
////	stepUpTime = msg.ReadLong();
////	stepUpDelta = msg.ReadFloat();
////	this.inventory.weapons = msg.ReadShort();
////	this.inventory.armor = msg.ReadByte();
////
////	for( i = 0; i < AMMO_NUMTYPES; i++ ) {
////		ammo = msg.ReadBits( ASYNC_PLAYER_INV_AMMO_BITS );
////		if ( gameLocal.time >= this.inventory.ammoPredictTime ) {
////			this.inventory.ammo[ i ] = ammo;
////		}
////	}
////	for( i = 0; i < MAX_WEAPONS; i++ ) {
////		this.inventory.clip[i] = msg.ReadBits( ASYNC_PLAYER_INV_CLIP_BITS );
////	}
////}
////
/////*
////================
////idPlayer::ServerReceiveEvent
////================
////*/
////bool idPlayer::ServerReceiveEvent( int event, /*int*/time:number, const idBitMsg &msg ) {
////
////	if ( idEntity::ServerReceiveEvent( event, time, msg ) ) {
////		return true;
////	}
////
////	// client.server events
////	switch( event ) {
////		case EVENT_IMPULSE: {
////			PerformImpulse( msg.ReadBits( 6 ) );
////			return true;
////		}
////		default: {
////			return false;
////		}
////	}
////}
////
/////*
////================
////idPlayer::ClientReceiveEvent
////================
////*/
////bool idPlayer::ClientReceiveEvent( int event, /*int*/time:number, const idBitMsg &msg ) {
////	int powerup;
////	bool start;
////
////	switch ( event ) {
////		case EVENT_EXIT_TELEPORTER:
////			Event_ExitTeleporter();
////			return true;
////		case EVENT_ABORT_TELEPORTER:
////			SetPrivateCameraView( NULL );
////			return true;
////		case EVENT_POWERUP: {
////			powerup = msg.ReadShort();
////			start = msg.ReadBits( 1 ) != 0;
////			if ( start ) {
////				GivePowerUp( powerup, 0 );
////			} else {
////				ClearPowerup( powerup );
////			}	
////			return true;
////		}
////		case EVENT_SPECTATE: {
////			bool spectate = ( msg.ReadBits( 1 ) != 0 );
////			Spectate( spectate );
////			return true;
////		}
////		case EVENT_ADD_DAMAGE_EFFECT: {
////			if ( spectating ) {
////				// if we're spectating, ignore
////				// happens if the event and the spectate change are written on the server during the same frame (fraglimit)
////				return true;
////			}
////			return idActor::ClientReceiveEvent( event, time, msg );
////		}
////		default: {
////			return idActor::ClientReceiveEvent( event, time, msg );
////		}
////	}
////	return false;
////}

/*
================
idPlayer::Hide
================
*/
	Hide ( ): void {
		var weap: idWeapon;

		super.Hide ( );
		weap = this.weapon.GetEntity ( );
		if ( weap ) {
			weap.HideWorldModel ( );
		}
	}
////
/////*
////================
////idPlayer::Show
////================
////*/
////void idPlayer::Show( ) {
////	idWeapon *weap;
////	
////	idActor::Show();
////	weap = this.weapon.GetEntity();
////	if ( weap ) {
////		weap.ShowWorldModel();
////	}
////}
////
/////*
////===============
////idPlayer::StartAudioLog
////===============
////*/
////void idPlayer::StartAudioLog( ) {
////	if ( this.hud ) {
////		this.hud.HandleNamedEvent( "audioLogUp" );
////	}
////}
////
/////*
////===============
////idPlayer::StopAudioLog
////===============
////*/
////void idPlayer::StopAudioLog( ) {
////	if ( this.hud ) {
////		this.hud.HandleNamedEvent( "audioLogDown" );
////	}
////}
////
/////*
////===============
////idPlayer::ShowTip
////===============
////*/
////void idPlayer::ShowTip( const char *title, const char *tip, bool autoHide ) {
////	if ( tipUp ) {
////		return;
////	}
////	this.hud.SetStateString( "tip", tip );
////	this.hud.SetStateString( "tiptitle", title );
////	this.hud.HandleNamedEvent( "tipWindowUp" ); 
////	if ( autoHide ) {
////		PostEventSec( &EV_Player_HideTip, 5.0f );
////	}
////	tipUp = true;
////}
////
/////*
////===============
////idPlayer::HideTip
////===============
////*/
////void idPlayer::HideTip( ) {
////	this.hud.HandleNamedEvent( "tipWindowDown" ); 
////	tipUp = false;
////}
////
/////*
////===============
////idPlayer::Event_HideTip
////===============
////*/
////void idPlayer::Event_HideTip( ) {
////	HideTip();
////}
////
/////*
////===============
////idPlayer::ShowObjective
////===============
////*/
////void idPlayer::ShowObjective( const char *obj ) {
////	this.hud.HandleNamedEvent( obj );
////	objectiveUp = true;
////}
////
/////*
////===============
////idPlayer::HideObjective
////===============
////*/
////void idPlayer::HideObjective( ) {
////	this.hud.HandleNamedEvent( "closeObjective" );
////	objectiveUp = false;
////}
////
/////*
////===============
////idPlayer::Event_StopAudioLog
////===============
////*/
////void idPlayer::Event_StopAudioLog( ) {
////	StopAudioLog();
////}
////
/////*
////===============
////idPlayer::SetSpectateOrigin
////===============
////*/
////void idPlayer::SetSpectateOrigin( ) {
////	idVec3 neworig;
////
////	neworig = GetPhysics().GetOrigin();
////	neworig[ 2 ] += EyeHeight();
////	neworig[ 2 ] += 25;
////	SetOrigin( neworig );
////}
////
/////*
////===============
////idPlayer::RemoveWeapon
////===============
////*/
////void idPlayer::RemoveWeapon( const char *weap ) {
////	if ( weap && *weap ) {
////		this.inventory.Drop( spawnArgs, spawnArgs.GetString( weap ), -1 );
////	}
////}
////
/////*
////===============
////idPlayer::CanShowWeaponViewmodel
////===============
////*/
////bool idPlayer::CanShowWeaponViewmodel( ) const {
////	return this.showWeaponViewModel;
////}
////
/////*
////===============
////idPlayer::SetLevelTrigger
////===============
////*/
////void idPlayer::SetLevelTrigger( const char *levelName, const char *triggerName ) {
////	if ( levelName && *levelName && triggerName && *triggerName ) {
////		idLevelTriggerInfo lti;
////		lti.levelName = levelName;
////		lti.triggerName = triggerName;
////		this.inventory.levelTriggers.Append( lti );
////	}
////}
////
/////*
////===============
////idPlayer::Event_LevelTrigger
////===============
////*/
////void idPlayer::Event_LevelTrigger( ) {
////	idStr mapName = gameLocal.GetMapName();
////	mapName.StripPath();
////	mapName.StripFileExtension();
////	for ( int i = this.inventory.levelTriggers.Num() - 1; i >= 0; i-- ) {
////		if ( idStr.Icmp( mapName, this.inventory.levelTriggers[i].levelName) == 0 ){
////			var ent:idEntity = gameLocal.FindEntity( this.inventory.levelTriggers[i].triggerName );
////			if ( ent ) {
////				ent.PostEventMS( &EV_Activate, 1, this );
////			}
////		}
////	}
////}
////
/////*
////===============
////idPlayer::Event_Gibbed
////===============
////*/
////void idPlayer::Event_Gibbed( ) {
////}
////
/////*
////==================
////idPlayer::Event_GetIdealWeapon 
////==================
////*/
////void idPlayer::Event_GetIdealWeapon( ) {
////	const char *weapon;
////
////	if ( idealWeapon >= 0 ) {
////		this.weapon = spawnArgs.GetString( va( "def_weapon%d", idealWeapon ) );
////		idThread::ReturnString( this.weapon );
////	} else {
////		idThread::ReturnString( "" );
////	}
////}
////
/////*
////===============
////idPlayer::UpdatePlayerIcons
////===============
////*/
////void idPlayer::UpdatePlayerIcons( ) {
////	/*int*/time:number = networkSystem.ServerGetClientTimeSinceLastPacket( this.entityNumber );
////	if ( time > cvarSystem.GetCVarInteger( "net_clientMaxPrediction" ) ) {
////		isLagged = true;
////	} else {
////		isLagged = false;
////	}
////}
////
/////*
////===============
////idPlayer::DrawPlayerIcons
////===============
////*/
////void idPlayer::DrawPlayerIcons( ) {
////	if ( !NeedsIcon() ) {
////		playerIcon.FreeIcon();
////		return;
////	}
////	playerIcon.Draw( this, headJoint );
////}
////
/////*
////===============
////idPlayer::HidePlayerIcons
////===============
////*/
////void idPlayer::HidePlayerIcons( ) {
////	playerIcon.FreeIcon();
////}
////
/////*
////===============
////idPlayer::NeedsIcon
////==============
////*/
////bool idPlayer::NeedsIcon( ) {
////	// local clients don't render their own icons... they're only info for other clients
////	return this.entityNumber != gameLocal.localClientNum && ( isLagged || isChatting );
////}
}