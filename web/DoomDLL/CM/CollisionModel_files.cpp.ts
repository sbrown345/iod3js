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
////===============================================================================
////*/
////
////#include "../idlib/precompiled.h"
////#pragma hdrstop
////
////#include "CollisionModel_local.h"
////
var CM_FILE_EXT			="cm"
var CM_FILEID			="CM"
var CM_FILEVERSION		="1.00"


/////*
////===============================================================================
////
////Writing of collision model file
////
////===============================================================================
////*/
////
////void CM_GetNodeBounds( idBounds *bounds, cm_node_t *node );
////int CM_GetNodeContents( cm_node_t *node );
////
////
/////*
////================
////idCollisionModelManagerLocal::WriteNodes
////================
////*/
////void idCollisionModelManagerLocal::WriteNodes( idFile *fp, cm_node_t *node ) {
////	fp.WriteFloatString( "\t( %d %f )\n", node.planeType, node.planeDist );
////	if ( node.planeType != -1 ) {
////		WriteNodes( fp, node.children[0] );
////		WriteNodes( fp, node.children[1] );
////	}
////}
////
/////*
////================
////idCollisionModelManagerLocal::CountPolygonMemory
////================
////*/
////int idCollisionModelManagerLocal::CountPolygonMemory( cm_node_t *node ) const {
////	cm_polygonRef_t *pref;
////	cm_polygon_t *p;
////	int memory;
////
////	memory = 0;
////	for ( pref = node.polygons; pref; pref = pref.next ) {
////		p = pref.p;
////		if ( p.checkcount == this.checkCount ) {
////			continue;
////		}
////		p.checkcount = this.checkCount;
////
////		memory += sizeof( cm_polygon_t ) + ( p.numEdges - 1 ) * sizeof( p.edges[0] );
////	}
////	if ( node.planeType != -1 ) {
////		memory += CountPolygonMemory( node.children[0] );
////		memory += CountPolygonMemory( node.children[1] );
////	}
////	return memory;
////}
////
/////*
////================
////idCollisionModelManagerLocal::WritePolygons
////================
////*/
////void idCollisionModelManagerLocal::WritePolygons( idFile *fp, cm_node_t *node ) {
////	cm_polygonRef_t *pref;
////	cm_polygon_t *p;
////	var i:number/*int*/;
////
////	for ( pref = node.polygons; pref; pref = pref.next ) {
////		p = pref.p;
////		if ( p.checkcount == this.checkCount ) {
////			continue;
////		}
////		p.checkcount = this.checkCount;
////		fp.WriteFloatString( "\t%d (", p.numEdges );
////		for ( i = 0; i < p.numEdges; i++ ) {
////			fp.WriteFloatString( " %d", p.edges[i] );
////		}
////		fp.WriteFloatString( " ) ( %f %f %f ) %f", p.plane.Normal()[0], p.plane.Normal()[1], p.plane.Normal()[2], p.plane.Dist() );
////		fp.WriteFloatString( " ( %f %f %f )", p.bounds[0][0], p.bounds[0][1], p.bounds[0][2] );
////		fp.WriteFloatString( " ( %f %f %f )", p.bounds[1][0], p.bounds[1][1], p.bounds[1][2] );
////		fp.WriteFloatString( " \"%s\"\n", p.material.GetName() );
////	}
////	if ( node.planeType != -1 ) {
////		WritePolygons( fp, node.children[0] );
////		WritePolygons( fp, node.children[1] );
////	}
////}
////
/////*
////================
////idCollisionModelManagerLocal::CountBrushMemory
////================
////*/
////int idCollisionModelManagerLocal::CountBrushMemory( cm_node_t *node ) const {
////	cm_brushRef_t *bref;
////	cm_brush_t *b;
////	int memory;
////
////	memory = 0;
////	for ( bref = node.brushes; bref; bref = bref.next ) {
////		b = bref.b;
////		if ( b.checkcount == this.checkCount ) {
////			continue;
////		}
////		b.checkcount = this.checkCount;
////
////		memory += sizeof( cm_brush_t ) + ( b.numPlanes - 1 ) * sizeof( b.planes[0] );
////	}
////	if ( node.planeType != -1 ) {
////		memory += CountBrushMemory( node.children[0] );
////		memory += CountBrushMemory( node.children[1] );
////	}
////	return memory;
////}
////
/////*
////================
////idCollisionModelManagerLocal::WriteBrushes
////================
////*/
////void idCollisionModelManagerLocal::WriteBrushes( idFile *fp, cm_node_t *node ) {
////	cm_brushRef_t *bref;
////	cm_brush_t *b;
////	var i:number/*int*/;
////
////	for ( bref = node.brushes; bref; bref = bref.next ) {
////		b = bref.b;
////		if ( b.checkcount == this.checkCount ) {
////			continue;
////		}
////		b.checkcount = this.checkCount;
////		fp.WriteFloatString( "\t%d {\n", b.numPlanes );
////		for ( i = 0; i < b.numPlanes; i++ ) {
////			fp.WriteFloatString( "\t\t( %f %f %f ) %f\n", b.planes[i].Normal()[0], b.planes[i].Normal()[1], b.planes[i].Normal()[2], b.planes[i].Dist() );
////		}
////		fp.WriteFloatString( "\t} ( %f %f %f )", b.bounds[0][0], b.bounds[0][1], b.bounds[0][2] );
////		fp.WriteFloatString( " ( %f %f %f ) \"%s\"\n", b.bounds[1][0], b.bounds[1][1], b.bounds[1][2], StringFromContents( b.contents ) );
////	}
////	if ( node.planeType != -1 ) {
////		WriteBrushes( fp, node.children[0] );
////		WriteBrushes( fp, node.children[1] );
////	}
////}
////
/////*
////================
////idCollisionModelManagerLocal::WriteCollisionModel
////================
////*/
////void idCollisionModelManagerLocal::WriteCollisionModel( idFile *fp, cm_model_t *model ) {
////	int i, polygonMemory, brushMemory;
////
////	fp.WriteFloatString( "collisionModel \"%s\" {\n", model.name.c_str() );
////	// vertices
////	fp.WriteFloatString( "\tvertices { /* numVertices = */ %d\n", model.numVertices );
////	for ( i = 0; i < model.numVertices; i++ ) {
////		fp.WriteFloatString( "\t/* %d */ ( %f %f %f )\n", i, model.vertices[i].p[0], model.vertices[i].p[1], model.vertices[i].p[2] );
////	}
////	fp.WriteFloatString( "\t}\n" );
////	// edges
////	fp.WriteFloatString( "\tedges { /* numEdges = */ %d\n", model.numEdges );
////	for ( i = 0; i < model.numEdges; i++ ) {
////		fp.WriteFloatString( "\t/* %d */ ( %d %d ) %d %d\n", i, model.edges[i].vertexNum[0], model.edges[i].vertexNum[1], model.edges[i].internal, model.edges[i].numUsers );
////	}
////	fp.WriteFloatString( "\t}\n" );
////	// nodes
////	fp.WriteFloatString( "\tnodes {\n" );
////	WriteNodes( fp, model.node );
////	fp.WriteFloatString( "\t}\n" );
////	// polygons
////	this.checkCount++;
////	polygonMemory = CountPolygonMemory( model.node );
////	fp.WriteFloatString( "\tpolygons /* polygonMemory = */ %d {\n", polygonMemory );
////	this.checkCount++;
////	WritePolygons( fp, model.node );
////	fp.WriteFloatString( "\t}\n" );
////	// brushes
////	this.checkCount++;
////	brushMemory = CountBrushMemory( model.node );
////	fp.WriteFloatString( "\tbrushes /* brushMemory = */ %d {\n", brushMemory );
////	this.checkCount++;
////	WriteBrushes( fp, model.node );
////	fp.WriteFloatString( "\t}\n" );
////	// closing brace
////	fp.WriteFloatString( "}\n" );
////}
////
/////*
////================
////idCollisionModelManagerLocal::WriteCollisionModelsToFile
////================
////*/
////void idCollisionModelManagerLocal::WriteCollisionModelsToFile( const char *filename, int firstModel, int lastModel, unsigned int mapFileCRC ) {
////	var i:number/*int*/;
////	idFile *fp;
////	idStr name;
////
////	name = filename;
////	name.SetFileExtension( CM_FILE_EXT );
////
////	common.Printf( "writing %s\n", name.c_str() );
////	// _D3XP was saving to fs_cdpath
////	fp = fileSystem.OpenFileWrite( name, "fs_devpath" );
////	if ( !fp ) {
////		common.Warning( "idCollisionModelManagerLocal::WriteCollisionModelsToFile: Error opening file %s\n", name.c_str() );
////		return;
////	}
////
////	// write file id and version
////	fp.WriteFloatString( "%s \"%s\"\n\n", CM_FILEID, CM_FILEVERSION );
////	// write the map file crc
////	fp.WriteFloatString( "%u\n\n", mapFileCRC );
////
////	// write the collision models
////	for ( i = firstModel; i < lastModel; i++ ) {
////		WriteCollisionModel( fp, models[ i ] );
////	}
////
////	fileSystem.CloseFile( fp );
////}
////
/////*
////================
////idCollisionModelManagerLocal::WriteCollisionModelForMapEntity
////================
////*/
////bool idCollisionModelManagerLocal::WriteCollisionModelForMapEntity( const idMapEntity *mapEnt, const char *filename, const bool testTraceModel ) {
////	idFile *fp;
////	idStr name;
////	cm_model_t *model;
////
////	SetupHash();
////	model = CollisionModelForMapEntity( mapEnt );
////	model.name = filename;
////
////	name = filename;
////	name.SetFileExtension( CM_FILE_EXT );
////
////	common.Printf( "writing %s\n", name.c_str() );
////	fp = fileSystem.OpenFileWrite( name, "fs_devpath" );
////	if ( !fp ) {
////		common.Printf( "idCollisionModelManagerLocal::WriteCollisionModelForMapEntity: Error opening file %s\n", name.c_str() );
////		FreeModel( model );
////		return false;
////	}
////
////	// write file id and version
////	fp.WriteFloatString( "%s \"%s\"\n\n", CM_FILEID, CM_FILEVERSION );
////	// write the map file crc
////	fp.WriteFloatString( "%u\n\n", 0 );
////
////	// write the collision model
////	WriteCollisionModel( fp, model );
////
////	fileSystem.CloseFile( fp );
////
////	if ( testTraceModel ) {
////		idTraceModel trm;
////		TrmFromModel( model, trm );
////	}
////
////	FreeModel( model );
////
////	return true;
////}


/*
===============================================================================

Loading of collision model file

===============================================================================
*/

/*
================
idCollisionModelManagerLocal::ParseVertices
================
*/
idCollisionModelManagerLocal.prototype.ParseVertices = function ( src: idLexer, model: cm_model_t ): void {
	var i: number /*int*/;

	src.ExpectTokenString( "{" );
	model.numVertices = src.ParseInt ( );
	model.maxVertices = model.numVertices;
	model.vertices = newStructArray<cm_vertex_t>( cm_vertex_t, model.maxVertices ); //(cm_vertex_t *) Mem_Alloc( model.maxVertices * sizeof( cm_vertex_t ) );
	for ( i = 0; i < model.numVertices; i++ ) {
		src.Parse1DMatrix( 3, model.vertices[i].p.ToFloatPtr ( ) );
		model.vertices[i].side = 0;
		model.vertices[i].sideSet = 0;
		model.vertices[i].checkcount = 0;
	}
	src.ExpectTokenString( "}" );
};

/*
================
idCollisionModelManagerLocal::ParseEdges
================
*/
idCollisionModelManagerLocal.prototype.ParseEdges = function ( src: idLexer, model: cm_model_t ): void {
	var i: number /*int*/;

	src.ExpectTokenString( "{" );
	model.numEdges = src.ParseInt ( );
	model.maxEdges = model.numEdges;
	model.edges = newStructArray<cm_edge_t>( cm_edge_t, model.maxEdges ); // (cm_edge_t *) Mem_Alloc( model.maxEdges * sizeof( cm_edge_t ) );
	for ( i = 0; i < model.numEdges; i++ ) {
		src.ExpectTokenString( "(" );
		model.edges[i].vertexNum[0] = src.ParseInt ( );
		model.edges[i].vertexNum[1] = src.ParseInt ( );
		src.ExpectTokenString( ")" );
		model.edges[i].side = 0;
		model.edges[i].sideSet = 0;
		model.edges[i].internal = src.ParseInt ( );
		model.edges[i].numUsers = src.ParseInt ( );
		model.edges[i].normal = vec3_origin;
		model.edges[i].checkcount = 0;
		model.numInternalEdges += model.edges[i].internal;
	}
	src.ExpectTokenString( "}" );
};

/*
================
idCollisionModelManagerLocal::ParseNodes
================
*/
idCollisionModelManagerLocal.prototype.ParseNodes = function ( src: idLexer, model: cm_model_t, parent: cm_node_t ): cm_node_t {
	var node: cm_node_t;

	model.numNodes++;
	node = this.AllocNode( model, model.numNodes < NODE_BLOCK_SIZE_SMALL ? NODE_BLOCK_SIZE_SMALL : NODE_BLOCK_SIZE_LARGE );
	node.brushes = null;
	node.polygons = null;
	node.parent = parent;
	src.ExpectTokenString( "(" );
	node.planeType = src.ParseInt ( );
	node.planeDist = src.ParseFloat ( );
	src.ExpectTokenString( ")" );
	if ( node.planeType != -1 ) {
		node.children[0] = this.ParseNodes( src, model, node );
		node.children[1] = this.ParseNodes( src, model, node );
	}
	return node;
};

/*
================
idCollisionModelManagerLocal::ParsePolygons
================
*/
idCollisionModelManagerLocal.prototype.ParsePolygons = function ( src: idLexer, model: cm_model_t ): void {
	var p: cm_polygon_t;
	var /*int */i: number, numEdges: number;
	var normal = new idVec3;
	var token = new idToken;

	if ( src.CheckTokenType( TT_NUMBER, 0, token ) ) {
		model.polygonBlock = new cm_polygonBlock_t; // (cm_polygonBlock_t *) Mem_Alloc( sizeof( cm_polygonBlock_t ) + token.GetIntValue() );
		model.polygonBlock.bytesRemaining = token.GetIntValue();
		debugger; //either use objects or have object wrapper around typed ararys?
		model.polygonBlock.next = new Uint8Array( token.GetIntValue ( ) ); //( (byte *) model.polygonBlock ) + sizeof( cm_polygonBlock_t );
	}

	src.ExpectTokenString( "{" );
	while ( !src.CheckTokenString( "}" ) ) {
		// parse polygon
		numEdges = src.ParseInt ( );
		p = this.AllocPolygon( model, numEdges );
		p.numEdges = numEdges;
		src.ExpectTokenString( "(" );
		for ( i = 0; i < p.numEdges; i++ ) {
			p.edges[i] = src.ParseInt ( );
		}
		src.ExpectTokenString( ")" );
		src.Parse1DMatrix( 3, normal.ToFloatPtr ( ) );
		p.plane.SetNormal( normal );
		p.plane.SetDist( src.ParseFloat ( ) );
		src.Parse1DMatrix( 3, p.bounds[0].ToFloatPtr ( ) );
		src.Parse1DMatrix( 3, p.bounds[1].ToFloatPtr ( ) );
		src.ExpectTokenType( TT_STRING, 0, token );
		// get material
		p.material = declManager.FindMaterial( token.data );
		p.contents = p.material.GetContentFlags ( );
		p.checkcount = 0;
		// filter polygon into tree
		this.R_FilterPolygonIntoTree( model, model.node, null, p );
	}
};

/*
================
idCollisionModelManagerLocal::ParseBrushes
================
*/
idCollisionModelManagerLocal.prototype.ParseBrushes = function ( src: idLexer, model: cm_model_t ): void {
	var b: cm_brush_t;
	var /*int */i: number, numPlanes: number;
	var normal = new idVec3;
	var token = new idToken;

	if ( src.CheckTokenType( TT_NUMBER, 0, token ) ) {
		model.brushBlock = new cm_brushBlock_t; //(cm_brushBlock_t *) Mem_Alloc( sizeof( cm_brushBlock_t ) + token.GetIntValue() );
		model.brushBlock.bytesRemaining = token.GetIntValue ( );
		model.brushBlock.next = new Uint8Array( token.GetIntValue ( ) ); //(byte *) model.brushBlock ) + sizeof( cm_brushBlock_t );
	}

	src.ExpectTokenString( "{" );
	while ( !src.CheckTokenString( "}" ) ) {
		// parse brush
		numPlanes = src.ParseInt ( );
		b = this.AllocBrush( model, numPlanes );
		b.numPlanes = numPlanes;
		src.ExpectTokenString( "{" );
		for ( i = 0; i < b.numPlanes; i++ ) {
			src.Parse1DMatrix( 3, normal.ToFloatPtr ( ) );
			b.planes[i].SetNormal( normal );
			b.planes[i].SetDist( src.ParseFloat ( ) );
		}
		src.ExpectTokenString( "}" );
		src.Parse1DMatrix( 3, b.bounds[0].ToFloatPtr ( ) );
		src.Parse1DMatrix( 3, b.bounds[1].ToFloatPtr ( ) );
		src.ReadToken( token );
		if ( token.type == TT_NUMBER ) {
			b.contents = token.GetIntValue ( ); // old .cm files use a single integer
		} else {
			b.contents = this.ContentsFromString( token );
		}
		b.checkcount = 0;
		b.primitiveNum = 0;
		// filter brush into tree
		this.R_FilterBrushIntoTree( model, model.node, null, b );
	}
};

/*
================
idCollisionModelManagerLocal::ParseCollisionModel
================
*/
idCollisionModelManagerLocal.prototype.ParseCollisionModel = function ( src: idLexer ): boolean {
	var model: cm_model_t;
	var token = new idToken;

	if ( this.numModels >= MAX_SUBMODELS ) {
		common.Error( "LoadModel: no free slots" );
		return false;
	}
	model = this.AllocModel ( );
	this.models[this.numModels] = model;
	this.numModels++;
	// parse the file
	src.ExpectTokenType( TT_STRING, 0, token );
	model.name.equals( token );
	src.ExpectTokenString( "{" );
	while ( !src.CheckTokenString( "}" ) ) {

		src.ReadToken( token );

		if ( token.data == "vertices" ) {
			this.ParseVertices( src, model );
			continue;
		}

		if ( token.data == "edges" ) {
			this.ParseEdges( src, model );
			continue;
		}

		if ( token.data == "nodes" ) {
			src.ExpectTokenString( "{" );
			model.node = this.ParseNodes( src, model, null );
			src.ExpectTokenString( "}" );
			continue;
		}

		if ( token.data == "polygons" ) {
			this.ParsePolygons( src, model );
			continue;
		}

		if ( token.data == "brushes" ) {
			this.ParseBrushes( src, model );
			continue;
		}

		src.Error( "ParseCollisionModel: bad token \"%s\"", token.c_str ( ) );
	}
	// calculate edge normals
	this.checkCount++;
	this.CalculateEdgeNormals( model, model.node );
	// get model bounds from brush and polygon bounds
	this.CM_GetNodeBounds( model.bounds, model.node );
	// get model contents
	model.contents = this.CM_GetNodeContents( model.node );
	// total memory used by this model
	model.usedMemory = model.numVertices * sizeof( cm_vertex_t ) +
		model.numEdges * sizeof( cm_edge_t ) +
		model.polygonMemory +
		model.brushMemory +
		model.numNodes * sizeof( cm_node_t ) +
		model.numPolygonRefs * sizeof( cm_polygonRef_t ) +
		model.numBrushRefs * sizeof( cm_brushRef_t );

	return true;
};

/*
================
idCollisionModelManagerLocal::LoadCollisionModelFile
================
*/
idCollisionModelManagerLocal.prototype.LoadCollisionModelFile = function ( name: string, /*unsigned int */mapFileCRC: number ): boolean {
	var fileName = new idStr;
	var token = new idToken;
	var src: idLexer;
	var crc: number /*unsigned int */;

	// load it
	fileName.equals( name );
	fileName.SetFileExtension( CM_FILE_EXT );
	src = new idLexer( fileName.data );
	src.SetFlags( lexerFlags_t.LEXFL_NOSTRINGCONCAT | lexerFlags_t.LEXFL_NODOLLARPRECOMPILE );
	if ( !src.IsLoaded ( ) ) {
		$delete( src );
		return false;
	}

	if ( !src.ExpectTokenString( CM_FILEID ) ) {
		common.Warning( "%s is not an CM file.", fileName.c_str ( ) );
		$delete( src );
		return false;
	}

	if ( !src.ReadToken( token ) || token.data != CM_FILEVERSION ) {
		common.Warning( "%s has version %s instead of %s", fileName.c_str ( ), token.c_str ( ), CM_FILEVERSION );
		$delete( src );
		return false;
	}

	if ( !src.ExpectTokenType( TT_NUMBER, TT_INTEGER, token ) ) {
		common.Warning( "%s has no map file CRC", fileName.c_str ( ) );
		$delete( src );
		return false;
	}

	crc = token.GetUnsignedLongValue ( );
	if ( mapFileCRC && crc != mapFileCRC ) {
		common.Printf( "%s is out of date\n", fileName.c_str ( ) );
		$delete( src );
		return false;
	}

	// parse the file
	while ( 1 ) {
		if ( !src.ReadToken( token ) ) {
			break;
		}

		if ( token.data == "collisionModel" ) {
			if ( !this.ParseCollisionModel( src ) ) {
				$delete( src );
				return false;
			}
			continue;
		}

		src.Error( "idCollisionModelManagerLocal::LoadCollisionModelFile: bad token \"%s\"", token.c_str ( ) );
	}

	$delete( src );

	return true;
};
