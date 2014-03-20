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
//

/*
================
idRenderWorldLocal::FreeWorld
================
*/
idRenderWorldLocal.prototype.FreeWorld = function ( ): void {
	var i: number;

	// this will free all the lightDefs and entityDefs
	this.FreeDefs ( );

	// free all the portals and check light/model references
	for ( i = 0; i < this.numPortalAreas; i++ ) {
		var area: portalArea_t;
		var portal: portal_t, nextPortal: portal_t;
		todoThrow( "portal.next struct/ref ???" );
		//area = this.portalAreas[i];
		//for ( portal = area.portals ; portal ; portal = nextPortal ) {
		//	nextPortal = portal.next;
		//	$delete (portal.w):
		//	delete portal.w;
		//	R_StaticFree( portal );
		//}

		//// there shouldn't be any remaining lightRefs or entityRefs
		//if ( area.lightRefs.areaNext != area.lightRefs ) {
		//	common.Error( "FreeWorld: unexpected remaining lightRefs" );
		//}
		//if ( area.entityRefs.areaNext != area.entityRefs ) {
		//	common.Error( "FreeWorld: unexpected remaining entityRefs" );
		//}
	}

	if ( this.portalAreas ) {
		R_StaticFree( this.portalAreas );
		this.portalAreas = null;
		this.numPortalAreas = 0;
		R_StaticFree( this.areaScreenRect );
		this.areaScreenRect = null;
	}

	if ( this.doublePortals ) {
		R_StaticFree( this.doublePortals );
		this.doublePortals = null;
		this.numInterAreaPortals = 0;
	}

	if ( this.areaNodes ) {
		R_StaticFree( this.areaNodes );
		this.areaNodes = NULL;
	}

	// free all the inline idRenderModels 
	for ( i = 0; i < this.localModels.Num ( ); i++ ) {
		renderModelManager.RemoveModel( this.localModels[i] );
		$delete( this.localModels[i] );
		delete this.localModels[i];
	}
	this.localModels.Clear ( );

	this.areaReferenceAllocator.Shutdown ( );
	this.interactionAllocator.Shutdown ( );
	this.areaNumRefAllocator.Shutdown ( );

	this.mapName.equals( "<FREED>" );
};
//
///*
//================
//idRenderWorldLocal::TouchWorldModels
//================
//*/
//void idRenderWorldLocal::TouchWorldModels( void ) {
//	int i;
//
//	for ( i = 0 ; i < this.localModels.Num() ; i++ ) {
//		renderModelManager.CheckModel( this.localModels[i].Name() );
//	}
//}

/*
================
idRenderWorldLocal::ParseModel
================
*/
var ParseModelCount = 0;
idRenderWorldLocal.prototype.ParseModel = function ( src: idLexer ): idRenderModel {
	var model: idRenderModel;
	var token = new idToken;
	var i: number, j: number;
	var tri: srfTriangles_t;
	var surf = new modelSurface_t;

	src.ExpectTokenString( "{" );

	// parse the name
	src.ExpectAnyToken( token );

	model = renderModelManager.AllocModel ( );
	model.InitEmpty( token.data );

	var numSurfaces = src.ParseInt ( );
	if ( numSurfaces < 0 ) {
		src.Error( "R_ParseModel: bad numSurfaces" );
	}

	dlog(DEBUG_RENDERWORLD_LOAD, "ParseModelCount %i\n", ParseModelCount );
	ParseModelCount++;
	for ( i = 0; i < numSurfaces; i++ ) {
		src.ExpectTokenString( "{" );

		src.ExpectAnyToken( token );

		surf.shader = declManager.FindMaterial( token.data );
		dlog(DEBUG_RENDERWORLD_LOAD, "shader %s i: %i\n", token.data, i);

		( <idMaterial>surf.shader ).AddReference ( );

		tri = R_AllocStaticTriSurf ( );
		surf.geometry = tri;

		tri.numVerts = src.ParseInt ( );
		tri.numIndexes = src.ParseInt();

		dlog( DEBUG_RENDERWORLD_LOAD, "	tri.numVerts %i tri.numIndexes: %i\n", tri.numVerts, tri.numIndexes );

		R_AllocStaticTriSurfVerts( tri, tri.numVerts );
		for ( j = 0; j < tri.numVerts; j++ ) {
			var vec = new Float32Array( 8 );

			src.Parse1DMatrix( 8, vec );

			dlog( DEBUG_RENDERWORLD_LOAD, "vec j: %i %.2f, %.2f, %.2f, %.2f, %.2f, %.2f, %.2f, %.2f\n",
				j, vec[0], vec[1], vec[2], vec[3], vec[4], vec[5], vec[6], vec[7]);

			tri.verts[j].xyz[0] = vec[0];
			tri.verts[j].xyz[1] = vec[1];
			tri.verts[j].xyz[2] = vec[2];
			tri.verts[j].st[0] = vec[3];
			tri.verts[j].st[1] = vec[4];
			tri.verts[j].normal[0] = vec[5];
			tri.verts[j].normal[1] = vec[6];
			tri.verts[j].normal[2] = vec[7];
		}

		R_AllocStaticTriSurfIndexes( tri, tri.numIndexes );
		for ( j = 0; j < tri.numIndexes; j++ ) {
			tri.indexes[j] = src.ParseInt ( );
			dlog( DEBUG_RENDERWORLD_LOAD, "tri.indexes[%i]: %i\n", j, tri.indexes[j] );
		}
		src.ExpectTokenString( "}" );

		// add the completed surface to the model
		model.AddSurface( surf );
	}

	src.ExpectTokenString( "}" );

	model.FinishSurfaces ( );

	return model;
};

///*
//================
//idRenderWorldLocal::ParseShadowModel
//================
//*/
//idRenderModel *idRenderWorldLocal::ParseShadowModel( idLexer *src ) {
//	idRenderModel	*model;
//	idToken			token;
//	int				j;
//	srfTriangles_t	*tri;
//	modelSurface_t	surf;
//
//	src.ExpectTokenString( "{" );
//
//	// parse the name
//	src.ExpectAnyToken( &token );
//
//	model = renderModelManager.AllocModel();
//	model.InitEmpty( token );
//
//	surf.shader = tr.defaultMaterial;
//
//	tri = R_AllocStaticTriSurf();
//	surf.geometry = tri;
//
//	tri.numVerts = src.ParseInt();
//	tri.numShadowIndexesNoCaps = src.ParseInt();
//	tri.numShadowIndexesNoFrontCaps = src.ParseInt();
//	tri.numIndexes = src.ParseInt();
//	tri.shadowCapPlaneBits = src.ParseInt();
//
//	R_AllocStaticTriSurfShadowVerts( tri, tri.numVerts );
//	tri.bounds.Clear();
//	for ( j = 0 ; j < tri.numVerts ; j++ ) {
//		float	vec[8];
//
//		src.Parse1DMatrix( 3, vec );
//		tri.shadowVertexes[j].xyz[0] = vec[0];
//		tri.shadowVertexes[j].xyz[1] = vec[1];
//		tri.shadowVertexes[j].xyz[2] = vec[2];
//		tri.shadowVertexes[j].xyz[3] = 1;		// no homogenous value
//
//		tri.bounds.AddPoint( tri.shadowVertexes[j].xyz.ToVec3() );
//	}
//
//	R_AllocStaticTriSurfIndexes( tri, tri.numIndexes );
//	for ( j = 0 ; j < tri.numIndexes ; j++ ) {
//		tri.indexes[j] = src.ParseInt();
//	}
//
//	// add the completed surface to the model
//	model.AddSurface( surf );
//
//	src.ExpectTokenString( "}" );
//
//	// we do NOT do a model.FinishSurfaceces, because we don't need sil edges, planes, tangents, etc.
////	model.FinishSurfaces();
//
//	return model;
//}
//
///*
//================
//idRenderWorldLocal::SetupAreaRefs
//================
//*/
//void idRenderWorldLocal::SetupAreaRefs() {
//	int		i;
//
//	connectedAreaNum = 0;
//	for ( i = 0 ; i < this.numPortalAreas ; i++ ) {
//		this.portalAreas[i].areaNum = i;
//		this.portalAreas[i].lightRefs.areaNext =
//		this.portalAreas[i].lightRefs.areaPrev =
//			&this.portalAreas[i].lightRefs;
//		this.portalAreas[i].entityRefs.areaNext =
//		this.portalAreas[i].entityRefs.areaPrev =
//			&this.portalAreas[i].entityRefs;
//	}
//}
//
///*
//================
//idRenderWorldLocal::ParseInterAreaPortals
//================
//*/
//void idRenderWorldLocal::ParseInterAreaPortals( idLexer *src ) {
//	int i, j;
//
//	src.ExpectTokenString( "{" );
//
//	this.numPortalAreas = src.ParseInt();
//	if ( this.numPortalAreas < 0 ) {
//		src.Error( "R_ParseInterAreaPortals: bad numPortalAreas" );
//		return;
//	}
//	this.portalAreas = (portalArea_t *)R_ClearedStaticAlloc( this.numPortalAreas * sizeof( this.portalAreas[0] ) );
//	this.areaScreenRect = (idScreenRect *) R_ClearedStaticAlloc( this.numPortalAreas * sizeof( idScreenRect ) );
//
//	// set the doubly linked lists
//	SetupAreaRefs();
//
//	this.numInterAreaPortals = src.ParseInt();
//	if ( this.numInterAreaPortals < 0 ) {
//		src.Error(  "R_ParseInterAreaPortals: bad numInterAreaPortals" );
//		return;
//	}
//
//	this.doublePortals = (doublePortal_t *)R_ClearedStaticAlloc( this.numInterAreaPortals * 
//		sizeof( this.doublePortals [0] ) );
//
//	for ( i = 0 ; i < this.numInterAreaPortals ; i++ ) {
//		int		numPoints, a1, a2;
//		idWinding	*w;
//		portal_t	*p;
//
//		numPoints = src.ParseInt();
//		a1 = src.ParseInt();
//		a2 = src.ParseInt();
//
//		w = new idWinding( numPoints );
//		w.SetNumPoints( numPoints );
//		for ( j = 0 ; j < numPoints ; j++ ) {
//			src.Parse1DMatrix( 3, (*w)[j].ToFloatPtr() );
//			// no texture coordinates
//			(*w)[j][3] = 0;
//			(*w)[j][4] = 0;
//		}
//
//		// add the portal to a1
//		p = (portal_t *)R_ClearedStaticAlloc( sizeof( *p ) );
//		p.intoArea = a2;
//		p.doublePortal = &this.doublePortals[i];
//		p.w = w;
//		p.w.GetPlane( p.plane );
//
//		p.next = this.portalAreas[a1].portals;
//		this.portalAreas[a1].portals = p;
//
//		this.doublePortals[i].portals[0] = p;
//
//		// reverse it for a2
//		p = (portal_t *)R_ClearedStaticAlloc( sizeof( *p ) );
//		p.intoArea = a1;
//		p.doublePortal = &this.doublePortals[i];
//		p.w = w.Reverse();
//		p.w.GetPlane( p.plane );
//
//		p.next = this.portalAreas[a2].portals;
//		this.portalAreas[a2].portals = p;
//
//		this.doublePortals[i].portals[1] = p;
//	}
//
//	src.ExpectTokenString( "}" );
//}
//
///*
//================
//idRenderWorldLocal::ParseNodes
//================
//*/
//void idRenderWorldLocal::ParseNodes( idLexer *src ) {
//	int			i;
//
//	src.ExpectTokenString( "{" );
//
//	numAreaNodes = src.ParseInt();
//	if ( numAreaNodes < 0 ) {
//		src.Error( "R_ParseNodes: bad numAreaNodes" );
//	}
//	this.areaNodes = (areaNode_t *)R_ClearedStaticAlloc( numAreaNodes * sizeof( this.areaNodes[0] ) );
//
//	for ( i = 0 ; i < numAreaNodes ; i++ ) {
//		areaNode_t	*node;
//
//		node = &this.areaNodes[i];
//
//		src.Parse1DMatrix( 4, node.plane.ToFloatPtr() );
//		node.children[0] = src.ParseInt();
//		node.children[1] = src.ParseInt();
//	}
//
//	src.ExpectTokenString( "}" );
//}
//
///*
//================
//idRenderWorldLocal::CommonChildrenArea_r
//================
//*/
//int idRenderWorldLocal::CommonChildrenArea_r( areaNode_t *node ) {
//	int	nums[2];
//
//	for ( int i = 0 ; i < 2 ; i++ ) {
//		if ( node.children[i] <= 0 ) {
//			nums[i] = -1 - node.children[i];
//		} else {
//			nums[i] = this.CommonChildrenArea_r( &this.areaNodes[ node.children[i] ] );
//		}
//	}
//
//	// solid nodes will match any area
//	if ( nums[0] == AREANUM_SOLID ) {
//		nums[0] = nums[1];
//	}
//	if ( nums[1] == AREANUM_SOLID ) {
//		nums[1] = nums[0];
//	}
//
//	int	common;
//	if ( nums[0] == nums[1] ) {
//		common = nums[0];
//	} else {
//		common = CHILDREN_HAVE_MULTIPLE_AREAS;
//	}
//
//	node.commonChildrenArea = common;
//
//	return common;
//}
//
///*
//=================
//idRenderWorldLocal::ClearWorld
//
//Sets up for a single area world
//=================
//*/
//void idRenderWorldLocal::ClearWorld() {
//	this.numPortalAreas = 1;
//	this.portalAreas = (portalArea_t *)R_ClearedStaticAlloc( sizeof( this.portalAreas[0] ) );
//	this.areaScreenRect = (idScreenRect *) R_ClearedStaticAlloc( sizeof( idScreenRect ) );
//
//	SetupAreaRefs();
//
//	// even though we only have a single area, create a node
//	// that has both children pointing at it so we don't need to
//	//
//	this.areaNodes = (areaNode_t *)R_ClearedStaticAlloc( sizeof( this.areaNodes[0] ) );
//	this.areaNodes[0].plane[3] = 1;
//	this.areaNodes[0].children[0] = -1;
//	this.areaNodes[0].children[1] = -1;
//}

/*
=================
idRenderWorldLocal::FreeDefs

dump all the interactions
=================
*/
idRenderWorldLocal.prototype.FreeDefs = function ( ): void {
	var /*int*/i: number;

	this.generateAllInteractionsCalled = false;

	if ( this.interactionTable ) {
		R_StaticFree( this.interactionTable );
		this.interactionTable = null;
	}

	// free all lightDefs
	for ( i = 0; i < this.lightDefs.Num ( ); i++ ) {
		var light: idRenderLightLocal;

		light = this.lightDefs[i];
		if ( light && light.world == this ) {
			this.FreeLightDef( i );
			this.lightDefs[i] = null;
		}
	}

	// free all entityDefs
	for ( i = 0; i < this.entityDefs.Num ( ); i++ ) {
		var mod: idRenderEntityLocal;

		mod = this.entityDefs[i];
		if ( mod && mod.world == this ) {
			this.FreeEntityDef( i );
			this.entityDefs[i] = null;
		}
	}
};

/*
=================
idRenderWorldLocal::InitFromMap

A NULL or empty name will make a world without a map model, which
is still useful for displaying a bare model
=================
*/
idRenderWorldLocal.prototype.InitFromMap = function ( name: string ): boolean {
	var src: idLexer;
	var token = new idToken;
	var filename = new idStr;
	var lastModel: idRenderModel;

	// if this is an empty world, initialize manually
	if ( !name /*|| !name[0] */ ) {
		this.FreeWorld ( );
		this.mapName.Clear ( );
		this.ClearWorld ( );
		return true;
	}


	// load it
	filename.equals( name );
	filename.SetFileExtension( PROC_FILE_EXT );

	// if we are reloading the same map, check the timestamp
	// and try to skip all the work
	var currentTimeStamp = new R<number> ( );
	fileSystem.ReadFile( filename.data, null, currentTimeStamp );

	if ( name == this.mapName.data ) {
		if ( currentTimeStamp.$ != FILE_NOT_FOUND_TIMESTAMP && currentTimeStamp.$ == this.mapTimeStamp ) {
			common.Printf( "idRenderWorldLocal::InitFromMap: retaining existing map\n" );
			todoThrow ( );
			this.FreeDefs ( );
			this.TouchWorldModels ( );
			this.AddWorldModelEntities ( );
			this.ClearPortalStates ( );
			return true;
		}
		common.Printf( "idRenderWorldLocal::InitFromMap: timestamp has changed, reloading.\n" );
	}

	this.FreeWorld ( );

	src = new idLexer( filename.data, lexerFlags_t.LEXFL_NOSTRINGCONCAT | lexerFlags_t.LEXFL_NODOLLARPRECOMPILE );
	if ( !src.IsLoaded ( ) ) {
		common.Printf( "idRenderWorldLocal::InitFromMap: %s not found\n", filename.c_str ( ) );
		this.ClearWorld ( );
		return false;
	}


	this.mapName.equals( name );
	this.mapTimeStamp = currentTimeStamp.$;

	// if we are writing a demo, archive the load command
	if ( session.writeDemo ) {
		this.WriteLoadMap ( );
	}

	if ( !src.ReadToken( token ) || token.Icmp( PROC_FILE_ID ) ) {
		common.Printf( "idRenderWorldLocal::InitFromMap: bad id '%s' instead of '%s'\n", token.c_str ( ), PROC_FILE_ID );
		$delete( src );
		delete src;
		return false;
	}

	// parse the file
	while ( 1 ) {
		if ( !src.ReadToken( token ) ) {
			break;
		}

		if ( token.data == "model" ) {
			lastModel = this.ParseModel( src );

			// add it to the model manager list
			renderModelManager.AddModel( lastModel );

			// save it in the list to free when clearing this map
			this.localModels.Append( lastModel );
			continue;
		}

		if ( token.data == "shadowModel" ) {
			dlog(DEBUG_RENDERWORLD_LOAD, "ParseShadowModel\n");
			lastModel = this.ParseShadowModel( src );

			// add it to the model manager list
			renderModelManager.AddModel( lastModel );

			// save it in the list to free when clearing this map
			this.localModels.Append( lastModel );
			continue;
		}

		if ( token.data == "interAreaPortals" ) {
			dlog(DEBUG_RENDERWORLD_LOAD, "interAreaPortals\n");
			this.ParseInterAreaPortals( src );
			continue;
		}

		if ( token.data == "nodes" ) {
			dlog(DEBUG_RENDERWORLD_LOAD, "nodes\n");
			this.ParseNodes( src );
			continue;
		}

		src.Error( "idRenderWorldLocal::InitFromMap: bad token \"%s\"", token.c_str ( ) );
	}

	$delete( src );

	// if it was a trivial map without any areas, create a single area
	if ( !this.numPortalAreas ) {
		this.ClearWorld ( );
	}

	// find the points where we can early-our of reference pushing into the BSP tree
	this.CommonChildrenArea_r( this.areaNodes );

	this.AddWorldModelEntities ( );
	this.ClearPortalStates ( );

	// done!
	return true;
};

///*
//=====================
//idRenderWorldLocal::ClearPortalStates
//=====================
//*/
//void idRenderWorldLocal::ClearPortalStates() {
//	int		i, j;
//
//	// all portals start off open
//	for ( i = 0 ; i < this.numInterAreaPortals ; i++ ) {
//		this.doublePortals[i].blockingBits = PS_BLOCK_NONE;
//	}
//
//	// flood fill all area connections
//	for ( i = 0 ; i < this.numPortalAreas ; i++ ) {
//		for ( j = 0 ; j < NUM_PORTAL_ATTRIBUTES ; j++ ) {
//			connectedAreaNum++;
//			FloodConnectedAreas( &this.portalAreas[i], j );
//		}
//	}
//}
//
///*
//=====================
//idRenderWorldLocal::AddWorldModelEntities
//=====================
//*/
//void idRenderWorldLocal::AddWorldModelEntities() {
//	int		i;
//
//	// add the world model for each portal area
//	// we can't just call AddEntityDef, because that would place the references
//	// based on the bounding box, rather than explicitly into the correct area
//	for ( i = 0 ; i < this.numPortalAreas ; i++ ) {
//		idRenderEntityLocal	*def;
//		int			index;
//
//		def = new idRenderEntityLocal;
//
//		// try and reuse a free spot
//		index = this.entityDefs.FindNull();
//		if ( index == -1 ) {
//			index = this.entityDefs.Append(def);
//		} else {
//			this.entityDefs[index] = def;
//		}
//
//		def.index = index;
//		def.world = this;
//
//		def.parms.hModel = renderModelManager.FindModel( va("_area%i", i ) );
//		if ( def.parms.hModel.IsDefaultModel() || !def.parms.hModel.IsStaticWorldModel() ) {
//			common.Error( "idRenderWorldLocal::InitFromMap: bad area model lookup" );
//		}
//
//		idRenderModel *hModel = def.parms.hModel;
//
//		for ( int j = 0; j < hModel.NumSurfaces(); j++ ) {
//			const modelSurface_t *surf = hModel.Surface( j );
//
//			if ( surf.shader.GetName() == idStr( "textures/smf/portal_sky" ) ) {
//				def.needsPortalSky = true;
//			}
//		}
//
//		def.referenceBounds = def.parms.hModel.Bounds();
//
//		def.parms.axis[0][0] = 1;
//		def.parms.axis[1][1] = 1;
//		def.parms.axis[2][2] = 1;
//
//		R_AxisToModelMatrix( def.parms.axis, def.parms.origin, def.modelMatrix );
//
//		// in case an explicit shader is used on the world, we don't
//		// want it to have a 0 alpha or color
//		def.parms.shaderParms[0] =
//		def.parms.shaderParms[1] =
//		def.parms.shaderParms[2] =
//		def.parms.shaderParms[3] = 1;
//
//		AddEntityRefToArea( def, &this.portalAreas[i] );
//	}
//}
//
///*
//=====================
//CheckAreaForPortalSky
//=====================
//*/
//bool idRenderWorldLocal::CheckAreaForPortalSky( int areaNum ) {
//	areaReference_t	*ref;
//
//	assert( areaNum >= 0 && areaNum < this.numPortalAreas );
//
//	for ( ref = this.portalAreas[areaNum].entityRefs.areaNext; ref.entity; ref = ref.areaNext ) {
//		assert( ref.area == &this.portalAreas[areaNum] );
//
//		if ( ref.entity && ref.entity.needsPortalSky ) {
//			return true;
//		}
//	}
//
//	return false;
//}
