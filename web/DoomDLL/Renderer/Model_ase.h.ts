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
////#ifndef __MODEL_ASE_H__
////#define __MODEL_ASE_H__

/*
===============================================================================

	ASE loader. (3D Studio Max ASCII Export)

===============================================================================
*/

class aseFace_t {
	vertexNum = new Int32Array(3);
	tVertexNum = new Int32Array(3);
	faceNormal = new idVec3();
	vertexNormals = newStructArray<idVec3>(idVec3,3);
	vertexColors = multiDimTypedArray < Uint8Array>(Uint8Array,3, 4);
};

class aseMesh_t {
	timeValue: number /*int*/;

	numVertexes: number /*int*/;
	numTVertexes: number /*int*/;
	numCVertexes: number /*int*/;
	numFaces: number /*int*/;
	numTVFaces: number /*int*/;
	numCVFaces: number /*int*/;

	transform = newStructArray<idVec3>( idVec3, 4 ); // applied to normals

	colorsParsed: boolean;
	normalsParsed: boolean;
	vertexes: idVec3[];
	tvertexes: idVec2[];
	cvertexes: idVec3[];
	faces: aseFace_t[];


	memset0 ( ): void {
		this.timeValue = 0;
		this.numVertexes = 0;
		this.numTVertexes = 0;
		this.numCVertexes = 0;
		this.numFaces = 0;
		this.numTVFaces = 0;
		this.numCVFaces = 0;

		clearStructArray( this.transform );

		this.colorsParsed = false;
		this.normalsParsed = false;

		this.vertexes = null;
		this.tvertexes = null;
		this.cvertexes = null;
		this.faces = null;
	}
}

class aseMaterial_t {
	name = new Uint8Array(128);
	uOffset:number/*float*/; vOffset:number/*float*/;		// max lets you offset by material without changing texCoords
	uTiling:number/*float*/; vTiling:number/*float*/;		// multiply tex coords by this
	angle: number/*float*/;					// in clockwise radians

	memset0(): void {
		memset( this.name, 0, sizeof( this.name ) );
		this.uOffset = this.vOffset = this.uTiling = this.vTiling = this.angle = 0;
	}
}

class aseObject_t {
	name = new Uint8Array(128);
	materialRef: number /*int*/;

	mesh = new aseMesh_t;

	// frames are only present with animations
	frames = new idList<aseMesh_t>(aseMesh_t, true); // aseMesh_t

	memset0(): void {
		memset(this.name, 0, sizeof(this.name));
		this.materialRef = 0;
		this.mesh.memset0();
		this.frames.Clear ( );
	}
}

class aseModel_t {
	timeStamp: number /*ID_TIME_T*/;
	materials = new idList<aseMaterial_t>( aseMaterial_t, true );
	objects = new idList<aseObject_t>(aseObject_t, true);
	memset0 ( ): void {
		this.timeStamp = 0;
		this.materials.Clear ( );
		this.objects.Clear ( );
	}
}

////
////aseModel_t *ASE_Load( const char *fileName );
////void		ASE_Free( aseModel_t *ase );
////
////#endif /* !__MODEL_ASE_H__ */
