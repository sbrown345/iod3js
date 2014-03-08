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
////#include "../framework/Session_local.h"
////
////#include "DeviceContext.h"
////#include "Window.h"
////#include "UserInterfaceLocal.h"
////#include "SliderWindow.h"
////#include "ListWindow.h"
////
////
////enum {
var TAB_TYPE_TEXT = 0,
	TAB_TYPE_ICON = 1;
////};

class idTabRect {
	x/*int*/:number;
	w/*int*/:number;
	align/*int*/:number;
	valign/*int*/:number;
	type/*int*/:number;
	iconSize = new idVec2;
	iconVOffset/*float*/:number;
};

class idListWindow extends idWindow {
////public:
////	idListWindow(idUserInterfaceLocal *gui);
////	idListWindow(idDeviceContext *d, idUserInterfaceLocal *gui);
////
////	virtual const char*	HandleEvent(const sysEvent_t *event, bool *updateVisuals);
////	virtual void		PostParse();
////	virtual void		Draw(int time, float x, float y);
////	virtual void		Activate(bool activate, idStr &act);
////	virtual void		HandleBuddyUpdate(idWindow *buddy);
////	virtual void		StateChanged(bool redraw = false);
////	virtual size_t		Allocated(){ return idWindow::Allocated(); };
////	virtual idWinVar*	GetWinVarByName(const char *_name, bool winLookup = false, drawWin_t** owner = NULL);
////
////	void				UpdateList();
////
////private:
////	virtual bool		ParseInternalVar(const char *name, idParser *src);
////	void				CommonInit();
////	void				InitScroller(bool horizontal);
////	void				SetCurrentSel(int sel);
////	void				AddCurrentSel(int sel);
////	int					GetCurrentSel();
////	bool				IsSelected(int index);
////	void				ClearSelection(int sel);
////
	tabInfo = new idList<idTabRect>(idTabRect);
	top: number /*int*/;
	sizeBias: number /*float*/;
	horizontal: boolean;
	tabStopStr = new idStr;
	tabAlignStr = new idStr;
	tabVAlignStr = new idStr;
	tabTypeStr = new idStr;
	tabIconSizeStr = new idStr;
	tabIconVOffsetStr = new idStr;
	//iconMaterials = new idHashTable < idMaterial/* * */>(idMaterial);
	multipleSel: boolean;

	listItems = new idStrList;
	scroller: idSliderWindow;
	currentSel = new idList< /*int*/number>( Number );
	listName = new idStr;

	clickTime: number /*int*/;

	typedTime: number /*int*/;
	typed = new idStr;
////};
////
////#endif // __LISTWINDOW_H
////
////
////// Number of pixels above the text that the rect starts
////static const int pixelOffset = 3;

// number of pixels between columns
	 static tabBorder = 4;
////
////// Time in milliseconds between clicks to register as a double-click
////static const int doubleClickSpeed = 300;
////
	CommonInit ( ): void {
		this.typed.equals( "" );
		this.typedTime = 0;
		this.clickTime = 0;
		this.currentSel.Clear ( );
		this.top = 0;
		this.sizeBias = 0;
		this.horizontal = false;
		this.scroller = new idSliderWindow( this.dc, this.gui );
		this.multipleSel = false;
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

////
////void idListWindow::SetCurrentSel( int sel ) {
////	currentSel.Clear();
////	currentSel.Append( sel );
////}
////
////void idListWindow::ClearSelection( int sel ) {
////	int cur = currentSel.FindIndex( sel );
////	if ( cur >= 0 ) {
////		currentSel.RemoveIndex( cur );
////	}
////}
////
////void idListWindow::AddCurrentSel( int sel ) {
////	currentSel.Append( sel );
////}
////
////int idListWindow::GetCurrentSel() {
////	return ( currentSel.Num() ) ? currentSel[0] : 0;
////}
////
////bool idListWindow::IsSelected( int index ) {
////	return ( currentSel.FindIndex( index ) >= 0 );
////}
////
	HandleEvent ( event: sysEvent_t, /*bool **/updateVisuals: R<boolean> ): string {
		todoThrow ( );
		// need to call this to allow proper focus and capturing on embedded children
		var ret = super.HandleEvent( event, updateVisuals );
////
////	float vert = GetMaxCharHeight();
////	int numVisibleLines = textRect.h / vert;
////
////	int key = event.evValue;
////
////	if ( event.evType == SE_KEY ) {
////		if ( !event.evValue2 ) {
////			// We only care about key down, not up
////			return ret;
////		}
////
////		if ( key == K_MOUSE1 || key == K_MOUSE2 ) {
////			// If the user clicked in the scroller, then ignore it
////			if ( this.scroller.Contains(this.gui.CursorX(), this.gui.CursorY()) ) {
////				return ret;
////			}
////		}
////
////		if ( ( key == K_ENTER || key == K_KP_ENTER ) ) {
////			RunScript( ON_ENTER );
////			return cmd;
////		}
////
////		if ( key == K_MWHEELUP ) {
////			key = K_UPARROW;
////		} else if ( key == K_MWHEELDOWN ) {
////			key = K_DOWNARROW;
////		}
////
////		if ( key == K_MOUSE1) {
////			if (Contains(this.gui.CursorX(), this.gui.CursorY())) {
////				int cur = ( int )( ( this.gui.CursorY() - actualY - pixelOffset ) / vert ) + top;
////				if ( cur >= 0 && cur < listItems.Num() ) {
////					if ( multipleSel && idKeyInput::IsDown( K_CTRL ) ) {
////						if ( IsSelected( cur ) ) {
////							ClearSelection( cur );
////						} else {
////							AddCurrentSel( cur );
////						}
////					} else {
////						if ( IsSelected( cur ) && ( this.gui.GetTime() < clickTime + doubleClickSpeed ) ) {
////							// Double-click causes ON_ENTER to get run
////							RunScript(ON_ENTER);
////							return cmd;
////						}
////						SetCurrentSel( cur );
////
////						clickTime = this.gui.GetTime();
////					}
////				} else {
////					SetCurrentSel( listItems.Num() - 1 );
////				}
////			}
////		} else if ( key == K_UPARROW || key == K_PGUP || key == K_DOWNARROW || key == K_PGDN ) {
////			int numLines = 1;
////
////			if ( key == K_PGUP || key == K_PGDN ) {
////				numLines = numVisibleLines / 2;
////			}
////
////			if ( key == K_UPARROW || key == K_PGUP ) {
////				numLines = -numLines;
////			}
////
////			if ( idKeyInput::IsDown( K_CTRL ) ) {
////				top += numLines;
////			} else {
////				SetCurrentSel( GetCurrentSel() + numLines );
////			}
////		} else {
////			return ret;
////		}
////	} else if ( event.evType == SE_CHAR ) {
////		if ( !idStr::CharIsPrintable(key) ) {
////			return ret;
////		}
////
////		if ( this.gui.GetTime() > typedTime + 1000 ) {
////			typed = "";
////		}
////		typedTime = this.gui.GetTime();
////		typed.Append( key );
////
////		for ( int i=0; i<listItems.Num(); i++ ) {
////			if ( idStr::Icmpn( typed, listItems[i], typed.Length() ) == 0 ) {
////				SetCurrentSel( i );
////				break;
////			}
////		}
////
////	} else {
////		return ret;
////	}
////
////	if ( GetCurrentSel() < 0 ) {
////		SetCurrentSel( 0 );
////	}
////
////	if ( GetCurrentSel() >= listItems.Num() ) {
////		SetCurrentSel( listItems.Num() - 1 );
////	}
////
////	if ( this.scroller.GetHigh() > 0.0f ) {
////		if ( !idKeyInput::IsDown( K_CTRL ) ) {
////			if ( top > GetCurrentSel() - 1 ) {
////				top = GetCurrentSel() - 1;
////			}
////			if ( top < GetCurrentSel() - numVisibleLines + 2 ) {
////				top = GetCurrentSel() - numVisibleLines + 2;
////			}
////		}
////
////		if ( top > listItems.Num() - 2 ) {
////			top = listItems.Num() - 2;
////		}
////		if ( top < 0 ) {
////			top = 0;
////		}
////		this.scroller.SetValue(top);
////	} else {
////		top = 0;
////		this.scroller.SetValue(0.0f);
////	}
////
////	if ( key != K_MOUSE1 ) {
////		// Send a fake mouse click event so onAction gets run in our parents
////		const sysEvent_t ev = sys.GenerateMouseButtonEvent( 1, true );
////		idWindow::HandleEvent(&ev, updateVisuals);
////	}
////
////	if ( currentSel.Num() > 0 ) {
////		for ( int i = 0; i < currentSel.Num(); i++ ) {
////			this.gui.SetStateInt( va( "%s_sel_%i", listName.c_str(), i ), currentSel[i] );
////		}
////	} else {
////		this.gui.SetStateInt( va( "%s_sel_0", listName.c_str() ), 0 );
////	}
////	this.gui.SetStateInt( va( "%s_numsel", listName.c_str() ), currentSel.Num() );
////
		return ret;
	}


	ParseInternalVar ( _name: string, src: idParser ): boolean {
		if ( idStr.Icmp( _name, "horizontal" ) == 0 ) {
			this.horizontal = src.ParseBool ( );
			return true;
		}
		if ( idStr.Icmp( _name, "listname" ) == 0 ) {
			this.ParseString( src, this.listName );
			return true;
		}
		if ( idStr.Icmp( _name, "tabstops" ) == 0 ) {
			this.ParseString( src, this.tabStopStr );
			return true;
		}
		if ( idStr.Icmp( _name, "tabaligns" ) == 0 ) {
			this.ParseString( src, this.tabAlignStr );
			return true;
		}
		if ( idStr.Icmp( _name, "multipleSel" ) == 0 ) {
			this.multipleSel = src.ParseBool ( );
			return true;
		}
		if ( idStr.Icmp( _name, "tabvaligns" ) == 0 ) {
			this.ParseString( src, this.tabVAlignStr );
			return true;
		}
		if ( idStr.Icmp( _name, "tabTypes" ) == 0 ) {
			this.ParseString( src, this.tabTypeStr );
			return true;
		}
		if ( idStr.Icmp( _name, "tabIconSizes" ) == 0 ) {
			this.ParseString( src, this.tabIconSizeStr );
			return true;
		}
		if ( idStr.Icmp( _name, "tabIconVOffset" ) == 0 ) {
			this.ParseString( src, this.tabIconVOffsetStr );
			return true;
		}

		var strName = new idStr( _name );
		if ( idStr.Icmp( strName.Left( 4 ), "mtr_" ) == 0 ) {
			var matName = new idStr;
			var mat: idMaterial;

			this.ParseString( src, matName );
			mat = declManager.FindMaterial( matName.data );
			mat.SetImageClassifications( 1 ); // just for resource tracking
			if ( mat && !mat.TestMaterialFlag( materialFlags_t.MF_DEFAULTED ) ) {
				mat.SetSort( materialSort_t.SS_GUI );
			}
			todoThrow ( ); //this.iconMaterials.Set(_name, mat);
			return true;
		}

		return super.ParseInternalVar( _name, src );
	}

	GetWinVarByName ( _name: string, fixup: boolean = false, /*drawWin_t** */owner: R<drawWin_t> = null ): idWinVar {
		return super.GetWinVarByName( _name, fixup, owner );
	}

	PostParse ( ): void {
		super.PostParse ( );

		this.InitScroller( this.horizontal );

		var tabStops = new idList< /*int*/number>( Number );
		var tabAligns = new idList< /*int*/number>( Number );
		if ( this.tabStopStr.Length ( ) ) {
			var src = new idParser( this.tabStopStr.c_str ( ), this.tabStopStr.Length ( ), "tabstops", lexerFlags_t.LEXFL_NOFATALERRORS | lexerFlags_t.LEXFL_NOSTRINGCONCAT | lexerFlags_t.LEXFL_NOSTRINGESCAPECHARS );
			var tok = new idToken;
			while ( src.ReadToken( tok ) ) {
				if ( tok.data == "," ) {
					continue;
				}
				tabStops.Append( atoi( tok.data ) );
			}
		}
		if ( this.tabAlignStr.Length ( ) ) {
			var src = new idParser( this.tabAlignStr.c_str ( ), this.tabAlignStr.Length ( ), "tabaligns", lexerFlags_t.LEXFL_NOFATALERRORS | lexerFlags_t.LEXFL_NOSTRINGCONCAT | lexerFlags_t.LEXFL_NOSTRINGESCAPECHARS );
			var tok = new idToken;
			while ( src.ReadToken( tok ) ) {
				if ( tok.data == "," ) {
					continue;
				}
				tabAligns.Append( atoi( tok.data ) );
			}
		}
		var tabVAligns = new idList< /*int*/number>( Number );
		if ( this.tabVAlignStr.Length ( ) ) {
			var src = new idParser( this.tabVAlignStr.c_str ( ), this.tabVAlignStr.Length ( ), "tabvaligns", lexerFlags_t.LEXFL_NOFATALERRORS | lexerFlags_t.LEXFL_NOSTRINGCONCAT | lexerFlags_t.LEXFL_NOSTRINGESCAPECHARS );
			var tok = new idToken;
			while ( src.ReadToken( tok ) ) {
				if ( tok.data == "," ) {
					continue;
				}
				tabVAligns.Append( atoi( tok.data ) );
			}
		}

		var tabTypes = new idList< /*int*/number>( Number );
		if ( this.tabTypeStr.Length ( ) ) {
			var src = new idParser( this.tabTypeStr.c_str ( ), this.tabTypeStr.Length ( ), "tabtypes", lexerFlags_t.LEXFL_NOFATALERRORS | lexerFlags_t.LEXFL_NOSTRINGCONCAT | lexerFlags_t.LEXFL_NOSTRINGESCAPECHARS );
			var tok = new idToken;
			while ( src.ReadToken( tok ) ) {
				if ( tok.data == "," ) {
					continue;
				}
				tabTypes.Append( atoi( tok.data ) );
			}
		}
		var tabSizes = new idList<idVec2>( idVec2 );
		if ( this.tabIconSizeStr.Length ( ) ) {
			var src = new idParser( this.tabIconSizeStr.c_str ( ), this.tabIconSizeStr.Length ( ), "tabiconsizes", lexerFlags_t.LEXFL_NOFATALERRORS | lexerFlags_t.LEXFL_NOSTRINGCONCAT | lexerFlags_t.LEXFL_NOSTRINGESCAPECHARS );
			var tok = new idToken;
			while ( src.ReadToken( tok ) ) {
				if ( tok.data == "," ) {
					continue;
				}
				var size = new idVec2;
				size.x = atoi( tok.data );

				src.ReadToken( tok ); //","
				src.ReadToken( tok );

				size.y = atoi( tok.data );
				tabSizes.Append( size );
			}
		}

		var tabIconVOffsets = new idList< /*float*/number>( Number );
		if ( this.tabIconVOffsetStr.Length ( ) ) {
			var src = new idParser( this.tabIconVOffsetStr.c_str ( ), this.tabIconVOffsetStr.Length ( ), "tabiconvoffsets", lexerFlags_t.LEXFL_NOFATALERRORS | lexerFlags_t.LEXFL_NOSTRINGCONCAT | lexerFlags_t.LEXFL_NOSTRINGESCAPECHARS );
			var tok = new idToken;
			while ( src.ReadToken( tok ) ) {
				if ( tok.data == "," ) {
					continue;
				}
				tabIconVOffsets.Append( atof( tok.data ) );
			}
		}

		var c = tabStops.Num ( );
		var doAligns = ( tabAligns.Num ( ) == tabStops.Num ( ) );
		for ( var i = 0; i < c; i++ ) {
			var r = new idTabRect;
			r.x = tabStops[i];
			r.w = ( i < c - 1 ) ? tabStops[i + 1] - r.x - idListWindow.tabBorder : -1;
			r.align = ( doAligns ) ? tabAligns[i] : 0;
			if ( tabVAligns.Num ( ) > 0 ) {
				r.valign = tabVAligns[i];
			} else {
				r.valign = 0;
			}
			if ( tabTypes.Num ( ) > 0 ) {
				r.type = tabTypes[i];
			} else {
				r.type = TAB_TYPE_TEXT;
			}
			if ( tabSizes.Num ( ) > 0 ) {
				r.iconSize = tabSizes[i];
			} else {
				r.iconSize.Zero ( );
			}
			if ( tabIconVOffsets.Num ( ) > 0 ) {
				r.iconVOffset = tabIconVOffsets[i];
			} else {
				r.iconVOffset = 0;
			}
			this.tabInfo.Append( r );
		}
		this.flags |= WIN_CANFOCUS;
	}

/*
================
idListWindow::InitScroller

This is the same as in idEditWindow
================
*/
	InitScroller ( /*bool*/ horizontal: boolean ): void {
		var thumbImage = "guis/assets/scrollbar_thumb.tga";
		var barImage = "guis/assets/scrollbarv.tga";
		var scrollerName = "_scrollerWinV";

		if ( horizontal ) {
			barImage = "guis/assets/scrollbarh.tga";
			scrollerName = "_scrollerWinH";
		}

		var mat = declManager.FindMaterial( barImage );
		mat.SetSort( materialSort_t.SS_GUI );
		this.sizeBias = mat.GetImageWidth ( );

		var scrollRect = new idRectangle;
		if ( horizontal ) {
			this.sizeBias = mat.GetImageHeight ( );
			scrollRect.x = 0;
			scrollRect.y = ( this.clientRect.h - this.sizeBias );
			scrollRect.w = this.clientRect.w;
			scrollRect.h = this.sizeBias;
		} else {
			scrollRect.x = ( this.clientRect.w - this.sizeBias );
			scrollRect.y = 0;
			scrollRect.w = this.sizeBias;
			scrollRect.h = this.clientRect.h;
		}

		this.scroller.InitWithDefaults( scrollerName, scrollRect, this.foreColor.data, this.matColor.data, mat.GetName ( ), thumbImage, !horizontal, true );
		this.InsertChild( this.scroller, null );
		this.scroller.SetBuddy( this );
	}

	Draw ( /*int*/ time: number, /*float */x: number, /*float */y: number ): void {
		todoThrow ( );
////	idVec4 color;
////	idStr work;
////	int count = listItems.Num();
////	idRectangle rect = textRect;
////	float scale = textScale;
////	float lineHeight = GetMaxCharHeight();
////
////	float bottom = textRect.Bottom();
////	float width = textRect.w;
////
////	if ( this.scroller.GetHigh() > 0.0f ) {
////		if ( horizontal ) {
////			bottom -= this.sizeBias;
////		} else {
////			width -= this.sizeBias;
////			rect.w = width;
////		}
////	}
////
////	if ( noEvents || !Contains(this.gui.CursorX(), this.gui.CursorY()) ) {
////		hover = false;
////	}
////
////	for (int i = top; i < count; i++) {
////		if ( IsSelected( i ) ) {
////			rect.h = lineHeight;
////			dc.DrawFilledRect(rect.x, rect.y + pixelOffset, rect.w, rect.h, borderColor);
////			if ( this.flags & WIN_FOCUS ) {
////				idVec4 color = borderColor;
////				color.w = 1.0f;
////				dc.DrawRect(rect.x, rect.y + pixelOffset, rect.w, rect.h, 1.0f, color );
////			}
////		}
////		rect.y ++;
////		rect.h = lineHeight - 1;
////		if ( hover && !noEvents && Contains(rect, this.gui.CursorX(), this.gui.CursorY()) ) {
////			color = hoverColor;
////		} else {
////			color = foreColor;
////		}
////		rect.h = lineHeight + pixelOffset;
////		rect.y --;
////
////		if ( this.tabInfo.Num() > 0 ) {
////			int start = 0;
////			int tab = 0;
////			int stop = listItems[i].Find('\t', 0);
////			while ( start < listItems[i].Length() ) {
////				if ( tab >= this.tabInfo.Num() ) {
////					common.Warning( "idListWindow::Draw: this.gui '%s' window '%s' this.tabInfo.Num() exceeded", this.gui.GetSourceFile(), name.c_str() );
////					break;
////				}
////				listItems[i].Mid(start, stop - start, work);
////
////				rect.x = textRect.x + this.tabInfo[tab].x;
////				rect.w = (this.tabInfo[tab].w == -1) ? width - this.tabInfo[tab].x : this.tabInfo[tab].w;
////				dc.PushClipRect( rect );
////
////				if ( this.tabInfo[tab].type == TAB_TYPE_TEXT ) {
////					dc.DrawText(work, scale, this.tabInfo[tab].align, color, rect, false, -1);
////				} else if (this.tabInfo[tab].type == TAB_TYPE_ICON) {
////					
////					const idMaterial	**hashMat;
////					const idMaterial	*iconMat;
////
////					// leaving the icon name empty doesn't draw anything
////					if ( work[0] != '\0' ) {
////
////						if ( iconMaterials.Get(work, &hashMat) == false ) {
////							iconMat = declManager.FindMaterial("_default");
////						} else {
////							iconMat = *hashMat;
////						}
////
////						idRectangle iconRect;
////						iconRect.w = this.tabInfo[tab].iconSize.x;
////						iconRect.h = this.tabInfo[tab].iconSize.y;
////
////						if(this.tabInfo[tab].align == idDeviceContext::ALIGN_LEFT) {
////							iconRect.x = rect.x;
////						} else if (this.tabInfo[tab].align == idDeviceContext::ALIGN_CENTER) {
////							iconRect.x = rect.x + rect.w/2.0f - iconRect.w/2.0f;
////						} else if (this.tabInfo[tab].align == idDeviceContext::ALIGN_RIGHT) {
////							iconRect.x  = rect.x + rect.w - iconRect.w;
////						}
////
////						if(this.tabInfo[tab].valign == 0) { //Top
////							iconRect.y = rect.y + this.tabInfo[tab].iconVOffset;
////						} else if(this.tabInfo[tab].valign == 1) { //Center
////							iconRect.y = rect.y + rect.h/2.0f - iconRect.h/2.0f + this.tabInfo[tab].iconVOffset;
////						} else if(this.tabInfo[tab].valign == 2) { //Bottom
////							iconRect.y = rect.y + rect.h - iconRect.h + this.tabInfo[tab].iconVOffset;
////						}
////
////						dc.DrawMaterial(iconRect.x, iconRect.y, iconRect.w, iconRect.h, iconMat, idVec4(1.0f,1.0f,1.0f,1.0f), 1.0f, 1.0f);
////
////					}
////				}
////
////				dc.PopClipRect();
////
////				start = stop + 1;
////				stop = listItems[i].Find('\t', start);
////				if ( stop < 0 ) {
////					stop = listItems[i].Length();
////				}
////				tab++;
////			}
////			rect.x = textRect.x;
////			rect.w = width;
////		} else {
////			dc.DrawText(listItems[i], scale, 0, color, rect, false, -1);
////		}
////		rect.y += lineHeight;
////		if ( rect.y > bottom ) {
////			break;
////		}
////	}
	}


	Activate ( activate: boolean, act: idStr ): void {
		super.Activate( activate, act );

		if ( activate ) {
			this.UpdateList ( );
		}
	}

	HandleBuddyUpdate ( buddy: idWindow ) {
		this.top = this.scroller.GetValue ( );
	}

	UpdateList(): void {
		todoThrow ( );
////	idStr str, strName;
////	listItems.Clear();
////	for (int i = 0; i < MAX_LIST_ITEMS; i++) {
////		if (this.gui.State().GetString( va("%s_item_%i", listName.c_str(), i), "", str) ) {
////			if ( str.Length() ) {
////				listItems.Append(str);
////			}
////		} else {
////			break;
////		}
////	}
////	float vert = GetMaxCharHeight();
////	int fit = textRect.h / vert;
////	if ( listItems.Num() < fit ) {
////		this.scroller.SetRange(0.0f, 0.0f, 1.0f);
////	} else {
////		this.scroller.SetRange(0.0f, (listItems.Num() - fit) + 1.0f, 1.0f);
////	}
////
////	SetCurrentSel( this.gui.State().GetInt( va( "%s_sel_0", listName.c_str() ) ) );
////
////	float value = this.scroller.GetValue();
////	if ( value > listItems.Num() - 1 ) {
////		value = listItems.Num() - 1;
////	}
////	if ( value < 0.0f ) {
////		value = 0.0f;
////	}
////	this.scroller.SetValue(value);
////	top = value;
////
////	typedTime = 0;
////	clickTime = 0;
////	typed = "";
	}
////
////void idListWindow::StateChanged( bool redraw ) {
////	UpdateList();
////}
////
}