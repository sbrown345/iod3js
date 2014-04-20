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
//#ifndef __JOINTTRANSFORM_H__
//#define __JOINTTRANSFORM_H__
//
///*
//===============================================================================
//
//  Joint Quaternion
//
//===============================================================================
//*/
//
class idJointQuat {
//public:
	
	q = new idQuat;
	t = new idVec3;
};
//
//
///*
//===============================================================================
//
//  Joint Matrix
//
//  idMat3 m;
//  idVec3 t;
//
//  m[0][0], m[1][0], m[2][0], t[0]
//  m[0][1], m[1][1], m[2][1], t[1]
//  m[0][2], m[1][2], m[2][2], t[2]
//
//===============================================================================
//*/
//
class idJointMat {
	//public:
	//
	//	void			SetRotation( const idMat3 &m );
	//	void			SetTranslation( const idVec3 &t );
	//
	//	idVec3			operator*( const idVec3 &v ) const;							// only rotate
	//	idVec3			operator*( const idVec4 &v ) const;							// rotate and translate
	//
	//	idJointMat &	operator*=( const idJointMat &a );							// transform
	//	idJointMat &	operator/=( const idJointMat &a );							// untransform
	//
	//	bool			Compare( const idJointMat &a ) const;						// exact compare, no epsilon
	//	bool			Compare( const idJointMat &a, const float epsilon ) const;	// compare with epsilon
	//	bool			operator==(	const idJointMat &a ) const;					// exact compare, no epsilon
	//	bool			operator!=(	const idJointMat &a ) const;					// exact compare, no epsilon
	//
	//	idMat3			ToMat3( ) const;
	//	idVec3			ToVec3( ) const;
	//	idJointQuat		ToJointQuat( ) const;
	//	const float *	ToFloatPtr( ) const;
	//	float *			ToFloatPtr( );
	//
	//private:
	mat = new Float32Array(3*4);
	//};
	//
	//ID_INLINE void idJointMat::SetRotation( const idMat3 &m ) {
	//	// NOTE: idMat3 is transposed because it is column-major
	//	this.mat[0 * 4 + 0] = m[0][0];
	//	this.mat[0 * 4 + 1] = m[1][0];
	//	this.mat[0 * 4 + 2] = m[2][0];
	//	this.mat[1 * 4 + 0] = m[0][1];
	//	this.mat[1 * 4 + 1] = m[1][1];
	//	this.mat[1 * 4 + 2] = m[2][1];
	//	this.mat[2 * 4 + 0] = m[0][2];
	//	this.mat[2 * 4 + 1] = m[1][2];
	//	this.mat[2 * 4 + 2] = m[2][2];
	//}

	SetTranslation ( t: idVec3 ): void {
		this.mat[0 * 4 + 3] = t[0];
		this.mat[1 * 4 + 3] = t[1];
		this.mat[2 * 4 + 3] = t[2];
	}
	//
	//ID_INLINE idVec3 idJointMat::operator*( const idVec3 &v ) const {
	//	return idVec3(	this.mat[0 * 4 + 0] * v[0] + this.mat[0 * 4 + 1] * v[1] + this.mat[0 * 4 + 2] * v[2],
	//					this.mat[1 * 4 + 0] * v[0] + this.mat[1 * 4 + 1] * v[1] + this.mat[1 * 4 + 2] * v[2],
	//					this.mat[2 * 4 + 0] * v[0] + this.mat[2 * 4 + 1] * v[1] + this.mat[2 * 4 + 2] * v[2] );
	//}
	//
	//ID_INLINE idVec3 idJointMat::operator*( const idVec4 &v ) const {
	//	return idVec3(	this.mat[0 * 4 + 0] * v[0] + this.mat[0 * 4 + 1] * v[1] + this.mat[0 * 4 + 2] * v[2] + this.mat[0 * 4 + 3] * v[3],
	//					this.mat[1 * 4 + 0] * v[0] + this.mat[1 * 4 + 1] * v[1] + this.mat[1 * 4 + 2] * v[2] + this.mat[1 * 4 + 3] * v[3],
	//					this.mat[2 * 4 + 0] * v[0] + this.mat[2 * 4 + 1] * v[1] + this.mat[2 * 4 + 2] * v[2] + this.mat[2 * 4 + 3] * v[3] );
	//}
	//
	//ID_INLINE idJointMat &idJointMat::operator*=( const idJointMat &a ) {
	opMultiplicationAssignment ( a: idJointMat ): idJointMat {
		var dst = new Float32Array( 3 );
		var mat = this.mat;
		dst[0] = mat[0 * 4 + 0] * a.mat[0 * 4 + 0] + mat[1 * 4 + 0] * a.mat[0 * 4 + 1] + mat[2 * 4 + 0] * a.mat[0 * 4 + 2];
		dst[1] = mat[0 * 4 + 0] * a.mat[1 * 4 + 0] + mat[1 * 4 + 0] * a.mat[1 * 4 + 1] + mat[2 * 4 + 0] * a.mat[1 * 4 + 2];
		dst[2] = mat[0 * 4 + 0] * a.mat[2 * 4 + 0] + mat[1 * 4 + 0] * a.mat[2 * 4 + 1] + mat[2 * 4 + 0] * a.mat[2 * 4 + 2];
		mat[0 * 4 + 0] = dst[0];
		mat[1 * 4 + 0] = dst[1];
		mat[2 * 4 + 0] = dst[2];

		dst[0] = mat[0 * 4 + 1] * a.mat[0 * 4 + 0] + mat[1 * 4 + 1] * a.mat[0 * 4 + 1] + mat[2 * 4 + 1] * a.mat[0 * 4 + 2];
		dst[1] = mat[0 * 4 + 1] * a.mat[1 * 4 + 0] + mat[1 * 4 + 1] * a.mat[1 * 4 + 1] + mat[2 * 4 + 1] * a.mat[1 * 4 + 2];
		dst[2] = mat[0 * 4 + 1] * a.mat[2 * 4 + 0] + mat[1 * 4 + 1] * a.mat[2 * 4 + 1] + mat[2 * 4 + 1] * a.mat[2 * 4 + 2];
		mat[0 * 4 + 1] = dst[0];
		mat[1 * 4 + 1] = dst[1];
		mat[2 * 4 + 1] = dst[2];

		dst[0] = mat[0 * 4 + 2] * a.mat[0 * 4 + 0] + mat[1 * 4 + 2] * a.mat[0 * 4 + 1] + mat[2 * 4 + 2] * a.mat[0 * 4 + 2];
		dst[1] = mat[0 * 4 + 2] * a.mat[1 * 4 + 0] + mat[1 * 4 + 2] * a.mat[1 * 4 + 1] + mat[2 * 4 + 2] * a.mat[1 * 4 + 2];
		dst[2] = mat[0 * 4 + 2] * a.mat[2 * 4 + 0] + mat[1 * 4 + 2] * a.mat[2 * 4 + 1] + mat[2 * 4 + 2] * a.mat[2 * 4 + 2];
		mat[0 * 4 + 2] = dst[0];
		mat[1 * 4 + 2] = dst[1];
		mat[2 * 4 + 2] = dst[2];

		dst[0] = mat[0 * 4 + 3] * a.mat[0 * 4 + 0] + mat[1 * 4 + 3] * a.mat[0 * 4 + 1] + mat[2 * 4 + 3] * a.mat[0 * 4 + 2];
		dst[1] = mat[0 * 4 + 3] * a.mat[1 * 4 + 0] + mat[1 * 4 + 3] * a.mat[1 * 4 + 1] + mat[2 * 4 + 3] * a.mat[1 * 4 + 2];
		dst[2] = mat[0 * 4 + 3] * a.mat[2 * 4 + 0] + mat[1 * 4 + 3] * a.mat[2 * 4 + 1] + mat[2 * 4 + 3] * a.mat[2 * 4 + 2];
		mat[0 * 4 + 3] = dst[0];
		mat[1 * 4 + 3] = dst[1];
		mat[2 * 4 + 3] = dst[2];

		mat[0 * 4 + 3] += a.mat[0 * 4 + 3];
		mat[1 * 4 + 3] += a.mat[1 * 4 + 3];
		mat[2 * 4 + 3] += a.mat[2 * 4 + 3];

		return this;
	}
	
	//ID_INLINE idJointMat &idJointMat::operator/=( const idJointMat &a ) {
	//	float dst[3];
	//var mat = this.mat;
	//	mat[0 * 4 + 3] -= a.mat[0 * 4 + 3];
	//	mat[1 * 4 + 3] -= a.mat[1 * 4 + 3];
	//	mat[2 * 4 + 3] -= a.mat[2 * 4 + 3];
	//
	//	dst[0] = mat[0 * 4 + 0] * a.mat[0 * 4 + 0] + mat[1 * 4 + 0] * a.mat[1 * 4 + 0] + mat[2 * 4 + 0] * a.mat[2 * 4 + 0];
	//	dst[1] = mat[0 * 4 + 0] * a.mat[0 * 4 + 1] + mat[1 * 4 + 0] * a.mat[1 * 4 + 1] + mat[2 * 4 + 0] * a.mat[2 * 4 + 1];
	//	dst[2] = mat[0 * 4 + 0] * a.mat[0 * 4 + 2] + mat[1 * 4 + 0] * a.mat[1 * 4 + 2] + mat[2 * 4 + 0] * a.mat[2 * 4 + 2];
	//	mat[0 * 4 + 0] = dst[0];
	//	mat[1 * 4 + 0] = dst[1];
	//	mat[2 * 4 + 0] = dst[2];
	//
	//	dst[0] = mat[0 * 4 + 1] * a.mat[0 * 4 + 0] + mat[1 * 4 + 1] * a.mat[1 * 4 + 0] + mat[2 * 4 + 1] * a.mat[2 * 4 + 0];
	//	dst[1] = mat[0 * 4 + 1] * a.mat[0 * 4 + 1] + mat[1 * 4 + 1] * a.mat[1 * 4 + 1] + mat[2 * 4 + 1] * a.mat[2 * 4 + 1];
	//	dst[2] = mat[0 * 4 + 1] * a.mat[0 * 4 + 2] + mat[1 * 4 + 1] * a.mat[1 * 4 + 2] + mat[2 * 4 + 1] * a.mat[2 * 4 + 2];
	//	mat[0 * 4 + 1] = dst[0];
	//	mat[1 * 4 + 1] = dst[1];
	//	mat[2 * 4 + 1] = dst[2];
	//
	//	dst[0] = mat[0 * 4 + 2] * a.mat[0 * 4 + 0] + mat[1 * 4 + 2] * a.mat[1 * 4 + 0] + mat[2 * 4 + 2] * a.mat[2 * 4 + 0];
	//	dst[1] = mat[0 * 4 + 2] * a.mat[0 * 4 + 1] + mat[1 * 4 + 2] * a.mat[1 * 4 + 1] + mat[2 * 4 + 2] * a.mat[2 * 4 + 1];
	//	dst[2] = mat[0 * 4 + 2] * a.mat[0 * 4 + 2] + mat[1 * 4 + 2] * a.mat[1 * 4 + 2] + mat[2 * 4 + 2] * a.mat[2 * 4 + 2];
	//	mat[0 * 4 + 2] = dst[0];
	//	mat[1 * 4 + 2] = dst[1];
	//	mat[2 * 4 + 2] = dst[2];
	//
	//	dst[0] = mat[0 * 4 + 3] * a.mat[0 * 4 + 0] + mat[1 * 4 + 3] * a.mat[1 * 4 + 0] + mat[2 * 4 + 3] * a.mat[2 * 4 + 0];
	//	dst[1] = mat[0 * 4 + 3] * a.mat[0 * 4 + 1] + mat[1 * 4 + 3] * a.mat[1 * 4 + 1] + mat[2 * 4 + 3] * a.mat[2 * 4 + 1];
	//	dst[2] = mat[0 * 4 + 3] * a.mat[0 * 4 + 2] + mat[1 * 4 + 3] * a.mat[1 * 4 + 2] + mat[2 * 4 + 3] * a.mat[2 * 4 + 2];
	//	mat[0 * 4 + 3] = dst[0];
	//	mat[1 * 4 + 3] = dst[1];
	//	mat[2 * 4 + 3] = dst[2];
	//
	//	return this;
	//}
	//
	//ID_INLINE bool idJointMat::Compare( const idJointMat &a ) const {
	//	var/*int*/i:number;
	//
	//	for ( i = 0; i < 12; i++ ) {
	//		if ( mat[i] != a.mat[i] ) {
	//			return false;
	//		}
	//	}
	//	return true;
	//}
	//
	//ID_INLINE bool idJointMat::Compare( const idJointMat &a, const float epsilon ) const {
	//	var/*int*/i:number;
	//
	//	for ( i = 0; i < 12; i++ ) {
	//		if ( idMath::Fabs( mat[i] - a.mat[i] ) > epsilon ) {
	//			return false;
	//		}
	//	}
	//	return true;
	//}
	//
	//ID_INLINE bool idJointMat::operator==( const idJointMat &a ) const {
	//	return Compare( a );
	//}
	//
	//ID_INLINE bool idJointMat::operator!=( const idJointMat &a ) const {
	//	return !Compare( a );
	//}
	//
	ToMat3 ( ): idMat3 {
		return new idMat3( this.mat[0 * 4 + 0], this.mat[1 * 4 + 0], this.mat[2 * 4 + 0],
			this.mat[0 * 4 + 1], this.mat[1 * 4 + 1], this.mat[2 * 4 + 1],
			this.mat[0 * 4 + 2], this.mat[1 * 4 + 2], this.mat[2 * 4 + 2] );
	}

	ToVec3 ( ): idVec3 {
		return new idVec3( this.mat[0 * 4 + 3], this.mat[1 * 4 + 3], this.mat[2 * 4 + 3] );
	}
	
	//ID_INLINE const float *idJointMat::ToFloatPtr( ) const {
	//	return this.mat;
	//}
	//
	//ID_INLINE float *idJointMat::ToFloatPtr( ) {
	//	return this.mat;
	//}
	//
	//#endif /* !__JOINTTRANSFORM_H__ */


	///*
	//=============
	//idJointMat::ToJointQuat
	//=============
	//*/
	//idJointQuat idJointMat::ToJointQuat( ) const {
	//	idJointQuat	jq;
	//	float		trace;
	//	float		s;
	//	float		t;
	//	int     	i;
	//	int			j;
	//	int			k;
	//
	//	static int 	next[3] = { 1, 2, 0 };
	//
	//	trace = this.mat[0 * 4 + 0] + this.mat[1 * 4 + 1] + this.mat[2 * 4 + 2];
	//
	//	if ( trace > 0.0f ) {
	//
	//		t = trace + 1.0f;
	//		s = idMath::InvSqrt( t ) * 0.5f;
	//
	//		jq.q[3] = s * t;
	//		jq.q[0] = ( this.mat[1 * 4 + 2] - this.mat[2 * 4 + 1] ) * s;
	//		jq.q[1] = ( this.mat[2 * 4 + 0] - this.mat[0 * 4 + 2] ) * s;
	//		jq.q[2] = ( this.mat[0 * 4 + 1] - this.mat[1 * 4 + 0] ) * s;
	//
	//	} else {
	//
	//		i = 0;
	//		if ( this.mat[1 * 4 + 1] > this.mat[0 * 4 + 0] ) {
	//			i = 1;
	//		}
	//		if ( this.mat[2 * 4 + 2] > this.mat[i * 4 + i] ) {
	//			i = 2;
	//		}
	//		j = next[i];
	//		k = next[j];
	//
	//		t = ( this.mat[i * 4 + i] - ( this.mat[j * 4 + j] + this.mat[k * 4 + k] ) ) + 1.0f;
	//		s = idMath::InvSqrt( t ) * 0.5f;
	//
	//		jq.q[i] = s * t;
	//		jq.q[3] = ( this.mat[j * 4 + k] - this.mat[k * 4 + j] ) * s;
	//		jq.q[j] = ( this.mat[i * 4 + j] + this.mat[j * 4 + i] ) * s;
	//		jq.q[k] = ( this.mat[i * 4 + k] + this.mat[k * 4 + i] ) * s;
	//	}
	//
	//	jq.t[0] = this.mat[0 * 4 + 3];
	//	jq.t[1] = this.mat[1 * 4 + 3];
	//	jq.t[2] = this.mat[2 * 4 + 3];
	//
	//	return jq;
	//}
}