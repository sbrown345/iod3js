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
////// included for image uploading for player stat graph
////#include "../renderer/Image.h"
////
////#include "DeviceContext.h"
////#include "Window.h"
////#include "UserInterfaceLocal.h"
////#include "MarkerWindow.h"
////
class markerData_t {
////	int time;
////	const idMaterial *mat;
////	idRectangle rect;
}

class idMarkerWindow extends idWindow {
////public:
////	idMarkerWindow(idUserInterfaceLocal *gui);
////	idMarkerWindow(idDeviceContext *d, idUserInterfaceLocal *gui);
////	virtual ~idMarkerWindow();
////	virtual size_t Allocated(){ return idWindow::Allocated(); };
////	virtual idWinVar *GetWinVarByName(_name:string, bool winLookup = false);
////
////	virtual const char *HandleEvent(const sysEvent_t *event, bool *updateVisuals);
////	virtual void PostParse();
////	virtual void Draw(int time, float x, float y);
////	virtual const char *RouteMouseCoords(float xd, float yd);
////	virtual void		Activate(bool activate, idStr &act);
////	virtual void MouseExit();
////	virtual void MouseEnter();
////
////
////private:
////	virtual bool ParseInternalVar(const char *name, idParser *src);
////	void CommonInit();
////	void Line(int x1, int y1, int x2, int y2, dword* out, dword color);
////	void Point(int x, int y, dword *out, dword color);
////	logStats_t loggedStats[MAX_LOGGED_STATS];
	markerTimes = new idList<markerData_t>(markerData_t);
	statData = new idStr;
	numStats:number/*int*/;
	imageBuff: Uint32Array; //dword *
	markerMat: idMaterial;
	markerStop: idMaterial;
	markerColor = new idVec4 ;
	currentMarker:number/*int*/;
	currentTime:number/*int*/;
	stopTime:number/*int*/;
////
	CommonInit ( ): void {
		this.numStats = 0;
		this.currentTime = -1;
		this.currentMarker = -1;
		this.stopTime = -1;
		this.imageBuff = null;
		this.markerMat = null;
		this.markerStop = null;
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

	ParseInternalVar(_name: string, src: idParser): boolean {
		todoThrow ( );
////	if (idStr.Icmp(_name, "markerMat") == 0) {
////		idStr str;
////		ParseString(src, str);
////		markerMat = declManager.FindMaterial(str);
////		markerMat.SetSort( materialSort_t.SS_GUI );
////		return true;
////	}
////	if (idStr.Icmp(_name, "markerStop") == 0) {
////		idStr str;
////		ParseString(src, str);
////		markerStop = declManager.FindMaterial(str);
////		markerStop.SetSort( materialSort_t.SS_GUI );
////		return true;
////	}
////	if (idStr.Icmp(_name, "markerColor") == 0) {
////		ParseVec4(src, markerColor);
////		return true;
////	}
		return super.ParseInternalVar( _name, src );
	}

	GetWinVarByName ( _name: string, fixup: boolean = false/*owner: R<drawWin_t> = null */ ): idWinVar {
		return super.GetWinVarByName( _name, fixup );
	}

	HandleEvent ( event: sysEvent_t, /*bool **/updateVisuals: R<boolean> ): string {
		todoThrow ( );
////	if (!(event.evType == SE_KEY && event.evValue2)) {
////		return "";
////	}
////
////	int key = event.evValue;
////	if (event.evValue2 && key == K_MOUSE1) {
////		gui.GetDesktop().SetChildWinVarVal("markerText", "text", "");
////		idRectangle r;
////		int c = markerTimes.Num();
////		int i;
////		for (i = 0; i < c; i++) {
////			markerData_t &md = markerTimes[i];
////			if (md.rect.Contains(gui.CursorX(), gui.CursorY())) {
////				currentMarker = i;
////				gui.SetStateInt( "currentMarker", md.time );
////				stopTime = md.time;
////				gui.GetDesktop().SetChildWinVarVal("markerText", "text", va("Marker set at %.2i:%.2i", md.time / 60 / 60, (md.time / 60) % 60));
////				gui.GetDesktop().SetChildWinVarVal("markerText", "visible", "1");
////				gui.GetDesktop().SetChildWinVarVal("markerBackground", "matcolor", "1 1 1 1");
////				gui.GetDesktop().SetChildWinVarVal("markerBackground", "text", "");
////				gui.GetDesktop().SetChildWinVarVal("markerBackground", "background", md.mat.GetName());
////				break;
////			}
////		}
////		if ( i == c ) {
////			// no marker selected;
////			currentMarker = -1;
////			gui.SetStateInt( "currentMarker", currentTime );
////			stopTime = currentTime;
////			gui.GetDesktop().SetChildWinVarVal("markerText", "text", va("Marker set at %.2i:%.2i", currentTime / 60 / 60, (currentTime / 60) % 60));
////			gui.GetDesktop().SetChildWinVarVal("markerText", "visible", "1");
////			gui.GetDesktop().SetChildWinVarVal("markerBackground", "matcolor", "0 0 0 0");
////			gui.GetDesktop().SetChildWinVarVal("markerBackground", "text", "No Preview");
////		}
////		float pct = gui.State().GetFloat( "loadPct" );
////		int len = gui.State().GetInt( "loadLength" );
////		if (stopTime > len * pct) {
////			return "cmdDemoGotoMarker";
////		}
////	} else if (key == K_MOUSE2) {
////		stopTime = -1;
////		gui.GetDesktop().SetChildWinVarVal("markerText", "text", "");
////		gui.SetStateInt( "currentMarker", -1 );
////		return "cmdDemoGotoMarker";
////	} else if (key == K_SPACE) {
////		return "cmdDemoPauseFrame";
////	}
////
		return "";
	}

	PostParse ( ): void {
		super.PostParse ( );
	}

////static const int HEALTH_MAX = 100;
////static const int COMBAT_MAX = 100;
////static const int RATE_MAX = 125;
////static const int STAMINA_MAX = 12;
	Draw ( /*int*/ time: number, /*float */x: number, /*float */y: number ): void {
		todoThrow ( );
////	float pct;
////	idRectangle r = clientRect;
////	int len = gui.State().GetInt( "loadLength" );
////	if (len == 0) {
////		len = 1;
////	}
////	if (numStats > 1) {
////		int c = markerTimes.Num();
////		if (c > 0) {
////			for (int i = 0; i < c; i++) {
////				markerData_t &md = markerTimes[i];
////				if (md.rect.w == 0) {
////					md.rect.x = (r.x + r.w * ((float)md.time / len)) - 8;
////					md.rect.y = r.y + r.h - 20;
////					md.rect.w = 16;
////					md.rect.h = 16;
////				}
////				dc.DrawMaterial(md.rect.x, md.rect.y, md.rect.w, md.rect.h, markerMat, markerColor);
////			}
////		}
////	}
////
////	r.y += 10;
////	if (r.w > 0 && r.Contains(gui.CursorX(), gui.CursorY())) {
////		pct = (gui.CursorX() - r.x) / r.w;
////		currentTime = len * pct;
////		r.x = (gui.CursorX() > r.x + r.w - 40) ? gui.CursorX() - 40 : gui.CursorX();
////		r.y = gui.CursorY() - 15;
////		r.w = 40;
////		r.h = 20;
////		dc.DrawText(va("%.2i:%.2i", currentTime / 60 / 60, (currentTime / 60) % 60), 0.25, 0, idDeviceContext::colorWhite, r, false);
////	}
////
////	if (stopTime >= 0 && markerStop) {
////		r = clientRect;
////		r.y += (r.h - 32) / 2;
////		pct = (float)stopTime / len;
////		r.x += (r.w * pct) - 16;
////		idVec4 color(1, 1, 1, 0.65f);
////		dc.DrawMaterial(r.x, r.y, 32, 32, markerStop, color);
////	}
////
	}
////
////
////
////const char *idMarkerWindow::RouteMouseCoords(float xd, float yd) {
////	const char * ret = idWindow::RouteMouseCoords(xd, yd);
////	idRectangle r;
////	int i, c = markerTimes.Num();
////	int len = gui.State().GetInt( "loadLength" );
////	if (len == 0) {
////		len = 1;
////	}
////	for (i = 0; i < c; i++) {
////		markerData_t &md = markerTimes[i];
////		if (md.rect.Contains(gui.CursorY(), gui.CursorX())) {
////			gui.GetDesktop().SetChildWinVarVal("markerBackground", "background", md.mat.GetName());
////			gui.GetDesktop().SetChildWinVarVal("markerBackground", "matcolor", "1 1 1 1");
////			gui.GetDesktop().SetChildWinVarVal("markerBackground", "text", "");
////			break;
////		}
////	}
////
////	if (i >= c) {
////		if (currentMarker == -1) {
////			gui.GetDesktop().SetChildWinVarVal("markerBackground", "matcolor", "0 0 0 0");
////			gui.GetDesktop().SetChildWinVarVal("markerBackground", "text", "No Preview");
////		} else {
////			markerData_t &md = markerTimes[currentMarker];
////			gui.GetDesktop().SetChildWinVarVal("markerBackground", "background", md.mat.GetName());
////			gui.GetDesktop().SetChildWinVarVal("markerBackground", "matcolor", "1 1 1 1");
////			gui.GetDesktop().SetChildWinVarVal("markerBackground", "text", "");
////		}
////	}
////	return ret;
////}
////
////void idMarkerWindow::Point(int x, int y, dword *out, dword color) {
////	int index = (63-y) * 512 + x;
////	if (index >= 0 && index < 512 * 64) {
////		out[index] = color;
////	} else {
////		common.Warning("Out of bounds on point %i : %i", x, y);
////	}
////}
////
////void idMarkerWindow::Line(int x1, int y1, int x2, int y2, dword* out, dword color) {
////	int deltax = abs(x2 - x1);
////	int deltay = abs(y2 - y1);
////	int incx = (x1 > x2) ? -1 : 1;
////	int incy = (y1 > y2) ? -1 : 1;
////	int right, up, dir;
////	if (deltax > deltay) {
////		right = deltay * 2;
////		up = right - deltax * 2;
////		dir = right - deltax;
////		while (deltax-- >= 0) {
////			Point(x1, y1, out, color);
////			x1 += incx;
////			y1 += (dir > 0) ? incy : 0;
////			dir += (dir > 0) ? up : right;
////		}
////	} else {
////		right = deltax * 2;
////		up = right - deltay * 2;
////		dir = right - deltay;
////		while ( deltay-- >= 0) {
////			Point(x1, y1, out, color);
////			x1 += (dir > 0) ? incx : 0;
////			y1 += incy;
////			dir += (dir > 0) ? up : right;
////		}
////	}
////}
////
////
	Activate ( activate: boolean, act: idStr ): void {
		todoThrow ( );
////	idWindow::Activate(activate, act);
////	if (activate) {
////		int i;
////		gui.GetDesktop().SetChildWinVarVal("markerText", "text", "");
////		imageBuff = (dword*)Mem_Alloc(512*64*4);
////		markerTimes.Clear();
////		currentMarker = -1;
////		currentTime = -1;
////		stopTime = -1;
////		statData = gui.State().GetString( "statData" );
////		numStats = 0;
////		if (statData.Length()) {
////			idFile *file = fileSystem.OpenFileRead(statData);
////			if (file) {
////				file.Read(&numStats, sizeof(numStats));
////				file.Read(loggedStats, numStats * sizeof(loggedStats[0]));
////				for (i = 0; i < numStats; i++) {
////					if (loggedStats[i].health < 0) {
////						loggedStats[i].health = 0;
////					}
////					if (loggedStats[i].stamina < 0) {
////						loggedStats[i].stamina = 0;
////					}
////					if (loggedStats[i].heartRate < 0) {
////						loggedStats[i].heartRate = 0;
////					}
////					if (loggedStats[i].combat < 0) {
////						loggedStats[i].combat = 0;
////					}
////				}
////				fileSystem.CloseFile(file);
////			}
////		}
////
////		if (numStats > 1 && background) {
////			idStr markerPath = statData;
////			markerPath.StripFilename();
////			idFileList *markers;
////			markers = fileSystem.ListFiles( markerPath, ".tga", false, true );
////			idStr name;
////			for ( i = 0; i < markers.GetNumFiles(); i++ ) {
////				name = markers.GetFile( i );
////				markerData_t md;
////				md.mat = declManager.FindMaterial( name );
////				md.mat.SetSort( materialSort_t.SS_GUI );
////				name.StripPath();
////				name.StripFileExtension();
////				md.time = atoi(name);
////				markerTimes.Append(md);
////			}
////			fileSystem.FreeFileList( markers );
////			memset(imageBuff, 0, 512*64*4);
////			float step = 511.0f / (numStats - 1);
////			float startX = 0;
////			float x1, y1, x2, y2;
////			x1 = 0 - step;
////			for (i = 0; i < numStats-1; i++) {
////				x1 += step;
////				x2 = x1 + step;
////				y1 = 63 * ((float)loggedStats[i].health / HEALTH_MAX);
////				y2 = 63 * ((float)loggedStats[i+1].health / HEALTH_MAX);
////				Line(x1, y1, x2, y2, imageBuff, 0xff0000ff);
////				y1 = 63 * ((float)loggedStats[i].heartRate / RATE_MAX);
////				y2 = 63 * ((float)loggedStats[i+1].heartRate / RATE_MAX);
////				Line(x1, y1, x2, y2, imageBuff, 0xff00ff00);
////				// stamina not quite as high on graph so health does not get obscured with both at 100%
////				y1 = 62 * ((float)loggedStats[i].stamina / STAMINA_MAX);
////				y2 = 62 * ((float)loggedStats[i+1].stamina / STAMINA_MAX);
////				Line(x1, y1, x2, y2, imageBuff, 0xffff0000);
////				y1 = 63 * ((float)loggedStats[i].combat / COMBAT_MAX);
////				y2 = 63 * ((float)loggedStats[i+1].combat / COMBAT_MAX);
////				Line(x1, y1, x2, y2, imageBuff, 0xff00ffff);
////			}
////			const shaderStage_t *stage = background.GetStage(0);
////			if (stage) {
////				stage.texture.image.UploadScratch((byte*)imageBuff, 512, 64);			
////			}
////			Mem_Free(imageBuff);
////		}
////	}
	}

////void idMarkerWindow::MouseExit() {
////	idWindow::MouseExit();
////}
////
////void idMarkerWindow::MouseEnter() {
////	idWindow::MouseEnter();
////}
	}