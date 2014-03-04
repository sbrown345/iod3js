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
////#ifndef __SIMPLEWIN_H__
////#define __SIMPLEWIN_H__
////
////class idUserInterfaceLocal;
////class idDeviceContext;
////class idSimpleWindow;

class drawWin_t {
	win:idWindow;
	simp:idSimpleWindow ;
}

class idSimpleWindow {
	static size = 540;
	////	friend class idWindow;
	////public:
	////					idSimpleWindow(idWindow* win);
	////	virtual			~idSimpleWindow();
	////	void			Redraw(float x, float y);
	////	void			StateChanged( bool redraw );
	////
	name = new idStr;
	////
	////	idWinVar *		GetWinVarByName(const char *_name);
	////	int				GetWinVarOffset( idWinVar *wv, drawWin_t* owner);
	////	size_t			Size();
	////
	////	idWindow*		GetParent ( void ) { return this.mParent; }
	////
	////	virtual void	WriteToSaveGame( idFile *savefile );
	////	virtual void	ReadFromSaveGame( idFile *savefile );
	////
	////protected:
	////	void 			CalcClientRect(float xofs, float yofs);
	////	void 			SetupTransforms(float x, float y);
	////	void 			DrawBackground(const idRectangle &drawRect);
	////	void 			DrawBorderAndCaption(const idRectangle &drawRect);
	
		gui:idUserInterfaceLocal;
		dc:idDeviceContext;
		flags:number/*int*/;
		drawRect = new idRectangle;			// overall rect
		clientRect = new idRectangle;			// client area
		textRect = new idRectangle;
		origin = new idVec2;
		fontNum:number/*int*/;
		matScalex:number/*float*/;
		matScaley:number/*float*/;
		borderSize:number/*float*/;
		textAlign:number/*int*/;
		textAlignx:number/*float*/;
		textAligny:number/*float*/;
		textShadow:number/*int*/;
	
		text = new idWinStr;
		visible = new idWinBool;
		rect = new idWinRectangle;				// overall rect
		backColor = new idWinVec4;
		matColor = new idWinVec4;
		foreColor = new idWinVec4;
		borderColor = new idWinVec4;
		textScale = new idWinFloat;
		rotate = new idWinFloat;
		shear = new idWinVec2;
		backGroundName = new idWinBackground;
	
		background:idMaterial;
		
		mParent:idWindow;
	
		hideCursor = new idWinBool;
	////};
	////
	////#endif /* !__SIMPLEWIN_H__ */
	////
	////
	////
	constructor(win: idWindow) {
		this.gui = win.GetGui();
		this.dc = win.dc;
		this.drawRect = win.drawRect;
		this.clientRect = win.clientRect;
		this.textRect = win.textRect;
		this.origin = win.origin;
		this.fontNum = win.fontNum;
		this.name = win.name;
		this.matScalex = win.matScalex;
		this.matScaley = win.matScaley;
		this.borderSize = win.borderSize;
		this.textAlign = win.textAlign;
		this.textAlignx = win.textAlignx;
		this.textAligny = win.textAligny;
		this.background = win.background;
		this.flags = win.flags;
		this.textShadow = win.textShadow;
	
		this.visible = win.visible;
		this.text = win.text;
		this.rect = win.rect;
		this.backColor = win.backColor;
		this.matColor = win.matColor;
		this.foreColor = win.foreColor;
		this.borderColor = win.borderColor;
		this.textScale = win.textScale;
		this.rotate = win.rotate;
		this.shear.equalsVec2(win.shear);
		this.backGroundName = win.backGroundName;
		if (this.backGroundName.Length()) {
			this.background = declManager.FindMaterial(this.backGroundName.data.data);
			this.background.SetSort(materialSort_t.SS_GUI);
			this.background.SetImageClassifications(1);	// just for resource tracking
		}
		this.backGroundName.SetMaterialPtr(this.background);
	
		// 
		//  added parent
		this.mParent = win.GetParent();
		// 
	
		this.hideCursor = win.hideCursor;
	
		var parent = win.GetParent();
		if (parent) {
			if (this.text.NeedsUpdate()) {
				parent.AddUpdateVar(this.text);
			}
			if (this.visible.NeedsUpdate()) {
				parent.AddUpdateVar(this.visible);
			}
			if (this.rect.NeedsUpdate()) {
				parent.AddUpdateVar(this.rect);
			}
			if (this.backColor.NeedsUpdate()) {
				parent.AddUpdateVar(this.backColor);
			}
			if (this.matColor.NeedsUpdate()) {
				parent.AddUpdateVar(this.matColor);
			}
			if (this.foreColor.NeedsUpdate()) {
				parent.AddUpdateVar(this.foreColor);
			}
			if (this.borderColor.NeedsUpdate()) {
				parent.AddUpdateVar(this.borderColor);
			}
			if (this.textScale.NeedsUpdate()) {
				parent.AddUpdateVar(this.textScale);
			}
			if (this.rotate.NeedsUpdate()) {
				parent.AddUpdateVar(this.rotate);
			}
			if (this.shear.NeedsUpdate()) {
				parent.AddUpdateVar(this.shear);
			}
			if (this.backGroundName.NeedsUpdate()) {
				parent.AddUpdateVar(this.backGroundName);
			}
		}
	}
	
	////idSimpleWindow::~idSimpleWindow() {
	////
	////}
	////
	////void idSimpleWindow::StateChanged(bool redraw) {
	////	if (redraw && this.background && this.background.CinematicLength()) {
	////		this.background.UpdateCinematic(gui.GetTime());
	////	}
	////}
	////
	////void idSimpleWindow::SetupTransforms(float x, float y) {
	////	static idMat3 trans;
	////	static idVec3 org;
	////
	////	trans.Identity();
	////	org.Set(origin.x + x, origin.y + y, 0);
	////	if (this.rotate) {
	////		static idRotation rot;
	////		static idVec3 vec(0, 0, 1);
	////		rot.Set(org, vec, this.rotate);
	////		trans = rot.ToMat3();
	////	}
	////
	////	static idMat3 smat;
	////	smat.Identity();
	////	if (this.shear.x() || this.shear.y()) {
	////		smat[0][1] = this.shear.x();
	////		smat[1][0] = this.shear.y();
	////		trans *= smat;
	////	}
	////
	////	if (!trans.IsIdentity()) {
	////		dc.SetTransformInfo(org, trans);
	////	}
	////}
	////
	////void idSimpleWindow::DrawBackground(const idRectangle &drawRect) {
	////	if (this.backColor.w() > 0) {
	////		dc.DrawFilledRect(drawRect.x, drawRect.y, drawRect.w, drawRect.h, this.backColor);
	////	}
	////
	////	if (this.background) {
	////		if (this.matColor.w() > 0) {
	////			float scalex, scaley;
	////			if (flags & WIN_NATURALMAT) {
	////				scalex = drawRect.w / this.background.GetImageWidth();
	////				scaley = drawRect.h / this.background.GetImageHeight();
	////			}
	////			else {
	////				scalex = matScalex;
	////				scaley = matScaley;
	////			}
	////			dc.DrawMaterial(drawRect.x, drawRect.y, drawRect.w, drawRect.h, this.background, this.matColor, scalex, scaley);
	////		}
	////	}
	////}
	////
	////void idSimpleWindow::DrawBorderAndCaption(const idRectangle &drawRect) {
	////	if (flags & WIN_BORDER) {
	////		if (borderSize) {
	////			dc.DrawRect(drawRect.x, drawRect.y, drawRect.w, drawRect.h, borderSize, this.borderColor);
	////		}
	////	}
	////}
	////
	////void idSimpleWindow::CalcClientRect(float xofs, float yofs) {
	////
	////	drawRect = this.rect;
	////
	////	if (flags & WIN_INVERTRECT) {
	////		drawRect.x = this.rect.x() - this.rect.w();
	////		drawRect.y = this.rect.y() - this.rect.h();
	////	}
	////
	////	drawRect.x += xofs;
	////	drawRect.y += yofs;
	////
	////	clientRect = drawRect;
	////	if (this.rect.h() > 0.0 && this.rect.w() > 0.0) {
	////
	////		if (flags & WIN_BORDER && borderSize != 0.0) {
	////			clientRect.x += borderSize;
	////			clientRect.y += borderSize;
	////			clientRect.w -= borderSize;
	////			clientRect.h -= borderSize;
	////		}
	////
	////		textRect = clientRect;
	////		textRect.x += 2.0;
	////		textRect.w -= 2.0;
	////		textRect.y += 2.0;
	////		textRect.h -= 2.0;
	////		textRect.x += textAlignx;
	////		textRect.y += textAligny;
	////
	////	}
	////	origin.Set(this.rect.x() + (this.rect.w() / 2), this.rect.y() + (this.rect.h() / 2));
	////
	////}
	////
	////
	////void idSimpleWindow::Redraw(float x, float y) {
	////
	////	if (!this.visible) {
	////		return;
	////	}
	////
	////	CalcClientRect(0, 0);
	////	dc.SetFont(fontNum);
	////	drawRect.Offset(x, y);
	////	clientRect.Offset(x, y);
	////	textRect.Offset(x, y);
	////	SetupTransforms(x, y);
	////	if (flags & WIN_NOCLIP) {
	////		dc.EnableClipping(false);
	////	}
	////	DrawBackground(drawRect);
	////	DrawBorderAndCaption(drawRect);
	////	if (textShadow) {
	////		idStr shadowText = this.text;
	////		idRectangle shadowRect = textRect;
	////
	////		shadowText.RemoveColors();
	////		shadowRect.x += textShadow;
	////		shadowRect.y += textShadow;
	////
	////		dc.DrawText(shadowText, this.textScale, textAlign, colorBlack, shadowRect, !(flags & WIN_NOWRAP), -1);
	////	}
	////	dc.DrawText(this.text, this.textScale, textAlign, this.foreColor, textRect, !(flags & WIN_NOWRAP), -1);
	////	dc.SetTransformInfo(vec3_origin, mat3_identity);
	////	if (flags & WIN_NOCLIP) {
	////		dc.EnableClipping(true);
	////	}
	////	drawRect.Offset(-x, -y);
	////	clientRect.Offset(-x, -y);
	////	textRect.Offset(-x, -y);
	////}
	////
	////int idSimpleWindow::GetWinVarOffset(idWinVar *wv, drawWin_t* owner) {
	////	int ret = -1;
	////
	////	if (wv == &this.rect) {
	////		ret = (int)&((idSimpleWindow *)0).rect;
	////	}
	////
	////	if (wv == &this.backColor) {
	////		ret = (int)&((idSimpleWindow *)0).backColor;
	////	}
	////
	////	if (wv == &this.matColor) {
	////		ret = (int)&((idSimpleWindow *)0).matColor;
	////	}
	////
	////	if (wv == &this.foreColor) {
	////		ret = (int)&((idSimpleWindow *)0).foreColor;
	////	}
	////
	////	if (wv == &this.borderColor) {
	////		ret = (int)&((idSimpleWindow *)0).borderColor;
	////	}
	////
	////	if (wv == &this.textScale) {
	////		ret = (int)&((idSimpleWindow *)0).textScale;
	////	}
	////
	////	if (wv == &this.rotate) {
	////		ret = (int)&((idSimpleWindow *)0).rotate;
	////	}
	////
	////	if (ret != -1) {
	////		owner.simp = this;
	////	}
	////	return ret;
	////}
	////
	GetWinVarByName ( _name: string ): idWinVar {
		var retVar: idWinVar = null;
		if ( idStr.Icmp( _name, "background" ) == 0 ) {
			retVar = this.backGroundName;
		}
		if ( idStr.Icmp( _name, "visible" ) == 0 ) {
			retVar = this.visible;
		}
		if ( idStr.Icmp( _name, "rect" ) == 0 ) {
			retVar = this.rect;
		}
		if ( idStr.Icmp( _name, "backColor" ) == 0 ) {
			retVar = this.backColor;
		}
		if ( idStr.Icmp( _name, "matColor" ) == 0 ) {
			retVar = this.matColor;
		}
		if ( idStr.Icmp( _name, "foreColor" ) == 0 ) {
			retVar = this.foreColor;
		}
		if ( idStr.Icmp( _name, "borderColor" ) == 0 ) {
			retVar = this.borderColor;
		}
		if ( idStr.Icmp( _name, "textScale" ) == 0 ) {
			retVar = this.textScale;
		}
		if ( idStr.Icmp( _name, "rotate" ) == 0 ) {
			retVar = this.rotate;
		}
		if ( idStr.Icmp( _name, "shear" ) == 0 ) {
			retVar = this.shear;
		}
		if ( idStr.Icmp( _name, "text" ) == 0 ) {
			retVar = this.text;
		}
		return retVar;
	}
	
	/////*
	////========================
	////idSimpleWindow::WriteToSaveGame
	////========================
	////*/
	////void idSimpleWindow::WriteToSaveGame(idFile *savefile) {
	////
	////	savefile.Write(&flags, sizeof(flags));
	////	savefile.Write(&drawRect, sizeof(drawRect));
	////	savefile.Write(&clientRect, sizeof(clientRect));
	////	savefile.Write(&textRect, sizeof(textRect));
	////	savefile.Write(&origin, sizeof(origin));
	////	savefile.Write(&fontNum, sizeof(fontNum));
	////	savefile.Write(&matScalex, sizeof(matScalex));
	////	savefile.Write(&matScaley, sizeof(matScaley));
	////	savefile.Write(&borderSize, sizeof(borderSize));
	////	savefile.Write(&textAlign, sizeof(textAlign));
	////	savefile.Write(&textAlignx, sizeof(textAlignx));
	////	savefile.Write(&textAligny, sizeof(textAligny));
	////	savefile.Write(&textShadow, sizeof(textShadow));
	////
	////	this.text.WriteToSaveGame(savefile);
	////	this.visible.WriteToSaveGame(savefile);
	////	this.rect.WriteToSaveGame(savefile);
	////	this.backColor.WriteToSaveGame(savefile);
	////	this.matColor.WriteToSaveGame(savefile);
	////	this.foreColor.WriteToSaveGame(savefile);
	////	this.borderColor.WriteToSaveGame(savefile);
	////	this.textScale.WriteToSaveGame(savefile);
	////	this.rotate.WriteToSaveGame(savefile);
	////	this.shear.WriteToSaveGame(savefile);
	////	this.backGroundName.WriteToSaveGame(savefile);
	////
	////	int stringLen;
	////
	////	if (this.background) {
	////		stringLen = strlen(this.background.GetName());
	////		savefile.Write(&stringLen, sizeof(stringLen));
	////		savefile.Write(this.background.GetName(), stringLen);
	////	}
	////	else {
	////		stringLen = 0;
	////		savefile.Write(&stringLen, sizeof(stringLen));
	////	}
	////
	////}
	////
	/////*
	////========================
	////idSimpleWindow::ReadFromSaveGame
	////========================
	////*/
	////void idSimpleWindow::ReadFromSaveGame(idFile *savefile) {
	////
	////	savefile.Read(&flags, sizeof(flags));
	////	savefile.Read(&drawRect, sizeof(drawRect));
	////	savefile.Read(&clientRect, sizeof(clientRect));
	////	savefile.Read(&textRect, sizeof(textRect));
	////	savefile.Read(&origin, sizeof(origin));
	////	savefile.Read(&fontNum, sizeof(fontNum));
	////	savefile.Read(&matScalex, sizeof(matScalex));
	////	savefile.Read(&matScaley, sizeof(matScaley));
	////	savefile.Read(&borderSize, sizeof(borderSize));
	////	savefile.Read(&textAlign, sizeof(textAlign));
	////	savefile.Read(&textAlignx, sizeof(textAlignx));
	////	savefile.Read(&textAligny, sizeof(textAligny));
	////	savefile.Read(&textShadow, sizeof(textShadow));
	////
	////	this.text.ReadFromSaveGame(savefile);
	////	this.visible.ReadFromSaveGame(savefile);
	////	this.rect.ReadFromSaveGame(savefile);
	////	this.backColor.ReadFromSaveGame(savefile);
	////	this.matColor.ReadFromSaveGame(savefile);
	////	this.foreColor.ReadFromSaveGame(savefile);
	////	this.borderColor.ReadFromSaveGame(savefile);
	////	this.textScale.ReadFromSaveGame(savefile);
	////	this.rotate.ReadFromSaveGame(savefile);
	////	this.shear.ReadFromSaveGame(savefile);
	////	this.backGroundName.ReadFromSaveGame(savefile);
	////
	////	int stringLen;
	////
	////	savefile.Read(&stringLen, sizeof(stringLen));
	////	if (stringLen > 0) {
	////		idStr backName;
	////
	////		backName.Fill(' ', stringLen);
	////		savefile.Read(&(backName)[0], stringLen);
	////
	////		this.background = declManager.FindMaterial(backName);
	////		this.background.SetSort(SS_GUI);
	////	}
	////	else {
	////		this.background = NULL;
	////	}
	////
	////}
	////
	////
	/////*
	////===============================
	////*/
	////
	////size_t idSimpleWindow::Size() {
	////	size_t sz = sizeof(*this);
	////	sz += this.name.Size();
	////	sz += this.text.Size();
	////	sz += this.backGroundName.Size();
	////	return sz;
	////}
}