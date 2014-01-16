var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="files.ts" />
/// <reference path="../../libs/idLib/Containers/HashIndex.h.ts" />
/// <reference path="../../libs/idLib/Text/Str.h.ts" />
/// <reference path="../../libs/idLib/Containers/StrList.h.ts" />
/*
===========================================================================

Doom 3 GPL Source Code
Copyright (C) 1999-2011 id Software LLC, a ZeniMax Media company.

This file is part of the Doom 3 GPL Source Code (?Doom 3 Source Code?).

Doom 3 Source Code is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Doom 3 Source Code is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with Doom 3 Source Code.  If not, see <http://www.gnu.org/licenses/>.

In addition, the Doom 3 Source Code is also subject to certain additional terms. You should have received a copy of these additional terms immediately following the terms and conditions of the GNU General Public License which accompanied the Doom 3 Source Code.  If not, please request a copy in writing from id Software at the address below.

If you have questions concerning this license or the applicable additional terms, you may contact in writing id Software LLC, c/o ZeniMax Media Inc., Suite 120, Rockville, Maryland 20850 USA.

===========================================================================
*/
////#include "../idlib/precompiled.h"
////#pragma hdrstop
////
////#include "Unzip.h"
////
////#ifdef WIN32
////	#include <io.h>	// for _read
////#else
////	#if !__MACH__ && __MWERKS__
////		#include <types.h>
////		#include <stat.h>
////	#else
////		#include <sys/types.h>
////		#include <sys/stat.h>
////	#endif
////	#include <unistd.h>
////#endif
////
////#if ID_ENABLE_CURL
////	#include "../curl/include/curl/curl.h"
////#endif
////
/////*
////=============================================================================
////
////DOOM FILESYSTEM
////
////All of Doom's data access is through a hierarchical file system, but the contents of
////the file system can be transparently merged from several sources.
////
////A "relativePath" is a reference to game file data, which must include a terminating zero.
////"..", "\\", and ":" are explicitly illegal in qpaths to prevent any references
////outside the Doom directory system.
////
////The "base path" is the path to the directory holding all the game directories and
////usually the executable. It defaults to the current directory, but can be overridden
////with "+set fs_basepath c:\doom" on the command line. The base path cannot be modified
////at all after startup.
////
////The "save path" is the path to the directory where game files will be saved. It defaults
////to the base path, but can be overridden with a "+set fs_savepath c:\doom" on the
////command line. Any files that are created during the game (demos, screenshots, etc.) will
////be created reletive to the save path.
////
////The "cd path" is the path to an alternate hierarchy that will be searched if a file
////is not located in the base path. A user can do a partial install that copies some
////data to a base path created on their hard drive and leave the rest on the cd. It defaults
////to the current directory, but it can be overridden with "+set fs_cdpath g:\doom" on the
////command line.
////
////The "dev path" is the path to an alternate hierarchy where the editors and tools used
////during development (Radiant, AF editor, dmap, runAAS) will write files to. It defaults to
////the cd path, but can be overridden with a "+set fs_devpath c:\doom" on the command line.
////
////If a user runs the game directly from a CD, the base path would be on the CD. This
////should still function correctly, but all file writes will fail (harmlessly).
////
////The "base game" is the directory under the paths where data comes from by default, and
////can be either "base" or "demo".
////
////The "current game" may be the same as the base game, or it may be the name of another
////directory under the paths that should be searched for files before looking in the base
////game. The game directory is set with "+set fs_game myaddon" on the command line. This is
////the basis for addons.
////
////No other directories outside of the base game and current game will ever be referenced by
////filesystem functions.
////
////To save disk space and speed up file loading, directory trees can be collapsed into zip
////files. The files use a ".pk4" extension to prevent users from unzipping them accidentally,
////but otherwise they are simply normal zip files. A game directory can have multiple zip
////files of the form "pak0.pk4", "pak1.pk4", etc. Zip files are searched in decending order
////from the highest number to the lowest, and will always take precedence over the filesystem.
////This allows a pk4 distributed as a patch to override all existing data.
////
////Because we will have updated executables freely available online, there is no point to
////trying to restrict demo / oem versions of the game with code changes. Demo / oem versions
////should be exactly the same executables as release versions, but with different data that
////automatically restricts where game media can come from to prevent add-ons from working.
////
////After the paths are initialized, Doom will look for the product.txt file. If not found
////and verified, the game will run in restricted mode. In restricted mode, only files
////contained in demo/pak0.pk4 will be available for loading, and only if the zip header is
////verified to not have been modified. A single exception is made for DoomConfig.cfg. Files
////can still be written out in restricted mode, so screenshots and demos are allowed.
////Restricted mode can be tested by setting "+set fs_restrict 1" on the command line, even
////if there is a valid product.txt under the basepath or cdpath.
////
////If the "fs_copyfiles" cvar is set to 1, then every time a file is sourced from the cd
////path, it will be copied over to the save path. This is a development aid to help build
////test releases and to copy working sets of files.
////
////If the "fs_copyfiles" cvar is set to 2, any file found in fs_cdpath that is newer than
////it's fs_savepath version will be copied to fs_savepath (in addition to the fs_copyfiles 1
////behaviour).
////
////If the "fs_copyfiles" cvar is set to 3, files from both basepath and cdpath will be copied
////over to the save path. This is useful when copying working sets of files mainly from base
////path with an additional cd path (which can be a slower network drive for instance).
////
////If the "fs_copyfiles" cvar is set to 4, files that exist in the cd path but NOT the base path
////will be copied to the save path
////
////NOTE: fs_copyfiles and case sensitivity. On fs_caseSensitiveOS 0 filesystems ( win32 ), the
////copied files may change casing when copied over.
////
////The relative path "sound/newstuff/test.wav" would be searched for in the following places:
////
////for save path, dev path, base path, cd path:
////	for current game, base game:
////		search directory
////		search zip files
////
////downloaded files, to be written to save path + current game's directory
////
////The filesystem can be safely shutdown and reinitialized with different
////basedir / cddir / game combinations, but all other subsystems that rely on it
////(sound, video) must also be forced to restart.
////
////
////"fs_caseSensitiveOS":
////This cvar is set on operating systems that use case sensitive filesystems (Linux and OSX)
////It is a common situation to have the media reference filenames, whereas the file on disc
////only matches in a case-insensitive way. When "fs_caseSensitiveOS" is set, the filesystem
////will always do a case insensitive search.
////IMPORTANT: This only applies to files, and not to directories. There is no case-insensitive
////matching of directories. All directory names should be lowercase, when "com_developer" is 1,
////the filesystem will warn when it catches bad directory situations (regardless of the
////"fs_caseSensitiveOS" setting)
////When bad casing in directories happen and "fs_caseSensitiveOS" is set, BuildOSPath will
////attempt to correct the situation by forcing the path to lowercase. This assumes the media
////is stored all lowercase.
////
////"additional mod path search":
////fs_game_base can be used to set an additional search path
////in search order, fs_game, fs_game_base, BASEGAME
////for instance to base a mod of D3 + D3XP assets, fs_game mymod, fs_game_base d3xp
////
////=============================================================================
////*/
////
////
////
////// define to fix special-cases for GetPackStatus so that files that shipped in
////// the wrong place for Doom 3 don't break pure servers.
////#define DOOM3_PURE_SPECIAL_CASES
////
////typedef bool (*pureExclusionFunc_t)( const struct pureExclusion_s &excl, int l, const idStr &name );
////
////typedef struct pureExclusion_s {
////	int					nameLen;
////	int					extLen;
////	const char *		name;
////	const char *		ext;
////	pureExclusionFunc_t	func;
////} pureExclusion_t;
////
////bool excludeExtension( const pureExclusion_t &excl, int l, const idStr &name ) {
////	if ( l > excl.extLen && !idStr::Icmp( name.c_str() + l - excl.extLen, excl.ext ) ) {
////		return true;
////	}
////	return false;
////}
////
////bool excludePathPrefixAndExtension( const pureExclusion_t &excl, int l, const idStr &name ) {
////	if ( l > excl.nameLen && !idStr::Icmp( name.c_str() + l - excl.extLen, excl.ext ) && !name.IcmpPrefixPath( excl.name ) ) {
////		return true;
////	}
////	return false;
////}
////
////bool excludeFullName( const pureExclusion_t &excl, int l, const idStr &name ) {
////	if ( l == excl.nameLen && !name.Icmp( excl.name ) ) {
////		return true;
////	}
////	return false;
////}
////
////static pureExclusion_t pureExclusions[] = {
////	{ 0,	0,	NULL,											"/",		excludeExtension },
////	{ 0,	0,	NULL,											"\\",		excludeExtension },
////	{ 0,	0,	NULL,											".pda",		excludeExtension },
////	{ 0,	0,	NULL,											".gui",		excludeExtension },
////	{ 0,	0,	NULL,											".pd",		excludeExtension },
////	{ 0,	0,	NULL,											".lang",	excludeExtension },
////	{ 0,	0,	"sound/VO",										".ogg",		excludePathPrefixAndExtension },
////	{ 0,	0,	"sound/VO",										".wav",		excludePathPrefixAndExtension },
////#if	defined DOOM3_PURE_SPECIAL_CASES
////	// add any special-case files or paths for pure servers here
////	{ 0,	0,	"sound/ed/marscity/vo_intro_cutscene.ogg",		NULL,		excludeFullName },
////	{ 0,	0,	"sound/weapons/soulcube/energize_01.ogg",		NULL,		excludeFullName },
////	{ 0,	0,	"sound/xian/creepy/vocal_fx",					".ogg",		excludePathPrefixAndExtension },
////	{ 0,	0,	"sound/xian/creepy/vocal_fx",					".wav",		excludePathPrefixAndExtension },
////	{ 0,	0,	"sound/feedback",								".ogg",		excludePathPrefixAndExtension },
////	{ 0,	0,	"sound/feedback",								".wav",		excludePathPrefixAndExtension },
////	{ 0,	0,	"guis/assets/mainmenu/chnote.tga",				NULL,		excludeFullName },
////	{ 0,	0,	"sound/levels/alphalabs2/uac_better_place.ogg",	NULL,		excludeFullName },
////	{ 0,	0,	"textures/bigchars.tga",						NULL,		excludeFullName },
////	{ 0,	0,	"dds/textures/bigchars.dds",					NULL,		excludeFullName },
////	{ 0,	0,	"fonts",										".tga",		excludePathPrefixAndExtension },
////	{ 0,	0,	"dds/fonts",									".dds",		excludePathPrefixAndExtension },
////	{ 0,	0,	"default.cfg",									NULL,		excludeFullName },
////	// russian zpak001.pk4
////	{ 0,	0,  "fonts",										".dat",		excludePathPrefixAndExtension },
////	{ 0,	0,	"guis/temp.guied",								NULL,		excludeFullName },
////#endif
////	{ 0,	0,	NULL,											NULL,		NULL }
////};
////
////// ensures that lengths for pure exclusions are correct
////class idInitExclusions {
////public:
////	idInitExclusions() {
////		for ( int i = 0; pureExclusions[i].func != NULL; i++ ) {
////			if ( pureExclusions[i].name ) {
////				pureExclusions[i].nameLen = idStr::Length( pureExclusions[i].name );
////			}
////			if ( pureExclusions[i].ext ) {
////				pureExclusions[i].extLen = idStr::Length( pureExclusions[i].ext );
////			}
////		}
////	}
////};
////
////static idInitExclusions	initExclusions;
////
////#define MAX_ZIPPED_FILE_NAME	2048
////#define FILE_HASH_SIZE			1024
////
////typedef struct fileInPack_s {
////	idStr				name;						// name of the file
////	unsigned long		pos;						// file info position in zip
////	struct fileInPack_s * next;						// next file in the hash
////} fileInPack_t;
////
////typedef enum {
////	BINARY_UNKNOWN = 0,
////	BINARY_YES,
////	BINARY_NO
////} binaryStatus_t;
////
////typedef enum {
////	PURE_UNKNOWN = 0,	// need to run the pak through GetPackStatus
////	PURE_NEUTRAL,	// neutral regarding pureness. gets in the pure list if referenced
////	PURE_ALWAYS,	// always referenced - for pak* named files, unless NEVER
////	PURE_NEVER		// VO paks. may be referenced, won't be in the pure lists
////} pureStatus_t;
////
////typedef struct {
////	idList<int>			depends;
////	idList<idDict *>	mapDecls;
////} addonInfo_t;
////
////typedef struct {
////	idStr				pakFilename;				// c:\doom\base\pak0.pk4
////	unzFile				handle;
////	int					checksum;
////	int					numfiles;
////	int					length;
////	bool				referenced;
////	binaryStatus_t		binary;
////	bool				addon;						// this is an addon pack - addon_search tells if it's 'active'
////	bool				addon_search;				// is in the search list
////	addonInfo_t			*addon_info;
////	pureStatus_t		pureStatus;
////	bool				isNew;						// for downloaded paks
////	fileInPack_t		*hashTable[FILE_HASH_SIZE];
////	fileInPack_t		*buildBuffer;
////} pack_t;
////
////typedef struct {
////	idStr				path;						// c:\doom
////	idStr				gamedir;					// base
////} directory_t;
////
////typedef struct searchpath_s {
////	pack_t *			pack;						// only one of pack / dir will be non NULL
////	directory_t *		dir;
////	struct searchpath_s *next;
////} searchpath_t;
////
////// search flags when opening a file
////#define FSFLAG_SEARCH_DIRS		( 1 << 0 )
////#define FSFLAG_SEARCH_PAKS		( 1 << 1 )
////#define FSFLAG_PURE_NOREF		( 1 << 2 )
////#define FSFLAG_BINARY_ONLY		( 1 << 3 )
////#define FSFLAG_SEARCH_ADDONS	( 1 << 4 )
////
////// 3 search path (fs_savepath fs_basepath fs_cdpath)
////// + .jpg and .tga
////#define MAX_CACHED_DIRS 6
////
////// how many OSes to handle game paks for ( we don't have to know them precisely )
////#define MAX_GAME_OS	6
////#define BINARY_CONFIG "binary.conf"
////#define ADDON_CONFIG "addon.conf"
////
var idDEntry = (function (_super) {
    __extends(idDEntry, _super);
    function idDEntry() {
        _super.apply(this, arguments);
    }
    return idDEntry;
})(idStrList);
;

////
var idFileSystemLocal = (function (_super) {
    __extends(idFileSystemLocal, _super);
    function idFileSystemLocal() {
        _super.apply(this, arguments);
    }
    ////public:
    ////							idFileSystemLocal( void );
    ////
    ////	virtual void			Init( void );
    ////	virtual void			StartBackgroundDownloadThread( void );
    ////	virtual void			Restart( void );
    ////	virtual void			Shutdown( bool reloading );
    ////	virtual bool			IsInitialized( void ) const;
    ////	virtual bool			PerformingCopyFiles( void ) const;
    ////	virtual idModList *		ListMods( void );
    ////	virtual void			FreeModList( idModList *modList );
    ////	virtual idFileList *	ListFiles( const char *relativePath, const char *extension, bool sort = false, bool fullRelativePath = false, const char* gamedir = NULL );
    ////	virtual idFileList *	ListFilesTree( const char *relativePath, const char *extension, bool sort = false, const char* gamedir = NULL );
    ////	virtual void			FreeFileList( idFileList *fileList );
    ////	virtual const char *	OSPathToRelativePath( const char *OSPath );
    ////	virtual const char *	RelativePathToOSPath( const char *relativePath, const char *basePath );
    ////	virtual const char *	BuildOSPath( const char *base, const char *game, const char *relativePath );
    ////	virtual void			CreateOSPath( const char *OSPath );
    ////	virtual bool			FileIsInPAK( const char *relativePath );
    ////	virtual void			UpdatePureServerChecksums( void );
    ////	virtual bool			UpdateGamePakChecksums( void );
    ////	virtual fsPureReply_t	SetPureServerChecksums( const int pureChecksums[ MAX_PURE_PAKS ], int gamePakChecksum, int missingChecksums[ MAX_PURE_PAKS ], int *missingGamePakChecksum );
    ////	virtual void			GetPureServerChecksums( int checksums[ MAX_PURE_PAKS ], int OS, int *gamePakChecksum );
    ////	virtual void			SetRestartChecksums( const int pureChecksums[ MAX_PURE_PAKS ], int gamePakChecksum );
    ////	virtual	void			ClearPureChecksums( void );
    ////	virtual int				GetOSMask( void );
    ////	virtual int				ReadFile( const char *relativePath, void **buffer, ID_TIME_T *timestamp );
    ////	virtual void			FreeFile( void *buffer );
    ////	virtual int				WriteFile( const char *relativePath, const void *buffer, int size, const char *basePath = "fs_savepath" );
    ////	virtual void			RemoveFile( const char *relativePath );
    ////	virtual idFile *		OpenFileReadFlags( const char *relativePath, int searchFlags, pack_t **foundInPak = NULL, bool allowCopyFiles = true, const char* gamedir = NULL );
    ////	virtual idFile *		OpenFileRead( const char *relativePath, bool allowCopyFiles = true, const char* gamedir = NULL );
    ////	virtual idFile *		OpenFileWrite( const char *relativePath, const char *basePath = "fs_savepath" );
    ////	virtual idFile *		OpenFileAppend( const char *relativePath, bool sync = false, const char *basePath = "fs_basepath"   );
    ////	virtual idFile *		OpenFileByMode( const char *relativePath, fsMode_t mode );
    ////	virtual idFile *		OpenExplicitFileRead( const char *OSPath );
    ////	virtual idFile *		OpenExplicitFileWrite( const char *OSPath );
    ////	virtual void			CloseFile( idFile *f );
    ////	virtual void			BackgroundDownload( backgroundDownload_t *bgl );
    ////	virtual void			ResetReadCount( void ) { readCount = 0; }
    ////	virtual void			AddToReadCount( int c ) { readCount += c; }
    ////	virtual int				GetReadCount( void ) { return readCount; }
    ////	virtual void			FindDLL( const char *basename, char dllPath[ MAX_OSPATH ], bool updateChecksum );
    ////	virtual void			ClearDirCache( void );
    ////	virtual bool			HasD3XP( void );
    ////	virtual bool			RunningD3XP( void );
    ////	virtual void			CopyFile( const char *fromOSPath, const char *toOSPath );
    ////	virtual int				ValidateDownloadPakForChecksum( int checksum, char path[ MAX_STRING_CHARS ], bool isBinary );
    ////	virtual idFile *		MakeTemporaryFile( void );
    ////	virtual int				AddZipFile( const char *path );
    ////	virtual findFile_t		FindFile( const char *path, bool scheduleAddons );
    ////	virtual int				GetNumMaps();
    ////	virtual const idDict *	GetMapDecl( int i );
    ////	virtual void			FindMapScreenshot( const char *path, char *buf, int len );
    ////	virtual bool			FilenameCompare( const char *s1, const char *s2 ) const;
    ////
    ////	static void				Dir_f( const idCmdArgs &args );
    ////	static void				DirTree_f( const idCmdArgs &args );
    ////	static void				Path_f( const idCmdArgs &args );
    ////	static void				TouchFile_f( const idCmdArgs &args );
    ////	static void				TouchFileList_f( const idCmdArgs &args );
    ////
    ////private:
    ////	friend dword 			BackgroundDownloadThread( void *parms );
    ////
    ////	searchpath_t *			searchPaths;
    ////	int						readCount;			// total bytes read
    ////	int						loadCount;			// total files read
    ////	int						loadStack;			// total files in memory
    ////	idStr					gameFolder;			// this will be a single name without separators
    ////
    ////	searchpath_t			*addonPaks;			// not loaded up, but we saw them
    ////
    ////	idDict					mapDict;			// for GetMapDecl
    ////
    ////	static idCVar			fs_debug;
    ////	static idCVar			fs_restrict;
    ////	static idCVar			fs_copyfiles;
    ////	static idCVar			fs_basepath;
    ////	static idCVar			fs_savepath;
    ////	static idCVar			fs_cdpath;
    ////	static idCVar			fs_devpath;
    ////	static idCVar			fs_game;
    ////	static idCVar			fs_game_base;
    ////	static idCVar			fs_caseSensitiveOS;
    ////	static idCVar			fs_searchAddons;
    ////
    ////	backgroundDownload_t *	backgroundDownloads;
    ////	backgroundDownload_t	defaultBackgroundDownload;
    ////	xthreadInfo				backgroundThread;
    ////
    ////	idList<pack_t *>		serverPaks;
    ////	bool					loadedFileFromDir;		// set to true once a file was loaded from a directory - can't switch to pure anymore
    ////	idList<int>				restartChecksums;		// used during a restart to set things in right order
    ////	idList<int>				addonChecksums;			// list of checksums that should go to the search list directly ( for restarts )
    ////	int						restartGamePakChecksum;
    ////	int						gameDLLChecksum;		// the checksum of the last loaded game DLL
    ////	int						gamePakChecksum;		// the checksum of the pak holding the loaded game DLL
    ////
    ////	int						gamePakForOS[ MAX_GAME_OS ];
    ////
    ////	idDEntry				dir_cache[ MAX_CACHED_DIRS ]; // fifo
    ////	int						dir_cache_index;
    ////	int						dir_cache_count;
    ////
    ////	int						d3xp;	// 0: didn't check, -1: not installed, 1: installed
    ////
    ////private:
    ////	void					ReplaceSeparators( idStr &path, char sep = PATHSEPERATOR_CHAR );
    ////	long					HashFileName( const char *fname ) const;
    ////	int						ListOSFiles( const char *directory, const char *extension, idStrList &list );
    ////	FILE *					OpenOSFile( const char *name, const char *mode, idStr *caseSensitiveName = NULL );
    ////	FILE *					OpenOSFileCorrectName( idStr &path, const char *mode );
    ////	int						DirectFileLength( FILE *o );
    ////	void					CopyFile( idFile *src, const char *toOSPath );
    ////	int						AddUnique( const char *name, idStrList &list, idHashIndex &hashIndex ) const;
    ////	void					GetExtensionList( const char *extension, idStrList &extensionList ) const;
    ////	int						GetFileList( const char *relativePath, const idStrList &extensions, idStrList &list, idHashIndex &hashIndex, bool fullRelativePath, const char* gamedir = NULL );
    ////
    ////	int						GetFileListTree( const char *relativePath, const idStrList &extensions, idStrList &list, idHashIndex &hashIndex, const char* gamedir = NULL );
    ////	pack_t *				LoadZipFile( const char *zipfile );
    ////	void					AddGameDirectory( const char *path, const char *dir );
    ////	void					SetupGameDirectories( const char *gameName );
    ////	void					Startup( void );
    ////	void					SetRestrictions( void );
    ////							// some files can be obtained from directories without compromising si_pure
    ////	bool					FileAllowedFromDir( const char *path );
    ////							// searches all the paks, no pure check
    ////	pack_t *				GetPackForChecksum( int checksum, bool searchAddons = false );
    ////							// searches all the paks, no pure check
    ////	pack_t *				FindPakForFileChecksum( const char *relativePath, int fileChecksum, bool bReference );
    ////	idFile_InZip *			ReadFileFromZip( pack_t *pak, fileInPack_t *pakFile, const char *relativePath );
    ////	int						GetFileChecksum( idFile *file );
    ////	pureStatus_t			GetPackStatus( pack_t *pak );
    ////	addonInfo_t *			ParseAddonDef( const char *buf, const int len );
    ////	void					FollowAddonDependencies( pack_t *pak );
    ////
    ////	static size_t			CurlWriteFunction( void *ptr, size_t size, size_t nmemb, void *stream );
    ////							// curl_progress_callback in curl.h
    ////	static int				CurlProgressFunction( void *clientp, double dltotal, double dlnow, double ultotal, double ulnow );
    ////};
    ////
    ////idCVar	idFileSystemLocal::fs_restrict( "fs_restrict", "", CVAR_SYSTEM | CVAR_INIT | CVAR_BOOL, "" );
    ////idCVar	idFileSystemLocal::fs_debug( "fs_debug", "0", CVAR_SYSTEM | CVAR_INTEGER, "", 0, 2, idCmdSystem::ArgCompletion_Integer<0,2> );
    ////idCVar	idFileSystemLocal::fs_copyfiles( "fs_copyfiles", "0", CVAR_SYSTEM | CVAR_INIT | CVAR_INTEGER, "", 0, 4, idCmdSystem::ArgCompletion_Integer<0,3> );
    ////idCVar	idFileSystemLocal::fs_basepath( "fs_basepath", "", CVAR_SYSTEM | CVAR_INIT, "" );
    ////idCVar	idFileSystemLocal::fs_savepath( "fs_savepath", "", CVAR_SYSTEM | CVAR_INIT, "" );
    ////idCVar	idFileSystemLocal::fs_cdpath( "fs_cdpath", "", CVAR_SYSTEM | CVAR_INIT, "" );
    ////idCVar	idFileSystemLocal::fs_devpath( "fs_devpath", "", CVAR_SYSTEM | CVAR_INIT, "" );
    ////idCVar	idFileSystemLocal::fs_game( "fs_game", "", CVAR_SYSTEM | CVAR_INIT | CVAR_SERVERINFO, "mod path" );
    ////idCVar  idFileSystemLocal::fs_game_base( "fs_game_base", "", CVAR_SYSTEM | CVAR_INIT | CVAR_SERVERINFO, "alternate mod path, searched after the main fs_game path, before the basedir" );
    ////#ifdef WIN32
    ////idCVar	idFileSystemLocal::fs_caseSensitiveOS( "fs_caseSensitiveOS", "0", CVAR_SYSTEM | CVAR_BOOL, "" );
    ////#else
    ////idCVar	idFileSystemLocal::fs_caseSensitiveOS( "fs_caseSensitiveOS", "1", CVAR_SYSTEM | CVAR_BOOL, "" );
    ////#endif
    ////idCVar	idFileSystemLocal::fs_searchAddons( "fs_searchAddons", "0", CVAR_SYSTEM | CVAR_BOOL, "search all addon pk4s ( disables addon functionality )" );
    ////
    ////idFileSystemLocal	fileSystemLocal;
    ////idFileSystem *		fileSystem = &fileSystemLocal;
    ////
    /////*
    ////================
    ////idFileSystemLocal::idFileSystemLocal
    ////================
    ////*/
    ////idFileSystemLocal::idFileSystemLocal( void ) {
    ////	searchPaths = NULL;
    ////	readCount = 0;
    ////	loadCount = 0;
    ////	loadStack = 0;
    ////	dir_cache_index = 0;
    ////	dir_cache_count = 0;
    ////	d3xp = 0;
    ////	loadedFileFromDir = false;
    ////	restartGamePakChecksum = 0;
    ////	memset( &backgroundThread, 0, sizeof( backgroundThread ) );
    ////	addonPaks = NULL;
    ////}
    ////
    /////*
    ////================
    ////idFileSystemLocal::HashFileName
    ////
    ////return a hash value for the filename
    ////================
    ////*/
    ////long idFileSystemLocal::HashFileName( const char *fname ) const {
    ////	int		i;
    ////	long	hash;
    ////	char	letter;
    ////
    ////	hash = 0;
    ////	i = 0;
    ////	while( fname[i] != '\0' ) {
    ////		letter = idStr::ToLower( fname[i] );
    ////		if ( letter == '.' ) {
    ////			break;				// don't include extension
    ////		}
    ////		if ( letter == '\\' ) {
    ////			letter = '/';		// damn path names
    ////		}
    ////		hash += (long)(letter) * (i+119);
    ////		i++;
    ////	}
    ////	hash &= (FILE_HASH_SIZE-1);
    ////	return hash;
    ////}
    ////
    /////*
    ////===========
    ////idFileSystemLocal::FilenameCompare
    ////
    ////Ignore case and separator char distinctions
    ////===========
    ////*/
    ////bool idFileSystemLocal::FilenameCompare( const char *s1, const char *s2 ) const {
    ////	int		c1, c2;
    ////
    ////	do {
    ////		c1 = *s1++;
    ////		c2 = *s2++;
    ////
    ////		if ( c1 >= 'a' && c1 <= 'z' ) {
    ////			c1 -= ('a' - 'A');
    ////		}
    ////		if ( c2 >= 'a' && c2 <= 'z' ) {
    ////			c2 -= ('a' - 'A');
    ////		}
    ////
    ////		if ( c1 == '\\' || c1 == ':' ) {
    ////			c1 = '/';
    ////		}
    ////		if ( c2 == '\\' || c2 == ':' ) {
    ////			c2 = '/';
    ////		}
    ////
    ////		if ( c1 != c2 ) {
    ////			return true;		// strings not equal
    ////		}
    ////	} while( c1 );
    ////
    ////	return false;		// strings are equal
    ////}
    ////
    /////*
    ////================
    ////idFileSystemLocal::OpenOSFile
    ////optional caseSensitiveName is set to case sensitive file name as found on disc (fs_caseSensitiveOS only)
    ////================
    ////*/
    ////FILE *idFileSystemLocal::OpenOSFile( const char *fileName, const char *mode, idStr *caseSensitiveName ) {
    ////	int i;
    ////	FILE *fp;
    ////	idStr fpath, entry;
    ////	idStrList list;
    ////
    ////#ifndef __MWERKS__
    ////#ifndef WIN32
    ////	// some systems will let you fopen a directory
    ////	struct stat buf;
    ////	if ( stat( fileName, &buf ) != -1 && !S_ISREG(buf.st_mode) ) {
    ////		return NULL;
    ////	}
    ////#endif
    ////#endif
    ////	fp = fopen( fileName, mode );
    ////	if ( !fp && fs_caseSensitiveOS.GetBool() ) {
    ////		fpath = fileName;
    ////		fpath.StripFilename();
    ////		fpath.StripTrailing( PATHSEPERATOR_CHAR );
    ////		if ( ListOSFiles( fpath, NULL, list ) == -1 ) {
    ////			return NULL;
    ////		}
    ////
    ////		for ( i = 0; i < list.Num(); i++ ) {
    ////			entry = fpath + PATHSEPERATOR_CHAR + list[i];
    ////			if ( !entry.Icmp( fileName ) ) {
    ////				fp = fopen( entry, mode );
    ////				if ( fp ) {
    ////					if ( caseSensitiveName ) {
    ////						*caseSensitiveName = entry;
    ////						caseSensitiveName.StripPath();
    ////					}
    ////					if ( fs_debug.GetInteger() ) {
    ////						common.Printf( "idFileSystemLocal::OpenFileRead: changed %s to %s\n", fileName, entry.c_str() );
    ////					}
    ////					break;
    ////				} else {
    ////					// not supposed to happen if ListOSFiles is doing it's job correctly
    ////					common.Warning( "idFileSystemLocal::OpenFileRead: fs_caseSensitiveOS 1 could not open %s", entry.c_str() );
    ////				}
    ////			}
    ////		}
    ////	} else if ( caseSensitiveName ) {
    ////		*caseSensitiveName = fileName;
    ////		caseSensitiveName.StripPath();
    ////	}
    ////	return fp;
    ////}
    ////
    /////*
    ////================
    ////idFileSystemLocal::OpenOSFileCorrectName
    ////================
    ////*/
    ////FILE *idFileSystemLocal::OpenOSFileCorrectName( idStr &path, const char *mode ) {
    ////	idStr caseName;
    ////	FILE *f = OpenOSFile( path.c_str(), mode, &caseName );
    ////	if ( f ) {
    ////		path.StripFilename();
    ////		path += PATHSEPERATOR_STR;
    ////		path += caseName;
    ////	}
    ////	return f;
    ////}
    ////
    /////*
    ////================
    ////idFileSystemLocal::DirectFileLength
    ////================
    ////*/
    ////int idFileSystemLocal::DirectFileLength( FILE *o ) {
    ////	int		pos;
    ////	int		end;
    ////
    ////	pos = ftell( o );
    ////	fseek( o, 0, SEEK_END );
    ////	end = ftell( o );
    ////	fseek( o, pos, SEEK_SET );
    ////	return end;
    ////}
    ////
    /////*
    ////============
    ////idFileSystemLocal::CreateOSPath
    ////
    ////Creates any directories needed to store the given filename
    ////============
    ////*/
    ////void idFileSystemLocal::CreateOSPath( const char *OSPath ) {
    ////	char	*ofs;
    ////
    ////	// make absolutely sure that it can't back up the path
    ////	// FIXME: what about c: ?
    ////	if ( strstr( OSPath, ".." ) || strstr( OSPath, "::" ) ) {
    ////#ifdef _DEBUG
    ////		common.DPrintf( "refusing to create relative path \"%s\"\n", OSPath );
    ////#endif
    ////		return;
    ////	}
    ////
    ////	idStr path( OSPath );
    ////	for( ofs = &path[ 1 ]; *ofs ; ofs++ ) {
    ////		if ( *ofs == PATHSEPERATOR_CHAR ) {
    ////			// create the directory
    ////			*ofs = 0;
    ////			Sys_Mkdir( path );
    ////			*ofs = PATHSEPERATOR_CHAR;
    ////		}
    ////	}
    ////}
    ////
    /////*
    ////=================
    ////idFileSystemLocal::CopyFile
    ////
    ////Copy a fully specified file from one place to another
    ////=================
    ////*/
    ////void idFileSystemLocal::CopyFile( const char *fromOSPath, const char *toOSPath ) {
    ////	FILE	*f;
    ////	int		len;
    ////	byte	*buf;
    ////
    ////	common.Printf( "copy %s to %s\n", fromOSPath, toOSPath );
    ////	f = OpenOSFile( fromOSPath, "rb" );
    ////	if ( !f ) {
    ////		return;
    ////	}
    ////	fseek( f, 0, SEEK_END );
    ////	len = ftell( f );
    ////	fseek( f, 0, SEEK_SET );
    ////
    ////	buf = (byte *)Mem_Alloc( len );
    ////	if ( fread( buf, 1, len, f ) != (unsigned int)len ) {
    ////		common.FatalError( "short read in idFileSystemLocal::CopyFile()\n" );
    ////	}
    ////	fclose( f );
    ////
    ////	CreateOSPath( toOSPath );
    ////	f = OpenOSFile( toOSPath, "wb" );
    ////	if ( !f ) {
    ////		common.Printf( "could not create destination file\n" );
    ////		Mem_Free( buf );
    ////		return;
    ////	}
    ////	if ( fwrite( buf, 1, len, f ) != (unsigned int)len ) {
    ////		common.FatalError( "short write in idFileSystemLocal::CopyFile()\n" );
    ////	}
    ////	fclose( f );
    ////	Mem_Free( buf );
    ////}
    ////
    /////*
    ////=================
    ////idFileSystemLocal::CopyFile
    ////=================
    ////*/
    ////void idFileSystemLocal::CopyFile( idFile *src, const char *toOSPath ) {
    ////	FILE	*f;
    ////	int		len;
    ////	byte	*buf;
    ////
    ////	common.Printf( "copy %s to %s\n", src.GetName(), toOSPath );
    ////	src.Seek( 0, FS_SEEK_END );
    ////	len = src.Tell();
    ////	src.Seek( 0, FS_SEEK_SET );
    ////
    ////	buf = (byte *)Mem_Alloc( len );
    ////	if ( src.Read( buf, len ) != len ) {
    ////		common.FatalError( "Short read in idFileSystemLocal::CopyFile()\n" );
    ////	}
    ////
    ////	CreateOSPath( toOSPath );
    ////	f = OpenOSFile( toOSPath, "wb" );
    ////	if ( !f ) {
    ////		common.Printf( "could not create destination file\n" );
    ////		Mem_Free( buf );
    ////		return;
    ////	}
    ////	if ( fwrite( buf, 1, len, f ) != (unsigned int)len ) {
    ////		common.FatalError( "Short write in idFileSystemLocal::CopyFile()\n" );
    ////	}
    ////	fclose( f );
    ////	Mem_Free( buf );
    ////}
    ////
    /////*
    ////====================
    ////idFileSystemLocal::ReplaceSeparators
    ////
    ////Fix things up differently for win/unix/mac
    ////====================
    ////*/
    ////void idFileSystemLocal::ReplaceSeparators( idStr &path, char sep ) {
    ////	char *s;
    ////
    ////	for( s = &path[ 0 ]; *s ; s++ ) {
    ////		if ( *s == '/' || *s == '\\' ) {
    ////			*s = sep;
    ////		}
    ////	}
    ////}
    ////
    /////*
    ////===================
    ////idFileSystemLocal::BuildOSPath
    ////===================
    ////*/
    ////const char *idFileSystemLocal::BuildOSPath( const char *base, const char *game, const char *relativePath ) {
    ////	static char OSPath[MAX_STRING_CHARS];
    ////	idStr newPath;
    ////
    ////	if ( fs_caseSensitiveOS.GetBool() || com_developer.GetBool() ) {
    ////		// extract the path, make sure it's all lowercase
    ////		idStr testPath, fileName;
    ////
    ////		sprintf( testPath, "%s/%s", game , relativePath );
    ////		testPath.StripFilename();
    ////
    ////		if ( testPath.HasUpper() ) {
    ////
    ////			common.Warning( "Non-portable: path contains uppercase characters: %s", testPath.c_str() );
    ////
    ////			// attempt a fixup on the fly
    ////			if ( fs_caseSensitiveOS.GetBool() ) {
    ////				testPath.ToLower();
    ////				fileName = relativePath;
    ////				fileName.StripPath();
    ////				sprintf( newPath, "%s/%s/%s", base, testPath.c_str(), fileName.c_str() );
    ////				ReplaceSeparators( newPath );
    ////				common.DPrintf( "Fixed up to %s\n", newPath.c_str() );
    ////				idStr::Copynz( OSPath, newPath, sizeof( OSPath ) );
    ////				return OSPath;
    ////			}
    ////		}
    ////	}
    ////
    ////	idStr strBase = base;
    ////	strBase.StripTrailing( '/' );
    ////	strBase.StripTrailing( '\\' );
    ////	sprintf( newPath, "%s/%s/%s", strBase.c_str(), game, relativePath );
    ////	ReplaceSeparators( newPath );
    ////	idStr::Copynz( OSPath, newPath, sizeof( OSPath ) );
    ////	return OSPath;
    ////}
    ////
    /////*
    ////================
    ////idFileSystemLocal::OSPathToRelativePath
    ////
    ////takes a full OS path, as might be found in data from a media creation
    ////program, and converts it to a relativePath by stripping off directories
    ////
    ////Returns false if the osPath tree doesn't match any of the existing
    ////search paths.
    ////
    ////================
    ////*/
    ////const char *idFileSystemLocal::OSPathToRelativePath( const char *OSPath ) {
    ////	static char relativePath[MAX_STRING_CHARS];
    ////	char *s, *base;
    ////
    ////	// skip a drive letter?
    ////
    ////	// search for anything with "base" in it
    ////	// Ase files from max may have the form of:
    ////	// "//Purgatory/purgatory/doom/base/models/mapobjects/bitch/hologirl.tga"
    ////	// which won't match any of our drive letter based search paths
    ////	bool ignoreWarning = false;
    ////#ifdef ID_DEMO_BUILD
    ////	base = (char *)strstr( OSPath, BASE_GAMEDIR );
    ////	idStr tempStr = OSPath;
    ////	tempStr.ToLower();
    ////	if ( ( strstr( tempStr, "//" ) || strstr( tempStr, "w:" ) ) && strstr( tempStr, "/doom/base/") ) {
    ////		// will cause a warning but will load the file. ase models have
    ////		// hard coded doom/base/ in the material names
    ////		base = (char *)strstr( OSPath, "base" );
    ////		ignoreWarning = true;
    ////	}
    ////#else
    ////	// look for the first complete directory name
    ////	base = (char *)strstr( OSPath, BASE_GAMEDIR );
    ////	while ( base ) {
    ////		char c1 = '\0', c2;
    ////		if ( base > OSPath ) {
    ////			c1 = *(base - 1);
    ////		}
    ////		c2 = *( base + strlen( BASE_GAMEDIR ) );
    ////		if ( ( c1 == '/' || c1 == '\\' ) && ( c2 == '/' || c2 == '\\' ) ) {
    ////			break;
    ////		}
    ////		base = strstr( base + 1, BASE_GAMEDIR );
    ////	}
    ////#endif
    ////	// fs_game and fs_game_base support - look for first complete name with a mod path
    ////	// ( fs_game searched before fs_game_base )
    ////	const char *fsgame = NULL;
    ////	int igame = 0;
    ////	for ( igame = 0; igame < 2; igame++ ) {
    ////		if ( igame == 0 ) {
    ////			fsgame = fs_game.GetString();
    ////		} else if ( igame == 1 ) {
    ////			fsgame = fs_game_base.GetString();
    ////		}
    ////		if ( base == NULL && fsgame && strlen( fsgame ) ) {
    ////			base = (char *)strstr( OSPath, fsgame );
    ////			while ( base ) {
    ////				char c1 = '\0', c2;
    ////				if ( base > OSPath ) {
    ////					c1 = *(base - 1);
    ////				}
    ////				c2 = *( base + strlen( fsgame ) );
    ////				if ( ( c1 == '/' || c1 == '\\' ) && ( c2 == '/' || c2 == '\\' ) ) {
    ////					break;
    ////				}
    ////				base = strstr( base + 1, fsgame );
    ////			}
    ////		}
    ////	}
    ////
    ////	if ( base ) {
    ////		s = strstr( base, "/" );
    ////		if ( !s ) {
    ////			s = strstr( base, "\\" );
    ////		}
    ////		if ( s ) {
    ////			strcpy( relativePath, s + 1 );
    ////			if ( fs_debug.GetInteger() > 1 ) {
    ////				common.Printf( "idFileSystem::OSPathToRelativePath: %s becomes %s\n", OSPath, relativePath );
    ////			}
    ////			return relativePath;
    ////		}
    ////	}
    ////
    ////	if ( !ignoreWarning ) {
    ////		common.Warning( "idFileSystem::OSPathToRelativePath failed on %s", OSPath );
    ////	}
    ////	strcpy( relativePath, "" );
    ////	return relativePath;
    ////}
    ////
    /////*
    ////=====================
    ////idFileSystemLocal::RelativePathToOSPath
    ////
    ////Returns a fully qualified path that can be used with stdio libraries
    ////=====================
    ////*/
    ////const char *idFileSystemLocal::RelativePathToOSPath( const char *relativePath, const char *basePath ) {
    ////	const char *path = cvarSystem.GetCVarString( basePath );
    ////	if ( !path[0] ) {
    ////		path = fs_savepath.GetString();
    ////	}
    ////	return BuildOSPath( path, gameFolder, relativePath );
    ////}
    ////
    /////*
    ////=================
    ////idFileSystemLocal::RemoveFile
    ////=================
    ////*/
    ////void idFileSystemLocal::RemoveFile( const char *relativePath ) {
    ////	idStr OSPath;
    ////
    ////	if ( fs_devpath.GetString()[0] ) {
    ////		OSPath = BuildOSPath( fs_devpath.GetString(), gameFolder, relativePath );
    ////		remove( OSPath );
    ////	}
    ////
    ////	OSPath = BuildOSPath( fs_savepath.GetString(), gameFolder, relativePath );
    ////	remove( OSPath );
    ////
    ////	ClearDirCache();
    ////}
    ////
    /////*
    ////================
    ////idFileSystemLocal::FileIsInPAK
    ////================
    ////*/
    ////bool idFileSystemLocal::FileIsInPAK( const char *relativePath ) {
    ////	searchpath_t	*search;
    ////	pack_t			*pak;
    ////	fileInPack_t	*pakFile;
    ////	long			hash;
    ////
    ////	if ( !searchPaths ) {
    ////		common.FatalError( "Filesystem call made without initialization\n" );
    ////	}
    ////
    ////	if ( !relativePath ) {
    ////		common.FatalError( "idFileSystemLocal::FileIsInPAK: NULL 'relativePath' parameter passed\n" );
    ////	}
    ////
    ////	// qpaths are not supposed to have a leading slash
    ////	if ( relativePath[0] == '/' || relativePath[0] == '\\' ) {
    ////		relativePath++;
    ////	}
    ////
    ////	// make absolutely sure that it can't back up the path.
    ////	// The searchpaths do guarantee that something will always
    ////	// be prepended, so we don't need to worry about "c:" or "//limbo"
    ////	if ( strstr( relativePath, ".." ) || strstr( relativePath, "::" ) ) {
    ////		return false;
    ////	}
    ////
    ////	//
    ////	// search through the path, one element at a time
    ////	//
    ////
    ////	hash = HashFileName( relativePath );
    ////
    ////	for ( search = searchPaths; search; search = search.next ) {
    ////		// is the element a pak file?
    ////		if ( search.pack && search.pack.hashTable[hash] ) {
    ////
    ////			// disregard if it doesn't match one of the allowed pure pak files - or is a localization file
    ////			if ( serverPaks.Num() ) {
    ////				GetPackStatus( search.pack );
    ////				if ( search.pack.pureStatus != PURE_NEVER && !serverPaks.Find( search.pack ) ) {
    ////					continue; // not on the pure server pak list
    ////				}
    ////			}
    ////
    ////			// look through all the pak file elements
    ////			pak = search.pack;
    ////			pakFile = pak.hashTable[hash];
    ////			do {
    ////				// case and separator insensitive comparisons
    ////				if ( !FilenameCompare( pakFile.name, relativePath ) ) {
    ////					return true;
    ////				}
    ////				pakFile = pakFile.next;
    ////			} while( pakFile != NULL );
    ////		}
    ////	}
    ////	return false;
    ////}
    ////
    /////*
    ////============
    ////idFileSystemLocal::ReadFile
    ////
    ////Filename are relative to the search path
    ////a null buffer will just return the file length and time without loading
    ////timestamp can be NULL if not required
    ////============
    ////*/
    ////int idFileSystemLocal::ReadFile( const char *relativePath, void **buffer, ID_TIME_T *timestamp ) {
    ////	idFile *	f;
    ////	byte *		buf;
    ////	int			len;
    ////	bool		isConfig;
    ////
    ////	if ( !searchPaths ) {
    ////		common.FatalError( "Filesystem call made without initialization\n" );
    ////	}
    ////
    ////	if ( !relativePath || !relativePath[0] ) {
    ////		common.FatalError( "idFileSystemLocal::ReadFile with empty name\n" );
    ////	}
    ////
    ////	if ( timestamp ) {
    ////		*timestamp = FILE_NOT_FOUND_TIMESTAMP;
    ////	}
    ////
    ////	if ( buffer ) {
    ////		*buffer = NULL;
    ////	}
    ////
    ////	buf = NULL;	// quiet compiler warning
    ////
    ////	// if this is a .cfg file and we are playing back a journal, read
    ////	// it from the journal file
    ////	if ( strstr( relativePath, ".cfg" ) == relativePath + strlen( relativePath ) - 4 ) {
    ////		isConfig = true;
    ////		if ( eventLoop && eventLoop.JournalLevel() == 2 ) {
    ////			int		r;
    ////
    ////			loadCount++;
    ////			loadStack++;
    ////
    ////			common.DPrintf( "Loading %s from journal file.\n", relativePath );
    ////			len = 0;
    ////			r = eventLoop.com_journalDataFile.Read( &len, sizeof( len ) );
    ////			if ( r != sizeof( len ) ) {
    ////				*buffer = NULL;
    ////				return -1;
    ////			}
    ////			buf = (byte *)Mem_ClearedAlloc(len+1);
    ////			*buffer = buf;
    ////			r = eventLoop.com_journalDataFile.Read( buf, len );
    ////			if ( r != len ) {
    ////				common.FatalError( "Read from journalDataFile failed" );
    ////			}
    ////
    ////			// guarantee that it will have a trailing 0 for string operations
    ////			buf[len] = 0;
    ////
    ////			return len;
    ////		}
    ////	} else {
    ////		isConfig = false;
    ////	}
    ////
    ////	// look for it in the filesystem or pack files
    ////	f = OpenFileRead( relativePath, ( buffer != NULL ) );
    ////	if ( f == NULL ) {
    ////		if ( buffer ) {
    ////			*buffer = NULL;
    ////		}
    ////		return -1;
    ////	}
    ////	len = f.Length();
    ////
    ////	if ( timestamp ) {
    ////		*timestamp = f.Timestamp();
    ////	}
    ////
    ////	if ( !buffer ) {
    ////		CloseFile( f );
    ////		return len;
    ////	}
    ////
    ////	loadCount++;
    ////	loadStack++;
    ////
    ////	buf = (byte *)Mem_ClearedAlloc(len+1);
    ////	*buffer = buf;
    ////
    ////	f.Read( buf, len );
    ////
    ////	// guarantee that it will have a trailing 0 for string operations
    ////	buf[len] = 0;
    ////	CloseFile( f );
    ////
    ////	// if we are journalling and it is a config file, write it to the journal file
    ////	if ( isConfig && eventLoop && eventLoop.JournalLevel() == 1 ) {
    ////		common.DPrintf( "Writing %s to journal file.\n", relativePath );
    ////		eventLoop.com_journalDataFile.Write( &len, sizeof( len ) );
    ////		eventLoop.com_journalDataFile.Write( buf, len );
    ////		eventLoop.com_journalDataFile.Flush();
    ////	}
    ////
    ////	return len;
    ////}
    ////
    /////*
    ////=============
    ////idFileSystemLocal::FreeFile
    ////=============
    ////*/
    ////void idFileSystemLocal::FreeFile( void *buffer ) {
    ////	if ( !searchPaths ) {
    ////		common.FatalError( "Filesystem call made without initialization\n" );
    ////	}
    ////	if ( !buffer ) {
    ////		common.FatalError( "idFileSystemLocal::FreeFile( NULL )" );
    ////	}
    ////	loadStack--;
    ////
    ////	Mem_Free( buffer );
    ////}
    ////
    /////*
    ////============
    ////idFileSystemLocal::WriteFile
    ////
    ////Filenames are relative to the search path
    ////============
    ////*/
    ////int idFileSystemLocal::WriteFile( const char *relativePath, const void *buffer, int size, const char *basePath ) {
    ////	idFile *f;
    ////
    ////	if ( !searchPaths ) {
    ////		common.FatalError( "Filesystem call made without initialization\n" );
    ////	}
    ////
    ////	if ( !relativePath || !buffer ) {
    ////		common.FatalError( "idFileSystemLocal::WriteFile: NULL parameter" );
    ////	}
    ////
    ////	f = idFileSystemLocal::OpenFileWrite( relativePath, basePath );
    ////	if ( !f ) {
    ////		common.Printf( "Failed to open %s\n", relativePath );
    ////		return -1;
    ////	}
    ////
    ////	size = f.Write( buffer, size );
    ////
    ////	CloseFile( f );
    ////
    ////	return size;
    ////}
    ////
    /////*
    ////=================
    ////idFileSystemLocal::ParseAddonDef
    ////=================
    ////*/
    ////addonInfo_t *idFileSystemLocal::ParseAddonDef( const char *buf, const int len ) {
    ////	idLexer		src;
    ////	idToken		token, token2;
    ////	addonInfo_t	*info;
    ////
    ////	src.LoadMemory( buf, len, "<addon.conf>" );
    ////	src.SetFlags( DECL_LEXER_FLAGS );
    ////	if ( !src.SkipUntilString( "addonDef" ) ) {
    ////		src.Warning( "ParseAddonDef: no addonDef" );
    ////		return NULL;
    ////	}
    ////	if ( !src.ReadToken( &token ) ) {
    ////		src.Warning( "Expected {" );
    ////		return NULL;
    ////	}
    ////	info = new addonInfo_t;
    ////	// read addonDef
    ////	while ( 1 ) {
    ////		if ( !src.ReadToken( &token ) ) {
    ////			delete info;
    ////			return NULL;
    ////		}
    ////		if ( !token.Icmp( "}" ) ) {
    ////			break;
    ////		}
    ////		if ( token.type != TT_STRING ) {
    ////			src.Warning( "Expected quoted string, but found '%s'", token.c_str() );
    ////			delete info;
    ////			return NULL;
    ////		}
    ////		int checksum;
    ////		if ( sscanf( token.c_str(), "0x%x", &checksum ) != 1 && sscanf( token.c_str(), "%x", &checksum ) != 1 ) {
    ////			src.Warning( "Could not parse checksum '%s'", token.c_str() );
    ////			delete info;
    ////			return NULL;
    ////		}
    ////		info.depends.Append( checksum );
    ////	}
    ////	// read any number of mapDef entries
    ////	while ( 1 ) {
    ////		if ( !src.SkipUntilString( "mapDef" ) ) {
    ////			return info;
    ////		}
    ////		if ( !src.ReadToken( &token ) ) {
    ////			src.Warning( "Expected map path" );
    ////			info.mapDecls.DeleteContents( true );
    ////			delete info;
    ////			return NULL;
    ////		}
    ////		idDict *dict = new idDict;
    ////		dict.Set( "path", token.c_str() );
    ////		if ( !src.ReadToken( &token ) ) {
    ////			src.Warning( "Expected {" );
    ////			info.mapDecls.DeleteContents( true );
    ////			delete dict;
    ////			delete info;
    ////			return NULL;
    ////		}
    ////		while ( 1 ) {
    ////			if ( !src.ReadToken( &token ) ) {
    ////				break;
    ////			}
    ////			if ( !token.Icmp( "}" ) ) {
    ////				break;
    ////			}
    ////			if ( token.type != TT_STRING ) {
    ////				src.Warning( "Expected quoted string, but found '%s'", token.c_str() );
    ////				info.mapDecls.DeleteContents( true );
    ////				delete dict;
    ////				delete info;
    ////				return NULL;
    ////			}
    ////
    ////			if ( !src.ReadToken( &token2 ) ) {
    ////				src.Warning( "Unexpected end of file" );
    ////				info.mapDecls.DeleteContents( true );
    ////				delete dict;
    ////				delete info;
    ////				return NULL;
    ////			}
    ////
    ////			if ( dict.FindKey( token ) ) {
    ////				src.Warning( "'%s' already defined", token.c_str() );
    ////			}
    ////			dict.Set( token, token2 );
    ////		}
    ////		info.mapDecls.Append( dict );
    ////	}
    ////	assert( false );
    ////	return NULL;
    ////}
    ////
    /////*
    ////=================
    ////idFileSystemLocal::LoadZipFile
    ////=================
    ////*/
    ////pack_t *idFileSystemLocal::LoadZipFile( const char *zipfile ) {
    ////	fileInPack_t *	buildBuffer;
    ////	pack_t *		pack;
    ////	unzFile			uf;
    ////	int				err;
    ////	unz_global_info gi;
    ////	char			filename_inzip[MAX_ZIPPED_FILE_NAME];
    ////	unz_file_info	file_info;
    ////	int				i;
    ////	long			hash;
    ////	int				fs_numHeaderLongs;
    ////	int *			fs_headerLongs;
    ////	FILE			*f;
    ////	int				len;
    ////	int				confHash;
    ////	fileInPack_t	*pakFile;
    ////
    ////	f = OpenOSFile( zipfile, "rb" );
    ////	if ( !f ) {
    ////		return NULL;
    ////	}
    ////	fseek( f, 0, SEEK_END );
    ////	len = ftell( f );
    ////	fclose( f );
    ////
    ////	fs_numHeaderLongs = 0;
    ////
    ////	uf = unzOpen( zipfile );
    ////	err = unzGetGlobalInfo( uf, &gi );
    ////
    ////	if ( err != UNZ_OK ) {
    ////		return NULL;
    ////	}
    ////
    ////	buildBuffer = new fileInPack_t[gi.number_entry];
    ////	pack = new pack_t;
    ////	for( i = 0; i < FILE_HASH_SIZE; i++ ) {
    ////		pack.hashTable[i] = NULL;
    ////	}
    ////
    ////	pack.pakFilename = zipfile;
    ////	pack.handle = uf;
    ////	pack.numfiles = gi.number_entry;
    ////	pack.buildBuffer = buildBuffer;
    ////	pack.referenced = false;
    ////	pack.binary = BINARY_UNKNOWN;
    ////	pack.addon = false;
    ////	pack.addon_search = false;
    ////	pack.addon_info = NULL;
    ////	pack.pureStatus = PURE_UNKNOWN;
    ////	pack.isNew = false;
    ////
    ////	pack.length = len;
    ////
    ////	unzGoToFirstFile(uf);
    ////	fs_headerLongs = (int *)Mem_ClearedAlloc( gi.number_entry * sizeof(int) );
    ////	for ( i = 0; i < (int)gi.number_entry; i++ ) {
    ////		err = unzGetCurrentFileInfo( uf, &file_info, filename_inzip, sizeof(filename_inzip), NULL, 0, NULL, 0 );
    ////		if ( err != UNZ_OK ) {
    ////			break;
    ////		}
    ////		if ( file_info.uncompressed_size > 0 ) {
    ////			fs_headerLongs[fs_numHeaderLongs++] = LittleLong( file_info.crc );
    ////		}
    ////		hash = HashFileName( filename_inzip );
    ////		buildBuffer[i].name = filename_inzip;
    ////		buildBuffer[i].name.ToLower();
    ////		buildBuffer[i].name.BackSlashesToSlashes();
    ////		// store the file position in the zip
    ////		unzGetCurrentFileInfoPosition( uf, &buildBuffer[i].pos );
    ////		// add the file to the hash
    ////		buildBuffer[i].next = pack.hashTable[hash];
    ////		pack.hashTable[hash] = &buildBuffer[i];
    ////		// go to the next file in the zip
    ////		unzGoToNextFile(uf);
    ////	}
    ////
    ////	// check if this is an addon pak
    ////	pack.addon = false;
    ////	confHash = HashFileName( ADDON_CONFIG );
    ////	for ( pakFile = pack.hashTable[confHash]; pakFile; pakFile = pakFile.next ) {
    ////		if ( !FilenameCompare( pakFile.name, ADDON_CONFIG ) ) {
    ////			pack.addon = true;
    ////			idFile_InZip *file = ReadFileFromZip( pack, pakFile, ADDON_CONFIG );
    ////			// may be just an empty file if you don't bother about the mapDef
    ////			if ( file && file.Length() ) {
    ////				char *buf;
    ////				buf = new char[ file.Length() + 1 ];
    ////				file.Read( (void *)buf, file.Length() );
    ////				buf[ file.Length() ] = '\0';
    ////				pack.addon_info = ParseAddonDef( buf, file.Length() );
    ////				delete[] buf;
    ////			}
    ////			if ( file ) {
    ////				CloseFile( file );
    ////			}
    ////			break;
    ////		}
    ////	}
    ////
    ////	pack.checksum = MD4_BlockChecksum( fs_headerLongs, 4 * fs_numHeaderLongs );
    ////	pack.checksum = LittleLong( pack.checksum );
    ////
    ////	Mem_Free( fs_headerLongs );
    ////
    ////	return pack;
    ////}
    ////
    /////*
    ////===============
    ////idFileSystemLocal::AddZipFile
    ////adds a downloaded pak file to the list so we can work out what we have and what we still need
    ////the isNew flag is set to true, indicating that we cannot add this pak to the search lists without a restart
    ////===============
    ////*/
    ////int idFileSystemLocal::AddZipFile( const char *path ) {
    ////	idStr			fullpath = fs_savepath.GetString();
    ////	pack_t			*pak;
    ////	searchpath_t	*search, *last;
    ////
    ////	fullpath.AppendPath( path );
    ////	pak = LoadZipFile( fullpath );
    ////	if ( !pak ) {
    ////		common.Warning( "AddZipFile %s failed\n", path );
    ////		return 0;
    ////	}
    ////	// insert the pak at the end of the search list - temporary until we restart
    ////	pak.isNew = true;
    ////	search = new searchpath_t;
    ////	search.dir = NULL;
    ////	search.pack = pak;
    ////	search.next = NULL;
    ////	last = searchPaths;
    ////	while ( last.next ) {
    ////		last = last.next;
    ////	}
    ////	last.next = search;
    ////	common.Printf( "Appended pk4 %s with checksum 0x%x\n", pak.pakFilename.c_str(), pak.checksum );
    ////	return pak.checksum;
    ////}
    /*
    ===============
    idFileSystemLocal::AddUnique
    ===============
    */
    idFileSystemLocal.prototype.AddUnique = function (name, list, hashIndex) {
        var i, hashKey;

        hashKey = hashIndex.GenerateKey(name);
        for (i = hashIndex.First(hashKey); i >= 0; i = hashIndex.Next(i)) {
            if (list[i].Icmp(name) == 0) {
                return i;
            }
        }
        i = list.Append(new idStr(name));
        hashIndex.Add(hashKey, i);
        return i;
    };

    /*
    ===============
    idFileSystemLocal::GetExtensionList
    ===============
    */
    idFileSystemLocal.prototype.GetExtensionList = function (extension, extensionList) {
        var s, e, l;

        l = idStr.Length(extension);
        s = 0;
        while (1) {
            e = idStr.FindChar(extension, '|', s, l);
            if (e != -1) {
                extensionList.Append(new idStr(extension, s, e));
                s = e + 1;
            } else {
                extensionList.Append(new idStr(extension, s, l));
                break;
            }
        }
    };

    /*
    ===============
    idFileSystemLocal::GetFileList
    
    Does not clear the list first so this can be used to progressively build a file list.
    When 'sort' is true only the new files added to the list are sorted.
    ===============
    */
    /*int*/ idFileSystemLocal.prototype.GetFileList = function (relativePath, extensions, list, hashIndex, fullRelativePath, gamedir) {
        //searchpath_t *	search;
        //fileInPack_t *	buildBuffer;
        //var i:number, j:number;
        var pathLength;
        var length;

        if (!extensions.Num()) {
            return 0;
        }

        if (!relativePath) {
            return 0;
        }
        pathLength = strlen(relativePath);
        if (pathLength) {
            pathLength++;
        }

        for (var i = 0; i < fileList.length; i++) {
            if (fileList[i].indexOf(relativePath + "\\") === 0) {
                //list.Append(fileList[i].substr( pathLength );
                this.AddUnique(fileList[i].substr(pathLength), list, hashIndex);
            }
        }

        return list.Num();
    };

    /*
    ===============
    idFileSystemLocal::ListFiles
    ===============
    */
    idFileSystemLocal.prototype.ListFiles = function (relativePath, extension, sort, fullRelativePath, gamedir) {
        if (typeof sort === "undefined") { sort = false; }
        if (typeof fullRelativePath === "undefined") { fullRelativePath = false; }
        if (typeof gamedir === "undefined") { gamedir = null; }
        var hashIndex = new idHashIndex(4096, 4096);
        var extensionList = new idStrList();

        var fileList = new idFileList();
        fileList.basePath = new idStr(relativePath);

        this.GetExtensionList(extension, extensionList);

        this.GetFileList(relativePath, extensionList, fileList.list, hashIndex, fullRelativePath, gamedir);

        if (sort) {
            idStrListSortPaths(fileList.list);
        }

        return fileList;
    };

    ////
    /////*
    ////===============
    ////idFileSystemLocal::GetFileListTree
    ////===============
    ////*/
    ////int idFileSystemLocal::GetFileListTree( const char *relativePath, const idStrList &extensions, idStrList &list, idHashIndex &hashIndex, const char* gamedir ) {
    ////	int i;
    ////	idStrList slash, folders( 128 );
    ////	idHashIndex folderHashIndex( 1024, 128 );
    ////
    ////	// recurse through the subdirectories
    ////	slash.Append( "/" );
    ////	GetFileList( relativePath, slash, folders, folderHashIndex, true, gamedir );
    ////	for ( i = 0; i < folders.Num(); i++ ) {
    ////		if ( folders[i][0] == '.' ) {
    ////			continue;
    ////		}
    ////		if ( folders[i].Icmp( relativePath ) == 0 ){
    ////			continue;
    ////		}
    ////		GetFileListTree( folders[i], extensions, list, hashIndex, gamedir );
    ////	}
    ////
    ////	// list files in the current directory
    ////	GetFileList( relativePath, extensions, list, hashIndex, true, gamedir );
    ////
    ////	return list.Num();
    ////}
    ////
    /////*
    ////===============
    ////idFileSystemLocal::ListFilesTree
    ////===============
    ////*/
    ////idFileList *idFileSystemLocal::ListFilesTree( const char *relativePath, const char *extension, bool sort, const char* gamedir ) {
    ////	idHashIndex hashIndex( 4096, 4096 );
    ////	idStrList extensionList;
    ////
    ////	idFileList *fileList = new idFileList();
    ////	fileList.basePath = relativePath;
    ////	fileList.list.SetGranularity( 4096 );
    ////
    ////	GetExtensionList( extension, extensionList );
    ////
    ////	GetFileListTree( relativePath, extensionList, fileList.list, hashIndex, gamedir );
    ////
    ////	if ( sort ) {
    ////		idStrListSortPaths( fileList.list );
    ////	}
    ////
    ////	return fileList;
    ////}
    ////
    /*
    ===============
    idFileSystemLocal::FreeFileList
    ===============
    */
    idFileSystemLocal.prototype.FreeFileList = function (fileList) {
        delete fileList;
    };
    return idFileSystemLocal;
})(idFileSystem);

var fileSystemLocal = new idFileSystemLocal();
var fileSystem = fileSystemLocal;
//@ sourceMappingURL=FileSystem.cpp.js.map
