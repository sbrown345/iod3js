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
//#ifndef __MATH_MATRIX_H__
//#define __MATH_MATRIX_H__

/*
===============================================================================

  Matrix classes, all matrices are row-major except idMat3

===============================================================================
*/

var MATRIX_INVERSE_EPSILON	=	1e-14
var MATRIX_EPSILON			=	1e-6

//class idAngles;
//class idQuat;
//class idCQuat;
//class idRotation;
//class idMat4;
//
////===============================================================
////
////	idMat2 - 2x2 matrix
////
////===============================================================
//
//class idMat2 {
//public:
//					idMat2( );
//					explicit idMat2( const idVec2 &x, const idVec2 &y );
//					explicit idMat2( const float xx, const float xy, const float yx, const float yy );
//					explicit idMat2( const float src[ 2 ][ 2 ] );
//
//	const idVec2 &	operator[]( int index ) const;
//	idVec2 &		operator[]( int index );
//	idMat2			operator-() const;
//	idMat2			operator*( const float a ) const;
//	idVec2			operator*( const idVec2 &vec ) const;
//	idMat2			operator*( const idMat2 &a ) const;
//	idMat2			operator+( const idMat2 &a ) const;
//	idMat2			operator-( const idMat2 &a ) const;
//	idMat2 &		operator*=( const float a );
//	idMat2 &		operator*=( const idMat2 &a );
//	idMat2 &		operator+=( const idMat2 &a );
//	idMat2 &		operator-=( const idMat2 &a );
//
//	friend idMat2	operator*( const float a, const idMat2 &mat );
//	friend idVec2	operator*( const idVec2 &vec, const idMat2 &mat );
//	friend idVec2 &	operator*=( idVec2 &vec, const idMat2 &mat );
//
//	bool			Compare( const idMat2 &a ) const;						// exact compare, no epsilon
//	bool			Compare( const idMat2 &a, const float epsilon ) const;	// compare with epsilon
//	bool			operator==( const idMat2 &a ) const;					// exact compare, no epsilon
//	bool			operator!=( const idMat2 &a ) const;					// exact compare, no epsilon
//
//	void			Zero( );
//	void			Identity( );
//	bool			IsIdentity( const float epsilon = MATRIX_EPSILON ) const;
//	bool			IsSymmetric( const float epsilon = MATRIX_EPSILON ) const;
//	bool			IsDiagonal( const float epsilon = MATRIX_EPSILON ) const;
//
//	float			Trace( ) const;
//	float			Determinant( ) const;
//	idMat2			Transpose( ) const;	// returns transpose
//	idMat2 &		TransposeSelf( );
//	idMat2			Inverse( ) const;		// returns the inverse ( m * m.Inverse() = identity )
//	bool			InverseSelf( );		// returns false if determinant is zero
//	idMat2			InverseFast( ) const;	// returns the inverse ( m * m.Inverse() = identity )
//	bool			InverseFastSelf( );	// returns false if determinant is zero
//
//	int				GetDimension( ) const;
//
//	const float *	ToFloatPtr( ) const;
//	float *			ToFloatPtr( );
//	const char *	ToString( int precision = 2 ) const;
//
//private:
//	idVec2			mat[ 2 ];
//};
//
//idMat2 mat2_zero(idVec2(0, 0), idVec2(0, 0));
//idMat2 mat2_identity(idVec2(1, 0), idVec2(0, 1));
//#define mat2_default	mat2_identity
//
//ID_INLINE idMat2::idMat2( ) {
//}
//
//ID_INLINE idMat2::idMat2( const idVec2 &x, const idVec2 &y ) {
//	mat[ 0 ].x = x.x; mat[ 0 ].y = x.y;
//	mat[ 1 ].x = y.x; mat[ 1 ].y = y.y;
//}
//
//ID_INLINE idMat2::idMat2( const float xx, const float xy, const float yx, const float yy ) {
//	mat[ 0 ].x = xx; mat[ 0 ].y = xy;
//	mat[ 1 ].x = yx; mat[ 1 ].y = yy;
//}
//
//ID_INLINE idMat2::idMat2( const float src[ 2 ][ 2 ] ) {
//	memcpy( mat, src, 2 * 2 * sizeof( float ) );
//}
//
//ID_INLINE const idVec2 &idMat2::operator[]( int index ) const {
//	//assert( ( index >= 0 ) && ( index < 2 ) );
//	return mat[ index ];
//}
//
//ID_INLINE idVec2 &idMat2::operator[]( int index ) {
//	//assert( ( index >= 0 ) && ( index < 2 ) );
//	return mat[ index ];
//}
//
//ID_INLINE idMat2 idMat2::operator-() const {
//	return idMat2(	-mat[0][0], -mat[0][1],
//					-mat[1][0], -mat[1][1] );
//}
//
//ID_INLINE idVec2 idMat2::operator*( const idVec2 &vec ) const {
//	return idVec2(
//		mat[ 0 ].x * vec.x + mat[ 0 ].y * vec.y,
//		mat[ 1 ].x * vec.x + mat[ 1 ].y * vec.y );
//}
//
//ID_INLINE idMat2 idMat2::operator*( const idMat2 &a ) const {
//	return idMat2(
//		mat[0].x * a[0].x + mat[0].y * a[1].x,
//		mat[0].x * a[0].y + mat[0].y * a[1].y,
//		mat[1].x * a[0].x + mat[1].y * a[1].x,
//		mat[1].x * a[0].y + mat[1].y * a[1].y );
//}
//
//ID_INLINE idMat2 idMat2::operator*( const float a ) const {
//	return idMat2(
//		mat[0].x * a, mat[0].y * a, 
//		mat[1].x * a, mat[1].y * a );
//}
//
//ID_INLINE idMat2 idMat2::operator+( const idMat2 &a ) const {
//	return idMat2(
//		mat[0].x + a[0].x, mat[0].y + a[0].y, 
//		mat[1].x + a[1].x, mat[1].y + a[1].y );
//}
//    
//ID_INLINE idMat2 idMat2::operator-( const idMat2 &a ) const {
//	return idMat2(
//		mat[0].x - a[0].x, mat[0].y - a[0].y,
//		mat[1].x - a[1].x, mat[1].y - a[1].y );
//}
//
//ID_INLINE idMat2 &idMat2::operator*=( const float a ) {
//	mat[0].x *= a; mat[0].y *= a;
//	mat[1].x *= a; mat[1].y *= a;
//
//    return *this;
//}
//
//ID_INLINE idMat2 &idMat2::operator*=( const idMat2 &a ) {
//	float x, y;
//	x = mat[0].x; y = mat[0].y;
//	mat[0].x = x * a[0].x + y * a[1].x;
//	mat[0].y = x * a[0].y + y * a[1].y;
//	x = mat[1].x; y = mat[1].y;
//	mat[1].x = x * a[0].x + y * a[1].x;
//	mat[1].y = x * a[0].y + y * a[1].y;
//	return *this;
//}
//
//ID_INLINE idMat2 &idMat2::operator+=( const idMat2 &a ) {
//	mat[0].x += a[0].x; mat[0].y += a[0].y;
//	mat[1].x += a[1].x; mat[1].y += a[1].y;
//
//    return *this;
//}
//
//ID_INLINE idMat2 &idMat2::operator-=( const idMat2 &a ) {
//	mat[0].x -= a[0].x; mat[0].y -= a[0].y;
//	mat[1].x -= a[1].x; mat[1].y -= a[1].y;
//
//    return *this;
//}
//
//ID_INLINE idVec2 operator*( const idVec2 &vec, const idMat2 &mat ) {
//	return mat * vec;
//}
//
//ID_INLINE idMat2 operator*( const float a, idMat2 const &mat ) {
//	return mat * a;
//}
//
//ID_INLINE idVec2 &operator*=( idVec2 &vec, const idMat2 &mat ) {
//	vec = mat * vec;
//	return vec;
//}
//
//ID_INLINE bool idMat2::Compare( const idMat2 &a ) const {
//	if ( mat[0].this.Compare( a[0] ) &&
//		mat[1].this.Compare( a[1] ) ) {
//		return true;
//	}
//	return false;
//}
//
//ID_INLINE bool idMat2::Compare( const idMat2 &a, const float epsilon ) const {
//	if ( mat[0].this.Compare( a[0], epsilon ) &&
//		mat[1].this.Compare( a[1], epsilon ) ) {
//		return true;
//	}
//	return false;
//}
//
//ID_INLINE bool idMat2::operator==( const idMat2 &a ) const {
//	return this.Compare( a );
//}
//
//ID_INLINE bool idMat2::operator!=( const idMat2 &a ) const {
//	return !this.Compare( a );
//}
//
//ID_INLINE void idMat2::Zero( ) {
//	mat[0].Zero();
//	mat[1].Zero();
//}
//
//ID_INLINE void idMat2::Identity( ) {
//	*this = mat2_identity;
//}
//
//ID_INLINE bool idMat2::IsIdentity( const float epsilon ) const {
//	return this.Compare( mat2_identity, epsilon );
//}
//
//ID_INLINE bool idMat2::IsSymmetric( const float epsilon ) const {
//	return ( idMath.Fabs( mat[0][1] - mat[1][0] ) < epsilon );
//}
//
//ID_INLINE bool idMat2::IsDiagonal( const float epsilon ) const {
//	if ( idMath.Fabs( mat[0][1] ) > epsilon ||
//		idMath.Fabs( mat[1][0] ) > epsilon ) {
//		return false;
//	}
//	return true;
//}
//
//ID_INLINE float idMat2::Trace( ) const {
//	return ( mat[0][0] + mat[1][1] );
//}
//
//ID_INLINE float idMat2::Determinant( ) const {
//	return mat[0][0] * mat[1][1] - mat[0][1] * mat[1][0];
//}
//
//ID_INLINE idMat2 idMat2::Transpose( ) const {
//	return idMat2(	mat[0][0], mat[1][0],
//					mat[0][1], mat[1][1] );
//}
//
//ID_INLINE idMat2 &idMat2::TransposeSelf( ) {
//	float tmp;
//
//	tmp = mat[0][1];
//	mat[0][1] = mat[1][0];
//	mat[1][0] = tmp;
//
//	return *this;
//}
//
//ID_INLINE idMat2 idMat2::Inverse( ) const {
//	idMat2 invMat;
//
//	invMat = *this;
//#if !defined(NDEBUG)
//	int r = 
//#endif
//		invMat.InverseSelf();
//	assert( r );
//	return invMat;
//}
//
//ID_INLINE idMat2 idMat2::InverseFast( ) const {
//	idMat2 invMat;
//
//	invMat = *this;
//#if !defined(NDEBUG)
//	int r = 
//#endif
//		invMat.InverseFastSelf();
//	assert( r );
//	return invMat;
//}
//
//ID_INLINE int idMat2::GetDimension( ) const {
//	return 4;
//}
//
//ID_INLINE const float *idMat2::ToFloatPtr( ) const {
//	return mat[0].ToFloatPtr();
//}
//
//ID_INLINE float *idMat2::ToFloatPtr( ) {
//	return mat[0].ToFloatPtr();
//}
//
//
////===============================================================
////
////	idMat3 - 3x3 matrix
////
////	NOTE:	matrix is column-major
////
////===============================================================

class idMat3 {
//public:
//					idMat3( );
//					explicit idMat3( const idVec3 &x, const idVec3 &y, const idVec3 &z );
//					explicit idMat3( const float xx, const float xy, const float xz, const float yx, const float yy, const float yz, const float zx, const float zy, const float zz );
//					explicit idMat3( const float src[ 3 ][ 3 ] );
//
//	const idVec3 &	operator[]( int index ) const;
//	idVec3 &		operator[]( int index );
//	idMat3			operator-() const;
//	idMat3			operator*( const float a ) const;
//	idVec3			operator*( vec:idVec3 ) const;
//	idMat3			operator*( const idMat3 &a ) const;
//	idMat3			operator+( const idMat3 &a ) const;
//	idMat3			operator-( const idMat3 &a ) const;
//	idMat3 &		operator*=( const float a );
//	idMat3 &		operator*=( const idMat3 &a );
//	idMat3 &		operator+=( const idMat3 &a );
//	idMat3 &		operator-=( const idMat3 &a );
//
//	friend idMat3	operator*( const float a, const idMat3 &mat );
//	friend idVec3	operator*( vec:idVec3, const idMat3 &mat );
//	friend idVec3 &	operator*=( vec:idVec3, const idMat3 &mat );
//
//	bool			Compare( const idMat3 &a ) const;						// exact compare, no epsilon
//	bool			Compare( const idMat3 &a, const float epsilon ) const;	// compare with epsilon
//	bool			operator==( const idMat3 &a ) const;					// exact compare, no epsilon
//	bool			operator!=( const idMat3 &a ) const;					// exact compare, no epsilon
//
//	void			Zero( );
//	void			Identity( );
//	bool			IsIdentity( const float epsilon = MATRIX_EPSILON ) const;
//	bool			IsSymmetric( const float epsilon = MATRIX_EPSILON ) const;
//	bool			IsDiagonal( const float epsilon = MATRIX_EPSILON ) const;
//	bool			IsRotated( ) const;
//
//	void			ProjectVector( const idVec3 &src, idVec3 &dst ) const;
//	void			UnprojectVector( const idVec3 &src, idVec3 &dst ) const;
//
//	bool			FixDegeneracies( );	// fix degenerate axial cases
//	bool			FixDenormals( );		// change tiny numbers to zero
//
//	float			Trace( ) const;
//	float			Determinant( ) const;
//	idMat3			OrthoNormalize( ) const;
//	idMat3 &		OrthoNormalizeSelf( );
//	idMat3			Transpose( ) const;	// returns transpose
//	idMat3 &		TransposeSelf( );
//	idMat3			Inverse( ) const;		// returns the inverse ( m * m.Inverse() = identity )
//	bool			InverseSelf( );		// returns false if determinant is zero
//	idMat3			InverseFast( ) const;	// returns the inverse ( m * m.Inverse() = identity )
//	bool			InverseFastSelf( );	// returns false if determinant is zero
//	idMat3			TransposeMultiply( const idMat3 &b ) const;
//
//	idMat3			InertiaTranslate( const float mass, const idVec3 &centerOfMass, const idVec3 &translation ) const;
//	idMat3 &		InertiaTranslateSelf( const float mass, const idVec3 &centerOfMass, const idVec3 &translation );
//	idMat3			InertiaRotate( const idMat3 &rotation ) const;
//	idMat3 &		InertiaRotateSelf( const idMat3 &rotation );
//
//	int				GetDimension( ) const;
//
//	idAngles		ToAngles( ) const;
//	idQuat			ToQuat( ) const;
//	idCQuat			ToCQuat( ) const;
//	idRotation		ToRotation( ) const;
//	idMat4			ToMat4( ) const;
//	idVec3			ToAngularVelocity( ) const;
//	const float *	ToFloatPtr( ) const;
//	float *			ToFloatPtr( );
//	const char *	ToString( int precision = 2 ) const;
//
//	friend void		TransposeMultiply( const idMat3 &inv, const idMat3 &b, idMat3 &dst );
//	friend idMat3	SkewSymmetric( idVec3 const &src );
//
//private:
	values = new Float32Array (9);
	mat: idVec3[/*3*/];// = newStructArray<idVec3>(idVec3, 3)
//
//extern idMat3 mat3_zero;
//extern idMat3 mat3_identity;
//#define mat3_default	mat3_identity
//

	constructor ( )
	constructor ( x: idVec3, y: idVec3, z: idVec3 )
	constructor ( xx?: number, xy?: number, xz?: number, yx?: number, yy?: number, yz?: number, zx?: number, zy?: number, zz?: number )
	constructor ( x?: idVec3, y?: idVec3, z?: idVec3, a4?: number, a5?: number, a6?: number, a7?: number, a8?: number, a9?: number )
	constructor ( x?: any, y?: any, z?: any, a4?: number, a5?: number, a6?: number, a7?: number, a8?: number, a9?: number ) {
		this.mat = [
			new idVec3( this.values.subarray( 0, 3 ) ),
			new idVec3( this.values.subarray( 3, 6 ) ),
			new idVec3( this.values.subarray( 6, 9 ) )
		];

		if ( arguments.length == 3 ) {
			this.mat[0].x = x.x;
			this.mat[0].y = x.y;
			this.mat[0].z = x.z;
			this.mat[1].x = y.x;
			this.mat[1].y = y.y;
			this.mat[1].z = y.z;
			this.mat[2].x = z.x;
			this.mat[2].y = z.y;
			this.mat[2].z = z.z;
		} else if ( arguments.length == 9 ) {
			this.mat[0].x = arguments[0];
			this.mat[0].y = arguments[1];
			this.mat[0].z = arguments[2];
			this.mat[1].x = arguments[3];
			this.mat[1].y = arguments[4];
			this.mat[1].z = arguments[5];
			this.mat[2].x = arguments[6];
			this.mat[2].y = arguments[7];
			this.mat[2].z = arguments[8];
		}
	}

	opEquals ( other: idMat3 ) {
		this.mat[0].opEquals( other.mat[0] );
		this.mat[1].opEquals( other.mat[1] );
		this.mat[2].opEquals( other.mat[2] );
	}

	memset0 ( ): void {
		clearStructArray( this.mat );
	}
	
//
//ID_INLINE idMat3::idMat3( const float src[ 3 ][ 3 ] ) {
//	memcpy( this.mat, src, 3 * 3 * sizeof( float ) );
//}

	[index: number]: idVec3;

//ID_INLINE const idVec3 &idMat3::operator[]( int index ) const {
//	//assert( ( index >= 0 ) && ( index < 3 ) );
//	return this.mat[ index ];
//}
//
//ID_INLINE idVec3 &idMat3::operator[]( int index ) {
//	//assert( ( index >= 0 ) && ( index < 3 ) );
//	return this.mat[ index ];
//}
//
//ID_INLINE idMat3 idMat3::operator-() const {
//	return idMat3(	-this.mat[0][0], -this.mat[0][1], -this.mat[0][2],
//					-this.mat[1][0], -this.mat[1][1], -this.mat[1][2],
//					-this.mat[2][0], -this.mat[2][1], -this.mat[2][2] );
//}

//ID_INLINE idVec3 idMat3::operator*( vec:idVec3 ) const {
	opMultiplication_Vec ( vec: idVec3 ): idVec3 {
		return new idVec3(
			this.mat[0].x * vec.x + this.mat[1].x * vec.y + this.mat[2].x * vec.z,
			this.mat[0].y * vec.x + this.mat[1].y * vec.y + this.mat[2].y * vec.z,
			this.mat[0].z * vec.x + this.mat[1].z * vec.y + this.mat[2].z * vec.z );
	}
//
//ID_INLINE idMat3 idMat3::operator*( const idMat3 &a ) const {
	opMultiplication ( a: idMat3 ): idMat3 {
		var /*int */i: number, j: number;
		//const float *m1Ptr, *m2Ptr;
		//float *dstPtr;
		var dst = new idMat3;

		//m1Ptr = reinterpret_cast<const float *>(this);
		//m2Ptr = reinterpret_cast<const float *>(&a);
		//dstPtr = reinterpret_cast<float *>(&dst);

		//for ( i = 0; i < 3; i++ ) {
		//	for ( j = 0; j < 3; j++ ) {
		//		*dstPtr = m1Ptr[0] * m2Ptr[ 0 * 3 + j ]
		//				+ m1Ptr[1] * m2Ptr[ 1 * 3 + j ]
		//				+ m1Ptr[2] * m2Ptr[ 2 * 3 + j ];
		//		dstPtr++;
		//	}
		//	m1Ptr += 3;
		//}
		return dst;
	}
//
//ID_INLINE idMat3 idMat3::operator*( const float a ) const {
	opMultiplication_float ( a: number /*float*/ ): idMat3 {
		return new idMat3(
			this.mat[0].x * a, this.mat[0].y * a, this.mat[0].z * a,
			this.mat[1].x * a, this.mat[1].y * a, this.mat[1].z * a,
			this.mat[2].x * a, this.mat[2].y * a, this.mat[2].z * a );
	}

//ID_INLINE idMat3 idMat3::operator+( const idMat3 &a ) const {
//	return idMat3(
//		this.mat[0].x + a[0].x, this.mat[0].y + a[0].y, this.mat[0].z + a[0].z,
//		this.mat[1].x + a[1].x, this.mat[1].y + a[1].y, this.mat[1].z + a[1].z,
//		this.mat[2].x + a[2].x, this.mat[2].y + a[2].y, this.mat[2].z + a[2].z );
//}
//    
//ID_INLINE idMat3 idMat3::operator-( const idMat3 &a ) const {
//	return idMat3(
//		this.mat[0].x - a[0].x, this.mat[0].y - a[0].y, this.mat[0].z - a[0].z,
//		this.mat[1].x - a[1].x, this.mat[1].y - a[1].y, this.mat[1].z - a[1].z,
//		this.mat[2].x - a[2].x, this.mat[2].y - a[2].y, this.mat[2].z - a[2].z );
//}
//
//ID_INLINE idMat3 &idMat3::operator*=( const float a ) {
//	this.mat[0].x *= a; this.mat[0].y *= a; this.mat[0].z *= a;
//	this.mat[1].x *= a; this.mat[1].y *= a; this.mat[1].z *= a; 
//	this.mat[2].x *= a; this.mat[2].y *= a; this.mat[2].z *= a;
//
//    return *this;
//}
//
//ID_INLINE idMat3 &idMat3::operator*=( const idMat3 &a ) {
	opMultiplicationAssignment ( a: idMat3 ): idMat3 {
		var /*int */i: number, j: number;
		todoThrow ( );
		//const float *m2Ptr;
		//float *m1Ptr, dst[3];

		//m1Ptr = reinterpret_cast<float *>(this);
		//m2Ptr = reinterpret_cast<const float *>(&a);

		//for ( i = 0; i < 3; i++ ) {
		//	for ( j = 0; j < 3; j++ ) {
		//		dst[j]  = m1Ptr[0] * m2Ptr[ 0 * 3 + j ]
		//				+ m1Ptr[1] * m2Ptr[ 1 * 3 + j ]
		//				+ m1Ptr[2] * m2Ptr[ 2 * 3 + j ];
		//	}
		//	m1Ptr[0] = dst[0]; m1Ptr[1] = dst[1]; m1Ptr[2] = dst[2];
		//	m1Ptr += 3;
		//}
		return this;
	}
//
//ID_INLINE idMat3 &idMat3::operator+=( const idMat3 &a ) {
//	this.mat[0].x += a[0].x; this.mat[0].y += a[0].y; this.mat[0].z += a[0].z;
//	this.mat[1].x += a[1].x; this.mat[1].y += a[1].y; this.mat[1].z += a[1].z;
//	this.mat[2].x += a[2].x; this.mat[2].y += a[2].y; this.mat[2].z += a[2].z;
//
//    return *this;
//}
//
//ID_INLINE idMat3 &idMat3::operator-=( const idMat3 &a ) {
//	this.mat[0].x -= a[0].x; this.mat[0].y -= a[0].y; this.mat[0].z -= a[0].z;
//	this.mat[1].x -= a[1].x; this.mat[1].y -= a[1].y; this.mat[1].z -= a[1].z;
//	this.mat[2].x -= a[2].x; this.mat[2].y -= a[2].y; this.mat[2].z -= a[2].z;
//
//    return *this;
//}

//ID_INLINE idVec3 operator*( const idVec3 &vec, const idMat3 &mat ) {
	static opMultiplication_VecMat ( vec: idVec3, mat: idMat3 ): idVec3 {
		return mat.opMultiplication_Vec( vec );
	}
//
//ID_INLINE idMat3 operator*( const float a, mat:idMat3  ) {
	static opMultiplication_floatMat(a: number /*float*/, mat: idMat3): idMat3 {
		return mat.opMultiplication_float( a );
	}
//
	//ID_INLINE idVec3 &operator*=( vec:idVec3, mat:idMat3  ) {
	static opMultiplicationAssignment_vec3_mat3 ( vec: idVec3, mat: idMat3 ): idVec3 {
		var /*float */x = mat[0].x * vec.x + mat[1].x * vec.y + mat[2].x * vec.z;
		var /*float */y = mat[0].y * vec.x + mat[1].y * vec.y + mat[2].y * vec.z;
		vec.z = mat[0].z * vec.x + mat[1].z * vec.y + mat[2].z * vec.z;
		vec.x = x;
		vec.y = y;
		return vec;
	}

	Compare ( a: idMat3 ): boolean {
		if ( this.mat[0].Compare( a[0] ) &&
			this.mat[1].Compare( a[1] ) &&
			this.mat[2].Compare( a[2] ) ) {
			return true;
		}
		return false;
	}

	Compare_epsilon ( a: idMat3, /*float */epsilon: number ): boolean {
		if ( this.mat[0].Compare_epsilon( a[0], epsilon ) &&
			this.mat[1].Compare_epsilon( a[1], epsilon ) &&
			this.mat[2].Compare_epsilon( a[2], epsilon ) ) {
			return true;
		}
		return false;
	}

//ID_INLINE bool idMat3::operator==( const idMat3 &a ) const {
//	return this.Compare( a );
//}
//
//ID_INLINE bool idMat3::operator!=( const idMat3 &a ) const {
//	return !this.Compare( a );
//}

	Zero ( ): void {
		//memset( this.mat, 0, sizeof( this.mat ) );
		this.mat[0].Zero ( );
		this.mat[1].Zero ( );
		this.mat[2].Zero ( );
	}

	Identity ( ): void {
		this.opEquals( mat3_identity );
	}

	IsIdentity ( /*float */epsilon:number = MATRIX_EPSILON ): boolean {
		return this.Compare_epsilon( mat3_identity, epsilon );
	}

//ID_INLINE bool idMat3::IsSymmetric( const float epsilon ) const {
//	if ( idMath.Fabs( this.mat[0][1] - this.mat[1][0] ) > epsilon ) {
//		return false;
//	}
//	if ( idMath.Fabs( this.mat[0][2] - this.mat[2][0] ) > epsilon ) {
//		return false;
//	}
//	if ( idMath.Fabs( this.mat[1][2] - this.mat[2][1] ) > epsilon ) {
//		return false;
//	}
//	return true;
//}
//
//ID_INLINE bool idMat3::IsDiagonal( const float epsilon ) const {
//	if ( idMath.Fabs( this.mat[0][1] ) > epsilon ||
//		idMath.Fabs( this.mat[0][2] ) > epsilon ||
//		idMath.Fabs( this.mat[1][0] ) > epsilon ||
//		idMath.Fabs( this.mat[1][2] ) > epsilon ||
//		idMath.Fabs( this.mat[2][0] ) > epsilon ||
//		idMath.Fabs( this.mat[2][1] ) > epsilon ) {
//		return false;
//	}
//	return true;
//}

	IsRotated ( ): boolean {
		return !this.Compare( mat3_identity );
	}

//ID_INLINE void idMat3::ProjectVector( const idVec3 &src, idVec3 &dst ) const {
//	dst.x = src * this.mat[ 0 ];
//	dst.y = src * this.mat[ 1 ];
//	dst.z = src * this.mat[ 2 ];
//}
//
//ID_INLINE void idMat3::UnprojectVector( const idVec3 &src, idVec3 &dst ) const {
//	dst = this.mat[ 0 ] * src.x + this.mat[ 1 ] * src.y + this.mat[ 2 ] * src.z;
//}
//
//ID_INLINE bool idMat3::FixDegeneracies( ) {
//	bool r = this.mat[0].FixDegenerateNormal();
//	r |= this.mat[1].FixDegenerateNormal();
//	r |= this.mat[2].FixDegenerateNormal();
//	return r;
//}
//
//ID_INLINE bool idMat3::FixDenormals( ) {
//	bool r = this.mat[0].FixDenormals();
//	r |= this.mat[1].FixDenormals();
//	r |= this.mat[2].FixDenormals();
//	return r;
//}
//
//ID_INLINE float idMat3::Trace( ) const {
//	return ( this.mat[0][0] + this.mat[1][1] + this.mat[2][2] );
//}
//
//ID_INLINE idMat3 idMat3::OrthoNormalize( ) const {
//	idMat3 ortho;
//
//	ortho = *this;
//	ortho[ 0 ].Normalize();
//	ortho[ 2 ].Cross( this.mat[ 0 ], this.mat[ 1 ] );
//	ortho[ 2 ].Normalize();
//	ortho[ 1 ].Cross( this.mat[ 2 ], this.mat[ 0 ] );
//	ortho[ 1 ].Normalize();
//	return ortho;
//}
//
//ID_INLINE idMat3 &idMat3::OrthoNormalizeSelf( ) {
//	this.mat[ 0 ].Normalize();
//	this.mat[ 2 ].Cross( this.mat[ 0 ], this.mat[ 1 ] );
//	this.mat[ 2 ].Normalize();
//	this.mat[ 1 ].Cross( this.mat[ 2 ], this.mat[ 0 ] );
//	this.mat[ 1 ].Normalize();
//	return *this;
//}

	Transpose ( ): idMat3 {
		return new idMat3( this.mat[0][0], this.mat[1][0], this.mat[2][0],
			this.mat[0][1], this.mat[1][1], this.mat[2][1],
			this.mat[0][2], this.mat[1][2], this.mat[2][2] );
	}

//ID_INLINE idMat3 &idMat3::TransposeSelf( ) {
//	float tmp0, tmp1, tmp2;
//
//	tmp0 = this.mat[0][1];
//	this.mat[0][1] = this.mat[1][0];
//	this.mat[1][0] = tmp0;
//	tmp1 = this.mat[0][2];
//	this.mat[0][2] = this.mat[2][0];
//	this.mat[2][0] = tmp1;
//	tmp2 = this.mat[1][2];
//	this.mat[1][2] = this.mat[2][1];
//	this.mat[2][1] = tmp2;
//
//	return *this;
//}

	Inverse ( ): idMat3 {
		var invMat = this;
		var r = invMat.InverseSelf ( );

		assert( r );
		return invMat;
	}
//
//ID_INLINE idMat3 idMat3::InverseFast( ) const {
//	idMat3 invMat;
//
//	invMat = *this;
//#if !defined(NDEBUG)
//	int r = 
//#endif
//		invMat.InverseFastSelf();
//	assert( r );
//	return invMat;
//}
//
//ID_INLINE idMat3 idMat3::TransposeMultiply( const idMat3 &b ) const {
//	return idMat3(	this.mat[0].x * b[0].x + this.mat[1].x * b[1].x + this.mat[2].x * b[2].x,
//					this.mat[0].x * b[0].y + this.mat[1].x * b[1].y + this.mat[2].x * b[2].y,
//					this.mat[0].x * b[0].z + this.mat[1].x * b[1].z + this.mat[2].x * b[2].z,
//					this.mat[0].y * b[0].x + this.mat[1].y * b[1].x + this.mat[2].y * b[2].x,
//					this.mat[0].y * b[0].y + this.mat[1].y * b[1].y + this.mat[2].y * b[2].y,
//					this.mat[0].y * b[0].z + this.mat[1].y * b[1].z + this.mat[2].y * b[2].z,
//					this.mat[0].z * b[0].x + this.mat[1].z * b[1].x + this.mat[2].z * b[2].x,
//					this.mat[0].z * b[0].y + this.mat[1].z * b[1].y + this.mat[2].z * b[2].y,
//					this.mat[0].z * b[0].z + this.mat[1].z * b[1].z + this.mat[2].z * b[2].z );
//}
//
//ID_INLINE void TransposeMultiply( const idMat3 &transpose, const idMat3 &b, idMat3 &dst ) {
//	dst[0].x = transpose[0].x * b[0].x + transpose[1].x * b[1].x + transpose[2].x * b[2].x;
//	dst[0].y = transpose[0].x * b[0].y + transpose[1].x * b[1].y + transpose[2].x * b[2].y;
//	dst[0].z = transpose[0].x * b[0].z + transpose[1].x * b[1].z + transpose[2].x * b[2].z;
//	dst[1].x = transpose[0].y * b[0].x + transpose[1].y * b[1].x + transpose[2].y * b[2].x;
//	dst[1].y = transpose[0].y * b[0].y + transpose[1].y * b[1].y + transpose[2].y * b[2].y;
//	dst[1].z = transpose[0].y * b[0].z + transpose[1].y * b[1].z + transpose[2].y * b[2].z;
//	dst[2].x = transpose[0].z * b[0].x + transpose[1].z * b[1].x + transpose[2].z * b[2].x;
//	dst[2].y = transpose[0].z * b[0].y + transpose[1].z * b[1].y + transpose[2].z * b[2].y;
//	dst[2].z = transpose[0].z * b[0].z + transpose[1].z * b[1].z + transpose[2].z * b[2].z;
//}
//
//ID_INLINE idMat3 SkewSymmetric( idVec3 const &src ) {
//	return idMat3( 0.0, -src.z,  src.y, src.z,   0.0, -src.x, -src.y,  src.x,   0.0 );
//}
//
	GetDimension ( ): number {
		return 9;
	}

	ToFloatPtr ( ): Float32Array {
		return this.mat[0].ToFloatPtr ( );
	}

//ID_INLINE float *idMat3::ToFloatPtr( ) {
//	return this.mat[0].ToFloatPtr();
//}

	
////===============================================================
////
////	idMat3
////
////===============================================================
//
//idMat3 mat3_zero( idVec3( 0, 0, 0 ), idVec3( 0, 0, 0 ), idVec3( 0, 0, 0 ) );
//idMat3 mat3_identity( idVec3( 1, 0, 0 ), idVec3( 0, 1, 0 ), idVec3( 0, 0, 1 ) );
//
/*
============
idMat3::ToAngles
============
*/
	ToAngles ( ): idAngles {
		var angles = new idAngles;
		var /*double*/ theta: number;
		var /*double*/ cp: number;
		var /*float*/ sp: number;

		sp = this.mat[0][2];

		// cap off our sin value so that we don't get any NANs
		if ( sp > 1.0 ) {
			sp = 1.0;
		} else if ( sp < -1.0 ) {
			sp = -1.0;
		}

		theta = -asin( sp );
		cp = cos( theta );

		if ( cp > 8192.0 * idMath.FLT_EPSILON ) {
			angles.pitch = RAD2DEG( theta );
			angles.yaw = RAD2DEG( atan2( this.mat[0][1], this.mat[0][0] ) );
			angles.roll = RAD2DEG( atan2( this.mat[1][2], this.mat[2][2] ) );
		} else {
			angles.pitch = RAD2DEG( theta );
			angles.yaw = RAD2DEG( -atan2( this.mat[1][0], this.mat[1][1] ) );
			angles.roll = 0;
		}
		return angles;
	}
//
///*
//============
//idMat3::ToQuat
//============
//*/
//idQuat idMat3::ToQuat( ) const {
//	idQuat		q;
//	float		trace;
//	float		s;
//	float		t;
//	int     	i;
//	int			j;
//	int			k;
//
//	static int 	next[ 3 ] = { 1, 2, 0 };
//
//	trace = this.mat[ 0 ][ 0 ] + this.mat[ 1 ][ 1 ] + this.mat[ 2 ][ 2 ];
//
//	if ( trace > 0.0 ) {
//
//		t = trace + 1.0;
//		s = idMath.InvSqrt( t ) * 0.5;
//
//		q[3] = s * t;
//		q[0] = ( this.mat[ 2 ][ 1 ] - this.mat[ 1 ][ 2 ] ) * s;
//		q[1] = ( this.mat[ 0 ][ 2 ] - this.mat[ 2 ][ 0 ] ) * s;
//		q[2] = ( this.mat[ 1 ][ 0 ] - this.mat[ 0 ][ 1 ] ) * s;
//
//	} else {
//
//		i = 0;
//		if ( this.mat[ 1 ][ 1 ] > this.mat[ 0 ][ 0 ] ) {
//			i = 1;
//		}
//		if ( this.mat[ 2 ][ 2 ] > this.mat[ i ][ i ] ) {
//			i = 2;
//		}
//		j = next[ i ];
//		k = next[ j ];
//
//		t = ( this.mat[ i ][ i ] - ( this.mat[ j ][ j ] + this.mat[ k ][ k ] ) ) + 1.0;
//		s = idMath.InvSqrt( t ) * 0.5;
//
//		q[i] = s * t;
//		q[3] = ( this.mat[ k ][ j ] - this.mat[ j ][ k ] ) * s;
//		q[j] = ( this.mat[ j ][ i ] + this.mat[ i ][ j ] ) * s;
//		q[k] = ( this.mat[ k ][ i ] + this.mat[ i ][ k ] ) * s;
//	}
//	return q;
//}
//
///*
//============
//idMat3::ToCQuat
//============
//*/
//idCQuat idMat3::ToCQuat( ) const {
//	idQuat q = ToQuat();
//	if ( q.w < 0.0 ) {
//		return idCQuat( -q.x, -q.y, -q.z );
//	}
//	return idCQuat( q.x, q.y, q.z );
//}

/*
============
idMat3::ToRotation
============
*/
	ToRotation ( ): idRotation {
		var r = new idRotation;
		var trace: number /*float*/;
		var s: number /*float*/;
		var t: number /*float*/;
		var i: number /*int*/;
		var j: number /*int*/;
		var k: number /*int*/;
		var /*static int*/next = [1, 2, 0];

		trace = this.mat[0][0] + this.mat[1][1] + this.mat[2][2];
		if ( trace > 0.0 ) {

			t = trace + 1.0;
			s = idMath.InvSqrt( t ) * 0.5;

			r.angle = s * t;
			r.vec[0] = ( this.mat[2][1] - this.mat[1][2] ) * s;
			r.vec[1] = ( this.mat[0][2] - this.mat[2][0] ) * s;
			r.vec[2] = ( this.mat[1][0] - this.mat[0][1] ) * s;

		} else {

			i = 0;
			if ( this.mat[1][1] > this.mat[0][0] ) {
				i = 1;
			}
			if ( this.mat[2][2] > this.mat[i][i] ) {
				i = 2;
			}
			j = next[i];
			k = next[j];

			t = ( this.mat[i][i] - ( this.mat[j][j] + this.mat[k][k] ) ) + 1.0;
			s = idMath.InvSqrt( t ) * 0.5;

			r.vec[i] = s * t;
			r.angle = ( this.mat[k][j] - this.mat[j][k] ) * s;
			r.vec[j] = ( this.mat[j][i] + this.mat[i][j] ) * s;
			r.vec[k] = ( this.mat[k][i] + this.mat[i][k] ) * s;
		}
		r.angle = idMath.ACos( r.angle );
		if ( idMath.Fabs( r.angle ) < 1e-10 ) {
			r.vec.Set( 0.0, 0.0, 1.0 );
			r.angle = 0.0;
		} else {
			//vec *= (1.0 / sin( angle ));
			r.vec.Normalize ( );
			r.vec.FixDegenerateNormal ( );
			r.angle *= 2.0 * idMath.M_RAD2DEG;
		}

		r.origin.Zero ( );
		r.axis.opEquals( this );
		r.axisValid = true;
		return r;
	}
//
///*
//=================
//idMat3::ToAngularVelocity
//=================
//*/
//idVec3 idMat3::ToAngularVelocity( ) const {
//	idRotation rotation = ToRotation();
//	return rotation.GetVec() * DEG2RAD( rotation.GetAngle() );
//}
//
///*
//============
//idMat3::Determinant
//============
//*/
//float idMat3::Determinant( ) const {
//
//	float det2_12_01 = mat[1][0] * mat[2][1] - mat[1][1] * mat[2][0];
//	float det2_12_02 = mat[1][0] * mat[2][2] - mat[1][2] * mat[2][0];
//	float det2_12_12 = mat[1][1] * mat[2][2] - mat[1][2] * mat[2][1];
//
//	return mat[0][0] * det2_12_12 - mat[0][1] * det2_12_02 + mat[0][2] * det2_12_01;
//}
//
/*
============
idMat3::InverseSelf
============
*/
	InverseSelf ( ): boolean {
		// 18+3+9 = 30 multiplications
		//			 1 division
		var inverse = new idMat3;
		var /*double */det: number, invDet: number;
		var mat = this.mat;

		inverse[0][0] = mat[1][1] * mat[2][2] - mat[1][2] * mat[2][1];
		inverse[1][0] = mat[1][2] * mat[2][0] - mat[1][0] * mat[2][2];
		inverse[2][0] = mat[1][0] * mat[2][1] - mat[1][1] * mat[2][0];

		det = mat[0][0] * inverse[0][0] + mat[0][1] * inverse[1][0] + mat[0][2] * inverse[2][0];

		if ( idMath.Fabs( det ) < MATRIX_INVERSE_EPSILON ) {
			return false;
		}

		invDet = 1.0 / det;

		inverse[0][1] = mat[0][2] * mat[2][1] - mat[0][1] * mat[2][2];
		inverse[0][2] = mat[0][1] * mat[1][2] - mat[0][2] * mat[1][1];
		inverse[1][1] = mat[0][0] * mat[2][2] - mat[0][2] * mat[2][0];
		inverse[1][2] = mat[0][2] * mat[1][0] - mat[0][0] * mat[1][2];
		inverse[2][1] = mat[0][1] * mat[2][0] - mat[0][0] * mat[2][1];
		inverse[2][2] = mat[0][0] * mat[1][1] - mat[0][1] * mat[1][0];

		mat[0][0] = inverse[0][0] * invDet;
		mat[0][1] = inverse[0][1] * invDet;
		mat[0][2] = inverse[0][2] * invDet;

		mat[1][0] = inverse[1][0] * invDet;
		mat[1][1] = inverse[1][1] * invDet;
		mat[1][2] = inverse[1][2] * invDet;

		mat[2][0] = inverse[2][0] * invDet;
		mat[2][1] = inverse[2][1] * invDet;
		mat[2][2] = inverse[2][2] * invDet;

		return true;
	}

///*
//============
//idMat3::InverseFastSelf
//============
//*/
//bool idMat3::InverseFastSelf( ) {
//#if 1
//	// 18+3+9 = 30 multiplications
//	//			 1 division
//	idMat3 inverse;
//	double det, invDet;
//
//	inverse[0][0] = mat[1][1] * mat[2][2] - mat[1][2] * mat[2][1];
//	inverse[1][0] = mat[1][2] * mat[2][0] - mat[1][0] * mat[2][2];
//	inverse[2][0] = mat[1][0] * mat[2][1] - mat[1][1] * mat[2][0];
//
//	det = mat[0][0] * inverse[0][0] + mat[0][1] * inverse[1][0] + mat[0][2] * inverse[2][0];
//
//	if ( idMath.Fabs( det ) < MATRIX_INVERSE_EPSILON ) {
//		return false;
//	}
//
//	invDet = 1.0 / det;
//
//	inverse[0][1] = mat[0][2] * mat[2][1] - mat[0][1] * mat[2][2];
//	inverse[0][2] = mat[0][1] * mat[1][2] - mat[0][2] * mat[1][1];
//	inverse[1][1] = mat[0][0] * mat[2][2] - mat[0][2] * mat[2][0];
//	inverse[1][2] = mat[0][2] * mat[1][0] - mat[0][0] * mat[1][2];
//	inverse[2][1] = mat[0][1] * mat[2][0] - mat[0][0] * mat[2][1];
//	inverse[2][2] = mat[0][0] * mat[1][1] - mat[0][1] * mat[1][0];
//
//	mat[0][0] = inverse[0][0] * invDet;
//	mat[0][1] = inverse[0][1] * invDet;
//	mat[0][2] = inverse[0][2] * invDet;
//
//	mat[1][0] = inverse[1][0] * invDet;
//	mat[1][1] = inverse[1][1] * invDet;
//	mat[1][2] = inverse[1][2] * invDet;
//
//	mat[2][0] = inverse[2][0] * invDet;
//	mat[2][1] = inverse[2][1] * invDet;
//	mat[2][2] = inverse[2][2] * invDet;
//
//	return true;
//#elif 0
//	// 3*10 = 30 multiplications
//	//		   3 divisions
//	float *mat = reinterpret_cast<float *>(this);
//	float s;
//	double d, di;
//
//	di = mat[0];
//	s = di;
//	mat[0] = d = 1.0 / di;
//	mat[1] *= d;
//	mat[2] *= d;
//	d = -d;
//	mat[3] *= d;
//	mat[6] *= d;
//	d = mat[3] * di;
//	mat[4] += mat[1] * d;
//	mat[5] += mat[2] * d;
//	d = mat[6] * di;
//	mat[7] += mat[1] * d;
//	mat[8] += mat[2] * d;
//	di = mat[4];
//	s *= di;
//	mat[4] = d = 1.0 / di;
//	mat[3] *= d;
//	mat[5] *= d;
//	d = -d;
//	mat[1] *= d;
//	mat[7] *= d;
//	d = mat[1] * di;
//	mat[0] += mat[3] * d;
//	mat[2] += mat[5] * d;
//	d = mat[7] * di;
//	mat[6] += mat[3] * d;
//	mat[8] += mat[5] * d;
//	di = mat[8];
//	s *= di;
//	mat[8] = d = 1.0 / di;
//	mat[6] *= d;
//	mat[7] *= d;
//	d = -d;
//	mat[2] *= d;
//	mat[5] *= d;
//	d = mat[2] * di;
//	mat[0] += mat[6] * d;
//	mat[1] += mat[7] * d;
//	d = mat[5] * di;
//	mat[3] += mat[6] * d;
//	mat[4] += mat[7] * d;
//
//	return ( s != 0.0 && !FLOAT_IS_NAN( s ) );
//#else
//	//	4*2+4*4 = 24 multiplications
//	//		2*1 =  2 divisions
//	idMat2 r0;
//	float r1[2], r2[2], r3;
//	float det, invDet;
//	float *mat = reinterpret_cast<float *>(this);
//
//	// r0 = m0.Inverse();	// 2x2
//	det = mat[0*3+0] * mat[1*3+1] - mat[0*3+1] * mat[1*3+0];
//
//	if ( idMath.Fabs( det ) < MATRIX_INVERSE_EPSILON ) {
//		return false;
//	}
//
//	invDet = 1.0 / det;
//
//	r0[0][0] =   mat[1*3+1] * invDet;
//	r0[0][1] = - mat[0*3+1] * invDet;
//	r0[1][0] = - mat[1*3+0] * invDet;
//	r0[1][1] =   mat[0*3+0] * invDet;
//
//	// r1 = r0 * m1;		// 2x1 = 2x2 * 2x1
//	r1[0] = r0[0][0] * mat[0*3+2] + r0[0][1] * mat[1*3+2];
//	r1[1] = r0[1][0] * mat[0*3+2] + r0[1][1] * mat[1*3+2];
//
//	// r2 = m2 * r1;		// 1x1 = 1x2 * 2x1
//	r2[0] = mat[2*3+0] * r1[0] + mat[2*3+1] * r1[1];
//
//	// r3 = r2 - m3;		// 1x1 = 1x1 - 1x1
//	r3 = r2[0] - mat[2*3+2];
//
//	// r3.InverseSelf();
//	if ( idMath.Fabs( r3 ) < MATRIX_INVERSE_EPSILON ) {
//		return false;
//	}
//
//	r3 = 1.0 / r3;
//
//	// r2 = m2 * r0;		// 1x2 = 1x2 * 2x2
//	r2[0] = mat[2*3+0] * r0[0][0] + mat[2*3+1] * r0[1][0];
//	r2[1] = mat[2*3+0] * r0[0][1] + mat[2*3+1] * r0[1][1];
//
//	// m2 = r3 * r2;		// 1x2 = 1x1 * 1x2
//	mat[2*3+0] = r3 * r2[0];
//	mat[2*3+1] = r3 * r2[1];
//
//	// m0 = r0 - r1 * m2;	// 2x2 - 2x1 * 1x2
//	mat[0*3+0] = r0[0][0] - r1[0] * mat[2*3+0];
//	mat[0*3+1] = r0[0][1] - r1[0] * mat[2*3+1];
//	mat[1*3+0] = r0[1][0] - r1[1] * mat[2*3+0];
//	mat[1*3+1] = r0[1][1] - r1[1] * mat[2*3+1];
//
//	// m1 = r1 * r3;		// 2x1 = 2x1 * 1x1
//	mat[0*3+2] = r1[0] * r3;
//	mat[1*3+2] = r1[1] * r3;
//
//	// m3 = -r3;
//	mat[2*3+2] = -r3;
//
//	return true;
//#endif
//}
//
///*
//============
//idMat3::InertiaTranslate
//============
//*/
//idMat3 idMat3::InertiaTranslate( const float mass, const idVec3 &centerOfMass, const idVec3 &translation ) const {
//	idMat3 m;
//	idVec3 newCenter;
//
//	newCenter = centerOfMass + translation;
//
//	m[0][0] = mass * ( ( centerOfMass[1] * centerOfMass[1] + centerOfMass[2] * centerOfMass[2] )
//				- ( newCenter[1] * newCenter[1] + newCenter[2] * newCenter[2] ) );
//	m[1][1] = mass * ( ( centerOfMass[0] * centerOfMass[0] + centerOfMass[2] * centerOfMass[2] )
//				- ( newCenter[0] * newCenter[0] + newCenter[2] * newCenter[2] ) );
//	m[2][2] = mass * ( ( centerOfMass[0] * centerOfMass[0] + centerOfMass[1] * centerOfMass[1] )
//				- ( newCenter[0] * newCenter[0] + newCenter[1] * newCenter[1] ) );
//
//	m[0][1] = m[1][0] = mass * ( newCenter[0] * newCenter[1] - centerOfMass[0] * centerOfMass[1] );
//	m[1][2] = m[2][1] = mass * ( newCenter[1] * newCenter[2] - centerOfMass[1] * centerOfMass[2] );
//	m[0][2] = m[2][0] = mass * ( newCenter[0] * newCenter[2] - centerOfMass[0] * centerOfMass[2] );
//
//	return (*this) + m;
//}
//
///*
//============
//idMat3::InertiaTranslateSelf
//============
//*/
//idMat3 &idMat3::InertiaTranslateSelf( const float mass, const idVec3 &centerOfMass, const idVec3 &translation ) {
//	idMat3 m;
//	idVec3 newCenter;
//
//	newCenter = centerOfMass + translation;
//
//	m[0][0] = mass * ( ( centerOfMass[1] * centerOfMass[1] + centerOfMass[2] * centerOfMass[2] )
//				- ( newCenter[1] * newCenter[1] + newCenter[2] * newCenter[2] ) );
//	m[1][1] = mass * ( ( centerOfMass[0] * centerOfMass[0] + centerOfMass[2] * centerOfMass[2] )
//				- ( newCenter[0] * newCenter[0] + newCenter[2] * newCenter[2] ) );
//	m[2][2] = mass * ( ( centerOfMass[0] * centerOfMass[0] + centerOfMass[1] * centerOfMass[1] )
//				- ( newCenter[0] * newCenter[0] + newCenter[1] * newCenter[1] ) );
//
//	m[0][1] = m[1][0] = mass * ( newCenter[0] * newCenter[1] - centerOfMass[0] * centerOfMass[1] );
//	m[1][2] = m[2][1] = mass * ( newCenter[1] * newCenter[2] - centerOfMass[1] * centerOfMass[2] );
//	m[0][2] = m[2][0] = mass * ( newCenter[0] * newCenter[2] - centerOfMass[0] * centerOfMass[2] );
//
//	(*this) += m;
//
//	return (*this);
//}
//
///*
//============
//idMat3::InertiaRotate
//============
//*/
//idMat3 idMat3::InertiaRotate( const idMat3 &rotation ) const {
//	// NOTE: the rotation matrix is stored column-major
//	return rotation.Transpose() * (*this) * rotation;
//}
//
///*
//============
//idMat3::InertiaRotateSelf
//============
//*/
//idMat3 &idMat3::InertiaRotateSelf( const idMat3 &rotation ) {
//	// NOTE: the rotation matrix is stored column-major
//	*this = rotation.Transpose() * (*this) * rotation;
//	return *this;
//}
//
/*
=============
idMat3::ToString
=============
*/
ToString( /*int */precision = 2 ) :string {
	return idStr.FloatArrayToString(this.ToFloatPtr(), this.GetDimension(), precision );
}
};

Object.defineProperty(idMat3.prototype, "0", {
	get: function (): number {
		return this.mat[0];
	},
	set: function (value: number): void {
		todoThrow();
	},
	enumerable: false,
	configurable: false
});

Object.defineProperty(idMat3.prototype, "1", {
	get: function (): number {
		return this.mat[1];
	},
	set: function (value: number): void {
		todoThrow();
	},
	enumerable: false,
	configurable: false
});

Object.defineProperty(idMat3.prototype, "2", {
	get: function (): number {
		return this.mat[2];
	},
	set: function (value: number): void {
		todoThrow();
	},
	enumerable: false,
	configurable: false
});


var mat3_zero = new idMat3();
var mat3_identity = new idMat3( new idVec3( 1, 0, 0 ), new idVec3( 0, 1, 0 ), new idVec3( 0, 0, 1 ) );
var mat3_default = mat3_identity;

//===============================================================
//
//	idMat4 - 4x4 matrix
//
//===============================================================

class idMat4 {
//public:
//					idMat4( );
//					explicit idMat4( const idVec4 &x, const idVec4 &y, const idVec4 &z, const idVec4 &w );
//					explicit idMat4(const float xx, const float xy, const float xz, const float xw,
//									const float yx, const float yy, const float yz, const float yw,
//									const float zx, const float zy, const float zz, const float zw,
//									const float wx, const float wy, const float wz, const float ww );
//					explicit idMat4( const idMat3 &rotation, const idVec3 &translation );
//					explicit idMat4( const float src[ 4 ][ 4 ] );
//
//	const idVec4 &	operator[]( int index ) const;
//	idVec4 &		operator[]( int index );
//	idMat4			operator*( const float a ) const;
//	idVec4			operator*( const idVec4 &vec ) const;
//	idVec3			operator*( vec:idVec3 ) const;
//	idMat4			operator*( const idMat4 &a ) const;
//	idMat4			operator+( const idMat4 &a ) const;
//	idMat4			operator-( const idMat4 &a ) const;
//	idMat4 &		operator*=( const float a );
//	idMat4 &		operator*=( const idMat4 &a );
//	idMat4 &		operator+=( const idMat4 &a );
//	idMat4 &		operator-=( const idMat4 &a );
//
//	friend idMat4	operator*( const float a, const idMat4 &mat );
//	friend idVec4	operator*( const idVec4 &vec, const idMat4 &mat );
//	friend idVec3	operator*( vec:idVec3, const idMat4 &mat );
//	friend idVec4 &	operator*=( idVec4 &vec, const idMat4 &mat );
//	friend idVec3 &	operator*=( vec:idVec3, const idMat4 &mat );
//
//	bool			Compare( const idMat4 &a ) const;						// exact compare, no epsilon
//	bool			Compare( const idMat4 &a, const float epsilon ) const;	// compare with epsilon
//	bool			operator==( const idMat4 &a ) const;					// exact compare, no epsilon
//	bool			operator!=( const idMat4 &a ) const;					// exact compare, no epsilon
//
//	void			Zero( );
//	void			Identity( );
//	bool			IsIdentity( const float epsilon = MATRIX_EPSILON ) const;
//	bool			IsSymmetric( const float epsilon = MATRIX_EPSILON ) const;
//	bool			IsDiagonal( const float epsilon = MATRIX_EPSILON ) const;
//	bool			IsRotated( ) const;
//
//	void			ProjectVector( const idVec4 &src, idVec4 &dst ) const;
//	void			UnprojectVector( const idVec4 &src, idVec4 &dst ) const;
//
//	float			Trace( ) const;
//	float			Determinant( ) const;
//	idMat4			Transpose( ) const;	// returns transpose
//	idMat4 &		TransposeSelf( );
//	idMat4			Inverse( ) const;		// returns the inverse ( m * m.Inverse() = identity )
//	bool			InverseSelf( );		// returns false if determinant is zero
//	idMat4			InverseFast( ) const;	// returns the inverse ( m * m.Inverse() = identity )
//	bool			InverseFastSelf( );	// returns false if determinant is zero
//	idMat4			TransposeMultiply( const idMat4 &b ) const;
//
//	int				GetDimension( ) const;
//
//	const float *	ToFloatPtr( ) const;
//	float *			ToFloatPtr( );
//	const char *	ToString( int precision = 2 ) const;
//
//private:
	mat = newStructArray<idVec4>( idVec4, 4 )

//};
//
//extern idMat4 mat4_zero;
//extern idMat4 mat4_identity;
//#define mat4_default	mat4_identity
//
//ID_INLINE idMat4::idMat4( ) {
//}
//
//ID_INLINE idMat4::idMat4( const idVec4 &x, const idVec4 &y, const idVec4 &z, const idVec4 &w ) {
//	mat[ 0 ] = x;
//	mat[ 1 ] = y;
//	mat[ 2 ] = z;
//	mat[ 3 ] = w;
//}

	constructor ( )
	constructor ( x: idVec4, y: idVec4, z: idVec4, w: idVec4 )
	constructor ( x?: idVec4, y?: idVec4, z?: idVec4, w?: idVec4 ) {
		if ( x && y && z && w ) {
			this.mat[0].opEquals( x );
			this.mat[1].opEquals( y );
			this.mat[2].opEquals( z );
			this.mat[3].opEquals( w );
		}
	}

//
//ID_INLINE idMat4::idMat4( const float xx, const float xy, const float xz, const float xw,
//							const float yx, const float yy, const float yz, const float yw,
//							const float zx, const float zy, const float zz, const float zw,
//							const float wx, const float wy, const float wz, const float ww ) {
//	mat[0][0] = xx; mat[0][1] = xy; mat[0][2] = xz; mat[0][3] = xw;
//	mat[1][0] = yx; mat[1][1] = yy; mat[1][2] = yz; mat[1][3] = yw;
//	mat[2][0] = zx; mat[2][1] = zy; mat[2][2] = zz; mat[2][3] = zw;
//	mat[3][0] = wx; mat[3][1] = wy; mat[3][2] = wz; mat[3][3] = ww;
//}
//
//ID_INLINE idMat4::idMat4( const idMat3 &rotation, const idVec3 &translation ) {
//	// NOTE: idMat3 is transposed because it is column-major
//	mat[ 0 ][ 0 ] = rotation[0][0];
//	mat[ 0 ][ 1 ] = rotation[1][0];
//	mat[ 0 ][ 2 ] = rotation[2][0];
//	mat[ 0 ][ 3 ] = translation[0];
//	mat[ 1 ][ 0 ] = rotation[0][1];
//	mat[ 1 ][ 1 ] = rotation[1][1];
//	mat[ 1 ][ 2 ] = rotation[2][1];
//	mat[ 1 ][ 3 ] = translation[1];
//	mat[ 2 ][ 0 ] = rotation[0][2];
//	mat[ 2 ][ 1 ] = rotation[1][2];
//	mat[ 2 ][ 2 ] = rotation[2][2];
//	mat[ 2 ][ 3 ] = translation[2];
//	mat[ 3 ][ 0 ] = 0.0;
//	mat[ 3 ][ 1 ] = 0.0;
//	mat[ 3 ][ 2 ] = 0.0;
//	mat[ 3 ][ 3 ] = 1.0;
//}
//
//ID_INLINE idMat4::idMat4( const float src[ 4 ][ 4 ] ) {
//	memcpy( mat, src, 4 * 4 * sizeof( float ) );
//}
//
//ID_INLINE const idVec4 &idMat4::operator[]( int index ) const {
//	//assert( ( index >= 0 ) && ( index < 4 ) );
//	return mat[ index ];
//}
	[index: number]: idVec4;
//ID_INLINE idVec4 &idMat4::operator[]( int index ) {
//	//assert( ( index >= 0 ) && ( index < 4 ) );
//	return mat[ index ];
//}
//
//ID_INLINE idMat4 idMat4::operator*( const float a ) const {
//	return idMat4(
//		mat[0].x * a, mat[0].y * a, mat[0].z * a, mat[0].w * a,
//		mat[1].x * a, mat[1].y * a, mat[1].z * a, mat[1].w * a,
//		mat[2].x * a, mat[2].y * a, mat[2].z * a, mat[2].w * a,
//		mat[3].x * a, mat[3].y * a, mat[3].z * a, mat[3].w * a );
//}
//
//ID_INLINE idVec4 idMat4::operator*( const idVec4 &vec ) const {
//	return idVec4(
//		mat[ 0 ].x * vec.x + mat[ 0 ].y * vec.y + mat[ 0 ].z * vec.z + mat[ 0 ].w * vec.w,
//		mat[ 1 ].x * vec.x + mat[ 1 ].y * vec.y + mat[ 1 ].z * vec.z + mat[ 1 ].w * vec.w,
//		mat[ 2 ].x * vec.x + mat[ 2 ].y * vec.y + mat[ 2 ].z * vec.z + mat[ 2 ].w * vec.w,
//		mat[ 3 ].x * vec.x + mat[ 3 ].y * vec.y + mat[ 3 ].z * vec.z + mat[ 3 ].w * vec.w );
//}
//
//ID_INLINE idVec3 idMat4::operator*( vec:idVec3 ) const {
//	float s = mat[ 3 ].x * vec.x + mat[ 3 ].y * vec.y + mat[ 3 ].z * vec.z + mat[ 3 ].w;
//	if ( s == 0.0 ) {
//		return idVec3( 0.0, 0.0, 0.0 );
//	}
//	if ( s == 1.0 ) {
//		return idVec3(
//			mat[ 0 ].x * vec.x + mat[ 0 ].y * vec.y + mat[ 0 ].z * vec.z + mat[ 0 ].w,
//			mat[ 1 ].x * vec.x + mat[ 1 ].y * vec.y + mat[ 1 ].z * vec.z + mat[ 1 ].w,
//			mat[ 2 ].x * vec.x + mat[ 2 ].y * vec.y + mat[ 2 ].z * vec.z + mat[ 2 ].w );
//	}
//	else {
//		float invS = 1.0 / s;
//		return idVec3(
//			(mat[ 0 ].x * vec.x + mat[ 0 ].y * vec.y + mat[ 0 ].z * vec.z + mat[ 0 ].w) * invS,
//			(mat[ 1 ].x * vec.x + mat[ 1 ].y * vec.y + mat[ 1 ].z * vec.z + mat[ 1 ].w) * invS,
//			(mat[ 2 ].x * vec.x + mat[ 2 ].y * vec.y + mat[ 2 ].z * vec.z + mat[ 2 ].w) * invS );
//	}
//}
//
//ID_INLINE idMat4 idMat4::operator*( const idMat4 &a ) const {
//	var /*int */i:number, j:number;
//	const float *m1Ptr, *m2Ptr;
//	float *dstPtr;
//	idMat4 dst;
//
//	m1Ptr = reinterpret_cast<const float *>(this);
//	m2Ptr = reinterpret_cast<const float *>(&a);
//	dstPtr = reinterpret_cast<float *>(&dst);
//
//	for ( i = 0; i < 4; i++ ) {
//		for ( j = 0; j < 4; j++ ) {
//			*dstPtr = m1Ptr[0] * m2Ptr[ 0 * 4 + j ]
//					+ m1Ptr[1] * m2Ptr[ 1 * 4 + j ]
//					+ m1Ptr[2] * m2Ptr[ 2 * 4 + j ]
//					+ m1Ptr[3] * m2Ptr[ 3 * 4 + j ];
//			dstPtr++;
//		}
//		m1Ptr += 4;
//	}
//	return dst;
//}
//
//ID_INLINE idMat4 idMat4::operator+( const idMat4 &a ) const {
//	return idMat4( 
//		mat[0].x + a[0].x, mat[0].y + a[0].y, mat[0].z + a[0].z, mat[0].w + a[0].w,
//		mat[1].x + a[1].x, mat[1].y + a[1].y, mat[1].z + a[1].z, mat[1].w + a[1].w,
//		mat[2].x + a[2].x, mat[2].y + a[2].y, mat[2].z + a[2].z, mat[2].w + a[2].w,
//		mat[3].x + a[3].x, mat[3].y + a[3].y, mat[3].z + a[3].z, mat[3].w + a[3].w );
//}
//    
//ID_INLINE idMat4 idMat4::operator-( const idMat4 &a ) const {
//	return idMat4( 
//		mat[0].x - a[0].x, mat[0].y - a[0].y, mat[0].z - a[0].z, mat[0].w - a[0].w,
//		mat[1].x - a[1].x, mat[1].y - a[1].y, mat[1].z - a[1].z, mat[1].w - a[1].w,
//		mat[2].x - a[2].x, mat[2].y - a[2].y, mat[2].z - a[2].z, mat[2].w - a[2].w,
//		mat[3].x - a[3].x, mat[3].y - a[3].y, mat[3].z - a[3].z, mat[3].w - a[3].w );
//}
//
//ID_INLINE idMat4 &idMat4::operator*=( const float a ) {
//	mat[0].x *= a; mat[0].y *= a; mat[0].z *= a; mat[0].w *= a;
//	mat[1].x *= a; mat[1].y *= a; mat[1].z *= a; mat[1].w *= a;
//	mat[2].x *= a; mat[2].y *= a; mat[2].z *= a; mat[2].w *= a;
//	mat[3].x *= a; mat[3].y *= a; mat[3].z *= a; mat[3].w *= a;
//    return *this;
//}
//
//ID_INLINE idMat4 &idMat4::operator*=( const idMat4 &a ) {
//	*this = (*this) * a;
//	return *this;
//}
//
//ID_INLINE idMat4 &idMat4::operator+=( const idMat4 &a ) {
//	mat[0].x += a[0].x; mat[0].y += a[0].y; mat[0].z += a[0].z; mat[0].w += a[0].w;
//	mat[1].x += a[1].x; mat[1].y += a[1].y; mat[1].z += a[1].z; mat[1].w += a[1].w;
//	mat[2].x += a[2].x; mat[2].y += a[2].y; mat[2].z += a[2].z; mat[2].w += a[2].w;
//	mat[3].x += a[3].x; mat[3].y += a[3].y; mat[3].z += a[3].z; mat[3].w += a[3].w;
//    return *this;
//}
//
//ID_INLINE idMat4 &idMat4::operator-=( const idMat4 &a ) {
//	mat[0].x -= a[0].x; mat[0].y -= a[0].y; mat[0].z -= a[0].z; mat[0].w -= a[0].w;
//	mat[1].x -= a[1].x; mat[1].y -= a[1].y; mat[1].z -= a[1].z; mat[1].w -= a[1].w;
//	mat[2].x -= a[2].x; mat[2].y -= a[2].y; mat[2].z -= a[2].z; mat[2].w -= a[2].w;
//	mat[3].x -= a[3].x; mat[3].y -= a[3].y; mat[3].z -= a[3].z; mat[3].w -= a[3].w;
//    return *this;
//}
//
//ID_INLINE idMat4 operator*( const float a, const idMat4 &mat ) {
//	return mat * a;
//}
//
//ID_INLINE idVec4 operator*( const idVec4 &vec, const idMat4 &mat ) {
//	return mat * vec;
//}
//
//ID_INLINE idVec3 operator*( vec:idVec3, const idMat4 &mat ) {
//	return mat * vec;
//}
//
//ID_INLINE idVec4 &operator*=( idVec4 &vec, const idMat4 &mat ) {
//	vec = mat * vec;
//	return vec;
//}
//
//ID_INLINE idVec3 &operator*=( vec:idVec3, const idMat4 &mat ) {
//	vec = mat * vec;
//	return vec;
//}
//
//ID_INLINE bool idMat4::Compare( const idMat4 &a ) const {
//	dword i;
//	const float *ptr1, *ptr2;
//
//	ptr1 = reinterpret_cast<const float *>(mat);
//	ptr2 = reinterpret_cast<const float *>(a.mat);
//	for ( i = 0; i < 4*4; i++ ) {
//		if ( ptr1[i] != ptr2[i] ) {
//			return false;
//		}
//	}
//	return true;
//}
//
//ID_INLINE bool idMat4::Compare( const idMat4 &a, const float epsilon ) const {
//	dword i;
//	const float *ptr1, *ptr2;
//
//	ptr1 = reinterpret_cast<const float *>(mat);
//	ptr2 = reinterpret_cast<const float *>(a.mat);
//	for ( i = 0; i < 4*4; i++ ) {
//		if ( idMath.Fabs( ptr1[i] - ptr2[i] ) > epsilon ) {
//			return false;
//		}
//	}
//	return true;
//}
//
//ID_INLINE bool idMat4::operator==( const idMat4 &a ) const {
//	return this.Compare( a );
//}
//
//ID_INLINE bool idMat4::operator!=( const idMat4 &a ) const {
//	return !this.Compare( a );
//}
//
//ID_INLINE void idMat4::Zero( ) {
//	memset( mat, 0, sizeof( idMat4 ) );
//}
//
//ID_INLINE void idMat4::Identity( ) {
//	*this = mat4_identity;
//}
//
//ID_INLINE bool idMat4::IsIdentity( const float epsilon ) const {
//	return this.Compare( mat4_identity, epsilon );
//}
//
//ID_INLINE bool idMat4::IsSymmetric( const float epsilon ) const {
//	for ( int i = 1; i < 4; i++ ) {
//		for ( int j = 0; j < i; j++ ) {
//			if ( idMath.Fabs( mat[i][j] - mat[j][i] ) > epsilon ) {
//				return false;
//			}
//		}
//	}
//	return true;
//}
//
//ID_INLINE bool idMat4::IsDiagonal( const float epsilon ) const {
//	for ( int i = 0; i < 4; i++ ) {
//		for ( int j = 0; j < 4; j++ ) {
//			if ( i != j && idMath.Fabs( mat[i][j] ) > epsilon ) {
//				return false;
//			}
//		}
//	}
//	return true;
//}
//
//ID_INLINE bool idMat4::IsRotated( ) const {
//	if ( !mat[ 0 ][ 1 ] && !mat[ 0 ][ 2 ] &&
//		!mat[ 1 ][ 0 ] && !mat[ 1 ][ 2 ] &&
//		!mat[ 2 ][ 0 ] && !mat[ 2 ][ 1 ] ) {
//		return false;
//	}
//	return true;
//}
//
//ID_INLINE void idMat4::ProjectVector( const idVec4 &src, idVec4 &dst ) const {
//	dst.x = src * mat[ 0 ];
//	dst.y = src * mat[ 1 ];
//	dst.z = src * mat[ 2 ];
//	dst.w = src * mat[ 3 ];
//}
//
//ID_INLINE void idMat4::UnprojectVector( const idVec4 &src, idVec4 &dst ) const {
//	dst = mat[ 0 ] * src.x + mat[ 1 ] * src.y + mat[ 2 ] * src.z + mat[ 3 ] * src.w;
//}
//
//ID_INLINE float idMat4::Trace( ) const {
//	return ( mat[0][0] + mat[1][1] + mat[2][2] + mat[3][3] );
//}
//
//ID_INLINE idMat4 idMat4::Inverse( ) const {
//	idMat4 invMat;
//
//	invMat = *this;
//#if !defined(NDEBUG)
//	int r = 
//#endif
//		invMat.InverseSelf();
//	assert( r );
//	return invMat;
//}
//
//ID_INLINE idMat4 idMat4::InverseFast( ) const {
//	idMat4 invMat;
//
//	invMat = *this;
//#if !defined(NDEBUG)
//	int r = 
//#endif
//		invMat.InverseFastSelf();
//	assert( r );
//	return invMat;
//}
//
//ID_INLINE idMat4 idMat3::ToMat4( ) const {
//	// NOTE: idMat3 is transposed because it is column-major
//	return idMat4(	mat[0][0],	mat[1][0],	mat[2][0],	0.0,
//					mat[0][1],	mat[1][1],	mat[2][1],	0.0,
//					mat[0][2],	mat[1][2],	mat[2][2],	0.0,
//					0.0,		0.0,		0.0,		1.0 );
//}
//
//ID_INLINE int idMat4::GetDimension( ) const {
//	return 16;
//}
//
//ID_INLINE const float *idMat4::ToFloatPtr( ) const {
//	return mat[0].ToFloatPtr();
//}
//
	ToFloatPtr ( ): Float32Array {
		return new Float32Array( [
			this.mat[0][0], this.mat[0][1], this.mat[0][2], this.mat[0][3],
			this.mat[1][0], this.mat[1][1], this.mat[1][2], this.mat[1][3],
			this.mat[2][0], this.mat[2][1], this.mat[2][2], this.mat[2][3],
			this.mat[3][0], this.mat[3][1], this.mat[3][2], this.mat[3][3]
		] );
	}
}

var mat4_zero = new idMat4();
var mat4_identity = new idMat4( new idVec4( 1, 0, 0, 0 ), new idVec4( 0, 1, 0, 0 ), new idVec4( 0, 0, 1, 0 ), new idVec4( 0, 0, 0, 1 ) );
var mat4_default = mat4_identity;
//
////===============================================================
////
////	idMat5 - 5x5 matrix
////
////===============================================================
//
//class idMat5 {
//public:
//					idMat5( );
//					explicit idMat5( const idVec5 &v0, const idVec5 &v1, const idVec5 &v2, const idVec5 &v3, const idVec5 &v4 );
//					explicit idMat5( const float src[ 5 ][ 5 ] );
//
//	const idVec5 &	operator[]( int index ) const;
//	idVec5 &		operator[]( int index );
//	idMat5			operator*( const float a ) const;
//	idVec5			operator*( const idVec5 &vec ) const;
//	idMat5			operator*( const idMat5 &a ) const;
//	idMat5			operator+( const idMat5 &a ) const;
//	idMat5			operator-( const idMat5 &a ) const;
//	idMat5 &		operator*=( const float a );
//	idMat5 &		operator*=( const idMat5 &a );
//	idMat5 &		operator+=( const idMat5 &a );
//	idMat5 &		operator-=( const idMat5 &a );
//
//	friend idMat5	operator*( const float a, const idMat5 &mat );
//	friend idVec5	operator*( const idVec5 &vec, const idMat5 &mat );
//	friend idVec5 &	operator*=( idVec5 &vec, const idMat5 &mat );
//
//	bool			Compare( const idMat5 &a ) const;						// exact compare, no epsilon
//	bool			Compare( const idMat5 &a, const float epsilon ) const;	// compare with epsilon
//	bool			operator==( const idMat5 &a ) const;					// exact compare, no epsilon
//	bool			operator!=( const idMat5 &a ) const;					// exact compare, no epsilon
//
//	void			Zero( );
//	void			Identity( );
//	bool			IsIdentity( const float epsilon = MATRIX_EPSILON ) const;
//	bool			IsSymmetric( const float epsilon = MATRIX_EPSILON ) const;
//	bool			IsDiagonal( const float epsilon = MATRIX_EPSILON ) const;
//
//	float			Trace( ) const;
//	float			Determinant( ) const;
//	idMat5			Transpose( ) const;	// returns transpose
//	idMat5 &		TransposeSelf( );
//	idMat5			Inverse( ) const;		// returns the inverse ( m * m.Inverse() = identity )
//	bool			InverseSelf( );		// returns false if determinant is zero
//	idMat5			InverseFast( ) const;	// returns the inverse ( m * m.Inverse() = identity )
//	bool			InverseFastSelf( );	// returns false if determinant is zero
//
//	int				GetDimension( ) const;
//
//	const float *	ToFloatPtr( ) const;
//	float *			ToFloatPtr( );
//	const char *	ToString( int precision = 2 ) const;
//
//private:
//	idVec5			mat[ 5 ];
//};
//
//extern idMat5 mat5_zero;
//extern idMat5 mat5_identity;
//#define mat5_default	mat5_identity
//
//ID_INLINE idMat5::idMat5( ) {
//}
//
//ID_INLINE idMat5::idMat5( const float src[ 5 ][ 5 ] ) {
//	memcpy( mat, src, 5 * 5 * sizeof( float ) );
//}
//
//ID_INLINE idMat5::idMat5( const idVec5 &v0, const idVec5 &v1, const idVec5 &v2, const idVec5 &v3, const idVec5 &v4 ) {
//	mat[0] = v0;
//	mat[1] = v1;
//	mat[2] = v2;
//	mat[3] = v3;
//	mat[4] = v4;
//}
//
//ID_INLINE const idVec5 &idMat5::operator[]( int index ) const {
//	//assert( ( index >= 0 ) && ( index < 5 ) );
//	return mat[ index ];
//}
//
//ID_INLINE idVec5 &idMat5::operator[]( int index ) {
//	//assert( ( index >= 0 ) && ( index < 5 ) );
//	return mat[ index ];
//}
//
//ID_INLINE idMat5 idMat5::operator*( const idMat5 &a ) const {
//	var /*int */i:number, j:number;
//	const float *m1Ptr, *m2Ptr;
//	float *dstPtr;
//	idMat5 dst;
//
//	m1Ptr = reinterpret_cast<const float *>(this);
//	m2Ptr = reinterpret_cast<const float *>(&a);
//	dstPtr = reinterpret_cast<float *>(&dst);
//
//	for ( i = 0; i < 5; i++ ) {
//		for ( j = 0; j < 5; j++ ) {
//			*dstPtr = m1Ptr[0] * m2Ptr[ 0 * 5 + j ]
//					+ m1Ptr[1] * m2Ptr[ 1 * 5 + j ]
//					+ m1Ptr[2] * m2Ptr[ 2 * 5 + j ]
//					+ m1Ptr[3] * m2Ptr[ 3 * 5 + j ]
//					+ m1Ptr[4] * m2Ptr[ 4 * 5 + j ];
//			dstPtr++;
//		}
//		m1Ptr += 5;
//	}
//	return dst;
//}
//
//ID_INLINE idMat5 idMat5::operator*( const float a ) const {
//	return idMat5(
//		idVec5( mat[0][0] * a, mat[0][1] * a, mat[0][2] * a, mat[0][3] * a, mat[0][4] * a ),
//		idVec5( mat[1][0] * a, mat[1][1] * a, mat[1][2] * a, mat[1][3] * a, mat[1][4] * a ),
//		idVec5( mat[2][0] * a, mat[2][1] * a, mat[2][2] * a, mat[2][3] * a, mat[2][4] * a ),
//		idVec5( mat[3][0] * a, mat[3][1] * a, mat[3][2] * a, mat[3][3] * a, mat[3][4] * a ),
//		idVec5( mat[4][0] * a, mat[4][1] * a, mat[4][2] * a, mat[4][3] * a, mat[4][4] * a ) );
//}
//
//ID_INLINE idVec5 idMat5::operator*( const idVec5 &vec ) const {
//	return idVec5(
//		mat[0][0] * vec[0] + mat[0][1] * vec[1] + mat[0][2] * vec[2] + mat[0][3] * vec[3] + mat[0][4] * vec[4],
//		mat[1][0] * vec[0] + mat[1][1] * vec[1] + mat[1][2] * vec[2] + mat[1][3] * vec[3] + mat[1][4] * vec[4],
//		mat[2][0] * vec[0] + mat[2][1] * vec[1] + mat[2][2] * vec[2] + mat[2][3] * vec[3] + mat[2][4] * vec[4],
//		mat[3][0] * vec[0] + mat[3][1] * vec[1] + mat[3][2] * vec[2] + mat[3][3] * vec[3] + mat[3][4] * vec[4],
//		mat[4][0] * vec[0] + mat[4][1] * vec[1] + mat[4][2] * vec[2] + mat[4][3] * vec[3] + mat[4][4] * vec[4] );
//}
//
//ID_INLINE idMat5 idMat5::operator+( const idMat5 &a ) const {
//	return idMat5(
//		idVec5( mat[0][0] + a[0][0], mat[0][1] + a[0][1], mat[0][2] + a[0][2], mat[0][3] + a[0][3], mat[0][4] + a[0][4] ),
//		idVec5( mat[1][0] + a[1][0], mat[1][1] + a[1][1], mat[1][2] + a[1][2], mat[1][3] + a[1][3], mat[1][4] + a[1][4] ),
//		idVec5( mat[2][0] + a[2][0], mat[2][1] + a[2][1], mat[2][2] + a[2][2], mat[2][3] + a[2][3], mat[2][4] + a[2][4] ),
//		idVec5( mat[3][0] + a[3][0], mat[3][1] + a[3][1], mat[3][2] + a[3][2], mat[3][3] + a[3][3], mat[3][4] + a[3][4] ),
//		idVec5( mat[4][0] + a[4][0], mat[4][1] + a[4][1], mat[4][2] + a[4][2], mat[4][3] + a[4][3], mat[4][4] + a[4][4] ) );
//}
//
//ID_INLINE idMat5 idMat5::operator-( const idMat5 &a ) const {
//	return idMat5(
//		idVec5( mat[0][0] - a[0][0], mat[0][1] - a[0][1], mat[0][2] - a[0][2], mat[0][3] - a[0][3], mat[0][4] - a[0][4] ),
//		idVec5( mat[1][0] - a[1][0], mat[1][1] - a[1][1], mat[1][2] - a[1][2], mat[1][3] - a[1][3], mat[1][4] - a[1][4] ),
//		idVec5( mat[2][0] - a[2][0], mat[2][1] - a[2][1], mat[2][2] - a[2][2], mat[2][3] - a[2][3], mat[2][4] - a[2][4] ),
//		idVec5( mat[3][0] - a[3][0], mat[3][1] - a[3][1], mat[3][2] - a[3][2], mat[3][3] - a[3][3], mat[3][4] - a[3][4] ),
//		idVec5( mat[4][0] - a[4][0], mat[4][1] - a[4][1], mat[4][2] - a[4][2], mat[4][3] - a[4][3], mat[4][4] - a[4][4] ) );
//}
//
//ID_INLINE idMat5 &idMat5::operator*=( const float a ) {
//	mat[0][0] *= a; mat[0][1] *= a; mat[0][2] *= a; mat[0][3] *= a; mat[0][4] *= a;
//	mat[1][0] *= a; mat[1][1] *= a; mat[1][2] *= a; mat[1][3] *= a; mat[1][4] *= a;
//	mat[2][0] *= a; mat[2][1] *= a; mat[2][2] *= a; mat[2][3] *= a; mat[2][4] *= a;
//	mat[3][0] *= a; mat[3][1] *= a; mat[3][2] *= a; mat[3][3] *= a; mat[3][4] *= a;
//	mat[4][0] *= a; mat[4][1] *= a; mat[4][2] *= a; mat[4][3] *= a; mat[4][4] *= a;
//	return *this;
//}
//
//ID_INLINE idMat5 &idMat5::operator*=( const idMat5 &a ) {
//	*this = *this * a;
//	return *this;
//}
//
//ID_INLINE idMat5 &idMat5::operator+=( const idMat5 &a ) {
//	mat[0][0] += a[0][0]; mat[0][1] += a[0][1]; mat[0][2] += a[0][2]; mat[0][3] += a[0][3]; mat[0][4] += a[0][4];
//	mat[1][0] += a[1][0]; mat[1][1] += a[1][1]; mat[1][2] += a[1][2]; mat[1][3] += a[1][3]; mat[1][4] += a[1][4];
//	mat[2][0] += a[2][0]; mat[2][1] += a[2][1]; mat[2][2] += a[2][2]; mat[2][3] += a[2][3]; mat[2][4] += a[2][4];
//	mat[3][0] += a[3][0]; mat[3][1] += a[3][1]; mat[3][2] += a[3][2]; mat[3][3] += a[3][3]; mat[3][4] += a[3][4];
//	mat[4][0] += a[4][0]; mat[4][1] += a[4][1]; mat[4][2] += a[4][2]; mat[4][3] += a[4][3]; mat[4][4] += a[4][4];
//	return *this;
//}
//
//ID_INLINE idMat5 &idMat5::operator-=( const idMat5 &a ) {
//	mat[0][0] -= a[0][0]; mat[0][1] -= a[0][1]; mat[0][2] -= a[0][2]; mat[0][3] -= a[0][3]; mat[0][4] -= a[0][4];
//	mat[1][0] -= a[1][0]; mat[1][1] -= a[1][1]; mat[1][2] -= a[1][2]; mat[1][3] -= a[1][3]; mat[1][4] -= a[1][4];
//	mat[2][0] -= a[2][0]; mat[2][1] -= a[2][1]; mat[2][2] -= a[2][2]; mat[2][3] -= a[2][3]; mat[2][4] -= a[2][4];
//	mat[3][0] -= a[3][0]; mat[3][1] -= a[3][1]; mat[3][2] -= a[3][2]; mat[3][3] -= a[3][3]; mat[3][4] -= a[3][4];
//	mat[4][0] -= a[4][0]; mat[4][1] -= a[4][1]; mat[4][2] -= a[4][2]; mat[4][3] -= a[4][3]; mat[4][4] -= a[4][4];
//	return *this;
//}
//
//ID_INLINE idVec5 operator*( const idVec5 &vec, const idMat5 &mat ) {
//	return mat * vec;
//}
//
//ID_INLINE idMat5 operator*( const float a, idMat5 const &mat ) {
//	return mat * a;
//}
//
//ID_INLINE idVec5 &operator*=( idVec5 &vec, const idMat5 &mat ) {
//	vec = mat * vec;
//	return vec;
//}
//
//ID_INLINE bool idMat5::Compare( const idMat5 &a ) const {
//	dword i;
//	const float *ptr1, *ptr2;
//
//	ptr1 = reinterpret_cast<const float *>(mat);
//	ptr2 = reinterpret_cast<const float *>(a.mat);
//	for ( i = 0; i < 5*5; i++ ) {
//		if ( ptr1[i] != ptr2[i] ) {
//			return false;
//		}
//	}
//	return true;
//}
//
//ID_INLINE bool idMat5::Compare( const idMat5 &a, const float epsilon ) const {
//	dword i;
//	const float *ptr1, *ptr2;
//
//	ptr1 = reinterpret_cast<const float *>(mat);
//	ptr2 = reinterpret_cast<const float *>(a.mat);
//	for ( i = 0; i < 5*5; i++ ) {
//		if ( idMath.Fabs( ptr1[i] - ptr2[i] ) > epsilon ) {
//			return false;
//		}
//	}
//	return true;
//}
//
//ID_INLINE bool idMat5::operator==( const idMat5 &a ) const {
//	return this.Compare( a );
//}
//
//ID_INLINE bool idMat5::operator!=( const idMat5 &a ) const {
//	return !this.Compare( a );
//}
//
//ID_INLINE void idMat5::Zero( ) {
//	memset( mat, 0, sizeof( idMat5 ) );
//}
//
//ID_INLINE void idMat5::Identity( ) {
//	*this = mat5_identity;
//}
//
//ID_INLINE bool idMat5::IsIdentity( const float epsilon ) const {
//	return this.Compare( mat5_identity, epsilon );
//}
//
//ID_INLINE bool idMat5::IsSymmetric( const float epsilon ) const {
//	for ( int i = 1; i < 5; i++ ) {
//		for ( int j = 0; j < i; j++ ) {
//			if ( idMath.Fabs( mat[i][j] - mat[j][i] ) > epsilon ) {
//				return false;
//			}
//		}
//	}
//	return true;
//}
//
//ID_INLINE bool idMat5::IsDiagonal( const float epsilon ) const {
//	for ( int i = 0; i < 5; i++ ) {
//		for ( int j = 0; j < 5; j++ ) {
//			if ( i != j && idMath.Fabs( mat[i][j] ) > epsilon ) {
//				return false;
//			}
//		}
//	}
//	return true;
//}
//
//ID_INLINE float idMat5::Trace( ) const {
//	return ( mat[0][0] + mat[1][1] + mat[2][2] + mat[3][3] + mat[4][4] );
//}
//
//ID_INLINE idMat5 idMat5::Inverse( ) const {
//	idMat5 invMat;
//
//	invMat = *this;
//#if !defined(NDEBUG)
//	int r = 
//#endif
//		invMat.InverseSelf();
//	assert( r );
//	return invMat;
//}
//
//ID_INLINE idMat5 idMat5::InverseFast( ) const {
//	idMat5 invMat;
//
//	invMat = *this;
//#if !defined(NDEBUG)
//	int r = 
//#endif
//		invMat.InverseFastSelf();
//	assert( r );
//	return invMat;
//}
//
//ID_INLINE int idMat5::GetDimension( ) const {
//	return 25;
//}
//
//ID_INLINE const float *idMat5::ToFloatPtr( ) const {
//	return mat[0].ToFloatPtr();
//}
//
//ID_INLINE float *idMat5::ToFloatPtr( ) {
//	return mat[0].ToFloatPtr();
//}
//
//
////===============================================================
////
////	idMat6 - 6x6 matrix
////
////===============================================================
//
//class idMat6 {
//public:
//					idMat6( );
//					explicit idMat6( const idVec6 &v0, const idVec6 &v1, const idVec6 &v2, const idVec6 &v3, const idVec6 &v4, const idVec6 &v5 );
//					explicit idMat6( const idMat3 &m0, const idMat3 &m1, const idMat3 &m2, const idMat3 &m3 );
//					explicit idMat6( const float src[ 6 ][ 6 ] );
//
//	const idVec6 &	operator[]( int index ) const;
//	idVec6 &		operator[]( int index );
//	idMat6			operator*( const float a ) const;
//	idVec6			operator*( const idVec6 &vec ) const;
//	idMat6			operator*( const idMat6 &a ) const;
//	idMat6			operator+( const idMat6 &a ) const;
//	idMat6			operator-( const idMat6 &a ) const;
//	idMat6 &		operator*=( const float a );
//	idMat6 &		operator*=( const idMat6 &a );
//	idMat6 &		operator+=( const idMat6 &a );
//	idMat6 &		operator-=( const idMat6 &a );
//
//	friend idMat6	operator*( const float a, const idMat6 &mat );
//	friend idVec6	operator*( const idVec6 &vec, const idMat6 &mat );
//	friend idVec6 &	operator*=( idVec6 &vec, const idMat6 &mat );
//
//	bool			Compare( const idMat6 &a ) const;						// exact compare, no epsilon
//	bool			Compare( const idMat6 &a, const float epsilon ) const;	// compare with epsilon
//	bool			operator==( const idMat6 &a ) const;					// exact compare, no epsilon
//	bool			operator!=( const idMat6 &a ) const;					// exact compare, no epsilon
//
//	void			Zero( );
//	void			Identity( );
//	bool			IsIdentity( const float epsilon = MATRIX_EPSILON ) const;
//	bool			IsSymmetric( const float epsilon = MATRIX_EPSILON ) const;
//	bool			IsDiagonal( const float epsilon = MATRIX_EPSILON ) const;
//
//	idMat3			SubMat3( int n ) const;
//	float			Trace( ) const;
//	float			Determinant( ) const;
//	idMat6			Transpose( ) const;	// returns transpose
//	idMat6 &		TransposeSelf( );
//	idMat6			Inverse( ) const;		// returns the inverse ( m * m.Inverse() = identity )
//	bool			InverseSelf( );		// returns false if determinant is zero
//	idMat6			InverseFast( ) const;	// returns the inverse ( m * m.Inverse() = identity )
//	bool			InverseFastSelf( );	// returns false if determinant is zero
//
//	int				GetDimension( ) const;
//
//	const float *	ToFloatPtr( ) const;
//	float *			ToFloatPtr( );
//	const char *	ToString( int precision = 2 ) const;
//
//private:
//	idVec6			mat[ 6 ];
//};
//
//extern idMat6 mat6_zero;
//extern idMat6 mat6_identity;
//#define mat6_default	mat6_identity
//
//ID_INLINE idMat6::idMat6( ) {
//}
//
//ID_INLINE idMat6::idMat6( const idMat3 &m0, const idMat3 &m1, const idMat3 &m2, const idMat3 &m3 ) {
//	mat[0] = idVec6( m0[0][0], m0[0][1], m0[0][2], m1[0][0], m1[0][1], m1[0][2] );
//	mat[1] = idVec6( m0[1][0], m0[1][1], m0[1][2], m1[1][0], m1[1][1], m1[1][2] );
//	mat[2] = idVec6( m0[2][0], m0[2][1], m0[2][2], m1[2][0], m1[2][1], m1[2][2] );
//	mat[3] = idVec6( m2[0][0], m2[0][1], m2[0][2], m3[0][0], m3[0][1], m3[0][2] );
//	mat[4] = idVec6( m2[1][0], m2[1][1], m2[1][2], m3[1][0], m3[1][1], m3[1][2] );
//	mat[5] = idVec6( m2[2][0], m2[2][1], m2[2][2], m3[2][0], m3[2][1], m3[2][2] );
//}
//
//ID_INLINE idMat6::idMat6( const idVec6 &v0, const idVec6 &v1, const idVec6 &v2, const idVec6 &v3, const idVec6 &v4, const idVec6 &v5 ) {
//	mat[0] = v0;
//	mat[1] = v1;
//	mat[2] = v2;
//	mat[3] = v3;
//	mat[4] = v4;
//	mat[5] = v5;
//}
//
//ID_INLINE idMat6::idMat6( const float src[ 6 ][ 6 ] ) {
//	memcpy( mat, src, 6 * 6 * sizeof( float ) );
//}
//
//ID_INLINE const idVec6 &idMat6::operator[]( int index ) const {
//	//assert( ( index >= 0 ) && ( index < 6 ) );
//	return mat[ index ];
//}
//
//ID_INLINE idVec6 &idMat6::operator[]( int index ) {
//	//assert( ( index >= 0 ) && ( index < 6 ) );
//	return mat[ index ];
//}
//
//ID_INLINE idMat6 idMat6::operator*( const idMat6 &a ) const {
//	var /*int */i:number, j:number;
//	const float *m1Ptr, *m2Ptr;
//	float *dstPtr;
//	idMat6 dst;
//
//	m1Ptr = reinterpret_cast<const float *>(this);
//	m2Ptr = reinterpret_cast<const float *>(&a);
//	dstPtr = reinterpret_cast<float *>(&dst);
//
//	for ( i = 0; i < 6; i++ ) {
//		for ( j = 0; j < 6; j++ ) {
//			*dstPtr = m1Ptr[0] * m2Ptr[ 0 * 6 + j ]
//					+ m1Ptr[1] * m2Ptr[ 1 * 6 + j ]
//					+ m1Ptr[2] * m2Ptr[ 2 * 6 + j ]
//					+ m1Ptr[3] * m2Ptr[ 3 * 6 + j ]
//					+ m1Ptr[4] * m2Ptr[ 4 * 6 + j ]
//					+ m1Ptr[5] * m2Ptr[ 5 * 6 + j ];
//			dstPtr++;
//		}
//		m1Ptr += 6;
//	}
//	return dst;
//}
//
//ID_INLINE idMat6 idMat6::operator*( const float a ) const {
//	return idMat6(
//		idVec6( mat[0][0] * a, mat[0][1] * a, mat[0][2] * a, mat[0][3] * a, mat[0][4] * a, mat[0][5] * a ),
//		idVec6( mat[1][0] * a, mat[1][1] * a, mat[1][2] * a, mat[1][3] * a, mat[1][4] * a, mat[1][5] * a ),
//		idVec6( mat[2][0] * a, mat[2][1] * a, mat[2][2] * a, mat[2][3] * a, mat[2][4] * a, mat[2][5] * a ),
//		idVec6( mat[3][0] * a, mat[3][1] * a, mat[3][2] * a, mat[3][3] * a, mat[3][4] * a, mat[3][5] * a ),
//		idVec6( mat[4][0] * a, mat[4][1] * a, mat[4][2] * a, mat[4][3] * a, mat[4][4] * a, mat[4][5] * a ),
//		idVec6( mat[5][0] * a, mat[5][1] * a, mat[5][2] * a, mat[5][3] * a, mat[5][4] * a, mat[5][5] * a ) );
//}
//
//ID_INLINE idVec6 idMat6::operator*( const idVec6 &vec ) const {
//	return idVec6(
//		mat[0][0] * vec[0] + mat[0][1] * vec[1] + mat[0][2] * vec[2] + mat[0][3] * vec[3] + mat[0][4] * vec[4] + mat[0][5] * vec[5],
//		mat[1][0] * vec[0] + mat[1][1] * vec[1] + mat[1][2] * vec[2] + mat[1][3] * vec[3] + mat[1][4] * vec[4] + mat[1][5] * vec[5],
//		mat[2][0] * vec[0] + mat[2][1] * vec[1] + mat[2][2] * vec[2] + mat[2][3] * vec[3] + mat[2][4] * vec[4] + mat[2][5] * vec[5],
//		mat[3][0] * vec[0] + mat[3][1] * vec[1] + mat[3][2] * vec[2] + mat[3][3] * vec[3] + mat[3][4] * vec[4] + mat[3][5] * vec[5],
//		mat[4][0] * vec[0] + mat[4][1] * vec[1] + mat[4][2] * vec[2] + mat[4][3] * vec[3] + mat[4][4] * vec[4] + mat[4][5] * vec[5],
//		mat[5][0] * vec[0] + mat[5][1] * vec[1] + mat[5][2] * vec[2] + mat[5][3] * vec[3] + mat[5][4] * vec[4] + mat[5][5] * vec[5] );
//}
//
//ID_INLINE idMat6 idMat6::operator+( const idMat6 &a ) const {
//	return idMat6(
//		idVec6( mat[0][0] + a[0][0], mat[0][1] + a[0][1], mat[0][2] + a[0][2], mat[0][3] + a[0][3], mat[0][4] + a[0][4], mat[0][5] + a[0][5] ),
//		idVec6( mat[1][0] + a[1][0], mat[1][1] + a[1][1], mat[1][2] + a[1][2], mat[1][3] + a[1][3], mat[1][4] + a[1][4], mat[1][5] + a[1][5] ),
//		idVec6( mat[2][0] + a[2][0], mat[2][1] + a[2][1], mat[2][2] + a[2][2], mat[2][3] + a[2][3], mat[2][4] + a[2][4], mat[2][5] + a[2][5] ),
//		idVec6( mat[3][0] + a[3][0], mat[3][1] + a[3][1], mat[3][2] + a[3][2], mat[3][3] + a[3][3], mat[3][4] + a[3][4], mat[3][5] + a[3][5] ),
//		idVec6( mat[4][0] + a[4][0], mat[4][1] + a[4][1], mat[4][2] + a[4][2], mat[4][3] + a[4][3], mat[4][4] + a[4][4], mat[4][5] + a[4][5] ),
//		idVec6( mat[5][0] + a[5][0], mat[5][1] + a[5][1], mat[5][2] + a[5][2], mat[5][3] + a[5][3], mat[5][4] + a[5][4], mat[5][5] + a[5][5] ) );
//}
//
//ID_INLINE idMat6 idMat6::operator-( const idMat6 &a ) const {
//	return idMat6(
//		idVec6( mat[0][0] - a[0][0], mat[0][1] - a[0][1], mat[0][2] - a[0][2], mat[0][3] - a[0][3], mat[0][4] - a[0][4], mat[0][5] - a[0][5] ),
//		idVec6( mat[1][0] - a[1][0], mat[1][1] - a[1][1], mat[1][2] - a[1][2], mat[1][3] - a[1][3], mat[1][4] - a[1][4], mat[1][5] - a[1][5] ),
//		idVec6( mat[2][0] - a[2][0], mat[2][1] - a[2][1], mat[2][2] - a[2][2], mat[2][3] - a[2][3], mat[2][4] - a[2][4], mat[2][5] - a[2][5] ),
//		idVec6( mat[3][0] - a[3][0], mat[3][1] - a[3][1], mat[3][2] - a[3][2], mat[3][3] - a[3][3], mat[3][4] - a[3][4], mat[3][5] - a[3][5] ),
//		idVec6( mat[4][0] - a[4][0], mat[4][1] - a[4][1], mat[4][2] - a[4][2], mat[4][3] - a[4][3], mat[4][4] - a[4][4], mat[4][5] - a[4][5] ),
//		idVec6( mat[5][0] - a[5][0], mat[5][1] - a[5][1], mat[5][2] - a[5][2], mat[5][3] - a[5][3], mat[5][4] - a[5][4], mat[5][5] - a[5][5] ) );
//}
//
//ID_INLINE idMat6 &idMat6::operator*=( const float a ) {
//	mat[0][0] *= a; mat[0][1] *= a; mat[0][2] *= a; mat[0][3] *= a; mat[0][4] *= a; mat[0][5] *= a;
//	mat[1][0] *= a; mat[1][1] *= a; mat[1][2] *= a; mat[1][3] *= a; mat[1][4] *= a; mat[1][5] *= a;
//	mat[2][0] *= a; mat[2][1] *= a; mat[2][2] *= a; mat[2][3] *= a; mat[2][4] *= a; mat[2][5] *= a;
//	mat[3][0] *= a; mat[3][1] *= a; mat[3][2] *= a; mat[3][3] *= a; mat[3][4] *= a; mat[3][5] *= a;
//	mat[4][0] *= a; mat[4][1] *= a; mat[4][2] *= a; mat[4][3] *= a; mat[4][4] *= a; mat[4][5] *= a;
//	mat[5][0] *= a; mat[5][1] *= a; mat[5][2] *= a; mat[5][3] *= a; mat[5][4] *= a; mat[5][5] *= a;
//	return *this;
//}
//
//ID_INLINE idMat6 &idMat6::operator*=( const idMat6 &a ) {
//	*this = *this * a;
//	return *this;
//}
//
//ID_INLINE idMat6 &idMat6::operator+=( const idMat6 &a ) {
//	mat[0][0] += a[0][0]; mat[0][1] += a[0][1]; mat[0][2] += a[0][2]; mat[0][3] += a[0][3]; mat[0][4] += a[0][4]; mat[0][5] += a[0][5];
//	mat[1][0] += a[1][0]; mat[1][1] += a[1][1]; mat[1][2] += a[1][2]; mat[1][3] += a[1][3]; mat[1][4] += a[1][4]; mat[1][5] += a[1][5];
//	mat[2][0] += a[2][0]; mat[2][1] += a[2][1]; mat[2][2] += a[2][2]; mat[2][3] += a[2][3]; mat[2][4] += a[2][4]; mat[2][5] += a[2][5];
//	mat[3][0] += a[3][0]; mat[3][1] += a[3][1]; mat[3][2] += a[3][2]; mat[3][3] += a[3][3]; mat[3][4] += a[3][4]; mat[3][5] += a[3][5];
//	mat[4][0] += a[4][0]; mat[4][1] += a[4][1]; mat[4][2] += a[4][2]; mat[4][3] += a[4][3]; mat[4][4] += a[4][4]; mat[4][5] += a[4][5];
//	mat[5][0] += a[5][0]; mat[5][1] += a[5][1]; mat[5][2] += a[5][2]; mat[5][3] += a[5][3]; mat[5][4] += a[5][4]; mat[5][5] += a[5][5];
//	return *this;
//}
//
//ID_INLINE idMat6 &idMat6::operator-=( const idMat6 &a ) {
//	mat[0][0] -= a[0][0]; mat[0][1] -= a[0][1]; mat[0][2] -= a[0][2]; mat[0][3] -= a[0][3]; mat[0][4] -= a[0][4]; mat[0][5] -= a[0][5];
//	mat[1][0] -= a[1][0]; mat[1][1] -= a[1][1]; mat[1][2] -= a[1][2]; mat[1][3] -= a[1][3]; mat[1][4] -= a[1][4]; mat[1][5] -= a[1][5];
//	mat[2][0] -= a[2][0]; mat[2][1] -= a[2][1]; mat[2][2] -= a[2][2]; mat[2][3] -= a[2][3]; mat[2][4] -= a[2][4]; mat[2][5] -= a[2][5];
//	mat[3][0] -= a[3][0]; mat[3][1] -= a[3][1]; mat[3][2] -= a[3][2]; mat[3][3] -= a[3][3]; mat[3][4] -= a[3][4]; mat[3][5] -= a[3][5];
//	mat[4][0] -= a[4][0]; mat[4][1] -= a[4][1]; mat[4][2] -= a[4][2]; mat[4][3] -= a[4][3]; mat[4][4] -= a[4][4]; mat[4][5] -= a[4][5];
//	mat[5][0] -= a[5][0]; mat[5][1] -= a[5][1]; mat[5][2] -= a[5][2]; mat[5][3] -= a[5][3]; mat[5][4] -= a[5][4]; mat[5][5] -= a[5][5];
//	return *this;
//}
//
//ID_INLINE idVec6 operator*( const idVec6 &vec, const idMat6 &mat ) {
//	return mat * vec;
//}
//
//ID_INLINE idMat6 operator*( const float a, idMat6 const &mat ) {
//	return mat * a;
//}
//
//ID_INLINE idVec6 &operator*=( idVec6 &vec, const idMat6 &mat ) {
//	vec = mat * vec;
//	return vec;
//}
//
//ID_INLINE bool idMat6::Compare( const idMat6 &a ) const {
//	dword i;
//	const float *ptr1, *ptr2;
//
//	ptr1 = reinterpret_cast<const float *>(mat);
//	ptr2 = reinterpret_cast<const float *>(a.mat);
//	for ( i = 0; i < 6*6; i++ ) {
//		if ( ptr1[i] != ptr2[i] ) {
//			return false;
//		}
//	}
//	return true;
//}
//
//ID_INLINE bool idMat6::Compare( const idMat6 &a, const float epsilon ) const {
//	dword i;
//	const float *ptr1, *ptr2;
//
//	ptr1 = reinterpret_cast<const float *>(mat);
//	ptr2 = reinterpret_cast<const float *>(a.mat);
//	for ( i = 0; i < 6*6; i++ ) {
//		if ( idMath.Fabs( ptr1[i] - ptr2[i] ) > epsilon ) {
//			return false;
//		}
//	}
//	return true;
//}
//
//ID_INLINE bool idMat6::operator==( const idMat6 &a ) const {
//	return this.Compare( a );
//}
//
//ID_INLINE bool idMat6::operator!=( const idMat6 &a ) const {
//	return !this.Compare( a );
//}
//
//ID_INLINE void idMat6::Zero( ) {
//	memset( mat, 0, sizeof( idMat6 ) );
//}
//
//ID_INLINE void idMat6::Identity( ) {
//	*this = mat6_identity;
//}
//
//ID_INLINE bool idMat6::IsIdentity( const float epsilon ) const {
//	return this.Compare( mat6_identity, epsilon );
//}
//
//ID_INLINE bool idMat6::IsSymmetric( const float epsilon ) const {
//	for ( int i = 1; i < 6; i++ ) {
//		for ( int j = 0; j < i; j++ ) {
//			if ( idMath.Fabs( mat[i][j] - mat[j][i] ) > epsilon ) {
//				return false;
//			}
//		}
//	}
//	return true;
//}
//
//ID_INLINE bool idMat6::IsDiagonal( const float epsilon ) const {
//	for ( int i = 0; i < 6; i++ ) {
//		for ( int j = 0; j < 6; j++ ) {
//			if ( i != j && idMath.Fabs( mat[i][j] ) > epsilon ) {
//				return false;
//			}
//		}
//	}
//	return true;
//}
//
//ID_INLINE idMat3 idMat6::SubMat3( int n ) const {
//	assert( n >= 0 && n < 4 );
//	int b0 = ((n & 2) >> 1) * 3;
//	int b1 = (n & 1) * 3;
//	return idMat3(
//		mat[b0 + 0][b1 + 0], mat[b0 + 0][b1 + 1], mat[b0 + 0][b1 + 2],
//		mat[b0 + 1][b1 + 0], mat[b0 + 1][b1 + 1], mat[b0 + 1][b1 + 2],
//		mat[b0 + 2][b1 + 0], mat[b0 + 2][b1 + 1], mat[b0 + 2][b1 + 2] );
//}
//
//ID_INLINE float idMat6::Trace( ) const {
//	return ( mat[0][0] + mat[1][1] + mat[2][2] + mat[3][3] + mat[4][4] + mat[5][5] );
//}
//
//ID_INLINE idMat6 idMat6::Inverse( ) const {
//	idMat6 invMat;
//
//	invMat = *this;
//#if !defined(NDEBUG)
//	int r = 
//#endif
//		invMat.InverseSelf();
//	assert( r );
//	return invMat;
//}
//
//ID_INLINE idMat6 idMat6::InverseFast( ) const {
//	idMat6 invMat;
//
//	invMat = *this;
//#if !defined(NDEBUG)
//	int r = 
//#endif
//		invMat.InverseFastSelf();
//	assert( r );
//	return invMat;
//}
//
//ID_INLINE int idMat6::GetDimension( ) const {
//	return 36;
//}
//
//ID_INLINE const float *idMat6::ToFloatPtr( ) const {
//	return mat[0].ToFloatPtr();
//}
//
//ID_INLINE float *idMat6::ToFloatPtr( ) {
//	return mat[0].ToFloatPtr();
//}


//===============================================================
//
//	idMatX - arbitrary sized dense real matrix
//
//  The matrix lives on 16 byte aligned and 16 byte padded memory.
//
//	NOTE: due to the temporary memory pool idMatX cannot be used by multiple threads.
//
//===============================================================

var MATX_MAX_TEMP	=	1024
//#define MATX_QUAD( x )		( ( ( ( x ) + 3 ) & ~3 ) * sizeof( float ) )
function MATX_CLEAREND(_this: idMatX): void { var s = _this.numRows * _this.numColumns; while (s < ((s + 3) & ~3)) { _this. mat[s++] = 0.0; }}
//#define MATX_ALLOCA( n )	( (float *) _alloca16( MATX_QUAD( n ) ) )
//#define MATX_SIMD
//
class idMatX {
//public:
//					idMatX( );
//					explicit idMatX( int rows, int columns );
//					explicit idMatX( int rows, int columns, float *src );
//					~idMatX( );
//
//	void			Set( int rows, int columns, const float *src );
//	void			Set( const idMat3 &m1, const idMat3 &m2 );
//	void			Set( const idMat3 &m1, const idMat3 &m2, const idMat3 &m3, const idMat3 &m4 );
//
//	const float *	operator[]( int index ) const;
//	float *			operator[]( int index );
//	idMatX &		operator=( const idMatX &a );
//	idMatX			operator*( const float a ) const;
//	idVecX			operator*( const idVecX &vec ) const;
//	idMatX			operator*( const idMatX &a ) const;
//	idMatX			operator+( const idMatX &a ) const;
//	idMatX			operator-( const idMatX &a ) const;
//	idMatX &		operator*=( const float a );
//	idMatX &		operator*=( const idMatX &a );
//	idMatX &		operator+=( const idMatX &a );
//	idMatX &		operator-=( const idMatX &a );
//
//	friend idMatX	operator*( const float a, const idMatX &m );
//	friend idVecX	operator*( const idVecX &vec, const idMatX &m );
//	friend idVecX &	operator*=( idVecX &vec, const idMatX &m );
//
//	bool			Compare( const idMatX &a ) const;								// exact compare, no epsilon
//	bool			Compare( const idMatX &a, const float epsilon ) const;			// compare with epsilon
//	bool			operator==( const idMatX &a ) const;							// exact compare, no epsilon
//	bool			operator!=( const idMatX &a ) const;							// exact compare, no epsilon
//
//	void			SetSize( int rows, int columns );								// set the number of rows/columns
//	void			ChangeSize( int rows, int columns, bool makeZero = false );		// change the size keeping data intact where possible
//	int				GetNumRows( ) const { return this.numRows; }					// get the number of rows
//	int				GetNumColumns( ) const { return this.numColumns; }				// get the number of columns
//	void			SetData( int rows, int columns, float *data );					// set float array pointer
//	void			Zero( );													// clear matrix
//	void			Zero( int rows, int columns );									// set size and clear matrix
//	void			Identity( );												// clear to identity matrix
//	void			Identity( int rows, int columns );								// set size and clear to identity matrix
//	void			Diag( const idVecX &v );										// create diagonal matrix from vector
//	void			Random( int seed, float l = 0.0, float u = 1.0 );				// fill matrix with random values
//	void			Random( int rows, int columns, int seed, float l = 0.0, float u = 1.0 );
//	void			Negate( );													// (*this) = - (*this)
//	void			Clamp( float min, float max );									// clamp all values
//	idMatX &		SwapRows( int r1, int r2 );										// swap rows
//	idMatX &		SwapColumns( int r1, int r2 );									// swap columns
//	idMatX &		SwapRowsColumns( int r1, int r2 );								// swap rows and columns
//	idMatX &		RemoveRow( int r );												// remove a row
//	idMatX &		RemoveColumn( int r );											// remove a column
//	idMatX &		RemoveRowColumn( int r );										// remove a row and column
//	void			ClearUpperTriangle( );										// clear the upper triangle
//	void			ClearLowerTriangle( );										// clear the lower triangle
//	void			SquareSubMatrix( const idMatX &m, int size );					// get square sub-matrix from 0,0 to size,size
//	float			MaxDifference( const idMatX &m ) const;							// return maximum element difference between this and m
//
//	bool			IsSquare( ) const { return ( this.numRows == this.numColumns ); }
//	bool			IsZero( const float epsilon = MATRIX_EPSILON ) const;
//	bool			IsIdentity( const float epsilon = MATRIX_EPSILON ) const;
//	bool			IsDiagonal( const float epsilon = MATRIX_EPSILON ) const;
//	bool			IsTriDiagonal( const float epsilon = MATRIX_EPSILON ) const;
//	bool			IsSymmetric( const float epsilon = MATRIX_EPSILON ) const;
//	bool			IsOrthogonal( const float epsilon = MATRIX_EPSILON ) const;
//	bool			IsOrthonormal( const float epsilon = MATRIX_EPSILON ) const;
//	bool			IsPMatrix( const float epsilon = MATRIX_EPSILON ) const;
//	bool			IsZMatrix( const float epsilon = MATRIX_EPSILON ) const;
//	bool			IsPositiveDefinite( const float epsilon = MATRIX_EPSILON ) const;
//	bool			IsSymmetricPositiveDefinite( const float epsilon = MATRIX_EPSILON ) const;
//	bool			IsPositiveSemiDefinite( const float epsilon = MATRIX_EPSILON ) const;
//	bool			IsSymmetricPositiveSemiDefinite( const float epsilon = MATRIX_EPSILON ) const;
//
//	float			Trace( ) const;											// returns product of diagonal elements
//	float			Determinant( ) const;										// returns determinant of matrix
//	idMatX			Transpose( ) const;										// returns transpose
//	idMatX &		TransposeSelf( );											// transposes the matrix itself
//	idMatX			Inverse( ) const;											// returns the inverse ( m * m.Inverse() = identity )
//	bool			InverseSelf( );											// returns false if determinant is zero
//	idMatX			InverseFast( ) const;										// returns the inverse ( m * m.Inverse() = identity )
//	bool			InverseFastSelf( );										// returns false if determinant is zero
//
//	bool			LowerTriangularInverse( );									// in-place inversion, returns false if determinant is zero
//	bool			UpperTriangularInverse( );									// in-place inversion, returns false if determinant is zero
//
//	idVecX			Multiply( const idVecX &vec ) const;							// (*this) * vec
//	idVecX			TransposeMultiply( const idVecX &vec ) const;					// this.Transpose() * vec
//
//	idMatX			Multiply( const idMatX &a ) const;								// (*this) * a
//	idMatX			TransposeMultiply( const idMatX &a ) const;						// this.Transpose() * a
//
//	void			Multiply( idVecX &dst, const idVecX &vec ) const;				// dst = (*this) * vec
//	void			MultiplyAdd( idVecX &dst, const idVecX &vec ) const;			// dst += (*this) * vec
//	void			MultiplySub( idVecX &dst, const idVecX &vec ) const;			// dst -= (*this) * vec
//	void			TransposeMultiply( idVecX &dst, const idVecX &vec ) const;		// dst = this.Transpose() * vec
//	void			TransposeMultiplyAdd( idVecX &dst, const idVecX &vec ) const;	// dst += this.Transpose() * vec
//	void			TransposeMultiplySub( idVecX &dst, const idVecX &vec ) const;	// dst -= this.Transpose() * vec
//
//	void			Multiply( idMatX &dst, const idMatX &a ) const;					// dst = (*this) * a
//	void			TransposeMultiply( idMatX &dst, const idMatX &a ) const;		// dst = this.Transpose() * a
//
//	int				GetDimension( ) const;										// returns total number of values in matrix
//
//	const idVec6 &	SubVec6( int row ) const;										// interpret beginning of row as a const idVec6
//	idVec6 &		SubVec6( int row );												// interpret beginning of row as an idVec6
//	const idVecX	SubVecX( int row ) const;										// interpret complete row as a const idVecX
//	idVecX			SubVecX( int row );												// interpret complete row as an idVecX
//	const float *	ToFloatPtr( ) const;										// pointer to const matrix float array
//	float *			ToFloatPtr( );												// pointer to matrix float array
//	const char *	ToString( int precision = 2 ) const;
//
//	void			Update_RankOne( const idVecX &v, const idVecX &w, float alpha );
//	void			Update_RankOneSymmetric( const idVecX &v, float alpha );
//	void			Update_RowColumn( const idVecX &v, const idVecX &w, int r );
//	void			Update_RowColumnSymmetric( const idVecX &v, int r );
//	void			Update_Increment( const idVecX &v, const idVecX &w );
//	void			Update_IncrementSymmetric( const idVecX &v );
//	void			Update_Decrement( int r );
//
//	bool			Inverse_GaussJordan( );					// invert in-place with Gauss-Jordan elimination
//	bool			Inverse_UpdateRankOne( const idVecX &v, const idVecX &w, float alpha );
//	bool			Inverse_UpdateRowColumn( const idVecX &v, const idVecX &w, int r );
//	bool			Inverse_UpdateIncrement( const idVecX &v, const idVecX &w );
//	bool			Inverse_UpdateDecrement( const idVecX &v, const idVecX &w, int r );
//	void			Inverse_Solve( idVecX &x, const idVecX &b ) const;
//
//	bool			LU_Factor( int *index, float *det = NULL );		// factor in-place: L * U
//	bool			LU_UpdateRankOne( const idVecX &v, const idVecX &w, float alpha, int *index );
//	bool			LU_UpdateRowColumn( const idVecX &v, const idVecX &w, int r, int *index );
//	bool			LU_UpdateIncrement( const idVecX &v, const idVecX &w, int *index );
//	bool			LU_UpdateDecrement( const idVecX &v, const idVecX &w, const idVecX &u, int r, int *index );
//	void			LU_Solve( idVecX &x, const idVecX &b, const int *index ) const;
//	void			LU_Inverse( idMatX &inv, const int *index ) const;
//	void			LU_UnpackFactors( idMatX &L, idMatX &U ) const;
//	void			LU_MultiplyFactors( idMatX &m, const int *index ) const;
//
//	bool			QR_Factor( idVecX &c, idVecX &d );				// factor in-place: Q * R
//	bool			QR_UpdateRankOne( idMatX &R, const idVecX &v, const idVecX &w, float alpha );
//	bool			QR_UpdateRowColumn( idMatX &R, const idVecX &v, const idVecX &w, int r );
//	bool			QR_UpdateIncrement( idMatX &R, const idVecX &v, const idVecX &w );
//	bool			QR_UpdateDecrement( idMatX &R, const idVecX &v, const idVecX &w, int r );
//	void			QR_Solve( idVecX &x, const idVecX &b, const idVecX &c, const idVecX &d ) const;
//	void			QR_Solve( idVecX &x, const idVecX &b, const idMatX &R ) const;
//	void			QR_Inverse( idMatX &inv, const idVecX &c, const idVecX &d ) const;
//	void			QR_UnpackFactors( idMatX &Q, idMatX &R, const idVecX &c, const idVecX &d ) const;
//	void			QR_MultiplyFactors( idMatX &m, const idVecX &c, const idVecX &d ) const;
//
//	bool			SVD_Factor( idVecX &w, idMatX &V );				// factor in-place: U * Diag(w) * V.Transpose()
//	void			SVD_Solve( idVecX &x, const idVecX &b, const idVecX &w, const idMatX &V ) const;
//	void			SVD_Inverse( idMatX &inv, const idVecX &w, const idMatX &V ) const;
//	void			SVD_MultiplyFactors( idMatX &m, const idVecX &w, const idMatX &V ) const;
//
//	bool			Cholesky_Factor( );						// factor in-place: L * L.Transpose()
//	bool			Cholesky_UpdateRankOne( const idVecX &v, float alpha, int offset = 0 );
//	bool			Cholesky_UpdateRowColumn( const idVecX &v, int r );
//	bool			Cholesky_UpdateIncrement( const idVecX &v );
//	bool			Cholesky_UpdateDecrement( const idVecX &v, int r );
//	void			Cholesky_Solve( idVecX &x, const idVecX &b ) const;
//	void			Cholesky_Inverse( idMatX &inv ) const;
//	void			Cholesky_MultiplyFactors( idMatX &m ) const;
//
//	bool			LDLT_Factor( );							// factor in-place: L * D * L.Transpose()
//	bool			LDLT_UpdateRankOne( const idVecX &v, float alpha, int offset = 0 );
//	bool			LDLT_UpdateRowColumn( const idVecX &v, int r );
//	bool			LDLT_UpdateIncrement( const idVecX &v );
//	bool			LDLT_UpdateDecrement( const idVecX &v, int r );
//	void			LDLT_Solve( idVecX &x, const idVecX &b ) const;
//	void			LDLT_Inverse( idMatX &inv ) const;
//	void			LDLT_UnpackFactors( idMatX &L, idMatX &D ) const;
//	void			LDLT_MultiplyFactors( idMatX &m ) const;
//
//	void			TriDiagonal_ClearTriangles( );
//	bool			TriDiagonal_Solve( idVecX &x, const idVecX &b ) const;
//	void			TriDiagonal_Inverse( idMatX &inv ) const;
//
//	bool			Eigen_SolveSymmetricTriDiagonal( idVecX &eigenValues );
//	bool			Eigen_SolveSymmetric( idVecX &eigenValues );
//	bool			Eigen_Solve( idVecX &realEigenValues, idVecX &imaginaryEigenValues );
//	void			Eigen_SortIncreasing( idVecX &eigenValues );
//	void			Eigen_SortDecreasing( idVecX &eigenValues );
//
//	static void		Test( );
//
//private:
	numRows :number/*int*/;				// number of rows
	numColumns :number/*int*/;				// number of columns
	alloced :number/*int*/;				// floats allocated, if -1 then mat points to data set with SetData
	mat:Float32Array;					// memory the matrix is stored
//
	static temp = new Float32Array(MATX_MAX_TEMP+4);	// used to store intermediate results
	static tempPtr:number;				// pointer to 16 byte aligned temporary memory
	static tempIndex: number /*int*/;				// index into memory pool, wraps around
//
//private:
//	void			SetTempSize( int rows, int columns );
//	float			DeterminantGeneric( ) const;
//	bool			InverseSelfGeneric( );
//	void			QR_Rotate( idMatX &R, int i, float a, float b );
//	float			Pythag( float a, float b ) const;
//	void			SVD_BiDiag( idVecX &w, idVecX &rv1, float &anorm );
//	void			SVD_InitialWV( idVecX &w, idMatX &V, idVecX &rv1 );
//	void			HouseholderReduction( idVecX &diag, idVecX &subd );
//	bool			QL( idVecX &diag, idVecX &subd );
//	void			HessenbergReduction( idMatX &H );
//	void			ComplexDivision( float xr, float xi, float yr, float yi, float &cdivr, float &cdivi );
//	bool			HessenbergToRealSchur( idMatX &H, idVecX &realEigenValues, idVecX &imaginaryEigenValues );
//};
//
constructor( ) {
	this.numRows = this.numColumns = this.alloced = 0;
	this.mat = null;
}
//
//ID_INLINE idMatX::~idMatX( ) {
//	// if not temp memory
//	if ( this.mat != NULL && ( this.mat < idMatX::tempPtr || this.mat > idMatX::tempPtr + MATX_MAX_TEMP ) && alloced != -1 ) {
//		Mem_Free16( this.mat );
//	}
//}
//
//ID_INLINE idMatX::idMatX( int rows, int columns ) {
//	this.numRows = this.numColumns = alloced = 0;
//	this.mat = NULL;
//	this.SetSize( rows, columns );
//}
//
//ID_INLINE idMatX::idMatX( int rows, int columns, float *src ) {
//	this.numRows = this.numColumns = alloced = 0;
//	this.mat = NULL;
//	SetData( rows, columns, src );
//}
//
//ID_INLINE void idMatX::Set( int rows, int columns, const float *src ) {
//	this.SetSize( rows, columns );
//	memcpy( this.mat, src, rows * columns * sizeof( float ) );
//}
//
//ID_INLINE void idMatX::Set( const idMat3 &m1, const idMat3 &m2 ) {
//	var /*int */i:number, j:number;
//
//	this.SetSize( 3, 6 );
//	for ( i = 0; i < 3; i++ ) {
//		for ( j = 0; j < 3; j++ ) {
//			this.mat[(i+0) * this.numColumns + (j+0)] = m1[i][j];
//			this.mat[(i+0) * this.numColumns + (j+3)] = m2[i][j];
//		}
//	}
//}
//
//ID_INLINE void idMatX::Set( const idMat3 &m1, const idMat3 &m2, const idMat3 &m3, const idMat3 &m4 ) {
//	var /*int */i:number, j:number;
//
//	this.SetSize( 6, 6 );
//	for ( i = 0; i < 3; i++ ) {
//		for ( j = 0; j < 3; j++ ) {
//			this.mat[(i+0) * this.numColumns + (j+0)] = m1[i][j];
//			this.mat[(i+0) * this.numColumns + (j+3)] = m2[i][j];
//			this.mat[(i+3) * this.numColumns + (j+0)] = m3[i][j];
//			this.mat[(i+3) * this.numColumns + (j+3)] = m4[i][j];
//		}
//	}
//}
//
//ID_INLINE const float *idMatX::operator[]( int index ) const {
//	assert( ( index >= 0 ) && ( index < this.numRows ) );
//	return this.mat + index * this.numColumns;
//}
//
//ID_INLINE float *idMatX::operator[]( int index ) {
//	assert( ( index >= 0 ) && ( index < this.numRows ) );
//	return this.mat + index * this.numColumns;
//}
//
//ID_INLINE idMatX &idMatX::operator=( const idMatX &a ) {
//	this.SetSize( a.numRows, a.numColumns );
//#ifdef MATX_SIMD
//	SIMDProcessor.Copy16( this.mat, a.mat, a.numRows * a.numColumns );
//#else
//	memcpy( this.mat, a.mat, a.numRows * a.numColumns * sizeof( float ) );
//#endif
//	idMatX::tempIndex = 0;
//	return *this;
//}
//
//ID_INLINE idMatX idMatX::operator*( const float a ) const {
//	idMatX m;
//
//	m.SetTempSize( this.numRows, this.numColumns );
//#ifdef MATX_SIMD
//	SIMDProcessor.Mul16( m.mat, this.mat, a, this.numRows * this.numColumns );
//#else
//	int i, s;
//	s = this.numRows * this.numColumns;
//	for ( i = 0; i < s; i++ ) {
//		m.mat[i] = this.mat[i] * a;
//	}
//#endif
//	return m;
//}
//
//ID_INLINE idVecX idMatX::operator*( const idVecX &vec ) const {
//	idVecX dst;
//
//	assert( this.numColumns == vec.GetSize() );
//
//	dst.SetTempSize( this.numRows );
//#ifdef MATX_SIMD
//	SIMDProcessor.MatX_MultiplyVecX( dst, *this, vec );
//#else
//	Multiply( dst, vec );
//#endif
//	return dst;
//}
//
//ID_INLINE idMatX idMatX::operator*( const idMatX &a ) const {
//	idMatX dst;
//
//	assert( this.numColumns == a.numRows );
//
//	dst.SetTempSize( this.numRows, a.numColumns );
//#ifdef MATX_SIMD
//	SIMDProcessor.MatX_MultiplyMatX( dst, *this, a );
//#else
//	Multiply( dst, a );
//#endif
//	return dst;
//}
//
//ID_INLINE idMatX idMatX::operator+( const idMatX &a ) const {
//	idMatX m;
//
//	assert(this. numRows == a.numRows && this.numColumns == a.numColumns );
//	m.SetTempSize( this.numRows, this.numColumns );
//#ifdef MATX_SIMD
//	SIMDProcessor.Add16( m.mat, this.mat, a.mat, this.numRows * this.numColumns );
//#else
//	int i, s;
//	s =this. numRows * this.numColumns;
//	for ( i = 0; i < s; i++ ) {
//		m.mat[i] = this.mat[i] + a.mat[i];
//	}
//#endif
//	return m;
//}
//
//ID_INLINE idMatX idMatX::operator-( const idMatX &a ) const {
//	idMatX m;
//
//	assert( this.numRows == a.numRows && this.numColumns == a.numColumns );
//	m.SetTempSize( this.numRows, this.numColumns );
//#ifdef MATX_SIMD
//	SIMDProcessor.Sub16( m.mat, this.mat, a.mat, this.numRows * this.numColumns );
//#else
//	int i, s;
//	s = this.numRows * this.numColumns;
//	for ( i = 0; i < s; i++ ) {
//		m.mat[i] = this.mat[i] - a.mat[i];
//	}
//#endif
//	return m;
//}
//
//ID_INLINE idMatX &idMatX::operator*=( const float a ) {
//#ifdef MATX_SIMD
//	SIMDProcessor.MulAssign16( mat, a, this.numRows * this.numColumns );
//#else
//	int i, s;
//	s = this.numRows * this.numColumns;
//	for ( i = 0; i < s; i++ ) {
//		this.mat[i] *= a;
//	}
//#endif
//	idMatX::tempIndex = 0;
//	return *this;
//}
//
//ID_INLINE idMatX &idMatX::operator*=( const idMatX &a ) {
//	*this = *this * a;
//	idMatX::tempIndex = 0;
//	return *this;
//}
//
//ID_INLINE idMatX &idMatX::operator+=( const idMatX &a ) {
//	assert( this.numRows == a.this.numRows && this.numColumns == a.numColumns );
//#ifdef MATX_SIMD
//	SIMDProcessor.AddAssign16( this.mat, a.mat, this.numRows * this.numColumns );
//#else
//	int i, s;
//	s = this.numRows * this.numColumns;
//	for ( i = 0; i < s; i++ ) {
//		this.mat[i] += a.mat[i];
//	}
//#endif
//	idMatX::tempIndex = 0;
//	return *this;
//}
//
//ID_INLINE idMatX &idMatX::operator-=( const idMatX &a ) {
//	assert( this.numRows == a.numRows && this.numColumns == a.numColumns );
//#ifdef MATX_SIMD
//	SIMDProcessor.SubAssign16( mat, a.mat, this.numRows * this.numColumns );
//#else
//	int i, s;
//	s = this.numRows * this.numColumns;
//	for ( i = 0; i < s; i++ ) {
//		this.mat[i] -= a.mat[i];
//	}
//#endif
//	idMatX::tempIndex = 0;
//	return *this;
//}
//
//ID_INLINE idMatX operator*( const float a, idMatX const &m ) {
//	return m * a;
//}
//
//ID_INLINE idVecX operator*( const idVecX &vec, const idMatX &m ) {
//	return m * vec;
//}
//
//ID_INLINE idVecX &operator*=( idVecX &vec, const idMatX &m ) {
//	vec = m * vec;
//	return vec;
//}
//
//ID_INLINE bool idMatX::Compare( const idMatX &a ) const {
//	int i, s;
//
//	assert( this.numRows == a.numRows && this.numColumns == a.numColumns );
//
//	s = this.numRows * this.numColumns;
//	for ( i = 0; i < s; i++ ) {
//		if ( this.mat[i] != a.mat[i] ) {
//			return false;
//		}
//	}
//	return true;
//}
//
//ID_INLINE bool idMatX::Compare( const idMatX &a, const float epsilon ) const {
//	int i, s;
//
//	assert( this.numRows == a.numRows && this.numColumns == a.numColumns );
//
//	s = this.numRows * this.numColumns;
//	for ( i = 0; i < s; i++ ) {
//		if ( idMath.Fabs( this.mat[i] - a.mat[i] ) > epsilon ) {
//			return false;
//		}
//	}
//	return true;
//}
//
//ID_INLINE bool idMatX::operator==( const idMatX &a ) const {
//	return this.Compare( a );
//}
//
//ID_INLINE bool idMatX::operator!=( const idMatX &a ) const {
//	return !this.Compare( a );
//}

	SetSize ( /*int*/ rows: number, /*int */columns: number ) {
		assert( /*this.mat*/0 < idMatX.tempPtr || /*this.mat*/0 > idMatX.tempPtr + MATX_MAX_TEMP );
		var alloc = ( rows * columns + 3 ) & ~3;
		if ( alloc > this.alloced && this.alloced != -1 ) {
			if ( this.mat != null ) {
				Mem_Free16( this.mat );
			}
			this.mat = new Float32Array( alloc ); // (float *) Mem_Alloc16( alloc * sizeof( float ) );
			this.alloced = alloc;
		}
		this.numRows = rows;
		this.numColumns = columns;
		MATX_CLEAREND( this );
	}

//ID_INLINE void idMatX::SetTempSize( int rows, int columns ) {
//	int newSize;
//
//	newSize = ( rows * columns + 3 ) & ~3;
//	assert( newSize < MATX_MAX_TEMP );
//	if ( idMatX::tempIndex + newSize > MATX_MAX_TEMP ) {
//		idMatX::tempIndex = 0;
//	}
//	this.mat = idMatX::tempPtr + idMatX::tempIndex;
//	idMatX::tempIndex += newSize;
//	this.alloced = newSize;
//	this.numRows = rows;
//	this.numColumns = columns;
//	MATX_CLEAREND(this);
//}
//
//ID_INLINE void idMatX::SetData( int rows, int columns, float *data ) {
//	assert( this.mat < idMatX::tempPtr || this.mat > idMatX::tempPtr + MATX_MAX_TEMP );
//	if ( this.mat != NULL && this.alloced != -1 ) {
//		Mem_Free16( this.mat );
//	}
//	assert( ( ( (int) data ) & 15 ) == 0 ); // data must be 16 byte aligned
//	this.mat = data;
//	this.alloced = -1;
//	this.numRows = rows;
//	this.numColumns = columns;
//	MATX_CLEAREND(this);
//}

//ID_INLINE void idMatX::Zero( ) {
//#ifdef MATX_SIMD
	//SIMDProcessor.Zero16( this.mat, numRows * this.numColumns );
//#else
//	memset( this.mat, 0, this.numRows * this.numColumns * sizeof( float ) );
//#endif
//}

	Zero ( ): void
	Zero ( /*int */rows: number, /*int */columns: number ): void
	Zero ( /*int */rows?: number, /*int */columns?: number ): void {
		this.SetSize( rows, columns );
//#ifdef MATX_SIMD
		if ( arguments.length === 2 ) {
			SIMDProcessor.Zero16( this.mat, this.numRows * this.numColumns );
		}
//#else
//	memset( mat, 0, rows * columns * sizeof( float ) );
//#endif
	}
//
//ID_INLINE void idMatX::Identity( ) {
//	assert( this.numRows == this.numColumns );
//#ifdef MATX_SIMD
//	SIMDProcessor.Zero16( this.mat, this.numRows * this.numColumns );
//#else
//	memset( this.mat, 0, this.numRows * this.numColumns * sizeof( float ) );
//#endif
//	for ( int i = 0; i < this.numRows; i++ ) {
//		this.mat[i * this.numColumns + i] = 1.0;
//	}
//}
//
//ID_INLINE void idMatX::Identity( int rows, int columns ) {
//	assert( rows == columns );
//	this.SetSize( rows, columns );
//	idMatX::Identity();
//}
//
//ID_INLINE void idMatX::Diag( const idVecX &v ) {
//	Zero( v.GetSize(), v.GetSize() );
//	for ( int i = 0; i < v.GetSize(); i++ ) {
//		this.mat[i * this.numColumns + i] = v[i];
//	}
//}
//
//ID_INLINE void idMatX::Random( int seed, float l, float u ) {
//	int i, s;
//	float c;
//	idRandom rnd(seed);
//
//	c = u - l;
//	s = this.numRows * this.numColumns;
//	for ( i = 0; i < s; i++ ) {
//		this.mat[i] = l + rnd.RandomFloat() * c;
//	}
//}
//
//ID_INLINE void idMatX::Random( int rows, int columns, int seed, float l, float u ) {
//	int i, s;
//	float c;
//	idRandom rnd(seed);
//
//	this.SetSize( rows, columns );
//	c = u - l;
//	s = this.numRows * this.numColumns;
//	for ( i = 0; i < s; i++ ) {
//		this.mat[i] = l + rnd.RandomFloat() * c;
//	}
//}
//
//ID_INLINE void idMatX::Negate( ) {
//#ifdef MATX_SIMD
//	SIMDProcessor.Negate16( this.mat, this.numRows * this.numColumns );
//#else
//	int i, s;
//	s = this.numRows * this.numColumns;
//	for ( i = 0; i < s; i++ ) {
//		this.mat[i] = -this.mat[i];
//	}
//#endif
//}
//
//ID_INLINE void idMatX::Clamp( float min, float max ) {
//	int i, s;
//	s = this.numRows * this.numColumns;
//	for ( i = 0; i < s; i++ ) {
//		if ( this.mat[i] < min ) {
//			this.mat[i] = min;
//		} else if ( this.mat[i] > max ) {
//			this.mat[i] = max;
//		}
//	}
//}
//
//ID_INLINE idMatX &idMatX::SwapRows( int r1, int r2 ) {
//	float *ptr;
//
//	ptr = (float *) _alloca16( this.numColumns * sizeof( float ) );
//	memcpy( ptr, this.mat + r1 * this.numColumns, this.numColumns * sizeof( float ) );
//	memcpy( this.mat + r1 * this.numColumns, this.mat + r2 * this.numColumns, this.numColumns * sizeof( float ) );
//	memcpy( this.mat + r2 * this.numColumns, ptr, this.numColumns * sizeof( float ) );
//
//	return *this;
//}
//
//ID_INLINE idMatX &idMatX::SwapColumns( int r1, int r2 ) {
//	var/*int*/i:number;
//	float tmp, *ptr;
//
//	for ( i = 0; i < this.numRows; i++ ) {
//		ptr = this.mat + i * this.numColumns;
//		tmp = ptr[r1];
//		ptr[r1] = ptr[r2];
//		ptr[r2] = tmp;
//	}
//
//	return *this;
//}
//
//ID_INLINE idMatX &idMatX::SwapRowsColumns( int r1, int r2 ) {
//
//	SwapRows( r1, r2 );
//	SwapColumns( r1, r2 );
//	return *this;
//}
//
//ID_INLINE void idMatX::ClearUpperTriangle( ) {
//	assert( this.numRows == this.numColumns );
//	for ( int i = this.numRows-2; i >= 0; i-- ) {
//		memset( this.mat + i * this.numColumns + i + 1, 0, (this.numColumns - 1 - i) * sizeof(float) );
//	}
//}
//
//ID_INLINE void idMatX::ClearLowerTriangle( ) {
//	assert( this.numRows == this.numColumns );
//	for ( int i = 1; i < this.numRows; i++ ) {
//		memset( this.mat + i * this.numColumns, 0, i * sizeof(float) );
//	}
//}
//
//ID_INLINE void idMatX::SquareSubMatrix( const idMatX &m, int size ) {
//	var/*int*/i:number;
//	assert( size <= m.this.numRows && size <= m.numColumns );
//	this.SetSize( size, size );
//	for ( i = 0; i < size; i++ ) {
//		memcpy( this.mat + i * this.numColumns, m.this.mat + i * m.numColumns, size * sizeof( float ) );
//	}
//}
//
//ID_INLINE float idMatX::MaxDifference( const idMatX &m ) const {
//	var /*int */i:number, j:number;
//	float diff, maxDiff;
//
//	assert( this.numRows == m.this.numRows && this.numColumns == m.numColumns );
//
//	maxDiff = -1.0;
//	for ( i = 0; i < this.numRows; i++ ) {
//		for ( j = 0; j < this.numColumns; j++ ) {
//			diff = idMath.Fabs( this.mat[ i * this.numColumns + j ] - m[i][j] );
//			if ( maxDiff < 0.0 || diff > maxDiff ) {
//				maxDiff = diff;
//			}
//		}
//	}
//	return maxDiff;
//}
//
//ID_INLINE bool idMatX::IsZero( const float epsilon ) const {
//	// returns true if (*this) == Zero
//	for ( int i = 0; i < this.numRows; i++ ) {
//		for ( int j = 0; j < this.numColumns; j++ ) {
//			if ( idMath.Fabs( this.mat[i * this.numColumns + j] ) > epsilon ) {
//				return false;
//			}
//		}
//	}
//	return true;
//}
//
//ID_INLINE bool idMatX::IsIdentity( const float epsilon ) const {
//	// returns true if (*this) == Identity
//	assert( this.numRows == this.numColumns );
//	for ( int i = 0; i < this.numRows; i++ ) {
//		for ( int j = 0; j < this.numColumns; j++ ) {
//			if ( idMath.Fabs( this.mat[i * this.numColumns + j] - (float)( i == j ) ) > epsilon ) {
//				return false;
//			}
//		}
//	}
//	return true;
//}
//
//ID_INLINE bool idMatX::IsDiagonal( const float epsilon ) const {
//	// returns true if all elements are zero except for the elements on the diagonal
//	assert( this.numRows == this.numColumns );
//	for ( int i = 0; i < this.numRows; i++ ) {
//		for ( int j = 0; j < this.numColumns; j++ ) {
//			if ( i != j && idMath.Fabs( this.mat[i * this.numColumns + j] ) > epsilon ) {
//				return false;
//			}
//		}
//	}
//	return true;
//}
//
//ID_INLINE bool idMatX::IsTriDiagonal( const float epsilon ) const {
//	// returns true if all elements are zero except for the elements on the diagonal plus or minus one column
//
//	if ( this.numRows != this.numColumns ) {
//		return false;
//	}
//	for ( int i = 0; i < this.numRows-2; i++ ) {
//		for ( int j = i+2; j < this.numColumns; j++ ) {
//			if ( idMath.Fabs( (*this)[i][j] ) > epsilon ) {
//				return false;
//			}
//			if ( idMath.Fabs( (*this)[j][i] ) > epsilon ) {
//				return false;
//			}
//		}
//	}
//	return true;
//}
//
//ID_INLINE bool idMatX::IsSymmetric( const float epsilon ) const {
//	// (*this)[i][j] == (*this)[j][i]
//	if ( this.numRows != this.numColumns ) {
//		return false;
//	}
//	for ( int i = 0; i < this.numRows; i++ ) {
//		for ( int j = 0; j < this.numColumns; j++ ) {
//			if ( idMath.Fabs( this.mat[ i * this.numColumns + j ] - this.mat[ j * this.numColumns + i ] ) > epsilon ) {
//				return false;
//			}
//		}
//	}
//	return true;
//}
//
//ID_INLINE float idMatX::Trace( ) const {
//	float trace = 0.0;
//
//	assert( this.numRows == this.numColumns );
//
//	// sum of elements on the diagonal
//	for ( int i = 0; i < this.numRows; i++ ) {
//		trace += this.mat[i * this.numRows + i];
//	}
//	return trace;
//}
//
//ID_INLINE float idMatX::Determinant( ) const {
//
//	assert( this.numRows == this.numColumns );
//
//	switch( this.numRows ) {
//		case 1:
//			return this.mat[0];
//		case 2:
//			return reinterpret_cast<const idMat2 *>(this.mat).Determinant();
//		case 3:
//			return reinterpret_cast<const idMat3 *>(this.mat).Determinant();
//		case 4:
//			return reinterpret_cast<const idMat4 *>(this.mat).Determinant();
//		case 5:
//			return reinterpret_cast<const idMat5 *>(this.mat).Determinant();
//		case 6:
//			return reinterpret_cast<const idMat6 *>(this.mat).Determinant();
//		default:
//			return DeterminantGeneric();
//	}
//	return 0.0;
//}
//
//ID_INLINE idMatX idMatX::Transpose( ) const {
//	idMatX transpose;
//	var /*int */i:number, j:number;
//
//	transpose.SetTempSize( this.numColumns, this.numRows );
//
//	for ( i = 0; i < this.numRows; i++ ) {
//		for ( j = 0; j < this.numColumns; j++ ) {
//			transpose.this.mat[j * transpose.numColumns + i] = this.mat[i * this.numColumns + j];
//		}
//	}
//
//	return transpose;
//}
//
//ID_INLINE idMatX &idMatX::TransposeSelf( ) {
//	*this = Transpose();
//	return *this;
//}
//
//ID_INLINE idMatX idMatX::Inverse( ) const {
//	idMatX invMat;
//
//	invMat.SetTempSize( this.numRows, this.numColumns );
//	memcpy( invMat.this.mat, this.mat, this.numRows * this.numColumns * sizeof( float ) );
//#if !defined(NDEBUG)
//	int r = 
//#endif
//		invMat.InverseSelf();
//	assert( r );
//	return invMat;
//}
//
//ID_INLINE bool idMatX::InverseSelf( ) {
//
//	assert( this.numRows == this.numColumns );
//
//	switch( this.numRows ) {
//		case 1:
//			if ( idMath.Fabs( this.mat[0] ) < MATRIX_INVERSE_EPSILON ) {
//				return false;
//			}
//			this.mat[0] = 1.0 / this.mat[0];
//			return true;
//		case 2:
//			return reinterpret_cast<idMat2 *>(this.mat).InverseSelf();
//		case 3:
//			return reinterpret_cast<idMat3 *>(this.mat).InverseSelf();
//		case 4:
//			return reinterpret_cast<idMat4 *>(this.mat).InverseSelf();
//		case 5:
//			return reinterpret_cast<idMat5 *>(this.mat).InverseSelf();
//		case 6:
//			return reinterpret_cast<idMat6 *>(this.mat).InverseSelf();
//		default:
//			return InverseSelfGeneric();
//	}
//}
//
//ID_INLINE idMatX idMatX::InverseFast( ) const {
//	idMatX invMat;
//
//	invMat.SetTempSize( this.numRows, this.numColumns );
//	memcpy( invMat.this.mat, this.mat, this.numRows * this.numColumns * sizeof( float ) );
//#if !defined(NDEBUG)
//	int r = 
//#endif
//		invMat.InverseFastSelf();
//	assert( r );
//	return invMat;
//}
//
//ID_INLINE bool idMatX::InverseFastSelf( ) {
//
//	assert( this.numRows == this.numColumns );
//
//	switch( this.numRows ) {
//		case 1:
//			if ( idMath.Fabs( this.mat[0] ) < MATRIX_INVERSE_EPSILON ) {
//				return false;
//			}
//			this.mat[0] = 1.0 / this.mat[0];
//			return true;
//		case 2:
//			return reinterpret_cast<idMat2 *>(this.mat).InverseFastSelf();
//		case 3:
//			return reinterpret_cast<idMat3 *>(this.mat).InverseFastSelf();
//		case 4:
//			return reinterpret_cast<idMat4 *>(this.mat).InverseFastSelf();
//		case 5:
//			return reinterpret_cast<idMat5 *>(this.mat).InverseFastSelf();
//		case 6:
//			return reinterpret_cast<idMat6 *>(this.mat).InverseFastSelf();
//		default:
//			return InverseSelfGeneric();
//	}
//	return false;
//}
//
//ID_INLINE idVecX idMatX::Multiply( const idVecX &vec ) const {
//	idVecX dst;
//
//	assert( this.numColumns == vec.GetSize() );
//
//	dst.SetTempSize( this.numRows );
//#ifdef MATX_SIMD
//	SIMDProcessor.MatX_MultiplyVecX( dst, *this, vec );
//#else
//	Multiply( dst, vec );
//#endif
//	return dst;
//}
//
//ID_INLINE idMatX idMatX::Multiply( const idMatX &a ) const {
//	idMatX dst;
//
//	assert( this.numColumns == a.this.numRows );
//
//	dst.SetTempSize( this.numRows, a.numColumns );
//#ifdef MATX_SIMD
//	SIMDProcessor.MatX_MultiplyMatX( dst, *this, a );
//#else
//	Multiply( dst, a );
//#endif
//	return dst;
//}
//
//ID_INLINE idVecX idMatX::TransposeMultiply( const idVecX &vec ) const {
//	idVecX dst;
//
//	assert( this.numRows == vec.GetSize() );
//
//	dst.SetTempSize( this.numColumns );
//#ifdef MATX_SIMD
//	SIMDProcessor.MatX_TransposeMultiplyVecX( dst, *this, vec );
//#else
//	TransposeMultiply( dst, vec );
//#endif
//	return dst;
//}
//
//ID_INLINE idMatX idMatX::TransposeMultiply( const idMatX &a ) const {
//	idMatX dst;
//
//	assert( this.numRows == a.numRows );
//
//	dst.SetTempSize( this.numColumns, a.numColumns );
//#ifdef MATX_SIMD
//	SIMDProcessor.MatX_TransposeMultiplyMatX( dst, *this, a );
//#else
//	TransposeMultiply( dst, a );
//#endif
//	return dst;
//}
//
//ID_INLINE void idMatX::Multiply( idVecX &dst, const idVecX &vec ) const {
//#ifdef MATX_SIMD
//	SIMDProcessor.MatX_MultiplyVecX( dst, *this, vec );
//#else
//	var /*int */i:number, j:number;
//	const float *mPtr, *vPtr;
//	float *dstPtr;
//
//	mPtr = this.mat;
//	vPtr = vec.ToFloatPtr();
//	dstPtr = dst.ToFloatPtr();
//	for ( i = 0; i < this.numRows; i++ ) {
//		float sum = mPtr[0] * vPtr[0];
//		for ( j = 1; j < this.numColumns; j++ ) {
//			sum += mPtr[j] * vPtr[j];
//		}
//		dstPtr[i] = sum;
//		mPtr += this.numColumns;
//	}
//#endif
//}
//
//ID_INLINE void idMatX::MultiplyAdd( idVecX &dst, const idVecX &vec ) const {
//#ifdef MATX_SIMD
//	SIMDProcessor.MatX_MultiplyAddVecX( dst, *this, vec );
//#else
//	var /*int */i:number, j:number;
//	const float *mPtr, *vPtr;
//	float *dstPtr;
//
//	mPtr = this.mat;
//	vPtr = vec.ToFloatPtr();
//	dstPtr = dst.ToFloatPtr();
//	for ( i = 0; i < this.numRows; i++ ) {
//		float sum = mPtr[0] * vPtr[0];
//		for ( j = 1; j < this.numColumns; j++ ) {
//			sum += mPtr[j] * vPtr[j];
//		}
//		dstPtr[i] += sum;
//		mPtr += this.numColumns;
//	}
//#endif
//}
//
//ID_INLINE void idMatX::MultiplySub( idVecX &dst, const idVecX &vec ) const {
//#ifdef MATX_SIMD
//	SIMDProcessor.MatX_MultiplySubVecX( dst, *this, vec );
//#else
//	var /*int */i:number, j:number;
//	const float *mPtr, *vPtr;
//	float *dstPtr;
//
//	mPtr = this.mat;
//	vPtr = vec.ToFloatPtr();
//	dstPtr = dst.ToFloatPtr();
//	for ( i = 0; i < this.numRows; i++ ) {
//		float sum = mPtr[0] * vPtr[0];
//		for ( j = 1; j < this.numColumns; j++ ) {
//			sum += mPtr[j] * vPtr[j];
//		}
//		dstPtr[i] -= sum;
//		mPtr += this.numColumns;
//	}
//#endif
//}
//
//ID_INLINE void idMatX::TransposeMultiply( idVecX &dst, const idVecX &vec ) const {
//#ifdef MATX_SIMD
//	SIMDProcessor.MatX_TransposeMultiplyVecX( dst, *this, vec );
//#else
//	var /*int */i:number, j:number;
//	const float *mPtr, *vPtr;
//	float *dstPtr;
//
//	vPtr = vec.ToFloatPtr();
//	dstPtr = dst.ToFloatPtr();
//	for ( i = 0; i < this.numColumns; i++ ) {
//		mPtr = this.mat + i;
//		float sum = mPtr[0] * vPtr[0];
//		for ( j = 1; j < this.numRows; j++ ) {
//			mPtr += this.numColumns;
//			sum += mPtr[0] * vPtr[j];
//		}
//		dstPtr[i] = sum;
//	}
//#endif
//}
//
//ID_INLINE void idMatX::TransposeMultiplyAdd( idVecX &dst, const idVecX &vec ) const {
//#ifdef MATX_SIMD
//	SIMDProcessor.MatX_TransposeMultiplyAddVecX( dst, *this, vec );
//#else
//	var /*int */i:number, j:number;
//	const float *mPtr, *vPtr;
//	float *dstPtr;
//
//	vPtr = vec.ToFloatPtr();
//	dstPtr = dst.ToFloatPtr();
//	for ( i = 0; i < this.numColumns; i++ ) {
//		mPtr = this.mat + i;
//		float sum = mPtr[0] * vPtr[0];
//		for ( j = 1; j < this.numRows; j++ ) {
//			mPtr += this.numColumns;
//			sum += mPtr[0] * vPtr[j];
//		}
//		dstPtr[i] += sum;
//	}
//#endif
//}
//
//ID_INLINE void idMatX::TransposeMultiplySub( idVecX &dst, const idVecX &vec ) const {
//#ifdef MATX_SIMD
//	SIMDProcessor.MatX_TransposeMultiplySubVecX( dst, *this, vec );
//#else
//	var /*int */i:number, j:number;
//	const float *mPtr, *vPtr;
//	float *dstPtr;
//
//	vPtr = vec.ToFloatPtr();
//	dstPtr = dst.ToFloatPtr();
//	for ( i = 0; i < this.numColumns; i++ ) {
//		mPtr = this.mat + i;
//		float sum = mPtr[0] * vPtr[0];
//		for ( j = 1; j < this.numRows; j++ ) {
//			mPtr += this.numColumns;
//			sum += mPtr[0] * vPtr[j];
//		}
//		dstPtr[i] -= sum;
//	}
//#endif
//}
//
//ID_INLINE void idMatX::Multiply( idMatX &dst, const idMatX &a ) const {
//#ifdef MATX_SIMD
//	SIMDProcessor.MatX_MultiplyMatX( dst, *this, a );
//#else
//	int i, j, k, l, n;
//	float *dstPtr;
//	const float *m1Ptr, *m2Ptr;
//	double sum;
//
//	assert( this.numColumns == a.this.numRows );
//
//	dstPtr = dst.ToFloatPtr();
//	m1Ptr = ToFloatPtr();
//	m2Ptr = a.ToFloatPtr();
//	k = this.numRows;
//	l = a.GetNumColumns();
//
//	for ( i = 0; i < k; i++ ) {
//		for ( j = 0; j < l; j++ ) {
//			m2Ptr = a.ToFloatPtr() + j;
//			sum = m1Ptr[0] * m2Ptr[0];
//			for ( n = 1; n < this.numColumns; n++ ) {
//				m2Ptr += l;
//				sum += m1Ptr[n] * m2Ptr[0];
//			}
//			*dstPtr++ = sum;
//		}
//		m1Ptr += this.numColumns;
//	}
//#endif
//}
//
//ID_INLINE void idMatX::TransposeMultiply( idMatX &dst, const idMatX &a ) const {
//#ifdef MATX_SIMD
//	SIMDProcessor.MatX_TransposeMultiplyMatX( dst, *this, a );
//#else
//	int i, j, k, l, n;
//	float *dstPtr;
//	const float *m1Ptr, *m2Ptr;
//	double sum;
//
//	assert( this.numRows == a.this.numRows );
//
//	dstPtr = dst.ToFloatPtr();
//	m1Ptr = ToFloatPtr();
//	k = this.numColumns;
//	l = a.numColumns;
//
//	for ( i = 0; i < k; i++ ) {
//		for ( j = 0; j < l; j++ ) {
//			m1Ptr = ToFloatPtr() + i;
//			m2Ptr = a.ToFloatPtr() + j;
//			sum = m1Ptr[0] * m2Ptr[0];
//			for ( n = 1; n < this.numRows; n++ ) {
//				m1Ptr += this.numColumns;
//				m2Ptr += a.numColumns;
//				sum += m1Ptr[0] * m2Ptr[0];
//			}
//			*dstPtr++ = sum;
//		}
//	}
//#endif
//}
//
//ID_INLINE int idMatX::GetDimension( ) const {
//	return this.numRows * this.numColumns;
//}
//
//ID_INLINE const idVec6 &idMatX::SubVec6( int row ) const {
//	assert( this.numColumns >= 6 && row >= 0 && row < this.numRows );
//	return *reinterpret_cast<const idVec6 *>(this.mat + row * this.numColumns);
//}
//
//ID_INLINE idVec6 &idMatX::SubVec6( int row ) {
//	assert( this.numColumns >= 6 && row >= 0 && row < this.numRows );
//	return *reinterpret_cast<idVec6 *>(this.mat + row * this.numColumns);
//}
//
//ID_INLINE const idVecX idMatX::SubVecX( int row ) const {
//	idVecX v;
//	assert( row >= 0 && row < this.numRows );
//	v.SetData( this.numColumns, this.mat + row * this.numColumns );
//	return v;
//}
//
//ID_INLINE idVecX idMatX::SubVecX( int row ) {
//	idVecX v;
//	assert( row >= 0 && row < this.numRows );
//	v.SetData( this.numColumns, this.mat + row * this.numColumns );
//	return v;
//}
//
//ID_INLINE const float *idMatX::ToFloatPtr( ) const {
//	return this.mat;
//}
//
//ID_INLINE float *idMatX::ToFloatPtr( ) {
//	return this.mat;
//}
//

}
//#endif /* !__MATH_MATRIX_H__ */
