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
////
////#include "../../../idlib/precompiled.h"
////#pragma hdrstop
////
////#include "AASFile.h"
////#include "AASFile_local.h"
////
////
/////*
////===============================================================================
////
////	idReachability
////
////===============================================================================
////*/
////
/////*
////================
////Reachability_Write
////================
////*/
////bool Reachability_Write( idFile *fp, idReachability *reach ) {
////	fp.WriteFloatString( "\t\t%d %d (%f %f %f) (%f %f %f) %d %d",
////				(int) reach.travelType, (int) reach.toAreaNum, reach.start.x, reach.start.y, reach.start.z,
////				reach.end.x, reach.end.y, reach.end.z, reach.edgeNum, (int) reach.travelTime );
////	return true;
////}

/*
================
Reachability_Read
================
*/
function Reachability_Read ( src: idLexer, reach: idReachability ): boolean {
	reach.travelType = src.ParseInt ( );
	reach.toAreaNum = src.ParseInt ( );
	src.Parse1DMatrix( 3, reach.start.ToFloatPtr ( ) );
	src.Parse1DMatrix( 3, reach.end.ToFloatPtr ( ) );
	reach.edgeNum = src.ParseInt ( );
	reach.travelTime = src.ParseInt ( );
	return true;
}

////
/////*
////===============================================================================
////
////	idReachability_Special
////
////===============================================================================
////*/
////
/////*
////================
////Reachability_Special_Write
////================
////*/
////bool Reachability_Special_Write( idFile *fp, idReachability_Special *reach ) {
////	var/*int*/i:number;
////	const idKeyValue *keyValue;
////
////	fp.WriteFloatString( "\n\t\t{\n" );
////	for ( i = 0; i < reach.dict.GetNumKeyVals(); i++ ) {
////		keyValue = reach.dict.GetKeyVal( i );
////		fp.WriteFloatString( "\t\t\t\"%s\" \"%s\"\n", keyValue.GetKey().c_str(), keyValue.GetValue().c_str() );
////	}
////	fp.WriteFloatString( "\t\t}\n" );
////
////	return true;
////}
////
/*
================
Reachability_Special_Read
================
*/
function Reachability_Special_Read ( src: idLexer, reach: idReachability_Special ): boolean {
	var key = new idToken, value = new idToken;

	src.ExpectTokenString( "{" );
	while ( src.ReadToken( key ) ) {
		if ( key.data == "}" ) {
			return true;
		}
		src.ExpectTokenType( TT_STRING, 0, value );
		reach.dict.Set( key.data, value.data );
	}
	return false;
}

/////*
////===============================================================================
////
////	idAASSettings
////
////===============================================================================
////*/
//settings
class idAASSettings {
	//public:
	// collision settings
	numBoundingBoxes: number/*int*/;
	boundingBoxes = newStructArray<idBounds>(idBounds, MAX_AAS_BOUNDING_BOXES);
	usePatches: boolean;
	writeBrushMap: boolean;
	playerFlood: boolean;
	noOptimize: boolean;
	allowSwimReachabilities: boolean;
	allowFlyReachabilities: boolean;
	fileExtension = new idStr;
	// physics settings
	gravity = new idVec3;
	gravityDir = new idVec3;
	invGravityDir = new idVec3;
	gravityValue: number/*float*/;
	maxStepHeight: number/*float*/;
	maxBarrierHeight: number/*float*/;
	maxWaterJumpHeight: number/*float*/;
	maxFallHeight: number/*float*/;
	minFloorCos: number/*float*/;
	// fixed travel times
	tt_barrierJump: number/*int*/;
	tt_startCrouching: number/*int*/;
	tt_waterJump: number/*int*/;
	tt_startWalkOffLedge: number/*int*/;

	//public:
	//								idAASSettings( );

	//	bool						FromFile( const idStr &fileName );
	//	bool						FromParser( idLexer &src );
	//	bool						FromDict( const char *name, const idDict *dict );
	//	bool						WriteToFile( idFile *fp ) const;
	//	bool						ValidForBounds( const idBounds &bounds ) const;
	//	bool						ValidEntity( const char *classname ) const;

	//private:
	//	bool						ParseBool( idLexer &src, bool &b );
	//	bool						ParseInt( idLexer &src, int &i );
	//	bool						ParseFloat( idLexer &src, float &f );
	//	bool						ParseVector( idLexer &src, idVec3 &vec );
	//	bool						ParseBBoxes( idLexer &src );

/*
============
idAASSettings::idAASSettings
============
*/
	constructor ( ) {
		this.numBoundingBoxes = 1;
		this.boundingBoxes[0].opEquals( new idBounds( new idVec3( -16, -16, 0 ), new idVec3( 16, 16, 72 ) ) );
		this.usePatches = false;
		this.writeBrushMap = false;
		this.playerFlood = false;
		this.noOptimize = false;
		this.allowSwimReachabilities = false;
		this.allowFlyReachabilities = false;
		this.fileExtension.equals( "aas48" );
		// physics settings
		this.gravity.equals( new idVec3( 0, 0, -1066 ) );
		this.gravityDir.equals( this.gravity );
		this.gravityValue = this.gravityDir.Normalize ( );
		this.invGravityDir = this.gravityDir.opUnaryMinus ( );
		this.maxStepHeight = 14.0;
		this.maxBarrierHeight = 32.0;
		this.maxWaterJumpHeight = 20.0;
		this.maxFallHeight = 64.0;
		this.minFloorCos = 0.7;
		// fixed travel times
		this.tt_barrierJump = 100;
		this.tt_startCrouching = 100;
		this.tt_waterJump = 100;
		this.tt_startWalkOffLedge = 100;
	}

/*
============
idAASSettings::ParseBool
============
*/
	ParseBool(src: idLexer, b:R<boolean>): boolean {
	if ( !src.ExpectTokenString( "=" ) ) {
		return false;
	}
	b.$ = src.ParseBool();
	return true;
}

/*
============
idAASSettings::ParseInt
============
*/
ParseInt( src:idLexer, /*int*/ i :R<number>):boolean {
	if ( !src.ExpectTokenString( "=" ) ) {
		return false;
	}
	i.$ = src.ParseInt();
	return true;
}

/*
============
idAASSettings::ParseFloat
============
*/
	ParseFloat(src: idLexer, f: R<number>/*float*/): boolean {
	if ( !src.ExpectTokenString( "=" ) ) {
		return false;
	}
		f.$= src.ParseFloat();
	return true;
}

/*
============
idAASSettings::ParseVector
============
*/
	ParseVector(src: idLexer, vec: idVec3): boolean {
	if ( !src.ExpectTokenString( "=" ) ) {
		return false;
	}
	return ( src.Parse1DMatrix( 3, vec.ToFloatPtr() ) != 0 );
}

/*
============
idAASSettings::ParseBBoxes
============
*/
ParseBBoxes( src:idLexer ):boolean {
	var token = new idToken ;
	var bounds = new idBounds ;

	this.numBoundingBoxes = 0;

	if ( !src.ExpectTokenString( "{" ) ) {
		return false;
	}
	while( src.ReadToken( token ) ) {
		if ( token.data == "}" ) {
			return true;
		}
		src.UnreadToken( token );
		src.Parse1DMatrix( 3, bounds[0].ToFloatPtr() );
		if ( !src.ExpectTokenString( "-" ) ) {
			return false;
		}
		src.Parse1DMatrix( 3, bounds[1].ToFloatPtr() );

		this.boundingBoxes[this.numBoundingBoxes++] = bounds;
	}
	return false;
}

/*
============
idAASSettings::FromParser
============
*/
	FromParser ( src: idLexer ): boolean {
		var token = new idToken;

		if ( !src.ExpectTokenString( "{" ) ) {
			return false;
		}

		// parse the file
		while ( 1 ) {
			if ( !src.ReadToken( token ) ) {
				break;
			}

			if ( token.data == "}" ) {
				break;
			}

			if ( token.data == "bboxes" ) {
				if ( !this.ParseBBoxes( src ) ) {
					return false;
				}
			} else if ( token.data == "usePatches" ) {
				var $usePatches = new R( this.usePatches );
				if ( !this.ParseBool( src, $usePatches ) ) {
					return false;
				}
				this.usePatches = $usePatches.$;
			} else if ( token.data == "writeBrushMap" ) {
				var $writeBrushMap = new R( this.writeBrushMap );
				if ( !this.ParseBool( src, $writeBrushMap ) ) {
					return false;
				}
				this.writeBrushMap = $writeBrushMap.$;
			} else if ( token.data == "playerFlood" ) {
				var $playerFlood = new R( this.playerFlood );
				if ( !this.ParseBool( src, $playerFlood ) ) {
					return false;
				}
				this.playerFlood = $playerFlood.$;
			} else if ( token.data == "allowSwimReachabilities" ) {
				var $allowSwimReachabilities = new R( this.allowSwimReachabilities );
				if ( !this.ParseBool( src, $allowSwimReachabilities ) ) {
					return false;
				}
				this.allowSwimReachabilities = $allowSwimReachabilities.$;
			} else if ( token.data == "allowFlyReachabilities" ) {
				var $allowFlyReachabilities = new R( this.allowFlyReachabilities );
				if ( !this.ParseBool( src, $allowFlyReachabilities ) ) {
					return false;
				}
				this.allowFlyReachabilities = $allowFlyReachabilities.$;
			} else if ( token.data == "fileExtension" ) {
				src.ExpectTokenString( "=" );
				src.ExpectTokenType( TT_STRING, 0, token );
				this.fileExtension.equals( token );
			} else if ( token.data == "gravity" ) {
				this.ParseVector( src, this.gravity );
				this.gravityDir.equals( this.gravity );
				this.gravityValue = this.gravityDir.Normalize ( );
				this.invGravityDir.equals( this.gravityDir.opUnaryMinus ( ) );
			} else if ( token.data == "maxStepHeight" ) {
				var $maxStepHeight = new R( this.maxStepHeight );
				if ( !this.ParseFloat( src, $maxStepHeight ) ) {
					return false;
				}
				this.maxStepHeight = $maxStepHeight.$;
			} else if ( token.data == "maxBarrierHeight" ) {
				var $maxBarrierHeight = new R( this.maxBarrierHeight );
				if ( !this.ParseFloat( src, $maxBarrierHeight ) ) {
					return false;
				}
				this.maxBarrierHeight = $maxBarrierHeight.$;
			} else if ( token.data == "maxWaterJumpHeight" ) {
				var $maxWaterJumpHeight = new R( this.maxWaterJumpHeight );
				if ( !this.ParseFloat( src, $maxWaterJumpHeight ) ) {
					return false;
				}
				this.maxWaterJumpHeight = $maxWaterJumpHeight.$;
			} else if ( token.data == "maxFallHeight" ) {
				var $maxFallHeight = new R( this.maxFallHeight );
				if ( !this.ParseFloat( src, $maxFallHeight ) ) {
					return false;
				}
				this.maxFallHeight = $maxFallHeight.$;
			} else if ( token.data == "minFloorCos" ) {
				var $minFloorCos = new R( this.minFloorCos );
				if ( !this.ParseFloat( src, $minFloorCos ) ) {
					return false;
				}
				this.minFloorCos = $minFloorCos.$;
			} else if ( token.data == "tt_barrierJump" ) {
				var $tt_barrierJump = new R( this.tt_barrierJump );
				if ( !this.ParseInt( src, $tt_barrierJump ) ) {
					return false;
				}
				this.tt_barrierJump = $tt_barrierJump.$;
			} else if ( token.data == "tt_startCrouching" ) {
				var $tt_startCrouching = new R( this.tt_startCrouching );
				if ( !this.ParseInt( src, $tt_startCrouching ) ) {
					return false;
				}
				this.tt_startCrouching = $tt_startCrouching.$;
			} else if ( token.data == "tt_waterJump" ) {
				var $tt_waterJump = new R( this.tt_waterJump );
				if ( !this.ParseInt( src, $tt_waterJump ) ) {
					return false;
				}
				this.tt_waterJump = $tt_waterJump.$;
			} else if ( token.data == "tt_startWalkOffLedge" ) {
				var $tt_startWalkOffLedge = new R( this.tt_startWalkOffLedge );
				if ( !this.ParseInt( src, $tt_startWalkOffLedge ) ) {
					return false;
				}
				this.tt_startWalkOffLedge = $tt_startWalkOffLedge.$;
			} else {
				src.Error( "invalid token '%s'", token.c_str ( ) );
			}
		}

		if ( this.numBoundingBoxes <= 0 ) {
			src.Error( "no valid bounding box" );
		}

		return true;
	}

/////*
////============
////idAASSettings::FromFile
////============
////*/
////FromFile( const idStr &fileName ):boolean {
////	idLexer src( LEXFL_ALLOWPATHNAMES | LEXFL_NOSTRINGESCAPECHARS | LEXFL_NOSTRINGCONCAT );
////	idStr name;
////
////	name = fileName;
////
////	common.Printf( "loading %s\n", name.c_str() );
////
////	if ( !src.LoadFile( name ) ) {
////		common.Error( "WARNING: couldn't load %s\n", name.c_str() );
////		return false;
////	}
////
////	if ( !src.ExpectTokenString( "settings" ) ) {
////		common.Error( "%s is not a settings file", name.c_str() );
////		return false;
////	}
////
////	if ( !FromParser( src ) ) {
////		common.Error( "failed to parse %s", name.c_str() );
////		return false;
////	}
////
////	return true;
////}
////
/////*
////============
////idAASSettings::FromDict
////============
////*/
////FromDict( const char *name, const idDict *dict ):boolean {
////	idBounds bounds;
////
////	if ( !dict.GetVector( "mins", "0 0 0", bounds[ 0 ] ) ) {
////		common.Error( "Missing 'mins' in entityDef '%s'", name );
////	}
////	if ( !dict.GetVector( "maxs", "0 0 0", bounds[ 1 ] ) ) {
////		common.Error( "Missing 'maxs' in entityDef '%s'", name );
////	}
////
////	this.numBoundingBoxes = 1;
////	this.boundingBoxes[0] = bounds;
////
////	if ( !dict.GetBool( "usePatches", "0", usePatches ) ) {
////		common.Error( "Missing 'usePatches' in entityDef '%s'", name );
////	}
////
////	if ( !dict.GetBool( "writeBrushMap", "0", writeBrushMap ) ) {
////		common.Error( "Missing 'writeBrushMap' in entityDef '%s'", name );
////	}
////
////	if ( !dict.GetBool( "playerFlood", "0", playerFlood ) ) {
////		common.Error( "Missing 'playerFlood' in entityDef '%s'", name );
////	}
////
////	if ( !dict.GetBool( "allowSwimReachabilities", "0", allowSwimReachabilities ) ) {
////		common.Error( "Missing 'allowSwimReachabilities' in entityDef '%s'", name );
////	}
////
////	if ( !dict.GetBool( "allowFlyReachabilities", "0", allowFlyReachabilities ) ) {
////		common.Error( "Missing 'allowFlyReachabilities' in entityDef '%s'", name );
////	}
////
////	if ( !dict.GetString( "fileExtension", "", fileExtension ) ) {
////		common.Error( "Missing 'fileExtension' in entityDef '%s'", name );
////	}
////
////	if ( !dict.GetVector( "gravity", "0 0 -1066", this.gravity ) ) {
////		common.Error( "Missing 'gravity' in entityDef '%s'", name );
////	}
////	this.gravityDir.equals( this.gravity);
////	gravityValue = this.gravityDir.Normalize();
////	invGravityDir = -this.gravityDir;
////
////	if ( !dict.GetFloat( "maxStepHeight", "0", maxStepHeight ) ) {
////		common.Error( "Missing 'maxStepHeight' in entityDef '%s'", name );
////	}
////
////	if ( !dict.GetFloat( "maxBarrierHeight", "0", maxBarrierHeight ) ) {
////		common.Error( "Missing 'maxBarrierHeight' in entityDef '%s'", name );
////	}
////
////	if ( !dict.GetFloat( "maxWaterJumpHeight", "0", maxWaterJumpHeight ) ) {
////		common.Error( "Missing 'maxWaterJumpHeight' in entityDef '%s'", name );
////	}
////
////	if ( !dict.GetFloat( "maxFallHeight", "0", maxFallHeight ) ) {
////		common.Error( "Missing 'maxFallHeight' in entityDef '%s'", name );
////	}
////
////	if ( !dict.GetFloat( "minFloorCos", "0", minFloorCos ) ) {
////		common.Error( "Missing 'minFloorCos' in entityDef '%s'", name );
////	}
////
////	if ( !dict.GetInt( "tt_barrierJump", "0", tt_barrierJump ) ) {
////		common.Error( "Missing 'tt_barrierJump' in entityDef '%s'", name );
////	}
////
////	if ( !dict.GetInt( "tt_startCrouching", "0", tt_startCrouching ) ) {
////		common.Error( "Missing 'tt_startCrouching' in entityDef '%s'", name );
////	}
////
////	if ( !dict.GetInt( "tt_waterJump", "0", tt_waterJump ) ) {
////		common.Error( "Missing 'tt_waterJump' in entityDef '%s'", name );
////	}
////
////	if ( !dict.GetInt( "tt_startWalkOffLedge", "0", tt_startWalkOffLedge ) ) {
////		common.Error( "Missing 'tt_startWalkOffLedge' in entityDef '%s'", name );
////	}
////
////	return true;
////}
////
////
/////*
////============
////idAASSettings::WriteToFile
////============
////*/
////WriteToFile( idFile *fp ) :boolean {
////	var/*int*/i:number;
////
////	fp.WriteFloatString( "{\n" );
////	fp.WriteFloatString( "\tbboxes\n\t{\n" );
////	for ( i = 0; i < this.numBoundingBoxes; i++ ) {
////		fp.WriteFloatString( "\t\t(%f %f %f)-(%f %f %f)\n", this.boundingBoxes[i][0].x, this.boundingBoxes[i][0].y,
////						this.boundingBoxes[i][0].z, this.boundingBoxes[i][1].x, this.boundingBoxes[i][1].y, this.boundingBoxes[i][1].z );
////	}
////	fp.WriteFloatString( "\t}\n" );
////	fp.WriteFloatString( "\tusePatches = %d\n", usePatches );
////	fp.WriteFloatString( "\twriteBrushMap = %d\n", writeBrushMap );
////	fp.WriteFloatString( "\tplayerFlood = %d\n", playerFlood );
////	fp.WriteFloatString( "\tallowSwimReachabilities = %d\n", allowSwimReachabilities );
////	fp.WriteFloatString( "\tallowFlyReachabilities = %d\n", allowFlyReachabilities );
////	fp.WriteFloatString( "\tfileExtension = \"%s\"\n", fileExtension.c_str() );
////	fp.WriteFloatString( "\tgravity = (%f %f %f)\n", this.gravity.x, this.gravity.y, this.gravity.z );
////	fp.WriteFloatString( "\tmaxStepHeight = %f\n", maxStepHeight );
////	fp.WriteFloatString( "\tmaxBarrierHeight = %f\n", maxBarrierHeight );
////	fp.WriteFloatString( "\tmaxWaterJumpHeight = %f\n", maxWaterJumpHeight );
////	fp.WriteFloatString( "\tmaxFallHeight = %f\n", maxFallHeight );
////	fp.WriteFloatString( "\tminFloorCos = %f\n", minFloorCos );
////	fp.WriteFloatString( "\ttt_barrierJump = %d\n", tt_barrierJump );
////	fp.WriteFloatString( "\ttt_startCrouching = %d\n", tt_startCrouching );
////	fp.WriteFloatString( "\ttt_waterJump = %d\n", tt_waterJump );
////	fp.WriteFloatString( "\ttt_startWalkOffLedge = %d\n", tt_startWalkOffLedge );
////	fp.WriteFloatString( "}\n" );
////	return true;
////}
////
/////*
////============
////idAASSettings::ValidForBounds
////============
////*/
////ValidForBounds( const idBounds &bounds ) :boolean {
////	var/*int*/i:number;
////
////	for ( i = 0; i < 3; i++ ) {
////		if ( bounds[0][i] < this.boundingBoxes[0][0][i] ) {
////			return false;
////		}
////		if ( bounds[1][i] > this.boundingBoxes[0][1][i] ) {
////			return false;
////		}
////	}
////	return true;
////}
////
/////*
////============
////idAASSettings::ValidEntity
////============
////*/
////ValidEntity( const char *classname ) :boolean {
////	idStr			use_aas;
////	idVec3			size;
////	idBounds		bounds;
////
////	if ( playerFlood ) {
////		if ( !strcmp( classname, "info_player_start" ) || !strcmp( classname , "info_player_deathmatch" ) || !strcmp( classname, "func_teleporter" ) ) {
////			return true;
////		}
////	}
////
////	const idDeclEntityDef *decl = static_cast<const idDeclEntityDef *>( declManager.FindType( DECL_ENTITYDEF, classname, false ) );
////	if ( decl && decl.dict.GetString( "use_aas", NULL, use_aas ) && !fileExtension.Icmp( use_aas ) ) {
////		if ( decl.dict.GetVector( "mins", NULL, bounds[0] ) ) {
////			decl.dict.GetVector( "maxs", NULL, bounds[1] );
////		} else if ( decl.dict.GetVector( "size", NULL, size ) ) {
////			bounds[ 0 ].Set( size.x * -0.5, size.y * -0.5, 0.0 );
////			bounds[ 1 ].Set( size.x * 0.5, size.y * 0.5, size.z );
////		}
////
////		if ( !ValidForBounds( bounds ) ) {
////			common.Error( "%s cannot use %s\n", classname, fileExtension.c_str() );
////		}
////
////		return true;
////	}
////
////	return false;
////}
////

};
