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
//#include "../../idlib/precompiled.h"
//#pragma hdrstop
//
//#include "../Game_local.h"
//
//bool idAnimManager::forceExport = false;
//
///***********************************************************************
//
//	idMD5Anim
//
//***********************************************************************/
//

/*
==============================================================================================

	idAnimManager

==============================================================================================
*/

class idAnimManager {
//public:
//								idAnimManager();
//								~idAnimManager();
//
//	static bool					forceExport;
//
//	void						Shutdown( );
//	idMD5Anim *					GetAnim( name:string );
//	void						ReloadAnims( );
//	void						ListAnims( ) const;
//	int							JointIndex( name:string );
//	const char *				JointName( int index ) const;
//
//	void						ClearAnimsInUse( );
//	void						FlushUnusedAnims( );
//
//private:
	animations = new idHashTable<idMD5Anim /***/>();
	jointnames = new idStrList;
	jointnamesHash = new idHashIndex;
///*
//====================
//idAnimManager::idAnimManager
//====================
//*/
//idAnimManager::idAnimManager() {
//}
//
///*
//====================
//idAnimManager::~idAnimManager
//====================
//*/
//idAnimManager::~idAnimManager() {
//	Shutdown();
//}

/*
====================
idAnimManager::Shutdown
====================
*/
	Shutdown ( ): void {
		this.animations.DeleteContents ( );
		this.jointnames.Clear ( );
		this.jointnamesHash.Free ( );
	}

/*
====================
idAnimManager::GetAnim
====================
*/
	GetAnim ( name: string ): idMD5Anim {
		var animptrptr = new R<idMD5Anim> ( );
		var anim: idMD5Anim;

		// see if it has been asked for before
		animptrptr.$ = null;
		if ( this.animations.Get( name, animptrptr ) ) {
			anim = animptrptr.$;
		} else {
			var extension = new idStr;
			var filename = new idStr( name );

			filename.ExtractFileExtension( extension );
			if ( extension.data != MD5_ANIM_EXT ) {
				return null;
			}

			anim = new idMD5Anim ( );
			if ( !anim.LoadAnim( filename.data ) ) {
				gameLocal.Warning( "Couldn't load anim: '%s'", filename.c_str ( ) );
				delete anim;
				anim = null;
			}
			this.animations.Set( filename.data, anim );
		}

		return anim;
	}
///*
//================
//idAnimManager::ReloadAnims
//================
//*/
//void idAnimManager::ReloadAnims( ) {
//	var/*int*/i:number;
//	idMD5Anim	**animptr;
//
//	for( i = 0; i < this.animations.Num(); i++ ) {
//		animptr = this.animations.GetIndex( i );
//		if ( animptr && *animptr ) {
//			( *animptr ).Reload();
//		}
//	}
//}
//
/*
================
idAnimManager::JointIndex
================
*/
	JointIndex ( name: string ): number {
		var /*int */i: number, hash: number;

		hash = this.jointnamesHash.GenerateKey( name );
		for ( i = this.jointnamesHash.First( hash ); i != -1; i = this.jointnamesHash.Next( i ) ) {
			if ( this.jointnames[i].Cmp( name ) == 0 ) {
				return i;
			}
		}

		i = this.jointnames.Append( new idStr( name ) );
		this.jointnamesHash.Add( hash, i );
		return i;
	}

/*
================
idAnimManager::JointName
================
*/
	JointName ( /*int*/ index: number ): string {
		return this.jointnames[index].data;
	}
//
///*
//================
//idAnimManager::ListAnims
//================
//*/
//void idAnimManager::ListAnims( ) const {
//	var/*int*/i:number;
//	idMD5Anim	**animptr;
//	idMD5Anim	*anim;
//	size_t		size;
//	size_t		s;
//	size_t		namesize;
//	int			num;
//
//	num = 0;
//	size = 0;
//	for( i = 0; i < this.animations.Num(); i++ ) {
//		animptr = this.animations.GetIndex( i );
//		if ( animptr && *animptr ) {
//			anim = *animptr;
//			s = anim.Size();
//			gameLocal.Printf( "%8d bytes : %2d refs : %s\n", s, anim.NumRefs(), anim.Name() );
//			size += s;
//			num++;
//		}
//	}
//
//	namesize = this.jointnames.Size() + this.jointnamesHash.Size();
//	for( i = 0; i < this.jointnames.Num(); i++ ) {
//		namesize += this.jointnames[ i ].Size();
//	}
//
//	gameLocal.Printf( "\n%d memory used in %d anims\n", size, num );
//	gameLocal.Printf( "%d memory used in %d joint names\n", namesize, this.jointnames.Num() );
//}
//
///*
//================
//idAnimManager::FlushUnusedAnims
//================
//*/
	FlushUnusedAnims(): void {
		todoThrow ( );
//	int						i;
//	idMD5Anim				**animptr;
//	idList<idMD5Anim *>		removeAnims;
//	
//	for( i = 0; i < this.animations.Num(); i++ ) {
//		animptr = this.animations.GetIndex( i );
//		if ( animptr && *animptr ) {
//			if ( ( *animptr ).NumRefs() <= 0 ) {
//				removeAnims.Append( *animptr );
//			}
//		}
//	}
//
//	for( i = 0; i < removeAnims.Num(); i++ ) {
//		this.animations.Remove( removeAnims[ i ].Name() );
//		delete removeAnims[ i ];
//	}
//}
	}
}