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
////#ifndef __GAME_PLAYERVIEW_H__
////#define __GAME_PLAYERVIEW_H__
////
/////*
////===============================================================================
////
////  Player view.
////
////===============================================================================
////*/
var IMPULSE_DELAY = 150;
// screenBlob_t are for the on-screen damage claw marks, etc
class screenBlob_t {
    material: idMaterial;
    x: number /*float*/;
    y: number /*float*/;
    w: number /*float*/;
    h: number /*float*/;
    s1: number /*float*/;
    t1: number /*float*/;
    s2: number /*float*/;
    t2: number /*float*/;
    finishTime: number /*int*/;
    startFadeTime: number /*int*/;
    driftAmount: number /*float*/;

    memset0 ( ): void {
        this.material = null;
        this.x = 0.0;
        this.y = 0.0;
        this.w = 0.0;
        this.h = 0.0;
        this.s1 = 0.0;
        this.t1 = 0.0;
        this.s2 = 0.0;
        this.t2 = 0.0;
        this.finishTime = 0;
        this.startFadeTime = 0;
        this.driftAmount = 0.0;
    }

}

var MAX_SCREEN_BLOBS = 8;

class idPlayerView {
////public:
////						idPlayerView();
////
////	Save(savefile:idSaveGame):void{throw "placeholder";}
////	Restore(savefile:idRestoreGame):void{throw "placeholder";}
////
////	void				SetPlayerEntity( class idPlayer *playerEnt );
////
////	void				ClearEffects( void );
////
////	void				DamageImpulse( idVec3 localKickDir, const idDict *damageDef );
////
////	void				WeaponFireFeedback( const idDict *weaponDef );
////
////	idAngles			AngleOffset( void ) const;			// returns the current kick angle
////
////	idMat3				ShakeAxis( void ) const;			// returns the current shake angle
////
////	void				CalculateShake( void );
////
////	// this may involve rendering to a texture and displaying
////	// that with a warp model or in double vision mode
////	void				RenderPlayerView( idUserInterface *hud );
////
////	void				Fade( idVec4 color, /*int*/time:number );
////
////	void				Flash( idVec4 color, /*int*/time:number );
////
////	void				AddBloodSpray( float duration );
////
////	// temp for view testing
////	void				EnableBFGVision( bool b ) { this.bfgVision = b; };
////
////private:
////	void				SingleView( idUserInterface *hud, const renderView_t *view );
////	void				DoubleVision( idUserInterface *hud, const renderView_t *view, int offset );
////	void				BerserkVision( idUserInterface *hud, const renderView_t *view );
////	void				InfluenceVision( idUserInterface *hud, const renderView_t *view );
////	void				ScreenFade();
////
////	screenBlob_t *		GetScreenBlob();

    screenBlobs = newStructArray<screenBlob_t>(screenBlob_t, MAX_SCREEN_BLOBS);

    dvFinishTime :number/*int*/;		// double vision will be stopped at this time
    dvMaterial:idMaterial;			// material to take the double vision screen shot

    kickFinishTime :number/*int*/;		// view kick will be stopped at this time
    kickAngles = new idAngles;			

    bfgVision :boolean;			// 

    tunnelMaterial:idMaterial;		// health tunnel vision
    armorMaterial:idMaterial;		// armor damage view effect
    berserkMaterial:idMaterial;	// berserk effect
    irGogglesMaterial:idMaterial;	// ir effect
    bloodSprayMaterial:idMaterial; // blood spray
    bfgMaterial:idMaterial;		// when targeted with BFG
    lagoMaterial:idMaterial;		// lagometer drawing
    lastDamageTime :number/*float*/;		// accentuate the tunnel effect for a while
    
    fadeColor = new idVec4;			// fade color
    fadeToColor = new idVec4;		// color to fade to
    fadeFromColor = new idVec4;		// color to fade from
    fadeRate :number/*float*/;			// fade rate
    fadeTime :number/*int*/;			// fade time
    
    shakeAng = new idAngles;			// from the sound sources
    
    player:idPlayer;
    view = new renderView_t;

    
/*
==============
idPlayerView::idPlayerView
==============
*/
    constructor ( ) {
        clearStructArray( this.screenBlobs );
        this.view.memset0 ( );
        this.player = null;
        this.dvMaterial = declManager.FindMaterial( "_scratch" );
        this.tunnelMaterial = declManager.FindMaterial( "textures/decals/tunnel" );
        this.armorMaterial = declManager.FindMaterial( "armorViewEffect" );
        this.berserkMaterial = declManager.FindMaterial( "textures/decals/berserk" );
        this.irGogglesMaterial = declManager.FindMaterial( "textures/decals/irblend" );
        this.bloodSprayMaterial = declManager.FindMaterial( "textures/decals/bloodspray" );
        this.bfgMaterial = declManager.FindMaterial( "textures/decals/bfgvision" );
        this.lagoMaterial = declManager.FindMaterial( LAGO_MATERIAL, false );
        this.bfgVision = false;
        this.dvFinishTime = 0;
        this.kickFinishTime = 0;
        this.kickAngles.Zero ( );
        this.lastDamageTime = 0.0;
        this.fadeTime = 0;
        this.fadeRate = 0.0;
        this.fadeFromColor.Zero ( );
        this.fadeToColor.Zero ( );
        this.fadeColor.Zero ( );
        this.shakeAng.Zero ( );

        this.ClearEffects ( );
    }
////
/////*
////==============
////idPlayerView::Save
////==============
////*/
////void idPlayerView::Save( idSaveGame *savefile ) const {
////	var/*int*/i:number;
////	const screenBlob_t *blob;
////
////	blob = &this.screenBlobs[ 0 ];
////	for( i = 0; i < MAX_SCREEN_BLOBS; i++, blob++ ) {
////		savefile.WriteMaterial( blob.material );
////		savefile.WriteFloat( blob.x );
////		savefile.WriteFloat( blob.y );
////		savefile.WriteFloat( blob.w );
////		savefile.WriteFloat( blob.h );
////		savefile.WriteFloat( blob.s1 );
////		savefile.WriteFloat( blob.t1 );
////		savefile.WriteFloat( blob.s2 );
////		savefile.WriteFloat( blob.t2 );
////		savefile.WriteInt( blob.finishTime );
////		savefile.WriteInt( blob.startFadeTime );
////		savefile.WriteFloat( blob.driftAmount );
////	}
////
////	savefile.WriteInt( this.dvFinishTime );
////	savefile.WriteMaterial( this.dvMaterial );
////	savefile.WriteInt( this.kickFinishTime );
////	savefile.WriteAngles( kickAngles );
////	savefile.WriteBool( this.bfgVision );
////
////	savefile.WriteMaterial( tunnelMaterial );
////	savefile.WriteMaterial( armorMaterial );
////	savefile.WriteMaterial( berserkMaterial );
////	savefile.WriteMaterial( irGogglesMaterial );
////	savefile.WriteMaterial( bloodSprayMaterial );
////	savefile.WriteMaterial( bfgMaterial );
////	savefile.WriteFloat( this.lastDamageTime );
////
////	savefile.WriteVec4( fadeColor );
////	savefile.WriteVec4( fadeToColor );
////	savefile.WriteVec4( fadeFromColor );
////	savefile.WriteFloat( fadeRate );
////	savefile.WriteInt( this.fadeTime );
////
////	savefile.WriteAngles( shakeAng );
////
////	savefile.WriteObject( this.player );
////	savefile.WriteRenderView( view );
////}
////
/////*
////==============
////idPlayerView::Restore
////==============
////*/
////void idPlayerView::Restore( idRestoreGame *savefile ) {
////	var/*int*/i:number;
////	screenBlob_t *blob;
////
////	blob = &this.screenBlobs[ 0 ];
////	for( i = 0; i < MAX_SCREEN_BLOBS; i++, blob++ ) {
////		savefile.ReadMaterial( blob.material );
////		savefile.ReadFloat( blob.x );
////		savefile.ReadFloat( blob.y );
////		savefile.ReadFloat( blob.w );
////		savefile.ReadFloat( blob.h );
////		savefile.ReadFloat( blob.s1 );
////		savefile.ReadFloat( blob.t1 );
////		savefile.ReadFloat( blob.s2 );
////		savefile.ReadFloat( blob.t2 );
////		savefile.ReadInt( blob.finishTime );
////		savefile.ReadInt( blob.startFadeTime );
////		savefile.ReadFloat( blob.driftAmount );
////	}
////
////	savefile.ReadInt( this.dvFinishTime );
////	savefile.ReadMaterial( this.dvMaterial );
////	savefile.ReadInt( this.kickFinishTime );
////	savefile.ReadAngles( kickAngles );			
////	savefile.ReadBool( this.bfgVision );
////
////	savefile.ReadMaterial( tunnelMaterial );
////	savefile.ReadMaterial( armorMaterial );
////	savefile.ReadMaterial( berserkMaterial );
////	savefile.ReadMaterial( irGogglesMaterial );
////	savefile.ReadMaterial( bloodSprayMaterial );
////	savefile.ReadMaterial( bfgMaterial );
////	savefile.ReadFloat( this.lastDamageTime );
////
////	savefile.ReadVec4( fadeColor );
////	savefile.ReadVec4( fadeToColor );
////	savefile.ReadVec4( fadeFromColor );
////	savefile.ReadFloat( fadeRate );
////	savefile.ReadInt( this.fadeTime );
////
////	savefile.ReadAngles( shakeAng );
////
////	savefile.ReadObject( reinterpret_cast<idClass *&>( this.player ) );
////	savefile.ReadRenderView( view );
////}
////
/*
==============
idPlayerView::SetPlayerEntity
==============
*/
    SetPlayerEntity ( playerEnt: idPlayer ): void {
        this.player = playerEnt;
    }

/*
==============
idPlayerView::ClearEffects
==============
*/
    ClearEffects ( ): void {
        this.lastDamageTime = MS2SEC( gameLocal.time - 99999 );

        this.dvFinishTime = ( gameLocal.time - 99999 );
        this.kickFinishTime = ( gameLocal.time - 99999 );

        for ( var i = 0; i < MAX_SCREEN_BLOBS; i++ ) {
            this.screenBlobs[i].finishTime = gameLocal.time;
        }

        this.fadeTime = 0;
        this.bfgVision = false;
    }

/////*
////==============
////idPlayerView::GetScreenBlob
////==============
////*/
////screenBlob_t *idPlayerView::GetScreenBlob() {
////	screenBlob_t	*oldest = &this.screenBlobs[0];
////
////	for ( int i = 1 ; i < MAX_SCREEN_BLOBS ; i++ ) {
////		if ( this.screenBlobs[i].finishTime < oldest.finishTime ) {
////			oldest = &this.screenBlobs[i];
////		}
////	}
////	return oldest;
////}
////
/////*
////==============
////idPlayerView::DamageImpulse
////
////LocalKickDir is the direction of force in the player's coordinate system,
////which will determine the head kick direction
////==============
////*/
////void idPlayerView::DamageImpulse( idVec3 localKickDir, const idDict *damageDef ) {
////	//
////	// double vision effect
////	//
////	if ( this.lastDamageTime > 0.0 && SEC2MS( this.lastDamageTime ) + IMPULSE_DELAY > gameLocal.time ) {
////		// keep shotgun from obliterating the view
////		return;
////	}
////
////	float	dvTime = damageDef.GetFloat( "dv_time" );
////	if ( dvTime ) {
////		if ( this.dvFinishTime < gameLocal.time ) {
////			this.dvFinishTime = gameLocal.time;
////		}
////		this.dvFinishTime += g_dvTime.GetFloat() * dvTime;
////		// don't let it add up too much in god mode
////		if ( this.dvFinishTime > gameLocal.time + 5000 ) {
////			this.dvFinishTime = gameLocal.time + 5000;
////		}
////	}
////
////	//
////	// head angle kick
////	//
////	float	kickTime = damageDef.GetFloat( "kick_time" );
////	if ( kickTime ) {
////		this.kickFinishTime = gameLocal.time + g_kickTime.GetFloat() * kickTime;
////
////		// forward / back kick will pitch view
////		kickAngles[0] = localKickDir[0];
////
////		// side kick will yaw view
////		kickAngles[1] = localKickDir[1]*0.5f;
////
////		// up / down kick will pitch view
////		kickAngles[0] += localKickDir[2];
////
////		// roll will come from  side
////		kickAngles[2] = localKickDir[1];
////
////		float kickAmplitude = damageDef.GetFloat( "kick_amplitude" );
////		if ( kickAmplitude ) {
////			kickAngles *= kickAmplitude;
////		}
////	}
////
////	//
////	// screen blob
////	//
////	float	blobTime = damageDef.GetFloat( "blob_time" );
////	if ( blobTime ) {
////		screenBlob_t	*blob = GetScreenBlob();
////		blob.startFadeTime = gameLocal.time;
////		blob.finishTime = gameLocal.time + blobTime * g_blobTime.GetFloat();
////
////		const char *materialName = damageDef.GetString( "mtr_blob" );
////		blob.material = declManager.FindMaterial( materialName );
////		blob.x = damageDef.GetFloat( "blob_x" );
////		blob.x += ( gameLocal.random.RandomInt()&63 ) - 32;
////		blob.y = damageDef.GetFloat( "blob_y" );
////		blob.y += ( gameLocal.random.RandomInt()&63 ) - 32;
////		
////		float scale = ( 256 + ( ( gameLocal.random.RandomInt()&63 ) - 32 ) ) / 256.0;
////		blob.w = damageDef.GetFloat( "blob_width" ) * g_blobSize.GetFloat() * scale;
////		blob.h = damageDef.GetFloat( "blob_height" ) * g_blobSize.GetFloat() * scale;
////		blob.s1 = 0;
////		blob.t1 = 0;
////		blob.s2 = 1;
////		blob.t2 = 1;
////	}
////
////	//
////	// save lastDamageTime for tunnel vision accentuation
////	//
////	this.lastDamageTime = MS2SEC( gameLocal.time );
////
////}
////
/////*
////==================
////idPlayerView::AddBloodSpray
////
////If we need a more generic way to add blobs then we can do that
////but having it localized here lets the material be pre-looked up etc.
////==================
////*/
////void idPlayerView::AddBloodSpray( float duration ) {
/////*
////	if ( duration <= 0 || bloodSprayMaterial == NULL || g_skipViewEffects.GetBool() ) {
////		return;
////	}
////	// visit this for chainsaw
////	screenBlob_t *blob = GetScreenBlob();
////	blob.startFadeTime = gameLocal.time;
////	blob.finishTime = gameLocal.time + ( duration * 1000 );
////	blob.material = bloodSprayMaterial;
////	blob.x = ( gameLocal.random.RandomInt() & 63 ) - 32;
////	blob.y = ( gameLocal.random.RandomInt() & 63 ) - 32;
////	blob.driftAmount = 0.5f + gameLocal.random.CRandomFloat() * 0.5;
////	float scale = ( 256 + ( ( gameLocal.random.RandomInt()&63 ) - 32 ) ) / 256.0;
////	blob.w = 600 * g_blobSize.GetFloat() * scale;
////	blob.h = 480 * g_blobSize.GetFloat() * scale;
////	float s1 = 0.0;
////	float t1 = 0.0;
////	float s2 = 1.0;
////	float t2 = 1.0;
////	if ( blob.driftAmount < 0.6 ) {
////		s1 = 1.0;
////		s2 = 0.0;
////	} else if ( blob.driftAmount < 0.75 ) {
////		t1 = 1.0;
////		t2 = 0.0;
////	} else if ( blob.driftAmount < 0.85 ) {
////		s1 = 1.0;
////		s2 = 0.0;
////		t1 = 1.0;
////		t2 = 0.0;
////	}
////	blob.s1 = s1;
////	blob.t1 = t1;
////	blob.s2 = s2;
////	blob.t2 = t2;
////*/
////}
////
/////*
////==================
////idPlayerView::WeaponFireFeedback
////
////Called when a weapon fires, generates head twitches, etc
////==================
////*/
////void idPlayerView::WeaponFireFeedback( const idDict *weaponDef ) {
////	int		recoilTime;
////
////	recoilTime = weaponDef.GetInt( "recoilTime" );
////	// don't shorten a damage kick in progress
////	if ( recoilTime && this.kickFinishTime < gameLocal.time ) {
////		var angles = new idAngles;
////		weaponDef.GetAngles( "recoilAngles", "5 0 0", angles );
////		kickAngles = angles;
////		int	finish = gameLocal.time + g_kickTime.GetFloat() * recoilTime;
////		this.kickFinishTime = finish;
////	}	
////
////}
////
/////*
////===================
////idPlayerView::CalculateShake
////===================
////*/
////void idPlayerView::CalculateShake() {
////	idVec3	origin, matrix;
////
////	float shakeVolume = gameSoundWorld.CurrentShakeAmplitudeForPosition( gameLocal.time, this.player.firstPersonViewOrigin );
////	//
////	// shakeVolume should somehow be molded into an angle here
////	// it should be thought of as being in the range 0.0 . 1.0, although
////	// since CurrentShakeAmplitudeForPosition() returns all the shake sounds
////	// the player can hear, it can go over 1.0 too.
////	//
////	shakeAng[0] = gameLocal.random.CRandomFloat() * shakeVolume;
////	shakeAng[1] = gameLocal.random.CRandomFloat() * shakeVolume;
////	shakeAng[2] = gameLocal.random.CRandomFloat() * shakeVolume;
////}
////
/////*
////===================
////idPlayerView::ShakeAxis
////===================
////*/
////idMat3 idPlayerView::ShakeAxis() const {
////	return shakeAng.ToMat3();
////}
////
/////*
////===================
////idPlayerView::AngleOffset
////
////  kickVector, a world space direction that the attack should 
////===================
////*/
////idAngles idPlayerView::AngleOffset() const {
////	idAngles	ang;
////
////	ang.Zero();
////
////	if ( gameLocal.time < this.kickFinishTime ) {
////		float offset = this.kickFinishTime - gameLocal.time;
////
////		ang = kickAngles * offset * offset * g_kickAmplitude.GetFloat();
////
////		for ( int i = 0 ; i < 3 ; i++ ) {
////			if ( ang[i] > 70.0 ) {
////				ang[i] = 70.0;
////			} else if ( ang[i] < -70.0 ) {
////				ang[i] = -70.0;
////			}
////		}
////	}
////	return ang;
////}
////
/////*
////==================
////idPlayerView::SingleView
////==================
////*/
////void idPlayerView::SingleView( idUserInterface *hud, const renderView_t *view ) {
////
////	// normal rendering
////	if ( !view ) {
////		return;
////	}
////
////	// place the sound origin for the player
////	gameSoundWorld.PlaceListener( view.vieworg, view.viewaxis, this.player.entityNumber + 1, gameLocal.time, hud ? hud.State().GetString( "location" ) : "Undefined" );
////
////	// if the objective system is up, don't do normal drawing
////	if ( this.player.objectiveSystemOpen ) {
////		this.player.objectiveSystem.Redraw( gameLocal.time );
////		return;
////	}
////
////	// hack the shake in at the very last moment, so it can't cause any consistency problems
////	renderView_t	hackedView = *view;
////	hackedView.viewaxis = hackedView.viewaxis * ShakeAxis();
////
////	gameRenderWorld.RenderScene( &hackedView );
////
////	if ( this.player.spectating ) {
////		return;
////	}
////
////	// draw screen blobs
////	if ( !pm_thirdPerson.GetBool() && !g_skipViewEffects.GetBool() ) {
////		for ( int i = 0 ; i < MAX_SCREEN_BLOBS ; i++ ) {
////			screenBlob_t	*blob = &this.screenBlobs[i];
////			if ( blob.finishTime <= gameLocal.time ) {
////				continue;
////			}
////			
////			blob.y += blob.driftAmount;
////
////			float	fade = (float)( blob.finishTime - gameLocal.time ) / ( blob.finishTime - blob.startFadeTime );
////			if ( fade > 1.0 ) {
////				fade = 1.0;
////			}
////			if ( fade ) {
////				renderSystem.SetColor4( 1,1,1,fade );
////				renderSystem.DrawStretchPic( blob.x, blob.y, blob.w, blob.h,blob.s1, blob.t1, blob.s2, blob.t2, blob.material );
////			}
////		}
////		this.player.DrawHUD( hud );
////
////		// armor impulse feedback
////		float	armorPulse = ( gameLocal.time - this.player.lastArmorPulse ) / 250.0;
////
////		if ( armorPulse > 0.0 && armorPulse < 1.0 ) {
////			renderSystem.SetColor4( 1, 1, 1, 1.0 - armorPulse );
////			renderSystem.DrawStretchPic( 0, 0, 640, 480, 0, 0, 1, 1, armorMaterial );
////		}
////
////
////		// tunnel vision
////		float	health = 0.0;
////		if ( g_testHealthVision.GetFloat() != 0.0 ) {
////			health = g_testHealthVision.GetFloat();
////		} else {
////			health = this.player.health;
////		}
////		float alpha = health / 100.0;
////		if ( alpha < 0.0 ) {
////			alpha = 0.0;
////		}
////		if ( alpha > 1.0 ) {
////			alpha = 1.0;
////		}
////
////		if ( alpha < 1.0  ) {
////			renderSystem.SetColor4( ( this.player.health <= 0.0 ) ? MS2SEC( gameLocal.time ) : this.lastDamageTime, 1.0, 1.0, ( this.player.health <= 0.0 ) ? 0.0 : alpha );
////			renderSystem.DrawStretchPic( 0.0, 0.0, 640.0, 480.0, 0.0, 0.0, 1.0, 1.0, tunnelMaterial );
////		}
////
////		if ( this.player.PowerUpActive(BERSERK) ) {
////			int berserkTime = this.player.inventory.powerupEndTime[ BERSERK ] - gameLocal.time;
////			if ( berserkTime > 0 ) {
////				// start fading if within 10 seconds of going away
////				alpha = (berserkTime < 10000) ? (float)berserkTime / 10000 : 1.0;
////				renderSystem.SetColor4( 1.0, 1.0, 1.0, alpha );
////				renderSystem.DrawStretchPic( 0.0, 0.0, 640.0, 480.0, 0.0, 0.0, 1.0, 1.0, berserkMaterial );
////			}
////		}
////
////		if ( this.bfgVision ) {
////			renderSystem.SetColor4( 1.0, 1.0, 1.0, 1.0 );
////			renderSystem.DrawStretchPic( 0.0, 0.0, 640.0, 480.0, 0.0, 0.0, 1.0, 1.0, bfgMaterial );
////		}
////		
////	}
////
////	// test a single material drawn over everything
////	if ( g_testPostProcess.GetString()[0] ) {
////		const idMaterial *mtr = declManager.FindMaterial( g_testPostProcess.GetString(), false );
////		if ( !mtr ) {
////			common.Printf( "Material not found.\n" );
////			g_testPostProcess.SetString( "" );
////		} else {
////			renderSystem.SetColor4( 1.0, 1.0, 1.0, 1.0 );
////			renderSystem.DrawStretchPic( 0.0, 0.0, 640.0, 480.0, 0.0, 0.0, 1.0, 1.0, mtr );
////		}
////	}
////}
////
/////*
////===================
////idPlayerView::DoubleVision
////===================
////*/
////void idPlayerView::DoubleVision( idUserInterface *hud, const renderView_t *view, int offset ) {
////
////	if ( !g_doubleVision.GetBool() ) {
////		SingleView( hud, view );
////		return;
////	}
////
////	float	scale = offset * g_dvAmplitude.GetFloat();
////	if ( scale > 0.5f ) {
////		scale = 0.5f;
////	}
////	float shift = scale * sin( sqrtf( offset ) * g_dvFrequency.GetFloat() ); 
////	shift = fabs( shift );
////
////	// if double vision, render to a texture
////	renderSystem.CropRenderSize( 512, 256, true );
////	SingleView( hud, view );
////	renderSystem.CaptureRenderToImage( "_scratch" );
////	renderSystem.UnCrop();
////
////	// carry red tint if in berserk mode
////	idVec4 color(1, 1, 1, 1);
////	if ( gameLocal.time < this.player.inventory.powerupEndTime[ BERSERK ] ) {
////		color.y = 0;
////		color.z = 0;
////	}
////
////	renderSystem.SetColor4( color.x, color.y, color.z, 1.0 );
////	renderSystem.DrawStretchPic( 0, 0, SCREEN_WIDTH, SCREEN_HEIGHT, shift, 1, 1, 0, this.dvMaterial );
////	renderSystem.SetColor4( color.x, color.y, color.z, 0.5f );
////	renderSystem.DrawStretchPic( 0, 0, SCREEN_WIDTH, SCREEN_HEIGHT, 0, 1, 1-shift, 0, this.dvMaterial );
////}
////
/////*
////===================
////idPlayerView::BerserkVision
////===================
////*/
////void idPlayerView::BerserkVision( idUserInterface *hud, const renderView_t *view ) {
////	renderSystem.CropRenderSize( 512, 256, true );
////	SingleView( hud, view );
////	renderSystem.CaptureRenderToImage( "_scratch" );
////	renderSystem.UnCrop();
////	renderSystem.SetColor4( 1.0, 1.0, 1.0, 1.0 );
////	renderSystem.DrawStretchPic( 0, 0, SCREEN_WIDTH, SCREEN_HEIGHT, 0, 1, 1, 0, this.dvMaterial );
////}
////
////
/////*
////=================
////idPlayerView::Flash
////
////flashes the this.player view with the given color
////=================
////*/
////void idPlayerView::Flash(idVec4 color, /*int*/time:number ) {
////	Fade(idVec4(0, 0, 0, 0), time);
////	fadeFromColor = colorWhite;
////}
////
/////*
////=================
////idPlayerView::Fade
////
////used for level transition fades
////assumes: color.w is 0 or 1
////=================
////*/
////void idPlayerView::Fade( idVec4 color, /*int*/time:number ) {
////
////	if ( !this.fadeTime ) {
////		fadeFromColor.Set( 0.0, 0.0, 0.0, 1.0 - color[ 3 ] );
////	} else {
////		fadeFromColor = fadeColor;
////	}
////	fadeToColor = color;
////
////	if ( time <= 0 ) {
////		fadeRate = 0;
////		time = 0;
////		fadeColor = fadeToColor;
////	} else {
////		fadeRate = 1.0 / ( float )time;
////	}
////
////	if ( gameLocal.realClientTime == 0 && time == 0 ) {
////		this.fadeTime = 1;
////	} else {
////		this.fadeTime = gameLocal.realClientTime + time;
////	}
////}
////
/////*
////=================
////idPlayerView::ScreenFade
////=================
////*/
////void idPlayerView::ScreenFade() {
////	int		msec;
////	float	t;
////
////	if ( !this.fadeTime ) {
////		return;
////	}
////
////	msec = this.fadeTime - gameLocal.realClientTime;
////
////	if ( msec <= 0 ) {
////		fadeColor = fadeToColor;
////		if ( fadeColor[ 3 ] == 0.0 ) {
////			this.fadeTime = 0;
////		}
////	} else {
////		t = ( float )msec * fadeRate;
////		fadeColor = fadeFromColor * t + fadeToColor * ( 1.0 - t );
////	}
////
////	if ( fadeColor[ 3 ] != 0.0 ) {
////		renderSystem.SetColor4( fadeColor[ 0 ], fadeColor[ 1 ], fadeColor[ 2 ], fadeColor[ 3 ] );
////		renderSystem.DrawStretchPic( 0, 0, 640, 480, 0, 0, 1, 1, declManager.FindMaterial( "_white" ) );
////	}
////}
////
/////*
////===================
////idPlayerView::InfluenceVision
////===================
////*/
////void idPlayerView::InfluenceVision( idUserInterface *hud, const renderView_t *view ) {
////
////	float distance = 0.0;
////	float pct = 1.0;
////	if ( this.player.GetInfluenceEntity() ) {
////		distance = ( this.player.GetInfluenceEntity().GetPhysics().GetOrigin() - this.player.GetPhysics().GetOrigin() ).Length();
////		if ( this.player.GetInfluenceRadius() != 0.0 && distance < this.player.GetInfluenceRadius() ) {
////			pct = distance / this.player.GetInfluenceRadius();
////			pct = 1.0 - idMath::ClampFloat( 0.0, 1.0, pct );
////		}
////	}
////	if ( this.player.GetInfluenceMaterial() ) {
////		SingleView( hud, view );
////		renderSystem.CaptureRenderToImage( "_currentRender" );
////		renderSystem.SetColor4( 1.0, 1.0, 1.0, pct );
////		renderSystem.DrawStretchPic( 0.0, 0.0, 640.0, 480.0, 0.0, 0.0, 1.0, 1.0, this.player.GetInfluenceMaterial() );
////	} else if ( this.player.GetInfluenceEntity() == NULL ) {
////		SingleView( hud, view );
////		return;
////	} else {
////		int offset =  25 + sinf( gameLocal.time );
////		DoubleVision( hud, view, pct * offset );
////	}
////}
////
/////*
////===================
////idPlayerView::RenderPlayerView
////===================
////*/
////void idPlayerView::RenderPlayerView( idUserInterface *hud ) {
////	const renderView_t *view = this.player.GetRenderView();
////
////	if ( g_skipViewEffects.GetBool() ) {
////		SingleView( hud, view );
////	} else {
////		if ( this.player.GetInfluenceMaterial() || this.player.GetInfluenceEntity() ) {
////			InfluenceVision( hud, view );
////		} else if ( gameLocal.time < this.dvFinishTime ) {
////			DoubleVision( hud, view, this.dvFinishTime - gameLocal.time );
////		} else if ( this.player.PowerUpActive( BERSERK ) ) {
////			BerserkVision( hud, view );
////		} else {
////			SingleView( hud, view );
////		}
////		ScreenFade();
////	}
////
////	if ( net_clientLagOMeter.GetBool() && lagoMaterial && gameLocal.isClient ) {
////		renderSystem.SetColor4( 1.0, 1.0, 1.0, 1.0 );
////		renderSystem.DrawStretchPic( 10.0, 380.0, 64.0, 64.0, 0.0, 0.0, 1.0, 1.0, lagoMaterial );
////	}	
////}
////

};
////
////#endif /* !__GAME_PLAYERVIEW_H__ */
