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
////#include "../idlib/precompiled.h"
////#pragma hdrstop
////
////
/*
===============================================================================

Edit field

===============================================================================
*/

var MAX_EDIT_LINE = 256;

class autoComplete_t {
	valid: boolean; //	bool			
	length: number; //	int				
	completionString=""; //[MAX_EDIT_LINE];	//	char			
	currentMatch=""; //[MAX_EDIT_LINE];		//	char			
	matchCount: number; //	int				
	matchIndex: number; //	int				
	findMatchIndex: number; //	int				
}


////
////#endif /* !__EDITFIELD_H__ */
////
////
////static autoComplete_t	globalAutoComplete;
////
/////*
////===============
////FindMatches
////===============
////*/
////static void FindMatches( const char *s ) {
////	int		i;
////
////	if ( idStr::Icmpn( s, globalAutoComplete.completionString, strlen( globalAutoComplete.completionString ) ) != 0 ) {
////		return;
////	}
////	globalAutoComplete.matchCount++;
////	if ( globalAutoComplete.matchCount == 1 ) {
////		idStr::Copynz( globalAutoComplete.currentMatch, s, sizeof( globalAutoComplete.currentMatch ) );
////		return;
////	}
////
////	// cut currentMatch to the amount common with s
////	for ( i = 0; s[i]; i++ ) {
////		if ( tolower( globalAutoComplete.currentMatch[i] ) != tolower( s[i] ) ) {
////			globalAutoComplete.currentMatch[i] = 0;
////			break;
////		}
////	}
////	globalAutoComplete.currentMatch[i] = 0;
////}
////
/////*
////===============
////FindIndexMatch
////===============
////*/
////static void FindIndexMatch( const char *s ) {
////
////	if ( idStr::Icmpn( s, globalAutoComplete.completionString, strlen( globalAutoComplete.completionString ) ) != 0 ) {
////		return;
////	}
////
////	if( globalAutoComplete.findMatchIndex == globalAutoComplete.matchIndex ) {
////		idStr::Copynz( globalAutoComplete.currentMatch, s, sizeof( globalAutoComplete.currentMatch ) );
////	}
////
////	globalAutoComplete.findMatchIndex++;
////}
////
/////*
////===============
////PrintMatches
////===============
////*/
////static void PrintMatches( const char *s ) {
////	if ( idStr::Icmpn( s, globalAutoComplete.currentMatch, strlen( globalAutoComplete.currentMatch ) ) == 0 ) {
////		common.Printf( "    %s\n", s );
////	}
////}
////
/////*
////===============
////PrintCvarMatches
////===============
////*/
////static void PrintCvarMatches( const char *s ) {
////	if ( idStr::Icmpn( s, globalAutoComplete.currentMatch, strlen( globalAutoComplete.currentMatch ) ) == 0 ) {
////		common.Printf( "    %s" S_COLOR_WHITE " = \"%s\"\n", s, cvarSystem.GetCVarString( s ) );
////	}
////}
class idEditField {
////public:
////	idEditField();
////	~idEditField();
////
////	void			Clear(void);
////	void			SetWidthInChars(int w);
////	void			SetCursor(int c);
////	int				GetCursor(void) const;
////	void			ClearAutoComplete(void);
////	int				GetAutoCompleteLength(void) const;
////	void			AutoComplete(void);
////	void			CharEvent(int c);
////	void			KeyDownEvent(int key);
////	void			Paste(void);
////	char *			GetBuffer(void);
////	void			Draw(int x, int y, int width, bool showCursor, const idMaterial *material);
////	void			SetBuffer(const char *buffer);
////
////private:
	cursor: number;			  //int				
	scroll: number;			  //int				
	widthInChars: number;	  //int				
	buffer:string;//[MAX_EDIT_LINE];	  //char			
	autoComplete = new autoComplete_t;			  //autoComplete_t	
////};
/*
===============
idEditField::idEditField
===============
*/
	constructor ( ) {
		this.widthInChars = 0;
		this.Clear ( );
	}
////
/////*
////===============
////idEditField::~idEditField
////===============
////*/
////idEditField::~idEditField() {
////}

/*
===============
idEditField::Clear
===============
*/
	Clear ( ): void {
		this.buffer = "";//[0] = 0;
		this.cursor = 0;
		this.scroll = 0;
		this.autoComplete.length = 0;
		this.autoComplete.valid = false;
	}

/*
===============
idEditField::SetWidthInChars
===============
*/
	SetWidthInChars ( /*int */w: number ): void {
		assert( w <= MAX_EDIT_LINE );
		this.widthInChars = w;
	}

/////*
////===============
////idEditField::SetCursor
////===============
////*/
////void idEditField::SetCursor( int c ) {
////	assert( c <= MAX_EDIT_LINE );
////	this.cursor = c;
////}
////
/////*
////===============
////idEditField::GetCursor
////===============
////*/
////int idEditField::GetCursor( ) const {
////	return this.cursor;
////}
////
/////*
////===============
////idEditField::ClearAutoComplete
////===============
////*/
////void idEditField::ClearAutoComplete( ) {
////	if ( this.autoComplete.length > 0 && this.autoComplete.length <= (int) strlen( this.buffer ) ) {
////		this.buffer[this.autoComplete.length] = '\0';
////		if ( this.cursor > this.autoComplete.length ) {
////			this.cursor = this.autoComplete.length;
////		}
////	}
////	this.autoComplete.length = 0;
////	this.autoComplete.valid = false;
////}
////
/*
===============
idEditField::GetAutoCompleteLength
===============
*/
	GetAutoCompleteLength ( ): number {
		return this.autoComplete.length;
	}

/////*
////===============
////idEditField::AutoComplete
////===============
////*/
////void idEditField::AutoComplete( ) {
////	char completionArgString[MAX_EDIT_LINE];
////	idCmdArgs args;
////
////	if ( !this.autoComplete.valid ) {
////		args.TokenizeString( this.buffer, false );
////		idStr::Copynz( this.autoComplete.completionString, args.Argv( 0 ), sizeof( this.autoComplete.completionString ) );
////		idStr::Copynz( completionArgString, args.Args(), sizeof( completionArgString ) );
////		this.autoComplete.matchCount = 0;
////		this.autoComplete.matchIndex = 0;
////		this.autoComplete.currentMatch[0] = 0;
////
////		if ( strlen( this.autoComplete.completionString ) == 0 ) {
////			return;
////		}
////
////		globalAutoComplete = this.autoComplete;
////
////		cmdSystem.CommandCompletion( FindMatches );
////		cvarSystem.CommandCompletion( FindMatches );
////
////		this.autoComplete = globalAutoComplete;
////
////		if ( this.autoComplete.matchCount == 0 ) {
////			return;	// no matches
////		}
////
////		// when there's only one match or there's an argument
////		if ( this.autoComplete.matchCount == 1 || completionArgString[0] != '\0' ) {
////
////			/// try completing arguments
////			idStr::Append( this.autoComplete.completionString, sizeof( this.autoComplete.completionString ), " " );
////			idStr::Append( this.autoComplete.completionString, sizeof( this.autoComplete.completionString ), completionArgString );
////			this.autoComplete.matchCount = 0;
////
////			globalAutoComplete = this.autoComplete;
////
////			cmdSystem.ArgCompletion( this.autoComplete.completionString, FindMatches );
////			cvarSystem.ArgCompletion( this.autoComplete.completionString, FindMatches );
////
////			this.autoComplete = globalAutoComplete;
////
////			idStr::snPrintf( this.buffer, sizeof( this.buffer ), "%s", this.autoComplete.currentMatch );
////
////			if ( this.autoComplete.matchCount == 0 ) {
////				// no argument matches
////				idStr::Append( this.buffer, sizeof( this.buffer ), " " );
////				idStr::Append( this.buffer, sizeof( this.buffer ), completionArgString );
////				SetCursor( strlen( this.buffer ) );
////				return;
////			}
////		} else {
////
////			// multiple matches, complete to shortest
////			idStr::snPrintf( this.buffer, sizeof( this.buffer ), "%s", this.autoComplete.currentMatch );
////			if ( strlen( completionArgString ) ) {
////				idStr::Append( this.buffer, sizeof( this.buffer ), " " );
////				idStr::Append( this.buffer, sizeof( this.buffer ), completionArgString );
////			}
////		}
////
////		this.autoComplete.length = strlen( this.buffer );
////		this.autoComplete.valid = ( this.autoComplete.matchCount != 1 );
////		SetCursor( this.autoComplete.length );
////
////		common.Printf( "]%s\n", this.buffer );
////
////		// run through again, printing matches
////		globalAutoComplete = this.autoComplete;
////
////		cmdSystem.CommandCompletion( PrintMatches );
////		cmdSystem.ArgCompletion( this.autoComplete.completionString, PrintMatches );
////		cvarSystem.CommandCompletion( PrintCvarMatches );
////		cvarSystem.ArgCompletion( this.autoComplete.completionString, PrintMatches );
////
////	} else if ( this.autoComplete.matchCount != 1 ) {
////
////		// get the next match and show instead
////		this.autoComplete.matchIndex++;
////		if ( this.autoComplete.matchIndex == this.autoComplete.matchCount ) {
////			this.autoComplete.matchIndex = 0;
////		}
////		this.autoComplete.findMatchIndex = 0;
////
////		globalAutoComplete = this.autoComplete;
////
////		cmdSystem.CommandCompletion( FindIndexMatch );
////		cmdSystem.ArgCompletion( this.autoComplete.completionString, FindIndexMatch );
////		cvarSystem.CommandCompletion( FindIndexMatch );
////		cvarSystem.ArgCompletion( this.autoComplete.completionString, FindIndexMatch );
////
////		this.autoComplete = globalAutoComplete;
////
////		// and print it
////		idStr::snPrintf( this.buffer, sizeof( this.buffer ), this.autoComplete.currentMatch );
////		if ( this.autoComplete.length > (int)strlen( this.buffer ) ) {
////			this.autoComplete.length = strlen( this.buffer );
////		}
////		SetCursor( this.autoComplete.length );
////	}
////}
////
/////*
////===============
////idEditField::CharEvent
////===============
////*/
////void idEditField::CharEvent( int ch ) {
////	int		len;
////
////	if ( ch == 'v' - 'a' + 1 ) {	// ctrl-v is paste
////		Paste();
////		return;
////	}
////
////	if ( ch == 'c' - 'a' + 1 ) {	// ctrl-c clears the field
////		Clear();
////		return;
////	}
////
////	len = strlen( this.buffer );
////
////	if ( ch == 'h' - 'a' + 1 || ch == K_BACKSPACE ) {	// ctrl-h is backspace
////		if ( this.cursor > 0 ) {
////			memmove( this.buffer + this.cursor - 1, this.buffer + this.cursor, len + 1 - this.cursor );
////			this.cursor--;
////			if ( this.cursor < this.scroll ) {
////				this.scroll--;
////			}
////		}
////		return;
////	}
////
////	if ( ch == 'a' - 'a' + 1 ) {	// ctrl-a is home
////		this.cursor = 0;
////		this.scroll = 0;
////		return;
////	}
////
////	if ( ch == 'e' - 'a' + 1 ) {	// ctrl-e is end
////		this.cursor = len;
////		this.scroll = this.cursor - this.widthInChars;
////		return;
////	}
////
////	//
////	// ignore any other non printable chars
////	//
////	if ( ch < 32 ) {
////		return;
////	}
////
////	if ( idKeyInput::GetOverstrikeMode() ) {	
////		if ( this.cursor == MAX_EDIT_LINE - 1 ) {
////			return;
////		}
////		this.buffer[this.cursor] = ch;
////		this.cursor++;
////	} else {	// insert mode
////		if ( len == MAX_EDIT_LINE - 1 ) {
////			return; // all full
////		}
////		memmove( this.buffer + this.cursor + 1, this.buffer + this.cursor, len + 1 - this.cursor );
////		this.buffer[this.cursor] = ch;
////		this.cursor++;
////	}
////
////
////	if ( this.cursor >= this.widthInChars ) {
////		this.scroll++;
////	}
////
////	if ( this.cursor == len + 1 ) {
////		this.buffer[this.cursor] = 0;
////	}
////}
////
/////*
////===============
////idEditField::KeyDownEvent
////===============
////*/
////void idEditField::KeyDownEvent( int key ) {
////	int		len;
////
////	// shift-insert is paste
////	if ( ( ( key == K_INS ) || ( key == K_KP_INS ) ) && idKeyInput::IsDown( K_SHIFT ) ) {
////		ClearAutoComplete();
////		Paste();
////		return;
////	}
////
////	len = strlen( this.buffer );
////
////	if ( key == K_DEL ) {
////		if ( this.autoComplete.length ) {
////			ClearAutoComplete();
////		} else if ( this.cursor < len ) {
////			memmove( this.buffer + this.cursor, this.buffer + this.cursor + 1, len - this.cursor );
////		}
////		return;
////	}
////
////	if ( key == K_RIGHTARROW ) {
////		if ( idKeyInput::IsDown( K_CTRL ) ) {
////			// skip to next word
////			while( ( this.cursor < len ) && ( this.buffer[ this.cursor ] != ' ' ) ) {
////				this.cursor++;
////			}
////
////			while( ( this.cursor < len ) && ( this.buffer[ this.cursor ] == ' ' ) ) {
////				this.cursor++;
////			}
////		} else {
////			this.cursor++;
////		}
////
////		if ( this.cursor > len ) {
////			this.cursor = len;
////		}
////
////		if ( this.cursor >= this.scroll + this.widthInChars ) {
////			this.scroll = this.cursor - this.widthInChars + 1;
////		}
////
////		if ( this.autoComplete.length > 0 ) {
////			this.autoComplete.length = this.cursor;
////		}
////		return;
////	}
////
////	if ( key == K_LEFTARROW ) {
////		if ( idKeyInput::IsDown( K_CTRL ) ) {
////			// skip to previous word
////			while( ( this.cursor > 0 ) && ( this.buffer[ this.cursor - 1 ] == ' ' ) ) {
////				this.cursor--;
////			}
////
////			while( ( this.cursor > 0 ) && ( this.buffer[ this.cursor - 1 ] != ' ' ) ) {
////				this.cursor--;
////			}
////		} else {
////			this.cursor--;
////		}
////
////		if ( this.cursor < 0 ) {
////			this.cursor = 0;
////		}
////		if ( this.cursor < this.scroll ) {
////			this.scroll = this.cursor;
////		}
////
////		if ( this.autoComplete.length ) {
////			this.autoComplete.length = this.cursor;
////		}
////		return;
////	}
////
////	if ( key == K_HOME || ( tolower( key ) == 'a' && idKeyInput::IsDown( K_CTRL ) ) ) {
////		this.cursor = 0;
////		this.scroll = 0;
////		if ( this.autoComplete.length ) {
////			this.autoComplete.length = this.cursor;
////			this.autoComplete.valid = false;
////		}
////		return;
////	}
////
////	if ( key == K_END || ( tolower( key ) == 'e' && idKeyInput::IsDown( K_CTRL ) ) ) {
////		this.cursor = len;
////		if ( this.cursor >= this.scroll + this.widthInChars ) {
////			this.scroll = this.cursor - this.widthInChars + 1;
////		}
////		if ( this.autoComplete.length ) {
////			this.autoComplete.length = this.cursor;
////			this.autoComplete.valid = false;
////		}
////		return;
////	}
////
////	if ( key == K_INS ) {
////		idKeyInput::SetOverstrikeMode( !idKeyInput::GetOverstrikeMode() );
////		return;
////	}
////
////	// clear autocompletion buffer on normal key input
////	if ( key != K_CAPSLOCK && key != K_ALT && key != K_CTRL && key != K_SHIFT ) {
////		ClearAutoComplete();
////	}
////}
////
/////*
////===============
////idEditField::Paste
////===============
////*/
////void idEditField::Paste( ) {
////	char	*cbd;
////	int		pasteLen, i;
////
////	cbd = Sys_GetClipboardData();
////
////	if ( !cbd ) {
////		return;
////	}
////
////	// send as if typed, so insert / overstrike works properly
////	pasteLen = strlen( cbd );
////	for ( i = 0; i < pasteLen; i++ ) {
////		CharEvent( cbd[i] );
////	}
////
////	Mem_Free( cbd );
////}

/*
===============
idEditField::GetBuffer
===============
*/
	GetBuffer ( ): string {
		return this.buffer;
	}

/////*
////===============
////idEditField::SetBuffer
////===============
////*/
////void idEditField::SetBuffer( const char *buf ) {
////	Clear();
////	idStr::Copynz( this.buffer, buf, sizeof( this.buffer ) );
////	SetCursor( strlen( this.buffer ) );
////}
////
/*
===============
idEditField::Draw
===============
*/
	Draw ( /*int */x: number, /*int */y: number, /*int */width: number, showCursor: boolean, shader: idMaterial ): void {
		var len: number; //int		
		var drawLen: number; //int		
		var prestep: number; //int		
		var cursorChar: number; //int		
		var str = new Uint8Array( MAX_EDIT_LINE );
		var size: number; //int		

		size = SMALLCHAR_WIDTH;

		drawLen = this.widthInChars;
		len = strlen( this.buffer ) + 1;

		// guarantee that cursor will be visible
		if ( len <= drawLen ) {
			prestep = 0;
		} else {
			if ( this.scroll + drawLen > len ) {
				this.scroll = len - drawLen;
				if ( this.scroll < 0 ) {
					this.scroll = 0;
				}
			}
			prestep = this.scroll;

			// Skip color code
			if ( idStr.IsColor( this.buffer + prestep ) ) {
				prestep += 2;
			}
			if ( prestep > 0 && idStr.IsColor( this.buffer[prestep - 1] ) ) {
				prestep++;
			}
		}

		if ( prestep + drawLen > len ) {
			drawLen = len - prestep;
		}

		// extract <drawLen> characters from the field at <prestep>
		if ( drawLen >= MAX_EDIT_LINE ) {
			common.Error( "drawLen >= MAX_EDIT_LINE" );
		}

		memcpyUint8Array( str, this.buffer.substr( prestep ).toUint8Array ( ), drawLen );
		str[drawLen] = 0;

		// draw it
		renderSystem.DrawSmallStringExt( x, y, str.toString ( ), colorWhite, false, shader );

		// draw the cursor
		if ( !showCursor ) {
			return;
		}

		if ( ( int )( com_ticNumber >> 4 ) & 1 ) {
			return; // off blink
		}

		if ( idKeyInput.GetOverstrikeMode ( ) ) {
			cursorChar = 11;
		} else {
			cursorChar = 10;
		}

		// Move the cursor back to account for color codes
		for ( var i = 0; i < this.cursor; i++ ) {
			if ( idStr.IsColor( String.fromCharCode( str[i] ) ) ) {
				i++;
				prestep += 2;
			}
		}

		renderSystem.DrawSmallChar( x + ( this.cursor - prestep ) * size, y, cursorChar, shader );
	}
}