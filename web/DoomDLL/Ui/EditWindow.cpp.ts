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
////#include "DeviceContext.h"
////#include "Window.h"
////#include "UserInterfaceLocal.h"
////#include "SliderWindow.h"
////#include "EditWindow.h"
////
////
////#ifndef __EDITWINDOW_H__
////#define __EDITWINDOW_H__
////
////#include "Window.h"
////
////const int MAX_EDITFIELD = 4096;
////
////class idUserInterfaceLocal;
////class idSliderWindow;
////
class idEditWindow extends idWindow {
////public:
////	idEditWindow(idUserInterfaceLocal *gui);
////	idEditWindow(idDeviceContext *d, idUserInterfaceLocal *gui);
////	virtual 			~idEditWindow();
////
////	virtual void		Draw(int time, float x, float y);
////	virtual const char *HandleEvent(const sysEvent_t *event, bool *updateVisuals);
////	virtual void		PostParse();
////	virtual void		GainFocus();
////	virtual size_t		Allocated(){ return idWindow::Allocated(); };
////
////	virtual idWinVar *	GetWinVarByName(_name:string, bool winLookup = false, drawWin_t** owner = NULL);
////
////	virtual void 		HandleBuddyUpdate(idWindow *buddy);
////	virtual void		Activate(bool activate, idStr &act);
////
////	void				RunNamedEvent(const char* eventName);
////
////private:
////
////	virtual bool		ParseInternalVar(const char *name, idParser *src);
////
////	void				InitCvar();
////	// true: read the updated cvar from cvar system
////	// false: write to the cvar system
////	// force == true overrides liveUpdate 0
////	void				UpdateCvar(bool read, bool force = false);
////
////	void				CommonInit();
////	void				EnsureCursorVisible();
////	void				InitScroller(bool horizontal);
////
	maxChars: number /*int*/;
	paintOffset: number /*int*/;
	cursorPos: number /*int*/;
	cursorLine: number /*int*/;
	cvarMax: number /*int*/;
	wrap: boolean;
	readonly: boolean;
	numeric: boolean;
	sourceFile = new idStr;
	scroller: idSliderWindow;
	breaks = new idList< /*int*/number>( Number );
	sizeBias: number /*float*/;
	textIndex: number /*int*/;
	lastTextLength: number /*int*/;
	forceScroll: boolean;
	password = new idWinBool;

	cvarStr = new idWinStr;
	cvar: idCVar;

	liveUpdate = new idWinBool;
	cvarGroup = new idWinStr;
////};
////
////#endif /* !__EDITWINDOW_H__ */
////

	ParseInternalVar ( _name: string, src: idParser ): boolean {
		if ( idStr.Icmp( _name, "maxchars" ) == 0 ) {
			this.maxChars = src.ParseInt ( );
			return true;
		}
		if ( idStr.Icmp( _name, "numeric" ) == 0 ) {
			this.numeric = src.ParseBool ( );
			return true;
		}
		if ( idStr.Icmp( _name, "wrap" ) == 0 ) {
			this.wrap = src.ParseBool ( );
			return true;
		}
		if ( idStr.Icmp( _name, "readonly" ) == 0 ) {
			this.readonly = src.ParseBool ( );
			return true;
		}
		if ( idStr.Icmp( _name, "forceScroll" ) == 0 ) {
			this.forceScroll = src.ParseBool ( );
			return true;
		}
		if ( idStr.Icmp( _name, "source" ) == 0 ) {
			this.ParseString( src, this.sourceFile );
			return true;
		}
		if ( idStr.Icmp( _name, "password" ) == 0 ) {
			this.password.equalsBool( src.ParseBool ( ) );
			return true;
		}
		if ( idStr.Icmp( _name, "cvarMax" ) == 0 ) {
			this.cvarMax = src.ParseInt ( );
			return true;
		}

		return super.ParseInternalVar( _name, src );
	}

	GetWinVarByName ( _name: string, fixup: boolean = false, /*drawWin_t** */owner: R<drawWin_t> = null ): idWinVar {
		if ( idStr.Icmp( _name, "cvar" ) == 0 ) {
			return this.cvarStr;
		}
		if ( idStr.Icmp( _name, "password" ) == 0 ) {
			return this.password;
		}
		if ( idStr.Icmp( _name, "liveUpdate" ) == 0 ) {
			return this.liveUpdate;
		}
		if ( idStr.Icmp( _name, "cvarGroup" ) == 0 ) {
			return this.cvarGroup;
		}
		return super.GetWinVarByName( _name, fixup, owner );
	}

	CommonInit ( ): void {
		this.maxChars = 128;
		this.numeric = false;
		this.paintOffset = 0;
		this.cursorPos = 0;
		this.cursorLine = 0;
		this.cvarMax = 0;
		this.wrap = false;
		this.sourceFile.opEquals( "" );
		this.scroller = null;
		this.sizeBias = 0;
		this.lastTextLength = 0;
		this.forceScroll = false;
		this.password.equalsBool( false );
		this.cvar = null;
		this.liveUpdate.equalsBool( true );
		this.readonly = false;

		this.scroller = new idSliderWindow( this.dc, this.gui );
	}


	constructor ( d: idDeviceContext, g: idUserInterfaceLocal )
	constructor ( g: idUserInterfaceLocal )
	constructor ( a1: any, a2?: any ) {
		super ( );

		if ( arguments.length == 2 ) {
			var d = <idDeviceContext>a1, g = <idUserInterfaceLocal>a2;
			this.ctor2( d, g );
			this.dc = d;
			this.gui = g;
			this.CommonInit ( );
		} else if ( arguments.length == 1 ) {
			var g = <idUserInterfaceLocal>a1;
			this.ctor1( g );
			this.dc = null;
			this.gui = g;
			this.CommonInit ( );
		} else {
			todoThrow ( );
		}
	}

	////destructor ( ): void {
	////	// call base
	////}

	GainFocus ( ): void {
		todoThrow ( );
		//this.cursorPos = this.text.Length ( );
		//EnsureCursorVisible ( );
	}

	Draw ( /*int*/ time: number, /*float */x: number, /*float */y: number ): void {
		todoThrow ( );
////	idVec4 color = foreColor;
////
////	UpdateCvar( true );
////
////	int len = this.text.Length();
////	if ( len != lastTextLength ) {
////		this.scroller.SetValue( 0.0 );
////		EnsureCursorVisible();
////		lastTextLength = len;
////	}
////	float scale = this.textScale;
////
////	idStr		pass;
////	const char* buffer;
////	if ( password ) {		
////		const char* temp = this.text;
////		for ( ; *temp; temp++ )	{
////			pass += "*";
////		}
////		buffer = pass;
////	} else {
////		buffer = this.text;
////	}
////
////	if ( this.cursorPos > len ) {
////		this.cursorPos = len;
////	}
////
////	idRectangle rect = this.textRect;
////
////	rect.x -= this.paintOffset;
////	rect.w += this.paintOffset;
////
////	if ( this.wrap && this.scroller.GetHigh() > 0.0 ) {
////		float lineHeight = this.GetMaxCharHeight( ) + 5;
////		rect.y -= this.scroller.GetValue() * lineHeight;
////		rect.w -= this.sizeBias;
////		rect.h = ( this.breaks.Num() + 1 ) * lineHeight;
////	}
////
////	if ( hover && !noEvents && Contains(this.gui.CursorX(), this.gui.CursorY()) ) {
////		color = hoverColor;
////	} else {
////		hover = false;
////	}
////	if ( this.flags & WIN_FOCUS ) {
////		color = hoverColor;
////	}
////
////	this.dc.DrawText( buffer, scale, 0, color, rect, this.wrap, (this.flags & WIN_FOCUS) ? this.cursorPos : -1);
	}
////
/////*
////=============
////idEditWindow::HandleEvent
////=============
////*/
	HandleEvent(event: sysEvent_t, /*bool **/updateVisuals: R<boolean>): string {
		todoThrow();
////	static char buffer[ MAX_EDITFIELD ];
		var ret = "";
////
////	if ( this.wrap ) {
////		// need to call this to allow proper focus and capturing on embedded children
////		ret = idWindow::HandleEvent( event, updateVisuals );
////		if ( ret && *ret ) {
////			return ret;
////		}
////	}
////
////	if ( ( event.evType != SE_CHAR && event.evType != SE_KEY ) ) {
////		return ret;
////	}
////
////	idStr::Copynz( buffer, this.text.c_str(), sizeof( buffer ) );
////	int key = event.evValue;
////	int len = this.text.Length();
////
////	if ( event.evType == SE_CHAR ) {
////		if ( event.evValue == Sys_GetConsoleKey( false ) || event.evValue == Sys_GetConsoleKey( true ) ) {
////			return "";
////		}
////
////		if ( updateVisuals ) {
////			*updateVisuals = true;
////		}
////
////		if ( this.maxChars && len > this.maxChars ) {
////			len = this.maxChars;
////		}
////	
////		if ( ( key == K_ENTER || key == K_KP_ENTER ) && event.evValue2 ) {
////			RunScript( ON_ACTION );
////			RunScript( ON_ENTER );
////			return cmd;
////		}
////
////		if ( key == K_ESCAPE ) {
////			RunScript( ON_ESC );
////			return cmd;
////		}
////
////		if ( this.readonly ) {
////			return "";
////		}
////
////		if ( key == 'h' - 'a' + 1 || key == K_BACKSPACE ) {	// ctrl-h is backspace
////   			if ( this.cursorPos > 0 ) {
////				if ( this.cursorPos >= len ) {
////					buffer[len - 1] = 0;
////					this.cursorPos = len - 1;
////				} else {
////					memmove( &buffer[ this.cursorPos - 1 ], &buffer[ this.cursorPos ], len + 1 - this.cursorPos);
////					this.cursorPos--;
////				}
////
////				this.text = buffer;
////				UpdateCvar( false );
////				RunScript( ON_ACTION );
////			}
////
////			return "";
////   		}
////
////   		//
////   		// ignore any non printable chars (except enter when wrap is enabled)
////   		//
////		if ( this.wrap && (key == K_ENTER || key == K_KP_ENTER) ) {
////		} else if ( !idStr::CharIsPrintable( key ) ) {
////			return "";
////		}
////
////		if ( numeric ) {
////			if ( ( key < '0' || key > '9' ) && key != '.' ) {
////	       		return "";
////			}
////		}
////
////		if ( this.dc.GetOverStrike() ) {
////			if ( this.maxChars && this.cursorPos >= this.maxChars ) {
////	       		return "";
////			}
////		} else {
////			if ( ( len == MAX_EDITFIELD - 1 ) || ( this.maxChars && len >= this.maxChars ) ) {
////	       		return "";
////			}
////			memmove( &buffer[ this.cursorPos + 1 ], &buffer[ this.cursorPos ], len + 1 - this.cursorPos );
////		}
////
////		buffer[ this.cursorPos ] = key;
////
////		this.text = buffer;
////		UpdateCvar( false );
////		RunScript( ON_ACTION );
////
////		if ( this.cursorPos < len + 1 ) {
////			this.cursorPos++;
////		}
////		EnsureCursorVisible();
////
////	} else if ( event.evType == SE_KEY && event.evValue2 ) {
////
////		if ( updateVisuals ) {
////			*updateVisuals = true;
////		}
////
////		if ( key == K_DEL ) {
////			if ( this.readonly ) {
////				return ret;
////			}
////			if ( this.cursorPos < len ) {
////				memmove( &buffer[this.cursorPos], &buffer[this.cursorPos + 1], len - this.cursorPos);
////				this.text = buffer;
////				UpdateCvar( false );
////				RunScript( ON_ACTION );
////			}
////			return ret;
////		}
////
////		if ( key == K_RIGHTARROW )  {
////			if ( this.cursorPos < len ) {
////				if ( idKeyInput::IsDown( K_CTRL ) ) {
////					// skip to next word
////					while( ( this.cursorPos < len ) && ( buffer[ this.cursorPos ] != ' ' ) ) {
////						this.cursorPos++;
////					}
////
////					while( ( this.cursorPos < len ) && ( buffer[ this.cursorPos ] == ' ' ) ) {
////						this.cursorPos++;
////					}
////				} else {
////					if ( this.cursorPos < len ) {
////						this.cursorPos++;
////					}
////				}
////			} 
////
////			EnsureCursorVisible();
////
////			return ret;
////		}
////
////		if ( key == K_LEFTARROW ) {
////			if ( idKeyInput::IsDown( K_CTRL ) ) {
////				// skip to previous word
////				while( ( this.cursorPos > 0 ) && ( buffer[ this.cursorPos - 1 ] == ' ' ) ) {
////					this.cursorPos--;
////				}
////
////				while( ( this.cursorPos > 0 ) && ( buffer[ this.cursorPos - 1 ] != ' ' ) ) {
////					this.cursorPos--;
////				}
////			} else {
////				if ( this.cursorPos > 0 ) {
////					this.cursorPos--;
////				}
////			}
////
////			EnsureCursorVisible();
////
////			return ret;
////		}
////
////		if ( key == K_HOME ) {
////			if ( idKeyInput::IsDown( K_CTRL ) || this.cursorLine <= 0 || ( this.cursorLine >= this.breaks.Num() ) ) {
////                this.cursorPos = 0;
////			} else {
////				this.cursorPos = this.breaks[this.cursorLine];
////			}
////			EnsureCursorVisible();
////			return ret;
////		}
////
////		if ( key == K_END )  {
////			if ( idKeyInput::IsDown( K_CTRL ) || (this.cursorLine < -1) || ( this.cursorLine >= this.breaks.Num() - 1 ) ) {
////				this.cursorPos = len;
////			} else {
////				this.cursorPos = this.breaks[this.cursorLine + 1] - 1;
////			}
////			EnsureCursorVisible();
////			return ret;
////		}
////
////		if ( key == K_INS ) {
////			if ( !this.readonly ) {
////				this.dc.SetOverStrike( !this.dc.GetOverStrike() );
////			}
////			return ret;
////		}
////
////		if ( key == K_DOWNARROW ) {
////			if ( idKeyInput::IsDown( K_CTRL ) ) {
////				this.scroller.SetValue( this.scroller.GetValue() + 1.0 );
////			} else {
////				if ( this.cursorLine < this.breaks.Num() - 1 ) {
////					int offset = this.cursorPos - this.breaks[this.cursorLine];
////					this.cursorPos = this.breaks[this.cursorLine + 1] + offset;
////					EnsureCursorVisible();
////				}
////			}
////		}
////
////		if (key == K_UPARROW ) {
////			if ( idKeyInput::IsDown( K_CTRL ) ) {
////				this.scroller.SetValue( this.scroller.GetValue() - 1.0 );
////			} else {
////				if ( this.cursorLine > 0 ) {
////					int offset = this.cursorPos - this.breaks[this.cursorLine];
////					this.cursorPos = this.breaks[this.cursorLine - 1] + offset;
////					EnsureCursorVisible();
////				}
////			}
////		}
////
////		if ( key == K_ENTER || key == K_KP_ENTER ) {
////			RunScript( ON_ACTION );
////			RunScript( ON_ENTER );
////			return cmd;
////		}
////
////		if ( key == K_ESCAPE ) {
////			RunScript( ON_ESC );
////			return cmd;
////		}
////
////	} else if ( event.evType == SE_KEY && !event.evValue2 ) {
////		if ( key == K_ENTER || key == K_KP_ENTER ) {
////			RunScript( ON_ENTERRELEASE );
////			return cmd;
////		} else {
////			RunScript( ON_ACTIONRELEASE );
////		}
////	}

	return ret;
}

	PostParse ( ): void {
		super.PostParse ( );

		if ( this.maxChars == 0 ) {
			this.maxChars = 10;
		}
		if ( this.sourceFile.Length ( ) ) {
			todoThrow ( );
			//void *buffer;
			//fileSystem.ReadFile( sourceFile, &buffer );
			//this.	text = (char *) buffer;
			//fileSystem.FreeFile( buffer );
		}

		this.InitCvar ( );
		this.InitScroller( false );

		this.EnsureCursorVisible ( );

		this.flags |= WIN_CANFOCUS;
	}

/*
================
idEditWindow::InitScroller

This is the same as in idListWindow
================
*/
InitScroller(  horizontal :boolean):void
{
	var thumbImage = "guis/assets/scrollbar_thumb.tga";
	var barImage = "guis/assets/scrollbarv.tga";
	var scrollerName = "_scrollerWinV";

	if (horizontal) {
		barImage = "guis/assets/scrollbarh.tga";
		scrollerName = "_scrollerWinH";
	}

	var mat = declManager.FindMaterial( barImage );
	mat.SetSort( materialSort_t.SS_GUI );
	this.sizeBias = mat.GetImageWidth();

	var scrollRect = new idRectangle;
	if (horizontal) {
		this.sizeBias = mat.GetImageHeight();
		scrollRect.x = 0;
		scrollRect.y = (this.clientRect.h - this.sizeBias);
		scrollRect.w = this.clientRect.w;
		scrollRect.h = this.sizeBias;
	} else {
		scrollRect.x = (this.clientRect.w - this.sizeBias);
		scrollRect.y = 0;
		scrollRect.w = this.sizeBias;
		scrollRect.h = this.clientRect.h;
	}

	this.scroller.InitWithDefaults(scrollerName, scrollRect, this.foreColor.data, this.matColor.data, mat.GetName(), thumbImage, !horizontal, true);
	this.InsertChild(this.scroller, null);
	this.scroller.SetBuddy(this);
}

	HandleBuddyUpdate ( buddy: idWindow ) {
	}

	EnsureCursorVisible ( ): void {
		if ( this.readonly ) {
			this.cursorPos = -1;
		} else if ( this.maxChars == 1 ) {
			this.cursorPos = 0;
		}

		if ( !this.dc ) {
			return;
		}

		this.SetFont();
		if ( !this.wrap ) {
			var/*int */cursorX = 0;
			if ( password ) {
				cursorX = this.cursorPos * this.dc.CharWidth( '*', this.textScale.data );
			} else {
				var i = 0;
				while ( i < this.text.Length() && i < this.cursorPos ) {
					if ( idStr.IsColor( this.text.c_str()[i] ) ) {
						i += 2;
					} else {
						cursorX += this.dc.CharWidth( this.text.data.data[i], this.textScale.data );
						i++;
					}
				}
			}
			var /*int*/ maxWidth = this.GetMaxCharWidth( );
			var /*int*/ left = cursorX - maxWidth;
			var /*int*/ right = ( cursorX - this.textRect.w ) + maxWidth;

			if ( this.paintOffset > left ) {
				// When we go past the left side, we want the text to jump 6 characters
				this.paintOffset = left - maxWidth * 6;
			}
			if ( this.paintOffset <  right) {
				this.paintOffset = right;
			}
			if ( this.paintOffset < 0 ) {
				this.paintOffset = 0;
			}
			this.scroller.SetRange(0.0, 0.0, 1.0);

		} else {
			// Word wrap

			this.breaks.Clear();
			var rect = new idRectangle();
			rect.opEquals( this.textRect );
			rect.w -= this.sizeBias;
			this.dc.DrawText_text( this.text.c_str ( ), this.textScale.data, this.textAlign, colorWhite, rect, true, ( this.flags & WIN_FOCUS ) ? this.cursorPos : -1, true, this.breaks );

			var /*int */fit = int( this.textRect.h / ( this.GetMaxCharHeight ( ) + 5 ) );
			if ( fit < this.breaks.Num() + 1 ) {
				this.scroller.SetRange(0, this.breaks.Num() + 1 - fit, 1);
			} else {
				// The text fits completely in the box
				this.scroller.SetRange(0.0, 0.0, 1.0);
			}

			if ( this.forceScroll ) {
				this.scroller.SetValue( this.breaks.Num() - fit );
			} else if ( this.readonly ) {
			} else {
				this.cursorLine = 0;
				for ( var i = 1; i < this.breaks.Num(); i++ ) {
					if ( this.cursorPos >= this.breaks[i] ) {
						this.cursorLine = i;
					} else {
						break;
					}
				}
				var topLine = idMath.FtoiFast( this.scroller.GetValue() );
				if ( this.cursorLine < topLine ) {
					this.scroller.SetValue( this.cursorLine );
				} else if ( this.cursorLine >= topLine + fit) {
					this.scroller.SetValue( ( this.cursorLine - fit ) + 1 );
				}
			}
		}
	}

	Activate ( activate: boolean, act: idStr ): void {
		super.Activate( activate, act );
		if ( activate ) {
			this.UpdateCvar( true, true );
			this.EnsureCursorVisible ( );
		}
	}

/*
============
idEditWindow::InitCvar
============
*/
	InitCvar(): void {
		dlog( DEBUG_GUI, "idEditWindow::InitCvar %s\n", this.cvarStr.c_str ( ) );
		if ( !this.cvarStr.c_str ( ) /*this.cvarStr[0] == '\0' */ ) {
			if ( !this.text.GetName ( ) /*== NULL */ ) {
				common.Warning( "idEditWindow::InitCvar: gui '%s' window '%s' has an empty cvar string", this.gui.GetSourceFile ( ), this.name.c_str ( ) );
			}
			this.cvar = null;
			return;
		}

		this.cvar = cvarSystem.Find( this.cvarStr.c_str ( ) );
		if ( !this.cvar ) {
			dlog(DEBUG_GUI, "idEditWindow::InitCvar: gui '%s' window '%s' references undefined cvar '%s'", this.gui.GetSourceFile ( ), this.name.c_str ( ), this.cvarStr.c_str ( ) );
			common.Warning( "idEditWindow::InitCvar: gui '%s' window '%s' references undefined cvar '%s'", this.gui.GetSourceFile ( ), this.name.c_str ( ), this.cvarStr.c_str ( ) );
			return;
		}
	}

/*
============
idEditWindow::UpdateCvar
============
*/
	UpdateCvar ( read: boolean, force: boolean ) {
		todoThrow ( );
		//if ( force || liveUpdate ) {
		//	if ( this.cvar ) {
		//		if ( read ) {
		//			this.text = this.cvar.GetString();
		//		} else {
		//			this.cvar.SetString( this.text );
		//			if ( cvarMax && ( this.cvar.GetInteger() > cvarMax ) ) {
		//				this.cvar.SetInteger( cvarMax );
		//			}
		//		}
		//	}
		//}
	}

/////*
////============
////idEditWindow::RunNamedEvent
////============
////*/
////void idEditWindow::RunNamedEvent( const char* eventName ) {
////	idStr event, group;
////	
////	if ( !idStr::Cmpn( eventName, "cvar read ", 10 ) ) {
////		event = eventName;
////		group = event.Mid( 10, event.Length() - 10 );
////		if ( !group.Cmp( cvarGroup ) ) {
////			UpdateCvar( true, true );
////		}
////	} else if ( !idStr::Cmpn( eventName, "cvar write ", 11 ) ) {
////		event = eventName;
////		group = event.Mid( 11, event.Length() - 11 );
////		if ( !group.Cmp( cvarGroup ) ) {
////			UpdateCvar( false, true );
////		}
////	}
////}
}