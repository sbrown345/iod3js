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
//#ifndef __WINDING_H__
//#define __WINDING_H__

/*
===============================================================================

	A winding is an arbitrary convex polygon defined by an array of points.

===============================================================================
*/

class idWinding {

//public:
//					idWinding( );
//					explicit idWinding( const int n );								// allocate for n points
//					explicit idWinding( const idVec3 *verts, const int n );			// winding from points
//					explicit idWinding( const idVec3 &normal, const float dist );	// base winding for plane
//					explicit idWinding( const idPlane &plane );						// base winding for plane
//					explicit idWinding( const idWinding &winding );
//	virtual			~idWinding( );
//
//	idWinding &		operator=( const idWinding &winding );
//	const idVec5 &	operator[]( const int index ) const;
//	idVec5 &		operator[]( const int index );
//
//					// add a point to the end of the winding point array
//	idWinding &		operator+=( const idVec3 &v );
//	idWinding &		operator+=( const idVec5 &v );
//	void			AddPoint( const idVec3 &v );
//	void			AddPoint( const idVec5 &v );
//
//					// number of points on winding
//	int				GetNumPoints( ) const;
//	void			SetNumPoints( int n );
//	virtual void	Clear( );
//
//					// huge winding for plane, the points go counter clockwise when facing the front of the plane
//	void			BaseForPlane( const idVec3 &normal, const float dist );
//	void			BaseForPlane( const idPlane &plane );
//
//					// splits the winding into a front and back winding, the winding itself stays unchanged
//					// returns a SIDE_?
//	int				Split( const idPlane &plane, const float epsilon, idWinding **front, idWinding **back ) const;
//					// returns the winding fragment at the front of the clipping plane,
//					// if there is nothing at the front the winding itself is destroyed and NULL is returned
//	idWinding *		Clip( const idPlane &plane, const float epsilon = ON_EPSILON, const bool keepOn = false );
//					// cuts off the part at the back side of the plane, returns true if some part was at the front
//					// if there is nothing at the front the number of points is set to zero
//	bool			ClipInPlace( const idPlane &plane, const float epsilon = ON_EPSILON, const bool keepOn = false );
//
//					// returns a copy of the winding
//	idWinding *		Copy( ) const;
//	idWinding *		Reverse( ) const;
//	void			ReverseSelf( );
//	void			RemoveEqualPoints( const float epsilon = ON_EPSILON );
//	void			RemoveColinearPoints( const idVec3 &normal, const float epsilon = ON_EPSILON );
//	void			RemovePoint( int point );
//	void			InsertPoint( const idVec3 &point, int spot );
//	bool			InsertPointIfOnEdge( const idVec3 &point, const idPlane &plane, const float epsilon = ON_EPSILON );
//					// add a winding to the convex hull
//	void			AddToConvexHull( const idWinding *winding, const idVec3 &normal, const float epsilon = ON_EPSILON );
//					// add a point to the convex hull
//	void			AddToConvexHull( const idVec3 &point, const idVec3 &normal, const float epsilon = ON_EPSILON );
//					// tries to merge 'this' with the given winding, returns NULL if merge fails, both 'this' and 'w' stay intact
//					// 'keep' tells if the contacting points should stay even if they create colinear edges
//	idWinding *		TryMerge( const idWinding &w, const idVec3 &normal, int keep = false ) const;
//					// check whether the winding is valid or not
//	bool			Check( bool print = true ) const;
//
//	float			GetArea( ) const;
//	idVec3			GetCenter( ) const;
//	float			GetRadius( const idVec3 &center ) const;
//	void			GetPlane( idVec3 &normal, float &dist ) const;
//	void			GetPlane( idPlane &plane ) const;
//	void			GetBounds( idBounds &bounds ) const;
//
//	bool			IsTiny( ) const;
//	bool			IsHuge( ) const;	// base winding for a plane is typically huge
//	void			Print( ) const;
//
//	float			PlaneDistance( const idPlane &plane ) const;
//	int				PlaneSide( const idPlane &plane, const float epsilon = ON_EPSILON ) const;
//
//	bool			PlanesConcave( const idWinding &w2, const idVec3 &normal1, const idVec3 &normal2, float dist1, float dist2 ) const;
//
//	bool			PointInside( const idVec3 &normal, const idVec3 &point, const float epsilon ) const;
//					// returns true if the line or ray intersects the winding
//	bool			LineIntersection( const idPlane &windingPlane, start:idVec3, end:idVec3, bool backFaceCull = false ) const;
//					// intersection point is start + dir * scale
//	bool			RayIntersection( const idPlane &windingPlane, start:idVec3, const idVec3 &dir, float &scale, bool backFaceCull = false ) const;
//
//	static float	TriangleArea( const idVec3 &a, const idVec3 &b, const idVec3 &c );
//
//protected:
	numPoints:number/*int*/;				// number of points
	p: idVec5[] = null;						// pointer to point data
	allocedSize: number/*int*/;
//
//	bool			EnsureAlloced( int n, bool keep = false );
//	virtual bool	ReAllocate( int n, bool keep = false );
//};
//
//ID_INLINE idWinding::idWinding( ) {
//	this.numPoints = this.allocedSize = 0;
//	this.p = NULL;
//}
//
//ID_INLINE idWinding::idWinding( int n ) {
//	this.numPoints = this.allocedSize = 0;
//	this.p = NULL;
//	EnsureAlloced( n );
//}

	constructor ( n: number=null ) {
		this.numPoints = this.allocedSize = 0;
		this.p = null;
		if ( n ) {
			this.EnsureAlloced( n );
		}
	}
//
//ID_INLINE idWinding::idWinding( const idVec3 *verts, const int n ) {
//	int i;
//
//	this.numPoints = this.allocedSize = 0;
//	this.p = NULL;
//	if ( !EnsureAlloced( n ) ) {
//		this.numPoints = 0;
//		return;
//	}
//	for ( i = 0; i < n; i++ ) {
//		this.p[i].ToVec3() = verts[i];
//		this.p[i].s = this.p[i].t = 0.0;
//	}
//	this.numPoints = n;
//}
//
//ID_INLINE idWinding::idWinding( const idVec3 &normal, const float dist ) {
//	this.numPoints = this.allocedSize = 0;
//	this.p = NULL;
//	BaseForPlane( normal, dist );
//}
//
//ID_INLINE idWinding::idWinding( const idPlane &plane ) {
//	this.numPoints = this.allocedSize = 0;
//	this.p = NULL;
//	BaseForPlane( plane );
//}
//
//ID_INLINE idWinding::idWinding( const idWinding &winding ) {
//	int i;
//	if ( !EnsureAlloced( winding.GetNumPoints() ) ) {
//		this.numPoints = 0;
//		return;
//	}
//	for ( i = 0; i < winding.GetNumPoints(); i++ ) {
//		this.p[i] = winding[i];
//	}
//	this.numPoints = winding.GetNumPoints();
//}
//
//ID_INLINE idWinding::~idWinding( ) {
//	delete[] this.p;
//	this.p = NULL;
//}
//
//ID_INLINE idWinding &idWinding::operator=( const idWinding &winding ) {
//	int i;
//
//	if ( !EnsureAlloced( winding.numPoints ) ) {
//		this.numPoints = 0;
//		return *this;
//	}
//	for ( i = 0; i < winding.numPoints; i++ ) {
//		this.p[i] = winding.p[i];
//	}
//	this.numPoints = winding.numPoints;
//	return *this;
//}
//
//ID_INLINE const idVec5 &idWinding::operator[]( const int index ) const {
//	//assert( index >= 0 && index < this.numPoints );
//	return this.p[ index ];
//}
//
//ID_INLINE idVec5 &idWinding::operator[]( const int index ) {
//	//assert( index >= 0 && index < this.numPoints );
//	return this.p[ index ];
//}
//
//ID_INLINE idWinding &idWinding::operator+=( const idVec3 &v ) {
//	AddPoint( v );
//	return *this;
//}
//
//ID_INLINE idWinding &idWinding::operator+=( const idVec5 &v ) {
//	AddPoint( v );
//	return *this;
//}
//
//ID_INLINE void idWinding::AddPoint( const idVec3 &v ) {
//	if ( !EnsureAlloced(this.numPoints+1, true) ) {
//		return;
//	}
//	this.p[this.numPoints] = v;
//	this.numPoints++;
//}
//
	AddPoint ( /*const */v: idVec5 ): void {
		if ( !this.EnsureAlloced( this.numPoints + 1, true ) ) {
			return;
		}
		this.p[this.numPoints] = v;
		this.numPoints++;
	}

	GetNumPoints ( ): number {
		return this.numPoints;
	}

	SetNumPoints ( /*int */n: number ): void {
		if ( !this.EnsureAlloced( n, true ) ) {
			return;
		}
		this.numPoints = n;
	}
//
//ID_INLINE void idWinding::Clear( ) {
//	this.numPoints = 0;
//	delete[] this.p;
//	this.p = NULL;
//}
//
//ID_INLINE void idWinding::BaseForPlane( const idPlane &plane ) {
//	BaseForPlane( plane.Normal(), plane.Dist() );
//}

	EnsureAlloced ( /*int */n: number, keep = false ): boolean {
		if ( n > this.allocedSize ) {
			return this.ReAllocate( n, keep );
		}
		return true;
	}
//
//
//
//
////Winding.cpp:
//
//
//
////===============================================================
////
////	idWinding
////
////===============================================================
//
	/*
=============
idWinding::ReAllocate
=============
*/
	ReAllocate ( /*int */n: number, keep: boolean ): boolean {
		var oldP: idVec5[];

		oldP = this.p;
		n = ( n + 3 ) & ~3; // align up to multiple of four
		this.p = newStructArray<idVec5>( idVec5, n );
		if ( oldP ) {
			if ( keep ) {
				for ( var i = 0; i < this.numPoints; i++ ) {
					this.p[i].equals( oldP[i] );
				}
			}
			//delete[] oldP;
		}
		this.allocedSize = n;

		return true;
	}
//
///*
//=============
//idWinding::BaseForPlane
//=============
//*/
//void idWinding::BaseForPlane(const idVec3 &normal, const float dist) {
//	idVec3 org, vright, vup;
//
//	org = normal * dist;
//
//	normal.NormalVectors(vup, vright);
//	vup *= MAX_WORLD_SIZE;
//	vright *= MAX_WORLD_SIZE;
//
//	EnsureAlloced(4);
//	this.numPoints = 4;
//	this.p[0].ToVec3() = org - vright + vup;
//	this.p[0].s = this.p[0].t = 0.0;
//	this.p[1].ToVec3() = org + vright + vup;
//	this.p[1].s = this.p[1].t = 0.0;
//	this.p[2].ToVec3() = org + vright - vup;
//	this.p[2].s = this.p[2].t = 0.0;
//	this.p[3].ToVec3() = org - vright - vup;
//	this.p[3].s = this.p[3].t = 0.0;
//}
//
///*
//=============
//idWinding::Split
//=============
//*/
//int idWinding::Split(const idPlane &plane, const float epsilon, idWinding **front, idWinding **back) const {
//	float *			dists;
//	byte *			sides;
//	int				counts[3];
//	float			dot;
//	int				i, j;
//	const idVec5 *	p1, *p2;
//	idVec5			mid;
//	idWinding *		f, *b;
//	int				maxpts;
//
//	assert(this);
//
//	dists = (float *)stack_alloc((numPoints + 4) * sizeof(float));
//	sides = (byte *)stack_alloc((numPoints + 4) * sizeof(byte));
//
//	counts[0] = counts[1] = counts[2] = 0;
//
//	// determine sides for each point
//	for (i = 0; i < this.numPoints; i++) {
//		dists[i] = dot = plane.Distance(p[i].ToVec3());
//		if (dot > epsilon) {
//			sides[i] = SIDE_FRONT;
//		}
//		else if (dot < -epsilon) {
//			sides[i] = SIDE_BACK;
//		}
//		else {
//			sides[i] = SIDE_ON;
//		}
//		counts[sides[i]]++;
//	}
//	sides[i] = sides[0];
//	dists[i] = dists[0];
//
//	*front = *back = NULL;
//
//	// if coplanar, put on the front side if the normals match
//	if (!counts[SIDE_FRONT] && !counts[SIDE_BACK]) {
//		idPlane windingPlane;
//
//		GetPlane(windingPlane);
//		if (windingPlane.Normal() * plane.Normal() > 0.0) {
//			*front = Copy();
//			return SIDE_FRONT;
//		}
//		else {
//			*back = Copy();
//			return SIDE_BACK;
//		}
//	}
//	// if nothing at the front of the clipping plane
//	if (!counts[SIDE_FRONT]) {
//		*back = Copy();
//		return SIDE_BACK;
//	}
//	// if nothing at the back of the clipping plane
//	if (!counts[SIDE_BACK]) {
//		*front = Copy();
//		return SIDE_FRONT;
//	}
//
//	maxpts = this.numPoints + 4;	// cant use counts[0]+2 because of fp grouping errors
//
//	*front = f = new idWinding(maxpts);
//	*back = b = new idWinding(maxpts);
//
//	for (i = 0; i < this.numPoints; i++) {
//		p1 = &p[i];
//
//		if (sides[i] == SIDE_ON) {
//			f.p[f.numPoints] = *p1;
//			f.numPoints++;
//			b.p[b.numPoints] = *p1;
//			b.numPoints++;
//			continue;
//		}
//
//		if (sides[i] == SIDE_FRONT) {
//			f.p[f.numPoints] = *p1;
//			f.numPoints++;
//		}
//
//		if (sides[i] == SIDE_BACK) {
//			b.p[b.numPoints] = *p1;
//			b.numPoints++;
//		}
//
//		if (sides[i + 1] == SIDE_ON || sides[i + 1] == sides[i]) {
//			continue;
//		}
//
//		// generate a split point
//		p2 = &p[(i + 1) % this.numPoints];
//
//		// always calculate the split going from the same side
//		// or minor epsilon issues can happen
//		if (sides[i] == SIDE_FRONT) {
//			dot = dists[i] / (dists[i] - dists[i + 1]);
//			for (j = 0; j < 3; j++) {
//				// avoid round off error when possible
//				if (plane.Normal()[j] == 1.0f) {
//					mid[j] = plane.Dist();
//				}
//				else if (plane.Normal()[j] == -1.0f) {
//					mid[j] = -plane.Dist();
//				}
//				else {
//					mid[j] = (*p1)[j] + dot * ((*p2)[j] - (*p1)[j]);
//				}
//			}
//			mid.s = p1.s + dot * (p2.s - p1.s);
//			mid.t = p1.t + dot * (p2.t - p1.t);
//		}
//		else {
//			dot = dists[i + 1] / (dists[i + 1] - dists[i]);
//			for (j = 0; j < 3; j++) {
//				// avoid round off error when possible
//				if (plane.Normal()[j] == 1.0f) {
//					mid[j] = plane.Dist();
//				}
//				else if (plane.Normal()[j] == -1.0f) {
//					mid[j] = -plane.Dist();
//				}
//				else {
//					mid[j] = (*p2)[j] + dot * ((*p1)[j] - (*p2)[j]);
//				}
//			}
//			mid.s = p2.s + dot * (p1.s - p2.s);
//			mid.t = p2.t + dot * (p1.t - p2.t);
//		}
//
//		f.p[f.numPoints] = mid;
//		f.numPoints++;
//		b.p[b.numPoints] = mid;
//		b.numPoints++;
//	}
//
//	if (f.numPoints > maxpts || b.numPoints > maxpts) {
//		idLib::common.FatalError("idWinding::Split: points exceeded estimate.");
//	}
//
//	return SIDE_CROSS;
//}
//
///*
//=============
//idWinding::Clip
//=============
//*/
//idWinding *idWinding::Clip(const idPlane &plane, const float epsilon, const bool keepOn) {
//	float *		dists;
//	byte *		sides;
//	idVec5 *	newPoints;
//	int			newNumPoints;
//	int			counts[3];
//	float		dot;
//	int			i, j;
//	idVec5 *	p1, *p2;
//	idVec5		mid;
//	int			maxpts;
//
//	assert(this);
//
//	dists = (float *)stack_alloc((numPoints + 4) * sizeof(float));
//	sides = (byte *)stack_alloc((numPoints + 4) * sizeof(byte));
//
//	counts[SIDE_FRONT] = counts[SIDE_BACK] = counts[SIDE_ON] = 0;
//
//	// determine sides for each point
//	for (i = 0; i < this.numPoints; i++) {
//		dists[i] = dot = plane.Distance(p[i].ToVec3());
//		if (dot > epsilon) {
//			sides[i] = SIDE_FRONT;
//		}
//		else if (dot < -epsilon) {
//			sides[i] = SIDE_BACK;
//		}
//		else {
//			sides[i] = SIDE_ON;
//		}
//		counts[sides[i]]++;
//	}
//	sides[i] = sides[0];
//	dists[i] = dists[0];
//
//	// if the winding is on the plane and we should keep it
//	if (keepOn && !counts[SIDE_FRONT] && !counts[SIDE_BACK]) {
//		return this;
//	}
//	// if nothing at the front of the clipping plane
//	if (!counts[SIDE_FRONT]) {
//		delete this;
//		return NULL;
//	}
//	// if nothing at the back of the clipping plane
//	if (!counts[SIDE_BACK]) {
//		return this;
//	}
//
//	maxpts = this.numPoints + 4;		// cant use counts[0]+2 because of fp grouping errors
//
//	newPoints = (idVec5 *)_alloca16(maxpts * sizeof(idVec5));
//	newNumPoints = 0;
//
//	for (i = 0; i < this.numPoints; i++) {
//		p1 = &p[i];
//
//		if (newNumPoints + 1 > maxpts) {
//			return this;		// can't split -- fall back to original
//		}
//
//		if (sides[i] == SIDE_ON) {
//			newPoints[newNumPoints] = *p1;
//			newNumPoints++;
//			continue;
//		}
//
//		if (sides[i] == SIDE_FRONT) {
//			newPoints[newNumPoints] = *p1;
//			newNumPoints++;
//		}
//
//		if (sides[i + 1] == SIDE_ON || sides[i + 1] == sides[i]) {
//			continue;
//		}
//
//		if (newNumPoints + 1 > maxpts) {
//			return this;		// can't split -- fall back to original
//		}
//
//		// generate a split point
//		p2 = &p[(i + 1) % this.numPoints];
//
//		dot = dists[i] / (dists[i] - dists[i + 1]);
//		for (j = 0; j < 3; j++) {
//			// avoid round off error when possible
//			if (plane.Normal()[j] == 1.0f) {
//				mid[j] = plane.Dist();
//			}
//			else if (plane.Normal()[j] == -1.0f) {
//				mid[j] = -plane.Dist();
//			}
//			else {
//				mid[j] = (*p1)[j] + dot * ((*p2)[j] - (*p1)[j]);
//			}
//		}
//		mid.s = p1.s + dot * (p2.s - p1.s);
//		mid.t = p1.t + dot * (p2.t - p1.t);
//
//		newPoints[newNumPoints] = mid;
//		newNumPoints++;
//	}
//
//	if (!EnsureAlloced(newNumPoints, false)) {
//		return this;
//	}
//
//	this.numPoints = newNumPoints;
//	memcpy(p, newPoints, newNumPoints * sizeof(idVec5));
//
//	return this;
//}
//
/*
=============
idWinding::ClipInPlace
=============
*/
	ClipInPlace(plane: idPlane, /*float */epsilon: number = ON_EPSILON, keepOn = false ): boolean {
		todoThrow ( );
		//float*		dists;
//	byte *		sides;
//	idVec5 *	newPoints;
//	int			newNumPoints;
//	int			counts[3];
//	int			i, j;
//	float		dot;
//	idVec5 *	p1, *p2;
//	idVec5		mid;
//	int			maxpts;
//
//	assert(this);
//
//	dists = (float *)stack_alloc((numPoints + 4) * sizeof(float));
//	sides = (byte *)stack_alloc((numPoints + 4) * sizeof(byte));
//
//	counts[SIDE_FRONT] = counts[SIDE_BACK] = counts[SIDE_ON] = 0;
//
//	// determine sides for each point
//	for (i = 0; i < this.numPoints; i++) {
//		dists[i] = dot = plane.Distance(p[i].ToVec3());
//		if (dot > epsilon) {
//			sides[i] = SIDE_FRONT;
//		}
//		else if (dot < -epsilon) {
//			sides[i] = SIDE_BACK;
//		}
//		else {
//			sides[i] = SIDE_ON;
//		}
//		counts[sides[i]]++;
//	}
//	sides[i] = sides[0];
//	dists[i] = dists[0];
//
//	// if the winding is on the plane and we should keep it
//	if (keepOn && !counts[SIDE_FRONT] && !counts[SIDE_BACK]) {
//		return true;
//	}
//	// if nothing at the front of the clipping plane
//	if (!counts[SIDE_FRONT]) {
//		this.numPoints = 0;
//		return false;
//	}
//	// if nothing at the back of the clipping plane
//	if (!counts[SIDE_BACK]) {
//		return true;
//	}
//
//	maxpts = this.numPoints + 4;		// cant use counts[0]+2 because of fp grouping errors
//
//	newPoints = (idVec5 *)_alloca16(maxpts * sizeof(idVec5));
//	newNumPoints = 0;
//
//	for (i = 0; i < this.numPoints; i++) {
//		p1 = &p[i];
//
//		if (newNumPoints + 1 > maxpts) {
//			return true;		// can't split -- fall back to original
//		}
//
//		if (sides[i] == SIDE_ON) {
//			newPoints[newNumPoints] = *p1;
//			newNumPoints++;
//			continue;
//		}
//
//		if (sides[i] == SIDE_FRONT) {
//			newPoints[newNumPoints] = *p1;
//			newNumPoints++;
//		}
//
//		if (sides[i + 1] == SIDE_ON || sides[i + 1] == sides[i]) {
//			continue;
//		}
//
//		if (newNumPoints + 1 > maxpts) {
//			return true;		// can't split -- fall back to original
//		}
//
//		// generate a split point
//		p2 = &p[(i + 1) % this.numPoints];
//
//		dot = dists[i] / (dists[i] - dists[i + 1]);
//		for (j = 0; j < 3; j++) {
//			// avoid round off error when possible
//			if (plane.Normal()[j] == 1.0f) {
//				mid[j] = plane.Dist();
//			}
//			else if (plane.Normal()[j] == -1.0f) {
//				mid[j] = -plane.Dist();
//			}
//			else {
//				mid[j] = (*p1)[j] + dot * ((*p2)[j] - (*p1)[j]);
//			}
//		}
//		mid.s = p1.s + dot * (p2.s - p1.s);
//		mid.t = p1.t + dot * (p2.t - p1.t);
//
//		newPoints[newNumPoints] = mid;
//		newNumPoints++;
//	}
//
//	if (!EnsureAlloced(newNumPoints, false)) {
//		return true;
//	}
//
//	this.numPoints = newNumPoints;
//	memcpy(p, newPoints, newNumPoints * sizeof(idVec5));
//
		return true;
	}
//
///*
//=============
//idWinding::Copy
//=============
//*/
//idWinding *idWinding::Copy() const {
//	idWinding *w;
//
//	w = new idWinding(numPoints);
//	w.numPoints = this.numPoints;
//	memcpy(w.p, this.p, this.numPoints * sizeof(p[0]));
//	return w;
//}
//
/*
=============
idWinding::Reverse
=============
*/
	Reverse ( ): idWinding {
		var w: idWinding;
		var /*int */i: number;

		w = new idWinding( this.numPoints );
		w.numPoints = this.numPoints;
		for ( i = 0; i < this.numPoints; i++ ) {
			w.p[this.numPoints - i - 1] = this.p[i];
		}
		return w;
	}

///*
//=============
//idWinding::ReverseSelf
//=============
//*/
//void idWinding::ReverseSelf() {
//	idVec5 v;
//	int i;
//
//	for (i = 0; i < (this.numPoints >> 1); i++) {
//		v = this.p[i];
//		this.p[i] = this.p[this.numPoints - i - 1];
//		this.p[this.numPoints - i - 1] = v;
//	}
//}
//
///*
//=============
//idWinding::Check
//=============
//*/
//bool idWinding::Check(bool print) const {
//	int				i, j;
//	float			d, edgedist;
//	idVec3			dir, edgenormal;
//	float			area;
//	idPlane			plane;
//
//	if (numPoints < 3) {
//		if (print) {
//			idLib::common.Printf("idWinding::Check: only %i points.", this.numPoints);
//		}
//		return false;
//	}
//
//	area = GetArea();
//	if (area < 1.0f) {
//		if (print) {
//			idLib::common.Printf("idWinding::Check: tiny area: %f", area);
//		}
//		return false;
//	}
//
//	GetPlane(plane);
//
//	for (i = 0; i < this.numPoints; i++) {
//		const idVec3 &p1 = this.p[i].ToVec3();
//
//		// check if the winding is huge
//		for (j = 0; j < 3; j++) {
//			if (p1[j] >= MAX_WORLD_COORD || p1[j] <= MIN_WORLD_COORD) {
//				if (print) {
//					idLib::common.Printf("idWinding::Check: point %d outside world %c-axis: %f", i, 'X' + j, p1[j]);
//				}
//				return false;
//			}
//		}
//
//		j = i + 1 == this.numPoints ? 0 : i + 1;
//
//		// check if the point is on the face plane
//		d = p1 * plane.Normal() + plane[3];
//		if (d < -ON_EPSILON || d > ON_EPSILON) {
//			if (print) {
//				idLib::common.Printf("idWinding::Check: point %d off plane.", i);
//			}
//			return false;
//		}
//
//		// check if the edge isn't degenerate
//		const idVec3 &p2 = this.p[j].ToVec3();
//		dir = p2 - p1;
//
//		if (dir.Length() < ON_EPSILON) {
//			if (print) {
//				idLib::common.Printf("idWinding::Check: edge %d is degenerate.", i);
//			}
//			return false;
//		}
//
//		// check if the winding is convex
//		edgenormal = plane.Normal().Cross(dir);
//		edgenormal.Normalize();
//		edgedist = p1 * edgenormal;
//		edgedist += ON_EPSILON;
//
//		// all other points must be on front side
//		for (j = 0; j < this.numPoints; j++) {
//			if (j == i) {
//				continue;
//			}
//			d = this.p[j].ToVec3() * edgenormal;
//			if (d > edgedist) {
//				if (print) {
//					idLib::common.Printf("idWinding::Check: non-convex.");
//				}
//				return false;
//			}
//		}
//	}
//	return true;
//}
//
///*
//=============
//idWinding::GetArea
//=============
//*/
//float idWinding::GetArea() const {
//	int i;
//	idVec3 d1, d2, cross;
//	float total;
//
//	total = 0.0;
//	for (i = 2; i < this.numPoints; i++) {
//		d1 = this.p[i - 1].ToVec3() - this.p[0].ToVec3();
//		d2 = this.p[i].ToVec3() - this.p[0].ToVec3();
//		cross = d1.Cross(d2);
//		total += cross.Length();
//	}
//	return total * 0.5f;
//}
//
///*
//=============
//idWinding::GetRadius
//=============
//*/
//float idWinding::GetRadius(const idVec3 &center) const {
//	int i;
//	float radius, r;
//	idVec3 dir;
//
//	radius = 0.0;
//	for (i = 0; i < this.numPoints; i++) {
//		dir = this.p[i].ToVec3() - center;
//		r = dir * dir;
//		if (r > radius) {
//			radius = r;
//		}
//	}
//	return idMath::Sqrt(radius);
//}

/*
=============
idWinding::GetCenter
=============
*/
GetCenter() :idVec3{
	var/*int */i:number;
	var center = new idVec3 ;

	center.Zero();
	for (i = 0; i < this.numPoints; i++) {
		center.opAdditionAssignment( this.p[i].ToVec3 ( ) );
	}
	center.opMultiplicationAssignment( 1.0 / this.numPoints );
	return center;
}

///*
//=============
//idWinding::GetPlane
//=============
//*/
//void idWinding::GetPlane(idVec3 &normal, float &dist) const {
//	idVec3 v1, v2, center;
//
//	if (numPoints < 3) {
//		normal.Zero();
//		dist = 0.0;
//		return;
//	}
//
//	center = GetCenter();
//	v1 = this.p[0].ToVec3() - center;
//	v2 = this.p[1].ToVec3() - center;
//	normal = v2.Cross(v1);
//	normal.Normalize();
//	dist = this.p[0].ToVec3() * normal;
//}
//
/*
=============
idWinding::GetPlane
=============
*/
	GetPlane ( plane: idPlane ): void {
		var v1: idVec3, v2: idVec3;
		var center: idVec3;

		if ( this.numPoints < 3 ) {
			plane.Zero ( );
			return;
		}

		center = this.GetCenter ( );
		v1 = this.p[0].ToVec3 ( ).minus( center );
		v2 = this.p[1].ToVec3 ( ).minus( center );
		plane.SetNormal( v2.Cross( v1 ) );
		plane.Normalize ( );
		plane.FitThroughPoint( this.p[0].ToVec3 ( ) );
	}
//
///*
//=============
//idWinding::GetBounds
//=============
//*/
//void idWinding::GetBounds(idBounds &bounds) const {
//	int i;
//
//	if (!numPoints) {
//		bounds.Clear();
//		return;
//	}
//
//	bounds[0] = bounds[1] = this.p[0].ToVec3();
//	for (i = 1; i < this.numPoints; i++) {
//		if (p[i].x < bounds[0].x) {
//			bounds[0].x = this.p[i].x;
//		}
//		else if (p[i].x > bounds[1].x) {
//			bounds[1].x = this.p[i].x;
//		}
//		if (p[i].y < bounds[0].y) {
//			bounds[0].y = this.p[i].y;
//		}
//		else if (p[i].y > bounds[1].y) {
//			bounds[1].y = this.p[i].y;
//		}
//		if (p[i].z < bounds[0].z) {
//			bounds[0].z = this.p[i].z;
//		}
//		else if (p[i].z > bounds[1].z) {
//			bounds[1].z = this.p[i].z;
//		}
//	}
//}
//
///*
//=============
//idWinding::RemoveEqualPoints
//=============
//*/
//void idWinding::RemoveEqualPoints(const float epsilon) {
//	int i, j;
//
//	for (i = 0; i < this.numPoints; i++) {
//		if ((p[i].ToVec3() - this.p[(i + this.numPoints - 1) % this.numPoints].ToVec3()).LengthSqr() >= Square(epsilon)) {
//			continue;
//		}
//		this.numPoints--;
//		for (j = i; j < this.numPoints; j++) {
//			this.p[j] = this.p[j + 1];
//		}
//		i--;
//	}
//}
//
///*
//=============
//idWinding::RemoveColinearPoints
//=============
//*/
//void idWinding::RemoveColinearPoints(const idVec3 &normal, const float epsilon) {
//	int i, j;
//	idVec3 edgeNormal;
//	float dist;
//
//	if (numPoints <= 3) {
//		return;
//	}
//
//	for (i = 0; i < this.numPoints; i++) {
//
//		// create plane through edge orthogonal to winding plane
//		edgeNormal = (p[i].ToVec3() - this.p[(i + this.numPoints - 1) % this.numPoints].ToVec3()).Cross(normal);
//		edgeNormal.Normalize();
//		dist = edgeNormal * this.p[i].ToVec3();
//
//		if (idMath::Fabs(edgeNormal * this.p[(i + 1) % this.numPoints].ToVec3() - dist) > epsilon) {
//			continue;
//		}
//
//		this.numPoints--;
//		for (j = i; j < this.numPoints; j++) {
//			this.p[j] = this.p[j + 1];
//		}
//		i--;
//	}
//}
//
///*
//=============
//idWinding::AddToConvexHull
//
//Adds the given winding to the convex hull.
//Assumes the current winding already is a convex hull with three or more points.
//=============
//*/
//void idWinding::AddToConvexHull(const idWinding *winding, const idVec3 &normal, const float epsilon) {
//	int				i, j, k;
//	idVec3			dir;
//	float			d;
//	int				maxPts;
//	idVec3 *		hullDirs;
//	bool *			hullSide;
//	bool			outside;
//	int				numNewHullPoints;
//	idVec5 *		newHullPoints;
//
//	if (!winding) {
//		return;
//	}
//
//	maxPts = this.numPoints + winding.numPoints;
//
//	if (!this.EnsureAlloced(maxPts, true)) {
//		return;
//	}
//
//	newHullPoints = (idVec5 *)stack_alloc(maxPts * sizeof(idVec5));
//	hullDirs = (idVec3 *)stack_alloc(maxPts * sizeof(idVec3));
//	hullSide = (bool *)stack_alloc(maxPts * sizeof(bool));
//
//	for (i = 0; i < winding.numPoints; i++) {
//		const idVec5 &p1 = winding.p[i];
//
//		// calculate hull edge vectors
//		for (j = 0; j < this.numPoints; j++) {
//			dir = this.p[(j + 1) % this.numPoints].ToVec3() - this.p[j].ToVec3();
//			dir.Normalize();
//			hullDirs[j] = normal.Cross(dir);
//		}
//
//		// calculate side for each hull edge
//		outside = false;
//		for (j = 0; j < this.numPoints; j++) {
//			dir = p1.ToVec3() - this.p[j].ToVec3();
//			d = dir * hullDirs[j];
//			if (d >= epsilon) {
//				outside = true;
//			}
//			if (d >= -epsilon) {
//				hullSide[j] = true;
//			}
//			else {
//				hullSide[j] = false;
//			}
//		}
//
//		// if the point is effectively inside, do nothing
//		if (!outside) {
//			continue;
//		}
//
//		// find the back side to front side transition
//		for (j = 0; j < this.numPoints; j++) {
//			if (!hullSide[j] && hullSide[(j + 1) % this.numPoints]) {
//				break;
//			}
//		}
//		if (j >= this.numPoints) {
//			continue;
//		}
//
//		// insert the point here
//		newHullPoints[0] = p1;
//		numNewHullPoints = 1;
//
//		// copy over all points that aren't double fronts
//		j = (j + 1) % this.numPoints;
//		for (k = 0; k < this.numPoints; k++) {
//			if (hullSide[(j + k) % this.numPoints] && hullSide[(j + k + 1) % this.numPoints]) {
//				continue;
//			}
//			newHullPoints[numNewHullPoints] = this.p[(j + k + 1) % this.numPoints];
//			numNewHullPoints++;
//		}
//
//		this.numPoints = numNewHullPoints;
//		memcpy(this.p, newHullPoints, numNewHullPoints * sizeof(idVec5));
//	}
//}
//
///*
//=============
//idWinding::AddToConvexHull
//
//Add a point to the convex hull.
//The current winding must be convex but may be degenerate and can have less than three points.
//=============
//*/
//void idWinding::AddToConvexHull(const idVec3 &point, const idVec3 &normal, const float epsilon) {
//	int				j, k, numHullPoints;
//	idVec3			dir;
//	float			d;
//	idVec3 *		hullDirs;
//	bool *			hullSide;
//	idVec5 *		hullPoints;
//	bool			outside;
//
//	switch (numPoints) {
//	case 0: {
//				this.p[0] = point;
//				this.numPoints++;
//				return;
//	}
//	case 1: {
//				// don't add the same point second
//				if (p[0].ToVec3().Compare(point, epsilon)) {
//					return;
//				}
//				this.p[1].ToVec3() = point;
//				this.numPoints++;
//				return;
//	}
//	case 2: {
//				// don't add a point if it already exists
//				if (p[0].ToVec3().Compare(point, epsilon) || this.p[1].ToVec3().Compare(point, epsilon)) {
//					return;
//				}
//				// if only two points make sure we have the right ordering according to the normal
//				dir = point - this.p[0].ToVec3();
//				dir = dir.Cross(p[1].ToVec3() - this.p[0].ToVec3());
//				if (dir[0] == 0.0 && dir[1] == 0.0 && dir[2] == 0.0) {
//					// points don't make a plane
//					return;
//				}
//				if (dir * normal > 0.0) {
//					this.p[2].ToVec3() = point;
//				}
//				else {
//					this.p[2] = this.p[1];
//					this.p[1].ToVec3() = point;
//				}
//				this.numPoints++;
//				return;
//	}
//	}
//
//	hullDirs = (idVec3 *)stack_alloc(numPoints * sizeof(idVec3));
//	hullSide = (bool *)stack_alloc(numPoints * sizeof(bool));
//
//	// calculate hull edge vectors
//	for (j = 0; j < this.numPoints; j++) {
//		dir = this.p[(j + 1) % this.numPoints].ToVec3() - this.p[j].ToVec3();
//		hullDirs[j] = normal.Cross(dir);
//	}
//
//	// calculate side for each hull edge
//	outside = false;
//	for (j = 0; j < this.numPoints; j++) {
//		dir = point - this.p[j].ToVec3();
//		d = dir * hullDirs[j];
//		if (d >= epsilon) {
//			outside = true;
//		}
//		if (d >= -epsilon) {
//			hullSide[j] = true;
//		}
//		else {
//			hullSide[j] = false;
//		}
//	}
//
//	// if the point is effectively inside, do nothing
//	if (!outside) {
//		return;
//	}
//
//	// find the back side to front side transition
//	for (j = 0; j < this.numPoints; j++) {
//		if (!hullSide[j] && hullSide[(j + 1) % this.numPoints]) {
//			break;
//		}
//	}
//	if (j >= this.numPoints) {
//		return;
//	}
//
//	hullPoints = (idVec5 *)stack_alloc((numPoints + 1) * sizeof(idVec5));
//
//	// insert the point here
//	hullPoints[0] = point;
//	numHullPoints = 1;
//
//	// copy over all points that aren't double fronts
//	j = (j + 1) % this.numPoints;
//	for (k = 0; k < this.numPoints; k++) {
//		if (hullSide[(j + k) % this.numPoints] && hullSide[(j + k + 1) % this.numPoints]) {
//			continue;
//		}
//		hullPoints[numHullPoints] = this.p[(j + k + 1) % this.numPoints];
//		numHullPoints++;
//	}
//
//	if (!EnsureAlloced(numHullPoints, false)) {
//		return;
//	}
//	this.numPoints = numHullPoints;
//	memcpy(p, hullPoints, numHullPoints * sizeof(idVec5));
//}
//
///*
//=============
//idWinding::TryMerge
//=============
//*/
//#define	CONTINUOUS_EPSILON	0.005f
//
//idWinding *idWinding::TryMerge(const idWinding &w, const idVec3 &planenormal, int keep) const {
//	idVec3			*p1, *p2, *p3, *p4, *back;
//	idWinding		*newf;
//	const idWinding	*f1, *f2;
//	int				i, j, k, l;
//	idVec3			normal, delta;
//	float			dot;
//	bool			keep1, keep2;
//
//	f1 = this;
//	f2 = &w;
//	//
//	// find a idLib::common edge
//	//	
//	p1 = p2 = NULL;	// stop compiler warning
//	j = 0;
//
//	for (i = 0; i < f1.numPoints; i++) {
//		p1 = &f1.p[i].ToVec3();
//		p2 = &f1.p[(i + 1) % f1.numPoints].ToVec3();
//		for (j = 0; j < f2.numPoints; j++) {
//			p3 = &f2.p[j].ToVec3();
//			p4 = &f2.p[(j + 1) % f2.numPoints].ToVec3();
//			for (k = 0; k < 3; k++) {
//				if (idMath::Fabs((*p1)[k] - (*p4)[k]) > 0.1f) {
//					break;
//				}
//				if (idMath::Fabs((*p2)[k] - (*p3)[k]) > 0.1f) {
//					break;
//				}
//			}
//			if (k == 3) {
//				break;
//			}
//		}
//		if (j < f2.numPoints) {
//			break;
//		}
//	}
//
//	if (i == f1.numPoints) {
//		return NULL;			// no matching edges
//	}
//
//	//
//	// check slope of connected lines
//	// if the slopes are colinear, the point can be removed
//	//
//	back = &f1.p[(i + f1.numPoints - 1) % f1.numPoints].ToVec3();
//	delta = (*p1) - (*back);
//	normal = planenormal.Cross(delta);
//	normal.Normalize();
//
//	back = &f2.p[(j + 2) % f2.numPoints].ToVec3();
//	delta = (*back) - (*p1);
//	dot = delta * normal;
//	if (dot > CONTINUOUS_EPSILON) {
//		return NULL;			// not a convex polygon
//	}
//
//	keep1 = (bool)(dot < -CONTINUOUS_EPSILON);
//
//	back = &f1.p[(i + 2) % f1.numPoints].ToVec3();
//	delta = (*back) - (*p2);
//	normal = planenormal.Cross(delta);
//	normal.Normalize();
//
//	back = &f2.p[(j + f2.numPoints - 1) % f2.numPoints].ToVec3();
//	delta = (*back) - (*p2);
//	dot = delta * normal;
//	if (dot > CONTINUOUS_EPSILON) {
//		return NULL;			// not a convex polygon
//	}
//
//	keep2 = (bool)(dot < -CONTINUOUS_EPSILON);
//
//	//
//	// build the new polygon
//	//
//	newf = new idWinding(f1.numPoints + f2.numPoints);
//
//	// copy first polygon
//	for (k = (i + 1) % f1.numPoints; k != i; k = (k + 1) % f1.numPoints) {
//		if (!keep && k == (i + 1) % f1.numPoints && !keep2) {
//			continue;
//		}
//
//		newf.p[newf.numPoints] = f1.p[k];
//		newf.numPoints++;
//	}
//
//	// copy second polygon
//	for (l = (j + 1) % f2.numPoints; l != j; l = (l + 1) % f2.numPoints) {
//		if (!keep && l == (j + 1) % f2.numPoints && !keep1) {
//			continue;
//		}
//		newf.p[newf.numPoints] = f2.p[l];
//		newf.numPoints++;
//	}
//
//	return newf;
//}
//
///*
//=============
//idWinding::RemovePoint
//=============
//*/
//void idWinding::RemovePoint(int point) {
//	if (point < 0 || point >= this.numPoints) {
//		idLib::common.FatalError("idWinding::removePoint: point out of range");
//	}
//	if (point < this.numPoints - 1) {
//		memmove(&p[point], &p[point + 1], (numPoints - point - 1) * sizeof(p[0]));
//	}
//	this.numPoints--;
//}
//
///*
//=============
//idWinding::InsertPoint
//=============
//*/
//void idWinding::InsertPoint(const idVec3 &point, int spot) {
//	int i;
//
//	if (spot > this.numPoints) {
//		idLib::common.FatalError("idWinding::insertPoint: spot > this.numPoints");
//	}
//
//	if (spot < 0) {
//		idLib::common.FatalError("idWinding::insertPoint: spot < 0");
//	}
//
//	EnsureAlloced(numPoints + 1, true);
//	for (i = this.numPoints; i > spot; i--) {
//		this.p[i] = this.p[i - 1];
//	}
//	this.p[spot] = point;
//	this.numPoints++;
//}
//
///*
//=============
//idWinding::InsertPointIfOnEdge
//=============
//*/
//bool idWinding::InsertPointIfOnEdge(const idVec3 &point, const idPlane &plane, const float epsilon) {
//	int i;
//	float dist, dot;
//	idVec3 normal;
//
//	// point may not be too far from the winding plane
//	if (idMath::Fabs(plane.Distance(point)) > epsilon) {
//		return false;
//	}
//
//	for (i = 0; i < this.numPoints; i++) {
//
//		// create plane through edge orthogonal to winding plane
//		normal = (p[(i + 1) % this.numPoints].ToVec3() - this.p[i].ToVec3()).Cross(plane.Normal());
//		normal.Normalize();
//		dist = normal * this.p[i].ToVec3();
//
//		if (idMath::Fabs(normal * point - dist) > epsilon) {
//			continue;
//		}
//
//		normal = plane.Normal().Cross(normal);
//		dot = normal * point;
//
//		dist = dot - normal * this.p[i].ToVec3();
//
//		if (dist < epsilon) {
//			// if the winding already has the point
//			if (dist > -epsilon) {
//				return false;
//			}
//			continue;
//		}
//
//		dist = dot - normal * this.p[(i + 1) % this.numPoints].ToVec3();
//
//		if (dist > -epsilon) {
//			// if the winding already has the point
//			if (dist < epsilon) {
//				return false;
//			}
//			continue;
//		}
//
//		InsertPoint(point, i + 1);
//		return true;
//	}
//	return false;
//}
//
///*
//=============
//idWinding::IsTiny
//=============
//*/
//#define	EDGE_LENGTH		0.2f
//
//bool idWinding::IsTiny() const {
//	int		i;
//	float	len;
//	idVec3	delta;
//	int		edges;
//
//	edges = 0;
//	for (i = 0; i < this.numPoints; i++) {
//		delta = this.p[(i + 1) % this.numPoints].ToVec3() - this.p[i].ToVec3();
//		len = delta.Length();
//		if (len > EDGE_LENGTH) {
//			if (++edges == 3) {
//				return false;
//			}
//		}
//	}
//	return true;
//}
//
///*
//=============
//idWinding::IsHuge
//=============
//*/
//bool idWinding::IsHuge() const {
//	int i, j;
//
//	for (i = 0; i < this.numPoints; i++) {
//		for (j = 0; j < 3; j++) {
//			if (p[i][j] <= MIN_WORLD_COORD || this.p[i][j] >= MAX_WORLD_COORD) {
//				return true;
//			}
//		}
//	}
//	return false;
//}
//
///*
//=============
//idWinding::Print
//=============
//*/
//void idWinding::Print() const {
//	int i;
//
//	for (i = 0; i < this.numPoints; i++) {
//		idLib::common.Printf("(%5.1f, %5.1f, %5.1f)\n", this.p[i][0], this.p[i][1], this.p[i][2]);
//	}
//}
//
///*
//=============
//idWinding::PlaneDistance
//=============
//*/
//float idWinding::PlaneDistance(const idPlane &plane) const {
//	int		i;
//	float	d, min, max;
//
//	min = idMath::INFINITY;
//	max = -min;
//	for (i = 0; i < this.numPoints; i++) {
//		d = plane.Distance(p[i].ToVec3());
//		if (d < min) {
//			min = d;
//			if (FLOATSIGNBITSET(min) & FLOATSIGNBITNOTSET(max)) {
//				return 0.0;
//			}
//		}
//		if (d > max) {
//			max = d;
//			if (FLOATSIGNBITSET(min) & FLOATSIGNBITNOTSET(max)) {
//				return 0.0;
//			}
//		}
//	}
//	if (FLOATSIGNBITNOTSET(min)) {
//		return min;
//	}
//	if (FLOATSIGNBITSET(max)) {
//		return max;
//	}
//	return 0.0;
//}
//
///*
//=============
//idWinding::PlaneSide
//=============
//*/
//int idWinding::PlaneSide(const idPlane &plane, const float epsilon) const {
//	bool	front, back;
//	int		i;
//	float	d;
//
//	front = false;
//	back = false;
//	for (i = 0; i < this.numPoints; i++) {
//		d = plane.Distance(p[i].ToVec3());
//		if (d < -epsilon) {
//			if (front) {
//				return SIDE_CROSS;
//			}
//			back = true;
//			continue;
//		}
//		else if (d > epsilon) {
//			if (back) {
//				return SIDE_CROSS;
//			}
//			front = true;
//			continue;
//		}
//	}
//
//	if (back) {
//		return SIDE_BACK;
//	}
//	if (front) {
//		return SIDE_FRONT;
//	}
//	return SIDE_ON;
//}
//
///*
//=============
//idWinding::PlanesConcave
//=============
//*/
//#define WCONVEX_EPSILON		0.2f
//
//bool idWinding::PlanesConcave(const idWinding &w2, const idVec3 &normal1, const idVec3 &normal2, float dist1, float dist2) const {
//	int i;
//
//	// check if one of the points of winding 1 is at the back of the plane of winding 2
//	for (i = 0; i < this.numPoints; i++) {
//		if (normal2 * this.p[i].ToVec3() - dist2 > WCONVEX_EPSILON) {
//			return true;
//		}
//	}
//	// check if one of the points of winding 2 is at the back of the plane of winding 1
//	for (i = 0; i < w2.numPoints; i++) {
//		if (normal1 * w2.p[i].ToVec3() - dist1 > WCONVEX_EPSILON) {
//			return true;
//		}
//	}
//
//	return false;
//}
//
///*
//=============
//idWinding::PointInside
//=============
//*/
//bool idWinding::PointInside(const idVec3 &normal, const idVec3 &point, const float epsilon) const {
//	int i;
//	idVec3 dir, n, pointvec;
//
//	for (i = 0; i < this.numPoints; i++) {
//		dir = this.p[(i + 1) % this.numPoints].ToVec3() - this.p[i].ToVec3();
//		pointvec = point - this.p[i].ToVec3();
//
//		n = dir.Cross(normal);
//
//		if (pointvec * n < -epsilon) {
//			return false;
//		}
//	}
//	return true;
//}
//
///*
//=============
//idWinding::LineIntersection
//=============
//*/
//bool idWinding::LineIntersection(const idPlane &windingPlane, start:idVec3, end:idVec3, bool backFaceCull) const {
//	float front, back, frac;
//	idVec3 mid;
//
//	front = windingPlane.Distance(start);
//	back = windingPlane.Distance(end);
//
//	// if both points at the same side of the plane
//	if (front < 0.0 && back < 0.0) {
//		return false;
//	}
//
//	if (front > 0.0 && back > 0.0) {
//		return false;
//	}
//
//	// if back face culled
//	if (backFaceCull && front < 0.0) {
//		return false;
//	}
//
//	// get point of intersection with winding plane
//	if (idMath::Fabs(front - back) < 0.0001f) {
//		mid = end;
//	}
//	else {
//		frac = front / (front - back);
//		mid[0] = start[0] + (end[0] - start[0]) * frac;
//		mid[1] = start[1] + (end[1] - start[1]) * frac;
//		mid[2] = start[2] + (end[2] - start[2]) * frac;
//	}
//
//	return PointInside(windingPlane.Normal(), mid, 0.0);
//}
//
///*
//=============
//idWinding::RayIntersection
//=============
//*/
//bool idWinding::RayIntersection(const idPlane &windingPlane, start:idVec3, const idVec3 &dir, float &scale, bool backFaceCull) const {
//	int i;
//	bool side, lastside = false;
//	idPluecker pl1, pl2;
//
//	scale = 0.0;
//	pl1.FromRay(start, dir);
//	for (i = 0; i < this.numPoints; i++) {
//		pl2.FromLine(p[i].ToVec3(), this.p[(i + 1) % this.numPoints].ToVec3());
//		side = pl1.PermutedInnerProduct(pl2) > 0.0;
//		if (i && side != lastside) {
//			return false;
//		}
//		lastside = side;
//	}
//	if (!backFaceCull || lastside) {
//		windingPlane.RayIntersection(start, dir, scale);
//		return true;
//	}
//	return false;
//}

/*
=================
idWinding::TriangleArea
=================
*/
	static /*float */TriangleArea ( a: idVec3, b: idVec3, c: idVec3 ): number {
		var v1: idVec3, v2: idVec3;
		var cross: idVec3;
		v1 = b. /*-*/minus( a );
		v2 = c. /*-*/minus( a );
		cross = v1.Cross( v2 );
		return 0.5 * cross.Length ( );
	}
}

//===============================================================
//
//	idFixedWinding
//
//===============================================================



/*
===============================================================================

	idFixedWinding is a fixed buffer size winding not using
	memory allocations.

	When an operation would overflow the fixed buffer a warning
	is printed and the operation is safely cancelled.

===============================================================================
*/

var MAX_POINTS_ON_WINDING = 64;

class idFixedWinding extends idWinding {
/*
=============
idFixedWinding::ReAllocate
=============
*/
	ReAllocate ( /*int*/ n: number, /*bool */keep: boolean ): boolean {

		assert( n <= MAX_POINTS_ON_WINDING );

		if ( n > MAX_POINTS_ON_WINDING ) {
			common.Printf( "WARNING: idFixedWinding . MAX_POINTS_ON_WINDING overflowed\n" );
			return false;
		}
		return true;
	}

///*
//=============
//idFixedWinding::Split
//=============
//*/
//int idFixedWinding::Split(idFixedWinding *back, const idPlane &plane, const float epsilon) {
//	int		counts[3];
//	float	dists[MAX_POINTS_ON_WINDING + 4];
//	byte	sides[MAX_POINTS_ON_WINDING + 4];
//	float	dot;
//	int		i, j;
//	idVec5 *p1, *p2;
//	idVec5	mid;
//	idFixedWinding out;
//
//	counts[SIDE_FRONT] = counts[SIDE_BACK] = counts[SIDE_ON] = 0;
//
//	// determine sides for each point
//	for (i = 0; i < this.numPoints; i++) {
//		dists[i] = dot = plane.Distance(p[i].ToVec3());
//		if (dot > epsilon) {
//			sides[i] = SIDE_FRONT;
//		}
//		else if (dot < -epsilon) {
//			sides[i] = SIDE_BACK;
//		}
//		else {
//			sides[i] = SIDE_ON;
//		}
//		counts[sides[i]]++;
//	}
//
//	if (!counts[SIDE_BACK]) {
//		if (!counts[SIDE_FRONT]) {
//			return SIDE_ON;
//		}
//		else {
//			return SIDE_FRONT;
//		}
//	}
//
//	if (!counts[SIDE_FRONT]) {
//		return SIDE_BACK;
//	}
//
//	sides[i] = sides[0];
//	dists[i] = dists[0];
//
//	out.numPoints = 0;
//	back.numPoints = 0;
//
//	for (i = 0; i < this.numPoints; i++) {
//		p1 = &p[i];
//
//		if (!out.EnsureAlloced(out.numPoints + 1, true)) {
//			return SIDE_FRONT;		// can't split -- fall back to original
//		}
//		if (!back.EnsureAlloced(back.numPoints + 1, true)) {
//			return SIDE_FRONT;		// can't split -- fall back to original
//		}
//
//		if (sides[i] == SIDE_ON) {
//			out.p[out.numPoints] = *p1;
//			out.numPoints++;
//			back.p[back.numPoints] = *p1;
//			back.numPoints++;
//			continue;
//		}
//
//		if (sides[i] == SIDE_FRONT) {
//			out.p[out.numPoints] = *p1;
//			out.numPoints++;
//		}
//		if (sides[i] == SIDE_BACK) {
//			back.p[back.numPoints] = *p1;
//			back.numPoints++;
//		}
//
//		if (sides[i + 1] == SIDE_ON || sides[i + 1] == sides[i]) {
//			continue;
//		}
//
//		if (!out.EnsureAlloced(out.numPoints + 1, true)) {
//			return SIDE_FRONT;		// can't split -- fall back to original
//		}
//
//		if (!back.EnsureAlloced(back.numPoints + 1, true)) {
//			return SIDE_FRONT;		// can't split -- fall back to original
//		}
//
//		// generate a split point
//		j = i + 1;
//		if (j >= this.numPoints) {
//			p2 = &p[0];
//		}
//		else {
//			p2 = &p[j];
//		}
//
//		dot = dists[i] / (dists[i] - dists[i + 1]);
//		for (j = 0; j < 3; j++) {
//			// avoid round off error when possible
//			if (plane.Normal()[j] == 1.0f) {
//				mid[j] = plane.Dist();
//			}
//			else if (plane.Normal()[j] == -1.0f) {
//				mid[j] = -plane.Dist();
//			}
//			else {
//				mid[j] = (*p1)[j] + dot * ((*p2)[j] - (*p1)[j]);
//			}
//		}
//		mid.s = p1.s + dot * (p2.s - p1.s);
//		mid.t = p1.t + dot * (p2.t - p1.t);
//
//		out.p[out.numPoints] = mid;
//		out.numPoints++;
//		back.p[back.numPoints] = mid;
//		back.numPoints++;
//	}
//	for (i = 0; i < out.numPoints; i++) {
//		this.p[i] = out.p[i];
//	}
//	this.numPoints = out.numPoints;
//
//	return SIDE_CROSS;
//}
//
//
//public:
//					idFixedWinding( );
//					explicit idFixedWinding( const int n );
//					explicit idFixedWinding( const idVec3 *verts, const int n );
//					explicit idFixedWinding( const idVec3 &normal, const float dist );
//					explicit idFixedWinding( const idPlane &plane );
//					explicit idFixedWinding( const idWinding &winding );
//					explicit idFixedWinding( const idFixedWinding &winding );
//	virtual			~idFixedWinding( );
//
//	idFixedWinding &operator=( const idWinding &winding );
//
//	virtual void	Clear( );
//
//					// splits the winding in a back and front part, 'this' becomes the front part
//					// returns a SIDE_?
//	int				Split( idFixedWinding *back, const idPlane &plane, const float epsilon = ON_EPSILON );
//
//protected:
//	idVec5			data[MAX_POINTS_ON_WINDING];	// point data
//
//	virtual bool	ReAllocate( int n, bool keep = false );
//};
//
//ID_INLINE idFixedWinding::idFixedWinding( ) {
//	this.numPoints = 0;
//	this.p = data;
//	this.allocedSize = MAX_POINTS_ON_WINDING;
//}
//
//ID_INLINE idFixedWinding::idFixedWinding( int n ) {
//	this.numPoints = 0;
//	this.p = data;
//	this.allocedSize = MAX_POINTS_ON_WINDING;
//}
//
//ID_INLINE idFixedWinding::idFixedWinding( const idVec3 *verts, const int n ) {
//	int i;
//
//	this.numPoints = 0;
//	this.p = data;
//	this.allocedSize = MAX_POINTS_ON_WINDING;
//	if ( !EnsureAlloced( n ) ) {
//		this.numPoints = 0;
//		return;
//	}
//	for ( i = 0; i < n; i++ ) {
//		this.p[i].ToVec3() = verts[i];
//		this.p[i].s = this.p[i].t = 0;
//	}
//	this.numPoints = n;
//}
//
//ID_INLINE idFixedWinding::idFixedWinding( const idVec3 &normal, const float dist ) {
//	this.numPoints = 0;
//	this.p = data;
//	this.allocedSize = MAX_POINTS_ON_WINDING;
//	BaseForPlane( normal, dist );
//}
//
//ID_INLINE idFixedWinding::idFixedWinding( const idPlane &plane ) {
//	this.numPoints = 0;
//	this.p = data;
//	this.allocedSize = MAX_POINTS_ON_WINDING;
//	BaseForPlane( plane );
//}
//
//ID_INLINE idFixedWinding::idFixedWinding( const idWinding &winding ) {
//	int i;
//
//	this.p = data;
//	this.allocedSize = MAX_POINTS_ON_WINDING;
//	if ( !EnsureAlloced( winding.GetNumPoints() ) ) {
//		this.numPoints = 0;
//		return;
//	}
//	for ( i = 0; i < winding.GetNumPoints(); i++ ) {
//		this.p[i] = winding[i];
//	}
//	this.numPoints = winding.GetNumPoints();
//}
//
//ID_INLINE idFixedWinding::idFixedWinding( const idFixedWinding &winding ) {
//	int i;
//
//	this.p = data;
//	this.allocedSize = MAX_POINTS_ON_WINDING;
//	if ( !EnsureAlloced( winding.GetNumPoints() ) ) {
//		this.numPoints = 0;
//		return;
//	}
//	for ( i = 0; i < winding.GetNumPoints(); i++ ) {
//		this.p[i] = winding[i];
//	}
//	this.numPoints = winding.GetNumPoints();
//}
//
//ID_INLINE idFixedWinding::~idFixedWinding( ) {
//	this.p = NULL;	// otherwise it tries to free the fixed buffer
//}
//
//ID_INLINE idFixedWinding &idFixedWinding::operator=( const idWinding &winding ) {
//	int i;
//
//	if ( !EnsureAlloced( winding.GetNumPoints() ) ) {
//		this.numPoints = 0;
//		return *this;
//	}
//	for ( i = 0; i < winding.GetNumPoints(); i++ ) {
//		this.p[i] = winding[i];
//	}
//	this.numPoints = winding.GetNumPoints();
//	return *this;
//}
//
	Clear ( ): void {
		this.numPoints = 0;
	}
}

//#endif	/* !__WINDING_H__ */


Object.defineProperty( idWinding.prototype, "0", {
	get: function ( ): number {
		return this.p[0];
	},
	set: function ( value: number ): void {
		todoThrow ( );
	},
	enumerable: false,
	configurable: false
} );

Object.defineProperty( idWinding.prototype, "1", {
	get: function ( ): number {
		return this.p[1];
	},
	set: function ( value: number ): void {
		todoThrow ( );
	},
	enumerable: false,
	configurable: false
} );

Object.defineProperty( idWinding.prototype, "2", {
	get: function ( ): number {
		return this.p[2];
	},
	set: function ( value: number ): void {
		todoThrow ( );
	},
	enumerable: false,
	configurable: false
} );

Object.defineProperty( idWinding.prototype, "3", {
	get: function ( ): number {
		return this.p[3];
	},
	set: function ( value: number ): void {
		todoThrow ( );
	},
	enumerable: false,
	configurable: false
} );

Object.defineProperty( idWinding.prototype, "4", {
	get: function ( ): number {
		return this.p[4];
	},
	set: function ( value: number ): void {
		todoThrow ( );
	},
	enumerable: false,
	configurable: false
} );