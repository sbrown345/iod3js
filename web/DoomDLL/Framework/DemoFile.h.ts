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
//#ifndef __DEMOFILE_H__
//#define __DEMOFILE_H__

/*
===============================================================================

	Demo file

===============================================================================
*/

enum demoSystem_t{
	DS_FINISHED,
	DS_RENDER,
	DS_SOUND,
	DS_VERSION
};

class idDemoFile extends idFile {
//public:
//					idDemoFile();
//					~idDemoFile();
//
//	const char *	GetName( void ) { return (f?f->GetName():""); }
//	const char *	GetFullPath( void ) { return (f?f->GetFullPath():""); }
//
//	void			SetLog( bool b, const char *p );
//	void			Log( const char *p );
//	bool			OpenForReading( const char *fileName );
//	bool			OpenForWriting( const char *fileName );
//	void			Close();
//
//	const char *	ReadHashString();
//	void			WriteHashString( const char *str );
//
//	void			ReadDict( idDict &dict );
//	void			WriteDict( const idDict &dict );
//
//	int				Read( void *buffer, int len );
//	int				Write( const void *buffer, int len );
//
//private:
//	static idCompressor *AllocCompressor( int type );
//
//	bool			writing;
//	byte *			fileImage;
//	idFile *		f;
//	idCompressor *	compressor;
//
//	idList<idStr*>	demoStrings;
//	idFile *		fLog;
//	bool			log;
//	idStr			logStr;
//
	static com_logDemos = new idCVar (  "com_logDemos", "0", CVAR_SYSTEM | CVAR_BOOL, "Write demo.log with debug information in it" );
	static com_compressDemos = new idCVar (  "com_compressDemos", "1", CVAR_SYSTEM | CVAR_INTEGER | CVAR_ARCHIVE, "Compression scheme for demo files\n0: None     = new idCVar ( Fast, large files)\n1: LZW      = new idCVar ( Fast to compress, Fast to decompress, medium/small files)\n2: LZSS     = new idCVar ( Slow to compress, Fast to decompress, small files)\n3: Huffman  = new idCVar ( Fast to compress, Slow to decompress, medium files)\nSee also: The 'CompressDemo' command" );
	static com_preloadDemos = new idCVar (  "com_preloadDemos", "0", CVAR_SYSTEM | CVAR_BOOL | CVAR_ARCHIVE, "Load the whole demo in to RAM before running it" );
};
//
//#endif /* !__DEMOFILE_H__ */
