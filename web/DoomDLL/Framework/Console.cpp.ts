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
//void SCR_DrawTextLeftAlign( float &y, text:string, ... ) id_attribute((format(printf,2,3)));
//void SCR_DrawTextRightAlign( float &y, text:string, ... ) id_attribute((format(printf,2,3)));
//
var	LINE_WIDTH				=78
var	NUM_CON_TIMES			=4
var	CON_TEXTSIZE			=0x30000
var	TOTAL_LINES				=int(CON_TEXTSIZE / LINE_WIDTH)
var CONSOLE_FIRSTREPEAT		=200
var CONSOLE_REPEAT			=100

var COMMAND_HISTORY = 64;

// the console will query the cvar and command systems for
// command completion information

class idConsoleLocal extends idConsole {
//public:
//	virtual	void		Init( );
//	virtual void		Shutdown( );
//	virtual	void		LoadGraphics( );
//	virtual	bool		ProcessEvent( const sysEvent_t *event, bool forceAccept );
//	virtual	bool		Active( );
//	virtual	void		ClearNotifyLines( );
//	virtual	void		Close( );
//	virtual	void		Print( text:string );
//	virtual	void		Draw( bool forceFullScreen );
//
//	void				Dump( const char *toFile );
//	void				Clear();
//
//	//============================
//
	charSetShader: idMaterial;
//
//private:
//	void				KeyDownEvent( int key );
//
//	void				Linefeed();
//
//	void				PageUp();
//	void				PageDown();
//	void				Top();
//	void				Bottom();
//
//	void				DrawInput();
//	void				DrawNotify();
//	void				DrawSolidConsole( float frac );
//
//	void				Scroll();
//	void				SetDisplayFraction( float frac );
//	void				UpdateDisplayFraction( );
//
	//============================

	keyCatching:boolean;

	text = new Int16Array(CON_TEXTSIZE);
	current:number = 0;		// line where next message will be printed		int					
	x: number;				// offset in current line for next print		int					
	display: number = 0;		// bottom of console displays this line			int					
	lastKeyEvent: number;	// time of last key event for scroll delay		int					
	nextKeyEvent: number;	// keyboard repeat rate							int					

	displayFrac:number/*float*/;	// approaches finalFrac at scr_conspeed
	finalFrac:number/*float*/;		// 0.0 to 1.0 lines of console to display
	fracTime:number/*int*/;		// time of last displayFrac update
	
	vislines:number/*int*/;		// in scanlines

	times = new Int32Array(NUM_CON_TIMES);	// cls.realtime time the line was generated
									// for transparent notify lines
	color = new idVec4;

	historyEditLines = newStructArray<idEditField>(idEditField,COMMAND_HISTORY);
	
	nextHistoryLine:number/*int*/;// the last line in the history buffer, not masked
	historyLine:number/*int*/;	// the line being displayed from history buffer
								// will be <= nextHistoryLine

	consoleField = new idEditField;

	static con_speed = new idCVar (  "con_speed", "3", CVAR_SYSTEM, "speed at which the console moves up and down" );
	static con_notifyTime = new idCVar (  "con_notifyTime", "3", CVAR_SYSTEM, "time messages are displayed onscreen when console is pulled up" );
	static con_noPrint = new idCVar (  "con_noPrint", DEBUG ? "0":"1", CVAR_BOOL|CVAR_SYSTEM|CVAR_NOCHEAT, "print on the console but not onscreen when console is pulled up" );
//
	whiteShader: idMaterial;
	consoleShader:idMaterial;
//};



//#ifdef DEBUG
//idCVar idConsoleLocal::con_noPrint( "con_noPrint", "0", CVAR_BOOL|CVAR_SYSTEM|CVAR_NOCHEAT, "print on the console but not onscreen when console is pulled up" );
//#else
//idCVar idConsoleLocal::con_noPrint( "con_noPrint", "1", CVAR_BOOL|CVAR_SYSTEM|CVAR_NOCHEAT, "print on the console but not onscreen when console is pulled up" );
//#endif
//
//
//
///*
//=============================================================================
//
//	Misc stats
//
//=============================================================================
//*/
//
///*
//==================
//SCR_DrawTextLeftAlign
//==================
//*/
//void SCR_DrawTextLeftAlign( float &y, text:string, ... ) {
//	char string[MAX_STRING_CHARS];
//	va_list argptr;
//	va_start( argptr, text );
//	idStr::vsnPrintf( string, sizeof( string ), text, argptr );
//	va_end( argptr );
//	renderSystem.DrawSmallStringExt( 0, y + 2, string, colorWhite, true, localConsole.charSetShader );
//	y += SMALLCHAR_HEIGHT + 4;
//}
//
///*
//==================
//SCR_DrawTextRightAlign
//==================
//*/
//void SCR_DrawTextRightAlign( float &y, text:string, ... ) {
//	char string[MAX_STRING_CHARS];
//	va_list argptr;
//	va_start( argptr, text );
//	int i = idStr::vsnPrintf( string, sizeof( string ), text, argptr );
//	va_end( argptr );
//	renderSystem.DrawSmallStringExt( 635 - i * SMALLCHAR_WIDTH, y + 2, string, colorWhite, true, localConsole.charSetShader );
//	y += SMALLCHAR_HEIGHT + 4;
//}
//
//
//
//
/*
==================
SCR_DrawFPS
==================
*/
FPS_FRAMES	= 4;
	SCR_DrawFPS ( /* float */y: number ): number {
		todo( "SCR_DrawFPS" );
		//char		*s;
		//int			w;
		//static int	previousTimes[FPS_FRAMES];
		//static int	index;
		//int		i, total;
		//int		fps;
		//static	int	previous;
		//int		t, frameTime;

		//// don't use serverTime, because that will be drifting to
		//// correct for internet lag changes, timescales, timedemos, etc
		//t = Sys_Milliseconds();
		//frameTime = t - previous;
		//previous = t;

		//previousTimes[index % FPS_FRAMES] = frameTime;
		//index++;
		//if ( index > FPS_FRAMES ) {
		//	// average multiple frames together to smooth changes out a bit
		//	total = 0;
		//	for ( i = 0 ; i < FPS_FRAMES ; i++ ) {
		//		total += previousTimes[i];
		//	}
		//	if ( !total ) {
		//		total = 1;
		//	}
		//	fps = 10000 * FPS_FRAMES / total;
		//	fps = (fps + 5)/10;

		//	s = va( "%ifps", fps );
		//	w = strlen( s ) * BIGCHAR_WIDTH;

		//	renderSystem.DrawBigStringExt( 635 - w, idMath.FtoiFast( y ) + 2, s, colorWhite, true, localConsole.charSetShader);
		//}

		return y + BIGCHAR_HEIGHT + 4;
	}

///*
//==================
//SCR_DrawMemoryUsage
//==================
//*/
//float SCR_DrawMemoryUsage( float y ) {
//	memoryStats_t allocs, frees;
//	
//	Mem_GetStats( allocs );
//	SCR_DrawTextRightAlign( y, "total allocated memory: %4d, %4dkB", allocs.num, allocs.totalSize>>10 );
//
//	Mem_GetFrameStats( allocs, frees );
//	SCR_DrawTextRightAlign( y, "frame alloc: %4d, %4dkB  frame free: %4d, %4dkB", allocs.num, allocs.totalSize>>10, frees.num, frees.totalSize>>10 );
//
//	Mem_ClearFrameStats();
//
//	return y;
//}
//
///*
//==================
//SCR_DrawAsyncStats
//==================
//*/
//float SCR_DrawAsyncStats( float y ) {
//	int i, outgoingRate, incomingRate;
//	float outgoingCompression, incomingCompression;
//
//	if ( idAsyncNetwork::server.IsActive() ) {
//
//		SCR_DrawTextRightAlign( y, "server delay = %d msec", idAsyncNetwork::server.GetDelay() );
//		SCR_DrawTextRightAlign( y, "total outgoing rate = %d KB/s", idAsyncNetwork::server.GetOutgoingRate() >> 10 );
//		SCR_DrawTextRightAlign( y, "total incoming rate = %d KB/s", idAsyncNetwork::server.GetIncomingRate() >> 10 );
//
//		for ( i = 0; i < MAX_ASYNC_CLIENTS; i++ ) {
//
//			outgoingRate = idAsyncNetwork::server.GetClientOutgoingRate( i );
//			incomingRate = idAsyncNetwork::server.GetClientIncomingRate( i );
//			outgoingCompression = idAsyncNetwork::server.GetClientOutgoingCompression( i );
//			incomingCompression = idAsyncNetwork::server.GetClientIncomingCompression( i );
//
//			if ( outgoingRate != -1 && incomingRate != -1 ) {
//				SCR_DrawTextRightAlign( y, "client %d: out rate = %d B/s (% -2.1f%%), in rate = %d B/s (% -2.1f%%)",
//											i, outgoingRate, outgoingCompression, incomingRate, incomingCompression );
//			}
//		}
//
//		idStr msg;
//		idAsyncNetwork::server.GetAsyncStatsAvgMsg( msg );
//		SCR_DrawTextRightAlign( y, msg.c_str() );
//
//	} else if ( idAsyncNetwork::client.IsActive() ) {
//
//		outgoingRate = idAsyncNetwork::client.GetOutgoingRate();
//		incomingRate = idAsyncNetwork::client.GetIncomingRate();
//		outgoingCompression = idAsyncNetwork::client.GetOutgoingCompression();
//		incomingCompression = idAsyncNetwork::client.GetIncomingCompression();
//
//		if ( outgoingRate != -1 && incomingRate != -1 ) {
//			SCR_DrawTextRightAlign( y, "out rate = %d B/s (% -2.1f%%), in rate = %d B/s (% -2.1f%%)",
//										outgoingRate, outgoingCompression, incomingRate, incomingCompression );
//		}
//
//		SCR_DrawTextRightAlign( y, "packet loss = %d%%, client prediction = %d",
//									(int)idAsyncNetwork::client.GetIncomingPacketLoss(), idAsyncNetwork::client.GetPrediction() );
//
//		SCR_DrawTextRightAlign( y, "predicted frames: %d", idAsyncNetwork::client.GetPredictedFrames() );
//
//	}
//
//	return y;
//}
//
///*
//==================
//SCR_DrawSoundDecoders
//==================
//*/
//float SCR_DrawSoundDecoders( float y ) {
//	int index, numActiveDecoders;
//	soundDecoderInfo_t decoderInfo;
//
//	index = -1;
//	numActiveDecoders = 0;
//	while( ( index = soundSystem.GetSoundDecoderInfo( index, decoderInfo ) ) != -1 ) {
//		int localTime = decoderInfo.current44kHzTime - decoderInfo.start44kHzTime;
//		int sampleTime = decoderInfo.num44kHzSamples / decoderInfo.numChannels;
//		int percent;
//		if ( localTime > sampleTime ) {
//			if ( decoderInfo.looping ) {
//				percent = ( localTime % sampleTime ) * 100 / sampleTime;
//			} else {
//				percent = 100;
//			}
//		} else {
//			percent = localTime * 100 / sampleTime;
//		}
//		SCR_DrawTextLeftAlign( y, "%3d: %3d%% (%1.2f) %s: %s (%dkB)", numActiveDecoders, percent, decoderInfo.lastVolume, decoderInfo.format.c_str(), decoderInfo.name.c_str(), decoderInfo.numBytes >> 10 );
//		numActiveDecoders++;
//	}
//	return y;
//}
//
//=========================================================================

	/*
==============
Con_Clear_f
==============
*/
	static Con_Clear_f ( args: idCmdArgs ) {
		todoThrow ( );
		//localConsole.Clear ( );
	}

/*
==============
Con_Dump_f
==============
*/
	static Con_Dump_f ( args: idCmdArgs ): void {
		todoThrow ( );
		//if ( args.Argc() != 2 ) {
		//	common.Printf( "usage: conDump <filename>\n" );
		//	return;
		//}

		//idStr fileName = args.Argv(1);
		//fileName.DefaultFileExtension(".txt");

		//common.Printf( "Dumped console text to %s.\n", fileName.c_str() );

		//localConsole.Dump( fileName.c_str() );
	}

/*
==============
idConsoleLocal::Init
==============
*/
	Init ( ): void {
		var i: number;

		this.keyCatching = false;

		this.lastKeyEvent = -1;
		this.nextKeyEvent = CONSOLE_FIRSTREPEAT;

		this.consoleField.Clear ( );

		this.consoleField.SetWidthInChars( LINE_WIDTH );

		for ( i = 0; i < COMMAND_HISTORY; i++ ) {
			this.historyEditLines[i].Clear ( );
			this.historyEditLines[i].SetWidthInChars( LINE_WIDTH );
		}

		cmdSystem.AddCommand( "clear", idConsoleLocal.Con_Clear_f, cmdFlags_t.CMD_FL_SYSTEM, "clears the console" );
		cmdSystem.AddCommand( "conDump", idConsoleLocal.Con_Dump_f, cmdFlags_t.CMD_FL_SYSTEM, "dumps the console text to a file" );
	}

///*
//==============
//idConsoleLocal::Shutdown
//==============
//*/
//void idConsoleLocal::Shutdown( ) {
//	cmdSystem.RemoveCommand( "clear" );
//	cmdSystem.RemoveCommand( "conDump" );
//}
//
/*
==============
LoadGraphics

Can't be combined with init, because init happens before
the renderSystem is initialized
==============
*/

	LoadGraphics ( ): void {
		this.charSetShader = declManager.FindMaterial( "textures/bigchars" );
		this.whiteShader = declManager.FindMaterial( "_white" );
		this.consoleShader = declManager.FindMaterial( "console" );
	}
//
///*
//================
//idConsoleLocal::Active
//================
//*/
//bool	idConsoleLocal::Active( ) {
//	return this.keyCatching;
//}
//
/*
================
idConsoleLocal::ClearNotifyLines
================
*/
	ClearNotifyLines ( ): void {
		var i: number;

		for ( i = 0; i < NUM_CON_TIMES; i++ ) {
			this.times[i] = 0;
		}
	}

/*
================
idConsoleLocal::Close
================
*/
	Close ( ): void {
		this.keyCatching = false;
		this.SetDisplayFraction( 0 );
		this.displayFrac = 0; // don't scroll to that point, go immediately
		this.ClearNotifyLines ( );
	}

///*
//================
//idConsoleLocal::Clear
//================
//*/
//void idConsoleLocal::Clear() {
//	var i:number;
//
//	for ( i = 0 ; i < CON_TEXTSIZE ; i++ ) {
//		text[i] = (idStr.ColorIndex(C_COLOR_CYAN)<<8) | ' ';
//	}
//
//	Bottom();		// go to end
//}
//
///*
//================
//idConsoleLocal::Dump
//
//Save the console contents out to a file
//================
//*/
//void idConsoleLocal::Dump( const char *fileName ) {
//	int		l, x, i;
//	short *	line;
//	idFile *f;
//	char	buffer[LINE_WIDTH + 3];
//
//	f = fileSystem.OpenFileWrite( fileName );
//	if ( !f ) {
//		common.Warning( "couldn't open %s", fileName );
//		return;
//	}
//
//	// skip empty lines
//	l = this.current - TOTAL_LINES + 1;
//	if ( l < 0 ) {
//		l = 0;
//	}
//	for ( ; l <= this.current ; l++ )
//	{
//		line = text + ( l % TOTAL_LINES ) * LINE_WIDTH;
//		for ( x = 0; x < LINE_WIDTH; x++ )
//			if ( ( line[x] & 0xff ) > ' ' )
//				break;
//		if ( x != LINE_WIDTH )
//			break;
//	}
//
//	// write the remaining lines
//	for ( ; l <= this.current; l++ ) {
//		line = text + ( l % TOTAL_LINES ) * LINE_WIDTH;
//		for( i = 0; i < LINE_WIDTH; i++ ) {
//			buffer[i] = line[i] & 0xff;
//		}
//		for ( x = LINE_WIDTH-1; x >= 0; x-- ) {
//			if ( buffer[x] <= ' ' ) {
//				buffer[x] = 0;
//			} else {
//				break;
//			}
//		}
//		buffer[x+1] = '\r';
//		buffer[x+2] = '\n';
//		buffer[x+3] = 0;
//		f.Write( buffer, strlen( buffer ) );
//	}
//
//	fileSystem.CloseFile( f );
//}

/*
================
idConsoleLocal::PageUp
================
*/
PageUp( ):void {
	this.display -= 2;
	if ( this.current - this.display >= TOTAL_LINES ) {
		this.display = this.current - TOTAL_LINES + 1;
	}
}

/*
================
idConsoleLocal::PageDown
================
*/
PageDown( ):void {
	this.display += 2;
	if ( this.display > this.current ) {
		this.display = this.current;
	}
}

/*
================
idConsoleLocal::Top
================
*/
Top( ):void {
	this.display = 0;
}

/*
================
idConsoleLocal::Bottom
================
*/
Bottom( ):void {
	this.display = this.current;
}

//
///*
//=============================================================================
//
//CONSOLE LINE EDITING
//
//==============================================================================
//*/
//
///*
//====================
//KeyDownEvent
//
//Handles history and console scrollback
//====================
//*/
//void idConsoleLocal::KeyDownEvent( int key ) {
//	
//	// Execute F key bindings
//	if ( key >= K_F1 && key <= K_F12 ) {
//		idKeyInput::ExecKeyBinding( key );
//		return;
//	}
//
//	// ctrl-L clears screen
//	if ( key == 'l' && idKeyInput.IsDown( K_CTRL ) ) {
//		Clear();
//		return;
//	}
//
//	// enter finishes the line
//	if ( key == K_ENTER || key == K_KP_ENTER ) {
//
//		common.Printf ( "]%s\n", this.consoleField.GetBuffer() );
//
//		cmdSystem.BufferCommandText( CMD_EXEC_APPEND, this.consoleField.GetBuffer() );	// valid command
//		cmdSystem.BufferCommandText( CMD_EXEC_APPEND, "\n" );
//
//		// copy line to history buffer
//		historyEditLines[nextHistoryLine % COMMAND_HISTORY] = this.consoleField;
//		nextHistoryLine++;
//		historyLine = nextHistoryLine;
//
//		this.consoleField.Clear();
//		this.consoleField.SetWidthInChars( LINE_WIDTH );
//
//		session.UpdateScreen();// force an update, because the command
//								// may take some time
//		return;
//	}
//
//	// command completion
//
//	if ( key == K_TAB ) {
//		this.consoleField.AutoComplete();
//		return;
//	}
//
//	// command history (ctrl-p ctrl-n for unix style)
//
//	if ( ( key == K_UPARROW ) ||
//		 ( ( tolower(key) == 'p' ) && idKeyInput.IsDown( K_CTRL ) ) ) {
//		if ( nextHistoryLine - historyLine < COMMAND_HISTORY && historyLine > 0 ) {
//			historyLine--;
//		}
//		this.consoleField = historyEditLines[ historyLine % COMMAND_HISTORY ];
//		return;
//	}
//
//	if ( ( key == K_DOWNARROW ) ||
//		 ( ( tolower( key ) == 'n' ) && idKeyInput.IsDown( K_CTRL ) ) ) {
//		if ( historyLine == nextHistoryLine ) {
//			return;
//		}
//		historyLine++;
//		this.consoleField = historyEditLines[ historyLine % COMMAND_HISTORY ];
//		return;
//	}
//
//	// console scrolling
//	if ( key == K_PGUP ) {
//		PageUp();
//		this.lastKeyEvent = eventLoop.Milliseconds();
//		this.nextKeyEvent = CONSOLE_FIRSTREPEAT;
//		return;
//	}
//
//	if ( key == K_PGDN ) {
//		PageDown();
//		this.lastKeyEvent = eventLoop.Milliseconds();
//		this.nextKeyEvent = CONSOLE_FIRSTREPEAT;
//		return;
//	}
//
//	if ( key == K_MWHEELUP ) {
//		PageUp();
//		return;
//	}
//
//	if ( key == K_MWHEELDOWN ) {
//		PageDown();
//		return;
//	}
//
//	// ctrl-home = top of console
//	if ( key == K_HOME && idKeyInput.IsDown( K_CTRL ) ) {
//		Top();
//		return;
//	}
//
//	// ctrl-end = bottom of console
//	if ( key == K_END && idKeyInput.IsDown( K_CTRL ) ) {
//		Bottom();
//		return;
//	}
//
//	// pass to the normal editline routine
//	this.consoleField.KeyDownEvent( key );
//}
//
/*
==============
Scroll
deals with scrolling text because we don't have key repeat
==============
*/
	Scroll ( ): void {
		if ( this.lastKeyEvent == -1 || ( this.lastKeyEvent + 200 ) > eventLoop.Milliseconds ( ) ) {
			return;
		}
		// console scrolling
		if ( idKeyInput.IsDown( keyNum_t.K_PGUP ) ) {
			this.PageUp ( );
			this.nextKeyEvent = CONSOLE_REPEAT;
			return;
		}

		if ( idKeyInput.IsDown( keyNum_t.K_PGDN ) ) {
			this.PageDown ( );
			this.nextKeyEvent = CONSOLE_REPEAT;
			return;
		}
	}

/*
==============
SetDisplayFraction

Causes the console to start opening the desired amount.
==============
*/
	SetDisplayFraction ( frac: number /*float */ ): void {
		this.finalFrac = frac;
		this.fracTime = com_frameTime;
	}

/*
==============
UpdateDisplayFraction

Scrolls the console up or down based on conspeed
==============
*/
	UpdateDisplayFraction ( ): void {
		if ( idConsoleLocal.con_speed.GetFloat ( ) <= 0.1 ) {
			this.fracTime = com_frameTime;
			this.displayFrac = this.finalFrac;
			return;
		}

		// scroll towards the destination height
		if ( this.finalFrac < this.displayFrac ) {
			this.displayFrac -= idConsoleLocal.con_speed.GetFloat ( ) * ( com_frameTime - this.fracTime ) * 0.001;
			if ( this.finalFrac > this.displayFrac ) {
				this.displayFrac = this.finalFrac;
			}
			this.fracTime = com_frameTime;
		} else if ( this.finalFrac > this.displayFrac ) {
			this.displayFrac += idConsoleLocal.con_speed.GetFloat ( ) * ( com_frameTime - this.fracTime ) * 0.001;
			if ( this.finalFrac < this.displayFrac ) {
				this.displayFrac = this.finalFrac;
			}
			this.fracTime = com_frameTime;
		}
	}

///*
//==============
//ProcessEvent
//==============
//*/
//bool	idConsoleLocal::ProcessEvent( const sysEvent_t *event, bool forceAccept ) {
//	bool consoleKey;
//	consoleKey = event.evType == SE_KEY && ( event.evValue == Sys_GetConsoleKey( false ) || event.evValue == Sys_GetConsoleKey( true ) );
//
//#if ID_CONSOLE_LOCK
//	// If the console's not already down, and we have it turned off, check for ctrl+alt
//	if ( !this.keyCatching && !com_allowConsole.GetBool() ) {
//		if ( !idKeyInput.IsDown( K_CTRL ) || !idKeyInput.IsDown( K_ALT ) ) {
//			consoleKey = false;
//		}
//	}
//#endif
//
//	// we always catch the console key event
//	if ( !forceAccept && consoleKey ) {
//		// ignore up events
//		if ( event.evValue2 == 0 ) {
//			return true;
//		}
//
//		this.consoleField.ClearAutoComplete();
//
//		// a down event will toggle the destination lines
//		if ( this.keyCatching ) {
//			this.Close();
//			Sys_GrabMouseCursor( true );
//			cvarSystem.SetCVarBool( "ui_chat", false );
//		} else {
//			this.consoleField.Clear();
//			this.keyCatching = true;
//			if ( idKeyInput.IsDown( K_SHIFT ) ) {
//				// if the shift key is down, don't open the console as much
//				SetDisplayFraction( 0.2f );
//			} else {
//				SetDisplayFraction( 0.5f );
//			}
//			cvarSystem.SetCVarBool( "ui_chat", true );
//		}
//		return true;
//	}
//
//	// if we aren't key catching, dump all the other events
//	if ( !forceAccept && !this.keyCatching ) {
//		return false;
//	}
//
//	// handle key and character events
//	if ( event.evType == SE_CHAR ) {
//		// never send the console key as a character
//		if ( event.evValue != Sys_GetConsoleKey( false ) && event.evValue != Sys_GetConsoleKey( true ) ) {
//			this.consoleField.CharEvent( event.evValue );
//		}
//		return true;
//	}
//
//	if ( event.evType == SE_KEY ) {
//		// ignore up key events
//		if ( event.evValue2 == 0 ) {
//			return true;
//		}
//
//		KeyDownEvent( event.evValue );
//		return true;
//	}
//
//	// we don't handle things like mouse, joystick, and network packets
//	return false;
//}
//
/*
==============================================================================

PRINTING

==============================================================================
*/

/*
===============
Linefeed
===============
*/
	Linefeed ( ): void {
		var i: number;

		// mark time for transparent overlay
		if ( this.current >= 0 ) {
			this.times[this.current % NUM_CON_TIMES] = com_frameTime;
		}

		this.x = 0;
		if ( this.display == this.current ) {
			this.display++;
		}
		this.current++;
		for ( i = 0; i < LINE_WIDTH; i++ ) {
			this.text[( this.current % TOTAL_LINES ) * LINE_WIDTH + i] = ( idStr.ColorIndex( C_COLOR_CYAN.charCodeAt( 0 ) ) << 8 ) | ' '.charCodeAt( 0 );
		}
	}


/*
================
Print

Handles cursor positioning, line wrapping, etc
================
*/
	Print ( txt: string ): void {
		var txtIdx = 0;
		var /*int*/ y: number;
		var /*int*/ c: string, l: number;
		var /*int*/ color: number;

//#ifdef ID_ALLOW_TOOLS
//	RadiantPrint( txt );

//	if( com_editors & EDITOR_MATERIAL ) {
//		MaterialEditorPrintConsole(txt);
//	}
//#endif

		color = idStr.ColorIndex( C_COLOR_CYAN.charCodeAt( 0 ) );

		while ( c = txt[txtIdx] /*(c = *(const unsigned char*)txt) != 0 */ ) {
			if ( idStr.IsColor( txt[txtIdx]  ) ) {
				if ( txt[txtIdx + 1] == C_COLOR_DEFAULT ) {
					color = idStr.ColorIndex( C_COLOR_CYAN.charCodeAt( 0 ) );
				} else {
					color = idStr.ColorIndex( ( txt.charCodeAt( txtIdx + 1 ) ) );
				}
				txtIdx += 2;
				continue;
			}

			y = this.current % TOTAL_LINES;

			// if we are about to print a new word, check to see
			// if we should wrap to the new line
			if ( c > ' ' && ( this.x == 0 || this.text[y * LINE_WIDTH + this.x - 1] <= ' '.charCodeAt( 0 ) ) ) {
				// count word length
				for ( l = 0; l < LINE_WIDTH; l++ ) {
					if ( txt[txtIdx + l] <= ' ' ) {
						break;
					}
				}

				// word wrap
				if ( l != LINE_WIDTH && ( this.x + l >= LINE_WIDTH ) ) {
					this.Linefeed ( );
				}
			}

			txtIdx++;

			switch ( c ) {
			case '\n':
				this.Linefeed ( );
				break;
			case '\t':
				do {
					this.text[y * LINE_WIDTH + this.x] = ( color << 8 ) | ' '.charCodeAt( 0 );
					this.x++;
					if ( this.x >= LINE_WIDTH ) {
						this.Linefeed ( );
						this.x = 0;
					}
				} while ( this.x & 3 );
				break;
			case '\r':
				this.x = 0;
				break;
			default: // display character and advance
				this.text[y * LINE_WIDTH + this.x] = ( color << 8 ) | c.charCodeAt( 0 );
				this.x++;
				if ( this.x >= LINE_WIDTH ) {
					this.Linefeed ( );
					this.x = 0;
				}
				break;
			}
		}


		// mark time for transparent overlay
		if ( this.current >= 0 ) {
			this.times[this.current % NUM_CON_TIMES] = com_frameTime;
		}
	}


/*
==============================================================================

DRAWING

==============================================================================
*/


/*
================
DrawInput

Draw the editline after a ] prompt
================
*/
	DrawInput ( ): void {
		var /*int */y: number, autoCompleteLength: number;

		y = this.vislines - ( SMALLCHAR_HEIGHT * 2 );

		if ( this.consoleField.GetAutoCompleteLength ( ) != 0 ) {
			autoCompleteLength = strlen( this.consoleField.GetBuffer ( ) ) - this.consoleField.GetAutoCompleteLength ( );

			if ( autoCompleteLength > 0 ) {
				renderSystem.SetColor4( .8, .2, .2, .45 );

				renderSystem.DrawStretchPicFloats( 2 * SMALLCHAR_WIDTH + this.consoleField.GetAutoCompleteLength ( ) * SMALLCHAR_WIDTH,
					y + 2, autoCompleteLength * SMALLCHAR_WIDTH, SMALLCHAR_HEIGHT - 2, 0, 0, 0, 0, this.whiteShader );

			}
		}

		renderSystem.SetColor( idStr.ColorForIndex( C_COLOR_CYAN.charCodeAt( 0 ) ) );

		renderSystem.DrawSmallChar( 1 * SMALLCHAR_WIDTH, y, ']'.charCodeAt(0), localConsole.charSetShader );

		this.consoleField.Draw( 2 * SMALLCHAR_WIDTH, y, SCREEN_WIDTH - 3 * SMALLCHAR_WIDTH, true, this.charSetShader );
	}


///*
//================
//DrawNotify
//
//Draws the last few lines of output transparently over the game top
//================
//*/
//void idConsoleLocal::DrawNotify() {
//	int		x, v;
//	short	*text_p;
//	var i:number;
//	int		time;
//	int		currentColor;
//
//	if ( con_noPrint.GetBool() ) {
//		return;
//	}
//
//	currentColor = idStr.ColorIndex( C_COLOR_WHITE );
//	renderSystem.SetColor( idStr.ColorForIndex( currentColor ) );
//
//	v = 0;
//	for ( i = this.current-NUM_CON_TIMES+1; i <= this.current; i++ ) {
//		if ( i < 0 ) {
//			continue;
//		}
//		time = this.times[i % NUM_CON_TIMES];
//		if ( time == 0 ) {
//			continue;
//		}
//		time = com_frameTime - time;
//		if ( time > con_notifyTime.GetFloat() * 1000 ) {
//			continue;
//		}
//		text_p = text + (i % TOTAL_LINES)*LINE_WIDTH;
//		
//		for ( x = 0; x < LINE_WIDTH; x++ ) {
//			if ( ( text_p[x] & 0xff ) == ' ' ) {
//				continue;
//			}
//			if ( idStr.ColorIndex(text_p[x]>>8) != currentColor ) {
//				currentColor = idStr.ColorIndex(text_p[x]>>8);
//				renderSystem.SetColor( idStr.ColorForIndex( currentColor ) );
//			}
//			renderSystem.DrawSmallChar( (x+1)*SMALLCHAR_WIDTH, v, text_p[x] & 0xff, localConsole.charSetShader );
//		}
//
//		v += SMALLCHAR_HEIGHT;
//	}
//
//	renderSystem.SetColor( colorCyan );
//}
//
/*
================
DrawSolidConsole

Draws the console with the solid background
================
*/
	DrawSolidConsole ( frac: number /*float */ ): void {
		var i: number, x: number; //int				
		var y: number; //float			
		var rows: number; //int
		var text_p: Uint16Array; //short			
		var row: number; //int				
		var lines: number; //int				
		var currentColor: number; //int				

		lines = idMath.FtoiFast( SCREEN_HEIGHT * frac );
		if ( lines <= 0 ) {
			return;
		}

		if ( lines > SCREEN_HEIGHT ) {
			lines = SCREEN_HEIGHT;
		}

		// draw the background
		y = frac * SCREEN_HEIGHT - 2;
		if ( y < 1.0 ) {
			y = 0.0;
		} else {
			renderSystem.DrawStretchPicFloats( 0, 0, SCREEN_WIDTH, y, 0, 1.0 - this.displayFrac, 1, 1, this.consoleShader );
		}

		renderSystem.SetColor( colorCyan );
		renderSystem.DrawStretchPicFloats( 0, y, SCREEN_WIDTH, 2, 0, 0, 0, 0, this.whiteShader );
		renderSystem.SetColor( colorWhite );

		// draw the version number

		renderSystem.SetColor( idStr.ColorForIndex( C_COLOR_CYAN.charCodeAt( 0 ) ) );

		var /*idStr */version = new idStr( va( "%s.%i", ENGINE_VERSION, BUILD_NUMBER ) );
		i = version.Length ( );

		for ( x = 0; x < i; x++ ) {
			renderSystem.DrawSmallChar( SCREEN_WIDTH - ( i - x ) * SMALLCHAR_WIDTH,
			( lines - ( SMALLCHAR_HEIGHT + SMALLCHAR_HEIGHT / 2 ) ), version[x], localConsole.charSetShader );

		}


		// draw the text
		this.vislines = lines;
		rows = int( ( lines - SMALLCHAR_WIDTH ) / SMALLCHAR_WIDTH ); // rows of text to draw

		y = lines - ( SMALLCHAR_HEIGHT * 3 );

		// draw from the bottom up
		if ( this.display != this.current ) {
			// draw arrows to show the buffer is backscrolled
			renderSystem.SetColor( idStr.ColorForIndex( C_COLOR_CYAN.charCodeAt( 0 ) ) );
			for ( x = 0; x < LINE_WIDTH; x += 4 ) {
				todoThrow ( );
				//renderSystem.DrawSmallChar( ( x + 1 ) * SMALLCHAR_WIDTH, idMath.FtoiFast( y ), '^', localConsole.charSetShader );
			}
			y -= SMALLCHAR_HEIGHT;
			rows--;
		}

		row = this.display;

		if ( x == 0 ) {
			row--;
		}

		currentColor = idStr.ColorIndex( C_COLOR_WHITE.charCodeAt( 0 ) );
		renderSystem.SetColor( idStr.ColorForIndex( currentColor ) );

		for ( i = 0; i < rows; i++, y -= SMALLCHAR_HEIGHT, row-- ) {
			if ( row < 0 ) {
				break;
			}
			if ( this.current - row >= TOTAL_LINES ) {
				// past scrollback wrap point
				continue;
			}

			text_p = this.text.subarray( ( row % TOTAL_LINES ) * LINE_WIDTH );

			for ( x = 0; x < LINE_WIDTH; x++ ) {
				if ( ( text_p[x] & 0xff ) == ' '.charCodeAt( 0 ) ) {
					continue;
				}

				if ( idStr.ColorIndex( text_p[x] >> 8 ) != currentColor ) {
					currentColor = idStr.ColorIndex( text_p[x] >> 8 );
					renderSystem.SetColor( idStr.ColorForIndex( currentColor ) );
				}
				renderSystem.DrawSmallChar( ( x + 1 ) * SMALLCHAR_WIDTH, idMath.FtoiFast( y ), text_p[x] & 0xff, localConsole.charSetShader );
			}
		}

		// draw the input prompt, user text, and cursor if desired
		this.DrawInput ( );

		renderSystem.SetColor( colorCyan );
	}


/*
==============
Draw

ForceFullScreen is used by the editor
==============
*/
	Draw ( forceFullScreen: boolean ): void {
		var y = 0.0;

		if ( !this.charSetShader ) {
			return;
		}

		if ( forceFullScreen ) {
			// if we are forced full screen because of a disconnect, 
			// we want the console closed when we go back to a session state
			this.Close ( );
			// we are however catching keyboard input
			this.keyCatching = true;
		}

		this.Scroll ( );

		this.UpdateDisplayFraction ( );

		if ( forceFullScreen ) {
			this.DrawSolidConsole( 1.0 );
		} else if ( this.displayFrac ) {
			this.DrawSolidConsole( this.displayFrac );
		} else {
			// only draw the notify lines if the developer cvar is set,
			// or we are a debug build
			if (!idConsoleLocal.con_noPrint.GetBool()) {
				todoThrow ( );
				//DrawNotify ( );
			}
		}

		if (com_showFPS.GetBool()) {
			y = this.SCR_DrawFPS( 0 );
		}

		if ( com_showMemoryUsage.GetBool ( ) ) {
			todoThrow();
			//y = SCR_DrawMemoryUsage( y );
		}

		if ( com_showAsyncStats.GetBool ( ) ) {
			todoThrow();
			//y = SCR_DrawAsyncStats( y );
		}

		if ( com_showSoundDecoders.GetBool ( ) ) {
			todoThrow();
			//y = SCR_DrawSoundDecoders( y );
		}
	}

}

var localConsole = new idConsoleLocal;
var $console: idConsoleLocal = localConsole;