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
//#include "../idlib/precompiled.h"
//#pragma hdrstop
//
//#include "tr_local.h"
//#ifdef __ppc__
//#include <vecLib/vecLib.h>
//#endif
//#if defined(MACOS_X) && defined(__i386__)
//#include <xmmintrin.h>
//#endif
//
////====================================================================

// moved idScreenRect funcs to tr_local.h.ts

//
///*
//======================
//R_ScreenRectFromViewFrustumBounds
//======================
//*/
//idScreenRect R_ScreenRectFromViewFrustumBounds( const idBounds &bounds ) {
//	idScreenRect screenRect;
//
//	screenRect.x1 = idMath::FtoiFast( 0.5f * ( 1.0f - bounds[1].y ) * ( tr.viewDef.viewport.x2 - tr.viewDef.viewport.x1 ) );
//	screenRect.x2 = idMath::FtoiFast( 0.5f * ( 1.0f - bounds[0].y ) * ( tr.viewDef.viewport.x2 - tr.viewDef.viewport.x1 ) );
//	screenRect.y1 = idMath::FtoiFast( 0.5f * ( 1.0f + bounds[0].z ) * ( tr.viewDef.viewport.y2 - tr.viewDef.viewport.y1 ) );
//	screenRect.y2 = idMath::FtoiFast( 0.5f * ( 1.0f + bounds[1].z ) * ( tr.viewDef.viewport.y2 - tr.viewDef.viewport.y1 ) );
//
//	if ( r_useDepthBoundsTest.GetInteger() ) {
//		R_TransformEyeZToWin( -bounds[0].x, tr.viewDef.projectionMatrix, screenRect.zmin );
//		R_TransformEyeZToWin( -bounds[1].x, tr.viewDef.projectionMatrix, screenRect.zmax );
//	}
//
//	return screenRect;
//}
//
///*
//======================
//R_ShowColoredScreenRect
//======================
//*/
//void R_ShowColoredScreenRect( const idScreenRect &rect, int colorIndex ) {
//	if ( !rect.IsEmpty() ) {
//		static idVec4 colors[] = { colorRed, colorGreen, colorBlue, colorYellow, colorMagenta, colorCyan, colorWhite, colorPurple };
//		tr.viewDef.renderWorld.DebugScreenRect( colors[colorIndex & 7], rect, tr.viewDef );
//	}
//}
//
/*
====================
R_ToggleSmpFrame
====================
*/
function R_ToggleSmpFrame(): void {
	if ( r_lockSurfaces.GetBool() ) {
		return;
	}
	R_FreeDeferredTriSurfs( frameData );

	// clear frame-temporary data
	var frame: frameData_t;
	var block: frameMemoryBlock_t;

	// update the highwater mark
	R_CountFrameData();	

	frame = frameData;

	// reset the memory allocation to the first block
	frame.alloc = frame.memory;

	// clear all the blocks
	for ( block = frame.memory ; block ; block = block.next ) {
		block.used = 0;
	}

	idRenderSystem.R_ClearCommandChain ( );
}


//=====================================================

var MEMORY_BLOCK_SIZE = 0x100000;

/*
=====================
R_ShutdownFrameData
=====================
*/
function R_ShutdownFrameData(): void {
	var frame: frameData_t;
	var block: frameMemoryBlock_t ;

	// free any current data
	frame = frameData;
	if ( !frame ) {
		return;
	}

	R_FreeDeferredTriSurfs( frame );

	var nextBlock: frameMemoryBlock_t;
	for ( block = frame.memory ; block ; block = nextBlock ) {
		nextBlock = block.next;
		Mem_Free( block );
	}
	Mem_Free( frame );
	frameData = null;
}

/*
=====================
R_InitFrameData
=====================
*/
function R_InitFrameData( ):void {
	var /*int */size:number;
	var frame: frameData_t ;
	var block: frameMemoryBlock_t;

	R_ShutdownFrameData();

	frameData = new frameData_t ( );//frameData_t *)Mem_ClearedAlloc( sizeof( *frameData ));
	frame = frameData;
	size = MEMORY_BLOCK_SIZE;
	block = new frameMemoryBlock_t;//(frameMemoryBlock_t *)Mem_Alloc( size + sizeof( *block ) );
	if ( !block ) {
		common.FatalError( "R_InitFrameData: Mem_Alloc() failed" );
	}
	block.size = size;
	block.used = 0;
	block.next = null;
	frame.memory = block;
	frame.memoryHighwater = 0;

	R_ToggleSmpFrame();
}

/*
================
R_CountFrameData
================
*/
function R_CountFrameData ( ): /*int*/number {
	var frame: frameData_t;
	var block: frameMemoryBlock_t;
	var /*int*/count: number;

	count = 0;
	frame = frameData;
	for ( block = frame.memory; block; block = block.next ) {
		count += block.used;
		if ( block == frame.alloc ) {
			break;
		}
	}

	// note if this is a new highwater mark
	if ( count > frame.memoryHighwater ) {
		frame.memoryHighwater = count;
	}

	return count;
}
//
/*
=================
R_StaticAlloc
=================
*/

function R_StaticAlloc ( /*int */bytes: number ): Uint8Array {
	var buf: Uint8Array;

	tr.pc.c_alloc++; // some of these were missed out so tr.pc.c_alloc won't match up with original

	tr.staticAllocCount += bytes;

	buf = new Uint8Array( bytes );

	//// don't exit on failure on zero length allocations since the old code didn't
	//if ( !buf && ( bytes != 0 ) ) {
	//	common.FatalError( "R_StaticAlloc failed on %i bytes", bytes );
	//}
	return buf;
}

/*
=================
R_ClearedStaticAlloc
=================
*/
function R_ClearedStaticAlloc ( /*int */bytes: number ): Uint8Array {
	var buf: Uint8Array;

	buf = R_StaticAlloc( bytes );
	//SIMDProcessor.Memset( buf, 0, bytes );
	return buf;
}

/*
=================
R_StaticFree
=================
*/
function R_StaticFree( /*void **/data:any ):void {
	tr.pc.c_free++;
    Mem_Free( data );
}

/*
================
R_FrameAlloc

This data will be automatically freed when the
current frame's back end completes.

This should only be called by the front end.  The
back end shouldn't need to allocate memory.

If we passed smpFrame in, the back end could
alloc memory, because it will always be a
different frameData than the front end is using.

All temporary data, like dynamic tesselations
and local spaces are allocated here.

The memory will not move, but it may not be
contiguous with previous allocations even
from this frame.

The memory is NOT zero filled.
Should part of this be inlined in a macro?
================
*/
function R_FrameAllocStructArray<T> ( type: any, arraySize: number ):Array<T> {
	todo( "R_FrameAlloc ??" );
	for ( var i = 0; i < arraySize; i++ ) {

	}
	return newStructArray<T>( type, arraySize );
}

function R_FrameAllocTypedArray<T> ( type: any, arraySize: number ):T {
	todo( "R_FrameAlloc ??" );
	return new type( arraySize );
}

function R_FrameAlloc<T>(type: any /*int bytes */) {
	todo("R_FrameAlloc ??");
	return <T>new type;
	//frameData_t		*frame;
	//frameMemoryBlock_t	*block;
	//void			*buf;

	//bytes = (bytes+16)&~15;
	//// see if it can be satisfied in the current block
	//frame = frameData;
	//block = frame.alloc;

	//if ( block.size - block.used >= bytes ) {
	//	buf = block.base + block.used;
	//	block.used += bytes;
	//	return buf;
	//}

	//// advance to the next memory block if available
	//block = block.next;
	//// create a new block if we are at the end of
	//// the chain
	//if ( !block ) {
	//	int		size;

	//	size = MEMORY_BLOCK_SIZE;
	//	block = (frameMemoryBlock_t *)Mem_Alloc( size + sizeof( *block ) );
	//	if ( !block ) {
	//		common.FatalError( "R_FrameAlloc: Mem_Alloc() failed" );
	//	}
	//	block.size = size;
	//	block.used = 0;
	//	block.next = NULL;
	//	frame.alloc.next = block;
	//}

	//// we could fix this if we needed to...
	//if ( bytes > block.size ) {
	//	common.FatalError( "R_FrameAlloc of %i exceeded MEMORY_BLOCK_SIZE",
	//		bytes );
	//}

	//frame.alloc = block;

	//block.used = bytes;

	//return block.base;
}

/*
==================
R_ClearedFrameAlloc
==================
*/
function R_ClearedFrameAlloc<T> ( type: any, /*int */bytes__Unused: number ): T {
	var r = <T>new type;
	( <any>r ).memset0 ( );
	return r;
	//void	*r;

	//r = R_FrameAlloc( bytes );
	//SIMDProcessor.Memset( r, 0, bytes );
	//return r;
}

//
///*
//==================
//R_FrameFree
//
//This does nothing at all, as the frame data is reused every frame
//and can only be stack allocated.
//
//The only reason for it's existance is so functions that can
//use either static or frame memory can set function pointers
//to both alloc and free.
//==================
//*/
//void R_FrameFree( void *data ) {
//}



//==========================================================================

function R_AxisToModelMatrix ( axis: idMat3, origin: idVec3, /*float */modelMatrix: Float32Array /*[16]*/ ): void {
	modelMatrix[0] = axis[0][0];
	modelMatrix[4] = axis[1][0];
	modelMatrix[8] = axis[2][0];
	modelMatrix[12] = origin[0];

	modelMatrix[1] = axis[0][1];
	modelMatrix[5] = axis[1][1];
	modelMatrix[9] = axis[2][1];
	modelMatrix[13] = origin[1];

	modelMatrix[2] = axis[0][2];
	modelMatrix[6] = axis[1][2];
	modelMatrix[10] = axis[2][2];
	modelMatrix[14] = origin[2];

	modelMatrix[3] = 0;
	modelMatrix[7] = 0;
	modelMatrix[11] = 0;
	modelMatrix[15] = 1;
}


// FIXME: these assume no skewing or scaling transforms

function R_LocalPointToGlobal ( modelMatrix: Float32Array /*[16]*/, $in: idVec3, out: idVec3 ): void {
//#if defined(MACOS_X) && defined(__i386__)
//	__m128 m0, m1, m2, m3;
//	__m128 in0, in1, in2;
//	float i0,i1,i2;
//	i0 = in[0];
//	i1 = in[1];
//	i2 = in[2];

//	m0 = _mm_loadu_ps(&modelMatrix[0]);
//	m1 = _mm_loadu_ps(&modelMatrix[4]);
//	m2 = _mm_loadu_ps(&modelMatrix[8]);
//	m3 = _mm_loadu_ps(&modelMatrix[12]);

//	in0 = _mm_load1_ps(&i0);
//	in1 = _mm_load1_ps(&i1);
//	in2 = _mm_load1_ps(&i2);

//	m0 = _mm_mul_ps(m0, in0);
//	m1 = _mm_mul_ps(m1, in1);
//	m2 = _mm_mul_ps(m2, in2);

//	m0 = _mm_add_ps(m0, m1);
//	m0 = _mm_add_ps(m0, m2);
//	m0 = _mm_add_ps(m0, m3);

//	_mm_store_ss(&out[0], m0);
//	m1 = (__m128) _mm_shuffle_epi32((__m128i)m0, 0x55);
//	_mm_store_ss(&out[1], m1);
//	m2 = _mm_movehl_ps(m2, m0);
//	_mm_store_ss(&out[2], m2);
//#else	
	out[0] = $in[0] * modelMatrix[0] + $in[1] * modelMatrix[4]
		+ $in[2] * modelMatrix[8] + modelMatrix[12];
	out[1] = $in[0] * modelMatrix[1] + $in[1] * modelMatrix[5]
		+ $in[2] * modelMatrix[9] + modelMatrix[13];
	out[2] = $in[0] * modelMatrix[2] + $in[1] * modelMatrix[6]
		+ $in[2] * modelMatrix[10] + modelMatrix[14];
//#endif
}

//void R_PointTimesMatrix( const float modelMatrix[16], const idVec4 &in, idVec4 &out ) {
//	out[0] = in[0] * modelMatrix[0] + in[1] * modelMatrix[4]
//		+ in[2] * modelMatrix[8] + modelMatrix[12];
//	out[1] = in[0] * modelMatrix[1] + in[1] * modelMatrix[5]
//		+ in[2] * modelMatrix[9] + modelMatrix[13];
//	out[2] = in[0] * modelMatrix[2] + in[1] * modelMatrix[6]
//		+ in[2] * modelMatrix[10] + modelMatrix[14];
//	out[3] = in[0] * modelMatrix[3] + in[1] * modelMatrix[7]
//		+ in[2] * modelMatrix[11] + modelMatrix[15];
//}

function R_GlobalPointToLocal( /*const float*/ modelMatrix: Float32Array /*[16]*/, $in: idVec3, out: idVec3 ): void {
	var temp = new idVec3;

	VectorSubtract( $in, modelMatrix.subarray(12), temp );

	out[0] = DotProduct( temp, modelMatrix );
	out[1] = DotProduct( temp, modelMatrix.subarray(4) );
	out[2] = DotProduct( temp, modelMatrix.subarray(8) );
}
//
//void R_LocalVectorToGlobal( const float modelMatrix[16], const idVec3 &in, idVec3 &out ) {
//	out[0] = in[0] * modelMatrix[0] + in[1] * modelMatrix[4]
//		+ in[2] * modelMatrix[8];
//	out[1] = in[0] * modelMatrix[1] + in[1] * modelMatrix[5]
//		+ in[2] * modelMatrix[9];
//	out[2] = in[0] * modelMatrix[2] + in[1] * modelMatrix[6]
//		+ in[2] * modelMatrix[10];
//}
//
//void R_GlobalVectorToLocal( const float modelMatrix[16], const idVec3 &in, idVec3 &out ) {
//	out[0] = DotProduct( in, &modelMatrix[0] );
//	out[1] = DotProduct( in, &modelMatrix[4] );
//	out[2] = DotProduct( in, &modelMatrix[8] );
//}
//
//void R_GlobalPlaneToLocal( const float modelMatrix[16], const idPlane &in, idPlane &out ) {
//	out[0] = DotProduct( in, &modelMatrix[0] );
//	out[1] = DotProduct( in, &modelMatrix[4] );
//	out[2] = DotProduct( in, &modelMatrix[8] );
//	out[3] = in[3] + modelMatrix[12] * in[0] + modelMatrix[13] * in[1] + modelMatrix[14] * in[2];
//}
//
//void R_LocalPlaneToGlobal( const float modelMatrix[16], const idPlane &in, idPlane &out ) {
//	float	offset;
//
//	R_LocalVectorToGlobal( modelMatrix, in.Normal(), out.Normal() );
//
//	offset = modelMatrix[12] * out[0] + modelMatrix[13] * out[1] + modelMatrix[14] * out[2];
//	out[3] = in[3] - offset;
//}
//
//// transform Z in eye coordinates to window coordinates
//void R_TransformEyeZToWin( float src_z, const float *projectionMatrix, float &dst_z ) {
//	float clip_z, clip_w;
//
//	// projection
//	clip_z = src_z * projectionMatrix[ 2 + 2 * 4 ] + projectionMatrix[ 2 + 3 * 4 ];
//	clip_w = src_z * projectionMatrix[ 3 + 2 * 4 ] + projectionMatrix[ 3 + 3 * 4 ];
//
//	if ( clip_w <= 0.0 ) {
//		dst_z = 0.0;					// clamp to near plane
//	} else {
//		dst_z = clip_z / clip_w;
//		dst_z = dst_z * 0.5f + 0.5f;	// convert to window coords
//	}
//}
//
///*
//=================
//R_RadiusCullLocalBox
//
//A fast, conservative center-to-corner culling test
//Returns true if the box is outside the given global frustum, (positive sides are out)
//=================
//*/
//bool R_RadiusCullLocalBox( const idBounds &bounds, const float modelMatrix[16], int numPlanes, const idPlane *planes ) {
//	int			i;
//	float		d;
//	idVec3		worldOrigin;
//	float		worldRadius;
//	const idPlane	*frust;
//
//	if ( r_useCulling.GetInteger() == 0 ) {
//		return false;
//	}
//
//	// transform the surface bounds into world space
//	idVec3	localOrigin = ( bounds[0] + bounds[1] ) * 0.5;
//
//	R_LocalPointToGlobal( modelMatrix, localOrigin, worldOrigin );
//
//	worldRadius = (bounds[0] - localOrigin).Length();	// FIXME: won't be correct for scaled objects
//
//	for ( i = 0 ; i < numPlanes ; i++ ) {
//		frust = planes + i;
//		d = frust.Distance( worldOrigin );
//		if ( d > worldRadius ) {
//			return true;	// culled
//		}
//	}
//
//	return false;		// no culled
//}
//
///*
//=================
//R_CornerCullLocalBox
//
//Tests all corners against the frustum.
//Can still generate a few false positives when the box is outside a corner.
//Returns true if the box is outside the given global frustum, (positive sides are out)
//=================
//*/
//bool R_CornerCullLocalBox( const idBounds &bounds, const float modelMatrix[16], int numPlanes, const idPlane *planes ) {
//	int			i, j;
//	idVec3		transformed[8];
//	float		dists[8];
//	idVec3		v;
//	const idPlane *frust;
//
//	// we can disable box culling for experimental timing purposes
//	if ( r_useCulling.GetInteger() < 2 ) {
//		return false;
//	}
//
//	// transform into world space
//	for ( i = 0 ; i < 8 ; i++ ) {
//		v[0] = bounds[i&1][0];
//		v[1] = bounds[(i>>1)&1][1];
//		v[2] = bounds[(i>>2)&1][2];
//
//		R_LocalPointToGlobal( modelMatrix, v, transformed[i] );
//	}
//
//	// check against frustum planes
//	for ( i = 0 ; i < numPlanes ; i++ ) {
//		frust = planes + i;
//		for ( j = 0 ; j < 8 ; j++ ) {
//			dists[j] = frust.Distance( transformed[j] );
//			if ( dists[j] < 0 ) {
//				break;
//			}
//		}
//		if ( j == 8 ) {
//			// all points were behind one of the planes
//			tr.pc.c_box_cull_out++;
//			return true;
//		}
//	}
//
//	tr.pc.c_box_cull_in++;
//
//	return false;		// not culled
//}
//
///*
//=================
//R_CullLocalBox
//
//Performs quick test before expensive test
//Returns true if the box is outside the given global frustum, (positive sides are out)
//=================
//*/
//bool R_CullLocalBox( const idBounds &bounds, const float modelMatrix[16], int numPlanes, const idPlane *planes ) {
//	if ( R_RadiusCullLocalBox( bounds, modelMatrix, numPlanes, planes ) ) {
//		return true;
//	}
//	return R_CornerCullLocalBox( bounds, modelMatrix, numPlanes, planes );
//}
//
///*
//==========================
//R_TransformModelToClip
//==========================
//*/
//void R_TransformModelToClip( const idVec3 &src, const float *modelMatrix, const float *projectionMatrix, idPlane &eye, idPlane &dst ) {
//	var/*int*/i:number;
//
//	for ( i = 0 ; i < 4 ; i++ ) {
//		eye[i] = 
//			src[0] * modelMatrix[ i + 0 * 4 ] +
//			src[1] * modelMatrix[ i + 1 * 4 ] +
//			src[2] * modelMatrix[ i + 2 * 4 ] +
//			1 * modelMatrix[ i + 3 * 4 ];
//	}
//
//	for ( i = 0 ; i < 4 ; i++ ) {
//		dst[i] = 
//			eye[0] * projectionMatrix[ i + 0 * 4 ] +
//			eye[1] * projectionMatrix[ i + 1 * 4 ] +
//			eye[2] * projectionMatrix[ i + 2 * 4 ] +
//			eye[3] * projectionMatrix[ i + 3 * 4 ];
//	}
//}
//
///*
//==========================
//R_GlobalToNormalizedDeviceCoordinates
//
//-1 to 1 range in x, y, and z
//==========================
//*/
//void R_GlobalToNormalizedDeviceCoordinates( const idVec3 &global, idVec3 &ndc ) {
//	int		i;
//	idPlane	view;
//	idPlane	clip;
//
//	// _D3XP added work on primaryView when no viewDef
//	if ( !tr.viewDef ) {
//
//		for ( i = 0 ; i < 4 ; i ++ ) {
//			view[i] = 
//				global[0] * tr.primaryView.worldSpace.modelViewMatrix[ i + 0 * 4 ] +
//				global[1] * tr.primaryView.worldSpace.modelViewMatrix[ i + 1 * 4 ] +
//				global[2] * tr.primaryView.worldSpace.modelViewMatrix[ i + 2 * 4 ] +
//					tr.primaryView.worldSpace.modelViewMatrix[ i + 3 * 4 ];
//		}
//
//		for ( i = 0 ; i < 4 ; i ++ ) {
//			clip[i] = 
//				view[0] * tr.primaryView.projectionMatrix[ i + 0 * 4 ] +
//				view[1] * tr.primaryView.projectionMatrix[ i + 1 * 4 ] +
//				view[2] * tr.primaryView.projectionMatrix[ i + 2 * 4 ] +
//				view[3] * tr.primaryView.projectionMatrix[ i + 3 * 4 ];
//		}
//
//	} else {
//
//		for ( i = 0 ; i < 4 ; i ++ ) {
//			view[i] = 
//				global[0] * tr.viewDef.worldSpace.modelViewMatrix[ i + 0 * 4 ] +
//				global[1] * tr.viewDef.worldSpace.modelViewMatrix[ i + 1 * 4 ] +
//				global[2] * tr.viewDef.worldSpace.modelViewMatrix[ i + 2 * 4 ] +
//				tr.viewDef.worldSpace.modelViewMatrix[ i + 3 * 4 ];
//		}
//
//
//		for ( i = 0 ; i < 4 ; i ++ ) {
//			clip[i] = 
//				view[0] * tr.viewDef.projectionMatrix[ i + 0 * 4 ] +
//				view[1] * tr.viewDef.projectionMatrix[ i + 1 * 4 ] +
//				view[2] * tr.viewDef.projectionMatrix[ i + 2 * 4 ] +
//				view[3] * tr.viewDef.projectionMatrix[ i + 3 * 4 ];
//		}
//
//	}
//
//	ndc[0] = clip[0] / clip[3];
//	ndc[1] = clip[1] / clip[3];
//	ndc[2] = ( clip[2] + clip[3] ) / ( 2 * clip[3] );
//}
//
///*
//==========================
//R_TransformClipToDevice
//
//Clip to normalized device coordinates
//==========================
//*/
//void R_TransformClipToDevice( const idPlane &clip, const viewDef_t *view, idVec3 &normalized ) {
//	normalized[0] = clip[0] / clip[3];
//	normalized[1] = clip[1] / clip[3];
//	normalized[2] = clip[2] / clip[3];
//}
//

/*
==========================
myGlMultMatrix
==========================
*/
function myGlMultMatrix ( a: Float32Array /*[16]*/, b: Float32Array /*[16]*/, out: Float32Array /*[16]*/ ): void {
	var /*int		*/i: number, j: number;

	for ( i = 0; i < 4; i++ ) {
		for ( j = 0; j < 4; j++ ) {
			out[i * 4 + j] =
				a[i * 4 + 0] * b[0 * 4 + j]
				+ a[i * 4 + 1] * b[1 * 4 + j]
				+ a[i * 4 + 2] * b[2 * 4 + j]
				+ a[i * 4 + 3] * b[3 * 4 + j];
		}
	}
}

///*
//================
//R_TransposeGLMatrix
//================
//*/
//void R_TransposeGLMatrix( const float in[16], float out[16] ) {
//	int		i, j;
//
//	for ( i = 0 ; i < 4 ; i++ ) {
//		for ( j = 0 ; j < 4 ; j++ ) {
//			out[i*4+j] = in[j*4+i];
//		}
//	}
//}
//
///*
//=================
//R_SetViewMatrix
//
//Sets up the world to view matrix for a given viewParm
//=================
//*/
//void R_SetViewMatrix( viewDef_t *viewDef ) {
//	idVec3	origin;
//	viewEntity_t *world;
//	float	viewerMatrix[16];
//	static float	s_flipMatrix[16] = {
//		// convert from our coordinate system (looking down X)
//		// to OpenGL's coordinate system (looking down -Z)
//		0, 0, -1, 0,
//		-1, 0, 0, 0,
//		0, 1, 0, 0,
//		0, 0, 0, 1
//	};
//
//	world = &viewDef.worldSpace;
//
//	memset( world, 0, sizeof(*world) );
//
//	// the model matrix is an identity
//	world.modelMatrix[0*4+0] = 1;
//	world.modelMatrix[1*4+1] = 1;
//	world.modelMatrix[2*4+2] = 1;
//
//	// transform by the camera placement
//	origin = viewDef.renderView.vieworg;
//
//	viewerMatrix[0] = viewDef.renderView.viewaxis[0][0];
//	viewerMatrix[4] = viewDef.renderView.viewaxis[0][1];
//	viewerMatrix[8] = viewDef.renderView.viewaxis[0][2];
//	viewerMatrix[12] = -origin[0] * viewerMatrix[0] + -origin[1] * viewerMatrix[4] + -origin[2] * viewerMatrix[8];
//
//	viewerMatrix[1] = viewDef.renderView.viewaxis[1][0];
//	viewerMatrix[5] = viewDef.renderView.viewaxis[1][1];
//	viewerMatrix[9] = viewDef.renderView.viewaxis[1][2];
//	viewerMatrix[13] = -origin[0] * viewerMatrix[1] + -origin[1] * viewerMatrix[5] + -origin[2] * viewerMatrix[9];
//
//	viewerMatrix[2] = viewDef.renderView.viewaxis[2][0];
//	viewerMatrix[6] = viewDef.renderView.viewaxis[2][1];
//	viewerMatrix[10] = viewDef.renderView.viewaxis[2][2];
//	viewerMatrix[14] = -origin[0] * viewerMatrix[2] + -origin[1] * viewerMatrix[6] + -origin[2] * viewerMatrix[10];
//
//	viewerMatrix[3] = 0;
//	viewerMatrix[7] = 0;
//	viewerMatrix[11] = 0;
//	viewerMatrix[15] = 1;
//
//	// convert from our coordinate system (looking down X)
//	// to OpenGL's coordinate system (looking down -Z)
//	myGlMultMatrix( viewerMatrix, s_flipMatrix, world.modelViewMatrix );
//}
//
///*
//===============
//R_SetupProjection
//
//This uses the "infinite far z" trick
//===============
//*/
//void R_SetupProjection( void ) {
//	float	xmin, xmax, ymin, ymax;
//	float	width, height;
//	float	zNear;
//	float	jitterx, jittery;
//	static	idRandom random;
//
//	// random jittering is usefull when multiple
//	// frames are going to be blended together
//	// for motion blurred anti-aliasing
//	if ( r_jitter.GetBool() ) {
//		jitterx = random.RandomFloat();
//		jittery = random.RandomFloat();
//	} else {
//		jitterx = jittery = 0;
//	}
//
//	//
//	// set up projection matrix
//	//
//	zNear	= r_znear.GetFloat();
//	if ( tr.viewDef.renderView.cramZNear ) {
//		zNear *= 0.25;
//	}
//
//	ymax = zNear * tan( tr.viewDef.renderView.fov_y * idMath::PI / 360.0f );
//	ymin = -ymax;
//
//	xmax = zNear * tan( tr.viewDef.renderView.fov_x * idMath::PI / 360.0f );
//	xmin = -xmax;
//
//	width = xmax - xmin;
//	height = ymax - ymin;
//
//	jitterx = jitterx * width / ( tr.viewDef.viewport.x2 - tr.viewDef.viewport.x1 + 1 );
//	xmin += jitterx;
//	xmax += jitterx;
//	jittery = jittery * height / ( tr.viewDef.viewport.y2 - tr.viewDef.viewport.y1 + 1 );
//	ymin += jittery;
//	ymax += jittery;
//
//	tr.viewDef.projectionMatrix[0] = 2 * zNear / width;
//	tr.viewDef.projectionMatrix[4] = 0;
//	tr.viewDef.projectionMatrix[8] = ( xmax + xmin ) / width;	// normally 0
//	tr.viewDef.projectionMatrix[12] = 0;
//
//	tr.viewDef.projectionMatrix[1] = 0;
//	tr.viewDef.projectionMatrix[5] = 2 * zNear / height;
//	tr.viewDef.projectionMatrix[9] = ( ymax + ymin ) / height;	// normally 0
//	tr.viewDef.projectionMatrix[13] = 0;
//
//	// this is the far-plane-at-infinity formulation, and
//	// crunches the Z range slightly so w=0 vertexes do not
//	// rasterize right at the wraparound point
//	tr.viewDef.projectionMatrix[2] = 0;
//	tr.viewDef.projectionMatrix[6] = 0;
//	tr.viewDef.projectionMatrix[10] = -0.999f;
//	tr.viewDef.projectionMatrix[14] = -2.0f * zNear;
//
//	tr.viewDef.projectionMatrix[3] = 0;
//	tr.viewDef.projectionMatrix[7] = 0;
//	tr.viewDef.projectionMatrix[11] = -1;
//	tr.viewDef.projectionMatrix[15] = 0;
//}
//
///*
//=================
//R_SetupViewFrustum
//
//Setup that culling frustum planes for the current view
//FIXME: derive from modelview matrix times projection matrix
//=================
//*/
//static void R_SetupViewFrustum( void ) {
//	int		i;
//	float	xs, xc;
//	float	ang;
//
//	ang = DEG2RAD( tr.viewDef.renderView.fov_x ) * 0.5f;
//	idMath::SinCos( ang, xs, xc );
//
//	tr.viewDef.frustum[0] = xs * tr.viewDef.renderView.viewaxis[0] + xc * tr.viewDef.renderView.viewaxis[1];
//	tr.viewDef.frustum[1] = xs * tr.viewDef.renderView.viewaxis[0] - xc * tr.viewDef.renderView.viewaxis[1];
//
//	ang = DEG2RAD( tr.viewDef.renderView.fov_y ) * 0.5f;
//	idMath::SinCos( ang, xs, xc );
//
//	tr.viewDef.frustum[2] = xs * tr.viewDef.renderView.viewaxis[0] + xc * tr.viewDef.renderView.viewaxis[2];
//	tr.viewDef.frustum[3] = xs * tr.viewDef.renderView.viewaxis[0] - xc * tr.viewDef.renderView.viewaxis[2];
//
//	// plane four is the front clipping plane
//	tr.viewDef.frustum[4] = /* vec3_origin - */ tr.viewDef.renderView.viewaxis[0];
//
//	for ( i = 0; i < 5; i++ ) {
//		// flip direction so positive side faces out (FIXME: globally unify this)
//		tr.viewDef.frustum[i] = -tr.viewDef.frustum[i].Normal();
//		tr.viewDef.frustum[i][3] = -( tr.viewDef.renderView.vieworg * tr.viewDef.frustum[i].Normal() );
//	}
//
//	// eventually, plane five will be the rear clipping plane for fog
//
//	float dNear, dFar, dLeft, dUp;
//
//	dNear = r_znear.GetFloat();
//	if ( tr.viewDef.renderView.cramZNear ) {
//		dNear *= 0.25f;
//	}
//
//	dFar = MAX_WORLD_SIZE;
//	dLeft = dFar * tan( DEG2RAD( tr.viewDef.renderView.fov_x * 0.5f ) );
//	dUp = dFar * tan( DEG2RAD( tr.viewDef.renderView.fov_y * 0.5f ) );
//	tr.viewDef.viewFrustum.SetOrigin( tr.viewDef.renderView.vieworg );
//	tr.viewDef.viewFrustum.SetAxis( tr.viewDef.renderView.viewaxis );
//	tr.viewDef.viewFrustum.SetSize( dNear, dFar, dLeft, dUp );
//}
//
///*
//===================
//R_ConstrainViewFrustum
//===================
//*/
//static void R_ConstrainViewFrustum( void ) {
//	idBounds bounds;
//
//	// constrain the view frustum to the total bounds of all visible lights and visible entities
//	bounds.Clear();
//	for ( viewLight_t *vLight = tr.viewDef.viewLights; vLight; vLight = vLight.next ) {
//		bounds.AddBounds( vLight.lightDef.frustumTris.bounds );
//	}
//	for ( viewEntity_t *vEntity = tr.viewDef.viewEntitys; vEntity; vEntity = vEntity.next ) {
//		bounds.AddBounds( vEntity.entityDef.referenceBounds );
//	}
//	tr.viewDef.viewFrustum.ConstrainToBounds( bounds );
//
//	if ( r_useFrustumFarDistance.GetFloat() > 0.0 ) {
//		tr.viewDef.viewFrustum.MoveFarDistance( r_useFrustumFarDistance.GetFloat() );
//	}
//}
//
///*
//==========================================================================================
//
//DRAWSURF SORTING
//
//==========================================================================================
//*/
//
//
///*
//=======================
//R_QsortSurfaces
//
//=======================
//*/
//static int R_QsortSurfaces( const void *a, const void *b ) {
//	const drawSurf_t	*ea, *eb;
//
//	ea = *(drawSurf_t **)a;
//	eb = *(drawSurf_t **)b;
//
//	if ( ea.sort < eb.sort ) {
//		return -1;
//	}
//	if ( ea.sort > eb.sort ) {
//		return 1;
//	}
//	return 0;
//}
//
//
///*
//=================
//R_SortDrawSurfs
//=================
//*/
//static void R_SortDrawSurfs( void ) {
//	// sort the drawsurfs by sort type, then orientation, then shader
//	qsort( tr.viewDef.drawSurfs, tr.viewDef.numDrawSurfs, sizeof( tr.viewDef.drawSurfs[0] ),
//		R_QsortSurfaces );
//}
//
//
//
////========================================================================
//
//
////==============================================================================
//
//
//
///*
//================
//R_RenderView
//
//A view may be either the actual camera view,
//a mirror / remote location, or a 3D view on a gui surface.
//
//Parms will typically be allocated with R_FrameAlloc
//================
//*/
//void R_RenderView( viewDef_t *parms ) {
//	viewDef_t		*oldView;
//
//	if ( parms.renderView.width <= 0 || parms.renderView.height <= 0 ) {
//		return;
//	}
//
//	tr.viewCount++;
//
//	// save view in case we are a subview
//	oldView = tr.viewDef;
//
//	tr.viewDef = parms;
//
//	tr.sortOffset = 0;
//
//	// set the matrix for world space to eye space
//	R_SetViewMatrix( tr.viewDef );
//
//	// the four sides of the view frustum are needed
//	// for culling and portal visibility
//	R_SetupViewFrustum();
//
//	// we need to set the projection matrix before doing
//	// portal-to-screen scissor box calculations
//	R_SetupProjection();
//
//	// identify all the visible portalAreas, and the entityDefs and
//	// lightDefs that are in them and pass culling.
//	static_cast<idRenderWorldLocal *>(parms.renderWorld).FindViewLightsAndEntities();
//
//	// constrain the view frustum to the view lights and entities
//	R_ConstrainViewFrustum();
//
//	// make sure that interactions exist for all light / entity combinations
//	// that are visible
//	// add any pre-generated light shadows, and calculate the light shader values
//	R_AddLightSurfaces();
//
//	// adds ambient surfaces and create any necessary interaction surfaces to add to the light
//	// lists
//	R_AddModelSurfaces();
//
//	// any viewLight that didn't have visible surfaces can have it's shadows removed
//	R_RemoveUnecessaryViewLights();
//
//	// sort all the ambient surfaces for translucency ordering
//	R_SortDrawSurfs();
//
//	// generate any subviews (mirrors, cameras, etc) before adding this view
//	if ( R_GenerateSubViews() ) {
//		// if we are debugging subviews, allow the skipping of the
//		// main view draw
//		if ( r_subviewOnly.GetBool() ) {
//			return;
//		}
//	}
//
//	// write everything needed to the demo file
//	if ( session.writeDemo ) {
//		static_cast<idRenderWorldLocal *>(parms.renderWorld).WriteVisibleDefs( tr.viewDef );
//	}
//
//	// add the rendering commands for this viewDef
//	R_AddDrawViewCmd( parms );
//
//	// restore view in case we are a subview
//	tr.viewDef = oldView;
//}
