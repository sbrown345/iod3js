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

/////*

////GUIs and script remain separately parsed

////Following a parse, all referenced media (and other decls) will have been touched.

////sinTable and cosTable are required for the rotate material keyword to function

////A new FindType on a purged decl will cause it to be reloaded, but a stale pointer to a purged
////decl will look like a defaulted decl.

////Moving a decl from one file to another will not be handled correctly by a reload, the material
////will be defaulted.

////NULL or empty decl names will always return NULL
////	Should probably make a default decl for this

////Decls are initially created without a textSource
////A parse without textSource set should always just call MakeDefault()
////A parse that has an error should internally call MakeDefault()
////A purge does nothing to a defaulted decl

////Should we have a "purged" media state separate from the "defaulted" media state?

////reloading over a decl name that was defaulted

////reloading over a decl name that was valid

////missing reload over a previously explicit definition

////*/

////#define USE_COMPRESSED_DECLS
//////#define GET_HUFFMAN_FREQUENCIES

class idDeclType {
//public:
	/*idStr						*/typeName:idStr;
	/*declType_t				*/type:declType_t;
	/*idDecl *					*/allocator:()=>idDecl//(*allocator)( void );
};

class idDeclFolder {
//public:
	folder:idStr;
	extension:idStr;
	defaultType:declType_t;
};

////class idDeclFile;

class idDeclLocal extends idDeclBase {
////	friend class idDeclFile;
////	friend class idDeclManagerLocal;

////public:
////								*/idDeclLocal();
////	virtual 					*/~idDeclLocal() {};
	GetName( ):string {throw "placeholder";}
	GetType( ):declType_t {throw "placeholder";}
	GetState( ) :declState_t {throw "placeholder";}
	IsImplicit( ) :boolean {throw "placeholder";}
	IsValid( ) :boolean {throw "placeholder";}
	Invalidate( ):void{throw "placeholder";}
	Reload( ):void {throw "placeholder";}
	EnsureNotPurged( ):void {throw "placeholder";}
	Index( ) :number {return null;}
	GetLineNum( ) :number {throw "placeholder";}
	GetFileName( ) :string {throw "placeholder";}
	Size( ):number {throw "placeholder";}
	GetText( text:Uint8Array):void{}
	GetTextLength( ):number {throw "placeholder";}
	SetText( text:Uint8Array ):void{throw "placeholder";}
	ReplaceSourceFileText( ):boolean{throw "placeholder";}
	SourceFileChanged( ):boolean{throw "placeholder";}
	MakeDefault(): void { throw "placeholder"; }
	EverReferenced( ):boolean { throw "placeholder"; }

//protected:
	SetDefaultText( ):boolean { throw "placeholder"; }
	DefaultDefinition( ):string { throw "placeholder"; }
	Parse( text:string, textLength:number ):boolean { throw "placeholder"; }
	FreeData( ):void { throw "placeholder"; }
	List( ):void { throw "placeholder"; }
	Print( ):void { throw "placeholder"; }

//protected:
    AllocateSelf( ):void{ throw "placeholder";}

	// Parses the decl definition.
	// After calling parse, a decl will be guaranteed usable.
	ParseLocal(): void { throw "placeholder";}

	// Does a MakeDefualt, but flags the decl so that it
	// will Parse() the next time the decl is found.
	Purge(): void { throw "placeholder"; }

////								// Set textSource possible with compression.
	SetTextLocal(text: Uint8Array, length: number): void { throw "placeholder"; }

//private:
/*	idDecl *					*/self:idDecl;

/*	idStr						*/name:idStr;					    // name of the decl
/*	char *						*/textSource:string;				// decl text definition
/*	int							*/textLength:number;				// length of textSource
/*	int							*/compressedLength:number;		    // compressed length
/*	idDeclFile *				*/sourceFile:idDeclFile;			// source file in which the decl was defined
/*	int							*/sourceTextOffset:number;		    // offset in source file to decl text
/*	int							*/sourceTextLength:number;		    // length of decl text in source file
/*	int							*/sourceLine:number;				// this is where the actual declaration token starts
/*	int							*/checksum:number;				    // checksum of the decl text
/*  declType_t      			*/type:declType_t;		            // decl type
/*	declState_t					*/declState:declState_t;			// decl state
/*	int							*/index:number;					    // index in the per-type list

/*	bool						*/parsedOutsideLevelLoad:boolean;	// these decls will never be purged
/*	bool						*/everReferenced:boolean;			// set to true if the decl was ever used
/*	bool						*/referencedThisLevel:boolean;	    // set to true when the decl is used for the current level
/*	bool						*/redefinedInReload:boolean;		// used during file reloading to make sure a decl that has
/*								*/						            // its source removed will be defaulted
/*	idDeclLocal *				*/nextInFile:idDeclLocal;				// next decl in the decl file

    constructor( ) {
        super ( );
	    this.name = new idStr("unnamed");
	    this.textSource = /*NULL*/null;
	    this.textLength = 0;
	    this.compressedLength = 0;
	    this.sourceFile = null;
	    this.sourceTextOffset = 0;
	    this.sourceTextLength = 0;
	    this.sourceLine = 0;
	    this.checksum = 0;
	    this.type = declType_t.DECL_ENTITYDEF;
	    this.index = 0;
	    this.declState = declState_t.DS_UNPARSED;
	    this.parsedOutsideLevelLoad = false;
	    this.referencedThisLevel = false;
	    this.everReferenced = false;
	    this.redefinedInReload = false;
	    this.nextInFile = /*NULL*/null;
    }
};

class idDeclFile {
    
    constructor() 
    constructor( fileName:string, defaultType:declType_t )
    constructor( fileName?:string, defaultType?:declType_t ) {
        if( arguments.length === 2 ) {
	        this.fileName.opEquals( fileName );
            this.defaultType = defaultType;
            this.timestamp = 0;
            this.checksum = 0;
            this.fileSize = 0;
            this.numLines = 0;
            this.decls = /*NULL*/null;
        } else {
	        this.fileName.opEquals( "<implicit file>" );
            this.defaultType = declType_t.DECL_MAX_TYPES;
            this.timestamp = 0;
            this.checksum = 0;
            this.fileSize = 0;
            this.numLines = 0;
            this.decls = /*NULL*/null;
        }
    }

    Reload(force:boolean):void{throw "placeholder";}
    LoadAndParse():number{throw "placeholder";}

////public:
	/*idStr						*/fileName = new idStr;
	/*declType_t				*/defaultType:declType_t;
    
	/*ID_TIME_T					*/timestamp:number;
	/*int						*/checksum:number;
	/*int						*/fileSize:number;
	/*int						*/numLines:number;
    
	/*idDeclLocal *				*/decls:idDeclLocal;
};

class idDeclManagerLocal extends idDeclManager {
////	friend class idDeclLocal;

////public:
//    Init( ):void{throw "placeholder";}
/////*virtual void				*/Shutdown( ):void{throw "placeholder";}
/////*virtual void				*/Reload( force:boolean ):void{throw "placeholder";}
//	BeginLevelLoad ( ): void { throw "placeholder"; }
/////*virtual void				*/EndLevelLoad():void{throw "placeholder";}
//    RegisterDeclType( typeName:string, type:declType_t , allocator: ()=> idDecl ):void{throw "placeholder";}
//    RegisterDeclFolder( folder:string, extension:string, defaultType:declType_t ):void{throw "placeholder";}
/////*virtual int				*/	GetChecksum( ) :number{throw "placeholder";}
/////*virtual int				*/	GetNumDeclTypes( ) :number{throw "placeholder";}
/////*virtual int				*/	GetNumDecls( type:declType_t ):number{throw "placeholder";}
///*virtual const char *		*/  GetDeclNameFromType( type:declType_t ) :string{throw "placeholder";}
//    GetDeclTypeFromName( typeName:string ):declType_t { throw "placeholder"; }
///*	virtual const idDecl *		*/FindType( type: declType_t, name:string, makeDefault:boolean = true ):idDecl { throw "placeholder"; }
//	DeclByIndex ( type: declType_t, /*int */index: number, forceParse = true ): idDecl { throw "placeholder"; }

////	virtual const idDecl*		FindDeclWithoutParsing( declType_t type, name:string, bool makeDefault = true ):idDecl{throw "placeholder";}
////	virtual void				ReloadFile( const char* filename, bool force ):void{throw "placeholder";}

//	ListType ( args: idCmdArgs, type: declType_t ): void { throw "placeholder"; }
//	PrintType ( args: idCmdArgs, type: declType_t ): void { throw "placeholder"; }

////	virtual idDecl *			CreateNewDecl( declType_t type, name:string, const char *fileName ):idDecl{throw "placeholder";}

////	//BSM Added for the material editors rename capabilities
////	virtual bool				RenameDecl( type:declType_t, oldName:string, newName:string ):boolean{throw "placeholder";}

//    MediaPrint( fmt:string, ...args:any[] ) /*id_attribute((format(printf,2,3)))*/:void{throw "placeholder";}
////	virtual void				WritePrecacheCommands( idFile *f ):void{throw "placeholder";}

//	FindMaterial( name:string, makeDefault:boolean = true):idMaterial{ throw "placeholder";}
//	FindSkin ( name: string, makeDefault = true ): idDeclSkin { throw "placeholder"; }
//	FindSound ( name: string, makeDefault = true ): idSoundShader { throw "placeholder"; }

///*virtual const idMaterial *		*/MaterialByIndex(/* int */index:number, forceParse = true ):idMaterial{throw "placeholder";}
/////*virtual const idDeclSkin *		*/SkinByIndex(/* int */index:number, forceParse = true ):idDeclSkin{throw "placeholder";}
/////*virtual const idSoundShader *	    */SoundByIndex(/* int */index:number, forceParse = true ):idSoundShader{throw "placeholder";}

////public:
//	static MakeNameCanonical( name:string, result:Uint8Array, maxLength:number ):void{throw "placeholder";}
//	FindTypeWithoutParsing( type:declType_t, name:string, makeDefault:boolean = true ):idDeclLocal { throw "placeholder"; }

	GetDeclType ( /*int */type: number ): idDeclType { return this.declTypes[type]; }
	GetImplicitDeclFile ( ): idDeclFile { return this.implicitDecls; }

//private:
	declTypes = new idList<idDeclType>(idDeclType, true );
	declFolders = new idList<idDeclFolder>(idDeclFolder, true);

	loadedFiles = new idList<idDeclFile>(idDeclFile, true);
    hashTables:idHashIndex[/*declType_t.DECL_MAX_TYPES*/];
	linearLists:idList<idDeclLocal>[]/*[declType_t.DECL_MAX_TYPES]*/;
    implicitDecls:idDeclFile;	// this holds all the decls that were created because explicit
												// text definitions were not found. Decls that became default
												// because of a parse error are not in this list.
	checksum:number/*int*/;		// checksum of all loaded decl text
	indent:number/*int*/;			// for MediaPrint
	insideLevelLoad:boolean;

    static decl_show = new idCVar("decl_show", "0", CVAR_SYSTEM, "set to 1 to print parses, 2 to also print references", 0, 2, ArgCompletion_Integer_Template(0, 2));

    constructor() {
        super();
        this.hashTables = newStructArray<idHashIndex>( idHashIndex, declType_t.DECL_MAX_TYPES );
		this.linearLists = new Array(declType_t.DECL_MAX_TYPES);
	    for ( var i = 0; i < declType_t.DECL_MAX_TYPES; i++ ) {
		    this.linearLists[i] = new idList<idDeclLocal>( idDeclLocal, true );
	    }
        this.implicitDecls = new idDeclFile( );
        this.checksum = 0;
        this.indent = 0;
        this.insideLevelLoad = false;
    }

//private:
    //ListDecls_f( args:idCmdArgs  ):void { throw "placeholder"; }
    //ReloadDecls_f( args:idCmdArgs  ):void { throw "placeholder"; }
	//TouchDecl_f(args: idCmdArgs): void { throw "placeholder"; }







/*
===================
idDeclManagerLocal::Init
===================
*/
 Init  (): void {

		common.Printf("----- Initializing Decls -----\n");

		this.checksum = 0;

		//#ifdef USE_COMPRESSED_DECLS
		//	SetupHuffman();
		//#endif

		//#ifdef GET_HUFFMAN_FREQUENCIES
		//	ClearHuffmanFrequencies();
		//#endif

		// decls used throughout the engine
		this.RegisterDeclType("table", declType_t.DECL_TABLE, idDeclAllocator<idDeclTable>(idDeclTable));
		this.RegisterDeclType("material", declType_t.DECL_MATERIAL, idDeclAllocator<idMaterial>(idMaterial));
		this.RegisterDeclType("skin", declType_t.DECL_SKIN, idDeclAllocator<idDeclSkin>(idDeclSkin));
		this.RegisterDeclType("sound", declType_t.DECL_SOUND, idDeclAllocator<idSoundShader>(idSoundShader));

		this.RegisterDeclType("entityDef", declType_t.DECL_ENTITYDEF, idDeclAllocator<idDeclEntityDef>(idDeclEntityDef));
		this.RegisterDeclType("mapDef", declType_t.DECL_MAPDEF, idDeclAllocator<idDeclEntityDef>(idDeclEntityDef));
		this.RegisterDeclType("fx", declType_t.DECL_FX, idDeclAllocator<idDeclFX>(idDeclFX));
		this.RegisterDeclType("particle", declType_t.DECL_PARTICLE, idDeclAllocator<idDeclParticle>(idDeclParticle));
		this.RegisterDeclType("articulatedFigure", declType_t.DECL_AF, idDeclAllocator<idDeclAF>(idDeclAF));
		this.RegisterDeclType("pda", declType_t.DECL_PDA, idDeclAllocator<idDeclPDA>(idDeclPDA));
		this.RegisterDeclType("email", declType_t.DECL_EMAIL, idDeclAllocator<idDeclEmail>(idDeclEmail));
		this.RegisterDeclType("video", declType_t.DECL_VIDEO, idDeclAllocator<idDeclVideo>(idDeclVideo));
		this.RegisterDeclType("audio", declType_t.DECL_AUDIO, idDeclAllocator<idDeclAudio>(idDeclAudio));

		this.RegisterDeclFolder("materials", ".mtr", declType_t.DECL_MATERIAL);
		this.RegisterDeclFolder("skins", ".skin", declType_t.DECL_SKIN);
		this.RegisterDeclFolder("sound", ".sndshd", declType_t.DECL_SOUND);

		// add console commands
		cmdSystem.AddCommand("listDecls", this.ListDecls_f, cmdFlags_t.CMD_FL_SYSTEM, "lists all decls");

		cmdSystem.AddCommand("reloadDecls", this.ReloadDecls_f, cmdFlags_t.CMD_FL_SYSTEM, "reloads decls");
		cmdSystem.AddCommand("touch", this.TouchDecl_f, cmdFlags_t.CMD_FL_SYSTEM, "touches a decl");

		todo("list decals");
		//cmdSystem.AddCommand( "listTables", idListDecls_f<DECL_TABLE>, cmdFlags_t.CMD_FL_SYSTEM, "lists tables", idCmdSystem::ArgCompletion_String<listDeclStrings> );
		//cmdSystem.AddCommand( "listMaterials", idListDecls_f<DECL_MATERIAL>, cmdFlags_t.CMD_FL_SYSTEM, "lists materials", idCmdSystem::ArgCompletion_String<listDeclStrings> );
		//cmdSystem.AddCommand( "listSkins", idListDecls_f<DECL_SKIN>, cmdFlags_t.CMD_FL_SYSTEM, "lists skins", idCmdSystem::ArgCompletion_String<listDeclStrings> );
		//cmdSystem.AddCommand( "listSoundShaders", idListDecls_f<DECL_SOUND>, cmdFlags_t.CMD_FL_SYSTEM, "lists sound shaders", idCmdSystem::ArgCompletion_String<listDeclStrings> );

		//cmdSystem.AddCommand( "listEntityDefs", idListDecls_f<DECL_ENTITYDEF>, cmdFlags_t.CMD_FL_SYSTEM, "lists entity defs", idCmdSystem::ArgCompletion_String<listDeclStrings> );
		//cmdSystem.AddCommand( "listFX", idListDecls_f<DECL_FX>, cmdFlags_t.CMD_FL_SYSTEM, "lists FX systems", idCmdSystem::ArgCompletion_String<listDeclStrings> );
		//cmdSystem.AddCommand( "listParticles", idListDecls_f<DECL_PARTICLE>, cmdFlags_t.CMD_FL_SYSTEM, "lists particle systems", idCmdSystem::ArgCompletion_String<listDeclStrings> );
		//cmdSystem.AddCommand( "listAF", idListDecls_f<DECL_AF>, cmdFlags_t.CMD_FL_SYSTEM, "lists articulated figures", idCmdSystem::ArgCompletion_String<listDeclStrings>);

		//cmdSystem.AddCommand( "listPDAs", idListDecls_f<DECL_PDA>, cmdFlags_t.CMD_FL_SYSTEM, "lists PDAs", idCmdSystem::ArgCompletion_String<listDeclStrings> );
		//cmdSystem.AddCommand( "listEmails", idListDecls_f<DECL_EMAIL>, cmdFlags_t.CMD_FL_SYSTEM, "lists Emails", idCmdSystem::ArgCompletion_String<listDeclStrings> );
		//cmdSystem.AddCommand( "listVideos", idListDecls_f<DECL_VIDEO>, cmdFlags_t.CMD_FL_SYSTEM, "lists Videos", idCmdSystem::ArgCompletion_String<listDeclStrings> );
		//cmdSystem.AddCommand( "listAudios", idListDecls_f<DECL_AUDIO>, cmdFlags_t.CMD_FL_SYSTEM, "lists Audios", idCmdSystem::ArgCompletion_String<listDeclStrings> );

		//cmdSystem.AddCommand( "printTable", idPrintDecls_f<DECL_TABLE>, cmdFlags_t.CMD_FL_SYSTEM, "prints a table", idCmdSystem::ArgCompletion_Decl<DECL_TABLE> );
		//cmdSystem.AddCommand( "printMaterial", idPrintDecls_f<DECL_MATERIAL>, cmdFlags_t.CMD_FL_SYSTEM, "prints a material", idCmdSystem::ArgCompletion_Decl<DECL_MATERIAL> );
		//cmdSystem.AddCommand( "printSkin", idPrintDecls_f<DECL_SKIN>, cmdFlags_t.CMD_FL_SYSTEM, "prints a skin", idCmdSystem::ArgCompletion_Decl<DECL_SKIN> );
		//cmdSystem.AddCommand( "printSoundShader", idPrintDecls_f<DECL_SOUND>, cmdFlags_t.CMD_FL_SYSTEM, "prints a sound shader", idCmdSystem::ArgCompletion_Decl<DECL_SOUND> );

		//cmdSystem.AddCommand( "printEntityDef", idPrintDecls_f<DECL_ENTITYDEF>, cmdFlags_t.CMD_FL_SYSTEM, "prints an entity def", idCmdSystem::ArgCompletion_Decl<DECL_ENTITYDEF> );
		//cmdSystem.AddCommand( "printFX", idPrintDecls_f<DECL_FX>, cmdFlags_t.CMD_FL_SYSTEM, "prints an FX system", idCmdSystem::ArgCompletion_Decl<DECL_FX> );
		//cmdSystem.AddCommand( "printParticle", idPrintDecls_f<DECL_PARTICLE>, cmdFlags_t.CMD_FL_SYSTEM, "prints a particle system", idCmdSystem::ArgCompletion_Decl<DECL_PARTICLE> );
		//cmdSystem.AddCommand( "printAF", idPrintDecls_f<DECL_AF>, cmdFlags_t.CMD_FL_SYSTEM, "prints an articulated figure", idCmdSystem::ArgCompletion_Decl<DECL_AF> );

		//cmdSystem.AddCommand( "printPDA", idPrintDecls_f<DECL_PDA>, cmdFlags_t.CMD_FL_SYSTEM, "prints an PDA", idCmdSystem::ArgCompletion_Decl<DECL_PDA> );
		//cmdSystem.AddCommand( "printEmail", idPrintDecls_f<DECL_EMAIL>, cmdFlags_t.CMD_FL_SYSTEM, "prints an Email", idCmdSystem::ArgCompletion_Decl<DECL_EMAIL> );
		//cmdSystem.AddCommand( "printVideo", idPrintDecls_f<DECL_VIDEO>, cmdFlags_t.CMD_FL_SYSTEM, "prints a Audio", idCmdSystem::ArgCompletion_Decl<DECL_VIDEO> );
		//cmdSystem.AddCommand( "printAudio", idPrintDecls_f<DECL_AUDIO>, cmdFlags_t.CMD_FL_SYSTEM, "prints an Video", idCmdSystem::ArgCompletion_Decl<DECL_AUDIO> );

		//cmdSystem.AddCommand( "listHuffmanFrequencies", ListHuffmanFrequencies_f, cmdFlags_t.CMD_FL_SYSTEM, "lists decl text character frequencies" );

		common.Printf("------------------------------\n");
	}

/////*
////===================
////idDeclManagerLocal::Shutdown
////===================
////*/
////void idDeclManagerLocal::Shutdown( ) {
////	int			i, j;
////	idDeclLocal *decl;

////	// free decls
////	for ( i = 0; i < declType_t.DECL_MAX_TYPES; i++ ) {
////		for ( j = 0; j < this.linearLists[i].Num(); j++ ) {
////			decl = this.linearLists[i][j];
////			if ( decl.self != NULL ) {
////				decl.self.FreeData();
////				delete decl.self;
////			}
////			if ( decl.textSource ) {
////				Mem_Free( decl.textSource );
////				decl.textSource = NULL;
////			}
////			delete decl;
////		}
////		this.linearLists[i].Clear();
////		this.hashTables[i].Free();
////	}

////	// free decl files
////	this.loadedFiles.DeleteContents( true );

////	// free the decl types and folders
////	this.declTypes.DeleteContents( true );
////	this.declFolders.DeleteContents( true );

////#ifdef USE_COMPRESSED_DECLS
////	ShutdownHuffman();
////#endif
////}

/////*
////===================
////idDeclManagerLocal::Reload
////===================
////*/
////void idDeclManagerLocal::Reload( bool force ) {
////	for ( int i = 0; i < this.loadedFiles.Num(); i++ ) {
////		this.loadedFiles[i].Reload( force );
////	}
////}

/*
===================
idDeclManagerLocal::BeginLevelLoad
===================
*/
 BeginLevelLoad  (): void {
		this.insideLevelLoad = true;

		// clear all the referencedThisLevel flags and purge all the data
		// so the next reference will cause a reparse
		for (var i = 0; i < declType_t.DECL_MAX_TYPES; i++) {
			var num = this.linearLists[i].Num();
			for (var j = 0; j < num; j++) {
				var decl: idDeclLocal = this.linearLists[i][j];
				decl.Purge();
			}
		}
	}

/////*
////===================
////idDeclManagerLocal::EndLevelLoad
////===================
////*/
////void idDeclManagerLocal::EndLevelLoad() {
////	this.insideLevelLoad = false;

////	// we don't need to do anything here, but the image manager, model manager,
////	// and sound sample manager will need to free media that was not referenced
////}

/*
===================
idDeclManagerLocal::RegisterDeclType
===================
*/
 RegisterDeclType  (typeName: string, type: declType_t, allocator: () => idDecl): void {
		var declType: idDeclType;

		if (type < this.declTypes.Num() && this.declTypes[ /*(int)*/type]) {
			common.Warning("idDeclManager::RegisterDeclType: type '%s' already exists", typeName);
			return;
		}

		declType = new idDeclType;
		declType.typeName = new idStr(typeName);
		declType.type = type;
		declType.allocator = allocator;

		if ( /*(int)*/type + 1 > this.declTypes.Num()) {
			this.declTypes.AssureSize( /*(int)*/type + 1, null);
		}
		this.declTypes[type] = declType;
	}

/*
===================
idDeclManagerLocal::RegisterDeclFolder
===================
*/
 RegisterDeclFolder  (folder: string, extension: string, defaultType: declType_t) {
		var /*int*/ i: number, j: number;
		var fileName = new idStr;
		var declFolder: idDeclFolder;
		var fileList: idFileList;
		var df: idDeclFile;

		// check whether this folder / extension combination already exists
		for (i = 0; i < this.declFolders.Num(); i++) {
			if (this.declFolders[i].folder.Icmp(folder) == 0 && this.declFolders[i].extension.Icmp(extension) == 0) {
				break;
			}
		}
		if (i < this.declFolders.Num()) {
			declFolder = this.declFolders[i];
		} else {
			declFolder = new idDeclFolder;
			declFolder.folder = new idStr(folder);
			declFolder.extension = new idStr(extension);
			declFolder.defaultType = defaultType;
			this.declFolders.Append(declFolder);
		}

		// scan for decl files
		fileList = fileSystem.ListFiles(declFolder.folder.c_str(), declFolder.extension.c_str(), true);

		// load and parse decl files
		for (i = 0; i < fileList.GetNumFiles(); i++) {
			fileName.opEquals(declFolder.folder + "/" + fileList.GetFile(i));

			dlog(DEBUG_RegisterDeclFolder, "fileName: %s\n", fileName);
			// check whether this file has already been loaded
			for (j = 0; j < this.loadedFiles.Num(); j++) {
				if (fileName.Icmp(this.loadedFiles[j].fileName) == 0) {
					break;
				}
			}
			if (j < this.loadedFiles.Num()) {
				df = this.loadedFiles[j];
			} else {
				df = new idDeclFile(fileName.c_str(), defaultType);
				this.loadedFiles.Append(df);
			}
			df.LoadAndParse();
		}

		fileSystem.FreeFileList(fileList);
	}

/////*
////===================
////idDeclManagerLocal::GetChecksum
////===================
////*/
////int idDeclManagerLocal::GetChecksum( ) const {
////	int i, j, total, num;
////	int *checksumData;

////	// get the total number of decls
////	total = 0;
////	for ( i = 0; i < declType_t.DECL_MAX_TYPES; i++ ) {
////		total += this.linearLists[i].Num();
////	}

////	checksumData = (int *) _alloca16( total * 2 * sizeof( int ) );

////	total = 0;
////	for ( i = 0; i < declType_t.DECL_MAX_TYPES; i++ ) {
////		declType_t type = (declType_t) i;

////		// FIXME: not particularly pretty but PDAs and associated decls are localized and should not be checksummed
////		if ( type == DECL_PDA || type == DECL_VIDEO || type == DECL_AUDIO || type == DECL_EMAIL ) {
////			continue;
////		}

////		num = this.linearLists[i].Num();
////		for ( j = 0; j < num; j++ ) {
////			idDeclLocal *decl = this.linearLists[i][j];

////			if ( decl.sourceFile == &implicitDecls ) {
////				continue;
////			}

////			checksumData[total*2+0] = total;
////			checksumData[total*2+1] = decl.checksum;
////			total++;
////		}
////	}

////	LittleRevBytes( checksumData, sizeof(int), total * 2 );
////	return MD5_BlockChecksum( checksumData, total * 2 * sizeof( int ) );
////}

/*
===================
idDeclManagerLocal::GetNumDeclTypes
===================
*/
/*int */
 GetNumDeclTypes  (): number {
		return this.declTypes.Num();
	}

/*
===================
idDeclManagerLocal::GetDeclNameFromType
===================
*/
 GetDeclNameFromType  (type: declType_t): string {
		var /*int */typeIndex = /*(int)*/type;

		if (typeIndex < 0 || typeIndex >= this.declTypes.Num() || this.declTypes[typeIndex] == null) {
			common.FatalError("idDeclManager::GetDeclNameFromType: bad type: %i", typeIndex);
		}
		return this.declTypes[typeIndex].typeName.data;
	}

/*
===================
idDeclManagerLocal::GetDeclTypeFromName
===================
*/
 GetDeclTypeFromName  (typeName: string): declType_t {
		var i: number;

		for (i = 0; i < this.declTypes.Num(); i++) {
			if (this.declTypes[i] && this.declTypes[i].typeName.Icmp(typeName) == 0) {
				return /*(declType_t)*/this.declTypes[i].type;
			}
		}
		return declType_t.DECL_MAX_TYPES;
	}

/*
=================
idDeclManagerLocal::FindType

External users will always cause the decl to be parsed before returning
=================
*/
	FindType ( type: declType_t, name: string, makeDefault: boolean = true ): idDecl {
		var decl: idDeclLocal;

		if ( !name /*|| !name[0] */ ) {
			name = "_emptyName";
			//common.Warning( "idDeclManager::FindType: empty %s name", GetDeclType( (int)type ).typeName.c_str() );
		}

		decl = this.FindTypeWithoutParsing( type, name, makeDefault );
		if ( !decl ) {
			return null;
		}

		decl.AllocateSelf ( );

		// if it hasn't been parsed yet, parse it now
		if ( decl.declState == declState_t.DS_UNPARSED ) {
			decl.ParseLocal ( );
		}

		// mark it as referenced
		decl.referencedThisLevel = true;
		decl.everReferenced = true;
		if ( this.insideLevelLoad ) {
			decl.parsedOutsideLevelLoad = false;
		}

		return decl.self;
	}

/////*
////===============
////idDeclManagerLocal::FindDeclWithoutParsing
////===============
////*/
////const idDecl* idDeclManagerLocal::FindDeclWithoutParsing( declType_t type, name:string, bool makeDefault) {
////	idDeclLocal* decl;
////	decl = FindTypeWithoutParsing(type, name, makeDefault);
////	if(decl) {
////		return decl.self;
////	}
////	return NULL;
////}

/////*
////===============
////idDeclManagerLocal::ReloadFile
////===============
////*/
////void idDeclManagerLocal::ReloadFile( const char* filename, bool force ) {
////	for ( int i = 0; i < this.loadedFiles.Num(); i++ ) {
////		if(!this.loadedFiles[i].fileName.Icmp(filename)) {
////			checksum ^= this.loadedFiles[i].checksum;
////			this.loadedFiles[i].Reload( force );
////			checksum ^= this.loadedFiles[i].checksum;
////		}
////	}
////}

/*
===================
idDeclManagerLocal::GetNumDecls
===================
*/
 GetNumDecls  (type: declType_t): number /*int*/ {
		var /*int */typeIndex = /*(int)*/type;

		if (typeIndex < 0 || typeIndex >= this.declTypes.Num() || this.declTypes[typeIndex] == null) {
			common.FatalError("idDeclManager::GetNumDecls: bad type: %i", typeIndex);
		}
		return this.linearLists[typeIndex].Num();
	}

/*
===================
idDeclManagerLocal::DeclByIndex
===================
*/
 DeclByIndex  (type: declType_t, /*int */index: number, forceParse = true): idDecl {
		var typeIndex = /*(int)*/type;

		if (typeIndex < 0 || typeIndex >= this.declTypes.Num() || this.declTypes[typeIndex] == null) {
			common.FatalError("idDeclManager::DeclByIndex: bad type: %i", typeIndex);
		}
		if (index < 0 || index >= this.linearLists[typeIndex].Num()) {
			common.Error("idDeclManager::DeclByIndex: out of range");
		}
		var decl = this.linearLists[typeIndex][index];

		decl.AllocateSelf();

		if (forceParse && decl.declState == declState_t.DS_UNPARSED) {
			decl.ParseLocal();
		}

		return decl.self;
	}

/*
===================
idDeclManagerLocal::ListType

list*
Lists decls currently referenced

list* ever
Lists decls that have been referenced at least once since app launched

list* all
Lists every decl declared, even if it hasn't been referenced or parsed

FIXME: alphabetized, wildcards?
===================
*/
 ListType  (args: idCmdArgs, type: declType_t): void {
		todoThrow();
		////	bool all, ever;

		////	if ( !idStr::Icmp( args.Argv( 1 ), "all" ) ) {
		////		all = true;
		////	} else {
		////		all = false;
		////	}
		////	if ( !idStr::Icmp( args.Argv( 1 ), "ever" ) ) {
		////		ever = true;
		////	} else {
		////		ever = false;
		////	}

		////	common.Printf( "--------------------\n" );
		////	int printed = 0;
		////	int	count = this.linearLists[ (int)type ].Num();
		////	for ( int i = 0 ; i < count ; i++ ) {
		////		idDeclLocal *decl = this.linearLists[ (int)type ][ i ];

		////		if ( !all && decl.declState == declState_t.DS_UNPARSED ) {
		////			continue;
		////		}

		////		if ( !all && !ever && !decl.referencedThisLevel ) {
		////			continue;
		////		}

		////		if ( decl.referencedThisLevel ) {
		////			common.Printf( "*" );
		////		} else if ( decl.everReferenced ) {
		////			common.Printf( "." );
		////		} else {
		////			common.Printf( " " );
		////		}
		////		if ( decl.declState == declState_t.DS_DEFAULTED ) {
		////			common.Printf( "D" );
		////		} else {
		////			common.Printf( " " );
		////		}
		////		common.Printf( "%4i: ", decl.index );
		////		printed++;
		////		if ( decl.declState == declState_t.DS_UNPARSED ) {
		////			// doesn't have any type specific data yet
		////			common.Printf( "%s\n", decl.GetName() );
		////		} else {
		////			decl.self.List();
		////		}
		////	}

		////	common.Printf( "--------------------\n" );
		////	common.Printf( "%i of %i %s\n", printed, count, this.declTypes[type].typeName.c_str() );
	}

/*
===================
idDeclManagerLocal::PrintType
===================
*/
 PrintType  (args: idCmdArgs, type: declType_t): void {
		todoThrow();
		////	// individual decl types may use additional command parameters
		////	if ( args.Argc() < 2 ) {
		////		common.Printf( "USAGE: Print<decl type> <decl name> [type specific parms]\n" );
		////		return;
		////	}

		////	// look it up, skipping the public path so it won't parse or reference
		////	idDeclLocal *decl = FindTypeWithoutParsing( type, args.Argv( 1 ), false );
		////	if ( !decl ) {
		////		common.Printf( "%s '%s' not found.\n", this.declTypes[ type ].typeName.c_str(), args.Argv( 1 ) );
		////		return;
		////	}

		////	// print information common to all decls
		////	common.Printf( "%s %s:\n", this.declTypes[ type ].typeName.c_str(), decl.name.c_str() );
		////	common.Printf( "source: %s:%i\n", decl.sourceFile.fileName.c_str(), decl.sourceLine );
		////	common.Printf( "----------\n" );
		////	if ( decl.textSource != NULL ) {
		////		char *declText = (char *)_alloca( decl.textLength + 1 );
		////		decl.GetText( declText );
		////		common.Printf( "%s\n", declText );
		////	} else {
		////		common.Printf( "NO SOURCE\n" );
		////	}
		////	common.Printf( "----------\n" );
		////	switch( decl.declState ) {
		////		case declState_t.DS_UNPARSED:
		////			common.Printf( "Unparsed.\n" );
		////			break;
		////		case declState_t.DS_DEFAULTED:
		////			common.Printf( "<DEFAULTED>\n" );
		////			break;
		////		case declState_t.DS_PARSED:
		////			common.Printf( "Parsed.\n" );
		////			break;
		////	}

		////	if ( decl.referencedThisLevel ) {
		////		common.Printf( "Currently referenced this level.\n" );
		////	} else if ( decl.everReferenced ) {
		////		common.Printf( "Referenced in a previous level.\n" );
		////	} else {
		////		common.Printf( "Never referenced.\n" );
		////	}

		////	// allow type-specific data to be printed
		////	if ( decl.self != NULL ) {
		////		decl.self.Print();
		////	}

	}

/////*
////===================
////idDeclManagerLocal::CreateNewDecl
////===================
////*/
////idDecl *idDeclManagerLocal::CreateNewDecl( declType_t type, name:string, const char *_fileName ) {
////	int typeIndex = (int)type;
////	int i, hash;

////	if ( typeIndex < 0 || typeIndex >= this.declTypes.Num() || this.declTypes[typeIndex] == NULL ) {
////		common.FatalError( "idDeclManager::CreateNewDecl: bad type: %i", typeIndex );
////	}

////	char  canonicalName[MAX_STRING_CHARS];

////	idDeclManagerLocal.MakeNameCanonical( name, canonicalName, sizeof( canonicalName ) );

////	idStr fileName = _fileName;
////	fileName.BackSlashesToSlashes();

////	// see if it already exists
////	hash = this.hashTables[typeIndex].GenerateKey( canonicalName, false );
////	for ( i = this.hashTables[typeIndex].First( hash ); i >= 0; i = this.hashTables[typeIndex].Next( i ) ) {
////		if ( this.linearLists[typeIndex][i].name.Icmp( canonicalName ) == 0 ) {
////			this.linearLists[typeIndex][i].AllocateSelf();
////			return this.linearLists[typeIndex][i].self;
////		}
////	}

////	idDeclFile *sourceFile;

////	// find existing source file or create a new one
////	for ( i = 0; i < this.loadedFiles.Num(); i++ ) {
////		if ( this.loadedFiles[i].fileName.Icmp( fileName ) == 0 ) {
////			break;
////		}
////	}
////	if ( i < this.loadedFiles.Num() ) {
////		sourceFile = this.loadedFiles[i];
////	} else {
////		sourceFile = new idDeclFile( fileName, type );
////		this.loadedFiles.Append( sourceFile );
////	}

////	idDeclLocal *decl = new idDeclLocal;
////	decl.name = canonicalName;
////	decl.type = type;
////	decl.declState = declState_t.DS_UNPARSED;
////	decl.AllocateSelf();
////	idStr header = this.declTypes[typeIndex].typeName;
////	idStr defaultText = decl.self.DefaultDefinition();


////	int size = header.Length() + 1 + idStr::Length( canonicalName ) + 1 + defaultText.Length();
////	char *declText = ( char * ) _alloca( size + 1 );

////	memcpy( declText, header, header.Length() );
////	declText[header.Length()] = ' ';
////	memcpy( declText + header.Length() + 1, canonicalName, idStr::Length( canonicalName ) );
////	declText[header.Length() + 1 + idStr::Length( canonicalName )] = ' ';
////	memcpy( declText + header.Length() + 1 + idStr::Length( canonicalName ) + 1, defaultText, defaultText.Length() + 1 );

////	decl.SetTextLocal( declText, size );
////	decl.sourceFile = sourceFile;
////	decl.sourceTextOffset = sourceFile.fileSize;
////	decl.sourceTextLength = 0;
////	decl.sourceLine = sourceFile.numLines;

////	decl.ParseLocal();

////	// add this decl to the source file list
////	decl.nextInFile = sourceFile.decls;
////	sourceFile.decls = decl;

////	// add it to the hash table and linear list
////	decl.index = this.linearLists[typeIndex].Num();
////	this.hashTables[typeIndex].Add( hash, this.linearLists[typeIndex].Append( decl ) );

////	return decl.self;
////}

/////*
////===============
////idDeclManagerLocal::RenameDecl
////===============
////*/
////bool idDeclManagerLocal::RenameDecl( declType_t type, const char* oldName, const char* newName ) {

////	char canonicalOldName[MAX_STRING_CHARS];
////	idDeclManagerLocal.MakeNameCanonical( oldName, canonicalOldName, sizeof( canonicalOldName ));

////	char canonicalNewName[MAX_STRING_CHARS];
////	idDeclManagerLocal.MakeNameCanonical( newName, canonicalNewName, sizeof( canonicalNewName ) );

////	idDeclLocal	*decl = NULL;

////	// make sure it already exists
////	int typeIndex = (int)type;
////	int i, hash;
////	hash = this.hashTables[typeIndex].GenerateKey( canonicalOldName, false );
////	for ( i = this.hashTables[typeIndex].First( hash ); i >= 0; i = this.hashTables[typeIndex].Next( i ) ) {
////		if ( this.linearLists[typeIndex][i].name.Icmp( canonicalOldName ) == 0 ) {
////			decl = this.linearLists[typeIndex][i];
////			break;
////		}
////	}
////	if(!decl)
////		return false;

////	//if ( !this.hashTables[(int)type].Get( canonicalOldName, &declPtr ) )
////	//	return false;

////	//decl = *declPtr;

////	//Change the name
////	decl.name = canonicalNewName;


////	// add it to the hash table
////	//this.hashTables[(int)decl.type].Set( decl.name, decl );
////	int newhash = this.hashTables[typeIndex].GenerateKey( canonicalNewName, false );
////	this.hashTables[typeIndex].Add( newhash, decl.index );

////	//Remove the old hash item
////	this.hashTables[typeIndex].Remove(hash, decl.index);

////	return true;
////}

/*
===================
idDeclManagerLocal::MediaPrint

This is just used to nicely indent media caching prints
===================
*/
 MediaPrint  (fmt: string, ...args: any[]): void {
		if (!idDeclManagerLocal.decl_show.GetInteger()) {
			return;
		}

		var output = "";

		for (var/*int */i = 0; i < this.indent; i++) {
			common.Printf("    ");
			output += "    ";//
		}

		output += vsprintf(fmt, args);

		common.Printf("%s", output);
	}

/////*
////===================
////idDeclManagerLocal::WritePrecacheCommands
////===================
////*/
////void idDeclManagerLocal::WritePrecacheCommands( idFile *f ) {
////	for ( int i = 0; i < this.declTypes.Num(); i++ ) {
////		int num;

////		if ( this.declTypes[i] == NULL ) {
////			continue;
////		}

////		num = this.linearLists[i].Num();

////		for ( int j = 0 ; j < num ; j++ ) {
////			idDeclLocal *decl = this.linearLists[i][j];

////			if ( !decl.referencedThisLevel ) {
////				continue;
////			}

////			char	str[1024];
////			sprintf( str, "touch %s %s\n", this.declTypes[i].typeName.c_str(), decl.GetName() );
////			common.Printf( "%s", str );
////			f.Printf( "%s", str );
////		}
////	}
////}

/////********************************************************************/

	FindMaterial(name: string, makeDefault: boolean = true): idMaterial {
		return <idMaterial>this.FindType( declType_t.DECL_MATERIAL, name, makeDefault );;
		//	return static_cast<const idMaterial *>( this.FindType( declType_t.DECL_MATERIAL, name, makeDefault ) );
	}

////const idMaterial *idDeclManagerLocal::MaterialByIndex( int index, bool forceParse ) {
////	return static_cast<const idMaterial *>( DeclByIndex( declType_t.DECL_MATERIAL, index, forceParse ) );
////}

/////********************************************************************/

	FindSkin ( name: string, makeDefault = true ): idDeclSkin {
		return static_cast<idDeclSkin>( this.FindType( declType_t.DECL_SKIN, name, makeDefault ) );
	}

////const idDeclSkin *idDeclManagerLocal::SkinByIndex( int index, bool forceParse ) {
////	return static_cast<const idDeclSkin *>( DeclByIndex( DECL_SKIN, index, forceParse ) );
////}

/////********************************************************************/

 FindSound  (name: string, makeDefault= true): idSoundShader {
		return static_cast<idSoundShader>(this.FindType(declType_t.DECL_SOUND, name, makeDefault));
	}

////const idSoundShader *idDeclManagerLocal::SoundByIndex( int index, bool forceParse ) {
////	return static_cast<const idSoundShader *>( DeclByIndex( declType_t.DECL_SOUND, index, forceParse ) );
////}

/*
===================
idDeclManagerLocal::MakeNameCanonical
===================
*/
	static MakeNameCanonical ( name: string, /*char **/result: Uint8Array, /*int */maxLength: number ): void {
		var /*int */i: number, lastDot: number;

		lastDot = -1;
		for ( i = 0; i < maxLength && i < name.length /*name[i] != '\0'*/; i++ ) {
			var c = name[i];
			if ( c == '\\' ) {
				result[i] = '/'.charCodeAt( 0 );
			} else if ( c == '.' ) {
				lastDot = i;
				result[i] = c.charCodeAt( 0 );
			} else {
				result[i] = idStr.ToLower( c ).charCodeAt( 0 );
			}
		}
		if ( lastDot != -1 ) {
			result[lastDot] = 0;
		} else {
			result[i] = 0;
		}
	}

/*
================
idDeclManagerLocal::ListDecls_f
================
*/
 ListDecls_f  (args: idCmdArgs): void {
		todo();
		////	int		i, j;
		////	int		totalDecls = 0;
		////	int		totalText = 0;
		////	int		totalStructs = 0;

		////	for ( i = 0; i < declManagerLocal.declTypes.Num(); i++ ) {
		////		int size, num;

		////		if ( declManagerLocal.declTypes[i] == NULL ) {
		////			continue;
		////		}

		////		num = declManagerLocal.linearLists[i].Num();
		////		totalDecls += num;

		////		size = 0;
		////		for ( j = 0; j < num; j++ ) {
		////			size += declManagerLocal.linearLists[i][j].Size();
		////			if ( declManagerLocal.linearLists[i][j].self != NULL ) {
		////				size += declManagerLocal.linearLists[i][j].self.Size();
		////			}
		////		}
		////		totalStructs += size;

		////		common.Printf( "%4ik %4i %s\n", size >> 10, num, declManagerLocal.declTypes[i].typeName.c_str() );
		////	}

		////	for ( i = 0 ; i < declManagerLocal.loadedFiles.Num() ; i++ ) {
		////		idDeclFile	*df = declManagerLocal.loadedFiles[i];
		////		totalText += df.fileSize;
		////	}

		////	common.Printf( "%i total decls is %i decl files\n", totalDecls, declManagerLocal.loadedFiles.Num() );
		////	common.Printf( "%iKB in text, %iKB in structures\n", totalText >> 10, totalStructs >> 10 );
	}

/*
===================
idDeclManagerLocal::ReloadDecls_f

Reload will not find any new files created in the directories, it
will only reload existing files.

A reload will never cause anything to be purged.
===================
*/
	ReloadDecls_f ( args: idCmdArgs ): void {
		todoThrow ( );
		//bool	force;

		//if ( !idStr::Icmp( args.Argv( 1 ), "all" ) ) {
		//	force = true;
		//	common.Printf( "reloading all decl files:\n" );
		//} else {
		//	force = false;
		//	common.Printf( "reloading changed decl files:\n" );
		//}

		//soundSystem.SetMute( true );

		//declManagerLocal.Reload( force );

		//soundSystem.SetMute( false );
	}

/*
===================
idDeclManagerLocal::TouchDecl_f
===================
*/
	TouchDecl_f ( args: idCmdArgs ): void {
		todoThrow ( );
////	int	i;

////	if ( args.Argc() != 3 ) {
////		common.Printf( "usage: touch <type> <name>\n" );
////		common.Printf( "valid types: " );
////		for ( int i = 0 ; i < declManagerLocal.declTypes.Num() ; i++ ) {
////			if ( declManagerLocal.declTypes[i] ) {
////				common.Printf( "%s ", declManagerLocal.declTypes[i].typeName.c_str() );
////			}
////		}
////		common.Printf( "\n" );
////		return;
////	}

////	for ( i = 0; i < declManagerLocal.declTypes.Num(); i++ ) {
////		if ( declManagerLocal.declTypes[i] && declManagerLocal.declTypes[i].typeName.Icmp( args.Argv( 1 ) ) == 0 ) {
////			break;
////		}
////	}
////	if ( i >= declManagerLocal.declTypes.Num() ) {
////		common.Printf( "unknown decl type '%s'\n", args.Argv( 1 ) );
////		return;
////	}

////	const idDecl *decl = declManagerLocal.FindType( (declType_t)i, args.Argv( 2 ), false );
////	if ( !decl ) {
////		common.Printf( "%s '%s' not found\n", declManagerLocal.declTypes[i].typeName.c_str(), args.Argv( 2 ) );
////	}
	}

/*
===================
idDeclManagerLocal::FindTypeWithoutParsing

This finds or creats the decl, but does not cause a parse.  This is only used internally.
===================
*/
FindTypeWithoutParsing (type: declType_t, name: string, makeDefault: boolean = true): idDeclLocal {
		var /*int */typeIndex = int(type);
		var /*int */i: number, hash: number;

		if (typeIndex < 0 || typeIndex >= this.declTypes.Num() || this.declTypes[typeIndex] == null) {
			common.FatalError("idDeclManager::FindTypeWithoutParsing: bad type: %i", typeIndex);
		}

		var canonicalNameArray = new Uint8Array(MAX_STRING_CHARS);

		idDeclManagerLocal.MakeNameCanonical(name, canonicalNameArray, sizeof(canonicalNameArray));
		var canonicalName = canonicalNameArray.toString();

		// see if it already exists
		hash = this.hashTables[typeIndex].GenerateKey(canonicalName, false);
		for (i = this.hashTables[typeIndex].First(hash); i >= 0; i = this.hashTables[typeIndex].Next(i)) {
			if (this.linearLists[typeIndex][i].name.Icmp(canonicalName) == 0) {
				// only print these when decl_show is set to 2, because it can be a lot of clutter
				if (idDeclManagerLocal.decl_show.GetInteger() > 1) {
					this.MediaPrint("referencing %s %s\n", this.declTypes[type].typeName.c_str(), name);
				}
				return this.linearLists[typeIndex][i];
			}
		}

		if (!makeDefault) {
			return /*NULL*/null;
		}

		var decl = new idDeclLocal;
		decl.self = /*NULL*/null;
		decl.name.opEquals(canonicalName.toString());
		decl.type = type;
		decl.declState = declState_t.DS_UNPARSED;
		decl.textSource = /*NULL*/null;
		decl.textLength = 0;
		decl.sourceFile = this.implicitDecls;
		decl.referencedThisLevel = false;
		decl.everReferenced = false;
		decl.parsedOutsideLevelLoad = !this.insideLevelLoad;

		// add it to the linear list and hash table
		decl.index = this.linearLists[typeIndex].Num();
		this.hashTables[typeIndex].Add(hash, this.linearLists[typeIndex].Append(decl));

		return decl;
	}

};

var declManagerLocal = new idDeclManagerLocal();
var declManager = declManagerLocal;

/////*
////====================================================================================

//// decl text huffman compression

////====================================================================================
////*/

////const int MAX_HUFFMAN_SYMBOLS	= 256;

////typedef struct huffmanNode_s {
////	int						symbol;
////	int						frequency;
////	struct huffmanNode_s *	next;
////	struct huffmanNode_s *	children[2];
////} huffmanNode_t;

////typedef struct huffmanCode_s {
////	unsigned long			bits[8];
////	int						numBits;
////} huffmanCode_t;

////// compression ratio = 64%
////static int huffmanFrequencies[] = {
////    0x00000001, 0x00000001, 0x00000001, 0x00000001, 0x00000001, 0x00000001, 0x00000001, 0x00000001,
////    0x00000001, 0x00078fb6, 0x000352a7, 0x00000002, 0x00000001, 0x0002795e, 0x00000001, 0x00000001,
////    0x00000001, 0x00000001, 0x00000001, 0x00000001, 0x00000001, 0x00000001, 0x00000001, 0x00000001,
////    0x00000001, 0x00000001, 0x00000001, 0x00000001, 0x00000001, 0x00000001, 0x00000001, 0x00000001,
////    0x00049600, 0x000000dd, 0x00018732, 0x0000005a, 0x00000007, 0x00000092, 0x0000000a, 0x00000919,
////    0x00002dcf, 0x00002dda, 0x00004dfc, 0x0000039a, 0x000058be, 0x00002d13, 0x00014d8c, 0x00023c60,
////    0x0002ddb0, 0x0000d1fc, 0x000078c4, 0x00003ec7, 0x00003113, 0x00006b59, 0x00002499, 0x0000184a,
////    0x0000250b, 0x00004e38, 0x000001ca, 0x00000011, 0x00000020, 0x000023da, 0x00000012, 0x00000091,
////    0x0000000b, 0x00000b14, 0x0000035d, 0x0000137e, 0x000020c9, 0x00000e11, 0x000004b4, 0x00000737,
////    0x000006b8, 0x00001110, 0x000006b3, 0x000000fe, 0x00000f02, 0x00000d73, 0x000005f6, 0x00000be4,
////    0x00000d86, 0x0000014d, 0x00000d89, 0x0000129b, 0x00000db3, 0x0000015a, 0x00000167, 0x00000375,
////    0x00000028, 0x00000112, 0x00000018, 0x00000678, 0x0000081a, 0x00000677, 0x00000003, 0x00018112,
////    0x00000001, 0x000441ee, 0x000124b0, 0x0001fa3f, 0x00026125, 0x0005a411, 0x0000e50f, 0x00011820,
////    0x00010f13, 0x0002e723, 0x00003518, 0x00005738, 0x0002cc26, 0x0002a9b7, 0x0002db81, 0x0003b5fa,
////    0x000185d2, 0x00001299, 0x00030773, 0x0003920d, 0x000411cd, 0x00018751, 0x00005fbd, 0x000099b0,
////    0x00009242, 0x00007cf2, 0x00002809, 0x00005a1d, 0x00000001, 0x00005a1d, 0x00000001, 0x00000001,

////    0x00000001, 0x00000001, 0x00000001, 0x00000001, 0x00000001, 0x00000001, 0x00000001, 0x00000001,
////    0x00000001, 0x00000001, 0x00000001, 0x00000001, 0x00000001, 0x00000001, 0x00000001, 0x00000001,
////    0x00000001, 0x00000001, 0x00000001, 0x00000001, 0x00000001, 0x00000001, 0x00000001, 0x00000001,
////    0x00000001, 0x00000001, 0x00000001, 0x00000001, 0x00000001, 0x00000001, 0x00000001, 0x00000001,
////    0x00000001, 0x00000001, 0x00000001, 0x00000001, 0x00000001, 0x00000001, 0x00000001, 0x00000001,
////    0x00000001, 0x00000001, 0x00000001, 0x00000001, 0x00000001, 0x00000001, 0x00000001, 0x00000001,
////    0x00000001, 0x00000001, 0x00000001, 0x00000001, 0x00000001, 0x00000001, 0x00000001, 0x00000001,
////    0x00000001, 0x00000001, 0x00000001, 0x00000001, 0x00000001, 0x00000001, 0x00000001, 0x00000001,
////    0x00000001, 0x00000001, 0x00000001, 0x00000001, 0x00000001, 0x00000001, 0x00000001, 0x00000001,
////    0x00000001, 0x00000001, 0x00000001, 0x00000001, 0x00000001, 0x00000001, 0x00000001, 0x00000001,
////    0x00000001, 0x00000001, 0x00000001, 0x00000001, 0x00000001, 0x00000001, 0x00000001, 0x00000001,
////    0x00000001, 0x00000001, 0x00000001, 0x00000001, 0x00000001, 0x00000001, 0x00000001, 0x00000001,
////    0x00000001, 0x00000001, 0x00000001, 0x00000001, 0x00000001, 0x00000001, 0x00000001, 0x00000001,
////    0x00000001, 0x00000001, 0x00000001, 0x00000001, 0x00000001, 0x00000001, 0x00000001, 0x00000001,
////    0x00000001, 0x00000001, 0x00000001, 0x00000001, 0x00000001, 0x00000001, 0x00000001, 0x00000001,
////    0x00000001, 0x00000001, 0x00000001, 0x00000001, 0x00000001, 0x00000001, 0x00000001, 0x00000001,
////};

////static huffmanCode_t huffmanCodes[MAX_HUFFMAN_SYMBOLS];
////static huffmanNode_t *huffmanTree = NULL;
////static int totalUncompressedLength = 0;
////static int totalCompressedLength = 0;
////static int maxHuffmanBits = 0;


/////*
////================
////ClearHuffmanFrequencies
////================
////*/
////void ClearHuffmanFrequencies( ) {
////	var/*int*/i:number;

////	for( i = 0; i < MAX_HUFFMAN_SYMBOLS; i++ ) {
////		huffmanFrequencies[i] = 1;
////	}
////}

/////*
////================
////InsertHuffmanNode
////================
////*/
////huffmanNode_t *InsertHuffmanNode( huffmanNode_t *firstNode, huffmanNode_t *node ) {
////	huffmanNode_t *n, *lastNode;

////	lastNode = NULL;
////	for ( n = firstNode; n; n = n.next ) {
////		if ( node.frequency <= n.frequency ) {
////			break;
////		}
////		lastNode = n;
////	}
////	if ( lastNode ) {
////		node.next = lastNode.next;
////		lastNode.next = node;
////	} else {
////		node.next = firstNode;
////		firstNode = node;
////	}
////	return firstNode;
////}

/////*
////================
////BuildHuffmanCode_r
////================
////*/
////void BuildHuffmanCode_r( huffmanNode_t *node, huffmanCode_t code, huffmanCode_t codes[MAX_HUFFMAN_SYMBOLS] ) {
////	if ( node.symbol == -1 ) {
////		huffmanCode_t newCode = code;
////		assert( code.numBits < sizeof( codes[0].bits ) * 8 );
////		newCode.numBits++;
////		if ( code.numBits > maxHuffmanBits ) {
////			maxHuffmanBits = newCode.numBits;
////		}
////		BuildHuffmanCode_r( node.children[0], newCode, codes );
////		newCode.bits[code.numBits >> 5] |= 1 << ( code.numBits & 31 );
////		BuildHuffmanCode_r( node.children[1], newCode, codes );
////	} else {
////		assert( code.numBits <= sizeof( codes[0].bits ) * 8 );
////		codes[node.symbol] = code;
////	}
////}

/////*
////================
////FreeHuffmanTree_r
////================
////*/
////void FreeHuffmanTree_r( huffmanNode_t *node ) {
////	if ( node.symbol == -1 ) {
////		FreeHuffmanTree_r( node.children[0] );
////		FreeHuffmanTree_r( node.children[1] );
////	}
////	delete node;
////}

/////*
////================
////HuffmanHeight_r
////================
////*/
////int HuffmanHeight_r( huffmanNode_t *node ) {
////	if ( node == NULL ) {
////		return -1;
////	}
////	int left = HuffmanHeight_r( node.children[0] );
////	int right = HuffmanHeight_r( node.children[1] );
////	if ( left > right ) {
////		return left + 1;
////	}
////	return right + 1;
////}

/////*
////================
////SetupHuffman
////================
////*/
////void SetupHuffman( ) {
////	int i, height;
////	huffmanNode_t *firstNode, *node;
////	huffmanCode_t code;

////	firstNode = NULL;
////	for( i = 0; i < MAX_HUFFMAN_SYMBOLS; i++ ) {
////		node = new huffmanNode_t;
////		node.symbol = i;
////		node.frequency = huffmanFrequencies[i];
////		node.next = NULL;
////		node.children[0] = NULL;
////		node.children[1] = NULL;
////		firstNode = InsertHuffmanNode( firstNode, node );
////	}

////	for( i = 1; i < MAX_HUFFMAN_SYMBOLS; i++ ) {
////		node = new huffmanNode_t;
////		node.symbol = -1;
////		node.frequency = firstNode.frequency + firstNode.next.frequency;
////		node.next = NULL;
////		node.children[0] = firstNode;
////		node.children[1] = firstNode.next;
////		firstNode = InsertHuffmanNode( firstNode.next.next, node );
////	}

////	maxHuffmanBits = 0;
////	memset( &code, 0, sizeof( code ) );
////	BuildHuffmanCode_r( firstNode, code, huffmanCodes );

////	huffmanTree = firstNode;

////	height = HuffmanHeight_r( firstNode );
////	assert( maxHuffmanBits == height );
////}

/////*
////================
////ShutdownHuffman
////================
////*/
////void ShutdownHuffman( ) {
////	if ( huffmanTree ) {
////		FreeHuffmanTree_r( huffmanTree );
////	}
////}

/////*
////================
////HuffmanCompressText
////================
////*/
////int HuffmanCompressText( text:string, int textLength, byte *compressed, int maxCompressedSize ) {
////	var /*int */i:number, j:number;
////	idBitMsg msg;

////	totalUncompressedLength += textLength;

////	msg.Init( compressed, maxCompressedSize );
////	msg.BeginWriting();
////	for ( i = 0; i < textLength; i++ ) {
////		const huffmanCode_t &code = huffmanCodes[(unsigned char)text[i]];
////		for ( j = 0; j < ( code.numBits >> 5 ); j++ ) {
////			msg.WriteBits( code.bits[j], 32 );
////		}
////		if ( code.numBits & 31 ) {
////			msg.WriteBits( code.bits[j], code.numBits & 31 );
////		}
////	}

////	totalCompressedLength += msg.GetSize();

////	return msg.GetSize();
////}

/////*
////================
////HuffmanDecompressText
////================
////*/
////int HuffmanDecompressText( char *text, int textLength, const byte *compressed, int compressedSize ) {
////	int i, bit;
////	idBitMsg msg;
////	huffmanNode_t *node;

////	msg.Init( compressed, compressedSize );
////	msg.SetSize( compressedSize );
////	msg.BeginReading();
////	for ( i = 0; i < textLength; i++ ) {
////		node = huffmanTree;
////		do {
////			bit = msg.ReadBits( 1 );
////			node = node.children[bit];
////		} while( node.symbol == -1 );
////		text[i] = node.symbol;
////	}
////	text[i] = '\0';
////	return msg.GetReadCount();
////}

/////*
////================
////ListHuffmanFrequencies_f
////================
////*/
////void ListHuffmanFrequencies_f( const idCmdArgs &args ) {
////	int		i;
////	float compression;
////	compression = !totalUncompressedLength ? 100 : 100 * totalCompressedLength / totalUncompressedLength;
////	common.Printf( "// compression ratio = %d%%\n", (int)compression );
////	common.Printf( "static int huffmanFrequencies[] = {\n" );
////	for( i = 0; i < MAX_HUFFMAN_SYMBOLS; i += 8 ) {
////		common.Printf( "\t0x%08x, 0x%08x, 0x%08x, 0x%08x, 0x%08x, 0x%08x, 0x%08x, 0x%08x,\n",
////							huffmanFrequencies[i+0], huffmanFrequencies[i+1],
////							huffmanFrequencies[i+2], huffmanFrequencies[i+3],
////							huffmanFrequencies[i+4], huffmanFrequencies[i+5],
////							huffmanFrequencies[i+6], huffmanFrequencies[i+7]);
////	}
////	common.Printf( "}\n" );
////}

/////*
////====================================================================================

//// idDeclFile

////====================================================================================
////*/


/////*
////================
////idDeclFile::Reload

////ForceReload will cause it to reload even if the timestamp hasn't changed
////================
////*/
////void idDeclFile::Reload( bool force ) {
////	// check for an unchanged timestamp
////	if ( !force && timestamp != 0 ) {
////		ID_TIME_T	testTimeStamp;
////		fileSystem.ReadFile( fileName, NULL, &testTimeStamp );

////		if ( testTimeStamp == timestamp ) {
////			return;
////		}
////	}

////	// parse the text
////	LoadAndParse();
////}

/*
================
idDeclFile::LoadAndParse

This is used during both the initial load, and any reloads
================
*/
var/*int */c_savedMemory = 0;

/*int*/
idDeclFile.prototype.LoadAndParse = function ( ): number {
	var /*int*/i: number, numTypes: number;
	var src = new idLexer;
	var token = new idToken;
	var /*int*/startMarker: number;
	var buffer = new R<Uint8Array> ( );
	var /*int*/length: number, size: number;
	var /*int*/sourceLine: number;
	var name = new idStr;
	var newDecl: idDeclLocal;
	var reparse: boolean;

	// load the text
	common.DPrintf( "...loading '%s'\n", this.fileName.c_str ( ) );
	var $timestamp = new R<number>( this.timestamp );
	length = fileSystem.ReadFile( this.fileName.c_str ( ), /*(void **)&*/buffer, $timestamp );
	this.timestamp = $timestamp.$;
	if ( length == -1 ) {
		common.FatalError( "couldn't load %s", this.fileName.c_str ( ) );
		return 0;
	}

	if ( !src.LoadMemory( buffer.$.toString ( ), length, this.fileName.c_str ( ) ) ) {
		common.Error( "Couldn't parse %s", this.c_str ( ) );
		Mem_Free( buffer );
		return 0;
	}

	// mark all the defs that were from the last reload of this file
	for ( var decl: idDeclLocal = this.decls; decl; decl = decl.nextInFile ) {
		decl.redefinedInReload = false;
	}

	src.SetFlags( DECL_LEXER_FLAGS );

	//this.checksum = MD5_BlockChecksum( buffer, length ); // not needed, for sp at least

	this.fileSize = length;

	// scan through, identifying each individual declaration
	while ( 1 ) {

		startMarker = src.GetFileOffset ( );
		sourceLine = src.GetLineNum ( );

		// parse the decl type name
		if ( !src.ReadToken( token ) ) {
			break;
		}

		var identifiedType = declType_t.DECL_MAX_TYPES;

		// get the decl type from the type name
		numTypes = declManagerLocal.GetNumDeclTypes ( );
		for ( i = 0; i < numTypes; i++ ) {
			var typeInfo: idDeclType = declManagerLocal.GetDeclType( i );
			if ( typeInfo && typeInfo.typeName.Icmp( token.data ) == 0 ) {
				identifiedType = typeInfo.type;
				break;
			}
		}

		if ( i >= numTypes ) {

			if ( token.Icmp( "{" ) == 0 ) {

				// if we ever see an open brace, we somehow missed the [type] <name> prefix
				src.Warning( "Missing decl name" );
				src.SkipBracedSection( false );
				continue;

			} else {

				if ( this.defaultType == declType_t.DECL_MAX_TYPES ) {
					src.Warning( "No type" );
					continue;
				}
				src.UnreadToken( token );
				// use the default type
				identifiedType = this.defaultType;
			}
		}

		// now parse the name
		if ( !src.ReadToken( token ) ) {
			src.Warning( "Type without definition at end of file" );
			break;
		}

		if ( !token.Icmp( "{" ) ) {
			// if we ever see an open brace, we somehow missed the [type] <name> prefix
			src.Warning( "Missing decl name" );
			src.SkipBracedSection( false );
			continue;
		}

		// FIXME: export decls are only used by the model exporter, they are skipped here for now
		if ( identifiedType == declType_t.DECL_MODELEXPORT ) {
			src.SkipBracedSection ( );
			continue;
		}

		name.opEquals( token.data );

		assert( src.buffer.indexOf( "<!DOCTYPE html" ) === -1 );

		// make sure there's a '{'
		if ( !src.ReadToken( token ) ) {
			src.Warning( "Type without definition at end of file" );
			break;
		}
		if ( token.c_str ( ) != "{" ) {
			src.Warning( "Expecting '{' but found '%s'", token.c_str ( ) );
			continue;
		}
		src.UnreadToken( token );

		// now take everything until a matched closing brace
		src.SkipBracedSection ( );
		size = src.GetFileOffset ( ) - startMarker;

		// look it up, possibly getting a newly created default decl
		reparse = false;
		newDecl = declManagerLocal.FindTypeWithoutParsing( identifiedType, name.data, false );
		if ( newDecl ) {
			// update the existing copy
			if ( newDecl.sourceFile != this || newDecl.redefinedInReload ) {
				src.Warning( "%s '%s' previously defined at %s:%i", declManagerLocal.GetDeclNameFromType( identifiedType ),
					name.c_str ( ), newDecl.sourceFile.fileName.c_str ( ), newDecl.sourceLine );
				continue;
			}
			if ( newDecl.declState != declState_t.DS_UNPARSED ) {
				reparse = true;
			}
		} else {
			// allow it to be created as a default, then add it to the per-file list
			newDecl = declManagerLocal.FindTypeWithoutParsing( identifiedType, name.data, true );
			newDecl.nextInFile = this.decls;
			this.decls = newDecl;
		}

		newDecl.redefinedInReload = true;

		if ( newDecl.textSource ) {
			Mem_Free( newDecl.textSource );
			newDecl.textSource = null /*NULL*/;
		}

		newDecl.SetTextLocal( buffer.$.subarray( startMarker ), size );
		newDecl.sourceFile = this;
		newDecl.sourceTextOffset = startMarker;
		newDecl.sourceTextLength = size;
		newDecl.sourceLine = sourceLine;
		newDecl.declState = declState_t.DS_UNPARSED;

		// if it is currently in use, reparse it immedaitely
		if ( reparse ) {
			newDecl.ParseLocal ( );
		}
	}

	this.numLines = src.GetLineNum ( );

	Mem_Free( buffer );

	// any defs that weren't redefinedInReload should now be defaulted
	for ( var decl: idDeclLocal = this.decls; decl; decl = decl.nextInFile ) {
		if ( decl.redefinedInReload == false ) {
			decl.MakeDefault ( );
			decl.sourceTextOffset = decl.sourceFile.fileSize;
			decl.sourceTextLength = 0;
			decl.sourceLine = decl.sourceFile.numLines;
		}
	}
	return this.checksum;
};

/////*
////====================================================================================

//// idDeclManagerLocal

////====================================================================================
////*/

////const char *listDeclStrings[] = { "current", "all", "ever", NULL };


/*
====================================================================================

	idDeclLocal

====================================================================================
*/


/*
=================
idDeclLocal::GetName
=================
*/
idDeclLocal.prototype.GetName = function ( ): string {
	return this.name.c_str ( );
};

/*
=================
idDeclLocal::GetType
=================
*/
idDeclLocal.prototype.GetType = function (): declType_t {
	return this.type;
};

/*
=================
idDeclLocal::GetState
=================
*/
idDeclLocal.prototype.GetState = function ( ): declState_t {
	return this.declState;
};

/*
=================
idDeclLocal::IsImplicit
=================
*/
idDeclLocal.prototype.IsImplicit = function ( ): boolean {
	return ( this.sourceFile == declManagerLocal.GetImplicitDeclFile ( ) );
};

/*
=================
idDeclLocal::IsValid
=================
*/
idDeclLocal.prototype.IsValid = function ( ): boolean {
	return ( this.declState != declState_t.DS_UNPARSED );
};

/*
=================
idDeclLocal::Invalidate
=================
*/
idDeclLocal.prototype.Invalidate = function ( ): void {
	this.declState = declState_t.DS_UNPARSED;
};

/*
=================
idDeclLocal::EnsureNotPurged
=================
*/
idDeclLocal.prototype.EnsureNotPurged = function ( ): void {
	if ( this.declState == declState_t.DS_UNPARSED ) {
		this.ParseLocal ( );
	}
};

/*
=================
idDeclLocal::Index
=================
*/
/*int */
idDeclLocal.prototype.Index = function ( ): number {
	return this.index;
};

/*
=================
idDeclLocal::GetLineNum
=================
*/
idDeclLocal.prototype.GetLineNum = function ( ): number {
	return this.sourceLine;
};

/*
=================
idDeclLocal::GetFileName
=================
*/
idDeclLocal.prototype.GetFileName = function ( ): string {
	return ( this.sourceFile ) ? this.sourceFile.fileName.c_str ( ) : "*invalid*";
};

/////*
////=================
////idDeclLocal::Size
////=================
////*/
////size_t idDeclLocal::Size( ) const {
////	return sizeof( idDecl ) + name.Allocated();
////}

/*
=================
idDeclLocal::GetText
=================
*/
idDeclLocal.prototype.GetText = function ( /*char **/text: Uint8Array ): void {
//#ifdef USE_COMPRESSED_DECLS
//	HuffmanDecompressText( text, textLength, (byte *)textSource, compressedLength );
//#else
	memcpy( text, this.textSource.toUint8Array ( ), this.textLength /*+ 1 */ );
//#endif
};

/*
=================
idDeclLocal::GetTextLength
=================
*/
idDeclLocal.prototype.GetTextLength = function ( ): number {
	return this.textLength;
};

/*
=================
idDeclLocal::SetText
=================
*/
idDeclLocal.prototype.SetText = function ( text: Uint8Array ): void {
	this.SetTextLocal( text, idStr.Length( text ) );
};

/*
=================
idDeclLocal::SetTextLocal
=================
*/
idDeclLocal.prototype.SetTextLocal = function ( text: Uint8Array, /*const int */length: number ): void {
	Mem_Free( this.textSource );

	this.checksum = MD5_BlockChecksum( text, length );

//#ifdef GET_HUFFMAN_FREQUENCIES
//	for( int i = 0; i < length; i++ ) {
//		huffmanFrequencies[((const unsigned char *)text)[i]]++;
//	}
//#endif

//#ifdef USE_COMPRESSED_DECLS
//	int maxBytesPerCode = ( maxHuffmanBits + 7 ) >> 3;
//	byte *compressed = (byte *)_alloca( length * maxBytesPerCode );
//	compressedLength = HuffmanCompressText( text, length, compressed, length * maxBytesPerCode );
//	textSource = (char *)Mem_Alloc( compressedLength );
//	memcpy( textSource, compressed, compressedLength );
//#else
	this.compressedLength = length;
	this.textSource = text.subarray( 0, length ).toString ( ); //this.textSource = (char *) Mem_Alloc( length + 1 );
	//memcpy( textSource, text, length );
	//textSource[length] = '\0';
//#endif
	this.textLength = length;
};

/////*
////=================
////idDeclLocal::ReplaceSourceFileText
////=================
////*/
////bool idDeclLocal::ReplaceSourceFileText( ) {
////	int oldFileLength, newFileLength;
////	char *buffer;
////	idFile *file;

////	common.Printf( "Writing \'%s\' to \'%s\'...\n", GetName(), this.GetFileName() );

////	if ( sourceFile == &declManagerLocal.implicitDecls ) {
////		common.Warning( "Can't save implicit declaration %s.", GetName() );
////		return false;
////	}

////	// get length and allocate buffer to hold the file
////	oldFileLength = sourceFile.fileSize;
////	newFileLength = oldFileLength - sourceTextLength + textLength;
////	buffer = (char *) Mem_Alloc( Max( newFileLength, oldFileLength ) );

////	// read original file
////	if ( sourceFile.fileSize ) {

////		file = fileSystem.OpenFileRead( this.GetFileName() );
////		if ( !file ) {
////			Mem_Free( buffer );
////			common.Warning( "Couldn't open %s for reading.", this.GetFileName() );
////			return false;
////		}

////		if ( file.Length() != sourceFile.fileSize || file.Timestamp() != sourceFile.timestamp ) {
////			Mem_Free( buffer );
////			common.Warning( "The file %s has been modified outside of the engine.", this.GetFileName() );
////			return false;
////		}

////		file.Read( buffer, oldFileLength );
////		fileSystem.CloseFile( file );

////		if ( MD5_BlockChecksum( buffer, oldFileLength ) != sourceFile.checksum ) {
////			Mem_Free( buffer );
////			common.Warning( "The file %s has been modified outside of the engine.", this.GetFileName() );
////			return false;
////		}
////	}

////	// insert new text
////	char *declText = (char *) _alloca( textLength + 1 );
////	GetText( declText );
////	memmove( buffer + sourceTextOffset + textLength, buffer + sourceTextOffset + sourceTextLength, oldFileLength - sourceTextOffset - sourceTextLength );
////	memcpy( buffer + sourceTextOffset, declText, textLength );

////	// write out new file
////	file = fileSystem.OpenFileWrite( this.GetFileName(), "fs_devpath" );
////	if ( !file ) {
////		Mem_Free( buffer );
////		common.Warning( "Couldn't open %s for writing.", this.GetFileName() );
////		return false;
////	}
////	file.Write( buffer, newFileLength );
////	fileSystem.CloseFile( file );

////	// set new file size, checksum and timestamp
////	sourceFile.fileSize = newFileLength;
////	sourceFile.checksum = MD5_BlockChecksum( buffer, newFileLength );
////	fileSystem.ReadFile( this.GetFileName(), NULL, &sourceFile.timestamp );

////	// free buffer
////	Mem_Free( buffer );

////	// move all decls in the same file
////	for ( idDeclLocal *decl = sourceFile.decls; decl; decl = decl.nextInFile ) {
////		if (decl.sourceTextOffset > sourceTextOffset) {
////			decl.sourceTextOffset += textLength - sourceTextLength;
////		}
////	}

////	// set new size of text in source file
////	sourceTextLength = textLength;

////	return true;
////}

/////*
////=================
////idDeclLocal::SourceFileChanged
////=================
////*/
////bool idDeclLocal::SourceFileChanged( ) const {
////	int newLength;
////	ID_TIME_T newTimestamp;

////	if ( sourceFile.fileSize <= 0 ) {
////		return false;
////	}

////	newLength = fileSystem.ReadFile( this.GetFileName(), NULL, &newTimestamp );

////	if ( newLength != sourceFile.fileSize || newTimestamp != sourceFile.timestamp ) {
////		return true;
////	}

////	return false;
////}

/*
=================
idDeclLocal::MakeDefault
=================
*/
var recursionLevel = 0;
idDeclLocal.prototype.MakeDefault = function ( ): void {
	var defaultText: string;

	declManagerLocal.MediaPrint( "DEFAULTED\n" );
	this.declState = declState_t.DS_DEFAULTED;

	this.AllocateSelf ( );

	defaultText = this.self.DefaultDefinition ( );

	// a parse error inside a DefaultDefinition() string could
	// cause an infinite loop, but normal default definitions could
	// still reference other default definitions, so we can't
	// just dump out on the first recursion
	if ( ++recursionLevel > 100 ) {
		common.FatalError( "idDecl::MakeDefault: bad DefaultDefinition(): %s", defaultText );
	}

	// always free data before parsing
	this.self.FreeData ( );

	// parse
	this.self.Parse( defaultText, strlen( defaultText ) );

	// we could still eventually hit the recursion if we have enough Error() calls inside Parse...
	--recursionLevel;
};

/*
=================
idDeclLocal::SetDefaultText
=================
*/
idDeclLocal.prototype.SetDefaultText = function ( ): boolean {
	return false;
};

/*
=================
idDeclLocal::DefaultDefinition
=================
*/
idDeclLocal.prototype.DefaultDefinition = function ( ): string {
	return "{ }";
};

/*
=================
idDeclLocal::Parse
=================
*/
idDeclLocal.prototype.Parse = function ( text: string, textLength: number ): boolean {
	var src = new idLexer ( );
	src.LoadMemory( text, textLength, this.GetFileName(), this.GetLineNum() );
	src.SetFlags( DECL_LEXER_FLAGS );
	src.SkipUntilString( "{" );
	src.SkipBracedSection( false );
	return true;
};

/*
=================
idDeclLocal::FreeData
=================
*/
idDeclLocal.prototype.FreeData = function ( ): void {
};

/////*
////=================
////idDeclLocal::List
////=================
////*/
////void idDeclLocal::List() const {
////	common.Printf( "%s\n", GetName() );
////}

/////*
////=================
////idDeclLocal::Print
////=================
////*/
////void idDeclLocal::Print() const {
////}

/////*
////=================
////idDeclLocal::Reload
////=================
////*/
////void idDeclLocal::Reload( ) {
////	this.sourceFile.Reload( false );
////}

/*
=================
idDeclLocal::AllocateSelf
=================
*/
idDeclLocal.prototype.AllocateSelf = function ( ): void {
	if ( !this.self ) {
		this.self = declManagerLocal.GetDeclType( /*(int)*/this.type ).allocator ( );
		this.self.base = this;
	}
};

/*
=================
idDeclLocal::ParseLocal
=================
*/
idDeclLocal.prototype.ParseLocal = function ( ): void {
	var generatedDefaultText = false;

	this.AllocateSelf ( );

	// always free data before parsing
	this.self.FreeData ( );

	declManagerLocal.MediaPrint( "parsing %s %s\n", declManagerLocal.declTypes[this.type].typeName.c_str ( ), this.name.c_str ( ) );

	// if no text source try to generate default text
	if ( !this.textSource ) {
		generatedDefaultText = this.self.SetDefaultText ( );
	}

	// indent for DEFAULTED or media file references
	declManagerLocal.indent++;

	// no text immediately causes a MakeDefault()
	if ( !this.textSource ) {
		this.MakeDefault ( );
		declManagerLocal.indent--;
		return;
	}

	this.declState = declState_t.DS_PARSED;

	// parse
	var /*char **/declText = new Uint8Array( this.GetTextLength ( ) + 1 );
	this.GetText( declText );
	this.self.Parse( declText.toString(), this.GetTextLength ( ) );

	// free generated text
	if ( generatedDefaultText ) {
		Mem_Free( this.textSource );
		this.textSource = 0;
		this.textLength = 0;
	}

	declManagerLocal.indent--;
};

/*
=================
idDeclLocal::Purge
=================
*/
idDeclLocal.prototype.Purge = function ( ) {
	// never purge things that were referenced outside level load,
	// like the console and menu graphics
	if ( this.parsedOutsideLevelLoad ) {
		return;
	}

	this.referencedThisLevel = false;
	this.MakeDefault ( );

	// the next Find() for this will re-parse the real data
	this.declState = declState_t.DS_UNPARSED;
};

/////*
////=================
////idDeclLocal::EverReferenced
////=================
////*/
////bool idDeclLocal::EverReferenced( ) const {
////	return everReferenced;
////}
