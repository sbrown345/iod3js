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
////#ifndef __SND_LOCAL_H__
////#define __SND_LOCAL_H__
////
////// you need the OpenAL headers for build, even if AL is not enabled - http://www.openal.org/
////#ifdef _WIN32
////#include "../openal/include/al.h"
////#include "../openal/include/alc.h"
////#include "../openal/idal.h"
////// broken OpenAL SDK ?
////#define ID_ALCHAR (ALubyte *)
////#elif defined( MACOS_X )
////#include <OpenAL/al.h>
////#include <OpenAL/alc.h>
////#define ID_ALCHAR
////#else         
////#include <AL/al.h>
////#include <AL/alc.h>
////#define ID_ALCHAR
////#endif
////#include "../openal/include/efxlib.h"
////
// demo sound commands
enum soundDemoCommand_t{
	SCMD_STATE,				// followed by a load game state
	SCMD_PLACE_LISTENER,
	SCMD_ALLOC_EMITTER,

	SCMD_FREE,
	SCMD_UPDATE,
	SCMD_START,
	SCMD_MODIFY,
	SCMD_STOP,
	SCMD_FADE
};

var SOUND_MAX_CHANNELS		= 8;
var SOUND_DECODER_FREE_DELAY	= 1000 * MIXBUFFER_SAMPLES / USERCMD_MSEC;		// four seconds

var  PRIMARYFREQ				= 44100;			// samples per second
var  SND_EPSILON				= 1.0 / 32768.0;	// if volume is below this, it will always multiply to zero

var ROOM_SLICES_IN_BUFFER		= 10;

////class idAudioHardware;
////class idAudioBuffer;
////class idWaveFile;
////class idSoundCache;
////class idSoundSample;
////class idSampleDecoder;
////class idSoundWorldLocal;
////
////
/////*
////===================================================================================
////
////	General extended waveform format structure.
////	Use this for all NON PCM formats.
////
////===================================================================================
////*/
////
////#ifdef WIN32
////#pragma pack(1)
////#endif
////#ifdef __MWERKS__
////#pragma pack (push, 1)
////#endif
class waveformatex_t {
	wFormatTag: number /*word*/; /* format type */
	nChannels: number /*word*/; /* number of channels (i.e. mono, stereo...) */
	nSamplesPerSec: number /*dword*/; /* sample rate */
	nAvgBytesPerSec: number /*dword*/; /* for buffer estimation */
	nBlockAlign: number /*word*/; /* block size of data */
	wBitsPerSample: number /*word*/; /* Number of bits per sample of mono data */
	cbSize: number /*word*/; /* The count in bytes of the size of
////                                    extra information (after cbSize) */

	memset0 ( ): void {
		this.wFormatTag = 0;
		this.nChannels = 0;
		this.nSamplesPerSec = 0;
		this.nAvgBytesPerSec = 0;
		this.nBlockAlign = 0;
		this.wBitsPerSample = 0;
		this.cbSize = 0;
	}
}

// PACKED;
////
////typedef waveformatex_s waveformatex_t;
////
/////* OLD general waveform format structure (information common to all formats) */
////struct waveformat_s {
////    word    wFormatTag;        /* format type */
////    word    nChannels;         /* number of channels (i.e. mono, stereo, etc.) */
////    dword   nSamplesPerSec;    /* sample rate */
////    dword   nAvgBytesPerSec;   /* for buffer estimation */
////    word    nBlockAlign;       /* block size of data */
////} PACKED;
////
////typedef waveformat_s waveformat_t;
////
/////* flags for wFormatTag field of WAVEFORMAT */
////enum {
var WAVE_FORMAT_TAG_PCM = 1,
	WAVE_FORMAT_TAG_OGG = 2;
////};
////
/////* specific waveform format structure for PCM data */
////struct pcmwaveformat_s {
////    waveformat_t	wf;
////    word			wBitsPerSample;
////} PACKED;
////
////typedef pcmwaveformat_s pcmwaveformat_t;
////
////#ifndef mmioFOURCC
////#define mmioFOURCC( ch0, ch1, ch2, ch3 )				\
////		( (dword)(byte)(ch0) | ( (dword)(byte)(ch1) << 8 ) |	\
////		( (dword)(byte)(ch2) << 16 ) | ( (dword)(byte)(ch3) << 24 ) )
////#endif
////
////#define fourcc_riff     mmioFOURCC('R', 'I', 'F', 'F')
////
////struct waveformatextensible_s {
////    waveformatex_t    Format;
////    union {
////        word wValidBitsPerSample;       /* bits of precision  */
////        word wSamplesPerBlock;          /* valid if wBitsPerSample==0*/
////        word wReserved;                 /* If neither applies, set to zero*/
////    } Samples;
////    dword           dwChannelMask;      /* which channels are */
////                                        /* present in stream  */
////    int            SubFormat;
////} PACKED;
////
////typedef waveformatextensible_s waveformatextensible_t;
////
////typedef dword fourcc;
////
/////* RIFF chunk information data structure */
////struct mminfo_s {
////	fourcc			ckid;           /* chunk ID */
////	dword			cksize;         /* chunk size */
////	fourcc			fccType;        /* form type or list type */
////	dword			dwDataOffset;   /* offset of data portion of chunk */
////} PACKED;
////
////typedef mminfo_s mminfo_t;
////
////#ifdef WIN32
////#pragma pack()
////#endif
////#ifdef __MWERKS__
////#pragma pack (pop)
////#endif
////
/////*
////===================================================================================
////
////idWaveFile
////
////===================================================================================
////*/
////
////class idWaveFile {
////public:
////				    idWaveFile( );
////					~idWaveFile( );
////
////    int				Open( const char* strFileName, waveformatex_t* pwfx = NULL );
////    int				OpenFromMemory( short* pbData, int ulDataSize, waveformatextensible_t* pwfx );
////    int				Read( byte* pBuffer, int dwSizeToRead, int *pdwSizeRead );
////	int				Seek( int offset );
////    int				Close( );
////    int				ResetFile( );
////
////	int				GetOutputSize( ) { return mdwSize; }
////	int				GetMemorySize( ) { return mMemSize; }
////
////    waveformatextensible_t	mpwfx;        // Pointer to waveformatex structure
////
////private:
////	idFile *		mhmmio;			// I/O handle for the WAVE
////    mminfo_t		mck;			// Multimedia RIFF chunk
////    mminfo_t		mckRiff;		// used when opening a WAVE file
////    dword			mdwSize;		// size in samples
////	dword			mMemSize;		// size of the wave data in memory
////	dword			mseekBase;
////	ID_TIME_T			mfileTime;
////
////    bool			mbIsReadingFromMemory;
////    short *			mpbData;
////    short *			mpbDataCur;
////    dword			mulDataSize;
////
////	void *			ogg;			// only !NULL when !s_realTimeDecoding
////	bool			isOgg;
////
////private:
////    int				ReadMMIO( );
////
////    int				OpenOGG( const char* strFileName, waveformatex_t* pwfx = NULL );
////	int				ReadOGG( byte* pBuffer, int dwSizeToRead, int *pdwSizeRead );
////	int				CloseOGG( );
////};


/*
===================================================================================

idAudioHardware

===================================================================================
*/

class idAudioHardware {
////public:
////	static idAudioHardware *Alloc();
////
////    virtual					~idAudioHardware();
////
////    virtual bool			Initialize( ) = 0;
////
////	virtual bool			Lock( void **pDSLockedBuffer, ulong *dwDSLockedBufferSize ) = 0;
////	virtual bool			Unlock( void *pDSLockedBuffer, dword dwDSLockedBufferSize ) = 0;
////	virtual bool			GetCurrentPosition( ulong *pdwCurrentWriteCursor ) = 0;
////	
////	// try to write as many sound samples to the device as possible without blocking and prepare for a possible new mixing call
////	// returns wether there is *some* space for writing available
////	virtual bool			Flush( ) = 0;
////
////	virtual void			Write( bool flushing ) = 0;
////
////	virtual int				GetNumberOfSpeakers( )= 0;
////	virtual int				GetMixBufferSize( ) = 0;
////	virtual short*			GetMixBuffer( ) = 0;
};
////
////
/////*
////===================================================================================
////
////Encapsulates functionality of a DirectSound buffer.
////
////===================================================================================
////*/
////
////class idAudioBuffer {
////public:
////    virtual int 		Play( dword dwPriority=0, dword dwFlags=0 ) = 0;
////    virtual int			Stop( ) = 0;
////    virtual int			Reset( ) = 0;
////    virtual bool		IsSoundPlaying( ) = 0;
////    virtual void	 	SetVolume( float x ) = 0;
////};
////

/*
===================================================================================

idSoundEmitterLocal

===================================================================================
*/

enum removeStatus_t{
	REMOVE_STATUS_INVALID				= -1,
	REMOVE_STATUS_ALIVE					=  0,
	REMOVE_STATUS_WAITSAMPLEFINISHED	=  1,
	REMOVE_STATUS_SAMPLEFINISHED		=  2
};

class idSoundFade {
////public:
	fadeStart44kHz:number;								  //int					
	fadeEnd44kHz: number;								  //int					
	fadeStartVolume: number;		// in dB			  //float				
	fadeEndVolume: number;			// in dB			  //float				

	Clear ( ): void { throw "placeholder"; }
	FadeDbAt44kHz ( /*int*/ current44kHz: number ): number { throw "placeholder"; }
}


class SoundFX {
////protected:
////	bool				initialized;
////
////	int					channel;
////	int					maxlen;
////
////	float*				buffer;
////	float				continuitySamples[4];
////
////	float				param;
////
////public:
////						SoundFX()										{ channel = 0; buffer = NULL; initialized = false; maxlen = 0; memset( continuitySamples, 0, sizeof( float ) * 4 ); };
////	virtual				~SoundFX()										{ if ( buffer ) delete buffer; };
////
////	virtual void		Initialize()									{ };
////	virtual void		ProcessSample( float* in, float* out ) = 0;
////
////	void				SetChannel( int chan )							{ channel = chan; };
////	int					GetChannel()									{ return channel; };
////
////	void				SetContinuitySamples( float in1, float in2, float out1, float out2 )		{ continuitySamples[0] = in1; continuitySamples[1] = in2; continuitySamples[2] = out1; continuitySamples[3] = out2; };		// FIXME?
////	void				GetContinuitySamples( float& in1, float& in2, float& out1, float& out2 )	{ in1 = continuitySamples[0]; in2 = continuitySamples[1]; out1 = continuitySamples[2]; out2 = continuitySamples[3]; };
////
////	void				SetParameter( float val )						{ param = val; };
};
////
////class SoundFX_Lowpass extends SoundFX {
////public:
////	virtual void		ProcessSample( float* in, float* out );
////};
////
class SoundFX_LowpassFast extends SoundFX {
////	float				freq;
////	float				res;
////	float				a1, a2, a3;
////	float				b1, b2;
////
////public:
////	virtual void		ProcessSample( float* in, float* out );
////	void				SetParms( float p1 = 0, float p2 = 0, float p3 = 0 );
};

class SoundFX_Comb extends SoundFX {
////	int					currentTime;
////
////public:
////	virtual void		Initialize();
////	virtual void		ProcessSample( float* in, float* out );
};

class FracTime {
////public:
	time :number/*int*/;
	frac :number/*float*/;
	
	Set( /*int*/ val :number):void					{ this.time = val; this.frac = 0; }
	Increment( /*float*/ val :number):void			{ this.frac += val; while ( this.frac >= 1.0 ) { this.time++; this.frac--; } }
}
////
////enum {
////	PLAYBACK_RESET,
////	PLAYBACK_ADVANCING
////};
////
////class idSoundChannel;
////
class idSlowChannel {
	active:boolean;
	chan:idSoundChannel;
	
	playbackState :number/*int*/;
	triggerOffset :number/*int*/;
	
	newPosition = new FracTime;
	newSampleOffset :number/*int*/;
	
	curPosition = new FracTime;
	curSampleOffset :number/*int*/;
	
	lowpass = new SoundFX_LowpassFast;
////
////	// functions
////	void					GenerateSlowChannel( FracTime& playPos, int sampleCount44k, float* finalBuffer );
////
////	float					GetSlowmoSpeed();
////
////public:
////
////	void					AttachSoundChannel( const idSoundChannel *chan );
////	void					Reset();
////
////	void					GatherChannelSamples( int sampleOffset44k, int sampleCount44k, float *dest );
////
	IsActive():boolean				{ return this.active; }
	GetCurrentPosition():FracTime	{ return this.curPosition; }

	
/*
===================
idSlowChannel::Reset
===================
*/
Reset() :void{
	//memset( this, 0, sizeof( *this ) );

	//this.chan = chan;

	this.curPosition.Set( 0 );
	this.newPosition.Set( 0 );

	this.curSampleOffset = -10000;
	this.newSampleOffset = -10000;

	this.triggerOffset = 0;
}

/////*
////===================
////idSlowChannel::AttachSoundChannel
////===================
////*/
////void idSlowChannel::AttachSoundChannel( const idSoundChannel *chan ) {
////	this.chan = chan;
////}
////
/////*
////===================
////idSlowChannel::GetSlowmoSpeed
////===================
////*/
////float idSlowChannel::GetSlowmoSpeed() {
////	idSoundWorldLocal *sw = static_cast<idSoundWorldLocal*>( soundSystemLocal.GetPlayingSoundWorld() );
////
////	if ( sw ) {
////		return sw.slowmoSpeed;
////	} else {
////		return 0;
////	}
////}
////
/////*
////===================
////idSlowChannel::GenerateSlowChannel
////===================
////*/
////void idSlowChannel::GenerateSlowChannel( FracTime& playPos, int sampleCount44k, float* finalBuffer ) {
////	idSoundWorldLocal *sw = static_cast<idSoundWorldLocal*>( soundSystemLocal.GetPlayingSoundWorld() );
////	float in[MIXBUFFER_SAMPLES+3], out[MIXBUFFER_SAMPLES+3], *src, *spline, slowmoSpeed;
////	int i, neededSamples, orgTime, zeroedPos, count = 0;
////
////	src = in + 2;
////	spline = out + 2;
////
////	if ( sw ) {
////		slowmoSpeed = sw.slowmoSpeed;
////	}
////	else {
////		slowmoSpeed = 1;
////	}
////
////	neededSamples = sampleCount44k * slowmoSpeed + 4;
////	orgTime = playPos.time;
////
////	// get the channel's samples
////	chan.GatherChannelSamples( playPos.time * 2, neededSamples, src );
////	for ( i = 0; i < neededSamples >> 1; i++ ) {
////		spline[i] = src[i*2];
////	}
////
////	// interpolate channel
////	zeroedPos = playPos.time;
////	playPos.time = 0;
////
////	for ( i = 0; i < sampleCount44k >> 1; i++, count += 2 ) {
////		float val;
////		val = spline[playPos.time];
////		src[i] = val;
////		playPos.Increment( slowmoSpeed );
////	}
////
////	// lowpass filter
////	float *in_p = in + 2, *out_p = out + 2;
////	int numSamples = sampleCount44k >> 1;
////
////	lowpass.GetContinuitySamples( in_p[-1], in_p[-2], out_p[-1], out_p[-2] );
////	lowpass.SetParms( slowmoSpeed * 15000, 1.2f );
////
////	for ( int i = 0, count = 0; i < numSamples; i++, count += 2 ) {
////		lowpass.ProcessSample( in_p + i, out_p + i );
////		finalBuffer[count] = finalBuffer[count+1] = out[i];
////	}
////
////	lowpass.SetContinuitySamples( in_p[numSamples-2], in_p[numSamples-3], out_p[numSamples-2], out_p[numSamples-3] );
////
////	playPos.time += zeroedPos;
////}
////
/////*
////===================
////idSlowChannel::GatherChannelSamples
////===================
////*/
////void idSlowChannel::GatherChannelSamples( int sampleOffset44k, int sampleCount44k, float *dest ) {
////	int state = 0;
////
////	// setup chan
////	active = true;
////	this.newSampleOffset = sampleOffset44k >> 1;
////
////	// set state
////	if ( this.newSampleOffset < this.curSampleOffset ) {
////		state = PLAYBACK_RESET;
////	} else if ( this.newSampleOffset > this.curSampleOffset ) {
////		state = PLAYBACK_ADVANCING;
////	}
////
////	if ( state == PLAYBACK_RESET ) {
////		this.curPosition.Set( this.newSampleOffset );
////	}
////
////	// set current vars
////	this.curSampleOffset = this.newSampleOffset;
////	this.newPosition = this.curPosition;
////
////	// do the slow processing
////	GenerateSlowChannel( this.newPosition, sampleCount44k, dest );
////
////	// finish off
////	if ( state == PLAYBACK_ADVANCING )
////		this.curPosition = this.newPosition;
////}
};


/////*
////===================================================================================
////
////idSoundWorldLocal
////
////===================================================================================
////*/
////
////class s_stats {
////public:
////	s_stats( ) {
////		rinuse = 0;
////		runs = 1;
////		timeinprocess = 0;
////		missedWindow = 0;
////		missedUpdateWindow = 0;
////		activeSounds = 0;
////	}
////	int		rinuse;
////	int		runs;
////	int		timeinprocess;
////	int		missedWindow;
////	int		missedUpdateWindow;
////	int		activeSounds;
////};
////
class soundPortalTrace_t {
	portalArea :number/*int*/;
	prevStack:soundPortalTrace_t;
} 

class idSoundWorldLocal extends idSoundWorld {
////public:
////	virtual					~idSoundWorldLocal( );
////
	//// call at each map start
	//ClearAllSoundEmitters(  ):void { throw "placeholder"; }
	//StopAllSounds(  ):void { throw "placeholder"; }

	//// get a new emitter that can play sounds in this world
	//AllocSoundEmitter( ):idSoundEmitter {throw "placeholder";}
////
////	// for load games
////	virtual idSoundEmitter *EmitterForIndex( int index );
////
////	// query data from all emitters in the world
////	virtual float			CurrentShakeAmplitudeForPosition( const int time, const idVec3 &listererPosition );
////
////	// where is the camera/microphone
////	// listenerId allows listener-private sounds to be added
////	virtual void			PlaceListener( const idVec3 &origin, const idMat3 &axis, const int listenerId, const int gameTime, const idStr& areaName );
////
////	// fade all sounds in the world with a given shader soundClass
////	// to is in Db (sigh), over is in seconds
////	virtual void			FadeSoundClasses( const int soundClass, const float to, const float over );
////
////	// dumps the current state and begins archiving commands
////	virtual void			StartWritingDemo( idDemoFile *demo );
////	virtual void			StopWritingDemo( );
////
////	// read a sound command from a demo file
////	virtual void			ProcessDemoCommand( idDemoFile *readDemo );
////
////	// background music
////	virtual void			PlayShaderDirectly( const char *name, int channel = -1 );
////
////	// pause and unpause the sound world
////	virtual void			Pause( );
////	virtual void			UnPause( );
	//IsPaused ( ): boolean { throw "placeholder"; }
////
////	// avidump
////	virtual void			AVIOpen( const char *path, const char *name );
	//AVIClose ( ): void { throw "placeholder"; }
////
////	// SaveGame Support
////	virtual void			WriteToSaveGame( idFile *savefile );
////	virtual void			ReadFromSaveGame( idFile *savefile );
////	
////	virtual void			ReadFromSaveGameSoundChannel( idFile *saveGame, idSoundChannel *ch );
////	virtual void			ReadFromSaveGameSoundShaderParams( idFile *saveGame, soundShaderParms_t *params );
////	virtual void			WriteToSaveGameSoundChannel( idFile *saveGame, idSoundChannel *ch );
////	virtual void			WriteToSaveGameSoundShaderParams( idFile *saveGame, soundShaderParms_t *params );
////	
////	virtual void			SetSlowmo( bool active );
////	virtual void			SetSlowmoSpeed( float speed );
////	virtual void			SetEnviroSuit( bool active );
////
////	//=======================================
////
////							idSoundWorldLocal( );
////
////	void					Shutdown( );
	//Init ( rw: idRenderWorld ): void { throw "placeholder"; }
////	void					ClearBuffer( );
////
////	// update
////	void					ForegroundUpdate( int currentTime );
////	void					OffsetSoundTime( int offset44kHz );
////
	//AllocLocalSoundEmitter(): idSoundEmitterLocal { throw "placeholder"; }
////	void					CalcEars( int numSpeakers, idVec3 realOrigin, idVec3 listenerPos, idMat3 listenerAxis, float ears[6], float spatialize );
////	void					AddChannelContribution( idSoundEmitterLocal *sound, idSoundChannel *chan,
////												int current44kHz, int numSpeakers, float *finalMixBuffer );
////	void					MixLoop( int current44kHz, int numSpeakers, float *finalMixBuffer );
////	void					AVIUpdate( );
////	void					ResolveOrigin( const int stackDepth, const soundPortalTrace_t *prevStack, const int soundArea, const float dist, const idVec3& soundOrigin, idSoundEmitterLocal *def );
////	float					FindAmplitude( idSoundEmitterLocal *sound, const int localTime, const idVec3 *listenerPosition, const s_channelType channel, bool shakesOnly );
////
	//============================================

	rw:	idRenderWorld;				// for portals and debug drawing
	writeDemo: idDemoFile ;			// if not NULL, archive commands here

	listenerAxis = new idMat3;
	listenerPos = new idVec3;		// position in meters
	listenerPrivateId:number/*int*/;
	listenerQU = new idVec3;			// position in "quake units"
	listenerArea:number/*int*/;
	listenerAreaName = new idStr;
	listenerEnvironmentID:number/*int*/;

	gameMsec:number/*int*/;
	game44kHz:number/*int*/;
	pause44kHz:number/*int*/;
	lastAVI44kHz:number/*int*/;		// determine when we need to mix and write another block

	emitters = new idList<idSoundEmitterLocal>(idSoundEmitterLocal, true );

	soundClassFade = newStructArray<idSoundFade>(idSoundFade, SOUND_MAX_CLASSES);	// for global sound fading

	// avi stuff
	fpa = new Array < idFile>(6);
	aviDemoPath = new idStr;
	aviDemoName = new idStr;

	localSound: idSoundEmitterLocal;		// just for playShaderDirectly()

	slowmoActive:boolean;
	slowmoSpeed:number/*float*/;
	enviroSuitActive: boolean;


/*
==================
idSoundWorldLocal::Init
==================
*/
	Init ( renderWorld: idRenderWorld ): void {
		this.rw = renderWorld;
		this.writeDemo = null;

		this.listenerAxis.Identity ( );
		this.listenerPos.Zero ( );
		this.listenerPrivateId = 0;
		this.listenerQU.Zero ( );
		this.listenerArea = 0;
		this.listenerAreaName.equals( "Undefined" );
		this.listenerEnvironmentID = -2;

		this.gameMsec = 0;
		this.game44kHz = 0;
		this.pause44kHz = -1;
		this.lastAVI44kHz = 0;

		for ( var i = 0; i < SOUND_MAX_CLASSES; i++ ) {
			this.soundClassFade[i].Clear ( );
		}

		// fill in the 0 index spot
		var placeHolder = new idSoundEmitterLocal;
		this.emitters.Append( placeHolder );

		this.fpa[0] = this.fpa[1] = this.fpa[2] = this.fpa[3] = this.fpa[4] = this.fpa[5] = null;

		this.aviDemoPath.equals( "" );
		this.aviDemoName.equals( "" );

		this.localSound = null;

		this.slowmoActive = false;
		this.slowmoSpeed = 0;
		this.enviroSuitActive = false;
	}

/////*
////===============
////idSoundWorldLocal::idSoundWorldLocal
////===============
////*/
////idSoundWorldLocal::idSoundWorldLocal() {
////}
////
/////*
////===============
////idSoundWorldLocal::~idSoundWorldLocal
////===============
////*/
////idSoundWorldLocal::~idSoundWorldLocal() {
////	Shutdown();
////}
////
/////*
////===============
////idSoundWorldLocal::Shutdown
////
////  this is called from the main thread
////===============
////*/
////void idSoundWorldLocal::Shutdown() {
////	var/*int*/i:number;
////
////	if ( soundSystemLocal.currentSoundWorld == this ) {
////		soundSystemLocal.currentSoundWorld = NULL;
////	}
////
////	this.AVIClose();
////
////	for ( i = 0; i < this.emitters.Num(); i++ ) {
////		if ( this.emitters[i] ) {
////			delete this.emitters[i];
////			this.emitters[i] = NULL;
////		}
////	}
////	this.localSound = NULL;
////}

/*
===================
idSoundWorldLocal::ClearAllSoundEmitters
===================
*/
ClearAllSoundEmitters  () {
		var /*int */i: number;

		Sys_EnterCriticalSection();

		this.AVIClose();

		for (i = 0; i < this.emitters.Num(); i++) {
			var sound = this.emitters[i];
			sound.Clear();
		}
		this.localSound = null;

		Sys_LeaveCriticalSection();
	}

/*
===================
idSoundWorldLocal::AllocLocalSoundEmitter
===================
*/
AllocLocalSoundEmitter (): idSoundEmitterLocal {
		var /*int */i: number, index: number;
		var def: idSoundEmitterLocal = null;

		index = -1;

		// never use the 0 index spot

		for (i = 1; i < this.emitters.Num(); i++) {
			def = this.emitters[i];

			// check for a completed and freed spot
			if (def.removeStatus >= removeStatus_t.REMOVE_STATUS_SAMPLEFINISHED) {
				index = i;
				if (idSoundSystemLocal.s_showStartSound.GetInteger()) {
					common.Printf("sound: recycling sound def %d\n", i);
				}
				break;
			}
		}

		if (index == -1) {
			// append a brand new one
			def = new idSoundEmitterLocal;

			// we need to protect this from the async thread
			Sys_EnterCriticalSection();
			index = this.emitters.Append(def);
			Sys_LeaveCriticalSection();

			if (idSoundSystemLocal.s_showStartSound.GetInteger()) {
				common.Printf("sound: appended new sound def %d\n", index);
			}
		}

		def.Clear();
		def.index = index;
		def.removeStatus = removeStatus_t.REMOVE_STATUS_ALIVE;
		def.soundWorld = this;

		return def;
	}

/*
===================
idSoundWorldLocal::AllocSoundEmitter

  this is called from the main thread
===================
*/
	AllocSoundEmitter ( ) {
		var emitter: idSoundEmitterLocal = this.AllocLocalSoundEmitter ( );

		if ( idSoundSystemLocal.s_showStartSound.GetInteger ( ) ) {
			common.Printf( "AllocSoundEmitter = %i\n", emitter.index );
		}
		if ( this.writeDemo ) {
			todoThrow ( );
			//this.writeDemo.WriteInt(demoSystem_t.DS_SOUND);
			//this.writeDemo.WriteInt(soundDemoCommand_t.SCMD_ALLOC_EMITTER);
			//this.writeDemo.WriteInt(emitter.index);
		}

		return emitter;
	}

/////*
////===================
////idSoundWorldLocal::StartWritingDemo
////
////  this is called from the main thread
////===================
////*/
////void idSoundWorldLocal::StartWritingDemo( idDemoFile *demo ) {
////	this.writeDemo = demo;
////
////	this.writeDemo.WriteInt( DS_SOUND );
////	this.writeDemo.WriteInt( SCMD_STATE );
////
////	// use the normal save game code to archive all the emitters
////	WriteToSaveGame( this.writeDemo );
////}
////
/////*
////===================
////idSoundWorldLocal::StopWritingDemo
////
////  this is called from the main thread
////===================
////*/
////void idSoundWorldLocal::StopWritingDemo() {
////	this.writeDemo = null;
////}
////
/////*
////===================
////idSoundWorldLocal::ProcessDemoCommand
////
////  this is called from the main thread
////===================
////*/
////void idSoundWorldLocal::ProcessDemoCommand( idDemoFile *readDemo ) {
////	int	index;
////	idSoundEmitterLocal	*def;
////
////	if ( !readDemo ) {
////		return;
////	}
////
////	soundDemoCommand_t	dc;
////
////	if ( !readDemo.ReadInt( (int&)dc ) ) {
////		return;
////	}
////
////	switch( dc ) {
////	case SCMD_STATE:
////		// we need to protect this from the async thread
////		// other instances of calling idSoundWorldLocal::ReadFromSaveGame do this while the sound code is muted
////		// setting muted and going right in may not be good enough here, as we async thread may already be in an async tick (in which case we could still race to it)
////		Sys_EnterCriticalSection();
////		ReadFromSaveGame( readDemo );
////		Sys_LeaveCriticalSection();
////		UnPause();
////		break;
////	case SCMD_PLACE_LISTENER:
////		{
////			idVec3	origin;
////			idMat3	axis;
////			int		listenerId;
////			int		gameTime;
////
////			readDemo.ReadVec3( origin );
////			readDemo.ReadMat3( axis );
////			readDemo.ReadInt( listenerId );
////			readDemo.ReadInt( gameTime );
////			
////			PlaceListener( origin, axis, listenerId, gameTime, "" );
////		};
////		break;
////	case SCMD_ALLOC_EMITTER:
////		readDemo.ReadInt( index );
////		if ( index < 1 || index > this.emitters.Num() ) {
////			common.Error( "idSoundWorldLocal::ProcessDemoCommand: bad emitter number" );
////		}
////		if ( index == this.emitters.Num() ) {
////			// append a brand new one
////			def = new idSoundEmitterLocal;
////			this.emitters.Append( def );
////		}
////		def = this.emitters[ index ];
////		def.Clear();
////		def.index = index;
////		def.removeStatus = REMOVE_STATUS_ALIVE;
////		def.soundWorld = this;
////		break;
////	case SCMD_FREE:
////		{
////			int	immediate;
////
////			readDemo.ReadInt( index );
////			readDemo.ReadInt( immediate );
////			EmitterForIndex( index ).Free( immediate != 0 );
////		}
////		break;
////	case SCMD_UPDATE:
////		{
////			idVec3 origin;
////			int listenerId;
////			soundShaderParms_t parms;
////
////			readDemo.ReadInt( index );
////			readDemo.ReadVec3( origin );
////			readDemo.ReadInt( listenerId );
////			readDemo.ReadFloat( parms.minDistance );
////			readDemo.ReadFloat( parms.maxDistance );
////			readDemo.ReadFloat( parms.volume );
////			readDemo.ReadFloat( parms.shakes );
////			readDemo.ReadInt( parms.soundShaderFlags );
////			readDemo.ReadInt( parms.soundClass );
////			EmitterForIndex( index ).UpdateEmitter( origin, listenerId, &parms );
////		}
////		break;
////	case SCMD_START:
////		{
////			const idSoundShader *shader;
////			int			channel;
////			float		diversity;
////			int			shaderFlags;
////
////			readDemo.ReadInt( index );
////			shader = declManager.FindSound( readDemo.ReadHashString() );
////			readDemo.ReadInt( channel );
////			readDemo.ReadFloat( diversity );
////			readDemo.ReadInt( shaderFlags );
////			EmitterForIndex( index ).StartSound( shader, (s_channelType)channel, diversity, shaderFlags );
////		}
////		break;
////	case SCMD_MODIFY:
////		{
////			int		channel;
////			soundShaderParms_t parms;
////
////			readDemo.ReadInt( index );
////			readDemo.ReadInt( channel );
////			readDemo.ReadFloat( parms.minDistance );
////			readDemo.ReadFloat( parms.maxDistance );
////			readDemo.ReadFloat( parms.volume );
////			readDemo.ReadFloat( parms.shakes );
////			readDemo.ReadInt( parms.soundShaderFlags );
////			readDemo.ReadInt( parms.soundClass );
////			EmitterForIndex( index ).ModifySound( (s_channelType)channel, &parms );
////		}
////		break;
////	case SCMD_STOP:
////		{
////			int		channel;
////
////			readDemo.ReadInt( index );
////			readDemo.ReadInt( channel );
////			EmitterForIndex( index ).StopSound( (s_channelType)channel );
////		}
////		break;
////	case SCMD_FADE:
////		{
////			int		channel;
////			float	to, over;
////
////			readDemo.ReadInt( index );
////			readDemo.ReadInt( channel );
////			readDemo.ReadFloat( to );
////			readDemo.ReadFloat( over );
////			EmitterForIndex( index ).FadeSound((s_channelType)channel, to, over );
////		}
////		break;
////	}
////}
////
/////*
////===================
////idSoundWorldLocal::CurrentShakeAmplitudeForPosition
////
////  this is called from the main thread
////===================
////*/
////float idSoundWorldLocal::CurrentShakeAmplitudeForPosition( const int time, const idVec3 &listererPosition ) {
////	float amp = 0.0f;
////	int localTime;
////
////	if ( idSoundSystemLocal::s_constantAmplitude.GetFloat() >= 0.0f ) {
////		return 0.0f;
////	}
////
////	localTime = soundSystemLocal.GetCurrent44kHzTime();
////
////	for ( int i = 1; i < this.emitters.Num(); i++ ) {
////		idSoundEmitterLocal *sound = this.emitters[i];
////		if ( !sound.hasShakes ) {
////			continue;
////		}
////		amp += FindAmplitude( sound, localTime, &listererPosition, SCHANNEL_ANY, true );
////	}
////	return amp;
////}
////
/////*
////===================
////idSoundWorldLocal::MixLoop
////
////Sum all sound contributions into finalMixBuffer, an unclamped float buffer holding
////all output channels.  MIXBUFFER_SAMPLES samples will be created, with each sample consisting
////of 2 or 6 floats depending on numSpeakers.
////
////this is normally called from the sound thread, but also from the main thread
////for AVIdemo writing
////===================
////*/
////void idSoundWorldLocal::MixLoop( int current44kHz, int numSpeakers, float *finalMixBuffer ) {
////	int i, j;
////	idSoundEmitterLocal *sound;
////
////	// if noclip flying outside the world, leave silence
////	if ( this.listenerArea == -1 ) {
////		if ( idSoundSystemLocal::useOpenAL )
////			alListenerf( AL_GAIN, 0.0f );
////		return;
////	} 
////
////	// update the listener position and orientation
////	if ( idSoundSystemLocal::useOpenAL ) {
////		ALfloat listenerPosition[3];
////
////		listenerPosition[0] = -listenerPos.y;
////		listenerPosition[1] =  listenerPos.z;
////		listenerPosition[2] = -listenerPos.x;
////
////		ALfloat listenerOrientation[6];
////
////		listenerOrientation[0] = -listenerAxis[0].y;
////		listenerOrientation[1] =  listenerAxis[0].z;
////		listenerOrientation[2] = -listenerAxis[0].x;
////
////		listenerOrientation[3] = -listenerAxis[2].y;
////		listenerOrientation[4] =  listenerAxis[2].z;
////		listenerOrientation[5] = -listenerAxis[2].x;
////
////		alListenerf( AL_GAIN, 1.0f );
////		alListenerfv( AL_POSITION, listenerPosition );
////		alListenerfv( AL_ORIENTATION, listenerOrientation );
////
////#if ID_OPENAL
////		if ( soundSystemLocal.s_useEAXReverb.GetBool() ) {
////			if ( soundSystemLocal.efxloaded ) {
////				idSoundEffect *effect = NULL;
////				int EnvironmentID = -1;
////				idStr defaultStr( "default" );
////				idStr listenerAreaStr( this.listenerArea );
////				
////				soundSystemLocal.EFXDatabase.FindEffect( listenerAreaStr, &effect, &EnvironmentID );
////				if (!effect)
////					soundSystemLocal.EFXDatabase.FindEffect( listenerAreaName, &effect, &EnvironmentID );
////				if (!effect)
////					soundSystemLocal.EFXDatabase.FindEffect( defaultStr, &effect, &EnvironmentID );
////				
////				// only update if change in settings 
////				if ( soundSystemLocal.s_muteEAXReverb.GetBool() || ( listenerEnvironmentID != EnvironmentID ) ) {
////					EAXREVERBPROPERTIES EnvironmentParameters;
////					
////					// get area reverb setting from EAX Manager
////					if ( ( effect ) && ( effect.data) && ( memcpy( &EnvironmentParameters, effect.data, effect.datasize ) ) ) {
////						if ( soundSystemLocal.s_muteEAXReverb.GetBool() ) {
////							EnvironmentParameters.lRoom = -10000;
////							EnvironmentID = -2;
////						}
////						if ( soundSystemLocal.alEAXSet ) {
////							soundSystemLocal.alEAXSet( &EAXPROPERTYID_EAX_FXSlot0, EAXREVERB_ALLPARAMETERS, 0, &EnvironmentParameters, sizeof( EnvironmentParameters ) );
////						}
////					}
////					listenerEnvironmentID = EnvironmentID;
////				}
////			}
////		}
////#endif
////	}
////
////	// debugging option to mute all but a single soundEmitter
////	if ( idSoundSystemLocal::s_singleEmitter.GetInteger() > 0 && idSoundSystemLocal::s_singleEmitter.GetInteger() < this.emitters.Num() ) {
////		sound = this.emitters[idSoundSystemLocal::s_singleEmitter.GetInteger()];
////
////		if ( sound && sound.playing ) {
////			// run through all the channels
////			for ( j = 0; j < SOUND_MAX_CHANNELS ; j++ ) {
////				idSoundChannel	*chan = &sound.channels[j];
////
////				// see if we have a sound triggered on this channel
////				if ( !chan.triggerState ) {
////					chan.ALStop();
////					continue;
////				}
////
////				AddChannelContribution( sound, chan, current44kHz, numSpeakers, finalMixBuffer );
////			}
////		}
////		return;
////	}
////
////	for ( i = 1; i < this.emitters.Num(); i++ ) {
////		sound = this.emitters[i];
////
////		if ( !sound ) {
////			continue;
////		}
////		// if no channels are active, do nothing
////		if ( !sound.playing ) {
////			continue;
////		}
////		// run through all the channels
////		for ( j = 0; j < SOUND_MAX_CHANNELS ; j++ ) {
////			idSoundChannel	*chan = &sound.channels[j];
////
////			// see if we have a sound triggered on this channel
////			if ( !chan.triggerState ) {
////				chan.ALStop();
////				continue;
////			}
////
////			AddChannelContribution( sound, chan, current44kHz, numSpeakers, finalMixBuffer );
////		}
////	}
////
////	if ( !idSoundSystemLocal::useOpenAL && enviroSuitActive ) {
////		soundSystemLocal.DoEnviroSuit( finalMixBuffer, MIXBUFFER_SAMPLES, numSpeakers );
////	}
////}
////
//////==============================================================================
////
/////*
////===================
////idSoundWorldLocal::AVIOpen
////
////	this is called by the main thread
////===================
////*/
////void idSoundWorldLocal::AVIOpen( const char *path, const char *name ) {
////	aviDemoPath.equals( path );
////	aviDemoName.equals( name );
////
////	lastAVI44kHz = game44kHz - game44kHz % MIXBUFFER_SAMPLES;
////
////	if ( soundSystemLocal.snd_audio_hw.GetNumberOfSpeakers() == 6 ) {
////		fpa[0] = fileSystem.OpenFileWrite( aviDemoPath.data + "channel_51_left.raw" );
////		fpa[1] = fileSystem.OpenFileWrite( aviDemoPath.data + "channel_51_right.raw" );
////		fpa[2] = fileSystem.OpenFileWrite( aviDemoPath.data + "channel_51_center.raw" );
////		fpa[3] = fileSystem.OpenFileWrite( aviDemoPath.data + "channel_51_lfe.raw" );
////		fpa[4] = fileSystem.OpenFileWrite( aviDemoPath.data + "channel_51_backleft.raw" );
////		fpa[5] = fileSystem.OpenFileWrite( aviDemoPath.data + "channel_51_backright.raw" );
////	} else {
////		fpa[0] = fileSystem.OpenFileWrite( aviDemoPath.data + "channel_left.raw" );
////		fpa[1] = fileSystem.OpenFileWrite( aviDemoPath.data + "channel_right.raw" );
////	}
////
////	soundSystemLocal.SetMute( true );
////}
////
/////*
////===================
////idSoundWorldLocal::AVIUpdate
////
////this is called by the main thread
////writes one block of sound samples if enough time has passed
////This can be used to write wave files even if no sound hardware exists
////===================
////*/
////void idSoundWorldLocal::AVIUpdate() {
////	int		numSpeakers;
////	
////	if ( game44kHz - lastAVI44kHz < MIXBUFFER_SAMPLES ) {
////		return;
////	}
////
////	if ( !soundSystemLocal.snd_audio_hw ) {
////		numSpeakers = 2;
////	} else {
////		numSpeakers = soundSystemLocal.snd_audio_hw.GetNumberOfSpeakers();
////	}
////
////	float	mix[MIXBUFFER_SAMPLES*6+16];
////	float	*mix_p = (float *)((( int)mix + 15 ) & ~15);	// SIMD align
////
////	SIMDProcessor.Memset( mix_p, 0, MIXBUFFER_SAMPLES*sizeof(float)*numSpeakers );
////
////	MixLoop( lastAVI44kHz, numSpeakers, mix_p );
////
////	for ( int i = 0; i < numSpeakers; i++ ) {
////		short outD[MIXBUFFER_SAMPLES];
////
////		for( int j = 0; j < MIXBUFFER_SAMPLES; j++ ) {
////			float s = mix_p[ j*numSpeakers + i];
////			if ( s < -32768.0f ) {
////				outD[j] = -32768;
////			} else if ( s > 32767.0f ) {
////				outD[j] = 32767;
////			} else {
////				outD[j] = idMath::FtoiFast( s );
////			}
////		}
////		// write to file
////		fpa[i].Write( outD, MIXBUFFER_SAMPLES*sizeof(short) );
////	}
////
////	lastAVI44kHz += MIXBUFFER_SAMPLES;
////
////	return;
////}
////
/*
===================
idSoundWorldLocal::AVIClose
===================
*/
	AVIClose ( ): void {
		//var/*int*/i:number;

		if ( !this.fpa[0] ) {
			return;
		}

		////	// make sure the final block is written
		////	game44kHz += MIXBUFFER_SAMPLES;
		////	AVIUpdate();
		////	game44kHz -= MIXBUFFER_SAMPLES;
		////
		////	for ( i = 0; i < 6; i++ ) {
		////		if ( fpa[i] != NULL ) {
		////			fileSystem.CloseFile( fpa[i] );
		////			fpa[i] = NULL;
		////		}
		////	}
		////	if ( soundSystemLocal.snd_audio_hw.GetNumberOfSpeakers() == 2 ) {
		////		// convert it to a wave file
		////		idFile *rL, *lL, *wO;
		////		idStr	name;
		////
		////		name = aviDemoPath.Append(aviDemoName + ".wav");
		////		wO = fileSystem.OpenFileWrite( name );
		////		if ( !wO ) {
		////			common.Error( "Couldn't write %s", name.c_str() );
		////		}
		////
		////		name = aviDemoPath.Append("channel_right.raw");
		////		rL = fileSystem.OpenFileRead( name );
		////		if ( !rL ) {
		////			common.Error( "Couldn't open %s", name.c_str() );
		////		}
		////
		////		name = aviDemoPath.Append("channel_left.raw");
		////		lL = fileSystem.OpenFileRead( name );
		////		if ( !lL ) {
		////			common.Error( "Couldn't open %s", name.c_str() );
		////		}
		////
		////		int numSamples = rL.Length()/2;
		////		mminfo_t	info;
		////		pcmwaveformat_t format;
		////		
		////		info.ckid = fourcc_riff;
		////		info.fccType = mmioFOURCC( 'W', 'A', 'V', 'E' );
		////		info.cksize = (rL.Length()*2) - 8 + 4 + 16 + 8 + 8;
		////		info.dwDataOffset = 12;
		////		
		////		wO.Write( &info, 12 );
		////
		////		info.ckid = mmioFOURCC( 'f', 'm', 't', ' ' );
		////		info.cksize = 16;
		////
		////		wO.Write( &info, 8 );
		////
		////		format.wBitsPerSample = 16;
		////		format.wf.nAvgBytesPerSec = 44100*4;		// sample rate * block align
		////		format.wf.nChannels = 2;
		////		format.wf.nSamplesPerSec = 44100;
		////		format.wf.wFormatTag = WAVE_FORMAT_TAG_PCM;
		////		format.wf.nBlockAlign = 4;					// channels * bits/sample / 8
		////
		////		wO.Write( &format, 16 );
		////
		////		info.ckid = mmioFOURCC( 'd', 'a', 't', 'a' );
		////		info.cksize = rL.Length() * 2;
		////
		////		wO.Write( &info, 8 );
		////
		////		short s0, s1;
		////		for( i = 0; i < numSamples; i++ ) {
		////			lL.Read( &s0, 2 );
		////			rL.Read( &s1, 2 );
		////			wO.Write( &s0, 2 );
		////			wO.Write( &s1, 2 );
		////		}
		////
		////		fileSystem.CloseFile( wO );
		////		fileSystem.CloseFile( lL );
		////		fileSystem.CloseFile( rL );
		////
		////		fileSystem.RemoveFile( aviDemoPath.data + "channel_right.raw" );
		////		fileSystem.RemoveFile( aviDemoPath.data + "channel_left.raw" );
		////	}
		////
		////	soundSystemLocal.SetMute( false );
	}

//==============================================================================


/*
===================
idSoundWorldLocal::ResolveOrigin

Find out of the sound is completely occluded by a closed door portal, or
the virtual sound origin position at the portal closest to the listener.
  this is called by the main thread

dist is the distance from the orignial sound origin to the current portal that enters soundArea
def.distance is the distance we are trying to reduce.

If there is no path through open portals from the sound to the listener, def.distance will remain
set at maxDistance
===================
*/
static  MAX_PORTAL_TRACE_DEPTH = 10;

	ResolveOrigin ( /*int */stackDepth: number, prevStack: soundPortalTrace_t, /*int */soundArea: number, /*float */dist: number, soundOrigin: idVec3, def: idSoundEmitterLocal ): void {

		if ( dist >= def.distance ) {
			// we can't possibly hear the sound through this chain of portals
			return;
		}

		if ( soundArea == this.listenerArea ) {
			var fullDist = dist + ( soundOrigin.opSubtraction( this.listenerQU ) ).LengthFast ( );
			if ( fullDist < def.distance ) {
				def.distance = fullDist;
				def.spatializedOrigin = soundOrigin;
			}
			return;
		}

		if ( stackDepth == idSoundWorldLocal.MAX_PORTAL_TRACE_DEPTH ) {
			// don't spend too much time doing these calculations in big maps
			return;
		}

		var newStack = new soundPortalTrace_t;
		newStack.portalArea = soundArea;
		newStack.prevStack = prevStack;

		var numPortals = this.rw.NumPortalsInArea( soundArea );
		for ( var p = 0; p < numPortals; p++ ) {
			var re: exitPortal_t = this.rw.GetPortal( soundArea, p );

			var /*float	*/occlusionDistance = 0;

			// air blocking windows will block sound like closed doors
			if ( ( re.blockingBits & ( portalConnection_t.PS_BLOCK_VIEW | portalConnection_t.PS_BLOCK_AIR ) ) ) {
				// we could just completely cut sound off, but reducing the volume works better
				// continue;
				occlusionDistance = idSoundSystemLocal.s_doorDistanceAdd.GetFloat ( );
			}

			// what area are we about to go look at
			var otherArea = re.areas[0];
			if ( re.areas[0] == soundArea ) {
				otherArea = re.areas[1];
			}

			// if this area is already in our portal chain, don't bother looking into it
			var prev: soundPortalTrace_t;
			for ( prev = prevStack; prev; prev = prev.prevStack ) {
				if ( prev.portalArea == otherArea ) {
					break;
				}
			}
			if ( prev ) {
				continue;
			}

			// pick a point on the portal to serve as our virtual sound origin
//#if 1
			var source = new idVec3;

			var pl = new idPlane;
			re.w.GetPlane( pl );

			var /*float	*/scale = new R<number> ( );
			var dir = this.listenerQU.opSubtraction( soundOrigin );
			if ( !pl.RayIntersection( soundOrigin, dir, scale ) ) {
				source = re.w.GetCenter ( );
			} else {
				todoThrow ( );
				//source = soundOrigin + scale.$ * dir;

				//// if this point isn't inside the portal edges, slide it in
				//for ( var i = 0 ; i < re.w.GetNumPoints() ; i++ ) {
				//	var j = ( i + 1 ) % re.w.GetNumPoints();
				//	var edgeDir: idVec3= (*(re.w))[j].ToVec3() - (*(re.w))[i].ToVec3();
				//	var edgeNormal = new idVec3;

				//	edgeNormal.Cross( pl.Normal(), edgeDir );

				//	idVec3	fromVert = source - (*(re.w))[j].ToVec3();

				//	float	d = edgeNormal * fromVert;
				//	if ( d > 0 ) {
				//		// move it in
				//		float div = edgeNormal.Normalize();
				//		d /= div;

				//		source -= d * edgeNormal;
				//	}
				//}
			}
//#else
//		// clip the ray from the listener to the center of the portal by
//		// all the portal edge planes, then project that point (or the original if not clipped)
//		// onto the portal plane to get the spatialized origin

//		idVec3	start = this.listenerQU;
//		idVec3	mid = re.w.GetCenter();
//		bool	wasClipped = false;

//		for ( int i = 0 ; i < re.w.GetNumPoints() ; i++ ) {
//			int j = ( i + 1 ) % re.w.GetNumPoints();
//			idVec3	v1 = (*(re.w))[j].ToVec3() - soundOrigin;
//			idVec3	v2 = (*(re.w))[i].ToVec3() - soundOrigin;

//			v1.Normalize();
//			v2.Normalize();

//			idVec3	edgeNormal;

//			edgeNormal.Cross( v1, v2 );

//			idVec3	fromVert = start - soundOrigin;
//			float	d1 = edgeNormal * fromVert;

//			if ( d1 > 0.0f ) {
//				fromVert = mid - (*(re.w))[j].ToVec3();
//				float d2 = edgeNormal * fromVert;

//				// move it in
//				float	f = d1 / ( d1 - d2 );

//				idVec3	clipped = start * ( 1.0f - f ) + mid * f;
//				start = clipped;
//				wasClipped = true;
//			}
//		}

//		idVec3	source;
//		if ( wasClipped ) {
//			// now project it onto the portal plane
//			idPlane	pl;
//			re.w.GetPlane( pl );

//			float	f1 = pl.Distance( start );
//			float	f2 = pl.Distance( soundOrigin );

//			float	f = f1 / ( f1 - f2 );
//			source = start * ( 1.0f - f ) + soundOrigin * f;
//		} else {
//			source = soundOrigin;
//		}
//#endif

			var tlen = source.opSubtraction( soundOrigin );
			var /*float */tlenLength = tlen.LengthFast ( );

			this.ResolveOrigin( stackDepth + 1, newStack, otherArea, dist + tlenLength + occlusionDistance, source, def );
		}
	}


/////*
////===================
////idSoundWorldLocal::PlaceListener
////
////  this is called by the main thread
////===================
////*/
////void idSoundWorldLocal::PlaceListener( const idVec3& origin, const idMat3& axis, 
////									const int listenerId, const int gameTime, const idStr& areaName  ) {
////
////	int current44kHzTime;
////
////	if ( !soundSystemLocal.isInitialized ) {
////		return;
////	}
////
////	if ( pause44kHz >= 0 ){
////		return;
////	}
////
////	if ( this.writeDemo ) {
////		this.writeDemo.WriteInt( DS_SOUND );
////		this.writeDemo.WriteInt( SCMD_PLACE_LISTENER );
////		this.writeDemo.WriteVec3( origin );
////		this.writeDemo.WriteMat3( axis );
////		this.writeDemo.WriteInt( listenerId );
////		this.writeDemo.WriteInt( gameTime );
////	}
////
////	current44kHzTime = soundSystemLocal.GetCurrent44kHzTime();
////
////	// we usually expect gameTime to be increasing by 16 or 32 msec, but when
////	// a cinematic is fast-forward skipped through, it can jump by a significant
////	// amount, while the hardware 44kHz position will not have changed accordingly,
////	// which would make sounds (like long character speaches) continue from the
////	// old time.  Fix this by killing all non-looping sounds
////	if ( gameTime > gameMsec + 500 ) {
////		OffsetSoundTime( - ( gameTime - gameMsec ) * 0.001f * 44100.0f );
////	}
////
////	gameMsec = gameTime;
////	if ( fpa[0] ) {
////		// exactly 30 fps so the wave file can be used for exact video frames
////		game44kHz = idMath::FtoiFast( gameMsec * ( ( 1000.0f / 60.0f ) / 16.0f ) * 0.001f * 44100.0f );
////	} else {
////		// the normal 16 msec / frame
////		game44kHz = idMath::FtoiFast( gameMsec * 0.001f * 44100.0f );
////	}
////
////	listenerPrivateId = listenerId;
////
////	this.listenerQU = origin;							// Doom units
////	listenerPos = origin * DOOM_TO_METERS;			// meters
////	listenerAxis = axis;
////	listenerAreaName = areaName;
////	listenerAreaName.ToLower();
////
////	if ( this.rw ) {
////		this.listenerArea = this.rw.PointInArea( this.listenerQU );	// where are we?
////	} else {
////		this.listenerArea = 0;
////	}
////
////	if ( this.listenerArea < 0 ) {
////		return;
////	}
////
////	ForegroundUpdate( current44kHzTime );
////}
////
/////*
////==================
////idSoundWorldLocal::ForegroundUpdate
////==================
////*/
////void idSoundWorldLocal::ForegroundUpdate( int current44kHzTime ) {
////	int j, k;
////	idSoundEmitterLocal	*def;
////
////	if ( !soundSystemLocal.isInitialized ) {
////		return;
////	}
////
////	Sys_EnterCriticalSection();
////
////	// if we are recording an AVI demo, don't use hardware time
////	if ( fpa[0] ) {
////		current44kHzTime = lastAVI44kHz;
////	}
////
////	//
////	// check to see if each sound is visible or not
////	// speed up by checking maxdistance to origin
////	// although the sound may still need to play if it has
////	// just become occluded so it can ramp down to 0
////	//
////	for ( j = 1; j < this.emitters.Num(); j++ ) {
////		def = this.emitters[j];
////
////		if ( def.removeStatus >= REMOVE_STATUS_SAMPLEFINISHED ) {
////			continue;
////		}
////
////		// see if our last channel just finished
////		def.CheckForCompletion( current44kHzTime );
////
////		if ( !def.playing ) {
////			continue;
////		}
////
////		// update virtual origin / distance, etc
////		def.Spatialize( listenerPos, this.listenerArea, this.rw );
////
////		// per-sound debug options
////		if ( idSoundSystemLocal::s_drawSounds.GetInteger() && this.rw ) {
////			if ( def.distance < def.maxDistance || idSoundSystemLocal::s_drawSounds.GetInteger() > 1 ) {
////				idBounds ref;
////				ref.Clear();
////				ref.AddPoint( idVec3( -10, -10, -10 ) );
////				ref.AddPoint( idVec3(  10,  10,  10 ) );
////				float vis = (1.0f - (def.distance / def.maxDistance));
////
////				// draw a box
////				this.rw.DebugBounds( idVec4( vis, 0.25f, vis, vis ), ref, def.origin );
////
////				// draw an arrow to the audible position, possible a portal center
////				if ( def.origin != def.spatializedOrigin ) {
////					this.rw.DebugArrow( colorRed, def.origin, def.spatializedOrigin, 4 );
////				}
////
////				// draw the index
////				idVec3	textPos = def.origin;
////				textPos[2] -= 8;
////				this.rw.DrawText( va("%i", def.index), textPos, 0.1f, idVec4(1,0,0,1), listenerAxis );
////				textPos[2] += 8;
////
////				// run through all the channels
////				for ( k = 0; k < SOUND_MAX_CHANNELS ; k++ ) {
////					idSoundChannel	*chan = &def.channels[k];
////
////					// see if we have a sound triggered on this channel
////					if ( !chan.triggerState ) {
////						continue;
////					}
////
////					char	text[1024];
////					float	min = chan.parms.minDistance;
////					float	max = chan.parms.maxDistance;
////					const char	*defaulted = chan.leadinSample.defaultSound ? "(DEFAULTED)" : "";
////					sprintf( text, "%s (%i/%i %i/%i)%s", chan.soundShader.GetName(), (int)def.distance,
////						(int)def.realDistance, (int)min, (int)max, defaulted );
////					this.rw.DrawText( text, textPos, 0.1f, idVec4(1,0,0,1), listenerAxis );
////					textPos[2] += 8;
////				}
////			}
////		}
////	}
////
////	Sys_LeaveCriticalSection();
////
////	//
////	// the sound meter
////	//
////	if ( idSoundSystemLocal::s_showLevelMeter.GetInteger() ) {
////		const idMaterial *gui = declManager.FindMaterial( "guis/assets/soundmeter/audiobg", false );
////		if ( gui ) {
////			const shaderStage_t *foo = gui.GetStage(0);
////			if ( !foo.texture.cinematic ) {
////				((shaderStage_t *)foo).texture.cinematic = new idSndWindow;
////			}
////		}
////	}
////
////	//
////	// optionally dump out the generated sound
////	//
////	if ( fpa[0] ) {
////		AVIUpdate();
////	}
////}
////
/////*
////===================
////idSoundWorldLocal::OffsetSoundTime
////===================
////*/
////void idSoundWorldLocal::OffsetSoundTime( int offset44kHz ) {
////	int i, j;
////
////	for ( i = 0; i < this.emitters.Num(); i++ ) {
////		if ( this.emitters[i] == NULL ) {
////			continue;
////		}
////		for ( j = 0; j < SOUND_MAX_CHANNELS; j++ ) {
////			idSoundChannel *chan = &this.emitters[i].channels[ j ];
////
////			if ( !chan.triggerState ) {
////				continue;
////			}
////
////			chan.trigger44kHzTime += offset44kHz;
////		}
////	}
////}
////
/////*
////===================
////idSoundWorldLocal::WriteToSaveGame
////===================
////*/
////void idSoundWorldLocal::WriteToSaveGame( idFile *savefile ) {
////	int i, j, num, currentSoundTime;
////	const char *name;
////
////	// the game soundworld is always paused at this point, save that time down
////	if ( pause44kHz > 0 ) {
////		currentSoundTime = pause44kHz;
////	} else {
////		currentSoundTime = soundSystemLocal.GetCurrent44kHzTime();
////	}
////
////	// write listener data
////	savefile.WriteVec3(this.listenerQU);
////	savefile.WriteMat3(listenerAxis);
////	savefile.WriteInt(listenerPrivateId);
////	savefile.WriteInt(gameMsec);
////	savefile.WriteInt(game44kHz);
////	savefile.WriteInt(currentSoundTime);
////
////	num = this.emitters.Num();
////	savefile.WriteInt(num);
////
////	for ( i = 1; i < this.emitters.Num(); i++ ) {
////		idSoundEmitterLocal *def = this.emitters[i];
////
////		if ( def.removeStatus != REMOVE_STATUS_ALIVE ) {
////			int skip = -1;
////			savefile.Write( &skip, sizeof( skip ) );
////			continue;
////		}
////
////		savefile.WriteInt(i);
////
////		// Write the emitter data
////		savefile.WriteVec3( def.origin );
////		savefile.WriteInt( def.listenerId );
////		WriteToSaveGameSoundShaderParams( savefile, &def.parms );
////		savefile.WriteFloat( def.amplitude );
////		savefile.WriteInt( def.ampTime );
////		for (int k = 0; k < SOUND_MAX_CHANNELS; k++) 
////			WriteToSaveGameSoundChannel( savefile, &def.channels[k] );
////		savefile.WriteFloat( def.distance );
////		savefile.WriteBool( def.hasShakes );
////		savefile.WriteInt( def.lastValidPortalArea );
////		savefile.WriteFloat( def.maxDistance );
////		savefile.WriteBool( def.playing );
////		savefile.WriteFloat( def.realDistance );
////		savefile.WriteInt( def.removeStatus );
////		savefile.WriteVec3( def.spatializedOrigin );
////
////		// write the channel data
////		for( j = 0; j < SOUND_MAX_CHANNELS; j++ ) {
////			idSoundChannel *chan = &def.channels[ j ];
////
////			// Write out any sound commands for this def
////			if ( chan.triggerState && chan.soundShader && chan.leadinSample ) {
////
////				savefile.WriteInt( j );
////
////				// write the pointers out separately
////				name = chan.soundShader.GetName();
////				savefile.WriteString( name );
////				
////				name = chan.leadinSample.name;
////				savefile.WriteString( name );
////			}
////		}
////
////		// End active channels with -1
////		int end = -1;
////		savefile.WriteInt( end );
////	}
////
////	// new in Doom3 v1.2
////	savefile.Write( &slowmoActive, sizeof( slowmoActive ) );
////	savefile.Write( &slowmoSpeed, sizeof( slowmoSpeed ) );
////	savefile.Write( &enviroSuitActive, sizeof( enviroSuitActive ) );
////}
////
/////*
//// ===================
//// idSoundWorldLocal::WriteToSaveGameSoundShaderParams
//// ===================
//// */
////void idSoundWorldLocal::WriteToSaveGameSoundShaderParams( idFile *saveGame, soundShaderParms_t *params ) {
////	saveGame.WriteFloat(params.minDistance);
////	saveGame.WriteFloat(params.maxDistance);
////	saveGame.WriteFloat(params.volume);
////	saveGame.WriteFloat(params.shakes);
////	saveGame.WriteInt(params.soundShaderFlags);
////	saveGame.WriteInt(params.soundClass);
////}
////
/////*
//// ===================
//// idSoundWorldLocal::WriteToSaveGameSoundChannel
//// ===================
//// */
////void idSoundWorldLocal::WriteToSaveGameSoundChannel( idFile *saveGame, idSoundChannel *ch ) {
////	saveGame.WriteBool( ch.triggerState );
////	saveGame.WriteUnsignedChar( 0 );
////	saveGame.WriteUnsignedChar( 0 );
////	saveGame.WriteUnsignedChar( 0 );
////	saveGame.WriteInt( ch.trigger44kHzTime );
////	saveGame.WriteInt( ch.triggerGame44kHzTime );
////	WriteToSaveGameSoundShaderParams( saveGame, &ch.parms );
////	saveGame.WriteInt( (int)ch.leadinSample );
////	saveGame.WriteInt( ch.triggerChannel );
////	saveGame.WriteInt( (int)ch.soundShader );
////	saveGame.WriteInt( (int)ch.decoder );
////	saveGame.WriteFloat(ch.diversity );
////	saveGame.WriteFloat(ch.lastVolume );
////	for (int m = 0; m < 6; m++)
////		saveGame.WriteFloat( ch.lastV[m] );
////	saveGame.WriteInt( ch.channelFade.fadeStart44kHz );
////	saveGame.WriteInt( ch.channelFade.fadeEnd44kHz );
////	saveGame.WriteFloat( ch.channelFade.fadeStartVolume );
////	saveGame.WriteFloat( ch.channelFade.fadeEndVolume );
////}
////
/////*
////===================
////idSoundWorldLocal::ReadFromSaveGame
////===================
////*/
////void idSoundWorldLocal::ReadFromSaveGame( idFile *savefile ) {
////	int i, num, handle, listenerId, gameTime, channel;
////	int savedSoundTime, currentSoundTime, soundTimeOffset;
////	idSoundEmitterLocal *def;
////	idVec3 origin;
////	idMat3 axis;
////	idStr soundShader;
////
////	this.ClearAllSoundEmitters();
////
////	savefile.ReadVec3( origin );
////	savefile.ReadMat3( axis );
////	savefile.ReadInt( listenerId );
////	savefile.ReadInt( gameTime );
////	savefile.ReadInt( game44kHz );
////	savefile.ReadInt( savedSoundTime );
////
////	// we will adjust the sound starting times from those saved with the demo
////	currentSoundTime = soundSystemLocal.GetCurrent44kHzTime();
////	soundTimeOffset = currentSoundTime - savedSoundTime;
////
////	// at the end of the level load we unpause the sound world and adjust the sound starting times once more
////	pause44kHz = currentSoundTime;
////
////	// place listener
////	PlaceListener( origin, axis, listenerId, gameTime, "Undefined" );
////
////	// make sure there are enough
////	// slots to read the saveGame in.  We don't shrink the list
////	// if there are extras.
////	savefile.ReadInt( num );
////
////	while( this.emitters.Num() < num ) {
////		def = new idSoundEmitterLocal;
////		def.index = this.emitters.Append( def );
////		def.soundWorld = this;
////	}
////
////	// read in the state
////	for ( i = 1; i < num; i++ ) {
////
////		savefile.ReadInt( handle );
////		if ( handle < 0 ) {
////			continue;
////		}
////		if ( handle != i ) {
////			common.Error( "idSoundWorldLocal::ReadFromSaveGame: index mismatch" );
////		}
////		def = this.emitters[i];
////
////		def.removeStatus = REMOVE_STATUS_ALIVE;
////		def.playing = true;		// may be reset by the first UpdateListener
////
////		savefile.ReadVec3( def.origin );
////		savefile.ReadInt( def.listenerId );
////		ReadFromSaveGameSoundShaderParams( savefile, &def.parms );
////		savefile.ReadFloat( def.amplitude );
////		savefile.ReadInt( def.ampTime );
////		for (int k = 0; k < SOUND_MAX_CHANNELS; k++) 
////			ReadFromSaveGameSoundChannel( savefile, &def.channels[k] );
////		savefile.ReadFloat( def.distance );
////		savefile.ReadBool( def.hasShakes );
////		savefile.ReadInt( def.lastValidPortalArea );
////		savefile.ReadFloat( def.maxDistance );
////		savefile.ReadBool( def.playing );
////		savefile.ReadFloat( def.realDistance );
////		savefile.ReadInt( (int&)def.removeStatus );
////		savefile.ReadVec3( def.spatializedOrigin );
////
////		// read the individual channels
////		savefile.ReadInt( channel );
////
////		while ( channel >= 0 ) {
////			if ( channel > SOUND_MAX_CHANNELS ) {
////				common.Error( "idSoundWorldLocal::ReadFromSaveGame: channel > SOUND_MAX_CHANNELS" );
////			}
////
////			idSoundChannel *chan = &def.channels[channel];
////
////			if ( chan.decoder != NULL ) {
////				// The pointer in the save file is not valid, so we grab a new one
////				chan.decoder = idSampleDecoder::Alloc();
////			}
////
////			savefile.ReadString( soundShader );
////			chan.soundShader = declManager.FindSound( soundShader );
////
////			savefile.ReadString( soundShader );
////			// load savegames with s_noSound 1
////			if ( soundSystemLocal.soundCache ) {
////				chan.leadinSample = soundSystemLocal.soundCache.FindSound( soundShader, false );
////			} else {
////				chan.leadinSample = NULL;
////			}
////
////			// adjust the hardware start time
////			chan.trigger44kHzTime += soundTimeOffset;
////
////			// make sure we start up the hardware voice if needed
////			chan.triggered = chan.triggerState;
////			chan.openalStreamingOffset = currentSoundTime - chan.trigger44kHzTime;
////
////			// adjust the hardware fade time
////			if ( chan.channelFade.fadeStart44kHz != 0 ) {
////				chan.channelFade.fadeStart44kHz += soundTimeOffset;
////				chan.channelFade.fadeEnd44kHz += soundTimeOffset;
////			}
////
////			// next command
////			savefile.ReadInt( channel );
////		}
////	}
////
////	if ( session.GetSaveGameVersion() >= 17 ) {
////		savefile.Read( &slowmoActive, sizeof( slowmoActive ) );
////		savefile.Read( &slowmoSpeed, sizeof( slowmoSpeed ) );
////		savefile.Read( &enviroSuitActive, sizeof( enviroSuitActive ) );
////	} else {
////		slowmoActive		= false;
////		slowmoSpeed			= 0;
////		enviroSuitActive	= false;
////	}
////}
////
/////*
//// ===================
//// idSoundWorldLocal::ReadFromSaveGameSoundShaderParams
//// ===================
//// */
////void idSoundWorldLocal::ReadFromSaveGameSoundShaderParams( idFile *saveGame, soundShaderParms_t *params ) {
////	saveGame.ReadFloat(params.minDistance);
////	saveGame.ReadFloat(params.maxDistance);
////	saveGame.ReadFloat(params.volume);
////	saveGame.ReadFloat(params.shakes);
////	saveGame.ReadInt(params.soundShaderFlags);
////	saveGame.ReadInt(params.soundClass);
////}
////
/////*
//// ===================
//// idSoundWorldLocal::ReadFromSaveGameSoundChannel
//// ===================
//// */
////void idSoundWorldLocal::ReadFromSaveGameSoundChannel( idFile *saveGame, idSoundChannel *ch ) {
////	saveGame.ReadBool( ch.triggerState );
////	char tmp;
////	saveGame.ReadChar( tmp );
////	saveGame.ReadChar( tmp );
////	saveGame.ReadChar( tmp );
////	saveGame.ReadInt( ch.trigger44kHzTime );
////	saveGame.ReadInt( ch.triggerGame44kHzTime );
////	ReadFromSaveGameSoundShaderParams( saveGame, &ch.parms );
////	saveGame.ReadInt( (int&)ch.leadinSample );
////	saveGame.ReadInt( ch.triggerChannel );
////	saveGame.ReadInt( (int&)ch.soundShader );
////	saveGame.ReadInt( (int&)ch.decoder );
////	saveGame.ReadFloat(ch.diversity );
////	saveGame.ReadFloat(ch.lastVolume );
////	for (int m = 0; m < 6; m++)
////		saveGame.ReadFloat( ch.lastV[m] );
////	saveGame.ReadInt( ch.channelFade.fadeStart44kHz );
////	saveGame.ReadInt( ch.channelFade.fadeEnd44kHz );
////	saveGame.ReadFloat( ch.channelFade.fadeStartVolume );
////	saveGame.ReadFloat( ch.channelFade.fadeEndVolume );
////}
////
/////*
////===================
////idSoundWorldLocal::EmitterForIndex
////===================
////*/
////idSoundEmitter	*idSoundWorldLocal::EmitterForIndex( int index ) {
////	if ( index == 0 ) {
////		return NULL;
////	}
////	if ( index >= this.emitters.Num() ) {
////		common.Error( "idSoundWorldLocal::EmitterForIndex: %i > %i", index, this.emitters.Num() );
////	}
////	return this.emitters[index];
////}
////
/////*
////===============
////idSoundWorldLocal::StopAllSounds
////
////  this is called from the main thread
////===============
////*/
////void idSoundWorldLocal::StopAllSounds() {
////
////	for ( int i = 0; i < this.emitters.Num(); i++ ) {
////		idSoundEmitterLocal * def = this.emitters[i];
////		def.StopSound( SCHANNEL_ANY );
////	}
////}
////
/////*
////===============
////idSoundWorldLocal::Pause
////===============
////*/
////void idSoundWorldLocal::Pause( ) {
////	if ( pause44kHz >= 0 ) {
////		common.Warning( "idSoundWorldLocal::Pause: already paused" );
////		return;
////	}
////
////	pause44kHz = soundSystemLocal.GetCurrent44kHzTime();
////}
////
/////*
////===============
////idSoundWorldLocal::UnPause
////===============
////*/
////void idSoundWorldLocal::UnPause( ) {
////	int offset44kHz;
////
////	if ( pause44kHz < 0 ) {
////		common.Warning( "idSoundWorldLocal::UnPause: not paused" );
////		return;
////	}
////
////	offset44kHz = soundSystemLocal.GetCurrent44kHzTime() - pause44kHz;
////	OffsetSoundTime( offset44kHz );
////
////	pause44kHz = -1;
////}
////
/*
===============
idSoundWorldLocal::IsPaused
===============
*/
	IsPaused ( ): boolean {
		return ( this.pause44kHz >= 0 );
	}

/////*
////===============
////idSoundWorldLocal::PlayShaderDirectly
////
////start a music track
////
////  this is called from the main thread
////===============
////*/
////void idSoundWorldLocal::PlayShaderDirectly( const char *shaderName, int channel ) {
////
////	if ( this.localSound && channel == -1 ) {
////		this.localSound.StopSound( SCHANNEL_ANY );
////	} else if ( this.localSound ) {
////		this.localSound.StopSound( channel );
////	}
////
////	if ( !shaderName || !shaderName[0] ) {
////		return;
////	}
////
////	const idSoundShader *shader = declManager.FindSound( shaderName );
////	if ( !shader ) {
////		return;
////	}
////
////	if ( !this.localSound ) {
////		this.localSound = AllocLocalSoundEmitter();
////	}
////
////	static idRandom	rnd;
////	float	diversity = rnd.RandomFloat();
////
////	this.localSound.StartSound( shader, ( channel == -1 ) ? SCHANNEL_ONE : channel , diversity, SSF_GLOBAL );
////
////	// in case we are at the console without a game doing updates, force an update
////	ForegroundUpdate( soundSystemLocal.GetCurrent44kHzTime() );
////}
////
/////*
////===============
////idSoundWorldLocal::CalcEars
////
////Determine the volumes from each speaker for a given sound emitter
////===============
////*/
////void idSoundWorldLocal::CalcEars( int numSpeakers, idVec3 spatializedOrigin, idVec3 listenerPos,
////								 idMat3 listenerAxis, float ears[6], float spatialize ) {
////	idVec3 svec = spatializedOrigin - listenerPos;
////	idVec3 ovec;
////
////	ovec[0] = svec * listenerAxis[0];
////	ovec[1] = svec * listenerAxis[1];
////	ovec[2] = svec * listenerAxis[2];
////
////	ovec.Normalize();
////
////	if ( numSpeakers == 6 ) {
////		static idVec3	speakerVector[6] = {
////			idVec3(  0.707f,  0.707f, 0.0f ),	// front left
////			idVec3(  0.707f, -0.707f, 0.0f ),	// front right
////			idVec3(  0.707f,  0.0f,   0.0f ),	// front center
////			idVec3(  0.0f,    0.0f,   0.0f ),	// sub
////			idVec3( -0.707f,  0.707f, 0.0f ),	// rear left
////			idVec3( -0.707f, -0.707f, 0.0f )	// rear right
////		};
////		for ( int i = 0 ; i < 6 ; i++ ) {
////			if ( i == 3 ) {
////				ears[i] = idSoundSystemLocal::s_subFraction.GetFloat();		// subwoofer
////				continue;
////			}
////			float dot = ovec * speakerVector[i];
////			ears[i] = (idSoundSystemLocal::s_dotbias6.GetFloat() + dot) / ( 1.0f + idSoundSystemLocal::s_dotbias6.GetFloat() );
////			if ( ears[i] < idSoundSystemLocal::s_minVolume6.GetFloat() ) {
////				ears[i] = idSoundSystemLocal::s_minVolume6.GetFloat();
////			}
////		}
////	} else {
////		float dot = ovec.y;
////		float dotBias = idSoundSystemLocal::s_dotbias2.GetFloat();
////
////		// when we are inside the minDistance, start reducing the amount of spatialization
////		// so NPC voices right in front of us aren't quieter that off to the side
////		dotBias += ( idSoundSystemLocal::s_spatializationDecay.GetFloat() - dotBias ) * ( 1.0f - spatialize );
////
////		ears[0] = (idSoundSystemLocal::s_dotbias2.GetFloat() + dot) / ( 1.0f + dotBias );
////		ears[1] = (idSoundSystemLocal::s_dotbias2.GetFloat() - dot) / ( 1.0f + dotBias );
////
////		if ( ears[0] < idSoundSystemLocal::s_minVolume2.GetFloat() ) {
////			ears[0] = idSoundSystemLocal::s_minVolume2.GetFloat();
////		}
////		if ( ears[1] < idSoundSystemLocal::s_minVolume2.GetFloat() ) {
////			ears[1] = idSoundSystemLocal::s_minVolume2.GetFloat();
////		}
////
////		ears[2] = 
////		ears[3] = 
////		ears[4] = 
////		ears[5] = 0.0f;
////	}
////}
////
/////*
////===============
////idSoundWorldLocal::AddChannelContribution
////
////Adds the contribution of a single sound channel to finalMixBuffer
////this is called from the async thread
////
////Mixes MIXBUFFER_SAMPLES samples starting at current44kHz sample time into
////finalMixBuffer
////===============
////*/
////void idSoundWorldLocal::AddChannelContribution( idSoundEmitterLocal *sound, idSoundChannel *chan,
////				   int current44kHz, int numSpeakers, float *finalMixBuffer ) {
////	int j;
////	float volume;
////
////	//
////	// get the sound definition and parameters from the entity
////	//
////	soundShaderParms_t *parms = &chan.parms;
////
////	// assume we have a sound triggered on this channel
////	assert( chan.triggerState );
////
////	// fetch the actual wave file and see if it's valid
////	idSoundSample *sample = chan.leadinSample;
////	if ( sample == NULL ) {
////		return;
////	}
////
////	// if you don't want to hear all the beeps from missing sounds
////	if ( sample.defaultSound && !idSoundSystemLocal::s_playDefaultSound.GetBool() ) {
////		return;
////	}
////
////	// get the actual shader
////	const idSoundShader *shader = chan.soundShader;
////
////	// this might happen if the foreground thread just deleted the sound emitter
////	if ( !shader ) {
////		return;
////	}
////
////	float maxd = parms.maxDistance;
////	float mind = parms.minDistance;
////	
////	int  mask = shader.speakerMask;
////	bool omni = ( parms.soundShaderFlags & SSF_OMNIDIRECTIONAL) != 0;
////	bool looping = ( parms.soundShaderFlags & SSF_LOOPING ) != 0;
////	bool global = ( parms.soundShaderFlags & SSF_GLOBAL ) != 0;
////	bool noOcclusion = ( parms.soundShaderFlags & SSF_NO_OCCLUSION ) || !idSoundSystemLocal::s_useOcclusion.GetBool();
////
////	// speed goes from 1 to 0.2
////	if ( idSoundSystemLocal::s_slowAttenuate.GetBool() && slowmoActive && !chan.disallowSlow ) {
////		maxd *= slowmoSpeed;
////	}
////
////	// stereo samples are always omni
////	if ( sample.objectInfo.nChannels == 2 ) {
////		omni = true;
////	}
////
////	// if the sound is playing from the current listener, it will not be spatialized at all
////	if ( sound.listenerId == listenerPrivateId ) {
////		global = true;
////	}
////
////	//
////	// see if it's in range
////	//
////	
////	// convert volumes from decibels to float scale
////
////	// leadin volume scale for shattering lights
////	// this isn't exactly correct, because the modified volume will get applied to
////	// some initial chunk of the loop as well, because the volume is scaled for the
////	// entire mix buffer
////	if ( shader.leadinVolume && current44kHz - chan.trigger44kHzTime < sample.LengthIn44kHzSamples() ) {
////		volume = soundSystemLocal.dB2Scale( shader.leadinVolume );
////	} else {
////		volume = soundSystemLocal.dB2Scale( parms.volume );
////	}
////
////	// global volume scale
////	volume *= soundSystemLocal.dB2Scale( idSoundSystemLocal::s_volume.GetFloat() );
////
////
////	// volume fading
////	float	fadeDb = chan.channelFade.FadeDbAt44kHz( current44kHz );
////	volume *= soundSystemLocal.dB2Scale( fadeDb );
////
////	fadeDb = soundClassFade[parms.soundClass].FadeDbAt44kHz( current44kHz );
////	volume *= soundSystemLocal.dB2Scale( fadeDb );
////	
////
////	//
////	// if it's a global sound then
////	// it's not affected by distance or occlusion
////	//
////	float	spatialize = 1;
////	idVec3 spatializedOriginInMeters;
////	if ( !global ) {
////		float	dlen;
////
////		if ( noOcclusion ) {
////			// use the real origin and distance
////			spatializedOriginInMeters = sound.origin * DOOM_TO_METERS;
////			dlen = sound.realDistance;
////		} else {
////			// use the possibly portal-occluded origin and distance
////			spatializedOriginInMeters = sound.spatializedOrigin * DOOM_TO_METERS;
////			dlen = sound.distance;
////		}
////
////		// reduce volume based on distance
////		if ( dlen >= maxd ) {
////			volume = 0.0f;
////		} else if ( dlen > mind ) {
////			float frac = idMath::ClampFloat( 0.0f, 1.0f, 1.0f - ((dlen - mind) / (maxd - mind)));
////			if ( idSoundSystemLocal::s_quadraticFalloff.GetBool() ) {
////				frac *= frac;
////			}
////			volume *= frac;
////		} else if ( mind > 0.0f ) {
////			// we tweak the spatialization bias when you are inside the minDistance
////			spatialize = dlen / mind;
////		}
////	}
////
////	//
////	// if it is a private sound, set the volume to zero
////	// unless we match the listenerId
////	//
////	if ( parms.soundShaderFlags & SSF_PRIVATE_SOUND ) {
////		if ( sound.listenerId != listenerPrivateId ) {
////			volume = 0;
////		}
////	}
////	if ( parms.soundShaderFlags & SSF_ANTI_PRIVATE_SOUND ) {
////		if ( sound.listenerId == listenerPrivateId ) {
////			volume = 0;
////		}
////	}
////
////	//
////	// do we have anything to add?
////	//
////	if ( volume < SND_EPSILON && chan.lastVolume < SND_EPSILON ) {
////		return;
////	}
////	chan.lastVolume = volume;
////
////	//
////	// fetch the sound from the cache as 44kHz, 16 bit samples
////	//
////	int offset = current44kHz - chan.trigger44kHzTime;
////	float inputSamples[MIXBUFFER_SAMPLES*2+16];
////	float *alignedInputSamples = (float *) ( ( ( (int)inputSamples ) + 15 ) & ~15 );
////
////	//
////	// allocate and initialize hardware source
////	// 
////	if ( idSoundSystemLocal::useOpenAL && sound.removeStatus < REMOVE_STATUS_SAMPLEFINISHED ) {
////		if ( !alIsSource( chan.openalSource ) ) {
////			chan.openalSource = soundSystemLocal.AllocOpenALSource( chan, !chan.leadinSample.hardwareBuffer || !chan.soundShader.entries[0].hardwareBuffer || looping, chan.leadinSample.objectInfo.nChannels == 2 );
////		}
////
////		if ( alIsSource( chan.openalSource ) ) {
////			
////			// stop source if needed..
////			if ( chan.triggered ) {
////				alSourceStop( chan.openalSource );
////			}
////
////			// update source parameters
////			if ( global || omni ) {
////				alSourcei( chan.openalSource, AL_SOURCE_RELATIVE, AL_TRUE);
////				alSource3f( chan.openalSource, AL_POSITION, 0.0f, 0.0f, 0.0f );
////				alSourcef( chan.openalSource, AL_GAIN, ( volume ) < ( 1.0f ) ? ( volume ) : ( 1.0f ) );
////			} else {
////				alSourcei( chan.openalSource, AL_SOURCE_RELATIVE, AL_FALSE);
////				alSource3f( chan.openalSource, AL_POSITION, -spatializedOriginInMeters.y, spatializedOriginInMeters.z, -spatializedOriginInMeters.x );
////				alSourcef( chan.openalSource, AL_GAIN, ( volume ) < ( 1.0f ) ? ( volume ) : ( 1.0f ) );
////			}
////			alSourcei( chan.openalSource, AL_LOOPING, ( looping && chan.soundShader.entries[0].hardwareBuffer ) ? AL_TRUE : AL_FALSE );
////#if !defined(MACOS_X)		
////			alSourcef( chan.openalSource, AL_REFERENCE_DISTANCE, mind );
////			alSourcef( chan.openalSource, AL_MAX_DISTANCE, maxd );
////#endif
////			alSourcef( chan.openalSource, AL_PITCH, ( slowmoActive && !chan.disallowSlow ) ? ( slowmoSpeed ) : ( 1.0f ) );
////#if ID_OPENAL
////			long lOcclusion = ( enviroSuitActive ? -1150 : 0);
////			if ( soundSystemLocal.alEAXSet ) {
////				soundSystemLocal.alEAXSet( &EAXPROPERTYID_EAX_Source, EAXSOURCE_OCCLUSION, chan.openalSource, &lOcclusion, sizeof(lOcclusion) );
////			}
////#endif
////			if ( ( !looping && chan.leadinSample.hardwareBuffer ) || ( looping && chan.soundShader.entries[0].hardwareBuffer ) ) {
////				// handle uncompressed (non streaming) single shot and looping sounds
////				if ( chan.triggered ) {
////					alSourcei( chan.openalSource, AL_BUFFER, looping ? chan.soundShader.entries[0].openalBuffer : chan.leadinSample.openalBuffer );
////				}
////			} else {
////				ALint finishedbuffers;
////				ALuint buffers[3];
////
////				// handle streaming sounds (decode on the fly) both single shot AND looping
////				if ( chan.triggered ) {
////					alSourcei( chan.openalSource, AL_BUFFER, NULL );
////					alDeleteBuffers( 3, &chan.lastopenalStreamingBuffer[0] );
////					chan.lastopenalStreamingBuffer[0] = chan.openalStreamingBuffer[0];
////					chan.lastopenalStreamingBuffer[1] = chan.openalStreamingBuffer[1];
////					chan.lastopenalStreamingBuffer[2] = chan.openalStreamingBuffer[2];
////					alGenBuffers( 3, &chan.openalStreamingBuffer[0] );
////					if ( soundSystemLocal.alEAXSetBufferMode ) {
////						soundSystemLocal.alEAXSetBufferMode( 3, &chan.openalStreamingBuffer[0], alGetEnumValue( ID_ALCHAR "AL_STORAGE_ACCESSIBLE" ) );
////					}
////					buffers[0] = chan.openalStreamingBuffer[0];
////					buffers[1] = chan.openalStreamingBuffer[1];
////					buffers[2] = chan.openalStreamingBuffer[2];
////					finishedbuffers = 3;
////				} else {
////					alGetSourcei( chan.openalSource, AL_BUFFERS_PROCESSED, &finishedbuffers );
////					alSourceUnqueueBuffers( chan.openalSource, finishedbuffers, &buffers[0] );
////					if ( finishedbuffers == 3 ) {
////						chan.triggered = true;
////					}
////				}
////
////				for ( j = 0; j < finishedbuffers; j++ ) {
////					chan.GatherChannelSamples( chan.openalStreamingOffset * sample.objectInfo.nChannels, MIXBUFFER_SAMPLES * sample.objectInfo.nChannels, alignedInputSamples );
////					for ( int i = 0; i < ( MIXBUFFER_SAMPLES * sample.objectInfo.nChannels ); i++ ) {
////						if ( alignedInputSamples[i] < -32768.0f )
////							((short *)alignedInputSamples)[i] = -32768;
////						else if ( alignedInputSamples[i] > 32767.0f )
////							((short *)alignedInputSamples)[i] = 32767;
////						else
////							((short *)alignedInputSamples)[i] = idMath::FtoiFast( alignedInputSamples[i] );
////					}
////					alBufferData( buffers[j], chan.leadinSample.objectInfo.nChannels == 1 ? AL_FORMAT_MONO16 : AL_FORMAT_STEREO16, alignedInputSamples, MIXBUFFER_SAMPLES * sample.objectInfo.nChannels * sizeof( short ), 44100 );
////					chan.openalStreamingOffset += MIXBUFFER_SAMPLES;
////				}
////
////				if ( finishedbuffers ) {
////					alSourceQueueBuffers( chan.openalSource, finishedbuffers, &buffers[0] );
////				}
////			}
////			
////			// (re)start if needed..
////			if ( chan.triggered ) {
////				alSourcePlay( chan.openalSource );
////				chan.triggered = false;
////			}
////		}
////	} else {
////
////		if ( slowmoActive && !chan.disallowSlow ) {
////			idSlowChannel slow = sound.GetSlowChannel( chan );
////
////			slow.AttachSoundChannel( chan );
////
////				if ( sample.objectInfo.nChannels == 2 ) {
////					// need to add a stereo path, but very few samples go through this
////					memset( alignedInputSamples, 0, sizeof( alignedInputSamples[0] ) * MIXBUFFER_SAMPLES * 2 );
////				} else {
////					slow.GatherChannelSamples( offset, MIXBUFFER_SAMPLES, alignedInputSamples );
////				}
////
////			sound.SetSlowChannel( chan, slow );
////		} else {
////			sound.ResetSlowChannel( chan );
////
////			// if we are getting a stereo sample adjust accordingly
////			if ( sample.objectInfo.nChannels == 2 ) {
////				// we should probably check to make sure any looping is also to a stereo sample...
////				chan.GatherChannelSamples( offset*2, MIXBUFFER_SAMPLES*2, alignedInputSamples );
////			} else {
////				chan.GatherChannelSamples( offset, MIXBUFFER_SAMPLES, alignedInputSamples );
////			}
////		}
////
////		//
////		// work out the left / right ear values
////		//
////		float	ears[6];
////		if ( global || omni ) {
////			// same for all speakers
////			for ( int i = 0 ; i < 6 ; i++ ) {
////				ears[i] = idSoundSystemLocal::s_globalFraction.GetFloat() * volume;
////			}
////			ears[3] = idSoundSystemLocal::s_subFraction.GetFloat() * volume;		// subwoofer
////
////		} else {
////			CalcEars( numSpeakers, spatializedOriginInMeters, listenerPos, listenerAxis, ears, spatialize );
////
////			for ( int i = 0 ; i < 6 ; i++ ) {
////				ears[i] *= volume;
////			}
////		}
////
////		// if the mask is 0, it really means do every channel
////		if ( !mask ) {
////			mask = 255;
////		}
////		// cleared mask bits set the mix volume to zero
////		for ( int i = 0 ; i < 6 ; i++ ) {
////			if ( !(mask & ( 1 << i ) ) ) {
////				ears[i] = 0;
////			}
////		}
////
////		// if sounds are generally normalized, using a mixing volume over 1.0 will
////		// almost always cause clipping noise.  If samples aren't normalized, there
////		// is a good call to allow overvolumes
////		if ( idSoundSystemLocal::s_clipVolumes.GetBool() && !( parms.soundShaderFlags & SSF_UNCLAMPED )  ) {
////			for ( int i = 0 ; i < 6 ; i++ ) {
////				if ( ears[i] > 1.0f ) {
////					ears[i] = 1.0f;
////				}
////			}
////		}
////
////		// if this is the very first mixing block, set the lastV
////		// to the current volume
////		if ( current44kHz == chan.trigger44kHzTime ) {
////			for ( j = 0 ; j < 6 ; j++ ) {
////				chan.lastV[j] = ears[j];
////			}
////		}
////
////		if ( numSpeakers == 6 ) {
////			if ( sample.objectInfo.nChannels == 1 ) {
////				SIMDProcessor.MixSoundSixSpeakerMono( finalMixBuffer, alignedInputSamples, MIXBUFFER_SAMPLES, chan.lastV, ears );
////			} else {
////				SIMDProcessor.MixSoundSixSpeakerStereo( finalMixBuffer, alignedInputSamples, MIXBUFFER_SAMPLES, chan.lastV, ears );
////			}
////		} else {
////			if ( sample.objectInfo.nChannels == 1 ) {
////				SIMDProcessor.MixSoundTwoSpeakerMono( finalMixBuffer, alignedInputSamples, MIXBUFFER_SAMPLES, chan.lastV, ears );
////			} else {
////				SIMDProcessor.MixSoundTwoSpeakerStereo( finalMixBuffer, alignedInputSamples, MIXBUFFER_SAMPLES, chan.lastV, ears );
////			}
////		}
////
////		for ( j = 0 ; j < 6 ; j++ ) {
////			chan.lastV[j] = ears[j];
////		}
////
////	}
////
////	soundSystemLocal.soundStats.activeSounds++;
////
////}
////
/////*
////===============
////idSoundWorldLocal::FindAmplitude
////
////  this is called from the main thread
////
////  if listenerPosition is NULL, this is being used for shader parameters,
////  like flashing lights and glows based on sound level.  Otherwise, it is being used for
////  the screen-shake on a player.
////
////  This doesn't do the portal-occlusion currently, because it would have to reset all the defs
////  which would be problematic in multiplayer
////===============
////*/
////float idSoundWorldLocal::FindAmplitude( idSoundEmitterLocal *sound, const int localTime, const idVec3 *listenerPosition, 
////									   const s_channelType channel, bool shakesOnly ) {
////	int		i, j;
////	soundShaderParms_t *parms;
////	float	volume;
////	int		activeChannelCount;
////	static const int AMPLITUDE_SAMPLES = MIXBUFFER_SAMPLES/8;
////	float	sourceBuffer[AMPLITUDE_SAMPLES];
////	float	sumBuffer[AMPLITUDE_SAMPLES];
////	// work out the distance from the listener to the emitter
////	float	dlen;
////
////	if ( !sound.playing ) {
////		return 0;
////	}
////
////	if ( listenerPosition ) {
////		// this doesn't do the portal spatialization
////		idVec3 dist = sound.origin - *listenerPosition;
////		dlen = dist.Length();
////		dlen *= DOOM_TO_METERS;
////	} else {
////		dlen = 1;
////	}
////
////	activeChannelCount = 0;
////
////	for ( i = 0; i < SOUND_MAX_CHANNELS ; i++ ) {
////		idSoundChannel	*chan = &sound.channels[ i ];
////
////		if ( !chan.triggerState ) {
////			continue;
////		}
////
////		if ( channel != SCHANNEL_ANY && chan.triggerChannel != channel) {
////			continue;
////		}
////
////		parms = &chan.parms;
////
////		int	localTriggerTimes = chan.trigger44kHzTime;
////
////		bool looping = ( parms.soundShaderFlags & SSF_LOOPING ) != 0;
////
////		// check for screen shakes
////		float shakes = parms.shakes;
////		if ( shakesOnly && shakes <= 0.0f ) {
////			continue;
////		}
////
////		//
////		// calculate volume
////		//
////		if ( !listenerPosition ) {
////			// just look at the raw wav data for light shader evaluation
////			volume = 1.0;
////		} else {
////			volume = parms.volume;
////			volume = soundSystemLocal.dB2Scale( volume );
////			if ( shakesOnly ) {
////				volume *= shakes;
////			}
////
////			if ( listenerPosition && !( parms.soundShaderFlags & SSF_GLOBAL )  ) {			
////				// check for overrides
////				float maxd = parms.maxDistance;
////				float mind = parms.minDistance;
////
////				if ( dlen >= maxd ) {
////					volume = 0.0f;
////				} else if ( dlen > mind ) {
////					float frac = idMath::ClampFloat( 0, 1, 1.0f - ((dlen - mind) / (maxd - mind)));
////					if ( idSoundSystemLocal::s_quadraticFalloff.GetBool() ) {
////						frac *= frac;
////					}
////					volume *= frac;
////				}
////			}
////		}
////
////		if ( volume <= 0 ) {
////			continue;
////		}
////
////		//
////		// fetch the sound from the cache
////		// this doesn't handle stereo samples correctly...
////		//
////		if ( !listenerPosition && chan.parms.soundShaderFlags & SSF_NO_FLICKER ) {
////			// the NO_FLICKER option is to allow a light to still play a sound, but
////			// not have it effect the intensity
////			for ( j = 0 ; j < (AMPLITUDE_SAMPLES); j++ ) {
////				sourceBuffer[j] = j & 1 ? 32767.0f : -32767.0f;
////			}
////		} else {
////			int offset = (localTime - localTriggerTimes);	// offset in samples
////			int size = ( looping ? chan.soundShader.entries[0].LengthIn44kHzSamples() : chan.leadinSample.LengthIn44kHzSamples() );
////			short *amplitudeData = (short *)( looping ? chan.soundShader.entries[0].amplitudeData : chan.leadinSample.amplitudeData );
////	
////			if ( amplitudeData ) {
////				// when the amplitudeData is present use that fill a dummy sourceBuffer
////				// this is to allow for amplitude based effect on hardware audio solutions
////				if ( looping ) offset %= size;
////				if ( offset < size ) {
////					for ( j = 0 ; j < (AMPLITUDE_SAMPLES); j++ ) {
////						sourceBuffer[j] = j & 1 ? amplitudeData[ ( offset / 512 ) * 2 ] : amplitudeData[ ( offset / 512 ) * 2 + 1 ];
////					}
////				}
////			} else {
////				// get actual sample data
////				chan.GatherChannelSamples( offset, AMPLITUDE_SAMPLES, sourceBuffer );
////			}
////		}
////		activeChannelCount++;
////		if ( activeChannelCount == 1 ) {
////			// store to the buffer
////			for( j = 0; j < AMPLITUDE_SAMPLES; j++ ) {
////				sumBuffer[ j ] = volume * sourceBuffer[ j ];
////			}
////		} else {
////			// add to the buffer
////			for( j = 0; j < AMPLITUDE_SAMPLES; j++ ) {
////				sumBuffer[ j ] += volume * sourceBuffer[ j ];
////			}
////		}
////	}
////
////	if ( activeChannelCount == 0 ) {
////		return 0.0;
////	}
////
////	float high = -32767.0f;
////	float low = 32767.0f;
////
////	// use a 20th of a second
////	for( i = 0; i < (AMPLITUDE_SAMPLES); i++ ) {
////		float fabval = sumBuffer[i];
////		if ( high < fabval ) {
////			high = fabval;
////		}
////		if ( low > fabval ) {
////			low = fabval;
////		}
////	}
////
////	float sout;
////	sout = atan( (high - low) / 32767.0f) / DEG2RAD(45);
////
////	return sout;
////}
////
/////*
////=================
////idSoundWorldLocal::FadeSoundClasses
////
////fade all sounds in the world with a given shader soundClass
////to is in Db (sigh), over is in seconds
////=================
////*/
////void	idSoundWorldLocal::FadeSoundClasses( const int soundClass, const float to, const float over ) {
////	if ( soundClass < 0 || soundClass >= SOUND_MAX_CLASSES ) {
////		common.Error( "idSoundWorldLocal::FadeSoundClasses: bad soundClass %i", soundClass );
////	}
////
////	idSoundFade	*fade = &soundClassFade[ soundClass ];
////
////	int	length44kHz = soundSystemLocal.MillisecondsToSamples( over * 1000 );
////
////	// if it is already fading to this volume at this rate, don't change it
////	if ( fade.fadeEndVolume == to && 
////		fade.fadeEnd44kHz - fade.fadeStart44kHz == length44kHz ) {
////		return;
////	}
////
////	int	start44kHz;
////
////	if ( fpa[0] ) {
////		// if we are recording an AVI demo, don't use hardware time
////		start44kHz = lastAVI44kHz + MIXBUFFER_SAMPLES;
////	} else {
////		start44kHz = soundSystemLocal.GetCurrent44kHzTime() + MIXBUFFER_SAMPLES;
////	}
////
////	// fade it
////	fade.fadeStartVolume = fade.FadeDbAt44kHz( start44kHz );
////	fade.fadeStart44kHz = start44kHz;
////	fade.fadeEnd44kHz = start44kHz + length44kHz;
////	fade.fadeEndVolume = to;
////}
////
/////*
////=================
////idSoundWorldLocal::SetSlowmo
////=================
////*/
////void idSoundWorldLocal::SetSlowmo( bool active ) {
////	slowmoActive = active;
////}
////
/////*
////=================
////idSoundWorldLocal::SetSlowmoSpeed
////=================
////*/
////void idSoundWorldLocal::SetSlowmoSpeed( float speed ) {
////	slowmoSpeed = speed;
////}
////
/////*
////=================
////idSoundWorldLocal::SetEnviroSuit
////=================
////*/
////void idSoundWorldLocal::SetEnviroSuit( bool active ) {
////	enviroSuitActive = active;
////}

};
////
/////*
////===================================================================================
////
////idSoundSystemLocal
////
////===================================================================================
////*/
////
////typedef struct {
////	ALuint			handle;
////	int				startTime;
////	idSoundChannel	*chan;
////	bool			inUse;
////	bool			looping;
////	bool			stereo;
////} openalSource_t;
////
class idSoundSystemLocal extends idSoundSystem {
////public:
	constructor() {
		super ( );
		this.isInitialized = false;
	}
////
////	// all non-hardware initialization
////	virtual void			Init( );
////
////	// shutdown routine
////	virtual	void			Shutdown( );
////	virtual void			ClearBuffer( );
////
////	// sound is attached to the window, and must be recreated when the window is changed
////	virtual bool			ShutdownHW( );
////	virtual bool			InitHW( );
////
////	// async loop, called at 60Hz
////	virtual int				AsyncUpdate( int time );
////	// async loop, when the sound driver uses a write strategy
////	virtual int				AsyncUpdateWrite( int time );
////	// direct mixing called from the sound driver thread for OSes that support it
////	virtual int				AsyncMix( int soundTime, float *mixBuffer );
////
	//SetMute ( mute: boolean ): void { throw "placeholder"; }
////
////	virtual cinData_t		ImageForTime( const int milliseconds, const bool waveform );
////
////	int						GetSoundDecoderInfo( int index, soundDecoderInfo_t &decoderInfo );
////
		// if rw == NULL, no portal occlusion or rendered debugging is available
		//AllocSoundWorld( rw :idRenderWorld ):idSoundWorld { throw "placeholder"; }
////
////	// specifying NULL will cause silence to be played
////	virtual void			SetPlayingSoundWorld( idSoundWorld *soundWorld );
////
////	// some tools, like the sound dialog, may be used in both the game and the editor
////	// This can return NULL, so check!
////	virtual idSoundWorld	*GetPlayingSoundWorld( );
////
	//BeginLevelLoad( ):void { throw "placeholder"; }
////	virtual	void			EndLevelLoad( const char *mapString );
////
////	virtual void			PrintMemInfo( MemInfo_t *mi );
////
////	virtual int				IsEAXAvailable( );
////
////	//-------------------------
////
////	int						GetCurrent44kHzTime( ) const;
////	float					dB2Scale( const float val ) const;
////	int						SamplesToMilliseconds( int samples ) const;
////	int						MillisecondsToSamples( int ms ) const;
////
////	void					DoEnviroSuit( float* samples, int numSamples, int numSpeakers );
////
////	ALuint					AllocOpenALSource( idSoundChannel *chan, bool looping, bool stereo );
////	void					FreeOpenALSource( ALuint handle );
////
	snd_audio_hw: idAudioHardware;
	soundCache: idSoundCache;

	currentSoundWorld:idSoundWorldLocal;	// the one to mix each async tic

	olddwCurrentWritePos :number/*int*/;	// statistics
	buffers :number/*int*/;				// statistics
	CurrentSoundTime :number/*int*/;		// set by the async thread and only used by the main thread

	nextWriteBlock :number/*unsigned int*/;
////
////	float 					realAccum[6*MIXBUFFER_SAMPLES+16];
////	float *					finalMixBuffer;			// points inside realAccum at a 16 byte aligned boundary
////
	isInitialized:boolean;
	muted:boolean;
	shutdown:boolean;
////
////	s_stats					soundStats;				// NOTE: updated throughout the code, not displayed anywhere
////
////	int						meterTops[256];
////	int						meterTopsTime[256];
////
////	dword *					graph;
////
////	float					volumesDB[1200];		// dB to float volume conversion
////
////	idList<SoundFX*>		fxList;
////
////	ALCdevice				*openalDevice;
////	ALCcontext				*openalContext;
////	ALsizei					openalSourceCount;
////	openalSource_t			openalSources[256];
////	EAXSet					alEAXSet;
////	EAXGet					alEAXGet;
////	EAXSetBufferMode		alEAXSetBufferMode;
////	EAXGetBufferMode		alEAXGetBufferMode;
////	idEFXFile				EFXDatabase;
	efxloaded:boolean;
	// latches
	static useOpenAL: boolean;
	static useEAXReverb: boolean;
////							// mark available during initialization, or through an explicit test
////	static int				EAXAvailable;
////
////
	static s_noSound:idCVar;
	static s_quadraticFalloff:idCVar;
	static s_drawSounds:idCVar;
	static s_minVolume6:idCVar;
	static s_dotbias6:idCVar;
	static s_minVolume2:idCVar;
	static s_dotbias2:idCVar;
	static s_spatializationDecay:idCVar;
	static s_showStartSound:idCVar;
	static s_maxSoundsPerShader:idCVar;
	static s_reverse:idCVar;
	static s_showLevelMeter:idCVar;
	static s_meterTopTime:idCVar;
	static s_volume:idCVar;
	static s_constantAmplitude:idCVar;
	static s_playDefaultSound:idCVar;
	static s_useOcclusion:idCVar;
	static s_subFraction:idCVar;
	static s_globalFraction:idCVar;
	static s_doorDistanceAdd:idCVar;
	static s_singleEmitter:idCVar;
	static s_numberOfSpeakers:idCVar;
	static s_force22kHz:idCVar;
	static s_clipVolumes:idCVar;
	static s_realTimeDecoding:idCVar;
	static s_libOpenAL:idCVar;
	static s_useOpenAL:idCVar;
	static s_useEAXReverb:idCVar;
	static s_muteEAXReverb:idCVar;
	static s_decompressionLimit:idCVar;
	
	static s_slowAttenuate:idCVar;
	
	static s_enviroSuitCutoffFreq:idCVar;
	static s_enviroSuitCutoffQ:idCVar;
	static s_enviroSuitSkipLowpass:idCVar;
	static s_enviroSuitSkipReverb:idCVar;
	
	static s_reverbTime:idCVar;
	static s_reverbFeedback:idCVar;
	static s_enviroSuitVolumeScale:idCVar;
	static s_skipHelltimeFX: idCVar;





	/////*
	////===============
	////idSoundSystemLocal::Init
	////
	////initialize the sound system
	////===============
	////*/
	////void idSoundSystemLocal::Init() {
	////
	////	common.Printf( "----- Initializing Sound System ------\n" );
	////
	////	this.isInitialized = false;
	////	muted = false;
	////	shutdown = false;
	////
	////	currentSoundWorld = NULL;
	////	this.soundCache = NULL;
	////
	////	olddwCurrentWritePos = 0;
	////	buffers = 0;
	////	CurrentSoundTime = 0;
	////
	////	nextWriteBlock = 0xffffffff;
	////
	////	memset( meterTops, 0, sizeof( meterTops ) );
	////	memset( meterTopsTime, 0, sizeof( meterTopsTime ) );
	////
	////	for( int i = -600; i < 600; i++ ) {
	////		float pt = i * 0.1f;
	////		volumesDB[i+600] = pow( 2.0f,( pt * ( 1.0f / 6.0f ) ) );
	////	}
	////
	////	// make a 16 byte aligned finalMixBuffer
	////	finalMixBuffer = (float *) ( ( ( (int)realAccum ) + 15 ) & ~15 );
	////
	////	graph = NULL;
	////
	////	if ( !s_noSound.GetBool() ) {
	////		idSampleDecoder::Init();
	////		this.soundCache = new idSoundCache();
	////	}
	////
	////	// set up openal device and context
	////	common.StartupVariable( "s_useOpenAL", true );
	////	common.StartupVariable( "s_useEAXReverb", true );
	////
	////	if ( idSoundSystemLocal::s_useOpenAL.GetBool() || idSoundSystemLocal::s_useEAXReverb.GetBool() ) {
	////		if ( !Sys_LoadOpenAL() ) {
	////			idSoundSystemLocal::s_useOpenAL.SetBool( false );
	////		} else {
	////			common.Printf( "Setup OpenAL device and context... " );
	////			openalDevice = alcOpenDevice( NULL );
	////			openalContext = alcCreateContext( openalDevice, NULL );
	////			alcMakeContextCurrent( openalContext );
	////			common.Printf( "Done.\n" );
	////
	////			// try to obtain EAX extensions
	////			if ( idSoundSystemLocal::s_useEAXReverb.GetBool() && alIsExtensionPresent( ID_ALCHAR "EAX4.0" ) ) {
	////				idSoundSystemLocal::s_useOpenAL.SetBool( true );	// EAX presence causes AL enable
	////				alEAXSet = (EAXSet)alGetProcAddress( ID_ALCHAR "EAXSet" );
	////				alEAXGet = (EAXGet)alGetProcAddress( ID_ALCHAR "EAXGet" );
	////				common.Printf( "OpenAL: found EAX 4.0 extension\n" );
	////			} else {
	////				common.Printf( "OpenAL: EAX 4.0 extension not found\n" );
	////				idSoundSystemLocal::s_useEAXReverb.SetBool( false );
	////				alEAXSet = (EAXSet)NULL;
	////				alEAXGet = (EAXGet)NULL;
	////			}
	////
	////			// try to obtain EAX-RAM extension - not required for operation
	////			if ( alIsExtensionPresent( ID_ALCHAR "EAX-RAM" ) == AL_TRUE ) {
	////				alEAXSetBufferMode = (EAXSetBufferMode)alGetProcAddress( ID_ALCHAR "EAXSetBufferMode" );
	////				alEAXGetBufferMode = (EAXGetBufferMode)alGetProcAddress( ID_ALCHAR "EAXGetBufferMode" );
	////				common.Printf( "OpenAL: found EAX-RAM extension, %dkB\\%dkB\n", alGetInteger( alGetEnumValue( ID_ALCHAR "AL_EAX_RAM_FREE" ) ) / 1024, alGetInteger( alGetEnumValue( ID_ALCHAR "AL_EAX_RAM_SIZE" ) ) / 1024 );
	////			} else {
	////				alEAXSetBufferMode = (EAXSetBufferMode)NULL;
	////				alEAXGetBufferMode = (EAXGetBufferMode)NULL;
	////				common.Printf( "OpenAL: no EAX-RAM extension\n" );
	////			}
	////
	////			if ( !idSoundSystemLocal::s_useOpenAL.GetBool() ) {
	////				common.Printf( "OpenAL: disabling ( no EAX ). Using legacy mixer.\n" );
	////
	////				alcMakeContextCurrent( NULL );
	////		
	////				alcDestroyContext( openalContext );
	////				openalContext = NULL;
	////		
	////				alcCloseDevice( openalDevice );
	////				openalDevice = NULL;
	////			} else {
	////
	////				ALuint handle;		
	////				openalSourceCount = 0;
	////				
	////				while ( openalSourceCount < 256 ) {
	////					alGetError();
	////					alGenSources( 1, &handle );
	////					if ( alGetError() != AL_NO_ERROR ) {
	////						break;
	////					} else {
	////						// store in source array
	////						openalSources[openalSourceCount].handle = handle;
	////						openalSources[openalSourceCount].startTime = 0;
	////						openalSources[openalSourceCount].chan = NULL;
	////						openalSources[openalSourceCount].inUse = false;
	////						openalSources[openalSourceCount].looping = false;
	////
	////						// initialise sources
	////						alSourcef( handle, AL_ROLLOFF_FACTOR, 0.0f );
	////
	////						// found one source
	////						openalSourceCount++;
	////					}
	////				}
	////
	////				common.Printf( "OpenAL: found %s\n", alcGetString( openalDevice, ALC_DEVICE_SPECIFIER ) );
	////				common.Printf( "OpenAL: found %d hardware voices\n", openalSourceCount );
	////
	////				// adjust source count to allow for at least eight stereo sounds to play
	////				openalSourceCount -= 8;
	////
	////				EAXAvailable = 1;
	////			}
	////		}
	////	}
	////
	////	useOpenAL = idSoundSystemLocal::s_useOpenAL.GetBool();
	////	useEAXReverb = idSoundSystemLocal::s_useEAXReverb.GetBool();
	////
	////	cmdSystem.AddCommand( "listSounds", ListSounds_f, CMD_FL_SOUND, "lists all sounds" );
	////	cmdSystem.AddCommand( "listSoundDecoders", ListSoundDecoders_f, CMD_FL_SOUND, "list active sound decoders" );
	////	cmdSystem.AddCommand( "reloadSounds", SoundReloadSounds_f, CMD_FL_SOUND|CMD_FL_CHEAT, "reloads all sounds" );
	////	cmdSystem.AddCommand( "testSound", TestSound_f, CMD_FL_SOUND | CMD_FL_CHEAT, "tests a sound", idCmdSystem::ArgCompletion_SoundName );
	////	cmdSystem.AddCommand( "s_restart", SoundSystemRestart_f, CMD_FL_SOUND, "restarts the sound system" );
	////
	////	common.Printf( "sound system initialized.\n" );
	////	common.Printf( "--------------------------------------\n" );
	////}
	////
	/////*
	////===============
	////idSoundSystemLocal::Shutdown
	////===============
	////*/
	////void idSoundSystemLocal::Shutdown() {
	////	ShutdownHW();
	////
	////	// EAX or not, the list needs to be cleared
	////	EFXDatabase.Clear();
	////
	////	// destroy openal sources
	////	if ( useOpenAL ) {
	////		
	////		this.efxloaded = false;
	////
	////		// adjust source count back up to allow for freeing of all resources
	////		openalSourceCount += 8;
	////
	////		for ( ALsizei i = 0; i < openalSourceCount; i++ ) {
	////			// stop source
	////			alSourceStop( openalSources[i].handle );
	////			alSourcei( openalSources[i].handle, AL_BUFFER, 0 );
	////			
	////			// delete source
	////			alDeleteSources( 1, &openalSources[i].handle );
	////
	////			// clear entry in source array
	////			openalSources[i].handle = NULL;
	////			openalSources[i].startTime = 0;
	////			openalSources[i].chan = NULL;
	////			openalSources[i].inUse = false;
	////			openalSources[i].looping = false;
	////
	////		}
	////	}
	////
	////	// destroy all the sounds (hardware buffers as well)
	////	delete this.soundCache;
	////	this.soundCache = NULL;
	////
	////	// destroy openal device and context
	////	if ( useOpenAL ) {
	////		alcMakeContextCurrent( NULL );
	////		
	////		alcDestroyContext( openalContext );
	////		openalContext = NULL;
	////		
	////		alcCloseDevice( openalDevice );
	////		openalDevice = NULL;
	////	}
	////
	////	Sys_FreeOpenAL();
	////
	////	idSampleDecoder::Shutdown();
	////}
	////
	/////*
	////===============
	////idSoundSystemLocal::InitHW
	////===============
	////*/
	////bool idSoundSystemLocal::InitHW() {
	////
	////	if ( s_noSound.GetBool() ) {
	////		return false;
	////	}
	////
	////	delete this.snd_audio_hw;
	////	this.snd_audio_hw = idAudioHardware::Alloc();
	////
	////	if ( this.snd_audio_hw == NULL ) {
	////		return false;
	////	}
	////
	////	if ( !useOpenAL ) {
	////		if ( !this.snd_audio_hw.Initialize() ) {
	////			delete this.snd_audio_hw;
	////			this.snd_audio_hw = NULL;
	////			return false;
	////		}
	////
	////		if ( this.snd_audio_hw.GetNumberOfSpeakers() == 0 ) {
	////			return false;
	////		}
	////		// put the real number in there
	////		s_numberOfSpeakers.SetInteger( this.snd_audio_hw.GetNumberOfSpeakers() );
	////	}
	////
	////	this.isInitialized = true;
	////	shutdown = false;
	////
	////	return true;
	////}
	////
	/////*
	////===============
	////idSoundSystemLocal::ShutdownHW
	////===============
	////*/
	////bool idSoundSystemLocal::ShutdownHW() {
	////	if ( !this.isInitialized ) {
	////		return false;
	////	}
	////
	////	shutdown = true;		// don't do anything at AsyncUpdate() time
	////	Sys_Sleep( 100 );		// sleep long enough to make sure any async sound talking to hardware has returned
	////
	////	common.Printf( "Shutting down sound hardware\n" );
	////
	////	delete this.snd_audio_hw;
	////	this.snd_audio_hw = NULL;
	////
	////	this.isInitialized = false;
	////
	////	if ( graph ) {
	////		Mem_Free( graph );
	////		graph = NULL;
	////	}
	////
	////	return true;
	////}

	/*
	===============
	idSoundSystemLocal::GetCurrent44kHzTime
	===============
	*/
	GetCurrent44kHzTime(): number/*int*/ {
		if (this.snd_audio_hw) {
			return this.CurrentSoundTime;
		} else {
			// NOTE: this would overflow 31bits within about 1h20 ( not that important since we get a snd_audio_hw right away pbly )
			//return ( ( Sys_Milliseconds()*441 ) / 10 ) * 4; 
			return idMath.FtoiFast( /*(float)*/Sys_Milliseconds() * 176.4);
		}
	}

/////*
////===================
////idSoundSystemLocal::ClearBuffer
////===================
////*/
////void idSoundSystemLocal::ClearBuffer( ) {
////
////	// check to make sure hardware actually exists
////	if ( !this.snd_audio_hw ) {
////		return;
////	}
////
////	short *fBlock;
////	ulong fBlockLen;
////
////	if ( !this.snd_audio_hw.Lock( (void **)&fBlock, &fBlockLen ) ) {
////		return;
////	}
////
////	if ( fBlock ) {
////		SIMDProcessor.Memset( fBlock, 0, fBlockLen );
////		this.snd_audio_hw.Unlock( fBlock, fBlockLen );
////	}
////}
////
/////*
////===================
////idSoundSystemLocal::AsyncMix
////Mac OSX version. The system uses it's own thread and an IOProc callback
////===================
////*/
////int idSoundSystemLocal::AsyncMix( int soundTime, float *mixBuffer ) {
////	int	inTime, numSpeakers;
////
////	if ( !this.isInitialized || shutdown || !this.snd_audio_hw ) {
////		return 0;
////	}
////
////	inTime = Sys_Milliseconds();
////	numSpeakers = this.snd_audio_hw.GetNumberOfSpeakers();
////	
////	// let the active sound world mix all the channels in unless muted or avi demo recording
////	if ( !muted && currentSoundWorld && !currentSoundWorld.fpa[0] ) {
////		currentSoundWorld.MixLoop( soundTime, numSpeakers, mixBuffer );
////	}
////
////	this.CurrentSoundTime = soundTime;
////	
////	return Sys_Milliseconds() - inTime;
////}
////
/////*
////===================
////idSoundSystemLocal::AsyncUpdate
////called from async sound thread when com_asyncSound == 1 ( Windows )
////===================
////*/
////int idSoundSystemLocal::AsyncUpdate( int inTime ) {
////
////	if ( !this.isInitialized || shutdown || !this.snd_audio_hw ) {
////		return 0;
////	}
////
////	ulong dwCurrentWritePos;
////	dword dwCurrentBlock;
////
////	// If not using openal, get actual playback position from sound hardware
////	if ( useOpenAL ) {
////		// here we do it in samples ( overflows in 27 hours or so )
////		dwCurrentWritePos = idMath::Ftol( (float)Sys_Milliseconds() * 44.1f ) % ( MIXBUFFER_SAMPLES * ROOM_SLICES_IN_BUFFER );
////		dwCurrentBlock = dwCurrentWritePos / MIXBUFFER_SAMPLES;
////	} else {
////		// and here in bytes
////		// get the current byte position in the buffer where the sound hardware is currently reading
////		if ( !this.snd_audio_hw.GetCurrentPosition( &dwCurrentWritePos ) ) {
////			return 0;
////		}
////		// mixBufferSize is in bytes
////		dwCurrentBlock = dwCurrentWritePos / this.snd_audio_hw.GetMixBufferSize();
////	}
////
////	if ( nextWriteBlock == 0xffffffff ) {
////		nextWriteBlock = dwCurrentBlock;
////	}
////
////	if ( dwCurrentBlock != nextWriteBlock ) {
////		return 0;
////	}
////
////	// lock the buffer so we can actually write to it
////	short *fBlock = NULL;
////	ulong fBlockLen = 0;
////	if ( !useOpenAL ) {
////		this.snd_audio_hw.Lock( (void **)&fBlock, &fBlockLen );
////		if ( !fBlock ) {
////			return 0;
////		}
////	}
////
////	int j;
////	soundStats.runs++;
////	soundStats.activeSounds = 0;
////
////	int	numSpeakers = this.snd_audio_hw.GetNumberOfSpeakers();
////
////	nextWriteBlock++;
////	nextWriteBlock %= ROOM_SLICES_IN_BUFFER;
////
////	int newPosition = nextWriteBlock * MIXBUFFER_SAMPLES;
////
////	if ( newPosition < olddwCurrentWritePos ) {
////		buffers++;					// buffer wrapped
////	}
////
////	// nextWriteSample is in multi-channel samples inside the buffer
////	int	nextWriteSamples = nextWriteBlock * MIXBUFFER_SAMPLES;
////
////	olddwCurrentWritePos = newPosition;
////
////	// newSoundTime is in multi-channel samples since the sound system was started
////	int newSoundTime = ( buffers * MIXBUFFER_SAMPLES * ROOM_SLICES_IN_BUFFER ) + nextWriteSamples;
////	
////	// check for impending overflow
////	// FIXME: we don't handle sound wrap-around correctly yet
////	if ( newSoundTime > 0x6fffffff ) {
////		buffers = 0;
////	}
////
////	if ( (newSoundTime - this.CurrentSoundTime) > (int)MIXBUFFER_SAMPLES ) {
////		soundStats.missedWindow++;
////	}
////
////	if ( useOpenAL ) {
////		// enable audio hardware caching
////		alcSuspendContext( openalContext );
////	} else {
////		// clear the buffer for all the mixing output
////		SIMDProcessor.Memset( finalMixBuffer, 0, MIXBUFFER_SAMPLES * sizeof(float) * numSpeakers );
////	}
////
////	// let the active sound world mix all the channels in unless muted or avi demo recording
////	if ( !muted && currentSoundWorld && !currentSoundWorld.fpa[0] ) {
////		currentSoundWorld.MixLoop( newSoundTime, numSpeakers, finalMixBuffer );
////	}
////
////	if ( useOpenAL ) {
////		// disable audio hardware caching (this updates ALL settings since last alcSuspendContext)
////		alcProcessContext( openalContext );
////	} else {
////		short *dest = fBlock + nextWriteSamples * numSpeakers;
////
////		SIMDProcessor.MixedSoundToSamples( dest, finalMixBuffer, MIXBUFFER_SAMPLES * numSpeakers );
////
////		// allow swapping the left / right speaker channels for people with miswired systems
////		if ( numSpeakers == 2 && s_reverse.GetBool() ) {
////			for( j = 0; j < MIXBUFFER_SAMPLES; j++ ) {
////				short temp = dest[j*2];
////				dest[j*2] = dest[j*2+1];
////				dest[j*2+1] = temp;
////			}
////		}
////		this.snd_audio_hw.Unlock( fBlock, fBlockLen );
////	}
////
////	this.CurrentSoundTime = newSoundTime;
////
////	soundStats.timeinprocess = Sys_Milliseconds() - inTime;
////
////	return soundStats.timeinprocess;
////}
////
/////*
////===================
////idSoundSystemLocal::AsyncUpdateWrite
////sound output using a write API. all the scheduling based on time
////we mix MIXBUFFER_SAMPLES at a time, but we feed the audio device with smaller chunks (and more often)
////called by the sound thread when com_asyncSound is 3 ( Linux )
////===================
////*/
////int idSoundSystemLocal::AsyncUpdateWrite( int inTime ) {
////
////	if ( !this.isInitialized || shutdown || !this.snd_audio_hw ) {
////		return 0;
////	}
////
////	if ( !useOpenAL ) {
////		this.snd_audio_hw.Flush();
////	}
////
////	unsigned int dwCurrentBlock = (unsigned int)( inTime * 44.1f / MIXBUFFER_SAMPLES );
////
////	if ( nextWriteBlock == 0xffffffff ) {
////		nextWriteBlock = dwCurrentBlock;
////	}
////
////	if ( dwCurrentBlock < nextWriteBlock ) {
////		return 0;
////	}
////
////	if ( nextWriteBlock != dwCurrentBlock ) {
////		Sys_Printf( "missed %d sound updates\n", dwCurrentBlock - nextWriteBlock );
////	}
////
////	int sampleTime = dwCurrentBlock * MIXBUFFER_SAMPLES;	
////	int numSpeakers = this.snd_audio_hw.GetNumberOfSpeakers();
////
////	if ( useOpenAL ) {
////		// enable audio hardware caching
////		alcSuspendContext( openalContext );
////	} else {
////		// clear the buffer for all the mixing output
////		SIMDProcessor.Memset( finalMixBuffer, 0, MIXBUFFER_SAMPLES * sizeof(float) * numSpeakers );
////	}
////
////	// let the active sound world mix all the channels in unless muted or avi demo recording
////	if ( !muted && currentSoundWorld && !currentSoundWorld.fpa[0] ) {
////		currentSoundWorld.MixLoop( sampleTime, numSpeakers, finalMixBuffer );
////	}
////
////	if ( useOpenAL ) {
////		// disable audio hardware caching (this updates ALL settings since last alcSuspendContext)
////		alcProcessContext( openalContext );
////	} else {
////		short *dest = this.snd_audio_hw.GetMixBuffer();
////
////		SIMDProcessor.MixedSoundToSamples( dest, finalMixBuffer, MIXBUFFER_SAMPLES * numSpeakers );
////
////		// allow swapping the left / right speaker channels for people with miswired systems
////		if ( numSpeakers == 2 && s_reverse.GetBool() ) {
////			int j;
////			for( j = 0; j < MIXBUFFER_SAMPLES; j++ ) {
////				short temp = dest[j*2];
////				dest[j*2] = dest[j*2+1];
////				dest[j*2+1] = temp;
////			}
////		}
////		this.snd_audio_hw.Write( false );
////	}
////
////	// only move to the next block if the write was successful
////	nextWriteBlock = dwCurrentBlock + 1;
////	this.CurrentSoundTime = sampleTime;
////
////	return Sys_Milliseconds() - inTime;
////}
////
/////*
////===================
////idSoundSystemLocal::dB2Scale
////===================
////*/
////float idSoundSystemLocal::dB2Scale( const float val ) const {
////	if ( val == 0.0f ) {
////		return 1.0f;				// most common
////	} else if ( val <= -60.0f ) {
////		return 0.0f;
////	} else if ( val >= 60.0f ) {
////		return powf( 2.0f, val * ( 1.0f / 6.0f ) ); 
////	}
////	int ival = (int)( ( val + 60.0f ) * 10.0f );
////	return volumesDB[ival];
////}
////
/////*
////===================
////idSoundSystemLocal::ImageForTime
////===================
////*/
////cinData_t idSoundSystemLocal::ImageForTime( const int milliseconds, const bool waveform ) {
////	cinData_t ret;
////	int i, j;
////
////	if ( !this.isInitialized || !this.snd_audio_hw ) {
////		memset( &ret, 0, sizeof( ret ) );
////		return ret;
////	}
////
////	Sys_EnterCriticalSection();
////
////	if ( !graph ) {
////		graph = (dword *)Mem_Alloc( 256*128 * 4);
////	}
////	memset( graph, 0, 256*128 * 4 );
////	float *accum = finalMixBuffer;	// unfortunately, these are already clamped
////	int time = Sys_Milliseconds();
////
////	int numSpeakers = this.snd_audio_hw.GetNumberOfSpeakers();
////
////	if ( !waveform ) {
////		for( j = 0; j < numSpeakers; j++ ) {
////			int meter = 0;
////			for( i = 0; i < MIXBUFFER_SAMPLES; i++ ) {
////				float result = idMath::Fabs(accum[i*numSpeakers+j]);
////				if ( result > meter ) {
////					meter = result;
////				}
////			}
////
////			meter /= 256;		// 32768 becomes 128
////			if ( meter > 128 ) {
////				meter = 128;
////			}
////			int offset;
////			int xsize;
////			if ( numSpeakers == 6 ) {
////				offset = j * 40;
////				xsize = 20;
////			} else {
////				offset = j * 128;
////				xsize = 63;
////			}
////			int x,y;
////			dword color = 0xff00ff00;
////			for ( y = 0; y < 128; y++ ) {
////				for ( x = 0; x < xsize; x++ ) {
////					graph[(127-y)*256 + offset + x ] = color;
////				}
////#if 0
////				if ( y == 80 ) {
////					color = 0xff00ffff;
////				} else if ( y == 112 ) {
////					color = 0xff0000ff;
////				}
////#endif
////				if ( y > meter ) {
////					break;
////				}
////			}
////
////			if ( meter > meterTops[j] ) {
////				meterTops[j] = meter;
////				meterTopsTime[j] = time + s_meterTopTime.GetInteger();
////			} else if ( time > meterTopsTime[j] && meterTops[j] > 0 ) {
////				meterTops[j]--;
////				if (meterTops[j]) {
////					meterTops[j]--;
////				}
////			}
////		}
////
////		for( j = 0; j < numSpeakers; j++ ) {
////			int meter = meterTops[j];
////
////			int offset;
////			int xsize;
////			if ( numSpeakers == 6 ) {
////				offset = j*40;
////				xsize = 20;
////			} else {
////				offset = j*128;
////				xsize = 63;
////			}
////			int x,y;
////			dword color;
////			if ( meter <= 80 ) {
////				color = 0xff007f00;
////			} else if ( meter <= 112 ) {
////				color = 0xff007f7f;
////			} else {
////				color = 0xff00007f;
////			}
////			for ( y = meter; y < 128 && y < meter + 4; y++ ) {
////				for ( x = 0; x < xsize; x++ ) {
////					graph[(127-y)*256 + offset + x ] = color;
////				}
////			}
////		}
////	} else {
////		dword colors[] = { 0xff007f00, 0xff007f7f, 0xff00007f, 0xff00ff00, 0xff00ffff, 0xff0000ff };
////
////		for( j = 0; j < numSpeakers; j++ ) {
////			int xx = 0;
////			float fmeter;
////			int step = MIXBUFFER_SAMPLES / 256;
////			for( i = 0; i < MIXBUFFER_SAMPLES; i += step ) {
////				fmeter = 0.0f;
////				for( int x = 0; x < step; x++ ) {
////					float result = accum[(i+x)*numSpeakers+j];
////					result = result / 32768.0f;
////					fmeter += result;
////				}
////				fmeter /= 4.0f;
////				if ( fmeter < -1.0f ) {
////					fmeter = -1.0f;
////				} else if ( fmeter > 1.0f ) {
////					fmeter = 1.0f;
////				}
////				int meter = (fmeter * 63.0f);
////				graph[ (meter + 64) * 256 + xx ] = colors[j];
////
////				if ( meter < 0 ) {
////					meter = -meter;
////				}
////				if ( meter > meterTops[xx] ) {
////					meterTops[xx] = meter;
////					meterTopsTime[xx] = time + 100;
////				} else if ( time>meterTopsTime[xx] && meterTops[xx] > 0 ) {
////					meterTops[xx]--;
////					if ( meterTops[xx] ) {
////						meterTops[xx]--;
////					}
////				}
////				xx++;
////			}
////		}
////		for( i = 0; i < 256; i++ ) {
////			int meter = meterTops[i];
////			for ( int y = -meter; y < meter; y++ ) {
////				graph[ (y+64)*256 + i ] = colors[j];
////			}
////		}
////	}
////	ret.imageHeight = 128;
////	ret.imageWidth = 256;
////	ret.image = (unsigned char *)graph;
////
////	Sys_LeaveCriticalSection();
////
////	return ret;
////}
////
/////*
////===================
////idSoundSystemLocal::GetSoundDecoderInfo
////===================
////*/
////int idSoundSystemLocal::GetSoundDecoderInfo( int index, soundDecoderInfo_t &decoderInfo ) {
////	int i, j, firstEmitter, firstChannel;
////	idSoundWorldLocal *sw = soundSystemLocal.currentSoundWorld;
////
////	if ( index < 0 ) {
////		firstEmitter = 0;
////		firstChannel = 0;
////	} else {
////		firstEmitter = index / SOUND_MAX_CHANNELS;
////		firstChannel = index - firstEmitter * SOUND_MAX_CHANNELS + 1;
////	}
////
////	for ( i = firstEmitter; i < sw.emitters.Num(); i++ ) {
////		idSoundEmitterLocal *sound = sw.emitters[i];
////
////		if ( !sound ) {
////			continue;
////		}
////
////		// run through all the channels
////		for ( j = firstChannel; j < SOUND_MAX_CHANNELS; j++ ) {
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
////			decoderInfo.name = sample.name;
////			decoderInfo.format = ( sample.objectInfo.wFormatTag == WAVE_FORMAT_TAG_OGG ) ? "OGG" : "WAV";
////			decoderInfo.numChannels = sample.objectInfo.nChannels;
////			decoderInfo.numSamplesPerSecond = sample.objectInfo.nSamplesPerSec;
////			decoderInfo.num44kHzSamples = sample.LengthIn44kHzSamples();
////			decoderInfo.numBytes = sample.objectMemSize;
////			decoderInfo.looping = ( chan.parms.soundShaderFlags & SSF_LOOPING ) != 0;
////			decoderInfo.lastVolume = chan.lastVolume;
////			decoderInfo.start44kHzTime = chan.trigger44kHzTime;
////			decoderInfo.current44kHzTime = soundSystemLocal.GetCurrent44kHzTime();
////
////			return ( i * SOUND_MAX_CHANNELS + j );
////		}
////
////		firstChannel = 0;
////	}
////	return -1;
////}
////
/*
===================
idSoundSystemLocal::AllocSoundWorld
===================
*/
AllocSoundWorld (rw: idRenderWorld): idSoundWorld {
		var local = new idSoundWorldLocal;

		local.Init(rw);

		return local;
	}

/*
===================
idSoundSystemLocal::SetMute
===================
*/
SetMute  (muteOn: boolean): void {
		this.muted = muteOn;
	}

/////*
////===================
////idSoundSystemLocal::SamplesToMilliseconds
////===================
////*/
////int idSoundSystemLocal::SamplesToMilliseconds( int samples ) const {
////	return ( samples / (PRIMARYFREQ/1000) );
////}
////
/////*
////===================
////idSoundSystemLocal::SamplesToMilliseconds
////===================
////*/
////int idSoundSystemLocal::MillisecondsToSamples( int ms ) const {
////	return ( ms * (PRIMARYFREQ/1000) );
////}
////
/////*
////===================
////idSoundSystemLocal::SetPlayingSoundWorld
////
////specifying NULL will cause silence to be played
////===================
////*/
////void idSoundSystemLocal::SetPlayingSoundWorld( idSoundWorld *soundWorld ) {
////	currentSoundWorld = static_cast<idSoundWorldLocal *>(soundWorld);
////}
////
/////*
////===================
////idSoundSystemLocal::GetPlayingSoundWorld
////===================
////*/
////idSoundWorld *idSoundSystemLocal::GetPlayingSoundWorld( ) {
////	return currentSoundWorld;
////}
////
/*
===================
idSoundSystemLocal::BeginLevelLoad
===================
*/

	BeginLevelLoad ( ): void {
		if ( !this.isInitialized ) {
			return;
		}
		this.soundCache.BeginLevelLoad ( );

		if ( this.efxloaded ) {
			todoThrow ( );
			//EFXDatabase.UnloadFile ( );
			//this.efxloaded = false;
		}
	}

/////*
////===================
////idSoundSystemLocal::EndLevelLoad
////===================
////*/
////void idSoundSystemLocal::EndLevelLoad( const char *mapstring ) {
////	if ( !this.isInitialized ) {
////		return;
////	}
////	this.soundCache.EndLevelLoad();
////
////	idStr efxname( "efxs/" );
////	idStr mapname( mapstring );
////
////	mapname.SetFileExtension( ".efx" );
////	mapname.StripPath();
////	efxname += mapname;
////
////	this.efxloaded = EFXDatabase.LoadFile( efxname );
////
////	if ( this.efxloaded ) {
////		common.Printf("sound: found %s\n", efxname.c_str() );
////	} else {
////		common.Printf("sound: missing %s\n", efxname.c_str() );
////	}
////}
////
/////*
////===================
////idSoundSystemLocal::AllocOpenALSource
////===================
////*/
////ALuint idSoundSystemLocal::AllocOpenALSource( idSoundChannel *chan, bool looping, bool stereo ) {
////	int timeOldestZeroVolSingleShot = Sys_Milliseconds();
////	int timeOldestZeroVolLooping = Sys_Milliseconds();
////	int timeOldestSingle = Sys_Milliseconds();
////	int iOldestZeroVolSingleShot = -1;
////	int iOldestZeroVolLooping = -1;
////	int iOldestSingle = -1;
////	int iUnused = -1;
////	int index = -1;
////	ALsizei i;
////
////	// Grab current msec time
////	int time = Sys_Milliseconds();
////
////	// Cycle through all sources
////	for ( i = 0; i < openalSourceCount; i++ ) {
////		// Use any unused source first,
////		// Then find oldest single shot quiet source,
////		// Then find oldest looping quiet source and
////		// Lastly find oldest single shot non quiet source..
////		if ( !openalSources[i].inUse ) {
////			iUnused = i;
////			break;
////		}  else if ( !openalSources[i].looping && openalSources[i].chan.lastVolume < SND_EPSILON ) {
////			if ( openalSources[i].startTime < timeOldestZeroVolSingleShot ) {
////				timeOldestZeroVolSingleShot = openalSources[i].startTime;
////				iOldestZeroVolSingleShot = i;
////			}
////		} else if ( openalSources[i].looping && openalSources[i].chan.lastVolume < SND_EPSILON ) {
////			if ( openalSources[i].startTime < timeOldestZeroVolLooping ) {
////				timeOldestZeroVolLooping = openalSources[i].startTime;
////				iOldestZeroVolLooping = i;
////			}
////		} else if ( !openalSources[i].looping ) {
////			if ( openalSources[i].startTime < timeOldestSingle ) {
////				timeOldestSingle = openalSources[i].startTime;
////				iOldestSingle = i;
////			}
////		}
////	}
////
////	if ( iUnused != -1 ) {
////		index = iUnused;
////	} else if ( iOldestZeroVolSingleShot != - 1 ) {
////		index = iOldestZeroVolSingleShot;
////	} else if ( iOldestZeroVolLooping != -1 ) {
////		index = iOldestZeroVolLooping;
////	} else if ( iOldestSingle != -1 ) {
////		index = iOldestSingle;
////	}
////
////	if ( index != -1 ) {
////		// stop the channel that is being ripped off
////		if ( openalSources[index].chan ) {
////			// stop the channel only when not looping
////			if ( !openalSources[index].looping ) {
////				openalSources[index].chan.Stop();
////			} else {
////				openalSources[index].chan.triggered = true;
////			}
////
////			// Free hardware resources
////			openalSources[index].chan.ALStop();
////		}
////
////		// Initialize structure
////		openalSources[index].startTime = time;
////		openalSources[index].chan = chan;
////		openalSources[index].inUse = true;
////		openalSources[index].looping = looping;
////		openalSources[index].stereo = stereo;
////
////		return openalSources[index].handle;
////	} else {
////		return NULL;
////	}
////}
////
/////*
////===================
////idSoundSystemLocal::FreeOpenALSource
////===================
////*/
////void idSoundSystemLocal::FreeOpenALSource( ALuint handle ) {
////	ALsizei i;
////	for ( i = 0; i < openalSourceCount; i++ ) {
////		if ( openalSources[i].handle == handle ) {
////			if ( openalSources[i].chan ) {
////				openalSources[i].chan.openalSource = NULL;
////			}
////#if ID_OPENAL
////			// Reset source EAX ROOM level when freeing stereo source
////			if ( openalSources[i].stereo && alEAXSet ) {
////				long Room = EAXSOURCE_DEFAULTROOM;
////				alEAXSet( &EAXPROPERTYID_EAX_Source, EAXSOURCE_ROOM, openalSources[i].handle, &Room, sizeof(Room));
////			}
////#endif
////			// Initialize structure
////			openalSources[i].startTime = 0;
////			openalSources[i].chan = NULL;
////			openalSources[i].inUse = false;
////			openalSources[i].looping = false;
////			openalSources[i].stereo = false;
////		}
////	}
////}
////
/////*
////============================================================
////SoundFX and misc effects
////============================================================
////*/
////
/////*
////===================
////idSoundSystemLocal::ProcessSample
////===================
////*/
////void SoundFX_Lowpass::ProcessSample( float* in, float* out ) {
////	float c, a1, a2, a3, b1, b2;
////	float resonance = idSoundSystemLocal::s_enviroSuitCutoffQ.GetFloat();
////	float cutoffFrequency = idSoundSystemLocal::s_enviroSuitCutoffFreq.GetFloat();
////
////	Initialize();
////
////	c = 1.0 / idMath::Tan16( idMath::PI * cutoffFrequency / 44100 );
////
////	// compute coefs
////	a1 = 1.0 / ( 1.0 + resonance * c + c * c );
////	a2 = 2* a1;
////	a3 = a1;
////	b1 = 2.0 * ( 1.0 - c * c) * a1;
////	b2 = ( 1.0 - resonance * c + c * c ) * a1;
////
////	// compute output value
////	out[0] = a1 * in[0] + a2 * in[-1] + a3 * in[-2] - b1 * out[-1] - b2 * out[-2];
////}
////
////void SoundFX_LowpassFast::ProcessSample( float* in, float* out ) {
////	// compute output value
////	out[0] = a1 * in[0] + a2 * in[-1] + a3 * in[-2] - b1 * out[-1] - b2 * out[-2];
////}
////
////void SoundFX_LowpassFast::SetParms( float p1, float p2, float p3 ) {
////	float c;
////
////	// set the vars
////	freq = p1;
////	res = p2;
////
////	// precompute the coefs
////	c = 1.0 / idMath::Tan( idMath::PI * freq / 44100 );
////
////	// compute coefs
////	a1 = 1.0 / ( 1.0 + res * c + c * c );
////	a2 = 2* a1;
////	a3 = a1;
////
////	b1 = 2.0 * ( 1.0 - c * c) * a1;
////	b2 = ( 1.0 - res * c + c * c ) * a1;
////}
////
////void SoundFX_Comb::Initialize() {
////	if ( initialized )
////		return;
////
////	initialized = true;
////	maxlen = 50000;
////	buffer = new float[maxlen];
////	currentTime = 0;
////}
////
////void SoundFX_Comb::ProcessSample( float* in, float* out ) {
////	float gain = idSoundSystemLocal::s_reverbFeedback.GetFloat();
////	int len = idSoundSystemLocal::s_reverbTime.GetFloat() + param;
////
////	Initialize();
////
////	// sum up and output
////	out[0] = buffer[currentTime];
////	buffer[currentTime] = buffer[currentTime] * gain + in[0];
////
////	// increment current time
////	currentTime++;
////	if ( currentTime >= len )
////		currentTime -= len;
////}
////
/////*
////===================
////idSoundSystemLocal::DoEnviroSuit
////===================
////*/
////void idSoundSystemLocal::DoEnviroSuit( float* samples, int numSamples, int numSpeakers ) {
////	float out[10000], *out_p = out + 2;
////	float in[10000], *in_p = in + 2;
////
////	assert( !idSoundSystemLocal::useOpenAL );
////
////	if ( !fxList.Num() ) {
////		for ( int i = 0; i < 6; i++ ) {
////			SoundFX* fx;
////
////			// lowpass filter
////			fx = new SoundFX_Lowpass();
////			fx.SetChannel( i );
////			fxList.Append( fx );
////
////			// comb
////			fx = new SoundFX_Comb();
////			fx.SetChannel( i );
////			fx.SetParameter( i * 100 );
////			fxList.Append( fx );
////
////			// comb
////			fx = new SoundFX_Comb();
////			fx.SetChannel( i );
////			fx.SetParameter( i * 100 + 5 );
////			fxList.Append( fx );
////		}
////	}
////
////	for ( int i = 0; i < numSpeakers; i++ ) {
////		int j;
////
////		// restore previous samples
////		memset( in, 0, 10000 * sizeof( float ) );
////		memset( out, 0, 10000 * sizeof( float ) );
////
////		// fx loop
////		for ( int k = 0; k < fxList.Num(); k++ ) {
////			SoundFX* fx = fxList[k];
////
////			// skip if we're not the right channel
////			if ( fx.GetChannel() != i )
////				continue;
////
////			// get samples and continuity
////			fx.GetContinuitySamples( in_p[-1], in_p[-2], out_p[-1], out_p[-2] );
////			for ( j = 0; j < numSamples; j++ ) {
////				in_p[j] = samples[j * numSpeakers + i] * s_enviroSuitVolumeScale.GetFloat();
////			}
////
////			// process fx loop
////			for ( j = 0; j < numSamples; j++ ) {
////				fx.ProcessSample( in_p + j, out_p + j );
////			}
////
////			// store samples and continuity
////			fx.SetContinuitySamples( in_p[numSamples-2], in_p[numSamples-3], out_p[numSamples-2], out_p[numSamples-3] );
////
////			for ( j = 0; j < numSamples; j++ ) {
////				samples[j * numSpeakers + i] = out_p[j];
////			}
////		}
////	}
////}
////
/////*
////=================
////idSoundSystemLocal::PrintMemInfo
////=================
////*/
////void idSoundSystemLocal::PrintMemInfo( MemInfo_t *mi ) {
////	this.soundCache.PrintMemInfo( mi );
////}
////
/////*
////===============
////idSoundSystemLocal::EAXAvailable
////===============
////*/
////int idSoundSystemLocal::IsEAXAvailable( ) {
////#if !ID_OPENAL
////	return -1;
////#else
////	ALCdevice	*device;
////	ALCcontext	*context;
////
////	if ( EAXAvailable != -1 ) {
////		return EAXAvailable;
////	}
////
////	if ( !Sys_LoadOpenAL() ) {
////		EAXAvailable = 2;
////		return 2;
////	}
////	// when dynamically loading the OpenAL subsystem, we need to get a context before alIsExtensionPresent would work
////	device = alcOpenDevice( NULL );
////	context = alcCreateContext( device, NULL );
////	alcMakeContextCurrent( context );
////	if ( alIsExtensionPresent( ID_ALCHAR "EAX4.0" ) ) {
////		alcMakeContextCurrent( NULL );
////		alcDestroyContext( context );
////		alcCloseDevice( device );
////		EAXAvailable = 1;
////		return 1;
////	}
////	alcMakeContextCurrent( NULL );
////	alcDestroyContext( context );
////	alcCloseDevice( device );
////	EAXAvailable = 0;
////	return 0;
////#endif
////}


};
////
////extern	idSoundSystemLocal	soundSystemLocal;
////
////
/*
===================================================================================

  This class holds the actual wavefile bitmap, size, and info.

===================================================================================
*/

var SCACHE_SIZE = MIXBUFFER_SAMPLES*20;	// 1/2 of a second (aroundabout)

class idSoundSample {
////public:
////							idSoundSample();
////							~idSoundSample();
////
	name = new idStr;						// name of the sample file
////	ID_TIME_T		 			timestamp;					// the most recent of all images used in creation, for reloadImages command

	objectInfo = new waveformatex_t;					// what are we caching
	objectSize:number/*int*/;					// size of waveform in samples, excludes the header
	objectMemSize:number/*int*/;				// object size in memory
	nonCacheData:Uint8Array;				// if it's not cached
	amplitudeData:Uint8Array;				// precomputed min,max amplitude pairs
	openalBuffer: number/*ALuint*/;				// openal buffer
	hardwareBuffer:boolean;
	defaultSound:boolean;
	onDemand:boolean;
	purged:boolean;
	levelLoadReferenced:boolean;		// so we can tell which samples aren't needed any more
////
////	int						LengthIn44kHzSamples() const;
////	ID_TIME_T		 			GetNewTimeStamp( ) const;
////	void					MakeDefault();				// turns it into a beep
////	void					Load();						// loads the current sound based on name
////	void					Reload( bool force );		// reloads if timestamp has changed, or always if force
////	void					PurgeSoundSample();			// frees all data
////	void					CheckForDownSample();		// down sample if required
////	bool					FetchFromCache( int offset, const byte **output, int *position, int *size, const bool allowIO );


	
/*
===================
idSoundSample::idSoundSample
===================
*/
constructor() {
	this.objectInfo.memset0 ( );//memset( &objectInfo, 0, sizeof(waveformatex_t) );
	this.objectSize = 0;
	this.objectMemSize = 0;
	this.nonCacheData = null;
	this.amplitudeData = null;
	this.openalBuffer = NULL;
	this.hardwareBuffer = false;
	this.defaultSound = false;
	this.onDemand = false;
	this.purged = false;
this.	levelLoadReferenced = false;
}

/*
===================
idSoundSample::~idSoundSample
===================
*/
destructor():void {
	this.PurgeSoundSample();
}

/*
===================
idSoundSample::LengthIn44kHzSamples
===================
*/
	LengthIn44kHzSamples ( ): number {
		// objectSize is samples
		if ( this.objectInfo.nSamplesPerSec == 11025 ) {
			return this.objectSize << 2;
		} else if ( this.objectInfo.nSamplesPerSec == 22050 ) {
			return this.objectSize << 1;
		} else {
			return this.objectSize << 0;
		}
	}

/////*
////===================
////idSoundSample::MakeDefault
////===================
////*/
////void idSoundSample::MakeDefault( ) {	
////	int		i;
////	float	v;
////	int		sample;
////
////	memset( &this.objectInfo, 0, sizeof( this.objectInfo ) );
////
////	this.objectInfo.nChannels = 1;
////	this.objectInfo.wBitsPerSample = 16;
////	this.objectInfo.nSamplesPerSec = 44100;
////
////	this.objectSize = MIXBUFFER_SAMPLES * 2;
////	objectMemSize = this.objectSize * sizeof( short );
////
////	nonCacheData = (byte *)soundCacheAllocator.Alloc( objectMemSize );
////
////	short *ncd = (short *)nonCacheData;
////
////	for ( i = 0; i < MIXBUFFER_SAMPLES; i ++ ) {
////		v = sin( idMath::PI * 2 * i / 64 );
////		sample = v * 0x4000;
////		ncd[i*2+0] = sample;
////		ncd[i*2+1] = sample;
////	}
////
////	if ( idSoundSystemLocal::useOpenAL ) {
////		alGetError();
////		alGenBuffers( 1, &openalBuffer );
////		if ( alGetError() != AL_NO_ERROR ) {
////			common.Error( "idSoundCache: error generating OpenAL hardware buffer" );
////		}
////		
////		alGetError();
////		alBufferData( openalBuffer, this.objectInfo.nChannels==1?AL_FORMAT_MONO16:AL_FORMAT_STEREO16, nonCacheData, objectMemSize, this.objectInfo.nSamplesPerSec );
////		if ( alGetError() != AL_NO_ERROR ) {
////			common.Error( "idSoundCache: error loading data into OpenAL hardware buffer" );
////		} else {
////			this.hardwareBuffer = true;
////		}
////	}
////
////	defaultSound = true;
////}
////
/////*
////===================
////idSoundSample::CheckForDownSample
////===================
////*/
////void idSoundSample::CheckForDownSample( ) {
////	if ( !idSoundSystemLocal::s_force22kHz.GetBool() ) {
////		return;
////	}
////	if ( this.objectInfo.wFormatTag != WAVE_FORMAT_TAG_PCM || this.objectInfo.nSamplesPerSec != 44100 ) {
////		return;
////	}
////	int shortSamples = this.objectSize >> 1;
////	short *converted = (short *)soundCacheAllocator.Alloc( shortSamples * sizeof( short ) );
////
////	if ( this.objectInfo.nChannels == 1 ) {
////		for ( int i = 0; i < shortSamples; i++ ) {
////			converted[i] = ((short *)nonCacheData)[i*2];
////		}
////	} else {
////		for ( int i = 0; i < shortSamples; i += 2 ) {
////			converted[i+0] = ((short *)nonCacheData)[i*2+0];
////			converted[i+1] = ((short *)nonCacheData)[i*2+1];
////		}
////	}
////	soundCacheAllocator.Free( nonCacheData );
////	nonCacheData = (byte *)converted;
////	this.objectSize >>= 1;
////	objectMemSize >>= 1;
////	this.objectInfo.nAvgBytesPerSec >>= 1;
////	this.objectInfo.nSamplesPerSec >>= 1;
////}
////
/////*
////===================
////idSoundSample::GetNewTimeStamp
////===================
////*/
////ID_TIME_T idSoundSample::GetNewTimeStamp( ) const {
////	ID_TIME_T timestamp;
////
////	fileSystem.ReadFile( name, NULL, &timestamp );
////	if ( timestamp == FILE_NOT_FOUND_TIMESTAMP ) {
////		idStr oggName = name;
////		oggName.SetFileExtension( ".ogg" );
////		fileSystem.ReadFile( oggName, NULL, &timestamp );
////	}
////	return timestamp;
////}

/*
===================
idSoundSample::Load

Loads based on name, possibly doing a MakeDefault if necessary
===================
*/
	Load(): void {
		todoThrow ( );
//	defaultSound = false;
//	this.purged = false;
//	this.hardwareBuffer = false;

//	timestamp = GetNewTimeStamp();

//	if ( timestamp == FILE_NOT_FOUND_TIMESTAMP ) {
//		common.Warning( "Couldn't load sound '%s' using default", name.c_str() );
//		MakeDefault();
//		return;
//	}

//	// load it
//	idWaveFile	fh;
//	waveformatex_t info;

//	if ( fh.Open( name, &info ) == -1 ) {
//		common.Warning( "Couldn't load sound '%s' using default", name.c_str() );
//		MakeDefault();
//		return;
//	}

//	if ( info.nChannels != 1 && info.nChannels != 2 ) {
//		common.Warning( "idSoundSample: %s has %i channels, using default", name.c_str(), info.nChannels );
//		fh.Close();
//		MakeDefault();
//		return;
//	}

//	if ( info.wBitsPerSample != 16 ) {
//		common.Warning( "idSoundSample: %s is %dbits, expected 16bits using default", name.c_str(), info.wBitsPerSample );
//		fh.Close();
//		MakeDefault();
//		return;
//	}

//	if ( info.nSamplesPerSec != 44100 && info.nSamplesPerSec != 22050 && info.nSamplesPerSec != 11025 ) {
//		common.Warning( "idSoundCache: %s is %dHz, expected 11025, 22050 or 44100 Hz. Using default", name.c_str(), info.nSamplesPerSec );
//		fh.Close();
//		MakeDefault();
//		return;
//	}

//	this.objectInfo = info;
//	this.objectSize = fh.GetOutputSize();
//	objectMemSize = fh.GetMemorySize();

//	nonCacheData = (byte *)soundCacheAllocator.Alloc( objectMemSize );
//	fh.Read( nonCacheData, objectMemSize, NULL );

//	// optionally convert it to 22kHz to save memory
//	CheckForDownSample();

//	// create hardware audio buffers 
//	if ( idSoundSystemLocal::useOpenAL ) {
//		// PCM loads directly
//		if ( this.objectInfo.wFormatTag == WAVE_FORMAT_TAG_PCM ) {
//			alGetError();
//			alGenBuffers( 1, &openalBuffer );
//			if ( alGetError() != AL_NO_ERROR )
//				common.Error( "idSoundCache: error generating OpenAL hardware buffer" );
//			if ( alIsBuffer( openalBuffer ) ) {
//				alGetError();
//				alBufferData( openalBuffer, this.objectInfo.nChannels==1?AL_FORMAT_MONO16:AL_FORMAT_STEREO16, nonCacheData, objectMemSize, this.objectInfo.nSamplesPerSec );
//				if ( alGetError() != AL_NO_ERROR ) {
//					common.Error( "idSoundCache: error loading data into OpenAL hardware buffer" );
//				} else {
//					// Compute amplitude block size
//					int blockSize = 512 * this.objectInfo.nSamplesPerSec / 44100 ;

//					// Allocate amplitude data array
//					amplitudeData = (byte *)soundCacheAllocator.Alloc( ( this.objectSize / blockSize + 1 ) * 2 * sizeof( short) );

//					// Creating array of min/max amplitude pairs per blockSize samples
//					var/*int*/i:number;
//					for ( i = 0; i < this.objectSize; i+=blockSize ) {
//						short min = 32767;
//						short max = -32768;

//						int j;
//						for ( j = 0; j < Min( this.objectSize - i, blockSize ); j++ ) {
//							min = ((short *)nonCacheData)[ i + j ] < min ? ((short *)nonCacheData)[ i + j ] : min;
//							max = ((short *)nonCacheData)[ i + j ] > max ? ((short *)nonCacheData)[ i + j ] : max;
//						}

//						((short *)amplitudeData)[ ( i / blockSize ) * 2     ] = min;
//						((short *)amplitudeData)[ ( i / blockSize ) * 2 + 1 ] = max;
//					}

//					this.hardwareBuffer = true;
//				}
//			}
//		} 
		
//		// OGG decompressed at load time (when smaller than s_decompressionLimit seconds, 6 seconds by default)
//		if ( this.objectInfo.wFormatTag == WAVE_FORMAT_TAG_OGG ) {
//#if defined(MACOS_X)
//			if ( ( this.objectSize < ( ( int ) this.objectInfo.nSamplesPerSec * idSoundSystemLocal::s_decompressionLimit.GetInteger() ) ) ) {
//#else
//			if ( ( alIsExtensionPresent( ID_ALCHAR "EAX-RAM" ) == AL_TRUE ) && ( this.objectSize < ( ( int ) this.objectInfo.nSamplesPerSec * idSoundSystemLocal::s_decompressionLimit.GetInteger() ) ) ) {
//#endif
//				alGetError();
//				alGenBuffers( 1, &openalBuffer );
//				if ( alGetError() != AL_NO_ERROR )
//					common.Error( "idSoundCache: error generating OpenAL hardware buffer" );
//				if ( alIsBuffer( openalBuffer ) ) {
//					idSampleDecoder *decoder = idSampleDecoder::Alloc();
//					float *destData = (float *)soundCacheAllocator.Alloc( ( LengthIn44kHzSamples() + 1 ) * sizeof( float ) );
					
//					// Decoder *always* outputs 44 kHz data
//					decoder.Decode( this, 0, LengthIn44kHzSamples(), destData );

//					// Downsample back to original frequency (save memory)
//					if ( this.objectInfo.nSamplesPerSec == 11025 ) {
//						for ( int i = 0; i < this.objectSize; i++ ) {
//							if ( destData[i*4] < -32768.0f )
//								((short *)destData)[i] = -32768;
//							else if ( destData[i*4] > 32767.0f )
//								((short *)destData)[i] = 32767;
//							else
//								((short *)destData)[i] = idMath::FtoiFast( destData[i*4] );
//						}
//					} else if ( this.objectInfo.nSamplesPerSec == 22050 ) {
//						for ( int i = 0; i < this.objectSize; i++ ) {
//							if ( destData[i*2] < -32768.0f )
//								((short *)destData)[i] = -32768;
//							else if ( destData[i*2] > 32767.0f )
//								((short *)destData)[i] = 32767;
//							else
//								((short *)destData)[i] = idMath::FtoiFast( destData[i*2] );
//						}
//					} else {
//						for ( int i = 0; i < this.objectSize; i++ ) {
//							if ( destData[i] < -32768.0f )
//								((short *)destData)[i] = -32768;
//							else if ( destData[i] > 32767.0f )
//								((short *)destData)[i] = 32767;
//							else
//								((short *)destData)[i] = idMath::FtoiFast( destData[i] );
//						}
//					}

//					alGetError();
//					alBufferData( openalBuffer, this.objectInfo.nChannels==1?AL_FORMAT_MONO16:AL_FORMAT_STEREO16, destData, this.objectSize * sizeof( short ), this.objectInfo.nSamplesPerSec );
//					if ( alGetError() != AL_NO_ERROR )
//						common.Error( "idSoundCache: error loading data into OpenAL hardware buffer" );
//					else {
//						// Compute amplitude block size
//						int blockSize = 512 * objectInfo.nSamplesPerSec / 44100 ;

//						// Allocate amplitude data array
//						amplitudeData = (byte *)soundCacheAllocator.Alloc( ( this.objectSize / blockSize + 1 ) * 2 * sizeof( short ) );

//						// Creating array of min/max amplitude pairs per blockSize samples
//						var/*int*/i:number;
//						for ( i = 0; i < this.objectSize; i+=blockSize ) {
//							short min = 32767;
//							short max = -32768;
							
//							int j;
//							for ( j = 0; j < Min( this.objectSize - i, blockSize ); j++ ) {
//								min = ((short *)destData)[ i + j ] < min ? ((short *)destData)[ i + j ] : min;
//								max = ((short *)destData)[ i + j ] > max ? ((short *)destData)[ i + j ] : max;
//							}

//							((short *)amplitudeData)[ ( i / blockSize ) * 2     ] = min;
//							((short *)amplitudeData)[ ( i / blockSize ) * 2 + 1 ] = max;
//						}
						
//						this.hardwareBuffer = true;
//					}

//					soundCacheAllocator.Free( (byte *)destData );
//					idSampleDecoder::Free( decoder );
//				}
//			}
//		}

//		// Free memory if sample was loaded into hardware
//		if ( this.hardwareBuffer ) {
//			soundCacheAllocator.Free( nonCacheData );
//			nonCacheData = NULL;
//		}
//	}

//	fh.Close();
}

/*
===================
idSoundSample::PurgeSoundSample
===================
*/
	PurgeSoundSample ( ): void {
		this.purged = true;

		if ( this.hardwareBuffer && idSoundSystemLocal.useOpenAL ) {
			todoThrow ( );
			//	alGetError ( );
			//	alDeleteBuffers( 1,  & openalBuffer );
			//	if ( alGetError ( ) != AL_NO_ERROR ) {
			//		common.Error( "idSoundCache: error unloading data from OpenAL hardware buffer" );
			//	} else {
			//		openalBuffer = 0;
			//		this.hardwareBuffer = false;
			//	}
			//}

			//if ( amplitudeData ) {
			//	soundCacheAllocator.Free( amplitudeData );
			//	amplitudeData = null;
			//}

			//if ( nonCacheData ) {
			//	soundCacheAllocator.Free( nonCacheData );
			//	nonCacheData = null;
			//}
		}
	}

/////*
////===================
////idSoundSample::Reload
////===================
////*/
////void idSoundSample::Reload( bool force ) {
////	if ( !force ) {
////		ID_TIME_T newTimestamp;
////
////		// check the timestamp
////		newTimestamp = GetNewTimeStamp();
////
////		if ( newTimestamp == FILE_NOT_FOUND_TIMESTAMP ) {
////			if ( !defaultSound ) {
////				common.Warning( "Couldn't load sound '%s' using default", name.c_str() );
////				MakeDefault();
////			}
////			return;
////		}
////		if ( newTimestamp == timestamp ) {
////			return;	// don't need to reload it
////		}
////	}
////
////	common.Printf( "reloading %s\n", name.c_str() );
////	this.PurgeSoundSample();
////	Load();
////}
////
/////*
////===================
////idSoundSample::FetchFromCache
////
////Returns true on success.
////===================
////*/
////bool idSoundSample::FetchFromCache( int offset, const byte **output, int *position, int *size, const bool allowIO ) {
////	offset &= 0xfffffffe;
////
////	if ( this.objectSize == 0 || offset < 0 || offset > this.objectSize * (int)sizeof( short ) || !nonCacheData ) {
////		return false;
////	}
////
////	if ( output ) {
////		*output = nonCacheData + offset;
////	}
////	if ( position ) {
////		*position = 0;
////	}
////	if ( size ) {
////		*size = this.objectSize * sizeof( short ) - offset;
////		if ( *size > SCACHE_SIZE ) {
////			*size = SCACHE_SIZE;
////		}
////	}
////	return true;
////}

}


/*
===================================================================================

  Sound sample decoder.

===================================================================================
*/

class idSampleDecoder {
////public:
////	static void				Init( );
////	static void				Shutdown( );
////	static idSampleDecoder *Alloc( );
////	static void				Free( idSampleDecoder *decoder );
////	static int				GetNumUsedBlocks( );
////	static int				GetUsedBlockMemory( );
////
////	virtual					~idSampleDecoder( ) {}
////	virtual void			Decode( idSoundSample *sample, int sampleOffset44k, int sampleCount44k, float *dest ) = 0;
////	virtual void			ClearDecoder( ) = 0;
////	virtual idSoundSample *	GetSample( ) const = 0;
////	virtual int				GetLastDecodeTime( ) const = 0;


	
/////*
////====================
////idSampleDecoder::Init
////====================
////*/
////void idSampleDecoder::Init( ) {
////	decoderMemoryAllocator.Init();
////	decoderMemoryAllocator.SetLockMemory( true );
////	decoderMemoryAllocator.SetFixedBlocks( idSoundSystemLocal::s_realTimeDecoding.GetBool() ? 10 : 1 );
////}
////
/////*
////====================
////idSampleDecoder::Shutdown
////====================
////*/
////void idSampleDecoder::Shutdown( ) {
////	decoderMemoryAllocator.Shutdown();
////	sampleDecoderAllocator.Shutdown();
////}
////
/*
====================
idSampleDecoder::Alloc
====================
*/
	static Alloc ( ): idSampleDecoder {
		var decoder: idSampleDecoderLocal = sampleDecoderAllocator.Alloc ( );
		decoder.Clear ( );
		return decoder;
	}

/////*
////====================
////idSampleDecoder::Free
////====================
////*/
////void idSampleDecoder::Free( idSampleDecoder *decoder ) {
////	idSampleDecoderLocal *localDecoder = static_cast<idSampleDecoderLocal *>( decoder );
////	localDecoder.ClearDecoder();
////	sampleDecoderAllocator.Free( localDecoder );
////}
////
/////*
////====================
////idSampleDecoder::GetNumUsedBlocks
////====================
////*/
////int idSampleDecoder::GetNumUsedBlocks( ) {
////	return decoderMemoryAllocator.GetNumUsedBlocks();
////}
////
/////*
////====================
////idSampleDecoder::GetUsedBlockMemory
////====================
////*/
////int idSampleDecoder::GetUsedBlockMemory( ) {
////	return decoderMemoryAllocator.GetUsedBlockMemory();
////}
////
};


////
////#endif /* !__SND_LOCAL_H__ */
