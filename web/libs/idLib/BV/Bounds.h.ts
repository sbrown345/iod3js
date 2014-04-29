///*
//===========================================================================

//Doom 3 GPL Source Code
//Copyright (C) 1999-2011 id Software LLC, a ZeniMax Media company. 

//This file is part of the Doom 3 GPL Source Code (?Doom 3 Source Code?).  

//Doom 3 Source Code is free software: you can redistribute it and/or modify
//it under the terms of the GNU General Public License as published by
//the Free Software Foundation, either version 3 of the License, or
//(at your option) any later version.

//Doom 3 Source Code is distributed in the hope that it will be useful,
//but WITHOUT ANY WARRANTY; without even the implied warranty of
//MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//GNU General Public License for more details.

//You should have received a copy of the GNU General Public License
//along with Doom 3 Source Code.  If not, see <http://www.gnu.org/licenses/>.

//In addition, the Doom 3 Source Code is also subject to certain additional terms. You should have received a copy of these additional terms immediately following the terms and conditions of the GNU General Public License which accompanied the Doom 3 Source Code.  If not, please request a copy in writing from id Software at the address below.

//If you have questions concerning this license or the applicable additional terms, you may contact in writing id Software LLC, c/o ZeniMax Media Inc., Suite 120, Rockville, Maryland 20850 USA.

//===========================================================================
//*/

//#ifndef __BV_BOUNDS_H__
//#define __BV_BOUNDS_H__

/*
===============================================================================

	Axis Aligned Bounding Box

===============================================================================
*/

class idBounds {
//public:
//					idBounds( );
//					explicit idBounds( const idVec3 &mins, const idVec3 &maxs );
//					explicit idBounds( const idVec3 &point );

//	const idVec3 &	operator[]( const int index ) const;
//	idVec3 &		operator[]( const int index );
//	idBounds		operator+( const idVec3 &t ) const;				// returns translated bounds
//	idBounds &		operator+=( const idVec3 &t );					// translate the bounds
//	idBounds		operator*( const idMat3 &r ) const;				// returns rotated bounds
//	idBounds &		operator*=( const idMat3 &r );					// rotate the bounds
//	idBounds		operator+( const idBounds &a ) const;
//	idBounds &		operator+=( const idBounds &a );
//	idBounds		operator-( const idBounds &a ) const;
//	idBounds &		operator-=( const idBounds &a );

//	bool			Compare( const idBounds &a ) const;							// exact compare, no epsilon
//	bool			Compare( const idBounds &a, const float epsilon ) const;	// compare with epsilon
//	bool			operator==(	const idBounds &a ) const;						// exact compare, no epsilon
//	bool			operator!=(	const idBounds &a ) const;						// exact compare, no epsilon

//	void			Clear( );									// inside out bounds
//	void			Zero( );									// single point at origin

//	idVec3			GetCenter( ) const;						// returns center of bounds
//	float			GetRadius( ) const;						// returns the radius relative to the bounds origin
//	float			GetRadius( const idVec3 &center ) const;		// returns the radius relative to the given center
//	float			GetVolume( ) const;						// returns the volume of the bounds
//	bool			IsCleared( ) const;						// returns true if bounds are inside out

//	bool			AddPoint( const idVec3 &v );					// add the point, returns true if the bounds expanded
//	bool			AddBounds( const idBounds &a );					// add the bounds, returns true if the bounds expanded
//	idBounds		Intersect( const idBounds &a ) const;			// return intersection of this bounds with the given bounds
//	idBounds &		IntersectSelf( const idBounds &a );				// intersect this bounds with the given bounds
//	idBounds		Expand( const float d ) const;					// return bounds expanded in all directions with the given value
//	idBounds &		ExpandSelf( const float d );					// expand bounds in all directions with the given value
//	idBounds		Translate( const idVec3 &translation ) const;	// return translated bounds
//	idBounds &		TranslateSelf( const idVec3 &translation );		// translate this bounds
//	idBounds		Rotate( const idMat3 &rotation ) const;			// return rotated bounds
//	idBounds &		RotateSelf( const idMat3 &rotation );			// rotate this bounds

//	float			PlaneDistance( const idPlane &plane ) const;
//	int				PlaneSide( const idPlane &plane, const float epsilon = ON_EPSILON ) const;

//	bool			ContainsPoint( const idVec3 &p ) const;			// includes touching
//	bool			IntersectsBounds( const idBounds &a ) const;	// includes touching
//	bool			LineIntersection( start:idVec3, end:idVec3 ) const;
//					// intersection point is start + dir * scale
//	bool			RayIntersection( start:idVec3, const idVec3 &dir, float &scale ) const;

//					// most tight bounds for the given transformed bounds
//	void			FromTransformedBounds( const idBounds &bounds, const idVec3 &origin, const idMat3 &axis );
//					// most tight bounds for a point set
//	void			FromPoints( const idVec3 *points, const int numPoints );
//					// most tight bounds for a translation
//	void			FromPointTranslation( const idVec3 &point, const idVec3 &translation );
//	void			FromBoundsTranslation( const idBounds &bounds, const idVec3 &origin, const idMat3 &axis, const idVec3 &translation );
//					// most tight bounds for a rotation
//	void			FromPointRotation( const idVec3 &point, const idRotation &rotation );
//	void			FromBoundsRotation( const idBounds &bounds, const idVec3 &origin, const idMat3 &axis, const idRotation &rotation );

//	void			ToPoints( idVec3 points[8] ) const;
//	idSphere		ToSphere( ) const;

//	void			AxisProjection( const idVec3 &dir, float &min, float &max ) const;
//	void			AxisProjection( const idVec3 &origin, const idMat3 &axis, const idVec3 &dir, float &min, float &max ) const;

//private:
	b = [new idVec3, new idVec3];

//extern idBounds	bounds_zero;

	constructor ( )
	constructor ( point: idVec3 )
	constructor ( mins: idVec3, maxs: idVec3 )
	constructor ( a1?: idVec3, a2?: idVec3 ) {
		if ( arguments.length == 0 ) {
			return;
		}

		if ( arguments.length == 1 ) {
			var point: idVec3 = a1;
			this.b[0].opEquals( point );
			this.b[1].opEquals( point );
		} else if ( arguments.length == 2 ) {
			var mins: idVec3 = a1, maxs: idVec3 = a1;
			this.b[0].opEquals( mins );
			this.b[1].opEquals( maxs );
		} else {
			todoThrow ( );
		}
	}

//ID_INLINE idBounds::idBounds( const idVec3 &mins, const idVec3 &maxs ) {
//	this.b[0] = mins;
//	this.b[1] = maxs;
//}

//ID_INLINE idBounds::idBounds( const idVec3 &point ) {
//	this.b[0] = point;
//	this.b[1] = point;
//}

	memset0 ( ): void {
		this.Zero ( );
	}

	[index: number]: idVec3;
//ID_INLINE const idVec3 &idBounds::operator[]( const int index ) const {
//	return this.b[index];
//}

//ID_INLINE idVec3 &idBounds::operator[]( const int index ) {
//	return this.b[index];
//}

//ID_INLINE idBounds idBounds::operator+( const idVec3 &t ) const {
//	return idBounds( this.b[0] + t, this.b[1] + t );
//}

	opEquals ( other: idBounds ) {
		this.b[0].opEquals( other.b[0] );
		this.b[1].opEquals( other.b[1] );
	}

//ID_INLINE idBounds &idBounds::operator+=( const idVec3 &t ) {
//	this.b[0] += t;
//	this.b[1] += t;
//	return this;
//}

//ID_INLINE idBounds idBounds::operator*( const idMat3 &r ) const {
//	idBounds bounds;
//	bounds.FromTransformedBounds( this, vec3_origin, r );
//	return bounds;
//}

//ID_INLINE idBounds &idBounds::operator*=( const idMat3 &r ) {
//	this.FromTransformedBounds( this, vec3_origin, r );
//	return this;
//}

//ID_INLINE idBounds idBounds::operator+( const idBounds &a ) const {
	opAddition ( a: idBounds ): idBounds {
		var newBounds = new idBounds;
		newBounds.opEquals( this );
		newBounds.AddBounds( a );
		return newBounds;
	}

	opAdditionAssignment ( a: idBounds ): idBounds {
		this.AddBounds( a );
		return this;
	}

//ID_INLINE idBounds idBounds::operator-( const idBounds &a ) const {
//	assert( this.b[1][0] - this.b[0][0] > a.b[1][0] - a.b[0][0] &&
//				this.b[1][1] - this.b[0][1] > a.b[1][1] - a.b[0][1] &&
//					this.b[1][2] - this.b[0][2] > a.b[1][2] - a.b[0][2] );
//	return idBounds( idVec3( this.b[0][0] + a.b[1][0], this.b[0][1] + a.b[1][1], this.b[0][2] + a.b[1][2] ),
//					idVec3( this.b[1][0] + a.b[0][0], this.b[1][1] + a.b[0][1], this.b[1][2] + a.b[0][2] ) );
//}

//ID_INLINE idBounds &idBounds::operator-=( const idBounds &a ) {
//	assert( this.b[1][0] - this.b[0][0] > a.b[1][0] - a.b[0][0] &&
//				this.b[1][1] - this.b[0][1] > a.b[1][1] - a.b[0][1] &&
//					this.b[1][2] - this.b[0][2] > a.b[1][2] - a.b[0][2] );
//	this.b[0] += a.b[1];
//	this.b[1] += a.b[0];
//	return this;
//}

//ID_INLINE bool idBounds::Compare( const idBounds &a ) const {
//	return ( this.b[0].Compare( a.b[0] ) && this.b[1].Compare( a.b[1] ) );
//}

//ID_INLINE bool idBounds::Compare( const idBounds &a, const float epsilon ) const {
//	return ( this.b[0].Compare( a.b[0], epsilon ) && this.b[1].Compare( a.b[1], epsilon ) );
//}

//ID_INLINE bool idBounds::operator==( const idBounds &a ) const {
//	return Compare( a );
//}

//ID_INLINE bool idBounds::operator!=( const idBounds &a ) const {
//	return !Compare( a );
//}

Clear( ):void {
	this.b[0][0] =this.b[0][1] = this.b[0][2] = idMath.INFINITY;
	this.b[1][0] =this.b[1][1] = this.b[1][2] = -idMath.INFINITY;
}

Zero( ):void {
	this.b[0][0] = this.b[0][1] = this.b[0][2] =
	this.b[1][0] = this.b[1][1] = this.b[1][2] = 0;
}

	GetCenter ( ): idVec3 {
		return new idVec3( ( this.b[1][0] + this.b[0][0] ) * 0.5, ( this.b[1][1] + this.b[0][1] ) * 0.5, ( this.b[1][2] + this.b[0][2] ) * 0.5 );
	}

	GetVolume ( ): number {
		if ( this.b[0][0] >= this.b[1][0] || this.b[0][1] >= this.b[1][1] || this.b[0][2] >= this.b[1][2] ) {
			return 0.0;
		}
		return ( ( this.b[1][0] - this.b[0][0] ) * ( this.b[1][1] - this.b[0][1] ) * ( this.b[1][2] - this.b[0][2] ) );
	}

	IsCleared ( ): boolean {
		return this.b[0][0] > this.b[1][0];
	}

	AddPoint ( v: idVec3 ): boolean {
		var expanded = false;
		if ( v[0] < this.b[0][0] ) {
			this.b[0][0] = v[0];
			expanded = true;
		}
		if ( v[0] > this.b[1][0] ) {
			this.b[1][0] = v[0];
			expanded = true;
		}
		if ( v[1] < this.b[0][1] ) {
			this.b[0][1] = v[1];
			expanded = true;
		}
		if ( v[1] > this.b[1][1] ) {
			this.b[1][1] = v[1];
			expanded = true;
		}
		if ( v[2] < this.b[0][2] ) {
			this.b[0][2] = v[2];
			expanded = true;
		}
		if ( v[2] > this.b[1][2] ) {
			this.b[1][2] = v[2];
			expanded = true;
		}
		return expanded;
	}

	AddBounds ( a: idBounds ): boolean {
		var expanded = false;
		if ( a.b[0][0] < this.b[0][0] ) {
			this.b[0][0] = a.b[0][0];
			expanded = true;
		}
		if ( a.b[0][1] < this.b[0][1] ) {
			this.b[0][1] = a.b[0][1];
			expanded = true;
		}
		if ( a.b[0][2] < this.b[0][2] ) {
			this.b[0][2] = a.b[0][2];
			expanded = true;
		}
		if ( a.b[1][0] > this.b[1][0] ) {
			this.b[1][0] = a.b[1][0];
			expanded = true;
		}
		if ( a.b[1][1] > this.b[1][1] ) {
			this.b[1][1] = a.b[1][1];
			expanded = true;
		}
		if ( a.b[1][2] > this.b[1][2] ) {
			this.b[1][2] = a.b[1][2];
			expanded = true;
		}
		return expanded;
	}

//ID_INLINE idBounds idBounds::Intersect( const idBounds &a ) const {
//	idBounds n;
//	n.b[0][0] = ( a.b[0][0] > this.b[0][0] ) ? a.b[0][0] : this.b[0][0];
//	n.b[0][1] = ( a.b[0][1] > this.b[0][1] ) ? a.b[0][1] : this.b[0][1];
//	n.b[0][2] = ( a.b[0][2] > this.b[0][2] ) ? a.b[0][2] : this.b[0][2];
//	n.b[1][0] = ( a.b[1][0] < this.b[1][0] ) ? a.b[1][0] : this.b[1][0];
//	n.b[1][1] = ( a.b[1][1] < this.b[1][1] ) ? a.b[1][1] : this.b[1][1];
//	n.b[1][2] = ( a.b[1][2] < this.b[1][2] ) ? a.b[1][2] : this.b[1][2];
//	return n;
//}

//ID_INLINE idBounds &idBounds::IntersectSelf( const idBounds &a ) {
//	if ( a.b[0][0] > this.b[0][0] ) {
//		this.b[0][0] = a.b[0][0];
//	}
//	if ( a.b[0][1] > this.b[0][1] ) {
//		this.b[0][1] = a.b[0][1];
//	}
//	if ( a.b[0][2] > this.b[0][2] ) {
//		this.b[0][2] = a.b[0][2];
//	}
//	if ( a.b[1][0] < this.b[1][0] ) {
//		this.b[1][0] = a.b[1][0];
//	}
//	if ( a.b[1][1] < this.b[1][1] ) {
//		this.b[1][1] = a.b[1][1];
//	}
//	if ( a.b[1][2] < this.b[1][2] ) {
//		this.b[1][2] = a.b[1][2];
//	}
//	return this;
//}

	Expand ( /*float */d: number ): idBounds {
		return new idBounds( new idVec3( this.b[0][0] - d, this.b[0][1] - d, this.b[0][2] - d ),
			new idVec3( this.b[1][0] + d, this.b[1][1] + d, this.b[1][2] + d ) );
	}

	ExpandSelf ( /*float */d: number ): idBounds {
		this.b[0][0] -= d;
		this.b[0][1] -= d;
		this.b[0][2] -= d;
		this.b[1][0] += d;
		this.b[1][1] += d;
		this.b[1][2] += d;
		return this;
	}

//ID_INLINE idBounds idBounds::Translate( const idVec3 &translation ) const {
//	return idBounds( this.b[0] + translation, this.b[1] + translation );
//}

	TranslateSelf ( translation: idVec3 ): idBounds {
		this.b[0].opAdditionAssignment( translation );
		this.b[1].opAdditionAssignment( translation );
		return this;
	}

//ID_INLINE idBounds idBounds::Rotate( const idMat3 &rotation ) const {
//	idBounds bounds;
//	bounds.FromTransformedBounds( this, vec3_origin, rotation );
//	return bounds;
//}

//ID_INLINE idBounds &idBounds::RotateSelf( const idMat3 &rotation ) {
//	FromTransformedBounds( this, vec3_origin, rotation );
//	return this;
//}

//ID_INLINE bool idBounds::ContainsPoint( const idVec3 &p ) const {
//	if ( p[0] < this.b[0][0] || p[1] < this.b[0][1] || p[2] < this.b[0][2]
//		|| p[0] > this.b[1][0] || p[1] > this.b[1][1] || p[2] > this.b[1][2] ) {
//		return false;
//	}
//	return true;
//}

	IntersectsBounds ( a: idBounds ): boolean {
		if ( a.b[1][0] < this.b[0][0] || a.b[1][1] < this.b[0][1] || a.b[1][2] < this.b[0][2]
			|| a.b[0][0] > this.b[1][0] || a.b[0][1] > this.b[1][1] || a.b[0][2] > this.b[1][2] ) {
			return false;
		}
		return true;
	}

//ID_INLINE idSphere idBounds::ToSphere( ) const {
//	idSphere sphere;
//	sphere.SetOrigin( ( this.b[0] + this.b[1] ) * 0.5 );
//	sphere.SetRadius( ( this.b[1] - sphere.GetOrigin() ).Length() );
//	return sphere;
//}

//ID_INLINE void idBounds::AxisProjection( const idVec3 &dir, float &min, float &max ) const {
//	float d1, d2;
//	idVec3 center, extents;

//	center = ( this.b[0] + this.b[1] ) * 0.5;
//	extents = this.b[1] - center;

//	d1 = dir * center;
//	d2 = idMath.Fabs( extents[0] * dir[0] ) +
//			idMath.Fabs( extents[1] * dir[1] ) +
//				idMath.Fabs( extents[2] * dir[2] );

//	min = d1 - d2;
//	max = d1 + d2;
//}

//ID_INLINE void idBounds::AxisProjection( origin:idVec3, const idMat3 &axis, const idVec3 &dir, float &min, float &max ) const {
//	float d1, d2;
//	idVec3 center, extents;

//	center = ( this.b[0] + this.b[1] ) * 0.5;
//	extents = this.b[1] - center;
//	center = origin + center * axis;

//	d1 = dir * center;
//	d2 = idMath.Fabs( extents[0] * ( dir * axis[0] ) ) +
//			idMath.Fabs( extents[1] * ( dir * axis[1] ) ) +
//				idMath.Fabs( extents[2] * ( dir * axis[2] ) );

//	min = d1 - d2;
//	max = d1 + d2;
//}

//#endif /* !__BV_BOUNDS_H__ */


//// Bounds.cpp:



/*
============
idBounds::GetRadius
============
*/
GetRadius( ) :number/*float*/ {
	var i:number /*int*/;
	var/*float	*/total: number, b0: number, b1: number;

	total = 0.0;
	for (i = 0; i < 3; i++) {
		b0 = /*(float)*/idMath.Fabs(this.b[0][i]);
		b1 = /*(float)*/idMath.Fabs(this.b[1][i]);
		if (b0 > b1) {
			total += b0 * b0;
		}
		else {
			total += b1 * b1;
		}
	}
	return idMath.Sqrt(total);
}

///*
//============
//idBounds::GetRadius
//============
//*/
//float idBounds::GetRadius(const idVec3 &center) const {
//	var i:number /*int*/;
//	float	total, b0, b1;

//	total = 0.0;
//	for (i = 0; i < 3; i++) {
//		b0 = (float)idMath.Fabs(center[i] - this.b[0][i]);
//		b1 = (float)idMath.Fabs(this.b[1][i] - center[i]);
//		if (b0 > b1) {
//			total += b0 * b0;
//		}
//		else {
//			total += b1 * b1;
//		}
//	}
//	return idMath.Sqrt(total);
//}

///*
//================
//idBounds::PlaneDistance
//================
//*/
//float idBounds::PlaneDistance(const idPlane &plane) const {
//	idVec3 center;
//	float d1, d2;

//	center = (this.b[0] + this.b[1]) * 0.5;

//	d1 = plane.Distance(center);
//	d2 = idMath.Fabs((this.b[1][0] - center[0]) * plane.Normal()[0]) +
//		idMath.Fabs((this.b[1][1] - center[1]) * plane.Normal()[1]) +
//		idMath.Fabs((this.b[1][2] - center[2]) * plane.Normal()[2]);

//	if (d1 - d2 > 0.0) {
//		return d1 - d2;
//	}
//	if (d1 + d2 < 0.0) {
//		return d1 + d2;
//	}
//	return 0.0;
//}

/*
================
idBounds::PlaneSide
================
*/
	PlaneSide ( plane: idPlane, /*float*/ epsilon = ON_EPSILON ): number /*int*/ {
		var center = new idVec3;
		var /*float */d1: number, d2: number;

		center.opEquals( ( this.b[0].opAddition( this.b[1] ) ).timesFloat( 0.5 ) );

		d1 = plane.Distance( center );
		d2 = idMath.Fabs( ( this.b[1][0] - center[0] ) * plane.Normal ( )[0] ) +
			idMath.Fabs( ( this.b[1][1] - center[1] ) * plane.Normal ( )[1] ) +
			idMath.Fabs( ( this.b[1][2] - center[2] ) * plane.Normal ( )[2] );

		if ( d1 - d2 > epsilon ) {
			return PLANESIDE_FRONT;
		}
		if ( d1 + d2 < -epsilon ) {
			return PLANESIDE_BACK;
		}
		return PLANESIDE_CROSS;
	}

///*
//============
//idBounds::LineIntersection

//Returns true if the line intersects the bounds between the start and end point.
//============
//*/
//bool idBounds::LineIntersection(start:idVec3, end:idVec3) const {
//	float ld[3];
//	idVec3 center = (this.b[0] + this.b[1]) * 0.5;
//	idVec3 extents = this.b[1] - center;
//	idVec3 lineDir = 0.5 * (end - start);
//	idVec3 lineCenter = start + lineDir;
//	idVec3 dir = lineCenter - center;

//	ld[0] = idMath.Fabs(lineDir[0]);
//	if (idMath.Fabs(dir[0]) > extents[0] + ld[0]) {
//		return false;
//	}

//	ld[1] = idMath.Fabs(lineDir[1]);
//	if (idMath.Fabs(dir[1]) > extents[1] + ld[1]) {
//		return false;
//	}

//	ld[2] = idMath.Fabs(lineDir[2]);
//	if (idMath.Fabs(dir[2]) > extents[2] + ld[2]) {
//		return false;
//	}

//	idVec3 cross = lineDir.Cross(dir);

//	if (idMath.Fabs(cross[0]) > extents[1] * ld[2] + extents[2] * ld[1]) {
//		return false;
//	}

//	if (idMath.Fabs(cross[1]) > extents[0] * ld[2] + extents[2] * ld[0]) {
//		return false;
//	}

//	if (idMath.Fabs(cross[2]) > extents[0] * ld[1] + extents[1] * ld[0]) {
//		return false;
//	}

//	return true;
//}

///*
//============
//idBounds::RayIntersection

//Returns true if the ray intersects the bounds.
//The ray can intersect the bounds in both directions from the start point.
//If start is inside the bounds it is considered an intersection with scale = 0
//============
//*/
//bool idBounds::RayIntersection(start:idVec3, const idVec3 &dir, float &scale) const {
//	int i, ax0, ax1, ax2, side, inside;
//	float f;
//	idVec3 hit;

//	ax0 = -1;
//	inside = 0;
//	for (i = 0; i < 3; i++) {
//		if (start[i] < this.b[0][i]) {
//			side = 0;
//		}
//		else if (start[i] > this.b[1][i]) {
//			side = 1;
//		}
//		else {
//			inside++;
//			continue;
//		}
//		if (dir[i] == 0.0) {
//			continue;
//		}
//		f = (start[i] - this.b[side][i]);
//		if (ax0 < 0 || idMath.Fabs(f) > idMath.Fabs(scale * dir[i])) {
//			scale = -(f / dir[i]);
//			ax0 = i;
//		}
//	}

//	if (ax0 < 0) {
//		scale = 0.0;
//		// return true if the start point is inside the bounds
//		return (inside == 3);
//	}

//	ax1 = (ax0 + 1) % 3;
//	ax2 = (ax0 + 2) % 3;
//	hit[ax1] = start[ax1] + scale * dir[ax1];
//	hit[ax2] = start[ax2] + scale * dir[ax2];

//	return (hit[ax1] >= this.b[0][ax1] && hit[ax1] <= this.b[1][ax1] &&
//		hit[ax2] >= this.b[0][ax2] && hit[ax2] <= this.b[1][ax2]);
//}

/*
============
idBounds::FromTransformedBounds
============
*/
	FromTransformedBounds ( bounds: idBounds, origin: idVec3, axis: idMat3 ): void {
		var /*int*/i: number;
		var center = new idVec3, extents = new idVec3, rotatedExtents = new idVec3;

		center.opEquals( ( bounds[0].opAddition( bounds[1] ) ).timesFloat( 0.5 ) );
		extents.opEquals( bounds[1].opSubtraction( center ) );

		for ( i = 0; i < 3; i++ ) {
			rotatedExtents[i] = idMath.Fabs( extents[0] * axis[0][i] ) +
				idMath.Fabs( extents[1] * axis[1][i] ) +
				idMath.Fabs( extents[2] * axis[2][i] );
		}

		center.opEquals( origin.opAddition( idMat3.opMultiplication_VecMat( center, axis ) ) );
		this.b[0].opEquals( center.opSubtraction( rotatedExtents ) );
		this.b[1].opEquals( center.opAddition( rotatedExtents ) );
	}

///*
//============
//idBounds::FromPoints

//Most tight bounds for a point set.
//============
//*/
//void idBounds::FromPoints(const idVec3 *points, const int numPoints) {
//	SIMDProcessor.MinMax(this.b[0], this.b[1], points, numPoints);
//}

///*
//============
//idBounds::FromPointTranslation

//Most tight bounds for the translational movement of the given point.
//============
//*/
//void idBounds::FromPointTranslation(const idVec3 &point, const idVec3 &translation) {
//	var/*int*/i:number;

//	for (i = 0; i < 3; i++) {
//		if (translation[i] < 0.0) {
//			this.b[0][i] = point[i] + translation[i];
//			this.b[1][i] = point[i];
//		}
//		else {
//			this.b[0][i] = point[i];
//			this.b[1][i] = point[i] + translation[i];
//		}
//	}
//}

///*
//============
//idBounds::FromBoundsTranslation

//Most tight bounds for the translational movement of the given bounds.
//============
//*/
//void idBounds::FromBoundsTranslation(bounds:idBounds, const idVec3 &origin, const idMat3 &axis, const idVec3 &translation) {
//	var/*int*/i:number;

//	if (axis.IsRotated()) {
//		FromTransformedBounds(bounds, origin, axis);
//	}
//	else {
//		this.b[0] = bounds[0] + origin;
//		this.b[1] = bounds[1] + origin;
//	}
//	for (i = 0; i < 3; i++) {
//		if (translation[i] < 0.0) {
//			this.b[0][i] += translation[i];
//		}
//		else {
//			this.b[1][i] += translation[i];
//		}
//	}
//}

///*
//================
//BoundsForPointRotation

//only for rotations < 180 degrees
//================
//*/
//idBounds BoundsForPointRotation(start:idVec3, const idRotation &rotation) {
//	var/*int*/i:number;
//	float radiusSqr;
//	idVec3 v1, v2;
//	idVec3 origin, axis, end;
//	idBounds bounds;

//	end = start * rotation;
//	axis = rotation.GetVec();
//	origin = rotation.GetOrigin() + axis * (axis * (start - rotation.GetOrigin()));
//	radiusSqr = (start - origin).LengthSqr();
//	v1 = (start - origin).Cross(axis);
//	v2 = (end - origin).Cross(axis);

//	for (i = 0; i < 3; i++) {
//		// if the derivative changes sign along this axis during the rotation from start to end
//		if ((v1[i] > 0.0 && v2[i] < 0.0) || (v1[i] < 0.0 && v2[i] > 0.0)) {
//			if ((0.5f * (start[i] + end[i]) - origin[i]) > 0.0) {
//				bounds[0][i] = Min(start[i], end[i]);
//				bounds[1][i] = origin[i] + idMath.Sqrt(radiusSqr * (1.0f - axis[i] * axis[i]));
//			}
//			else {
//				bounds[0][i] = origin[i] - idMath.Sqrt(radiusSqr * (1.0f - axis[i] * axis[i]));
//				bounds[1][i] = Max(start[i], end[i]);
//			}
//		}
//		else if (start[i] > end[i]) {
//			bounds[0][i] = end[i];
//			bounds[1][i] = start[i];
//		}
//		else {
//			bounds[0][i] = start[i];
//			bounds[1][i] = end[i];
//		}
//	}

//	return bounds;
//}

///*
//============
//idBounds::FromPointRotation

//Most tight bounds for the rotational movement of the given point.
//============
//*/
//void idBounds::FromPointRotation(const idVec3 &point, const idRotation &rotation) {
//	var/*float */radius:number;

//	if (idMath.Fabs(rotation.GetAngle()) < 180.0f) {
//		(this) = BoundsForPointRotation(point, rotation);
//	}
//	else {

//		radius = (point - rotation.GetOrigin()).Length();

//		// FIXME: these bounds are usually way larger
//		this.b[0].Set(-radius, -radius, -radius);
//		this.b[1].Set(radius, radius, radius);
//	}
//}

///*
//============
//idBounds::FromBoundsRotation

//Most tight bounds for the rotational movement of the given bounds.
//============
//*/
//void idBounds::FromBoundsRotation(bounds:idBounds, const idVec3 &origin, const idMat3 &axis, const idRotation &rotation) {
//	var/*int*/i:number;
//	var/*float */radius:number;
//	idVec3 point;
//	idBounds rBounds;

//	if (idMath.Fabs(rotation.GetAngle()) < 180.0f) {

//		(this) = BoundsForPointRotation(bounds[0] * axis + origin, rotation);
//		for (i = 1; i < 8; i++) {
//			point[0] = bounds[(i ^ (i >> 1)) & 1][0];
//			point[1] = bounds[(i >> 1) & 1][1];
//			point[2] = bounds[(i >> 2) & 1][2];
//			(this) += BoundsForPointRotation(point * axis + origin, rotation);
//		}
//	}
//	else {

//		point = (bounds[1] - bounds[0]) * 0.5;
//		radius = (bounds[1] - point).Length() + (point - rotation.GetOrigin()).Length();

//		// FIXME: these bounds are usually way larger
//		this.b[0].Set(-radius, -radius, -radius);
//		this.b[1].Set(radius, radius, radius);
//	}
//}

///*
//============
//idBounds::ToPoints
//============
//*/
//void idBounds::ToPoints(idVec3 points[8]) const {
//	for (int i = 0; i < 8; i++) {
//		points[i][0] = this.b[(i ^ (i >> 1)) & 1][0];
//		points[i][1] = this.b[(i >> 1) & 1][1];
//		points[i][2] = this.b[(i >> 2) & 1][2];
//	}
//}
}

Object.defineProperty( idBounds.prototype, "0", {
	get: function ( ): idVec3 {
		return this.b[0];
	},
	set: function ( value: number ): void {
		todoThrow ( );
	},
	enumerable: false,
	configurable: false
} );

Object.defineProperty( idBounds.prototype, "1", {
	get: function ( ): idVec3 {
		return this.b[1];
	},
	set: function ( value: number ): void {
		todoThrow ( );
	},
	enumerable: false,
	configurable: false
} );

var bounds_zero = new idBounds(vec3_zero, vec3_zero);
