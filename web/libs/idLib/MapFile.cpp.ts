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

/*
===============
FloatCRC
===============
*/

var FloatCRC_float = new Float32Array( 1 );
var FloatCRC_uint = new Uint32Array( FloatCRC_float.buffer );
function FloatCRC( /*float */f: number): number/*unsigned int */ {
	FloatCRC_float[0] = f;
	return FloatCRC_uint[0]; //*(unsigned int *)&f;
}

/*
===============
StringCRC
===============
*/
function StringCRC ( str: string ): number /*unsigned int */ {
	var /*unsigned int */i: number, crc: number;
	var ptr: Uint8Array; //const unsigned char *ptr;

	crc = 0;
	ptr = str.toUint8Array ( ); //reinterpret_cast<const unsigned char*>(str);
	for ( i = 0; str[i]; i++ ) {
		crc ^= str.charCodeAt( i ) << ( i & 3 );
	}

	crc = uint32( crc );
	return crc;
}

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
////	n[0] = ( idMath::Fabs( normal[0] ) < 1e-6f ) ? 0.0 : normal[0];
////	n[1] = ( idMath::Fabs( normal[1] ) < 1e-6f ) ? 0.0 : normal[1];
////	n[2] = ( idMath::Fabs( normal[2] ) < 1e-6f ) ? 0.0 : normal[2];
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

// idMapPrimitive is very simple so simulate multiple inheritence by just copying it here
class idMapPrimitive_idSurface_Patch extends idSurface_Patch {
	epairs = new idDict;

	constructor ( ) {
		super ( );
		this.type = idMapPrimitive.TYPE_INVALID;
	}
	////	virtual					~idMapPrimitive( ) { }
	GetType(): number { return this.type; }

	////protected:
	type: number/*int*/;
}

// https://stackoverflow.com/questions/17865620/typescript-multiple-inheritance-workarounds
//https://stackoverflow.com/questions/12719844/mixins-in-typescript
class idMapPatch extends idMapPrimitive_idSurface_Patch //idMapPrimitive // todo: , public idSurface_Patch    
{
	////public:
	////							idMapPatch( );
	////							idMapPatch( int maxPatchWidth, int maxPatchHeight );
	////							~idMapPatch( ) { }
	////	static idMapPatch *		Parse( idLexer &src, origin: idVec3, bool patchDef3 = true, float version = CURRENT_MAP_VERSION );
	////	bool					Write( idFile *fp, int primitiveNum, const idVec3 &origin ) const;
	GetMaterial ( ): string { return this.material.data; }
	SetMaterial ( p: string ): void { this.material.equals( p ); }
	GetHorzSubdivisions ( ): number /*int*/ { return this.horzSubdivisions; }
	GetVertSubdivisions ( ): number /*int*/ { return this.vertSubdivisions; }
	GetExplicitlySubdivided ( ): boolean { return this.explicitSubdivisions; }
	SetHorzSubdivisions ( /*int*/ n: number ) { this.horzSubdivisions = n; }
	SetVertSubdivisions ( /*int*/ n: number ) { this.vertSubdivisions = n; }
	SetExplicitlySubdivided ( b: boolean ) { this.explicitSubdivisions = b; }
	////	unsigned int			GetGeometryCRC( ) const;
	////
	////protected:
	material = new idStr;
	horzSubdivisions: number /*int*/;
	vertSubdivisions: number /*int*/;
	explicitSubdivisions: boolean
	////};
	////
	constructor ( )
	constructor ( /*int*/ maxPatchWidth: number, /*int */maxPatchHeight: number )
	constructor ( maxPatchWidth?: number, maxPatchHeight?: number ) {
		super ( );
		if ( arguments.length == 0 ) {
			this.type = idMapPrimitive.TYPE_PATCH;
			this.horzSubdivisions = this.vertSubdivisions = 0;
			this.explicitSubdivisions = false;
			this.width = this.height = 0;
			this.maxWidth = this.maxHeight = 0;
			this.expanded = false;
		} else if ( arguments.length == 2 ) {
			this.type = idMapPrimitive.TYPE_PATCH;
			this.horzSubdivisions = this.vertSubdivisions = 0;
			this.explicitSubdivisions = false;
			this.width = this.height = 0;
			this.maxWidth = maxPatchWidth;
			this.maxHeight = maxPatchHeight;
			this.verts.SetNum( this.maxWidth * this.maxHeight );
			this.expanded = false;
		} else {
			throw "No such ctor overload";
		}
	}

/*
=================
idMapPatch::Parse
=================
*/
	static Parse ( src: idLexer, origin: idVec3, patchDef3: boolean, /*float */version: number ): idMapPatch {
		var info = new Float32Array( 7 );
		var vert: idDrawVert;
		var token = new idToken;
		var /*int*/i: number, j: number;

		if ( !src.ExpectTokenString( "{" ) ) {
			return null;
		}

		// read the material (we had an implicit 'textures/' in the old format...)
		if ( !src.ReadToken( token ) ) {
			src.Error( "idMapPatch::Parse: unexpected EOF" );
			return null;
		}

		// Parse it
		if ( patchDef3 ) {
			if ( !src.Parse1DMatrix( 7, info ) ) {
				src.Error( "idMapPatch::Parse: unable to Parse patchDef3 info" );
				return null;
			}
		} else {
			if ( !src.Parse1DMatrix( 5, info ) ) {
				src.Error( "idMapPatch::Parse: unable to parse patchDef2 info" );
				return null;
			}
		}

		var patch = new idMapPatch( info[0], info[1] );
		patch.SetSize( info[0], info[1] );
		if ( version < 2.0 ) {
			patch.SetMaterial( "textures/" + token.data );
		} else {
			patch.SetMaterial( token.data );
		}

		if ( patchDef3 ) {
			patch.SetHorzSubdivisions( info[2] );
			patch.SetVertSubdivisions( info[3] );
			patch.SetExplicitlySubdivided( true );
		}

		if ( patch.GetWidth ( ) < 0 || patch.GetHeight ( ) < 0 ) {
			src.Error( "idMapPatch::Parse: bad size" );
			$delete( patch );
			return null;
		}

		// these were written out in the wrong order, IMHO
		if ( !src.ExpectTokenString( "(" ) ) {
			src.Error( "idMapPatch::Parse: bad patch vertex data" );
			$delete( patch );
			return null;
		}
		for ( j = 0; j < patch.GetWidth ( ); j++ ) {
			if ( !src.ExpectTokenString( "(" ) ) {
				src.Error( "idMapPatch::Parse: bad vertex row data" );
				$delete( patch );
				return null;
			}
			for ( i = 0; i < patch.GetHeight ( ); i++ ) {
				var v = new Float32Array( 5 );

				if ( !src.Parse1DMatrix( 5, v ) ) {
					src.Error( "idMapPatch::Parse: bad vertex column data" );
					$delete( patch );
					return null;
				}

				vert = ( ( patch.verts )[i * patch.GetWidth ( ) + j] ); //todo: this is from surface indexer ///////////////////////////////////////////////////////////////////////////////////////////
				vert.xyz[0] = v[0] - origin[0];
				vert.xyz[1] = v[1] - origin[1];
				vert.xyz[2] = v[2] - origin[2];
				vert.st[0] = v[3];
				vert.st[1] = v[4];
			}
			if ( !src.ExpectTokenString( ")" ) ) {
				$delete( patch );
				src.Error( "idMapPatch::Parse: unable to parse patch control points" );
				return null;
			}
		}
		if ( !src.ExpectTokenString( ")" ) ) {
			src.Error( "idMapPatch::Parse: unable to parse patch control points, no closure" );
			$delete( patch );
			return null;
		}

		// read any key/value pairs
		while ( src.ReadToken( token ) ) {
			if ( token.data == "}" ) {
				src.ExpectTokenString( "}" );
				break;
			}
			if ( token.type == TT_STRING ) {
				var key = new idStr( token );
				src.ExpectTokenType( TT_STRING, 0, token );
				patch.epairs.Set( key.data, token.data );
			}
		}

		return patch;
	}

/////*
////============
////idMapPatch::Write
////============
////*/
////bool idMapPatch::Write( idFile *fp, int primitiveNum, const idVec3 &origin ) const {
////	var /*int */i:number, j:number;
////	const idDrawVert *v;
////
////	if ( GetExplicitlySubdivided() ) {
////		fp.WriteFloatString( "// primitive %d\n{\n patchDef3\n {\n", primitiveNum );
////		fp.WriteFloatString( "  \"%s\"\n  ( %d %d %d %d 0 0 0 )\n", GetMaterial(), this.GetWidth(), this.GetHeight(), GetHorzSubdivisions(), GetVertSubdivisions());
////	} else {
////		fp.WriteFloatString( "// primitive %d\n{\n patchDef2\n {\n", primitiveNum );
////		fp.WriteFloatString( "  \"%s\"\n  ( %d %d 0 0 0 )\n", GetMaterial(), this.GetWidth(), this.GetHeight());
////	}
////
////	fp.WriteFloatString( "  (\n" );
////	for ( i = 0; i < this.GetWidth(); i++ ) {
////		fp.WriteFloatString( "   ( " );
////		for ( j = 0; j < this.GetHeight(); j++ ) {
////			v = this.verts[ j * this.GetWidth() + i ];
////			fp.WriteFloatString( " ( %f %f %f %f %f )", v.xyz[0] + origin[0],
////								v.xyz[1] + origin[1], v.xyz[2] + origin[2], v.st[0], v.st[1] );
////		}
////		fp.WriteFloatString( " )\n" );
////	}
////	fp.WriteFloatString( "  )\n }\n}\n" );
////
////	return true;
////}

/*
===============
idMapPatch::GetGeometryCRC
===============
*/
	GetGeometryCRC ( ): number /*unsigned int*/ {
		var /*int */i: number, j: number;
		var /*unsigned int */crc: number;

		crc = this.GetHorzSubdivisions ( ) ^ this.GetVertSubdivisions ( );
		for ( i = 0; i < this.GetWidth ( ); i++ ) {
			for ( j = 0; j < this.GetHeight ( ); j++ ) {
				crc ^= FloatCRC( this.verts[j * this.GetWidth ( ) + i].xyz.x );
				crc ^= FloatCRC( this.verts[j * this.GetWidth ( ) + i].xyz.y );
				crc ^= FloatCRC( this.verts[j * this.GetWidth ( ) + i].xyz.z );
			}
		}

		crc ^= StringCRC( this.GetMaterial ( ) );
		crc = uint32( crc );
		dlog( DEBUG_MAP_FILE, "idMapPatch::GetGeometryCRC crc: %u\n", crc );
		return crc;
	}
}

class idMapBrush extends idMapPrimitive {
	////public:
	constructor ( ) {
		super ( );
		this.type = idMapPrimitive.TYPE_BRUSH;
		this.sides.Resize( 8, 4 );
	}
	destructor ( ): void { this.sides.DeleteContents( true ); }
	////	static idMapBrush *		Parse( idLexer &src, origin: idVec3, bool newFormat = true, float version = CURRENT_MAP_VERSION );
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

/*
=================
idMapBrush::Parse
=================
*/
	static Parse ( src: idLexer, origin: idVec3, newFormat = true, /*float */version = CURRENT_MAP_VERSION ): idMapBrush {
		var /*int */i: number;
		var planepts = [new idVec3, new idVec3, new idVec3];
		var token = new idToken;
		var sides = new idList<idMapBrushSide>( idMapBrushSide, true );
		var side: idMapBrushSide;
		var epairs = new idDict;

		if ( !src.ExpectTokenString( "{" ) ) {
			return null;
		}

		do {
			if ( !src.ReadToken( token ) ) {
				src.Error( "idMapBrush::Parse: unexpected EOF" );
				sides.DeleteContents( true );
				return null;
			}
			if ( token.data == "}" ) {
				break;
			}

			// here we may have to jump over brush epairs ( only used in editor )
			do {
				// if token is a brace
				if ( token.data == "(" ) {
					break;
				}
				// the token should be a key string for a key/value pair
				if ( token.type != TT_STRING ) {
					src.Error( "idMapBrush::Parse: unexpected %s, expected ( or epair key string", token.c_str ( ) );
					sides.DeleteContents( true );
					return null;
				}

				var key = new idStr( token );

				if ( !src.ReadTokenOnLine( token ) || token.type != TT_STRING ) {
					src.Error( "idMapBrush::Parse: expected epair value string not found" );
					sides.DeleteContents( true );
					return null;
				}

				epairs.Set( key.data, token.data );

				// try to read the next key
				if ( !src.ReadToken( token ) ) {
					src.Error( "idMapBrush::Parse: unexpected EOF" );
					sides.DeleteContents( true );
					return null;
				}
			} while ( 1 );

			src.UnreadToken( token );

			side = new idMapBrushSide ( );
			sides.Append( side );

			if ( newFormat ) {
				if ( !src.Parse1DMatrix( 4, side.plane.ToFloatPtr ( ) ) ) {
					src.Error( "idMapBrush::Parse: unable to read brush side plane definition" );
					sides.DeleteContents( true );
					return null;
				}
			} else {
				// read the three point plane definition
				if ( !src.Parse1DMatrix( 3, planepts[0].ToFloatPtr ( ) ) ||
					!src.Parse1DMatrix( 3, planepts[1].ToFloatPtr ( ) ) ||
					!src.Parse1DMatrix( 3, planepts[2].ToFloatPtr ( ) ) ) {
					src.Error( "idMapBrush::Parse: unable to read brush side plane definition" );
					sides.DeleteContents( true );
					return null;
				}

				planepts[0].opSubtractionAssignment( origin );
				planepts[1].opSubtractionAssignment( origin );
				planepts[2].opSubtractionAssignment( origin );

				side.plane.FromPoints( planepts[0], planepts[1], planepts[2] );
			}

			// read the texture matrix
			// this is odd, because the texmat is 2D relative to default planar texture axis
			if ( !src.Parse2DMatrix( 2, 3, side.texMat[0].ToFloatPtr ( ) ) ) {
				src.Error( "idMapBrush::Parse: unable to read brush side texture matrix" );
				sides.DeleteContents( true );
				return null;
			}
			side.origin.opEquals( origin );

			// read the material
			if ( !src.ReadTokenOnLine( token ) ) {
				src.Error( "idMapBrush::Parse: unable to read brush side material" );
				sides.DeleteContents( true );
				return null;
			}

			// we had an implicit 'textures/' in the old format...
			if ( version < 2.0 ) {
				side.material.equals( "textures/" + token.data );
			} else {
				side.material.equals( token );
			}

			// Q2 allowed override of default flags and values, but we don't any more
			if ( src.ReadTokenOnLine( token ) ) {
				if ( src.ReadTokenOnLine( token ) ) {
					if ( src.ReadTokenOnLine( token ) ) {
					}
				}
			}
		} while ( 1 );

		if ( !src.ExpectTokenString( "}" ) ) {
			sides.DeleteContents( true );
			return null;
		}

		var brush = new idMapBrush ( );
		for ( i = 0; i < sides.Num ( ); i++ ) {
			brush.AddSide( sides[i] );
		}

		brush.epairs.equals( epairs );

		return brush;
	}
////
/////*
////=================
////idMapBrush::ParseQ3
////=================
////*/
////idMapBrush *idMapBrush::ParseQ3( src:idLexer, const idVec3 &origin ) {
////	int i, shift[2], rotate;
////	float scale[2];
////	idVec3 planepts[3];
////	var token = new idToken;
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
////			return null;
////		}
////
////		planepts[0] -= origin;
////		planepts[1] -= origin;
////		planepts[2] -= origin;
////
////		side.plane.FromPoints( planepts[0], planepts[1], planepts[2] );
////
////		// read the material
////		if ( !src.ReadTokenOnLine( token ) ) {
////			src.Error( "idMapBrush::ParseQ3: unable to read brush side material" );
////			sides.DeleteContents( true );
////			return null;
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
////		side.texMat[0] = idVec3( 0.03125f, 0.0, 0.0 );
////		side.texMat[1] = idVec3( 0.0, 0.03125f, 0.0 );
////		side.origin = origin;
////		
////		// Q2 allowed override of default flags and values, but we don't any more
////		if ( src.ReadTokenOnLine( token ) ) {
////			if ( src.ReadTokenOnLine( token ) ) {
////				if ( src.ReadTokenOnLine( token ) ) {
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
////	brush.epairs.equals( epairs );
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
////	var/*int */i:number;
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
////	for ( i = 0; i < this.GetNumSides(); i++ ) {
////		side = this.GetSide( i );
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
/*
===============
idMapBrush::GetGeometryCRC
===============
*/
	GetGeometryCRC ( ): number /*unsigned int */ {
		var /*int */i: number, j: number;
		var mapSide: idMapBrushSide;
		var /*unsigned int */crc: number;

		crc = 0;
		for ( i = 0; i < this.GetNumSides ( ); i++ ) {
			mapSide = this.GetSide( i );
			for ( j = 0; j < 4; j++ ) {
				crc ^= FloatCRC( mapSide.GetPlane ( )[j] );
			}
			crc ^= StringCRC( mapSide.GetMaterial ( ) );
		}

		crc = uint32(crc);
		dlog(DEBUG_MAP_FILE, "idMapBrush::GetGeometryCRC crc: %u\n", crc);
		return crc;
	}
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
	GetNumPrimitives ( ): number { return this.primitives.Num ( ); }
	GetPrimitive ( /*int */i: number ): idMapPrimitive { return this.primitives[i]; }
	AddPrimitive ( p: idMapPrimitive ): void { this.primitives.Append( p ); }
////	unsigned int			GetGeometryCRC( ) const;
////	void					RemovePrimitiveData();
////
////protected:
	primitives = new idList<idMapPrimitive>( idMapPrimitive, true );

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

		if ( !src.ReadToken( token ) ) {
			return null;
		}

		if ( token.data != "{" ) {
			src.Error( "idMapEntity::Parse: { not found, found %s", token.c_str ( ) );
			return null;
		}

		mapEnt = new idMapEntity ( );

		if ( worldSpawn ) {
			mapEnt.primitives.Resize( 1024, 256 );
		}

		origin.Zero ( );
		worldent = false;
		do {
			if ( !src.ReadToken( token ) ) {
				src.Error( "idMapEntity::Parse: EOF without closing brace" );
				return null;
			}
			if ( token.data == "}" ) {
				break;
			}

			if ( token.data == "{" ) {
				// parse a brush or patch
				if ( !src.ReadToken( token ) ) {
					src.Error( "idMapEntity::Parse: unexpected EOF" );
					return null;
				}

				if ( worldent ) {
					origin.Zero ( );
				}

				// if is it a brush: brush, brushDef, brushDef2, brushDef3
				if ( token.Icmpn( "brush", 5 ) == 0 ) {
					mapBrush = idMapBrush.Parse( src, origin, ( !token.Icmp( "brushDef2" ) || !token.Icmp( "brushDef3" ) ), version );
					if ( !mapBrush ) {
						return null;
					}
					mapEnt.AddPrimitive( mapBrush );
				}
				// if is it a patch: patchDef2, patchDef3
				else if ( token.Icmpn( "patch", 5 ) == 0 ) {
					mapPatch = idMapPatch.Parse( src, origin, !token.Icmp( "patchDef3" ), version );
					if ( !mapPatch ) {
						return null;
					}
					mapEnt.AddPrimitive( mapPatch );
				}
				// assume it's a brush in Q3 or older style
				else {
					todoThrow ( );
					//src.UnreadToken( token );
					//mapBrush = idMapBrush.ParseQ3( src, origin );
					//if ( !mapBrush ) {
					//	return null;
					//}
					//mapEnt.AddPrimitive( mapBrush );
				}
			} else {
				var key = new idStr, value = new idStr;

				// parse a key / value pair
				key.equals( token );
				src.ReadTokenOnLine( token );
				value.equals( token );

				// strip trailing spaces that sometimes get accidentally
				// added in the editor
				value.StripTrailingWhitespace ( );
				key.StripTrailingWhitespace ( );

				mapEnt.epairs.Set( key.data, value.data );

				if ( !idStr.Icmp( key, "origin" ) ) {
					// scanf into doubles, then assign, so it is idVec size independent
					var res = sscanf( value.data, "%lf %lf %lf" );
					v1 = res[0], v2 = res[1], v3 = res[2];
					origin.x = v1;
					origin.y = v2;
					origin.z = v3;
				} else if ( !idStr.Icmp( key, "classname" ) && !idStr.Icmp( value, "worldspawn" ) ) {
					worldent = true;
				}
			}
		} while ( 1 );

		return mapEnt;
	}

/////*
////============
////idMapEntity::Write
////============
////*/
////bool idMapEntity::Write( idFile *fp, int entityNum ) const {
////	var/*int */i:number;
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
////	for ( i = 0; i < this.GetNumPrimitives(); i++ ) {
////		mapPrim = this.GetPrimitive( i );
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
/*
===============
idMapEntity::RemovePrimitiveData
===============
*/
	RemovePrimitiveData ( ): void {
		this.primitives.DeleteContents( true );
	}

/*
===============
idMapEntity::GetGeometryCRC
===============
*/
	GetGeometryCRC ( ): number /*idMapEntity::*/ {
		var /*int */i: number;
		var /*unsigned int */crc: number;
		var mapPrim: idMapPrimitive;

		crc = 0;
		for ( i = 0; i < this.GetNumPrimitives(); i++ ) {
			mapPrim = this.GetPrimitive( i );
			switch( mapPrim.GetType() ) {
				case idMapPrimitive.TYPE_BRUSH:
					crc ^= static_cast<idMapBrush>(mapPrim).GetGeometryCRC();
					break;
				case idMapPrimitive.TYPE_PATCH:
					crc ^= static_cast<idMapPatch>(mapPrim).GetGeometryCRC();
					break;
				default:
					todoThrow( "type should be set" );
			}
		}
		crc = uint32( crc );
		dlog(DEBUG_MAP_FILE, "idMapEntity::GetGeometryCRC crc: %u\n", crc);
		return crc;
	}
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
	GetPlane(): idPlane { return this.plane; }
	SetPlane(p: idPlane ):void { this.plane.opEquals( p ); }
	SetTextureMatrix(mat: idVec3[]/*[2]*/ ): void { this.texMat[0] = mat[0]; this. texMat[1] = mat[1]; }
	GetTextureMatrix(mat1: idVec3, mat2: idVec3): void { mat1.opEquals( this.texMat[0]); mat2 .opEquals(this.texMat[1]); }
////	void					GetTextureVectors( idVec4 v[2] ) const;
////
////protected:
	material = new idStr;
	plane = new idPlane;
	texMat = newStructArray<idVec3>( idVec3, 2 );
	origin = new idVec3;
////};

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
////	var/*int */i:number;
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
	private _geometryCRC = new Uint32Array(1);
	get geometryCRC(): number { return this._geometryCRC[0]; }
	set geometryCRC ( value: number ) {
		assert( value !== undefined );
		this._geometryCRC[0] = value;
	}

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
	Parse ( filename: string, ignoreRegion: boolean = false, osPath: boolean = false ): boolean {
		// no string concatenation for epairs and allow path names for materials
		var src = new idLexer( lexerFlags_t.LEXFL_NOSTRINGCONCAT | lexerFlags_t.LEXFL_NOSTRINGESCAPECHARS | lexerFlags_t.LEXFL_ALLOWPATHNAMES );
		var token = new idToken;
		var fullName = new idStr;
		var mapEnt: idMapEntity;
		var /*int */i: number, j: number, k: number;

		this.name.equals( filename );
		this.name.StripFileExtension ( );
		fullName.equals( this.name );
		this.hasPrimitiveData = false;

		if ( !ignoreRegion ) {
			// try loading a .reg file first
			fullName.SetFileExtension( "reg" );
			src.LoadFile( fullName.data, osPath );
		}

		if ( !src.IsLoaded ( ) ) {
			// now try a .map file
			fullName.SetFileExtension( "map" );
			src.LoadFile( fullName.data, osPath );
			if ( !src.IsLoaded ( ) ) {
				// didn't get anything at all
				return false;
			}
		}

		this.version = OLD_MAP_VERSION;
		this.fileTime = src.GetFileTime ( );
		this.entities.DeleteContents( true );

		if ( src.CheckTokenString( "Version" ) ) {
			src.ReadTokenOnLine( token );
			this.version = token.GetFloatValue ( );
		}

		while ( 1 ) {
			mapEnt = idMapEntity.Parse( src, ( this.entities.Num ( ) == 0 ), this.version );
			if ( !mapEnt ) {
				break;
			}
			this.entities.Append( mapEnt );
		}

		this.SetGeometryCRC ( );

		// if the map has a worldspawn
		if ( this.entities.Num ( ) ) {

			// "removeEntities" "classname" can be set in the worldspawn to remove all entities with the given classname
			var removeEntities: idKeyValue = this.entities[0].epairs.MatchPrefix( "removeEntities", null );
			while ( removeEntities ) {
				this.RemoveEntities( removeEntities.GetValue ( ).data );
				removeEntities = this.entities[0].epairs.MatchPrefix( "removeEntities", removeEntities );
			}

			// "overrideMaterial" "material" can be set in the worldspawn to reset all materials
			var material = new idStr;
			if ( this.entities[0].epairs.GetString_RidStr( "overrideMaterial", "", material ) ) {
				for ( i = 0; i < this.entities.Num ( ); i++ ) {
					mapEnt = this.entities[i];
					for ( j = 0; j < mapEnt.GetNumPrimitives ( ); j++ ) {
						var mapPrimitive = mapEnt.GetPrimitive( j );
						switch ( mapPrimitive.GetType ( ) ) {
						case idMapPrimitive.TYPE_BRUSH:
						{
							var mapBrush = static_cast<idMapBrush>( mapPrimitive );
							for ( k = 0; k < mapBrush.GetNumSides ( ); k++ ) {
								mapBrush.GetSide( k ).SetMaterial( material.data );
							}
							break;
						}
						case idMapPrimitive.TYPE_PATCH:
						{
							static_cast<idMapPatch>( mapPrimitive ).SetMaterial( material.data );
							break;
						}
						}
					}
				}
			}

			// force all this.entities to have a name key/value pair
			if ( this.entities[0].epairs.GetBool( "forceEntityNames" ) ) {
				for ( i = 1; i < this.entities.Num ( ); i++ ) {
					mapEnt = this.entities[i];
					if ( !mapEnt.epairs.FindKey( "name" ) ) {
						mapEnt.epairs.Set( "name", va( "%s%d", mapEnt.epairs.GetString( "classname", "forcedName" ), i ) );
					}
				}
			}

			// move the primitives of any func_group this.entities to the worldspawn
			if ( this.entities[0].epairs.GetBool( "moveFuncGroups" ) ) {
				for ( i = 1; i < this.entities.Num ( ); i++ ) {
					mapEnt = this.entities[i];
					if ( idStr.Icmp( mapEnt.epairs.GetString( "classname" ), "func_group" ) == 0 ) {
						this.entities[0].primitives.Append_idList( mapEnt.primitives );
						mapEnt.primitives.Clear ( );
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
////	var/*int */i:number;
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

		assertMapSpecific(assertMapsList.demo_mars_city1, this.geometryCRC == 3487349886 );
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
////	return null;
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
/*
===============
idMapFile::RemovePrimitiveData
===============
*/
	RemovePrimitiveData ( ): void {
		for ( var i = 0; i < this.entities.Num ( ); i++ ) {
			var ent = this.entities[i];
			ent.RemovePrimitiveData ( );
		}
		this.hasPrimitiveData = false;
	}

/*
===============
idMapFile::NeedsReload
===============
*/
	NeedsReload ( ): boolean {
		if ( this.name.Length ( ) ) {
			var time = /*(ID_TIME_T)*/ new R( -1 );
			if ( /*idLib::*/fileSystem.ReadFile( this.name.data, null, time ) > 0 ) {
				return ( time.$ > this.fileTime );
			}
		}
		return true;
	}
}