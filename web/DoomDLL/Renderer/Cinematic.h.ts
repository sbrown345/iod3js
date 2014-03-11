///*
//===========================================================================
//
//Doom 3 GPL Source Code
//Copyright (C) 1999-2011 id Software LLC, a ZeniMax Media company. 
//
//This file is part of the Doom 3 GPL Source Code (?Doom 3 Source Code?).  
//
//Doom 3 Source Code is free software: you can redistribute it and/or modify
//it under the terms of the GNU General Public License as published by
//the Free Software Foundation, either version 3 of the License, or
//(at your option) any later version.
//
//Doom 3 Source Code is distributed in the hope that it will be useful,
//but WITHOUT ANY WARRANTY; without even the implied warranty of
//MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//GNU General Public License for more details.
//
//You should have received a copy of the GNU General Public License
//along with Doom 3 Source Code.  If not, see <http://www.gnu.org/licenses/>.
//
//In addition, the Doom 3 Source Code is also subject to certain additional terms. You should have received a copy of these additional terms immediately following the terms and conditions of the GNU General Public License which accompanied the Doom 3 Source Code.  If not, please request a copy in writing from id Software at the address below.
//
//If you have questions concerning this license or the applicable additional terms, you may contact in writing id Software LLC, c/o ZeniMax Media Inc., Suite 120, Rockville, Maryland 20850 USA.
//
//===========================================================================
//*/
//
//#ifndef __CINEMATIC_H__
//#define __CINEMATIC_H__

/*
===============================================================================

	RoQ cinematic

	Multiple idCinematics can run simultaniously.
	A single idCinematic can be reused for multiple files if desired.

===============================================================================
*/

// cinematic states
enum cinStatus_t{
	FMV_IDLE,
	FMV_PLAY,			// play
	FMV_EOF,			// all other conditions, i.e. stop/EOF/abort
	FMV_ID_BLT,
	FMV_ID_IDLE,
	FMV_LOOPED,
	FMV_ID_WAIT
};

// a cinematic stream generates an image buffer, which the caller will upload to a texture
//typedef struct {
//	int					imageWidth, imageHeight;	// will be a power of 2
//	const byte *		image;						// RGBA format, alpha will be 255
//	int					status;
//} cinData_t;
//
class idCinematic {
//public:
//	// initialize cinematic play back data
//	static void			InitCinematic( void );
//
//	// shutdown cinematic play back data
//	static void			ShutdownCinematic( void );
//
//	// allocates and returns a private subclass that implements the methods
//	// This should be used instead of new
	//static Alloc ( ): idCinematic { throw "placeholder"; }
//
//	// frees all allocated memory
//	virtual				~idCinematic();
//
//	// returns false if it failed to load
//	virtual bool		InitFromFile( const char *qpath, bool looping );
	//InitFromFile ( qpath: string, looping: boolean ): boolean { throw "placeholder"; }
//
//	// returns the length of the animation in milliseconds
//	virtual int			AnimationLength();
//
//	// the pointers in cinData_t will remain valid until the next UpdateForTime() call
//	virtual cinData_t	ImageForTime( int milliseconds );
//
//	// closes the file and frees all allocated memory
//	virtual void		Close();
//
//	// closes the file and frees all allocated memory
//	virtual void		ResetTime(/*int*/time:number);

	///*
	//==============
	//idCinematicLocal::InitCinematic
	//==============
	//*/
	//void idCinematic::InitCinematic( void ) {
	//	float t_ub,t_vr,t_ug,t_vg;
	//	long i;
	//
	//	// generate YUV tables
	//	t_ub = (1.77200f/2.0f) * (float)(1<<6) + 0.5f;
	//	t_vr = (1.40200f/2.0f) * (float)(1<<6) + 0.5f;
	//	t_ug = (0.34414f/2.0f) * (float)(1<<6) + 0.5f;
	//	t_vg = (0.71414f/2.0f) * (float)(1<<6) + 0.5f;
	//	for( i = 0; i < 256; i++ ) {
	//		float x = (float)(2 * i - 255);
	//	
	//		ROQ_UB_tab[i] = (long)( ( t_ub * x) + (1<<5));
	//		ROQ_VR_tab[i] = (long)( ( t_vr * x) + (1<<5));
	//		ROQ_UG_tab[i] = (long)( (-t_ug * x)		 );
	//		ROQ_VG_tab[i] = (long)( (-t_vg * x) + (1<<5));
	//		ROQ_YY_tab[i] = (long)( (i << 6) | (i >> 2) );
	//	}
	//
	//	file = (byte *)Mem_Alloc( 65536 );
	//	vq2 = (word *)Mem_Alloc( 256*16*4 * sizeof( word ) );
	//	vq4 = (word *)Mem_Alloc( 256*64*4 * sizeof( word ) );
	//	vq8 = (word *)Mem_Alloc( 256*256*4 * sizeof( word ) );
	//}

	///*
	//==============
	//idCinematicLocal::ShutdownCinematic
	//==============
	//*/
	//void idCinematic::ShutdownCinematic( void ) {
	//	Mem_Free( file );
	//	file = NULL;
	//	Mem_Free( vq2 );
	//	vq2 = NULL;
	//	Mem_Free( vq4 );
	//	vq4 = NULL;
	//	Mem_Free( vq8 );
	//	vq8 = NULL;
	//}
	//
	/*
	==============
	idCinematicLocal::Alloc
	==============
	*/
	static Alloc(): idCinematic {
		return new idCinematicLocal;
	}

	///*
	//==============
	//idCinematicLocal::~idCinematic
	//==============
	//*/
	//idCinematic::~idCinematic( ) {
	//	Close();
	//}
	//
	/*
	==============
	idCinematicLocal::InitFromFile
	==============
	*/
	InitFromFile(qpath: string, looping: boolean): boolean {
		return false;
	}

///*
//==============
//idCinematicLocal::AnimationLength
//==============
//*/
//int idCinematic::AnimationLength() {
//	return 0;
//}
//
///*
//==============
//idCinematicLocal::ResetTime
//==============
//*/
//void idCinematic::ResetTime(int milliseconds) {
//}
//
///*
//==============
//idCinematicLocal::ImageForTime
//==============
//*/
//cinData_t idCinematic::ImageForTime( int milliseconds ) {
//	cinData_t c;
//	memset( &c, 0, sizeof( c ) );
//	return c;
//}
//
///*
//==============
//idCinematicLocal::Close
//==============
//*/
//void idCinematic::Close() {
//}
//

};
//
///*
//===============================================
//
//	Sound meter.
//
//===============================================
//*/
//
//class idSndWindow extends idCinematic {
//public:
//	
//						idSndWindow() { showWaveform = false; }
//						~idSndWindow() {}
//
//	bool				InitFromFile( const char *qpath, bool looping );
//	cinData_t			ImageForTime( int milliseconds );
//	int					AnimationLength();
//
//private:
//	bool				showWaveform;
//};
//
//#endif /* !__CINEMATIC_H__ */
