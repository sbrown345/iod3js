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
/////*
////===============================================================================
////
////	Trace model vs. polygonal model collision detection.
////
////	It is more important to minimize the number of collision polygons
////	than it is to minimize the number of edges used for collision
////	detection (total edges - internal edges).
////
////	Stitching the world tends to minimize the number of edges used
////	for collision detection (more internal edges). However stitching
////	also results in more collision polygons which usually makes a
////	stitched world slower.
////
////	In an average map over 30% of all edges is internal.
////
////===============================================================================
////*/
////
////#include "../idlib/precompiled.h"
////#pragma hdrstop
////
////#include "CollisionModel_local.h"
////
////
var collisionModelManagerLocal = new idCollisionModelManagerLocal;
var collisionModelManager/*: idCollisionModelManager*/ = collisionModelManagerLocal;

var cm_windingList:cm_windingList_t;
var cm_outList:cm_windingList_t;
var cm_tmpList:cm_windingList_t;

var cm_vertexHash: idHashIndex;
var cm_edgeHash: idHashIndex;

var cm_modelBounds = new idBounds;
var cm_vertexShift :number /*int*/;

