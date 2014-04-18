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
////#include "../idlib/precompiled.h"
////#pragma hdrstop
////
/////*
////===============================================================================
////
////	idDeclAF
////
////===============================================================================
////*/
////
/////*
////================
////idAFVector::idAFVector
////================
////*/
////idAFVector::idAFVector( void ) {
////	type = VEC_COORDS;
////	vec.Zero();
////	negate = false;
////}
////
/////*
////================
////idAFVector::Parse
////================
////*/
////bool idAFVector::Parse( idLexer &src ) {
////	idToken token;
////
////	if ( !src.ReadToken( &token ) ) {
////		return false;
////	}
////
////	if ( token == "-" ) {
////		negate = true;
////		if ( !src.ReadToken( &token ) ) {
////			return false;
////		}
////	}
////	else {
////		negate = false;
////	}
////
////	if ( token == "(" ) {
////		type = idAFVector::VEC_COORDS;
////		vec.x = src.ParseFloat();
////		src.ExpectTokenString( "," );
////		vec.y = src.ParseFloat();
////		src.ExpectTokenString( "," );
////		vec.z = src.ParseFloat();
////		src.ExpectTokenString( ")" );
////	}
////	else if ( token == "joint" ) {
////		type = idAFVector::VEC_JOINT;
////		src.ExpectTokenString( "(" );
////		src.ReadToken( &token );
////		joint1 = token;
////		src.ExpectTokenString( ")" );
////	}
////	else if ( token == "bonecenter" ) {
////		type = idAFVector::VEC_BONECENTER;
////		src.ExpectTokenString( "(" );
////		src.ReadToken( &token );
////		joint1 = token;
////		src.ExpectTokenString( "," );
////		src.ReadToken( &token );
////		joint2 = token;
////		src.ExpectTokenString( ")" );
////	}
////	else if ( token == "bonedir" ) {
////		type = idAFVector::VEC_BONEDIR;
////		src.ExpectTokenString( "(" );
////		src.ReadToken( &token );
////		joint1 = token;
////		src.ExpectTokenString( "," );
////		src.ReadToken( &token );
////		joint2 = token;
////		src.ExpectTokenString( ")" );
////	}
////	else {
////		src.Error( "unknown token %s in vector", token.c_str() );
////		return false;
////	}
////
////	return true;
////}
////
/////*
////================
////idAFVector::Finish
////================
////*/
////bool idAFVector::Finish( const char *fileName, const getJointTransform_t GetJointTransform, const idJointMat *frame, void *model ) const {
////	idMat3 axis;
////	idVec3 start, end;
////
////	switch( type ) {
////		case idAFVector::VEC_COORDS: {
////			break;
////		}
////		case idAFVector::VEC_JOINT: {
////			if ( !GetJointTransform( model, frame, joint1, vec, axis ) ) {
////				common.Warning( "invalid joint %s in joint() in '%s'", joint1.c_str(), fileName );
////				vec.Zero();
////			}
////			break;
////		}
////		case idAFVector::VEC_BONECENTER: {
////			if ( !GetJointTransform( model, frame, joint1, start, axis ) ) {
////				common.Warning( "invalid joint %s in bonecenter() in '%s'", joint1.c_str(), fileName );
////				start.Zero();
////			}
////			if ( !GetJointTransform( model, frame, joint2, end, axis ) ) {
////				common.Warning( "invalid joint %s in bonecenter() in '%s'", joint2.c_str(), fileName );
////				end.Zero();
////			}
////			vec = ( start + end ) * 0.5f;
////			break;
////		}
////		case idAFVector::VEC_BONEDIR: {
////			if ( !GetJointTransform( model, frame, joint1, start, axis ) ) {
////				common.Warning( "invalid joint %s in bonedir() in '%s'", joint1.c_str(), fileName );
////				start.Zero();
////			}
////			if ( !GetJointTransform( model, frame, joint2, end, axis ) ) {
////				common.Warning( "invalid joint %s in bonedir() in '%s'", joint2.c_str(), fileName );
////				end.Zero();
////			}
////			vec = ( end - start );
////			break;
////		}
////		default: {
////			vec.Zero();
////			break;
////		}
////	}
////
////	if ( negate ) {
////		vec = -vec;
////	}
////
////	return true;
////}
////
/////*
////================
////idAFVector::Write
////================
////*/
////bool idAFVector::Write( idFile *f ) const {
////
////	if ( negate ) {
////		f.WriteFloatString( "-" );
////	}
////	switch( type ) {
////		case idAFVector::VEC_COORDS: {
////			f.WriteFloatString( "( %f, %f, %f )", vec.x, vec.y, vec.z );
////			break;
////		}
////		case idAFVector::VEC_JOINT: {
////			f.WriteFloatString( "joint( \"%s\" )", joint1.c_str() );
////			break;
////		}
////		case idAFVector::VEC_BONECENTER: {
////			f.WriteFloatString( "bonecenter( \"%s\", \"%s\" )", joint1.c_str(), joint2.c_str() );
////			break;
////		}
////		case idAFVector::VEC_BONEDIR: {
////			f.WriteFloatString( "bonedir( \"%s\", \"%s\" )", joint1.c_str(), joint2.c_str() );
////			break;
////		}
////		default: {
////			break;
////		}
////	}
////	return true;
////}
////
/////*
////================
////idAFVector::ToString
////================
////*/
////const char *idAFVector::ToString( idStr &str, const int precision ) {
////
////	switch( type ) {
////		case idAFVector::VEC_COORDS: {
////			char format[128];
////			sprintf( format, "( %%.%df, %%.%df, %%.%df )", precision, precision, precision );
////			sprintf( str, format, vec.x, vec.y, vec.z );
////			break;
////		}
////		case idAFVector::VEC_JOINT: {
////			sprintf( str, "joint( \"%s\" )", joint1.c_str() );
////			break;
////		}
////		case idAFVector::VEC_BONECENTER: {
////			sprintf( str, "bonecenter( \"%s\", \"%s\" )", joint1.c_str(), joint2.c_str() );
////			break;
////		}
////		case idAFVector::VEC_BONEDIR: {
////			sprintf( str, "bonedir( \"%s\", \"%s\" )", joint1.c_str(), joint2.c_str() );
////			break;
////		}
////		default: {
////			break;
////		}
////	}
////	if ( negate ) {
////		str = "-" + str;
////	}
////	return str.c_str();
////}
////
/////*
////================
////idDeclAF_Body::SetDefault
////================
////*/
////void idDeclAF_Body::SetDefault( const idDeclAF *file ) {
////	name = "noname";
////	modelType = TRM_BOX;
////	v1.type = idAFVector::VEC_COORDS;
////	v1.ToVec3().x = v1.ToVec3().y = v1.ToVec3().z = -10.0f;
////	v2.type = idAFVector::VEC_COORDS;
////	v2.ToVec3().x = v2.ToVec3().y = v2.ToVec3().z = 10.0f;
////	numSides = 3;
////	origin.ToVec3().Zero();
////	angles.Zero();
////	density = 0.2f;
////	inertiaScale.Identity();
////	linearFriction = file.defaultLinearFriction;
////	angularFriction = file.defaultAngularFriction;
////	contactFriction = file.defaultContactFriction;
////	contents = file.contents;
////	clipMask = file.clipMask;
////	selfCollision = file.selfCollision;
////	frictionDirection.ToVec3().Zero();
////	contactMotorDirection.ToVec3().Zero();
////	jointName = "origin";
////	jointMod = DECLAF_JOINTMOD_AXIS;
////	containedJoints = "*origin";
////}
////
/////*
////================
////idDeclAF_Constraint::SetDefault
////================
////*/
////void idDeclAF_Constraint::SetDefault( const idDeclAF *file ) {
////	name = "noname";
////	type = DECLAF_CONSTRAINT_UNIVERSALJOINT;
////	if ( file.bodies.Num() ) {
////		body1 = file.bodies[0].name;
////	}
////	else {
////		body1 = "world";
////	}
////	body2 = "world";
////	friction = file.defaultConstraintFriction;
////	anchor.ToVec3().Zero();
////	anchor2.ToVec3().Zero();
////	axis.ToVec3().Set( 1.0f, 0.0, 0.0 );
////	shaft[0].ToVec3().Set( 0.0, 0.0, -1.0f );
////	shaft[1].ToVec3().Set( 0.0, 0.0, 1.0f );
////	limit = idDeclAF_Constraint::LIMIT_NONE;
////	limitAngles[0] =
////	limitAngles[1] =
////	limitAngles[2] = 0.0;
////	limitAxis.ToVec3().Set( 0.0, 0.0, -1.0f );
////}
