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

////#ifndef __DECLPARTICLE_H__
////#define __DECLPARTICLE_H__

/*
===============================================================================

	idDeclParticle

===============================================================================
*/

class idParticleParm {
////public:
	constructor ( ) {
		this.table = null;
		this.from = this.to = 0.0;
	}

	table: idDeclTable;
	from: number /*float*/;
	to: number /*float*/;

////	float					Eval( float frac, idRandom &rand ) const;
////	float					Integrate( float frac, idRandom &rand ) const;


	Eval ( /*float */frac: number, rand: idRandom ): number /*float*/ {
		if ( this.table ) {
			return this.table.TableLookup( frac );
		}
		return this.from + frac * ( this.to - this.from );
	}

////float idParticleParm::Integrate( float frac, idRandom &rand ) const {
////	if (this. table ) {
////		common.Printf( "idParticleParm::Integrate: can't integrate tables\n" );
////		return 0;
////	}
////	return (this. from + frac * ( this.to -this. from ) * 0.5 ) * frac;
////}
////
}


enum prtDistribution_t{
	PDIST_RECT,				// ( sizeX sizeY sizeZ )
	PDIST_CYLINDER,			// ( sizeX sizeY sizeZ )
	PDIST_SPHERE			// ( sizeX sizeY sizeZ ringFraction )
							// a ringFraction of zero allows the entire sphere, 0.9 would only
							// allow the outer 10% of the sphere
}

enum prtDirection_t{
	PDIR_CONE,				// parm0 is the solid cone angle
	PDIR_OUTWARD			// direction is relative to offset from origin, parm0 is an upward bias
}

enum prtCustomPth_t{
	PPATH_STANDARD,
	PPATH_HELIX,			// ( sizeX sizeY sizeZ radialSpeed climbSpeed )
	PPATH_FLIES,
	PPATH_ORBIT,
	PPATH_DRIP
};

enum prtOrientation_t{
	POR_VIEW,
	POR_AIMED,				// angle and aspect are disregarded
	POR_X,
	POR_Y,
	POR_Z
}

////typedef struct renderEntity_s renderEntity_t;
////typedef struct renderView_s renderView_t;

class particleGen_t {
	renderEnt:renderEntity_t;			// for shaderParms, etc
	renderView:renderView_t;
	index :number/*int*/;				// particle number in the system
	frac :number/*float*/;				// 0.0 to 1.0
	random = new idRandom;
	origin = new idVec3;				// dynamic smoke particles can have individual origins and axis
	axis = new idMat3;
	
	
	age :number/*float*/;				// in seconds, calculated as fraction * stage->particleLife
	originalRandom = new idRandom;		// needed so aimed particles can reset the random for another origin calculation
	animationFrameFrac :number/*float*/;	// set by ParticleTexCoords, used to make the cross faded version

	memset0 ( ): void {
		this.renderEnt = null;
		this.renderView = null;
		this.index = 0;
		this.frac = 0.0;
		this.random.memset0 ( );
		this.origin.memset0 ( );
		this.axis.memset0 ( );
	}
}


//////
////// single particle stage
//////
////class idParticleStage {
////public:
////							idParticleStage( );
////	virtual					~idParticleStage( ) {}

////	void					Default();
////	virtual int				NumQuadsPerParticle() const;	// includes trails and cross faded animations
////	// returns the number of verts created, which will range from 0 to 4*NumQuadsPerParticle()
////	virtual int				CreateParticle( particleGen_t *g, idDrawVert *verts ) const;

////	void					ParticleOrigin( particleGen_t *g, idVec3 &origin ) const;
////	int						ParticleVerts( particleGen_t *g, const idVec3 origin, idDrawVert *verts ) const;
////	void					ParticleTexCoords( particleGen_t *g, idDrawVert *verts ) const;
////	void					ParticleColors( particleGen_t *g, idDrawVert *verts ) const;

////	const char *			GetCustomPathName();
////	const char *			GetCustomPathDesc();
////	int						NumCustomPathParms();
////	void					SetCustomPathType( const char *p );
////	void					operator=( const idParticleStage &src );


////	//------------------------------

////	const idMaterial *		material;

////	int						totalParticles;		// total number of particles, although some may be invisible at a given time
////	float					cycles;				// allows things to oneShot ( 1 cycle ) or run for a set number of cycles
////												// on a per stage basis

////	int						cycleMsec;			// ( particleLife + deadTime ) in msec

////	float					spawnBunching;		// 0.0 = all come out at first instant, 1.0 = evenly spaced over cycle time
////	float					particleLife;		// total seconds of life for each particle
////	float					timeOffset;			// time offset from system start for the first particle to spawn
////	float					deadTime;			// time after particleLife before respawning
	
////	//-------------------------------	// standard path parms
		
////	prtDistribution_t		distributionType;
////	float					distributionParms[4];
	
////	prtDirection_t			directionType;
////	float					directionParms[4];
	
////	idParticleParm			speed;
////	float					gravity;				// can be negative to float up
////	bool					worldGravity;			// apply gravity in world space
////	bool					randomDistribution;		// randomly orient the quad on emission ( defaults to true ) 
////	bool					entityColor;			// force color from render entity ( fadeColor is still valid )
	
////	//------------------------------	// custom path will completely replace the standard path calculations
	
////	prtCustomPth_t			customPathType;		// use custom C code routines for determining the origin
////	float					customPathParms[8];
	
////	//--------------------------------
	
////	idVec3					offset;				// offset from origin to spawn all particles, also applies to customPath
	
////	int						animationFrames;	// if > 1, subdivide the texture S axis into frames and crossfade
////	float					animationRate;		// frames per second

////	float					initialAngle;		// in degrees, random angle is used if zero ( default ) 
////	idParticleParm			rotationSpeed;		// half the particles will have negative rotation speeds
	
////	prtOrientation_t		orientation;	// view, aimed, or axis fixed
////	float					orientationParms[4];

////	idParticleParm			size;
////	idParticleParm			aspect;				// greater than 1 makes the T axis longer

////	idVec4					color;
////	idVec4					fadeColor;			// either 0 0 0 0 for additive, or 1 1 1 0 for blended materials
////	float					fadeInFraction;		// in 0.0 to 1.0 range
////	float					fadeOutFraction;	// in 0.0 to 1.0 range
////	float					fadeIndexFraction;	// in 0.0 to 1.0 range, causes later index smokes to be more faded 

////	bool					hidden;				// for editor use
////	//-----------------------------------

////	float					boundsExpansion;	// user tweak to fix poorly calculated bounds

////	idBounds				bounds;				// derived
////};


//////
////// group of particle stages
//////
////class idDeclParticle : public idDecl {
////public:

////	virtual size_t			Size( ) const;
////	virtual const char *	DefaultDefinition( ) const;
////	virtual bool			Parse( const char *text, const int textLength );
////	virtual void			FreeData( );

////	bool					Save( const char *fileName = NULL );

////	idList<idParticleStage *>stages;
////	idBounds				bounds;
////	float					depthHack;

////private:
////	bool					RebuildTextSource( );
////	void					GetStageBounds( idParticleStage *stage );
////	idParticleStage *		ParseParticleStage( idLexer &src );
////	void					ParseParms( idLexer &src, float *parms, int maxParms );
////	void					ParseParametric( idLexer &src, idParticleParm *parm );
////	void					WriteStage( idFile *f, idParticleStage *stage );
////	void					WriteParticleParm( idFile *f, idParticleParm *parm, const char *name );
////};

////#endif /* !__DECLPARTICLE_H__ */
