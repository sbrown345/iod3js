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

////#include "../precompiled.h"
////#pragma hdrstop


////
////
////#ifndef __BV_SPHERE_H__
////#define __BV_SPHERE_H__

/*
===============================================================================

Sphere

===============================================================================
*/

class idSphere {
////public:
////	idSphere( );
////	explicit idSphere(const idVec3 &point);
////	explicit idSphere(const idVec3 &point, const float r);
////
////	float			operator[](const int index) const;
////	float &			operator[](const int index);
////	idSphere		operator+(const idVec3 &t) const;				// returns tranlated sphere
////	idSphere &		operator+=(const idVec3 &t);					// translate the sphere
////	idSphere		operator+(const idSphere &s) const;
////	idSphere &		operator+=(const idSphere &s);
////
////	bool			Compare(const idSphere &a) const;							// exact compare, no epsilon
////	bool			Compare(const idSphere &a, const float epsilon) const;	// compare with epsilon
////	bool			operator==(const idSphere &a) const;						// exact compare, no epsilon
////	bool			operator!=(const idSphere &a) const;						// exact compare, no epsilon
////
////	void			Clear( );									// inside out sphere
////	void			Zero( );									// single point at origin
////	void			SetOrigin(const idVec3 &o);					// set origin of sphere
////	void			SetRadius(const float r);						// set square radius
////
////	const idVec3 &	GetOrigin( ) const;						// returns origin of sphere
////	float			GetRadius( ) const;						// returns sphere radius
////	bool			IsCleared( ) const;						// returns true if sphere is inside out
////
////	bool			AddPoint(const idVec3 &p);					// add the point, returns true if the sphere expanded
////	bool			AddSphere(const idSphere &s);					// add the sphere, returns true if the sphere expanded
////	idSphere		Expand(const float d) const;					// return bounds expanded in all directions with the given value
////	idSphere &		ExpandSelf(const float d);					// expand bounds in all directions with the given value
////	idSphere		Translate(const idVec3 &translation) const;
////	idSphere &		TranslateSelf(const idVec3 &translation);
////
////	float			PlaneDistance(const idPlane &plane) const;
////	int				PlaneSide(const idPlane &plane, const float epsilon = ON_EPSILON) const;
////
////	bool			ContainsPoint(const idVec3 &p) const;			// includes touching
////	bool			IntersectsSphere(const idSphere &s) const;	// includes touching
////	bool			LineIntersection(const idVec3 &start, const idVec3 &end) const;
////	// intersection points are (start + dir * scale1) and (start + dir * scale2)
////	bool			RayIntersection(const idVec3 &start, const idVec3 &dir, float &scale1, float &scale2) const;
////
////	// Tight sphere for a point set.
////	void			FromPoints(const idVec3 *points, const int numPoints);
////	// Most tight sphere for a translation.
////	void			FromPointTranslation(const idVec3 &point, const idVec3 &translation);
////	void			FromSphereTranslation(const idSphere &sphere, const idVec3 &start, const idVec3 &translation);
////	// Most tight sphere for a rotation.
////	void			FromPointRotation(const idVec3 &point, const idRotation &rotation);
////	void			FromSphereRotation(const idSphere &sphere, const idVec3 &start, const idRotation &rotation);
////
////	void			AxisProjection(const idVec3 &dir, float &min, float &max) const;
////
////private:
	origin = new idVec3;
	radius: number /*float*/;
////
////extern idSphere	sphere_zero;
////

	constructor ( )
	constructor ( point: idVec3 )
	constructor ( point: idVec3, r: number /*float*/ )
	constructor ( point?: idVec3, r?: number /*float*/ ) {
		if ( arguments.length == 1 ) {
			this.origin.opEquals( point );
			this.radius = 0.0;
		} else if ( arguments.length == 2 ) {
			this.origin.opEquals( point );
			this.radius = r;
		}
	}
////ID_INLINE float idSphere::operator[](const int index) const {
////	return ((float *)&origin)[index];
////}
////
////ID_INLINE float &idSphere::operator[](const int index) {
////	return ((float *)&origin)[index];
////}
////
////ID_INLINE idSphere idSphere::operator+(const idVec3 &t) const {
////	return idSphere(this.origin + t, this.radius);
////}
////
////ID_INLINE idSphere &idSphere::operator+=(const idVec3 &t) {
////	this.origin += t;
////	return *this;
////}
////
////ID_INLINE bool idSphere::Compare(const idSphere &a) const {
////	return (this.origin.Compare(a.origin) && this.radius == a.radius);
////}
////
////ID_INLINE bool idSphere::Compare(const idSphere &a, const float epsilon) const {
////	return (this.origin.Compare(a.origin, epsilon) && idMath::Fabs(this.radius - a.radius) <= epsilon);
////}
////
////ID_INLINE bool idSphere::operator==(const idSphere &a) const {
////	return Compare(a);
////}
////
////ID_INLINE bool idSphere::operator!=(const idSphere &a) const {
////	return !Compare(a);
////}
////
////ID_INLINE void idSphere::Clear( ) {
////	this.origin.Zero();
////	this.radius = -1.0f;
////}
////
////ID_INLINE void idSphere::Zero( ) {
////	this.origin.Zero();
////	this.radius = 0.0;
////}
////
////ID_INLINE void idSphere::SetOrigin(const idVec3 &o) {
////	this.origin = o;
////}
////
////ID_INLINE void idSphere::SetRadius(const float r) {
////	this.radius = r;
////}
////
	GetOrigin ( ): idVec3 {
		return this.origin;
	}

	GetRadius ( ): number {
		return this.radius;
	}

////ID_INLINE bool idSphere::IsCleared( ) const {
////	return (this.radius < 0.0);
////}
////
////ID_INLINE bool idSphere::AddPoint(const idVec3 &p) {
////	if (this.radius < 0.0) {
////		this.origin = p;
////		this.radius = 0.0;
////		return true;
////	}
////	else {
////		float r = (p - this.origin).LengthSqr();
////		if (r > this.radius * this.radius) {
////			r = idMath::Sqrt(r);
////			this.origin += (p - this.origin) * 0.5f * (1.0f - this.radius / r);
////			this.radius += 0.5f * (r - this.radius);
////			return true;
////		}
////		return false;
////	}
////}
////
////ID_INLINE bool idSphere::AddSphere(const idSphere &s) {
////	if (this.radius < 0.0) {
////		this.origin = s.origin;
////		this.radius = s.radius;
////		return true;
////	}
////	else {
////		float r = (s.origin - this.origin).LengthSqr();
////		if (r >(this.radius + s.radius) * (this.radius + s.radius)) {
////			r = idMath::Sqrt(r);
////			this.origin += (s.origin - this.origin) * 0.5f * (1.0f - this.radius / (r + s.radius));
////			this.radius += 0.5f * ((r + s.radius) - this.radius);
////			return true;
////		}
////		return false;
////	}
////}
////
////ID_INLINE idSphere idSphere::Expand(const float d) const {
////	return idSphere(this.origin, this.radius + d);
////}
////
////ID_INLINE idSphere &idSphere::ExpandSelf(const float d) {
////	this.radius += d;
////	return *this;
////}
////
////ID_INLINE idSphere idSphere::Translate(const idVec3 &translation) const {
////	return idSphere(this.origin + translation, this.radius);
////}
////
////ID_INLINE idSphere &idSphere::TranslateSelf(const idVec3 &translation) {
////	this.origin += translation;
////	return *this;
////}
////
////ID_INLINE bool idSphere::ContainsPoint(const idVec3 &p) const {
////	if ((p - this.origin).LengthSqr() > this.radius * this.radius) {
////		return false;
////	}
////	return true;
////}
////
////ID_INLINE bool idSphere::IntersectsSphere(const idSphere &s) const {
////	float r = s.radius + this.radius;
////	if ((s.origin - this.origin).LengthSqr() > r * r) {
////		return false;
////	}
////	return true;
////}
////
////ID_INLINE void idSphere::FromPointTranslation(const idVec3 &point, const idVec3 &translation) {
////	this.origin = point + 0.5f * translation;
////	this.radius = idMath::Sqrt(0.5f * translation.LengthSqr());
////}
////
////ID_INLINE void idSphere::FromSphereTranslation(const idSphere &sphere, const idVec3 &start, const idVec3 &translation) {
////	this.origin = start + sphere.origin + 0.5f * translation;
////	this.radius = idMath::Sqrt(0.5f * translation.LengthSqr()) + sphere.radius;
////}
////
////ID_INLINE void idSphere::FromPointRotation(const idVec3 &point, const idRotation &rotation) {
////	idVec3 end = rotation * point;
////	this.origin = (point + end) * 0.5f;
////	this.radius = idMath::Sqrt(0.5f * (end - point).LengthSqr());
////}
////
////ID_INLINE void idSphere::FromSphereRotation(const idSphere &sphere, const idVec3 &start, const idRotation &rotation) {
////	idVec3 end = rotation * sphere.origin;
////	this.origin = start + (sphere.origin + end) * 0.5f;
////	this.radius = idMath::Sqrt(0.5f * (end - sphere.origin).LengthSqr()) + sphere.radius;
////}
////
////ID_INLINE void idSphere::AxisProjection(const idVec3 &dir, float &min, float &max) const {
////	float d;
////	d = dir * this.origin;
////	min = d - this.radius;
////	max = d + this.radius;
////}
////
////#endif /* !__BV_SPHERE_H__ */
////
////
////
/////*
////================
////idSphere::PlaneDistance
////================
////*/
////float idSphere::PlaneDistance( const idPlane &plane ) const {
////	float d;
////
////	d = plane.Distance( this.origin );
////	if ( d > this.radius ) {
////		return d - this.radius;
////	}
////	if ( d < -radius ) {
////		return d + this.radius;
////	}
////	return 0.0;
////}
////
/////*
////================
////idSphere::PlaneSide
////================
////*/
////int idSphere::PlaneSide( const idPlane &plane, const float epsilon ) const {
////	float d;
////
////	d = plane.Distance( this.origin );
////	if ( d > this.radius + epsilon ) {
////		return PLANESIDE_FRONT;
////	}
////	if ( d < -radius - epsilon ) {
////		return PLANESIDE_BACK;
////	}
////	return PLANESIDE_CROSS;
////}
////
/////*
////============
////idSphere::LineIntersection
////
////  Returns true if the line intersects the sphere between the start and end point.
////============
////*/
////bool idSphere::LineIntersection( const idVec3 &start, const idVec3 &end ) const {
////	idVec3 r, s, e;
////	float a;
////
////	s = start - this.origin;
////	e = end - this.origin;
////	r = e - s;
////	a = -s * r;
////	if ( a <= 0 ) {
////		return ( s * s < this.radius * this.radius );
////	}
////	else if ( a >= r * r ) {
////		return ( e * e < this.radius * this.radius );
////	}
////	else {
////		r = s + ( a / ( r * r ) ) * r;
////		return ( r * r < this.radius * this.radius );
////	}
////}
////
/////*
////============
////idSphere::RayIntersection
////
////  Returns true if the ray intersects the sphere.
////  The ray can intersect the sphere in both directions from the start point.
////  If start is inside the sphere then scale1 < 0 and scale2 > 0.
////============
////*/
////bool idSphere::RayIntersection( const idVec3 &start, const idVec3 &dir, float &scale1, float &scale2 ) const {
////	double a, b, c, d, sqrtd;
////	idVec3 p;
////
////	p = start - this.origin;
////	a = dir * dir;
////	b = dir * p;
////	c = p * p - this.radius * this.radius;
////	d = b * b - c * a;
////
////	if ( d < 0.0 ) {
////		return false;
////	}
////
////	sqrtd = idMath::Sqrt( d );
////	a = 1.0f / a;
////
////	scale1 = ( -b + sqrtd ) * a;
////	scale2 = ( -b - sqrtd ) * a;
////
////	return true;
////}
////
/////*
////============
////idSphere::FromPoints
////
////  Tight sphere for a point set.
////============
////*/
////void idSphere::FromPoints( const idVec3 *points, const int numPoints ) {
////	var/*int*/i:number;
////	float radiusSqr, dist;
////	idVec3 mins, maxs;
////
////	SIMDProcessor->MinMax( mins, maxs, points, numPoints );
////
////	this.origin = ( mins + maxs ) * 0.5f;
////
////	radiusSqr = 0.0;
////	for ( i = 0; i < numPoints; i++ ) {
////		dist = ( points[i] - this.origin ).LengthSqr();
////		if ( dist > radiusSqr ) {
////			radiusSqr = dist;
////		}
////	}
////	this.radius = idMath::Sqrt( radiusSqr );
////}
////
////
////
}

var sphere_zero = new idSphere( vec3_zero, 0.0 );
