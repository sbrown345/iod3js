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

////#include "precompiled.h"
////#pragma hdrstop

////#define PUNCTABLE

//longer punctuations first
var default_punctuations = [
	//binary operators
	new punctuation_t(">>=",P_RSHIFT_ASSIGN),
	new punctuation_t("<<=",P_LSHIFT_ASSIGN),
	//
	new punctuation_t("...(",P_PARMS),
	// define merge operator
	new punctuation_t("##",P_PRECOMPMERGE),				// pre-compiler
	// logic operators
	new punctuation_t("&&",P_LOGIC_AND),					// pre-compiler
	new punctuation_t("||",P_LOGIC_OR),					// pre-compiler
	new punctuation_t(">=",P_LOGIC_GEQ),					// pre-compiler
	new punctuation_t("<=",P_LOGIC_LEQ),					// pre-compiler
	new punctuation_t("==",P_LOGIC_EQ),					// pre-compiler
	new punctuation_t("!=",P_LOGIC_UNEQ),				// pre-compiler
	// arithmatic operators
	new punctuation_t("*=",P_MUL_ASSIGN),
	new punctuation_t("/=",P_DIV_ASSIGN),
	new punctuation_t("%=",P_MOD_ASSIGN),
	new punctuation_t("+=",P_ADD_ASSIGN),
	new punctuation_t("-=",P_SUB_ASSIGN),
	new punctuation_t("++",P_INC),
	new punctuation_t("--",P_DEC),
	// binary operators
	new punctuation_t("&=",P_BIN_AND_ASSIGN),
	new punctuation_t("|=",P_BIN_OR_ASSIGN),
	new punctuation_t("^=",P_BIN_XOR_ASSIGN),
	new punctuation_t(">>",P_RSHIFT),					// pre-compiler
	new punctuation_t("<<",P_LSHIFT),					// pre-compiler
	// reference operators
	new punctuation_t("->",P_POINTERREF),
	// C++
	new punctuation_t("::",P_CPP1),
	new punctuation_t(".*",P_CPP2),
	// arithmatic operators
	new punctuation_t("*",P_MUL),						// pre-compiler
	new punctuation_t("/",P_DIV),						// pre-compiler
	new punctuation_t("%",P_MOD),						// pre-compiler
	new punctuation_t("+",P_ADD),						// pre-compiler
	new punctuation_t("-",P_SUB),						// pre-compiler
	new punctuation_t("=",P_ASSIGN),
	// binary operators
	new punctuation_t("&",P_BIN_AND),					// pre-compiler
	new punctuation_t("|",P_BIN_OR),						// pre-compiler
	new punctuation_t("^",P_BIN_XOR),					// pre-compiler
	new punctuation_t("~",P_BIN_NOT),					// pre-compiler
	// logic operators
	new punctuation_t("!",P_LOGIC_NOT),					// pre-compiler
	new punctuation_t(">",P_LOGIC_GREATER),				// pre-compiler
	new punctuation_t("<",P_LOGIC_LESS),					// pre-compiler
	// reference operator
	new punctuation_t(".",P_REF),
	// seperators
	new punctuation_t(",",P_COMMA),						// pre-compiler
	new punctuation_t(";",P_SEMICOLON),
	// label indication
	new punctuation_t(":",P_COLON),						// pre-compiler
	//if statement
	new punctuation_t("?",P_QUESTIONMARK),				// pre-compiler
	// embracements
	new punctuation_t("(",P_PARENTHESESOPEN),			// pre-compiler
	new punctuation_t(")",P_PARENTHESESCLOSE),			// pre-compiler
	new punctuation_t("{",P_BRACEOPEN),					// pre-compiler
	new punctuation_t("}",P_BRACECLOSE),					// pre-compiler
	new punctuation_t("[",P_SQBRACKETOPEN),
	new punctuation_t("]",P_SQBRACKETCLOSE),
	//
	new punctuation_t("\\",P_BACKSLASH),
	// precompiler operator
	new punctuation_t("#",P_PRECOMP),					// pre-compiler
	new punctuation_t("$",P_DOLLAR),
	new punctuation_t(null, 0)
];

var default_punctuationtable = new Int32Array(256);
var default_nextpunctuation = new Int32Array(424 / 8); //sizeof(default_punctuations) / sizeof(punctuation_t)
var /*int */default_setup = 0;

////char idLexer::baseFolder[ 256 ];

class idLexer {

	// from Lexer.h:
	//private:
	/*int			*/
	loaded: number; // set when a script file is loaded from file or memory
	/*idStr			*/
	filename = new idStr; // file name of the script
	/*int			*/
	allocated: number; // true if buffer memory was allocated
	/*const char *	*/
	buffer: string; // buffer containing the script
	/*const char *	*/
	script_p: number; // current pointer in the script
	/*const char *	*/
	end_p: number; // pointer to the end of the script
	/*const char *	*/
	lastScript_p: number; // script pointer before reading token
	/*const char *	*/
	whiteSpaceStart_p: number; // start of last white space
	/*const char *	*/
	whiteSpaceEnd_p: number; // end of last white space
	/*ID_TIME_T		*/
	fileTime: number; // file time
	/*int			*/
	length: number; // length of the script in bytes
	/*int			*/
	line: number; // current line in script
	/*int			*/
	lastline: number; // line before reading token
	/*int	    	*/
	tokenavailable: number; // set by unreadToken
	/*int			*/
	flags: number; // several script flags
	punctuations: punctuation_t[];		// the punctuations used in the script
    /*int *			*/
	punctuationtable: Int32Array; // ASCII table with punctuations
	/*int *			*/
	nextpunctuation: Int32Array; // next punctuation in chain
	/*idToken		*/
	token = new idToken; // available token
	/*idLexer *		*/
	next: idLexer; // next script in a chain
	/*bool			*/
	hadError: boolean; // set by idLexer::Error, even if the error is supressed

	/*static char		*/
	baseFolder: string /*[ 256 ]*/; // base folder to load files from

	GetFileName ( ): string {
		return this.filename.data;
	}

	GetFileOffset ( ): number {
		return this.script_p; // - this.buffer;
	}

	////ID_INLINE const ID_TIME_T idLexer::GetFileTime( void ) {
	////	return idLexer::fileTime;
	////}

	GetLineNum ( ): number {
		return this.line;
	}

	/*
	================
	idLexer::CreatePunctuationTable
	================
	*/
	CreatePunctuationTable ( punctuations: punctuation_t[] ): void {
		var /*int */i: number, n: number, lastp: number;
		var p: punctuation_t, newp: punctuation_t;

		//get memory for the table
		if ( punctuations == default_punctuations ) {
			this.punctuationtable = default_punctuationtable;
			this.nextpunctuation = default_nextpunctuation;
			if ( default_setup ) {
				return;
			}
			default_setup = 1 /*true*/;
			i = 53; //sizeof( default_punctuations ) / sizeof( punctuation_t );
		} else {
			if ( !this.punctuationtable || this.punctuationtable == default_punctuationtable ) {
				this.punctuationtable = new Int32Array( 256 ); //(int *) Mem_Alloc(256 * sizeof(int));
			}
			if ( this.nextpunctuation && this.nextpunctuation != default_nextpunctuation ) {
				Mem_Free( this.nextpunctuation );
			}
			for ( i = 0; punctuations[i].p; i++ ) {
			}
			this.nextpunctuation = new Int32Array( i ); // (int *) Mem_Alloc(i * sizeof(int));
		}
		memset( this.punctuationtable, 0xFF, 256 * sizeof( int ) );
		memset( this.nextpunctuation, 0xFF, i * sizeof( int ) );
		//add the punctuations in the list to the punctuation table
		for ( i = 0; punctuations[i].p; i++ ) {
			newp = /*&*/punctuations[i];
			lastp = -1;
			//sort the punctuations in this table entry on length (longer punctuations first)
			for ( n = this.punctuationtable[newp.p.charCodeAt( 0 ) >>> 0]; n >= 0; n = this.nextpunctuation[n] ) {
				p = /*&*/punctuations[n];
				if ( strlen( p.p ) < strlen( newp.p ) ) {
					this.nextpunctuation[i] = n;
					if ( lastp >= 0 ) {
						this.nextpunctuation[lastp] = i;
					} else {
						this.punctuationtable[newp.p.charCodeAt( 0 ) >>> 0] = i;
					}
					break;
				}
				lastp = n;
			}
			if ( n < 0 ) {
				this.nextpunctuation[i] = -1;
				if ( lastp >= 0 ) {
					this.nextpunctuation[lastp] = i;
				} else {
					this.punctuationtable[newp.p.charCodeAt( 0 ) >>> 0] = i;
				}
			}
		}
	}

	/*
	================
	idLexer::GetPunctuationFromId
	================
	*/
	GetPunctuationFromId ( /*int */id: number ): string {
		var /*int */i: number;

		for ( i = 0; this.punctuations[i].p; i++ ) {
			if ( this.punctuations[i].n == id ) {
				return this.punctuations[i].p;
			}
		}
		return "unkown punctuation";
	}

	/*
	================
	idLexer::GetPunctuationId
	================
	*/
	GetPunctuationId ( p: string ): number {
		var i: number;

		for ( i = 0; this.punctuations[i].p; i++ ) {
			if ( !strcmp( this.punctuations[i].p, p ) ) {
				return this.punctuations[i].n;
			}
		}
		return 0;
	}

	/*
	================
	idLexer::Error
	================
	*/
	Error ( str: string, ...args: any[] ) {
		var text: string; //char text[MAX_STRING_CHARS];
		//va_list ap;

		this.hadError = true;

		if ( this.flags & lexerFlags_t.LEXFL_NOERRORS ) {
			return;
		}

		text = vsprintf(str, args);

		if ( this.flags & lexerFlags_t.LEXFL_NOFATALERRORS ) {
			common.Warning( "file %s, line %d: %s", this.filename.c_str ( ), this.line, text );
		} else {
			common.Error( "file %s, line %d: %s", this.filename.c_str ( ), this.line, text );
		}
	}

	/*
	================
	idLexer::Warning
	================
	*/
	Warning ( str: string, ...args: any[] ): void {
		var text = ""; //char text[MAX_STRING_CHARS];
		//va_list ap;

		if ( this.flags & lexerFlags_t.LEXFL_NOWARNINGS ) {
			return;
		}
		text = vsprintf( str, args );
		
		common.Warning( "file %s, line %d: %s", this.filename.c_str ( ), this.line, text );
	}

	/*
	================
	idLexer::SetPunctuations
	================
	*/
	SetPunctuations ( p: punctuation_t[] ): void {
		//#ifdef PUNCTABLE
		if ( p ) {
			this.CreatePunctuationTable( p );
		} else {
			this.CreatePunctuationTable( default_punctuations );
		}
		//#endif //PUNCTABLE
		if ( p ) {
			this.punctuations = p;
		} else {
			this.punctuations = default_punctuations;
		}
	}

	/*
	================
	idLexer::ReadWhiteSpace

	Reads spaces, tabs, C-like comments etc.
	When a newline character is found the scripts line counter is increased.
	================
	*/
	/*int */ReadWhiteSpace( ):number {
		while(1) {
			// skip white space
			while (this.buffer[this.script_p] <= ' ' || !this.buffer[this.script_p] /*end of string (rather than '\0' which is less than ' ')*/) {
				if (!this.buffer[this.script_p]) {
					return 0;
				}
				if (this.buffer[this.script_p] == '\n') {
					this.line++;
				}
				this.script_p++;
			}
			// skip comments
			if (this.buffer[this.script_p] == '/') {
				// comments //
				if (this.buffer[this.script_p+1] == '/') {
					this.script_p++;
					do {
						this.script_p++;
						if ( !this.buffer[this.script_p] ) {
							return 0;
						}
					}
					while( this.buffer[this.script_p] != '\n' );
					this.line++;
					this.script_p++;
					if ( !this.buffer[this.script_p] ) {
						return 0;
					}
					continue;
				}
				// comments /* */
				else if (this.buffer[this.script_p+1] == '*') {
					this.script_p++;
					while( 1 ) {
						this.script_p++;
						if ( !this.buffer[this.script_p] ) {
							return 0;
						}
						if ( this.buffer[this.script_p] == '\n' ) {
							this.line++;
						}
						else if ( this.buffer[this.script_p] == '/' ) {
							if ( this.buffer[this.script_p-1] == '*' ) {
								break;
							}
							if ( this.buffer[this.script_p+1] == '*' ) {
								this.Warning( "nested comment" );
							}
						}
					}
					this.script_p++;
					if ( !this.buffer[this.script_p] ) {
						return 0;
					}
					this.script_p++;
					if ( !this.buffer[this.script_p] ) {
						return 0;
					}
					continue;
				}
			}
			break;
		}
		return 1;
	}

	/*
	================
	idLexer::ReadEscapeCharacter
	================
	*/
	/*int*/ ReadEscapeCharacter( /*char **/ch:R<string> ):number {
		var/*int */c: number, val: number, i:number;

		// step over the leading '\\'
		this.script_p++;
		// determine the escape character
		switch(this.buffer[this.script_p]) {
			case '\\': c = '\\'.charCodeAt(0); break;
			case 'n': c = '\n'.charCodeAt(0); break;
			case 'r': c = '\r'.charCodeAt(0); break;
			case 't': c = '\t'.charCodeAt(0); break;
			case 'v': c = '\v'.charCodeAt(0); break;
			case 'b': c = '\b'.charCodeAt(0); break;
			case 'f': c = '\f'.charCodeAt(0); break;
			case 'a': c = '\a'.charCodeAt(0); break;
			case '\'': c = '\''.charCodeAt(0); break;
			case '\"': c = '\"'.charCodeAt(0); break;
			case '\?': c = '\?'.charCodeAt(0); break;
			case 'x':
			{
				this.script_p++;
				for (i = 0, val = 0; ; i++, this.script_p++) {
					c = this.buffer.charCodeAt(this.script_p);
					if (c >= '0'.charCodeAt(0) && c <= '9'.charCodeAt(0))
						c = c - '0'.charCodeAt(0);
					else if (c >= 'A'.charCodeAt(0) && c <= 'Z'.charCodeAt(0))
						c = c - 'A'.charCodeAt(0) + 10;
					else if (c >= 'a'.charCodeAt(0) && c <= 'z'.charCodeAt(0))
						c = c - 'a'.charCodeAt(0) + 10;
					else
						break;
					val = (val << 4) + c;
				}
				this.script_p--;
				if (val > 0xFF) {
					this.Warning( "too large value in escape character" );
					val = 0xFF;
				}
				c = val;
				break;
			}
			default: //NOTE: decimal ASCII code, NOT octal
			{
				if (this.buffer[this.script_p] < '0' || this.buffer[this.script_p] > '9') {
					this.Error("unknown escape char");
				}
				for (i = 0, val = 0; ; i++, this.script_p++) {
					c = this.buffer.charCodeAt(this.script_p);
					if (c >= '0'.charCodeAt(0) && c <= '9'.charCodeAt(0))
						c = c - '0'.charCodeAt(0);
					else
						break;
					val = val * 10 + c;
				}
				this.script_p--;
				if (val > 0xFF) {
					this.Warning( "too large value in escape character" );
					val = 0xFF;
				}
				c = val;
				break;
			}
		}
		// step over the escape character or the last digit of the number
		this.script_p++;
		// store the escape character
		ch.$ = String.fromCharCode(c);
		// succesfully read escape character
		return 1;
	}

	/*
	================
	idLexer::ReadString

	Escape characters are interpretted.
	Reads two strings with only a white space between them as one string.
	================
	*/
	/*int */ReadString(token: idToken, /*int */quote: string): number {
		var/*int */tmpline:number;
		var/*const char **/tmpscript_p:number;
		var/*char */ch = new R<string>();

		if ( quote == '\"' ) {
			token.type = TT_STRING;
		} else {
			token.type = TT_LITERAL;
		}

		// leading quote
		this.script_p++;

		while(1) {
			// if there is an escape character and escape characters are allowed
			if (this.buffer[this.script_p] == '\\' && !(this.flags & lexerFlags_t.LEXFL_NOSTRINGESCAPECHARS)) {
				if ( !this.ReadEscapeCharacter( ch ) ) {
					return 0;
				}
				token.AppendDirty( ch.$ );
			}
			// if a trailing quote
			else if (this.buffer[this.script_p] == quote) {
				// step over the quote
				this.script_p++;
				// if consecutive strings should not be concatenated
				if ((this.flags & lexerFlags_t.LEXFL_NOSTRINGCONCAT) &&
					(!(this.flags & lexerFlags_t.LEXFL_ALLOWBACKSLASHSTRINGCONCAT) || (quote != '\"')) ) {
					break;
				}

				tmpscript_p = this.script_p;
				tmpline = this.line;
				// read white space between possible two consecutive strings
				if ( !this.ReadWhiteSpace() ) {
					this.script_p = tmpscript_p;
					this.line = tmpline;
					break;
				}

				if (this.flags & lexerFlags_t.LEXFL_NOSTRINGCONCAT ) {
					if ( this.buffer[this.script_p] != '\\' ) {
						this.script_p = tmpscript_p;
						this.line = tmpline;
						break;
					}
					// step over the '\\'
					this.script_p++;
					if ( !this.ReadWhiteSpace() || ( this.buffer[this.script_p] != quote ) ) {
						this.Error( "expecting string after '\' terminated line" );
						return 0;
					}
				}

				// if there's no leading qoute
				if ( this.buffer[this.script_p] != quote ) {
					this.script_p = tmpscript_p;
					this.line = tmpline;
					break;
				}
				// step over the new leading quote
				this.script_p++;
			}
			else {
				if (this.buffer[this.script_p] == '\0' || !this.buffer[this.script_p]) {
					this.Error( "missing trailing quote" );
					return 0;
				}
				if (this.buffer[this.script_p] == '\n') {
					this.Error( "newline inside string" );
					return 0;
				}
				token.AppendDirty(this.buffer[this.script_p++] );
			}
		}
		//token.data[token.len] = '\0';// TODO: WATCH OUT HERE

		if ( token.type == TT_LITERAL ) {
			if (!(this.flags & lexerFlags_t.LEXFL_ALLOWMULTICHARLITERALS) ) {
				if ( token.Length() != 1 ) {
					this.Warning( "literal is not one character long" );
				}
			}
			token.subtype = token.data.charCodeAt( 0 );
		}
		else {
			// the sub type is the length of the string
			token.subtype = token.Length();
		}
		return 1;
	}

	/*
	================
	idLexer::ReadName
	================
	*/
	/*int*/ ReadName(token: idToken): number {
		var/*char */c:string;

		token.type = TT_NAME;
		do {
			token.AppendDirty( this.buffer[this.script_p++] );
			c = this.buffer[this.script_p];
		} while ((c >= 'a' && c <= 'z') ||
					(c >= 'A' && c <= 'Z') ||
					(c >= '0' && c <= '9') ||
					c == '_' ||
					// if treating all tokens as strings, don't parse '-' as a seperate token
					((this.flags & lexerFlags_t.LEXFL_ONLYSTRINGS) && (c == '-')) ||
					// if special path name characters are allowed
					((this.flags & lexerFlags_t.LEXFL_ALLOWPATHNAMES) && (c == '/' || c == '\\' || c == ':' || c == '.')) );
		//token.data[token.len] = '\0';// TODO: WATCH OUT HERE
		//the sub type is the length of the name
		token.subtype = token.Length();
		return 1;
	}

	/*
	================
	idLexer::CheckString
	================
	*/
	CheckString( str:string ):number {
		var/*int */i:number;

		for ( i = 0; str[i]; i++ ) {
			if ( this.buffer[this.script_p + i] != str[i] ) {
				return 0/*false*/;
			}
		}
		return 1/*true*/;
	}

	/*
	================
	idLexer::ReadNumber
	================
	*/
	/*int*/ ReadNumber(token: idToken): number {
		var /*int*/ i:number;
		var /*int*/ dot: number;
		var /*char*/ c: string, c2:string;

		token.type = TT_NUMBER;
		token.subtype = 0;
		token.intvalue = 0;
		token.floatvalue = 0;

		c = this.buffer[this.script_p];
		c2 = this.buffer[this.script_p + 1];

		if ( c == '0' && c2 != '.' ) {
			// check for a hexadecimal number
			if ( c2 == 'x' || c2 == 'X' ) {
				token.AppendDirty( this.buffer[this.script_p++] );
				token.AppendDirty( this.buffer[this.script_p++] );
				c = this.buffer[this.script_p];
				while((c >= '0' && c <= '9') ||
							(c >= 'a' && c <= 'f') ||
							(c >= 'A' && c <= 'F')) {
					token.AppendDirty( c );
					c = this.buffer[++this.script_p];
				}
				token.subtype = TT_HEX | TT_INTEGER;
			}
			// check for a binary number
			else if ( c2 == 'b' || c2 == 'B' ) {
				token.AppendDirty( this.buffer[this.script_p++] );
				token.AppendDirty( this.buffer[this.script_p++] );
				c = this.buffer[this.script_p];
				while( c == '0' || c == '1' ) {
					token.AppendDirty( c );
					c = this.buffer[++this.script_p];
				}
				token.subtype = TT_BINARY | TT_INTEGER;
			}
			// its an octal number
			else {
				token.AppendDirty( this.buffer[this.script_p++] );
				c = this.buffer[this.script_p];
				while( c >= '0' && c <= '7' ) {
					token.AppendDirty( c );
					c = this.buffer[++this.script_p];
				}
				token.subtype = TT_OCTAL | TT_INTEGER;
			}
		}
		else {
			// decimal integer or floating point number or ip address
			dot = 0;
			while( 1 ) {
				if ( c >= '0' && c <= '9' ) {
				}
				else if ( c == '.' ) {
					dot++;
				}
				else {
					break;
				}
				token.AppendDirty( c );
				c = this.buffer[++this.script_p];
			}
			if( c == 'e' && dot == 0) {
				//We have scientific notation without a decimal point
				dot++;
			}
			// if a floating point number
			if ( dot == 1 ) {
				token.subtype = TT_DECIMAL | TT_FLOAT;
				// check for floating point exponent
				if ( c == 'e' ) {
					//Append the e so that GetFloatValue code works
					token.AppendDirty( c );
					c = this.buffer[++this.script_p];
					if ( c == '-' ) {
						token.AppendDirty( c );
						c = this.buffer[++this.script_p];
					}
					else if ( c == '+' ) {
						token.AppendDirty( c );
						c = this.buffer[++this.script_p];
					}
					while( c >= '0' && c <= '9' ) {
						token.AppendDirty( c );
						c = this.buffer[++this.script_p];
					}
				}
				// check for floating point exception infinite 1.#INF or indefinite 1.#IND or NaN
				else if ( c == '#' ) {
					c2 = String.fromCharCode(4);
					if ( this.CheckString( "INF" ) ) {
						token.subtype |= TT_INFINITE;
					}
					else if ( this.CheckString( "IND" ) ) {
						token.subtype |= TT_INDEFINITE;
					}
					else if ( this.CheckString( "NAN" ) ) {
						token.subtype |= TT_NAN;
					}
					else if ( this.CheckString( "QNAN" ) ) {
						token.subtype |= TT_NAN;
						c2 = String.fromCharCode( c2.charCodeAt( 0 ) + 1 ); //c2++;
					}
					else if ( this.CheckString( "SNAN" ) ) {
						token.subtype |= TT_NAN;
						c2 = String.fromCharCode(c2.charCodeAt(0) + 1); //c2++;
					}
					for ( i = 0; i < c2.charCodeAt(0); i++ ) {
						token.AppendDirty( c );
						c = this.buffer[++this.script_p];
					}
					while( c >= '0' && c <= '9' ) {
						token.AppendDirty( c );
						c = this.buffer[++this.script_p];
					}
					if (!(this.flags & lexerFlags_t.LEXFL_ALLOWFLOATEXCEPTIONS) ) {
						token.AppendDirty( String.fromCharCode(0) );	// zero terminate for c_str
						this.Error( "parsed %s", token.c_str() );
					}
				}
			}
			else if ( dot > 1 ) {
				if (!(this.flags & lexerFlags_t.LEXFL_ALLOWIPADDRESSES ) ) {
					this.Error( "more than one dot in number" );
					return 0;
				}
				if ( dot != 3 ) {
					this.Error( "ip address should have three dots" );
					return 0;
				}
				token.subtype = TT_IPADDRESS;
			}
			else {
				token.subtype = TT_DECIMAL | TT_INTEGER;
			}
		}

		if ( token.subtype & TT_FLOAT ) {
			if ( c > ' ' ) {
				// single-precision: float
				if ( c == 'f' || c == 'F' ) {
					token.subtype |= TT_SINGLE_PRECISION;
					this.script_p++;
				}
				// extended-precision: long double
				else if ( c == 'l' || c == 'L' ) {
					token.subtype |= TT_EXTENDED_PRECISION;
					this.script_p++;
				}
				// default is double-precision: double
				else {
					token.subtype |= TT_DOUBLE_PRECISION;
				}
			}
			else {
				token.subtype |= TT_DOUBLE_PRECISION;
			}
		}
		else if ( token.subtype & TT_INTEGER ) {
			if ( c > ' ' ) {
				// default: signed long
				for ( i = 0; i < 2; i++ ) {
					// long integer
					if ( c == 'l' || c == 'L' ) {
						token.subtype |= TT_LONG;
					}
					// unsigned integer
					else if ( c == 'u' || c == 'U' ) {
						token.subtype |= TT_UNSIGNED;
					}
					else {
						break;
					}
					c = this.buffer[++this.script_p];
				}
			}
		}
		else if ( token.subtype & TT_IPADDRESS ) {
			if ( c == ':' ) {
				token.AppendDirty( c );
				c = this.buffer[++this.script_p];
				while( c >= '0' && c <= '9' ) {
					token.AppendDirty( c );
					c = this.buffer[++this.script_p];
				}
				token.subtype |= TT_IPPORT;
			}
		}
		//token.data[token.len] = '\0';// TODO: WATCH OUT HERE
		return 1;
	}

	/*
	================
	idLexer::ReadPunctuation
	================
	*/
	/*int */ReadPunctuation(token: idToken): number {
		var/*int */l: number, n: number, i: number;
		var /*char const* */p:string;
		var punc: punctuation_t;
	//#ifdef PUNCTABLE
		for (n = this.punctuationtable[this.buffer.charCodeAt(this.script_p) >>> 0]; n >= 0; n = this.nextpunctuation[n])
		{
			punc = this.punctuations[n];
	//#else
	//	var i:number;

	//	for (i = 0; this.punctuations[i].p; i++) {
	//		punc = &this.punctuations[i];
	//#endif
			p = punc.p;
			// check for this punctuation in the script
			for ( l = 0; p[l] && this.buffer[this.script_p + l]; l++ ) {
				if ( this.buffer[this.script_p + l] != p[l] ) {
					break;
				}
			}
			if ( !p[l] ) {
				//
				//token.EnsureAlloced( l+1, false );
				//for ( i = 0; i <= l; i++ ) {
				//	//token.data[i] = p[i];
				//	token.data += p[i];
				//}
				token.data = p;
				token.len = l;
				assert( token.data.length = token.len );
				//
				this.script_p += l;
				token.type = TT_PUNCTUATION;
				// sub type is the punctuation id
				token.subtype = punc.n;
				return 1;
			}
		}
		return 0;
	}

	// from Lexer.h:
	IsLoaded ( ): number { return this.loaded ? 1 : 0; }

	/*
	================
	idLexer::ReadToken
	================
	*/
	/*int */ReadToken(token: idToken ):number {
		var/*int */c:string;

		if ( !this.loaded ) {
			common.Error( "idLexer::ReadToken: no file loaded" );
			return 0;
		}
		
		// if there is a token available (from unreadToken)
		if ( this.tokenavailable ) {
			this.tokenavailable = 0;
			token.equals( this.token );
			return 1;
		}
		// save script pointer
		this.lastScript_p = this.script_p;
		// save line counter
		this.lastline = this.line;
		// clear the token stuff
		token.data = "";//[0] = '\0';
		token.len = 0;
		// start of the white space
		this.whiteSpaceStart_p = this.script_p;
		token.whiteSpaceStart_p = this.script_p;
		// read white space before token
		if ( !this.ReadWhiteSpace() ) {
			return 0;
		}
		// end of the white space
		this.whiteSpaceEnd_p = this.script_p;
		token.whiteSpaceEnd_p = this.script_p;
		// line the token is on
		token.line = this.line;
		// number of lines crossed before token
		token.linesCrossed = this.line - this.lastline;
		// clear token flags
		token.flags = 0;

		c = this.buffer[this.script_p];
		
		// if we're keeping everything as whitespace deliminated strings
		if ( this.flags & lexerFlags_t.LEXFL_ONLYSTRINGS ) {
			// if there is a leading quote
			if ( c == '\"' || c == '\'' ) {
				if (!this.ReadString( token, c )) {
					return 0;
				}
			} else if ( !this.ReadName( token ) ) {
				return 0;
			}
		}
		// if there is a number
		else if ( (c >= '0' && c <= '9') ||
				(c == '.' && (this.buffer[this.script_p + 1] >= '0' && this.buffer[this.script_p + 1] <= '9')) ) {
			if ( !this.ReadNumber( token ) ) {
				return 0;
			}
			// if names are allowed to start with a number
			if ( this.flags & lexerFlags_t.LEXFL_ALLOWNUMBERNAMES ) {
				c = this.buffer[this.script_p];
				if ( (c >= 'a' && c <= 'z') ||	(c >= 'A' && c <= 'Z') || c == '_' ) {
					if ( !this.ReadName( token ) ) {
						return 0;
					}
				}
			}
		}
		// if there is a leading quote
		else if ( c == '\"' || c == '\'' ) {
			if (!this.ReadString( token, c )) {
				return 0;
			}
		}
		// if there is a name
		else if ( (c >= 'a' && c <= 'z') ||	(c >= 'A' && c <= 'Z') || c == '_' ) {
			if ( !this.ReadName( token ) ) {
				return 0;
			}
		}
		// names may also start with a slash when pathnames are allowed
		else if ( ( this.flags & lexerFlags_t.LEXFL_ALLOWPATHNAMES ) && ( (c == '/' || c == '\\') || c == '.' ) ) {
			if ( !this.ReadName( token ) ) {
				return 0;
			}
		}
		// check for punctuations
		else if ( !this.ReadPunctuation( token ) ) {
			this.Error( "unknown punctuation %s", c );
			return 0;
		}
		// succesfully read a token
		//dlog(DEBUG_Lexer, "RT: %i, %s\n", this.line , token.data);
		//if (idLexer.RTCount == /*6572*/4597 ) debugger;
		//if (token.data == "aas_types") debugger;
		dlog(DEBUG_COMPILER, "RT: %i line:%i, %s\n", idLexer.RTCount, this.line, token.data);
		idLexer.RTCount++;
		return 1;
	}

	static RTCount = 0;

	/*
	================
	idLexer::ExpectTokenString
	================
	*/
	ExpectTokenString( $string:string ):number {
		var token = new idToken;

		if (!this.ReadToken( token )) {
			this.Error( "couldn't find expected '%s'", $string );
			return 0;
		}
		if (token.data != $string ) {
			this.Error( "expected '%s' but found '%s'", $string, token.c_str() );
			return 0;
		}
		return 1;
	}

	/*
	================
	idLexer::ExpectTokenType
	================
	*/
	/*int */ExpectTokenType( /*int */type: number, /*int */subtype: number, token: idToken ):number {
		var str = new idStr;

		if ( !this.ReadToken( token ) ) {
			this.Error( "couldn't read expected token" );
			return 0;
		}

		if (token.type != type ) {
			switch( type ) {
				case TT_STRING: str.equals("string"); break;
				case TT_LITERAL: str.equals("literal"); break;
				case TT_NUMBER: str.equals("number"); break;
				case TT_NAME: str.equals("name"); break;
				case TT_PUNCTUATION: str.equals("punctuation"); break;
				default: str.equals("unknown type"); break;
			}
			this.Error( "expected a %s but found '%s'", str.c_str(), token.c_str() );
			return 0;
		}
		if (token.type == TT_NUMBER ) {
			if ((token.subtype & subtype) != subtype ) {
				str.Clear();
				if (subtype & TT_DECIMAL) str.equals("decimal ");
				if (subtype & TT_HEX) str.equals("hex ");
				if (subtype & TT_OCTAL) str.equals("octal ");
				if (subtype & TT_BINARY) str.equals("binary ");
				if (subtype & TT_UNSIGNED) str.Append("unsigned ");
				if (subtype & TT_LONG) str.Append("long ");
				if (subtype & TT_FLOAT) str.Append("float ");
				if (subtype & TT_INTEGER) str.Append("integer ");
				str.StripTrailing( ' ' );
				this.Error( "expected %s but found '%s'", str.c_str(), token.c_str() );
				return 0;
			}
		}
		else if (token.type == TT_PUNCTUATION ) {
			if ( subtype < 0 ) {
				this.Error( "BUG: wrong punctuation subtype" );
				return 0;
			}
			if (token.subtype != subtype ) {
				this.Error("expected '%s' but found '%s'", this.GetPunctuationFromId(subtype), token.c_str() );
				return 0;
			}
		}
		return 1;
	}

	/*
	================
	idLexer::ExpectAnyToken
	================
	*/
	ExpectAnyToken ( token: idToken ): number {
		if ( !this.ReadToken( token ) ) {
			this.Error( "couldn't read expected token" );
			return 0;
		} else {
			return 1;
		}
	}

	/////*
	////================
	////idLexer::CheckTokenString
	////================
	////*/
	////int idLexer::CheckTokenString( const char *string ) {
	////	idToken tok;

	////	if ( !ReadToken( &tok ) ) {
	////		return 0;
	////	}
	////	// if the given string is available
	////	if ( tok == string ) {
	////		return 1;
	////	}
	////	// unread token
	////	script_p = this.lastScript_p;
	////	this.line = this.lastline;
	////	return 0;
	////}

	/*
	================
	idLexer::CheckTokenType
	================
	*/
	/*int */CheckTokenType( /*int */type: number, /*int */subtype: number, token: idToken): number {
		var tok = new idToken;

		if ( !this.ReadToken( tok ) ) {
			return 0;
		}
		// if the type matches
		if (tok.type == type && (tok.subtype & subtype) == subtype) {
			token.equals( tok );
			return 1;
		}
		// unread token
		this.script_p = this.lastScript_p;
		this.line = this.lastline;
		return 0;
	}

	/////*
	////================
	////idLexer::PeekTokenString
	////================
	////*/
	////int idLexer::PeekTokenString( const char *string ) {
	////	idToken tok;

	////	if ( !ReadToken( &tok ) ) {
	////		return 0;
	////	}

	////	// unread token
	////	script_p = this.lastScript_p;
	////	this.line = this.lastline;

	////	// if the given string is available
	////	if ( tok == string ) {
	////		return 1;
	////	}
	////	return 0;
	////}

	/////*
	////================
	////idLexer::PeekTokenType
	////================
	////*/
	////int idLexer::PeekTokenType( int type, int subtype, token:R<idToken> ) {
	////	idToken tok;

	////	if ( !ReadToken( &tok ) ) {
	////		return 0;
	////	}

	////	// unread token
	////	script_p = this.lastScript_p;
	////	this.line = this.lastline;

	////	// if the type matches
	////	if ( tok.type == type && ( tok.subtype & subtype ) == subtype ) {
	////		*token = tok;
	////		return 1;
	////	}
	////	return 0;
	////}

	/*
	================
	idLexer::SkipUntilString
	================
	*/
	/*int */
	SkipUntilString ( $string: string ): number {
		var token = new idToken;

		while ( this.ReadToken( token ) ) {
			if ( token.data == $string ) {
				return 1;
			}
		}
		return 0;
	}

	/*
	================
	idLexer::SkipRestOfLine
	================
	*/
	SkipRestOfLine( ) :number {
		var token = new idToken;

		while(this.ReadToken( token )) {
			if ( token.linesCrossed ) {
				this.script_p = this.lastScript_p;
				this.line = this.lastline;
				return 1;
			}
		}
		return 0;
	}

	/*
	=================
	idLexer::SkipBracedSection

	Skips until a matching close brace is found.
	Internal brace depths are properly skipped.
	=================
	*/
	/*int */
	SkipBracedSection ( parseFirstBrace: boolean = true ): number {
		var token = new idToken;
		var /*int */depth: number;

		depth = parseFirstBrace ? 0 : 1;
		do {
			if ( !this.ReadToken( token ) ) {
				return 0 /*false*/;
			}
			if ( token.type == TT_PUNCTUATION ) {
				if ( token.data == "{" ) {
					depth++;
				} else if ( token.data == "}" ) {
					depth--;
				}
			}
		} while ( depth );
		return 1 /*true*/;
	}

	/*
	================
	idLexer::UnreadToken
	================
	*/
	UnreadToken(token: idToken ):void {
		if ( this.tokenavailable ) {
			common.FatalError( "idLexer::unreadToken, unread token twice\n" );
		}
		this.token.equals(token);
		this.tokenavailable = 1;
	}

	/*
	================
	idLexer::ReadTokenOnLine
	================
	*/
	ReadTokenOnLine( token: idToken ):number {
		var tok = new idToken;

		if (!this.ReadToken( tok )) {
			this.script_p = this.lastScript_p;
			this.line = this.lastline;
			return 0;
		}
		// if no lines were crossed before this token
		if ( !tok.linesCrossed ) {
			token.equals(tok);
			return 1;
		}
		// restore our position
		this.script_p = this.lastScript_p;
		this.line = this.lastline;
		token.Clear();
		return 0;
	}

	/////*
	////================
	////idLexer::ReadRestOfLine
	////================
	////*/
	////const char*	idLexer::ReadRestOfLine(idStr& out) {
	////	while(1) {

	////		if(this.buffer[this.script_p] == '\n') {
	////			this.line++;
	////			break;
	////		}

	////		if(!this.buffer[this.script_p]) {
	////			break;
	////		}

	////		if(this.buffer[this.script_p] <= ' ') {
	////			out += " ";
	////		} else {
	////			out += this.buffer[this.script_p];
	////		}
	////		this.script_p++;

	////	}

	////	out.Strip(' ');
	////	return out.c_str();
	////}

	/*
	================
	idLexer::ParseInt
	================
	*/
	/*int */ParseInt( ):number {
		var token = new idToken;

		if ( !this.ReadToken( token ) ) {
			this.Error( "couldn't read expected integer" );
			return 0;
		}
		if (token.type == TT_PUNCTUATION && token.data == "-" ) {
			this.ExpectTokenType( TT_NUMBER, TT_INTEGER, token );
			return -(/*(signed int)*/ token.GetIntValue());
		}
		else if (token.type != TT_NUMBER || token.subtype == TT_FLOAT ) {
			this.Error("expected integer value, found '%s'", token.c_str() );
		}
		return token.GetIntValue();
	}

	/////*
	////================
	////idLexer::ParseBool
	////================
	////*/
	////bool idLexer::ParseBool( void ) {
	////	var token = new R(new idToken);

	////	if ( !this.ExpectTokenType( TT_NUMBER, 0, &token ) ) {
	////		this.Error( "couldn't read expected boolean" );
	////		return false;
	////	}
	////	return ( token.GetIntValue() != 0 );
	////}

	/*
	================
	idLexer::ParseFloat
	================
	*/
	/*float */ParseFloat( errorFlag:R<boolean> = null):number {
		var token = new idToken;

		if ( errorFlag ) {
			errorFlag.$ = false;
		}

		if ( !this.ReadToken( token ) ) {
			if ( errorFlag ) {
				this.Warning( "couldn't read expected floating point number" );
				errorFlag.$ = true;
			} else {
				this.Error( "couldn't read expected floating point number" );
			}
			return 0;
		}
		if ( token.type == TT_PUNCTUATION && token.data == "-" ) {
			this.ExpectTokenType( TT_NUMBER, 0, token );
			return -token.GetFloatValue();
		}
		else if (token.type != TT_NUMBER ) {
			if ( errorFlag ) {
				this.Warning("expected float value, found '%s'", token.c_str() );
				errorFlag.$ = true;
			} else {
				this.Error("expected float value, found '%s'", token.c_str() );
			}
		}
		return token.GetFloatValue();
	}

	/////*
	////================
	////idLexer::Parse1DMatrix
	////================
	////*/
	////int idLexer::Parse1DMatrix( int x, float *m ) {
	////	var i:number;

	////	if ( !idLexer::ExpectTokenString( "(" ) ) {
	////		return false;
	////	}

	////	for ( i = 0; i < x; i++ ) {
	////		m[i] = idLexer::ParseFloat();
	////	}

	////	if ( !idLexer::ExpectTokenString( ")" ) ) {
	////		return false;
	////	}
	////	return true;
	////}

	/////*
	////================
	////idLexer::Parse2DMatrix
	////================
	////*/
	////int idLexer::Parse2DMatrix( int y, int x, float *m ) {
	////	var i:number;

	////	if ( !idLexer::ExpectTokenString( "(" ) ) {
	////		return false;
	////	}

	////	for ( i = 0; i < y; i++ ) {
	////		if ( !idLexer::Parse1DMatrix( x, m + i * x ) ) {
	////			return false;
	////		}
	////	}

	////	if ( !idLexer::ExpectTokenString( ")" ) ) {
	////		return false;
	////	}
	////	return true;
	////}

	/////*
	////================
	////idLexer::Parse3DMatrix
	////================
	////*/
	////int idLexer::Parse3DMatrix( int z, int y, int x, float *m ) {
	////	var i:number;

	////	if ( !idLexer::ExpectTokenString( "(" ) ) {
	////		return false;
	////	}

	////	for ( i = 0 ; i < z; i++ ) {
	////		if ( !idLexer::Parse2DMatrix( y, x, m + i * x*y ) ) {
	////			return false;
	////		}
	////	}

	////	if ( !idLexer::ExpectTokenString( ")" ) ) {
	////		return false;
	////	}
	////	return true;
	////}

	/////*
	////=================
	////idParser::ParseBracedSection

	////The next token should be an open brace.
	////Parses until a matching close brace is found.
	////Maintains exact characters between braces.

	////  FIXME: this should use ReadToken and replace the token white space with correct indents and newlines
	////=================
	////*/
	////const char *idLexer::ParseBracedSectionExact( idStr &out, int tabs ) {
	////	int		depth;
	////	bool	doTabs;
	////	bool	skipWhite;

	////	out.Empty();

	////	if ( !idLexer::ExpectTokenString( "{" ) ) {
	////		return out.c_str( );
	////	}

	////	out = "{";
	////	depth = 1;	
	////	skipWhite = false;
	////	doTabs = tabs >= 0;

	////	while( depth && this.buffer[this.script_p] ) {
	////		char c = *(this.script_p++);

	////		switch ( c ) {
	////			case '\t':
	////			case ' ': {
	////				if ( skipWhite ) {
	////					continue;
	////				}
	////				break;
	////			}
	////			case '\n': {
	////				if ( doTabs ) {
	////					skipWhite = true;
	////					out += c;
	////					continue;
	////				}
	////				break;
	////			}
	////			case '{': {
	////				depth++;
	////				tabs++;
	////				break;
	////			}
	////			case '}': {
	////				depth--;
	////				tabs--;
	////				break;				
	////			}
	////		}

	////		if ( skipWhite ) {
	////			int i = tabs;
	////			if ( c == '{' ) {
	////				i--;
	////			}
	////			skipWhite = false;
	////			for ( ; i > 0; i-- ) {
	////				out += '\t';
	////			}
	////		}
	////		out += c;
	////	}
	////	return out.c_str();
	////}

	/////*
	////=================
	////idLexer::ParseBracedSection

	////The next token should be an open brace.
	////Parses until a matching close brace is found.
	////Internal brace depths are properly skipped.
	////=================
	////*/
	////const char *idLexer::ParseBracedSection( idStr &out ) {
	////	var token = new R(new idToken);
	////	int i, depth;

	////	out.Empty();
	////	if ( !idLexer::ExpectTokenString( "{" ) ) {
	////		return out.c_str();
	////	}
	////	out = "{";
	////	depth = 1;
	////	do {
	////		if ( !this.ReadToken( &token ) ) {
	////			Error( "missing closing brace" );
	////			return out.c_str();
	////		}

	////		// if the token is on a new line
	////		for ( i = 0; i < token.linesCrossed; i++ ) {
	////			out += "\r\n";
	////		}

	////		if ( token.type == TT_PUNCTUATION ) {
	////			if ( token[0] == '{' ) {
	////				depth++;
	////			}
	////			else if ( token[0] == '}' ) {
	////				depth--;
	////			}
	////		}

	////		if ( token.type == TT_STRING ) {
	////			out += "\"" + token + "\"";
	////		}
	////		else {
	////			out += token;
	////		}
	////		out += " ";
	////	} while( depth );

	////	return out.c_str();
	////}

	/*
	=================
	idLexer::ParseRestOfLine

	  parse the rest of the line
	=================
	*/
	ParseRestOfLine(out: idStr ):string {
		var token = new idToken;

		out.Empty();
		while(this.ReadToken( token )) {
			if ( token.linesCrossed ) {
				this.script_p = this.lastScript_p;
				this.line = this.lastline;
				break;
			}
			if ( out.Length() ) {
				out.data += " ";
			}
			out.data += token.data;
		}
		return out.c_str();
	}

	/////*
	////================
	////idLexer::GetLastWhiteSpace
	////================
	////*/
	////int idLexer::GetLastWhiteSpace( idStr &whiteSpace ) const {
	////	whiteSpace.Clear();
	////	for ( const char *p = this.whiteSpaceStart_p; p < whiteSpaceEnd_p; p++ ) {
	////		whiteSpace.Append( *p );
	////	}
	////	return whiteSpace.Length();
	////}

	/////*
	////================
	////idLexer::GetLastWhiteSpaceStart
	////================
	////*/
	////int idLexer::GetLastWhiteSpaceStart( void ) const {
	////	return this.whiteSpaceStart_p - buffer;
	////}

	/////*
	////================
	////idLexer::GetLastWhiteSpaceEnd
	////================
	////*/
	////int idLexer::GetLastWhiteSpaceEnd( void ) const {
	////	return whiteSpaceEnd_p - buffer;
	////}

	/////*
	////================
	////idLexer::Reset
	////================
	////*/
	////void idLexer::Reset( void ) {
	////	// pointer in script buffer
	////	this.script_p = 0;//idLexer::buffer;
	////	// pointer in script buffer before reading token
	////	idLexer::lastScript_p = 0;//idLexer::buffer;
	////	// begin of white space
	////	idLexer::whiteSpaceStart_p = NULL;
	////	// end of white space
	////	idLexer::whiteSpaceEnd_p = NULL;
	////	// set if there's a token available in idLexer::token
	////	this.tokenavailable = 0;

	////	this.line = 1;
	////	idLexer::lastline = 1;
	////	// clear the saved token
	////	this.token = new idToken();
	////}

	/*
	================
	idLexer::EndOfFile
	================
	*/
	EndOfFile ( ): number {
		return this.script_p >= this.end_p ? 1 : 0;
	}

	/////*
	////================
	////idLexer::NumLinesCrossed
	////================
	////*/
	////int idLexer::NumLinesCrossed( void ) {
	////	return this.line - idLexer::lastline;
	////}

	/*
	================
	idLexer::LoadFile
	================
	*/
	/*int*/ LoadFile(filename: string, OSPath: boolean): number {
		//var fp: idFile;
		//var pathname = new idStr;
		//var/*int */length:number;
		//var buf;

		if ( this.loaded ) {
			common.Error("idLexer::LoadFile: another script already loaded");
			return /*false*/0;
		}

		//if ( !OSPath && ( baseFolder[0] != '\0' ) ) {// TODO: WATCH OUT HERE
		//	pathname.equals( va( "%s/%s", this.baseFolder, filename ));
		//} else {
		//	pathname = filename;
		//}
		//if ( OSPath ) {
		//	fp = fileSystem.OpenExplicitFileRead( pathname );
		//} else {
		//	fp = fileSystem.OpenFileRead( pathname );
		//}
		//if ( !fp ) {
		//	return /*false*/0;
		//}
		//length = fp.Length();
		//buf = (char *) Mem_Alloc( length + 1 );
		//buf[length] = '\0';// TODO: WATCH OUT HERE
		//fp.Read( buf, length );
		//this.fileTime = fp.Timestamp();
		this.filename.equals(filename);//fp.GetFullPath();
		//idLib::fileSystem.CloseFile( fp );


		var buf = new R<Uint8Array>();
		length = fileSystem.ReadFile( filename, buf, new R( 0 ) );
		if (length === -1 ) {
			return /*false*/0;
		}

		this.buffer = buf.$.toString();
		this.length = length;
		// pointer in script buffer
		this.script_p = 0;//idLexer::buffer;
		// pointer in script buffer before reading token
		this.lastScript_p = 0;//idLexer::buffer;
		// pointer to end of script buffer
		this.end_p = this.buffer.length;//&(idLexer::buffer[length]);

		this.tokenavailable = 0;
		this.line = 1;
		this.lastline = 1;
		this.allocated = 1/*true*/;
		this.loaded = 1/*true*/;

		dlog(DEBUG_COMPILER, "LoadFile: %s\n", filename);
		return /*true*/1;
	}

	/*
    ================
    idLexer::LoadMemory
    ================
    */
	/*int */
	LoadMemory ( /*const char **/ptr: string, /*int */length: number, /*const char **/name: string, /*int */startLine: number = 1 ): number {
		if ( this.loaded ) {
			common.Error( "idLexer::LoadMemory: another script already loaded" );
			return 0 /*false*/;
		}

		assert( typeof ptr === "string" );

		this.filename = new idStr( name );
		this.buffer = ptr;
		this.fileTime = 0;
		this.length = length;
		// pointer in script buffer
		this.script_p = 0; //this.buffer;
		// pointer in script buffer before reading token
		this.lastScript_p = 0; //this.buffer;
		// pointer to end of script buffer
		this.end_p = length; //& (this.buffer[length]);

		this.tokenavailable = 0;
		this.line = startLine;
		this.lastline = startLine;
		this.allocated = 0; //false;
		this.loaded = 1; //true;

		return 1;
	}

/*
================
idLexer::FreeSource
================
*/
FreeSource( ):void {
//#ifdef PUNCTABLE
	if ( this.punctuationtable && this.punctuationtable != default_punctuationtable ) {
		//.Mem_Free( this.punctuationtable );
		this.punctuationtable = null;
	}
	if ( this.nextpunctuation && this.nextpunctuation != default_nextpunctuation ) {
		//Mem_Free( this.nextpunctuation );
		this.nextpunctuation = null;
	}
//#endif //PUNCTABLE
	if ( this.allocated ) {
		//Mem_Free( this.buffer );
		this.buffer = null;
		this.allocated = 0;
	}
	this.tokenavailable = 0;
	this.token = new idToken();
	this.loaded = 0;
}

	constructor ( )
	constructor ( flags: number /*int*/ )
	constructor(filename: string, /*int */flags: number, OSPath: boolean )
	constructor( /*const char **/ptr: string, /*int */length: number, name: string, /*int*/ flags: number )
	constructor ( a1?: any, a2?: any, a3?: any, a4?: any ) {
		if ( arguments.length == 0 ) {
			this.loaded = 0;
			this.filename.equals( "" );
			this.flags = 0;
			this.SetPunctuations( null );
			this.allocated = 0;
			this.fileTime = 0;
			this.length = 0;
			this.line = 0;
			this.lastline = 0;
			this.tokenavailable = 0;
			this.token.equals( "" );
			this.next = null;
			this.hadError = false;
		} else if ( arguments.length == 1 ) {
			var flags = a1;
			this.loaded = 0;
			this.filename.equals( "" );
			this.flags = flags;
			this.SetPunctuations( null );
			this.allocated = 0;
			this.fileTime = 0;
			this.length = 0;
			this.line = 0;
			this.lastline = 0;
			this.tokenavailable = 0;
			this.token.equals( "" );
			this.next = null;
			this.hadError = false;
		} else if ( arguments.length == 3 ) {
			var filename = a1, flags = a2, OSPath = a3;
			this.loaded = 0;
			this.flags = flags;
			this.SetPunctuations( null );
			this.allocated = 0;
			this.token.equals( "" );
			this.next = null;
			this.hadError = false;
			this.LoadFile( filename, OSPath );
		} else if ( arguments.length == 4 ) {
			var ptr = a1, length: number = a2, name: string = a3, flags = a4;
			this.loaded = 0;
			this.flags = flags;
			this.SetPunctuations( null );
			this.allocated = 0;
			this.token.equals( "" );
			this.next = null;
			this.hadError = false;
			this.LoadMemory( ptr, length, name );
		}
	}


/////*
////================
////idLexer::~idLexer
////================
////*/
////idLexer::~idLexer( void ) {
////	idLexer::FreeSource();
////}

/////*
////================
////idLexer::SetBaseFolder
////================
////*/
////void idLexer::SetBaseFolder( const char *path ) {
////	idStr.Copynz( baseFolder, path, sizeof( baseFolder ) );
////}

/////*
////================
////idLexer::HadError
////================
////*/
////bool idLexer::HadError( void ) const {
////	return hadError;
////}


	SetFlags ( /*int */flags: number ): void {
		this.flags = flags;
	}

	GetFlags ( ): number {
		return this.flags;
	}

}