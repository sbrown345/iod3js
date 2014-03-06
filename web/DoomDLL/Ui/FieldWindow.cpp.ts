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
////#include "FieldWindow.h"
////
////#ifndef __FIELDWINDOW_H
////#define __FIELDWINDOW_H
////
////#include "Window.h"
////
////
class idFieldWindow extends idWindow {
////public:
////	idFieldWindow(idUserInterfaceLocal *gui);
////	idFieldWindow(idDeviceContext *d, idUserInterfaceLocal *gui);
////	virtual ~idFieldWindow();
////
////	virtual void Draw(int time, float x, float y);
////
////private:
////	virtual bool ParseInternalVar(const char *name, idParser *src);
////	void CommonInit();
////	void CalcPaintOffset(int len);
	cursorPos: number /*int*/;
	lastTextLength: number /*int*/;
	lastCursorPos: number /*int*/;
	paintOffset: number /*int*/;
	showCursor: boolean;
	cursorVar = new idStr;
////};

////#endif // __FIELDWINDOW_H
////

	CommonInit ( ): void {
		this.cursorPos = 0;
		this.lastTextLength = 0;
		this.lastCursorPos = 0;
		this.paintOffset = 0;
		this.showCursor = false;
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

	ParseInternalVar ( _name: string, src: idParser ): boolean {
		if ( idStr.Icmp( _name, "cursorvar" ) == 0 ) {
			this.ParseString( src, this.cursorVar );
			return true;
		}
		if ( idStr.Icmp( _name, "showcursor" ) == 0 ) {
			this.showCursor = src.ParseBool ( );
			return true;
		}
		return super.ParseInternalVar( _name, src );
	}


	CalcPaintOffset ( /*int */len: number ): void {
		this.lastCursorPos = this.cursorPos;
		this.lastTextLength = len;
		this.paintOffset = 0;
		var /*int */tw = this.dc.TextWidth( this.text.c_str ( ), this.textScale.data, -1 );
		if ( tw < this.textRect.w ) {
			return;
		}
		while ( tw > this.textRect.w && len > 0 ) {
			tw = this.dc.TextWidth( this.text.c_str ( ), this.textScale.data, --len );
			this.paintOffset++;
		}
	}


	Draw ( /*int*/ time: number, /*float */x: number, /*float */y: number ): void {
		var scale = this.textScale.data; //float
		var /*int*/ len = this.text.Length ( );
		this.cursorPos = this.gui.State ( ).GetInt( this.cursorVar.c_str() );
		if ( len != this.lastTextLength || this.cursorPos != this.lastCursorPos ) {
			this.CalcPaintOffset( len );
		}
		var rect = this.textRect;
		if ( this.paintOffset >= len ) {
			this.paintOffset = 0;
		}
		if ( this.cursorPos > len ) {
			this.cursorPos = len;
		}
		todoThrow ( );
		//this.dc.DrawText(&text[paintOffset], scale, 0, foreColor, rect, false, ((flags & WIN_FOCUS) || showCursor) ? cursorPos - paintOffset : -1);
	}

}