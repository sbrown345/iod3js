///*
//===========================================================================
//
//Doom 3 GPL Source Code
//Copyright (C) 1999-2011 id Software LLC, a ZeniMax Media company. 
//
//This file is part of the Doom 3 GPL Source Code (?Doom 3 Source Code?).  
//
//Doom 3 Source Code is free software: you can redistribute it and/or modify
//it under the terms of the GNU General Public License as published by
//the Free Software Foundation, either version 3 of the License, or
//(at your option) any later version.
//
//Doom 3 Source Code is distributed in the hope that it will be useful,
//but WITHOUT ANY WARRANTY; without even the implied warranty of
//MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//GNU General Public License for more details.
//
//You should have received a copy of the GNU General Public License
//along with Doom 3 Source Code.  If not, see <http://www.gnu.org/licenses/>.
//
//In addition, the Doom 3 Source Code is also subject to certain additional terms. You should have received a copy of these additional terms immediately following the terms and conditions of the GNU General Public License which accompanied the Doom 3 Source Code.  If not, please request a copy in writing from id Software at the address below.
//
//If you have questions concerning this license or the applicable additional terms, you may contact in writing id Software LLC, c/o ZeniMax Media Inc., Suite 120, Rockville, Maryland 20850 USA.
//
//===========================================================================
//*/
//
//#ifndef __SERVERSCAN_H__
//#define __SERVERSCAN_H__
//
///*
//===============================================================================
//
//	Scan for servers, on the LAN or from a list
//	Update a listDef GUI through usage of idListGUI class
//	When updating large lists of servers, sends out getInfo in small batches to avoid congestion
//
//===============================================================================
//*/
//
//// storage for incoming servers / server scan
//typedef struct {
//	netadr_t	adr;
//	int			id;
//	int			time;
//} inServer_t;
//
// the menu gui uses a hard-coded control type to display a list of network games
class networkServer_t{
//	netadr_t	adr;
//	idDict		serverInfo;
//	int			ping;
//	int			id;			// idnet mode sends an id for each server in list
//	int			clients;
//	char		nickname[ MAX_NICKLEN ][ MAX_ASYNC_CLIENTS ];
//	short		pings[ MAX_ASYNC_CLIENTS ];
//	int			rate[ MAX_ASYNC_CLIENTS ];
//	int			OSMask;
//    int			challenge;
}
//
//typedef enum {
//	SORT_PING,
//	SORT_SERVERNAME,
//	SORT_PLAYERS,
//	SORT_GAMETYPE,
//	SORT_MAP,
//	SORT_GAME
//} serverSort_t;
//
