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
////#include "BindWindow.h"
////

////#ifndef __BINDWINDOW_H
////#define __BINDWINDOW_H
////
////class idUserInterfaceLocal;
class idBindWindow extends idWindow {
////public:
////	idBindWindow(idUserInterfaceLocal *gui);
////	idBindWindow(idDeviceContext *d, idUserInterfaceLocal *gui);
////	virtual ~idBindWindow();
////
////	virtual const char *HandleEvent(const sysEvent_t *event, bool *updateVisuals);
////	virtual void PostParse();
////	virtual void Draw(int time, float x, float y);
////	virtual size_t Allocated(){ return idWindow::Allocated(); };
////	// 
////	//  
////	virtual idWinVar *GetWinVarByName(_name:string, bool winLookup = false, drawWin_t** owner = NULL);
////	// 
////	virtual void Activate(bool activate, idStr &act);
////
////private:
////	void CommonInit();
	bindName = new idWinStr;
	waitingOnKey: boolean;
////};
////
////#endif // __BINDWINDOW_H


	CommonInit ( ): void {
		this.bindName.equalsStr( new idStr( "" ) );
		this.waitingOnKey = false;
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
		todoThrow( "need to call base? (or just remove this method)" );
	}


	HandleEvent ( event: sysEvent_t, /*bool **/updateVisuals: R<boolean> ): string {
		todoThrow ( );
		//static char ret[ 256 ];

		//if (!(event.evType == SE_KEY && event.evValue2)) {
		//	return "";
		//}

		//int key = event.evValue;

		//if (this.waitingOnKey) {
		//	this.waitingOnKey = false;
		//	if (key == K_ESCAPE) {
		//		idStr::snPrintf( ret, sizeof( ret ), "clearbind \"%s\"", this.bindName.GetName());
		//	} else {
		//		idStr::snPrintf( ret, sizeof( ret ), "bind %i \"%s\"", key, this.bindName.GetName());
		//	}
		//	return ret;
		//} else {
		//	if (key == K_MOUSE1) {
		//		this.waitingOnKey = true;
		//		this.gui.SetBindHandler(this);
		//		return "";
		//	}
		//}

		return "";
	}
	GetWinVarByName(_name: string, fixup: boolean = false, /*drawWin_t** */owner: R<drawWin_t> = null): idWinVar {
		if ( idStr.Icmp( _name, "bind" ) == 0 ) {
			return this.bindName;
		}

		return super.GetWinVarByName( _name, fixup, owner );
	}

	PostParse ( ): void {
		super.PostParse ( );
		this.bindName.SetGuiInfo( this.gui.GetStateDict ( ), this.bindName.c_str ( ) );
		this.bindName.Update ( );
		//this.bindName = state.GetString("bind");
		this.flags |= ( WIN_HOLDCAPTURE | WIN_CANFOCUS );
	}

	Draw ( /*int*/ time: number, /*float */x: number, /*float */y: number ): void {
		var color = new idVec4;
		color.equals( this.foreColor.data );

		var str = new idStr;
		if ( this.waitingOnKey ) {
			str.equals( common.GetLanguageDict ( ).GetString( "#str_07000" ) );
		} else if ( this.bindName.Length ( ) ) {
			str.equals( this.bindName.c_str ( ) );
		} else {
			str.equals( common.GetLanguageDict ( ).GetString( "#str_07001" ) );
		}

		if ( this.waitingOnKey || ( this.hover && !this.noEvents && this.Contains( this.gui.CursorX ( ), this.gui.CursorY ( ) ) ) ) {
			color.equals( this.hoverColor.data );
		} else {
			this.hover = false;
		}

		todoThrow( "DrawText macro here:" );
		//this.dc.DrawText( str, this.textScale, this.textAlign, color, this.textRect, false, -1 );
	}

	Activate ( activate: boolean, act: idStr ): void {

		super.Activate( activate, act );
		this.bindName.Update ( );
	}
}