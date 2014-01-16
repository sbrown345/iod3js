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
////#ifndef __FILESYSTEM_H__
////#define __FILESYSTEM_H__
////
/////*
////===============================================================================
////
////	File System
////
////	No stdio calls should be used by any part of the game, because of all sorts
////	of directory and separator char issues. Throughout the game a forward slash
////	should be used as a separator. The file system takes care of the conversion
////	to an OS specific separator. The file system treats all file and directory
////	names as case insensitive.
////
////	The following cvars store paths used by the file system:
////
////	"fs_basepath"		path to local install, read-only
////	"fs_savepath"		path to config, save game, etc. files, read & write
////	"fs_cdpath"			path to cd, read-only
////	"fs_devpath"		path to files created during development, read & write
////
////	The base path for file saving can be set to "fs_savepath" or "fs_devpath".
////
////===============================================================================
////*/
////
var FILE_NOT_FOUND_TIMESTAMP = 0xFFFFFFFF;

////static const int		MAX_PURE_PAKS				= 128;
////static const int		MAX_OSPATH					= 256;
////
////// modes for OpenFileByMode. used as bit mask internally
////typedef enum {
////	FS_READ		= 0,
////	FS_WRITE	= 1,
////	FS_APPEND	= 2
////} fsMode_t;
////
////typedef enum {
////	PURE_OK,		// we are good to connect as-is
////	PURE_RESTART,	// restart required
////	PURE_MISSING,	// pak files missing on the client
////	PURE_NODLL		// no DLL could be extracted
////} fsPureReply_t;
////
////typedef enum {
////	DLTYPE_URL,
////	DLTYPE_FILE
////} dlType_t;
////
////typedef enum {
////	DL_WAIT,		// waiting in the list for beginning of the download
////	DL_INPROGRESS,	// in progress
////	DL_DONE,		// download completed, success
////	DL_ABORTING,	// this one can be set during a download, it will force the next progress callback to abort - then will go to DL_FAILED
////	DL_FAILED
////} dlStatus_t;
////
////typedef enum {
////	FILE_EXEC,
////	FILE_OPEN
////} dlMime_t;
////
////typedef enum {
////	FIND_NO,
////	FIND_YES,
////	FIND_ADDON
////} findFile_t;
////
////typedef struct urlDownload_s {
////	idStr				url;
////	char				dlerror[ MAX_STRING_CHARS ];
////	int					dltotal;
////	int					dlnow;
////	int					dlstatus;
////	dlStatus_t			status;
////} urlDownload_t;
////
////typedef struct fileDownload_s {
////	int					position;
////	int					length;
////	void *				buffer;
////} fileDownload_t;
////
////typedef struct backgroundDownload_s {
////	struct backgroundDownload_s	*next;	// set by the fileSystem
////	dlType_t			opcode;
////	idFile *			f;
////	fileDownload_t		file;
////	urlDownload_t		url;
////	volatile bool		completed;
////} backgroundDownload_t;
////
////// file list for directory listings
var idFileList = (function () {
    function idFileList() {
        this.basePath = null;
        this.list = new idStrList();
    }
    ////	friend class idFileSystemLocal;
    ////public:
    idFileList.prototype.GetBasePath = function () {
        return this.basePath;
    };
    idFileList.prototype.GetNumFiles = function () {
        return this.list.Num();
    };
    idFileList.prototype.GetFile = function (index) {
        return this.list[index];
    };
    idFileList.prototype.GetList = function () {
        return this.list;
    };
    return idFileList;
})();
;

////
////// mod list
////class idModList {
////	friend class idFileSystemLocal;
////public:
////	int						GetNumMods( void ) const { return mods.Num(); }
////	const char *			GetMod( int index ) const { return mods[index]; }
////	const char *			GetDescription( int index ) const { return descriptions[index]; }
////
////private:
////	idStrList				mods;
////	idStrList				descriptions;
////};
////
var idFileSystem = (function () {
    function idFileSystem() {
    }
    return idFileSystem;
})();
;
//@ sourceMappingURL=FileSystem.h.js.map
