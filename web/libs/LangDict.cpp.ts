/// <reference path="idLib/Containers/HashIndex.h.ts" />
/// <reference path="idLib/Containers/List.h.ts" />
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


// LangDict.h:

class idLangKeyValue {
//public:
	key:idStr;
	value: idStr;
};

class idLangDict {
////public:
////							idLangDict( void );
////							~idLangDict( void );

////	void					Clear( void );
////	bool					Load( const char *fileName, bool clear = true );
////	void					Save( const char *fileName );

////	const char *			AddString( const char *str );
////	const char *			GetString( const char *str ) const;

////							// adds the value and key as passed (doesn't generate a "#str_xxxxx" key or ensure the key/value pair is unique)
////	void					AddKeyVal( const char *key, const char *val );

////	int						GetNumKeyVals( void ) const;
////	const idLangKeyValue *	GetKeyVal( int i ) const;

////	void					SetBaseID(int id) { baseID = id; };

////private:
        args:idList<idLangKeyValue>;
        hash:idHashIndex;

////	bool					ExcludeString( const char *str ) const;
////	int						GetNextId( void ) const;
////	int						GetHashKey( const char *str ) const;

/*int						*/baseID:number;
////};


////#include "precompiled.h"
////#pragma hdrstop


/*
============
idLangDict::idLangDict
============
*/
constructor( ) {
    this.args = new idList<idLangKeyValue>(idLangKeyValue);
	this.args.SetGranularity( 256 );
    this.hash = new idHashIndex ( );
	this.hash.SetGranularity( 256 );
	this.hash.Clear( 4096, 8192 );
	this.baseID = 0;
}

/////*
////============
////idLangDict::~idLangDict
////============
////*/
////idLangDict::~idLangDict( void ) {
////	Clear();
////}

/*
============
idLangDict::Clear
============
*/
Clear(  ):void {
	this.args.Clear();
	this.hash.Clear();
}

/*
============
idLangDict::Load
============
*/
Load( fileName:string, clear:boolean /* _D3XP */ ) {

	if ( clear ) {
		this.Clear();
	}

	var buffer = new R<Uint8Array>();
	var src = new idLexer( lexerFlags_t.LEXFL_NOFATALERRORS | lexerFlags_t.LEXFL_NOSTRINGCONCAT | lexerFlags_t.LEXFL_ALLOWMULTICHARLITERALS | lexerFlags_t.LEXFL_ALLOWBACKSLASHSTRINGCONCAT );

	var /*int */len = fileSystem.ReadFile( fileName, /*(void**)&*/buffer );
	if ( len <= 0 ) {
		// let whoever called us deal with the failure (so sys_lang can be reset)
		return false;
	}
	src.LoadMemory(buffer.toString(), /*strlen( buffer )*/buffer.$.length, fileName );
	if ( !src.IsLoaded() ) {
		return false;
	}

	var tok = new R<idToken>(new idToken()), tok2 = new R<idToken>(new idToken());
	src.ExpectTokenString( "{" );
	while ( src.ReadToken( tok ) ) {
		if (tok.$.data == "}" ) {
			break;
		}
		if ( src.ReadToken( tok2 ) ) {
			if (tok2.$.data == "}" ) {
				break;
			}
			var kv = new idLangKeyValue;
			kv.key = tok.$.clone();
			kv.value = tok2.$.clone();
			assert( kv.key.Cmpn( STRTABLE_ID, STRTABLE_ID_LENGTH ) == 0 );
			this.hash.Add( this.GetHashKey( kv.key.data ), this.args.Append( kv ) );
		}
	}
	common.Printf( "%i strings read from %s\n", this.args.Num(), fileName );
	//fileSystem.FreeFile( (void*)buffer );

	return true;
}

/////*
////============
////idLangDict::Save
////============
////*/
////void idLangDict::Save( const char *fileName ) {
////	idFile *outFile = idLib::fileSystem.OpenFileWrite( fileName );
////	outFile.WriteFloatString( "// string table\n// english\n//\n\n{\n" );
////	for ( int j = 0; j < this.args.Num(); j++ ) {
////		outFile.WriteFloatString( "\t\"%s\"\t\"", this.args[j].key.c_str() );
////		int l = this.args[j].value.Length();
////		char slash = '\\';
////		char tab = 't';
////		char nl = 'n';
////		for ( int k = 0; k < l; k++ ) {
////			char ch = this.args[j].value[k];
////			if ( ch == '\t' ) {
////				outFile.Write( &slash, 1 );
////				outFile.Write( &tab, 1 );
////			} else if ( ch == '\n' || ch == '\r' ) {
////				outFile.Write( &slash, 1 );
////				outFile.Write( &nl, 1 );
////			} else {
////				outFile.Write( &ch, 1 );
////			}
////		}
////		outFile.WriteFloatString( "\"\n" );
////	}
////	outFile.WriteFloatString( "\n}\n" );
////	idLib::fileSystem.CloseFile( outFile );
////}

/////*
////============
////idLangDict::GetString
////============
////*/
////const char *idLangDict::GetString( const char *str ) const {

////	if ( str == NULL || str[0] == '\0' ) {
////		return "";
////	}

////	if ( idStr::Cmpn( str, STRTABLE_ID, STRTABLE_ID_LENGTH ) != 0 ) {
////		return str;
////	}

////	int hashKey = GetHashKey( str );
////	for ( int i = this.hash.First( hashKey ); i != -1; i = this.hash.Next( i ) ) {
////		if ( this.args[i].key.Cmp( str ) == 0 ) {
////			return this.args[i].value;
////		}
////	}

////	idLib::common.Warning( "Unknown string id %s", str );
////	return str;
////}

/////*
////============
////idLangDict::AddString
////============
////*/
////const char *idLangDict::AddString( const char *str ) {

////	if ( ExcludeString( str ) ) {
////		return str;
////	}

////	int c = this.args.Num();
////	for ( int j = 0; j < c; j++ ) {
////		if ( idStr::Cmp( this.args[j].value, str ) == 0 ){
////			return this.args[j].key;
////		}
////	}

////	int id = GetNextId();
////	idLangKeyValue kv;
////	// _D3XP
////	kv.key = va( "#str_%08i", id );
////	// kv.key = va( "#str_%05i", id );
////	kv.value = str;
////	c = this.args.Append( kv );
////	assert( kv.key.Cmpn( STRTABLE_ID, STRTABLE_ID_LENGTH ) == 0 );
////	this.hash.Add( GetHashKey( kv.key ), c );
////	return this.args[c].key;
////}

/////*
////============
////idLangDict::GetNumKeyVals
////============
////*/
////int idLangDict::GetNumKeyVals( void ) const {
////	return this.args.Num();
////}

/////*
////============
////idLangDict::GetKeyVal
////============
////*/
////const idLangKeyValue * idLangDict::GetKeyVal( int i ) const {
////	return &this.args[i];
////}

/////*
////============
////idLangDict::AddKeyVal
////============
////*/
////void idLangDict::AddKeyVal( const char *key, const char *val ) {
////	idLangKeyValue kv;
////	kv.key = key;
////	kv.value = val;
////	assert( kv.key.Cmpn( STRTABLE_ID, STRTABLE_ID_LENGTH ) == 0 );
////	this.hash.Add( GetHashKey( kv.key ), this.args.Append( kv ) );
////}

/////*
////============
////idLangDict::ExcludeString
////============
////*/
////bool idLangDict::ExcludeString( const char *str ) const {
////	if ( str == NULL ) {
////		return true;
////	}

////	int c = strlen( str );
////	if ( c <= 1 ) {
////		return true;
////	}

////	if ( idStr::Cmpn( str, STRTABLE_ID, STRTABLE_ID_LENGTH ) == 0 ) {
////		return true;
////	}

////	if ( idStr::Icmpn( str, "gui::", strlen( "gui::" ) ) == 0 ) {
////		return true;
////	}

////	if ( str[0] == '$' ) {
////		return true;
////	}

////	int i;
////	for ( i = 0; i < c; i++ ) {
////		if ( isalpha( str[i] ) ) {
////			break;
////		}
////	}
////	if ( i == c ) {
////		return true;
////	}

////	return false;
////}

/////*
////============
////idLangDict::GetNextId
////============
////*/
////int idLangDict::GetNextId( void ) const {
////	int c = this.args.Num();

////	//Let and external user supply the base id for this dictionary
////	int id = baseID;

////	if ( c == 0 ) {
////		return id;
////	}

////	idStr work;
////	for ( int j = 0; j < c; j++ ) {
////		work = this.args[j].key;
////		work.StripLeading( STRTABLE_ID );
////		int test = atoi( work );
////		if ( test > id ) {
////			id = test;
////		}
////	}
////	return id + 1;
////}

/*
============
idLangDict::GetHashKey
============
*/
/*int */
	GetHashKey ( str: string ): number {
		var /*int*/ hashKey = 0;
		var i = 0;
		for ( str += STRTABLE_ID_LENGTH; i < str.length; i++ ) {
			assert( str[i] >= '0' && str[i] <= '9' );
			hashKey = hashKey * 10 + str.charCodeAt( i ) - '0'.charCodeAt( 0 );
		}
		return hashKey;
	}
}