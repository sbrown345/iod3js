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
////#include "../idlib/precompiled.h"
////#pragma hdrstop
////
////#include "snd_local.h"
////
////#define USE_SOUND_CACHE_ALLOCATOR
////
////#ifdef USE_SOUND_CACHE_ALLOCATOR
////static idDynamicBlockAlloc<byte, 1<<20, 1<<10>	soundCacheAllocator;
////#else
////static idDynamicAlloc<byte, 1<<20, 1<<10>		soundCacheAllocator;
var soundCacheAllocator = idDynamicAlloc_template( Uint8Array, 1 << 20, 1 << 10 );
////#endif


/*
===================================================================================

  The actual sound cache.

===================================================================================
*/

class idSoundCache {
	////public:
	////							idSoundCache();
	////							~idSoundCache();
	////
	////	idSoundSample *			FindSound( const idStr &fname, bool loadOnDemandOnly );
	////
	////	const int				GetNumObjects( void ) { return this.listCache.Num(); }
	////	const idSoundSample *	GetObject( const int index ) const;
	////
	////	void					ReloadSounds( bool force );
	////
	////	void					BeginLevelLoad();
	////	void					EndLevelLoad();
	////
	////	void					PrintMemInfo( MemInfo_t *mi );
	////
	////private:
	insideLevelLoad:boolean;
	listCache = new idList<idSoundSample>(idSoundSample, true);


/*
===================
idSoundCache::idSoundCache()
===================
*/
constructor() {
	soundCacheAllocator.Init();
	soundCacheAllocator.SetLockMemory( true );
	this.listCache.AssureSize( 1024, null );
	this.listCache.SetGranularity( 256 );
	this.insideLevelLoad = false;
}

/*
===================
idSoundCache::~idSoundCache()
===================
*/
	destructor ( ) {
		this.listCache.DeleteContents( true );
		soundCacheAllocator.Shutdown ( );
	}

/////*
////===================
////idSoundCache::::GetObject
////
////returns a single cached object pointer
////===================
////*/
////const idSoundSample* idSoundCache::GetObject( const int index ) const {
////	if (index<0 || index>this.listCache.Num()) {
////		return NULL;
////	}
////	return this.listCache[index]; 
////}
////
/*
===================
idSoundCache::FindSound

Adds a sound object to the cache and returns a handle for it.
===================
*/
	FindSound ( filename: idStr, loadOnDemandOnly: boolean ): idSoundSample {
		todoThrow ( );
////	idStr fname;
////
////	fname = filename;
////	fname.BackSlashesToSlashes();
////	fname.ToLower();
////
////	declManager.MediaPrint( "%s\n", fname.c_str() );
////
////	// check to see if object is already in cache
////	for( int i = 0; i < this.listCache.Num(); i++ ) {
////		idSoundSample *def = this.listCache[i];
////		if ( def && def.name == fname ) {
////			def.levelLoadReferenced = true;
////			if ( def.purged && !loadOnDemandOnly ) {
////				def.Load();
////			}
////			return def;
////		}
////	}
////
		// create a new entry
		var def = new idSoundSample;
////
////	int shandle = this.listCache.FindNull();
////	if ( shandle != -1 ) {
////		this.listCache[shandle] = def;
////	} else {
////		shandle = this.listCache.Append( def );
////	}
////
////	def.name = fname;
////	def.levelLoadReferenced = true;
////	def.onDemand = loadOnDemandOnly;
////	def.purged = true;
////
////	if ( !loadOnDemandOnly ) {
////		// this may make it a default sound if it can't be loaded
////		def.Load();
////	}
////
		return def;
	}
////
/////*
////===================
////idSoundCache::ReloadSounds
////
////Completely nukes the current cache
////===================
////*/
////void idSoundCache::ReloadSounds( bool force ) {
////	var/*int*/i:number;
////
////	for( i = 0; i < this.listCache.Num(); i++ ) {
////		idSoundSample *def = this.listCache[i];
////		if ( def ) {
////			def.Reload( force );
////		}
////	}
////}
////
/*
====================
BeginLevelLoad

Mark all file based images as currently unused,
but don't free anything.  Calls to ImageFromFile() will
either mark the image as used, or create a new image without
loading the actual data.
====================
*/
	BeginLevelLoad ( ): void {
		this.insideLevelLoad = true;

		for ( var i = 0; i < this.listCache.Num ( ); i++ ) {
			var sample: idSoundSample = this.listCache[i];
			if ( !sample ) {
				continue;
			}

			if ( com_purgeAll.GetBool ( ) ) {
				sample.PurgeSoundSample ( );
			}

			sample.levelLoadReferenced = false;
		}

		soundCacheAllocator.FreeEmptyBaseBlocks ( );
	}
////
/////*
////====================
////EndLevelLoad
////
////Free all samples marked as unused
////====================
////*/
////void idSoundCache::EndLevelLoad() {
////	int	useCount, purgeCount;
////	common.Printf( "----- idSoundCache::EndLevelLoad -----\n" );
////
////	this.insideLevelLoad = false;
////
////	// purge the ones we don't need
////	useCount = 0;
////	purgeCount = 0;
////	for ( int i = 0 ; i < this.listCache.Num() ; i++ ) {
////		idSoundSample	*sample = this.listCache[ i ];
////		if ( !sample ) {
////			continue;
////		}
////		if ( sample.purged ) {
////			continue;
////		}
////		if ( !sample.levelLoadReferenced ) {
//////			common.Printf( "Purging %s\n", sample.name.c_str() );
////			purgeCount += sample.objectMemSize;
////			sample.PurgeSoundSample();
////		} else {
////			useCount += sample.objectMemSize;
////		}
////	}
////
////	soundCacheAllocator.FreeEmptyBaseBlocks();
////
////	common.Printf( "%5ik referenced\n", useCount / 1024 );
////	common.Printf( "%5ik purged\n", purgeCount / 1024 );
////	common.Printf( "----------------------------------------\n" );
////}
////
/////*
////===================
////idSoundCache::PrintMemInfo
////===================
////*/
////void idSoundCache::PrintMemInfo( MemInfo_t *mi ) {
////	int i, j, num = 0, total = 0;
////	int *sortIndex;
////	idFile *f;
////
////	f = fileSystem.OpenFileWrite( mi.filebase + "_sounds.txt" );
////	if ( !f ) {
////		return;
////	}
////
////	// count
////	for ( i = 0; i < this.listCache.Num(); i++, num++ ) {
////		if ( !this.listCache[i] ) {
////			break;
////		}
////	}
////
////	// sort first
////	sortIndex = new int[num];
////
////	for ( i = 0; i < num; i++ ) {
////		sortIndex[i] = i;
////	}
////
////	for ( i = 0; i < num - 1; i++ ) {
////		for ( j = i + 1; j < num; j++ ) {
////			if ( this.listCache[sortIndex[i]].objectMemSize < this.listCache[sortIndex[j]].objectMemSize ) {
////				int temp = sortIndex[i];
////				sortIndex[i] = sortIndex[j];
////				sortIndex[j] = temp;
////			}
////		}
////	}
////
////	// print next
////	for ( i = 0; i < num; i++ ) {
////		idSoundSample *sample = this.listCache[sortIndex[i]];
////
////		// this is strange
////		if ( !sample ) {
////			continue;
////		}
////
////		total += sample.objectMemSize;
////		f.Printf( "%s %s\n", idStr::FormatNumber( sample.objectMemSize ).c_str(), sample.name.c_str() );
////	}
////
////	mi.soundAssetsTotal = total;
////
////	f.Printf( "\nTotal sound bytes allocated: %s\n", idStr::FormatNumber( total ).c_str() );
////	fileSystem.CloseFile( f );
////}
}
////
/////*
////==========================================================================
////
////idSoundSample
////
////==========================================================================
////*/
////