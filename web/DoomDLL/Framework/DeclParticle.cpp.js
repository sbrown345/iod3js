var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="DeclManager.h.ts" />
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
////struct ParticleParmDesc {
////	const char *name;
////	int count;
////	const char *desc;
////};
////
////const ParticleParmDesc ParticleDistributionDesc[] = {
////	{ "rect", 3, "" },
////	{ "cylinder", 4, "" },
////	{ "sphere", 3, "" }
////};
////
////const ParticleParmDesc ParticleDirectionDesc[] = {
////	{ "cone", 1, "" },
////	{ "outward", 1, "" },
////};
////
////const ParticleParmDesc ParticleOrientationDesc[] = {
////	{ "view", 0, "" },
////	{ "aimed", 2, "" },
////	{ "x", 0, "" },
////	{ "y", 0, "" },
////	{ "z", 0, "" }
////};
////
////const ParticleParmDesc ParticleCustomDesc[] = {
////	{ "standard", 0, "Standard" },
////	{ "helix", 5, "sizeX Y Z radialSpeed axialSpeed" },
////	{ "flies", 3, "radialSpeed axialSpeed size" },
////	{ "orbit", 2, "radius speed"},
////	{ "drip", 2, "something something" }
////};
////
////const int CustomParticleCount = sizeof( ParticleCustomDesc ) / sizeof( const ParticleParmDesc );
////
//
// group of particle stages
//
var idDeclParticle = (function (_super) {
    __extends(idDeclParticle, _super);
    function idDeclParticle() {
        _super.apply(this, arguments);
    }
    return idDeclParticle;
})(idDecl);

/////*
////====================================================================================
////
////idParticleParm
////
////====================================================================================
////*/
////
////float idParticleParm::Eval( float frac, idRandom &rand ) const {
////	if ( table ) {
////		return table->TableLookup( frac );
////	}
////	return from + frac * ( to - from );
////}
////
////float idParticleParm::Integrate( float frac, idRandom &rand ) const {
////	if ( table ) {
////		common->Printf( "idParticleParm::Integrate: can't integrate tables\n" );
////		return 0;
////	}
////	return ( from + frac * ( to - from ) * 0.5f ) * frac;
////}
////
/////*
////====================================================================================
////
////idParticleStage
////
////====================================================================================
////*/
//
// single particle stage
//
var idParticleStage = (function () {
    function idParticleStage() {
    }
    return idParticleStage;
})();
//@ sourceMappingURL=DeclParticle.cpp.js.map
