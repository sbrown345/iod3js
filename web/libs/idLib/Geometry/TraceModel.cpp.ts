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
////#include "../../idlib/precompiled.h"
////#pragma hdrstop
////
////#include "TraceModel.h"
////
////#ifndef __TRACEMODEL_H__
////#define __TRACEMODEL_H__
////
/////*
////===============================================================================
////
////A trace model is an arbitrary polygonal model which is used by the
////collision detection system to find collisions, contacts or the contents
////of a volume. For collision detection speed reasons the number of vertices
////and edges are limited. The trace model can have any shape. However convex
////models are usually preferred.
////
////===============================================================================
////*/
////
////class idVec3;
////class idMat3;
////class idBounds;

// trace model type
enum traceModel_t{
	TRM_INVALID,		// invalid trm
	TRM_BOX,			// box
	TRM_OCTAHEDRON,		// octahedron
	TRM_DODECAHEDRON,	// dodecahedron
	TRM_CYLINDER,		// cylinder approximation
	TRM_CONE,			// cone approximation
	TRM_BONE,			// two tetrahedrons attached to each other
	TRM_POLYGON,		// arbitrary convex polygon
	TRM_POLYGONVOLUME,	// volume for arbitrary convex polygon
	TRM_CUSTOM			// loaded from map model or ASE/LWO
};

// these are bit cache limits
var MAX_TRACEMODEL_VERTS		= 32
var MAX_TRACEMODEL_EDGES		= 32
var MAX_TRACEMODEL_POLYS		= 16
var MAX_TRACEMODEL_POLYEDGES	= 16

//var traceModelVert_t = idVec3;

class traceModelEdge_t {
	v = new Int32Array(2);
	normal = new idVec3;
}

class traceModelPoly_t {
	normal = new idVec3;
	dist: number /*float*/
	bounds = new idBounds;
	numEdges: number /*int*/;
	edges = new Int32Array( MAX_TRACEMODEL_POLYEDGES );
}

class idTraceModel {
////
////public:
	type: traceModel_t;
	numVerts: number /*int*/;
	verts = newStructArray<idVec3 /*traceModelVert_t*/>( idVec3, MAX_TRACEMODEL_VERTS );
	numEdges: number /*int*/;
	edges = newStructArray<traceModelEdge_t>( traceModelEdge_t, MAX_TRACEMODEL_EDGES + 1 );
	numPolys: number /*int*/;
	polys = newStructArray<traceModelPoly_t>( traceModelPoly_t, MAX_TRACEMODEL_POLYS );
	offset = new idVec3; // offset to center of model
	bounds = new idBounds; // bounds of model
	isConvex: boolean; // true when model is convex
////
////public:
////	idTraceModel( );
////	// axial bounding box
////	idTraceModel(const idBounds &boxBounds);
////	// cylinder approximation
////	idTraceModel(const idBounds &cylBounds, const int numSides);
////	// bone
////	idTraceModel(const float length, const float width);
////
////	// axial box
////	void				SetupBox(const idBounds &boxBounds);
////	void				SetupBox(const float size);
////	// octahedron
////	void				SetupOctahedron(const idBounds &octBounds);
////	void				SetupOctahedron(const float size);
////	// dodecahedron
////	void				SetupDodecahedron(const idBounds &dodBounds);
////	void				SetupDodecahedron(const float size);
////	// cylinder approximation
////	void				SetupCylinder(const idBounds &cylBounds, const int numSides);
////	void				SetupCylinder(const float height, const float width, const int numSides);
////	// cone approximation
////	void				SetupCone(const idBounds &coneBounds, const int numSides);
////	void				SetupCone(const float height, const float width, const int numSides);
////	// two tetrahedrons attached to each other
////	void				SetupBone(const float length, const float width);
////	// arbitrary convex polygon
////	void				SetupPolygon(const idVec3 *v, const int count);
////	void				SetupPolygon(const idWinding &w);
////	// generate edge normals
////	int					GenerateEdgeNormals( );
////	// translate the trm
////	void				Translate(const idVec3 &translation);
////	// rotate the trm
////	void				Rotate(const idMat3 &rotation);
////	// shrink the model m units on all sides
////	void				Shrink(const float m);
////	// compare
////	bool				Compare(const idTraceModel &trm) const;
////	bool				operator==(const idTraceModel &trm) const;
////	bool				operator!=(const idTraceModel &trm) const;
////	// get the area of one of the polygons
////	float				GetPolygonArea(int polyNum) const;
////	// get the silhouette edges
////	int					GetProjectionSilhouetteEdges(const idVec3 &projectionOrigin, int silEdges[MAX_TRACEMODEL_EDGES]) const;
////	int					GetParallelProjectionSilhouetteEdges(const idVec3 &projectionDir, int silEdges[MAX_TRACEMODEL_EDGES]) const;
////	// calculate mass properties assuming an uniform density
////	void				GetMassProperties(const float density, float &mass, idVec3 &centerOfMass, idMat3 &inertiaTensor) const;
////
////private:
////	void				InitBox( );
////	void				InitOctahedron( );
////	void				InitDodecahedron( );
////	void				InitBone( );
////
////	void				ProjectionIntegrals(int polyNum, int a, int b, struct projectionIntegrals_s &integrals) const;
////	void				PolygonIntegrals(int polyNum, int a, int b, int c, struct polygonIntegrals_s &integrals) const;
////	void				VolumeIntegrals(struct volumeIntegrals_s &integrals) const;
////	void				VolumeFromPolygon(idTraceModel &trm, float thickness) const;
////	int					GetOrderedSilhouetteEdges(const int edgeIsSilEdge[MAX_TRACEMODEL_EDGES + 1], int silEdges[MAX_TRACEMODEL_EDGES]) const;
////};
////


	constructor ( );
	constructor ( boxBounds: idBounds );
	constructor ( a1?: any ) {
		if ( arguments.length == 0 ) {
			this.constructor_default ( );
		} else if ( arguments.length == 1 ) {
			this.constructor_bounds( a1 );
		} else {
			todoThrow ( );
		}
	}

	constructor_default ( ): void {
		this.type = traceModel_t.TRM_INVALID;
		this.numVerts = this.numEdges = this.numPolys = 0;
		this.bounds.Zero ( );
	}

	constructor_bounds ( boxBounds: idBounds ): void {
		this.InitBox ( );
		this.SetupBox( boxBounds );
	}
////
////ID_INLINE idTraceModel::idTraceModel(const idBounds &cylBounds, const int numSides) {
////	SetupCylinder(cylBounds, numSides);
////}
////
////ID_INLINE idTraceModel::idTraceModel(const float length, const float width) {
////	InitBone();
////	SetupBone(length, width);
////}
////
////ID_INLINE bool idTraceModel::operator==(const idTraceModel &trm) const {
////	return Compare(trm);
////}
////
////ID_INLINE bool idTraceModel::operator!=(const idTraceModel &trm) const {
////	return !Compare(trm);
////}
////
////#endif /* !__TRACEMODEL_H__ */
////
////

/*
============
idTraceModel::SetupBox
============
*/
	SetupBox ( boxBounds: idBounds ): void {
		var /*int */i: number;

		if ( this.type != traceModel_t.TRM_BOX ) {
			this.InitBox ( );
		}
		// offset to center
		this.offset.opEquals( ( boxBounds[0].opAddition( boxBounds[1] ) ).timesFloat( 0.5 ) );
		// set box vertices
		for ( i = 0; i < 8; i++ ) {
			this.verts[i][0] = boxBounds[( i ^ ( i >> 1 ) ) & 1][0];
			this.verts[i][1] = boxBounds[( i >> 1 ) & 1][1];
			this.verts[i][2] = boxBounds[( i >> 2 ) & 1][2];
		}
		// set polygon plane distances
		this.polys[0].dist = -boxBounds[0][2];
		this.polys[1].dist = boxBounds[1][2];
		this.polys[2].dist = -boxBounds[0][1];
		this.polys[3].dist = boxBounds[1][0];
		this.polys[4].dist = boxBounds[1][1];
		this.polys[5].dist = -boxBounds[0][0];
		// set polygon bounds
		for ( i = 0; i < 6; i++ ) {
			this.polys[i].bounds.opEquals( boxBounds );
		}
		this.polys[0].bounds[1][2] = boxBounds[0][2];
		this.polys[1].bounds[0][2] = boxBounds[1][2];
		this.polys[2].bounds[1][1] = boxBounds[0][1];
		this.polys[3].bounds[0][0] = boxBounds[1][0];
		this.polys[4].bounds[0][1] = boxBounds[1][1];
		this.polys[5].bounds[1][0] = boxBounds[0][0];

		this.bounds.opEquals( boxBounds );
	}

/////*
////============
////idTraceModel::SetupBox
////
////  The origin is placed at the center of the cube.
////============
////*/
////void idTraceModel::SetupBox( const float size ) {
////	idBounds boxBounds;
////	float halfSize;
////
////	halfSize = size * 0.5;
////	boxBounds[0].Set( -halfSize, -halfSize, -halfSize );
////	boxBounds[1].Set( halfSize, halfSize, halfSize );
////	SetupBox( boxBounds );
////}

/*
============
idTraceModel::InitBox

  Initialize size independent box.
============
*/
	InitBox ( ): void {
		var /*int */i: number;

		this.type = traceModel_t.TRM_BOX;
		this.numVerts = 8;
		this.numEdges = 12;
		this.numPolys = 6;

		// set box edges
		for ( i = 0; i < 4; i++ ) {
			this.edges[i + 1].v[0] = i;
			this.edges[i + 1].v[1] = ( i + 1 ) & 3;
			this.edges[i + 5].v[0] = 4 + i;
			this.edges[i + 5].v[1] = 4 + ( ( i + 1 ) & 3 );
			this.edges[i + 9].v[0] = i;
			this.edges[i + 9].v[1] = 4 + i;
		}

		// all edges of a polygon go counter clockwise
		this.polys[0].numEdges = 4;
		this.polys[0].edges[0] = -4;
		this.polys[0].edges[1] = -3;
		this.polys[0].edges[2] = -2;
		this.polys[0].edges[3] = -1;
		this.polys[0].normal.Set( 0.0, 0.0, -1.0 );

		this.polys[1].numEdges = 4;
		this.polys[1].edges[0] = 5;
		this.polys[1].edges[1] = 6;
		this.polys[1].edges[2] = 7;
		this.polys[1].edges[3] = 8;
		this.polys[1].normal.Set( 0.0, 0.0, 1.0 );

		this.polys[2].numEdges = 4;
		this.polys[2].edges[0] = 1;
		this.polys[2].edges[1] = 10;
		this.polys[2].edges[2] = -5;
		this.polys[2].edges[3] = -9;
		this.polys[2].normal.Set( 0.0, -1.0, 0.0 );

		this.polys[3].numEdges = 4;
		this.polys[3].edges[0] = 2;
		this.polys[3].edges[1] = 11;
		this.polys[3].edges[2] = -6;
		this.polys[3].edges[3] = -10;
		this.polys[3].normal.Set( 1.0, 0.0, 0.0 );

		this.polys[4].numEdges = 4;
		this.polys[4].edges[0] = 3;
		this.polys[4].edges[1] = 12;
		this.polys[4].edges[2] = -7;
		this.polys[4].edges[3] = -11;
		this.polys[4].normal.Set( 0.0, 1.0, 0.0 );

		this.polys[5].numEdges = 4;
		this.polys[5].edges[0] = 4;
		this.polys[5].edges[1] = 9;
		this.polys[5].edges[2] = -8;
		this.polys[5].edges[3] = -12;
		this.polys[5].normal.Set( -1.0, 0.0, 0.0 );

		// convex model
		this.isConvex = true;

		this.GenerateEdgeNormals ( );
	}

/////*
////============
////idTraceModel::SetupOctahedron
////============
////*/
////void idTraceModel::SetupOctahedron( const idBounds &octBounds ) {
////	int i, e0, e1, v0, v1, v2;
////	idVec3 v;
////
////	if ( this.type != traceModel_t.TRM_OCTAHEDRON ) {
////		InitOctahedron();
////	}
////
////	this.offset.opEquals( ( octBounds[0] + octBounds[1] ) * 0.5;
////	v[0] = octBounds[1][0] - this.offset[0];
////	v[1] = octBounds[1][1] - this.offset[1];
////	v[2] = octBounds[1][2] - this.offset[2];
////
////	// set vertices
////	this.verts[0].Set( this.offset.x + v[0], this.offset.y, this.offset.z );
////	this.verts[1].Set( this.offset.x - v[0], this.offset.y, this.offset.z );
////	this.verts[2].Set( this.offset.x, this.offset.y + v[1], this.offset.z );
////	this.verts[3].Set( this.offset.x, this.offset.y - v[1], this.offset.z );
////	this.verts[4].Set( this.offset.x, this.offset.y, this.offset.z + v[2] );
////	this.verts[5].Set( this.offset.x, this.offset.y, this.offset.z - v[2] );
////
////	// set polygons
////	for ( i = 0; i < numPolys; i++ ) {
////		e0 = this.polys[i].edges[0];
////		e1 = this.polys[i].edges[1];
////		v0 = this.edges[abs(e0)].v[INTSIGNBITSET(e0)];
////		v1 = this.edges[abs(e0)].v[INTSIGNBITNOTSET(e0)];
////		v2 = this.edges[abs(e1)].v[INTSIGNBITNOTSET(e1)];
////		// polygon plane
////		this.polys[i].normal = ( this.verts[v1] - this.verts[v0] ).Cross( this.verts[v2] - this.verts[v0] );
////		this.polys[i].normal.Normalize();
////		this.polys[i].dist = this.polys[i].normal * this.verts[v0];
////		// polygon bounds
////		this.polys[i].bounds[0] = this.polys[i].bounds[1] = this.verts[v0];
////		this.polys[i].bounds.AddPoint( this.verts[v1] );
////		this.polys[i].bounds.AddPoint( this.verts[v2] );
////	}
////
////	// trm bounds
////	this.bounds.opEquals( octBounds );
////
////	this.GenerateEdgeNormals();
////}
////
/////*
////============
////idTraceModel::SetupOctahedron
////
////  The origin is placed at the center of the octahedron.
////============
////*/
////void idTraceModel::SetupOctahedron( const float size ) {
////	idBounds octBounds;
////	float halfSize;
////
////	halfSize = size * 0.5;
////	octBounds[0].Set( -halfSize, -halfSize, -halfSize );
////	octBounds[1].Set( halfSize, halfSize, halfSize );
////	SetupOctahedron( octBounds );
////}
////
/////*
////============
////idTraceModel::InitOctahedron
////
////  Initialize size independent octahedron.
////============
////*/
////void idTraceModel::InitOctahedron( ) {
////
////	this.type = traceModel_t.TRM_OCTAHEDRON;
////	this.numVerts = 6;
////	this.numEdges = 12;
////	numPolys = 8;
////
////	// set edges
////	this.edges[ 1].v[0] =  4; this.edges[ 1].v[1] =  0;
////	this.edges[ 2].v[0] =  0; this.edges[ 2].v[1] =  2;
////	this.edges[ 3].v[0] =  2; this.edges[ 3].v[1] =  4;
////	this.edges[ 4].v[0] =  2; this.edges[ 4].v[1] =  1;
////	this.edges[ 5].v[0] =  1; this.edges[ 5].v[1] =  4;
////	this.edges[ 6].v[0] =  1; this.edges[ 6].v[1] =  3;
////	this.edges[ 7].v[0] =  3; this.edges[ 7].v[1] =  4;
////	this.edges[ 8].v[0] =  3; this.edges[ 8].v[1] =  0;
////	this.edges[ 9].v[0] =  5; this.edges[ 9].v[1] =  2;
////	this.edges[10].v[0] =  0; this.edges[10].v[1] =  5;
////	this.edges[11].v[0] =  5; this.edges[11].v[1] =  1;
////	this.edges[12].v[0] =  5; this.edges[12].v[1] =  3;
////
////	// all edges of a polygon go counter clockwise
////	this.polys[0].numEdges = 3;
////	this.polys[0].edges[0] = 1;
////	this.polys[0].edges[1] = 2;
////	this.polys[0].edges[2] = 3;
////
////	this.polys[1].numEdges = 3;
////	this.polys[1].edges[0] = -3;
////	this.polys[1].edges[1] = 4;
////	this.polys[1].edges[2] = 5;
////
////	this.polys[2].numEdges = 3;
////	this.polys[2].edges[0] = -5;
////	this.polys[2].edges[1] = 6;
////	this.polys[2].edges[2] = 7;
////
////	this.polys[3].numEdges = 3;
////	this.polys[3].edges[0] = -7;
////	this.polys[3].edges[1] = 8;
////	this.polys[3].edges[2] = -1;
////
////	this.polys[4].numEdges = 3;
////	this.polys[4].edges[0] = 9;
////	this.polys[4].edges[1] = -2;
////	this.polys[4].edges[2] = 10;
////
////	this.polys[5].numEdges = 3;
////	this.polys[5].edges[0] = 11;
////	this.polys[5].edges[1] = -4;
////	this.polys[5].edges[2] = -9;
////
////	this.polys[6].numEdges = 3;
////	this.polys[6].edges[0] = 12;
////	this.polys[6].edges[1] = -6;
////	this.polys[6].edges[2] = -11;
////
////	this.polys[7].numEdges = 3;
////	this.polys[7].edges[0] = -10;
////	this.polys[7].edges[1] = -8;
////	this.polys[7].edges[2] = -12;
////
////	// convex model
////	this.isConvex = true;
////}
////
/////*
////============
////idTraceModel::SetupDodecahedron
////============
////*/
////void idTraceModel::SetupDodecahedron( const idBounds &dodBounds ) {
////	int i, e0, e1, e2, e3, v0, v1, v2, v3, v4;
////	float s, d;
////	idVec3 a, b, c;
////
////	if ( this.type != traceModel_t.TRM_DODECAHEDRON ) {
////		InitDodecahedron();
////	}
////
////	a[0] = a[1] = a[2] = 0.5773502691896257f; // 1.0 / ( 3.0 ) ^ 0.5;
////	b[0] = b[1] = b[2] = 0.3568220897730899f; // ( ( 3.0 - ( 5.0 ) ^ 0.5 ) / 6.0 ) ^ 0.5;
////	c[0] = c[1] = c[2] = 0.9341723589627156f; // ( ( 3.0 + ( 5.0 ) ^ 0.5 ) / 6.0 ) ^ 0.5;
////	d = 0.5 / c[0];
////	s = ( dodBounds[1][0] - dodBounds[0][0] ) * d;
////	a[0] *= s;
////	b[0] *= s;
////	c[0] *= s;
////	s = ( dodBounds[1][1] - dodBounds[0][1] ) * d;
////	a[1] *= s;
////	b[1] *= s;
////	c[1] *= s;
////	s = ( dodBounds[1][2] - dodBounds[0][2] ) * d;
////	a[2] *= s;
////	b[2] *= s;
////	c[2] *= s;
////
////	this.offset.opEquals( ( dodBounds[0] + dodBounds[1] ) * 0.5;
////
////	// set vertices
////	this.verts[ 0].Set( this.offset.x + a[0], this.offset.y + a[1], this.offset.z + a[2] );
////	this.verts[ 1].Set( this.offset.x + a[0], this.offset.y + a[1], this.offset.z - a[2] );
////	this.verts[ 2].Set( this.offset.x + a[0], this.offset.y - a[1], this.offset.z + a[2] );
////	this.verts[ 3].Set( this.offset.x + a[0], this.offset.y - a[1], this.offset.z - a[2] );
////	this.verts[ 4].Set( this.offset.x - a[0], this.offset.y + a[1], this.offset.z + a[2] );
////	this.verts[ 5].Set( this.offset.x - a[0], this.offset.y + a[1], this.offset.z - a[2] );
////	this.verts[ 6].Set( this.offset.x - a[0], this.offset.y - a[1], this.offset.z + a[2] );
////	this.verts[ 7].Set( this.offset.x - a[0], this.offset.y - a[1], this.offset.z - a[2] );
////	this.verts[ 8].Set( this.offset.x + b[0], this.offset.y + c[1], this.offset.z        );
////	this.verts[ 9].Set( this.offset.x - b[0], this.offset.y + c[1], this.offset.z        );
////	this.verts[10].Set( this.offset.x + b[0], this.offset.y - c[1], this.offset.z        );
////	this.verts[11].Set( this.offset.x - b[0], this.offset.y - c[1], this.offset.z        );
////	this.verts[12].Set( this.offset.x + c[0], this.offset.y       , this.offset.z + b[2] );
////	this.verts[13].Set( this.offset.x + c[0], this.offset.y       , this.offset.z - b[2] );
////	this.verts[14].Set( this.offset.x - c[0], this.offset.y       , this.offset.z + b[2] );
////	this.verts[15].Set( this.offset.x - c[0], this.offset.y       , this.offset.z - b[2] );
////	this.verts[16].Set( this.offset.x       , this.offset.y + b[1], this.offset.z + c[2] );
////	this.verts[17].Set( this.offset.x       , this.offset.y - b[1], this.offset.z + c[2] );
////	this.verts[18].Set( this.offset.x       , this.offset.y + b[1], this.offset.z - c[2] );
////	this.verts[19].Set( this.offset.x       , this.offset.y - b[1], this.offset.z - c[2] );
////
////	// set polygons
////	for ( i = 0; i < numPolys; i++ ) {
////		e0 = this.polys[i].edges[0];
////		e1 = this.polys[i].edges[1];
////		e2 = this.polys[i].edges[2];
////		e3 = this.polys[i].edges[3];
////		v0 = this.edges[abs(e0)].v[INTSIGNBITSET(e0)];
////		v1 = this.edges[abs(e0)].v[INTSIGNBITNOTSET(e0)];
////		v2 = this.edges[abs(e1)].v[INTSIGNBITNOTSET(e1)];
////		v3 = this.edges[abs(e2)].v[INTSIGNBITNOTSET(e2)];
////		v4 = this.edges[abs(e3)].v[INTSIGNBITNOTSET(e3)];
////		// polygon plane
////		this.polys[i].normal = ( this.verts[v1] - this.verts[v0] ).Cross( this.verts[v2] - this.verts[v0] );
////		this.polys[i].normal.Normalize();
////		this.polys[i].dist = this.polys[i].normal * this.verts[v0];
////		// polygon bounds
////		this.polys[i].bounds[0] = this.polys[i].bounds[1] = this.verts[v0];
////		this.polys[i].bounds.AddPoint( this.verts[v1] );
////		this.polys[i].bounds.AddPoint( this.verts[v2] );
////		this.polys[i].bounds.AddPoint( this.verts[v3] );
////		this.polys[i].bounds.AddPoint( this.verts[v4] );
////	}
////
////	// trm bounds
////	this.bounds.opEquals( dodBounds );
////
////	this.GenerateEdgeNormals();
////}
////
/////*
////============
////idTraceModel::SetupDodecahedron
////
////  The origin is placed at the center of the octahedron.
////============
////*/
////void idTraceModel::SetupDodecahedron( const float size ) {
////	idBounds dodBounds;
////	float halfSize;
////
////	halfSize = size * 0.5;
////	dodBounds[0].Set( -halfSize, -halfSize, -halfSize );
////	dodBounds[1].Set( halfSize, halfSize, halfSize );
////	SetupDodecahedron( dodBounds );
////}
////
/////*
////============
////idTraceModel::InitDodecahedron
////
////  Initialize size independent dodecahedron.
////============
////*/
////void idTraceModel::InitDodecahedron( ) {
////
////	this.type = traceModel_t.TRM_DODECAHEDRON;
////	this.numVerts = 20;
////	this.numEdges = 30;
////	numPolys = 12;
////
////	// set edges
////	this.edges[ 1].v[0] =  0; this.edges[ 1].v[1] =  8;
////	this.edges[ 2].v[0] =  8; this.edges[ 2].v[1] =  9;
////	this.edges[ 3].v[0] =  9; this.edges[ 3].v[1] =  4;
////	this.edges[ 4].v[0] =  4; this.edges[ 4].v[1] = 16;
////	this.edges[ 5].v[0] = 16; this.edges[ 5].v[1] =  0;
////	this.edges[ 6].v[0] = 16; this.edges[ 6].v[1] = 17;
////	this.edges[ 7].v[0] = 17; this.edges[ 7].v[1] =  2;
////	this.edges[ 8].v[0] =  2; this.edges[ 8].v[1] = 12;
////	this.edges[ 9].v[0] = 12; this.edges[ 9].v[1] =  0;
////	this.edges[10].v[0] =  2; this.edges[10].v[1] = 10;
////	this.edges[11].v[0] = 10; this.edges[11].v[1] =  3;
////	this.edges[12].v[0] =  3; this.edges[12].v[1] = 13;
////	this.edges[13].v[0] = 13; this.edges[13].v[1] = 12;
////	this.edges[14].v[0] =  9; this.edges[14].v[1] =  5;
////	this.edges[15].v[0] =  5; this.edges[15].v[1] = 15;
////	this.edges[16].v[0] = 15; this.edges[16].v[1] = 14;
////	this.edges[17].v[0] = 14; this.edges[17].v[1] =  4;
////	this.edges[18].v[0] =  3; this.edges[18].v[1] = 19;
////	this.edges[19].v[0] = 19; this.edges[19].v[1] = 18;
////	this.edges[20].v[0] = 18; this.edges[20].v[1] =  1;
////	this.edges[21].v[0] =  1; this.edges[21].v[1] = 13;
////	this.edges[22].v[0] =  7; this.edges[22].v[1] = 11;
////	this.edges[23].v[0] = 11; this.edges[23].v[1] =  6;
////	this.edges[24].v[0] =  6; this.edges[24].v[1] = 14;
////	this.edges[25].v[0] = 15; this.edges[25].v[1] =  7;
////	this.edges[26].v[0] =  1; this.edges[26].v[1] =  8;
////	this.edges[27].v[0] = 18; this.edges[27].v[1] =  5;
////	this.edges[28].v[0] =  6; this.edges[28].v[1] = 17;
////	this.edges[29].v[0] = 11; this.edges[29].v[1] = 10;
////	this.edges[30].v[0] = 19; this.edges[30].v[1] =  7;
////
////	// all edges of a polygon go counter clockwise
////	this.polys[0].numEdges = 5;
////	this.polys[0].edges[0] = 1;
////	this.polys[0].edges[1] = 2;
////	this.polys[0].edges[2] = 3;
////	this.polys[0].edges[3] = 4;
////	this.polys[0].edges[4] = 5;
////
////	this.polys[1].numEdges = 5;
////	this.polys[1].edges[0] = -5;
////	this.polys[1].edges[1] = 6;
////	this.polys[1].edges[2] = 7;
////	this.polys[1].edges[3] = 8;
////	this.polys[1].edges[4] = 9;
////
////	this.polys[2].numEdges = 5;
////	this.polys[2].edges[0] = -8;
////	this.polys[2].edges[1] = 10;
////	this.polys[2].edges[2] = 11;
////	this.polys[2].edges[3] = 12;
////	this.polys[2].edges[4] = 13;
////
////	this.polys[3].numEdges = 5;
////	this.polys[3].edges[0] = 14;
////	this.polys[3].edges[1] = 15;
////	this.polys[3].edges[2] = 16;
////	this.polys[3].edges[3] = 17;
////	this.polys[3].edges[4] = -3;
////
////	this.polys[4].numEdges = 5;
////	this.polys[4].edges[0] = 18;
////	this.polys[4].edges[1] = 19;
////	this.polys[4].edges[2] = 20;
////	this.polys[4].edges[3] = 21;
////	this.polys[4].edges[4] = -12;
////
////	this.polys[5].numEdges = 5;
////	this.polys[5].edges[0] = 22;
////	this.polys[5].edges[1] = 23;
////	this.polys[5].edges[2] = 24;
////	this.polys[5].edges[3] = -16;
////	this.polys[5].edges[4] = 25;
////
////	this.polys[6].numEdges = 5;
////	this.polys[6].edges[0] = -9;
////	this.polys[6].edges[1] = -13;
////	this.polys[6].edges[2] = -21;
////	this.polys[6].edges[3] = 26;
////	this.polys[6].edges[4] = -1;
////
////	this.polys[7].numEdges = 5;
////	this.polys[7].edges[0] = -26;
////	this.polys[7].edges[1] = -20;
////	this.polys[7].edges[2] = 27;
////	this.polys[7].edges[3] = -14;
////	this.polys[7].edges[4] = -2;
////
////	this.polys[8].numEdges = 5;
////	this.polys[8].edges[0] = -4;
////	this.polys[8].edges[1] = -17;
////	this.polys[8].edges[2] = -24;
////	this.polys[8].edges[3] = 28;
////	this.polys[8].edges[4] = -6;
////
////	this.polys[9].numEdges = 5;
////	this.polys[9].edges[0] = -23;
////	this.polys[9].edges[1] = 29;
////	this.polys[9].edges[2] = -10;
////	this.polys[9].edges[3] = -7;
////	this.polys[9].edges[4] = -28;
////
////	this.polys[10].numEdges = 5;
////	this.polys[10].edges[0] = -25;
////	this.polys[10].edges[1] = -15;
////	this.polys[10].edges[2] = -27;
////	this.polys[10].edges[3] = -19;
////	this.polys[10].edges[4] = 30;
////
////	this.polys[11].numEdges = 5;
////	this.polys[11].edges[0] = -30;
////	this.polys[11].edges[1] = -18;
////	this.polys[11].edges[2] = -11;
////	this.polys[11].edges[3] = -29;
////	this.polys[11].edges[4] = -22;
////
////	// convex model
////	this.isConvex = true;
////}

/*
============
idTraceModel::SetupCylinder
============
*/
	SetupCylinder ( cylBounds: idBounds, /*int */numSides: number ): void {
		var /*int */i: number, n: number, ii: number, n2: number;
		var /*float */angle: number;
		var halfSize = new idVec3;

		n = numSides;
		if ( n < 3 ) {
			n = 3;
		}
		if ( n * 2 > MAX_TRACEMODEL_VERTS ) {
			idLib.common.Printf( "WARNING: idTraceModel::SetupCylinder: too many vertices\n" );
			n = MAX_TRACEMODEL_VERTS / 2;
		}
		if ( n * 3 > MAX_TRACEMODEL_EDGES ) {
			idLib.common.Printf( "WARNING: idTraceModel::SetupCylinder: too many sides\n" );
			n = MAX_TRACEMODEL_EDGES / 3;
		}
		if ( n + 2 > MAX_TRACEMODEL_POLYS ) {
			idLib.common.Printf( "WARNING: idTraceModel::SetupCylinder: too many polygons\n" );
			n = MAX_TRACEMODEL_POLYS - 2;
		}

		this.type = traceModel_t.TRM_CYLINDER;
		this.numVerts = n * 2;
		this.numEdges = n * 3;
		this.numPolys = n + 2;
		this.offset.opEquals( ( cylBounds[0].opAddition( cylBounds[1] ) ).timesFloat( 0.5 ) );
		halfSize.opEquals( cylBounds[1].opSubtraction( this.offset ) );
		for ( i = 0; i < n; i++ ) {
			// verts
			angle = idMath.TWO_PI * i / n;
			this.verts[i].x = cos( angle ) * halfSize.x + this.offset.x;
			this.verts[i].y = sin( angle ) * halfSize.y + this.offset.y;
			this.verts[i].z = -halfSize.z + this.offset.z;
			this.verts[n + i].x = this.verts[i].x;
			this.verts[n + i].y = this.verts[i].y;
			this.verts[n + i].z = halfSize.z + this.offset.z;
			// edges
			ii = i + 1;
			n2 = n << 1;
			this.edges[ii].v[0] = i;
			this.edges[ii].v[1] = ii % n;
			this.edges[n + ii].v[0] = this.edges[ii].v[0] + n;
			this.edges[n + ii].v[1] = this.edges[ii].v[1] + n;
			this.edges[n2 + ii].v[0] = i;
			this.edges[n2 + ii].v[1] = n + i;
			// vertical polygon edges
			this.polys[i].numEdges = 4;
			this.polys[i].edges[0] = ii;
			this.polys[i].edges[1] = n2 + ( ii % n ) + 1;
			this.polys[i].edges[2] = -( n + ii );
			this.polys[i].edges[3] = -( n2 + ii );
			// bottom and top polygon edges
			this.polys[n].edges[i] = -( n - i );
			this.polys[n + 1].edges[i] = n + ii;
		}
		// bottom and top polygon numEdges
		this.polys[n].numEdges = n;
		this.polys[n + 1].numEdges = n;
		// polygons
		for ( i = 0; i < n; i++ ) {
			// vertical polygon plane
			this.polys[i].normal.opEquals( this.verts[( i + 1 ) % n].opSubtraction( this.verts[i] ).Cross( this.verts[n + i].opSubtraction( this.verts[i] ) ) );
			this.polys[i].normal.Normalize ( );
			this.polys[i].dist = this.polys[i].normal.timesVec( this.verts[i] );
			// vertical polygon bounds
			this.polys[i].bounds.Clear ( );
			this.polys[i].bounds.AddPoint( this.verts[i] );
			this.polys[i].bounds.AddPoint( this.verts[( i + 1 ) % n] );
			this.polys[i].bounds[0][2] = -halfSize.z + this.offset.z;
			this.polys[i].bounds[1][2] = halfSize.z + this.offset.z;
		}
		// bottom and top polygon plane
		this.polys[n].normal.Set( 0.0, 0.0, -1.0 );
		this.polys[n].dist = -cylBounds[0][2];
		this.polys[n + 1].normal.Set( 0.0, 0.0, 1.0 );
		this.polys[n + 1].dist = cylBounds[1][2];
		// trm bounds
		this.bounds.opEquals( cylBounds );
		// bottom and top polygon bounds
		this.polys[n].bounds = this.bounds;
		this.polys[n].bounds[1][2] = this.bounds[0][2];
		this.polys[n + 1].bounds = this.bounds;
		this.polys[n + 1].bounds[0][2] = this.bounds[1][2];
		// convex model
		this.isConvex = true;

		this.GenerateEdgeNormals ( );
	}
////
/////*
////============
////idTraceModel::SetupCylinder
////
////  The origin is placed at the center of the cylinder.
////============
////*/
////void idTraceModel::SetupCylinder( const float height, const float width, const int numSides ) {
////	idBounds cylBounds;
////	float halfHeight, halfWidth;
////
////	halfHeight = height * 0.5;
////	halfWidth = width * 0.5;
////	cylBounds[0].Set( -halfWidth, -halfWidth, -halfHeight );
////	cylBounds[1].Set( halfWidth, halfWidth, halfHeight );
////	SetupCylinder( cylBounds, numSides );
////}

/*
============
idTraceModel::SetupCone
============
*/
	SetupCone ( coneBounds: idBounds, /*int */numSides: number ): void {
		var /*int */i: number, n: number, ii: number;
		var /*float */angle: number;
		var halfSize = new idVec3;

		n = numSides;
		if ( n < 2 ) {
			n = 3;
		}
		if ( n + 1 > MAX_TRACEMODEL_VERTS ) {
			idLib.common.Printf( "WARNING: idTraceModel::SetupCone: too many vertices\n" );
			n = MAX_TRACEMODEL_VERTS - 1;
		}
		if ( n * 2 > MAX_TRACEMODEL_EDGES ) {
			idLib.common.Printf( "WARNING: idTraceModel::SetupCone: too many edges\n" );
			n = MAX_TRACEMODEL_EDGES / 2;
		}
		if ( n + 1 > MAX_TRACEMODEL_POLYS ) {
			idLib.common.Printf( "WARNING: idTraceModel::SetupCone: too many polygons\n" );
			n = MAX_TRACEMODEL_POLYS - 1;
		}

		this.type = traceModel_t.TRM_CONE;
		this.numVerts = n + 1;
		this.numEdges = n * 2;
		this.numPolys = n + 1;
		this.offset.opEquals( ( coneBounds[0].opAddition( coneBounds[1] ) ).timesFloat( 0.5 ) );
		halfSize.opEquals( coneBounds[1].opSubtraction( this.offset ) );
		this.verts[n].Set( 0.0, 0.0, halfSize.z + this.offset.z );
		for ( i = 0; i < n; i++ ) {
			// verts
			angle = idMath.TWO_PI * i / n;
			this.verts[i].x = cos( angle ) * halfSize.x + this.offset.x;
			this.verts[i].y = sin( angle ) * halfSize.y + this.offset.y;
			this.verts[i].z = -halfSize.z + this.offset.z;
			// edges
			ii = i + 1;
			this.edges[ii].v[0] = i;
			this.edges[ii].v[1] = ii % n;
			this.edges[n + ii].v[0] = i;
			this.edges[n + ii].v[1] = n;
			// vertical polygon edges
			this.polys[i].numEdges = 3;
			this.polys[i].edges[0] = ii;
			this.polys[i].edges[1] = n + ( ii % n ) + 1;
			this.polys[i].edges[2] = -( n + ii );
			// bottom polygon edges
			this.polys[n].edges[i] = -( n - i );
		}
		// bottom polygon numEdges
		this.polys[n].numEdges = n;

		// polygons
		for ( i = 0; i < n; i++ ) {
			// polygon plane
			this.polys[i].normal.opEquals( this.verts[( i + 1 ) % n].opSubtraction( this.verts[i] ).Cross( this.verts[n].opSubtraction( this.verts[i] ) ) );
			this.polys[i].normal.Normalize ( );
			this.polys[i].dist = this.polys[i].normal.timesVec( this.verts[i] );
			// polygon bounds
			this.polys[i].bounds.Clear ( );
			this.polys[i].bounds.AddPoint( this.verts[i] );
			this.polys[i].bounds.AddPoint( this.verts[( i + 1 ) % n] );
			this.polys[i].bounds.AddPoint( this.verts[n] );
		}
		// bottom polygon plane
		this.polys[n].normal.Set( 0.0, 0.0, -1.0 );
		this.polys[n].dist = -coneBounds[0][2];
		// trm bounds
		this.bounds.opEquals( coneBounds );
		// bottom polygon bounds
		this.polys[n].bounds = this.bounds;
		this.polys[n].bounds[1][2] = this.bounds[0][2];
		// convex model
		this.isConvex = true;

		this.GenerateEdgeNormals ( );
	}

/////*
////============
////idTraceModel::SetupCone
////
////  The origin is placed at the apex of the cone.
////============
////*/
////void idTraceModel::SetupCone( const float height, const float width, const int numSides ) {
////	idBounds coneBounds;
////	float halfWidth;
////
////	halfWidth = width * 0.5;
////	coneBounds[0].Set( -halfWidth, -halfWidth, -height );
////	coneBounds[1].Set( halfWidth, halfWidth, 0.0 );
////	SetupCone( coneBounds, numSides );
////}
////
/////*
////============
////idTraceModel::SetupBone
////
////  The origin is placed at the center of the bone.
////============
////*/
////void idTraceModel::SetupBone( const float length, const float width ) {
////	int i, j, edgeNum;
////	float halfLength = length * 0.5;
////
////	if ( this.type != traceModel_t.TRM_BONE ) {
////		InitBone();
////	}
////	// offset to center
////	this.offset.Set( 0.0, 0.0, 0.0 );
////	// set vertices
////	this.verts[0].Set( 0.0, 0.0, -halfLength );
////	this.verts[1].Set( 0.0, width * -0.5, 0.0 );
////	this.verts[2].Set( width * 0.5, width * 0.25f, 0.0 );
////	this.verts[3].Set( width * -0.5, width * 0.25f, 0.0 );
////	this.verts[4].Set( 0.0, 0.0, halfLength );
////	// set bounds
////	this.bounds[0].Set( width * -0.5, width * -0.5, -halfLength );
////	this.bounds[1].Set( width * 0.5, width * 0.25f, halfLength );
////	// poly plane normals
////	this.polys[0].normal = ( this.verts[2] - this.verts[0] ).Cross( this.verts[1] - this.verts[0] );
////	this.polys[0].normal.Normalize();
////	this.polys[2].normal.Set( -this.polys[0].normal[0], this.polys[0].normal[1], this.polys[0].normal[2] );
////	this.polys[3].normal.Set( this.polys[0].normal[0], this.polys[0].normal[1], -this.polys[0].normal[2] );
////	this.polys[5].normal.Set( -this.polys[0].normal[0], this.polys[0].normal[1], -this.polys[0].normal[2] );
////	this.polys[1].normal = (this.verts[3] - this.verts[0]).Cross(this.verts[2] - this.verts[0]);
////	this.polys[1].normal.Normalize();
////	this.polys[4].normal.Set( this.polys[1].normal[0], this.polys[1].normal[1], -this.polys[1].normal[2] );
////	// poly plane distances
////	for ( i = 0; i < 6; i++ ) {
////		this.polys[i].dist = this.polys[i].normal * this.verts[ this.edges[ abs(this.polys[i].edges[0]) ].v[0] ];
////		this.polys[i].bounds.Clear();
////		for ( j = 0; j < 3; j++ ) {
////			edgeNum = this.polys[i].edges[ j ];
////			this.polys[i].bounds.AddPoint( this.verts[ this.edges[abs(edgeNum)].v[edgeNum < 0] ] );
////		}
////	}
////
////	this.GenerateEdgeNormals();
////}
////
/////*
////============
////idTraceModel::InitBone
////
////  Initialize size independent bone.
////============
////*/
////void idTraceModel::InitBone( ) {
////	var/*int */i:number;
////
////	this.type = traceModel_t.TRM_BONE;
////	this.numVerts = 5;
////	this.numEdges = 9;
////	this.numPolys = 6;
////
////	// set bone edges
////	for ( i = 0; i < 3; i++ ) {
////		this.edges[ i + 1 ].v[0] = 0;
////		this.edges[ i + 1 ].v[1] = i + 1;
////		this.edges[ i + 4 ].v[0] = 1 + i;
////		this.edges[ i + 4 ].v[1] = 1 + ((i + 1) % 3);
////		this.edges[ i + 7 ].v[0] = i + 1;
////		this.edges[ i + 7 ].v[1] = 4;
////	}
////
////	// all edges of a polygon go counter clockwise
////	this.polys[0].numEdges = 3;
////	this.polys[0].edges[0] = 2;
////	this.polys[0].edges[1] = -4;
////	this.polys[0].edges[2] = -1;
////
////	this.polys[1].numEdges = 3;
////	this.polys[1].edges[0] = 3;
////	this.polys[1].edges[1] = -5;
////	this.polys[1].edges[2] = -2;
////
////	this.polys[2].numEdges = 3;
////	this.polys[2].edges[0] = 1;
////	this.polys[2].edges[1] = -6;
////	this.polys[2].edges[2] = -3;
////
////	this.polys[3].numEdges = 3;
////	this.polys[3].edges[0] = 4;
////	this.polys[3].edges[1] = 8;
////	this.polys[3].edges[2] = -7;
////
////	this.polys[4].numEdges = 3;
////	this.polys[4].edges[0] = 5;
////	this.polys[4].edges[1] = 9;
////	this.polys[4].edges[2] = -8;
////
////	this.polys[5].numEdges = 3;
////	this.polys[5].edges[0] = 6;
////	this.polys[5].edges[1] = 7;
////	this.polys[5].edges[2] = -9;
////
////	// convex model
////	this.isConvex = true;
////}
////
/*
============
idTraceModel::SetupPolygon
============
*/
	SetupPolygon ( v: idVec3[], /*int */count: number ): void {
		todoThrow ( );
////	var /*int */i:number, j:number;
////	idVec3 mid;
////
////	this.type = traceModel_t.TRM_POLYGON;
////	this.numVerts = count;
////	// times three because we need to be able to turn the polygon into a volume
////	if ( this.numVerts * 3 > MAX_TRACEMODEL_EDGES ) {
////		idLib.common.Printf( "WARNING: idTraceModel::SetupPolygon: too many vertices\n" );
////		this.numVerts = MAX_TRACEMODEL_EDGES / 3;
////	}
////
////	this.numEdges = this.numVerts;
////	this.numPolys = 2;
////	// set polygon planes
////	this.polys[0].numEdges = numEdges;
////	this.polys[0].normal = ( v[1] - v[0] ).Cross( v[2] - v[0] );
////	this.polys[0].normal.Normalize();
////	this.polys[0].dist = this.polys[0].normal * v[0];
////	this.polys[1].numEdges = numEdges;
////	this.polys[1].normal = -this.polys[0].normal;
////	this.polys[1].dist = -this.polys[0].dist;
////	// setup verts, edges and polygons
////	this.polys[0].bounds.Clear();
////	mid = vec3_origin;
////	for ( i = 0, j = 1; i < this.numVerts; i++, j++ ) {
////		if ( j >= this.numVerts ) {
////			j = 0;
////		}
////		this.verts[i] = v[i];
////		this.edges[i+1].v[0] = i;
////		this.edges[i+1].v[1] = j;
////		this.edges[i+1].normal = this.polys[0].normal.Cross( v[i] - v[j] );
////		this.edges[i+1].normal.Normalize();
////		this.polys[0].edges[i] = i + 1;
////		this.polys[1].edges[i] = -(this.numVerts - i);
////		this.polys[0].bounds.AddPoint( this.verts[i] );
////		mid += v[i];
////	}
////	this.polys[1].bounds = this.polys[0].bounds;
////	// offset to center
////	this.offset.opEquals( mid * (1.0 / this.numVerts) );
////	// total bounds
////	this.bounds.opEquals( this.polys[0].bounds );
////	// considered non convex because the model has no volume
////	this.isConvex = false;
	}
////
/////*
////============
////idTraceModel::SetupPolygon
////============
////*/
////void idTraceModel::SetupPolygon( const idWinding &w ) {
////	var/*int */i:number;
////	idVec3 *verts;
////
////	verts = (idVec3 *) _alloca16( w.GetNumPoints() * sizeof( idVec3 ) );
////	for ( i = 0; i < w.GetNumPoints(); i++ ) {
////		verts[i] = w[i].ToVec3();
////	}
////	SetupPolygon( verts, w.GetNumPoints() );
////}

/*
============
idTraceModel::VolumeFromPolygon
============
*/
	VolumeFromPolygon ( trm: R<idTraceModel>, /*float */thickness: number ): void {
		var /*int */i: number;

		trm.$ = this;
		trm.$.type = traceModel_t.TRM_POLYGONVOLUME;
		trm.$.numVerts = this.numVerts * 2;
		trm.$.numEdges = this.numEdges * 3;
		trm.$.numPolys = this.numEdges + 2;
		for ( i = 0; i < this.numEdges; i++ ) {
			trm.$.verts[this.numVerts + i].opEquals( this.verts[i].opSubtraction( idVec3.times( thickness, this.polys[0].normal ) ) );
			trm.$.edges[this.numEdges + i + 1].v[0] = this.numVerts + i;
			trm.$.edges[this.numEdges + i + 1].v[1] = this.numVerts + ( i + 1 ) % this.numVerts;
			trm.$.edges[this.numEdges * 2 + i + 1].v[0] = i;
			trm.$.edges[this.numEdges * 2 + i + 1].v[1] = this.numVerts + i;
			trm.$.polys[1].edges[i] = -( this.numEdges + i + 1 );
			trm.$.polys[2 + i].numEdges = 4;
			trm.$.polys[2 + i].edges[0] = -( i + 1 );
			trm.$.polys[2 + i].edges[1] = this.numEdges * 2 + i + 1;
			trm.$.polys[2 + i].edges[2] = this.numEdges + i + 1;
			trm.$.polys[2 + i].edges[3] = -( this.numEdges * 2 + ( i + 1 ) % this.numEdges + 1 );
			trm.$.polys[2 + i].normal.opEquals( this.verts[( i + 1 ) % this.numVerts].opSubtraction( this.verts[i] ) ).Cross( this.polys[0].normal );
			trm.$.polys[2 + i].normal.Normalize ( );
			trm.$.polys[2 + i].dist = trm.$.polys[2 + i].normal.timesVec( this.verts[i] );
		}
		trm.$.polys[1].dist = trm.$.polys[1].normal.timesVec( trm.$.verts[this.numEdges] );

		trm.$.GenerateEdgeNormals ( );
	}

/*
============
idTraceModel::GenerateEdgeNormals
============
*/
	static SHARP_EDGE_DOT =-0.7;

	GenerateEdgeNormals ( ): number {
		var /*int */i: number, j: number, edgeNum: number, numSharpEdges: number;
		var /*float */dot: number;
		var dir = new idVec3;
		var poly: traceModelPoly_t;
		var edge: traceModelEdge_t;

		for ( i = 0; i <= this.numEdges; i++ ) {
			this.edges[i].normal.Zero ( );
		}

		numSharpEdges = 0;
		for ( i = 0; i < this.numPolys; i++ ) {
			poly = this.polys[i];
			for ( j = 0; j < poly.numEdges; j++ ) {
				edgeNum = poly.edges[j];
				edge = this.edges[abs( edgeNum )]; //+ abs( edgeNum );
				if ( edge.normal[0] == 0.0 && edge.normal[1] == 0.0 && edge.normal[2] == 0.0 ) {
					edge.normal.opEquals( poly.normal );
				} else {
					dot = edge.normal.timesVec( poly.normal );
					// if the two planes make a very sharp edge
					if ( dot < idTraceModel.SHARP_EDGE_DOT ) {
						// max length normal pointing outside both polygons
						dir.opEquals( this.verts[edge.v[edgeNum > 0 ? 1 : 0]].opSubtraction( this.verts[edge.v[edgeNum < 0 ? 1 : 0]] ) );
						edge.normal.opEquals( edge.normal.Cross( dir ).opAddition( poly.normal.Cross( dir.opUnaryMinus ( ) ) ) );
						edge.normal.opMultiplicationAssignment( 0.5 / ( 0.5 + 0.5 * idTraceModel.SHARP_EDGE_DOT ) / edge.normal.Length ( ) );
						numSharpEdges++;
					} else {
						edge.normal.opEquals( idVec3.times( ( 0.5 / ( 0.5 + 0.5 * dot ) ), ( edge.normal.opAddition( poly.normal ) ) ) );
					}
				}
			}
		}
		return numSharpEdges;
	}

/////*
////============
////idTraceModel::Translate
////============
////*/
////void idTraceModel::Translate( const idVec3 &translation ) {
////	var/*int */i:number;
////
////	for ( i = 0; i < this.numVerts; i++ ) {
////		this.verts[i] += translation;
////	}
////	for ( i = 0; i < numPolys; i++ ) {
////		this.polys[i].dist += this.polys[i].normal * translation;
////		this.polys[i].bounds[0] += translation;
////		this.polys[i].bounds[1] += translation;
////	}
////	this.offset += translation;
////	this.bounds[0] += translation;
////	this.bounds[1] += translation;
////}
////
/////*
////============
////idTraceModel::Rotate
////============
////*/
////void idTraceModel::Rotate( const idMat3 &rotation ) {
////	int i, j, edgeNum;
////
////	for ( i = 0; i < this.numVerts; i++ ) {
////		this.verts[i] *= rotation;
////	}
////
////	this.bounds.Clear();
////	for ( i = 0; i < numPolys; i++ ) {
////		this.polys[i].normal *= rotation;
////		this.polys[i].bounds.Clear();
////		edgeNum = 0;
////		for ( j = 0; j < this.polys[i].numEdges; j++ ) {
////			edgeNum = this.polys[i].edges[j];
////			this.polys[i].bounds.AddPoint( this.verts[edges[abs(edgeNum)].v[INTSIGNBITSET(edgeNum)]] );
////		}
////		this.polys[i].dist = this.polys[i].normal * this.verts[edges[abs(edgeNum)].v[INTSIGNBITSET(edgeNum)]];
////		this.bounds += this.polys[i].bounds;
////	}
////
////	this.GenerateEdgeNormals();
////}

/*
============
idTraceModel::Shrink
============
*/
	Shrink ( /*float */m: number ): void {
		todoThrow ( );
		//int i, j, edgeNum;
		//traceModelEdge_t *edge;
		//idVec3 dir;

		//if ( this.type == traceModel_t.TRM_POLYGON ) {
		//	for ( i = 0; i < this.numEdges; i++ ) {
		//		edgeNum = this.polys[0].edges[i];
		//		edge = &edges[abs(edgeNum)];
		//		dir = this.verts[ edge.v[ INTSIGNBITSET(edgeNum) ] ] - this.verts[ edge.v[ INTSIGNBITNOTSET(edgeNum) ] ];
		//		if ( dir.Normalize() < 2.0 * m ) {
		//			continue;
		//		}
		//		dir *= m;
		//		this.verts[ edge.v[ 0 ] ] -= dir;
		//		this.verts[ edge.v[ 1 ] ] += dir;
		//	}
		//	return;
		//}

		//for ( i = 0; i < numPolys; i++ ) {
		//	this.polys[i].dist -= m;

		//	for ( j = 0; j < this.polys[i].numEdges; j++ ) {
		//		edgeNum = this.polys[i].edges[j];
		//		edge = &edges[abs(edgeNum)];
		//		this.verts[ edge.v[ INTSIGNBITSET(edgeNum) ] ] -= this.polys[i].normal * m;
		//	}
		//}
	}
////
/////*
////============
////idTraceModel::Compare
////============
////*/
////bool idTraceModel::Compare( const idTraceModel &trm ) const {
////	var/*int */i:number;
////
////	if ( this.type != trm.type || this.numVerts != trm.this.numVerts || 
////			this.numEdges != trm.numEdges || numPolys != trm.numPolys ) {
////		return false;
////	}
////	if ( this.bounds != trm.bounds || this.offset != trm.this.offset ) {
////		return false;
////	}
////
////	switch( this.type ) {
////		case traceModel_t.TRM_INVALID:
////		case traceModel_t.TRM_BOX:
////		case traceModel_t.TRM_OCTAHEDRON:
////		case traceModel_t.TRM_DODECAHEDRON:
////		case traceModel_t.TRM_CYLINDER:
////		case traceModel_t.TRM_CONE:
////			break;
////		case traceModel_t.TRM_BONE:
////		case traceModel_t.TRM_POLYGON:
////		case traceModel_t.TRM_POLYGONVOLUME:
////		case traceModel_t.TRM_CUSTOM:
////			for ( i = 0; i < trm.this.numVerts; i++ ) {
////				if ( this.verts[i] != trm.this.verts[i] ) {
////					return false;
////				}
////			}
////			break;
////	}
////	return true;
////}
////
/////*
////============
////idTraceModel::GetPolygonArea
////============
////*/
////float idTraceModel::GetPolygonArea( int polyNum ) const {
////	var/*int */i:number;
////	idVec3 base, v1, v2, cross;
////	float total;
////	const traceModelPoly_t *poly;
////
////	if ( polyNum < 0 || polyNum >= numPolys ) {
////		return 0.0;
////	}
////	poly = &this.polys[polyNum];
////	total = 0.0;
////	base = this.verts[ this.edges[ abs(poly.edges[0]) ].v[ INTSIGNBITSET( poly.edges[0] ) ] ];
////	for ( i = 0; i < poly.numEdges; i++ ) {
////		v1 = this.verts[ this.edges[ abs(poly.edges[i]) ].v[ INTSIGNBITSET( poly.edges[i] ) ] ] - base;
////		v2 = this.verts[ this.edges[ abs(poly.edges[i]) ].v[ INTSIGNBITNOTSET( poly.edges[i] ) ] ] - base;
////		cross = v1.Cross( v2 );
////		total += cross.Length();
////	}
////	return total * 0.5;
////}
////
/////*
////============
////idTraceModel::GetOrderedSilhouetteEdges
////============
////*/
////int idTraceModel::GetOrderedSilhouetteEdges( const int edgeIsSilEdge[MAX_TRACEMODEL_EDGES+1], int silEdges[MAX_TRACEMODEL_EDGES] ) const {
////	int i, j, edgeNum, numSilEdges, nextSilVert;
////	int unsortedSilEdges[MAX_TRACEMODEL_EDGES];
////
////	numSilEdges = 0;
////	for ( i = 1; i <= this.numEdges; i++ ) {
////		if ( edgeIsSilEdge[i] ) {
////			unsortedSilEdges[numSilEdges++] = i;
////		}
////	}
////
////	silEdges[0] = unsortedSilEdges[0];
////	unsortedSilEdges[0] = -1;
////	nextSilVert = this.edges[silEdges[0]].v[0];
////	for ( i = 1; i < numSilEdges; i++ ) {
////		for ( j = 1; j < numSilEdges; j++ ) {
////			edgeNum = unsortedSilEdges[j];
////			if ( edgeNum >= 0 ) {
////				if ( this.edges[edgeNum].v[0] == nextSilVert ) {
////					nextSilVert = this.edges[edgeNum].v[1];
////					silEdges[i] = edgeNum;
////					break;
////				}
////				if ( this.edges[edgeNum].v[1] == nextSilVert ) {
////					nextSilVert = this.edges[edgeNum].v[0];
////					silEdges[i] = -edgeNum;
////					break;
////				}
////			}
////		}
////		if ( j >= numSilEdges ) {
////			silEdges[i] = 1;	// shouldn't happen
////		}
////		unsortedSilEdges[j] = -1;
////	}
////	return numSilEdges;
////}
////
/////*
////============
////idTraceModel::GetProjectionSilhouetteEdges
////============
////*/
////int idTraceModel::GetProjectionSilhouetteEdges( const idVec3 &projectionOrigin, int silEdges[MAX_TRACEMODEL_EDGES] ) const {
////	int i, j, edgeNum;
////	int edgeIsSilEdge[MAX_TRACEMODEL_EDGES+1];
////	const traceModelPoly_t *poly;
////	idVec3 dir;
////
////	memset( edgeIsSilEdge, 0, sizeof( edgeIsSilEdge ) );
////
////	for ( i = 0; i < numPolys; i++ ) {
////		poly = &this.polys[i];
////		edgeNum = poly.edges[0];
////		dir = this.verts[ this.edges[abs(edgeNum)].v[ INTSIGNBITSET(edgeNum) ] ] - projectionOrigin;
////		if ( dir * poly.normal < 0.0 ) {
////			for ( j = 0; j < poly.numEdges; j++ ) {
////				edgeNum = poly.edges[j];
////				edgeIsSilEdge[abs(edgeNum)] ^= 1;
////			}
////		}
////	}
////
////	return GetOrderedSilhouetteEdges( edgeIsSilEdge, silEdges );
////}
////
/////*
////============
////idTraceModel::GetParallelProjectionSilhouetteEdges
////============
////*/
////int idTraceModel::GetParallelProjectionSilhouetteEdges( const idVec3 &projectionDir, int silEdges[MAX_TRACEMODEL_EDGES] ) const {
////	int i, j, edgeNum;
////	int edgeIsSilEdge[MAX_TRACEMODEL_EDGES+1];
////	const traceModelPoly_t *poly;
////
////	memset( edgeIsSilEdge, 0, sizeof( edgeIsSilEdge ) );
////
////	for ( i = 0; i < numPolys; i++ ) {
////		poly = &this.polys[i];
////		if ( projectionDir * poly.normal < 0.0 ) {
////			for ( j = 0; j < poly.numEdges; j++ ) {
////				edgeNum = poly.edges[j];
////				edgeIsSilEdge[abs(edgeNum)] ^= 1;
////			}
////		}
////	}
////
////	return GetOrderedSilhouetteEdges( edgeIsSilEdge, silEdges );
////}
////
////
/////*
////
////  credits to Brian Mirtich for his paper "Fast and Accurate Computation of Polyhedral Mass Properties"
////
////*/


/*
============
idTraceModel::ProjectionIntegrals
============
*/
	ProjectionIntegrals ( /*int */polyNum: number, /*int */a: number, /*int */b: number, /*struct projectionIntegrals_s &*/integrals: projectionIntegrals_t ): void {
		var poly: traceModelPoly_t;
		var /*int */i: number, edgeNum: number;
		var v1 = new idVec3, v2 = new idVec3;
		var /*float */a0: number, a1: number, da: number;
		var /*float */b0: number, b1: number, db: number;
		var /*float */a0_2: number, a0_3: number, a0_4: number, b0_2: number, b0_3: number, b0_4: number;
		var /*float */a1_2: number, a1_3: number, b1_2: number, b1_3: number;
		var /*float */C1: number, Ca: number, Caa: number, Caaa: number, Cb: number, Cbb: number, Cbbb: number;
		var /*float */Cab: number, Kab: number, Caab: number, Kaab: number, Cabb: number, Kabb: number;

		integrals.memset0 ( ); //memset(&integrals, 0, sizeof(projectionIntegrals_t));
		poly = this.polys[polyNum];
		for ( i = 0; i < poly.numEdges; i++ ) {
			edgeNum = poly.edges[i];
			v1.opEquals( this.verts[this.edges[abs( edgeNum )].v[edgeNum < 0 ? 1 : 0]] );
			v2.opEquals( this.verts[this.edges[abs( edgeNum )].v[edgeNum > 0 ? 1 : 0]] );
			a0 = v1[a];
			b0 = v1[b];
			a1 = v2[a];
			b1 = v2[b];
			da = a1 - a0;
			db = b1 - b0;
			a0_2 = a0 * a0;
			a0_3 = a0_2 * a0;
			a0_4 = a0_3 * a0;
			b0_2 = b0 * b0;
			b0_3 = b0_2 * b0;
			b0_4 = b0_3 * b0;
			a1_2 = a1 * a1;
			a1_3 = a1_2 * a1;
			b1_2 = b1 * b1;
			b1_3 = b1_2 * b1;

			C1 = a1 + a0;
			Ca = a1 * C1 + a0_2;
			Caa = a1 * Ca + a0_3;
			Caaa = a1 * Caa + a0_4;
			Cb = b1 * ( b1 + b0 ) + b0_2;
			Cbb = b1 * Cb + b0_3;
			Cbbb = b1 * Cbb + b0_4;
			Cab = 3 * a1_2 + 2 * a1 * a0 + a0_2;
			Kab = a1_2 + 2 * a1 * a0 + 3 * a0_2;
			Caab = a0 * Cab + 4 * a1_3;
			Kaab = a1 * Kab + 4 * a0_3;
			Cabb = 4 * b1_3 + 3 * b1_2 * b0 + 2 * b1 * b0_2 + b0_3;
			Kabb = b1_3 + 2 * b1_2 * b0 + 3 * b1 * b0_2 + 4 * b0_3;

			integrals.P1 += db * C1;
			integrals.Pa += db * Ca;
			integrals.Paa += db * Caa;
			integrals.Paaa += db * Caaa;
			integrals.Pb += da * Cb;
			integrals.Pbb += da * Cbb;
			integrals.Pbbb += da * Cbbb;
			integrals.Pab += db * ( b1 * Cab + b0 * Kab );
			integrals.Paab += db * ( b1 * Caab + b0 * Kaab );
			integrals.Pabb += da * ( a1 * Cabb + a0 * Kabb );
		}

		integrals.P1 *= ( 1.0 / 2.0 );
		integrals.Pa *= ( 1.0 / 6.0 );
		integrals.Paa *= ( 1.0 / 12.0 );
		integrals.Paaa *= ( 1.0 / 20.0 );
		integrals.Pb *= ( 1.0 / -6.0 );
		integrals.Pbb *= ( 1.0 / -12.0 );
		integrals.Pbbb *= ( 1.0 / -20.0 );
		integrals.Pab *= ( 1.0 / 24.0 );
		integrals.Paab *= ( 1.0 / 60.0 );
		integrals.Pabb *= ( 1.0 / -60.0 );
	}


/*
============
idTraceModel::PolygonIntegrals
============
*/
	PolygonIntegrals ( /*int */polyNum: number, /*int */a: number, /*int */b: number, /*int */c: number, /*struct polygonIntegrals_s &*/integrals: polygonIntegrals_t ): void {
		var pi = new projectionIntegrals_t;
		var n = new idVec3;
		var /*float */w: number;
		var /*float */k1: number, k2: number, k3: number, k4: number;

		this.ProjectionIntegrals( polyNum, a, b, pi );

		n.opEquals( this.polys[polyNum].normal );
		w = -this.polys[polyNum].dist;
		k1 = 1 / n[c];
		k2 = k1 * k1;
		k3 = k2 * k1;
		k4 = k3 * k1;

		integrals.Fa = k1 * pi.Pa;
		integrals.Fb = k1 * pi.Pb;
		integrals.Fc = -k2 * ( n[a] * pi.Pa + n[b] * pi.Pb + w * pi.P1 );

		integrals.Faa = k1 * pi.Paa;
		integrals.Fbb = k1 * pi.Pbb;
		integrals.Fcc = k3 * ( Square( n[a] ) * pi.Paa + 2 * n[a] * n[b] * pi.Pab + Square( n[b] ) * pi.Pbb
			+ w * ( 2 * ( n[a] * pi.Pa + n[b] * pi.Pb ) + w * pi.P1 ) );

		integrals.Faaa = k1 * pi.Paaa;
		integrals.Fbbb = k1 * pi.Pbbb;
		integrals.Fccc = -k4 * ( Cube( n[a] ) * pi.Paaa + 3 * Square( n[a] ) * n[b] * pi.Paab
			+ 3 * n[a] * Square( n[b] ) * pi.Pabb + Cube( n[b] ) * pi.Pbbb
			+ 3 * w * ( Square( n[a] ) * pi.Paa + 2 * n[a] * n[b] * pi.Pab + Square( n[b] ) * pi.Pbb )
			+ w * w * ( 3 * ( n[a] * pi.Pa + n[b] * pi.Pb ) + w * pi.P1 ) );

		integrals.Faab = k1 * pi.Paab;
		integrals.Fbbc = -k2 * ( n[a] * pi.Pabb + n[b] * pi.Pbbb + w * pi.Pbb );
		integrals.Fcca = k3 * ( Square( n[a] ) * pi.Paaa + 2 * n[a] * n[b] * pi.Paab + Square( n[b] ) * pi.Pabb
			+ w * ( 2 * ( n[a] * pi.Paa + n[b] * pi.Pab ) + w * pi.Pa ) );
	}


/*
============
idTraceModel::VolumeIntegrals
============
*/
	VolumeIntegrals ( /*struct volumeIntegrals_s &*/integrals: volumeIntegrals_t ): void {
		var poly: traceModelPoly_t;
		var pi = new polygonIntegrals_t;
		var /*int */i: number, a: number, b: number, c: number;
		var /*float */nx: number, ny: number, nz: number;

		integrals.memset0 ( ); //memset( &integrals, 0, sizeof(volumeIntegrals_t) );
		for ( i = 0; i < this.numPolys; i++ ) {
			poly = this.polys[i];

			nx = idMath.Fabs( poly.normal[0] );
			ny = idMath.Fabs( poly.normal[1] );
			nz = idMath.Fabs( poly.normal[2] );
			if ( nx > ny && nx > nz ) {
				c = 0;
			} else {
				c = ( ny > nz ) ? 1 : 2;
			}
			a = ( c + 1 ) % 3;
			b = ( a + 1 ) % 3;

			this.PolygonIntegrals( i, a, b, c, pi );

			integrals.T0 += poly.normal[0] * ( ( a == 0 ) ? pi.Fa : ( ( b == 0 ) ? pi.Fb : pi.Fc ) );

			integrals.T1[a] += poly.normal[a] * pi.Faa;
			integrals.T1[b] += poly.normal[b] * pi.Fbb;
			integrals.T1[c] += poly.normal[c] * pi.Fcc;
			integrals.T2[a] += poly.normal[a] * pi.Faaa;
			integrals.T2[b] += poly.normal[b] * pi.Fbbb;
			integrals.T2[c] += poly.normal[c] * pi.Fccc;
			integrals.TP[a] += poly.normal[a] * pi.Faab;
			integrals.TP[b] += poly.normal[b] * pi.Fbbc;
			integrals.TP[c] += poly.normal[c] * pi.Fcca;
		}

		integrals.T1.opMultiplicationAssignment( 0.5 );
		integrals.T2.opMultiplicationAssignment( ( 1.0 / 3.0 ) );
		integrals.TP.opMultiplicationAssignment( 0.5 );
	}

/*
============
idTraceModel::GetMassProperties
============
*/
	GetMassProperties ( /*float */density: number, /*float &*/mass: R<number>, centerOfMass: idVec3, inertiaTensor: idMat3 ): void {
		var integrals = new volumeIntegrals_t;

		// if polygon trace model
		if ( this.type == traceModel_t.TRM_POLYGON ) {
			var trm = new R( new idTraceModel );

			this.VolumeFromPolygon( trm, 1.0 );
			trm.$.GetMassProperties( density, mass, centerOfMass, inertiaTensor );
			return;
		}

		this.VolumeIntegrals( integrals );

		// if no volume
		if ( integrals.T0 == 0.0 ) {
			mass.$ = 1.0;
			centerOfMass.Zero ( );
			inertiaTensor.Identity ( );
			return;
		}

		// mass of model
		mass.$ = density * integrals.T0;
		// center of mass
		centerOfMass.opEquals( integrals.T1.opDivision( integrals.T0 ) );
		// compute inertia tensor
		inertiaTensor[0][0] = density * ( integrals.T2[1] + integrals.T2[2] );
		inertiaTensor[1][1] = density * ( integrals.T2[2] + integrals.T2[0] );
		inertiaTensor[2][2] = density * ( integrals.T2[0] + integrals.T2[1] );
		inertiaTensor[0][1] = inertiaTensor[1][0] = - density * integrals.TP[0];
		inertiaTensor[1][2] = inertiaTensor[2][1] = - density * integrals.TP[1];
		inertiaTensor[2][0] = inertiaTensor[0][2] = - density * integrals.TP[2];
		// translate inertia tensor to center of mass
		inertiaTensor[0][0] -= mass.$ * ( centerOfMass[1] * centerOfMass[1] + centerOfMass[2] * centerOfMass[2] );
		inertiaTensor[1][1] -= mass.$ * ( centerOfMass[2] * centerOfMass[2] + centerOfMass[0] * centerOfMass[0] );
		inertiaTensor[2][2] -= mass.$ * ( centerOfMass[0] * centerOfMass[0] + centerOfMass[1] * centerOfMass[1] );
		inertiaTensor[0][1] = inertiaTensor[1][0] += mass.$ * centerOfMass[0] * centerOfMass[1];
		inertiaTensor[1][2] = inertiaTensor[2][1] += mass.$ * centerOfMass[1] * centerOfMass[2];
		inertiaTensor[2][0] = inertiaTensor[0][2] += mass.$ * centerOfMass[2] * centerOfMass[0];
	}
}


class projectionIntegrals_t {
	// all float
	P1: number;
	Pa: number; Pb: number;
	Paa: number; Pab: number; Pbb: number;
	Paaa: number; Paab: number; Pabb: number; Pbbb: number;


	memset0 ( ): void {
		this.P1 = 0;
		this.Pa = this.Pb = 0;
		this.Paa = this.Pab = this.Pbb = 0;
		this.Paaa = this.Paab = this.Pabb = this.Pbbb = 0;
	}
}

class polygonIntegrals_t {
	// all float
	Fa: number; Fb: number; Fc: number;
	Faa: number; Fbb: number; Fcc: number;
	Faaa: number; Fbbb: number; Fccc: number;
	Faab: number; Fbbc: number; Fcca: number;

	memset0 ( ): void {
		this.Fa = this.Fb = this.Fc = 0;
		this.Faa = this.Fbb = this.Fcc = 0;
		this.Faaa = this.Fbbb = this.Fccc = 0;
		this.Faab = this.Fbbc = this.Fcca = 0;
	}
}

class volumeIntegrals_t {
	T0: number /*float*/;
	T1 = new idVec3;
	T2 = new idVec3;
	TP = new idVec3;
	memset0 ( ): void {
		this.T0 = 0;
		this.T1.memset0 ( );
		this.T2.memset0 ( );
		this.TP.memset0 ( );
	}
}