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
////#ifndef __STRPOOL_H__
////#define __STRPOOL_H__
////
/*
===============================================================================

	idStrPool

===============================================================================
*/

//class idStrPool;

class idPoolStr extends idStr {
	////	friend class idStrPool;
	////
	////public:
	constructor() {
		super ( );
		this.numUsers = 0;
	}

	destructor ( ): void {
		assert(this.numUsers == 0); 
	}

	// returns total size of allocated memory
	Allocated ( ): number { return super.Allocated ( ); }
	////						// returns total size of allocated memory including size of string pool type
	////	size_t				Size( void ) const { return sizeof( *this ) + Allocated(); }
	// returns a pointer to the pool this string was allocated from
	GetPool ( ): idStrPool { return this.pool; }
	
	//private:
	pool:idStrPool;
	numUsers:number;//	mutable int			
};

class idStrPool {
	////public:
	constructor ( ) { this.caseSensitive = true; }
	////
	////	void				SetCaseSensitive( bool caseSensitive );
	////
	////	int					Num( void ) const { return this.pool.Num(); }
	////	size_t				Allocated( void ) const;
	////	size_t				Size( void ) const;
	////
	////	const idPoolStr *	operator[]( int index ) const { return this.pool[index]; }
	////
	////	const idPoolStr *	AllocString( const char *string );
	////	void				FreeString( const idPoolStr *poolStr );
	////	const idPoolStr *	CopyString( const idPoolStr *poolStr );
	////	void				Clear( void );
	////
	////private:
	caseSensitive:boolean;
	pool = new idList<idPoolStr>(idPoolStr);
	poolHash = new idHashIndex;
	////};
	
	/*
	================
	idStrPool::SetCaseSensitive
	================
	*/
	SetCaseSensitive ( caseSensitive: boolean ): void {
		this.caseSensitive = caseSensitive;
	}

	/*
	================
	idStrPool::AllocString
	================
	*/
	AllocString ( $string: string ): idPoolStr {
		var /*int */i: number, hash: number;
		var poolStr: idPoolStr;

		hash = this.poolHash.GenerateKey( $string, this.caseSensitive );
		if ( this.caseSensitive ) {
			for ( i = this.poolHash.First( hash ); i != -1; i = this.poolHash.Next( i ) ) {
				if ( this.pool[i].Cmp( $string ) == 0 ) {
					this.pool[i].numUsers++;
					return this.pool[i];
				}
			}
		} else {
			for ( i = this.poolHash.First( hash ); i != -1; i = this.poolHash.Next( i ) ) {
				if ( this.pool[i].Icmp( $string ) == 0 ) {
					this.pool[i].numUsers++;
					return this.pool[i];
				}
			}
		}

		poolStr = new idPoolStr;
		( <idStr>( poolStr ) ).equals( $string );
		poolStr.pool = this;
		poolStr.numUsers = 1;
		this.poolHash.Add( hash, this.pool.Append( poolStr ) );
		return poolStr;
	}

	/*
	================
	idStrPool::FreeString
	================
	*/
	FreeString ( poolStr: idPoolStr ): void {
		var /*int */i: number, hash: number;

		assert( poolStr.numUsers >= 1 );
		assert( poolStr.pool == this );

		poolStr.numUsers--;
		if ( poolStr.numUsers <= 0 ) {
			hash = this.poolHash.GenerateKey( poolStr.c_str ( ), this.caseSensitive );
			if ( this.caseSensitive ) {
				for ( i = this.poolHash.First( hash ); i != -1; i = this.poolHash.Next( i ) ) {
					if ( this.pool[i].Cmp( poolStr.c_str ( ) ) == 0 ) {
						break;
					}
				}
			} else {
				for ( i = this.poolHash.First( hash ); i != -1; i = this.poolHash.Next( i ) ) {
					if ( this.pool[i].Icmp( poolStr.c_str ( ) ) == 0 ) {
						break;
					}
				}
			}
			assert( i != -1 );
			assert(this.pool[i] == poolStr);
			$delete( this.pool[i] );
			delete this.pool[i];
			this.pool.RemoveIndex( i );
			this.poolHash.RemoveIndex( hash, i );
		}
	}

	/*
	================
	idStrPool::CopyString
	================
	*/
	CopyString ( poolStr: idPoolStr ): idPoolStr {

		assert( poolStr.numUsers >= 1 );

		if ( poolStr.pool == this ) {
			// the string is from this pool so just increase the user count
			poolStr.numUsers++;
			return poolStr;
		} else {
			// the string is from another pool so it needs to be re-allocated from this pool.
			return this.AllocString( poolStr.c_str ( ) );
		}
	}

	/////*
	////================
	////idStrPool::Clear
	////================
	////*/
	////ID_INLINE void idStrPool::Clear( void ) {
	////	int i;
	////
	////	for ( i = 0; i < this.pool.Num(); i++ ) {
	////		this.pool[i].numUsers = 0;
	////	}
	////	this.pool.DeleteContents( true );
	////	this.poolHash.Free();
	////}
	////
	/////*
	////================
	////idStrPool::Allocated
	////================
	////*/
	////ID_INLINE size_t idStrPool::Allocated( void ) const {
	////	int i;
	////	size_t size;
	////
	////	size = this.pool.Allocated() + this.poolHash.Allocated();
	////	for ( i = 0; i < this.pool.Num(); i++ ) {
	////		size += this.pool[i].Allocated();
	////	}
	////	return size;
	////}
	////
	/////*
	////================
	////idStrPool::Size
	////================
	////*/
	////ID_INLINE size_t idStrPool::Size( void ) const {
	////	int i;
	////	size_t size;
	////
	////	size = this.pool.Size() + this.poolHash.Size();
	////	for ( i = 0; i < this.pool.Num(); i++ ) {
	////		size += this.pool[i].Size();
	////	}
	////	return size;
	////}
	////
	////#endif /* !__STRPOOL_H__ */
}