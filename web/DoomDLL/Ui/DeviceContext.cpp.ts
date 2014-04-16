///*
//===========================================================================
//
//Doom 3 GPL Source Code
//Copyright (C) 1999-2011 id Software LLC, a ZeniMax Media company. 
//
//This file is part of the Doom 3 GPL Source Code (?Doom 3 Source Code?).  
//
//Doom 3 Source Code is free software: you can redistribute it and/or modify
//it under the terms of the GNU General Public License as published by
//the Free Software Foundation, either version 3 of the License, or
//(at your option) any later version.
//
//Doom 3 Source Code is distributed in the hope that it will be useful,
//but WITHOUT ANY WARRANTY; without even the implied warranty of
//MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//GNU General Public License for more details.
//
//You should have received a copy of the GNU General Public License
//along with Doom 3 Source Code.  If not, see <http://www.gnu.org/licenses/>.
//
//In addition, the Doom 3 Source Code is also subject to certain additional terms. You should have received a copy of these additional terms immediately following the terms and conditions of the GNU General Public License which accompanied the Doom 3 Source Code.  If not, please request a copy in writing from id Software at the address below.
//
//If you have questions concerning this license or the applicable additional terms, you may contact in writing id Software LLC, c/o ZeniMax Media Inc., Suite 120, Rockville, Maryland 20850 USA.
//
//===========================================================================
//*/
//
//#include "../idlib/precompiled.h"
//#pragma hdrstop
//

//// device context support for gui stuff
////
//
//#include "Rectangle.h"


var colorPurple:idVec4;
var colorOrange:idVec4;
var colorYellow:idVec4;
var colorGreen:idVec4;
var colorBlue:idVec4;
var colorRed:idVec4;
var colorBlack:idVec4;
var colorWhite:idVec4;
var colorNone:idVec4;


var VIRTUAL_WIDTH = 640;
var VIRTUAL_HEIGHT = 480;
var BLINK_DIVISOR = 200;

var CURSOR_ARROW = 0,
	CURSOR_HAND = 1,
	CURSOR_COUNT = 2;

var ALIGN_LEFT = 0,
	ALIGN_CENTER = 1,
	ALIGN_RIGHT = 2;

var SCROLLBAR_HBACK = 0,
	SCROLLBAR_VBACK = 1,
	SCROLLBAR_THUMB = 2,
	SCROLLBAR_RIGHT = 3,
	SCROLLBAR_LEFT = 4,
	SCROLLBAR_UP = 5,
	SCROLLBAR_DOWN = 6,
	SCROLLBAR_COUNT = 7;

class idDeviceContext {
	//public:
	//	idDeviceContext();
	//	~idDeviceContext() { }
	//	
	//	void				Init();
	//	void				Shutdown();
	//	bool				Initialized() { return this.initialized; }
	//	void				EnableLocalization();
	//
	//	void				GetTransformInfo(idVec3& origin, idMat3& mat );
	//
	//	void				SetTransformInfo(const idVec3 &origin, const idMat3 &mat);
	//	void				DrawMaterial(float x, float y, float w, float h, const idMaterial *mat, const idVec4 &color, float scalex = 1.0, float scaley = 1.0);
	//	void				DrawRect(float x, float y, float width, float height, float size, const idVec4 &color);
	//	void				DrawFilledRect(float x, float y, float width, float height, const idVec4 &color);
	//	int					DrawText(text:string, float textScale, int textAlign, idVec4 color, idRectangle rectDraw, bool wrap, int cursor = -1, bool calcOnly = false, idList<int> *breaks = NULL, int limit = 0 );
	//	void				DrawMaterialRect( float x, float y, float w, float h, float size, const idMaterial *mat, const idVec4 &color);
	//	void				DrawStretchPic(float x, float y, float w, float h, float s0, float t0, float s1, float t1, const idMaterial *mat);
	//
	//	void				DrawMaterialRotated(float x, float y, float w, float h, const idMaterial *mat, const idVec4 &color, float scalex = 1.0, float scaley = 1.0, /*float*/angle:number = 0.0);
	//	void				DrawStretchPicRotated(float x, float y, float w, float h, float s0, float t0, float s1, float t1, const idMaterial *mat, /*float*/angle:number = 0.0);
	//
	//	int					CharWidth( const char c, float scale );
	//	int					TextWidth(text:string, float scale, int limit);
	//	int					TextHeight(text:string, float scale, int limit);
	//	int					MaxCharHeight(float scale);
	//	int					MaxCharWidth(float scale);
	//
	//	int					FindFont( name:string );
	//	void				SetupFonts();
	//
	//	idRegion			*GetTextRegion(text:string, float textScale, idRectangle rectDraw, float xStart, float yStart);
	//
	//	void				SetSize(float width, float height);
	//
	//	const idMaterial	*GetScrollBarImage(int index);
	//
	//	void				DrawCursor(float *x, float *y, float size);
	//	void				SetCursor(int n);
	//
	//	void				AdjustCoords(float *x, float *y, float *w, float *h);
	//	bool				ClippedCoords(float *x, float *y, float *w, float *h);
	//	bool				ClippedCoords(float *x, float *y, float *w, float *h, float *s1, float *t1, float *s2, float *t2);
	//
	//	void				PushClipRect(float x, float y, float w, float h);
	//	void				PushClipRect(idRectangle r);
	//	void				PopClipRect();
	//
	//	void				EnableClipping(bool b) { enableClipping = b; };
	//	void				SetFont( int num );
	//
	//	void				SetOverStrike(bool b) { overStrikeMode = b; }
	//
	//	bool				GetOverStrike() { return overStrikeMode; }
	//
	//	void				DrawEditCursor(float x, float y, float scale);

	
	//private:
	//	int					DrawText(float x, float y, float scale, idVec4 color, text:string, float adjust, int limit, int style, int cursor = -1);
	//	void				PaintChar(float x,float y,float width,float height,float scale,float	s,float	t,float	s2,float t2,const idMaterial *hShader);
	//	void				SetFontByScale( float scale );
	//	void				Clear( void );
	//
	cursorImages = newStructArray<idMaterial>(idMaterial, CURSOR_COUNT);
	scrollBarImages = newStructArray<idMaterial>(idMaterial, SCROLLBAR_COUNT);
	whiteImage: idMaterial;								//	*const idMaterial
	activeFont: fontInfoEx_t;							//	*fontInfoEx_t
	useFont: fontInfo_t;								//	*fontInfo_t			
	fontName: idStr;							  //	idStr				
	xScale = 0.0;								  //	float				
	yScale = 0.0;								  //	float				
	
	vidHeight = 0.0;							  //	float				
	vidWidth = 0.0;							  //	float				
	//
	cursor: number;								  //	int					
	//
	clipRects:idList<idRectangle>;
										  
	static fonts: idList<fontInfoEx_t> = new idList<fontInfoEx_t>(fontInfoEx_t);
	fontLang:idStr;
	
	enableClipping:boolean;			
	
	overStrikeMode: boolean;		
	
	mat = new idMat3;		
	origin = new idVec3;			
	initialized:boolean;			
	
	mbcs:boolean;					

//#endif /* !__DEVICECONTEXT_H__ */


	gui_smallFontLimit = new idCVar( "gui_smallFontLimit", "0.30", CVAR_GUI | CVAR_ARCHIVE, "" );
	gui_mediumFontLimit = new idCVar( "gui_mediumFontLimit", "0.60", CVAR_GUI | CVAR_ARCHIVE, "" );

//
//idList<fontInfoEx_t> idDeviceContext::fonts;

/*int */
	FindFont ( name: string ) {
		var /*int */c = idDeviceContext.fonts.Num ( );
		for ( var i = 0; i < c; i++ ) {
			if ( idStr.Icmp( name, idDeviceContext.fonts[i].name.toString() ) == 0 ) {
				return i;
			}
		}

		// If the font was not found, try to register it
		var fileName = new idStr( name );
		fileName.Replace( "fonts", va( "fonts/%s", this.fontLang.c_str ( ) ) );

		var fontInfo = new fontInfoEx_t;
		var /*int */index = idDeviceContext.fonts.Append( fontInfo );
		if ( renderSystem.RegisterFont( fileName.toString(), idDeviceContext.fonts[index] ) ) {
			idStr.Copynz( idDeviceContext.fonts[index].name, name, sizeof( idDeviceContext.fonts[index].name ) );
			return index;
		} else {
			common.Printf( "Could not register font %s [%s]\n", name, fileName.c_str ( ) );
			return -1;
		}
	}

	SetupFonts ( ): void {
		idDeviceContext.fonts.SetGranularity( 1 );

		this.fontLang = new idStr( cvarSystem.GetCVarString( "sys_lang" ) );

		// western european languages can use the english font
		if ( this.fontLang.data == "french" || this.fontLang.data == "german" || this.fontLang.data == "spanish" || this.fontLang.data == "italian" ) {
			this.fontLang.data = "english";
		}

		// Default font has to be added first
		this.FindFont( "fonts" );
	}

	SetFont ( /*int */num: number ): void {
		if ( num >= 0 && num < idDeviceContext.fonts.Num ( ) ) {
			this.activeFont = idDeviceContext.fonts[num];
		} else {
			this.activeFont = idDeviceContext.fonts[0];
		}
	}


	Init():void {
	this.xScale = 0.0;
	this.SetSize(VIRTUAL_WIDTH, VIRTUAL_HEIGHT);
	this.whiteImage = declManager.FindMaterial("guis/assets/white.tga");
	this.whiteImage.SetSort( materialSort_t.SS_GUI );
	this.mbcs = false;
	this.SetupFonts();
	this.activeFont = idDeviceContext.fonts[0];
	colorPurple = new idVec4(1, 0, 1, 1);
	colorOrange = new idVec4(1, 1, 0, 1);
	colorYellow = new idVec4(0, 1, 1, 1);
	colorGreen = new idVec4(0, 1, 0, 1);
	colorBlue = new idVec4(0, 0, 1, 1);
	colorRed = new idVec4(1, 0, 0, 1);
	colorWhite = new idVec4(1, 1, 1, 1);
	colorBlack = new idVec4(0, 0, 0, 1);
	colorNone = new idVec4(0, 0, 0, 0);
	this.cursorImages[CURSOR_ARROW] = declManager.FindMaterial("ui/assets/guicursor_arrow.tga");
	this.cursorImages[CURSOR_HAND] = declManager.FindMaterial("ui/assets/guicursor_hand.tga");
	this.scrollBarImages[SCROLLBAR_HBACK] = declManager.FindMaterial("ui/assets/scrollbarh.tga");
	this.scrollBarImages[SCROLLBAR_VBACK] = declManager.FindMaterial("ui/assets/scrollbarv.tga");
	this.scrollBarImages[SCROLLBAR_THUMB] = declManager.FindMaterial("ui/assets/scrollbar_thumb.tga");
	this.scrollBarImages[SCROLLBAR_RIGHT] = declManager.FindMaterial("ui/assets/scrollbar_right.tga");
	this.scrollBarImages[SCROLLBAR_LEFT] = declManager.FindMaterial("ui/assets/scrollbar_left.tga");
	this.scrollBarImages[SCROLLBAR_UP] = declManager.FindMaterial("ui/assets/scrollbar_up.tga");
	this.scrollBarImages[SCROLLBAR_DOWN] = declManager.FindMaterial("ui/assets/scrollbar_down.tga");
	this.cursorImages[CURSOR_ARROW].SetSort( materialSort_t.SS_GUI );
	this.cursorImages[CURSOR_HAND].SetSort( materialSort_t.SS_GUI );
	this.scrollBarImages[SCROLLBAR_HBACK].SetSort( materialSort_t.SS_GUI );
	this.scrollBarImages[SCROLLBAR_VBACK].SetSort( materialSort_t.SS_GUI );
	this.scrollBarImages[SCROLLBAR_THUMB].SetSort( materialSort_t.SS_GUI );
	this.scrollBarImages[SCROLLBAR_RIGHT].SetSort( materialSort_t.SS_GUI );
	this.scrollBarImages[SCROLLBAR_LEFT].SetSort( materialSort_t.SS_GUI );
	this.scrollBarImages[SCROLLBAR_UP].SetSort( materialSort_t.SS_GUI );
	this.scrollBarImages[SCROLLBAR_DOWN].SetSort( materialSort_t.SS_GUI );
	this.cursor = CURSOR_ARROW;
	this.enableClipping = true;
	this.overStrikeMode = true;
	this.mat.Identity();
	this.origin.Zero();
	this.initialized = true;
}
//
//void idDeviceContext::Shutdown() {
//	fontName.Clear();
//	this.clipRects.Clear();
//	idDeviceContext.fonts.Clear();
//	this.Clear();
//}
//
	Clear ( ): void {
		this.initialized = false;
		this.useFont = null;
		this.activeFont = null;
		this.mbcs = false;
	}

	constructor ( ) {
		this.Clear ( );
	}

//void idDeviceContext::SetTransformInfo(const idVec3 &org, const idMat3 &m) {
//	origin = org;
//	mat = m;
//}
//
//// 
////  added method
//void idDeviceContext::GetTransformInfo(idVec3& org, idMat3& m )
//{
//	m = mat;
//	org = origin;
//}
//// 

	PopClipRect ( ): void {
		if ( this.clipRects.Num ( ) ) {
			this.clipRects.RemoveIndex( this.clipRects.Num ( ) - 1 );
		}
	}

	PushClipRect ( r: idRectangle ): void {
		this.clipRects.Append( r );
	}

//void idDeviceContext::PushClipRect(/*float */x:number, /*float */y:number, float w, float h) {
//	this.clipRects.Append(idRectangle(x, y, w, h));
//}
//
//bool idDeviceContext::ClippedCoords(float *x, float *y, float *w, float *h, float *s1, float *t1, float *s2, float *t2) {
//
//	if ( enableClipping == false || this.clipRects.Num() == 0 ) {
//		return false;
//	}
//
//	int c = this.clipRects.Num();
//	while( --c > 0 ) {
//		idRectangle *clipRect = &this.clipRects[c];
// 
//		float ox = *x;
//		float oy = *y;
//		float ow = *w;
//		float oh = *h;
//
//		if ( ow <= 0.0 || oh <= 0.0 ) {
//			break;
//		}
//
//		if (*x < clipRect.x) {
//			*w -= clipRect.x - *x;
//			*x = clipRect.x;
//		} else if (*x > clipRect.x + clipRect.w) {
//			*x = *w = *y = *h = 0;
//		}
//		if (*y < clipRect.y) {
//			*h -= clipRect.y - *y;
//			*y = clipRect.y;
//		} else if (*y > clipRect.y + clipRect.h) {
//			*x = *w = *y = *h = 0;
//		}
//		if (*w > clipRect.w) {
//			*w = clipRect.w - *x + clipRect.x;
//		} else if (*x + *w > clipRect.x + clipRect.w) {
//			*w = clipRect.Right() - *x;
//		}
//		if (*h > clipRect.h) {
//			*h = clipRect.h - *y + clipRect.y;
//		} else if (*y + *h > clipRect.y + clipRect.h) {
//			*h = clipRect.Bottom() - *y;
//		}
//
//		if ( s1 && s2 && t1 && t2 && ow > 0.0 ) {
//			float ns1, ns2, nt1, nt2;
//			// upper left
//			float u = ( *x - ox ) / ow;
//			ns1 = *s1 * ( 1.0f - u ) + *s2 * ( u );
//
//			// upper right
//			u = ( *x + *w - ox ) / ow;
//			ns2 = *s1 * ( 1.0f - u ) + *s2 * ( u );
//
//			// lower left
//			u = ( *y - oy ) / oh;
//			nt1 = *t1 * ( 1.0f - u ) + *t2 * ( u );
//
//			// lower right
//			u = ( *y + *h - oy ) / oh;
//			nt2 = *t1 * ( 1.0f - u ) + *t2 * ( u );
//
//			// set values
//			*s1 = ns1;
//			*s2 = ns2;
//			*t1 = nt1;
//			*t2 = nt2;
//		}
//	}
//
//	return (*w == 0 || *h == 0) ? true : false;
//}
//
//
//void idDeviceContext::AdjustCoords(float *x, float *y, float *w, float *h) {
//	if (x) {
//		*x *= this.xScale;
//	}
//	if (y) {
//		*y *= this.yScale;
//	}
//	if (w) {
//		*w *= this.xScale;
//	}
//	if (h) {
//		*h *= this.yScale;
//	}
//}
//
//void idDeviceContext::DrawStretchPic(/*float */x:number, /*float */y:number, float w, float h, float s1, float t1, float s2, float t2, const idMaterial *shader) {
//	idDrawVert verts[4];
//	glIndex_t indexes[6];
//	indexes[0] = 3;
//	indexes[1] = 0;
//	indexes[2] = 2;
//	indexes[3] = 2;
//	indexes[4] = 0;
//	indexes[5] = 1;
//	verts[0].xyz[0] = x;
//	verts[0].xyz[1] = y;
//	verts[0].xyz[2] = 0;
//	verts[0].st[0] = s1;
//	verts[0].st[1] = t1;
//	verts[0].normal[0] = 0;
//	verts[0].normal[1] = 0;
//	verts[0].normal[2] = 1;
//	verts[0].tangents[0][0] = 1;
//	verts[0].tangents[0][1] = 0;
//	verts[0].tangents[0][2] = 0;
//	verts[0].tangents[1][0] = 0;
//	verts[0].tangents[1][1] = 1;
//	verts[0].tangents[1][2] = 0;
//	verts[1].xyz[0] = x + w;
//	verts[1].xyz[1] = y;
//	verts[1].xyz[2] = 0;
//	verts[1].st[0] = s2;
//	verts[1].st[1] = t1;
//	verts[1].normal[0] = 0;
//	verts[1].normal[1] = 0;
//	verts[1].normal[2] = 1;
//	verts[1].tangents[0][0] = 1;
//	verts[1].tangents[0][1] = 0;
//	verts[1].tangents[0][2] = 0;
//	verts[1].tangents[1][0] = 0;
//	verts[1].tangents[1][1] = 1;
//	verts[1].tangents[1][2] = 0;
//	verts[2].xyz[0] = x + w;
//	verts[2].xyz[1] = y + h;
//	verts[2].xyz[2] = 0;
//	verts[2].st[0] = s2;
//	verts[2].st[1] = t2;
//	verts[2].normal[0] = 0;
//	verts[2].normal[1] = 0;
//	verts[2].normal[2] = 1;
//	verts[2].tangents[0][0] = 1;
//	verts[2].tangents[0][1] = 0;
//	verts[2].tangents[0][2] = 0;
//	verts[2].tangents[1][0] = 0;
//	verts[2].tangents[1][1] = 1;
//	verts[2].tangents[1][2] = 0;
//	verts[3].xyz[0] = x;
//	verts[3].xyz[1] = y + h;
//	verts[3].xyz[2] = 0;
//	verts[3].st[0] = s1;
//	verts[3].st[1] = t2;
//	verts[3].normal[0] = 0;
//	verts[3].normal[1] = 0;
//	verts[3].normal[2] = 1;
//	verts[3].tangents[0][0] = 1;
//	verts[3].tangents[0][1] = 0;
//	verts[3].tangents[0][2] = 0;
//	verts[3].tangents[1][0] = 0;
//	verts[3].tangents[1][1] = 1;
//	verts[3].tangents[1][2] = 0;
//	
//	bool ident = !mat.IsIdentity();
//	if ( ident ) {
//		verts[0].xyz -= origin;
//		verts[0].xyz *= mat;
//		verts[0].xyz += origin;
//		verts[1].xyz -= origin;
//		verts[1].xyz *= mat;
//		verts[1].xyz += origin;
//		verts[2].xyz -= origin;
//		verts[2].xyz *= mat;
//		verts[2].xyz += origin;
//		verts[3].xyz -= origin;
//		verts[3].xyz *= mat;
//		verts[3].xyz += origin;
//	}
//
//	renderSystem.DrawStretchPic( &verts[0], &indexes[0], 4, 6, shader, ident );
//	
//}
//
//
//void idDeviceContext::DrawMaterial(/*float */x:number, /*float */y:number, float w, float h, const idMaterial *mat, const idVec4 &color, float scalex, float scaley) {
//
//	renderSystem.SetColor(color);
//
//	float	s0, s1, t0, t1;
//// 
////  handle negative scales as well	
//	if ( scalex < 0 )
//	{
//		w *= -1;
//		scalex *= -1;
//	}
//	if ( scaley < 0 )
//	{
//		h *= -1;
//		scaley *= -1;
//	}
//// 
//	if( w < 0 ) {	// flip about vertical
//		w  = -w;
//		s0 = 1 * scalex;
//		s1 = 0;
//	}
//	else {
//		s0 = 0;
//		s1 = 1 * scalex;
//	}
//
//	if( h < 0 ) {	// flip about horizontal
//		h  = -h;
//		t0 = 1 * scaley;
//		t1 = 0;
//	}
//	else {
//		t0 = 0;
//		t1 = 1 * scaley;
//	}
//
//	if ( ClippedCoords( &x, &y, &w, &h, &s0, &t0, &s1, &t1 ) ) {
//		return;
//	}
//
//	AdjustCoords(&x, &y, &w, &h);
//
//	DrawStretchPic( x, y, w, h, s0, t0, s1, t1, mat);
//}
//
//void idDeviceContext::DrawMaterialRotated(/*float */x:number, /*float */y:number, float w, float h, const idMaterial *mat, const idVec4 &color, float scalex, float scaley, /*float*/angle:number) {
//	
//	renderSystem.SetColor(color);
//
//	float	s0, s1, t0, t1;
//	// 
//	//  handle negative scales as well	
//	if ( scalex < 0 )
//	{
//		w *= -1;
//		scalex *= -1;
//	}
//	if ( scaley < 0 )
//	{
//		h *= -1;
//		scaley *= -1;
//	}
//	// 
//	if( w < 0 ) {	// flip about vertical
//		w  = -w;
//		s0 = 1 * scalex;
//		s1 = 0;
//	}
//	else {
//		s0 = 0;
//		s1 = 1 * scalex;
//	}
//
//	if( h < 0 ) {	// flip about horizontal
//		h  = -h;
//		t0 = 1 * scaley;
//		t1 = 0;
//	}
//	else {
//		t0 = 0;
//		t1 = 1 * scaley;
//	}
//
//	if ( angle == 0.0 && ClippedCoords( &x, &y, &w, &h, &s0, &t0, &s1, &t1 ) ) {
//		return;
//	}
//
//	AdjustCoords(&x, &y, &w, &h);
//
//	DrawStretchPicRotated( x, y, w, h, s0, t0, s1, t1, mat, angle);
//}
//
//void idDeviceContext::DrawStretchPicRotated(/*float */x:number, /*float */y:number, float w, float h, float s1, float t1, float s2, float t2, const idMaterial *shader, /*float*/angle:number) {
//	
//	idDrawVert verts[4];
//	glIndex_t indexes[6];
//	indexes[0] = 3;
//	indexes[1] = 0;
//	indexes[2] = 2;
//	indexes[3] = 2;
//	indexes[4] = 0;
//	indexes[5] = 1;
//	verts[0].xyz[0] = x;
//	verts[0].xyz[1] = y;
//	verts[0].xyz[2] = 0;
//	verts[0].st[0] = s1;
//	verts[0].st[1] = t1;
//	verts[0].normal[0] = 0;
//	verts[0].normal[1] = 0;
//	verts[0].normal[2] = 1;
//	verts[0].tangents[0][0] = 1;
//	verts[0].tangents[0][1] = 0;
//	verts[0].tangents[0][2] = 0;
//	verts[0].tangents[1][0] = 0;
//	verts[0].tangents[1][1] = 1;
//	verts[0].tangents[1][2] = 0;
//	verts[1].xyz[0] = x + w;
//	verts[1].xyz[1] = y;
//	verts[1].xyz[2] = 0;
//	verts[1].st[0] = s2;
//	verts[1].st[1] = t1;
//	verts[1].normal[0] = 0;
//	verts[1].normal[1] = 0;
//	verts[1].normal[2] = 1;
//	verts[1].tangents[0][0] = 1;
//	verts[1].tangents[0][1] = 0;
//	verts[1].tangents[0][2] = 0;
//	verts[1].tangents[1][0] = 0;
//	verts[1].tangents[1][1] = 1;
//	verts[1].tangents[1][2] = 0;
//	verts[2].xyz[0] = x + w;
//	verts[2].xyz[1] = y + h;
//	verts[2].xyz[2] = 0;
//	verts[2].st[0] = s2;
//	verts[2].st[1] = t2;
//	verts[2].normal[0] = 0;
//	verts[2].normal[1] = 0;
//	verts[2].normal[2] = 1;
//	verts[2].tangents[0][0] = 1;
//	verts[2].tangents[0][1] = 0;
//	verts[2].tangents[0][2] = 0;
//	verts[2].tangents[1][0] = 0;
//	verts[2].tangents[1][1] = 1;
//	verts[2].tangents[1][2] = 0;
//	verts[3].xyz[0] = x;
//	verts[3].xyz[1] = y + h;
//	verts[3].xyz[2] = 0;
//	verts[3].st[0] = s1;
//	verts[3].st[1] = t2;
//	verts[3].normal[0] = 0;
//	verts[3].normal[1] = 0;
//	verts[3].normal[2] = 1;
//	verts[3].tangents[0][0] = 1;
//	verts[3].tangents[0][1] = 0;
//	verts[3].tangents[0][2] = 0;
//	verts[3].tangents[1][0] = 0;
//	verts[3].tangents[1][1] = 1;
//	verts[3].tangents[1][2] = 0;
//
//	bool ident = !mat.IsIdentity();
//	if ( ident ) {
//		verts[0].xyz -= origin;
//		verts[0].xyz *= mat;
//		verts[0].xyz += origin;
//		verts[1].xyz -= origin;
//		verts[1].xyz *= mat;
//		verts[1].xyz += origin;
//		verts[2].xyz -= origin;
//		verts[2].xyz *= mat;
//		verts[2].xyz += origin;
//		verts[3].xyz -= origin;
//		verts[3].xyz *= mat;
//		verts[3].xyz += origin;
//	}
//
//	//Generate a translation so we can translate to the center of the image rotate and draw
//	idVec3 origTrans;
//	origTrans.x = x+(w/2);
//	origTrans.y = y+(h/2);
//	origTrans.z = 0;
//
//
//	//Rotate the verts about the z axis before drawing them
//	idMat4 rotz;
//	rotz.Identity();
//	float sinAng = idMath::Sin(angle);
//	float cosAng = idMath::Cos(angle);
//	rotz[0][0] = cosAng;
//	rotz[0][1] = sinAng;
//	rotz[1][0] = -sinAng;
//	rotz[1][1] = cosAng;
//	for(int i = 0; i < 4; i++) {
//		//Translate to origin
//		verts[i].xyz -= origTrans;
//
//		//Rotate
//		verts[i].xyz = rotz * verts[i].xyz;
//
//		//Translate back
//		verts[i].xyz += origTrans;
//	}
//
//
//	renderSystem.DrawStretchPic( &verts[0], &indexes[0], 4, 6, shader, (angle == 0.0) ? false : true );
//}
//
//void idDeviceContext::DrawFilledRect( /*float */x:number, /*float */y:number, float w, float h, const idVec4 &color) {
//
//	if ( color.w == 0.0 ) {
//		return;
//	}
//
//	renderSystem.SetColor(color);
//	
//	if (ClippedCoords(&x, &y, &w, &h, NULL, NULL, NULL, NULL)) {
//		return;
//	}
//
//	AdjustCoords(&x, &y, &w, &h);
//	DrawStretchPic( x, y, w, h, 0, 0, 0, 0, whiteImage);
//}
//
//
//void idDeviceContext::DrawRect( /*float */x:number, /*float */y:number, float w, float h, float size, const idVec4 &color) {
//
//	if ( color.w == 0.0 ) {
//		return;
//	}
//
//	renderSystem.SetColor(color);
//	
//	if (ClippedCoords(&x, &y, &w, &h, NULL, NULL, NULL, NULL)) {
//		return;
//	}
//
//	AdjustCoords(&x, &y, &w, &h);
//	DrawStretchPic( x, y, size, h, 0, 0, 0, 0, whiteImage );
//	DrawStretchPic( x + w - size, y, size, h, 0, 0, 0, 0, whiteImage );
//	DrawStretchPic( x, y, w, size, 0, 0, 0, 0, whiteImage );
//	DrawStretchPic( x, y + h - size, w, size, 0, 0, 0, 0, whiteImage );
//}
//
//void idDeviceContext::DrawMaterialRect( /*float */x:number, /*float */y:number, float w, float h, float size, const idMaterial *mat, const idVec4 &color) {
//
//	if ( color.w == 0.0 ) {
//		return;
//	}
//
//	renderSystem.SetColor(color);
//	DrawMaterial( x, y, size, h, mat, color );
//	DrawMaterial( x + w - size, y, size, h, mat, color );
//	DrawMaterial( x, y, w, size, mat, color );
//	DrawMaterial( x, y + h - size, w, size, mat, color );
//}
//
//
//void idDeviceContext::SetCursor(int n) {
//	cursor = (n < CURSOR_ARROW || n >= CURSOR_COUNT) ? CURSOR_ARROW : n;
//}
//
//void idDeviceContext::DrawCursor(float *x, float *y, float size) {
//	if (*x < 0) {
//		*x = 0;
//	}
//
//	if (*x >= this.vidWidth) {
//		*x = this.vidWidth;
//	}
//
//	if (*y < 0) {
//		*y = 0;
//	}
//
//	if (*y >= this.vidHeight) {
//		*y = this.vidHeight;
//	}
//
//	renderSystem.SetColor(colorWhite);
//	AdjustCoords(x, y, &size, &size);
//	DrawStretchPic( *x, *y, size, size, 0, 0, 1, 1, cursorImages[cursor]);
//}
///*
// =======================================================================================================================
// =======================================================================================================================
// */
//
//void idDeviceContext::PaintChar(float x,float y,float width,float height,float scale,float	s,float	t,float	s2,float t2,const idMaterial *hShader) {
//	float	w, h;
//	w = width * scale;
//	h = height * scale;
//
//	if (ClippedCoords(&x, &y, &w, &h, &s, &t, &s2, &t2)) {
//		return;
//	}
//
//	AdjustCoords(&x, &y, &w, &h);
//	DrawStretchPic(x, y, w, h, s, t, s2, t2, hShader);
//}


	SetFontByScale ( /*float */scale: number ): void {
		if ( scale <= this.gui_smallFontLimit.GetFloat ( ) ) {
			this.useFont = this.activeFont.fontInfoSmall;
			this.activeFont.maxHeight = this.activeFont.maxHeightSmall;
			this.activeFont.maxWidth = this.activeFont.maxWidthSmall;
		} else if ( scale <= this.gui_mediumFontLimit.GetFloat ( ) ) {
			this.useFont = this.activeFont.fontInfoMedium;
			this.activeFont.maxHeight = this.activeFont.maxHeightMedium;
			this.activeFont.maxWidth = this.activeFont.maxWidthMedium;
		} else {
			this.useFont = this.activeFont.fontInfoLarge;
			this.activeFont.maxHeight = this.activeFont.maxHeightLarge;
			this.activeFont.maxWidth = this.activeFont.maxWidthLarge;
		}
	}
	//= -1, bool calcOnly = false, idList<int> *breaks = NULL, int limit = 0 
	DrawText ( /*float */x: number, /*float */y: number, /*float */scale: number, color: idVec4, text: string, /*float*/ adjust: number, /*int */limit: number, /*int */style: number, /*int */cursor: number = -1): number {
		todoThrow ( );
		var /*int*/len: number, count: number;
//	idVec4		newColor;
//	const glyphInfo_t *glyph;
//	float		useScale;
//	SetFontByScale(scale);
//	useScale = scale * this.useFont.glyphScale;
//	count = 0;
//	if ( text && color.w != 0.0 ) {
//		const unsigned char	*s = (const unsigned char*)text;
//		renderSystem.SetColor(color);
//		memcpy(&newColor[0], &color[0], sizeof(idVec4));
//		len = strlen(text);
//		if (limit > 0 && len > limit) {
//			len = limit;
//		}
//
//		while (s && *s && count < len) {
//			if ( *s < GLYPH_START || *s > GLYPH_END ) {
//				s++;
//				continue;
//			}
//			glyph = &this.useFont.glyphs[*s];
//
//			//
//			// int yadj = Assets.textFont.glyphs[text[i]].bottom +
//			// Assets.textFont.glyphs[text[i]].top; float yadj = scale *
//			// (Assets.textFont.glyphs[text[i]].imageHeight -
//			// Assets.textFont.glyphs[text[i]].height);
//			//
//			if ( idStr::IsColor((const char*)s) ) {
//				if ( *(s+1) == C_COLOR_DEFAULT ) {
//					newColor = color;
//				} else {
//					newColor = idStr::ColorForIndex( *(s+1) );
//					newColor[3] = color[3];
//				}
//				if (cursor == count || cursor == count+1) {
//					float partialSkip = ((glyph.xSkip * useScale) + adjust) / 5.0f;
//					if ( cursor == count ) {
//						partialSkip *= 2.0f;
//					} else {
//						renderSystem.SetColor(newColor);
//					}
//					this.DrawEditCursor(x - partialSkip, y, scale);
//				}
//				renderSystem.SetColor(newColor);
//				s += 2;
//				count += 2;
//				continue;
//			} else {
//				float yadj = useScale * glyph.top;
//				PaintChar(x,y - yadj,glyph.imageWidth,glyph.imageHeight,useScale,glyph.s,glyph.t,glyph.s2,glyph.t2,glyph.glyph);
//
//				if (cursor == count) {
//					this.DrawEditCursor(x, y, scale);
//				}
//				x += (glyph.xSkip * useScale) + adjust;
//				s++;
//				count++;
//			}
//		}
//		if (cursor == len) {
//			this.DrawEditCursor(x, y, scale);
//		}
//	}
		return count;
	}

	SetSize ( /*float */width: number, /*float */height: number ): void {
		this.vidWidth = VIRTUAL_WIDTH;
		this.vidHeight = VIRTUAL_HEIGHT;
		this.xScale = this.yScale = 0.0;
		if ( width != 0.0 && height != 0.0 ) {
			this.xScale = this.vidWidth * ( 1.0 / width );
			this.yScale = this.vidHeight * ( 1.0 / height );
		}
	}

	CharWidth ( /*const char */c: string, /*float */scale: number ): number /*int*/ {
		var glyph: glyphInfo_t;
		var /*float		*/useScale: number;
		this.SetFontByScale( scale );
		var font = this.useFont;
		useScale = scale * font.glyphScale;
		glyph = font.glyphs[ /*(const unsigned char)*/c.charCodeAt( 0 )];
		return idMath.FtoiFast( glyph.xSkip * useScale );
	}

	/*int*/
	TextWidth ( text: string, /*float */scale: number, /*int */limit: number ): number {
		todoThrow ( );
		return -999999999999999999999999;


		//int i, width;

		//SetFontByScale( scale );
		//const glyphInfo_t *glyphs = this.useFont.glyphs;

		//if ( text == NULL ) {
		//	return 0;
		//}

		//width = 0;
		//if ( limit > 0 ) {
		//	for ( i = 0; text[i] != '\0' && i < limit; i++ ) {
		//		if ( idStr::IsColor( text + i ) ) {
		//			i++;
		//		} else {
		//			width += glyphs[((const unsigned char *)text)[i]].xSkip;
		//		}
		//	}
		//} else {
		//	for ( i = 0; text[i] != '\0'; i++ ) {
		//		if ( idStr::IsColor( text + i ) ) {
		//			i++;
		//		} else {
		//			width += glyphs[((const unsigned char *)text)[i]].xSkip;
		//		}
		//	}
		//}
		//return idMath.FtoiFast( scale * this.useFont.glyphScale * width );}
	}

//int idDeviceContext::TextHeight(text:string, float scale, int limit) {
//	int			len, count;
//	float		max;
//	glyphInfo_t *glyph;
//	float		useScale;
//	const char	*s = text;
//	SetFontByScale(scale);
//	fontInfo_t	*font = this.useFont;
//
//	useScale = scale * font.glyphScale;
//	max = 0;
//	if (text) {
//		len = strlen(text);
//		if (limit > 0 && len > limit) {
//			len = limit;
//		}
//
//		count = 0;
//		while (s && *s && count < len) {
//			if ( idStr::IsColor(s) ) {
//				s += 2;
//				continue;
//			}
//			else {
//				glyph = &font.glyphs[*(const unsigned char*)s];
//				if (max < glyph.height) {
//					max = glyph.height;
//				}
//
//				s++;
//				count++;
//			}
//		}
//	}
//
//	return idMath.FtoiFast( max * useScale );
//}

	MaxCharWidth ( /*float*/ scale: number ): number /*int*/ {
		this.SetFontByScale( scale );
		var /*float */useScale = scale * this.useFont.glyphScale;
		return idMath.FtoiFast( this.activeFont.maxWidth * useScale );
	}

	MaxCharHeight ( /*float*/ scale: number ): number /*int*/ {
		this.SetFontByScale( scale );
		var /*float */useScale = scale * this.useFont.glyphScale;
		return idMath.FtoiFast( this.activeFont.maxHeight * useScale );
	}

//const idMaterial *idDeviceContext::GetScrollBarImage(int index) {
//	if (index >= SCROLLBAR_HBACK && index < SCROLLBAR_COUNT) {
//		return scrollBarImages[index];
//	}
//	return scrollBarImages[SCROLLBAR_HBACK];
//}
//
//// this only supports left aligned text
//idRegion *idDeviceContext::GetTextRegion(text:string, float textScale, idRectangle rectDraw, float xStart, float yStart) {
//#if 0
//	const char	*p, *textPtr, *newLinePtr;
//	char		buff[1024];
//	int			len, textWidth, newLine, newLineWidth;
//	float		y;
//
//	float charSkip = MaxCharWidth(textScale) + 1;
//	float lineSkip = MaxCharHeight(textScale);
//
//	textWidth = 0;
//	newLinePtr = NULL;
//#endif
//	return NULL;
///*
//	if (text == NULL) {
//		return;
//	}
//
//	textPtr = text;
//	if (*textPtr == '\0') {
//		return;
//	}
//
//	y = lineSkip + rectDraw.y + yStart; 
//	len = 0;
//	buff[0] = '\0';
//	newLine = 0;
//	newLineWidth = 0;
//	p = textPtr;
//
//	textWidth = 0;
//	while (p) {
//		if (*p == ' ' || *p == '\t' || *p == '\n' || *p == '\0') {
//			newLine = len;
//			newLinePtr = p + 1;
//			newLineWidth = textWidth;
//		}
//
//		if ((newLine && textWidth > rectDraw.w) || *p == '\n' || *p == '\0') {
//			if (len) {
//
//				float x = rectDraw.x ;
//				
//				buff[newLine] = '\0';
//				DrawText(x, y, textScale, color, buff, 0, 0, 0);
//				if (!wrap) {
//					return;
//				}
//			}
//
//			if (*p == '\0') {
//				break;
//			}
//
//			y += lineSkip + 5;
//			p = newLinePtr;
//			len = 0;
//			newLine = 0;
//			newLineWidth = 0;
//			continue;
//		}
//
//		buff[len++] = *p++;
//		buff[len] = '\0';
//		textWidth = TextWidth( buff, textScale, -1 );
//	}
//*/
//}
//
	DrawEditCursor ( /*float */x: number, /*float */y: number, /*float*/ scale: number ): void {
		todoThrow ( );
		//if ( (int)( com_ticNumber >> 4 ) & 1 ) {
		//	return;
		//}
		//SetFontByScale(scale);
		//float useScale = scale * this.useFont.glyphScale;
		//const glyphInfo_t *glyph2 = &this.useFont.glyphs[(overStrikeMode) ? '_' : '|'];
		//float	yadj = useScale * glyph2.top;
		//PaintChar(x, y - yadj,glyph2.imageWidth,glyph2.imageHeight,useScale,glyph2.s,glyph2.t,glyph2.s2,glyph2.t2,glyph2.glyph);
	}

	DrawText_text ( text: string, /*float */textScale: number, /*int */textAlign: number, color: idVec4, rectDraw: idRectangle, wrap: boolean, /*int */cursor: number = -1, calcOnly: boolean = false, /*idList<int> **/breaks: idList<number> = null, /*int */limit: number = 0 ): number /*int*/ {
		var p: number, textPtr: number, newLinePtr: number;
		var buff = new Uint8Array( 1024 );
		var len: number, newLine: number, newLineWidth: number, count: number; //int			
		var y: number; //float		
		var textWidth: number; //float		

		var charSkip = this.MaxCharWidth( textScale ) + 1; //	float		
		var lineSkip = this.MaxCharHeight( textScale ); //	float		

		var cursorSkip = ( cursor >= 0 ? charSkip : 0 ); //float

		var lineBreak: boolean, wordBreak: boolean;

		this.SetFontByScale( textScale );

		textWidth = 0;
		newLinePtr = NULL;

		if ( !calcOnly && !( text /*&& *text*/ ) ) {
			if ( cursor == 0 ) {
				renderSystem.SetColor( color );
				this.DrawEditCursor( rectDraw.x, lineSkip + rectDraw.y, textScale );
			}
			return idMath.FtoiFast( rectDraw.w / charSkip );
		}

		textPtr = 0; //text;

		y = lineSkip + rectDraw.y;
		len = 0;
		buff[0] = 0; //'\0';
		newLine = 0;
		newLineWidth = 0;
		p = textPtr;

		if ( breaks ) {
			breaks.Append( 0 );
		}
		count = 0;
		textWidth = 0;
		lineBreak = false;
		wordBreak = false;
		while ( p ) {

			if ( text[p] == '\n' || text[p] == '\r' || text[p] == '\0' ) {
				lineBreak = true;
				if ( ( text[p] == '\n' && text[p + 1] == '\r' ) || ( text[p] == '\r' && text[p + 1] == '\n' ) ) {
					p++;
				}
			}

			var /*int */nextCharWidth = ( idStr.CharIsPrintable( text[p] ) ? this.CharWidth( text[p], textScale ) : cursorSkip );
			// FIXME: this is a temp hack until the guis can be fixed not not overflow the bounding rectangles
			//		  the side-effect is that list boxes and edit boxes will draw over their scroll bars
			//	The following line and the !linebreak in the if statement below should be removed
			nextCharWidth = 0;

			if ( !lineBreak && ( textWidth + nextCharWidth ) > rectDraw.w ) {
				// The next character will cause us to overflow, if we haven't yet found a suitable
				// break spot, set it to be this character
				if ( len > 0 && newLine == 0 ) {
					newLine = len;
					newLinePtr = p;
					newLineWidth = textWidth;
				}
				wordBreak = true;
			} else if ( lineBreak || ( wrap && ( text[p] == ' ' || text[p] == '\t' ) ) ) {
				// The next character is in view, so if we are a break character, store our position
				newLine = len;
				newLinePtr = p + 1;
				newLineWidth = textWidth;
			}

			if ( lineBreak || wordBreak ) {
				var /*float */x = rectDraw.x;

				if ( textAlign == ALIGN_RIGHT ) {
					x = rectDraw.x + rectDraw.w - newLineWidth;
				} else if ( textAlign == ALIGN_CENTER ) {
					x = rectDraw.x + ( rectDraw.w - newLineWidth ) / 2;
				}

				if ( wrap || newLine > 0 ) {
					buff[newLine] = 0; //'\0';

					// This is a special case to handle breaking in the middle of a word.
					// if we didn't do this, the cursor would appear on the end of this line
					// and the beginning of the next.
					if ( wordBreak && cursor >= newLine && newLine == len ) {
						cursor++;
					}
				}

				if ( !calcOnly ) {
					count += this.DrawText( x, y, textScale, color, buff.toString ( ), 0, 0, 0, cursor );
				}

				if ( cursor < newLine ) {
					cursor = -1;
				} else if ( cursor >= 0 ) {
					cursor -= ( newLine + 1 );
				}

				if ( !wrap ) {
					return newLine;
				}

				if ( ( limit && count > limit ) || text[p] == '\0' ) {
					break;
				}

				y += lineSkip + 5;

				if ( !calcOnly && y > rectDraw.Bottom ( ) ) {
					break;
				}

				p = newLinePtr;

				if ( breaks ) {
					breaks.Append( p /*- text*/ );
				}

				len = 0;
				newLine = 0;
				newLineWidth = 0;
				textWidth = 0;
				lineBreak = false;
				wordBreak = false;
				continue;
			}

			buff[len++] = p++;
			buff[len] = 0; //'\0';
			// update the width
			if ( /***/( buff[len - 1] ) != C_COLOR_ESCAPE.charCodeAt( 0 ) && ( len <= 1 || buff[len - 2] != C_COLOR_ESCAPE.charCodeAt( 0 ) ) ) {
				textWidth += textScale * this.useFont.glyphScale * this.useFont.glyphs[ /*(const unsigned char)*( */buff[len - 1]].xSkip;
			}
		}

		return idMath.FtoiFast( rectDraw.w / charSkip );
	}


};


///*
//=============
//idRectangle::String
//=============
//*/
//char *idRectangle::String( void ) const {
//	static	int		index = 0;
//	static	char	str[ 8 ][ 48 ];
//	char	*s;
//
//	// use an array so that multiple toString's won't collide
//	s = str[ index ];
//	index = (index + 1)&7;
//
//	sprintf( s, "%.2f %.2f %.2f %.2f", x, y, w, h );
//
//	return s;
//}
