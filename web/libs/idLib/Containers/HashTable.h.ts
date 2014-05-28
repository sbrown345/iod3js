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
////#ifndef __HASHTABLE_H__
////#define __HASHTABLE_H__
////
/*
===============================================================================

	General hash table. Slower than idHashIndex but it can also be used for
	linked lists and other data structures than just indexes or arrays.

===============================================================================
*/
class hashnode_s<Type> {
	key = new idStr;
	value: Type; //new?
	next: hashnode_s<Type>;

	constructor(k: idStr, v: Type, n: hashnode_s<Type> )
	constructor(k: string, v: Type, n: hashnode_s<Type> )
	constructor(k: any, v: Type, n: hashnode_s<Type> ) {
		this.key.opEquals(k);
		this.value = v;
		this.next = n;
	}

	//hashnode_s( const idStr &k, Type v, hashnode_s *n ) : key( k ), value( v ), next( n ) {};
	//hashnode_s( const char *k, Type v, hashnode_s *n ) : key( k ), value( v ), next( n ) {};
}

////template< class Type >

class idHashTable <Type>{
////public:
////					idHashTable( int newtablesize = 256 );
////					idHashTable( const idHashTable<Type> &map );
////					~idHashTable( );
////
////					// returns total size of allocated memory
////	size_t			Allocated( ) const;
////					// returns total size of allocated memory including size of hash table type
////	size_t			Size( ) const;
////
////	void			Set( const char *key, Type &value );
////	bool			Get( const char *key, Type **value = null ) const;
////	bool			Remove( const char *key );
////
////	void			Clear( );
////	void			DeleteContents( );
////
////					// the entire contents can be itterated over, but note that the
////					// exact index for a given element may change when new elements are added
////	int				Num( ) const;
////	Type *			GetIndex( int index ) const;
////
////	int				GetSpread( ) const;
////
////private:


	heads: hashnode_s<Type>[];

	tablesize :number/*int*/;
	numentries :number/*int*/;
	tablesizemask :number/*int*/;
////
////	int				GetHash( const char *key ) const;
////};
////
/*
================
idHashTable<Type>::idHashTable
================
*/
//template< class Type >
	constructor ( /*int*/ newtablesize: number = 256 ) {

		assert( idMath.IsPowerOfTwo( newtablesize ) );

		this.tablesize = newtablesize;
		assert( this.tablesize > 0 );

		this.heads = new Array( this.tablesize ); //new hashnode_s *[ this.tablesize ];
		//memset( this.heads, 0, sizeof( *this.heads ) * this.tablesize );

		this.numentries = 0;

		this.tablesizemask = this.tablesize - 1;
	}

/////*
////================
////idHashTable<Type>::idHashTable
////================
////*/
////template< class Type >
////ID_INLINE idHashTable<Type>::idHashTable( const idHashTable<Type> &map ) {
////	var i:number /*int*/;
////	hashnode_s	*node;
////	hashnode_s	**prev;
////
////	assert( map.tablesize > 0 );
////
////	this.tablesize		= map.tablesize;
////	this.heads			= new hashnode_s *[ this.tablesize ];
////	this.numentries		= map.numentries;
////	this.tablesizemask	= map.tablesizemask;
////
////	for( i = 0; i < this.tablesize; i++ ) {
////		if ( !map.heads[ i ] ) {
////			this.heads[ i ] = null;
////			continue;
////		}
////
////		prev = &this.heads[ i ];	
////		for( node = map.heads[ i ]; node != null; node = node.next ) {
////			*prev = new hashnode_s( node.key, node.value, null );
////			prev = &( *prev ).next;
////		}
////	}
////}
////
/////*
////================
////idHashTable<Type>::~idHashTable<Type>
////================
////*/
////template< class Type >
////ID_INLINE idHashTable<Type>::~idHashTable( ) {
////	Clear();
////	delete[] this.heads;
////}
////
/////*
////================
////idHashTable<Type>::Allocated
////================
////*/
////template< class Type >
////ID_INLINE size_t idHashTable<Type>::Allocated( ) const {
////	return sizeof( this.heads ) * this.tablesize + sizeof( *this.heads ) * this.numentries;
////}
////
/////*
////================
////idHashTable<Type>::Size
////================
////*/
////template< class Type >
////ID_INLINE size_t idHashTable<Type>::Size( ) const {
////	return sizeof( idHashTable<Type> ) + sizeof( this.heads ) * this.tablesize + sizeof( *this.heads ) * this.numentries;
////}

/*
================
idHashTable<Type>::GetHash
================
*/
//template< class Type >
	GetHash ( key: string ): number {
		return ( idStr.Hash( key ) & this.tablesizemask );
	}

/*
================
idHashTable<Type>::Set
================
*/
//template< class Type >
	Set ( key: string, value: Type ) {
		var node: hashnode_s<Type>, nextPtr: any;// R<hashnode_s<Type>>;
		var /*int */hash: number, s: number;
		var $this = this;

		hash = this.GetHash( key );
		for ( nextPtr = createPointer( ( ) => $this.heads[hash], ( v: any ) => { $this.heads[hash] = v; } ), node = nextPtr.value;
			node != null;
			nextPtr = { value: node.next }, node = nextPtr.value ) {
			s = node.key.Cmp( key );
			if ( s == 0 ) {
				node.value = value;
				return;
			}
			if ( s > 0 ) {
				break;
			}
		}

		this.numentries++;

		nextPtr.value = new hashnode_s( key, value, this.heads[hash] );
		( nextPtr.value ).next = node;
	}

/*
================
idHashTable<Type>::Get
================
*/
//template< class Type >
	Get ( key: string, /*Type ***/value: R<Type> ): boolean {
		var node: hashnode_s<Type>;
		var /*int */hash: number, s: number;

		hash = this.GetHash( key );
		for ( node = this.heads[hash]; node != null; node = node.next ) {
			s = node.key.Cmp( key );
			if ( s == 0 ) {
				if ( value ) {
					value.$ = node.value;
				}
				return true;
			}
			if ( s > 0 ) {
				break;
			}
		}

		if ( value ) {
			value.$ = null;
		}

		return false;
	}
////
/////*
////================
////idHashTable<Type>::GetIndex
////
////the entire contents can be itterated over, but note that the
////exact index for a given element may change when new elements are added
////================
////*/
////template< class Type >
////ID_INLINE Type *idHashTable<Type>::GetIndex( int index ) const {
////	hashnode_s	*node;
////	int			count;
////	var i:number /*int*/;
////
////	if ( ( index < 0 ) || ( index > this.numentries ) ) {
////		assert( 0 );
////		return null;
////	}
////
////	count = 0;
////	for( i = 0; i < this.tablesize; i++ ) {
////		for( node = this.heads[ i ]; node != null; node = node.next ) {
////			if ( count == index ) {
////				return &node.value;
////			}
////			count++;
////		}
////	}
////
////	return null;
////}
////
/////*
////================
////idHashTable<Type>::Remove
////================
////*/
////template< class Type >
////ID_INLINE bool idHashTable<Type>::Remove( const char *key ) {
////	hashnode_s	**head;
////	hashnode_s	*node;
////	hashnode_s	*prev;
////	int			hash;
////
////	hash = this.GetHash( key );
////	head = &this.heads[ hash ];
////	if ( *head ) {
////		for( prev = null, node = *head; node != null; prev = node, node = node.next ) {
////			if ( node.key == key ) {
////				if ( prev ) {
////					prev.next = node.next;
////				} else {
////					*head = node.next;
////				}
////
////				delete node;
////				this.numentries--;
////				return true;
////			}
////		}
////	}
////
////	return false;
////}
////
/////*
////================
////idHashTable<Type>::Clear
////================
////*/
////template< class Type >
////ID_INLINE void idHashTable<Type>::Clear( ) {
////	var/*int*/i:number;
////	var node: hashnode_s<Type>;
////	var next: hashnode_s<Type>;
////
////	for( i = 0; i < this.tablesize; i++ ) {
////		next = this.heads[ i ];
////		while( next != null ) {
////			node = next;
////			next = next.next;
////			delete node;
////		}
////
////		this.heads[ i ] = null;
////	}
////
////	this.numentries = 0;
////}
////
/*
================
idHashTable<Type>::DeleteContents
================
*/
//template< class Type >
DeleteContents( ):void {
	var/*int*/i:number;
	var node: hashnode_s<Type>;
	var next: hashnode_s<Type>;

	for( i = 0; i < this.tablesize; i++ ) {
		next = this.heads[ i ];
		while( next != null ) {
			node = next;
			next = next.next;
			$delete( node.value );
			$delete( node );
		}

		this.heads[ i ] = null;
	}

	this.numentries = 0;
}

/*
================
idHashTable<Type>::Num
================
*/
//template< class Type >
Num( ) :number {
	return this.numentries;
}

////#if defined(ID_TYPEINFO)
////#define __GNUC__ 99
////#endif
////
////#if !defined(__GNUC__) || __GNUC__ < 4
/////*
////================
////idHashTable<Type>::GetSpread
////================
////*/
////template< class Type >
////int idHashTable<Type>::GetSpread( ) const {
////	int i, average, error, e;
////	hashnode_s	*node;
////
////	// if no items in hash
////	if ( !this.numentries ) {
////		return 100;
////	}
////	average = this.numentries / this.tablesize;
////	error = 0;
////	for ( i = 0; i < this.tablesize; i++ ) {
////		numItems = 0;
////		for( node = this.heads[ i ]; node != null; node = node.next ) {
////			numItems++;
////		}
////		e = abs( numItems - average );
////		if ( e > 1 ) {
////			error += e - 1;
////		}
////	}
////	return 100 - (error * 100 / this.numentries);
////}
////#endif
////
////#if defined(ID_TYPEINFO)
////#undef __GNUC__
////#endif
////
////#endif /* !__HASHTABLE_H__ */
}