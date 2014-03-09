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

// simple types.  function types are dynamically allocated
var type_void  = new idTypeDef(etype_t.ev_void, def_void, "void", 0, null);
var	type_scriptevent = new idTypeDef(etype_t.ev_scriptevent, def_scriptevent, "scriptevent", /* sizeof( void *)*/4, null);
var	type_namespace = new idTypeDef(etype_t.ev_namespace, def_namespace, "namespace", /* sizeof( void *)*/4, null);
var	type_string = new idTypeDef(etype_t.ev_string, def_string, "string", MAX_STRING_LEN, null);
var	type_float = new idTypeDef(etype_t.ev_float, def_float, "float", /*sizeof(float)*/4, null);
var	type_vector = new idTypeDef(etype_t.ev_vector, def_vector, "vector", /*sizeof(idVec3)*/12, null);
var	type_entity = new idTypeDef(etype_t.ev_entity, def_entity, "entity", /*sizeof( int *)*/4, null);					// stored as entity number pointer
var	type_field = new idTypeDef(etype_t.ev_field, def_field, "field", /* sizeof( void *)*/4, null);
var	type_function = new idTypeDef(etype_t.ev_function, def_function, "function", /* sizeof( void *)*/4, type_void);
var	type_virtualfunction = new idTypeDef(etype_t.ev_virtualfunction, def_virtualfunction, "virtual function", /*sizeof(int)*/4, null);
var	type_pointer = new idTypeDef(etype_t.ev_pointer, def_pointer, "pointer", /* sizeof( void *)*/4, null);
var	type_object = new idTypeDef(etype_t.ev_object, def_object, "object", /*sizeof( int *)*/4, null);					// stored as entity number pointer
var	type_jumpoffset = new idTypeDef(etype_t.ev_jumpoffset, def_jumpoffset, "<jump>", /*sizeof(int)*/4, null);		// only used for jump opcodes
var	type_argsize = new idTypeDef(etype_t.ev_argsize, def_argsize, "<argsize>", /*sizeof(int)*/4, null);				// only used for function call and thread opcodes
var	type_boolean = new idTypeDef(etype_t.ev_boolean, def_boolean, "boolean", /*sizeof(int)*/4, null);

var	def_void = new idVarDef( type_void );
var	def_scriptevent = new idVarDef( type_scriptevent );
var	def_namespace = new idVarDef( type_namespace );
var	def_string = new idVarDef( type_string );
var	def_float = new idVarDef( type_float );
var	def_vector = new idVarDef( type_vector );
var	def_entity = new idVarDef( type_entity );
var	def_field = new idVarDef( type_field );
var	def_function = new idVarDef( type_function );
var	def_virtualfunction = new idVarDef( type_virtualfunction );
var	def_pointer = new idVarDef( type_pointer );
var	def_object = new idVarDef( type_object );
var	def_jumpoffset = new idVarDef( type_jumpoffset );		// only used for jump opcodes
var	def_argsize = new idVarDef( type_argsize );
var	def_boolean = new idVarDef( type_boolean );
//
///***********************************************************************
//
//  function_t
//
//***********************************************************************/
//
class function_t {
//public:
//						function_t();
//
//	size_t				Allocated( void ) const;
//	void				SetName( name:string );
//	const char			*Name( void ) const;
//	void				Clear( void );
//
//private:
	name = new idStr;
//public:
	eventdef: idEventDef;
	def: idVarDef;
	type: idTypeDef;
	firstStatement:number;											//	int 				
	numStatements: number;											//	int 				
	parmTotal: number;												//	int 				
	locals: number; 			// total ints of parms + locals		//	int 				
	filenum: number; 			// source file defined in			//	int					
	parmSize = new	idList<number>(Number);

///*
//================
//function_t::function_t
//================
//*/
//function_t::function_t() {
//	Clear();
//}
//
/*
================
function_t::Allocated
================
*/
	Allocated ( ): number {
		return this.name.Allocated ( ) + this.parmSize.Allocated ( );
	}

/*
================
function_t::SetName
================
*/
	SetName ( name: string ): void {
		this.name.equals( name );
	}

/*
================
function_t::Name
================
*/
	Name ( ): string {
		return this.name.data;
	}

///*
//================
//function_t::Clear
//================
//*/
//void function_t::Clear( void ) {
//	eventdef		= null;
//	def				= null;
//	type			= null;
//	firstStatement	= 0;
//	numStatements	= 0;
//	parmTotal		= 0;
//	locals			= 0;
//	filenum			= 0;
//	name.Clear();
//	parmSize.Clear();
//}
}


/***********************************************************************

  idVarDefName

***********************************************************************/

class idVarDefName {
//public:
//							idVarDefName( void ) { defs = null; }
//							idVarDefName( const char *n ) { name = n; defs = null; }
	constructor ( n: string = null ) {
		this.name.equals( n || "" );
		this.defs = null;
	}
//
	Name ( ): string { return this.name.data; }
	GetDefs ( ): idVarDef { return this.defs; }
//
//	void					AddDef( idVarDef *def );
//	void					RemoveDef( idVarDef *def );
//
//private:
	name = new idStr;
	defs: idVarDef;
//};
	/*
============
idVarDefName::AddDef
============
*/
	AddDef ( def: idVarDef ): void {
		assert( def.next == null );
		def.name = this;
		def.next = this.defs;
		this.defs = def;
		dlog(DEBUG_COMPILER, "AddDef %s num: %i\n", def.Name(), def.num);
	}

/*
============
idVarDefName::RemoveDef
============
*/
	RemoveDef(def: idVarDef): void {
		dlog( DEBUG_COMPILER, "RemoveDef %s num: %i\n", def.Name ( ), def.num );
		if ( this.defs == def ) {
			this.defs = def.next;
		} else {
			for ( var d = this.defs; d.next != null; d = d.next ) {
				if ( d.next == def ) {
					d.next = def.next;
					if (def.next)
						dlog(DEBUG_COMPILER, "RemoveDef next %s: %i\n", def.next.Name(), def.next.num);
					else
						dlog(DEBUG_COMPILER, "RemoveDef next: null\n");
					break;
				}
			}
		}
		def.next = null;
		def.name = null;
	}
}

//
///***********************************************************************
//
//  idScriptObject
//
//***********************************************************************/
//
///*
//============
//idScriptObject::idScriptObject
//============
//*/
//idScriptObject::idScriptObject() {
//	data = null;
//	type = &type_object;
//}
//
///*
//============
//idScriptObject::~idScriptObject
//============
//*/
//idScriptObject::~idScriptObject() {
//	Free();
//}
//
///*
//============
//idScriptObject::Free
//============
//*/
//void idScriptObject::Free( void ) {
//	if ( data ) {
//		Mem_Free( data );
//	}
//
//	data = null;
//	type = &type_object;
//}
//
///*
//================
//idScriptObject::Save
//================
//*/
//void idScriptObject::Save( idSaveGame *savefile ) const {
//	size_t size;
//
//	if ( type == &type_object && data == null ) {
//		// Write empty string for uninitialized object
//		savefile.WriteString( "" );
//	} else {
//		savefile.WriteString( type.Name() );
//		size = type.Size();
//		savefile.WriteInt( size );
//		savefile.Write( data, size );
//	}
//}
//
///*
//================
//idScriptObject::Restore
//================
//*/
//void idScriptObject::Restore( idRestoreGame *savefile ) {
//	idStr typeName;
//	size_t size;
//
//	savefile.ReadString( typeName );
//
//	// Empty string signals uninitialized object
//	if ( typeName.Length() == 0 ) {
//		return;
//	}
//
//	if ( !SetType( typeName ) ) {
//		savefile.Error( "idScriptObject::Restore: failed to restore object of type '%s'.", typeName.c_str() );
//	}
//
//	savefile.ReadInt( (int &)size );
//	if ( size != type.Size() ) {
//		savefile.Error( "idScriptObject::Restore: size of object '%s' doesn't match size in save game.", typeName.c_str() );
//	}
//
//	savefile.Read( data, size );
//}
//
///*
//============
//idScriptObject::SetType
//
//Allocates an object and initializes memory.
//============
//*/
//bool idScriptObject::SetType( const char *typeName ) {
//	size_t size;
//	idTypeDef *newtype;
//
//	// lookup the type
//	newtype = gameLocal.program.FindType( typeName );
//
//	// only allocate memory if the object type changes
//	if ( newtype != type ) {	
//		Free();
//		if ( !newtype ) {
//			gameLocal.Warning( "idScriptObject::SetType: Unknown type '%s'", typeName );
//			return false;
//		}
//
//		if ( !newtype.Inherits( &type_object ) ) {
//			gameLocal.Warning( "idScriptObject::SetType: Can't create object of type '%s'.  Must be an object type.", newtype.Name() );
//			return false;
//		}
//
//		// set the type
//		type = newtype;
//
//		// allocate the memory
//		size = type.Size();
//		data = ( byte * )Mem_Alloc( size );
//	}
//
//	// init object memory
//	ClearObject();
//
//	return true;
//}
//
///*
//============
//idScriptObject::ClearObject
//
//Resets the memory for the script object without changing its type.
//============
//*/
//void idScriptObject::ClearObject( void ) {
//	size_t size;
//
//	if ( type != &type_object ) {
//		// init object memory
//		size = type.Size();
//		memset( data, 0, size );
//	}
//}
//
///*
//============
//idScriptObject::HasObject
//============
//*/
//bool idScriptObject::HasObject( void ) const {
//	return ( type != &type_object );
//}
//
///*
//============
//idScriptObject::GetTypeDef
//============
//*/
//idTypeDef *idScriptObject::GetTypeDef( void ) const {
//	return type;
//}
//
///*
//============
//idScriptObject::GetTypeName
//============
//*/
//const char *idScriptObject::GetTypeName( void ) const {
//	return type.Name();
//}
//
///*
//============
//idScriptObject::GetConstructor
//============
//*/
//const function_t *idScriptObject::GetConstructor( void ) const {
//	const function_t *func;
//
//	func = GetFunction( "init" );
//	return func;
//}
//
///*
//============
//idScriptObject::GetDestructor
//============
//*/
//const function_t *idScriptObject::GetDestructor( void ) const {
//	const function_t *func;
//
//	func = GetFunction( "destroy" );
//	return func;
//}
//
///*
//============
//idScriptObject::GetFunction
//============
//*/
//const function_t *idScriptObject::GetFunction( name:string ) const {
//	const function_t *func;
//
//	if ( type == &type_object ) {
//		return null;
//	}
//
//	func = gameLocal.program.FindFunction( name, type );
//	return func;
//}
//
///*
//============
//idScriptObject::GetVariable
//============
//*/
//byte *idScriptObject::GetVariable( name:string, etype_t etype ) const {
//	int				i;
//	int				pos;
//	const idTypeDef	*t;
//	const idTypeDef	*parm;
//
//	if ( type == &type_object ) {
//		return null;
//	}
//
//	t = type;
//	do {
//		if ( t.SuperClass() != &type_object ) {
//			pos = t.SuperClass().Size();
//		} else {
//			pos = 0;
//		}
//		for( i = 0; i < t.NumParameters(); i++ ) {
//			parm = t.GetParmType( i );
//			if ( !strcmp( t.GetParmName( i ), name ) ) {
//				if ( etype != parm.FieldType().Type() ) {
//					return null;
//				}
//				return &data[ pos ];
//			}
//
//			if ( parm.FieldType().Inherits( &type_object ) ) {
//				pos += type_object.Size();
//			} else {
//				pos += parm.FieldType().Size();
//			}
//		}
//		t = t.SuperClass();
//	} while( t && ( t != &type_object ) );
//
//	return null;
//}
//

///***********************************************************************
//
//idProgram
//
//Handles compiling and storage of script data.  Multiple idProgram objects
//would represent seperate programs with no knowledge of each other.  Scripts
//meant to access shared data and functions should all be compiled by a
//single idProgram.
//
//***********************************************************************/
//
class idProgram {
//private:
	fileList= new idStrList;
	filename = new idStr;
	filenum:number /*int*/;

	numVariables:number/*int*/;
	variables = new Uint8Array(MAX_GLOBALS);
	variableDefaults = new idStaticList</*byte*/number>(Number, MAX_GLOBALS);
	functions = new idStaticList<function_t>(function_t,MAX_FUNCS);
	statements = new idStaticList<statement_t>(statement_t,MAX_STATEMENTS);
	types = new idList<idTypeDef>(idTypeDef, false, 16, true);
	varDefNames = new idList<idVarDefName>(idVarDefName, false, 16, true);
	varDefNameHash = new idHashIndex;
	varDefs = new idList<idVarDef>(idVarDef, false, 16, true);

	sysDef:idVarDef;

	top_functions: number;	   //	int											
	top_statements: number;	   //	int											
	top_types: number;		   //	int											
	top_defs: number;		   //	int											
	top_files: number;		   //	int											
//
//	void										CompileStats( void );
//
//public:
	returnDef:idVarDef;
	returnStringDef:idVarDef;
//
//												idProgram();
//												~idProgram();
//
//	// save games
//	void										Save ( savefile: idSaveGame ): void { throw "placeholder"; }
//	bool										Restore( idRestoreGame *savefile );
//	int											CalculateChecksum( void ) const;		// Used to insure program code has not
//																						//    changed between savegames
//
//	void										Startup( const char *defaultScript );
//	void										Restart( void );
//	bool										CompileText( const char *source, text:string, bool console );
//	const function_t							*CompileFunction( const char *functionName, text:string );
//	void										CompileFile( const char *filename );
//	void										BeginCompilation( void );
//	void										FinishCompilation( void );
//	void										DisassembleStatement( idFile *file, int instructionPointer ) const;
//	void										Disassemble( void ) const;
//	void										FreeData( void );
//
//	const char									*GetFilename( int num );
//	int											GetFilenum( name:string );
//	int											GetLineNumberForStatement( int index );
//	const char									*GetFilenameForStatement( int index );
//
//	idTypeDef									*AllocType( idTypeDef &type );
//	idTypeDef									*AllocType( etype_t etype, idVarDef *edef, const char *ename, int esize, idTypeDef *aux );
//	idTypeDef									*GetType( idTypeDef &type, bool allocate );
//	idTypeDef									*FindType( name:string );
//
//	idVarDef									*AllocDef( idTypeDef *type, name:string, idVarDef *scope, bool constant );
//	idVarDef									*GetDef( const idTypeDef *type, name:string, const idVarDef *scope ) const;
//	void										FreeDef( idVarDef *d, const idVarDef *scope );
//	idVarDef									*FindFreeResultDef( idTypeDef *type, name:string, idVarDef *scope, const idVarDef *a, const idVarDef *b );
//	idVarDef									*GetDefList( name:string ) const;
//	void										AddDefToNameList( idVarDef *def, name:string );
//
//	function_t									*FindFunction( name:string ) const;						// returns NULL if function not found
//	function_t									*FindFunction( name:string, const idTypeDef *type ) const;	// returns NULL if function not found
//	function_t									&AllocFunction( idVarDef *def );
//	function_t									*GetFunction( int index );
//	int											GetFunctionIndex( const function_t *func );
//
//	void										SetEntity( name:string, ent:idEntity );
//
//	statement_t									*AllocStatement( void );
//	statement_t									&GetStatement( int index );
	NumStatements ( ) { return this.statements.Num ( ); }
//
//	int 										GetReturnedInteger( void );
//
//	void										ReturnFloat( float value );
//	void										ReturnInteger( int value );
//	void										ReturnVector( idVec3 const &vec );
//	void										ReturnString( const char *string );
//	void										ReturnEntity( ent:idEntity );
//	
//	int											NumFilenames( void ) { return fileList.Num( ); }
//};
//
	/*
================
idProgram::GetStatement
================
*/
	GetStatement ( /*int */index: number ): statement_t {
		return this.statements[index];
	}

///*
//================
//idProgram::GetFunction
//================
//*/
//ID_INLINE function_t *idProgram::GetFunction( int index ) {
//	return &functions[ index ];
//}
//
///*
//================
//idProgram::GetFunctionIndex
//================
//*/
//ID_INLINE int idProgram::GetFunctionIndex( const function_t *func ) {
//	return func - &functions[0];
//}
//
///*
//================
//idProgram::GetReturnedInteger
//================
//*/
//ID_INLINE int idProgram::GetReturnedInteger( void ) {
//	return *returnDef.value.intPtr;
//}
//
///*
//================
//idProgram::ReturnFloat
//================
//*/
//ID_INLINE void idProgram::ReturnFloat( float value ) {
//	*returnDef.value.floatPtr = value;
//}
//
///*
//================
//idProgram::ReturnInteger
//================
//*/
//ID_INLINE void idProgram::ReturnInteger( int value ) {
//	*returnDef.value.intPtr = value;
//}
//
///*
//================
//idProgram::ReturnVector
//================
//*/
//ID_INLINE void idProgram::ReturnVector( idVec3 const &vec ) {
//	*returnDef.value.vectorPtr = vec;
//}
//
/*
================
idProgram::ReturnString
================
*/
	ReturnString($string: string): void {
		todoThrow ( );
		//idStr.Copynz( this.returnStringDef.value.stringPtr, $string, MAX_STRING_LEN );
	}

/*
================
idProgram::GetFilename
================
*/
	GetFilename ( /*int */num: number ): string {
		return this.fileList[num].data;
	}
//
///*
//================
//idProgram::GetLineNumberForStatement
//================
//*/
//ID_INLINE int idProgram::GetLineNumberForStatement( int index ) {
//	return statements[ index ].linenumber;
//}
//
///*
//================
//idProgram::GetFilenameForStatement
//================
//*/
//ID_INLINE const char *idProgram::GetFilenameForStatement( int index ) {
//	return GetFilename( statements[ index ].file );
//}
//
//#endif /* !__SCRIPT_PROGRAM_H__ */

	/*
============
idProgram::AllocType
============
*/
	AllocType ( type: idTypeDef ): idTypeDef {
		var newtype: idTypeDef;

		newtype = new idTypeDef( type );
		this.types.Append( newtype );

		return newtype;
	}

/*
============
idProgram::AllocType
============
*/
	AllocType_ExtraArgs ( etype: etype_t, edef: idVarDef, ename: string, /*int */esize: number, aux: idTypeDef ): idTypeDef {

		var newtype: idTypeDef;
		newtype = new idTypeDef( etype, edef, ename, esize, aux );
		this.types.Append( newtype );

		return newtype;
	}
//
/*
============
idProgram::GetType

Returns a preexisting complex type that matches the parm, or allocates
a new one and copies it out.
============
*/
	GetType ( type: idTypeDef, allocate: boolean ): idTypeDef {
		var /*int */i: number;

		//FIXME: linear search == slow
		for ( i = this.types.Num ( ) - 1; i >= 0; i-- ) {
			if ( this.types[i].MatchesType( type ) && !strcmp( this.types[i].Name ( ), type.Name ( ) ) ) {
				return this.types[i];
			}
		}

		if ( !allocate ) {
			return null;
		}

		// allocate a new one
		return this.AllocType( type );
	}

/*
============
idProgram::FindType

Returns a preexisting complex type that matches the name, or returns NULL if not found
============
*/
	FindType ( name: string ): idTypeDef {
		var check: idTypeDef;
		var i: number;

		for ( i = this.types.Num ( ) - 1; i >= 0; i-- ) {
			check = this.types[i];
			if ( !strcmp( check.Name ( ), name ) ) {
				return check;
			}
		}

		return null;
	}

/*
============
idProgram::GetDefList
============
*/
	GetDefList ( name: string ): idVarDef {
		var /*int */i: number, hash: number;

		hash = this.varDefNameHash.GenerateKey( name, true );
		dlog(DEBUG_COMPILER, "GetDefList %s: %i\n", name, hash);
		for (i = this.varDefNameHash.First(hash); i != -1; i = this.varDefNameHash.Next(i)) {
			dlog( DEBUG_COMPILER, "%i, \n", i );
			if ( idStr.Cmp( this.varDefNames[i].Name ( ), name ) == 0 ) {
				return this.varDefNames[i].GetDefs ( );
			}
		}
		return null;
	}

/*
============
idProgram::AddDefToNameList
============
*/
	AddDefToNameList ( def: idVarDef, name: string ): void {
		var /*int */i: number, hash: number;

		hash = this.varDefNameHash.GenerateKey(name, true);
		dlog(DEBUG_COMPILER, "AddDefToNameList: num: %i, name: %s hash: %i\n", def.num, name, hash);
		for ( i = this.varDefNameHash.First( hash ); i != -1; i = this.varDefNameHash.Next( i ) ) {
			if ( idStr.Cmp( this.varDefNames[i].Name ( ), name ) == 0 ) {
				break;
			}
		}
		if ( i == -1 ) {
			i = this.varDefNames.Append( new idVarDefName( name ) );
			this.varDefNameHash.Add( hash, i );
		}
		this.varDefNames[i].AddDef( def );
	}

	/*
============
idProgram::AllocDef
============
*/
	AllocDef ( type: idTypeDef, name: string, scope: idVarDef, constant: boolean ): idVarDef {
		var def: idVarDef;
		var element: string;
		var def_x: idVarDef;
		var def_y: idVarDef;
		var def_z: idVarDef;

		// allocate a new def
		def = new idVarDef( type );
		def.scope		= scope;
		def.numUsers	= 1;
		def.num		= this.varDefs.Append( def );
		dlog( DEBUG_COMPILER, "AllocDef: num:%i name:%s\n", def.num, name );

		// add the def to the list with defs with this name and set the name pointer
		this.AddDefToNameList( def, name );

		if ((type.Type() == etype_t.ev_vector) || ((type.Type() == etype_t.ev_field) && (type.FieldType().Type() == etype_t.ev_vector ) ) ) {
			//
			// vector
			//
			if ( !strcmp( name, RESULT_STRING ) ) {
				// <RESULT> vector defs don't need the _x, _y and _z components
				assert( scope.Type() == etype_t.ev_function );
				def.value.stackOffset	= scope.value.functionPtr.locals;
				def.initialized		= initialized_t.stackVariable;
				scope.value.functionPtr.locals += type.Size();
			} else if ( scope.TypeDef ( ).Inherits( type_object ) ) {
				var newtype = new idTypeDef( etype_t.ev_field, null, "float field", 0, type_float );
				var type: idTypeDef = this.GetType( newtype, true );

				// set the value to the variable's position in the object
				def.value.ptrOffset = scope.TypeDef ( ).Size ( );

				// make automatic defs for the vectors elements
				// origin can be accessed as origin_x, origin_y, and origin_z
				element = sprintf( "%s_x", def.Name ( ) );
				def_x = this.AllocDef( type, element, scope, constant );

				element = sprintf( "%s_y", def.Name ( ) );
				def_y = this.AllocDef( type, element, scope, constant );
				def_y.value.ptrOffset = def_x.value.ptrOffset + type_float.Size ( );

				element = sprintf( "%s_z", def.Name ( ) );
				def_z = this.AllocDef( type, element, scope, constant );
				def_z.value.ptrOffset = def_y.value.ptrOffset + type_float.Size ( );
			} else {
				// make automatic defs for the vectors elements
				// origin can be accessed as origin_x, origin_y, and origin_z
				element = sprintf( "%s_x", def.Name ( ) );
				def_x = this.AllocDef( type_float, element, scope, constant );

				element = sprintf( "%s_y", def.Name ( ) );
				def_y = this.AllocDef( type_float, element, scope, constant );

				element = sprintf( "%s_z", def.Name ( ) );
				def_z = this.AllocDef( type_float, element, scope, constant );

				// point the vector def to the x coordinate
				def.value = def_x.value;
				def.initialized = def_x.initialized;
			}
		} else if ( scope.TypeDef().Inherits( type_object ) ) {
			//
			// object variable
			//
			// set the value to the variable's position in the object
			def.value.ptrOffset = scope.TypeDef().Size();
		} else if ( scope.Type() == etype_t.ev_function ) {
			//
			// stack variable
			//
			// since we don't know how many local variables there are,
			// we have to have them go backwards on the stack
			def.value.stackOffset	= scope.value.functionPtr.locals;
			def.initialized		= initialized_t.stackVariable;

			if ( type.Inherits( type_object ) ) {
				// objects only have their entity number on the stack, not the entire object
				scope.value.functionPtr.locals += type_object.Size();
			} else {
				scope.value.functionPtr.locals += type.Size();
			}
		} else {
			//
			// global variable
			//
			//def.value.bytePtr = this.numVariables;//this.variables.subarray( this.numVariables, def.TypeDef ( ).Size ( ) );
			def.value.setBytePtr(this.variables.buffer, this.numVariables, def.TypeDef().Size());
			this.numVariables += def.TypeDef().Size();
			dlog(DEBUG_COMPILER, "typedef %s, size: %i, numVariables: %i\n", type.Name(), def.TypeDef().Size(), this.numVariables);
			if ( this.numVariables > sizeof( this.variables ) ) {
				throw new idCompileError( va( "Exceeded global memory size (%d bytes)", sizeof( this.variables ) ) );
			}
			
			//memset( def.value.bytePtr, 0, def.TypeDef().Size() );
			for ( var i = 0; i < def.TypeDef().Size(); i++ ) {
				def.value.bytePtr[i] = 0;
			}
		}

		return def;
	}

/*
============
idProgram::GetDef

If type is NULL, it will match any type
============
*/
	GetDef ( type: idTypeDef, name: string, scope: idVarDef ): idVarDef {
		var def: idVarDef;
		var bestDef: idVarDef;
		var bestDepth: number;
		var depth: number;

		bestDepth = 0;
		bestDef = null;
		for ( def = this.GetDefList( name ); def != null; def = def.Next ( ) ) {
			if ( def.scope.Type ( ) == etype_t.ev_namespace ) {
				depth = def.DepthOfScope( scope );
				if ( !depth ) {
					// not in the same namespace
					continue;
				}
			} else if ( def.scope != scope ) {
				// in a different function
				continue;
			} else {
				depth = 1;
			}

			if ( !bestDef || ( depth < bestDepth ) ) {
				bestDepth = depth;
				bestDef = def;
			}
		}

		// see if the name is already in use for another type
		if ( bestDef && type && ( bestDef.TypeDef ( ) != type ) ) {
			throw new idCompileError( va( "Type mismatch on redeclaration of %s", name ) );
		}

		return bestDef;
	}

/*
============
idProgram::FreeDef
============
*/
	FreeDef ( def: idVarDef, scope: idVarDef ): void {
		var e: idVarDef;
		var i: number;

		if ( def.Type ( ) == etype_t.ev_vector ) {
			var name = new idStr;

			name.equals( def.Name ( ) + "_x" ); //sprintf( name, "%s_x", def.Name() );
			e = this.GetDef( null, name.data, scope );
			if ( e ) {
				this.FreeDef( e, scope );
			}

			name.equals( def.Name ( ) + "_y" ); ////sprintf( name, "%s_y", def.Name() );
			e = this.GetDef(null, name.data, scope );
			if ( e ) {
				this.FreeDef( e, scope );
			}

			name.equals( def.Name ( ) + "_z" ); ////sprintf( name, "%s_z", def.Name() );
			e = this.GetDef(null, name.data, scope );
			if ( e ) {
				this.FreeDef( e, scope );
			}
		}

		this.varDefs.RemoveIndex( def.num );
		for ( i = def.num; i < this.varDefs.Num ( ); i++ ) {
			this.varDefs[i].num = i;
		}
		def.destructor(); //delete def;
	}

/*
============
idProgram::FindFreeResultDef
============
*/
	FindFreeResultDef ( type: idTypeDef, name: string, scope: idVarDef, a: idVarDef, b: idVarDef ): idVarDef {
		var def: idVarDef;

		for ( def = this.GetDefList( name ); def != null; def = def.Next ( ) ) {
			if ( def == a || def == b ) {
				continue;
			}
			if ( def.TypeDef ( ) != type ) {
				continue;
			}
			if ( def.scope != scope ) {
				continue;
			}
			if ( def.numUsers <= 1 ) {
				continue;
			}
			return def;
		}

		return this.AllocDef( type, name, scope, false );
	}

/*
================
idProgram::FindFunction

Searches for the specified function in the currently loaded script.  A full namespace should be
specified if not in the global namespace.

Returns 0 if function not found.
Returns >0 if function found.
================
*/
	FindFunction ( name: string ): function_t {
		var start: number; //int			
		var pos: number; //int			
		var namespaceDef: idVarDef;
		var def: idVarDef;

		assert( name );

		var fullname = new idStr( name );
		start = 0;
		namespaceDef = def_namespace;
		do {
			pos = fullname.Find( "::", true, start );
			if ( pos < 0 ) {
				break;
			}

			var namespaceName = new idStr( fullname.Mid( start, pos - start ) );
			def = this.GetDef( null, namespaceName.data, namespaceDef );
			if ( !def ) {
				// couldn't find namespace
				return null;
			}
			namespaceDef = def;

			// skip past the ::
			start = pos + 2;
		} while ( def.Type ( ) == etype_t.ev_namespace );

		var funcName = new idStr( fullname.Right( fullname.Length ( ) - start ) );
		def = this.GetDef( null, funcName.data, namespaceDef );
		if ( !def ) {
			// couldn't find function
			return null;
		}

		if ( ( def.Type ( ) == etype_t.ev_function ) && ( def.value.functionPtr.eventdef == null ) ) {
			return def.value.functionPtr;
		}

		// is not a function, or is an eventdef
		return null;
	}

///*
//================
//idProgram::FindFunction
//
//Searches for the specified object function in the currently loaded script.
//
//Returns 0 if function not found.
//Returns >0 if function found.
//================
//*/
//function_t *idProgram::FindFunction( name:string, const idTypeDef *type ) const {
//	const idVarDef	*tdef;
//	const idVarDef	*def;
//
//	// look for the function
//	def = null;
//	for( tdef = type.def; tdef != &def_object; tdef = tdef.TypeDef().SuperClass().def ) {
//		def = this.GetDef( null, name, tdef );
//		if ( def ) {
//			return def.value.functionPtr;
//		}
//	}
//
//	return null;
//}

/*
================
idProgram::AllocFunction
================
*/
	AllocFunction ( def: idVarDef ): function_t {
		if ( this.functions.Num ( ) >= this.functions.Max ( ) ) {
			throw new idCompileError( va( "Exceeded maximum allowed number of functions (%d)", this.functions.Max ( ) ) );
		}

		// fill in the dfunction
		var func = this.functions.Alloc ( );
		func.eventdef = null;
		func.def = def;
		func.type = def.TypeDef ( );
		func.firstStatement = 0;
		func.numStatements = 0;
		func.parmTotal = 0;
		func.locals = 0;
		func.filenum = this.filenum;
		func.parmSize.SetGranularity( 1 );
		func.SetName( def.GlobalName ( ) );

		def.SetFunction( func );

		return func;
	}

/*
================
idProgram::SetEntity
================
*/
	SetEntity ( name: string, ent: idEntity ): void {
		var def: idVarDef;
		var defName = new idStr( "$" );

		defName.Append( name );

		def = this.GetDef( type_entity, defName.data, def_namespace );
		if ( def && ( def.initialized != initialized_t.stackVariable ) ) {
			// 0 is reserved for NULL entity
			if ( !ent ) {
				def.value.entityNumberPtr = 0;
			} else {
				def.value.entityNumberPtr = ent.entityNumber + 1;
			}
		}
	}

/*
================
idProgram::AllocStatement
================
*/
	AllocStatement ( ): statement_t {
		if ( this.statements.Num ( ) >= this.statements.Max ( ) ) {
			throw new idCompileError( va( "Exceeded maximum allowed number of statements (%d)", this.statements.Max ( ) ) );
		}
		return this.statements.Alloc ( );
	}

	/*
==============
idProgram::BeginCompilation

called before compiling a batch of files, clears the pr struct
==============
*/
	BeginCompilation ( ): void {
		var statement = new statement_t;

		dlog(DEBUG_COMPILER, "idProgram::BeginCompilation\n");
		this.FreeData ( );

		//try {
			// make the first statement a return for a "NULL" function
			statement = this.AllocStatement ( );
			statement.linenumber = 0;
			statement.file = 0;
			statement.op = opc.OP_RETURN;
			statement.a = null;
			statement.b = null;
			statement.c = null;

			// define NULL
			//AllocDef( &type_void, "<NULL>", &def_namespace, true );

			// define the return def
			this.returnDef = this.AllocDef( type_vector, "<RETURN>", def_namespace, false );

			// define the return def for strings
			this.returnStringDef = this.AllocDef( type_string, "<RETURN>", def_namespace, false );

			// define the sys object
			this.sysDef = this.AllocDef(type_void, "sys", def_namespace, true);

			todo( "add back in try catch?" );
		//} catch ( err /*: idCompileError*/ ) {
		//	gameLocal.Error( "%s", err.error );
		//}
	}

/*
==============
idProgram::DisassembleStatement
==============
*/
	DisassembleStatement ( file: idFile, /*int */instructionPointer: number ): void {
		var op: opcode_t;
		var statement: statement_t;

		statement = this.statements[instructionPointer];
		op = idCompiler.opcodes[statement.op];
		file.Printf( "%20s(%d):\t%6d: %15s\t", this.fileList[statement.file].c_str ( ).replace( "/", "\\" ), statement.linenumber, instructionPointer, op.opname );

		if ( statement.a ) {
			file.Printf( "\ta: " );
			statement.a.PrintInfo( file, instructionPointer );
		}

		if ( statement.b ) {
			file.Printf( "\tb: " );
			statement.b.PrintInfo( file, instructionPointer );
		}

		if ( statement.c ) {
			file.Printf( "\tc: " );
			statement.c.PrintInfo( file, instructionPointer );
		}

		file.Printf( "\n" );
	}

/*
==============
idProgram::Disassemble
==============
*/
	Disassemble ( ): void {
		var i: number;
		var instructionPointer: number;
		var func: function_t;
		var file: idFile;

		file = fileSystem.OpenFileByMode( "script/disasm.txt", fsMode_t.FS_WRITE );

		for ( i = 0; i < this.functions.Num ( ); i++ ) {
			func = this.functions[i];
			if ( func.eventdef ) {
				// skip eventdefs
				continue;
			}

			file.Printf( "\nfunction %s() %d stack used, %d parms, %d locals {\n", func.Name ( ), func.locals, func.parmTotal, func.locals - func.parmTotal );

			for ( instructionPointer = 0; instructionPointer < func.numStatements; instructionPointer++ ) {
				this.DisassembleStatement( file, func.firstStatement + instructionPointer );
			}

			file.Printf( "}\n" );
		}

		fileSystem.CloseFile( file );
	}

/*
==============
idProgram::FinishCompilation

Called after all files are compiled to check for errors
==============
*/
	FinishCompilation ( ): void {
		var i: number;

		this.top_functions = this.functions.Num ( );
		this.top_statements = this.statements.Num ( );
		this.top_types = this.types.Num ( );
		this.top_defs = this.varDefs.Num ( );
		this.top_files = this.fileList.Num ( );

		this.variableDefaults.Clear ( );
		this.variableDefaults.SetNum( this.numVariables );

		for ( i = 0; i < this.numVariables; i++ ) {
			this.variableDefaults[i] = this.variables[i];
		}
	}

/*
==============
idProgram::CompileStats

called after all files are compiled to report memory usage.
==============
*/
	CompileStats(): void {
		todo ( "a lot of this is pointless" );
		var /*int*/ memused: number;
		var /*int*/ memallocated: number;
		var /*int*/ numdefs: number;
		var /*int*/ stringspace: number;
		var /*int*/ funcMem: number;
		var /*int*/ i: number;

		gameLocal.Printf( "---------- Compile stats ----------\n" );
		gameLocal.DPrintf( "Files loaded:\n" );

		stringspace = 0;
		for ( i = 0; i < this.fileList.Num ( ); i++ ) {
			gameLocal.DPrintf( "   %s\n", this.fileList[i].c_str ( ) );
			stringspace += this.fileList[i].Allocated ( );
		}
		stringspace += this.fileList.Size ( );

		numdefs = this.varDefs.Num ( );
		memused = this.varDefs.Num ( );//* sizeof( idVarDef );
		memused += this.types.Num ( );//* sizeof( idTypeDef );
		memused += stringspace;

		for ( i = 0; i < this.types.Num ( ); i++ ) {
			memused += this.types[i].Allocated ( );
		}

		funcMem = this.functions.MemoryUsed ( );
		for ( i = 0; i < this.functions.Num ( ); i++ ) {
			funcMem += this.functions[i].Allocated ( );
		}

		memallocated = funcMem + memused;// + sizeof( idProgram );

		memused += this.statements.MemoryUsed ( );
		memused += this.functions.MemoryUsed ( ); // name and filename of functions are shared, so no need to include them
		memused += sizeof( this.variables );

		gameLocal.Printf( "\nMemory usage:\n" );
		gameLocal.Printf( "     Strings: %d, %d bytes\n", this.fileList.Num ( ), stringspace );
		gameLocal.Printf( "  Statements: %d, %d bytes\n", this.statements.Num ( ), this.statements.MemoryUsed ( ) );
		gameLocal.Printf( "   Functions: %d, %d bytes\n", this.functions.Num ( ), funcMem );
		gameLocal.Printf( "   Variables: %d bytes\n", this.numVariables );
		gameLocal.Printf( "    Mem used: %d bytes\n", memused );
		//gameLocal.Printf( " Static data: %d bytes\n", sizeof( idProgram ) );
		gameLocal.Printf( "   Allocated: %d bytes\n", memallocated );
		//gameLocal.Printf( " Thread size: %d bytes\n\n", sizeof( idThread ) );
	}

/*
================
idProgram::CompileText
================
*/
CompileText( source:string, text:string, console :boolean):boolean {
	var compiler = new idCompiler;
	var/*int*/i:number;
	var def: idVarDef;
	var ospath = new idStr;

	// use a full os path for GetFilenum since it calls OSPathToRelativePath to convert filenames from the parser
	ospath.equals(source);//fileSystem.RelativePathToOSPath( source );
	this.filenum = this.GetFilenum( ospath.data );

	//try {
		compiler.CompileFile(text, this.filename.data, console );
		// check to make sure all functions prototyped have code
		for (i = 0; i < this.varDefs.Num(); i++ ) {
			def = this.varDefs[ i ];
			if ((def.Type() == etype_t.ev_function) && ((def.scope.Type() == etype_t.ev_namespace) || def.scope.TypeDef().Inherits( type_object ))) {
				if ( !def.value.functionPtr.eventdef && !def.value.functionPtr.firstStatement ) {
					throw new idCompileError( va( "function %s was not defined\n", def.GlobalName() ) );
				}
			}
		}
	//}
	
	//catch( /*idCompileError &*/err ) {
	//	if ( console ) {
	//		gameLocal.Printf( "%s\n", err.error );
	//		return false;
	//	} else {
	//		gameLocal.Error( "%s\n", err.error );
	//	}
	//};

	if ( !console ) {
		this.CompileStats();
	}

	return true;
}

///*
//================
//idProgram::CompileFunction
//================
//*/
//const function_t *idProgram::CompileFunction( const char *functionName, text:string ) {
//	bool result;
//
//	result = CompileText( functionName, text, false );
//
//	if ( g_disasm.GetBool() ) {
//		Disassemble();
//	}
//
//	if ( !result ) {
//		gameLocal.Error( "Compile failed." );
//	}
//
//	return FindFunction( functionName );
//}

/*
================
idProgram::CompileFile
================
*/
	CompileFile ( filename: string ): void {

		var src = new R<Uint8Array> ( );
		var result: boolean;

		if ( fileSystem.ReadFile( filename, src, null ) < 0 ) {
			gameLocal.Error( "Couldn't load %s\n", filename );
		}

		dlog(DEBUG_COMPILER, "idProgram::CompileFile: %s\n", filename);

		result = this.CompileText( filename, src.$.toString(), false );
		fileSystem.FreeFile( src.$ );

		if ( g_disasm.GetBool() ) {
			this.Disassemble();
		}

		if ( !result ) {
			gameLocal.Error( "Compile failed in file %s.", filename );
		}	
	}

/*
================
idProgram::FreeData
================
*/
FreeData( ):void {
	var/*int */i: number;

	// free the defs
	this.varDefs.DeleteContents( true );
	this.varDefNames.DeleteContents( true );
	this.varDefNameHash.Free();

	this.returnDef		= null;
	this.returnStringDef = null;
	this.sysDef			= null;

	// free any special types we've created
	this.types.DeleteContents( true );

	this.filenum = 0;

	this.numVariables = 0;
	memset(this.variables, 0, sizeof(this.variables ) );

	// clear all the strings in the functions so that it doesn't look like we're leaking memory.
	for (i = 0; i < this.functions.Num(); i++ ) {
		this.functions[ i ].Clear();
	}

	this.filename.Clear();
	this.fileList.Clear();
	this.statements.Clear();
	this.functions.Clear();

	this.top_functions = 0;
	this.top_statements = 0;
	this.top_types = 0;
	this.top_defs = 0;
	this.top_files		= 0;

	this.filename.equals( "" );
}

/*
================
idProgram::Startup
================
*/
	Startup ( defaultScript: string ): void {
		gameLocal.Printf( "Initializing scripts\n" );

		//make sure all data is freed up
		idThread.Restart ( );

		//get ready for loading scripts
		this.BeginCompilation ( );

		//load the default script
		if ( defaultScript /*&& *defaultScript */ ) {
			this.CompileFile( defaultScript );
		}

		this.FinishCompilation ( );
	}

///*
//================
//idProgram::Save
//================
//*/
//void idProgram::Save( idSaveGame *savefile ) const {
//	int i;
//	int currentFileNum = top_files;
//
//	savefile.WriteInt( (fileList.Num() - currentFileNum) );
//	while ( currentFileNum < fileList.Num() ) {
//		savefile.WriteString( fileList[ currentFileNum ] );
//		currentFileNum++;
//	}
//
//	for ( i = 0; i < variableDefaults.Num(); i++ ) {
//		if ( variables[i] != variableDefaults[i] ) {
//			savefile.WriteInt( i );
//			savefile.WriteByte( variables[i] );
//		}
//	}
//	// Mark the end of the diff with default variables with -1
//	savefile.WriteInt( -1 );
//
//	savefile.WriteInt( numVariables );
//	for ( i = variableDefaults.Num(); i < numVariables; i++ ) {
//		savefile.WriteByte( variables[i] );
//	}
//
//	int checksum = CalculateChecksum();
//	savefile.WriteInt( checksum );
//}
//
///*
//================
//idProgram::Restore
//================
//*/
//bool idProgram::Restore( idRestoreGame *savefile ) {
//	int i, num, index;
//	bool result = true;
//	idStr scriptname;
//
//	savefile.ReadInt( num );
//	for ( i = 0; i < num; i++ ) {
//		savefile.ReadString( scriptname );
//		CompileFile( scriptname );
//	}
//
//	savefile.ReadInt( index );
//	while( index >= 0 ) {
//		savefile.ReadByte( variables[index] );
//		savefile.ReadInt( index );
//	}
//
//	savefile.ReadInt( num );
//	for ( i = variableDefaults.Num(); i < num; i++ ) {
//		savefile.ReadByte( variables[i] );
//	}
//
//	int saved_checksum, checksum;
//
//	savefile.ReadInt( saved_checksum );
//	checksum = CalculateChecksum();
//
//	if ( saved_checksum != checksum ) {
//		result = false;
//	}
//
//	return result;
//}
//
///*
//================
//idProgram::CalculateChecksum
//================
//*/
//int idProgram::CalculateChecksum( void ) const {
//	int i, result;
//
//	typedef struct {
//		unsigned short	op;
//		int				a;
//		int				b;
//		int				c;
//		unsigned short	linenumber;
//		unsigned short	file;
//	} statementBlock_t;
//
//	statementBlock_t	*statementList = new statementBlock_t[ statements.Num() ];
//
//	memset( statementList, 0, ( sizeof(statementBlock_t) * statements.Num() ) );
//
//	// Copy info into new list, using the variable numbers instead of a pointer to the variable
//	for( i = 0; i < statements.Num(); i++ ) {
//		statementList[i].op = statements[i].op;
//
//		if ( statements[i].a ) {
//			statementList[i].a = statements[i].a.num;
//		} else {
//			statementList[i].a = -1;
//		}
//		if ( statements[i].b ) {
//			statementList[i].b = statements[i].b.num;
//		} else {
//			statementList[i].b = -1;
//		}
//		if ( statements[i].c ) {
//			statementList[i].c = statements[i].c.num;
//		} else {
//			statementList[i].c = -1;
//		}
//
//		statementList[i].linenumber = statements[i].linenumber;
//		statementList[i].file = statements[i].file;
//	}
//
//	result = MD4_BlockChecksum( statementList, ( sizeof(statementBlock_t) * statements.Num() ) );
//
//	delete [] statementList;
//
//	return result;
//}
//
///*
//==============
//idProgram::Restart
//
//Restores all variables to their initial value
//==============
//*/
//void idProgram::Restart( void ) {
//	int i;
//
//	idThread::Restart();
//
//	//
//	// since there may have been a script loaded by the map or the user may
//	// have typed "script" from the console, free up any types and vardefs that
//	// have been allocated after the initial startup
//	//
//	for( i = top_types; i < types.Num(); i++ ) {
//		delete types[ i ];
//	}
//	types.SetNum( top_types, false );
//
//	for( i = top_defs; i < varDefs.Num(); i++ ) {
//		delete varDefs[ i ];
//	}
//	varDefs.SetNum( top_defs, false );
//
//	for( i = top_functions; i < functions.Num(); i++ ) {
//		functions[ i ].Clear();
//	}
//	functions.SetNum( top_functions	);
//
//	statements.SetNum( top_statements );
//	fileList.SetNum( top_files, false );
//	filename.Clear();
//	
//	// reset the variables to their default values
//	numVariables = variableDefaults.Num();
//	for( i = 0; i < numVariables; i++ ) {
//		variables[ i ] = variableDefaults[ i ];
//	}
//}

/*
================
idProgram::GetFilenum
================
*/
GetFilenum( name: string):number
{
	if ( this.filename.data == name ) {
		return this.filenum;
	}

	var strippedName = new idStr;
	strippedName.equals( name );// = fileSystem.OSPathToRelativePath( name );
	if ( !strippedName.Length ( ) ) {
		// not off the base path so just use the full path
		this.filenum = this.fileList.AddUnique( new idStr( name ) );
	} else {
		this.filenum = this.fileList.AddUnique( strippedName );
	}

	// save the unstripped name so that we don't have to strip the incoming name every time we call GetFilenum
	this.filename.equals( name );

	return this.filenum;
}

///*
//================
//idProgram::idProgram
//================
//*/
//idProgram::idProgram() {
//	FreeData();
//}
//
///*
//================
//idProgram::~idProgram
//================
//*/
//idProgram::~idProgram() {
//	FreeData();
//}
//
///*
//================
//idProgram::ReturnEntity
//================
//*/
//void idProgram::ReturnEntity( ent:idEntity ) {
//	if ( ent ) {
//		*returnDef.value.entityNumberPtr = ent.entityNumber + 1;
//	} else {
//		*returnDef.value.entityNumberPtr = 0;
//	}
//}
}