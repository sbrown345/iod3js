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
//
//typedef enum {
//	ev_error = -1, ev_void, ev_scriptevent, ev_namespace, ev_string, ev_float, ev_vector, ev_entity, ev_field, ev_function, ev_virtualfunction, ev_pointer, ev_object, ev_jumpoffset, ev_argsize, ev_boolean
//} etype_t;

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

///***********************************************************************
//
//idVarDef
//
//Define the name, type, and location of variables, functions, and objects
//defined in script.
//
//***********************************************************************/
//
//typedef union varEval_s {
//	idScriptObject			**objectPtrPtr;
//	char					*stringPtr;
//	float					*floatPtr;
//	idVec3					*vectorPtr;
//	function_t				*functionPtr;
//	int 					*intPtr;
//	byte					*bytePtr;
//	int 					*entityNumberPtr;
//	int						virtualFunction;
//	int						jumpOffset;
//	int						stackOffset;		// offset in stack for local variables
//	int						argSize;
//	varEval_s				*evalPtr;
//	int						ptrOffset;
//} varEval_t;



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
