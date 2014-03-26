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
////#include "../../../idlib/precompiled.h"
////#pragma hdrstop
////
////#include "AASFile.h"
////#include "AASFile_local.h"
////
////
////#ifndef __AASFILEMANAGER_H__
////#define __AASFILEMANAGER_H__

/*
===============================================================================

AAS File Manager

===============================================================================
*/

class idAASFileManager {
////public:
////	virtual						~idAASFileManager(void) {}
////
////	virtual idAASFile *			LoadAAS(const char *fileName, unsigned int mapFileCRC) = 0;
////	virtual void				FreeAAS(idAASFile *file) = 0;
};
////
////#endif /* !__AASFILEMANAGER_H__ */



/*
===============================================================================

	AAS File Manager

===============================================================================
*/

class idAASFileManagerLocal extends idAASFileManager {
////public:
////	virtual						~idAASFileManagerLocal( void ) {}
////
////	virtual idAASFile *			LoadAAS( const char *fileName, unsigned int mapFileCRC );
////	virtual void				FreeAAS( idAASFile *file );
////};
////
////idAASFileManagerLocal			AASFileManagerLocal;
////idAASFileManager *				AASFileManager = &AASFileManagerLocal;
////
////
/*
================
idAASFileManagerLocal::LoadAAS
================
*/
	LoadAAS ( fileName: string, /*unsigned int */mapFileCRC: number ): idAASFile {
		var file = new idAASFileLocal ( );
		if ( !file.Load( new idStr( fileName ), mapFileCRC ) ) {
			$delete( file );
			return null;
		}
		return file;
	}

/*
================
idAASFileManagerLocal::FreeAAS
================
*/
	FreeAAS ( file: idAASFile ): void {
		$delete( file );
	}

}

var AASFileManager = new idAASFileManagerLocal;