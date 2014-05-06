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

  idLight

===============================================================================
*/

var EV_Light_SetShader = new idEventDef( "setShader", "s" );
var EV_Light_GetLightParm = new idEventDef( "getLightParm", "d", 'f' );
var EV_Light_SetLightParm = new idEventDef( "setLightParm", "df" );
var EV_Light_SetLightParms = new idEventDef( "setLightParms", "ffff" );
var EV_Light_SetRadiusXYZ = new idEventDef( "setRadiusXYZ", "fff" );
var EV_Light_SetRadius = new idEventDef( "setRadius", "f" );
var EV_Light_On = new idEventDef( "On", null );
var EV_Light_Off = new idEventDef( "Off", null );
var EV_Light_FadeOut = new idEventDef( "fadeOutLight", "f" );
var EV_Light_FadeIn = new idEventDef( "fadeInLight", "f" );

////
////
////#ifndef __GAME_LIGHT_H__
////#define __GAME_LIGHT_H__
////
////	/*
////	===============================================================================
////
////	Generic light.
////
////	===============================================================================
////	*/
////
////	extern const idEventDef EV_Light_GetLightParm;
////	extern const idEventDef EV_Light_SetLightParm;
////	extern const idEventDef EV_Light_SetLightParms;
////
class idLight extends idEntity {
////	public:
////		CLASS_PROTOTYPE(idLight);
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idLight>[];
////
////		idLight();
////		~idLight();
////
////		void			Spawn(void);
////
////		void			Save(idSaveGame *savefile) const;					// archives object for save game file
////		void			Restore(idRestoreGame *savefile);					// unarchives object from save game file
////
////		virtual void	UpdateChangeableSpawnArgs(const idDict *source);
////		virtual void	Think(void);
////		virtual void	FreeLightDef(void);
////		virtual bool	GetPhysicsToSoundTransform(idVec3 &origin, idMat3 &axis);
////		void			Present(void);
////
////		void			SaveState(idDict *args);
////		virtual void	SetColor(float red, float green, float blue);
////		virtual void	SetColor(const idVec4 &color);
////		virtual void	GetColor(idVec3 &out) const;
////		virtual void	GetColor(idVec4 &out) const;
////		const idVec3 &	GetBaseColor(void) const { return this.baseColor; }
////		void			SetShader(const char *shadername);
////		void			SetLightParm(int parmnum, float value);
////		void			SetLightParms(float parm0, float parm1, float parm2, float parm3);
////		void			SetRadiusXYZ(float x, float y, float z);
////		void			SetRadius(float radius);
////		void			On(void);
////		void			Off(void);
////		void			Fade(const idVec4 &to, float fadeTime);
////		void			FadeOut(/*float*/time:number);
////		void			FadeIn(/*float*/time:number);
////		void			Killed(idEntity *inflictor, idEntity *attacker, int damage, const idVec3 &dir, int location);
////		void			BecomeBroken(activator:idEntity);
////		qhandle_t		GetLightDefHandle(void) const { return this.lightDefHandle; }
////		void			SetLightParent(idEntity *lparent) { lightParent = lparent; }
////		void			SetLightLevel(void);
////
////		virtual void	ShowEditingDialog(void);
////
////		enum {
////			EVENT_BECOMEBROKEN = idEntity::EVENT_MAXEVENTS,
////			EVENT_MAXEVENTS
////		};
////
////		virtual void	ClientPredictionThink(void);
////		virtual void	WriteToSnapshot(idBitMsgDelta &msg) const;
////		virtual void	ReadFromSnapshot(const idBitMsgDelta &msg);
////		virtual bool	ClientReceiveEvent(int event, /*int*/time:number, const idBitMsg &msg);
////
////	private:
	renderLight = new renderLight_t;				// light presented to the renderer
	localLightOrigin = new idVec3;			// light origin relative to the physics origin
	localLightAxis = new idMat3;				// light axis relative to physics axis
	lightDefHandle :number/*qhandle_t*/;				// handle to renderer light def
	brokenModel = new idStr;
	levels :number/*int*/;
	currentLevel :number/*int*/;
	baseColor = new idVec3;
	breakOnTrigger:boolean;
	count :number/*int*/;
	triggercount	:number/*int*/;
	lightParent:idEntity;
	fadeFrom = new idVec4;
	fadeTo = new idVec4;
	fadeStart :number/*int*/;
	fadeEnd :number/*int*/;
	soundWasPlaying:boolean;
////
////	private:
////		void			PresentLightDefChange(void);
////		void			PresentModelDefChange(void);
////
	Event_SetShader ( shadername: string ): void { throw "placeholder"; }
	Event_GetLightParm ( /*int*/ parmnum: number ): void { throw "placeholder"; }
	Event_SetLightParm ( /*int*/ parmnum: number, /*float*/ value: number ): void { throw "placeholder"; }
	Event_SetLightParms ( /*float*/ parm0: number, /*float*/ parm1: number, /*float*/ parm2: number, /*float*/ parm3: number ): void { throw "placeholder"; }
	Event_SetRadiusXYZ ( /*float*/ x: number, /*float*/ y: number, /*float*/ z: number ): void { throw "placeholder"; }
	Event_SetRadius ( /*float*/ radius: number ): void { throw "placeholder"; }
	Event_Hide ( ): void { throw "placeholder"; }
	Event_Show ( ): void { throw "placeholder"; }
	Event_On ( ): void { throw "placeholder"; }
	Event_Off ( ): void { throw "placeholder"; }
	Event_ToggleOnOff ( activator: idEntity ): void { throw "placeholder"; }
	Event_SetSoundHandles ( ): void { throw "placeholder"; }
	Event_FadeOut ( /*float*/time: number ): void { throw "placeholder"; }
	Event_FadeIn( /*float*/time: number): void { throw "placeholder"; }


	////
	/////*
	////================
	////idLight::UpdateChangeableSpawnArgs
	////================
	////*/
	////void idLight::UpdateChangeableSpawnArgs( const idDict *source ) {
	////
	////	idEntity::UpdateChangeableSpawnArgs( source );
	////
	////	if ( source ) {
	////		source.Print();
	////	}
	////	FreeSoundEmitter( true );
	////	gameEdit.ParseSpawnArgsToRefSound( source ? source : this.spawnArgs, &this.refSound );
	////	if ( this.refSound.shader && !this.refSound.waitfortrigger ) {
	////		StartSoundShader( this.refSound.shader, SND_CHANNEL_ANY, 0, false, NULL );
	////	}
	////
	////	gameEdit.ParseSpawnArgsToRenderLight( source ? source : this.spawnArgs, this.renderLight );
	////
	////	this.UpdateVisuals();
	////}

/*
================
idLight::idLight
================
*/
	constructor ( ) {
		super ( );
		this.renderLight.memset0 ( );
		this.localLightOrigin.opEquals( vec3_zero );
		this.localLightAxis.opEquals( mat3_identity );
		this.lightDefHandle = -1;
		this.levels = 0;
		this.currentLevel = 0;
		this.baseColor.opEquals( vec3_zero );
		this.breakOnTrigger = false;
		this.count = 0;
		this.triggercount = 0;
		this.lightParent = null;
		this.fadeFrom.Set( 1, 1, 1, 1 );
		this.fadeTo.Set( 1, 1, 1, 1 );
		this.fadeStart = 0;
		this.fadeEnd = 0;
		this.soundWasPlaying = false;
	}
	////
	/////*
	////================
	////idLight::~idLight
	////================
	////*/
	////idLight::~idLight() {
	////	if ( this.lightDefHandle != -1 ) {
	////		gameRenderWorld.FreeLightDef( this.lightDefHandle );
	////	}
	////}
	////
	/////*
	////================
	////idLight::Save
	////
	////archives object for save game file
	////================
	////*/
	////void idLight::Save( idSaveGame *savefile ) const {
	////	savefile.WriteRenderLight( renderLight );
	////	
	////	savefile.WriteBool( renderLight.prelightModel != NULL );
	////
	////	savefile.WriteVec3( this.localLightOrigin );
	////	savefile.WriteMat3( this.localLightAxis );
	////
	////	savefile.WriteString( this.brokenModel );
	////	savefile.WriteInt( this.levels );
	////	savefile.WriteInt( this.currentLevel );
	////
	////	savefile.WriteVec3( this.baseColor );
	////	savefile.WriteBool( this.breakOnTrigger );
	////	savefile.WriteInt( this.count );
	////	savefile.WriteInt( this.triggercount );
	////	savefile.WriteObject( lightParent );
	////
	////	savefile.WriteVec4( this.fadeFrom );
	////	savefile.WriteVec4( this.fadeTo );
	////	savefile.WriteInt( this.fadeStart );
	////	savefile.WriteInt( fadeEnd );
	////	savefile.WriteBool( this.soundWasPlaying );
	////}
	////
	/////*
	////================
	////idLight::Restore
	////
	////unarchives object from save game file
	////================
	////*/
	////void idLight::Restore( idRestoreGame *savefile ) {
	////	bool hadPrelightModel;
	////
	////	savefile.ReadRenderLight( renderLight );
	////
	////	savefile.ReadBool( hadPrelightModel );
	////	renderLight.prelightModel = renderModelManager.CheckModel( va( "_prelight_%s", this.name.c_str() ) );
	////	if ( ( renderLight.prelightModel == NULL ) && hadPrelightModel ) {
	////		assert( 0 );
	////		if ( developer.GetBool() ) {
	////			// we really want to know if this happens
	////			gameLocal.Error( "idLight::Restore: prelightModel '_prelight_%s' not found", this.name.c_str() );
	////		} else {
	////			// but let it slide after release
	////			gameLocal.Warning( "idLight::Restore: prelightModel '_prelight_%s' not found", this.name.c_str() );
	////		}
	////	}
	////
	////	savefile.ReadVec3( this.localLightOrigin );
	////	savefile.ReadMat3( this.localLightAxis );
	////
	////	savefile.ReadString( this.brokenModel );
	////	savefile.ReadInt( this.levels );
	////	savefile.ReadInt( this.currentLevel );
	////
	////	savefile.ReadVec3( this.baseColor );
	////	savefile.ReadBool( this.breakOnTrigger );
	////	savefile.ReadInt( this.count );
	////	savefile.ReadInt( this.triggercount );
	////	savefile.ReadObject( reinterpret_cast<idClass *&>( lightParent ) );
	////
	////	savefile.ReadVec4( this.fadeFrom );
	////	savefile.ReadVec4( this.fadeTo );
	////	savefile.ReadInt( this.fadeStart );
	////	savefile.ReadInt( fadeEnd );
	////	savefile.ReadBool( this.soundWasPlaying );
	////
	////	this.lightDefHandle = -1;
	////
	////	this.SetLightLevel();
	////}
	
	/*
	================
	idLight::Spawn
	================
	*/
	Spawn ( ): void {
		var /*bool */start_off = new R<boolean> ( );
		var /*bool */needBroken: boolean;
		var /*const char **/demonic_shader = new R<string> ( );

		// do the parsing the same way dmap and the editor do
		gameEdit.ParseSpawnArgsToRenderLight( this.spawnArgs, this.renderLight );

		// we need the origin and axis relative to the physics origin/axis
		this.localLightOrigin.opEquals( idMat3.opMultiplication_VecMat( ( this.renderLight.origin.opSubtraction( this.GetPhysics ( ).GetOrigin ( ) ) ), this.GetPhysics ( ).GetAxis ( ).Transpose ( ) ) );
		this.localLightAxis.opEquals( this.renderLight.axis.opMultiplication( this.GetPhysics ( ).GetAxis ( ).Transpose ( ) ) );

		// set the base color from the shader parms
		this.baseColor.Set( this.renderLight.shaderParms[SHADERPARM_RED], this.renderLight.shaderParms[SHADERPARM_GREEN], this.renderLight.shaderParms[SHADERPARM_BLUE] );

		// set the number of light levels
		this.levels = this.spawnArgs.GetInt( "levels", "1" );
		this.currentLevel = this.levels;
		if ( this.levels <= 0 ) {
			gameLocal.Error( "Invalid light level set on entity #%d(%s)", this.entityNumber, this.name.c_str ( ) );
		}

		// make sure the demonic shader is cached
		if ( this.spawnArgs.GetString_Rstring( "mat_demonic", null, demonic_shader ) ) {
			declManager.FindType( declType_t.DECL_MATERIAL, demonic_shader.$ );
		}

		// game specific functionality, not mirrored in
		// editor or dmap light parsing

		// also put the light texture on the model, so light flares
		// can get the current intensity of the light
		this.renderEntity.referenceShader = this.renderLight.shader;

		this.lightDefHandle = -1; // no static version yet

		// see if an optimized shadow volume exists
		// the renderer will ignore this value after a light has been moved,
		// but there may still be a chance to get it wrong if the game moves
		// a light before the first present, and doesn't clear the prelight
		this.renderLight.prelightModel = null;
		if ( this.name.data ) {
			// this will return 0 if not found
			this.renderLight.prelightModel = renderModelManager.CheckModel( va( "_prelight_%s", this.name.c_str ( ) ) );
		}

		this.spawnArgs.GetBool_R( "start_off", "0", start_off );
		if ( start_off.$ ) {
			this.Off ( );
		}

		this.health = this.spawnArgs.GetInt( "health", "0" );
		this.spawnArgs.GetString_RidStr( "broken", "", this.brokenModel );
		this.breakOnTrigger = this.spawnArgs.GetBool( "break", "0" );
		this.count = this.spawnArgs.GetInt( "count", "1" );

		this.triggercount = 0;

		this.fadeFrom.Set( 1, 1, 1, 1 );
		this.fadeTo.Set( 1, 1, 1, 1 );
		this.fadeStart = 0;
		this.fadeEnd = 0;

		// if we have a health make light breakable
		if ( this.health ) {
			var model = new idStr( this.spawnArgs.GetString( "model" ) ); // get the visual model
			if ( !model.Length ( ) ) {
				gameLocal.Error( "Breakable light without a model set on entity #%d(%s)", this.entityNumber, this.name.c_str ( ) );
			}

			this.fl.takedamage = true;

			// see if we need to create a broken model name
			needBroken = true;
			if ( model.Length ( ) && !this.brokenModel.Length ( ) ) {
				var /*int	*/pos: number;

				needBroken = false;

				pos = model.Find( "." );
				if ( pos < 0 ) {
					pos = model.Length ( );
				}
				if ( pos > 0 ) {
					model.Left_Result( pos, this.brokenModel );
				}
				this.brokenModel.Append( "_broken" );
				if ( pos > 0 ) {
					this.brokenModel.Append( model.data[pos] );
				}
			}

			// make sure the model gets cached
			if ( !renderModelManager.CheckModel( this.brokenModel.data ) ) {
				if ( needBroken ) {
					gameLocal.Error( "Model '%s' not found for entity %d(%s)", this.brokenModel.c_str ( ), this.entityNumber, this.name.c_str ( ) );
				} else {
					this.brokenModel.opEquals( "" );
				}
			}

			this.GetPhysics ( ).SetContents( this.spawnArgs.GetBool( "nonsolid" ) ? 0 : contentsFlags_t.CONTENTS_SOLID );

			// make sure the collision model gets cached
			idClipModel.CheckModel( this.brokenModel.data );
		}

		this.PostEventMS( EV_PostSpawn, 0 );

		this.UpdateVisuals ( );
	}

/*
================
idLight::SetLightLevel
================
*/
SetLightLevel( ):void {
	var color = new idVec3	;
	var/*float	*/intensity:number;

	intensity = /*( float )*/this.currentLevel / this.levels;
	color.opEquals( this.baseColor.timesFloat( intensity ) );
	this.renderLight.shaderParms[ SHADERPARM_RED ]	= color[ 0 ];
	this.renderLight.shaderParms[ SHADERPARM_GREEN ]	= color[ 1 ];
	this.renderLight.shaderParms[ SHADERPARM_BLUE ]	= color[ 2 ];
	this.renderEntity.shaderParms[ SHADERPARM_RED ]	= color[ 0 ];
	this.renderEntity.shaderParms[ SHADERPARM_GREEN ]= color[ 1 ];
	this.renderEntity.shaderParms[ SHADERPARM_BLUE ]	= color[ 2 ];
	this.PresentLightDefChange();
	this.PresentModelDefChange();
}

/////*
////================
////idLight::GetColor
////================
////*/
////void idLight::GetColor( idVec3 &out ) const {
////	out[ 0 ] = this.renderLight.shaderParms[ SHADERPARM_RED ];
////	out[ 1 ] = this.renderLight.shaderParms[ SHADERPARM_GREEN ];
////	out[ 2 ] = this.renderLight.shaderParms[ SHADERPARM_BLUE ];
////}
////
/////*
////================
////idLight::GetColor
////================
////*/
////void idLight::GetColor( idVec4 &out ) const {
////	out[ 0 ] = this.renderLight.shaderParms[ SHADERPARM_RED ];
////	out[ 1 ] = this.renderLight.shaderParms[ SHADERPARM_GREEN ];
////	out[ 2 ] = this.renderLight.shaderParms[ SHADERPARM_BLUE ];
////	out[ 3 ] = this.renderLight.shaderParms[ SHADERPARM_ALPHA ];
////}
////
/////*
////================
////idLight::SetColor
////================
////*/
////void idLight::SetColor( float red, float green, float blue ) {
////	this.baseColor.Set( red, green, blue );
////	SetLightLevel();
////}
////
/////*
////================
////idLight::SetColor
////================
////*/
////void idLight::SetColor( const idVec4 &color ) {
////	this.baseColor = color.ToVec3();
////	this.renderLight.shaderParms[ SHADERPARM_ALPHA ]		= color[ 3 ];
////	this.renderEntity.shaderParms[ SHADERPARM_ALPHA ]	= color[ 3 ];
////	SetLightLevel();
////}
////
/////*
////================
////idLight::SetShader
////================
////*/
////void idLight::SetShader( const char *shadername ) {
////	// allow this to be NULL
////	this.renderLight.shader = declManager.FindMaterial( shadername, false );
////	this.PresentLightDefChange();
////}
////
/////*
////================
////idLight::SetLightParm
////================
////*/
////void idLight::SetLightParm( int parmnum, float value ) {
////	if ( ( parmnum < 0 ) || ( parmnum >= MAX_ENTITY_SHADER_PARMS ) ) {
////		gameLocal.Error( "shader parm index (%d) out of range", parmnum );
////	}
////
////	this.renderLight.shaderParms[ parmnum ] = value;
////	this.PresentLightDefChange();
////}
////
/////*
////================
////idLight::SetLightParms
////================
////*/
////void idLight::SetLightParms( float parm0, float parm1, float parm2, float parm3 ) {
////	this.renderLight.shaderParms[ SHADERPARM_RED ]		= parm0;
////	this.renderLight.shaderParms[ SHADERPARM_GREEN ]		= parm1;
////	this.renderLight.shaderParms[ SHADERPARM_BLUE ]		= parm2;
////	this.renderLight.shaderParms[ SHADERPARM_ALPHA ]		= parm3;
////	this.renderEntity.shaderParms[ SHADERPARM_RED ]		= parm0;
////	this.renderEntity.shaderParms[ SHADERPARM_GREEN ]	= parm1;
////	this.renderEntity.shaderParms[ SHADERPARM_BLUE ]		= parm2;
////	this.renderEntity.shaderParms[ SHADERPARM_ALPHA ]	= parm3;
////	this.PresentLightDefChange();
////	this.PresentModelDefChange();
////}
////
/////*
////================
////idLight::SetRadiusXYZ
////================
////*/
////void idLight::SetRadiusXYZ( float x, float y, float z ) {
////	this.renderLight.lightRadius[0] = x;
////	this.renderLight.lightRadius[1] = y;
////	this.renderLight.lightRadius[2] = z;
////	this.PresentLightDefChange();
////}
////
/////*
////================
////idLight::SetRadius
////================
////*/
////void idLight::SetRadius( float radius ) {
////	this.renderLight.lightRadius[0] = this.renderLight.lightRadius[1] = this.renderLight.lightRadius[2] = radius;
////	this.PresentLightDefChange();
////}
////
/////*
////================
////idLight::On
////================
////*/
////void idLight::On( ) {
////	this.currentLevel = this.levels;
////	// offset the start time of the shader to sync it to the game time
////	this.renderLight.shaderParms[ SHADERPARM_TIMEOFFSET ] = -MS2SEC( gameLocal.time );
////	if ( ( this.soundWasPlaying || this.refSound.waitfortrigger ) && this.refSound.shader ) {
////		StartSoundShader( this.refSound.shader, SND_CHANNEL_ANY, 0, false, NULL );
////		this.soundWasPlaying = false;
////	}
////	SetLightLevel();
////	this.BecomeActive( TH_UPDATEVISUALS );
////}
////
/*
================
idLight::Off
================
*/
	Off ( ): void {
		this.currentLevel = 0;
		// kill any sound it was making
		if ( this.refSound.referenceSound && this.refSound.referenceSound.CurrentlyPlaying ( ) ) {
			this.StopSound( gameSoundChannel_t.SND_CHANNEL_ANY, false );
			this.soundWasPlaying = true;
		}
		this.SetLightLevel ( );
		this.BecomeActive( TH_UPDATEVISUALS );
	}

/////*
////================
////idLight::Fade
////================
////*/
////void idLight::Fade( const idVec4 &to, float fadeTime ) {
////	GetColor( this.fadeFrom );
////	this.fadeTo = to;
////	this.fadeStart = gameLocal.time;
////	this.fadeEnd = gameLocal.time + SEC2MS( fadeTime );
////	this.BecomeActive( TH_THINK );
////}
////
/////*
////================
////idLight::FadeOut
////================
////*/
////void idLight::FadeOut( /*float*/time:number ) {
////	Fade( colorBlack, time );
////}
////
/////*
////================
////idLight::FadeIn
////================
////*/
////void idLight::FadeIn( /*float*/time:number ) {
////	var color = new idVec3;
////	idVec4 color4;
////
////	this.currentLevel = this.levels;
////	this.spawnArgs.GetVector( "_color", "1 1 1", color );
////	color4.Set( color.x, color.y, color.z, 1.0 );
////	Fade( color4, time );
////}
////
/////*
////================
////idLight::Killed
////================
////*/
////void idLight::Killed( idEntity *inflictor, idEntity *attacker, int damage, const idVec3 &dir, int location ) {
////	BecomeBroken( attacker );
////}
////
/////*
////================
////idLight::BecomeBroken
////================
////*/
////void idLight::BecomeBroken( activator:idEntity ) {
////	const char *damageDefName;
////
////	this.fl.takedamage = false;
////
////	if ( this.brokenModel.Length() ) {
////		SetModel( this.brokenModel );
////
////		if ( !this.spawnArgs.GetBool( "nonsolid" ) ) {
////			this.GetPhysics().SetClipModel( new idClipModel( this.brokenModel.c_str() ), 1.0 );
////			this.GetPhysics().SetContents( contentsFlags_t.CONTENTS_SOLID );
////		}
////	} else if ( this.spawnArgs.GetBool( "hideModelOnBreak" ) ) {
////		SetModel( "" );
////		this.GetPhysics().SetContents( 0 );
////	}
////
////	if ( gameLocal.isServer ) {
////
////		ServerSendEvent( EVENT_BECOMEBROKEN, NULL, true, -1 );
////
////		if ( this.spawnArgs.GetString( "def_damage", "", &damageDefName ) ) {
////			idVec3 origin = this.renderEntity.origin + this.renderEntity.bounds.GetCenter() * this.renderEntity.axis;
////			gameLocal.RadiusDamage( origin, activator, activator, this, this, damageDefName );
////		}
////
////	}
////
////		ActivateTargets( activator );
////
////	// offset the start time of the shader to sync it to the game time
////	this.renderEntity.shaderParms[ SHADERPARM_TIMEOFFSET ] = -MS2SEC( gameLocal.time );
////	this.renderLight.shaderParms[ SHADERPARM_TIMEOFFSET ] = -MS2SEC( gameLocal.time );
////
////	// set the state parm
////	this.renderEntity.shaderParms[ SHADERPARM_MODE ] = 1;
////	this.renderLight.shaderParms[ SHADERPARM_MODE ] = 1;
////
////	// if the light has a sound, either start the alternate (broken) sound, or stop the sound
////	const char *parm = this.spawnArgs.GetString( "snd_broken" );
////	if ( this.refSound.shader || ( parm && *parm ) ) {
////		this.StopSound( SND_CHANNEL_ANY, false );
////		const idSoundShader *alternate = this.refSound.shader ? this.refSound.shader.GetAltSound() : declManager.FindSound( parm );
////		if ( alternate ) {
////			// start it with no diversity, so the leadin break sound plays
////			this.refSound.referenceSound.StartSound( alternate, SND_CHANNEL_ANY, 0.0, 0 );
////		}
////	}
////
////	parm = this.spawnArgs.GetString( "mtr_broken" );
////	if ( parm && *parm ) {
////		SetShader( parm );
////	}
////
////	this.UpdateVisuals();
////}

/*
================
idLight::PresentLightDefChange
================
*/
	PresentLightDefChange ( ): void {
		// let the renderer apply it to the world
		if ( ( this.lightDefHandle != -1 ) ) {
			gameRenderWorld.UpdateLightDef( this.lightDefHandle, this.renderLight );
		} else {
			this.lightDefHandle = gameRenderWorld.AddLightDef( this.renderLight );
		}
	}

/*
================
idLight::PresentModelDefChange
================
*/
	PresentModelDefChange ( ): void {

		if ( !this.renderEntity.hModel || this.IsHidden ( ) ) {
			return;
		}

		// add to refresh list
		if ( this.modelDefHandle == -1 ) {
			this.modelDefHandle = gameRenderWorld.AddEntityDef( this.renderEntity );
		} else {
			gameRenderWorld.UpdateEntityDef( this.modelDefHandle, this.renderEntity );
		}
	}
////
/////*
////================
////idLight::Present
////================
////*/
////void idLight::Present( ) {
////	// don't present to the renderer if the entity hasn't changed
////	if ( !( thinkFlags & TH_UPDATEVISUALS ) ) {
////		return;
////	}
////
////	// add the model
////	idEntity::Present();
////
////	// current transformation
////	this.renderLight.axis	= this.localLightAxis * this.GetPhysics().GetAxis();
////	this.renderLight.origin  = this.GetPhysics().GetOrigin() + this.GetPhysics().GetAxis() * this.localLightOrigin;
////
////	// reference the sound for shader synced effects
////	if ( lightParent ) {
////		this.renderLight.referenceSound = lightParent.GetSoundEmitter();
////		this.renderEntity.referenceSound = lightParent.GetSoundEmitter();
////	}
////	else {
////		this.renderLight.referenceSound = this.refSound.referenceSound;
////		this.renderEntity.referenceSound = this.refSound.referenceSound;
////	}
////
////	// update the this.renderLight and this.renderEntity to render the light and flare
////	this.PresentLightDefChange();
////	this.PresentModelDefChange();
////}
////
/////*
////================
////idLight::Think
////================
////*/
////void idLight::Think( ) {
////	var color = new idVec4;
////
////	if ( thinkFlags & TH_THINK ) {
////		if ( this.fadeEnd > 0 ) {
////			if ( gameLocal.time < this.fadeEnd ) {
////				color.Lerp( this.fadeFrom, this.fadeTo, ( float )( gameLocal.time - this.fadeStart ) / ( float )( this.fadeEnd - this.fadeStart ) );
////			} else {
////				color = this.fadeTo;
////				this.fadeEnd = 0;
////				BecomeInactive( TH_THINK );
////			}
////			SetColor( color );
////		}
////	}
////
////	RunPhysics();
////	Present();
////}
////
/////*
////================
////idLight::GetPhysicsToSoundTransform
////================
////*/
////bool idLight::GetPhysicsToSoundTransform(origin: idVec3, idMat3 &axis ) {
////	origin = this.localLightOrigin + this.renderLight.lightCenter;
////	axis = this.localLightAxis * this.GetPhysics().GetAxis();
////	return true;
////}
////
/////*
////================
////idLight::FreeLightDef
////================
////*/
////void idLight::FreeLightDef( ) {
////	if ( this.lightDefHandle != -1 ) {
////		gameRenderWorld.FreeLightDef( this.lightDefHandle );
////		this.lightDefHandle = -1;
////	}
////}
////
/////*
////================
////idLight::SaveState
////================
////*/
////void idLight::SaveState( idDict *args ) {
////	int i, c = this.spawnArgs.GetNumKeyVals();
////	for ( i = 0; i < c; i++ ) {
////		const idKeyValue *pv = this.spawnArgs.GetKeyVal(i);
////		if ( pv.GetKey().Find( "editor_", false ) >= 0 || pv.GetKey().Find( "parse_", false ) >= 0 ) {
////			continue;
////		}
////		args.Set( pv.GetKey(), pv.GetValue() );
////	}
////}
////
/////*
////===============
////idLight::ShowEditingDialog
////===============
////*/
////void idLight::ShowEditingDialog( ) {
////	if ( g_editEntityMode.GetInteger() == 1 ) {
////		common.InitTool( EDITOR_LIGHT, this.spawnArgs );
////	} else {
////		common.InitTool( EDITOR_SOUND, this.spawnArgs );
////	}
////}
////
/////*
////================
////idLight::Event_SetShader
////================
////*/
////void idLight::Event_SetShader( const char *shadername ) {
////	SetShader( shadername );
////}
////
/////*
////================
////idLight::Event_GetLightParm
////================
////*/
////void idLight::Event_GetLightParm( int parmnum ) {
////	if ( ( parmnum < 0 ) || ( parmnum >= MAX_ENTITY_SHADER_PARMS ) ) {
////		gameLocal.Error( "shader parm index (%d) out of range", parmnum );
////	}
////
////	idThread::ReturnFloat( this.renderLight.shaderParms[ parmnum ] );
////}
////
/////*
////================
////idLight::Event_SetLightParm
////================
////*/
////void idLight::Event_SetLightParm( int parmnum, float value ) {
////	SetLightParm( parmnum, value );
////}
////
/////*
////================
////idLight::Event_SetLightParms
////================
////*/
////void idLight::Event_SetLightParms( float parm0, float parm1, float parm2, float parm3 ) {
////	SetLightParms( parm0, parm1, parm2, parm3 );
////}
////
/////*
////================
////idLight::Event_SetRadiusXYZ
////================
////*/
////void idLight::Event_SetRadiusXYZ( float x, float y, float z ) {
////	SetRadiusXYZ( x, y, z );
////}
////
/////*
////================
////idLight::Event_SetRadius
////================
////*/
////void idLight::Event_SetRadius( float radius ) {
////	SetRadius( radius );
////}
////
/////*
////================
////idLight::Event_Hide
////================
////*/
////void idLight::Event_Hide( ) {
////	Hide();
////	this.PresentModelDefChange();
////	this.Off();
////}
////
/////*
////================
////idLight::Event_Show
////================
////*/
////void idLight::Event_Show( ) {
////	Show();
////	this.PresentModelDefChange();
////	On();
////}
////
/////*
////================
////idLight::Event_On
////================
////*/
////void idLight::Event_On( ) {
////	On();
////}
////
/////*
////================
////idLight::Event_Off
////================
////*/
////void idLight::Event_Off( ) {
////	this.Off();
////}
////
/////*
////================
////idLight::Event_ToggleOnOff
////================
////*/
////void idLight::Event_ToggleOnOff( activator:idEntity ) {
////	this.triggercount++;
////	if ( this.triggercount < this.count ) {
////		return;
////	}
////
////	// reset trigger this.count
////	this.triggercount = 0;
////
////	if ( this.breakOnTrigger ) {
////		BecomeBroken( activator );
////		this.breakOnTrigger = false;
////		return;
////	}
////
////	if ( !this.currentLevel ) {
////		On();
////	}
////	else {
////		this.currentLevel--;
////		if ( !this.currentLevel ) {
////			this.Off();
////		}
////		else {
////			this.SetLightLevel();
////		}
////	}
////}
////
/////*
////================
////idLight::Event_SetSoundHandles
////
////  set the same sound def handle on all targeted lights
////================
////*/
////void idLight::Event_SetSoundHandles( ) {
////	var/*int*/i:number;
////	idEntity *targetEnt;
////
////	if ( !this.refSound.referenceSound ) {
////		return;
////	}
////
////	for ( i = 0; i < targets.Num(); i++ ) {
////		targetEnt = targets[ i ].GetEntity();
////		if ( targetEnt && targetEnt.IsType( idLight::Type ) ) {
////			idLight	*light = static_cast<idLight*>(targetEnt);
////			light.lightParent = this;
////
////			// explicitly delete any sounds on the entity
////			light.FreeSoundEmitter( true );
////
////			// manually set the refSound to this light's refSound
////			light.renderEntity.referenceSound = this.renderEntity.referenceSound;
////
////			// update the renderEntity to the renderer
////			light.UpdateVisuals();
////		}
////	}
////}
////
/////*
////================
////idLight::Event_FadeOut
////================
////*/
////void idLight::Event_FadeOut( /*float*/time:number ) {
////	FadeOut( time );
////}
////
/////*
////================
////idLight::Event_FadeIn
////================
////*/
////void idLight::Event_FadeIn( /*float*/time:number ) {
////	FadeIn( time );
////}
////
/////*
////================
////idLight::ClientPredictionThink
////================
////*/
////void idLight::ClientPredictionThink( ) {
////	Think();
////}
////
/////*
////================
////idLight::WriteToSnapshot
////================
////*/
////void idLight::WriteToSnapshot( idBitMsgDelta &msg ) const {
////
////	this.GetPhysics().WriteToSnapshot( msg );
////	WriteBindToSnapshot( msg );
////
////	msg.WriteByte( this.currentLevel );
////	msg.WriteLong( PackColor( this.baseColor ) );
////	// msg.WriteBits( lightParent.GetEntityNum(), GENTITYNUM_BITS );
////
/////*	// only helps prediction
////	msg.WriteLong( PackColor( this.fadeFrom ) );
////	msg.WriteLong( PackColor( this.fadeTo ) );
////	msg.WriteLong( this.fadeStart );
////	msg.WriteLong( this.fadeEnd );
////*/
////
////	// FIXME: send this.renderLight.shader
////	msg.WriteFloat( this.renderLight.lightRadius[0], 5, 10 );
////	msg.WriteFloat( this.renderLight.lightRadius[1], 5, 10 );
////	msg.WriteFloat( this.renderLight.lightRadius[2], 5, 10 );
////
////	msg.WriteLong( PackColor( idVec4( this.renderLight.shaderParms[SHADERPARM_RED],
////									  this.renderLight.shaderParms[SHADERPARM_GREEN],
////									  this.renderLight.shaderParms[SHADERPARM_BLUE],
////									  this.renderLight.shaderParms[SHADERPARM_ALPHA] ) ) );
////
////	msg.WriteFloat( this.renderLight.shaderParms[SHADERPARM_TIMESCALE], 5, 10 );
////	msg.WriteLong( this.renderLight.shaderParms[SHADERPARM_TIMEOFFSET] );
////	//msg.WriteByte( this.renderLight.shaderParms[SHADERPARM_DIVERSITY] );
////	msg.WriteShort( this.renderLight.shaderParms[SHADERPARM_MODE] );
////
////	WriteColorToSnapshot( msg );
////}
////
/////*
////================
////idLight::ReadFromSnapshot
////================
////*/
////void idLight::ReadFromSnapshot( const idBitMsgDelta &msg ) {
////	idVec4	shaderColor;
////	int		oldCurrentLevel = this.currentLevel;
////	idVec3	oldBaseColor = this.baseColor;
////
////	this.GetPhysics().ReadFromSnapshot( msg );
////	ReadBindFromSnapshot( msg );
////
////	this.currentLevel = msg.ReadByte();
////	if ( this.currentLevel != oldCurrentLevel ) {
////		// need to call On/Off for flickering lights to start/stop the sound
////		// while doing it this way rather than through events, the flickering is out of sync between clients
////		// but at least there is no question about saving the event and having them happening globally in the world
////		if ( this.currentLevel ) {
////			On();
////		} else {
////			this.Off();
////		}
////	}
////	UnpackColor( msg.ReadLong(), this.baseColor );
////	// lightParentEntityNum = msg.ReadBits( GENTITYNUM_BITS );	
////
/////*	// only helps prediction
////	UnpackColor( msg.ReadLong(), this.fadeFrom );
////	UnpackColor( msg.ReadLong(), this.fadeTo );
////	this.fadeStart = msg.ReadLong();
////	this.fadeEnd = msg.ReadLong();
////*/
////
////	// FIXME: read this.renderLight.shader
////	this.renderLight.lightRadius[0] = msg.ReadFloat( 5, 10 );
////	this.renderLight.lightRadius[1] = msg.ReadFloat( 5, 10 );
////	this.renderLight.lightRadius[2] = msg.ReadFloat( 5, 10 );
////
////	UnpackColor( msg.ReadLong(), shaderColor );
////	this.renderLight.shaderParms[SHADERPARM_RED] = shaderColor[0];
////	this.renderLight.shaderParms[SHADERPARM_GREEN] = shaderColor[1];
////	this.renderLight.shaderParms[SHADERPARM_BLUE] = shaderColor[2];
////	this.renderLight.shaderParms[SHADERPARM_ALPHA] = shaderColor[3];
////
////	this.renderLight.shaderParms[SHADERPARM_TIMESCALE] = msg.ReadFloat( 5, 10 );
////	this.renderLight.shaderParms[SHADERPARM_TIMEOFFSET] = msg.ReadLong();
////	//this.renderLight.shaderParms[SHADERPARM_DIVERSITY] = msg.ReadFloat();
////	this.renderLight.shaderParms[SHADERPARM_MODE] = msg.ReadShort();
////
////	ReadColorFromSnapshot( msg );
////
////	if ( msg.HasChanged() ) {
////		if ( ( this.currentLevel != oldCurrentLevel ) || ( this.baseColor != oldBaseColor ) ) {
////			this.SetLightLevel();
////		} else {
////			this.PresentLightDefChange();
////			this.PresentModelDefChange();
////		}
////	}
////}
////
/////*
////================
////idLight::ClientReceiveEvent
////================
////*/
////bool idLight::ClientReceiveEvent( int event, /*int*/time:number, const idBitMsg &msg ) {
////
////	switch( event ) {
////		case EVENT_BECOMEBROKEN: {
////			BecomeBroken( NULL );
////			return true;
////		}
////		default: {
////			return idEntity::ClientReceiveEvent( event, time, msg );
////		}
////	}
////	return false;
////}
};


////CLASS_DECLARATION( idEntity, idLight )
idLight.CreateInstance = function (): idClass {
	try {
		var ptr = new idLight;
		ptr.FindUninitializedMemory();
		return ptr;
	} catch (e) {
		return null;
	}
};

idLight.prototype.GetType = function (): idTypeInfo {
	return (idLight.Type);
};

idLight.eventCallbacks = [
	EVENT(EV_Light_SetShader, idLight.prototype.Event_SetShader),
	EVENT(EV_Light_GetLightParm, idLight.prototype.Event_GetLightParm),
	EVENT(EV_Light_SetLightParm, idLight.prototype.Event_SetLightParm),
	EVENT(EV_Light_SetLightParms, idLight.prototype.Event_SetLightParms),
	EVENT(EV_Light_SetRadiusXYZ, idLight.prototype.Event_SetRadiusXYZ),
	EVENT(EV_Light_SetRadius, idLight.prototype.Event_SetRadius),
	EVENT(EV_Hide, idLight.prototype.Event_Hide),
	EVENT(EV_Show, idLight.prototype.Event_Show),
	EVENT(EV_Light_On, idLight.prototype.Event_On),
	EVENT(EV_Light_Off, idLight.prototype.Event_Off),
	EVENT(EV_Activate, idLight.prototype.Event_ToggleOnOff),
	EVENT(EV_PostSpawn, idLight.prototype.Event_SetSoundHandles),
	EVENT(EV_Light_FadeOut, idLight.prototype.Event_FadeOut),
	EVENT(EV_Light_FadeIn, idLight.prototype.Event_FadeIn)
];

idLight.Type = new idTypeInfo("idLight", "idEntity",
	idLight.eventCallbacks, idLight.CreateInstance, idLight.prototype.Spawn,
	idLight.prototype.Save, idLight.prototype.Restore);

////END_CLASS
////
////

////#endif /* !__GAME_LIGHT_H__ */
////
////