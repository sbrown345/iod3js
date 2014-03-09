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
////#include "snd_local.h"
////


// it is somewhat tempting to make this a virtual class to hide the private
// details here, but that doesn't fit easily with the decl manager at the moment.
class idSoundShader extends idDecl {
	////public:
	////							idSoundShader( void );
	////	virtual					~idSoundShader( void );
	////
	////	virtual size_t			Size( void ) const;
	////	virtual bool			SetDefaultText( void );
	////	virtual const char *	DefaultDefinition( void ) const;
	////	virtual bool			Parse( text:string, const int textLength );
	////	virtual void			FreeData( void );
	////	virtual void			List( void ) const;
	////
	////	virtual const char *	GetDescription() const;
	////
	////	// so the editor can draw correct default sound spheres
	////	// this is currently defined as meters, which sucks, IMHO.
	////	virtual float			GetMinDistance() const;		// FIXME: replace this with a GetSoundShaderParms()
	////	virtual float			GetMaxDistance() const;
	////
	////	// returns NULL if an AltSound isn't defined in the shader.
	////	// we use this for pairing a specific broken light sound with a normal light sound
	////	virtual const idSoundShader *GetAltSound() const;
	////
	////	virtual bool			HasDefaultSound() const;
	////
	////	virtual const soundShaderParms_t *GetParms() const;
	////	virtual int				GetNumSounds() const;
	////	virtual const char *	GetSound( int index ) const;
	////
	////	virtual bool			CheckShakesAndOgg( void ) const;
	////
	////private:
	////	friend class idSoundWorldLocal;
	////	friend class idSoundEmitterLocal;
	////	friend class idSoundChannel;
	////	friend class idSoundCache;
	////
	////	// options from sound shader text
	parms = new soundShaderParms_t; // can be overriden on a per-channel basis

	onDemand: boolean; // only load when played, and free when finished
	speakerMask: number /*int*/;
	altSound: idSoundShader;
	desc = new idStr; // description
	errorDuringParse: boolean;
	leadinVolume: number /*float*/; // allows light breaking leadin sounds to be much louder than the broken loop

	leadins = new Array<idSoundSample>( SOUND_MAX_LIST_WAVS );
	numLeadins: number /*int*/;
	entries = new Array<idSoundSample>( SOUND_MAX_LIST_WAVS );
	numEntries: number /*int*/;
	////
	////private:
	////	void					Init( void );
	////	bool					ParseShader( idLexer &src );


/*
===============
idSoundShader::Init
===============
*/
	Init ( ): void {
		this.desc.equals( "<no description>" );
		this.errorDuringParse = false;
		this.onDemand = false;
		this.numEntries = 0;
		this.numLeadins = 0;
		this.leadinVolume = 0;
		this.altSound = null;
	}
/*
===============
idSoundShader::idSoundShader
===============
*/
	constructor ( ) {
		super ( );
		this.Init ( );
	}


/////*
////===============
////idSoundShader::~idSoundShader
////===============
////*/
////idSoundShader::~idSoundShader( void ) {
////}
////
/*
=================
idSoundShader::Size
=================
*/
	Size ( ): number {
		return sizeof( idSoundShader );
	}

/*
===============
idSoundShader::idSoundShader::FreeData
===============
*/
	FreeData ( ): void {
		this.numEntries = 0;
		this.numLeadins = 0;
	}

/*
===================
idSoundShader::SetDefaultText
===================
*/
	SetDefaultText ( ): boolean {
		var wavname = new idStr;

		wavname.equals( this.GetName ( ) );
		wavname.DefaultFileExtension( ".wav" ); // if the name has .ogg in it, that will stay

		// if there exists a wav file with the same name
		if ( 1 ) { //fileSystem.ReadFile( wavname, NULL ) != -1 ) {
			var generated = new Uint8Array( 2048 );
			idStr.snPrintf( generated, sizeof( generated ),
				"sound %s // IMPLICITLY GENERATED\n" +
				"{\n" +
				"%s\n" +
				"}\n", this.GetName ( ), wavname.c_str ( ) );
			this.SetText( generated );
			return true;
		} else {
			return false;
		}
	}

/*
===================
DefaultDefinition
===================
*/
	DefaultDefinition ( ): string {
		return "{\n" +
			"\t" + "_default.wav\n" +
			"}";
	}

/*
===============
idSoundShader::Parse

  this is called by the declManager
===============
*/
	Parse ( text: string, /*int */textLength: number ): boolean {
		var src = new idLexer;

		src.LoadMemory( text, textLength, this.GetFileName ( ), this.GetLineNum ( ) );
		src.SetFlags( DECL_LEXER_FLAGS );
		src.SkipUntilString( "{" );

		// deeper functions can set this, which will cause MakeDefault() to be called at the end
		this.errorDuringParse = false;

		if ( !this.ParseShader( src ) || this.errorDuringParse ) {
			this.MakeDefault ( );
			return false;
		}
		return true;
	}

/*
===============
idSoundShader::ParseShader
===============
*/
	ParseShader ( src: idLexer ): boolean {
		var /*int	*/i: number;
		var token = new idToken;;

		this.parms.minDistance = 1;
		this.parms.maxDistance = 10;
		this.parms.volume = 1;
		this.parms.shakes = 0;
		this.parms.soundShaderFlags = 0;
		this.parms.soundClass = 0;

		this.speakerMask = 0;
		this.altSound = null;

		for ( i = 0; i < SOUND_MAX_LIST_WAVS; i++ ) {
			this.leadins[i] = null;
			this.entries[i] = null;
		}
		this.numEntries = 0;
		this.numLeadins = 0;

		var /*int */ maxSamples = idSoundSystemLocal.s_maxSoundsPerShader.GetInteger ( );
		if ( com_makingBuild.GetBool ( ) || maxSamples <= 0 || maxSamples > SOUND_MAX_LIST_WAVS ) {
			maxSamples = SOUND_MAX_LIST_WAVS;
		}

		while ( 1 ) {
			if ( !src.ExpectAnyToken( token ) ) {
				return false;
			}
			// end of definition
			else if ( token.data == "}" ) {
				break;
			}
			// minimum number of sounds
			else if ( !token.Icmp( "minSamples" ) ) {
				maxSamples = idMath.ClampInt( src.ParseInt ( ), SOUND_MAX_LIST_WAVS, maxSamples );
			}
			// description
			else if ( !token.Icmp( "description" ) ) {
				src.ReadTokenOnLine( token );
				this.desc.equals( token.c_str ( ) );
			}
			// mindistance
			else if ( !token.Icmp( "mindistance" ) ) {
				this.parms.minDistance = src.ParseFloat ( );
			}
			// maxdistance
			else if ( !token.Icmp( "maxdistance" ) ) {
				this.parms.maxDistance = src.ParseFloat ( );
			}
			// shakes screen
			else if ( !token.Icmp( "shakes" ) ) {
				src.ExpectAnyToken( token );
				if ( token.type == TT_NUMBER ) {
					this.parms.shakes = token.GetFloatValue ( );
				} else {
					src.UnreadToken( token );
					this.parms.shakes = 1.0;
				}
			}
			// reverb
			else if ( !token.Icmp( "reverb" ) ) {
				var /*int */reg0 = src.ParseFloat ( );
				if ( !src.ExpectTokenString( "," ) ) {
					src.FreeSource ( );
					return false;
				}
				var /*int */ reg1 = src.ParseFloat ( );
				// no longer supported
			}
			// volume
			else if ( !token.Icmp( "volume" ) ) {
				this.parms.volume = src.ParseFloat ( );
			}
			// leadinVolume is used to allow light breaking leadin sounds to be much louder than the broken loop
			else if ( !token.Icmp( "leadinVolume" ) ) {
				this.leadinVolume = src.ParseFloat ( );
			}
			// speaker mask
			else if ( !token.Icmp( "mask_center" ) ) {
				this.speakerMask |= 1 << speakerLabel.SPEAKER_CENTER;
			}
			// speaker mask
			else if ( !token.Icmp( "mask_left" ) ) {
				this.speakerMask |= 1 << speakerLabel.SPEAKER_LEFT;
			}
			// speaker mask
			else if ( !token.Icmp( "mask_right" ) ) {
				this.speakerMask |= 1 << speakerLabel.SPEAKER_RIGHT;
			}
			// speaker mask
			else if ( !token.Icmp( "mask_backright" ) ) {
				this.speakerMask |= 1 << speakerLabel.SPEAKER_BACKRIGHT;
			}
			// speaker mask
			else if ( !token.Icmp( "mask_backleft" ) ) {
				this.speakerMask |= 1 << speakerLabel.SPEAKER_BACKLEFT;
			}
			// speaker mask
			else if ( !token.Icmp( "mask_lfe" ) ) {
				this.speakerMask |= 1 << speakerLabel.SPEAKER_LFE;
			}
			// soundClass
			else if ( !token.Icmp( "soundClass" ) ) {
				this.parms.soundClass = src.ParseInt ( );
				if ( this.parms.soundClass < 0 || this.parms.soundClass >= SOUND_MAX_CLASSES ) {
					src.Warning( "SoundClass out of range" );
					return false;
				}
			}
			// altSound
			else if ( !token.Icmp( "altSound" ) ) {
				if ( !src.ExpectAnyToken( token ) ) {
					return false;
				}
				this.altSound = declManager.FindSound( token.c_str ( ) );
			}
			// ordered
			else if ( !token.Icmp( "ordered" ) ) {
				// no longer supported
			}
			// no_dups
			else if ( !token.Icmp( "no_dups" ) ) {
				this.parms.soundShaderFlags |= SSF_NO_DUPS;
			}
			// no_flicker
			else if ( !token.Icmp( "no_flicker" ) ) {
				this.parms.soundShaderFlags |= SSF_NO_FLICKER;
			}
			// plain
			else if ( !token.Icmp( "plain" ) ) {
				// no longer supported
			}
			// looping
			else if ( !token.Icmp( "looping" ) ) {
				this.parms.soundShaderFlags |= SSF_LOOPING;
			}
			// no occlusion
			else if ( !token.Icmp( "no_occlusion" ) ) {
				this.parms.soundShaderFlags |= SSF_NO_OCCLUSION;
			}
			// private
			else if ( !token.Icmp( "private" ) ) {
				this.parms.soundShaderFlags |= SSF_PRIVATE_SOUND;
			}
			// antiPrivate
			else if ( !token.Icmp( "antiPrivate" ) ) {
				this.parms.soundShaderFlags |= SSF_ANTI_PRIVATE_SOUND;
			}
			// once
			else if ( !token.Icmp( "playonce" ) ) {
				this.parms.soundShaderFlags |= SSF_PLAY_ONCE;
			}
			// global
			else if ( !token.Icmp( "global" ) ) {
				this.parms.soundShaderFlags |= SSF_GLOBAL;
			}
			// unclamped
			else if ( !token.Icmp( "unclamped" ) ) {
				this.parms.soundShaderFlags |= SSF_UNCLAMPED;
			}
			// omnidirectional
			else if ( !token.Icmp( "omnidirectional" ) ) {
				this.parms.soundShaderFlags |= SSF_OMNIDIRECTIONAL;
			}
			// onDemand can't be a parms, because we must track all references and overrides would confuse it
			else if ( !token.Icmp( "onDemand" ) ) {
				// no longer loading sounds on demand
				//onDemand = true;
			}
// the wave files
			else if ( !token.Icmp( "leadin" ) ) {
				// add to the leadin list
				if ( !src.ReadToken( token ) ) {
					src.Warning( "Expected sound after leadin" );
					return false;
				}
				if ( soundSystemLocal.soundCache && this.numLeadins < maxSamples ) {
					this.leadins[this.numLeadins] = soundSystemLocal.soundCache.FindSound( new idStr( token.c_str ( ) ), this.onDemand );
					this.numLeadins++;
				}
			} else if ( token.Find( ".wav", false ) != -1 || token.Find( ".ogg", false ) != -1 ) {
				// add to the wav list
				if ( soundSystemLocal.soundCache && this.numEntries < maxSamples ) {
					token.BackSlashesToSlashes ( );
					var lang = new idStr( cvarSystem.GetCVarString( "sys_lang" ) );
					if ( lang.Icmp( "english" ) != 0 && token.Find( "sound/vo/", false ) >= 0 ) {
						var work = new idStr( token );
						work.ToLower ( );
						work.StripLeading( "sound/vo/" );
						work.equals( va( "sound/vo/%s/%s", lang.c_str ( ), work.c_str ( ) ) );
						if ( fileSystem.ReadFile( work.data, null, null ) > 0 ) {
							token.equals( work );
						} else {
							// also try to find it with the .ogg extension
							work.SetFileExtension( ".ogg" );
							if ( fileSystem.ReadFile( work.data, null, null ) > 0 ) {
								token.equals( work );
							}
						}
					}
					this.entries[this.numEntries] = soundSystemLocal.soundCache.FindSound( new idStr( token.c_str ( ) ), this.onDemand );
					this.numEntries++;
				}
			} else {
				src.Warning( "unknown token '%s'", token.c_str ( ) );
				return false;
			}
		}

		if ( this.parms.shakes > 0.0 ) {
			this.CheckShakesAndOgg ( );
		}

		return true;
	}

/*
===============
idSoundShader::CheckShakesAndOgg
===============
*/
	CheckShakesAndOgg ( ): boolean {
		var /*int */ i: number;
		var ret = false;

		for ( i = 0; i < this.numLeadins; i++ ) {
			if ( this.leadins[i].objectInfo.wFormatTag == WAVE_FORMAT_TAG_OGG ) {
				common.Warning( "sound shader '%s' has shakes and uses OGG file '%s'",
					this.GetName ( ), this.leadins[i].name.c_str ( ) );
				ret = true;
			}
		}
		for ( i = 0; i < this.numEntries; i++ ) {
			if ( this.entries[i].objectInfo.wFormatTag == WAVE_FORMAT_TAG_OGG ) {
				common.Warning( "sound shader '%s' has shakes and uses OGG file '%s'",
					this.GetName ( ), this.entries[i].name.c_str ( ) );
				ret = true;
			}
		}
		return ret;
	}

/*
===============
idSoundShader::List
===============
*/
	List ( ): void {
		var shaders = new idStrList;
		todoThrow ( );
		//common.Printf( "%4i: %s\n", this.Index(), this.GetName() );
		//if ( idStr.Icmp( this.GetDescription(), "<no description>" ) != 0 ) {
		//	common.Printf( "      description: %s\n", this.GetDescription() );
		//}
		//for( var k = 0; k < this.numLeadins ; k++ ) {
		//	var objectp = this.leadins[k];
		//	if ( objectp ) {
		//		common.Printf( "      %5dms %4dKb %s (LEADIN)\n", soundSystemLocal.SamplesToMilliseconds(objectp.LengthIn44kHzSamples()), (objectp.objectMemSize/1024)
		//			,objectp.name.c_str() );
		//	}
		//}
		//for( var k = 0; k < this.numEntries; k++ ) {
		//	var objectp = this.entries[k];
		//	if ( objectp ) {
		//		common.Printf( "      %5dms %4dKb %s\n", soundSystemLocal.SamplesToMilliseconds(objectp.LengthIn44kHzSamples()), (objectp.objectMemSize/1024)
		//			,objectp.name.c_str() );
		//	}
		//}
	}

/*
===============
idSoundShader::GetAltSound
===============
*/
	GetAltSound ( ): idSoundShader {
		return this.altSound;
	}

/*
===============
idSoundShader::GetMinDistance
===============
*/
	GetMinDistance ( ): number /*float*/ {
		return this.parms.minDistance;
	}

/*
===============
idSoundShader::GetMaxDistance
===============
*/
	GetMaxDistance ( ): number /*float*/ {
		return this.parms.maxDistance;
	}

/*
===============
idSoundShader::GetDescription
===============
*/
	GetDescription ( ): string {
		return this.desc.data;
	}

/*
===============
idSoundShader::HasDefaultSound
===============
*/
	HasDefaultSound ( ): boolean {
		for ( var i = 0; i < this.numEntries; i++ ) {
			if ( this.entries[i] && this.entries[i].defaultSound ) {
				return true;
			}
		}
		return false;
	}

/*
===============
idSoundShader::GetParms
===============
*/
	GetParms ( ): soundShaderParms_t {
		return this.parms;
	}

/*
===============
idSoundShader::GetNumSounds
===============
*/
	GetNumSounds ( ): number /*int*/ {
		return this.numLeadins + this.numEntries;
	}
////
/////*
////===============
////idSoundShader::GetSound
////===============
////*/
////const char *idSoundShader::GetSound( int index ) const {
////	if ( index >= 0 ) {
////		if ( index < this.numLeadins ) {
////			return this.leadins[index].name.c_str();
////		}
////		index -= this.numLeadins;
////		if ( index < this.numEntries ) {
////			return this.entries[index].name.c_str();
////		}
////	}
////	return "";
////}
}