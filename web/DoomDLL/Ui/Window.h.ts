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
////#ifndef __WINDOW_H__
////#define __WINDOW_H__
////
////#include "Rectangle.h"
////#include "DeviceContext.h"
////#include "RegExp.h"
////#include "Winvar.h"
////#include "GuiScript.h"
////#include "SimpleWindow.h"

var WIN_CHILD			= 0x00000001;
var WIN_CAPTION		= 0x00000002;
var WIN_BORDER		= 0x00000004;
var WIN_SIZABLE		= 0x00000008;
var WIN_MOVABLE		= 0x00000010;
var WIN_FOCUS			= 0x00000020;
var WIN_CAPTURE		= 0x00000040;
var WIN_HCENTER		= 0x00000080;
var WIN_VCENTER		= 0x00000100;
var WIN_MODAL			= 0x00000200;
var WIN_INTRANSITION	= 0x00000400;
var WIN_CANFOCUS		= 0x00000800;
var WIN_SELECTED		= 0x00001000;
var WIN_TRANSFORM		= 0x00002000;
var WIN_HOLDCAPTURE	= 0x00004000;
var WIN_NOWRAP		= 0x00008000;
var WIN_NOCLIP		= 0x00010000;
var WIN_INVERTRECT	= 0x00020000;
var WIN_NATURALMAT	= 0x00040000;
var WIN_NOCURSOR		= 0x00080000;
var WIN_MENUGUI		= 0x00100000;
var WIN_ACTIVE		= 0x00200000;
var WIN_SHOWCOORDS	= 0x00400000;
var WIN_SHOWTIME		= 0x00800000;
var WIN_WANTENTER		= 0x01000000;

var WIN_DESKTOP		= 0x10000000;
////
////const char CAPTION_HEIGHT[] = "16.0";
////const char SCROLLER_SIZE[] = "16.0";
////const int SCROLLBAR_SIZE = 16;
////
////const int MAX_WINDOW_NAME = 32;
////const int MAX_LIST_ITEMS = 1024;
////
////const char DEFAULT_BACKCOLOR[] = "1 1 1 1";
////const char DEFAULT_FORECOLOR[] = "0 0 0 1";
////const char DEFAULT_BORDERCOLOR[] = "0 0 0 1";
////const char DEFAULT_TEXTSCALE[] = "0.4";
////
////typedef enum {
////	WOP_TYPE_ADD,
////	WOP_TYPE_SUBTRACT,
////	WOP_TYPE_MULTIPLY,
////	WOP_TYPE_DIVIDE,
////	WOP_TYPE_MOD,
////	WOP_TYPE_TABLE,
////	WOP_TYPE_GT,
////	WOP_TYPE_GE,
////	WOP_TYPE_LT,
////	WOP_TYPE_LE,
////	WOP_TYPE_EQ,
////	WOP_TYPE_NE,
////	WOP_TYPE_AND,
////	WOP_TYPE_OR,
////	WOP_TYPE_VAR,
////	WOP_TYPE_VARS,
////	WOP_TYPE_VARF,
////	WOP_TYPE_VARI,
////	WOP_TYPE_VARB,
////	WOP_TYPE_COND
////} wexpOpType_t;
////
////typedef enum {
////	WEXP_REG_TIME,
////	WEXP_REG_NUM_PREDEFINED
////} wexpRegister_t;
////
////typedef struct {
////	wexpOpType_t opType;	
////	int	a, b, c, d;
////} wexpOp_t;
////
////struct idRegEntry {
////	const char *name;
////	idRegister::REGTYPE type;
////	int index;
////};
////
////class rvGEWindowWrapper;
////class idWindow;
////
////struct idTimeLineEvent {
////	idTimeLineEvent() {
////		event = new idGuiScriptList;
////	}
////	~idTimeLineEvent() {
////		delete event;
////	}
////	int time;
////	idGuiScriptList *event;
////	bool pending;
////	size_t Size() {
////		return sizeof(*this) + event->Size();
////	}
////};
////
////class rvNamedEvent
////{
////public:
////
////	rvNamedEvent(const char* name)
////	{
////		mEvent = new idGuiScriptList;
////		mName  = name;
////	}
////	~rvNamedEvent(void)
////	{
////		delete mEvent;
////	}
////	size_t Size() 
////	{
////		return sizeof(*this) + mEvent->Size();
////	}
////	
////	idStr				mName;
////	idGuiScriptList*	mEvent;
////};
////
////struct idTransitionData {
////	idWinVar *data;
////	int	offset;
////	idInterpolateAccelDecelLinear<idVec4> interp;
////};
////
////
////#endif /* !__WINDOW_H__ */
