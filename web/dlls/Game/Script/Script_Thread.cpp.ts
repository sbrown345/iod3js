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
//#include "../../idlib/precompiled.h"
//#pragma hdrstop
//
//#include "../Game_local.h"
//
var EV_Thread_Execute = new idEventDef("<execute>", null );
var EV_Thread_SetCallback = new idEventDef("<script_setcallback>", null );
//																	
// script callable events
var EV_Thread_TerminateThread = new idEventDef( "terminate", "d" );
var EV_Thread_Pause = new idEventDef( "pause", null );
var EV_Thread_Wait = new idEventDef( "wait", "f" );
var EV_Thread_WaitFrame = new idEventDef( "waitFrame" );
var EV_Thread_WaitFor = new idEventDef( "waitFor", "e" );
var EV_Thread_WaitForThread = new idEventDef( "waitForThread", "d" );
var EV_Thread_Print = new idEventDef( "print", "s" );
var EV_Thread_PrintLn = new idEventDef( "println", "s" );
var EV_Thread_Say = new idEventDef( "say", "s" );
var EV_Thread_Assert = new idEventDef( "assert", "f" );
var EV_Thread_Trigger = new idEventDef( "trigger", "e" );
var EV_Thread_SetCvar = new idEventDef( "setcvar", "ss" );
var EV_Thread_GetCvar = new idEventDef( "getcvar", "s", 's' );
var EV_Thread_Random = new idEventDef( "random", "f", 'f' );
var EV_Thread_GetTime = new idEventDef( "getTime", null, 'f' );
var EV_Thread_KillThread = new idEventDef( "killthread", "s" );
var EV_Thread_SetThreadName = new idEventDef( "threadname", "s" );
var EV_Thread_GetEntity = new idEventDef( "getEntity", "s", 'e' );
var EV_Thread_Spawn = new idEventDef( "spawn", "s", 'e' );
var EV_Thread_CopySpawnArgs = new idEventDef( "copySpawnArgs", "e" );
var EV_Thread_SetSpawnArg = new idEventDef( "setSpawnArg", "ss" );
var EV_Thread_SpawnString = new idEventDef( "SpawnString", "ss", 's' );
var EV_Thread_SpawnFloat = new idEventDef( "SpawnFloat", "sf", 'f' );
var EV_Thread_SpawnVector = new idEventDef( "SpawnVector", "sv", 'v' );
var EV_Thread_ClearPersistantArgs = new idEventDef( "clearPersistantArgs" );
var EV_Thread_SetPersistantArg = new idEventDef( "setPersistantArg", "ss" );
var EV_Thread_GetPersistantString = new idEventDef( "getPersistantString", "s", 's' );
var EV_Thread_GetPersistantFloat = new idEventDef( "getPersistantFloat", "s", 'f' );
var EV_Thread_GetPersistantVector = new idEventDef( "getPersistantVector", "s", 'v' );
var EV_Thread_AngToForward = new idEventDef( "angToForward", "v", 'v' );
var EV_Thread_AngToRight = new idEventDef( "angToRight", "v", 'v' );
var EV_Thread_AngToUp = new idEventDef( "angToUp", "v", 'v' );
var EV_Thread_Sine = new idEventDef( "sin", "f", 'f' );
var EV_Thread_Cosine = new idEventDef( "cos", "f", 'f' );
var EV_Thread_SquareRoot = new idEventDef( "sqrt", "f", 'f' );
var EV_Thread_Normalize = new idEventDef( "vecNormalize", "v", 'v' );
var EV_Thread_VecLength = new idEventDef( "vecLength", "v", 'f' );
var EV_Thread_VecDotProduct = new idEventDef( "DotProduct", "vv", 'f' );
var EV_Thread_VecCrossProduct = new idEventDef( "CrossProduct", "vv", 'v' );
var EV_Thread_VecToAngles = new idEventDef( "VecToAngles", "v", 'v' );
var EV_Thread_OnSignal = new idEventDef( "onSignal", "des" );
var EV_Thread_ClearSignal = new idEventDef( "clearSignalThread", "de" );
var EV_Thread_SetCamera = new idEventDef( "setCamera", "e" );
var EV_Thread_FirstPerson = new idEventDef( "firstPerson", null );
var EV_Thread_Trace = new idEventDef( "trace", "vvvvde", 'f' );
var EV_Thread_TracePoint = new idEventDef( "tracePoint", "vvde", 'f' );
var EV_Thread_GetTraceFraction = new idEventDef( "getTraceFraction", null, 'f' );
var EV_Thread_GetTraceEndPos = new idEventDef( "getTraceEndPos", null, 'v' );
var EV_Thread_GetTraceNormal = new idEventDef( "getTraceNormal", null, 'v' );
var EV_Thread_GetTraceEntity = new idEventDef( "getTraceEntity", null, 'e' );
var EV_Thread_GetTraceJoint = new idEventDef( "getTraceJoint", null, 's' );
var EV_Thread_GetTraceBody = new idEventDef( "getTraceBody", null, 's' );
var EV_Thread_FadeIn = new idEventDef( "fadeIn", "vf" );
var EV_Thread_FadeOut = new idEventDef( "fadeOut", "vf" );
var EV_Thread_FadeTo = new idEventDef( "fadeTo", "vff" );
var EV_Thread_StartMusic = new idEventDef( "music", "s" );
var EV_Thread_Error = new idEventDef( "error", "s" );
var EV_Thread_Warning = new idEventDef( "warning", "s" );
var EV_Thread_StrLen = new idEventDef( "strLength", "s", 'd' );
var EV_Thread_StrLeft = new idEventDef( "strLeft", "sd", 's' );
var EV_Thread_StrRight = new idEventDef( "strRight", "sd", 's' );
var EV_Thread_StrSkip = new idEventDef( "strSkip", "sd", 's' );
var EV_Thread_StrMid = new idEventDef( "strMid", "sdd", 's' );
var EV_Thread_StrToFloat = new idEventDef( "strToFloat", "s", 'f' );
var EV_Thread_RadiusDamage = new idEventDef( "radiusDamage", "vEEEsf" );
var EV_Thread_IsClient = new idEventDef( "isClient", null, 'f' );
var EV_Thread_IsMultiplayer = new idEventDef( "isMultiplayer", null, 'f' );
var EV_Thread_GetFrameTime = new idEventDef( "getFrameTime", null, 'f' );
var EV_Thread_GetTicsPerSecond = new idEventDef( "getTicsPerSecond", null, 'f' );
var EV_Thread_DebugLine = new idEventDef( "debugLine", "vvvf" );
var EV_Thread_DebugArrow = new idEventDef( "debugArrow", "vvvdf" );
var EV_Thread_DebugCircle = new idEventDef( "debugCircle", "vvvfdf" );
var EV_Thread_DebugBounds = new idEventDef( "debugBounds", "vvvf" );
var EV_Thread_DrawText = new idEventDef( "drawText", "svfvdf" );
var EV_Thread_InfluenceActive = new idEventDef( "influenceActive", null, 'd' );

//END_CLASS
//
//idThread			*idThread::currentThread = NULL;
//int					idThread::threadIndex = 0;
//idList<idThread *>	idThread::threadList;
//trace_t				idThread::trace;

class idThread extends idClass {
	//private:
	static currentThread: idThread;
	
	waitingForThread:idThread;
	waitingFor:number/*int*/;
	waitingUntil:number/*int*/;
	interpreter = new idInterpreter;
	
	spawnArgs = new idDict;
	
	threadNum:number/*int*/;
	threadName = new idStr;
	
	lastExecuteTime:number/*int*/;
	creationTime:number/*int*/;
	
	manualControl:boolean;
	
	static threadIndex:number /*int*/;
	static threadList = new idList<idThread>(idThread, true);
	
	static trace = new trace_t;
	
	//	void						Init( );
	//	void						Pause( );
	//
	Event_Execute(): void { throw "placeholder"; }
	Event_SetThreadName(name: string): void { throw "placeholder"; }
	
	//
	// script callable Events
	//
	Event_TerminateThread( /*int*/ num:Number ):void{throw "placeholder";}
	Event_Pause( ):void{throw "placeholder";}
	Event_Wait( /*float*/time:number ):void{throw "placeholder";}
	Event_WaitFrame( ):void{throw "placeholder";}
	Event_WaitFor( ent:idEntity ):void{throw "placeholder";}
	Event_WaitForThread( /*int*/num:number ):void{throw "placeholder";}
	Event_Print( text:string ):void{throw "placeholder";}
	Event_PrintLn( text:string ):void{throw "placeholder";}
	Event_Say( text:string ):void{throw "placeholder";}
	Event_Assert( /*float */value:number ):void{throw "placeholder";}
	Event_Trigger( ent:idEntity ):void{throw "placeholder";}
	Event_SetCvar(name: string, value: string): void { throw "placeholder"; }
	Event_GetCvar(name: string): void { throw "placeholder"; }
	Event_Random( /*float*/ range:number): void { throw "placeholder"; }
	Event_GetTime( ):void{throw "placeholder";}
	Event_KillThread( name:string ):void{throw "placeholder";}
	Event_GetEntity( name:string ):void{throw "placeholder";}
	Event_Spawn( classname:string ):void{throw "placeholder";}
	Event_CopySpawnArgs( ent:idEntity ):void{throw "placeholder";}
	Event_SetSpawnArg( key:string, value:string ):void{throw "placeholder";}
	Event_SpawnString( key:string, defaultvalue:string ):void{throw "placeholder";}
	Event_SpawnFloat(key: string, /*float*/ defaultvalue: number ):void{throw "placeholder";}
	Event_SpawnVector( key:string, defaultvalue:idVec3 ):void{throw "placeholder";}
	Event_ClearPersistantArgs( ):void{throw "placeholder";}
	Event_SetPersistantArg( key:string, value:string ):void{throw "placeholder";}
	Event_GetPersistantString( key:string ):void{throw "placeholder";}
	Event_GetPersistantFloat( key:string ):void{throw "placeholder";}
	Event_GetPersistantVector( key:string ):void{throw "placeholder";}
	Event_AngToForward( ang:idAngles ):void{throw "placeholder";}
	Event_AngToRight( ang:idAngles ):void{throw "placeholder";}
	Event_AngToUp( ang:idAngles ):void{throw "placeholder";}
	Event_GetSine( /*float*/angle:number ):void{throw "placeholder";}
	Event_GetCosine( /*float*/angle:number ):void{throw "placeholder";}
	Event_GetSquareRoot( /*float*/ theSquare: number ):void{throw "placeholder";}
	Event_VecNormalize( vec:idVec3 ):void{throw "placeholder";}
	Event_VecLength( vec:idVec3 ):void{throw "placeholder";}
	Event_VecDotProduct(vec1: idVec3, vec2: idVec3  ):void{throw "placeholder";}
	Event_VecCrossProduct(vec1: idVec3, vec2: idVec3 ):void{throw "placeholder";}
	Event_VecToAngles( vec:idVec3 ):void{throw "placeholder";}
	Event_OnSignal( /*int*/ signal:number, ent:idEntity, func:string ):void{throw "placeholder";}
	Event_ClearSignalThread( /*int*/ signal: number, ent:idEntity ):void{throw "placeholder";}
	Event_SetCamera( ent:idEntity ):void{throw "placeholder";}
	Event_FirstPerson( ):void{throw "placeholder";}
	Event_Trace(start: idVec3, end: idVec3, mins: idVec3, maxs: idVec3, /*int*/ contents_mask: number, passEntity: idEntity ):void{throw "placeholder";}
	Event_TracePoint( start:idVec3, end:idVec3, /*int*/ contents_mask:number, passEntity:idEntity ):void{throw "placeholder";}
	Event_GetTraceFraction( ):void{throw "placeholder";}
	Event_GetTraceEndPos( ):void{throw "placeholder";}
	Event_GetTraceNormal( ):void{throw "placeholder";}
	Event_GetTraceEntity( ):void{throw "placeholder";}
	Event_GetTraceJoint( ):void{throw "placeholder";}
	Event_GetTraceBody( ):void{throw "placeholder";}
	Event_FadeIn( color:idVec3, /*float*/time:number ):void{throw "placeholder";}
	Event_FadeOut( color:idVec3, /*float*/time:number ):void{throw "placeholder";}
	Event_FadeTo( color:idVec3, /*float*/ alpha:number, /*float*/time:number ):void{throw "placeholder";}
	Event_SetShaderParm( /*int*/ parmnum:number, /*float*/ value:number ):void{throw "placeholder";}
	Event_StartMusic( name:string ):void{throw "placeholder";}
	Event_Warning( text:string ):void{throw "placeholder";}
	Event_Error( text:string ):void{throw "placeholder";}
	Event_StrLen( $string:string ):void{throw "placeholder";}
	Event_StrLeft( $string:string, /*int*/num:number ):void{throw "placeholder";}
	Event_StrRight( $string:string, /*int*/num:number ):void{throw "placeholder";}
	Event_StrSkip( $string:string, /*int*/num:number ):void{throw "placeholder";}
	Event_StrMid( $string:string, /*int */start:number, /*int*/num:number ):void{throw "placeholder";}
	Event_StrToFloat( $string:string ):void{throw "placeholder";}
	Event_RadiusDamage(origin: idVec3, inflictor: idEntity, attacker: idEntity, ignore: idEntity , damageDefName:string, /*float*/ dmgPower:number ):void{throw "placeholder";}
	Event_IsClient( ):void{throw "placeholder";}
	Event_IsMultiplayer( ):void{throw "placeholder";}
	Event_GetFrameTime( ):void{throw "placeholder";}
	Event_GetTicsPerSecond( ):void{throw "placeholder";}
	Event_CacheSoundShader( soundName:string ):void{throw "placeholder";}
	Event_DebugLine(color: idVec3, start: idVec3, end: idVec3, /*float*/ lifetime :number):void{throw "placeholder";}
	Event_DebugArrow(color: idVec3, start: idVec3, end: idVec3, /*int*/ size:number,  /*float*/ lifetime:number ):void{throw "placeholder";}
	Event_DebugCircle(color: idVec3, origin: idVec3, dir: idVec3 , /*float*/ radius:number,  /*int*/ numSteps:number, /*float*/ lifetime:number ):void{throw "placeholder";}
	Event_DebugBounds( color:idVec3, mins:idVec3, maxs:idVec3, /*float*/ lifetime:number ):void{throw "placeholder";}
	Event_DrawText(text: string, origin: idVec3, /*float*/ scale:number, color:idVec3,  /*int*/ align:number,  /*float*/ lifetime:number ):void{throw "placeholder";}
	Event_InfluenceActive( ):void{throw "placeholder";}
	//
	//public:							
	//								CLASS_PROTOTYPE( idThread );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc < idThread>[];
	//								
	//								idThread();
	//								idThread( idEntity *self, const function_t *func );
	//								idThread( const function_t *func );
	//								idThread( idInterpreter *source, const function_t *func, int args );
	//								idThread( idInterpreter *source, idEntity *self, const function_t *func, int args );
	//
	//	virtual						~idThread();
	//
	//								// tells the thread manager not to delete this thread when it ends
	//	void						ManualDelete( );
	//
	//	// save games
	//	void						Save ( savefile: idSaveGame ): void { throw "placeholder"; }				// archives object for save game file
	//	void						Restore( idRestoreGame *savefile );				// unarchives object from save game file
	//
	//	void						EnableDebugInfo( ) { this.interpreter.debug = true; };
	//	void						DisableDebugInfo( ) { this.interpreter.debug = false; };
	//
	//	void						WaitMS( /*int*/time:number );
	//	void						WaitSec( /*float*/time:number );
	//	void						WaitFrame( );
	//								
	//								// NOTE: If this is called from within a event called by this thread, the function arguments will be invalid after calling this function.
	//	void						CallFunction( const function_t	*func, bool clearStack );
	//
	//								// NOTE: If this is called from within a event called by this thread, the function arguments will be invalid after calling this function.
	//	void						CallFunction( idEntity *obj, const function_t *func, bool clearStack );
	//
	//	void						DisplayInfo();
	//	static idThread				*GetThread( /*int*/num:number );
	//	static void					ListThreads_f( const idCmdArgs &args );
	//	static void					Restart( );
	//	static void					ObjectMoveDone( int threadnum, idEntity *obj );
	//								
	//	static idList<idThread*>&	GetThreads ( );
	//	
	//	bool						IsDoneProcessing ( );
	//	bool						IsDying			 ( );	
	//								
	//	void						End( );
	//	static void					KillThread( name:string );
	//	static void					KillThread( /*int*/num:number );
	//	bool						Execute( );
	//	void						ManualControl( ) { manualControl = true; CancelEvents( &EV_Thread_Execute ); };
	//	void						DoneProcessing( ) { this.interpreter.doneProcessing = true; };
	//	void						ContinueProcessing( ) { this.interpreter.doneProcessing = false; };
	//	bool						ThreadDying( ) { return this.interpreter.threadDying; };
	//	void						EndThread( ) { this.interpreter.threadDying = true; };
	//	bool						IsWaiting( );
	//	void						ClearWaitFor( );
	//	bool						IsWaitingFor( idEntity *obj );
	//	void						ObjectMoveDone( idEntity *obj );
	//	void						ThreadCallback( idThread *thread );
	//	void						DelayedStart( int delay );
	//	bool						Start( );
	//	idThread					*WaitingOnThread( );
	//	void						SetThreadNum( /*int*/num:number );
	//	int 						GetThreadNum( );
	//	void						SetThreadName( name:string );
	//	const char					*GetThreadName( );
	//
	//	void						Error( const char *fmt, ... ) const id_attribute((format(printf,2,3)));
	//	void						Warning( const char *fmt, ... ) const id_attribute((format(printf,2,3)));
	//								
	//	static idThread				*CurrentThread( );
	//	static int					CurrentThreadNum( );
	//	static bool					BeginMultiFrameEvent( ent:idEntity, const idEventDef *event );
	//	static void					EndMultiFrameEvent( ent:idEntity, const idEventDef *event );
	//
	//	static void					ReturnString( text:string );
	//	static void					ReturnFloat( float value );
	//	static void					ReturnInt( int value );
	//	static void					ReturnVector( idVec3 const &vec );
	//	static void					ReturnEntity( ent:idEntity );
	//};
//
///*
//================
//idThread::WaitingOnThread
//================
//*/
//ID_INLINE idThread *idThread::WaitingOnThread( ) {
//	return this.waitingForThread;
//}
//
///*
//================
//idThread::SetThreadNum
//================
//*/
//ID_INLINE void idThread::SetThreadNum( /*int*/num:number ) {
//	this.threadNum = num;
//}

/*
================
idThread::GetThreadNum
================
*/
	GetThreadNum ( ): number {
		return this.threadNum;
	}

///*
//================
//idThread::GetThreadName
//================
//*/
//ID_INLINE const char *idThread::GetThreadName( ) {
//	return this.threadName.c_str();
//}
//
///*
//================
//idThread::GetThreads
//================
//*/
//ID_INLINE idList<idThread*>& idThread::GetThreads ( ) {
//	return idThread.threadList;
//}	
//
///*
//================
//idThread::IsDoneProcessing
//================
//*/
//ID_INLINE bool idThread::IsDoneProcessing ( ) {
//	return this.interpreter.doneProcessing;
//}
//
///*
//================
//idThread::IsDying
//================
//*/
//ID_INLINE bool idThread::IsDying ( ) {
//	return this.interpreter.threadDying;
//}
//
//#endif /* !__SCRIPT_THREAD_H__ */
///*
//================
//idThread::CurrentThread
//================
//*/
//idThread *idThread::CurrentThread( ) {
//	return idThread.currentThread;
//}
//
///*
//================
//idThread::CurrentThreadNum
//================
//*/
//int idThread::CurrentThreadNum( ) {
//	if ( idThread.currentThread ) {
//		return idThread.currentThread.GetThreadNum();
//	} else {
//		return 0;
//	}
//}
//
///*
//================
//idThread::BeginMultiFrameEvent
//================
//*/
//bool idThread::BeginMultiFrameEvent( ent:idEntity, const idEventDef *event ) {
//	if ( !idThread.currentThread ) {
//		gameLocal.Error( "idThread::BeginMultiFrameEvent called without a current thread" );
//	}
//	return idThread.currentThread.interpreter.BeginMultiFrameEvent( ent, event );
//}
//
///*
//================
//idThread::EndMultiFrameEvent
//================
//*/
//EndMultiFrameEvent( ent:idEntity, const idEventDef *event ):void {
//	if ( !idThread.currentThread ) {
//		gameLocal.Error( "idThread::EndMultiFrameEvent called without a current thread" );
//	}
//	idThread.currentThread.interpreter.EndMultiFrameEvent( ent, event );
//}

	constructor ( )
	constructor ( self: idEntity, func: function_t )
	constructor ( func: function_t )
	//constructor ( source: idInterpreter, func: function_t, args: number )
	//constructor ( source: idInterpreter, self: idEntity, func: function_t, args: number )
	constructor ( a1?: any, a2?: any, a3?: any, a4?: any ) {
		super ( );

		switch ( arguments.length ) {
			case 0:
				this.constructor_default ( );
			break;
			case 1:
				this.constructor_func( <function_t>a1 );
			break;
		default:
			todoThrow ( );
		}
	}

/*
================
idThread::idThread
================
*/
	constructor_default ( ): void {
		this.Init ( );
		this.SetThreadName( va( "thread_%d", idThread.threadIndex ) );
		if ( g_debugScript.GetBool ( ) ) {
			gameLocal.Printf( "%d: create thread (%d) '%s'\n", gameLocal.time, this.threadNum, this.threadName.c_str ( ) );
		}
	}
//
///*
//================
//idThread::idThread
//================
//*/
//idThread::idThread( idEntity *self, const function_t *func ) {
//	assert( self );
//	
//	this.Init();
//	this.SetThreadName( self.name );
//	this.interpreter.EnterObjectFunction( self, func, false );
//	if ( g_debugScript.GetBool() ) {
//		gameLocal.Printf( "%d: create thread (%d) '%s'\n", gameLocal.time, this.threadNum, this.threadName.c_str() );
//	}
//}
//
/*
================
idThread::idThread
================
*/
	constructor_func ( func: function_t ): void {
		assert( func );

		this.Init ( );
		this.SetThreadName( func.Name ( ) );
		this.interpreter.EnterFunction( func, false );
		if ( g_debugScript.GetBool ( ) ) {
			gameLocal.Printf( "%d: create thread (%d) '%s'\n", gameLocal.time, this.threadNum, this.threadName.c_str ( ) );
		}
	}
//
///*
//================
//idThread::idThread
//================
//*/
//idThread::idThread( idInterpreter *source, const function_t *func, int args ) {
//	this.Init();
//	this.interpreter.ThreadCall( source, func, args );
//	if ( g_debugScript.GetBool() ) {
//		gameLocal.Printf( "%d: create thread (%d) '%s'\n", gameLocal.time, this.threadNum, this.threadName.c_str() );
//	}
//}
//
///*
//================
//idThread::idThread
//================
//*/
//idThread::idThread( idInterpreter *source, idEntity *self, const function_t *func, int args ) {
//	assert( self );
//
//	this.Init();
//	this.SetThreadName( self.name );
//	this.interpreter.ThreadCall( source, func, args );
//	if ( g_debugScript.GetBool() ) {
//		gameLocal.Printf( "%d: create thread (%d) '%s'\n", gameLocal.time, this.threadNum, this.threadName.c_str() );
//	}
//}

/*
================
idThread::~idThread
================
*/
	destructor(): void {
		todoThrow ( );
//	idThread	*thread;
//	int			i;
//	int			n;
//
//	if ( g_debugScript.GetBool() ) {
//		gameLocal.Printf( "%d: end thread (%d) '%s'\n", gameLocal.time, this.threadNum, this.threadName.c_str() );
//	}
//	idThread.threadList.Remove( this );
//	n = idThread.threadList.Num();
//	for( i = 0; i < n; i++ ) {
//		thread = idThread.threadList[ i ];
//		if ( thread.WaitingOnThread() == this ) {
//			thread.ThreadCallback( this );
//		}
//	}
//
//	if ( idThread.currentThread == this ) {
//		idThread.currentThread = NULL;
//	}
	}

/*
================
idThread::ManualDelete
================
*/
	ManualDelete ( ): void {
		this.interpreter.terminateOnExit = false;
	}

///*
//================
//idThread::Save
//================
//*/
//Save( idSaveGame *savefile ) :void {
//
//	// We will check on restore that threadNum is still the same,
//	//  threads should have been restored in the same order.
//	savefile.WriteInt( this.threadNum );
//
//	savefile.WriteObject( this.waitingForThread );
//	savefile.WriteInt( this.waitingFor );
//	savefile.WriteInt( this.waitingUntil );
//
//	this.interpreter.Save( savefile );
//
//	savefile.WriteDict( &spawnArgs );
//	savefile.WriteString( this.threadName );
//
//	savefile.WriteInt( this.lastExecuteTime );
//	savefile.WriteInt( this.creationTime );
//
//	savefile.WriteBool( this.manualControl );
//}
//
///*
//================
//idThread::Restore
//================
//*/
//Restore( idRestoreGame *savefile ):void {
//	savefile.ReadInt( this.threadNum );
//
//	savefile.ReadObject( reinterpret_cast<idClass *&>( this.waitingForThread ) );
//	savefile.ReadInt( this.waitingFor );
//	savefile.ReadInt( this.waitingUntil );
//
//	this.interpreter.Restore( savefile );
//
//	savefile.ReadDict( &spawnArgs );
//	savefile.ReadString( this.threadName );
//
//	savefile.ReadInt( this.lastExecuteTime );
//	savefile.ReadInt( this.creationTime );
//
//	savefile.ReadBool( this.manualControl );
//}

/*
================
idThread::Init
================
*/
	Init ( ): void {
		// create a unique threadNum
		do {
			idThread.threadIndex++;
			if ( idThread.threadIndex == 0 ) {
				idThread.threadIndex = 1;
			}
		} while ( this.GetThread( idThread.threadIndex ) );

		this.threadNum = idThread.threadIndex;
		idThread.threadList.Append( this );

		this.creationTime = gameLocal.time;
		this.lastExecuteTime = 0;
		this.manualControl = false;

		this.ClearWaitFor ( );

		this.interpreter.SetThread( this );
	}

/*
================
idThread::GetThread
================
*/
	GetThread ( /*int*/num: number ): idThread {
		var /*int			*/i: number;
		var /*int			*/n: number;
		var thread: idThread;

		n = idThread.threadList.Num ( );
		for ( i = 0; i < n; i++ ) {
			thread = idThread.threadList[i];
			if ( thread.GetThreadNum ( ) == num ) {
				return thread;
			}
		}

		return null;
	}

///*
//================
//idThread::DisplayInfo
//================
//*/
//DisplayInfo( ) :void{
//	gameLocal.Printf( 
//		"%12i: '%s'\n"
//		"        File: %s(%d)\n"
//		"     Created: %d (%d ms ago)\n"
//		"      Status: ", 
//		this.threadNum, this.threadName.c_str(), 
//		this.interpreter.CurrentFile(), this.interpreter.CurrentLine(), 
//		this.creationTime, gameLocal.time - this.creationTime );
//
//	if ( this.interpreter.threadDying ) {
//		gameLocal.Printf( "Dying\n" );
//	} else if ( this.interpreter.doneProcessing ) {
//		gameLocal.Printf( 
//			"Paused since %d (%d ms)\n"
//			"      Reason: ",  this.lastExecuteTime, gameLocal.time - this.lastExecuteTime );
//		if ( this.waitingForThread ) {
//			gameLocal.Printf( "Waiting for thread #%3i '%s'\n", this.waitingForThread.GetThreadNum(), this.waitingForThread.GetThreadName() );
//		} else if ( ( this.waitingFor != ENTITYNUM_NONE ) && ( gameLocal.entities[ this.waitingFor ] ) ) {
//			gameLocal.Printf( "Waiting for entity #%3i '%s'\n", this.waitingFor, gameLocal.entities[ this.waitingFor ].name.c_str() );
//		} else if ( this.waitingUntil ) {
//			gameLocal.Printf( "Waiting until %d (%d ms total wait time)\n", this.waitingUntil, this.waitingUntil - this.lastExecuteTime );
//		} else {
//			gameLocal.Printf( "None\n" );
//		}
//	} else {
//		gameLocal.Printf( "Processing\n" );
//	}
//
//	this.interpreter.DisplayInfo();
//
//	gameLocal.Printf( "\n" );
//}
//
///*
//================
//idThread::ListThreads_f
//================
//*/
//ListThreads_f( const idCmdArgs &args ) :void{
//	int	i;
//	int	n;
//
//	n = idThread.threadList.Num();
//	for( i = 0; i < n; i++ ) {
//		//idThread.threadList[ i ].DisplayInfo();
//		gameLocal.Printf( "%3i: %-20s : %s(%d)\n", idThread.threadList[ i ].threadNum, idThread.threadList[ i ].threadName.c_str(), idThread.threadList[ i ].interpreter.CurrentFile(), idThread.threadList[ i ].interpreter.CurrentLine() );
//	}
//	gameLocal.Printf( "%d active threads\n\n", n );
//}
//
/*
================
idThread::Restart
================
*/
	static Restart ( ): void {
		var /*int	*/i: number;
		var /*int	*/n: number;

		// reset the threadIndex
		idThread.threadIndex = 0;

		idThread.currentThread = null;
		n = idThread.threadList.Num ( );
		for ( i = n - 1; i >= 0; i-- ) {
			delete idThread.threadList[i];
		}
		idThread.threadList.Clear ( );

		idThread.trace.memset0 ( );
		idThread.trace.c.entityNum = ENTITYNUM_NONE;
	}

/*
================
idThread::DelayedStart
================
*/
	DelayedStart ( /*int*/ delay: number ): void {
		super.CancelEvents( EV_Thread_Execute );
		if ( gameLocal.time <= 0 ) {
			delay++;
		}
		super.PostEventMS( EV_Thread_Execute, delay );
	}

/*
================
idThread::Start
================
*/
Start( ):boolean {
	var result:boolean;

	super.CancelEvents( EV_Thread_Execute );
	result = this.Execute();

	return result;
}

/*
================
idThread::SetThreadName
================
*/
SetThreadName( name:string ) :void {
	this.threadName.equals( name );
}

///*
//================
//idThread::ObjectMoveDone
//================
//*/
//ObjectMoveDone( int threadnum, idEntity *obj ) :void{
//	idThread *thread;
//
//	if ( !threadnum ) {
//		return;
//	}
//
//	thread = this.GetThread( threadnum );
//	if ( thread ) {
//		thread.ObjectMoveDone( obj );
//	}
//}

/*
================
idThread::End
================
*/
	End ( ): void {
		// Tell thread to die.  It will exit on its own.
		this.Pause ( );
		this.interpreter.threadDying = true;
	}

///*
//================
//idThread::KillThread
//================
//*/
//KillThread( name:string ) :void{
//	int			i;
//	int			num;
//	int			len;
//	const char	*ptr;
//	idThread	*thread;
//
//	// see if the name uses a wild card
//	ptr = strchr( name, '*' );
//	if ( ptr ) {
//		len = ptr - name;
//	} else {
//		len = strlen( name );
//	}
//
//	// kill only those threads whose name matches name
//	num = idThread.threadList.Num();
//	for( i = 0; i < num; i++ ) {
//		thread = idThread.threadList[ i ];
//		if ( !idStr::Cmpn( thread.GetThreadName(), name, len ) ) {
//			thread.End();
//		}
//	}
//}
//
///*
//================
//idThread::KillThread
//================
//*/
//KillThread( /*int*/num:number ) :void{
//	idThread *thread;
//
//	thread = this.GetThread( num );
//	if ( thread ) {
//		// Tell thread to die.  It will delete itself on it's own.
//		thread.End();
//	}
//}
//
/*
================
idThread::Execute
================
*/
	Execute ( ): boolean {
		var oldThread: idThread;
		var done: boolean;

		if ( this.manualControl && ( this.waitingUntil > gameLocal.time ) ) {
			return false;
		}

		oldThread = idThread.currentThread;
		idThread.currentThread = this;

		this.lastExecuteTime = gameLocal.time;
		this.ClearWaitFor ( );
		done = this.interpreter.Execute ( );
		if ( done ) {
			this.End ( );
			if ( this.interpreter.terminateOnExit ) {
				super.PostEventMS( EV_Remove, 0 );
			}
		} else if ( !this.manualControl ) {
			if ( this.waitingUntil > this.lastExecuteTime ) {
				super.PostEventMS( EV_Thread_Execute, this.waitingUntil - this.lastExecuteTime );
			} else if ( this.interpreter.MultiFrameEventInProgress ( ) ) {
				super.PostEventMS( EV_Thread_Execute, gameLocal.msec );
			}
		}

		idThread.currentThread = oldThread;

		return done;
	}

///*
//================
//idThread::IsWaiting
//
//Checks if thread is still waiting for some event to occur.
//================
//*/
//bool idThread::IsWaiting( ) {
//	if ( this.waitingForThread || ( this.waitingFor != ENTITYNUM_NONE ) ) {
//		return true;
//	}
//
//	if ( this.waitingUntil && ( this.waitingUntil > gameLocal.time ) ) {
//		return true;
//	}
//
//	return false;
//}
//
///*
//================
//idThread::CallFunction
//
//NOTE: If this is called from within a event called by this thread, the function arguments will be invalid after calling this function.
//================
//*/
//CallFunction( const function_t *func, bool clearStack ) :void{
//	this.ClearWaitFor();
//	this.interpreter.EnterFunction( func, clearStack );
//}
//
///*
//================
//idThread::CallFunction
//
//NOTE: If this is called from within a event called by this thread, the function arguments will be invalid after calling this function.
//================
//*/
//CallFunction( idEntity *self, const function_t *func, bool clearStack ) :void{
//	assert( self );
//	this.ClearWaitFor();
//	this.interpreter.EnterObjectFunction( self, func, clearStack );
//}
//
/*
================
idThread::ClearWaitFor
================
*/
	ClearWaitFor ( ): void {
		this.waitingFor = ENTITYNUM_NONE;
		this.waitingForThread = null;
		this.waitingUntil = 0;
	}

///*
//================
//idThread::IsWaitingFor
//================
//*/
//bool idThread::IsWaitingFor( idEntity *obj ) {
//	assert( obj );
//	return this.waitingFor == obj.entityNumber;
//}
//
///*
//================
//idThread::ObjectMoveDone
//================
//*/
//ObjectMoveDone( idEntity *obj ):void {
//	assert( obj );
//
//	if ( IsWaitingFor( obj ) ) {
//		this.ClearWaitFor();
//		DelayedStart( 0 );
//	}
//}
//
///*
//================
//idThread::ThreadCallback
//================
//*/
//ThreadCallback( idThread *thread ) :void{
//	if ( this.interpreter.threadDying ) {
//		return;
//	}
//
//	if ( thread == this.waitingForThread ) {
//		this.ClearWaitFor();
//		DelayedStart( 0 );
//	}
//}
//
///*
//================
//idThread::Event_SetThreadName
//================
//*/
//Event_SetThreadName( name:string ):void {
//	this.SetThreadName( name );
//}
//
///*
//================
//idThread::Error
//================
//*/
//Error( const char *fmt, ... ) :void {
//	va_list	argptr;
//	char	text[ 1024 ];
//
//	va_start( argptr, fmt );
//	vsprintf( text, fmt, argptr );
//	va_end( argptr );
//
//	this.interpreter.Error( text );
//}
//
///*
//================
//idThread::Warning
//================
//*/
//Warning( const char *fmt, ... ) :void {
//	va_list	argptr;
//	char	text[ 1024 ];
//
//	va_start( argptr, fmt );
//	vsprintf( text, fmt, argptr );
//	va_end( argptr );
//
//	this.interpreter.Warning( text );
//}
//
/*
================
idThread::ReturnString
================
*/
	static ReturnString ( text: string ): void {
		gameLocal.program.ReturnString( text );
	}

///*
//================
//idThread::ReturnFloat
//================
//*/
//static ReturnFloat( float value ):void {
//	gameLocal.program.ReturnFloat( value );
//}
//
///*
//================
//idThread::ReturnInt
//================
//*/
//static ReturnInt( int value ) :void{
//	// true integers aren't supported in the compiler,
//	// so int values are stored as floats
//	gameLocal.program.ReturnFloat( value );
//}
//
///*
//================
//idThread::ReturnVector
//================
//*/
// static ReturnVector( idVec3 const &vec ):void {
//	gameLocal.program.ReturnVector( vec );
//}
//
///*
//================
//idThread::ReturnEntity
//================
//*/
//static ReturnEntity( ent:idEntity ):void {
//	gameLocal.program.ReturnEntity( ent );
//}
//
///*
//================
//idThread::Event_Execute
//================
//*/
//Event_Execute( )::void {
//	this.Execute();
//}

/*
================
idThread::Pause
================
*/
	Pause ( ): void {
		this.ClearWaitFor ( );
		this.interpreter.doneProcessing = true;
	}

///*
//================
//idThread::WaitMS
//================
//*/
//WaitMS( /*int*/time:number ):void {
//	this.Pause();
//	this.waitingUntil = gameLocal.time + time;
//}
//
///*
//================
//idThread::WaitSec
//================
//*/
//WaitSec( /*float*/time:number ) :void{
//	WaitMS( SEC2MS( time ) );
//}
//
///*
//================
//idThread::WaitFrame
//================
//*/
//WaitFrame( ):void {
//	this.Pause();
//
//	// manual control threads don't set waitingUntil so that they can be run again
//	// that frame if necessary.
//	if ( !this.manualControl ) {
//		this.waitingUntil = gameLocal.time + gameLocal.msec;
//	}
//}
//
///***********************************************************************
//
//  Script callable events  
//	
//***********************************************************************/
//
///*
//================
//idThread::Event_TerminateThread
//================
//*/
//Event_TerminateThread( /*int*/num:number ):void {
//	idThread *thread;
//
//	thread = this.GetThread( num );
//	KillThread( num );
//}
//
///*
//================
//idThread::Event_Pause
//================
//*/
//Event_Pause( ):void {
//	this.Pause();
//}
//
///*
//================
//idThread::Event_Wait
//================
//*/
//Event_Wait( /*float*/time:number ):void {
//	WaitSec( time );
//}
//
///*
//================
//idThread::Event_WaitFrame
//================
//*/
//Event_WaitFrame( ) :void{
//	WaitFrame();
//}
//
///*
//================
//idThread::Event_WaitFor
//================
//*/
//Event_WaitFor( ent:idEntity ):void {
//	if ( ent && ent.RespondsTo( EV_Thread_SetCallback ) ) {
//		ent.ProcessEvent( &EV_Thread_SetCallback );
//		if ( gameLocal.program.GetReturnedInteger() ) {
//			this.Pause();
//			this.waitingFor = ent.entityNumber;
//		}
//	}
//}
//
///*
//================
//idThread::Event_WaitForThread
//================
//*/
//Event_WaitForThread( /*int*/num:number ):void {
//	idThread *thread;
//
//	thread = this.GetThread( num );
//	if ( !thread ) {
//		if ( g_debugScript.GetBool() ) {
//			// just print a warning and continue executing
//			Warning( "Thread %d not running", num );
//		}
//	} else {
//		this.Pause();
//		this.waitingForThread = thread;
//	}
//}
//
///*
//================
//idThread::Event_Print
//================
//*/
//Event_Print( text:string ) :void{
//	gameLocal.Printf( "%s", text );
//}
//
///*
//================
//idThread::Event_PrintLn
//================
//*/
//Event_PrintLn( text:string ) :void{
//	gameLocal.Printf( "%s\n", text );
//}
//
///*
//================
//idThread::Event_Say
//================
//*/
//Event_Say( text:string ):void{
//	cmdSystem.BufferCommandText( CMD_EXEC_NOW, va( "say \"%s\"", text ) );
//}
//
///*
//================
//idThread::Event_Assert
//================
//*/
//Event_Assert( float value ):void {
//	assert( value );
//}
//
///*
//================
//idThread::Event_Trigger
//================
//*/
//Event_Trigger( ent:idEntity ) :void{
//	if ( ent ) {
//		ent.Signal( SIG_TRIGGER );
//		ent.ProcessEvent( &EV_Activate, gameLocal.GetLocalPlayer() );
//		ent.TriggerGuis();
//	}
//}
//
///*
//================
//idThread::Event_SetCvar
//================
//*/
//Event_SetCvar( name:string, value:string ) :void {
//	cvarSystem.SetCVarString( name, value );
//}
//
///*
//================
//idThread::Event_GetCvar
//================
//*/
//Event_GetCvar( name:string ) :void {
//	ReturnString( cvarSystem.GetCVarString( name ) );
//}
//
///*
//================
//idThread::Event_Random
//================
//*/
//Event_Random( float range ) :void {
//	float result;
//
//	result = gameLocal.random.RandomFloat();
//	ReturnFloat( range * result );
//}
//
///*
//================
//idThread::Event_GetTime
//================
//*/
//Event_GetTime( ):void {
//	ReturnFloat( MS2SEC( gameLocal.realClientTime ) );
//}
//
///*
//================
//idThread::Event_KillThread
//================
//*/
//Event_KillThread( name:string ) {
//	KillThread( name );
//}
//
///*
//================
//idThread::Event_GetEntity
//================
//*/
//Event_GetEntity( name:string ):void {
//	int			entnum;
//	idEntity	*ent;
//
//	assert( name );
//
//	if ( name[ 0 ] == '*' ) {
//		entnum = atoi( &name[ 1 ] );
//		if ( ( entnum < 0 ) || ( entnum >= MAX_GENTITIES ) ) {
//			Error( "Entity number in string out of range." );
//		}
//		ReturnEntity( gameLocal.entities[ entnum ] );
//	} else {
//		ent = gameLocal.FindEntity( name );
//		ReturnEntity( ent );
//	}
//}
//
///*
//================
//idThread::Event_Spawn
//================
//*/
//Event_Spawn( const char *classname ):void {
//	var ent:idEntity
//
//	spawnArgs.Set( "classname", classname );
//	gameLocal.SpawnEntityDef( spawnArgs, &ent );
//	ReturnEntity( ent );
//	spawnArgs.Clear();
//}
//
///*
//================
//idThread::Event_CopySpawnArgs
//================
//*/
//Event_CopySpawnArgs( ent:idEntity ) :void{
//	spawnArgs.Copy( ent.spawnArgs );
//}
//
///*
//================
//idThread::Event_SetSpawnArg
//================
//*/
//Event_SetSpawnArg( key:string, value:string ) :void{
//	spawnArgs.Set( key, value );
//}
//
///*
//================
//idThread::Event_SpawnString
//================
//*/
//Event_SpawnString( key:string, const char *defaultvalue ) :void{
//	const char *result;
//
//	spawnArgs.GetString( key, defaultvalue, &result );
//	ReturnString( result );
//}
//
///*
//================
//idThread::Event_SpawnFloat
//================
//*/
//Event_SpawnFloat( key:string, float defaultvalue ) :void{
//	float result;
//
//	spawnArgs.GetFloat( key, va( "%f", defaultvalue ), result );
//	ReturnFloat( result );
//}
//
///*
//================
//idThread::Event_SpawnVector
//================
//*/
//Event_SpawnVector( key:string, idVec3 &defaultvalue ):void {
//	idVec3 result;
//
//	spawnArgs.GetVector( key, va( "%f %f %f", defaultvalue.x, defaultvalue.y, defaultvalue.z ), result );
//	ReturnVector( result );
//}
//
///*
//================
//idThread::Event_ClearPersistantArgs
//================
//*/
//Event_ClearPersistantArgs( ):void {
//	gameLocal.persistentLevelInfo.Clear();
//}
//
//
///*
//================
//idThread::Event_SetPersistantArg
//================
//*/
//Event_SetPersistantArg( key:string, value:string ):void {
//	gameLocal.persistentLevelInfo.Set( key, value );
//}
//
///*
//================
//idThread::Event_GetPersistantString
//================
//*/
//Event_GetPersistantString( key:string ) :void{
//	const char *result;
//
//	gameLocal.persistentLevelInfo.GetString( key, "", &result );
//	ReturnString( result );
//}
//
///*
//================
//idThread::Event_GetPersistantFloat
//================
//*/
//Event_GetPersistantFloat( key:string ):void {
//	float result;
//
//	gameLocal.persistentLevelInfo.GetFloat( key, "0", result );
//	ReturnFloat( result );
//}
//
///*
//================
//idThread::Event_GetPersistantVector
//================
//*/
//Event_GetPersistantVector( key:string ) :void{
//	idVec3 result;
//
//	gameLocal.persistentLevelInfo.GetVector( key, "0 0 0", result );
//	ReturnVector( result );
//}
//
///*
//================
//idThread::Event_AngToForward
//================
//*/
//Event_AngToForward( ang:idAngles ):void {
//	ReturnVector( ang.ToForward() );
//}
//
///*
//================
//idThread::Event_AngToRight
//================
//*/
//Event_AngToRight( ang:idAngles ):void {
//	idVec3 vec;
//
//	ang.ToVectors( NULL, &vec );
//	ReturnVector( vec );
//}
//
///*
//================
//idThread::Event_AngToUp
//================
//*/
//Event_AngToUp( ang:idAngles ) :void{
//	idVec3 vec;
//
//	ang.ToVectors( NULL, NULL, &vec );
//	ReturnVector( vec );
//}
//
///*
//================
//idThread::Event_GetSine
//================
//*/
//Event_GetSine( /*float*/angle:number ):void {
//	ReturnFloat( idMath::Sin( DEG2RAD( angle ) ) );
//}
//
///*
//================
//idThread::Event_GetCosine
//================
//*/
//Event_GetCosine( /*float*/angle:number ) :void{
//	ReturnFloat( idMath::Cos( DEG2RAD( angle ) ) );
//}
//
///*
//================
//idThread::Event_GetSquareRoot
//================
//*/
//Event_GetSquareRoot( float theSquare ) :void{
//	ReturnFloat( idMath::Sqrt( theSquare ) );
//}
//
///*
//================
//idThread::Event_VecNormalize
//================
//*/
//Event_VecNormalize( vec:idVec3 ) :void{
//	idVec3 n;
//
//	n = vec;
//	n.Normalize();
//	ReturnVector( n );
//}
//
///*
//================
//idThread::Event_VecLength
//================
//*/
//Event_VecLength( vec:idVec3 ):void {
//	ReturnFloat( vec.Length() );
//}
//
///*
//================
//idThread::Event_VecDotProduct
//================
//*/
//Event_VecDotProduct( idVec3 &vec1, idVec3 &vec2 ) :void{
//	ReturnFloat( vec1 * vec2 );
//}
//
///*
//================
//idThread::Event_VecCrossProduct
//================
//*/
//Event_VecCrossProduct( idVec3 &vec1, idVec3 &vec2 ):void {
//	ReturnVector( vec1.Cross( vec2 ) );
//}
//
///*
//================
//idThread::Event_VecToAngles
//================
//*/
//Event_VecToAngles( vec:idVec3 ) :void{
//	idAngles ang = vec.ToAngles();
//	ReturnVector( idVec3( ang[0], ang[1], ang[2] ) );
//}
//
///*
//================
//idThread::Event_OnSignal
//================
//*/
//Event_OnSignal( int signal, ent:idEntity, const char *func ) :void{
//	const function_t *function;
//
//	assert( func );
//
//	if ( !ent ) {
//		Error( "Entity not found" );
//	}
//	
//	if ( ( signal < 0 ) || ( signal >= NUM_SIGNALS ) ) {
//		Error( "Signal out of range" );
//	}
//
//	function = gameLocal.program.FindFunction( func );
//	if ( !function ) {
//		Error( "Function '%s' not found", func );
//	}
//
//	ent.SetSignal( ( signalNum_t )signal, this, function );
//}
//
///*
//================
//idThread::Event_ClearSignalThread
//================
//*/
//Event_ClearSignalThread( int signal, ent:idEntity ):void {
//	if ( !ent ) {
//		Error( "Entity not found" );
//	}
//	
//	if ( ( signal < 0 ) || ( signal >= NUM_SIGNALS ) ) {
//		Error( "Signal out of range" );
//	}
//
//	ent.ClearSignalThread( ( signalNum_t )signal, this );
//}
//
///*
//================
//idThread::Event_SetCamera
//================
//*/
//Event_SetCamera( ent:idEntity ) :void{
//	if ( !ent ) {
//		Error( "Entity not found" );
//		return;
//	}
//
//	if ( !ent.IsType( idCamera::Type ) ) {
//		Error( "Entity is not a camera" );
//		return;
//	}
//
//	gameLocal.SetCamera( ( idCamera * )ent );
//}
//
///*
//================
//idThread::Event_FirstPerson
//================
//*/
//Event_FirstPerson( ):void {
//	gameLocal.SetCamera( NULL );
//}
//
///*
//================
//idThread::Event_Trace
//================
//*/
//Event_Trace( start:idVec3, end:idVec3, mins:idVec3, maxs:idVec3, int contents_mask, passEntity:idEntity ):void {
//	if ( mins == vec3_origin && maxs == vec3_origin ) {
//		gameLocal.clip.TracePoint( idThread.trace, start, end, contents_mask, passEntity );
//	} else {
//		gameLocal.clip.TraceBounds( idThread.trace, start, end, idBounds( mins, maxs ), contents_mask, passEntity );
//	}
//	ReturnFloat( idThread.trace.fraction );
//}
//
///*
//================
//idThread::Event_TracePoint
//================
//*/
//Event_TracePoint( start:idVec3, end:idVec3, int contents_mask, passEntity:idEntity ) :void{
//	gameLocal.clip.TracePoint( idThread.trace, start, end, contents_mask, passEntity );
//	ReturnFloat( idThread.trace.fraction );
//}
//
///*
//================
//idThread::Event_GetTraceFraction
//================
//*/
//Event_GetTraceFraction( ):void {
//	ReturnFloat( idThread.trace.fraction );
//}
//
///*
//================
//idThread::Event_GetTraceEndPos
//================
//*/
//Event_GetTraceEndPos( ) :void{
//	ReturnVector( idThread.trace.endpos );
//}
//
///*
//================
//idThread::Event_GetTraceNormal
//================
//*/
//Event_GetTraceNormal( ) :void{
//	if ( idThread.trace.fraction < 1.0f ) {
//		ReturnVector( idThread.trace.c.normal );
//	} else {
//		ReturnVector( vec3_origin );
//	}
//}
//
///*
//================
//idThread::Event_GetTraceEntity
//================
//*/
//Event_GetTraceEntity( ):void {
//	if ( idThread.trace.fraction < 1.0f ) {
//		ReturnEntity( gameLocal.entities[ idThread.trace.c.entityNum ] );
//	} else {
//		ReturnEntity( ( idEntity * )NULL );
//	}
//}
//
///*
//================
//idThread::Event_GetTraceJoint
//================
//*/
//Event_GetTraceJoint( ) :void{
//	if ( idThread.trace.fraction < 1.0f && idThread.trace.c.id < 0 ) {
//		idAFEntity_Base *af = static_cast<idAFEntity_Base *>( gameLocal.entities[ idThread.trace.c.entityNum ] );
//		if ( af && af.IsType( idAFEntity_Base::Type ) && af.IsActiveAF() ) {
//			ReturnString( af.GetAnimator().GetJointName( CLIPMODEL_ID_TO_JOINT_HANDLE( idThread.trace.c.id ) ) );
//			return;
//		}
//	}
//	ReturnString( "" );
//}
//
///*
//================
//idThread::Event_GetTraceBody
//================
//*/
//Event_GetTraceBody( ):void {
//	if ( idThread.trace.fraction < 1.0f && idThread.trace.c.id < 0 ) {
//		idAFEntity_Base *af = static_cast<idAFEntity_Base *>( gameLocal.entities[ idThread.trace.c.entityNum ] );
//		if ( af && af.IsType( idAFEntity_Base::Type ) && af.IsActiveAF() ) {
//			int bodyId = af.BodyForClipModelId( idThread.trace.c.id );
//			idAFBody *body = af.GetAFPhysics().GetBody( bodyId );
//			if ( body ) {
//				ReturnString( body.GetName() );
//				return;
//			}
//		}
//	}
//	ReturnString( "" );
//}
//
///*
//================
//idThread::Event_FadeIn
//================
//*/
//Event_FadeIn( color:idVec3, /*float*/time:number ) :void{
//	idVec4		fadeColor;
//	idPlayer	*player;
//
//	player = gameLocal.GetLocalPlayer();
//	if ( player ) {
//		fadeColor.Set( color[ 0 ], color[ 1 ], color[ 2 ], 0.0 );
//		player.playerView.Fade(fadeColor, SEC2MS( time ) );
//	}
//}
//
///*
//================
//idThread::Event_FadeOut
//================
//*/
//Event_FadeOut( color:idVec3, /*float*/time:number ):void {
//	idVec4		fadeColor;
//	idPlayer	*player;
//
//	player = gameLocal.GetLocalPlayer();
//	if ( player ) {
//		fadeColor.Set( color[ 0 ], color[ 1 ], color[ 2 ], 1.0f );
//		player.playerView.Fade(fadeColor, SEC2MS( time ) );
//	}
//}
//
///*
//================
//idThread::Event_FadeTo
//================
//*/
//Event_FadeTo( color:idVec3, float alpha, /*float*/time:number ):void {
//	idVec4		fadeColor;
//	idPlayer	*player;
//
//	player = gameLocal.GetLocalPlayer();
//	if ( player ) {
//		fadeColor.Set( color[ 0 ], color[ 1 ], color[ 2 ], alpha );
//		player.playerView.Fade(fadeColor, SEC2MS( time ) );
//	}
//}
//
///*
//================
//idThread::Event_SetShaderParm
//================
//*/
//Event_SetShaderParm( int parmnum, float value ) :void{
//	if ( ( parmnum < 0 ) || ( parmnum >= MAX_GLOBAL_SHADER_PARMS ) ) {
//		Error( "shader parm index (%d) out of range", parmnum );
//	}
//
//	gameLocal.globalShaderParms[ parmnum ] = value;
//}
//
///*
//================
//idThread::Event_StartMusic
//================
//*/
//Event_StartMusic( text:string ) :void{
//	gameSoundWorld.PlayShaderDirectly( text );
//}
//
///*
//================
//idThread::Event_Warning
//================
//*/
//Event_Warning( text:string ) :void{
//	Warning( "%s", text );
//}
//
///*
//================
//idThread::Event_Error
//================
//*/
//Event_Error( text:string ):void {
//	Error( "%s", text );
//}
//
///*
//================
//idThread::Event_StrLen
//================
//*/
//Event_StrLen( $string:string ):void {
//	int len;
//
//	len = strlen( string );
//	idThread::ReturnInt( len );
//}
//
///*
//================
//idThread::Event_StrLeft
//================
//*/
//Event_StrLeft( $string:string, /*int*/num:number ):void {
//	int len;
//
//	if ( num < 0 ) {
//		idThread::ReturnString( "" );
//		return;
//	}
//
//	len = strlen( string );
//	if ( len < num ) {
//		idThread::ReturnString( string );
//		return;
//	}
//
//	idStr result( string, 0, num );
//	idThread::ReturnString( result );
//}
//
///*
//================
//idThread::Event_StrRight 
//================
//*/
//Event_StrRight( $string:string, /*int*/num:number ) :void{
//	int len;
//
//	if ( num < 0 ) {
//		idThread::ReturnString( "" );
//		return;
//	}
//
//	len = strlen( string );
//	if ( len < num ) {
//		idThread::ReturnString( string );
//		return;
//	}
//
//	idThread::ReturnString( string + len - num );
//}
//
///*
//================
//idThread::Event_StrSkip
//================
//*/
//Event_StrSkip( $string:string, /*int*/num:number ) :void{
//	int len;
//
//	if ( num < 0 ) {
//		idThread::ReturnString( string );
//		return;
//	}
//
//	len = strlen( string );
//	if ( len < num ) {
//		idThread::ReturnString( "" );
//		return;
//	}
//
//	idThread::ReturnString( string + num );
//}
//
///*
//================
//idThread::Event_StrMid
//================
//*/
//Event_StrMid( $string:string, int start, /*int*/num:number ) :void{
//	int len;
//
//	if ( num < 0 ) {
//		idThread::ReturnString( "" );
//		return;
//	}
//
//	if ( start < 0 ) {
//		start = 0;
//	}
//	len = strlen( string );
//	if ( start > len ) {
//		start = len;
//	}
//
//	if ( start + num > len ) {
//		num = len - start;
//	}
//
//	idStr result( string, start, start + num );
//	idThread::ReturnString( result );
//}
//
///*
//================
//idThread::Event_StrToFloat( const char *string )
//================
//*/
//Event_StrToFloat( $string:string ):void {
//	float result;
//
//	result = atof( string );
//	idThread::ReturnFloat( result );
//}
//
///*
//================
//idThread::Event_RadiusDamage
//================
//*/
//Event_RadiusDamage( const idVec3 &origin, idEntity *inflictor, idEntity *attacker, idEntity *ignore, const char *damageDefName, float dmgPower ):void {
//	gameLocal.RadiusDamage( origin, inflictor, attacker, ignore, ignore, damageDefName, dmgPower );
//}
//
///*
//================
//idThread::Event_IsClient
//================
//*/
//Event_IsClient( ):void { 
//	idThread::ReturnFloat( gameLocal.isClient );
//}
//
///*
//================
//idThread::Event_IsMultiplayer
//================
//*/
//Event_IsMultiplayer( ):void { 
//	idThread::ReturnFloat( gameLocal.isMultiplayer );
//}
//
///*
//================
//idThread::Event_GetFrameTime
//================
//*/
//Event_GetFrameTime( ) :void{ 
//	idThread::ReturnFloat( MS2SEC( gameLocal.msec ) );
//}
//
///*
//================
//idThread::Event_GetTicsPerSecond
//================
//*/
//Event_GetTicsPerSecond( ) :void{ 
//	idThread::ReturnFloat( USERCMD_HZ );
//}
//
///*
//================
//idThread::Event_CacheSoundShader
//================
//*/
//Event_CacheSoundShader( const char *soundName ):void {
//	declManager.FindSound( soundName );
//}
//
///*
//================
//idThread::Event_DebugLine
//================
//*/
//Event_DebugLine( color:idVec3, start:idVec3, end:idVec3, const float lifetime ):void {
//	gameRenderWorld.DebugLine( idVec4( color.x, color.y, color.z, 0.0 ), start, end, SEC2MS( lifetime ) );
//}
//
///*
//================
//idThread::Event_DebugArrow
//================
//*/
//Event_DebugArrow( color:idVec3, start:idVec3, end:idVec3, const int size, const float lifetime ):void {
//	gameRenderWorld.DebugArrow( idVec4( color.x, color.y, color.z, 0.0 ), start, end, size, SEC2MS( lifetime ) );
//}
//
///*
//================
//idThread::Event_DebugCircle
//================
//*/
//Event_DebugCircle( color:idVec3, const idVec3 &origin, const idVec3 &dir, const float radius, const int numSteps, const float lifetime ):void {
//	gameRenderWorld.DebugCircle( idVec4( color.x, color.y, color.z, 0.0 ), origin, dir, radius, numSteps, SEC2MS( lifetime ) );
//}
//
///*
//================
//idThread::Event_DebugBounds
//================
//*/
//Event_DebugBounds( color:idVec3, mins:idVec3, maxs:idVec3, const float lifetime ) :void{
//	gameRenderWorld.DebugBounds( idVec4( color.x, color.y, color.z, 0.0 ), idBounds( mins, maxs ), vec3_origin, SEC2MS( lifetime ) );
//}
//
///*
//================
//idThread::Event_DrawText
//================
//*/
//Event_DrawText( text:string, const idVec3 &origin, float scale, color:idVec3, const int align, const float lifetime ) :void{
//	gameRenderWorld.DrawText( text, origin, scale, idVec4( color.x, color.y, color.z, 0.0 ), gameLocal.GetLocalPlayer().viewAngles.ToMat3(), align, SEC2MS( lifetime ) );
//}
//
///*
//================
//idThread::Event_InfluenceActive
//================
//*/
//Event_InfluenceActive( ):void {
//	idPlayer *player;
//
//	player = gameLocal.GetLocalPlayer();
//	if ( player && player.GetInfluenceLevel() ) {
//		idThread::ReturnInt( true );
//	} else {
//		idThread::ReturnInt( false );
//	}
//}
}


//CLASS_DECLARATION( idClass, idThread )
idThread.CreateInstance = function (): idClass {
	try {
		var ptr = new idThread;
		ptr.FindUninitializedMemory();
		return ptr;
	} catch (e) {
		return null;
	}
};

idThread.prototype.GetType = function (): idTypeInfo {
	return (idThread.Type);
};

idThread.eventCallbacks = [
	EVENT(EV_Thread_Execute, idThread.prototype.Event_Execute),
	EVENT(EV_Thread_TerminateThread, idThread.prototype.Event_TerminateThread),
	EVENT(EV_Thread_Pause, idThread.prototype.Event_Pause),
	EVENT(EV_Thread_Wait, idThread.prototype.Event_Wait),
	EVENT(EV_Thread_WaitFrame, idThread.prototype.Event_WaitFrame),
	EVENT(EV_Thread_WaitFor, idThread.prototype.Event_WaitFor),
	EVENT(EV_Thread_WaitForThread, idThread.prototype.Event_WaitForThread),
	EVENT(EV_Thread_Print, idThread.prototype.Event_Print),
	EVENT(EV_Thread_PrintLn, idThread.prototype.Event_PrintLn),
	EVENT(EV_Thread_Say, idThread.prototype.Event_Say),
	EVENT(EV_Thread_Assert, idThread.prototype.Event_Assert),
	EVENT(EV_Thread_Trigger, idThread.prototype.Event_Trigger),
	EVENT(EV_Thread_SetCvar, idThread.prototype.Event_SetCvar),
	EVENT(EV_Thread_GetCvar, idThread.prototype.Event_GetCvar),
	EVENT(EV_Thread_Random, idThread.prototype.Event_Random),
	EVENT(EV_Thread_GetTime, idThread.prototype.Event_GetTime),
	EVENT(EV_Thread_KillThread, idThread.prototype.Event_KillThread),
	EVENT(EV_Thread_SetThreadName, idThread.prototype.Event_SetThreadName),
	EVENT(EV_Thread_GetEntity, idThread.prototype.Event_GetEntity),
	EVENT(EV_Thread_Spawn, idThread.prototype.Event_Spawn),
	EVENT(EV_Thread_CopySpawnArgs, idThread.prototype.Event_CopySpawnArgs),
	EVENT(EV_Thread_SetSpawnArg, idThread.prototype.Event_SetSpawnArg),
	EVENT(EV_Thread_SpawnString, idThread.prototype.Event_SpawnString),
	EVENT(EV_Thread_SpawnFloat, idThread.prototype.Event_SpawnFloat),
	EVENT(EV_Thread_SpawnVector, idThread.prototype.Event_SpawnVector),
	EVENT(EV_Thread_ClearPersistantArgs, idThread.prototype.Event_ClearPersistantArgs),
	EVENT(EV_Thread_SetPersistantArg, idThread.prototype.Event_SetPersistantArg),
	EVENT(EV_Thread_GetPersistantString, idThread.prototype.Event_GetPersistantString),
	EVENT(EV_Thread_GetPersistantFloat, idThread.prototype.Event_GetPersistantFloat),
	EVENT(EV_Thread_GetPersistantVector, idThread.prototype.Event_GetPersistantVector),
	EVENT(EV_Thread_AngToForward, idThread.prototype.Event_AngToForward),
	EVENT(EV_Thread_AngToRight, idThread.prototype.Event_AngToRight),
	EVENT(EV_Thread_AngToUp, idThread.prototype.Event_AngToUp),
	EVENT(EV_Thread_Sine, idThread.prototype.Event_GetSine),
	EVENT(EV_Thread_Cosine, idThread.prototype.Event_GetCosine),
	EVENT(EV_Thread_SquareRoot, idThread.prototype.Event_GetSquareRoot),
	EVENT(EV_Thread_Normalize, idThread.prototype.Event_VecNormalize),
	EVENT(EV_Thread_VecLength, idThread.prototype.Event_VecLength),
	EVENT(EV_Thread_VecDotProduct, idThread.prototype.Event_VecDotProduct),
	EVENT(EV_Thread_VecCrossProduct, idThread.prototype.Event_VecCrossProduct),
	EVENT(EV_Thread_VecToAngles, idThread.prototype.Event_VecToAngles),
	EVENT(EV_Thread_OnSignal, idThread.prototype.Event_OnSignal),
	EVENT(EV_Thread_ClearSignal, idThread.prototype.Event_ClearSignalThread),
	EVENT(EV_Thread_SetCamera, idThread.prototype.Event_SetCamera),
	EVENT(EV_Thread_FirstPerson, idThread.prototype.Event_FirstPerson),
	EVENT(EV_Thread_Trace, idThread.prototype.Event_Trace),
	EVENT(EV_Thread_TracePoint, idThread.prototype.Event_TracePoint),
	EVENT(EV_Thread_GetTraceFraction, idThread.prototype.Event_GetTraceFraction),
	EVENT(EV_Thread_GetTraceEndPos, idThread.prototype.Event_GetTraceEndPos),
	EVENT(EV_Thread_GetTraceNormal, idThread.prototype.Event_GetTraceNormal),
	EVENT(EV_Thread_GetTraceEntity, idThread.prototype.Event_GetTraceEntity),
	EVENT(EV_Thread_GetTraceJoint, idThread.prototype.Event_GetTraceJoint),
	EVENT(EV_Thread_GetTraceBody, idThread.prototype.Event_GetTraceBody),
	EVENT(EV_Thread_FadeIn, idThread.prototype.Event_FadeIn),
	EVENT(EV_Thread_FadeOut, idThread.prototype.Event_FadeOut),
	EVENT(EV_Thread_FadeTo, idThread.prototype.Event_FadeTo),
	EVENT(EV_SetShaderParm, idThread.prototype.Event_SetShaderParm),
	EVENT(EV_Thread_StartMusic, idThread.prototype.Event_StartMusic),
	EVENT(EV_Thread_Warning, idThread.prototype.Event_Warning),
	EVENT(EV_Thread_Error, idThread.prototype.Event_Error),
	EVENT(EV_Thread_StrLen, idThread.prototype.Event_StrLen),
	EVENT(EV_Thread_StrLeft, idThread.prototype.Event_StrLeft),
	EVENT(EV_Thread_StrRight, idThread.prototype.Event_StrRight),
	EVENT(EV_Thread_StrSkip, idThread.prototype.Event_StrSkip),
	EVENT(EV_Thread_StrMid, idThread.prototype.Event_StrMid),
	EVENT(EV_Thread_StrToFloat, idThread.prototype.Event_StrToFloat),
	EVENT(EV_Thread_RadiusDamage, idThread.prototype.Event_RadiusDamage),
	EVENT(EV_Thread_IsClient, idThread.prototype.Event_IsClient),
	EVENT(EV_Thread_IsMultiplayer, idThread.prototype.Event_IsMultiplayer),
	EVENT(EV_Thread_GetFrameTime, idThread.prototype.Event_GetFrameTime),
	EVENT(EV_Thread_GetTicsPerSecond, idThread.prototype.Event_GetTicsPerSecond),
	EVENT(EV_CacheSoundShader, idThread.prototype.Event_CacheSoundShader),
	EVENT(EV_Thread_DebugLine, idThread.prototype.Event_DebugLine),
	EVENT(EV_Thread_DebugArrow, idThread.prototype.Event_DebugArrow),
	EVENT(EV_Thread_DebugCircle, idThread.prototype.Event_DebugCircle),
	EVENT(EV_Thread_DebugBounds, idThread.prototype.Event_DebugBounds),
	EVENT(EV_Thread_DrawText, idThread.prototype.Event_DrawText),
	EVENT(EV_Thread_InfluenceActive, idThread.prototype.Event_InfluenceActive)
];

idThread.Type = new idTypeInfo("idThread", "idClass",
	idThread.eventCallbacks, idThread.CreateInstance, idThread.prototype.Spawn,
	idThread.prototype.Save, idThread.prototype.Restore);
