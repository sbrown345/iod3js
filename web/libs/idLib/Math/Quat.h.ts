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

	values = new Float32Array(4);

	get x(): number { return this.values[0]; }

	set x(value: number) {
		if (value === undefined) {
			throw 'Undefined value';
		}
		this.values[0] = value;
	}

	get y(): number { return this.values[1]; }

	set y(value: number) {
		if (value === undefined) {
			throw 'Undefined value';
		}
		this.values[1] = value;
	}

	get z(): number { return this.values[2]; }

	set z(value: number) {
		if (value === undefined) {
			throw 'Undefined value';
		}
		this.values[2] = value;
	}


	get w(): number { return this.values[3]; }

	set w(value: number) {
		if (value === undefined) {
			throw 'Undefined value';
		}
		this.values[3] = value;
	}

////	idQuat( );
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
////	idQuat			Inverse( ) const;
////	float			Length( ) const;
////	idQuat &		Normalize( );
////
////	float			CalcW( ) const;
////	int				GetDimension( ) const;
////
////	idAngles		ToAngles( ) const;
////	idRotation		ToRotation( ) const;
////	idMat3			ToMat3( ) const;
////	idMat4			ToMat4( ) const;
////	idCQuat			ToCQuat( ) const;
////	idVec3			ToAngularVelocity( ) const;
////	const float *	ToFloatPtr( ) const;
////	float *			ToFloatPtr( );
////	const char *	ToString(int precision = 2) const;
////
////	idQuat &		Slerp(const idQuat &from, const idQuat &to, float t);
////
////
////	ID_INLINE idQuat::idQuat( ) {
////	}
////
	constructor ( )
	constructor ( /*float */x: number, /*float */y: number, /*float */z: number, /*float */w: number )
	constructor ( /*float */x?: number, /*float */y?: number, /*float */z?: number, /*float */w?: number ) {
		if ( arguments.length == 4 ) {
			this.x = x;
			this.y = y;
			this.z = z;
			this.w = w;
		}
	}
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
	opUnaryMinus ( ): idQuat {
		return new idQuat( -this.x, -this.y, -this.z, -this.w );
	}

	//ID_INLINE idQuat &idQuat::operator=(const idQuat &a) {
	opEquals ( a: idQuat ): idQuat {
		this.x = a.x;
		this.y = a.y;
		this.z = a.z;
		this.w = a.w;

		return this;
	}

////	ID_INLINE idQuat idQuat::operator+(const idQuat &a) const {
////		return idQuat(x + a.x, y + a.y, z + a.z, this.w + a.w);
////	}
////
////	ID_INLINE idQuat& idQuat::operator+=(const idQuat &a) {
////		this.x += a.x;
////		this.y += a.y;
////		this.z += a.z;
////		w += a.w;
////
////		return this;
////	}
////
////	ID_INLINE idQuat idQuat::operator-(const idQuat &a) const {
////		return idQuat(x - a.x, y - a.y, z - a.z, this.w - a.w);
////	}
////
////	ID_INLINE idQuat& idQuat::operator-=(const idQuat &a) {
////		this.x -= a.x;
////		this.y -= a.y;
////		this.z -= a.z;
////		w -= a.w;
////
////		return this;
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
////		// result = this.Inverse() * idQuat( a.x, a.y, a.z, 0.0 ) * (*this)
////		float xxzz = x*x - z*z;
////		float wwyy = this.w*w - y*y;
////
////		float xw2 = x*w*2.0;
////		float xy2 = x*y*2.0;
////		float xz2 = x*z*2.0;
////		float yw2 = y*w*2.0;
////		float yz2 = y*z*2.0;
////		float zw2 = z*w*2.0;
////
////		return idVec3(
////			(xxzz + wwyy)*a.x + (xy2 + zw2)*a.y + (xz2 - yw2)*a.z,
////			(xy2 - zw2)*a.x + (y*y + this.w*w - x*x - z*z)*a.y + (yz2 + xw2)*a.z,
////			(xz2 + yw2)*a.x + (yz2 - xw2)*a.y + (wwyy - xxzz)*a.z
////			);
////#endif
////	}
////
////	ID_INLINE idQuat idQuat::operator*(float a) const {
////		return idQuat(x * a, y * a, z * a, this.w * a);
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
////		return this;
////	}
////
////	ID_INLINE idQuat& idQuat::operator*=(float a) {
////		this.x *= a;
////		this.y *= a;
////		this.z *= a;
////		w *= a;
////
////		return this;
////	}
////
////	ID_INLINE bool idQuat::Compare(const idQuat &a) const {
////		return ((x == a.x) && (y == a.y) && (z == a.z) && (w == a.w));
////	}
////
////	ID_INLINE bool idQuat::Compare(const idQuat &a, const float epsilon) const {
////		if (idMath.Fabs(x - a.x) > epsilon) {
////			return false;
////		}
////		if (idMath.Fabs(y - a.y) > epsilon) {
////			return false;
////		}
////		if (idMath.Fabs(z - a.z) > epsilon) {
////			return false;
////		}
////		if (idMath.Fabs(w - a.w) > epsilon) {
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
////		this.x = x;
////		this.y = y;
////		this.z = z;
////		this.w = w;
////	}
////
////	ID_INLINE idQuat idQuat::Inverse( ) const {
////		return idQuat(-x, -y, -z, this.w);
////	}
////
////	ID_INLINE float idQuat::Length( ) const {
////		float len;
////
////		len = x * x + y * y + z * z + this.w * this.w;
////		return idMath.Sqrt(len);
////	}
////
////	ID_INLINE idQuat& idQuat::Normalize( ) {
////		float len;
////		float ilength;
////
////		len = this.Length();
////		if (len) {
////			ilength = 1 / len;
////			this.x *= ilength;
////			this.y *= ilength;
////			this.z *= ilength;
////			w *= ilength;
////		}
////		return this;
////	}
////
	CalcW ( ): number {
		// take the absolute value because floating point rounding may cause the dot of x,y,z to be larger than 1
		return sqrt( fabs( 1.0 - ( this.x * this.x + this.y * this.y + this.z * this.z ) ) );
	}

	GetDimension( ) :number {
		return 4;
	}
////
////	ID_INLINE const float *idQuat::ToFloatPtr( ) const {
////		return &this.x;
////	}
////
////	ID_INLINE float *idQuat::ToFloatPtr( ) {
////		return &this.x;
//////	}
	ToFloatPtr ( ): Float32Array {
		return this.values;
	}
////
////	/*
////	=====================
////	idQuat::ToAngles
////	=====================
////	*/
////	idAngles idQuat::ToAngles( ) const {
////		return ToMat3().ToAngles();
////	}
////
////	/*
////	=====================
////	idQuat::ToRotation
////	=====================
////	*/
////	idRotation idQuat::ToRotation( ) const {
////		idVec3 vec;
////		float angle;
////
////		vec.x = this.x;
////		vec.y = y;
////		vec.z = z;
////		angle = idMath.ACos(w);
////		if (angle == 0.0) {
////			vec.Set(0.0, 0.0, 1.0);
////		}
////		else {
////			//vec *= (1.0 / sin( angle ));
////			vec.Normalize();
////			vec.FixDegenerateNormal();
////			angle *= 2.0 * idMath.M_RAD2DEG;
////		}
////		return idRotation(vec3_origin, vec, angle);
////	}

	/*
	=====================
	idQuat::ToMat3
	=====================
	*/
	ToMat3( ) :idMat3 {
		var mat = new idMat3;
		var/*float*/	wx: number, wy: number, wz: number;
		var/*float*/	xx: number, yy: number, yz: number;
		var/*float*/	xy: number, xz: number, zz: number;
		var/*float*/	x2: number, y2: number, z2: number;

		x2 = this.x + this.x;
		y2 = this.y + this.y;
		z2 = this.z + this.z;

		xx = this.x * x2;
		xy = this.x * y2;
		xz = this.x * z2;

		yy = this.y * y2;
		yz = this.y * z2;
		zz = this.z * z2;
			 		  
		wx = this.w * x2;
		wy = this.w * y2;
		wz = this.w * z2;

		mat[0][0] = 1.0 - (yy + zz);
		mat[0][1] = xy - wz;
		mat[0][2] = xz + wy;

		mat[1][0] = xy + wz;
		mat[1][1] = 1.0 - (xx + zz);
		mat[1][2] = yz - wx;

		mat[2][0] = xz - wy;
		mat[2][1] = yz + wx;
		mat[2][2] = 1.0 - (xx + yy);

		return mat;
	}

////	/*
////	=====================
////	idQuat::ToMat4
////	=====================
////	*/
////	idMat4 idQuat::ToMat4( ) const {
////		return ToMat3().ToMat4();
////	}
////
////	/*
////	=====================
////	idQuat::ToCQuat
////	=====================
////	*/
////	idCQuat idQuat::ToCQuat( ) const {
////		if (w < 0.0) {
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
////	idVec3 idQuat::ToAngularVelocity( ) const {
////		idVec3 vec;
////
////		vec.x = this.x;
////		vec.y = y;
////		vec.z = z;
////		vec.Normalize();
////		return vec * idMath.ACos(w);
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

	/*
	=====================
	idQuat::Slerp

	Spherical linear interpolation between two quaternions.
	=====================
	*/
	Slerp(from: idQuat, to: idQuat , /*float */t:number) :idQuat{
		var temp = new idQuat	;
		var/*float	*/omega: number, cosom: number, sinom: number, scale0: number, scale1: number;

		if (t <= 0.0) {
			this.opEquals(from);
			return this;
		}

		if (t >= 1.0) {
			this.opEquals( to );
			return this;
		}

		if (from == to) {
			this.opEquals(to);
			return this;
		}

		cosom = from.x * to.x + from.y * to.y + from.z * to.z + from.w * to.w;
		if (cosom < 0.0) {
			temp.opEquals( to.opUnaryMinus ( ) );
			cosom = -cosom;
		}
		else {
			temp = to;
		}

		if ((1.0 - cosom) > 1e-6) {
//#if 0
//			omega = acos(cosom);
//			sinom = 1.0 / sin(omega);
//			scale0 = sin((1.0 - t) * omega) * sinom;
//			scale1 = sin(t * omega) * sinom;
//#else
			scale0 = 1.0 - cosom * cosom;
			sinom = idMath.InvSqrt(scale0);
			omega = idMath.ATan16(scale0 * sinom, cosom);
			scale0 = idMath.Sin16((1.0 - t) * omega) * sinom;
			scale1 = idMath.Sin16(t * omega) * sinom;
//#endif
		}
		else {
			scale0 = 1.0 - t;
			scale1 = t;
		}

		this.opEquals( ( scale0 * from ) + ( scale1 * temp ) );
		return this;
	}
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
	values: Float32Array;

	get x(): number { return this.values[0]; }

	set x(value: number) {
		if (value === undefined) {
			throw 'Undefined value';
		}
		this.values[0] = value;
	}

	get y(): number { return this.values[1]; }

	set y(value: number) {
		if (value === undefined) {
			throw 'Undefined value';
		}
		this.values[1] = value;
	}

	get z(): number { return this.values[2]; }

	set z(value: number) {
		if (value === undefined) {
			throw 'Undefined value';
		}
		this.values[2] = value;
	}
////	idCQuat( );
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
////	int				GetDimension( ) const;
////
////	idAngles		ToAngles( ) const;
////	idRotation		ToRotation( ) const;
////	idMat3			ToMat3( ) const;
////	idMat4			ToMat4( ) const;
////	idQuat			ToQuat( ) const;
////	const float *	ToFloatPtr( ) const;
////	float *			ToFloatPtr( );
////	const char *	ToString(int precision = 2) const;
////
////
////	ID_INLINE idCQuat::idCQuat( ) {
////	}

	constructor ( ) {
		this.values = new Float32Array( 3 );
	}
////
////	ID_INLINE idCQuat::idCQuat(float x, float y, float z) {
////		this.x = x;
////		this.y = y;
////		this.z = z;
////	}
////
////	ID_INLINE void idCQuat::Set(float x, float y, float z) {
////		this.x = x;
////		this.y = y;
////		this.z = z;
////	}
////
	[index: number]: number;
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
////		if (idMath.Fabs(x - a.x) > epsilon) {
////			return false;
////		}
////		if (idMath.Fabs(y - a.y) > epsilon) {
////			return false;
////		}
////		if (idMath.Fabs(z - a.z) > epsilon) {
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

	GetDimension( ) :number {
		return 3;
	}

	ToQuat(): idQuat {
		// take the absolute value because floating point rounding may cause the dot of x,y,z to be larger than 1
		return new idQuat( this.x, this.y, this.z, sqrt( fabs( 1.0 - ( this.x * this.x + this.y * this.y + this.z * this.z ) ) ) );
	}
////
////	ID_INLINE const float *idCQuat::ToFloatPtr( ) const {
////		return &x;
////	}
////
////	ID_INLINE float *idCQuat::ToFloatPtr( ) {
////		return &x;
////	}

	ToFloatPtr ( ): Float32Array {
		return this.values;
	}
////
////#endif /* !__MATH_QUAT_H__ */
////
////
////	/*
////	=============
////	idCQuat::ToAngles
////	=============
////	*/
////	idAngles idCQuat::ToAngles( ) const {
////		return ToQuat().ToAngles();
////	}
////
////	/*
////	=============
////	idCQuat::ToRotation
////	=============
////	*/
////	idRotation idCQuat::ToRotation( ) const {
////		return ToQuat().ToRotation();
////	}
////
////	/*
////	=============
////	idCQuat::ToMat3
////	=============
////	*/
////	idMat3 idCQuat::ToMat3( ) const {
////		return ToQuat().ToMat3();
////	}
////
////	/*
////	=============
////	idCQuat::ToMat4
////	=============
////	*/
////	idMat4 idCQuat::ToMat4( ) const {
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


Object.defineProperty(idCQuat.prototype, "0", {
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

Object.defineProperty(idCQuat.prototype, "1", {
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

Object.defineProperty(idCQuat.prototype, "2", {
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
