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


var MAX_PUSHED_EVENTS = 64;

class idEventLoop {
	//public:
	//					idEventLoop( void );
	//					~idEventLoop( void );
	//
	//	void			Init( void );
	//
	//					// Closes the journal file if needed.
	//	void			Shutdown( void );
	//
	//					// It is possible to get an event at the beginning of a frame that
	//					// has a time stamp lower than the last event from the previous frame.
	//	sysEvent_t		GetEvent( void );
	//
	//					// Dispatches all pending events and returns the current time.
	//	int				RunEventLoop( bool commandExecution = true );
	//
	//					// Gets the current time in a way that will be journaled properly,
	//					// as opposed to Sys_Milliseconds(), which always reads a real timer.
	//	int				Milliseconds( void );
	//
	//					// Returns the journal level, 1 = record, 2 = play back.
	//	int				JournalLevel( void ) const;

	// Journal file.
	com_journalFile: idFile;
	com_journalDataFile: idFile;

	//private:
	//					// all events will have this subtracted from their time
	initialTimeOffset: number; //	int				
	//
	com_pushedEventsHead: number;
	com_pushedEventsTail: number; //	int				
	com_pushedEvents = new Array<sysEvent_t>(MAX_PUSHED_EVENTS);
	//
	//	static idCVar	com_journal;
	//
	//	sysEvent_t		GetRealEvent( void );
	//	void			ProcessEvent( sysEvent_t ev );
	//	void			PushEvent( sysEvent_t *event );


	//#include "../idlib/precompiled.h"
	//#pragma hdrstop
	//
	static com_journal = new idCVar( "com_journal", "0", CVAR_INIT | CVAR_SYSTEM, "1 = record journal, 2 = play back journal", 0, 2, ArgCompletion_Integer_Template( 0, 2 ) );
	//
	//
	//
	/*
	=================
	idEventLoop::idEventLoop
	=================
	*/
	constructor ( ) {
		this.com_journalFile = null;
		this.com_journalDataFile = null;
		this.initialTimeOffset = 0;
	}

	///*
	//=================
	//idEventLoop::~idEventLoop
	//=================
	//*/
	//idEventLoop::~idEventLoop( void ) {
	//}
	//
	/*
	=================
	idEventLoop::GetRealEvent
	=================
	*/
	GetRealEvent ( ): sysEvent_t {
		var /*int*/r: number;
		var ev: sysEvent_t;

		// either get an event from the system or the journal file
		if ( idEventLoop.com_journal.GetInteger ( ) == 2 ) {
			todoThrow ( );
			//r = com_journalFile.Read( &ev, sizeof(ev) );
			//if ( r != sizeof(ev) ) {
			//	common.FatalError( "Error reading from journal file" );
			//}
			//if ( ev.evPtrLength ) {
			//	ev.evPtr = Mem_ClearedAlloc( ev.evPtrLength );
			//	r = com_journalFile.Read( ev.evPtr, ev.evPtrLength );
			//	if ( r != ev.evPtrLength ) {
			//		common.FatalError( "Error reading from journal file" );
			//	}
			//}
		} else {
			ev = Sys_GetEvent ( );

			// write the journal value out if needed
			if ( idEventLoop.com_journal.GetInteger ( ) == 1 ) {
				todoThrow ( );
				//r = com_journalFile.Write( ev, sizeof(ev) );
				//if ( r != sizeof(ev) ) {
				//	common.FatalError( "Error writing to journal file" );
				//}
				//if ( ev.evPtrLength ) {
				//	r = com_journalFile.Write( ev.evPtr, ev.evPtrLength );
				//	if ( r != ev.evPtrLength ) {
				//		common.FatalError( "Error writing to journal file" );
				//	}
				//}
			}
		}

		return ev;
	}
	//
	///*
	//=================
	//idEventLoop::PushEvent
	//=================
	//*/
	//void idEventLoop::PushEvent( sysEvent_t *event ) {
	//	sysEvent_t		*ev;
	//	static			bool printedWarning;
	//
	//	ev = &com_pushedEvents[ this.com_pushedEventsHead & (MAX_PUSHED_EVENTS-1) ];
	//
	//	if ( this.com_pushedEventsHead - this.com_pushedEventsTail >= MAX_PUSHED_EVENTS ) {
	//
	//		// don't print the warning constantly, or it can give time for more...
	//		if ( !printedWarning ) {
	//			printedWarning = true;
	//			common.Printf( "WARNING: Com_PushEvent overflow\n" );
	//		}
	//
	//		if ( ev.evPtr ) {
	//			Mem_Free( ev.evPtr );
	//		}
	//		this.com_pushedEventsTail++;
	//	} else {
	//		printedWarning = false;
	//	}
	//
	//	*ev = *event;
	//	this.com_pushedEventsHead++;
	//}
	//
	/*
	=================
	idEventLoop::GetEvent
	=================
	*/
	GetEvent ( ): sysEvent_t {
		if ( this.com_pushedEventsHead > this.com_pushedEventsTail ) {
			this.com_pushedEventsTail++;
			return this.com_pushedEvents[( this.com_pushedEventsTail - 1 ) & ( MAX_PUSHED_EVENTS - 1 )];
		}
		return this.GetRealEvent ( );
	}

	///*
	//=================
	//idEventLoop::ProcessEvent
	//=================
	//*/
	//void idEventLoop::ProcessEvent( sysEvent_t ev ) {
	//	// track key up / down states
	//	if ( ev.evType == SE_KEY ) {
	//		idKeyInput::PreliminaryKeyEvent( ev.evValue, ( ev.evValue2 != 0 ) );
	//	}
	//
	//	if ( ev.evType == SE_CONSOLE ) {
	//		// from a text console outside the game window
	//		cmdSystem.BufferCommandText( CMD_EXEC_APPEND, (char *)ev.evPtr );
	//		cmdSystem.BufferCommandText( CMD_EXEC_APPEND, "\n" );
	//	} else {
	//		session.ProcessEvent( &ev );
	//	}
	//
	//	// free any block data
	//	if ( ev.evPtr ) {
	//		Mem_Free( ev.evPtr );
	//	}
	//}
	//
	/*
	===============
	idEventLoop::RunEventLoop
	===============
	*/
	RunEventLoop ( commandExecution: boolean=true ): number {
		var ev: sysEvent_t;

		while ( 1 ) {

			if ( commandExecution ) {
				// execute any bound commands before processing another event
				cmdSystem.ExecuteCommandBuffer ( );
			}
			todoThrow ( );
			//ev = this.GetEvent ( );

			//// if no more events are available
			//if ( ev.evType == sysEventType_t.SE_NONE ) {
			//	return 0;
			//}
			//this.ProcessEvent( ev );
		}

		return 0; // never reached
	}

	/*
	=============
	idEventLoop::Init
	=============
	*/
	Init ( ): void {

		this.initialTimeOffset = Sys_Milliseconds ( );

		common.StartupVariable( "journal", false );

		if ( idEventLoop.com_journal.GetInteger ( ) == 1 ) {
			todoThrow ( );
			//common.Printf( "Journaling events\n" );
			//this.com_journalFile = fileSystem.OpenFileWrite("journal.dat");
			//this.com_journalDataFile = fileSystem.OpenFileWrite( "journaldata.dat" );
		} else if ( idEventLoop.com_journal.GetInteger ( ) == 2 ) {
			todoThrow ( );
			//common.Printf( "Replaying journaled events\n" );
			//this.com_journalFile = fileSystem.OpenFileRead("journal.dat");
			//this.com_journalDataFile = fileSystem.OpenFileRead( "journaldata.dat" );
		}

		if ( !this.com_journalFile || !this.com_journalDataFile ) {
			idEventLoop.com_journal.SetInteger( 0 );
			this.com_journalFile = null;
			this.com_journalDataFile = null;
			common.Printf( "Couldn't open journal files\n" );
		}
	}

	///*
	//=============
	//idEventLoop::Shutdown
	//=============
	//*/
	//void idEventLoop::Shutdown( void ) {
	//	if ( com_journalFile ) {
	//		fileSystem.CloseFile( com_journalFile );
	//		com_journalFile = NULL;
	//	}
	//	if ( com_journalDataFile ) {
	//		fileSystem.CloseFile( com_journalDataFile );
	//		com_journalDataFile = NULL;
	//	}
	//}
	//
	/*
	================
	idEventLoop::Milliseconds

	Can be used for profiling, but will be journaled accurately
	================
	*/
	Milliseconds ( ): number {
		//#if 1	// FIXME!
		return Sys_Milliseconds ( ) - this.initialTimeOffset;
		//#else
		//	sysEvent_t	ev;

		//	// get events and push them until we get a null event with the current time
		//	do {

		//		ev = Com_GetRealEvent();
		//		if ( ev.evType != SE_NONE ) {
		//			Com_PushEvent( &ev );
		//		}
		//	} while ( ev.evType != SE_NONE );

		//	return ev.evTime;
		//#endif
	}

/*
================
idEventLoop::JournalLevel
================
*/
	JournalLevel ( ): number {
		return idEventLoop.com_journal.GetInteger ( );
	}
}


var eventLoopLocal = new idEventLoop;
var eventLoop = eventLoopLocal;