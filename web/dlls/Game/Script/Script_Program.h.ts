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
//#ifndef __SCRIPT_PROGRAM_H__
//#define __SCRIPT_PROGRAM_H__
//
//class idScriptObject;
//class idEventDef;
//class idVarDef;
//class idTypeDef;
//class idEntity;
//class idThread;
//class idSaveGame;
//class idRestoreGame;
//
var MAX_STRING_LEN		=128
var MAX_GLOBALS			=196608			// in bytes
var MAX_STRINGS			=1024
var MAX_FUNCS			=3072
var MAX_STATEMENTS		=81920			// statement_t - 18 bytes last I checked

enum etype_t{
	ev_error = -1, ev_void, ev_scriptevent, ev_namespace, ev_string, ev_float, ev_vector, ev_entity, ev_field, ev_function, ev_virtualfunction, ev_pointer, ev_object, ev_jumpoffset, ev_argsize, ev_boolean
}

//
//typedef union eval_s {
//	const char			*stringPtr;
//	float				_float;
//	float				vector[ 3 ];
//	function_t			*function;
//	int 				_int;
//	int 				entity;
//} eval_t;
//
//
///***********************************************************************
//
//idScriptObject
//
//In-game representation of objects in scripts.  Use the idScriptVariable template
//(below) to access variables.
//
//***********************************************************************/
//
//class idScriptObject {
//private:
//	idTypeDef					*type;
//	
//public:
//	byte						*data;
//
//								idScriptObject();
//								~idScriptObject();
//
//	void						Save( idSaveGame *savefile ) const;			// archives object for save game file
//	void						Restore( idRestoreGame *savefile );			// unarchives object from save game file
//
//	void						Free( void );
//	bool						SetType( const char *typeName );
//	void						ClearObject( void );
//	bool						HasObject( void ) const;
//	idTypeDef					*GetTypeDef( void ) const;
//	const char					*GetTypeName( void ) const;
//	const function_t			*GetConstructor( void ) const;
//	const function_t			*GetDestructor( void ) const;
//	const function_t			*GetFunction( const char *name ) const;
//
//	byte						*GetVariable( const char *name, etype_t etype ) const;
//};
//
///***********************************************************************
//
//idScriptVariable
//
//Helper template that handles looking up script variables stored in objects.
//If the specified variable doesn't exist, or is the wrong data type, idScriptVariable
//will cause an error.
//
//***********************************************************************/
//
//template<class type, etype_t etype, class returnType>
//class idScriptVariable {
//private:
//	type				*data;
//
//public:
//						idScriptVariable();
//	bool				IsLinked( void ) const;
//	void				Unlink( void );
//	void				LinkTo( idScriptObject &obj, const char *name );
//	idScriptVariable	&operator=( const returnType &value );
//						operator returnType() const;
//};
//
//template<class type, etype_t etype, class returnType>
//ID_INLINE idScriptVariable<type, etype, returnType>::idScriptVariable() {
//	data = NULL;
//}
//
//template<class type, etype_t etype, class returnType>
//ID_INLINE bool idScriptVariable<type, etype, returnType>::IsLinked( void ) const {
//	return ( data != NULL );
//}
//
//template<class type, etype_t etype, class returnType>
//ID_INLINE void idScriptVariable<type, etype, returnType>::Unlink( void ) {
//	data = NULL;
//}
//
//template<class type, etype_t etype, class returnType>
//ID_INLINE void idScriptVariable<type, etype, returnType>::LinkTo( idScriptObject &obj, const char *name ) {
//	data = ( type * )obj.GetVariable( name, etype );
//	if ( !data ) {
//		gameError( "Missing '%s' field in script object '%s'", name, obj.GetTypeName() );
//	}
//}
//
//template<class type, etype_t etype, class returnType>
//ID_INLINE idScriptVariable<type, etype, returnType> &idScriptVariable<type, etype, returnType>::operator=( const returnType &value ) {
//	// check if we attempt to access the object before it's been linked
//	assert( data );
//
//	// make sure we don't crash if we don't have a pointer
//	if ( data ) {
//		*data = ( type )value;
//	}
//	return *this;
//}
//
//template<class type, etype_t etype, class returnType>
//ID_INLINE idScriptVariable<type, etype, returnType>::operator returnType() const {
//	// check if we attempt to access the object before it's been linked
//	assert( data );
//
//	// make sure we don't crash if we don't have a pointer
//	if ( data ) {
//		return ( const returnType )*data;
//	} else {
//		// reasonably safe value
//		return ( const returnType )0;
//	}
//}
//
///***********************************************************************
//
//Script object variable access template instantiations
//
//These objects will automatically handle looking up of the current value
//of a variable in a script object.  They can be stored as part of a class
//for up-to-date values of the variable, or can be used in functions to
//sample the data for non-dynamic values.
//
//***********************************************************************/
//
//typedef idScriptVariable<int, ev_boolean, int>				idScriptBool;
//typedef idScriptVariable<float, ev_float, float>			idScriptFloat;
//typedef idScriptVariable<float, ev_float, int>				idScriptInt;
//typedef idScriptVariable<idVec3, ev_vector, idVec3>			idScriptVector;
//typedef idScriptVariable<idStr, ev_string, const char *>	idScriptString;

/***********************************************************************

idCompileError

Causes the compiler to exit out of compiling the current function and
display an error message with line and file info.

***********************************************************************/

class idCompileError extends idException {
//public:
	//idCompileError( const char *text ) : idException( text ) {}
	constructor ( text: string ) {
		super( text );
	}
};

/***********************************************************************

idVarDef

Define the name, type, and location of variables, functions, and objects
defined in script.

***********************************************************************/

class varEval_t {
	//idScriptObject			**objectPtrPtr;
	//char					*stringPtr;
	//float					*floatPtr;
	//idVec3					*vectorPtr;
	//function_t				*functionPtr;
	//int 					*intPtr;
	//byte					*bytePtr;
	//int 					*entityNumberPtr;
	//int						virtualFunction;
	//int						jumpOffset;
	//int						stackOffset;		// offset in stack for local variables
	//int						argSize;
	//varEval_s				*evalPtr;
	//int						ptrOffset;

	constructor ( ) {
		this.init ( );
	}

	init ( ): void {
		// todo.
		// todo.
		// todo.
	}
};


///***********************************************************************
//
//idTypeDef
//
//Contains type information for variables and functions.
//
//***********************************************************************/
//
class idTypeDef {
	//private:
	type: etype_t;
	name: idStr;
	size: number/*size_t*/;

	// function types are more complex
	auxType: idTypeDef;					// return type
	parmTypes = new idList<idTypeDef>(idTypeDef);
	parmNames = new idStrList;
	functions = new idList<function_t>(function_t);
	//
	//public:
	def: idVarDef;						// a def that points to this type
	//
	//						idTypeDef( const idTypeDef &other );
	//						idTypeDef( etype_t etype, idVarDef *edef, const char *ename, int esize, idTypeDef *aux );
	//	void				operator=( const idTypeDef& other );
	//	size_t				Allocated( void ) const;
	//
	//	bool				Inherits( const idTypeDef *basetype ) const;
	//	bool				MatchesType( const idTypeDef &matchtype ) const;
	//	bool				MatchesVirtualFunction( const idTypeDef &matchfunc ) const;
	//	void				AddFunctionParm( idTypeDef *parmtype, const char *name );
	//	void				AddField( idTypeDef *fieldtype, const char *name );
	//
	//	void				SetName( const char *newname );
	//	const char			*Name( void ) const;
	//
	//	etype_t				Type( void ) const;
	//	size_t				Size( void ) const;
	//
	//	idTypeDef			*SuperClass( void ) const;
	//	
	//	idTypeDef			*ReturnType( void ) const;
	//	void				SetReturnType( idTypeDef *type );
	//
	//	idTypeDef			*FieldType( void ) const;
	//	void				SetFieldType( idTypeDef *type );
	//
	//	idTypeDef			*PointerType( void ) const;
	//	void				SetPointerType( idTypeDef *type );
	//
	//	int					NumParameters( void ) const;
	//	idTypeDef			*GetParmType( int parmNumber ) const;
	//	const char			*GetParmName( int parmNumber ) const;
	//
	//	int					NumFunctions( void ) const;
	//	int					GetFunctionNumber( const function_t *func ) const;
	//	const function_t	*GetFunction( int funcNumber ) const;
	//	void				AddFunction( const function_t *func );
	//};*******************************************************************/
	//
	/*
================
idTypeDef::idTypeDef
================
*/
	constructor(etype: etype_t, edef: idVarDef, ename: string, /*int */esize: number, aux: idTypeDef) {
		this.name = new idStr(ename);
		this.type = etype;
		this.def = edef;
		this.size = esize;
		this.auxType = aux;

		this.parmTypes.SetGranularity(1);
		this.parmNames.SetGranularity(1);
		this.functions.SetGranularity(1);
	}

	///*
	//================
	//idTypeDef::idTypeDef
	//================
	//*/
	//idTypeDef::idTypeDef( const idTypeDef &other ) {
	//	*this = other;
	//}
	//
	///*
	//================
	//idTypeDef::operator=
	//================
	//*/
	//void idTypeDef::operator=( const idTypeDef& other ) {
	//	type		= other.type;
	//	def			= other.def;
	//	name		= other.name;
	//	size		= other.size;
	//	auxType		= other.auxType;
	//	parmTypes	= other.parmTypes;
	//	parmNames	= other.parmNames;
	//	functions	= other.functions;
	//}
	//
	///*
	//================
	//idTypeDef::Allocated
	//================
	//*/
	//size_t idTypeDef::Allocated( void ) const {
	//	size_t memsize;
	//	int i;
	//
	//	memsize = name.Allocated() + parmTypes.Allocated() + parmNames.Allocated() + functions.Allocated();
	//	for( i = 0; i < parmTypes.Num(); i++ ) {
	//		memsize += parmNames[ i ].Allocated();
	//	}
	//
	//	return memsize;
	//}
	//
	///*
	//================
	//idTypeDef::Inherits
	//
	//Returns true if basetype is an ancestor of this type.
	//================
	//*/
	//bool idTypeDef::Inherits( const idTypeDef *basetype ) const {
	//	idTypeDef *superType;
	//
	//	if ( type != ev_object ) {
	//		return false;
	//	}
	//
	//	if ( this == basetype ) {
	//		return true;
	//	}
	//	for( superType = auxType; superType != NULL; superType = superType.auxType ) {
	//		if ( superType == basetype ) {
	//			return true;
	//		}
	//	}
	//
	//	return false;
	//}
	//
	///*
	//================
	//idTypeDef::MatchesType
	//
	//Returns true if both types' base types and parameters match
	//================
	//*/
	//bool idTypeDef::MatchesType( const idTypeDef &matchtype ) const {
	//	int i;
	//
	//	if ( this == &matchtype ) {
	//		return true;
	//	}
	//
	//	if ( ( type != matchtype.type ) || ( auxType != matchtype.auxType ) ) {
	//		return false;
	//	}
	//
	//	if ( parmTypes.Num() != matchtype.parmTypes.Num() ) {
	//		return false;
	//	}
	//
	//	for( i = 0; i < matchtype.parmTypes.Num(); i++ ) {
	//		if ( parmTypes[ i ] != matchtype.parmTypes[ i ] ) {
	//			return false;
	//		}
	//	}
	//
	//	return true;
	//}
	//
	///*
	//================
	//idTypeDef::MatchesVirtualFunction
	//
	//Returns true if both functions' base types and parameters match
	//================
	//*/
	//bool idTypeDef::MatchesVirtualFunction( const idTypeDef &matchfunc ) const {
	//	int i;
	//
	//	if ( this == &matchfunc ) {
	//		return true;
	//	}
	//
	//	if ( ( type != matchfunc.type ) || ( auxType != matchfunc.auxType ) ) {
	//		return false;
	//	}
	//
	//	if ( parmTypes.Num() != matchfunc.parmTypes.Num() ) {
	//		return false;
	//	}
	//
	//	if ( parmTypes.Num() > 0 ) {
	//		if ( !parmTypes[ 0 ].Inherits( matchfunc.parmTypes[ 0 ] ) ) {
	//			return false;
	//		}
	//	}
	//
	//	for( i = 1; i < matchfunc.parmTypes.Num(); i++ ) {
	//		if ( parmTypes[ i ] != matchfunc.parmTypes[ i ] ) {
	//			return false;
	//		}
	//	}
	//
	//	return true;
	//}
	//
	///*
	//================
	//idTypeDef::AddFunctionParm
	//
	//Adds a new parameter for a function type.
	//================
	//*/
	//void idTypeDef::AddFunctionParm( idTypeDef *parmtype, const char *name ) {
	//	if ( type != ev_function ) {
	//		throw idCompileError( "idTypeDef::AddFunctionParm : tried to add parameter on non-function type" );
	//	}
	//
	//	parmTypes.Append( parmtype );
	//	idStr &parmName = parmNames.Alloc();
	//	parmName = name;
	//}
	//
	///*
	//================
	//idTypeDef::AddField
	//
	//Adds a new field to an object type.
	//================
	//*/
	//void idTypeDef::AddField( idTypeDef *fieldtype, const char *name ) {
	//	if ( type != ev_object ) {
	//		throw idCompileError( "idTypeDef::AddField : tried to add field to non-object type" );
	//	}
	//
	//	parmTypes.Append( fieldtype );
	//	idStr &parmName = parmNames.Alloc();
	//	parmName = name;
	//
	//	if ( fieldtype.FieldType().Inherits( &type_object ) ) {
	//		size += type_object.Size();
	//	} else {
	//		size += fieldtype.FieldType().Size();
	//	}
	//}
	//
	///*
	//================
	//idTypeDef::SetName
	//================
	//*/
	//void idTypeDef::SetName( const char *newname ) {
	//	name = newname;
	//}
	//
	///*
	//================
	//idTypeDef::Name
	//================
	//*/
	//const char *idTypeDef::Name( void ) const {
	//	return name;
	//}
	//
	///*
	//================
	//idTypeDef::Type
	//================
	//*/
	//etype_t idTypeDef::Type( void ) const {
	//	return type;
	//}
	//
	///*
	//================
	//idTypeDef::Size
	//================
	//*/
	//size_t idTypeDef::Size( void ) const {
	//	return size;
	//}
	//
	///*
	//================
	//idTypeDef::SuperClass
	//
	//If type is an object, then returns the object's superclass
	//================
	//*/
	//idTypeDef *idTypeDef::SuperClass( void ) const {
	//	if ( type != ev_object ) {
	//		throw idCompileError( "idTypeDef::SuperClass : tried to get superclass of a non-object type" );
	//	}
	//
	//	return auxType;
	//}
	//
	///*
	//================
	//idTypeDef::ReturnType
	//
	//If type is a function, then returns the function's return type
	//================
	//*/
	//idTypeDef *idTypeDef::ReturnType( void ) const {
	//	if ( type != ev_function ) {
	//		throw idCompileError( "idTypeDef::ReturnType: tried to get return type on non-function type" );
	//	}
	//
	//	return auxType;
	//}
	//
	///*
	//================
	//idTypeDef::SetReturnType
	//
	//If type is a function, then sets the function's return type
	//================
	//*/
	//void idTypeDef::SetReturnType( idTypeDef *returntype ) {
	//	if ( type != ev_function ) {
	//		throw idCompileError( "idTypeDef::SetReturnType: tried to set return type on non-function type" );
	//	}
	//
	//	auxType = returntype;
	//}
	//
	///*
	//================
	//idTypeDef::FieldType
	//
	//If type is a field, then returns it's type
	//================
	//*/
	//idTypeDef *idTypeDef::FieldType( void ) const {
	//	if ( type != ev_field ) {
	//		throw idCompileError( "idTypeDef::FieldType: tried to get field type on non-field type" );
	//	}
	//
	//	return auxType;
	//}
	//
	///*
	//================
	//idTypeDef::SetFieldType
	//
	//If type is a field, then sets the function's return type
	//================
	//*/
	//void idTypeDef::SetFieldType( idTypeDef *fieldtype ) {
	//	if ( type != ev_field ) {
	//		throw idCompileError( "idTypeDef::SetFieldType: tried to set return type on non-function type" );
	//	}
	//
	//	auxType = fieldtype;
	//}
	//
	///*
	//================
	//idTypeDef::PointerType
	//
	//If type is a pointer, then returns the type it points to
	//================
	//*/
	//idTypeDef *idTypeDef::PointerType( void ) const {
	//	if ( type != ev_pointer ) {
	//		throw idCompileError( "idTypeDef::PointerType: tried to get pointer type on non-pointer" );
	//	}
	//
	//	return auxType;
	//}
	//
	///*
	//================
	//idTypeDef::SetPointerType
	//
	//If type is a pointer, then sets the pointer's type
	//================
	//*/
	//void idTypeDef::SetPointerType( idTypeDef *pointertype ) {
	//	if ( type != ev_pointer ) {
	//		throw idCompileError( "idTypeDef::SetPointerType: tried to set type on non-pointer" );
	//	}
	//
	//	auxType = pointertype;
	//}
	//
	///*
	//================
	//idTypeDef::NumParameters
	//================
	//*/
	//int idTypeDef::NumParameters( void ) const {
	//	return parmTypes.Num();
	//}
	//
	///*
	//================
	//idTypeDef::GetParmType
	//================
	//*/
	//idTypeDef *idTypeDef::GetParmType( int parmNumber ) const {
	//	assert( parmNumber >= 0 );
	//	assert( parmNumber < parmTypes.Num() );
	//	return parmTypes[ parmNumber ];
	//}
	//
	///*
	//================
	//idTypeDef::GetParmName
	//================
	//*/
	//const char *idTypeDef::GetParmName( int parmNumber ) const {
	//	assert( parmNumber >= 0 );
	//	assert( parmNumber < parmTypes.Num() );
	//	return parmNames[ parmNumber ];
	//}
	//
	///*
	//================
	//idTypeDef::NumFunctions
	//================
	//*/
	//int idTypeDef::NumFunctions( void ) const {
	//	return functions.Num();
	//}
	//
	///*
	//================
	//idTypeDef::GetFunctionNumber
	//================
	//*/
	//int idTypeDef::GetFunctionNumber( const function_t *func ) const {
	//	int i;
	//
	//	for( i = 0; i < functions.Num(); i++ ) {
	//		if ( functions[ i ] == func ) {
	//			return i;
	//		}
	//	}
	//	return -1;
	//}
	//
	///*
	//================
	//idTypeDef::GetFunction
	//================
	//*/
	//const function_t *idTypeDef::GetFunction( int funcNumber ) const {
	//	assert( funcNumber >= 0 );
	//	assert( funcNumber < functions.Num() );
	//	return functions[ funcNumber ];
	//}
	//
	///*
	//================
	//idTypeDef::AddFunction
	//================
	//*/
	//void idTypeDef::AddFunction( const function_t *func ) {
	//	int i;
	//
	//	for( i = 0; i < functions.Num(); i++ ) {
	//		if ( !strcmp( functions[ i ].def.Name(), func.def.Name() ) ) {
	//			if ( func.def.TypeDef().MatchesVirtualFunction( *functions[ i ].def.TypeDef() ) ) {
	//				functions[ i ] = func;
	//				return;
	//			}
	//		}
	//	}
	//	functions.Append( func );
	//}

}

///***********************************************************************
//
//  idVarDef
//
//***********************************************************************/
enum initialized_t {
	uninitialized, initializedVariable, initializedConstant, stackVariable
}
class idVarDef {
	//	friend class idVarDefName;

	//public:
	num: number/*int*/;
	value = new varEval_t;
	scope: idVarDef; 			// function, namespace, or object the var was defined in
	numUsers: number/*int*/;		// number of users if this is a constant


	initialized: initialized_t;
	//
	//public:
	//							idVarDef( idTypeDef *typeptr = NULL );
	//							~idVarDef();
	//
	//	const char *			Name( void ) const;
	//	const char *			GlobalName( void ) const;
	//
	//	void					SetTypeDef( idTypeDef *_type ) { typeDef = _type; }
	//	idTypeDef *				TypeDef( void ) const { return typeDef; }
	//	etype_t					Type( void ) const { return ( typeDef != NULL ) ? typeDef->Type() : ev_void; }
	//
	//	int						DepthOfScope( const idVarDef *otherScope ) const;
	//
	//	void					SetFunction( function_t *func );
	//	void					SetObject( idScriptObject *object );
	//	void					SetValue( const eval_t &value, bool constant );
	//	void					SetString( const char *string, bool constant );
	//
	//	idVarDef *				Next( void ) const { return next; }		// next var def with same name
	//
	//	void					PrintInfo( idFile *file, int instructionPointer ) const;
	//
	//private:
	typeDef: idTypeDef;
	name: idVarDefName;		// name of this var
	next: idVarDef;		// next var with the same name

	/*
	================
	idVarDef::idVarDef()
	================
	*/
	constructor(typeptr: idTypeDef) {
		this.typeDef = typeptr;
		this.num = 0;
		this.scope = null;
		this.numUsers = 0;
		this.initialized = initialized_t.uninitialized;
		this.value.init();
		this.name = null;
		this.next = null;
	}

	///*
	//============
	//idVarDef::~idVarDef
	//============
	//*/
	//idVarDef::~idVarDef() {
	//	if ( name ) {
	//		name.RemoveDef( this );
	//	}
	//}
	//
	///*
	//============
	//idVarDef::Name
	//============
	//*/
	//const char *idVarDef::Name( void ) const {
	//	return name.Name();
	//}
	//
	///*
	//============
	//idVarDef::GlobalName
	//============
	//*/
	//const char *idVarDef::GlobalName( void ) const {
	//	if ( scope != &def_namespace ) {
	//		return va( "%s::%s", scope.GlobalName(), name.Name() );
	//	} else {
	//		return name.Name();
	//	}
	//}
	//
	///*
	//============
	//idVarDef::DepthOfScope
	//============
	//*/
	//int idVarDef::DepthOfScope( const idVarDef *otherScope ) const {
	//	const idVarDef *def;
	//	int depth;
	//
	//	depth = 1;
	//	for( def = otherScope; def != NULL; def = def.scope ) {
	//		if ( def == scope ) {
	//			return depth;
	//		}
	//		depth++;
	//	}
	//
	//	return 0;
	//}
	//
	///*
	//============
	//idVarDef::SetFunction
	//============
	//*/
	//void idVarDef::SetFunction( function_t *func ) {
	//	assert( typeDef );
	//	initialized = initializedConstant;
	//	assert( typeDef.Type() == ev_function );
	//	value.functionPtr = func;
	//}
	//
	///*
	//============
	//idVarDef::SetObject
	//============
	//*/
	//void idVarDef::SetObject( idScriptObject *object ) {
	//	assert( typeDef );
	//	initialized = initialized;
	//	assert( typeDef.Inherits( &type_object ) );
	//	*value.objectPtrPtr = object;
	//}
	//
	///*
	//============
	//idVarDef::SetValue
	//============
	//*/
	//void idVarDef::SetValue( const eval_t &_value, bool constant ) {
	//	assert( typeDef );
	//	if ( constant ) {
	//		initialized = initializedConstant;
	//	} else {
	//		initialized = initializedVariable;
	//	}
	//
	//	switch( typeDef.Type() ) {
	//	case ev_pointer :
	//	case ev_boolean :
	//	case ev_field :
	//		*value.intPtr = _value._int;
	//		break;
	//
	//	case ev_jumpoffset :
	//		value.jumpOffset = _value._int;
	//		break;
	//
	//	case ev_argsize :
	//		value.argSize = _value._int;
	//		break;
	//
	//	case ev_entity :
	//		*value.entityNumberPtr = _value.entity;
	//		break;
	//
	//	case ev_string :
	//		idStr.Copynz( value.stringPtr, _value.stringPtr, MAX_STRING_LEN );
	//		break;
	//
	//	case ev_float :
	//		*value.floatPtr = _value._float;
	//		break;
	//
	//	case ev_vector :
	//		value.vectorPtr.x = _value.vector[ 0 ];
	//		value.vectorPtr.y = _value.vector[ 1 ];
	//		value.vectorPtr.z = _value.vector[ 2 ];
	//		break;
	//
	//	case ev_function :
	//		value.functionPtr = _value.function;
	//		break;
	//
	//	case ev_virtualfunction :
	//		value.virtualFunction = _value._int;
	//		break;
	//
	//	case ev_object :
	//		*value.entityNumberPtr = _value.entity;
	//		break;
	//
	//	default :
	//		throw idCompileError( va( "weird type on '%s'", Name() ) );
	//		break;
	//	}
	//}
	//
	///*
	//============
	//idVarDef::SetString
	//============
	//*/
	//void idVarDef::SetString( const char *string, bool constant ) {
	//	if ( constant ) {
	//		initialized = initializedConstant;
	//	} else {
	//		initialized = initializedVariable;
	//	}
	//	
	//	assert( typeDef && ( typeDef.Type() == ev_string ) );
	//	idStr.Copynz( value.stringPtr, string, MAX_STRING_LEN );
	//}
	//
	///*
	//============
	//idVarDef::PrintInfo
	//============
	//*/
	//void idVarDef::PrintInfo( idFile *file, int instructionPointer ) const {
	//	statement_t	*jumpst;
	//	int			jumpto;
	//	etype_t		etype;
	//	int			i;
	//	int			len;
	//	const char	*ch;
	//
	//	if ( initialized == initializedConstant ) {
	//		file.Printf( "const " );
	//	}
	//
	//	etype = typeDef.Type();
	//	switch( etype ) {
	//	case ev_jumpoffset :
	//		jumpto = instructionPointer + value.jumpOffset;
	//		jumpst = &gameLocal.program.GetStatement( jumpto );
	//		file.Printf( "address %d [%s(%d)]", jumpto, gameLocal.program.GetFilename( jumpst.file ), jumpst.linenumber );
	//		break;
	//
	//	case ev_function :
	//		if ( value.functionPtr.eventdef ) {
	//			file.Printf( "event %s", GlobalName() );
	//		} else {
	//			file.Printf( "function %s", GlobalName() );
	//		}
	//		break;
	//
	//	case ev_field :
	//		file.Printf( "field %d", value.ptrOffset );
	//		break;
	//
	//	case ev_argsize:
	//		file.Printf( "args %d", value.argSize );
	//		break;
	//
	//	default:
	//		file.Printf( "%s ", typeDef.Name() );
	//		if ( initialized == initializedConstant ) {
	//			switch( etype ) {
	//			case ev_string :
	//				file.Printf( "\"" );
	//				len = strlen( value.stringPtr );
	//				ch = value.stringPtr;
	//				for( i = 0; i < len; i++, ch++ ) {
	//					if ( idStr::CharIsPrintable( *ch ) ) {
	//						file.Printf( "%c", *ch );
	//					} else if ( *ch == '\n' ) {
	//						file.Printf( "\\n" );
	//					} else {
	//						file.Printf( "\\x%.2x", static_cast<int>( *ch ) );
	//					}
	//				}
	//				file.Printf( "\"" );
	//				break;
	//
	//			case ev_vector :
	//				file.Printf( "'%s'", value.vectorPtr.ToString() );
	//				break;
	//
	//			case ev_float :
	//                file.Printf( "%f", *value.floatPtr );
	//				break;
	//
	//			case ev_virtualfunction :
	//				file.Printf( "vtable[ %d ]", value.virtualFunction );
	//				break;
	//
	//			default :
	//				file.Printf( "%d", *value.intPtr );
	//				break;
	//			}
	//		} else if ( initialized == stackVariable ) {
	//			file.Printf( "stack[%d]", value.stackOffset );
	//		} else {
	//			file.Printf( "global[%d]", num );
	//		}
	//		break;
	//	}
	//}
}

//
///***********************************************************************
//
//  Variable and type defintions
//
//***********************************************************************/
//
//extern	idTypeDef	type_void;
//extern	idTypeDef	type_scriptevent;
//extern	idTypeDef	type_namespace;
//extern	idTypeDef	type_string;
//extern	idTypeDef	type_float;
//extern	idTypeDef	type_vector;
//extern	idTypeDef	type_entity;
//extern  idTypeDef	type_field;
//extern	idTypeDef	type_function;
//extern	idTypeDef	type_virtualfunction;
//extern  idTypeDef	type_pointer;
//extern	idTypeDef	type_object;
//extern	idTypeDef	type_jumpoffset;	// only used for jump opcodes
//extern	idTypeDef	type_argsize;		// only used for function call and thread opcodes
//extern	idTypeDef	type_boolean;
//
//extern	idVarDef	def_void;
//extern	idVarDef	def_scriptevent;
//extern	idVarDef	def_namespace;
//extern	idVarDef	def_string;
//extern	idVarDef	def_float;
//extern	idVarDef	def_vector;
//extern	idVarDef	def_entity;
//extern	idVarDef	def_field;
//extern	idVarDef	def_function;
//extern	idVarDef	def_virtualfunction;
//extern	idVarDef	def_pointer;
//extern	idVarDef	def_object;
//extern	idVarDef	def_jumpoffset;		// only used for jump opcodes
//extern	idVarDef	def_argsize;		// only used for function call and thread opcodes
//extern	idVarDef	def_boolean;
//
class statement_t {
	op: number; //unsigned short
	a: idVarDef; 
	b: idVarDef; 
	c: idVarDef; 
	linenumber: number; //unsigned short	
	file: number; //unsigned short	
}
