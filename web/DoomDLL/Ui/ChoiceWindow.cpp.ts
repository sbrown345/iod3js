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
////#include "ChoiceWindow.h"
////
////#ifndef __CHOICEWINDOW_H
////#define __CHOICEWINDOW_H
////
////#include "Window.h"
////
////class idUserInterfaceLocal;
class idChoiceWindow extends idWindow {
////public:
////	idChoiceWindow(idUserInterfaceLocal *gui);
////	idChoiceWindow(idDeviceContext *d, idUserInterfaceLocal *gui);
////	virtual				~idChoiceWindow();
////
////	virtual const char	*HandleEvent(const sysEvent_t *event, bool *updateVisuals);
////	virtual void 		PostParse();
////	virtual void 		Draw(int time, float x, float y);
////	virtual void		Activate(bool activate, idStr &act);
////	virtual size_t		Allocated(){ return idWindow::Allocated(); };
////
////	virtual idWinVar	*GetWinVarByName(_name:string, bool winLookup = false, drawWin_t** owner = NULL);
////
////	void				RunNamedEvent(const char* eventName);
////
////private:
////	virtual bool		ParseInternalVar(const char *name, idParser *src);
////	void				CommonInit();
////	void				UpdateChoice();
////	void				ValidateChoice();
////
////	void				InitVars();
////	// true: read the updated cvar from cvar system, gui from dict
////	// false: write to the cvar system, to the gui dict
////	// force == true overrides liveUpdate 0
////	void				UpdateVars(bool read, bool force = false);
////
////	void				UpdateChoicesAndVals(void);
////
	currentChoice: number;
	choiceType: number;
	latchedChoices = new idStr;
	choicesStr = new idWinStr;
	latchedVals = new idStr;
	choiceVals = new idWinStr;
	choices = new idStrList;
	values = new idStrList;

	guiStr = new idWinStr;
	cvarStr = new idWinStr;
	cvar: idCVar;
	updateStr = new idMultiWinVar;

	liveUpdate = new idWinBool;
	updateGroup = new idWinStr;
////};
////
////#endif // __CHOICEWINDOW_H

/*
============
idChoiceWindow::InitVars
============
*/
	InitVars ( ): void {
		if ( this.cvarStr.Length ( ) ) {
			this.cvar = cvarSystem.Find( this.cvarStr.c_str() );
			if ( !this.cvar ) {
				common.Warning( "idChoiceWindow::InitVars: gui '%s' window '%s' references undefined cvar '%s'", this.gui.GetSourceFile ( ), this.name.c_str ( ), this.cvarStr.c_str ( ) );
				return;
			}
			this.updateStr.Append( this.cvarStr );
		}
		if ( this.guiStr.Length ( ) ) {
			this.updateStr.Append( this.guiStr );
		}
		this.updateStr.SetGuiInfo( this.gui.GetStateDict ( ) );
		this.updateStr.Update ( );
	}

/*
============
idChoiceWindow::CommonInit
============
*/
	CommonInit ( ): void {
		this.currentChoice = 0;
		this.choiceType = 0;
		this.cvar = null;
		this.liveUpdate.equalsBool( true );
		this.choices.Clear ( );
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

	destructor ( ): void {
		todoThrow( "renderSystem.FreeRenderWorld( this.world );" );
	}

////void idChoiceWindow::RunNamedEvent( const char* eventName ) {
////	idStr event, group;
////	
////	if ( !idStr::Cmpn( eventName, "cvar read ", 10 ) ) {
////		event = eventName;
////		group = event.Mid( 10, event.Length() - 10 );
////		if ( !group.Cmp( this.updateGroup ) ) {
////			this.UpdateVars( true, true );
////		}
////	} else if ( !idStr::Cmpn( eventName, "cvar write ", 11 ) ) {
////		event = eventName;
////		group = event.Mid( 11, event.Length() - 11 );
////		if ( !group.Cmp( this.updateGroup ) ) {
////			this.UpdateVars( false, true );
////		}
////	}
////}

	UpdateVars ( read: boolean, force: boolean = false ): void {
		if ( force || this.liveUpdate ) {
			if ( this.cvar && this.cvarStr.NeedsUpdate ( ) ) {
				if ( read ) {
					this.cvarStr.Set( this.cvar.GetString ( ) );
				} else {
					this.cvar.SetString( this.cvarStr.c_str ( ) );
				}
			}
			if ( !read && this.guiStr.NeedsUpdate ( ) ) {
				this.guiStr.Set( va( "%i", this.currentChoice ) );
			}
		}
	}

	HandleEvent ( event: sysEvent_t, /*bool **/updateVisuals: R<boolean> ): string {
		todoThrow ( );
////	int key;
////	bool runAction = false;
////	bool runAction2 = false;
////
////	if ( event.evType == SE_KEY ) {
////		key = event.evValue;
////
////		if ( key == K_RIGHTARROW || key == K_KP_RIGHTARROW || key == K_MOUSE1)  {
////			// never affects the state, but we want to execute script handlers anyway
////			if ( !event.evValue2 ) {
////				RunScript( ON_ACTIONRELEASE );
////				return this.cmd.data;
////			}
////			this.currentChoice++;
////			if (this.currentChoice >= this.choices.Num()) {
////				this.currentChoice = 0;
////			}
////			runAction = true;
////		}
////
////		if ( key == K_LEFTARROW || key == K_KP_LEFTARROW || key == K_MOUSE2) {
////			// never affects the state, but we want to execute script handlers anyway
////			if ( !event.evValue2 ) {
////				RunScript( ON_ACTIONRELEASE );
////				return this.cmd.data;
////			}
////			this.currentChoice--;
////			if (this.currentChoice < 0) {
////				this.currentChoice = this.choices.Num() - 1;
////			}
////			runAction = true;
////		}
////
////		if ( !event.evValue2 ) {
////			// is a key release with no action catch
////			return "";
////		}
////
////	} else if ( event.evType == SE_CHAR ) {
////
////		key = event.evValue;
////
////		int potentialChoice = -1;
////		for ( int i = 0; i < this.choices.Num(); i++ ) {
////			if ( toupper(key) == toupper(this.choices[i][0]) ) {
////				if ( i < this.currentChoice && potentialChoice < 0 ) {
////					potentialChoice = i;
////				} else if ( i > this.currentChoice ) {
////					potentialChoice = -1;
////					this.currentChoice = i;
////					break;
////				}
////			}
////		}
////		if ( potentialChoice >= 0 ) {
////			this.currentChoice = potentialChoice;
////		}
////
////		runAction = true;
////		runAction2 = true;
////
////	} else {
////		return "";
////	}
////
////	if ( runAction ) {
////		RunScript( ON_ACTION );
////	}
////
////	if ( this.choiceType == 0 ) {
////		this.cvarStr.Set( va( "%i", this.currentChoice ) );
////	} else if ( this.values.Num() ) {
////		this.cvarStr.Set( this.values[ this.currentChoice ] );
////	} else {
////		this.cvarStr.Set( this.choices[ this.currentChoice ] );
////	}
////
////	this.UpdateVars( false );
////
////	if ( runAction2 ) {
////		RunScript( ON_ACTIONRELEASE );
////	}
////	
		return this.cmd.data;
	}

	ValidateChoice ( ): void {
		if ( this.currentChoice < 0 || this.currentChoice >= this.choices.Num ( ) ) {
			this.currentChoice = 0;
		}
		if ( this.choices.Num ( ) == 0 ) {
			this.choices.Append( new idStr( "No Choices Defined" ) );
		}
	}

	UpdateChoice ( ): void {
		if ( !this.updateStr.Num() ) {
			return;
		}
		this.UpdateVars( true );	
		this.updateStr.Update();
		if ( this.choiceType == 0 ) {
			// ChoiceType 0 stores current as an integer in either cvar or gui
			// If both cvar and gui are defined then cvar wins, but they are both updated
			if ( this.updateStr[ 0 ].NeedsUpdate() ) {
				this.currentChoice = atoi( this.updateStr[ 0 ].c_str() );
			}
			this.ValidateChoice();
		} else {
			// ChoiceType 1 stores current as a cvar string
			var c = ( this.values.Num() ) ? this.values.Num() : this.choices.Num();
			var i:number;
			for ( i = 0; i < c; i++ ) {
				if ( idStr.Icmp( this.cvarStr.c_str(), ( this.values.Num() ) ? this.values[i] : this.choices[i] ) == 0 ) {
					break;
				}
			}
			if (i == c) {
				i = 0;
			}
			this.currentChoice = i;
			this.ValidateChoice();
		}
	}

	ParseInternalVar ( _name: string, src: idParser ): boolean {
		if ( idStr.Icmp( _name, "choicetype" ) == 0 ) {
			this.choiceType = src.ParseInt ( );
			return true;
		}
		if ( idStr.Icmp( _name, "currentchoice" ) == 0 ) {
			this.currentChoice = src.ParseInt ( );
			return true;
		}
		return super.ParseInternalVar( _name, src );
	}

	GetWinVarByName ( _name: string, fixup: boolean = false, /*drawWin_t** */owner: R<drawWin_t> = null ): idWinVar {
		if ( idStr.Icmp( _name, "choices" ) == 0 ) {
			return this.choicesStr;
		}
		if ( idStr.Icmp( _name, "values" ) == 0 ) {
			return this.choiceVals;
		}
		if ( idStr.Icmp( _name, "cvar" ) == 0 ) {
			return this.cvarStr;
		}
		if ( idStr.Icmp( _name, "gui" ) == 0 ) {
			return this.guiStr;
		}
		if ( idStr.Icmp( _name, "liveUpdate" ) == 0 ) {
			return this.liveUpdate;
		}
		if ( idStr.Icmp( _name, "updateGroup" ) == 0 ) {
			return this.updateGroup;
		}

		return super.GetWinVarByName( _name, fixup, owner );
	}

// update the lists whenever the WinVar have changed
	UpdateChoicesAndVals ( ): void {
		var token = new idToken;
		var str2 = new idStr, str3 = new idStr;
		var src = new idLexer;

		if ( this.latchedChoices.Icmp( this.choicesStr.c_str ( ) ) ) {
			this.choices.Clear ( );
			src.FreeSource ( );
			src.SetFlags( lexerFlags_t.LEXFL_NOFATALERRORS | lexerFlags_t.LEXFL_ALLOWPATHNAMES | lexerFlags_t.LEXFL_ALLOWMULTICHARLITERALS | lexerFlags_t.LEXFL_ALLOWBACKSLASHSTRINGCONCAT );
			src.LoadMemory( this.choicesStr.c_str ( ), this.choicesStr.Length ( ), "<ChoiceList>" );
			if ( src.IsLoaded ( ) ) {
				while ( src.ReadToken( token ) ) {
					if ( token.data == ";" ) {
						if ( str2.Length ( ) ) {
							str2.StripTrailingWhitespace ( );
							str2.equals( common.GetLanguageDict ( ).GetString( str2.data ) );
							this.choices.Append( str2 );
							str2.equals( "" );
						}
						continue;
					}
					str2.Append( token.data );
					str2.Append( " " );
				}
				if ( str2.Length ( ) ) {
					str2.StripTrailingWhitespace ( );
					this.choices.Append( str2 );
				}
			}
			this.latchedChoices.equals( this.choicesStr.c_str ( ) );
		}
		if ( this.choiceVals.Length ( ) && this.latchedVals.Icmp( this.choiceVals.c_str ( ) ) ) {
			this.values.Clear ( );
			src.FreeSource ( );
			src.SetFlags( lexerFlags_t.LEXFL_ALLOWPATHNAMES | lexerFlags_t.LEXFL_ALLOWMULTICHARLITERALS | lexerFlags_t.LEXFL_ALLOWBACKSLASHSTRINGCONCAT );
			src.LoadMemory( this.choiceVals.c_str ( ), this.choiceVals.Length ( ), "<ChoiceVals>" );
			str2.equals( "" );
			var negNum = false;
			if ( src.IsLoaded ( ) ) {
				while ( src.ReadToken( token ) ) {
					if ( token.data == "-" ) {
						negNum = true;
						continue;
					}
					if ( token.data == ";" ) {
						if ( str2.Length ( ) ) {
							str2.StripTrailingWhitespace ( );
							this.values.Append( str2 );
							str2.equals( "" );
						}
						continue;
					}
					if ( negNum ) {
						str2.Append( "-" );
						negNum = false;
					}
					str2.Append( token.data );
					str2.Append( " " );
				}
				if ( str2.Length ( ) ) {
					str2.StripTrailingWhitespace ( );
					this.values.Append( str2 );
				}
			}
			if ( this.choices.Num ( ) != this.values.Num ( ) ) {
				common.Warning( "idChoiceWindow:: gui '%s' window '%s' has value count unequal to choices count", this.gui.GetSourceFile ( ), this.name.c_str ( ) );
			}
			this.latchedVals.equals( this.choiceVals.c_str ( ) );
		}
	}

	PostParse ( ): void {
		super.PostParse ( );
		this.UpdateChoicesAndVals ( );

		this.InitVars ( );
		this.UpdateChoice ( );
		this.UpdateVars( false );

		this.flags |= WIN_CANFOCUS;
	}

	Draw ( /*int*/ time: number, /*float */x: number, /*float */y: number ): void {
		todoThrow ( );
////	idVec4 color = foreColor;
////
////	UpdateChoicesAndVals();
////	UpdateChoice();
////
////	// FIXME: It'd be really cool if textAlign worked, but a lot of the guis have it set wrong because it used to not work
////	textAlign = 0;
////
////	if ( textShadow ) {
////		idStr shadowText = this.choices[this.currentChoice];
////		idRectangle shadowRect = textRect;
////
////		shadowText.RemoveColors();
////		shadowRect.x += textShadow;
////		shadowRect.y += textShadow;
////
////		dc.DrawText( shadowText, textScale, textAlign, colorBlack, shadowRect, false, -1 );
////	}
////
////	if ( hover && !noEvents && Contains(gui.CursorX(), gui.CursorY()) ) {
////		color = hoverColor;
////	} else {
////		hover = false;
////	}
////	if ( flags & WIN_FOCUS ) {
////		color = hoverColor;
////	}
////
////	dc.DrawText( this.choices[this.currentChoice], textScale, textAlign, color, textRect, false, -1 );
	}

	Activate ( activate: boolean, act: idStr ): void {
		if ( activate ) {
			// sets the gui state based on the current choice the window contains
			this.UpdateChoice ( );
		}
	}
}