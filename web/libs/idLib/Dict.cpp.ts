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
////#include "precompiled.h"
////#pragma hdrstop
////
////idStrPool		idDict::globalKeys;
////idStrPool		idDict::globalValues;


/*
===============================================================================

Key/value dictionary

This is a dictionary class that tracks an arbitrary number of key / value
pair combinations. It is used for map entity spawning, GUI state management,
and other things.

Keys are compared case-insensitive.

Does not allocate memory until the first key/value pair is added.

===============================================================================
*/

class idKeyValue {
//	friend class idDict;

//public:
	GetKey ( ): idStr { return this.key; }
	GetValue ( ): idStr { return this.value; }

//	size_t				Allocated( ) const { return key.Allocated() + value.Allocated(); }
//	size_t				Size( ) const { return sizeof( *this ) + key.Size() + value.Size(); }

//	bool				operator==( const idKeyValue &kv ) const { return ( key == kv.key && value == kv.value ); }
	equalTo(kv: idKeyValue): boolean {
		return ( this.key.data == kv.key.data && this.value.data == kv.value.data );
	}


//private:
	key: idPoolStr;
	value: idPoolStr;

	copy ( dest: idKeyValue = null ): idKeyValue {
		dest = dest || new idKeyValue;
		dest.key = this.key;
		dest.value = this.value;
		return dest;
	}
}

class idDict {
////public:
////						idDict( );
////						idDict( const idDict &other );	// allow declaration with assignment
////						~idDict( );
////
////						// set the granularity for the index
////	void				SetGranularity( int granularity );
////						// set hash size
////	void				SetHashSize( int hashSize );
////						// clear existing key/value pairs and copy all key/value pairs from other
////	idDict &			operator=( const idDict &other );
////						// copy from other while leaving existing key/value pairs in place
////	void				Copy( const idDict &other );
////						// clear existing key/value pairs and transfer key/value pairs from other
////	void				TransferKeyValues( idDict &other );
////						// parse dict from parser
////	bool				Parse( idParser &parser );
////						// copy key/value pairs from other dict not present in this dict
////	void				SetDefaults( const idDict *dict );
////						// clear dict freeing up memory
////	void				Clear( );
////						// print the dict
////	void				Print() const;
////
////	size_t				Allocated( ) const;
////	size_t				Size( ) const { return sizeof( *this ) + Allocated(); }
////
////	void				Set( key:string, value:string );
////	void				SetFloat( key:string, float val );
////	void				SetInt( key:string, int val );
////	void				SetBool( key:string, bool val );
////	void				SetVector( key:string, const idVec3 &val );
////	void				SetVec2( key:string, const idVec2 &val );
////	void				SetVec4( key:string, const idVec4 &val );
////	void				SetAngles( key:string, const idAngles &val );
////	void				SetMatrix( key:string, const idMat3 &val );
////
////						// these return default values of 0.0, 0 and false
////	const char *		GetString( key:string, const char *defaultString = "" ) const;
////	float				GetFloat( key:string, const char *defaultString = "0" ) const;
////	int					GetInt( key:string, const char *defaultString = "0" ) const;
////	bool				GetBool( key:string, const char *defaultString = "0" ) const;
////	idVec3				GetVector( key:string, const char *defaultString = NULL ) const;
////	idVec2				GetVec2( key:string, const char *defaultString = NULL ) const;
////	idVec4				GetVec4( key:string, const char *defaultString = NULL ) const;
////	idAngles			GetAngles( key:string, const char *defaultString = NULL ) const;
////	idMat3				GetMatrix( key:string, const char *defaultString = NULL ) const;
////
////	bool				GetString( key:string, const char *defaultString, const char **out ) const;
////	bool				GetString( key:string, const char *defaultString, idStr &out ) const;
////	bool				GetFloat( key:string, const char *defaultString, float &out ) const;
////	bool				GetInt( key:string, const char *defaultString, int &out ) const;
////	bool				GetBool( key:string, const char *defaultString, bool &out ) const;
////	bool				GetVector( key:string, const char *defaultString, idVec3 &out ) const;
////	bool				GetVec2( key:string, const char *defaultString, idVec2 &out ) const;
////	bool				GetVec4( key:string, const char *defaultString, idVec4 &out ) const;
////	bool				GetAngles( key:string, const char *defaultString, idAngles &out ) const;
////	bool				GetMatrix( key:string, const char *defaultString, idMat3 &out ) const;
////
////	int					GetNumKeyVals( ) const;
////	const idKeyValue *	GetKeyVal( int index ) const;
////						// returns the key/value pair with the given key
////						// returns NULL if the key/value pair does not exist
////	const idKeyValue *	FindKey( key:string ) const;
////						// returns the index to the key/value pair with the given key
////						// returns -1 if the key/value pair does not exist
////	int					FindKeyIndex( key:string ) const;
////						// delete the key/value pair with the given key
////	void				Delete( key:string );
////						// finds the next key/value pair with the given key prefix.
////						// lastMatch can be used to do additional searches past the first match.
////	const idKeyValue *	MatchPrefix( const char *prefix, const idKeyValue *lastMatch = NULL ) const;
////						// randomly chooses one of the key/value pairs with the given key prefix and returns it's value
////	const char *		RandomPrefix( const char *prefix, idRandom &random ) const;
////
////	void				WriteToFileHandle( idFile *f ) const;
////	void				ReadFromFileHandle( idFile *f );
////
////						// returns a unique checksum for this dictionary's content
////	int					Checksum( ) const;
////
////	static void			Init( );
////	static void			Shutdown( );
////
////	static void			ShowMemoryUsage_f( const idCmdArgs &args );
////	static void			ListKeys_f( const idCmdArgs &args );
////	static void			ListValues_f( const idCmdArgs &args );
////
////private:
	args = new idList<idKeyValue>(idKeyValue);
	argHash = new idHashIndex;

	static globalKeys = new idStrPool;
	static globalValues  = new idStrPool;
////};

	constructor ( ) {
		this.args.SetGranularity( 16 );
		this.argHash.SetGranularity( 16 );
		this.argHash.Clear( 128, 16 );
	}

////ID_INLINE idDict::idDict( const idDict &other ) {
////	*this = other;
////}
////
	destructor ( ): void {
		this.Clear ( );
	}

	memset0 ( ): void {
		this.Clear ( );
	}
	
////SetGranularity( int granularity ) {
////	this.args.SetGranularity( granularity );
////	this.argHash.SetGranularity( granularity );
////}
////
////SetHashSize( int hashSize ) {
////	if ( this.args.Num() == 0 ) {
////		this.argHash.Clear( hashSize, 16 );
////	}
////}
////
	SetFloat ( key: string, /*float*/ val: number ): void {
		this.Set( key, va( "%f", val ) );
	}

	SetInt ( key: string, /*int*/ val: number ): void {
		this.Set( key, va( "%i", val ) );
	}

	SetBool ( key: string, val: boolean ): void {
		this.Set( key, val ? "1" : "0" /*va( "%i", val ) */ );
	}

	SetVector ( key: string, val: idVec3 ): void {
		Set( key, val.ToString ( ) );
	}

	SetVec4 ( key: string, val: idVec4 ): void {
		this.Set( key, val.ToString ( ) );
	}

	SetVec2 ( key: string, val: idVec2 ): void {
		this.Set( key, val.ToString ( ) );
	}

	SetAngles ( key: string, val: idAngles ): void {
		this.Set( key, val.ToString ( ) );
	}

	SetMatrix ( key: string, val: idMat3 ): void {
		this.Set( key, val.ToString ( ) );
	}

	GetString_Rstring ( key: string, defaultString: string, out: R<string> ): boolean {
		var kv = this.FindKey( key );
		if ( kv ) {
			out.$ = kv.GetValue ( ).data;
			return true;
		}
		out.$ = defaultString;
		return false;
	}

	GetString_RidStr ( key: string, defaultString: string, out: idStr ): boolean {
		var kv = this.FindKey( key );
		if ( kv ) {
			out.equals( kv.GetValue ( ) );
			return true;
		}
		out.equals( defaultString );
		return false;
	}

	GetString ( key: string, defaultString = ""): string {
		var kv = this.FindKey( key );
		if ( kv ) {
			return kv.GetValue ( ).data;
		}
		return defaultString;
	}

	GetFloat ( key: string, defaultString = "0" ): number {
		return atof( this.GetString( key, defaultString ) );
	}

	GetInt ( key: string, defaultString = "0" ): number {
		return atoi( this.GetString( key, defaultString ) );
	}

	GetBool ( key: string, defaultString: string = "0" ): boolean {
		return ( atoi( this.GetString( key, defaultString ) ) != 0 );
	}
 
	GetVector ( key: string, defaultString: string = null ): idVec3 {
		var out = new idVec3;
		todoThrow ( );
		//GetVector( key, defaultString, out );
		return out;
	}

	GetVec2 ( key: string, defaultString: string = null): idVec2 {
		var out = new idVec2;
		todoThrow ( );
		//GetVec2( key, defaultString, out );
		return out;
	}

	GetVec4 ( key: string, defaultString: string = null ): idVec4 {
		var out = new idVec4;
		todoThrow ( );
		//GetVec4( key, defaultString, out );
		return out;
	}

////ID_INLINE idAngles idDict::GetAngles( key:string, defaultString:string ) const {
////	idAngles out;
////	GetAngles( key, defaultString, out );
////	return out;
////}
////
////ID_INLINE idMat3 idDict::GetMatrix( key:string, defaultString:string ) const {
////	idMat3 out;
////	GetMatrix( key, defaultString, out );
////	return out;
////}

	GetNumKeyVals ( ): number {
		return this.args.Num ( );
	}

	GetKeyVal ( /*int */index: number ): idKeyValue {
		if ( index >= 0 && index < this.args.Num ( ) ) {
			return this.args[index];
		}
		return null;
	}
/*
================
idDict::operator=

  clear existing key/value pairs and copy all key/value pairs from other
================
*/

	equals ( other: idDict ): idDict {
		var /*int */i: number;

		// check for assignment to self
		if ( this == other ) {
			return this;
		}

		this.Clear ( );

		this.args.opEquals( other.args );
		this.argHash .opEquals( other.argHash)

		for ( i = 0; i < this.args.Num ( ); i++ ) {
			this.args[i].key = idDict.globalKeys.CopyString( this.args[i].key );
			this.args[i].value = idDict.globalValues.CopyString( this.args[i].value );
		}

		return this;
	}

	// for idList::Append
	copy(dest: idDict = null): idDict {
		return this.equals( dest );
	}

/////*
////================
////idDict::Copy
////
////  copy all key value pairs without removing existing key/value pairs not present in the other dict
////================
////*/
////void idDict::Copy( const idDict &other ) {
////	int i, n, *found;
////	idKeyValue kv;
////
////	// check for assignment to self
////	if ( this == &other ) {
////		return;
////	}
////
////	n = other.args.Num();
////
////	if ( this.args.Num() ) {
////		found = (int *) _alloca16( other.args.Num() * sizeof( int ) );
////        for ( i = 0; i < n; i++ ) {
////			found[i] = this.FindKeyIndex( other.args[i].GetKey() );
////		}
////	} else {
////		found = NULL;
////	}
////
////	for ( i = 0; i < n; i++ ) {
////		if ( found && found[i] != -1 ) {
////			// first set the new value and then free the old value to allow proper self copying
////			const idPoolStr *oldValue = this.args[found[i]].value;
////			this.args[found[i]].value = idDict.globalValues.CopyString( other.args[i].value );
////			globalValues.FreeString( oldValue );
////		} else {
////			kv.key .equals( idDict.globalKeys.CopyString( other.args[i].key ));
////			kv.value .equals( idDict.globalValues.CopyString( other.args[i].value ));
////			this.argHash.Add( this.argHash.GenerateKey( kv.GetKey(), false ), this.args.Append( kv ) );
////		}
////	}
////}

/*
================
idDict::TransferKeyValues

  clear existing key/value pairs and transfer key/value pairs from other
================
*/
	TransferKeyValues ( other: idDict ): void {
		var /*int */i: number, n: number;

		if ( this == other ) {
			return;
		}

		if ( other.args.Num ( ) && other.args[0].key.GetPool ( ) != idDict.globalKeys ) {
			common.FatalError( "idDict::TransferKeyValues: can't transfer values across a DLL boundary" );
			return;
		}

		this.Clear ( );

		n = other.args.Num ( );
		this.args.SetNum( n );
		for ( i = 0; i < n; i++ ) {
			this.args[i].key = other.args[i].key;
			this.args[i].value = other.args[i].value;
		}
		this.argHash.opEquals(other.argHash );

		other.args.Clear ( );
		other.argHash.Free ( );
	}

/////*
////================
////idDict::Parse
////================
////*/
////bool idDict::Parse( idParser &parser ) {
////	idToken	token;
////	idToken	token2;
////	bool	errors;
////
////	errors = false;
////
////	parser.ExpectTokenString( "{" );
////	parser.ReadToken( &token );
////	while( ( token.type != TT_PUNCTUATION ) || ( token != "}" ) ) {
////		if ( token.type != TT_STRING ) {
////			parser.Error( "Expected quoted string, but found '%s'", token.c_str() );
////		}
////
////		if ( !parser.ReadToken( &token2 ) ) {
////			parser.Error( "Unexpected end of file" );
////		}
////
////		if ( this.FindKey( token ) ) {
////			parser.Warning( "'%s' already defined", token.c_str() );
////			errors = true;
////		}
////		this.Set( token, token2 );
////
////		if ( !parser.ReadToken( &token ) ) {
////			parser.Error( "Unexpected end of file" );
////		}
////	}
////
////	return !errors;
////}

/*
================
idDict::SetDefaults
================
*/
	SetDefaults ( dict: idDict ): void {1
		var /*int */i: number, n: number;
		var kv: idKeyValue, def: idKeyValue;
		var newkv = new idKeyValue;

		n = dict.args.Num ( );
		for ( i = 0; i < n; i++ ) {
			def = dict.args[i];
			kv = this.FindKey( def.GetKey ( ).data );
			if ( !kv ) {
				newkv.key = idDict.globalKeys.CopyString( def.key );
				newkv.value = idDict.globalValues.CopyString( def.value );
				this.argHash.Add( this.argHash.GenerateKey( newkv.GetKey ( ), false ), this.args.Append( newkv ) );
			}
		}
	}

/*
================
idDict::Clear
================
*/
	Clear ( ): void {
		var /*int */i: number;

		for ( i = 0; i < this.args.Num ( ); i++ ) {
			idDict.globalKeys.FreeString( this.args[i].key );
			idDict.globalValues.FreeString( this.args[i].value );
		}

		this.args.Clear ( );
		this.argHash.Free ( );
	}
////
/////*
////================
////idDict::Print
////================
////*/
////void idDict::Print() const {
////	var/*int*/i:number;
////	int n;
////
////	n = this.args.Num();
////	for( i = 0; i < n; i++ ) {
////		idLib::common.Printf( "%s = %s\n", this.args[i].GetKey().c_str(), this.args[i].GetValue().c_str() );
////	}
////}
////
////int KeyCompare( const idKeyValue *a, const idKeyValue *b ) {
////	return idStr::Cmp( a.GetKey(), b.GetKey() );
////}
////
/////*
////================
////idDict::Checksum
////================
////*/
////int	idDict::Checksum( ) const {
////	unsigned long ret;
////	int i, n;
////
////	idList<idKeyValue> sorted = this.args;
////	sorted.Sort( KeyCompare );
////	n = sorted.Num();
////	CRC32_InitChecksum( ret );
////	for( i = 0; i < n; i++ ) {
////		CRC32_UpdateChecksum( ret, sorted[i].GetKey().c_str(), sorted[i].GetKey().Length() );
////		CRC32_UpdateChecksum( ret, sorted[i].GetValue().c_str(), sorted[i].GetValue().Length() );
////	}
////	CRC32_FinishChecksum( ret );
////	return ret;
////}
////
/////*
////================
////idDict::Allocated
////================
////*/
////size_t idDict::Allocated( ) const {
////	int		i;
////	size_t	size;
////
////	size = this.args.Allocated() + this.argHash.Allocated();
////	for( i = 0; i < this.args.Num(); i++ ) {
////		size += this.args[i].Size();
////	}
////
////	return size;
////}
////
/*
================
idDict::Set
================
*/
Set( key:string, value:string ):void {
	var /*int */i:number;
	var kv = new idKeyValue ;

	if ( !key ) {
		return;
	}

	i = this.FindKeyIndex( key );
	if ( i != -1 ) {
		// first set the new value and then free the old value to allow proper self copying
		var oldValue: idPoolStr = this.args[i].value;
		this.args[i].value = idDict.globalValues.AllocString( value );
		idDict.globalValues.FreeString( oldValue );
	} else {
		kv.key = idDict.globalKeys.AllocString( key );
		kv.value = idDict.globalValues.AllocString( value );
		this.argHash.Add( this.argHash.GenerateKey( kv.GetKey(), false ), this.args.Append( kv ) );
	}
}

/*
================
idDict::GetFloat
================
*/
	GetFloat_R ( key: string, defaultString: string, /*float*/ out: R<number> ): boolean {
		var s = new R<string> ( );
		var found: boolean;

		found = this.GetString_Rstring( key, defaultString, s );
		out.$ = atof( s.$ );
		return found;
	}

/*
================
idDict::GetInt
================
*/
	GetInt_R ( key: string, defaultString: string, /*int &*/out: R<number> ): boolean {
		var s = new R<string> ( );
		var found: boolean;

		found = this.GetString_Rstring( key, defaultString, s );
		out.$ = atoi( s.$ );
		return found;
	}

/*
================
idDict::GetBool
================
*/
	GetBool_R ( key: string, defaultString: string, out: R<boolean> ): boolean {
		var s = new R<string> ( );
		var found: boolean;

		found = this.GetString_Rstring( key, defaultString, s );
		out.$ = ( atoi( s.$ ) != 0 );
		return found;
	}

/////*
////================
////idDict::GetAngles
////================
////*/
////bool idDict::GetAngles( key:string, defaultString:string, idAngles &out ) const {
////	bool		found;
////	const char	*s;
////	
////	if ( !defaultString ) {
////		defaultString = "0 0 0";
////	}
////
////	found = GetString( key, defaultString, &s );
////	out.Zero();	
////	sscanf( s, "%f %f %f", &out.pitch, &out.yaw, &out.roll );
////	return found;
////}
////
/*
================
idDict::GetVector
================
*/
	GetVector_R ( key: string, defaultString: string, out: idVec3 ): boolean {
		var found: boolean;
		var s = new R<string> ( );

		if ( !defaultString ) {
			defaultString = "0 0 0";
		}

		found = this.GetString_Rstring( key, defaultString, s );
		out.Zero ( );
		var arr = s.$.split( " " ).map( parseFloat );
		assert( arr.length == 3 );
		return found;
	}
////
/////*
////================
////idDict::GetVec2
////================
////*/
////bool idDict::GetVec2( key:string, defaultString:string, idVec2 &out ) const {
////	bool		found;
////	const char	*s;
////	
////	if ( !defaultString ) {
////		defaultString = "0 0";
////	}
////
////	found = this.GetString( key, defaultString, &s );
////	out.Zero();
////	sscanf( s, "%f %f", &out.x, &out.y );
////	return found;
////}
////
/////*
////================
////idDict::GetVec4
////================
////*/
////bool idDict::GetVec4( key:string, defaultString:string, idVec4 &out ) const {
////	bool		found;
////	const char	*s;
////	
////	if ( !defaultString ) {
////		defaultString = "0 0 0 0";
////	}
////
////	found = this.GetString( key, defaultString, &s );
////	out.Zero();
////	sscanf( s, "%f %f %f %f", &out.x, &out.y, &out.z, &out.w );
////	return found;
////}
////
/*
================
idDict::GetMatrix
================
*/
	GetMatrix_R ( key: string, defaultString: string, out: idMat3 ): boolean {
		var s = new R<string> ( );
		var found: boolean;

		if ( !defaultString ) {
			defaultString = "1 0 0 0 1 0 0 0 1";
		}

		found = this.GetString_Rstring( key, defaultString, s );
		out.Identity ( ); // sccanf has a bug in it on Mac OS 9.  Sigh.
		var arr = s.$.split( " " ).map( parseFloat );
		assert( arr.length == 9 );
		return found;
	}

/////*
////================
////WriteString
////================
////*/
////static void WriteString( const char *s, idFile *f ) {
////	int	len = strlen( s );
////	if ( len >= MAX_STRING_CHARS-1 ) {
////		idLib::common.Error( "idDict::WriteToFileHandle: bad string" );
////	}
////	f.Write( s, strlen(s) + 1 );
////}

/*
================
idDict::FindKey
================
*/
	FindKey ( key: string ): idKeyValue {
		var /*int */i: number, hash: number;

		if ( !key ) {
			common.DWarning( "idDict::FindKey: empty key" );
			return null;
		}

		hash = this.argHash.GenerateKey( key, false );
		for ( i = this.argHash.First( hash ); i != -1; i = this.argHash.Next( i ) ) {
			if ( this.args[i].GetKey ( ).Icmp( key ) == 0 ) {
				return this.args[i];
			}
		}

		return null;
	}

/*
================
idDict::FindKeyIndex
================
*/
FindKeyIndex( key:string ) :number {

	if ( !key ) {
		common.DWarning( "idDict::FindKeyIndex: empty key" );
		return null;
	}

	var hash = this.argHash.GenerateKey( key, false );
	for ( var i = this.argHash.First( hash ); i != -1; i = this.argHash.Next( i ) ) {
		if ( this.args[i].GetKey().Icmp( key ) == 0 ) {
			return i;
		}
	}

	return -1;
}

/*
================
idDict::Delete
================
*/
	Delete ( key: string ): void {
		var /*int */hash: number, i: number;

		hash = this.argHash.GenerateKey( key, false );
		for ( i = this.argHash.First( hash ); i != -1; i = this.argHash.Next( i ) ) {
			if ( this.args[i].GetKey ( ).Icmp( key ) == 0 ) {
				idDict.globalKeys.FreeString( this.args[i].key );
				idDict.globalValues.FreeString( this.args[i].value );
				this.args.RemoveIndex( i );
				this.argHash.RemoveIndex( hash, i );
				break;
			}
		}

////#if 0
////	// make sure all keys can still be found in the hash index
////	for ( i = 0; i < this.args.Num(); i++ ) {
////		assert( this.FindKey( this.args[i].GetKey() ) != NULL );
////	}
////#endif
	}

/*
================
idDict::MatchPrefix
================
*/
	MatchPrefix ( prefix: string, lastMatch: idKeyValue = null ): idKeyValue {
		var /*int*/ i: number;
		var /*int*/ len: number;
		var /*int*/ start: number;

		assert( prefix );
		len = strlen( prefix );

		start = -1;
		if ( lastMatch ) {
			start = this.args.FindIndex( lastMatch );
			assert( start >= 0 );
			if ( start < 1 ) {
				start = 0;
			}
		}

		for ( i = start + 1; i < this.args.Num ( ); i++ ) {
			if ( !this.args[i].GetKey ( ).Icmpn( prefix, len ) ) {
				return this.args[i];
			}
		}
		return null;
	}

/////*
////================
////idDict::RandomPrefix
////================
////*/
////const char *idDict::RandomPrefix( const char *prefix, idRandom &random ) const {
////	int count;
////	const int MAX_RANDOM_KEYS = 2048;
////	const char *list[MAX_RANDOM_KEYS];
////	const idKeyValue *kv;
////
////	list[0] = "";
////	for ( count = 0, kv = MatchPrefix( prefix ); kv && count < MAX_RANDOM_KEYS; kv = MatchPrefix( prefix, kv ) ) {
////		list[count++] = kv.GetValue().c_str();
////	}
////	return list[random.RandomInt( count )];
////}
////
/////*
////================
////idDict::WriteToFileHandle
////================
////*/
////void idDict::WriteToFileHandle( idFile *f ) const {
////	int c = LittleLong( this.args.Num() );
////	f.Write( &c, sizeof( c ) );
////	for ( int i = 0; i < this.args.Num(); i++ ) {	// don't loop on the swapped count use the original
////		WriteString( this.args[i].GetKey().c_str(), f );
////		WriteString( this.args[i].GetValue().c_str(), f );
////	}
////}
////
/////*
////================
////ReadString
////================
////*/
////static idStr ReadString( idFile *f ) {
////	char	str[MAX_STRING_CHARS];
////	int		len;
////
////	for ( len = 0; len < MAX_STRING_CHARS; len++ ) {
////		f.Read( (void *)&str[len], 1 );
////		if ( str[len] == 0 ) {
////			break;
////		}
////	}
////	if ( len == MAX_STRING_CHARS ) {
////		idLib::common.Error( "idDict::ReadFromFileHandle: bad string" );
////	}
////
////	return idStr( str );
////}
////
/////*
////================
////idDict::ReadFromFileHandle
////================
////*/
////void idDict::ReadFromFileHandle( idFile *f ) {
////	int c;
////	idStr key, val;
////
////	this.Clear();
////
////	f.Read( &c, sizeof( c ) );
////	c = LittleLong( c );
////	for ( int i = 0; i < c; i++ ) {
////		key .equals( ReadString( f ));
////		val .equals(ReadString( f ));
////		this.Set( key, val );
////	}
////}
////
/////*
////================
////idDict::Init
////================
////*/
////void idDict::Init( ) {
////	idDict.globalKeys.SetCaseSensitive( false );
////	idDict.globalValues.SetCaseSensitive( true );
////}
////
/////*
////================
////idDict::Shutdown
////================
////*/
////void idDict::Shutdown( ) {
////	idDict.globalKeys.Clear();
////	idDict.globalValues.Clear();
////}
////
/////*
////================
////idDict::ShowMemoryUsage_f
////================
////*/
////void idDict::ShowMemoryUsage_f( const idCmdArgs &args ) {
////	idLib::common.Printf( "%5d KB in %d keys\n", idDict.globalKeys.Size() >> 10, idDict.globalKeys.Num() );
////	idLib::common.Printf( "%5d KB in %d values\n", idDict.globalValues.Size() >> 10, idDict.globalValues.Num() );
////}
////
/////*
////================
////idDictStringSortCmp
////================
////*/
////// NOTE: the const wonkyness is required to make msvc happy
////template<>
////ID_INLINE int idListSortCompare( const idPoolStr * const *a, const idPoolStr * const *b ) {
////	return (*a).Icmp( **b );
////}
////
/////*
////================
////idDict::ListKeys_f
////================
////*/
////void idDict::ListKeys_f( const idCmdArgs &args ) {
////	var/*int*/i:number;
////	idList<const idPoolStr *> keyStrings;
////
////	for ( i = 0; i < idDict.globalKeys.Num(); i++ ) {
////		keyStrings.Append( idDict.globalKeys[i] );
////	}
////	keyStrings.Sort();
////	for ( i = 0; i < keyStrings.Num(); i++ ) {
////		idLib::common.Printf( "%s\n", keyStrings[i].c_str() );
////	}
////	idLib::common.Printf( "%5d keys\n", keyStrings.Num() );
////}
////
/////*
////================
////idDict::ListValues_f
////================
////*/
////void idDict::ListValues_f( const idCmdArgs &args ) {
////	var/*int*/i:number;
////	idList<const idPoolStr *> valueStrings;
////
////	for ( i = 0; i < idDict.globalValues.Num(); i++ ) {
////		valueStrings.Append( idDict.globalValues[i] );
////	}
////	valueStrings.Sort();
////	for ( i = 0; i < valueStrings.Num(); i++ ) {
////		idLib::common.Printf( "%s\n", valueStrings[i].c_str() );
////	}
////	idLib::common.Printf( "%5d values\n", valueStrings.Num() );
////}
}