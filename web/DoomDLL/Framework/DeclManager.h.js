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
var declType_t;
(function (declType_t) {
    declType_t[declType_t["DECL_TABLE"] = 0] = "DECL_TABLE";
    declType_t[declType_t["DECL_MATERIAL"] = 1] = "DECL_MATERIAL";
    declType_t[declType_t["DECL_SKIN"] = 2] = "DECL_SKIN";
    declType_t[declType_t["DECL_SOUND"] = 3] = "DECL_SOUND";
    declType_t[declType_t["DECL_ENTITYDEF"] = 4] = "DECL_ENTITYDEF";
    declType_t[declType_t["DECL_MODELDEF"] = 5] = "DECL_MODELDEF";
    declType_t[declType_t["DECL_FX"] = 6] = "DECL_FX";
    declType_t[declType_t["DECL_PARTICLE"] = 7] = "DECL_PARTICLE";
    declType_t[declType_t["DECL_AF"] = 8] = "DECL_AF";
    declType_t[declType_t["DECL_PDA"] = 9] = "DECL_PDA";
    declType_t[declType_t["DECL_VIDEO"] = 10] = "DECL_VIDEO";
    declType_t[declType_t["DECL_AUDIO"] = 11] = "DECL_AUDIO";
    declType_t[declType_t["DECL_EMAIL"] = 12] = "DECL_EMAIL";
    declType_t[declType_t["DECL_MODELEXPORT"] = 13] = "DECL_MODELEXPORT";
    declType_t[declType_t["DECL_MAPDEF"] = 14] = "DECL_MAPDEF";

    declType_t[declType_t["DECL_MAX_TYPES"] = 32] = "DECL_MAX_TYPES";
})(declType_t || (declType_t = {}));
;

var declState_t;
(function (declState_t) {
    declState_t[declState_t["DS_UNPARSED"] = 0] = "DS_UNPARSED";
    declState_t[declState_t["DS_DEFAULTED"] = 1] = "DS_DEFAULTED";

    declState_t[declState_t["DS_PARSED"] = 2] = "DS_PARSED";
})(declState_t || (declState_t = {}));
;

////const int DECL_LEXER_FLAGS	=	LEXFL_NOSTRINGCONCAT |				// multiple strings seperated by whitespaces are not concatenated
////								LEXFL_NOSTRINGESCAPECHARS |			// no escape characters inside strings
////								LEXFL_ALLOWPATHNAMES |				// allow path seperators in names
////								LEXFL_ALLOWMULTICHARLITERALS |		// allow multi character literals
////								LEXFL_ALLOWBACKSLASHSTRINGCONCAT |	// allow multiple strings seperated by '\' to be concatenated
////								LEXFL_NOFATALERRORS;				// just set a flag instead of fatal erroring
var idDeclBase = (function () {
    function idDeclBase() {
    }
    return idDeclBase;
})();
;

var idDecl = (function () {
    function idDecl() {
    }
    return idDecl;
})();
;

//template< class type >
function idDeclAllocator(type) {
    return function () {
        return new type();
    };
}

////class idMaterial;
////class idDeclSkin;
////class idSoundShader;
var idDeclManager = (function () {
    function idDeclManager() {
    }
    return idDeclManager;
})();
;
//@ sourceMappingURL=DeclManager.h.js.map
