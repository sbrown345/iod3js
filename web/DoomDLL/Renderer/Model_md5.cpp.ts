/////*
////===========================================================================

////Doom 3 GPL Source Code
////Copyright (C) 1999-2011 id Software LLC, a ZeniMax Media company. 

////This file is part of the Doom 3 GPL Source Code (?Doom 3 Source Code?).  

////Doom 3 Source Code is free software: you can redistribute it and/or modify
////it under the terms of the GNU General Public License as published by
////the Free Software Foundation, either version 3 of the License, or
////(at your option) any later version.

////Doom 3 Source Code is distributed in the hope that it will be useful,
////but WITHOUT ANY WARRANTY; without even the implied warranty of
////MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
////GNU General Public License for more details.

////You should have received a copy of the GNU General Public License
////along with Doom 3 Source Code.  If not, see <http://www.gnu.org/licenses/>.

////In addition, the Doom 3 Source Code is also subject to certain additional terms. You should have received a copy of these additional terms immediately following the terms and conditions of the GNU General Public License which accompanied the Doom 3 Source Code.  If not, please request a copy in writing from id Software at the address below.

////If you have questions concerning this license or the applicable additional terms, you may contact in writing id Software LLC, c/o ZeniMax Media Inc., Suite 120, Rockville, Maryland 20850 USA.

////===========================================================================
////*/

////#include "../idlib/precompiled.h"
////#pragma hdrstop

////#include "tr_local.h"
////#include "Model_local.h"

////static const char *MD5_SnapshotName = "_MD5_Snapshot_";


/////***********************************************************************

////	idMD5Mesh

////***********************************************************************/

////static int c_numVerts = 0;
////static int c_numWeights = 0;
////static int c_numWeightJoints = 0;

////typedef struct vertexWeight_s {
////	int							vert;
////	int							joint;
////	idVec3						offset;
////	float						jointWeight;
////} vertexWeight_t;

/////*
////====================
////idMD5Mesh::idMD5Mesh
////====================
////*/
////idMD5Mesh::idMD5Mesh() {
////	scaledWeights	= NULL;
////	weightIndex		= NULL;
////	shader			= NULL;
////	numTris			= 0;
////	deformInfo		= NULL;
////	surfaceNum		= 0;
////}

/////*
////====================
////idMD5Mesh::~idMD5Mesh
////====================
////*/
////idMD5Mesh::~idMD5Mesh() {
////	Mem_Free16( scaledWeights );
////	Mem_Free16( weightIndex );
////	if ( deformInfo ) {
////		R_FreeDeformInfo( deformInfo );
////		deformInfo = NULL;
////	}
////}

/////*
////====================
////idMD5Mesh::ParseMesh
////====================
////*/
////void idMD5Mesh::ParseMesh( idLexer &parser, int numJoints, const idJointMat *joints ) {
////	idToken		token;
////	idToken		name;
////	int			num;
////	int			count;
////	int			jointnum;
////	idStr		shaderName;
////	int			i, j;
////	idList<int>	tris;
////	idList<int>	firstWeightForVertex;
////	idList<int>	numWeightsForVertex;
////	int			maxweight;
////	idList<vertexWeight_t> tempWeights;

////	parser.ExpectTokenString( "{" );

////	//
////	// parse name
////	//
////	if ( parser.CheckTokenString( "name" ) ) {
////		parser.ReadToken( &name );
////	}

////	//
////	// parse shader
////	//
////	parser.ExpectTokenString( "shader" );

////	parser.ReadToken( &token );
////	shaderName = token;

////    shader = declManager.FindMaterial( shaderName );

////	//
////	// parse texture coordinates
////	//
////	parser.ExpectTokenString( "numverts" );
////	count = parser.ParseInt();
////	if ( count < 0 ) {
////		parser.Error( "Invalid size: %s", token.c_str() );
////	}

////	texCoords.SetNum( count );
////	firstWeightForVertex.SetNum( count );
////	numWeightsForVertex.SetNum( count );

////	numWeights = 0;
////	maxweight = 0;
////	for( i = 0; i < texCoords.Num(); i++ ) {
////		parser.ExpectTokenString( "vert" );
////		parser.ParseInt();

////		parser.Parse1DMatrix( 2, texCoords[ i ].ToFloatPtr() );

////		firstWeightForVertex[ i ]	= parser.ParseInt();
////		numWeightsForVertex[ i ]	= parser.ParseInt();

////		if ( !numWeightsForVertex[ i ] ) {
////			parser.Error( "Vertex without any joint weights." );
////		}

////		numWeights += numWeightsForVertex[ i ];
////		if ( numWeightsForVertex[ i ] + firstWeightForVertex[ i ] > maxweight ) {
////			maxweight = numWeightsForVertex[ i ] + firstWeightForVertex[ i ];
////		}
////	}

////	//
////	// parse tris
////	//
////	parser.ExpectTokenString( "numtris" );
////	count = parser.ParseInt();
////	if ( count < 0 ) {
////		parser.Error( "Invalid size: %d", count );
////	}

////	tris.SetNum( count * 3 );
////	numTris = count;
////	for( i = 0; i < count; i++ ) {
////		parser.ExpectTokenString( "tri" );
////		parser.ParseInt();

////		tris[ i * 3 + 0 ] = parser.ParseInt();
////		tris[ i * 3 + 1 ] = parser.ParseInt();
////		tris[ i * 3 + 2 ] = parser.ParseInt();
////	}

////	//
////	// parse weights
////	//
////	parser.ExpectTokenString( "numweights" );
////	count = parser.ParseInt();
////	if ( count < 0 ) {
////		parser.Error( "Invalid size: %d", count );
////	}

////	if ( maxweight > count ) {
////		parser.Warning( "Vertices reference out of range weights in model (%d of %d weights).", maxweight, count );
////	}

////	tempWeights.SetNum( count );

////	for( i = 0; i < count; i++ ) {
////		parser.ExpectTokenString( "weight" );
////		parser.ParseInt();

////		jointnum = parser.ParseInt();
////		if ( ( jointnum < 0 ) || ( jointnum >= numJoints ) ) {
////			parser.Error( "Joint Index out of range(%d): %d", numJoints, jointnum );
////		}

////		tempWeights[ i ].joint			= jointnum;
////		tempWeights[ i ].jointWeight	= parser.ParseFloat();

////		parser.Parse1DMatrix( 3, tempWeights[ i ].offset.ToFloatPtr() );
////	}

////	// create pre-scaled weights and an index for the vertex/joint lookup
////	scaledWeights = (idVec4 *) Mem_Alloc16( numWeights * sizeof( scaledWeights[0] ) );
////	weightIndex = (int *) Mem_Alloc16( numWeights * 2 * sizeof( weightIndex[0] ) );
////	memset( weightIndex, 0, numWeights * 2 * sizeof( weightIndex[0] ) );

////	count = 0;
////	for( i = 0; i < texCoords.Num(); i++ ) {
////		num = firstWeightForVertex[i];
////		for( j = 0; j < numWeightsForVertex[i]; j++, num++, count++ ) {
////			scaledWeights[count].ToVec3() = tempWeights[num].offset * tempWeights[num].jointWeight;
////			scaledWeights[count].w = tempWeights[num].jointWeight;
////			weightIndex[count * 2 + 0] = tempWeights[num].joint * sizeof( idJointMat );
////		}
////		weightIndex[count * 2 - 1] = 1;
////	}

////	tempWeights.Clear();
////	numWeightsForVertex.Clear();
////	firstWeightForVertex.Clear();

////	parser.ExpectTokenString( "}" );

////	// update counters
////	c_numVerts += texCoords.Num();
////	c_numWeights += numWeights;
////	c_numWeightJoints++;
////	for ( i = 0; i < numWeights; i++ ) {
////		c_numWeightJoints += weightIndex[i*2+1];
////	}

////	//
////	// build the information that will be common to all animations of this mesh:
////	// silhouette edge connectivity and normal / tangent generation information
////	//
////	idDrawVert *verts = (idDrawVert *) _alloca16( texCoords.Num() * sizeof( idDrawVert ) );
////	for ( i = 0; i < texCoords.Num(); i++ ) {
////		verts[i].Clear();
////		verts[i].st = texCoords[i];
////	}
////	TransformVerts( verts, joints );
////	deformInfo = R_BuildDeformInfo( texCoords.Num(), verts, tris.Num(), tris.Ptr(), shader.UseUnsmoothedTangents() );
////}

/////*
////====================
////idMD5Mesh::TransformVerts
////====================
////*/
////void idMD5Mesh::TransformVerts( idDrawVert *verts, const idJointMat *entJoints ) {
////	SIMDProcessor.TransformVerts( verts, texCoords.Num(), entJoints, scaledWeights, weightIndex, numWeights );
////}

/////*
////====================
////idMD5Mesh::TransformScaledVerts

////Special transform to make the mesh seem fat or skinny.  May be used for zombie deaths
////====================
////*/
////void idMD5Mesh::TransformScaledVerts( idDrawVert *verts, const idJointMat *entJoints, float scale ) {
////	idVec4 *scaledWeights = (idVec4 *) _alloca16( numWeights * sizeof( scaledWeights[0] ) );
////	SIMDProcessor.Mul( scaledWeights[0].ToFloatPtr(), scale, scaledWeights[0].ToFloatPtr(), numWeights * 4 );
////	SIMDProcessor.TransformVerts( verts, texCoords.Num(), entJoints, scaledWeights, weightIndex, numWeights );
////}

/////*
////====================
////idMD5Mesh::UpdateSurface
////====================
////*/
////void idMD5Mesh::UpdateSurface( const struct renderEntity_s *ent, const idJointMat *entJoints, modelSurface_t *surf ) {
////	int i, base;
////	srfTriangles_t *tri;

////	tr.pc.c_deformedSurfaces++;
////	tr.pc.c_deformedVerts += deformInfo.numOutputVerts;
////	tr.pc.c_deformedIndexes += deformInfo.numIndexes;

////	surf.shader = shader;

////	if ( surf.geometry ) {
////		// if the number of verts and indexes are the same we can re-use the triangle surface
////		// the number of indexes must be the same to assure the correct amount of memory is allocated for the facePlanes
////		if ( surf.geometry.numVerts == deformInfo.numOutputVerts && surf.geometry.numIndexes == deformInfo.numIndexes ) {
////			R_FreeStaticTriSurfVertexCaches( surf.geometry );
////		} else {
////			R_FreeStaticTriSurf( surf.geometry );
////			surf.geometry = R_AllocStaticTriSurf();
////		}
////	} else {
////		surf.geometry = R_AllocStaticTriSurf();
////	}

////	tri = surf.geometry;

////	// note that some of the data is references, and should not be freed
////	tri.deformedSurface = true;
////	tri.tangentsCalculated = false;
////	tri.facePlanesCalculated = false;

////	tri.numIndexes = deformInfo.numIndexes;
////	tri.indexes = deformInfo.indexes;
////	tri.silIndexes = deformInfo.silIndexes;
////	tri.numMirroredVerts = deformInfo.numMirroredVerts;
////	tri.mirroredVerts = deformInfo.mirroredVerts;
////	tri.numDupVerts = deformInfo.numDupVerts;
////	tri.dupVerts = deformInfo.dupVerts;
////	tri.numSilEdges = deformInfo.numSilEdges;
////	tri.silEdges = deformInfo.silEdges;
////	tri.dominantTris = deformInfo.dominantTris;
////	tri.numVerts = deformInfo.numOutputVerts;

////	if ( tri.verts == NULL ) {
////		R_AllocStaticTriSurfVerts( tri, tri.numVerts );
////		for ( i = 0; i < deformInfo.numSourceVerts; i++ ) {
////			tri.verts[i].Clear();
////			tri.verts[i].st = texCoords[i];
////		}
////	}

////	if ( ent.shaderParms[ SHADERPARM_MD5_SKINSCALE ] != 0.0 ) {
////		TransformScaledVerts( tri.verts, entJoints, ent.shaderParms[ SHADERPARM_MD5_SKINSCALE ] );
////	} else {
////		TransformVerts( tri.verts, entJoints );
////	}

////	// replicate the mirror seam vertexes
////	base = deformInfo.numOutputVerts - deformInfo.numMirroredVerts;
////	for ( i = 0; i < deformInfo.numMirroredVerts; i++ ) {
////		tri.verts[base + i] = tri.verts[deformInfo.mirroredVerts[i]];
////	}

////	R_BoundTriSurf( tri );

////	// If a surface is going to be have a lighting interaction generated, it will also have to call
////	// R_DeriveTangents() to get normals, tangents, and face planes.  If it only
////	// needs shadows generated, it will only have to generate face planes.  If it only
////	// has ambient drawing, or is culled, no additional work will be necessary
////	if ( !r_useDeferredTangents.GetBool() ) {
////		// set face planes, vertex normals, tangents
////		R_DeriveTangents( tri );
////	}
////}

/////*
////====================
////idMD5Mesh::CalcBounds
////====================
////*/
////idBounds idMD5Mesh::CalcBounds( const idJointMat *entJoints ) {
////	idBounds	bounds;
////	idDrawVert *verts = (idDrawVert *) _alloca16( texCoords.Num() * sizeof( idDrawVert ) );

////	TransformVerts( verts, entJoints );

////	SIMDProcessor.MinMax( bounds[0], bounds[1], verts, texCoords.Num() );

////	return bounds;
////}

/////*
////====================
////idMD5Mesh::NearestJoint
////====================
////*/
////int idMD5Mesh::NearestJoint( int a, int b, int c ) const {
////	int i, bestJoint, vertNum, weightVertNum;
////	float bestWeight;

////	// duplicated vertices might not have weights
////	if ( a >= 0 && a < texCoords.Num() ) {
////		vertNum = a;
////	} else if ( b >= 0 && b < texCoords.Num() ) {
////		vertNum = b;
////	} else if ( c >= 0 && c < texCoords.Num() ) {
////		vertNum = c;
////	} else {
////		// all vertices are duplicates which shouldn't happen
////		return 0;
////	}

////	// find the first weight for this vertex
//// 	weightVertNum = 0;
////	for( i = 0; weightVertNum < vertNum; i++ ) {
////		weightVertNum += weightIndex[i*2+1];
////	}

////	// get the joint for the largest weight
////	bestWeight = scaledWeights[i].w;
////	bestJoint = weightIndex[i*2+0] / sizeof( idJointMat );
////	for( ; weightIndex[i*2+1] == 0; i++ ) {
////		if ( scaledWeights[i].w > bestWeight ) {
////			bestWeight = scaledWeights[i].w;
////			bestJoint = weightIndex[i*2+0] / sizeof( idJointMat );
////		}
////	}
////	return bestJoint;
////}

/////*
////====================
////idMD5Mesh::NumVerts
////====================
////*/
////int idMD5Mesh::NumVerts( ) const {
////	return texCoords.Num();
////}

/////*
////====================
////idMD5Mesh::NumTris
////====================
////*/
////int	idMD5Mesh::NumTris( ) const {
////	return numTris;
////}

/////*
////====================
////idMD5Mesh::NumWeights
////====================
////*/
////int	idMD5Mesh::NumWeights( ) const {
////	return numWeights;
////}
