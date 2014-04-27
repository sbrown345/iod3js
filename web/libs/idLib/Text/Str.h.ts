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

////#ifndef __STR_H__
////#define __STR_H__

/*
===============================================================================

	Character string

===============================================================================
*/

////// these library functions should not be used for cross platform compatibility
////#define strcmp			idStr::Cmp		// use_idStr_Cmp
////#define strncmp			use_idStr_Cmpn

////#if defined( StrCmpN )
////#undef StrCmpN
////#endif
////#define StrCmpN			use_idStr_Cmpn

////#if defined( strcmpi )
////#undef strcmpi
////#endif
////#define strcmpi			use_idStr_Icmp

////#if defined( StrCmpI )
////#undef StrCmpI
////#endif
////#define StrCmpI			use_idStr_Icmp

////#if defined( StrCmpNI )
////#undef StrCmpNI
////#endif
////#define StrCmpNI		use_idStr_Icmpn

////#define stricmp			idStr::Icmp		// use_idStr_Icmp
////#define _stricmp		use_idStr_Icmp
////#define strcasecmp		use_idStr_Icmp
////#define strnicmp		use_idStr_Icmpn
////#define _strnicmp		use_idStr_Icmpn
////#define _memicmp		use_idStr_Icmpn
////#define snprintf		use_idStr_snPrintf
////#define _snprintf		use_idStr_snPrintf
////#define vsnprintf		use_idStr_vsnPrintf
////#define _vsnprintf		use_idStr_vsnPrintf

////class idVec4;

////#ifndef FILE_HASH_SIZE
var FILE_HASH_SIZE = 1024;
////#endif

// color escape character
var C_COLOR_ESCAPE			= '^';
var C_COLOR_DEFAULT			= '0';
var C_COLOR_RED				= '1';
var C_COLOR_GREEN			= '2';
var C_COLOR_YELLOW			= '3';
var C_COLOR_BLUE			= '4';
var C_COLOR_CYAN			= '5';
var C_COLOR_MAGENTA			= '6';
var C_COLOR_WHITE			= '7';
var C_COLOR_GRAY			= '8';
var C_COLOR_BLACK			= '9';

// color escape string
var S_COLOR_DEFAULT				="^0";
var S_COLOR_RED					="^1";
var S_COLOR_GREEN				="^2";
var S_COLOR_YELLOW				="^3";
var S_COLOR_BLUE				="^4";
var S_COLOR_CYAN				="^5";
var S_COLOR_MAGENTA				="^6";
var S_COLOR_WHITE				="^7";
var S_COLOR_GRAY				="^8";
var S_COLOR_BLACK				="^9";

////// make idStr a multiple of 16 bytes long
////// don't make too large to keep memory requirements to a minimum
////const int STR_ALLOC_BASE			= 20;
////const int STR_ALLOC_GRAN			= 32;

////typedef enum {
////	MEASURE_SIZE = 0,
////	MEASURE_BANDWIDTH
////} Measure_t;

class idStr implements ITrackedObject {
	refAddress: number;
	trackObject(): void {
		// it is added manually because not every string needs to be tracked
	}

	constructor ( );
	constructor ( str: idStr );
	constructor ( str: boolean );
	constructor ( str: string );
	constructor ( str: number );
	constructor ( str: string, start: number, end: number );
	constructor ( val?: any, start?: number, end?: number ) {
		this.Init ( );

		if (arguments.length === 1) {
			if ( typeof val === "boolean" ) {
				this.data = val ? '1' : '0';
			} else {
				this.data = val + ""; //.toUint8Array ( );
			}

			this.len = this.data.length;
		} else if ( arguments.length === 3 ) {
			this.data = ( val + "" ).substring( start, end );
			this.len = this.data.length;
		}
	}

	toString ( ): string {
		return this.data;
	}

	copy ( dest: idStr = null ): idStr {
		dest = dest || new idStr;
		dest.opEquals( this );
		return dest;
	}

	memset0 ( ): void {
		this.Clear ( );
	}

////public:
////						idStr( );
////						idStr( const idStr &text );
////						idStr( const idStr &text, int start, int end );
////						idStr( text:string );
////						idStr( text:string, int start, int end );
////						explicit idStr( const bool b );
////						explicit idStr( const char c );
////						explicit idStr( const int i );
////						explicit idStr( const unsigned u );
////						explicit idStr( const float f );
////						~idStr( );

////	size_t				Size( ) const;
////	const char *		c_str( ) const;
////	operator			const char *( ) const;
////	operator			const char *( );

////	char				operator[]( int index ) const;
////	char &				operator[]( int index );

////	void				operator=( const idStr &text );
////	void				operator=( text:string );

////	friend idStr		operator+( const idStr &a, const idStr &b );
////	friend idStr		operator+( const idStr &a, const char *b );
////	friend idStr		operator+( const char *a, const idStr &b );

////	friend idStr		operator+( const idStr &a, const float b );
////	friend idStr		operator+( const idStr &a, const int b );
////	friend idStr		operator+( const idStr &a, const unsigned b );
////	friend idStr		operator+( const idStr &a, const bool b );
////	friend idStr		operator+( const idStr &a, const char b );

////	idStr &				operator+=( const idStr &a );
////	idStr &				operator+=( const char *a );
////	idStr &				operator+=( const float a );
////	idStr &				operator+=( const char a );
////	idStr &				operator+=( const int a );
////	idStr &				operator+=( const unsigned a );
////	idStr &				operator+=( const bool a );

////						// case sensitive compare
////	friend bool			operator==( const idStr &a, const idStr &b );
////	friend bool			operator==( const idStr &a, const char *b );
////	friend bool			operator==( const char *a, const idStr &b );

////						// case sensitive compare
////	friend bool			operator!=( const idStr &a, const idStr &b );
////	friend bool			operator!=( const idStr &a, const char *b );
////	friend bool			operator!=( const char *a, const idStr &b );

////						// case sensitive compare
////	int					Cmp( text:string ) const;
////	int					Cmpn( text:string, int n ) const;
////	int					CmpPrefix( text:string ) const;

////						// case insensitive compare
////	int					Icmp( text:string ) const;
////	int					Icmpn( text:string, int n ) const;
////	int					IcmpPrefix( text:string ) const;

////						// case insensitive compare ignoring color
////	int					IcmpNoColor( text:string ) const;

////						// compares paths and makes sure folders come first
////	int					IcmpPath( text:string ) const;
////	int					IcmpnPath( text:string, int n ) const;
////	int					IcmpPrefixPath( text:string ) const;

////	int					Length( ) const;
////	int					Allocated( ) const;
////	void				Empty( );
////	bool				IsEmpty( ) const;
////	void				Clear( );
////	void				Append( const char a );
////	void				Append( const idStr &text );
////	void				Append( text:string );
////	void				Append( text:string, int len );
////	void				Insert( const char a, int index );
////	void				Insert( text:string, int index );
////	void				ToLower( );
////	void				ToUpper( );
////	bool				IsNumeric( ) const;
////	bool				IsColor( ) const;
////	bool				HasLower( ) const;
////	bool				HasUpper( ) const;
////	int					LengthWithoutColors( ) const;
////	idStr &				RemoveColors( );
////	void				CapLength( int );
////	void				Fill( const char ch, int newlen );

////	int					Find( const char c, int start = 0, int end = -1 ) const;
////	int					Find( text:string, bool casesensitive = true, int start = 0, int end = -1 ) const;
////	bool				Filter( const char *filter, bool casesensitive ) const;
////	int					Last( const char c ) const;						// return the index to the last occurance of 'c', returns -1 if not found
////	const char *		Left( int len, idStr &result ) const;			// store the leftmost 'len' characters in the result
////	const char *		Right( int len, idStr &result ) const;			// store the rightmost 'len' characters in the result
////	const char *		Mid( int start, int len, idStr &result ) const;	// store 'len' characters starting at 'start' in result
////	idStr				Left( int len ) const;							// return the leftmost 'len' characters
////	idStr				Right( int len ) const;							// return the rightmost 'len' characters
////	idStr				Mid( int start, int len ) const;				// return 'len' characters starting at 'start'
////	void				StripLeading( const char c );					// strip char from front as many times as the char occurs
////	void				StripLeading( const char *string );				// strip string from front as many times as the string occurs
////	bool				StripLeadingOnce( const char *string );			// strip string from front just once if it occurs
////	void				StripTrailing( const char c );					// strip char from end as many times as the char occurs
////	void				StripTrailing( const char *string );			// strip string from end as many times as the string occurs
////	bool				StripTrailingOnce( const char *string );		// strip string from end just once if it occurs
////	void				Strip( const char c );							// strip char from front and end as many times as the char occurs
////	void				Strip( const char *string );					// strip string from front and end as many times as the string occurs
////	void				StripTrailingWhitespace( );				// strip trailing white space characters
////	idStr &				StripQuotes( );							// strip quotes around string
////	void				Replace( const char *old, const char *nw );

////	// file name methods
////	int					FileNameHash( ) const;						// hash key for the filename (skips extension)
////	idStr &				BackSlashesToSlashes( );					// convert slashes
////	idStr &				SetFileExtension( const char *extension );		// set the given file extension
////	idStr &				StripFileExtension( );						// remove any file extension
////	idStr &				StripAbsoluteFileExtension( );				// remove any file extension looking from front (useful if there are multiple .'s)
////	idStr &				DefaultFileExtension( const char *extension );	// if there's no file extension use the default
////	idStr &				DefaultPath( const char *basepath );			// if there's no path use the default
////	void				AppendPath( text:string );					// append a partial path
////	idStr &				StripFilename( );							// remove the filename from a path
////	idStr &				StripPath( );								// remove the path from the filename
////	void				ExtractFilePath( idStr &dest ) const;			// copy the file path to another string
////	void				ExtractFileName( idStr &dest ) const;			// copy the filename to another string
////	void				ExtractFileBase( idStr &dest ) const;			// copy the filename minus the extension to another string
////	void				ExtractFileExtension( idStr &dest ) const;		// copy the file extension to another string
////	bool				CheckExtension( const char *ext );

////	// char * methods to replace library functions
////	static int			Length( const char *s );
////	static char *		ToLower( char *s );
////	static char *		ToUpper( char *s );
////	static bool			IsNumeric( const char *s );
////	static bool			IsColor( const char *s );
////	static bool			HasLower( const char *s );
////	static bool			HasUpper( const char *s );
////	static int			LengthWithoutColors( const char *s );
////	static char *		RemoveColors( char *s );
////	static int			Cmp( const char *s1, const char *s2 );
////	static int			Cmpn( const char *s1, const char *s2, int n );
////	static int			Icmp( const char *s1, const char *s2 );
////	static int			Icmpn( const char *s1, const char *s2, int n );
////	static int			IcmpNoColor( const char *s1, const char *s2 );
////	static int			IcmpPath( const char *s1, const char *s2 );			// compares paths and makes sure folders come first
////	static int			IcmpnPath( const char *s1, const char *s2, int n );	// compares paths and makes sure folders come first
////	static void			Append( char *dest, int size, const char *src );
////	static void			Copynz( char *dest, const char *src, int destsize );
////	static int			snPrintf( char *dest, int size, const char *fmt, ... ) id_attribute((format(printf,3,4)));
////	static int			vsnPrintf( char *dest, int size, const char *fmt, va_list argptr );
////	static int			FindChar( const char *str, const char c, int start = 0, int end = -1 );
////	static int			FindText( const char *str, text:string, bool casesensitive = true, int start = 0, int end = -1 );
////	static bool			Filter( const char *filter, name:string, bool casesensitive );
////	static void			StripMediaName( name:string, idStr &mediaName );
////	static bool			CheckExtension( name:string, const char *ext );
////	static const char *	FloatArrayToString( const float *array, const int length, const int precision );

////	// hash keys
////	static int			Hash( const char *string );
////	static int			Hash( const char *string, int length );
////	static int			IHash( const char *string );					// case insensitive
////	static int			IHash( const char *string, int length );		// case insensitive

////	// character methods
////	static char			ToLower( char c );
////	static char			ToUpper( char c );
////	static bool			CharIsPrintable( int c );
////	static bool			CharIsLower( int c );
////	static bool			CharIsUpper( int c );
////	static bool			CharIsAlpha( int c );
////	static bool			CharIsNumeric( int c );
////	static bool			CharIsNewLine( char c );
////	static bool			CharIsTab( char c );
////	static int			ColorIndex( int c );
////	static idVec4 &		ColorForIndex( int i );

////	friend int			sprintf( idStr &dest, const char *fmt, ... );
////	friend int			vsprintf( idStr &dest, const char *fmt, va_list ap );

////	void				ReAllocate( int amount, bool keepold );				// reallocate string data buffer
////	void				FreeData( );									// free allocated string memory

////						// format value in the given measurement with the best unit, returns the best unit
////	int					BestUnit( const char *format, float value, Measure_t measure );
////						// format value in the requested unit and measurement
////	void				SetUnit( const char *format, float value, int unit, Measure_t measure );

////	static void			InitMemory( );
////	static void			ShutdownMemory( );
////	static void			PurgeMemory( );
////	static void			ShowMemoryUsage_f( const idCmdArgs &args );

////	int					DynamicMemoryUsed() const;
////	static idStr		FormatNumber( int number );

//protected:
	/*int	*/
	len: number;
/*		char *				*/
	data: string;

	alloced:number/*int*/;
////	char				baseBuffer[ STR_ALLOC_BASE ];

////	void				Init( );										// initialize string using base buffer
////	void				EnsureAlloced( int amount, bool keepold = true );	// ensure string data buffer is large anough
////};

////char *					va( const char *fmt, ... ) id_attribute((format(printf,1,2)));


	EnsureAlloced ( /*int */amount: number, keepold: boolean = true ): void {
		//if ( amount > this.alloced ) {
		//	this.ReAllocate( amount, keepold );
		//}
	}

	Init ( ): void {
		this.len = 0;
		//alloced = STR_ALLOC_BASE;
		//this.data = baseBuffer;
		//this.data[ 0 ] = '\0';
		this.data = "";
		//#ifdef ID_DEBUG_UNINITIALIZED_MEMORY
		//	memset( baseBuffer, 0, sizeof( baseBuffer ) );
		//#endif
	}

////ID_INLINE idStr::idStr( ) {
////	Init();
////}

////ID_INLINE idStr::idStr( const idStr &text ) {
////	var/*int */l:number;

////	Init();
////	l = text.Length();
////	EnsureAlloced( l + 1 );
////	strcpy( this.data, text.data );
////	len = l;
////}

////ID_INLINE idStr::idStr( const idStr &text, int start, int end ) {
////	var/*int*/i:number;
////	var/*int */l:number;

////	Init();
////	if ( end > text.Length() ) {
////		end = text.Length();
////	}
////	if ( start > text.Length() ) {
////		start = text.Length();
////	} else if ( start < 0 ) {
////		start = 0;
////	}

////	l = end - start;
////	if ( l < 0 ) {
////		l = 0;
////	}

////	EnsureAlloced( l + 1 );

////	for ( i = 0; i < l; i++ ) {
////		this.data[ i ] = text[ start + i ];
////	}

////	this.data[ l ] = '\0';
////	len = l;
////}

////ID_INLINE idStr::idStr( text:string ) {
////	var/*int */l:number;

////	Init();
////	if ( text ) {
////		l = strlen( text );
////		EnsureAlloced( l + 1 );
////		strcpy( this.data, text );
////		len = l;
////	}
////}

////ID_INLINE idStr::idStr( text:string, int start, int end ) {
////	var/*int*/i:number;
////	int l = strlen( text );

////	Init();
////	if ( end > l ) {
////		end = l;
////	}
////	if ( start > l ) {
////		start = l;
////	} else if ( start < 0 ) {
////		start = 0;
////	}

////	l = end - start;
////	if ( l < 0 ) {
////		l = 0;
////	}

////	EnsureAlloced( l + 1 );

////	for ( i = 0; i < l; i++ ) {
////		this.data[ i ] = text[ start + i ];
////	}

////	this.data[ l ] = '\0';
////	len = l;
////}

////ID_INLINE idStr::idStr( const bool b ) {
////	Init();
////	EnsureAlloced( 2 );
////	this.data[ 0 ] = b ? '1' : '0';
////	this.data[ 1 ] = '\0';
////	len = 1;
////}

////ID_INLINE idStr::idStr( const char c ) {
////	Init();
////	EnsureAlloced( 2 );
////	this.data[ 0 ] = c;
////	this.data[ 1 ] = '\0';
////	len = 1;
////}

////ID_INLINE idStr::idStr( const int i ) {
////	char text[ 64 ];
////	var/*int */l:number;

////	Init();
////	l = sprintf( text, "%d", i );
////	EnsureAlloced( l + 1 );
////	strcpy( this.data, text );
////	len = l;
////}

////ID_INLINE idStr::idStr( const unsigned u ) {
////	char text[ 64 ];
////	var/*int */l:number;

////	Init();
////	l = sprintf( text, "%u", u );
////	EnsureAlloced( l + 1 );
////	strcpy( this.data, text );
////	len = l;
////}

////ID_INLINE idStr::idStr( const float f ) {
////	char text[ 64 ];
////	var/*int */l:number;

////	Init();
////	l = idStr::snPrintf( text, sizeof( text ), "%f", f );
////	while( l > 0 && text[l-1] == '0' ) text[--l] = '\0';
////	while( l > 0 && text[l-1] == '.' ) text[--l] = '\0';
////	EnsureAlloced( l + 1 );
////	strcpy( this.data, text );
////	len = l;
////}

	destructor(): void {
		objectTracker.removeObject(this.refAddress);
		//this.FreeData ( ); // breaks on load...
	}

	Size ( ): number {
		return this.data.length; //sizeof( *this ) + Allocated();
	}

	c_str ( ): string {
		return this.data;
	}

////ID_INLINE idStr::operator const char *( ) {
////	return c_str();
////}

////ID_INLINE idStr::operator const char *( ) const {
////	return c_str();
////}

////ID_INLINE char idStr::operator[]( int index ) const {
////	assert( ( index >= 0 ) && ( index <= len ) );
////	return this.data[ index ];
////}

////ID_INLINE char &idStr::operator[]( int index ) {
////	assert( ( index >= 0 ) && ( index <= len ) );
////	return this.data[ index ];
////}

////ID_INLINE void idStr::operator=( const idStr &text ) {
////	var/*int */l:number;

////	l = text.Length();
////	EnsureAlloced( l + 1, false );
////	memcpy( this.data, text.data, l );
////	this.data[l] = '\0';
////	len = l;
////}

////ID_INLINE idStr operator+( const idStr &a, const idStr &b ) {
////	idStr result( a );
////	result.Append( b );
////	return result;
////}

////ID_INLINE idStr operator+( const idStr &a, const char *b ) {
////	idStr result( a );
////	result.Append( b );
////	return result;
////}

////ID_INLINE idStr operator+( const char *a, const idStr &b ) {
////	idStr result( a );
////	result.Append( b );
////	return result;
////}

////ID_INLINE idStr operator+( const idStr &a, const bool b ) {
////	idStr result( a );
////	result.Append( b ? "true" : "false" );
////	return result;
////}

////ID_INLINE idStr operator+( const idStr &a, const char b ) {
////	idStr result( a );
////	result.Append( b );
////	return result;
////}

////ID_INLINE idStr operator+( const idStr &a, const float b ) {
////	char	text[ 64 ];
////	idStr	result( a );

////	sprintf( text, "%f", b );
////	result.Append( text );

////	return result;
////}

////ID_INLINE idStr operator+( const idStr &a, const int b ) {
////	char	text[ 64 ];
////	idStr	result( a );

////	sprintf( text, "%d", b );
////	result.Append( text );

////	return result;
////}

////ID_INLINE idStr operator+( const idStr &a, const unsigned b ) {
////	char	text[ 64 ];
////	idStr	result( a );

////	sprintf( text, "%u", b );
////	result.Append( text );

////	return result;
////}

////ID_INLINE idStr &idStr::operator+=( const float a ) {
////	char text[ 64 ];

////	sprintf( text, "%f", a );
////	Append( text );

////	return *this;
////}

////ID_INLINE idStr &idStr::operator+=( const int a ) {
////	char text[ 64 ];

////	sprintf( text, "%d", a );
////	Append( text );

////	return *this;
////}

////ID_INLINE idStr &idStr::operator+=( const unsigned a ) {
////	char text[ 64 ];

////	sprintf( text, "%u", a );
////	Append( text );

////	return *this;
////}

////ID_INLINE idStr &idStr::operator+=( const idStr &a ) {
////	Append( a );
////	return *this;
////}

////ID_INLINE idStr &idStr::operator+=( const char *a ) {
////	Append( a );
////	return *this;
////}

////ID_INLINE idStr &idStr::operator+=( const char a ) {
////	Append( a );
////	return *this;
////}

////ID_INLINE idStr &idStr::operator+=( const bool a ) {
////	Append( a ? "true" : "false" );
////	return *this;
////}

	equalTo ( other: idStr ): boolean
	equalTo ( other: string ): boolean
	equalTo ( other: any ): boolean {
		return idStr.equalTo( this, other );
	}

	static equalTo ( a: idStr, b: idStr ): boolean
	static equalTo ( a: idStr, b: string ): boolean
	static equalTo ( a: string, b: idStr ): boolean
	static equalTo ( a: any, b: any ): boolean {
		var aStr: string = idStr.getString( a ),
			bStr: string = idStr.getString( b );
		return aStr === bStr;
	}

	notEqualTo ( other: idStr ): boolean
	notEqualTo ( other: string ): boolean
	notEqualTo ( other: any ): boolean {
		return !idStr.equalTo( this, other );
	}

	Cmp ( text: string ): number;
	Cmp ( text: idStr ): number;
	Cmp ( text: any ): number {
		return idStr.Cmp( this, text );
	}

	Cmpn ( text: string, /*int*/ n: number ): number {
		return idStr.Cmpn( this.data, text, n );
	}

////ID_INLINE int idStr::CmpPrefix( text:string ) const {
////	assert( text );
////	return idStr::Cmpn( this.data, text, strlen( text ) );
////}

	Icmp ( text: string ): number;
	Icmp ( text: idStr ): number;
	Icmp ( text: any ): number {
		assert( text !== null && text !== undefined );
		return idStr.Icmp( this, text );
	}

	Icmpn(text: string, n:number): number;
	Icmpn(text: idStr, n: number): number;
	Icmpn(text: any, n: number): number {
		assert(text !== null && text !== undefined);
		return idStr.Icmpn(this, text, n);
	}

//ID_INLINE int idStr::IcmpPrefix( text:string ) const {
//	assert( text );
//	return idStr::Icmpn( this.data, text, strlen( text ) );
//}	

////ID_INLINE int idStr::IcmpNoColor( text:string ) const {
////	assert( text );
////	return idStr::IcmpNoColor( this.data, text );
////}

	IcmpPath ( /*const char * */text: string ): number {
		//assert( text );
		return idStr.IcmpPath( this.data, text );
	}

////ID_INLINE int idStr::IcmpnPath( text:string, int n ) const {
////	assert( text );
////	return idStr::IcmpnPath( this.data, text, n );
////}

////ID_INLINE int idStr::IcmpPrefixPath( text:string ) const {
////	assert( text );
////	return idStr::IcmpnPath( this.data, text, strlen( text ) );
////}

	Length ( ): number {
		return this.data.length; //this.len;
	}

	Allocated ( ): number {
		//if ( this.data != this.baseBuffer ) {
		//	return this.alloced;
		//} else {
			return 0;
		//}
	}

	Empty ( ): void {
		this.EnsureAlloced( 1 );
		this.data = ""; //this.data[ 0 ] = '\0';
		this.len = 0;
	}

////ID_INLINE bool idStr::IsEmpty( ) const {
////	return ( idStr::Cmp( this.data, "" ) == 0 );
////}

	Clear ( ): void {
		this.FreeData ( );
		this.Init ( );
	}

////ID_INLINE void idStr::Append( const char a ) {
////	EnsureAlloced( len + 2 );
////	this.data[ len ] = a;
////	len++;
////	this.data[ len ] = '\0';
////}

////ID_INLINE void idStr::Append( const idStr &text ) {
////	int newLen;
////	var/*int*/i:number;

////	newLen = len + text.Length();
////	EnsureAlloced( newLen + 1 );
////	for ( i = 0; i < text.len; i++ ) {
////		this.data[ len + i ] = text[ i ];
////	}
////	len = newLen;
////	this.data[ len ] = '\0';
////}

	Append ( text: string, l: number = null ): void {
		if (typeof text != "string") {
			debugger;
			throw "not a string";
		}

		if ( arguments.length == 1 ) {
			if ( text ) {
				this.data += text;
				this.len = this.data.length;
			}
		} else if ( arguments.length == 2 ) {
			var newLen: number;
			var i: number;

			if ( text && l ) {
				newLen = this.len + l;
				//this.EnsureAlloced( newLen + 1 );
				//for ( i = 0; text[i] && i < l; i++ ) {
				//	this.data[this.len + i] = text[i];
				//}
				this.data += text.substring( 0, l );
				this.len = newLen;
				//this.data[this.len] = '\0';
			}
		}

	}

////ID_INLINE void idStr::Append( text:string, int l ) {
////	int newLen;
////	var/*int*/i:number;

////	if ( text && l ) {
////		newLen = len + l;
////		EnsureAlloced( newLen + 1 );
////		for ( i = 0; text[ i ] && i < l; i++ ) {
////			this.data[ len + i ] = text[ i ];
////		}
////		len = newLen;
////		this.data[ len ] = '\0';
////	}
////}

////ID_INLINE void idStr::Insert( const char a, int index ) {
////	int i, l;

////	if ( index < 0 ) {
////		index = 0;
////	} else if ( index > len ) {
////		index = len;
////	}

////	l = 1;
////	EnsureAlloced( len + l + 1 );
////	for ( i = len; i >= index; i-- ) {
////		this.data[i+l] = this.data[i];
////	}
////	this.data[index] = a;
////	len++;
////}

////ID_INLINE void idStr::Insert( text:string, int index ) {
////	int i, l;

////	if ( index < 0 ) {
////		index = 0;
////	} else if ( index > len ) {
////		index = len;
////	}

////	l = strlen( text );
////	EnsureAlloced( len + l + 1 );
////	for ( i = len; i >= index; i-- ) {
////		this.data[i+l] = this.data[i];
////	}
////	for ( i = 0; i < l; i++ ) {
////		this.data[index+i] = text[i];
////	}
////	len += l;
////}

	ToLower ( ): void {
		this.data = this.data.toLowerCase ( );
	}

	ToUpper ( ): void {
		this.data = this.data.toUpperCase ( );
	}

	IsNumeric ( ): boolean {
		return idStr.IsNumeric( this.data );
	}

	IsColor ( ): boolean {
		return idStr.IsColor( this.data );
	}

////ID_INLINE bool idStr::HasLower( ) const {
////	return idStr::HasLower( this.data );
////}

////ID_INLINE bool idStr::HasUpper( ) const {
////	return idStr::HasUpper( this.data );
////}

	RemoveColors ( ): idStr {
		this.data = idStr.RemoveColors( this.data );
		this.len = idStr.Length( this.data );
		return this;
	}

////ID_INLINE int idStr::LengthWithoutColors( ) const {
////	return idStr::LengthWithoutColors( this.data );
////}

	CapLength ( /*int */newlen: number ): void {
		if ( this.len <= newlen ) {
			return;
		}
		this.data = this.data.substring( 0, newlen );
		this.len = newlen;
	}

////ID_INLINE void idStr::Fill( const char ch, int newlen ) {
////	EnsureAlloced( newlen + 1 );
////	len = newlen;
////	memset( this.data, ch, len );
////	this.data[ len ] = 0;
////}

//ID_INLINE int idStr::Find( const char c, int start, int end ) const {
//	if ( end == -1 ) {
//		end = len;
//	}
//	return idStr::FindChar( this.data, c, start, end );
//}

	Find ( text: string, casesensitive = true, /*int */start = 0, /*int */end = -1 ): number {
		if ( end == -1 ) {
			end = this.len;
		}
		return idStr.FindText( this.data, text, casesensitive, start, end );
	}

////ID_INLINE bool idStr::Filter( const char *filter, bool casesensitive ) const {
////	return idStr::Filter( filter, this.data, casesensitive );
////}

	Left_Result ( /*int*/ len: number, result: idStr ): string {
		return this.Mid_Result( 0, len, result );
	}

	Right_Result ( /*int */len: number, result: idStr ): string {
		if ( len >= this.Length ( ) ) {
			result.data = this.data;
			return result.data;
		}
		return this.Mid_Result( this.Length ( ) - len, len, result );
	}

	Left ( /*int */len: number ): idStr {
		return this.Mid( 0, len );
	}

	Right ( /*int */len: number ): idStr {
		if ( len >= this.Length ( ) ) {
			return this;
		}
		return this.Mid( this.Length ( ) - len, len );
	}

////ID_INLINE void idStr::Strip( const char c ) {
////	StripLeading( c );
////	StripTrailing( c );
////}

	Strip ( $string: string ): void {
		this.StripLeading( $string );
		this.StripTrailing( $string );
	}

////ID_INLINE bool idStr::CheckExtension( const char *ext ) {
////	return idStr::CheckExtension( this.data, ext );
////}

	static Length ( s: string ): number
	static Length ( s: Uint8Array ): number
	static Length ( s: any ): number {
		if ( typeof s === "string" ) {
			return s.length;
		}
		var i: number;
		for ( i = 0; i < s.length; i++ ) {
			if ( s[i] === 0 ) {
				return i;
			}
		}

		return i;
	}

////ID_INLINE char *idStr::ToLower( char *s ) {
////	for ( int i = 0; s[i]; i++ ) {
////		if ( CharIsUpper( s[i] ) ) {
////			s[i] += ( 'a' - 'A' );
////		}
////	}
////	return s;
////}

////ID_INLINE char *idStr::ToUpper( char *s ) {
////	for ( int i = 0; s[i]; i++ ) {
////		if ( CharIsLower( s[i] ) ) {
////			s[i] -= ( 'a' - 'A' );
////		}
////	}
////	return s;
////}

	static Hash ( $string: idStr ): number;
	static Hash ( $string: string ): number;
	static Hash ( $string: any ): number {
		var /*int */i: number, hash = 0;
		var strIdx = 0;
		$string = idStr.getIdStr( $string );
		for ( i = 0; $string.c( strIdx ); i++ ) {
			hash += ( $string.c( strIdx++ ) ) * ( i + 119 );
		}
		return hash;
	}

	static IHash ( $string: idStr ): number;
	static IHash ( $string: idStr, /*int */length?: number ): number {
		var /*int*/ i: number, hash = 0;
		var idx = 0;
		$string = idStr.getIdStr( $string );
		if ( typeof ( length ) === "number" ) {
			for ( i = 0; i < length; i++ ) {
				hash += ( $string.c( idx++ ) ) * ( i + 119 );
			}
			return hash;
		} else {
			for ( i = 0; $string.c( idx ); i++ ) {
				hash += idStr.ToLower( $string.v( idx++ ) ).charCodeAt( 0 ) * ( i + 119 );
			}
			return hash;
		}
	}

	static IsColor(s: string): boolean {
		assert( s.length === 1 );
		return ( s[0] == C_COLOR_ESCAPE && s[1] != '\0' && s[1] != ' ' );
	}

	static ToLower ( /*char */c: string ): string {
		assert( c.length == 1 );
		//if ( c <= 'Z' && c >= 'A' ) {
		//	return ( c + ( 'a' - 'A' ) );
		//}
		return c.toLowerCase ( );
	}

	static ToUpper ( /*char*/ c: string ): string {
		assert( c.length == 1 );
		//if ( c >= 'a' && c <= 'z' ) {
		//	return ( c - ( 'a' - 'A' ) );
		//}
		return c.toUpperCase ( );
	}

	static CharIsPrintable ( /*int */c: string ): boolean {
		// test for regular ascii and western European high-ascii chars
		return ( c.charCodeAt( 0 ) >= 0x20 && c.charCodeAt( 0 ) <= 0x7E ) || ( c.charCodeAt( 0 ) >= 0xA1 && c.charCodeAt( 0 ) <= 0xFF );
	}

////ID_INLINE bool idStr::CharIsLower( int c ) {
////	// test for regular ascii and western European high-ascii chars
////	return ( c >= 'a' && c <= 'z' ) || ( c >= 0xE0 && c <= 0xFF );
////}

////ID_INLINE bool idStr::CharIsUpper( int c ) {
////	// test for regular ascii and western European high-ascii chars
////	return ( c <= 'Z' && c >= 'A' ) || ( c >= 0xC0 && c <= 0xDF );
////}

////ID_INLINE bool idStr::CharIsAlpha( int c ) {
////	// test for regular ascii and western European high-ascii chars
////	return ( ( c >= 'a' && c <= 'z' ) || ( c >= 'A' && c <= 'Z' ) ||
////			 ( c >= 0xC0 && c <= 0xFF ) );
////}

	static CharIsNumeric ( /*int */c: number ): boolean {
		return ( c <= '9'.charCodeAt( 0 ) && c >= '0'.charCodeAt( 0 ) );
	}

////ID_INLINE bool idStr::CharIsNewLine( char c ) {
////	return ( c == '\n' || c == '\r' || c == '\v' );
////}

////ID_INLINE bool idStr::CharIsTab( char c ) {
////	return ( c == '\t' );
////}

	static ColorIndex ( /*int*/ c: number ): number {
		return ( c & 15 );
	}

////ID_INLINE int idStr::DynamicMemoryUsed() const {
////	return ( this.data == baseBuffer ) ? 0 : alloced;
////}

////#endif /* !__STR_H__ */


	// Str.cpp:


////#include "precompiled.h"
////#pragma hdrstop

////#if !defined( ID_REDIRECT_NEWDELETE ) && !defined( MACOS_X )
////	#define USE_STRING_DATA_ALLOCATOR
////#endif

////#ifdef USE_STRING_DATA_ALLOCATOR
////static idDynamicBlockAlloc<char, 1<<18, 128>	stringDataAllocator;
////#endif

	private static g_color_table: idVec4[/*16*/];

	static Init ( ): void {
		idStr.g_color_table = [
			new idVec4( 0.0, 0.0, 0.0, 1.0 ),
			new idVec4( 1.0, 0.0, 0.0, 1.0 ), // S_COLOR_RED
			new idVec4( 0.0, 1.0, 0.0, 1.0 ), // S_COLOR_GREEN
			new idVec4( 1.0, 1.0, 0.0, 1.0 ), // S_COLOR_YELLOW
			new idVec4( 0.0, 0.0, 1.0, 1.0 ), // S_COLOR_BLUE
			new idVec4( 0.0, 1.0, 1.0, 1.0 ), // S_COLOR_CYAN
			new idVec4( 1.0, 0.0, 1.0, 1.0 ), // S_COLOR_MAGENTA
			new idVec4( 1.0, 1.0, 1.0, 1.0 ), // S_COLOR_WHITE
			new idVec4( 0.5, 0.5, 0.5, 1.0 ), // S_COLOR_GRAY
			new idVec4( 0.0, 0.0, 0.0, 1.0 ), // S_COLOR_BLACK
			new idVec4( 0.0, 0.0, 0.0, 1.0 ),
			new idVec4( 0.0, 0.0, 0.0, 1.0 ),
			new idVec4( 0.0, 0.0, 0.0, 1.0 ),
			new idVec4( 0.0, 0.0, 0.0, 1.0 ),
			new idVec4( 0.0, 0.0, 0.0, 1.0 ),
			new idVec4( 0.0, 0.0, 0.0, 1.0 )
		];
	}

////const char *units[2][4] =
////{
////	{ "B", "KB", "MB", "GB" },
////	{ "B/s", "KB/s", "MB/s", "GB/s" }
////};

/*
============
idStr::ColorForIndex
============
*/
	static ColorForIndex ( /*int */i: number ): idVec4 {
		return idStr.g_color_table[i & 15];
	}

/////*
////============
////idStr::ReAllocate
////============
////*/
////void idStr::ReAllocate( int amount, bool keepold ) {
////	char	*newbuffer;
////	int		newsize;
////	int		mod;

////	//assert( this.data );
////	assert( amount > 0 );

////	mod = amount % STR_ALLOC_GRAN;
////	if ( !mod ) {
////		newsize = amount;
////	}
////	else {
////		newsize = amount + STR_ALLOC_GRAN - mod;
////	}
////	alloced = newsize;

////#ifdef USE_STRING_DATA_ALLOCATOR
////	newbuffer = stringDataAllocator.Alloc( alloced );
////#else
////	newbuffer = new char[ alloced ];
////#endif
////	if ( keepold && this.data ) {
////		this.data[ len ] = '\0';
////		strcpy( newbuffer, this.data );
////	}

////	if ( this.data && this.data != baseBuffer ) {
////#ifdef USE_STRING_DATA_ALLOCATOR
////		stringDataAllocator.Free( this.data );
////#else
////		delete [] this.data;
////#endif
////	}

////	this.data = newbuffer;
////}

/*
============
idStr::FreeData
============
*/
	FreeData ( ): void {
//	if ( this.data && this.data != this.baseBuffer ) {
////#ifdef USE_STRING_DATA_ALLOCATOR
//		stringDataAllocator.Free( this.data );
////#else
//		//delete[] this.data;
////#endif
//		this.data = this.baseBuffer;
//	}
		this.data = "";
	}

/*
============
idStr::operator=
============
*/
	opEquals ( text: string ): void
	opEquals ( text: idStr ): void
	opEquals ( text: any ): void {
		var l: number /*int*/;
		//int diff;
		//var/*int*/i:number;

		//if ( !text ) {
		//	// safe behaviour if NULL
		//	EnsureAlloced( 1, false );
		//	this.data[ 0 ] = '\0';
		//	len = 0;
		//	return;
		//}

		//if ( text == this.data ) {
		//	return; // copying same thing
		//}

		//// check if we're aliasing
		//if ( text >= this.data && text <= this.data + len ) {
		//	diff = text - this.data;

		//	assert( strlen( text ) < (unsigned)len );

		//	for ( i = 0; text[ i ]; i++ ) {
		//		this.data[ i ] = text[ i ];
		//	}

		//	this.data[ i ] = '\0';

		//	len -= diff;

		//	return;
		//}

		text = idStr.getString( text );
		l = strlen( text );
		//EnsureAlloced( l + 1, false );
		//strcpy( this.data, text );
		this.data = text;
		this.len = l;
	}

/*
============
idStr::FindChar

returns -1 if not found otherwise the index of the char
============
*/
    static FindChar ( str: string, c: string, /*int */start: number=0, /*int */end: number=-1 ): number {
        var /*int */i: number;
        assert( c.length === 1 );

        if ( end == -1 ) {
            end = strlen( str ) - 1;
        }
        for ( i = start; i <= end; i++ ) {
            if ( str[i] == c ) {
                return i;
            }
        }
        return -1;
    }

/*
============
idStr::FindText

returns -1 if not found otherwise the index of the text
============
*/
	static FindText ( str: string, text: string, casesensitive: boolean, /*int */start: number, /*int */end: number ): number {
		var l: number, i: number, j: number;

		if ( end == -1 ) {
			end = strlen( str );
		}
		l = end - strlen( text );
		for ( i = start; i <= l; i++ ) {
			if ( casesensitive ) {
				for ( j = 0; text[j]; j++ ) {
					if ( str[i + j] != text[j] ) {
						break;
					}
				}
			} else {
				for ( j = 0; text[j]; j++ ) {
					if ( toupper( str[i + j] ) != toupper( text[j] ) ) {
						break;
					}
				}
			}
			if ( !text[j] ) {
				return i;
			}
		}
		return -1;
	}

/////*
////============
////idStr::Filter

////Returns true if the string conforms the given filter.
////Several metacharacter may be used in the filter.

////*          match any string of zero or more characters
////?          match any single character
////[abc...]   match any of the enclosed characters; a hyphen can
////           be used to specify a range (e.g. a-z, A-Z, 0-9)

////============
////*/
////bool idStr::Filter( const char *filter, name:string, bool casesensitive ) {
////	idStr buf;
////	int i, found, index;

////	while(*filter) {
////		if (*filter == '*') {
////			filter++;
////			buf.Empty();
////			for (i = 0; *filter; i++) {
////				if ( *filter == '*' || *filter == '?' || (*filter == '[' && *(filter+1) != '[') ) {
////					break;
////				}
////				buf += *filter;
////				if ( *filter == '[' ) {
////					filter++;
////				}
////				filter++;
////			}
////			if ( buf.Length() ) {
////				index = idStr(name).Find( buf.c_str(), casesensitive );
////				if ( index == -1 ) {
////					return false;
////				}
////				name += index + strlen(buf);
////			}
////		}
////		else if (*filter == '?') {
////			filter++;
////			name++;
////		}
////		else if (*filter == '[') {
////			if ( *(filter+1) == '[' ) {
////				if ( *name != '[' ) {
////					return false;
////				}
////				filter += 2;
////				name++;
////			}
////			else {
////				filter++;
////				found = false;
////				while(*filter && !found) {
////					if (*filter == ']' && *(filter+1) != ']') {
////						break;
////					}
////					if (*(filter+1) == '-' && *(filter+2) && (*(filter+2) != ']' || *(filter+3) == ']')) {
////						if (casesensitive) {
////							if (*name >= *filter && *name <= *(filter+2)) {
////								found = true;
////							}
////						}
////						else {
////							if ( ::toupper(*name) >= ::toupper(*filter) && ::toupper(*name) <= ::toupper(*(filter+2)) ) {
////								found = true;
////							}
////						}
////						filter += 3;
////					}
////					else {
////						if (casesensitive) {
////							if (*filter == *name) {
////								found = true;
////							}
////						}
////						else {
////							if ( ::toupper(*filter) == ::toupper(*name) ) {
////								found = true;
////							}
////						}
////						filter++;
////					}
////				}
////				if (!found) {
////					return false;
////				}
////				while(*filter) {
////					if ( *filter == ']' && *(filter+1) != ']' ) {
////						break;
////					}
////					filter++;
////				}
////				filter++;
////				name++;
////			}
////		}
////		else {
////			if (casesensitive) {
////				if (*filter != *name) {
////					return false;
////				}
////			}
////			else {
////				if ( ::toupper(*filter) != ::toupper(*name) ) {
////					return false;
////				}
////			}
////			filter++;
////			name++;
////		}
////	}
////	return true;
////}

/////*
////=============
////idStr::StripMediaName

////  makes the string lower case, replaces backslashes with forward slashes, and removes extension
////=============
////*/
////void idStr::StripMediaName( name:string, idStr &mediaName ) {
////	char c;

////	mediaName.Empty();

////	for ( c = *name; c; c = *(++name) ) {
////		// truncate at an extension
////		if ( c == '.' ) {
////			break;
////		}
////		// convert backslashes to forward slashes
////		if ( c == '\\' ) {
////			mediaName.Append( '/' );
////		} else {
////			mediaName.Append( idStr::ToLower( c ) );
////		}
////	}
////}

/////*
////=============
////idStr::CheckExtension
////=============
////*/
////bool idStr::CheckExtension( name:string, const char *ext ) {
////	const char *s1 = name + Length( name ) - 1;
////	const char *s2 = ext + Length( ext ) - 1;
////	int c1, c2, d;

////	do {
////		c1 = *s1--;
////		c2 = *s2--;

////		d = c1 - c2;
////		while( d ) {
////			if ( c1 <= 'Z' && c1 >= 'A' ) {
////				d += ('a' - 'A');
////				if ( !d ) {
////					break;
////				}
////			}
////			if ( c2 <= 'Z' && c2 >= 'A' ) {
////				d -= ('a' - 'A');
////				if ( !d ) {
////					break;
////				}
////			}
////			return false;
////		}
////	} while( s1 > name && s2 > ext );

////	return ( s1 >= name );
////}

/*
=============
idStr::FloatArrayToString
=============
*/

	static index = 0;
	static str = multiDimArray <Uint8Array>(Uint8Array, 4, 16384);
	static FloatArrayToString ( array: Float32Array, /*int */length: number, /*int */precision: number ): string {
		var /*int */i: number, n: number;
		var format = new Uint8Array( 16 ), s: Uint8Array; //char format[16], *s;

		// use an array of string so that multiple calls won't collide
		s = idStr.str[idStr.index];
		idStr.index = ( idStr.index + 1 ) & 3;

		idStr.snPrintf( format, sizeof( format ), "%%.%df", precision );
		n = idStr.snPrintf( s, sizeof( idStr.str[0] ), format.toString ( ), array[0] );
		if ( precision > 0 ) {
			while ( n > 0 && s[n - 1] == '0'.charCodeAt( 0 ) ) s[--n] = 0;
			while ( n > 0 && s[n - 1] == '.'.charCodeAt( 0 ) ) s[--n] = 0;
		}
		idStr.snPrintf( format, sizeof( format ), " %%.%df", precision );
		for ( i = 1; i < length; i++ ) {
			n += idStr.snPrintf( s.subarray( n ), sizeof( idStr.str[0] ) - n, format.toString ( ), array[i] );
			if ( precision > 0 ) {
				while ( n > 0 && s[n - 1] == '0'.charCodeAt( 0 ) ) s[--n] = 0;
				while ( n > 0 && s[n - 1] == '.'.charCodeAt( 0 ) ) s[--n] = 0;
			}
		}
		return s.toString ( );
	}

/////*
////============
////idStr::Last

////returns -1 if not found otherwise the index of the char
////============
////*/
////int idStr::Last( const char c ) const {
////	var/*int*/i:number;

////	for( i = Length(); i > 0; i-- ) {
////		if ( this.data[ i - 1 ] == c ) {
////			return i - 1;
////		}
////	}

////	return -1;
////}

/////*
////============
////idStr::StripLeading
////============
////*/
////void idStr::StripLeading( const char c ) {
////	while( this.data[ 0 ] == c ) {
////		memmove( &data[ 0 ], &data[ 1 ], len );
////		len--;
////	}
////}

/*
============
idStr::StripLeading
============
*/
StripLeading( $string:string ):void {
	var/*int */l:number;
	l = strlen($string );
	if ( l > 0 ) {
		while (!this.Cmpn($string, l ) ) {
			this.data = this.data.substr( l );//memmove(this.data, this.data + l, this.len - l + 1 );
			this.len -= l;
		}
	}
}

/*
============
idStr::StripLeadingOnce
============
*/
	StripLeadingOnce ( $string: string ): boolean {
		var /*int */l: number;

		var data = this.data.toUint8Array();
		debugger;
		l = strlen( $string );
		if ( ( l > 0 ) && !this.Cmpn( $string, l ) ) {
			//todo memmove( data, data + l, this.len - l + 1 );
			this.len -= l;
			return true;
		}


		this.data = data.toString();
		return false;
	}

/*
============
idStr::StripLeading
============
*/
StripTrailing( $string:string ):void {
	var /*int */l:number;

	var data = this.data.toUint8Array ( );

	l = strlen($string );
	if ( l > 0 ) {
		//while ((len >= l) && !Cmpn(string, data + len - l, l)) {
		while ((this.len >= l) && !idStr.Cmpn($string, data.subarray(this.len - l).toString(), l)) {
			this.len -= l;
			data[this.len] = 0;
		}
	}

	this.data = data.toString();
	assert( this.len == this.data.length );
}

/////*
////============
////idStr::StripTrailingOnce
////============
////*/
////bool idStr::StripTrailingOnce( $string:string) {
////	var/*int */l:number;

////	l = strlen( string );
////	if ( ( l > 0 ) && ( len >= l ) && !Cmpn( string, this.data + len - l, l ) ) {
////		len -= l;
////		this.data[len] = '\0';
////		return true;
////	}
////	return false;
////}

/*
============
idStr::Replace
============
*/
	Replace ( old: string, nw: string ): void {

    // https://stackoverflow.com/questions/1144783/replacing-all-occurrences-of-a-string-in-javascript
		function escapeRegExp ( str: string ): string {
			return str.replace( /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&" );
		}

		this.data = this.data.replace( new RegExp( escapeRegExp( old ), 'g' ), nw );
	}

/*
============
idStr::Mid
============
*/
	Mid_Result ( /*int */start: number, /*int */len: number, result: idStr ): string {
		var /*int */i: number;

		result.Empty ( );

		i = this.Length ( );
		if ( i == 0 || len <= 0 || start >= i ) {
			return null;
		}

		if ( start + len >= i ) {
			len = i - start;
		}

		result.Append( /*&*/this.data.substr( start ), len );
		return result.data;
	}

/*
============
idStr::Mid
============
*/
	Mid ( /*int */start: number, /*int */len: number ): idStr {
		var /*int */i: number;
		var result = new idStr;

		i = this.Length ( );
		if ( i == 0 || len <= 0 || start >= i ) {
			return result;
		}

		if ( start + len >= i ) {
			len = i - start;
		}

		result.Append( /* & data[start]*/this.data.substr( start ), len );
		return result;
	}

/*
============
idStr::StripTrailingWhitespace
============
*/
	StripTrailingWhitespace ( ): void {
		var /*int */i: number;
		for ( i = this.Length ( ); i > 0 && ( this.data.charCodeAt( i - 1 ) <= ' '.charCodeAt( 0 ) ); i-- ) {
			this.len--;
		}
		this.data = this.data.substr( 0, this.len );
	}
/*
============
idStr::StripQuotes

Removes the quotes from the beginning and end of the string
============
*/
	StripQuotes ( ): idStr {
		if ( this.data[0] != '\"' ) {
			return this;
		}

		// Remove the trailing quote first
		if ( this.data[this.len - 1] == '\"' ) {
			this.len--;
		}

		// Strip the leading quote now
		this.len--;

		this.data = this.data.substr( 1, this.len );
		
		return this;
	}

/////*
////=====================================================================

////  filename methods

////=====================================================================
////*/

	/*
	============
	idStr::FileNameHash
	============
	*/
	FileNameHash ( ): number {
		var /*int		*/i = 0;
		var /*long	*/hash = 0;
		var /*char	*/letter = '';

		while ( this.data[i] ) {
			letter = idStr.ToLower( this.data[i] );
			if ( letter == '.' ) {
				break; // don't include extension
			}
			if ( letter == '\\' ) {
				letter = '/';
			}
			hash += /*(long)*/( letter ).charCodeAt( 0 ) * ( i + 119 );
			i++;
		}
		hash &= ( FILE_HASH_SIZE - 1 );
		return hash;
	}

	/*
	============
	idStr::BackSlashesToSlashes
	============
	*/
	BackSlashesToSlashes ( ): idStr {
		this.data = this.data.replace( /\\/g, "/" );
		return this;
	}

/*
============
idStr::SetFileExtension
============
*/
	SetFileExtension ( extension: string ): idStr {
		this.StripFileExtension ( );
		if ( extension[0] != '.' ) {
			this.Append( '.' );
		}
		this.Append( extension );
		return this;
	}

/*
============
idStr::StripFileExtension
============
*/
	StripFileExtension ( ): idStr {
		var i: number;

		for ( i = this.len - 1; i >= 0; i-- ) {
			if ( this.data[i] == '.' ) {
				this.data = this.data.substring( 0, i );
				this.len = i;
				break;
			}
		}
		return this;
	}

/////*
////============
////idStr::StripAbsoluteFileExtension
////============
////*/
////idStr &idStr::StripAbsoluteFileExtension( ) {
////	var/*int*/i:number;

////	for ( i = 0; i < len; i++ ) {
////		if ( this.data[i] == '.' ) {
////			this.data[i] = '\0';
////			len = i;
////			break;
////		}
////	}

////	return *this;
////}

/*
==================
idStr::DefaultFileExtension
==================
*/
DefaultFileExtension( extension:string ):idStr {
	var i:number;

	// do nothing if the string already has an extension
	for ( i = this.len-1; i >= 0; i-- ) {
		if ( this.data[i] == '.' ) {
			return this;
		}
	}
	if ( extension[0] != '.' ) {
		this.Append( '.' );
	}
	this.Append( extension );
	return this;
}

/////*
////==================
////idStr::DefaultPath
////==================
////*/
////idStr &idStr::DefaultPath( const char *basepath ) {
////	if ( ( ( *this )[ 0 ] == '/' ) || ( ( *this )[ 0 ] == '\\' ) ) {
////		// absolute path location
////		return *this;
////	}

////	*this = basepath + *this;
////	return *this;
////}

/////*
////====================
////idStr::AppendPath
////====================
////*/
////void idStr::AppendPath( text:string ) {
////	int pos;
////	int i = 0;

////	if ( text && text[i] ) {
////		pos = len;
////		EnsureAlloced( len + strlen( text ) + 2 );

////		if ( pos ) {
////			if ( this.data[ pos-1 ] != '/' ) {
////				this.data[ pos++ ] = '/';
////			}
////		}
////		if ( text[i] == '/' ) {
////			i++;
////		}

////		for ( ; text[ i ]; i++ ) {
////			if ( text[ i ] == '\\' ) {
////				this.data[ pos++ ] = '/';
////			} else {
////				this.data[ pos++ ] = text[ i ];
////			}
////		}
////		len = pos;
////		this.data[ pos ] = '\0';
////	}
////}

/*
==================
idStr::StripFilename
==================
*/
	StripFilename ( ): idStr {
		var /*int */pos: number;

		pos = this.Length ( ) - 1;
		while ( ( pos > 0 ) && ( ( this.data )[pos] != '/' ) && ( ( this.data )[pos] != '\\' ) ) {
			pos--;
		}

		if ( pos < 0 ) {
			pos = 0;
		}

		this.CapLength( pos );
		return this;
	}

/*
==================
idStr::StripPath
==================
*/
	StripPath ( ): idStr {
		var /*int */pos: number;

		pos = this.Length ( );
		while ( ( pos > 0 ) && ( ( this.data )[pos - 1] != '/' ) && ( ( this.data )[pos - 1] != '\\' ) ) {
			pos--;
		}

		this.data = this.Right( this.Length ( ) - pos ).data;
		this.len = this.data.length;
		return this;
	}

/////*
////====================
////idStr::ExtractFilePath
////====================
////*/
////void idStr::ExtractFilePath( idStr &dest ) const {
////	int pos;

////	//
////	// back up until a \ or the start
////	//
////	pos = Length();
////	while( ( pos > 0 ) && ( ( *this )[ pos - 1 ] != '/' ) && ( ( *this )[ pos - 1 ] != '\\' ) ) {
////		pos--;
////	}

////	Left( pos, dest );
////}

/////*
////====================
////idStr::ExtractFileName
////====================
////*/
////void idStr::ExtractFileName( idStr &dest ) const {
////	int pos;

////	//
////	// back up until a \ or the start
////	//
////	pos = Length() - 1;
////	while( ( pos > 0 ) && ( ( *this )[ pos - 1 ] != '/' ) && ( ( *this )[ pos - 1 ] != '\\' ) ) {
////		pos--;
////	}

////	Right( Length() - pos, dest );
////}

/////*
////====================
////idStr::ExtractFileBase
////====================
////*/
////void idStr::ExtractFileBase( idStr &dest ) const {
////	int pos;
////	int start;

////	//
////	// back up until a \ or the start
////	//
////	pos = Length() - 1;
////	while( ( pos > 0 ) && ( ( *this )[ pos - 1 ] != '/' ) && ( ( *this )[ pos - 1 ] != '\\' ) ) {
////		pos--;
////	}

////	start = pos;
////	while( ( pos < Length() ) && ( ( *this )[ pos ] != '.' ) ) {
////		pos++;
////	}

////	Mid( start, pos - start, dest );
////}

/*
====================
idStr::ExtractFileExtension
====================
*/
	ExtractFileExtension ( dest: idStr ): void {
		var pos: number;

		//
		// back up until a . or the start
		//
		pos = this.Length ( ) - 1;
		while ( ( pos > 0 ) && ( ( this.data )[pos - 1] != '.' ) ) {
			pos--;
		}

		if ( !pos ) {
			// no extension
			dest.Empty ( );
		} else {
			this.Right_Result( this.Length ( ) - pos, dest );
		}
	}


/*
=====================================================================

  char * methods to replace library functions

=====================================================================
*/

/*
============
idStr::IsNumeric

Checks a string to see if it contains only numerical values.
============
*/
static IsNumeric( s:string ):boolean {
	var /*int		*/i:number;
	var dot:boolean;
    var sIdx = 0;

	if ( s.charAt(sIdx) == '-' ) {
	    s = s.substr( 1 );
	}

	dot = false;
	for ( i = 0; s[i]; i++ ) {
		if ( !isdigit( s[i] ) ) {
			if ( ( s[ i ] == '.' ) && !dot ) {
				dot = true;
				continue;
			}
			return false;
		}
	}

	return true;
}

/////*
////============
////idStr::HasLower

////Checks if a string has any lowercase chars
////============
////*/
////bool idStr::HasLower( const char *s ) {
////	if ( !s ) {
////		return false;
////	}

////	while ( *s ) {
////		if ( CharIsLower( *s ) ) {
////			return true;
////		}
////		s++;
////	}

////	return false;
////}

/////*
////============
////idStr::HasUpper

////Checks if a string has any uppercase chars
////============
////*/
////bool idStr::HasUpper( const char *s ) {
////	if ( !s ) {
////		return false;
////	}

////	while ( *s ) {
////		if ( CharIsUpper( *s ) ) {
////			return true;
////		}
////		s++;
////	}

////	return false;
////}

/*
================
idStr::Cmp
================
*/
	static Cmp ( s1: idStr, s2: idStr ): number;
	static Cmp ( s1: string, s2: string ): number;
	static Cmp ( s1: any, s2: any ): number {
		var str1 = idStr.getString( s1 );
		var str2 = idStr.getString( s2 );

		if ( str1 == str2 ) {
			return 0;
		}

		if ( str1 > str2 ) {
			return 1;
		}

		return -1;
	}

/*
================
idStr::Cmpn
================
*/
    static Cmpn ( s1: idStr, s2: idStr, n: number ): number;
    static Cmpn ( s1: string, s2: string, n: number ): number;
    static Cmpn ( s1: any, s2: any, n: number ): number {
        var str1 = idStr.getString( s1 ).substr( 0, n );
        var str2 = idStr.getString( s2 ).substr( 0, n );

        if ( str1 == str2 ) {
            return 0;
        }

        if ( str1 > str2 ) {
            return 1;
        }

        return -1;
    }

/*
================
idStr::Icmp
================
*/
	static Icmp ( s1: string, s2: string ): number
	static Icmp ( s1: idStr, s2: idStr ): number
	static Icmp ( s1: string, s2: idStr ): number
	static Icmp ( s1: idStr, s2: string ): number
	static Icmp ( s1: any, s2: any ): number {
		var ls1 = this.getString( s1 ).toLowerCase ( );
		var ls2 = this.getString( s2 ).toLowerCase ( );

		if ( ls1 == ls2 ) {
			return 0;
		}

		if ( ls1 > ls2 ) {
			return 1;
		}

		return -1;
	}

/*
================
idStr::Icmpn
================
*/
	static Icmpn ( s1: string, s2: string, n: number ): number
	static Icmpn ( s1: idStr, s2: idStr, n: number ): number
	static Icmpn ( s1: string, s2: idStr, n: number ): number
	static Icmpn ( s1: idStr, s2: string, n: number ): number
	static Icmpn ( s1: any, s2: any, n: number ): number {
		var ls1 = this.getString( s1 ).toLowerCase ( );
		var ls2 = this.getString( s2 ).toLowerCase ( );

		ls1 = ls1.substr( 0, n );
		ls2 = ls2.substr( 0, n );

		if ( ls1 == ls2 ) {
			return 0;
		}

		if ( ls1 > ls2 ) {
			return 1;
		}

		return -1;
	}

/*
================
idStr::IcmpPath
================
*/
static IcmpPath( /*const char **/s1:string, /*const char **/s2:string ):number {
	var/*int*/ c1:number, c2:number, d:number;

//#if 0
////#if !defined( _WIN32 )
//	common.Printf( "WARNING: IcmpPath used on a case-sensitive filesystem?\n" );
//#endif
    var s1Idx = 0;
    var s2Idx = 0;
	do {
		c1 = s1.charCodeAt(s1Idx++) || 0;
		c2 = s2.charCodeAt(s2Idx++) || 0;

		d = c1 - c2;
		while( d ) {
			if ( c1 <= 'Z'.charCodeAt(0) && c1 >= 'A'.charCodeAt(0) ) {
				d += ('a'.charCodeAt(0) - 'A'.charCodeAt(0));
				if ( !d ) {
					break;
				}
			}
			if ( c1 == '\\'.charCodeAt(0) ) {
				d += ('/'.charCodeAt(0) - '\\'.charCodeAt(0));
				if ( !d ) {
					break;
				}
			}
			if ( c2 <= 'Z'.charCodeAt(0) && c2 >= 'A'.charCodeAt(0) ) {
				d -= ('a'.charCodeAt(0) - 'A'.charCodeAt(0));
				if ( !d ) {
					break;
				}
			}
			if ( c2 == '\\'.charCodeAt(0) ) {
				d -= ('/'.charCodeAt(0) - '\\'.charCodeAt(0));
				if ( !d ) {
					break;
				}
			}
			// make sure folders come first
			while( c1 ) {
				if ( c1 == '/'.charCodeAt(0) || c1 == '\\'.charCodeAt(0) ) {
					break;
				}
				c1 = s1.charCodeAt(s1Idx++) || 0;
			}
			while( c2 ) {
				if ( c2 == '/'.charCodeAt(0) || c2 == '\\'.charCodeAt(0) ) {
					break;
				}
				c2 = s2.charCodeAt(s2Idx++) || 0;
			}
			if ( c1 && !c2 ) {
				return -1;
			} else if ( !c1 && c2 ) {
				return 1;
			}
			// same folder depth so use the regular compare
			//return ( INTSIGNBITNOTSET( d ) << 1 ) - 1;
			return d < 0 ? -1 : 1;
		}
	} while( c1 );

	return 0;
}

/////*
////================
////idStr::IcmpnPath
////================
////*/
////int idStr::IcmpnPath( const char *s1, const char *s2, int n ) {
////	int c1, c2, d;

////#if 0
//////#if !defined( _WIN32 )
////	common.Printf( "WARNING: IcmpPath used on a case-sensitive filesystem?\n" );
////#endif

////	assert( n >= 0 );

////	do {
////		c1 = *s1++;
////		c2 = *s2++;

////		if ( !n-- ) {
////			return 0;		// strings are equal until end point
////		}

////		d = c1 - c2;
////		while( d ) {
////			if ( c1 <= 'Z' && c1 >= 'A' ) {
////				d += ('a' - 'A');
////				if ( !d ) {
////					break;
////				}
////			}
////			if ( c1 == '\\' ) {
////				d += ('/' - '\\');
////				if ( !d ) {
////					break;
////				}
////			}
////			if ( c2 <= 'Z' && c2 >= 'A' ) {
////				d -= ('a' - 'A');
////				if ( !d ) {
////					break;
////				}
////			}
////			if ( c2 == '\\' ) {
////				d -= ('/' - '\\');
////				if ( !d ) {
////					break;
////				}
////			}
////			// make sure folders come first
////			while( c1 ) {
////				if ( c1 == '/' || c1 == '\\' ) {
////					break;
////				}
////				c1 = *s1++;
////			}
////			while( c2 ) {
////				if ( c2 == '/' || c2 == '\\' ) {
////					break;
////				}
////				c2 = *s2++;
////			}
////			if ( c1 && !c2 ) {
////				return -1;
////			} else if ( !c1 && c2 ) {
////				return 1;
////			}
////			// same folder depth so use the regular compare
////			return ( INTSIGNBITNOTSET( d ) << 1 ) - 1;
////		}
////	} while( c1 );

////	return 0;
////}

/*
=============
idStr::Copynz

Safe strncpy that ensures a trailing zero
=============
*/
	static Copynz ( /*char **/dest: Uint8Array, /*const char **/src: string, /*int */destsize: number ): void {
		if ( src === null || src === undefined ) {
			common.Warning( "idStr::Copynz: NULL src" );
			return;
		}
		if ( destsize < 1 ) {
			common.Warning( "idStr::Copynz: destsize < 1" );
			return;
		}
		strncpy( dest, src, destsize - 1 );
		dest[destsize - 1] = 0;
	}

/////*
////================
////idStr::Append

////  never goes past bounds or leaves without a terminating 0
////================
////*/
////void idStr::Append( char *dest, int size, const char *src ) {
////	int		l1;

////	l1 = strlen( dest );
////	if ( l1 >= size ) {
////		common.Error( "idStr::Append: already overflowed" );
////	}
////	idStr.Copynz( dest + l1, src, size - l1 );
////}

/////*
////================
////idStr::LengthWithoutColors
////================
////*/
////int idStr::LengthWithoutColors( const char *s ) {
////	int len;
////	const char *p;

////	if ( !s ) {
////		return 0;
////	}

////	len = 0;
////	p = s;
////	while( *p ) {
////		if ( idStr::IsColor( p ) ) {
////			p += 2;
////			continue;
////		}
////		p++;
////		len++;
////	}

////	return len;
////}

/*
================
idStr::RemoveColors
================
*/
	static RemoveColors ( $string: string ): string {
		var d = ""; //char *d;
		var s = 0; //char *s;
		var c: string;

		while ( ( c = $string[s] ) ) {
			if ( idStr.IsColor( c ) ) {
				s++;
			} else {
				d += c;
			}
			s++;
		}

		return $string;
	}

/*
================
idStr::snPrintf
================
*/
	static snPrintf ( dest: Uint8Array, /*int */size: number, fmt: string, ...args: any[] ): number {
		var /*int */len: number;

		var buffer = vsprintf( fmt, args );
		len = buffer.length;
		
		//if ( len >= sizeof( buffer ) ) {
		//	common.Error( "idStr::snPrintf: overflowed buffer" );
		//}
		//if ( len >= size ) {
		//	common.Warning( "idStr::snPrintf: overflow of %i in %i\n", len, size );
		//	len = size;
		//}

		idStr.Copynz( dest, buffer, size );
		return len;
	}

/*
============
idStr::vsnPrintf

vsnprintf portability:

C99 standard: vsnprintf returns the number of characters (excluding the trailing
'\0') which would have been written to the final string if enough space had been available
snprintf and vsnprintf do not write more than size bytes (including the trailing '\0')

win32: _vsnprintf returns the number of characters written, not including the terminating null character,
or a negative value if an output error occurs. If the number of characters to write exceeds count, then count 
characters are written and -1 is returned and no trailing '\0' is added.

idStr::vsnPrintf: always appends a trailing '\0', returns number of characters written (not including terminal \0)
or returns -1 on failure or if the buffer would be overflowed.
============
*/
	static vsnPrintf ( dest: Uint8Array, /*int */size: number, fmt: string, argptr: any[] /*va_list argptr */ ): number {
		var /*int */ret: number;

		var txt = vsprintf(fmt, argptr);
		for ( var i = 0; i < txt.length; i++ ) {
			dest[i] = txt.charCodeAt( i );
		}
		ret = txt.length;

//#ifdef _WIN32
//#undef _vsnprintf
//	ret = _vsnprintf( dest, size-1, fmt, argptr );
//#define _vsnprintf	use_idStr_vsnPrintf
//#else
//#undef vsnprintf
//	ret = vsnprintf( dest, size, fmt, argptr );
//#define vsnprintf	use_idStr_vsnPrintf
//#endif
		dest[size - 1] = 0;
		if ( ret < 0 || ret >= size ) {
			return -1;
		}
		return ret;
	}

/////*
////============
////sprintf

////Sets the value of the string using a printf interface.
////============
////*/
////int sprintf( idStr &string, const char *fmt, ... ) {
////	var/*int */l:number;
////	va_list argptr;
////	char buffer[32000];

////	va_start( argptr, fmt );
////	l = idStr::vsnPrintf( buffer, sizeof(buffer)-1, fmt, argptr );
////	va_end( argptr );
////	buffer[sizeof(buffer)-1] = '\0';

////	string = buffer;
////	return l;
////}

/////*
////============
////vsprintf

////Sets the value of the string using a vprintf interface.
////============
////*/
////int vsprintf( idStr &string, const char *fmt, va_list argptr ) {
////	var/*int */l:number;
////	char buffer[32000];

////	l = idStr::vsnPrintf( buffer, sizeof(buffer)-1, fmt, argptr );
////	buffer[sizeof(buffer)-1] = '\0';

////	string = buffer;
////	return l;
////}

///*
//============
//va

//does a varargs printf into a temp buffer
//NOTE: not thread safe
//============
//*/
//char *va( const char *fmt, ... ) {
// "va" is set this at bottom of file
//}
	
/////*
////============
////idStr::BestUnit
////============
////*/
////int idStr::BestUnit( const char *format, float value, Measure_t measure ) {
////	int unit = 1;
////	while ( unit <= 3 && ( 1 << ( unit * 10 ) < value ) ) {
////		unit++;
////	}
////	unit--;
////	value /= 1 << ( unit * 10 );
////	sprintf( *this, format, value );
////	*this += " ";
////	*this += units[ measure ][ unit ];
////	return unit;
////}

/////*
////============
////idStr::SetUnit
////============
////*/
////void idStr::SetUnit( const char *format, float value, int unit, Measure_t measure ) {
////	value /= 1 << ( unit * 10 );
////	sprintf( *this, format, value );
////	*this += " ";
////	*this += units[ measure ][ unit ];	
////}

/////*
////================
////idStr::InitMemory
////================
////*/
////void idStr::InitMemory( ) {
////#ifdef USE_STRING_DATA_ALLOCATOR
////	stringDataAllocator.Init();
////#endif
////}

/////*
////================
////idStr::ShutdownMemory
////================
////*/
////void idStr::ShutdownMemory( ) {
////#ifdef USE_STRING_DATA_ALLOCATOR
////	stringDataAllocator.Shutdown();
////#endif
////}

/////*
////================
////idStr::PurgeMemory
////================
////*/
////void idStr::PurgeMemory( ) {
////#ifdef USE_STRING_DATA_ALLOCATOR
////	stringDataAllocator.FreeEmptyBaseBlocks();
////#endif
////}

/////*
////================
////idStr::ShowMemoryUsage_f
////================
////*/
////void idStr::ShowMemoryUsage_f( const idCmdArgs &args ) {
////#ifdef USE_STRING_DATA_ALLOCATOR
////	common.Printf( "%6d KB string memory (%d KB free in %d blocks, %d empty base blocks)\n",
////		stringDataAllocator.GetBaseBlockMemory() >> 10, stringDataAllocator.GetFreeBlockMemory() >> 10,
////			stringDataAllocator.GetNumFreeBlocks(), stringDataAllocator.GetNumEmptyBaseBlocks() );
////#endif
////}

/////*
////================
////idStr::FormatNumber
////================
////*/
////struct formatList_t {
////	int			gran;
////	int			count;
////};

////// elements of list need to decend in size
////formatList_t formatList[] = {
////	{ 1000000000, 0 },
////	{ 1000000, 0 },
////	{ 1000, 0 }
////};

////int numFormatList = sizeof(formatList) / sizeof( formatList[0] );


////idStr idStr::FormatNumber( int number ) {
////	idStr string;
////	bool hit;

////	// reset
////	for ( int i = 0; i < numFormatList; i++ ) {
////		formatList_t *li = formatList + i;
////		li.count = 0;
////	}

////	// main loop
////	do {
////		hit = false;

////		for ( int i = 0; i < numFormatList; i++ ) {
////			formatList_t *li = formatList + i;

////			if ( number >= li.gran ) {
////				li.count++;
////				number -= li.gran;
////				hit = true;
////				break;
////			}
////		}
////	} while ( hit );

////	// print out
////	bool found = false;

////	for ( int i = 0; i < numFormatList; i++ ) {
////		formatList_t *li = formatList + i;

////		if ( li.count ) {
////			if ( !found ) {
////				string += va( "%i,", li.count );
////			} else {
////				string += va( "%3.3i,", li.count );
////			}
////			found = true;
////		}
////		else if ( found ) {
////			string += va( "%3.3i,", li.count );
////		}
////	}

////	if ( found ) {
////		string += va( "%3.3i", number );
////	}
////	else {
////		string += va( "%i", number );
////	}

////	// pad to proper size
////	int count = 11 - string.Length();

////	for ( int i = 0; i < count; i++ ) {
////		string.Insert( " ", 0 );
////	}

////	return string;
////}


// pointer helpers


	v ( offset: number = 0 ): string {
		return this.data[offset];
	}

	c ( offset: number = 0 ): number {
		return this.data.charCodeAt( offset ) || 0;
	}

	static getString ( stringOrIdStr: string ): string;
	static getString ( stringOrIdStr: idStr ): string;
	static getString ( stringOrIdStr: any ): string {
		return stringOrIdStr instanceof idStr ? stringOrIdStr.data : stringOrIdStr;
	}

	static getIdStr ( stringOrIdStr: string ): idStr;
	static getIdStr ( stringOrIdStr: idStr ): idStr;
	static getIdStr ( stringOrIdStr: any ): idStr {
		return stringOrIdStr instanceof idStr ? stringOrIdStr : new idStr(stringOrIdStr);
	}

}

Object.defineProperty( idStr.prototype, "0", {
	get: function ( ): number {
		return this.data[0];
	},
	set: function ( value: string ): void {
		throw "not used";
	},
	enumerable: false,
	configurable: false
} );

var va = sprintf;
