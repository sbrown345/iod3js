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

//#ifndef __SCRIPT_INTERPRETER_H__
//#define __SCRIPT_INTERPRETER_H__
//
var MAX_STACK_DEPTH = 64;
var LOCALSTACK_SIZE = 6144;

class prstack_t {
	s: number /*int*/;
	f: function_t;
	stackbase: number /*int*/;

	memset0 ( ): void {
		this.s = 0;
		this.f = null;
		this.stackbase = 0;
	}
}

class idInterpreter {
//private:
	callStack = newStructArray<prstack_t>( prstack_t, MAX_STACK_DEPTH );
	callStackDepth: number /*int*/;
	maxStackDepth: number /*int*/;

	localstack = new Uint8Array( LOCALSTACK_SIZE );
	localstackUsed: number /*int*/;
	localstackBase: number /*int*/;
	maxLocalstackUsed: number /*int*/;

	currentFunction: function_t;
	instructionPointer: number /*int*/;

	popParms: number /*int*/;
	multiFrameEvent: idEventDef;
	eventEntity: idEntity;

	thread: idThread;

//	void				PopParms( int numParms );
//	void				PushString( const char *string );
//	void				Push( int value );
//	const char			*FloatToString( float value );
//	void				AppendString( idVarDef *def, const char *from );
//	void				SetString( idVarDef *def, const char *from );
//	const char			*GetString( idVarDef *def );
//	varEval_t			GetVariable( idVarDef *def );
//	idEntity			*GetEntity( int entnum ) const;
//	idScriptObject		*GetScriptObject( int entnum ) const;
//	void				NextInstruction( int position );
//
//	void				LeaveFunction( idVarDef *returnDef );
//	void				CallEvent( const function_t *func, int argsize );
//	void				CallSysEvent( const function_t *func, int argsize );
//
//public:
	doneProcessing: boolean;
	threadDying: boolean;
	terminateOnExit: boolean;
	debug: boolean;
//
//						idInterpreter();
//
//	// save games
//	Save ( savefile: idSaveGame ): void { throw "placeholder"; }				// archives object for save game file
//	Restore(savefile:idRestoreGame):void{throw "placeholder";}				// unarchives object from save game file
//
//	void				SetThread( idThread *pThread );
//
//	void				StackTrace( ) const;
//
//	int					CurrentLine( ) const;
//	const char			*CurrentFile( ) const;
//
//	void				Error( char *fmt, ... ) const id_attribute((format(printf,2,3)));
//	void				Warning( char *fmt, ... ) const id_attribute((format(printf,2,3)));
//	void				DisplayInfo( ) const;
//
//	bool				BeginMultiFrameEvent( ent:idEntity, const idEventDef *event );
//	void				EndMultiFrameEvent( ent:idEntity, const idEventDef *event );
//	bool				MultiFrameEventInProgress( ) const;
//
//	void				ThreadCall( idInterpreter *source, const function_t *func, int args );
//	void				EnterFunction( const function_t *func, bool clearStack );
//	void				EnterObjectFunction( idEntity *self, const function_t *func, bool clearStack );
//
//	bool				Execute( );
//	void				Reset( );
//
//	bool				GetRegisterValue( name:string, idStr &out, int scopeDepth );
//	int					GetCallstackDepth( ) const;
//	const prstack_t		*GetCallstack( ) const;
//	const function_t	*GetCurrentFunction( ) const;
//	idThread			*GetThread( ) const;
//


/*
====================
idInterpreter::PopParms
====================
*/
	PopParms ( /*int */numParms: number ): void {
		// pop our parms off the stack
		if ( this.localstackUsed < numParms ) {
			this.Error( "locals stack underflow\n" );
		}

		this.localstackUsed -= numParms;
	}

/*
====================
idInterpreter::Push
====================
*/
	Push ( /*int*/ value: number ): void {
		if ( this.localstackUsed + sizeof( int ) > LOCALSTACK_SIZE ) {
			this.Error( "Push: locals stack overflow\n" );
		}

		( new Int32Array( this.localstack.buffer ) )[this.localstackUsed / 4] = value; ////*( int * )&this.localstack[ this.localstackUsed ]	= value;
		this.localstackUsed += sizeof( int );
	}

/*
====================
idInterpreter::PushString
====================
*/
	PushString ( $string: string ): void {
		if ( this.localstackUsed + MAX_STRING_LEN > LOCALSTACK_SIZE ) {
			this.Error( "PushString: locals stack overflow\n" );
		}
		idStr.Copynz( this.localstack.subarray( this.localstackUsed ), $string, MAX_STRING_LEN );
		this.localstackUsed += MAX_STRING_LEN;
	}

///*
//====================
//idInterpreter::FloatToString
//====================
//*/
//ID_INLINE const char *idInterpreter::FloatToString( float value ) {
//	static char	text[ 32 ];
//
//	if ( value == ( float )( int )value ) {
//		sprintf( text, "%d", ( int )value );
//	} else {
//		sprintf( text, "%f", value );
//	}
//	return text;
//}
//
///*
//====================
//idInterpreter::AppendString
//====================
//*/
//ID_INLINE void idInterpreter::AppendString( idVarDef *def, const char *from ) {
//	if ( def.initialized == initialized_t.stackVariable ) {
//		idStr::Append( ( char * )&this.localstack[ this.localstackBase + def.value.stackOffset ], MAX_STRING_LEN, from );
//	} else {
//		idStr::Append( def.value.stringPtr, MAX_STRING_LEN, from );
//	}
//}
//
///*
//====================
//idInterpreter::SetString
//====================
//*/
//ID_INLINE void idInterpreter::SetString( idVarDef *def, const char *from ) {
//	if ( def.initialized == initialized_t.stackVariable ) {
//		idStr.Copynz( ( char * )&this.localstack[ this.localstackBase + def.value.stackOffset ], from, MAX_STRING_LEN );
//	} else {
//		idStr.Copynz( def.value.stringPtr, from, MAX_STRING_LEN );
//	}
//}
//
/*
====================
idInterpreter::GetString
====================
*/
	GetString ( def: idVarDef ): string /*todo: use array here so dont have to swtich between array and string all the time*/ {
		if ( def.initialized == initialized_t.stackVariable ) {
			//return this.localstack[ this.localstackBase + def.value.stackOffset ];
			return /*( char * )&*/this.localstack.subarray( this.localstackBase + def.value.stackOffset ).toString ( );
		} else {
			return def.value.stringPtr;
		}
	}

/*
====================
idInterpreter::GetVariable
====================
*/
	GetVariable(def: idVarDef ): varEval_t {
	if ( def.initialized == initialized_t.stackVariable ) {
		var val: varEval_t;
		//val.intPtr = ( int *) & this.localstack[this.localstackBase + def.value.stackOffset];
		val.intPtr = this.localstackBase + def.value.stackOffset;
		return val;
	} else {
		return def.value;
	}
}

///*
//================
//idInterpreter::GetEntity
//================
//*/
//ID_INLINE idEntity *idInterpreter::GetEntity( int entnum ) const{
//	assert( entnum <= MAX_GENTITIES );
//	if ( ( entnum > 0 ) && ( entnum <= MAX_GENTITIES ) ) {
//		return gameLocal.entities[ entnum - 1 ];
//	}
//	return NULL;
//}
//
///*
//================
//idInterpreter::GetScriptObject
//================
//*/
//ID_INLINE idScriptObject *idInterpreter::GetScriptObject( int entnum ) const {
//	idEntity *ent;
//
//	assert( entnum <= MAX_GENTITIES );
//	if ( ( entnum > 0 ) && ( entnum <= MAX_GENTITIES ) ) {
//		ent = gameLocal.entities[ entnum - 1 ];
//		if ( ent && ent.scriptObject.data ) {
//			return &ent.scriptObject;
//		}
//	}
//	return NULL;
//}

/*
====================
idInterpreter::NextInstruction
====================
*/
	NextInstruction ( /*int */position: number ): void {
		// Before we execute an instruction, we increment instructionPointer,
		// therefore we need to compensate for that here.
		this.instructionPointer = position - 1;
	}

//#endif /* !__SCRIPT_INTERPRETER_H__ */

/*
================
idInterpreter::idInterpreter()
================
*/
	constructor ( ) {
		this.localstackUsed = 0;
		this.terminateOnExit = true;
		this.debug = false;
		memset( this.localstack, 0, sizeof( this.localstack ) );
		clearStructArray( this.callStack );
		this.Reset ( );
	}

///*
//================
//idInterpreter::Save
//================
//*/
//void idInterpreter::Save( idSaveGame *savefile ) const {
//	var/*int*/i:number;
//
//	savefile.WriteInt( this.callStackDepth );
//	for( i = 0; i < this.callStackDepth; i++ ) {
//		savefile.WriteInt( this.callStack[i].s );
//		if ( this.callStack[i].f ) {
//			savefile.WriteInt( gameLocal.program.GetFunctionIndex( this.callStack[i].f ) );
//		} else {
//			savefile.WriteInt( -1 );
//		}
//		savefile.WriteInt( this.callStack[i].stackbase );
//	}
//	savefile.WriteInt( this.maxStackDepth );
//
//	savefile.WriteInt( this.localstackUsed );
//	savefile.Write( &this.localstack, this.localstackUsed );
//
//	savefile.WriteInt( this.localstackBase );
//	savefile.WriteInt( this.maxLocalstackUsed );
//
//	if ( this.currentFunction ) {
//		savefile.WriteInt( gameLocal.program.GetFunctionIndex( this.currentFunction ) );
//	} else {
//		savefile.WriteInt( -1 );
//	}
//	savefile.WriteInt( this.instructionPointer );
//
//	savefile.WriteInt( this.popParms );
//
//	if ( this.multiFrameEvent ) {
//		savefile.WriteString( this.multiFrameEvent.GetName() );
//	} else {
//		savefile.WriteString( "" );
//	}
//	savefile.WriteObject( eventEntity );
//
//	savefile.WriteObject( this.thread );
//
//	savefile.WriteBool( this.doneProcessing );
//	savefile.WriteBool( this.threadDying );
//	savefile.WriteBool( this.terminateOnExit );
//	savefile.WriteBool( this.debug );
//}
//
///*
//================
//idInterpreter::Restore
//================
//*/
//void idInterpreter::Restore( idRestoreGame *savefile ) {
//	var/*int*/i:number;
//	idStr funcname;
//	int func_index;
//
//	savefile.ReadInt( this.callStackDepth );
//	for( i = 0; i < this.callStackDepth; i++ ) {
//		savefile.ReadInt( this.callStack[i].s );
//
//		savefile.ReadInt( func_index );
//		if ( func_index >= 0 ) {
//			this.callStack[i].f = gameLocal.program.GetFunction( func_index );
//		} else {
//			this.callStack[i].f = NULL;
//		}
//
//		savefile.ReadInt( this.callStack[i].stackbase );
//	}
//	savefile.ReadInt( this.maxStackDepth );
//
//	savefile.ReadInt( this.localstackUsed );
//	savefile.Read( &this.localstack, this.localstackUsed );
//
//	savefile.ReadInt( this.localstackBase );
//	savefile.ReadInt( this.maxLocalstackUsed );
//
//	savefile.ReadInt( func_index );
//	if ( func_index >= 0 ) {
//		this.currentFunction = gameLocal.program.GetFunction( func_index );
//	} else {
//		this.currentFunction = NULL;
//	}
//	savefile.ReadInt( this.instructionPointer );
//
//	savefile.ReadInt( this.popParms );
//
//	savefile.ReadString( funcname );
//	if ( funcname.Length() ) {
//		this.multiFrameEvent = idEventDef::FindEvent( funcname );
//	}
//
//	savefile.ReadObject( reinterpret_cast<idClass *&>( eventEntity ) );
//	savefile.ReadObject( reinterpret_cast<idClass *&>( this.thread ) );
//
//	savefile.ReadBool( this.doneProcessing );
//	savefile.ReadBool( this.threadDying );
//	savefile.ReadBool( this.terminateOnExit );
//	savefile.ReadBool( this.debug );
//}

/*
================
idInterpreter::Reset
================
*/
	Reset ( ): void {
		this.callStackDepth = 0;
		this.localstackUsed = 0;
		this.localstackBase = 0;

		this.maxLocalstackUsed = 0;
		this.maxStackDepth = 0;

		this.popParms = 0;
		this.multiFrameEvent = null;
		this.eventEntity = null;

		this.currentFunction = null;
		this.NextInstruction( 0 );

		this.threadDying = false;
		this.doneProcessing = true;
	}

///*
//================
//idInterpreter::GetRegisterValue
//
//Returns a string representation of the value of the register.  This is 
//used primarily for the debugger and debugging
//
////FIXME:  This is pretty much wrong.  won't access data in most situations.
//================
//*/
//bool idInterpreter::GetRegisterValue( const char *name, idStr &out, int scopeDepth ) {
//	varEval_t		reg;
//	idVarDef		*d;
//	char			funcObject[ 1024 ];
//	char			*funcName;
//	const idVarDef	*scope;
//	const idTypeDef	*field;
//	const idScriptObject *obj;
//	const function_t *func;
//
//	out.Empty();
//	
//	if ( scopeDepth == -1 ) {
//		scopeDepth = this.callStackDepth;
//	}	
//	
//	if ( scopeDepth == this.callStackDepth ) {
//		func = this.currentFunction;
//	} else {
//		func = this.callStack[ scopeDepth ].f;
//	}
//	if ( !func ) {
//		return false;
//	}
//
//	idStr.Copynz( funcObject, func.Name(), sizeof( funcObject ) );
//	funcName = strstr( funcObject, "::" );
//	if ( funcName ) {
//		*funcName = '\0';
//		scope = gameLocal.program.GetDef( NULL, funcObject, &def_namespace );
//		funcName += 2;
//	} else {
//		funcName = funcObject;
//		scope = &def_namespace;
//	}
//
//	// Get the function from the object
//	d = gameLocal.program.GetDef( NULL, funcName, scope );
//	if ( !d ) {
//		return false;
//	}
//	
//	// Get the variable itself and check various namespaces
//	d = gameLocal.program.GetDef( NULL, name, d );
//	if ( !d ) {
//		if ( scope == &def_namespace ) {
//			return false;
//		}
//		
//		d = gameLocal.program.GetDef( NULL, name, scope );
//		if ( !d ) {
//			d = gameLocal.program.GetDef( NULL, name, &def_namespace );
//			if ( !d ) {
//				return false;
//			}
//		}
//	}
//		
//	reg = this.GetVariable( d );
//	switch( d.Type() ) {
//	case ev_float:
//		if ( reg.floatPtr ) {
//			out = va("%g", *reg.floatPtr );
//		} else {
//			out = "0";
//		}
//		return true;
//		break;
//
//	case ev_vector:
//		if ( reg.vectorPtr ) {				
//			out = va( "%g,%g,%g", reg.vectorPtr.x, reg.vectorPtr.y, reg.vectorPtr.z );
//		} else {
//			out = "0,0,0";
//		}
//		return true;
//		break;
//
//	case ev_boolean:
//		if ( reg.intPtr ) {
//			out = va( "%d", *reg.intPtr );
//		} else {
//			out = "0";
//		}
//		return true;
//		break;
//
//	case ev_field:
//		if ( scope == &def_namespace ) {
//			// should never happen, but handle it safely anyway
//			return false;
//		}
//
//		field = scope.TypeDef().GetParmType( reg.ptrOffset ).FieldType();
//		obj   = *reinterpret_cast<const idScriptObject **>( &this.localstack[ this.callStack[ this.callStackDepth ].stackbase ] );
//		if ( !field || !obj ) {
//			return false;
//		}
//								
//		switch ( field.Type() ) {
//		case ev_boolean:
//			out = va( "%d", *( reinterpret_cast<int *>( &obj.data[ reg.ptrOffset ] ) ) );
//			return true;
//
//		case ev_float:
//			out = va( "%g", *( reinterpret_cast<float *>( &obj.data[ reg.ptrOffset ] ) ) );
//			return true;
//
//		default:
//			return false;
//		}
//		break;
//
//	case ev_string:
//		if ( reg.stringPtr ) {
//			out = "\"";
//			out += reg.stringPtr;
//			out += "\"";
//		} else {
//			out = "\"\"";
//		}
//		return true;
//
//	default:
//		return false;
//	}
//}
//
///*
//================
//idInterpreter::GetCallstackDepth
//================
//*/
//int idInterpreter::GetCallstackDepth( ) const {
//	return this.callStackDepth;
//}
//
///*
//================
//idInterpreter::GetCallstack
//================
//*/
//const prstack_t *idInterpreter::GetCallstack( ) const {
//	return &this.callStack[ 0 ];
//}
//
///*
//================
//idInterpreter::GetCurrentFunction
//================
//*/
//const function_t *idInterpreter::GetCurrentFunction( ) const {
//	return this.currentFunction;
//}
//
///*
//================
//idInterpreter::GetThread
//================
//*/
//idThread *idInterpreter::GetThread( ) const {
//	return this.thread;
//}
//
//
/*
================
idInterpreter::SetThread
================
*/
	SetThread ( pThread: idThread ): void {
		this.thread = pThread;
	}

///*
//================
//idInterpreter::CurrentLine
//================
//*/
//int idInterpreter::CurrentLine( ) const {
//	if ( this.instructionPointer < 0 ) {
//		return 0;
//	}
//	return gameLocal.program.GetLineNumberForStatement( this.instructionPointer );
//}
//
///*
//================
//idInterpreter::CurrentFile
//================
//*/
//const char *idInterpreter::CurrentFile( ) const {
//	if ( this.instructionPointer < 0 ) {
//		return "";
//	}
//	return gameLocal.program.GetFilenameForStatement( this.instructionPointer );
//}
//
/*
============
idInterpreter::StackTrace
============
*/
	StackTrace ( ): void {
		var f: function_t;
		var i: number /*int*/;
		var top: number /*int*/;

		if ( this.callStackDepth == 0 ) {
			gameLocal.Printf( "<NO STACK>\n" );
			return;
		}

		top = this.callStackDepth;
		if ( top >= MAX_STACK_DEPTH ) {
			top = MAX_STACK_DEPTH - 1;
		}

		if ( !this.currentFunction ) {
			gameLocal.Printf( "<NO FUNCTION>\n" );
		} else {
			gameLocal.Printf( "%12s : %s\n", gameLocal.program.GetFilename( this.currentFunction.filenum ), this.currentFunction.Name ( ) );
		}

		for ( i = top; i >= 0; i-- ) {
			f = this.callStack[i].f;
			if ( !f ) {
				gameLocal.Printf( "<NO FUNCTION>\n" );
			} else {
				gameLocal.Printf( "%12s : %s\n", gameLocal.program.GetFilename( f.filenum ), f.Name ( ) );
			}
		}
	}

/*
============
idInterpreter::Error

Aborts the currently executing function
============
*/
	Error ( fmt: string, ...args: any[] ): void {
		this.StackTrace ( );
		todoThrow ( );
		//va_list argptr;
		var text: string; //char	text[ 1024 ];

		//va_start( argptr, fmt );
		text = vsprintf( fmt, args );
		//va_end( argptr );

		this.StackTrace ( );

		if ( ( this.instructionPointer >= 0 ) && ( this.instructionPointer < gameLocal.program.NumStatements ( ) ) ) {
			var line = gameLocal.program.GetStatement( this.instructionPointer );
			common.Error( "%s(%d): Thread '%s': %s\n", gameLocal.program.GetFilename( line.file ), line.linenumber, this.thread.GetThreadName ( ), text );
		} else {
			common.Error( "Thread '%s': %s\n", this.thread.GetThreadName ( ), text );
		}
	}

/*
============
idInterpreter::Warning

Prints file and line number information with warning.
============
*/
	Warning ( fmt: string, ...args: any[] ): void {
		//va_list argptr;
		var text: string; //char	text[ 1024 ];

		//va_start( argptr, fmt );
		text = vsprintf( fmt, args );
		//va_end( argptr );

		if ( ( this.instructionPointer >= 0 ) && ( this.instructionPointer < gameLocal.program.NumStatements ( ) ) ) {
			var line = gameLocal.program.GetStatement( this.instructionPointer );
			common.Warning( "%s(%d): Thread '%s': %s", gameLocal.program.GetFilename( line.file ), line.linenumber, this.thread.GetThreadName ( ), text );
		} else {
			common.Warning( "Thread '%s' : %s", this.thread.GetThreadName ( ), text );
		}
	}
//
///*
//================
//idInterpreter::DisplayInfo
//================
//*/
//void idInterpreter::DisplayInfo( ) const {
//	const function_t *f;
//	var/*int*/i:number;
//
//	gameLocal.Printf( " Stack depth: %d bytes, %d max\n", this.localstackUsed, this.maxLocalstackUsed );
//	gameLocal.Printf( "  Call depth: %d, %d max\n", this.callStackDepth, this.maxStackDepth );
//	gameLocal.Printf( "  Call Stack: " );
//
//	if ( this.callStackDepth == 0 ) {
//		gameLocal.Printf( "<NO STACK>\n" );
//	} else {
//		if ( !this.currentFunction ) {
//			gameLocal.Printf( "<NO FUNCTION>\n" );
//		} else {
//			gameLocal.Printf( "%12s : %s\n", gameLocal.program.GetFilename( this.currentFunction.filenum ), this.currentFunction.Name() );
//		}
//
//		for( i = this.callStackDepth; i > 0; i-- ) {
//			gameLocal.Printf( "              " );
//			f = this.callStack[ i ].f;
//			if ( !f ) {
//				gameLocal.Printf( "<NO FUNCTION>\n" );
//			} else {
//				gameLocal.Printf( "%12s : %s\n", gameLocal.program.GetFilename( f.filenum ), f.Name() );
//			}
//		}
//	}
//}
//
///*
//====================
//idInterpreter::ThreadCall
//
//Copys the args from the calling thread's stack
//====================
//*/
//void idInterpreter::ThreadCall( idInterpreter *source, const function_t *func, int args ) {
//	this.Reset();
//
//	memcpy( this.localstack, &source.localstack[ source.localstackUsed - args ], args );
//
//	this.localstackUsed = args;
//	this.localstackBase = 0;
//
//	this.maxLocalstackUsed = this.localstackUsed;
//	this.EnterFunction( func, false );
//
//	this.thread.SetThreadName( this.currentFunction.Name() );
//}
//
/*
================
idInterpreter::EnterObjectFunction

Calls a function on a script object.

NOTE: If this is called from within a event called by this interpreter, the function arguments will be invalid after calling this function.
================
*/
	EnterObjectFunction(self: idEntity, func: function_t , clearStack :boolean) :void{
	if ( clearStack ) {
		this.Reset();
	}
	if ( this.popParms ) {
		this.PopParms( this.popParms );
		this.popParms = 0;
	}
	this.Push( self.entityNumber + 1 );
	this.EnterFunction( func, false );
}

///*
//====================
//idInterpreter::EnterFunction
//
//Returns the new program statement counter
//
//NOTE: If this is called from within a event called by this interpreter, the function arguments will be invalid after calling this function.
//====================
//*/
	EnterFunction ( func: function_t, clearStack: boolean ): void {
		var /*int 		*/c: number;
		var stack: prstack_t;
		//todoThrow();throw "todo";
		if ( clearStack ) {
			this.Reset ( );
		}
		if ( this.popParms ) {
			this.PopParms( this.popParms );
			this.popParms = 0;
		}

		if ( this.callStackDepth >= MAX_STACK_DEPTH ) {
			this.Error( "call stack overflow" );
		}

		stack = this.callStack[this.callStackDepth];

		stack.s = this.instructionPointer + 1; // point to the next instruction to execute
		stack.f = this.currentFunction;
		stack.stackbase = this.localstackBase;

		this.callStackDepth++;
		if ( this.callStackDepth > this.maxStackDepth ) {
			this.maxStackDepth = this.callStackDepth;
		}

		if ( !func ) {
			this.Error( "NULL function" );
		}

		if ( this.debug ) {
			if ( this.currentFunction ) {
				gameLocal.Printf( "%d: call '%s' from '%s'(line %d)%s\n", gameLocal.time, func.Name ( ), this.currentFunction.Name ( ),
					gameLocal.program.GetStatement( this.instructionPointer ).linenumber, clearStack ? " clear stack" : "" );
			} else {
				gameLocal.Printf( "%d: call '%s'%s\n", gameLocal.time, func.Name ( ), clearStack ? " clear stack" : "" );
			}
		}

		this.currentFunction = func;
		assert( !func.eventdef );
		this.NextInstruction( func.firstStatement );

		// allocate space on the stack for locals
		// parms are already on stack
		c = func.locals - func.parmTotal;
		assert( c >= 0 );

		if ( this.localstackUsed + c > LOCALSTACK_SIZE ) {
			this.Error( "EnterFuncton: locals stack overflow\n" );
		}

		// initialize local stack variables to zero
		memset( this.localstack.subarray( this.localstackUsed ), 0, c );

		this.localstackUsed += c;
		this.localstackBase = this.localstackUsed - func.locals;

		if ( this.localstackUsed > this.maxLocalstackUsed ) {
			this.maxLocalstackUsed = this.localstackUsed;
		}
	}

/*
====================
idInterpreter::LeaveFunction
====================
*/
	LeaveFunction ( returnDef: idVarDef ): void {
		var stack: prstack_t;
		var ret = new varEval_t;

		if ( this.callStackDepth <= 0 ) {
			this.Error( "prog stack underflow" );
		}

		// return value
		if ( returnDef ) {
			switch ( returnDef.Type ( ) ) {
			case etype_t.ev_string:
				gameLocal.program.ReturnString( this.GetString( returnDef ) );
				break;

			case etype_t.ev_vector:
				ret = this.GetVariable( returnDef );
				gameLocal.program.ReturnVector( /* * */ret.vectorPtr );
				break;

			default:
				ret = this.GetVariable( returnDef );
				gameLocal.program.ReturnInteger( /* * */ret.intPtr );
			}
		}

		// remove locals from the stack
		this.PopParms( this.currentFunction.locals );
		assert( this.localstackUsed == this.localstackBase );

		if ( this.debug ) {
			var line = gameLocal.program.GetStatement( this.instructionPointer );
			gameLocal.Printf( "%d: %s(%d): exit %s", gameLocal.time, gameLocal.program.GetFilename( line.file ), line.linenumber, this.currentFunction.Name ( ) );
			if ( this.callStackDepth > 1 ) {
				gameLocal.Printf( " return to %s(line %d)\n", this.callStack[this.callStackDepth - 1].f.Name ( ), gameLocal.program.GetStatement( this.callStack[this.callStackDepth - 1].s ).linenumber );
			} else {
				gameLocal.Printf( " done\n" );
			}
		}

		// up stack
		this.callStackDepth--;
		stack = this.callStack[this.callStackDepth];
		this.currentFunction = stack.f;
		this.localstackBase = stack.stackbase;
		this.NextInstruction( stack.s );

		if ( !this.callStackDepth ) {
			// all done
			this.doneProcessing = true;
			this.threadDying = true;
			this.currentFunction = null;
		}
	}

///*
//================
//idInterpreter::CallEvent
//================
//*/
//void idInterpreter::CallEvent( const function_t *func, int argsize ) {
//	var i:number /*int*/;
//	int					j;
//	varEval_t			var;
//	int 				pos;
//	int 				start;
//	int					data[ D_EVENT_MAXARGS ];
//	const idEventDef	*evdef;
//	const char			*format;
//
//	if ( !func ) {
//		this.Error( "NULL function" );
//	}
//
//	assert( func.eventdef );
//	evdef = func.eventdef;
//
//	start = this.localstackUsed - argsize;
//	var.intPtr = ( int * )&this.localstack[ start ];
//	eventEntity = GetEntity( *var.entityNumberPtr );
//
//	if ( !eventEntity || !eventEntity.RespondsTo( *evdef ) ) {
//		if ( eventEntity && developer.GetBool() ) {
//			// give a warning in developer mode
//			Warning( "Function '%s' not supported on entity '%s'", evdef.GetName(), eventEntity.name.c_str() );
//		}
//		// always return a safe value when an object doesn't exist
//		switch( evdef.GetReturnType() ) {
//		case D_EVENT_INTEGER :
//			gameLocal.program.ReturnInteger( 0 );
//			break;
//
//		case D_EVENT_FLOAT :
//			gameLocal.program.ReturnFloat( 0 );
//			break;
//
//		case D_EVENT_VECTOR :
//			gameLocal.program.ReturnVector( vec3_zero );
//			break;
//
//		case D_EVENT_STRING :
//			gameLocal.program.ReturnString( "" );
//			break;
//
//		case D_EVENT_ENTITY :
//		case D_EVENT_ENTITY_NULL :
//			gameLocal.program.ReturnEntity( ( idEntity * )NULL );
//			break;
//
//		case D_EVENT_TRACE :
//		default:
//			// unsupported data type
//			break;
//		}
//
//		this.PopParms( argsize );
//		eventEntity = NULL;
//		return;
//	}
//
//	format = evdef.GetArgFormat();
//	for( j = 0, i = 0, pos = type_object.Size(); ( pos < argsize ) || ( format[ i ] != 0 ); i++ ) {
//		switch( format[ i ] ) {
//		case D_EVENT_INTEGER :
//			var.intPtr = ( int * )&this.localstack[ start + pos ];
//			data[ i ] = int( *var.floatPtr );
//			break;
//
//		case D_EVENT_FLOAT :
//			var.intPtr = ( int * )&this.localstack[ start + pos ];
//			( *( float * )&data[ i ] ) = *var.floatPtr;
//			break;
//
//		case D_EVENT_VECTOR :
//			var.intPtr = ( int * )&this.localstack[ start + pos ];
//			( *( idVec3 ** )&data[ i ] ) = var.vectorPtr;
//			break;
//
//		case D_EVENT_STRING :
//			( *( const char ** )&data[ i ] ) = ( char * )&this.localstack[ start + pos ];
//			break;
//
//		case D_EVENT_ENTITY :
//			var.intPtr = ( int * )&this.localstack[ start + pos ];
//			( *( idEntity ** )&data[ i ] ) = GetEntity( *var.entityNumberPtr );
//			if ( !( *( idEntity ** )&data[ i ] ) ) {
//				Warning( "Entity not found for event '%s'. Terminating thread.", evdef.GetName() );
//				this.threadDying = true;
//				this.PopParms( argsize );
//				return;
//			}
//			break;
//
//		case D_EVENT_ENTITY_NULL :
//			var.intPtr = ( int * )&this.localstack[ start + pos ];
//			( *( idEntity ** )&data[ i ] ) = GetEntity( *var.entityNumberPtr );
//			break;
//
//		case D_EVENT_TRACE :
//			this.Error( "trace type not supported from script for '%s' event.", evdef.GetName() );
//			break;
//
//		default :
//			this.Error( "Invalid arg format string for '%s' event.", evdef.GetName() );
//			break;
//		}
//
//		pos += func.parmSize[ j++ ];
//	}
//
//	this.popParms = argsize;
//	eventEntity.ProcessEventArgPtr( evdef, data );
//
//	if ( !this.multiFrameEvent ) {
//		if ( this.popParms ) {
//			this.PopParms( this.popParms );
//		}
//		eventEntity = NULL;
//	} else {
//		this.doneProcessing = true;
//	}
//	this.popParms = 0;
//}
//
///*
//================
//idInterpreter::BeginMultiFrameEvent
//================
//*/
//bool idInterpreter::BeginMultiFrameEvent( ent:idEntity, const idEventDef *event ) { 
//	if ( eventEntity != ent ) {
//		this.Error( "idInterpreter::BeginMultiFrameEvent called with wrong entity" );
//	}
//	if ( this.multiFrameEvent ) {
//		if ( this.multiFrameEvent != event ) {
//			this.Error( "idInterpreter::BeginMultiFrameEvent called with wrong event" );
//		}
//		return false;
//	}
//
//	this.multiFrameEvent = event;
//	return true;
//}
//
///*
//================
//idInterpreter::EndMultiFrameEvent
//================
//*/
//void idInterpreter::EndMultiFrameEvent( ent:idEntity, const idEventDef *event ) {
//	if ( this.multiFrameEvent != event ) {
//		this.Error( "idInterpreter::EndMultiFrameEvent called with wrong event" );
//	}
//
//	this.multiFrameEvent = NULL;
//}
//
/*
================
idInterpreter::MultiFrameEventInProgress
================
*/
	MultiFrameEventInProgress ( ): boolean {
		return this.multiFrameEvent != null;
	}

/*
================
idInterpreter::CallSysEvent
================
*/
	CallSysEvent ( func: function_t, /*int */argsize: number ): void {
		var i: number /*int*/;
		var /*int*/ j: number /*int*/;
		var source = new varEval_t;
		var pos: number /*int*/;
		var start: number /*int*/;
		var data = new Int32Array( D_EVENT_MAXARGS );
		var evdef: idEventDef;
		var format: string;

		if ( !func ) {
			this.Error( "NULL function" );
		}

		assert( func.eventdef );
		evdef = func.eventdef;

		start = this.localstackUsed - argsize;
		
		format = evdef.GetArgFormat ( );
		for ( j = 0, i = 0, pos = 0; ( pos < argsize ) || ( format[i] /*!= 0*/ ); i++ ) {
			switch ( format[i] ) {
				//case D_EVENT_INTEGER :
				//	source.intPtr = ( int * )&this.localstack[ start + pos ];
				//	*( int * )&data[ i ] = int( *source.floatPtr );
				//	break;

				//case D_EVENT_FLOAT :
				//	source.intPtr = ( int * )&this.localstack[ start + pos ];
				//	*( float * )&data[ i ] = *source.floatPtr;
				//	break;

				//case D_EVENT_VECTOR :
				//	source.intPtr = ( int * )&this.localstack[ start + pos ];
				//	*( idVec3 ** )&data[ i ] = source.vectorPtr;
				//	break;

				case D_EVENT_STRING :
					//*( const char ** )&data[i] = ( char *) & localstack[start + pos];
					//*( const char ** )&data[i] = this.localstack.subarray(start + pos).toString(); //( char * )&this.localstack[ start + pos ];
					todo( "?" );
					data[i] = start + pos;
					break;

				//case D_EVENT_ENTITY :
				//	source.intPtr = ( int * )&this.localstack[ start + pos ];
				//	*( idEntity ** )&data[ i ] = GetEntity( *source.entityNumberPtr );
				//	if ( !*( idEntity ** )&data[ i ] ) {
				//		Warning( "Entity not found for event '%s'. Terminating thread.", evdef.GetName() );
				//		this.threadDying = true;
				//		this.PopParms( argsize );
				//		return;
				//	}
				//	break;

				//case D_EVENT_ENTITY_NULL :
				//	source.intPtr = ( int * )&this.localstack[ start + pos ];
				//	*( idEntity ** )&data[ i ] = GetEntity( *source.entityNumberPtr );
				//	break;

				//case D_EVENT_TRACE :
				//	this.Error( "trace type not supported from script for '%s' event.", evdef.GetName() );
				//break;
			default:
				debugger;
				this.Error( "Invalid arg format string for '%s' event.", evdef.GetName ( ) );
				break;
			}

			pos += func.parmSize[j++];
		}

		this.popParms = argsize;
		this.thread.ProcessEventArgPtr( evdef, data );
		if ( this.popParms ) {
			this.PopParms( this.popParms );
		}
		this.popParms = 0;
	}
//
/*
====================
idInterpreter::Execute
====================
*/
	Execute(): boolean {
		dlog( DEBUG_SCRIPT, "idInterpreter::Execute" );
		var var_a = new varEval_t;
		var var_b = new varEval_t;
		var var_c = new varEval_t;
		var $var = new varEval_t;
		var st: statement_t;
		var runaway: number /*int*/;
		var newThread: idThread;
		var /*float*/floatVal: number;
		var obj: idScriptObject;
		var func: function_t;

		if ( this.threadDying || !this.currentFunction ) {
			return true;
		}

		if ( this.multiFrameEvent ) {
			// move to previous instruction and call it again
			this.instructionPointer--;
		}

		runaway = 5000000;

		this.doneProcessing = false;
		while ( !this.doneProcessing && !this.threadDying ) {
			this.instructionPointer++;

			if ( !--runaway ) {
				this.Error( "runaway loop error" );
			}

			// next statement
			st = gameLocal.program.GetStatement( this.instructionPointer );

			dlog( DEBUG_SCRIPT, "idInterpreter::Execute while op: %i\n", st.op );
			switch ( st.op ) {
		case opc.OP_RETURN:
			this.LeaveFunction( st.a );
			break;
//
//		case opc.OP_THREAD:
//			newThread = new idThread( this, st.a.value.functionPtr, st.b.value.argSize );
//			newThread.Start();
//
//			// return the thread number to the script
//			gameLocal.program.ReturnFloat( newThread.GetThreadNum() );
//			this.PopParms( st.b.value.argSize );
//			break;
//
//		case opc.OP_OBJTHREAD:
//			var_a = this.GetVariable( st.a );
//			obj = GetScriptObject( *var_a.entityNumberPtr );
//			if ( obj ) {
//				func = obj.GetTypeDef().GetFunction( st.b.value.virtualFunction );
//				assert( st.c.value.argSize == func.parmTotal );
//				newThread = new idThread( this, GetEntity( *var_a.entityNumberPtr ), func, func.parmTotal );
//				newThread.Start();
//
//				// return the thread number to the script
//				gameLocal.program.ReturnFloat( newThread.GetThreadNum() );
//			} else {
//				// return a null thread to the script
//				gameLocal.program.ReturnFloat( 0.0 );
//			}
//			this.PopParms( st.c.value.argSize );
//			break;
//
//		case opc.OP_CALL:
//			this.EnterFunction( st.a.value.functionPtr, false );
//			break;
//
//		case opc.OP_EVENTCALL:
//			CallEvent( st.a.value.functionPtr, st.b.value.argSize );
//			break;
//
//		case opc.OP_OBJECTCALL:	
//			var_a = this.GetVariable( st.a );
//			obj = GetScriptObject( *var_a.entityNumberPtr );
//			if ( obj ) {
//				func = obj.GetTypeDef().GetFunction( st.b.value.virtualFunction );
//				this.EnterFunction( func, false );
//			} else {
//				// return a 'safe' value
//				gameLocal.program.ReturnVector( vec3_zero );
//				gameLocal.program.ReturnString( "" );
//				this.PopParms( st.c.value.argSize );
//			}
//			break;

		case opc.OP_SYSCALL:
			this.CallSysEvent( st.a.value.functionPtr, st.b.value.argSize );
			break;
//
//		case opc.OP_IFNOT:
//			var_a = this.GetVariable( st.a );
//			if ( *var_a.intPtr == 0 ) {
//				this.NextInstruction( this.instructionPointer + st.b.value.jumpOffset );
//			}
//			break;
//
//		case opc.OP_IF:
//			var_a = this.GetVariable( st.a );
//			if ( *var_a.intPtr != 0 ) {
//				this.NextInstruction( this.instructionPointer + st.b.value.jumpOffset );
//			}
//			break;
//
//		case opc.OP_GOTO:
//			this.NextInstruction( this.instructionPointer + st.a.value.jumpOffset );
//			break;
//
//		case opc.OP_ADD_F:
//			var_a = this.GetVariable( st.a );
//			var_b = this.GetVariable( st.b );
//			var_c = this.GetVariable( st.c );
//			*var_c.floatPtr = *var_a.floatPtr + *var_b.floatPtr;
//			break;
//
//		case opc.OP_ADD_V:
//			var_a = this.GetVariable( st.a );
//			var_b = this.GetVariable( st.b );
//			var_c = this.GetVariable( st.c );
//			*var_c.vectorPtr = *var_a.vectorPtr + *var_b.vectorPtr;
//			break;
//
//		case opc.OP_ADD_S:
//			SetString( st.c, this.GetString( st.a ) );
//			AppendString( st.c, this.GetString( st.b ) );
//			break;
//
//		case opc.OP_ADD_FS:
//			var_a = this.GetVariable( st.a );
//			SetString( st.c, FloatToString( *var_a.floatPtr ) );
//			AppendString( st.c, this.GetString( st.b ) );
//			break;
//
//		case opc.OP_ADD_SF:
//			var_b = this.GetVariable( st.b );
//			SetString( st.c, this.GetString( st.a ) );
//			AppendString( st.c, FloatToString( *var_b.floatPtr ) );
//			break;
//
//		case opc.OP_ADD_VS:
//			var_a = this.GetVariable( st.a );
//			SetString( st.c, var_a.vectorPtr.ToString() );
//			AppendString( st.c, this.GetString( st.b ) );
//			break;
//
//		case opc.OP_ADD_SV:
//			var_b = this.GetVariable( st.b );
//			SetString( st.c, this.GetString( st.a ) );
//			AppendString( st.c, var_b.vectorPtr.ToString() );
//			break;
//
//		case opc.OP_SUB_F:
//			var_a = this.GetVariable( st.a );
//			var_b = this.GetVariable( st.b );
//			var_c = this.GetVariable( st.c );
//			*var_c.floatPtr = *var_a.floatPtr - *var_b.floatPtr;
//			break;
//
//		case opc.OP_SUB_V:
//			var_a = this.GetVariable( st.a );
//			var_b = this.GetVariable( st.b );
//			var_c = this.GetVariable( st.c );
//			*var_c.vectorPtr = *var_a.vectorPtr - *var_b.vectorPtr;
//			break;
//
//		case opc.OP_MUL_F:
//			var_a = this.GetVariable( st.a );
//			var_b = this.GetVariable( st.b );
//			var_c = this.GetVariable( st.c );
//			*var_c.floatPtr = *var_a.floatPtr * *var_b.floatPtr;
//			break;
//
//		case opc.OP_MUL_V:
//			var_a = this.GetVariable( st.a );
//			var_b = this.GetVariable( st.b );
//			var_c = this.GetVariable( st.c );
//			*var_c.floatPtr = *var_a.vectorPtr * *var_b.vectorPtr;
//			break;
//
//		case opc.OP_MUL_FV:
//			var_a = this.GetVariable( st.a );
//			var_b = this.GetVariable( st.b );
//			var_c = this.GetVariable( st.c );
//			*var_c.vectorPtr = *var_a.floatPtr * *var_b.vectorPtr;
//			break;
//
//		case opc.OP_MUL_VF:
//			var_a = this.GetVariable( st.a );
//			var_b = this.GetVariable( st.b );
//			var_c = this.GetVariable( st.c );
//			*var_c.vectorPtr = *var_a.vectorPtr * *var_b.floatPtr;
//			break;
//
//		case opc.OP_DIV_F:
//			var_a = this.GetVariable( st.a );
//			var_b = this.GetVariable( st.b );
//			var_c = this.GetVariable( st.c );
//
//			if ( *var_b.floatPtr == 0.0 ) {
//				Warning( "Divide by zero" );
//				*var_c.floatPtr = idMath::INFINITY;
//			} else {
//				*var_c.floatPtr = *var_a.floatPtr / *var_b.floatPtr;
//			}
//			break;
//
//		case opc.OP_MOD_F:
//			var_a = this.GetVariable( st.a );
//			var_b = this.GetVariable( st.b );
//			var_c = this.GetVariable ( st.c );
//
//			if ( *var_b.floatPtr == 0.0 ) {
//				Warning( "Divide by zero" );
//				*var_c.floatPtr = *var_a.floatPtr;
//			} else {
//				*var_c.floatPtr = static_cast<int>( *var_a.floatPtr ) % static_cast<int>( *var_b.floatPtr );
//			}
//			break;
//
//		case opc.OP_BITAND:
//			var_a = this.GetVariable( st.a );
//			var_b = this.GetVariable( st.b );
//			var_c = this.GetVariable( st.c );
//			*var_c.floatPtr = static_cast<int>( *var_a.floatPtr ) & static_cast<int>( *var_b.floatPtr );
//			break;
//
//		case opc.OP_BITOR:
//			var_a = this.GetVariable( st.a );
//			var_b = this.GetVariable( st.b );
//			var_c = this.GetVariable( st.c );
//			*var_c.floatPtr = static_cast<int>( *var_a.floatPtr ) | static_cast<int>( *var_b.floatPtr );
//			break;
//
//		case opc.OP_GE:
//			var_a = this.GetVariable( st.a );
//			var_b = this.GetVariable( st.b );
//			var_c = this.GetVariable( st.c );
//			*var_c.floatPtr = ( *var_a.floatPtr >= *var_b.floatPtr );
//			break;
//
//		case opc.OP_LE:
//			var_a = this.GetVariable( st.a );
//			var_b = this.GetVariable( st.b );
//			var_c = this.GetVariable( st.c );
//			*var_c.floatPtr = ( *var_a.floatPtr <= *var_b.floatPtr );
//			break;
//
//		case opc.OP_GT:
//			var_a = this.GetVariable( st.a );
//			var_b = this.GetVariable( st.b );
//			var_c = this.GetVariable( st.c );
//			*var_c.floatPtr = ( *var_a.floatPtr > *var_b.floatPtr );
//			break;
//
//		case opc.OP_LT:
//			var_a = this.GetVariable( st.a );
//			var_b = this.GetVariable( st.b );
//			var_c = this.GetVariable( st.c );
//			*var_c.floatPtr = ( *var_a.floatPtr < *var_b.floatPtr );
//			break;
//
//		case opc.OP_AND:
//			var_a = this.GetVariable( st.a );
//			var_b = this.GetVariable( st.b );
//			var_c = this.GetVariable( st.c );
//			*var_c.floatPtr = ( *var_a.floatPtr != 0.0 ) && ( *var_b.floatPtr != 0.0 );
//			break;
//
//		case opc.OP_AND_BOOLF:
//			var_a = this.GetVariable( st.a );
//			var_b = this.GetVariable( st.b );
//			var_c = this.GetVariable( st.c );
//			*var_c.floatPtr = ( *var_a.intPtr != 0 ) && ( *var_b.floatPtr != 0.0 );
//			break;
//
//		case opc.OP_AND_FBOOL:
//			var_a = this.GetVariable( st.a );
//			var_b = this.GetVariable( st.b );
//			var_c = this.GetVariable( st.c );
//			*var_c.floatPtr = ( *var_a.floatPtr != 0.0 ) && ( *var_b.intPtr != 0 );
//			break;
//
//		case opc.OP_AND_BOOLBOOL:
//			var_a = this.GetVariable( st.a );
//			var_b = this.GetVariable( st.b );
//			var_c = this.GetVariable( st.c );
//			*var_c.floatPtr = ( *var_a.intPtr != 0 ) && ( *var_b.intPtr != 0 );
//			break;
//
//		case opc.OP_OR:	
//			var_a = this.GetVariable( st.a );
//			var_b = this.GetVariable( st.b );
//			var_c = this.GetVariable( st.c );
//			*var_c.floatPtr = ( *var_a.floatPtr != 0.0 ) || ( *var_b.floatPtr != 0.0 );
//			break;
//
//		case opc.OP_OR_BOOLF:
//			var_a = this.GetVariable( st.a );
//			var_b = this.GetVariable( st.b );
//			var_c = this.GetVariable( st.c );
//			*var_c.floatPtr = ( *var_a.intPtr != 0 ) || ( *var_b.floatPtr != 0.0 );
//			break;
//
//		case opc.OP_OR_FBOOL:
//			var_a = this.GetVariable( st.a );
//			var_b = this.GetVariable( st.b );
//			var_c = this.GetVariable( st.c );
//			*var_c.floatPtr = ( *var_a.floatPtr != 0.0 ) || ( *var_b.intPtr != 0 );
//			break;
//			
//		case opc.OP_OR_BOOLBOOL:
//			var_a = this.GetVariable( st.a );
//			var_b = this.GetVariable( st.b );
//			var_c = this.GetVariable( st.c );
//			*var_c.floatPtr = ( *var_a.intPtr != 0 ) || ( *var_b.intPtr != 0 );
//			break;
//			
//		case opc.OP_NOT_BOOL:
//			var_a = this.GetVariable( st.a );
//			var_c = this.GetVariable( st.c );
//			*var_c.floatPtr = ( *var_a.intPtr == 0 );
//			break;
//
//		case opc.OP_NOT_F:
//			var_a = this.GetVariable( st.a );
//			var_c = this.GetVariable( st.c );
//			*var_c.floatPtr = ( *var_a.floatPtr == 0.0 );
//			break;
//
//		case opc.OP_NOT_V:
//			var_a = this.GetVariable( st.a );
//			var_c = this.GetVariable( st.c );
//			*var_c.floatPtr = ( *var_a.vectorPtr == vec3_zero );
//			break;
//
//		case opc.OP_NOT_S:
//			var_c = this.GetVariable( st.c );
//			*var_c.floatPtr = ( strlen( this.GetString( st.a ) ) == 0 );
//			break;
//
//		case opc.OP_NOT_ENT:
//			var_a = this.GetVariable( st.a );
//			var_c = this.GetVariable( st.c );
//			*var_c.floatPtr = ( GetEntity( *var_a.entityNumberPtr ) == NULL );
//			break;
//
//		case opc.OP_NEG_F:
//			var_a = this.GetVariable( st.a );
//			var_c = this.GetVariable( st.c );
//			*var_c.floatPtr = -*var_a.floatPtr;
//			break;
//
//		case opc.OP_NEG_V:
//			var_a = this.GetVariable( st.a );
//			var_c = this.GetVariable( st.c );
//			*var_c.vectorPtr = -*var_a.vectorPtr;
//			break;
//
//		case opc.OP_INT_F:
//			var_a = this.GetVariable( st.a );
//			var_c = this.GetVariable( st.c );
//			*var_c.floatPtr = static_cast<int>( *var_a.floatPtr );
//			break;
//
//		case opc.OP_EQ_F:
//			var_a = this.GetVariable( st.a );
//			var_b = this.GetVariable( st.b );
//			var_c = this.GetVariable( st.c );
//			*var_c.floatPtr = ( *var_a.floatPtr == *var_b.floatPtr );
//			break;
//
//		case opc.OP_EQ_V:
//			var_a = this.GetVariable( st.a );
//			var_b = this.GetVariable( st.b );
//			var_c = this.GetVariable( st.c );
//			*var_c.floatPtr = ( *var_a.vectorPtr == *var_b.vectorPtr );
//			break;
//
//		case opc.OP_EQ_S:
//			var_a = this.GetVariable( st.a );
//			var_b = this.GetVariable( st.b );
//			var_c = this.GetVariable( st.c );
//			*var_c.floatPtr = ( idStr.Cmp( this.GetString( st.a ), this.GetString( st.b ) ) == 0 );
//			break;
//
//		case opc.OP_EQ_E:
//		case opc.OP_EQ_EO:
//		case opc.OP_EQ_OE:
//		case opc.OP_EQ_OO:
//			var_a = this.GetVariable( st.a );
//			var_b = this.GetVariable( st.b );
//			var_c = this.GetVariable( st.c );
//			*var_c.floatPtr = ( *var_a.entityNumberPtr == *var_b.entityNumberPtr );
//			break;
//
//		case opc.OP_NE_F:
//			var_a = this.GetVariable( st.a );
//			var_b = this.GetVariable( st.b );
//			var_c = this.GetVariable( st.c );
//			*var_c.floatPtr = ( *var_a.floatPtr != *var_b.floatPtr );
//			break;
//
//		case opc.OP_NE_V:
//			var_a = this.GetVariable( st.a );
//			var_b = this.GetVariable( st.b );
//			var_c = this.GetVariable( st.c );
//			*var_c.floatPtr = ( *var_a.vectorPtr != *var_b.vectorPtr );
//			break;
//
//		case opc.OP_NE_S:
//			var_c = this.GetVariable( st.c );
//			*var_c.floatPtr = ( idStr.Cmp( this.GetString( st.a ), this.GetString( st.b ) ) != 0 );
//			break;
//
//		case opc.OP_NE_E:
//		case opc.OP_NE_EO:
//		case opc.OP_NE_OE:
//		case opc.OP_NE_OO:
//			var_a = this.GetVariable( st.a );
//			var_b = this.GetVariable( st.b );
//			var_c = this.GetVariable( st.c );
//			*var_c.floatPtr = ( *var_a.entityNumberPtr != *var_b.entityNumberPtr );
//			break;
//
//		case opc.OP_UADD_F:
//			var_a = this.GetVariable( st.a );
//			var_b = this.GetVariable( st.b );
//			*var_b.floatPtr += *var_a.floatPtr;
//			break;
//
//		case opc.OP_UADD_V:
//			var_a = this.GetVariable( st.a );
//			var_b = this.GetVariable( st.b );
//			*var_b.vectorPtr += *var_a.vectorPtr;
//			break;
//
//		case opc.OP_USUB_F:
//			var_a = this.GetVariable( st.a );
//			var_b = this.GetVariable( st.b );
//			*var_b.floatPtr -= *var_a.floatPtr;
//			break;
//
//		case opc.OP_USUB_V:
//			var_a = this.GetVariable( st.a );
//			var_b = this.GetVariable( st.b );
//			*var_b.vectorPtr -= *var_a.vectorPtr;
//			break;
//
//		case opc.OP_UMUL_F:
//			var_a = this.GetVariable( st.a );
//			var_b = this.GetVariable( st.b );
//			*var_b.floatPtr *= *var_a.floatPtr;
//			break;
//
//		case opc.OP_UMUL_V:
//			var_a = this.GetVariable( st.a );
//			var_b = this.GetVariable( st.b );
//			*var_b.vectorPtr *= *var_a.floatPtr;
//			break;
//
//		case opc.OP_UDIV_F:
//			var_a = this.GetVariable( st.a );
//			var_b = this.GetVariable( st.b );
//
//			if ( *var_a.floatPtr == 0.0 ) {
//				Warning( "Divide by zero" );
//				*var_b.floatPtr = idMath::INFINITY;
//			} else {
//				*var_b.floatPtr = *var_b.floatPtr / *var_a.floatPtr;
//			}
//			break;
//
//		case opc.OP_UDIV_V:
//			var_a = this.GetVariable( st.a );
//			var_b = this.GetVariable( st.b );
//
//			if ( *var_a.floatPtr == 0.0 ) {
//				Warning( "Divide by zero" );
//				var_b.vectorPtr.Set( idMath::INFINITY, idMath::INFINITY, idMath::INFINITY );
//			} else {
//				*var_b.vectorPtr = *var_b.vectorPtr / *var_a.floatPtr;
//			}
//			break;
//
//		case opc.OP_UMOD_F:
//			var_a = this.GetVariable( st.a );
//			var_b = this.GetVariable( st.b );
//
//			if ( *var_a.floatPtr == 0.0 ) {
//				Warning( "Divide by zero" );
//				*var_b.floatPtr = *var_a.floatPtr;
//			} else {
//				*var_b.floatPtr = static_cast<int>( *var_b.floatPtr ) % static_cast<int>( *var_a.floatPtr );
//			}
//			break;
//
//		case opc.OP_UOR_F:
//			var_a = this.GetVariable( st.a );
//			var_b = this.GetVariable( st.b );
//			*var_b.floatPtr = static_cast<int>( *var_b.floatPtr ) | static_cast<int>( *var_a.floatPtr );
//			break;
//
//		case opc.OP_UAND_F:
//			var_a = this.GetVariable( st.a );
//			var_b = this.GetVariable( st.b );
//			*var_b.floatPtr = static_cast<int>( *var_b.floatPtr ) & static_cast<int>( *var_a.floatPtr );
//			break;
//
//		case opc.OP_UINC_F:
//			var_a = this.GetVariable( st.a );
//			( *var_a.floatPtr )++;
//			break;
//
//		case opc.OP_UINCP_F:
//			var_a = this.GetVariable( st.a );
//			obj = GetScriptObject( *var_a.entityNumberPtr );
//			if ( obj ) {
//				$var.bytePtr = &obj.data[ st.b.value.ptrOffset ];
//				( *$var.floatPtr )++;
//			}
//			break;
//
//		case opc.OP_UDEC_F:
//			var_a = this.GetVariable( st.a );
//			( *var_a.floatPtr )--;
//			break;
//
//		case opc.OP_UDECP_F:
//			var_a = this.GetVariable( st.a );
//			obj = GetScriptObject( *var_a.entityNumberPtr );
//			if ( obj ) {
//				$var.bytePtr = &obj.data[ st.b.value.ptrOffset ];
//				( *$var.floatPtr )--;
//			}
//			break;
//
//		case opc.OP_COMP_F:
//			var_a = this.GetVariable( st.a );
//			var_c = this.GetVariable( st.c );
//			*var_c.floatPtr = ~static_cast<int>( *var_a.floatPtr );
//			break;
//
//		case opc.OP_STORE_F:
//			var_a = this.GetVariable( st.a );
//			var_b = this.GetVariable( st.b );
//			*var_b.floatPtr = *var_a.floatPtr;
//			break;
//
//		case opc.OP_STORE_ENT:
//			var_a = this.GetVariable( st.a );
//			var_b = this.GetVariable( st.b );
//			*var_b.entityNumberPtr = *var_a.entityNumberPtr;
//			break;
//
//		case opc.OP_STORE_BOOL:	
//			var_a = this.GetVariable( st.a );
//			var_b = this.GetVariable( st.b );
//			*var_b.intPtr = *var_a.intPtr;
//			break;
//
//		case opc.OP_STORE_OBJENT:
//			var_a = this.GetVariable( st.a );
//			var_b = this.GetVariable( st.b );
//			obj = GetScriptObject( *var_a.entityNumberPtr );
//			if ( !obj ) {
//				*var_b.entityNumberPtr = 0;
//			} else if ( !obj.GetTypeDef().Inherits( st.b.TypeDef() ) ) {
//				//Warning( "object '%s' cannot be converted to '%s'", obj.GetTypeName(), st.b.TypeDef().Name() );
//				*var_b.entityNumberPtr = 0;
//			} else {
//				*var_b.entityNumberPtr = *var_a.entityNumberPtr;
//			}
//			break;
//
//		case opc.OP_STORE_OBJ:
//		case opc.OP_STORE_ENTOBJ:
//			var_a = this.GetVariable( st.a );
//			var_b = this.GetVariable( st.b );
//			*var_b.entityNumberPtr = *var_a.entityNumberPtr;
//			break;
//
//		case opc.OP_STORE_S:
//			SetString( st.b, this.GetString( st.a ) );
//			break;
//
//		case opc.OP_STORE_V:
//			var_a = this.GetVariable( st.a );
//			var_b = this.GetVariable( st.b );
//			*var_b.vectorPtr = *var_a.vectorPtr;
//			break;
//
//		case opc.OP_STORE_FTOS:
//			var_a = this.GetVariable( st.a );
//			SetString( st.b, FloatToString( *var_a.floatPtr ) );
//			break;
//
//		case opc.OP_STORE_BTOS:
//			var_a = this.GetVariable( st.a );
//			SetString( st.b, *var_a.intPtr ? "true" : "false" );
//			break;
//
//		case opc.OP_STORE_VTOS:
//			var_a = this.GetVariable( st.a );
//			SetString( st.b, var_a.vectorPtr.ToString() );
//			break;
//
//		case opc.OP_STORE_FTOBOOL:
//			var_a = this.GetVariable( st.a );
//			var_b = this.GetVariable( st.b );
//			if ( *var_a.floatPtr != 0.0 ) {
//				*var_b.intPtr = 1;
//			} else {
//				*var_b.intPtr = 0;
//			}
//			break;
//
//		case opc.OP_STORE_BOOLTOF:
//			var_a = this.GetVariable( st.a );
//			var_b = this.GetVariable( st.b );
//			*var_b.floatPtr = static_cast<float>( *var_a.intPtr );
//			break;
//
//		case opc.OP_STOREP_F:
//			var_b = this.GetVariable( st.b );
//			if ( var_b.evalPtr && var_b.evalPtr.floatPtr ) {
//				var_a = this.GetVariable( st.a );
//				*var_b.evalPtr.floatPtr = *var_a.floatPtr;
//			}
//			break;
//
//		case opc.OP_STOREP_ENT:
//			var_b = this.GetVariable( st.b );
//			if ( var_b.evalPtr && var_b.evalPtr.entityNumberPtr ) {
//				var_a = this.GetVariable( st.a );
//				*var_b.evalPtr.entityNumberPtr = *var_a.entityNumberPtr;
//			}
//			break;
//
//		case opc.OP_STOREP_FLD:
//			var_b = this.GetVariable( st.b );
//			if ( var_b.evalPtr && var_b.evalPtr.intPtr ) {
//				var_a = this.GetVariable( st.a );
//				*var_b.evalPtr.intPtr = *var_a.intPtr;
//			}
//			break;
//
//		case opc.OP_STOREP_BOOL:
//			var_b = this.GetVariable( st.b );
//			if ( var_b.evalPtr && var_b.evalPtr.intPtr ) {
//				var_a = this.GetVariable( st.a );
//				*var_b.evalPtr.intPtr = *var_a.intPtr;
//			}
//			break;
//
//		case opc.OP_STOREP_S:
//			var_b = this.GetVariable( st.b );
//			if ( var_b.evalPtr && var_b.evalPtr.stringPtr ) {
//				idStr.Copynz( var_b.evalPtr.stringPtr, this.GetString( st.a ), MAX_STRING_LEN );
//			}
//			break;
//
//		case opc.OP_STOREP_V:
//			var_b = this.GetVariable( st.b );
//			if ( var_b.evalPtr && var_b.evalPtr.vectorPtr ) {
//				var_a = this.GetVariable( st.a );
//				*var_b.evalPtr.vectorPtr = *var_a.vectorPtr;
//			}
//			break;
//		
//		case opc.OP_STOREP_FTOS:
//			var_b = this.GetVariable( st.b );
//			if ( var_b.evalPtr && var_b.evalPtr.stringPtr ) {
//				var_a = this.GetVariable( st.a );
//				idStr.Copynz( var_b.evalPtr.stringPtr, FloatToString( *var_a.floatPtr ), MAX_STRING_LEN );
//			}
//			break;
//
//		case opc.OP_STOREP_BTOS:
//			var_b = this.GetVariable( st.b );
//			if ( var_b.evalPtr && var_b.evalPtr.stringPtr ) {
//				var_a = this.GetVariable( st.a );
//				if ( *var_a.floatPtr != 0.0 ) {
//					idStr.Copynz( var_b.evalPtr.stringPtr, "true", MAX_STRING_LEN );
//				} else {
//					idStr.Copynz( var_b.evalPtr.stringPtr, "false", MAX_STRING_LEN );
//				}
//			}
//			break;
//
//		case opc.OP_STOREP_VTOS:
//			var_b = this.GetVariable( st.b );
//			if ( var_b.evalPtr && var_b.evalPtr.stringPtr ) {
//				var_a = this.GetVariable( st.a );
//				idStr.Copynz( var_b.evalPtr.stringPtr, var_a.vectorPtr.ToString(), MAX_STRING_LEN );
//			}
//			break;
//
//		case opc.OP_STOREP_FTOBOOL:
//			var_b = this.GetVariable( st.b );
//			if ( var_b.evalPtr && var_b.evalPtr.intPtr ) {
//				var_a = this.GetVariable( st.a );
//				if ( *var_a.floatPtr != 0.0 ) {
//					*var_b.evalPtr.intPtr = 1;
//				} else {
//					*var_b.evalPtr.intPtr = 0;
//				}
//			}
//			break;
//
//		case opc.OP_STOREP_BOOLTOF:
//			var_b = this.GetVariable( st.b );
//			if ( var_b.evalPtr && var_b.evalPtr.floatPtr ) {
//				var_a = this.GetVariable( st.a );
//				*var_b.evalPtr.floatPtr = static_cast<float>( *var_a.intPtr );
//			}
//			break;
//
//		case opc.OP_STOREP_OBJ:
//			var_b = this.GetVariable( st.b );
//			if ( var_b.evalPtr && var_b.evalPtr.entityNumberPtr ) {
//				var_a = this.GetVariable( st.a );
//				*var_b.evalPtr.entityNumberPtr = *var_a.entityNumberPtr;
//			}
//			break;
//
//		case opc.OP_STOREP_OBJENT:
//			var_b = this.GetVariable( st.b );
//			if ( var_b.evalPtr && var_b.evalPtr.entityNumberPtr ) {
//				var_a = this.GetVariable( st.a );
//				obj = GetScriptObject( *var_a.entityNumberPtr );
//				if ( !obj ) {
//					*var_b.evalPtr.entityNumberPtr = 0;
//
//				// st.b points to type_pointer, which is just a temporary that gets its type reassigned, so we store the real type in st.c
//				// so that we can do a type check during run time since we don't know what type the script object is at compile time because it
//				// comes from an entity
//				} else if ( !obj.GetTypeDef().Inherits( st.c.TypeDef() ) ) {
//					//Warning( "object '%s' cannot be converted to '%s'", obj.GetTypeName(), st.c.TypeDef().Name() );
//					*var_b.evalPtr.entityNumberPtr = 0;
//				} else {
//					*var_b.evalPtr.entityNumberPtr = *var_a.entityNumberPtr;
//				}
//			}
//			break;
//
//		case opc.OP_ADDRESS:
//			var_a = this.GetVariable( st.a );
//			var_c = this.GetVariable( st.c );
//			obj = GetScriptObject( *var_a.entityNumberPtr );
//			if ( obj ) {
//				var_c.evalPtr.bytePtr = &obj.data[ st.b.value.ptrOffset ];
//			} else {
//				var_c.evalPtr.bytePtr = NULL;
//			}
//			break;
//
//		case opc.OP_INDIRECT_F:
//			var_a = this.GetVariable( st.a );
//			var_c = this.GetVariable( st.c );
//			obj = GetScriptObject( *var_a.entityNumberPtr );
//			if ( obj ) {
//				$var.bytePtr = &obj.data[ st.b.value.ptrOffset ];
//				*var_c.floatPtr = *$var.floatPtr;
//			} else {
//				*var_c.floatPtr = 0.0;
//			}
//			break;
//
//		case opc.OP_INDIRECT_ENT:
//			var_a = this.GetVariable( st.a );
//			var_c = this.GetVariable( st.c );
//			obj = GetScriptObject( *var_a.entityNumberPtr );
//			if ( obj ) {
//				$var.bytePtr = &obj.data[ st.b.value.ptrOffset ];
//				*var_c.entityNumberPtr = *$var.entityNumberPtr;
//			} else {
//				*var_c.entityNumberPtr = 0;
//			}
//			break;
//
//		case opc.OP_INDIRECT_BOOL:
//			var_a = this.GetVariable( st.a );
//			var_c = this.GetVariable( st.c );
//			obj = GetScriptObject( *var_a.entityNumberPtr );
//			if ( obj ) {
//				$var.bytePtr = &obj.data[ st.b.value.ptrOffset ];
//				*var_c.intPtr = *$var.intPtr;
//			} else {
//				*var_c.intPtr = 0;
//			}
//			break;
//
//		case opc.OP_INDIRECT_S:
//			var_a = this.GetVariable( st.a );
//			obj = GetScriptObject( *var_a.entityNumberPtr );
//			if ( obj ) {
//				$var.bytePtr = &obj.data[ st.b.value.ptrOffset ];
//				SetString( st.c, $var.stringPtr );
//			} else {
//				SetString( st.c, "" );
//			}
//			break;
//
//		case opc.OP_INDIRECT_V:
//			var_a = this.GetVariable( st.a );
//			var_c = this.GetVariable( st.c );
//			obj = GetScriptObject( *var_a.entityNumberPtr );
//			if ( obj ) {
//				$var.bytePtr = &obj.data[ st.b.value.ptrOffset ];
//				*var_c.vectorPtr = *$var.vectorPtr;
//			} else {
//				var_c.vectorPtr.Zero();
//			}
//			break;
//
//		case opc.OP_INDIRECT_OBJ:
//			var_a = this.GetVariable( st.a );
//			var_c = this.GetVariable( st.c );
//			obj = GetScriptObject( *var_a.entityNumberPtr );
//			if ( !obj ) {
//				*var_c.entityNumberPtr = 0;
//			} else {
//				$var.bytePtr = &obj.data[ st.b.value.ptrOffset ];
//				*var_c.entityNumberPtr = *$var.entityNumberPtr;
//			}
//			break;
//
//		case opc.OP_PUSH_F:
//			var_a = this.GetVariable( st.a );
//			this.Push( *var_a.intPtr );
//			break;
//
//		case opc.OP_PUSH_FTOS:
//			var_a = this.GetVariable( st.a );
//			this.PushString( FloatToString( *var_a.floatPtr ) );
//			break;
//
//		case opc.OP_PUSH_BTOF:
//			var_a = this.GetVariable( st.a );
//			floatVal = *var_a.intPtr;
//			this.Push( *reinterpret_cast<int *>( &floatVal ) );
//			break;
//
//		case opc.OP_PUSH_FTOB:
//			var_a = this.GetVariable( st.a );
//			if ( *var_a.floatPtr != 0.0 ) {
//				this.Push( 1 );
//			} else {
//				this.Push( 0 );
//			}
//			break;
//
//		case opc.OP_PUSH_VTOS:
//			var_a = this.GetVariable( st.a );
//			this.PushString( var_a.vectorPtr.ToString() );
//			break;
//
//		case opc.OP_PUSH_BTOS:
//			var_a = this.GetVariable( st.a );
//			this.PushString( *var_a.intPtr ? "true" : "false" );
//			break;
//
//		case opc.OP_PUSH_ENT:
//			var_a = this.GetVariable( st.a );
//			this.Push( *var_a.entityNumberPtr );
//			break;

		case opc.OP_PUSH_S:
			this.PushString( this.GetString( st.a ) );
			break;

//		case opc.OP_PUSH_V:
//			var_a = this.GetVariable( st.a );
//			this.Push( *reinterpret_cast<int *>( &var_a.vectorPtr.x ) );
//			this.Push( *reinterpret_cast<int *>( &var_a.vectorPtr.y ) );
//			this.Push( *reinterpret_cast<int *>( &var_a.vectorPtr.z ) );
//			break;
//
//		case opc.OP_PUSH_OBJ:
//			var_a = this.GetVariable( st.a );
//			this.Push( *var_a.entityNumberPtr );
//			break;
//
//		case opc.OP_PUSH_OBJENT:
//			var_a = this.GetVariable( st.a );
//			this.Push( *var_a.entityNumberPtr );
//			break;
//
			case opc.OP_BREAK:
			case opc.OP_CONTINUE:
			default:
				debugger;
				this.Error( "Bad opcode %i", st.op );
				break;
			}
		}

		return this.threadDying;
	}
}