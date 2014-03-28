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
////#include "../idlib/precompiled.h"
////#pragma hdrstop
////
////#include "Model_ase.h"
////
/////*
////======================================================================
////
////	Parses 3D Studio Max ASCII export files.
////	The goal is to parse the information into memory exactly as it is
////	represented in the file.  Users of the data will then move it
////	into a form that is more convenient for them.
////
////======================================================================
////*/
////	

function VERBOSE( x:any ) { if ( ase.verbose ) { common.Printf (x) ; } }

// working variables used during parsing
class ase_t {
	buffer: string; //const char	*buffer;
	curpos: number; //const char	*curpos;
	len: number /*int*/;
	token = new Uint8Array(1024);

	verbose: boolean;

	model: aseModel_t;
	currentObject: aseObject_t;
	currentMesh: aseMesh_t;
	currentMaterial: aseMaterial_t;
	currentFace: number /*int*/;
	currentVertex: number /*int*/;

	memset0 ( ): void {
		this.buffer = null;
		this.curpos = 0; //const char	*curpos;
		this.len = 0;
		memset( this.token, 0, sizeof( this.token ) );

		this.verbose = false;

		this.model = null;
		this.currentObject = null;
		this.currentMesh = null;
		this.currentMaterial = null;
		this.currentFace = 0;
		this.currentVertex = 0;
	}
}

var ase = new ase_t;


////static aseMesh_t *ASE_GetCurrentMesh( )
////{
////	return ase.currentMesh;
////}
////
function CharIsTokenDelimiter ( /*int */ch: number ): number /*int*/ {
	if ( ch <= 32 )
		return 1;
	return 0;
}

function ASE_GetToken ( restOfLine: boolean ): number /*int*/ {
	var /*int */i = 0;
	debugger
	if ( !ase.buffer /*== 0 */ )
		return 0;

	if ( ( ase.curpos /*- ase.buffer*/ ) == ase.len )
		return 0;

	// skip over crap
	while ( ( ( ase.curpos /*- ase.buffer */ ) < ase.len ) &&
	( ase.buffer.charCodeAt( ase.curpos ) <= 32 ) ) {
		ase.curpos++;
	}

	while ( ( ase.curpos /*- ase.buffer */ ) < ase.len ) {
		ase.token[i] = ase.buffer.charCodeAt( ase.curpos );

		ase.curpos++;
		i++;

		if ( ( CharIsTokenDelimiter( ase.token[i - 1] ) && !restOfLine ) ||
		( ( ase.token[i - 1] == '\n'.charCodeAt( 0 ) ) || ( ase.token[i - 1] == '\r'.charCodeAt( 0 ) ) ) ) {
			ase.token[i - 1] = 0;
			break;
		}
	}

	ase.token[i] = 0;

	return 1;
}

function ASE_ParseBracedBlock ( parser: ( idToken: string ) => void /*void (*parser)( token:string:string )*/ ): void {
	var /*int */indent = 0;

	while ( ASE_GetToken( false ) ) {
		if ( !strcmp( ase.token.toString ( ), "{" ) ) {
			indent++;
		} else if ( !strcmp( ase.token.toString ( ), "}" ) ) {
			--indent;
			if ( indent == 0 )
				break;
			else if ( indent < 0 )
				common.Error( "Unexpected '}'" );
		} else {
			if ( parser )
				parser( ase.token.toString ( ) );
		}
	}
}

function ASE_SkipEnclosingBraces ( ): void {
	var /*int */indent = 0;

	while ( ASE_GetToken( false ) ) {
		if ( !strcmp( ase.token.toString ( ), "{" ) ) {
			indent++;
		} else if ( !strcmp( ase.token.toString ( ), "}" ) ) {
			indent--;
			if ( indent == 0 )
				break;
			else if ( indent < 0 )
				common.Error( "Unexpected '}'" );
		}
	}
}

function ASE_SkipRestOfLine ( ): void {
	ASE_GetToken( true );
}

function ASE_KeyMAP_DIFFUSE ( token: string ): void {
	var material: aseMaterial_t;

	if ( !strcmp( token, "*BITMAP" ) ) {
		var qpath = new idStr;
		var matname = new idStr;

		ASE_GetToken( false );
		todoThrow ( );
		//// remove the quotes
		//var s = strstr( ase.token + 1, "\"" );
		////if ( s ) {
		////	*s = 0;
		////}
		//matname = ase.token + 1;

		//// convert the 3DSMax material pathname to a qpath
		//matname.BackSlashesToSlashes();
		//qpath = fileSystem.OSPathToRelativePath( matname );
		//idStr.Copynz( ase.currentMaterial.name, qpath, sizeof( ase.currentMaterial.name ) );
	} else if ( !strcmp( token, "*UVW_U_OFFSET" ) ) {
		material = ase.model.materials[ase.model.materials.Num ( ) - 1];
		ASE_GetToken( false );
		material.uOffset = atof( ase.token.toString ( ) );
	} else if ( !strcmp( token, "*UVW_V_OFFSET" ) ) {
		material = ase.model.materials[ase.model.materials.Num ( ) - 1];
		ASE_GetToken( false );
		material.vOffset = atof( ase.token.toString ( ) );
	} else if ( !strcmp( token, "*UVW_U_TILING" ) ) {
		material = ase.model.materials[ase.model.materials.Num ( ) - 1];
		ASE_GetToken( false );
		material.uTiling = atof( ase.token.toString ( ) );
	} else if ( !strcmp( token, "*UVW_V_TILING" ) ) {
		material = ase.model.materials[ase.model.materials.Num ( ) - 1];
		ASE_GetToken( false );
		material.vTiling = atof( ase.token.toString ( ) );
	} else if ( !strcmp( token, "*UVW_ANGLE" ) ) {
		material = ase.model.materials[ase.model.materials.Num ( ) - 1];
		ASE_GetToken( false );
		material.angle = atof( ase.token.toString ( ) );
	} else {
	}
}

function ASE_KeyMATERIAL ( token: string ): void {
	if ( !strcmp( token, "*MAP_DIFFUSE" ) ) {
		ASE_ParseBracedBlock( ASE_KeyMAP_DIFFUSE );
	} else {
	}
}

function ASE_KeyMATERIAL_LIST( token:string ):void
{
	if ( !strcmp( token, "*MATERIAL_COUNT" ) )
	{
		ASE_GetToken( false );
		VERBOSE( ( "..num materials: %s\n", ase.token ) );
	}
	else if ( !strcmp( token, "*MATERIAL" ) )
	{
		VERBOSE( ( "..material %d\n", ase.model.materials.Num() ) );

		ase.currentMaterial = new aseMaterial_t;//(aseMaterial_t *)Mem_Alloc( sizeof( aseMaterial_t ) );
		ase.currentMaterial.memset0 ( );// memset( ase.currentMaterial, 0, sizeof( aseMaterial_t ) );
		ase.currentMaterial.uTiling = 1;
		ase.currentMaterial.vTiling = 1;
		ase.model.materials.Append(ase.currentMaterial);

		ASE_ParseBracedBlock( ASE_KeyMATERIAL );
	}
}
////
////static void ASE_KeyNODE_TM( token:string )
////{
////	int		i;
////
////	if ( !strcmp( token, "*TM_ROW0" ) ) {
////		for ( i = 0 ; i < 3 ; i++ ) {
////			ASE_GetToken( false );
////			ase.currentObject.mesh.transform[0][i] = atof( ase.token );
////		}
////	} else if ( !strcmp( token, "*TM_ROW1" ) ) {
////		for ( i = 0 ; i < 3 ; i++ ) {
////			ASE_GetToken( false );
////			ase.currentObject.mesh.transform[1][i] = atof( ase.token );
////		}
////	} else if ( !strcmp( token, "*TM_ROW2" ) ) {
////		for ( i = 0 ; i < 3 ; i++ ) {
////			ASE_GetToken( false );
////			ase.currentObject.mesh.transform[2][i] = atof( ase.token );
////		}
////	} else if ( !strcmp( token, "*TM_ROW3" ) ) {
////		for ( i = 0 ; i < 3 ; i++ ) {
////			ASE_GetToken( false );
////			ase.currentObject.mesh.transform[3][i] = atof( ase.token );
////		}
////	}
////}
////
////static void ASE_KeyMESH_VERTEX_LIST( token:string )
////{
////	aseMesh_t *pMesh = ASE_GetCurrentMesh();
////
////	if ( !strcmp( token, "*MESH_VERTEX" ) )
////	{
////		ASE_GetToken( false );		// skip number
////
////		ASE_GetToken( false );
////		pMesh.vertexes[ase.currentVertex].x = atof( ase.token );
////
////		ASE_GetToken( false );
////		pMesh.vertexes[ase.currentVertex].y = atof( ase.token );
////
////		ASE_GetToken( false );
////		pMesh.vertexes[ase.currentVertex].z = atof( ase.token );
////
////		ase.currentVertex++;
////
////		if ( ase.currentVertex > pMesh.numVertexes )
////		{
////			common.Error( "ase.currentVertex >= pMesh.numVertexes" );
////		}
////	}
////	else
////	{
////		common.Error( "Unknown token '%s' while parsing MESH_VERTEX_LIST", token );
////	}
////}
////
////static void ASE_KeyMESH_FACE_LIST( token:string )
////{
////	aseMesh_t *pMesh = ASE_GetCurrentMesh();
////
////	if ( !strcmp( token, "*MESH_FACE" ) )
////	{
////		ASE_GetToken( false );	// skip face number
////
////		// we are flipping the order here to change the front/back facing
////		// from 3DS to our standard (clockwise facing out)
////		ASE_GetToken( false );	// skip label
////		ASE_GetToken( false );	// first vertex
////		pMesh.faces[ase.currentFace].vertexNum[0] = atoi( ase.token );
////                
////		ASE_GetToken( false );	// skip label
////		ASE_GetToken( false );	// second vertex
////		pMesh.faces[ase.currentFace].vertexNum[2] = atoi( ase.token );
////
////		ASE_GetToken( false );	// skip label
////		ASE_GetToken( false );	// third vertex
////		pMesh.faces[ase.currentFace].vertexNum[1] = atoi( ase.token );
////
////		ASE_GetToken( true );
////
////		// we could parse material id and smoothing groups here
/////*
////		if ( ( p = strstr( ase.token, "*MESH_MTLID" ) ) != 0 )
////		{
////			p += strlen( "*MESH_MTLID" ) + 1;
////			mtlID = atoi( p );
////		}
////		else
////		{
////			common.Error( "No *MESH_MTLID found for face!" );
////		}
////*/
////
////		ase.currentFace++;
////	}
////	else
////	{
////		common.Error( "Unknown token '%s' while parsing MESH_FACE_LIST", token );
////	}
////}
////
////static void ASE_KeyTFACE_LIST( token:string )
////{
////	aseMesh_t *pMesh = ASE_GetCurrentMesh();
////
////	if ( !strcmp( token, "*MESH_TFACE" ) )
////	{
////		int a, b, c;
////
////		ASE_GetToken( false );
////
////		ASE_GetToken( false );
////		a = atoi( ase.token );
////		ASE_GetToken( false );
////		c = atoi( ase.token );
////		ASE_GetToken( false );
////		b = atoi( ase.token );
////
////		pMesh.faces[ase.currentFace].tVertexNum[0] = a;
////		pMesh.faces[ase.currentFace].tVertexNum[1] = b;
////		pMesh.faces[ase.currentFace].tVertexNum[2] = c;
////
////		ase.currentFace++;
////	}
////	else
////	{
////		common.Error( "Unknown token '%s' in MESH_TFACE", token );
////	}
////}
////
////static void ASE_KeyCFACE_LIST( token:string )
////{
////	aseMesh_t *pMesh = ASE_GetCurrentMesh();
////
////	if ( !strcmp( token, "*MESH_CFACE" ) )
////	{
////		ASE_GetToken( false );
////
////		for ( int i = 0 ; i < 3 ; i++ ) {
////			ASE_GetToken( false );
////			int a = atoi( ase.token );
////
////			// we flip the vertex order to change the face direction to our style
////			static int remap[3] = { 0, 2, 1 };
////			pMesh.faces[ase.currentFace].vertexColors[remap[i]][0] = pMesh.cvertexes[a][0] * 255;
////			pMesh.faces[ase.currentFace].vertexColors[remap[i]][1] = pMesh.cvertexes[a][1] * 255;
////			pMesh.faces[ase.currentFace].vertexColors[remap[i]][2] = pMesh.cvertexes[a][2] * 255;
////		}
////
////		ase.currentFace++;
////	}
////	else
////	{
////		common.Error( "Unknown token '%s' in MESH_CFACE", token );
////	}
////}
////
////static void ASE_KeyMESH_TVERTLIST( token:string )
////{
////	aseMesh_t *pMesh = ASE_GetCurrentMesh();
////
////	if ( !strcmp( token, "*MESH_TVERT" ) )
////	{
////		char u[80], v[80], w[80];
////
////		ASE_GetToken( false );
////
////		ASE_GetToken( false );
////		strcpy( u, ase.token );
////
////		ASE_GetToken( false );
////		strcpy( v, ase.token );
////
////		ASE_GetToken( false );
////		strcpy( w, ase.token );
////
////		pMesh.tvertexes[ase.currentVertex].x = atof( u );
////		// our OpenGL second texture axis is inverted from MAX's sense
////		pMesh.tvertexes[ase.currentVertex].y = 1.0f - atof( v );
////
////		ase.currentVertex++;
////
////		if ( ase.currentVertex > pMesh.numTVertexes )
////		{
////			common.Error( "ase.currentVertex > pMesh.numTVertexes" );
////		}
////	}
////	else
////	{
////		common.Error( "Unknown token '%s' while parsing MESH_TVERTLIST", token );
////	}
////}
////
////static void ASE_KeyMESH_CVERTLIST( token:string )
////{
////	aseMesh_t *pMesh = ASE_GetCurrentMesh();
////
////	pMesh.colorsParsed = true;
////
////	if ( !strcmp( token, "*MESH_VERTCOL" ) )
////	{
////		ASE_GetToken( false );
////
////		ASE_GetToken( false );
////		pMesh.cvertexes[ase.currentVertex][0] = atof( token );
////
////		ASE_GetToken( false );
////		pMesh.cvertexes[ase.currentVertex][1] = atof( token );
////
////		ASE_GetToken( false );
////		pMesh.cvertexes[ase.currentVertex][2] = atof( token );
////
////		ase.currentVertex++;
////
////		if ( ase.currentVertex > pMesh.numCVertexes )
////		{
////			common.Error( "ase.currentVertex > pMesh.numCVertexes" );
////		}
////	}
////	else {
////		common.Error( "Unknown token '%s' while parsing MESH_CVERTLIST", token );
////	}
////}
////
////static void ASE_KeyMESH_NORMALS( token:string )
////{
////	aseMesh_t *pMesh = ASE_GetCurrentMesh();
////	aseFace_t	*f;
////	idVec3		n;
////
////	pMesh.normalsParsed = true;
////	f = &pMesh.faces[ase.currentFace];
////
////	if ( !strcmp( token, "*MESH_FACENORMAL" ) )
////	{
////		int	num;
////
////		ASE_GetToken( false );
////		num = atoi( ase.token );
////
////		if ( num >= pMesh.numFaces || num < 0 ) {
////			common.Error( "MESH_NORMALS face index out of range: %i", num );
////		}
////
////		if ( num != ase.currentFace ) {
////			common.Error( "MESH_NORMALS face index != currentFace" );
////		}
////
////		ASE_GetToken( false );
////		n[0] = atof( ase.token );
////		ASE_GetToken( false );
////		n[1] = atof( ase.token );
////		ASE_GetToken( false );
////		n[2]= atof( ase.token );
////
////		f.faceNormal[0] = n[0] * pMesh.transform[0][0] + n[1] * pMesh.transform[1][0] + n[2] * pMesh.transform[2][0];
////		f.faceNormal[1] = n[0] * pMesh.transform[0][1] + n[1] * pMesh.transform[1][1] + n[2] * pMesh.transform[2][1];
////		f.faceNormal[2] = n[0] * pMesh.transform[0][2] + n[1] * pMesh.transform[1][2] + n[2] * pMesh.transform[2][2];
////
////		f.faceNormal.Normalize();
////
////		ase.currentFace++;
////	}
////	else if ( !strcmp( token, "*MESH_VERTEXNORMAL" ) )
////	{
////		int	num;
////		int	v;
////
////		ASE_GetToken( false );
////		num = atoi( ase.token );
////
////		if ( num >= pMesh.numVertexes || num < 0 ) {
////			common.Error( "MESH_NORMALS vertex index out of range: %i", num );
////		}
////
////		f = &pMesh.faces[ ase.currentFace - 1 ];
////
////		for ( v = 0 ; v < 3 ; v++ ) {
////			if ( num == f.vertexNum[ v ] ) {
////				break;
////			}
////		}
////
////		if ( v == 3 ) {
////			common.Error( "MESH_NORMALS vertex index doesn't match face" );
////		}
////
////		ASE_GetToken( false );
////		n[0] = atof( ase.token );
////		ASE_GetToken( false );
////		n[1] = atof( ase.token );
////		ASE_GetToken( false );
////		n[2]= atof( ase.token );
////
////		f.vertexNormals[ v ][0] = n[0] * pMesh.transform[0][0] + n[1] * pMesh.transform[1][0] + n[2] * pMesh.transform[2][0];
////		f.vertexNormals[ v ][1] = n[0] * pMesh.transform[0][1] + n[1] * pMesh.transform[1][1] + n[2] * pMesh.transform[2][1];
////		f.vertexNormals[ v ][2] = n[0] * pMesh.transform[0][2] + n[1] * pMesh.transform[1][2] + n[2] * pMesh.transform[2][2];
////
////		f.vertexNormals[v].Normalize();
////	}
////}
////
////static void ASE_KeyMESH( token:string )
////{
////	aseMesh_t *pMesh = ASE_GetCurrentMesh();
////
////	if ( !strcmp( token, "*TIMEVALUE" ) )
////	{
////		ASE_GetToken( false );
////
////		pMesh.timeValue = atoi( ase.token );
////		VERBOSE( ( ".....timevalue: %d\n", pMesh.timeValue ) );
////	}
////	else if ( !strcmp( token, "*MESH_NUMVERTEX" ) )
////	{
////		ASE_GetToken( false );
////
////		pMesh.numVertexes = atoi( ase.token );
////		VERBOSE( ( ".....num vertexes: %d\n", pMesh.numVertexes ) );
////	}
////	else if ( !strcmp( token, "*MESH_NUMTVERTEX" ) )
////	{
////		ASE_GetToken( false );
////
////		pMesh.numTVertexes = atoi( ase.token );
////		VERBOSE( ( ".....num tvertexes: %d\n", pMesh.numTVertexes ) );
////	}
////	else if ( !strcmp( token, "*MESH_NUMCVERTEX" ) )
////	{
////		ASE_GetToken( false );
////
////		pMesh.numCVertexes = atoi( ase.token );
////		VERBOSE( ( ".....num cvertexes: %d\n", pMesh.numCVertexes ) );
////	}
////	else if ( !strcmp( token, "*MESH_NUMFACES" ) )
////	{
////		ASE_GetToken( false );
////
////		pMesh.numFaces = atoi( ase.token );
////		VERBOSE( ( ".....num faces: %d\n", pMesh.numFaces ) );
////	}
////	else if ( !strcmp( token, "*MESH_NUMTVFACES" ) )
////	{
////		ASE_GetToken( false );
////
////		pMesh.numTVFaces = atoi( ase.token );
////		VERBOSE( ( ".....num tvfaces: %d\n", pMesh.numTVFaces ) );
////
////		if ( pMesh.numTVFaces != pMesh.numFaces )
////		{
////			common.Error( "MESH_NUMTVFACES != MESH_NUMFACES" );
////		}
////	}
////	else if ( !strcmp( token, "*MESH_NUMCVFACES" ) )
////	{
////		ASE_GetToken( false );
////
////		pMesh.numCVFaces = atoi( ase.token );
////		VERBOSE( ( ".....num cvfaces: %d\n", pMesh.numCVFaces ) );
////
////		if ( pMesh.numTVFaces != pMesh.numFaces )
////		{
////			common.Error( "MESH_NUMCVFACES != MESH_NUMFACES" );
////		}
////	}
////	else if ( !strcmp( token, "*MESH_VERTEX_LIST" ) )
////	{
////		pMesh.vertexes = (idVec3 *)Mem_Alloc( sizeof( idVec3 ) * pMesh.numVertexes );
////		ase.currentVertex = 0;
////		VERBOSE( ( ".....parsing MESH_VERTEX_LIST\n" ) );
////		ASE_ParseBracedBlock( ASE_KeyMESH_VERTEX_LIST );
////	}
////	else if ( !strcmp( token, "*MESH_TVERTLIST" ) )
////	{
////		ase.currentVertex = 0;
////		pMesh.tvertexes = (idVec2 *)Mem_Alloc( sizeof( idVec2 ) * pMesh.numTVertexes );
////		VERBOSE( ( ".....parsing MESH_TVERTLIST\n" ) );
////		ASE_ParseBracedBlock( ASE_KeyMESH_TVERTLIST );
////	}
////	else if ( !strcmp( token, "*MESH_CVERTLIST" ) )
////	{
////		ase.currentVertex = 0;
////		pMesh.cvertexes = (idVec3 *)Mem_Alloc( sizeof( idVec3 ) * pMesh.numCVertexes );
////		VERBOSE( ( ".....parsing MESH_CVERTLIST\n" ) );
////		ASE_ParseBracedBlock( ASE_KeyMESH_CVERTLIST );
////	}
////	else if ( !strcmp( token, "*MESH_FACE_LIST" ) )
////	{
////		pMesh.faces = (aseFace_t *)Mem_Alloc( sizeof( aseFace_t ) * pMesh.numFaces );
////		ase.currentFace = 0;
////		VERBOSE( ( ".....parsing MESH_FACE_LIST\n" ) );
////		ASE_ParseBracedBlock( ASE_KeyMESH_FACE_LIST );
////	}
////	else if ( !strcmp( token, "*MESH_TFACELIST" ) )
////	{
////		if ( !pMesh.faces ) {
////			common.Error( "*MESH_TFACELIST before *MESH_FACE_LIST" );
////		}
////		ase.currentFace = 0;
////		VERBOSE( ( ".....parsing MESH_TFACE_LIST\n" ) );
////		ASE_ParseBracedBlock( ASE_KeyTFACE_LIST );
////	}
////	else if ( !strcmp( token, "*MESH_CFACELIST" ) )
////	{
////		if ( !pMesh.faces ) {
////			common.Error( "*MESH_CFACELIST before *MESH_FACE_LIST" );
////		}
////		ase.currentFace = 0;
////		VERBOSE( ( ".....parsing MESH_CFACE_LIST\n" ) );
////		ASE_ParseBracedBlock( ASE_KeyCFACE_LIST );
////	}
////	else if ( !strcmp( token, "*MESH_NORMALS" ) )
////	{
////		if ( !pMesh.faces ) {
////			common.Warning( "*MESH_NORMALS before *MESH_FACE_LIST" );
////		}
////		ase.currentFace = 0;
////		VERBOSE( ( ".....parsing MESH_NORMALS\n" ) );
////		ASE_ParseBracedBlock( ASE_KeyMESH_NORMALS );
////	}
////}
////
////static void ASE_KeyMESH_ANIMATION( token:string )
////{
////	aseMesh_t *mesh;
////
////	// loads a single animation frame
////	if ( !strcmp( token, "*MESH" ) )
////	{
////		VERBOSE( ( "...found MESH\n" ) );
////
////		mesh = (aseMesh_t *)Mem_Alloc( sizeof( aseMesh_t ) );
////		memset( mesh, 0, sizeof( aseMesh_t ) );
////		ase.currentMesh = mesh;
////
////		ase.currentObject.frames.Append( mesh );
////
////		ASE_ParseBracedBlock( ASE_KeyMESH );
////	}
////	else
////	{
////		common.Error( "Unknown token '%s' while parsing MESH_ANIMATION", token );
////	}
////}
////
////static void ASE_KeyGEOMOBJECT( token:string )
////{
////	aseObject_t	*object;
////
////	object = ase.currentObject;
////
////	if ( !strcmp( token, "*NODE_NAME" ) )
////	{
////		ASE_GetToken( true );
////		VERBOSE( ( " %s\n", ase.token ) );
////		idStr.Copynz( object.name, ase.token, sizeof( object.name ) );
////	}
////	else if ( !strcmp( token, "*NODE_PARENT" ) )
////	{
////		ASE_SkipRestOfLine();
////	}
////	// ignore unused data blocks
////	else if ( !strcmp( token, "*NODE_TM" ) ||
////		      !strcmp( token, "*TM_ANIMATION" ) )
////	{
////		ASE_ParseBracedBlock( ASE_KeyNODE_TM );
////	}
////	// ignore regular meshes that aren't part of animation
////	else if ( !strcmp( token, "*MESH" ) )
////	{
////		ase.currentMesh = &ase.currentObject.mesh;
////		memset( ase.currentMesh, 0, sizeof( ase.currentMesh ) );
////
////		ASE_ParseBracedBlock( ASE_KeyMESH );
////	}
////	// according to spec these are obsolete
////	else if ( !strcmp( token, "*MATERIAL_REF" ) )
////	{
////		ASE_GetToken( false );
////
////		object.materialRef = atoi( ase.token );
////	}
////	// loads a sequence of animation frames
////	else if ( !strcmp( token, "*MESH_ANIMATION" ) )
////	{
////		VERBOSE( ( "..found MESH_ANIMATION\n" ) );
////
////		ASE_ParseBracedBlock( ASE_KeyMESH_ANIMATION );
////	}
////	// skip unused info
////	else if ( !strcmp( token, "*PROP_MOTIONBLUR" ) ||
////		      !strcmp( token, "*PROP_CASTSHADOW" ) ||
////			  !strcmp( token, "*PROP_RECVSHADOW" ) )
////	{
////		ASE_SkipRestOfLine();
////	}
////
////}
////
function ASE_ParseGeomObject(): void {
	todoThrow ( );
	//aseObject_t	*object;

	//VERBOSE( ("GEOMOBJECT" ) );

	//object = (aseObject_t *)Mem_Alloc( sizeof( aseObject_t ) );
	//memset( object, 0, sizeof( aseObject_t ) );
	//ase.model.objects.Append( object );
	//ase.currentObject = object;

	//object.frames.Resize(32, 32);

	//ASE_ParseBracedBlock( ASE_KeyGEOMOBJECT );
}

function ASE_KeyGROUP ( token: string ): void {
	if ( !strcmp( token, "*GEOMOBJECT" ) ) {
		ASE_ParseGeomObject ( );
	}
}

/*
=================
ASE_Parse
=================
*/
function ASE_Parse ( buffer: string, verbose: boolean ): aseModel_t {
	ase.memset0 ( ); //memset( &ase, 0, sizeof( ase ) );

	ase.verbose = verbose;

	ase.buffer = buffer;
	ase.len = strlen( buffer );
	ase.curpos = 0; //ase.buffer;
	ase.currentObject = null;

	// NOTE: using new operator because aseModel_t contains idList class objects
	ase.model = new aseModel_t;
	ase.model.memset0 ( ); //memset( ase.model, 0, sizeof( aseModel_t ) );
	ase.model.objects.Resize( 32, 32 );
	ase.model.materials.Resize( 32, 32 );

	while ( ASE_GetToken( false ) ) {
		if ( !strcmp( ase.token.toString ( ), "*3DSMAX_ASCIIEXPORT" ) ||
			!strcmp( ase.token.toString ( ), "*COMMENT" ) ) {
			ASE_SkipRestOfLine ( );
		} else if ( !strcmp( ase.token.toString ( ), "*SCENE" ) ) {
			ASE_SkipEnclosingBraces ( );
		} else if ( !strcmp( ase.token.toString ( ), "*GROUP" ) ) {
			ASE_GetToken( false ); // group name
			ASE_ParseBracedBlock( ASE_KeyGROUP );
		} else if ( !strcmp( ase.token.toString ( ), "*SHAPEOBJECT" ) ) {
			ASE_SkipEnclosingBraces ( );
		} else if ( !strcmp( ase.token.toString ( ), "*CAMERAOBJECT" ) ) {
			ASE_SkipEnclosingBraces ( );
		} else if ( !strcmp( ase.token.toString ( ), "*MATERIAL_LIST" ) ) {
			VERBOSE( ( "MATERIAL_LIST\n" ) );

			ASE_ParseBracedBlock( ASE_KeyMATERIAL_LIST );
		} else if ( !strcmp( ase.token.toString ( ), "*GEOMOBJECT" ) ) {
			ASE_ParseGeomObject ( );
		} else if ( ase.token[0] ) {
			common.Printf( "Unknown token '%s'\n", ase.token );
		}
	}

	return ase.model;
}

/*
=================
ASE_Load
=================
*/
function ASE_Load ( fileName: string ): aseModel_t {
	var buf = new R<Uint8Array> ( ); //char *buf;
	var /*ID_TIME_T */timeStamp = new R<number> ( );
	var ase: aseModel_t;

	fileSystem.ReadFile( fileName, /*(void **)&*/buf, timeStamp );
	if ( !buf.$ ) {
		return null;
	}

	ase = ASE_Parse( buf.$.toString ( ), false );
	ase.timeStamp = timeStamp.$;

	fileSystem.FreeFile( buf.$ );

	return ase;
}

/////*
////=================
////ASE_Free
////=================
////*/
////void ASE_Free( aseModel_t *ase ) {
////	int					i, j;
////	aseObject_t			*obj;
////	aseMesh_t			*mesh;
////	aseMaterial_t		*material;
////
////	if ( !ase ) {
////		return;
////	}
////	for ( i = 0; i < ase.objects.Num(); i++ ) {
////		obj = ase.objects[i];
////		for ( j = 0; j < obj.frames.Num(); j++ ) {
////			mesh = obj.frames[j];
////			if ( mesh.vertexes ) {
////				Mem_Free( mesh.vertexes );
////			}
////			if ( mesh.tvertexes ) {
////				Mem_Free( mesh.tvertexes );
////			}
////			if ( mesh.cvertexes ) {
////				Mem_Free( mesh.cvertexes );
////			}
////			if ( mesh.faces ) {
////				Mem_Free( mesh.faces );
////			}
////			Mem_Free( mesh );
////		}
////
////		obj.frames.Clear();
////
////		// free the base nesh
////		mesh = &obj.mesh;
////		if ( mesh.vertexes ) {
////			Mem_Free( mesh.vertexes );
////		}
////		if ( mesh.tvertexes ) {
////			Mem_Free( mesh.tvertexes );
////		}
////		if ( mesh.cvertexes ) {
////			Mem_Free( mesh.cvertexes );
////		}
////		if ( mesh.faces ) {
////			Mem_Free( mesh.faces );
////		}
////		Mem_Free( obj );
////	}
////	ase.objects.Clear();
////
////	for ( i = 0; i < ase.materials.Num(); i++ ) {
////		material = ase.materials[i];
////		Mem_Free( material );
////	}
////	ase.materials.Clear();
////
////	delete ase;
////}
