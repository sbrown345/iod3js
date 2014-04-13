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
////#include "../precompiled.h"
////#pragma hdrstop
////
////#include <float.h>
////
////
////
////
/////*
////===============================================================================
////
////Euler angles
////
////===============================================================================
////*/
////
////// angle indexes
////#define	PITCH				0		// up / down
////#define	YAW					1		// left / right
////#define	ROLL				2		// fall over
////
////class idVec3;
////class idQuat;
////class idRotation;
////class idMat3;
////class idMat4;
////
class idAngles {
////public:
////	float			pitch;
////	float			yaw;
////	float			roll;

	values = new Float32Array(3);

	get pitch ( ): number { return this.values[0]; }

	set pitch ( value: number ) {
		if ( value === undefined ) {
			throw 'Undefined value';
		}
		this.values[0] = value;
	}

	get yaw ( ): number { return this.values[1]; }

	set yaw ( value: number ) {
		if ( value === undefined ) {
			throw 'Undefined value';
		}
		this.values[1] = value;
	}

	get roll ( ): number { return this.values[2]; }

	set roll ( value: number ) {
		if ( value === undefined ) {
			throw 'Undefined value';
		}
		this.values[2] = value;
	}

////	idAngles();
////	idAngles(float pitch, float yaw, float roll);
////	explicit idAngles(const idVec3 &v);
////
////	void 			Set(float pitch, float yaw, float roll);
////	idAngles &		Zero();
////
////	float			operator[](int index) const;
////	float &			operator[](int index);
////	idAngles		operator-() const;			// negate angles, in general not the inverse rotation
////	idAngles &		operator=(const idAngles &a);
////	idAngles		operator+(const idAngles &a) const;
////	idAngles &		operator+=(const idAngles &a);
////	idAngles		operator-(const idAngles &a) const;
////	idAngles &		operator-=(const idAngles &a);
////	idAngles		operator*(const float a) const;
////	idAngles &		operator*=(const float a);
////	idAngles		operator/(const float a) const;
////	idAngles &		operator/=(const float a);
////
////	friend idAngles	operator*(const float a, const idAngles &b);
////
////	bool			Compare(const idAngles &a) const;							// exact compare, no epsilon
////	bool			Compare(const idAngles &a, const float epsilon) const;	// compare with epsilon
////	bool			operator==(const idAngles &a) const;						// exact compare, no epsilon
////	bool			operator!=(const idAngles &a) const;						// exact compare, no epsilon
////
////	idAngles &		Normalize360();	// normalizes 'this'
////	idAngles &		Normalize180();	// normalizes 'this'
////
////	void			Clamp(const idAngles &min, const idAngles &max);
////
////	int				GetDimension() const;
////
////	void			ToVectors(idVec3 *forward, idVec3 *right = NULL, idVec3 *up = NULL) const;
////	idVec3			ToForward() const;
////	idQuat			ToQuat() const;
////	idRotation		ToRotation() const;
////	idMat3			ToMat3() const;
////	idMat4			ToMat4() const;
////	idVec3			ToAngularVelocity() const;
////	const float *	ToFloatPtr() const;
////	float *			ToFloatPtr();
////	const char *	ToString(int precision = 2) const;
////};
////
////extern idAngles ang_zero;

	constructor ( );
	constructor ( /*float*/ pitch: number, /*float */yaw: number, /*float */roll: number );
	constructor ( v: idVec3 );
	constructor ( a1?: any, a2?: any, a3?: any ) {
		if ( arguments.length == 1 ) {
			this.constructor_vec( a1 );
		} else if ( arguments.length == 3 ) {
			this.constructor_3args( a1, a2, a3 );
		}
	}

////ID_INLINE idAngles::idAngles() {
////}

	private constructor_3args ( /*float*/ pitch: number, /*float */yaw: number, /*float */roll: number ): void {
		this.pitch = pitch;
		this.yaw = yaw;
		this.roll = roll;
	}

	private constructor_vec ( v: idVec3 ): void {
		this.pitch = v[0];
		this.yaw = v[1];
		this.roll = v[2];
	}

////ID_INLINE void idAngles::Set(float pitch, float yaw, float roll) {
////	this.pitch = pitch;
////	this.yaw = yaw;
////	this.roll = roll;
////}

	Zero ( ): idAngles {
		this.pitch = this.yaw = this.roll = 0.0;
		return this;
	}

////ID_INLINE float idAngles::operator[](int index) const {
////	assert((index >= 0) && (index < 3));
////	return (this.pitch)[index];
////}
////
////ID_INLINE float &idAngles::operator[](int index) {
////	assert((index >= 0) && (index < 3));
////	return (this.pitch)[index];
////}
////
////ID_INLINE idAngles idAngles::operator-() const {
////	return idAngles(-pitch, -this.yaw, -this.roll);
////}

	opEquals ( a: idAngles ): idAngles {
		this.pitch = a.pitch;
		this.yaw = a.yaw;
		this.roll = a.roll;
		return this;
	}

////ID_INLINE idAngles idAngles::operator+(const idAngles &a) const {
////	return idAngles(this.pitch + a.pitch, this.yaw + a.yaw, this.roll + a.roll);
////}
////
////ID_INLINE idAngles& idAngles::operator+=(const idAngles &a) {
////	this.pitch += a.pitch;
////	this.yaw += a.yaw;
////	this.roll += a.roll;
////
////	return this;
////}
////
////ID_INLINE idAngles idAngles::operator-(const idAngles &a) const {
////	return idAngles(this.pitch - a.pitch, this.yaw - a.yaw, this.roll - a.roll);
////}
////
////ID_INLINE idAngles& idAngles::operator-=(const idAngles &a) {
////	this.pitch -= a.pitch;
////	this.yaw -= a.yaw;
////	this.roll -= a.roll;
////
////	return this;
////}
////
////ID_INLINE idAngles idAngles::operator*(const float a) const {
////	return idAngles(this.pitch * a, this.yaw * a, this.roll * a);
////}
////
////ID_INLINE idAngles& idAngles::operator*=(float a) {
////	this.pitch *= a;
////	this.yaw *= a;
////	this.roll *= a;
////	return this;
////}
////
////ID_INLINE idAngles idAngles::operator/(const float a) const {
////	float inva = 1.0 / a;
////	return idAngles(this.pitch * inva, this.yaw * inva, this.roll * inva);
////}
////
////ID_INLINE idAngles& idAngles::operator/=(float a) {
////	float inva = 1.0 / a;
////	this.pitch *= inva;
////	this.yaw *= inva;
////	this.roll *= inva;
////	return this;
////}
////
////ID_INLINE idAngles operator*(const float a, const idAngles &b) {
////	return idAngles(a * b.pitch, a * b.yaw, a * b.roll);
////}
////
////ID_INLINE bool idAngles::Compare(const idAngles &a) const {
////	return ((a.pitch == this.pitch) && (a.yaw == this.yaw) && (a.roll == this.roll));
////}
////
////ID_INLINE bool idAngles::Compare(const idAngles &a, const float epsilon) const {
////	if (idMath::Fabs(this.pitch - a.pitch) > epsilon) {
////		return false;
////	}
////
////	if (idMath::Fabs(this.yaw - a.yaw) > epsilon) {
////		return false;
////	}
////
////	if (idMath::Fabs(this.roll - a.roll) > epsilon) {
////		return false;
////	}
////
////	return true;
////}
////
////ID_INLINE bool idAngles::operator==(const idAngles &a) const {
////	return Compare(a);
////}
////
////ID_INLINE bool idAngles::operator!=(const idAngles &a) const {
////	return !Compare(a);
////}
////
////ID_INLINE void idAngles::Clamp(const idAngles &min, const idAngles &max) {
////	if (this.pitch < min.pitch) {
////		this.pitch = min.pitch;
////	}
////	else if (this.pitch > max.pitch) {
////		this.pitch = max.pitch;
////	}
////	if (this.yaw < min.yaw) {
////		this.yaw = min.yaw;
////	}
////	else if (this.yaw > max.yaw) {
////		this.yaw = max.yaw;
////	}
////	if (this.roll < min.roll) {
////		this.roll = min.roll;
////	}
////	else if (this.roll > max.roll) {
////		this.roll = max.roll;
////	}
////}

	GetDimension ( ): number {
		return 3;
	}

	ToFloatPtr ( ): Float32Array {
		return this.values;
	}

////ID_INLINE float *idAngles::ToFloatPtr() {
////	return &pitch;
////}
////
////#endif /* !__MATH_ANGLES_H__ */
////
////
////
////
////
////
////
////
////
////
////idAngles ang_zero( 0.0, 0.0, 0.0 );
////
////
////
////
////
////
////
/////*
////=================
////idAngles::Normalize360
////
////returns angles normalized to the range [0 <= angle < 360]
////=================
////*/
////idAngles& idAngles::Normalize360( ) {
////	var/*int*/i:number;
////
////	for ( i = 0; i < 3; i++ ) {
////		if ( ( (*this)[i] >= 360.0 ) || ( (*this)[i] < 0.0 ) ) {
////			(*this)[i] -= floor( (*this)[i] / 360.0 ) * 360.0;
////
////			if ( (*this)[i] >= 360.0 ) {
////				(*this)[i] -= 360.0;
////			}
////			if ( (*this)[i] < 0.0 ) {
////				(*this)[i] += 360.0;
////			}
////		}
////	}
////
////	return this;
////}
////
/////*
////=================
////idAngles::Normalize180
////
////returns angles normalized to the range [-180 < angle <= 180]
////=================
////*/
////idAngles& idAngles::Normalize180( ) {
////	Normalize360();
////
////	if ( this.pitch > 180.0 ) {
////		this.pitch -= 360.0;
////	}
////	
////	if ( this.yaw > 180.0 ) {
////		this.yaw -= 360.0;
////	}
////
////	if ( this.roll > 180.0 ) {
////		this.roll -= 360.0;
////	}
////	return this;
////}
////
/////*
////=================
////idAngles::ToVectors
////=================
////*/
////void idAngles::ToVectors( idVec3 *forward, idVec3 *right, idVec3 *up ) const {
////	float sr, sp, sy, cr, cp, cy;
////	
////	idMath::SinCos( DEG2RAD( this.yaw ), sy, cy );
////	idMath::SinCos( DEG2RAD( this.pitch ), sp, cp );
////	idMath::SinCos( DEG2RAD( this.roll ), sr, cr );
////
////	if ( forward ) {
////		forward.Set( cp * cy, cp * sy, -sp );
////	}
////
////	if ( right ) {
////		right.Set( -sr * sp * cy + cr * sy, -sr * sp * sy + -cr * cy, -sr * cp );
////	}
////
////	if ( up ) {
////		up.Set( cr * sp * cy + -sr * -sy, cr * sp * sy + -sr * cy, cr * cp );
////	}
////}
////
/////*
////=================
////idAngles::ToForward
////=================
////*/
////idVec3 idAngles::ToForward( ) const {
////	float sp, sy, cp, cy;
////	
////	idMath::SinCos( DEG2RAD( this.yaw ), sy, cy );
////	idMath::SinCos( DEG2RAD( this.pitch ), sp, cp );
////
////	return idVec3( cp * cy, cp * sy, -sp );
////}
////
/////*
////=================
////idAngles::ToQuat
////=================
////*/
////idQuat idAngles::ToQuat( ) const {
////	float sx, cx, sy, cy, sz, cz;
////	float sxcy, cxcy, sxsy, cxsy;
////
////	idMath::SinCos( DEG2RAD( this.yaw ) * 0.5, sz, cz );
////	idMath::SinCos( DEG2RAD( this.pitch ) * 0.5, sy, cy );
////	idMath::SinCos( DEG2RAD( this.roll ) * 0.5, sx, cx );
////
////	sxcy = sx * cy;
////	cxcy = cx * cy;
////	sxsy = sx * sy;
////	cxsy = cx * sy;
////
////	return idQuat( cxsy*sz - sxcy*cz, -cxsy*cz - sxcy*sz, sxsy*cz - cxcy*sz, cxcy*cz + sxsy*sz );
////}
////
/////*
////=================
////idAngles::ToRotation
////=================
////*/
////idRotation idAngles::ToRotation( ) const {
////	idVec3 vec;
////	/*float*/angle:number, w;
////	float sx, cx, sy, cy, sz, cz;
////	float sxcy, cxcy, sxsy, cxsy;
////
////	if ( this.pitch == 0.0 ) {
////		if ( this.yaw == 0.0 ) {
////			return idRotation( vec3_origin, idVec3( -1.0, 0.0, 0.0 ), this.roll );
////		}
////		if ( this.roll == 0.0 ) {
////			return idRotation( vec3_origin, idVec3( 0.0, 0.0, -1.0 ), this.yaw );
////		}
////	} else if ( this.yaw == 0.0 && this.roll == 0.0 ) {
////		return idRotation( vec3_origin, idVec3( 0.0, -1.0, 0.0 ), this.pitch );
////	}
////
////	idMath::SinCos( DEG2RAD( this.yaw ) * 0.5, sz, cz );
////	idMath::SinCos( DEG2RAD( this.pitch ) * 0.5, sy, cy );
////	idMath::SinCos( DEG2RAD( this.roll ) * 0.5, sx, cx );
////
////	sxcy = sx * cy;
////	cxcy = cx * cy;
////	sxsy = sx * sy;
////	cxsy = cx * sy;
////
////	vec.x =  cxsy * sz - sxcy * cz;
////	vec.y = -cxsy * cz - sxcy * sz;
////	vec.z =  sxsy * cz - cxcy * sz;
////	w =		 cxcy * cz + sxsy * sz;
////	angle = idMath::ACos( w );
////	if ( angle == 0.0 ) {
////		vec.Set( 0.0, 0.0, 1.0 );
////	} else {
////		//vec *= (1.0 / sin( angle ));
////		vec.Normalize();
////		vec.FixDegenerateNormal();
////		angle *= 2.0 * idMath::M_RAD2DEG;
////	}
////	return idRotation( vec3_origin, vec, angle );
////}
////
/*
=================
idAngles::ToMat3
=================
*/
	ToMat3 ( ): idMat3 {
		var mat = new idMat3;
		var /*float */sr = new R<number> ( ), sp = new R<number> ( ), sy = new R<number> ( ), cr = new R<number> ( ), cp = new R<number> ( ), cy = new R<number> ( );

		idMath.SinCos( DEG2RAD( this.yaw ), sy, cy );
		idMath.SinCos( DEG2RAD( this.pitch ), sp, cp );
		idMath.SinCos( DEG2RAD( this.roll ), sr, cr );

		mat[0].Set( cp.$ * cy.$, cp.$ * sy.$, -sp.$ );
		mat[1].Set( sr.$ * sp.$ * cy.$ + cr.$ * -sy.$, sr.$ * sp.$ * sy.$ + cr.$ * cy.$, sr.$ * cp.$ );
		mat[2].Set( cr.$ * sp.$ * cy.$ + -sr.$ * -sy.$, cr.$ * sp.$ * sy.$ + -sr.$ * cy.$, cr.$ * cp.$ );

		return mat;
	}

/////*
////=================
////idAngles::ToMat4
////=================
////*/
////idMat4 idAngles::ToMat4( ) const {
////	return ToMat3().ToMat4();
////}
////
/////*
////=================
////idAngles::ToAngularVelocity
////=================
////*/
////idVec3 idAngles::ToAngularVelocity( ) const {
////	idRotation rotation = idAngles::ToRotation();
////	return rotation.GetVec() * DEG2RAD( rotation.GetAngle() );
////}
////
	/*
	=============
	idAngles::ToString
	=============
	*/
	ToString(/*int */precision = 2): string{
		return idStr.FloatArrayToString( this.ToFloatPtr(), this.GetDimension(), precision );
	}
}

var ang_zero = new idAngles( 0.0, 0.0, 0.0 );
