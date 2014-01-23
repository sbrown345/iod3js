/// <reference path="../../libs/idlib/text/lexer.cpp.ts" />
/// <reference path="tr_main.cpp.ts" />
/// <reference path="image_files.cpp.ts" />
/// <reference path="image.h.ts" />

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

/////*

////all uncompressed
////uncompressed normal maps

////downsample images

////16 meg Dynamic cache

////Anisotropic texturing

////Trilinear on all
////Trilinear on normal maps, bilinear on others
////Bilinear on all


////Manager

////.List
////.Print
////.Reload( bool force )

////*/

////#include "../idlib/precompiled.h"
////#pragma hdrstop

////// tr_imageprogram.c

////#include "tr_local.h"

/////*

////Anywhere that an image name is used (diffusemaps, bumpmaps, specularmaps, lights, etc),
////an imageProgram can be specified.

////This allows load time operations, like heightmap-to-normalmap conversion and image
////composition, to be automatically handled in a way that supports timestamped reloads.

////*/

/*
=================
R_HeightmapToNormalMap

it is not possible to convert a heightmap into a normal map
properly without knowing the texture coordinate stretching.
We can assume constant and equal ST vectors for walls, but not for characters.
=================
*/
function R_HeightmapToNormalMap( /*byte **/data:Uint8Array, /*int */width:number, /*int */height:number, /*float */scale:number ):void {
	todoThrow();
////	int		i, j;
////	byte	*depth;

////	scale = scale / 256;

////	// copy and convert to grey scale
////	j = width * height;
////	depth = (byte *)R_StaticAlloc( j );
////	for ( i = 0 ; i < j ; i++ ) {
////		depth[i] = ( data[i*4] + data[i*4+1] + data[i*4+2] ) / 3;
////	}

////	idVec3	dir, dir2;
////	for ( i = 0 ; i < height ; i++ ) {
////		for ( j = 0 ; j < width ; j++ ) {
////			int		d1, d2, d3, d4;
////			int		a1, a2, a3, a4;

////			// FIXME: look at five points?

////			// look at three points to estimate the gradient
////			a1 = d1 = depth[ ( i * width + j ) ];
////			a2 = d2 = depth[ ( i * width + ( ( j + 1 ) & ( width - 1 ) ) ) ];
////			a3 = d3 = depth[ ( ( ( i + 1 ) & ( height - 1 ) ) * width + j ) ];
////			a4 = d4 = depth[ ( ( ( i + 1 ) & ( height - 1 ) ) * width + ( ( j + 1 ) & ( width - 1 ) ) ) ];

////			d2 -= d1;
////			d3 -= d1;

////			dir[0] = -d2 * scale;
////			dir[1] = -d3 * scale;
////			dir[2] = 1;
////			dir.NormalizeFast();

////			a1 -= a3;
////			a4 -= a3;

////			dir2[0] = -a4 * scale;
////			dir2[1] = a1 * scale;
////			dir2[2] = 1;
////			dir2.NormalizeFast();
	
////			dir += dir2;
////			dir.NormalizeFast();

////			a1 = ( i * width + j ) * 4;
////			data[ a1 + 0 ] = (byte)(dir[0] * 127 + 128);
////			data[ a1 + 1 ] = (byte)(dir[1] * 127 + 128);
////			data[ a1 + 2 ] = (byte)(dir[2] * 127 + 128);
////			data[ a1 + 3 ] = 255;
////		}
////	}


////	R_StaticFree( depth );
}


/*
=================
R_ImageScale
=================
*/
function R_ImageScale( data:Uint8Array, /*int */width:number, /*int*/height:number, scale:Float32Array): void
{
	todoThrow ( );
////	int		i, j;
////	int		c;

////	c = width * height * 4;

////	for ( i = 0 ; i < c ; i++ ) {
////		j = (byte)(data[i] * scale[i&3]);
////		if ( j < 0 ) {
////			j = 0;
////		} else if ( j > 255 ) {
////			j = 255;
////		}
////		data[i] = j;
////	}
}

/*
=================
R_InvertAlpha
=================
*/
function R_InvertAlpha( data:Uint8Array, /*int*/width: number, /*int*/height: number): void {
	var /*int		*/i:number;
	var/*int		*/c:number;

	c = width * height* 4;

	for ( i = 0 ; i < c ; i+=4 ) {
		data[i+3] = 255 - data[i+3];
	}
}

/*
=================
R_InvertColor
=================
*/
function R_InvertColor( data:Uint8Array, /*int*/width:number, /*int*/height:number ):void {
	var /*int		*/i: number;
	var/*int		*/c: number;

	c = width * height* 4;

	for ( i = 0 ; i < c ; i+=4 ) {
		data[i+0] = 255 - data[i+0];
		data[i+1] = 255 - data[i+1];
		data[i+2] = 255 - data[i+2];
	}
}


/*
===================
R_AddNormalMaps

===================
*/
function R_AddNormalMaps(data1: Uint8Array, /*int */width1: number, /*int */height1: number, data2: Uint8Array, /*int */width2: number, /*int */height2: number):void {
	todoThrow();
////	int		i, j;
////	byte	*newMap;

////	// resample pic2 to the same size as pic1
////	if ( width2 != width1 || height2 != height1 ) {
////		newMap = R_Dropsample( data2, width2, height2, width1, height1 );
////		data2 = newMap;
////	} else {
////		newMap = NULL;
////	}

////	// add the normal change from the second and renormalize
////	for ( i = 0 ; i < height1 ; i++ ) {
////		for ( j = 0 ; j < width1 ; j++ ) {
////			byte	*d1, *d2;
////			idVec3	n;
////			float   len;

////			d1 = data1 + ( i * width1 + j ) * 4;
////			d2 = data2 + ( i * width1 + j ) * 4;

////			n[0] = ( d1[0] - 128 ) / 127.0;
////			n[1] = ( d1[1] - 128 ) / 127.0;
////			n[2] = ( d1[2] - 128 ) / 127.0;

////			// There are some normal maps that blend to 0,0,0 at the edges
////			// this screws up compression, so we try to correct that here by instead fading it to 0,0,1
////			len = n.LengthFast();
////			if ( len < 1.0f ) {
////				n[2] = idMath::Sqrt(1.0 - (n[0]*n[0]) - (n[1]*n[1]));
////			}

////			n[0] += ( d2[0] - 128 ) / 127.0;
////			n[1] += ( d2[1] - 128 ) / 127.0;
////			n.Normalize();

////			d1[0] = (byte)(n[0] * 127 + 128d1
////			);[1] = (byte)(n[1] * 127 + 128);
////			d1[2] = (byte)(n[2] * 127 + 128);
////			d1[3] = 255;
////		}
////	}

////	if ( newMap ) {
////		R_StaticFree( newMap );
////	}
}

/*
================
R_SmoothNormalMap
================
*/
function R_SmoothNormalMap( /*byte **/data:Uint8Array, /*int */width:number, /*int */height:number ):void {
	todoThrow();
////	byte	*orig;
////	int		i, j, k, l;
////	idVec3	normal;
////	byte	*out;
////	static float	factors[3][3] = {
////		{ 1, 1, 1 },
////		{ 1, 1, 1 },
////		{ 1, 1, 1 }
////	};

////	orig = (byte *)R_StaticAlloc( width * height * 4 );
////	memcpy( orig, data, width * height * 4 );

////	for ( i = 0 ; i < width ; i++ ) {
////		for ( j = 0 ; j < height ; j++ ) {
////			normal = vec3_origin;
////			for ( k = -1 ; k < 2 ; k++ ) {
////				for ( l = -1 ; l < 2 ; l++ ) {
////					byte	*in;

////					in = orig + ( ((j+l)&(height-1))*width + ((i+k)&(width-1)) ) * 4;

////					// ignore 000 and -1 -1 -1
////					if ( in[0] == 0 && in[1] == 0 && in[2] == 0 ) {
////						continue;
////					}
////					if ( in[0] == 128 && in[1] == 128 && in[2] == 128 ) {
////						continue;
////					}

////					normal[0] += factors[k+1][l+1] * ( in[0] - 128 );
////					normal[1] += factors[k+1][l+1] * ( in[1] - 128 );
////					normal[2] += factors[k+1][l+1] * ( in[2] - 128 );
////				}
////			}
////			normal.Normalize();
////			out = data + ( j * width + i ) * 4;
////			out[0] = (byte)(128 + 127 * normal[0]);
////			out[1] = (byte)(128 + 127 * normal[1]);
////			out[2] = (byte)(128 + 127 * normal[2]);
////		}
////	}

////	R_StaticFree( orig );
}


/*
===================
R_ImageAdd

===================
*/
function R_ImageAdd(data1: Uint8Array, /*int */width1: number, /*int */height1: number, data2: Uint8Array, /*int */width2: number, /*int */height2: number):void {
	todoThrow ( );
////	int		i, j;
////	int		c;
////	byte	*newMap;

////	// resample pic2 to the same size as pic1
////	if ( width2 != width1 || height2 != height1 ) {
////		newMap = R_Dropsample( data2, width2, height2, width1, height1 );
////		data2 = newMap;
////	} else {
////		newMap = NULL;
////	}


////	c = width1 * height1 * 4;

////	for ( i = 0 ; i < c ; i++ ) {
////		j = data1[i] + data2[i];
////		if ( j > 255 ) {
////			j = 255;
////		}
////		data1[i] = j;
////	}

////	if ( newMap ) {
////		R_StaticFree( newMap );
////	}
}


// we build a canonical token form of the image program here
var parseBuffer = "";

/*
===================
AppendToken
===================
*/
function AppendToken ( token: R<idToken> ): void {
	// add a leading space if not at the beginning
	if ( parseBuffer ) {
		parseBuffer += " ";
	}
	parseBuffer += token.$.c_str ( );
}

/*
===================
MatchAndAppendToken
===================
*/
function MatchAndAppendToken(src: idLexer , match:string ) {
	if ( !src.ExpectTokenString( match ) ) {
		return;
	}
	// a matched token won't need a leading space
	parseBuffer += match;
}

/*
===================
R_ParseImageProgram_r

If pic is NULL, the timestamps will be filled in, but no image will be generated
If both pic and timestamps are NULL, it will just advance past it, which can be
used to parse an image program from a text stream.
===================
*/
function R_ParseImageProgram_r(src: idLexer, /*byte ***/pic: R<Uint8Array>, /*int **/width: R<number>, /*int **/height: R<number>,
	/*ID_TIME_T **/timestamps: R<number>, depth: R<textureDepth_t> ):boolean {
	var token = new R(new idToken);
	var/*float		*/scale:number;
	var timestamp = new R<number>(0);

	src.ReadToken( token );
	AppendToken( token );

	if ( !token.$.Icmp( "heightmap" ) ) {
		MatchAndAppendToken( src, "(" );

		if ( !R_ParseImageProgram_r( src, pic, width, height, timestamps, depth ) ) {
			return false;
		}

		MatchAndAppendToken( src, "," );

		src.ReadToken( token );
		this.AppendToken( token );
		scale = token.$.GetFloatValue();
		
		// process it
		if ( pic ) {
			R_HeightmapToNormalMap( pic.$, width.$, height.$, scale );
			if ( depth ) {
				depth.$ = textureDepth_t.TD_BUMP;
			}
		}

		MatchAndAppendToken( src, ")" );
		return true;
	}

	if ( !token.$.Icmp( "addnormals" ) ) {
		var /*byte	**/pic2 = new R<Uint8Array>();
		var /*int		*/width2 = new R<number>(0), height2 = new R<number>(0);

		MatchAndAppendToken( src, "(" );

		if ( !R_ParseImageProgram_r( src, pic, width, height, timestamps, depth ) ) {
			return false;
		}

		MatchAndAppendToken( src, "," );

		if ( !R_ParseImageProgram_r( src, pic ? /*&*/pic2 : null, width2, height2, timestamps, depth ) ) {
			if ( pic ) {
				R_StaticFree( pic.$ );
				pic.$ = null;
			}
			return false;
		}
		
		// process it
		if ( pic ) {
			R_AddNormalMaps( pic.$, width.$, height.$, pic2.$, width2.$, height2.$ );
			R_StaticFree( pic2 );
			if ( depth ) {
				depth.$ = textureDepth_t.TD_BUMP;
			}
		}

		MatchAndAppendToken( src, ")" );
		return true;
	}

	if ( !token.$.Icmp( "smoothnormals" ) ) {
		MatchAndAppendToken( src, "(" );

		if ( !R_ParseImageProgram_r( src, pic, width, height, timestamps, depth ) ) {
			return false;
		}

		if ( pic ) {
			R_SmoothNormalMap( pic.$, width.$, height.$ );
			if ( depth ) {
				depth.$ = textureDepth_t.TD_BUMP;
			}
		}

		MatchAndAppendToken( src, ")" );
		return true;
	}

	if ( !token.$.Icmp( "add" ) ) {
		var pic2 = new R<Uint8Array> ( );
		var /*int		*/width2 = new R<number>(0), height2 = new R<number> ( );

		MatchAndAppendToken( src, "(" );

		if ( !R_ParseImageProgram_r( src, pic, width, height, timestamps, depth ) ) {
			return false;
		}

		MatchAndAppendToken( src, "," );

		if ( !R_ParseImageProgram_r( src, pic ? pic2 : null, width2, height2, timestamps, depth ) ) {
			if ( pic ) {
				//R_StaticFree( pic.$ );
				pic = null;
			}
			return false;
		}
		
		// process it
		if ( pic ) {
			R_ImageAdd(pic.$, width.$, height.$, pic2.$, width2.$, height2.$ );
			R_StaticFree( pic2 );
		}

		MatchAndAppendToken( src, ")" );
		return true;
	}

	if ( !token.$.Icmp( "scale" ) ) {
		var scale_ = new Float32Array(4);
		var i: number;

		MatchAndAppendToken( src, "(" );

		R_ParseImageProgram_r( src, pic, width, height, timestamps, depth );

		for ( i = 0 ; i < 4 ; i++ ) {
			MatchAndAppendToken( src, "," );
			src.ReadToken( token );
			this.AppendToken( token );
			scale_[i] = token.$.GetFloatValue();
		}

		// process it
		if ( pic ) {
			R_ImageScale(pic.$, width.$, height.$, scale_ );
		}

		MatchAndAppendToken( src, ")" );
		return true;
	}

	if ( !token.$.Icmp( "invertAlpha" ) ) {
		MatchAndAppendToken( src, "(" );

		R_ParseImageProgram_r( src, pic, width, height, timestamps, depth );

		// process it
		if ( pic ) {
			R_InvertAlpha( pic.$, width.$, height.$ );
		}

		MatchAndAppendToken( src, ")" );
		return true;
	}

	if ( !token.$.Icmp( "invertColor" ) ) {
		MatchAndAppendToken( src, "(" );

		R_ParseImageProgram_r( src, pic, width, height, timestamps, depth );

		// process it
		if ( pic ) {
			R_InvertColor( pic.$, width.$, height.$ );
		}

		MatchAndAppendToken( src, ")" );
		return true;
	}

	if ( !token.$.Icmp( "makeIntensity" ) ) {
		var i:number;

		MatchAndAppendToken( src, "(" );

		R_ParseImageProgram_r( src, pic, width, height, timestamps, depth );

		// copy red to green, blue, and alpha
		if ( pic ) {
			var/*int		*/c:number;
			c = width.$ * height.$ * 4;
			for ( i = 0 ; i < c ; i+=4 ) {
				(pic.$)[i+1] = 
				(pic.$)[i+2] = 
				(pic.$)[i+3] = (pic.$)[i];
			}
		}

		MatchAndAppendToken( src, ")" );
		return true;
	}

	if ( !token.$.Icmp( "makeAlpha" ) ) {
		var i: number;

		MatchAndAppendToken( src, "(" );

		R_ParseImageProgram_r( src, pic, width, height, timestamps, depth );

		// average RGB into alpha, then set RGB to white
		if ( pic ) {
			var /*int		*/c: number;
			c = width.$ * height.$ * 4;
			for ( i = 0 ; i < c ; i+=4 ) {
				(pic.$)[i+3] = ( (pic.$)[i+0] + (pic.$)[i+1] + (pic.$)[i+2] ) / 3;
				(pic.$)[i+0] = 
				(pic.$)[i+1] = 
				(pic.$)[i+2] = 255;
			}
		}

		MatchAndAppendToken( src, ")" );
		return true;
	}

	// if we are just parsing instead of loading or checking,
	// don't do the R_LoadImage
	if ( !timestamps && !pic ) {
		return true;
	}

	// load it as an image
	R_LoadImage( token.$.c_str(), pic, width, height, timestamp, true );

	if ( timestamp.$ == -1 ) {
		return false;
	}

	// add this to the timestamp
	if ( timestamps ) {
		if (timestamp.$ > timestamps.$ ) {
			timestamps.$ = timestamp.$;
		}
	}

	return true;
}


/*
===================
R_LoadImageProgram
===================
*/
function R_LoadImageProgram(name: string, /*byte ***/pic: R<Uint8Array>, /*int **/width: R<number>, /*int **/height: R<number>, /*ID_TIME_T **/timestamps: R<number>, depth: R<textureDepth_t> ):void {
	var src = new idLexer;

	src.LoadMemory( name, strlen(name), name );
	src.SetFlags( lexerFlags_t.LEXFL_NOFATALERRORS | lexerFlags_t.LEXFL_NOSTRINGCONCAT | lexerFlags_t.LEXFL_NOSTRINGESCAPECHARS | lexerFlags_t.LEXFL_ALLOWPATHNAMES );

	parseBuffer = "";
	if ( timestamps ) {
		timestamps.$ = 0;
	}

	R_ParseImageProgram_r( src, pic, width, height, timestamps, depth );

	src.FreeSource();
}

/*
===================
R_ParsePastImageProgram
===================
*/
function R_ParsePastImageProgram ( src: idLexer ): string {
	parseBuffer = "";
	R_ParseImageProgram_r(src, null, null, null, null, null );
	return parseBuffer;
}
