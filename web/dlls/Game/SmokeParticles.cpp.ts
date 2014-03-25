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
////#include "Game_local.h"

var smokeParticle_SnapshotName = "_SmokeParticle_Snapshot_";

class singleSmoke_t {
	next: singleSmoke_t;
	privateStartTime: number /*int*/; // start time for this particular particle
	index: number /*int*/; // particle index in system, 0 <= index < stage.totalParticles
	random = new idRandom;
	origin = new idVec3;
	axis = new idMat3;

	memset0 ( ): void {
		todo ( );
	}
}

class activeSmokeStage_t {
	stage: idParticleStage;
	smokes: singleSmoke_t[];
	memset0 ( ): void {
		todo ( );
	}
}


class idSmokeParticles {
////public:
////	idSmokeParticles(void);
////
////	// creats an entity covering the entire world that will call back each rendering
////	void						Init(void);
////	void						Shutdown(void);
////
////	// spits out a particle, returning false if the system will not emit any more particles in the future
////	bool						EmitSmoke(const idDeclParticle *smoke, const int startTime, const float diversity,
////		const idVec3 &origin, const idMat3 &axis);
////
////	// free old smokes
////	void						FreeSmokes(void);
////
////private:
	initialized: boolean;

	renderEntity = new renderEntity_t; // used to present a model to the renderer
	renderEntityHandle: number /*int*/; // handle to static renderer model

	static MAX_SMOKE_PARTICLES = 10000;
	smokes = newStructArray<singleSmoke_t>( singleSmoke_t, idSmokeParticles.MAX_SMOKE_PARTICLES );

	activeStages = new idList<activeSmokeStage_t>( activeSmokeStage_t );
	freeSmokes: singleSmoke_t;
	numActiveSmokes: number /*int*/;
	currentParticleTime: number /*int*/; // don't need to recalculate if == view time
////
////	bool						UpdateRenderEntity(renderEntity_s *renderEntity, const renderView_t *renderView);
////	static bool					ModelCallback(renderEntity_s *renderEntity, const renderView_t *renderView);
////};
////
////#endif /* !__SMOKEPARTICLES_H__ */
////
//
/*
================
idSmokeParticles::idSmokeParticles
================
*/
	constructor ( ) {
		this.initialized = false;
		this.renderEntity.memset0 ( ); //this.memset( &renderEntity, 0, sizeof( renderEntity ) );
		this.renderEntityHandle = -1;
		clearStructArray( this.smokes ); //this.memset( smokes, 0, sizeof( smokes ) );
		this.freeSmokes = null;
		this.numActiveSmokes = 0;
		this.currentParticleTime = -1;
	}

/*
================
idSmokeParticles::Init
================
*/
	Init ( ): void {
		if ( this.initialized ) {
			this.Shutdown ( );
		}

		// set up the free list
		for ( var i = 0; i < idSmokeParticles.MAX_SMOKE_PARTICLES - 1; i++ ) {
			this.smokes[i].next = this.smokes[i + 1];
		}
		this.smokes[idSmokeParticles.MAX_SMOKE_PARTICLES - 1].next = null;
		this.freeSmokes = this.smokes[0];
		this.numActiveSmokes = 0;

		this.activeStages.Clear ( );

		this.renderEntity.memset0 ( );//	memset(   this.renderEntity, 0, sizeof( this.renderEntity ) );

		this.renderEntity.bounds.Clear ( );
		this.renderEntity.axis = mat3_identity;
		this.renderEntity.shaderParms[SHADERPARM_RED] = 1;
		this.renderEntity.shaderParms[SHADERPARM_GREEN] = 1;
		this.renderEntity.shaderParms[SHADERPARM_BLUE] = 1;
		this.renderEntity.shaderParms[3] = 1;

		this.renderEntity.hModel = renderModelManager.AllocModel ( );
		this.renderEntity.hModel.InitEmpty( smokeParticle_SnapshotName );

		// we certainly don't want particle shadows
		this.renderEntity.noShadow = true/*1*/;

		// huge bounds, so it will be present in every world area
		this.renderEntity.bounds.AddPoint( new idVec3( -100000, -100000, -100000 ) );
		this.renderEntity.bounds.AddPoint( new idVec3( 100000, 100000, 100000 ) );

		this.renderEntity.callback = idSmokeParticles.ModelCallback;
		// add to renderer list
		this.renderEntityHandle = gameRenderWorld.AddEntityDef(   this.renderEntity );

		this.currentParticleTime = -1;

		this.initialized = true;
	}

/*
================
idSmokeParticles::Shutdown
================
*/
	Shutdown ( ): void {
		// make sure the render entity is freed before the model is freed
		if ( this.renderEntityHandle != -1 ) {
			gameRenderWorld.FreeEntityDef( this.renderEntityHandle );
			this.renderEntityHandle = -1;
		}
		if ( this.renderEntity.hModel != null ) {
			renderModelManager.FreeModel( this.renderEntity.hModel );
			this.renderEntity.hModel = null;
		}
		this.initialized = false;
	}

/////*
////================
////idSmokeParticles::FreeSmokes
////================
////*/
////void idSmokeParticles::FreeSmokes( ) {
////	for ( int activeStageNum = 0; activeStageNum < this.activeStages.Num(); activeStageNum++ ) {
////		singleSmoke_t *smoke, *next, *last;
////
////		activeSmokeStage_t *active = &this.activeStages[activeStageNum];
////		const idParticleStage *stage = active.stage;
////
////		for ( last = NULL, smoke = active.smokes; smoke; smoke = next ) {
////			next = smoke.next;
////
////			float frac = (float)( gameLocal.time - smoke.privateStartTime ) / ( stage.particleLife * 1000 );
////			if ( frac >= 1.0f ) {
////				// remove the particle from the stage list
////				if ( last != NULL ) {
////					last.next = smoke.next;
////				} else {
////					active.smokes = smoke.next;
////				}
////				// put the particle on the free list
////				smoke.next = this.freeSmokes;
////				this.freeSmokes = smoke;
////				this.numActiveSmokes--;
////				continue;
////			}
////
////			last = smoke;
////		}
////
////		if ( !active.smokes ) {
////			// remove this from the activeStages list
////			this.activeStages.RemoveIndex( activeStageNum );
////			activeStageNum--;
////		}
////	}
////}
////
/////*
////================
////idSmokeParticles::EmitSmoke
////
////Called by game code to drop another particle into the list
////================
////*/
////bool idSmokeParticles::EmitSmoke( const idDeclParticle *smoke, const int systemStartTime, const float diversity, const idVec3 &origin, const idMat3 &axis ) {
////	bool	continues = false;
////
////	if ( !smoke ) {
////		return false;
////	}
////
////	if ( !gameLocal.isNewFrame ) {
////		return false;
////	}
////
////	// dedicated doesn't smoke. No UpdateRenderEntity, so they would not be freed
////	if ( gameLocal.localClientNum < 0 ) {
////		return false;
////	}
////
////	assert( gameLocal.time == 0 || systemStartTime <= gameLocal.time );
////	if ( systemStartTime > gameLocal.time ) {
////		return false;
////	}
////
////	idRandom steppingRandom( 0xffff * diversity );
////
////	// for each stage in the smoke that is still emitting particles, emit a new singleSmoke_t
////	for ( int stageNum = 0; stageNum < smoke.stages.Num(); stageNum++ ) {
////		const idParticleStage *stage = smoke.stages[stageNum];
////
////		if ( !stage.cycleMsec ) {
////			continue;
////		}
////
////		if ( !stage.material ) {
////			continue;
////		}
////
////		if ( stage.particleLife <= 0 ) {
////			continue;
////		}
////
////		// see how many particles we should emit this tic
////		// FIXME: 			smoke.privateStartTime += stage.timeOffset;
////		int		finalParticleTime = stage.cycleMsec * stage.spawnBunching;
////		int		deltaMsec = gameLocal.time - systemStartTime;
////
////		int		nowCount = 0, prevCount;
////		if ( finalParticleTime == 0 ) {
////			// if spawnBunching is 0, they will all come out at once
////			if ( gameLocal.time == systemStartTime ) {
////				prevCount = -1;
////				nowCount = stage.totalParticles-1;
////			} else {
////				prevCount = stage.totalParticles;
////			}
////		} else {
////			nowCount = floor( ( (float)deltaMsec / finalParticleTime ) * stage.totalParticles );
////			if ( nowCount >= stage.totalParticles ) {
////				nowCount = stage.totalParticles-1;
////			}
////			prevCount = floor( ((float)( deltaMsec - USERCMD_MSEC ) / finalParticleTime) * stage.totalParticles );
////			if ( prevCount < -1 ) {
////				prevCount = -1;
////			}
////		}
////
////		if ( prevCount >= stage.totalParticles ) {
////			// no more particles from this stage
////			continue;
////		}
////
////		if ( nowCount < stage.totalParticles-1 ) {
////			// the system will need to emit particles next frame as well
////			continues = true;
////		}
////
////		// find an activeSmokeStage that matches this
////		activeSmokeStage_t	*active = NULL;
////		int i;
////		for ( i = 0 ; i < this.activeStages.Num() ; i++ ) {
////			active = &this.activeStages[i];
////			if ( active.stage == stage ) {
////				break;
////			}
////		}
////		if ( i == this.activeStages.Num() ) {
////			// add a new one
////			activeSmokeStage_t	newActive;
////
////			newActive.smokes = NULL;
////			newActive.stage = stage;
////			i = this.activeStages.Append( newActive );
////			active = &this.activeStages[i];
////		}
////
////		// add all the required particles
////		for ( prevCount++ ; prevCount <= nowCount ; prevCount++ ) {
////			if ( !this.freeSmokes ) {
////				gameLocal.Printf( "idSmokeParticles::EmitSmoke: no free smokes with %d active stages\n", this.activeStages.Num() );
////				return true;
////			}
////			singleSmoke_t	*newSmoke = this.freeSmokes;
////			this.freeSmokes = this.freeSmokes.next;
////			this.numActiveSmokes++;
////
////			newSmoke.index = prevCount;
////			newSmoke.axis = axis;
////			newSmoke.origin = origin;
////			newSmoke.random = steppingRandom;
////			newSmoke.privateStartTime = systemStartTime + prevCount * finalParticleTime / stage.totalParticles;
////			newSmoke.next = active.smokes;
////			active.smokes = newSmoke;
////
////			steppingRandom.RandomInt();	// advance the random
////		}
////	}
////
////	return continues;
////}

/*
================
idSmokeParticles::UpdateRenderEntity
================
*/
	UpdateRenderEntity ( renderEntity: renderEntity_t, renderView: renderView_t ): boolean {
		todoThrow ( );
////	// FIXME: re-use model surfaces
////	renderEntity.hModel.InitEmpty( smokeParticle_SnapshotName );
////
////	// this may be triggered by a model trace or other non-view related source,
////	// to which we should look like an empty model
////	if ( !renderView ) {
////		return false;
////	}
////
////	// don't regenerate it if it is current
////	if ( renderView.time == this.currentParticleTime && !renderView.forceUpdate ) {
////		return false;
////	}
////	this.currentParticleTime = renderView.time;
////
////	particleGen_t g;
////
////	g.renderEnt = renderEntity;
////	g.renderView = renderView;
////
////	for ( int activeStageNum = 0; activeStageNum < this.activeStages.Num(); activeStageNum++ ) {
////		singleSmoke_t *smoke, *next, *last;
////
////		activeSmokeStage_t *active = &this.activeStages[activeStageNum];
////		const idParticleStage *stage = active.stage;
////
////		if ( !stage.material ) {
////			continue;
////		}
////
////		// allocate a srfTriangles that can hold all the particles
////		int count = 0;
////		for ( smoke = active.smokes; smoke; smoke = smoke.next ) {
////			count++;
////		}
////		int	quads = count * stage.NumQuadsPerParticle();
////		srfTriangles_t *tri = renderEntity.hModel.AllocSurfaceTriangles( quads * 4, quads * 6 );
////		tri.numIndexes = quads * 6;
////		tri.numVerts = quads * 4;
////
////		// just always draw the particles
////		tri.bounds[0][0] =
////		tri.bounds[0][1] =
////		tri.bounds[0][2] = -99999;
////		tri.bounds[1][0] =
////		tri.bounds[1][1] =
////		tri.bounds[1][2] = 99999;
////
////		tri.numVerts = 0;
////		for ( last = NULL, smoke = active.smokes; smoke; smoke = next ) {
////			next = smoke.next;
////
////			g.frac = (float)( gameLocal.time - smoke.privateStartTime ) / ( stage.particleLife * 1000 );
////			if ( g.frac >= 1.0f ) {
////				// remove the particle from the stage list
////				if ( last != NULL ) {
////					last.next = smoke.next;
////				} else {
////					active.smokes = smoke.next;
////				}
////				// put the particle on the free list
////				smoke.next = this.freeSmokes;
////				this.freeSmokes = smoke;
////				this.numActiveSmokes--;
////				continue;
////			}
////
////			g.index = smoke.index;
////			g.random = smoke.random;
////
////			g.origin = smoke.origin;
////			g.axis = smoke.axis;
////
////			g.originalRandom = g.random;
////			g.age = g.frac * stage.particleLife;
////
////			tri.numVerts += stage.CreateParticle( &g, tri.verts + tri.numVerts );
////
////			last = smoke;
////		}
////		if ( tri.numVerts > quads * 4 ) {
////			gameLocal.Error( "idSmokeParticles::UpdateRenderEntity: miscounted verts" );
////		}
////
////		if ( tri.numVerts == 0 ) {
////
////			// they were all removed
////			renderEntity.hModel.FreeSurfaceTriangles( tri );
////
////			if ( !active.smokes ) {
////				// remove this from the activeStages list
////				this.activeStages.RemoveIndex( activeStageNum );
////				activeStageNum--;
////			}
////		} else {
////			// build the index list
////			int	indexes = 0;
////			for ( int i = 0 ; i < tri.numVerts ; i += 4 ) {
////				tri.indexes[indexes+0] = i;
////				tri.indexes[indexes+1] = i+2;
////				tri.indexes[indexes+2] = i+3;
////				tri.indexes[indexes+3] = i;
////				tri.indexes[indexes+4] = i+3;
////				tri.indexes[indexes+5] = i+1;
////				indexes += 6;
////			}
////			tri.numIndexes = indexes;
////
////			modelSurface_t	surf;
////			surf.geometry = tri;
////			surf.shader = stage.material;
////			surf.id = 0;
////
////			renderEntity.hModel.AddSurface( surf );
////		}
////	}
		return true;
	}

/*
================
idSmokeParticles::ModelCallback
================
*/
	static ModelCallback ( renderEntity: renderEntity_t, renderView: renderView_t ): boolean {
		// update the particles
		if ( gameLocal.smokeParticles ) {
			return gameLocal.smokeParticles.UpdateRenderEntity( renderEntity, renderView );
		}

		return true;
	}
}