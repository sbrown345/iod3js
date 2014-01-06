/// <reference path="../Math/Math.h.ts" />
/////*
////===========================================================================

////Doom 3 GPL Source Code
////Copyright (C) 1999-2011 id Software LLC, a ZeniMax Media company. 

////This file is part of the Doom 3 GPL Source Code (?Doom 3 Source Code?).  

////Doom 3 Source Code is free software: you can redistribute it and/or modify
////it under the terms of the GNU General Public License as published by
////the Free Software Foundation, either version 3 of the License, or
////(at your option) any later version.

////Doom 3 Source Code is distributed in the hope that it will be useful,
////but WITHOUT ANY WARRANTY; without even the implied warranty of
////MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
////GNU General Public License for more details.

////You should have received a copy of the GNU General Public License
////along with Doom 3 Source Code.  If not, see <http://www.gnu.org/licenses/>.

////In addition, the Doom 3 Source Code is also subject to certain additional terms. You should have received a copy of these additional terms immediately following the terms and conditions of the GNU General Public License which accompanied the Doom 3 Source Code.  If not, please request a copy in writing from id Software at the address below.

////If you have questions concerning this license or the applicable additional terms, you may contact in writing id Software LLC, c/o ZeniMax Media Inc., Suite 120, Rockville, Maryland 20850 USA.

////===========================================================================
////*/

////#ifndef __HASHINDEX_H__
////#define __HASHINDEX_H__

/////*
////===============================================================================

////	Fast hash table for indexes and arrays.
////	Does not allocate memory until the first key/index pair is added.

////===============================================================================
////*/

var DEFAULT_HASH_SIZE = 1024;
var DEFAULT_HASH_GRANULARITY = 1024;

class idHashIndex {
////public:
////					idHashIndex( void );
////					idHashIndex( const int initialHashSize, const int initialIndexSize );
////					~idHashIndex( void );

////					// returns total size of allocated memory
////	size_t			Allocated( void ) const;
////					// returns total size of allocated memory including size of hash index type
////	size_t			Size( void ) const;

////	idHashIndex &	operator=( const idHashIndex &other );
////					// add an index to the hash, assumes the index has not yet been added to the hash
////	void			Add( const int key, const int index );
////					// remove an index from the hash
////	void			Remove( const int key, const int index );
////					// get the first index from the hash, returns -1 if empty hash entry
////	int				First( const int key ) const;
////					// get the next index from the hash, returns -1 if at the end of the hash chain
////	int				Next( const int index ) const;
////					// insert an entry into the index and add it to the hash, increasing all indexes >= index
////	void			InsertIndex( const int key, const int index );
////					// remove an entry from the index and remove it from the hash, decreasing all indexes >= index
////	void			RemoveIndex( const int key, const int index );
////					// clear the hash
////	void			Clear( void );
////					// clear and resize
////	void			Clear( const int newHashSize, const int newIndexSize );
////					// free allocated memory
////	void			Free( void );
////					// get size of hash table
////	int				GetHashSize( void ) const;
////					// get size of the index
////	int				GetIndexSize( void ) const;
////					// set granularity
////	void			SetGranularity( const int newGranularity );
////					// force resizing the index, current hash table stays intact
////	void			ResizeIndex( const int newIndexSize );
////					// returns number in the range [0-100] representing the spread over the hash table
////	int				GetSpread( void ) const;
////					// returns a key for a string
////	int				GenerateKey( const char *string, bool caseSensitive = true ) const;
////					// returns a key for a vector
////	int				GenerateKey( const idVec3 &v ) const;
////					// returns a key for two integers
////	int				GenerateKey( const int n1, const int n2 ) const;

//private:
/*	int				*/private hashSize:number;
/*	int *			*/private hash:number[];
/*	int				*/private indexSize:number;
/*	int *			*/private indexChain:number[];
/*	int				*/private granularity:number;
/*	int				*/private hashMask:number;
/*	int				*/private lookupMask:number;
	
////	void			Init( const int initialHashSize, const int initialIndexSize );
////	void			Allocate( const int newHashSize, const int newIndexSize );


/*
================
idHashIndex::idHashIndex
================
*/
constructor( ) {
	this.Init( DEFAULT_HASH_SIZE, DEFAULT_HASH_SIZE );
}

/////*
////================
////idHashIndex::idHashIndex
////================
////*/
////ID_INLINE idHashIndex::idHashIndex( const int initialHashSize, const int initialIndexSize ) {
////	Init( initialHashSize, initialIndexSize );
////}

/////*
////================
////idHashIndex::~idHashIndex
////================
////*/
////ID_INLINE idHashIndex::~idHashIndex( void ) {
////	Free();
////}

/////*
////================
////idHashIndex::Allocated
////================
////*/
////ID_INLINE size_t idHashIndex::Allocated( void ) const {
////	return hashSize * sizeof( int ) + this.indexSize * sizeof( int );
////}

/////*
////================
////idHashIndex::Size
////================
////*/
////ID_INLINE size_t idHashIndex::Size( void ) const {
////	return sizeof( *this ) + Allocated();
////}

/////*
////================
////idHashIndex::operator=
////================
////*/
////ID_INLINE idHashIndex &idHashIndex::operator=( const idHashIndex &other ) {
////	this.granularity = other.granularity;
////	this.hashMask = other.hashMask;
////	this.lookupMask = other.lookupMask;

////	if ( other.lookupMask == 0 ) {
////		hashSize = other.hashSize;
////	 this.indexSize = other.indexSize;
////		Free();
////	}
////	else {
////		if ( other.hashSize != hashSize || hash == idHashIndex.INVALID_INDEX ) {
////			if ( hash != idHashIndex.INVALID_INDEX ) {
////				delete[] hash;
////			}
////			hashSize = other.hashSize;
////			hash = new int[hashSize];
////		}
////		if ( other.indexSize != this.indexSize || this.indexChain == idHashIndex.INVALID_INDEX ) {
////			if ( this.indexChain != idHashIndex.INVALID_INDEX ) {
////				delete[] this.indexChain;
////			}
////		 this.indexSize = other.indexSize;
////			this.indexChain = new int this.indexSize];
////		}
////		memcpy( hash, other.hash, hashSize * sizeof( hash[0] ) );
////		memcpy( this.indexChain, other.indexChain, this.indexSize * sizeof( this.indexChain[0] ) );
////	}

////	return *this;
////}

/*
================
idHashIndex::Add
================
*/
Add( /*const int */key:number, /*const int */index:number ):void {
	var/*int */h:number;

	assert( index >= 0 );
	if ( this.hash[0] == idHashIndex.INVALID_INDEX[0] && this.hash.length === 1 ) {
		this.Allocate( this.hashSize, index >= this.indexSize ? index + 1 : this.indexSize );
	}
	else if ( index >= this.indexSize ) {
		this.ResizeIndex( index + 1 );
	}
	h = key & this.hashMask;
	this.indexChain[index] = this.hash[h];
	this.hash[h] = index;
}

/////*
////================
////idHashIndex::Remove
////================
////*/
////ID_INLINE void idHashIndex::Remove( const int key, const int index ) {
////	int k = key & this.hashMask;

////	if ( hash == idHashIndex.INVALID_INDEX ) {
////		return;
////	}
////	if ( hash[k] == index ) {
////		hash[k] = this.indexChain[index];
////	}
////	else {
////		for ( int i = hash[k]; i != -1; i = this.indexChain[i] ) {
////			if ( this.indexChain[i] == index ) {
////				this.indexChain[i] = this.indexChain[index];
////				break;
////			}
////		}
////	}
////	this.indexChain[index] = -1;
////}

/*
================
idHashIndex::First
================
*/
First( /*const int */key:number ):number {
	return this.hash[key & this.hashMask & this.lookupMask];
}

/*
================
idHashIndex::Next
================
*/
Next( /*const int */index:number ):number {
	assert( index >= 0 && index < this.indexSize );
	return this.indexChain[index & this.lookupMask];
}

/////*
////================
////idHashIndex::InsertIndex
////================
////*/
////ID_INLINE void idHashIndex::InsertIndex( const int key, const int index ) {
////	int i, max;

////	if ( hash != idHashIndex.INVALID_INDEX ) {
////		max = index;
////		for ( i = 0; i < hashSize; i++ ) {
////			if ( hash[i] >= index ) {
////				hash[i]++;
////				if ( hash[i] > max ) {
////					max = hash[i];
////				}
////			}
////		}
////		for ( i = 0; i < this.indexSize; i++ ) {
////			if ( this.indexChain[i] >= index ) {
////				this.indexChain[i]++;
////				if ( this.indexChain[i] > max ) {
////					max = this.indexChain[i];
////				}
////			}
////		}
////		if ( max >= this.indexSize ) {
////			ResizeIndex( max + 1 );
////		}
////		for ( i = max; i > index; i-- ) {
////			this.indexChain[i] = this.indexChain[i-1];
////		}
////		this.indexChain[index] = -1;
////	}
////	Add( key, index );
////}

/////*
////================
////idHashIndex::RemoveIndex
////================
////*/
////ID_INLINE void idHashIndex::RemoveIndex( const int key, const int index ) {
////	int i, max;

////	Remove( key, index );
////	if ( hash != idHashIndex.INVALID_INDEX ) {
////		max = index;
////		for ( i = 0; i < hashSize; i++ ) {
////			if ( hash[i] >= index ) {
////				if ( hash[i] > max ) {
////					max = hash[i];
////				}
////				hash[i]--;
////			}
////		}
////		for ( i = 0; i < this.indexSize; i++ ) {
////			if ( this.indexChain[i] >= index ) {
////				if ( this.indexChain[i] > max ) {
////					max = this.indexChain[i];
////				}
////				this.indexChain[i]--;
////			}
////		}
////		for ( i = index; i < max; i++ ) {
////			this.indexChain[i] = this.indexChain[i+1];
////		}
////		this.indexChain[max] = -1;
////	}
////}

/////*
////================
////idHashIndex::Clear
////================
////*/
////ID_INLINE void idHashIndex::Clear( void ) {
////	// only clear the hash table because clearing the this.indexChain is not really needed
////	if ( hash != idHashIndex.INVALID_INDEX ) {
////		memset( hash, 0xff, hashSize * sizeof( hash[0] ) );
////	}
////}

/////*
////================
////idHashIndex::Clear
////================
////*/
////ID_INLINE void idHashIndex::Clear( const int newHashSize, const int newIndexSize ) {
////	Free();
////	hashSize = newHashSize;
////    this.indexSize = newIndexSize;
////}

/////*
////================
////idHashIndex::GetHashSize
////================
////*/
////ID_INLINE int idHashIndex::GetHashSize( void ) const {
////	return hashSize;
////}

/////*
////================
////idHashIndex::GetIndexSize
////================
////*/
////ID_INLINE int idHashIndex::GetIndexSize( void ) const {
////	return this.indexSize;
////}

/////*
////================
////idHashIndex::SetGranularity
////================
////*/
////ID_INLINE void idHashIndex::SetGranularity( const int newGranularity ) {
////	assert( newGranularity > 0 );
////	this.granularity = newGranularity;
////}

/*
================
idHashIndex::GenerateKey
================
*/
GenerateKey( $string: string, caseSensitive:boolean ) :number;
GenerateKey( $string: idStr, caseSensitive:boolean ) :number;
GenerateKey( $string: any, caseSensitive:boolean ) :number {
	if ( caseSensitive ) {
		return ( idStr.Hash( $string ) & this.hashMask );
	} else {
		return ( idStr.IHash( $string ) & this.hashMask );
	}
}

/////*
////================
////idHashIndex::GenerateKey
////================
////*/
////ID_INLINE int idHashIndex::GenerateKey( const idVec3 &v ) const {
////	return ( (((int) v[0]) + ((int) v[1]) + ((int) v[2])) & this.hashMask );
////}

/////*
////================
////idHashIndex::GenerateKey
////================
////*/
////ID_INLINE int idHashIndex::GenerateKey( const int n1, const int n2 ) const {
////	return ( ( n1 + n2 ) & this.hashMask );
////}

////#endif /* !__HASHINDEX_H__ */


/////*
////===========================================================================

////Doom 3 GPL Source Code
////Copyright (C) 1999-2011 id Software LLC, a ZeniMax Media company. 

////This file is part of the Doom 3 GPL Source Code (?Doom 3 Source Code?).  

////Doom 3 Source Code is free software: you can redistribute it and/or modify
////it under the terms of the GNU General Public License as published by
////the Free Software Foundation, either version 3 of the License, or
////(at your option) any later version.

////Doom 3 Source Code is distributed in the hope that it will be useful,
////but WITHOUT ANY WARRANTY; without even the implied warranty of
////MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
////GNU General Public License for more details.

////You should have received a copy of the GNU General Public License
////along with Doom 3 Source Code.  If not, see <http://www.gnu.org/licenses/>.

////In addition, the Doom 3 Source Code is also subject to certain additional terms. You should have received a copy of these additional terms immediately following the terms and conditions of the GNU General Public License which accompanied the Doom 3 Source Code.  If not, please request a copy in writing from id Software at the address below.

////If you have questions concerning this license or the applicable additional terms, you may contact in writing id Software LLC, c/o ZeniMax Media Inc., Suite 120, Rockville, Maryland 20850 USA.

////===========================================================================
////*/

////#include "../precompiled.h"
////#pragma hdrstop

static INVALID_INDEX = [ -1 ];

/*
================
idHashIndex::Init
================
*/
Init( initialHashSize:number, initialIndexSize:number ):void {
	assert( idMath.IsPowerOfTwo( initialHashSize ) );

	this.hashSize = initialHashSize;
	this.hash = idHashIndex.INVALID_INDEX;
	this.indexSize = initialIndexSize;
	this.indexChain = idHashIndex.INVALID_INDEX;
	this.granularity = DEFAULT_HASH_GRANULARITY;
	this.hashMask = this.hashSize - 1;
	this.lookupMask = 0;
}

/*
================
idHashIndex::Allocate
================
*/
Allocate( /*const int */newHashSize:number, /*const int */newIndexSize:number ):void {
    todoThrow ( );
	//assert( idMath::IsPowerOfTwo( newHashSize ) );

	//Free();
	//hashSize = newHashSize;
	//hash = new int[hashSize];
	//memset( hash, 0xff, hashSize * sizeof( hash[0] ) );
	this.indexSize = newIndexSize;
	//indexChain = new int this.indexSize];
	//memset( this.indexChain, 0xff, this.indexSize * sizeof( this.indexChain[0] ) );
	//hashMask = hashSize - 1;
	//lookupMask = -1;
}

/////*
////================
////idHashIndex::Free
////================
////*/
////void idHashIndex::Free( void ) {
////	if ( hash != idHashIndex.INVALID_INDEX ) {
////		delete[] hash;
////		hash = idHashIndex.INVALID_INDEX;
////	}
////	if ( this.indexChain != idHashIndex.INVALID_INDEX ) {
////		delete[] this.indexChain;
////		this.indexChain = idHashIndex.INVALID_INDEX;
////	}
////	this.lookupMask = 0;
////}

/*
================
idHashIndex::ResizeIndex
================
*/
ResizeIndex( /*const int */newIndexSize:number ):void {
    todoThrow ( );
    //int *oldIndexChain, mod, newSize;

    //if ( newIndexSize <= this.indexSize ) {
    //	return;
    //}

    //mod = newIndexSize % granularity;
    //if ( !mod ) {
    //	newSize = newIndexSize;
    //} else {
    //	newSize = newIndexSize + granularity - mod;
    //}

    //if ( this.indexChain == idHashIndex.INVALID_INDEX ) {
    // this.indexSize = newSize;
    //	return;
    //}

    //oldIndexChain = this.indexChain;
    //indexChain = new int[newSize];
    //memcpy( this.indexChain, oldIndexChain, this.indexSize * sizeof(int) );
    //memset( this.indexChain + this.indexSize, 0xff, (newSize - this.indexSize) * sizeof(int) );
    //delete[] oldIndexChain;
    //this.indexSize = newSize;
}

/////*
////================
////idHashIndex::GetSpread
////================
////*/
////int idHashIndex::GetSpread( void ) const {
////	int i, index, totalItems, *numHashItems, average, error, e;

////	if ( hash == idHashIndex.INVALID_INDEX ) {
////		return 100;
////	}

////	totalItems = 0;
////	numHashItems = new int[hashSize];
////	for ( i = 0; i < hashSize; i++ ) {
////		numHashItems[i] = 0;
////		for ( index = hash[i]; index >= 0; index = this.indexChain[index] ) {
////			numHashItems[i]++;
////		}
////		totalItems += numHashItems[i];
////	}
////	// if no items in hash
////	if ( totalItems <= 1 ) {
////		delete[] numHashItems;
////		return 100;
////	}
////	average = totalItems / hashSize;
////	error = 0;
////	for ( i = 0; i < hashSize; i++ ) {
////		e = abs( numHashItems[i] - average );
////		if ( e > 1 ) {
////			error += e - 1;
////		}
////	}
////	delete[] numHashItems;
////	return 100 - (error * 100 / totalItems);
////}
}