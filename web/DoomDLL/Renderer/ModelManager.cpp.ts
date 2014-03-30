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
////#include "Model_local.h"
////#include "tr_local.h"	// just for R_FreeWorldInteractions and R_CreateWorldInteractions
////
////
class idRenderModelManagerLocal extends idRenderModelManager {
////public:
////							idRenderModelManagerLocal();
////	virtual					~idRenderModelManagerLocal() {}
////
//Init():void { throw "placeholder"; }
////	virtual void			Shutdown():void { throw "placeholder"; }
////	virtual idRenderModel *	AllocModel():idRenderModel { throw "placeholder"; }
	//FreeModel ( model: idRenderModel ): void { throw "placeholder"; }
////	virtual idRenderModel *	FindModel( const char *modelName ):idRenderModel { throw "placeholder"; }
////	virtual idRenderModel *	CheckModel( const char *modelName ):idRenderModel { throw "placeholder"; }
////	virtual idRenderModel *	DefaultModel():idRenderModel { throw "placeholder"; }
////	virtual void			AddModel( idRenderModel *model ):void { throw "placeholder"; }
	////RemoveModel ( model: idRenderModel ): void { throw "placeholder"; }
////	virtual void			ReloadModels( bool forceAll = false ):void { throw "placeholder"; }
////	virtual void			FreeModelVertexCaches():void { throw "placeholder"; }
////	virtual void			WritePrecacheCommands( idFile *file ):void { throw "placeholder"; }
	////BeginLevelLoad ( ): void { throw "placeholder"; }
////	virtual void			EndLevelLoad():void { throw "placeholder"; }
////
////	virtual	void			PrintMemInfo( MemInfo_t *mi ):void { throw "placeholder"; }

////private:
	models = new idList<idRenderModel>( idRenderModel, true );
	hash = new idHashIndex ( );
	defaultModel: idRenderModel;
	beamModel: idRenderModel;
	spriteModel: idRenderModel;
	trailModel: idRenderModel;
	insideLevelLoad: boolean; // don't actually load now
////
////	idRenderModel *			GetModel( const char *modelName, bool createIfNotFound );
////
////	static void				PrintModel_f( const idCmdArgs &args );
////	static void				ListModels_f( const idCmdArgs &args );
////	static void				ReloadModels_f( const idCmdArgs &args );
////	static void				TouchModel_f( const idCmdArgs &args );


/*
==============
idRenderModelManagerLocal::idRenderModelManagerLocal
==============
*/
	constructor ( ) {
		super ( );
		this.defaultModel = null;
		this.beamModel = null;
		this.spriteModel = null;
		this.insideLevelLoad = false;
		this.trailModel = null;
	}

/*
==============
idRenderModelManagerLocal::PrintModel_f
==============
*/
	PrintModel_f ( args: idCmdArgs ) {
		todoThrow ( );
		//idRenderModel	*model;

		//if ( args.Argc() != 2 ) {
		//	common.Printf( "usage: printModel <modelName>\n" );
		//	return;
		//}

		//model = renderModelManager.CheckModel( args.Argv( 1 ) );
		//if ( !model ) {
		//	common.Printf( "model \"%s\" not found\n", args.Argv( 1 ) );
		//	return;
		//}

		//model.Print();
	}

/*
==============
idRenderModelManagerLocal::ListModels_f
==============
*/
	ListModels_f ( args: idCmdArgs ): void {
		todoThrow ( );
		//int		totalMem = 0;
		//int		inUse = 0;

		//common.Printf( " mem   srf verts tris\n" );
		//common.Printf( " ---   --- ----- ----\n" );

		//for ( int i = 0 ; i < localModelManager.models.Num() ; i++ ) {
		//	idRenderModel	*model = localModelManager.models[i];

		//	if ( !model.IsLoaded() ) {
		//		continue;
		//	}
		//	model.List();
		//	totalMem += model.Memory();
		//	inUse++;
		//}

		//common.Printf( " ---   --- ----- ----\n" );
		//common.Printf( " mem   srf verts tris\n" );

		//common.Printf( "%i loaded models\n", inUse );
		//common.Printf( "total memory: %4.1fM\n", (float)totalMem / (1024*1024) );
	}


/*
==============
idRenderModelManagerLocal::ReloadModels_f
==============
*/
	ReloadModels_f ( args: idCmdArgs ): void {
		todoThrow ( );
		//if ( idStr::Icmp( args.Argv(1), "all" ) == 0 ) {
		//	localModelManager.ReloadModels( true );
		//} else {
		//	localModelManager.ReloadModels( false );
		//}
	}

/*
==============
idRenderModelManagerLocal::TouchModel_f

Precache a specific model
==============
*/
	TouchModel_f ( args: idCmdArgs ): void {
		todoThrow ( );
		//const char	*model = args.Argv( 1 );

		//if ( !model[0] ) {
		//	common.Printf( "usage: touchModel <modelName>\n" );
		//	return;
		//}

		//common.Printf( "touchModel %s\n", model );
		//session.UpdateScreen();
		//idRenderModel *m = renderModelManager.CheckModel( model );
		//if ( !m ) {
		//	common.Printf( "...not found\n" );
		//}
	}

/////*
////=================
////idRenderModelManagerLocal::WritePrecacheCommands
////=================
////*/
////void idRenderModelManagerLocal::WritePrecacheCommands( idFile *f ) {
////	for ( int i = 0 ; i < this.models.Num() ; i++ ) {
////		idRenderModel	*model = this.models[i];
////
////		if ( !model ) {
////			continue;
////		}
////		if ( !model.IsReloadable() ) {
////			continue;
////		}
////
////		char	str[1024];
////		sprintf( str, "touchModel %s\n", model.Name() );
////		common.Printf( "%s", str );
////		f.Printf( "%s", str );
////	}
////}

/*
=================
idRenderModelManagerLocal::Init
=================
*/
	Init ( ): void {
		cmdSystem.AddCommand( "listModels", this.ListModels_f, cmdFlags_t.CMD_FL_RENDERER, "lists all models" );
		cmdSystem.AddCommand( "printModel", this.PrintModel_f, cmdFlags_t.CMD_FL_RENDERER, "prints model info", ArgCompletion_ModelName );
		cmdSystem.AddCommand( "reloadModels", this.ReloadModels_f, cmdFlags_t.CMD_FL_RENDERER | cmdFlags_t.CMD_FL_CHEAT, "reloads models" );
		cmdSystem.AddCommand( "touchModel", this.TouchModel_f, cmdFlags_t.CMD_FL_RENDERER, "touches a model", ArgCompletion_ModelName );

		this.insideLevelLoad = false;

		// create a default model
		var model = new idRenderModelStatic;
		model.InitEmpty( "_DEFAULT" );
		model.MakeDefaultModel ( );
		model.SetLevelLoadReferenced( true );
		this.defaultModel = model;
		this.AddModel( model );

		// create the beam model
		var beam = new idRenderModelBeam;
		beam.InitEmpty( "_BEAM" );
		beam.SetLevelLoadReferenced( true );
		this.beamModel = beam;
		this.AddModel( beam );

		var sprite = new idRenderModelSprite;
		sprite.InitEmpty( "_SPRITE" );
		sprite.SetLevelLoadReferenced( true );
		this.spriteModel = sprite;
		this.AddModel( sprite );
	}

/////*
////=================
////idRenderModelManagerLocal::Shutdown
////=================
////*/
////void idRenderModelManagerLocal::Shutdown() {
////	this.models.DeleteContents( true );
////	this.hash.Free();
////}

/*
=================
idRenderModelManagerLocal::GetModel
=================
*/
	GetModel ( modelName: string, createIfNotFound: boolean ): idRenderModel {
		var canonical = new idStr;
		var extension = new idStr;

		if ( !modelName /*|| !modelName[0]*/ ) {
			return null;
		}

		canonical.equals( modelName );
		canonical.ToLower ( );

		// see if it is already present
		var /*int */key = this.hash.GenerateKey( modelName, false );
		for ( var i = this.hash.First( key ); i != -1; i = this.hash.Next( i ) ) {
			var model: idRenderModel = this.models[i];

			if ( canonical.Icmp( model.Name ( ) ) == 0 ) {
				if ( !model.IsLoaded ( ) ) {
					// reload it if it was purged
					model.LoadModel ( );
				} else if ( this.insideLevelLoad && !model.IsLevelLoadReferenced ( ) ) {
					// we are reusing a model already in memory, but
					// touch all the materials to make sure they stay
					// in memory as well
					model.TouchData ( );
				}
				model.SetLevelLoadReferenced( true );
				return model;
			}
		}

		// see if we can load it

		// determine which subclass of idRenderModel to initialize
		
		var model: idRenderModel;

		canonical.ExtractFileExtension( extension );

		if ( ( extension.Icmp( "ase" ) == 0 ) || ( extension.Icmp( "lwo" ) == 0 ) || ( extension.Icmp( "flt" ) == 0 ) ) {
			model = new idRenderModelStatic;
			model.InitFromFile( modelName );
		} else if ( extension.Icmp( "ma" ) == 0 ) {
			model = new idRenderModelStatic;
			model.InitFromFile( modelName );
		} else if ( extension.Icmp( MD5_MESH_EXT ) == 0 ) {
			model = new idRenderModelMD5;
			model.InitFromFile( modelName );
		} else if ( extension.Icmp( "md3" ) == 0 ) {
			model = new idRenderModelMD3;
			model.InitFromFile( modelName );
		} else if ( extension.Icmp( "prt" ) == 0 ) {
			model = new idRenderModelPrt;
			model.InitFromFile( modelName );
		} else if ( extension.Icmp( "liquid" ) == 0 ) {
			model = new idRenderModelLiquid;
			model.InitFromFile( modelName );
		} else {

			if ( extension.Length ( ) ) {
				common.Warning( "unknown model type '%s'", canonical.c_str ( ) );
			}

			if ( !createIfNotFound ) {
				return null;
			}

			var smodel = new idRenderModelStatic;
			smodel.InitEmpty( modelName );
			smodel.MakeDefaultModel ( );

			model = smodel;
		}

		model.SetLevelLoadReferenced( true );

		if ( !createIfNotFound && model.IsDefaultModel ( ) ) {
			$delete( model );
			model = null;

			return null;
		}

		this.AddModel( model );

		return model;
	}

/*
=================
idRenderModelManagerLocal::AllocModel
=================
*/
	AllocModel ( ): idRenderModel {
		return new idRenderModelStatic ( );
	}

/*
=================
idRenderModelManagerLocal::FreeModel
=================
*/
	FreeModel ( model: idRenderModel ): void {
		if ( !model ) {
			return;
		}
		if ( !dynamic_cast<idRenderModelStatic>( model, idRenderModelStatic ) ) {
			common.Error( "idRenderModelManager::FreeModel: model '%s' is not a static model", model.Name ( ) );
			return;
		}
		if ( model == this.defaultModel ) {
			common.Error( "idRenderModelManager::FreeModel: can't free the default model" );
			return;
		}
		if ( model == this.beamModel ) {
			common.Error( "idRenderModelManager::FreeModel: can't free the beam model" );
			return;
		}
		if ( model == this.spriteModel ) {
			common.Error( "idRenderModelManager::FreeModel: can't free the sprite model" );
			return;
		}

		R_CheckForEntityDefsUsingModel( model );

		$delete( model );
	}

/*
=================
idRenderModelManagerLocal::FindModel
=================
*/
	FindModel ( modelName: string ): idRenderModel {
		return this.GetModel( modelName, true );
	}

/*
=================
idRenderModelManagerLocal::CheckModel
=================
*/
	CheckModel ( modelName: string ): idRenderModel {
		return this.GetModel( modelName, false );
	}

/*
=================
idRenderModelManagerLocal::DefaultModel
=================
*/
	DefaultModel ( ): idRenderModel {
		return this.defaultModel;
	}

/*
=================
idRenderModelManagerLocal::AddModel
=================
*/
	AddModel ( model: idRenderModel ): void {
		this.hash.Add( this.hash.GenerateKey( model.Name ( ), false ), this.models.Append( model ) );
	}

/*
=================
idRenderModelManagerLocal::RemoveModel
=================
*/
	RemoveModel ( model: idRenderModel ): void {
		var index = this.models.FindIndex( model );
		this.hash.RemoveIndex( this.hash.GenerateKey( model.Name ( ), false ), index );
		this.models.RemoveIndex( index );
	}

/////*
////=================
////idRenderModelManagerLocal::ReloadModels
////=================
////*/
////void idRenderModelManagerLocal::ReloadModels( bool forceAll ) {
////	if ( forceAll ) {
////		common.Printf( "Reloading all model files...\n" );
////	} else {
////		common.Printf( "Checking for changed model files...\n" );
////	}
////
////	R_FreeDerivedData();
////
////	// skip the default model at index 0
////	for ( int i = 1 ; i < this.models.Num() ; i++ ) {
////		idRenderModel	*model = this.models[i];
////
////		// we may want to allow world model reloading in the future, but we don't now
////		if ( !model.IsReloadable() ) {
////			continue;
////		}
////
////		if ( !forceAll ) {
////			// check timestamp
////			ID_TIME_T current;
////
////			fileSystem.ReadFile( model.Name(), NULL, &current );
////			if ( current <= model.Timestamp() ) {
////				continue;
////			}
////		}
////
////		common.DPrintf( "reloading %s.\n", model.Name() );
////
////		model.LoadModel();
////	}
////
////	// we must force the world to regenerate, because models may
////	// have changed size, making their references invalid
////	R_ReCreateWorldReferences();
////}
////
/////*
////=================
////idRenderModelManagerLocal::FreeModelVertexCaches
////=================
////*/
////void idRenderModelManagerLocal::FreeModelVertexCaches() {
////	for ( int i = 0 ; i < this.models.Num() ; i++ ) {
////		idRenderModel *model = this.models[i];
////		model.FreeVertexCache();
////	}
////}
////
/*
=================
idRenderModelManagerLocal::BeginLevelLoad
=================
*/
	BeginLevelLoad ( ): void {
		this.insideLevelLoad = true;

		for ( var i = 0; i < this.models.Num ( ); i++ ) {
			var model = this.models[i];

			if ( com_purgeAll.GetBool ( ) && model.IsReloadable ( ) ) {
				todoThrow ( );
				//R_CheckForEntityDefsUsingModel( model );
				//model.PurgeModel ( );
			}

			model.SetLevelLoadReferenced( false );
		}

		// purge unused triangle surface memory
		R_PurgeTriSurfData( frameData );
	}
////
/////*
////=================
////idRenderModelManagerLocal::EndLevelLoad
////=================
////*/
////void idRenderModelManagerLocal::EndLevelLoad() {
////	common.Printf( "----- idRenderModelManagerLocal::EndLevelLoad -----\n" );
////
////	int start = Sys_Milliseconds();
////
////	this.insideLevelLoad = false;
////	int	purgeCount = 0;
////	int	keepCount = 0;
////	int	loadCount = 0;
////
////	// purge any models not touched
////	for ( int i = 0 ; i < this.models.Num() ; i++ ) {
////		idRenderModel *model = this.models[i];
////
////		if ( !model.IsLevelLoadReferenced() && model.IsLoaded() && model.IsReloadable() ) {
////
//////			common.Printf( "purging %s\n", model.Name() );
////
////			purgeCount++;
////
////			R_CheckForEntityDefsUsingModel( model );
////
////			model.PurgeModel();
////
////		} else {
////
//////			common.Printf( "keeping %s\n", model.Name() );
////
////			keepCount++;
////		}
////	}
////
////	// purge unused triangle surface memory
////	R_PurgeTriSurfData( frameData );
////
////	// load any new ones
////	for ( int i = 0 ; i < this.models.Num() ; i++ ) {
////		idRenderModel *model = this.models[i];
////
////		if ( model.IsLevelLoadReferenced() && !model.IsLoaded() && model.IsReloadable() ) {
////
////			loadCount++;
////			model.LoadModel();
////
////			if ( ( loadCount & 15 ) == 0 ) {
////				session.PacifierUpdate();
////			}
////		}
////	}
////
////	// _D3XP added this
////	int	end = Sys_Milliseconds();
////	common.Printf( "%5i models purged from previous level, ", purgeCount );
////	common.Printf( "%5i models kept.\n", keepCount );
////	if ( loadCount ) {
////		common.Printf( "%5i new models loaded in %5.1f seconds\n", loadCount, (end-start) * 0.001 );
////	}
////	common.Printf( "---------------------------------------------------\n" );
////}
////
/////*
////=================
////idRenderModelManagerLocal::PrintMemInfo
////=================
////*/
////void idRenderModelManagerLocal::PrintMemInfo( MemInfo_t *mi ) {
////	int i, j, totalMem = 0;
////	int *sortIndex;
////	idFile *f;
////
////	f = fileSystem.OpenFileWrite( mi.filebase + "_models.txt" );
////	if ( !f ) {
////		return;
////	}
////
////	// sort first
////	sortIndex = new int[ localModelManager.models.Num()];
////
////	for ( i = 0; i <  localModelManager.models.Num(); i++ ) {
////		sortIndex[i] = i;
////	}
////
////	for ( i = 0; i <  localModelManager.models.Num() - 1; i++ ) {
////		for ( j = i + 1; j <  localModelManager.models.Num(); j++ ) {
////			if (  localModelManager.models[sortIndex[i]].Memory() <  localModelManager.models[sortIndex[j]].Memory() ) {
////				int temp = sortIndex[i];
////				sortIndex[i] = sortIndex[j];
////				sortIndex[j] = temp;
////			}
////		}
////	}
////
////	// print next
////	for ( int i = 0 ; i < localModelManager.models.Num() ; i++ ) {
////		idRenderModel	*model = localModelManager.models[sortIndex[i]];
////		int mem;
////
////		if ( !model.IsLoaded() ) {
////			continue;
////		}
////
////		mem = model.Memory();
////		totalMem += mem;
////		f.Printf( "%s %s\n", idStr::FormatNumber( mem ).c_str(), model.Name() );
////	}
////
////	delete sortIndex;
////	mi.modelAssetsTotal = totalMem;
////
////	f.Printf( "\nTotal model bytes allocated: %s\n", idStr::FormatNumber( totalMem ).c_str() );
////	fileSystem.CloseFile( f );
////}
}


var localModelManager = new idRenderModelManagerLocal ( );
var renderModelManager/*:idRenderModelManager*/ = localModelManager;
