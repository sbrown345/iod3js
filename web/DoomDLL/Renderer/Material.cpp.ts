/////*
////===========================================================================

////Doom 3 GPL Source Code
////Copyright (C) 1999-2011 id Software LLC, a ZeniMax Media company. 

////This file is part of the Doom 3 GPL Source Code (?Doom 3 Source Code?).  

////Doom 3 Source Code is free software: you can redistribute it and/or modify
////it under the terms of the GNU General Public License as published by
////the Free Software Foundation, either version 3 of the License, or
////(at your option) any later version.

////Doom 3 Source Code is distributed in the hope that it will be useful,
////but WITHOUT ANY WARRANTY; without even the implied warranty of
////MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
////GNU General Public License for more details.

////You should have received a copy of the GNU General Public License
////along with Doom 3 Source Code.  If not, see <http://www.gnu.org/licenses/>.

////In addition, the Doom 3 Source Code is also subject to certain additional terms. You should have received a copy of these additional terms immediately following the terms and conditions of the GNU General Public License which accompanied the Doom 3 Source Code.  If not, please request a copy in writing from id Software at the address below.

////If you have questions concerning this license or the applicable additional terms, you may contact in writing id Software LLC, c/o ZeniMax Media Inc., Suite 120, Rockville, Maryland 20850 USA.

////===========================================================================
////*/

////#include "../idlib/precompiled.h"
////#pragma hdrstop

////#include "tr_local.h"

/////*

////Any errors during parsing just set MF_DEFAULTED and return, rather than throwing
////a hard error. This will cause the material to fall back to default material,
////but otherwise let things continue.

////Each material may have a set of calculations that must be evaluated before
////drawing with it.

////Every expression that a material uses can be evaluated at one time, which
////will allow for perfect common subexpression removal when I get around to
////writing it.

////Without this, scrolling an entire surface could result in evaluating the
////same texture matrix calculations a half dozen times.

////  Open question: should I allow arbitrary per-vertex color, texCoord, and vertex
////  calculations to be specified in the material code?

////  Every stage will definately have a valid image pointer.

////  We might want the ability to change the sort value based on conditionals,
////  but it could be a hassle to implement,

////*/

var TOP_PRIORITY = 4;

////// keep all of these on the stack, when they are static it makes material parsing non-reentrant
class mtrParsingData_t {
	registerIsTemporary: boolean[ /*MAX_EXPRESSION_REGISTERS*/];
	shaderRegisters: Float32Array; //[MAX_EXPRESSION_REGISTERS];
	shaderOps: expOp_t[ /*MAX_EXPRESSION_OPS*/];
	parseStages: shaderStage_t[ /*MAX_SHADER_STAGES*/];

	registersAreConstant: boolean;
	forceOverlays: boolean;

	constructor ( ) {
		this.memset0 ( );
	}

	memset0 ( ): void {
		this.registerIsTemporary = new Array( MAX_EXPRESSION_REGISTERS );
		this.shaderRegisters = new Float32Array( MAX_EXPRESSION_REGISTERS );
		this.shaderOps = newStructArray<expOp_t>( expOp_t, MAX_EXPRESSION_OPS );
		this.parseStages = newStructArray<shaderStage_t>( shaderStage_t, MAX_SHADER_STAGES );
	}
}

class idMaterial extends idDecl {

/*
=============
idMaterial::CommonInit
=============
*/
	CommonInit ( ): void {
		this.desc.equals( "<none>" );
		this.renderBump.equals( "" );
		this.contentFlags = contentsFlags_t.CONTENTS_SOLID;
		this.surfaceFlags = surfTypes_t.SURFTYPE_NONE;
		this.materialFlags = 0;
		this.sort = materialSort_t.SS_BAD;
		this.coverage = materialCoverage_t.MC_BAD;
		this.cullType = cullType_t.CT_FRONT_SIDED;
		this.deform = deform_t.DFRM_NONE;
		this.numOps = 0;
		this.ops = null;
		this.numRegisters = 0;
		this.expressionRegisters = null;
		this.constantRegisters = null;
		this.numStages = 0;
		this.numAmbientStages = 0;
		this.stages = null;
		this.editorImage = null;
		this.lightFalloffImage = null;
		this.shouldCreateBackSides = false;
		this.entityGui = 0;
		this.fogLight = false;
		this.blendLight = false;
		this.ambientLight = false;
		this.noFog = false;
		this.hasSubview = false;
		this.allowOverlays = true;
		this.unsmoothedTangents = false;
		this.gui = null;
		this.deformRegisters = new Int32Array( 4 ); //this.memset( deformRegisters, 0, sizeof( deformRegisters ) );
		this.editorAlpha = 1.0;
		this.spectrum = 0;
		this.polygonOffset = 0;
		this.suppressInSubview = false;
		this.refCount = 0;
		this.portalSky = false;

		this.decalInfo = new decalInfo_t;
		this.decalInfo.stayTime = 10000;
		this.decalInfo.fadeTime = 4000;
		this.decalInfo.start[0] = 1;
		this.decalInfo.start[1] = 1;
		this.decalInfo.start[2] = 1;
		this.decalInfo.start[3] = 1;
		this.decalInfo.end[0] = 0;
		this.decalInfo.end[1] = 0;
		this.decalInfo.end[2] = 0;
		this.decalInfo.end[3] = 0;
	}

/////*
////=============
////idMaterial::idMaterial
////=============
////*/
////idMaterial::idMaterial() {
////	CommonInit();

////	// we put this here instead of in CommonInit, because
////	// we don't want it cleared when a material is purged
////	surfaceArea = 0;
////}

/////*
////=============
////idMaterial::~idMaterial
////=============
////*/
////idMaterial::~idMaterial() {
//}

/*
===============
idMaterial::FreeData
===============
*/
	FreeData ( ): void {
		var /*int */i: number;

		if ( this.stages ) {
			// delete any idCinematic textures
			for ( i = 0; i < this.numStages; i++ ) {
				if ( this.stages[i].texture.cinematic != null ) {
					delete this.stages[i].texture.cinematic;
					this.stages[i].texture.cinematic = null;
				}
				if ( this.stages[i].newStage != null ) {
					Mem_Free( this.stages[i].newStage );
					this.stages[i].newStage = null;
				}
			}
			R_StaticFree( this.stages );
			this.stages = null;
		}
		if ( this.expressionRegisters != null ) {
			R_StaticFree( this.expressionRegisters );
			this.expressionRegisters = null;
		}
		if ( this.constantRegisters != null ) {
			R_StaticFree( this.constantRegisters );
			this.constantRegisters = null;
		}
		if ( this.ops != null ) {
			R_StaticFree( this.ops );
			this.ops = null;
		}
	}

/*
==============
idMaterial::GetEditorImage
==============
*/
	GetEditorImage ( ): idImage {
		if ( this.editorImage ) {
			return this.editorImage;
		}

		// if we don't have an editorImageName, use the first stage image
		if ( !this.editorImageName.Length ( ) ) {
			// _D3XP :: First check for a diffuse image, then use the first
			if ( this.numStages && this.stages ) {
				var i: number;
				for ( i = 0; i < this.numStages; i++ ) {
					if ( this.stages[i].lighting == stageLighting_t.SL_DIFFUSE ) {
						this.editorImage = this.stages[i].texture.image;
						break;
					}
				}
				if ( !this.editorImage ) {
					this.editorImage = this.stages[0].texture.image;
				}
			} else {
				this.editorImage = globalImages.defaultImage;
			}
		} else {
			// look for an explicit one
			this.editorImage = globalImages.ImageFromFile( this.editorImageName.data, textureFilter_t.TF_DEFAULT, true, textureRepeat_t.TR_REPEAT, textureDepth_t.TD_DEFAULT );
		}

		if ( !this.editorImage ) {
			this.editorImage = globalImages.defaultImage;
		}

		return this.editorImage;
	}


/*
===============
idMaterial::CheckSurfaceParm

See if the current token matches one of the surface parm bit flags
===============
*/
	CheckSurfaceParm(token: idToken ):boolean {

	for ( var i = 0 ; i < numInfoParms ; i++ ) {
		if ( !token.Icmp( infoParms[i].name ) ) {
			if ( infoParms[i].surfaceFlags & surfaceFlags_t.SURF_TYPE_MASK ) {
				// ensure we only have one surface type set
				this.surfaceFlags &= ~surfaceFlags_t.SURF_TYPE_MASK;
			}
			this.surfaceFlags |= infoParms[i].surfaceFlags;
			this.contentFlags |= infoParms[i].contents;
			if ( infoParms[i].clearSolid ) {
				this.contentFlags &= ~contentsFlags_t.CONTENTS_SOLID;
			}
			return true;
		}
	}
	return false;
}

/*
===============
idMaterial::MatchToken

Sets defaultShader and returns false if the next token doesn't match
===============
*/
	MatchToken ( src: idLexer, match: string ): boolean {
		if ( !src.ExpectTokenString( match ) ) {
			this.SetMaterialFlag( materialFlags_t.MF_DEFAULTED );
			return false;
		}
		return true;
	}

/*
=================
idMaterial::ParseSort
=================
*/
	ParseSort ( src: idLexer ): number {
		var token = new idToken;

		if ( !src.ReadTokenOnLine( token ) ) {
			src.Warning( "missing sort parameter" );
			this.SetMaterialFlag( materialFlags_t.MF_DEFAULTED );
			return;
		}

		if ( !token.Icmp( "subview" ) ) {
			this.sort = materialSort_t.SS_SUBVIEW;
		} else if ( !token.Icmp( "opaque" ) ) {
			this.sort = materialSort_t.SS_OPAQUE;
		} else if ( !token.Icmp( "decal" ) ) {
			this.sort = materialSort_t.SS_DECAL;
		} else if ( !token.Icmp( "far" ) ) {
			this.sort = materialSort_t.SS_FAR;
		} else if ( !token.Icmp( "medium" ) ) {
			this.sort = materialSort_t.SS_MEDIUM;
		} else if ( !token.Icmp( "close" ) ) {
			this.sort = materialSort_t.SS_CLOSE;
		} else if ( !token.Icmp( "almostNearest" ) ) {
			this.sort = materialSort_t.SS_ALMOST_NEAREST;
		} else if ( !token.Icmp( "nearest" ) ) {
			this.sort = materialSort_t.SS_NEAREST;
		} else if ( !token.Icmp( "postProcess" ) ) {
			this.sort = materialSort_t.SS_POST_PROCESS;
		} else if ( !token.Icmp( "portalSky" ) ) {
			this.sort = materialSort_t.SS_PORTAL_SKY;
		} else {
			this.sort = atof( token.data );
		}
	}

/*
=================
idMaterial::ParseDecalInfo
=================
*/
	ParseDecalInfo ( src: idLexer ): void {
		todoThrow ( );
		//idToken token;

		//decalInfo.stayTime = src.ParseFloat() * 1000;
		//decalInfo.fadeTime = src.ParseFloat() * 1000;
		//float	start[4], end[4];
		//src.Parse1DMatrix( 4, start );
		//src.Parse1DMatrix( 4, end );
		//for ( int i = 0 ; i < 4 ; i++ ) {
		//	decalInfo.start[i] = start[i];
		//	decalInfo.end[i] = end[i];
		//}
	}

/*
=============
idMaterial::GetExpressionConstant
=============
*/
	/*int */
	GetExpressionConstant ( /*float */f: number ): number {

		var /*int		*/i: number;
		for ( i = expRegister_t.EXP_REG_NUM_PREDEFINED; i < this.numRegisters; i++ ) {
			if ( !this.pd.registerIsTemporary[i] && this.pd.shaderRegisters[i] == f ) {
				return i;
			}
		}
		if ( this.numRegisters == MAX_EXPRESSION_REGISTERS ) {
			common.Warning( "GetExpressionConstant: material '%s' hit MAX_EXPRESSION_REGISTERS", this.GetName ( ) );
			this.SetMaterialFlag( materialFlags_t.MF_DEFAULTED );
			return 0;
		}
		this.pd.registerIsTemporary[i] = false;
		this.pd.shaderRegisters[i] = f;
		this.numRegisters++;

		return i;
	}

/*
=============
idMaterial::GetExpressionTemporary
=============
*/
	GetExpressionTemporary ( ): number {
		if ( this.numRegisters == MAX_EXPRESSION_REGISTERS ) {
			common.Warning( "GetExpressionTemporary: material '%s' hit MAX_EXPRESSION_REGISTERS", this.GetName ( ) );
			this.SetMaterialFlag( materialFlags_t.MF_DEFAULTED );
			return 0;
		}
		this.pd.registerIsTemporary[this.numRegisters] = true;
		this.numRegisters++;
		return this.numRegisters - 1;
	}

/*
=============
idMaterial::GetExpressionOp
=============
*/
	GetExpressionOp ( ): expOp_t {
		if ( this.numOps == MAX_EXPRESSION_OPS ) {
			common.Warning( "GetExpressionOp: material '%s' hit MAX_EXPRESSION_OPS", this.GetName ( ) );
			this.SetMaterialFlag( materialFlags_t.MF_DEFAULTED );
			return this.pd.shaderOps[0];
		}

		return this.pd.shaderOps[this.numOps++];
	}

/*
=================
idMaterial::EmitOp
=================
*/
	/*int */
	EmitOp ( /*int */a: number, /*int */b: number, opType: expOpType_t ): number {
		var op: expOp_t;
		// optimize away identity operations
		if ( opType == expOpType_t.OP_TYPE_ADD ) {
			if ( !this.pd.registerIsTemporary[a] && this.pd.shaderRegisters[a] == 0 ) {
				return b;
			}
			if ( !this.pd.registerIsTemporary[b] && this.pd.shaderRegisters[b] == 0 ) {
				return a;
			}
			if ( !this.pd.registerIsTemporary[a] && !this.pd.registerIsTemporary[b] ) {
				return this.GetExpressionConstant( this.pd.shaderRegisters[a] + this.pd.shaderRegisters[b] );
			}
		}
		if ( opType == expOpType_t.OP_TYPE_MULTIPLY ) {
			if ( !this.pd.registerIsTemporary[a] && this.pd.shaderRegisters[a] == 1 ) {
				return b;
			}
			if ( !this.pd.registerIsTemporary[a] && this.pd.shaderRegisters[a] == 0 ) {
				return a;
			}
			if ( !this.pd.registerIsTemporary[b] && this.pd.shaderRegisters[b] == 1 ) {
				return a;
			}
			if ( !this.pd.registerIsTemporary[b] && this.pd.shaderRegisters[b] == 0 ) {
				return b;
			}
			if ( !this.pd.registerIsTemporary[a] && !this.pd.registerIsTemporary[b] ) {
				return this.GetExpressionConstant( this.pd.shaderRegisters[a] * this.pd.shaderRegisters[b] );
			}
		}

		op = this.GetExpressionOp ( );
		op.opType = opType;
		op.a = a;
		op.b = b;
		op.c = this.GetExpressionTemporary ( );

		return op.c;
	}

/*
=================
idMaterial::ParseEmitOp
=================
*/
	/*int */
	ParseEmitOp ( src: idLexer, /*int */a: number, /*expOpType_t */opType: expOpType_t, /*int */priority: number ): number {
		var /*int		*/b: number;

		b = this.ParseExpressionPriority( src, priority );
		return this.EmitOp( a, b, opType );
	}

/*
=================
idMaterial::ParseTerm

Returns a register index
=================
*/
	/*int */
	ParseTerm ( src: idLexer ): number {
		var token = new idToken;
		var a: number, b: number; //int

		src.ReadToken( token );

		if ( token.data == "(" ) {
			a = this.ParseExpression( src );
			this.MatchToken( src, ")" );
			return a;
		}

		if ( !token.Icmp( "time" ) ) {
			this.pd.registersAreConstant = false;
			return expRegister_t.EXP_REG_TIME;
		}
		if ( !token.Icmp( "parm0" ) ) {
			this.pd.registersAreConstant = false;
			return expRegister_t.EXP_REG_PARM0;
		}
		if ( !token.Icmp( "parm1" ) ) {
			this.pd.registersAreConstant = false;
			return expRegister_t.EXP_REG_PARM1;
		}
		if ( !token.Icmp( "parm2" ) ) {
			this.pd.registersAreConstant = false;
			return expRegister_t.EXP_REG_PARM2;
		}
		if ( !token.Icmp( "parm3" ) ) {
			this.pd.registersAreConstant = false;
			return expRegister_t.EXP_REG_PARM3;
		}
		if ( !token.Icmp( "parm4" ) ) {
			this.pd.registersAreConstant = false;
			return expRegister_t.EXP_REG_PARM4;
		}
		if ( !token.Icmp( "parm5" ) ) {
			this.pd.registersAreConstant = false;
			return expRegister_t.EXP_REG_PARM5;
		}
		if ( !token.Icmp( "parm6" ) ) {
			this.pd.registersAreConstant = false;
			return expRegister_t.EXP_REG_PARM6;
		}
		if ( !token.Icmp( "parm7" ) ) {
			this.pd.registersAreConstant = false;
			return expRegister_t.EXP_REG_PARM7;
		}
		if ( !token.Icmp( "parm8" ) ) {
			this.pd.registersAreConstant = false;
			return expRegister_t.EXP_REG_PARM8;
		}
		if ( !token.Icmp( "parm9" ) ) {
			this.pd.registersAreConstant = false;
			return expRegister_t.EXP_REG_PARM9;
		}
		if ( !token.Icmp( "parm10" ) ) {
			this.pd.registersAreConstant = false;
			return expRegister_t.EXP_REG_PARM10;
		}
		if ( !token.Icmp( "parm11" ) ) {
			this.pd.registersAreConstant = false;
			return expRegister_t.EXP_REG_PARM11;
		}
		if ( !token.Icmp( "global0" ) ) {
			this.pd.registersAreConstant = false;
			return expRegister_t.EXP_REG_GLOBAL0;
		}
		if ( !token.Icmp( "global1" ) ) {
			this.pd.registersAreConstant = false;
			return expRegister_t.EXP_REG_GLOBAL1;
		}
		if ( !token.Icmp( "global2" ) ) {
			this.pd.registersAreConstant = false;
			return expRegister_t.EXP_REG_GLOBAL2;
		}
		if ( !token.Icmp( "global3" ) ) {
			this.pd.registersAreConstant = false;
			return expRegister_t.EXP_REG_GLOBAL3;
		}
		if ( !token.Icmp( "global4" ) ) {
			this.pd.registersAreConstant = false;
			return expRegister_t.EXP_REG_GLOBAL4;
		}
		if ( !token.Icmp( "global5" ) ) {
			this.pd.registersAreConstant = false;
			return expRegister_t.EXP_REG_GLOBAL5;
		}
		if ( !token.Icmp( "global6" ) ) {
			this.pd.registersAreConstant = false;
			return expRegister_t.EXP_REG_GLOBAL6;
		}
		if ( !token.Icmp( "global7" ) ) {
			this.pd.registersAreConstant = false;
			return expRegister_t.EXP_REG_GLOBAL7;
		}
		if ( !token.Icmp( "fragmentPrograms" ) ) {
			return this.GetExpressionConstant( /*(float) */glConfig.ARBFragmentProgramAvailable ? 1 : 0 );
		}

		if ( !token.Icmp( "sound" ) ) {
			this.pd.registersAreConstant = false;
			return this.EmitOp( 0, 0, expOpType_t.OP_TYPE_SOUND );
		}

		// parse negative numbers
		if ( token.data == "-" ) {
			src.ReadToken( token );
			if ( token.type == TT_NUMBER || token.data == "." ) {
				return this.GetExpressionConstant( - /*(float)*/ token.GetFloatValue ( ) );
			}
			src.Warning( "Bad negative number '%s'", token.c_str ( ) );
			this.SetMaterialFlag( materialFlags_t.MF_DEFAULTED );
			return 0;
		}

		if ( token.type == TT_NUMBER || token.data == "." || token.data == "-" ) {
			return this.GetExpressionConstant( /*(float)*/ token.GetFloatValue ( ) );
		}

		// see if it is a table name
		var table = <idDeclTable>( declManager.FindType( declType_t.DECL_TABLE, token.c_str ( ), false ) );
		if ( !table ) {
			src.Warning( "Bad term '%s'", token.c_str ( ) );
			this.SetMaterialFlag( materialFlags_t.MF_DEFAULTED );
			return 0;
		}

		// parse a table expression
		this.MatchToken( src, "[" );

		b = this.ParseExpression( src );

		this.MatchToken( src, "]" );

		return this.EmitOp( table.Index ( ), b, expOpType_t.OP_TYPE_TABLE );
	}

/*
=================
idMaterial::ParseExpressionPriority

Returns a register index
=================
*/
/*int */ParseExpressionPriority( src:idLexer, /*int */priority:number ):number {
		var token = new idToken;
	var /*int		*/a:number;

	if ( priority == 0 ) {
		return this.ParseTerm( src );
	}

	a = this.ParseExpressionPriority( src, priority - 1 );

	if ( this.TestMaterialFlag( materialFlags_t.MF_DEFAULTED ) ) {	// we have a parse error
		return 0;
	}

	if ( !src.ReadToken( token ) ) {
		// we won't get EOF in a real file, but we can
		// when parsing from generated strings
		return a;
	}

	if ( priority == 1 && token.data == "*" ) {
		return this.ParseEmitOp(src, a, expOpType_t.OP_TYPE_MULTIPLY, priority );
	}
	if ( priority == 1 && token.data == "/" ) {
		return this.ParseEmitOp(src, a, expOpType_t.OP_TYPE_DIVIDE, priority );
	}
	if ( priority == 1 && token.data == "%" ) {	// implied truncate both to integer
		return this.ParseEmitOp(src, a, expOpType_t.OP_TYPE_MOD, priority );
	}
	if ( priority == 2 && token.data == "+" ) {
		return this.ParseEmitOp(src, a, expOpType_t.OP_TYPE_ADD, priority );
	}
	if ( priority == 2 && token.data == "-" ) {
		return this.ParseEmitOp( src, a, expOpType_t.OP_TYPE_SUBTRACT, priority );
	}
	if ( priority == 3 && token.data == ">" ) {
		return this.ParseEmitOp(src, a, expOpType_t.OP_TYPE_GT, priority );
	}
	if ( priority == 3 && token.data == ">=" ) {
		return this.ParseEmitOp(src, a, expOpType_t.OP_TYPE_GE, priority );
	}
	if ( priority == 3 && token.data == "<" ) {
		return this.ParseEmitOp(src, a, expOpType_t.OP_TYPE_LT, priority );
	}
	if ( priority == 3 && token.data == "<=" ) {
		return this.ParseEmitOp(src, a, expOpType_t.OP_TYPE_LE, priority );
	}
	if ( priority == 3 && token.data == "==" ) {
		return this.ParseEmitOp(src, a, expOpType_t.OP_TYPE_EQ, priority );
	}
	if ( priority == 3 && token.data == "!=" ) {
		return this.ParseEmitOp(src, a, expOpType_t.OP_TYPE_NE, priority );
	}
	if ( priority == 4 && token.data == "&&" ) {
		return this.ParseEmitOp(src, a, expOpType_t.OP_TYPE_AND, priority );
	}
	if ( priority == 4 && token.data == "||" ) {
		return this.ParseEmitOp(src, a, expOpType_t.OP_TYPE_OR, priority );
	}

	// assume that anything else terminates the expression
	// not too robust error checking...

	src.UnreadToken( token );

	return a;
}

/*
=================
idMaterial::ParseExpression

Returns a register index
=================
*/
	ParseExpression ( src: idLexer ): number {
		return this.ParseExpressionPriority( src, TOP_PRIORITY );
	}


/*
===============
idMaterial::ClearStage
===============
*/
ClearStage(ss:shaderStage_t ):void {
	ss.drawStateBits = 0;
	ss.conditionRegister = this.GetExpressionConstant( 1 );
	ss.color.registers[0] =
	ss.color.registers[1] =
	ss.color.registers[2] =
	ss.color.registers[3] = this.GetExpressionConstant( 1 );
}

/*
===============
idMaterial::NameToSrcBlendMode
===============
*/
/*int */
	NameToSrcBlendMode ( name: idStr ): number {
		if ( !name.Icmp( "GL_ONE" ) ) {
			return GLS_SRCBLEND_ONE;
		} else if ( !name.Icmp( "GL_ZERO" ) ) {
			return GLS_SRCBLEND_ZERO;
		} else if ( !name.Icmp( "GL_DST_COLOR" ) ) {
			return GLS_SRCBLEND_DST_COLOR;
		} else if ( !name.Icmp( "GL_ONE_MINUS_DST_COLOR" ) ) {
			return GLS_SRCBLEND_ONE_MINUS_DST_COLOR;
		} else if ( !name.Icmp( "GL_SRC_ALPHA" ) ) {
			return GLS_SRCBLEND_SRC_ALPHA;
		} else if ( !name.Icmp( "GL_ONE_MINUS_SRC_ALPHA" ) ) {
			return GLS_SRCBLEND_ONE_MINUS_SRC_ALPHA;
		} else if ( !name.Icmp( "GL_DST_ALPHA" ) ) {
			return GLS_SRCBLEND_DST_ALPHA;
		} else if ( !name.Icmp( "GL_ONE_MINUS_DST_ALPHA" ) ) {
			return GLS_SRCBLEND_ONE_MINUS_DST_ALPHA;
		} else if ( !name.Icmp( "GL_SRC_ALPHA_SATURATE" ) ) {
			return GLS_SRCBLEND_ALPHA_SATURATE;
		}

		common.Warning( "unknown blend mode '%s' in material '%s'", name.c_str ( ), this.GetName ( ) );
		this.SetMaterialFlag( materialFlags_t.MF_DEFAULTED );

		return GLS_SRCBLEND_ONE;
	}

/*
===============
idMaterial::NameToDstBlendMode
===============
*/
/*int */
	NameToDstBlendMode ( name: idStr ): number {
		if ( !name.Icmp( "GL_ONE" ) ) {
			return GLS_DSTBLEND_ONE;
		} else if ( !name.Icmp( "GL_ZERO" ) ) {
			return GLS_DSTBLEND_ZERO;
		} else if ( !name.Icmp( "GL_SRC_ALPHA" ) ) {
			return GLS_DSTBLEND_SRC_ALPHA;
		} else if ( !name.Icmp( "GL_ONE_MINUS_SRC_ALPHA" ) ) {
			return GLS_DSTBLEND_ONE_MINUS_SRC_ALPHA;
		} else if ( !name.Icmp( "GL_DST_ALPHA" ) ) {
			return GLS_DSTBLEND_DST_ALPHA;
		} else if ( !name.Icmp( "GL_ONE_MINUS_DST_ALPHA" ) ) {
			return GLS_DSTBLEND_ONE_MINUS_DST_ALPHA;
		} else if ( !name.Icmp( "GL_SRC_COLOR" ) ) {
			return GLS_DSTBLEND_SRC_COLOR;
		} else if ( !name.Icmp( "GL_ONE_MINUS_SRC_COLOR" ) ) {
			return GLS_DSTBLEND_ONE_MINUS_SRC_COLOR;
		}

		common.Warning( "unknown blend mode '%s' in material '%s'", name.c_str ( ), this.GetName ( ) );
		this.SetMaterialFlag( materialFlags_t.MF_DEFAULTED );

		return GLS_DSTBLEND_ONE;
	}

/*
================
idMaterial::ParseBlend
================
*/
	ParseBlend ( src: idLexer, stage: shaderStage_t ): void {
		var token = new idToken;
		var /*int		*/srcBlend: number, dstBlend: number;

		if ( !src.ReadToken( token ) ) {
			return;
		}

		// blending combinations
		if ( !token.Icmp( "blend" ) ) {
			stage.drawStateBits = GLS_SRCBLEND_SRC_ALPHA | GLS_DSTBLEND_ONE_MINUS_SRC_ALPHA;
			return;
		}
		if ( !token.Icmp( "add" ) ) {
			stage.drawStateBits = GLS_SRCBLEND_ONE | GLS_DSTBLEND_ONE;
			return;
		}
		if ( !token.Icmp( "filter" ) || !token.Icmp( "modulate" ) ) {
			stage.drawStateBits = GLS_SRCBLEND_DST_COLOR | GLS_DSTBLEND_ZERO;
			return;
		}
		if ( !token.Icmp( "none" ) ) {
			// none is used when defining an alpha mask that doesn't draw
			stage.drawStateBits = GLS_SRCBLEND_ZERO | GLS_DSTBLEND_ONE;
			return;
		}
		if ( !token.Icmp( "bumpmap" ) ) {
			stage.lighting = stageLighting_t.SL_BUMP;
			return;
		}
		if ( !token.Icmp( "diffusemap" ) ) {
			stage.lighting = stageLighting_t.SL_DIFFUSE;
			return;
		}
		if ( !token.Icmp( "specularmap" ) ) {
			stage.lighting = stageLighting_t.SL_SPECULAR;
			return;
		}

		srcBlend = this.NameToSrcBlendMode(token );

		this.MatchToken( src, "," );
		if ( !src.ReadToken( token ) ) {
			return;
		}
		dstBlend = this.NameToDstBlendMode( token );

		stage.drawStateBits = srcBlend | dstBlend;
	}

/////*
////================
////idMaterial::ParseVertexParm

////If there is a single value, it will be repeated across all elements
////If there are two values, 3 = 0.0, 4 = 1.0
////if there are three values, 4 = 1.0
////================
////*/
////void idMaterial::ParseVertexParm( idLexer &src, newShaderStage_t *newStage ) {
////	idToken				token;

////	src.ReadTokenOnLine( &token );
////	int	parm = token.GetIntValue();
////	if ( !token.IsNumeric() || parm < 0 || parm >= MAX_VERTEX_PARMS ) {
////		common.Warning( "bad vertexParm number\n" );
////		this.SetMaterialFlag( materialFlags_t.MF_DEFAULTED );
////		return;
////	}
////	if ( parm >= newStage.numVertexParms ) {
////		newStage.numVertexParms = parm+1;
////	}

////	newStage.vertexParms[parm][0] = this.ParseExpression( src );

////	src.ReadTokenOnLine( &token );
////	if ( !token[0] || token.Icmp( "," ) ) {
////		newStage.vertexParms[parm][1] =
////		newStage.vertexParms[parm][2] =
////		newStage.vertexParms[parm][3] = newStage.vertexParms[parm][0];
////		return;
////	}

////	newStage.vertexParms[parm][1] = this.ParseExpression( src );

////	src.ReadTokenOnLine( &token );
////	if ( !token[0] || token.Icmp( "," ) ) {
////		newStage.vertexParms[parm][2] = this.GetExpressionConstant( 0 );
////		newStage.vertexParms[parm][3] = this.GetExpressionConstant( 1 );
////		return;
////	}

////	newStage.vertexParms[parm][2] = this.ParseExpression( src );

////	src.ReadTokenOnLine( &token );
////	if ( !token[0] || token.Icmp( "," ) ) {
////		newStage.vertexParms[parm][3] = this.GetExpressionConstant( 1 );
////		return;
////	}

////	newStage.vertexParms[parm][3] = this.ParseExpression( src );
////}


/////*
////================
////idMaterial::ParseFragmentMap
////================
////*/
////void idMaterial::ParseFragmentMap( idLexer &src, newShaderStage_t *newStage ) {
////	const char			*str;
////	textureFilter_t		tf;
////	textureRepeat_t		trp;
////	textureDepth_t		td;
////	cubeFiles_t			cubeMap;
////	bool				allowPicmip;
////	idToken				token;

////	tf = textureFilter_t.TF_DEFAULT;
////	trp = textureRepeat_t.TR_REPEAT;
////	td = textureDepth_t.TD_DEFAULT;
////	allowPicmip = true;
////	cubeMap = cubeFiles_t.CF_2D;

////	src.ReadTokenOnLine( &token );
////	int	unit = token.GetIntValue();
////	if ( !token.IsNumeric() || unit < 0 || unit >= MAX_FRAGMENT_IMAGES ) {
////		common.Warning( "bad fragmentMap number\n" );
////		this.SetMaterialFlag( materialFlags_t.MF_DEFAULTED );
////		return;
////	}

////	// unit 1 is the normal map.. make sure it gets flagged as the proper depth
////	if ( unit == 1 ) {
////		td = textureDepth_t.TD_BUMP;
////	}

////	if ( unit >= newStage.numFragmentProgramImages ) {
////		newStage.numFragmentProgramImages = unit+1;
////	}

////	while( 1 ) {
////		src.ReadTokenOnLine( &token );

////		if ( !token.Icmp( "cubeMap" ) ) {
////			cubeMap = cubeFiles_t.CF_NATIVE;
////			continue;
////		}
////		if ( !token.Icmp( "cameraCubeMap" ) ) {
////			cubeMap = cubeFiles_t.CF_CAMERA;
////			continue;
////		}
////		if ( !token.Icmp( "nearest" ) ) {
////			tf = textureFilter_t.TF_NEAREST;
////			continue;
////		}
////		if ( !token.Icmp( "linear" ) ) {
////			tf = textureFilter_t.TF_LINEAR;
////			continue;
////		}
////		if ( !token.Icmp( "clamp" ) ) {
////			trp = textureRepeat_t.TR_CLAMP;
////			continue;
////		}
////		if ( !token.Icmp( "noclamp" ) ) {
////			trp = textureRepeat_t.TR_REPEAT;
////			continue;
////		}
////		if ( !token.Icmp( "zeroclamp" ) ) {
////			trp = textureRepeat_t.TR_CLAMP_TO_ZERO;
////			continue;
////		}
////		if ( !token.Icmp( "alphazeroclamp" ) ) {
////			trp = textureRepeat_t.TR_CLAMP_TO_ZERO_ALPHA;
////			continue;
////		}
////		if ( !token.Icmp( "forceHighQuality" ) ) {
////			td = textureDepth_t.TD_HIGH_QUALITY;
////			continue;
////		}

////		if ( !token.Icmp( "uncompressed" ) || !token.Icmp( "highquality" ) ) {
////			if ( !globalImages.image_ignoreHighQuality.GetInteger() ) {
////				td = textureDepth_t.TD_HIGH_QUALITY;
////			}
////			continue;
////		}
////		if ( !token.Icmp( "nopicmip" ) ) {
////			allowPicmip = false;
////			continue;
////		}

////		// assume anything else is the image name
////		src.UnreadToken( &token );
////		break;
////	}
////	str = R_ParsePastImageProgram( src );

////	newStage.fragmentProgramImages[unit] = 
////		globalImages.ImageFromFile( str, tf, allowPicmip, trp, td, cubeMap );
////	if ( !newStage.fragmentProgramImages[unit] ) {
////		newStage.fragmentProgramImages[unit] = globalImages.defaultImage;
////	}
////}

/*
===============
idMaterial::MultiplyTextureMatrix
===============
*/
	MultiplyTextureMatrix ( ts: textureStage_t, /*int */registers: Int32Array[ /*2,3*/] ): void {
		var /*int	*/old = multiDimArray<Int32Array>( Int32Array, 2, 3 );

		if ( !ts.hasMatrix ) {
			ts.hasMatrix = true;
			memcpy2d(ts.matrix, registers /*, sizeof(ts.matrix)*/ );
			return;
		}

		memcpy2d( old, ts.matrix /*, sizeof( old ) */ );

		// multiply the two maticies
		ts.matrix[0][0] = this.EmitOp(
			this.EmitOp( old[0][0], registers[0][0], expOpType_t.OP_TYPE_MULTIPLY ),
			this.EmitOp( old[0][1], registers[1][0], expOpType_t.OP_TYPE_MULTIPLY ), expOpType_t.OP_TYPE_ADD );
		ts.matrix[0][1] = this.EmitOp(
			this.EmitOp( old[0][0], registers[0][1], expOpType_t.OP_TYPE_MULTIPLY ),
			this.EmitOp( old[0][1], registers[1][1], expOpType_t.OP_TYPE_MULTIPLY ), expOpType_t.OP_TYPE_ADD );
		ts.matrix[0][2] = this.EmitOp(
			this.EmitOp(
				this.EmitOp( old[0][0], registers[0][2], expOpType_t.OP_TYPE_MULTIPLY ),
				this.EmitOp( old[0][1], registers[1][2], expOpType_t.OP_TYPE_MULTIPLY ), expOpType_t.OP_TYPE_ADD ),
			old[0][2], expOpType_t.OP_TYPE_ADD );

		ts.matrix[1][0] = this.EmitOp(
			this.EmitOp( old[1][0], registers[0][0], expOpType_t.OP_TYPE_MULTIPLY ),
			this.EmitOp( old[1][1], registers[1][0], expOpType_t.OP_TYPE_MULTIPLY ), expOpType_t.OP_TYPE_ADD );
		ts.matrix[1][1] = this.EmitOp(
			this.EmitOp( old[1][0], registers[0][1], expOpType_t.OP_TYPE_MULTIPLY ),
			this.EmitOp( old[1][1], registers[1][1], expOpType_t.OP_TYPE_MULTIPLY ), expOpType_t.OP_TYPE_ADD );
		ts.matrix[1][2] = this.EmitOp(
			this.EmitOp(
				this.EmitOp( old[1][0], registers[0][2], expOpType_t.OP_TYPE_MULTIPLY ),
				this.EmitOp( old[1][1], registers[1][2], expOpType_t.OP_TYPE_MULTIPLY ), expOpType_t.OP_TYPE_ADD ),
			old[1][2], expOpType_t.OP_TYPE_ADD );

	}

/*
=================
idMaterial::ParseStage

An open brace has been parsed


{
	if <expression>
	map <imageprogram>
	"nearest" "linear" "clamp" "zeroclamp" "uncompressed" "highquality" "nopicmip"
	scroll, scale, rotate
}

=================
*/
	ParseStage ( src: idLexer, trpDefault: textureRepeat_t ): void {
		var /*idToken			*/ token = new idToken;
		var /*const char		*/ /***/str: string;
		var /*shaderStage_t		**/ss: shaderStage_t;
		var /*textureStage_t	**/ ts: textureStage_t;
		var /*textureFilter_t	*/ tf: textureFilter_t;
		var /*textureRepeat_t	*/ trp: textureRepeat_t;
		var /*textureDepth_t	*/ td: textureDepth_t;
		var /*cubeFiles_t		*/ cubeMap: cubeFiles_t;
		var /*bool				*/allowPicmip: boolean;
		var /*char				*/imageName: string; //[MAX_IMAGE_NAME];
		var /*int				*/ a: number, b: number;
		var /*int				*/ matrix = multiDimArray<Int32Array>( Int32Array, 2, 3 ); //[2][3];
		var /*newShaderStage_t	*/newStage: newShaderStage_t;

		if ( this.numStages >= MAX_SHADER_STAGES ) {
			this.SetMaterialFlag( materialFlags_t.MF_DEFAULTED );
			common.Warning( "material '%s' exceeded %i stages", this.GetName ( ), MAX_SHADER_STAGES );
		}

		tf = textureFilter_t.TF_DEFAULT;
		trp = trpDefault;
		td = textureDepth_t.TD_DEFAULT;
		allowPicmip = true;
		cubeMap = cubeFiles_t.CF_2D;

		imageName = "";

		newStage = new newShaderStage_t ( ); //new memset( &newStage, 0, sizeof( newStage ) );

		ss = /*&*/this.pd.parseStages[this.numStages];
		ts = /*&*/ss.texture;

		this.ClearStage( ss );

		while ( 1 ) {
			if ( this.TestMaterialFlag( materialFlags_t.MF_DEFAULTED ) ) { // we have a parse error
				return;
			}
			if ( !src.ExpectAnyToken( token ) ) {
				this.SetMaterialFlag( materialFlags_t.MF_DEFAULTED );
				return;
			}

			// the close brace for the entire material ends the draw block
			if ( token.data == "}" ) {
				break;
			}

			//BSM Nerve: Added for stage naming in the material editor
			if ( !token.Icmp( "name" ) ) {
				src.SkipRestOfLine ( );
				continue;
			}

			// image options
			if ( !token.Icmp( "blend" ) ) {
				this.ParseBlend( src, ss );
				continue;
			}

			if ( !token.Icmp( "map" ) ) {
				str = R_ParsePastImageProgram( src ).toString ( );
				imageName = str; //idStr.Copynz( imageName, str, sizeof( imageName ) );
				continue;
			}

			if ( !token.Icmp( "remoteRenderMap" ) ) {
				ts.dynamic = dynamicidImage_t.DI_REMOTE_RENDER;
				ts.width = src.ParseInt ( );
				ts.height = src.ParseInt ( );
				continue;
			}

			if ( !token.Icmp( "mirrorRenderMap" ) ) {
				ts.dynamic = dynamicidImage_t.DI_MIRROR_RENDER;
				ts.width = src.ParseInt ( );
				ts.height = src.ParseInt ( );
				ts.texgen = texgen_t.TG_SCREEN;
				continue;
			}

			if ( !token.Icmp( "xrayRenderMap" ) ) {
				ts.dynamic = dynamicidImage_t.DI_XRAY_RENDER;
				ts.width = src.ParseInt ( );
				ts.height = src.ParseInt ( );
				ts.texgen = texgen_t.TG_SCREEN;
				continue;
			}
			if ( !token.Icmp( "screen" ) ) {
				ts.texgen = texgen_t.TG_SCREEN;
				continue;
			}
			if ( !token.Icmp( "screen2" ) ) {
				ts.texgen = texgen_t.TG_SCREEN2;
				continue;
			}
			if ( !token.Icmp( "glassWarp" ) ) {
				ts.texgen = texgen_t.TG_GLASSWARP;
				continue;
			}

			if ( !token.Icmp( "videomap" ) ) {
				// note that videomaps will always be in clamp mode, so texture
				// coordinates had better be in the 0 to 1 range
				if ( !src.ReadToken( token ) ) {
					common.Warning( "missing parameter for 'videoMap' keyword in material '%s'", this.GetName ( ) );
					continue;
				}
				var loop = false;
				if ( !token.Icmp( "loop" ) ) {
					loop = true;
					if ( !src.ReadToken( token ) ) {
						common.Warning( "missing parameter for 'videoMap' keyword in material '%s'", this.GetName ( ) );
						continue;
					}
				}
				ts.cinematic = idCinematic.Alloc();
				ts.cinematic.InitFromFile( token.c_str(), loop );
				continue;
			}

			if ( !token.Icmp( "soundmap" ) ) {
				if ( !src.ReadToken( token ) ) {
					common.Warning( "missing parameter for 'soundmap' keyword in material '%s'", this.GetName ( ) );
					continue;
				}
				todoThrow ( );
				//ts.cinematic = new idSndWindow();
				//ts.cinematic.InitFromFile( token.c_str(), true );
				continue;
			}

			if ( !token.Icmp( "cubeMap" ) ) {
				str = R_ParsePastImageProgram( src ).toString ( );
				imageName = imageName; //idStr.Copynz( imageName, str, sizeof( imageName ) );
				cubeMap = cubeFiles_t.CF_NATIVE;
				continue;
			}

			if ( !token.Icmp( "cameraCubeMap" ) ) {
				str = R_ParsePastImageProgram( src ).toString ( );
				imageName = str; //idStr.Copynz( imageName, str, sizeof( imageName ) );
				cubeMap = cubeFiles_t.CF_CAMERA;
				continue;
			}

			if ( !token.Icmp( "ignoreAlphaTest" ) ) {
				ss.ignoreAlphaTest = true;
				continue;
			}
			if ( !token.Icmp( "nearest" ) ) {
				tf = textureFilter_t.TF_NEAREST;
				continue;
			}
			if ( !token.Icmp( "linear" ) ) {
				tf = textureFilter_t.TF_LINEAR;
				continue;
			}
			if ( !token.Icmp( "clamp" ) ) {
				trp = textureRepeat_t.TR_CLAMP;
				continue;
			}
			if ( !token.Icmp( "noclamp" ) ) {
				trp = textureRepeat_t.TR_REPEAT;
				continue;
			}
			if ( !token.Icmp( "zeroclamp" ) ) {
				trp = textureRepeat_t.TR_CLAMP_TO_ZERO;
				continue;
			}
			if ( !token.Icmp( "alphazeroclamp" ) ) {
				trp = textureRepeat_t.TR_CLAMP_TO_ZERO_ALPHA;
				continue;
			}
			if ( !token.Icmp( "uncompressed" ) || !token.Icmp( "highquality" ) ) {
				if ( !idImageManager.image_ignoreHighQuality.GetInteger ( ) ) {
					td = textureDepth_t.TD_HIGH_QUALITY;
				}
				continue;
			}
			if ( !token.Icmp( "forceHighQuality" ) ) {
				td = textureDepth_t.TD_HIGH_QUALITY;
				continue;
			}
			if ( !token.Icmp( "nopicmip" ) ) {
				allowPicmip = false;
				continue;
			}
			if ( !token.Icmp( "vertexColor" ) ) {
				ss.vertexColor = stageVertexColor_t.SVC_MODULATE;
				continue;
			}
			if ( !token.Icmp( "inverseVertexColor" ) ) {
				ss.vertexColor = stageVertexColor_t.SVC_INVERSE_MODULATE;
				continue;
			}
// privatePolygonOffset
			else if ( !token.Icmp( "privatePolygonOffset" ) ) {
				if ( !src.ReadTokenOnLine( token ) ) {
					ss.privatePolygonOffset = 1;
					continue;
				}
				// explict larger (or negative) offset
				src.UnreadToken( token );
				ss.privatePolygonOffset = src.ParseFloat ( );
				continue;
			}

			// texture coordinate generation
			if ( !token.Icmp( "texGen" ) ) {
				src.ExpectAnyToken( token );
				if ( !token.Icmp( "normal" ) ) {
					ts.texgen = texgen_t.TG_DIFFUSE_CUBE;
				} else if ( !token.Icmp( "reflect" ) ) {
					ts.texgen = texgen_t.TG_REFLECT_CUBE;
				} else if ( !token.Icmp( "skybox" ) ) {
					ts.texgen = texgen_t.TG_SKYBOX_CUBE;
				} else if ( !token.Icmp( "wobbleSky" ) ) {
					ts.texgen = texgen_t.TG_WOBBLESKY_CUBE;
					this.texGenRegisters[0] = this.ParseExpression( src );
					this.texGenRegisters[1] = this.ParseExpression( src );
					this.texGenRegisters[2] = this.ParseExpression( src );
				} else {
					common.Warning( "bad texGen '%s' in material %s", token.c_str ( ), this.GetName ( ) );
					this.SetMaterialFlag( materialFlags_t.MF_DEFAULTED );
				}
				continue;
			}
			if ( !token.Icmp( "scroll" ) || !token.Icmp( "translate" ) ) {
				a = this.ParseExpression( src );
				this.MatchToken( src, "," );
				b = this.ParseExpression( src );
				matrix[0][0] = this.GetExpressionConstant( 1 );
				matrix[0][1] = this.GetExpressionConstant( 0 );
				matrix[0][2] = a;
				matrix[1][0] = this.GetExpressionConstant( 0 );
				matrix[1][1] = this.GetExpressionConstant( 1 );
				matrix[1][2] = b;

				this.MultiplyTextureMatrix( ts, matrix );
				continue;
			}
			if ( !token.Icmp( "scale" ) ) {
				a = this.ParseExpression( src );
				this.MatchToken( src, "," );
				b = this.ParseExpression( src );
				// this just scales without a centering
				matrix[0][0] = a;
				matrix[0][1] = this.GetExpressionConstant( 0 );
				matrix[0][2] = this.GetExpressionConstant( 0 );
				matrix[1][0] = this.GetExpressionConstant( 0 );
				matrix[1][1] = b;
				matrix[1][2] = this.GetExpressionConstant( 0 );

				this.MultiplyTextureMatrix( ts, matrix );
				continue;
			}
			if ( !token.Icmp( "centerScale" ) ) {
				a = this.ParseExpression( src );
				this.MatchToken( src, "," );
				b = this.ParseExpression( src );
				// this subtracts 0.5, then scales, then adds 0.5
				matrix[0][0] = a;
				matrix[0][1] = this.GetExpressionConstant( 0 );
				matrix[0][2] = this.EmitOp( this.GetExpressionConstant( 0.5 ), this.EmitOp( this.GetExpressionConstant( 0.5 ), a, expOpType_t.OP_TYPE_MULTIPLY ), expOpType_t.OP_TYPE_SUBTRACT );
				matrix[1][0] = this.GetExpressionConstant( 0 );
				matrix[1][1] = b;
				matrix[1][2] = this.EmitOp( this.GetExpressionConstant( 0.5 ), this.EmitOp( this.GetExpressionConstant( 0.5 ), b, expOpType_t.OP_TYPE_MULTIPLY ), expOpType_t.OP_TYPE_SUBTRACT );

				this.MultiplyTextureMatrix( ts, matrix );
				continue;
			}
			if ( !token.Icmp( "shear" ) ) {
				a = this.ParseExpression( src );
				this.MatchToken( src, "," );
				b = this.ParseExpression( src );
				// this subtracts 0.5, then shears, then adds 0.5
				matrix[0][0] = this.GetExpressionConstant( 1 );
				matrix[0][1] = a;
				matrix[0][2] = this.EmitOp( this.GetExpressionConstant( -0.5 ), a, expOpType_t.OP_TYPE_MULTIPLY );
				matrix[1][0] = b;
				matrix[1][1] = this.GetExpressionConstant( 1 );
				matrix[1][2] = this.EmitOp( this.GetExpressionConstant( -0.5 ), b, expOpType_t.OP_TYPE_MULTIPLY );

				this.MultiplyTextureMatrix( ts, matrix );
				continue;
			}
			if ( !token.Icmp( "rotate" ) ) {
				var table: idDeclTable;
				var /*int		*/sinReg: number, cosReg: number;

				// in cycles
				a = this.ParseExpression( src );

				table = static_cast<idDeclTable>( declManager.FindType( declType_t.DECL_TABLE, "sinTable", false ) );
				if ( !table ) {
					common.Warning( "no sinTable for rotate defined" );
					this.SetMaterialFlag( materialFlags_t.MF_DEFAULTED );
					return;
				}
				sinReg = this.EmitOp( table.Index ( ), a, expOpType_t.OP_TYPE_TABLE );

				table = static_cast<idDeclTable>( declManager.FindType( declType_t.DECL_TABLE, "cosTable", false ) );
				if ( !table ) {
					common.Warning( "no cosTable for rotate defined" );
					this.SetMaterialFlag( materialFlags_t.MF_DEFAULTED );
					return;
				}
				cosReg = this.EmitOp( table.Index ( ), a, expOpType_t.OP_TYPE_TABLE );

				// this subtracts 0.5, then rotates, then adds 0.5
				matrix[0][0] = cosReg;
				matrix[0][1] = this.EmitOp( this.GetExpressionConstant( 0 ), sinReg, expOpType_t.OP_TYPE_SUBTRACT );
				matrix[0][2] = this.EmitOp( this.EmitOp( this.EmitOp( this.GetExpressionConstant( -0.5 ), cosReg, expOpType_t.OP_TYPE_MULTIPLY ),
						this.EmitOp( this.GetExpressionConstant( 0.5 ), sinReg, expOpType_t.OP_TYPE_MULTIPLY ), expOpType_t.OP_TYPE_ADD ),
					this.GetExpressionConstant( 0.5 ), expOpType_t.OP_TYPE_ADD );

				matrix[1][0] = sinReg;
				matrix[1][1] = cosReg;
				matrix[1][2] = this.EmitOp( this.EmitOp( this.EmitOp( this.GetExpressionConstant( -0.5 ), sinReg, expOpType_t.OP_TYPE_MULTIPLY ),
						this.EmitOp( this.GetExpressionConstant( -0.5 ), cosReg, expOpType_t.OP_TYPE_MULTIPLY ), expOpType_t.OP_TYPE_ADD ),
					this.GetExpressionConstant( 0.5 ), expOpType_t.OP_TYPE_ADD );

				this.MultiplyTextureMatrix( ts, matrix );
				continue;
			}

			// color mask options
			if ( !token.Icmp( "maskRed" ) ) {
				ss.drawStateBits |= GLS_REDMASK;
				continue;
			}
			if ( !token.Icmp( "maskGreen" ) ) {
				ss.drawStateBits |= GLS_GREENMASK;
				continue;
			}
			if ( !token.Icmp( "maskBlue" ) ) {
				ss.drawStateBits |= GLS_BLUEMASK;
				continue;
			}
			if ( !token.Icmp( "maskAlpha" ) ) {
				ss.drawStateBits |= GLS_ALPHAMASK;
				continue;
			}
			if ( !token.Icmp( "maskColor" ) ) {
				ss.drawStateBits |= GLS_COLORMASK;
				continue;
			}
			if ( !token.Icmp( "maskDepth" ) ) {
				ss.drawStateBits |= GLS_DEPTHMASK;
				continue;
			}
			if ( !token.Icmp( "alphaTest" ) ) {
				ss.hasAlphaTest = true;
				ss.alphaTestRegister = this.ParseExpression( src );
				this.coverage = materialCoverage_t.MC_PERFORATED;
				continue;
			}

			// shorthand for 2D modulated
			if ( !token.Icmp( "colored" ) ) {
				ss.color.registers[0] = expRegister_t.EXP_REG_PARM0;
				ss.color.registers[1] = expRegister_t.EXP_REG_PARM1;
				ss.color.registers[2] = expRegister_t.EXP_REG_PARM2;
				ss.color.registers[3] = expRegister_t.EXP_REG_PARM3;
				this.pd.registersAreConstant = false;
				continue;
			}

			if ( !token.Icmp( "color" ) ) {
				ss.color.registers[0] = this.ParseExpression( src );
				this.MatchToken( src, "," );
				ss.color.registers[1] = this.ParseExpression( src );
				this.MatchToken( src, "," );
				ss.color.registers[2] = this.ParseExpression( src );
				this.MatchToken( src, "," );
				ss.color.registers[3] = this.ParseExpression( src );
				continue;
			}
			if ( !token.Icmp( "red" ) ) {
				ss.color.registers[0] = this.ParseExpression( src );
				continue;
			}
			if ( !token.Icmp( "green" ) ) {
				ss.color.registers[1] = this.ParseExpression( src );
				continue;
			}
			if ( !token.Icmp( "blue" ) ) {
				ss.color.registers[2] = this.ParseExpression( src );
				continue;
			}
			if ( !token.Icmp( "alpha" ) ) {
				ss.color.registers[3] = this.ParseExpression( src );
				continue;
			}
			if ( !token.Icmp( "rgb" ) ) {
				ss.color.registers[0] = ss.color.registers[1] =
					ss.color.registers[2] = this.ParseExpression( src );
				continue;
			}
			if ( !token.Icmp( "rgba" ) ) {
				ss.color.registers[0] = ss.color.registers[1] =
					ss.color.registers[2] = ss.color.registers[3] = this.ParseExpression( src );
				continue;
			}

			if ( !token.Icmp( "if" ) ) {
				ss.conditionRegister = this.ParseExpression( src );
				continue;
			}
			if ( !token.Icmp( "program" ) ) {
				if ( src.ReadTokenOnLine( token ) ) {
//#if !defined(GL_ES_VERSION_2_0)
//				newStage.vertexProgram = R_FindARBProgram( GL_VERTEX_PROGRAM_ARB, token.c_str() );
//				newStage.fragmentProgram = R_FindARBProgram( GL_FRAGMENT_PROGRAM_ARB, token.c_str() );
//#endif
				}
				continue;
			}
			if ( !token.Icmp( "fragmentProgram" ) ) {
				if ( src.ReadTokenOnLine( token ) ) {
//#if !defined(GL_ES_VERSION_2_0)
//				newStage.fragmentProgram = R_FindARBProgram( GL_FRAGMENT_PROGRAM_ARB, token.c_str() );
//#endif
				}
				continue;
			}
			if ( !token.Icmp( "vertexProgram" ) ) {
				if ( src.ReadTokenOnLine( token ) ) {
//#if !defined(GL_ES_VERSION_2_0)
//				newStage.vertexProgram = R_FindARBProgram( GL_VERTEX_PROGRAM_ARB, token.c_str() );
//#endif
				}
				continue;
			}
			if ( !token.Icmp( "megaTexture" ) ) {
				if ( src.ReadTokenOnLine( token ) ) {
//#if !defined(GL_ES_VERSION_2_0)
//				newStage.megaTexture = new idMegaTexture;
//				if ( !newStage.megaTexture.InitFromMegaFile( token.c_str() ) ) {
//					delete newStage.megaTexture;
//					this.SetMaterialFlag( materialFlags_t.MF_DEFAULTED );
//					continue;
//				}
//				newStage.vertexProgram = R_FindARBProgram( GL_VERTEX_PROGRAM_ARB, "megaTexture.vfp" );
//				newStage.fragmentProgram = R_FindARBProgram( GL_FRAGMENT_PROGRAM_ARB, "megaTexture.vfp" );
//#endif
					continue;
				}
			}


			if ( !token.Icmp( "vertexParm" ) ) {
//#if !defined(GL_ES_VERSION_2_0)
//			ParseVertexParm( src, &newStage );
//#endif
				continue;
			}

			if ( !token.Icmp( "fragmentMap" ) ) {
//#if !defined(GL_ES_VERSION_2_0)
//			ParseFragmentMap( src, &newStage );
//#endif
				continue;
			}


			common.Warning( "unknown token '%s' in material '%s'", token.c_str ( ), this.GetName ( ) );
			this.SetMaterialFlag( materialFlags_t.MF_DEFAULTED );
			return;
		}


		// if we are using newStage, allocate a copy of it
		if ( newStage.fragmentProgram || newStage.vertexProgram ) {
			todoThrow ( );
			//ss.newStage = new newShaderStage_t;//(newShaderStage_t *)Mem_Alloc( sizeof( newStage ) );
			//*(ss.newStage) = newStage;
		}

		// successfully parsed a stage
		this.numStages++;

		// select a compressed depth based on what the stage is
		if ( td == textureDepth_t.TD_DEFAULT ) {
			switch ( ss.lighting ) {
			case stageLighting_t.SL_BUMP:
				td = textureDepth_t.TD_BUMP;
				break;
			case stageLighting_t.SL_DIFFUSE:
				td = textureDepth_t.TD_DIFFUSE;
				break;
			case stageLighting_t.SL_SPECULAR:
				td = textureDepth_t.TD_SPECULAR;
				break;
			default:
				break;
			}
		}

		// now load the image with all the parms we parsed
		if ( imageName[0] ) {
			ts.image = globalImages.ImageFromFile( imageName, tf, allowPicmip, trp, td, cubeMap );
			if ( !ts.image ) {
				ts.image = globalImages.defaultImage;
			}
		} else if ( !ts.cinematic && !ts.dynamic && !ss.newStage ) {
			common.Warning( "material '%s' had stage with no image", this.GetName ( ) );
			ts.image = globalImages.defaultImage;
		}
	}

/*
===============
idMaterial::ParseDeform
===============
*/
	ParseDeform ( src: idLexer ): void {
		var token = new idToken;

		if ( !src.ExpectAnyToken( token ) ) {
			return;
		}

		if ( !token.Icmp( "sprite" ) ) {
			this.deform = deform_t.DFRM_SPRITE;
			this.cullType = cullType_t.CT_TWO_SIDED;
			this.SetMaterialFlag( materialFlags_t.MF_NOSHADOWS );
			return;
		}
		if ( !token.Icmp( "tube" ) ) {
			this.deform = deform_t.DFRM_TUBE;
			this.cullType = cullType_t.CT_TWO_SIDED;
			this.SetMaterialFlag( materialFlags_t.MF_NOSHADOWS );
			return;
		}
		if ( !token.Icmp( "flare" ) ) {
			this.deform = deform_t.DFRM_FLARE;
			this.cullType = cullType_t.CT_TWO_SIDED;
			this.deformRegisters[0] = this.ParseExpression( src );
			this.SetMaterialFlag( materialFlags_t.MF_NOSHADOWS );
			return;
		}
		if ( !token.Icmp( "expand" ) ) {
			this.deform = deform_t.DFRM_EXPAND;
			this.deformRegisters[0] = this.ParseExpression( src );
			return;
		}
		if ( !token.Icmp( "move" ) ) {
			this.deform = deform_t.DFRM_MOVE;
			this.deformRegisters[0] = this.ParseExpression( src );
			return;
		}
		if ( !token.Icmp( "turbulent" ) ) {
			this.deform = deform_t.DFRM_TURB;

			if ( !src.ExpectAnyToken( token ) ) {
				src.Warning( "deform particle missing particle name" );
				this.SetMaterialFlag( materialFlags_t.MF_DEFAULTED );
				return;
			}
			this.deformDecl = declManager.FindType( declType_t.DECL_TABLE, token.c_str ( ), true );

			this.deformRegisters[0] = this.ParseExpression( src );
			this.deformRegisters[1] = this.ParseExpression( src );
			this.deformRegisters[2] = this.ParseExpression( src );
			return;
		}
		if ( !token.Icmp( "eyeBall" ) ) {
			this.deform = deform_t.DFRM_EYEBALL;
			return;
		}
		if ( !token.Icmp( "particle" ) ) {
			this.deform = deform_t.DFRM_PARTICLE;
			if ( !src.ExpectAnyToken( token ) ) {
				src.Warning( "deform particle missing particle name" );
				this.SetMaterialFlag( materialFlags_t.MF_DEFAULTED );
				return;
			}
			this.deformDecl = declManager.FindType( declType_t.DECL_PARTICLE, token.c_str ( ), true );
			return;
		}
		if ( !token.Icmp( "particle2" ) ) {
			this.deform = deform_t.DFRM_PARTICLE2;
			if ( !src.ExpectAnyToken( token ) ) {
				src.Warning( "deform particle missing particle name" );
				this.SetMaterialFlag( materialFlags_t.MF_DEFAULTED );
				return;
			}
			this.deformDecl = declManager.FindType( declType_t.DECL_PARTICLE, token.c_str ( ), true );
			return;
		}
		src.Warning( "Bad deform type '%s'", token.c_str ( ) );
		this.SetMaterialFlag( materialFlags_t.MF_DEFAULTED );
	}


/*
==============
idMaterial::AddImplicitStages

If a material has diffuse or specular stages without any
bump stage, add an implicit _flat bumpmap stage.

If a material has a bump stage but no diffuse or specular
stage, add a _white diffuse stage.

It is valid to have either a diffuse or specular without the other.

It is valid to have a reflection map and a bump map for bumpy reflection
==============
*/
	AddImplicitStages ( trpDefault: textureRepeat_t = textureRepeat_t.TR_REPEAT ): void {

		var buffer = new Uint8Array( 1024 );
		var newSrc = new idLexer;
		var hasDiffuse = false;
		var hasSpecular = false;
		var hasBump = false;
		var hasReflection = false;

		for ( var i = 0; i < this.numStages; i++ ) {
			if ( this.pd.parseStages[i].lighting == stageLighting_t.SL_BUMP ) {
				hasBump = true;
			}
			if ( this.pd.parseStages[i].lighting == stageLighting_t.SL_DIFFUSE ) {
				hasDiffuse = true;
			}
			if ( this.pd.parseStages[i].lighting == stageLighting_t.SL_SPECULAR ) {
				hasSpecular = true;
			}
			if ( this.pd.parseStages[i].texture.texgen == texgen_t.TG_REFLECT_CUBE ) {
				hasReflection = true;
			}
		}

		// if it doesn't have an interaction at all, don't add anything
		if ( !hasBump && !hasDiffuse && !hasSpecular ) {
			return;
		}

		if ( this.numStages == MAX_SHADER_STAGES ) {
			return;
		}

		if ( !hasBump ) {
			idStr.snPrintf( buffer, sizeof( buffer ), "blend bumpmap\nmap _flat\n}\n" );
			newSrc.LoadMemory( buffer.toString(), strlen( buffer ), "bumpmap" );
			newSrc.SetFlags( lexerFlags_t.LEXFL_NOFATALERRORS | lexerFlags_t.LEXFL_NOSTRINGCONCAT | lexerFlags_t.LEXFL_NOSTRINGESCAPECHARS | lexerFlags_t.LEXFL_ALLOWPATHNAMES );
			this.ParseStage( newSrc, trpDefault );
			newSrc.FreeSource ( );
		}

		if ( !hasDiffuse && !hasSpecular && !hasReflection ) {
			idStr.snPrintf( buffer, sizeof( buffer ), "blend diffusemap\nmap _white\n}\n" );
			newSrc.LoadMemory(buffer.toString(), strlen( buffer ), "diffusemap" );
			newSrc.SetFlags( lexerFlags_t.LEXFL_NOFATALERRORS | lexerFlags_t.LEXFL_NOSTRINGCONCAT | lexerFlags_t.LEXFL_NOSTRINGESCAPECHARS | lexerFlags_t.LEXFL_ALLOWPATHNAMES );
			this.ParseStage( newSrc, trpDefault );
			newSrc.FreeSource ( );
		}
	}

/*
===============
idMaterial::SortInteractionStages

The renderer expects bump, then diffuse, then specular
There can be multiple bump maps, followed by additional
diffuse and specular stages, which allows cross-faded bump mapping.

Ambient stages can be interspersed anywhere, but they are
ignored during interactions, and all the interaction
stages are ignored during ambient drawing.
===============
*/
	SortInteractionStages ( ): void {
		var /*int		*/j: number;

		for ( var i = 0; i < this.numStages; i = j ) {
			// find the next bump map
			for ( j = i + 1; j < this.numStages; j++ ) {
				if ( this.pd.parseStages[j].lighting == stageLighting_t.SL_BUMP ) {
					// if the very first stage wasn't a bumpmap,
					// this bumpmap is part of the first group
					if ( this.pd.parseStages[i].lighting != stageLighting_t.SL_BUMP ) {
						continue;
					}
					break;
				}
			}

			// bubble sort everything bump / diffuse / specular
			for ( var l = 1; l < j - i; l++ ) {
				for ( var k = i; k < j - l; k++ ) {
					if ( this.pd.parseStages[k].lighting > this.pd.parseStages[k + 1].lighting ) {
						var temp: shaderStage_t;

						temp = this.pd.parseStages[k];
						this.pd.parseStages[k] = this.pd.parseStages[k + 1];
						this.pd.parseStages[k + 1] = temp;
					}
				}
			}
		}
	}

/*
=================
idMaterial::ParseMaterial

The current text pointer is at the explicit text definition of the
Parse it into the global material variable. Later functions will optimize it.

If there is any error during parsing, defaultShader will be set.
=================
*/
	ParseMaterial ( src: idLexer ): void {
		var token = new idToken;
		var /*int*/s: number;
		var buffer = ""; //char		buffer[1024];
		var str = "";
		var newSrc = new idLexer;
		var /*int*/i: number;

		s = 0;

		this.numOps = 0;
		this.numRegisters = expRegister_t.EXP_REG_NUM_PREDEFINED; // leave space for the parms to be copied in
		for ( i = 0; i < this.numRegisters; i++ ) {
			this.pd.registerIsTemporary[i] = true; // they aren't constants that can be folded
		}

		this.numStages = 0;

		var trpDefault = textureRepeat_t.TR_REPEAT; // allow a global setting for repeat

		while ( 1 ) {
			if ( this.TestMaterialFlag( materialFlags_t.MF_DEFAULTED ) ) { // we have a parse error
				return;
			}
			if ( !src.ExpectAnyToken( token ) ) {
				this.SetMaterialFlag( materialFlags_t.MF_DEFAULTED );
				return;
			}

			// end of material definition
			if ( token.data == "}" ) {
				break;
			} else if ( !token.Icmp( "qer_editorimage" ) ) {
				src.ReadTokenOnLine( token );
				this.editorImageName.equals( token.c_str ( ) );
				src.SkipRestOfLine ( );
				continue;
			}
			// description
			else if ( !token.Icmp( "description" ) ) {
				src.ReadTokenOnLine( token );
				this.desc.equals( token.c_str ( ) );
				continue;
			}
			// check for the surface / content bit flags
			else if ( this.CheckSurfaceParm( token ) ) {
				continue;
			}
// polygonOffset
			else if ( !token.Icmp( "polygonOffset" ) ) {
				this.SetMaterialFlag( materialFlags_t.MF_POLYGONOFFSET );
				if ( !src.ReadTokenOnLine( token ) ) {
					this.polygonOffset = 1;
					continue;
				}
				// explict larger (or negative) offset
				this.polygonOffset = token.GetFloatValue ( );
				continue;
			}
			// noshadow
			else if ( !token.Icmp( "noShadows" ) ) {
				this.SetMaterialFlag( materialFlags_t.MF_NOSHADOWS );
				continue;
			} else if ( !token.Icmp( "suppressInSubview" ) ) {
				this.suppressInSubview = true;
				continue;
			} else if ( !token.Icmp( "portalSky" ) ) {
				this.portalSky = true;
				continue;
			}
			// noSelfShadow
			else if ( !token.Icmp( "noSelfShadow" ) ) {
				this.SetMaterialFlag( materialFlags_t.MF_NOSELFSHADOW );
				continue;
			}
			// noPortalFog
			else if ( !token.Icmp( "noPortalFog" ) ) {
				this.SetMaterialFlag( materialFlags_t.MF_NOPORTALFOG );
				continue;
			}
			// forceShadows allows nodraw surfaces to cast shadows
			else if ( !token.Icmp( "forceShadows" ) ) {
				this.SetMaterialFlag( materialFlags_t.MF_FORCESHADOWS );
				continue;
			}
			// overlay / decal suppression
			else if ( !token.Icmp( "noOverlays" ) ) {
				this.allowOverlays = false;
				continue;
			}
			// moster blood overlay forcing for alpha tested or translucent surfaces
			else if ( !token.Icmp( "forceOverlays" ) ) {
				this.pd.forceOverlays = true;
				continue;
			}
			// translucent
			else if ( !token.Icmp( "translucent" ) ) {
				this.coverage = materialCoverage_t.MC_TRANSLUCENT;
				continue;
			}
			// global zero clamp
			else if ( !token.Icmp( "zeroclamp" ) ) {
				trpDefault = textureRepeat_t.TR_CLAMP_TO_ZERO;
				continue;
			}
			// global clamp
			else if ( !token.Icmp( "clamp" ) ) {
				trpDefault = textureRepeat_t.TR_CLAMP;
				continue;
			}
			// global clamp
			else if ( !token.Icmp( "alphazeroclamp" ) ) {
				trpDefault = textureRepeat_t.TR_CLAMP_TO_ZERO;
				continue;
			}
			// forceOpaque is used for skies-behind-windows
			else if ( !token.Icmp( "forceOpaque" ) ) {
				this.coverage = materialCoverage_t.MC_OPAQUE;
				continue;
			}
			// twoSided
			else if ( !token.Icmp( "twoSided" ) ) {
				this.cullType = cullType_t.CT_TWO_SIDED;
				// twoSided implies no-shadows, because the shadow
				// volume would be coplanar with the surface, giving depth fighting
				// we could make this no-self-shadows, but it may be more important
				// to receive shadows from no-self-shadow monsters
				this.SetMaterialFlag( materialFlags_t.MF_NOSHADOWS );
			}
			// backSided
			else if ( !token.Icmp( "backSided" ) ) {
				this.cullType = cullType_t.CT_BACK_SIDED;
				// the shadow code doesn't handle this, so just disable shadows.
				// We could fix this in the future if there was a need.
				this.SetMaterialFlag( materialFlags_t.MF_NOSHADOWS );
			}
			// foglight
			else if ( !token.Icmp( "fogLight" ) ) {
				this.fogLight = true;
				continue;
			}
			// blendlight
			else if ( !token.Icmp( "blendLight" ) ) {
				this.blendLight = true;
				continue;
			}
			// ambientLight
			else if ( !token.Icmp( "ambientLight" ) ) {
				this.ambientLight = true;
				continue;
			}
			// mirror
			else if ( !token.Icmp( "mirror" ) ) {
				this.sort = materialSort_t.SS_SUBVIEW;
				this.coverage = materialCoverage_t.MC_OPAQUE;
				continue;
			}
			// noFog
			else if ( !token.Icmp( "noFog" ) ) {
				this.noFog = true;
				continue;
			}
			// unsmoothedTangents
			else if ( !token.Icmp( "unsmoothedTangents" ) ) {
				this.unsmoothedTangents = true;
				continue;
			}
			// lightFallofImage <imageprogram>
			// specifies the image to use for the third axis of projected
			// light volumes
			else if ( !token.Icmp( "lightFalloffImage" ) ) {
				str = R_ParsePastImageProgram( src ).toString ( );
				var copy: idStr;

				copy = new idStr( str ); // so other things don't step on it
				this.lightFalloffImage = globalImages.ImageFromFile( copy.data, textureFilter_t.TF_DEFAULT, false, textureRepeat_t.TR_CLAMP /* TR_CLAMP_TO_ZERO */, textureDepth_t.TD_DEFAULT );
				continue;
			}
			// guisurf <guifile> | guisurf entity
			// an entity guisurf must have an idUserInterface
			// specified in the renderEntity
			else if ( !token.Icmp( "guisurf" ) ) {
				src.ReadTokenOnLine( token );
				if ( !token.Icmp( "entity" ) ) {
					this.entityGui = 1;
				} else if ( !token.Icmp( "entity2" ) ) {
					this.entityGui = 2;
				} else if ( !token.Icmp( "entity3" ) ) {
					this.entityGui = 3;
				} else {
					this.gui = uiManager.FindGui( token.c_str ( ), true );
				}
				continue;
			}
			// sort
			else if ( !token.Icmp( "sort" ) ) {
				this.ParseSort( src );
				continue;
			}
			// spectrum <integer>
			else if ( !token.Icmp( "spectrum" ) ) {
				src.ReadTokenOnLine( token );
				this.spectrum = atoi( token.c_str ( ) );
				continue;
			}
			// deform < sprite | tube | flare >
			else if ( !token.Icmp( "deform" ) ) {
				this.ParseDeform( src );
				continue;
			}
			// decalInfo <staySeconds> <fadeSeconds> ( <start rgb> ) ( <end rgb> )
			else if ( !token.Icmp( "decalInfo" ) ) {
				this.ParseDecalInfo( src );
				continue;
			}
			// renderbump <args...>
			else if ( !token.Icmp( "renderbump" ) ) {
				src.ParseRestOfLine( this.renderBump );
				continue;
			}
			// diffusemap for stage shortcut
			else if ( !token.Icmp( "diffusemap" ) ) {
				str = R_ParsePastImageProgram( src ).toString ( );
				buffer = sprintf( "blend diffusemap\nmap %s\n}\n", str ); //idStr.snPrintf( buffer, sizeof( buffer ), "blend diffusemap\nmap %s\n}\n", str );
				newSrc.LoadMemory( buffer, strlen( buffer ), "diffusemap" );
				newSrc.SetFlags( lexerFlags_t.LEXFL_NOFATALERRORS | lexerFlags_t.LEXFL_NOSTRINGCONCAT | lexerFlags_t.LEXFL_NOSTRINGESCAPECHARS | lexerFlags_t.LEXFL_ALLOWPATHNAMES );
				this.ParseStage( newSrc, trpDefault );
				newSrc.FreeSource ( );
				continue;
			}
			// specularmap for stage shortcut
			else if ( !token.Icmp( "specularmap" ) ) {
				str = R_ParsePastImageProgram( src ).toString ( );
				buffer = sprintf( "blend specularmap\nmap %s\n}\n", str ); //idStr.snPrintf( buffer, sizeof( buffer ), "blend specularmap\nmap %s\n}\n", str );
				newSrc.LoadMemory( buffer, strlen( buffer ), "specularmap" );
				newSrc.SetFlags( lexerFlags_t.LEXFL_NOFATALERRORS | lexerFlags_t.LEXFL_NOSTRINGCONCAT | lexerFlags_t.LEXFL_NOSTRINGESCAPECHARS | lexerFlags_t.LEXFL_ALLOWPATHNAMES );
				this.ParseStage( newSrc, trpDefault );
				newSrc.FreeSource ( );
				continue;
			}
			// normalmap for stage shortcut
			else if ( !token.Icmp( "bumpmap" ) ) {
				str = R_ParsePastImageProgram( src ).toString ( );
				buffer = sprintf( "blend bumpmap\nmap %s\n}\n", str ); //idStr.snPrintf( buffer, sizeof( buffer ), "blend bumpmap\nmap %s\n}\n", str );
				newSrc.LoadMemory( buffer, strlen( buffer ), "bumpmap" );
				newSrc.SetFlags( lexerFlags_t.LEXFL_NOFATALERRORS | lexerFlags_t.LEXFL_NOSTRINGCONCAT | lexerFlags_t.LEXFL_NOSTRINGESCAPECHARS | lexerFlags_t.LEXFL_ALLOWPATHNAMES );
				this.ParseStage( newSrc, trpDefault );
				newSrc.FreeSource ( );
				continue;
			}
			// DECAL_MACRO for backwards compatibility with the preprocessor macros
			else if ( !token.Icmp( "DECAL_MACRO" ) ) {
				// polygonOffset
				this.SetMaterialFlag( materialFlags_t.MF_POLYGONOFFSET );
				this.polygonOffset = 1;

				// discrete
				this.surfaceFlags |= surfaceFlags_t.SURF_DISCRETE;
				this.contentFlags &= ~contentsFlags_t.CONTENTS_SOLID;

				// sort decal
				this.sort = materialSort_t.SS_DECAL;

				// noShadows
				this.SetMaterialFlag( materialFlags_t.MF_NOSHADOWS );
				continue;
			} else if ( token.data == "{" ) {
				// create the new stage
				this.ParseStage( src, trpDefault );
				continue;
			} else {
				common.Warning( "unknown general material parameter '%s' in '%s'", token.c_str ( ), this.GetName ( ) );
				this.SetMaterialFlag( materialFlags_t.MF_DEFAULTED );
				return;
			}
		}

		// add _flat or _white stages if needed
		this.AddImplicitStages ( );

		// order the diffuse / bump / specular stages properly
		this.SortInteractionStages ( );

		// if we need to do anything with normals (lighting or environment mapping)
		// and two sided lighting was asked for, flag
		// shouldCreateBackSides() and change culling back to single sided,
		// so we get proper tangent vectors on both sides

		// we can't just call ReceivesLighting(), because the stages are still
		// in temporary form
		if ( this.cullType == cullType_t.CT_TWO_SIDED ) {
			for ( i = 0; i < this.numStages; i++ ) {
				if ( this.pd.parseStages[i].lighting != stageLighting_t.SL_AMBIENT || this.pd.parseStages[i].texture.texgen != texgen_t.TG_EXPLICIT ) {
					if ( this.cullType == cullType_t.CT_TWO_SIDED ) {
						this.cullType = cullType_t.CT_FRONT_SIDED;
						this.shouldCreateBackSides = true;
					}
					break;
				}
			}
		}

		// currently a surface can only have one unique texgen for all the stages on old hardware
		var firstGen = texgen_t.TG_EXPLICIT;
		for ( i = 0; i < this.numStages; i++ ) {
			if ( this.pd.parseStages[i].texture.texgen != texgen_t.TG_EXPLICIT ) {
				if ( firstGen == texgen_t.TG_EXPLICIT ) {
					firstGen = this.pd.parseStages[i].texture.texgen;
				} else if ( firstGen != this.pd.parseStages[i].texture.texgen ) {
					common.Warning( "material '%s' has multiple stages with a texgen", this.GetName ( ) );
					break;
				}
			}
		}
	}

/////*
////=========================
////idMaterial::SetGui
////=========================
////*/
////void idMaterial::SetGui( const char *_gui ) const {
////	gui = uiManager.FindGui( _gui, true, false, true );
////}

/*
=========================
idMaterial::Parse

Parses the current material definition and finds all necessary images.
=========================
*/
/*bool idMaterial::*/Parse( /*const char **/text:string, /*const int */textLength:number ):boolean {
	var src = new idLexer;
	var token:idToken;
	var parsingData: mtrParsingData_t;

	src.LoadMemory(text, textLength, this.GetFileName(), this.GetLineNum() );
	src.SetFlags( DECL_LEXER_FLAGS );
	src.SkipUntilString( "{" );
	
	// reset to the unparsed state
	this.CommonInit();
	
	parsingData = new mtrParsingData_t;//	memset( &parsingData, 0, sizeof( parsingData ) );

	this.pd = parsingData;	// this is only valid during parse

	// parse it
	this.ParseMaterial(src);

	// if we are doing an fs_copyfiles, also reference the editorImage
	if ( cvarSystem.GetCVarInteger( "fs_copyFiles" ) ) {
		this.GetEditorImage();
	}

	//
	// count non-lit stages
	this.numAmbientStages = 0;
	var i:number;
	for ( i = 0 ; i < this.numStages ; i++ ) {
		if ( this.pd.parseStages[i].lighting == stageLighting_t.SL_AMBIENT ) {
			this.numAmbientStages++;
		}
	}

	// see if there is a subview stage
	if ( this.sort == materialSort_t.SS_SUBVIEW ) {
		this.hasSubview = true;
	} else {
		this.hasSubview = false;
		for ( i = 0 ; i < this.numStages ; i++ ) {
			if ( this.pd.parseStages[i].texture.dynamic ) {
				this.hasSubview = true;
			}
		}
	}

	// automatically determine coverage if not explicitly set
	if ( this.coverage == materialCoverage_t.MC_BAD ) {
		// automatically set MC_TRANSLUCENT if we don't have any interaction stages and 
		// the first stage is blended and not an alpha test mask or a subview
		if ( !this.numStages ) {
			// non-visible
			this.coverage = materialCoverage_t.MC_TRANSLUCENT;
		} else if ( this.numStages != this.numAmbientStages ) {
			// we have an interaction draw
			this.coverage = materialCoverage_t.MC_OPAQUE;
		} else if ( 
			( this.pd.parseStages[0].drawStateBits & GLS_DSTBLEND_BITS ) != GLS_DSTBLEND_ZERO ||
			( this.pd.parseStages[0].drawStateBits & GLS_SRCBLEND_BITS ) == GLS_SRCBLEND_DST_COLOR ||
			( this.pd.parseStages[0].drawStateBits & GLS_SRCBLEND_BITS ) == GLS_SRCBLEND_ONE_MINUS_DST_COLOR ||
			( this.pd.parseStages[0].drawStateBits & GLS_SRCBLEND_BITS ) == GLS_SRCBLEND_DST_ALPHA ||
			( this.pd.parseStages[0].drawStateBits & GLS_SRCBLEND_BITS ) == GLS_SRCBLEND_ONE_MINUS_DST_ALPHA
			) {
			// blended with the destination
				this.coverage = materialCoverage_t.MC_TRANSLUCENT;
		} else {
			this.coverage = materialCoverage_t.MC_OPAQUE;
		}
	}

	// translucent automatically implies noshadows
	if (this.coverage == materialCoverage_t.MC_TRANSLUCENT ) {
		this.SetMaterialFlag( materialFlags_t.MF_NOSHADOWS );
	} else {
		// mark the contents as opaque
		this.contentFlags |= contentsFlags_t.CONTENTS_OPAQUE;
	}

	// if we are translucent, draw with an alpha in the editor
	if ( this.coverage == materialCoverage_t.MC_TRANSLUCENT ) {
		this.editorAlpha = 0.5;
	} else {
		this.editorAlpha = 1.0;
	}

	// the sorts can make reasonable defaults
	if ( this.sort == materialSort_t.SS_BAD ) {
		if ( this.TestMaterialFlag(materialFlags_t.MF_POLYGONOFFSET) ) {
			this.sort = materialSort_t.SS_DECAL;
		} else if ( this.coverage == materialCoverage_t.MC_TRANSLUCENT ) {
			this.sort = materialSort_t.SS_MEDIUM;
		} else {
			this.sort = materialSort_t.SS_OPAQUE;
		}
	}

	// anything that references _currentRender will automatically get sort = SS_POST_PROCESS
	// and coverage = MC_TRANSLUCENT

	for ( i = 0 ; i < this.numStages ; i++ ) {
		var	pStage = /*&*/this.pd.parseStages[i];
		if ( pStage.texture.image == globalImages.currentRenderImage ) {
			if (this.sort != materialSort_t.SS_PORTAL_SKY ) {
				this.sort = materialSort_t.SS_POST_PROCESS;
				this.coverage = materialCoverage_t.MC_TRANSLUCENT;
			}
			break;
		}
		if ( pStage.newStage ) {
			for ( var j = 0 ; j < pStage.newStage.numFragmentProgramImages ; j++ ) {
				if ( pStage.newStage.fragmentProgramImages[j] == globalImages.currentRenderImage ) {
					if (this.sort != materialSort_t.SS_PORTAL_SKY ) {
						this.sort = materialSort_t.SS_POST_PROCESS;
						this.coverage = materialCoverage_t.MC_TRANSLUCENT;
					}
					i = this.numStages;
					break;
				}
			}
		}
	}

	// set the drawStateBits depth flags
	for ( i = 0 ; i < this.numStages ; i++ ) {
		var pStage = /*&*/this.pd.parseStages[i];
		if (this.sort == materialSort_t.SS_POST_PROCESS ) {
			// post-process effects fill the depth buffer as they draw, so only the
			// topmost post-process effect is rendered
			pStage.drawStateBits |= GLS_DEPTHFUNC_LESS;
		} else if ( this.coverage == materialCoverage_t.MC_TRANSLUCENT || pStage.ignoreAlphaTest ) {
			// translucent surfaces can extend past the exactly marked depth buffer
			pStage.drawStateBits |= GLS_DEPTHFUNC_LESS | GLS_DEPTHMASK;
		} else {
			// opaque and perforated surfaces must exactly match the depth buffer,
			// which gets alpha test correct
			pStage.drawStateBits |= GLS_DEPTHFUNC_EQUAL | GLS_DEPTHMASK;
		}
	}

	// determine if this surface will accept overlays / decals

	if ( this.pd.forceOverlays ) {
		// explicitly flaged in material definition
		this.allowOverlays = true;
	} else {
		if ( !this.IsDrawn() ) {
			this.allowOverlays = false;
		}
		if (this.Coverage() != materialCoverage_t.MC_OPAQUE ) {
			this.allowOverlays = false;
		}
		if (this.GetSurfaceFlags() & surfaceFlags_t.SURF_NOIMPACT ) {
			this.allowOverlays = false;
		}
	}

	// add a tiny offset to the sort orders, so that different materials
	// that have the same sort value will at least sort consistantly, instead
	// of flickering back and forth
/* this messed up in-game guis
	if ( this.sort != materialSort_t.SS_SUBVIEW ) {
		int	hash, l;

		l = name.Length();
		hash = 0;
		for ( int i = 0 ; i < l ; i++ ) {
			hash ^= name[i];
		}
		this.sort += hash * 0.01;
	}
*/

	if (this.numStages) {
		this.stages = newStructArray<shaderStage_t>( shaderStage_t, this.numStages ); //(shaderStage_t *)R_StaticAlloc( this.numStages * sizeof( stages[0] ) );
		memcpyStructs( this.stages, this.pd.parseStages, this.numStages , shaderStage_t.typeInfo);
	}

	if ( this.numOps ) {
		this.ops = newStructArray<expOp_t>( expOp_t, this.numOps );
		memcpyStructs( this.ops, this.pd.shaderOps, this.numOps, expOp_t.typeInfo );
	}

	if ( this.numRegisters ) {
		this.expressionRegisters = new Float32Array( this.numRegisters );// (float *)R_StaticAlloc( this.numRegisters * sizeof( expressionRegisters[0] ) );
		memcpy( this.expressionRegisters, this.pd.shaderRegisters, this.numRegisters * this.expressionRegisters.BYTES_PER_ELEMENT );
	}

	// see if the registers are completely constant, and don't need to be evaluated
	// per-surface
	this.CheckForConstantRegisters();

	this.pd = null;	// the pointer will be invalid after exiting this function

	// finish things up
	if ( this.TestMaterialFlag( materialFlags_t.MF_DEFAULTED ) ) {
		this.MakeDefault();
		return false;
	}
	return true;
}

/////*
////===================
////idMaterial::Print
////===================
////*/
////char *opNames[] = {
////	"OP_TYPE_ADD",
////	"OP_TYPE_SUBTRACT",
////	"OP_TYPE_MULTIPLY",
////	"OP_TYPE_DIVIDE",
////	"OP_TYPE_MOD",
////	"OP_TYPE_TABLE",
////	"OP_TYPE_GT",
////	"OP_TYPE_GE",
////	"OP_TYPE_LT",
////	"OP_TYPE_LE",
////	"OP_TYPE_EQ",
////	"OP_TYPE_NE",
////	"OP_TYPE_AND",
////	"OP_TYPE_OR"
////};

////void idMaterial::Print() const {
////	int			i;

////	for ( i = expRegister_t.EXP_REG_NUM_PREDEFINED ; i < GetNumRegisters() ; i++ ) {
////		common.Printf( "register %i: %f\n", i, this.expressionRegisters[i] );
////	}
////	common.Printf( "\n" );
////	for ( i = 0 ; i < this.numOps ; i++ ) {
////		const expOp_t *op = &ops[i];
////		if ( op.opType == expOpType_t.OP_TYPE_TABLE ) {
////			common.Printf( "%i = %s[ %i ]\n", op.c, declManager.DeclByIndex( declType_t.DECL_TABLE, op.a ).GetName(), op.b );
////		} else {
////			common.Printf( "%i = %i %s %i\n", op.c, op.a, opNames[ op.opType ], op.b );
////		}
////	}
////}

/////*
////===============
////idMaterial::Save
////===============
////*/
////bool idMaterial::Save( const char *fileName ) {
////	return ReplaceSourceFileText();
////}

/*
===============
idMaterial::AddReference
===============
*/
	AddReference ( ): void {
		this.refCount++;

		for ( var i = 0; i < this.numStages; i++ ) {
			var s: shaderStage_t = this.stages[i];

			if ( s.texture.image ) {
				s.texture.image.AddReference ( );
			}
		}
	}

/*
===============
idMaterial::EvaluateRegisters

Parameters are taken from the localSpace and the renderView,
then all expressions are evaluated, leaving the material registers
set to their apropriate values.
===============
*/
	EvaluateRegisters ( /*float **/registers: Float32Array, /*const float */shaderParms: Float32Array /*[MAX_ENTITY_SHADER_PARMS]*/,
		view: viewDef_t, soundEmitter: idSoundEmitter ): void {
		var /*int		*/i: number, b: number;
		var op: expOp_t;

		// copy the material constants
		for ( i = expRegister_t.EXP_REG_NUM_PREDEFINED; i < this.numRegisters; i++ ) {
			registers[i] = this.expressionRegisters[i];
		}

		// copy the local and global parameters
		registers[expRegister_t.EXP_REG_TIME] = view.floatTime;
		registers[expRegister_t.EXP_REG_PARM0] = shaderParms[0];
		registers[expRegister_t.EXP_REG_PARM1] = shaderParms[1];
		registers[expRegister_t.EXP_REG_PARM2] = shaderParms[2];
		registers[expRegister_t.EXP_REG_PARM3] = shaderParms[3];
		registers[expRegister_t.EXP_REG_PARM4] = shaderParms[4];
		registers[expRegister_t.EXP_REG_PARM5] = shaderParms[5];
		registers[expRegister_t.EXP_REG_PARM6] = shaderParms[6];
		registers[expRegister_t.EXP_REG_PARM7] = shaderParms[7];
		registers[expRegister_t.EXP_REG_PARM8] = shaderParms[8];
		registers[expRegister_t.EXP_REG_PARM9] = shaderParms[9];
		registers[expRegister_t.EXP_REG_PARM10] = shaderParms[10];
		registers[expRegister_t.EXP_REG_PARM11] = shaderParms[11];
		registers[expRegister_t.EXP_REG_GLOBAL0] = view.renderView.shaderParms[0];
		registers[expRegister_t.EXP_REG_GLOBAL1] = view.renderView.shaderParms[1];
		registers[expRegister_t.EXP_REG_GLOBAL2] = view.renderView.shaderParms[2];
		registers[expRegister_t.EXP_REG_GLOBAL3] = view.renderView.shaderParms[3];
		registers[expRegister_t.EXP_REG_GLOBAL4] = view.renderView.shaderParms[4];
		registers[expRegister_t.EXP_REG_GLOBAL5] = view.renderView.shaderParms[5];
		registers[expRegister_t.EXP_REG_GLOBAL6] = view.renderView.shaderParms[6];
		registers[expRegister_t.EXP_REG_GLOBAL7] = view.renderView.shaderParms[7];

		var opIdx = 0;
		for ( i = 0; i < this.numOps; i++, op = this.ops[++opIdx] ) {
			switch ( op.opType ) {
			case expOpType_t.OP_TYPE_ADD:
				registers[op.c] = registers[op.a] + registers[op.b];
				break;
			case expOpType_t.OP_TYPE_SUBTRACT:
				registers[op.c] = registers[op.a] - registers[op.b];
				break;
			case expOpType_t.OP_TYPE_MULTIPLY:
				registers[op.c] = registers[op.a] * registers[op.b];
				break;
			case expOpType_t.OP_TYPE_DIVIDE:
				registers[op.c] = registers[op.a] / registers[op.b];
				break;
			case expOpType_t.OP_TYPE_MOD:
				b = int( registers[op.b] );
				b = b != 0 ? b : 1;
				registers[op.c] = int( registers[op.a] % b );
				break;
			case expOpType_t.OP_TYPE_TABLE:
				{
					todoThrow ( );
					//const idDeclTable *table = static_cast<const idDeclTable *>( declManager.DeclByIndex( declType_t.DECL_TABLE, op.a ) );
					//registers[op.c] = table.TableLookup( registers[op.b] );
				}
				break;
			case expOpType_t.OP_TYPE_SOUND:
				if ( soundEmitter ) {
					todoThrow ( );
					//registers[op.c] = soundEmitter.CurrentAmplitude();
				} else {
					registers[op.c] = 0;
				}
				break;
			case expOpType_t.OP_TYPE_GT:
				registers[op.c] = ( registers[op.a] > registers[op.b] ) ? 1 : 0;
				break;
			case expOpType_t.OP_TYPE_GE:
				registers[op.c] = ( registers[op.a] >= registers[op.b] ) ? 1 : 0;
				break;
			case expOpType_t.OP_TYPE_LT:
				registers[op.c] = ( registers[op.a] < registers[op.b] ) ? 1 : 0;
				break;
			case expOpType_t.OP_TYPE_LE:
				registers[op.c] = ( registers[op.a] <= registers[op.b] ) ? 1 : 0;
				break;
			case expOpType_t.OP_TYPE_EQ:
				registers[op.c] = ( registers[op.a] == registers[op.b] ) ? 1 : 0;
				break;
			case expOpType_t.OP_TYPE_NE:
				registers[op.c] = ( registers[op.a] != registers[op.b] ) ? 1 : 0;
				break;
			case expOpType_t.OP_TYPE_AND:
				registers[op.c] = ( registers[op.a] && registers[op.b] ) ? 1 : 0;
				break;
			case expOpType_t.OP_TYPE_OR:
				registers[op.c] = ( registers[op.a] || registers[op.b] ) ? 1 : 0;
				break;
			default:
				common.FatalError( "R_EvaluateExpression: bad opcode" );
			}
		}
	}

/*
=============
idMaterial::Texgen
=============
*/
	Texgen ( ): texgen_t {
		if ( this.stages ) {
			for ( var i = 0; i < this.numStages; i++ ) {
				if ( this.stages[i].texture.texgen != texgen_t.TG_EXPLICIT ) {
					return this.stages[i].texture.texgen;
				}
			}
		}

		return texgen_t.TG_EXPLICIT;
	}

/*
=============
idMaterial::GetImageWidth
=============
*/
	GetImageWidth ( ): number {
		assert( this.GetStage( 0 ) && this.GetStage( 0 ).texture.image );
		return this.GetStage( 0 ).texture.image.uploadWidth;
	}

/*
=============
idMaterial::GetImageHeight
=============
*/
	GetImageHeight ( ): number {
		assert( this.GetStage( 0 ) && this.GetStage( 0 ).texture.image );
		return this.GetStage( 0 ).texture.image.uploadHeight;
	}

/*
=============
idMaterial::CinematicLength
=============
*/
	CinematicLength ( ): number {
		if ( !this.stages || !this.stages[0].texture.cinematic ) {
			return 0;
		}
		return this.stages[0].texture.cinematic.AnimationLength ( );
	}

/*
=============
idMaterial::UpdateCinematic
=============
*/
	UpdateCinematic ( /*int*/time: number ): void {
		if ( !this.stages || !this.stages[0].texture.cinematic || !backEnd.viewDef ) {
			return;
		}
		this.stages[0].texture.cinematic.ImageForTime( tr.primaryRenderView.time );
	}

/////*
////=============
////idMaterial::CloseCinematic
////=============
////*/
////void idMaterial::CloseCinematic( void ) const {
////	for( int i = 0; i < this.numStages; i++ ) {
////		if ( this.stages[i].texture.cinematic ) {
////			this.stages[i].texture.cinematic.Close();
////			delete this.stages[i].texture.cinematic;
////			this.stages[i].texture.cinematic = NULL;
////		}
////	}
////}

/////*
////=============
////idMaterial::ResetCinematicTime
////=============
////*/
////void idMaterial::ResetCinematicTime( /*int*/time:number ) const {
////	for( int i = 0; i < this.numStages; i++ ) {
////		if ( this.stages[i].texture.cinematic ) {
////			this.stages[i].texture.cinematic.ResetTime( time );
////		}
////	}
////}

/*
=============
idMaterial::ConstantRegisters
=============
*/
	ConstantRegisters ( ): Float32Array {
		if ( !r_useConstantMaterials.GetBool ( ) ) {
			return null;
		}
		return this.constantRegisters;
	}

/*
==================
idMaterial::CheckForConstantRegisters

As of 5/2/03, about half of the unique materials loaded on typical
maps are constant, but 2/3 of the surface references are.
This is probably an optimization of dubious value.
==================
*/
///*static int	*/var c_constant=0, c_variable=0;
CheckForConstantRegisters():void {
	if ( !this.pd.registersAreConstant ) {
		return;
	}

	// evaluate the registers once, and save them 
	this.constantRegisters = new Float32Array( this.GetNumRegisters ( ) );

	var  shaderParms = new Float32Array(MAX_ENTITY_SHADER_PARMS);
	memset( shaderParms, 0, sizeof( shaderParms ) );
	var viewDef = new viewDef_t;

	this.EvaluateRegisters( this.constantRegisters, shaderParms, /*&*/viewDef, 0 );
}

/////*
////===================
////idMaterial::ImageName
////===================
////*/
////const char *idMaterial::ImageName( void ) const {
////	if ( this.numStages == 0 ) {
////		return "_scratch";
////	}
////	idImage	*image = this.stages[0].texture.image;
////	if ( image ) {
////		return image.imgName;
////	}
////	return "_scratch";
////}

/*
===================
idMaterial::SetImageClassifications

Just for image resource tracking.
===================
*/
	SetImageClassifications ( /*int*/ tag: number ): void {
		for ( var i = 0; i < this.numStages; i++ ) {
			var image = this.stages[i].texture.image;
			if ( image ) {
				image.SetClassification( tag );
			}
		}
	}

/////*
////=================
////idMaterial::Size
////=================
////*/
////size_t idMaterial::Size( void ) const {
////	return sizeof( idMaterial );
////}

/*
===================
idMaterial::SetDefaultText
===================
*/
	SetDefaultText ( ): boolean {
		// if there exists an image with the same name
		if ( 1 ) { //fileSystem.ReadFile( this.GetName(), NULL ) != -1 ) {
			var generated = new Uint8Array( 2048 );
			idStr.snPrintf( generated, sizeof( generated ),
				"material %s // IMPLICITLY GENERATED\n" +
				"{\n" +
				"{\n" +
				"blend blend\n" +
				"colored\n" +
				"map \"%s\"\n" +
				"clamp\n" +
				"}\n" +
				"}\n", this.GetName ( ), this.GetName ( ) );
			this.SetText( generated );
			return true;
		} else {
			return false;
		}
	}

/////*
////===================
////idMaterial::DefaultDefinition
////===================
////*/
////const char *idMaterial::DefaultDefinition() const {
////	return
////		"{\n"
////	"\t"	"{\n"
////	"\t\t"		"blend\tblend\n"
////	"\t\t"		"map\t\t_default\n"
////	"\t"	"}\n"
////		"}";
////}


/////*
////===================
////idMaterial::GetBumpStage
////===================
////*/
////const shaderStage_t *idMaterial::GetBumpStage( void ) const {
////	for ( int i = 0 ; i < this.numStages ; i++ ) {
////		if ( this.stages[i].lighting == stageLighting_t.SL_BUMP ) {
////			return &this.stages[i];
////		}
////	}
////	return NULL;
////}

/////*
////===================
////idMaterial::ReloadImages
////===================
////*/
////void idMaterial::ReloadImages( bool force ) const
////{
////	for ( int i = 0 ; i < this.numStages ; i++ ) {
////		if ( this.stages[i].newStage ) {
////			for ( int j = 0 ; j < this.stages[i].newStage.numFragmentProgramImages ; j++ ) {
////				if ( this.stages[i].newStage.fragmentProgramImages[j] ) {
////					this.stages[i].newStage.fragmentProgramImages[j].Reload( false, force );
////				}
////			}
////		} else if ( this.stages[i].texture.image ) {
////			this.stages[i].texture.image.Reload( false, force );
////		}
////	}
////}


//public:
//						idMaterial();
//	virtual				~idMaterial();

//	virtual size_t		Size( void ) const;
//	virtual bool		SetDefaultText( void );
//	virtual const char *DefaultDefinition( void ) const;
//	virtual bool		Parse( text:string, const int textLength );
//	virtual void		FreeData( void );
//	virtual void		Print( void ) const;

//	//BSM Nerve: Added for material editor
//	bool				Save( const char *fileName = NULL );

//						// returns the internal image name for stage 0, which can be used
//						// for the renderer CaptureRenderToImage() call
//						// I'm not really sure why this needs to be virtual...
//	virtual const char	*ImageName( void ) const;

//	void				ReloadImages( bool force ) const;

	// returns number of stages this material contains
	GetNumStages ( ): number { return this.numStages; }

	// get a specific stage
	GetStage( /*const int */index: number):shaderStage_t{ assert(index >= 0 && index < this.numStages); return this.stages[index]; }

//						// get the first bump map stage, or NULL if not present.
//						// used for bumpy-specular
//	const shaderStage_t *GetBumpStage( void ) const;

						// returns true if the material will draw anything at all.  Triggers, portals,
						// etc, will not have anything to draw.  A not drawn surface can still castShadow,
						// which can be used to make a simplified shadow hull for a complex object set
						// as noShadow
	IsDrawn(): boolean { return (this.numStages > 0 || this.entityGui != 0 || this.gui != null ); }

	// returns true if the material will draw any non light interaction stages
	HasAmbient(): boolean { return ( this.numAmbientStages > 0 ); }

	// returns true if material has a gui
	HasGui(): boolean { return (this.entityGui != 0 || this.gui != null ); }

	// returns true if the material will generate another view, either as
	// a mirror or dynamic rendered image
	HasSubview(): boolean { return this.hasSubview; }

	// returns true if the material will generate shadows, not making a
	// distinction between global and no-self shadows
	SurfaceCastsShadow(): boolean { return this.TestMaterialFlag(materialFlags_t.MF_FORCESHADOWS) || !this.TestMaterialFlag(materialFlags_t. MF_NOSHADOWS ); }

	// returns true if the material will generate interactions with fog/blend lights
	// All non-translucent surfaces receive fog unless they are explicitly noFog
	ReceivesFog(): boolean { return (this.IsDrawn() && !this.noFog && this.coverage != materialCoverage_t.MC_TRANSLUCENT ); }

	// returns true if the material will generate interactions with normal lights
	// Many special effect surfaces don't have any bump/diffuse/specular
	// stages, and don't interact with lights at all
	ReceivesLighting(): boolean { return this.numAmbientStages != this.numStages; }

	// returns true if the material should generate interactions on sides facing away
	// from light centers, as with noshadow and noselfshadow options
	ReceivesLightingOnBackSides(): boolean { return (this.materialFlags & (materialFlags_t.MF_NOSELFSHADOW | materialFlags_t.MF_NOSHADOWS) ) != 0; }

	// Standard two-sided triangle rendering won't work with bump map lighting, because
	// the normal and tangent vectors won't be correct for the back sides.  When two
	// sided lighting is desired. typically for alpha tested surfaces, this is
	// addressed by having CleanupModelSurfaces() create duplicates of all the triangles
	// with apropriate order reversal.
	ShouldCreateBackSides(): boolean { return this.shouldCreateBackSides; }

	// characters and models that are created by a complete renderbump can use a faster
	// method of tangent and normal vector generation than surfaces which have a flat
	// renderbump wrapped over them.
	UseUnsmoothedTangents( ):boolean { return this.unsmoothedTangents; }

	// by default, monsters can have blood overlays placed on them, but this can
	// be overrided on a per-material basis with the "noOverlays" material command.
	// This will always return false for translucent surfaces
	AllowOverlays(): boolean { return this.allowOverlays; }

	// MC_OPAQUE, MC_PERFORATED, or MC_TRANSLUCENT, for interaction list linking and
	// dmap flood filling
	// The depth buffer will not be filled for MC_TRANSLUCENT surfaces
	// FIXME: what do nodraw surfaces return?
	Coverage():materialCoverage_t { return this.coverage; }

	// returns true if this material takes precedence over other in coplanar cases
	HasHigherDmapPriority(other: idMaterial ):boolean { return ( this.IsDrawn() && !other.IsDrawn() ) ||
																						( this.Coverage() < other.Coverage() ); }

	// returns a idUserInterface if it has a global gui, or NULL if no gui
	GlobalGui ( ): idUserInterface { return this.gui; }

//						// a discrete surface will never be merged with other surfaces by dmap, which is
//						// necessary to prevent mutliple gui surfaces, mirrors, autosprites, and some other
//						// special effects from being combined into a single surface
//						// guis, merging sprites or other effects, mirrors and remote views are always discrete
//	bool				IsDiscrete(): boolean { return ( entityGui || gui || this.deform != deform_t.DFRM_NONE || this.sort == materialSort_t.SS_SUBVIEW ||
//												( surfaceFlags & SURF_DISCRETE ) != 0 ); }

//						// Normally, dmap chops each surface by every BSP boundary, then reoptimizes.
//						// For gigantic polygons like sky boxes, this can cause a huge number of planar
//						// triangles that make the optimizer take forever to turn back into a single
//						// triangle.  The "noFragment" option causes dmap to only break the polygons at
//						// area boundaries, instead of every BSP boundary.  This has the negative effect
//						// of not automatically fixing up interpenetrations, so when this is used, you
//						// should manually make the edges of your sky box exactly meet, instead of poking
//						// into each other.
//	bool				NoFragment(): boolean { return ( surfaceFlags & SURF_NOFRAGMENT ) != 0; }

//	//------------------------------------------------------------------
//	// light shader specific functions, only called for light entities

//						// lightshader option to fill with fog from viewer instead of light from center
//	bool				IsFogLight() const { return fogLight; }

//						// perform simple blending of the projection, instead of interacting with bumps and textures
//	bool				IsBlendLight() const { return blendLight; }

//						// an ambient light has non-directional bump mapping and no specular
//	bool				IsAmbientLight() const { return ambientLight; }

//						// implicitly no-shadows lights (ambients, fogs, etc) will never cast shadows
//						// but individual light entities can also override this value
//	bool				LightCastsShadows() const { return this.TestMaterialFlag( materialFlags_t.MF_FORCESHADOWS ) ||
//								( !fogLight && !ambientLight && !blendLight && !this.TestMaterialFlag( MF_NOSHADOWS ) ); }

//						// fog lights, blend lights, ambient lights, etc will all have to have interaction
//						// triangles generated for sides facing away from the light as well as those
//						// facing towards the light.  It is debatable if noshadow lights should effect back
//						// sides, making everything "noSelfShadow", but that would make noshadow lights
//						// potentially slower than normal lights, which detracts from their optimization
//						// ability, so they currently do not.
//	bool				LightEffectsBackSides() const { return fogLight || ambientLight || blendLight; }

//						// NULL unless an image is explicitly specified in the shader with "lightFalloffShader <image>"
//	idImage	*			LightFalloffImage() const { return lightFalloffImage; }

//	//------------------------------------------------------------------

	// returns the renderbump command line for this shader, or an empty string if not present
	GetRenderBump():string { return this.renderBump.data; }

	// set specific material flag(s)
	SetMaterialFlag ( /*const int */flag: number ): void { this.materialFlags |= flag; }

	// clear specific material flag(s)
	ClearMaterialFlag( /*int */flag:number ):void { this.materialFlags &= ~flag; }

	// test for existance of specific material flag(s)
	TestMaterialFlag( /*const int */flag:number ):boolean { return ( this.materialFlags & flag ) != 0; }

						// get content flags
	GetContentFlags( ):number { return this.contentFlags; }

							// get surface flags
	GetSurfaceFlags( ):number { return this.surfaceFlags; }

	// gets name for surface type (stone, metal, flesh, etc.)
	GetSurfaceType( ):surfTypes_t { return /*static_cast<surfTypes_t>*/( this.surfaceFlags & surfaceFlags_t.SURF_TYPE_MASK ); }

	// get material description
	GetDescription( ):string { return this.desc.data; }

	// get sort order
	GetSort( ):number { return this.sort; }
	// this is only used by the gui system to force sorting order
	// on images referenced from tga's instead of materials. 
	// this is done this way as there are 2000 tgas the guis use
	SetSort( /*float */s:number ):void { this.sort = s; }

	// DFRM_NONE, DFRM_SPRITE, etc
	Deform(): deform_t { return this.deform; }

	// flare size, expansion size, etc
	GetDeformRegister( /*int */index:number ):number { return this.deformRegisters[index]; }

	// particle system to emit from surface and table for turbulent
	GetDeformDecl( ):idDecl { return this.deformDecl; }

	// currently a surface can only have one unique texgen for all the stages
	//Texgen() const;

	// wobble sky parms
	GetTexGenRegisters( ) :Int32Array { return this.texGenRegisters; }

	// get cull type
	GetCullType( ):cullType_t { return this.cullType; }

	GetEditorAlpha( ):number { return this.editorAlpha; }

	GetEntityGui( ):number { return this.entityGui; }

	GetDecalInfo( ):decalInfo_t { return this.decalInfo; }
	
	// spectrums are used for "invisible writing" that can only be
	// illuminated by a light of matching spectrum
	Spectrum( ):number { return this.spectrum; }
	
	GetPolygonOffset( ):number { return this.polygonOffset; }
	
	GetSurfaceArea( ):number { return this.surfaceArea; }
	AddToSurfaceArea( /*float */area: number): void { this.surfaceArea += area; }


//	//------------------------------------------------------------------

//						// returns the length, in milliseconds, of the videoMap on this material,
//						// or zero if it doesn't have one
//	int					CinematicLength( void ) const;

//	void				CloseCinematic( void ) const;

//	void				ResetCinematicTime( /*int*/time:number ) const;

//	void				UpdateCinematic( /*int*/time:number ) const;

//	//------------------------------------------------------------------

//						// gets an image for the editor to use
//	idImage *			GetEditorImage( void ) const;
//	int					GetImageWidth( void ) const;
//	int					GetImageHeight( void ) const;

//	void				SetGui( const char *_gui ) const;

//						// just for resource tracking
//	void				SetImageClassifications( int tag ) const;

//------------------------------------------------------------------

// returns number of registers this material contains
GetNumRegisters():number { return this.numRegisters; }

//						// regs should point to a float array large enough to hold GetNumRegisters() floats
//	void				EvaluateRegisters( float *regs, const float entityParms[MAX_ENTITY_SHADER_PARMS], 
//											const struct viewDef_s *view, idSoundEmitter *soundEmitter = NULL ) const;

//						// if a material only uses constants (no entityParm or globalparm references), this
//						// will return a pointer to an internal table, and EvaluateRegisters will not need
//						// to be called.  If NULL is returned, EvaluateRegisters must be used.
//	const float *		ConstantRegisters() const;

	SuppressInSubview ( ): boolean { return this.suppressInSubview; }
	IsPortalSky ( ): boolean { return this.portalSky; }
//	void				AddReference();

////private:
////	// parse the entire material
////	void				CommonInit();
////	void				ParseMaterial( idLexer &src );
////	bool				MatchToken( idLexer &src, const char *match );
////	void				ParseSort( idLexer &src );
////	void				ParseBlend( idLexer &src, shaderStage_t *stage );
////	void				ParseVertexParm( idLexer &src, newShaderStage_t *newStage );
////	void				ParseFragmentMap( idLexer &src, newShaderStage_t *newStage );
////	void				ParseStage( idLexer &src, const textureRepeat_t trpDefault = textureRepeat_t.TR_REPEAT );
////	void				ParseDeform( idLexer &src );
////	void				ParseDecalInfo( idLexer &src );
////	bool				CheckSurfaceParm( idToken *token );
////	int					GetExpressionConstant( float f );
////	int					GetExpressionTemporary( void );
////	expOp_t	*			GetExpressionOp( void );
////	int					EmitOp( int a, int b, expOpType_t opType );
////	int					ParseEmitOp( idLexer &src, int a, expOpType_t opType, int priority );
////	int					ParseTerm( idLexer &src );
////	int					ParseExpressionPriority( idLexer &src, int priority );
////	int					ParseExpression( idLexer &src );
////	void				ClearStage( shaderStage_t *ss );
////	int					NameToSrcBlendMode( const idStr &name );
////	int					NameToDstBlendMode( const idStr &name );
////	void				MultiplyTextureMatrix( textureStage_t *ts, int registers[2][3] );	// FIXME: for some reason the const is bad for gcc and Mac
////	void				SortInteractionStages();
////	void				AddImplicitStages( const textureRepeat_t trpDefault = textureRepeat_t.TR_REPEAT );
////	void				CheckForConstantRegisters();

//private:
	desc = new idStr;				// description
	renderBump = new idStr;			// renderbump command options, without the "renderbump" at the start

	lightFalloffImage: idImage;

	/*int					*/entityGui:number;			// draw a gui with the idUserInterface from the renderEntity_t
											// non zero will draw gui, gui2, or gui3 from renderEnitty_t
	/*mutable idUserInterface	**/gui: idUserInterface;			// non-custom guis are shared by all users of a material

	noFog:boolean;				// surface does not create fog interactions

	/*int					*/spectrum:number;			// for invisible writing, used for both lights and surfaces

	/*float				*/polygonOffset:number;

	/*int					*/contentFlags:number;		// content flags
	/*int					*/surfaceFlags:number;		// surface flags
	/*mutable int			*/materialFlags: number;		// material flags

	decalInfo: decalInfo_t;


	/*mutable	float		*/sort:number;				// lower numbered shaders draw before higher numbered
	deform: deform_t;
	deformRegisters = new Int32Array(4);		// numeric parameter for deforms
	deformDecl: idDecl;			// for surface emitted particle deforms and tables

	texGenRegisters:Int32Array/*[MAX_TEXGEN_REGISTERS]*/;	// for wobbleSky

	coverage: materialCoverage_t;
	cullType: cullType_t;			// CT_FRONT_SIDED, CT_BACK_SIDED, or CT_TWO_SIDED
	shouldCreateBackSides:boolean;

	fogLight:boolean;
	blendLight:boolean;
	ambientLight:boolean;
	unsmoothedTangents:boolean;
	hasSubview:boolean;			// mirror, remote render, etc
	allowOverlays:boolean;

	/*int					*/numOps:number;
	/*expOp_t *			*/ops: expOp_t[];				// evaluate to make expressionRegisters

	/*int					*/numRegisters:number = 0;																			
	/*float *				*/expressionRegisters:Float32Array;

	/*float *				*/constantRegisters:Float32Array;	// NULL if ops ever reference globalParms or entityParms

	/*int					*/numStages:number = 0;
	/*int					*/numAmbientStages:number = 0;

	/*shaderStage_t *		*/stages: shaderStage_t[] ;

	/*struct mtrParsingData_s	**/pd: mtrParsingData_t;			// only used during parsing

	/*float				*/surfaceArea:number = 0;		// only for listSurfaceAreas

	// we defer loading of the editor image until it is asked for, so the game doesn't load up
	// all the invisible and uncompressed images.
	// If editorImage is NULL, it will atempt to load editorImageName, and set editorImage to that or defaultImage
	editorImageName = new idStr;
	/*mutable idImage *	*/editorImage:idImage;		// image used for non-shaded preview
	/*float				*/editorAlpha:number;

	/*bool				*/suppressInSubview:boolean;
	/*bool				*/portalSky:boolean;
	/*int					*/refCount:number = 0;
};




// info parms
class infoParm_t {
	name: string;
	/*int		*/clearSolid: number; surfaceFlags: number; contents: number;

	constructor ( name: string, clearSolid: number, surfaceFlags: number, contents: number ) {
		this.name = name;
		this.clearSolid = clearSolid;
		this.surfaceFlags = surfaceFlags;
		this.contents = contents;
	}
};

var infoParms: infoParm_t[] = [
	// game relevant attributes
	new infoParm_t( "solid", 0, 0, contentsFlags_t.CONTENTS_SOLID ), // may need to override a clearSolid
	new infoParm_t( "water", 1, 0, contentsFlags_t.CONTENTS_WATER ), // used for water
	new infoParm_t( "playerclip", 0, 0, contentsFlags_t.CONTENTS_PLAYERCLIP ), // solid to players
	new infoParm_t( "monsterclip", 0, 0, contentsFlags_t.CONTENTS_MONSTERCLIP ), // solid to monsters
	new infoParm_t( "moveableclip", 0, 0, contentsFlags_t.CONTENTS_MOVEABLECLIP ), // solid to moveable entities
	new infoParm_t( "ikclip", 0, 0, contentsFlags_t.CONTENTS_IKCLIP ), // solid to IK
	new infoParm_t( "blood", 0, 0, contentsFlags_t.CONTENTS_BLOOD ), // used to detect blood decals
	new infoParm_t( "trigger", 0, 0, contentsFlags_t.CONTENTS_TRIGGER ), // used for triggers
	new infoParm_t( "aassolid", 0, 0, contentsFlags_t.CONTENTS_AAS_SOLID ), // solid for AAS
	new infoParm_t( "aasobstacle", 0, 0, contentsFlags_t.CONTENTS_AAS_OBSTACLE ), // used to compile an obstacle into AAS that can be enabled/disabled
	new infoParm_t( "flashlight_trigger", 0, 0, contentsFlags_t.CONTENTS_FLASHLIGHT_TRIGGER ), // used for triggers that are activated by the flashlight
	new infoParm_t( "nonsolid", 1, 0, 0 ), // clears the solid flag
	new infoParm_t("nullNormal", 0, surfaceFlags_t.SURF_NULLNORMAL, 0 ), // renderbump will draw as 0x80 0x80 0x80

	// utility relevant attributes
	new infoParm_t( "areaportal", 1, 0, contentsFlags_t.CONTENTS_AREAPORTAL ), // divides areas
	new infoParm_t( "qer_nocarve", 1, 0, contentsFlags_t.CONTENTS_NOCSG ), // don't cut brushes in editor
	new infoParm_t("discrete", 1, surfaceFlags_t.SURF_DISCRETE, 0 ), // surfaces should not be automatically merged together or
	// clipped to the world,
	// because they represent discrete objects like gui shaders
	// mirrors, or autosprites
	new infoParm_t("noFragment", 0, surfaceFlags_t.SURF_NOFRAGMENT, 0 ),
	new infoParm_t("slick", 0, surfaceFlags_t.SURF_SLICK, 0 ),
	new infoParm_t("collision", 0, surfaceFlags_t.SURF_COLLISION, 0 ),
	new infoParm_t("noimpact", 0, surfaceFlags_t.SURF_NOIMPACT, 0 ), // don't make impact explosions or marks
	new infoParm_t("nodamage", 0, surfaceFlags_t.SURF_NODAMAGE, 0 ), // no falling damage when hitting
	new infoParm_t("ladder", 0, surfaceFlags_t.SURF_LADDER, 0 ), // climbable
	new infoParm_t("nosteps", 0, surfaceFlags_t.SURF_NOSTEPS, 0 ), // no footsteps

	// material types for particle, sound, footstep feedback
	new infoParm_t( "metal", 0, surfTypes_t.SURFTYPE_METAL, 0 ), // metal
	new infoParm_t( "stone", 0, surfTypes_t.SURFTYPE_STONE, 0 ), // stone
	new infoParm_t( "flesh", 0, surfTypes_t.SURFTYPE_FLESH, 0 ), // flesh
	new infoParm_t( "wood", 0, surfTypes_t.SURFTYPE_WOOD, 0 ), // wood
	new infoParm_t( "cardboard", 0, surfTypes_t.SURFTYPE_CARDBOARD, 0 ), // cardboard
	new infoParm_t( "liquid", 0, surfTypes_t.SURFTYPE_LIQUID, 0 ), // liquid
	new infoParm_t( "glass", 0, surfTypes_t.SURFTYPE_GLASS, 0 ), // glass
	new infoParm_t( "plastic", 0, surfTypes_t.SURFTYPE_PLASTIC, 0 ), // plastic
	new infoParm_t( "ricochet", 0, surfTypes_t.SURFTYPE_RICOCHET, 0 ), // behaves like metal but causes a ricochet sound

	// unassigned surface types
	new infoParm_t("surftype10", 0, surfTypes_t.SURFTYPE_10, 0),
	new infoParm_t("surftype11", 0, surfTypes_t.SURFTYPE_11, 0),
	new infoParm_t("surftype12", 0, surfTypes_t.SURFTYPE_12, 0),
	new infoParm_t("surftype13", 0, surfTypes_t.SURFTYPE_13, 0),
	new infoParm_t("surftype14", 0, surfTypes_t.SURFTYPE_14, 0),
	new infoParm_t("surftype15", 0, surfTypes_t.SURFTYPE_15, 0 )
];

var numInfoParms = infoParms.length;