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
////	idDeclSkin
////
////===============================================================================
////*/
////
////typedef struct {
////	const idMaterial *		from;			// 0 == any unmatched shader
////	const idMaterial *		to;
////} skinMapping_t;
////
class idDeclSkin extends idDecl {
////public:
////	virtual size_t			Size( void ) const;
////	virtual bool			SetDefaultText( void );
////	virtual const char *	DefaultDefinition( void ) const;
////	virtual bool			Parse( text:string, const int textLength );
////	virtual void			FreeData( void );
////
////	const idMaterial *		RemapShaderBySkin( const idMaterial *shader ) const;
////
////							// model associations are just for the preview dialog in the editor
////	const int				GetNumModelAssociations() const;
////	const char *			GetAssociatedModel( int index ) const;
////
////private:
////	idList<skinMapping_t>	mappings;
////	idStrList				associatedModels;




////#include "../idlib/precompiled.h"
////#pragma hdrstop
////
////
/////*
////=================
////idDeclSkin::Size
////=================
////*/
////size_t idDeclSkin::Size( void ) const {
////	return sizeof( idDeclSkin );
////}
////
/////*
////================
////idDeclSkin::FreeData
////================
////*/
////void idDeclSkin::FreeData( void ) {
////	mappings.Clear();
////}
////
/////*
////================
////idDeclSkin::Parse
////================
////*/
////bool idDeclSkin::Parse( text:string, const int textLength ) {
////	idLexer src;
////	idToken	token, token2;
////
////	src.LoadMemory( text, textLength, GetFileName(), GetLineNum() );
////	src.SetFlags( DECL_LEXER_FLAGS );
////	src.SkipUntilString( "{" );
////
////	associatedModels.Clear();
////
////	while (1) {
////		if ( !src.ReadToken( &token ) ) {
////			break;
////		}
////
////		if ( !token.Icmp( "}" ) ) {
////			break;
////		}
////		if ( !src.ReadToken( &token2 ) ) {
////			src.Warning( "Unexpected end of file" );
////			MakeDefault();
////			return false;
////		}
////
////		if ( !token.Icmp( "model" ) ) {
////			associatedModels.Append( token2 );
////			continue;
////		}
////
////		skinMapping_t	map;
////
////		if ( !token.Icmp( "*" ) ) {
////			// wildcard
////			map.from = NULL;
////		} else {
////			map.from = declManager->FindMaterial( token );
////		}
////
////		map.to = declManager->FindMaterial( token2 );
////
////		mappings.Append( map );
////	}
////
////	return false;
////}
////
/////*
////================
////idDeclSkin::SetDefaultText
////================
////*/
////bool idDeclSkin::SetDefaultText( void ) {
////	// if there exists a material with the same name
////	if ( declManager->FindType( DECL_MATERIAL, GetName(), false ) ) {
////		char generated[2048];
////
////		idStr::snPrintf( generated, sizeof( generated ),
////						"skin %s // IMPLICITLY GENERATED\n"
////						"{\n"
////						"_default %s\n"
////						"}\n", GetName(), GetName() );
////		SetText( generated );
////		return true;
////	} else {
////		return false;
////	}
////}
////
/////*
////================
////idDeclSkin::DefaultDefinition
////================
////*/
////const char *idDeclSkin::DefaultDefinition( void ) const {
////	return
////		"{\n"
////	"\t"	"\"*\"\t\"_default\"\n"
////		"}";
////}
////
/////*
////================
////idDeclSkin::GetNumModelAssociations
////================
////*/
////const int idDeclSkin::GetNumModelAssociations(void ) const {
////	return associatedModels.Num(); 
////}
////
/////*
////================
////idDeclSkin::GetAssociatedModel
////================
////*/
////const char *idDeclSkin::GetAssociatedModel( int index ) const {
////	if ( index >= 0 && index < associatedModels.Num() ) {
////		return associatedModels[ index ];
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
////	int		i;
////
////	if ( !shader ) {
////		return NULL;
////	}
////
////	// never remap surfaces that were originally nodraw, like collision hulls
////	if ( !shader->IsDrawn() ) {
////		return shader;
////	}
////
////	for ( i = 0; i < mappings.Num() ; i++ ) {
////		const skinMapping_t	*map = &mappings[i];
////
////		// NULL = wildcard match
////		if ( !map->from || map->from == shader ) {
////			return map->to;
////		}
////	}
////
////	// didn't find a match or wildcard, so stay the same
////	return shader;
////}
}