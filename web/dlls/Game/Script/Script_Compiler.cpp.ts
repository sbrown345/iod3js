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
var FUNCTION_PRIORITY = 2;
var INT_PRIORITY = 2;
var NOT_PRIORITY = 5;
var TILDE_PRIORITY = 5;
var TOP_PRIORITY = 7;

assert(def_void); // ensure this is defined for idCompiler.opcodes

class idCompiler {
	//private:
	//static punctuationValid = new Array<Boolean>(256);
	//static punctuation = string[];
	//
	parser = new idParser;
	parserPtr: idParser;
	token = new R( new idToken );

	immediateType: idTypeDef;
	immediate = new eval_t;

	eof: boolean;
	console: boolean;
	callthread: boolean;
	braceDepth: number; //	int				
	loopDepth: number; //	int				
	currentLineNumber: number; //	int				
	currentFileNumber: number; //	int				
	errorCount: number; //	int				

	scope: idVarDef; // the function being parsed, or NULL
	basetype: idVarDef; // for accessing fields
	//
	//	float			Divide( float numerator, float denominator );
	//	void			Error( const char *error, ... ) const id_attribute((format(printf,2,3)));
	//	void			Warning( const char *message, ... ) const id_attribute((format(printf,2,3)));
	//	idVarDef		*OptimizeOpcode( const opcode_t *op, idVarDef *var_a, idVarDef *var_b );
	//	idVarDef		*EmitOpcode( const opcode_t *op, idVarDef *var_a, idVarDef *var_b );
	//	idVarDef		*EmitOpcode( int op, idVarDef *var_a, idVarDef *var_b );
	//	bool			EmitPush( idVarDef *expression, const idTypeDef *funcArg );
	//	void			NextToken( void );
	//	void			ExpectToken( const char *string );
	//	bool			CheckToken( const char *string );
	//	void			ParseName( idStr &name );
	//	void			SkipOutOfFunction( void );
	//	void			SkipToSemicolon( void );
	//	idTypeDef		*CheckType( void );
	//	idTypeDef		*ParseType( void );
	//	idVarDef		*FindImmediate( const idTypeDef *type, const eval_t *eval, const char *string ) const;
	//	idVarDef		*GetImmediate( idTypeDef *type, const eval_t *eval, const char *string );
	//	idVarDef		*VirtualFunctionConstant( idVarDef *func );
	//	idVarDef		*SizeConstant( int size );
	//	idVarDef		*JumpConstant( int value );
	//	idVarDef		*JumpDef( int jumpfrom, int jumpto );
	//	idVarDef		*JumpTo( int jumpto );
	//	idVarDef		*JumpFrom( int jumpfrom );
	//	idVarDef		*ParseImmediate( void );
	//	idVarDef		*EmitFunctionParms( int op, idVarDef *func, int startarg, int startsize, idVarDef *object );
	//	idVarDef		*ParseFunctionCall( idVarDef *func );
	//	idVarDef		*ParseObjectCall( idVarDef *object, idVarDef *func );
	//	idVarDef		*ParseEventCall( idVarDef *object, idVarDef *func );
	//	idVarDef		*ParseSysObjectCall( idVarDef *func );
	//	idVarDef		*LookupDef( name:string, const idVarDef *baseobj );
	//	idVarDef		*ParseValue( void );
	//	idVarDef		*GetTerm( void );
	//	bool			TypeMatches( etype_t type1, etype_t type2 ) const;
	//	idVarDef		*GetExpression( int priority );
	//	idTypeDef		*GetTypeForEventArg( char argType );
	//	void			PatchLoop( int start, int continuePos );
	//	void			ParseReturnStatement( void );
	//	void			ParseWhileStatement( void );
	//	void			ParseForStatement( void );
	//	void			ParseDoWhileStatement( void );
	//	void			ParseIfStatement( void );
	//	void			this.ParseStatement( void );
	//	void			ParseObjectDef( const char *objname );
	//	idTypeDef		*ParseFunction( idTypeDef *returnType, name:string );
	//	void			ParseFunctionDef( idTypeDef *returnType, name:string );
	//	void			ParseVariableDef( idTypeDef *type, name:string );
	//	void			ParseEventDef( idTypeDef *type, name:string );
	//	void			ParseDefs( void );
	//	void			ParseNamespace( idVarDef *newScope );
	//
	//public :
	//	static opcode_t	opcodes[];
	//
	//					idCompiler();
	//	void			CompileFile( text:string, const char *filename, bool console );

	static punctuationValid = new Array<boolean>( 256 );
	static punctuation = [
		"+=", "-=", "*=", "/=", "%=", "&=", "|=", "++", "--",
		"&&", "||", "<=", ">=", "==", "!=", "::", ";", ",",
		"~", "!", "*", "/", "%", "(", ")", "-", "+",
		"=", "[", "]", ".", "<", ">", "&", "|", ":", null
	];

	static GetOpCodeIndex(op: opcode_t): number {
		// todo: maybe just put an index number on each opcode
		for (var i = 0; i < idCompiler.opcodes.length; i++) {
			if (op == idCompiler.opcodes[i]) {
				//statement.op = op - idCompiler.opcodes;
				return i;
			}
		}
		todoThrow( "Could not find opcode index" );
	}

	static opcodes = [
		new opcode_t( "<RETURN>", "RETURN", -1, false, def_void, def_void, def_void ),
		new opcode_t( "++", "UINC_F", 1, true, def_float, def_void, def_void ),
		new opcode_t( "++", "UINCP_F", 1, true, def_object, def_field, def_float ),
		new opcode_t( "--", "UDEC_F", 1, true, def_float, def_void, def_void ),
		new opcode_t( "--", "UDECP_F", 1, true, def_object, def_field, def_float ),
		new opcode_t( "~", "COMP_F", -1, false, def_float, def_void, def_float ),
		new opcode_t( "*", "MUL_F", 3, false, def_float, def_float, def_float ),
		new opcode_t( "*", "MUL_V", 3, false, def_vector, def_vector, def_float ),
		new opcode_t( "*", "MUL_FV", 3, false, def_float, def_vector, def_vector ),
		new opcode_t( "*", "MUL_VF", 3, false, def_vector, def_float, def_vector ),
		new opcode_t( "/", "DIV", 3, false, def_float, def_float, def_float ),
		new opcode_t( "%", "MOD_F", 3, false, def_float, def_float, def_float ),
		new opcode_t( "+", "ADD_F", 4, false, def_float, def_float, def_float ),
		new opcode_t( "+", "ADD_V", 4, false, def_vector, def_vector, def_vector ),
		new opcode_t( "+", "ADD_S", 4, false, def_string, def_string, def_string ),
		new opcode_t( "+", "ADD_FS", 4, false, def_float, def_string, def_string ),
		new opcode_t( "+", "ADD_SF", 4, false, def_string, def_float, def_string ),
		new opcode_t( "+", "ADD_VS", 4, false, def_vector, def_string, def_string ),
		new opcode_t( "+", "ADD_SV", 4, false, def_string, def_vector, def_string ),
		new opcode_t( "-", "SUB_F", 4, false, def_float, def_float, def_float ),
		new opcode_t( "-", "SUB_V", 4, false, def_vector, def_vector, def_vector ),
		new opcode_t( "==", "EQ_F", 5, false, def_float, def_float, def_float ),
		new opcode_t( "==", "EQ_V", 5, false, def_vector, def_vector, def_float ),
		new opcode_t( "==", "EQ_S", 5, false, def_string, def_string, def_float ),
		new opcode_t( "==", "EQ_E", 5, false, def_entity, def_entity, def_float ),
		new opcode_t( "==", "EQ_EO", 5, false, def_entity, def_object, def_float ),
		new opcode_t( "==", "EQ_OE", 5, false, def_object, def_entity, def_float ),
		new opcode_t( "==", "EQ_OO", 5, false, def_object, def_object, def_float ),
		new opcode_t( "!=", "NE_F", 5, false, def_float, def_float, def_float ),
		new opcode_t( "!=", "NE_V", 5, false, def_vector, def_vector, def_float ),
		new opcode_t( "!=", "NE_S", 5, false, def_string, def_string, def_float ),
		new opcode_t( "!=", "NE_E", 5, false, def_entity, def_entity, def_float ),
		new opcode_t( "!=", "NE_EO", 5, false, def_entity, def_object, def_float ),
		new opcode_t( "!=", "NE_OE", 5, false, def_object, def_entity, def_float ),
		new opcode_t( "!=", "NE_OO", 5, false, def_object, def_object, def_float ),
		new opcode_t( "<=", "LE", 5, false, def_float, def_float, def_float ),
		new opcode_t( ">=", "GE", 5, false, def_float, def_float, def_float ),
		new opcode_t( "<", "LT", 5, false, def_float, def_float, def_float ),
		new opcode_t( ">", "GT", 5, false, def_float, def_float, def_float ),
		new opcode_t( ".", "INDIRECT_F", 1, false, def_object, def_field, def_float ),
		new opcode_t( ".", "INDIRECT_V", 1, false, def_object, def_field, def_vector ),
		new opcode_t( ".", "INDIRECT_S", 1, false, def_object, def_field, def_string ),
		new opcode_t( ".", "INDIRECT_E", 1, false, def_object, def_field, def_entity ),
		new opcode_t( ".", "INDIRECT_BOOL", 1, false, def_object, def_field, def_boolean ),
		new opcode_t( ".", "INDIRECT_OBJ", 1, false, def_object, def_field, def_object ),
		new opcode_t( ".", "ADDRESS", 1, false, def_entity, def_field, def_pointer ),
		new opcode_t( ".", "EVENTCALL", 2, false, def_entity, def_function, def_void ),
		new opcode_t( ".", "OBJECTCALL", 2, false, def_object, def_function, def_void ),
		new opcode_t( ".", "SYSCALL", 2, false, def_void, def_function, def_void ),
		new opcode_t( "=", "STORE_F", 6, true, def_float, def_float, def_float ),
		new opcode_t( "=", "STORE_V", 6, true, def_vector, def_vector, def_vector ),
		new opcode_t( "=", "STORE_S", 6, true, def_string, def_string, def_string ),
		new opcode_t( "=", "STORE_ENT", 6, true, def_entity, def_entity, def_entity ),
		new opcode_t( "=", "STORE_BOOL", 6, true, def_boolean, def_boolean, def_boolean ),
		new opcode_t( "=", "STORE_OBJENT", 6, true, def_object, def_entity, def_object ),
		new opcode_t( "=", "STORE_OBJ", 6, true, def_object, def_object, def_object ),
		new opcode_t( "=", "STORE_OBJENT", 6, true, def_entity, def_object, def_object ),
		new opcode_t( "=", "STORE_FTOS", 6, true, def_string, def_float, def_string ),
		new opcode_t( "=", "STORE_BTOS", 6, true, def_string, def_boolean, def_string ),
		new opcode_t( "=", "STORE_VTOS", 6, true, def_string, def_vector, def_string ),
		new opcode_t( "=", "STORE_FTOBOOL", 6, true, def_boolean, def_float, def_boolean ),
		new opcode_t( "=", "STORE_BOOLTOF", 6, true, def_float, def_boolean, def_float ),
		new opcode_t( "=", "STOREP_F", 6, true, def_pointer, def_float, def_float ),
		new opcode_t( "=", "STOREP_V", 6, true, def_pointer, def_vector, def_vector ),
		new opcode_t( "=", "STOREP_S", 6, true, def_pointer, def_string, def_string ),
		new opcode_t( "=", "STOREP_ENT", 6, true, def_pointer, def_entity, def_entity ),
		new opcode_t( "=", "STOREP_FLD", 6, true, def_pointer, def_field, def_field ),
		new opcode_t( "=", "STOREP_BOOL", 6, true, def_pointer, def_boolean, def_boolean ),
		new opcode_t( "=", "STOREP_OBJ", 6, true, def_pointer, def_object, def_object ),
		new opcode_t( "=", "STOREP_OBJENT", 6, true, def_pointer, def_object, def_object ),
		new opcode_t( "<=>", "STOREP_FTOS", 6, true, def_pointer, def_float, def_string ),
		new opcode_t( "<=>", "STOREP_BTOS", 6, true, def_pointer, def_boolean, def_string ),
		new opcode_t( "<=>", "STOREP_VTOS", 6, true, def_pointer, def_vector, def_string ),
		new opcode_t( "<=>", "STOREP_FTOBOOL", 6, true, def_pointer, def_float, def_boolean ),
		new opcode_t( "<=>", "STOREP_BOOLTOF", 6, true, def_pointer, def_boolean, def_float ),
		new opcode_t( "*=", "UMUL_F", 6, true, def_float, def_float, def_void ),
		new opcode_t( "*=", "UMUL_V", 6, true, def_vector, def_float, def_void ),
		new opcode_t( "/=", "UDIV_F", 6, true, def_float, def_float, def_void ),
		new opcode_t( "/=", "UDIV_V", 6, true, def_vector, def_float, def_void ),
		new opcode_t( "%=", "UMOD_F", 6, true, def_float, def_float, def_void ),
		new opcode_t( "+=", "UADD_F", 6, true, def_float, def_float, def_void ),
		new opcode_t( "+=", "UADD_V", 6, true, def_vector, def_vector, def_void ),
		new opcode_t( "-=", "USUB_F", 6, true, def_float, def_float, def_void ),
		new opcode_t( "-=", "USUB_V", 6, true, def_vector, def_vector, def_void ),
		new opcode_t( "&=", "UAND_F", 6, true, def_float, def_float, def_void ),
		new opcode_t( "|=", "UOR_F", 6, true, def_float, def_float, def_void ),
		new opcode_t( "!", "NOT_BOOL", -1, false, def_boolean, def_void, def_float ),
		new opcode_t( "!", "NOT_F", -1, false, def_float, def_void, def_float ),
		new opcode_t( "!", "NOT_V", -1, false, def_vector, def_void, def_float ),
		new opcode_t( "!", "NOT_S", -1, false, def_vector, def_void, def_float ),
		new opcode_t( "!", "NOT_ENT", -1, false, def_entity, def_void, def_float ),
		new opcode_t( "<NEG_F>", "NEG_F", -1, false, def_float, def_void, def_float ),
		new opcode_t( "<NEG_V>", "NEG_V", -1, false, def_vector, def_void, def_vector ),
		new opcode_t( "int", "INT_F", -1, false, def_float, def_void, def_float ),
		new opcode_t( "<IF>", "IF", -1, false, def_float, def_jumpoffset, def_void ),
		new opcode_t( "<IFNOT>", "IFNOT", -1, false, def_float, def_jumpoffset, def_void ),

		// calls returns REG_RETURN
		new opcode_t( "<CALL>", "CALL", -1, false, def_function, def_argsize, def_void ),
		new opcode_t( "<THREAD>", "THREAD", -1, false, def_function, def_argsize, def_void ),
		new opcode_t( "<THREAD>", "OBJTHREAD", -1, false, def_function, def_argsize, def_void ),
		new opcode_t( "<PUSH>", "PUSH_F", -1, false, def_float, def_float, def_void ),
		new opcode_t( "<PUSH>", "PUSH_V", -1, false, def_vector, def_vector, def_void ),
		new opcode_t( "<PUSH>", "PUSH_S", -1, false, def_string, def_string, def_void ),
		new opcode_t( "<PUSH>", "PUSH_ENT", -1, false, def_entity, def_entity, def_void ),
		new opcode_t( "<PUSH>", "PUSH_OBJ", -1, false, def_object, def_object, def_void ),
		new opcode_t( "<PUSH>", "PUSH_OBJENT", -1, false, def_entity, def_object, def_void ),
		new opcode_t( "<PUSH>", "PUSH_FTOS", -1, false, def_string, def_float, def_void ),
		new opcode_t( "<PUSH>", "PUSH_BTOF", -1, false, def_float, def_boolean, def_void ),
		new opcode_t( "<PUSH>", "PUSH_FTOB", -1, false, def_boolean, def_float, def_void ),
		new opcode_t( "<PUSH>", "PUSH_VTOS", -1, false, def_string, def_vector, def_void ),
		new opcode_t( "<PUSH>", "PUSH_BTOS", -1, false, def_string, def_boolean, def_void ),
		new opcode_t( "<GOTO>", "GOTO", -1, false, def_jumpoffset, def_void, def_void ),
		new opcode_t( "&&", "AND", 7, false, def_float, def_float, def_float ),
		new opcode_t( "&&", "AND_BOOLF", 7, false, def_boolean, def_float, def_float ),
		new opcode_t( "&&", "AND_FBOOL", 7, false, def_float, def_boolean, def_float ),
		new opcode_t( "&&", "AND_BOOLBOOL", 7, false, def_boolean, def_boolean, def_float ),
		new opcode_t( "||", "OR", 7, false, def_float, def_float, def_float ),
		new opcode_t( "||", "OR_BOOLF", 7, false, def_boolean, def_float, def_float ),
		new opcode_t( "||", "OR_FBOOL", 7, false, def_float, def_boolean, def_float ),
		new opcode_t( "||", "OR_BOOLBOOL", 7, false, def_boolean, def_boolean, def_float ),
		new opcode_t( "&", "BITAND", 3, false, def_float, def_float, def_float ),
		new opcode_t( "|", "BITOR", 3, false, def_float, def_float, def_float ),
		new opcode_t( "<BREAK>", "BREAK", -1, false, def_float, def_void, def_void ),
		new opcode_t( "<CONTINUE>", "CONTINUE", -1, false, def_float, def_void, def_void ),
		new opcode_t(null,null,null,null,null,null,null)
	];

/*
================
idCompiler::idCompiler()
================
*/
constructor() {
	var ptr:number;
	var id:number;

	// make sure we have the right # of opcodes in the table
	//assert((sizeof(idCompiler.opcodes) / sizeof(idCompiler.  opcodes/*[ 0 ]*/ ) ) == ( op.NUM_OPCODES + 1 ) );

	this.eof	= true;
	this.parserPtr = this.parser;

	this.callthread			= false;
	this.loopDepth			= 0;
	this.eof				= false;
	this.braceDepth			= 0;
	this.immediateType		= null;
	this.basetype			= null;
	this.currentLineNumber	= 0;
	this.currentFileNumber	= 0;
	this.errorCount			= 0;
	this.console			= false;
	this.scope				= def_namespace;

	this.immediate.init ( );
	for (var i = 0; i < idCompiler.punctuationValid.length; i++ ) {
		idCompiler.punctuationValid[i] = false;
	}
	for ( ptr = 0; idCompiler.punctuation[ptr]; ptr++ ) {
		id = this.parserPtr.GetPunctuationId( idCompiler.punctuation[ptr] );
		if ( ( id >= 0 ) && ( id < 256 ) ) {
			idCompiler.punctuationValid[id] = true;
		}
	}
}

	/*
============
idCompiler::Error

Aborts the current file load
============
*/
	Error ( message: string, ...args: any[] ): void {
		todoThrow( message );
		//va_list	argptr;
		//char	string[ 1024 ];

		//va_start( argptr, message );
		//vsprintf( string, message, argptr );
		//va_end( argptr );

		//throw new idCompileError( string );
	}

///*
//============
//idCompiler::Warning
//
//Prints a warning about the current line
//============
//*/
//void idCompiler::Warning( const char *message, ... ) const {
//	va_list	argptr;
//	char	string[ 1024 ];
//
//	va_start( argptr, message );
//	vsprintf( string, message, argptr );
//	va_end( argptr );
//
//	this.parserPtr.Warning( "%s", string );
//}
//
/*
============
idCompiler::VirtualFunctionConstant

Creates a def for an index into a virtual function table
============
*/
	VirtualFunctionConstant ( func: idVarDef ): idVarDef {
		var eval = new eval_t();

		eval.init ( );
		eval._int = func.scope.TypeDef ( ).GetFunctionNumber( func.value.functionPtr );
		dlog(DEBUG_COMPILER, "VirtualFunctionConstant eval._int = %i\n", eval._int);
		if ( eval._int < 0 ) {
			this.Error( "Function '%s' not found in scope '%s'", func.Name ( ), func.scope.Name ( ) );
		}

		return this.GetImmediate( type_virtualfunction, eval, "" );
	}

/*
============
idCompiler::SizeConstant

Creates a def for a size constant
============
*/
	SizeConstant ( /*int */size: number ): idVarDef {
		var eval = new eval_t;
		eval._int = size;
		dlog(DEBUG_COMPILER, "SizeConstant eval._int = %i\n", eval._int);
		return this.GetImmediate( type_argsize, eval, "" );
	}

/*
============
idCompiler::JumpConstant

Creates a def for a jump constant
============
*/
	JumpConstant ( /*int */value: number ): idVarDef {
		var eval = new eval_t;
		eval._int = value;
		dlog(DEBUG_COMPILER, "JumpConstant eval._int = %i\n", eval._int);
		return this.GetImmediate( type_jumpoffset, eval, "" );
	}

/*
============
idCompiler::JumpDef

Creates a def for a relative jump from one code location to another
============
*/
	JumpDef ( /*int */jumpfrom: number, /*int */jumpto: number ): idVarDef {
		return this.JumpConstant( jumpto - jumpfrom );
	}

/*
============
idCompiler::JumpTo

Creates a def for a relative jump from current code location
============
*/
	JumpTo ( /*int*/ jumpto: number ): idVarDef {
		return this.JumpDef( gameLocal.program.NumStatements ( ), jumpto );
	}

/*
============
idCompiler::JumpFrom

Creates a def for a relative jump from code location to current code location
============
*/
	JumpFrom ( /*int*/ jumpfrom: number ): idVarDef {
		return this.JumpDef( jumpfrom, gameLocal.program.NumStatements ( ) );
	}

/*
============
idCompiler::Divide
============
*/
	Divide ( /*float*/ numerator: number, /*float */denominator: number ): /*float*/number {
		if ( denominator == 0 ) {
			this.Error( "Divide by zero" );
			return 0;
		}

		return numerator / denominator;
	}

/*
============
idCompiler::FindImmediate

tries to find an existing immediate with the same value
============
*/
	FindImmediate ( type: idTypeDef, eval: eval_t, $string: string ): idVarDef {
		var def: idVarDef;
		var etype: etype_t;

		etype = type.Type();
		dlog( DEBUG_COMPILER, "FindImmediate etype: %i, %s\n", etype , $string);

		// check for a constant with the same value
		for ( def = gameLocal.program.GetDefList( "<IMMEDIATE>" ); def /*!= NULL*/; def = def.Next ( ) ) {
			if ( def.TypeDef ( ) != type ) {
				continue;
			}

			switch ( etype ) {
			case etype_t.ev_field:
				dlog(DEBUG_COMPILER, "*def->value.intPtr == %i && eval->_int == %i\n", def.value.intPtr, eval._int);
				if ( /***/def.value.intPtr == eval._int ) {
					return def;
				}
				break;

			case etype_t.ev_argsize:
				dlog(DEBUG_COMPILER, "def->value.argSize == %i && eval->_int == %i\n", def.value.argSize, eval._int);
				if ( def.value.argSize == eval._int ) {
					return def;
				}
				break;

			case etype_t.ev_jumpoffset:
				dlog(DEBUG_COMPILER, "def->value.jumpOffset == %i && eval->_int == %i\n", def.value.jumpOffset, eval._int);
				if ( def.value.jumpOffset == eval._int ) {
					return def;
				}
				break;

			case etype_t.ev_entity:
				dlog(DEBUG_COMPILER, "*def->value.intPtr == %i && eval->entity == %i\n", def.value.intPtr, eval.entity);
				if ( /***/def.value.intPtr == eval.entity ) {
					return def;
				}
				break;

			case etype_t.ev_string:
				dlog(DEBUG_COMPILER, "def->value.stringPtr == %s && string == %s\n", def.value.stringPtr, $string);
				if ( idStr.Cmp( def.value.stringPtr, $string ) == 0 ) {
					return def;
				}
				break;

			case etype_t.ev_float:
				dlog(DEBUG_COMPILER, "*def->value.floatPtr == %.2f && eval->_float == %.2f\n", def.value.floatPtr, eval._float);
				if ( /***/def.value.floatPtr == eval._float ) {
					return def;
				}
				break;

			case etype_t.ev_virtualfunction:
				dlog(DEBUG_COMPILER, "def->value.virtualFunction == %i && eval->_int == %i\n", def.value.virtualFunction, eval._int);
				if ( def.value.virtualFunction == eval._int ) {
					return def;
				}
				break;


			case etype_t.ev_vector:
				if ( ( def.value.vectorPtr.x == eval.vector[0] ) &&
				( def.value.vectorPtr.y == eval.vector[1] ) &&
				( def.value.vectorPtr.z == eval.vector[2] ) ) {
					return def;
				}
				break;

			default:
				this.Error( "weird immediate type" );
				break;
			}
		}

		return null;
	}

/*
============
idCompiler::GetImmediate

returns an existing immediate with the same value, or allocates a new one
============
*/
	GetImmediate ( type: idTypeDef, eval: eval_t, $string: string ): idVarDef {
		var def: idVarDef;
		dlog(DEBUG_COMPILER, "GetImmediate str: %s, _int: %i\n", $string, eval._int);

		def = this.FindImmediate(type, eval, $string);
		dlog( DEBUG_COMPILER, "found def: %i\n", def ? 1 : 0 );
		if ( def ) {
			dlog(DEBUG_COMPILER, "found def: %s\n", def.Name());
			def.numUsers++;
		} else {
			// allocate a new def
			def = gameLocal.program.AllocDef( type, "<IMMEDIATE>", def_namespace, true );
			if ( type.Type ( ) == etype_t.ev_string ) {
				def.SetString( $string, true );
			} else {
				def.SetValue( /***/eval, true );
			}
		}

		return def;
	}

/*
============
idCompiler::OptimizeOpcode

try to optimize when the operator works on constants only
============
*/
	OptimizeOpcode ( op: opcode_t, var_a: idVarDef, var_b: idVarDef ): idVarDef {
		var c = new eval_t;
		var type: idTypeDef;

		if ( var_a && var_a.initialized != initialized_t.initializedConstant ) {
			return null;
		}
		if ( var_b && var_b.initialized != initialized_t.initializedConstant ) {
			return null;
		}

		var vec_c = new idVec3(c.vector); //idVec3 &vec_c = *reinterpret_cast<idVec3 *>( &c.vector[ 0 ] );

		c.init ( );//memset( &c, 0, sizeof( c ) );
		switch (idCompiler.GetOpCodeIndex(op) ) {
			case opc.OP_ADD_F:		c._float = var_a.value.floatPtr + var_b.value.floatPtr; type = type_float; break;
			case opc.OP_ADD_V:		todoThrow("vec_c = var_a.value.vectorPtr.plus(var_b.value.vectorPtr); type = type_vector;");	 break;
			case opc.OP_SUB_F:		c._float = var_a.value.floatPtr - var_b.value.floatPtr; type = type_float; break;
			case opc.OP_SUB_V:		todoThrow("vec_c = *var_a.value.vectorPtr - *var_b.value.vectorPtr; type = type_vector; ");break;
			case opc.OP_MUL_F:		c._float = var_a.value.floatPtr * var_b.value.floatPtr; type = type_float; break;
			case opc.OP_MUL_V:		c._float = var_a.value.vectorPtr.timesVec(var_b.value.vectorPtr); type = type_float; break;
			case opc.OP_MUL_FV:		todoThrow("vec_c = *var_b.value.vectorPtr * *var_a.value.floatPtr; type = type_vector;");break;
			case opc.OP_MUL_VF:		todoThrow("vec_c = *var_a.value.vectorPtr * *var_b.value.floatPtr; type = type_vector;");break;
			case opc.OP_DIV_F:		c._float = this.Divide( var_a.value.floatPtr, var_b.value.floatPtr ); type = type_float; break;
			case opc.OP_MOD_F:		c._float = /*(int)**/var_a.value.floatPtr % /*(int)**/var_b.value.floatPtr; type = type_float; break;
			case opc.OP_BITAND:		c._float = /*( int )*/var_a.value.floatPtr & /*( int )*/var_b.value.floatPtr; type = type_float; break;
			case opc.OP_BITOR:		c._float = /*( int )*/var_a.value.floatPtr | /*( int )*/var_b.value.floatPtr; type = type_float; break;
			case opc.OP_GE:			c._float = (var_a.value.floatPtr >= var_b.value.floatPtr)?1:0; type = type_float; break;
			case opc.OP_LE:			c._float = (var_a.value.floatPtr <= var_b.value.floatPtr)?1:0; type = type_float; break;
			case opc.OP_GT:			c._float = (var_a.value.floatPtr > var_b.value.floatPtr)?1:0; type = type_float; break;
			case opc.OP_LT:			c._float = (var_a.value.floatPtr < var_b.value.floatPtr)?1:0; type = type_float; break;
			case opc.OP_AND:		c._float = (var_a.value.floatPtr && var_b.value.floatPtr)?1:0; type = type_float; break;
			case opc.OP_OR:			c._float = (var_a.value.floatPtr || var_b.value.floatPtr)?1:0; type = type_float; break;
			case opc.OP_NOT_BOOL:	c._int = (!var_a.value.intPtr)?1:0; type = type_boolean; break;
			case opc.OP_NOT_F:		c._float = (!var_a.value.floatPtr)?1:0; type = type_float; break;
			case opc.OP_NOT_V:		c._float = (!var_a.value.vectorPtr.x && !var_a.value.vectorPtr.y && !var_a.value.vectorPtr.z)?1:0; type = type_float; break;
			case opc.OP_NEG_F:		c._float = -var_a.value.floatPtr; type = type_float; break;
			case opc.OP_NEG_V:		todoThrow("vec_c = -*var_a.value.vectorPtr; type = type_vector; ");break;
			case opc.OP_INT_F:		c._float = /*( int )*/var_a.value.floatPtr; type = type_float; break;
			case opc.OP_EQ_F:		c._float = ( var_a.value.floatPtr == var_b.value.floatPtr )?1:0; type = type_float; break;
			case opc.OP_EQ_V:		c._float = var_a.value.vectorPtr.Compare( var_b.value.vectorPtr )?1:0; type = type_float; break;
			case opc.OP_EQ_E:		c._float = ( var_a.value.intPtr == var_b.value.intPtr )?1:0; type = type_float; break;
			case opc.OP_NE_F:		c._float = ( var_a.value.floatPtr != var_b.value.floatPtr )?1:0; type = type_float; break;
			case opc.OP_NE_V:		c._float = (!var_a.value.vectorPtr.Compare( var_b.value.vectorPtr ))?1:0; type = type_float; break;
			case opc.OP_NE_E:		c._float = ( var_a.value.intPtr != var_b.value.intPtr )?1:0; type = type_float; break;
			case opc.OP_UADD_F:		c._float = var_b.value.floatPtr + var_a.value.floatPtr; type = type_float; break;
			case opc.OP_USUB_F:		c._float = var_b.value.floatPtr - var_a.value.floatPtr; type = type_float; break;
			case opc.OP_UMUL_F:		c._float = var_b.value.floatPtr * var_a.value.floatPtr; type = type_float; break;
			case opc.OP_UDIV_F:		c._float = this.Divide( var_b.value.floatPtr, var_a.value.floatPtr ); type = type_float; break;
			case opc.OP_UMOD_F:		c._float = /*( int ) **/var_b.value.floatPtr % /*( int )*/var_a.value.floatPtr; type = type_float; break;
			case opc.OP_UOR_F:		c._float = /*( int )*/var_b.value.floatPtr | /*( int )*/var_a.value.floatPtr; type = type_float; break;
			case opc.OP_UAND_F: 	c._float = /*( int )**/var_b.value.floatPtr & /*( int )*/var_a.value.floatPtr; type = type_float; break;
			case opc.OP_UINC_F:		c._float = var_a.value.floatPtr + 1; type = type_float; break;
			case opc.OP_UDEC_F:		c._float = var_a.value.floatPtr - 1; type = type_float; break;
			case opc.OP_COMP_F:		c._float = /*( float )*/~/*( int )*/var_a.value.floatPtr; type = type_float; break;
			default:			type = null; break;
		}

		if ( !type ) {
			return null;
		}

		dlog(DEBUG_COMPILER, "OptimizeOpcode c._int = %i\n", c._int);
		if ( var_a ) {
			var_a.numUsers--;
			if ( var_a.numUsers <= 0 ) {
				gameLocal.program.FreeDef(var_a, null );
			}
		}
		if ( var_b ) {
			var_b.numUsers--;
			if ( var_b.numUsers <= 0 ) {
				gameLocal.program.FreeDef(var_b, null );
			}
		}

		return this.GetImmediate( type, /*&*/c, "" );
	}

/*
============
idCompiler::EmitOpcode

Emits a primitive statement, returning the var it places it's value in
============
*/
	EmitOpcode ( op: opcode_t, var_a: idVarDef, var_b: idVarDef ): idVarDef {
		var statement: statement_t;
		var var_c: idVarDef;

		var_c = this.OptimizeOpcode( op, var_a, var_b );
		if ( var_c ) {
			return var_c;
		}

		if ( var_a && !strcmp( var_a.Name ( ), RESULT_STRING ) ) {
			var_a.numUsers++;
		}
		if ( var_b && !strcmp( var_b.Name ( ), RESULT_STRING ) ) {
			var_b.numUsers++;
		}

		statement = gameLocal.program.AllocStatement ( );
		statement.linenumber = this.currentLineNumber;
		statement.file = this.currentFileNumber; dlog(DEBUG_COMPILER, "EmitOpcode currentFileNumber: %i, currentLineNumber: %i\n", this.currentFileNumber, this.currentLineNumber );

		if ( ( op.type_c == def_void ) || op.rightAssociative ) {
			// ifs, gotos, and assignments don't need vars allocated
			var_c = null;
		} else {
			// allocate result space
			// try to reuse result defs as much as possible
			var_c = gameLocal.program.FindFreeResultDef( op.type_c.TypeDef ( ), RESULT_STRING, this.scope, var_a, var_b );
			// set user count back to 1, a result def needs to be used twice before it can be reused
			var_c.numUsers = 1;
		}

		statement.op = idCompiler.GetOpCodeIndex( op );
		statement.a = var_a;
		statement.b = var_b;
		statement.c = var_c;

		if ( op.rightAssociative ) {
			return var_a;
		}

		return var_c;
	}

/*
============
idCompiler::EmitOpcode

Emits a primitive statement, returning the var it places it's value in
============
*/
	EmitOpcode_FromOpNumber ( /*int*/ op: number, var_a: idVarDef, var_b: idVarDef ): idVarDef {
		return this.EmitOpcode( idCompiler.opcodes[op], var_a, var_b );
	}

/*
============
idCompiler::EmitPush

Emits an opcode to push the variable onto the stack.
============
*/
	EmitPush ( expression: idVarDef, funcArg: idTypeDef ): boolean {
		var op: opcode_t, opIdx: number;
		var out: opcode_t;

		out = null;
		for ( op = idCompiler.opcodes[opIdx = opc.OP_PUSH_F]; op.name && !strcmp( op.name, "<PUSH>" ); op = idCompiler.opcodes[++opIdx] ) {
			if ( ( funcArg.Type ( ) == op.type_a.Type ( ) ) && ( expression.Type ( ) == op.type_b.Type ( ) ) ) {
				out = op;
				break;
			}
		}

		if ( !out ) {
			if ( ( expression.TypeDef ( ) != funcArg ) && !expression.TypeDef ( ).Inherits( funcArg ) ) {
				return false;
			}

			out = idCompiler.opcodes[opc.OP_PUSH_ENT];
		}

		this.EmitOpcode( out, expression, /*0*/null );

		return true;
	}

/*
==============
idCompiler::NextToken

Sets token, immediateType, and possibly immediate
==============
*/
	NextToken ( ): void {
		var /*int */i: number;

		// reset our type
		this.immediateType = null;
		this.immediate.init ( );

		// Save the token's line number and filename since when we emit opcodes the current 
		// token is always the next one to be read 
		this.currentLineNumber = this.token.$.line;
		this.currentFileNumber = gameLocal.program.GetFilenum( this.parserPtr.GetFileName ( ) );

		if ( !this.parserPtr.ReadToken( this.token ) ) {
			this.eof = true;
			return;
		}

		if ( this.currentFileNumber != gameLocal.program.GetFilenum( this.parserPtr.GetFileName ( ) ) ) {
			if ( ( this.braceDepth > 0 ) && ( this.token.$.data != "}" ) ) {
				// missing a closing brace.  try to give as much info as possible.
				if ( this.scope.Type ( ) == etype_t.ev_function ) {
					this.Error( "Unexpected end of file inside function '%s'.  Missing closing braces.", this.scope.Name ( ) );
				} else if ( this.scope.Type ( ) == etype_t.ev_object ) {
					this.Error( "Unexpected end of file inside object '%s'.  Missing closing braces.", this.scope.Name ( ) );
				} else if ( this.scope.Type ( ) == etype_t.ev_namespace ) {
					this.Error( "Unexpected end of file inside namespace '%s'.  Missing closing braces.", this.scope.Name ( ) );
				} else {
					this.Error( "Unexpected end of file inside braced section" );
				}
			}
		}

		//if (this.token.$.type == 3 && this.token.$.data == "0" && this.token.$.line  == 28 )debugger;
		dlog( DEBUG_COMPILER, "NextToken - type: %i, data: %s, line: %i\n", this.token.$.type, this.token.$.data, this.token.$.line );

		switch ( this.token.$.type ) {
		case TT_STRING:
			// handle quoted strings as a unit
			this.immediateType = type_string;
			return;

		case TT_LITERAL:
		{
			// handle quoted vectors as a unit
			this.immediateType = type_vector;
			var lex = new idLexer( this.token.$.data, this.token.$.Length ( ), this.parserPtr.GetFileName ( ), lexerFlags_t.LEXFL_NOERRORS );
			var token2 = new R( new idToken );
			for ( i = 0; i < 3; i++ ) {
				if ( !lex.ReadToken( token2 ) ) {
					this.Error( "Couldn't read vector. '%s' is not in the form of 'x y z'", this.token.$.c_str ( ) );
				}
				if ( token2.$.type == TT_PUNCTUATION && token2.$.data == "-" ) {
					if ( !lex.CheckTokenType( TT_NUMBER, 0, token2 ) ) {
						this.Error( "expected a number following '-' but found '%s' in vector '%s'", token2.$.c_str ( ), this.token.$.c_str ( ) );
					}
					todoThrow ( );
					//this.immediate.vector[ i ] = -token2.$.GetFloatValue();
				} else if ( token2.$.type == TT_NUMBER ) {
					todoThrow ( );
					//this.immediate.vector[i] = token2.$.GetFloatValue ( );
				} else {
					this.Error( "vector '%s' is not in the form of 'x y z'.  expected float value, found '%s'", this.token.$.c_str ( ), token2.$.c_str ( ) );
				}
			}
			return;
		}

		case TT_NUMBER:
			this.immediateType = type_float;
			this.immediate._float = this.token.$.GetFloatValue ( );
			dlog( DEBUG_COMPILER, "TT_NUMBER set float immediate._int = %i\n", this.immediate._int );
			return;

		case TT_PUNCTUATION:
			// entity names
			if ( this.token.$.data == "$" ) {
				this.immediateType = type_entity;
				this.parserPtr.ReadToken( this.token );
				return;
			}

			if ( this.token.$.data == "{" ) {
				this.braceDepth++;
				return;
			}

			if ( this.token.$.data == "}" ) {
				this.braceDepth--;
				return;
			}

			if ( idCompiler.punctuationValid[this.token.$.subtype] ) {
				return;
			}

			this.Error( "Unknown punctuation '%s'", this.token.$.c_str ( ) );
			break;

		case TT_NAME:
			return;

		default:
			this.Error( "Unknown token '%s'", this.token.$.c_str ( ) );
		}
	}

/*
=============
idCompiler::ExpectToken

Issues an Error if the current token isn't equal to string
Gets the next token
=============
*/
	ExpectToken ( $string: string ): void {
		if ( this.token.$.data != $string ) {
			this.Error( "expected '%s', found '%s'", $string, this.token.$.c_str ( ) );
		}

		this.NextToken ( );
	}

/*
=============
idCompiler::CheckToken

Returns true and gets the next token if the current token equals string
Returns false and does nothing otherwise
=============
*/
	CheckToken ( $string: string ): boolean {
		if ( this.token.$.data != $string ) {
			return false;
		}

		this.NextToken ( );

		return true;
	}

/*
============
idCompiler::ParseName

Checks to see if the current token is a valid name
============
*/
	ParseName ( name: idStr ): void {
		if ( this.token.$.type != TT_NAME ) {
			this.Error( "'%s' is not a name", this.token.$.c_str ( ) );
		}

		name.equals( this.token.$.data );
		this.NextToken ( );
	}

///*
//============
//idCompiler::SkipOutOfFunction
//
//For error recovery, pops out of nested braces
//============
//*/
//void idCompiler::SkipOutOfFunction( void ) {
//	while( this.braceDepth ) {
//		this.parserPtr.SkipBracedSection( false );
//		this.braceDepth--;
//	}
//	this.NextToken();
//}
//
///*
//============
//idCompiler::SkipToSemicolon
//
//For error recovery
//============
//*/
//void idCompiler::SkipToSemicolon( void ) {
//	do {
//		if ( this.CheckToken( ";" ) ) {
//			return;
//		}
//
//		this.NextToken();
//	} while( !this.eof );
//}

/*
============
idCompiler::CheckType

Parses a variable type, including functions types
============
*/
	CheckType ( ): idTypeDef {
		var type: idTypeDef;

		if ( this.token.$.data == "float" ) {
			type = type_float;
		} else if ( this.token.$.data == "vector" ) {
			type = type_vector;
		} else if ( this.token.$.data == "entity" ) {
			type = type_entity;
		} else if ( this.token.$.data == "string" ) {
			type = type_string;
		} else if ( this.token.$.data == "void" ) {
			type = type_void;
		} else if ( this.token.$.data == "object" ) {
			type = type_object;
		} else if ( this.token.$.data == "boolean" ) {
			type = type_boolean;
		} else if ( this.token.$.data == "namespace" ) {
			type = type_namespace;
		} else if ( this.token.$.data == "scriptEvent" ) {
			type = type_scriptevent;
		} else {
			type = gameLocal.program.FindType( this.token.$.c_str ( ) );
			if ( type && !type.Inherits( type_object ) ) {
				type = null;
			}
		}

		return type;
	}

/*
============
idCompiler::ParseType

Parses a variable type, including functions types
============
*/
	ParseType ( ): idTypeDef {
		var type: idTypeDef;

		type = this.CheckType ( );
		if ( !type ) {
			this.Error( "\"%s\" is not a type", this.token.$.c_str ( ) );
		}

		if ( ( type == type_scriptevent ) && ( this.scope != def_namespace ) ) {
			this.Error( "scriptEvents can only defined in the global namespace" );
		}

		if ( ( type == type_namespace ) && ( this.scope.Type ( ) != etype_t.ev_namespace ) ) {
			this.Error( "A namespace may only be defined globally, or within another namespace" );
		}

		this.NextToken ( );

		return type;
	}

/*
============
idCompiler::ParseImmediate

Looks for a preexisting constant
============
*/
	ParseImmediate ( ): idVarDef {
		var def: idVarDef;

		def = this.GetImmediate( this.immediateType, this.immediate, this.token.$.c_str ( ) );
		this.NextToken ( );

		return def;
	}

/*
============
idCompiler::EmitFunctionParms
============
*/
	EmitFunctionParms ( /*int*/ op: number, func: idVarDef, /*int */startarg: number, /*int */startsize: number, object: idVarDef ): idVarDef {
		var e: idVarDef;
		var type: idTypeDef;
		var funcArg: idTypeDef;
		var returnDef: idVarDef;
		var returnType: idTypeDef;
		var arg: number; //int 			
		var size: number; //int 			
		var resultOp: number; //int				

		type = func.TypeDef ( );
		if ( func.Type ( ) != etype_t.ev_function ) {
			this.Error( "'%s' is not a function", func.Name ( ) );
		}

		// copy the parameters to the global parameter variables
		arg = startarg;
		size = startsize;
		if ( !this.CheckToken( ")" ) ) {
			do {
				if ( arg >= type.NumParameters ( ) ) {
					this.Error( "too many parameters" );
				}

				e = this.GetExpression( TOP_PRIORITY );

				funcArg = type.GetParmType( arg );
				if ( !this.EmitPush( e, funcArg ) ) {
					this.Error( "type mismatch on parm %i of call to '%s'", arg + 1, func.Name ( ) );
				}

				if ( funcArg.Type ( ) == etype_t.ev_object ) {
					size += type_object.Size ( );
				} else {
					size += funcArg.Size ( );
				}

				arg++;
			} while ( this.CheckToken( "," ) );

			this.ExpectToken( ")" );
		}

		if ( arg < type.NumParameters ( ) ) {
			this.Error( "too few parameters for function '%s'", func.Name ( ) );
		}

		if ( op == opc.OP_CALL ) {
			this.EmitOpcode_FromOpNumber( op, func, /*0*/null );
		} else if ( ( op == opc.OP_OBJECTCALL ) || ( op == opc.OP_OBJTHREAD ) ) {
			this.EmitOpcode_FromOpNumber( op, object, this.VirtualFunctionConstant( func ) );

			// need arg size seperate since script object may be NULL
			var statement = gameLocal.program.GetStatement( gameLocal.program.NumStatements ( ) - 1 );
			statement.c = this.SizeConstant( func.value.functionPtr.parmTotal );
		} else {
			this.EmitOpcode_FromOpNumber( op, func, this.SizeConstant( size ) );
		}

		// we need to copy off the result into a temporary result location, so figure out the opcode
		returnType = type.ReturnType ( );
		if ( returnType.Type ( ) == etype_t.ev_string ) {
			resultOp = opc.OP_STORE_S;
			returnDef = gameLocal.program.returnStringDef;
		} else {
			gameLocal.program.returnDef.SetTypeDef( returnType );
			returnDef = gameLocal.program.returnDef;

			switch ( returnType.Type ( ) ) {
			case etype_t.ev_void:
				resultOp = opc.OP_STORE_F;
				break;

			case etype_t.ev_boolean:
				resultOp = opc.OP_STORE_BOOL;
				break;

			case etype_t.ev_float:
				resultOp = opc.OP_STORE_F;
				break;

			case etype_t.ev_vector:
				resultOp = opc.OP_STORE_V;
				break;

			case etype_t.ev_entity:
				resultOp = opc.OP_STORE_ENT;
				break;

			case etype_t.ev_object:
				resultOp = opc.OP_STORE_OBJ;
				break;

			default:
				// shut up compiler
				resultOp = opc.OP_STORE_OBJ;
				this.Error( "Invalid return type for function '%s'", func.Name ( ) );
				break;
			}
		}

		if ( returnType.Type ( ) == etype_t.ev_void ) {
			// don't need result space since there's no result, so just return the normal result def.
			return returnDef;
		}

		// allocate result space
		// try to reuse result defs as much as possible
		var statement = gameLocal.program.GetStatement( gameLocal.program.NumStatements ( ) - 1 );
		var resultDef = gameLocal.program.FindFreeResultDef( returnType, RESULT_STRING, this.scope, statement.a, statement.b );
		// set user count back to 0, a result def needs to be used twice before it can be reused
		resultDef.numUsers = 0;

		this.EmitOpcode_FromOpNumber( resultOp, returnDef, resultDef );

		return resultDef;
	}

/*
============
idCompiler::ParseFunctionCall
============
*/
	ParseFunctionCall(funcDef: idVarDef): idVarDef {
	assert( funcDef );

	if ( funcDef.Type() != etype_t.ev_function ) {
		this.Error( "'%s' is not a function", funcDef.Name() );
	}

	if ( funcDef.initialized == initialized_t.uninitialized ) {
		this.Error( "Function '%s' has not been defined yet", funcDef.GlobalName() );
	}

	assert( funcDef.value.functionPtr );
	if ( this.callthread ) {
		if ( ( funcDef.initialized != initialized_t.uninitialized ) && funcDef.value.functionPtr.eventdef ) {
			this.Error( "Built-in functions cannot be called as threads" );
		}
		this.callthread = false;
		return this.EmitFunctionParms(opc.OP_THREAD, funcDef, 0, 0, null );
	} else {
		if ( ( funcDef.initialized != initialized_t.uninitialized ) && funcDef.value.functionPtr.eventdef ) {
			if ( ( this.scope.Type() != etype_t.ev_namespace ) && ( this.scope.scope.Type() == etype_t.ev_object ) ) {
				// get the local object pointer
				var /***/thisdef = gameLocal.program.GetDef( this.scope.scope.TypeDef(), "self", this.scope );
				if ( !thisdef ) {
					this.Error( "No 'self' within scope" );
				}

				return this.ParseEventCall( thisdef, funcDef );
			} else {
				this.Error( "Built-in functions cannot be called without an object" );
			}
		}

		return this.EmitFunctionParms(opc.OP_CALL, funcDef, 0, 0, null );
	}
}

/*
============
idCompiler::ParseObjectCall
============
*/
	ParseObjectCall ( object: idVarDef, func: idVarDef ): idVarDef {
		this.EmitPush( object, object.TypeDef ( ) );
		if ( this.callthread ) {
			this.callthread = false;
			return this.EmitFunctionParms( opc.OP_OBJTHREAD, func, 1, type_object.Size ( ), object );
		} else {
			return this.EmitFunctionParms( opc.OP_OBJECTCALL, func, 1, 0, object );
		}
	}

/*
============
idCompiler::ParseEventCall
============
*/
	ParseEventCall ( object: idVarDef, funcDef: idVarDef ): idVarDef {
		if ( this.callthread ) {
			this.Error( "Cannot call built-in functions as a thread" );
		}

		if ( funcDef.Type ( ) != etype_t.ev_function ) {
			this.Error( "'%s' is not a function", funcDef.Name ( ) );
		}

		if ( !funcDef.value.functionPtr.eventdef ) {
			this.Error( "\"%s\" cannot be called with object notation", funcDef.Name ( ) );
		}

		if ( object.Type ( ) == etype_t.ev_object ) {
			this.EmitPush( object, type_entity );
		} else {
			this.EmitPush( object, object.TypeDef ( ) );
		}

		return this.EmitFunctionParms(opc.OP_EVENTCALL, funcDef, 0, type_object.Size(), null );
	}

/*
============
idCompiler::ParseSysObjectCall
============
*/
	ParseSysObjectCall ( funcDef: idVarDef ): idVarDef {
		if ( this.callthread ) {
			this.Error( "Cannot call built-in functions as a thread" );
		}

		if ( funcDef.Type ( ) != etype_t.ev_function ) {
			this.Error( "'%s' is not a function", funcDef.Name ( ) );
		}

		if ( !funcDef.value.functionPtr.eventdef ) {
			this.Error( "\"%s\" cannot be called with object notation", funcDef.Name ( ) );
		}

		if ( !idThread.Type.RespondsTo( funcDef.value.functionPtr.eventdef ) ) {
			this.Error( "\"%s\" is not callable as a 'sys' function", funcDef.Name ( ) );
		}

		return this.EmitFunctionParms( opc.OP_SYSCALL, funcDef, 0, 0, null );
	}

/*
============
idCompiler::LookupDef
============
*/
	LookupDef ( name: string, baseobj: idVarDef ): idVarDef {
		var def: idVarDef;
		var field: idVarDef;
		var type_b: etype_t;
		var type_c: etype_t;
		var op: opcode_t;

		// check if we're accessing a field
		if ( baseobj && ( baseobj.Type ( ) == etype_t.ev_object ) ) {
			var tdef: idVarDef;

			def = null;
			for ( tdef = baseobj; tdef != def_object; tdef = tdef.TypeDef ( ).SuperClass ( ).def ) {
				def = gameLocal.program.GetDef( null, name, tdef );
				if ( def ) {
					break;
				}
			}
		} else {
			// first look through the defs in our scope
			def = gameLocal.program.GetDef( null, name, this.scope );
			if ( !def ) {
				// if we're in a member function, check types local to the object
				if ( ( this.scope.Type ( ) != etype_t.ev_namespace ) && ( this.scope.scope.Type ( ) == etype_t.ev_object ) ) {
					// get the local object pointer
					var thisdef = gameLocal.program.GetDef( this.scope.scope.TypeDef ( ), "self", this.scope );

					field = this.LookupDef( name, this.scope.scope.TypeDef ( ).def );
					if ( !field ) {
						this.Error( "Unknown value \"%s\"", name );
					}

					// type check
					type_b = field.Type ( );
					if ( field.Type ( ) == etype_t.ev_function ) {
						type_c = field.TypeDef ( ).ReturnType ( ).Type ( );
					} else {
						type_c = field.TypeDef ( ).FieldType ( ).Type ( ); // field access gets type from field
						if ( this.CheckToken( "++" ) ) {
							if ( type_c != etype_t.ev_float ) {
								this.Error( "Invalid type for ++" );
							}
							def = this.EmitOpcode_FromOpNumber( opc.OP_UINCP_F, thisdef, field );
							return def;
						} else if ( this.CheckToken( "--" ) ) {
							if ( type_c != etype_t.ev_float ) {
								this.Error( "Invalid type for --" );
							}
							def = this.EmitOpcode_FromOpNumber( opc.OP_UDECP_F, thisdef, field );
							return def;
						}
					}
					var opIdx: number;
					op = idCompiler.opcodes[opIdx = opc.OP_INDIRECT_F];
					while ( ( op.type_a.Type ( ) != etype_t.ev_object )
						|| ( type_b != op.type_b.Type ( ) ) || ( type_c != op.type_c.Type ( ) ) ) {
						if ( ( op.priority == FUNCTION_PRIORITY ) && ( op.type_a.Type ( ) == etype_t.ev_object ) && ( op.type_c.Type ( ) == etype_t.ev_void ) &&
						( type_c != op.type_c.Type ( ) ) ) {
							// catches object calls that return a value
							break;
						}
						op = idCompiler.opcodes[++opIdx];
						if ( !op.name || strcmp( op.name, "." ) ) {
							this.Error( "no valid opcode to access type '%s'", field.TypeDef ( ).SuperClass ( ).Name ( ) );
						}
					}

					if ( ( /*op - idCompiler.opcodes*/ opIdx ) == opc.OP_OBJECTCALL ) {
						this.ExpectToken( "(" );
						def = this.ParseObjectCall( thisdef, field );
					} else {
						// emit the conversion opcode
						def = this.EmitOpcode( op, thisdef, field );

						// field access gets type from field
						def.SetTypeDef( field.TypeDef ( ).FieldType ( ) );
					}
				}
			}
		}

		return def;
	}

/*
============
idCompiler::ParseValue

Returns the def for the current token
============
*/
	ParseValue(): idVarDef{
		var def: idVarDef;
		var namespaceDef: idVarDef	;
		var name = new idStr;
	
	if ( this.immediateType == type_entity ) {
		// if an immediate entity ($-prefaced name) then create or lookup a def for it.
		// when entities are spawned, they'll lookup the def and point it to them.
		def = gameLocal.program.GetDef( type_entity, "$" + this.token.$.data, def_namespace );
		if ( !def ) {
			def = gameLocal.program.AllocDef( type_entity, "$" + this.token.$.data, def_namespace, true );
		}
		this.NextToken();
		return def;
	} else if ( this.immediateType ) {
		// if the token is an immediate, allocate a constant for it
		return this.ParseImmediate();
	}

	this.ParseName( name );
	def = this.LookupDef( name.data, this.basetype );
	if ( !def ) {
		if ( this.basetype ) {
			this.Error( "%s is not a member of %s", name.c_str(), this.basetype.TypeDef().Name() );
		} else {
			this.Error( "Unknown value \"%s\"", name.c_str() );
		}
	// if namespace, then look up the variable in that namespace
	} else if ( def.Type() == etype_t.ev_namespace ) {
		while( def.Type() == etype_t.ev_namespace ) {
			this.ExpectToken( "::" );
			this.ParseName( name );
			namespaceDef = def;
			def = gameLocal.program.GetDef( null, name.data, namespaceDef );
			if ( !def ) {
				this.Error( "Unknown value \"%s::%s\"", namespaceDef.GlobalName(), name.c_str() );
			}
		}
		//def = this.LookupDef( name.data, this.basetype );
	}

	return def;
}

/*
============
idCompiler::GetTerm
============
*/
	GetTerm ( ): idVarDef {
		var e: idVarDef;
		var /*int*/op: number;

		if ( !this.immediateType && this.CheckToken( "~" ) ) {
			e = this.GetExpression( TILDE_PRIORITY );
			switch ( e.Type ( ) ) {
			case etype_t.ev_float:
				op = opc.OP_COMP_F;
				break;

			default:
				// shut up compiler
				op = opc.OP_COMP_F;

				this.Error( "type mismatch for ~" );
				break;
			}

			return this.EmitOpcode_FromOpNumber( op, e, null /*0*/ );
		}

		if ( !this.immediateType && this.CheckToken( "!" ) ) {
			e = this.GetExpression( NOT_PRIORITY );
			switch ( e.Type ( ) ) {
			case etype_t.ev_boolean:
				op = opc.OP_NOT_BOOL;
				break;

			case etype_t.ev_float:
				op = opc.OP_NOT_F;
				break;

			case etype_t.ev_string:
				op = opc.OP_NOT_S;
				break;

			case etype_t.ev_vector:
				op = opc.OP_NOT_V;
				break;

			case etype_t.ev_entity:
				op = opc.OP_NOT_ENT;
				break;

			case etype_t.ev_function:
				// shut up compiler
				op = opc.OP_NOT_F;

				this.Error( "Invalid type for !" );
				break;

			case etype_t.ev_object:
				op = opc.OP_NOT_ENT;
				break;

			default:
				// shut up compiler
				op = opc.OP_NOT_F;

				this.Error( "type mismatch for !" );
				break;
			}

			return this.EmitOpcode_FromOpNumber( op, e, null /*0*/ );
		}

		// check for negation operator
		if ( !this.immediateType && this.CheckToken( "-" ) ) {
			// constants are directly negated without an instruction
			if ( this.immediateType == type_float ) {
				this.immediate._float = -this.immediate._float;
				dlog(DEBUG_COMPILER, "GetTerm negate float immediate._int = %i\n", this.immediate._int);
				return this.ParseImmediate ( );
			} else if ( this.immediateType == type_vector ) {
				this.immediate.vector[0] = -this.immediate.vector[0];
				this.immediate.vector[1] = -this.immediate.vector[1];
				this.immediate.vector[2] = -this.immediate.vector[2];
				return this.ParseImmediate ( );
			} else {
				e = this.GetExpression( NOT_PRIORITY );
				switch ( e.Type ( ) ) {
				case etype_t.ev_float:
					op = opc.OP_NEG_F;
					break;

				case etype_t.ev_vector:
					op = opc.OP_NEG_V;
					break;
				default:
					// shut up compiler
					op = opc.OP_NEG_F;

					this.Error( "type mismatch for -" );
					break;
				}
				return this.EmitOpcode( idCompiler.opcodes[op], e, null /*0*/ );
			}
		}

		if ( this.CheckToken( "int" ) ) {
			this.ExpectToken( "(" );

			e = this.GetExpression( INT_PRIORITY );
			if ( e.Type ( ) != etype_t.ev_float ) {
				this.Error( "type mismatch for int()" );
			}

			this.ExpectToken( ")" );

			return this.EmitOpcode_FromOpNumber( opc.OP_INT_F, e, null /*0*/ );
		}

		if ( this.CheckToken( "thread" ) ) {
			this.callthread = true;
			e = this.GetExpression( FUNCTION_PRIORITY );

			if ( this.callthread ) {
				this.Error( "Invalid thread call" );
			}

			// threads return the thread number
			gameLocal.program.returnDef.SetTypeDef( type_float );
			return gameLocal.program.returnDef;
		}

		if ( !this.immediateType && this.CheckToken( "(" ) ) {
			e = this.GetExpression( TOP_PRIORITY );
			this.ExpectToken( ")" );

			return e;
		}

		return this.ParseValue ( );
	}

/*
==============
idCompiler::TypeMatchesd
==============
*/
	TypeMatches ( type1: etype_t, type2: etype_t ): boolean {
		if ( type1 == type2 ) {
			return true;
		}

		//if ( ( type1 == etype_t.ev_entity ) && ( type2 == etype_t.ev_object ) ) {
		//	return true;
		//}

		//if ( ( type2 == etype_t.ev_entity ) && ( type1 == etype_t.ev_object ) ) {
		//	return true;
		//}

		return false;
	}

/*
==============
idCompiler::GetExpression
==============
*/
	GetExpression ( /*int */priority: number ): idVarDef {
		var op: opcode_t, opIdx = 0;
		var oldop: opcode_t;
		var e: idVarDef;
		var e2: idVarDef;
		var oldtype: idVarDef;
		var type_a: etype_t;
		var type_b: etype_t;
		var type_c: etype_t;

		if ( priority == 0 ) {
			return this.GetTerm ( );
		}
		e = this.GetExpression( priority - 1 );
		if ( this.token.$.data == ";" ) {
			// save us from searching through the opcodes unneccesarily
			return e;
		}

		dlog(DEBUG_COMPILER, "GetExpression: e.num: %i, %s\n", e.num, e.Name());
		while ( true ) {
			if ( ( priority == FUNCTION_PRIORITY ) && this.CheckToken( "(" ) ) {
				return this.ParseFunctionCall( e );
			}

			// has to be a punctuation
			if ( this.immediateType ) {
				break;
			}

			for ( op = idCompiler.opcodes[opIdx = 0]; op.name; op = idCompiler.opcodes[++opIdx] ) {
				if ( ( op.priority == priority ) && this.CheckToken( op.name ) ) {
					break;
				}
			}

			if ( !op.name ) {
				// next token isn't at this priority level
				break;
			}

			// unary operators act only on the left operand
			if ( op.type_b == def_void ) {
				e = this.EmitOpcode( op, e, null /*0*/ );
				return e;
			}

			// preserve our base type
			oldtype = this.basetype;

			// field access needs scope from object
			if ( ( op.name[0] == '.' ) && e.TypeDef ( ).Inherits( type_object ) ) {
				// save off what type this field is part of
				this.basetype = e.TypeDef ( ).def;
			}

			if ( op.rightAssociative ) {
				// if last statement is an indirect, change it to an address of
				if ( gameLocal.program.NumStatements ( ) > 0 ) {
					var statement: statement_t = gameLocal.program.GetStatement( gameLocal.program.NumStatements ( ) - 1 );
					if ( ( statement.op >= opc.OP_INDIRECT_F ) && ( statement.op < opc.OP_ADDRESS ) ) {
						statement.op = opc.OP_ADDRESS;
						type_pointer.SetPointerType( e.TypeDef ( ) );
						e.SetTypeDef( type_pointer );
					}
				}

				e2 = this.GetExpression( priority );
			} else {
				e2 = this.GetExpression( priority - 1 );
			}

			// restore type
			this.basetype = oldtype;

			// type check
			type_a = e.Type ( );
			type_b = e2.Type ( );

			// field access gets type from field
			if ( op.name[0] == '.' ) {
				if ( ( e2.Type ( ) == etype_t.ev_function ) && e2.TypeDef ( ).ReturnType ( ) ) {
					type_c = e2.TypeDef ( ).ReturnType ( ).Type ( );
				} else if ( e2.TypeDef ( ).FieldType ( ) ) {
					type_c = e2.TypeDef ( ).FieldType ( ).Type ( );
				} else {
					// not a field
					type_c = etype_t.ev_error;
				}
			} else {
				type_c = etype_t.ev_void;
			}

			oldop = op;
			dlog(DEBUG_COMPILER, "GetExpression: oldop: %s, opIdx: %i\n", op.name, opIdx );
			while ( !this.TypeMatches( type_a, op.type_a.Type ( ) ) || !this.TypeMatches( type_b, op.type_b.Type ( ) ) ||
			( ( type_c != etype_t.ev_void ) && !this.TypeMatches( type_c, op.type_c.Type ( ) ) ) ) {
				if ( ( op.priority == FUNCTION_PRIORITY ) && this.TypeMatches( type_a, op.type_a.Type ( ) ) && this.TypeMatches( type_b, op.type_b.Type ( ) ) ) {
					break;
				}

				op = idCompiler.opcodes[++opIdx];
				dlog(DEBUG_COMPILER, "GetExpression: oldop: %s, opIdx: %i\n", op.name, opIdx);
				if ( !op.name || strcmp( op.name, oldop.name ) ) {
					this.Error( "type mismatch for '%s'", oldop.name );
				}
			}

			switch ( opIdx /*op - idCompiler.opcodes */ ) {
			case opc.OP_SYSCALL:
				this.ExpectToken( "(" );
				e = this.ParseSysObjectCall( e2 );
				break;

			case opc.OP_OBJECTCALL:
				this.ExpectToken( "(" );
				if ( ( e2.initialized != initialized_t.uninitialized ) && e2.value.functionPtr.eventdef ) {
					e = this.ParseEventCall( e, e2 );
				} else {
					e = this.ParseObjectCall( e, e2 );
				}
				break;

			case opc.OP_EVENTCALL:
				this.ExpectToken( "(" );
				if ( ( e2.initialized != initialized_t.uninitialized ) && e2.value.functionPtr.eventdef ) {
					e = this.ParseEventCall( e, e2 );
				} else {
					e = this.ParseObjectCall( e, e2 );
				}
				break;

			default:
				if ( this.callthread ) {
					this.Error( "Expecting function call after 'thread'" );
				}

				if ( ( type_a == etype_t.ev_pointer ) && ( type_b != e.TypeDef ( ).PointerType ( ).Type ( ) ) ) {
					// FIXME: need to make a general case for this
					if ( ( /*op - idCompiler.opcodes*/opIdx == opc.OP_STOREP_F ) && ( e.TypeDef ( ).PointerType ( ).Type ( ) == etype_t.ev_boolean ) ) {
						// copy from float to boolean pointer
						op = idCompiler.opcodes[opIdx = opc.OP_STOREP_FTOBOOL];
					} else if ( ( /*op - idCompiler.opcodes*/opIdx == opc.OP_STOREP_BOOL ) && ( e.TypeDef ( ).PointerType ( ).Type ( ) == etype_t.ev_float ) ) {
						// copy from boolean to float pointer
						op = idCompiler.opcodes[opIdx = opc.OP_STOREP_BOOLTOF];
					} else if ( ( /*op - idCompiler.opcodes*/opIdx == opc.OP_STOREP_F ) && ( e.TypeDef ( ).PointerType ( ).Type ( ) == etype_t.ev_string ) ) {
						// copy from float to string pointer
						op = idCompiler.opcodes[opIdx = opc.OP_STOREP_FTOS];
					} else if ( ( /*op - idCompiler.opcodes*/opIdx == opc.OP_STOREP_BOOL ) && ( e.TypeDef ( ).PointerType ( ).Type ( ) == etype_t.ev_string ) ) {
						// copy from boolean to string pointer
						op = idCompiler.opcodes[opIdx = opc.OP_STOREP_BTOS];
					} else if ( ( /*op - idCompiler.opcodes*/opIdx == opc.OP_STOREP_V ) && ( e.TypeDef ( ).PointerType ( ).Type ( ) == etype_t.ev_string ) ) {
						// copy from vector to string pointer
						op = idCompiler.opcodes[opIdx = opc.OP_STOREP_VTOS];
					} else if ( ( /*op - idCompiler.opcodes*/opIdx == opc.OP_STOREP_ENT ) && ( e.TypeDef ( ).PointerType ( ).Type ( ) == etype_t.ev_object ) ) {
						// store an entity into an object pointer
						op = idCompiler.opcodes[opIdx = opc.OP_STOREP_OBJENT];
					} else {
						this.Error( "type mismatch for '%s'", op.name );
					}
				}

				if ( op.rightAssociative ) {
					e = this.EmitOpcode( op, e2, e );
				} else {
					e = this.EmitOpcode( op, e, e2 );
				}

				if ( /*op - idCompiler.opcodes*/opIdx == opc.OP_STOREP_OBJENT ) {
					// statement.b points to type_pointer, which is just a temporary that gets its type reassigned, so we store the real type in statement.c
					// so that we can do a type check during run time since we don't know what type the script object is at compile time because it
					// comes from an entity
					var statement = gameLocal.program.GetStatement( gameLocal.program.NumStatements ( ) - 1 );
					statement.c = type_pointer.PointerType ( ).def;
				}

				// field access gets type from field
				if ( type_c != etype_t.ev_void ) {
					e.SetTypeDef( e2.TypeDef ( ).FieldType ( ) );
				}
				break;
			}
		}

		return e;
	}

/*
================
idCompiler::PatchLoop
================
*/
PatchLoop( /*int */start:number, /*int */continuePos :number):void {
	var /*int*/i:number;
	var pos: statement_t	;

	pos = gameLocal.program.GetStatement( start );
	for ( i = start; i < gameLocal.program.NumStatements ( ); i++, pos = gameLocal.program.GetStatement( i ) /*pos++*/ ) {
		if ( pos.op == opc.OP_BREAK ) {
			pos.op = opc.OP_GOTO;
			pos.a = this.JumpFrom( i );
		} else if ( pos.op == opc.OP_CONTINUE ) {
			pos.op = opc.OP_GOTO;
			pos.a = this.JumpDef( i, continuePos );
		}
	}
}

/*
================
idCompiler::ParseReturnStatement
================
*/
	ParseReturnStatement ( ): void {
		var e: idVarDef;
		var type_a: etype_t;
		var type_b: etype_t;
		var op: opcode_t;
		var opIdx: number;

		if ( this.CheckToken( ";" ) ) {
			if ( this.scope.TypeDef ( ).ReturnType ( ).Type ( ) != etype_t.ev_void ) {
				this.Error( "expecting return value" );
			}

			this.EmitOpcode_FromOpNumber( opc.OP_RETURN, /*0*/null, /*0*/null );
			return;
		}

		e = this.GetExpression( TOP_PRIORITY );
		this.ExpectToken( ";" );

		type_a = e.Type ( );
		type_b = this.scope.TypeDef ( ).ReturnType ( ).Type ( );

		if ( this.TypeMatches( type_a, type_b ) ) {
			this.EmitOpcode_FromOpNumber( opc.OP_RETURN, e, /*0*/null );
			return;
		}

		for ( op = idCompiler.opcodes[opIdx = 0]; op.name; op = idCompiler.opcodes[++opIdx] ) {
			if ( !strcmp( op.name, "=" ) ) {
				break;
			}
		}

		assert( op.name );

		while ( !this.TypeMatches( type_a, op.type_a.Type ( ) ) || !this.TypeMatches( type_b, op.type_b.Type ( ) ) ) {
			op = idCompiler.opcodes[++opIdx];
			if ( !op.name || strcmp( op.name, "=" ) ) {
				this.Error( "type mismatch for return value" );
			}
		}

		var returnType = this.scope.TypeDef ( ).ReturnType ( );
		if ( returnType.Type ( ) == etype_t.ev_string ) {
			this.EmitOpcode( op, e, gameLocal.program.returnStringDef );
		} else {
			gameLocal.program.returnDef.SetTypeDef( returnType );
			this.EmitOpcode( op, e, gameLocal.program.returnDef );
		}
		this.EmitOpcode_FromOpNumber( opc.OP_RETURN, null /*0*/, null /*0*/ );
	}

/*
================
idCompiler::ParseWhileStatement
================
*/
	ParseWhileStatement ( ): void {
		var e: idVarDef;
		var patch1: number; //int			
		var patch2: number; //int			

		this.loopDepth++;

		this.ExpectToken( "(" );

		patch2 = gameLocal.program.NumStatements ( );
		e = this.GetExpression( TOP_PRIORITY );
		this.ExpectToken( ")" );

		if ( ( e.initialized == initialized_t.initializedConstant ) && ( /***/e.value.intPtr != 0 ) ) {
			//FIXME: we can completely skip generation of this code in the opposite case
			this.ParseStatement ( );
			this.EmitOpcode_FromOpNumber( opc.OP_GOTO, this.JumpTo( patch2 ), /*0*/null );
		} else {
			patch1 = gameLocal.program.NumStatements ( );
			this.EmitOpcode_FromOpNumber( opc.OP_IFNOT, e, /*0*/null );
			this.ParseStatement ( );
			this.EmitOpcode_FromOpNumber( opc.OP_GOTO, this.JumpTo( patch2 ), /*0*/null );
			gameLocal.program.GetStatement( patch1 ).b = this.JumpFrom( patch1 );
		}

		// fixup breaks and continues
		this.PatchLoop( patch2, patch2 );

		this.loopDepth--;
	}

/*
================
idCompiler::ParseForStatement

Form of for statement with a counter:

	a = 0;
start:					<< patch4
	if ( !( a < 10 ) ) {
		goto end;		<< patch1
	} else {
		goto process;	<< patch3
	}

increment:				<< patch2
	a = a + 1;
	goto start;			<< goto patch4

process:
	statements;
	goto increment;		<< goto patch2

end:

Form of for statement without a counter:

	a = 0;
start:					<< patch2
	if ( !( a < 10 ) ) {
		goto end;		<< patch1
	}

process:
	statements;
	goto start;			<< goto patch2

end:
================
*/
	ParseForStatement(): void {
		var e: idVarDef;
		var start:number; //int			
		var patch1:number;//int			
		var patch2:number;//int			
		var patch3:number;//int			
		var patch4:number;//int			

		this.loopDepth++;

		start = gameLocal.program.NumStatements();

		this.ExpectToken( "(" );

		// init
		if ( !this.CheckToken( ";" ) ) {
			do {
				this.GetExpression( TOP_PRIORITY );
			} while( this.CheckToken( "," ) );

			this.ExpectToken( ";" );
		}

		// condition
		patch2 = gameLocal.program.NumStatements();

		e = this.GetExpression( TOP_PRIORITY );
		this.ExpectToken( ";" );

		//FIXME: add check for constant expression
		patch1 = gameLocal.program.NumStatements();
		this.EmitOpcode_FromOpNumber( opc.OP_IFNOT, e, /*0*/null );

		// counter
		if ( !this.CheckToken( ")" ) ) {
			patch3 = gameLocal.program.NumStatements();
			this.EmitOpcode_FromOpNumber( opc.OP_IF, e, /*0*/null );

			patch4 = patch2;
			patch2 = gameLocal.program.NumStatements();
			do {
				this.GetExpression( TOP_PRIORITY );
			} while( this.CheckToken( "," ) );

			this.ExpectToken( ")" );

			// goto patch4
			this.EmitOpcode_FromOpNumber( opc.OP_GOTO, this.JumpTo( patch4 ), /*0*/null );

			// fixup patch3
			gameLocal.program.GetStatement( patch3 ).b = this.JumpFrom( patch3 );
		}

		this.ParseStatement();

		// goto patch2
		this.EmitOpcode_FromOpNumber(opc.OP_GOTO, this.JumpTo( patch2 ), /*0*/null );

		// fixup patch1
		gameLocal.program.GetStatement( patch1 ).b = this.JumpFrom( patch1 );

		// fixup breaks and continues
		this.PatchLoop( start, patch2 );

		this.loopDepth--;
	}

/*
================
idCompiler::ParseDoWhileStatement
================
*/
	ParseDoWhileStatement ( ): void {
		var e: idVarDef;
		var /*int*/patch1:number;

		this.loopDepth++;

		patch1 = gameLocal.program.NumStatements();
		this.ParseStatement();
		this.ExpectToken( "while" );
		this.ExpectToken( "(" );
		e = this.GetExpression( TOP_PRIORITY );
		this.ExpectToken( ")" );
		this.ExpectToken( ";" );

		this.EmitOpcode_FromOpNumber(opc.OP_IF, e, this.JumpTo( patch1 ) );

		// fixup breaks and continues
		this.PatchLoop( patch1, patch1 );

		this.loopDepth--;
	}

/*
================
idCompiler::ParseIfStatement
================
*/
	ParseIfStatement(): void {
		var e: idVarDef;
		var patch1:number;	//int			
		var patch2:number;	//int			

		this.ExpectToken( "(" );
		e = this.GetExpression( TOP_PRIORITY );
		this.ExpectToken( ")" );

		//FIXME: add check for constant expression
		patch1 = gameLocal.program.NumStatements();
		this.EmitOpcode_FromOpNumber( opc.OP_IFNOT, e, null/*0*/ );

		this.ParseStatement();

		if ( this.CheckToken( "else" ) ) {
			patch2 = gameLocal.program.NumStatements();
			this.EmitOpcode_FromOpNumber( opc.OP_GOTO, null/*0*/, null/*0*/ );
			gameLocal.program.GetStatement( patch1 ).b = this.JumpFrom( patch1 );
			this.ParseStatement();
			gameLocal.program.GetStatement( patch2 ).a = this.JumpFrom( patch2 );
		} else {
			gameLocal.program.GetStatement( patch1 ).b = this.JumpFrom( patch1 );
		}
	}

/*
============
idCompiler::ParseStatement
============
*/
	ParseStatement ( ): void {
		if ( this.CheckToken( ";" ) ) {
			// skip semicolons, which are harmless and ok syntax
			return;
		}

		if ( this.CheckToken( "{" ) ) {
			do {
				this.ParseStatement ( );
			} while ( !this.CheckToken( "}" ) );

			return;
		}

		if ( this.CheckToken( "return" ) ) {
			this.ParseReturnStatement ( );
			return;
		}

		if ( this.CheckToken( "while" ) ) {
			this.ParseWhileStatement ( );
			return;
		}

		if ( this.CheckToken( "for" ) ) {
			this.ParseForStatement ( );
			return;
		}

		if ( this.CheckToken( "do" ) ) {
			this.ParseDoWhileStatement ( );
			return;
		}

		if ( this.CheckToken( "break" ) ) {
			this.ExpectToken( ";" );
			if ( !this.loopDepth ) {
				this.Error( "cannot break outside of a loop" );
			}
			this.EmitOpcode_FromOpNumber(opc.OP_BREAK, null/*0*/, null/*0*/ );
			return;
		}

		if ( this.CheckToken( "continue" ) ) {
			this.ExpectToken( ";" );
			if ( !this.loopDepth ) {
				this.Error( "cannot contine outside of a loop" );
			}
			this.EmitOpcode_FromOpNumber(opc.OP_CONTINUE, null/*0*/, null/*0*/ );
			return;
		}

		if ( this.CheckType ( ) /*!= NULL*/ ) {
			this.ParseDefs ( );
			return;
		}

		if ( this.CheckToken( "if" ) ) {
			this.ParseIfStatement ( );
			return;
		}

		this.GetExpression( TOP_PRIORITY );
		this.ExpectToken( ";" );
	}

/*
================
idCompiler::ParseObjectDef
================
*/
	ParseObjectDef ( objname: string ): void {
		var objtype: idTypeDef;
		var type: idTypeDef;
		var parentType: idTypeDef;
		var fieldtype: idTypeDef;
		var name = new idStr;
		var fieldname: string;
		var newtype = new idTypeDef( etype_t.ev_field, null, "", 0, null );
		var oldscope: idVarDef;
		var num: number; //int			
		var i: number; //int			

		oldscope = this.scope;
		if ( this.scope.Type ( ) != etype_t.ev_namespace ) {
			this.Error( "Objects cannot be defined within functions or other objects" );
		}

		// make sure it doesn't exist before we create it
		if ( gameLocal.program.FindType( objname ) != null ) {
			this.Error( "'%s' : redefinition; different basic types", objname );
		}

		// base type
		if ( !this.CheckToken( ":" ) ) {
			parentType = type_object;
		} else {
			parentType = this.ParseType ( );
			if ( !parentType.Inherits( type_object ) ) {
				this.Error( "Objects may only inherit from objects." );
			}
		}

		objtype = gameLocal.program.AllocType_ExtraArgs( etype_t.ev_object, null, objname, parentType == type_object ? 0 : parentType.Size ( ), parentType );
		objtype.def = gameLocal.program.AllocDef( objtype, objname, this.scope, true );
		this.scope = objtype.def;

		// inherit all the functions
		num = parentType.NumFunctions ( );
		for ( i = 0; i < parentType.NumFunctions ( ); i++ ) {
			var func = parentType.GetFunction( i );
			objtype.AddFunction( func );
		}

		this.ExpectToken( "{" );

		do {
			if ( this.CheckToken( ";" ) ) {
				// skip semicolons, which are harmless and ok syntax
				continue;
			}

			fieldtype = this.ParseType ( );
			newtype.SetFieldType( fieldtype );

			fieldname = va( "%s field", fieldtype.Name ( ) );
			newtype.SetName( fieldname );

			this.ParseName( name );

			// check for a function prototype or declaraction
			if ( this.CheckToken( "(" ) ) {
				this.ParseFunctionDef( newtype.FieldType ( ), name.data );
			} else {
				type = gameLocal.program.GetType( newtype, true );
				assert( !type.def );
				gameLocal.program.AllocDef( type, name.data, this.scope, true );
				objtype.AddField(type, name.data );
				this.ExpectToken( ";" );
			}
		} while ( !this.CheckToken( "}" ) );

		this.scope = oldscope;

		this.ExpectToken( ";" );
	}

/*
============
idCompiler::ParseFunction

parse a function type
============
*/
	ParseFunction ( returnType: idTypeDef, name: string ): idTypeDef {
		var newtype = new idTypeDef( etype_t.ev_function, null, name, type_function.Size ( ), returnType );
		var type: idTypeDef;

		if ( this.scope.Type ( ) != etype_t.ev_namespace ) {
			// create self pointer
			newtype.AddFunctionParm( this.scope.TypeDef ( ), "self" );
		}

		if ( !this.CheckToken( ")" ) ) {
			var parmName = new idStr;
			do {
				type = this.ParseType ( );
				this.ParseName( parmName );
				newtype.AddFunctionParm( type, parmName.data );
			} while ( this.CheckToken( "," ) );

			this.ExpectToken( ")" );
		}

		return gameLocal.program.GetType( newtype, true );
	}

/*
================
idCompiler::ParseFunctionDef
================
*/
	ParseFunctionDef ( returnType: idTypeDef, name: string ): void {
		var type: idTypeDef;
		var def: idVarDef;
		var parm: idVarDef;
		var oldscope: idVarDef;
		var i: number;
		var numParms: number;
		var parmType: idTypeDef;
		var func: function_t;
		var pos: statement_t;

		if ( ( this.scope.Type ( ) != etype_t.ev_namespace ) && !this.scope.TypeDef ( ).Inherits( type_object ) ) {
			this.Error( "Functions may not be defined within other functions" );
		}

		type = this.ParseFunction( returnType, name );
		def = gameLocal.program.GetDef( type, name, this.scope );
		if ( !def ) {
			def = gameLocal.program.AllocDef( type, name, this.scope, true );
			type.def = def;

			func = gameLocal.program.AllocFunction( def );
			if ( this.scope.TypeDef ( ).Inherits( type_object ) ) {
				this.scope.TypeDef ( ).AddFunction( func );
			}
		} else {
			func = def.value.functionPtr;
			assert( func );
			if ( func.firstStatement ) {
				this.Error( "%s redeclared", def.GlobalName ( ) );
			}
		}

		// check if this is a prototype or declaration
		if ( !this.CheckToken( "{" ) ) {
			// it's just a prototype, so get the ; and move on
			this.ExpectToken( ";" );
			return;
		}

		// calculate stack space used by parms
		numParms = type.NumParameters ( );
		func.parmSize.SetNum( numParms );
		for ( i = 0; i < numParms; i++ ) {
			parmType = type.GetParmType( i );
			if ( parmType.Inherits( type_object ) ) {
				func.parmSize[i] = type_object.Size ( );
			} else {
				func.parmSize[i] = parmType.Size ( );
			}
			func.parmTotal += func.parmSize[i];
		}

		// define the parms
		for ( i = 0; i < numParms; i++ ) {
			if ( gameLocal.program.GetDef( type.GetParmType( i ), type.GetParmName( i ), def ) ) {
				this.Error( "'%s' defined more than once in function parameters", type.GetParmName( i ) );
			}
			parm = gameLocal.program.AllocDef( type.GetParmType( i ), type.GetParmName( i ), def, false );
		}

		oldscope = this.scope;
		this.scope = def;

		func.firstStatement = gameLocal.program.NumStatements ( );

		// check if we should call the super class constructor
		if ( oldscope.TypeDef ( ).Inherits( type_object ) && !idStr.Icmp( name, "init" ) ) {
			var superClass: idTypeDef;
			var constructorFunc: function_t = null;

			// find the superclass constructor
			for ( superClass = oldscope.TypeDef ( ).SuperClass ( ); superClass != type_object; superClass = superClass.SuperClass ( ) ) {
				constructorFunc = gameLocal.program.FindFunction( va( "%s::init", superClass.Name ( ) ) );
				if ( constructorFunc ) {
					break;
				}
			}

			// emit the call to the constructor
			if ( constructorFunc ) {
				var selfDef: idVarDef = gameLocal.program.GetDef( type.GetParmType( 0 ), type.GetParmName( 0 ), def );
				assert( selfDef );
				this.EmitPush( selfDef, selfDef.TypeDef ( ) );
				this.EmitOpcode( idCompiler.opcodes[opc.OP_CALL], constructorFunc.def, null /*0*/ );
			}
		}

		// parse regular statements
		while ( !this.CheckToken( "}" ) ) {
			this.ParseStatement ( );
		}

		// check if we should call the super class destructor
		if ( oldscope.TypeDef ( ).Inherits( type_object ) && !idStr.Icmp( name, "destroy" ) ) {
			var superClass: idTypeDef;
			var destructorFunc: function_t = null;

			// find the superclass destructor
			for ( superClass = oldscope.TypeDef ( ).SuperClass ( ); superClass != type_object; superClass = superClass.SuperClass ( ) ) {
				destructorFunc = gameLocal.program.FindFunction( va( "%s::destroy", superClass.Name ( ) ) );
				if ( destructorFunc ) {
					break;
				}
			}

			if ( destructorFunc ) {
				if ( func.firstStatement < gameLocal.program.NumStatements ( ) ) {
					// change all returns to point to the call to the destructor
					todoThrow ( );
					//pos = gameLocal.program.GetStatement( func.firstStatement );
					//for ( i = func.firstStatement; i < gameLocal.program.NumStatements ( ); i++, pos++ ) {
					//	if ( pos.op == opc.OP_RETURN ) {
					//		pos.op = opc.OP_GOTO;
					//		pos.a = this.JumpDef( i, gameLocal.program.NumStatements ( ) );
					//	}
					//}
				}

				// emit the call to the destructor
				var selfDef: idVarDef = gameLocal.program.GetDef( type.GetParmType( 0 ), type.GetParmName( 0 ), def );
				assert( selfDef );
				this.EmitPush( selfDef, selfDef.TypeDef ( ) );
				this.EmitOpcode( idCompiler.opcodes[opc.OP_CALL], destructorFunc.def, null /*0*/ );
			}
		}

// Disabled code since it caused a function to fall through to the next function when last statement is in the form "if ( x ) { return; }"
//#if 0
//	// don't bother adding a return opcode if the "return" statement was used.
//	if ( ( func.firstStatement == gameLocal.program.NumStatements() ) || ( gameLocal.program.GetStatement( gameLocal.program.NumStatements() - 1 ).op != opc.OP_RETURN ) ) {
//		// emit an end of statements opcode
//		this.EmitOpcode_FromOpNumber( opc.OP_RETURN, /*0*/null, /*0*/null );
//	}
//#else
		// always emit the return opcode
		this.EmitOpcode_FromOpNumber( opc.OP_RETURN, null /*0*/, null /*0*/ );
//#endif

		// record the number of statements in the function
		func.numStatements = gameLocal.program.NumStatements ( ) - func.firstStatement;

		this.scope = oldscope;
	}

/*
================
idCompiler::ParseVariableDef
================
*/
	ParseVariableDef ( type: idTypeDef, name: string ): void {
		var def: idVarDef, def2: idVarDef;
		var negate: boolean;

		def = gameLocal.program.GetDef( type, name, this.scope );
		if ( def ) {
			this.Error( "%s redeclared", name );
		}

		def = gameLocal.program.AllocDef( type, name, this.scope, false );

		// check for an initialization
		if ( this.CheckToken( "=" ) ) {
			// if a local variable in a function then write out interpreter code to initialize variable
			if ( this.scope.Type ( ) == etype_t.ev_function ) {
				def2 = this.GetExpression( TOP_PRIORITY );
				if ( ( type == type_float ) && ( def2.TypeDef ( ) == type_float ) ) {
					this.EmitOpcode_FromOpNumber( opc.OP_STORE_F, def2, def );
				} else if ( ( type == type_vector ) && ( def2.TypeDef ( ) == type_vector ) ) {
					this.EmitOpcode_FromOpNumber( opc.OP_STORE_V, def2, def );
				} else if ( ( type == type_string ) && ( def2.TypeDef ( ) == type_string ) ) {
					this.EmitOpcode_FromOpNumber( opc.OP_STORE_S, def2, def );
				} else if ( ( type == type_entity ) && ( ( def2.TypeDef ( ) == type_entity ) || ( def2.TypeDef ( ).Inherits( type_object ) ) ) ) {
					this.EmitOpcode_FromOpNumber( opc.OP_STORE_ENT, def2, def );
				} else if ( ( type.Inherits( type_object ) ) && ( def2.TypeDef ( ) == type_entity ) ) {
					this.EmitOpcode_FromOpNumber( opc.OP_STORE_OBJENT, def2, def );
				} else if ( ( type.Inherits( type_object ) ) && ( def2.TypeDef ( ).Inherits( type ) ) ) {
					this.EmitOpcode_FromOpNumber( opc.OP_STORE_OBJ, def2, def );
				} else if ( ( type == type_boolean ) && ( def2.TypeDef ( ) == type_boolean ) ) {
					this.EmitOpcode_FromOpNumber( opc.OP_STORE_BOOL, def2, def );
				} else if ( ( type == type_string ) && ( def2.TypeDef ( ) == type_float ) ) {
					this.EmitOpcode_FromOpNumber( opc.OP_STORE_FTOS, def2, def );
				} else if ( ( type == type_string ) && ( def2.TypeDef ( ) == type_boolean ) ) {
					this.EmitOpcode_FromOpNumber( opc.OP_STORE_BTOS, def2, def );
				} else if ( ( type == type_string ) && ( def2.TypeDef ( ) == type_vector ) ) {
					this.EmitOpcode_FromOpNumber( opc.OP_STORE_VTOS, def2, def );
				} else if ( ( type == type_boolean ) && ( def2.TypeDef ( ) == type_float ) ) {
					this.EmitOpcode_FromOpNumber( opc.OP_STORE_FTOBOOL, def2, def );
				} else if ( ( type == type_float ) && ( def2.TypeDef ( ) == type_boolean ) ) {
					this.EmitOpcode_FromOpNumber( opc.OP_STORE_BOOLTOF, def2, def );
				} else {
					this.Error( "bad initialization for '%s'", name );
				}
			} else {
				// global variables can only be initialized with immediate values
				negate = false;
				if ( this.token.$.type == TT_PUNCTUATION && this.token.$.data == "-" ) {
					negate = true;
					this.NextToken ( );
					if ( this.immediateType != type_float ) {
						this.Error( "wrong immediate type for '-' on variable '%s'", name );
					}
				}

				if ( this.immediateType != type ) {
					this.Error( "wrong immediate type for '%s'", name );
				}

				// global variables are initialized at start up
				if ( type == type_string ) {
					def.SetString( this.token.$.data, false );
				} else {
					if ( negate ) {
						this.immediate._float = -this.immediate._float;
					}
					dlog(DEBUG_COMPILER, "GetTerm negate float immediate._int = %i\n", this.immediate._int);
					def.SetValue( this.immediate, false );
				}
				this.NextToken ( );
			}
		} else if ( type == type_string ) {
			// local strings on the stack are initialized in the interpreter
			if ( this.scope.Type ( ) != etype_t.ev_function ) {
				def.SetString( "", false );
			}
		} else if ( type.Inherits( type_object ) ) {
			if ( this.scope.Type ( ) != etype_t.ev_function ) {
				def.SetObject( null );
			}
		}
	}

/*
================
idCompiler::GetTypeForEventArg
================
*/
	GetTypeForEventArg ( argType: string /*char*/ ): idTypeDef {
		var type: idTypeDef;

		switch ( argType ) {
		case D_EVENT_INTEGER:
			// this will get converted to int by the interpreter
			type = type_float;
			break;

		case D_EVENT_FLOAT:
			type = type_float;
			break;

		case D_EVENT_VECTOR:
			type = type_vector;
			break;

		case D_EVENT_STRING:
			type = type_string;
			break;

		case D_EVENT_ENTITY:
		case D_EVENT_ENTITY_NULL:
			type = type_entity;
			break;

		case D_EVENT_VOID:
			type = type_void;
			break;

		case D_EVENT_TRACE:
			// This data type isn't available from script
			type = null;
			break;

		default:
			// probably a typo
			type = null;
			break;
		}

		return type;
	}

/*
================
idCompiler::ParseEventDef
================
*/
	ParseEventDef ( returnType: idTypeDef, name: string ): void {
		var expectedType: idTypeDef;
		var argType: idTypeDef;
		var type: idTypeDef;
		var i:number;
		var num:number;
		var format:string;
		var ev:idEventDef;
		var parmName = new idStr;

		ev = idEventDef.FindEvent( name );
		if ( !ev ) {
			this.Error( "Unknown event '%s'", name );
		}

		// set the return type
		expectedType = this.GetTypeForEventArg( ev.GetReturnType() );
		if ( !expectedType ) {
			this.Error( "Invalid return type '%c' in definition of '%s' event.", ev.GetReturnType(), name );
		}
		if ( returnType != expectedType ) {
			this.Error( "Return type doesn't match internal return type '%s'", expectedType.Name() );
		}

		var newtype = new idTypeDef( etype_t.ev_function, null, name, type_function.Size(), returnType );

		this.ExpectToken( "(" );

		format = ev.GetArgFormat();
		num = strlen( format );
		for( i = 0; i < num; i++ ) {
			expectedType = this.GetTypeForEventArg( format[i] );
			if ( !expectedType || ( expectedType == type_void ) ) {
				this.Error( "Invalid parameter '%c' in definition of '%s' event.", format[ i ], name );
			}

			argType = this.ParseType();
			this.ParseName( parmName );
			if ( argType != expectedType ) {
				this.Error( "The type of parm %d ('%s') does not match the internal type '%s' in definition of '%s' event.", 
					i + 1, parmName.c_str(), expectedType.Name(), name );
			}

			newtype.AddFunctionParm( argType, "" );

			if ( i < num - 1 ) {
				if ( this.CheckToken( ")" ) ) {
					this.Error( "Too few parameters for event definition.  Internal definition has %d parameters.", num );
				}
				this.ExpectToken( "," );
			}
		}
		if ( !this.CheckToken( ")" ) ) {
			this.Error( "Too many parameters for event definition.  Internal definition has %d parameters.", num );
		}
		this.ExpectToken( ";" );

		type = gameLocal.program.FindType( name );
		if ( type ) {
			if ( !newtype.MatchesType( type ) || ( type.def.value.functionPtr.eventdef != ev ) ) {
				this.Error( "Type mismatch on redefinition of '%s'", name );
			}
		} else {
			type = gameLocal.program.AllocType( newtype );
			type.def = gameLocal.program.AllocDef( type, name, def_namespace, true );

			var func	= gameLocal.program.AllocFunction( type.def );
			func.eventdef		= ev;
			func.parmSize.SetNum( num );
			for( i = 0; i < num; i++ ) {
				argType = newtype.GetParmType( i );
				func.parmTotal		+= argType.Size();
				func.parmSize[ i ]	= argType.Size();
			}

			// mark the parms as local
			func.locals	= func.parmTotal;
		}
	}

/*
================
idCompiler::ParseDefs

Called at the outer layer and when a local statement is hit
================
*/
	ParseDefs ( ): void {
		var name = new idStr;
		var type: idTypeDef;
		var def: idVarDef;
		var oldscope: idVarDef;

		if ( this.CheckToken( ";" ) ) {
			// skip semicolons, which are harmless and ok syntax
			return;
		}

		type = this.ParseType ( );
		if ( type == type_scriptevent ) {
			type = this.ParseType ( );
			this.ParseName( name );
			this.ParseEventDef( type, name.data );
			return;
		}

		this.ParseName( name );

		if ( type == type_namespace ) {
			def = gameLocal.program.GetDef( type, name.data, this.scope );
			if ( !def ) {
				def = gameLocal.program.AllocDef(type, name.data, this.scope, true );
			}
			this.ParseNamespace( def );
		} else if ( this.CheckToken( "::" ) ) {
			def = gameLocal.program.GetDef( null, name.data, this.scope );
			if ( !def ) {
				this.Error( "Unknown object name '%s'", name.c_str ( ) );
			}
			this.ParseName( name );
			oldscope = this.scope;
			this.scope = def;

			this.ExpectToken( "(" );
			this.ParseFunctionDef( type, name.c_str ( ) );
			this.scope = oldscope;
		} else if ( type == type_object ) {
			this.ParseObjectDef( name.c_str ( ) );
		} else if ( this.CheckToken( "(" ) ) { // check for a function prototype or declaraction
			this.ParseFunctionDef( type, name.c_str ( ) );
		} else {
			this.ParseVariableDef( type, name.c_str ( ) );
			while ( this.CheckToken( "," ) ) {
				this.ParseName( name );
				this.ParseVariableDef( type, name.c_str ( ) );
			}
			this.ExpectToken( ";" );
		}
	}

/*
================
idCompiler::ParseNamespace

Parses anything within a namespace definition
================
*/
	ParseNamespace ( newScope: idVarDef ): void {
		var oldscope: idVarDef;

		oldscope = this.scope;
		if ( newScope != def_namespace ) {
			this.ExpectToken( "{" );
		}

		while ( !this.eof ) {
			this.scope = newScope;
			this.callthread = false;

			if ( ( newScope != def_namespace ) && this.CheckToken( "}" ) ) {
				break;
			}

			this.ParseDefs ( );
		}

		this.scope = oldscope;
	}

/*
============
idCompiler::CompileFile

compiles the 0 terminated text, adding definitions to the program structure
============
*/
	CompileFile ( text: string, filename: string, toConsole: boolean ): void {
		var compile_time = new idTimer;
		var error: boolean;

		dlog(DEBUG_COMPILER, "idCompiler::CompileFile - filename: %s\n", filename );
		compile_time.Start ( );

		this.scope = def_namespace;
		this.basetype = null;
		this.callthread = false;
		this.loopDepth = 0;
		this.eof = false;
		this.braceDepth = 0;
		this.immediateType = null;
		this.currentLineNumber = 0;
		this.console = toConsole;

		this.immediate.init ( );

		this.parser.SetFlags( lexerFlags_t.LEXFL_ALLOWMULTICHARLITERALS );
		this.parser.LoadMemory( text, strlen( text ), filename );
		this.parserPtr = this.parser;

		// unread tokens to include script defines
		this.token.$.equals( SCRIPT_DEFAULTDEFS );
		this.token.$.type = TT_STRING;
		this.token.$.subtype = this.token.$.Length ( );
		this.token.$.line = this.token.$.linesCrossed = 0;
		this.parser.UnreadToken( this.token );

		this.token.$.equals( "include" );
		this.token.$.type = TT_NAME;
		this.token.$.subtype = this.token.$.Length ( );
		this.token.$.line = this.token.$.linesCrossed = 0;
		this.parser.UnreadToken( this.token );

		this.token.$.equals( "#" );
		this.token.$.type = TT_PUNCTUATION;
		this.token.$.subtype = P_PRECOMP;
		this.token.$.line = this.token.$.linesCrossed = 0;
		this.parser.UnreadToken( this.token );

		// init the current token line to be the first line so that currentLineNumber is set correctly in NextToken
		this.token.$.line = 1;

		error = false;
		//try {
		// read first token
		this.NextToken ( );
		while ( !this.eof && !error ) {
			// parse from global namespace
			this.ParseNamespace( def_namespace );
		}
		//}

		//catch( idCompileError &err ) {
		//	idStr error;

		//	if ( this.console ) {
		//		// don't print line number of an error if were calling script from the console using the "script" command
		//		sprintf( error, "Error: %s\n", err.error );
		//	} else {
		//		sprintf( error, "Error: file %s, line %d: %s\n", gameLocal.program.GetFilename( this.currentFileNumber ), this.currentLineNumber, err.error );
		//	}

		//	this.parser.FreeSource();

		//	throw new idCompileError( error );
		//}

		this.parser.FreeSource ( );

		compile_time.Stop ( );
		if ( !toConsole ) {
			gameLocal.Printf( "Compiled '%s': %.1f ms\n", filename, compile_time.Milliseconds ( ) );
		}
	}
}