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


class eval_t {
	//const char			*stringPtr;
	//float				_float;
	//float				vector[ 3 ];
	//function_t			*function;
	//int 				_int;
	//int  entity;

	get stringPtr ( ): string {
		return this.str;
	}
	set stringPtr ( value: string ) {
		if ( value === undefined ) {
			throw 'Undefined value';
		}
		this.str = value;
	}

	get _float ( ): number { return this.float32s[0]; }
	set _float ( value: number ) {
		if ( value === undefined ) {
			throw 'Undefined value';
		}
		this.float32s[0] = value;
	}

	get vector ( ): Float32Array { return this.float32s; }
	//set vector(value: Float32Array) {
	//	if ( value === undefined ) {
	//		throw 'Undefined value';
	//	}
	//	todoThrow( "need to set this? It would breakl the other ones...maybe use the array buffer on this.val??" );
	//}

	get $function ( ): function_t {
		todoThrow ( );
		return this[1];
	}
	set $function ( value: function_t ) {
		if ( value === undefined ) {
			throw 'Undefined value';
		}
		todoThrow ( );
	}

	get _int ( ): number { return this.int32s[0]; }
	set _int ( value: number ) {
		if ( value === undefined ) {
			throw 'Undefined value';
		}
		this.int32s[0] = value;
	}

	get entity ( ): number {
		todoThrow ( );
		return this[1];
	}
	set entity ( value: number ) {
		if ( value === undefined ) {
			throw 'Undefined value';
		}
		todoThrow ( );
	}

	private val = new ArrayBuffer( 12 );
	private uint8s = new Uint8Array( this.val );
	private int32s = new Int32Array( this.val );
	private float32s = new Float32Array(this.val);
	private str = "";

	init ( ): void {
		this.int32s[0] = 0;
		this.int32s[1] = 0;
		this.int32s[2] = 0;
	}
}


/***********************************************************************

idScriptObject

In-game representation of objects in scripts.  Use the idScriptVariable template
(below) to access variables.

***********************************************************************/

class idScriptObject {
//private:
//	idTypeDef					*type;
//	
//public:
//	byte						*data;
//
//								idScriptObject();
//								~idScriptObject();
//
//	void						Save ( savefile: idSaveGame ): void { throw "placeholder"; }			// archives object for save game file
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
//	const function_t			*GetFunction( name:string ) const;
//
//	byte						*GetVariable( name:string, etype_t etype ) const;
};
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
//	void				LinkTo( idScriptObject &obj, name:string );
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
//ID_INLINE void idScriptVariable<type, etype, returnType>::LinkTo( idScriptObject &obj, name:string ) {
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
//typedef idScriptVariable<float, etype_t.ev_float, float>			idScriptFloat;
//typedef idScriptVariable<float, etype_t.ev_float, int>				idScriptInt;
//typedef idScriptVariable<idVec3, ev_vector, idVec3>			idScriptVector;
//typedef idScriptVariable<idStr, ev_string, const char *>	idScriptString;

/***********************************************************************

idCompileError

Causes the compiler to exit out of compiling the current function and
display an error message with line and file info.

***********************************************************************/

class idCompileError extends idException {
//public:
	//idCompileError( text:string ) : idException( text ) {}
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
	// possibly first version of these pointers might be just getters that point to the same memory location?
	

	///****/objectPtrPtr: R<idScriptObject> = new R<idScriptObject>();
	//stringPtr:string;//char					
	//floatPtr:number;//float					
	//vectorPtr: idVec3;
	//functionPtr: function_t; 
	//intPtr: number;				 //int
	//bytePtr: number;				 //byte
	//entityNumberPtr:number;		 //int 					
	//virtualFunction:number;											 //int						
	//jumpOffset: number;													 //int						
	//stackOffset: number;		// offset in stack for local variables	 //int						
	//argSize:number;	//int
	//varEval_s				*evalPtr;
	//ptrOffset: number;//int	

	val:number;

	get objectPtrPtr(): R<idScriptObject> {todoThrow ( ); return null; }
	//set objectPtrPtr(value: string) {
	//	if (value === undefined) {
	//		throw 'Undefined value';
	//	}
	//	todoThrow(); 
	//}

	private  _str :string;
	get stringPtr(): string { return this._str; }
	set stringPtr(value: string) {
		if (value === undefined) {
			throw 'Undefined value';
		}
		this._str = value;
	}

	get floatPtr(): number { return this.float32s[0]; }
	set floatPtr(value: number) {
		if (value === undefined) {
			throw 'Undefined value';
		}
		this.float32s[0] = value;
	}
	
	get vectorPtr(): idVec3 { return this.vec; }
	//set vectorPtr(value: idVec3) {
	//	if (value === undefined) {
	//		throw 'Undefined value';
	//	}
	//	this.vec = value;
	//}

	private _functionPtr: function_t;
	get functionPtr(): function_t { return this._functionPtr; }
	set functionPtr(value: function_t) {
		if (value === undefined) {
			throw 'Undefined value';
		}
		this._functionPtr = value;
	}

	setBytePtr(arrayBuffer: ArrayBuffer, byteOffset: number, length: number): void {
		this.val = byteOffset;
		this.length = length;
		this.uint8s = new Uint8Array( arrayBuffer, byteOffset, length );
		this.int32s = new Int32Array(arrayBuffer, byteOffset, length / Int32Array.BYTES_PER_ELEMENT );
		this.float32s = new Float32Array( arrayBuffer, byteOffset, length / Float32Array.BYTES_PER_ELEMENT );
		this.vec = new idVec3( new Float32Array( arrayBuffer, byteOffset, 3 ) );
	}

	get bytePtr(): Uint8Array { return this.uint8s; }
	//set bytePtr(value: number) {
	//	if (value === undefined) {
	//		throw 'Undefined value';
	//	}
	//	this.uint8s[0] = value;
	//}
	
	get intPtr(): number { return this.int32s[0]; }
	set intPtr ( value: number ) {
		if ( value === undefined ) {
			throw 'Undefined value';
		}
		this.int32s[0] = value;
	}

	get entityNumberPtr(): number { return this.int32s[0]; }
	set entityNumberPtr ( value: number ) {
		if ( value === undefined ) {
			throw 'Undefined value';
		}
		this.int32s[0] = value;
	}

	get virtualFunction(): number { return this.val; }
	set virtualFunction(value: number) {
		if (value === undefined) {
			throw 'Undefined value';
		}
		this.val = value;
	}
	
	get jumpOffset(): number { return this.val; }
	set jumpOffset(value: number) {
		if (value === undefined) {
			throw 'Undefined value';
		}
		this.val = value;
	}
	get stackOffset(): number { return this.val; }
	set stackOffset(value: number) {
		if (value === undefined) {
			throw 'Undefined value';
		}
		this.val = value;
	}
	
	get argSize(): number { return this.val; }
	set argSize(value: number) {
		if (value === undefined) {
			throw 'Undefined value';
		}
		this.val = value;
	}
	
	get evalPtr(): eval_t { todoThrow();return null;}
	set evalPtr(value: eval_t) {
		if (value === undefined) {
			throw 'Undefined value';
		}
		todoThrow(); 
	}

	get ptrOffset(): number { return this.val; }
	set ptrOffset(value: number) {
		if (value === undefined) {
			throw 'Undefined value';
		}
		this.val = value;
	}

	private vec: idVec3;
	private uint8s: Uint8Array;
	private int32s: Int32Array;
	private float32s: Float32Array;

	private variables: Uint8Array; // ref to global memory

	private byteOffset: number;
	private length: number;

	constructor ( ) {
		this.init ( );
	}

	init(): void {
		this.val = 0;
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
	parmTypes = new idList<idTypeDef>(idTypeDef, true);
	parmNames = new idStrList;
	functions = new idList<function_t>(function_t, true);
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
	//	void				AddFunctionParm( idTypeDef *parmtype, name:string );
	//	void				AddField( idTypeDef *fieldtype, name:string );
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
	constructor ( other: idTypeDef )
	constructor ( etype: etype_t, edef: idVarDef, ename: string, /*int */esize: number, aux: idTypeDef )
	constructor ( other_or_etype: any, edef?: idVarDef, ename?: string, /*int */esize?: number, aux?: idTypeDef ) {
		if ( arguments.length == 1 ) {
			var other = other_or_etype;

			this.equals( other );
		} else {
			var etype = other_or_etype;

			this.name = new idStr( ename );
			this.type = etype;
			this.def = edef;
			this.size = esize;
			this.auxType = aux;

			this.parmTypes.SetGranularity( 1 );
			this.parmNames.SetGranularity( 1 );
			this.functions.SetGranularity( 1 );
		}
	}

	/*
	================
	idTypeDef::operator=
	================
	*/
	equals ( other: idTypeDef ): void {
		this.type = other.type;
		this.def = other.def;
		this.name = other.name;
		this.size = other.size;
		this.auxType = other.auxType;
		this.parmTypes = other.parmTypes;
		this.parmNames = other.parmNames;
		this.functions = other.functions;
	}
	
	/*
	================
	idTypeDef::Allocated
	================
	*/
	Allocated ( ): number {
		var memsize: number; //Allocated
		var i: number;

		memsize = this.name.Allocated ( ) + this.parmTypes.Allocated ( ) + this.parmNames.Allocated ( ) + this.functions.Allocated ( );
		for ( i = 0; i < this.parmTypes.Num ( ); i++ ) {
			memsize += this.parmNames[i].Allocated ( );
		}

		return memsize;
	}

	/*
	================
	idTypeDef::Inherits
	
	Returns true if basetype is an ancestor of this type.
	================
	*/
	Inherits ( basetype: idTypeDef ): boolean {
		var superType: idTypeDef;

		if ( this.type != etype_t.ev_object ) {
			return false;
		}

		if ( this == basetype ) {
			return true;
		}
		for ( superType = this.auxType; superType != null; superType = superType.auxType ) {
			if ( superType == basetype ) {
				return true;
			}
		}

		return false;
	}

	/*
	================
	idTypeDef::MatchesType
	
	Returns true if both types' base types and parameters match
	================
	*/
	MatchesType ( matchtype: idTypeDef ): boolean {
		var /*int */i: number;

		if ( this == matchtype ) {
			return true;
		}

		if ( ( this.type != matchtype.type ) || ( this.auxType != matchtype.auxType ) ) {
			return false;
		}

		if ( this.parmTypes.Num ( ) != matchtype.parmTypes.Num ( ) ) {
			return false;
		}

		for ( i = 0; i < matchtype.parmTypes.Num ( ); i++ ) {
			if ( this.parmTypes[i] != matchtype.parmTypes[i] ) {
				return false;
			}
		}

		return true;
	}

	/*
	================
	idTypeDef::MatchesVirtualFunction
	
	Returns true if both functions' base types and parameters match
	================
	*/
	MatchesVirtualFunction ( matchfunc: idTypeDef ): boolean {
		var i: number;
		if ( this == matchfunc ) {
			return true;
		}

		if ( ( this.type != matchfunc.type ) || ( this.auxType != matchfunc.auxType ) ) {
			return false;
		}

		if ( this.parmTypes.Num ( ) != matchfunc.parmTypes.Num ( ) ) {
			return false;
		}

		if ( this.parmTypes.Num ( ) > 0 ) {
			if ( !this.parmTypes[0].Inherits( matchfunc.parmTypes[0] ) ) {
				return false;
			}
		}

		for ( i = 1; i < matchfunc.parmTypes.Num ( ); i++ ) {
			if ( this.parmTypes[i] != matchfunc.parmTypes[i] ) {
				return false;
			}
		}

		return true;
	}

	/*
	================
	idTypeDef::AddFunctionParm
	
	Adds a new parameter for a function type.
	================
	*/
	AddFunctionParm ( parmtype: idTypeDef, name: string ): void {
		if ( this.type != etype_t.ev_function ) {
			throw new idCompileError( "idTypeDef::AddFunctionParm : tried to add parameter on non-function type" );
		}

		this.parmTypes.Append( parmtype );
		var parmName = this.parmNames.Alloc ( );
		parmName.equals( name );
	}
	
	/*
	================
	idTypeDef::AddField
	
	Adds a new field to an object type.
	================
	*/
	AddField ( fieldtype: idTypeDef, name: string ) {
		if ( this.type != etype_t.ev_object ) {
			throw new idCompileError( "idTypeDef::AddField : tried to add field to non-object type" );
		}

		this.parmTypes.Append( fieldtype );
		var parmName = this.parmNames.Alloc ( );
		parmName.equals( name );

		if ( fieldtype.FieldType ( ).Inherits( type_object ) ) {
			this.size += type_object.Size ( );
		} else {
			this.size += fieldtype.FieldType ( ).Size ( );
		}
	}

	/*
	================
	idTypeDef::SetName
	================
	*/
	SetName ( newname: string ): void {
		this.name.equals( newname );
	}

	/*
	================
	idTypeDef::Name
	================
	*/
	Name ( ): string {
		return this.name.data;
	}

	/*
	================
	idTypeDef::Type
	================
	*/
	Type ( ): etype_t {
		return this.type;
	}
	
	/*
	================
	idTypeDef::Size
	================
	*/
	Size ( ): number {
		return this.size;
	}
	
	/*
	================
	idTypeDef::SuperClass
	
	If type is an object, then returns the object's superclass
	================
	*/
	SuperClass ( ): idTypeDef {
		if ( this.type != etype_t.ev_object ) {
			throw new idCompileError( "idTypeDef::SuperClass : tried to get superclass of a non-object type" );
		}

		return this.auxType;
	}

	/*
	================
	idTypeDef::ReturnType
	
	If type is a function, then returns the function's return type
	================
	*/
	ReturnType ( ): idTypeDef {
		if ( this.type != etype_t.ev_function ) {
			throw new idCompileError( "idTypeDef::ReturnType: tried to get return type on non-function type" );
		}

		return this.auxType;
	}
	
	///*
	//================
	//idTypeDef::SetReturnType
	//
	//If type is a function, then sets the function's return type
	//================
	//*/
	//void idTypeDef::SetReturnType( idTypeDef *returntype ) {
	//	if ( type != etype_t.ev_function ) {
	//		throw new idCompileError( "idTypeDef::SetReturnType: tried to set return type on non-function type" );
	//	}
	//
	//	this.auxType = returntype;
	//}
	//
	/*
	================
	idTypeDef::FieldType
	
	If type is a field, then returns it's type
	================
	*/
	FieldType ( ): idTypeDef {
		if ( this.type != etype_t.ev_field ) {
			throw new idCompileError( "idTypeDef::FieldType: tried to get field type on non-field type" );
		}

		return this.auxType;
	}
	
	/*
	================
	idTypeDef::SetFieldType
	
	If type is a field, then sets the function's return type
	================
	*/
	SetFieldType ( fieldtype: idTypeDef ): void {
		if ( this.type != etype_t.ev_field ) {
			throw new idCompileError( "idTypeDef::SetFieldType: tried to set return type on non-function type" );
		}

		this.auxType = fieldtype;
	}

	/*
	================
	idTypeDef::PointerType
	
	If type is a pointer, then returns the type it points to
	================
	*/
	PointerType ( ): idTypeDef {
		if ( this.type != etype_t.ev_pointer ) {
			throw new idCompileError( "idTypeDef::PointerType: tried to get pointer type on non-pointer" );
		}

		return this.auxType;
	}

	/*
	================
	idTypeDef::SetPointerType
	
	If type is a pointer, then sets the pointer's type
	================
	*/
	SetPointerType ( pointertype: idTypeDef ): void {
		if ( this.type != etype_t.ev_pointer ) {
			throw new idCompileError( "idTypeDef::SetPointerType: tried to set type on non-pointer" );
		}

		this.auxType = pointertype;
	}

	/*
	================
	idTypeDef::NumParameters
	================
	*/
	NumParameters ( ): number {
		return this.parmTypes.Num ( );
	}

	/*
	================
	idTypeDef::GetParmType
	================
	*/
	GetParmType ( /*int */parmNumber: number ): idTypeDef {
		assert( parmNumber >= 0 );
		assert( parmNumber < this.parmTypes.Num ( ) );
		return this.parmTypes[parmNumber];
	}

	/*
	================
	idTypeDef::GetParmName
	================
	*/
	GetParmName ( /*int */parmNumber: number ): string {
		assert( parmNumber >= 0 );
		assert( parmNumber < this.parmTypes.Num ( ) );
		return this.parmNames[parmNumber];
	}
	
	/*
	================
	idTypeDef::NumFunctions
	================
	*/
	NumFunctions ( ): number {
		return this.functions.Num ( );
	}

	/*
	================
	idTypeDef::GetFunctionNumber
	================
	*/
	GetFunctionNumber(func: function_t ) :number{
		var i:number;
	
		for( i = 0; i < this.functions.Num(); i++ ) {
			if ( this.functions[ i ] == func ) {
				return i;
			}
		}
		return -1;
	}
	
	/*
	================
	idTypeDef::GetFunction
	================
	*/
	GetFunction ( /*int*/ funcNumber: number ): function_t {
		assert( funcNumber >= 0 );
		assert( funcNumber < this.functions.Num ( ) );
		return this.functions[funcNumber];
	}

	/*
	================
	idTypeDef::AddFunction
	================
	*/
	AddFunction ( func: function_t ): void {
		var i: number;

		for ( i = 0; i < this.functions.Num ( ); i++ ) {
			if ( !strcmp( this.functions[i].def.Name ( ), func.def.Name ( ) ) ) {
				if ( func.def.TypeDef ( ).MatchesVirtualFunction( this.functions[i].def.TypeDef ( ) ) ) {
					this.functions[i] = func;
					return;
				}
			}
		}
		this.functions.Append( func );
	}

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
	num: number /*int*/;
	value = new varEval_t;
	scope: idVarDef; // function, namespace, or object the var was defined in
	numUsers: number /*int*/; // number of users if this is a constant


	initialized: initialized_t;
	//
	//public:
	//							idVarDef( idTypeDef *typeptr = NULL );
	//							~idVarDef();
	//
	//	const char *			Name( void ) const;
	//	const char *			GlobalName( void ) const;
	//
	SetTypeDef ( _type: idTypeDef ): void { this.typeDef = _type; }
	TypeDef ( ): idTypeDef { return this.typeDef; }
	Type ( ): etype_t { return ( this.typeDef != null ) ? this.typeDef.Type ( ) : etype_t.ev_void; }

	//	int						DepthOfScope( const idVarDef *otherScope ) const;
	//
	//	void					SetFunction( function_t *func );
	//	void					SetObject( idScriptObject *object );
	//	void					SetValue( const eval_t &value, bool constant );
	//	void					SetString( const char *string, bool constant );
	//
	Next ( ): idVarDef { return this.next; } // next var def with same name
	//
	//	void					PrintInfo( idFile *file, int instructionPointer ) const;
	//
	//private:
	typeDef: idTypeDef;
	name: idVarDefName; // name of this var
	next: idVarDef; // next var with the same name

	/*
	================
	idVarDef::idVarDef()
	================
	*/
	constructor ( typeptr: idTypeDef ) {
		this.typeDef = typeptr;
		this.num = 0;
		this.scope = null;
		this.numUsers = 0;
		this.initialized = initialized_t.uninitialized;
		this.value.init ( );
		this.name = null;
		this.next = null;
	}

	/*
	============
	idVarDef::~idVarDef
	============
	*/
	destructor() {
		if ( this.name ) {
			this.name.RemoveDef( this );
		}
	}
	
	/*
	============
	idVarDef::Name
	============
	*/
	Name ( ): string {
		return this.name.Name ( );
	}

	/*
	============
	idVarDef::GlobalName
	============
	*/
	GlobalName ( ): string {
		if ( this.scope != def_namespace ) {
			return va( "%s::%s", this.scope.GlobalName ( ), this.name.Name ( ) );
		} else {
			return this.name.Name ( );
		}
	}

	/*
	============
	idVarDef::DepthOfScope
	============
	*/
	DepthOfScope ( otherScope: idVarDef ): number {
		var def: idVarDef;
		var depth: number;

		depth = 1;
		for ( def = otherScope; def != null; def = def.scope ) {
			if ( def == this.scope ) {
				return depth;
			}
			depth++;
		}

		return 0;
	}

	/*
	============
	idVarDef::SetFunction
	============
	*/
	SetFunction ( func: function_t ): void {
		assert( this.typeDef );
		this.initialized = initialized_t.initializedConstant;
		assert( this.typeDef.Type ( ) == etype_t.ev_function );
		this.value.functionPtr = func;
	}

	/*
	============
	idVarDef::SetObject
	============
	*/
	SetObject(object:idScriptObject ):void {
		assert( this.typeDef );
		this.initialized = this.initialized; // ?? ok
		assert( this.typeDef.Inherits( type_object ) );
		/***/this.value.objectPtrPtr.$ = object;
	}
	
	/*
	============
	idVarDef::SetValue
	============
	*/
	SetValue ( _value: eval_t, constant: boolean ): void {
		assert( this.typeDef );
		if ( constant ) {
			this.initialized = initialized_t.initializedConstant;
		} else {
			this.initialized = initialized_t.initializedVariable;
		}

		dlog( DEBUG_COMPILER, "SetValue _value._int = %i, type: %i\n", _value._int, this.typeDef.Type ( ) );
		switch ( this.typeDef.Type ( ) ) {
		case etype_t.ev_pointer:
		case etype_t.ev_boolean:
		case etype_t.ev_field:
			/***/
			this.value.intPtr = _value._int;
			break;

		case etype_t.ev_jumpoffset:
			this.value.jumpOffset = _value._int;
			break;

		case etype_t.ev_argsize:
			this.value.argSize = _value._int;
			break;

		case etype_t.ev_entity:
			/***/
			this.value.entityNumberPtr = _value.entity;
			break;

		case etype_t.ev_string:
			todoThrow ( );
			//idStr.Copynz( this.value.stringPtr, _value.stringPtr, MAX_STRING_LEN );
			break;

		case etype_t.ev_float:
			/***/
			this.value.floatPtr = _value._float;
			break;

		case etype_t.ev_vector:
			this.value.vectorPtr.x = _value.vector[0];
			this.value.vectorPtr.y = _value.vector[1];
			this.value.vectorPtr.z = _value.vector[2];
			break;

		case etype_t.ev_function:
			this.value.functionPtr = _value.$function;
			break;

		case etype_t.ev_virtualfunction:
			this.value.virtualFunction = _value._int;
			break;

		case etype_t.ev_object:
			/***/
			this.value.entityNumberPtr = _value.entity;
			break;

		default:
			throw new idCompileError( va( "weird type on '%s'", this.Name ( ) ) );
			break;
		}
	}

	/*
	============
	idVarDef::SetString
	============
	*/
	SetString ( $string: string, constant: boolean ): void {
		if ( constant ) {
			this.initialized = initialized_t.initializedConstant;
		} else {
			this.initialized = initialized_t.initializedVariable;
		}

		assert(this.typeDef && (this.typeDef.Type() == etype_t.ev_string));
		this.value.stringPtr = $string; //idStr.Copynz( this.value.stringPtr, $string, MAX_STRING_LEN );
	}

	/*
	============
	idVarDef::PrintInfo
	============
	*/
	PrintInfo ( file: idFile, /*int */instructionPointer: number ): void {
		var jumpst: statement_t;
		var jumpto: number; // int;
		var etype: etype_t;
		var i: number; //int			
		var len: number; //int			
		var ch: number;

		if ( this.initialized == initialized_t.initializedConstant ) {
			file.Printf( "const " );
		}

		etype = this.typeDef.Type ( );
		switch ( etype ) {
		case etype_t.ev_jumpoffset:
			jumpto = instructionPointer + this.value.jumpOffset;
			jumpst = gameLocal.program.GetStatement( jumpto );
			file.Printf("address %d [%s(%d)]", jumpto, gameLocal.program.GetFilename(jumpst.file).replace("/", "\\" ), jumpst.linenumber );
			break;

		case etype_t.ev_function:
			if ( this.value.functionPtr.eventdef ) {
				file.Printf( "event %s", this.GlobalName ( ) );
			} else {
				file.Printf( "function %s", this.GlobalName ( ) );
			}
			break;

		case etype_t.ev_field:
			file.Printf( "field %d", this.value.ptrOffset );
			break;

		case etype_t.ev_argsize:
			file.Printf( "args %d", this.value.argSize );
			break;

		default:
			file.Printf( "%s ", this.typeDef.Name ( ) );
			if ( this.initialized == initialized_t.initializedConstant ) {
				switch ( etype ) {
				case etype_t.ev_string:
					file.Printf( "\"" );
					len = strlen( this.value.stringPtr );
					ch = 0; //this.value.stringPtr;
					for ( i = 0; i < len; i++, ch++ ) {
						if ( idStr.CharIsPrintable( this.value.stringPtr[ch] ) ) {
							file.Printf( "%s", this.value.stringPtr[ch] );
						} else if ( this.value.stringPtr[ch] == '\n' ) {
							file.Printf( "\\n" );
						} else {
							file.Printf( "\\x%.2x", this.value.stringPtr.charCodeAt( ch ) /*static_cast<int>( this.value.stringPtr[ch] )*/ );
						}
					}
					file.Printf( "\"" );
					break;

				case etype_t.ev_vector:
					file.Printf( "'%s'", this.value.vectorPtr.ToString ( ) );
					break;

				case etype_t.ev_float:
					file.Printf( "%4.2f", /***/this.value.floatPtr /*todo: value*/ );
					break;

				case etype_t.ev_virtualfunction:
					file.Printf( "vtable[ %d ]", this.value.virtualFunction );
					break;

				default:
					file.Printf( "%d", /***/this.value.intPtr /*todo: value*/ );
					break;
				}
			} else if ( this.initialized == initialized_t.stackVariable ) {
				file.Printf( "stack[%d]", this.value.stackOffset );
			} else {
				file.Printf( "global[%d]", this.num );
			}
			break;
		}
	}
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
