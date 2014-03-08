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
////
class idSliderWindow extends idWindow {
////public:
////	idSliderWindow(idUserInterfaceLocal *gui);
////	idSliderWindow(idDeviceContext *d, idUserInterfaceLocal *gui);
////	virtual				~idSliderWindow();
////
////	void				InitWithDefaults(_name:string, const idRectangle &rect, const idVec4 &foreColor, const idVec4 &matColor, const char *_background, const char *thumbShader, bool _vertical, bool _scrollbar);
////
////	void				SetRange(float _low, float _high, float _step);
////	float				GetLow() { return low; }
////	float				GetHigh() { return high; }
////
////	void				SetValue(float _value);
	GetValue ( ): number /*float*/ { return this.value.data; }
////
////	virtual size_t		Allocated(){ return idWindow::Allocated(); };
////	virtual idWinVar *	GetWinVarByName(_name:string, bool winLookup = false, drawWin_t** owner = NULL);
////	virtual const char *HandleEvent(const sysEvent_t *event, bool *updateVisuals);
////	virtual void		PostParse();
////	virtual void		Draw(int time, float x, float y);
////	virtual void		DrawBackground(const idRectangle &drawRect);
////	virtual const char *RouteMouseCoords(float xd, float yd);
////	virtual void		Activate(bool activate, idStr &act);
////	virtual void		SetBuddy(idWindow *buddy);
////
////	void				RunNamedEvent(const char* eventName);
////
////private:
////	virtual bool		ParseInternalVar(const char *name, idParser *src);
////	void				CommonInit();
////	void				InitCvar();
////	// true: read the updated cvar from cvar system
////	// false: write to the cvar system
////	// force == true overrides liveUpdate 0
////	void				UpdateCvar(bool read, bool force = false);
////
		value = new idWinFloat;
		low:number/*float*/;
		high:number/*float*/;
		thumbWidth:number/*float*/;
		thumbHeight:number/*float*/;
		stepSize:number/*float*/;
		lastValue:number/*float*/;
		thumbRect = new idRectangle;
		thumbMat:idMaterial;
		vertical:boolean;
		verticalFlip:boolean;
		scrollbar:boolean;
		buddyWin:idWindow;
		thumbShader = new idStr;
		
		cvarStr = new idWinStr;
		cvar:idCVar;
		cvar_init:boolean;
		liveUpdate = new idWinBool;
		cvarGroup = new idWinStr;
////};
////
/*
============
idSliderWindow::CommonInit
============
*/
CommonInit():void {
	this.value.equalsFloat( 0.0 );
	this.low = 0.0;
	this.high = 100.0;
	this.stepSize = 1.0;
	this.thumbMat = declManager.FindMaterial("_default");
	this.buddyWin = null;
	
	this.cvar = null;
	this.cvar_init = false;
	this.liveUpdate.equalsBool( true );
	
	this.vertical = false;
	this.scrollbar = false;
	
	this.verticalFlip = false;
}

	constructor(d: idDeviceContext, g: idUserInterfaceLocal)
	constructor(g: idUserInterfaceLocal)
	constructor(a1: any, a2?: any) {
		super();

		if (arguments.length == 2) {
			var d = <idDeviceContext>a1, g = <idUserInterfaceLocal>a2;
			this.ctor2(d, g);
			this.dc = d;
			this.gui = g;
			this.CommonInit();
		} else if (arguments.length == 1) {
			var g = <idUserInterfaceLocal>a1;
			this.ctor1(g);
			this.dc = null;
			this.gui = g;
			this.CommonInit();
		} else {
			todoThrow();
		}
	}


	destructor(): void {
		todoThrow("need to call base? (or just remove this method)");
	}

	ParseInternalVar ( _name: string, src: idParser ): boolean {
		if ( idStr.Icmp( _name, "stepsize" ) == 0 || idStr.Icmp( _name, "step" ) == 0 ) {
			this.stepSize = src.ParseFloat ( );
			return true;
		}
		if ( idStr.Icmp( _name, "low" ) == 0 ) {
			this.low = src.ParseFloat ( );
			return true;
		}
		if ( idStr.Icmp( _name, "high" ) == 0 ) {
			this.high = src.ParseFloat ( );
			return true;
		}
		if ( idStr.Icmp( _name, "vertical" ) == 0 ) {
			this.vertical = src.ParseBool ( );
			return true;
		}
		if ( idStr.Icmp( _name, "verticalflip" ) == 0 ) {
			this.verticalFlip = src.ParseBool ( );
			return true;
		}
		if ( idStr.Icmp( _name, "scrollbar" ) == 0 ) {
			this.scrollbar = src.ParseBool ( );
			return true;
		}
		if ( idStr.Icmp( _name, "thumbshader" ) == 0 ) {
			this.ParseString( src, this.thumbShader );
			declManager.FindMaterial( this.thumbShader.c_str ( ) );
			return true;
		}
		return super.ParseInternalVar( _name, src );
	}

	GetWinVarByName ( _name: string, fixup: boolean = false, /*drawWin_t** */owner: R<drawWin_t> = null ): idWinVar {

		if ( idStr.Icmp( _name, "value" ) == 0 ) {
			return this.value;
		}
		if ( idStr.Icmp( _name, "cvar" ) == 0 ) {
			return this.cvarStr;
		}
		if ( idStr.Icmp( _name, "liveUpdate" ) == 0 ) {
			return this.liveUpdate;
		}
		if ( idStr.Icmp( _name, "cvarGroup" ) == 0 ) {
			return this.cvarGroup;
		}

		return super.GetWinVarByName( _name, fixup, owner );
	}

	HandleEvent ( event: sysEvent_t, /*bool **/updateVisuals: R<boolean> ): string {
		todoThrow ( );
////	if (!(event.evType == SE_KEY && event.evValue2)) {
////		return "";
////	}
////
////	int key = event.evValue;
////
////	if ( event.evValue2 && key == K_MOUSE1 ) {
////		SetCapture(this);
////		RouteMouseCoords(0.0f, 0.0f);
////		return "";
////	} 
////
////	if ( key == K_RIGHTARROW || key == K_KP_RIGHTARROW || ( key == K_MOUSE2 && this.gui.CursorY() > thumbRect.y ) )  {
////		this.value = this.value + stepSize;
////	}
////
////	if ( key == K_LEFTARROW || key == K_KP_LEFTARROW || ( key == K_MOUSE2 && this.gui.CursorY() < thumbRect.y ) ) {
////		this.value = this.value - stepSize;
////	}
////
////	if (this.buddyWin) {
////		this.buddyWin.HandleBuddyUpdate(this);
////	} else {
////		this.gui.SetStateFloat( this.cvarStr, this.value );
////		UpdateCvar( false );
////	}
////
		return "";
	}


	SetBuddy ( buddy: idWindow ): void {
		this.buddyWin = buddy;
	}

	PostParse ( ): void {
		super.PostParse ( );
		this.value.equalsFloat( 0.0 );
		this.thumbMat = declManager.FindMaterial( this.thumbShader.data );
		this.thumbMat.SetSort( materialSort_t.SS_GUI );
		this.thumbWidth = this.thumbMat.GetImageWidth ( );
		this.thumbHeight = this.thumbMat.GetImageHeight ( );
		//vertical = state.GetBool("vertical");
		//scrollbar = state.GetBool("scrollbar");
		this.flags |= ( WIN_HOLDCAPTURE | WIN_CANFOCUS );
		this.InitCvar ( );
	}

	InitWithDefaults ( _name: string, _rect: idRectangle, _foreColor: idVec4, _matColor: idVec4, _background: string, thumbShader: string, _vertical: boolean, _scrollbar: boolean ): void {
		this.SetInitialState( _name );
		this.rect.equalsRectangle( _rect );
		this.foreColor.equalsVec4( _foreColor );
		this.matColor.equalsVec4( _matColor );
		this.thumbMat = declManager.FindMaterial( thumbShader );
		this.thumbMat.SetSort( materialSort_t.SS_GUI );
		this.thumbWidth = this.thumbMat.GetImageWidth ( );
		this.thumbHeight = this.thumbMat.GetImageHeight ( );
		this.background = declManager.FindMaterial( _background );
		this.background.SetSort( materialSort_t.SS_GUI );
		this.vertical = _vertical;
		this.scrollbar = _scrollbar;
		this.flags |= WIN_HOLDCAPTURE;
	}

	SetRange ( /*float*/ _low: number, /*float */_high: number, /*float */_step: number ): void {
		this.low = _low;
		this.high = _high;
		this.stepSize = _step;
	}

	SetValue ( /*float */_value: number ): void {
		this.value.equalsFloat( _value );
	}

	Draw( /*int*/ time: number, /*float */x: number, /*float */y: number): void {
		todoThrow ( );
////	idVec4 color = foreColor;
////
////	if ( !this.cvar && !this.buddyWin ) {
////		return;
////	}
////
////	if ( !this.thumbWidth || !this.thumbHeight ) {
////		this.thumbWidth = this.thumbMat.GetImageWidth();
////		this.thumbHeight = this.thumbMat.GetImageHeight();
////	}
////
////	UpdateCvar( true );
////	if ( this.value > high ) {
////		this.value = high;
////	} else if ( this.value < low ) {
////		this.value = low;
////	}
////
////	float range = high - low;
////
////	if ( range <= 0.0f ) {
////		return;
////	}
////
////	float thumbPos = (range) ? (this.value - low) / range : 0.0;
////	if (vertical) {
////		if ( verticalFlip ) {
////			thumbPos = 1.f - thumbPos;
////		}
////		thumbPos *= drawRect.h - this.thumbHeight;
////		thumbPos += drawRect.y;
////		thumbRect.y = thumbPos;
////		thumbRect.x = drawRect.x;
////	} else {
////		thumbPos *= drawRect.w - this.thumbWidth;
////		thumbPos += drawRect.x;
////		thumbRect.x = thumbPos;
////		thumbRect.y = drawRect.y;
////	}
////	thumbRect.w = this.thumbWidth;
////	thumbRect.h = this.thumbHeight;
////
////	if ( hover && !noEvents && Contains(this.gui.CursorX(), this.gui.CursorY()) ) {
////		color = hoverColor;
////	} else {
////		hover = false;
////	}
////	if ( this.flags & WIN_CAPTURE ) {
////		color = hoverColor;
////		hover = true;
////	}
////
////	dc.DrawMaterial(thumbRect.x, thumbRect.y, thumbRect.w, thumbRect.h, this.thumbMat, color);
////	if ( this.flags & WIN_FOCUS ) {
////		dc.DrawRect(thumbRect.x+1.0f, thumbRect.y+1.0f, thumbRect.w-2.0f, thumbRect.h-2.0f, 1.0f, color);
////	}
}
////
////
////void idSliderWindow::DrawBackground(const idRectangle &_drawRect) {
////	if ( !this.cvar && !this.buddyWin ) {
////		return;
////	}
////
////	if ( high - low <= 0.0f ) {
////		return;
////	}
////
////	idRectangle r = _drawRect;
////	if (!scrollbar) {
////		if ( vertical ) {
////			r.y += this.thumbHeight / 2.f;
////			r.h -= this.thumbHeight;
////		} else {
////			r.x += this.thumbWidth / 2.0;
////			r.w -= this.thumbWidth;
////		}
////	}
////	idWindow::DrawBackground(r);
////}
////
////const char *idSliderWindow::RouteMouseCoords(float xd, float yd) {
////	float pct;
////
////	if (!(this.flags & WIN_CAPTURE)) {
////		return "";
////	}
////
////	idRectangle r = drawRect;
////	r.x = actualX;
////	r.y = actualY;
////	r.x += this.thumbWidth / 2.0;
////	r.w -= this.thumbWidth;
////	if (vertical) {
////		r.y += this.thumbHeight / 2;
////		r.h -= this.thumbHeight;
////		if (this.gui.CursorY() >= r.y && this.gui.CursorY() <= r.Bottom()) {
////			pct = (this.gui.CursorY() - r.y) / r.h;
////			if ( verticalFlip ) {
////				pct = 1.f - pct;
////			}
////			this.value = low + (high - low) * pct;
////		} else if (this.gui.CursorY() < r.y) {
////			if ( verticalFlip ) {
////				this.value = high;
////			} else {
////				this.value = low;
////			}
////		} else {
////			if ( verticalFlip ) {
////				this.value = low;
////			} else {
////				this.value = high;
////			}
////		}
////	} else {
////		r.x += this.thumbWidth / 2;
////		r.w -= this.thumbWidth;
////		if (this.gui.CursorX() >= r.x && this.gui.CursorX() <= r.Right()) {
////			pct = (this.gui.CursorX() - r.x) / r.w;
////			this.value = low + (high - low) * pct;
////		} else if (this.gui.CursorX() < r.x) {
////			this.value = low;
////		} else {
////			this.value = high;
////		}
////	}
////
////	if (this.buddyWin) {
////		this.buddyWin.HandleBuddyUpdate(this);
////	} else {
////		this.gui.SetStateFloat( this.cvarStr, this.value );
////	}
////	UpdateCvar( false );
////
////	return "";
////}
////

	Activate ( activate: boolean, act: idStr ): void {
		super.Activate( activate, act );
		if ( activate ) {
			this.UpdateCvar( true, true );
		}
	}

/*
============
idSliderWindow::InitCvar
============
*/
	InitCvar ( ): void {
		if ( !this.cvarStr.c_str ( ) /*== '\0' */ ) {
			if ( !this.buddyWin ) {
				common.Warning( "idSliderWindow::InitCvar: gui '%s' window '%s' has an empty cvar string", this.gui.GetSourceFile ( ), this.name.c_str ( ) );
			}
			this.cvar_init = true;
			this.cvar = null;
			return;
		}

		this.cvar = cvarSystem.Find( this.cvarStr.c_str ( ) );
		if ( !this.cvar ) {
			common.Warning( "idSliderWindow::InitCvar: gui '%s' window '%s' references undefined cvar '%s'", this.gui.GetSourceFile ( ), this.name.c_str ( ), this.cvarStr.c_str ( ) );
			this.cvar_init = true;
			return;
		}
	}

/*
============
idSliderWindow::UpdateCvar
============
*/
	UpdateCvar ( read: boolean, force: boolean ): void {
		todoThrow ( );
		//if ( this.buddyWin || !this.cvar ) {
		//	return;
		//}
		//if ( force || liveUpdate ) {
		//	this.value = this.cvar.GetFloat();
		//	if ( this.value != this.gui.State().GetFloat( this.cvarStr ) ) {
		//		if ( read ) {
		//			this.gui.SetStateFloat( this.cvarStr, this.value );
		//		} else {
		//			this.value = this.gui.State().GetFloat( this.cvarStr );
		//			this.cvar.SetFloat( this.value );
		//		}
		//	}
		//}
	}

/////*
////============
////idSliderWindow::RunNamedEvent
////============
////*/
////void idSliderWindow::RunNamedEvent( const char* eventName ) {
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
////
	}