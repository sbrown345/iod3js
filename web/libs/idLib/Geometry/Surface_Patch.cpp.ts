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
////#ifndef __SURFACE_PATCH_H__
////#define __SURFACE_PATCH_H__

/*
===============================================================================

Bezier patch surface.

===============================================================================
*/

class idSurface_Patch extends idSurface {
////
////public:
////	idSurface_Patch( );
////	idSurface_Patch(int maxPatchWidth, int maxPatchHeight);
////	idSurface_Patch(const idSurface_Patch &patch);
////	~idSurface_Patch( );
////
////	void				SetSize(int patchWidth, int patchHeight);
////	int					GetWidth( ) const;
////	int					GetHeight( ) const;
////
////	// subdivide the patch mesh based on error
////	void				Subdivide(float maxHorizontalError, float maxVerticalError, float maxLength, bool genNormals = false);
////	// subdivide the patch up to an explicit number of horizontal and vertical subdivisions
////	void				SubdivideExplicit(int horzSubdivisions, int vertSubdivisions, bool genNormals, bool removeLinear = false);
////
////protected:
	width: number /*int*/; // width of patch
	height: number /*int*/; // height of patch
	maxWidth: number /*int*/; // maximum width allocated for
	maxHeight: number /*int*/; // maximum height allocated for
	expanded: boolean; // true if vertices are spaced out
////
////private:
////	// put the approximation points on the curve
////	void				PutOnCurve( );
////	// remove columns and rows with all points on one line
////	void				RemoveLinearColumnsRows( );
////	// resize verts buffer
////	void				ResizeExpanded(int height, int width);
////	// space points out over maxWidth * maxHeight buffer
////	void				Expand( );
////	// move all points to the start of the verts buffer
////	void				Collapse( );
////	// project a point onto a vector to calculate maximum curve error
////	void				ProjectPointOntoVector(const idVec3 &point, const idVec3 &vStart, const idVec3 &vEnd, idVec3 &vProj);
////	// generate normals
////	void				GenerateNormals( );
////	// generate triangle indexes
////	void				GenerateIndexes( );
////	// lerp point from two patch point
////	void				LerpVert(const idDrawVert &a, const idDrawVert &b, idDrawVert &out) const;
////	// sample a single 3x3 patch
////	void				SampleSinglePatchPoint(const idDrawVert ctrl[3][3], float u, float v, idDrawVert *out) const;
////	void				SampleSinglePatch(const idDrawVert ctrl[3][3], int baseCol, int baseRow, int width, int horzSub, int vertSub, idDrawVert *outVerts) const;
////};

/*
=================
idSurface_Patch::idSurface_Patch
=================
*/
	constructor ( ) {
		super ( );
		this.height = this.width = this.maxHeight = this.maxWidth = 0;
		this.expanded = false;
	}

/////*
////=================
////idSurface_Patch::idSurface_Patch
////=================
////*/
////ID_INLINE idSurface_Patch::idSurface_Patch(int maxPatchWidth, int maxPatchHeight) {
////	this.width = height = 0;
////	this.maxWidth = maxPatchWidth;
////	this.maxHeight = maxPatchHeight;
////	this.verts.SetNum(this.maxWidth * this.maxHeight);
////	this.expanded = false;
////}
////
/////*
////=================
////idSurface_Patch::idSurface_Patch
////=================
////*/
////ID_INLINE idSurface_Patch::idSurface_Patch(const idSurface_Patch &patch) {
////	(*this) = patch;
////}
////
/////*
////=================
////idSurface_Patch::~idSurface_Patch
////=================
////*/
////ID_INLINE idSurface_Patch::~idSurface_Patch() {
////}
////
/*
=================
idSurface_Patch::GetWidth
=================
*/
	GetWidth ( ): number /*int*/ {
		return this.width;
	}

/*
=================
idSurface_Patch::GetHeight
=================
*/
	GetHeight ( ): number /*int*/ {
		return this.height;
	}

////#endif /* !__SURFACE_PATCH_H__ */


/*
=================
idSurface_Patch::SetSize
=================
*/
	SetSize ( /*int*/ patchWidth: number, /*int */patchHeight: number ): void {
		if ( patchWidth < 1 || patchWidth > this.maxWidth ) {
			idLib.common.FatalError( "idSurface_Patch::SetSize: invalid patchWidth" );
		}
		if ( patchHeight < 1 || patchHeight > this.maxHeight ) {
			idLib.common.FatalError( "idSurface_Patch::SetSize: invalid patchHeight" );
		}
		this.width = patchWidth;
		this.height = patchHeight;
		this.verts.SetNum( this.width * this.height, false );
	}

/////*
////=================
////idSurface_Patch::PutOnCurve
////
////Expects an expanded patch.
////=================
////*/
////void idSurface_Patch::PutOnCurve( void ) {
////	var /*int */i:number, j:number;
////	idDrawVert prev, next;
////
////	assert( this.expanded == true );
////	// put all the approximating points on the curve
////	for ( i = 0; i < this.width; i++ ) {
////		for ( j = 1; j < this.height; j += 2 ) {
////			LerpVert( this.verts[j*this.maxWidth+i], this.verts[(j+1)*this.maxWidth+i], prev );
////			LerpVert( this.verts[j*this.maxWidth+i], this.verts[(j-1)*this.maxWidth+i], next );
////			LerpVert( prev, next, this.verts[j*this.maxWidth+i] );
////		}
////	}
////
////	for ( j = 0; j < this.height; j++ ) {
////		for ( i = 1; i < this.width; i += 2 ) {
////			LerpVert( this.verts[j*this.maxWidth+i], this.verts[j*this.maxWidth+i+1], prev );
////			LerpVert( this.verts[j*this.maxWidth+i], this.verts[j*this.maxWidth+i-1], next );
////			LerpVert( prev, next, this.verts[j*this.maxWidth+i] );
////		}
////	}
////}
////
/////*
////================
////idSurface_Patch::ProjectPointOntoVector
////================
////*/
////void idSurface_Patch::ProjectPointOntoVector( const idVec3 &point, const idVec3 &vStart, const idVec3 &vEnd, idVec3 &vProj ) {
////	idVec3 pVec, vec;
////
////	pVec = point - vStart;
////	vec = vEnd - vStart;
////	vec.Normalize();
////	// project onto the directional vector for this segment
////	vProj = vStart + (pVec * vec) * vec;
////}
////
/////*
////================
////idSurface_Patch::RemoveLinearColumnsRows
////
////Expects an expanded patch.
////================
////*/
////void idSurface_Patch::RemoveLinearColumnsRows( void ) {
////	int i, j, k;
////	float len, maxLength;
////	idVec3 proj, dir;
////
////	assert( this.expanded == true );
////	for ( j = 1; j < this.width - 1; j++ ) {
////		maxLength = 0;
////		for ( i = 0; i < this.height; i++ ) {
////			idSurface_Patch::ProjectPointOntoVector( this.verts[i*this.maxWidth + j].xyz,
////									this.verts[i*this.maxWidth + j-1].xyz, this.verts[i*this.maxWidth + j+1].xyz, proj);
////			dir = this.verts[i*this.maxWidth + j].xyz - proj;
////			len = dir.LengthSqr();
////			if ( len > maxLength ) {
////				maxLength = len;
////			}
////		}
////		if ( maxLength < Square( 0.2f ) ) {
////			this.width--;
////			for ( i = 0; i < this.height; i++ ) {
////				for ( k = j; k < this.width; k++ ) {
////					this.verts[i*this.maxWidth + k] = this.verts[i*this.maxWidth + k+1];
////				}
////			}
////			j--;
////		}
////	}
////	for ( j = 1; j < this.height - 1; j++ ) {
////		maxLength = 0;
////		for ( i = 0; i < this.width; i++ ) {
////			idSurface_Patch::ProjectPointOntoVector( this.verts[j*this.maxWidth + i].xyz,
////									this.verts[(j-1)*this.maxWidth + i].xyz, this.verts[(j+1)*this.maxWidth + i].xyz, proj);
////			dir = this.verts[j*this.maxWidth + i].xyz - proj;
////			len = dir.LengthSqr();
////			if ( len > maxLength ) {
////				maxLength = len;
////			}
////		}
////		if ( maxLength < Square( 0.2f ) ) {
////			this.height--;
////			for ( i = 0; i < this.width; i++ ) {
////				for ( k = j; k < this.height; k++ ) {
////					this.verts[k*this.maxWidth + i] = this.verts[(k+1)*this.maxWidth + i];
////				}
////			}
////			j--;
////		}
////	}
////}
////
/////*
////================
////idSurface_Patch::ResizeExpanded
////================
////*/
////void idSurface_Patch::ResizeExpanded( int newHeight, int newWidth ) {
////	var /*int */i:number, j:number;
////
////	assert( this.expanded == true );
////	if ( newHeight <= this.maxHeight && newWidth <= this.maxWidth ) {
////		return;
////	}
////	if ( newHeight * newWidth > this.maxHeight * this.maxWidth ) {
////		this.verts.SetNum( newHeight * newWidth );
////	}
////	// space out this.verts for new height and width
////	for ( j = this.maxHeight-1; j >= 0; j-- ) {
////		for ( i = this.maxWidth-1; i >= 0; i-- ) {
////			this.verts[j*newWidth + i] = this.verts[j*this.maxWidth + i];
////		}
////	}
////	this.maxHeight = newHeight;
////	this.maxWidth = newWidth;
////}
////
/////*
////================
////idSurface_Patch::Collapse
////================
////*/
////void idSurface_Patch::Collapse( void ) {
////	var /*int */i:number, j:number;
////
////	if ( !this.expanded ) {
////		idLib::common.FatalError("idSurface_Patch::Collapse: patch not expanded");
////	}
////	this.expanded = false;
////	if ( this.width != this.maxWidth ) {
////		for ( j = 0; j < this.height; j++ ) {
////			for ( i = 0; i < this.width; i++ ) {
////				this.verts[j*this.width + i] = this.verts[j*this.maxWidth + i];
////			}
////		}
////	}
////	this.verts.SetNum( this.width * this.height, false );
////}
////
/////*
////================
////idSurface_Patch::Expand
////================
////*/
////void idSurface_Patch::Expand( void ) {
////	var /*int */i:number, j:number;
////
////	if ( this.expanded ) {
////		idLib::common.FatalError("idSurface_Patch::Expand: patch alread expanded");
////	}
////	this.expanded = true;
////	this.verts.SetNum( this.maxWidth * this.maxHeight, false );
////	if ( this.width != this.maxWidth ) {
////		for ( j = this.height-1; j >= 0; j-- ) {
////			for ( i = this.width-1; i >= 0; i-- ) {
////				this.verts[j*this.maxWidth + i] = this.verts[j*this.width + i];
////			}
////		}
////	}
////}
////
/////*
////============
////idSurface_Patch::LerpVert
////============
////*/
////void idSurface_Patch::LerpVert( const idDrawVert &a, const idDrawVert &b, idDrawVert &out ) const {
////	out.xyz[0] = 0.5f * ( a.xyz[0] + b.xyz[0] );
////	out.xyz[1] = 0.5f * ( a.xyz[1] + b.xyz[1] );
////	out.xyz[2] = 0.5f * ( a.xyz[2] + b.xyz[2] );
////	out.normal[0] = 0.5f * ( a.normal[0] + b.normal[0] );
////	out.normal[1] = 0.5f * ( a.normal[1] + b.normal[1] );
////	out.normal[2] = 0.5f * ( a.normal[2] + b.normal[2] );
////	out.st[0] = 0.5f * ( a.st[0] + b.st[0] );
////	out.st[1] = 0.5f * ( a.st[1] + b.st[1] );
////}
////
/////*
////=================
////idSurface_Patch::GenerateNormals
////
////Handles all the complicated wrapping and degenerate cases
////Expects a Not expanded patch.
////=================
////*/
////#define	COPLANAR_EPSILON	0.1f
////
////void idSurface_Patch::GenerateNormals( void ) {
////	int			i, j, k, dist;
////	idVec3		norm;
////	idVec3		sum;
////	int			count;
////	idVec3		base;
////	idVec3		delta;
////	int			x, y;
////	idVec3		around[8], temp;
////	bool		good[8];
////	bool		wrapWidth, wrapHeight;
////	static int	neighbors[8][2] = {
////		{0,1}, {1,1}, {1,0}, {1,-1}, {0,-1}, {-1,-1}, {-1,0}, {-1,1}
////	};
////
////	assert( this.expanded == false );
////
////	//
////	// if all points are coplanar, set all normals to that plane
////	//
////	idVec3		extent[3];
////	float		offset;
////	
////	extent[0] = this.verts[this.width - 1].xyz - this.verts[0].xyz;
////	extent[1] = this.verts[(this.height-1) * this.width + this.width - 1].xyz - this.verts[0].xyz;
////	extent[2] = this.verts[(this.height-1) * this.width].xyz - this.verts[0].xyz;
////
////	norm = extent[0].Cross( extent[1] );
////	if ( norm.LengthSqr() == 0.0f ) {
////		norm = extent[0].Cross( extent[2] );
////		if ( norm.LengthSqr() == 0.0f ) {
////			norm = extent[1].Cross( extent[2] );
////		}
////	}
////
////	// wrapped patched may not get a valid normal here
////	if ( norm.Normalize() != 0.0f ) {
////
////		offset = this.verts[0].xyz * norm;
////		for ( i = 1; i < this.width * this.height; i++ ) {
////			float d = this.verts[i].xyz * norm;
////			if ( idMath::Fabs( d - offset ) > COPLANAR_EPSILON ) {
////				break;
////			}
////		}
////
////		if ( i == this.width * this.height ) {
////			// all are coplanar
////			for ( i = 0; i < this.width * this.height; i++ ) {
////				this.verts[i].normal = norm;
////			}
////			return;
////		}
////	}
////
////	// check for wrapped edge cases, which should smooth across themselves
////	wrapWidth = false;
////	for ( i = 0; i < this.height; i++ ) {
////		delta = this.verts[i * this.width].xyz - this.verts[i * this.width + this.width-1].xyz;
////		if ( delta.LengthSqr() > Square( 1.0f ) ) {
////			break;
////		}
////	}
////	if ( i == this.height ) {
////		wrapWidth = true;
////	}
////
////	wrapHeight = false;
////	for ( i = 0; i < this.width; i++ ) {
////		delta = this.verts[i].xyz - this.verts[(this.height-1) * this.width + i].xyz;
////		if ( delta.LengthSqr() > Square( 1.0f ) ) {
////			break;
////		}
////	}
////	if ( i == this.width ) {
////		wrapHeight = true;
////	}
////
////	for ( i = 0; i < this.width; i++ ) {
////		for ( j = 0; j < this.height; j++ ) {
////			count = 0;
////			base = this.verts[j * this.width + i].xyz;
////			for ( k = 0; k < 8; k++ ) {
////				around[k] = vec3_origin;
////				good[k] = false;
////
////				for ( dist = 1; dist <= 3; dist++ ) {
////					x = i + neighbors[k][0] * dist;
////					y = j + neighbors[k][1] * dist;
////					if ( wrapWidth ) {
////						if ( x < 0 ) {
////							x = this.width - 1 + x;
////						} else if ( x >= this.width ) {
////							x = 1 + x - this.width;
////						}
////					}
////					if ( wrapHeight ) {
////						if ( y < 0 ) {
////							y = this.height - 1 + y;
////						} else if ( y >= this.height ) {
////							y = 1 + y - this.height;
////						}
////					}
////
////					if ( x < 0 || x >= this.width || y < 0 || y >= this.height ) {
////						break;					// edge of patch
////					}
////					temp = this.verts[y * this.width + x].xyz - base;
////					if ( temp.Normalize() == 0.0f ) {
////						continue;				// degenerate edge, get more dist
////					} else {
////						good[k] = true;
////						around[k] = temp;
////						break;					// good edge
////					}
////				}
////			}
////
////			sum = vec3_origin;
////			for ( k = 0; k < 8; k++ ) {
////				if ( !good[k] || !good[(k+1)&7] ) {
////					continue;	// didn't get two points
////				}
////				norm = around[(k+1)&7].Cross( around[k] );
////				if ( norm.Normalize() == 0.0f ) {
////					continue;
////				}
////				sum += norm;
////				count++;
////			}
////			if ( count == 0 ) {
////				//idLib::common.Printf("bad normal\n");
////				count = 1;
////			}
////			this.verts[j * this.width + i].normal = sum;
////			this.verts[j * this.width + i].normal.Normalize();
////		}
////	}
////}
////
/////*
////=================
////idSurface_Patch::GenerateIndexes
////=================
////*/
////void idSurface_Patch::GenerateIndexes( void ) {
////	int i, j, v1, v2, v3, v4, index;
////
////	indexes.SetNum( (this.width-1) * (this.height-1) * 2 * 3, false );
////	index = 0;
////	for ( i = 0; i < this.width - 1; i++ ) {
////		for ( j = 0; j < this.height - 1; j++ ) {
////			v1 = j * this.width + i;
////			v2 = v1 + 1;
////			v3 = v1 + this.width + 1;
////			v4 = v1 + this.width;
////			indexes[index++] = v1;
////			indexes[index++] = v3;
////			indexes[index++] = v2;
////			indexes[index++] = v1;
////			indexes[index++] = v4;
////			indexes[index++] = v3;
////		}
////	}
////
////	GenerateEdgeIndexes();
////}
////
/////*
////===============
////idSurface_Patch::SampleSinglePatchPoint
////===============
////*/
////void idSurface_Patch::SampleSinglePatchPoint( const idDrawVert ctrl[3][3], float u, float v, idDrawVert *out ) const {
////	float	vCtrl[3][8];
////	int		vPoint;
////	int		axis;
////
////	// find the control points for the v coordinate
////	for ( vPoint = 0; vPoint < 3; vPoint++ ) {
////		for ( axis = 0; axis < 8; axis++ ) {
////			float a, b, c;
////			float qA, qB, qC;
////			if ( axis < 3 ) {
////				a = ctrl[0][vPoint].xyz[axis];
////				b = ctrl[1][vPoint].xyz[axis];
////				c = ctrl[2][vPoint].xyz[axis];
////			} else if ( axis < 6 ) {
////				a = ctrl[0][vPoint].normal[axis-3];
////				b = ctrl[1][vPoint].normal[axis-3];
////				c = ctrl[2][vPoint].normal[axis-3];
////			} else {
////				a = ctrl[0][vPoint].st[axis-6];
////				b = ctrl[1][vPoint].st[axis-6];
////				c = ctrl[2][vPoint].st[axis-6];
////			}
////			qA = a - 2.0f * b + c;
////			qB = 2.0f * b - 2.0f * a;
////			qC = a;
////			vCtrl[vPoint][axis] = qA * u * u + qB * u + qC;
////		}
////	}
////
////	// interpolate the v value
////	for ( axis = 0; axis < 8; axis++ ) {
////		float a, b, c;
////		float qA, qB, qC;
////
////		a = vCtrl[0][axis];
////		b = vCtrl[1][axis];
////		c = vCtrl[2][axis];
////		qA = a - 2.0f * b + c;
////		qB = 2.0f * b - 2.0f * a;
////		qC = a;
////
////		if ( axis < 3 ) {
////			out.xyz[axis] = qA * v * v + qB * v + qC;
////		} else if ( axis < 6 ) {
////			out.normal[axis-3] = qA * v * v + qB * v + qC;
////		} else {
////			out.st[axis-6] = qA * v * v + qB * v + qC;
////		}
////	}
////}
////
/////*
////===================
////idSurface_Patch::SampleSinglePatch
////===================
////*/
////void idSurface_Patch::SampleSinglePatch( const idDrawVert ctrl[3][3], int baseCol, int baseRow, int width, int horzSub, int vertSub, idDrawVert *outVerts ) const {
////	int		i, j;
////	float	u, v;
////
////	horzSub++;
////	vertSub++;
////	for ( i = 0; i < horzSub; i++ ) {
////		for ( j = 0; j < vertSub; j++ ) {
////			u = (float) i / ( horzSub - 1 );
////			v = (float) j / ( vertSub - 1 );
////			SampleSinglePatchPoint( ctrl, u, v, &outVerts[((baseRow + j) * width) + i + baseCol] );
////		}
////	}
////}
////
/////*
////=================
////idSurface_Patch::SubdivideExplicit
////=================
////*/
////void idSurface_Patch::SubdivideExplicit( int horzSubdivisions, int vertSubdivisions, bool genNormals, bool removeLinear ) {
////	int i, j, k, l;
////	idDrawVert sample[3][3];
////	int outWidth = ((this.width - 1) / 2 * horzSubdivisions) + 1;
////	int outHeight = ((this.height - 1) / 2 * vertSubdivisions) + 1;
////	idDrawVert *dv = new idDrawVert[ outWidth * outHeight ];
////
////	// generate normals for the control mesh
////	if ( genNormals ) {
////		GenerateNormals();
////	}
////
////	int baseCol = 0;
////	for ( i = 0; i + 2 < this.width; i += 2 ) {
////		int baseRow = 0;
////		for ( j = 0; j + 2 < this.height; j += 2 ) {
////			for ( k = 0; k < 3; k++ ) {
////				for ( l = 0; l < 3; l++ ) {
////					sample[k][l] = this.verts[ ((j + l) * this.width) + i + k ];
////				}
////			}
////			SampleSinglePatch( sample, baseCol, baseRow, outWidth, horzSubdivisions, vertSubdivisions, dv );
////			baseRow += vertSubdivisions;
////		}
////		baseCol += horzSubdivisions;
////	}
////	this.verts.SetNum( outWidth * outHeight );
////	for ( i = 0; i < outWidth * outHeight; i++ ) {
////		this.verts[i] = dv[i];
////	}
////
////	delete[] dv;
////
////	this.width = this.maxWidth = outWidth;
////	this.height = this.maxHeight = outHeight;
////	this.expanded = false;
////
////	if ( removeLinear ) {
////		Expand();
////		RemoveLinearColumnsRows();
////		Collapse();
////	}
////
////	// normalize all the lerped normals
////	if ( genNormals ) {
////		for ( i = 0; i < this.width * this.height; i++ ) {
////			this.verts[i].normal.Normalize();
////		}
////	}
////
////	GenerateIndexes();
////}
////
/////*
////=================
////idSurface_Patch::Subdivide
////=================
////*/
////void idSurface_Patch::Subdivide( float maxHorizontalError, float maxVerticalError, float maxLength, bool genNormals ) {
////	int			i, j, k, l;
////	idDrawVert	prev, next, mid;
////	idVec3		prevxyz, nextxyz, midxyz;
////	idVec3		delta;
////	float		maxHorizontalErrorSqr, maxVerticalErrorSqr, maxLengthSqr;
////
////	// generate normals for the control mesh
////	if ( genNormals ) {
////		GenerateNormals();
////	}
////
////	maxHorizontalErrorSqr = Square( maxHorizontalError );
////	maxVerticalErrorSqr = Square( maxVerticalError );
////	maxLengthSqr = Square( maxLength );
////
////	Expand();
////
////	// horizontal subdivisions
////	for ( j = 0; j + 2 < this.width; j += 2 ) {
////		// check subdivided midpoints against control points
////		for ( i = 0; i < this.height; i++ ) {
////			for ( l = 0; l < 3; l++ ) {
////				prevxyz[l] = this.verts[i*this.maxWidth + j+1].xyz[l] - this.verts[i*this.maxWidth + j  ].xyz[l];
////				nextxyz[l] = this.verts[i*this.maxWidth + j+2].xyz[l] - this.verts[i*this.maxWidth + j+1].xyz[l];
////				midxyz[l] = (this.verts[i*this.maxWidth + j  ].xyz[l] + this.verts[i*this.maxWidth + j+1].xyz[l] * 2.0f +
////														   this.verts[i*this.maxWidth + j+2].xyz[l] ) * 0.25f;
////			}
////
////			if ( maxLength > 0.0f ) {
////				// if the span length is too long, force a subdivision
////				if ( prevxyz.LengthSqr() > maxLengthSqr || nextxyz.LengthSqr() > maxLengthSqr ) {
////					break;
////				}
////			}
////			// see if this midpoint is off far enough to subdivide
////			delta = this.verts[i*this.maxWidth + j+1].xyz - midxyz;
////			if ( delta.LengthSqr() > maxHorizontalErrorSqr ) {
////				break;
////			}
////		}
////
////		if ( i == this.height ) {
////			continue;	// didn't need subdivision
////		}
////
////		if ( this.width + 2 >= this.maxWidth ) {
////			ResizeExpanded( this.maxHeight, this.maxWidth + 4 );
////		}
////
////		// insert two columns and replace the peak
////		this.width += 2;
////
////		for ( i = 0; i < this.height; i++ ) {
////			idSurface_Patch::LerpVert( this.verts[i*this.maxWidth + j  ], this.verts[i*this.maxWidth + j+1], prev );
////			idSurface_Patch::LerpVert( this.verts[i*this.maxWidth + j+1], this.verts[i*this.maxWidth + j+2], next );
////			idSurface_Patch::LerpVert( prev, next, mid );
////
////			for ( k = this.width - 1; k > j + 3; k-- ) {
////				this.verts[i*this.maxWidth + k] = this.verts[i*this.maxWidth + k-2];
////			}
////			this.verts[i*this.maxWidth + j+1] = prev;
////			this.verts[i*this.maxWidth + j+2] = mid;
////			this.verts[i*this.maxWidth + j+3] = next;
////		}
////
////		// back up and recheck this set again, it may need more subdivision
////		j -= 2;
////	}
////
////	// vertical subdivisions
////	for ( j = 0; j + 2 < this.height; j += 2 ) {
////		// check subdivided midpoints against control points
////		for ( i = 0; i < this.width; i++ ) {
////			for ( l = 0; l < 3; l++ ) {
////				prevxyz[l] = this.verts[(j+1)*this.maxWidth + i].xyz[l] - this.verts[j*this.maxWidth + i].xyz[l];
////				nextxyz[l] = this.verts[(j+2)*this.maxWidth + i].xyz[l] - this.verts[(j+1)*this.maxWidth + i].xyz[l];
////				midxyz[l] = (this.verts[j*this.maxWidth + i].xyz[l] + this.verts[(j+1)*this.maxWidth + i].xyz[l] * 2.0f +
////														this.verts[(j+2)*this.maxWidth + i].xyz[l] ) * 0.25f;
////			}
////
////			if ( maxLength > 0.0f ) {
////				// if the span length is too long, force a subdivision
////				if ( prevxyz.LengthSqr() > maxLengthSqr || nextxyz.LengthSqr() > maxLengthSqr ) {
////					break;
////				}
////			}
////			// see if this midpoint is off far enough to subdivide
////			delta = this.verts[(j+1)*this.maxWidth + i].xyz - midxyz;
////			if ( delta.LengthSqr() > maxVerticalErrorSqr ) {
////				break;
////			}
////		}
////
////		if ( i == this.width ) {
////			continue;	// didn't need subdivision
////		}
////
////		if ( this.height + 2 >= this.maxHeight ) {
////			ResizeExpanded( this.maxHeight + 4, this.maxWidth );
////		}
////
////		// insert two columns and replace the peak
////		this.height += 2;
////
////		for ( i = 0; i < this.width; i++ ) {
////			LerpVert( this.verts[j*this.maxWidth + i], this.verts[(j+1)*this.maxWidth + i], prev );
////			LerpVert( this.verts[(j+1)*this.maxWidth + i], this.verts[(j+2)*this.maxWidth + i], next );
////			LerpVert( prev, next, mid );
////
////			for ( k = this.height - 1; k > j + 3; k-- ) {
////				this.verts[k*this.maxWidth + i] = this.verts[(k-2)*this.maxWidth + i];
////			}
////			this.verts[(j+1)*this.maxWidth + i] = prev;
////			this.verts[(j+2)*this.maxWidth + i] = mid;
////			this.verts[(j+3)*this.maxWidth + i] = next;
////		}
////
////		// back up and recheck this set again, it may need more subdivision
////		j -= 2;
////	}
////
////	PutOnCurve();
////
////	RemoveLinearColumnsRows();
////
////	Collapse();
////
////	// normalize all the lerped normals
////	if ( genNormals ) {
////		for ( i = 0; i < this.width * this.height; i++ ) {
////			this.verts[i].normal.Normalize();
////		}
////	}
////
////	GenerateIndexes();
////}
}