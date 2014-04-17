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
////#ifdef ID_DEDICATED
////idCVar idSoundSystemLocal::s_noSound( "s_noSound", "1", CVAR_SOUND | CVAR_BOOL | CVAR_ROM, "" );
////#else
idSoundSystemLocal.s_noSound = new idCVar( "s_noSound", "0", CVAR_SOUND | CVAR_BOOL | CVAR_NOCHEAT, "" );
////#endif
idSoundSystemLocal.s_quadraticFalloff = new idCVar( "s_quadraticFalloff", "1", CVAR_SOUND | CVAR_BOOL, "" );
idSoundSystemLocal.s_drawSounds = new idCVar( "s_drawSounds", "0", CVAR_SOUND | CVAR_INTEGER, "", 0, 2, ArgCompletion_Integer_Template(0,2) );
idSoundSystemLocal.s_showStartSound = new idCVar( "s_showStartSound", "0", CVAR_SOUND | CVAR_BOOL, "" );
idSoundSystemLocal.s_useOcclusion = new idCVar( "s_useOcclusion", "1", CVAR_SOUND | CVAR_BOOL, "" );
idSoundSystemLocal.s_maxSoundsPerShader = new idCVar("s_maxSoundsPerShader", "0", CVAR_SOUND | CVAR_ARCHIVE, "", 0, 10, ArgCompletion_Integer_Template(0, 10) );
idSoundSystemLocal.s_showLevelMeter = new idCVar( "s_showLevelMeter", "0", CVAR_SOUND | CVAR_BOOL, "" );
idSoundSystemLocal.s_constantAmplitude = new idCVar( "s_constantAmplitude", "-1", CVAR_SOUND | CVAR_FLOAT, "" );
idSoundSystemLocal.s_minVolume6 = new idCVar( "s_minVolume6", "0", CVAR_SOUND | CVAR_FLOAT, "" );
idSoundSystemLocal.s_dotbias6 = new idCVar( "s_dotbias6", "0.8", CVAR_SOUND | CVAR_FLOAT, "" );
idSoundSystemLocal.s_minVolume2 = new idCVar( "s_minVolume2", "0.25", CVAR_SOUND | CVAR_FLOAT, "" );
idSoundSystemLocal.s_dotbias2 = new idCVar( "s_dotbias2", "1.1", CVAR_SOUND | CVAR_FLOAT, "" );
idSoundSystemLocal.s_spatializationDecay = new idCVar( "s_spatializationDecay", "2", CVAR_SOUND | CVAR_ARCHIVE | CVAR_FLOAT, "" );
idSoundSystemLocal.s_reverse = new idCVar( "s_reverse", "0", CVAR_SOUND | CVAR_ARCHIVE | CVAR_BOOL, "" );
idSoundSystemLocal.s_meterTopTime = new idCVar( "s_meterTopTime", "2000", CVAR_SOUND | CVAR_ARCHIVE | CVAR_INTEGER, "" );
idSoundSystemLocal.s_volume = new idCVar( "s_volume_dB", "0", CVAR_SOUND | CVAR_ARCHIVE | CVAR_FLOAT, "volume in dB" );
idSoundSystemLocal.s_playDefaultSound = new idCVar( "s_playDefaultSound", "1", CVAR_SOUND | CVAR_ARCHIVE | CVAR_BOOL, "play a beep for missing sounds" );
idSoundSystemLocal.s_subFraction = new idCVar( "s_subFraction", "0.75", CVAR_SOUND | CVAR_ARCHIVE | CVAR_FLOAT, "volume to subwoofer in 5.1" );
idSoundSystemLocal.s_globalFraction = new idCVar( "s_globalFraction", "0.8", CVAR_SOUND | CVAR_ARCHIVE | CVAR_FLOAT, "volume to all speakers when not spatialized" );
idSoundSystemLocal.s_doorDistanceAdd = new idCVar( "s_doorDistanceAdd", "150", CVAR_SOUND | CVAR_ARCHIVE | CVAR_FLOAT, "reduce sound volume with this distance when going through a door" );
idSoundSystemLocal.s_singleEmitter = new idCVar( "s_singleEmitter", "0", CVAR_SOUND | CVAR_INTEGER, "mute all sounds but this emitter" );
idSoundSystemLocal.s_numberOfSpeakers = new idCVar( "s_numberOfSpeakers", "2", CVAR_SOUND | CVAR_ARCHIVE, "number of speakers" );
idSoundSystemLocal.s_force22kHz = new idCVar( "s_force22kHz", "0", CVAR_SOUND | CVAR_BOOL, ""  );
idSoundSystemLocal.s_clipVolumes = new idCVar( "s_clipVolumes", "1", CVAR_SOUND | CVAR_BOOL, ""  );
idSoundSystemLocal.s_realTimeDecoding = new idCVar( "s_realTimeDecoding", "1", CVAR_SOUND | CVAR_BOOL | CVAR_INIT, "" );

idSoundSystemLocal.s_slowAttenuate = new idCVar( "s_slowAttenuate", "1", CVAR_SOUND | CVAR_BOOL, "slowmo sounds attenuate over shorted distance" );
idSoundSystemLocal.s_enviroSuitCutoffFreq = new idCVar( "s_enviroSuitCutoffFreq", "2000", CVAR_SOUND | CVAR_FLOAT, "" );
idSoundSystemLocal.s_enviroSuitCutoffQ = new idCVar( "s_enviroSuitCutoffQ", "2", CVAR_SOUND | CVAR_FLOAT, "" );
idSoundSystemLocal.s_reverbTime = new idCVar( "s_reverbTime", "1000", CVAR_SOUND | CVAR_FLOAT, "" );
idSoundSystemLocal.s_reverbFeedback = new idCVar( "s_reverbFeedback", "0.333", CVAR_SOUND | CVAR_FLOAT, "" );
idSoundSystemLocal.s_enviroSuitVolumeScale = new idCVar( "s_enviroSuitVolumeScale", "0.9", CVAR_SOUND | CVAR_FLOAT, "" );
idSoundSystemLocal.s_skipHelltimeFX = new idCVar( "s_skipHelltimeFX", "0", CVAR_SOUND | CVAR_BOOL, "" );

////#if ID_OPENAL
// off by default. OpenAL DLL gets loaded on-demand
idSoundSystemLocal.s_libOpenAL = new idCVar( "s_libOpenAL", "openal32.dll", CVAR_SOUND | CVAR_ARCHIVE, "OpenAL DLL name/path" );
idSoundSystemLocal.s_useOpenAL = new idCVar( "s_useOpenAL", "0", CVAR_SOUND | CVAR_BOOL | CVAR_ARCHIVE, "use OpenAL" );
idSoundSystemLocal.s_useEAXReverb = new idCVar( "s_useEAXReverb", "0", CVAR_SOUND | CVAR_BOOL | CVAR_ARCHIVE, "use EAX reverb" );
idSoundSystemLocal.s_muteEAXReverb = new idCVar( "s_muteEAXReverb", "0", CVAR_SOUND | CVAR_BOOL, "mute eax reverb" );
idSoundSystemLocal.s_decompressionLimit = new idCVar( "s_decompressionLimit", "6", CVAR_SOUND | CVAR_INTEGER | CVAR_ARCHIVE, "specifies maximum uncompressed sample length in seconds" );
////#else
////idCVar idSoundSystemLocal::s_libOpenAL( "s_libOpenAL", "openal32.dll", CVAR_SOUND | CVAR_ARCHIVE, "OpenAL is not supported in this build" );
////idCVar idSoundSystemLocal::s_useOpenAL( "s_useOpenAL", "0", CVAR_SOUND | CVAR_BOOL | CVAR_ROM, "OpenAL is not supported in this build" );
////idCVar idSoundSystemLocal::s_useEAXReverb( "s_useEAXReverb", "0", CVAR_SOUND | CVAR_BOOL | CVAR_ROM, "EAX not available in this build" );
////idCVar idSoundSystemLocal::s_muteEAXReverb( "s_muteEAXReverb", "0", CVAR_SOUND | CVAR_BOOL | CVAR_ROM, "mute eax reverb" );
////idCVar idSoundSystemLocal::s_decompressionLimit( "s_decompressionLimit", "6", CVAR_SOUND | CVAR_INTEGER | CVAR_ROM, "specifies maximum uncompressed sample length in seconds" );
////#endif
////
////bool idSoundSystemLocal::useOpenAL = false;
////bool idSoundSystemLocal::useEAXReverb = false;
////int idSoundSystemLocal::EAXAvailable = -1;
////
var soundSystemLocal = new idSoundSystemLocal;
var soundSystem = soundSystemLocal;
////
/////*
////===============
////SoundReloadSounds_f
////
////  this is called from the main thread
////===============
////*/
////void SoundReloadSounds_f( const idCmdArgs &args ) {
////	if ( !soundSystemLocal.soundCache ) {
////		return;
////	}
////	bool force = false;
////	if ( args.Argc() == 2 ) {
////		force = true;
////	}
////	soundSystem.SetMute( true );
////	soundSystemLocal.soundCache.ReloadSounds( force );
////	soundSystem.SetMute( false );
////	common.Printf( "sound: changed sounds reloaded\n" );
////}
////
/////*
////===============
////ListSounds_f
////
////Optional parameter to only list sounds containing that string
////===============
////*/
////void ListSounds_f( const idCmdArgs &args ) {
////	var/*int*/i:number;
////	const char	*snd = args.Argv( 1 );
////
////	if ( !soundSystemLocal.soundCache ) {
////		common.Printf( "No sound.\n" );
////		return;
////	}
////
////	int	totalSounds = 0;
////	int totalSamples = 0;
////	int totalMemory = 0;
////	int totalPCMMemory = 0;
////	for( i = 0; i < soundSystemLocal.soundCache.GetNumObjects(); i++ ) {
////		const idSoundSample *sample = soundSystemLocal.soundCache.GetObject(i);
////		if ( !sample ) {
////			continue;
////		}
////		if ( snd && sample.name.Find( snd, false ) < 0 ) {
////			continue;
////		}
////
////		const waveformatex_t &info = sample.objectInfo;
////
////		const char *stereo = ( info.nChannels == 2 ? "ST" : "  " );
////		const char *format = ( info.wFormatTag == WAVE_FORMAT_TAG_OGG ) ? "OGG" : "WAV";
////		const char *defaulted = ( sample.defaultSound ? "(DEFAULTED)" : sample.purged ? "(PURGED)" : "" );
////
////		common.Printf( "%s %dkHz %6dms %5dkB %4s %s%s\n", stereo, sample.objectInfo.nSamplesPerSec / 1000,
////					soundSystemLocal.SamplesToMilliseconds( sample.LengthIn44kHzSamples() ),
////					sample.objectMemSize >> 10, format, sample.name.c_str(), defaulted );
////
////		if ( !sample.purged ) {
////			totalSamples += sample.objectSize;
////			if ( info.wFormatTag != WAVE_FORMAT_TAG_OGG )
////				totalPCMMemory += sample.objectMemSize;
////			if ( !sample.hardwareBuffer )
////				totalMemory += sample.objectMemSize;
////		}
////		totalSounds++;
////	}
////	common.Printf( "%8d total sounds\n", totalSounds );
////	common.Printf( "%8d total samples loaded\n", totalSamples );
////	common.Printf( "%8d kB total system memory used\n", totalMemory >> 10 );
////#if ID_OPENAL
////	common.Printf( "%8d kB total OpenAL audio memory used\n", ( alGetInteger( alGetEnumValue( ID_ALCHAR "AL_EAX_RAM_SIZE" ) ) - alGetInteger( alGetEnumValue( ID_ALCHAR "AL_EAX_RAM_FREE" ) ) ) >> 10 );
////#endif
////}
////
/////*
////===============
////ListSoundDecoders_f
////===============
////*/
////void ListSoundDecoders_f( const idCmdArgs &args ) {
////	int i, j, numActiveDecoders, numWaitingDecoders;
////	idSoundWorldLocal *sw = soundSystemLocal.currentSoundWorld;
////
////	numActiveDecoders = numWaitingDecoders = 0;
////
////	for ( i = 0; i < sw.emitters.Num(); i++ ) {
////		idSoundEmitterLocal *sound = sw.emitters[i];
////
////		if ( !sound ) {
////			continue;
////		}
////
////		// run through all the channels
////		for ( j = 0; j < SOUND_MAX_CHANNELS; j++ ) {
////			idSoundChannel	*chan = &sound.channels[j];
////
////			if ( chan.decoder == NULL ) {
////				continue;
////			}
////
////			idSoundSample *sample = chan.decoder.GetSample();
////
////			if ( sample != NULL ) {
////				continue;
////			}
////
////			const char *format = ( chan.leadinSample.objectInfo.wFormatTag == WAVE_FORMAT_TAG_OGG ) ? "OGG" : "WAV";
////			common.Printf( "%3d waiting %s: %s\n", numWaitingDecoders, format, chan.leadinSample.name.c_str() );
////
////			numWaitingDecoders++;
////		}
////	}
////
////	for ( i = 0; i < sw.emitters.Num(); i++ ) {
////		idSoundEmitterLocal *sound = sw.emitters[i];
////
////		if ( !sound ) {
////			continue;
////		}
////
////		// run through all the channels
////		for ( j = 0; j < SOUND_MAX_CHANNELS; j++ ) {
////			idSoundChannel	*chan = &sound.channels[j];
////
////			if ( chan.decoder == NULL ) {
////				continue;
////			}
////
////			idSoundSample *sample = chan.decoder.GetSample();
////
////			if ( sample == NULL ) {
////				continue;
////			}
////
////			const char *format = ( sample.objectInfo.wFormatTag == WAVE_FORMAT_TAG_OGG ) ? "OGG" : "WAV";
////
////			int localTime = soundSystemLocal.GetCurrent44kHzTime() - chan.trigger44kHzTime;
////			int sampleTime = sample.LengthIn44kHzSamples() * sample.objectInfo.nChannels;
////			int percent;
////			if ( localTime > sampleTime ) {
////				if ( chan.parms.soundShaderFlags & SSF_LOOPING ) {
////					percent = ( localTime % sampleTime ) * 100 / sampleTime;
////				} else {
////					percent = 100;
////				}
////			} else {
////				percent = localTime * 100 / sampleTime;
////			}
////
////			common.Printf( "%3d decoding %3d%% %s: %s\n", numActiveDecoders, percent, format, sample.name.c_str() );
////
////			numActiveDecoders++;
////		}
////	}
////
////	common.Printf( "%d decoders\n", numWaitingDecoders + numActiveDecoders );
////	common.Printf( "%d waiting decoders\n", numWaitingDecoders );
////	common.Printf( "%d active decoders\n", numActiveDecoders );
////	common.Printf( "%d kB decoder memory in %d blocks\n", idSampleDecoder::GetUsedBlockMemory() >> 10, idSampleDecoder::GetNumUsedBlocks() );
////}
////
/////*
////===============
////TestSound_f
////
////  this is called from the main thread
////===============
////*/
////void TestSound_f( const idCmdArgs &args ) {
////	if ( args.Argc() != 2 ) {
////		common.Printf( "Usage: testSound <file>\n" );
////		return;
////	}
////	if ( soundSystemLocal.currentSoundWorld ) {
////		soundSystemLocal.currentSoundWorld.PlayShaderDirectly( args.Argv( 1 ) );
////	}
////}
////
/////*
////===============
////SoundSystemRestart_f
////
////restart the sound thread
////
////  this is called from the main thread
////===============
////*/
////void SoundSystemRestart_f( const idCmdArgs &args ) {
////	soundSystem.SetMute( true );
////	soundSystemLocal.ShutdownHW();
////	soundSystemLocal.InitHW();
////	soundSystem.SetMute( false );
////}
////