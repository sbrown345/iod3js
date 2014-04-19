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
////#include "EditWindow.h"
////#include "ChoiceWindow.h"
////#include "SliderWindow.h"
////#include "BindWindow.h"
////#include "ListWindow.h"
////#include "RenderWindow.h"
////#include "MarkerWindow.h"
////#include "FieldWindow.h"
////
////#include "GameSSDWindow.h"
////#include "GameBearShootWindow.h"
////#include "GameBustOutWindow.h"
////
////// 
//////  gui editor is more integrated into the window now
////#include "../tools/guied/GEWindowWrapper.h"

////class idUserInterfaceLocal;

var ON_MOUSEENTER = 0,
	ON_MOUSEEXIT = 1,
	ON_ACTION = 2,
	ON_ACTIVATE = 3,
	ON_DEACTIVATE = 4,
	ON_ESC = 5,
	ON_FRAME = 6,
	ON_TRIGGER = 7,
	ON_ACTIONRELEASE = 8,
	ON_ENTER = 9,
	ON_ENTERRELEASE = 10,
	SCRIPT_COUNT = 11;


class idWindow {
	static size = 948;
	////public:
	////	idWindow(idUserInterfaceLocal *gui);
	////	idWindow(idDeviceContext *d, idUserInterfaceLocal *gui);
	////	virtual ~idWindow();
	////

	////
	////	enum {
	////		ADJUST_MOVE = 0,
	////		ADJUST_TOP,
	////		ADJUST_RIGHT,
	////		ADJUST_BOTTOM,
	////		ADJUST_LEFT,
	////		ADJUST_TOPLEFT,
	////		ADJUST_BOTTOMRIGHT,
	////		ADJUST_TOPRIGHT,
	////		ADJUST_BOTTOMLEFT
	////	};
	////
	//static ScriptNames = Array<string>(SCRIPT_COUNT);
	////
	////	static const idRegEntry RegisterVars[];
	////	static const int		NumRegisterVars;
	////
	////	void SetDC(idDeviceContext *d);
	////
	////	idDeviceContext*	GetDC ( void ) { return this.dc; }
	////
	////	idWindow *SetFocus(idWindow *w, bool scripts = true);
	////
	////	idWindow *SetCapture(idWindow *w);
	////	void SetParent(idWindow *w);
	////	void SetFlag(unsigned int f);
	////	void ClearFlag(unsigned int f);
	GetFlags ( ): number { return this.flags; }
	////	void Move(float x, float y);
	////	void BringToTop(idWindow *w);
	////	void Adjust(float xd, float yd);
	////	void SetAdjustMode(idWindow *child);
	////	void Size(float x, float y, float w, float h);
	////	void SetupFromState();
	////	void SetupBackground();
	////	drawWin_t *FindChildByName(const char *name);
	////	idSimpleWindow *FindSimpleWinByName(_name:string);
	GetParent(): idWindow { return this.parent; }
	GetGui ( ): idUserInterfaceLocal { return this.gui; }
	////	bool Contains(float x, float y);
	////	size_t Size();
	////	virtual size_t Allocated();
	////	idStr* GetStrPtrByName(_name:string);
	////
	////	virtual idWinVar *GetWinVarByName	(_name:string, bool winLookup = false, drawWin_t** owner = NULL);
	////
	////	int  GetWinVarOffset( idWinVar *wv, drawWin_t *dw );
	////	float GetMaxCharHeight();
	////	float GetMaxCharWidth();
	////	void SetFont();
	////	void SetInitialState(_name:string);
	////	void AddChild(idWindow *win);
	////	void DebugDraw(int time, float x, float y);
	////	void CalcClientRect(float xofs, float yofs);
	////	void CommonInit();
	////	void CleanUp();
	////	void DrawBorderAndCaption(const idRectangle &this.drawRect);
	////	void DrawCaption(int time, float x, float y);
	////	void SetupTransforms(float x, float y);
	////	bool Contains(const idRectangle &sr, float x, float y);
	GetName ( ): string { return this.name.data; }
	////
	////	virtual bool Parse(idParser *src, bool rebuild = true);
	////	virtual const char *HandleEvent(const sysEvent_t *event, bool *updateVisuals);
	////	void	CalcRects(float x, float y);
	////	virtual void Redraw(float x, float y);
	////
	////	virtual void ArchiveToDictionary(idDict *dict, bool useNames = true);
	////	virtual void InitFromDictionary(idDict *dict, bool byName = true);
	////	virtual void PostParse();
	////	virtual void Activate( bool activate, idStr &act );
	////	virtual void Trigger();
	////	virtual void GainFocus();
	////	virtual void LoseFocus();
	////	virtual void GainCapture();
	////	virtual void LoseCapture();
	////	virtual void Sized();
	////	virtual void Moved();
	////	virtual void Draw(int time, float x, float y);
	////	virtual void MouseExit();
	////	virtual void MouseEnter();
	////	virtual void DrawBackground(const idRectangle &this.drawRect);
	////	virtual const char *RouteMouseCoords(float xd, float yd);
	////	virtual void SetBuddy(idWindow *buddy) {};
	////	virtual void HandleBuddyUpdate(idWindow *buddy) {};
	////	virtual void StateChanged( bool redraw );
	////	virtual void ReadFromDemoFile( class idDemoFile *f, bool rebuild = true );
	////	virtual void WriteToDemoFile( class idDemoFile *f );
	////
	////	// SaveGame support
	////	void			WriteSaveGameString( const char *string, idFile *savefile );
	////	void			WriteSaveGameTransition( idTransitionData &trans, idFile *savefile );
	////	virtual void	WriteToSaveGame( idFile *savefile );
	////	void			ReadSaveGameString( idStr &string, idFile *savefile );
	////	void			ReadSaveGameTransition( idTransitionData & trans, idFile *savefile );
	////	virtual void	ReadFromSaveGame( idFile *savefile );
	////	void			FixupTransitions();
	////	virtual void HasAction(){};
	////	virtual void HasScripts(){};
	////
	////	void FixupParms();
	////	void GetScriptString(const char *name, idStr &out);
	////	void SetScriptParams();
	////	bool HasOps() {	return (this.ops.Num() > 0); };
	////	float EvalRegs(int test = -1, bool force = false);
	////	void StartTransition();
	////	void AddTransition(idWinVar *dest, idVec4 from, idVec4 to, int time, float accelTime, float decelTime);
	////	void ResetTime(int time);
	////	void ResetCinematics();
	////
	////	int NumTransitions();
	////
	////	bool ParseScript(idParser *src, idGuiScriptList &list, int *timeParm = NULL, bool allowIf = false);
	////	bool RunScript(int n);
	////	bool RunScriptList(idGuiScriptList *src);
	////	void SetRegs(const char *key, const char *val);
	////	int ParseExpression( idParser *src, idWinVar *var = NULL, int component = 0 );
	////	int ExpressionConstant(float f);
	RegList ( ): idRegisterList { return this.regList; }
	////	void AddCommand(const char *cmd);
	////	void AddUpdateVar(idWinVar *var);
	////	bool Interactive();
	////	bool ContainsStateVars();
	////	void SetChildWinVarVal(const char *name, const char *var, const char *val);
	////	idWindow *GetFocusedChild();
	////	idWindow *GetCaptureChild();
	////	const char *GetComment() { return this.comment;  }
	////	void SetComment( const char * p) { comment = p; }
	////
	cmd = new idStr;
	////
	////	virtual void RunNamedEvent		( const char* eventName );
	////
	////	void		AddDefinedVar		( idWinVar* var );
	////
	////	idWindow*	FindChildByPoint	( float x, float y, idWindow* below = NULL );
	////	int			GetChildIndex		( idWindow* window );
	////	int			GetChildCount		( void );
	////	idWindow*	GetChild			( int index );
	////	void		RemoveChild			( idWindow *win );
	////	bool		InsertChild			( idWindow *win, idWindow* before );
	////
	////	void		ScreenToClient		( idRectangle* this.rect );
	////	void		ClientToScreen		( idRectangle* this.rect );
	////
	////	bool		UpdateFromDictionary ( idDict& dict );
	////
	////protected:
	////
	////	friend		class rvGEWindowWrapper;
	////
	////	idWindow*	FindChildByPoint	( float x, float y, idWindow** below );
	////	void		SetDefaults			( void );
	////
	////	friend class idSimpleWindow;
	////	friend class idUserInterfaceLocal;
	////	bool IsSimple();
	////	void UpdateWinVars();
	////	void DisableRegister(_name:string);
	////	void Transition();
	////	void Time();
	////	bool RunTimeEvents(int time);
	////	void Dump();
	////
	////	int ExpressionTemporary();
	////	wexpOp_t *ExpressionOp();
	////	int EmitOp( int a, int b, wexpOpType_t opType, wexpOp_t **opp = NULL );
	////	int ParseEmitOp( idParser *src, int a, wexpOpType_t opType, int priority, wexpOp_t **opp = NULL );
	////	int ParseTerm( idParser *src, idWinVar *var = NULL, int component = 0 );
	////	int ParseExpressionPriority( idParser *src, int priority, idWinVar *var = NULL, int component = 0 );
	////	void EvaluateRegisters(float *registers);
	////	void SaveExpressionParseState();
	////	void RestoreExpressionParseState();
	////	void ParseBracedExpression(idParser *src);
	////	bool ParseScriptEntry(const char *name, idParser *src);
	////	bool ParseRegEntry(const char *name, idParser *src);
	////	virtual bool ParseInternalVar(const char *name, idParser *src);
	////	void ParseString(idParser *src, idStr &out);
	////	void ParseVec4(idParser *src, idVec4 &out);
	////	void ConvertRegEntry(const char *name, idParser *src, idStr &out, int tabs);

	actualX: number /*float*/; // physical coords
	actualY: number /*float*/; // ''
	childID: number /*int*/; // this childs id
	flags: number /*unsigned int */; // visible, focus, mouseover, cursor, border, etc.. 
	lastTimeRun: number /*int*/; //
	drawRect = new idRectangle; // overall rect
	clientRect = new idRectangle; // client area
	origin = new idVec2;

	timeLine: number /*int*/; // time stamp used for various fx
	xOffset: number /*float*/;
	yOffset: number /*float*/;
	forceAspectWidth: number /*float*/;
	forceAspectHeight: number /*float*/;
	matScalex: number /*float*/;
	matScaley: number /*float*/;
	borderSize: number /*float*/;
	textAlignx: number /*float*/;
	textAligny: number /*float*/;
	name = new idStr;
	comment = new idStr;
	shear = new idVec2;

	textShadow: number; //	signed char		
	fontNum: number; //	unsigned char	
	cursor: number; //	unsigned char	
	textAlign: number; //	signed char		

	noTime = new idWinBool;
	visible = new idWinBool;
	noEvents = new idWinBool;
	rect = new idWinRectangle; // overall rect
	backColor = new idWinVec4;
	matColor = new idWinVec4;
	foreColor = new idWinVec4;
	hoverColor = new idWinVec4;
	borderColor = new idWinVec4;
	textScale = new idWinFloat
	rotate = new idWinFloat
	text = new idWinStr;
	backGroundName = new idWinBackground;

	definedVars = new idList<idWinVar>( idWinVar,true );
	updateVars = new idList<idWinVar>(idWinVar, true );

	textRect = new idRectangle; // text extented rect
	background: idMaterial; // background asset  

	parent: idWindow; // parent window
	children = new idList<idWindow>( idWindow, true ); // child windows	
	drawWindows = new idList<drawWin_t>( drawWin_t );

	focusedChild: idWindow; // if a child window has the focus
	captureChild: idWindow; // if a child window has mouse capture
	overChild: idWindow; // if a child window has mouse capture
	hover: boolean;

	dc: idDeviceContext;
	
	gui: idUserInterfaceLocal;
	////
	////	static idCVar gui_debug;
	////	static idCVar gui_edit;
	////
	scripts = new Array<idGuiScriptList>( SCRIPT_COUNT );
	saveTemps: Array<boolean>;
	
	timeLineEvents = new idList<idTimeLineEvent>(idTimeLineEvent, true );
	transitions= new idList<idTransitionData>( idTransitionData );
	
	static registerIsTemporary = new Array<boolean>(MAX_EXPRESSION_REGISTERS); // statics to assist during parsing
	
	ops = new idList<wexpOp_t>( wexpOp_t ); // evaluate to make expressionRegisters
	expressionRegisters = new idList<number>(Number);	//	idList<float>
	saveOps = new idList<wexpOp_t>( wexpOp_t ); // evaluate to make expressionRegisters
	namedEvents = new idList<rvNamedEvent>(rvNamedEvent, true); //  added named events
	saveRegs = new idList<number>( Number ); //idList<float>
	
	regList = new idRegisterList;
	
	hideCursor = new idWinBool;


	AddDefinedVar ( $var: idWinVar ): void {
		this.definedVars.AddUnique( $var );
	}
////
////bool idWindow::registerIsTemporary[MAX_EXPRESSION_REGISTERS];		// statics to assist during parsing
//////float idWindow::shaderRegisters[MAX_EXPRESSION_REGISTERS];
//////wexpOp_t idWindow::shaderOps[MAX_EXPRESSION_OPS];
////
	static gui_debug = new idCVar ( "gui_debug", "0", CVAR_GUI | CVAR_BOOL, "" );
	static gui_edit = new idCVar ( "gui_edit", "0", CVAR_GUI | CVAR_BOOL, "" );
////
////extern idCVar r_skipGuiShaders;		// 1 = don't render any gui elements on surfaces
////
//////  made RegisterVars a member of idWindow
static RegisterVars = [
	new idRegEntry( "forecolor", REGTYPE.VEC4 ),
	new idRegEntry( "hovercolor", REGTYPE.VEC4 ),
	new idRegEntry( "backcolor", REGTYPE.VEC4 ),
	new idRegEntry( "bordercolor", REGTYPE.VEC4 ),
	new idRegEntry( "rect", REGTYPE.RECTANGLE ),
	new idRegEntry( "matcolor", REGTYPE.VEC4 ),
	new idRegEntry( "scale", REGTYPE.VEC2 ),
	new idRegEntry( "translate", REGTYPE.VEC2 ),
	new idRegEntry( "rotate", REGTYPE.FLOAT ),
	new idRegEntry( "textscale", REGTYPE.FLOAT ),
	new idRegEntry( "visible", REGTYPE.BOOL ),
	new idRegEntry( "noevents", REGTYPE.BOOL ),
	new idRegEntry( "text", REGTYPE.STRING ),
	new idRegEntry( "background", REGTYPE.STRING ),
	new idRegEntry( "runscript", REGTYPE.STRING ),
	new idRegEntry( "varbackground", REGTYPE.STRING ),
	new idRegEntry( "cvar", REGTYPE.STRING ),
	new idRegEntry( "choices", REGTYPE.STRING ),
	new idRegEntry( "choiceVar", REGTYPE.STRING ),
	new idRegEntry( "bind", REGTYPE.STRING ),
	new idRegEntry( "modelRotate", REGTYPE.VEC4 ),
	new idRegEntry( "modelOrigin", REGTYPE.VEC4 ),
	new idRegEntry( "lightOrigin", REGTYPE.VEC4 ),
	new idRegEntry( "lightColor", REGTYPE.VEC4 ),
	new idRegEntry( "viewOffset", REGTYPE.VEC4 ),
	new idRegEntry( "hideCursor", REGTYPE.BOOL)
];

	static NumRegisterVars = idWindow.RegisterVars.length;//sizeof(idWindow.RegisterVars) / sizeof(idRegEntry);

	static ScriptNames = [
		"onMouseEnter",
		"onMouseExit",
		"onAction",
		"onActivate",
		"onDeactivate",
		"onESC",
		"onEvent",
		"onTrigger",
		"onActionRelease",
		"onEnter",
		"onEnterRelease"
	];

/*
================
idWindow::CommonInit
================
*/
	CommonInit ( ): void {
		this.childID = 0;
		this.flags = 0;
		this.lastTimeRun = 0;
		this.origin.Zero ( );
		this.fontNum = 0;
		this.timeLine = -1;
		this.xOffset = this.yOffset = 0.0;
		this.cursor = 0;
		this.forceAspectWidth = 640;
		this.forceAspectHeight = 480;
		this.matScalex = 1;
		this.matScaley = 1;
		this.borderSize = 0;
		this.noTime.equalsBool( false );
		this.visible.equalsBool( true );
		this.textAlign = 0;
		this.textAlignx = 0;
		this.textAligny = 0;
		this.noEvents.equalsBool( false );
		this.rotate.equalsFloat( 0 );
		this.shear.Zero ( );
		this.textScale.equalsFloat( 0.35 );
		this.backColor.Zero ( );
		this.foreColor.equalsVec4( new idVec4( 1, 1, 1, 1 ) );
		this.hoverColor.equalsVec4( new idVec4( 1, 1, 1, 1 ) );
		this.matColor.equalsVec4( new idVec4( 1, 1, 1, 1 ) );
		this.borderColor.Zero ( );
		this.background = null;
		this.backGroundName.equalsStr( new idStr( "" ) );
		this.focusedChild = null;
		this.captureChild = null;
		this.overChild = null;
		this.parent = null;
		this.saveOps = null;
		this.saveRegs = null;
		this.timeLine = -1;
		this.textShadow = 0;
		this.hover = false;

		for ( var i = 0; i < SCRIPT_COUNT; i++ ) {
			this.scripts[i] = null;
		}

		this.hideCursor.equalsBool( false );
	}

/////*
////================
////idWindow::Size
////================
////*/
////size_t idWindow::Size() {
////	var c = this.children.Num();
////	int sz = 0;
////	for (var i = 0; i < c; i++) {
////		sz += this.children[i].Size();
////	}
////	sz += sizeof(*this) + Allocated();
////	return sz;
////}
////
/////*
////================
////idWindow::Allocated
////================
////*/
////size_t idWindow::Allocated() {
////	int i, c;
////	int sz = this.name.Allocated();
////	sz += this.text.Size();
////	sz += this.backGroundName.Size();
////
////	c = this.definedVars.Num();
////	for (i = 0; i < c; i++) {
////		sz += this.definedVars[i].Size();
////	}
////
////	for (i = 0; i < SCRIPT_COUNT; i++) {
////		if (this.scripts[i]) {
////			sz += this.scripts[i].Size();
////		}
////	}
////	c = this.timeLineEvents.Num();
////	for (i = 0; i < c; i++) {
////		sz += this.timeLineEvents[i].Size();
////	}
////
////	c = this.namedEvents.Num();
////	for (i = 0; i < c; i++) {
////		sz += this.namedEvents[i].Size();
////	}
////
////	c = this.drawWindows.Num();
////	for (i = 0; i < c; i++) {
////		if (this.drawWindows[i].simp) {
////			sz += this.drawWindows[i].simp.Size();
////		}
////	}
////
////	return sz;
////}

/*
================
idWindow::idWindow
================
*/
	constructor( /*don't do anything, calling manually*/)
	constructor ( ui: idUserInterfaceLocal )
	constructor ( d: idDeviceContext, ui: idUserInterfaceLocal )
	constructor(a1?: any, a2?: any) {
		if ( arguments.length == 1 ) {
			var ui = <idUserInterfaceLocal>a1;
			this.ctor1( ui );
		} else if ( arguments.length == 2 ) {
			var d = <idDeviceContext>a1;
			var ui = <idUserInterfaceLocal>a2;
			this.ctor2( d, ui );
		}
	}

	// work around typescript needing to call super() first
	ctor1 ( ui: idUserInterfaceLocal ): void {
		this.dc = null;
		this.gui = ui;
		this.CommonInit();
	}

	ctor2 ( d: idDeviceContext, ui: idUserInterfaceLocal ): void {
		this.dc = d;
		this.gui = ui;
		this.CommonInit();
	}

/*
================
idWindow::CleanUp
================
*/
	CleanUp ( ): void {
		var i:number, c = this.drawWindows.Num ( );
		for ( i = 0; i < c; i++ ) {
			$delete( this.drawWindows[i].simp );
			delete this.drawWindows[i].simp;
		}

		// ensure the register list gets cleaned up
		this.regList.Reset ( );

		// Cleanup the named events
		this.namedEvents.DeleteContents( true );

		this.drawWindows.Clear ( );
		this.children.DeleteContents( true );
		this.definedVars.DeleteContents( true );
		this.timeLineEvents.DeleteContents( true );
		for ( i = 0; i < SCRIPT_COUNT; i++ ) {
			$delete( this.scripts[i] );
			delete this.scripts[i];
		}
		this.CommonInit ( );
	}

/*
================
idWindow::~idWindow
================
*/
	destructor ( ): void {
		this.CleanUp ( );
	}
////
/////*
////================
////idWindow::Move
////================
////*/
////Move(/*float */x:number, /*float */y:number):void {
////	idRectangle rct = this.rect;
////	rct.x = x;
////	rct.y = y;
////	idRegister *reg = RegList().FindReg("rect");
////	if (reg) {
////		reg.Enable(false);
////	}
////	rect = rct;
////}
////
/*
================
idWindow::SetFont
================
*/
	SetFont ( ): void {
		this.dc.SetFont( this.fontNum );
	}

/*
================
idWindow::GetMaxCharHeight
================
*/
	GetMaxCharHeight ( ): number /*float*/ {
		this.SetFont ( );
		return this.dc.MaxCharHeight( this.textScale.data );
	}

/*
================
idWindow::GetMaxCharWidth
================
*/
	GetMaxCharWidth ( ): number /*float*/ {
		this.SetFont ( );
		return this.dc.MaxCharWidth( this.textScale.data );
	}

/*
================
idWindow::Draw
================
*/
	Draw ( /*int*/ time: number, /*float */x: number, /*float */y: number ): void {
		if ( this.text.Length ( ) == 0 ) {
			return;
		}
		if ( this.textShadow ) {
			var shadowText = new idStr( this.text.data );
			var shadowRect = new idRectangle;
			shadowRect.equals( this.textRect );

			shadowText.RemoveColors ( );
			shadowRect.x += this.textShadow;
			shadowRect.y += this.textShadow;

			this.dc.DrawText_text( shadowText.data, this.textScale.data, this.textAlign, colorBlack, shadowRect, !( this.flags & WIN_NOWRAP ), -1 );
		}
		this.dc.DrawText_text( this.text.data.data, this.textScale.data, this.textAlign, this.foreColor.data, this.textRect, !( this.flags & WIN_NOWRAP ), -1 );

		if ( idWindow.gui_edit.GetBool ( ) ) {
			this.dc.EnableClipping( false );
			this.dc.DrawText_text( va( "x: %i  y: %i", int( this.rect.x ( ) ), int( this.rect.y ( ) ) ), 0.25, 0, /*this.dc.*/colorWhite, new idRectangle( this.rect.x ( ), this.rect.y ( ) - 15, 100, 20 ), false );
			this.dc.DrawText_text( va( "w: %i  h: %i", int( this.rect.w ( ) ), int( this.rect.h ( ) ) ), 0.25, 0, /*this.dc.*/colorWhite, new idRectangle( this.rect.x ( ) + this.rect.w ( ), this.rect.w ( ) + this.rect.h ( ) + 5, 100, 20 ), false );
			this.dc.EnableClipping( true );
		}
	}

/////*
////================
////idWindow::BringToTop
////================
////*/
////BringToTop(idWindow *w):void {
////	
////	if (w && !(w.flags & WIN_MODAL)) {
////		return;
////	}
////
////	var c = this.children.Num();
////	for (var i = 0; i < c; i++) {
////		if (this.children[i] == w) {
////			// this is it move from i - 1 to 0 to i to 1 then shove this one into 0
////			for (int j = i+1; j < c; j++) {
////				this.children[j-1] = this.children[j];
////			}
////			this.children[c-1] = w;
////			break;
////		}
////	}
////}
////
/////*
////================
////idWindow::Size
////================
////*/
////Size(/*float */x:number, /*float */y:number, float w, float h):void {
////	idRectangle rct = this.rect;
////	rct.x = x;
////	rct.y = y;
////	rct.w = w;
////	rct.h = h;
////	rect = rct;
////	this.CalcClientRect(0,0);
////}
////
/////*
////================
////idWindow::MouseEnter
////================
////*/
////MouseEnter():void {
////	
////	if (noEvents) {
////		return;
////	}
////
////	RunScript(ON_MOUSEENTER);
////}
////
/////*
////================
////idWindow::MouseExit
////================
////*/
////MouseExit():void {
////	
////	if (noEvents) {
////		return;
////	}
////
////	RunScript(ON_MOUSEEXIT);
////}
////
////
/////*
////================
////idWindow::RouteMouseCoords
////================
////*/
////const char *idWindow::RouteMouseCoords(float xd, float yd) {
////	idStr str;
////	if (GetCaptureChild()) {
////		//FIXME: unkludge this whole mechanism
////		return GetCaptureChild().RouteMouseCoords(xd, yd);
////	}
////	
////	if (xd == -2000 || yd == -2000) {
////		return "";
////	}
////
////	var c = this.children.Num();
////	while (c > 0) {
////		idWindow *child = this.children[--c];
////		if (child.visible && !child.noEvents && child.Contains(child.drawRect, this.gui.CursorX(), this.gui.CursorY())) {
////
////			this.dc.SetCursor(child.cursor);
////			child.hover = true;
////
////			if (overChild != child) {
////				if (overChild) {
////					overChild.MouseExit();
////					str = overChild.cmd;
////					if (str.Length()) {
////						this.gui.GetDesktop().AddCommand(str);
////						overChild.cmd = "";
////					}
////				}
////				overChild = child;
////				overChild.MouseEnter();
////				str = overChild.cmd;
////				if (str.Length()) {
////					this.gui.GetDesktop().AddCommand(str);
////					overChild.cmd = "";
////				}
////			} else {
////				if (!(child.flags & WIN_HOLDCAPTURE)) {
////					child.RouteMouseCoords(xd, yd);
////				}
////			}
////			return "";
////		}
////	}
////	if (overChild) {
////		overChild.MouseExit();
////		str = overChild.cmd;
////		if (str.Length()) {
////			this.gui.GetDesktop().AddCommand(str);
////			overChild.cmd = "";
////		}
////		overChild = NULL;
////	}
////	return "";
////}
////
/*
================
idWindow::Activate
================
*/
	Activate ( activate: boolean, act: idStr ): void {
		todoThrow ( );
		//int n = (activate) ? ON_ACTIVATE : ON_DEACTIVATE;

		////  make sure win vars are updated before activation
		//UpdateWinVars ( );

		//RunScript(n);
		//var c = this.children.Num();
		//for (var i = 0; i < c; i++) {
		//	this.children[i].Activate( activate, act );
		//}

		//if ( act.Length() ) {
		//	act += " ; ";
		//}
	}
////
/////*
////================
////idWindow::Trigger
////================
////*/
////Trigger():void {
////	RunScript( ON_TRIGGER );
////	var c = this.children.Num();
////	for ( var i = 0; i < c; i++ ) {
////		this.children[i].Trigger();
////	}
////	StateChanged( true );
////}
////
/*
================
idWindow::StateChanged
================
*/
	StateChanged ( redraw: boolean ): void {

		this.UpdateWinVars ( );

		if ( this.expressionRegisters.Num ( ) && this.ops.Num ( ) ) {
			this.EvalRegs ( );
		}

		var c = this.drawWindows.Num ( );
		for ( var i = 0; i < c; i++ ) {
			if ( this.drawWindows[i].win ) {
				this.drawWindows[i].win.StateChanged( redraw );
			} else {
				this.drawWindows[i].simp.StateChanged( redraw );
			}
		}

		if ( redraw ) {
			if ( this.flags & WIN_DESKTOP ) {
				this.Redraw( 0.0, 0.0 );
			}
			if ( this.background && this.background.CinematicLength ( ) ) {
				this.background.UpdateCinematic( this.gui.GetTime ( ) );
			}
		}
	}
////
/////*
////================
////idWindow::SetCapture
////================
////*/
////idWindow *idWindow::SetCapture(idWindow *w) {
////	// only one child can have the focus
////
////	idWindow *last = NULL;
////	var c = this.children.Num();
////	for (var i = 0; i < c; i++) {
////		if ( this.children[i].flags & WIN_CAPTURE ) {
////			last = this.children[i];
////			//last.flags &= ~WIN_CAPTURE;
////			last.LoseCapture();
////			break;
////		}
////	}
////
////	w.flags |= WIN_CAPTURE;
////	w.GainCapture();
////	this.gui.GetDesktop().captureChild = w;
////	return last;
////}

/*
================
idWindow::AddUpdateVar
================
*/
	AddUpdateVar ( $var: idWinVar ): void {
		this.updateVars.AddUnique( $var );
	}

/*
================
idWindow::UpdateWinVars
================
*/
	UpdateWinVars ( ): void {
		var c = this.updateVars.Num ( );
		for ( var i = 0; i < c; i++ ) {
			this.updateVars[i].Update ( );
		}
	}

/*
================
idWindow::RunTimeEvents
================
*/
	RunTimeEvents ( /*int */time: number ): boolean {

		if ( time - this.lastTimeRun < USERCMD_MSEC ) {
			//common.Printf("Skipping gui time events at %i\n", time);
			return false;
		}

		this.lastTimeRun = time;

		this.UpdateWinVars ( );

		if ( this.expressionRegisters.Num ( ) && this.ops.Num ( ) ) {
			this.EvalRegs ( );
		}
		todoThrow ( );
		//if ( this.flags & WIN_INTRANSITION ) {
		//	this.Transition ( );
		//}

		//this.Time ( );

		//// renamed ON_EVENT to ON_FRAME
		//this.RunScript( ON_FRAME );

		//var c = this.children.Num ( );
		//for ( var i = 0; i < c; i++ ) {
		//	this.children[i].RunTimeEvents( time );
		//}

		return true;
	}

/////*
////================
////idWindow::RunNamedEvent
////================
////*/
////RunNamedEvent ( const char* eventName ):void
////{
////	var/*int*/i:number;
////	int c;
////
////	// Find and run the event	
////	c = this.namedEvents.Num( );
////	for ( i = 0; i < c; i ++ ) {
////		if ( this.namedEvents[i].mName.Icmp( eventName ) ) {	
////			continue;
////		}
////
////		UpdateWinVars();
////
////		// Make sure we got all the current values for stuff
////		if (this.expressionRegisters.Num() && this.ops.Num()) {
////			this.EvalRegs(-1, true);
////		}
////		
////		RunScriptList( this.namedEvents[i].mEvent );
////		
////		break;
////	}
////	
////	// Run the event in all the children as well
////	c = this.children.Num();
////	for ( i = 0; i < c; i++ ) {
////		children[i].RunNamedEvent ( eventName );
////	}
////}
////
/*
================
idWindow::Contains
================
*/
	Contains_Rect ( sr: idRectangle, /*float */x: number, /*float */y: number ): boolean {
		var r = new idRectangle;
		r.equals(sr);
		r.x += this.actualX - this.drawRect.x;
		r.y += this.actualY - this.drawRect.y;
		return r.Contains( x, y );
	}

/*
================
idWindow::Contains
================
*/
	Contains ( /*float */x: number, /*float */y: number ): boolean {
		var r = new idRectangle();
		r.equals(this.drawRect);
		r.x = this.actualX;
		r.y = this.actualY;
		return r.Contains( x, y );
	}

/////*
////================
////idWindow::AddCommand
////================
////*/
////AddCommand(const char *_cmd):void {
////	idStr str = cmd;
////	if (str.Length()) {
////		str += " ; ";
////		str += _cmd;
////	} else {
////		str = _cmd;
////	}
////	cmd = str;
////}
////
/////*
////================
////idWindow::HandleEvent
////================
////*/

	HandleEvent(event: sysEvent_t, /*bool **/updateVisuals: R<boolean>): string {
		todoThrow();
		return "TODO idWindow::HandleEvent";
////	static bool actionDownRun;
////	static bool actionUpRun;
////
////	cmd = "";
////
////	if ( this.flags & WIN_DESKTOP ) {
////		actionDownRun = false;
////		actionUpRun = false;
////		if (this.expressionRegisters.Num() && this.ops.Num()) {
////			this.EvalRegs();
////		}
////		RunTimeEvents(this.gui.GetTime());
////		this.CalcRects(0,0);
////		this.dc.SetCursor( idDeviceContext::CURSOR_ARROW );
////	}
////
////	if (this.visible && !noEvents) {
////
////		if (event.evType == SE_KEY) {
////			this.EvalRegs(-1, true);
////			if (updateVisuals) {
////				*updateVisuals = true;
////			}
////
////			if (event.evValue == K_MOUSE1) {
////
////				if (!event.evValue2 && GetCaptureChild()) {
////					GetCaptureChild().LoseCapture();
////					this.gui.GetDesktop().captureChild = NULL;
////					return "";
////				} 
////
////				var c = this.children.Num();
////				while (--c >= 0) {
////					if (children[c].visible && this.children[c].Contains(children[c].drawRect, this.gui.CursorX(), this.gui.CursorY()) && !(children[c].noEvents)) {
////						idWindow *child = this.children[c];
////						if (event.evValue2) {
////							BringToTop(child);
////							SetFocus(child);
////							if (child.flags & WIN_HOLDCAPTURE) {
////								SetCapture(child);
////							}
////						}
////						if (child.Contains(child.clientRect, this.gui.CursorX(), this.gui.CursorY())) {
////							//if ((idWindow.gui_edit.GetBool() && (child.flags & WIN_SELECTED)) || (!idWindow.gui_edit.GetBool() && (child.flags & WIN_MOVABLE))) {
////							//	SetCapture(child);
////							//}
////							SetFocus(child);
////							const char *childRet = child.HandleEvent(event, updateVisuals);
////							if (childRet && *childRet) {
////								return childRet;
////							} 
////							if (child.flags & WIN_MODAL) {
////								return "";
////							}
////						} else {
////							if (event.evValue2) {
////								SetFocus(child);
////								bool capture = true;
////								if (capture && ((child.flags & WIN_MOVABLE) || idWindow.gui_edit.GetBool())) {
////									SetCapture(child);
////								}
////								return "";
////							} else {
////							}
////						}
////					}
////				}
////				if (event.evValue2 && !actionDownRun) {
////					actionDownRun = RunScript( ON_ACTION );
////				} else if (!actionUpRun) {
////					actionUpRun = RunScript( ON_ACTIONRELEASE );
////				}
////			} else if (event.evValue == K_MOUSE2) {
////
////				if (!event.evValue2 && GetCaptureChild()) {
////					GetCaptureChild().LoseCapture();
////					this.gui.GetDesktop().captureChild = NULL;
////					return "";
////				}
////
////				var c = this.children.Num();
////				while (--c >= 0) {
////					if (children[c].visible && this.children[c].Contains(children[c].drawRect, this.gui.CursorX(), this.gui.CursorY()) && !(children[c].noEvents)) {
////						idWindow *child = this.children[c];
////						if (event.evValue2) {
////							BringToTop(child);
////							SetFocus(child);
////						}
////						if (child.Contains(child.clientRect,this.gui.CursorX(), this.gui.CursorY()) || GetCaptureChild() == child) {
////							if ((idWindow.gui_edit.GetBool() && (child.flags & WIN_SELECTED)) || (!idWindow.gui_edit.GetBool() && (child.flags & WIN_MOVABLE))) {
////								SetCapture(child);
////							}
////							const char *childRet = child.HandleEvent(event, updateVisuals);
////							if (childRet && *childRet) {
////								return childRet;
////							} 
////							if (child.flags & WIN_MODAL) {
////								return "";
////							}
////						}
////					}
////				}
////			} else if (event.evValue == K_MOUSE3) {
////				if (idWindow.gui_edit.GetBool()) {
////					var c = this.children.Num();
////					for (var i = 0; i < c; i++) {
////						if (children[i].drawRect.Contains(this.gui.CursorX(), this.gui.CursorY())) {
////							if (event.evValue2) {
////								children[i].flags ^= WIN_SELECTED;
////								if (children[i].flags & WIN_SELECTED) {
////									this.flags &= ~WIN_SELECTED;
////									return "childsel";
////								}
////							}
////						}
////					}
////				}
////			} else if (event.evValue == K_TAB && event.evValue2) {
////				if (GetFocusedChild()) {
////					const char *childRet = GetFocusedChild().HandleEvent(event, updateVisuals);
////					if (childRet && *childRet) {
////						return childRet;
////					}
////
////					// If the window didn't handle the tab, then move the focus to the next window
////					// or the previous window if shift is held down
////
////					int direction = 1;
////					if ( idKeyInput::IsDown( K_SHIFT ) ) {
////						direction = -1;
////					}
////
////					idWindow *currentFocus = GetFocusedChild();
////					idWindow *child = GetFocusedChild();
////					idWindow *parent = child.GetParent();
////					while ( this.parent ) {
////						bool foundFocus = false;
////						bool recurse = false;
////						int index = 0;
////						if ( child ) {
////							index = this.parent.GetChildIndex( child ) + direction;
////						} else if ( direction < 0 ) {
////							index = this.parent.GetChildCount() - 1;
////						}
////						while ( index < this.parent.GetChildCount() && index >= 0) {
////							idWindow *testWindow = this.parent.GetChild( index );
////							if ( testWindow == currentFocus ) {
////								// we managed to wrap around and get back to our starting window
////								foundFocus = true;
////								break;
////							}
////							if ( testWindow && !testWindow.noEvents && testWindow.visible ) {
////								if ( testWindow.flags & WIN_CANFOCUS ) {
////									SetFocus( testWindow );
////									foundFocus = true;
////									break;
////								} else if ( testWindow.GetChildCount() > 0 ) {
////									parent = testWindow;
////									child = NULL;
////									recurse = true;
////									break;
////								}
////							}
////							index += direction;
////						}
////						if ( foundFocus ) {
////							// We found a child to focus on
////							break;
////						} else if ( recurse ) {
////							// We found a child with children
////							continue;
////						} else {
////							// We didn't find anything, so go back up to our parent
////							child = this.parent;
////							parent = child.GetParent();
////							if ( this.parent == this.gui.GetDesktop() ) {
////								// We got back to the desktop, so wrap around but don't actually go to the desktop
////								parent = NULL;
////								child = NULL;
////							}
////						}
////					}
////				}
////			} else if (event.evValue == K_ESCAPE && event.evValue2) {
////				if (GetFocusedChild()) {
////					const char *childRet = GetFocusedChild().HandleEvent(event, updateVisuals);
////					if (childRet && *childRet) {
////						return childRet;
////					}
////				}
////				RunScript( ON_ESC );
////			} else if (event.evValue == K_ENTER ) {
////				if (GetFocusedChild()) {
////					const char *childRet = GetFocusedChild().HandleEvent(event, updateVisuals);
////					if (childRet && *childRet) {
////						return childRet;
////					}
////				}
////				if ( this.flags & WIN_WANTENTER ) {
////					if ( event.evValue2 ) {
////						RunScript( ON_ACTION );
////					} else {
////						RunScript( ON_ACTIONRELEASE );
////					}
////				}
////			} else {
////				if (GetFocusedChild()) {
////					const char *childRet = GetFocusedChild().HandleEvent(event, updateVisuals);
////					if (childRet && *childRet) {
////						return childRet;
////					}
////				}
////			}
////
////		} else if (event.evType == SE_MOUSE) {
////			if (updateVisuals) {
////				*updateVisuals = true;
////			}
////			const char *mouseRet = RouteMouseCoords(event.evValue, event.evValue2);
////			if (mouseRet && *mouseRet) {
////				return mouseRet;
////			}
////		} else if (event.evType == SE_NONE) {
////		} else if (event.evType == SE_CHAR) {
////			if (GetFocusedChild()) {
////				const char *childRet = GetFocusedChild().HandleEvent(event, updateVisuals);
////				if (childRet && *childRet) {
////					return childRet;
////				}
////			}
////		}
////	}
////
////	this.gui.GetReturnCmd() = cmd;
////	if ( this.gui.GetPendingCmd().Length() ) {
////		this.gui.GetReturnCmd() += " ; ";
////		this.gui.GetReturnCmd() += this.gui.GetPendingCmd();
////		this.gui.GetPendingCmd().Clear();
////	}
////	cmd = "";
////	return this.gui.GetReturnCmd();
	}
////
/////*
////================
////idWindow::DebugDraw
////================
////*/
////DebugDraw(int time, /*float */x:number, /*float */y:number):void {
////	static char buff[16384];
////	if (this.dc) {
////		this.dc.EnableClipping(false);
////		if (idWindow.gui_debug.GetInteger() == 1) {
////			this.dc.DrawRect(this.drawRect.x, this.drawRect.y, this.drawRect.w, this.drawRect.h, 1, idDeviceContext::colorRed);
////		} else if (idWindow.gui_debug.GetInteger() == 2) {
////			char out[1024];
////			idStr str;
////			str = this.text.c_str();
////			
////			if (str.Length()) {
////				sprintf(buff, "%s\n", str.c_str());
////			}
////
////			sprintf(out, "Rect: %0.1f, %0.1f, %0.1f, %0.1f\n", this.rect.x(), this.rect.y(), this.rect.w(), this.rect.h());
////			strcat(buff, out);
////			sprintf(out, "Draw Rect: %0.1f, %0.1f, %0.1f, %0.1f\n", this.drawRect.x, this.drawRect.y, this.drawRect.w, this.drawRect.h);
////			strcat(buff, out);
////			sprintf(out, "Client Rect: %0.1f, %0.1f, %0.1f, %0.1f\n", this.clientRect.x, this.clientRect.y, this.clientRect.w, this.clientRect.h);
////			strcat(buff, out);
////			sprintf(out, "Cursor: %0.1f : %0.1f\n", this.gui.CursorX(), this.gui.CursorY());
////			strcat(buff, out);
////
////
////			//idRectangle tempRect = this.textRect;
////			//tempRect.x += offsetX;
////			//this.drawRect.y += offsetY;
////			this.dc.DrawText(buff, this.textScale, this.textAlign, foreColor, this.textRect, true);
////		} 
////		this.dc.EnableClipping(true);
////	}
////}
////
/////*
////================
////idWindow::Transition
////================
////*/
////Transition():void {
////	int i, c = transitions.Num();
////	bool clear = true;
////
////	for ( i = 0; i < c; i++ ) {
////		idTransitionData *data = &transitions[i];
////		idWinRectangle *r = NULL;
////		idWinVec4 *v4 = dynamic_cast<idWinVec4*>(data.data);
////		idWinFloat* val = NULL;
////		if (v4 == NULL) {
////			r = dynamic_cast<idWinRectangle*>(data.data);
////			if ( !r ) {
////				val = dynamic_cast<idWinFloat*>(data.data);
////			}
////		}
////		if ( data.interp.IsDone( this.gui.GetTime() ) && data.data) {
////			if (v4) {
////				*v4 = data.interp.GetEndValue();
////			} else if ( val ) {
////				*val = data.interp.GetEndValue()[0];
////			} else {
////				*r = data.interp.GetEndValue();
////			}
////		} else {
////			clear = false;
////			if (data.data) {
////				if (v4) {
////					*v4 = data.interp.GetCurrentValue( this.gui.GetTime() );
////				} else if ( val ) {
////					*val = data.interp.GetCurrentValue( this.gui.GetTime() )[0];
////				} else {
////					*r = data.interp.GetCurrentValue( this.gui.GetTime() );
////				}
////			} else {
////				common.Warning("Invalid transitional data for window %s in this.gui %s", this.GetName(), this.gui.GetSourceFile());
////			}
////		}
////	}
////
////	if ( clear ) {
////		transitions.SetNum( 0, false );
////		this.flags &= ~WIN_INTRANSITION;
////	}
////}
////
/////*
////================
////idWindow::Time
////================
////*/
////Time():void {
////	
////	if ( this.noTime ) {
////		return;
////	}
////
////	if ( this.timeLine == -1 ) {
////		this.timeLine = this.gui.GetTime();
////	}
////
////	cmd = "";
////
////	int c = this.timeLineEvents.Num();
////	if ( c > 0 ) {
////		for (var i = 0; i < c; i++) {
////			if ( this.timeLineEvents[i].pending && this.gui.GetTime() - this.timeLine >= this.timeLineEvents[i].time ) {
////				this.timeLineEvents[i].pending = false;
////				RunScriptList( this.timeLineEvents[i].event );
////			}
////		}
////	}
////	if ( this.gui.Active() ) {
////		this.gui.GetPendingCmd() += cmd;
////	}
////}

/*
================
idWindow::EvalRegs
================
*/
	private static regs = new Float32Array(MAX_EXPRESSION_REGISTERS);
	private static lastEval: idWindow= null;

	EvalRegs ( /*int */test = -1, force = false ): number /*float */ {


		if ( !force && test >= 0 && test < MAX_EXPRESSION_REGISTERS && idWindow.lastEval == this ) {
			return idWindow.regs[test];
		}

		idWindow.lastEval = this;

		if ( this.expressionRegisters.Num ( ) ) {
			this.regList.SetToRegs( idWindow.regs );
			this.EvaluateRegisters( idWindow.regs );
			this.regList.GetFromRegs( idWindow.regs );
		}

		if ( test >= 0 && test < MAX_EXPRESSION_REGISTERS ) {
			return idWindow.regs[test];
		}

		return 0.0;
	}

/*
================
idWindow::DrawBackground
================
*/
	DrawBackground ( drawRect: idRectangle ): void {
		if ( this.backColor.w ( ) ) {
			this.dc.DrawFilledRect( drawRect.x, drawRect.y, drawRect.w, drawRect.h, this.backColor.data );
		}

		if ( this.background && this.matColor.w ( ) ) {
			var /*float */scalex: number, scaley: number;
			if ( this.flags & WIN_NATURALMAT ) {
				scalex = drawRect.w / this.background.GetImageWidth ( );
				scaley = drawRect.h / this.background.GetImageHeight ( );
			} else {
				scalex = this.matScalex;
				scaley = this.matScaley;
			}
			this.dc.DrawMaterial( drawRect.x, drawRect.y, drawRect.w, drawRect.h, this.background, this.matColor.data, scalex, scaley );
		}
	}

/*
================
idWindow::DrawBorderAndCaption
================
*/
	DrawBorderAndCaption ( drawRect: idRectangle ): void {
		if ( this.flags & WIN_BORDER && this.borderSize && this.borderColor.w ( ) ) {
			this.dc.DrawRect( drawRect.x, drawRect.y, drawRect.w, drawRect.h, this.borderSize, this.borderColor .data);
		}
	}

/*
================
idWindow::SetupTransforms
================
*/
	private static trans= new idMat3;	
	private static org = new idVec3;
	private static smat = new idMat3;
	private	static rot = new idRotation;
	private	static vec = new idVec3(0, 0, 1);
	SetupTransforms ( /*float */x: number, /*float */y: number ): void {


		idWindow.trans.Identity ( );
		idWindow.org.Set( this.origin.x + x, this.origin.y + y, 0 );

		if ( this.rotate.data ) {
			idWindow.rot.Set( idWindow.org, idWindow.vec, this.rotate.data );
			idWindow.trans.equals( idWindow.rot.ToMat3 ( ) );
		}

		if ( this.shear.x || this.shear.y ) {

			idWindow.smat.Identity ( );
			idWindow.smat[0][1] = this.shear.x;
			idWindow.smat[1][0] = this.shear.y;
			idWindow.trans.opMultiplicationAssignment( idWindow.smat );
		}

		if ( !idWindow.trans.IsIdentity ( ) ) {
			this.dc.SetTransformInfo( idWindow.org, idWindow.trans );
		}
	}

/*
================
idWindow::CalcRects
================
*/
	CalcRects ( /*float */x: number, /*float */y: number ): void {
		this.CalcClientRect( 0, 0 );
		this.drawRect.Offset( x, y );
		this.clientRect.Offset( x, y );
		this.actualX = this.drawRect.x;
		this.actualY = this.drawRect.y;
		var c = this.drawWindows.Num ( );
		for ( var i = 0; i < c; i++ ) {
			if ( this.drawWindows[i].win ) {
				this.drawWindows[i].win.CalcRects( this.clientRect.x + this.xOffset, this.clientRect.y + this.yOffset );
			}
		}
		this.drawRect.Offset( -x, -y );
		this.clientRect.Offset( -x, -y );
	}

/*
================
idWindow::Redraw
================
*/
	Redraw ( /*float */x: number, /*float */y: number ): void {
		var str = new idStr;

		if ( r_skipGuiShaders.GetInteger ( ) == 1 || this.dc == null ) {
			return;
		}
		var /*int */time = this.gui.GetTime ( );

		if ( this.flags & WIN_DESKTOP && r_skipGuiShaders.GetInteger ( ) != 3 ) {
			this.RunTimeEvents( time );
		}

		if ( r_skipGuiShaders.GetInteger ( ) == 2 ) {
			return;
		}

		if ( this.flags & WIN_SHOWTIME ) {
			this.dc.DrawText_text( va( " %0.1f seconds\n%s", /*(float)*/( time - this.timeLine ) / 1000, this.gui.State ( ).GetString( "name" ) ), 0.35, 0, /*this.dc.*/colorWhite, new idRectangle( 100, 0, 80, 80 ), false );
		}

		if ( this.flags & WIN_SHOWCOORDS ) {
			todoThrow ( );
			//this.dc.EnableClipping(false);
			//sprintf(str, "x: %i y: %i  cursorx: %i cursory: %i", int(this.rect.x()), int(this.rect.y()), int(this.gui.CursorX()), int(this.gui.CursorY()));
			//this.dc.DrawText_text(str.data, 0.25, 0, /*this.dc.*/colorWhite, new idRectangle(0, 0, 100, 20), false);
			//this.dc.EnableClipping(true);
		}

		if ( !this.visible ) {
			return;
		}

		this.CalcClientRect( 0, 0 );

		this.SetFont ( );
		//if (flags & WIN_DESKTOP) {
		// see if this window forces a new aspect ratio
		this.dc.SetSize( this.forceAspectWidth, this.forceAspectHeight );
		//}

		//FIXME: go to screen coord tracking
		this.drawRect.Offset( x, y );
		this.clientRect.Offset( x, y );
		this.textRect.Offset( x, y );
		this.actualX = this.drawRect.x;
		this.actualY = this.drawRect.y;

		var oldOrg = new idVec3;
		var oldTrans = new idMat3;

		this.dc.GetTransformInfo( oldOrg, oldTrans );

		this.SetupTransforms( x, y );
		this.DrawBackground( this.drawRect );
		this.DrawBorderAndCaption( this.drawRect );

		if ( !( this.flags & WIN_NOCLIP ) ) {
			this.dc.PushClipRect( this.clientRect );
		}

		if ( r_skipGuiShaders.GetInteger ( ) < 5 ) {
			this.Draw( time, x, y );
		}

		if ( idWindow.gui_debug.GetInteger ( ) ) {
			todoThrow ( );
			//this.DebugDraw(time, x, y);
		}

		var c = this.drawWindows.Num ( );
		for ( var i = 0; i < c; i++ ) {
			if ( this.drawWindows[i].win ) {
				this.drawWindows[i].win.Redraw( this.clientRect.x + this.xOffset, this.clientRect.y + this.yOffset );
			} else {
				this.drawWindows[i].simp.Redraw( this.clientRect.x + this.xOffset, this.clientRect.y + this.yOffset );
			}
		}

		// Put transforms back to what they were before the children were processed
		this.dc.SetTransformInfo( oldOrg, oldTrans );

		if ( ! ( this.flags & WIN_NOCLIP ) ) {
			this.dc.PopClipRect ( );
		}

		if ( idWindow.gui_edit.GetBool ( ) || ( this.flags & WIN_DESKTOP && !( this.flags & WIN_NOCURSOR ) && !this.hideCursor.data && ( this.gui.Active ( ) || ( this.flags & WIN_MENUGUI ) ) ) ) {
			todoThrow ( );
			//this.dc.SetTransformInfo( vec3_origin, mat3_identity );
			//this.gui.DrawCursor ( );
		}

		if ( idWindow.gui_debug.GetInteger ( ) && this.flags & WIN_DESKTOP ) {
			todoThrow ( );
			//this.dc.EnableClipping(false);
			//sprintf(str, "x: %1.f y: %1.f",  this.gui.CursorX(), this.gui.CursorY());
			//this.dc.DrawText(str, 0.25, 0, this.dc.colorWhite, new idRectangle(0, 0, 100, 20), false);
			//this.dc.DrawText(this.gui.GetSourceFile(), 0.25, 0,/* this.dc.*/colorWhite, new idRectangle(0, 20, 300, 20), false);
			//this.dc.EnableClipping(true);
		}

		this.drawRect.Offset( -x, -y );
		this.clientRect.Offset( -x, -y );
		this.textRect.Offset( -x, -y );
	}


/*
================
idWindow::SetDC
================
*/
	SetDC ( d: idDeviceContext ): void {
		this.dc = d;
		//if (flags & WIN_DESKTOP) {
		this.dc.SetSize( this.forceAspectWidth, this.forceAspectHeight );
		//}
		var c = this.children.Num ( );
		for ( var i = 0; i < c; i++ ) {
			this.children[i].SetDC( d );
		}
	}

/////*
////================
////idWindow::ArchiveToDictionary
////================
////*/
////ArchiveToDictionary(idDict *dict, bool useNames):void {
////	//FIXME: rewrite without state
////	var c = this.children.Num();
////	for (var i = 0; i < c; i++) {
////		children[i].ArchiveToDictionary(dict);
////	}
////}
////
/////*
////================
////idWindow::InitFromDictionary
////================
////*/
////InitFromDictionary(idDict *dict, bool byName):void {
////	//FIXME: rewrite without state
////	var c = this.children.Num();
////	for (var i = 0; i < c; i++) {
////		children[i].InitFromDictionary(dict);
////	}
////}
////
/*
================
idWindow::CalcClientRect
================
*/
	CalcClientRect ( /*float*/ xofs: number, /*float */yofs: number ): void {
		this.drawRect.equals( this.rect.data );

		if ( this.flags & WIN_INVERTRECT ) {
			this.drawRect.x = this.rect.x ( ) - this.rect.w ( );
			this.drawRect.y = this.rect.y ( ) - this.rect.h ( );
		}

		if ( this.flags & ( WIN_HCENTER | WIN_VCENTER ) && this.parent ) {
			// in this case treat xofs and yofs as absolute top left coords
			// and ignore the original positioning
			if ( this.flags & WIN_HCENTER ) {
				this.drawRect.x = ( this.parent.rect.w ( ) - this.rect.w ( ) ) / 2;
			} else {
				this.drawRect.y = ( this.parent.rect.h ( ) - this.rect.h ( ) ) / 2;
			}
		}

		this.drawRect.x += xofs;
		this.drawRect.y += yofs;

		this.clientRect = this.drawRect;
		if ( this.rect.h ( ) > 0.0 && this.rect.w ( ) > 0.0 ) {

			if ( this.flags & WIN_BORDER && this.borderSize != 0.0 ) {
				this.clientRect.x += this.borderSize;
				this.clientRect.y += this.borderSize;
				this.clientRect.w -= this.borderSize;
				this.clientRect.h -= this.borderSize;
			}

			this.textRect = this.clientRect;
			this.textRect.x += 2.0;
			this.textRect.w -= 2.0;
			this.textRect.y += 2.0;
			this.textRect.h -= 2.0;

			this.textRect.x += this.textAlignx;
			this.textRect.y += this.textAligny;

		}
		this.origin.Set( this.rect.x ( ) + ( this.rect.w ( ) / 2 ), this.rect.y ( ) + ( this.rect.h ( ) / 2 ) );
	}

/*
================
idWindow::SetupBackground
================
*/
	SetupBackground ( ): void {
		if ( this.backGroundName.Length ( ) ) {
			this.background = declManager.FindMaterial( this.backGroundName.data.data );
			this.background.SetImageClassifications( 1 ); // just for resource tracking
			if ( this.background && !this.background.TestMaterialFlag( materialFlags_t.MF_DEFAULTED ) ) {
				this.background.SetSort( materialSort_t.SS_GUI );
			}
		}
		this.backGroundName.SetMaterialPtr( this.background );
	}

/*
================
idWindow::SetupFromState
================
*/
	SetupFromState ( ): void {
		var str = new idStr;
		this.background = null;

		this.SetupBackground ( );

		if ( this.borderSize ) {
			this.flags |= WIN_BORDER;
		}

		if ( this.regList.FindReg( "rotate" ) || this.regList.FindReg( "shear" ) ) {
			this.flags |= WIN_TRANSFORM;
		}

		this.CalcClientRect( 0, 0 );
		if ( this.scripts[ON_ACTION] ) {
			this.cursor = CURSOR_HAND;
			this.flags |= WIN_CANFOCUS;
		}
	}

/*
================
idWindow::Moved
================
*/
Moved():void {
}

/*
================
idWindow::Sized
================
*/
Sized():void {
}

/*
================
idWindow::GainFocus
================
*/
GainFocus():void {
}

/*
================
idWindow::LoseFocus
================
*/
LoseFocus():void {
}

/*
================
idWindow::GainCapture
================
*/
GainCapture():void {
}

/*
================
idWindow::LoseCapture
================
*/
LoseCapture():void {
	this.flags &= ~WIN_CAPTURE;
}

/*
================
idWindow::SetFlag
================
*/
	SetFlag ( /*unsigned int */f: number ): void {
		this.flags |= f;
	}

/*
================
idWindow::ClearFlag
================
*/
	ClearFlag ( /*unsigned int */f: number ): void {
		this.flags &= ~f;
	}


/*
================
idWindow::SetParent
================
*/
	SetParent ( w: idWindow ): void {
		this.parent = w;
	}
////
/////*
////================
////idWindow::GetCaptureChild
////================
////*/
////idWindow *idWindow::GetCaptureChild() {
////	if (flags & WIN_DESKTOP) {
////		return this.gui.GetDesktop().captureChild;
////	}
////	return NULL;
////}
////
/////*
////================
////idWindow::GetFocusedChild
////================
////*/
////idWindow *idWindow::GetFocusedChild() {
////	if (flags & WIN_DESKTOP) {
////		return this.gui.GetDesktop().focusedChild;
////	}
////	return NULL;
////}
////
////
/*
================
idWindow::SetFocus
================
*/
	SetFocus ( w: idWindow, scripts = true ): idWindow {
		// only one child can have the focus
		var lastFocus: idWindow = null;
		if ( w.flags & WIN_CANFOCUS ) {
			lastFocus = this.gui.GetDesktop ( ).focusedChild;
			if ( lastFocus ) {
				lastFocus.flags &= ~WIN_FOCUS;
				lastFocus.LoseFocus ( );
			}

			//  call on lose focus
			if ( scripts && lastFocus ) {
				// calling this broke all sorts of guis
				// lastFocus.RunScript(ON_MOUSEEXIT);
			}
			//  call on gain focus
			if ( scripts && w ) {
				// calling this broke all sorts of guis
				// w.RunScript(ON_MOUSEENTER);
			}

			w.flags |= WIN_FOCUS;
			w.GainFocus ( );
			this.gui.GetDesktop ( ).focusedChild = w;
		}

		return lastFocus;
	}

/*
================
idWindow::ParseScript
================
*/
	ParseScript ( src: idParser, list: idGuiScriptList, /*int **/timeParm: R<number> = null, elseBlock = false ): boolean {

		var ifElseBlock = false;

		var token = new idToken;

		// scripts start with { ( unless parm is true ) and have ; separated command lists.. commands are command,
		// arg.. basically we want everything between the { } as it will be interpreted at
		// run time

		if ( elseBlock ) {
			src.ReadToken( token );

			if ( !token.Icmp( "if" ) ) {
				ifElseBlock = true;
			}

			src.UnreadToken( token );

			if ( !ifElseBlock && !src.ExpectTokenString( "{" ) ) {
				return false;
			}
		} else if ( !src.ExpectTokenString( "{" ) ) {
			return false;
		}

		var nest = 0;

		while ( 1 ) {
			if ( !src.ReadToken( token ) ) {
				src.Error( "Unexpected end of file" );
				return false;
			}

			if ( token.data == "{" ) {
				nest++;
			}

			if ( token.data == "}" ) {
				if ( nest-- <= 0 ) {
					return true;
				}
			}

			var gs = new idGuiScript ( );
			if ( token.Icmp( "if" ) == 0 ) {
				gs.conditionReg = this.ParseExpression( src );
				gs.ifList = new idGuiScriptList ( );
				this.ParseScript( src, gs.ifList, null );
				if ( src.ReadToken( token ) ) {
					if ( token.data == "else" ) {
						gs.elseList = new idGuiScriptList ( );
						// pass true to indicate we are parsing an else condition
						this.ParseScript( src, gs.elseList, null, true );
					} else {
						src.UnreadToken( token );
					}
				}

				list.Append( gs );

				// if we are parsing an else if then return out so 
				// the initial "if" parser can handle the rest of the tokens
				if ( ifElseBlock ) {
					return true;
				}
				continue;
			} else {
				src.UnreadToken( token );
			}

			// empty { } is not allowed
			if ( token.data == "{" ) {
				src.Error( "Unexpected {" );
				delete gs;
				return false;
			}

			gs.Parse( src );
			list.Append( gs );
		}

		todoThrow( "shouldnt' get here" );
	}

/*
================
idWindow::SaveExpressionParseState
================
*/
	SaveExpressionParseState ( ): void {
		this.saveTemps = new Array<boolean>( MAX_EXPRESSION_REGISTERS ); //saveTemps = (bool*)Mem_Alloc(MAX_EXPRESSION_REGISTERS * sizeof(bool));
		//memcpy(saveTemps, idWindow.registerIsTemporary, MAX_EXPRESSION_REGISTERS * sizeof(bool));
		for ( var i = 0; i < MAX_EXPRESSION_REGISTERS; i++ ) {
			this.saveTemps[i] = idWindow.registerIsTemporary[i];
		}
	}

/*
================
idWindow::RestoreExpressionParseState
================
*/
	RestoreExpressionParseState ( ): void {
		//memcpy(idWindow.registerIsTemporary, saveTemps, MAX_EXPRESSION_REGISTERS * sizeof(bool));
		for (var i = 0; i < MAX_EXPRESSION_REGISTERS; i++) {
			idWindow.registerIsTemporary[i] = this.saveTemps[i];
		}
		Mem_Free( this.saveTemps );
	}

/*
================
idWindow::ParseScriptEntry
================
*/
	ParseScriptEntry(name: string, src: idParser ):boolean {
		for ( var i = 0; i < SCRIPT_COUNT; i++ ) {
			if ( idStr.Icmp( name, idWindow.ScriptNames[i] ) == 0 ) {
				delete this.scripts[i];
				this.scripts[i] = new idGuiScriptList;
				return this.ParseScript( src, this.scripts[i] );
			}
		}
		return false;
}

/*
================
idWindow::DisableRegister
================
*/
	DisableRegister ( _name: string ): void {
		var reg = this.RegList ( ).FindReg( _name );
		if ( reg ) {
			reg.Enable( false );
		}
	}

/*
================
idWindow::PostParse
================
*/
PostParse():void {
}
	
/////*
////================
////idWindow::GetWinVarOffset
////================
////*/
////int idWindow::GetWinVarOffset( idWinVar *wv, drawWin_t* owner) {
////	int ret = -1;
////
////	if ( wv == &rect ) {
////		ret = (int)&( ( idWindow * ) 0 ).rect;
////	}
////
////	if ( wv == &this.backColor ) {
////		ret = (int)&( ( idWindow * ) 0 ).backColor;
////	}
////
////	if ( wv == &this.matColor ) {
////		ret = (int)&( ( idWindow * ) 0 ).matColor;
////	}
////
////	if ( wv == &foreColor ) {
////		ret = (int)&( ( idWindow * ) 0 ).foreColor;
////	}
////
////	if ( wv == &hoverColor ) {
////		ret = (int)&( ( idWindow * ) 0 ).hoverColor;
////	}
////
////	if ( wv == &this.borderColor ) {
////		ret = (int)&( ( idWindow * ) 0 ).borderColor;
////	}
////
////	if ( wv == &this.textScale ) {
////		ret = (int)&( ( idWindow * ) 0 ).textScale;
////	}
////
////	if ( wv == &rotate ) {
////		ret = (int)&( ( idWindow * ) 0 ).rotate;
////	}
////
////	if ( ret != -1 ) {
////		owner.win = this;
////		return ret;
////	}
////
////	for ( var i = 0; i < this.drawWindows.Num(); i++ ) {
////		if ( this.drawWindows[i].win ) {
////			ret = this.drawWindows[i].win.GetWinVarOffset( wv, owner );
////		} else {
////			ret = this.drawWindows[i].simp.GetWinVarOffset( wv, owner );
////		}
////		if ( ret != -1 ) {
////			break;
////		}
////	}
////
////	return ret;
////}
////
/*
================
idWindow::GetWinVarByName
================
*/
	GetWinVarByName ( _name: string, fixup = false, owner: R<drawWin_t> = null ): idWinVar {
		var retVar: idWinVar = null;

		if ( owner ) {
			owner.$ = null;
		}

		if ( idStr.Icmp( _name, "notime" ) == 0 ) {
			retVar = this.noTime;
		}
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
		if ( idStr.Icmp( _name, "hoverColor" ) == 0 ) {
			retVar = this.hoverColor;
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
		if ( idStr.Icmp( _name, "noEvents" ) == 0 ) {
			retVar = this.noEvents;
		}
		if ( idStr.Icmp( _name, "text" ) == 0 ) {
			retVar = this.text;
		}
		if ( idStr.Icmp( _name, "backGroundName" ) == 0 ) {
			retVar = this.backGroundName;
		}
		if ( idStr.Icmp( _name, "hidecursor" ) == 0 ) {
			retVar = this.hideCursor;
		}

		var key = new idStr( _name );
		var guiVar = ( key.Find( VAR_GUIPREFIX ) >= 0 );
		var /*int */c = this.definedVars.Num ( );
		for ( var i = 0; i < c; i++ ) {
			if ( idStr.Icmp( _name, ( guiVar ) ? va( "%s", this.definedVars[i].GetName ( ) ) : this.definedVars[i].GetName ( ) ) == 0 ) {
				retVar = this.definedVars[i];
				break;
			}
		}

		if ( retVar ) {
			if ( fixup && _name != '$' ) {
				this.DisableRegister( _name );
			}

			if ( owner && this.parent ) {
				owner.$ = this.parent.FindChildByName( this.name.data );
			}
			//dlog( DEBUG_GUI, "GetWinVarByName: retVar %s %s\n", retVar.GetName(), retVar.c_str ( ) );
			return retVar;
		}

		var len = key.Length ( );
		if ( len > 5 && guiVar ) {
			var $var: idWinVar = new idWinStr;
			$var.Init( _name, this );
			this.definedVars.Append( $var );
			//dlog(DEBUG_GUI, "GetWinVarByName: $var %s %s\n", $var.GetName(), $var.c_str());
			return $var;
		} else if ( fixup ) {
			var n = key.Find( "::" );
			if ( n > 0 ) {
				var winName = new idStr( key.Left( n ) );
				var $var2 = new idStr( key.Right( key.Length ( ) - n - 2 ) );
				var win: drawWin_t = this.GetGui ( ).GetDesktop ( ).FindChildByName( winName.data );
				if ( win ) {
					if ( win.win ) {
						return win.win.GetWinVarByName( $var2.data, false, owner );
					} else {
						if ( owner ) {
							owner.$ = win;
						}
						return win.simp.GetWinVarByName( $var2.data );
					}
				}
			}
		}
		return null;
	}

/*
================
idWindow::ParseString
================
*/
	ParseString ( src: idParser, out: idStr ): void {
		var tok = new idToken;
		if ( src.ReadToken( tok ) ) {
			out.equals( tok.data );
		}
	}
////
/////*
////================
////idWindow::ParseVec4
////================
////*/
////ParseVec4(idParser *src, idVec4 &out):void {
////	var tok = new idToken;
////	src.ReadToken(tok);
////	out.x = atof(tok);
////	src.ExpectTokenString(",");
////	src.ReadToken(tok);
////	out.y = atof(tok);
////	src.ExpectTokenString(",");
////	src.ReadToken(tok);
////	out.z = atof(tok);
////	src.ExpectTokenString(",");
////	src.ReadToken(tok);
////	out.w = atof(tok);
////}

/*
================
idWindow::ParseInternalVar
================
*/
	ParseInternalVar ( _name: string, src: idParser ): boolean {

		if ( idStr.Icmp( _name, "showtime" ) == 0 ) {
			if ( src.ParseBool ( ) ) {
				this.flags |= WIN_SHOWTIME;
			}
			return true;
		}
		if ( idStr.Icmp( _name, "showcoords" ) == 0 ) {
			if ( src.ParseBool ( ) ) {
				this.flags |= WIN_SHOWCOORDS;
			}
			return true;
		}
		if ( idStr.Icmp( _name, "forceaspectwidth" ) == 0 ) {
			this.forceAspectWidth = src.ParseFloat ( );
			return true;
		}
		if ( idStr.Icmp( _name, "forceaspectheight" ) == 0 ) {
			this.forceAspectHeight = src.ParseFloat ( );
			return true;
		}
		if ( idStr.Icmp( _name, "matscalex" ) == 0 ) {
			this.matScalex = src.ParseFloat ( );
			return true;
		}
		if ( idStr.Icmp( _name, "matscaley" ) == 0 ) {
			this.matScaley = src.ParseFloat ( );
			return true;
		}
		if ( idStr.Icmp( _name, "bordersize" ) == 0 ) {
			this.borderSize = src.ParseFloat ( );
			return true;
		}
		if ( idStr.Icmp( _name, "nowrap" ) == 0 ) {
			if ( src.ParseBool ( ) ) {
				this.flags |= WIN_NOWRAP;
			}
			return true;
		}
		if ( idStr.Icmp( _name, "shadow" ) == 0 ) {
			this.textShadow = src.ParseInt ( );
			return true;
		}
		if ( idStr.Icmp( _name, "textalign" ) == 0 ) {
			this.textAlign = src.ParseInt ( );
			return true;
		}
		if ( idStr.Icmp( _name, "textalignx" ) == 0 ) {
			this.textAlignx = src.ParseFloat ( );
			return true;
		}
		if ( idStr.Icmp( _name, "textaligny" ) == 0 ) {
			this.textAligny = src.ParseFloat ( );
			return true;
		}
		if ( idStr.Icmp( _name, "shear" ) == 0 ) {
			this.shear.x = src.ParseFloat ( );
			var tok = new idToken;
			src.ReadToken( tok );
			if ( tok.Icmp( "," ) ) {
				src.Error( "Expected comma in shear definiation" );
				return false;
			}
			this.shear.y = src.ParseFloat ( );
			return true;
		}
		if ( idStr.Icmp( _name, "wantenter" ) == 0 ) {
			if ( src.ParseBool ( ) ) {
				this.flags |= WIN_WANTENTER;
			}
			return true;
		}
		if ( idStr.Icmp( _name, "naturalmatscale" ) == 0 ) {
			if ( src.ParseBool ( ) ) {
				this.flags |= WIN_NATURALMAT;
			}
			return true;
		}
		if ( idStr.Icmp( _name, "noclip" ) == 0 ) {
			if ( src.ParseBool ( ) ) {
				this.flags |= WIN_NOCLIP;
			}
			return true;
		}
		if ( idStr.Icmp( _name, "nocursor" ) == 0 ) {
			if ( src.ParseBool ( ) ) {
				this.flags |= WIN_NOCURSOR;
			}
			return true;
		}
		if ( idStr.Icmp( _name, "menugui" ) == 0 ) {
			if ( src.ParseBool ( ) ) {
				this.flags |= WIN_MENUGUI;
			}
			return true;
		}
		if ( idStr.Icmp( _name, "modal" ) == 0 ) {
			if ( src.ParseBool ( ) ) {
				this.flags |= WIN_MODAL;
			}
			return true;
		}
		if ( idStr.Icmp( _name, "invertrect" ) == 0 ) {
			if ( src.ParseBool ( ) ) {
				this.flags |= WIN_INVERTRECT;
			}
			return true;
		}
		if ( idStr.Icmp( _name, "name" ) == 0 ) {
			this.ParseString( src, this.name );
			return true;
		}
		if ( idStr.Icmp( _name, "play" ) == 0 ) {
			common.Warning( "play encountered during gui parse.. see Robert\n" );
			var playStr = new idStr;
			this.ParseString( src, playStr );
			return true;
		}
		if ( idStr.Icmp( _name, "comment" ) == 0 ) {
			this.ParseString( src, this.comment );
			return true;
		}
		if ( idStr.Icmp( _name, "font" ) == 0 ) {
			var fontStr = new idStr;
			this.ParseString( src, fontStr );
			this.fontNum = this.dc.FindFont( fontStr.data );
			return true;
		}
		return false;
	}

/*
================
idWindow::ParseRegEntry
================
*/
	ParseRegEntry ( name: string, src: idParser ): boolean {
		var work = new idStr;
		work.equals( name );
		work.ToLower ( );

		var $var = this.GetWinVarByName( work.data, null );
		if ( $var ) {
			for ( var i = 0; i < idWindow.NumRegisterVars; i++ ) {
				if ( idStr.Icmp( work, idWindow.RegisterVars[i].name ) == 0 ) {
					this.regList.AddReg_Parser( work.data, idWindow.RegisterVars[i].type, src, this, $var );
					return true;
				}
			}
		}

		// not predefined so just read the next token and add it to the state
		var tok = new idToken;
		//var v = new idVec4;	
		var vari: idWinInt;
		var varf: idWinFloat;
		var vars: idWinStr;
		if ( src.ReadToken( tok ) ) {
			if ( $var ) {
				$var.Set( tok.data );
				return true;
			}
			switch ( tok.type ) {
			case TT_NUMBER:
				if ( tok.subtype & TT_INTEGER ) {
					vari = new idWinInt ( );
					vari.equalsInt( atoi( tok.data ) );
					vari.SetName( work.data );
					this.definedVars.Append( vari );
				} else if ( tok.subtype & TT_FLOAT ) {
					varf = new idWinFloat ( );
					varf.equalsFloat( atof( tok.data ) );
					varf.SetName( work.data );
					this.definedVars.Append( varf );
				} else {
					vars = new idWinStr ( );
					vars.equalsStr( tok );
					vars.SetName( work.data );
					this.definedVars.Append( vars );
				}
				break;
			default:
				vars = new idWinStr ( );
				vars.equalsStr( tok );
				vars.SetName( work.data );
				this.definedVars.Append( vars );
				break;
			}
		}

		return true;
	}

/*
================
idWindow::SetInitialState
================
*/
	SetInitialState ( _name: string ): void {
		this.name.equals( _name );
		this.matScalex = 1.0;
		this.matScaley = 1.0;
		this.forceAspectWidth = 640.0;
		this.forceAspectHeight = 480.0;
		this.noTime.equalsBool( false );
		this.visible.equalsBool( true );
		this.flags = 0;
	}

/*
================
idWindow::Parse
================
*/
	Parse ( src: idParser, rebuild = true ): boolean {
		var token = new idToken, token2 = new idToken; //, token3, token4, token5, token6, token7;
		var work = new idStr;

		if ( rebuild ) {
			this.CleanUp ( );
		}

		var dwt = new drawWin_t;

		this.timeLineEvents.Clear ( );
		this.transitions.Clear ( );

		this.namedEvents.DeleteContents( true );

		src.ExpectTokenType( TT_NAME, 0, token );

		this.SetInitialState( token.data );

		src.ExpectTokenString( "{" );
		src.ExpectAnyToken( token );

		var ret = true;

		// attach a window wrapper to the window if the gui editor is running
//#ifdef ID_ALLOW_TOOLS
//	if ( com_editors & toolFlag_t.EDITOR_GUI ) {
//		new rvGEWindowWrapper ( this, rvGEWindowWrapper::WT_NORMAL );
//	}
//#endif

		while ( token.data != "}" ) {
			// track what was parsed so we can maintain it for the guieditor
			src.SetMarker ( );

			if ( token.data == "windowDef" || token.data == "animationDef" ) {
				if ( token.data == "animationDef" ) {
					this.visible.equalsBool( false );
					this.rect.equalsRectangle( new idRectangle( 0, 0, 0, 0 ) );
				}
				dlog( DEBUG_GUI, "idWindow::Parse token: %si\n", token.c_str ( ) );
				src.ExpectTokenType( TT_NAME, 0, token );
				token2.equals( token );
				src.UnreadToken( token );
				var dw: drawWin_t = this.FindChildByName( token2.c_str ( ) );
				if ( dw && dw.win ) {
					this.SaveExpressionParseState ( );
					dw.win.Parse( src, rebuild );
					this.RestoreExpressionParseState ( );
				} else {
					var win = new idWindow( this.dc, this.gui );
					this.SaveExpressionParseState ( );
					win.Parse( src, rebuild );
					this.RestoreExpressionParseState ( );
					win.SetParent( this );
					dwt.simp = null;
					dwt.win = null;
					if ( win.IsSimple ( ) ) {
						var simple = new idSimpleWindow( win );
						dwt.simp = simple;
						dlog(DEBUG_GUI, "idWindow::Parse win->IsSimple()\n");
						this.drawWindows.Append(dwt);
						$delete( win );
					} else {
						this.AddChild( win );
						this.SetFocus( win, false );
						dwt.win = win;
						this.drawWindows.Append( dwt );
					}
				}
			} else if ( token.data == "editDef" ) {
				var eWin = new idEditWindow(this.dc, this.gui);
				this.SaveExpressionParseState();
				eWin.Parse(src, rebuild);	
				this.RestoreExpressionParseState();
				this.AddChild(eWin);
				eWin.SetParent(this);
				dwt.simp = null;
				dwt.win = eWin;
				this.drawWindows.Append(dwt);
			} else if ( token.data == "choiceDef" ) {
				var cWin = new idChoiceWindow(this.dc, this.gui);
				this.SaveExpressionParseState();
				cWin.Parse(src, rebuild);	
				this.RestoreExpressionParseState();
				this.AddChild(cWin);
				cWin.SetParent(this);
				dwt.simp = null;
				dwt.win = cWin;
				this.drawWindows.Append(dwt);
			} else if ( token.data == "sliderDef" ) {
				var sWin = new idSliderWindow(this.dc, this.gui);
				this.SaveExpressionParseState();
				sWin.Parse(src, rebuild);	
				this.RestoreExpressionParseState();
				this.AddChild(sWin);
				sWin.SetParent(this);
				dwt.simp = null;
				dwt.win = sWin;
				this.drawWindows.Append(dwt);
			} else if ( token.data == "markerDef" ) {
				var mWin = new idMarkerWindow(this.dc, this.gui);
				this.SaveExpressionParseState();
				mWin.Parse(src, rebuild);	
				this.RestoreExpressionParseState();
				this.AddChild(mWin);
				mWin.SetParent(this);
				dwt.simp = null;
				dwt.win = mWin;
				this.drawWindows.Append(dwt);
			} else if ( token.data == "bindDef" ) {
				var bWin = new idBindWindow(this.dc, this.gui);
				this.SaveExpressionParseState();
				bWin.Parse(src, rebuild);	
				this.RestoreExpressionParseState();
				this.AddChild(bWin);
				bWin.SetParent(this);
				dwt.simp = null;
				dwt.win = bWin;
				this.drawWindows.Append(dwt);
			} else if ( token.data == "listDef" ) {
				var lWin = new idListWindow(this.dc, this.gui);
				this.SaveExpressionParseState();
				lWin.Parse(src, rebuild);	
				this.RestoreExpressionParseState();
				this.AddChild(lWin);
				lWin.SetParent(this);
				dwt.simp = null;
				dwt.win = lWin;
				this.drawWindows.Append(dwt);
			} else if ( token.data == "fieldDef" ) {
				var fWin = new idFieldWindow(this.dc, this.gui);
				this.SaveExpressionParseState();
				fWin.Parse(src, rebuild);	
				this.RestoreExpressionParseState();
				this.AddChild(fWin);
				fWin.SetParent(this);
				dwt.simp = null;
				dwt.win = fWin;
				this.drawWindows.Append(dwt);
			} else if ( token.data == "renderDef" ) {
				var rWin = new idRenderWindow(this.dc, this.gui);
				this.SaveExpressionParseState();
				rWin.Parse(src, rebuild);	
				this.RestoreExpressionParseState();
				this.AddChild(rWin);
				rWin.SetParent(this);
				dwt.simp = null;
				dwt.win = rWin;
				this.drawWindows.Append(dwt);
			} else if ( token.data == "gameSSDDef" ) {
				var gsWin = new idGameSSDWindow(this.dc, this.gui);
				this.SaveExpressionParseState();
				gsWin.Parse(src, rebuild);	
				this.RestoreExpressionParseState();
				this.AddChild(gsWin);
				gsWin.SetParent(this);
				dwt.simp = null;
				dwt.win = gsWin;
				this.drawWindows.Append(dwt);
			} else if ( token.data == "gameBearShootDef" ) {
				var gbWin = new idGameBearShootWindow(this.dc, this.gui);
				this.SaveExpressionParseState();
				gbWin.Parse(src, rebuild);	
				this.RestoreExpressionParseState();
				this.AddChild(gbWin);
				gbWin.SetParent(this);
				dwt.simp = null;
				dwt.win = gbWin;
				this.drawWindows.Append(dwt);
			} else if ( token.data == "gameBustOutDef" ) {
				var gboWin = new idGameBustOutWindow(this.dc, this.gui);
				this.SaveExpressionParseState();
				gboWin.Parse(src, rebuild);	
				this.RestoreExpressionParseState();
				this.AddChild(gboWin);
				gboWin.SetParent(this);
				dwt.simp = null;
				dwt.win = gboWin;
				this.drawWindows.Append(dwt);
			}
// 
//  added new onEvent
			else if ( token.data == "onNamedEvent" ) {
				// Read the event name
				if ( !src.ReadToken( token ) ) {
					src.Error( "Expected event name" );
					return false;
				}

				var evNamed = new rvNamedEvent( token.data );

				src.SetMarker ( );

				if ( !this.ParseScript( src, /***/evNamed.mEvent ) ) {
					ret = false;
					break;
				}

				// If we are in the gui editor then add the internal var to the 
				// the wrapper
//#ifdef ID_ALLOW_TOOLS
//			if ( com_editors & EDITOR_GUI ) {
//				idStr str;
//				idStr out;

//				// Grab the string from the last marker
//				src.GetStringFromMarker ( str, false );

//				// Parse it one more time to knock unwanted tabs out
//				idLexer src2( str, str.Length(), "", src.GetFlags() );
//				src2.ParseBracedSectionExact ( out, 1);

//				// Save the script		
//				rvGEWindowWrapper::GetWrapper ( this ).GetScriptDict().Set ( va("onEvent %s", token.c_str()), out );
//			}
//#endif			
				this.namedEvents.Append( evNamed );
			} else if ( token.data == "onTime" ) {
				var ev = new idTimeLineEvent;

				if ( !src.ReadToken( token ) ) {
					src.Error( "Unexpected end of file" );
					return false;
				}
				ev.time = atoi( token.c_str ( ) );

				// reset the mark since we dont want it to include the time
				src.SetMarker ( );

				var $time = new R( ev.time );
				var parseScriptValue = this.ParseScript( src, /***/ev.event, /*&*/$time );
				ev.time = $time.$;
				if ( !parseScriptValue ) {
					ret = false;
					break;
				}

				// add the script to the wrappers script list
				// If we are in the gui editor then add the internal var to the 
				// the wrapper
//#ifdef ID_ALLOW_TOOLS
//			if ( com_editors & EDITOR_GUI ) {
//				idStr str;
//				idStr out;

//				// Grab the string from the last marker
//				src.GetStringFromMarker ( str, false );

//				// Parse it one more time to knock unwanted tabs out
//				idLexer src2( str, str.Length(), "", src.GetFlags() );
//				src2.ParseBracedSectionExact ( out, 1);

//				// Save the script		
//				rvGEWindowWrapper::GetWrapper ( this ).GetScriptDict().Set ( va("onTime %d", ev.time), out );
//			}
//#endif
				// this is a timeline event
				ev.pending = true;
				this.timeLineEvents.Append( ev );
			} else if ( token.data == "definefloat" ) {
				src.ReadToken( token );
				work.equals( token.data );
				work.ToLower ( );
				var varf = new idWinFloat ( );
				varf.SetName( work.data );
				this.definedVars.Append( varf );

				// add the float to the editors wrapper dict
				// Set the marker after the float name
				src.SetMarker ( );

				// Read in the float 
				this.regList.AddReg_Parser( work.data, REGTYPE.FLOAT, src, this, varf );

				// If we are in the gui editor then add the float to the defines
//#ifdef ID_ALLOW_TOOLS
//			if ( com_editors & EDITOR_GUI ) {
//				idStr str;

//				// Grab the string from the last marker and save it in the wrapper
//				src.GetStringFromMarker ( str, true );							
//				rvGEWindowWrapper::GetWrapper ( this ).GetVariableDict().Set ( va("definefloat\t\"%s\"",token.c_str()), str );
//			}
//#endif
			} else if ( token.data == "definevec4" ) {
				src.ReadToken( token );
				work.equals( token.data );
				work.ToLower ( );
				var $var = new idWinVec4 ( );
				$var.SetName( work.data );

				// set the marker so we can determine what was parsed
				// set the marker after the vec4 name
				src.SetMarker ( );

				// FIXME: how about we add the var to the desktop instead of this window so it won't get deleted
				//        when this window is destoyed which even happens during parsing with simple windows ?
				//definedVars.Append(var);
				this.gui.GetDesktop ( ).definedVars.Append( $var );
				this.gui.GetDesktop ( ).regList.AddReg_Parser( work.data, REGTYPE.VEC4, src, this.gui.GetDesktop ( ), $var );

				// store the original vec4 for the editor
				// If we are in the gui editor then add the float to the defines
//#ifdef ID_ALLOW_TOOLS
//			if ( com_editors & EDITOR_GUI ) {
//				idStr str;

//				// Grab the string from the last marker and save it in the wrapper
//				src.GetStringFromMarker ( str, true );							
//				rvGEWindowWrapper::GetWrapper ( this ).GetVariableDict().Set ( va("definevec4\t\"%s\"",token.c_str()), str );
//			}
//#endif
			} else if ( token.data == "float" ) {
				src.ReadToken( token );
				work.equals( token.data );
				work.ToLower ( );
				var varf = new idWinFloat ( );
				varf.SetName( work.data );
				this.definedVars.Append( varf );

				// add the float to the editors wrapper dict
				// set the marker to after the float name
				src.SetMarker ( );

				// Parse the float
				this.regList.AddReg_Parser( work.data, REGTYPE.FLOAT, src, this, varf );

				// If we are in the gui editor then add the float to the defines
//#ifdef ID_ALLOW_TOOLS
//			if ( com_editors & EDITOR_GUI ) {
//				idStr str;

//				// Grab the string from the last marker and save it in the wrapper
//				src.GetStringFromMarker ( str, true );							
//				rvGEWindowWrapper::GetWrapper ( this ).GetVariableDict().Set ( va("float\t\"%s\"",token.c_str()), str );
//			}
//#endif
			} else if ( this.ParseScriptEntry( token.data, src ) ) {
				// add the script to the wrappers script list
				// If we are in the gui editor then add the internal var to the 
				// the wrapper
//#ifdef ID_ALLOW_TOOLS
//			if ( com_editors & EDITOR_GUI ) {
//				idStr str;
//				idStr out;

//				// Grab the string from the last marker
//				src.GetStringFromMarker ( str, false );

//				// Parse it one more time to knock unwanted tabs out
//				idLexer src2( str, str.Length(), "", src.GetFlags() );
//				src2.ParseBracedSectionExact ( out, 1);

//				// Save the script		
//				rvGEWindowWrapper::GetWrapper ( this ).GetScriptDict().Set ( token, out );
//			}
//#endif
			} else if ( this.ParseInternalVar( token.data, src ) ) {
				// gui editor support		
				// If we are in the gui editor then add the internal var to the 
				// the wrapper
//#ifdef ID_ALLOW_TOOLS
//			if ( com_editors & EDITOR_GUI ) {
//				idStr str;
//				src.GetStringFromMarker ( str );
//				rvGEWindowWrapper::GetWrapper ( this ).SetStateKey ( token, str, false );
//			}
//#endif
			} else {
				this.ParseRegEntry( token.data, src );
				// hook into the main window parsing for the gui editor
				// If we are in the gui editor then add the internal var to the 
				// the wrapper
//#ifdef ID_ALLOW_TOOLS
//			if ( com_editors & EDITOR_GUI ) {
//				idStr str;
//				src.GetStringFromMarker ( str );
//				rvGEWindowWrapper::GetWrapper ( this ).SetStateKey ( token, str, false );
//			}
//#endif
			}
			if ( !src.ReadToken( token ) ) {
				src.Error( "Unexpected end of file" );
				ret = false;
				break;
			}
		}

		if ( ret ) {
			this.EvalRegs( -1, true );
		}

		this.SetupFromState ( );
		this.PostParse ( );

		// hook into the main window parsing for the gui editor
		// If we are in the gui editor then add the internal var to the 
		// the wrapper
//#ifdef ID_ALLOW_TOOLS
//	if ( com_editors & EDITOR_GUI ) {
//		rvGEWindowWrapper::GetWrapper ( this ).Finish ( );
//	}
//#endif

		return ret;
	}
////
/////*
////================
////idWindow::FindSimpleWinByName
////================
////*/
////idSimpleWindow *idWindow::FindSimpleWinByName(_name:string) {
////	int c = this.drawWindows.Num();
////	for (var i = 0; i < c; i++) {
////		if (this.drawWindows[i].simp == NULL) {
////			continue;
////		}
////		if ( idStr.Icmp(this.drawWindows[i].simp.name, _name) == 0 ) {
////			return this.drawWindows[i].simp;
////		} 
////	}
////	return NULL;
////}
////
/*
================
idWindow::FindChildByName
================
*/
	private static dw = new drawWin_t;
	FindChildByName ( _name: string ): drawWin_t {
		if ( idStr.Icmp( this.name, _name ) == 0 ) {
			idWindow.dw.simp = null;
			idWindow.dw.win = this;
			dlog(DEBUG_GUI, "idWindow::FindChildByName return &dw;\n");
			return idWindow.dw;
		}
		var c = this.drawWindows.Num();
		dlog( DEBUG_GUI, "idWindow::FindChildByName %s, c: %i\n", _name, c );
		for ( var i = 0; i < c; i++ ) {
			if ( this.drawWindows[i].win ) {
				dlog( DEBUG_GUI, "idWindow::FindChildByName  drawWindows[i].win->name: %s\n", this.drawWindows[i].win.name.c_str ( ) );
				if ( idStr.Icmp( this.drawWindows[i].win.name, _name ) == 0 ) {
					dlog(DEBUG_GUI, "idWindow::FindChildByName  &drawWindows[i];\n");
					return this.drawWindows[i];
				}
				var win = this.drawWindows[i].win.FindChildByName( _name );
				if ( win ) {
					dlog(DEBUG_GUI, "idWindow::FindChildByName return win;\n");
					return win;
				}
			} else {
				dlog(DEBUG_GUI, "idWindow::FindChildByName  drawWindows[i].simp->name: %s\n", this.drawWindows[i].simp.name.c_str());
				if ( idStr.Icmp( this.drawWindows[i].simp.name, _name ) == 0 ) {
					dlog(DEBUG_GUI, "idWindow::FindChildByName return return &drawWindows[i];\n");
					return this.drawWindows[i];
				}
			}
		}
		return null;
	}

/////*
////================
////idWindow::GetStrPtrByName
////================
////*/
////idStr* idWindow::GetStrPtrByName(_name:string) {
////	return NULL;
////}
////
/////*
////================
////idWindow::AddTransition
////================
////*/
////AddTransition(idWinVar *dest, idVec4 from, idVec4 to, int time, float accelTime, float decelTime):void {
////	idTransitionData data;
////	data.data = dest;
////	data.interp.Init(gui.GetTime(), accelTime * time, decelTime * time, time, from, to);
////	transitions.Append(data);
////}
////
////
/////*
////================
////idWindow::StartTransition
////================
////*/
////StartTransition():void {
////	this.flags |= WIN_INTRANSITION;
////}
////
/////*
////================
////idWindow::ResetCinematics
////================
////*/
////ResetCinematics():void {
////	if ( this.background ) {
////		this.background.ResetCinematicTime( gui.GetTime() );
////	}
////}
////
/////*
////================
////idWindow::ResetTime
////================
////*/
////ResetTime(int t):void {
////
////	this.timeLine = gui.GetTime() - t;
////
////	int i, c = this.timeLineEvents.Num();
////	for ( i = 0; i < c; i++ ) {
////		if ( this.timeLineEvents[i].time >= t ) {
////			this.timeLineEvents[i].pending = true;
////		}
////	}
////
////	this.noTime = false;
////
////	c = transitions.Num();
////	for ( i = 0; i < c; i++ ) {
////		idTransitionData *data = &transitions[i];
////		if ( data.interp.IsDone( gui.GetTime() ) && data.data ) {
////			transitions.RemoveIndex( i );
////			i--;
////			c--;
////		}
////	}
////
////}
////
////
/////*
////================
////idWindow::RunScriptList
////================
////*/
////bool idWindow::RunScriptList(idGuiScriptList *src) {
////	if (src == NULL) {
////		return false;
////	}
////	src.Execute(this);
////	return true;
////}
////
/////*
////================
////idWindow::RunScript
////================
////*/
////bool idWindow::RunScript(int n) {
////	if (n >= ON_MOUSEENTER && n < SCRIPT_COUNT) {
////		return RunScriptList(this.scripts[n]);
////	}
////	return false;
////}
////
/*
================
idWindow::ExpressionConstant
================
*/
	ExpressionConstant ( /*float */f: number ): number {
		var /*int*/i: number;

		dlog(DEBUG_GUI, "ExpressionConstant %.2f\n", f);
		for ( i = wexpRegister_t.WEXP_REG_NUM_PREDEFINED; i < this.expressionRegisters.Num ( ); i++ ) {
			if ( !idWindow.registerIsTemporary[i] && this.expressionRegisters[i] == f ) {
				return i;
			}
		}
		if ( this.expressionRegisters.Num ( ) == MAX_EXPRESSION_REGISTERS ) {
			common.Warning( "expressionConstant: gui %s hit MAX_EXPRESSION_REGISTERS", this.gui.GetSourceFile ( ) );
			return 0;
		}

		var /*int */c = this.expressionRegisters.Num ( );
		if ( i > c ) {
			while ( i > c ) {
				this.expressionRegisters.Append( -9999999 );
				i--;
			}
		}

		i = this.expressionRegisters.Append( f );
		idWindow.registerIsTemporary[i] = false;
		return i;
	}

/*
================
idWindow::ExpressionTemporary
================
*/
	ExpressionTemporary ( ): number {
		if ( this.expressionRegisters.Num ( ) == MAX_EXPRESSION_REGISTERS ) {
			common.Warning( "expressionTemporary: gui %s hit MAX_EXPRESSION_REGISTERS", this.gui.GetSourceFile ( ) );
			return 0;
		}
		var i = this.expressionRegisters.Num ( );
		idWindow.registerIsTemporary[i] = true;
		i = this.expressionRegisters.Append( 0 );
		return i;
	}

/*
================
idWindow::ExpressionOp
================
*/
	ExpressionOp ( ): wexpOp_t {
		if ( this.ops.Num ( ) == MAX_EXPRESSION_OPS ) {
			common.Warning( "expressionOp: gui %s hit MAX_EXPRESSION_OPS", this.gui.GetSourceFile ( ) );
			return this.ops[0];
		}
		var wop = new wexpOp_t;
		wop.memset0 ( ); //memset(&wop, 0, sizeof(wexpOp_t));
		var i = this.ops.Append( wop );
		return this.ops[i];
	}

/*
================
idWindow::EmitOp
================
*/

	EmitOp ( /*int */a: number, /*int */b: number, opType: wexpOpType_t, /****/opp: R<wexpOp_t> = null ):number {
		var op: wexpOp_t;
/*
	// optimize away identity operations
	if ( opType == wexpOpType_t.WOP_TYPE_ADD ) {
		if ( !idWindow.registerIsTemporary[a] && shaderRegisters[a] == 0 ) {
			return b;
		}
		if ( !idWindow.registerIsTemporary[b] && shaderRegisters[b] == 0 ) {
			return a;
		}
		if ( !idWindow.registerIsTemporary[a] && !idWindow.registerIsTemporary[b] ) {
			return this.ExpressionConstant( shaderRegisters[a] + shaderRegisters[b] );
		}
	}
	if ( opType == wexpOpType_t.WOP_TYPE_MULTIPLY ) {
		if ( !idWindow.registerIsTemporary[a] && shaderRegisters[a] == 1 ) {
			return b;
		}
		if ( !idWindow.registerIsTemporary[a] && shaderRegisters[a] == 0 ) {
			return a;
		}
		if ( !idWindow.registerIsTemporary[b] && shaderRegisters[b] == 1 ) {
			return a;
		}
		if ( !idWindow.registerIsTemporary[b] && shaderRegisters[b] == 0 ) {
			return b;
		}
		if ( !idWindow.registerIsTemporary[a] && !idWindow.registerIsTemporary[b] ) {
			return this.ExpressionConstant( shaderRegisters[a] * shaderRegisters[b] );
		}
	}
*/
		op = this.ExpressionOp ( );

		op.opType = opType;
		op.a = a;
		op.b = b;
		op.c = this.ExpressionTemporary ( );

		if ( opp ) {
			opp.$ = op;
		}
		return op.c;
	}

/*
================
idWindow::ParseEmitOp
================
*/
	ParseEmitOp ( src: idParser, /*int */a: number, opType: wexpOpType_t, /*int */priority: number, opp: R<wexpOp_t> = null ): number {
		var b = this.ParseExpressionPriority( src, priority );
		return this.EmitOp( a, b, opType, opp );
	}


/*
================
idWindow::ParseTerm

Returns a register index
=================
*/
	static uglyCount = 0;
	ParseTerm ( src: idParser, /***/$var: idWinVar = null, /*int*/ component = 0 ): number {
		var token = new idToken;
		var /*int*/ a: number, b: number;

		src.ReadToken(token);

		dlog(DEBUG_GUI, "ParseTerm %s\n", token.c_str());

		if ( token.data == "(" ) {
			a = this.ParseExpression( src );
			src.ExpectTokenString( ")" );
			return a;
		}

		if ( !token.Icmp( "time" ) ) {
			return wexpRegister_t.WEXP_REG_TIME;
		}

		// parse negative numbers
		if ( token.data == "-" ) {
			src.ReadToken( token );
			if ( token.type == TT_NUMBER || token.data == "." ) {
				return this.ExpressionConstant( - /*(float)*/ token.GetFloatValue ( ) );
			}
			src.Warning( "Bad negative number '%s'", token.c_str ( ) );
			return 0;
		}

		if ( token.type == TT_NUMBER || token.data == "." || token.data == "-" ) {
			return this.ExpressionConstant( /*(float) */token.GetFloatValue ( ) );
		}

		// see if it is a table name
		var table = <idDeclTable>( declManager.FindType( declType_t.DECL_TABLE, token.c_str ( ), false ) );
		if ( table ) {
			a = table.Index ( );
			// parse a table expression
			src.ExpectTokenString( "[" );
			b = this.ParseExpression( src );
			src.ExpectTokenString( "]" );
			return this.EmitOp( a, b, wexpOpType_t.WOP_TYPE_TABLE );
		}

		if ( $var == null ) {
			$var = this.GetWinVarByName( token.data, true );
		}
		if ( $var ) {
			a = /*( int )*/$var.refAddress;
			//assert(dynamic_cast<idWinVec4*>($var));
			$var.Init( token.data, this );
			b = component;
			if ( $var instanceof idWinVec4 /*dynamic_cast<idWinVec4*>($var)*/ ) {
				if ( src.ReadToken( token ) ) {
					if ( token.data == "[" ) {
						b = this.ParseExpression( src );
						src.ExpectTokenString( "]" );
					} else {
						src.UnreadToken( token );
					}
				}
				return this.EmitOp( a, b, wexpOpType_t.WOP_TYPE_VAR );
			} else if ( $var instanceof idWinFloat /*dynamic_cast<idWinFloat*>($var)*/ ) {
				return this.EmitOp( a, b, wexpOpType_t.WOP_TYPE_VARF );
			} else if ( $var instanceof idWinInt /*dynamic_cast<idWinInt*>($var)*/ ) {
				return this.EmitOp( a, b, wexpOpType_t.WOP_TYPE_VARI );
			} else if ( $var instanceof idWinBool /*dynamic_cast<idWinBool*>($var)*/ ) {
				return this.EmitOp( a, b, wexpOpType_t.WOP_TYPE_VARB );
			} else if ( $var instanceof idWinStr /*dynamic_cast<idWinStr*>($var)*/ ) {
				return this.EmitOp( a, b, wexpOpType_t.WOP_TYPE_VARS );
			} else {
				src.Warning( "Var expression not vec4, float or int '%s'", token.c_str ( ) );
			}
			return 0;
		} else {
			// ugly but used for post parsing to fixup named vars
			var p = new idStr( token ); //char *p = new char[token.Length()+1];
			//strcpy(p, token);
			dlog( DEBUG_GUI, "ugly '%s' %i\n", p.data, idWindow.uglyCount );
			idWindow.uglyCount++;
			objectTracker.addObject( p );
			a = p.refAddress; //a = (int)p
			b = -2;
			return this.EmitOp( a, b, wexpOpType_t.WOP_TYPE_VAR );
		}
	}

/*
=================
idWindow::ParseExpressionPriority

Returns a register index
=================
*/
static TOP_PRIORITY = 4;
	ParseExpressionPriority ( src: idParser, /*int*/ priority: number, $var: idWinVar = null, /*int */component = 0 ): number {
		var token = new idToken;
		var /*int		*/a: number;

		if ( priority == 0 ) {
			return this.ParseTerm( src, $var, component );
		}

		a = this.ParseExpressionPriority( src, priority - 1, $var, component );

		if ( !src.ReadToken( token ) ) {
			// we won't get EOF in a real file, but we can
			// when parsing from generated strings
			return a;
		}

		if ( priority == 1 && token.data == "*" ) {
			return this.ParseEmitOp( src, a, wexpOpType_t.WOP_TYPE_MULTIPLY, priority );
		}
		if ( priority == 1 && token.data == "/" ) {
			return this.ParseEmitOp( src, a, wexpOpType_t.WOP_TYPE_DIVIDE, priority );
		}
		if ( priority == 1 && token.data == "%" ) { // implied truncate both to integer
			return this.ParseEmitOp( src, a, wexpOpType_t.WOP_TYPE_MOD, priority );
		}
		if ( priority == 2 && token.data == "+" ) {
			return this.ParseEmitOp( src, a, wexpOpType_t.WOP_TYPE_ADD, priority );
		}
		if ( priority == 2 && token.data == "-" ) {
			return this.ParseEmitOp( src, a, wexpOpType_t.WOP_TYPE_SUBTRACT, priority );
		}
		if ( priority == 3 && token.data == ">" ) {
			return this.ParseEmitOp( src, a, wexpOpType_t.WOP_TYPE_GT, priority );
		}
		if ( priority == 3 && token.data == ">=" ) {
			return this.ParseEmitOp( src, a, wexpOpType_t.WOP_TYPE_GE, priority );
		}
		if ( priority == 3 && token.data == "<" ) {
			return this.ParseEmitOp( src, a, wexpOpType_t.WOP_TYPE_LT, priority );
		}
		if ( priority == 3 && token.data == "<=" ) {
			return this.ParseEmitOp( src, a, wexpOpType_t.WOP_TYPE_LE, priority );
		}
		if ( priority == 3 && token.data == "==" ) {
			return this.ParseEmitOp( src, a, wexpOpType_t.WOP_TYPE_EQ, priority );
		}
		if ( priority == 3 && token.data == "!=" ) {
			return this.ParseEmitOp( src, a, wexpOpType_t.WOP_TYPE_NE, priority );
		}
		if ( priority == 4 && token.data == "&&" ) {
			return this.ParseEmitOp( src, a, wexpOpType_t.WOP_TYPE_AND, priority );
		}
		if ( priority == 4 && token.data == "||" ) {
			return this.ParseEmitOp( src, a, wexpOpType_t.WOP_TYPE_OR, priority );
		}
		if ( priority == 4 && token.data == "?" ) {
			var oop = new R<wexpOp_t> ( );
			var o = this.ParseEmitOp( src, a, wexpOpType_t.WOP_TYPE_COND, priority, /*&*/oop );
			if ( !src.ReadToken( token ) ) {
				return o;
			}
			if ( token.data == ":" ) {
				a = this.ParseExpressionPriority( src, priority - 1, $var );
				oop.$.d = a;
			}
			return o;
		}

		// assume that anything else terminates the expression
		// not too robust error checking...

		src.UnreadToken( token );

		return a;
	}

/*
================
idWindow::ParseExpression

Returns a register index
================
*/
	ParseExpression ( src: idParser, $var: idWinVar = null, /*int*/ component = 0): number {
		return this.ParseExpressionPriority( src, idWindow.TOP_PRIORITY, $var );
	}

/*
================
idWindow::ParseBracedExpression
================
*/
	ParseBracedExpression ( src: idParser ): void {
		src.ExpectTokenString( "{" );
		this.ParseExpression( src );
		src.ExpectTokenString( "}" );
	}

/*
===============
idWindow::EvaluateRegisters

Parameters are taken from the localSpace and the renderView,
then all expressions are evaluated, leaving the shader registers
set to their apropriate values.
===============
*/
EvaluateRegisters(/*float **/registers:Float32Array):void {
	var/*int*/i: number, b: number;
	var op: wexpOp_t;
	var v = new idVec4;

	var/*int */erc = this.expressionRegisters.Num();
	var/*int */oc = this.ops.Num();
	// copy the constants
	for ( i = wexpRegister_t.WEXP_REG_NUM_PREDEFINED ; i < erc ; i++ ) {
		registers[i] = this.expressionRegisters[i];
	}

	// copy the local and global parameters
	registers[wexpRegister_t.WEXP_REG_TIME] = this.gui.GetTime();

	for ( i = 0 ; i < oc ; i++ ) {
		op = /*&*/this.ops[i];
		if (op.b == -2) {
			continue;
		}
		switch( op.opType ) {
		case wexpOpType_t.WOP_TYPE_ADD:
			registers[op.c] = registers[op.a] + registers[op.b];
			break;
		case wexpOpType_t.WOP_TYPE_SUBTRACT:
			registers[op.c] = registers[op.a] - registers[op.b];
			break;
		case wexpOpType_t.WOP_TYPE_MULTIPLY:
			registers[op.c] = registers[op.a] * registers[op.b];
			break;
		case wexpOpType_t.WOP_TYPE_DIVIDE:
			if ( registers[op.b] == 0.0 ) {
				common.Warning( "Divide by zero in window '%s' in %s", this.GetName(), this.gui.GetSourceFile() );
				registers[op.c] = registers[op.a];
			} else {
				registers[op.c] = registers[op.a] / registers[op.b];
			}
			break;
		case wexpOpType_t.WOP_TYPE_MOD:
			b = /*(int)*/int(registers[op.b]);
			b = b != 0 ? b : 1;
			registers[op.c] = /*(int)*/int(registers[op.a] % b);
			break;
		case wexpOpType_t.WOP_TYPE_TABLE:
			{
				var table = <idDeclTable>(declManager.DeclByIndex( declType_t.DECL_TABLE, op.a ) );
				registers[op.c] = table.TableLookup( registers[op.b] );
			}
			break;
		case wexpOpType_t.WOP_TYPE_GT:
			registers[op.c] = registers[ op.a ] > registers[op.b] ? 1 : 0;
			break;
		case wexpOpType_t.WOP_TYPE_GE:
			registers[op.c] = registers[op.a] >= registers[op.b] ? 1 : 0;
			break;
		case wexpOpType_t.WOP_TYPE_LT:
			registers[op.c] = registers[op.a] < registers[op.b] ? 1 : 0;
			break;
		case wexpOpType_t.WOP_TYPE_LE:
			registers[op.c] = registers[op.a] <= registers[op.b] ? 1 : 0;
			break;
		case wexpOpType_t.WOP_TYPE_EQ:
			registers[op.c] = registers[op.a] == registers[op.b] ? 1 : 0;
			break;
		case wexpOpType_t.WOP_TYPE_NE:
			registers[op.c] = registers[op.a] != registers[op.b] ? 1 : 0;
			break;
		case wexpOpType_t.WOP_TYPE_COND:
			registers[op.c] = (registers[ op.a ]) ? registers[op.b] : registers[op.d];
			break;
		case wexpOpType_t.WOP_TYPE_AND:
			registers[op.c] = registers[ op.a ] && registers[op.b];
			break;
		case wexpOpType_t.WOP_TYPE_OR:
			registers[op.c] = registers[ op.a ] || registers[op.b];
			break;
		case wexpOpType_t.WOP_TYPE_VAR:
			if ( !op.a ) {
				registers[op.c] = 0.0;
				break;
			}
			if ( op.b >= 0 && registers[op.b] >= 0 && registers[op.b] < 4 ) {
				// grabs vector components
				var vec4Var = <idWinVec4>objectTracker.getObject(op.a, idWinVec4 ); //idWinVec4 *var = (idWinVec4 *)( op.a );
				registers[op.c] = ( <idVec4>vec4Var.data )[registers[op.b]]; //((idVec4&)var)[registers[op.b]];
			} else {
				registers[op.c] = ( <idWinVar>objectTracker.getObject( op.a, idWinVec4 ) ).x ( ); // ((idWinVar*)(op.a)).x();
			}
			break;
		case wexpOpType_t.WOP_TYPE_VARS:
			if (op.a) {
				var strVar = <idWinStr>objectTracker.getObject( op.a, idWinStr ); //idWinStr *var = (idWinStr*)(op.a);
				registers[op.c] = atof( strVar.c_str ( ) );
			} else {
				registers[op.c] = 0;
			}
			break;
		case wexpOpType_t.WOP_TYPE_VARF:
			if (op.a) {
				var floatVar = <idWinFloat>objectTracker.getObject(op.a, idWinFloat);   //idWinFloat *var = (idWinFloat*)(op.a);
				registers[op.c] = floatVar.data; //*var;
			} else {
				registers[op.c] = 0;
			}
			break;
		case wexpOpType_t.WOP_TYPE_VARI:
			if (op.a) {
				var intVar = <idWinInt>objectTracker.getObject(op.a, idWinInt); //idWinInt *var = (idWinInt*)(op.a);
				registers[op.c] = intVar.data;
			} else {
				registers[op.c] = 0;
			}
			break;
		case wexpOpType_t.WOP_TYPE_VARB:
			if (op.a) {
				var boolVar = <idWinBool>objectTracker.getObject(op.a, idWinBool);//idWinBool *var = (idWinBool*)(op.a);
				registers[op.c] = boolVar.data ? 1 : 0;
			} else {
				registers[op.c] = 0;
			}
			break;
		default:
			common.FatalError( "R_EvaluateExpression: bad opcode" );
		}
	}

}
////
/////*
////================
////idWindow::ReadFromDemoFile
////================
////*/
////ReadFromDemoFile( class idDemoFile *f, bool rebuild ):void {
////
////	// should never hit unless we re-enable WRITE_GUIS
////#ifndef WRITE_GUIS
////	assert( false );
////#else
////
////	if (rebuild) {
////		this.CommonInit();
////	}
////	
////	f.SetLog(true, "window1");
////	this.backGroundName = f.ReadHashString();
////	f.SetLog(true, this.backGroundName);
////	if ( this.backGroundName[0] ) {
////		this.background = declManager.FindMaterial(this.backGroundName);
////	} else {
////		this.background = NULL;
////	}
////	f.ReadUnsignedChar( this.cursor );
////	f.ReadUnsignedInt( this.flags );
////	f.ReadInt( this.timeLine );
////	f.ReadInt( this.lastTimeRun );
////	idRectangle rct = this.rect;
////	f.ReadFloat( rct.x );
////	f.ReadFloat( rct.y );
////	f.ReadFloat( rct.w );
////	f.ReadFloat( rct.h );
////	f.ReadFloat( this.drawRect.x );
////	f.ReadFloat( this.drawRect.y );
////	f.ReadFloat( this.drawRect.w );
////	f.ReadFloat( this.drawRect.h );
////	f.ReadFloat( this.clientRect.x );
////	f.ReadFloat( this.clientRect.y );
////	f.ReadFloat( this.clientRect.w );
////	f.ReadFloat( this.clientRect.h );
////	f.ReadFloat( this.textRect.x );
////	f.ReadFloat( this.textRect.y );
////	f.ReadFloat( this.textRect.w );
////	f.ReadFloat( this.textRect.h );
////	f.ReadFloat( this.xOffset);
////	f.ReadFloat( this.yOffset);
////	int i, c;
////
////	idStr work;
////	if (rebuild) {
////		f.SetLog(true, (work + "-scripts"));
////		for (i = 0; i < SCRIPT_COUNT; i++) {
////			bool b;
////			f.ReadBool( b );
////			if (b) {
////				delete this.scripts[i];
////				this.scripts[i] = new idGuiScriptList;
////				this.scripts[i].ReadFromDemoFile(f);
////			}
////		}
////
////		f.SetLog(true, (work + "-timelines"));
////		f.ReadInt( c );
////		for (i = 0; i < c; i++) {
////			idTimeLineEvent *tl = new idTimeLineEvent;
////			f.ReadInt( tl.time );
////			f.ReadBool( tl.pending );
////			tl.event.ReadFromDemoFile(f);
////			if (rebuild) {
////				this.timeLineEvents.Append(tl);
////			} else {
////				assert(i < this.timeLineEvents.Num());
////				this.timeLineEvents[i].time = tl.time;
////				this.timeLineEvents[i].pending = tl.pending;
////			}
////		}
////	}
////
////	f.SetLog(true, (work + "-transitions"));
////	f.ReadInt( c );
////	for (i = 0; i < c; i++) {
////		idTransitionData td;
////		td.data = NULL;
////		f.ReadInt ( td.offset );
////
////		float startTime, accelTime, linearTime, decelTime;
////		idVec4 startValue, endValue;	   
////		f.ReadFloat( startTime );
////		f.ReadFloat( accelTime );
////		f.ReadFloat( linearTime );
////		f.ReadFloat( decelTime );
////		f.ReadVec4( startValue );
////		f.ReadVec4( endValue );
////		td.interp.Init( startTime, accelTime, decelTime, accelTime + linearTime + decelTime, startValue, endValue );
////		
////		// read this for correct data padding with the win32 savegames
////		// the extrapolate is correctly initialized through the above Init call
////		int extrapolationType;
////		float duration;
////		idVec4 baseSpeed, speed;
////		float currentTime;
////		idVec4 currentValue;
////		f.ReadInt( extrapolationType );
////		f.ReadFloat( startTime );
////		f.ReadFloat( duration );
////		f.ReadVec4( startValue );
////		f.ReadVec4( baseSpeed );
////		f.ReadVec4( speed );
////		f.ReadFloat( currentTime );
////		f.ReadVec4( currentValue );
////
////		transitions.Append(td);
////	}
////
////	f.SetLog(true, (work + "-regstuff"));
////	if (rebuild) {
////		f.ReadInt( c );
////		for (i = 0; i < c; i++) {
////			wexpOp_t w;
////			f.ReadInt( (int&)w.opType );
////			f.ReadInt( w.a );
////			f.ReadInt( w.b );
////			f.ReadInt( w.c );
////			f.ReadInt( w.d );
////			this.ops.Append(w);
////		}
////
////		f.ReadInt( c );
////		for (i = 0; i < c; i++) {
////			float ff;
////			f.ReadFloat( ff );
////			this.expressionRegisters.Append(ff);
////		}
////	
////		this.regList.ReadFromDemoFile(f);
////
////	}
////	f.SetLog(true, (work + "-children"));
////	f.ReadInt( c );
////	for (i = 0; i < c; i++) {
////		if (rebuild) {
////			idWindow *win = new idWindow(this.dc, gui);
////			win.ReadFromDemoFile(f);
////			this.AddChild(win);
////		} else {
////			for (int j = 0; j < c; j++) {
////				if (children[j].childID == i) {
////					children[j].ReadFromDemoFile(f,rebuild);
////					break;
////				} else {
////					continue;
////				}
////			}
////		}
////	}
////#endif /* WRITE_GUIS */
////}
////
/////*
////================
////idWindow::WriteToDemoFile
////================
////*/
////WriteToDemoFile( class idDemoFile *f ):void {
////	// should never hit unless we re-enable WRITE_GUIS
////#ifndef WRITE_GUIS
////	assert( false );
////#else
////
////	f.SetLog(true, "window");
////	f.WriteHashString(this.backGroundName);
////	f.SetLog(true, this.backGroundName);
////	f.WriteUnsignedChar( this.cursor );
////	f.WriteUnsignedInt( this.flags );
////	f.WriteInt( this.timeLine );
////	f.WriteInt( this.lastTimeRun );
////	idRectangle rct = this.rect;
////	f.WriteFloat( rct.x );
////	f.WriteFloat( rct.y );
////	f.WriteFloat( rct.w );
////	f.WriteFloat( rct.h );
////	f.WriteFloat( this.drawRect.x );
////	f.WriteFloat( this.drawRect.y );
////	f.WriteFloat( this.drawRect.w );
////	f.WriteFloat( this.drawRect.h );
////	f.WriteFloat( this.clientRect.x );
////	f.WriteFloat( this.clientRect.y );
////	f.WriteFloat( this.clientRect.w );
////	f.WriteFloat( this.clientRect.h );
////	f.WriteFloat( this.textRect.x );
////	f.WriteFloat( this.textRect.y );
////	f.WriteFloat( this.textRect.w );
////	f.WriteFloat( this.textRect.h );
////	f.WriteFloat( this.xOffset );
////	f.WriteFloat( this.yOffset );
////	idStr work;
////	f.SetLog(true, work);
////
//// 	int i, c;
////
////	f.SetLog(true, (work + "-transitions"));
////	c = transitions.Num();
////	f.WriteInt( c );
////	for (i = 0; i < c; i++) {
////		f.WriteInt( 0 );
////		f.WriteInt( transitions[i].offset );
////		
////		f.WriteFloat( transitions[i].interp.GetStartTime() );
////		f.WriteFloat( transitions[i].interp.GetAccelTime() );
////		f.WriteFloat( transitions[i].interp.GetLinearTime() );
////		f.WriteFloat( transitions[i].interp.GetDecelTime() );
////		f.WriteVec4( transitions[i].interp.GetStartValue() );
////		f.WriteVec4( transitions[i].interp.GetEndValue() );
////
////		// write to keep win32 render demo format compatiblity - we don't actually read them back anymore
////		f.WriteInt( transitions[i].interp.GetExtrapolate().GetExtrapolationType() );
////		f.WriteFloat( transitions[i].interp.GetExtrapolate().GetStartTime() );
////		f.WriteFloat( transitions[i].interp.GetExtrapolate().GetDuration() );
////		f.WriteVec4( transitions[i].interp.GetExtrapolate().GetStartValue() );
////		f.WriteVec4( transitions[i].interp.GetExtrapolate().GetBaseSpeed() );
////		f.WriteVec4( transitions[i].interp.GetExtrapolate().GetSpeed() );
////		f.WriteFloat( transitions[i].interp.GetExtrapolate().GetCurrentTime() );
////		f.WriteVec4( transitions[i].interp.GetExtrapolate().GetCurrentValue() );
////	}
////
////	f.SetLog(true, (work + "-regstuff"));
////
////	f.SetLog(true, (work + "-children"));
////	c = this.children.Num();
////	f.WriteInt( c );
////	for (i = 0; i < c; i++) {
////		for (int j = 0; j < c; j++) {
////			if (children[j].childID == i) {
////				children[j].WriteToDemoFile(f);
////				break;
////			} else {
////				continue;
////			}
////		}
////	}
////#endif /* WRITE_GUIS */
////}
////
/////*
////===============
////idWindow::WriteString
////===============
////*/
////WriteSaveGameString( const char *string, idFile *savefile ):void {
////	int len = strlen( string );
////
////	savefile.Write( &len, sizeof( len ) );
////	savefile.Write( string, len );
////}
////
/////*
////===============
////idWindow::WriteSaveGameTransition
////===============
////*/
////WriteSaveGameTransition( idTransitionData &trans, idFile *savefile ):void {
////	drawWin_t dw, *fdw;
////	idStr winName("");
////	dw.simp = NULL;
////	dw.win = NULL;
////	int offset = gui.GetDesktop().GetWinVarOffset( trans.data, &dw );
////	if ( dw.win || dw.simp ) {
////		winName = ( dw.win ) ? dw.win.GetName() : dw.simp.name.c_str();
////	}
////	fdw = gui.GetDesktop().FindChildByName( winName );
////	if ( offset != -1 && fdw && ( fdw.win || fdw.simp ) ) {
////		savefile.Write( &offset, sizeof( offset ) );
////		WriteSaveGameString( winName, savefile );
////		savefile.Write( &trans.interp, sizeof( trans.interp ) );
////	} else {
////		offset = -1;
////		savefile.Write( &offset, sizeof( offset ) );
////	}
////}
////
/////*
////===============
////idWindow::ReadSaveGameTransition
////===============
////*/
////ReadSaveGameTransition( idTransitionData &trans, idFile *savefile ):void {
////	int offset;
////
////	savefile.Read( &offset, sizeof( offset ) );
////	if ( offset != -1 ) {
////		idStr winName;
////		ReadSaveGameString( winName, savefile );
////		savefile.Read( &trans.interp, sizeof( trans.interp ) );
////		trans.data = NULL;
////		trans.offset = offset;
////		if ( winName.Length() ) {
////			idWinStr *strVar = new idWinStr();
////			strVar.Set( winName );
////			trans.data = dynamic_cast< idWinVar* >( strVar );
////		}
////	}
////}
////
/////*
////===============
////idWindow::WriteToSaveGame
////===============
////*/
////WriteToSaveGame( idFile *savefile ):void {
////	var/*int*/i:number;
////
////	WriteSaveGameString( cmd, savefile );
////
////	savefile.Write( &this.actualX, sizeof( this.actualX ) );
////	savefile.Write( &this.actualY, sizeof( this.actualY ) );
////	savefile.Write( &childID, sizeof( childID ) );
////	savefile.Write( &flags, sizeof( this.flags ) );
////	savefile.Write( &this.lastTimeRun, sizeof( this.lastTimeRun ) );
////	savefile.Write( &this.drawRect, sizeof( this.drawRect ) );
////	savefile.Write( &this.clientRect, sizeof( this.clientRect ) );
////	savefile.Write( &this.origin, sizeof( this.origin ) );
////	savefile.Write( &this.fontNum, sizeof( this.fontNum ) );
////	savefile.Write( &this.timeLine, sizeof( this.timeLine ) );
////	savefile.Write( &this.xOffset, sizeof( this.xOffset ) );
////	savefile.Write( &this.yOffset, sizeof( this.yOffset ) );
////	savefile.Write( &this.cursor, sizeof( this.cursor ) );
////	savefile.Write( &this.forceAspectWidth, sizeof( this.forceAspectWidth ) );
////	savefile.Write( &this.forceAspectHeight, sizeof( this.forceAspectHeight ) );
////	savefile.Write( &this.matScalex, sizeof( this.matScalex ) );
////	savefile.Write( &this.matScaley, sizeof( this.matScaley ) );
////	savefile.Write( &this.borderSize, sizeof( this.borderSize ) );
////	savefile.Write( &this.textAlign, sizeof( this.textAlign ) );
////	savefile.Write( &this.textAlignx, sizeof( this.textAlignx ) );
////	savefile.Write( &this.textAligny, sizeof( this.textAligny ) );
////	savefile.Write( &this.textShadow, sizeof( this.textShadow ) );
////	savefile.Write( &this.shear, sizeof( this.shear ) );
////
////	WriteSaveGameString( this.name, savefile );
////	WriteSaveGameString( this.comment, savefile );
////
////	// WinVars
////	this.noTime.WriteToSaveGame( savefile );
////	this.visible.WriteToSaveGame( savefile );
////	rect.WriteToSaveGame( savefile );
////	backColor.WriteToSaveGame( savefile );
////	this.matColor.WriteToSaveGame( savefile );
////	foreColor.WriteToSaveGame( savefile );
////	hoverColor.WriteToSaveGame( savefile );
////	this.borderColor.WriteToSaveGame( savefile );
////	this.textScale.WriteToSaveGame( savefile );
////	noEvents.WriteToSaveGame( savefile );
////	rotate.WriteToSaveGame( savefile );
////	this.text.WriteToSaveGame( savefile );
////	this.backGroundName.WriteToSaveGame( savefile );
////	this.hideCursor.WriteToSaveGame(savefile);
////
////	// Defined Vars
////	for ( i = 0; i < this.definedVars.Num(); i++ ) {
////		this.definedVars[i].WriteToSaveGame( savefile );
////	}
////
////	savefile.Write( &this.textRect, sizeof( this.textRect ) );
////
////	// Window pointers saved as the child ID of the window
////	int winID;
////
////	winID = focusedChild ? focusedChild.childID : -1 ;
////	savefile.Write( &winID, sizeof( winID ) );
////
////	winID = captureChild ? captureChild.childID : -1 ;
////	savefile.Write( &winID, sizeof( winID ) );
////
////	winID = overChild ? overChild.childID : -1 ;
////	savefile.Write( &winID, sizeof( winID ) );
////
////
////	// Scripts
////	for ( i = 0; i < SCRIPT_COUNT; i++ ) {
////		if ( this.scripts[i] ) {
////			this.scripts[i].WriteToSaveGame( savefile );
////		}
////	}
////
////	// TimeLine Events
////	for ( i = 0; i < this.timeLineEvents.Num(); i++ ) {
////		if ( this.timeLineEvents[i] ) {
////			savefile.Write( &this.timeLineEvents[i].pending, sizeof( this.timeLineEvents[i].pending ) );
////			savefile.Write( &this.timeLineEvents[i].time, sizeof( this.timeLineEvents[i].time ) );
////			if ( this.timeLineEvents[i].event ) {
////				this.timeLineEvents[i].event.WriteToSaveGame( savefile );
////			}
////		}
////	}
////
////	// Transitions
////	int num = transitions.Num();
////
////	savefile.Write( &num, sizeof( num ) );
////	for ( i = 0; i < transitions.Num(); i++ ) {
////		WriteSaveGameTransition( transitions[ i ], savefile );
////	}
////
////
////	// Named Events
////	for ( i = 0; i < this.namedEvents.Num(); i++ ) {
////		if ( this.namedEvents[i] ) {
////			WriteSaveGameString( this.namedEvents[i].mName, savefile );
////			if ( this.namedEvents[i].mEvent ) {
////				this.namedEvents[i].mEvent.WriteToSaveGame( savefile );
////			}
////		}
////	}
////
////	// regList
////	this.regList.WriteToSaveGame( savefile );
////
////
////	// Save children
////	for ( i = 0; i < this.drawWindows.Num(); i++ ) {
////		drawWin_t	window = this.drawWindows[i];
////
////		if ( window.simp ) {
////			window.simp.WriteToSaveGame( savefile );
////		} else if ( window.win ) {
////			window.win.WriteToSaveGame( savefile );
////		}
////	}
////}
////
/////*
////===============
////idWindow::ReadSaveGameString
////===============
////*/
////ReadSaveGameString( idStr &string, idFile *savefile ):void {
////	int len;
////
////	savefile.Read( &len, sizeof( len ) );
////	if ( len < 0 ) {
////		common.Warning( "idWindow::ReadSaveGameString: invalid length" );
////	}
////
////	string.Fill( ' ', len );
////	savefile.Read( &string[0], len );
////}
////
/////*
////===============
////idWindow::ReadFromSaveGame
////===============
////*/
////ReadFromSaveGame( idFile *savefile ):void {
////	var/*int*/i:number;
////
////	transitions.Clear();
////
////	ReadSaveGameString( cmd, savefile );
////
////	savefile.Read( &this.actualX, sizeof( this.actualX ) );
////	savefile.Read( &this.actualY, sizeof( this.actualY ) );
////	savefile.Read( &childID, sizeof( childID ) );
////	savefile.Read( &flags, sizeof( this.flags ) );
////	savefile.Read( &this.lastTimeRun, sizeof( this.lastTimeRun ) );
////	savefile.Read( &this.drawRect, sizeof( this.drawRect ) );
////	savefile.Read( &this.clientRect, sizeof( this.clientRect ) );
////	savefile.Read( &this.origin, sizeof( this.origin ) );
////	savefile.Read( &this.fontNum, sizeof( this.fontNum ) );
////	savefile.Read( &this.timeLine, sizeof( this.timeLine ) );
////	savefile.Read( &this.xOffset, sizeof( this.xOffset ) );
////	savefile.Read( &this.yOffset, sizeof( this.yOffset ) );
////	savefile.Read( &this.cursor, sizeof( this.cursor ) );
////	savefile.Read( &this.forceAspectWidth, sizeof( this.forceAspectWidth ) );
////	savefile.Read( &this.forceAspectHeight, sizeof( this.forceAspectHeight ) );
////	savefile.Read( &this.matScalex, sizeof( this.matScalex ) );
////	savefile.Read( &this.matScaley, sizeof( this.matScaley ) );
////	savefile.Read( &this.borderSize, sizeof( this.borderSize ) );
////	savefile.Read( &this.textAlign, sizeof( this.textAlign ) );
////	savefile.Read( &this.textAlignx, sizeof( this.textAlignx ) );
////	savefile.Read( &this.textAligny, sizeof( this.textAligny ) );
////	savefile.Read( &this.textShadow, sizeof( this.textShadow ) );
////	savefile.Read( &this.shear, sizeof( this.shear ) );
////
////	ReadSaveGameString( this.name, savefile );
////	ReadSaveGameString( this.comment, savefile );
////
////	// WinVars
////	this.noTime.ReadFromSaveGame( savefile );
////	this.visible.ReadFromSaveGame( savefile );
////	rect.ReadFromSaveGame( savefile );
////	backColor.ReadFromSaveGame( savefile );
////	this.matColor.ReadFromSaveGame( savefile );
////	foreColor.ReadFromSaveGame( savefile );
////	hoverColor.ReadFromSaveGame( savefile );
////	this.borderColor.ReadFromSaveGame( savefile );
////	this.textScale.ReadFromSaveGame( savefile );
////	noEvents.ReadFromSaveGame( savefile );
////	rotate.ReadFromSaveGame( savefile );
////	this.text.ReadFromSaveGame( savefile );
////	this.backGroundName.ReadFromSaveGame( savefile );
////
////	if ( session.GetSaveGameVersion() >= 17 ) {
////		this.hideCursor.ReadFromSaveGame(savefile);
////	} else {
////		this.hideCursor = false;
////	}
////
////	// Defined Vars
////	for ( i = 0; i < this.definedVars.Num(); i++ ) {
////		this.definedVars[i].ReadFromSaveGame( savefile );
////	}
////
////	savefile.Read( &this.textRect, sizeof( this.textRect ) );
////
////	// Window pointers saved as the child ID of the window
////	int winID = -1;
////
////	savefile.Read( &winID, sizeof( winID ) );
////	for ( i = 0; i < this.children.Num(); i++ ) {
////		if ( this.children[i].childID == winID ) {
////			focusedChild = this.children[i];
////		}
////	}
////	savefile.Read( &winID, sizeof( winID ) );
////	for ( i = 0; i < this.children.Num(); i++ ) {
////		if ( this.children[i].childID == winID ) {
////			captureChild = this.children[i];
////		}
////	}
////	savefile.Read( &winID, sizeof( winID ) );
////	for ( i = 0; i < this.children.Num(); i++ ) {
////		if ( this.children[i].childID == winID ) {
////			overChild = this.children[i];
////		}
////	}
////	
////	// Scripts
////	for ( i = 0; i < SCRIPT_COUNT; i++ ) {
////		if ( this.scripts[i] ) {
////			this.scripts[i].ReadFromSaveGame( savefile );
////		}
////	}
////
////	// TimeLine Events
////	for ( i = 0; i < this.timeLineEvents.Num(); i++ ) {
////		if ( this.timeLineEvents[i] ) {
////			savefile.Read( &this.timeLineEvents[i].pending, sizeof( this.timeLineEvents[i].pending ) );
////			savefile.Read( &this.timeLineEvents[i].time, sizeof( this.timeLineEvents[i].time ) );
////			if ( this.timeLineEvents[i].event ) {
////				this.timeLineEvents[i].event.ReadFromSaveGame( savefile );
////			}
////		}
////	}
////
////
////	// Transitions
////	int num;
////	savefile.Read( &num, sizeof( num ) );
////	for ( i = 0; i < num; i++ ) {
////		idTransitionData trans;
////		trans.data = NULL;
////		ReadSaveGameTransition( trans, savefile );
////		if ( trans.data ) {
////			transitions.Append( trans );
////		}
////	}
////
////
////	// Named Events
////	for ( i = 0; i < this.namedEvents.Num(); i++ ) {
////		if ( this.namedEvents[i] ) {
////			ReadSaveGameString( this.namedEvents[i].mName, savefile );
////			if ( this.namedEvents[i].mEvent ) {
////				this.namedEvents[i].mEvent.ReadFromSaveGame( savefile );
////			}
////		}
////	}
////
////	// regList
////	this.regList.ReadFromSaveGame( savefile );
////
////	// Read children
////	for ( i = 0; i < this.drawWindows.Num(); i++ ) {
////		drawWin_t	window = this.drawWindows[i];
////
////		if ( window.simp ) {
////			window.simp.ReadFromSaveGame( savefile );
////		} else if ( window.win ) {
////			window.win.ReadFromSaveGame( savefile );
////		}
////	}
////
////	if ( this.flags & WIN_DESKTOP ) {
////		FixupTransitions();
////	}
////}
////
/////*
////===============
////idWindow::NumTransitions
////===============
////*/
////int idWindow::NumTransitions() {
////	int c = transitions.Num();
////	for ( var i = 0; i < this.children.Num(); i++ ) {
////		c += this.children[i].NumTransitions();
////	}
////	return c;
////}
////
////
/////*
////===============
////idWindow::FixupTransitions
////===============
////*/
////FixupTransitions():void {
////	int i, c = transitions.Num();
////	for ( i = 0; i < c; i++ ) {
////		drawWin_t *dw = gui.GetDesktop().FindChildByName( ( ( idWinStr* )transitions[i].data ).c_str() );
////		delete transitions[i].data;
////		transitions[i].data = NULL;
////		if ( dw && ( dw.win || dw.simp ) ){
////			if ( dw.win ) {
////				if ( transitions[i].offset == (int)&( ( idWindow * ) 0 ).rect ) {
////					transitions[i].data = &dw.win.rect;
////				} else if ( transitions[i].offset == (int)&( ( idWindow * ) 0 ).backColor ) {
////					transitions[i].data = &dw.win.backColor;
////				} else if ( transitions[i].offset == (int)&( ( idWindow * ) 0 ).matColor ) {
////					transitions[i].data = &dw.win.matColor;
////				} else if ( transitions[i].offset == (int)&( ( idWindow * ) 0 ).foreColor ) {
////					transitions[i].data = &dw.win.foreColor;
////				} else if ( transitions[i].offset == (int)&( ( idWindow * ) 0 ).borderColor ) {
////					transitions[i].data = &dw.win.borderColor;
////				} else if ( transitions[i].offset == (int)&( ( idWindow * ) 0 ).textScale ) {
////					transitions[i].data = &dw.win.textScale;
////				} else if ( transitions[i].offset == (int)&( ( idWindow * ) 0 ).rotate ) {
////					transitions[i].data = &dw.win.rotate;
////				}
////			} else {
////				if ( transitions[i].offset == (int)&( ( idSimpleWindow * ) 0 ).rect ) {
////					transitions[i].data = &dw.simp.rect;
////				} else if ( transitions[i].offset == (int)&( ( idSimpleWindow * ) 0 ).backColor ) {
////					transitions[i].data = &dw.simp.backColor;
////				} else if ( transitions[i].offset == (int)&( ( idSimpleWindow * ) 0 ).matColor ) {
////					transitions[i].data = &dw.simp.matColor;
////				} else if ( transitions[i].offset == (int)&( ( idSimpleWindow * ) 0 ).foreColor ) {
////					transitions[i].data = &dw.simp.foreColor;
////				} else if ( transitions[i].offset == (int)&( ( idSimpleWindow * ) 0 ).borderColor ) {
////					transitions[i].data = &dw.simp.borderColor;
////				} else if ( transitions[i].offset == (int)&( ( idSimpleWindow * ) 0 ).textScale ) {
////					transitions[i].data = &dw.simp.textScale;
////				} else if ( transitions[i].offset == (int)&( ( idSimpleWindow * ) 0 ).rotate ) {
////					transitions[i].data = &dw.simp.rotate;
////				}
////			}
////		}
////		if ( transitions[i].data == NULL ) {
////			transitions.RemoveIndex( i );
////			i--;
////			c--;
////		}
////	}
////	for ( c = 0; c < this.children.Num(); c++ ) {
////		children[c].FixupTransitions();
////	}
////}
////
////
/*
===============
idWindow::AddChild
===============
*/
AddChild(win:idWindow):void {
	dlog(DEBUG_GUI, "idWindow::AddChild %s\n", win.name.c_str ( ) );
	win.childID = this.children.Append(win);
}

/*
================
idWindow::FixupParms
================
*/
	FixupParms ( ): void {
		var/*int */i:number;
		var c = this.children.Num();
		for (i = 0; i < c; i++) {
			this.children[i].FixupParms();
		}
		for (i = 0; i < SCRIPT_COUNT; i++) {
			if (this.scripts[i]) {
				this.scripts[i].FixupParms(this);
			}
		}

		c = this.timeLineEvents.Num();
		for (i = 0; i < c; i++) {
			this.timeLineEvents[i].event.FixupParms(this);
		}

		c = this.namedEvents.Num();
		for (i = 0; i < c; i++) {
			this.namedEvents[i].mEvent.FixupParms(this);
		}

		c = this.ops.Num();
		for (i = 0; i < c; i++) {
			if (this.ops[i].b == -2) {
				// need to fix this up
				var p: string = objectTracker.getObject<idStr>( this.ops[i].a, idStr ).data;// (const char*)(this.ops[i].a);
				var $var = this.GetWinVarByName(p, true);
				//delete []p;
				this.ops[i].a = $var ? $var.refAddress : 0;
				this.ops[i].b = -1;
			}
		}


		if (this.flags & WIN_DESKTOP) {
			this.CalcRects(0,0);
		}
	}

/*
================
idWindow::IsSimple
================
*/
	IsSimple ( ): boolean {
		// dont do simple windows when in gui editor
		if ( com_editors & toolFlag_t.EDITOR_GUI ) {
			return false;
		}

		if ( this.ops.Num ( ) ) {
			return false;
		}
		if ( this.flags & ( WIN_HCENTER | WIN_VCENTER ) ) {
			return false;
		}
		if ( this.children.Num ( ) || this.drawWindows.Num ( ) ) {
			return false;
		}
		for ( var i = 0; i < SCRIPT_COUNT; i++ ) {
			if ( this.scripts[i] ) {
				return false;
			}
		}
		if ( this.timeLineEvents.Num ( ) ) {
			return false;
		}

		if ( this.namedEvents.Num ( ) ) {
			return false;
		}

		return true;
	}

/////*
////================
////idWindow::ContainsStateVars
////================
////*/
////bool idWindow::ContainsStateVars() {
////	if ( this.updateVars.Num() ) {
////		return true;
////	}
////	var c = this.children.Num();
////	for (var i = 0; i < c; i++) {
////		if ( this.children[i].ContainsStateVars() ) {
////			return true;
////		}
////	}
////	return false;
////}
////
/*
================
idWindow::Interactive
================
*/
	Interactive ( ): boolean {
		if ( this.scripts[ON_ACTION] ) {
			return true;
		}
		var c = this.children.Num ( );
		for ( var i = 0; i < c; i++ ) {
			if ( this.children[i].Interactive ( ) ) {
				return true;
			}
		}
		return false;
	}

/////*
////================
////idWindow::SetChildWinVarVal
////================
////*/
////SetChildWinVarVal(const char *name, const char *var, const char *val):void {
////	drawWin_t *dw = FindChildByName(name);
////	idWinVar *wv = NULL;
////	if (dw && dw.simp) {
////		wv = dw.simp.GetWinVarByName(var);
////	} else if (dw && dw.win) {
////		wv = dw.win.GetWinVarByName(var);
////	}
////	if (wv) {
////		wv.Set(val);
////		wv.SetEval(false);
////	}
////}
////
////
/////*
////================
////idWindow::FindChildByPoint
////
////Finds the window under the given point
////================
////*/
////idWindow* idWindow::FindChildByPoint ( /*float */x:number, /*float */y:number, idWindow** below ) {
////	var c = this.children.Num();
////
////	// If we are looking for a window below this one then
////	// the next window should be good, but this one wasnt it
////	if ( *below == this ) {
////		*below = NULL;
////		return NULL;
////	}
////
////	if ( !Contains ( this.drawRect, x, y ) ) {
////		return NULL;
////	}
////		
////	for (int i = c - 1; i >= 0 ; i-- ) {
////		idWindow* found = this.children[i].FindChildByPoint ( x, y, below );
////		if ( found ) {
////			if ( *below ) {
////				continue;
////			}
////			
////			return found;
////		}									
////	}
////
////	return this;
////}
////
/////*
////================
////idWindow::FindChildByPoint
////================
////*/
////idWindow* idWindow::FindChildByPoint ( /*float */x:number, /*float */y:number, idWindow* below )
////{
////	return FindChildByPoint ( x, y, &below );
////}
////
/////*
////================
////idWindow::GetChildCount
////
////Returns the number of children
////================
////*/
////int idWindow::GetChildCount ( void )
////{
////	return this.drawWindows.Num ( );
////}
////
/////*
////================
////idWindow::GetChild
////
////Returns the child window at the given index
////================
////*/
////idWindow* idWindow::GetChild ( int index )
////{
////	return this.drawWindows[index].win;
////}

/*
================
idWindow::GetChildIndex

Returns the index of the given child window
================
*/
	GetChildIndex ( window: idWindow ): number {
		var find: number;
		for ( find = 0; find < this.drawWindows.Num ( ); find ++ ) {
			if ( this.drawWindows[find].win == window ) {
				return find;
			}
		}
		return -1;
	}

/////*
////================
////idWindow::RemoveChild
////
////Removes the child from the list of children.   Note that the child window being
////removed must still be deallocated by the caller
////================
////*/
////RemoveChild ( idWindow *win ):void {
////	int find;
////
////	// Remove the child window
////	children.Remove ( win );
////	
////	for ( find = 0; find < this.drawWindows.Num(); find ++ )
////	{
////		if ( this.drawWindows[find].win == win )
////		{
////			this.drawWindows.RemoveIndex ( find );
////			break;
////		}
////	}
////}

/*
================
idWindow::InsertChild

Inserts the given window as a child into the given location in the zorder.
================
*/
	InsertChild ( win: idWindow, before: idWindow ): boolean {
		this.AddChild( win );

		win.parent = this;

		var dwt = new drawWin_t;
		dwt.simp = null;
		dwt.win = win;

		// If not inserting before anything then just add it at the end
		if ( before ) {
			var index: number;
			index = this.GetChildIndex( before );
			if ( index != -1 ) {
				this.drawWindows.Insert( dwt, index );
				return true;
			}
		}

		dlog(DEBUG_GUI, "idWindow::InsertChild  %s\n", win.name.c_str());
		this.drawWindows.Append( dwt );
		return true;
	}

/*
================
idWindow::ScreenToClient
================
*/
	ScreenToClient ( r: idRectangle ): void {
		var /*int*/x: number;
		var /*int*/y: number;
		var p: idWindow;

		for ( p = this, x = 0, y = 0; p; p = p.parent ) {
			x += p.rect.x ( );
			y += p.rect.y ( );
		}

		r.x -= x;
		r.y -= y;
	}

/*
================
idWindow::ClientToScreen
================
*/
	ClientToScreen ( r: idRectangle ): void {
		var /*int*/x: number;
		var /*int*/y: number;
		var p: idWindow;

		for ( p = this, x = 0, y = 0; p; p = p.parent ) {
			x += p.rect.x ( );
			y += p.rect.y ( );
		}

		r.x += x;
		r.y += y;
	}

/////*
////================
////idWindow::SetDefaults
////
////Set the window do a default window with no text, no background and 
////default colors, etc..
////================
////*/
////SetDefaults ( void ):void {	
////	this.forceAspectWidth = 640.0;
////	this.forceAspectHeight = 480.0;
////	this.matScalex = 1;
////	this.matScaley = 1;
////	this.borderSize = 0;
////	this.noTime = false;
////	this.visible = true;
////	this.textAlign = 0;
////	this.textAlignx = 0;
////	this.textAligny = 0;
////	noEvents = false;
////	this.rotate = 0;
////	this.shear.Zero();
////	this.textScale = 0.35f;
////	this.backColor.Zero();
////	foreColor = idVec4(1, 1, 1, 1);
////	hoverColor = idVec4(1, 1, 1, 1);
////	this.matColor = idVec4(1, 1, 1, 1);
////	this.borderColor.Zero();
////	this.text = "";	
////
////	this.background = NULL;
////	this.backGroundName = "";
////}
////
/////*
////================
////idWindow::UpdateFromDictionary
////
////The editor only has a dictionary to work with so the easiest way to push the
////values of the dictionary onto the window is for the window to interpret the 
////dictionary as if were a file being parsed.
////================
////*/
////bool idWindow::UpdateFromDictionary ( idDict& dict ) {
////	const idKeyValue*	kv;
////	int					i;
////	
////	SetDefaults ( );
////	
////	// Clear all registers since they will get recreated
////	this.regList.Reset ( );
////	this.expressionRegisters.Clear ( );
////	this.ops.Clear ( );
////	
////	for ( i = 0; i < dict.GetNumKeyVals(); i ++ ) {
////		kv = dict.GetKeyVal ( i );
////
////		// Special case name
////		if ( !kv.GetKey().Icmp ( "name" ) ) {
////			this.name = kv.GetValue();
////			continue;
////		}
////
////		var src = new idParser( kv.GetValue().c_str(), kv.GetValue().Length(), "",
////					  lexerFlags_t.LEXFL_NOFATALERRORS | lexerFlags_t.LEXFL_NOSTRINGCONCAT | lexerFlags_t.LEXFL_ALLOWMULTICHARLITERALS | lexerFlags_t.LEXFL_ALLOWBACKSLASHSTRINGCONCAT );
////		if ( !ParseInternalVar ( kv.GetKey(), &src ) ) {
////			// Kill the old register since the parse reg entry will add a new one
////			if ( !ParseRegEntry ( kv.GetKey(), &src ) ) {
////				continue;
////			}
////		}
////	}
////			
////	this.EvalRegs(-1, true);
////
////	this.SetupFromState();
////	this.PostParse();
////	
////	return true;
////}
}