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
//#include "ListGUILocal.h"
//#include "DeviceContext.h"
//#include "Window.h"
//#include "UserInterfaceLocal.h"
//
//extern idCVar r_skipGuiShaders;		// 1 = don't render any gui elements on surfaces
//
//
///*
//===============================================================================
//
//	idUserInterfaceManagerLocal
//
//===============================================================================
//*/
class idUserInterfaceManagerLocal extends idUserInterfaceManager {
	
	Init ( ): void {
		this.screenRect = new idRectangle( 0, 0, 640, 480 );
		this.dc.Init ( );
	}
//
//void idUserInterfaceManagerLocal::Shutdown() {
//	this.guis.DeleteContents( true );
//	demoGuis.DeleteContents( true );
//	dc.Shutdown();
//}
//
//void idUserInterfaceManagerLocal::Touch( const char *name ) {
//	idUserInterface *gui = this.Alloc();
//	gui.InitFromFile( name );
////	delete gui;
//}
//
//void idUserInterfaceManagerLocal::WritePrecacheCommands( idFile *f ) {
//
//	int c = this.guis.Num();
//	for( int i = 0; i < c; i++ ) {
//		char	str[1024];
//		sprintf( str, "touchGui %s\n", this.guis[i].Name() );
//		common.Printf( "%s", str );
//		f.Printf( "%s", str );
//	}
//}
//
//void idUserInterfaceManagerLocal::SetSize( float width, float height ) {
//	dc.SetSize( width, height );
//}
//
//void idUserInterfaceManagerLocal::BeginLevelLoad() {
//	int c = this.guis.Num();
//	for ( int i = 0; i < c; i++ ) {
//		if ( (this.guis[ i ].GetDesktop().GetFlags() & WIN_MENUGUI) == 0 ) {
//			this.guis[ i ].ClearRefs();
//			/*
//			delete this.guis[ i ];
//			this.guis.RemoveIndex( i );
//			i--; c--;
//			*/
//		}
//	}
//}
//
//void idUserInterfaceManagerLocal::EndLevelLoad() {
//	int c = this.guis.Num();
//	for ( int i = 0; i < c; i++ ) {
//		if ( this.guis[i].GetRefs() == 0 ) {
//			//common.Printf( "purging %s.\n", this.guis[i].GetSourceFile() );
//
//			// use this to make sure no materials still reference this gui
//			bool remove = true;
//			for ( int j = 0; j < declManager.GetNumDecls( DECL_MATERIAL ); j++ ) {
//				const idMaterial *material = static_cast<const idMaterial *>(declManager.DeclByIndex( DECL_MATERIAL, j, false ));
//				if ( material.GlobalGui() == this.guis[i] ) {
//					remove = false;
//					break;
//				}
//			}
//			if ( remove ) {
//				delete this.guis[ i ];
//				this.guis.RemoveIndex( i );
//				i--; c--;
//			}
//		}
//	}
//}
//
//void idUserInterfaceManagerLocal::Reload( bool all ) {
//	ID_TIME_T ts;
//
//	int c = this.guis.Num();
//	for ( int i = 0; i < c; i++ ) {
//		if ( !all ) {
//			fileSystem.ReadFile( this.guis[i].GetSourceFile(), NULL, &ts );
//			if ( ts <= this.guis[i].GetTimeStamp() ) {
//				continue;
//			}
//		}
//
//		this.guis[i].InitFromFile( this.guis[i].GetSourceFile() );
//		common.Printf( "reloading %s.\n", this.guis[i].GetSourceFile() );
//	}
//}
//
//void idUserInterfaceManagerLocal::ListGuis() const {
//	int c = this.guis.Num();
//	common.Printf( "\n   size   refs   name\n" );
//	size_t total = 0;
//	int copies = 0;
//	int unique = 0;
//	for ( int i = 0; i < c; i++ ) {
//		idUserInterfaceLocal *gui = this.guis[i];
//		size_t sz = gui.Size();
//		bool isUnique = this.guis[i].interactive;
//		if ( isUnique ) {
//			unique++;
//		} else {
//			copies++;
//		}
//		common.Printf( "%6.1fk %4i (%s) %s ( %i transitions )\n", sz / 1024.0f, this.guis[i].GetRefs(), isUnique ? "unique" : "copy", this.guis[i].GetSourceFile(), this.guis[i].desktop.NumTransitions() );
//		total += sz;
//	}
//	common.Printf( "===========\n  %i total Guis ( %i copies, %i unique ), %.2f total Mbytes", c, copies, unique, total / ( 1024.0f * 1024.0f ) );
//}
//
//bool idUserInterfaceManagerLocal::CheckGui( const char *qpath ) const {
//	idFile *file = fileSystem.OpenFileRead( qpath );
//	if ( file ) {
//		fileSystem.CloseFile( file );
//		return true;
//	}
//	return false;
//}
//
	Alloc ( ): idUserInterface {
		return new idUserInterfaceLocal ( );
	}

	DeAlloc ( gui: idUserInterface ): void {
		if ( gui ) {
			var /*int */c = this.guis.Num ( );
			for ( var i = 0; i < c; i++ ) {
				if ( this.guis[i] == gui ) {
					delete this.guis[i];
					this.guis.RemoveIndex( i );
					return;
				}
			}
		}
	}

	FindGui ( qpath: string, autoLoad = false, needUnique = false, forceNOTUnique = false ): idUserInterface {
		var /*int */c = this.guis.Num ( );
		
		for ( var i = 0; i < c; i++ ) {
			var gui = <idUserInterface>this.guis[i];
			if ( !idStr.Icmp( this.guis[i].GetSourceFile ( ), qpath ) ) {
				if ( !forceNOTUnique && ( needUnique || this.guis[i].IsInteractive ( ) ) ) {
					break;
				}
				this.guis[i].AddRef ( );
				return this.guis[i];
			}
		}

		if ( autoLoad ) {
			var /*idUserInterface **/gui = this.Alloc ( );
			if ( gui.InitFromFile( qpath ) ) {
				gui.SetUniqued( forceNOTUnique ? false : needUnique );
				return gui;
			} else {
				delete gui;
			}
		}
		return null;
	}

//idUserInterface *idUserInterfaceManagerLocal::FindDemoGui( const char *qpath ) {
//	int c = demoGuis.Num();
//	for ( int i = 0; i < c; i++ ) {
//		if ( !idStr::Icmp( demoGuis[i].GetSourceFile(), qpath ) ) {
//			return demoGuis[i];
//		}
//	}
//	return NULL;
//}

	AllocListGUI ( ): idListGUI {
		return new idListGUILocal ( );
	}

//void idUserInterfaceManagerLocal::FreeListGUI( idListGUI *listgui ) {
//	delete listgui;
//}

	//private:
	screenRect: idRectangle;
	dc: idDeviceContext = new idDeviceContext();

	guis = new idList<idUserInterfaceLocal/***/>(idUserInterfaceLocal, true);
	demoGuis = new idList<idUserInterfaceLocal/***/>(idUserInterfaceLocal, true);
};


///*
//===============================================================================
//
//	idUserInterfaceLocal
//
//===============================================================================
//*/

class idUserInterfaceLocal extends idUserInterface {

	constructor() {
		super ( );
		this.cursorX = this.cursorY = 0.0;
		this.desktop = null;
		this.loading = false;
		this.active = false;
		this.interactive = false;
		this.uniqued = false;
		this.bindHandler = null;
		//so the reg eval in gui parsing doesn't get bogus values
		this.time = 0;
		this.refs = 1;
	}
//
//idUserInterfaceLocal::~idUserInterfaceLocal() {
//	delete this.desktop;
//	this.desktop = NULL;
//}
//
//const char *idUserInterfaceLocal::Name() const {
//	return source;
//}
//
//const char *idUserInterfaceLocal::Comment() const {
//	if ( this.desktop ) {
//		return this.desktop.GetComment();
//	}
//	return "";
//}
//
//bool idUserInterfaceLocal::IsInteractive() const {
//	return interactive;
//}
//
	InitFromFile ( qpath: string, rebuild = true, cache = true ): boolean {
		if ( !( qpath /*&& *qpath*/ ) ) {
			// FIXME: Memory leak!!
			return false;
		}

		//var sz = sizeof( idWindow );
		//sz = sizeof( idSimpleWindow );
		this.loading = true;

		if (rebuild) {
			if ( this.desktop ) {
				this.desktop.destructor ( ); //delete this.desktop;
			}
			this.desktop = new idWindow( this );
		} else if ( this.desktop == null ) {
			this.desktop = new idWindow( this );
		}

		this.source.equals( qpath );
		this.state.Set( "text", "Test Text!" );

		var src = new idParser( lexerFlags_t.LEXFL_NOFATALERRORS | lexerFlags_t.LEXFL_NOSTRINGCONCAT | lexerFlags_t.LEXFL_ALLOWMULTICHARLITERALS | lexerFlags_t.LEXFL_ALLOWBACKSLASHSTRINGCONCAT );

		//Load the timestamp so reload guis will work correctly
		var $timeStamp = new R( this.timeStamp );
		fileSystem.ReadFile( qpath, null, $timeStamp );
		this.timeStamp = $timeStamp.$;

		src.LoadFile( qpath );

		if ( src.IsLoaded ( ) ) {
			var token = new idToken ;
			while ( src.ReadToken( token ) ) {
				if ( idStr.Icmp( token, "windowDef" ) == 0 ) {
					this.desktop.SetDC( uiManagerLocal.dc );
					if ( this.desktop.Parse( src, rebuild ) ) {
						this.desktop.SetFlag( WIN_DESKTOP );
						this.desktop.FixupParms ( );
					}
					continue;
				}
			}

			this.state.Set( "name", qpath );
		} else {
			todoThrow ( );
			//this.desktop.SetDC( &uiManagerLocal.dc );
			//this.desktop.SetFlag(WIN_DESKTOP);
			//this.desktop.name = "Desktop";
			//this.desktop.text = va("Invalid GUI: %s", qpath);
			//this.desktop.rect = new idRectangle(0.0, 0.0, 640.0, 480.0);
			//this.desktop.drawRect = desktop.rect;
			//this.desktop.foreColor = idVec4(1.0, 1.0, 1.0, 1.0);
			//this.desktop.backColor = idVec4(0.0, 0.0, 0.0, 1.0);
			//this.desktop.SetupFromState();
			//common.Warning( "Couldn't load gui: '%s'", qpath );
		}

		this.interactive = this.desktop.Interactive ( );

		if ( uiManagerLocal.guis.Find( this ) == null ) {
			uiManagerLocal.guis.Append( this );
		}

		this.loading = false;

		return true;
	}

	HandleEvent ( event: sysEvent_t, /*bool **/updateVisuals: R<boolean> ): string {
		todoThrow ( );
//	time = _time;
//
//	if ( this.bindHandler && event.evType == SE_KEY && event.evValue2 == 1 ) {
//		const char *ret = this.bindHandler.HandleEvent( event, updateVisuals );
//		this.bindHandler = NULL;
//		return ret;
//	}
//
//	if ( event.evType == SE_MOUSE ) {
//		cursorX += event.evValue;
//		cursorY += event.evValue2;
//
//		if (cursorX < 0) {
//			cursorX = 0;
//		}
//		if (cursorY < 0) {
//			cursorY = 0;
//		}
//	}
//
//	if ( this.desktop ) {
//		return this.desktop.HandleEvent( event, updateVisuals );
//	} 
//
		return "";
	}
//
//void idUserInterfaceLocal::HandleNamedEvent ( const char* eventName ) {
//	this.desktop.RunNamedEvent( eventName );
//}
//
//void idUserInterfaceLocal::Redraw( int _time ) {
//	if ( r_skipGuiShaders.GetInteger() > 5 ) {
//		return;
//	}
//	if ( !loading && this.desktop ) {
//		time = _time;
//		uiManagerLocal.dc.PushClipRect( uiManagerLocal.screenRect );
//		this.desktop.Redraw( 0, 0 );
//		uiManagerLocal.dc.PopClipRect();
//	}
//}
//
//void idUserInterfaceLocal::DrawCursor() {
//	if ( !this.desktop || this.desktop.GetFlags() & WIN_MENUGUI ) {
//		uiManagerLocal.dc.DrawCursor(&cursorX, &cursorY, 32.0f );
//	} else {
//		uiManagerLocal.dc.DrawCursor(&cursorX, &cursorY, 64.0f );
//	}
//}
//
	State ( ): idDict {
		return this.state;
	}

//void idUserInterfaceLocal::DeleteStateVar( const char *varName ) {
//	state.Delete( varName );
//}
//
//void idUserInterfaceLocal::SetStateString( const char *varName, value:string ) {
//	state.Set( varName, value );
//}
//
//void idUserInterfaceLocal::SetStateBool( const char *varName, const bool value ) {
//	state.SetBool( varName, value );
//}
//
//void idUserInterfaceLocal::SetStateInt( const char *varName, const int value ) {
//	state.SetInt( varName, value );
//}
//
//void idUserInterfaceLocal::SetStateFloat( const char *varName, const float value ) {
//	state.SetFloat( varName, value );
//}
//
//const char* idUserInterfaceLocal::GetStateString( const char *varName, const char* defaultString ) const {
//	return state.GetString(varName, defaultString);
//}
//
//bool idUserInterfaceLocal::GetStateBool( const char *varName, const char* defaultString ) const {
//	return state.GetBool(varName, defaultString); 
//}
//
//int idUserInterfaceLocal::GetStateInt( const char *varName, const char* defaultString ) const {
//	return state.GetInt(varName, defaultString);
//}
//
//float idUserInterfaceLocal::GetStateFloat( const char *varName, const char* defaultString ) const {
//	return state.GetFloat(varName, defaultString);
//}
//
//void idUserInterfaceLocal::StateChanged( int _time, bool redraw ) {
//	time = _time;
//	if (this.desktop) {
//		this.desktop.StateChanged( redraw );
//	}
//	if ( state.GetBool( "noninteractive" ) ) {
//		interactive = false;
//	}
//	else {
//		if (this.desktop) {
//			interactive = this.desktop.Interactive();
//		} else {
//			interactive = false;
//		}
//	}
//}
//
//const char *idUserInterfaceLocal::Activate(bool activate, int _time) {
//	time = _time;
//	this.active = activate;
//	if ( this.desktop ) {
//		activateStr = "";
//		this.desktop.Activate( activate, activateStr );
//		return activateStr;
//	}
//	return "";
//}
//
//void idUserInterfaceLocal::Trigger(int _time) {
//	time = _time;
//	if ( this.desktop ) {
//		this.desktop.Trigger();
//	}
//}
//
//void idUserInterfaceLocal::ReadFromDemoFile( class idDemoFile *f ) {
//	idStr work;
//	f.ReadDict( state );
//	source = state.GetString("name");
//
//	if (this.desktop == NULL) {
//		f.Log("creating new gui\n");
//		this.desktop = new idWindow(this);
//	   	this.desktop.SetFlag( WIN_DESKTOP );
//	   	this.desktop.SetDC( &uiManagerLocal.dc );
//		this.desktop.ReadFromDemoFile(f);
//	} else {
//		f.Log("re-using gui\n");
//		this.desktop.ReadFromDemoFile(f, false);
//	}
//
//	f.ReadFloat( cursorX );
//	f.ReadFloat( cursorY );
//
//	bool add = true;
//	int c = uiManagerLocal.demoGuis.Num();
//	for ( int i = 0; i < c; i++ ) {
//		if ( uiManagerLocal.demoGuis[i] == this ) {
//			add = false;
//			break;
//		}
//	}
//
//	if (add) {
//		uiManagerLocal.demoGuis.Append(this);
//	}
//}
//
//void idUserInterfaceLocal::WriteToDemoFile( class idDemoFile *f ) {
//	idStr work;
//	f.WriteDict( state );
//	if (this.desktop) {
//		this.desktop.WriteToDemoFile(f);
//	}
//
//	f.WriteFloat( cursorX );
//	f.WriteFloat( cursorY );
//}
//
//bool idUserInterfaceLocal::WriteToSaveGame( idFile *savefile ) const {
//	int len;
//	const idKeyValue *kv;
//	const char *string;
//
//	int num = state.GetNumKeyVals();
//	savefile.Write( &num, sizeof( num ) );
//
//	for( int i = 0; i < num; i++ ) {
//		kv = state.GetKeyVal( i );
//		len = kv.GetKey().Length();
//		string = kv.GetKey().c_str();
//		savefile.Write( &len, sizeof( len ) );
//		savefile.Write( string, len );
//
//		len = kv.GetValue().Length();
//		string = kv.GetValue().c_str();
//		savefile.Write( &len, sizeof( len ) );
//		savefile.Write( string, len );
//	}
//
//	savefile.Write( &this.active, sizeof( active ) );
//	savefile.Write( &interactive, sizeof( interactive ) );
//	savefile.Write( &uniqued, sizeof( uniqued ) );
//	savefile.Write( &time, sizeof( time ) );
//	len = activateStr.Length();
//	savefile.Write( &len, sizeof( len ) );
//	savefile.Write( activateStr.c_str(), len );
//	len = pendingCmd.Length();
//	savefile.Write( &len, sizeof( len ) );
//	savefile.Write( pendingCmd.c_str(), len );
//	len = returnCmd.Length();
//	savefile.Write( &len, sizeof( len ) );
//	savefile.Write( returnCmd.c_str(), len );
//
//	savefile.Write( &cursorX, sizeof( cursorX ) );
//	savefile.Write( &cursorY, sizeof( cursorY ) );
//
//	this.desktop.WriteToSaveGame( savefile );
//
//	return true;
//}
//
//bool idUserInterfaceLocal::ReadFromSaveGame( idFile *savefile ) {
//	int num;
//	int i, len;
//	idStr key;
//	idStr value;
//
//	savefile.Read( &num, sizeof( num ) );
//
//	state.Clear();
//	for( i = 0; i < num; i++ ) {
//		savefile.Read( &len, sizeof( len ) );
//		key.Fill( ' ', len );
//		savefile.Read( &key[0], len );
//
//		savefile.Read( &len, sizeof( len ) );
//		value.Fill( ' ', len );
//		savefile.Read( &value[0], len );
//		
//		state.Set( key, value );
//	}
//
//	savefile.Read( &this.active, sizeof( active ) );
//	savefile.Read( &interactive, sizeof( interactive ) );
//	savefile.Read( &uniqued, sizeof( uniqued ) );
//	savefile.Read( &time, sizeof( time ) );
//
//	savefile.Read( &len, sizeof( len ) );
//	activateStr.Fill( ' ', len );
//	savefile.Read( &activateStr[0], len );
//	savefile.Read( &len, sizeof( len ) );
//	pendingCmd.Fill( ' ', len );
//	savefile.Read( &pendingCmd[0], len );
//	savefile.Read( &len, sizeof( len ) );
//	returnCmd.Fill( ' ', len );
//	savefile.Read( &returnCmd[0], len );
//
//	savefile.Read( &cursorX, sizeof( cursorX ) );
//	savefile.Read( &cursorY, sizeof( cursorY ) );
//
//	this.desktop.ReadFromSaveGame( savefile );
//
//	return true;
//}
//
//size_t idUserInterfaceLocal::Size() {
//	size_t sz = sizeof(*this) + state.Size() + source.Allocated();
//	if ( this.desktop ) {
//		sz += this.desktop.Size();
//	}
//	return sz;
//}
//
//void idUserInterfaceLocal::RecurseSetKeyBindingNames( idWindow *window ) {
//	int i;
//	idWinVar *v = window.GetWinVarByName( "bind" );
//	if ( v ) {
//		SetStateString( v.GetName(), idKeyInput::KeysFromBinding( v.GetName() ) );
//	}
//	i = 0;
//	while ( i < window.GetChildCount() ) {
//		idWindow *next = window.GetChild( i );
//		if ( next ) {
//			RecurseSetKeyBindingNames( next );
//		}
//		i++;
//	}
//}
//
///*
//==============
//idUserInterfaceLocal::SetKeyBindingNames
//==============
//*/
//void idUserInterfaceLocal::SetKeyBindingNames( void ) {
//	if ( !this.desktop ) {
//		return;
//	}
//	// walk the windows
//	RecurseSetKeyBindingNames( this.desktop );
//}
//
///*
//==============
//idUserInterfaceLocal::SetCursor
//==============
//*/
//void idUserInterfaceLocal::SetCursor( float x, float y ) {
//	cursorX = x;
//	cursorY = y;
//}

	IsUniqued ( ): boolean { return this.uniqued; }
	SetUniqued ( b: boolean ): void { this.uniqued = b; }
////	virtual void				SetCursor( float x, float y );

	CursorX():number { return this.cursorX; }
	CursorY():number { return this.cursorY; }

////	size_t						Size();

	GetStateDict(): idDict { return this.state; }

	GetSourceFile( ):string { return this.source.data; }
	GetTimeStamp( ):number { return this.timeStamp; }

	GetDesktop ( ): idWindow { return this.desktop; }
	SetBindHandler(win: idWindow): void  { this.bindHandler = win; }
	Active():boolean{ return this.active; }
	GetTime():number { return this.time; }
	SetTime( /*int*/ _time:number ):void { this.time = _time; }
	
	ClearRefs():void { this.refs = 0; }
	AddRef():void { this.refs++; }
	GetRefs():number { return this.refs; }
////
////	void						RecurseSetKeyBindingNames( idWindow *window );
	GetPendingCmd():idStr { return this.pendingCmd; }
	GetReturnCmd():idStr { return this.returnCmd; }
//private:
	active: boolean;
	loading: boolean;
	interactive: boolean;
	uniqued:boolean;

	state = new idDict;
	desktop: idWindow;
	bindHandler: idWindow;
	
	source = new idStr;
	activateStr = new idStr;
	pendingCmd = new idStr;
	returnCmd = new idStr;
	timeStamp:number;//	ID_TIME_T	
	
	cursorX: number;	   //	float						
	cursorY: number;	   //	float						

	time:number;//	int	

	refs:number;//	int	
};


var uiManagerLocal = new idUserInterfaceManagerLocal ( );
/*idUserInterfaceManager *	*/var uiManager = uiManagerLocal;