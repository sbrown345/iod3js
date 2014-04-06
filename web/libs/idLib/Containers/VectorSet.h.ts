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
////#ifndef __VECTORSET_H__
////#define __VECTORSET_H__

/*
===============================================================================

	Vector Set

	Creates a set of vectors without duplicates.

===============================================================================
*/


////class idVectorSet extends idList<type> {
	////public:
	////							idVectorSet( void );
	////							idVectorSet( const type &mins, const type &maxs, const int boxHashSize, const int initialSize );
	////
	////							// returns total size of allocated memory
	////	size_t					Allocated( void ) const { return idList<type>::Allocated() + this.hash.Allocated(); }
	////							// returns total size of allocated memory including size of type
	////	size_t					Size( void ) const { return sizeof( *this ) + Allocated(); }
	////
	////	void					Init( const type &mins, const type &maxs, const int boxHashSize, const int initialSize );
	////	void					ResizeIndex( const int newSize );
	////	void					Clear( void );
	////
	////	int						FindVector( const type &v, const float epsilon );
	////
	////private:
	////	idHashIndex				hash;
	////	type					mins;
	////	type					maxs;
	////	int						boxHashSize;
	////	float					boxInvSize[dimension];
	////	float					boxHalfSize[dimension];
	////};
	////
	
	////ID_INLINE idVectorSet<type,dimension>::idVectorSet( void ) {
	////	this.hash.Clear( idMath::IPow( boxHashSize, dimension ), 128 );
	////	boxHashSize = 16;
	////	memset( boxInvSize, 0, dimension * sizeof( boxInvSize[0] ) );
	////	memset( this.boxHalfSize, 0, dimension * sizeof( this.boxHalfSize[0] ) );
	////}
	////
	
	////ID_INLINE idVectorSet<type,dimension>::idVectorSet( const type &mins, const type &maxs, const int boxHashSize, const int initialSize ) {
	////	Init( mins, maxs, boxHashSize, initialSize );
	////}
	////
	
	////ID_INLINE void idVectorSet<type,dimension>::Init( const type &mins, const type &maxs, const int boxHashSize, const int initialSize ) {
	////	int i;
	////	float boxSize;
	////
	////	idList<type>::AssureSize( initialSize );
	////	idList<type>::SetNum( 0, false );
	////
	////	this.hash.Clear( idMath::IPow( boxHashSize, dimension ), initialSize );
	////
	////	this.mins = mins;
	////	this.maxs = maxs;
	////	this.boxHashSize = boxHashSize;
	////
	////	for ( i = 0; i < dimension; i++ ) {
	////		boxSize = ( maxs[i] - mins[i] ) / (float) boxHashSize;
	////		boxInvSize[i] = 1.0f / boxSize;
	////		this.boxHalfSize[i] = boxSize * 0.5f;
	////	}
	////}
	////
	
	////ID_INLINE void idVectorSet<type,dimension>::ResizeIndex( const int newSize ) {
	////	idList<type>::Resize( newSize );
	////	this.hash.ResizeIndex( newSize );
	////}
	////
	
	////ID_INLINE void idVectorSet<type,dimension>::Clear( void ) {
	////	idList<type>::Clear();
	////	this.hash.Clear();
	////}
	////
	
	////ID_INLINE int idVectorSet<type,dimension>::FindVector( const type &v, const float epsilon ) {
	////	int i, j, k, hashKey, partialHashKey[dimension];
	////
	////	for ( i = 0; i < dimension; i++ ) {
	////		assert( epsilon <= this.boxHalfSize[i] );
	////		partialHashKey[i] = (int) ( ( v[i] - mins[i] - this.boxHalfSize[i] ) * boxInvSize[i] );
	////	}
	////
	////	for ( i = 0; i < ( 1 << dimension ); i++ ) {
	////
	////		hashKey = 0;
	////		for ( j = 0; j < dimension; j++ ) {
	////			hashKey *= boxHashSize;
	////			hashKey += partialHashKey[j] + ( ( i >> j ) & 1 );
	////		}
	////
	////		for ( j = this.hash.First( hashKey ); j >= 0; j = this.hash.Next( j ) ) {
	////			const type &lv = (*this)[j];
	////			for ( k = 0; k < dimension; k++ ) {
	////				if ( idMath::Fabs( lv[k] - v[k] ) > epsilon ) {
	////					break;
	////				}
	////			}
	////			if ( k >= dimension ) {
	////				return j;
	////			}
	////		}
	////	}
	////
	////	hashKey = 0;
	////	for ( i = 0; i < dimension; i++ ) {
	////		hashKey *= boxHashSize;
	////		hashKey += (int) ( ( v[i] - mins[i] ) * boxInvSize[i] );
	////	}
	////
	////	this.hash.Add( hashKey, idList<type>::Num() );
	////	this.Append( v );
	////	return idList<type>::Num()-1;
	////}
////}

/*
===============================================================================

	Vector Subset

	Creates a subset without duplicates from an existing list with vectors.

===============================================================================
*/


class idVectorSubset<type> {
////public:
////							idVectorSubset( void );
////							idVectorSubset( const type &mins, const type &maxs, const int boxHashSize, const int initialSize );
////
////							// returns total size of allocated memory
////	size_t					Allocated( void ) const { return idList<type>::Allocated() + this.hash.Allocated(); }
////							// returns total size of allocated memory including size of type
////	size_t					Size( void ) const { return sizeof( *this ) + Allocated(); }
////
////	void					Init( const type &mins, const type &maxs, const int boxHashSize, const int initialSize );
////	void					Clear( void );
////
////							// returns either vectorNum or an index to a previously found vector
////	int						FindVector( const type *vectorList, const int vectorNum, const float epsilon );
////
////private:
	hash: idHashIndex;
	mins: type;
	maxs: type;
	boxHashSize: number;
	boxInvSize: Float32Array;
	boxHalfSize: Float32Array;

	type: any;
	dimension: number;
////};

	constructor ( type: any, dimension: number /*int*/ ) {
		this.type = type;
		this.dimension = dimension;

		this.hash = new idHashIndex;
		this.mins = new type;
		this.maxs = new type;
		this.boxInvSize = new Float32Array( this.dimension );
		this.boxHalfSize = new Float32Array( this.dimension );

		this.hash.Clear( idMath.IPow( this.boxHashSize, this.dimension ), 128 );
		this.boxHashSize = 16;
		memset( this.boxInvSize, 0, dimension * sizeofSingleItem( this.boxInvSize ) );
		memset( this.boxHalfSize, 0, dimension * sizeofSingleItem( this.boxHalfSize ) );
	}

////ID_INLINE idVectorSubset<type,dimension>::idVectorSubset( const type &mins, const type &maxs, const int boxHashSize, const int initialSize ) {
////	Init( mins, maxs, boxHashSize, initialSize );
////}

	Init ( mins: type, maxs: type, /*int */boxHashSize: number, /*int */initialSize: number ): void {
		var /*int */i: number;
		var /*float */boxSize: number;

		this.hash.Clear( idMath.IPow( boxHashSize, this.dimension ), initialSize );

		this.mins = mins;
		this.maxs = maxs;
		this.boxHashSize = boxHashSize;

		for ( i = 0; i < this.dimension; i++ ) {
			boxSize = ( maxs[i] - mins[i] ) / /*(float)*/ boxHashSize;
			this.boxInvSize[i] = 1.0 / boxSize;
			this.boxHalfSize[i] = boxSize * 0.5;
		}
	}


////ID_INLINE void idVectorSubset<type,dimension>::Clear( void ) {
////	idList<type>::Clear();
////	this.hash.Clear();
////}
////

	FindVector ( vectorList: type[], /*int */vectorNum: number, /*float */epsilon: number ): number {
		var /*int */i: number, j: number, k: number, hashKey: number, partialHashKey = new Int32Array( this.dimension );
		var v = vectorList[vectorNum];

		for ( i = 0; i < this.dimension; i++ ) {
			assert( epsilon <= this.boxHalfSize[i] );
			partialHashKey[i] = ( int )( ( v[i] - this.mins[i] - this.boxHalfSize[i] ) * this.boxInvSize[i] );
		}

		for ( i = 0; i < ( 1 << this.dimension ); i++ ) {

			hashKey = 0;
			for ( j = 0; j < this.dimension; j++ ) {
				hashKey *= this.boxHashSize;
				hashKey += partialHashKey[j] + ( ( i >> j ) & 1 );
			}

			for ( j = this.hash.First( hashKey ); j >= 0; j = this.hash.Next( j ) ) {
				var lv = vectorList[j];
				for ( k = 0; k < this.dimension; k++ ) {
					if ( idMath.Fabs( lv[k] - v[k] ) > epsilon ) {
						break;
					}
				}
				if ( k >= this.dimension ) {
					return j;
				}
			}
		}

		hashKey = 0;
		for ( i = 0; i < this.dimension; i++ ) {
			hashKey *= this.boxHashSize;
			hashKey += ( int )( ( v[i] - this.mins[i] ) * this.boxInvSize[i] );
		}

		this.hash.Add( hashKey, vectorNum );
		return vectorNum;
	}

////#endif /* !__VECTORSET_H__ */
}