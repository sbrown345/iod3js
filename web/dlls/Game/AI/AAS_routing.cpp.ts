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
////#include "../../idlib/precompiled.h"
////#pragma hdrstop
////
////#include "AAS_local.h"
////#include "../Game_local.h"		// for print and error
////
////#define CACHETYPE_AREA				1
////#define CACHETYPE_PORTAL			2
////
////#define MAX_ROUTING_CACHE_MEMORY	(2*1024*1024)
////
////#define LEDGE_TRAVELTIME_PANALTY	250
////
/////*
////============
////idRoutingCache::idRoutingCache
////============
////*/
////idRoutingCache::idRoutingCache( int size ) {
////	areaNum = 0;
////	cluster = 0;
////	next = prev = NULL;
////	time_next = time_prev = NULL;
////	travelFlags = 0;
////	startTravelTime = 0;
////	type = 0;
////	this->size = size;
////	reachabilities = new byte[size];
////	memset( reachabilities, 0, size * sizeof( reachabilities[0] ) );
////	travelTimes = new unsigned short[size];
////	memset( travelTimes, 0, size * sizeof( travelTimes[0] ) );
////}
////
/////*
////============
////idRoutingCache::~idRoutingCache
////============
////*/
////idRoutingCache::~idRoutingCache( void ) {
////	delete [] reachabilities;
////	delete [] travelTimes;
////}
////
/////*
////============
////idRoutingCache::Size
////============
////*/
////int idRoutingCache::Size( void ) const {
////	return sizeof( idRoutingCache ) + size * sizeof( reachabilities[0] ) + size * sizeof( travelTimes[0] );
////}
////
