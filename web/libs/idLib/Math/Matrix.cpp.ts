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
//#include "../precompiled.h"
//#pragma hdrstop
//
//
////===============================================================
////
////	idMat2
////
////===============================================================
//
//idMat2 mat2_zero( idVec2( 0, 0 ), idVec2( 0, 0 ) );
//idMat2 mat2_identity( idVec2( 1, 0 ), idVec2( 0, 1 ) );
//
///*
//============
//idMat2::InverseSelf
//============
//*/
//bool idMat2::InverseSelf( void ) {
//	// 2+4 = 6 multiplications
//	//		 1 division
//	double det, invDet, a;
//
//	det = mat[0][0] * mat[1][1] - mat[0][1] * mat[1][0];
//
//	if ( idMath::Fabs( det ) < MATRIX_INVERSE_EPSILON ) {
//		return false;
//	}
//
//	invDet = 1.0f / det;
//
//	a = mat[0][0];
//	mat[0][0] =   mat[1][1] * invDet;
//	mat[0][1] = - mat[0][1] * invDet;
//	mat[1][0] = - mat[1][0] * invDet;
//	mat[1][1] =   a * invDet;
//
//	return true;
//}
//
///*
//============
//idMat2::InverseFastSelf
//============
//*/
//bool idMat2::InverseFastSelf( void ) {
//#if 1
//	// 2+4 = 6 multiplications
//	//		 1 division
//	double det, invDet, a;
//
//	det = mat[0][0] * mat[1][1] - mat[0][1] * mat[1][0];
//
//	if ( idMath::Fabs( det ) < MATRIX_INVERSE_EPSILON ) {
//		return false;
//	}
//
//	invDet = 1.0f / det;
//
//	a = mat[0][0];
//	mat[0][0] =   mat[1][1] * invDet;
//	mat[0][1] = - mat[0][1] * invDet;
//	mat[1][0] = - mat[1][0] * invDet;
//	mat[1][1] =   a * invDet;
//
//	return true;
//#else
//	// 2*4 = 8 multiplications
//	//		 2 division
//	float *mat = reinterpret_cast<float *>(this);
//	double d, di;
//	float s;
//
//	di = mat[0];
//	s = di;
//	mat[0*2+0] = d = 1.0f / di;
//	mat[0*2+1] *= d;
//	d = -d;
//	mat[1*2+0] *= d;
//	d = mat[1*2+0] * di;
//	mat[1*2+1] += mat[0*2+1] * d;
//	di = mat[1*2+1];
//	s *= di;
//	mat[1*2+1] = d = 1.0f / di;
//	mat[1*2+0] *= d;
//	d = -d;
//	mat[0*2+1] *= d;
//	d = mat[0*2+1] * di;
//	mat[0*2+0] += mat[1*2+0] * d;
//
//	return ( s != 0.0f && !FLOAT_IS_NAN( s ) );
//#endif
//}
//
///*
//=============
//idMat2::ToString
//=============
//*/
//const char *idMat2::ToString( int precision ) const {
//	return idStr.FloatArrayToString( ToFloatPtr(), GetDimension(), precision );
//}
//
//
//
//
////===============================================================
////
////	idMat4
////
////===============================================================
//
//idMat4 mat4_zero( idVec4( 0, 0, 0, 0 ), idVec4( 0, 0, 0, 0 ), idVec4( 0, 0, 0, 0 ), idVec4( 0, 0, 0, 0 ) );
//idMat4 mat4_identity( idVec4( 1, 0, 0, 0 ), idVec4( 0, 1, 0, 0 ), idVec4( 0, 0, 1, 0 ), idVec4( 0, 0, 0, 1 ) );
//
///*
//============
//idMat4::Transpose
//============
//*/
//idMat4 idMat4::Transpose( void ) const {
//	idMat4	transpose;
//	int		i, j;
//   
//	for( i = 0; i < 4; i++ ) {
//		for( j = 0; j < 4; j++ ) {
//			transpose[ i ][ j ] = mat[ j ][ i ];
//        }
//	}
//	return transpose;
//}
//
///*
//============
//idMat4::TransposeSelf
//============
//*/
//idMat4 &idMat4::TransposeSelf( void ) {
//	float	temp;
//	int		i, j;
//   
//	for( i = 0; i < 4; i++ ) {
//		for( j = i + 1; j < 4; j++ ) {
//			temp = mat[ i ][ j ];
//			mat[ i ][ j ] = mat[ j ][ i ];
//			mat[ j ][ i ] = temp;
//        }
//	}
//	return *this;
//}
//
///*
//============
//idMat4::Determinant
//============
//*/
//float idMat4::Determinant( void ) const {
//
//	// 2x2 sub-determinants
//	float det2_01_01 = mat[0][0] * mat[1][1] - mat[0][1] * mat[1][0];
//	float det2_01_02 = mat[0][0] * mat[1][2] - mat[0][2] * mat[1][0];
//	float det2_01_03 = mat[0][0] * mat[1][3] - mat[0][3] * mat[1][0];
//	float det2_01_12 = mat[0][1] * mat[1][2] - mat[0][2] * mat[1][1];
//	float det2_01_13 = mat[0][1] * mat[1][3] - mat[0][3] * mat[1][1];
//	float det2_01_23 = mat[0][2] * mat[1][3] - mat[0][3] * mat[1][2];
//
//	// 3x3 sub-determinants
//	float det3_201_012 = mat[2][0] * det2_01_12 - mat[2][1] * det2_01_02 + mat[2][2] * det2_01_01;
//	float det3_201_013 = mat[2][0] * det2_01_13 - mat[2][1] * det2_01_03 + mat[2][3] * det2_01_01;
//	float det3_201_023 = mat[2][0] * det2_01_23 - mat[2][2] * det2_01_03 + mat[2][3] * det2_01_02;
//	float det3_201_123 = mat[2][1] * det2_01_23 - mat[2][2] * det2_01_13 + mat[2][3] * det2_01_12;
//
//	return ( - det3_201_123 * mat[3][0] + det3_201_023 * mat[3][1] - det3_201_013 * mat[3][2] + det3_201_012 * mat[3][3] );
//}
//
///*
//============
//idMat4::InverseSelf
//============
//*/
//bool idMat4::InverseSelf( void ) {
//	// 84+4+16 = 104 multiplications
//	//			   1 division
//	double det, invDet;
//
//	// 2x2 sub-determinants required to calculate 4x4 determinant
//	float det2_01_01 = mat[0][0] * mat[1][1] - mat[0][1] * mat[1][0];
//	float det2_01_02 = mat[0][0] * mat[1][2] - mat[0][2] * mat[1][0];
//	float det2_01_03 = mat[0][0] * mat[1][3] - mat[0][3] * mat[1][0];
//	float det2_01_12 = mat[0][1] * mat[1][2] - mat[0][2] * mat[1][1];
//	float det2_01_13 = mat[0][1] * mat[1][3] - mat[0][3] * mat[1][1];
//	float det2_01_23 = mat[0][2] * mat[1][3] - mat[0][3] * mat[1][2];
//
//	// 3x3 sub-determinants required to calculate 4x4 determinant
//	float det3_201_012 = mat[2][0] * det2_01_12 - mat[2][1] * det2_01_02 + mat[2][2] * det2_01_01;
//	float det3_201_013 = mat[2][0] * det2_01_13 - mat[2][1] * det2_01_03 + mat[2][3] * det2_01_01;
//	float det3_201_023 = mat[2][0] * det2_01_23 - mat[2][2] * det2_01_03 + mat[2][3] * det2_01_02;
//	float det3_201_123 = mat[2][1] * det2_01_23 - mat[2][2] * det2_01_13 + mat[2][3] * det2_01_12;
//
//	det = ( - det3_201_123 * mat[3][0] + det3_201_023 * mat[3][1] - det3_201_013 * mat[3][2] + det3_201_012 * mat[3][3] );
//
//	if ( idMath::Fabs( det ) < MATRIX_INVERSE_EPSILON ) {
//		return false;
//	}
//
//	invDet = 1.0f / det;
//
//	// remaining 2x2 sub-determinants
//	float det2_03_01 = mat[0][0] * mat[3][1] - mat[0][1] * mat[3][0];
//	float det2_03_02 = mat[0][0] * mat[3][2] - mat[0][2] * mat[3][0];
//	float det2_03_03 = mat[0][0] * mat[3][3] - mat[0][3] * mat[3][0];
//	float det2_03_12 = mat[0][1] * mat[3][2] - mat[0][2] * mat[3][1];
//	float det2_03_13 = mat[0][1] * mat[3][3] - mat[0][3] * mat[3][1];
//	float det2_03_23 = mat[0][2] * mat[3][3] - mat[0][3] * mat[3][2];
//
//	float det2_13_01 = mat[1][0] * mat[3][1] - mat[1][1] * mat[3][0];
//	float det2_13_02 = mat[1][0] * mat[3][2] - mat[1][2] * mat[3][0];
//	float det2_13_03 = mat[1][0] * mat[3][3] - mat[1][3] * mat[3][0];
//	float det2_13_12 = mat[1][1] * mat[3][2] - mat[1][2] * mat[3][1];
//	float det2_13_13 = mat[1][1] * mat[3][3] - mat[1][3] * mat[3][1];
//	float det2_13_23 = mat[1][2] * mat[3][3] - mat[1][3] * mat[3][2];
//
//	// remaining 3x3 sub-determinants
//	float det3_203_012 = mat[2][0] * det2_03_12 - mat[2][1] * det2_03_02 + mat[2][2] * det2_03_01;
//	float det3_203_013 = mat[2][0] * det2_03_13 - mat[2][1] * det2_03_03 + mat[2][3] * det2_03_01;
//	float det3_203_023 = mat[2][0] * det2_03_23 - mat[2][2] * det2_03_03 + mat[2][3] * det2_03_02;
//	float det3_203_123 = mat[2][1] * det2_03_23 - mat[2][2] * det2_03_13 + mat[2][3] * det2_03_12;
//
//	float det3_213_012 = mat[2][0] * det2_13_12 - mat[2][1] * det2_13_02 + mat[2][2] * det2_13_01;
//	float det3_213_013 = mat[2][0] * det2_13_13 - mat[2][1] * det2_13_03 + mat[2][3] * det2_13_01;
//	float det3_213_023 = mat[2][0] * det2_13_23 - mat[2][2] * det2_13_03 + mat[2][3] * det2_13_02;
//	float det3_213_123 = mat[2][1] * det2_13_23 - mat[2][2] * det2_13_13 + mat[2][3] * det2_13_12;
//
//	float det3_301_012 = mat[3][0] * det2_01_12 - mat[3][1] * det2_01_02 + mat[3][2] * det2_01_01;
//	float det3_301_013 = mat[3][0] * det2_01_13 - mat[3][1] * det2_01_03 + mat[3][3] * det2_01_01;
//	float det3_301_023 = mat[3][0] * det2_01_23 - mat[3][2] * det2_01_03 + mat[3][3] * det2_01_02;
//	float det3_301_123 = mat[3][1] * det2_01_23 - mat[3][2] * det2_01_13 + mat[3][3] * det2_01_12;
//
//	mat[0][0] =	- det3_213_123 * invDet;
//	mat[1][0] = + det3_213_023 * invDet;
//	mat[2][0] = - det3_213_013 * invDet;
//	mat[3][0] = + det3_213_012 * invDet;
//
//	mat[0][1] = + det3_203_123 * invDet;
//	mat[1][1] = - det3_203_023 * invDet;
//	mat[2][1] = + det3_203_013 * invDet;
//	mat[3][1] = - det3_203_012 * invDet;
//
//	mat[0][2] = + det3_301_123 * invDet;
//	mat[1][2] = - det3_301_023 * invDet;
//	mat[2][2] = + det3_301_013 * invDet;
//	mat[3][2] = - det3_301_012 * invDet;
//
//	mat[0][3] = - det3_201_123 * invDet;
//	mat[1][3] = + det3_201_023 * invDet;
//	mat[2][3] = - det3_201_013 * invDet;
//	mat[3][3] = + det3_201_012 * invDet;
//
//	return true;
//}
//
///*
//============
//idMat4::InverseFastSelf
//============
//*/
//bool idMat4::InverseFastSelf( void ) {
//#if 0
//	// 84+4+16 = 104 multiplications
//	//			   1 division
//	double det, invDet;
//
//	// 2x2 sub-determinants required to calculate 4x4 determinant
//	float det2_01_01 = mat[0][0] * mat[1][1] - mat[0][1] * mat[1][0];
//	float det2_01_02 = mat[0][0] * mat[1][2] - mat[0][2] * mat[1][0];
//	float det2_01_03 = mat[0][0] * mat[1][3] - mat[0][3] * mat[1][0];
//	float det2_01_12 = mat[0][1] * mat[1][2] - mat[0][2] * mat[1][1];
//	float det2_01_13 = mat[0][1] * mat[1][3] - mat[0][3] * mat[1][1];
//	float det2_01_23 = mat[0][2] * mat[1][3] - mat[0][3] * mat[1][2];
//
//	// 3x3 sub-determinants required to calculate 4x4 determinant
//	float det3_201_012 = mat[2][0] * det2_01_12 - mat[2][1] * det2_01_02 + mat[2][2] * det2_01_01;
//	float det3_201_013 = mat[2][0] * det2_01_13 - mat[2][1] * det2_01_03 + mat[2][3] * det2_01_01;
//	float det3_201_023 = mat[2][0] * det2_01_23 - mat[2][2] * det2_01_03 + mat[2][3] * det2_01_02;
//	float det3_201_123 = mat[2][1] * det2_01_23 - mat[2][2] * det2_01_13 + mat[2][3] * det2_01_12;
//
//	det = ( - det3_201_123 * mat[3][0] + det3_201_023 * mat[3][1] - det3_201_013 * mat[3][2] + det3_201_012 * mat[3][3] );
//
//	if ( idMath::Fabs( det ) < MATRIX_INVERSE_EPSILON ) {
//		return false;
//	}
//
//	invDet = 1.0f / det;
//
//	// remaining 2x2 sub-determinants
//	float det2_03_01 = mat[0][0] * mat[3][1] - mat[0][1] * mat[3][0];
//	float det2_03_02 = mat[0][0] * mat[3][2] - mat[0][2] * mat[3][0];
//	float det2_03_03 = mat[0][0] * mat[3][3] - mat[0][3] * mat[3][0];
//	float det2_03_12 = mat[0][1] * mat[3][2] - mat[0][2] * mat[3][1];
//	float det2_03_13 = mat[0][1] * mat[3][3] - mat[0][3] * mat[3][1];
//	float det2_03_23 = mat[0][2] * mat[3][3] - mat[0][3] * mat[3][2];
//
//	float det2_13_01 = mat[1][0] * mat[3][1] - mat[1][1] * mat[3][0];
//	float det2_13_02 = mat[1][0] * mat[3][2] - mat[1][2] * mat[3][0];
//	float det2_13_03 = mat[1][0] * mat[3][3] - mat[1][3] * mat[3][0];
//	float det2_13_12 = mat[1][1] * mat[3][2] - mat[1][2] * mat[3][1];
//	float det2_13_13 = mat[1][1] * mat[3][3] - mat[1][3] * mat[3][1];
//	float det2_13_23 = mat[1][2] * mat[3][3] - mat[1][3] * mat[3][2];
//
//	// remaining 3x3 sub-determinants
//	float det3_203_012 = mat[2][0] * det2_03_12 - mat[2][1] * det2_03_02 + mat[2][2] * det2_03_01;
//	float det3_203_013 = mat[2][0] * det2_03_13 - mat[2][1] * det2_03_03 + mat[2][3] * det2_03_01;
//	float det3_203_023 = mat[2][0] * det2_03_23 - mat[2][2] * det2_03_03 + mat[2][3] * det2_03_02;
//	float det3_203_123 = mat[2][1] * det2_03_23 - mat[2][2] * det2_03_13 + mat[2][3] * det2_03_12;
//
//	float det3_213_012 = mat[2][0] * det2_13_12 - mat[2][1] * det2_13_02 + mat[2][2] * det2_13_01;
//	float det3_213_013 = mat[2][0] * det2_13_13 - mat[2][1] * det2_13_03 + mat[2][3] * det2_13_01;
//	float det3_213_023 = mat[2][0] * det2_13_23 - mat[2][2] * det2_13_03 + mat[2][3] * det2_13_02;
//	float det3_213_123 = mat[2][1] * det2_13_23 - mat[2][2] * det2_13_13 + mat[2][3] * det2_13_12;
//
//	float det3_301_012 = mat[3][0] * det2_01_12 - mat[3][1] * det2_01_02 + mat[3][2] * det2_01_01;
//	float det3_301_013 = mat[3][0] * det2_01_13 - mat[3][1] * det2_01_03 + mat[3][3] * det2_01_01;
//	float det3_301_023 = mat[3][0] * det2_01_23 - mat[3][2] * det2_01_03 + mat[3][3] * det2_01_02;
//	float det3_301_123 = mat[3][1] * det2_01_23 - mat[3][2] * det2_01_13 + mat[3][3] * det2_01_12;
//
//	mat[0][0] =	- det3_213_123 * invDet;
//	mat[1][0] = + det3_213_023 * invDet;
//	mat[2][0] = - det3_213_013 * invDet;
//	mat[3][0] = + det3_213_012 * invDet;
//
//	mat[0][1] = + det3_203_123 * invDet;
//	mat[1][1] = - det3_203_023 * invDet;
//	mat[2][1] = + det3_203_013 * invDet;
//	mat[3][1] = - det3_203_012 * invDet;
//
//	mat[0][2] = + det3_301_123 * invDet;
//	mat[1][2] = - det3_301_023 * invDet;
//	mat[2][2] = + det3_301_013 * invDet;
//	mat[3][2] = - det3_301_012 * invDet;
//
//	mat[0][3] = - det3_201_123 * invDet;
//	mat[1][3] = + det3_201_023 * invDet;
//	mat[2][3] = - det3_201_013 * invDet;
//	mat[3][3] = + det3_201_012 * invDet;
//
//	return true;
//#elif 0
//	// 4*18 = 72 multiplications
//	//		   4 divisions
//	float *mat = reinterpret_cast<float *>(this);
//	float s;
//	double d, di;
//
//	di = mat[0];
//	s = di;
//	mat[0] = d = 1.0f / di;
//	mat[1] *= d;
//	mat[2] *= d;
//	mat[3] *= d;
//	d = -d;
//	mat[4] *= d;
//	mat[8] *= d;
//	mat[12] *= d;
//	d = mat[4] * di;
//	mat[5] += mat[1] * d;
//	mat[6] += mat[2] * d;
//	mat[7] += mat[3] * d;
//	d = mat[8] * di;
//	mat[9] += mat[1] * d;
//	mat[10] += mat[2] * d;
//	mat[11] += mat[3] * d;
//	d = mat[12] * di;
//	mat[13] += mat[1] * d;
//	mat[14] += mat[2] * d;
//	mat[15] += mat[3] * d;
//	di = mat[5];
//	s *= di;
//	mat[5] = d = 1.0f / di;
//	mat[4] *= d;
//	mat[6] *= d;
//	mat[7] *= d;
//	d = -d;
//	mat[1] *= d;
//	mat[9] *= d;
//	mat[13] *= d;
//	d = mat[1] * di;
//	mat[0] += mat[4] * d;
//	mat[2] += mat[6] * d;
//	mat[3] += mat[7] * d;
//	d = mat[9] * di;
//	mat[8] += mat[4] * d;
//	mat[10] += mat[6] * d;
//	mat[11] += mat[7] * d;
//	d = mat[13] * di;
//	mat[12] += mat[4] * d;
//	mat[14] += mat[6] * d;
//	mat[15] += mat[7] * d;
//	di = mat[10];
//	s *= di;
//	mat[10] = d = 1.0f / di;
//	mat[8] *= d;
//	mat[9] *= d;
//	mat[11] *= d;
//	d = -d;
//	mat[2] *= d;
//	mat[6] *= d;
//	mat[14] *= d;
//	d = mat[2] * di;
//	mat[0] += mat[8] * d;
//	mat[1] += mat[9] * d;
//	mat[3] += mat[11] * d;
//	d = mat[6] * di;
//	mat[4] += mat[8] * d;
//	mat[5] += mat[9] * d;
//	mat[7] += mat[11] * d;
//	d = mat[14] * di;
//	mat[12] += mat[8] * d;
//	mat[13] += mat[9] * d;
//	mat[15] += mat[11] * d;
//	di = mat[15];
//	s *= di;
//	mat[15] = d = 1.0f / di;
//	mat[12] *= d;
//	mat[13] *= d;
//	mat[14] *= d;
//	d = -d;
//	mat[3] *= d;
//	mat[7] *= d;
//	mat[11] *= d;
//	d = mat[3] * di;
//	mat[0] += mat[12] * d;
//	mat[1] += mat[13] * d;
//	mat[2] += mat[14] * d;
//	d = mat[7] * di;
//	mat[4] += mat[12] * d;
//	mat[5] += mat[13] * d;
//	mat[6] += mat[14] * d;
//	d = mat[11] * di;
//	mat[8] += mat[12] * d;
//	mat[9] += mat[13] * d;
//	mat[10] += mat[14] * d;
//
//	return ( s != 0.0f && !FLOAT_IS_NAN( s ) );
//#else
//	//	6*8+2*6 = 60 multiplications
//	//		2*1 =  2 divisions
//	idMat2 r0, r1, r2, r3;
//	float a, det, invDet;
//	float *mat = reinterpret_cast<float *>(this);
//
//	// r0 = m0.Inverse();
//	det = mat[0*4+0] * mat[1*4+1] - mat[0*4+1] * mat[1*4+0];
//
//	if ( idMath::Fabs( det ) < MATRIX_INVERSE_EPSILON ) {
//		return false;
//	}
//
//	invDet = 1.0f / det;
//
//	r0[0][0] =   mat[1*4+1] * invDet;
//	r0[0][1] = - mat[0*4+1] * invDet;
//	r0[1][0] = - mat[1*4+0] * invDet;
//	r0[1][1] =   mat[0*4+0] * invDet;
//
//	// r1 = r0 * m1;
//	r1[0][0] = r0[0][0] * mat[0*4+2] + r0[0][1] * mat[1*4+2];
//	r1[0][1] = r0[0][0] * mat[0*4+3] + r0[0][1] * mat[1*4+3];
//	r1[1][0] = r0[1][0] * mat[0*4+2] + r0[1][1] * mat[1*4+2];
//	r1[1][1] = r0[1][0] * mat[0*4+3] + r0[1][1] * mat[1*4+3];
//
//	// r2 = m2 * r1;
//	r2[0][0] = mat[2*4+0] * r1[0][0] + mat[2*4+1] * r1[1][0];
//	r2[0][1] = mat[2*4+0] * r1[0][1] + mat[2*4+1] * r1[1][1];
//	r2[1][0] = mat[3*4+0] * r1[0][0] + mat[3*4+1] * r1[1][0];
//	r2[1][1] = mat[3*4+0] * r1[0][1] + mat[3*4+1] * r1[1][1];
//
//	// r3 = r2 - m3;
//	r3[0][0] = r2[0][0] - mat[2*4+2];
//	r3[0][1] = r2[0][1] - mat[2*4+3];
//	r3[1][0] = r2[1][0] - mat[3*4+2];
//	r3[1][1] = r2[1][1] - mat[3*4+3];
//
//	// r3.InverseSelf();
//	det = r3[0][0] * r3[1][1] - r3[0][1] * r3[1][0];
//
//	if ( idMath::Fabs( det ) < MATRIX_INVERSE_EPSILON ) {
//		return false;
//	}
//
//	invDet = 1.0f / det;
//
//	a = r3[0][0];
//	r3[0][0] =   r3[1][1] * invDet;
//	r3[0][1] = - r3[0][1] * invDet;
//	r3[1][0] = - r3[1][0] * invDet;
//	r3[1][1] =   a * invDet;
//
//	// r2 = m2 * r0;
//	r2[0][0] = mat[2*4+0] * r0[0][0] + mat[2*4+1] * r0[1][0];
//	r2[0][1] = mat[2*4+0] * r0[0][1] + mat[2*4+1] * r0[1][1];
//	r2[1][0] = mat[3*4+0] * r0[0][0] + mat[3*4+1] * r0[1][0];
//	r2[1][1] = mat[3*4+0] * r0[0][1] + mat[3*4+1] * r0[1][1];
//
//	// m2 = r3 * r2;
//	mat[2*4+0] = r3[0][0] * r2[0][0] + r3[0][1] * r2[1][0];
//	mat[2*4+1] = r3[0][0] * r2[0][1] + r3[0][1] * r2[1][1];
//	mat[3*4+0] = r3[1][0] * r2[0][0] + r3[1][1] * r2[1][0];
//	mat[3*4+1] = r3[1][0] * r2[0][1] + r3[1][1] * r2[1][1];
//
//	// m0 = r0 - r1 * m2;
//	mat[0*4+0] = r0[0][0] - r1[0][0] * mat[2*4+0] - r1[0][1] * mat[3*4+0];
//	mat[0*4+1] = r0[0][1] - r1[0][0] * mat[2*4+1] - r1[0][1] * mat[3*4+1];
//	mat[1*4+0] = r0[1][0] - r1[1][0] * mat[2*4+0] - r1[1][1] * mat[3*4+0];
//	mat[1*4+1] = r0[1][1] - r1[1][0] * mat[2*4+1] - r1[1][1] * mat[3*4+1];
//
//	// m1 = r1 * r3;
//	mat[0*4+2] = r1[0][0] * r3[0][0] + r1[0][1] * r3[1][0];
//	mat[0*4+3] = r1[0][0] * r3[0][1] + r1[0][1] * r3[1][1];
//	mat[1*4+2] = r1[1][0] * r3[0][0] + r1[1][1] * r3[1][0];
//	mat[1*4+3] = r1[1][0] * r3[0][1] + r1[1][1] * r3[1][1];
//
//	// m3 = -r3;
//	mat[2*4+2] = -r3[0][0];
//	mat[2*4+3] = -r3[0][1];
//	mat[3*4+2] = -r3[1][0];
//	mat[3*4+3] = -r3[1][1];
//
//	return true;
//#endif
//}
//
///*
//=============
//idMat4::ToString
//=============
//*/
//const char *idMat4::ToString( int precision ) const {
//	return idStr.FloatArrayToString( ToFloatPtr(), GetDimension(), precision );
//}
//
//
////===============================================================
////
////	idMat5
////
////===============================================================
//
//idMat5 mat5_zero( idVec5( 0, 0, 0, 0, 0 ), idVec5( 0, 0, 0, 0, 0 ), idVec5( 0, 0, 0, 0, 0 ), idVec5( 0, 0, 0, 0, 0 ), idVec5( 0, 0, 0, 0, 0 ) );
//idMat5 mat5_identity( idVec5( 1, 0, 0, 0, 0 ), idVec5( 0, 1, 0, 0, 0 ), idVec5( 0, 0, 1, 0, 0 ), idVec5( 0, 0, 0, 1, 0 ), idVec5( 0, 0, 0, 0, 1 ) );
//
///*
//============
//idMat5::Transpose
//============
//*/
//idMat5 idMat5::Transpose( void ) const {
//	idMat5	transpose;
//	int		i, j;
//   
//	for( i = 0; i < 5; i++ ) {
//		for( j = 0; j < 5; j++ ) {
//			transpose[ i ][ j ] = mat[ j ][ i ];
//        }
//	}
//	return transpose;
//}
//
///*
//============
//idMat5::TransposeSelf
//============
//*/
//idMat5 &idMat5::TransposeSelf( void ) {
//	float	temp;
//	int		i, j;
//   
//	for( i = 0; i < 5; i++ ) {
//		for( j = i + 1; j < 5; j++ ) {
//			temp = mat[ i ][ j ];
//			mat[ i ][ j ] = mat[ j ][ i ];
//			mat[ j ][ i ] = temp;
//        }
//	}
//	return *this;
//}
//
///*
//============
//idMat5::Determinant
//============
//*/
//float idMat5::Determinant( void ) const {
//
//	// 2x2 sub-determinants required to calculate 5x5 determinant
//	float det2_34_01 = mat[3][0] * mat[4][1] - mat[3][1] * mat[4][0];
//	float det2_34_02 = mat[3][0] * mat[4][2] - mat[3][2] * mat[4][0];
//	float det2_34_03 = mat[3][0] * mat[4][3] - mat[3][3] * mat[4][0];
//	float det2_34_04 = mat[3][0] * mat[4][4] - mat[3][4] * mat[4][0];
//	float det2_34_12 = mat[3][1] * mat[4][2] - mat[3][2] * mat[4][1];
//	float det2_34_13 = mat[3][1] * mat[4][3] - mat[3][3] * mat[4][1];
//	float det2_34_14 = mat[3][1] * mat[4][4] - mat[3][4] * mat[4][1];
//	float det2_34_23 = mat[3][2] * mat[4][3] - mat[3][3] * mat[4][2];
//	float det2_34_24 = mat[3][2] * mat[4][4] - mat[3][4] * mat[4][2];
//	float det2_34_34 = mat[3][3] * mat[4][4] - mat[3][4] * mat[4][3];
//
//	// 3x3 sub-determinants required to calculate 5x5 determinant
//	float det3_234_012 = mat[2][0] * det2_34_12 - mat[2][1] * det2_34_02 + mat[2][2] * det2_34_01;
//	float det3_234_013 = mat[2][0] * det2_34_13 - mat[2][1] * det2_34_03 + mat[2][3] * det2_34_01;
//	float det3_234_014 = mat[2][0] * det2_34_14 - mat[2][1] * det2_34_04 + mat[2][4] * det2_34_01;
//	float det3_234_023 = mat[2][0] * det2_34_23 - mat[2][2] * det2_34_03 + mat[2][3] * det2_34_02;
//	float det3_234_024 = mat[2][0] * det2_34_24 - mat[2][2] * det2_34_04 + mat[2][4] * det2_34_02;
//	float det3_234_034 = mat[2][0] * det2_34_34 - mat[2][3] * det2_34_04 + mat[2][4] * det2_34_03;
//	float det3_234_123 = mat[2][1] * det2_34_23 - mat[2][2] * det2_34_13 + mat[2][3] * det2_34_12;
//	float det3_234_124 = mat[2][1] * det2_34_24 - mat[2][2] * det2_34_14 + mat[2][4] * det2_34_12;
//	float det3_234_134 = mat[2][1] * det2_34_34 - mat[2][3] * det2_34_14 + mat[2][4] * det2_34_13;
//	float det3_234_234 = mat[2][2] * det2_34_34 - mat[2][3] * det2_34_24 + mat[2][4] * det2_34_23;
//
//	// 4x4 sub-determinants required to calculate 5x5 determinant
//	float det4_1234_0123 = mat[1][0] * det3_234_123 - mat[1][1] * det3_234_023 + mat[1][2] * det3_234_013 - mat[1][3] * det3_234_012;
//	float det4_1234_0124 = mat[1][0] * det3_234_124 - mat[1][1] * det3_234_024 + mat[1][2] * det3_234_014 - mat[1][4] * det3_234_012;
//	float det4_1234_0134 = mat[1][0] * det3_234_134 - mat[1][1] * det3_234_034 + mat[1][3] * det3_234_014 - mat[1][4] * det3_234_013;
//	float det4_1234_0234 = mat[1][0] * det3_234_234 - mat[1][2] * det3_234_034 + mat[1][3] * det3_234_024 - mat[1][4] * det3_234_023;
//	float det4_1234_1234 = mat[1][1] * det3_234_234 - mat[1][2] * det3_234_134 + mat[1][3] * det3_234_124 - mat[1][4] * det3_234_123;
//
//	// determinant of 5x5 matrix
//	return mat[0][0] * det4_1234_1234 - mat[0][1] * det4_1234_0234 + mat[0][2] * det4_1234_0134 - mat[0][3] * det4_1234_0124 + mat[0][4] * det4_1234_0123;
//}
//
///*
//============
//idMat5::InverseSelf
//============
//*/
//bool idMat5::InverseSelf( void ) {
//	// 280+5+25 = 310 multiplications
//	//				1 division
//	double det, invDet;
//
//	// 2x2 sub-determinants required to calculate 5x5 determinant
//	float det2_34_01 = mat[3][0] * mat[4][1] - mat[3][1] * mat[4][0];
//	float det2_34_02 = mat[3][0] * mat[4][2] - mat[3][2] * mat[4][0];
//	float det2_34_03 = mat[3][0] * mat[4][3] - mat[3][3] * mat[4][0];
//	float det2_34_04 = mat[3][0] * mat[4][4] - mat[3][4] * mat[4][0];
//	float det2_34_12 = mat[3][1] * mat[4][2] - mat[3][2] * mat[4][1];
//	float det2_34_13 = mat[3][1] * mat[4][3] - mat[3][3] * mat[4][1];
//	float det2_34_14 = mat[3][1] * mat[4][4] - mat[3][4] * mat[4][1];
//	float det2_34_23 = mat[3][2] * mat[4][3] - mat[3][3] * mat[4][2];
//	float det2_34_24 = mat[3][2] * mat[4][4] - mat[3][4] * mat[4][2];
//	float det2_34_34 = mat[3][3] * mat[4][4] - mat[3][4] * mat[4][3];
//
//	// 3x3 sub-determinants required to calculate 5x5 determinant
//	float det3_234_012 = mat[2][0] * det2_34_12 - mat[2][1] * det2_34_02 + mat[2][2] * det2_34_01;
//	float det3_234_013 = mat[2][0] * det2_34_13 - mat[2][1] * det2_34_03 + mat[2][3] * det2_34_01;
//	float det3_234_014 = mat[2][0] * det2_34_14 - mat[2][1] * det2_34_04 + mat[2][4] * det2_34_01;
//	float det3_234_023 = mat[2][0] * det2_34_23 - mat[2][2] * det2_34_03 + mat[2][3] * det2_34_02;
//	float det3_234_024 = mat[2][0] * det2_34_24 - mat[2][2] * det2_34_04 + mat[2][4] * det2_34_02;
//	float det3_234_034 = mat[2][0] * det2_34_34 - mat[2][3] * det2_34_04 + mat[2][4] * det2_34_03;
//	float det3_234_123 = mat[2][1] * det2_34_23 - mat[2][2] * det2_34_13 + mat[2][3] * det2_34_12;
//	float det3_234_124 = mat[2][1] * det2_34_24 - mat[2][2] * det2_34_14 + mat[2][4] * det2_34_12;
//	float det3_234_134 = mat[2][1] * det2_34_34 - mat[2][3] * det2_34_14 + mat[2][4] * det2_34_13;
//	float det3_234_234 = mat[2][2] * det2_34_34 - mat[2][3] * det2_34_24 + mat[2][4] * det2_34_23;
//
//	// 4x4 sub-determinants required to calculate 5x5 determinant
//	float det4_1234_0123 = mat[1][0] * det3_234_123 - mat[1][1] * det3_234_023 + mat[1][2] * det3_234_013 - mat[1][3] * det3_234_012;
//	float det4_1234_0124 = mat[1][0] * det3_234_124 - mat[1][1] * det3_234_024 + mat[1][2] * det3_234_014 - mat[1][4] * det3_234_012;
//	float det4_1234_0134 = mat[1][0] * det3_234_134 - mat[1][1] * det3_234_034 + mat[1][3] * det3_234_014 - mat[1][4] * det3_234_013;
//	float det4_1234_0234 = mat[1][0] * det3_234_234 - mat[1][2] * det3_234_034 + mat[1][3] * det3_234_024 - mat[1][4] * det3_234_023;
//	float det4_1234_1234 = mat[1][1] * det3_234_234 - mat[1][2] * det3_234_134 + mat[1][3] * det3_234_124 - mat[1][4] * det3_234_123;
//
//	// determinant of 5x5 matrix
//	det = mat[0][0] * det4_1234_1234 - mat[0][1] * det4_1234_0234 + mat[0][2] * det4_1234_0134 - mat[0][3] * det4_1234_0124 + mat[0][4] * det4_1234_0123;
//
//	if( idMath::Fabs( det ) < MATRIX_INVERSE_EPSILON ) {  
//		return false;
//	}
//
//	invDet = 1.0f / det;
//
//	// remaining 2x2 sub-determinants
//	float det2_23_01 = mat[2][0] * mat[3][1] - mat[2][1] * mat[3][0];
//	float det2_23_02 = mat[2][0] * mat[3][2] - mat[2][2] * mat[3][0];
//	float det2_23_03 = mat[2][0] * mat[3][3] - mat[2][3] * mat[3][0];
//	float det2_23_04 = mat[2][0] * mat[3][4] - mat[2][4] * mat[3][0];
//	float det2_23_12 = mat[2][1] * mat[3][2] - mat[2][2] * mat[3][1];
//	float det2_23_13 = mat[2][1] * mat[3][3] - mat[2][3] * mat[3][1];
//	float det2_23_14 = mat[2][1] * mat[3][4] - mat[2][4] * mat[3][1];
//	float det2_23_23 = mat[2][2] * mat[3][3] - mat[2][3] * mat[3][2];
//	float det2_23_24 = mat[2][2] * mat[3][4] - mat[2][4] * mat[3][2];
//	float det2_23_34 = mat[2][3] * mat[3][4] - mat[2][4] * mat[3][3];
//	float det2_24_01 = mat[2][0] * mat[4][1] - mat[2][1] * mat[4][0];
//	float det2_24_02 = mat[2][0] * mat[4][2] - mat[2][2] * mat[4][0];
//	float det2_24_03 = mat[2][0] * mat[4][3] - mat[2][3] * mat[4][0];
//	float det2_24_04 = mat[2][0] * mat[4][4] - mat[2][4] * mat[4][0];
//	float det2_24_12 = mat[2][1] * mat[4][2] - mat[2][2] * mat[4][1];
//	float det2_24_13 = mat[2][1] * mat[4][3] - mat[2][3] * mat[4][1];
//	float det2_24_14 = mat[2][1] * mat[4][4] - mat[2][4] * mat[4][1];
//	float det2_24_23 = mat[2][2] * mat[4][3] - mat[2][3] * mat[4][2];
//	float det2_24_24 = mat[2][2] * mat[4][4] - mat[2][4] * mat[4][2];
//	float det2_24_34 = mat[2][3] * mat[4][4] - mat[2][4] * mat[4][3];
//
//	// remaining 3x3 sub-determinants
//	float det3_123_012 = mat[1][0] * det2_23_12 - mat[1][1] * det2_23_02 + mat[1][2] * det2_23_01;
//	float det3_123_013 = mat[1][0] * det2_23_13 - mat[1][1] * det2_23_03 + mat[1][3] * det2_23_01;
//	float det3_123_014 = mat[1][0] * det2_23_14 - mat[1][1] * det2_23_04 + mat[1][4] * det2_23_01;
//	float det3_123_023 = mat[1][0] * det2_23_23 - mat[1][2] * det2_23_03 + mat[1][3] * det2_23_02;
//	float det3_123_024 = mat[1][0] * det2_23_24 - mat[1][2] * det2_23_04 + mat[1][4] * det2_23_02;
//	float det3_123_034 = mat[1][0] * det2_23_34 - mat[1][3] * det2_23_04 + mat[1][4] * det2_23_03;
//	float det3_123_123 = mat[1][1] * det2_23_23 - mat[1][2] * det2_23_13 + mat[1][3] * det2_23_12;
//	float det3_123_124 = mat[1][1] * det2_23_24 - mat[1][2] * det2_23_14 + mat[1][4] * det2_23_12;
//	float det3_123_134 = mat[1][1] * det2_23_34 - mat[1][3] * det2_23_14 + mat[1][4] * det2_23_13;
//	float det3_123_234 = mat[1][2] * det2_23_34 - mat[1][3] * det2_23_24 + mat[1][4] * det2_23_23;
//	float det3_124_012 = mat[1][0] * det2_24_12 - mat[1][1] * det2_24_02 + mat[1][2] * det2_24_01;
//	float det3_124_013 = mat[1][0] * det2_24_13 - mat[1][1] * det2_24_03 + mat[1][3] * det2_24_01;
//	float det3_124_014 = mat[1][0] * det2_24_14 - mat[1][1] * det2_24_04 + mat[1][4] * det2_24_01;
//	float det3_124_023 = mat[1][0] * det2_24_23 - mat[1][2] * det2_24_03 + mat[1][3] * det2_24_02;
//	float det3_124_024 = mat[1][0] * det2_24_24 - mat[1][2] * det2_24_04 + mat[1][4] * det2_24_02;
//	float det3_124_034 = mat[1][0] * det2_24_34 - mat[1][3] * det2_24_04 + mat[1][4] * det2_24_03;
//	float det3_124_123 = mat[1][1] * det2_24_23 - mat[1][2] * det2_24_13 + mat[1][3] * det2_24_12;
//	float det3_124_124 = mat[1][1] * det2_24_24 - mat[1][2] * det2_24_14 + mat[1][4] * det2_24_12;
//	float det3_124_134 = mat[1][1] * det2_24_34 - mat[1][3] * det2_24_14 + mat[1][4] * det2_24_13;
//	float det3_124_234 = mat[1][2] * det2_24_34 - mat[1][3] * det2_24_24 + mat[1][4] * det2_24_23;
//	float det3_134_012 = mat[1][0] * det2_34_12 - mat[1][1] * det2_34_02 + mat[1][2] * det2_34_01;
//	float det3_134_013 = mat[1][0] * det2_34_13 - mat[1][1] * det2_34_03 + mat[1][3] * det2_34_01;
//	float det3_134_014 = mat[1][0] * det2_34_14 - mat[1][1] * det2_34_04 + mat[1][4] * det2_34_01;
//	float det3_134_023 = mat[1][0] * det2_34_23 - mat[1][2] * det2_34_03 + mat[1][3] * det2_34_02;
//	float det3_134_024 = mat[1][0] * det2_34_24 - mat[1][2] * det2_34_04 + mat[1][4] * det2_34_02;
//	float det3_134_034 = mat[1][0] * det2_34_34 - mat[1][3] * det2_34_04 + mat[1][4] * det2_34_03;
//	float det3_134_123 = mat[1][1] * det2_34_23 - mat[1][2] * det2_34_13 + mat[1][3] * det2_34_12;
//	float det3_134_124 = mat[1][1] * det2_34_24 - mat[1][2] * det2_34_14 + mat[1][4] * det2_34_12;
//	float det3_134_134 = mat[1][1] * det2_34_34 - mat[1][3] * det2_34_14 + mat[1][4] * det2_34_13;
//	float det3_134_234 = mat[1][2] * det2_34_34 - mat[1][3] * det2_34_24 + mat[1][4] * det2_34_23;
//
//	// remaining 4x4 sub-determinants
//	float det4_0123_0123 = mat[0][0] * det3_123_123 - mat[0][1] * det3_123_023 + mat[0][2] * det3_123_013 - mat[0][3] * det3_123_012;
//	float det4_0123_0124 = mat[0][0] * det3_123_124 - mat[0][1] * det3_123_024 + mat[0][2] * det3_123_014 - mat[0][4] * det3_123_012;
//	float det4_0123_0134 = mat[0][0] * det3_123_134 - mat[0][1] * det3_123_034 + mat[0][3] * det3_123_014 - mat[0][4] * det3_123_013;
//	float det4_0123_0234 = mat[0][0] * det3_123_234 - mat[0][2] * det3_123_034 + mat[0][3] * det3_123_024 - mat[0][4] * det3_123_023;
//	float det4_0123_1234 = mat[0][1] * det3_123_234 - mat[0][2] * det3_123_134 + mat[0][3] * det3_123_124 - mat[0][4] * det3_123_123;
//	float det4_0124_0123 = mat[0][0] * det3_124_123 - mat[0][1] * det3_124_023 + mat[0][2] * det3_124_013 - mat[0][3] * det3_124_012;
//	float det4_0124_0124 = mat[0][0] * det3_124_124 - mat[0][1] * det3_124_024 + mat[0][2] * det3_124_014 - mat[0][4] * det3_124_012;
//	float det4_0124_0134 = mat[0][0] * det3_124_134 - mat[0][1] * det3_124_034 + mat[0][3] * det3_124_014 - mat[0][4] * det3_124_013;
//	float det4_0124_0234 = mat[0][0] * det3_124_234 - mat[0][2] * det3_124_034 + mat[0][3] * det3_124_024 - mat[0][4] * det3_124_023;
//	float det4_0124_1234 = mat[0][1] * det3_124_234 - mat[0][2] * det3_124_134 + mat[0][3] * det3_124_124 - mat[0][4] * det3_124_123;
//	float det4_0134_0123 = mat[0][0] * det3_134_123 - mat[0][1] * det3_134_023 + mat[0][2] * det3_134_013 - mat[0][3] * det3_134_012;
//	float det4_0134_0124 = mat[0][0] * det3_134_124 - mat[0][1] * det3_134_024 + mat[0][2] * det3_134_014 - mat[0][4] * det3_134_012;
//	float det4_0134_0134 = mat[0][0] * det3_134_134 - mat[0][1] * det3_134_034 + mat[0][3] * det3_134_014 - mat[0][4] * det3_134_013;
//	float det4_0134_0234 = mat[0][0] * det3_134_234 - mat[0][2] * det3_134_034 + mat[0][3] * det3_134_024 - mat[0][4] * det3_134_023;
//	float det4_0134_1234 = mat[0][1] * det3_134_234 - mat[0][2] * det3_134_134 + mat[0][3] * det3_134_124 - mat[0][4] * det3_134_123;
//	float det4_0234_0123 = mat[0][0] * det3_234_123 - mat[0][1] * det3_234_023 + mat[0][2] * det3_234_013 - mat[0][3] * det3_234_012;
//	float det4_0234_0124 = mat[0][0] * det3_234_124 - mat[0][1] * det3_234_024 + mat[0][2] * det3_234_014 - mat[0][4] * det3_234_012;
//	float det4_0234_0134 = mat[0][0] * det3_234_134 - mat[0][1] * det3_234_034 + mat[0][3] * det3_234_014 - mat[0][4] * det3_234_013;
//	float det4_0234_0234 = mat[0][0] * det3_234_234 - mat[0][2] * det3_234_034 + mat[0][3] * det3_234_024 - mat[0][4] * det3_234_023;
//	float det4_0234_1234 = mat[0][1] * det3_234_234 - mat[0][2] * det3_234_134 + mat[0][3] * det3_234_124 - mat[0][4] * det3_234_123;
//
//	mat[0][0] =  det4_1234_1234 * invDet;
//	mat[0][1] = -det4_0234_1234 * invDet;
//	mat[0][2] =  det4_0134_1234 * invDet;
//	mat[0][3] = -det4_0124_1234 * invDet;
//	mat[0][4] =  det4_0123_1234 * invDet;
//
//	mat[1][0] = -det4_1234_0234 * invDet;
//	mat[1][1] =  det4_0234_0234 * invDet;
//	mat[1][2] = -det4_0134_0234 * invDet;
//	mat[1][3] =  det4_0124_0234 * invDet;
//	mat[1][4] = -det4_0123_0234 * invDet;
//
//	mat[2][0] =  det4_1234_0134 * invDet;
//	mat[2][1] = -det4_0234_0134 * invDet;
//	mat[2][2] =  det4_0134_0134 * invDet;
//	mat[2][3] = -det4_0124_0134 * invDet;
//	mat[2][4] =  det4_0123_0134 * invDet;
//
//	mat[3][0] = -det4_1234_0124 * invDet;
//	mat[3][1] =  det4_0234_0124 * invDet;
//	mat[3][2] = -det4_0134_0124 * invDet;
//	mat[3][3] =  det4_0124_0124 * invDet;
//	mat[3][4] = -det4_0123_0124 * invDet;
//
//	mat[4][0] =  det4_1234_0123 * invDet;
//	mat[4][1] = -det4_0234_0123 * invDet;
//	mat[4][2] =  det4_0134_0123 * invDet;
//	mat[4][3] = -det4_0124_0123 * invDet;
//	mat[4][4] =  det4_0123_0123 * invDet;
//
//	return true;
//}
//
///*
//============
//idMat5::InverseFastSelf
//============
//*/
//bool idMat5::InverseFastSelf( void ) {
//#if 0
//	// 280+5+25 = 310 multiplications
//	//				1 division
//	double det, invDet;
//
//	// 2x2 sub-determinants required to calculate 5x5 determinant
//	float det2_34_01 = mat[3][0] * mat[4][1] - mat[3][1] * mat[4][0];
//	float det2_34_02 = mat[3][0] * mat[4][2] - mat[3][2] * mat[4][0];
//	float det2_34_03 = mat[3][0] * mat[4][3] - mat[3][3] * mat[4][0];
//	float det2_34_04 = mat[3][0] * mat[4][4] - mat[3][4] * mat[4][0];
//	float det2_34_12 = mat[3][1] * mat[4][2] - mat[3][2] * mat[4][1];
//	float det2_34_13 = mat[3][1] * mat[4][3] - mat[3][3] * mat[4][1];
//	float det2_34_14 = mat[3][1] * mat[4][4] - mat[3][4] * mat[4][1];
//	float det2_34_23 = mat[3][2] * mat[4][3] - mat[3][3] * mat[4][2];
//	float det2_34_24 = mat[3][2] * mat[4][4] - mat[3][4] * mat[4][2];
//	float det2_34_34 = mat[3][3] * mat[4][4] - mat[3][4] * mat[4][3];
//
//	// 3x3 sub-determinants required to calculate 5x5 determinant
//	float det3_234_012 = mat[2][0] * det2_34_12 - mat[2][1] * det2_34_02 + mat[2][2] * det2_34_01;
//	float det3_234_013 = mat[2][0] * det2_34_13 - mat[2][1] * det2_34_03 + mat[2][3] * det2_34_01;
//	float det3_234_014 = mat[2][0] * det2_34_14 - mat[2][1] * det2_34_04 + mat[2][4] * det2_34_01;
//	float det3_234_023 = mat[2][0] * det2_34_23 - mat[2][2] * det2_34_03 + mat[2][3] * det2_34_02;
//	float det3_234_024 = mat[2][0] * det2_34_24 - mat[2][2] * det2_34_04 + mat[2][4] * det2_34_02;
//	float det3_234_034 = mat[2][0] * det2_34_34 - mat[2][3] * det2_34_04 + mat[2][4] * det2_34_03;
//	float det3_234_123 = mat[2][1] * det2_34_23 - mat[2][2] * det2_34_13 + mat[2][3] * det2_34_12;
//	float det3_234_124 = mat[2][1] * det2_34_24 - mat[2][2] * det2_34_14 + mat[2][4] * det2_34_12;
//	float det3_234_134 = mat[2][1] * det2_34_34 - mat[2][3] * det2_34_14 + mat[2][4] * det2_34_13;
//	float det3_234_234 = mat[2][2] * det2_34_34 - mat[2][3] * det2_34_24 + mat[2][4] * det2_34_23;
//
//	// 4x4 sub-determinants required to calculate 5x5 determinant
//	float det4_1234_0123 = mat[1][0] * det3_234_123 - mat[1][1] * det3_234_023 + mat[1][2] * det3_234_013 - mat[1][3] * det3_234_012;
//	float det4_1234_0124 = mat[1][0] * det3_234_124 - mat[1][1] * det3_234_024 + mat[1][2] * det3_234_014 - mat[1][4] * det3_234_012;
//	float det4_1234_0134 = mat[1][0] * det3_234_134 - mat[1][1] * det3_234_034 + mat[1][3] * det3_234_014 - mat[1][4] * det3_234_013;
//	float det4_1234_0234 = mat[1][0] * det3_234_234 - mat[1][2] * det3_234_034 + mat[1][3] * det3_234_024 - mat[1][4] * det3_234_023;
//	float det4_1234_1234 = mat[1][1] * det3_234_234 - mat[1][2] * det3_234_134 + mat[1][3] * det3_234_124 - mat[1][4] * det3_234_123;
//
//	// determinant of 5x5 matrix
//	det = mat[0][0] * det4_1234_1234 - mat[0][1] * det4_1234_0234 + mat[0][2] * det4_1234_0134 - mat[0][3] * det4_1234_0124 + mat[0][4] * det4_1234_0123;
//
//	if( idMath::Fabs( det ) < MATRIX_INVERSE_EPSILON ) {  
//		return false;
//	}
//
//	invDet = 1.0f / det;
//
//	// remaining 2x2 sub-determinants
//	float det2_23_01 = mat[2][0] * mat[3][1] - mat[2][1] * mat[3][0];
//	float det2_23_02 = mat[2][0] * mat[3][2] - mat[2][2] * mat[3][0];
//	float det2_23_03 = mat[2][0] * mat[3][3] - mat[2][3] * mat[3][0];
//	float det2_23_04 = mat[2][0] * mat[3][4] - mat[2][4] * mat[3][0];
//	float det2_23_12 = mat[2][1] * mat[3][2] - mat[2][2] * mat[3][1];
//	float det2_23_13 = mat[2][1] * mat[3][3] - mat[2][3] * mat[3][1];
//	float det2_23_14 = mat[2][1] * mat[3][4] - mat[2][4] * mat[3][1];
//	float det2_23_23 = mat[2][2] * mat[3][3] - mat[2][3] * mat[3][2];
//	float det2_23_24 = mat[2][2] * mat[3][4] - mat[2][4] * mat[3][2];
//	float det2_23_34 = mat[2][3] * mat[3][4] - mat[2][4] * mat[3][3];
//	float det2_24_01 = mat[2][0] * mat[4][1] - mat[2][1] * mat[4][0];
//	float det2_24_02 = mat[2][0] * mat[4][2] - mat[2][2] * mat[4][0];
//	float det2_24_03 = mat[2][0] * mat[4][3] - mat[2][3] * mat[4][0];
//	float det2_24_04 = mat[2][0] * mat[4][4] - mat[2][4] * mat[4][0];
//	float det2_24_12 = mat[2][1] * mat[4][2] - mat[2][2] * mat[4][1];
//	float det2_24_13 = mat[2][1] * mat[4][3] - mat[2][3] * mat[4][1];
//	float det2_24_14 = mat[2][1] * mat[4][4] - mat[2][4] * mat[4][1];
//	float det2_24_23 = mat[2][2] * mat[4][3] - mat[2][3] * mat[4][2];
//	float det2_24_24 = mat[2][2] * mat[4][4] - mat[2][4] * mat[4][2];
//	float det2_24_34 = mat[2][3] * mat[4][4] - mat[2][4] * mat[4][3];
//
//	// remaining 3x3 sub-determinants
//	float det3_123_012 = mat[1][0] * det2_23_12 - mat[1][1] * det2_23_02 + mat[1][2] * det2_23_01;
//	float det3_123_013 = mat[1][0] * det2_23_13 - mat[1][1] * det2_23_03 + mat[1][3] * det2_23_01;
//	float det3_123_014 = mat[1][0] * det2_23_14 - mat[1][1] * det2_23_04 + mat[1][4] * det2_23_01;
//	float det3_123_023 = mat[1][0] * det2_23_23 - mat[1][2] * det2_23_03 + mat[1][3] * det2_23_02;
//	float det3_123_024 = mat[1][0] * det2_23_24 - mat[1][2] * det2_23_04 + mat[1][4] * det2_23_02;
//	float det3_123_034 = mat[1][0] * det2_23_34 - mat[1][3] * det2_23_04 + mat[1][4] * det2_23_03;
//	float det3_123_123 = mat[1][1] * det2_23_23 - mat[1][2] * det2_23_13 + mat[1][3] * det2_23_12;
//	float det3_123_124 = mat[1][1] * det2_23_24 - mat[1][2] * det2_23_14 + mat[1][4] * det2_23_12;
//	float det3_123_134 = mat[1][1] * det2_23_34 - mat[1][3] * det2_23_14 + mat[1][4] * det2_23_13;
//	float det3_123_234 = mat[1][2] * det2_23_34 - mat[1][3] * det2_23_24 + mat[1][4] * det2_23_23;
//	float det3_124_012 = mat[1][0] * det2_24_12 - mat[1][1] * det2_24_02 + mat[1][2] * det2_24_01;
//	float det3_124_013 = mat[1][0] * det2_24_13 - mat[1][1] * det2_24_03 + mat[1][3] * det2_24_01;
//	float det3_124_014 = mat[1][0] * det2_24_14 - mat[1][1] * det2_24_04 + mat[1][4] * det2_24_01;
//	float det3_124_023 = mat[1][0] * det2_24_23 - mat[1][2] * det2_24_03 + mat[1][3] * det2_24_02;
//	float det3_124_024 = mat[1][0] * det2_24_24 - mat[1][2] * det2_24_04 + mat[1][4] * det2_24_02;
//	float det3_124_034 = mat[1][0] * det2_24_34 - mat[1][3] * det2_24_04 + mat[1][4] * det2_24_03;
//	float det3_124_123 = mat[1][1] * det2_24_23 - mat[1][2] * det2_24_13 + mat[1][3] * det2_24_12;
//	float det3_124_124 = mat[1][1] * det2_24_24 - mat[1][2] * det2_24_14 + mat[1][4] * det2_24_12;
//	float det3_124_134 = mat[1][1] * det2_24_34 - mat[1][3] * det2_24_14 + mat[1][4] * det2_24_13;
//	float det3_124_234 = mat[1][2] * det2_24_34 - mat[1][3] * det2_24_24 + mat[1][4] * det2_24_23;
//	float det3_134_012 = mat[1][0] * det2_34_12 - mat[1][1] * det2_34_02 + mat[1][2] * det2_34_01;
//	float det3_134_013 = mat[1][0] * det2_34_13 - mat[1][1] * det2_34_03 + mat[1][3] * det2_34_01;
//	float det3_134_014 = mat[1][0] * det2_34_14 - mat[1][1] * det2_34_04 + mat[1][4] * det2_34_01;
//	float det3_134_023 = mat[1][0] * det2_34_23 - mat[1][2] * det2_34_03 + mat[1][3] * det2_34_02;
//	float det3_134_024 = mat[1][0] * det2_34_24 - mat[1][2] * det2_34_04 + mat[1][4] * det2_34_02;
//	float det3_134_034 = mat[1][0] * det2_34_34 - mat[1][3] * det2_34_04 + mat[1][4] * det2_34_03;
//	float det3_134_123 = mat[1][1] * det2_34_23 - mat[1][2] * det2_34_13 + mat[1][3] * det2_34_12;
//	float det3_134_124 = mat[1][1] * det2_34_24 - mat[1][2] * det2_34_14 + mat[1][4] * det2_34_12;
//	float det3_134_134 = mat[1][1] * det2_34_34 - mat[1][3] * det2_34_14 + mat[1][4] * det2_34_13;
//	float det3_134_234 = mat[1][2] * det2_34_34 - mat[1][3] * det2_34_24 + mat[1][4] * det2_34_23;
//
//	// remaining 4x4 sub-determinants
//	float det4_0123_0123 = mat[0][0] * det3_123_123 - mat[0][1] * det3_123_023 + mat[0][2] * det3_123_013 - mat[0][3] * det3_123_012;
//	float det4_0123_0124 = mat[0][0] * det3_123_124 - mat[0][1] * det3_123_024 + mat[0][2] * det3_123_014 - mat[0][4] * det3_123_012;
//	float det4_0123_0134 = mat[0][0] * det3_123_134 - mat[0][1] * det3_123_034 + mat[0][3] * det3_123_014 - mat[0][4] * det3_123_013;
//	float det4_0123_0234 = mat[0][0] * det3_123_234 - mat[0][2] * det3_123_034 + mat[0][3] * det3_123_024 - mat[0][4] * det3_123_023;
//	float det4_0123_1234 = mat[0][1] * det3_123_234 - mat[0][2] * det3_123_134 + mat[0][3] * det3_123_124 - mat[0][4] * det3_123_123;
//	float det4_0124_0123 = mat[0][0] * det3_124_123 - mat[0][1] * det3_124_023 + mat[0][2] * det3_124_013 - mat[0][3] * det3_124_012;
//	float det4_0124_0124 = mat[0][0] * det3_124_124 - mat[0][1] * det3_124_024 + mat[0][2] * det3_124_014 - mat[0][4] * det3_124_012;
//	float det4_0124_0134 = mat[0][0] * det3_124_134 - mat[0][1] * det3_124_034 + mat[0][3] * det3_124_014 - mat[0][4] * det3_124_013;
//	float det4_0124_0234 = mat[0][0] * det3_124_234 - mat[0][2] * det3_124_034 + mat[0][3] * det3_124_024 - mat[0][4] * det3_124_023;
//	float det4_0124_1234 = mat[0][1] * det3_124_234 - mat[0][2] * det3_124_134 + mat[0][3] * det3_124_124 - mat[0][4] * det3_124_123;
//	float det4_0134_0123 = mat[0][0] * det3_134_123 - mat[0][1] * det3_134_023 + mat[0][2] * det3_134_013 - mat[0][3] * det3_134_012;
//	float det4_0134_0124 = mat[0][0] * det3_134_124 - mat[0][1] * det3_134_024 + mat[0][2] * det3_134_014 - mat[0][4] * det3_134_012;
//	float det4_0134_0134 = mat[0][0] * det3_134_134 - mat[0][1] * det3_134_034 + mat[0][3] * det3_134_014 - mat[0][4] * det3_134_013;
//	float det4_0134_0234 = mat[0][0] * det3_134_234 - mat[0][2] * det3_134_034 + mat[0][3] * det3_134_024 - mat[0][4] * det3_134_023;
//	float det4_0134_1234 = mat[0][1] * det3_134_234 - mat[0][2] * det3_134_134 + mat[0][3] * det3_134_124 - mat[0][4] * det3_134_123;
//	float det4_0234_0123 = mat[0][0] * det3_234_123 - mat[0][1] * det3_234_023 + mat[0][2] * det3_234_013 - mat[0][3] * det3_234_012;
//	float det4_0234_0124 = mat[0][0] * det3_234_124 - mat[0][1] * det3_234_024 + mat[0][2] * det3_234_014 - mat[0][4] * det3_234_012;
//	float det4_0234_0134 = mat[0][0] * det3_234_134 - mat[0][1] * det3_234_034 + mat[0][3] * det3_234_014 - mat[0][4] * det3_234_013;
//	float det4_0234_0234 = mat[0][0] * det3_234_234 - mat[0][2] * det3_234_034 + mat[0][3] * det3_234_024 - mat[0][4] * det3_234_023;
//	float det4_0234_1234 = mat[0][1] * det3_234_234 - mat[0][2] * det3_234_134 + mat[0][3] * det3_234_124 - mat[0][4] * det3_234_123;
//
//	mat[0][0] =  det4_1234_1234 * invDet;
//	mat[0][1] = -det4_0234_1234 * invDet;
//	mat[0][2] =  det4_0134_1234 * invDet;
//	mat[0][3] = -det4_0124_1234 * invDet;
//	mat[0][4] =  det4_0123_1234 * invDet;
//
//	mat[1][0] = -det4_1234_0234 * invDet;
//	mat[1][1] =  det4_0234_0234 * invDet;
//	mat[1][2] = -det4_0134_0234 * invDet;
//	mat[1][3] =  det4_0124_0234 * invDet;
//	mat[1][4] = -det4_0123_0234 * invDet;
//
//	mat[2][0] =  det4_1234_0134 * invDet;
//	mat[2][1] = -det4_0234_0134 * invDet;
//	mat[2][2] =  det4_0134_0134 * invDet;
//	mat[2][3] = -det4_0124_0134 * invDet;
//	mat[2][4] =  det4_0123_0134 * invDet;
//
//	mat[3][0] = -det4_1234_0124 * invDet;
//	mat[3][1] =  det4_0234_0124 * invDet;
//	mat[3][2] = -det4_0134_0124 * invDet;
//	mat[3][3] =  det4_0124_0124 * invDet;
//	mat[3][4] = -det4_0123_0124 * invDet;
//
//	mat[4][0] =  det4_1234_0123 * invDet;
//	mat[4][1] = -det4_0234_0123 * invDet;
//	mat[4][2] =  det4_0134_0123 * invDet;
//	mat[4][3] = -det4_0124_0123 * invDet;
//	mat[4][4] =  det4_0123_0123 * invDet;
//
//	return true;
//#elif 0
//	// 5*28 = 140 multiplications
//	//			5 divisions
//	float *mat = reinterpret_cast<float *>(this);
//	float s;
//	double d, di;
//
//	di = mat[0];
//	s = di;
//	mat[0] = d = 1.0f / di;
//	mat[1] *= d;
//	mat[2] *= d;
//	mat[3] *= d;
//	mat[4] *= d;
//	d = -d;
//	mat[5] *= d;
//	mat[10] *= d;
//	mat[15] *= d;
//	mat[20] *= d;
//	d = mat[5] * di;
//	mat[6] += mat[1] * d;
//	mat[7] += mat[2] * d;
//	mat[8] += mat[3] * d;
//	mat[9] += mat[4] * d;
//	d = mat[10] * di;
//	mat[11] += mat[1] * d;
//	mat[12] += mat[2] * d;
//	mat[13] += mat[3] * d;
//	mat[14] += mat[4] * d;
//	d = mat[15] * di;
//	mat[16] += mat[1] * d;
//	mat[17] += mat[2] * d;
//	mat[18] += mat[3] * d;
//	mat[19] += mat[4] * d;
//	d = mat[20] * di;
//	mat[21] += mat[1] * d;
//	mat[22] += mat[2] * d;
//	mat[23] += mat[3] * d;
//	mat[24] += mat[4] * d;
//	di = mat[6];
//	s *= di;
//	mat[6] = d = 1.0f / di;
//	mat[5] *= d;
//	mat[7] *= d;
//	mat[8] *= d;
//	mat[9] *= d;
//	d = -d;
//	mat[1] *= d;
//	mat[11] *= d;
//	mat[16] *= d;
//	mat[21] *= d;
//	d = mat[1] * di;
//	mat[0] += mat[5] * d;
//	mat[2] += mat[7] * d;
//	mat[3] += mat[8] * d;
//	mat[4] += mat[9] * d;
//	d = mat[11] * di;
//	mat[10] += mat[5] * d;
//	mat[12] += mat[7] * d;
//	mat[13] += mat[8] * d;
//	mat[14] += mat[9] * d;
//	d = mat[16] * di;
//	mat[15] += mat[5] * d;
//	mat[17] += mat[7] * d;
//	mat[18] += mat[8] * d;
//	mat[19] += mat[9] * d;
//	d = mat[21] * di;
//	mat[20] += mat[5] * d;
//	mat[22] += mat[7] * d;
//	mat[23] += mat[8] * d;
//	mat[24] += mat[9] * d;
//	di = mat[12];
//	s *= di;
//	mat[12] = d = 1.0f / di;
//	mat[10] *= d;
//	mat[11] *= d;
//	mat[13] *= d;
//	mat[14] *= d;
//	d = -d;
//	mat[2] *= d;
//	mat[7] *= d;
//	mat[17] *= d;
//	mat[22] *= d;
//	d = mat[2] * di;
//	mat[0] += mat[10] * d;
//	mat[1] += mat[11] * d;
//	mat[3] += mat[13] * d;
//	mat[4] += mat[14] * d;
//	d = mat[7] * di;
//	mat[5] += mat[10] * d;
//	mat[6] += mat[11] * d;
//	mat[8] += mat[13] * d;
//	mat[9] += mat[14] * d;
//	d = mat[17] * di;
//	mat[15] += mat[10] * d;
//	mat[16] += mat[11] * d;
//	mat[18] += mat[13] * d;
//	mat[19] += mat[14] * d;
//	d = mat[22] * di;
//	mat[20] += mat[10] * d;
//	mat[21] += mat[11] * d;
//	mat[23] += mat[13] * d;
//	mat[24] += mat[14] * d;
//	di = mat[18];
//	s *= di;
//	mat[18] = d = 1.0f / di;
//	mat[15] *= d;
//	mat[16] *= d;
//	mat[17] *= d;
//	mat[19] *= d;
//	d = -d;
//	mat[3] *= d;
//	mat[8] *= d;
//	mat[13] *= d;
//	mat[23] *= d;
//	d = mat[3] * di;
//	mat[0] += mat[15] * d;
//	mat[1] += mat[16] * d;
//	mat[2] += mat[17] * d;
//	mat[4] += mat[19] * d;
//	d = mat[8] * di;
//	mat[5] += mat[15] * d;
//	mat[6] += mat[16] * d;
//	mat[7] += mat[17] * d;
//	mat[9] += mat[19] * d;
//	d = mat[13] * di;
//	mat[10] += mat[15] * d;
//	mat[11] += mat[16] * d;
//	mat[12] += mat[17] * d;
//	mat[14] += mat[19] * d;
//	d = mat[23] * di;
//	mat[20] += mat[15] * d;
//	mat[21] += mat[16] * d;
//	mat[22] += mat[17] * d;
//	mat[24] += mat[19] * d;
//	di = mat[24];
//	s *= di;
//	mat[24] = d = 1.0f / di;
//	mat[20] *= d;
//	mat[21] *= d;
//	mat[22] *= d;
//	mat[23] *= d;
//	d = -d;
//	mat[4] *= d;
//	mat[9] *= d;
//	mat[14] *= d;
//	mat[19] *= d;
//	d = mat[4] * di;
//	mat[0] += mat[20] * d;
//	mat[1] += mat[21] * d;
//	mat[2] += mat[22] * d;
//	mat[3] += mat[23] * d;
//	d = mat[9] * di;
//	mat[5] += mat[20] * d;
//	mat[6] += mat[21] * d;
//	mat[7] += mat[22] * d;
//	mat[8] += mat[23] * d;
//	d = mat[14] * di;
//	mat[10] += mat[20] * d;
//	mat[11] += mat[21] * d;
//	mat[12] += mat[22] * d;
//	mat[13] += mat[23] * d;
//	d = mat[19] * di;
//	mat[15] += mat[20] * d;
//	mat[16] += mat[21] * d;
//	mat[17] += mat[22] * d;
//	mat[18] += mat[23] * d;
//
//	return ( s != 0.0f && !FLOAT_IS_NAN( s ) );
//#else
//	// 86+30+6 = 122 multiplications
//	//	  2*1  =   2 divisions
//	idMat3 r0, r1, r2, r3;
//	float c0, c1, c2, det, invDet;
//	float *mat = reinterpret_cast<float *>(this);
//
//	// r0 = m0.Inverse();	// 3x3
//	c0 = mat[1*5+1] * mat[2*5+2] - mat[1*5+2] * mat[2*5+1];
//	c1 = mat[1*5+2] * mat[2*5+0] - mat[1*5+0] * mat[2*5+2];
//	c2 = mat[1*5+0] * mat[2*5+1] - mat[1*5+1] * mat[2*5+0];
//
//	det = mat[0*5+0] * c0 + mat[0*5+1] * c1 + mat[0*5+2] * c2;
//
//	if ( idMath::Fabs( det ) < MATRIX_INVERSE_EPSILON ) {
//		return false;
//	}
//
//	invDet = 1.0f / det;
//
//	r0[0][0] = c0 * invDet;
//	r0[0][1] = ( mat[0*5+2] * mat[2*5+1] - mat[0*5+1] * mat[2*5+2] ) * invDet;
//	r0[0][2] = ( mat[0*5+1] * mat[1*5+2] - mat[0*5+2] * mat[1*5+1] ) * invDet;
//	r0[1][0] = c1 * invDet;
//	r0[1][1] = ( mat[0*5+0] * mat[2*5+2] - mat[0*5+2] * mat[2*5+0] ) * invDet;
//	r0[1][2] = ( mat[0*5+2] * mat[1*5+0] - mat[0*5+0] * mat[1*5+2] ) * invDet;
//	r0[2][0] = c2 * invDet;
//	r0[2][1] = ( mat[0*5+1] * mat[2*5+0] - mat[0*5+0] * mat[2*5+1] ) * invDet;
//	r0[2][2] = ( mat[0*5+0] * mat[1*5+1] - mat[0*5+1] * mat[1*5+0] ) * invDet;
//
//	// r1 = r0 * m1;		// 3x2 = 3x3 * 3x2
//	r1[0][0] = r0[0][0] * mat[0*5+3] + r0[0][1] * mat[1*5+3] + r0[0][2] * mat[2*5+3];
//	r1[0][1] = r0[0][0] * mat[0*5+4] + r0[0][1] * mat[1*5+4] + r0[0][2] * mat[2*5+4];
//	r1[1][0] = r0[1][0] * mat[0*5+3] + r0[1][1] * mat[1*5+3] + r0[1][2] * mat[2*5+3];
//	r1[1][1] = r0[1][0] * mat[0*5+4] + r0[1][1] * mat[1*5+4] + r0[1][2] * mat[2*5+4];
//	r1[2][0] = r0[2][0] * mat[0*5+3] + r0[2][1] * mat[1*5+3] + r0[2][2] * mat[2*5+3];
//	r1[2][1] = r0[2][0] * mat[0*5+4] + r0[2][1] * mat[1*5+4] + r0[2][2] * mat[2*5+4];
//
//	// r2 = m2 * r1;		// 2x2 = 2x3 * 3x2
//	r2[0][0] = mat[3*5+0] * r1[0][0] + mat[3*5+1] * r1[1][0] + mat[3*5+2] * r1[2][0];
//	r2[0][1] = mat[3*5+0] * r1[0][1] + mat[3*5+1] * r1[1][1] + mat[3*5+2] * r1[2][1];
//	r2[1][0] = mat[4*5+0] * r1[0][0] + mat[4*5+1] * r1[1][0] + mat[4*5+2] * r1[2][0];
//	r2[1][1] = mat[4*5+0] * r1[0][1] + mat[4*5+1] * r1[1][1] + mat[4*5+2] * r1[2][1];
//
//	// r3 = r2 - m3;		// 2x2 = 2x2 - 2x2
//	r3[0][0] = r2[0][0] - mat[3*5+3];
//	r3[0][1] = r2[0][1] - mat[3*5+4];
//	r3[1][0] = r2[1][0] - mat[4*5+3];
//	r3[1][1] = r2[1][1] - mat[4*5+4];
//
//	// r3.InverseSelf();	// 2x2
//	det = r3[0][0] * r3[1][1] - r3[0][1] * r3[1][0];
//
//	if ( idMath::Fabs( det ) < MATRIX_INVERSE_EPSILON ) {
//		return false;
//	}
//
//	invDet = 1.0f / det;
//
//	c0 = r3[0][0];
//	r3[0][0] =   r3[1][1] * invDet;
//	r3[0][1] = - r3[0][1] * invDet;
//	r3[1][0] = - r3[1][0] * invDet;
//	r3[1][1] =   c0 * invDet;
//
//	// r2 = m2 * r0;		// 2x3 = 2x3 * 3x3
//	r2[0][0] = mat[3*5+0] * r0[0][0] + mat[3*5+1] * r0[1][0] + mat[3*5+2] * r0[2][0];
//	r2[0][1] = mat[3*5+0] * r0[0][1] + mat[3*5+1] * r0[1][1] + mat[3*5+2] * r0[2][1];
//	r2[0][2] = mat[3*5+0] * r0[0][2] + mat[3*5+1] * r0[1][2] + mat[3*5+2] * r0[2][2];
//	r2[1][0] = mat[4*5+0] * r0[0][0] + mat[4*5+1] * r0[1][0] + mat[4*5+2] * r0[2][0];
//	r2[1][1] = mat[4*5+0] * r0[0][1] + mat[4*5+1] * r0[1][1] + mat[4*5+2] * r0[2][1];
//	r2[1][2] = mat[4*5+0] * r0[0][2] + mat[4*5+1] * r0[1][2] + mat[4*5+2] * r0[2][2];
//
//	// m2 = r3 * r2;		// 2x3 = 2x2 * 2x3
//	mat[3*5+0] = r3[0][0] * r2[0][0] + r3[0][1] * r2[1][0];
//	mat[3*5+1] = r3[0][0] * r2[0][1] + r3[0][1] * r2[1][1];
//	mat[3*5+2] = r3[0][0] * r2[0][2] + r3[0][1] * r2[1][2];
//	mat[4*5+0] = r3[1][0] * r2[0][0] + r3[1][1] * r2[1][0];
//	mat[4*5+1] = r3[1][0] * r2[0][1] + r3[1][1] * r2[1][1];
//	mat[4*5+2] = r3[1][0] * r2[0][2] + r3[1][1] * r2[1][2];
//
//	// m0 = r0 - r1 * m2;	// 3x3 = 3x3 - 3x2 * 2x3
//	mat[0*5+0] = r0[0][0] - r1[0][0] * mat[3*5+0] - r1[0][1] * mat[4*5+0];
//	mat[0*5+1] = r0[0][1] - r1[0][0] * mat[3*5+1] - r1[0][1] * mat[4*5+1];
//	mat[0*5+2] = r0[0][2] - r1[0][0] * mat[3*5+2] - r1[0][1] * mat[4*5+2];
//	mat[1*5+0] = r0[1][0] - r1[1][0] * mat[3*5+0] - r1[1][1] * mat[4*5+0];
//	mat[1*5+1] = r0[1][1] - r1[1][0] * mat[3*5+1] - r1[1][1] * mat[4*5+1];
//	mat[1*5+2] = r0[1][2] - r1[1][0] * mat[3*5+2] - r1[1][1] * mat[4*5+2];
//	mat[2*5+0] = r0[2][0] - r1[2][0] * mat[3*5+0] - r1[2][1] * mat[4*5+0];
//	mat[2*5+1] = r0[2][1] - r1[2][0] * mat[3*5+1] - r1[2][1] * mat[4*5+1];
//	mat[2*5+2] = r0[2][2] - r1[2][0] * mat[3*5+2] - r1[2][1] * mat[4*5+2];
//
//	// m1 = r1 * r3;		// 3x2 = 3x2 * 2x2
//	mat[0*5+3] = r1[0][0] * r3[0][0] + r1[0][1] * r3[1][0];
//	mat[0*5+4] = r1[0][0] * r3[0][1] + r1[0][1] * r3[1][1];
//	mat[1*5+3] = r1[1][0] * r3[0][0] + r1[1][1] * r3[1][0];
//	mat[1*5+4] = r1[1][0] * r3[0][1] + r1[1][1] * r3[1][1];
//	mat[2*5+3] = r1[2][0] * r3[0][0] + r1[2][1] * r3[1][0];
//	mat[2*5+4] = r1[2][0] * r3[0][1] + r1[2][1] * r3[1][1];
//
//	// m3 = -r3;			// 2x2 = - 2x2
//	mat[3*5+3] = -r3[0][0];
//	mat[3*5+4] = -r3[0][1];
//	mat[4*5+3] = -r3[1][0];
//	mat[4*5+4] = -r3[1][1];
//
//	return true;
//#endif
//}
//
///*
//=============
//idMat5::ToString
//=============
//*/
//const char *idMat5::ToString( int precision ) const {
//	return idStr.FloatArrayToString( ToFloatPtr(), GetDimension(), precision );
//}
//
//
////===============================================================
////
////	idMat6
////
////===============================================================
//
//idMat6 mat6_zero( idVec6( 0, 0, 0, 0, 0, 0 ), idVec6( 0, 0, 0, 0, 0, 0 ), idVec6( 0, 0, 0, 0, 0, 0 ), idVec6( 0, 0, 0, 0, 0, 0 ), idVec6( 0, 0, 0, 0, 0, 0 ), idVec6( 0, 0, 0, 0, 0, 0 ) );
//idMat6 mat6_identity( idVec6( 1, 0, 0, 0, 0, 0 ), idVec6( 0, 1, 0, 0, 0, 0 ), idVec6( 0, 0, 1, 0, 0, 0 ), idVec6( 0, 0, 0, 1, 0, 0 ), idVec6( 0, 0, 0, 0, 1, 0 ), idVec6( 0, 0, 0, 0, 0, 1 ) );
//
///*
//============
//idMat6::Transpose
//============
//*/
//idMat6 idMat6::Transpose( void ) const {
//	idMat6	transpose;
//	int		i, j;
//   
//	for( i = 0; i < 6; i++ ) {
//		for( j = 0; j < 6; j++ ) {
//			transpose[ i ][ j ] = mat[ j ][ i ];
//        }
//	}
//	return transpose;
//}
//
///*
//============
//idMat6::TransposeSelf
//============
//*/
//idMat6 &idMat6::TransposeSelf( void ) {
//	float	temp;
//	int		i, j;
//   
//	for( i = 0; i < 6; i++ ) {
//		for( j = i + 1; j < 6; j++ ) {
//			temp = mat[ i ][ j ];
//			mat[ i ][ j ] = mat[ j ][ i ];
//			mat[ j ][ i ] = temp;
//        }
//	}
//	return *this;
//}
//
///*
//============
//idMat6::Determinant
//============
//*/
//float idMat6::Determinant( void ) const {
//
//	// 2x2 sub-determinants required to calculate 6x6 determinant
//	float det2_45_01 = mat[4][0] * mat[5][1] - mat[4][1] * mat[5][0];
//	float det2_45_02 = mat[4][0] * mat[5][2] - mat[4][2] * mat[5][0];
//	float det2_45_03 = mat[4][0] * mat[5][3] - mat[4][3] * mat[5][0];
//	float det2_45_04 = mat[4][0] * mat[5][4] - mat[4][4] * mat[5][0];
//	float det2_45_05 = mat[4][0] * mat[5][5] - mat[4][5] * mat[5][0];
//	float det2_45_12 = mat[4][1] * mat[5][2] - mat[4][2] * mat[5][1];
//	float det2_45_13 = mat[4][1] * mat[5][3] - mat[4][3] * mat[5][1];
//	float det2_45_14 = mat[4][1] * mat[5][4] - mat[4][4] * mat[5][1];
//	float det2_45_15 = mat[4][1] * mat[5][5] - mat[4][5] * mat[5][1];
//	float det2_45_23 = mat[4][2] * mat[5][3] - mat[4][3] * mat[5][2];
//	float det2_45_24 = mat[4][2] * mat[5][4] - mat[4][4] * mat[5][2];
//	float det2_45_25 = mat[4][2] * mat[5][5] - mat[4][5] * mat[5][2];
//	float det2_45_34 = mat[4][3] * mat[5][4] - mat[4][4] * mat[5][3];
//	float det2_45_35 = mat[4][3] * mat[5][5] - mat[4][5] * mat[5][3];
//	float det2_45_45 = mat[4][4] * mat[5][5] - mat[4][5] * mat[5][4];
//
//	// 3x3 sub-determinants required to calculate 6x6 determinant
//	float det3_345_012 = mat[3][0] * det2_45_12 - mat[3][1] * det2_45_02 + mat[3][2] * det2_45_01;
//	float det3_345_013 = mat[3][0] * det2_45_13 - mat[3][1] * det2_45_03 + mat[3][3] * det2_45_01;
//	float det3_345_014 = mat[3][0] * det2_45_14 - mat[3][1] * det2_45_04 + mat[3][4] * det2_45_01;
//	float det3_345_015 = mat[3][0] * det2_45_15 - mat[3][1] * det2_45_05 + mat[3][5] * det2_45_01;
//	float det3_345_023 = mat[3][0] * det2_45_23 - mat[3][2] * det2_45_03 + mat[3][3] * det2_45_02;
//	float det3_345_024 = mat[3][0] * det2_45_24 - mat[3][2] * det2_45_04 + mat[3][4] * det2_45_02;
//	float det3_345_025 = mat[3][0] * det2_45_25 - mat[3][2] * det2_45_05 + mat[3][5] * det2_45_02;
//	float det3_345_034 = mat[3][0] * det2_45_34 - mat[3][3] * det2_45_04 + mat[3][4] * det2_45_03;
//	float det3_345_035 = mat[3][0] * det2_45_35 - mat[3][3] * det2_45_05 + mat[3][5] * det2_45_03;
//	float det3_345_045 = mat[3][0] * det2_45_45 - mat[3][4] * det2_45_05 + mat[3][5] * det2_45_04;
//	float det3_345_123 = mat[3][1] * det2_45_23 - mat[3][2] * det2_45_13 + mat[3][3] * det2_45_12;
//	float det3_345_124 = mat[3][1] * det2_45_24 - mat[3][2] * det2_45_14 + mat[3][4] * det2_45_12;
//	float det3_345_125 = mat[3][1] * det2_45_25 - mat[3][2] * det2_45_15 + mat[3][5] * det2_45_12;
//	float det3_345_134 = mat[3][1] * det2_45_34 - mat[3][3] * det2_45_14 + mat[3][4] * det2_45_13;
//	float det3_345_135 = mat[3][1] * det2_45_35 - mat[3][3] * det2_45_15 + mat[3][5] * det2_45_13;
//	float det3_345_145 = mat[3][1] * det2_45_45 - mat[3][4] * det2_45_15 + mat[3][5] * det2_45_14;
//	float det3_345_234 = mat[3][2] * det2_45_34 - mat[3][3] * det2_45_24 + mat[3][4] * det2_45_23;
//	float det3_345_235 = mat[3][2] * det2_45_35 - mat[3][3] * det2_45_25 + mat[3][5] * det2_45_23;
//	float det3_345_245 = mat[3][2] * det2_45_45 - mat[3][4] * det2_45_25 + mat[3][5] * det2_45_24;
//	float det3_345_345 = mat[3][3] * det2_45_45 - mat[3][4] * det2_45_35 + mat[3][5] * det2_45_34;
//
//	// 4x4 sub-determinants required to calculate 6x6 determinant
//	float det4_2345_0123 = mat[2][0] * det3_345_123 - mat[2][1] * det3_345_023 + mat[2][2] * det3_345_013 - mat[2][3] * det3_345_012;
//	float det4_2345_0124 = mat[2][0] * det3_345_124 - mat[2][1] * det3_345_024 + mat[2][2] * det3_345_014 - mat[2][4] * det3_345_012;
//	float det4_2345_0125 = mat[2][0] * det3_345_125 - mat[2][1] * det3_345_025 + mat[2][2] * det3_345_015 - mat[2][5] * det3_345_012;
//	float det4_2345_0134 = mat[2][0] * det3_345_134 - mat[2][1] * det3_345_034 + mat[2][3] * det3_345_014 - mat[2][4] * det3_345_013;
//	float det4_2345_0135 = mat[2][0] * det3_345_135 - mat[2][1] * det3_345_035 + mat[2][3] * det3_345_015 - mat[2][5] * det3_345_013;
//	float det4_2345_0145 = mat[2][0] * det3_345_145 - mat[2][1] * det3_345_045 + mat[2][4] * det3_345_015 - mat[2][5] * det3_345_014;
//	float det4_2345_0234 = mat[2][0] * det3_345_234 - mat[2][2] * det3_345_034 + mat[2][3] * det3_345_024 - mat[2][4] * det3_345_023;
//	float det4_2345_0235 = mat[2][0] * det3_345_235 - mat[2][2] * det3_345_035 + mat[2][3] * det3_345_025 - mat[2][5] * det3_345_023;
//	float det4_2345_0245 = mat[2][0] * det3_345_245 - mat[2][2] * det3_345_045 + mat[2][4] * det3_345_025 - mat[2][5] * det3_345_024;
//	float det4_2345_0345 = mat[2][0] * det3_345_345 - mat[2][3] * det3_345_045 + mat[2][4] * det3_345_035 - mat[2][5] * det3_345_034;
//	float det4_2345_1234 = mat[2][1] * det3_345_234 - mat[2][2] * det3_345_134 + mat[2][3] * det3_345_124 - mat[2][4] * det3_345_123;
//	float det4_2345_1235 = mat[2][1] * det3_345_235 - mat[2][2] * det3_345_135 + mat[2][3] * det3_345_125 - mat[2][5] * det3_345_123;
//	float det4_2345_1245 = mat[2][1] * det3_345_245 - mat[2][2] * det3_345_145 + mat[2][4] * det3_345_125 - mat[2][5] * det3_345_124;
//	float det4_2345_1345 = mat[2][1] * det3_345_345 - mat[2][3] * det3_345_145 + mat[2][4] * det3_345_135 - mat[2][5] * det3_345_134;
//	float det4_2345_2345 = mat[2][2] * det3_345_345 - mat[2][3] * det3_345_245 + mat[2][4] * det3_345_235 - mat[2][5] * det3_345_234;
//
//	// 5x5 sub-determinants required to calculate 6x6 determinant
//	float det5_12345_01234 = mat[1][0] * det4_2345_1234 - mat[1][1] * det4_2345_0234 + mat[1][2] * det4_2345_0134 - mat[1][3] * det4_2345_0124 + mat[1][4] * det4_2345_0123;
//	float det5_12345_01235 = mat[1][0] * det4_2345_1235 - mat[1][1] * det4_2345_0235 + mat[1][2] * det4_2345_0135 - mat[1][3] * det4_2345_0125 + mat[1][5] * det4_2345_0123;
//	float det5_12345_01245 = mat[1][0] * det4_2345_1245 - mat[1][1] * det4_2345_0245 + mat[1][2] * det4_2345_0145 - mat[1][4] * det4_2345_0125 + mat[1][5] * det4_2345_0124;
//	float det5_12345_01345 = mat[1][0] * det4_2345_1345 - mat[1][1] * det4_2345_0345 + mat[1][3] * det4_2345_0145 - mat[1][4] * det4_2345_0135 + mat[1][5] * det4_2345_0134;
//	float det5_12345_02345 = mat[1][0] * det4_2345_2345 - mat[1][2] * det4_2345_0345 + mat[1][3] * det4_2345_0245 - mat[1][4] * det4_2345_0235 + mat[1][5] * det4_2345_0234;
//	float det5_12345_12345 = mat[1][1] * det4_2345_2345 - mat[1][2] * det4_2345_1345 + mat[1][3] * det4_2345_1245 - mat[1][4] * det4_2345_1235 + mat[1][5] * det4_2345_1234;
//
//	// determinant of 6x6 matrix
//	return	mat[0][0] * det5_12345_12345 - mat[0][1] * det5_12345_02345 + mat[0][2] * det5_12345_01345 -
//			mat[0][3] * det5_12345_01245 + mat[0][4] * det5_12345_01235 - mat[0][5] * det5_12345_01234;
//}
//
///*
//============
//idMat6::InverseSelf
//============
//*/
//bool idMat6::InverseSelf( void ) {
//	// 810+6+36 = 852 multiplications
//	//				1 division
//	double det, invDet;
//
//	// 2x2 sub-determinants required to calculate 6x6 determinant
//	float det2_45_01 = mat[4][0] * mat[5][1] - mat[4][1] * mat[5][0];
//	float det2_45_02 = mat[4][0] * mat[5][2] - mat[4][2] * mat[5][0];
//	float det2_45_03 = mat[4][0] * mat[5][3] - mat[4][3] * mat[5][0];
//	float det2_45_04 = mat[4][0] * mat[5][4] - mat[4][4] * mat[5][0];
//	float det2_45_05 = mat[4][0] * mat[5][5] - mat[4][5] * mat[5][0];
//	float det2_45_12 = mat[4][1] * mat[5][2] - mat[4][2] * mat[5][1];
//	float det2_45_13 = mat[4][1] * mat[5][3] - mat[4][3] * mat[5][1];
//	float det2_45_14 = mat[4][1] * mat[5][4] - mat[4][4] * mat[5][1];
//	float det2_45_15 = mat[4][1] * mat[5][5] - mat[4][5] * mat[5][1];
//	float det2_45_23 = mat[4][2] * mat[5][3] - mat[4][3] * mat[5][2];
//	float det2_45_24 = mat[4][2] * mat[5][4] - mat[4][4] * mat[5][2];
//	float det2_45_25 = mat[4][2] * mat[5][5] - mat[4][5] * mat[5][2];
//	float det2_45_34 = mat[4][3] * mat[5][4] - mat[4][4] * mat[5][3];
//	float det2_45_35 = mat[4][3] * mat[5][5] - mat[4][5] * mat[5][3];
//	float det2_45_45 = mat[4][4] * mat[5][5] - mat[4][5] * mat[5][4];
//
//	// 3x3 sub-determinants required to calculate 6x6 determinant
//	float det3_345_012 = mat[3][0] * det2_45_12 - mat[3][1] * det2_45_02 + mat[3][2] * det2_45_01;
//	float det3_345_013 = mat[3][0] * det2_45_13 - mat[3][1] * det2_45_03 + mat[3][3] * det2_45_01;
//	float det3_345_014 = mat[3][0] * det2_45_14 - mat[3][1] * det2_45_04 + mat[3][4] * det2_45_01;
//	float det3_345_015 = mat[3][0] * det2_45_15 - mat[3][1] * det2_45_05 + mat[3][5] * det2_45_01;
//	float det3_345_023 = mat[3][0] * det2_45_23 - mat[3][2] * det2_45_03 + mat[3][3] * det2_45_02;
//	float det3_345_024 = mat[3][0] * det2_45_24 - mat[3][2] * det2_45_04 + mat[3][4] * det2_45_02;
//	float det3_345_025 = mat[3][0] * det2_45_25 - mat[3][2] * det2_45_05 + mat[3][5] * det2_45_02;
//	float det3_345_034 = mat[3][0] * det2_45_34 - mat[3][3] * det2_45_04 + mat[3][4] * det2_45_03;
//	float det3_345_035 = mat[3][0] * det2_45_35 - mat[3][3] * det2_45_05 + mat[3][5] * det2_45_03;
//	float det3_345_045 = mat[3][0] * det2_45_45 - mat[3][4] * det2_45_05 + mat[3][5] * det2_45_04;
//	float det3_345_123 = mat[3][1] * det2_45_23 - mat[3][2] * det2_45_13 + mat[3][3] * det2_45_12;
//	float det3_345_124 = mat[3][1] * det2_45_24 - mat[3][2] * det2_45_14 + mat[3][4] * det2_45_12;
//	float det3_345_125 = mat[3][1] * det2_45_25 - mat[3][2] * det2_45_15 + mat[3][5] * det2_45_12;
//	float det3_345_134 = mat[3][1] * det2_45_34 - mat[3][3] * det2_45_14 + mat[3][4] * det2_45_13;
//	float det3_345_135 = mat[3][1] * det2_45_35 - mat[3][3] * det2_45_15 + mat[3][5] * det2_45_13;
//	float det3_345_145 = mat[3][1] * det2_45_45 - mat[3][4] * det2_45_15 + mat[3][5] * det2_45_14;
//	float det3_345_234 = mat[3][2] * det2_45_34 - mat[3][3] * det2_45_24 + mat[3][4] * det2_45_23;
//	float det3_345_235 = mat[3][2] * det2_45_35 - mat[3][3] * det2_45_25 + mat[3][5] * det2_45_23;
//	float det3_345_245 = mat[3][2] * det2_45_45 - mat[3][4] * det2_45_25 + mat[3][5] * det2_45_24;
//	float det3_345_345 = mat[3][3] * det2_45_45 - mat[3][4] * det2_45_35 + mat[3][5] * det2_45_34;
//
//	// 4x4 sub-determinants required to calculate 6x6 determinant
//	float det4_2345_0123 = mat[2][0] * det3_345_123 - mat[2][1] * det3_345_023 + mat[2][2] * det3_345_013 - mat[2][3] * det3_345_012;
//	float det4_2345_0124 = mat[2][0] * det3_345_124 - mat[2][1] * det3_345_024 + mat[2][2] * det3_345_014 - mat[2][4] * det3_345_012;
//	float det4_2345_0125 = mat[2][0] * det3_345_125 - mat[2][1] * det3_345_025 + mat[2][2] * det3_345_015 - mat[2][5] * det3_345_012;
//	float det4_2345_0134 = mat[2][0] * det3_345_134 - mat[2][1] * det3_345_034 + mat[2][3] * det3_345_014 - mat[2][4] * det3_345_013;
//	float det4_2345_0135 = mat[2][0] * det3_345_135 - mat[2][1] * det3_345_035 + mat[2][3] * det3_345_015 - mat[2][5] * det3_345_013;
//	float det4_2345_0145 = mat[2][0] * det3_345_145 - mat[2][1] * det3_345_045 + mat[2][4] * det3_345_015 - mat[2][5] * det3_345_014;
//	float det4_2345_0234 = mat[2][0] * det3_345_234 - mat[2][2] * det3_345_034 + mat[2][3] * det3_345_024 - mat[2][4] * det3_345_023;
//	float det4_2345_0235 = mat[2][0] * det3_345_235 - mat[2][2] * det3_345_035 + mat[2][3] * det3_345_025 - mat[2][5] * det3_345_023;
//	float det4_2345_0245 = mat[2][0] * det3_345_245 - mat[2][2] * det3_345_045 + mat[2][4] * det3_345_025 - mat[2][5] * det3_345_024;
//	float det4_2345_0345 = mat[2][0] * det3_345_345 - mat[2][3] * det3_345_045 + mat[2][4] * det3_345_035 - mat[2][5] * det3_345_034;
//	float det4_2345_1234 = mat[2][1] * det3_345_234 - mat[2][2] * det3_345_134 + mat[2][3] * det3_345_124 - mat[2][4] * det3_345_123;
//	float det4_2345_1235 = mat[2][1] * det3_345_235 - mat[2][2] * det3_345_135 + mat[2][3] * det3_345_125 - mat[2][5] * det3_345_123;
//	float det4_2345_1245 = mat[2][1] * det3_345_245 - mat[2][2] * det3_345_145 + mat[2][4] * det3_345_125 - mat[2][5] * det3_345_124;
//	float det4_2345_1345 = mat[2][1] * det3_345_345 - mat[2][3] * det3_345_145 + mat[2][4] * det3_345_135 - mat[2][5] * det3_345_134;
//	float det4_2345_2345 = mat[2][2] * det3_345_345 - mat[2][3] * det3_345_245 + mat[2][4] * det3_345_235 - mat[2][5] * det3_345_234;
//
//	// 5x5 sub-determinants required to calculate 6x6 determinant
//	float det5_12345_01234 = mat[1][0] * det4_2345_1234 - mat[1][1] * det4_2345_0234 + mat[1][2] * det4_2345_0134 - mat[1][3] * det4_2345_0124 + mat[1][4] * det4_2345_0123;
//	float det5_12345_01235 = mat[1][0] * det4_2345_1235 - mat[1][1] * det4_2345_0235 + mat[1][2] * det4_2345_0135 - mat[1][3] * det4_2345_0125 + mat[1][5] * det4_2345_0123;
//	float det5_12345_01245 = mat[1][0] * det4_2345_1245 - mat[1][1] * det4_2345_0245 + mat[1][2] * det4_2345_0145 - mat[1][4] * det4_2345_0125 + mat[1][5] * det4_2345_0124;
//	float det5_12345_01345 = mat[1][0] * det4_2345_1345 - mat[1][1] * det4_2345_0345 + mat[1][3] * det4_2345_0145 - mat[1][4] * det4_2345_0135 + mat[1][5] * det4_2345_0134;
//	float det5_12345_02345 = mat[1][0] * det4_2345_2345 - mat[1][2] * det4_2345_0345 + mat[1][3] * det4_2345_0245 - mat[1][4] * det4_2345_0235 + mat[1][5] * det4_2345_0234;
//	float det5_12345_12345 = mat[1][1] * det4_2345_2345 - mat[1][2] * det4_2345_1345 + mat[1][3] * det4_2345_1245 - mat[1][4] * det4_2345_1235 + mat[1][5] * det4_2345_1234;
//
//	// determinant of 6x6 matrix
//	det = mat[0][0] * det5_12345_12345 - mat[0][1] * det5_12345_02345 + mat[0][2] * det5_12345_01345 -
//				mat[0][3] * det5_12345_01245 + mat[0][4] * det5_12345_01235 - mat[0][5] * det5_12345_01234;
//
//	if ( idMath::Fabs( det ) < MATRIX_INVERSE_EPSILON ) {
//		return false;
//	}
//
//	invDet = 1.0f / det;
//
//	// remaining 2x2 sub-determinants
//	float det2_34_01 = mat[3][0] * mat[4][1] - mat[3][1] * mat[4][0];
//	float det2_34_02 = mat[3][0] * mat[4][2] - mat[3][2] * mat[4][0];
//	float det2_34_03 = mat[3][0] * mat[4][3] - mat[3][3] * mat[4][0];
//	float det2_34_04 = mat[3][0] * mat[4][4] - mat[3][4] * mat[4][0];
//	float det2_34_05 = mat[3][0] * mat[4][5] - mat[3][5] * mat[4][0];
//	float det2_34_12 = mat[3][1] * mat[4][2] - mat[3][2] * mat[4][1];
//	float det2_34_13 = mat[3][1] * mat[4][3] - mat[3][3] * mat[4][1];
//	float det2_34_14 = mat[3][1] * mat[4][4] - mat[3][4] * mat[4][1];
//	float det2_34_15 = mat[3][1] * mat[4][5] - mat[3][5] * mat[4][1];
//	float det2_34_23 = mat[3][2] * mat[4][3] - mat[3][3] * mat[4][2];
//	float det2_34_24 = mat[3][2] * mat[4][4] - mat[3][4] * mat[4][2];
//	float det2_34_25 = mat[3][2] * mat[4][5] - mat[3][5] * mat[4][2];
//	float det2_34_34 = mat[3][3] * mat[4][4] - mat[3][4] * mat[4][3];
//	float det2_34_35 = mat[3][3] * mat[4][5] - mat[3][5] * mat[4][3];
//	float det2_34_45 = mat[3][4] * mat[4][5] - mat[3][5] * mat[4][4];
//	float det2_35_01 = mat[3][0] * mat[5][1] - mat[3][1] * mat[5][0];
//	float det2_35_02 = mat[3][0] * mat[5][2] - mat[3][2] * mat[5][0];
//	float det2_35_03 = mat[3][0] * mat[5][3] - mat[3][3] * mat[5][0];
//	float det2_35_04 = mat[3][0] * mat[5][4] - mat[3][4] * mat[5][0];
//	float det2_35_05 = mat[3][0] * mat[5][5] - mat[3][5] * mat[5][0];
//	float det2_35_12 = mat[3][1] * mat[5][2] - mat[3][2] * mat[5][1];
//	float det2_35_13 = mat[3][1] * mat[5][3] - mat[3][3] * mat[5][1];
//	float det2_35_14 = mat[3][1] * mat[5][4] - mat[3][4] * mat[5][1];
//	float det2_35_15 = mat[3][1] * mat[5][5] - mat[3][5] * mat[5][1];
//	float det2_35_23 = mat[3][2] * mat[5][3] - mat[3][3] * mat[5][2];
//	float det2_35_24 = mat[3][2] * mat[5][4] - mat[3][4] * mat[5][2];
//	float det2_35_25 = mat[3][2] * mat[5][5] - mat[3][5] * mat[5][2];
//	float det2_35_34 = mat[3][3] * mat[5][4] - mat[3][4] * mat[5][3];
//	float det2_35_35 = mat[3][3] * mat[5][5] - mat[3][5] * mat[5][3];
//	float det2_35_45 = mat[3][4] * mat[5][5] - mat[3][5] * mat[5][4];
//
//	// remaining 3x3 sub-determinants
//	float det3_234_012 = mat[2][0] * det2_34_12 - mat[2][1] * det2_34_02 + mat[2][2] * det2_34_01;
//	float det3_234_013 = mat[2][0] * det2_34_13 - mat[2][1] * det2_34_03 + mat[2][3] * det2_34_01;
//	float det3_234_014 = mat[2][0] * det2_34_14 - mat[2][1] * det2_34_04 + mat[2][4] * det2_34_01;
//	float det3_234_015 = mat[2][0] * det2_34_15 - mat[2][1] * det2_34_05 + mat[2][5] * det2_34_01;
//	float det3_234_023 = mat[2][0] * det2_34_23 - mat[2][2] * det2_34_03 + mat[2][3] * det2_34_02;
//	float det3_234_024 = mat[2][0] * det2_34_24 - mat[2][2] * det2_34_04 + mat[2][4] * det2_34_02;
//	float det3_234_025 = mat[2][0] * det2_34_25 - mat[2][2] * det2_34_05 + mat[2][5] * det2_34_02;
//	float det3_234_034 = mat[2][0] * det2_34_34 - mat[2][3] * det2_34_04 + mat[2][4] * det2_34_03;
//	float det3_234_035 = mat[2][0] * det2_34_35 - mat[2][3] * det2_34_05 + mat[2][5] * det2_34_03;
//	float det3_234_045 = mat[2][0] * det2_34_45 - mat[2][4] * det2_34_05 + mat[2][5] * det2_34_04;
//	float det3_234_123 = mat[2][1] * det2_34_23 - mat[2][2] * det2_34_13 + mat[2][3] * det2_34_12;
//	float det3_234_124 = mat[2][1] * det2_34_24 - mat[2][2] * det2_34_14 + mat[2][4] * det2_34_12;
//	float det3_234_125 = mat[2][1] * det2_34_25 - mat[2][2] * det2_34_15 + mat[2][5] * det2_34_12;
//	float det3_234_134 = mat[2][1] * det2_34_34 - mat[2][3] * det2_34_14 + mat[2][4] * det2_34_13;
//	float det3_234_135 = mat[2][1] * det2_34_35 - mat[2][3] * det2_34_15 + mat[2][5] * det2_34_13;
//	float det3_234_145 = mat[2][1] * det2_34_45 - mat[2][4] * det2_34_15 + mat[2][5] * det2_34_14;
//	float det3_234_234 = mat[2][2] * det2_34_34 - mat[2][3] * det2_34_24 + mat[2][4] * det2_34_23;
//	float det3_234_235 = mat[2][2] * det2_34_35 - mat[2][3] * det2_34_25 + mat[2][5] * det2_34_23;
//	float det3_234_245 = mat[2][2] * det2_34_45 - mat[2][4] * det2_34_25 + mat[2][5] * det2_34_24;
//	float det3_234_345 = mat[2][3] * det2_34_45 - mat[2][4] * det2_34_35 + mat[2][5] * det2_34_34;
//	float det3_235_012 = mat[2][0] * det2_35_12 - mat[2][1] * det2_35_02 + mat[2][2] * det2_35_01;
//	float det3_235_013 = mat[2][0] * det2_35_13 - mat[2][1] * det2_35_03 + mat[2][3] * det2_35_01;
//	float det3_235_014 = mat[2][0] * det2_35_14 - mat[2][1] * det2_35_04 + mat[2][4] * det2_35_01;
//	float det3_235_015 = mat[2][0] * det2_35_15 - mat[2][1] * det2_35_05 + mat[2][5] * det2_35_01;
//	float det3_235_023 = mat[2][0] * det2_35_23 - mat[2][2] * det2_35_03 + mat[2][3] * det2_35_02;
//	float det3_235_024 = mat[2][0] * det2_35_24 - mat[2][2] * det2_35_04 + mat[2][4] * det2_35_02;
//	float det3_235_025 = mat[2][0] * det2_35_25 - mat[2][2] * det2_35_05 + mat[2][5] * det2_35_02;
//	float det3_235_034 = mat[2][0] * det2_35_34 - mat[2][3] * det2_35_04 + mat[2][4] * det2_35_03;
//	float det3_235_035 = mat[2][0] * det2_35_35 - mat[2][3] * det2_35_05 + mat[2][5] * det2_35_03;
//	float det3_235_045 = mat[2][0] * det2_35_45 - mat[2][4] * det2_35_05 + mat[2][5] * det2_35_04;
//	float det3_235_123 = mat[2][1] * det2_35_23 - mat[2][2] * det2_35_13 + mat[2][3] * det2_35_12;
//	float det3_235_124 = mat[2][1] * det2_35_24 - mat[2][2] * det2_35_14 + mat[2][4] * det2_35_12;
//	float det3_235_125 = mat[2][1] * det2_35_25 - mat[2][2] * det2_35_15 + mat[2][5] * det2_35_12;
//	float det3_235_134 = mat[2][1] * det2_35_34 - mat[2][3] * det2_35_14 + mat[2][4] * det2_35_13;
//	float det3_235_135 = mat[2][1] * det2_35_35 - mat[2][3] * det2_35_15 + mat[2][5] * det2_35_13;
//	float det3_235_145 = mat[2][1] * det2_35_45 - mat[2][4] * det2_35_15 + mat[2][5] * det2_35_14;
//	float det3_235_234 = mat[2][2] * det2_35_34 - mat[2][3] * det2_35_24 + mat[2][4] * det2_35_23;
//	float det3_235_235 = mat[2][2] * det2_35_35 - mat[2][3] * det2_35_25 + mat[2][5] * det2_35_23;
//	float det3_235_245 = mat[2][2] * det2_35_45 - mat[2][4] * det2_35_25 + mat[2][5] * det2_35_24;
//	float det3_235_345 = mat[2][3] * det2_35_45 - mat[2][4] * det2_35_35 + mat[2][5] * det2_35_34;
//	float det3_245_012 = mat[2][0] * det2_45_12 - mat[2][1] * det2_45_02 + mat[2][2] * det2_45_01;
//	float det3_245_013 = mat[2][0] * det2_45_13 - mat[2][1] * det2_45_03 + mat[2][3] * det2_45_01;
//	float det3_245_014 = mat[2][0] * det2_45_14 - mat[2][1] * det2_45_04 + mat[2][4] * det2_45_01;
//	float det3_245_015 = mat[2][0] * det2_45_15 - mat[2][1] * det2_45_05 + mat[2][5] * det2_45_01;
//	float det3_245_023 = mat[2][0] * det2_45_23 - mat[2][2] * det2_45_03 + mat[2][3] * det2_45_02;
//	float det3_245_024 = mat[2][0] * det2_45_24 - mat[2][2] * det2_45_04 + mat[2][4] * det2_45_02;
//	float det3_245_025 = mat[2][0] * det2_45_25 - mat[2][2] * det2_45_05 + mat[2][5] * det2_45_02;
//	float det3_245_034 = mat[2][0] * det2_45_34 - mat[2][3] * det2_45_04 + mat[2][4] * det2_45_03;
//	float det3_245_035 = mat[2][0] * det2_45_35 - mat[2][3] * det2_45_05 + mat[2][5] * det2_45_03;
//	float det3_245_045 = mat[2][0] * det2_45_45 - mat[2][4] * det2_45_05 + mat[2][5] * det2_45_04;
//	float det3_245_123 = mat[2][1] * det2_45_23 - mat[2][2] * det2_45_13 + mat[2][3] * det2_45_12;
//	float det3_245_124 = mat[2][1] * det2_45_24 - mat[2][2] * det2_45_14 + mat[2][4] * det2_45_12;
//	float det3_245_125 = mat[2][1] * det2_45_25 - mat[2][2] * det2_45_15 + mat[2][5] * det2_45_12;
//	float det3_245_134 = mat[2][1] * det2_45_34 - mat[2][3] * det2_45_14 + mat[2][4] * det2_45_13;
//	float det3_245_135 = mat[2][1] * det2_45_35 - mat[2][3] * det2_45_15 + mat[2][5] * det2_45_13;
//	float det3_245_145 = mat[2][1] * det2_45_45 - mat[2][4] * det2_45_15 + mat[2][5] * det2_45_14;
//	float det3_245_234 = mat[2][2] * det2_45_34 - mat[2][3] * det2_45_24 + mat[2][4] * det2_45_23;
//	float det3_245_235 = mat[2][2] * det2_45_35 - mat[2][3] * det2_45_25 + mat[2][5] * det2_45_23;
//	float det3_245_245 = mat[2][2] * det2_45_45 - mat[2][4] * det2_45_25 + mat[2][5] * det2_45_24;
//	float det3_245_345 = mat[2][3] * det2_45_45 - mat[2][4] * det2_45_35 + mat[2][5] * det2_45_34;
//
//	// remaining 4x4 sub-determinants
//	float det4_1234_0123 = mat[1][0] * det3_234_123 - mat[1][1] * det3_234_023 + mat[1][2] * det3_234_013 - mat[1][3] * det3_234_012;
//	float det4_1234_0124 = mat[1][0] * det3_234_124 - mat[1][1] * det3_234_024 + mat[1][2] * det3_234_014 - mat[1][4] * det3_234_012;
//	float det4_1234_0125 = mat[1][0] * det3_234_125 - mat[1][1] * det3_234_025 + mat[1][2] * det3_234_015 - mat[1][5] * det3_234_012;
//	float det4_1234_0134 = mat[1][0] * det3_234_134 - mat[1][1] * det3_234_034 + mat[1][3] * det3_234_014 - mat[1][4] * det3_234_013;
//	float det4_1234_0135 = mat[1][0] * det3_234_135 - mat[1][1] * det3_234_035 + mat[1][3] * det3_234_015 - mat[1][5] * det3_234_013;
//	float det4_1234_0145 = mat[1][0] * det3_234_145 - mat[1][1] * det3_234_045 + mat[1][4] * det3_234_015 - mat[1][5] * det3_234_014;
//	float det4_1234_0234 = mat[1][0] * det3_234_234 - mat[1][2] * det3_234_034 + mat[1][3] * det3_234_024 - mat[1][4] * det3_234_023;
//	float det4_1234_0235 = mat[1][0] * det3_234_235 - mat[1][2] * det3_234_035 + mat[1][3] * det3_234_025 - mat[1][5] * det3_234_023;
//	float det4_1234_0245 = mat[1][0] * det3_234_245 - mat[1][2] * det3_234_045 + mat[1][4] * det3_234_025 - mat[1][5] * det3_234_024;
//	float det4_1234_0345 = mat[1][0] * det3_234_345 - mat[1][3] * det3_234_045 + mat[1][4] * det3_234_035 - mat[1][5] * det3_234_034;
//	float det4_1234_1234 = mat[1][1] * det3_234_234 - mat[1][2] * det3_234_134 + mat[1][3] * det3_234_124 - mat[1][4] * det3_234_123;
//	float det4_1234_1235 = mat[1][1] * det3_234_235 - mat[1][2] * det3_234_135 + mat[1][3] * det3_234_125 - mat[1][5] * det3_234_123;
//	float det4_1234_1245 = mat[1][1] * det3_234_245 - mat[1][2] * det3_234_145 + mat[1][4] * det3_234_125 - mat[1][5] * det3_234_124;
//	float det4_1234_1345 = mat[1][1] * det3_234_345 - mat[1][3] * det3_234_145 + mat[1][4] * det3_234_135 - mat[1][5] * det3_234_134;
//	float det4_1234_2345 = mat[1][2] * det3_234_345 - mat[1][3] * det3_234_245 + mat[1][4] * det3_234_235 - mat[1][5] * det3_234_234;
//	float det4_1235_0123 = mat[1][0] * det3_235_123 - mat[1][1] * det3_235_023 + mat[1][2] * det3_235_013 - mat[1][3] * det3_235_012;
//	float det4_1235_0124 = mat[1][0] * det3_235_124 - mat[1][1] * det3_235_024 + mat[1][2] * det3_235_014 - mat[1][4] * det3_235_012;
//	float det4_1235_0125 = mat[1][0] * det3_235_125 - mat[1][1] * det3_235_025 + mat[1][2] * det3_235_015 - mat[1][5] * det3_235_012;
//	float det4_1235_0134 = mat[1][0] * det3_235_134 - mat[1][1] * det3_235_034 + mat[1][3] * det3_235_014 - mat[1][4] * det3_235_013;
//	float det4_1235_0135 = mat[1][0] * det3_235_135 - mat[1][1] * det3_235_035 + mat[1][3] * det3_235_015 - mat[1][5] * det3_235_013;
//	float det4_1235_0145 = mat[1][0] * det3_235_145 - mat[1][1] * det3_235_045 + mat[1][4] * det3_235_015 - mat[1][5] * det3_235_014;
//	float det4_1235_0234 = mat[1][0] * det3_235_234 - mat[1][2] * det3_235_034 + mat[1][3] * det3_235_024 - mat[1][4] * det3_235_023;
//	float det4_1235_0235 = mat[1][0] * det3_235_235 - mat[1][2] * det3_235_035 + mat[1][3] * det3_235_025 - mat[1][5] * det3_235_023;
//	float det4_1235_0245 = mat[1][0] * det3_235_245 - mat[1][2] * det3_235_045 + mat[1][4] * det3_235_025 - mat[1][5] * det3_235_024;
//	float det4_1235_0345 = mat[1][0] * det3_235_345 - mat[1][3] * det3_235_045 + mat[1][4] * det3_235_035 - mat[1][5] * det3_235_034;
//	float det4_1235_1234 = mat[1][1] * det3_235_234 - mat[1][2] * det3_235_134 + mat[1][3] * det3_235_124 - mat[1][4] * det3_235_123;
//	float det4_1235_1235 = mat[1][1] * det3_235_235 - mat[1][2] * det3_235_135 + mat[1][3] * det3_235_125 - mat[1][5] * det3_235_123;
//	float det4_1235_1245 = mat[1][1] * det3_235_245 - mat[1][2] * det3_235_145 + mat[1][4] * det3_235_125 - mat[1][5] * det3_235_124;
//	float det4_1235_1345 = mat[1][1] * det3_235_345 - mat[1][3] * det3_235_145 + mat[1][4] * det3_235_135 - mat[1][5] * det3_235_134;
//	float det4_1235_2345 = mat[1][2] * det3_235_345 - mat[1][3] * det3_235_245 + mat[1][4] * det3_235_235 - mat[1][5] * det3_235_234;
//	float det4_1245_0123 = mat[1][0] * det3_245_123 - mat[1][1] * det3_245_023 + mat[1][2] * det3_245_013 - mat[1][3] * det3_245_012;
//	float det4_1245_0124 = mat[1][0] * det3_245_124 - mat[1][1] * det3_245_024 + mat[1][2] * det3_245_014 - mat[1][4] * det3_245_012;
//	float det4_1245_0125 = mat[1][0] * det3_245_125 - mat[1][1] * det3_245_025 + mat[1][2] * det3_245_015 - mat[1][5] * det3_245_012;
//	float det4_1245_0134 = mat[1][0] * det3_245_134 - mat[1][1] * det3_245_034 + mat[1][3] * det3_245_014 - mat[1][4] * det3_245_013;
//	float det4_1245_0135 = mat[1][0] * det3_245_135 - mat[1][1] * det3_245_035 + mat[1][3] * det3_245_015 - mat[1][5] * det3_245_013;
//	float det4_1245_0145 = mat[1][0] * det3_245_145 - mat[1][1] * det3_245_045 + mat[1][4] * det3_245_015 - mat[1][5] * det3_245_014;
//	float det4_1245_0234 = mat[1][0] * det3_245_234 - mat[1][2] * det3_245_034 + mat[1][3] * det3_245_024 - mat[1][4] * det3_245_023;
//	float det4_1245_0235 = mat[1][0] * det3_245_235 - mat[1][2] * det3_245_035 + mat[1][3] * det3_245_025 - mat[1][5] * det3_245_023;
//	float det4_1245_0245 = mat[1][0] * det3_245_245 - mat[1][2] * det3_245_045 + mat[1][4] * det3_245_025 - mat[1][5] * det3_245_024;
//	float det4_1245_0345 = mat[1][0] * det3_245_345 - mat[1][3] * det3_245_045 + mat[1][4] * det3_245_035 - mat[1][5] * det3_245_034;
//	float det4_1245_1234 = mat[1][1] * det3_245_234 - mat[1][2] * det3_245_134 + mat[1][3] * det3_245_124 - mat[1][4] * det3_245_123;
//	float det4_1245_1235 = mat[1][1] * det3_245_235 - mat[1][2] * det3_245_135 + mat[1][3] * det3_245_125 - mat[1][5] * det3_245_123;
//	float det4_1245_1245 = mat[1][1] * det3_245_245 - mat[1][2] * det3_245_145 + mat[1][4] * det3_245_125 - mat[1][5] * det3_245_124;
//	float det4_1245_1345 = mat[1][1] * det3_245_345 - mat[1][3] * det3_245_145 + mat[1][4] * det3_245_135 - mat[1][5] * det3_245_134;
//	float det4_1245_2345 = mat[1][2] * det3_245_345 - mat[1][3] * det3_245_245 + mat[1][4] * det3_245_235 - mat[1][5] * det3_245_234;
//	float det4_1345_0123 = mat[1][0] * det3_345_123 - mat[1][1] * det3_345_023 + mat[1][2] * det3_345_013 - mat[1][3] * det3_345_012;
//	float det4_1345_0124 = mat[1][0] * det3_345_124 - mat[1][1] * det3_345_024 + mat[1][2] * det3_345_014 - mat[1][4] * det3_345_012;
//	float det4_1345_0125 = mat[1][0] * det3_345_125 - mat[1][1] * det3_345_025 + mat[1][2] * det3_345_015 - mat[1][5] * det3_345_012;
//	float det4_1345_0134 = mat[1][0] * det3_345_134 - mat[1][1] * det3_345_034 + mat[1][3] * det3_345_014 - mat[1][4] * det3_345_013;
//	float det4_1345_0135 = mat[1][0] * det3_345_135 - mat[1][1] * det3_345_035 + mat[1][3] * det3_345_015 - mat[1][5] * det3_345_013;
//	float det4_1345_0145 = mat[1][0] * det3_345_145 - mat[1][1] * det3_345_045 + mat[1][4] * det3_345_015 - mat[1][5] * det3_345_014;
//	float det4_1345_0234 = mat[1][0] * det3_345_234 - mat[1][2] * det3_345_034 + mat[1][3] * det3_345_024 - mat[1][4] * det3_345_023;
//	float det4_1345_0235 = mat[1][0] * det3_345_235 - mat[1][2] * det3_345_035 + mat[1][3] * det3_345_025 - mat[1][5] * det3_345_023;
//	float det4_1345_0245 = mat[1][0] * det3_345_245 - mat[1][2] * det3_345_045 + mat[1][4] * det3_345_025 - mat[1][5] * det3_345_024;
//	float det4_1345_0345 = mat[1][0] * det3_345_345 - mat[1][3] * det3_345_045 + mat[1][4] * det3_345_035 - mat[1][5] * det3_345_034;
//	float det4_1345_1234 = mat[1][1] * det3_345_234 - mat[1][2] * det3_345_134 + mat[1][3] * det3_345_124 - mat[1][4] * det3_345_123;
//	float det4_1345_1235 = mat[1][1] * det3_345_235 - mat[1][2] * det3_345_135 + mat[1][3] * det3_345_125 - mat[1][5] * det3_345_123;
//	float det4_1345_1245 = mat[1][1] * det3_345_245 - mat[1][2] * det3_345_145 + mat[1][4] * det3_345_125 - mat[1][5] * det3_345_124;
//	float det4_1345_1345 = mat[1][1] * det3_345_345 - mat[1][3] * det3_345_145 + mat[1][4] * det3_345_135 - mat[1][5] * det3_345_134;
//	float det4_1345_2345 = mat[1][2] * det3_345_345 - mat[1][3] * det3_345_245 + mat[1][4] * det3_345_235 - mat[1][5] * det3_345_234;
//
//	// remaining 5x5 sub-determinants
//	float det5_01234_01234 = mat[0][0] * det4_1234_1234 - mat[0][1] * det4_1234_0234 + mat[0][2] * det4_1234_0134 - mat[0][3] * det4_1234_0124 + mat[0][4] * det4_1234_0123;
//	float det5_01234_01235 = mat[0][0] * det4_1234_1235 - mat[0][1] * det4_1234_0235 + mat[0][2] * det4_1234_0135 - mat[0][3] * det4_1234_0125 + mat[0][5] * det4_1234_0123;
//	float det5_01234_01245 = mat[0][0] * det4_1234_1245 - mat[0][1] * det4_1234_0245 + mat[0][2] * det4_1234_0145 - mat[0][4] * det4_1234_0125 + mat[0][5] * det4_1234_0124;
//	float det5_01234_01345 = mat[0][0] * det4_1234_1345 - mat[0][1] * det4_1234_0345 + mat[0][3] * det4_1234_0145 - mat[0][4] * det4_1234_0135 + mat[0][5] * det4_1234_0134;
//	float det5_01234_02345 = mat[0][0] * det4_1234_2345 - mat[0][2] * det4_1234_0345 + mat[0][3] * det4_1234_0245 - mat[0][4] * det4_1234_0235 + mat[0][5] * det4_1234_0234;
//	float det5_01234_12345 = mat[0][1] * det4_1234_2345 - mat[0][2] * det4_1234_1345 + mat[0][3] * det4_1234_1245 - mat[0][4] * det4_1234_1235 + mat[0][5] * det4_1234_1234;
//	float det5_01235_01234 = mat[0][0] * det4_1235_1234 - mat[0][1] * det4_1235_0234 + mat[0][2] * det4_1235_0134 - mat[0][3] * det4_1235_0124 + mat[0][4] * det4_1235_0123;
//	float det5_01235_01235 = mat[0][0] * det4_1235_1235 - mat[0][1] * det4_1235_0235 + mat[0][2] * det4_1235_0135 - mat[0][3] * det4_1235_0125 + mat[0][5] * det4_1235_0123;
//	float det5_01235_01245 = mat[0][0] * det4_1235_1245 - mat[0][1] * det4_1235_0245 + mat[0][2] * det4_1235_0145 - mat[0][4] * det4_1235_0125 + mat[0][5] * det4_1235_0124;
//	float det5_01235_01345 = mat[0][0] * det4_1235_1345 - mat[0][1] * det4_1235_0345 + mat[0][3] * det4_1235_0145 - mat[0][4] * det4_1235_0135 + mat[0][5] * det4_1235_0134;
//	float det5_01235_02345 = mat[0][0] * det4_1235_2345 - mat[0][2] * det4_1235_0345 + mat[0][3] * det4_1235_0245 - mat[0][4] * det4_1235_0235 + mat[0][5] * det4_1235_0234;
//	float det5_01235_12345 = mat[0][1] * det4_1235_2345 - mat[0][2] * det4_1235_1345 + mat[0][3] * det4_1235_1245 - mat[0][4] * det4_1235_1235 + mat[0][5] * det4_1235_1234;
//	float det5_01245_01234 = mat[0][0] * det4_1245_1234 - mat[0][1] * det4_1245_0234 + mat[0][2] * det4_1245_0134 - mat[0][3] * det4_1245_0124 + mat[0][4] * det4_1245_0123;
//	float det5_01245_01235 = mat[0][0] * det4_1245_1235 - mat[0][1] * det4_1245_0235 + mat[0][2] * det4_1245_0135 - mat[0][3] * det4_1245_0125 + mat[0][5] * det4_1245_0123;
//	float det5_01245_01245 = mat[0][0] * det4_1245_1245 - mat[0][1] * det4_1245_0245 + mat[0][2] * det4_1245_0145 - mat[0][4] * det4_1245_0125 + mat[0][5] * det4_1245_0124;
//	float det5_01245_01345 = mat[0][0] * det4_1245_1345 - mat[0][1] * det4_1245_0345 + mat[0][3] * det4_1245_0145 - mat[0][4] * det4_1245_0135 + mat[0][5] * det4_1245_0134;
//	float det5_01245_02345 = mat[0][0] * det4_1245_2345 - mat[0][2] * det4_1245_0345 + mat[0][3] * det4_1245_0245 - mat[0][4] * det4_1245_0235 + mat[0][5] * det4_1245_0234;
//	float det5_01245_12345 = mat[0][1] * det4_1245_2345 - mat[0][2] * det4_1245_1345 + mat[0][3] * det4_1245_1245 - mat[0][4] * det4_1245_1235 + mat[0][5] * det4_1245_1234;
//	float det5_01345_01234 = mat[0][0] * det4_1345_1234 - mat[0][1] * det4_1345_0234 + mat[0][2] * det4_1345_0134 - mat[0][3] * det4_1345_0124 + mat[0][4] * det4_1345_0123;
//	float det5_01345_01235 = mat[0][0] * det4_1345_1235 - mat[0][1] * det4_1345_0235 + mat[0][2] * det4_1345_0135 - mat[0][3] * det4_1345_0125 + mat[0][5] * det4_1345_0123;
//	float det5_01345_01245 = mat[0][0] * det4_1345_1245 - mat[0][1] * det4_1345_0245 + mat[0][2] * det4_1345_0145 - mat[0][4] * det4_1345_0125 + mat[0][5] * det4_1345_0124;
//	float det5_01345_01345 = mat[0][0] * det4_1345_1345 - mat[0][1] * det4_1345_0345 + mat[0][3] * det4_1345_0145 - mat[0][4] * det4_1345_0135 + mat[0][5] * det4_1345_0134;
//	float det5_01345_02345 = mat[0][0] * det4_1345_2345 - mat[0][2] * det4_1345_0345 + mat[0][3] * det4_1345_0245 - mat[0][4] * det4_1345_0235 + mat[0][5] * det4_1345_0234;
//	float det5_01345_12345 = mat[0][1] * det4_1345_2345 - mat[0][2] * det4_1345_1345 + mat[0][3] * det4_1345_1245 - mat[0][4] * det4_1345_1235 + mat[0][5] * det4_1345_1234;
//	float det5_02345_01234 = mat[0][0] * det4_2345_1234 - mat[0][1] * det4_2345_0234 + mat[0][2] * det4_2345_0134 - mat[0][3] * det4_2345_0124 + mat[0][4] * det4_2345_0123;
//	float det5_02345_01235 = mat[0][0] * det4_2345_1235 - mat[0][1] * det4_2345_0235 + mat[0][2] * det4_2345_0135 - mat[0][3] * det4_2345_0125 + mat[0][5] * det4_2345_0123;
//	float det5_02345_01245 = mat[0][0] * det4_2345_1245 - mat[0][1] * det4_2345_0245 + mat[0][2] * det4_2345_0145 - mat[0][4] * det4_2345_0125 + mat[0][5] * det4_2345_0124;
//	float det5_02345_01345 = mat[0][0] * det4_2345_1345 - mat[0][1] * det4_2345_0345 + mat[0][3] * det4_2345_0145 - mat[0][4] * det4_2345_0135 + mat[0][5] * det4_2345_0134;
//	float det5_02345_02345 = mat[0][0] * det4_2345_2345 - mat[0][2] * det4_2345_0345 + mat[0][3] * det4_2345_0245 - mat[0][4] * det4_2345_0235 + mat[0][5] * det4_2345_0234;
//	float det5_02345_12345 = mat[0][1] * det4_2345_2345 - mat[0][2] * det4_2345_1345 + mat[0][3] * det4_2345_1245 - mat[0][4] * det4_2345_1235 + mat[0][5] * det4_2345_1234;
//
//	mat[0][0] =  det5_12345_12345 * invDet;
//	mat[0][1] = -det5_02345_12345 * invDet;
//	mat[0][2] =  det5_01345_12345 * invDet;
//	mat[0][3] = -det5_01245_12345 * invDet;
//	mat[0][4] =  det5_01235_12345 * invDet;
//	mat[0][5] = -det5_01234_12345 * invDet;
//
//	mat[1][0] = -det5_12345_02345 * invDet;
//	mat[1][1] =  det5_02345_02345 * invDet;
//	mat[1][2] = -det5_01345_02345 * invDet;
//	mat[1][3] =  det5_01245_02345 * invDet;
//	mat[1][4] = -det5_01235_02345 * invDet;
//	mat[1][5] =  det5_01234_02345 * invDet;
//
//	mat[2][0] =  det5_12345_01345 * invDet;
//	mat[2][1] = -det5_02345_01345 * invDet;
//	mat[2][2] =  det5_01345_01345 * invDet;
//	mat[2][3] = -det5_01245_01345 * invDet;
//	mat[2][4] =  det5_01235_01345 * invDet;
//	mat[2][5] = -det5_01234_01345 * invDet;
//
//	mat[3][0] = -det5_12345_01245 * invDet;
//	mat[3][1] =  det5_02345_01245 * invDet;
//	mat[3][2] = -det5_01345_01245 * invDet;
//	mat[3][3] =  det5_01245_01245 * invDet;
//	mat[3][4] = -det5_01235_01245 * invDet;
//	mat[3][5] =  det5_01234_01245 * invDet;
//
//	mat[4][0] =  det5_12345_01235 * invDet;
//	mat[4][1] = -det5_02345_01235 * invDet;
//	mat[4][2] =  det5_01345_01235 * invDet;
//	mat[4][3] = -det5_01245_01235 * invDet;
//	mat[4][4] =  det5_01235_01235 * invDet;
//	mat[4][5] = -det5_01234_01235 * invDet;
//
//	mat[5][0] = -det5_12345_01234 * invDet;
//	mat[5][1] =  det5_02345_01234 * invDet;
//	mat[5][2] = -det5_01345_01234 * invDet;
//	mat[5][3] =  det5_01245_01234 * invDet;
//	mat[5][4] = -det5_01235_01234 * invDet;
//	mat[5][5] =  det5_01234_01234 * invDet;
//
//	return true;
//}
//
///*
//============
//idMat6::InverseFastSelf
//============
//*/
//bool idMat6::InverseFastSelf( void ) {
//#if 0
//	// 810+6+36 = 852 multiplications
//	//				1 division
//	double det, invDet;
//
//	// 2x2 sub-determinants required to calculate 6x6 determinant
//	float det2_45_01 = mat[4][0] * mat[5][1] - mat[4][1] * mat[5][0];
//	float det2_45_02 = mat[4][0] * mat[5][2] - mat[4][2] * mat[5][0];
//	float det2_45_03 = mat[4][0] * mat[5][3] - mat[4][3] * mat[5][0];
//	float det2_45_04 = mat[4][0] * mat[5][4] - mat[4][4] * mat[5][0];
//	float det2_45_05 = mat[4][0] * mat[5][5] - mat[4][5] * mat[5][0];
//	float det2_45_12 = mat[4][1] * mat[5][2] - mat[4][2] * mat[5][1];
//	float det2_45_13 = mat[4][1] * mat[5][3] - mat[4][3] * mat[5][1];
//	float det2_45_14 = mat[4][1] * mat[5][4] - mat[4][4] * mat[5][1];
//	float det2_45_15 = mat[4][1] * mat[5][5] - mat[4][5] * mat[5][1];
//	float det2_45_23 = mat[4][2] * mat[5][3] - mat[4][3] * mat[5][2];
//	float det2_45_24 = mat[4][2] * mat[5][4] - mat[4][4] * mat[5][2];
//	float det2_45_25 = mat[4][2] * mat[5][5] - mat[4][5] * mat[5][2];
//	float det2_45_34 = mat[4][3] * mat[5][4] - mat[4][4] * mat[5][3];
//	float det2_45_35 = mat[4][3] * mat[5][5] - mat[4][5] * mat[5][3];
//	float det2_45_45 = mat[4][4] * mat[5][5] - mat[4][5] * mat[5][4];
//
//	// 3x3 sub-determinants required to calculate 6x6 determinant
//	float det3_345_012 = mat[3][0] * det2_45_12 - mat[3][1] * det2_45_02 + mat[3][2] * det2_45_01;
//	float det3_345_013 = mat[3][0] * det2_45_13 - mat[3][1] * det2_45_03 + mat[3][3] * det2_45_01;
//	float det3_345_014 = mat[3][0] * det2_45_14 - mat[3][1] * det2_45_04 + mat[3][4] * det2_45_01;
//	float det3_345_015 = mat[3][0] * det2_45_15 - mat[3][1] * det2_45_05 + mat[3][5] * det2_45_01;
//	float det3_345_023 = mat[3][0] * det2_45_23 - mat[3][2] * det2_45_03 + mat[3][3] * det2_45_02;
//	float det3_345_024 = mat[3][0] * det2_45_24 - mat[3][2] * det2_45_04 + mat[3][4] * det2_45_02;
//	float det3_345_025 = mat[3][0] * det2_45_25 - mat[3][2] * det2_45_05 + mat[3][5] * det2_45_02;
//	float det3_345_034 = mat[3][0] * det2_45_34 - mat[3][3] * det2_45_04 + mat[3][4] * det2_45_03;
//	float det3_345_035 = mat[3][0] * det2_45_35 - mat[3][3] * det2_45_05 + mat[3][5] * det2_45_03;
//	float det3_345_045 = mat[3][0] * det2_45_45 - mat[3][4] * det2_45_05 + mat[3][5] * det2_45_04;
//	float det3_345_123 = mat[3][1] * det2_45_23 - mat[3][2] * det2_45_13 + mat[3][3] * det2_45_12;
//	float det3_345_124 = mat[3][1] * det2_45_24 - mat[3][2] * det2_45_14 + mat[3][4] * det2_45_12;
//	float det3_345_125 = mat[3][1] * det2_45_25 - mat[3][2] * det2_45_15 + mat[3][5] * det2_45_12;
//	float det3_345_134 = mat[3][1] * det2_45_34 - mat[3][3] * det2_45_14 + mat[3][4] * det2_45_13;
//	float det3_345_135 = mat[3][1] * det2_45_35 - mat[3][3] * det2_45_15 + mat[3][5] * det2_45_13;
//	float det3_345_145 = mat[3][1] * det2_45_45 - mat[3][4] * det2_45_15 + mat[3][5] * det2_45_14;
//	float det3_345_234 = mat[3][2] * det2_45_34 - mat[3][3] * det2_45_24 + mat[3][4] * det2_45_23;
//	float det3_345_235 = mat[3][2] * det2_45_35 - mat[3][3] * det2_45_25 + mat[3][5] * det2_45_23;
//	float det3_345_245 = mat[3][2] * det2_45_45 - mat[3][4] * det2_45_25 + mat[3][5] * det2_45_24;
//	float det3_345_345 = mat[3][3] * det2_45_45 - mat[3][4] * det2_45_35 + mat[3][5] * det2_45_34;
//
//	// 4x4 sub-determinants required to calculate 6x6 determinant
//	float det4_2345_0123 = mat[2][0] * det3_345_123 - mat[2][1] * det3_345_023 + mat[2][2] * det3_345_013 - mat[2][3] * det3_345_012;
//	float det4_2345_0124 = mat[2][0] * det3_345_124 - mat[2][1] * det3_345_024 + mat[2][2] * det3_345_014 - mat[2][4] * det3_345_012;
//	float det4_2345_0125 = mat[2][0] * det3_345_125 - mat[2][1] * det3_345_025 + mat[2][2] * det3_345_015 - mat[2][5] * det3_345_012;
//	float det4_2345_0134 = mat[2][0] * det3_345_134 - mat[2][1] * det3_345_034 + mat[2][3] * det3_345_014 - mat[2][4] * det3_345_013;
//	float det4_2345_0135 = mat[2][0] * det3_345_135 - mat[2][1] * det3_345_035 + mat[2][3] * det3_345_015 - mat[2][5] * det3_345_013;
//	float det4_2345_0145 = mat[2][0] * det3_345_145 - mat[2][1] * det3_345_045 + mat[2][4] * det3_345_015 - mat[2][5] * det3_345_014;
//	float det4_2345_0234 = mat[2][0] * det3_345_234 - mat[2][2] * det3_345_034 + mat[2][3] * det3_345_024 - mat[2][4] * det3_345_023;
//	float det4_2345_0235 = mat[2][0] * det3_345_235 - mat[2][2] * det3_345_035 + mat[2][3] * det3_345_025 - mat[2][5] * det3_345_023;
//	float det4_2345_0245 = mat[2][0] * det3_345_245 - mat[2][2] * det3_345_045 + mat[2][4] * det3_345_025 - mat[2][5] * det3_345_024;
//	float det4_2345_0345 = mat[2][0] * det3_345_345 - mat[2][3] * det3_345_045 + mat[2][4] * det3_345_035 - mat[2][5] * det3_345_034;
//	float det4_2345_1234 = mat[2][1] * det3_345_234 - mat[2][2] * det3_345_134 + mat[2][3] * det3_345_124 - mat[2][4] * det3_345_123;
//	float det4_2345_1235 = mat[2][1] * det3_345_235 - mat[2][2] * det3_345_135 + mat[2][3] * det3_345_125 - mat[2][5] * det3_345_123;
//	float det4_2345_1245 = mat[2][1] * det3_345_245 - mat[2][2] * det3_345_145 + mat[2][4] * det3_345_125 - mat[2][5] * det3_345_124;
//	float det4_2345_1345 = mat[2][1] * det3_345_345 - mat[2][3] * det3_345_145 + mat[2][4] * det3_345_135 - mat[2][5] * det3_345_134;
//	float det4_2345_2345 = mat[2][2] * det3_345_345 - mat[2][3] * det3_345_245 + mat[2][4] * det3_345_235 - mat[2][5] * det3_345_234;
//
//	// 5x5 sub-determinants required to calculate 6x6 determinant
//	float det5_12345_01234 = mat[1][0] * det4_2345_1234 - mat[1][1] * det4_2345_0234 + mat[1][2] * det4_2345_0134 - mat[1][3] * det4_2345_0124 + mat[1][4] * det4_2345_0123;
//	float det5_12345_01235 = mat[1][0] * det4_2345_1235 - mat[1][1] * det4_2345_0235 + mat[1][2] * det4_2345_0135 - mat[1][3] * det4_2345_0125 + mat[1][5] * det4_2345_0123;
//	float det5_12345_01245 = mat[1][0] * det4_2345_1245 - mat[1][1] * det4_2345_0245 + mat[1][2] * det4_2345_0145 - mat[1][4] * det4_2345_0125 + mat[1][5] * det4_2345_0124;
//	float det5_12345_01345 = mat[1][0] * det4_2345_1345 - mat[1][1] * det4_2345_0345 + mat[1][3] * det4_2345_0145 - mat[1][4] * det4_2345_0135 + mat[1][5] * det4_2345_0134;
//	float det5_12345_02345 = mat[1][0] * det4_2345_2345 - mat[1][2] * det4_2345_0345 + mat[1][3] * det4_2345_0245 - mat[1][4] * det4_2345_0235 + mat[1][5] * det4_2345_0234;
//	float det5_12345_12345 = mat[1][1] * det4_2345_2345 - mat[1][2] * det4_2345_1345 + mat[1][3] * det4_2345_1245 - mat[1][4] * det4_2345_1235 + mat[1][5] * det4_2345_1234;
//
//	// determinant of 6x6 matrix
//	det = mat[0][0] * det5_12345_12345 - mat[0][1] * det5_12345_02345 + mat[0][2] * det5_12345_01345 -
//				mat[0][3] * det5_12345_01245 + mat[0][4] * det5_12345_01235 - mat[0][5] * det5_12345_01234;
//
//	if ( idMath::Fabs( det ) < MATRIX_INVERSE_EPSILON ) {
//		return false;
//	}
//
//	invDet = 1.0f / det;
//
//	// remaining 2x2 sub-determinants
//	float det2_34_01 = mat[3][0] * mat[4][1] - mat[3][1] * mat[4][0];
//	float det2_34_02 = mat[3][0] * mat[4][2] - mat[3][2] * mat[4][0];
//	float det2_34_03 = mat[3][0] * mat[4][3] - mat[3][3] * mat[4][0];
//	float det2_34_04 = mat[3][0] * mat[4][4] - mat[3][4] * mat[4][0];
//	float det2_34_05 = mat[3][0] * mat[4][5] - mat[3][5] * mat[4][0];
//	float det2_34_12 = mat[3][1] * mat[4][2] - mat[3][2] * mat[4][1];
//	float det2_34_13 = mat[3][1] * mat[4][3] - mat[3][3] * mat[4][1];
//	float det2_34_14 = mat[3][1] * mat[4][4] - mat[3][4] * mat[4][1];
//	float det2_34_15 = mat[3][1] * mat[4][5] - mat[3][5] * mat[4][1];
//	float det2_34_23 = mat[3][2] * mat[4][3] - mat[3][3] * mat[4][2];
//	float det2_34_24 = mat[3][2] * mat[4][4] - mat[3][4] * mat[4][2];
//	float det2_34_25 = mat[3][2] * mat[4][5] - mat[3][5] * mat[4][2];
//	float det2_34_34 = mat[3][3] * mat[4][4] - mat[3][4] * mat[4][3];
//	float det2_34_35 = mat[3][3] * mat[4][5] - mat[3][5] * mat[4][3];
//	float det2_34_45 = mat[3][4] * mat[4][5] - mat[3][5] * mat[4][4];
//	float det2_35_01 = mat[3][0] * mat[5][1] - mat[3][1] * mat[5][0];
//	float det2_35_02 = mat[3][0] * mat[5][2] - mat[3][2] * mat[5][0];
//	float det2_35_03 = mat[3][0] * mat[5][3] - mat[3][3] * mat[5][0];
//	float det2_35_04 = mat[3][0] * mat[5][4] - mat[3][4] * mat[5][0];
//	float det2_35_05 = mat[3][0] * mat[5][5] - mat[3][5] * mat[5][0];
//	float det2_35_12 = mat[3][1] * mat[5][2] - mat[3][2] * mat[5][1];
//	float det2_35_13 = mat[3][1] * mat[5][3] - mat[3][3] * mat[5][1];
//	float det2_35_14 = mat[3][1] * mat[5][4] - mat[3][4] * mat[5][1];
//	float det2_35_15 = mat[3][1] * mat[5][5] - mat[3][5] * mat[5][1];
//	float det2_35_23 = mat[3][2] * mat[5][3] - mat[3][3] * mat[5][2];
//	float det2_35_24 = mat[3][2] * mat[5][4] - mat[3][4] * mat[5][2];
//	float det2_35_25 = mat[3][2] * mat[5][5] - mat[3][5] * mat[5][2];
//	float det2_35_34 = mat[3][3] * mat[5][4] - mat[3][4] * mat[5][3];
//	float det2_35_35 = mat[3][3] * mat[5][5] - mat[3][5] * mat[5][3];
//	float det2_35_45 = mat[3][4] * mat[5][5] - mat[3][5] * mat[5][4];
//
//	// remaining 3x3 sub-determinants
//	float det3_234_012 = mat[2][0] * det2_34_12 - mat[2][1] * det2_34_02 + mat[2][2] * det2_34_01;
//	float det3_234_013 = mat[2][0] * det2_34_13 - mat[2][1] * det2_34_03 + mat[2][3] * det2_34_01;
//	float det3_234_014 = mat[2][0] * det2_34_14 - mat[2][1] * det2_34_04 + mat[2][4] * det2_34_01;
//	float det3_234_015 = mat[2][0] * det2_34_15 - mat[2][1] * det2_34_05 + mat[2][5] * det2_34_01;
//	float det3_234_023 = mat[2][0] * det2_34_23 - mat[2][2] * det2_34_03 + mat[2][3] * det2_34_02;
//	float det3_234_024 = mat[2][0] * det2_34_24 - mat[2][2] * det2_34_04 + mat[2][4] * det2_34_02;
//	float det3_234_025 = mat[2][0] * det2_34_25 - mat[2][2] * det2_34_05 + mat[2][5] * det2_34_02;
//	float det3_234_034 = mat[2][0] * det2_34_34 - mat[2][3] * det2_34_04 + mat[2][4] * det2_34_03;
//	float det3_234_035 = mat[2][0] * det2_34_35 - mat[2][3] * det2_34_05 + mat[2][5] * det2_34_03;
//	float det3_234_045 = mat[2][0] * det2_34_45 - mat[2][4] * det2_34_05 + mat[2][5] * det2_34_04;
//	float det3_234_123 = mat[2][1] * det2_34_23 - mat[2][2] * det2_34_13 + mat[2][3] * det2_34_12;
//	float det3_234_124 = mat[2][1] * det2_34_24 - mat[2][2] * det2_34_14 + mat[2][4] * det2_34_12;
//	float det3_234_125 = mat[2][1] * det2_34_25 - mat[2][2] * det2_34_15 + mat[2][5] * det2_34_12;
//	float det3_234_134 = mat[2][1] * det2_34_34 - mat[2][3] * det2_34_14 + mat[2][4] * det2_34_13;
//	float det3_234_135 = mat[2][1] * det2_34_35 - mat[2][3] * det2_34_15 + mat[2][5] * det2_34_13;
//	float det3_234_145 = mat[2][1] * det2_34_45 - mat[2][4] * det2_34_15 + mat[2][5] * det2_34_14;
//	float det3_234_234 = mat[2][2] * det2_34_34 - mat[2][3] * det2_34_24 + mat[2][4] * det2_34_23;
//	float det3_234_235 = mat[2][2] * det2_34_35 - mat[2][3] * det2_34_25 + mat[2][5] * det2_34_23;
//	float det3_234_245 = mat[2][2] * det2_34_45 - mat[2][4] * det2_34_25 + mat[2][5] * det2_34_24;
//	float det3_234_345 = mat[2][3] * det2_34_45 - mat[2][4] * det2_34_35 + mat[2][5] * det2_34_34;
//	float det3_235_012 = mat[2][0] * det2_35_12 - mat[2][1] * det2_35_02 + mat[2][2] * det2_35_01;
//	float det3_235_013 = mat[2][0] * det2_35_13 - mat[2][1] * det2_35_03 + mat[2][3] * det2_35_01;
//	float det3_235_014 = mat[2][0] * det2_35_14 - mat[2][1] * det2_35_04 + mat[2][4] * det2_35_01;
//	float det3_235_015 = mat[2][0] * det2_35_15 - mat[2][1] * det2_35_05 + mat[2][5] * det2_35_01;
//	float det3_235_023 = mat[2][0] * det2_35_23 - mat[2][2] * det2_35_03 + mat[2][3] * det2_35_02;
//	float det3_235_024 = mat[2][0] * det2_35_24 - mat[2][2] * det2_35_04 + mat[2][4] * det2_35_02;
//	float det3_235_025 = mat[2][0] * det2_35_25 - mat[2][2] * det2_35_05 + mat[2][5] * det2_35_02;
//	float det3_235_034 = mat[2][0] * det2_35_34 - mat[2][3] * det2_35_04 + mat[2][4] * det2_35_03;
//	float det3_235_035 = mat[2][0] * det2_35_35 - mat[2][3] * det2_35_05 + mat[2][5] * det2_35_03;
//	float det3_235_045 = mat[2][0] * det2_35_45 - mat[2][4] * det2_35_05 + mat[2][5] * det2_35_04;
//	float det3_235_123 = mat[2][1] * det2_35_23 - mat[2][2] * det2_35_13 + mat[2][3] * det2_35_12;
//	float det3_235_124 = mat[2][1] * det2_35_24 - mat[2][2] * det2_35_14 + mat[2][4] * det2_35_12;
//	float det3_235_125 = mat[2][1] * det2_35_25 - mat[2][2] * det2_35_15 + mat[2][5] * det2_35_12;
//	float det3_235_134 = mat[2][1] * det2_35_34 - mat[2][3] * det2_35_14 + mat[2][4] * det2_35_13;
//	float det3_235_135 = mat[2][1] * det2_35_35 - mat[2][3] * det2_35_15 + mat[2][5] * det2_35_13;
//	float det3_235_145 = mat[2][1] * det2_35_45 - mat[2][4] * det2_35_15 + mat[2][5] * det2_35_14;
//	float det3_235_234 = mat[2][2] * det2_35_34 - mat[2][3] * det2_35_24 + mat[2][4] * det2_35_23;
//	float det3_235_235 = mat[2][2] * det2_35_35 - mat[2][3] * det2_35_25 + mat[2][5] * det2_35_23;
//	float det3_235_245 = mat[2][2] * det2_35_45 - mat[2][4] * det2_35_25 + mat[2][5] * det2_35_24;
//	float det3_235_345 = mat[2][3] * det2_35_45 - mat[2][4] * det2_35_35 + mat[2][5] * det2_35_34;
//	float det3_245_012 = mat[2][0] * det2_45_12 - mat[2][1] * det2_45_02 + mat[2][2] * det2_45_01;
//	float det3_245_013 = mat[2][0] * det2_45_13 - mat[2][1] * det2_45_03 + mat[2][3] * det2_45_01;
//	float det3_245_014 = mat[2][0] * det2_45_14 - mat[2][1] * det2_45_04 + mat[2][4] * det2_45_01;
//	float det3_245_015 = mat[2][0] * det2_45_15 - mat[2][1] * det2_45_05 + mat[2][5] * det2_45_01;
//	float det3_245_023 = mat[2][0] * det2_45_23 - mat[2][2] * det2_45_03 + mat[2][3] * det2_45_02;
//	float det3_245_024 = mat[2][0] * det2_45_24 - mat[2][2] * det2_45_04 + mat[2][4] * det2_45_02;
//	float det3_245_025 = mat[2][0] * det2_45_25 - mat[2][2] * det2_45_05 + mat[2][5] * det2_45_02;
//	float det3_245_034 = mat[2][0] * det2_45_34 - mat[2][3] * det2_45_04 + mat[2][4] * det2_45_03;
//	float det3_245_035 = mat[2][0] * det2_45_35 - mat[2][3] * det2_45_05 + mat[2][5] * det2_45_03;
//	float det3_245_045 = mat[2][0] * det2_45_45 - mat[2][4] * det2_45_05 + mat[2][5] * det2_45_04;
//	float det3_245_123 = mat[2][1] * det2_45_23 - mat[2][2] * det2_45_13 + mat[2][3] * det2_45_12;
//	float det3_245_124 = mat[2][1] * det2_45_24 - mat[2][2] * det2_45_14 + mat[2][4] * det2_45_12;
//	float det3_245_125 = mat[2][1] * det2_45_25 - mat[2][2] * det2_45_15 + mat[2][5] * det2_45_12;
//	float det3_245_134 = mat[2][1] * det2_45_34 - mat[2][3] * det2_45_14 + mat[2][4] * det2_45_13;
//	float det3_245_135 = mat[2][1] * det2_45_35 - mat[2][3] * det2_45_15 + mat[2][5] * det2_45_13;
//	float det3_245_145 = mat[2][1] * det2_45_45 - mat[2][4] * det2_45_15 + mat[2][5] * det2_45_14;
//	float det3_245_234 = mat[2][2] * det2_45_34 - mat[2][3] * det2_45_24 + mat[2][4] * det2_45_23;
//	float det3_245_235 = mat[2][2] * det2_45_35 - mat[2][3] * det2_45_25 + mat[2][5] * det2_45_23;
//	float det3_245_245 = mat[2][2] * det2_45_45 - mat[2][4] * det2_45_25 + mat[2][5] * det2_45_24;
//	float det3_245_345 = mat[2][3] * det2_45_45 - mat[2][4] * det2_45_35 + mat[2][5] * det2_45_34;
//
//	// remaining 4x4 sub-determinants
//	float det4_1234_0123 = mat[1][0] * det3_234_123 - mat[1][1] * det3_234_023 + mat[1][2] * det3_234_013 - mat[1][3] * det3_234_012;
//	float det4_1234_0124 = mat[1][0] * det3_234_124 - mat[1][1] * det3_234_024 + mat[1][2] * det3_234_014 - mat[1][4] * det3_234_012;
//	float det4_1234_0125 = mat[1][0] * det3_234_125 - mat[1][1] * det3_234_025 + mat[1][2] * det3_234_015 - mat[1][5] * det3_234_012;
//	float det4_1234_0134 = mat[1][0] * det3_234_134 - mat[1][1] * det3_234_034 + mat[1][3] * det3_234_014 - mat[1][4] * det3_234_013;
//	float det4_1234_0135 = mat[1][0] * det3_234_135 - mat[1][1] * det3_234_035 + mat[1][3] * det3_234_015 - mat[1][5] * det3_234_013;
//	float det4_1234_0145 = mat[1][0] * det3_234_145 - mat[1][1] * det3_234_045 + mat[1][4] * det3_234_015 - mat[1][5] * det3_234_014;
//	float det4_1234_0234 = mat[1][0] * det3_234_234 - mat[1][2] * det3_234_034 + mat[1][3] * det3_234_024 - mat[1][4] * det3_234_023;
//	float det4_1234_0235 = mat[1][0] * det3_234_235 - mat[1][2] * det3_234_035 + mat[1][3] * det3_234_025 - mat[1][5] * det3_234_023;
//	float det4_1234_0245 = mat[1][0] * det3_234_245 - mat[1][2] * det3_234_045 + mat[1][4] * det3_234_025 - mat[1][5] * det3_234_024;
//	float det4_1234_0345 = mat[1][0] * det3_234_345 - mat[1][3] * det3_234_045 + mat[1][4] * det3_234_035 - mat[1][5] * det3_234_034;
//	float det4_1234_1234 = mat[1][1] * det3_234_234 - mat[1][2] * det3_234_134 + mat[1][3] * det3_234_124 - mat[1][4] * det3_234_123;
//	float det4_1234_1235 = mat[1][1] * det3_234_235 - mat[1][2] * det3_234_135 + mat[1][3] * det3_234_125 - mat[1][5] * det3_234_123;
//	float det4_1234_1245 = mat[1][1] * det3_234_245 - mat[1][2] * det3_234_145 + mat[1][4] * det3_234_125 - mat[1][5] * det3_234_124;
//	float det4_1234_1345 = mat[1][1] * det3_234_345 - mat[1][3] * det3_234_145 + mat[1][4] * det3_234_135 - mat[1][5] * det3_234_134;
//	float det4_1234_2345 = mat[1][2] * det3_234_345 - mat[1][3] * det3_234_245 + mat[1][4] * det3_234_235 - mat[1][5] * det3_234_234;
//	float det4_1235_0123 = mat[1][0] * det3_235_123 - mat[1][1] * det3_235_023 + mat[1][2] * det3_235_013 - mat[1][3] * det3_235_012;
//	float det4_1235_0124 = mat[1][0] * det3_235_124 - mat[1][1] * det3_235_024 + mat[1][2] * det3_235_014 - mat[1][4] * det3_235_012;
//	float det4_1235_0125 = mat[1][0] * det3_235_125 - mat[1][1] * det3_235_025 + mat[1][2] * det3_235_015 - mat[1][5] * det3_235_012;
//	float det4_1235_0134 = mat[1][0] * det3_235_134 - mat[1][1] * det3_235_034 + mat[1][3] * det3_235_014 - mat[1][4] * det3_235_013;
//	float det4_1235_0135 = mat[1][0] * det3_235_135 - mat[1][1] * det3_235_035 + mat[1][3] * det3_235_015 - mat[1][5] * det3_235_013;
//	float det4_1235_0145 = mat[1][0] * det3_235_145 - mat[1][1] * det3_235_045 + mat[1][4] * det3_235_015 - mat[1][5] * det3_235_014;
//	float det4_1235_0234 = mat[1][0] * det3_235_234 - mat[1][2] * det3_235_034 + mat[1][3] * det3_235_024 - mat[1][4] * det3_235_023;
//	float det4_1235_0235 = mat[1][0] * det3_235_235 - mat[1][2] * det3_235_035 + mat[1][3] * det3_235_025 - mat[1][5] * det3_235_023;
//	float det4_1235_0245 = mat[1][0] * det3_235_245 - mat[1][2] * det3_235_045 + mat[1][4] * det3_235_025 - mat[1][5] * det3_235_024;
//	float det4_1235_0345 = mat[1][0] * det3_235_345 - mat[1][3] * det3_235_045 + mat[1][4] * det3_235_035 - mat[1][5] * det3_235_034;
//	float det4_1235_1234 = mat[1][1] * det3_235_234 - mat[1][2] * det3_235_134 + mat[1][3] * det3_235_124 - mat[1][4] * det3_235_123;
//	float det4_1235_1235 = mat[1][1] * det3_235_235 - mat[1][2] * det3_235_135 + mat[1][3] * det3_235_125 - mat[1][5] * det3_235_123;
//	float det4_1235_1245 = mat[1][1] * det3_235_245 - mat[1][2] * det3_235_145 + mat[1][4] * det3_235_125 - mat[1][5] * det3_235_124;
//	float det4_1235_1345 = mat[1][1] * det3_235_345 - mat[1][3] * det3_235_145 + mat[1][4] * det3_235_135 - mat[1][5] * det3_235_134;
//	float det4_1235_2345 = mat[1][2] * det3_235_345 - mat[1][3] * det3_235_245 + mat[1][4] * det3_235_235 - mat[1][5] * det3_235_234;
//	float det4_1245_0123 = mat[1][0] * det3_245_123 - mat[1][1] * det3_245_023 + mat[1][2] * det3_245_013 - mat[1][3] * det3_245_012;
//	float det4_1245_0124 = mat[1][0] * det3_245_124 - mat[1][1] * det3_245_024 + mat[1][2] * det3_245_014 - mat[1][4] * det3_245_012;
//	float det4_1245_0125 = mat[1][0] * det3_245_125 - mat[1][1] * det3_245_025 + mat[1][2] * det3_245_015 - mat[1][5] * det3_245_012;
//	float det4_1245_0134 = mat[1][0] * det3_245_134 - mat[1][1] * det3_245_034 + mat[1][3] * det3_245_014 - mat[1][4] * det3_245_013;
//	float det4_1245_0135 = mat[1][0] * det3_245_135 - mat[1][1] * det3_245_035 + mat[1][3] * det3_245_015 - mat[1][5] * det3_245_013;
//	float det4_1245_0145 = mat[1][0] * det3_245_145 - mat[1][1] * det3_245_045 + mat[1][4] * det3_245_015 - mat[1][5] * det3_245_014;
//	float det4_1245_0234 = mat[1][0] * det3_245_234 - mat[1][2] * det3_245_034 + mat[1][3] * det3_245_024 - mat[1][4] * det3_245_023;
//	float det4_1245_0235 = mat[1][0] * det3_245_235 - mat[1][2] * det3_245_035 + mat[1][3] * det3_245_025 - mat[1][5] * det3_245_023;
//	float det4_1245_0245 = mat[1][0] * det3_245_245 - mat[1][2] * det3_245_045 + mat[1][4] * det3_245_025 - mat[1][5] * det3_245_024;
//	float det4_1245_0345 = mat[1][0] * det3_245_345 - mat[1][3] * det3_245_045 + mat[1][4] * det3_245_035 - mat[1][5] * det3_245_034;
//	float det4_1245_1234 = mat[1][1] * det3_245_234 - mat[1][2] * det3_245_134 + mat[1][3] * det3_245_124 - mat[1][4] * det3_245_123;
//	float det4_1245_1235 = mat[1][1] * det3_245_235 - mat[1][2] * det3_245_135 + mat[1][3] * det3_245_125 - mat[1][5] * det3_245_123;
//	float det4_1245_1245 = mat[1][1] * det3_245_245 - mat[1][2] * det3_245_145 + mat[1][4] * det3_245_125 - mat[1][5] * det3_245_124;
//	float det4_1245_1345 = mat[1][1] * det3_245_345 - mat[1][3] * det3_245_145 + mat[1][4] * det3_245_135 - mat[1][5] * det3_245_134;
//	float det4_1245_2345 = mat[1][2] * det3_245_345 - mat[1][3] * det3_245_245 + mat[1][4] * det3_245_235 - mat[1][5] * det3_245_234;
//	float det4_1345_0123 = mat[1][0] * det3_345_123 - mat[1][1] * det3_345_023 + mat[1][2] * det3_345_013 - mat[1][3] * det3_345_012;
//	float det4_1345_0124 = mat[1][0] * det3_345_124 - mat[1][1] * det3_345_024 + mat[1][2] * det3_345_014 - mat[1][4] * det3_345_012;
//	float det4_1345_0125 = mat[1][0] * det3_345_125 - mat[1][1] * det3_345_025 + mat[1][2] * det3_345_015 - mat[1][5] * det3_345_012;
//	float det4_1345_0134 = mat[1][0] * det3_345_134 - mat[1][1] * det3_345_034 + mat[1][3] * det3_345_014 - mat[1][4] * det3_345_013;
//	float det4_1345_0135 = mat[1][0] * det3_345_135 - mat[1][1] * det3_345_035 + mat[1][3] * det3_345_015 - mat[1][5] * det3_345_013;
//	float det4_1345_0145 = mat[1][0] * det3_345_145 - mat[1][1] * det3_345_045 + mat[1][4] * det3_345_015 - mat[1][5] * det3_345_014;
//	float det4_1345_0234 = mat[1][0] * det3_345_234 - mat[1][2] * det3_345_034 + mat[1][3] * det3_345_024 - mat[1][4] * det3_345_023;
//	float det4_1345_0235 = mat[1][0] * det3_345_235 - mat[1][2] * det3_345_035 + mat[1][3] * det3_345_025 - mat[1][5] * det3_345_023;
//	float det4_1345_0245 = mat[1][0] * det3_345_245 - mat[1][2] * det3_345_045 + mat[1][4] * det3_345_025 - mat[1][5] * det3_345_024;
//	float det4_1345_0345 = mat[1][0] * det3_345_345 - mat[1][3] * det3_345_045 + mat[1][4] * det3_345_035 - mat[1][5] * det3_345_034;
//	float det4_1345_1234 = mat[1][1] * det3_345_234 - mat[1][2] * det3_345_134 + mat[1][3] * det3_345_124 - mat[1][4] * det3_345_123;
//	float det4_1345_1235 = mat[1][1] * det3_345_235 - mat[1][2] * det3_345_135 + mat[1][3] * det3_345_125 - mat[1][5] * det3_345_123;
//	float det4_1345_1245 = mat[1][1] * det3_345_245 - mat[1][2] * det3_345_145 + mat[1][4] * det3_345_125 - mat[1][5] * det3_345_124;
//	float det4_1345_1345 = mat[1][1] * det3_345_345 - mat[1][3] * det3_345_145 + mat[1][4] * det3_345_135 - mat[1][5] * det3_345_134;
//	float det4_1345_2345 = mat[1][2] * det3_345_345 - mat[1][3] * det3_345_245 + mat[1][4] * det3_345_235 - mat[1][5] * det3_345_234;
//
//	// remaining 5x5 sub-determinants
//	float det5_01234_01234 = mat[0][0] * det4_1234_1234 - mat[0][1] * det4_1234_0234 + mat[0][2] * det4_1234_0134 - mat[0][3] * det4_1234_0124 + mat[0][4] * det4_1234_0123;
//	float det5_01234_01235 = mat[0][0] * det4_1234_1235 - mat[0][1] * det4_1234_0235 + mat[0][2] * det4_1234_0135 - mat[0][3] * det4_1234_0125 + mat[0][5] * det4_1234_0123;
//	float det5_01234_01245 = mat[0][0] * det4_1234_1245 - mat[0][1] * det4_1234_0245 + mat[0][2] * det4_1234_0145 - mat[0][4] * det4_1234_0125 + mat[0][5] * det4_1234_0124;
//	float det5_01234_01345 = mat[0][0] * det4_1234_1345 - mat[0][1] * det4_1234_0345 + mat[0][3] * det4_1234_0145 - mat[0][4] * det4_1234_0135 + mat[0][5] * det4_1234_0134;
//	float det5_01234_02345 = mat[0][0] * det4_1234_2345 - mat[0][2] * det4_1234_0345 + mat[0][3] * det4_1234_0245 - mat[0][4] * det4_1234_0235 + mat[0][5] * det4_1234_0234;
//	float det5_01234_12345 = mat[0][1] * det4_1234_2345 - mat[0][2] * det4_1234_1345 + mat[0][3] * det4_1234_1245 - mat[0][4] * det4_1234_1235 + mat[0][5] * det4_1234_1234;
//	float det5_01235_01234 = mat[0][0] * det4_1235_1234 - mat[0][1] * det4_1235_0234 + mat[0][2] * det4_1235_0134 - mat[0][3] * det4_1235_0124 + mat[0][4] * det4_1235_0123;
//	float det5_01235_01235 = mat[0][0] * det4_1235_1235 - mat[0][1] * det4_1235_0235 + mat[0][2] * det4_1235_0135 - mat[0][3] * det4_1235_0125 + mat[0][5] * det4_1235_0123;
//	float det5_01235_01245 = mat[0][0] * det4_1235_1245 - mat[0][1] * det4_1235_0245 + mat[0][2] * det4_1235_0145 - mat[0][4] * det4_1235_0125 + mat[0][5] * det4_1235_0124;
//	float det5_01235_01345 = mat[0][0] * det4_1235_1345 - mat[0][1] * det4_1235_0345 + mat[0][3] * det4_1235_0145 - mat[0][4] * det4_1235_0135 + mat[0][5] * det4_1235_0134;
//	float det5_01235_02345 = mat[0][0] * det4_1235_2345 - mat[0][2] * det4_1235_0345 + mat[0][3] * det4_1235_0245 - mat[0][4] * det4_1235_0235 + mat[0][5] * det4_1235_0234;
//	float det5_01235_12345 = mat[0][1] * det4_1235_2345 - mat[0][2] * det4_1235_1345 + mat[0][3] * det4_1235_1245 - mat[0][4] * det4_1235_1235 + mat[0][5] * det4_1235_1234;
//	float det5_01245_01234 = mat[0][0] * det4_1245_1234 - mat[0][1] * det4_1245_0234 + mat[0][2] * det4_1245_0134 - mat[0][3] * det4_1245_0124 + mat[0][4] * det4_1245_0123;
//	float det5_01245_01235 = mat[0][0] * det4_1245_1235 - mat[0][1] * det4_1245_0235 + mat[0][2] * det4_1245_0135 - mat[0][3] * det4_1245_0125 + mat[0][5] * det4_1245_0123;
//	float det5_01245_01245 = mat[0][0] * det4_1245_1245 - mat[0][1] * det4_1245_0245 + mat[0][2] * det4_1245_0145 - mat[0][4] * det4_1245_0125 + mat[0][5] * det4_1245_0124;
//	float det5_01245_01345 = mat[0][0] * det4_1245_1345 - mat[0][1] * det4_1245_0345 + mat[0][3] * det4_1245_0145 - mat[0][4] * det4_1245_0135 + mat[0][5] * det4_1245_0134;
//	float det5_01245_02345 = mat[0][0] * det4_1245_2345 - mat[0][2] * det4_1245_0345 + mat[0][3] * det4_1245_0245 - mat[0][4] * det4_1245_0235 + mat[0][5] * det4_1245_0234;
//	float det5_01245_12345 = mat[0][1] * det4_1245_2345 - mat[0][2] * det4_1245_1345 + mat[0][3] * det4_1245_1245 - mat[0][4] * det4_1245_1235 + mat[0][5] * det4_1245_1234;
//	float det5_01345_01234 = mat[0][0] * det4_1345_1234 - mat[0][1] * det4_1345_0234 + mat[0][2] * det4_1345_0134 - mat[0][3] * det4_1345_0124 + mat[0][4] * det4_1345_0123;
//	float det5_01345_01235 = mat[0][0] * det4_1345_1235 - mat[0][1] * det4_1345_0235 + mat[0][2] * det4_1345_0135 - mat[0][3] * det4_1345_0125 + mat[0][5] * det4_1345_0123;
//	float det5_01345_01245 = mat[0][0] * det4_1345_1245 - mat[0][1] * det4_1345_0245 + mat[0][2] * det4_1345_0145 - mat[0][4] * det4_1345_0125 + mat[0][5] * det4_1345_0124;
//	float det5_01345_01345 = mat[0][0] * det4_1345_1345 - mat[0][1] * det4_1345_0345 + mat[0][3] * det4_1345_0145 - mat[0][4] * det4_1345_0135 + mat[0][5] * det4_1345_0134;
//	float det5_01345_02345 = mat[0][0] * det4_1345_2345 - mat[0][2] * det4_1345_0345 + mat[0][3] * det4_1345_0245 - mat[0][4] * det4_1345_0235 + mat[0][5] * det4_1345_0234;
//	float det5_01345_12345 = mat[0][1] * det4_1345_2345 - mat[0][2] * det4_1345_1345 + mat[0][3] * det4_1345_1245 - mat[0][4] * det4_1345_1235 + mat[0][5] * det4_1345_1234;
//	float det5_02345_01234 = mat[0][0] * det4_2345_1234 - mat[0][1] * det4_2345_0234 + mat[0][2] * det4_2345_0134 - mat[0][3] * det4_2345_0124 + mat[0][4] * det4_2345_0123;
//	float det5_02345_01235 = mat[0][0] * det4_2345_1235 - mat[0][1] * det4_2345_0235 + mat[0][2] * det4_2345_0135 - mat[0][3] * det4_2345_0125 + mat[0][5] * det4_2345_0123;
//	float det5_02345_01245 = mat[0][0] * det4_2345_1245 - mat[0][1] * det4_2345_0245 + mat[0][2] * det4_2345_0145 - mat[0][4] * det4_2345_0125 + mat[0][5] * det4_2345_0124;
//	float det5_02345_01345 = mat[0][0] * det4_2345_1345 - mat[0][1] * det4_2345_0345 + mat[0][3] * det4_2345_0145 - mat[0][4] * det4_2345_0135 + mat[0][5] * det4_2345_0134;
//	float det5_02345_02345 = mat[0][0] * det4_2345_2345 - mat[0][2] * det4_2345_0345 + mat[0][3] * det4_2345_0245 - mat[0][4] * det4_2345_0235 + mat[0][5] * det4_2345_0234;
//	float det5_02345_12345 = mat[0][1] * det4_2345_2345 - mat[0][2] * det4_2345_1345 + mat[0][3] * det4_2345_1245 - mat[0][4] * det4_2345_1235 + mat[0][5] * det4_2345_1234;
//
//	mat[0][0] =  det5_12345_12345 * invDet;
//	mat[0][1] = -det5_02345_12345 * invDet;
//	mat[0][2] =  det5_01345_12345 * invDet;
//	mat[0][3] = -det5_01245_12345 * invDet;
//	mat[0][4] =  det5_01235_12345 * invDet;
//	mat[0][5] = -det5_01234_12345 * invDet;
//
//	mat[1][0] = -det5_12345_02345 * invDet;
//	mat[1][1] =  det5_02345_02345 * invDet;
//	mat[1][2] = -det5_01345_02345 * invDet;
//	mat[1][3] =  det5_01245_02345 * invDet;
//	mat[1][4] = -det5_01235_02345 * invDet;
//	mat[1][5] =  det5_01234_02345 * invDet;
//
//	mat[2][0] =  det5_12345_01345 * invDet;
//	mat[2][1] = -det5_02345_01345 * invDet;
//	mat[2][2] =  det5_01345_01345 * invDet;
//	mat[2][3] = -det5_01245_01345 * invDet;
//	mat[2][4] =  det5_01235_01345 * invDet;
//	mat[2][5] = -det5_01234_01345 * invDet;
//
//	mat[3][0] = -det5_12345_01245 * invDet;
//	mat[3][1] =  det5_02345_01245 * invDet;
//	mat[3][2] = -det5_01345_01245 * invDet;
//	mat[3][3] =  det5_01245_01245 * invDet;
//	mat[3][4] = -det5_01235_01245 * invDet;
//	mat[3][5] =  det5_01234_01245 * invDet;
//
//	mat[4][0] =  det5_12345_01235 * invDet;
//	mat[4][1] = -det5_02345_01235 * invDet;
//	mat[4][2] =  det5_01345_01235 * invDet;
//	mat[4][3] = -det5_01245_01235 * invDet;
//	mat[4][4] =  det5_01235_01235 * invDet;
//	mat[4][5] = -det5_01234_01235 * invDet;
//
//	mat[5][0] = -det5_12345_01234 * invDet;
//	mat[5][1] =  det5_02345_01234 * invDet;
//	mat[5][2] = -det5_01345_01234 * invDet;
//	mat[5][3] =  det5_01245_01234 * invDet;
//	mat[5][4] = -det5_01235_01234 * invDet;
//	mat[5][5] =  det5_01234_01234 * invDet;
//
//	return true;
//#elif 0
//	// 6*40 = 240 multiplications
//	//			6 divisions
//	float *mat = reinterpret_cast<float *>(this);
//	float s;
//	double d, di;
//
//	di = mat[0];
//	s = di;
//	mat[0] = d = 1.0f / di;
//	mat[1] *= d;
//	mat[2] *= d;
//	mat[3] *= d;
//	mat[4] *= d;
//	mat[5] *= d;
//	d = -d;
//	mat[6] *= d;
//	mat[12] *= d;
//	mat[18] *= d;
//	mat[24] *= d;
//	mat[30] *= d;
//	d = mat[6] * di;
//	mat[7] += mat[1] * d;
//	mat[8] += mat[2] * d;
//	mat[9] += mat[3] * d;
//	mat[10] += mat[4] * d;
//	mat[11] += mat[5] * d;
//	d = mat[12] * di;
//	mat[13] += mat[1] * d;
//	mat[14] += mat[2] * d;
//	mat[15] += mat[3] * d;
//	mat[16] += mat[4] * d;
//	mat[17] += mat[5] * d;
//	d = mat[18] * di;
//	mat[19] += mat[1] * d;
//	mat[20] += mat[2] * d;
//	mat[21] += mat[3] * d;
//	mat[22] += mat[4] * d;
//	mat[23] += mat[5] * d;
//	d = mat[24] * di;
//	mat[25] += mat[1] * d;
//	mat[26] += mat[2] * d;
//	mat[27] += mat[3] * d;
//	mat[28] += mat[4] * d;
//	mat[29] += mat[5] * d;
//	d = mat[30] * di;
//	mat[31] += mat[1] * d;
//	mat[32] += mat[2] * d;
//	mat[33] += mat[3] * d;
//	mat[34] += mat[4] * d;
//	mat[35] += mat[5] * d;
//	di = mat[7];
//	s *= di;
//	mat[7] = d = 1.0f / di;
//	mat[6] *= d;
//	mat[8] *= d;
//	mat[9] *= d;
//	mat[10] *= d;
//	mat[11] *= d;
//	d = -d;
//	mat[1] *= d;
//	mat[13] *= d;
//	mat[19] *= d;
//	mat[25] *= d;
//	mat[31] *= d;
//	d = mat[1] * di;
//	mat[0] += mat[6] * d;
//	mat[2] += mat[8] * d;
//	mat[3] += mat[9] * d;
//	mat[4] += mat[10] * d;
//	mat[5] += mat[11] * d;
//	d = mat[13] * di;
//	mat[12] += mat[6] * d;
//	mat[14] += mat[8] * d;
//	mat[15] += mat[9] * d;
//	mat[16] += mat[10] * d;
//	mat[17] += mat[11] * d;
//	d = mat[19] * di;
//	mat[18] += mat[6] * d;
//	mat[20] += mat[8] * d;
//	mat[21] += mat[9] * d;
//	mat[22] += mat[10] * d;
//	mat[23] += mat[11] * d;
//	d = mat[25] * di;
//	mat[24] += mat[6] * d;
//	mat[26] += mat[8] * d;
//	mat[27] += mat[9] * d;
//	mat[28] += mat[10] * d;
//	mat[29] += mat[11] * d;
//	d = mat[31] * di;
//	mat[30] += mat[6] * d;
//	mat[32] += mat[8] * d;
//	mat[33] += mat[9] * d;
//	mat[34] += mat[10] * d;
//	mat[35] += mat[11] * d;
//	di = mat[14];
//	s *= di;
//	mat[14] = d = 1.0f / di;
//	mat[12] *= d;
//	mat[13] *= d;
//	mat[15] *= d;
//	mat[16] *= d;
//	mat[17] *= d;
//	d = -d;
//	mat[2] *= d;
//	mat[8] *= d;
//	mat[20] *= d;
//	mat[26] *= d;
//	mat[32] *= d;
//	d = mat[2] * di;
//	mat[0] += mat[12] * d;
//	mat[1] += mat[13] * d;
//	mat[3] += mat[15] * d;
//	mat[4] += mat[16] * d;
//	mat[5] += mat[17] * d;
//	d = mat[8] * di;
//	mat[6] += mat[12] * d;
//	mat[7] += mat[13] * d;
//	mat[9] += mat[15] * d;
//	mat[10] += mat[16] * d;
//	mat[11] += mat[17] * d;
//	d = mat[20] * di;
//	mat[18] += mat[12] * d;
//	mat[19] += mat[13] * d;
//	mat[21] += mat[15] * d;
//	mat[22] += mat[16] * d;
//	mat[23] += mat[17] * d;
//	d = mat[26] * di;
//	mat[24] += mat[12] * d;
//	mat[25] += mat[13] * d;
//	mat[27] += mat[15] * d;
//	mat[28] += mat[16] * d;
//	mat[29] += mat[17] * d;
//	d = mat[32] * di;
//	mat[30] += mat[12] * d;
//	mat[31] += mat[13] * d;
//	mat[33] += mat[15] * d;
//	mat[34] += mat[16] * d;
//	mat[35] += mat[17] * d;
//	di = mat[21];
//	s *= di;
//	mat[21] = d = 1.0f / di;
//	mat[18] *= d;
//	mat[19] *= d;
//	mat[20] *= d;
//	mat[22] *= d;
//	mat[23] *= d;
//	d = -d;
//	mat[3] *= d;
//	mat[9] *= d;
//	mat[15] *= d;
//	mat[27] *= d;
//	mat[33] *= d;
//	d = mat[3] * di;
//	mat[0] += mat[18] * d;
//	mat[1] += mat[19] * d;
//	mat[2] += mat[20] * d;
//	mat[4] += mat[22] * d;
//	mat[5] += mat[23] * d;
//	d = mat[9] * di;
//	mat[6] += mat[18] * d;
//	mat[7] += mat[19] * d;
//	mat[8] += mat[20] * d;
//	mat[10] += mat[22] * d;
//	mat[11] += mat[23] * d;
//	d = mat[15] * di;
//	mat[12] += mat[18] * d;
//	mat[13] += mat[19] * d;
//	mat[14] += mat[20] * d;
//	mat[16] += mat[22] * d;
//	mat[17] += mat[23] * d;
//	d = mat[27] * di;
//	mat[24] += mat[18] * d;
//	mat[25] += mat[19] * d;
//	mat[26] += mat[20] * d;
//	mat[28] += mat[22] * d;
//	mat[29] += mat[23] * d;
//	d = mat[33] * di;
//	mat[30] += mat[18] * d;
//	mat[31] += mat[19] * d;
//	mat[32] += mat[20] * d;
//	mat[34] += mat[22] * d;
//	mat[35] += mat[23] * d;
//	di = mat[28];
//	s *= di;
//	mat[28] = d = 1.0f / di;
//	mat[24] *= d;
//	mat[25] *= d;
//	mat[26] *= d;
//	mat[27] *= d;
//	mat[29] *= d;
//	d = -d;
//	mat[4] *= d;
//	mat[10] *= d;
//	mat[16] *= d;
//	mat[22] *= d;
//	mat[34] *= d;
//	d = mat[4] * di;
//	mat[0] += mat[24] * d;
//	mat[1] += mat[25] * d;
//	mat[2] += mat[26] * d;
//	mat[3] += mat[27] * d;
//	mat[5] += mat[29] * d;
//	d = mat[10] * di;
//	mat[6] += mat[24] * d;
//	mat[7] += mat[25] * d;
//	mat[8] += mat[26] * d;
//	mat[9] += mat[27] * d;
//	mat[11] += mat[29] * d;
//	d = mat[16] * di;
//	mat[12] += mat[24] * d;
//	mat[13] += mat[25] * d;
//	mat[14] += mat[26] * d;
//	mat[15] += mat[27] * d;
//	mat[17] += mat[29] * d;
//	d = mat[22] * di;
//	mat[18] += mat[24] * d;
//	mat[19] += mat[25] * d;
//	mat[20] += mat[26] * d;
//	mat[21] += mat[27] * d;
//	mat[23] += mat[29] * d;
//	d = mat[34] * di;
//	mat[30] += mat[24] * d;
//	mat[31] += mat[25] * d;
//	mat[32] += mat[26] * d;
//	mat[33] += mat[27] * d;
//	mat[35] += mat[29] * d;
//	di = mat[35];
//	s *= di;
//	mat[35] = d = 1.0f / di;
//	mat[30] *= d;
//	mat[31] *= d;
//	mat[32] *= d;
//	mat[33] *= d;
//	mat[34] *= d;
//	d = -d;
//	mat[5] *= d;
//	mat[11] *= d;
//	mat[17] *= d;
//	mat[23] *= d;
//	mat[29] *= d;
//	d = mat[5] * di;
//	mat[0] += mat[30] * d;
//	mat[1] += mat[31] * d;
//	mat[2] += mat[32] * d;
//	mat[3] += mat[33] * d;
//	mat[4] += mat[34] * d;
//	d = mat[11] * di;
//	mat[6] += mat[30] * d;
//	mat[7] += mat[31] * d;
//	mat[8] += mat[32] * d;
//	mat[9] += mat[33] * d;
//	mat[10] += mat[34] * d;
//	d = mat[17] * di;
//	mat[12] += mat[30] * d;
//	mat[13] += mat[31] * d;
//	mat[14] += mat[32] * d;
//	mat[15] += mat[33] * d;
//	mat[16] += mat[34] * d;
//	d = mat[23] * di;
//	mat[18] += mat[30] * d;
//	mat[19] += mat[31] * d;
//	mat[20] += mat[32] * d;
//	mat[21] += mat[33] * d;
//	mat[22] += mat[34] * d;
//	d = mat[29] * di;
//	mat[24] += mat[30] * d;
//	mat[25] += mat[31] * d;
//	mat[26] += mat[32] * d;
//	mat[27] += mat[33] * d;
//	mat[28] += mat[34] * d;
//
//	return ( s != 0.0f && !FLOAT_IS_NAN( s ) );
//#else
//	// 6*27+2*30 = 222 multiplications
//	//		2*1  =	 2 divisions
//	idMat3 r0, r1, r2, r3;
//	float c0, c1, c2, det, invDet;
//	float *mat = reinterpret_cast<float *>(this);
//
//	// r0 = m0.Inverse();
//	c0 = mat[1*6+1] * mat[2*6+2] - mat[1*6+2] * mat[2*6+1];
//	c1 = mat[1*6+2] * mat[2*6+0] - mat[1*6+0] * mat[2*6+2];
//	c2 = mat[1*6+0] * mat[2*6+1] - mat[1*6+1] * mat[2*6+0];
//
//	det = mat[0*6+0] * c0 + mat[0*6+1] * c1 + mat[0*6+2] * c2;
//
//	if ( idMath::Fabs( det ) < MATRIX_INVERSE_EPSILON ) {
//		return false;
//	}
//
//	invDet = 1.0f / det;
//
//	r0[0][0] = c0 * invDet;
//	r0[0][1] = ( mat[0*6+2] * mat[2*6+1] - mat[0*6+1] * mat[2*6+2] ) * invDet;
//	r0[0][2] = ( mat[0*6+1] * mat[1*6+2] - mat[0*6+2] * mat[1*6+1] ) * invDet;
//	r0[1][0] = c1 * invDet;
//	r0[1][1] = ( mat[0*6+0] * mat[2*6+2] - mat[0*6+2] * mat[2*6+0] ) * invDet;
//	r0[1][2] = ( mat[0*6+2] * mat[1*6+0] - mat[0*6+0] * mat[1*6+2] ) * invDet;
//	r0[2][0] = c2 * invDet;
//	r0[2][1] = ( mat[0*6+1] * mat[2*6+0] - mat[0*6+0] * mat[2*6+1] ) * invDet;
//	r0[2][2] = ( mat[0*6+0] * mat[1*6+1] - mat[0*6+1] * mat[1*6+0] ) * invDet;
//
//	// r1 = r0 * m1;
//	r1[0][0] = r0[0][0] * mat[0*6+3] + r0[0][1] * mat[1*6+3] + r0[0][2] * mat[2*6+3];
//	r1[0][1] = r0[0][0] * mat[0*6+4] + r0[0][1] * mat[1*6+4] + r0[0][2] * mat[2*6+4];
//	r1[0][2] = r0[0][0] * mat[0*6+5] + r0[0][1] * mat[1*6+5] + r0[0][2] * mat[2*6+5];
//	r1[1][0] = r0[1][0] * mat[0*6+3] + r0[1][1] * mat[1*6+3] + r0[1][2] * mat[2*6+3];
//	r1[1][1] = r0[1][0] * mat[0*6+4] + r0[1][1] * mat[1*6+4] + r0[1][2] * mat[2*6+4];
//	r1[1][2] = r0[1][0] * mat[0*6+5] + r0[1][1] * mat[1*6+5] + r0[1][2] * mat[2*6+5];
//	r1[2][0] = r0[2][0] * mat[0*6+3] + r0[2][1] * mat[1*6+3] + r0[2][2] * mat[2*6+3];
//	r1[2][1] = r0[2][0] * mat[0*6+4] + r0[2][1] * mat[1*6+4] + r0[2][2] * mat[2*6+4];
//	r1[2][2] = r0[2][0] * mat[0*6+5] + r0[2][1] * mat[1*6+5] + r0[2][2] * mat[2*6+5];
//
//	// r2 = m2 * r1;
//	r2[0][0] = mat[3*6+0] * r1[0][0] + mat[3*6+1] * r1[1][0] + mat[3*6+2] * r1[2][0];
//	r2[0][1] = mat[3*6+0] * r1[0][1] + mat[3*6+1] * r1[1][1] + mat[3*6+2] * r1[2][1];
//	r2[0][2] = mat[3*6+0] * r1[0][2] + mat[3*6+1] * r1[1][2] + mat[3*6+2] * r1[2][2];
//	r2[1][0] = mat[4*6+0] * r1[0][0] + mat[4*6+1] * r1[1][0] + mat[4*6+2] * r1[2][0];
//	r2[1][1] = mat[4*6+0] * r1[0][1] + mat[4*6+1] * r1[1][1] + mat[4*6+2] * r1[2][1];
//	r2[1][2] = mat[4*6+0] * r1[0][2] + mat[4*6+1] * r1[1][2] + mat[4*6+2] * r1[2][2];
//	r2[2][0] = mat[5*6+0] * r1[0][0] + mat[5*6+1] * r1[1][0] + mat[5*6+2] * r1[2][0];
//	r2[2][1] = mat[5*6+0] * r1[0][1] + mat[5*6+1] * r1[1][1] + mat[5*6+2] * r1[2][1];
//	r2[2][2] = mat[5*6+0] * r1[0][2] + mat[5*6+1] * r1[1][2] + mat[5*6+2] * r1[2][2];
//
//	// r3 = r2 - m3;
//	r3[0][0] = r2[0][0] - mat[3*6+3];
//	r3[0][1] = r2[0][1] - mat[3*6+4];
//	r3[0][2] = r2[0][2] - mat[3*6+5];
//	r3[1][0] = r2[1][0] - mat[4*6+3];
//	r3[1][1] = r2[1][1] - mat[4*6+4];
//	r3[1][2] = r2[1][2] - mat[4*6+5];
//	r3[2][0] = r2[2][0] - mat[5*6+3];
//	r3[2][1] = r2[2][1] - mat[5*6+4];
//	r3[2][2] = r2[2][2] - mat[5*6+5];
//
//	// r3.InverseSelf();
//	r2[0][0] = r3[1][1] * r3[2][2] - r3[1][2] * r3[2][1];
//	r2[1][0] = r3[1][2] * r3[2][0] - r3[1][0] * r3[2][2];
//	r2[2][0] = r3[1][0] * r3[2][1] - r3[1][1] * r3[2][0];
//
//	det = r3[0][0] * r2[0][0] + r3[0][1] * r2[1][0] + r3[0][2] * r2[2][0];
//
//	if ( idMath::Fabs( det ) < MATRIX_INVERSE_EPSILON ) {
//		return false;
//	}
//
//	invDet = 1.0f / det;
//
//	r2[0][1] = r3[0][2] * r3[2][1] - r3[0][1] * r3[2][2];
//	r2[0][2] = r3[0][1] * r3[1][2] - r3[0][2] * r3[1][1];
//	r2[1][1] = r3[0][0] * r3[2][2] - r3[0][2] * r3[2][0];
//	r2[1][2] = r3[0][2] * r3[1][0] - r3[0][0] * r3[1][2];
//	r2[2][1] = r3[0][1] * r3[2][0] - r3[0][0] * r3[2][1];
//	r2[2][2] = r3[0][0] * r3[1][1] - r3[0][1] * r3[1][0];
//
//	r3[0][0] = r2[0][0] * invDet;
//	r3[0][1] = r2[0][1] * invDet;
//	r3[0][2] = r2[0][2] * invDet;
//	r3[1][0] = r2[1][0] * invDet;
//	r3[1][1] = r2[1][1] * invDet;
//	r3[1][2] = r2[1][2] * invDet;
//	r3[2][0] = r2[2][0] * invDet;
//	r3[2][1] = r2[2][1] * invDet;
//	r3[2][2] = r2[2][2] * invDet;
//
//	// r2 = m2 * r0;
//	r2[0][0] = mat[3*6+0] * r0[0][0] + mat[3*6+1] * r0[1][0] + mat[3*6+2] * r0[2][0];
//	r2[0][1] = mat[3*6+0] * r0[0][1] + mat[3*6+1] * r0[1][1] + mat[3*6+2] * r0[2][1];
//	r2[0][2] = mat[3*6+0] * r0[0][2] + mat[3*6+1] * r0[1][2] + mat[3*6+2] * r0[2][2];
//	r2[1][0] = mat[4*6+0] * r0[0][0] + mat[4*6+1] * r0[1][0] + mat[4*6+2] * r0[2][0];
//	r2[1][1] = mat[4*6+0] * r0[0][1] + mat[4*6+1] * r0[1][1] + mat[4*6+2] * r0[2][1];
//	r2[1][2] = mat[4*6+0] * r0[0][2] + mat[4*6+1] * r0[1][2] + mat[4*6+2] * r0[2][2];
//	r2[2][0] = mat[5*6+0] * r0[0][0] + mat[5*6+1] * r0[1][0] + mat[5*6+2] * r0[2][0];
//	r2[2][1] = mat[5*6+0] * r0[0][1] + mat[5*6+1] * r0[1][1] + mat[5*6+2] * r0[2][1];
//	r2[2][2] = mat[5*6+0] * r0[0][2] + mat[5*6+1] * r0[1][2] + mat[5*6+2] * r0[2][2];
//
//	// m2 = r3 * r2;
//	mat[3*6+0] = r3[0][0] * r2[0][0] + r3[0][1] * r2[1][0] + r3[0][2] * r2[2][0];
//	mat[3*6+1] = r3[0][0] * r2[0][1] + r3[0][1] * r2[1][1] + r3[0][2] * r2[2][1];
//	mat[3*6+2] = r3[0][0] * r2[0][2] + r3[0][1] * r2[1][2] + r3[0][2] * r2[2][2];
//	mat[4*6+0] = r3[1][0] * r2[0][0] + r3[1][1] * r2[1][0] + r3[1][2] * r2[2][0];
//	mat[4*6+1] = r3[1][0] * r2[0][1] + r3[1][1] * r2[1][1] + r3[1][2] * r2[2][1];
//	mat[4*6+2] = r3[1][0] * r2[0][2] + r3[1][1] * r2[1][2] + r3[1][2] * r2[2][2];
//	mat[5*6+0] = r3[2][0] * r2[0][0] + r3[2][1] * r2[1][0] + r3[2][2] * r2[2][0];
//	mat[5*6+1] = r3[2][0] * r2[0][1] + r3[2][1] * r2[1][1] + r3[2][2] * r2[2][1];
//	mat[5*6+2] = r3[2][0] * r2[0][2] + r3[2][1] * r2[1][2] + r3[2][2] * r2[2][2];
//
//	// m0 = r0 - r1 * m2;
//	mat[0*6+0] = r0[0][0] - r1[0][0] * mat[3*6+0] - r1[0][1] * mat[4*6+0] - r1[0][2] * mat[5*6+0];
//	mat[0*6+1] = r0[0][1] - r1[0][0] * mat[3*6+1] - r1[0][1] * mat[4*6+1] - r1[0][2] * mat[5*6+1];
//	mat[0*6+2] = r0[0][2] - r1[0][0] * mat[3*6+2] - r1[0][1] * mat[4*6+2] - r1[0][2] * mat[5*6+2];
//	mat[1*6+0] = r0[1][0] - r1[1][0] * mat[3*6+0] - r1[1][1] * mat[4*6+0] - r1[1][2] * mat[5*6+0];
//	mat[1*6+1] = r0[1][1] - r1[1][0] * mat[3*6+1] - r1[1][1] * mat[4*6+1] - r1[1][2] * mat[5*6+1];
//	mat[1*6+2] = r0[1][2] - r1[1][0] * mat[3*6+2] - r1[1][1] * mat[4*6+2] - r1[1][2] * mat[5*6+2];
//	mat[2*6+0] = r0[2][0] - r1[2][0] * mat[3*6+0] - r1[2][1] * mat[4*6+0] - r1[2][2] * mat[5*6+0];
//	mat[2*6+1] = r0[2][1] - r1[2][0] * mat[3*6+1] - r1[2][1] * mat[4*6+1] - r1[2][2] * mat[5*6+1];
//	mat[2*6+2] = r0[2][2] - r1[2][0] * mat[3*6+2] - r1[2][1] * mat[4*6+2] - r1[2][2] * mat[5*6+2];
//
//	// m1 = r1 * r3;
//	mat[0*6+3] = r1[0][0] * r3[0][0] + r1[0][1] * r3[1][0] + r1[0][2] * r3[2][0];
//	mat[0*6+4] = r1[0][0] * r3[0][1] + r1[0][1] * r3[1][1] + r1[0][2] * r3[2][1];
//	mat[0*6+5] = r1[0][0] * r3[0][2] + r1[0][1] * r3[1][2] + r1[0][2] * r3[2][2];
//	mat[1*6+3] = r1[1][0] * r3[0][0] + r1[1][1] * r3[1][0] + r1[1][2] * r3[2][0];
//	mat[1*6+4] = r1[1][0] * r3[0][1] + r1[1][1] * r3[1][1] + r1[1][2] * r3[2][1];
//	mat[1*6+5] = r1[1][0] * r3[0][2] + r1[1][1] * r3[1][2] + r1[1][2] * r3[2][2];
//	mat[2*6+3] = r1[2][0] * r3[0][0] + r1[2][1] * r3[1][0] + r1[2][2] * r3[2][0];
//	mat[2*6+4] = r1[2][0] * r3[0][1] + r1[2][1] * r3[1][1] + r1[2][2] * r3[2][1];
//	mat[2*6+5] = r1[2][0] * r3[0][2] + r1[2][1] * r3[1][2] + r1[2][2] * r3[2][2];
//
//	// m3 = -r3;
//	mat[3*6+3] = -r3[0][0];
//	mat[3*6+4] = -r3[0][1];
//	mat[3*6+5] = -r3[0][2];
//	mat[4*6+3] = -r3[1][0];
//	mat[4*6+4] = -r3[1][1];
//	mat[4*6+5] = -r3[1][2];
//	mat[5*6+3] = -r3[2][0];
//	mat[5*6+4] = -r3[2][1];
//	mat[5*6+5] = -r3[2][2];
//
//	return true;
//#endif
//}
//
///*
//=============
//idMat6::ToString
//=============
//*/
//const char *idMat6::ToString( int precision ) const {
//	return idStr.FloatArrayToString( ToFloatPtr(), GetDimension(), precision );
//}
//
//
////===============================================================
////
////  idMatX
////
////===============================================================
//