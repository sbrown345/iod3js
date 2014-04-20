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
////#ifndef __MATH_QUAT_H__
////#define __MATH_QUAT_H__
////
/////*
////===============================================================================
////
////	Quaternion
////
////===============================================================================
////*/
////
////
////class idVec3;
////class idAngles;
////class idRotation;
////class idMat3;
////class idMat4;
////class idCQuat;
////
class idQuat {
////public:
////	float			x;
////	float			y;
////	float			z;
////	float			w;
////
////	idQuat(void);
////	idQuat(float x, float y, float z, float w);
////
////	void 			Set(float x, float y, float z, float w);
////
////	float			operator[](int index) const;
////	float &			operator[](int index);
////	idQuat			operator-() const;
////	idQuat &		operator=(const idQuat &a);
////	idQuat			operator+(const idQuat &a) const;
////	idQuat &		operator+=(const idQuat &a);
////	idQuat			operator-(const idQuat &a) const;
////	idQuat &		operator-=(const idQuat &a);
////	idQuat			operator*(const idQuat &a) const;
////	idVec3			operator*(const idVec3 &a) const;
////	idQuat			operator*(float a) const;
////	idQuat &		operator*=(const idQuat &a);
////	idQuat &		operator*=(float a);
////
////	friend idQuat	operator*(const float a, const idQuat &b);
////	friend idVec3	operator*(const idVec3 &a, const idQuat &b);
////
////	bool			Compare(const idQuat &a) const;						// exact compare, no epsilon
////	bool			Compare(const idQuat &a, const float epsilon) const;	// compare with epsilon
////	bool			operator==(const idQuat &a) const;					// exact compare, no epsilon
////	bool			operator!=(const idQuat &a) const;					// exact compare, no epsilon
////
////	idQuat			Inverse(void) const;
////	float			Length(void) const;
////	idQuat &		Normalize(void);
////
////	float			CalcW(void) const;
////	int				GetDimension(void) const;
////
////	idAngles		ToAngles(void) const;
////	idRotation		ToRotation(void) const;
////	idMat3			ToMat3(void) const;
////	idMat4			ToMat4(void) const;
////	idCQuat			ToCQuat(void) const;
////	idVec3			ToAngularVelocity(void) const;
////	const float *	ToFloatPtr(void) const;
////	float *			ToFloatPtr(void);
////	const char *	ToString(int precision = 2) const;
////
////	idQuat &		Slerp(const idQuat &from, const idQuat &to, float t);
////
////
////	ID_INLINE idQuat::idQuat(void) {
////	}
////
////	ID_INLINE idQuat::idQuat(float x, float y, float z, float w) {
////		this->x = x;
////		this->y = y;
////		this->z = z;
////		this->w = w;
////	}
////
////	ID_INLINE float idQuat::operator[](int index) const {
////		assert((index >= 0) && (index < 4));
////		return (&x)[index];
////	}
////
////	ID_INLINE float& idQuat::operator[](int index) {
////		assert((index >= 0) && (index < 4));
////		return (&x)[index];
////	}
////
////	ID_INLINE idQuat idQuat::operator-() const {
////		return idQuat(-x, -y, -z, -w);
////	}
////
////	ID_INLINE idQuat &idQuat::operator=(const idQuat &a) {
////		x = a.x;
////		y = a.y;
////		z = a.z;
////		w = a.w;
////
////		return *this;
////	}
////
////	ID_INLINE idQuat idQuat::operator+(const idQuat &a) const {
////		return idQuat(x + a.x, y + a.y, z + a.z, w + a.w);
////	}
////
////	ID_INLINE idQuat& idQuat::operator+=(const idQuat &a) {
////		x += a.x;
////		y += a.y;
////		z += a.z;
////		w += a.w;
////
////		return *this;
////	}
////
////	ID_INLINE idQuat idQuat::operator-(const idQuat &a) const {
////		return idQuat(x - a.x, y - a.y, z - a.z, w - a.w);
////	}
////
////	ID_INLINE idQuat& idQuat::operator-=(const idQuat &a) {
////		x -= a.x;
////		y -= a.y;
////		z -= a.z;
////		w -= a.w;
////
////		return *this;
////	}
////
////	ID_INLINE idQuat idQuat::operator*(const idQuat &a) const {
////		return idQuat(w*a.x + x*a.w + y*a.z - z*a.y,
////			w*a.y + y*a.w + z*a.x - x*a.z,
////			w*a.z + z*a.w + x*a.y - y*a.x,
////			w*a.w - x*a.x - y*a.y - z*a.z);
////	}
////
////	ID_INLINE idVec3 idQuat::operator*(const idVec3 &a) const {
////#if 0
////		// it's faster to do the conversion to a 3x3 matrix and multiply the vector by this 3x3 matrix
////		return (ToMat3() * a);
////#else
////		// result = this->Inverse() * idQuat( a.x, a.y, a.z, 0.0f ) * (*this)
////		float xxzz = x*x - z*z;
////		float wwyy = w*w - y*y;
////
////		float xw2 = x*w*2.0f;
////		float xy2 = x*y*2.0f;
////		float xz2 = x*z*2.0f;
////		float yw2 = y*w*2.0f;
////		float yz2 = y*z*2.0f;
////		float zw2 = z*w*2.0f;
////
////		return idVec3(
////			(xxzz + wwyy)*a.x + (xy2 + zw2)*a.y + (xz2 - yw2)*a.z,
////			(xy2 - zw2)*a.x + (y*y + w*w - x*x - z*z)*a.y + (yz2 + xw2)*a.z,
////			(xz2 + yw2)*a.x + (yz2 - xw2)*a.y + (wwyy - xxzz)*a.z
////			);
////#endif
////	}
////
////	ID_INLINE idQuat idQuat::operator*(float a) const {
////		return idQuat(x * a, y * a, z * a, w * a);
////	}
////
////	ID_INLINE idQuat operator*(const float a, const idQuat &b) {
////		return b * a;
////	}
////
////	ID_INLINE idVec3 operator*(const idVec3 &a, const idQuat &b) {
////		return b * a;
////	}
////
////	ID_INLINE idQuat& idQuat::operator*=(const idQuat &a) {
////		*this = *this * a;
////
////		return *this;
////	}
////
////	ID_INLINE idQuat& idQuat::operator*=(float a) {
////		x *= a;
////		y *= a;
////		z *= a;
////		w *= a;
////
////		return *this;
////	}
////
////	ID_INLINE bool idQuat::Compare(const idQuat &a) const {
////		return ((x == a.x) && (y == a.y) && (z == a.z) && (w == a.w));
////	}
////
////	ID_INLINE bool idQuat::Compare(const idQuat &a, const float epsilon) const {
////		if (idMath::Fabs(x - a.x) > epsilon) {
////			return false;
////		}
////		if (idMath::Fabs(y - a.y) > epsilon) {
////			return false;
////		}
////		if (idMath::Fabs(z - a.z) > epsilon) {
////			return false;
////		}
////		if (idMath::Fabs(w - a.w) > epsilon) {
////			return false;
////		}
////		return true;
////	}
////
////	ID_INLINE bool idQuat::operator==(const idQuat &a) const {
////		return Compare(a);
////	}
////
////	ID_INLINE bool idQuat::operator!=(const idQuat &a) const {
////		return !Compare(a);
////	}
////
////	ID_INLINE void idQuat::Set(float x, float y, float z, float w) {
////		this->x = x;
////		this->y = y;
////		this->z = z;
////		this->w = w;
////	}
////
////	ID_INLINE idQuat idQuat::Inverse(void) const {
////		return idQuat(-x, -y, -z, w);
////	}
////
////	ID_INLINE float idQuat::Length(void) const {
////		float len;
////
////		len = x * x + y * y + z * z + w * w;
////		return idMath::Sqrt(len);
////	}
////
////	ID_INLINE idQuat& idQuat::Normalize(void) {
////		float len;
////		float ilength;
////
////		len = this->Length();
////		if (len) {
////			ilength = 1 / len;
////			x *= ilength;
////			y *= ilength;
////			z *= ilength;
////			w *= ilength;
////		}
////		return *this;
////	}
////
////	ID_INLINE float idQuat::CalcW(void) const {
////		// take the absolute value because floating point rounding may cause the dot of x,y,z to be larger than 1
////		return sqrt(fabs(1.0f - (x * x + y * y + z * z)));
////	}
////
////	ID_INLINE int idQuat::GetDimension(void) const {
////		return 4;
////	}
////
////	ID_INLINE const float *idQuat::ToFloatPtr(void) const {
////		return &x;
////	}
////
////	ID_INLINE float *idQuat::ToFloatPtr(void) {
////		return &x;
////	}
////
////	/*
////	=====================
////	idQuat::ToAngles
////	=====================
////	*/
////	idAngles idQuat::ToAngles(void) const {
////		return ToMat3().ToAngles();
////	}
////
////	/*
////	=====================
////	idQuat::ToRotation
////	=====================
////	*/
////	idRotation idQuat::ToRotation(void) const {
////		idVec3 vec;
////		float angle;
////
////		vec.x = x;
////		vec.y = y;
////		vec.z = z;
////		angle = idMath::ACos(w);
////		if (angle == 0.0f) {
////			vec.Set(0.0f, 0.0f, 1.0f);
////		}
////		else {
////			//vec *= (1.0f / sin( angle ));
////			vec.Normalize();
////			vec.FixDegenerateNormal();
////			angle *= 2.0f * idMath::M_RAD2DEG;
////		}
////		return idRotation(vec3_origin, vec, angle);
////	}
////
////	/*
////	=====================
////	idQuat::ToMat3
////	=====================
////	*/
////	idMat3 idQuat::ToMat3(void) const {
////		idMat3	mat;
////		float	wx, wy, wz;
////		float	xx, yy, yz;
////		float	xy, xz, zz;
////		float	x2, y2, z2;
////
////		x2 = x + x;
////		y2 = y + y;
////		z2 = z + z;
////
////		xx = x * x2;
////		xy = x * y2;
////		xz = x * z2;
////
////		yy = y * y2;
////		yz = y * z2;
////		zz = z * z2;
////
////		wx = w * x2;
////		wy = w * y2;
////		wz = w * z2;
////
////		mat[0][0] = 1.0f - (yy + zz);
////		mat[0][1] = xy - wz;
////		mat[0][2] = xz + wy;
////
////		mat[1][0] = xy + wz;
////		mat[1][1] = 1.0f - (xx + zz);
////		mat[1][2] = yz - wx;
////
////		mat[2][0] = xz - wy;
////		mat[2][1] = yz + wx;
////		mat[2][2] = 1.0f - (xx + yy);
////
////		return mat;
////	}
////
////	/*
////	=====================
////	idQuat::ToMat4
////	=====================
////	*/
////	idMat4 idQuat::ToMat4(void) const {
////		return ToMat3().ToMat4();
////	}
////
////	/*
////	=====================
////	idQuat::ToCQuat
////	=====================
////	*/
////	idCQuat idQuat::ToCQuat(void) const {
////		if (w < 0.0f) {
////			return idCQuat(-x, -y, -z);
////		}
////		return idCQuat(x, y, z);
////	}
////
////	/*
////	============
////	idQuat::ToAngularVelocity
////	============
////	*/
////	idVec3 idQuat::ToAngularVelocity(void) const {
////		idVec3 vec;
////
////		vec.x = x;
////		vec.y = y;
////		vec.z = z;
////		vec.Normalize();
////		return vec * idMath::ACos(w);
////	}
////
////	/*
////	=============
////	idQuat::ToString
////	=============
////	*/
////	const char *idQuat::ToString(int precision) const {
////		return idStr::FloatArrayToString(ToFloatPtr(), GetDimension(), precision);
////	}
////
////	/*
////	=====================
////	idQuat::Slerp
////
////	Spherical linear interpolation between two quaternions.
////	=====================
////	*/
////	idQuat &idQuat::Slerp(const idQuat &from, const idQuat &to, float t) {
////		idQuat	temp;
////		float	omega, cosom, sinom, scale0, scale1;
////
////		if (t <= 0.0f) {
////			*this = from;
////			return *this;
////		}
////
////		if (t >= 1.0f) {
////			*this = to;
////			return *this;
////		}
////
////		if (from == to) {
////			*this = to;
////			return *this;
////		}
////
////		cosom = from.x * to.x + from.y * to.y + from.z * to.z + from.w * to.w;
////		if (cosom < 0.0f) {
////			temp = -to;
////			cosom = -cosom;
////		}
////		else {
////			temp = to;
////		}
////
////		if ((1.0f - cosom) > 1e-6f) {
////#if 0
////			omega = acos(cosom);
////			sinom = 1.0f / sin(omega);
////			scale0 = sin((1.0f - t) * omega) * sinom;
////			scale1 = sin(t * omega) * sinom;
////#else
////			scale0 = 1.0f - cosom * cosom;
////			sinom = idMath::InvSqrt(scale0);
////			omega = idMath::ATan16(scale0 * sinom, cosom);
////			scale0 = idMath::Sin16((1.0f - t) * omega) * sinom;
////			scale1 = idMath::Sin16(t * omega) * sinom;
////#endif
////		}
////		else {
////			scale0 = 1.0f - t;
////			scale1 = t;
////		}
////
////		*this = (scale0 * from) + (scale1 * temp);
////		return *this;
////	}
}

/*
===============================================================================

	Compressed quaternion

===============================================================================
*/

class idCQuat {
////public:
////	float			x;
////	float			y;
////	float			z;
////
////	idCQuat(void);
////	idCQuat(float x, float y, float z);
////
////	void 			Set(float x, float y, float z);
////
////	float			operator[](int index) const;
////	float &			operator[](int index);
////
////	bool			Compare(const idCQuat &a) const;						// exact compare, no epsilon
////	bool			Compare(const idCQuat &a, const float epsilon) const;	// compare with epsilon
////	bool			operator==(const idCQuat &a) const;					// exact compare, no epsilon
////	bool			operator!=(const idCQuat &a) const;					// exact compare, no epsilon
////
////	int				GetDimension(void) const;
////
////	idAngles		ToAngles(void) const;
////	idRotation		ToRotation(void) const;
////	idMat3			ToMat3(void) const;
////	idMat4			ToMat4(void) const;
////	idQuat			ToQuat(void) const;
////	const float *	ToFloatPtr(void) const;
////	float *			ToFloatPtr(void);
////	const char *	ToString(int precision = 2) const;
////
////
////	ID_INLINE idCQuat::idCQuat(void) {
////	}
////
////	ID_INLINE idCQuat::idCQuat(float x, float y, float z) {
////		this->x = x;
////		this->y = y;
////		this->z = z;
////	}
////
////	ID_INLINE void idCQuat::Set(float x, float y, float z) {
////		this->x = x;
////		this->y = y;
////		this->z = z;
////	}
////
////	ID_INLINE float idCQuat::operator[](int index) const {
////		assert((index >= 0) && (index < 3));
////		return (&x)[index];
////	}
////
////	ID_INLINE float& idCQuat::operator[](int index) {
////		assert((index >= 0) && (index < 3));
////		return (&x)[index];
////	}
////
////	ID_INLINE bool idCQuat::Compare(const idCQuat &a) const {
////		return ((x == a.x) && (y == a.y) && (z == a.z));
////	}
////
////	ID_INLINE bool idCQuat::Compare(const idCQuat &a, const float epsilon) const {
////		if (idMath::Fabs(x - a.x) > epsilon) {
////			return false;
////		}
////		if (idMath::Fabs(y - a.y) > epsilon) {
////			return false;
////		}
////		if (idMath::Fabs(z - a.z) > epsilon) {
////			return false;
////		}
////		return true;
////	}
////
////	ID_INLINE bool idCQuat::operator==(const idCQuat &a) const {
////		return Compare(a);
////	}
////
////	ID_INLINE bool idCQuat::operator!=(const idCQuat &a) const {
////		return !Compare(a);
////	}
////
////	ID_INLINE int idCQuat::GetDimension(void) const {
////		return 3;
////	}
////
////	ID_INLINE idQuat idCQuat::ToQuat(void) const {
////		// take the absolute value because floating point rounding may cause the dot of x,y,z to be larger than 1
////		return idQuat(x, y, z, sqrt(fabs(1.0f - (x * x + y * y + z * z))));
////	}
////
////	ID_INLINE const float *idCQuat::ToFloatPtr(void) const {
////		return &x;
////	}
////
////	ID_INLINE float *idCQuat::ToFloatPtr(void) {
////		return &x;
////	}
////
////#endif /* !__MATH_QUAT_H__ */
////
////
////	/*
////	=============
////	idCQuat::ToAngles
////	=============
////	*/
////	idAngles idCQuat::ToAngles(void) const {
////		return ToQuat().ToAngles();
////	}
////
////	/*
////	=============
////	idCQuat::ToRotation
////	=============
////	*/
////	idRotation idCQuat::ToRotation(void) const {
////		return ToQuat().ToRotation();
////	}
////
////	/*
////	=============
////	idCQuat::ToMat3
////	=============
////	*/
////	idMat3 idCQuat::ToMat3(void) const {
////		return ToQuat().ToMat3();
////	}
////
////	/*
////	=============
////	idCQuat::ToMat4
////	=============
////	*/
////	idMat4 idCQuat::ToMat4(void) const {
////		return ToQuat().ToMat4();
////	}
////
////	/*
////	=============
////	idCQuat::ToString
////	=============
////	*/
////	const char *idCQuat::ToString(int precision) const {
////		return idStr::FloatArrayToString(ToFloatPtr(), GetDimension(), precision);
////	}
}
