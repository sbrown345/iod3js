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
////#include "precompiled.h"
////#pragma hdrstop
////
////
/////*
////===============
////FloatCRC
////===============
////*/
////ID_INLINE unsigned int FloatCRC( float f ) {
////	return *(unsigned int *)&f;
////}
////
/////*
////===============
////StringCRC
////===============
////*/
////ID_INLINE unsigned int StringCRC( const char *str ) {
////	unsigned int i, crc;
////	const unsigned char *ptr;
////
////	crc = 0;
////	ptr = reinterpret_cast<const unsigned char*>(str);
////	for ( i = 0; str[i]; i++ ) {
////		crc ^= str[i] << (i & 3);
////	}
////	return crc;
////}
////
/////*
////=================
////ComputeAxisBase
////
////WARNING : special case behaviour of atan2(y,x) <. atan(y/x) might not be the same everywhere when x == 0
////rotation by (0,RotY,RotZ) assigns X to normal
////=================
////*/
////static void ComputeAxisBase( const idVec3 &normal, idVec3 &texS, idVec3 &texT ) {
////	float RotY, RotZ;
////	idVec3 n;
////
////	// do some cleaning
////	n[0] = ( idMath::Fabs( normal[0] ) < 1e-6f ) ? 0.0f : normal[0];
////	n[1] = ( idMath::Fabs( normal[1] ) < 1e-6f ) ? 0.0f : normal[1];
////	n[2] = ( idMath::Fabs( normal[2] ) < 1e-6f ) ? 0.0f : normal[2];
////
////	RotY = -atan2( n[2], idMath::Sqrt( n[1] * n[1] + n[0] * n[0]) );
////	RotZ = atan2( n[1], n[0] );
////	// rotate (0,1,0) and (0,0,1) to compute texS and texT
////	texS[0] = -sin(RotZ);
////	texS[1] = cos(RotZ);
////	texS[2] = 0;
////	// the texT vector is along -Z ( T texture coorinates axis )
////	texT[0] = -sin(RotY) * cos(RotZ);
////	texT[1] = -sin(RotY) * sin(RotZ);
////	texT[2] = -cos(RotY);
////}

class idMapPrimitive {
	////public:
	////	enum { TYPE_INVALID = -1, TYPE_BRUSH, TYPE_PATCH };
	static TYPE_INVALID = -1;
	static TYPE_BRUSH = 0;
	static TYPE_PATCH = 1;

	epairs = new idDict;

	constructor() { this.type = idMapPrimitive.TYPE_INVALID; }
	////	virtual					~idMapPrimitive( ) { }
	GetType(): number { return this.type; }

	////protected:
	type: number/*int*/;
};

// https://stackoverflow.com/questions/17865620/typescript-multiple-inheritance-workarounds
class idMapPatch extends idMapPrimitive // todo: , public idSurface_Patch    
{
	////public:
	////							idMapPatch( );
	////							idMapPatch( int maxPatchWidth, int maxPatchHeight );
	////							~idMapPatch( ) { }
	////	static idMapPatch *		Parse( idLexer &src, const idVec3 &origin, bool patchDef3 = true, float version = CURRENT_MAP_VERSION );
	////	bool					Write( idFile *fp, int primitiveNum, const idVec3 &origin ) const;
	////	const char *			GetMaterial( ) const { return this.material; }
	SetMaterial ( p: string ): void { this.material.equals( p ); }
	////	int						GetHorzSubdivisions( ) const { return horzSubdivisions; }
	////	int						GetVertSubdivisions( ) const { return vertSubdivisions; }
	////	bool					GetExplicitlySubdivided( ) const { return explicitSubdivisions; }
	////	void					SetHorzSubdivisions( int n ) { horzSubdivisions = n; }
	////	void					SetVertSubdivisions( int n ) { vertSubdivisions = n; }
	////	void					SetExplicitlySubdivided( bool b ) { explicitSubdivisions = b; }
	////	unsigned int			GetGeometryCRC( ) const;
	////
	////protected:
	material = new idStr;
	horzSubdivisions:number/*int*/;
	vertSubdivisions:number/*int*/;
	explicitSubdivisions:boolean
	////};
	////
	////ID_INLINE idMapPatch::idMapPatch( ) {
	////	type = TYPE_PATCH;
	////	horzSubdivisions = vertSubdivisions = 0;
	////	explicitSubdivisions = false;
	////	width = height = 0;
	////	maxWidth = maxHeight = 0;
	////	expanded = false;
	////}
	////
	////ID_INLINE idMapPatch::idMapPatch( int maxPatchWidth, int maxPatchHeight ) {
	////	type = TYPE_PATCH;
	////	horzSubdivisions = vertSubdivisions = 0;
	////	explicitSubdivisions = false;
	////	width = height = 0;
	////	maxWidth = maxPatchWidth;
	////	maxHeight = maxPatchHeight;
	////	verts.SetNum( maxWidth * maxHeight );
	////	expanded = false;
	////}
	////

/////*
////=================
////idMapPatch::Parse
////=================
////*/
////idMapPatch *idMapPatch::Parse( idLexer &src, const idVec3 &origin, bool patchDef3, float version ) {
////	float		info[7];
////	idDrawVert *vert;
////	idToken		token;
////	int			i, j;
////
////	if ( !src.ExpectTokenString( "{" ) ) {
////		return NULL;
////	}
////
////	// read the material (we had an implicit 'textures/' in the old format...)
////	if ( !src.ReadToken( &token ) ) {
////		src.Error( "idMapPatch::Parse: unexpected EOF" );
////		return NULL;
////	}
////
////	// Parse it
////	if (patchDef3) {
////		if ( !src.Parse1DMatrix( 7, info ) ) {
////			src.Error( "idMapPatch::Parse: unable to Parse patchDef3 info" );
////			return NULL;
////		}
////	} else {
////		if ( !src.Parse1DMatrix( 5, info ) ) {
////			src.Error( "idMapPatch::Parse: unable to parse patchDef2 info" );
////			return NULL;
////		}
////	}
////
////	idMapPatch *patch = new idMapPatch( info[0], info[1] );
////	patch.SetSize( info[0], info[1] );
////	if ( version < 2.0f ) {
////		patch.SetMaterial( "textures/" + token );
////	} else {
////		patch.SetMaterial( token );
////	}
////
////	if ( patchDef3 ) {
////		patch.SetHorzSubdivisions( info[2] );
////		patch.SetVertSubdivisions( info[3] );
////		patch.SetExplicitlySubdivided( true );
////	}
////
////	if ( patch.GetWidth() < 0 || patch.GetHeight() < 0 ) {
////		src.Error( "idMapPatch::Parse: bad size" );
////		delete patch;
////		return NULL;
////	}
////
////	// these were written out in the wrong order, IMHO
////	if ( !src.ExpectTokenString( "(" ) ) {
////		src.Error( "idMapPatch::Parse: bad patch vertex data" );
////		delete patch;
////		return NULL;
////	}
////	for ( j = 0; j < patch.GetWidth(); j++ ) {
////		if ( !src.ExpectTokenString( "(" ) ) {
////			src.Error( "idMapPatch::Parse: bad vertex row data" );
////			delete patch;
////			return NULL;
////		}
////		for ( i = 0; i < patch.GetHeight(); i++ ) {
////			float v[5];
////
////			if ( !src.Parse1DMatrix( 5, v ) ) {
////				src.Error( "idMapPatch::Parse: bad vertex column data" );
////				delete patch;
////				return NULL;
////			}
////
////			vert = &((*patch)[i * patch.GetWidth() + j]);
////			vert.xyz[0] = v[0] - origin[0];
////			vert.xyz[1] = v[1] - origin[1];
////			vert.xyz[2] = v[2] - origin[2];
////			vert.st[0] = v[3];
////			vert.st[1] = v[4];
////		}
////		if ( !src.ExpectTokenString( ")" ) ) {
////			delete patch;
////			src.Error( "idMapPatch::Parse: unable to parse patch control points" );
////			return NULL;
////		}
////	}
////	if ( !src.ExpectTokenString( ")" ) ) {
////		src.Error( "idMapPatch::Parse: unable to parse patch control points, no closure" );
////		delete patch;
////		return NULL;
////	}
////
////	// read any key/value pairs
////	while( src.ReadToken( &token ) ) {
////		if ( token == "}" ) {
////			src.ExpectTokenString( "}" );
////			break;
////		}
////		if ( token.type == TT_STRING ) {
////			idStr key = token;
////			src.ExpectTokenType( TT_STRING, 0, &token );
////			patch.epairs.Set( key, token );
////		}
////	}
////
////	return patch;
////}
////
/////*
////============
////idMapPatch::Write
////============
////*/
////bool idMapPatch::Write( idFile *fp, int primitiveNum, const idVec3 &origin ) const {
////	int i, j;
////	const idDrawVert *v;
////
////	if ( GetExplicitlySubdivided() ) {
////		fp.WriteFloatString( "// primitive %d\n{\n patchDef3\n {\n", primitiveNum );
////		fp.WriteFloatString( "  \"%s\"\n  ( %d %d %d %d 0 0 0 )\n", GetMaterial(), GetWidth(), GetHeight(), GetHorzSubdivisions(), GetVertSubdivisions());
////	} else {
////		fp.WriteFloatString( "// primitive %d\n{\n patchDef2\n {\n", primitiveNum );
////		fp.WriteFloatString( "  \"%s\"\n  ( %d %d 0 0 0 )\n", GetMaterial(), GetWidth(), GetHeight());
////	}
////
////	fp.WriteFloatString( "  (\n" );
////	for ( i = 0; i < GetWidth(); i++ ) {
////		fp.WriteFloatString( "   ( " );
////		for ( j = 0; j < GetHeight(); j++ ) {
////			v = &verts[ j * GetWidth() + i ];
////			fp.WriteFloatString( " ( %f %f %f %f %f )", v.xyz[0] + origin[0],
////								v.xyz[1] + origin[1], v.xyz[2] + origin[2], v.st[0], v.st[1] );
////		}
////		fp.WriteFloatString( " )\n" );
////	}
////	fp.WriteFloatString( "  )\n }\n}\n" );
////
////	return true;
////}
////
/////*
////===============
////idMapPatch::GetGeometryCRC
////===============
////*/
////unsigned int idMapPatch::GetGeometryCRC( ) const {
////	int i, j;
////	unsigned int crc;
////
////	crc = GetHorzSubdivisions() ^ GetVertSubdivisions();
////	for ( i = 0; i < GetWidth(); i++ ) {
////		for ( j = 0; j < GetHeight(); j++ ) {
////			crc ^= FloatCRC( verts[j * GetWidth() + i].xyz.x );
////			crc ^= FloatCRC( verts[j * GetWidth() + i].xyz.y );
////			crc ^= FloatCRC( verts[j * GetWidth() + i].xyz.z );
////		}
////	}
////
////	crc ^= StringCRC( GetMaterial() );
////
////	return crc;
////}
}

class idMapBrush extends idMapPrimitive {
	////public:
	////							idMapBrush( ) { type = TYPE_BRUSH; sides.Resize( 8, 4 ); }
	////							~idMapBrush( ) { sides.DeleteContents( true ); }
	////	static idMapBrush *		Parse( idLexer &src, const idVec3 &origin, bool newFormat = true, float version = CURRENT_MAP_VERSION );
	////	static idMapBrush *		ParseQ3( idLexer &src, const idVec3 &origin );
	////	bool					Write( idFile *fp, int primitiveNum, const idVec3 &origin ) const;
	GetNumSides ( ): number { return this.sides.Num ( ); }
	AddSide ( side: idMapBrushSide ) { return this.sides.Append( side ); }
	GetSide ( /*int*/ i: number ): idMapBrushSide { return this.sides[i]; }
	////	unsigned int			GetGeometryCRC( ) const;
	////
	////protected:
	numSides:number/*int*/;
	sides = new idList<idMapBrushSide>(idMapBrushSide, true);

/////*
////=================
////idMapBrush::Parse
////=================
////*/
////idMapBrush *idMapBrush::Parse( idLexer &src, const idVec3 &origin, bool newFormat, float version ) {
////	int i;
////	idVec3 planepts[3];
////	idToken token;
////	idList<idMapBrushSide*> sides;
////	idMapBrushSide	*side;
////	idDict epairs;
////
////	if ( !src.ExpectTokenString( "{" ) ) {
////		return NULL;
////	}
////
////	do {
////		if ( !src.ReadToken( &token ) ) {
////			src.Error( "idMapBrush::Parse: unexpected EOF" );
////			sides.DeleteContents( true );
////			return NULL;
////		}
////		if ( token == "}" ) {
////			break;
////		}
////
////		// here we may have to jump over brush epairs ( only used in editor )
////		do {
////			// if token is a brace
////			if ( token == "(" ) {
////				break;
////			}
////			// the token should be a key string for a key/value pair
////			if ( token.type != TT_STRING ) {
////				src.Error( "idMapBrush::Parse: unexpected %s, expected ( or epair key string", token.c_str() );
////				sides.DeleteContents( true );
////				return NULL;
////			}
////
////			idStr key = token;
////
////			if ( !src.ReadTokenOnLine( &token ) || token.type != TT_STRING ) {
////				src.Error( "idMapBrush::Parse: expected epair value string not found" );
////				sides.DeleteContents( true );
////				return NULL;
////			}
////
////			epairs.Set( key, token );
////
////			// try to read the next key
////			if ( !src.ReadToken( &token ) ) {
////				src.Error( "idMapBrush::Parse: unexpected EOF" );
////				sides.DeleteContents( true );
////				return NULL;
////			}
////		} while (1);
////
////		src.UnreadToken( &token );
////
////		side = new idMapBrushSide();
////		sides.Append(side);
////
////		if ( newFormat ) {
////			if ( !src.Parse1DMatrix( 4, side.plane.ToFloatPtr() ) ) {
////				src.Error( "idMapBrush::Parse: unable to read brush side plane definition" );
////				sides.DeleteContents( true );
////				return NULL;
////			}
////		} else {
////			// read the three point plane definition
////			if (!src.Parse1DMatrix( 3, planepts[0].ToFloatPtr() ) ||
////				!src.Parse1DMatrix( 3, planepts[1].ToFloatPtr() ) ||
////				!src.Parse1DMatrix( 3, planepts[2].ToFloatPtr() ) ) {
////				src.Error( "idMapBrush::Parse: unable to read brush side plane definition" );
////				sides.DeleteContents( true );
////				return NULL;
////			}
////
////			planepts[0] -= origin;
////			planepts[1] -= origin;
////			planepts[2] -= origin;
////
////			side.plane.FromPoints( planepts[0], planepts[1], planepts[2] );
////		}
////
////		// read the texture matrix
////		// this is odd, because the texmat is 2D relative to default planar texture axis
////		if ( !src.Parse2DMatrix( 2, 3, side.texMat[0].ToFloatPtr() ) ) {
////			src.Error( "idMapBrush::Parse: unable to read brush side texture matrix" );
////			sides.DeleteContents( true );
////			return NULL;
////		}
////		side.origin = origin;
////		
////		// read the material
////		if ( !src.ReadTokenOnLine( &token ) ) {
////			src.Error( "idMapBrush::Parse: unable to read brush side material" );
////			sides.DeleteContents( true );
////			return NULL;
////		}
////
////		// we had an implicit 'textures/' in the old format...
////		if ( version < 2.0f ) {
////			side.material = "textures/" + token;
////		} else {
////			side.material = token;
////		}
////
////		// Q2 allowed override of default flags and values, but we don't any more
////		if ( src.ReadTokenOnLine( &token ) ) {
////			if ( src.ReadTokenOnLine( &token ) ) {
////				if ( src.ReadTokenOnLine( &token ) ) {
////				}
////			}
////		}
////	} while( 1 );
////
////	if ( !src.ExpectTokenString( "}" ) ) {
////		sides.DeleteContents( true );
////		return NULL;
////	}
////
////	idMapBrush *brush = new idMapBrush();
////	for ( i = 0; i < sides.Num(); i++ ) {
////		brush.AddSide( sides[i] );
////	}
////
////	brush.epairs = epairs;
////
////	return brush;
////}
////
/////*
////=================
////idMapBrush::ParseQ3
////=================
////*/
////idMapBrush *idMapBrush::ParseQ3( idLexer &src, const idVec3 &origin ) {
////	int i, shift[2], rotate;
////	float scale[2];
////	idVec3 planepts[3];
////	idToken token;
////	idList<idMapBrushSide*> sides;
////	idMapBrushSide	*side;
////	idDict epairs;
////
////	do {
////		if ( src.CheckTokenString( "}" ) ) {
////			break;
////		}
////
////		side = new idMapBrushSide();
////		sides.Append( side );
////
////		// read the three point plane definition
////		if (!src.Parse1DMatrix( 3, planepts[0].ToFloatPtr() ) ||
////			!src.Parse1DMatrix( 3, planepts[1].ToFloatPtr() ) ||
////			!src.Parse1DMatrix( 3, planepts[2].ToFloatPtr() ) ) {
////			src.Error( "idMapBrush::ParseQ3: unable to read brush side plane definition" );
////			sides.DeleteContents( true );
////			return NULL;
////		}
////
////		planepts[0] -= origin;
////		planepts[1] -= origin;
////		planepts[2] -= origin;
////
////		side.plane.FromPoints( planepts[0], planepts[1], planepts[2] );
////
////		// read the material
////		if ( !src.ReadTokenOnLine( &token ) ) {
////			src.Error( "idMapBrush::ParseQ3: unable to read brush side material" );
////			sides.DeleteContents( true );
////			return NULL;
////		}
////
////		// we have an implicit 'textures/' in the old format
////		side.material = "textures/" + token;
////
////		// read the texture shift, rotate and scale
////		shift[0] = src.ParseInt();
////		shift[1] = src.ParseInt();
////		rotate = src.ParseInt();
////		scale[0] = src.ParseFloat();
////		scale[1] = src.ParseFloat();
////		side.texMat[0] = idVec3( 0.03125f, 0.0f, 0.0f );
////		side.texMat[1] = idVec3( 0.0f, 0.03125f, 0.0f );
////		side.origin = origin;
////		
////		// Q2 allowed override of default flags and values, but we don't any more
////		if ( src.ReadTokenOnLine( &token ) ) {
////			if ( src.ReadTokenOnLine( &token ) ) {
////				if ( src.ReadTokenOnLine( &token ) ) {
////				}
////			}
////		}
////	} while( 1 );
////
////	idMapBrush *brush = new idMapBrush();
////	for ( i = 0; i < sides.Num(); i++ ) {
////		brush.AddSide( sides[i] );
////	}
////
////	brush.epairs = epairs;
////
////	return brush;
////}
////
/////*
////============
////idMapBrush::Write
////============
////*/
////bool idMapBrush::Write( idFile *fp, int primitiveNum, const idVec3 &origin ) const {
////	int i;
////	idMapBrushSide *side;
////
////	fp.WriteFloatString( "// primitive %d\n{\n brushDef3\n {\n", primitiveNum );
////
////	// write brush epairs
////	for ( i = 0; i < epairs.GetNumKeyVals(); i++) {
////		fp.WriteFloatString( "  \"%s\" \"%s\"\n", epairs.GetKeyVal(i).GetKey().c_str(), epairs.GetKeyVal(i).GetValue().c_str());
////	}
////
////	// write brush sides
////	for ( i = 0; i < GetNumSides(); i++ ) {
////		side = GetSide( i );
////		fp.WriteFloatString( "  ( %f %f %f %f ) ", side.plane[0], side.plane[1], side.plane[2], side.plane[3] );
////		fp.WriteFloatString( "( ( %f %f %f ) ( %f %f %f ) ) \"%s\" 0 0 0\n",
////							side.texMat[0][0], side.texMat[0][1], side.texMat[0][2],
////								side.texMat[1][0], side.texMat[1][1], side.texMat[1][2],
////									side.material.c_str() );
////	}
////
////	fp.WriteFloatString( " }\n}\n" );
////
////	return true;
////}
////
/////*
////===============
////idMapBrush::GetGeometryCRC
////===============
////*/
////unsigned int idMapBrush::GetGeometryCRC( ) const {
////	int i, j;
////	idMapBrushSide *mapSide;
////	unsigned int crc;
////
////	crc = 0;
////	for ( i = 0; i < GetNumSides(); i++ ) {
////		mapSide = GetSide(i);
////		for ( j = 0; j < 4; j++ ) {
////			crc ^= FloatCRC( mapSide.GetPlane()[j] );
////		}
////		crc ^= StringCRC( mapSide.GetMaterial() );
////	}
////
////	return crc;
////}
}

class idMapEntity {
////	friend class			idMapFile;
////
////public:
	epairs = new idDict;
////
////public:
////							idMapEntity( ) { epairs.SetHashSize( 64 ); }
////							~idMapEntity( ) { primitives.DeleteContents( true ); }
////	static idMapEntity *	Parse( idLexer &src, bool worldSpawn = false, float version = CURRENT_MAP_VERSION );
////	bool					Write( idFile *fp, int entityNum ) const;
	GetNumPrimitives( ) :number{ return this.primitives.Num(); }
	GetPrimitive ( /*int */i: number ): idMapPrimitive { return this.primitives[i]; }
////	void					AddPrimitive( idMapPrimitive *p ) { primitives.Append( p ); }
////	unsigned int			GetGeometryCRC( ) const;
////	void					RemovePrimitiveData();
////
////protected:
	primitives = new idList<idMapPrimitive>(idMapPrimitive, true);

/*
================
idMapEntity::Parse
================
*/
	static Parse ( src: idLexer, worldSpawn: boolean, /*float */version: number ): idMapEntity {
		var token = new idToken;
		var mapEnt: idMapEntity;
		var mapPatch: idMapPatch;
		var mapBrush: idMapBrush;
		var worldent: boolean;
		var origin = new idVec3;
		var /*double */v1: number, v2: number, v3: number;
////
////	if ( !src.ReadToken(&token) ) {
////		return NULL;
////	}
////
////	if ( token != "{" ) {
////		src.Error( "idMapEntity::Parse: { not found, found %s", token.c_str() );
////		return NULL;
////	}
////
////	mapEnt = new idMapEntity();
////
////	if ( worldSpawn ) {
////		mapEnt.primitives.Resize( 1024, 256 );
////	}
////
////	origin.Zero();
////	worldent = false;
////	do {
////		if ( !src.ReadToken(&token) ) {
////			src.Error( "idMapEntity::Parse: EOF without closing brace" );
////			return NULL;
////		}
////		if ( token == "}" ) {
////			break;
////		}
////
////		if ( token == "{" ) {
////			// parse a brush or patch
////			if ( !src.ReadToken( &token ) ) {
////				src.Error( "idMapEntity::Parse: unexpected EOF" );
////				return NULL;
////			}
////
////			if ( worldent ) {
////				origin.Zero();
////			}
////
////			// if is it a brush: brush, brushDef, brushDef2, brushDef3
////			if ( token.Icmpn( "brush", 5 ) == 0 ) {
////				mapBrush = idMapBrush::Parse( src, origin, ( !token.Icmp( "brushDef2" ) || !token.Icmp( "brushDef3" ) ), version );
////				if ( !mapBrush ) {
////					return NULL;
////				}
////				mapEnt.AddPrimitive( mapBrush );
////			}
////			// if is it a patch: patchDef2, patchDef3
////			else if ( token.Icmpn( "patch", 5 ) == 0 ) {
////				mapPatch = idMapPatch::Parse( src, origin, !token.Icmp( "patchDef3" ), version );
////				if ( !mapPatch ) {
////					return NULL;
////				}
////				mapEnt.AddPrimitive( mapPatch );
////			}
////			// assume it's a brush in Q3 or older style
////			else {
////				src.UnreadToken( &token );
////				mapBrush = idMapBrush::ParseQ3( src, origin );
////				if ( !mapBrush ) {
////					return NULL;
////				}
////				mapEnt.AddPrimitive( mapBrush );
////			}
////		} else {
////			idStr key, value;
////
////			// parse a key / value pair
////			key = token;
////			src.ReadTokenOnLine( &token );
////			value = token;
////
////			// strip trailing spaces that sometimes get accidentally
////			// added in the editor
////			value.StripTrailingWhitespace();
////			key.StripTrailingWhitespace();
////
////			mapEnt.epairs.Set( key, value );
////
////			if ( !idStr.Icmp( key, "origin" ) ) {
////				// scanf into doubles, then assign, so it is idVec size independent
////				v1 = v2 = v3 = 0;
////				sscanf( value, "%lf %lf %lf", &v1, &v2, &v3 );
////				origin.x = v1;
////				origin.y = v2;
////				origin.z = v3;
////			}
////			else if ( !idStr.Icmp( key, "classname" ) && !idStr.Icmp( value, "worldspawn" ) ) {
////				worldent = true;
////			}
////		}
////	} while( 1 );
////
		return mapEnt;
	}

/////*
////============
////idMapEntity::Write
////============
////*/
////bool idMapEntity::Write( idFile *fp, int entityNum ) const {
////	int i;
////	idMapPrimitive *mapPrim;
////	idVec3 origin;
////
////	fp.WriteFloatString( "// entity %d\n{\n", entityNum );
////
////	// write entity epairs
////	for ( i = 0; i < epairs.GetNumKeyVals(); i++) {
////		fp.WriteFloatString( "\"%s\" \"%s\"\n", epairs.GetKeyVal(i).GetKey().c_str(), epairs.GetKeyVal(i).GetValue().c_str());
////	}
////
////	epairs.GetVector( "origin", "0 0 0", origin );
////
////	// write pritimives
////	for ( i = 0; i < GetNumPrimitives(); i++ ) {
////		mapPrim = GetPrimitive( i );
////
////		switch( mapPrim.GetType() ) {
////			case idMapPrimitive::TYPE_BRUSH:
////				static_cast<idMapBrush*>(mapPrim).Write( fp, i, origin );
////				break;
////			case idMapPrimitive::TYPE_PATCH:
////				static_cast<idMapPatch*>(mapPrim).Write( fp, i, origin );
////				break;
////		}
////	}
////
////	fp.WriteFloatString( "}\n" );
////
////	return true;
////}
////
/////*
////===============
////idMapEntity::RemovePrimitiveData
////===============
////*/
////void idMapEntity::RemovePrimitiveData() {
////	primitives.DeleteContents(true);
////}
////
/////*
////===============
////idMapEntity::GetGeometryCRC
////===============
////*/
////unsigned int idMapEntity::GetGeometryCRC( ) const {
////	int i;
////	unsigned int crc;
////	idMapPrimitive	*mapPrim;
////
////	crc = 0;
////	for ( i = 0; i < GetNumPrimitives(); i++ ) {
////		mapPrim = GetPrimitive( i );
////
////		switch( mapPrim.GetType() ) {
////			case idMapPrimitive::TYPE_BRUSH:
////				crc ^= static_cast<idMapBrush*>(mapPrim).GetGeometryCRC();
////				break;
////			case idMapPrimitive::TYPE_PATCH:
////				crc ^= static_cast<idMapPatch*>(mapPrim).GetGeometryCRC();
////				break;
////		}
////	}
////
////	return crc;
////}
}

////#ifndef __MAPFILE_H__
////#define __MAPFILE_H__
////
/*
===============================================================================

	Reads or writes the contents of .map files into a standard internal
	format, which can then be moved into private formats for collision
	detection, map processing, or editor use.

	No validation (duplicate planes, null area brushes, etc) is performed.
	There are no limits to the number of any of the elements in maps.
	The order of entities, brushes, and sides is maintained.

===============================================================================
*/

var OLD_MAP_VERSION					= 1;
var CURRENT_MAP_VERSION				= 2;
var DEFAULT_CURVE_SUBDIVISION			= 4;
var DEFAULT_CURVE_MAX_ERROR			= 4.0;
var DEFAULT_CURVE_MAX_ERROR_CD		= 24.0;
var DEFAULT_CURVE_MAX_LENGTH		= -1.0;
var DEFAULT_CURVE_MAX_LENGTH_CD		= -1.0;



class idMapBrushSide {
////	friend class idMapBrush;
////
////public:
////							idMapBrushSide( );
////							~idMapBrushSide( ) { }
	GetMaterial ( ): string { return this.material.data; }
	SetMaterial ( p: string ): void { this.material.equals( p ); }
////	const idPlane &			GetPlane( ) const { return plane; }
////	void					SetPlane( const idPlane &p ) { plane = p; }
////	void					SetTextureMatrix( const idVec3 mat[2] ) { texMat[0] = mat[0]; texMat[1] = mat[1]; }
////	void					GetTextureMatrix( idVec3 &mat1, idVec3 &mat2 ) { mat1 = texMat[0]; mat2 = texMat[1]; }
////	void					GetTextureVectors( idVec4 v[2] ) const;
////
////protected:
	material = new idStr;
	plane = new idPlane;
	texMat = newStructArray<idVec3>( idVec3, 2 );
	origin = new idVec3;
////};
////
	constructor ( ) {
		this.plane.Zero ( );
		this.texMat[0].Zero ( );
		this.texMat[1].Zero ( );
		this.origin.Zero ( );
	}
////
/////*
////=================
////idMapBrushSide::GetTextureVectors
////=================
////*/
////void idMapBrushSide::GetTextureVectors( idVec4 v[2] ) const {
////	int i;
////	idVec3 texX, texY;
////
////	ComputeAxisBase( plane.Normal(), texX, texY );
////	for ( i = 0; i < 2; i++ ) {
////		v[i][0] = texX[0] * texMat[i][0] + texY[0] * texMat[i][1];
////		v[i][1] = texX[1] * texMat[i][0] + texY[1] * texMat[i][1];
////		v[i][2] = texX[2] * texMat[i][0] + texY[2] * texMat[i][1];
////		v[i][3] = texMat[i][2] + ( origin * v[i].ToVec3() );
////	}
////}
}


class idMapFile {
	////public:
	////							idMapFile( );
	////							~idMapFile( ) { this.entities.DeleteContents( true ); }
	////
	////							// filename does not require an extension
	////							// normally this will use a .reg file instead of a .map file if it exists,
	////							// which is what the game and dmap want, but the editor will want to always
	////							// load a .map file
	////	bool					Parse( const char *filename, bool ignoreRegion = false, bool osPath = false );
	////	bool					Write( const char *fileName, const char *ext, bool fromBasePath = true );
	////							// get the number of entities in the map
	GetNumEntities ( ): number { return this.entities.Num ( ); }
	////							// get the specified entity
	GetEntity ( /*int */i: number ): idMapEntity { return this.entities[i]; }
	////							// get the name without file extension
	GetName ( ): string { return this.name.data; }
	////							// get the file time
	GetFileTime ( ): number { return this.fileTime; }
	////							// get CRC for the map geometry
	////							// texture coordinates and entity key/value pairs are not taken into account
	GetGeometryCRC ( ): number /*unsigned int*/ { return this.geometryCRC; }
	////							// returns true if the file on disk changed
	////	bool					NeedsReload();
	////
	////	int						AddEntity( idMapEntity *mapentity );
	////	idMapEntity *			FindEntity( const char *name );
	////	void					RemoveEntity( idMapEntity *mapEnt );
	////	void					RemoveEntities( const char *classname );
	////	void					RemoveAllEntities();
	////	void					RemovePrimitiveData();
	////	bool					HasPrimitiveData() { return this.hasPrimitiveData; }
	////
	////protected:
	version: number /*float*/;
	fileTime: number /*ID_TIME_T*/;
	geometryCRC: number /*unsigned int*/;
	entities = new idList<idMapEntity>( idMapEntity, true );
	name = new idStr;
	hasPrimitiveData: boolean;

////
	////private:
	////	void					SetGeometryCRC( );
////
	constructor ( ) {
		this.version = CURRENT_MAP_VERSION;
		this.fileTime = 0;
		this.geometryCRC = 0;
		this.entities.Resize( 1024, 256 );
		this.hasPrimitiveData = false;
	}

////#endif /* !__MAPFILE_H__ */

	/*
	===============
	idMapFile::Parse
	===============
	*/
	Parse(filename: string, ignoreRegion: boolean = false, osPath: boolean = false): boolean {
		// no string concatenation for epairs and allow path names for materials
		var src = new idLexer(lexerFlags_t.LEXFL_NOSTRINGCONCAT | lexerFlags_t.LEXFL_NOSTRINGESCAPECHARS | lexerFlags_t.LEXFL_ALLOWPATHNAMES);
		var token = new idToken;
		var fullName = new idStr;
		var mapEnt: idMapEntity;
		var /*int */i: number, j: number, k: number;

		this.name.equals(filename);
		this.name.StripFileExtension();
		fullName.equals( this.name );
		this.hasPrimitiveData = false;

		if (!ignoreRegion) {
			// try loading a .reg file first
			fullName.SetFileExtension("reg");
			src.LoadFile(fullName.data, osPath);
		}

		if (!src.IsLoaded()) {
			// now try a .map file
			fullName.SetFileExtension("map");
			src.LoadFile(fullName.data, osPath);
			if (!src.IsLoaded()) {
				// didn't get anything at all
				return false;
			}
		}

		this.version = OLD_MAP_VERSION;
		this.fileTime = src.GetFileTime();
		this.entities.DeleteContents(true);

		if (src.CheckTokenString("Version")) {
			src.ReadTokenOnLine( token );
			this.version = token.GetFloatValue();
		}

		while (1) {
		mapEnt = idMapEntity.Parse(src, (this.entities.Num() == 0), this.version);
			if (!mapEnt) {
				break;
			}
			this.entities.Append(mapEnt);
		}

		this.SetGeometryCRC();

		// if the map has a worldspawn
		if (this.entities.Num()) {

		// "removeEntities" "classname" can be set in the worldspawn to remove all entities with the given classname
			var removeEntities: idKeyValue = this.entities[0].epairs.MatchPrefix("removeEntities", NULL);
			while (removeEntities) {
				this.RemoveEntities(removeEntities.GetValue().data);
				removeEntities = this.entities[0].epairs.MatchPrefix("removeEntities", removeEntities);
			}

		// "overrideMaterial" "material" can be set in the worldspawn to reset all materials
			var material = new idStr;
			if (this.entities[0].epairs.GetString("overrideMaterial", "", material)) {
				for (i = 0; i < this.entities.Num(); i++) {
					mapEnt = this.entities[i];
					for (j = 0; j < mapEnt.GetNumPrimitives(); j++) {
						var mapPrimitive = mapEnt.GetPrimitive(j);
						switch (mapPrimitive.GetType()) {
						case idMapPrimitive.TYPE_BRUSH: {
								var  mapBrush = static_cast<idMapBrush>(mapPrimitive);
								for (k = 0; k < mapBrush.GetNumSides(); k++) {
									mapBrush.GetSide(k).SetMaterial(material.data);
								}
								break;
							}
						case idMapPrimitive.TYPE_PATCH: {
								static_cast<idMapPatch>(mapPrimitive).SetMaterial(material.data);
								break;
							}
						}
					}
				}
			}

			// force all this.entities to have a name key/value pair
			if (this.entities[0].epairs.GetBool("forceEntityNames")) {
				for (i = 1; i < this.entities.Num(); i++) {
					mapEnt = this.entities[i];
					if (!mapEnt.epairs.FindKey("name")) {
						mapEnt.epairs.Set("name", va("%s%d", mapEnt.epairs.GetString("classname", "forcedName"), i));
					}
				}
			}

			// move the primitives of any func_group this.entities to the worldspawn
			if (this.entities[0].epairs.GetBool("moveFuncGroups")) {
				for (i = 1; i < this.entities.Num(); i++) {
					mapEnt = this.entities[i];
				if ( idStr.Icmp(mapEnt.epairs.GetString("classname"), "func_group") == 0 ) {
						this.entities[0].primitives.Append(mapEnt.primitives);
						mapEnt.primitives.Clear();
					}
				}
			}
	}

		this.hasPrimitiveData = true;
		return true;
	}

/////*
////============
////idMapFile::Write
////============
////*/
////bool idMapFile::Write( const char *fileName, const char *ext, bool fromBasePath ) {
////	int i;
////	idStr qpath;
////	idFile *fp;
////
////	qpath = fileName;
////	qpath.SetFileExtension( ext );
////
////	idLib::common.Printf( "writing %s...\n", qpath.c_str() );
////
////	if ( fromBasePath ) {
////		fp = idLib::fileSystem.OpenFileWrite( qpath, "fs_devpath" );
////	}
////	else {
////		fp = idLib::fileSystem.OpenExplicitFileWrite( qpath );
////	}
////
////	if ( !fp ) {
////		idLib::common.Warning( "Couldn't open %s\n", qpath.c_str() );
////		return false;
////	}
////
////	fp.WriteFloatString( "Version %f\n", (float) CURRENT_MAP_VERSION );
////
////	for ( i = 0; i < this.entities.Num(); i++ ) {
////		this.entities[i].Write( fp, i );
////	}
////
////	idLib::fileSystem.CloseFile( fp );
////
////	return true;
////}

/*
===============
idMapFile::SetGeometryCRC
===============
*/
	SetGeometryCRC ( ): void {
		var /*int */i: number;

		this.geometryCRC = 0;
		for ( i = 0; i < this.entities.Num ( ); i++ ) {
			this.geometryCRC ^= this.entities[i].GetGeometryCRC ( );
		}
	}

/////*
////===============
////idMapFile::AddEntity
////===============
////*/
////int idMapFile::AddEntity( idMapEntity *mapEnt ) {
////	int ret = this.entities.Append( mapEnt );
////	return ret;
////}
////
/////*
////===============
////idMapFile::FindEntity
////===============
////*/
////idMapEntity *idMapFile::FindEntity( const char *name ) {
////	for ( int i = 0; i < this.entities.Num(); i++ ) {
////		idMapEntity *ent = this.entities[i];
////		if ( idStr.Icmp( ent.epairs.GetString( "name" ), name ) == 0 ) {
////			return ent;
////		}
////	}
////	return NULL;
////}
////
/////*
////===============
////idMapFile::RemoveEntity
////===============
////*/
////void idMapFile::RemoveEntity( idMapEntity *mapEnt ) {
////	this.entities.Remove( mapEnt );
////	delete mapEnt;
////}

/*
===============
idMapFile::RemoveEntity
===============
*/
	RemoveEntities ( classname: string ): void {
		for ( var /*int */i = 0; i < this.entities.Num ( ); i++ ) {
			var ent = this.entities[i];
			if ( idStr.Icmp( ent.epairs.GetString( "classname" ), classname ) == 0 ) {
				delete this.entities[i];
				this.entities.RemoveIndex( i );
				i--;
			}
		}
	}

/////*
////===============
////idMapFile::RemoveAllEntities
////===============
////*/
////void idMapFile::RemoveAllEntities() {
////	this.entities.DeleteContents( true );
////	this.hasPrimitiveData = false;
////}
////
/////*
////===============
////idMapFile::RemovePrimitiveData
////===============
////*/
////void idMapFile::RemovePrimitiveData() {
////	for ( int i = 0; i < this.entities.Num(); i++ ) {
////		idMapEntity *ent = this.entities[i];
////		ent.RemovePrimitiveData();
////	}
////	this.hasPrimitiveData = false;
////}
////
/////*
////===============
////idMapFile::NeedsReload
////===============
////*/
////bool idMapFile::NeedsReload() {
////	if ( this.name.Length() ) {
////		ID_TIME_T time = (ID_TIME_T)-1;
////		if ( idLib::fileSystem.ReadFile( this.name, NULL, &time ) > 0 ) {
////			return ( time > fileTime );
////		}
////	}
////	return true;
////}
}