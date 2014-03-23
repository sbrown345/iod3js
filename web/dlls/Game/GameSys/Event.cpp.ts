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
/////*
////sys_event.cpp
////
////Event are used for scheduling tasks and for linking script commands.
////
////*/
////
////#include "../../idlib/precompiled.h"
////#pragma hdrstop
////
////#include "../Game_local.h"
////
////#define MAX_EVENTSPERFRAME			4096
//////#define CREATE_EVENT_CODE
////
/////***********************************************************************
////
////  idEventDef
////
////***********************************************************************/
////
////idEventDef *idEventDef::eventDefList[MAX_EVENTS];
////int idEventDef::numEventDefs = 0;
////
var eventError = false;
var eventErrorMsg = ""; //[ 128 ];
////
////
/////*
////sys_event.h
////
////Event are used for scheduling tasks and for linking script commands.
////*/
////#ifndef __SYS_EVENT_H__
////#define __SYS_EVENT_H__
////
var D_EVENT_MAXARGS = 8;			// if changed, enable the CREATE_EVENT_CODE define in Event.cpp to generate switch statement for idClass::ProcessEventArgPtr.
// running the game will then generate c:\doom\base\events.txt, the contents of which should be copied into the switch statement.

var D_EVENT_VOID = '\0';
var D_EVENT_INTEGER = 'd';
var D_EVENT_FLOAT = 'f';
var D_EVENT_VECTOR = 'v';
var D_EVENT_STRING = 's';
var D_EVENT_ENTITY = 'e';
var D_EVENT_ENTITY_NULL = 'E';	// event can handle NULL entity pointers
var D_EVENT_TRACE = 't';

var MAX_EVENTS = 4096;
////
////class idClass;
////class idTypeInfo;
////
class idEventDef {
////private:
	name:string;
	formatspec:string;
	formatspecIndex:number;						 //unsigned int
	returnType:string;							 //int							
	numargs:number;								 //int							
	argsize:number;								 //size_t						
	argOffset = new Int32Array(D_EVENT_MAXARGS); //int							
	eventnum:number;							 //int							
	next:idEventDef;

	static eventDefList = new Array<idEventDef>(MAX_EVENTS);
	static numEventDefs = 0; 
////
////public:
////	idEventDef(const char *command, const char *formatspec = NULL, char returnType = 0);
////
////	const char					*GetName(void) const;
////	const char					*GetArgFormat(void) const;
////	unsigned int				GetFormatspecIndex(void) const;
////	char						GetReturnType(void) const;
////	int							GetEventNum(void) const;
////	int							GetNumArgs(void) const;
////	size_t						GetArgSize(void) const;
////	int							GetArgOffset(int arg) const;
////
////	static int					NumEventCommands(void);
////	static const idEventDef		*GetEventCommand(int eventnum);
////	static const idEventDef		*FindEvent(const char *name);
////};
////
////class idSaveGame;
////class idRestoreGame;

/*
================
idEventDef::GetName
================
*/
	GetName ( ): string {
		return this.name;
	}

/*
================
idEventDef::GetArgFormat
================
*/
	GetArgFormat ( ): string {
		return this.formatspec;
	}

/////*
////================
////idEventDef::GetFormatspecIndex
////================
////*/
////ID_INLINE unsigned int idEventDef::GetFormatspecIndex(void) const {
////	return formatspecIndex;
////}

/*
================
idEventDef::GetReturnType
================
*/
	GetReturnType ( ): string {
		return this.returnType;
	}

/*
================
idEventDef::GetNumArgs
================
*/
	GetNumArgs ( ): number {
		return this.numargs;
	}

/*
================
idEventDef::GetArgSize
================
*/
	GetArgSize ( ): number {
		return this.argsize;
	}

/*
================
idEventDef::GetArgOffset
================
*/
	GetArgOffset ( /*int */arg: number ): number {
		assert( ( arg >= 0 ) && ( arg < D_EVENT_MAXARGS ) );
		return this.argOffset[arg];
	}

/*
================
idEventDef::GetEventNum
================
*/
	GetEventNum ( ): number {
		return this.eventnum;
	}

////#endif /* !__SYS_EVENT_H__ */
////

/*
================
idEventDef::idEventDef
================
*/
	constructor ( command: string, formatspec: string = null, /*char */returnType = "\0") {
		var ev: idEventDef;
		var i: number;
		var bits: number; //unsigned int	

		assert( command );
		assert( !idEvent.initialized );

		// Allow NULL to indicate no args, but always store it as ""
		// so we don't have to check for it.
		if ( !formatspec ) {
			formatspec = "";
		}

		this.name = command;
		this.formatspec = formatspec;
		this.returnType = returnType;

		this.numargs = strlen( formatspec );
		assert( this.numargs <= D_EVENT_MAXARGS );
		if ( this.numargs > D_EVENT_MAXARGS ) {
			eventError = true;
			sprintf( eventErrorMsg, "idEventDef::idEventDef : Too many args for '%s' event.", name );
			return;
		}

		// make sure the format for the args is valid, calculate the formatspecindex, and the offsets for each arg
		bits = 0;
		this.argsize = 0;
		memset( this.argOffset, 0, sizeof( this.argOffset ) );
		for ( i = 0; i < this.numargs; i++ ) {
			this.argOffset[i] = this.argsize;
			switch ( formatspec[i] ) {
			case D_EVENT_FLOAT:
				bits |= 1 << i;
				this.argsize += sizeof( float );
				break;

			case D_EVENT_INTEGER:
				this.argsize += sizeof( int );
				break;

			case D_EVENT_VECTOR:
				this.argsize += sizeof( idVec3 );
				break;

			case D_EVENT_STRING:
				this.argsize += MAX_STRING_LEN;
				break;

			case D_EVENT_ENTITY:
				this.argsize += 4; //sizeof(idEntityPtr < idEntity>);
				break;

			case D_EVENT_ENTITY_NULL:
				this.argsize += 4; //sizeof(idEntityPtr < idEntity>);
				break;

			case D_EVENT_TRACE:
				this.argsize += sizeof( trace_t ) + MAX_STRING_LEN + 1 /*sizeof( bool )*/;
				break;

			default:
				eventError = true;
				sprintf( eventErrorMsg, "idEventDef::idEventDef : Invalid arg format '%s' string for '%s' event.", formatspec, name );
				return;
				break;
			}
		}

		// calculate the formatspecindex
		this.formatspecIndex = ( 1 << ( this.numargs + D_EVENT_MAXARGS ) ) | bits;

		// go through the list of defined events and check for duplicates
		// and mismatched format strings
		this.eventnum = idEventDef.numEventDefs;
		for ( i = 0; i < this.eventnum; i++ ) {
			ev = idEventDef.eventDefList[i];
			if ( strcmp( command, ev.name ) == 0 ) {
				if ( strcmp( formatspec, ev.formatspec ) != 0 ) {
					eventError = true;
					sprintf( eventErrorMsg, "idEvent '%s' defined twice with same name but differing format strings ('%s'!='%s').",
						command, formatspec, ev.formatspec );
					return;
				}

				if ( ev.returnType != returnType ) {
					eventError = true;
					sprintf( eventErrorMsg, "idEvent '%s' defined twice with same name but differing return types ('%s'!='%c').",
						command, returnType, ev.returnType );
					return;
				}
				// Don't bother putting the duplicate event in list.
				this.eventnum = ev.eventnum;
				return;
			}
		}

		ev = this;

		if ( idEventDef.numEventDefs >= MAX_EVENTS ) {
			eventError = true;
			sprintf( eventErrorMsg, "numEventDefs >= MAX_EVENTS" );
			return;
		}
		idEventDef.eventDefList[idEventDef.numEventDefs] = ev;
		idEventDef.numEventDefs++;
	}

/*
================
idEventDef::NumEventCommands
================
*/
	static NumEventCommands ( ): number {
		return idEventDef.numEventDefs;
	}
////
/////*
////================
////idEventDef::GetEventCommand
////================
////*/
//// *idEventDef::GetEventCommand( int eventnum ) {
////	return eventDefList[ eventnum ];
////}

/*
================
idEventDef::FindEvent
================
*/
	static FindEvent ( name: string ): idEventDef {
		var ev: idEventDef; //idEventDef	
		var num: number; //int			
		var i: number; //int			

		assert( name );

		num = idEventDef.numEventDefs;
		for ( i = 0; i < num; i++ ) {
			ev = idEventDef.eventDefList[i];
			if ( strcmp( name, ev.name ) == 0 ) {
				return ev;
			}
		}

		return null;
	}

}

/***********************************************************************

  idEvent

***********************************************************************/
// init these after class instead:
//var FreeEvents = new idLinkList <idEvent>;
//var EventQueue = new idLinkList <idEvent>;
//var EventPool = newStructArray<idEvent>( idEvent, MAX_EVENTS );
//////
//////bool idEvent::initialized = false;
//////
//////idDynamicBlockAlloc<byte, 16 * 1024, 256>	idEvent::eventDataAllocator;

class idEvent {
////private:
	eventdef: idEventDef;
	data:Uint8Array; //byte						*
	time:number;
	object: idClass;
	typeinfo:idTypeInfo;

	eventNode = new	idLinkList<idEvent>();

	//eventDataAllocator ////	static idDynamicBlockAlloc<byte, 16 * 1024, 256> eventDataAllocator;


////public:
	static initialized = false;
////
////	~idEvent();
////
////	static idEvent				*Alloc(const idEventDef *evdef, int numargs, va_list args);
////	static void					CopyArgs(const idEventDef *evdef, int numargs, va_list args, int data[D_EVENT_MAXARGS]);
////
////	void						Free(void);
////	void						Schedule(idClass *object, const idTypeInfo *cls, /*int*/time:number);
////	byte						*GetData(void);
////
////	static void					CancelEvents(const idClass *obj, const idEventDef *evdef = NULL);
////	static void					ClearEventList(void);
////	static void					ServiceEvents(void);
////	static void					Init(void);
////	static void					Shutdown(void);
////
////	// save games
////	static void					Save(idSaveGame *savefile);					// archives object for save game file
////	static void					Restore(idRestoreGame *savefile);				// unarchives object from save game file
////	static void					SaveTrace(idSaveGame *savefile, const trace_t &trace);
////	static void					RestoreTrace(idRestoreGame *savefile, trace_t &trace);
////
////};
////
/////*
////================
////idEvent::GetData
////================
////*/
////ID_INLINE byte *idEvent::GetData(void) {
////	return data;
////}
////
/////*
////================
////idEvent::~idEvent()
////================
////*/
////idEvent::~idEvent() {
////	Free();
////}
////
/////*
////================
////idEvent::Alloc
////================
////*/
////idEvent *idEvent::Alloc( const idEventDef *evdef, int numargs, va_list args ) {
////	idEvent		*ev;
////	size_t		size;
////	const char	*format;
////	idEventArg	*arg;
////	byte		*dataPtr;
////	int			i;
////	const char	*materialName;
////
////	if ( FreeEvents.IsListEmpty() ) {
////		gameLocal.Error( "idEvent::Alloc : No more free events" );
////	}
////
////	ev = FreeEvents.Next();
////	ev.eventNode.Remove();
////
////	ev.eventdef = evdef;
////
////	if ( numargs != evdef.GetNumArgs() ) {
////		gameLocal.Error( "idEvent::Alloc : Wrong number of args for '%s' event.", evdef.GetName() );
////	}
////
////	size = evdef.GetArgSize();
////	if ( size ) {
////		ev.data = eventDataAllocator.Alloc( size );
////		memset( ev.data, 0, size );
////	} else {
////		ev.data = NULL;
////	}
////
////	format = evdef.GetArgFormat();
////	for( i = 0; i < numargs; i++ ) {
////		arg = va_arg( args, idEventArg * );
////		if ( format[ i ] != arg.type ) {
////			// when NULL is passed in for an entity, it gets cast as an integer 0, so don't give an error when it happens
////			if ( !( ( ( format[ i ] == D_EVENT_TRACE ) || ( format[ i ] == D_EVENT_ENTITY ) ) && ( arg.type == 'd' ) && ( arg.value == 0 ) ) ) {
////				gameLocal.Error( "idEvent::Alloc : Wrong type passed in for arg # %d on '%s' event.", i, evdef.GetName() );
////			}
////		}
////
////		dataPtr = &ev.data[ evdef.GetArgOffset( i ) ];
////
////		switch( format[ i ] ) {
////		case D_EVENT_FLOAT :
////		case D_EVENT_INTEGER :
////			*reinterpret_cast<int *>( dataPtr ) = arg.value;
////			break;
////
////		case D_EVENT_VECTOR :
////			if ( arg.value ) {
////				*reinterpret_cast<idVec3 *>( dataPtr ) = *reinterpret_cast<const idVec3 *>( arg.value );
////			}
////			break;
////
////		case D_EVENT_STRING :
////			if ( arg.value ) {
////				idStr::Copynz( reinterpret_cast<char *>( dataPtr ), reinterpret_cast<const char *>( arg.value ), MAX_STRING_LEN );
////			}
////			break;
////
////		case D_EVENT_ENTITY :
////		case D_EVENT_ENTITY_NULL :
////			*reinterpret_cast< idEntityPtr<idEntity> * >( dataPtr ) = reinterpret_cast<idEntity *>( arg.value );
////			break;
////
////		case D_EVENT_TRACE :
////			if ( arg.value ) {
////				*reinterpret_cast<bool *>( dataPtr ) = true;
////				*reinterpret_cast<trace_t *>( dataPtr + sizeof( bool ) ) = *reinterpret_cast<const trace_t *>( arg.value );
////
////				// save off the material as a string since the pointer won't be valid in save games.
////				// since we save off the entire trace_t structure, if the material is NULL here,
////				// it will be NULL when we process it, so we don't need to save off anything in that case.
////				if ( reinterpret_cast<const trace_t *>( arg.value ).c.material ) {
////					materialName = reinterpret_cast<const trace_t *>( arg.value ).c.material.GetName();
////					idStr::Copynz( reinterpret_cast<char *>( dataPtr + sizeof( bool ) + sizeof( trace_t ) ), materialName, MAX_STRING_LEN );
////				}
////			} else {
////				*reinterpret_cast<bool *>( dataPtr ) = false;
////			}
////			break;
////
////		default :
////			gameLocal.Error( "idEvent::Alloc : Invalid arg format '%s' string for '%s' event.", format, evdef.GetName() );
////			break;
////		}
////	}
////
////	return ev;
////}
////
/////*
////================
////idEvent::CopyArgs
////================
////*/
////void idEvent::CopyArgs( const idEventDef *evdef, int numargs, va_list args, int data[ D_EVENT_MAXARGS ] ) {
////	int			i;
////	const char	*format;
////	idEventArg	*arg;
////
////	format = evdef.GetArgFormat();
////	if ( numargs != evdef.GetNumArgs() ) {
////		gameLocal.Error( "idEvent::CopyArgs : Wrong number of args for '%s' event.", evdef.GetName() );
////	}
////
////	for( i = 0; i < numargs; i++ ) {
////		arg = va_arg( args, idEventArg * );
////		if ( format[ i ] != arg.type ) {
////			// when NULL is passed in for an entity, it gets cast as an integer 0, so don't give an error when it happens
////			if ( !( ( ( format[ i ] == D_EVENT_TRACE ) || ( format[ i ] == D_EVENT_ENTITY ) ) && ( arg.type == 'd' ) && ( arg.value == 0 ) ) ) {
////				gameLocal.Error( "idEvent::CopyArgs : Wrong type passed in for arg # %d on '%s' event.", i, evdef.GetName() );
////			}
////		}
////
////		data[ i ] = arg.value;
////	}
////}

/*
================
idEvent::Free
================
*/
	Free ( ): void {
		if ( this.data ) {
			eventDataAllocator.Free( this.data );
			this.data = null;
		}

		this.eventdef = null;
		this.time = 0;
		this.object = null;
		this.typeinfo = null;

		this.eventNode.SetOwner( this );
		this.eventNode.AddToEnd( FreeEvents );
	}
////
/////*
////================
////idEvent::Schedule
////================
////*/
////void idEvent::Schedule( idClass *obj, const idTypeInfo *type, /*int*/time:number ) {
////	idEvent *event;
////
////	assert( idEvent.initialized );
////	if ( !idEvent.initialized ) {
////		return;
////	}
////
////	object = obj;
////	typeinfo = type;
////
////	// wraps after 24 days...like I care. ;)
////	this.time = gameLocal.time + time;
////
////	eventNode.Remove();
////
////	event = EventQueue.Next();
////	while( ( event != NULL ) && ( this.time >= event.time ) ) {
////		event = event.eventNode.Next();
////	}
////
////	if ( event ) {
////		eventNode.InsertBefore( event.eventNode );
////	} else {
////		eventNode.AddToEnd( EventQueue );
////	}
////}

/*
================
idEvent::CancelEvents
================
*/
	static CancelEvents ( obj: idClass, evdef: idEventDef = null ) {
		var event: idEvent;
		var next: idEvent;

		if ( !idEvent.initialized ) {
			return;
		}

		for ( event = EventQueue.Next ( ); event != null; event = next ) {
			next = event.eventNode.Next ( );
			if ( event.object == obj ) {
				if ( !evdef || ( evdef == event.eventdef ) ) {
					event.Free ( );
				}
			}
		}
	}

/*
================
idEvent::ClearEventList
================
*/
static ClearEventList( ):void {
	var/*int */i:number;

	//
	// initialize lists
	//
	FreeEvents.Clear();
	EventQueue.Clear();
   
	// 
	// add the events to the free list
	//
	for( i = 0; i < MAX_EVENTS; i++ ) {
		EventPool[ i ].Free();
	}
}

/*
================
idEvent::ServiceEvents
================
*/
	static ServiceEvents ( ): void {
		todoThrow ( );
////	idEvent		*event;
////	int			num;
////	int			args[ D_EVENT_MAXARGS ];
////	int			offset;
////	int			i;
////	int			numargs;
////	const char	*formatspec;
////	trace_t		**tracePtr;
////	const idEventDef *ev;
////	byte		*data;
////	const char  *materialName;
////
////	num = 0;
////	while( !EventQueue.IsListEmpty() ) {
////		event = EventQueue.Next();
////		assert( event );
////
////		if ( event.time > gameLocal.time ) {
////			break;
////		}
////
////		// copy the data into the local args array and set up pointers
////		ev = event.eventdef;
////		formatspec = ev.GetArgFormat();
////		numargs = ev.GetNumArgs();
////		for( i = 0; i < numargs; i++ ) {
////			offset = ev.GetArgOffset( i );
////			data = event.data;
////			switch( formatspec[ i ] ) {
////			case D_EVENT_FLOAT :
////			case D_EVENT_INTEGER :
////				args[ i ] = *reinterpret_cast<int *>( &data[ offset ] );
////				break;
////
////			case D_EVENT_VECTOR :
////				*reinterpret_cast<idVec3 **>( &args[ i ] ) = reinterpret_cast<idVec3 *>( &data[ offset ] );
////				break;
////
////			case D_EVENT_STRING :
////				*reinterpret_cast<const char **>( &args[ i ] ) = reinterpret_cast<const char *>( &data[ offset ] );
////				break;
////
////			case D_EVENT_ENTITY :
////			case D_EVENT_ENTITY_NULL :
////				*reinterpret_cast<idEntity **>( &args[ i ] ) = reinterpret_cast< idEntityPtr<idEntity> * >( &data[ offset ] ).GetEntity();
////				break;
////
////			case D_EVENT_TRACE :
////				tracePtr = reinterpret_cast<trace_t **>( &args[ i ] );
////				if ( *reinterpret_cast<bool *>( &data[ offset ] ) ) {
////					*tracePtr = reinterpret_cast<trace_t *>( &data[ offset + sizeof( bool ) ] );
////
////					if ( ( *tracePtr ).c.material != NULL ) {
////						// look up the material name to get the material pointer
////						materialName = reinterpret_cast<const char *>( &data[ offset + sizeof( bool ) + sizeof( trace_t ) ] );
////						( *tracePtr ).c.material = declManager.FindMaterial( materialName, true );
////					}
////				} else {
////					*tracePtr = NULL;
////				}
////				break;
////
////			default:
////				gameLocal.Error( "idEvent::ServiceEvents : Invalid arg format '%s' string for '%s' event.", formatspec, ev.GetName() );
////			}
////		}
////
////		// the event is removed from its list so that if then object
////		// is deleted, the event won't be freed twice
////		event.eventNode.Remove();
////		assert( event.object );
////		event.object.ProcessEventArgPtr( ev, args );
////
////#if 0
////		// event functions may never leave return values on the FPU stack
////		// enable this code to check if any event call left values on the FPU stack
////		if ( !sys.FPU_StackIsEmpty() ) {
////			gameLocal.Error( "idEvent::ServiceEvents %d: %s left a value on the FPU stack\n", num, ev.GetName() );
////		}
////#endif
////
////		// return the event to the free list
////		event.Free();
////
////		// Don't allow ourselves to stay in here too long.  An abnormally high number
////		// of events being processed is evidence of an infinite loop of events.
////		num++;
////		if ( num > MAX_EVENTSPERFRAME ) {
////			gameLocal.Error( "Event overflow.  Possible infinite loop in script." );
////		}
////	}
	}

/*
================
idEvent::Init
================
*/
static Init( ):void {
	gameLocal.Printf( "Initializing event system\n" );

	if (eventError) {
		gameLocal.Error( "%s", eventErrorMsg );
	}

//#ifdef CREATE_EVENT_CODE
//	void CreateEventCallbackHandler();
//	CreateEventCallbackHandler();
//	gameLocal.Error( "Wrote event callback handler" );
//#endif

	if ( idEvent.initialized ) {
		gameLocal.Printf( "...already initialized\n" );
		idEvent.ClearEventList();
		return;
	}

	idEvent.ClearEventList();

	eventDataAllocator.Init();

	gameLocal.Printf( "...%i event definitions\n", idEventDef.NumEventCommands() );

	// the event system has started
	idEvent.initialized = true;
}
////
/////*
////================
////idEvent::Shutdown
////================
////*/
////void idEvent::Shutdown( ) {
////	gameLocal.Printf( "Shutdown event system\n" );
////
////	if ( !idEvent.initialized ) {
////		gameLocal.Printf( "...not started\n" );
////		return;
////	}
////
////	ClearEventList();
////	
////	eventDataAllocator.Shutdown();
////
////	// say it is now shutdown
////	idEvent.initialized = false;
////}
////
/////*
////================
////idEvent::Save
////================
////*/
////void idEvent::Save( idSaveGame *savefile ) {
////	char *str;
////	int i, size;
////	idEvent	*event;
////	byte *dataPtr;
////	bool validTrace;
////	const char	*format;
////
////	savefile.WriteInt( EventQueue.Num() );
////
////	event = EventQueue.Next();
////	while( event != NULL ) {
////		savefile.WriteInt( event.time );
////		savefile.WriteString( event.eventdef.GetName() );
////		savefile.WriteString( event.typeinfo.classname );
////		savefile.WriteObject( event.object );
////		savefile.WriteInt( event.eventdef.GetArgSize() );
////		format = event.eventdef.GetArgFormat();
////		for ( i = 0, size = 0; i < event.eventdef.GetNumArgs(); ++i) {
////			dataPtr = &event.data[ event.eventdef.GetArgOffset( i ) ];
////			switch( format[ i ] ) {
////				case D_EVENT_FLOAT :
////					savefile.WriteFloat( *reinterpret_cast<float *>( dataPtr ) );
////					size += sizeof( float );
////					break;
////				case D_EVENT_INTEGER :
////				case D_EVENT_ENTITY :
////				case D_EVENT_ENTITY_NULL :
////					savefile.WriteInt( *reinterpret_cast<int *>( dataPtr ) );
////					size += sizeof( int );
////					break;
////				case D_EVENT_VECTOR :
////					savefile.WriteVec3( *reinterpret_cast<idVec3 *>( dataPtr ) );
////					size += sizeof( idVec3 );
////					break;
////				case D_EVENT_TRACE :
////					validTrace = *reinterpret_cast<bool *>( dataPtr );
////					savefile.WriteBool( validTrace );
////					size += sizeof( bool );
////					if ( validTrace ) {
////						size += sizeof( trace_t );
////						const trace_t &t = *reinterpret_cast<trace_t *>( dataPtr + sizeof( bool ) );
////						SaveTrace( savefile, t );
////						if ( t.c.material ) {
////							size += MAX_STRING_LEN;
////							str = reinterpret_cast<char *>( dataPtr + sizeof( bool ) + sizeof( trace_t ) );
////							savefile.Write( str, MAX_STRING_LEN );
////						}
////					}
////					break;
////				default:
////					break;
////			}
////		}
////		assert( size == event.eventdef.GetArgSize() );
////		event = event.eventNode.Next();
////	}
////}
////
/////*
////================
////idEvent::Restore
////================
////*/
////void idEvent::Restore( idRestoreGame *savefile ) {
////	char    *str;
////	int		num, argsize, i, j, size;
////	idStr	name;
////	byte *dataPtr;
////	idEvent	*event;
////	const char	*format;
////
////	savefile.ReadInt( num );
////
////	for ( i = 0; i < num; i++ ) {
////		if ( FreeEvents.IsListEmpty() ) {
////			gameLocal.Error( "idEvent::Restore : No more free events" );
////		}
////
////		event = FreeEvents.Next();
////		event.eventNode.Remove();
////		event.eventNode.AddToEnd( EventQueue );
////
////		savefile.ReadInt( event.time );
////
////		// read the event name
////		savefile.ReadString( name );
////		event.eventdef = idEventDef::FindEvent( name );
////		if ( !event.eventdef ) {
////			savefile.Error( "idEvent::Restore: unknown event '%s'", name.c_str() );
////		}
////
////		// read the classtype
////		savefile.ReadString( name );
////		event.typeinfo = idClass::GetClass( name );
////		if ( !event.typeinfo ) {
////			savefile.Error( "idEvent::Restore: unknown class '%s' on event '%s'", name.c_str(), event.eventdef.GetName() );
////		}
////
////		savefile.ReadObject( event.object );
////
////		// read the args
////		savefile.ReadInt( argsize );
////		if ( ((size_t)argsize) != event.eventdef.GetArgSize() ) {
////			savefile.Error( "idEvent::Restore: arg size (%d) doesn't match saved arg size(%d) on event '%s'", event.eventdef.GetArgSize(), argsize, event.eventdef.GetName() );
////		}
////		if ( argsize ) {
////			event.data = eventDataAllocator.Alloc( argsize );
////			format = event.eventdef.GetArgFormat();
////			assert( format );
////			for ( j = 0, size = 0; j < event.eventdef.GetNumArgs(); ++j) {
////				dataPtr = &event.data[ event.eventdef.GetArgOffset( j ) ];
////				switch( format[ j ] ) {
////					case D_EVENT_FLOAT :
////						savefile.ReadFloat( *reinterpret_cast<float *>( dataPtr ) );
////						size += sizeof( float );
////						break;
////					case D_EVENT_INTEGER :
////					case D_EVENT_ENTITY :
////					case D_EVENT_ENTITY_NULL :
////						savefile.ReadInt( *reinterpret_cast<int *>( dataPtr ) );
////						size += sizeof( int );
////						break;
////					case D_EVENT_VECTOR :
////						savefile.ReadVec3( *reinterpret_cast<idVec3 *>( dataPtr ) );
////						size += sizeof( idVec3 );
////						break;
////					case D_EVENT_TRACE :
////						savefile.ReadBool( *reinterpret_cast<bool *>( dataPtr ) );
////						size += sizeof( bool );
////						if ( *reinterpret_cast<bool *>( dataPtr ) ) {
////							size += sizeof( trace_t );
////							trace_t &t = *reinterpret_cast<trace_t *>( dataPtr + sizeof( bool ) );
////							RestoreTrace( savefile,  t) ;
////							if ( t.c.material ) {
////								size += MAX_STRING_LEN;
////								str = reinterpret_cast<char *>( dataPtr + sizeof( bool ) + sizeof( trace_t ) );
////								savefile.Read( str, MAX_STRING_LEN );
////							}
////						}
////						break;
////					default:
////						break;
////				}
////			}
////			assert( size == event.eventdef.GetArgSize() );
////		} else {
////			event.data = NULL;
////		}
////	}
////}
////
/////*
//// ================
//// idEvent::ReadTrace
//// 
//// idRestoreGame has a ReadTrace procedure, but unfortunately idEvent wants the material
//// string name at the of the data structure rather than in the middle
//// ================
//// */
////void idEvent::RestoreTrace( idRestoreGame *savefile, trace_t &trace ) {
////	savefile.ReadFloat( trace.fraction );
////	savefile.ReadVec3( trace.endpos );
////	savefile.ReadMat3( trace.endAxis );
////	savefile.ReadInt( (int&)trace.c.type );
////	savefile.ReadVec3( trace.c.point );
////	savefile.ReadVec3( trace.c.normal );
////	savefile.ReadFloat( trace.c.dist );
////	savefile.ReadInt( trace.c.contents );
////	savefile.ReadInt( (int&)trace.c.material );
////	savefile.ReadInt( trace.c.contents );
////	savefile.ReadInt( trace.c.modelFeature );
////	savefile.ReadInt( trace.c.trmFeature );
////	savefile.ReadInt( trace.c.id );
////}
////
/////*
//// ================
//// idEvent::WriteTrace
////
//// idSaveGame has a WriteTrace procedure, but unfortunately idEvent wants the material
//// string name at the of the data structure rather than in the middle
////================
//// */
////void idEvent::SaveTrace( idSaveGame *savefile, const trace_t &trace ) {
////	savefile.WriteFloat( trace.fraction );
////	savefile.WriteVec3( trace.endpos );
////	savefile.WriteMat3( trace.endAxis );
////	savefile.WriteInt( trace.c.type );
////	savefile.WriteVec3( trace.c.point );
////	savefile.WriteVec3( trace.c.normal );
////	savefile.WriteFloat( trace.c.dist );
////	savefile.WriteInt( trace.c.contents );
////	savefile.WriteInt( (int&)trace.c.material );
////	savefile.WriteInt( trace.c.contents );
////	savefile.WriteInt( trace.c.modelFeature );
////	savefile.WriteInt( trace.c.trmFeature );
////	savefile.WriteInt( trace.c.id );
////}
////
////
////
////#ifdef CREATE_EVENT_CODE
/////*
////================
////CreateEventCallbackHandler
////================
////*/
////void CreateEventCallbackHandler( ) {
////	int num;
////	int count;
////	int i, j, k;
////	char argString[ D_EVENT_MAXARGS + 1 ];
////	idStr string1;
////	idStr string2;
////	idFile *file;
////
////	file = fileSystem.OpenFileWrite( "Callbacks.cpp" );
////
////	file.Printf( "// generated file - see CREATE_EVENT_CODE\n\n" );
////
////	for( i = 1; i <= D_EVENT_MAXARGS; i++ ) {
////
////		file.Printf( "\t/*******************************************************\n\n\t\t%d args\n\n\t*******************************************************/\n\n", i );
////
////		for ( j = 0; j < ( 1 << i ); j++ ) {
////			for ( k = 0; k < i; k++ ) {
////				argString[ k ] = j & ( 1 << k ) ? 'f' : 'i';
////			}
////			argString[ i ] = '\0';
////			
////			string1.Empty();
////			string2.Empty();
////
////			for( k = 0; k < i; k++ ) {
////				if ( j & ( 1 << k ) ) {
////					string1 += "const float";
////					string2 += va( "*( float * )&data[ %d ]", k );
////				} else {
////					string1 += "const int";
////					string2 += va( "data[ %d ]", k );
////				}
////
////				if ( k < i - 1 ) {
////					string1 += ", ";
////					string2 += ", ";
////				}
////			}
////
////			file.Printf( "\tcase %d :\n\t\ttypedef void ( idClass::*eventCallback_%s_t )( %s );\n", ( 1 << ( i + D_EVENT_MAXARGS ) ) + j, argString, string1.c_str() );
////			file.Printf( "\t\t( this.*( eventCallback_%s_t )callback )( %s );\n\t\tbreak;\n\n", argString, string2.c_str() );
////
////		}
////	}
////
////	fileSystem.CloseFile( file );
////}
////
////#endif
}


var FreeEvents = new idLinkList<idEvent>();
var EventQueue = new idLinkList<idEvent>();
var EventPool = newStructArray<idEvent>(idEvent, MAX_EVENTS);

idEvent.initialized = false;

var eventDataAllocator = idDynamicAlloc_template<Uint8Array>(Uint8Array, 16 * 1024, 256);
