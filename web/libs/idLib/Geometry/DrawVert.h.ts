///*
//===========================================================================

//Doom 3 GPL Source Code
//Copyright (C) 1999-2011 id Software LLC, a ZeniMax Media company. 

//This file is part of the Doom 3 GPL Source Code (?Doom 3 Source Code?).  

//Doom 3 Source Code is free software: you can redistribute it and/or modify
//it under the terms of the GNU General Public License as published by
//the Free Software Foundation, either version 3 of the License, or
//(at your option) any later version.

//Doom 3 Source Code is distributed in the hope that it will be useful,
//but WITHOUT ANY WARRANTY; without even the implied warranty of
//MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//GNU General Public License for more details.

//You should have received a copy of the GNU General Public License
//along with Doom 3 Source Code.  If not, see <http://www.gnu.org/licenses/>.

//In addition, the Doom 3 Source Code is also subject to certain additional terms. You should have received a copy of these additional terms immediately following the terms and conditions of the GNU General Public License which accompanied the Doom 3 Source Code.  If not, please request a copy in writing from id Software at the address below.

//If you have questions concerning this license or the applicable additional terms, you may contact in writing id Software LLC, c/o ZeniMax Media Inc., Suite 120, Rockville, Maryland 20850 USA.

//===========================================================================
//*/

//#ifndef __DRAWVERT_H__
//#define __DRAWVERT_H__

///*
//===============================================================================

//	Draw Vertex.

//===============================================================================
//*/

class idDrawVert {
//public:
	xyz: idVec3;
	st: idVec2;
	normal: idVec3;
	tangents: idVec3[/*2*/];
	color:Uint8Array/*4*/;
//#if 0 // was MACOS_X see comments concerning DRAWVERT_PADDED in Simd_Altivec.h 
//	float			padding;
//#endif
//	float			operator[]( const int index ) const;
//	float &			operator[]( const int index );

//	void			Clear( void );

//	void			Lerp( const idDrawVert &a, const idDrawVert &b, const float f );
//	void			LerpAll( const idDrawVert &a, const idDrawVert &b, const float f );

//	void			Normalize( void );

//	void			SetColor( dword color );
//	dword			GetColor( void ) const;
//};
	
	constructor ( ) {
		this.xyz = new idVec3;
		this.st = new idVec2;
		this.normal = new idVec3;
		this.tangents = [new idVec3, new idVec3];
		this.color = new Uint8Array( 4 );
	}

	equals ( other: idDrawVert ): void {
		this.xyz.equals(other.xyz );
		this.st.equals( other.st );
		this.normal.equals( other.normal );
		this.tangents[0].equals( other.tangents[0] );
		this.tangents[1].equals(other.tangents[1]);
		this.color[0] = other.color[0];
		this.color[1] = other.color[1];
		this.color[2] = other.color[2];
		this.color[3] = other.color[3];
	}

	public static size = 60;

	writeToDataView ( dv: DataView, offset: number ): void {
		var i = offset + -4;
		dv.setFloat32( i += 4, this.xyz[0], true );
		dv.setFloat32( i += 4, this.xyz[1], true );
		dv.setFloat32( i += 4, this.xyz[2], true );

		dv.setFloat32( i += 4, this.st[0], true );
		dv.setFloat32( i += 4, this.st[1], true );

		dv.setFloat32( i += 4, this.normal[0], true );
		dv.setFloat32( i += 4, this.normal[1], true );
		dv.setFloat32( i += 4, this.normal[2], true );

		dv.setFloat32( i += 4, this.tangents[0][0], true );
		dv.setFloat32( i += 4, this.tangents[0][1], true );
		dv.setFloat32( i += 4, this.tangents[0][2], true );

		dv.setFloat32( i += 4, this.tangents[1][0], true );
		dv.setFloat32( i += 4, this.tangents[1][1], true );
		dv.setFloat32( i += 4, this.tangents[1][2], true );

		dv.setUint8( i++, this.color[0] );
		dv.setUint8( i++, this.color[1] );
		dv.setUint8( i++, this.color[2] );
		dv.setUint8( i++, this.color[3] );
	}

	static toArrayBuffer ( verts: idDrawVert[], numVerts: number ): ArrayBuffer {
		var dv = new DataView( new ArrayBuffer( numVerts * idDrawVert.size ) );
		for ( var i = 0; i < numVerts; i++ ) {
			verts[i].writeToDataView( dv, i * idDrawVert.size );
		}

		return dv.buffer;
	}

//IDcolor:Uint8Array/*4*/;_INLINE float idDrawVert::operator[]( const int index ) const {
//	assert( index >= 0 && index < 5 );
//	return ((float *)(&xyz))[index];
//}
//ID_INLINE float	&idDrawVert::operator[]( const int index ) {
//	assert( index >= 0 && index < 5 );
//	return ((float *)(&xyz))[index];
//}

	Clear ( ): void {
		this.xyz.Zero ( );
		this.st.Zero ( );
		this.normal.Zero ( );
		this.tangents[0].Zero ( );
		this.tangents[1].Zero ( );
		this.color[0] = this.color[1] = this.color[2] = this.color[3] = 0;
	}

//ID_INLINE void idDrawVert::Lerp( const idDrawVert &a, const idDrawVert &b, const float f ) {
//	xyz = a.xyz + f * ( b.xyz - a.xyz );
//	st = a.st + f * ( b.st - a.st );
//}

//ID_INLINE void idDrawVert::LerpAll( const idDrawVert &a, const idDrawVert &b, const float f ) {
//	xyz = a.xyz + f * ( b.xyz - a.xyz );
//	st = a.st + f * ( b.st - a.st );
//	normal = a.normal + f * ( b.normal - a.normal );
//	tangents[0] = a.tangents[0] + f * ( b.tangents[0] - a.tangents[0] );
//	tangents[1] = a.tangents[1] + f * ( b.tangents[1] - a.tangents[1] );
//	color[0] = (byte)( a.color[0] + f * ( b.color[0] - a.color[0] ) );
//	color[1] = (byte)( a.color[1] + f * ( b.color[1] - a.color[1] ) );
//	color[2] = (byte)( a.color[2] + f * ( b.color[2] - a.color[2] ) );
//	color[3] = (byte)( a.color[3] + f * ( b.color[3] - a.color[3] ) );
//}

//ID_INLINE void idDrawVert::SetColor( dword color ) {
//	*reinterpret_cast<dword *>(this.color) = color;
//}

//ID_INLINE dword idDrawVert::GetColor( void ) const {
//	return *reinterpret_cast<const dword *>(this.color);
//}

//#endif /* !__DRAWVERT_H__ */


//DrawVert.cpp:

/////*
////=============
////idDrawVert::Normalize
////=============
////*/
////void idDrawVert::Normalize( void ) {
////	normal.Normalize();
////	tangents[1].Cross( normal, tangents[0] );
////	tangents[1].Normalize();
////	tangents[0].Cross( tangents[1], normal );
////	tangents[0].Normalize();
////}
	ToString ( ): string {
		return va("xyz: %s", this.xyz.ToString());
	}
}

// todo: remove later on
Object.defineProperty( idDrawVert.prototype, "0", {
	get: function ( ): number {
		return this.xyz[0];
	},
	set: function ( value: number ): void {
		if ( value === undefined ) {
			throw 'Undefined value';
		}
		if (typeof value !== "number") {
			throw 'must be number type';
		}
		this.xyz[0] = value;
	},
	enumerable: false,
	configurable: false
} );

Object.defineProperty( idDrawVert.prototype, "1", {
	get: function ( ): number {
		return this.xyz[1];
	},
	set: function ( value: number ): void {
		if ( value === undefined ) {
			throw 'Undefined value';
		}
		if (typeof value !== "number") {
			throw 'must be number type';
		}
		this.xyz[1] = value;
	},
	enumerable: false,
	configurable: false
} );

Object.defineProperty( idDrawVert.prototype, "2", {
	get: function ( ): number {
		return this.xyz[2];
	},
	set: function ( value: number ): void {
		if ( value === undefined ) {
			throw 'Undefined value';
		}
		if ( typeof value !== "number") {
			throw 'must be number type';
		}
		this.xyz[2] = value;
	},
	enumerable: false,
	configurable: false
} );