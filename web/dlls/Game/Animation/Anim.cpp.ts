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
//	idHashTable<idMD5Anim *>	animations;
//	idStrList					jointnames;
//	idHashIndex					jointnamesHash;
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
//
///*
//====================
//idAnimManager::Shutdown
//====================
//*/
//void idAnimManager::Shutdown( ) {
//	animations.DeleteContents();
//	jointnames.Clear();
//	jointnamesHash.Free();
//}
//
/*
====================
idAnimManager::GetAnim
====================
*/
	GetAnim ( name: string ): idMD5Anim {
		todoThrow ( );
		//idMD5Anim **animptrptr;
		var anim: idMD5Anim;

		// see if it has been asked for before
		//animptrptr = NULL;
		//if ( animations.Get( name, &animptrptr ) ) {
		//	anim = *animptrptr;
		//} else {
		//	idStr extension;
		//	idStr filename = name;

		//	filename.ExtractFileExtension( extension );
		//	if ( extension != MD5_ANIM_EXT ) {
		//		return NULL;
		//	}

		//	anim = new idMD5Anim();
		//	if ( !anim->LoadAnim( filename ) ) {
		//		gameLocal.Warning( "Couldn't load anim: '%s'", filename.c_str() );
		//		delete anim;
		//		anim = NULL;
		//	}
		//	animations.Set( filename, anim );
		//}

		return anim;
	}
//
///*
//================
//idAnimManager::ReloadAnims
//================
//*/
//void idAnimManager::ReloadAnims( ) {
//	var/*int*/i:number;
//	idMD5Anim	**animptr;
//
//	for( i = 0; i < animations.Num(); i++ ) {
//		animptr = animations.GetIndex( i );
//		if ( animptr && *animptr ) {
//			( *animptr )->Reload();
//		}
//	}
//}
//
///*
//================
//idAnimManager::JointIndex
//================
//*/
//int	idAnimManager::JointIndex( const char *name ) {
//	int i, hash;
//
//	hash = jointnamesHash.GenerateKey( name );
//	for ( i = jointnamesHash.First( hash ); i != -1; i = jointnamesHash.Next( i ) ) {
//		if ( jointnames[i].Cmp( name ) == 0 ) {
//			return i;
//		}
//	}
//
//	i = jointnames.Append( name );
//	jointnamesHash.Add( hash, i );
//	return i;
//}
//
///*
//================
//idAnimManager::JointName
//================
//*/
//const char *idAnimManager::JointName( int index ) const {
//	return jointnames[ index ];
//}
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
//	for( i = 0; i < animations.Num(); i++ ) {
//		animptr = animations.GetIndex( i );
//		if ( animptr && *animptr ) {
//			anim = *animptr;
//			s = anim->Size();
//			gameLocal.Printf( "%8d bytes : %2d refs : %s\n", s, anim->NumRefs(), anim->Name() );
//			size += s;
//			num++;
//		}
//	}
//
//	namesize = jointnames.Size() + jointnamesHash.Size();
//	for( i = 0; i < jointnames.Num(); i++ ) {
//		namesize += jointnames[ i ].Size();
//	}
//
//	gameLocal.Printf( "\n%d memory used in %d anims\n", size, num );
//	gameLocal.Printf( "%d memory used in %d joint names\n", namesize, jointnames.Num() );
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
//	for( i = 0; i < animations.Num(); i++ ) {
//		animptr = animations.GetIndex( i );
//		if ( animptr && *animptr ) {
//			if ( ( *animptr )->NumRefs() <= 0 ) {
//				removeAnims.Append( *animptr );
//			}
//		}
//	}
//
//	for( i = 0; i < removeAnims.Num(); i++ ) {
//		animations.Remove( removeAnims[ i ]->Name() );
//		delete removeAnims[ i ];
//	}
//}
	}
}