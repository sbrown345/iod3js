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

////#ifndef __DECLMANAGER_H__
////#define __DECLMANAGER_H__

/////*
////===============================================================================

////	Declaration Manager

////	All "small text" data types, like materials, sound shaders, fx files,
////	entity defs, etc. are managed uniformly, allowing reloading, purging,
////	listing, printing, etc. All "large text" data types that never have more
////	than one declaration in a given file, like maps, models, AAS files, etc.
////	are not handled here.

////	A decl will never, ever go away once it is created. The manager is
////	garranteed to always return the same decl pointer for a decl type/name
////	combination. The index of a decl in the per type list also stays the
////	same throughout the lifetime of the engine. Although the pointer to
////	a decl always stays the same, one should never maintain pointers to
////	data inside decls. The data stored in a decl is not garranteed to stay
////	the same for more than one engine frame.

////	The decl indexes of explicitely defined decls are garrenteed to be
////	consistent based on the parsed decl files. However, the indexes of
////	implicit decls may be different based on the order in which levels
////	are loaded.

////	The decl namespaces are separate for each type. Comments for decls go
////	above the text definition to keep them associated with the proper decl.

////	During decl parsing, errors should never be issued, only warnings
////	followed by a call to MakeDefault().

////===============================================================================
////*/

enum declType_t {
	DECL_TABLE = 0,
	DECL_MATERIAL = 1,
	DECL_SKIN = 2,
	DECL_SOUND = 3,
	DECL_ENTITYDEF = 4,
	DECL_MODELDEF = 5,
	DECL_FX = 6,
	DECL_PARTICLE = 7,
	DECL_AF = 8,
	DECL_PDA = 9,
	DECL_VIDEO = 10,
	DECL_AUDIO = 11,
	DECL_EMAIL = 12,
	DECL_MODELEXPORT = 13,
	DECL_MAPDEF = 14,

	// new decl types can be added here

	DECL_MAX_TYPES			= 32
};

enum declState_t {
	DS_UNPARSED,
	DS_DEFAULTED,			// set if a parse failed due to an error, or the lack of any source
	DS_PARSED
};

var DECL_LEXER_FLAGS = lexerFlags_t.LEXFL_NOSTRINGCONCAT | // multiple strings seperated by whitespaces are not concatenated
	lexerFlags_t.LEXFL_NOSTRINGESCAPECHARS | // no escape characters inside strings
	lexerFlags_t.LEXFL_ALLOWPATHNAMES | // allow path seperators in names
	lexerFlags_t.LEXFL_ALLOWMULTICHARLITERALS | // allow multi character literals
	lexerFlags_t.LEXFL_ALLOWBACKSLASHSTRINGCONCAT | // allow multiple strings seperated by '\' to be concatenated
	lexerFlags_t.LEXFL_NOFATALERRORS;				// just set a flag instead of fatal erroring


class idDeclBase {
////public:
////	virtual 				~idDeclBase() {};
	GetName(): string { throw "placeholder"; }
////	virtual declType_t		GetType( void ) const = 0;
////	virtual declState_t		GetState( void ) const = 0;
////	virtual bool			IsImplicit( void ) const = 0;
////	virtual bool			IsValid( void ) const = 0;
////	virtual void			Invalidate( void ) = 0;
////	virtual void			Reload( void ) = 0;
	EnsureNotPurged(): void { throw "placeholder"; }
////	virtual int				Index( void ) const = 0;
	GetLineNum ( ): number { throw "placeholder"; }
	GetFileName( ):string { throw "placeholder"; }
////	virtual void			GetText( char *text ) const = 0;
////	virtual int				GetTextLength( void ) const = 0;
////	virtual void			SetText( const char *text ) = 0;
////	virtual bool			ReplaceSourceFileText( void ) = 0;
////	virtual bool			SourceFileChanged( void ) const = 0;
	MakeDefault(): void { throw "placeholder"; }
	EverReferenced ( ): boolean /* = 0;*/ { throw "placeholder"; }
	SetDefaultText ( ): boolean /* = 0;*/ { throw "placeholder"; }
	DefaultDefinition ( ): string { throw "placeholder"; }
////	virtual bool			Parse( const char *text, const int textLength ) = 0;
	FreeData ( ): void /* = 0;*/ { throw "placeholder"; }
////	virtual size_t			Size( void ) const = 0;
////	virtual void			List( void ) const = 0;
////	virtual void			Print( void ) const = 0;
};


class idDecl {
////public:
////							// The constructor should initialize variables such that
////							// an immediate call to FreeData() does no harm.
////							idDecl( void ) { this.base = NULL; }
////	virtual 				~idDecl( void ) {};

	// Returns the name of the decl.
	GetName ( ): string { return this.base.GetName ( ); }

////							// Returns the decl type.
////	declType_t				GetType( void ) const { return this.base.GetType(); }

////							// Returns the decl state which is usefull for finding out if a decl defaulted.
////	declState_t				GetState( void ) const { return this.base.GetState(); }

////							// Returns true if the decl was defaulted or the text was created with a call to SetDefaultText.
////	bool					IsImplicit( void ) const { return this.base.IsImplicit(); }

////							// The only way non-manager code can have an invalid decl is if the *ByIndex()
////							// call was used with forceParse = false to walk the lists to look at names
////							// without touching the media.
////	bool					IsValid( void ) const { return this.base.IsValid(); }

////							// Sets state back to unparsed.
////							// Used by decl editors to undo any changes to the decl.
////	void					Invalidate( void ) { this.base.Invalidate(); }

							// if a pointer might possible be stale from a previous level,
							// call this to have it re-parsed
	EnsureNotPurged ( ): void { this.base.EnsureNotPurged ( ); }

////							// Returns the index in the per-type list.
////	int						Index( void ) const { return this.base.Index(); }

							// Returns the line number the decl starts.
	GetLineNum( ):number { return this.base.GetLineNum(); }

	// Returns the name of the file in which the decl is defined.
	GetFileName( ):string { return this.base.GetFileName(); }

////							// Returns the decl text.
////	void					GetText( char *text ) const { this.base.GetText( text ); }

////							// Returns the length of the decl text.
////	int						GetTextLength( void ) const { return this.base.GetTextLength(); }

////							// Sets new decl text.
////	void					SetText( const char *text ) { this.base.SetText( text ); }

////							// Saves out new text for the decl.
////							// Used by decl editors to replace the decl text in the source file.
////	bool					ReplaceSourceFileText( void ) { return this.base.ReplaceSourceFileText(); }

////							// Returns true if the source file changed since it was loaded and parsed.
////	bool					SourceFileChanged( void ) const { return this.base.SourceFileChanged(); }

							// Frees data and makes the decl a default.
	MakeDefault ( ): void { this.base.MakeDefault ( ); }

////							// Returns true if the decl was ever referenced.
////	bool					EverReferenced( void ) const { return this.base.EverReferenced(); }

////public:
////							// Sets textSource to a default text if necessary.
////							// This may be overridden to provide a default definition based on the
////							// decl name. For instance materials may default to an implicit definition
////							// using a texture with the same name as the decl.
	SetDefaultText ( ): boolean { return this.base.SetDefaultText ( ); }

	// Each declaration type must have a default string that it is guaranteed
	// to parse acceptably. When a decl is not explicitly found, is purged, or
	// has an error while parsing, MakeDefault() will do a FreeData(), then a
	// Parse() with DefaultDefinition(). The defaultDefintion should start with
	// an open brace and end with a close brace.
	DefaultDefinition ( ): string { return this.base.DefaultDefinition ( ); }

////							// The manager will have already parsed past the type, name and opening brace.
////							// All necessary media will be touched before return.
////							// The manager will have called FreeData() before issuing a Parse().
////							// The subclass can call MakeDefault() internally at any point if
////							// there are parse errors.
////	virtual bool			Parse( const char *text, const int textLength ) { return this.base.Parse( text, textLength ); }

////							// Frees any pointers held by the subclass. This may be called before
////							// any Parse(), so the constructor must have set sane values. The decl will be
////							// invalid after issuing this call, but it will always be immediately followed
////							// by a Parse()
	FreeData( ):void { this.base.FreeData ( ); }

////							// Returns the size of the decl in memory.
////	virtual size_t			Size( void ) const { return this.base.Size(); }

////							// If this isn't overridden, it will just print the decl name.
////							// The manager will have printed 7 characters on the line already,
////							// containing the reference state and index number.
////	virtual void			List( void ) const { this.base.List(); }

////							// The print function will already have dumped the text source
////							// and common data, subclasses can override this to dump more
////							// explicit data.
////	virtual void			Print( void ) const { this.base.Print(); }

//public:
	base: idDeclBase ;
};


//template< class type >
function idDeclAllocator<T> ( type: any ): ( ) => T {
    return function ( ) { return new type; };
}


////class idMaterial;
////class idDeclSkin;
////class idSoundShader;

class idDeclManager {
////public:
////	virtual					~idDeclManager( void ) {}

////	virtual void			Init( void ) = 0;
////	virtual void			Shutdown( void ) = 0;
////	virtual void			Reload( bool force ) = 0;

////	virtual void			BeginLevelLoad() = 0;
////	virtual void			EndLevelLoad() = 0;

////							// Registers a new decl type.
////	virtual void			RegisterDeclType( const char *typeName, declType_t type, idDecl *(*allocator)( void ) ) = 0;

////							// Registers a new folder with decl files.
////	virtual void			RegisterDeclFolder( const char *folder, const char *extension, declType_t defaultType ) = 0;

////							// Returns a checksum for all loaded decl text.
////	virtual int				GetChecksum( void ) const = 0;

////							// Returns the number of decl types.
	GetNumDeclTypes ( ): number /*int*/ /*const = 0;*/ { throw "placeholder"; }

////							// Returns the type name for a decl type.
////	virtual const char *	GetDeclNameFromType( declType_t type ) const = 0;

////							// Returns the decl type for a type name.
////	virtual declType_t		GetDeclTypeFromName( const char *typeName ) const = 0;

////							// If makeDefault is true, a default decl of appropriate type will be created
////							// if an explicit one isn't found. If makeDefault is false, NULL will be returned
////							// if the decl wasn't explcitly defined.
////	virtual const idDecl *	FindType( declType_t type, const char *name, bool makeDefault = true ) = 0;

////	virtual const idDecl*	FindDeclWithoutParsing( declType_t type, const char *name, bool makeDefault = true ) = 0;

////	virtual void			ReloadFile( const char* filename, bool force ) = 0;

////							// Returns the number of decls of the given type.
////	virtual int				GetNumDecls( declType_t type ) = 0;

////							// The complete lists of decls can be walked to populate editor browsers.
////							// If forceParse is set false, you can get the decl to check name / filename / etc.
////							// without causing it to parse the source and load media.
////	virtual const idDecl *	DeclByIndex( declType_t type, int index, bool forceParse = true ) = 0;

////							// List and print decls.
////	virtual void			ListType( const idCmdArgs &args, declType_t type ) = 0;
////	virtual void			PrintType( const idCmdArgs &args, declType_t type ) = 0;

////							// Creates a new default decl of the given type with the given name in
////							// the given file used by editors to create a new decls.
////	virtual idDecl *		CreateNewDecl( declType_t type, const char *name, const char *fileName ) = 0;

////							// BSM - Added for the material editors rename capabilities
////	virtual bool			RenameDecl( declType_t type, const char* oldName, const char* newName ) = 0;

////							// When media files are loaded, a reference line can be printed at a
////							// proper indentation if decl_show is set
////	virtual void			MediaPrint( const char *fmt, ... ) id_attribute((format(printf,2,3))) = 0;

////	virtual void			WritePrecacheCommands( idFile *f ) = 0;

////									// Convenience functions for specific types.
////	virtual	const idMaterial *		FindMaterial( const char *name, bool makeDefault = true ) = 0;
////	virtual const idDeclSkin *		FindSkin( const char *name, bool makeDefault = true ) = 0;
////	virtual const idSoundShader *	FindSound( const char *name, bool makeDefault = true ) = 0;

////	virtual const idMaterial *		MaterialByIndex( int index, bool forceParse = true ) = 0;
////	virtual const idDeclSkin *		SkinByIndex( int index, bool forceParse = true ) = 0;
////	virtual const idSoundShader *	SoundByIndex( int index, bool forceParse = true ) = 0;
};

////extern idDeclManager *		declManager;


//template< declType_t type >
//ID_INLINE void idListDecls_f( const idCmdArgs &args ) {
//	declManager.ListType( args, type );
//}

////template< declType_t type >
////ID_INLINE void idPrintDecls_f( const idCmdArgs &args ) {
////	declManager.PrintType( args, type );
////}

////#endif /* !__DECLMANAGER_H__ */
