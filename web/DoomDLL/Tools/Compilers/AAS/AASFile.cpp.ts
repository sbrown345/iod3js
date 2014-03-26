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
////	fp->WriteFloatString( "\t\t%d %d (%f %f %f) (%f %f %f) %d %d",
////				(int) reach->travelType, (int) reach->toAreaNum, reach->start.x, reach->start.y, reach->start.z,
////				reach->end.x, reach->end.y, reach->end.z, reach->edgeNum, (int) reach->travelTime );
////	return true;
////}
////
/////*
////================
////Reachability_Read
////================
////*/
////bool Reachability_Read( idLexer &src, idReachability *reach ) {
////	reach->travelType = src.ParseInt();
////	reach->toAreaNum = src.ParseInt();
////	src.Parse1DMatrix( 3, reach->start.ToFloatPtr() );
////	src.Parse1DMatrix( 3, reach->end.ToFloatPtr() );
////	reach->edgeNum = src.ParseInt();
////	reach->travelTime = src.ParseInt();
////	return true;
////}
////
/////*
////================
////idReachability::CopyBase
////================
////*/
////void idReachability::CopyBase( idReachability &reach ) {
////	travelType = reach.travelType;
////	toAreaNum = reach.toAreaNum;
////	start = reach.start;
////	end = reach.end;
////	edgeNum = reach.edgeNum;
////	travelTime = reach.travelTime;
////}
////
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
////	int i;
////	const idKeyValue *keyValue;
////
////	fp->WriteFloatString( "\n\t\t{\n" );
////	for ( i = 0; i < reach->dict.GetNumKeyVals(); i++ ) {
////		keyValue = reach->dict.GetKeyVal( i );
////		fp->WriteFloatString( "\t\t\t\"%s\" \"%s\"\n", keyValue->GetKey().c_str(), keyValue->GetValue().c_str() );
////	}
////	fp->WriteFloatString( "\t\t}\n" );
////
////	return true;
////}
////
/////*
////================
////Reachability_Special_Read
////================
////*/
////bool Reachability_Special_Read( idLexer &src, idReachability_Special *reach ) {
////	idToken key, value;
////
////	src.ExpectTokenString( "{" );
////	while( src.ReadToken( &key ) ) {
////		if ( key == "}" ) {
////			return true;
////		}
////		src.ExpectTokenType( TT_STRING, 0, &value );
////		reach->dict.Set( key, value );
////	}
////	return false;
////}
////
/////*
////===============================================================================
////
////	idAASSettings
////
////===============================================================================
////*/
////
/////*
////============
////idAASSettings::idAASSettings
////============
////*/
////idAASSettings::idAASSettings( void ) {
////	numBoundingBoxes = 1;
////	boundingBoxes[0] = idBounds( idVec3( -16, -16, 0 ), idVec3( 16, 16, 72 ) );
////	usePatches = false;
////	writeBrushMap = false;
////	playerFlood = false;
////	noOptimize = false;
////	allowSwimReachabilities = false;
////	allowFlyReachabilities = false;
////	fileExtension = "aas48";
////	// physics settings
////	gravity = idVec3( 0, 0, -1066 );
////	gravityDir = gravity;
////	gravityValue = gravityDir.Normalize();
////	invGravityDir = -gravityDir;
////	maxStepHeight = 14.0f;
////	maxBarrierHeight = 32.0f;
////	maxWaterJumpHeight = 20.0f;
////	maxFallHeight = 64.0f;
////	minFloorCos = 0.7f;
////	// fixed travel times
////	tt_barrierJump = 100;
////	tt_startCrouching = 100;
////	tt_waterJump = 100;
////	tt_startWalkOffLedge = 100;
////}
////
/////*
////============
////idAASSettings::ParseBool
////============
////*/
////bool idAASSettings::ParseBool( idLexer &src, bool &b ) {
////	if ( !src.ExpectTokenString( "=" ) ) {
////		return false;
////	}
////	b = src.ParseBool();
////	return true;
////}
////
/////*
////============
////idAASSettings::ParseInt
////============
////*/
////bool idAASSettings::ParseInt( idLexer &src, int &i ) {
////	if ( !src.ExpectTokenString( "=" ) ) {
////		return false;
////	}
////	i = src.ParseInt();
////	return true;
////}
////
/////*
////============
////idAASSettings::ParseFloat
////============
////*/
////bool idAASSettings::ParseFloat( idLexer &src, float &f ) {
////	if ( !src.ExpectTokenString( "=" ) ) {
////		return false;
////	}
////	f = src.ParseFloat();
////	return true;
////}
////
/////*
////============
////idAASSettings::ParseVector
////============
////*/
////bool idAASSettings::ParseVector( idLexer &src, idVec3 &vec ) {
////	if ( !src.ExpectTokenString( "=" ) ) {
////		return false;
////	}
////	return ( src.Parse1DMatrix( 3, vec.ToFloatPtr() ) != 0 );
////}
////
/////*
////============
////idAASSettings::ParseBBoxes
////============
////*/
////bool idAASSettings::ParseBBoxes( idLexer &src ) {
////	idToken token;
////	idBounds bounds;
////
////	numBoundingBoxes = 0;
////
////	if ( !src.ExpectTokenString( "{" ) ) {
////		return false;
////	}
////	while( src.ReadToken( &token ) ) {
////		if ( token == "}" ) {
////			return true;
////		}
////		src.UnreadToken( &token );
////		src.Parse1DMatrix( 3, bounds[0].ToFloatPtr() );
////		if ( !src.ExpectTokenString( "-" ) ) {
////			return false;
////		}
////		src.Parse1DMatrix( 3, bounds[1].ToFloatPtr() );
////
////		boundingBoxes[numBoundingBoxes++] = bounds;
////	}
////	return false;
////}
////
/////*
////============
////idAASSettings::FromParser
////============
////*/
////bool idAASSettings::FromParser( idLexer &src ) {
////	idToken token;
////
////	if ( !src.ExpectTokenString( "{" ) ) {
////		return false;
////	}
////
////	// parse the file
////	while ( 1 ) {
////		if ( !src.ReadToken( &token ) ) {
////			break;
////		}
////
////		if ( token == "}" ) {
////			break;
////		}
////
////		if ( token == "bboxes" ) {
////			if ( !ParseBBoxes( src ) ) { return false; }
////		}
////		else if ( token == "usePatches" ) {
////			if ( !ParseBool( src, usePatches ) ) { return false; }
////		}
////		else if ( token == "writeBrushMap" ) {
////			if ( !ParseBool( src, writeBrushMap ) ) { return false; }
////		}
////		else if ( token == "playerFlood" ) {
////			if ( !ParseBool( src, playerFlood ) ) { return false; }
////		}
////		else if ( token == "allowSwimReachabilities" ) {
////			if ( !ParseBool( src, allowSwimReachabilities ) ) { return false; }
////		}
////		else if ( token == "allowFlyReachabilities" ) {
////			if ( !ParseBool( src, allowFlyReachabilities ) ) { return false; }
////		}
////		else if ( token == "fileExtension" ) {
////			src.ExpectTokenString( "=" );
////			src.ExpectTokenType( TT_STRING, 0, &token );
////			fileExtension = token;
////		}
////		else if ( token == "gravity" ) {
////			ParseVector( src, gravity );
////			gravityDir = gravity;
////			gravityValue = gravityDir.Normalize();
////			invGravityDir = -gravityDir;
////		}
////		else if ( token == "maxStepHeight" ) {
////			if ( !ParseFloat( src, maxStepHeight ) ) { return false; }
////		}
////		else if ( token == "maxBarrierHeight" ) {
////			if ( !ParseFloat( src, maxBarrierHeight ) ) { return false; }
////		}
////		else if ( token == "maxWaterJumpHeight" ) {
////			if ( !ParseFloat( src, maxWaterJumpHeight ) ) { return false; }
////		}
////		else if ( token == "maxFallHeight" ) {
////			if ( !ParseFloat( src, maxFallHeight ) ) { return false; }
////		}
////		else if ( token == "minFloorCos" ) {
////			if ( !ParseFloat( src, minFloorCos ) ) { return false; }
////		}
////		else if ( token == "tt_barrierJump" ) {
////			if ( !ParseInt( src, tt_barrierJump ) ) { return false; }
////		}
////		else if ( token == "tt_startCrouching" ) {
////			if ( !ParseInt( src, tt_startCrouching ) ) { return false; }
////		}
////		else if ( token == "tt_waterJump" ) {
////			if ( !ParseInt( src, tt_waterJump ) ) { return false; }
////		}
////		else if ( token == "tt_startWalkOffLedge" ) {
////			if ( !ParseInt( src, tt_startWalkOffLedge ) ) { return false; }
////		}
////		else {
////			src.Error( "invalid token '%s'", token.c_str() );
////		}
////	}
////
////	if ( numBoundingBoxes <= 0 ) {
////		src.Error( "no valid bounding box" );
////	}
////
////	return true;
////}
////
/////*
////============
////idAASSettings::FromFile
////============
////*/
////bool idAASSettings::FromFile( const idStr &fileName ) {
////	idLexer src( LEXFL_ALLOWPATHNAMES | LEXFL_NOSTRINGESCAPECHARS | LEXFL_NOSTRINGCONCAT );
////	idStr name;
////
////	name = fileName;
////
////	common->Printf( "loading %s\n", name.c_str() );
////
////	if ( !src.LoadFile( name ) ) {
////		common->Error( "WARNING: couldn't load %s\n", name.c_str() );
////		return false;
////	}
////
////	if ( !src.ExpectTokenString( "settings" ) ) {
////		common->Error( "%s is not a settings file", name.c_str() );
////		return false;
////	}
////
////	if ( !FromParser( src ) ) {
////		common->Error( "failed to parse %s", name.c_str() );
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
////bool idAASSettings::FromDict( const char *name, const idDict *dict ) {
////	idBounds bounds;
////
////	if ( !dict->GetVector( "mins", "0 0 0", bounds[ 0 ] ) ) {
////		common->Error( "Missing 'mins' in entityDef '%s'", name );
////	}
////	if ( !dict->GetVector( "maxs", "0 0 0", bounds[ 1 ] ) ) {
////		common->Error( "Missing 'maxs' in entityDef '%s'", name );
////	}
////
////	numBoundingBoxes = 1;
////	boundingBoxes[0] = bounds;
////
////	if ( !dict->GetBool( "usePatches", "0", usePatches ) ) {
////		common->Error( "Missing 'usePatches' in entityDef '%s'", name );
////	}
////
////	if ( !dict->GetBool( "writeBrushMap", "0", writeBrushMap ) ) {
////		common->Error( "Missing 'writeBrushMap' in entityDef '%s'", name );
////	}
////
////	if ( !dict->GetBool( "playerFlood", "0", playerFlood ) ) {
////		common->Error( "Missing 'playerFlood' in entityDef '%s'", name );
////	}
////
////	if ( !dict->GetBool( "allowSwimReachabilities", "0", allowSwimReachabilities ) ) {
////		common->Error( "Missing 'allowSwimReachabilities' in entityDef '%s'", name );
////	}
////
////	if ( !dict->GetBool( "allowFlyReachabilities", "0", allowFlyReachabilities ) ) {
////		common->Error( "Missing 'allowFlyReachabilities' in entityDef '%s'", name );
////	}
////
////	if ( !dict->GetString( "fileExtension", "", fileExtension ) ) {
////		common->Error( "Missing 'fileExtension' in entityDef '%s'", name );
////	}
////
////	if ( !dict->GetVector( "gravity", "0 0 -1066", gravity ) ) {
////		common->Error( "Missing 'gravity' in entityDef '%s'", name );
////	}
////	gravityDir = gravity;
////	gravityValue = gravityDir.Normalize();
////	invGravityDir = -gravityDir;
////
////	if ( !dict->GetFloat( "maxStepHeight", "0", maxStepHeight ) ) {
////		common->Error( "Missing 'maxStepHeight' in entityDef '%s'", name );
////	}
////
////	if ( !dict->GetFloat( "maxBarrierHeight", "0", maxBarrierHeight ) ) {
////		common->Error( "Missing 'maxBarrierHeight' in entityDef '%s'", name );
////	}
////
////	if ( !dict->GetFloat( "maxWaterJumpHeight", "0", maxWaterJumpHeight ) ) {
////		common->Error( "Missing 'maxWaterJumpHeight' in entityDef '%s'", name );
////	}
////
////	if ( !dict->GetFloat( "maxFallHeight", "0", maxFallHeight ) ) {
////		common->Error( "Missing 'maxFallHeight' in entityDef '%s'", name );
////	}
////
////	if ( !dict->GetFloat( "minFloorCos", "0", minFloorCos ) ) {
////		common->Error( "Missing 'minFloorCos' in entityDef '%s'", name );
////	}
////
////	if ( !dict->GetInt( "tt_barrierJump", "0", tt_barrierJump ) ) {
////		common->Error( "Missing 'tt_barrierJump' in entityDef '%s'", name );
////	}
////
////	if ( !dict->GetInt( "tt_startCrouching", "0", tt_startCrouching ) ) {
////		common->Error( "Missing 'tt_startCrouching' in entityDef '%s'", name );
////	}
////
////	if ( !dict->GetInt( "tt_waterJump", "0", tt_waterJump ) ) {
////		common->Error( "Missing 'tt_waterJump' in entityDef '%s'", name );
////	}
////
////	if ( !dict->GetInt( "tt_startWalkOffLedge", "0", tt_startWalkOffLedge ) ) {
////		common->Error( "Missing 'tt_startWalkOffLedge' in entityDef '%s'", name );
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
////bool idAASSettings::WriteToFile( idFile *fp ) const {
////	int i;
////
////	fp->WriteFloatString( "{\n" );
////	fp->WriteFloatString( "\tbboxes\n\t{\n" );
////	for ( i = 0; i < numBoundingBoxes; i++ ) {
////		fp->WriteFloatString( "\t\t(%f %f %f)-(%f %f %f)\n", boundingBoxes[i][0].x, boundingBoxes[i][0].y,
////						boundingBoxes[i][0].z, boundingBoxes[i][1].x, boundingBoxes[i][1].y, boundingBoxes[i][1].z );
////	}
////	fp->WriteFloatString( "\t}\n" );
////	fp->WriteFloatString( "\tusePatches = %d\n", usePatches );
////	fp->WriteFloatString( "\twriteBrushMap = %d\n", writeBrushMap );
////	fp->WriteFloatString( "\tplayerFlood = %d\n", playerFlood );
////	fp->WriteFloatString( "\tallowSwimReachabilities = %d\n", allowSwimReachabilities );
////	fp->WriteFloatString( "\tallowFlyReachabilities = %d\n", allowFlyReachabilities );
////	fp->WriteFloatString( "\tfileExtension = \"%s\"\n", fileExtension.c_str() );
////	fp->WriteFloatString( "\tgravity = (%f %f %f)\n", gravity.x, gravity.y, gravity.z );
////	fp->WriteFloatString( "\tmaxStepHeight = %f\n", maxStepHeight );
////	fp->WriteFloatString( "\tmaxBarrierHeight = %f\n", maxBarrierHeight );
////	fp->WriteFloatString( "\tmaxWaterJumpHeight = %f\n", maxWaterJumpHeight );
////	fp->WriteFloatString( "\tmaxFallHeight = %f\n", maxFallHeight );
////	fp->WriteFloatString( "\tminFloorCos = %f\n", minFloorCos );
////	fp->WriteFloatString( "\ttt_barrierJump = %d\n", tt_barrierJump );
////	fp->WriteFloatString( "\ttt_startCrouching = %d\n", tt_startCrouching );
////	fp->WriteFloatString( "\ttt_waterJump = %d\n", tt_waterJump );
////	fp->WriteFloatString( "\ttt_startWalkOffLedge = %d\n", tt_startWalkOffLedge );
////	fp->WriteFloatString( "}\n" );
////	return true;
////}
////
/////*
////============
////idAASSettings::ValidForBounds
////============
////*/
////bool idAASSettings::ValidForBounds( const idBounds &bounds ) const {
////	int i;
////
////	for ( i = 0; i < 3; i++ ) {
////		if ( bounds[0][i] < boundingBoxes[0][0][i] ) {
////			return false;
////		}
////		if ( bounds[1][i] > boundingBoxes[0][1][i] ) {
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
////bool idAASSettings::ValidEntity( const char *classname ) const {
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
////	const idDeclEntityDef *decl = static_cast<const idDeclEntityDef *>( declManager->FindType( DECL_ENTITYDEF, classname, false ) );
////	if ( decl && decl->dict.GetString( "use_aas", NULL, use_aas ) && !fileExtension.Icmp( use_aas ) ) {
////		if ( decl->dict.GetVector( "mins", NULL, bounds[0] ) ) {
////			decl->dict.GetVector( "maxs", NULL, bounds[1] );
////		} else if ( decl->dict.GetVector( "size", NULL, size ) ) {
////			bounds[ 0 ].Set( size.x * -0.5f, size.y * -0.5f, 0.0f );
////			bounds[ 1 ].Set( size.x * 0.5f, size.y * 0.5f, size.z );
////		}
////
////		if ( !ValidForBounds( bounds ) ) {
////			common->Error( "%s cannot use %s\n", classname, fileExtension.c_str() );
////		}
////
////		return true;
////	}
////
////	return false;
////}
////