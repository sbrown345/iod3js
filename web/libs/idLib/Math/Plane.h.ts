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
//#ifndef __MATH_PLANE_H__
//#define __MATH_PLANE_H__

/*
===============================================================================

	3D plane with equation: a * x + b * y + c * z + d = 0

===============================================================================
*/


//class idVec3;
//class idMat3;

var	ON_EPSILON					=0.1;
var DEGENERATE_DIST_EPSILON		=1e-4;

var	SIDE_FRONT					=0;
var	SIDE_BACK					=1;
var	SIDE_ON						=2;
var	SIDE_CROSS					=3;

// plane sides
var PLANESIDE_FRONT				=0;
var PLANESIDE_BACK				=1;
var PLANESIDE_ON				=2;
var PLANESIDE_CROSS				=3;
								
// plane types					
var PLANETYPE_X					=0;
var PLANETYPE_Y					=1;
var PLANETYPE_Z					=2;
var PLANETYPE_NEGX				=3;
var PLANETYPE_NEGY				=4;
var PLANETYPE_NEGZ				=5;
var PLANETYPE_TRUEAXIAL			=6;	// all types < 6 are true axial planes
var PLANETYPE_ZEROX				=6;
var PLANETYPE_ZEROY				=7;
var PLANETYPE_ZEROZ				=8;
var PLANETYPE_NONAXIAL			=9;

class idPlane {
	static size = 16;

	//public:
	//					idPlane( );
	//					idPlane( float a, float b, float c, float d );
	//					idPlane( const idVec3 &normal, const float dist );
	//
	//	float			operator[]( int index ) const;
	//	float &			operator[]( int index );
	//	idPlane			operator-() const;						// flips plane
	//	idPlane &		operator=( const idVec3 &v );			// sets normal and sets idPlane::d to zero
	//	idPlane			operator+( const idPlane &p ) const;	// add plane equations
	//	idPlane			operator-( const idPlane &p ) const;	// subtract plane equations
	//	idPlane &		operator*=( const idMat3 &m );			// Normal() *= m
	//
	//	bool			Compare( const idPlane &p ) const;						// exact compare, no epsilon
	//	bool			Compare( const idPlane &p, const float epsilon ) const;	// compare with epsilon
	//	bool			Compare( const idPlane &p, const float normalEps, const float distEps ) const;	// compare with epsilon
	//	bool			operator==(	const idPlane &p ) const;					// exact compare, no epsilon
	//	bool			operator!=(	const idPlane &p ) const;					// exact compare, no epsilon
	//
	//	void			Zero( );							// zero plane
	//	void			SetNormal( const idVec3 &normal );		// sets the normal
	//	const idVec3 &	Normal( ) const;					// reference to const normal
	//	idVec3 &		Normal( );							// reference to normal
	//	float			Normalize( bool fixDegenerate = true );	// only normalizes the plane normal, does not adjust d
	//	bool			FixDegenerateNormal( );			// fix degenerate normal
	//	bool			FixDegeneracies( float distEpsilon );	// fix degenerate normal and dist
	//	float			Dist( ) const;						// returns: -d
	//	void			SetDist( const float dist );			// sets: d = -dist
	//	int				Type( ) const;						// returns plane type
	//
	//	bool			FromPoints( const idVec3 &p1, const idVec3 &p2, const idVec3 &p3, bool fixDegenerate = true );
	//	bool			FromVecs( const idVec3 &dir1, const idVec3 &dir2, const idVec3 &p, bool fixDegenerate = true );
	//	void			FitThroughPoint( const idVec3 &p );	// assumes normal is valid
	//	bool			HeightFit( const idVec3 *points, const int numPoints );
	//	idPlane			Translate( const idVec3 &translation ) const;
	//	idPlane &		TranslateSelf( const idVec3 &translation );
	//	idPlane			Rotate( const idVec3 &origin, const idMat3 &axis ) const;
	//	idPlane &		RotateSelf( const idVec3 &origin, const idMat3 &axis );
	//
	//	float			Distance( const idVec3 &v ) const;
	//	int				Side( const idVec3 &v, const float epsilon = 0.0 ) const;
	//
	//	bool			LineIntersection( start:idVec3, end:idVec3 ) const;
	//					// intersection point is start + dir * scale
	//	bool			RayIntersection( start:idVec3, const idVec3 &dir, float &scale ) const;
	//	bool			PlaneIntersection( const idPlane &plane, idVec3 &start, idVec3 &dir ) const;
	//
	//	int				GetDimension( ) const;
	//
	//	const idVec4 &	ToVec4( ) const;
	//	idVec4 &		ToVec4( );
	//	const float *	ToFloatPtr( ) const;
	//	float *			ToFloatPtr( );
	//	const char *	ToString( int precision = 2 ) const;
	//
	//private:
	//a:number; //	float			
	//b:number; //	float			
	//c:number; //	float			
	//d: number; //	float		

	values = new Float32Array(4);	

	get a ( ): number { return this.values[0]; }

	set a ( value: number ) {
		if ( value === undefined ) {
			throw 'Undefined value';
		}
		this.values[0] = value;
	}

	get b ( ): number { return this.values[1]; }

	set b ( value: number ) {
		if ( value === undefined ) {
			throw 'Undefined value';
		}
		this.values[1] = value;
	}

	get c ( ): number { return this.values[2]; }

	set c ( value: number ) {
		if ( value === undefined ) {
			throw 'Undefined value';
		}
		this.values[2] = value;
	}

	get d ( ): number { return this.values[3]; }

	set d ( value: number ) {
		if ( value === undefined ) {
			throw 'Undefined value';
		}
		this.values[3] = value;
	}
	
	//extern idPlane plane_origin;
	//#define plane_zero plane_origin

	constructor ( )
	constructor ( normal: idVec3, dist: number /*float*/ )
	constructor ( a: number /*float*/, b: number /*float*/, c: number /*float*/, d: number /*float*/ )
	constructor ( a1?: any, a2?: any, a3?: any, a4?: any ) {
		if ( arguments.length == 0 ) {
			return;
		}

		if ( arguments.length == 4 ) {
			this.a = a1;
			this.b = a2;
			this.c = a3;
			this.d = a4;
		} else if ( arguments.length == 2 ) {
			var normal = <idVec3>a1, dist = <number>a2;

			this.a = normal.x;
			this.b = normal.y;
			this.c = normal.z;
			this.d = -dist;
		}
	}


	[n: number]: number;

	copy(dest: idPlane = null): idPlane {
		dest = dest || new idPlane();
		dest.opEquals( this );
		return dest;
	}

	//ID_INLINE float idPlane::operator[]( int index ) const {
	//	return ( &a )[ index ];
	//}
	//
	//ID_INLINE float& idPlane::operator[]( int index ) {
	//	return ( &a )[ index ];
	//}

	opUnaryMinus ( ): idPlane {
		return new idPlane( -this.a, -this.b, -this.c, -this.d );
	}

	opEquals ( other: idPlane ): idPlane {
		this.a = other.a;
		this.b = other.b;
		this.c = other.c;
		this.d = other.d;

		return this;
	}

	//ID_INLINE idPlane &idPlane::operator=( const idVec3 &v ) { 
	//	a = v.x;
	//	b = v.y;
	//	c = v.z;
	//	d = 0;
	//	return *this;
	//}
	//
	//ID_INLINE idPlane idPlane::operator+( const idPlane &p ) const {
	//	return idPlane( a + p.a, b + p.b, c + p.c, d + p.d );
	//}
	//
	//ID_INLINE idPlane idPlane::operator-( const idPlane &p ) const {
	//	return idPlane( a - p.a, b - p.b, c - p.c, d - p.d );
	//}
	//
	//ID_INLINE idPlane &idPlane::operator*=( const idMat3 &m ) {
	//	this.Normal() *= m;
	//	return *this;
	//}
	//
	//ID_INLINE bool idPlane::Compare( const idPlane &p ) const {
	//	return ( a == p.a && b == p.b && c == p.c && d == p.d );
	//}

	Compare_epsilon ( p: idPlane, /*float */epsilon: number ): boolean {
		if ( idMath.Fabs( this.a - p.a ) > epsilon ) {
			return false;
		}

		if ( idMath.Fabs( this.b - p.b ) > epsilon ) {
			return false;
		}

		if ( idMath.Fabs( this.c - p.c ) > epsilon ) {
			return false;
		}

		if ( idMath.Fabs( this.d - p.d ) > epsilon ) {
			return false;
		}

		return true;
	}

	Compare ( p: idPlane, /* float */normalEps: number, /*float */distEps: number ): boolean {
		if ( idMath.Fabs( this.d - p.d ) > distEps ) {
			return false;
		}
		if ( !this.Normal ( ).Compare_epsilon( p.Normal ( ), normalEps ) ) {
			return false;
		}
		return true;
	}
	
	//ID_INLINE bool idPlane::operator==( const idPlane &p ) const {
	//	return Compare( p );
	//}
	//
	//ID_INLINE bool idPlane::operator!=( const idPlane &p ) const {
	//	return !Compare( p );
	//}

	memset0 ( ): void {
		this.Zero ( );
	}

	Zero ( ): void {
		this.a = this.b = this.c = this.d = 0.0;
	}

	SetNormal(normal: idVec3 ):void {
		this.a = normal.x;
		this.b = normal.y;
		this.c = normal.z;
	}
	
	//ID_INLINE const idVec3 &idPlane::Normal( ) const {
	//	return *reinterpret_cast<const idVec3 *>(&a);
	//}
	//
	Normal ( ): idVec3 {
		return new idVec3( this.a, this.b, this.c ); 
	}

	Normalize ( fixDegenerate: boolean = true): number /*float*/ {
		var length = /*reinterpret_cast<idVec3 *>*/ new idVec3( this.a, this.b, this.c ).Normalize ( );

		if ( fixDegenerate ) {
			this.FixDegenerateNormal ( );
		}
		return length;
	}

	FixDegenerateNormal ( ): boolean {
		return this.Normal ( ).FixDegenerateNormal ( );
	}

	//ID_INLINE bool idPlane::FixDegeneracies( float distEpsilon ) {
	//	bool fixedNormal = FixDegenerateNormal();
	//	// only fix dist if the normal was degenerate
	//	if ( fixedNormal ) {
	//		if ( idMath.Fabs( d - idMath::Rint( d ) ) < distEpsilon ) {
	//			d = idMath::Rint( d );
	//		}
	//	}
	//	return fixedNormal;
	//}
	//
	Dist ( ): number {
		return -this.d;
	}

	SetDist ( /*const float */dist: number ): void {
		this.d = -dist;
	}

	FromPoints(p1: idVec3, p2: idVec3, p3: idVec3, fixDegenerate: boolean = true): boolean {
		todoThrow ( );
		//this.Normal( ( p1.minus( p2 ) ).Cross( p3.minus( p2 ) ) );
		//if ( this.Normalize( fixDegenerate ) == 0.0 ) {
		//	return false;
		//}
		//this.d = -( this.Normal() * p2 );
		return true;
	}
	
	//ID_INLINE bool idPlane::FromVecs( const idVec3 &dir1, const idVec3 &dir2, const idVec3 &p, bool fixDegenerate ) {
	//	this.Normal() = dir1.Cross( dir2 );
	//	if ( Normalize( fixDegenerate ) == 0.0 ) {
	//		return false;
	//	}
	//	d = -( this.Normal() * p );
	//	return true;
	//}
	//
	FitThroughPoint( p: idVec3 ):void {
		//d = -( this.Normal() * p );
		this.d = -(this.Normal()/* * */.timesVec(p) );
	}
	//
	//ID_INLINE idPlane idPlane::Translate( const idVec3 &translation ) const {
	//	return idPlane( a, b, c, d - translation * this.Normal() );
	//}
	//
	//ID_INLINE idPlane &idPlane::TranslateSelf( const idVec3 &translation ) {
	//	d -= translation * this.Normal();
	//	return *this;
	//}
	//
	//ID_INLINE idPlane idPlane::Rotate( const idVec3 &origin, const idMat3 &axis ) const {
	//	idPlane p;
	//	p.Normal() = this.Normal() * axis;
	//	p.d = d + origin * this.Normal() - origin * p.Normal();
	//	return p;
	//}
	//
	//ID_INLINE idPlane &idPlane::RotateSelf( const idVec3 &origin, const idMat3 &axis ) {
	//	d += origin * this.Normal();
	//	this.Normal() *= axis;
	//	d -= origin * this.Normal();
	//	return *this;
	//}
	
	/*float */
	Distance ( v: idVec3 ): number {
		return this.a * v.x + this.b * v.y + this.c * v.z + this.d;
	}

	Side ( v: idVec3, epsilon = 0.0 ): number /*int*/ {
		var /*float */dist = this.Distance( v );
		if ( dist > epsilon ) {
			return PLANESIDE_FRONT;
		} else if ( dist < -epsilon ) {
			return PLANESIDE_BACK;
		} else {
			return PLANESIDE_ON;
		}
	}

	//ID_INLINE bool idPlane::LineIntersection( start:idVec3, end:idVec3 ) const {
	//	float d1, d2, fraction;
	//
	//	d1 = this.Normal() * start + d;
	//	d2 = this.Normal() * end + d;
	//	if ( d1 == d2 ) {
	//		return false;
	//	}
	//	if ( d1 > 0.0 && d2 > 0.0 ) {
	//		return false;
	//	}
	//	if ( d1 < 0.0 && d2 < 0.0 ) {
	//		return false;
	//	}
	//	fraction = ( d1 / ( d1 - d2 ) );
	//	return ( fraction >= 0.0 && fraction <= 1.0f );
	//}
	//
	//ID_INLINE bool idPlane::RayIntersection( start:idVec3, const idVec3 &dir, float &scale ) const {
	//	float d1, d2;
	//
	//	d1 = this.Normal() * start + d;
	//	d2 = this.Normal() * dir;
	//	if ( d2 == 0.0 ) {
	//		return false;
	//	}
	//	scale = -( d1 / d2 );
	//	return true;
	//}
	//
	//ID_INLINE int idPlane::GetDimension( ) const {
	//	return 4;
	//}
	//
	//ID_INLINE const idVec4 &idPlane::ToVec4( ) const {
	//	return *reinterpret_cast<const idVec4 *>(&a);
	//}
	//
	//ID_INLINE idVec4 &idPlane::ToVec4( ) {
	//	return *reinterpret_cast<idVec4 *>(&a);
	//}
	//
	//ID_INLINE const float *idPlane::ToFloatPtr( ) const {
	//	return reinterpret_cast<const float *>(&a);
	//}

	ToFloatPtr ( ): Float32Array {
		return this.values; //reinterpret_cast<float *>(&a);
	}

	//#endif /* !__MATH_PLANE_H__ */



	// Place.cpp

	/*
	===========================================================================

	Doom 3 GPL Source Code
	Copyright (C) 1999-2011 id Software LLC, a ZeniMax Media company.

	This file is part of the Doom 3 GPL Source Code (?Doom 3 Source Code?).

	Doom 3 Source Code is free software: you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	Doom 3 Source Code is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with Doom 3 Source Code.  If not, see <http://www.gnu.org/licenses/>.

	In addition, the Doom 3 Source Code is also subject to certain additional terms. You should have received a copy of these additional terms immediately following the terms and conditions of the GNU General Public License which accompanied the Doom 3 Source Code.  If not, please request a copy in writing from id Software at the address below.

	If you have questions concerning this license or the applicable additional terms, you may contact in writing id Software LLC, c/o ZeniMax Media Inc., Suite 120, Rockville, Maryland 20850 USA.

	===========================================================================
	*/
	//
	//#include "../precompiled.h"
	//#pragma hdrstop
	//
	//idPlane plane_origin(0.0, 0.0, 0.0, 0.0);
	//
	///*
	//================
	//idPlane::Type
	//================
	//*/
	//int idPlane::Type(void) const {
	//	if (this.Normal()[0] == 0.0) {
	//		if (this.Normal()[1] == 0.0) {
	//			return this.Normal()[2] > 0.0 ? PLANETYPE_Z : PLANETYPE_NEGZ;
	//		}
	//		else if (this.Normal()[2] == 0.0) {
	//			return this.Normal()[1] > 0.0 ? PLANETYPE_Y : PLANETYPE_NEGY;
	//		}
	//		else {
	//			return PLANETYPE_ZEROX;
	//		}
	//	}
	//	else if (this.Normal()[1] == 0.0) {
	//		if (this.Normal()[2] == 0.0) {
	//			return this.Normal()[0] > 0.0 ? PLANETYPE_X : PLANETYPE_NEGX;
	//		}
	//		else {
	//			return PLANETYPE_ZEROY;
	//		}
	//	}
	//	else if (this.Normal()[2] == 0.0) {
	//		return PLANETYPE_ZEROZ;
	//	}
	//	else {
	//		return PLANETYPE_NONAXIAL;
	//	}
	//}
	//
	///*
	//================
	//idPlane::HeightFit
	//================
	//*/
	//bool idPlane::HeightFit(const idVec3 *points, const int numPoints) {
	//	int i;
	//	float sumXX = 0.0, sumXY = 0.0, sumXZ = 0.0;
	//	float sumYY = 0.0, sumYZ = 0.0;
	//	idVec3 sum, average, dir;
	//
	//	if (numPoints == 1) {
	//		a = 0.0;
	//		b = 0.0;
	//		c = 1.0f;
	//		d = -points[0].z;
	//		return true;
	//	}
	//	if (numPoints == 2) {
	//		dir = points[1] - points[0];
	//		this.Normal() = dir.Cross(idVec3(0, 0, 1)).Cross(dir);
	//		Normalize();
	//		d = -(this.Normal() * points[0]);
	//		return true;
	//	}
	//
	//	sum.Zero();
	//	for (i = 0; i < numPoints; i++) {
	//		sum += points[i];
	//	}
	//	average = sum / numPoints;
	//
	//	for (i = 0; i < numPoints; i++) {
	//		dir = points[i] - average;
	//		sumXX += dir.x * dir.x;
	//		sumXY += dir.x * dir.y;
	//		sumXZ += dir.x * dir.z;
	//		sumYY += dir.y * dir.y;
	//		sumYZ += dir.y * dir.z;
	//	}
	//
	//	idMat2 m(sumXX, sumXY, sumXY, sumYY);
	//	if (!m.InverseSelf()) {
	//		return false;
	//	}
	//
	//	a = -sumXZ * m[0][0] - sumYZ * m[0][1];
	//	b = -sumXZ * m[1][0] - sumYZ * m[1][1];
	//	c = 1.0f;
	//	Normalize();
	//	d = -(a * average.x + b * average.y + c * average.z);
	//	return true;
	//}
	//
	///*
	//================
	//idPlane::PlaneIntersection
	//================
	//*/
	//bool idPlane::PlaneIntersection(const idPlane &plane, idVec3 &start, idVec3 &dir) const {
	//	double n00, n01, n11, det, invDet, f0, f1;
	//
	//	n00 = this.Normal().LengthSqr();
	//	n01 = this.Normal() * plane.this.Normal();
	//	n11 = plane.this.Normal().LengthSqr();
	//	det = n00 * n11 - n01 * n01;
	//
	//	if (idMath.Fabs(det) < 1e-6f) {
	//		return false;
	//	}
	//
	//	invDet = 1.0f / det;
	//	f0 = (n01 * plane.d - n11 * d) * invDet;
	//	f1 = (n01 * d - n00 * plane.d) * invDet;
	//
	//	dir = this.Normal().Cross(plane.this.Normal());
	//	start = f0 * this.Normal() + f1 * plane.this.Normal();
	//	return true;
	//}
	//
	///*
	//=============
	//idPlane::ToString
	//=============
	//*/
	//const char *idPlane::ToString(int precision) const {
	//	return idStr::FloatArrayToString(ToFloatPtr(), GetDimension(), precision);
	//}
}

Object.defineProperty(idPlane.prototype, "0", {
	get: function (): number {
		return this.values[0];
	},
	set: function (value: number): void {
		if (value === undefined) {
			throw 'Undefined value';
		}
		if (typeof value !== "number") {
			throw 'must be number type';
		}
		this.x = value;
	},
	enumerable: false,
	configurable: false
});

Object.defineProperty(idPlane.prototype, "1", {
	get: function (): number {
		return this.values[1];
	},
	set: function (value: number): void {
		if (value === undefined) {
			throw 'Undefined value';
		}
		if (typeof value !== "number") {
			throw 'must be number type';
		}
		this.y = value;
	},
	enumerable: false,
	configurable: false
});

Object.defineProperty(idPlane.prototype, "2", {
	get: function (): number {
		return this.values[2];
	},
	set: function (value: number): void {
		if (value === undefined) {
			throw 'Undefined value';
		}
		if (typeof value !== "number") {
			throw 'must be number type';
		}
		this.z = value;
	},
	enumerable: false,
	configurable: false
});

Object.defineProperty(idPlane.prototype, "3", {
	get: function (): number {
		return this.values[3];
	},
	set: function (value: number): void {
		if (value === undefined) {
			throw 'Undefined value';
		}
		if (typeof value !== "number") {
			throw 'must be number type';
		}
		this.w = value;
	},
	enumerable: false,
	configurable: false
});