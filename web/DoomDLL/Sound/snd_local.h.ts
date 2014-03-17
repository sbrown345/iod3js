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
////// demo sound commands
////typedef enum {
////	SCMD_STATE,				// followed by a load game state
////	SCMD_PLACE_LISTENER,
////	SCMD_ALLOC_EMITTER,
////
////	SCMD_FREE,
////	SCMD_UPDATE,
////	SCMD_START,
////	SCMD_MODIFY,
////	SCMD_STOP,
////	SCMD_FADE
////} soundDemoCommand_t;

var SOUND_MAX_CHANNELS		= 8;
var SOUND_DECODER_FREE_DELAY	= 1000 * MIXBUFFER_SAMPLES / USERCMD_MSEC;		// four seconds

var  PRIMARYFREQ				= 44100;			// samples per second
var  SND_EPSILON				= 1.0 / 32768.0;	// if volume is below this, it will always multiply to zero

////const int ROOM_SLICES_IN_BUFFER		= 10;
////
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
	wFormatTag:number/*word*/;        /* format type */
	nChannels:number/*word*/;         /* number of channels (i.e. mono, stereo...) */
	nSamplesPerSec:number/*dword*/;    /* sample rate */
	nAvgBytesPerSec:number/*dword*/;   /* for buffer estimation */
	nBlockAlign:number/*word*/;       /* block size of data */
	wBitsPerSample:number/*word*/;    /* Number of bits per sample of mono data */
	cbSize:number/*word*/;            /* The count in bytes of the size of
////                                    extra information (after cbSize) */
}// PACKED;
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
////
////
/////*
////===================================================================================
////
////idAudioHardware
////
////===================================================================================
////*/
////
////class idAudioHardware {
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
////};
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


////class SoundFX {
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
////};
////
////class SoundFX_Lowpass extends SoundFX {
////public:
////	virtual void		ProcessSample( float* in, float* out );
////};
////
////class SoundFX_LowpassFast extends SoundFX {
////	float				freq;
////	float				res;
////	float				a1, a2, a3;
////	float				b1, b2;
////
////public:
////	virtual void		ProcessSample( float* in, float* out );
////	void				SetParms( float p1 = 0, float p2 = 0, float p3 = 0 );
////};
////
////class SoundFX_Comb extends SoundFX {
////	int					currentTime;
////
////public:
////	virtual void		Initialize();
////	virtual void		ProcessSample( float* in, float* out );
////};
////
////class FracTime {
////public:
////	int			time;
////	float		frac;
////
////	void		Set( int val )					{ time = val; frac = 0; };
////	void		Increment( float val )			{ frac += val; while ( frac >= 1.f ) { time++; frac--; } };
////};
////
////enum {
////	PLAYBACK_RESET,
////	PLAYBACK_ADVANCING
////};
////
////class idSoundChannel;
////
////class idSlowChannel {
////	bool					active;
////	const idSoundChannel*	chan;
////
////	int						playbackState;
////	int						triggerOffset;
////
////	FracTime				newPosition;
////	int						newSampleOffset;
////
////	FracTime				curPosition;
////	int						curSampleOffset;
////
////	SoundFX_LowpassFast		lowpass;
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
////	bool					IsActive()				{ return active; };
////	FracTime				GetCurrentPosition()	{ return curPosition; };
////};


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
////typedef struct soundPortalTrace_s {
////	int		portalArea;
////	const struct soundPortalTrace_s	*prevStack;
////} soundPortalTrace_t;
////
class idSoundWorldLocal extends idSoundWorld {
////public:
////	virtual					~idSoundWorldLocal( );
////
	// call at each map start
	ClearAllSoundEmitters(  ):void { throw "placeholder"; }
	StopAllSounds(  ):void { throw "placeholder"; }
////
////	// get a new emitter that can play sounds in this world
////	virtual idSoundEmitter *AllocSoundEmitter( );
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
	IsPaused ( ): boolean { throw "placeholder"; }
////
////	// avidump
////	virtual void			AVIOpen( const char *path, const char *name );
	AVIClose ( ): void { throw "placeholder"; }
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
	Init ( rw: idRenderWorld ): void { throw "placeholder"; }
////	void					ClearBuffer( );
////
////	// update
////	void					ForegroundUpdate( int currentTime );
////	void					OffsetSoundTime( int offset44kHz );
////
////	idSoundEmitterLocal *	AllocLocalSoundEmitter();
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
	enviroSuitActive:boolean;
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
	SetMute ( mute: boolean ): void { throw "placeholder"; }
////
////	virtual cinData_t		ImageForTime( const int milliseconds, const bool waveform );
////
////	int						GetSoundDecoderInfo( int index, soundDecoderInfo_t &decoderInfo );
////
		// if rw == NULL, no portal occlusion or rendered debugging is available
		AllocSoundWorld( rw :idRenderWorld ):idSoundWorld { throw "placeholder"; }
////
////	// specifying NULL will cause silence to be played
////	virtual void			SetPlayingSoundWorld( idSoundWorld *soundWorld );
////
////	// some tools, like the sound dialog, may be used in both the game and the editor
////	// This can return NULL, so check!
////	virtual idSoundWorld	*GetPlayingSoundWorld( );
////
	BeginLevelLoad( ):void { throw "placeholder"; }
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
////	idAudioHardware *		snd_audio_hw;
	soundCache: idSoundCache;
////
////	idSoundWorldLocal *		currentSoundWorld;	// the one to mix each async tic
////
////	int						olddwCurrentWritePos;	// statistics
////	int						buffers;				// statistics
////	int						CurrentSoundTime;		// set by the async thread and only used by the main thread
////
////	unsigned int			nextWriteBlock;
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
	static s_skipHelltimeFX:idCVar;
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
////	byte *					nonCacheData;				// if it's not cached
////	byte *					amplitudeData;				// precomputed min,max amplitude pairs
////	ALuint					openalBuffer;				// openal buffer
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
};


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
};


////
////#endif /* !__SND_LOCAL_H__ */
