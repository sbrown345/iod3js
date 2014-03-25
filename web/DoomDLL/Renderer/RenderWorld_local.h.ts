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
//#ifndef __RENDERWORLDLOCAL_H__
//#define __RENDERWORLDLOCAL_H__
//
// assume any lightDef or entityDef index above this is an internal error
var LUDICROUS_INDEX	= 10000;


class portal_t {
	intoArea: number /*int*/; // area this portal leads to
	w: idWinding; // winding points have counter clockwise ordering seen this area
	plane = new idPlane; // view must be on the positive side of the plane to cross
	next: portal_t; // next portal of the area
	doublePortal: doublePortal_t;
}


class doublePortal_t {
	portals = new Array<portal_t>(2);
	blockingBits: number /*int*/; // PS_BLOCK_VIEW, PS_BLOCK_AIR, etc, set by doors that shut them off

	// A portal will be considered closed if it is past the
	// fog-out point in a fog volume.  We only support a single
	// fog volume over each portal.
	fogLight: idRenderLightLocal;
	nextFoggedPortal: doublePortal_t;
}


class portalArea_t {
	areaNum:number/*int*/;
	connectedAreaNum = new Int32Array(NUM_PORTAL_ATTRIBUTES);	// if two areas have matching connectedAreaNum, they are
								// not separated by a portal with the apropriate PS_BLOCK_* blockingBits
	viewCount:number/*int*/;		// set by R_FindViewLightsAndEntities
	portals: portal_t;		// never changes after load
	entityRefs = new areaReference_t;		// head/tail of doubly linked list, may change
	lightRefs = new areaReference_t;		// head/tail of doubly linked list, may change
}


var CHILDREN_HAVE_MULTIPLE_AREAS = -2;
var AREANUM_SOLID = -1;
class areaNode_t {
	plane = new idPlane;
	children = new Int32Array(2);		// negative numbers are (-1 - areaNumber), 0 = solid
	commonChildrenArea:number/*int*/;	// if all children are either solid or a single area,
										// this is the area number, else CHILDREN_HAVE_MULTIPLE_AREAS
}

// moved rest h ere to RenderWorld.cpp

//
//#endif /* !__RENDERWORLDLOCAL_H__ */
