/// <reference path="../../c.ts" />
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

////#ifndef __LEXER_H__
////#define __LEXER_H__

/////*
////===============================================================================

////	Lexicographical parser

////	Does not use memory allocation during parsing. The lexer uses no
////	memory allocation if a source is loaded with LoadMemory().
////	However, idToken may still allocate memory for large strings.
	
////	A number directly following the escape character '\' in a string is
////	assumed to be in decimal format instead of octal. Binary numbers of
////	the form 0b.. or 0B.. can also be used.

////===============================================================================
////*/

// lexer flags
enum lexerFlags_t {
	LEXFL_NOERRORS						= BIT(0),	// don't print any errors
	LEXFL_NOWARNINGS					= BIT(1),	// don't print any warnings
	LEXFL_NOFATALERRORS					= BIT(2),	// errors aren't fatal
	LEXFL_NOSTRINGCONCAT				= BIT(3),	// multiple strings seperated by whitespaces are not concatenated
	LEXFL_NOSTRINGESCAPECHARS			= BIT(4),	// no escape characters inside strings
	LEXFL_NODOLLARPRECOMPILE			= BIT(5),	// don't use the $ sign for precompilation
	LEXFL_NOBASEINCLUDES				= BIT(6),	// don't include files embraced with < >
	LEXFL_ALLOWPATHNAMES				= BIT(7),	// allow path seperators in names
	LEXFL_ALLOWNUMBERNAMES				= BIT(8),	// allow names to start with a number
	LEXFL_ALLOWIPADDRESSES				= BIT(9),	// allow ip addresses to be parsed as numbers
	LEXFL_ALLOWFLOATEXCEPTIONS			= BIT(10),	// allow float exceptions like 1.#INF or 1.#IND to be parsed
	LEXFL_ALLOWMULTICHARLITERALS		= BIT(11),	// allow multi character literals
	LEXFL_ALLOWBACKSLASHSTRINGCONCAT	= BIT(12),	// allow multiple strings seperated by '\' to be concatenated
	LEXFL_ONLYSTRINGS					= BIT(13)	// parse as whitespace deliminated strings (quoted strings keep quotes)
};

// punctuation ids
var P_RSHIFT_ASSIGN = 1;
var P_LSHIFT_ASSIGN = 2;
var P_PARMS = 3;
var P_PRECOMPMERGE = 4;

var P_LOGIC_AND = 5;
var P_LOGIC_OR = 6;
var P_LOGIC_GEQ = 7;
var P_LOGIC_LEQ = 8;
var P_LOGIC_EQ = 9;
var P_LOGIC_UNEQ = 10;

var P_MUL_ASSIGN = 11;
var P_DIV_ASSIGN = 12;
var P_MOD_ASSIGN = 13;
var P_ADD_ASSIGN = 14;
var P_SUB_ASSIGN = 15;
var P_INC = 16;
var P_DEC = 17;

var P_BIN_AND_ASSIGN = 18;
var P_BIN_OR_ASSIGN = 19;
var P_BIN_XOR_ASSIGN = 20;
var P_RSHIFT = 21;
var P_LSHIFT = 22;

var P_POINTERREF = 23;
var P_CPP1 = 24;
var P_CPP2 = 25;
var P_MUL = 26;
var P_DIV = 27;
var P_MOD = 28;
var P_ADD = 29;
var P_SUB = 30;
var P_ASSIGN = 31;

var P_BIN_AND = 32;
var P_BIN_OR = 33;
var P_BIN_XOR = 34;
var P_BIN_NOT = 35;

var P_LOGIC_NOT = 36;
var P_LOGIC_GREATER = 37;
var P_LOGIC_LESS = 38;

var P_REF = 39;
var P_COMMA = 40;
var P_SEMICOLON = 41;
var P_COLON = 42;
var P_QUESTIONMARK = 43;

var P_PARENTHESESOPEN = 44;
var P_PARENTHESESCLOSE = 45;
var P_BRACEOPEN = 46;
var P_BRACECLOSE = 47;
var P_SQBRACKETOPEN = 48;
var P_SQBRACKETCLOSE = 49;
var P_BACKSLASH = 50;

var P_PRECOMP = 51;
var P_DOLLAR = 52;

// punctuation
class punctuation_t {
	constructor ( p: string, n: number ) {
		this.p = p;
		this.n = n;
	}
	p: string; // punctuation character(s)
	n: number; // punctuation id /*int */
}


//class idLexer {

////	friend class idParser;

////public:
////					// constructor
////					idLexer();
////					idLexer( int flags );
////					idLexer( const char *filename, int flags = 0, bool OSPath = false );
////					idLexer( const char *ptr, int length, const char *name, int flags = 0 );
////					// destructor
////					~idLexer();
////					// load a script from the given file at the given offset with the given length
////	int				LoadFile( const char *filename, bool OSPath = false );
////					// load a script from the given memory with the given length and a specified line offset,
////					// so source strings extracted from a file can still refer to proper line numbers in the file
////					// NOTE: the ptr is expected to point at a valid C string: ptr[length] == '\0'
////	int				LoadMemory( const char *ptr, int length, const char *name, int startLine = 1 );
////					// free the script
////	void			FreeSource( void );
////					// returns true if a script is loaded
////	int				IsLoaded( void ) { return idLexer::loaded; };
////					// read a token
////	int				ReadToken( idToken *token );
////					// expect a certain token, reads the token when available
////	int				ExpectTokenString( const char *string );
////					// expect a certain token type
////	int				ExpectTokenType( int type, int subtype, idToken *token );
////					// expect a token
////	int				ExpectAnyToken( idToken *token );
////					// returns true when the token is available
////	int				CheckTokenString( const char *string );
////					// returns true an reads the token when a token with the given type is available
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
////					// unread the given token
////	void			UnreadToken( const idToken *token );
////					// read a token only if on the same line
////	int				ReadTokenOnLine( idToken *token );
		
////					//Returns the rest of the current line
////	const char*		ReadRestOfLine(idStr& out);

////					// read a signed integer
////	int				ParseInt( void );
////					// read a boolean
////	bool			ParseBool( void );
////					// read a floating point number.  If errorFlag is NULL, a non-numeric token will
////					// issue an Error().  If it isn't NULL, it will issue a Warning() and set *errorFlag = true
////	float			ParseFloat( bool *errorFlag = NULL );
////					// parse matrices with floats
////	int				Parse1DMatrix( int x, float *m );
////	int				Parse2DMatrix( int y, int x, float *m );
////	int				Parse3DMatrix( int z, int y, int x, float *m );
////					// parse a braced section into a string
////	const char *	ParseBracedSection( idStr &out );
////					// parse a braced section into a string, maintaining indents and newlines
////	const char *	ParseBracedSectionExact ( idStr &out, int tabs = -1 );
////					// parse the rest of the line
////	const char *	ParseRestOfLine( idStr &out );
////					// retrieves the white space characters before the last read token
////	int				GetLastWhiteSpace( idStr &whiteSpace ) const;
////					// returns start index into text buffer of last white space
////	int				GetLastWhiteSpaceStart( void ) const;
////					// returns end index into text buffer of last white space
////	int				GetLastWhiteSpaceEnd( void ) const;
////					// set an array with punctuations, NULL restores default C/C++ set, see default_punctuations for an example
////	void			SetPunctuations( const punctuation_t *p );
////					// returns a pointer to the punctuation with the given id
////	const char *	GetPunctuationFromId( int id );
////					// get the id for the given punctuation
////	int				GetPunctuationId( const char *p );
////					// set lexer flags
////	void			SetFlags( int flags );
////					// get lexer flags
////	int				GetFlags( void );
////					// reset the lexer
////	void			Reset( void );
////					// returns true if at the end of the file
////	int				EndOfFile( void );
////					// returns the current filename
////	const char *	GetFileName( void );
////					// get offset in script
////	const int		GetFileOffset( void );
////					// get file time
////	const ID_TIME_T	GetFileTime( void );
////					// returns the current line number
////	const int		GetLineNum( void );
////					// print an error message
////	void			Error( const char *str, ... ) id_attribute((format(printf,2,3)));
////					// print a warning message
////	void			Warning( const char *str, ... ) id_attribute((format(printf,2,3)));
////					// returns true if Error() was called with lexerFlags_t.LEXFL_NOFATALERRORS or LEXFL_NOERRORS set
////	bool			HadError( void ) const;

////					// set the base folder to load files from
////	static void		SetBaseFolder( const char *path );

////private:
////	void			CreatePunctuationTable( const punctuation_t *punctuations );
////	int				ReadWhiteSpace( void );
////	int				ReadEscapeCharacter( char *ch );
////	int				ReadString( idToken *token, int quote );
////	int				ReadName( idToken *token );
////	int				ReadNumber( idToken *token );
////	int				ReadPunctuation( idToken *token );
////	int				ReadPrimitive( idToken *token );
////	int				CheckString( const char *str ) const;
////	int				NumLinesCrossed( void );
//};

// in lexer.cpp:
////ID_INLINE void idLexer::SetFlags( int flags ) {
////	idLexer::flags = flags;
////}

////ID_INLINE int idLexer::GetFlags( void ) {
////	return idLexer::flags;
////}

////#endif /* !__LEXER_H__ */

