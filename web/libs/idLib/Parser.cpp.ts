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

/////*
////===============================================================================
////
////	C/C++ compatible pre-compiler
////
////===============================================================================
////*/
////
var DEFINE_FIXED			=0x0001

var BUILTIN_LINE			=1
var BUILTIN_FILE			=2
var BUILTIN_DATE			=3
var BUILTIN_TIME			=4
var BUILTIN_STDC			=5

var INDENT_IF				=0x0001
var INDENT_ELSE				=0x0002
var INDENT_ELIF				=0x0004
var INDENT_IFDEF			=0x0008
var INDENT_IFNDEF			=0x0010

// macro definitions
class define_t {
	name:string;						// define name
	flags:number;						// define flags						//int				
	builtin: number;					// > 0 if builtin define			//int				
	numparms: number;					// number of define parameters		//int				
	parms: idToken;						// define parameters
	tokens:idToken;						// macro tokens (possibly containing parm tokens)
	next:define_t;						// next defined macro in a list
	hashnext: define_t;					// next define in the hash chain

	init(): void {
		this.name = null;
		this.flags = 0;
		this.builtin = 0;
		this.numparms = 0;
		this.parms = null;
		this.tokens = null;
		this.next = null;
		this.hashnext = null;
	}
}

// indents used for conditional compilation directives:
// #if, #else, #elif, #ifdef, #ifndef
class indent_t {
	type: number /*int*/; // indent type
	skip: number /*int*/; // true if skipping current indent
	script: idLexer; // script the indent was in
	next: indent_t; // next indent on the indent stack
}

////#endif /* !__PARSER_H__ */

//#define DEBUG_EVAL
var MAX_DEFINEPARMS			=	128
var DEFINEHASHSIZE			=	2048

var TOKEN_FL_RECURSIVE_DEFINE = 1;

////define_t * idParser::globaldefines;


class idParser {
////
////public:
////					// constructor
////					idParser();
////					idParser( int flags );
////					idParser( const char *filename, int flags = 0, bool OSPath = false );
////					idParser( const char *ptr, int length, const char *name, int flags = 0 );
////					// destructor
////					~idParser();
////					// load a source file
////	int				LoadFile( const char *filename, bool OSPath = false );
////					// load a source from the given memory with the given length
////					// NOTE: the ptr is expected to point at a valid C string: ptr[length] == '\0'
////	int				LoadMemory( const char *ptr, int length, const char *name );
////					// free the current source
////	void			FreeSource( bool keepDefines = false );
////					// returns true if a source is loaded
	IsLoaded ( ): number { return this.loaded; }
////					// read a token from the source
////	int				ReadToken( idToken *token );
////					// expect a certain token, reads the token when available
////	int				ExpectTokenString( const char *string );
////					// expect a certain token type
////	int				ExpectTokenType( int type, int subtype, idToken *token );
////					// expect a token
////	int				ExpectAnyToken( idToken *token );
////					// returns true if the next token equals the given string and removes the token from the source
////	int				CheckTokenString( const char *string );
////					// returns true if the next token equals the given type and removes the token from the source
////	int				CheckTokenType( int type, int subtype, idToken *token );
////					// returns true if the next token equals the given string but does not remove the token from the source
////	int				PeekTokenString( const char *string );
////					// returns true if the next token equals the given type but does not remove the token from the source
////	int				PeekTokenType( int type, int subtype, idToken *token );
////					// skip tokens until the given token string is read
////	int				SkipUntilString( const char *string );
////					// skip the rest of the current line
////	int				SkipRestOfLine( void );
////					// skip the braced section
////	int				SkipBracedSection( bool parseFirstBrace = true );
////					// parse a braced section into a string
////	const char *	ParseBracedSection( idStr &out, int tabs = -1 );
////					// parse a braced section into a string, maintaining indents and newlines
////	const char *	ParseBracedSectionExact( idStr &out, int tabs = -1 );
////					// parse the rest of the line
////	const char *	ParseRestOfLine( idStr &out );
////					// unread the given token
////	void			UnreadToken( idToken *token );
////					// read a token only if on the current line
////	int				ReadTokenOnLine( idToken *token );
////					// read a signed integer
////	int				ParseInt( void );
////					// read a boolean
////	bool			ParseBool( void );
////					// read a floating point number
////	float			ParseFloat( void );
////					// parse matrices with floats
////	int				Parse1DMatrix( int x, float *m );
////	int				Parse2DMatrix( int y, int x, float *m );
////	int				Parse3DMatrix( int z, int y, int x, float *m );
////					// get the white space before the last read token
////	int				GetLastWhiteSpace( idStr &whiteSpace ) const;
////					// Set a marker in the source file (there is only one marker)
////	void			SetMarker( void );
////					// Get the string from the marker to the current position
////	void			GetStringFromMarker( idStr& out, bool clean = false );
////					// add a define to the source
////	int				AddDefine( const char *string );
////					// add builtin defines
////	void			AddBuiltinDefines( void );
////					// set the source include path
////	void			SetIncludePath( const char *path );
////					// set the punctuation set
////	void			SetPunctuations( const punctuation_t *p );
////					// returns a pointer to the punctuation with the given id
////	const char *	GetPunctuationFromId( int id );
////					// get the id for the given punctuation
////	int				GetPunctuationId( const char *p );
////					// set lexer flags
////	void			SetFlags( int flags );
////					// get lexer flags
////	int				GetFlags( void ) const;
////					// returns the current filename
////	const char *	GetFileName( void ) const;
////					// get current offset in current script
////	const int		GetFileOffset( void ) const;
////					// get file time for current script
////	const ID_TIME_T	GetFileTime( void ) const;
////					// returns the current line number
////	const int		GetLineNum( void ) const;
////					// print an error message
////	void			Error( const char *str, ... ) const id_attribute((format(printf,2,3)));
////					// print a warning message
////	void			Warning( const char *str, ... ) const id_attribute((format(printf,2,3)));
////
////					// add a global define that will be added to all opened sources
////	static int		AddGlobalDefine( const char *string );
////					// remove the given global define
////	static int		RemoveGlobalDefine( const char *name );
////					// remove all global defines
////	static void		RemoveAllGlobalDefines( void );
////					// set the base folder to load files from
////	static void		SetBaseFolder( const char *path );
////
////private:
		loaded:number/*int*/;						// set when a source file is loaded from file or memory
		filename = new idStr;					// file name of the script
		includepath = new idStr;				// path to include files
		OSPath:boolean;						// true if the file was loaded from an OS path
		punctuations: punctuation_t[];			// punctuations to use
		flags:number/*int*/;						// flags used for script parsing
		scriptstack:idLexer;						// stack with scripts of the source
		tokens: idToken;						// tokens to read first
		defines:define_t ;					// list with macro definitions
		definehash:define_t[];					// hash chain with defines
		indentstack: indent_t;				// stack with indents
		skip:number/*int*/;						// > 0 if skipping conditional code
		marker_p:number;//	const char*		

		static globaldefines: define_t;				// list with global defines added to every source loaded

////private:
////	void			PushIndent( int type, int skip );
////	void			PopIndent( int *type, int *skip );
////	void			PushScript( idLexer *script );
////	int				ReadSourceToken( idToken *token );
////	int				ReadLine( idToken *token );
////	int				UnreadSourceToken( idToken *token );
////	int				ReadDefineParms( define_t *define, idToken **parms, int maxparms );
////	int				StringizeTokens( idToken *tokens, idToken *token );
////	int				MergeTokens( idToken *t1, idToken *t2 );
////	int				ExpandBuiltinDefine( idToken *deftoken, define_t *define, idToken **firsttoken, idToken **lasttoken );
////	int				ExpandDefine( idToken *deftoken, define_t *define, idToken **firsttoken, idToken **lasttoken );
////	int				ExpandDefineIntoSource( idToken *deftoken, define_t *define );
////	void			AddGlobalDefinesToSource( void );
////	define_t *		CopyDefine( define_t *define );
////	define_t *		FindHashedDefine(define_t **definehash, const char *name);
////	int				FindDefineParm( define_t *define, const char *name );
////	void			AddDefineToHash(define_t *define, define_t **definehash);
////	static void		PrintDefine( define_t *define );
////	static void		FreeDefine( define_t *define );
////	static define_t *FindDefine( define_t *defines, const char *name );
////	static define_t *DefineFromString( const char *string);
////	define_t *		CopyFirstDefine( void );
////	int				Directive_include( void );
////	int				Directive_undef( void );
////	int				Directive_if_def( int type );
////	int				Directive_ifdef( void );
////	int				Directive_ifndef( void );
////	int				Directive_else( void );
////	int				Directive_endif( void );
////	int				EvaluateTokens( idToken *tokens, signed long int *intvalue, double *floatvalue, int integer );
////	int				Evaluate( signed long int *intvalue, double *floatvalue, int integer );
////	int				DollarEvaluate( signed long int *intvalue, double *floatvalue, int integer);
////	int				Directive_define( void );
////	int				Directive_elif( void );
////	int				Directive_if( void );
////	int				Directive_line( void );
////	int				Directive_error( void );
////	int				Directive_warning( void );
////	int				Directive_pragma( void );
////	void			UnreadSignToken( void );
////	int				Directive_eval( void );
////	int				Directive_evalfloat( void );
////	int				ReadDirective( void );
////	int				DollarDirective_evalint( void );
////	int				DollarDirective_evalfloat( void );
////	int				ReadDollarDirective( void );
////};

	GetFileName ( ): string {
		if ( this.scriptstack ) {
			return this.scriptstack.GetFileName ( );
		} else {
			return "";
		}
	}

////ID_INLINE const /*int*/GetFileOffset( ) :number{
////	if ( this.scriptstack ) {
////		return this.scriptstack.GetFileOffset();
////	}
////	else {
////		return 0;
////	}
////}
////
////ID_INLINE const ID_TIME_T idParser::GetFileTime( ):number {
////	if ( this.scriptstack ) {
////		return this.scriptstack.GetFileTime();
////	}
////	else {
////		return 0;
////	}
////}
////
////ID_INLINE const /*int*/GetLineNum( ):number {
////	if ( this.scriptstack ) {
////		return this.scriptstack.GetLineNum();
////	}
////	else {
////		return 0;
////	}
////}

/////*
////================
////idParser::SetBaseFolder
////================
////*/
////void idParser::SetBaseFolder( const char *path) {
////	idLexer::SetBaseFolder(path);
////}
////
/////*
////================
////idParser::AddGlobalDefine
////================
////*/
/////*int*/AddGlobalDefine( $string:string ):number {
////	define_t *define;
////
////	define = idParser::DefineFromString(string);
////	if (!define) {
////		return 0/*false*/;
////	}
////	define.next = idParser.globaldefines;
////	idParser.globaldefines = define;
////	return 1/*true*/;
////}
////
/////*
////================
////idParser::RemoveGlobalDefine
////================
////*/
/////*int*/RemoveGlobalDefine( const char *name ) :number{
////	define_t *d, *prev;
////
////	for ( prev = NULL, d = idParser.globaldefines; d; prev = d, d = d.next ) {
////		if ( !strcmp( d.name, name ) ) {
////			break;
////		}
////	}
////	if ( d ) {
////		if ( prev ) {
////			prev.next = d.next;
////		}
////		else {
////			idParser.globaldefines = d.next;
////		}
////		idParser::FreeDefine( d );
////		return 1/*true*/;
////	}
////	return 0/*false*/;
////}
////
/////*
////================
////idParser::RemoveAllGlobalDefines
////================
////*/
////void idParser::RemoveAllGlobalDefines( ) {
////	define_t *define;
////
////	for ( define = idParser.globaldefines; define; define = idParser.globaldefines ) {
////		globaldefines = idParser.globaldefines.next;
////		idParser::FreeDefine(define);
////	}
////}
////
////
/////*
////===============================================================================
////
////idParser
////
////===============================================================================
////*/
////
/////*
////================
////idParser::PrintDefine
////================
////*/
////void idParser::PrintDefine( define_t *define ) {
////	common.Printf("define.name = %s\n", define.name);
////	common.Printf("define.flags = %d\n", define.flags);
////	common.Printf("define.builtin = %d\n", define.builtin);
////	common.Printf("define.numparms = %d\n", define.numparms);
////}
////
/////*
////================
////PC_PrintDefineHashTable
////================
////* /
////static void PC_PrintDefineHashTable(define_t **definehash) {
////	var i:number;
////	define_t *d;
////
////	for (i = 0; i < DEFINEHASHSIZE; i++) {
////		Log_Write("%4d:", i);
////		for (d = this.definehash[i]; d; d = d.hashnext) {
////			Log_Write(" %s", d.name);
////		}
////		Log_Write("\n");
////	}
////}
////*/
////
/*
================
PC_NameHash
================
*/
	PC_NameHash ( name: string ): number {
		var /*int */hash: number, i: number;

		hash = 0;
		for ( i = 0; !!name[i] /* != '\0'*/; i++ ) {
			hash += name.charCodeAt( i ) * ( 119 + i );
		}
		hash = ( hash ^ ( hash >> 10 ) ^ ( hash >> 20 ) ) & ( DEFINEHASHSIZE - 1 );
		return hash;
	}

/*
================
idParser::AddDefineToHash
================
*/
	AddDefineToHash ( define: define_t, definehash: define_t[] ): void {
		var /*int */hash: number;

		hash = this.PC_NameHash( define.name );
		define.hashnext = definehash[hash];
		definehash[hash] = define;
	}

/*
================
FindHashedDefine
================
*/
	FindHashedDefine ( definehash: define_t[], name: string ): define_t {
		var d: define_t;
		var /*int */hash: number;

		hash = this.PC_NameHash( name );
		for ( d = definehash[hash]; d; d = d.hashnext ) {
			if ( !strcmp( d.name, name ) ) {
				return d;
			}
		}
		return null;
	}
////
/////*
////================
////idParser::FindDefine
////================
////*/
////define_t *idParser::FindDefine( define_t *defines, const char *name ) {
////	define_t *d;
////
////	for ( d = defines; d; d = d.next ) {
////		if ( !strcmp(d.name, name) ) {
////			return d;
////		}
////	}
////	return NULL;
////}

/*
================
idParser::FindDefineParm
================
*/
	/*int*/
	FindDefineParm ( define: define_t, name: string ): number {
		var p: idToken;
		var i: number;

		i = 0;
		for ( p = define.parms; p; p = p.next ) {
			if ( p.data == name ) {
				return i;
			}
			i++;
		}
		return -1;
	}

/*
================
idParser::CopyDefine
================
*/
	CopyDefine ( define: define_t ): define_t {
		var newdefine: define_t;
		todoThrow ( );
		//idToken *token, *newtoken, *lasttoken;

		//newdefine = (define_t *) Mem_Alloc(sizeof(define_t) + strlen(define.name) + 1);
		////copy the define name
		//newdefine.name = (char *) newdefine + sizeof(define_t);
		//strcpy(newdefine.name, define.name);
		//newdefine.flags = define.flags;
		//newdefine.builtin = define.builtin;
		//newdefine.numparms = define.numparms;
		////the define is not linked
		//newdefine.next = NULL;
		//newdefine.hashnext = NULL;
		////copy the define tokens
		//newdefine.tokens = NULL;
		//for (lasttoken = NULL, token = define.tokens; token; token = token.next) {
		//	newtoken = new idToken(token);
		//	newtoken.next = NULL;
		//	if (lasttoken) lasttoken.next = newtoken;
		//	else newdefine.tokens = newtoken;
		//	lasttoken = newtoken;
		//}
		////copy the define parameters
		//newdefine.parms = NULL;
		//for (lasttoken = NULL, token = define.parms; token; token = token.next) {
		//	newtoken = new idToken(token);
		//	newtoken.next = NULL;
		//	if (lasttoken) lasttoken.next = newtoken;
		//	else newdefine.parms = newtoken;
		//	lasttoken = newtoken;
		//}
		return newdefine;
	}

/*
================
idParser::FreeDefine
================
*/
	FreeDefine ( define: define_t ): void {
		var t: idToken, next: idToken;

		//free the define parameters
		for ( t = define.parms; t; t = next ) {
			next = t.next;
			delete t;
		}
		//free the define tokens
		for ( t = define.tokens; t; t = next ) {
			next = t.next;
			delete t;
		}
		//free the define
		Mem_Free( define );
	}

/*
================
idParser::DefineFromString
================
*/
	DefineFromString ( $string: string ): define_t {
		var src = new idParser;
		var def: define_t;

		if ( !src.LoadMemory( $string, strlen( $string ), "*defineString" ) ) {
			return null;
		}
		todoThrow ( );
		//// create a define from the source
		//if ( !src.Directive_define ( ) ) {
		//	src.FreeSource ( );
		//	return null;
		//}
		//def = src.CopyFirstDefine ( );
		//src.FreeSource ( );
		////if the define was created succesfully
		return def;
	}

/*
================
idParser::Error
================
*/
	Error(str: string, ...args: any[]): void {
		todoThrow ( );
		//char text[MAX_STRING_CHARS];
		//va_list ap;

		//va_start(ap, str);
		//vsprintf(text, str, ap);
		//va_end(ap);
		//if ( this.scriptstack ) {
		//	this.scriptstack.Error( text );
		//}
	}

/*
================
idParser::Warning
================
*/
	Warning ( str: string, ...args: any[] ): void {
		todoThrow ( );
		//char text[MAX_STRING_CHARS];
		//va_list ap;

		//va_start(ap, str);
		//vsprintf(text, str, ap);
		//va_end(ap);
		//if ( this.scriptstack ) {
		//	this.scriptstack.Warning( text );
		//}
	}

/*
================
idParser::PushIndent
================
*/
	PushIndent ( /*int*/ type: number, /*int */skip: number ): void {
		var indent: indent_t;

		indent = new indent_t;
		indent.type = type;
		indent.script = this.scriptstack;
		indent.skip = ( skip != 0 ) ? 1 : 0;
		this.skip += indent.skip;
		indent.next = this.indentstack;
		this.indentstack = indent;
	}

/*
================
idParser::PopIndent
================
*/
	PopIndent ( /*int **/type: R<number>, /*int **/skip: R<number> ) {
		var indent: indent_t;

		type.$ = 0;
		skip.$ = 0;

		indent = this.indentstack;
		if ( !indent ) return;

		// must be an indent from the current script
		if ( this.indentstack.script != this.scriptstack ) {
			return;
		}

		type.$ = indent.type;
		skip.$ = indent.skip;
		this.indentstack = this.indentstack.next;
		this.skip -= indent.skip;
		Mem_Free( indent );
	}

/*
================
idParser::PushScript
================
*/
	PushScript ( script: idLexer ): void {
		var s: idLexer;

		for ( s = this.scriptstack; s; s = s.next ) {
			if ( !idStr.Icmp( s.GetFileName ( ), script.GetFileName ( ) ) ) {
				this.Warning( "'%s' recursively included", script.GetFileName ( ) );
				return;
			}
		}
		//push the script on the script stack
		script.next = this.scriptstack;
		this.scriptstack = script;
	}

/*
================
idParser::ReadSourceToken
================
*/
	ReadSourceToken ( token: R<idToken> ): number {
		var t: idToken;
		var script: idLexer;
		var /*int */type = new R( 0 ), skip = new R( 0 ), changedScript: number;

		if ( !this.scriptstack ) {
			common.FatalError( "idParser::ReadSourceToken: not loaded" );
			return 0 /*false*/;
		}

		changedScript = 0;
		// if there's no token already available
		while ( !this.tokens ) {
			// if there's a token to read from the script
			if ( this.scriptstack.ReadToken( token ) ) {
				token.$.linesCrossed += changedScript;

				// set the marker based on the start of the token read in
				if ( this.marker_p === null || this.marker_p === undefined) {
					this.marker_p = token.$.whiteSpaceEnd_p;
				}
				return 1 /*true*/;
			}
			// if at the end of the script
			if ( this.scriptstack.EndOfFile ( ) ) {
				// remove all indents of the script
				while ( this.indentstack && this.indentstack.script == this.scriptstack ) {
					this.Warning( "missing #endif" );
					this.PopIndent( type, skip );
				}
				changedScript = 1;
			}
			// if this was the initial script
			if ( !this.scriptstack.next ) {
				return 0 /*false*/;
			}
			// remove the script and return to the previous one
			script = this.scriptstack;
			this.scriptstack = this.scriptstack.next;
			delete script;
		}
		// copy the already available token
		token.$.equals(this.tokens);
		// remove the token from the source
		//t = this.tokens;
		if ( !this.tokens.next ) {
			this.tokens = null;
		} else {
			this.tokens.equals( this.tokens.next );
		}

		return 1 /*true*/;
	}

/*
================
idParser::UnreadSourceToken
================
*/
	UnreadSourceToken ( token: R<idToken> ): number {
		var t: idToken;

		t = new idToken( token.$ );
		t.next = this.tokens;
		this.tokens = t;
		return 1 /*true*/;
	}

/*
================
idParser::ReadDefineParms
================
*/
	/*int*/
	ReadDefineParms ( define: define_t, /*idToken ***/parms: idToken[], /*int */maxparms: number ): number {
		var newdefine: define_t;
		var token = new R( new idToken ), t: idToken, last: idToken;
		var /*int */i: number, done: number, lastcomma: number, numparms: number, indent: number;

		if ( !this.ReadSourceToken( token ) ) {
			this.Error( "define '%s' missing parameters", define.name );
			return 0 /*false*/;
		}

		if ( define.numparms > maxparms ) {
			this.Error( "define with more than %d parameters", maxparms );
			return 0 /*false*/;
		}

		for ( i = 0; i < define.numparms; i++ ) {
			parms[i] = null;
		}
		// if no leading "("
		if ( token.$.data != "(" ) {
			this.UnreadSourceToken( token );
			this.Error( "define '%s' missing parameters", define.name );
			return 0 /*false*/;
		}
		// read the define parameters
		for ( done = 0, numparms = 0, indent = 1; !done; ) {
			if ( numparms >= maxparms ) {
				this.Error( "define '%s' with too many parameters", define.name );
				return 0 /*false*/;
			}
			parms[numparms] = null;
			lastcomma = 1;
			last = null;
			while ( !done ) {

				if ( !this.ReadSourceToken( token ) ) {
					this.Error( "define '%s' incomplete", define.name );
					return 0 /*false*/;
				}

				if ( token.$.data == "," ) {
					if ( indent <= 1 ) {
						if ( lastcomma ) {
							this.Warning( "too many comma's" );
						}
						if ( numparms >= define.numparms ) {
							this.Warning( "too many define parameters" );
						}
						lastcomma = 1;
						break;
					}
				} else if ( token.$.data == "(" ) {
					indent++;
				} else if ( token.$.data == ")" ) {
					indent--;
					if ( indent <= 0 ) {
						if ( !parms[define.numparms - 1] ) {
							this.Warning( "too few define parameters" );
						}
						done = 1;
						break;
					}
				} else if ( token.$.type == TT_NAME ) {
					newdefine = this.FindHashedDefine( this.definehash, token.$.c_str ( ) );
					if ( newdefine ) {
						if ( !this.ExpandDefineIntoSource( token.$, newdefine ) ) {
							return 0 /*false*/;
						}
						continue;
					}
				}

				lastcomma = 0;

				if ( numparms < define.numparms ) {

					t = new idToken( token.$ );
					t.next = null;
					if ( last ) last.next = t;
					else parms[numparms] = t;
					last = t;
				}
			}
			numparms++;
		}
		return 1 /*true*/;
	}

/*
================
idParser::StringizeTokens
================
*/
	/*int*/
	StringizeTokens ( tokens: idToken, token: idToken ): number {
		var t: idToken;
		todoThrow ( );
		token.type = TT_STRING;
		token.whiteSpaceStart_p = NULL;
		token.whiteSpaceEnd_p = NULL;
		token.equals( "" ); //(*token) = "";
		for ( t = this.tokens; t; t = t.next ) {
			token.Append( t.c_str ( ) );
		}
		return 1 /*true*/;
	}

/*
================
idParser::MergeTokens
================
*/
	/*int*/
	MergeTokens ( t1: idToken, t2: idToken ): number {
		// merging of a name with a name or number
		if ( t1.type == TT_NAME && ( t2.type == TT_NAME || ( t2.type == TT_NUMBER && !( t2.subtype & TT_FLOAT ) ) ) ) {
			t1.Append( t2.c_str ( ) );
			return 1 /*true*/;
		}
		// merging of two strings
		if ( t1.type == TT_STRING && t2.type == TT_STRING ) {
			t1.Append( t2.c_str ( ) );
			return 1 /*true*/;
		}
		// merging of two numbers
		if ( t1.type == TT_NUMBER && t2.type == TT_NUMBER &&
			!( t1.subtype & ( TT_HEX | TT_BINARY ) ) && !( t2.subtype & ( TT_HEX | TT_BINARY ) ) &&
			( !( t1.subtype & TT_FLOAT ) || !( t2.subtype & TT_FLOAT ) ) ) {
			t1.Append( t2.c_str ( ) );
			return 1 /*true*/;
		}

		return 0 /*false*/;
	}
////
/////*
////================
////idParser::AddBuiltinDefines
////================
////*/
////void idParser::AddBuiltinDefines( ) {
////	var i:number;
////	define_t *define;
////	struct builtin
////	{
////		const char *string;
////		int id;
////	} builtin[] = {
////		{ "__LINE__",	BUILTIN_LINE }, 
////		{ "__FILE__",	BUILTIN_FILE },
////		{ "__DATE__",	BUILTIN_DATE },
////		{ "__TIME__",	BUILTIN_TIME },
////		{ "__STDC__", BUILTIN_STDC },
////		{ NULL, 0 }
////	};
////
////	for (i = 0; builtin[i].string; i++) {
////		define = (define_t *) Mem_Alloc(sizeof(define_t) + strlen(builtin[i].string) + 1);
////		define.name = (char *) define + sizeof(define_t);
////		strcpy(define.name, builtin[i].string);
////		define.flags = DEFINE_FIXED;
////		define.builtin = builtin[i].id;
////		define.numparms = 0;
////		define.parms = NULL;
////		define.tokens = NULL;
////		// add the define to the source
////		AddDefineToHash(define, this.definehash);
////	}
////}
////
/////*
////================
////idParser::CopyFirstDefine
////================
////*/
////define_t *idParser::CopyFirstDefine( ) {
////	var i:number;
////
////	for ( i = 0; i < DEFINEHASHSIZE; i++ ) {
////		if ( this.definehash[i] ) {
////			return this.CopyDefine(this.definehash[i]);
////		}
////	}
////	return NULL;
////}
////
/*
================
idParser::ExpandBuiltinDefine
================
*/
	/*int*/ExpandBuiltinDefine(deftoken: idToken, define: define_t, /*idToken ***/firsttoken: R<idToken>, /*idToken ***/lasttoken: R<idToken>): number {
		todoThrow();
////	idToken *token;
////	ID_TIME_T t;
////	char *curtime;
////	char buf[MAX_STRING_CHARS];
////
////	token = new idToken(deftoken);
////	switch( define.builtin ) {
////		case BUILTIN_LINE: {
////			sprintf( buf, "%d", deftoken.line );
////			(*token) = buf;
////			token.intvalue = deftoken.line;
////			token.floatvalue = deftoken.line;
////			token.type = TT_NUMBER;
////			token.subtype = TT_DECIMAL | TT_INTEGER | TT_VALUESVALID;
////			token.line = deftoken.line;
////			token.linesCrossed = deftoken.linesCrossed;
////			token.flags = 0;
////			*firsttoken = token;
////			*lasttoken = token;
////			break;
////		}
////		case BUILTIN_FILE: {
////			(*token) = this.scriptstack.GetFileName();
////			token.type = TT_NAME;
////			token.subtype = token.Length();
////			token.line = deftoken.line;
////			token.linesCrossed = deftoken.linesCrossed;
////			token.flags = 0;
////			*firsttoken = token;
////			*lasttoken = token;
////			break;
////		}
////		case BUILTIN_DATE: {
////			t = time(NULL);
////			curtime = ctime(&t);
////			(*token) = "\"";
////			token.Append( curtime+4 );
////			token[7] = '\0';
////			token.Append( curtime+20 );
////			token[10] = '\0';
////			token.Append( "\"" );
////			free(curtime);
////			token.type = TT_STRING;
////			token.subtype = token.Length();
////			token.line = deftoken.line;
////			token.linesCrossed = deftoken.linesCrossed;
////			token.flags = 0;
////			*firsttoken = token;
////			*lasttoken = token;
////			break;
////		}
////		case BUILTIN_TIME: {
////			t = time(NULL);
////			curtime = ctime(&t);
////			(*token) = "\"";
////			token.Append( curtime+11 );
////			token[8] = '\0';
////			token.Append( "\"" );
////			free(curtime);
////			token.type = TT_STRING;
////			token.subtype = token.Length();
////			token.line = deftoken.line;
////			token.linesCrossed = deftoken.linesCrossed;
////			token.flags = 0;
////			*firsttoken = token;
////			*lasttoken = token;
////			break;
////		}
////		case BUILTIN_STDC: {
////			this.Warning( "__STDC__ not supported\n" );
////			*firsttoken = NULL;
////			*lasttoken = NULL;
////			break;
////		}
////		default: {
////			*firsttoken = NULL;
////			*lasttoken = NULL;
////			break;
////		}
////	}
	return 1/*true*/;
}

/*
================
idParser::ExpandDefine
================
*/
	ExpandDefine ( deftoken: idToken, define: define_t, firsttoken: R<idToken>, lasttoken: R<idToken> ): number {
		var parms = new Array<idToken>( MAX_DEFINEPARMS ), dt: idToken, pt: idToken, t: idToken;
		var t1: idToken, t2: idToken, first: idToken, last: idToken, nextpt: idToken, token = new R( new idToken );
		var /*int */parmnum: number, i: number;

		// if it is a builtin define
		if ( define.builtin ) {
			return this.ExpandBuiltinDefine( deftoken, define, firsttoken, lasttoken );
		}
		// if the define has parameters
		if ( define.numparms ) {
			if ( !this.ReadDefineParms( define, parms, MAX_DEFINEPARMS ) ) {
				return 0 /*false*/;
			}
//#ifdef DEBUG_EVAL
//		for ( i = 0; i < define.numparms; i++ ) {
//			Log_Write("define parms %d:", i);
//			for ( pt = parms[i]; pt; pt = pt.next ) {
//				Log_Write( "%s", pt.c_str() );
//			}
//		}
//#endif //DEBUG_EVAL
		}
		// empty list at first
		first = null;
		last = null;
		// create a list with tokens of the expanded define
		for ( dt = define.tokens; dt; dt = dt.next ) {
			parmnum = -1;
			// if the token is a name, it could be a define parameter
			if ( dt.type == TT_NAME ) {
				parmnum = this.FindDefineParm( define, dt.c_str ( ) );
			}
			// if it is a define parameter
			if ( parmnum >= 0 ) {
				for ( pt = parms[parmnum]; pt; pt = pt.next ) {
					t = new idToken( pt );
					//add the token to the list
					t.next = null;
					if ( last ) last.next = t;
					else first = t;
					last = t;
				}
			} else {
				// if stringizing operator
				if ( ( dt ).data == "#" ) {
					// the stringizing operator must be followed by a define parameter
					if ( dt.next ) {
						parmnum = this.FindDefineParm( define, dt.next.c_str ( ) );
					} else {
						parmnum = -1;
					}

					if ( parmnum >= 0 ) {
						// step over the stringizing operator
						dt = dt.next;
						// stringize the define parameter tokens
						if ( !this.StringizeTokens( parms[parmnum], token.$ ) ) {
							this.Error( "can't stringize tokens" );
							return 0 /*false*/;
						}
						t = new idToken( token.$ );
						t.line = deftoken.line;
					} else {
						this.Warning( "stringizing operator without define parameter" );
						continue;
					}
				} else {
					t = new idToken( dt );
					t.line = deftoken.line;
				}
				// add the token to the list
				t.next = null;
// the token being read from the define list should use the line number of
// the original file, not the header file			
				t.line = deftoken.line;

				if ( last ) last.next = t;
				else first = t;
				last = t;
			}
		}
		// check for the merging operator
		for ( t = first; t; ) {
			if ( t.next ) {
				// if the merging operator
				if ( ( t.next ).data == "##" ) {
					t1 = t;
					t2 = t.next.next;
					if ( t2 ) {
						if ( !this.MergeTokens( t1, t2 ) ) {
							this.Error( "can't merge '%s' with '%s'", t1.c_str ( ), t2.c_str ( ) );
							return 0 /*false*/;
						}
						delete t1.next;
						t1.next = t2.next;
						if ( t2 == last ) last = t1;
						delete t2;
						continue;
					}
				}
			}
			t = t.next;
		}
		// store the first and last token of the list
		firsttoken.$ = first;
		lasttoken.$ = last;
		// free all the parameter tokens
		for (i = 0; i < define.numparms; i++) {
			todo( "remove this I guess" );
			for ( pt = parms[i]; pt; pt = nextpt ) {
				nextpt = pt.next;
				delete pt;
			}
		}

		return 1 /*true*/;
	}

/*
================
idParser::ExpandDefineIntoSource
================
*/
	ExpandDefineIntoSource ( deftoken: idToken, define: define_t ): number {
		var firsttoken = new R( new idToken ), lasttoken = new R( new idToken );

		if ( !this.ExpandDefine( deftoken, define, firsttoken, lasttoken ) ) {
			return 0 /*false*/;
		}
		// if the define is not empty
		if ( firsttoken.$ && lasttoken.$ ) {
			firsttoken.$.linesCrossed += deftoken.linesCrossed;
			lasttoken.$.next = this.tokens;
			this.tokens = firsttoken.$;
		}
		return 1 /*true*/;
	}

/*
================
idParser::ReadLine

reads a token from the current line, continues reading on the next
line only if a backslash '\' is found
================
*/
	ReadLine ( token: R<idToken> ): number {
		var /*int */crossline: number;

		crossline = 0;
		do {
			if ( !this.ReadSourceToken( token ) ) {
				return 0 /*false*/;
			}

			if ( token.$.linesCrossed > crossline ) {
				this.UnreadSourceToken( token );
				return 0 /*false*/;
			}
			crossline = 1;
		} while ( ( token ).$.data == "\\" );
		return 1 /*true*/;
	}

/*
================
idParser::Directive_include
================
*/
	/*int*/Directive_include(): number {
	var script: idLexer;
	var token = new R( new idToken );
	var path = new idStr;

	if ( !this.ReadSourceToken( token ) ) {
		this.Error( "#include without file name" );
		return 0/*false*/;
	}
	if ( token.$.linesCrossed > 0 ) {
		this.Error( "#include without file name" );
		return 0/*false*/;
	}
	if ( token.$.type == TT_STRING ) {
		script = new idLexer;
		// try relative to the current file
		path.equals( this.scriptstack.GetFileName ( ) );
		path.StripFilename();
		path.Append("/");
		path.Append( token.$.data );
		if ( !script.LoadFile( path.data, this.OSPath ) ) {
			// try absolute path
			path.equals( token.$.data );
			if (!script.LoadFile(path.data, this.OSPath ) ) {
				// try from the include path
				path.equals( this.includepath.data + token );
				if (!script.LoadFile(path.data, this.OSPath ) ) {
					delete script;
					script = null;
				}
			}
		}
	}
	else if ( token.$.type == TT_PUNCTUATION && token.$.data == "<" ) {
		path = this.includepath;
		while( this.ReadSourceToken( token ) ) {
			if ( token.$.linesCrossed > 0 ) {
				this.UnreadSourceToken( token );
				break;
			}
			if (token.$.type == TT_PUNCTUATION && token.$.data == ">" ) {
				break;
			}
			path.Append( token.$.data );
		}
		if (token.$.data != ">" ) {
			this.Warning( "#include missing trailing >" );
		}
		if ( !path.Length() ) {
			this.Error( "#include without file name between < >" );
			return 0/*false*/;
		}
		if (this.flags & lexerFlags_t.LEXFL_NOBASEINCLUDES ) {
			return 1/*true*/;
		}
		script = new idLexer;
		if ( !script.LoadFile( this.includepath.data + path, this.OSPath ) ) {
			delete script;
			script = null;
		}
	}
	else {
		this.Error( "#include without file name" );
		return 0/*false*/;
	}
	if (!script) {
		this.Error( "file '%s' not found", path.c_str() );
		return 0/*false*/;
	}
	script.SetFlags( this.flags );
	script.SetPunctuations( this.punctuations );
	this.PushScript( script );
	return 1/*true*/;
}

/*
================
idParser::Directive_undef
================
*/
/*int*/
	Directive_undef(): number {
		var token = new R( new idToken );
		var define: define_t, lastdefine: define_t;
		var /*int */hash: number;

		//
		if ( !this.ReadLine( token ) ) {
			this.Error( "undef without name" );
			return 0 /*false*/;
		}
		if ( token.$.type != TT_NAME ) {
			this.UnreadSourceToken( token );
			this.Error( "expected name but found '%s'", token.$.c_str ( ) );
			return 0 /*false*/;
		}

		hash = this.PC_NameHash( token.$.c_str ( ) );
		for ( lastdefine = null, define = this.definehash[hash]; define; define = define.hashnext ) {
			if ( !strcmp( define.name, token.$.c_str ( ) ) ) {
				if ( define.flags & DEFINE_FIXED ) {
					this.Warning( "can't undef '%s'", token.$.c_str ( ) );
				} else {
					if ( lastdefine ) {
						lastdefine.hashnext = define.hashnext;
					} else {
						this.definehash[hash] = define.hashnext;
					}
					this.FreeDefine( define );
				}
				break;
			}
			lastdefine = define;
		}
		return 1 /*true*/;
	}

/*
================
idParser::Directive_define
================
*/
	/*int*/
	Directive_define ( ): number {
		var token = new R( new idToken ), t = new R( new idToken ), last = new R( new idToken );
		var define: define_t;

		if ( !this.ReadLine( token ) ) {
			this.Error( "#define without name" );
			return 0 /*false*/;
		}
		if ( token.$.type != TT_NAME ) {
			this.UnreadSourceToken( token );
			this.Error( "expected name after #define, found '%s'", token.$.c_str ( ) );
			return 0 /*false*/;
		}
		// check if the define already exists
		define = this.FindHashedDefine( this.definehash, token.$.c_str ( ) );
		if ( define ) {
			if ( define.flags & DEFINE_FIXED ) {
				this.Error( "can't redefine '%s'", token.$.c_str ( ) );
				return 0 /*false*/;
			}
			this.Warning( "redefinition of '%s'", token.$.c_str ( ) );
			// unread the define name before executing the #undef directive
			this.UnreadSourceToken( token );
			if ( !this.Directive_undef ( ) )
				return 0 /*false*/;
			// if the define was not removed (define.flags & DEFINE_FIXED)
			define = this.FindHashedDefine( this.definehash, token.$.c_str ( ) );
		}
		// allocate define
		define = new define_t; //(define_t *) Mem_ClearedAlloc(sizeof(define_t) + token.$.Length() + 1);
		define.init ( );
		//define.name = (char *) define + sizeof(define_t);
		//strcpy(define.name, token.$.c_str());
		define.name = token.$.c_str ( );
		// add the define to the source
		this.AddDefineToHash( define, this.definehash );
		// if nothing is defined, just return
		if ( !this.ReadLine( token ) ) {
			return 1 /*true*/;
		}
		// if it is a define with parameters
		if ( token.$.WhiteSpaceBeforeToken ( ) == 0 && token.$.data == "(" ) {
			// read the define parameters
			last.$ = null;
			if ( !this.CheckTokenString( ")" ) ) {
				while ( 1 ) {
					if ( !this.ReadLine( token ) ) {
						this.Error( "expected define parameter" );
						return 0 /*false*/;
					}
					// if it isn't a name
					if ( token.$.type != TT_NAME ) {
						this.Error( "invalid define parameter" );
						return 0 /*false*/;
					}

					if ( this.FindDefineParm( define, token.$.c_str ( ) ) >= 0 ) {
						this.Error( "two the same define parameters" );
						return 0 /*false*/;
					}
					// add the define parm
					t.$ = new idToken( token.$ );
					t.$.ClearTokenWhiteSpace ( );
					t.$.next = null;
					if ( last.$ ) last.$.next = t.$;
					else define.parms = t.$;
					last.$ = t.$;
					define.numparms++;
					// read next token
					if ( !this.ReadLine( token ) ) {
						this.Error( "define parameters not terminated" );
						return 0 /*false*/;
					}

					if ( token.$.data == ")" ) {
						break;
					}
					// then it must be a comma
					if ( token.$.data != "," ) {
						this.Error( "define not terminated" );
						return 0 /*false*/;
					}
				}
			}
			if ( !this.ReadLine( token ) ) {
				return 1 /*true*/;
			}
		}
		// read the defined stuff
		last.$ = null;
		do {
			t.$ = new idToken( token.$ );
			if ( t.$.type == TT_NAME && !strcmp( t.$.c_str ( ), define.name ) ) {
				t.$.flags |= TOKEN_FL_RECURSIVE_DEFINE;
				this.Warning( "recursive define (removed recursion)" );
			}
			t.$.ClearTokenWhiteSpace ( );
			t.$.next = null;
			if ( last.$ ) last.$.next = t.$;
			else define.tokens = t.$;
			last.$ = t.$;
		} while ( this.ReadLine( token ) );

		if ( last.$ ) {
			// check for merge operators at the beginning or end
			if ( ( define.tokens.data ) == "##" || ( last.$.data ) == "##" ) {
				this.Error( "define with misplaced ##" );
				return 0 /*false*/;
			}
		}
		return 1 /*true*/;
	}

/////*
////================
////idParser::AddDefine
////================
////*/
/////*int*/AddDefine( $string:string ):number{
////	define_t *define;
////
////	define = DefineFromString( string );
////	if (!define) {
////		return 0/*false*/;
////	}
////	AddDefineToHash(define, this.definehash);
////	return 1/*true*/;
////}
////
/*
================
idParser::AddGlobalDefinesToSource
================
*/
	AddGlobalDefinesToSource ( ): void {
		var define: define_t, newdefine: define_t;

		for ( define = idParser.globaldefines; define; define = define.next ) {
			newdefine = this.CopyDefine( define );
			this.AddDefineToHash( newdefine, this.definehash );
		}
	}

/*
================
idParser::Directive_if_def
================
*/
	Directive_if_def ( /*int */type: number ): number {
		var token = new R( new idToken );
		var d: define_t;
		var skip: number;

		if ( !this.ReadLine( token ) ) {
			this.Error( "#ifdef without name" );
			return 0 /*false*/;
		}
		if ( token.$.type != TT_NAME ) {
			this.UnreadSourceToken( token );
			this.Error( "expected name after #ifdef, found '%s'", token.$.c_str ( ) );
			return 0 /*false*/;
		}
		d = this.FindHashedDefine( this.definehash, token.$.c_str ( ) );
		skip = ( type == INDENT_IFDEF ) == ( d == null ) ? 1 : 0;
		this.PushIndent( type, skip );
		return 1 /*true*/;
	}

/*
================
idParser::Directive_ifdef
================
*/
	Directive_ifdef ( ): number {
		return this.Directive_if_def( INDENT_IFDEF );
	}

/*
================
idParser::Directive_ifndef
================
*/
	Directive_ifndef ( ): number {
		return this.Directive_if_def( INDENT_IFNDEF );
	}


/*
================
idParser::Directive_else
================
*/
/*int*/
	Directive_else ( ) :number{
		var /*int */type = new R( 0 ), skip = new R( 0 );

		this.PopIndent( type, skip );
		if ( !type.$ ) {
			this.Error( "misplaced #else" );
			return 0 /*false*/;
		}
		if ( type.$ == INDENT_ELSE ) {
			this.Error( "#else after #else" );
			return 0 /*false*/;
		}
		this.PushIndent( INDENT_ELSE, !skip.$ ? 1 : 0 );
		return 1 /*true*/;
	}

/*
================
idParser::Directive_endif
================
*/
/*int*/
	Directive_endif(): number {
		var /*int */type = new R( 0 ), skip = new R( 0 );

		this.PopIndent( type, skip );
		if ( !type.$ ) {
			this.Error( "misplaced #endif" );
			return 0 /*false*/;
		}
		return 1 /*true*/;
	}

/////*
////================
////idParser::EvaluateTokens
////================
////*/
////typedef struct operator_s
////{
////	int op;
////	int priority;
////	int parentheses;
////	struct operator_s *prev, *next;
////} operator_t;
////
////typedef struct value_s
////{
////	signed long int intvalue;
////	double floatvalue;
////	int parentheses;
////	struct value_s *prev, *next;
////} value_t;
////
////int PC_OperatorPriority(int op) {
////	switch(op) {
////		case P_MUL: return 15;
////		case P_DIV: return 15;
////		case P_MOD: return 15;
////		case P_ADD: return 14;
////		case P_SUB: return 14;
////
////		case P_LOGIC_AND: return 7;
////		case P_LOGIC_OR: return 6;
////		case P_LOGIC_GEQ: return 12;
////		case P_LOGIC_LEQ: return 12;
////		case P_LOGIC_EQ: return 11;
////		case P_LOGIC_UNEQ: return 11;
////
////		case P_LOGIC_NOT: return 16;
////		case P_LOGIC_GREATER: return 12;
////		case P_LOGIC_LESS: return 12;
////
////		case P_RSHIFT: return 13;
////		case P_LSHIFT: return 13;
////
////		case P_BIN_AND: return 10;
////		case P_BIN_OR: return 8;
////		case P_BIN_XOR: return 9;
////		case P_BIN_NOT: return 16;
////
////		case P_COLON: return 5;
////		case P_QUESTIONMARK: return 5;
////	}
////	return 0/*false*/;
////}
////
//////#define AllocValue()			GetClearedMemory(sizeof(value_t));
//////#define FreeValue(val)		FreeMemory(val)
//////#define AllocOperator(op)		op = (operator_t *) GetClearedMemory(sizeof(operator_t));
//////#define FreeOperator(op)		FreeMemory(op);
////
////#define MAX_VALUES		64
////#define MAX_OPERATORS	64
////
////#define AllocValue(val)									\
////	if ( numvalues >= MAX_VALUES ) {					\
////		this.Error( "out of value space\n" );		\
////		error = 1;										\
////		break;											\
////	}													\
////	else {												\
////		val = &value_heap[numvalues++];					\
////	}
////
////#define FreeValue(val)
////
////#define AllocOperator(op)								\
////	if ( numoperators >= MAX_OPERATORS ) {				\
////		this.Error( "out of operator space\n" );	\
////		error = 1;										\
////		break;											\
////	}													\
////	else {												\
////		op = &operator_heap[numoperators++];			\
////	}
////
////#define FreeOperator(op)
////
/////*int*/EvaluateTokens( idToken *tokens, signed long int *intvalue, double *floatvalue, int integer ):number {
////	operator_t *o, *firstoperator, *lastoperator;
////	value_t *v, *firstvalue, *lastvalue, *v1, *v2;
////	idToken *t;
////	int brace = 0;
////	int parentheses = 0;
////	int error = 0;
////	int lastwasvalue = 0;
////	int negativevalue = 0;
////	int questmarkintvalue = 0;
////	double questmarkfloatvalue = 0;
////	int gotquestmarkvalue = false;
////	int lastoperatortype = 0;
////	//
////	operator_t operator_heap[MAX_OPERATORS];
////	int numoperators = 0;
////	value_t value_heap[MAX_VALUES];
////	int numvalues = 0;
////
////	firstoperator = lastoperator = NULL;
////	firstvalue = lastvalue = NULL;
////	if (intvalue) *intvalue = 0;
////	if (floatvalue) *floatvalue = 0;
////	for ( t = this.tokens; t; t = t.next ) {
////		switch( t.type ) {
////			case TT_NAME:
////			{
////				if ( lastwasvalue || negativevalue ) {
////					this.Error( "syntax error in #if/#elif" );
////					error = 1;
////					break;
////				}
////				if ( (*t) != "defined" ) {
////					this.Error( "undefined name '%s' in #if/#elif", t.c_str() );
////					error = 1;
////					break;
////				}
////				t = t.next;
////				if ( (*t) == "(" ) {
////					brace = true;
////					t = t.next;
////				}
////				if (!t || t.type != TT_NAME) {
////					this.Error( "defined() without name in #if/#elif" );
////					error = 1;
////					break;
////				}
////				//v = (value_t *) GetClearedMemory(sizeof(value_t));
////				AllocValue(v);
////				if (FindHashedDefine(this.definehash, t.c_str())) {
////					v.intvalue = 1;
////					v.floatvalue = 1;
////				}
////				else {
////					v.intvalue = 0;
////					v.floatvalue = 0;
////				}
////				v.parentheses = parentheses;
////				v.next = NULL;
////				v.prev = lastvalue;
////				if (lastvalue) lastvalue.next = v;
////				else firstvalue = v;
////				lastvalue = v;
////				if (brace) {
////					t = t.next;
////					if (!t || (*t) != ")" ) {
////						this.Error( "defined missing ) in #if/#elif" );
////						error = 1;
////						break;
////					}
////				}
////				brace = false;
////				// defined() creates a value
////				lastwasvalue = 1;
////				break;
////			}
////			case TT_NUMBER:
////			{
////				if (lastwasvalue) {
////					this.Error( "syntax error in #if/#elif" );
////					error = 1;
////					break;
////				}
////				//v = (value_t *) GetClearedMemory(sizeof(value_t));
////				AllocValue(v);
////				if (negativevalue) {
////					v.intvalue = - t.GetIntValue();
////					v.floatvalue = - t.GetFloatValue();
////				}
////				else {
////					v.intvalue = t.GetIntValue();
////					v.floatvalue = t.GetFloatValue();
////				}
////				v.parentheses = parentheses;
////				v.next = NULL;
////				v.prev = lastvalue;
////				if (lastvalue) lastvalue.next = v;
////				else firstvalue = v;
////				lastvalue = v;
////				//last token was a value
////				lastwasvalue = 1;
////				//
////				negativevalue = 0;
////				break;
////			}
////			case TT_PUNCTUATION:
////			{
////				if (negativevalue) {
////					this.Error( "misplaced minus sign in #if/#elif" );
////					error = 1;
////					break;
////				}
////				if (t.subtype == P_PARENTHESESOPEN) {
////					parentheses++;
////					break;
////				}
////				else if (t.subtype == P_PARENTHESESCLOSE) {
////					parentheses--;
////					if (parentheses < 0) {
////						this.Error( "too many ) in #if/#elsif" );
////						error = 1;
////					}
////					break;
////				}
////				//check for invalid operators on floating point values
////				if ( !integer ) {
////					if (t.subtype == P_BIN_NOT || t.subtype == P_MOD ||
////						t.subtype == P_RSHIFT || t.subtype == P_LSHIFT ||
////						t.subtype == P_BIN_AND || t.subtype == P_BIN_OR ||
////						t.subtype == P_BIN_XOR) {
////						this.Error( "illigal operator '%s' on floating point operands\n", t.c_str() );
////						error = 1;
////						break;
////					}
////				}
////				switch( t.subtype ) {
////					case P_LOGIC_NOT:
////					case P_BIN_NOT:
////					{
////						if (lastwasvalue) {
////							this.Error( "! or ~ after value in #if/#elif" );
////							error = 1;
////							break;
////						}
////						break;
////					}
////					case P_INC:
////					case P_DEC:
////					{
////						this.Error( "++ or -- used in #if/#elif" );
////						break;
////					}
////					case P_SUB:
////					{
////						if (!lastwasvalue) {
////							negativevalue = 1;
////							break;
////						}
////					}
////					
////					case P_MUL:
////					case P_DIV:
////					case P_MOD:
////					case P_ADD:
////
////					case P_LOGIC_AND:
////					case P_LOGIC_OR:
////					case P_LOGIC_GEQ:
////					case P_LOGIC_LEQ:
////					case P_LOGIC_EQ:
////					case P_LOGIC_UNEQ:
////
////					case P_LOGIC_GREATER:
////					case P_LOGIC_LESS:
////
////					case P_RSHIFT:
////					case P_LSHIFT:
////
////					case P_BIN_AND:
////					case P_BIN_OR:
////					case P_BIN_XOR:
////
////					case P_COLON:
////					case P_QUESTIONMARK:
////					{
////						if (!lastwasvalue) {
////							this.Error( "operator '%s' after operator in #if/#elif", t.c_str() );
////							error = 1;
////							break;
////						}
////						break;
////					}
////					default:
////					{
////						this.Error( "invalid operator '%s' in #if/#elif", t.c_str() );
////						error = 1;
////						break;
////					}
////				}
////				if (!error && !negativevalue) {
////					//o = (operator_t *) GetClearedMemory(sizeof(operator_t));
////					AllocOperator(o);
////					o.op = t.subtype;
////					o.priority = PC_OperatorPriority(t.subtype);
////					o.parentheses = parentheses;
////					o.next = NULL;
////					o.prev = lastoperator;
////					if (lastoperator) lastoperator.next = o;
////					else firstoperator = o;
////					lastoperator = o;
////					lastwasvalue = 0;
////				}
////				break;
////			}
////			default:
////			{
////				this.Error( "unknown '%s' in #if/#elif", t.c_str() );
////				error = 1;
////				break;
////			}
////		}
////		if (error) {
////			break;
////		}
////	}
////	if (!error) {
////		if (!lastwasvalue) {
////			this.Error( "trailing operator in #if/#elif" );
////			error = 1;
////		}
////		else if (parentheses) {
////			this.Error( "too many ( in #if/#elif" );
////			error = 1;
////		}
////	}
////	//
////	gotquestmarkvalue = false;
////	questmarkintvalue = 0;
////	questmarkfloatvalue = 0;
////	//while there are operators
////	while( !error && firstoperator ) {
////		v = firstvalue;
////		for (o = firstoperator; o.next; o = o.next) {
////			//if the current operator is nested deeper in parentheses
////			//than the next operator
////			if (o.parentheses > o.next.parentheses) {
////				break;
////			}
////			//if the current and next operator are nested equally deep in parentheses
////			if (o.parentheses == o.next.parentheses) {
////				//if the priority of the current operator is equal or higher
////				//than the priority of the next operator
////				if (o.priority >= o.next.priority) {
////					break;
////				}
////			}
////			//if the arity of the operator isn't equal to 1
////			if (o.op != P_LOGIC_NOT && o.op != P_BIN_NOT) {
////				v = v.next;
////			}
////			//if there's no value or no next value
////			if (!v) {
////				this.Error( "mising values in #if/#elif" );
////				error = 1;
////				break;
////			}
////		}
////		if (error) {
////			break;
////		}
////		v1 = v;
////		v2 = v.next;
////#ifdef DEBUG_EVAL
////		if (integer) {
////			Log_Write("operator %s, value1 = %d", this.scriptstack.getPunctuationFromId(o.op), v1.intvalue);
////			if (v2) Log_Write("value2 = %d", v2.intvalue);
////		}
////		else {
////			Log_Write("operator %s, value1 = %f", this.scriptstack.getPunctuationFromId(o.op), v1.floatvalue);
////			if (v2) Log_Write("value2 = %f", v2.floatvalue);
////		}
////#endif //DEBUG_EVAL
////		switch(o.op) {
////			case P_LOGIC_NOT:		v1.intvalue = !v1.intvalue;
////									v1.floatvalue = !v1.floatvalue; break;
////			case P_BIN_NOT:			v1.intvalue = ~v1.intvalue;
////									break;
////			case P_MUL:				v1.intvalue *= v2.intvalue;
////									v1.floatvalue *= v2.floatvalue; break;
////			case P_DIV:				if (!v2.intvalue || !v2.floatvalue)
////									{
////										this.Error( "divide by zero in #if/#elif\n" );
////										error = 1;
////										break;
////									}
////									v1.intvalue /= v2.intvalue;
////									v1.floatvalue /= v2.floatvalue; break;
////			case P_MOD:				if (!v2.intvalue)
////									{
////										this.Error( "divide by zero in #if/#elif\n" );
////										error = 1;
////										break;
////									}
////									v1.intvalue %= v2.intvalue; break;
////			case P_ADD:				v1.intvalue += v2.intvalue;
////									v1.floatvalue += v2.floatvalue; break;
////			case P_SUB:				v1.intvalue -= v2.intvalue;
////									v1.floatvalue -= v2.floatvalue; break;
////			case P_LOGIC_AND:		v1.intvalue = v1.intvalue && v2.intvalue;
////									v1.floatvalue = v1.floatvalue && v2.floatvalue; break;
////			case P_LOGIC_OR:		v1.intvalue = v1.intvalue || v2.intvalue;
////									v1.floatvalue = v1.floatvalue || v2.floatvalue; break;
////			case P_LOGIC_GEQ:		v1.intvalue = v1.intvalue >= v2.intvalue;
////									v1.floatvalue = v1.floatvalue >= v2.floatvalue; break;
////			case P_LOGIC_LEQ:		v1.intvalue = v1.intvalue <= v2.intvalue;
////									v1.floatvalue = v1.floatvalue <= v2.floatvalue; break;
////			case P_LOGIC_EQ:		v1.intvalue = v1.intvalue == v2.intvalue;
////									v1.floatvalue = v1.floatvalue == v2.floatvalue; break;
////			case P_LOGIC_UNEQ:		v1.intvalue = v1.intvalue != v2.intvalue;
////									v1.floatvalue = v1.floatvalue != v2.floatvalue; break;
////			case P_LOGIC_GREATER:	v1.intvalue = v1.intvalue > v2.intvalue;
////									v1.floatvalue = v1.floatvalue > v2.floatvalue; break;
////			case P_LOGIC_LESS:		v1.intvalue = v1.intvalue < v2.intvalue;
////									v1.floatvalue = v1.floatvalue < v2.floatvalue; break;
////			case P_RSHIFT:			v1.intvalue >>= v2.intvalue;
////									break;
////			case P_LSHIFT:			v1.intvalue <<= v2.intvalue;
////									break;
////			case P_BIN_AND:			v1.intvalue &= v2.intvalue;
////									break;
////			case P_BIN_OR:			v1.intvalue |= v2.intvalue;
////									break;
////			case P_BIN_XOR:			v1.intvalue ^= v2.intvalue;
////									break;
////			case P_COLON:
////			{
////				if (!gotquestmarkvalue) {
////					this.Error( ": without ? in #if/#elif" );
////					error = 1;
////					break;
////				}
////				if (integer) {
////					if (!questmarkintvalue)
////						v1.intvalue = v2.intvalue;
////				}
////				else {
////					if (!questmarkfloatvalue)
////						v1.floatvalue = v2.floatvalue;
////				}
////				gotquestmarkvalue = false;
////				break;
////			}
////			case P_QUESTIONMARK:
////			{
////				if (gotquestmarkvalue) {
////					this.Error( "? after ? in #if/#elif" );
////					error = 1;
////					break;
////				}
////				questmarkintvalue = v1.intvalue;
////				questmarkfloatvalue = v1.floatvalue;
////				gotquestmarkvalue = true;
////				break;
////			}
////		}
////#ifdef DEBUG_EVAL
////		if (integer) Log_Write("result value = %d", v1.intvalue);
////		else Log_Write("result value = %f", v1.floatvalue);
////#endif //DEBUG_EVAL
////		if (error)
////			break;
////		lastoperatortype = o.op;
////		//if not an operator with arity 1
////		if (o.op != P_LOGIC_NOT && o.op != P_BIN_NOT) {
////			//remove the second value if not question mark operator
////			if (o.op != P_QUESTIONMARK) {
////				v = v.next;
////			}
////			//
////			if (v.prev) v.prev.next = v.next;
////			else firstvalue = v.next;
////			if (v.next) v.next.prev = v.prev;
////			else lastvalue = v.prev;
////			//FreeMemory(v);
////			FreeValue(v);
////		}
////		//remove the operator
////		if (o.prev) o.prev.next = o.next;
////		else firstoperator = o.next;
////		if (o.next) o.next.prev = o.prev;
////		else lastoperator = o.prev;
////		//FreeMemory(o);
////		FreeOperator(o);
////	}
////	if (firstvalue) {
////		if (intvalue) *intvalue = firstvalue.intvalue;
////		if (floatvalue) *floatvalue = firstvalue.floatvalue;
////	}
////	for (o = firstoperator; o; o = lastoperator) {
////		lastoperator = o.next;
////		//FreeMemory(o);
////		FreeOperator(o);
////	}
////	for (v = firstvalue; v; v = lastvalue) {
////		lastvalue = v.next;
////		//FreeMemory(v);
////		FreeValue(v);
////	}
////	if (!error) {
////		return 1/*true*/;
////	}
////	if (intvalue) {
////		*intvalue = 0;
////	}
////	if (floatvalue) {
////		*floatvalue = 0;
////	}
////	return 0/*false*/;
////}
////
/*
================
idParser::Evaluate
================
*/
	Evaluate ( /*signed long int **/intvalue: R<number>, /*double **/floatvalue: R<number>, /*int */integer: number ): number {
		todoThrow ( );
////	idToken token, *firsttoken, *lasttoken;
////	idToken *t, *nexttoken;
////	define_t *define;
////	int defined = false;
////
////	if (intvalue) {
////		*intvalue = 0;
////	}
////	if (floatvalue) {
////		*floatvalue = 0;
////	}
////	//
////	if ( !this.ReadLine( &token ) ) {
////		this.Error( "no value after #if/#elif" );
////		return 0/*false*/;
////	}
////	firsttoken = NULL;
////	lasttoken = NULL;
////	do {
////		//if the token is a name
////		if (token.type == TT_NAME) {
////			if (defined) {
////				defined = false;
////				t = new idToken(token);
////				t.next = NULL;
////				if (lasttoken) lasttoken.next = t;
////				else firsttoken = t;
////				lasttoken = t;
////			}
////			else if ( token == "defined" ) {
////				defined = true;
////				t = new idToken(token);
////				t.next = NULL;
////				if (lasttoken) lasttoken.next = t;
////				else firsttoken = t;
////				lasttoken = t;
////			}
////			else {
////				//then it must be a define
////				define = FindHashedDefine(this.definehash, token.c_str());
////				if (!define) {
////					this.Error( "can't Evaluate '%s', not defined", token.c_str() );
////					return 0/*false*/;
////				}
////				if ( !this.ExpandDefineIntoSource( &token, define ) ) {
////					return 0/*false*/;
////				}
////			}
////		}
////		//if the token is a number or a punctuation
////		else if (token.type == TT_NUMBER || token.type == TT_PUNCTUATION) {
////			t = new idToken(token);
////			t.next = NULL;
////			if (lasttoken) lasttoken.next = t;
////			else firsttoken = t;
////			lasttoken = t;
////		}
////		else {
////			this.Error( "can't Evaluate '%s'", token.c_str() );
////			return 0/*false*/;
////		}
////	} while(this.ReadLine( &token ));
////	//
////	if ( !idParser::EvaluateTokens( firsttoken, intvalue, floatvalue, integer ) ) {
////		return 0/*false*/;
////	}
////	//
////#ifdef DEBUG_EVAL
////	Log_Write("eval:");
////#endif //DEBUG_EVAL
////	for (t = firsttoken; t; t = nexttoken) {
////#ifdef DEBUG_EVAL
////		Log_Write(" %s", t.c_str());
////#endif //DEBUG_EVAL
////		nexttoken = t.next;
////		delete t;
////	} //end for
////#ifdef DEBUG_EVAL
////	if (integer) Log_Write("eval result: %d", *intvalue);
////	else Log_Write("eval result: %f", *floatvalue);
////#endif //DEBUG_EVAL
////	//
		return 1 /*true*/;
	}

/////*
////================
////idParser::DollarEvaluate
////================
////*/
/////*int*/DollarEvaluate( signed long int *intvalue, double *floatvalue, int integer):number {
////	int indent, defined = false;
////	idToken token, *firsttoken, *lasttoken;
////	idToken *t, *nexttoken;
////	define_t *define;
////
////	if (intvalue) {
////		*intvalue = 0;
////	}
////	if (floatvalue) {
////		*floatvalue = 0;
////	}
////	//
////	if ( !this.ReadSourceToken( &token ) ) {
////		this.Error( "no leading ( after $evalint/$evalfloat" );
////		return 0/*false*/;
////	}
////	if ( !this.ReadSourceToken( &token ) ) {
////		this.Error( "nothing to Evaluate" );
////		return 0/*false*/;
////	}
////	indent = 1;
////	firsttoken = NULL;
////	lasttoken = NULL;
////	do {
////		//if the token is a name
////		if (token.type == TT_NAME) {
////			if (defined) {
////				defined = false;
////				t = new idToken(token);
////				t.next = NULL;
////				if (lasttoken) lasttoken.next = t;
////				else firsttoken = t;
////				lasttoken = t;
////			}
////			else if ( token == "defined" ) {
////				defined = true;
////				t = new idToken(token);
////				t.next = NULL;
////				if (lasttoken) lasttoken.next = t;
////				else firsttoken = t;
////				lasttoken = t;
////			}
////			else {
////				//then it must be a define
////				define = FindHashedDefine(this.definehash, token.c_str());
////				if (!define) {
////					this.Warning( "can't Evaluate '%s', not defined", token.c_str() );
////					return 0/*false*/;
////				}
////				if ( !this.ExpandDefineIntoSource( &token, define ) ) {
////					return 0/*false*/;
////				}
////			}
////		}
////		//if the token is a number or a punctuation
////		else if (token.type == TT_NUMBER || token.type == TT_PUNCTUATION) {
////			if ( token[0] == '(' ) indent++;
////			else if ( token[0] == ')' ) indent--;
////			if (indent <= 0) {
////				break;
////			}
////			t = new idToken(token);
////			t.next = NULL;
////			if (lasttoken) lasttoken.next = t;
////			else firsttoken = t;
////			lasttoken = t;
////		}
////		else {
////			this.Error( "can't Evaluate '%s'", token.c_str() );
////			return 0/*false*/;
////		}
////	} while(this.ReadSourceToken( &token ));
////	//
////	if (!idParser::EvaluateTokens( firsttoken, intvalue, floatvalue, integer)) {
////		return 0/*false*/;
////	}
////	//
////#ifdef DEBUG_EVAL
////	Log_Write("$eval:");
////#endif //DEBUG_EVAL
////	for (t = firsttoken; t; t = nexttoken) {
////#ifdef DEBUG_EVAL
////		Log_Write(" %s", t.c_str());
////#endif //DEBUG_EVAL
////		nexttoken = t.next;
////		delete t;
////	} //end for
////#ifdef DEBUG_EVAL
////	if (integer) Log_Write("$eval result: %d", *intvalue);
////	else Log_Write("$eval result: %f", *floatvalue);
////#endif //DEBUG_EVAL
////	//
////	return 1/*true*/;
////}
////
/*
================
idParser::Directive_elif
================
*/
	Directive_elif ( ): number {
		var /*signed long int */value = new R( 0 );
		var /*int */type = new R( 0 ), skip = new R( 0 );

		this.PopIndent( type, skip );
		if ( !type.$ || type.$ == INDENT_ELSE ) {
			this.Error( "misplaced #elif" );
			return 0 /*false*/;
		}
		if ( !this.Evaluate( value, new R( 0 ), 1/*true */) ) {
			return 0 /*false*/;
		}
		skip.$ = ( value.$ == 0 ) ? 1 : 0;
		this.PushIndent( INDENT_ELIF, skip.$ );
		return 1 /*true*/;
	}

/*
================
idParser::Directive_if
================
*/
	Directive_if ( ): number {
		var /*signed long int */value = new R( 0 );
		var /*int */skip: number;

		if ( !this.Evaluate( value, new R( 0 ), 1 /*true */ ) ) {
			return 0 /*false*/;
		}
		skip = ( value.$ == 0 ) ? 1 : 0;
		this.PushIndent( INDENT_IF, skip );
		return 1 /*true*/;
	}

/*
================
idParser::Directive_line
================
*/
	Directive_line ( ): number {
		var token = new R( new idToken );

		this.Error( "#line directive not supported" );
		while ( this.ReadLine( token ) ) {
		}
		return 1 /*true*/;
	}

/*
================
idParser::Directive_error
================
*/
/*int*/
	Directive_error(): number {
		var token = new R( new idToken );

		if ( !this.ReadLine( token ) || token.$.type != TT_STRING ) {
			this.Error( "#error without string" );
			return 0 /*false*/;
		}
		this.Error( "#error: %s", token.$.c_str ( ) );
		return 1 /*true*/;
	}

/*
================
idParser::Directive_warning
================
*/
	/*int*/Directive_warning(): number {
	var token = new R( new idToken );

	if ( !this.ReadLine( token) || token.$.type != TT_STRING ) {
		this.Warning( "#warning without string" );
		return 0/*false*/;
	}
	this.Warning( "#warning: %s", token.$.c_str() );
	return 1/*true*/;
}

/*
================
idParser::Directive_pragma
================
*/
/*int*/Directive_pragma( ) {
	var token = new R( new idToken );

	this.Warning( "#pragma directive not supported" );
	while( this.ReadLine( token ) ) {
	}
	return 1/*true*/;
}

/*
================
idParser::UnreadSignToken
================
*/
UnreadSignToken( ):void {
	var token = new R( new idToken );

	token.$.line = this.scriptstack.GetLineNum();
	token.$.whiteSpaceStart_p = NULL;
	token.$.whiteSpaceEnd_p = NULL;
	token.$.linesCrossed = 0;
	token.$.flags = 0;
	token.$.equals("-");
	token.$.type = TT_PUNCTUATION;
	token.$.subtype = P_SUB;
	this.UnreadSourceToken( token );
}

/*
================
idParser::Directive_eval
================
*/
/*int*/Directive_eval( ):number {
	todoThrow();
	//signed long int value;
	//var token = new R( new idToken );
	//char buf[128];

	//if ( !this.Evaluate( &value, NULL, true ) ) {
	//	return 0/*false*/;
	//}

	//token.line = this.scriptstack.GetLineNum();
	//token.whiteSpaceStart_p = NULL;
	//token.whiteSpaceEnd_p = NULL;
	//token.linesCrossed = 0;
	//token.flags = 0;
	//sprintf(buf, "%d", abs(value));
	//token = buf;
	//token.type = TT_NUMBER;
	//token.subtype = TT_INTEGER|TT_LONG|TT_DECIMAL;
	//this.UnreadSourceToken( &token );
	//if ( value < 0 ) {
	//	idParser::UnreadSignToken();
	//}
	return 1/*true*/;
}

/*
================
idParser::Directive_evalfloat
================
*/
	/*int*/Directive_evalfloat(): number
{
	todoThrow ( );
	//double value;
	//var token = new R( new idToken );;
	//char buf[128];

	//if ( !this.Evaluate( NULL, &value, false ) ) {
	//	return 0/*false*/;
	//}

	//token.line = this.scriptstack.GetLineNum();
	//token.whiteSpaceStart_p = NULL;
	//token.whiteSpaceEnd_p = NULL;
	//token.linesCrossed = 0;
	//token.flags = 0;
	//sprintf(buf, "%1.2f", idMath.Fabs(value));
	//token = buf;
	//token.type = TT_NUMBER;
	//token.subtype = TT_FLOAT|TT_LONG|TT_DECIMAL;
	//this.UnreadSourceToken( token );
	//if (value < 0) {
	//	idParser::UnreadSignToken();
	//}
	return 1 /*true*/;
}

/*
================
idParser::ReadDirective
================
*/
	ReadDirective ( ): number {
		var token = new R( new idToken );

		//read the directive name
		if ( !this.ReadSourceToken( token ) ) {
			this.Error( "found '#' without name" );
			return 0 /*false*/;
		}
		//directive name must be on the same line
		if ( token.$.linesCrossed > 0 ) {
			this.UnreadSourceToken( token );
			this.Error( "found '#' at end of line" );
			return 0 /*false*/;
		}
		//if if is a name
		if ( token.$.type == TT_NAME ) {
			if ( token.$.data == "if" ) {
				return this.Directive_if ( );
			} else if ( token.$.data == "ifdef" ) {
				return this.Directive_ifdef ( );
			} else if ( token.$.data == "ifndef" ) {
				return this.Directive_ifndef ( );
			} else if ( token.$.data == "elif" ) {
				return this.Directive_elif ( );
			} else if ( token.$.data == "else" ) {
				return this.Directive_else ( );
			} else if ( token.$.data == "endif" ) {
				return this.Directive_endif ( );
			} else if ( this.skip > 0 ) {
				// skip the rest of the line
				while ( this.ReadLine( token ) ) {
				}
				return 1 /*true*/;
			} else {
				if ( token.$.data == "include" ) {
					return this.Directive_include ( );
				} else if ( token.$.data == "define" ) {
					return this.Directive_define ( );
				} else if ( token.$.data == "undef" ) {
					return this.Directive_undef ( );
				} else if ( token.$.data == "line" ) {
					return this.Directive_line ( );
				} else if ( token.$.data == "error" ) {
					return this.Directive_error ( );
				} else if ( token.$.data == "warning" ) {
					return this.Directive_warning ( );
				} else if ( token.$.data == "pragma" ) {
					return this.Directive_pragma ( );
				} else if ( token.$.data == "eval" ) {
					return this.Directive_eval ( );
				} else if ( token.$.data == "evalfloat" ) {
					return this.Directive_evalfloat ( );
				}
			}
		}
		this.Error( "unknown precompiler directive '%s'", token.$.c_str ( ) );
		return 0 /*false*/;
	}

/*
================
idParser::DollarDirective_evalint
================
*/
	/*int */
	DollarDirective_evalint ( ): number {
		todoThrow ( );
		//signed long int value;
		//var token = new R( new idToken );
		//char buf[128];

		//if ( !idParser::DollarEvaluate( &value, NULL, true ) ) {
		//	return 0/*false*/;
		//}

		//token.line = this.scriptstack.GetLineNum();
		//token.whiteSpaceStart_p = NULL;
		//token.whiteSpaceEnd_p = NULL;
		//token.linesCrossed = 0;
		//token.flags = 0;
		//sprintf( buf, "%d", abs( value ) );
		//token = buf;
		//token.type = TT_NUMBER;
		//token.subtype = TT_INTEGER | TT_LONG | TT_DECIMAL | TT_VALUESVALID;
		//token.intvalue = abs( value );
		//token.floatvalue = abs( value );
		//this.UnreadSourceToken( &token );
		//if ( value < 0 ) {
		//	idParser::UnreadSignToken();
		//}
		return 1/*true*/;
	}

/*
================
idParser::DollarDirective_evalfloat
================
*/
	DollarDirective_evalfloat ( ): number {
		todoThrow ( );
		//double value;
		//var token = new R( new idToken );
		//char buf[128];

		//if ( !idParser::DollarEvaluate( NULL, &value, false ) ) {
		//	return 0/*false*/;
		//}

		//token.line = this.scriptstack.GetLineNum();
		//token.whiteSpaceStart_p = NULL;
		//token.whiteSpaceEnd_p = NULL;
		//token.linesCrossed = 0;
		//token.flags = 0;
		//sprintf( buf, "%1.2f", fabs( value ) );
		//token = buf;
		//token.type = TT_NUMBER;
		//token.subtype = TT_FLOAT | TT_LONG | TT_DECIMAL | TT_VALUESVALID;
		//token.intvalue = (unsigned long) fabs( value );
		//token.floatvalue = fabs( value );
		//this.UnreadSourceToken( &token );
		//if ( value < 0 ) {
		//	idParser::UnreadSignToken();
		//}
		return 1 /*true*/;
	}

/*
================
idParser::ReadDollarDirective
================
*/
	ReadDollarDirective ( ): number {
		var token = new R( new idToken );

		// read the directive name
		if ( !this.ReadSourceToken( token ) ) {
			this.Error( "found '$' without name" );
			return 0 /*false*/;
		}
		// directive name must be on the same line
		if ( token.$.linesCrossed > 0 ) {
			this.UnreadSourceToken( token );
			this.Error( "found '$' at end of line" );
			return 0 /*false*/;
		}
		// if if is a name
		if ( token.$.type == TT_NAME ) {
			if ( token.$.data == "evalint" ) {
				return this.DollarDirective_evalint ( );
			} else if ( token.$.data == "evalfloat" ) {
				return this.DollarDirective_evalfloat ( );
			}
		}
		this.UnreadSourceToken( token );
		return 0 /*false*/;
	}

/*
================
idParser::ReadToken
================
*/
	ReadToken(token: R<idToken >):number {
		var define: define_t ;

	while(1) {
		if ( !this.ReadSourceToken( token ) ) {
			return 0/*false*/;
		}
		// check for precompiler directives
		if (token.$.type == TT_PUNCTUATION && token.$.data[0] == '#' && !token.$.data[1] /*== '\0'*/ ) {
			// read the precompiler directive
			if ( !this.ReadDirective() ) {
				return 0/*false*/;
			}
			continue;
		}
		// if skipping source because of conditional compilation
		if (this.skip ) {
			continue;
		}
		// recursively concatenate strings that are behind each other still resolving defines
		if (token.$.type == TT_STRING && !(this.scriptstack.GetFlags() & lexerFlags_t.LEXFL_NOSTRINGCONCAT) ) {
			var newtoken = new R(new idToken);
			if ( this.ReadToken( newtoken ) ) {
				if ( newtoken.$.type == TT_STRING ) {
					token.$.Append( newtoken.$.c_str() );
				}
				else {
					this.UnreadSourceToken( newtoken );
				}
			}
		}
		//
		if (!(this.scriptstack.GetFlags() & lexerFlags_t.LEXFL_NODOLLARPRECOMPILE) ) {
			// check for special precompiler directives
			if (token.$.type == TT_PUNCTUATION && token.$.data[0] == '$' && !token.$.data[1]/* == '\0'*/ ) {
				// read the precompiler directive
				if ( this.ReadDollarDirective() ) {
					continue;
				}
			}
		}
		// if the token is a name
		if (token.$.type == TT_NAME && !( token.$.flags & TOKEN_FL_RECURSIVE_DEFINE ) ) {
			// check if the name is a define macro
			define = this.FindHashedDefine( this.definehash, token.$.c_str() );
			// if it is a define macro
			if ( define ) {
				// expand the defined macro
				if ( !this.ExpandDefineIntoSource( token.$, define ) ) {
					return 0/*false*/;
				}
				continue;
			}
		}
		// found a token
		return 1/*true*/;
	}
}

/*
================
idParser::ExpectTokenString
================
*/
/*int*/
	ExpectTokenString ( $string: string ): number {
		var token = new R( new idToken ( ) );

		if ( !this.ReadToken( token ) ) {
			this.Error( "couldn't find expected '%s'", $string );
			return 0 /*false*/;
		}

		if ( token.$.data != $string ) {
			this.Error( "expected '%s' but found '%s'", $string, token.$.c_str ( ) );
			return 0 /*false*/;
		}
		return 1 /*true*/;
	}

/*
================
idParser::ExpectTokenType
================
*/
	/*int*/
	ExpectTokenType(/*int*/ type: number, /*int */subtype: number, token: R<idToken>): number{
		var str = new idStr;

		if ( !this.ReadToken( token ) ) {
			this.Error( "couldn't read expected token" );
			return 0;
		}

			if (token.$.type != type ) {
			switch( type ) {
				case TT_STRING: str.equals("string"); break;
				case TT_LITERAL: str.equals("literal"); break;
				case TT_NUMBER: str.equals("number"); break;
				case TT_NAME: str.equals("name"); break;
				case TT_PUNCTUATION: str.equals("punctuation"); break;
				default: str.equals("unknown type"); break;
			}
				this.Error("expected a %s but found '%s'", str.c_str(), token.$.c_str() );
			return 0;
		}
			if (token.$.type == TT_NUMBER ) {
				if ((token.$.subtype & subtype) != subtype ) {
				str.Clear();
				if ( subtype & TT_DECIMAL ) str.equals("decimal ");
				if (subtype & TT_HEX) str.equals("hex ");
				if (subtype & TT_OCTAL) str.equals("octal ");
				if (subtype & TT_BINARY) str.equals("binary ");
					if (subtype & TT_UNSIGNED) str.Append( "unsigned ");
				if ( subtype & TT_LONG ) str.Append("long ");
				if ( subtype & TT_FLOAT ) str.Append("float ");
				if ( subtype & TT_INTEGER ) str.Append("integer ");
				str.StripTrailing( ' ' );
				this.Error( "expected %s but found '%s'", str.c_str(), token.$.c_str() );
				return 0;
			}
		}
		else if ( token.$.type == TT_PUNCTUATION ) {
			if ( subtype < 0 ) {
				this.Error( "BUG: wrong punctuation subtype" );
				return 0;
			}
			if (token.$.subtype != subtype ) {
				this.Error("expected '%s' but found '%s'", this.scriptstack.GetPunctuationFromId(subtype), token.$.c_str() );
				return 0;
			}
		}
		return 1;
	}

/*
================
idParser::ExpectAnyToken
================
*/
	/*int*/
	ExpectAnyToken ( token: R<idToken> ): number {
		if ( !this.ReadToken( token ) ) {
			this.Error( "couldn't read expected token" );
			return 0 /*false*/;
		} else {
			return 1 /*true*/;
		}
	}

/*
================
idParser::CheckTokenString
================
*/
/*int*/
	CheckTokenString ( $string: string ): number {
		var tok = new R( new idToken );

		if ( !this.ReadToken( tok ) ) {
			return 0 /*false*/;
		}
		//if the token is available
		if ( tok.$.data == $string ) {
			return 1 /*true*/;
		}

		this.UnreadSourceToken( tok );
		return 0 /*false*/;
	}

/////*
////================
////idParser::CheckTokenType
////================
////*/
/////*int*/CheckTokenType( int type, int subtype, idToken *token ):number {
////	idToken tok;
////
////	if ( !ReadToken( &tok ) ) {
////		return 0/*false*/;
////	}
////	//if the type matches
////	if (tok.type == type && (tok.subtype & subtype) == subtype) {
////		*token = tok;
////		return 1/*true*/;
////	}
////
////	UnreadSourceToken( &tok );
////	return 0/*false*/;
////}
////
/////*
////================
////idParser::PeekTokenString
////================
////*/
/////*int*/PeekTokenString( $string:string ):number {
////	idToken tok;
////
////	if ( !ReadToken( &tok ) ) {
////		return 0/*false*/;
////	}
////
////	UnreadSourceToken( &tok );
////
////	// if the token is available
////	if ( tok == string ) {
////		return 1/*true*/;
////	}
////	return 0/*false*/;
////}
////
/////*
////================
////idParser::PeekTokenType
////================
////*/
/////*int*/PeekTokenType( int type, int subtype, idToken *token ):number {
////	idToken tok;
////
////	if ( !ReadToken( &tok ) ) {
////		return 0/*false*/;
////	}
////
////	UnreadSourceToken( &tok );
////
////	// if the type matches
////	if ( tok.type == type && ( tok.subtype & subtype ) == subtype ) {
////		*token = tok;
////		return 1/*true*/;
////	}
////	return 0/*false*/;
////}
////
/////*
////================
////idParser::SkipUntilString
////================
////*/
/////*int*/SkipUntilString( $string:string ):number {
////	var token = new R( new idToken );
////
////	while(this.ReadToken( &token )) {
////		if ( token == string ) {
////			return 1/*true*/;
////		}
////	}
////	return 0/*false*/;
////}
////
/////*
////================
////idParser::SkipRestOfLine
////================
////*/
/////*int*/SkipRestOfLine( ):number {
////	var token = new R( new idToken );
////
////	while(this.ReadToken( &token )) {
////		if ( token.linesCrossed ) {
////			this.UnreadSourceToken( &token );
////			return 1/*true*/;
////		}
////	}
////	return 0/*false*/;
////}
////
/////*
////=================
////idParser::SkipBracedSection
////
////Skips until a matching close brace is found.
////Internal brace depths are properly skipped.
////=================
////*/
/////*int*/SkipBracedSection( bool parseFirstBrace ):number {
////	var token = new R( new idToken );
////	int depth;
////
////	depth = parseFirstBrace ? 0 : 1;
////	do {
////		if ( !ReadToken( &token ) ) {
////			return 0/*false*/;
////		}
////		if( token.type == TT_PUNCTUATION ) {
////			if( token == "{" ) {
////				depth++;
////			} else if ( token == "}" ) {
////				depth--;
////			}
////		}
////	} while( depth );
////	return 1/*true*/;
////}
////
/////*
////=================
////idParser::ParseBracedSectionExact
////
////The next token should be an open brace.
////Parses until a matching close brace is found.
////Maintains the exact formating of the braced section
////
////  FIXME: what about precompilation ?
////=================
////*/
////const char *idParser::ParseBracedSectionExact( idStr &out, int tabs ) {
////	return this.scriptstack.ParseBracedSectionExact( out, tabs );
////}
////
/////*
////=================
////idParser::ParseBracedSection
////
////The next token should be an open brace.
////Parses until a matching close brace is found.
////Internal brace depths are properly skipped.
////=================
////*/
////const char *idParser::ParseBracedSection( idStr &out, int tabs ) {
////	var token = new R( new idToken );
////	int i, depth;
////	bool doTabs = false;
////	if (tabs >= 0) {
////		doTabs = true;
////	}
////
////	out.Empty();
////	if ( !idParser::ExpectTokenString( "{" ) ) {
////		return out.c_str();
////	}
////	out = "{";
////	depth = 1;
////	do {
////		if ( !this.ReadToken( &token ) ) {
////			Error( "missing closing brace" );
////			return out.c_str();
////		}
////
////		// if the token is on a new line
////		for ( i = 0; i < token.linesCrossed; i++ ) {
////			out += "\r\n";
////		}
////
////		if (doTabs && token.linesCrossed) {
////			i = tabs;
////			if (token[0] == '}' && i > 0) {
////				i--;
////			}
////			while (i-- > 0) {
////				out += "\t";
////			}
////		}
////		if ( token.type == TT_PUNCTUATION ) {
////			if ( token[0] == '{' ) {
////				depth++;
////				if (doTabs) {
////					tabs++;
////				}
////			}
////			else if ( token[0] == '}' ) {
////				depth--;
////				if (doTabs) {
////					tabs--;
////				}
////			}
////		}
////
////		if ( token.type == TT_STRING ) {
////			out += "\"" + token + "\"";
////		}
////		else {
////			out += token;
////		}
////		out += " ";
////	} while( depth );
////
////	return out.c_str();
////}
////
/////*
////=================
////idParser::ParseRestOfLine
////
////  parse the rest of the line
////=================
////*/
////const char *idParser::ParseRestOfLine( idStr &out ) {
////	var token = new R( new idToken );
////
////	out.Empty();
////	while(this.ReadToken( &token )) {
////		if ( token.linesCrossed ) {
////			this.UnreadSourceToken( &token );
////			break;
////		}
////		if ( out.Length() ) {
////			out += " ";
////		}
////		out += token;
////	}
////	return out.c_str();
////}
////
/*
================
idParser::UnreadToken
================
*/
	UnreadToken ( token: R<idToken> ): void {
		this.UnreadSourceToken( token );
	}
////
/////*
////================
////idParser::ReadTokenOnLine
////================
////*/
/////*int*/ReadTokenOnLine( idToken *token ):number {
////	idToken tok;
////
////	if (!this.ReadToken( &tok )) {
////		return 0/*false*/;
////	}
////	// if no lines were crossed before this token
////	if ( !tok.linesCrossed ) {
////		*token = tok;
////		return 1/*true*/;
////	}
////	//
////	this.UnreadSourceToken( &tok );
////	return 0/*false*/;
////}

/*
================
idParser::ParseInt
================
*/
/*int*/
	ParseInt ( ): number {
		var token = new R( new idToken );

		if ( !this.ReadToken( token ) ) {
			this.Error( "couldn't read expected integer" );
			return 0;
		}
		if ( token.$.type == TT_PUNCTUATION && token.$.data == "-" ) {
			this.ExpectTokenType( TT_NUMBER, TT_INTEGER, token );
			return -( /*(signed int)*/ int( token.$.GetIntValue ( ) ) );
		} else if ( token.$.type != TT_NUMBER || token.$.subtype == TT_FLOAT ) {
			this.Error( "expected integer value, found '%s'", token.$.c_str ( ) );
		}
		return token.$.GetIntValue ( );
	}

/*
================
idParser::ParseBool
================
*/
	ParseBool ( ): boolean {
		var token = new R( new idToken );

		if ( !this.ExpectTokenType( TT_NUMBER, 0, token ) ) {
			this.Error( "couldn't read expected boolean" );
			return false;
		}
		return ( token.$.GetIntValue ( ) != 0 );
	}

/*
================
idParser::ParseFloat
================
*/
/*float */
	ParseFloat ( ): number {
		var token = new R( new idToken );

		if ( !this.ReadToken( token ) ) {
			this.Error( "couldn't read expected floating point number" );
			return 0.0;
		}
		if ( token.$.type == TT_PUNCTUATION && token.$.data == "-" ) {
			this.ExpectTokenType( TT_NUMBER, 0, token );
			return -token.$.GetFloatValue ( );
		} else if ( token.$.type != TT_NUMBER ) {
			this.Error( "expected float value, found '%s'", token.$.c_str ( ) );
		}
		return token.$.GetFloatValue ( );
	}

/////*
////================
////idParser::Parse1DMatrix
////================
////*/
/////*int*/Parse1DMatrix( int x, float *m ):number {
////	var i:number;
////
////	if ( !idParser::ExpectTokenString( "(" ) ) {
////		return 0/*false*/;
////	}
////
////	for ( i = 0; i < x; i++ ) {
////		m[i] = idParser::ParseFloat();
////	}
////
////	if ( !idParser::ExpectTokenString( ")" ) ) {
////		return 0/*false*/;
////	}
////	return 1/*true*/;
////}
////
/////*
////================
////idParser::Parse2DMatrix
////================
////*/
/////*int*/Parse2DMatrix( int y, int x, float *m ):number {
////	var i:number;
////
////	if ( !idParser::ExpectTokenString( "(" ) ) {
////		return 0/*false*/;
////	}
////
////	for ( i = 0; i < y; i++ ) {
////		if ( !idParser::Parse1DMatrix( x, m + i * x ) ) {
////			return 0/*false*/;
////		}
////	}
////
////	if ( !idParser::ExpectTokenString( ")" ) ) {
////		return 0/*false*/;
////	}
////	return 1/*true*/;
////}
////
/////*
////================
////idParser::Parse3DMatrix
////================
////*/
/////*int*/Parse3DMatrix( int z, int y, int x, float *m ):number {
////	var i:number;
////
////	if ( !idParser::ExpectTokenString( "(" ) ) {
////		return 0/*false*/;
////	}
////
////	for ( i = 0 ; i < z; i++ ) {
////		if ( !idParser::Parse2DMatrix( y, x, m + i * x*y ) ) {
////			return 0/*false*/;
////		}
////	}
////
////	if ( !idParser::ExpectTokenString( ")" ) ) {
////		return 0/*false*/;
////	}
////	return 1/*true*/;
////}
////
/////*
////================
////idParser::GetLastWhiteSpace
////================
////*/
/////*int*/GetLastWhiteSpace( idStr &whiteSpace ):number {
////	if ( this.scriptstack ) {
////		this.scriptstack.GetLastWhiteSpace( whiteSpace );
////	} else {
////		whiteSpace.Clear();
////	}
////	return whiteSpace.Length();
////}

/*
================
idParser::SetMarker
================
*/
	SetMarker ( ): void {
		this.marker_p = NULL;
	}

/////*
////================
////idParser::GetStringFromMarker
////
////  FIXME: this is very bad code, the script isn't even garrenteed to still be around
////================
////*/
////void idParser::GetStringFromMarker( idStr& out, bool clean ) {
////	char*	p;
////	char	save;
////
////	if ( this.marker_p == NULL ) {
////		this.marker_p = this.scriptstack.buffer;
////	}
////		
////	if ( this.tokens ) {
////		p = (char*)tokens.whiteSpaceStart_p;
////	} else {
////		p = (char*)scriptstack.script_p;
////	}
////	
////	// Set the end character to NULL to give us a complete string
////	save = *p;
////	*p = 0;
////	
////	// If cleaning then reparse
////	if ( clean ) {	
////		idParser temp( this.marker_p, strlen( this.marker_p ), "temp", flags );
////		var token = new R( new idToken );
////		while ( temp.ReadToken ( &token ) ) {
////			out += token;
////		}
////	} else {
////		out = this.marker_p;
////	}
////	
////	// restore the character we set to NULL
////	*p = save;		
////}
////
/////*
////================
////idParser::SetIncludePath
////================
////*/
////void idParser::SetIncludePath( const char *path ) {
////	idParser::includepath = path;
////	// add trailing path seperator
////	if (idParser::includepath[idParser::includepath.Length()-1] != '\\' &&
////		idParser::includepath[idParser::includepath.Length()-1] != '/') {
////		idParser::includepath += PATHSEPERATOR_STR;
////	}
////}
////
/////*
////================
////idParser::SetPunctuations
////================
////*/
////void idParser::SetPunctuations( const punctuation_t *p ) {
////	this.punctuations = p;
////}
////
/*
================
idParser::SetFlags
================
*/
	SetFlags( /*int*/ flags: number): void {
		var s: idLexer;

		this.flags = flags;
		for ( s = this.scriptstack; s; s = s.next ) {
			s.SetFlags( flags );
		}
	}

/*
================
idParser::GetFlags
================
*/
/*int*/GetFlags( ):number {
	return this.flags;
}

/*
================
idParser::LoadFile
================
*/
	/*int*/
	LoadFile ( filename: string, OSPath = false ): number {
		var script: idLexer;

		if ( this.loaded ) {
			common.FatalError( "idParser::loadFile: another source already loaded" );
			return 0 /*false*/;
		}
		script = new idLexer( filename, 0, OSPath );
		if ( !script.IsLoaded ( ) ) {
			delete script;
			return 0 /*false*/;
		}
		script.SetFlags( this.flags );
		script.SetPunctuations( this.punctuations );
		script.next = null;
		this.OSPath = OSPath;
		this.filename.equals( filename );
		this.scriptstack = script;
		this.tokens = null;
		this.indentstack = null;
		this.skip = 0;
		this.loaded = 1 /*true*/;

		if ( !this.definehash ) {
			this.defines = null;
			this.definehash = new Array<define_t>( DEFINEHASHSIZE ); //(define_t **) Mem_ClearedAlloc( DEFINEHASHSIZE * sizeof(define_t *) );
			this.AddGlobalDefinesToSource ( );
		}
		return 1 /*true*/;
	}

/*
================
idParser::LoadMemory
================
*/
LoadMemory(/*const char **/ptr:string, /*int */length:number, /*const char **/name :string):number {
	var script: idLexer;

	if ( this.loaded ) {
		common.FatalError("idParser::loadMemory: another source already loaded");
		return 0/*false*/;
	}
	script = new idLexer( ptr, length, name, 0 );
	if ( !script.IsLoaded() ) {
		delete script;
		return 0/*false*/;
	}
	script.SetFlags( this.flags );
	script.SetPunctuations( this.punctuations );
	script.next = null;
	this.filename.equals(name);
	this.scriptstack = script;
	this.tokens = null;
	this.indentstack = null;
	this.skip = 0;
	this.loaded = 1/*true*/;

	if (!this.definehash ) {
		this.defines = null;
		this.definehash = new Array <define_t>( DEFINEHASHSIZE ); //(define_t **) Mem_ClearedAlloc( DEFINEHASHSIZE * sizeof(define_t *) );
		this.AddGlobalDefinesToSource();
	}
	return 1/*true*/;
}

/*
================
idParser::FreeSource
================
*/
FreeSource( keepDefines = false ):void {
	var script: idLexer;
	var token: idToken;
	var define: define_t;
	var indent: indent_t ;
	var i:number;

	// free all the scripts
	while( this.scriptstack ) {
		script = this.scriptstack;
		this.scriptstack = this.scriptstack.next;
		delete script;
	}
	// free all the tokens
	while( this.tokens ) {
		token = this.tokens;
		this.tokens = this.tokens.next;
		delete token;
	}
	// free all indents
	while( this.indentstack ) {
		indent = this.indentstack;
		this.indentstack = this.indentstack.next;
		Mem_Free( indent );
	}
	if ( !keepDefines ) {
		// free hash table
		if ( this.definehash ) {
			// free defines
			for ( i = 0; i < DEFINEHASHSIZE; i++ ) {
				while( this.definehash[i] ) {
					define = this.definehash[i];
					this.definehash[i] = this.definehash[i].hashnext;
					this.FreeDefine(define);
				}
			}
			this.defines = null;
			Mem_Free( this.definehash );
			this.definehash = null;
		}
	}
	this.loaded = 0/*false*/;
}
////
/////*
////================
////idParser::GetPunctuationFromId
////================
////*/
////const char *idParser::GetPunctuationFromId( int id ) {
////	var i:number;
////
////	if ( !this.punctuations ) {
////		idLexer lex;
////		return lex.GetPunctuationFromId( id );
////	}
////
////	for (i = 0; this.punctuations[i].p; i++) {
////		if ( this.punctuations[i].n == id ) {
////			return this.punctuations[i].p;
////		}
////	}
////	return "unkown punctuation";
////}

/*
================
idParser::GetPunctuationId
================
*/
/*int*/
	GetPunctuationId ( p: string ): number {
		var i: number;

		if ( !this.punctuations ) {
			var lex = new idLexer;
			return lex.GetPunctuationId( p );
		}

		for ( i = 0; this.punctuations[i].p; i++ ) {
			if ( !strcmp( this.punctuations[i].p, p ) ) {
				return this.punctuations[i].n;
			}
		}
		return 0;
	}


	constructor ( flags: number= null ) {
		if ( arguments.length == 0 ) {
			// idParser();
			this.loaded = 0 /*false*/;
			this.OSPath = false;
			this.punctuations = null;
			this.flags = 0;
			this.scriptstack = null;
			this.indentstack = null;
			this.definehash = null;
			this.defines = null;
			this.tokens = null;
			this.marker_p = NULL;
		} else if ( arguments.length == 1 && typeof arguments[0] === "number" ) {
			//idParser( int flags );
			this.loaded = 0 /*false*/;
			this.OSPath = false;
			this.punctuations = null;
			this.flags = flags;
			this.scriptstack = null;
			this.indentstack = null;
			this.definehash = null;
			this.defines = null;
			this.tokens = null;
			this.marker_p = null;
		} else {
			todoThrow ( );
		}
	}
	
////
/////*
////================
////idParser::idParser
////================
////*/
////idParser::idParser( const char *filename, int flags, bool OSPath ) {
////	this.loaded = false;
////	this.OSPath = true;
////	this.punctuations = 0;
////	this.flags = flags;
////	this.scriptstack = NULL;
////	this.indentstack = NULL;
////	this.definehash = NULL;
////	this.defines = NULL;
////	this.tokens = NULL;
////	this.marker_p = NULL;
////	LoadFile( filename, OSPath );
////}
////
/////*
////================
////idParser::idParser
////================
////*/
////idParser::idParser( const char *ptr, int length, const char *name, int flags ) {
////	this.loaded = false;
////	this.OSPath = false;
////	this.punctuations = 0;
////	this.flags = flags;
////	this.scriptstack = NULL;
////	this.indentstack = NULL;
////	this.definehash = NULL;
////	this.defines = NULL;
////	this.tokens = NULL;
////	this.marker_p = NULL;
////	LoadMemory( ptr, length, name );
////}
////
/////*
////================
////idParser::~idParser
////================
////*/
////idParser::~idParser( ) {
////	idParser::FreeSource( false );
////}
////
}