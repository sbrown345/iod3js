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
////
var MAX_BOUNDS_AREAS = 16


class pvsPassage_t {
	canSee /*byte *	*/: Uint8Array; // bit set for all portals that can be seen through this passage
}


class pvsPortal_t {
	areaNum:number/*int*/;	// area this portal leads to
	w:idWinding;			// winding goes counter clockwise seen from the area this portal is part of
	bounds = new idBounds;		// winding bounds
	plane = new idPlane;		// winding plane, normal points towards the area this portal leads to
	passages:pvsPassage_t[];	// passages to portals in the area this portal leads to
	done:boolean;		// true if pvs is calculated for this portal
	vis:Uint8Array /*byte * */;		// PVS for this portal
	mightSee:Uint8Array/*byte **/;	// used during construction
};


class pvsArea_t {
	numPortals: number /*int*/; // number of portals in this area
	bounds = new idBounds; // bounds of the whole area
	portals: pvsPortal_t[] /*pvsPortal_t ***/; // array with pointers to the portals of this area

	memset0 ( ): void {
		this.numPortals = 0;
		this.bounds.memset0 ( );
		this.portals = null;
	}
}


class pvsStack_t {
	next: pvsStack_t; // next stack entry
	mightSee: Uint8Array /*byte **/; // bit set for all portals that might be visible through this passage/portal stack
}


/*
===================================================================================

PVS

Note: mirrors and other special view portals are not taken into account

===================================================================================
*/


class pvsHandle_t {
	i: number; // index to current pvs			int					
	//h: number;			// handle for current pvs       unsigned int	
		
	private _h = new Uint32Array( 1 );
	get h ( ): number { return this._h[0]; }

	set h ( value: number ) {
		if ( value === undefined ) {
			throw 'Undefined value';
		}
		this._h[0] = value;
	}
}


class pvsCurrent_t {
	handle = new pvsHandle_t;		// current pvs handle
	pvs:Uint8Array;		// current pvs bit string
} ;

var MAX_CURRENT_PVS = 8;		// must be a power of 2

enum pvsType_t{
	PVS_NORMAL = 0,	// PVS through portals taking portal states into account
	PVS_ALL_PORTALS_OPEN = 1,	// PVS through portals assuming all portals are open
	PVS_CONNECTED_AREAS = 2		// PVS considering all topologically connected areas visible
};


class idPVS {
////public:
////	idPVS(void);
////	~idPVS(void);
////	// setup for the current map
////	void				Init(void);
////	void				Shutdown(void);
////	// get the area(s) the source is in
////	int					GetPVSArea(const idVec3 &point) const;		// returns the area number
////	int					GetPVSAreas(const idBounds &bounds, int *areas, int maxAreas) const;	// returns number of areas
////	// setup current PVS for the source
////	pvsHandle_t			SetupCurrentPVS(const idVec3 &source, const pvsType_t type = PVS_NORMAL) const;
////	pvsHandle_t			SetupCurrentPVS(const idBounds &source, const pvsType_t type = PVS_NORMAL) const;
////	pvsHandle_t			SetupCurrentPVS(const int sourceArea, const pvsType_t type = PVS_NORMAL) const;
////	pvsHandle_t			SetupCurrentPVS(const int *sourceAreas, const int numSourceAreas, const pvsType_t type = PVS_NORMAL) const;
////	pvsHandle_t			MergeCurrentPVS(pvsHandle_t pvs1, pvsHandle_t pvs2) const;
////	void				FreeCurrentPVS(pvsHandle_t handle) const;
////	// returns true if the target is within the current PVS
////	bool				InCurrentPVS(const pvsHandle_t handle, const idVec3 &target) const;
////	bool				InCurrentPVS(const pvsHandle_t handle, const idBounds &target) const;
////	bool				InCurrentPVS(const pvsHandle_t handle, const int targetArea) const;
////	bool				InCurrentPVS(const pvsHandle_t handle, const int *targetAreas, int numTargetAreas) const;
////	// draw all portals that are within the PVS of the source
////	void				DrawPVS(const idVec3 &source, const pvsType_t type = PVS_NORMAL) const;
////	void				DrawPVS(const idBounds &source, const pvsType_t type = PVS_NORMAL) const;
////	// visualize the PVS the handle points to
////	void				DrawCurrentPVS(const pvsHandle_t handle, const idVec3 &source) const;
////
////#if ASYNC_WRITE_PVS
////	void				WritePVS(const pvsHandle_t handle, idBitMsg &msg);
////	void				ReadPVS(const pvsHandle_t handle, const idBitMsg &msg);
////#endif
////
////private:
	numAreas: number; ////	int					
	numPortals: number; ////	int					
	connectedAreas: boolean[]; ////	bool *				
	areaQueue: Int32Array; ////	int *				
	areaPVS: Uint8Array; ////	byte *				
	// current PVS for a specific source possibly taking portal states (open/closed) into account
	currentPVS = newStructArray<pvsCurrent_t>( pvsCurrent_t, MAX_CURRENT_PVS );
	// used to create PVS
	portalVisBytes: number; ////	int					
	portalVisLongs: number; ////	int					
	portalVisInts: number; ////	int					
	areaVisBytes: number; ////	int					
	areaVisLongs: number; ////	int					
	pvsPortals: pvsPortal_t[]; ////	struct pvsPortal_s *
	pvsAreas: pvsArea_t[]; ////	struct pvsArea_s *	
////
////private:
////	int					GetPortalCount(void) const;
////	void				CreatePVSData(void);
////	void				DestroyPVSData(void);
////	void				CopyPortalPVSToMightSee(void) const;
////	void				FloodFrontPortalPVS_r(struct pvsPortal_s *portal, int areaNum) const;
////	void				FrontPortalPVS(void) const;
////	struct pvsStack_s *	FloodPassagePVS_r(struct pvsPortal_s *source, const struct pvsPortal_s *portal, struct pvsStack_s *prevStack) const;
////	void				PassagePVS(void) const;
////	void				AddPassageBoundaries(const idWinding &source, const idWinding &pass, bool flipClip, idPlane *bounds, int &numBounds, int maxBounds) const;
////	void				CreatePassages(void) const;
////	void				DestroyPassages(void) const;
////	int					AreaPVSFromPortalPVS(void) const;
////	void				GetConnectedAreas(int srcArea, bool *connectedAreas) const;
////	pvsHandle_t			AllocCurrentPVS(unsigned int h) const;
////};
////
////#endif /* !__GAME_PVS_H__ */

/*
================
idPVS::idPVS
================
*/
	constructor ( ) {
		var /*int */i: number;

		this.numAreas = 0;
		this.numPortals = 0;

		this.connectedAreas = null;
		this.areaQueue = null;
		this.areaPVS = null;

		for ( i = 0; i < MAX_CURRENT_PVS; i++ ) {
			this.currentPVS[i].handle.i = -1;
			this.currentPVS[i].handle.h = 0;
			this.currentPVS[i].pvs = null;
		}

		this.pvsAreas = null;
		this.pvsPortals = null;
	}

/*
================
idPVS::~idPVS
================
*/
	destructor ( ): void {
		this.Shutdown ( );
	}

/*
================
idPVS::GetPortalCount
================
*/
	GetPortalCount ( ): number /*int*/ {
		var /*int */i: number, na: number, np: number;

		na = gameRenderWorld.NumAreas ( );
		np = 0;
		for ( i = 0; i < na; i++ ) {
			np += gameRenderWorld.NumPortalsInArea( i );
		}
		return np;
	}

/*
================
idPVS::CreatePVSData
================
*/
	CreatePVSData ( ): void {
		var /*int */i: number, j: number, n: number, cp: number;
		var portal = new exitPortal_t;
		var area: pvsArea_t;
		var p: pvsPortal_t, portalPtrs: pvsPortal_t [];

		if ( !this.numPortals ) {
			return;
		}

		this.pvsPortals = newStructArray<pvsPortal_t>( pvsPortal_t, this.numPortals );
		this.pvsAreas = newStructArray<pvsArea_t>( pvsArea_t, this.numAreas );
		clearStructArray( this.pvsAreas ); //memset( this.pvsAreas, 0, this.numAreas * sizeof( *this.pvsAreas ) );


		cp = 0;
		portalPtrs = newStructArray<pvsPortal_t>( pvsPortal_t, this.numPortals ); //new pvsPortal_t*[this.numPortals];

		//debugger; // todo: is this slice right:?
		for ( i = 0; i < this.numAreas; i++ ) {

			area = this.pvsAreas[i];
			area.bounds.Clear ( );
			area.portals = portalPtrs.slice( cp ); //portalPtrs + cp;

			n = gameRenderWorld.NumPortalsInArea( i );

			for ( j = 0; j < n; j++ ) {

				portal = gameRenderWorld.GetPortal( i, j );

				p = this.pvsPortals[cp++];
				// the winding goes counter clockwise seen from this area
				p.w = portal.w.Copy ( );
				p.areaNum = portal.areas[1]; // area[1] is always the area the portal leads to

				p.vis = new Uint8Array( this.portalVisBytes );
				memset( p.vis, 0, this.portalVisBytes );
				p.mightSee = new Uint8Array( this.portalVisBytes );
				memset( p.mightSee, 0, this.portalVisBytes );
				p.w.GetBounds( p.bounds );
				p.w.GetPlane( p.plane );
				// plane normal points to outside the area
				p.plane.opEquals( p.plane.opUnaryMinus ( ) );
				// no PVS calculated for this portal yet
				p.done = false;

				if ( DEBUG_MAP_FILE ) {
					dlog( DEBUG_MAP_FILE, "CreatePVSData %i %s %s\n", i, p.bounds[0].ToString ( ), p.bounds[1].ToString ( ) );
					dlog( DEBUG_MAP_FILE, "portalVisBytes: %i numPortals:\n", i, this.portalVisBytes, area.numPortals );
				}

				area.portals[area.numPortals] = p;
				area.numPortals++;

				area.bounds.opAdditionAssignment( p.bounds );
			}
		}
	}

/*
================
idPVS::DestroyPVSData
================
*/
	DestroyPVSData ( ): void {
		var /*int */i: number;

		if ( !this.pvsAreas ) {
			return;
		}
		
		// delete portal pointer array
		$deleteArray( this.pvsAreas[0].portals );

		// delete all areas
		$deleteArray(this.pvsAreas);
		this.pvsAreas = null;

		// delete portal data
		for ( i = 0; i < this.numPortals; i++ ) {
			delete this.pvsPortals[i].vis;
			delete this.pvsPortals[i].mightSee;
			delete this.pvsPortals[i].w;
		}

		// delete portals
		$deleteArray( this.pvsPortals );
		this.pvsPortals = null;
	}

/*
================
idPVS::FloodFrontPortalPVS_r
================
*/
	FloodFrontPortalPVS_r ( portal: pvsPortal_t, /*int */areaNum: number ): void {
		dlog(DEBUG_MAP_FILE, "FloodFrontPortalPVS_r areaNum: %i\n", areaNum);
		var /*int */i: number, n: number;
		var area: pvsArea_t;
		var p: pvsPortal_t;

		area = this.pvsAreas[areaNum];

		for ( i = 0; i < area.numPortals; i++ ) {
			p = area.portals[i];
			n = this.pvsPortals.indexOf( p );
			// don't flood through if this portal is not at the front
			if ( !( portal.mightSee[n >> 3] & ( 1 << ( n & 7 ) ) ) ) {
				continue;
			}
			// don't flood through if already visited this portal
			if ( portal.vis[n >> 3] & ( 1 << ( n & 7 ) ) ) {
				continue;
			}
			// this portal might be visible
			portal.vis[n >> 3] |= ( 1 << ( n & 7 ) );
			// flood through the portal
			this.FloodFrontPortalPVS_r( portal, p.areaNum );
		}
	}

/*
================
idPVS::FrontPortalPVS
================
*/
	FrontPortalPVS ( ): void {
		var /*int */i: number, j: number, k: number, n: number, p: number, side1: number, side2: number, areaSide: number;
		var p1: pvsPortal_t, p2: pvsPortal_t;
		var area: pvsArea_t;

		dlog( DEBUG_MAP_FILE, "FrontPortalPVS\n" );
		for ( i = 0; i < this.numPortals; i++ ) {
			p1 = this.pvsPortals[i];

			for ( j = 0; j < this.numAreas; j++ ) {

				area = this.pvsAreas[j];

				areaSide = side1 = area.bounds.PlaneSide( p1.plane );

				// if the whole area is at the back side of the portal
				if ( areaSide == PLANESIDE_BACK ) {
					continue;
				}
				dlog(DEBUG_MAP_FILE, "as %i\n", areaSide);

				for ( p = 0; p < area.numPortals; p++ ) {

					p2 = area.portals[p];
					if ( DEBUG_MAP_FILE ) {
						dlog( DEBUG_MAP_FILE, "p2 plane %s\n", p2.plane.ToString ( ) );
						dlog( DEBUG_MAP_FILE, "p2 bounds %s %s\n", p2.bounds[0].ToString ( ), p2.bounds[0].ToString ( ) );
					}

					// if we the whole area is not at the front we need to check
					if ( areaSide != PLANESIDE_FRONT ) {
						// if the second portal is completely at the back side of the first portal
						side1 = p2.bounds.PlaneSide( p1.plane );
						if ( side1 == PLANESIDE_BACK ) {
							dlog(DEBUG_MAP_FILE, "side1 == PLANESIDE_BACK\n");
							continue;
						}
					}

					// if the first portal is completely at the front of the second portal
					side2 = p1.bounds.PlaneSide( p2.plane );
					if ( side2 == PLANESIDE_FRONT ) {
						dlog(DEBUG_MAP_FILE, "side2 == PLANESIDE_FRONT\n");
						continue;
					}

					// if the second portal is not completely at the front of the first portal
					if ( side1 != PLANESIDE_FRONT ) {
						// more accurate check
						for ( k = 0; k < p2.w.GetNumPoints ( ); k++ ) {
							// if more than an epsilon at the front side
							if ( p1.plane.Side( ( p2.w )[k].ToVec3 ( ), ON_EPSILON ) == PLANESIDE_FRONT ) {
								break;
							}
						}
						if ( k >= p2.w.GetNumPoints ( ) ) {
							dlog(DEBUG_MAP_FILE, "2nd at back of 1st\n");
							continue; // second portal is at the back of the first portal
						}
					}

					// if the first portal is not completely at the back side of the second portal
					if ( side2 != PLANESIDE_BACK ) {
						// more accurate check
						for ( k = 0; k < p1.w.GetNumPoints ( ); k++ ) {
							// if more than an epsilon at the back side
							if ( p2.plane.Side( ( p1.w )[k].ToVec3 ( ), ON_EPSILON ) == PLANESIDE_BACK ) {
								break;
							}
						}
						if ( k >= p1.w.GetNumPoints ( ) ) {
							dlog(DEBUG_MAP_FILE, "1st at back of 2nd\n");
							continue; // first portal is at the front of the second portal
						}
					}

					// the portal might be visible at the front
					n = this.pvsPortals.indexOf( p2 );
					p1.mightSee[n >> 3] |= 1 << ( n & 7 );
					dlog(DEBUG_MAP_FILE, "n: %i\n", n);
				}
			}
		}

		// flood the front portal pvs for all portals
		for ( i = 0; i < this.numPortals; i++ ) {
			p1 = this.pvsPortals[i];
			this.FloodFrontPortalPVS_r( p1, p1.areaNum );
		}
	}

	/*
	===============
	idPVS::FloodPassagePVS_r
	===============
	*/
	FloodPassagePVS_r ( source: pvsPortal_t, portal: pvsPortal_t, prevStack: pvsStack_t ): pvsStack_t {
		dlog(DEBUG_MAP_FILE, "FloodPassagePVS_r %i\n", portal.areaNum);
		var /*int */i: number, j: number, n: number, m: number;
		var p: pvsPortal_t;
		var area: pvsArea_t;
		var stack: pvsStack_t;
		var passage: pvsPassage_t;
		var sourceVis: Int32Array, passageVis: Int32Array, portalVis: Int32Array, mightSee: Int32Array, prevMightSee: Int32Array, more: number; //long
		var sourceVisIdx: number, passageVisIdx: number, portalVisIdx: number, mightSeeIdx: number, prevMightSeeIdx: number;

		area = this.pvsAreas[portal.areaNum];

		stack = prevStack.next;
		// if no next stack entry allocated
		if ( !stack ) {
			stack = new pvsStack_t; //stack = reinterpret_cast<pvsStack_t*>(new byte[sizeof(pvsStack_t) + portalVisBytes]);
			stack.mightSee = new Uint8Array( this.portalVisBytes ); //stack->mightSee = (reinterpret_cast<byte *>(stack)) + sizeof(pvsStack_t);
			stack.next = null;
			prevStack.next = stack;
		}

		// check all portals for flooding into other areas
		for ( i = 0; i < area.numPortals; i++ ) {

			passage = portal.passages[i];

			// if this passage is completely empty
			if ( !passage.canSee ) {
				dlog(DEBUG_MAP_FILE, " !passage.canSee %i\n", i);
				continue;
			}

			p = area.portals[i];
			n = this.pvsPortals.indexOf( p ); //n = p - this.pvsPortals;

			// if this portal cannot be seen through our current portal/passage stack
			if ( !( prevStack.mightSee[n >> 3] & ( 1 << ( n & 7 ) ) ) ) {
				dlog(DEBUG_MAP_FILE, " if this portal cannot be seen through our current portal/passage stack %i\n", i);
				continue;
			}

			// mark the portal as visible
			source.vis[n >> 3] |= ( 1 << ( n & 7 ) );

			// get pointers to vis data
			prevMightSee = new Int32Array( prevStack.mightSee.buffer ), prevMightSeeIdx = 0; //reinterpret_cast<long *>(prevStack.mightSee);
			passageVis = new Int32Array( passage.canSee.buffer ), passageVisIdx = 0; //reinterpret_cast<long *>(passage.canSee);
			sourceVis = new Int32Array( source.vis.buffer ), sourceVisIdx = 0; // reinterpret_cast<long *>(source.vis);
			mightSee = new Int32Array( stack.mightSee.buffer ), mightSeeIdx = 0; // reinterpret_cast<long *>(stack.mightSee);

			more = 0;
			// use the portal PVS if it has been calculated
			if ( p.done ) {
				portalVis = new Int32Array( p.vis.buffer ), portalVisIdx = 0; //reinterpret_cast<long *>(p.vis);
				for ( j = 0; j < this.portalVisInts /*portalVisLongs*/; j++ ) {
					// get new PVS which is decreased by going through this passage
					m = prevMightSee[prevMightSeeIdx++] & passageVis[passageVisIdx++] & portalVis[portalVisIdx++];
					// check if anything might be visible through this passage that wasn't yet visible
					more |= ( m & ~( sourceVis[sourceVisIdx++] ) );
					// store new PVS
					mightSee[mightSeeIdx++] = m;
				}
			} else {
				// the p.mightSee is implicitely stored in the passageVis
				for ( j = 0; j < this.portalVisInts /*portalVisLongs*/; j++ ) {
					// get new PVS which is decreased by going through this passage
					m = prevMightSee[prevMightSeeIdx++] & passageVis[passageVisIdx++];
					// check if anything might be visible through this passage that wasn't yet visible
					more |= ( m & ~( sourceVis[sourceVisIdx++] ) );
					// store new PVS
					mightSee[mightSeeIdx++] = m;
				}
			}

			// if nothing more can be seen
			if ( !more ) {
				continue;
			}

			// go through the portal
			stack.next = this.FloodPassagePVS_r( source, p, stack );
		}

		return stack;
	}

/*
===============
idPVS::PassagePVS
===============
*/
PassagePVS( ) :void {
	var/*int */i:number;
	var source: pvsPortal_t ;
	var stack: pvsStack_t, s: pvsStack_t ;
	
	// create the passages
	this.CreatePassages();

	// allocate first stack entry
	stack = new pvsStack_t; // reinterpret_cast<pvsStack_t*>(new byte[sizeof(pvsStack_t) + portalVisBytes]);
	stack.mightSee = new Uint8Array( this.portalVisBytes ); // (reinterpret_cast<byte *>(stack)) + sizeof(pvsStack_t);
	stack.next = null;

	// calculate portal PVS by flooding through the passages
	for ( i = 0; i < this.numPortals; i++ ) {
		source = this.pvsPortals[i];
		memset( source.vis, 0, this.portalVisBytes );
		memcpy( stack.mightSee, source.mightSee, this.portalVisBytes );
		this.FloodPassagePVS_r( source, source, stack );
		source.done = true;
	}

	// free the allocated stack
	for ( s = stack; s; s = stack ) {
		stack = stack.next;
		$delete( s );
		//delete[] s;
	}

	// destroy the passages
	this.DestroyPassages();
}

/*
===============
idPVS::AddPassageBoundaries
===============
*/
	AddPassageBoundaries ( source: idWinding, pass: idWinding, flipClip: boolean, bounds: idPlane[], /*int */numBounds: R<number>, /*int */maxBounds: number ): void {
		var /*int			*/i: number, j: number, k: number, l: number;
		var v1 = new idVec3, v2 = new idVec3, normal = new idVec3;
		var /*float*/ d: number, dist: number;
		var flipTest: boolean, front: boolean;
		var plane = new idPlane;

		dlog(DEBUG_MAP_FILE, "AddPassageBoundaries flipClip %i maxBounds %i:\n", flipClip ? 1 : 0, maxBounds);

		// check all combinations	
		for ( i = 0; i < source.GetNumPoints ( ); i++ ) {

			l = ( i + 1 ) % source.GetNumPoints ( );
			v1.equals( source[l].ToVec3 ( ).opSubtraction( source[i].ToVec3 ( ) ) );

			// find a vertex of pass that makes a plane that puts all of the
			// vertices of pass on the front side and all of the vertices of
			// source on the back side
			for ( j = 0; j < pass.GetNumPoints ( ); j++ ) {

				v2.equals( pass[j].ToVec3 ( ).opSubtraction( source[i].ToVec3 ( ) ) );

				normal.equals( v1.Cross( v2 ) );
				if ( normal.Normalize ( ) < 0.01 ) {
					continue;
				}
				dist = normal.timesVec( pass[j].ToVec3 ( ) );

				//
				// find out which side of the generated seperating plane has the
				// source portal
				//
				flipTest = false;
				for ( k = 0; k < source.GetNumPoints ( ); k++ ) {
					if ( k == i || k == l ) {
						continue;
					}
					d = source[k].ToVec3 ( ).timesVec( normal ) - dist;
					dlog(DEBUG_MAP_FILE, "d: %.2f\n", d);
					if ( d < -ON_EPSILON ) {
						// source is on the negative side, so we want all
						// pass and target on the positive side
						flipTest = false;
						break;
					} else if ( d > ON_EPSILON ) {
						// source is on the positive side, so we want all
						// pass and target on the negative side
						flipTest = true;
						break;
					}
				}
				if ( k == source.GetNumPoints ( ) ) {
					continue; // planar with source portal
				}

				// flip the normal if the source portal is backwards
				if ( flipTest ) {
					normal.equals( normal.opUnaryMinus ( ) );
					dist = -dist;
				}

				// if all of the pass portal points are now on the positive side,
				// this is the seperating plane
				front = false;
				for ( k = 0; k < pass.GetNumPoints ( ); k++ ) {
					if ( k == j ) {
						continue;
					}
					d = pass[k].ToVec3 ( ).timesVec( normal ) - dist;
					if ( d < -ON_EPSILON ) {
						break;
					} else if ( d > ON_EPSILON ) {
						front = true;
					}
				}
				if ( k < pass.GetNumPoints ( ) ) {
					continue; // points on negative side, not a seperating plane
				}
				if ( !front ) {
					continue; // planar with seperating plane
				}

				// flip the normal if we want the back side
				if ( flipClip ) {
					plane.SetNormal( normal.opUnaryMinus ( ) );
					plane.SetDist( -dist );
				} else {
					plane.SetNormal( normal );
					plane.SetDist( dist );
				}

				// check if the plane is already a passage boundary
				for ( k = 0; k < numBounds.$; k++ ) {
					if ( plane.Compare( bounds[k], 0.001, 0.01 ) ) {
						break;
					}
				}
				if ( k < numBounds.$ ) {
					break;
				}

				if ( numBounds.$ >= maxBounds ) {
					gameLocal.Warning( "max passage boundaries." );
					break;
				}
				bounds[numBounds.$].opEquals( plane );
				numBounds.$++;
				break;
			}
		}
		dlog( DEBUG_MAP_FILE, "numBounds: %i\n", numBounds.$ );
	}

/*
================
idPVS::CreatePassages
================
*/
	static MAX_PASSAGE_BOUNDS = 128;

	CreatePassages ( ): void {
		var /*int */i: number, j: number, l: number, n: number, numBounds = new R<number> ( ), front: number, passageMemory: number, byteNum: number, bitNum: number;
		var sides = new Int32Array( idPVS.MAX_PASSAGE_BOUNDS );
		var passageBounds = newStructArray<idPlane>( idPlane, idPVS.MAX_PASSAGE_BOUNDS );
		var source: pvsPortal_t, target: pvsPortal_t, p: pvsPortal_t;
		var area: pvsArea_t;
		var passage: pvsPassage_t;
		var winding = new idFixedWinding;
		var /*byte */canSee: number, mightSee: number, bit: number;

		dlog(DEBUG_MAP_FILE, "CreatePassages\n");
		passageMemory = 0;
		for ( i = 0; i < this.numPortals; i++ ) {
			source = this.pvsPortals[i];
			area = this.pvsAreas[source.areaNum];

			source.passages = newStructArray<pvsPassage_t>( pvsPassage_t, area.numPortals );

			for ( j = 0; j < area.numPortals; j++ ) {
				target = area.portals[j];
				n = this.pvsPortals.indexOf( target ); //n = target - this.pvsPortals;

				passage = source.passages[j];

				// if the source portal cannot see this portal
				if ( !( source.mightSee[n >> 3] & ( 1 << ( n & 7 ) ) ) ) {
					// not all portals in the area have to be visible because areas are not necesarily convex
					// also no passage has to be created for the portal which is the opposite of the source
					passage.canSee = null;
					continue;
				}

				passage.canSee = new Uint8Array( this.portalVisBytes );
				passageMemory += this.portalVisBytes;

				// boundary plane normals point inwards
				numBounds.$ = 0;
				this.AddPassageBoundaries( ( source.w ), ( target.w ), false, passageBounds, numBounds, idPVS.MAX_PASSAGE_BOUNDS );
				this.AddPassageBoundaries( ( target.w ), ( source.w ), true, passageBounds, numBounds, idPVS.MAX_PASSAGE_BOUNDS );

				// get all portals visible through this passage
				for ( byteNum = 0; byteNum < this.portalVisBytes; byteNum++ ) {

					canSee = 0;
					mightSee = source.mightSee[byteNum] & target.mightSee[byteNum];

					// go through eight portals at a time to speed things up
					for ( bitNum = 0; bitNum < 8; bitNum++ ) {

						bit = 1 << bitNum;

						if ( !( mightSee & bit ) ) {
							continue;
						}

						p = this.pvsPortals[( byteNum << 3 ) + bitNum];

						if ( p.areaNum == source.areaNum ) {
							continue;
						}

						for ( front = 0, l = 0; l < numBounds.$; l++ ) {
							sides[l] = p.bounds.PlaneSide( passageBounds[l] );
							// if completely at the back of the passage bounding plane
							if ( sides[l] == PLANESIDE_BACK ) {
								break;
							}
							// if completely at the front
							if ( sides[l] == PLANESIDE_FRONT ) {
								front++;
							}
						}
						// if completely outside the passage
						if ( l < numBounds.$ ) {
							continue;
						}

						// if not at the front of all bounding planes and thus not completely inside the passage
						if ( front != numBounds.$ ) {

							winding.opEquals( p.w );

							for ( l = 0; l < numBounds.$; l++ ) {
								// only clip if the winding possibly crosses this plane
								if ( sides[l] != PLANESIDE_CROSS ) {
									continue;
								}
								// clip away the part at the back of the bounding plane
								winding.ClipInPlace( passageBounds[l] );
								// if completely clipped away
								if ( !winding.GetNumPoints ( ) ) {
									break;
								}
							}
							// if completely outside the passage
							if ( l < numBounds.$ ) {
								continue;
							}
						}

						canSee |= bit;
					}

					// store results of all eight portals
					passage.canSee[byteNum] = canSee;
					dlog(DEBUG_MAP_FILE, "byteNum: %i\n", canSee);
				}

				// can always see the target portal
				passage.canSee[n >> 3] |= ( 1 << ( n & 7 ) );
			}
		}
		if ( passageMemory < 1024 ) {
			gameLocal.Printf( "%5d bytes passage memory used to build PVS\n", passageMemory );
		} else {
			gameLocal.Printf( "%5d KB passage memory used to build PVS\n", passageMemory >> 10 );
		}
	}

/*
================
idPVS::DestroyPassages
================
*/
	DestroyPassages ( ): void {
		var /*int */i: number, j: number;
		var p: pvsPortal_t;
		var area: pvsArea_t;

		for ( i = 0; i < this.numPortals; i++ ) {
			p = this.pvsPortals[i];
			area = this.pvsAreas[p.areaNum];
			for ( j = 0; j < area.numPortals; j++ ) {
				if ( p.passages[j].canSee ) {
					delete p.passages[j].canSee;
				}
			}
			delete p.passages;
		}
	}

/*
================
idPVS::CopyPortalPVSToMightSee
================
*/
	CopyPortalPVSToMightSee ( ): void {
		var /*int */i: number;
		var p: pvsPortal_t;

		for ( i = 0; i < this.numPortals; i++ ) {
			p = this.pvsPortals[i];
			memcpy( p.mightSee, p.vis, this.portalVisBytes );
		}
	}

/*
================
idPVS::AreaPVSFromPortalPVS
================
*/
	AreaPVSFromPortalPVS ( ): number /*int*/ {
		var /*int */i: number, j: number, k: number, areaNum: number, totalVisibleAreas: number;
		var /*long*/ p1: Int32Array, pIdx: number, p2: Int32Array;
		var /*byte **/pvs: Uint8Array, portalPVS: Uint8Array;
		var area: pvsArea_t;

		dlog(DEBUG_MAP_FILE, "AreaPVSFromPortalPVS\n");
		totalVisibleAreas = 0;

		if ( !this.numPortals ) {
			return totalVisibleAreas;
		}

		memset( this.areaPVS, 0, this.numAreas * this.areaVisBytes );

		for ( i = 0; i < this.numAreas; i++ ) {
			area = this.pvsAreas[i];
			pvs = this.areaPVS.subarray( i * this.areaVisBytes );

			// the area is visible to itself
			pvs[ i >> 3 ] |= 1 << (i & 7);

			if ( !area.numPortals ) {
				continue;
			}

			// store the PVS of all portals in this area at the first portal
			for ( j = 1; j < area.numPortals; j++ ) {
				p1 =  new Int32Array(area.portals[0].vis.buffer);
				p2 = new Int32Array(area.portals[j].vis.buffer);
				for (k = 0; k < this.portalVisInts; k++ ) {
					p1[pIdx] |= p2[pIdx];
					pIdx++;
				}
			}

			// the portals of this area are always visible
			for (j = 0; j < area.numPortals; j++) {
				k = this.pvsPortals.indexOf( area.portals[j] ); //area.portals[j] - this.pvsPortals;
				dlog(DEBUG_MAP_FILE, "k: %i\n", k);
				area.portals[0].vis[ k >> 3 ] |= 1 << (k & 7);
			}

			// set all areas to visible that can be seen from the portals of this area
			portalPVS = area.portals[0].vis;
			for ( j = 0; j < this.numPortals; j++ ) {
				// if this portal is visible
				if ( portalPVS[j>>3] & (1 << (j&7)) ) {
					areaNum = this.pvsPortals[j].areaNum;
					pvs[ areaNum >> 3 ] |= 1 << (areaNum & 7);
					dlog(DEBUG_MAP_FILE, "j: %i, an: %i pvs[ areaNum >> 3 ] %i\n", j, areaNum, pvs[areaNum >> 3]);
				}
			}

			// count the number of visible areas
			for ( j = 0; j < this.numAreas; j++ ) {
				if ( pvs[j>>3] & (1 << (j&7)) ) {
					totalVisibleAreas++;
					dlog(DEBUG_MAP_FILE, "totalVisibleAreas++ %i\n", totalVisibleAreas);
				}
			}
		}
		return totalVisibleAreas;
	}

/*
================
idPVS::Init
================
*/
	Init ( ): void {
		var /*int */totalVisibleAreas: number;

		this.Shutdown ( );

		this.numAreas = gameRenderWorld.NumAreas ( );
		if ( this.numAreas <= 0 ) {
			return;
		}

		this.connectedAreas = new Array<boolean>( this.numAreas );
		this.areaQueue = new Int32Array( this.numAreas );

		this.areaVisBytes = ( ( ( this.numAreas + 31 ) & ~31 ) >> 3 );
		this.areaVisLongs = this.areaVisBytes / sizeof( long );

		this.areaPVS = new Uint8Array( this.numAreas * this.areaVisBytes );
		memset( this.areaPVS, 0xFF, this.numAreas * this.areaVisBytes );

		this.numPortals = this.GetPortalCount ( );

		this.portalVisBytes = ( ( ( this.numPortals + 31 ) & ~31 ) >> 3 );
		this.portalVisLongs = this.portalVisBytes / sizeof( long );
		this.portalVisInts = this.portalVisBytes / sizeof( int );

		for ( var i = 0; i < MAX_CURRENT_PVS; i++ ) {
			this.currentPVS[i].handle.i = -1;
			this.currentPVS[i].handle.h = 0;
			this.currentPVS[i].pvs = new Uint8Array( this.areaVisBytes );
			memset( this.currentPVS[i].pvs, 0, this.areaVisBytes );
		}

		var timer = new idTimer;
		timer.Start ( );

		this.CreatePVSData ( );

		this.FrontPortalPVS ( );

		this.CopyPortalPVSToMightSee ( );

		this.PassagePVS ( );

		totalVisibleAreas = this.AreaPVSFromPortalPVS ( );

		this.DestroyPVSData ( );

		timer.Stop ( );

		gameLocal.Printf( "%5.0f msec to calculate PVS\n", timer.Milliseconds ( ) );
		gameLocal.Printf( "%5d areas\n", this.numAreas );
		gameLocal.Printf( "%5d portals\n", this.numPortals );
		gameLocal.Printf( "%5d areas visible on average\n", totalVisibleAreas / this.numAreas );
		if ( this.numAreas * this.areaVisBytes < 1024 ) {
			gameLocal.Printf( "%5d bytes PVS data\n", this.numAreas * this.areaVisBytes );
		} else {
			gameLocal.Printf( "%5d KB PVS data\n", ( this.numAreas * this.areaVisBytes ) >> 10 );
		}

		dlog(DEBUG_MAP_FILE, "%5d areas\n", this.numAreas );
		dlog(DEBUG_MAP_FILE, "%5d portals\n", this.numPortals );
		dlog(DEBUG_MAP_FILE, "%5d totalVisibleAreas\n", totalVisibleAreas );
	}

/*
================
idPVS::Shutdown
================
*/
	Shutdown ( ): void {
		if ( this.connectedAreas ) {
			$delete( this.connectedAreas );
			this.connectedAreas = null;
		}
		if ( this.areaQueue ) {
			$delete( this.areaQueue );
			this.areaQueue = null;
		}
		if ( this.areaPVS ) {
			$delete( this.areaPVS );
			this.areaPVS = null;
		}
		if ( this.currentPVS ) {
			for ( var i = 0; i < MAX_CURRENT_PVS; i++ ) {
				$delete( this.currentPVS[i].pvs );
				this.currentPVS[i].pvs = null;
			}
		}
	}

/////*
////================
////idPVS::GetConnectedAreas
////
////  assumes the 'areas' array is initialized to false
////================
////*/
////void idPVS::GetConnectedAreas( int srcArea, bool *areas ) const {
////	int curArea, nextArea;
////	int queueStart, queueEnd;
////	int i, n;
////	exitPortal_t portal;
////
////	queueStart = -1;
////	queueEnd = 0;
////	areas[srcArea] = true;
////
////	for ( curArea = srcArea; queueStart < queueEnd; curArea = this.areaQueue[++queueStart] ) {
////
////		n = gameRenderWorld.NumPortalsInArea( curArea );
////
////		for ( i = 0; i < n; i++ ) {
////			portal = gameRenderWorld.GetPortal( curArea, i );
////
////			if ( portal.blockingBits & PS_BLOCK_VIEW ) {
////				continue;
////			}
////
////			// area[1] is always the area the portal leads to
////			nextArea = portal.areas[1];
////
////			// if already visited this area
////			if ( areas[nextArea] ) {
////				continue;
////			}
////
////			// add area to queue
////			this.areaQueue[queueEnd++] = nextArea;
////			areas[nextArea] = true;
////		}
////	}
////}
////
/////*
////================
////idPVS::GetPVSArea
////================
////*/
////int idPVS::GetPVSArea( const idVec3 &point ) const {
////	return gameRenderWorld.PointInArea( point );
////}
////
/////*
////================
////idPVS::GetPVSAreas
////================
////*/
////int idPVS::GetPVSAreas( const idBounds &bounds, int *areas, int maxAreas ) const {
////	return gameRenderWorld.BoundsInAreas( bounds, areas, maxAreas );
////}
////
/////*
////================
////idPVS::SetupCurrentPVS
////================
////*/
////pvsHandle_t idPVS::SetupCurrentPVS( const idVec3 &source, const pvsType_t type ) const {
////	int sourceArea;
////
////	sourceArea = gameRenderWorld.PointInArea( source );
////
////	return SetupCurrentPVS( sourceArea, type );
////}
////
/////*
////================
////idPVS::SetupCurrentPVS
////================
////*/
////pvsHandle_t idPVS::SetupCurrentPVS( const idBounds &source, const pvsType_t type ) const {
////	int numSourceAreas, sourceAreas[MAX_BOUNDS_AREAS];
////
////	numSourceAreas = gameRenderWorld.BoundsInAreas( source, sourceAreas, MAX_BOUNDS_AREAS );
////
////	return SetupCurrentPVS( sourceAreas, numSourceAreas, type );
////}
////
/////*
////================
////idPVS::SetupCurrentPVS
////================
////*/
////pvsHandle_t idPVS::SetupCurrentPVS( const int sourceArea, const pvsType_t type ) const {
////	var/*int */i:number;
////	pvsHandle_t handle;
////
////	handle = AllocCurrentPVS( *reinterpret_cast<const unsigned int *>(&sourceArea) );
////
////	if ( sourceArea < 0 || sourceArea >= this.numAreas ) {
////		memset( this.currentPVS[handle.i].pvs, 0, this.areaVisBytes );
////		return handle;
////	}
////
////	if ( type != PVS_CONNECTED_AREAS ) {
////		memcpy( this.currentPVS[handle.i].pvs, this.areaPVS + sourceArea * this.areaVisBytes, this.areaVisBytes );
////	} else {
////		memset( this.currentPVS[handle.i].pvs, -1, this.areaVisBytes );
////	}
////
////	if ( type == PVS_ALL_PORTALS_OPEN ) {
////		return handle;
////	}
////
////	memset( this.connectedAreas, 0, this.numAreas * sizeof( *this.connectedAreas ) );
////
////	GetConnectedAreas( sourceArea, this.connectedAreas );
////
////	for ( i = 0; i < this.numAreas; i++ ) {
////		if ( !this.connectedAreas[i] ) {
////			this.currentPVS[handle.i].pvs[i>>3] &= ~(1 << (i&7));
////		}
////	}
////
////	return handle;
////}
////
/////*
////================
////idPVS::SetupCurrentPVS
////================
////*/
////pvsHandle_t idPVS::SetupCurrentPVS( const int *sourceAreas, const int numSourceAreas, const pvsType_t type ) const {
////	int i, j;
////	unsigned int h;
////	long *vis, *pvs;
////	pvsHandle_t handle;
////
////	h = 0;
////	for ( i = 0; i < numSourceAreas; i++ ) {
////		h ^= *reinterpret_cast<const unsigned int *>(&sourceAreas[i]);
////	}
////	handle = AllocCurrentPVS( h );
////
////	if ( !numSourceAreas || sourceAreas[0] < 0 || sourceAreas[0] >= this.numAreas) {
////		memset( this.currentPVS[handle.i].pvs, 0, this.areaVisBytes );
////		return handle;
////	}
////
////	if ( type != PVS_CONNECTED_AREAS ) {
////		// merge PVS of all areas the source is in
////		memcpy( this.currentPVS[handle.i].pvs, this.areaPVS + sourceAreas[0] * this.areaVisBytes, this.areaVisBytes );
////		for ( i = 1; i < numSourceAreas; i++ ) {
////
////			assert( sourceAreas[i] >= 0 && sourceAreas[i] < this.numAreas );
////
////			vis = reinterpret_cast<long*>(this.areaPVS + sourceAreas[i] * this.areaVisBytes);
////			pvs = reinterpret_cast<long*>(this.currentPVS[handle.i].pvs);
////			for ( j = 0; j < this.areaVisLongs; j++ ) {
////				*pvs++ |= *vis++;
////			}
////		}
////	} else {
////		memset( this.currentPVS[handle.i].pvs, -1, this.areaVisBytes );
////	}
////
////	if ( type == PVS_ALL_PORTALS_OPEN ) {
////		return handle;
////	}
////
////	memset( this.connectedAreas, 0, this.numAreas * sizeof( *this.connectedAreas ) );
////
////	// get all areas connected to any of the source areas
////	for ( i = 0; i < numSourceAreas; i++ ) {
////		if ( !this.connectedAreas[sourceAreas[i]] ) {
////			GetConnectedAreas( sourceAreas[i], this.connectedAreas );
////		}
////	}
////
////	// remove unconnected areas from the PVS
////	for ( i = 0; i < this.numAreas; i++ ) {
////		if ( !this.connectedAreas[i] ) {
////			this.currentPVS[handle.i].pvs[i>>3] &= ~(1 << (i&7));
////		}
////	}
////
////	return handle;
////}
////
/////*
////================
////idPVS::MergeCurrentPVS
////================
////*/
////pvsHandle_t idPVS::MergeCurrentPVS( pvsHandle_t pvs1, pvsHandle_t pvs2 ) const {
////	var/*int */i:number;
////	long *pvs1Ptr, *pvs2Ptr, *ptr;
////	pvsHandle_t handle;
////
////	if ( pvs1.i < 0 || pvs1.i >= MAX_CURRENT_PVS || pvs1.h != this.currentPVS[pvs1.i].handle.h ||
////		pvs2.i < 0 || pvs2.i >= MAX_CURRENT_PVS || pvs2.h != this.currentPVS[pvs2.i].handle.h ) {
////		gameLocal.Error( "idPVS::MergeCurrentPVS: invalid handle" );
////	}
////
////	handle = AllocCurrentPVS( pvs1.h ^ pvs2.h );
////
////	ptr = reinterpret_cast<long*>(this.currentPVS[handle.i].pvs);
////	pvs1Ptr = reinterpret_cast<long*>(this.currentPVS[pvs1.i].pvs);
////	pvs2Ptr = reinterpret_cast<long*>(this.currentPVS[pvs2.i].pvs);
////
////	for ( i = 0; i < this.areaVisLongs; i++ ) {
////		*ptr++ = *pvs1Ptr++ | *pvs2Ptr++;
////	}
////
////	return handle;
////}
////
/////*
////================
////idPVS::AllocCurrentPVS
////================
////*/
////pvsHandle_t idPVS::AllocCurrentPVS( unsigned int h ) const {
////	var/*int */i:number;
////	pvsHandle_t handle;
////
////	for ( i = 0; i < MAX_CURRENT_PVS; i++ ) {
////		if ( this.currentPVS[i].handle.i == -1 ) {
////			this.currentPVS[i].handle.i = i;
////			this.currentPVS[i].handle.h = h;
////			return this.currentPVS[i].handle;
////		}
////	}
////
////	gameLocal.Error( "idPVS::AllocCurrentPVS: no free PVS left" );
////
////	handle.i = -1;
////	handle.h = 0;
////	return handle;
////}
////
/////*
////================
////idPVS::FreeCurrentPVS
////================
////*/
////void idPVS::FreeCurrentPVS( pvsHandle_t handle ) const {
////	if ( handle.i < 0 || handle.i >= MAX_CURRENT_PVS || handle.h != this.currentPVS[handle.i].handle.h ) {
////		gameLocal.Error( "idPVS::FreeCurrentPVS: invalid handle" );
////	}
////	this.currentPVS[handle.i].handle.i = -1;
////}
////
/////*
////================
////idPVS::InCurrentPVS
////================
////*/
////bool idPVS::InCurrentPVS( const pvsHandle_t handle, const idVec3 &target ) const {
////	int targetArea;
////
////	if ( handle.i < 0 || handle.i >= MAX_CURRENT_PVS ||
////		handle.h != this.currentPVS[handle.i].handle.h ) {
////		gameLocal.Error( "idPVS::InCurrentPVS: invalid handle" );
////	}
////
////	targetArea = gameRenderWorld.PointInArea( target );
////
////	if ( targetArea == -1 ) {
////		return false;
////	}
////
////	return ( ( this.currentPVS[handle.i].pvs[targetArea>>3] & (1 << (targetArea&7)) ) != 0 );
////}
////
/////*
////================
////idPVS::InCurrentPVS
////================
////*/
////bool idPVS::InCurrentPVS( const pvsHandle_t handle, const idBounds &target ) const {
////	int i, numTargetAreas, targetAreas[MAX_BOUNDS_AREAS];
////
////	if ( handle.i < 0 || handle.i >= MAX_CURRENT_PVS ||
////		handle.h != this.currentPVS[handle.i].handle.h ) {
////		gameLocal.Error( "idPVS::InCurrentPVS: invalid handle" );
////	}
////
////	numTargetAreas = gameRenderWorld.BoundsInAreas( target, targetAreas, MAX_BOUNDS_AREAS );
////
////	for ( i = 0; i < numTargetAreas; i++ ) {
////		if ( this.currentPVS[handle.i].pvs[targetAreas[i]>>3] & (1 << (targetAreas[i]&7)) ) {
////			return true;
////		}
////	}
////	return false;
////}
////
/////*
////================
////idPVS::InCurrentPVS
////================
////*/
////bool idPVS::InCurrentPVS( const pvsHandle_t handle, const int targetArea ) const {
////
////	if ( handle.i < 0 || handle.i >= MAX_CURRENT_PVS ||
////		handle.h != this.currentPVS[handle.i].handle.h ) {
////		gameLocal.Error( "idPVS::InCurrentPVS: invalid handle" );
////	}
////
////	if ( targetArea < 0 || targetArea >= this.numAreas ) {
////		return false;
////	}
////
////	return ( ( this.currentPVS[handle.i].pvs[targetArea>>3] & (1 << (targetArea&7)) ) != 0 );
////}
////
/////*
////================
////idPVS::InCurrentPVS
////================
////*/
////bool idPVS::InCurrentPVS( const pvsHandle_t handle, const int *targetAreas, int numTargetAreas ) const {
////	var/*int */i:number;
////
////	if ( handle.i < 0 || handle.i >= MAX_CURRENT_PVS ||
////		handle.h != this.currentPVS[handle.i].handle.h ) {
////		gameLocal.Error( "idPVS::InCurrentPVS: invalid handle" );
////	}
////
////	for ( i = 0; i < numTargetAreas; i++ ) {
////		if ( targetAreas[i] < 0 || targetAreas[i] >= this.numAreas ) {
////			continue;
////		}
////		if ( this.currentPVS[handle.i].pvs[targetAreas[i]>>3] & (1 << (targetAreas[i]&7)) ) {
////			return true;
////		}
////	}
////	return false;
////}
////
/////*
////================
////idPVS::DrawPVS
////================
////*/
////void idPVS::DrawPVS( const idVec3 &source, const pvsType_t type ) const {
////	int i, j, k, numPoints, n, sourceArea;
////	exitPortal_t portal;
////	idPlane plane;
////	idVec3 offset;
////	idVec4 *color;
////	pvsHandle_t handle;
////
////	sourceArea = gameRenderWorld.PointInArea( source );
////
////	if ( sourceArea == -1 ) {
////		return;
////	}
////
////	handle = SetupCurrentPVS( source, type );
////
////	for ( j = 0; j < this.numAreas; j++ ) {
////
////		if ( !( this.currentPVS[handle.i].pvs[j>>3] & (1 << (j&7)) ) ) {
////			continue;
////		}
////
////		if ( j == sourceArea ) {
////			color = &colorRed;
////		}
////		else {
////			color = &colorCyan;
////		}
////
////		n = gameRenderWorld.NumPortalsInArea( j );
////
////		// draw all the portals of the area
////		for ( i = 0; i < n; i++ ) {
////			portal = gameRenderWorld.GetPortal( j, i );
////
////			numPoints = portal.w.GetNumPoints();
////
////			portal.w.GetPlane( plane );
////			offset = plane.Normal() * 4.0f;
////			for ( k = 0; k < numPoints; k++ ) {
////				gameRenderWorld.DebugLine( *color, (*portal.w)[k].ToVec3() + offset, (*portal.w)[(k+1)%numPoints].ToVec3() + offset );
////			}
////		}
////	}
////
////	FreeCurrentPVS( handle );
////}
////
/////*
////================
////idPVS::DrawPVS
////================
////*/
////void idPVS::DrawPVS( const idBounds &source, const pvsType_t type ) const {
////	int i, j, k, numPoints, n, num, areas[MAX_BOUNDS_AREAS];
////	exitPortal_t portal;
////	idPlane plane;
////	idVec3 offset;
////	idVec4 *color;
////	pvsHandle_t handle;
////
////	num = gameRenderWorld.BoundsInAreas( source, areas, MAX_BOUNDS_AREAS );
////
////	if ( !num ) {
////		return;
////	}
////
////	handle = SetupCurrentPVS( source, type );
////
////	for ( j = 0; j < this.numAreas; j++ ) {
////
////		if ( !( this.currentPVS[handle.i].pvs[j>>3] & (1 << (j&7)) ) ) {
////			continue;
////		}
////
////		for ( i = 0; i < num; i++ ) {
////			if ( j == areas[i] ) {
////				break;
////			}
////		}
////		if ( i < num ) {
////			color = &colorRed;
////		}
////		else {
////			color = &colorCyan;
////		}
////
////		n = gameRenderWorld.NumPortalsInArea( j );
////
////		// draw all the portals of the area
////		for ( i = 0; i < n; i++ ) {
////			portal = gameRenderWorld.GetPortal( j, i );
////
////			numPoints = portal.w.GetNumPoints();
////
////			portal.w.GetPlane( plane );
////			offset = plane.Normal() * 4.0f;
////			for ( k = 0; k < numPoints; k++ ) {
////				gameRenderWorld.DebugLine( *color, (*portal.w)[k].ToVec3() + offset, (*portal.w)[(k+1)%numPoints].ToVec3() + offset );
////			}
////		}
////	}
////
////	FreeCurrentPVS( handle );
////}
////
/////*
////================
////idPVS::DrawPVS
////================
////*/
////void idPVS::DrawCurrentPVS( const pvsHandle_t handle, const idVec3 &source ) const {
////	int i, j, k, numPoints, n, sourceArea;
////	exitPortal_t portal;
////	idPlane plane;
////	idVec3 offset;
////	idVec4 *color;
////
////	if ( handle.i < 0 || handle.i >= MAX_CURRENT_PVS ||
////		handle.h != this.currentPVS[handle.i].handle.h ) {
////		gameLocal.Error( "idPVS::DrawCurrentPVS: invalid handle" );
////	}
////
////	sourceArea = gameRenderWorld.PointInArea( source );
////
////	if ( sourceArea == -1 ) {
////		return;
////	}
////
////	for ( j = 0; j < this.numAreas; j++ ) {
////
////		if ( !( this.currentPVS[handle.i].pvs[j>>3] & (1 << (j&7)) ) ) {
////			continue;
////		}
////
////		if ( j == sourceArea ) {
////			color = &colorRed;
////		}
////		else {
////			color = &colorCyan;
////		}
////
////		n = gameRenderWorld.NumPortalsInArea( j );
////
////		// draw all the portals of the area
////		for ( i = 0; i < n; i++ ) {
////			portal = gameRenderWorld.GetPortal( j, i );
////
////			numPoints = portal.w.GetNumPoints();
////
////			portal.w.GetPlane( plane );
////			offset = plane.Normal() * 4.0f;
////			for ( k = 0; k < numPoints; k++ ) {
////				gameRenderWorld.DebugLine( *color, (*portal.w)[k].ToVec3() + offset, (*portal.w)[(k+1)%numPoints].ToVec3() + offset );
////			}
////		}
////	}
////}
////
////#if ASYNC_WRITE_PVS
////
/////*
////===================
////idPVS::WritePVS
////===================
////*/
////void idPVS::WritePVS( const pvsHandle_t handle, idBitMsg &msg ) {
////	msg.WriteData( this.currentPVS[ handle.i ].pvs, this.areaVisBytes );
////}
////
/////*
////===================
////idPVS::ReadPVS
////===================
////*/
////void idPVS::ReadPVS( const pvsHandle_t handle, const idBitMsg &msg ) {
////	byte	l_pvs[ 256 ];
////	int		i;
////
////	assert( this.areaVisBytes <= 256 );
////	msg.ReadData( l_pvs, this.areaVisBytes );
////	if ( memcmp( l_pvs, this.currentPVS[ handle.i ].pvs, this.areaVisBytes ) ) {
////		common.Printf( "PVS not matching ( %d this.areaVisBytes ) - server then client:\n", this.areaVisBytes );
////		for ( i = 0; i < this.areaVisBytes; i++ ) {
////			common.Printf( "%x ", l_pvs[ i ] );
////		}
////		common.Printf( "\n" );
////		for ( i = 0; i < this.areaVisBytes; i++ ) {
////			common.Printf( "%x ", this.currentPVS[ handle.i ].pvs[ i ] );
////		}
////		common.Printf( "\n" );
////	}
////}
////
////#endif
////
}