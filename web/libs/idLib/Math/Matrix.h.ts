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

var MATRIX_INVERSE_EPSILON = 1e-14;
var MATRIX_EPSILON = 1e-6;

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
		var m2Ptr: Float32Array;
		var m1Ptr: Float32Array, m1PtrIdx: number, dst = [0, 0, 0];

		m1Ptr = this.ToFloatPtr ( ), m1PtrIdx = 0;
		m2Ptr = a.ToFloatPtr ( ); 

		for ( i = 0; i < 3; i++ ) {
			for ( j = 0; j < 3; j++ ) {
				dst[j] = m1Ptr[m1PtrIdx + 0] * m2Ptr[0 * 3 + j]
					+ m1Ptr[m1PtrIdx + 1] * m2Ptr[1 * 3 + j]
					+ m1Ptr[m1PtrIdx + 2] * m2Ptr[2 * 3 + j];
			}
			m1Ptr[m1PtrIdx + 0] = dst[0];
			m1Ptr[m1PtrIdx + 1] = dst[1];
			m1Ptr[m1PtrIdx + 2] = dst[2];
			m1PtrIdx += 3;
		}
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
	// confusing, should be in idVec3
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
    opEqualTo ( a: idMat3 ): boolean {
        return this.Compare( a );
    }

//ID_INLINE bool idMat3::operator!=( const idMat3 &a ) const {
    opNotEqualTo ( a: idMat3 ): boolean {
        return !this.Compare( a );
    }

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
    IsDiagonal ( /*const float*/ epsilon: number = MATRIX_EPSILON ): boolean {
        if ( idMath.Fabs( this.mat[0][1] ) > epsilon ||
            idMath.Fabs( this.mat[0][2] ) > epsilon ||
            idMath.Fabs( this.mat[1][0] ) > epsilon ||
            idMath.Fabs( this.mat[1][2] ) > epsilon ||
            idMath.Fabs( this.mat[2][0] ) > epsilon ||
            idMath.Fabs( this.mat[2][1] ) > epsilon ) {
            return false;
        }
        return true;
    }

    IsRotated ( ): boolean {
		return !this.Compare( mat3_identity );
	}

	ProjectVector ( src: idVec3, dst: idVec3 ): void {
		dst.x = src.timesVec( this.mat[0] );
		dst.y = src.timesVec( this.mat[1] );
		dst.z = src.timesVec( this.mat[2] );
	}
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
		return this.values;//this.mat[0].ToFloatPtr ( );
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

/*
============
idMat3::ToQuat
============
*/
	ToQuat ( ): idQuat {
		var q = new idQuat;
		var trace: number /*float*/;
		var s: number /*float*/;
		var t: number /*float*/;
		var i: number /*int*/;
		var j: number /*int*/;
		var k: number /*int*/;

		var /*static int 	*/next /*[ 3 ]*/ = [1, 2, 0];

		trace = this.mat[0][0] + this.mat[1][1] + this.mat[2][2];

		if ( trace > 0.0 ) {

			t = trace + 1.0;
			s = idMath.InvSqrt( t ) * 0.5;

			q[3] = s * t;
			q[0] = ( this.mat[2][1] - this.mat[1][2] ) * s;
			q[1] = ( this.mat[0][2] - this.mat[2][0] ) * s;
			q[2] = ( this.mat[1][0] - this.mat[0][1] ) * s;

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

			q[i] = s * t;
			q[3] = ( this.mat[k][j] - this.mat[j][k] ) * s;
			q[j] = ( this.mat[j][i] + this.mat[i][j] ) * s;
			q[k] = ( this.mat[k][i] + this.mat[i][k] ) * s;
		}
		return q;
	}

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

    static fakeNon0Offset = 10; // fake byteOffset so SetSize's assert() works like original (it doesn't expect a address of 0)
    static temp = new Float32Array(MATX_MAX_TEMP + 4 + idMatX.fakeNon0Offset).subarray(idMatX.fakeNon0Offset);	// used to store intermediate results
	static tempPtr = idMatX.temp.subarray( ( 0 + 15 ) & ~15 );				// pointer to 16 byte aligned temporary memory
	static tempIndex: number /*int*/ = 0;				// index into memory pool, wraps around
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
//	if ( this.mat != NULL && ( this.mat < idMatX.tempPtr || this.mat > idMatX.tempPtr + MATX_MAX_TEMP ) && alloced != -1 ) {
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
        assert( !this.mat || this.mat.byteOffset < idMatX.tempPtr.byteOffset || this.mat.byteOffset > idMatX.tempPtr.byteOffset + MATX_MAX_TEMP );
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
//	this.mat = idMatX.tempPtr /*+*/.subarray( idMatX.tempIndex);
//	idMatX::tempIndex += newSize;
//	this.alloced = newSize;
//	this.numRows = rows;
//	this.numColumns = columns;
//	MATX_CLEAREND(this);
//}
//
//ID_INLINE void idMatX::SetData( int rows, int columns, float *data ) {
//	assert( this.mat.byteOffset < idMatX.tempPtr .byteOffset || this.mat.byteOffset > idMatX.tempPtr.byteOffset  + MATX_MAX_TEMP );
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
    
//
//
///*
//============
//idMatX::ChangeSize
//============
//*/
//void idMatX::ChangeSize( int rows, int columns, bool makeZero ) {
//	int alloc = ( rows * columns + 3 ) & ~3;
//	if ( alloc > alloced && alloced != -1 ) {
//		float *oldMat = mat;
//		mat = (float *) Mem_Alloc16( alloc * sizeof( float ) );
//		if ( makeZero ) {
//			memset( mat, 0, alloc * sizeof( float ) );
//		}
//		alloced = alloc;
//		if ( oldMat ) {
//			int minRow = Min( numRows, rows );
//			int minColumn = Min( numColumns, columns );
//			for ( int i = 0; i < minRow; i++ ) {
//				for ( int j = 0; j < minColumn; j++ ) {
//					mat[ i * columns + j ] = oldMat[ i * numColumns + j ];
//				}
//			}
//			Mem_Free16( oldMat );
//		}
//	} else {
//		if ( columns < numColumns ) {
//			int minRow = Min( numRows, rows );
//			for ( int i = 0; i < minRow; i++ ) {
//				for ( int j = 0; j < columns; j++ ) {
//					mat[ i * columns + j ] = mat[ i * numColumns + j ];
//				}
//			}
//		} else if ( columns > numColumns ) {
//			for ( int i = Min( numRows, rows ) - 1; i >= 0; i-- ) {
//				if ( makeZero ) {
//					for ( int j = columns - 1; j >= numColumns; j-- ) {
//						mat[ i * columns + j ] = 0.0f;
//					}
//				}
//				for ( int j = numColumns - 1; j >= 0; j-- ) {
//					mat[ i * columns + j ] = mat[ i * numColumns + j ];
//				}
//			}
//		}
//		if ( makeZero && rows > numRows ) {
//			memset( mat + numRows * columns, 0, ( rows - numRows ) * columns * sizeof( float ) );
//		}
//	}
//	numRows = rows;
//	numColumns = columns;
//	MATX_CLEAREND();
//}
//
///*
//============
//idMatX::RemoveRow
//============
//*/
//idMatX &idMatX::RemoveRow( int r ) {
//	var/*int*/i:number;
//
//	assert( r < numRows );
//
//	numRows--;
//
//	for ( i = r; i < numRows; i++ ) {
//		memcpy( &mat[i * numColumns], &mat[( i + 1 ) * numColumns], numColumns * sizeof( float ) );
//	}
//
//	return *this;
//}
//
///*
//============
//idMatX::RemoveColumn
//============
//*/
//idMatX &idMatX::RemoveColumn( int r ) {
//	var/*int*/i:number;
//
//	assert( r < numColumns );
//
//	numColumns--;
//
//	for ( i = 0; i < numRows - 1; i++ ) {
//		memmove( &mat[i * numColumns + r], &mat[i * ( numColumns + 1 ) + r + 1], numColumns * sizeof( float ) );
//	}
//	memmove( &mat[i * numColumns + r], &mat[i * ( numColumns + 1 ) + r + 1], ( numColumns - r ) * sizeof( float ) );
//
//	return *this;
//}
//
///*
//============
//idMatX::RemoveRowColumn
//============
//*/
//idMatX &idMatX::RemoveRowColumn( int r ) {
//	var/*int*/i:number;
//
//	assert( r < numRows && r < numColumns );
//
//	numRows--;
//	numColumns--;
//
//	if ( r > 0 ) {
//		for ( i = 0; i < r - 1; i++ ) {
//			memmove( &mat[i * numColumns + r], &mat[i * ( numColumns + 1 ) + r + 1], numColumns * sizeof( float ) );
//		}
//		memmove( &mat[i * numColumns + r], &mat[i * ( numColumns + 1 ) + r + 1], ( numColumns - r ) * sizeof( float ) );
//	}
//
//	memcpy( &mat[r * numColumns], &mat[( r + 1 ) * ( numColumns + 1 )], r * sizeof( float ) );
//
//	for ( i = r; i < numRows - 1; i++ ) {
//		memcpy( &mat[i * numColumns + r], &mat[( i + 1 ) * ( numColumns + 1 ) + r + 1], numColumns * sizeof( float ) );
//	}
//	memcpy( &mat[i * numColumns + r], &mat[( i + 1 ) * ( numColumns + 1 ) + r + 1], ( numColumns - r ) * sizeof( float ) );
//
//	return *this;
//}
//
///*
//============
//idMatX::IsOrthogonal
//
//  returns true if (*this) * this->Transpose() == Identity
//============
//*/
//bool idMatX::IsOrthogonal( const float epsilon ) const {
//	float *ptr1, *ptr2, sum;
//
//	if ( !IsSquare() ) {
//		return false;
//	}
//
//	ptr1 = mat;
//	for ( int i = 0; i < numRows; i++ ) {
//		for ( int j = 0; j < numColumns; j++ ) {
//			ptr2 = mat + j;
//			sum = ptr1[0] * ptr2[0] - (float) ( i == j );
//			for ( int n = 1; n < numColumns; n++ ) {
//				ptr2 += numColumns;
//				sum += ptr1[n] * ptr2[0];
//			}
//			if ( idMath::Fabs( sum ) > epsilon ) {
//				return false;
//			}
//		}
//		ptr1 += numColumns;
//	}
//	return true;
//}
//
///*
//============
//idMatX::IsOrthonormal
//
//  returns true if (*this) * this->Transpose() == Identity and the length of each column vector is 1
//============
//*/
//bool idMatX::IsOrthonormal( const float epsilon ) const {
//	float *ptr1, *ptr2, sum;
//
//	if ( !IsSquare() ) {
//		return false;
//	}
//
//	ptr1 = mat;
//	for ( int i = 0; i < numRows; i++ ) {
//		for ( int j = 0; j < numColumns; j++ ) {
//			ptr2 = mat + j;
//			sum = ptr1[0] * ptr2[0] - (float) ( i == j );
//			for ( int n = 1; n < numColumns; n++ ) {
//				ptr2 += numColumns;
//				sum += ptr1[n] * ptr2[0];
//			}
//			if ( idMath::Fabs( sum ) > epsilon ) {
//				return false;
//			}
//		}
//		ptr1 += numColumns;
//
//		ptr2 = mat + i;
//		sum = ptr2[0] * ptr2[0] - 1.0f;
//		for ( i = 1; i < numRows; i++ ) {
//			ptr2 += numColumns;
//			sum += ptr2[i] * ptr2[i];
//		}
//		if ( idMath::Fabs( sum ) > epsilon ) {
//			return false;
//		}
//	}
//	return true;
//}
//
///*
//============
//idMatX::IsPMatrix
//
//  returns true if the matrix is a P-matrix
//  A square matrix is a P-matrix if all its principal minors are positive.
//============
//*/
//bool idMatX::IsPMatrix( const float epsilon ) const {
//	var /*int */i:number, j:number;
//	float d;
//	idMatX m;
//
//	if ( !IsSquare() ) {
//		return false;
//	}
//
//	if ( numRows <= 0 ) {
//		return true;
//	}
//
//	if ( (*this)[0][0] <= epsilon ) {
//		return false;
//	}
//
//	if ( numRows <= 1 ) {
//		return true;
//	}
//
//	m.SetData( numRows - 1, numColumns - 1, MATX_ALLOCA( ( numRows - 1 ) * ( numColumns - 1 ) ) );
//
//	for ( i = 1; i < numRows; i++ ) {
//		for ( j = 1; j < numColumns; j++ ) {
//			m[i-1][j-1] = (*this)[i][j];
//		}
//	}
//
//	if ( !m.IsPMatrix( epsilon ) ) {
//		return false;
//	}
//
//	for ( i = 1; i < numRows; i++ ) {
//		d = (*this)[i][0] / (*this)[0][0];
//		for ( j = 1; j < numColumns; j++ ) {
//			m[i-1][j-1] = (*this)[i][j] - d * (*this)[0][j];
//		}
//	}
//
//	if ( !m.IsPMatrix( epsilon ) ) {
//		return false;
//	}
//
//	return true;
//}
//
///*
//============
//idMatX::IsZMatrix
//
//  returns true if the matrix is a Z-matrix
//  A square matrix M is a Z-matrix if M[i][j] <= 0 for all i != j.
//============
//*/
//bool idMatX::IsZMatrix( const float epsilon ) const {
//	var /*int */i:number, j:number;
//
//	if ( !IsSquare() ) {
//		return false;
//	}
//
//	for ( i = 0; i < numRows; i++ ) {
//		for ( j = 0; j < numColumns; j++ ) {
//			if ( (*this)[i][j] > epsilon && i != j ) {
//				return false;
//			}
//		}
//	}
//	return true;
//}
//
///*
//============
//idMatX::IsPositiveDefinite
//
//  returns true if the matrix is Positive Definite (PD)
//  A square matrix M of order n is said to be PD if y'My > 0 for all vectors y of dimension n, y != 0.
//============
//*/
//bool idMatX::IsPositiveDefinite( const float epsilon ) const {
//	int i, j, k;
//	float d, s;
//	idMatX m;
//
//	// the matrix must be square
//	if ( !IsSquare() ) {
//		return false;
//	}
//
//	// copy matrix
//	m.SetData( numRows, numColumns, MATX_ALLOCA( numRows * numColumns ) );
//	m = *this;
//
//	// add transpose
//	for ( i = 0; i < numRows; i++ ) {
//		for ( j = 0; j < numColumns; j++ ) {
//			m[i][j] += (*this)[j][i];
//		}
//	}
//
//	// test Positive Definiteness with Gaussian pivot steps
//	for ( i = 0; i < numRows; i++ ) {
//
//		for ( j = i; j < numColumns; j++ ) {
//			if ( m[j][j] <= epsilon ) {
//				return false;
//			}
//		}
//
//		d = 1.0f / m[i][i];
//		for ( j = i + 1; j < numColumns; j++ ) {
//			s = d * m[j][i];
//			m[j][i] = 0.0f;
//			for ( k = i + 1; k < numRows; k++ ) {
//				m[j][k] -= s * m[i][k];
//			}
//		}
//	}
//
//	return true;
//}
//
///*
//============
//idMatX::IsSymmetricPositiveDefinite
//
//  returns true if the matrix is Symmetric Positive Definite (PD)
//============
//*/
//bool idMatX::IsSymmetricPositiveDefinite( const float epsilon ) const {
//	idMatX m;
//
//	// the matrix must be symmetric
//	if ( !IsSymmetric( epsilon ) ) {
//		return false;
//	}
//
//	// copy matrix
//	m.SetData( numRows, numColumns, MATX_ALLOCA( numRows * numColumns ) );
//	m = *this;
//
//	// being able to obtain Cholesky factors is both a necessary and sufficient condition for positive definiteness
//	return m.Cholesky_Factor();
//}
//
///*
//============
//idMatX::IsPositiveSemiDefinite
//
//  returns true if the matrix is Positive Semi Definite (PSD)
//  A square matrix M of order n is said to be PSD if y'My >= 0 for all vectors y of dimension n, y != 0.
//============
//*/
//bool idMatX::IsPositiveSemiDefinite( const float epsilon ) const {
//	int i, j, k;
//	float d, s;
//	idMatX m;
//
//	// the matrix must be square
//	if ( !IsSquare() ) {
//		return false;
//	}
//
//	// copy original matrix
//	m.SetData( numRows, numColumns, MATX_ALLOCA( numRows * numColumns ) );
//	m = *this;
//
//	// add transpose
//	for ( i = 0; i < numRows; i++ ) {
//		for ( j = 0; j < numColumns; j++ ) {
//			m[i][j] += (*this)[j][i];
//		}
//	}
//
//	// test Positive Semi Definiteness with Gaussian pivot steps
//	for ( i = 0; i < numRows; i++ ) {
//
//		for ( j = i; j < numColumns; j++ ) {
//			if ( m[j][j] < -epsilon ) {
//				return false;
//			}
//			if ( m[j][j] > epsilon ) {
//				continue;
//			}
//			for ( k = 0; k < numRows; k++ ) {
//				if ( idMath::Fabs( m[k][j] ) > epsilon ) {
//					return false;
//				}
//				if ( idMath::Fabs( m[j][k] ) > epsilon ) {
//					return false;
//				}
//			}
//		}
//
//		if ( m[i][i] <= epsilon ) {
//			continue;
//		}
//
//		d = 1.0f / m[i][i];
//		for ( j = i + 1; j < numColumns; j++ ) {
//			s = d * m[j][i];
//			m[j][i] = 0.0f;
//			for ( k = i + 1; k < numRows; k++ ) {
//				m[j][k] -= s * m[i][k];
//			}
//		}
//	}
//
//	return true;
//}
//
///*
//============
//idMatX::IsSymmetricPositiveSemiDefinite
//
//  returns true if the matrix is Symmetric Positive Semi Definite (PSD)
//============
//*/
//bool idMatX::IsSymmetricPositiveSemiDefinite( const float epsilon ) const {
//
//	// the matrix must be symmetric
//	if ( !IsSymmetric( epsilon ) ) {
//		return false;
//	}
//
//	return IsPositiveSemiDefinite( epsilon );
//}
//
///*
//============
//idMatX::LowerTriangularInverse
//
//  in-place inversion of the lower triangular matrix
//============
//*/
//bool idMatX::LowerTriangularInverse( void ) {
//	int i, j, k;
//	double d, sum;
//
//	for ( i = 0; i < numRows; i++ ) {
//		d = (*this)[i][i];
//		if ( d == 0.0f ) {
//			return false;
//		}
//		(*this)[i][i] = d = 1.0f / d;
//
//		for ( j = 0; j < i; j++ ) {
//			sum = 0.0f;
//			for ( k = j; k < i; k++ ) {
//				sum -= (*this)[i][k] * (*this)[k][j];
//			}
//			(*this)[i][j] = sum * d;
//		}
//	}
//	return true;
//}
//
///*
//============
//idMatX::UpperTriangularInverse
//
//  in-place inversion of the upper triangular matrix
//============
//*/
//bool idMatX::UpperTriangularInverse( void ) {
//	int i, j, k;
//	double d, sum;
//
//	for ( i = numRows-1; i >= 0; i-- ) {
//		d = (*this)[i][i];
//		if ( d == 0.0f ) {
//			return false;
//		}
//		(*this)[i][i] = d = 1.0f / d;
//
//		for ( j = numRows-1; j > i; j-- ) {
//			sum = 0.0f;
//			for ( k = j; k > i; k-- ) {
//				sum -= (*this)[i][k] * (*this)[k][j];
//			}
//			(*this)[i][j] = sum * d;
//		}
//	}
//	return true;
//}
//
///*
//=============
//idMatX::ToString
//=============
//*/
//const char *idMatX::ToString( int precision ) const {
//	return idStr.FloatArrayToString( ToFloatPtr(), GetDimension(), precision );
//}
//
///*
//============
//idMatX::Update_RankOne
//
//  Updates the matrix to obtain the matrix: A + alpha * v * w'
//============
//*/
//void idMatX::Update_RankOne( const idVecX &v, const idVecX &w, float alpha ) {
//	var /*int */i:number, j:number;
//	float s;
//
//	assert( v.GetSize() >= numRows );
//	assert( w.GetSize() >= numColumns );
//
//	for ( i = 0; i < numRows; i++ ) {
//		s = alpha * v[i];
//		for ( j = 0; j < numColumns; j++ ) {
//			(*this)[i][j] += s * w[j];
//		}
//	}
//}
//
///*
//============
//idMatX::Update_RankOneSymmetric
//
//  Updates the matrix to obtain the matrix: A + alpha * v * v'
//============
//*/
//void idMatX::Update_RankOneSymmetric( const idVecX &v, float alpha ) {
//	var /*int */i:number, j:number;
//	float s;
//
//	assert( numRows == numColumns );
//	assert( v.GetSize() >= numRows );
//
//	for ( i = 0; i < numRows; i++ ) {
//		s = alpha * v[i];
//		for ( j = 0; j < numColumns; j++ ) {
//			(*this)[i][j] += s * v[j];
//		}
//	}
//}
//
///*
//============
//idMatX::Update_RowColumn
//
//  Updates the matrix to obtain the matrix:
//
//      [ 0  a  0 ]
//  A + [ d  b  e ]
//      [ 0  c  0 ]
//
//  where: a = v[0,r-1], b = v[r], c = v[r+1,numRows-1], d = w[0,r-1], w[r] = 0.0f, e = w[r+1,numColumns-1]
//============
//*/
//void idMatX::Update_RowColumn( const idVecX &v, const idVecX &w, int r ) {
//	var/*int*/i:number;
//
//	assert( w[r] == 0.0f );
//	assert( v.GetSize() >= numColumns );
//	assert( w.GetSize() >= numRows );
//
//	for ( i = 0; i < numRows; i++ ) {
//		(*this)[i][r] += v[i];
//	}
//	for ( i = 0; i < numColumns; i++ ) {
//		(*this)[r][i] += w[i];
//	}
//}
//
///*
//============
//idMatX::Update_RowColumnSymmetric
//
//  Updates the matrix to obtain the matrix:
//
//      [ 0  a  0 ]
//  A + [ a  b  c ]
//      [ 0  c  0 ]
//
//  where: a = v[0,r-1], b = v[r], c = v[r+1,numRows-1]
//============
//*/
//void idMatX::Update_RowColumnSymmetric( const idVecX &v, int r ) {
//	var/*int*/i:number;
//
//	assert( numRows == numColumns );
//	assert( v.GetSize() >= numRows );
//
//	for ( i = 0; i < r; i++ ) {
//		(*this)[i][r] += v[i];
//		(*this)[r][i] += v[i];
//	}
//	(*this)[r][r] += v[r];
//	for ( i = r+1; i < numRows; i++ ) {
//		(*this)[i][r] += v[i];
//		(*this)[r][i] += v[i];
//	}
//}
//
///*
//============
//idMatX::Update_Increment
//
//  Updates the matrix to obtain the matrix:
//
//  [ A  a ]
//  [ c  b ]
//
//  where: a = v[0,numRows-1], b = v[numRows], c = w[0,numColumns-1]], w[numColumns] = 0
//============
//*/
//void idMatX::Update_Increment( const idVecX &v, const idVecX &w ) {
//	var/*int*/i:number;
//
//	assert( numRows == numColumns );
//	assert( v.GetSize() >= numRows+1 );
//	assert( w.GetSize() >= numColumns+1 );
//
//	ChangeSize( numRows+1, numColumns+1, false );
//
//	for ( i = 0; i < numRows; i++ ) {
//		(*this)[i][numColumns-1] = v[i];
//	}
//	for ( i = 0; i < numColumns-1; i++ ) {
//		(*this)[numRows-1][i] = w[i];
//	}
//}
//
///*
//============
//idMatX::Update_IncrementSymmetric
//
//  Updates the matrix to obtain the matrix:
//
//  [ A  a ]
//  [ a  b ]
//
//  where: a = v[0,numRows-1], b = v[numRows]
//============
//*/
//void idMatX::Update_IncrementSymmetric( const idVecX &v ) {
//	var/*int*/i:number;
//
//	assert( numRows == numColumns );
//	assert( v.GetSize() >= numRows+1 );
//
//	ChangeSize( numRows+1, numColumns+1, false );
//
//	for ( i = 0; i < numRows-1; i++ ) {
//		(*this)[i][numColumns-1] = v[i];
//	}
//	for ( i = 0; i < numColumns; i++ ) {
//		(*this)[numRows-1][i] = v[i];
//	}
//}
//
///*
//============
//idMatX::Update_Decrement
//
//  Updates the matrix to obtain a matrix with row r and column r removed.
//============
//*/
//void idMatX::Update_Decrement( int r ) {
//	RemoveRowColumn( r );
//}
//
///*
//============
//idMatX::Inverse_GaussJordan
//
//  in-place inversion using Gauss-Jordan elimination
//============
//*/
//bool idMatX::Inverse_GaussJordan( void ) {
//	int i, j, k, r, c;
//	float d, max;
//
//	assert( numRows == numColumns );
//
//	int *columnIndex = (int *) _alloca16( numRows * sizeof( int ) );
//	int *rowIndex = (int *) _alloca16( numRows * sizeof( int ) );
//	bool *pivot = (bool *) _alloca16( numRows * sizeof( bool ) );
//
//	memset( pivot, 0, numRows * sizeof( bool ) );
//
//	// elimination with full pivoting
//	for ( i = 0; i < numRows; i++ ) {
//
//		// search the whole matrix except for pivoted rows for the maximum absolute value
//		max = 0.0f;
//		r = c = 0;
//		for ( j = 0; j < numRows; j++ ) {
//			if ( !pivot[j] ) {
//				for ( k = 0; k < numRows; k++ ) {
//					if ( !pivot[k] ) {
//						d = idMath::Fabs( (*this)[j][k] );
//						if ( d > max ) {
//							max = d;
//							r = j;
//							c = k;
//						}
//					}
//				}
//			}
//		}
//
//		if ( max == 0.0f ) {
//			// matrix is not invertible
//			return false;
//		}
//
//		pivot[c] = true;
//
//		// swap rows such that entry (c,c) has the pivot entry
//		if ( r != c ) {
//			SwapRows( r, c );
//		}
//
//		// keep track of the row permutation
//		rowIndex[i] = r;
//		columnIndex[i] = c;
//
//		// scale the row to make the pivot entry equal to 1
//		d = 1.0f / (*this)[c][c];
//		(*this)[c][c] = 1.0f;
//		for ( k = 0; k < numRows; k++ ) {
//			(*this)[c][k] *= d;
//		}
//
//		// zero out the pivot column entries in the other rows
//		for ( j = 0; j < numRows; j++ ) {
//			if ( j != c ) {
//				d = (*this)[j][c];
//				(*this)[j][c] = 0.0f;
//				for ( k = 0; k < numRows; k++ ) {
//					(*this)[j][k] -= (*this)[c][k] * d;
//				}
//			}
//		}
//	}
//
//	// reorder rows to store the inverse of the original matrix
//	for ( j = numRows - 1; j >= 0; j-- ) {
//		if ( rowIndex[j] != columnIndex[j] ) {
//			for ( k = 0; k < numRows; k++ ) {
//				d = (*this)[k][rowIndex[j]];
//				(*this)[k][rowIndex[j]] = (*this)[k][columnIndex[j]];
//				(*this)[k][columnIndex[j]] = d;
//			}
//		}
//	}
//
//	return true;
//}
//
///*
//============
//idMatX::Inverse_UpdateRankOne
//
//  Updates the in-place inverse using the Sherman-Morrison formula to obtain the inverse for the matrix: A + alpha * v * w'
//============
//*/
//bool idMatX::Inverse_UpdateRankOne( const idVecX &v, const idVecX &w, float alpha ) {
//	var /*int */i:number, j:number;
//	float beta, s;
//	idVecX y, z;
//
//	assert( numRows == numColumns );
//	assert( v.GetSize() >= numColumns );
//	assert( w.GetSize() >= numRows );
//
//	y.SetData( numRows, VECX_ALLOCA( numRows ) );
//	z.SetData( numRows, VECX_ALLOCA( numRows ) );
//
//	Multiply( y, v );
//	TransposeMultiply( z, w );
//	beta = 1.0f + ( w * y );
//
//	if ( beta == 0.0f ) {
//		return false;
//	}
//
//	alpha /= beta;
//
//	for ( i = 0; i < numRows; i++ ) {
//		s = y[i] * alpha;
//		for ( j = 0; j < numColumns; j++ ) {
//			(*this)[i][j] -= s * z[j];
//		}
//	}
//	return true;
//}
//
///*
//============
//idMatX::Inverse_UpdateRowColumn
//
//  Updates the in-place inverse to obtain the inverse for the matrix:
//
//      [ 0  a  0 ]
//  A + [ d  b  e ]
//      [ 0  c  0 ]
//
//  where: a = v[0,r-1], b = v[r], c = v[r+1,numRows-1], d = w[0,r-1], w[r] = 0.0f, e = w[r+1,numColumns-1]
//============
//*/
//bool idMatX::Inverse_UpdateRowColumn( const idVecX &v, const idVecX &w, int r ) {
//	idVecX s;
//
//	assert( numRows == numColumns );
//	assert( v.GetSize() >= numColumns );
//	assert( w.GetSize() >= numRows );
//	assert( r >= 0 && r < numRows && r < numColumns );
//	assert( w[r] == 0.0f );
//
//	s.SetData( Max( numRows, numColumns ), VECX_ALLOCA( Max( numRows, numColumns ) ) );
//	s.Zero();
//	s[r] = 1.0f;
//
//	if ( !Inverse_UpdateRankOne( v, s, 1.0f ) ) {
//		return false;
//	}
//	if ( !Inverse_UpdateRankOne( s, w, 1.0f ) ) {
//		return false;
//	}
//	return true;
//}
//
///*
//============
//idMatX::Inverse_UpdateIncrement
//
//  Updates the in-place inverse to obtain the inverse for the matrix:
//
//  [ A  a ]
//  [ c  b ]
//
//  where: a = v[0,numRows-1], b = v[numRows], c = w[0,numColumns-1], w[numColumns] = 0
//============
//*/
//bool idMatX::Inverse_UpdateIncrement( const idVecX &v, const idVecX &w ) {
//	idVecX v2;
//
//	assert( numRows == numColumns );
//	assert( v.GetSize() >= numRows+1 );
//	assert( w.GetSize() >= numColumns+1 );
//
//	ChangeSize( numRows+1, numColumns+1, true );
//	(*this)[numRows-1][numRows-1] = 1.0f;
//
//	v2.SetData( numRows, VECX_ALLOCA( numRows ) );
//	v2 = v;
//	v2[numRows-1] -= 1.0f;
//
//	return Inverse_UpdateRowColumn( v2, w, numRows-1 );
//}
//
///*
//============
//idMatX::Inverse_UpdateDecrement
//
//  Updates the in-place inverse to obtain the inverse of the matrix with row r and column r removed.
//  v and w should store the column and row of the original matrix respectively.
//============
//*/
//bool idMatX::Inverse_UpdateDecrement( const idVecX &v, const idVecX &w, int r ) {
//	idVecX v1, w1;
//
//	assert( numRows == numColumns );
//	assert( v.GetSize() >= numRows );
//	assert( w.GetSize() >= numColumns );
//	assert( r >= 0 && r < numRows && r < numColumns );
//
//	v1.SetData( numRows, VECX_ALLOCA( numRows ) );
//	w1.SetData( numRows, VECX_ALLOCA( numRows ) );
//
//	// update the row and column to identity
//	v1 = -v;
//	w1 = -w;
//	v1[r] += 1.0f;
//	w1[r] = 0.0f;
//
//	if ( !Inverse_UpdateRowColumn( v1, w1, r ) ) {
//		return false;
//	}
//
//	// physically remove the row and column
//	Update_Decrement( r );
//
//	return true;
//}
//
///*
//============
//idMatX::Inverse_Solve
//
//  Solve Ax = b with A inverted
//============
//*/
//void idMatX::Inverse_Solve( idVecX &x, const idVecX &b ) const {
//	Multiply( x, b );
//}
//
///*
//============
//idMatX::LU_Factor
//
//  in-place factorization: LU
//  L is a triangular matrix stored in the lower triangle.
//  L has ones on the diagonal that are not stored.
//  U is a triangular matrix stored in the upper triangle.
//  If index != NULL partial pivoting is used for numerical stability.
//  If index != NULL it must point to an array of numRow integers and is used to keep track of the row permutation.
//  If det != NULL the determinant of the matrix is calculated and stored.
//============
//*/
//bool idMatX::LU_Factor( int *index, float *det ) {
//	int i, j, k, newi, min;
//	double s, t, d, w;
//
//	// if partial pivoting should be used
//	if ( index ) {
//		for ( i = 0; i < numRows; i++ ) {
//			index[i] = i;
//		}
//	}
//
//	w = 1.0f;
//	min = Min( numRows, numColumns );
//	for ( i = 0; i < min; i++ ) {
//
//		newi = i;
//		s = idMath::Fabs( (*this)[i][i] );
//
//		if ( index ) {
//			// find the largest absolute pivot
//			for ( j = i + 1; j < numRows; j++ ) {
//				t = idMath::Fabs( (*this)[j][i] );
//				if ( t > s ) {
//					newi = j;
//					s = t;
//				}
//			}
//		}
//
//		if ( s == 0.0f ) {
//			return false;
//		}
//
//		if ( newi != i ) {
//
//			w = -w;
//
//			// swap index elements
//			k = index[i];
//			index[i] = index[newi];
//			index[newi] = k;
//
//			// swap rows
//			for ( j = 0; j < numColumns; j++ ) {
//				t = (*this)[newi][j];
//				(*this)[newi][j] = (*this)[i][j];
//				(*this)[i][j] = t;
//			}
//		}
//
//		if ( i < numRows ) {
//			d = 1.0f / (*this)[i][i];
//			for ( j = i + 1; j < numRows; j++ ) {
//				(*this)[j][i] *= d;
//			}
//		}
//
//		if ( i < min-1 ) {
//			for ( j = i + 1; j < numRows; j++ ) {
//				d = (*this)[j][i];
//				for ( k = i + 1; k < numColumns; k++ ) {
//					(*this)[j][k] -= d * (*this)[i][k];
//				}
//			}
//		}
//	}
//
//	if ( det ) {
//		for ( i = 0; i < numRows; i++ ) {
//			w *= (*this)[i][i];
//		}
//		*det = w;
//	}
//
//	return true;
//}   
//
///*
//============
//idMatX::LU_UpdateRankOne
//
//  Updates the in-place LU factorization to obtain the factors for the matrix: LU + alpha * v * w'
//============
//*/
//bool idMatX::LU_UpdateRankOne( const idVecX &v, const idVecX &w, float alpha, int *index ) {
//	int i, j, max;
//	float *y, *z;
//	double diag, beta, p0, p1, d;
//
//	assert( v.GetSize() >= numColumns );
//	assert( w.GetSize() >= numRows );
//
//	y = (float *) _alloca16( v.GetSize() * sizeof( float ) );
//	z = (float *) _alloca16( w.GetSize() * sizeof( float ) );
//
//	if ( index != NULL ) {
//		for ( i = 0; i < numRows; i++ ) {
//			y[i] = alpha * v[index[i]];
//		}
//	} else {
//		for ( i = 0; i < numRows; i++ ) {
//			y[i] = alpha * v[i];
//		}
//	}
//
//	memcpy( z, w.ToFloatPtr(), w.GetSize() * sizeof( float ) );
//
//	max = Min( numRows, numColumns );
//	for ( i = 0; i < max; i++ ) {
//		diag = (*this)[i][i];
//
//		p0 = y[i];
//		p1 = z[i];
//		diag += p0 * p1;
//
//		if ( diag == 0.0f ) {
//			return false;
//		}
//
//		beta = p1 / diag;
//
//		(*this)[i][i] = diag;
//
//		for ( j = i+1; j < numColumns; j++ ) {
//
//			d = (*this)[i][j];
//
//			d += p0 * z[j];
//			z[j] -= beta * d;
//
//			(*this)[i][j] = d;
//		}
//
//		for ( j = i+1; j < numRows; j++ ) {
//
//			d = (*this)[j][i];
//
//			y[j] -= p0 * d;
//			d += beta * y[j];
//
//			(*this)[j][i] = d;
//		}
//	}
//	return true;
//}
//
///*
//============
//idMatX::LU_UpdateRowColumn
//
//  Updates the in-place LU factorization to obtain the factors for the matrix:
//
//       [ 0  a  0 ]
//  LU + [ d  b  e ]
//       [ 0  c  0 ]
//
//  where: a = v[0,r-1], b = v[r], c = v[r+1,numRows-1], d = w[0,r-1], w[r] = 0.0f, e = w[r+1,numColumns-1]
//============
//*/
//bool idMatX::LU_UpdateRowColumn( const idVecX &v, const idVecX &w, int r, int *index ) {
//#if 0
//
//	idVecX s;
//
//	assert( v.GetSize() >= numColumns );
//	assert( w.GetSize() >= numRows );
//	assert( r >= 0 && r < numRows && r < numColumns );
//	assert( w[r] == 0.0f );
//
//	s.SetData( Max( numRows, numColumns ), VECX_ALLOCA( Max( numRows, numColumns ) ) );
//	s.Zero();
//	s[r] = 1.0f;
//
//	if ( !LU_UpdateRankOne( v, s, 1.0f, index ) ) {
//		return false;
//	}
//	if ( !LU_UpdateRankOne( s, w, 1.0f, index ) ) {
//		return false;
//	}
//	return true;
//
//#else
//
//	int i, j, min, max, rp;
//	float *y0, *y1, *z0, *z1;
//	double diag, beta0, beta1, p0, p1, q0, q1, d;
//
//	assert( v.GetSize() >= numColumns );
//	assert( w.GetSize() >= numRows );
//	assert( r >= 0 && r < numColumns && r < numRows );
//	assert( w[r] == 0.0f );
//
//	y0 = (float *) _alloca16( v.GetSize() * sizeof( float ) );
//	z0 = (float *) _alloca16( w.GetSize() * sizeof( float ) );
//	y1 = (float *) _alloca16( v.GetSize() * sizeof( float ) );
//	z1 = (float *) _alloca16( w.GetSize() * sizeof( float ) );
//
//	if ( index != NULL ) {
//		for ( i = 0; i < numRows; i++ ) {
//			y0[i] = v[index[i]];
//		}
//		rp = r;
//		for ( i = 0; i < numRows; i++ ) {
//			if ( index[i] == r ) {
//				rp = i;
//				break;
//			}
//		}
//	} else {
//		memcpy( y0, v.ToFloatPtr(), v.GetSize() * sizeof( float ) );
//		rp = r;
//	}
//
//	memset( y1, 0, v.GetSize() * sizeof( float ) );
//	y1[rp] = 1.0f;
//
//	memset( z0, 0, w.GetSize() * sizeof( float ) );
//	z0[r] = 1.0f;
//
//	memcpy( z1, w.ToFloatPtr(), w.GetSize() * sizeof( float ) );
//
//	// update the beginning of the to be updated row and column
//	min = Min( r, rp );
//	for ( i = 0; i < min; i++ ) {
//		p0 = y0[i];
//		beta1 = z1[i] / (*this)[i][i];
//
//		(*this)[i][r] += p0;
//		for ( j = i+1; j < numColumns; j++ ) {
//			z1[j] -= beta1 * (*this)[i][j];
//		}
//		for ( j = i+1; j < numRows; j++ ) {
//			y0[j] -= p0 * (*this)[j][i];
//		}
//		(*this)[rp][i] += beta1;
//	}
//
//	// update the lower right corner starting at r,r
//	max = Min( numRows, numColumns );
//	for ( i = min; i < max; i++ ) {
//		diag = (*this)[i][i];
//
//		p0 = y0[i];
//		p1 = z0[i];
//		diag += p0 * p1;
//
//		if ( diag == 0.0f ) {
//			return false;
//		}
//
//		beta0 = p1 / diag;
//
//		q0 = y1[i];
//		q1 = z1[i];
//		diag += q0 * q1;
//
//		if ( diag == 0.0f ) {
//			return false;
//		}
//
//		beta1 = q1 / diag;
//
//		(*this)[i][i] = diag;
//
//		for ( j = i+1; j < numColumns; j++ ) {
//
//			d = (*this)[i][j];
//
//			d += p0 * z0[j];
//			z0[j] -= beta0 * d;
//
//			d += q0 * z1[j];
//			z1[j] -= beta1 * d;
//
//			(*this)[i][j] = d;
//		}
//
//		for ( j = i+1; j < numRows; j++ ) {
//
//			d = (*this)[j][i];
//
//			y0[j] -= p0 * d;
//			d += beta0 * y0[j];
//
//			y1[j] -= q0 * d;
//			d += beta1 * y1[j];
//
//			(*this)[j][i] = d;
//		}
//	}
//	return true;
//
//#endif
//}
//
///*
//============
//idMatX::LU_UpdateIncrement
//
//  Updates the in-place LU factorization to obtain the factors for the matrix:
//
//  [ A  a ]
//  [ c  b ]
//
//  where: a = v[0,numRows-1], b = v[numRows], c = w[0,numColumns-1], w[numColumns] = 0
//============
//*/
//bool idMatX::LU_UpdateIncrement( const idVecX &v, const idVecX &w, int *index ) {
//	var /*int */i:number, j:number;
//	float sum;
//
//	assert( numRows == numColumns );
//	assert( v.GetSize() >= numRows+1 );
//	assert( w.GetSize() >= numColumns+1 );
//
//	ChangeSize( numRows+1, numColumns+1, true );
//
//	// add row to L
//	for ( i = 0; i < numRows - 1; i++ ) {
//		sum = w[i];
//		for ( j = 0; j < i; j++ ) {
//			sum -= (*this)[numRows - 1][j] * (*this)[j][i];
//		}
//		(*this)[numRows - 1 ][i] = sum / (*this)[i][i];
//	}
//
//	// add row to the permutation index
//	if ( index != NULL ) {
//		index[numRows - 1] = numRows - 1;
//	}
//
//	// add column to U
//	for ( i = 0; i < numRows; i++ ) {
//		if ( index != NULL ) {
//			sum = v[index[i]];
//		} else {
//			sum = v[i];
//		}
//		for ( j = 0; j < i; j++ ) {
//			sum -= (*this)[i][j] * (*this)[j][numRows - 1];
//		}
//		(*this)[i][numRows - 1] = sum;
//	}
//
//	return true;
//}
//
///*
//============
//idMatX::LU_UpdateDecrement
//
//  Updates the in-place LU factorization to obtain the factors for the matrix with row r and column r removed.
//  v and w should store the column and row of the original matrix respectively.
//  If index != NULL then u should store row index[r] of the original matrix. If index == NULL then u = w.
//============
//*/
//bool idMatX::LU_UpdateDecrement( const idVecX &v, const idVecX &w, const idVecX &u, int r, int *index ) {
//	int i, p;
//	idVecX v1, w1;
//
//	assert( numRows == numColumns );
//	assert( v.GetSize() >= numColumns );
//	assert( w.GetSize() >= numRows );
//	assert( r >= 0 && r < numRows && r < numColumns );
//
//	v1.SetData( numRows, VECX_ALLOCA( numRows ) );
//	w1.SetData( numRows, VECX_ALLOCA( numRows ) );
//
//	if ( index != NULL ) {
//
//		// find the pivot row
//		for ( p = i = 0; i < numRows; i++ ) {
//			if ( index[i] == r ) {
//				p = i;
//				break;
//			}
//		}
//
//		// update the row and column to identity
//		v1 = -v;
//		w1 = -u;
//
//		if ( p != r ) {
//			idSwap( v1[index[r]], v1[index[p]] );
//			idSwap( index[r], index[p] );
//		}
//
//		v1[r] += 1.0f;
//		w1[r] = 0.0f;
//
//		if ( !LU_UpdateRowColumn( v1, w1, r, index ) ) {
//			return false;
//		}
//
//		if ( p != r ) {
//
//			if ( idMath::Fabs( u[p] ) < 1e-4f ) {
//				// NOTE: an additional row interchange is required for numerical stability
//			}
//
//			// move row index[r] of the original matrix to row index[p] of the original matrix
//			v1.Zero();
//			v1[index[p]] = 1.0f;
//			w1 = u - w;
//
//			if ( !LU_UpdateRankOne( v1, w1, 1.0f, index ) ) {
//				return false;
//			}
//		}
//
//		// remove the row from the permutation index
//		for ( i = r; i < numRows - 1; i++ ) {
//			index[i] = index[i+1];
//		}
//		for ( i = 0; i < numRows - 1; i++ ) {
//			if ( index[i] > r ) {
//				index[i]--;
//			}
//		}
//
//	} else {
//
//		v1 = -v;
//		w1 = -w;
//		v1[r] += 1.0f;
//		w1[r] = 0.0f;
//
//		if ( !LU_UpdateRowColumn( v1, w1, r, index ) ) {
//			return false;
//		}
//	}
//
//	// physically remove the row and column
//	Update_Decrement( r );
//
//	return true;
//}
//
///*
//============
//idMatX::LU_Solve
//
//  Solve Ax = b with A factored in-place as: LU
//============
//*/
//void idMatX::LU_Solve( idVecX &x, const idVecX &b, const int *index ) const {
//	var /*int */i:number, j:number;
//	double sum;
//
//	assert( x.GetSize() == numColumns && b.GetSize() == numRows );
//
//	// solve L
//	for ( i = 0; i < numRows; i++ ) {
//		if ( index != NULL ) {
//			sum = b[index[i]];
//		} else {
//			sum = b[i];
//		}
//		for ( j = 0; j < i; j++ ) {
//			sum -= (*this)[i][j] * x[j];
//		}
//		x[i] = sum;
//	}
//
//	// solve U
//	for ( i = numRows - 1; i >= 0; i-- ) {
//		sum = x[i];
//		for ( j = i + 1; j < numRows; j++ ) {
//			sum -= (*this)[i][j] * x[j];
//		}
//		x[i] = sum / (*this)[i][i];
//	}
//}
//
///*
//============
//idMatX::LU_Inverse
//
//  Calculates the inverse of the matrix which is factored in-place as LU
//============
//*/
//void idMatX::LU_Inverse( idMatX &inv, const int *index ) const {
//	var /*int */i:number, j:number;
//	idVecX x, b;
//
//	assert( numRows == numColumns );
//
//	x.SetData( numRows, VECX_ALLOCA( numRows ) );
//	b.SetData( numRows, VECX_ALLOCA( numRows ) );
//	b.Zero();
//	inv.SetSize( numRows, numColumns );
//
//	for ( i = 0; i < numRows; i++ ) {
//
//		b[i] = 1.0f;
//		LU_Solve( x, b, index );
//		for ( j = 0; j < numRows; j++ ) {
//			inv[j][i] = x[j];
//		}
//		b[i] = 0.0f;
//	}
//}
//
///*
//============
//idMatX::LU_UnpackFactors
//
//  Unpacks the in-place LU factorization.
//============
//*/
//void idMatX::LU_UnpackFactors( idMatX &L, idMatX &U ) const {
//	var /*int */i:number, j:number;
//
//	L.Zero( numRows, numColumns );
//	U.Zero( numRows, numColumns );
//	for ( i = 0; i < numRows; i++ ) {
//		for ( j = 0; j < i; j++ ) {
//			L[i][j] = (*this)[i][j];
//		}
//		L[i][i] = 1.0f;
//		for ( j = i; j < numColumns; j++ ) {
//			U[i][j] = (*this)[i][j];
//		}
//	}
//}
//
///*
//============
//idMatX::LU_MultiplyFactors
//
//  Multiplies the factors of the in-place LU factorization to form the original matrix.
//============
//*/
//void idMatX::LU_MultiplyFactors( idMatX &m, const int *index ) const {
//	int r, rp, i, j;
//	double sum;
//
//	m.SetSize( numRows, numColumns );
//
//	for ( r = 0; r < numRows; r++ ) {
//
//		if ( index != NULL ) {
//			rp = index[r];
//		} else {
//			rp = r;
//		}
//
//		// calculate row of matrix
//		for ( i = 0; i < numColumns; i++ ) {
//			if ( i >= r ) {
//				sum = (*this)[r][i];
//			} else {
//				sum = 0.0f;
//			}
//			for ( j = 0; j <= i && j < r; j++ ) {
//				sum += (*this)[r][j] * (*this)[j][i];
//			}
//			m[rp][i] = sum;
//		}
//	}
//}
//
///*
//============
//idMatX::QR_Factor
//
//  in-place factorization: QR
//  Q is an orthogonal matrix represented as a product of Householder matrices stored in the lower triangle and c.
//  R is a triangular matrix stored in the upper triangle except for the diagonal elements which are stored in d.
//  The initial matrix has to be square.
//============
//*/
//bool idMatX::QR_Factor( idVecX &c, idVecX &d ) {
//	int i, j, k;
//	double scale, s, t, sum;
//	bool singular = false;
//
//	assert( numRows == numColumns );
//	assert( c.GetSize() >= numRows && d.GetSize() >= numRows );
//
//	for ( k = 0; k < numRows-1; k++ ) {
//
//		scale = 0.0f;
//		for ( i = k; i < numRows; i++ ) {
//			s = idMath::Fabs( (*this)[i][k] );
//			if ( s > scale ) {
//				scale = s;
//			}
//		}
//		if ( scale == 0.0f ) {
//			singular = true;
//			c[k] = d[k] = 0.0f;
//		} else {
//
//			s = 1.0f / scale;
//			for ( i = k; i < numRows; i++ ) {
//				(*this)[i][k] *= s;
//			}
//
//			sum = 0.0f;
//			for ( i = k; i < numRows; i++ ) {
//				s = (*this)[i][k];
//				sum += s * s;
//			}
//
//			s = idMath::Sqrt( sum );
//			if ( (*this)[k][k] < 0.0f ) {
//				s = -s;
//			}
//			(*this)[k][k] += s;
//			c[k] = s * (*this)[k][k];
//			d[k] = -scale * s;
//
//			for ( j = k+1; j < numRows; j++ ) {
//
//				sum = 0.0f;
//				for ( i = k; i < numRows; i++ ) {
//					sum += (*this)[i][k] * (*this)[i][j];
//				}
//				t = sum / c[k];
//				for ( i = k; i < numRows; i++ ) {
//					(*this)[i][j] -= t * (*this)[i][k];
//				}
//			}
//		}
//	}
//	d[numRows-1] = (*this)[ (numRows-1) ][ (numRows-1) ];
//	if ( d[numRows-1] == 0.0f ) {
//		singular = true;
//	}
//
//	return !singular;
//}
//
///*
//============
//idMatX::QR_Rotate
//
//  Performs a Jacobi rotation on the rows i and i+1 of the unpacked QR factors.
//============
//*/
//void idMatX::QR_Rotate( idMatX &R, int i, float a, float b ) {
//	int j;
//	float f, c, s, w, y;
//
//	if ( a == 0.0f ) {
//		c = 0.0f;
//		s = ( b >= 0.0f ) ? 1.0f : -1.0f;
//	} else if ( idMath::Fabs( a ) > idMath::Fabs( b ) ) {
//		f = b / a;
//		c = idMath::Fabs( 1.0f / idMath::Sqrt( 1.0f + f * f ) );
//		if ( a < 0.0f ) {
//			c = -c;
//		}
//		s = f * c;
//	} else {
//		f = a / b;
//		s = idMath::Fabs( 1.0f / idMath::Sqrt( 1.0f + f * f ) );
//		if ( b < 0.0f ) {
//			s = -s;
//		}
//		c = f * s;
//	}
//	for ( j = i; j < numRows; j++ ) {
//		y = R[i][j];
//		w = R[i+1][j];
//		R[i][j] = c * y - s * w;
//		R[i+1][j] = s * y + c * w;
//	}
//	for ( j = 0; j < numRows; j++ ) {
//		y = (*this)[j][i];
//		w = (*this)[j][i+1];
//		(*this)[j][i] = c * y - s * w;
//		(*this)[j][i+1] = s * y + c * w;
//	}
//}
//
///*
//============
//idMatX::QR_UpdateRankOne
//
//  Updates the unpacked QR factorization to obtain the factors for the matrix: QR + alpha * v * w'
//============
//*/
//bool idMatX::QR_UpdateRankOne( idMatX &R, const idVecX &v, const idVecX &w, float alpha ) {
//	int i, k;
//	float f;
//	idVecX u;
//
//	assert( v.GetSize() >= numColumns );
//	assert( w.GetSize() >= numRows );
//
//	u.SetData( v.GetSize(), VECX_ALLOCA( v.GetSize() ) );
//	TransposeMultiply( u, v );
//	u *= alpha;
//
//	for ( k = v.GetSize()-1; k > 0; k-- ) {
//		if ( u[k] != 0.0f ) {
//			break;
//		}
//	}
//	for ( i = k-1; i >= 0; i-- ) {
//		QR_Rotate( R, i, u[i], -u[i+1] );
//		if ( u[i] == 0.0f ) {
//			u[i] = idMath::Fabs( u[i+1] );
//		} else if ( idMath::Fabs( u[i] ) > idMath::Fabs( u[i+1] ) ) {
//			f = u[i+1] / u[i];
//			u[i] = idMath::Fabs( u[i] ) * idMath::Sqrt( 1.0f + f * f );
//		} else {
//			f = u[i] / u[i+1];
//			u[i] = idMath::Fabs( u[i+1] ) * idMath::Sqrt( 1.0f + f * f );
//		}
//	}
//	for ( i = 0; i < v.GetSize(); i++ ) {
//		R[0][i] += u[0] * w[i];
//	}
//	for ( i = 0; i < k; i++ ) {
//		QR_Rotate( R, i, -R[i][i], R[i+1][i] );
//	}
//	return true;
//}
//
///*
//============
//idMatX::QR_UpdateRowColumn
//
//  Updates the unpacked QR factorization to obtain the factors for the matrix:
//
//       [ 0  a  0 ]
//  QR + [ d  b  e ]
//       [ 0  c  0 ]
//
//  where: a = v[0,r-1], b = v[r], c = v[r+1,numRows-1], d = w[0,r-1], w[r] = 0.0f, e = w[r+1,numColumns-1]
//============
//*/
//bool idMatX::QR_UpdateRowColumn( idMatX &R, const idVecX &v, const idVecX &w, int r ) {
//	idVecX s;
//
//	assert( v.GetSize() >= numColumns );
//	assert( w.GetSize() >= numRows );
//	assert( r >= 0 && r < numRows && r < numColumns );
//	assert( w[r] == 0.0f );
//
//	s.SetData( Max( numRows, numColumns ), VECX_ALLOCA( Max( numRows, numColumns ) ) );
//	s.Zero();
//	s[r] = 1.0f;
//
//	if ( !QR_UpdateRankOne( R, v, s, 1.0f ) ) {
//		return false;
//	}
//	if ( !QR_UpdateRankOne( R, s, w, 1.0f ) ) {
//		return false;
//	}
//	return true;
//}
//
///*
//============
//idMatX::QR_UpdateIncrement
//
//  Updates the unpacked QR factorization to obtain the factors for the matrix:
//
//  [ A  a ]
//  [ c  b ]
//
//  where: a = v[0,numRows-1], b = v[numRows], c = w[0,numColumns-1], w[numColumns] = 0
//============
//*/
//bool idMatX::QR_UpdateIncrement( idMatX &R, const idVecX &v, const idVecX &w ) {
//	idVecX v2;
//
//	assert( numRows == numColumns );
//	assert( v.GetSize() >= numRows+1 );
//	assert( w.GetSize() >= numColumns+1 );
//
//	ChangeSize( numRows+1, numColumns+1, true );
//	(*this)[numRows-1][numRows-1] = 1.0f;
//
//	R.ChangeSize( R.numRows+1, R.numColumns+1, true );
//	R[R.numRows-1][R.numRows-1] = 1.0f;
//
//	v2.SetData( numRows, VECX_ALLOCA( numRows ) );
//	v2 = v;
//	v2[numRows-1] -= 1.0f;
//
//	return QR_UpdateRowColumn( R, v2, w, numRows-1 );
//}
//
///*
//============
//idMatX::QR_UpdateDecrement
//
//  Updates the unpacked QR factorization to obtain the factors for the matrix with row r and column r removed.
//  v and w should store the column and row of the original matrix respectively.
//============
//*/
//bool idMatX::QR_UpdateDecrement( idMatX &R, const idVecX &v, const idVecX &w, int r ) {
//	idVecX v1, w1;
//
//	assert( numRows == numColumns );
//	assert( v.GetSize() >= numRows );
//	assert( w.GetSize() >= numColumns );
//	assert( r >= 0 && r < numRows && r < numColumns );
//
//	v1.SetData( numRows, VECX_ALLOCA( numRows ) );
//	w1.SetData( numRows, VECX_ALLOCA( numRows ) );
//
//	// update the row and column to identity
//	v1 = -v;
//	w1 = -w;
//	v1[r] += 1.0f;
//	w1[r] = 0.0f;
//
//	if ( !QR_UpdateRowColumn( R, v1, w1, r ) ) {
//		return false;
//	}
//
//	// physically remove the row and column
//	Update_Decrement( r );
//	R.Update_Decrement( r );
//
//	return true;
//}
//
///*
//============
//idMatX::QR_Solve
//
//  Solve Ax = b with A factored in-place as: QR
//============
//*/
//void idMatX::QR_Solve( idVecX &x, const idVecX &b, const idVecX &c, const idVecX &d ) const {
//	var /*int */i:number, j:number;
//	double sum, t;
//
//	assert( numRows == numColumns );
//	assert( x.GetSize() >= numRows && b.GetSize() >= numRows );
//	assert( c.GetSize() >= numRows && d.GetSize() >= numRows );
//
//	for ( i = 0; i < numRows; i++ ) {
//		x[i] = b[i];
//	}
//
//	// multiply b with transpose of Q
//	for ( i = 0; i < numRows-1; i++ ) {
//
//		sum = 0.0f;
//		for ( j = i; j < numRows; j++ ) {
//			sum += (*this)[j][i] * x[j];
//		}
//		t = sum / c[i];
//		for ( j = i; j < numRows; j++ ) {
//			x[j] -= t * (*this)[j][i];
//		}
//	}
//
//	// backsubstitution with R
//	for ( i = numRows-1; i >= 0; i-- ) {
//
//		sum = x[i];
//		for ( j = i + 1; j < numRows; j++ ) {
//			sum -= (*this)[i][j] * x[j];
//		}
//		x[i] = sum / d[i];
//	}
//}
//
///*
//============
//idMatX::QR_Solve
//
//  Solve Ax = b with A factored as: QR
//============
//*/
//void idMatX::QR_Solve( idVecX &x, const idVecX &b, const idMatX &R ) const {
//	var /*int */i:number, j:number;
//	double sum;
//
//	assert( numRows == numColumns );
//
//	// multiply b with transpose of Q
//	TransposeMultiply( x, b );
//
//	// backsubstitution with R
//	for ( i = numRows-1; i >= 0; i-- ) {
//
//		sum = x[i];
//		for ( j = i + 1; j < numRows; j++ ) {
//			sum -= R[i][j] * x[j];
//		}
//		x[i] = sum / R[i][i];
//	}
//}
//
///*
//============
//idMatX::QR_Inverse
//
//  Calculates the inverse of the matrix which is factored in-place as: QR
//============
//*/
//void idMatX::QR_Inverse( idMatX &inv, const idVecX &c, const idVecX &d ) const {
//	var /*int */i:number, j:number;
//	idVecX x, b;
//
//	assert( numRows == numColumns );
//
//	x.SetData( numRows, VECX_ALLOCA( numRows ) );
//	b.SetData( numRows, VECX_ALLOCA( numRows ) );
//	b.Zero();
//	inv.SetSize( numRows, numColumns );
//
//	for ( i = 0; i < numRows; i++ ) {
//
//		b[i] = 1.0f;
//		QR_Solve( x, b, c, d );
//		for ( j = 0; j < numRows; j++ ) {
//			inv[j][i] = x[j];
//		}
//		b[i] = 0.0f;
//	}
//}
//
///*
//============
//idMatX::QR_UnpackFactors
//
//  Unpacks the in-place QR factorization.
//============
//*/
//void idMatX::QR_UnpackFactors( idMatX &Q, idMatX &R, const idVecX &c, const idVecX &d ) const {
//	int i, j, k;
//	double sum;
//
//	Q.Identity( numRows, numColumns );
//	for ( i = 0; i < numColumns-1; i++ ) {
//		if ( c[i] == 0.0f ) {
//			continue;
//		}
//		for ( j = 0; j < numRows; j++ ) {
//			sum = 0.0f;
//			for ( k = i; k < numColumns; k++ ) {
//				sum += (*this)[k][i] * Q[j][k];
//			}
//			sum /= c[i];
//			for ( k = i; k < numColumns; k++ ) {
//				Q[j][k] -= sum * (*this)[k][i];
//			}
//		}
//	}
//
//	R.Zero( numRows, numColumns );
//	for ( i = 0; i < numRows; i++ ) {
//		R[i][i] = d[i];
//		for ( j = i+1; j < numColumns; j++ ) {
//			R[i][j] = (*this)[i][j];
//		}
//	}
//}
//
///*
//============
//idMatX::QR_MultiplyFactors
//
//  Multiplies the factors of the in-place QR factorization to form the original matrix.
//============
//*/
//void idMatX::QR_MultiplyFactors( idMatX &m, const idVecX &c, const idVecX &d ) const {
//	int i, j, k;
//	double sum;
//	idMatX Q;
//
//	Q.Identity( numRows, numColumns );
//	for ( i = 0; i < numColumns-1; i++ ) {
//		if ( c[i] == 0.0f ) {
//			continue;
//		}
//		for ( j = 0; j < numRows; j++ ) {
//			sum = 0.0f;
//			for ( k = i; k < numColumns; k++ ) {
//				sum += (*this)[k][i] * Q[j][k];
//			}
//			sum /= c[i];
//			for ( k = i; k < numColumns; k++ ) {
//				Q[j][k] -= sum * (*this)[k][i];
//			}
//		}
//	}
//
//	for ( i = 0; i < numRows; i++ ) {
//		for ( j = 0; j < numColumns; j++ ) {
//			sum = Q[i][j] * d[i];
//			for ( k = 0; k < i; k++ ) {
//				sum += Q[i][k] * (*this)[j][k];
//			}
//			m[i][j] = sum;
//		}
//	}
//}
//
///*
//============
//idMatX::Pythag
//
//  Computes (a^2 + b^2)^1/2 without underflow or overflow.
//============
//*/
//float idMatX::Pythag( float a, float b ) const {
//	double at, bt, ct;
//
//	at = idMath::Fabs( a );
//	bt = idMath::Fabs( b );
//	if ( at > bt ) {
//		ct = bt / at;
//		return at * idMath::Sqrt( 1.0f + ct * ct );
//	} else {
//		if ( bt ) {
//			ct = at / bt;
//			return bt * idMath::Sqrt( 1.0f + ct * ct );
//		} else {
//			return 0.0f;
//		}
//	}
//}
//
///*
//============
//idMatX::SVD_BiDiag
//============
//*/
//void idMatX::SVD_BiDiag( idVecX &w, idVecX &rv1, float &anorm ) {
//	int i, j, k, l;
//	double f, h, r, g, s, scale;
//
//	anorm = 0.0f;
//	g = s = scale = 0.0f;
//	for ( i = 0; i < numColumns; i++ ) {
//		l = i + 1;
//		rv1[i] = scale * g;
//		g = s = scale = 0.0f;
//		if ( i < numRows ) {
//			for ( k = i; k < numRows; k++ ) {
//				scale += idMath::Fabs( (*this)[k][i] );
//			}
//			if ( scale ) {
//				for ( k = i; k < numRows; k++ ) {
//					(*this)[k][i] /= scale;
//					s += (*this)[k][i] * (*this)[k][i];
//				}
//				f = (*this)[i][i];
//				g = idMath::Sqrt( s );
//				if ( f >= 0.0f ) {
//					g = -g;
//				}
//				h = f * g - s;
//				(*this)[i][i] = f - g;
//				if ( i != (numColumns-1) ) {
//					for ( j = l; j < numColumns; j++ ) {
//						for ( s = 0.0f, k = i; k < numRows; k++ ) {
//							s += (*this)[k][i] * (*this)[k][j];
//						}
//						f = s / h;
//						for ( k = i; k < numRows; k++ ) {
//							(*this)[k][j] += f * (*this)[k][i];
//						}
//					}
//				}
//				for ( k = i; k < numRows; k++ ) {
//					(*this)[k][i] *= scale;
//				}
//			}
//		}
//		w[i] = scale * g;
//		g = s = scale = 0.0f;
//		if ( i < numRows && i != (numColumns-1) ) {
//			for ( k = l; k < numColumns; k++ ) {
//				scale += idMath::Fabs( (*this)[i][k] );
//			}
//			if ( scale ) {
//				for ( k = l; k < numColumns; k++ ) {
//					(*this)[i][k] /= scale;
//					s += (*this)[i][k] * (*this)[i][k];
//				}
//				f = (*this)[i][l];
//				g = idMath::Sqrt( s );
//				if ( f >= 0.0f ) {
//					g = -g;
//				}
//				h = 1.0f / ( f * g - s );
//				(*this)[i][l] = f - g;
//				for ( k = l; k < numColumns; k++ ) {
//					rv1[k] = (*this)[i][k] * h;
//				}
//				if ( i != (numRows-1) ) {
//					for ( j = l; j < numRows; j++ ) {
//						for ( s = 0.0f, k = l; k < numColumns; k++ ) {
//							s += (*this)[j][k] * (*this)[i][k];
//						}
//						for ( k = l; k < numColumns; k++ ) {
//							(*this)[j][k] += s * rv1[k];
//						}
//					}
//				}
//				for ( k = l; k < numColumns; k++ ) {
//					(*this)[i][k] *= scale;
//				}
//			}
//		}
//		r = idMath::Fabs( w[i] ) + idMath::Fabs( rv1[i] );
//		if ( r > anorm ) {
//			anorm = r;
//		}
//	}
//}
//
///*
//============
//idMatX::SVD_InitialWV
//============
//*/
//void idMatX::SVD_InitialWV( idVecX &w, idMatX &V, idVecX &rv1 ) {
//	int i, j, k, l;
//	double f, g, s;
//
//	g = 0.0f;
//	for ( i = (numColumns-1); i >= 0; i-- ) {
//		l = i + 1;
//		if ( i < ( numColumns - 1 ) ) {
//			if ( g ) {
//				for ( j = l; j < numColumns; j++ ) {
//					V[j][i] = ((*this)[i][j] / (*this)[i][l]) / g;
//				}
//				// double division to reduce underflow
//				for ( j = l; j < numColumns; j++ ) {
//					for ( s = 0.0f, k = l; k < numColumns; k++ ) {
//						s += (*this)[i][k] * V[k][j];
//					}
//					for ( k = l; k < numColumns; k++ ) {
//						V[k][j] += s * V[k][i];
//					}
//				}
//			}
//			for ( j = l; j < numColumns; j++ ) {
//				V[i][j] = V[j][i] = 0.0f;
//			}
//		}
//		V[i][i] = 1.0f;
//		g = rv1[i];
//	}
//	for ( i = numColumns - 1 ; i >= 0; i-- ) {
//		l = i + 1;
//		g = w[i];
//		if ( i < (numColumns-1) ) {
//			for ( j = l; j < numColumns; j++ ) {
//				(*this)[i][j] = 0.0f;
//			}
//		}
//		if ( g ) {
//			g = 1.0f / g;
//			if ( i != (numColumns-1) ) {
//				for ( j = l; j < numColumns; j++ ) {
//					for ( s = 0.0f, k = l; k < numRows; k++ ) {
//						s += (*this)[k][i] * (*this)[k][j];
//					}
//					f = (s / (*this)[i][i]) * g;
//					for ( k = i; k < numRows; k++ ) {
//						(*this)[k][j] += f * (*this)[k][i];
//					}
//				}
//			}
//			for ( j = i; j < numRows; j++ ) {
//				(*this)[j][i] *= g;
//			}
//		}
//		else {
//			for ( j = i; j < numRows; j++ ) {
//				(*this)[j][i] = 0.0f;
//			}
//		}
//		(*this)[i][i] += 1.0f;
//	}
//}
//
///*
//============
//idMatX::SVD_Factor
//
//  in-place factorization: U * Diag(w) * V.Transpose()
//  known as the Singular Value Decomposition.
//  U is a column-orthogonal matrix which overwrites the original matrix.
//  w is a diagonal matrix with all elements >= 0 which are the singular values.
//  V is the transpose of an orthogonal matrix.
//============
//*/
//bool idMatX::SVD_Factor( idVecX &w, idMatX &V ) {
//	int flag, i, its, j, jj, k, l, nm;
//	double c, f, h, s, x, y, z, r, g = 0.0f;
//	float anorm = 0.0f;
//	idVecX rv1;
//
//	if ( numRows < numColumns ) {
//		return false;
//	}
//
//	rv1.SetData( numColumns, VECX_ALLOCA( numColumns ) );
//	rv1.Zero();
//	w.Zero( numColumns );
//	V.Zero( numColumns, numColumns );
//
//	SVD_BiDiag( w, rv1, anorm );
//	SVD_InitialWV( w, V, rv1 );
//
//	for ( k = numColumns - 1; k >= 0; k-- ) {
//		for ( its = 1; its <= 30; its++ ) {
//			flag = 1;
//			nm = 0;
//			for ( l = k; l >= 0; l-- ) {
//				nm = l - 1;
//				if ( ( idMath::Fabs( rv1[l] ) + anorm ) == anorm /* idMath::Fabs( rv1[l] ) < idMath::FLT_EPSILON */ ) {
//					flag = 0;
//					break;
//				}
//				if ( ( idMath::Fabs( w[nm] ) + anorm ) == anorm /* idMath::Fabs( w[nm] ) < idMath::FLT_EPSILON */ ) {
//					break;
//				}
//			}
//			if ( flag ) {
//				c = 0.0f;
//				s = 1.0f;
//				for ( i = l; i <= k; i++ ) {
//					f = s * rv1[i];
//
//					if ( ( idMath::Fabs( f ) + anorm ) != anorm /* idMath::Fabs( f ) > idMath::FLT_EPSILON */ ) {
//						g = w[i];
//						h = Pythag( f, g );
//						w[i] = h;
//						h = 1.0f / h;
//						c = g * h;
//						s = -f * h;
//						for ( j = 0; j < numRows; j++ ) {
//							y = (*this)[j][nm];
//							z = (*this)[j][i];
//							(*this)[j][nm] = y * c + z * s;
//							(*this)[j][i] = z * c - y * s;
//						}
//					}
//				}
//			}
//			z = w[k];
//			if ( l == k ) {
//				if ( z < 0.0f ) {
//					w[k] = -z;
//					for ( j = 0; j < numColumns; j++ ) {
//						V[j][k] = -V[j][k];
//					}
//				}
//				break;
//			}
//			if ( its == 30 ) {
//				return false;		// no convergence
//			}
//			x = w[l];
//			nm = k - 1;
//			y = w[nm];
//			g = rv1[nm];
//			h = rv1[k];
//			f = ( ( y - z ) * ( y + z ) + ( g - h ) * ( g + h ) ) / ( 2.0f * h * y );
//			g = Pythag( f, 1.0f );
//			r = ( f >= 0.0f ? g : - g );
//			f= ( ( x - z ) * ( x + z ) + h * ( ( y / ( f + r ) ) - h ) ) / x;
//			c = s = 1.0f;
//			for ( j = l; j <= nm; j++ ) {
//				i = j + 1;
//				g = rv1[i];
//				y = w[i];
//				h = s * g;
//				g = c * g;
//				z = Pythag( f, h );
//				rv1[j] = z;
//				c = f / z;
//				s = h / z;
//				f = x * c + g * s;
//				g = g * c - x * s;
//				h = y * s;
//				y = y * c;
//				for ( jj = 0; jj < numColumns; jj++ ) {
//					x = V[jj][j];
//					z = V[jj][i];
//					V[jj][j] = x * c + z * s;
//					V[jj][i] = z * c - x * s;
//				}
//				z = Pythag( f, h );
//				w[j] = z;
//				if ( z ) {
//					z = 1.0f / z;
//					c = f * z;
//					s = h * z;
//				}
//				f = ( c * g ) + ( s * y );
//				x = ( c * y ) - ( s * g );
//				for ( jj = 0; jj < numRows; jj++ ) {
//					y = (*this)[jj][j];
//					z = (*this)[jj][i];
//					(*this)[jj][j] = y * c + z * s;
//					(*this)[jj][i] = z * c - y * s;
//				}
//			}
//			rv1[l] = 0.0f;
//			rv1[k] = f;
//			w[k] = x;
//		}
//	}
//	return true;
//}
//
///*
//============
//idMatX::SVD_Solve
//
//  Solve Ax = b with A factored as: U * Diag(w) * V.Transpose()
//============
//*/
//void idMatX::SVD_Solve( idVecX &x, const idVecX &b, const idVecX &w, const idMatX &V ) const {
//	var /*int */i:number, j:number;
//	double sum;
//	idVecX tmp;
//
//	assert( x.GetSize() >= numColumns );
//	assert( b.GetSize() >= numColumns );
//	assert( w.GetSize() == numColumns );
//	assert( V.GetNumRows() == numColumns && V.GetNumColumns() == numColumns );
//
//	tmp.SetData( numColumns, VECX_ALLOCA( numColumns ) );
//
//	for ( i = 0; i < numColumns; i++ ) {
//		sum = 0.0f;
//		if ( w[i] >= idMath::FLT_EPSILON ) {
//			for ( j = 0; j < numRows; j++ ) {
//				sum += (*this)[j][i] * b[j];
//			}
//			sum /= w[i];
//		}
//		tmp[i] = sum;
//	}
//	for ( i = 0; i < numColumns; i++ ) {
//		sum = 0.0f;
//		for ( j = 0; j < numColumns; j++ ) {
//			sum += V[i][j] * tmp[j];
//		}
//		x[i] = sum;
//	}
//}
//
///*
//============
//idMatX::SVD_Inverse
//
//  Calculates the inverse of the matrix which is factored in-place as: U * Diag(w) * V.Transpose()
//============
//*/
//void idMatX::SVD_Inverse( idMatX &inv, const idVecX &w, const idMatX &V ) const {
//	int i, j, k;
//	double wi, sum;
//	idMatX V2;
//
//	assert( numRows == numColumns );
//
//	V2 = V;
//
//	// V * [diag(1/w[i])]
//	for ( i = 0; i < numRows; i++ ) {
//		wi = w[i];
//		wi = ( wi < idMath::FLT_EPSILON ) ? 0.0f : 1.0f / wi;
//		for ( j = 0; j < numColumns; j++ ) {
//			V2[j][i] *= wi;
//		}
//	}
//
//	// V * [diag(1/w[i])] * Ut
//	for ( i = 0; i < numRows; i++ ) {
//		for ( j = 0; j < numColumns; j++ ) {
//			sum = V2[i][0] * (*this)[j][0];
//			for ( k = 1; k < numColumns; k++ ) {
//				sum += V2[i][k] * (*this)[j][k];
//			}
//			inv[i][j] = sum;
//		}
//	}
//}
//
///*
//============
//idMatX::SVD_MultiplyFactors
//
//  Multiplies the factors of the in-place SVD factorization to form the original matrix.
//============
//*/
//void idMatX::SVD_MultiplyFactors( idMatX &m, const idVecX &w, const idMatX &V ) const {
//	int r, i, j;
//	double sum;
//
//	m.SetSize( numRows, V.GetNumRows() );
//
//	for ( r = 0; r < numRows; r++ ) {
//		// calculate row of matrix
//		if ( w[r] >= idMath::FLT_EPSILON ) {
//			for ( i = 0; i < V.GetNumRows(); i++ ) {
//				sum = 0.0f;
//				for ( j = 0; j < numColumns; j++ ) {
//					sum += (*this)[r][j] * V[i][j];
//				}
//				m[r][i] = sum * w[r];
//			}
//		} else {
//			for ( i = 0; i < V.GetNumRows(); i++ ) {
//				m[r][i] = 0.0f;
//			}
//		}
//	}
//}
//
///*
//============
//idMatX::Cholesky_Factor
//
//  in-place Cholesky factorization: LL'
//  L is a triangular matrix stored in the lower triangle.
//  The upper triangle is not cleared.
//  The initial matrix has to be symmetric positive definite.
//============
//*/
//bool idMatX::Cholesky_Factor( void ) {
//	int i, j, k;
//	float *invSqrt;
//	double sum;
//
//	assert( numRows == numColumns );
//
//	invSqrt = (float *) _alloca16( numRows * sizeof( float ) );
//
//	for ( i = 0; i < numRows; i++ ) {
//
//		for ( j = 0; j < i; j++ ) {
//
//			sum = (*this)[i][j];
//			for ( k = 0; k < j; k++ ) {
//				sum -= (*this)[i][k] * (*this)[j][k];
//			}
//			(*this)[i][j] = sum * invSqrt[j];
//		}
//
//		sum = (*this)[i][i];
//		for ( k = 0; k < i; k++ ) {
//			sum -= (*this)[i][k] * (*this)[i][k];
//		}
//
//		if ( sum <= 0.0f ) {
//			return false;
//		}
//
//		invSqrt[i] = idMath::InvSqrt( sum );
//		(*this)[i][i] = invSqrt[i] * sum;
//	}
//	return true;
//}
//
///*
//============
//idMatX::Cholesky_UpdateRankOne
//
//  Updates the in-place Cholesky factorization to obtain the factors for the matrix: LL' + alpha * v * v'
//  If offset > 0 only the lower right corner starting at (offset, offset) is updated.
//============
//*/
//bool idMatX::Cholesky_UpdateRankOne( const idVecX &v, float alpha, int offset ) {
//	var /*int */i:number, j:number;
//	float *y;
//	double diag, invDiag, diagSqr, newDiag, newDiagSqr, beta, p, d;
//
//	assert( numRows == numColumns );
//	assert( v.GetSize() >= numRows );
//	assert( offset >= 0 && offset < numRows );
//
//	y = (float *) _alloca16( v.GetSize() * sizeof( float ) );
//	memcpy( y, v.ToFloatPtr(), v.GetSize() * sizeof( float ) );
//
//	for ( i = offset; i < numColumns; i++ ) {
//		p = y[i];
//		diag = (*this)[i][i];
//		invDiag = 1.0f / diag;
//		diagSqr = diag * diag;
//		newDiagSqr = diagSqr + alpha * p * p;
//
//		if ( newDiagSqr <= 0.0f ) {
//			return false;
//		}
//
//		(*this)[i][i] = newDiag = idMath::Sqrt( newDiagSqr );
//
//		alpha /= newDiagSqr;
//		beta = p * alpha;
//		alpha *= diagSqr;
//
//		for ( j = i+1; j < numRows; j++ ) {
//
//			d = (*this)[j][i] * invDiag;
//
//			y[j] -= p * d;
//			d += beta * y[j];
//
//			(*this)[j][i] = d * newDiag;
//		}
//	}
//	return true;
//}
//
///*
//============
//idMatX::Cholesky_UpdateRowColumn
//
//  Updates the in-place Cholesky factorization to obtain the factors for the matrix:
//
//        [ 0  a  0 ]
//  LL' + [ a  b  c ]
//        [ 0  c  0 ]
//
//  where: a = v[0,r-1], b = v[r], c = v[r+1,numRows-1]
//============
//*/
//bool idMatX::Cholesky_UpdateRowColumn( const idVecX &v, int r ) {
//	var /*int */i:number, j:number;
//	double sum;
//	float *original, *y;
//	idVecX addSub;
//
//	assert( numRows == numColumns );
//	assert( v.GetSize() >= numRows );
//	assert( r >= 0 && r < numRows );
//
//	addSub.SetData( numColumns, (float *) _alloca16( numColumns * sizeof( float ) ) );
//
//	if ( r == 0 ) {
//
//		if ( numColumns == 1 ) {
//			double v0 = v[0];
//			sum = (*this)[0][0];
//			sum = sum * sum; 
//			sum = sum + v0; 
//			if ( sum <= 0.0f ) {
//				return false;
//			}
//			(*this)[0][0] = idMath::Sqrt( sum );
//			return true;
//		}
//		for ( i = 0; i < numColumns; i++ ) {
//			addSub[i] = v[i];
//		}
//
//	} else {
//
//		original = (float *) _alloca16( numColumns * sizeof( float ) );
//		y = (float *) _alloca16( numColumns * sizeof( float ) );
//
//		// calculate original row/column of matrix
//		for ( i = 0; i < numRows; i++ ) {
//			sum = 0.0f;
//			for ( j = 0; j <= i; j++ ) {
//				sum += (*this)[r][j] * (*this)[i][j];
//			}
//			original[i] = sum;
//		}
//
//		// solve for y in L * y = original + v
//		for ( i = 0; i < r; i++ ) {
//			sum = original[i] + v[i];
//			for ( j = 0; j < i; j++ ) {
//				sum -= (*this)[r][j] * (*this)[i][j];
//			}
//			(*this)[r][i] = sum / (*this)[i][i];
//		}
//
//		// if the last row/column of the matrix is updated
//		if ( r == numColumns - 1 ) {
//			// only calculate new diagonal
//			sum = original[r] + v[r];
//			for ( j = 0; j < r; j++) {
//				sum -= (*this)[r][j] * (*this)[r][j];
//			}
//			if ( sum <= 0.0f ) {
//				return false;
//			}
//			(*this)[r][r] = idMath::Sqrt( sum );
//			return true;
//		}
//
//		// calculate the row/column to be added to the lower right sub matrix starting at (r, r)
//		for ( i = r; i < numColumns; i++ ) {
//			sum = 0.0f;
//			for ( j = 0; j <= r; j++ ) {
//				sum += (*this)[r][j] * (*this)[i][j];
//			}
//			addSub[i] = v[i] - ( sum - original[i] );
//		}
//	}
//
//	// add row/column to the lower right sub matrix starting at (r, r)
//
//#if 0
//
//	idVecX v1, v2;
//	double d;
//
//	v1.SetData( numColumns, (float *) _alloca16( numColumns * sizeof( float ) ) );
//	v2.SetData( numColumns, (float *) _alloca16( numColumns * sizeof( float ) ) );
//
//	d = idMath::SQRT_1OVER2;
//	v1[r] = ( 0.5f * addSub[r] + 1.0f ) * d;
//	v2[r] = ( 0.5f * addSub[r] - 1.0f ) * d;
//	for ( i = r+1; i < numColumns; i++ ) {
//		v1[i] = v2[i] = addSub[i] * d;
//	}
//
//	// update
//	if ( !Cholesky_UpdateRankOne( v1, 1.0f, r ) ) {
//		return false;
//	}
//	// downdate
//	if ( !Cholesky_UpdateRankOne( v2, -1.0f, r ) ) {
//		return false;
//	}
//
//#else
//
//	float *v1, *v2;
//	double diag, invDiag, diagSqr, newDiag, newDiagSqr;
//	double alpha1, alpha2, beta1, beta2, p1, p2, d;
//
//	v1 = (float *) _alloca16( numColumns * sizeof( float ) );
//	v2 = (float *) _alloca16( numColumns * sizeof( float ) );
//
//	d = idMath::SQRT_1OVER2;
//	v1[r] = ( 0.5f * addSub[r] + 1.0f ) * d;
//	v2[r] = ( 0.5f * addSub[r] - 1.0f ) * d;
//	for ( i = r+1; i < numColumns; i++ ) {
//		v1[i] = v2[i] = addSub[i] * d;
//	}
//
//	alpha1 = 1.0f;
//	alpha2 = -1.0f;
//
//	// simultaneous update/downdate of the sub matrix starting at (r, r)
//	for ( i = r; i < numColumns; i++ ) {
//		p1 = v1[i];
//		diag = (*this)[i][i];
//		invDiag = 1.0f / diag;
//		diagSqr = diag * diag;
//		newDiagSqr = diagSqr + alpha1 * p1 * p1;
//
//		if ( newDiagSqr <= 0.0f ) {
//			return false;
//		}
//
//		alpha1 /= newDiagSqr;
//		beta1 = p1 * alpha1;
//		alpha1 *= diagSqr;
//
//		p2 = v2[i];
//		diagSqr = newDiagSqr;
//		newDiagSqr = diagSqr + alpha2 * p2 * p2;
//
//		if ( newDiagSqr <= 0.0f ) {
//			return false;
//		}
//
//		(*this)[i][i] = newDiag = idMath::Sqrt( newDiagSqr );
//
//		alpha2 /= newDiagSqr;
//		beta2 = p2 * alpha2;
//		alpha2 *= diagSqr;
//
//		for ( j = i+1; j < numRows; j++ ) {
//
//			d = (*this)[j][i] * invDiag;
//
//			v1[j] -= p1 * d;
//			d += beta1 * v1[j];
//
//			v2[j] -= p2 * d;
//			d += beta2 * v2[j];
//
//			(*this)[j][i] = d * newDiag;
//		}
//	}
//
//#endif
//
//	return true;
//}
//
///*
//============
//idMatX::Cholesky_UpdateIncrement
//
//  Updates the in-place Cholesky factorization to obtain the factors for the matrix:
//
//  [ A  a ]
//  [ a  b ]
//
//  where: a = v[0,numRows-1], b = v[numRows]
//============
//*/
//bool idMatX::Cholesky_UpdateIncrement( const idVecX &v ) {
//	var /*int */i:number, j:number;
//	float *x;
//	double sum;
//
//	assert( numRows == numColumns );
//	assert( v.GetSize() >= numRows+1 );
//
//	ChangeSize( numRows+1, numColumns+1, false );
//
//	x = (float *) _alloca16( numRows * sizeof( float ) );
//
//	// solve for x in L * x = v
//	for ( i = 0; i < numRows - 1; i++ ) {
//		sum = v[i];
//		for ( j = 0; j < i; j++ ) {
//			sum -= (*this)[i][j] * x[j];
//		}
//		x[i] = sum / (*this)[i][i];
//	}
//
//	// calculate new row of L and calculate the square of the diagonal entry
//	sum = v[numRows - 1];
//	for ( i = 0; i < numRows - 1; i++ ) {
//		(*this)[numRows - 1][i] = x[i];
//		sum -= x[i] * x[i];
//	}
//
//	if ( sum <= 0.0f ) {
//		return false;
//	}
//
//	// store the diagonal entry
//	(*this)[numRows - 1][numRows - 1] = idMath::Sqrt( sum );
//
//	return true;
//}
//
///*
//============
//idMatX::Cholesky_UpdateDecrement
//
//  Updates the in-place Cholesky factorization to obtain the factors for the matrix with row r and column r removed.
//  v should store the row of the original matrix.
//============
//*/
//bool idMatX::Cholesky_UpdateDecrement( const idVecX &v, int r ) {
//	idVecX v1;
//
//	assert( numRows == numColumns );
//	assert( v.GetSize() >= numRows );
//	assert( r >= 0 && r < numRows );
//
//	v1.SetData( numRows, VECX_ALLOCA( numRows ) );
//
//	// update the row and column to identity
//	v1 = -v;
//	v1[r] += 1.0f;
//
//	// NOTE:	msvc compiler bug: the this pointer stored in edi is expected to stay
//	//			untouched when calling Cholesky_UpdateRowColumn in the if statement
//#if 0
//	if ( !Cholesky_UpdateRowColumn( v1, r ) ) {
//#else
//	bool ret = Cholesky_UpdateRowColumn( v1, r );
//	if ( !ret ) {
//#endif
//		return false;
//	}
//
//	// physically remove the row and column
//	Update_Decrement( r );
//
//	return true;
//}
//
///*
//============
//idMatX::Cholesky_Solve
//
//  Solve Ax = b with A factored in-place as: LL'
//============
//*/
//void idMatX::Cholesky_Solve( idVecX &x, const idVecX &b ) const {
//	var /*int */i:number, j:number;
//	double sum;
//
//	assert( numRows == numColumns );
//	assert( x.GetSize() >= numRows && b.GetSize() >= numRows );
//
//	// solve L
//	for ( i = 0; i < numRows; i++ ) {
//		sum = b[i];
//		for ( j = 0; j < i; j++ ) {
//			sum -= (*this)[i][j] * x[j];
//		}
//		x[i] = sum / (*this)[i][i];
//	}
//
//	// solve Lt
//	for ( i = numRows - 1; i >= 0; i-- ) {
//		sum = x[i];
//		for ( j = i + 1; j < numRows; j++ ) {
//			sum -= (*this)[j][i] * x[j];
//		}
//		x[i] = sum / (*this)[i][i];
//	}
//}
//
///*
//============
//idMatX::Cholesky_Inverse
//
//  Calculates the inverse of the matrix which is factored in-place as: LL'
//============
//*/
//void idMatX::Cholesky_Inverse( idMatX &inv ) const {
//	var /*int */i:number, j:number;
//	idVecX x, b;
//
//	assert( numRows == numColumns );
//
//	x.SetData( numRows, VECX_ALLOCA( numRows ) );
//	b.SetData( numRows, VECX_ALLOCA( numRows ) );
//	b.Zero();
//	inv.SetSize( numRows, numColumns );
//
//	for ( i = 0; i < numRows; i++ ) {
//
//		b[i] = 1.0f;
//		Cholesky_Solve( x, b );
//		for ( j = 0; j < numRows; j++ ) {
//			inv[j][i] = x[j];
//		}
//		b[i] = 0.0f;
//	}
//}
//
///*
//============
//idMatX::Cholesky_MultiplyFactors
//
//  Multiplies the factors of the in-place Cholesky factorization to form the original matrix.
//============
//*/
//void idMatX::Cholesky_MultiplyFactors( idMatX &m ) const {
//	int r, i, j;
//	double sum;
//
//	m.SetSize( numRows, numColumns );
//
//	for ( r = 0; r < numRows; r++ ) {
//
//		// calculate row of matrix
//		for ( i = 0; i < numRows; i++ ) {
//			sum = 0.0f;
//			for ( j = 0; j <= i && j <= r; j++ ) {
//				sum += (*this)[r][j] * (*this)[i][j];
//			}
//			m[r][i] = sum;
//		}
//	}
//}
//
///*
//============
//idMatX::LDLT_Factor
//
//  in-place factorization: LDL'
//  L is a triangular matrix stored in the lower triangle.
//  L has ones on the diagonal that are not stored.
//  D is a diagonal matrix stored on the diagonal.
//  The upper triangle is not cleared.
//  The initial matrix has to be symmetric.
//============
//*/
//bool idMatX::LDLT_Factor( void ) {
//	int i, j, k;
//	float *v;
//	double d, sum;
//
//	assert( numRows == numColumns );
//
//	v = (float *) _alloca16( numRows * sizeof( float ) );
//
//	for ( i = 0; i < numRows; i++ ) {
//
//		sum = (*this)[i][i];
//		for ( j = 0; j < i; j++ ) {
//			d = (*this)[i][j];
//		    v[j] = (*this)[j][j] * d;
//		    sum -= v[j] * d;
//		}
//
//		if ( sum == 0.0f ) {
//			return false;
//		}
//
//		(*this)[i][i] = sum;
//		d = 1.0f / sum;
//
//		for ( j = i + 1; j < numRows; j++ ) {
//		    sum = (*this)[j][i];
//			for ( k = 0; k < i; k++ ) {
//				sum -= (*this)[j][k] * v[k];
//			}
//		    (*this)[j][i] = sum * d;
//		}
//	}
//
//	return true;
//}
//
///*
//============
//idMatX::LDLT_UpdateRankOne
//
//  Updates the in-place LDL' factorization to obtain the factors for the matrix: LDL' + alpha * v * v'
//  If offset > 0 only the lower right corner starting at (offset, offset) is updated.
//============
//*/
//bool idMatX::LDLT_UpdateRankOne( const idVecX &v, float alpha, int offset ) {
//	var /*int */i:number, j:number;
//	float *y;
//	double diag, newDiag, beta, p, d;
//
//	assert( numRows == numColumns );
//	assert( v.GetSize() >= numRows );
//	assert( offset >= 0 && offset < numRows );
//
//	y = (float *) _alloca16( v.GetSize() * sizeof( float ) );
//	memcpy( y, v.ToFloatPtr(), v.GetSize() * sizeof( float ) );
//
//	for ( i = offset; i < numColumns; i++ ) {
//		p = y[i];
//		diag = (*this)[i][i];
//		(*this)[i][i] = newDiag = diag + alpha * p * p;
//
//		if ( newDiag == 0.0f ) {
//			return false;
//		}
//
//		alpha /= newDiag;
//		beta = p * alpha;
//		alpha *= diag;
//
//		for ( j = i+1; j < numRows; j++ ) {
//
//			d = (*this)[j][i];
//
//			y[j] -= p * d;
//			d += beta * y[j];
//
//			(*this)[j][i] = d;
//		}
//	}
//
//	return true;
//}
//
///*
//============
//idMatX::LDLT_UpdateRowColumn
//
//  Updates the in-place LDL' factorization to obtain the factors for the matrix:
//
//         [ 0  a  0 ]
//  LDL' + [ a  b  c ]
//         [ 0  c  0 ]
//
//  where: a = v[0,r-1], b = v[r], c = v[r+1,numRows-1]
//============
//*/
//bool idMatX::LDLT_UpdateRowColumn( const idVecX &v, int r ) {
//	var /*int */i:number, j:number;
//	double sum;
//	float *original, *y;
//	idVecX addSub;
//
//	assert( numRows == numColumns );
//	assert( v.GetSize() >= numRows );
//	assert( r >= 0 && r < numRows );
//
//	addSub.SetData( numColumns, (float *) _alloca16( numColumns * sizeof( float ) ) );
//
//	if ( r == 0 ) {
//
//		if ( numColumns == 1 ) {
//			(*this)[0][0] += v[0];
//			return true;
//		}
//		for ( i = 0; i < numColumns; i++ ) {
//			addSub[i] = v[i];
//		}
//
//	} else {
//
//		original = (float *) _alloca16( numColumns * sizeof( float ) );
//		y = (float *) _alloca16( numColumns * sizeof( float ) );
//
//		// calculate original row/column of matrix
//		for ( i = 0; i < r; i++ ) {
//			y[i] = (*this)[r][i] * (*this)[i][i];
//		}
//		for ( i = 0; i < numColumns; i++ ) {
//			if ( i < r ) {
//				sum = (*this)[i][i] * (*this)[r][i];
//			} else if ( i == r ) {
//				sum = (*this)[r][r];
//			} else {
//				sum = (*this)[r][r] * (*this)[i][r];
//			}
//			for ( j = 0; j < i && j < r; j++ ) {
//				sum += (*this)[i][j] * y[j];
//			}
//			original[i] = sum;
//		}
//
//		// solve for y in L * y = original + v
//		for ( i = 0; i < r; i++ ) {
//			sum = original[i] + v[i];
//			for ( j = 0; j < i; j++ ) {
//				sum -= (*this)[i][j] * y[j];
//			}
//			y[i] = sum;
//		}
//
//		// calculate new row of L
//		for ( i = 0; i < r; i++ ) {
//			(*this)[r][i] = y[i] / (*this)[i][i];
//		}
//
//		// if the last row/column of the matrix is updated
//		if ( r == numColumns - 1 ) {
//			// only calculate new diagonal
//			sum = original[r] + v[r];
//			for ( j = 0; j < r; j++ ) {
//				sum -= (*this)[r][j] * y[j];
//			}
//			if ( sum == 0.0f ) {
//				return false;
//			}
//			(*this)[r][r] = sum;
//			return true;
//		}
//
//		// calculate the row/column to be added to the lower right sub matrix starting at (r, r)
//		for ( i = 0; i < r; i++ ) {
//			y[i] = (*this)[r][i] * (*this)[i][i];
//		}
//		for ( i = r; i < numColumns; i++ ) {
//			if ( i == r ) {
//				sum = (*this)[r][r];
//			} else {
//				sum = (*this)[r][r] * (*this)[i][r];
//			}
//			for ( j = 0; j < r; j++ ) {
//				sum += (*this)[i][j] * y[j];
//			}
//			addSub[i] = v[i] - ( sum - original[i] );
//		}
//	}
//
//	// add row/column to the lower right sub matrix starting at (r, r)
//
//#if 0
//
//	idVecX v1, v2;
//	double d;
//
//	v1.SetData( numColumns, (float *) _alloca16( numColumns * sizeof( float ) ) );
//	v2.SetData( numColumns, (float *) _alloca16( numColumns * sizeof( float ) ) );
//
//	d = idMath::SQRT_1OVER2;
//	v1[r] = ( 0.5f * addSub[r] + 1.0f ) * d;
//	v2[r] = ( 0.5f * addSub[r] - 1.0f ) * d;
//	for ( i = r+1; i < numColumns; i++ ) {
//		v1[i] = v2[i] = addSub[i] * d;
//	}
//
//	// update
//	if ( !LDLT_UpdateRankOne( v1, 1.0f, r ) ) {
//		return false;
//	}
//	// downdate
//	if ( !LDLT_UpdateRankOne( v2, -1.0f, r ) ) {
//		return false;
//	}
//
//#else
//
//	float *v1, *v2;
//	double d, diag, newDiag, p1, p2, alpha1, alpha2, beta1, beta2;
//
//	v1 = (float *) _alloca16( numColumns * sizeof( float ) );
//	v2 = (float *) _alloca16( numColumns * sizeof( float ) );
//
//	d = idMath::SQRT_1OVER2;
//	v1[r] = ( 0.5f * addSub[r] + 1.0f ) * d;
//	v2[r] = ( 0.5f * addSub[r] - 1.0f ) * d;
//	for ( i = r+1; i < numColumns; i++ ) {
//		v1[i] = v2[i] = addSub[i] * d;
//	}
//
//	alpha1 = 1.0f;
//	alpha2 = -1.0f;
//
//	// simultaneous update/downdate of the sub matrix starting at (r, r)
//	for ( i = r; i < numColumns; i++ ) {
//
//		diag = (*this)[i][i];
//		p1 = v1[i];
//		newDiag = diag + alpha1 * p1 * p1;
//
//		if ( newDiag == 0.0f ) {
//			return false;
//		}
//
//		alpha1 /= newDiag;
//		beta1 = p1 * alpha1;
//		alpha1 *= diag;
//
//		diag = newDiag;
//		p2 = v2[i];
//		newDiag = diag + alpha2 * p2 * p2;
//
//		if ( newDiag == 0.0f ) {
//			return false;
//		}
//
//		alpha2 /= newDiag;
//		beta2 = p2 * alpha2;
//		alpha2 *= diag;
//
//		(*this)[i][i] = newDiag;
//
//		for ( j = i+1; j < numRows; j++ ) {
//
//			d = (*this)[j][i];
//
//			v1[j] -= p1 * d;
//			d += beta1 * v1[j];
//
//			v2[j] -= p2 * d;
//			d += beta2 * v2[j];
//
//			(*this)[j][i] = d;
//		}
//	}
//
//#endif
//
//	return true;
//}
//
///*
//============
//idMatX::LDLT_UpdateIncrement
//
//  Updates the in-place LDL' factorization to obtain the factors for the matrix:
//
//  [ A  a ]
//  [ a  b ]
//
//  where: a = v[0,numRows-1], b = v[numRows]
//============
//*/
//bool idMatX::LDLT_UpdateIncrement( const idVecX &v ) {
//	var /*int */i:number, j:number;
//	float *x;
//	double sum, d;
//
//	assert( numRows == numColumns );
//	assert( v.GetSize() >= numRows+1 );
//
//	ChangeSize( numRows+1, numColumns+1, false );
//
//	x = (float *) _alloca16( numRows * sizeof( float ) );
//
//	// solve for x in L * x = v
//	for ( i = 0; i < numRows - 1; i++ ) {
//		sum = v[i];
//		for ( j = 0; j < i; j++ ) {
//			sum -= (*this)[i][j] * x[j];
//		}
//		x[i] = sum;
//	}
//
//	// calculate new row of L and calculate the diagonal entry
//	sum = v[numRows - 1];
//	for ( i = 0; i < numRows - 1; i++ ) {
//		(*this)[numRows - 1][i] = d = x[i] / (*this)[i][i];
//		sum -= d * x[i];
//	}
//
//	if ( sum == 0.0f ) {
//		return false;
//	}
//
//	// store the diagonal entry
//	(*this)[numRows - 1][numRows - 1] = sum;
//
//	return true;
//}
//
///*
//============
//idMatX::LDLT_UpdateDecrement
//
//  Updates the in-place LDL' factorization to obtain the factors for the matrix with row r and column r removed.
//  v should store the row of the original matrix.
//============
//*/
//bool idMatX::LDLT_UpdateDecrement( const idVecX &v, int r ) {
//	idVecX v1;
//
//	assert( numRows == numColumns );
//	assert( v.GetSize() >= numRows );
//	assert( r >= 0 && r < numRows );
//
//	v1.SetData( numRows, VECX_ALLOCA( numRows ) );
//
//	// update the row and column to identity
//	v1 = -v;
//	v1[r] += 1.0f;
//
//	// NOTE:	msvc compiler bug: the this pointer stored in edi is expected to stay
//	//			untouched when calling LDLT_UpdateRowColumn in the if statement
//#if 0
//	if ( !LDLT_UpdateRowColumn( v1, r ) ) {
//#else
//	bool ret = LDLT_UpdateRowColumn( v1, r );
//	if ( !ret ) {
//#endif
//		return false;
//	}
//
//	// physically remove the row and column
//	Update_Decrement( r );
//
//	return true;
//}
//
///*
//============
//idMatX::LDLT_Solve
//
//  Solve Ax = b with A factored in-place as: LDL'
//============
//*/
//void idMatX::LDLT_Solve( idVecX &x, const idVecX &b ) const {
//	var /*int */i:number, j:number;
//	double sum;
//
//	assert( numRows == numColumns );
//	assert( x.GetSize() >= numRows && b.GetSize() >= numRows );
//
//	// solve L
//	for ( i = 0; i < numRows; i++ ) {
//		sum = b[i];
//		for ( j = 0; j < i; j++ ) {
//			sum -= (*this)[i][j] * x[j];
//		}
//		x[i] = sum;
//	}
//
//	// solve D
//	for ( i = 0; i < numRows; i++ ) {
//		x[i] /= (*this)[i][i];
//	}
//
//	// solve Lt
//	for ( i = numRows - 2; i >= 0; i-- ) {
//		sum = x[i];
//		for ( j = i + 1; j < numRows; j++ ) {
//			sum -= (*this)[j][i] * x[j];
//		}
//		x[i] = sum;
//	}
//}
//
///*
//============
//idMatX::LDLT_Inverse
//
//  Calculates the inverse of the matrix which is factored in-place as: LDL'
//============
//*/
//void idMatX::LDLT_Inverse( idMatX &inv ) const {
//	var /*int */i:number, j:number;
//	idVecX x, b;
//
//	assert( numRows == numColumns );
//
//	x.SetData( numRows, VECX_ALLOCA( numRows ) );
//	b.SetData( numRows, VECX_ALLOCA( numRows ) );
//	b.Zero();
//	inv.SetSize( numRows, numColumns );
//
//	for ( i = 0; i < numRows; i++ ) {
//
//		b[i] = 1.0f;
//		LDLT_Solve( x, b );
//		for ( j = 0; j < numRows; j++ ) {
//			inv[j][i] = x[j];
//		}
//		b[i] = 0.0f;
//	}
//}
//
///*
//============
//idMatX::LDLT_UnpackFactors
//
//  Unpacks the in-place LDL' factorization.
//============
//*/
//void idMatX::LDLT_UnpackFactors( idMatX &L, idMatX &D ) const {
//	var /*int */i:number, j:number;
//
//	L.Zero( numRows, numColumns );
//	D.Zero( numRows, numColumns );
//	for ( i = 0; i < numRows; i++ ) {
//		for ( j = 0; j < i; j++ ) {
//			L[i][j] = (*this)[i][j];
//		}
//		L[i][i] = 1.0f;
//		D[i][i] = (*this)[i][i];
//	}
//}
//
///*
//============
//idMatX::LDLT_MultiplyFactors
//
//  Multiplies the factors of the in-place LDL' factorization to form the original matrix.
//============
//*/
//void idMatX::LDLT_MultiplyFactors( idMatX &m ) const {
//	int r, i, j;
//	float *v;
//	double sum;
//
//	v = (float *) _alloca16( numRows * sizeof( float ) );
//	m.SetSize( numRows, numColumns );
//
//	for ( r = 0; r < numRows; r++ ) {
//
//		// calculate row of matrix
//		for ( i = 0; i < r; i++ ) {
//			v[i] = (*this)[r][i] * (*this)[i][i];
//		}
//		for ( i = 0; i < numColumns; i++ ) {
//			if ( i < r ) {
//				sum = (*this)[i][i] * (*this)[r][i];
//			} else if ( i == r ) {
//				sum = (*this)[r][r];
//			} else {
//				sum = (*this)[r][r] * (*this)[i][r];
//			}
//			for ( j = 0; j < i && j < r; j++ ) {
//				sum += (*this)[i][j] * v[j];
//			}
//			m[r][i] = sum;
//		}
//	}
//}
//
///*
//============
//idMatX::TriDiagonal_ClearTriangles
//============
//*/
//void idMatX::TriDiagonal_ClearTriangles( void ) {
//	var /*int */i:number, j:number;
//
//	assert( numRows == numColumns );
//	for ( i = 0; i < numRows-2; i++ ) {
//		for ( j = i+2; j < numColumns; j++ ) {
//			(*this)[i][j] = 0.0f;
//			(*this)[j][i] = 0.0f;
//		}
//	}
//}
//
///*
//============
//idMatX::TriDiagonal_Solve
//
//  Solve Ax = b with A being tridiagonal.
//============
//*/
//bool idMatX::TriDiagonal_Solve( idVecX &x, const idVecX &b ) const {
//	var/*int*/i:number;
//	float d;
//	idVecX tmp;
//
//	assert( numRows == numColumns );
//	assert( x.GetSize() >= numRows && b.GetSize() >= numRows );
//
//	tmp.SetData( numRows, VECX_ALLOCA( numRows ) );
//
//	d = (*this)[0][0];
//	if ( d == 0.0f ) {
//		return false;
//	}
//	d = 1.0f / d;
//	x[0] = b[0] * d;
//	for ( i = 1; i < numRows; i++ ) {
//		tmp[i] = (*this)[i-1][i] * d;
//		d = (*this)[i][i] - (*this)[i][i-1] * tmp[i];
//		if ( d == 0.0f ) {
//			return false;
//		}
//		d = 1.0f / d;
//		x[i] = ( b[i] - (*this)[i][i-1] * x[i-1] ) * d;
//	}
//	for ( i = numRows - 2; i >= 0; i-- ) {
//		x[i] -= tmp[i+1] * x[i+1];
//	}
//	return true;
//}
//
///*
//============
//idMatX::TriDiagonal_Inverse
//
//  Calculates the inverse of a tri-diagonal matrix.
//============
//*/
//void idMatX::TriDiagonal_Inverse( idMatX &inv ) const {
//	var /*int */i:number, j:number;
//	idVecX x, b;
//
//	assert( numRows == numColumns );
//
//	x.SetData( numRows, VECX_ALLOCA( numRows ) );
//	b.SetData( numRows, VECX_ALLOCA( numRows ) );
//	b.Zero();
//	inv.SetSize( numRows, numColumns );
//
//	for ( i = 0; i < numRows; i++ ) {
//
//		b[i] = 1.0f;
//		TriDiagonal_Solve( x, b );
//		for ( j = 0; j < numRows; j++ ) {
//			inv[j][i] = x[j];
//		}
//		b[i] = 0.0f;
//	}
//}
//
///*
//============
//idMatX::HouseholderReduction
//
//  Householder reduction to symmetric tri-diagonal form.
//  The original matrix is replaced by an orthogonal matrix effecting the accumulated householder transformations.
//  The diagonal elements of the diagonal matrix are stored in diag.
//  The off-diagonal elements of the diagonal matrix are stored in subd.
//  The initial matrix has to be symmetric.
//============
//*/
//void idMatX::HouseholderReduction( idVecX &diag, idVecX &subd ) {
//	int i0, i1, i2, i3;
//	float h, f, g, invH, halfFdivH, scale, invScale, sum;
//
//	assert( numRows == numColumns );
//
//	diag.SetSize( numRows );
//	subd.SetSize( numRows );
//
//	for ( i0 = numRows-1, i3 = numRows-2; i0 >= 1; i0--, i3-- ) {
//		h = 0.0f;
//		scale = 0.0f;
//
//		if ( i3 > 0 ) {
//			for ( i2 = 0; i2 <= i3; i2++ ) {
//				scale += idMath::Fabs( (*this)[i0][i2] );
//			}
//			if ( scale == 0 ) {
//				subd[i0] = (*this)[i0][i3];
//			} else {
//				invScale = 1.0f / scale;
//				for (i2 = 0; i2 <= i3; i2++)
//				{
//					(*this)[i0][i2] *= invScale;
//					h += (*this)[i0][i2] * (*this)[i0][i2];
//				}
//				f = (*this)[i0][i3];
//				g = idMath::Sqrt( h );
//				if ( f > 0.0f ) {
//					g = -g;
//				}
//				subd[i0] = scale * g;
//				h -= f * g;
//				(*this)[i0][i3] = f - g;
//				f = 0.0f;
//				invH = 1.0f / h;
//				for (i1 = 0; i1 <= i3; i1++) {
//					(*this)[i1][i0] = (*this)[i0][i1] * invH;
//					g = 0.0f;
//					for (i2 = 0; i2 <= i1; i2++) {
//						g += (*this)[i1][i2] * (*this)[i0][i2];
//					}
//					for (i2 = i1+1; i2 <= i3; i2++) {
//						g += (*this)[i2][i1] * (*this)[i0][i2];
//					}
//					subd[i1] = g * invH;
//					f += subd[i1] * (*this)[i0][i1];
//				}
//				halfFdivH = 0.5f * f * invH;
//				for ( i1 = 0; i1 <= i3; i1++ ) {
//					f = (*this)[i0][i1];
//					g = subd[i1] - halfFdivH * f;
//					subd[i1] = g;
//					for ( i2 = 0; i2 <= i1; i2++ ) {
//						(*this)[i1][i2] -= f * subd[i2] + g * (*this)[i0][i2];
//					}
//				}
//            }
//		} else {
//			subd[i0] = (*this)[i0][i3];
//		}
//
//		diag[i0] = h;
//	}
//
//	diag[0] = 0.0f;
//	subd[0] = 0.0f;
//	for ( i0 = 0, i3 = -1; i0 <= numRows-1; i0++, i3++ ) {
//		if ( diag[i0] ) {
//			for ( i1 = 0; i1 <= i3; i1++ ) {
//				sum = 0.0f;
//				for (i2 = 0; i2 <= i3; i2++) {
//					sum += (*this)[i0][i2] * (*this)[i2][i1];
//				}
//				for ( i2 = 0; i2 <= i3; i2++ ) {
//					(*this)[i2][i1] -= sum * (*this)[i2][i0];
//				}
//			}
//		}
//		diag[i0] = (*this)[i0][i0];
//		(*this)[i0][i0] = 1.0f;
//		for ( i1 = 0; i1 <= i3; i1++ ) {
//			(*this)[i1][i0] = 0.0f;
//			(*this)[i0][i1] = 0.0f;
//		}
//	}
//
//	// re-order
//	for ( i0 = 1, i3 = 0; i0 < numRows; i0++, i3++ ) {
//		subd[i3] = subd[i0];
//	}
//	subd[numRows-1] = 0.0f;
//}
//
///*
//============
//idMatX::QL
//
//  QL algorithm with implicit shifts to determine the eigenvalues and eigenvectors of a symmetric tri-diagonal matrix.
//  diag contains the diagonal elements of the symmetric tri-diagonal matrix on input and is overwritten with the eigenvalues.
//  subd contains the off-diagonal elements of the symmetric tri-diagonal matrix and is destroyed.
//  This matrix has to be either the identity matrix to determine the eigenvectors for a symmetric tri-diagonal matrix,
//  or the matrix returned by the Householder reduction to determine the eigenvalues for the original symmetric matrix.
//============
//*/
//bool idMatX::QL( idVecX &diag, idVecX &subd ) {
//    const int maxIter = 32;
//	int i0, i1, i2, i3;
//	float a, b, f, g, r, p, s, c;
//
//	assert( numRows == numColumns );
//
//	for ( i0 = 0; i0 < numRows; i0++ ) {
//		for ( i1 = 0; i1 < maxIter; i1++ ) {
//			for ( i2 = i0; i2 <= numRows - 2; i2++ ) {
//				a = idMath::Fabs( diag[i2] ) + idMath::Fabs( diag[i2+1] );
//				if ( idMath::Fabs( subd[i2] ) + a == a ) {
//					break;
//				}
//			}
//			if ( i2 == i0 ) {
//				break;
//			}
//
//			g = ( diag[i0+1] - diag[i0] ) / ( 2.0f * subd[i0] );
//			r = idMath::Sqrt( g * g + 1.0f );
//			if ( g < 0.0f ) {
//				g = diag[i2] - diag[i0] + subd[i0] / ( g - r );
//			} else {
//				g = diag[i2] - diag[i0] + subd[i0] / ( g + r );
//			}
//			s = 1.0f;
//			c = 1.0f;
//			p = 0.0f;
//			for ( i3 = i2 - 1; i3 >= i0; i3-- ) {
//				f = s * subd[i3];
//				b = c * subd[i3];
//				if ( idMath::Fabs( f ) >= idMath::Fabs( g ) ) {
//					c = g / f;
//					r = idMath::Sqrt( c * c + 1.0f );
//					subd[i3+1] = f * r;
//					s = 1.0f / r;
//					c *= s;
//				} else {
//					s = f / g;
//					r = idMath::Sqrt( s * s + 1.0f );
//					subd[i3+1] = g * r;
//					c = 1.0f / r;
//					s *= c;
//				}
//				g = diag[i3+1] - p;
//				r = ( diag[i3] - g ) * s + 2.0f * b * c;
//				p = s * r;
//				diag[i3+1] = g + p;
//				g = c * r - b;
//
//				for ( int i4 = 0; i4 < numRows; i4++ ) {
//					f = (*this)[i4][i3+1];
//					(*this)[i4][i3+1] = s * (*this)[i4][i3] + c * f;
//					(*this)[i4][i3] = c * (*this)[i4][i3] - s * f;
//				}
//			}
//			diag[i0] -= p;
//			subd[i0] = g;
//			subd[i2] = 0.0f;
//		}
//		if ( i1 == maxIter ) {
//			return false;
//		}
//	}
//	return true;
//}
//
///*
//============
//idMatX::Eigen_SolveSymmetricTriDiagonal
//
//  Determine eigen values and eigen vectors for a symmetric tri-diagonal matrix.
//  The eigen values are stored in 'eigenValues'.
//  Column i of the original matrix will store the eigen vector corresponding to the eigenValues[i].
//  The initial matrix has to be symmetric tri-diagonal.
//============
//*/
//bool idMatX::Eigen_SolveSymmetricTriDiagonal( idVecX &eigenValues ) {
//	var/*int*/i:number;
//	idVecX subd;
//
//	assert( numRows == numColumns );
//
//	subd.SetData( numRows, VECX_ALLOCA( numRows ) );
//	eigenValues.SetSize( numRows );
//
//	for ( i = 0; i < numRows-1; i++ ) {
//		eigenValues[i] = (*this)[i][i];
//		subd[i] = (*this)[i+1][i];
//	}
//	eigenValues[numRows-1] = (*this)[numRows-1][numRows-1];
//
//	Identity();
//
//	return QL( eigenValues, subd );
//}
//
///*
//============
//idMatX::Eigen_SolveSymmetric
//
//  Determine eigen values and eigen vectors for a symmetric matrix.
//  The eigen values are stored in 'eigenValues'.
//  Column i of the original matrix will store the eigen vector corresponding to the eigenValues[i].
//  The initial matrix has to be symmetric.
//============
//*/
//bool idMatX::Eigen_SolveSymmetric( idVecX &eigenValues ) {
//	idVecX subd;
//
//	assert( numRows == numColumns );
//
//	subd.SetData( numRows, VECX_ALLOCA( numRows ) );
//	eigenValues.SetSize( numRows );
//
//	HouseholderReduction( eigenValues, subd );
//	return QL( eigenValues, subd );
//}
//
///*
//============
//idMatX::HessenbergReduction
//
//  Reduction to Hessenberg form.
//============
//*/
//void idMatX::HessenbergReduction( idMatX &H ) {
//	int i, j, m;
//	int low = 0;
//	int high = numRows - 1;
//	float scale, f, g, h;
//	idVecX v;
//
//	v.SetData( numRows, VECX_ALLOCA( numRows ) );
//
//	for ( m = low + 1; m <= high - 1; m++ ) {
//
//		scale = 0.0f;
//		for ( i = m; i <= high; i++ ) {
//			scale = scale + idMath::Fabs( H[i][m-1] );
//		}
//		if ( scale != 0.0f ) {
//
//			// compute Householder transformation.
//			h = 0.0f;
//			for ( i = high; i >= m; i-- ) {
//				v[i] = H[i][m-1] / scale;
//				h += v[i] * v[i];
//			}
//			g = idMath::Sqrt( h );
//			if ( v[m] > 0.0f ) {
//				g = -g;
//			}
//			h = h - v[m] * g;
//			v[m] = v[m] - g;
//
//			// apply Householder similarity transformation
//			// H = (I-u*u'/h)*H*(I-u*u')/h)
//			for ( j = m; j < numRows; j++) {
//				f = 0.0f;
//				for ( i = high; i >= m; i-- ) {
//					f += v[i] * H[i][j];
//				}
//				f = f / h;
//				for ( i = m; i <= high; i++ ) {
//					H[i][j] -= f * v[i];
//				}
//			}
//
//			for ( i = 0; i <= high; i++ ) {
//				f = 0.0f;
//				for ( j = high; j >= m; j-- ) {
//					f += v[j] * H[i][j];
//				}
//				f = f / h;
//				for ( j = m; j <= high; j++ ) {
//					H[i][j] -= f * v[j];
//				}
//			}
//			v[m] = scale * v[m];
//			H[m][m-1] = scale * g;
//		}
//	}
//
//	// accumulate transformations
//	Identity();
//	for ( int m = high - 1; m >= low + 1; m-- ) {
//		if ( H[m][m-1] != 0.0f ) {
//			for ( i = m + 1; i <= high; i++ ) {
//				v[i] = H[i][m-1];
//			}
//			for ( j = m; j <= high; j++ ) {
//				g = 0.0f;
//				for ( i = m; i <= high; i++ ) {
//					g += v[i] * (*this)[i][j];
//				}
//				// float division to avoid possible underflow
//				g = ( g / v[m] ) / H[m][m-1];
//				for ( i = m; i <= high; i++ ) {
//					(*this)[i][j] += g * v[i];
//				}
//			}
//		}
//	}
//}
//
///*
//============
//idMatX::ComplexDivision
//
//  Complex scalar division.
//============
//*/
//void idMatX::ComplexDivision( float xr, float xi, float yr, float yi, float &cdivr, float &cdivi ) {
//	float r, d;
//	if ( idMath::Fabs( yr ) > idMath::Fabs( yi ) ) {
//		r = yi / yr;
//		d = yr + r * yi;
//		cdivr = ( xr + r * xi ) / d;
//		cdivi = ( xi - r * xr ) / d;
//	} else {
//		r = yr / yi;
//		d = yi + r * yr;
//		cdivr = ( r * xr + xi ) / d;
//		cdivi = ( r * xi - xr ) / d;
//	}
//}
//
///*
//============
//idMatX::HessenbergToRealSchur
//
//  Reduction from Hessenberg to real Schur form.
//============
//*/
//bool idMatX::HessenbergToRealSchur( idMatX &H, idVecX &realEigenValues, idVecX &imaginaryEigenValues ) {
//	int i, j, k;
//	int n = numRows - 1;
//	int low = 0;
//	int high = numRows - 1;
//	float eps = 2e-16f, exshift = 0.0f;
//	float p = 0.0f, q = 0.0f, r = 0.0f, s = 0.0f, z = 0.0f, t, w, x, y;
//
//	// store roots isolated by balanc and compute matrix norm
//	float norm = 0.0f;
//	for ( i = 0; i < numRows; i++ ) {
//		if ( i < low || i > high ) {
//			realEigenValues[i] = H[i][i];
//			imaginaryEigenValues[i] = 0.0f;
//		}
//		for ( j = Max( i - 1, 0 ); j < numRows; j++ ) {
//			norm = norm + idMath::Fabs( H[i][j] );
//		}
//	}
//
//	int iter = 0;
//	while( n >= low ) {
//
//		// look for single small sub-diagonal element
//		int l = n;
//		while ( l > low ) {
//			s = idMath::Fabs( H[l-1][l-1] ) + idMath::Fabs( H[l][l] );
//			if ( s == 0.0f ) {
//				s = norm;
//			}
//			if ( idMath::Fabs( H[l][l-1] ) < eps * s ) {
//				break;
//			}
//			l--;
//		}
//	   
//		// check for convergence
//		if ( l == n ) {			// one root found
//			H[n][n] = H[n][n] + exshift;
//			realEigenValues[n] = H[n][n];
//			imaginaryEigenValues[n] = 0.0f;
//			n--;
//			iter = 0;
//		} else if ( l == n-1 ) {	// two roots found
//			w = H[n][n-1] * H[n-1][n];
//			p = ( H[n-1][n-1] - H[n][n] ) / 2.0f;
//			q = p * p + w;
//			z = idMath::Sqrt( idMath::Fabs( q ) );
//			H[n][n] = H[n][n] + exshift;
//			H[n-1][n-1] = H[n-1][n-1] + exshift;
//			x = H[n][n];
//
//			if ( q >= 0.0f ) {		// real pair
//				if ( p >= 0.0f ) {
//					z = p + z;
//				} else {
//					z = p - z;
//				}
//				realEigenValues[n-1] = x + z;
//				realEigenValues[n] = realEigenValues[n-1];
//				if ( z != 0.0f ) {
//					realEigenValues[n] = x - w / z;
//				}
//				imaginaryEigenValues[n-1] = 0.0f;
//				imaginaryEigenValues[n] = 0.0f;
//				x = H[n][n-1];
//				s = idMath::Fabs( x ) + idMath::Fabs( z );
//				p = x / s;
//				q = z / s;
//				r = idMath::Sqrt( p * p + q * q );
//				p = p / r;
//				q = q / r;
//
//				// modify row
//				for ( j = n-1; j < numRows; j++ ) {
//					z = H[n-1][j];
//					H[n-1][j] = q * z + p * H[n][j];
//					H[n][j] = q * H[n][j] - p * z;
//				}
//
//				// modify column
//				for ( i = 0; i <= n; i++ ) {
//					z = H[i][n-1];
//					H[i][n-1] = q * z + p * H[i][n];
//					H[i][n] = q * H[i][n] - p * z;
//				}
//
//				// accumulate transformations
//				for ( i = low; i <= high; i++ ) {
//					z = (*this)[i][n-1];
//					(*this)[i][n-1] = q * z + p * (*this)[i][n];
//					(*this)[i][n] = q * (*this)[i][n] - p * z;
//				}
//			} else {		// complex pair
//				realEigenValues[n-1] = x + p;
//				realEigenValues[n] = x + p;
//				imaginaryEigenValues[n-1] = z;
//				imaginaryEigenValues[n] = -z;
//			}
//			n = n - 2;
//			iter = 0;
//
//		} else {	// no convergence yet
//
//			// form shift
//			x = H[n][n];
//			y = 0.0f;
//			w = 0.0f;
//			if ( l < n ) {
//				y = H[n-1][n-1];
//				w = H[n][n-1] * H[n-1][n];
//			}
//
//			// Wilkinson's original ad hoc shift
//			if ( iter == 10 ) {
//				exshift += x;
//				for ( i = low; i <= n; i++ ) {
//					H[i][i] -= x;
//				}
//				s = idMath::Fabs( H[n][n-1] ) + idMath::Fabs( H[n-1][n-2] );
//				x = y = 0.75f * s;
//				w = -0.4375f * s * s;
//			}
//
//			// new ad hoc shift
//			if ( iter == 30 ) {
//				s = ( y - x ) / 2.0f;
//				s = s * s + w;
//				if ( s > 0 ) {
//					s = idMath::Sqrt( s );
//					if ( y < x ) {
//						s = -s;
//					}
//					s = x - w / ( ( y - x ) / 2.0f + s );
//					for ( i = low; i <= n; i++ ) {
//						H[i][i] -= s;
//					}
//					exshift += s;
//					x = y = w = 0.964f;
//				}
//			}
//
//			iter = iter + 1;
//
//			// look for two consecutive small sub-diagonal elements
//			int m;
//			for( m = n-2; m >= l; m-- ) {
//				z = H[m][m];
//				r = x - z;
//				s = y - z;
//				p = ( r * s - w ) / H[m+1][m] + H[m][m+1];
//				q = H[m+1][m+1] - z - r - s;
//				r = H[m+2][m+1];
//				s = idMath::Fabs( p ) + idMath::Fabs( q ) + idMath::Fabs( r );
//				p = p / s;
//				q = q / s;
//				r = r / s;
//				if ( m == l ) {
//					break;
//				}
//				if ( idMath::Fabs( H[m][m-1] ) * ( idMath::Fabs( q ) + idMath::Fabs( r ) ) <
//						eps * ( idMath::Fabs( p ) * ( idMath::Fabs( H[m-1][m-1] ) + idMath::Fabs( z ) + idMath::Fabs( H[m+1][m+1] ) ) ) ) {
//					break;
//				}
//			}
//
//			for ( i = m+2; i <= n; i++ ) {
//				H[i][i-2] = 0.0f;
//				if ( i > m+2 ) {
//					H[i][i-3] = 0.0f;
//				}
//			}
//
//			// double QR step involving rows l:n and columns m:n
//			for ( k = m; k <= n-1; k++ ) {
//				bool notlast = ( k != n-1 );
//				if ( k != m ) {
//					p = H[k][k-1];
//					q = H[k+1][k-1];
//					r = ( notlast ? H[k+2][k-1] : 0.0f );
//					x = idMath::Fabs( p ) + idMath::Fabs( q ) + idMath::Fabs( r );
//					if ( x != 0.0f ) {
//						p = p / x;
//						q = q / x;
//						r = r / x;
//					}
//				}
//				if ( x == 0.0f ) {
//					break;
//				}
//				s = idMath::Sqrt( p * p + q * q + r * r );
//				if ( p < 0.0f ) {
//					s = -s;
//				}
//				if ( s != 0.0f ) {
//					if ( k != m ) {
//						H[k][k-1] = -s * x;
//					} else if ( l != m ) {
//						H[k][k-1] = -H[k][k-1];
//					}
//					p = p + s;
//					x = p / s;
//					y = q / s;
//					z = r / s;
//					q = q / p;
//					r = r / p;
//
//					// modify row
//					for ( j = k; j < numRows; j++ ) {
//						p = H[k][j] + q * H[k+1][j];
//						if ( notlast ) {
//							p = p + r * H[k+2][j];
//							H[k+2][j] = H[k+2][j] - p * z;
//						}
//						H[k][j] = H[k][j] - p * x;
//						H[k+1][j] = H[k+1][j] - p * y;
//					}
//
//					// modify column
//					for ( i = 0; i <= Min( n, k + 3 ); i++ ) {
//						p = x * H[i][k] + y * H[i][k+1];
//						if ( notlast ) {
//							p = p + z * H[i][k+2];
//							H[i][k+2] = H[i][k+2] - p * r;
//						}
//						H[i][k] = H[i][k] - p;
//						H[i][k+1] = H[i][k+1] - p * q;
//					}
//
//					// accumulate transformations
//					for ( i = low; i <= high; i++ ) {
//						p = x * (*this)[i][k] + y * (*this)[i][k+1];
//						if ( notlast ) {
//							p = p + z * (*this)[i][k+2];
//							(*this)[i][k+2] = (*this)[i][k+2] - p * r;
//						}
//						(*this)[i][k] = (*this)[i][k] - p;
//						(*this)[i][k+1] = (*this)[i][k+1] - p * q;
//					}
//				}
//			}
//		}
//	}
//	
//	// backsubstitute to find vectors of upper triangular form
//	if ( norm == 0.0f ) {
//		return false;
//	}
//
//	for ( n = numRows-1; n >= 0; n-- ) {
//		p = realEigenValues[n];
//		q = imaginaryEigenValues[n];
//
//		if ( q == 0.0f ) {		// real vector
//			int l = n;
//			H[n][n] = 1.0f;
//			for ( i = n-1; i >= 0; i-- ) {
//				w = H[i][i] - p;
//				r = 0.0f;
//				for ( j = l; j <= n; j++ ) {
//					r = r + H[i][j] * H[j][n];
//				}
//				if ( imaginaryEigenValues[i] < 0.0f ) {
//					z = w;
//					s = r;
//				} else {
//					l = i;
//					if ( imaginaryEigenValues[i] == 0.0f ) {
//						if ( w != 0.0f ) {
//							H[i][n] = -r / w;
//						} else {
//							H[i][n] = -r / ( eps * norm );
//						}
//					} else {		// solve real equations
//						x = H[i][i+1];
//						y = H[i+1][i];
//						q = ( realEigenValues[i] - p ) * ( realEigenValues[i] - p ) + imaginaryEigenValues[i] * imaginaryEigenValues[i];
//						t = ( x * s - z * r ) / q;
//						H[i][n] = t;
//						if ( idMath::Fabs(x) > idMath::Fabs( z ) ) {
//							H[i+1][n] = ( -r - w * t ) / x;
//						} else {
//							H[i+1][n] = ( -s - y * t ) / z;
//						}
//					}
//
//					// overflow control
//					t = idMath::Fabs(H[i][n]);
//					if ( ( eps * t ) * t > 1 ) {
//						for ( j = i; j <= n; j++ ) {
//							H[j][n] = H[j][n] / t;
//						}
//					}
//				}
//			}
//		} else if ( q < 0.0f ) {	// complex vector
//			int l = n-1;
//
//			// last vector component imaginary so matrix is triangular
//			if ( idMath::Fabs( H[n][n-1] ) > idMath::Fabs( H[n-1][n] ) ) {
//				H[n-1][n-1] = q / H[n][n-1];
//				H[n-1][n] = -( H[n][n] - p ) / H[n][n-1];
//			} else {
//				ComplexDivision( 0.0f, -H[n-1][n], H[n-1][n-1]-p, q, H[n-1][n-1], H[n-1][n] );
//			}
//			H[n][n-1] = 0.0f;
//			H[n][n] = 1.0f;
//			for ( i = n-2; i >= 0; i-- ) {
//				float ra, sa, vr, vi;
//				ra = 0.0f;
//				sa = 0.0f;
//				for ( j = l; j <= n; j++ ) {
//					ra = ra + H[i][j] * H[j][n-1];
//					sa = sa + H[i][j] * H[j][n];
//				}
//				w = H[i][i] - p;
//
//				if ( imaginaryEigenValues[i] < 0.0f ) {
//					z = w;
//					r = ra;
//					s = sa;
//				} else {
//					l = i;
//					if ( imaginaryEigenValues[i] == 0.0f ) {
//						ComplexDivision( -ra, -sa, w, q, H[i][n-1], H[i][n] );
//					} else {
//						// solve complex equations
//						x = H[i][i+1];
//						y = H[i+1][i];
//						vr = ( realEigenValues[i] - p ) * ( realEigenValues[i] - p ) + imaginaryEigenValues[i] * imaginaryEigenValues[i] - q * q;
//						vi = ( realEigenValues[i] - p ) * 2.0f * q;
//						if ( vr == 0.0f && vi == 0.0f ) {
//							vr = eps * norm * ( idMath::Fabs( w ) + idMath::Fabs( q ) + idMath::Fabs( x ) + idMath::Fabs( y ) + idMath::Fabs( z ) );
//						}
//						ComplexDivision( x * r - z * ra + q * sa, x * s - z * sa - q * ra, vr, vi, H[i][n-1], H[i][n] );
//						if ( idMath::Fabs( x ) > ( idMath::Fabs( z ) + idMath::Fabs( q ) ) ) {
//							H[i+1][n-1] = ( -ra - w * H[i][n-1] + q * H[i][n] ) / x;
//							H[i+1][n] = ( -sa - w * H[i][n] - q * H[i][n-1] ) / x;
//						} else {
//							ComplexDivision( -r - y * H[i][n-1], -s - y * H[i][n], z, q, H[i+1][n-1], H[i+1][n] );
//						}
//					}
//
//					// overflow control
//					t = Max( idMath::Fabs( H[i][n-1] ), idMath::Fabs( H[i][n] ) );
//					if ( ( eps * t ) * t > 1 ) {
//						for ( j = i; j <= n; j++ ) {
//							H[j][n-1] = H[j][n-1] / t;
//							H[j][n] = H[j][n] / t;
//						}
//					}
//				}
//			}
//		}
//	}
//
//	// vectors of isolated roots
//	for ( i = 0; i < numRows; i++ ) {
//		if ( i < low || i > high ) {
//			for ( j = i; j < numRows; j++ ) {
//				(*this)[i][j] = H[i][j];
//			}
//		}
//	}
//
//	// back transformation to get eigenvectors of original matrix
//	for ( j = numRows - 1; j >= low; j-- ) {
//		for ( i = low; i <= high; i++ ) {
//			z = 0.0f;
//			for ( k = low; k <= Min( j, high ); k++ ) {
//				z = z + (*this)[i][k] * H[k][j];
//			}
//			(*this)[i][j] = z;
//		}
//	}
//
//	return true;
//}
//
///*
//============
//idMatX::Eigen_Solve
//
//  Determine eigen values and eigen vectors for a square matrix.
//  The eigen values are stored in 'realEigenValues' and 'imaginaryEigenValues'.
//  Column i of the original matrix will store the eigen vector corresponding to the realEigenValues[i] and imaginaryEigenValues[i].
//============
//*/
//bool idMatX::Eigen_Solve( idVecX &realEigenValues, idVecX &imaginaryEigenValues ) {
//    idMatX H;
//
//	assert( numRows == numColumns );
//
//	realEigenValues.SetSize( numRows );
//	imaginaryEigenValues.SetSize( numRows );
//
//	H = *this;
//
//    // reduce to Hessenberg form
//    HessenbergReduction( H );
//
//    // reduce Hessenberg to real Schur form
//    return HessenbergToRealSchur( H, realEigenValues, imaginaryEigenValues );
//}
//
///*
//============
//idMatX::Eigen_SortIncreasing
//============
//*/
//void idMatX::Eigen_SortIncreasing( idVecX &eigenValues ) {
//	int i, j, k;
//	float min;
//
//	for ( i = 0, j; i <= numRows - 2; i++ ) {
//		j = i;
//		min = eigenValues[j];
//		for ( k = i + 1; k < numRows; k++ ) {
//			if ( eigenValues[k] < min ) {
//				j = k;
//				min = eigenValues[j];
//			}
//		}
//		if ( j != i ) {
//			eigenValues.SwapElements( i, j );
//			SwapColumns( i, j );
//		}
//	}
//}
//
///*
//============
//idMatX::Eigen_SortDecreasing
//============
//*/
//void idMatX::Eigen_SortDecreasing( idVecX &eigenValues ) {
//	int i, j, k;
//	float max;
//
//	for ( i = 0, j; i <= numRows - 2; i++ ) {
//		j = i;
//		max = eigenValues[j];
//		for ( k = i + 1; k < numRows; k++ ) {
//			if ( eigenValues[k] > max ) {
//				j = k;
//				max = eigenValues[j];
//			}
//		}
//		if ( j != i ) {
//			eigenValues.SwapElements( i, j );
//			SwapColumns( i, j );
//		}
//	}
//}
//
///*
//============
//idMatX::DeterminantGeneric
//============
//*/
//float idMatX::DeterminantGeneric( void ) const {
//	int *index;
//	float det;
//	idMatX tmp;
//
//	index = (int *) _alloca16( numRows * sizeof( int ) );
//	tmp.SetData( numRows, numColumns, MATX_ALLOCA( numRows * numColumns ) );
//	tmp = *this;
//
//	if ( !tmp.LU_Factor( index, &det ) ) {
//		return 0.0f;
//	}
//
//	return det;
//}
//
///*
//============
//idMatX::InverseSelfGeneric
//============
//*/
//bool idMatX::InverseSelfGeneric( void ) {
//	int i, j, *index;
//	idMatX tmp;
//	idVecX x, b;
//
//	index = (int *) _alloca16( numRows * sizeof( int ) );
//	tmp.SetData( numRows, numColumns, MATX_ALLOCA( numRows * numColumns ) );
//	tmp = *this;
//
//	if ( !tmp.LU_Factor( index ) ) {
//		return false;
//	}
//
//	x.SetData( numRows, VECX_ALLOCA( numRows ) );
//	b.SetData( numRows, VECX_ALLOCA( numRows ) );
//	b.Zero();
//
//	for ( i = 0; i < numRows; i++ ) {
//
//		b[i] = 1.0f;
//		tmp.LU_Solve( x, b, index );
//		for ( j = 0; j < numRows; j++ ) {
//			(*this)[j][i] = x[j];
//		}
//		b[i] = 0.0f;
//	}
//	return true;
//}
//
///*
//============
//idMatX::Test
//============
//*/
//void idMatX::Test( void ) {
//	idMatX original, m1, m2, m3, q1, q2, r1, r2;
//	idVecX v, w, u, c, d;
//	int offset, size, *index1, *index2;
//
//	size = 6;
//	original.Random( size, size, 0 );
//	original = original * original.Transpose();
//
//	index1 = (int *) _alloca16( ( size + 1 ) * sizeof( index1[0] ) );
//	index2 = (int *) _alloca16( ( size + 1 ) * sizeof( index2[0] ) );
//
//	/*
//		idMatX::LowerTriangularInverse
//	*/
//
//	m1 = original;
//	m1.ClearUpperTriangle();
//	m2 = m1;
//
//	m2.InverseSelf();
//	m1.LowerTriangularInverse();
//
//	if ( !m1.Compare( m2, 1e-4f ) ) {
//		idLib::common->Warning( "idMatX::LowerTriangularInverse failed" );
//	}
//
//	/*
//		idMatX::UpperTriangularInverse
//	*/
//
//	m1 = original;
//	m1.ClearLowerTriangle();
//	m2 = m1;
//
//	m2.InverseSelf();
//	m1.UpperTriangularInverse();
//
//	if ( !m1.Compare( m2, 1e-4f ) ) {
//		idLib::common->Warning( "idMatX::UpperTriangularInverse failed" );
//	}
//
//	/*
//		idMatX::Inverse_GaussJordan
//	*/
//
//	m1 = original;
//
//	m1.Inverse_GaussJordan();
//	m1 *= original;
//
//	if ( !m1.IsIdentity( 1e-4f ) ) {
//		idLib::common->Warning( "idMatX::Inverse_GaussJordan failed" );
//	}
//
//	/*
//		idMatX::Inverse_UpdateRankOne
//	*/
//
//	m1 = original;
//	m2 = original;
//
//	w.Random( size, 1 );
//	v.Random( size, 2 );
//
//	// invert m1
//	m1.Inverse_GaussJordan();
//
//	// modify and invert m2 
//	m2.Update_RankOne( v, w, 1.0f );
//	if ( !m2.Inverse_GaussJordan() ) {
//		assert( 0 );
//	}
//
//	// update inverse of m1
//	m1.Inverse_UpdateRankOne( v, w, 1.0f );
//
//	if ( !m1.Compare( m2, 1e-4f ) ) {
//		idLib::common->Warning( "idMatX::Inverse_UpdateRankOne failed" );
//	}
//
//	/*
//		idMatX::Inverse_UpdateRowColumn
//	*/
//
//	for ( offset = 0; offset < size; offset++ ) {
//		m1 = original;
//		m2 = original;
//
//		v.Random( size, 1 );
//		w.Random( size, 2 );
//		w[offset] = 0.0f;
//
//		// invert m1
//		m1.Inverse_GaussJordan();
//
//		// modify and invert m2
//		m2.Update_RowColumn( v, w, offset );
//		if ( !m2.Inverse_GaussJordan() ) {
//			assert( 0 );
//		}
//
//		// update inverse of m1
//		m1.Inverse_UpdateRowColumn( v, w, offset );
//
//		if ( !m1.Compare( m2, 1e-3f ) ) {
//			idLib::common->Warning( "idMatX::Inverse_UpdateRowColumn failed" );
//		}
//	}
//
//	/*
//		idMatX::Inverse_UpdateIncrement
//	*/
//
//	m1 = original;
//	m2 = original;
//
//	v.Random( size + 1, 1 );
//	w.Random( size + 1, 2 );
//	w[size] = 0.0f;
//
//	// invert m1
//	m1.Inverse_GaussJordan();
//
//	// modify and invert m2 
//	m2.Update_Increment( v, w );
//	if ( !m2.Inverse_GaussJordan() ) {
//		assert( 0 );
//	}
//
//	// update inverse of m1
//	m1.Inverse_UpdateIncrement( v, w );
//
//	if ( !m1.Compare( m2, 1e-4f ) ) {
//		idLib::common->Warning( "idMatX::Inverse_UpdateIncrement failed" );
//	}
//
//	/*
//		idMatX::Inverse_UpdateDecrement
//	*/
//
//	for ( offset = 0; offset < size; offset++ ) {
//		m1 = original;
//		m2 = original;
//
//		v.SetSize( 6 );
//		w.SetSize( 6 );
//		for ( int i = 0; i < size; i++ ) {
//			v[i] = original[i][offset];
//			w[i] = original[offset][i];
//		}
//
//		// invert m1
//		m1.Inverse_GaussJordan();
//
//		// modify and invert m2
//		m2.Update_Decrement( offset );
//		if ( !m2.Inverse_GaussJordan() ) {
//			assert( 0 );
//		}
//
//		// update inverse of m1
//		m1.Inverse_UpdateDecrement( v, w, offset );
//
//		if ( !m1.Compare( m2, 1e-3f ) ) {
//			idLib::common->Warning( "idMatX::Inverse_UpdateDecrement failed" );
//		}
//	}
//
//	/*
//		idMatX::LU_Factor
//	*/
//
//	m1 = original;
//
//	m1.LU_Factor( NULL );	// no pivoting
//	m1.LU_UnpackFactors( m2, m3 );
//	m1 = m2 * m3;
//
//	if ( !original.Compare( m1, 1e-4f ) ) {
//		idLib::common->Warning( "idMatX::LU_Factor failed" );
//	}
//
//	/*
//		idMatX::LU_UpdateRankOne
//	*/
//
//	m1 = original;
//	m2 = original;
//
//	w.Random( size, 1 );
//	v.Random( size, 2 );
//
//	// factor m1
//	m1.LU_Factor( index1 );
//
//	// modify and factor m2 
//	m2.Update_RankOne( v, w, 1.0f );
//	if ( !m2.LU_Factor( index2 ) ) {
//		assert( 0 );
//	}
//	m2.LU_MultiplyFactors( m3, index2 );
//	m2 = m3;
//
//	// update factored m1
//	m1.LU_UpdateRankOne( v, w, 1.0f, index1 );
//	m1.LU_MultiplyFactors( m3, index1 );
//	m1 = m3;
//
//	if ( !m1.Compare( m2, 1e-4f ) ) {
//		idLib::common->Warning( "idMatX::LU_UpdateRankOne failed" );
//	}
//
//	/*
//		idMatX::LU_UpdateRowColumn
//	*/
//
//	for ( offset = 0; offset < size; offset++ ) {
//		m1 = original;
//		m2 = original;
//
//		v.Random( size, 1 );
//		w.Random( size, 2 );
//		w[offset] = 0.0f;
//
//		// factor m1
//		m1.LU_Factor( index1 );
//
//		// modify and factor m2
//		m2.Update_RowColumn( v, w, offset );
//		if ( !m2.LU_Factor( index2 ) ) {
//			assert( 0 );
//		}
//		m2.LU_MultiplyFactors( m3, index2 );
//		m2 = m3;
//
//		// update m1
//		m1.LU_UpdateRowColumn( v, w, offset, index1  );
//		m1.LU_MultiplyFactors( m3, index1 );
//		m1 = m3;
//
//		if ( !m1.Compare( m2, 1e-3f ) ) {
//			idLib::common->Warning( "idMatX::LU_UpdateRowColumn failed" );
//		}
//	}
//
//	/*
//		idMatX::LU_UpdateIncrement
//	*/
//
//	m1 = original;
//	m2 = original;
//
//	v.Random( size + 1, 1 );
//	w.Random( size + 1, 2 );
//	w[size] = 0.0f;
//
//	// factor m1
//	m1.LU_Factor( index1 );
//
//	// modify and factor m2 
//	m2.Update_Increment( v, w );
//	if ( !m2.LU_Factor( index2 ) ) {
//		assert( 0 );
//	}
//	m2.LU_MultiplyFactors( m3, index2 );
//	m2 = m3;
//
//	// update factored m1
//	m1.LU_UpdateIncrement( v, w, index1 );
//	m1.LU_MultiplyFactors( m3, index1 );
//	m1 = m3;
//
//	if ( !m1.Compare( m2, 1e-4f ) ) {
//		idLib::common->Warning( "idMatX::LU_UpdateIncrement failed" );
//	}
//
//	/*
//		idMatX::LU_UpdateDecrement
//	*/
//
//	for ( offset = 0; offset < size; offset++ ) {
//		m1 = original;
//		m2 = original;
//
//		v.SetSize( 6 );
//		w.SetSize( 6 );
//		for ( int i = 0; i < size; i++ ) {
//			v[i] = original[i][offset];
//			w[i] = original[offset][i];
//		}
//
//		// factor m1
//		m1.LU_Factor( index1 );
//
//		// modify and factor m2
//		m2.Update_Decrement( offset );
//		if ( !m2.LU_Factor( index2 ) ) {
//			assert( 0 );
//		}
//		m2.LU_MultiplyFactors( m3, index2 );
//		m2 = m3;
//
//		u.SetSize( 6 );
//		for ( int i = 0; i < size; i++ ) {
//			u[i] = original[index1[offset]][i];
//		}
//
//		// update factors of m1
//		m1.LU_UpdateDecrement( v, w, u, offset, index1 );
//		m1.LU_MultiplyFactors( m3, index1 );
//		m1 = m3;
//
//		if ( !m1.Compare( m2, 1e-3f ) ) {
//			idLib::common->Warning( "idMatX::LU_UpdateDecrement failed" );
//		}
//	}
//
//	/*
//		idMatX::LU_Inverse
//	*/
//
//	m2 = original;
//
//	m2.LU_Factor( NULL );
//	m2.LU_Inverse( m1, NULL );
//	m1 *= original;
//
//	if ( !m1.IsIdentity( 1e-4f ) ) {
//		idLib::common->Warning( "idMatX::LU_Inverse failed" );
//	}
//
//	/*
//		idMatX::QR_Factor
//	*/
//
//	c.SetSize( size );
//	d.SetSize( size );
//
//	m1 = original;
//
//	m1.QR_Factor( c, d );
//	m1.QR_UnpackFactors( q1, r1, c, d );
//	m1 = q1 * r1;
//
//	if ( !original.Compare( m1, 1e-4f ) ) {
//		idLib::common->Warning( "idMatX::QR_Factor failed" );
//	}
//
//	/*
//		idMatX::QR_UpdateRankOne
//	*/
//
//	c.SetSize( size );
//	d.SetSize( size );
//
//	m1 = original;
//	m2 = original;
//
//	w.Random( size, 0 );
//	v = w;
//
//	// factor m1
//	m1.QR_Factor( c, d );
//	m1.QR_UnpackFactors( q1, r1, c, d );
//
//	// modify and factor m2 
//	m2.Update_RankOne( v, w, 1.0f );
//	if ( !m2.QR_Factor( c, d ) ) {
//		assert( 0 );
//	}
//	m2.QR_UnpackFactors( q2, r2, c, d );
//	m2 = q2 * r2;
//
//	// update factored m1
//	q1.QR_UpdateRankOne( r1, v, w, 1.0f );
//	m1 = q1 * r1;
//
//	if ( !m1.Compare( m2, 1e-4f ) ) {
//		idLib::common->Warning( "idMatX::QR_UpdateRankOne failed" );
//	}
//
//	/*
//		idMatX::QR_UpdateRowColumn
//	*/
//
//	for ( offset = 0; offset < size; offset++ ) {
//		c.SetSize( size );
//		d.SetSize( size );
//
//		m1 = original;
//		m2 = original;
//
//		v.Random( size, 1 );
//		w.Random( size, 2 );
//		w[offset] = 0.0f;
//
//		// factor m1
//		m1.QR_Factor( c, d );
//		m1.QR_UnpackFactors( q1, r1, c, d );
//
//		// modify and factor m2
//		m2.Update_RowColumn( v, w, offset );
//		if ( !m2.QR_Factor( c, d ) ) {
//			assert( 0 );
//		}
//		m2.QR_UnpackFactors( q2, r2, c, d );
//		m2 = q2 * r2;
//
//		// update m1
//		q1.QR_UpdateRowColumn( r1, v, w, offset );
//		m1 = q1 * r1;
//
//		if ( !m1.Compare( m2, 1e-3f ) ) {
//			idLib::common->Warning( "idMatX::QR_UpdateRowColumn failed" );
//		}
//	}
//
//	/*
//		idMatX::QR_UpdateIncrement
//	*/
//
//	c.SetSize( size+1 );
//	d.SetSize( size+1 );
//
//	m1 = original;
//	m2 = original;
//
//	v.Random( size + 1, 1 );
//	w.Random( size + 1, 2 );
//	w[size] = 0.0f;
//
//	// factor m1
//	m1.QR_Factor( c, d );
//	m1.QR_UnpackFactors( q1, r1, c, d );
//
//	// modify and factor m2 
//	m2.Update_Increment( v, w );
//	if ( !m2.QR_Factor( c, d ) ) {
//		assert( 0 );
//	}
//	m2.QR_UnpackFactors( q2, r2, c, d );
//	m2 = q2 * r2;
//
//	// update factored m1
//	q1.QR_UpdateIncrement( r1, v, w );
//	m1 = q1 * r1;
//
//	if ( !m1.Compare( m2, 1e-4f ) ) {
//		idLib::common->Warning( "idMatX::QR_UpdateIncrement failed" );
//	}
//
//	/*
//		idMatX::QR_UpdateDecrement
//	*/
//
//	for ( offset = 0; offset < size; offset++ ) {
//		c.SetSize( size+1 );
//		d.SetSize( size+1 );
//
//		m1 = original;
//		m2 = original;
//
//		v.SetSize( 6 );
//		w.SetSize( 6 );
//		for ( int i = 0; i < size; i++ ) {
//			v[i] = original[i][offset];
//			w[i] = original[offset][i];
//		}
//
//		// factor m1
//		m1.QR_Factor( c, d );
//		m1.QR_UnpackFactors( q1, r1, c, d );
//
//		// modify and factor m2
//		m2.Update_Decrement( offset );
//		if ( !m2.QR_Factor( c, d ) ) {
//			assert( 0 );
//		}
//		m2.QR_UnpackFactors( q2, r2, c, d );
//		m2 = q2 * r2;
//
//		// update factors of m1
//		q1.QR_UpdateDecrement( r1, v, w, offset );
//		m1 = q1 * r1;
//
//		if ( !m1.Compare( m2, 1e-3f ) ) {
//			idLib::common->Warning( "idMatX::QR_UpdateDecrement failed" );
//		}
//	}
//
//	/*
//		idMatX::QR_Inverse
//	*/
//
//	m2 = original;
//
//	m2.QR_Factor( c, d );
//	m2.QR_Inverse( m1, c, d );
//	m1 *= original;
//
//	if ( !m1.IsIdentity( 1e-4f ) ) {
//		idLib::common->Warning( "idMatX::QR_Inverse failed" );
//	}
//
//	/*
//		idMatX::SVD_Factor
//	*/
//
//	m1 = original;
//	m3.Zero( size, size );
//	w.Zero( size );
//
//	m1.SVD_Factor( w, m3 );
//	m2.Diag( w );
//	m3.TransposeSelf();
//	m1 = m1 * m2 * m3;
//
//	if ( !original.Compare( m1, 1e-4f ) ) {
//		idLib::common->Warning( "idMatX::SVD_Factor failed" );
//	}
//
//	/*
//		idMatX::SVD_Inverse
//	*/
//
//	m2 = original;
//
//	m2.SVD_Factor( w, m3 );
//	m2.SVD_Inverse( m1, w, m3 );
//	m1 *= original;
//
//	if ( !m1.IsIdentity( 1e-4f ) ) {
//		idLib::common->Warning( "idMatX::SVD_Inverse failed" );
//	}
//
//	/*
//		idMatX::Cholesky_Factor
//	*/
//
//	m1 = original;
//
//	m1.Cholesky_Factor();
//	m1.Cholesky_MultiplyFactors( m2 );
//
//	if ( !original.Compare( m2, 1e-4f ) ) {
//		idLib::common->Warning( "idMatX::Cholesky_Factor failed" );
//	}
//
//	/*
//		idMatX::Cholesky_UpdateRankOne
//	*/
//
//	m1 = original;
//	m2 = original;
//
//	w.Random( size, 0 );
//
//	// factor m1
//	m1.Cholesky_Factor();
//	m1.ClearUpperTriangle();
//
//	// modify and factor m2 
//	m2.Update_RankOneSymmetric( w, 1.0f );
//	if ( !m2.Cholesky_Factor() ) {
//		assert( 0 );
//	}
//	m2.ClearUpperTriangle();
//
//	// update factored m1
//	m1.Cholesky_UpdateRankOne( w, 1.0f, 0 );
//
//	if ( !m1.Compare( m2, 1e-4f ) ) {
//		idLib::common->Warning( "idMatX::Cholesky_UpdateRankOne failed" );
//	}
//
//	/*
//		idMatX::Cholesky_UpdateRowColumn
//	*/
//
//	for ( offset = 0; offset < size; offset++ ) {
//		m1 = original;
//		m2 = original;
//
//		// factor m1
//		m1.Cholesky_Factor();
//		m1.ClearUpperTriangle();
//
//		int pdtable[] = { 1, 0, 1, 0, 0, 0 };
//		w.Random( size, pdtable[offset] );
//		w *= 0.1f;
//
//		// modify and factor m2
//		m2.Update_RowColumnSymmetric( w, offset );
//		if ( !m2.Cholesky_Factor() ) {
//			assert( 0 );
//		}
//		m2.ClearUpperTriangle();
//
//		// update m1
//		m1.Cholesky_UpdateRowColumn( w, offset );
//
//		if ( !m1.Compare( m2, 1e-3f ) ) {
//			idLib::common->Warning( "idMatX::Cholesky_UpdateRowColumn failed" );
//		}
//	}
//
//	/*
//		idMatX::Cholesky_UpdateIncrement
//	*/
//
//	m1.Random( size + 1, size + 1, 0 );
//	m3 = m1 * m1.Transpose();
//
//	m1.SquareSubMatrix( m3, size );
//	m2 = m1;
//
//	w.SetSize( size + 1 );
//	for ( int i = 0; i < size + 1; i++ ) {
//		w[i] = m3[size][i];
//	}
//
//	// factor m1
//	m1.Cholesky_Factor();
//
//	// modify and factor m2 
//	m2.Update_IncrementSymmetric( w );
//	if ( !m2.Cholesky_Factor() ) {
//		assert( 0 );
//	}
//
//	// update factored m1
//	m1.Cholesky_UpdateIncrement( w );
//
//	m1.ClearUpperTriangle();
//	m2.ClearUpperTriangle();
//
//	if ( !m1.Compare( m2, 1e-4f ) ) {
//		idLib::common->Warning( "idMatX::Cholesky_UpdateIncrement failed" );
//	}
//
//	/*
//		idMatX::Cholesky_UpdateDecrement
//	*/
//
//	for ( offset = 0; offset < size; offset += size - 1 ) {
//		m1 = original;
//		m2 = original;
//
//		v.SetSize( 6 );
//		for ( int i = 0; i < size; i++ ) {
//			v[i] = original[i][offset];
//		}
//
//		// factor m1
//		m1.Cholesky_Factor();
//
//		// modify and factor m2
//		m2.Update_Decrement( offset );
//		if ( !m2.Cholesky_Factor() ) {
//			assert( 0 );
//		}
//
//		// update factors of m1
//		m1.Cholesky_UpdateDecrement( v, offset );
//
//		if ( !m1.Compare( m2, 1e-3f ) ) {
//			idLib::common->Warning( "idMatX::Cholesky_UpdateDecrement failed" );
//		}
//	}
//
//	/*
//		idMatX::Cholesky_Inverse
//	*/
//
//	m2 = original;
//
//	m2.Cholesky_Factor();
//	m2.Cholesky_Inverse( m1 );
//	m1 *= original;
//
//	if ( !m1.IsIdentity( 1e-4f ) ) {
//		idLib::common->Warning( "idMatX::Cholesky_Inverse failed" );
//	}
//
//	/*
//		idMatX::LDLT_Factor
//	*/
//
//	m1 = original;
//
//	m1.LDLT_Factor();
//	m1.LDLT_MultiplyFactors( m2 );
//
//	if ( !original.Compare( m2, 1e-4f ) ) {
//		idLib::common->Warning( "idMatX::LDLT_Factor failed" );
//	}
//
//	m1.LDLT_UnpackFactors( m2, m3 );
//	m2 = m2 * m3 * m2.Transpose();
//
//	if ( !original.Compare( m2, 1e-4f ) ) {
//		idLib::common->Warning( "idMatX::LDLT_Factor failed" );
//	}
//
//	/*
//		idMatX::LDLT_UpdateRankOne
//	*/
//
//	m1 = original;
//	m2 = original;
//
//	w.Random( size, 0 );
//
//	// factor m1
//	m1.LDLT_Factor();
//	m1.ClearUpperTriangle();
//
//	// modify and factor m2 
//	m2.Update_RankOneSymmetric( w, 1.0f );
//	if ( !m2.LDLT_Factor() ) {
//		assert( 0 );
//	}
//	m2.ClearUpperTriangle();
//
//	// update factored m1
//	m1.LDLT_UpdateRankOne( w, 1.0f, 0 );
//
//	if ( !m1.Compare( m2, 1e-4f ) ) {
//		idLib::common->Warning( "idMatX::LDLT_UpdateRankOne failed" );
//	}
//
//	/*
//		idMatX::LDLT_UpdateRowColumn
//	*/
//
//	for ( offset = 0; offset < size; offset++ ) {
//		m1 = original;
//		m2 = original;
//
//		w.Random( size, 0 );
//
//		// factor m1
//		m1.LDLT_Factor();
//		m1.ClearUpperTriangle();
//
//		// modify and factor m2
//		m2.Update_RowColumnSymmetric( w, offset );
//		if ( !m2.LDLT_Factor() ) {
//			assert( 0 );
//		}
//		m2.ClearUpperTriangle();
//
//		// update m1
//		m1.LDLT_UpdateRowColumn( w, offset );
//
//		if ( !m1.Compare( m2, 1e-3f ) ) {
//			idLib::common->Warning( "idMatX::LDLT_UpdateRowColumn failed" );
//		}
//	}
//
//	/*
//		idMatX::LDLT_UpdateIncrement
//	*/
//
//	m1.Random( size + 1, size + 1, 0 );
//	m3 = m1 * m1.Transpose();
//
//	m1.SquareSubMatrix( m3, size );
//	m2 = m1;
//
//	w.SetSize( size + 1 );
//	for ( int i = 0; i < size + 1; i++ ) {
//		w[i] = m3[size][i];
//	}
//
//	// factor m1
//	m1.LDLT_Factor();
//
//	// modify and factor m2 
//	m2.Update_IncrementSymmetric( w );
//	if ( !m2.LDLT_Factor() ) {
//		assert( 0 );
//	}
//
//	// update factored m1
//	m1.LDLT_UpdateIncrement( w );
//
//	m1.ClearUpperTriangle();
//	m2.ClearUpperTriangle();
//
//	if ( !m1.Compare( m2, 1e-4f ) ) {
//		idLib::common->Warning( "idMatX::LDLT_UpdateIncrement failed" );
//	}
//
//	/*
//		idMatX::LDLT_UpdateDecrement
//	*/
//
//	for ( offset = 0; offset < size; offset++ ) {
//		m1 = original;
//		m2 = original;
//
//		v.SetSize( 6 );
//		for ( int i = 0; i < size; i++ ) {
//			v[i] = original[i][offset];
//		}
//
//		// factor m1
//		m1.LDLT_Factor();
//
//		// modify and factor m2
//		m2.Update_Decrement( offset );
//		if ( !m2.LDLT_Factor() ) {
//			assert( 0 );
//		}
//
//		// update factors of m1
//		m1.LDLT_UpdateDecrement( v, offset );
//
//		if ( !m1.Compare( m2, 1e-3f ) ) {
//			idLib::common->Warning( "idMatX::LDLT_UpdateDecrement failed" );
//		}
//	}
//
//	/*
//		idMatX::LDLT_Inverse
//	*/
//
//	m2 = original;
//
//	m2.LDLT_Factor();
//	m2.LDLT_Inverse( m1 );
//	m1 *= original;
//
//	if ( !m1.IsIdentity( 1e-4f ) ) {
//		idLib::common->Warning( "idMatX::LDLT_Inverse failed" );
//	}
//
//	/*
//		idMatX::Eigen_SolveSymmetricTriDiagonal
//	*/
//
//	m3 = original;
//	m3.TriDiagonal_ClearTriangles();
//	m1 = m3;
//
//	v.SetSize( size );
//
//	m1.Eigen_SolveSymmetricTriDiagonal( v );
//
//	m3.TransposeMultiply( m2, m1 );
//
//	for ( int i = 0; i < size; i++ ) {
//		for ( int j = 0; j < size; j++ ) {
//			m1[i][j] *= v[j];
//		}
//	}
//
//	if ( !m1.Compare( m2, 1e-4f ) ) {
//		idLib::common->Warning( "idMatX::Eigen_SolveSymmetricTriDiagonal failed" );
//	}
//
//	/*
//		idMatX::Eigen_SolveSymmetric
//	*/
//
//	m3 = original;
//	m1 = m3;
//
//	v.SetSize( size );
//
//	m1.Eigen_SolveSymmetric( v );
//
//	m3.TransposeMultiply( m2, m1 );
//
//	for ( int i = 0; i < size; i++ ) {
//		for ( int j = 0; j < size; j++ ) {
//			m1[i][j] *= v[j];
//		}
//	}
//
//	if ( !m1.Compare( m2, 1e-4f ) ) {
//		idLib::common->Warning( "idMatX::Eigen_SolveSymmetric failed" );
//	}
//
//	/*
//		idMatX::Eigen_Solve
//	*/
//
//	m3 = original;
//	m1 = m3;
//
//	v.SetSize( size );
//	w.SetSize( size );
//
//	m1.Eigen_Solve( v, w );
//
//	m3.TransposeMultiply( m2, m1 );
//
//	for ( int i = 0; i < size; i++ ) {
//		for ( int j = 0; j < size; j++ ) {
//			m1[i][j] *= v[j];
//		}
//	}
//
//	if ( !m1.Compare( m2, 1e-4f ) ) {
//		idLib::common->Warning( "idMatX::Eigen_Solve failed" );
//	}
//}

}
//#endif /* !__MATH_MATRIX_H__ */
