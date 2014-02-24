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



//#ifndef __LIST_H__
//#define __LIST_H__

///*
//===============================================================================

//	List template
//	Does not allocate memory until the first item is added.

//===============================================================================
//*/


///*
//================
//idListSortCompare<type>
//================
//*/
//#ifdef __INTEL_COMPILER
//// the intel compiler doesn't do the right thing here
//template< class type >
//ID_INLINE int idListSortCompare( const type *a, const type *b ) {
//	assert( 0 );
//	return 0;
//}
//#else
//template< class type >
//ID_INLINE int idListSortCompare( const type *a, const type *b ) {
//	return *a - *b;
//}
//#endif

///*
//================
//idListNewElement<type>
//================
//*/
//template< class type >
//ID_INLINE type *idListNewElement( void ) {
//	return new type;
//}

//todo: may need to look closer and delete and delete[] - i removed some and they may be needed to call some destructors

/*
================
idSwap<type>
================
*/
//template< class type >
function idSwap( a:any, aProperty:string, b:any, bProperty:string ) {
	var c = a[aProperty];
	a[aProperty] = b[bProperty];
	b[bProperty] = c;
}

//template< class type >
class idList<type> {
    //private:
	private num:number;                 //int				
	private size:number;                //int				
	private granularity:number;         //int				
	private list:any; // reference itself		
    private type:any;
	private initEmptyOnResize: boolean; // new up when Resizing/Allocating. this makes it work with a list of references and classes/structs (otherwise idList<R<idDeclType>> this is a bit overkill)

    constructor(type:any, initEmptyOnResize = false, newgranularity:number = 16) {
        assert(typeof type !== "number"); // new type arg not to be confused with newgranularity
        this.type = type;
		this.initEmptyOnResize = initEmptyOnResize;
        this.num = 0;
        this.size = 0;
        this.granularity = newgranularity;
        this.list = this;
    }

///*
//================
//idList<type>::idList( int )
//================
//*/
//template< class type >
//ID_INLINE idList<type>::idList( int newgranularity ) {
//	assert( newgranularity > 0 );

//	this.list		= NULL;
//	granularity	= newgranularity;
//	Clear();
//}

///*
//================
//idList<type>::idList( const idList<type> &other )
//================
//*/
//template< class type >
//ID_INLINE idList<type>::idList( const idList<type> &other ) {
//	this.list = NULL;
//	*this = other;
//}

///*
//================
//idList<type>::~idList<type>
//================
//*/
//template< class type >
//ID_INLINE idList<type>::~idList( void ) {
//	Clear();
//}

/*
================
idList<type>::Clear

Frees up the memory allocated by the list.  Assumes that type automatically handles freeing up memory.
================
*/
//template< class type >
Clear ():void {
    if ( this.list ) {
        for( var i=0; i < this.num; i++) {
            delete this[i];
        }
    }

    this.num	= 0;
    this.size	= 0;
}

/*
================
idList<type>::DeleteContents

Calls the destructor of all elements in the list.  Conditionally frees up memory used by the list.
Note that this only works on lists containing pointers to objects and will cause a compiler error
if called with non-pointers.  Since the list was not responsible for allocating the object, it has
no information on whether the object still exists or not, so care must be taken to ensure that
the pointers are still valid when this function is called.  Function will set all pointers in the
list to NULL.
================
*/
	DeleteContents ( clear: boolean ): void {
		var i: number;

		for ( i = 0; i < this.num; i++ ) {
			delete this.list[i];
			this.list[i] = null;
		}

		if ( clear ) {
			this.Clear ( );
		} else {
			//memset( this.list, 0, this.size * sizeof( type ) );
		}
	}

///*
//================
//idList<type>::Allocated

//return total memory allocated for the list in bytes, but doesn't take into account additional memory allocated by type
//================
//*/
//template< class type >
//ID_INLINE size_t idList<type>::Allocated( void ) const {
//	return this.size * sizeof( type );
//}

///*
//================
//idList<type>::Size

//return total size of list in bytes, but doesn't take into account additional memory allocated by type
//================
//*/
//template< class type >
//ID_INLINE size_t idList<type>::Size( void ) const {
//	return sizeof( idList<type> ) + Allocated();
//}

///*
//================
//idList<type>::MemoryUsed
//================
//*/
//template< class type >
//ID_INLINE size_t idList<type>::MemoryUsed( void ) const {
//	return this.num * sizeof( *this.list );
//}

/*
================
idList<type>::Num

Returns the number of elements currently contained in the list.
Note that this is NOT an indication of the memory allocated.
================
*/
//template< class type >
Num():number {
    return this.num;
}

///*
//================
//idList<type>::NumAllocated

//Returns the number of elements currently allocated for.
//================
//*/
//template< class type >
//ID_INLINE int idList<type>::NumAllocated( void ) const {
//	return size;
//}

///*
//================
//idList<type>::SetNum

//Resize to the exact size specified irregardless of granularity
//================
//*/
//template< class type >
SetNum ( /* int */newnum: number, /*bool */resize: boolean = true ): void {
	assert( newnum >= 0 );
	if ( resize || newnum > this.size ) {
		this.Resize( newnum );
	}
    this.num = newnum;
}

/*
================
idList<type>::SetGranularity

Sets the base size of the array and resizes the array to match.
================
*/
//template< class type >
/*//ID_INLINE void idList<type>::*/
SetGranularity ( /*int*/ newgranularity: number ): void {
	var newsize:number;

	assert( newgranularity > 0 );
	this.granularity = newgranularity;

	if ( this.list ) {
		// resize it to the closest level of granularity
		newsize = this.num + this.granularity - 1;
		newsize -= newsize % this.granularity;
		if ( newsize != this.size ) {
			this.Resize( newsize );
		}
	}
}

/*
================
idList<type>::GetGranularity

Get the current granularity.
================
*/
GetGranularity( ) :number {
	return this.granularity;
}

///*
//================
//idList<type>::Condense

//Resizes the array to exactly the number of elements it contains or frees up memory if empty.
//================
//*/
//template< class type >
//ID_INLINE void idList<type>::Condense( void ) {
//	if ( this.list ) {
//		if ( this.num ) {
//			Resize( this.num );
//		} else {
//			Clear();
//		}
//	}
//}

/*
================
idList<type>::Resize

Allocates memory for the amount of elements requested while keeping the contents intact.
Contents are copied using their = operator so that data is correnctly instantiated.
================
*/
//template< class type >
Resize (/* int */newsize:number):void
Resize (/* int */newsize:number, /*int */newgranularity?:number):void {
	var temp:type[];
	var/*int		*/i:number;

	assert( newsize >= 0 );

    if( arguments.length === 2 ) {
	    assert( newgranularity > 0 );
	    this.granularity = newgranularity;
	}
	
	// free up the list if no data is being reserved
	if ( newsize <= 0 ) {
		this.Clear();
		return;
	}

	if (arguments.length === 1) {
		if (newsize == this.size) {
			// not changing the size, so just exit
			return;
		}
	}

	//temp	= this.list;
	this.size	= newsize;
	if ( this.size < this.num ) {
		this.num = this.size;
	}

	// init any new ones
	if ( this.initEmptyOnResize ) {
		for ( i = 0; i < this.size; i++ ) {
			if ( !this[i] ) {
				this[i] = new this.type;
			}
		}
	}
}


/*
================
idList<type>::AssureSize

Makes sure the list has at least the given number of elements.
================
*/
//template< class type >
//ID_INLINE void idList<type>::
	AssureSize( /*int */newSize: number, initValue: type = null): void {
		if ( arguments.length == 1 ) {
			var /*int */newNum = newSize;

			if ( newSize > this.size ) {

				if ( this.granularity == 0 ) { // this is a hack to fix our memset classes
					this.granularity = 16;
				}

				newSize += this.granularity - 1;
				newSize -= newSize % this.granularity;
				this.Resize( newSize );
			}

			this.num = newNum;
		} else {
			//Makes sure the list has at least the given number of elements and initialize any elements not yet initialized.
			var /*int */newNum = newSize;

			if ( newSize > this.size ) {

				if ( this.granularity == 0 ) { // this is a hack to fix our memset classes
					this.granularity = 16;
				}

				newSize += this.granularity - 1;
				newSize -= newSize % this.granularity;
				this.num = this.size;
				this.Resize( newSize );

				for (var i = this.num; i < newSize; i++) {
					if ( initValue ) {
						todoThrow( "may need to clone?" );
					}
					this.list[i] = initValue;
				}
			}

			this.num = newNum;
		}
	}
	
///*
//================
//idList<type>::AssureSizeAlloc

//Makes sure the list has at least the given number of elements and allocates any elements using the allocator.

//NOTE: This function can only be called on lists containing pointers. Calling it
//on non-pointer lists will cause a compiler error.
//================
//*/
//template< class type >
//ID_INLINE void idList<type>::AssureSizeAlloc( int newSize, new_t *allocator ) {
//	int newNum = newSize;

//	if ( newSize > this.size ) {

//		if ( this.granularity == 0 ) {	// this is a hack to fix our memset classes
//			this.granularity = 16;
//		}

//		newSize += this.granularity - 1;
//		newSize -= newSize % this.granularity;
//		this.num = this.size;
//		Resize( newSize );

//		for ( int i = this.num; i < newSize; i++ ) {
//			this.list[i] = (*allocator)();
//		}
//	}

//	this.num = newNum;
//}

///*
//================
//idList<type>::operator=

//Copies the contents and size attributes of another list.
//================
//*/
//template< class type >
//ID_INLINE idList<type> &idList<type>::operator=( const idList<type> &other ) {
//	int	i;

//	Clear();

//	this.num			= other.num;
//	this.size		= other.size;
//	this.granularity	= other.granularity;

//	if ( this.size ) {
//		this.list = new type[ this.size ];
//		for( i = 0; i < this.num; i++ ) {
//			this.list[ i ] = other.list[ i ];
//		}
//	}

//	return *this;
//}

///*
//================
//idList<type>::operator[] const

//Access operator.  Index must be within range or an assert will be issued in debug builds.
//Release builds do no range checking.
//================
//*/
//template< class type >
//ID_INLINE const type &idList<type>::operator[]( int index ) const {
//	assert( index >= 0 );
//	assert( index < this.num );

//	return this.list[ index ];
//}

///*
//================
//idList<type>::operator[]

//Access operator.  Index must be within range or an assert will be issued in debug builds.
//Release builds do no range checking.
//================
//*/
//template< class type >
//ID_INLINE type &idList<type>::operator[]( int index ) {
//	assert( index >= 0 );
//	assert( index < this.num );

//	return this.list[ index ];
//}

///*
//================
//idList<type>::Ptr

//Returns a pointer to the begining of the array.  Useful for iterating through the list in loops.

//Note: may return NULL if the list is empty.

//FIXME: Create an iterator template for this kind of thing.
//================
//*/
//template< class type >
//ID_INLINE type *idList<type>::Ptr( void ) {
//	return this.list;
//}

///*
//================
//idList<type>::Ptr

//Returns a pointer to the begining of the array.  Useful for iterating through the list in loops.

//Note: may return NULL if the list is empty.

//FIXME: Create an iterator template for this kind of thing.
//================
//*/
//template< class type >
//const ID_INLINE type *idList<type>::Ptr( void ) const {
//	return this.list;
//}

/*
================
idList<type>::Alloc

Returns a reference to a new data element at the end of the list.
================
*/
//template< class type >
	Alloc ( ): type {
		if ( !this[0] /*.list*/ ) {
			this.Resize( this.granularity );
		}

		if ( this.num == this.size ) {
			this.Resize( this.size + this.granularity );
		}

		return this.list[this.num++];
	}

///*
//================
//idList<type>::Append

//Increases the size of the list by one element and copies the supplied data into it.

//Returns the index of the new element.
//================
//*/
//template< class type >
//ID_INLINE int idList<type>::Append( type const & obj ) {
//	if ( !this[0] /*.list*/ ) {
//		Resize( this.granularity );
//	}

//	if ( this.num == this.size ) {
//		int newsize;

//		if ( this.granularity == 0 ) {	// this is a hack to fix our memset classes
//			this.granularity = 16;
//		}
//		newsize = this.size + this.granularity;
//		Resize( newsize - newsize % this.granularity );
//	}

//	this.list[ this.num ] = obj;
//	this.num++;

//	return this.num - 1;
//}


///*
//================
//idList<type>::Append

//adds the other list to this one

//Returns the size of the new combined list
//================
//*/
//template< class type >
//ID_INLINE int idList<type>::Append( const idList<type> &other ) {
//	if ( !this[0] /*.list*/ ) {
//		if ( this.granularity == 0 ) {	// this is a hack to fix our memset classes
//			this.granularity = 16;
//		}
//		Resize( this.granularity );
//	}

//	int n = other.Num();
//	for (int i = 0; i < n; i++) {
//		Append(other[i]);
//	}

//	return Num();
//}
Append( obj:type ):number {
	if ( !this[0] /*.list*/ ) {
		this.Resize( this.granularity );
	}

	if ( this.num == this.size ) {
		var/*int*/ newsize:number;

		if ( this.granularity == 0 ) {	// this is a hack to fix our memset classes
			this.granularity = 16;
		}
		newsize = this.size + this.granularity;
		this.Resize( newsize - newsize % this.granularity );
	}

	this.list[ this.num ] = obj;
	this.num++;

	return this.num - 1;
}

///*
//================
//idList<type>::Insert

//Increases the size of the list by at leat one element if necessary 
//and inserts the supplied data into it.

//Returns the index of the new element.
//================
//*/
//template< class type >
//ID_INLINE int idList<type>::Insert( type const & obj, int index ) {
//	if ( !this[0] /*.list*/ ) {
//		Resize( this.granularity );
//	}

//	if ( this.num == this.size ) {
//		int newsize;

//		if ( this.granularity == 0 ) {	// this is a hack to fix our memset classes
//			this.granularity = 16;
//		}
//		newsize = this.size + this.granularity;
//		Resize( newsize - newsize % this.granularity );
//	}

//	if ( index < 0 ) {
//		index = 0;
//	}
//	else if ( index > this.num ) {
//		index = this.num;
//	}
//	for ( int i = this.num; i > index; --i ) {
//		this.list[i] = this.list[i-1];
//	}
//	this.num++;
//	this.list[index] = obj;
//	return index;
//}

// moved Append list next to Append item

/*
================
idList<type>::AddUnique

Adds the data to the list if it doesn't already exist.  Returns the index of the data in the list.
================
*/
//template< class type >
	AddUnique ( obj: type ): number {
		var /*int */index: number;

		index = this.FindIndex( obj );
		if ( index < 0 ) {
			index = this.Append( obj );
		}

		return index;
	}

/*
================
idList<type>::FindIndex

Searches for the specified data in the list and returns it's index.  Returns -1 if the data is not found.
================
*/
//template< class type >
	FindIndex ( obj: type ): number {
		var /*int */i: number;

		for ( i = 0; i < this.num; i++ ) {
			//if ( this.list[i] == obj ) { 
			// maybe check if it's got the method equalsEquals first?
			if ( this.list[i].equalsEquals(obj) ) {
				return i;
			}
		}

		// Not found
		return -1;
	}

///*
//================
//idList<type>::Find

//Searches for the specified data in the list and returns it's address. Returns NULL if the data is not found.
//================
//*/
//template< class type >
//ID_INLINE type *idList<type>::Find( type const & obj ) const {
//	int i;

//	i = FindIndex( obj );
//	if ( i >= 0 ) {
//		return &this.list[ i ];
//	}

//	return NULL;
//}

///*
//================
//idList<type>::FindNull

//Searches for a NULL pointer in the list.  Returns -1 if NULL is not found.

//NOTE: This function can only be called on lists containing pointers. Calling it
//on non-pointer lists will cause a compiler error.
//================
//*/
//template< class type >
//ID_INLINE int idList<type>::FindNull( void ) const {
//	int i;

//	for( i = 0; i < this.num; i++ ) {
//		if ( this.list[ i ] == NULL ) {
//			return i;
//		}
//	}

//	// Not found
//	return -1;
//}

///*
//================
//idList<type>::IndexOf

//Takes a pointer to an element in the list and returns the index of the element.
//This is NOT a guarantee that the object is really in the list. 
//Function will assert in debug builds if pointer is outside the bounds of the list,
//but remains silent in release builds.
//================
//*/
//template< class type >
//ID_INLINE int idList<type>::IndexOf( type const *objptr ) const {
//	int index;

//	index = objptr - this.list;

//	assert( index >= 0 );
//	assert( index < this.num );

//	return index;
//}

/*
================
idList<type>::RemoveIndex

Removes the element at the specified index and moves all data following the element down to fill in the gap.
The number of elements in the list is reduced by one.  Returns false if the index is outside the bounds of the list.
Note that the element is not destroyed, so any memory used by it may not be freed until the destruction of the list.
================
*/
//template< class type >
	RemoveIndex ( /*int */index: number ): boolean {
		var /*int */i: number;

		assert( this.list != null );
		assert( index >= 0 );
		assert( index < this.num );

		if ( ( index < 0 ) || ( index >= this.num ) ) {
			return false;
		}

		this.num--;
		for ( i = index; i < this.num; i++ ) {
			this.list[i] = this.list[i + 1];
		}

		return true;
	}

///*
//================
//idList<type>::Remove

//Removes the element if it is found within the list and moves all data following the element down to fill in the gap.
//The number of elements in the list is reduced by one.  Returns false if the data is not found in the list.  Note that
//the element is not destroyed, so any memory used by it may not be freed until the destruction of the list.
//================
//*/
//template< class type >
//ID_INLINE bool idList<type>::Remove( type const & obj ) {
//	int index;

//	index = FindIndex( obj );
//	if ( index >= 0 ) {
//		return RemoveIndex( index );
//	}
	
//	return false;
//}

/*
================
idList<type>::Sort

Performs a qsort on the list using the supplied comparison function.  Note that the data is merely moved around the
list, so any pointers to data within the list may no longer be valid.
================
*/
//template< class type >
    /*Sort( compare:(a:idStr,b:idStr)=>number ):void
Sort( compare:(a:string,b:string)=>number ):void
Sort( compare:(a:any,b:any)=>number ):void {*/

Sort( compare:(a:idStr,b:idStr)=>number ):void {
	if ( !this[0] /*.list*/ ) {
		return;
	}
	//typedef int cmp_c(const void *, const void *);

	//cmp_c *vCompare = (cmp_c *)compare;
	//qsort( ( void * )this.list, ( size_t )this.num, sizeof( type ), vCompare );

    this["length"] = this.num;
    this["splice"] = [].splice;
    this["sort"] = [].sort;
    this["sort"](compare);
}

///*
//================
//idList<type>::SortSubSection

//Sorts a subsection of the list.
//================
//*/
//template< class type >
//ID_INLINE void idList<type>::SortSubSection( int startIndex, int endIndex, cmp_t *compare ) {
//	if ( !this[0] /*.list*/ ) {
//		return;
//	}
//	if ( startIndex < 0 ) {
//		startIndex = 0;
//	}
//	if ( endIndex >= this.num ) {
//		endIndex = this.num - 1;
//	}
//	if ( startIndex >= endIndex ) {
//		return;
//	}
//	typedef int cmp_c(const void *, const void *);

//	cmp_c *vCompare = (cmp_c *)compare;
//	qsort( ( void * )( &this.list[startIndex] ), ( size_t )( endIndex - startIndex + 1 ), sizeof( type ), vCompare );
//}

/*
================
idList<type>::Swap

Swaps the contents of two lists
================
*/
//template< class type >
Swap( other:idList<type> ):void {
    for( var i = 0; i < this.num; i++ ) {
        delete this[i];
    }

    for( var i = 0; i < other.num; i++ ) {
        this[i] = other[i];
    }

	idSwap( this, "num", other, "num" );
	idSwap( this, "size", other, "size" );
	idSwap( this, "granularity", other, "granularity" );
	//idSwap( this, "list", other, "list" );
}

//#endif /* !__LIST_H__ */
}