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
/*
===============================================================================

	idDeclSkin

===============================================================================
*/

class skinMapping_t {
	from: idMaterial; // 0 == any unmatched shader
	to: idMaterial;

	copy ( dest: skinMapping_t = null ): skinMapping_t {
		dest = dest || new skinMapping_t;
		dest.from = this.from;
		dest.to = this.to;
		return dest;
	}
}

class idDeclSkin extends idDecl {
////public:
////	virtual size_t			Size( ) const;
////	virtual bool			SetDefaultText( );
////	virtual const char *	DefaultDefinition( ) const;
////	virtual bool			Parse( text:string, const int textLength );
////	virtual void			FreeData( );
////
////	const idMaterial *		RemapShaderBySkin( const idMaterial *shader ) const;
////
////							// model associations are just for the preview dialog in the editor
////	const int				GetNumModelAssociations() const;
////	const char *			GetAssociatedModel( int index ) const;
////
////private:
	mappings = new 	idList<skinMapping_t>(skinMapping_t);
	associatedModels = new idStrList;




////#include "../idlib/precompiled.h"
////#pragma hdrstop
////
////
/////*
////=================
////idDeclSkin::Size
////=================
////*/
////size_t idDeclSkin::Size( ) const {
////	return sizeof( idDeclSkin );
////}
////
/*
================
idDeclSkin::FreeData
================
*/
	FreeData(): void {
		this.mappings.Clear ( );
	}

/*
================
idDeclSkin::Parse
================
*/
	Parse ( text: string, textLength: number ): boolean {
		var src = new idLexer;
		var token = new idToken, token2 = new idToken;

		src.LoadMemory( text, textLength, this.GetFileName ( ), this.GetLineNum ( ) );
		src.SetFlags( DECL_LEXER_FLAGS );
		src.SkipUntilString( "{" );

		this.associatedModels.Clear ( );

		while ( 1 ) {
			if ( !src.ReadToken( token ) ) {
				break;
			}

			if ( !token.Icmp( "}" ) ) {
				break;
			}
			if ( !src.ReadToken( token2 ) ) {
				src.Warning( "Unexpected end of file" );
				this.MakeDefault ( );
				return false;
			}

			if ( !token.Icmp( "model" ) ) {
				this.associatedModels.Append( token2 );
				continue;
			}

			var map = new skinMapping_t;

			if ( !token.Icmp( "*" ) ) {
				// wildcard
				map.from = null;
			} else {
				map.from = declManager.FindMaterial( token.data );
			}

			map.to = declManager.FindMaterial( token2.data );

			this.mappings.Append( map );
		}

		return false;
	}

/*
================
idDeclSkin::SetDefaultText
================
*/
	SetDefaultText(): boolean {
		debugger;
		// if there exists a material with the same name
		if ( declManager.FindType( declType_t.DECL_MATERIAL, this.GetName ( ), false ) ) {
			var generated = new Uint8Array( 2048 );

			idStr.snPrintf( generated, sizeof( generated ),
				"skin %s // IMPLICITLY GENERATED\n" +
				"{\n" +
				"_default %s\n" +
				"}\n", this.GetName ( ), this.GetName ( ) );
			this.SetText( generated );
			return true;
		} else {
			return false;
		}
	}

/*
================
idDeclSkin::DefaultDefinition
================
*/
    DefaultDefinition ( ): string {
        return "{\n" +
            "\t" + "\"*\"\t\"_default\"\n" +
            "}";
    }

/////*
////================
////idDeclSkin::GetNumModelAssociations
////================
////*/
////const int idDeclSkin::GetNumModelAssociations const {
////	return this.associatedModels.Num(); 
////}
////
/////*
////================
////idDeclSkin::GetAssociatedModel
////================
////*/
////const char *idDeclSkin::GetAssociatedModel( int index ) const {
////	if ( index >= 0 && index < this.associatedModels.Num() ) {
////		return this.associatedModels[ index ];
////	}
////	return "";
////}
////
/////*
////===============
////RemapShaderBySkin
////===============
////*/
////const idMaterial *idDeclSkin::RemapShaderBySkin( const idMaterial *shader ) const {
////	var i:number /*int*/;
////
////	if ( !shader ) {
////		return NULL;
////	}
////
////	// never remap surfaces that were originally nodraw, like collision hulls
////	if ( !shader.IsDrawn() ) {
////		return shader;
////	}
////
////	for ( i = 0; i < this.mappings.Num() ; i++ ) {
////		const skinMapping_t	*map = &this.mappings[i];
////
////		// NULL = wildcard match
////		if ( !map.from || map.from == shader ) {
////			return map.to;
////		}
////	}
////
////	// didn't find a match or wildcard, so stay the same
////	return shader;
////}
}