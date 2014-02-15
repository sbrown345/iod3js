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

////#include "../idlib/precompiled.h"
////#pragma hdrstop



/////*
////===============================================================================

////	Command arguments.

////===============================================================================
////*/

class idCmdArgs {
	//public:
	constructor ( )
	constructor ( text: string, keepAsStrings: boolean )
	constructor ( text?: string, keepAsStrings?: boolean ) {
		this.argc = 0;
		if ( arguments.length === 2 ) {
			this.TokenizeString( text, keepAsStrings );
		}
	}

	////	void					operator=( const idCmdArgs &args );

	////							// The functions that execute commands get their parameters with these functions.
	Argc(): number { return this.argc; }
	// Argv() will return an empty string, not NULL if arg >= argc.
	Argv ( /*int*/ arg: number ): string { return ( arg >= 0 && arg < this.argc ) ? this.argv[arg].toString ( ) : ""; }
	////							// Returns a single string containing argv(start) to argv(end)
	////							// escapeArgs is a fugly way to put the string back into a state ready to tokenize again
	////	const char *			Args( int start = 1, int end = -1, bool escapeArgs = false ) const;

	////							// Takes a null terminated string and breaks the string up into arg tokens.
	////							// Does not need to be /n terminated.
	////							// Set keepAsStrings to true to only seperate tokens from whitespace and comments, ignoring punctuation
	////	void					TokenizeString( const char *text, bool keepAsStrings );

	////	void					AppendArg( const char *text );
	Clear ( ): void { this.argc = 0; }
	////	const char **			GetArgs( int *argc );

	////private:
	static MAX_COMMAND_ARGS = 64;
	static MAX_COMMAND_STRING = 2 * MAX_STRING_CHARS;

	argc=0;								// number of arguments					   //	int						
	argv = new Array<Uint8Array>(idCmdArgs.MAX_COMMAND_ARGS);			// points into tokenized	   //	char *					
	tokenized = new Uint8Array(idCmdArgs.MAX_COMMAND_STRING);		// will have 0 bytes inserted		   //	char					


////#endif /* !__CMDARGS_H__ */


/////*
////============
////idCmdArgs::operator=
////============
////*/
////void idCmdArgs::operator=( args:idCmdArgs ) {
////	int i;

////	this.argc = args.argc;
////	memcpy( tokenized, args.tokenized, MAX_COMMAND_STRING );
////	for ( i = 0; i < this.argc; i++ ) {
////		argv[ i ] = tokenized + ( args.argv[ i ] - args.tokenized );
////	}
////}

/*
============
idCmdArgs::Args
============
*/
//static char cmd_args[MAX_COMMAND_STRING];
	Args ( /*int*/ start = 1, /*int*/ end = -1, escapeArgs = false ): string {
		var /*int		*/i: number;
		if ( end < 0 ) {
			end = this.argc - 1;
		} else if ( end >= this.argc ) {
			end = this.argc - 1;
		}
		var cmd_args = "";
		if ( escapeArgs ) {
			cmd_args += "\"";
		}
		for ( i = start; i <= end; i++ ) {
			if ( i > start ) {
				if ( escapeArgs ) {
					cmd_args += "\" \"";
				} else {
					cmd_args += " ";
				}
			}
			if ( escapeArgs && strchr( this.argv[i], '\\'.charCodeAt( 0 ) ) ) {
				var p = 0; //this.argv[i];
				while ( this.argv[i][p] /*!= '\0'*/ ) {
					if ( this.argv[i][p] == '\\'.charCodeAt( 0 ) ) {
						cmd_args += "\\\\";
					} else {
						var l = strlen( cmd_args );
						todoThrow ( );
						//cmd_args[ l ] = this.argv[i][p];
						//cmd_args[ l+1 ] = '\0';
					}
					p++;
				}
			} else {
				cmd_args += this.argv[i].toString ( );
			}
		}
		if ( escapeArgs ) {
			cmd_args += "\"";
		}

		return cmd_args;
	}

/*
============
idCmdArgs::TokenizeString

Parses the given string into command line tokens.
The text is copied to a separate buffer and 0 characters
are inserted in the appropriate place. The argv array
will point into this temporary buffer.
============
*/
	TokenizeString ( text: string, keepAsStrings: boolean ): void {
		var lex = new idLexer;
		var token = new R( new idToken ), $number = new R( new idToken ( ) );
		var /*int*/len: number, totalLen: number;

		// clear previous args
		this.argc = 0;

		if ( !text ) {
			return;
		}

		lex.LoadMemory( text, strlen( text ), "idCmdSystemLocal::TokenizeString" );
		lex.SetFlags( lexerFlags_t.LEXFL_NOERRORS
			| lexerFlags_t.LEXFL_NOWARNINGS
			| lexerFlags_t.LEXFL_NOSTRINGCONCAT
			| lexerFlags_t.LEXFL_ALLOWPATHNAMES
			| lexerFlags_t.LEXFL_NOSTRINGESCAPECHARS
			| lexerFlags_t.LEXFL_ALLOWIPADDRESSES | ( keepAsStrings ? lexerFlags_t.LEXFL_ONLYSTRINGS : 0 ) );

		totalLen = 0;

		while ( 1 ) {
			if ( this.argc == idCmdArgs.MAX_COMMAND_ARGS ) {
				return; // this is usually something malicious
			}

			if ( !lex.ReadToken( token ) ) {
				return;
			}

			// check for negative numbers
			if ( !keepAsStrings && ( token.$.data == "-" ) ) {
				if ( lex.CheckTokenType( TT_NUMBER, 0, $number ) ) {
					token.$ = new idToken( "-" + $number.$.data );
				}
			}

			// check for cvar expansion
			if ( token.$.data == "$" ) {
				if ( !lex.ReadToken( token ) ) {
					return;
				}
				if ( /*idLib::*/cvarSystem ) {
					token.$ = new idToken( /*idLib::*/cvarSystem.GetCVarString( token.$.c_str ( ) ) );
				} else {
					token.$ = new idToken( "<unknown>" );
				}
			}

			len = token.$.Length ( );

			if ( totalLen + len + 1 > sizeof( this.tokenized ) ) {
				return; // this is usually something malicious
			}

			// regular token
			this.argv[this.argc] = this.tokenized.subarray( totalLen ); //tokenized + totalLen;
			this.argc++;

			idStr.Copynz( this.tokenized.subarray( totalLen ) /*tokenized + totalLen*/, token.$.c_str ( ), idCmdArgs.MAX_COMMAND_STRING /*sizeof( tokenized )*/ - totalLen );

			totalLen += len + 1;
		}
	}

/*
============
idCmdArgs::AppendArg
============
*/
	AppendArg ( /*const char **/text: string ): void {
		if ( !this.argc ) {
			this.argc = 1;
			this.argv[0] = this.tokenized;
			idStr.Copynz( this.tokenized, text, sizeof( this.tokenized ) );
		} else {
			this.argv[this.argc] = new Uint8Array( idCmdArgs.MAX_COMMAND_STRING );
			idStr.Copynz( this.argv[this.argc], text, idCmdArgs.MAX_COMMAND_STRING );
			this.argc++;
		}
	}

/*
============
idCmdArgs::GetArgs
============
*/
	GetArgs ( _argc: R<number> ): Uint8Array[] {
		_argc.$ = this.argc;
		return this.argv;
	}

};

