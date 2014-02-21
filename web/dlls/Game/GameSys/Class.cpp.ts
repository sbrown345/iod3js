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
////
////Base class for all C++ objects.  Provides fast run-time type checking and run-time
////instancing of objects.
////
////*/
////
////#include "../../idlib/precompiled.h"
////#pragma hdrstop
////
////#include "../Game_local.h"
////
////#include "TypeInfo.h"

////*/
////
////#ifndef __SYS_CLASS_H__
////#define __SYS_CLASS_H__
////
////class idClass;
////class idTypeInfo;
////
////extern const idEventDef EV_Remove;
////extern const idEventDef EV_SafeRemove;
////
////typedef void ( idClass::*eventCallback_t )( void );
////
////template< class Type >
class idEventFunc<Type> {
	constructor ( event: idEventDef, $function: any /*( ) => void  ?????????????*/ ) {
		this.event = event;
		this.$function = $function;
	}

	event: idEventDef;
	$function: ( ...args: any[] /*????*/ ) => void; //eventCallback_t  - typedef void ( idClass::*eventCallback_t )( void ); ?????
}

// added & so gcc could compile this
////#define EVENT( event, function )	{ &( event ), ( void ( idClass::* )( void ) )( &function ) },
function EVENT(event: idEventDef, $function: any): idEventFunc<any>{
	return new idEventFunc( event, $function );
}
////#define END_CLASS					{ NULL, NULL } };	


class idEventArg {
////public:
////	int			type;
////	int			value;
////
////	idEventArg()								{ type = D_EVENT_INTEGER; value = 0; };
////	idEventArg( int data )						{ type = D_EVENT_INTEGER; value = data; };
////	idEventArg( float data )					{ type = D_EVENT_FLOAT; value = *reinterpret_cast<int *>( &data ); };
////	idEventArg( idVec3 &data )					{ type = D_EVENT_VECTOR; value = reinterpret_cast<int>( &data ); };
////	idEventArg( const idStr &data )				{ type = D_EVENT_STRING; value = reinterpret_cast<int>( data.c_str() ); };
////	idEventArg( const char *data )				{ type = D_EVENT_STRING; value = reinterpret_cast<int>( data ); };
////	idEventArg( const class idEntity *data )	{ type = D_EVENT_ENTITY; value = reinterpret_cast<int>( data ); };
////	idEventArg( const struct trace_s *data )	{ type = D_EVENT_TRACE; value = reinterpret_cast<int>( data ); };
};

////class idAllocError : public idException {
////public:
////	idAllocError( const char *text = "" ) : idException( text ) {}
////};

/***********************************************************************

  idTypeInfo

***********************************************************************/

// this is the head of a singly linked list of all the idTypes
var typelist = new R<idTypeInfo>(); // todo: CLASS_DECLARATION maros set these up, but if this is only for debugging leave this for now
var classHierarchy = new idHierarchy<idTypeInfo> ( );
var/*int*/ eventCallbackMemory	= 0;

class idTypeInfo {
	//public:
	classname:string;
	superclass: string;
	CreateInstance: () => idClass;
	Spawn:()=>void;////	void						( idClass::*Spawn )( void );
	Save: (savefile: idSaveGame) => void;
	Restore: (savefile: idRestoreGame) => void;
	
	eventCallbacks: idEventFunc<idClass>[];
	eventMap: Array<( ) => void>; /*eventCallback_t*/
	$super: idTypeInfo;
	next: idTypeInfo;
	freeEventMap: boolean; ////	bool						
	typeNum: number; ////	int							
	lastChild: number; ////	int							
	////
	node: idHierarchy<idTypeInfo>;
	////
	////								idTypeInfo( const char *classname, const char *superclass, 
	////												idEventFunc<idClass> *eventCallbacks, idClass *( *CreateInstance )( void ), void ( idClass::*Spawn )( void ),
	////												void ( idClass::*Save )( idSaveGame *savefile ) const, void	( idClass::*Restore )( idRestoreGame *savefile ) );
	////								~idTypeInfo();
	////
	////	void						Init( void );
	////	void						Shutdown( void );
	////
	////	bool						IsType( const idTypeInfo &superclass ) const;
	////	bool						RespondsTo( const idEventDef &ev ) const;
	////};
	////
	/////*
	////================
	////idTypeInfo::IsType
	////
	////Checks if the object's class is a subclass of the class defined by the 
	////passed in idTypeInfo.
	////================
	////*/
	////ID_INLINE bool idTypeInfo::IsType( const idTypeInfo &type ) const {
	////	return ( ( typeNum >= type.typeNum ) && ( typeNum <= type.lastChild ) );
	////}
	
	/*
	================
	idTypeInfo::RespondsTo
	================
	*/
	RespondsTo ( ev: idEventDef ): boolean {
		assert( idEvent.initialized );
		if ( !this.eventMap[ev.GetEventNum ( )] ) {
			// we don't respond to this event
			return false;
		}

		return true;
	}

/////*
////================
////idTypeInfo::idClassType()
////
////Constructor for class.  Should only be called from CLASS_DECLARATION macro.
////Handles linking class definition into class hierarchy.  This should only happen
////at startup as idTypeInfos are statically defined.  Since static variables can be
////initialized in any order, the constructor must handle the case that subclasses
////are initialized before superclasses.
////================
	constructor ( classname: string, superclass: string, eventCallbacks: idEventFunc<idClass>[], CreateInstance: ( ) => idClass,
		Spawn: ( ) => void, Save: ( savefile: idSaveGame ) => void, Restore: ( savefile: idRestoreGame ) => void ) {
////idTypeInfo::idTypeInfo( const char *classname, const char *superclass, idEventFunc<idClass> *eventCallbacks, idClass *( *CreateInstance )( void ), 
////	void ( idClass::*Spawn )( void ), void ( idClass::*Save )( idSaveGame *savefile ) const, void ( idClass::*Restore )( idRestoreGame *savefile ) ) {

		var type: R<idTypeInfo>;
		var insert: R<idTypeInfo>;

		this.classname = classname;
		this.superclass = superclass;
		this.eventCallbacks = eventCallbacks;
		this.eventMap = null;
		this.Spawn = Spawn;
		this.Save = Save;
		this.Restore = Restore;
		this.CreateInstance = CreateInstance;
		this.$super = idClass.GetClass( superclass );
		this.freeEventMap = false;
		this.typeNum = 0;
		this.lastChild = 0;

		// Check if any subclasses were initialized before their superclass
		for ( type = typelist; type.$ /*!= NULL*/; type.$ = type.$.next ) {
			if ( ( type.$.$super == null ) && !idStr.Cmp( type.$.superclass, this.classname ) &&
				idStr.Cmp( type.$.classname, "idClass" ) ) {
				type.$.$super = this;
			}
		}

		// Insert sorted
		for ( insert = typelist; insert.$; insert.$ = ( insert.$ ).next ) {
			assert( idStr.Cmp( classname, ( insert.$ ).classname ) );
			if ( idStr.Cmp( classname, ( insert.$ ).classname ) < 0 ) {
				this.next = insert.$;
				insert.$ = this;
				break;
			}
		}
		if ( !insert.$ ) {
			insert.$ = this;
			this.next = null;
		}
	}
////
/////*
////================
////idTypeInfo::~idTypeInfo
////================
////*/
////idTypeInfo::~idTypeInfo() {
////	Shutdown();
////}
////
/*
================
idTypeInfo::Init

Initializes the event callback table for the class.  Creates a 
table for fast lookups of event functions.  Should only be called once.
================
*/
	Init ( ): void {
		var c: idTypeInfo;
		var def: Array<idEventFunc<idClass>>;
		var ev: number; //int						
		var i: number; //int						
		var $set: boolean[];
		var num: number; //int						

		if ( this.eventMap ) {
			// we've already been initialized by a subclass
			return;
		}

		// make sure our superclass is initialized first
		if ( this.$super && !this.$super.eventMap ) {
			this.$super.Init ( );
		}

		// add to our node hierarchy
		if ( this.$super ) {
			this.node.ParentTo( this.$super.node );
		} else {
			this.node.ParentTo( classHierarchy );
		}
		this.node.SetOwner( this );

		// keep track of the number of children below each class
		for ( c = this.$super; c != null; c = c.$super ) {
			c.lastChild++;
		}

		// if we're not adding any new event callbacks, we can just use our superclass's table
		if ( ( !this.eventCallbacks || !this.eventCallbacks[0].event ) && this.$super ) {
			this.eventMap = this.$super.eventMap;
			return;
		}

		// set a flag so we know to delete the eventMap table
		this.freeEventMap = true;

		// Allocate our new table.  It has to have as many entries as there
		// are events.  NOTE: could save some space by keeping track of the maximum
		// event that the class responds to and doing range checking.
		num = idEventDef.NumEventCommands ( );
		this.eventMap = new Array<( ) => void>( num );
		//memset( this.eventMap, 0, sizeof( eventCallback_t ) * num );
		eventCallbackMemory += 4 * num; // sizeof( eventCallback_t ) * num;

		// allocate temporary memory for flags so that the subclass's event callbacks
		// override the superclass's event callback
		$set = new Array<boolean>( num );
		//memset( $set, 0, sizeof( bool ) * num );
		for ( var j = 0; j < $set.length; j++ ) {
			$set[j] = false;
		}

		// go through the inheritence order and copies the event callback function into
		// a list indexed by the event number.  This allows fast lookups of
		// event functions.
		for ( c = this; c != null; c = c.$super ) {
			def = c.eventCallbacks;
			if ( !def ) {
				continue;
			}

			// go through each entry until we hit the NULL terminator
			for ( i = 0; def[i].event /*!= null*/; i++ ) {
				ev = def[i].event.GetEventNum ( );

				if ( $set[ev] ) {
					continue;
				}
				$set[ev] = true;
				this.eventMap[ev] = def[i].$function;
			}
		}

		//delete[] $set;
	}

/////*
////================
////idTypeInfo::Shutdown
////
////Should only be called when DLL or EXE is being shutdown.
////Although it cleans up any allocated memory, it doesn't bother to remove itself 
////from the class list since the program is shutting down.
////================
////*/
////void idTypeInfo::Shutdown() {
////	// free up the memory used for event lookups
////	if ( this.eventMap ) {
////		if ( freeEventMap ) {
////			delete[] this.eventMap;
////		}
////		this.eventMap = NULL;
////	}
////	typeNum = 0;
////	lastChild = 0;
////}
////
}

/////***********************************************************************
////
////  idClass
////
////***********************************************************************/
////
/////*
////================
////CLASS_PROTOTYPE
////
////This macro must be included in the definition of any subclass of idClass.
////It prototypes variables used in class instanciation and type checking.
////Use this on single inheritance concrete classes only.
////================
////*/
////#define CLASS_PROTOTYPE( nameofclass )									\
////public:																	\
////	static	idTypeInfo						Type;						\
////	static	idClass							*CreateInstance( void );	\
////	virtual	idTypeInfo						*GetType( void ) const;		\
////	static	idEventFunc<nameofclass>		eventCallbacks[]
////
/*
================
CLASS_DECLARATION

This macro must be included in the code to properly initialize variables
used in type checking and run-time instanciation.  It also defines the list
of events that the class responds to.  Take special care to ensure that the 
proper superclass is indicated or the run-time type information will be
incorrect.  Use this on concrete classes only.
================
*/
////#define CLASS_DECLARATION( nameofsuperclass, nameofclass )											\
////	idTypeInfo nameofclass::Type( #nameofclass, #nameofsuperclass,									\
////		( idEventFunc<idClass> * )nameofclass::eventCallbacks,	nameofclass::CreateInstance, ( void ( idClass::* )( void ) )&nameofclass::Spawn,	\
////		( void ( idClass::* )( idSaveGame * ) const )&nameofclass::Save, ( void ( idClass::* )( idRestoreGame * ) )&nameofclass::Restore );	\
////	idClass *nameofclass::CreateInstance( void ) {													\
////		try {																						\
////			nameofclass *ptr = new nameofclass;														\
////			ptr->FindUninitializedMemory();															\
////			return ptr;																				\
////		}																							\
////		catch( idAllocError & ) {																	\
////			return NULL;																			\
////		}																							\
////	}																								\
////	idTypeInfo *nameofclass::GetType( void ) const {												\
////		return &( nameofclass::Type );																\
////	}																								\
////idEventFunc<nameofclass> nameofclass::eventCallbacks[] = {

////
/////*
////================
////ABSTRACT_PROTOTYPE
////
////This macro must be included in the definition of any abstract subclass of idClass.
////It prototypes variables used in class instanciation and type checking.
////Use this on single inheritance abstract classes only.
////================
////*/
////#define ABSTRACT_PROTOTYPE( nameofclass )								\
////public:																	\
////	static	idTypeInfo						Type;						\
////	static	idClass							*CreateInstance( void );	\
////	virtual	idTypeInfo						*GetType( void ) const;		\
////	static	idEventFunc<nameofclass>		eventCallbacks[]
////
/////*
////================
////ABSTRACT_DECLARATION
////
////This macro must be included in the code to properly initialize variables
////used in type checking.  It also defines the list of events that the class
////responds to.  Take special care to ensure that the proper superclass is
////indicated or the run-time tyep information will be incorrect.  Use this
////on abstract classes only.
////================
////*/
////#define ABSTRACT_DECLARATION( nameofsuperclass, nameofclass )										\
////	idTypeInfo nameofclass::Type( #nameofclass, #nameofsuperclass,									\
////		( idEventFunc<idClass> * )nameofclass::eventCallbacks, nameofclass::CreateInstance, ( void ( idClass::* )( void ) )&nameofclass::Spawn,	\
////		( void ( idClass::* )( idSaveGame * ) const )&nameofclass::Save, ( void ( idClass::* )( idRestoreGame * ) )&nameofclass::Restore );	\
////	idClass *nameofclass::CreateInstance( void ) {													\
////		gameLocal.Error( "Cannot instanciate abstract class %s.", #nameofclass );					\
////		return NULL;																				\
////	}																								\
////	idTypeInfo *nameofclass::GetType( void ) const {												\
////		return &( nameofclass::Type );																\
////	}																								\
////	idEventFunc<nameofclass> nameofclass::eventCallbacks[] = {
////
////typedef void ( idClass::*classSpawnFunc_t )( void );
////
////class idSaveGame;	
////class idRestoreGame;
////
class idClass {
	////public:
	////	ABSTRACT_PROTOTYPE( idClass );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idClass>[];

	////#ifdef ID_REDIRECT_NEWDELETE
	////#undef new
	////#endif
	////	void *						operator new( size_t );
	////	void *						operator new( size_t s, int, int, char *, int );
	////	void						operator delete( void * );
	////	void						operator delete( void *, int, int, char *, int );
	////#ifdef ID_REDIRECT_NEWDELETE
	////#define new ID_DEBUG_NEW
	////#endif
	////
	////	virtual						~idClass();
	////
	////	void						Spawn( void );
	////	void						CallSpawn( void );
	////	bool						IsType( const idTypeInfo &c ) const;
	////	const char *				GetClassname( void ) const;
	////	const char *				GetSuperclass( void ) const;
	////	void						FindUninitializedMemory( void );
	//
	Save ( savefile: idSaveGame ): void {}
	Restore ( savefile: idRestoreGame ): void {}
	////
	////	bool						RespondsTo( const idEventDef &ev ) const;
	////
	////	bool						PostEventMS( ev: idEventDef, int time );
	////	bool						PostEventMS( ev: idEventDef, int time, idEventArg arg1 );
	////	bool						PostEventMS( ev: idEventDef, int time, idEventArg arg1, idEventArg arg2 );
	////	bool						PostEventMS( ev: idEventDef, int time, idEventArg arg1, idEventArg arg2, idEventArg arg3 );
	////	bool						PostEventMS( ev: idEventDef, int time, idEventArg arg1, idEventArg arg2, idEventArg arg3, idEventArg arg4 );
	////	bool						PostEventMS( ev: idEventDef, int time, idEventArg arg1, idEventArg arg2, idEventArg arg3, idEventArg arg4, idEventArg arg5 );
	////	bool						PostEventMS( ev: idEventDef, int time, idEventArg arg1, idEventArg arg2, idEventArg arg3, idEventArg arg4, idEventArg arg5, idEventArg arg6 );
	////	bool						PostEventMS( ev: idEventDef, int time, idEventArg arg1, idEventArg arg2, idEventArg arg3, idEventArg arg4, idEventArg arg5, idEventArg arg6, idEventArg arg7 );
	////	bool						PostEventMS( ev: idEventDef, int time, idEventArg arg1, idEventArg arg2, idEventArg arg3, idEventArg arg4, idEventArg arg5, idEventArg arg6, idEventArg arg7, idEventArg arg8 );
	////
	////	bool						PostEventSec( ev: idEventDef, float time );
	////	bool						PostEventSec( ev: idEventDef, float time, idEventArg arg1 );
	////	bool						PostEventSec( ev: idEventDef, float time, idEventArg arg1, idEventArg arg2 );
	////	bool						PostEventSec( ev: idEventDef, float time, idEventArg arg1, idEventArg arg2, idEventArg arg3 );
	////	bool						PostEventSec( ev: idEventDef, float time, idEventArg arg1, idEventArg arg2, idEventArg arg3, idEventArg arg4 );
	////	bool						PostEventSec( ev: idEventDef, float time, idEventArg arg1, idEventArg arg2, idEventArg arg3, idEventArg arg4, idEventArg arg5 );
	////	bool						PostEventSec( ev: idEventDef, float time, idEventArg arg1, idEventArg arg2, idEventArg arg3, idEventArg arg4, idEventArg arg5, idEventArg arg6 );
	////	bool						PostEventSec( ev: idEventDef, float time, idEventArg arg1, idEventArg arg2, idEventArg arg3, idEventArg arg4, idEventArg arg5, idEventArg arg6, idEventArg arg7 );
	////	bool						PostEventSec( ev: idEventDef, float time, idEventArg arg1, idEventArg arg2, idEventArg arg3, idEventArg arg4, idEventArg arg5, idEventArg arg6, idEventArg arg7, idEventArg arg8 );
	////
	////	bool						ProcessEvent( ev: idEventDef );
	////	bool						ProcessEvent( ev: idEventDef, idEventArg arg1 );
	////	bool						ProcessEvent( ev: idEventDef, idEventArg arg1, idEventArg arg2 );
	////	bool						ProcessEvent( ev: idEventDef, idEventArg arg1, idEventArg arg2, idEventArg arg3 );
	////	bool						ProcessEvent( ev: idEventDef, idEventArg arg1, idEventArg arg2, idEventArg arg3, idEventArg arg4 );
	////	bool						ProcessEvent( ev: idEventDef, idEventArg arg1, idEventArg arg2, idEventArg arg3, idEventArg arg4, idEventArg arg5 );
	////	bool						ProcessEvent( ev: idEventDef, idEventArg arg1, idEventArg arg2, idEventArg arg3, idEventArg arg4, idEventArg arg5, idEventArg arg6 );
	////	bool						ProcessEvent( ev: idEventDef, idEventArg arg1, idEventArg arg2, idEventArg arg3, idEventArg arg4, idEventArg arg5, idEventArg arg6, idEventArg arg7 );
	////	bool						ProcessEvent( ev: idEventDef, idEventArg arg1, idEventArg arg2, idEventArg arg3, idEventArg arg4, idEventArg arg5, idEventArg arg6, idEventArg arg7, idEventArg arg8 );
	////
	////	bool						ProcessEventArgPtr( ev: idEventDef, int *data );
	////	void						CancelEvents( ev: idEventDef );
	////
	////	void						Event_Remove( void );
	////
	////	// Static functions
	////	static void					Init( void );
	////	static void					Shutdown( void );
	////	static idTypeInfo *			GetClass( const char *name );
	////	static void					DisplayInfo_f( const idCmdArgs &args );
	////	static void					ListClasses_f( const idCmdArgs &args );
	////	static idClass *			CreateInstance( const char *name );
	////	static int					GetNumTypes( void ) { return idClass.types.Num(); }
	////	static int					GetTypeNumBits( void ) { return idClass.typeNumBits; }
	////	static idTypeInfo *			GetType( int num );
	////
	////private:
	////	classSpawnFunc_t			CallSpawnFunc( idTypeInfo *cls );
	////
	////	bool						PostEventArgs( ev: idEventDef, int time, int numargs, ... );
	////	bool						ProcessEventArgs( ev: idEventDef, int numargs, ... );
	////
	////	void						Event_SafeRemove( void );
	////
	static initialized:boolean = false;
	static types = new idList<idTypeInfo>(idTypeInfo);
	static typenums = new idList<idTypeInfo>(idTypeInfo);
	static typeNumBits:number = 0;
	static memused:number = 0;
	static numobjects:number = 0;



////// alphabetical order
////idList<idTypeInfo *>	idClass::types;
////// typenum order
////idList<idTypeInfo *>	idClass::typenums;
////
////
/////*
////================
////idClass::CallSpawn
////================
////*/
////void idClass::CallSpawn( void ) {
////	idTypeInfo *type;
////
////	type = GetType();
////	CallSpawnFunc( type );
////}
////
/////*
////================
////idClass::CallSpawnFunc
////================
////*/
////classSpawnFunc_t idClass::CallSpawnFunc( idTypeInfo *cls ) {
////	classSpawnFunc_t func;
////
////	if ( cls.$super ) {
////		func = CallSpawnFunc( cls.$super );
////		if ( func == cls.Spawn ) {
////			// don't call the same function twice in a row.
////			// this can happen when subclasses don't have their own spawn function.
////			return func;
////		}
////	}
////
////	( this.*cls.Spawn )();
////
////	return cls.Spawn;
////}

/*
================
idClass::FindUninitializedMemory
================
*/
	FindUninitializedMemory ( ): void {
//#ifdef ID_DEBUG_UNINITIALIZED_MEMORY
//	unsigned long *ptr = ( ( unsigned long * )this ) - 1;
//	int size = *ptr;
//	assert( ( size & 3 ) == 0 );
//	size >>= 2;
//	for ( int i = 0; i < size; i++ ) {
//		if ( ptr[i] == 0xcdcdcdcd ) {
//			const char *varName = GetTypeVariableName( GetClassname(), i << 2 );
//			gameLocal.Warning( "type '%s' has uninitialized variable %s (offset %d)", GetClassname(), varName, i << 2 );
//		}
//	}
//#endif
	}

/*
================
idClass::Spawn
================
*/
	Spawn ( ): void {
	}
////
/////*
////================
////idClass::~idClass
////
////Destructor for object.  Cancels any events that depend on this object.
////================
////*/
////idClass::~idClass() {
////	idEvent::CancelEvents( this );
////}
////
/////*
////================
////idClass::DisplayInfo_f
////================
////*/
////void idClass::DisplayInfo_f( const idCmdArgs &args ) {
////	gameLocal.Printf( "Class memory status: %i bytes allocated in %i objects\n", memused, numobjects );
////}
////
/////*
////================
////idClass::ListClasses_f
////================
////*/
////void idClass::ListClasses_f( const idCmdArgs &args ) {
////	int			i;
////	idTypeInfo *type;
////
////	gameLocal.Printf( "%-24s %-24s %-6s %-6s\n", "Classname", "Superclass", "Type", "Subclasses" );
////	gameLocal.Printf( "----------------------------------------------------------------------\n" );
////
////	for( i = 0; i < idClass.types.Num(); i++ ) {
////		type = idClass.types[ i ];
////		gameLocal.Printf( "%-24s %-24s %6d %6d\n", type.classname, type.superclass, type.typeNum, type.lastChild - type.typeNum );
////	}
////
////	gameLocal.Printf( "...%d classes", idClass.types.Num() );
////}
////
/////*
////================
////idClass::CreateInstance
////================
////*/
////idClass *idClass::CreateInstance( const char *name ) {
////	const idTypeInfo	*type;
////	idClass				*obj;
////
////	type = idClass::GetClass( name );
////	if ( !type ) {
////		return NULL;
////	}
////
////	obj = type.CreateInstance();
////	return obj;
////}

/*
================
idClass::Init

Should be called after all idTypeInfos are initialized, so must be called
manually upon game code initialization.  Tells all the idTypeInfos to initialize
their event callback table for the associated class.  This should only be called
once during the execution of the program or DLL.
================
*/
	static Init ( ): void {
		var c: idTypeInfo ;
		var num:number;

		gameLocal.Printf( "Initializing class hierarchy\n" );

		if ( idClass.initialized ) {
			gameLocal.Printf( "...already initialized\n" );
			return;
		}

		// init the event callback tables for all the classes
		assert( typelist );
		for ( c = typelist.$; c != null; c = c.next ) {
			c.Init ( );
		}

		// number the types according to the class hierarchy so we can quickly determine if a class
		// is a subclass of another
		num = 0;
		for ( c = classHierarchy.GetNext ( ); c != null; c = c.node.GetNext ( ), num++ ) {
			c.typeNum = num;
			c.lastChild += num;
		}
		
		// number of bits needed to send types over network
		idClass.typeNumBits = idMath.BitsForInteger( num );
		
		// create a list of the types so we can do quick lookups
		// one list in alphabetical order, one in typenum order
		idClass.types.SetGranularity(1);
		idClass.types.SetNum(num);
		idClass.typenums.SetGranularity(1);
		idClass.typenums.SetNum( num );
		num = 0;
		for ( c = typelist.$; c != null; c = c.next, num++ ) {
			idClass.types[num] = c;
			idClass.typenums[c.typeNum] = c;
		}
		
		idClass.initialized = true;
		
		gameLocal.Printf("...%i classes, %i bytes for event callbacks\n", idClass.types.Num ( ), eventCallbackMemory );
	}
////
/////*
////================
////idClass::Shutdown
////================
////*/
////void idClass::Shutdown( void ) {
////	idTypeInfo	*c;
////
////	for( c = typelist; c != NULL; c = c.next ) {
////		c.Shutdown();
////	}
////	types.Clear();
////	typenums.Clear();
////
////	idClass.initialized = false;
////}
////
/////*
////================
////idClass::new
////================
////*/
////#ifdef ID_DEBUG_MEMORY
////#undef new
////#endif
////
////void * idClass::operator new( size_t s ) {
////	int *p;
////
////	s += sizeof( int );
////	p = (int *)Mem_Alloc( s );
////	*p = s;
////	memused += s;
////	numobjects++;
////
////#ifdef ID_DEBUG_UNINITIALIZED_MEMORY
////	unsigned long *ptr = (unsigned long *)p;
////	int size = s;
////	assert( ( size & 3 ) == 0 );
////	size >>= 3;
////	for ( int i = 1; i < size; i++ ) {
////		ptr[i] = 0xcdcdcdcd;
////	}
////#endif
////
////	return p + 1;
////}
////
////void * idClass::operator new( size_t s, int, int, char *, int ) {
////	int *p;
////
////	s += sizeof( int );
////	p = (int *)Mem_Alloc( s );
////	*p = s;
////	memused += s;
////	numobjects++;
////
////#ifdef ID_DEBUG_UNINITIALIZED_MEMORY
////	unsigned long *ptr = (unsigned long *)p;
////	int size = s;
////	assert( ( size & 3 ) == 0 );
////	size >>= 3;
////	for ( int i = 1; i < size; i++ ) {
////		ptr[i] = 0xcdcdcdcd;
////	}
////#endif
////
////	return p + 1;
////}
////
////#ifdef ID_DEBUG_MEMORY
////#define new ID_DEBUG_NEW
////#endif
////
/////*
////================
////idClass::delete
////================
////*/
////void idClass::operator delete( void *ptr ) {
////	int *p;
////
////	if ( ptr ) {
////		p = ( ( int * )ptr ) - 1;
////		memused -= *p;
////		numobjects--;
////        Mem_Free( p );
////	}
////}
////
////void idClass::operator delete( void *ptr, int, int, char *, int ) {
////	int *p;
////
////	if ( ptr ) {
////		p = ( ( int * )ptr ) - 1;
////		memused -= *p;
////		numobjects--;
////        Mem_Free( p );
////	}
////}

/*
================
idClass::GetClass

Returns the idTypeInfo for the name of the class passed in.  This is a static function
so it must be called as idClass::GetClass( classname )
================
*/
	static GetClass ( name: string ): idTypeInfo {
		var c: idTypeInfo;
		var order: number; //int			
		var mid: number; //int			
		var min: number; //int			
		var max: number; //int			

		if ( !idClass.initialized ) {
			// idClass::Init hasn't been called yet, so do a slow lookup
			for ( c = typelist.$; c /*!= NULL*/; c = c.next ) {
				if ( !idStr.Cmp( c.classname, name ) ) {
					return c;
				}
			}
		} else {
			// do a binary search through the list of types
			min = 0;
			max = idClass.types.Num ( ) - 1;
			while ( min <= max ) {
				mid = ( min + max ) / 2;
				c = idClass.types[mid];
				order = idStr.Cmp( c.classname, name );
				if ( !order ) {
					return c;
				} else if ( order > 0 ) {
					max = mid - 1;
				} else {
					min = mid + 1;
				}
			}
		}

		return null;
	}

////
/////*
////================
////idClass::GetType
////================
////*/
////idTypeInfo *idClass::GetType( const int typeNum ) {
////	idTypeInfo *c;
////
////	if ( !idClass.initialized ) {
////		for( c = typelist; c != NULL; c = c.next ) {
////			if ( c.typeNum == typeNum ) {
////				return c;
////			}
////		}
////	} else if ( ( typeNum >= 0 ) && ( typeNum < idClass.types.Num() ) ) {
////		return typenums[ typeNum ];
////	}
////
////	return NULL;
////}
////
/////*
////================
////idClass::GetClassname
////
////Returns the text classname of the object.
////================
////*/
////const char *idClass::GetClassname( void ) const {
////	idTypeInfo *type;
////
////	type = GetType();
////	return type.classname;
////}
////
/////*
////================
////idClass::GetSuperclass
////
////Returns the text classname of the superclass.
////================
////*/
////const char *idClass::GetSuperclass( void ) const {
////	idTypeInfo *cls;
////
////	cls = GetType();
////	return cls.superclass;
////}
////
/////*
////================
////idClass::CancelEvents
////================
////*/
////void idClass::CancelEvents( ev: idEventDef ) {
////	idEvent::CancelEvents( this, ev );
////}

/*
================
idClass::PostEventArgs
================
*/
	PostEventArgs( ev: idEventDef, /*int */time: number, /*int */numargs:number, ...args:any[] ):boolean {
		todoThrow();
////	idTypeInfo	*c;
////	idEvent		*event;
////	va_list		args;
////	
////	assert( ev );
////	
////	if ( !idEvent::initialized ) {
////		return false;
////	}
////
////	c = GetType();
////	if ( !c.eventMap[ ev.GetEventNum() ] ) {
////		// we don't respond to this event, so ignore it
////		return false;
////	}
////
////	// we service events on the client to avoid any bad code filling up the event pool
////	// we don't want them processed usually, unless when the map is (re)loading.
////	// we allow threads to run fine, though.
////	if ( gameLocal.isClient && ( gameLocal.GameState() != GAMESTATE_STARTUP ) && !IsType( idThread::Type ) ) {
////		return true;
////	}
////
////	va_start( args, numargs );
////	event = idEvent::Alloc( ev, numargs, args );
////	va_end( args );
////
////	event.Schedule( this, c, time );
////
	return true;
}

/*
================
idClass::PostEventMS
================
*/
	PostEventMS ( ev: idEventDef, /*int */time: number ): boolean {
		return this.PostEventArgs( ev, time, 0 );
	}

/*
================
idClass::PostEventMS
================
*/
	//PostEventMS ( ev: idEventDef, /*int */time: number, arg1: idEventArg ): boolean {
	//	return this.PostEventArgs( ev, time, 1, arg1 );
	//}
////
/////*
////================
////idClass::PostEventMS
////================
////*/
////bool idClass::PostEventMS( ev: idEventDef, /*int */time:number, idEventArg arg1, idEventArg arg2 ): boolean  {
////	return PostEventArgs( ev, time, 2, &arg1, &arg2 );
////}
////
/////*
////================
////idClass::PostEventMS
////================
////*/
////bool idClass::PostEventMS( ev: idEventDef, /*int */time:number, idEventArg arg1, idEventArg arg2, idEventArg arg3 ): boolean  {
////	return PostEventArgs( ev, time, 3, &arg1, &arg2, &arg3 );
////}
////
/////*
////================
////idClass::PostEventMS
////================
////*/
////bool idClass::PostEventMS( ev: idEventDef, /*int */time:number, idEventArg arg1, idEventArg arg2, idEventArg arg3, idEventArg arg4 ): boolean  {
////	return PostEventArgs( ev, time, 4, &arg1, &arg2, &arg3, &arg4 );
////}
////
/////*
////================
////idClass::PostEventMS
////================
////*/
////bool idClass::PostEventMS( ev: idEventDef, /*int */time:number, idEventArg arg1, idEventArg arg2, idEventArg arg3, idEventArg arg4, idEventArg arg5 ): boolean  {
////	return PostEventArgs( ev, time, 5, &arg1, &arg2, &arg3, &arg4, &arg5 );
////}
////
/////*
////================
////idClass::PostEventMS
////================
////*/
////bool idClass::PostEventMS( ev: idEventDef, /*int */time:number, idEventArg arg1, idEventArg arg2, idEventArg arg3, idEventArg arg4, idEventArg arg5, idEventArg arg6 ): boolean  {
////	return PostEventArgs( ev, time, 6, &arg1, &arg2, &arg3, &arg4, &arg5, &arg6 );
////}
////
/////*
////================
////idClass::PostEventMS
////================
////*/
////bool idClass::PostEventMS( ev: idEventDef, /*int */time:number, idEventArg arg1, idEventArg arg2, idEventArg arg3, idEventArg arg4, idEventArg arg5, idEventArg arg6, idEventArg arg7 ): boolean  {
////	return PostEventArgs( ev, time, 7, &arg1, &arg2, &arg3, &arg4, &arg5, &arg6, &arg7 );
////}
////
/////*
////================
////idClass::PostEventMS
////================
////*/
////bool idClass::PostEventMS( ev: idEventDef, /*int */time:number, idEventArg arg1, idEventArg arg2, idEventArg arg3, idEventArg arg4, idEventArg arg5, idEventArg arg6, idEventArg arg7, idEventArg arg8 ): boolean  {
////	return PostEventArgs( ev, time, 8, &arg1, &arg2, &arg3, &arg4, &arg5, &arg6, &arg7, &arg8 );
////}
////
/////*
////================
////idClass::PostEventSec
////================
////*/
////bool idClass::PostEventSec( ev: idEventDef, float time ): boolean  {
////	return PostEventArgs( ev, SEC2MS( time ), 0 );
////}
////
/////*
////================
////idClass::PostEventSec
////================
////*/
////bool idClass::PostEventSec( ev: idEventDef, float time, idEventArg arg1 ): boolean  {
////	return PostEventArgs( ev, SEC2MS( time ), 1, &arg1 );
////}
////
/////*
////================
////idClass::PostEventSec
////================
////*/
////bool idClass::PostEventSec( ev: idEventDef, float time, idEventArg arg1, idEventArg arg2 ): boolean  {
////	return PostEventArgs( ev, SEC2MS( time ), 2, &arg1, &arg2 );
////}
////
/////*
////================
////idClass::PostEventSec
////================
////*/
////bool idClass::PostEventSec( ev: idEventDef, float time, idEventArg arg1, idEventArg arg2, idEventArg arg3 ): boolean  {
////	return PostEventArgs( ev, SEC2MS( time ), 3, &arg1, &arg2, &arg3 );
////}
////
/////*
////================
////idClass::PostEventSec
////================
////*/
////bool idClass::PostEventSec( ev: idEventDef, float time, idEventArg arg1, idEventArg arg2, idEventArg arg3, idEventArg arg4 ): boolean  {
////	return PostEventArgs( ev, SEC2MS( time ), 4, &arg1, &arg2, &arg3, &arg4 );
////}
////
/////*
////================
////idClass::PostEventSec
////================
////*/
////bool idClass::PostEventSec( ev: idEventDef, float time, idEventArg arg1, idEventArg arg2, idEventArg arg3, idEventArg arg4, idEventArg arg5 ): boolean  {
////	return PostEventArgs( ev, SEC2MS( time ), 5, &arg1, &arg2, &arg3, &arg4, &arg5 );
////}
////
/////*
////================
////idClass::PostEventSec
////================
////*/
////bool idClass::PostEventSec( ev: idEventDef, float time, idEventArg arg1, idEventArg arg2, idEventArg arg3, idEventArg arg4, idEventArg arg5, idEventArg arg6 ): boolean  {
////	return PostEventArgs( ev, SEC2MS( time ), 6, &arg1, &arg2, &arg3, &arg4, &arg5, &arg6 );
////}
////
/////*
////================
////idClass::PostEventSec
////================
////*/
////bool idClass::PostEventSec( ev: idEventDef, float time, idEventArg arg1, idEventArg arg2, idEventArg arg3, idEventArg arg4, idEventArg arg5, idEventArg arg6, idEventArg arg7 ): boolean  {
////	return PostEventArgs( ev, SEC2MS( time ), 7, &arg1, &arg2, &arg3, &arg4, &arg5, &arg6, &arg7 );
////}
////
/////*
////================
////idClass::PostEventSec
////================
////*/
////bool idClass::PostEventSec( ev: idEventDef, float time, idEventArg arg1, idEventArg arg2, idEventArg arg3, idEventArg arg4, idEventArg arg5, idEventArg arg6, idEventArg arg7, idEventArg arg8 ): boolean  {
////	return PostEventArgs( ev, SEC2MS( time ), 8, &arg1, &arg2, &arg3, &arg4, &arg5, &arg6, &arg7, &arg8 );
////}
////
/////*
////================
////idClass::ProcessEventArgs
////================
////*/
////bool idClass::ProcessEventArgs( ev: idEventDef, int numargs, ... ): boolean  {
////	idTypeInfo	*c;
////	int			num;
////	int			data[ D_EVENT_MAXARGS ];
////	va_list		args;
////	
////	assert( ev );
////	assert( idEvent::initialized );
////
////	c = GetType();
////	num = ev.GetEventNum();
////	if ( !c.eventMap[ num ] ) {
////		// we don't respond to this event, so ignore it
////		return false;
////	}
////
////	va_start( args, numargs );
////	idEvent::CopyArgs( ev, numargs, args, data );
////	va_end( args );
////
////	ProcessEventArgPtr( ev, data );
////
////	return true;
////}
////
/////*
////================
////idClass::ProcessEvent
////================
////*/
////bool idClass::ProcessEvent( ev: idEventDef ): boolean  {
////	return ProcessEventArgs( ev, 0 );
////}
////
/////*
////================
////idClass::ProcessEvent
////================
////*/
////bool idClass::ProcessEvent( ev: idEventDef, idEventArg arg1 ): boolean  {
////	return ProcessEventArgs( ev, 1, &arg1 );
////}
////
/////*
////================
////idClass::ProcessEvent
////================
////*/
////bool idClass::ProcessEvent( ev: idEventDef, idEventArg arg1, idEventArg arg2 ): boolean  {
////	return ProcessEventArgs( ev, 2, &arg1, &arg2 );
////}
////
/////*
////================
////idClass::ProcessEvent
////================
////*/
////bool idClass::ProcessEvent( ev: idEventDef, idEventArg arg1, idEventArg arg2, idEventArg arg3 ): boolean  {
////	return ProcessEventArgs( ev, 3, &arg1, &arg2, &arg3 );
////}
////
/////*
////================
////idClass::ProcessEvent
////================
////*/
////bool idClass::ProcessEvent( ev: idEventDef, idEventArg arg1, idEventArg arg2, idEventArg arg3, idEventArg arg4 ): boolean  {
////	return ProcessEventArgs( ev, 4, &arg1, &arg2, &arg3, &arg4 );
////}
////
/////*
////================
////idClass::ProcessEvent
////================
////*/
////bool idClass::ProcessEvent( ev: idEventDef, idEventArg arg1, idEventArg arg2, idEventArg arg3, idEventArg arg4, idEventArg arg5 ): boolean  {
////	return ProcessEventArgs( ev, 5, &arg1, &arg2, &arg3, &arg4, &arg5 );
////}
////
/////*
////================
////idClass::ProcessEvent
////================
////*/
////bool idClass::ProcessEvent( ev: idEventDef, idEventArg arg1, idEventArg arg2, idEventArg arg3, idEventArg arg4, idEventArg arg5, idEventArg arg6 ): boolean  {
////	return ProcessEventArgs( ev, 6, &arg1, &arg2, &arg3, &arg4, &arg5, &arg6 );
////}
////
/////*
////================
////idClass::ProcessEvent
////================
////*/
////bool idClass::ProcessEvent( ev: idEventDef, idEventArg arg1, idEventArg arg2, idEventArg arg3, idEventArg arg4, idEventArg arg5, idEventArg arg6, idEventArg arg7 ): boolean  {
////	return ProcessEventArgs( ev, 7, &arg1, &arg2, &arg3, &arg4, &arg5, &arg6, &arg7 );
////}
////
/////*
////================
////idClass::ProcessEvent
////================
////*/
////bool idClass::ProcessEvent( ev: idEventDef, idEventArg arg1, idEventArg arg2, idEventArg arg3, idEventArg arg4, idEventArg arg5, idEventArg arg6, idEventArg arg7, idEventArg arg8 ): boolean  {
////	return ProcessEventArgs( ev, 8, &arg1, &arg2, &arg3, &arg4, &arg5, &arg6, &arg7, &arg8 );
////}
////
/////*
////================
////idClass::ProcessEventArgPtr
////================
////*/
////bool idClass::ProcessEventArgPtr( ev: idEventDef, int *data ): boolean  {
////	idTypeInfo	*c;
////	int			num;
////	eventCallback_t	callback;
////
////	assert( ev );
////	assert( idEvent::initialized );
////
////	if ( g_debugTriggers.GetBool() && ( ev == &EV_Activate ) && IsType( idEntity::Type ) ) {
////		const idEntity *ent = *reinterpret_cast<idEntity **>( data );
////		gameLocal.Printf( "%d: '%s' activated by '%s'\n", gameLocal.framenum, static_cast<idEntity *>( this ).GetName(), ent ? ent.GetName() : "NULL" );
////	}
////
////	c = GetType();
////	num = ev.GetEventNum();
////	if ( !c.eventMap[ num ] ) {
////		// we don't respond to this event, so ignore it
////		return false;
////	}
////
////	callback = c.eventMap[ num ];
////
////#if !CPU_EASYARGS
////
/////*
////on ppc architecture, floats are passed in a seperate set of registers
////the function prototypes must have matching float declaration
////
////http://developer.apple.com/documentation/DeveloperTools/Conceptual/MachORuntime/2rt_powerpc_abi/chapter_9_section_5.html
////*/
////
////	switch( ev.GetFormatspecIndex() ) {
////	case 1 << D_EVENT_MAXARGS :
////		( this.*callback )();
////		break;
////
////// generated file - see CREATE_EVENT_CODE
////#include "Callbacks.cpp"
////
////	default:
////		gameLocal.Warning( "Invalid formatspec on event '%s'", ev.GetName() );
////		break;
////	}
////
////#else
////
////	assert( D_EVENT_MAXARGS == 8 );
////
////	switch( ev.GetNumArgs() ) {
////	case 0 :
////		( this.*callback )();
////		break;
////
////	case 1 :
////		typedef void ( idClass::*eventCallback_1_t )( const int );
////		( this.*( eventCallback_1_t )callback )( data[ 0 ] );
////		break;
////
////	case 2 :
////		typedef void ( idClass::*eventCallback_2_t )( const int, const int );
////		( this.*( eventCallback_2_t )callback )( data[ 0 ], data[ 1 ] );
////		break;
////
////	case 3 :
////		typedef void ( idClass::*eventCallback_3_t )( const int, const int, const int );
////		( this.*( eventCallback_3_t )callback )( data[ 0 ], data[ 1 ], data[ 2 ] );
////		break;
////
////	case 4 :
////		typedef void ( idClass::*eventCallback_4_t )( const int, const int, const int, const int );
////		( this.*( eventCallback_4_t )callback )( data[ 0 ], data[ 1 ], data[ 2 ], data[ 3 ] );
////		break;
////
////	case 5 :
////		typedef void ( idClass::*eventCallback_5_t )( const int, const int, const int, const int, const int );
////		( this.*( eventCallback_5_t )callback )( data[ 0 ], data[ 1 ], data[ 2 ], data[ 3 ], data[ 4 ] );
////		break;
////
////	case 6 :
////		typedef void ( idClass::*eventCallback_6_t )( const int, const int, const int, const int, const int, const int );
////		( this.*( eventCallback_6_t )callback )( data[ 0 ], data[ 1 ], data[ 2 ], data[ 3 ], data[ 4 ], data[ 5 ] );
////		break;
////
////	case 7 :
////		typedef void ( idClass::*eventCallback_7_t )( const int, const int, const int, const int, const int, const int, const int );
////		( this.*( eventCallback_7_t )callback )( data[ 0 ], data[ 1 ], data[ 2 ], data[ 3 ], data[ 4 ], data[ 5 ], data[ 6 ] );
////		break;
////
////	case 8 :
////		typedef void ( idClass::*eventCallback_8_t )( const int, const int, const int, const int, const int, const int, const int, const int );
////		( this.*( eventCallback_8_t )callback )( data[ 0 ], data[ 1 ], data[ 2 ], data[ 3 ], data[ 4 ], data[ 5 ], data[ 6 ], data[ 7 ] );
////		break;
////
////	default:
////		gameLocal.Warning( "Invalid formatspec on event '%s'", ev.GetName() );
////		break;
////	}
////
////#endif
////
////	return true;
////}
////
/*
================
idClass::Event_Remove
================
*/
	Event_Remove ( ): void {
		todoThrow( "erm?" );
		delete this;
	}

/*
================
idClass::Event_SafeRemove
================
*/
	Event_SafeRemove ( ): void {
		// Forces the remove to be done at a safe time
		this.PostEventMS(  EV_Remove, 0 );
	}

	/////*
	////================
	////idClass::IsType
	////
	////Checks if the object's class is a subclass of the class defined by the 
	////passed in idTypeInfo.
	////================
	////*/
	////ID_INLINE bool idClass::IsType( const idTypeInfo &superclass ) const {
	////	idTypeInfo *subclass;
	////
	////	subclass = GetType();
	////	return subclass->IsType( superclass );
	////}
	////
	/////*
	////================
	////idClass::RespondsTo
	////================
	////*/
	////ID_INLINE bool idClass::RespondsTo( const idEventDef &ev ) const {
	////	const idTypeInfo *c;
	////
	////	assert( idEvent::initialized );
	////	c = GetType();
	////	return c->RespondsTo( ev );
	////}
	////
	////#endif /* !__SYS_CLASS_H__ */
}

var EV_Remove = new idEventDef( "<immediateremove>", null );
var EV_SafeRemove = new idEventDef("remove", null );

//ABSTRACT_DECLARATION( NULL, idClass )
idClass.CreateInstance = function ( ): idClass {
	gameLocal.Error( "Cannot instanciate abstract class %s.", idClass );
	return null;
};

idClass.prototype.GetType = function ( ): idTypeInfo {
	return ( idClass.Type );
};

idClass.eventCallbacks = [
	new idEventFunc( EV_Remove, idClass.prototype.Event_Remove ),
	new idEventFunc( EV_SafeRemove, idClass.prototype.Event_SafeRemove ),
];

idClass.Type = new idTypeInfo( "idClass", "null",
	idClass.eventCallbacks, idClass.CreateInstance, idClass.prototype.Spawn,
	idClass.prototype.Save, idClass.prototype.Restore );
