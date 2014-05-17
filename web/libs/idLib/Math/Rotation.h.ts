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
////#ifndef __MATH_ROTATION_H__
////#define __MATH_ROTATION_H__
////
/////*
////===============================================================================
////
////	Describes a complete rotation in degrees about an abritray axis.
////	A local rotation matrix is stored for fast rotation of multiple points.
////
////===============================================================================
////*/
////
////
////class idAngles;
////class idQuat;
////class idMat3;

class idRotation {
////
////	friend class idAngles;
////	friend class idQuat;
////	friend class idMat3;
////
////public:
////						idRotation( );
////						idRotation( const idVec3 &rotationOrigin, const idVec3 &rotationVec, const float rotationAngle );
////
////	void				Set( const idVec3 &rotationOrigin, const idVec3 &rotationVec, const float rotationAngle );
////	void				SetOrigin( const idVec3 &rotationOrigin );
////	void				SetVec( const idVec3 &rotationVec );					// has to be normalized
////	void				SetVec( const float x, const float y, const float z );	// has to be normalized
////	void				SetAngle( const float rotationAngle );
////	void				Scale( const float s );
////	void				ReCalculateMatrix( );
////	const idVec3 &		GetOrigin( ) const;
////	const idVec3 &		GetVec( ) const;
////	float				GetAngle( ) const;
////
////	idRotation			operator-() const;										// flips rotation
////	idRotation			operator*( const float s ) const;						// scale rotation
////	idRotation			operator/( const float s ) const;						// scale rotation
////	idRotation &		operator*=( const float s );							// scale rotation
////	idRotation &		operator/=( const float s );							// scale rotation
////	idVec3				operator*( const idVec3 &v ) const;						// rotate vector
////
////	friend idRotation	operator*( const float s, const idRotation &r );		// scale rotation
////	friend idVec3		operator*( const idVec3 &v, const idRotation &r );		// rotate vector
////	friend idVec3 &		operator*=( idVec3 &v, const idRotation &r );			// rotate vector
////
////	idAngles			ToAngles( ) const;
////	idQuat				ToQuat( ) const;
////	const idMat3 &		ToMat3( ) const;
////	idMat4				ToMat4( ) const;
////	idVec3				ToAngularVelocity( ) const;
////
////	void				RotatePoint( idVec3 &point ) const;
////
////	void				Normalize180( );
////	void				Normalize360( );
////
////private:
	origin = new idVec3;			// origin of rotation
	vec = new idVec3;			// normalized vector to rotate around
	angle :number/*float*/;			// angle of rotation in degrees
	axis = new idMat3 /*mutable*/;			// rotation axis
	axisValid:boolean /*mutable*/;		// true if rotation axis is valid
////};
////
////
////ID_INLINE idRotation::idRotation( ) {
////}
////
////ID_INLINE idRotation::idRotation( const idVec3 &rotationOrigin, const idVec3 &rotationVec, const float rotationAngle ) {
////	this.origin = rotationOrigin;
////	vec = rotationVec;
////	angle = rotationAngle;
////	axisValid = false;
////}
////
	Set ( rotationOrigin: idVec3, rotationVec: idVec3, /*const float */rotationAngle: number ): void {
		this.origin.opEquals( rotationOrigin );
		this.vec.opEquals( rotationVec );
		this.angle = rotationAngle;
		this.axisValid = false;
	}

    SetOrigin ( rotationOrigin: idVec3 ): void {
        this.origin.opEquals( rotationOrigin );
    }
////
////ID_INLINE void idRotation::SetVec( const idVec3 &rotationVec ) {
////	this.vec = rotationVec;
////	this.axisValid = false;
////}
////
////ID_INLINE void idRotation::SetVec( float x, float y, float z ) {
////	this.vec[0] = x;
////	this.vec[1] = y;
////	this.vec[2] = z;
////	this.axisValid = false;
////}
////
////ID_INLINE void idRotation::SetAngle( const float rotationAngle ) {
////	this.angle = rotationAngle;
////	this.axisValid = false;
////}
////
////ID_INLINE void idRotation::Scale( const float s ) {
////	this.angle *= s;
////	this.axisValid = false;
////}
////
////ID_INLINE void idRotation::ReCalculateMatrix( ) {
////	this.axisValid = false;
////	ToMat3();
////}
////
////ID_INLINE const idVec3 &idRotation::GetOrigin( ) const {
////	return this.origin;
////}
////
////ID_INLINE const idVec3 &idRotation::GetVec( ) const  {
////	return this.vec;
////}
////
////ID_INLINE float idRotation::GetAngle( ) const  {
////	return this.angle;
////}
////

	opEquals ( other: idRotation ): idRotation {
		this.origin.opEquals( other.origin );
		this.vec.opEquals( other.vec );
		this.angle = other.angle;
		this.axisValid = other.axisValid;
		return this;
	}

////ID_INLINE idRotation idRotation::operator-() const {
////	return idRotation( this.origin, this.vec, -this.angle );
////}
////
////ID_INLINE idRotation idRotation::operator*( const float s ) const {
////	return idRotation( this.origin, this.vec, this.angle * s );
////}
////
////ID_INLINE idRotation idRotation::operator/( const float s ) const {
////	assert( s != 0.0 );
////	return idRotation( this.origin, this.vec, this.angle / s );
////}
////
////ID_INLINE idRotation &idRotation::operator*=( const float s ) {
////	this.angle *= s;
////	this.axisValid = false;
////	return *this;
////}
////
////ID_INLINE idRotation &idRotation::operator/=( const float s ) {
////	assert( s != 0.0 );
////	this.angle /= s;
////	this.axisValid = false;
////	return *this;
////}
////
////ID_INLINE idVec3 idRotation::operator*( const idVec3 &v ) const {
////	if ( !this.axisValid ) {
////		ToMat3();
////	}
////	return ((v - this.origin) * this.axis + this.origin);
////}
////
////ID_INLINE idRotation operator*( const float s, const idRotation &r ) {
////	return r * s;
////}
////
////ID_INLINE idVec3 operator*( const idVec3 &v, const idRotation &r ) {
////	return r * v;
////}
////
////ID_INLINE idVec3 &operator*=( idVec3 &v, const idRotation &r ) {
////	v = r * v;
////	return v;
////}
////
////ID_INLINE void idRotation::RotatePoint( idVec3 &point ) const {
////	if ( !this.axisValid ) {
////		ToMat3();
////	}
////	point = ((point - this.origin) * this.axis + this.origin);
////}
////
////#endif /* !__MATH_ROTATION_H__ */
////
////
////
////// Rotation.cpp
////
////
/////*
////============
////idRotation::ToAngles
////============
////*/
////idAngles idRotation::ToAngles( ) const {
////	return ToMat3().ToAngles();
////}
////
/////*
////============
////idRotation::ToQuat
////============
////*/
////idQuat idRotation::ToQuat( ) const {
////	float a, s, c;
////
////	a = this.angle * (idMath.M_DEG2RAD * 0.5);
////	idMath.SinCos(a, s, c);
////	return idQuat(this.vec.x * s, this.vec.y * s, this.vec.z * s, c);
////}

/*
============
idRotation::toMat3
============
*/
	ToMat3 ( ): idMat3 {
		var /*float */wx: number, wy: number, wz: number;
		var /*float */ xx: number, yy: number, yz: number;
		var /*float */ xy: number, xz: number, zz: number;
		var /*float */ x2: number, y2: number, z2: number;
		var /*float */ a: number, c = new R<number> ( ), s = new R<number> ( ), x: number, y: number, z: number;

		if ( this.axisValid ) {
			return this.axis;
		}

		a = this.angle * ( idMath.M_DEG2RAD * 0.5 );
		idMath.SinCos( a, s, c );

		x = this.vec[0] * s.$;
		y = this.vec[1] * s.$;
		z = this.vec[2] * s.$;

		x2 = x + x;
		y2 = y + y;
		z2 = z + z;

		xx = x * x2;
		xy = x * y2;
		xz = x * z2;

		yy = y * y2;
		yz = y * z2;
		zz = z * z2;

		wx = c.$ * x2;
		wy = c.$ * y2;
		wz = c.$ * z2;

		this.axis[0][0] = 1.0 - ( yy + zz );
		this.axis[0][1] = xy - wz;
		this.axis[0][2] = xz + wy;

		this.axis[1][0] = xy + wz;
		this.axis[1][1] = 1.0 - ( xx + zz );
		this.axis[1][2] = yz - wx;

		this.axis[2][0] = xz - wy;
		this.axis[2][1] = yz + wx;
		this.axis[2][2] = 1.0 - ( xx + yy );

		this.axisValid = true;

		return this.axis;
	}
////
/////*
////============
////idRotation::ToMat4
////============
////*/
////idMat4 idRotation::ToMat4( ) const {
////	return ToMat3().ToMat4();
////}
////
/////*
////============
////idRotation::ToAngularVelocity
////============
////*/
////idVec3 idRotation::ToAngularVelocity( ) const {
////	return this.vec * DEG2RAD(this.angle);
////}
////
/////*
////============
////idRotation::Normalize180
////============
////*/
////void idRotation::Normalize180( ) {
////	this.angle -= floor(this.angle / 360.0) * 360.0;
////	if (this.angle > 180.0) {
////		this.angle -= 360.0;
////	}
////	else if (this.angle < -180.0) {
////		this.angle += 360.0;
////	}
////}
////
/////*
////============
////idRotation::Normalize360
////============
////*/
////void idRotation::Normalize360( ) {
////	this.angle -= floor(this.angle / 360.0) * 360.0;
////	if (this.angle > 360.0) {
////		this.angle -= 360.0;
////	}
////	else if (this.angle < 0.0) {
////		this.angle += 360.0;
////	}
////}
}