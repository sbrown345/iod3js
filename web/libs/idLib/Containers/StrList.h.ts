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

////#ifndef __STRLIST_H__
////#define __STRLIST_H__

/////*
////===============================================================================

////	idStrList

////===============================================================================
////*/


////typedef idList<idStr> idStrList;
////typedef idList<idStr*> idStrPtrList;
//var idStrPtr = idStr;

class idStrList extends idList<idStr> {

	constructor ( ) {
		super( idStr, true );
	}

/////*
////================
////idListSortCompare<idStrPtr>

////Compares two pointers to strings. Used to sort a list of string pointers alphabetically in idList<idStr>::Sort.
////================
////*/
////template<>
////ID_INLINE int idListSortCompare<idStrPtr>( const idStrPtr *a, const idStrPtr *b ) {
////	return ( *a ).Icmp( **b );
////}

/*
================
idStrList::Sort

Sorts the list of strings alphabetically. Creates a list of pointers to the actual strings and sorts the
pointer list. Then copies the strings into another list using the ordered list of pointers.
================
*/
//template<>
	Sort ( /*cmp_t *compare */ compare: ( a: idStr, b: idStr ) => number = null ): void {
		var /*int */i: number;

		if ( !this.num ) {
			return;
		}

		var other = new idList<idStr>( idStr );
		var pointerList = new idList<idStr /*Ptr*/>( idStr, false, 16, true );

		pointerList.SetNum( this.num );
		for ( i = 0; i < this.num; i++ ) {
			pointerList[i] = this[i];
		}

		pointerList.Sort ( );

		other.SetNum( this.num );
		other.SetGranularity( this.granularity );
		for ( i = 0; i < other.Num ( ); i++ ) {
			other[i].equals( pointerList[i] );
		}

		this.Swap( other );
	}

/////*
////================
////idStrList::SortSubSection

////Sorts a subsection of the list of strings alphabetically.
////================
////*/
////template<>
////ID_INLINE void idStrList::SortSubSection( int startIndex, int endIndex, cmp_t *compare ) {
////	int i, s;

////	if ( !this.num ) {
////		return;
////	}
////	if ( startIndex < 0 ) {
////		startIndex = 0;
////	}
////	if ( endIndex >= this.num ) {
////		endIndex = this.num - 1;
////	}
////	if ( startIndex >= endIndex ) {
////		return;
////	}

////	idList<idStr>		other;
////	idList<idStrPtr>	pointerList;

////	s = endIndex - startIndex + 1;
////	other.SetNum( s );
////	pointerList.SetNum( s );
////	for( i = 0; i < s; i++ ) {
////		other[ i ] = ( *this )[ startIndex + i ];
////		pointerList[ i ] = &other[ i ];
////	}

////	pointerList.Sort();

////	for( i = 0; i < s; i++ ) {
////		(*this)[ startIndex + i ] = *pointerList[ i ];
////	}
////}

/*
================
idStrList::Size
================
*/
	Size ( ): number {
		var s: number;
		var i: number;

		s = sizeof( this );
		for ( i = 0; i < this.Num ( ); i++ ) {
			s += this[i].Size ( );
		}

		return s;
	}

}


/*
===============================================================================

	idStrList path sorting

===============================================================================
*/

/*
================
idListSortComparePaths

//Compares two pointers to strings. Used to sort a list of string pointers alphabetically in idList<idStr>::Sort.
//================
*/
//template<class idStrPtr>
function idListSortComparePaths( ):(a:idStr,b:idStr)=>number {
	return function (a:idStr,b:idStr):number {return ( /*  **/a ).IcmpPath( /* ** */b.data );};
}

/*
================
idStrListSortPaths

Sorts the list of path strings alphabetically and makes sure folders come first.
================
*/
function idStrListSortPaths( list:idStrList  ):void {
	var /*int*/ i:number;

	if ( !list.Num() ) {
		return;
	}

	var other = new idList<idStr>( idStr );
	var	pointerList = new idList<idStr/*Ptr*/>( idStr );

	pointerList.SetNum( list.Num() );
	for( i = 0; i < list.Num(); i++ ) {
		pointerList[ i ] = /*&*/list[ i ];
	}
    
	pointerList.Sort( idListSortComparePaths(/*idStrPtr*/) );

	other.SetNum( list.Num() );
	other.SetGranularity( list.GetGranularity() );
	for( i = 0; i < other.Num(); i++ ) {
		other[ i ] = /* * */pointerList[ i ];
	}

	list.Swap( other );
}

////#endif /* !__STRLIST_H__ */