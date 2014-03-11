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
//#include "../../idlib/precompiled.h"
//#pragma hdrstop
//
//idCVar gui_filter_password( "gui_filter_password", "0", CVAR_GUI | CVAR_INTEGER | CVAR_ARCHIVE, "Password filter" );
//idCVar gui_filter_players( "gui_filter_players", "0", CVAR_GUI | CVAR_INTEGER | CVAR_ARCHIVE, "Players filter" );
//idCVar gui_filter_gameType( "gui_filter_gameType", "0", CVAR_GUI | CVAR_INTEGER | CVAR_ARCHIVE, "Gametype filter" );
//idCVar gui_filter_idle( "gui_filter_idle", "0", CVAR_GUI | CVAR_INTEGER | CVAR_ARCHIVE, "Idle servers filter" );
//idCVar gui_filter_game( "gui_filter_game", "0", CVAR_GUI | CVAR_INTEGER | CVAR_ARCHIVE, "Game filter" );
//
//const char* l_gameTypes[] = {
//	"Deathmatch",
//	"Tourney",
//	"Team DM",
//	"Last Man",
//	"CTF",
//	NULL
//};
//
//static idServerScan *l_serverScan = NULL;

 enum scan_state_t{
	IDLE = 0,
	WAIT_ON_INIT,
	LAN_SCAN,
	NET_SCAN
}


class idServerScan extends idList<networkServer_t> {

//public:	
//						idServerScan( );
//	
//	int					InfoResponse( networkServer_t &server );
//
//	// add an internet server - ( store a numeric id along with it )
//	void				AddServer( int id, const char *srv );
//
//	// we are going to feed server entries to be pinged
//	// if timeout is true, use a timeout once we start AddServer to trigger EndServers and decide the scan is done
//	void				StartServers( bool timeout );
//	// we are done filling up the list of server entries
//	void				EndServers( );
//
//	// scan the current list of servers - used for refreshes and while receiving a fresh list
//	void				NetScan( );
//
//	// clear
//	void				Clear( );
//
//	// called each game frame. Updates the scanner state, takes care of ongoing scans
//	void				RunFrame( );
//	
//	scan_state_t		GetState() { return this.scan_state; }
//	void				SetState( scan_state_t );
//	
//	bool				GetBestPing( networkServer_t &serv );
//
//						// prepare for a LAN scan. idAsyncClient does the network job (UDP broadcast), we do the storage
//	void				SetupLANScan( );
//
//	void				GUIConfig( idUserInterface *pGUI, const char *name );
//						// update the GUI fields with information about the currently selected server
//	void				GUIUpdateSelected( void );
//
//	void				Shutdown( );
//
//	void				ApplyFilter( );
//
//						// there is an internal toggle, call twice with same sort to switch
//	void				SetSorting( serverSort_t sort );
//
//	int					GetChallenge( );
//
//private:
	static	MAX_PINGREQUESTS 	= 32;		// how many servers to query at once
	static	REPLY_TIMEOUT 		= 999;		// how long should we wait for a reply from a game server
	static	INCOMING_TIMEOUT	= 1500;		// when we got an incoming server list, how long till we decide the list is done
	static	REFRESH_START		= 10000;	// how long to wait when sending the initial refresh request

	scan_state: scan_state_t;

	incoming_net:boolean;	// set to true while new servers are fed through AddServer
	incoming_useTimeout:boolean;
	incoming_lastTime:number/*int*/;

	lan_pingtime:number/*int*/;	// holds the time of LAN scan
	
	// servers we're waiting for a reply from
	// won't exceed MAX_PINGREQUESTS elements
	// holds index of net_servers elements, indexed by 'from' string
	net_info = new idDict;		

	net_servers = new idList<inServer_t>(inServer_t);
	// where we are in net_servers list for getInfo emissions ( NET_SCAN only )
	// we may either be waiting on MAX_PINGREQUESTS, or for net_servers to grow some more ( through AddServer )
	cur_info:number/*int*/;

	m_pGUI: idUserInterface;
	listGUI: idListGUI;

	m_sort: serverSort_t;
	m_sortAscending:boolean;
	m_sortedServers = new idList</*int*/number>(Number);	// use ascending for the walking order

	screenshot = new idStr;
	challenge:number/*int*/;			// challenge for current scan
	
	endWaitTime:number/*int*/;		// when to stop waiting on a port init
//
//private:
//	void				LocalClear( );		// we need to clear some internal data as well
//
//	void				EmitGetInfo( netadr_t &serv );
//	void				GUIAdd( int id, const networkServer_t server );
//	bool				IsFiltered( const networkServer_t server );
//
//	static int			Cmp( const int *a, const int *b );

/*
================
idServerScan::idServerScan
================
*/
	constructor ( ) {
		super( networkServer_t );
		this.m_pGUI = null;
		this.m_sort = serverSort_t.SORT_PING;
		this.m_sortAscending = true;
		this.challenge = 0;
		this.LocalClear ( );
	}

/*
================
idServerScan::LocalClear
================
*/
	LocalClear ( ): void {
		this.scan_state = scan_state_t.IDLE;
		this.incoming_net = false;
		this.lan_pingtime = -1;
		this.net_info.Clear ( );
		this.net_servers.Clear ( );
		this.cur_info = 0;
		if ( this.listGUI ) {
			this.listGUI.Clear ( );
		}
		this.incoming_useTimeout = false;
		this.m_sortedServers.Clear ( );
	}

/*
================
idServerScan::Clear
================
*/
	Clear ( ): void {
		this.LocalClear ( );
		super.Clear ( );
	}

///*
//================
//idServerScan::Shutdown
//================
//*/
//void idServerScan::Shutdown( ) {
//	m_pGUI = NULL;
//	if ( this.listGUI ) {
//		this.listGUI.Config( NULL, NULL );
//		uiManager.FreeListGUI( this.listGUI );
//		this.listGUI = NULL;
//	}
//	screenshot.Clear();
//}
//
///*
//================
//idServerScan::SetupLANScan
//================
//*/
//void idServerScan::SetupLANScan( ) {	
//	Clear();
//	GUIUpdateSelected();
//	this.scan_state = LAN_SCAN;
//	challenge++;
//	this.lan_pingtime = Sys_Milliseconds();
//	common.DPrintf( "SetupLANScan with challenge %d\n", challenge );
//}
//
///*
//================
//idServerScan::InfoResponse
//================
//*/
//int idServerScan::InfoResponse( networkServer_t &server ) {
//	if ( this.scan_state == IDLE ) {
//		return false;
//	}
//
//	idStr serv = Sys_NetAdrToString( server.adr );
//
//	if ( server.challenge != challenge ) {
//		common.DPrintf( "idServerScan::InfoResponse - ignoring response from %s, wrong challenge %d.", serv.c_str(), server.challenge );
//		return false;
//	}
//
//	if ( this.scan_state == NET_SCAN ) {	
//		const idKeyValue *info = this.net_info.FindKey( serv.c_str() );
//		if ( !info ) {
//			common.DPrintf( "idServerScan::InfoResponse NET_SCAN: reply from unknown %s\n", serv.c_str() );
//			return false;
//		}
//		int id = atoi( info.GetValue() );
//		this.net_info.Delete( serv.c_str() );
//		inServer_t iserv = this.net_servers[ id ];
//		server.ping = Sys_Milliseconds() - iserv.time;
//		server.id = iserv.id;
//	} else {
//		server.ping = Sys_Milliseconds() - this.lan_pingtime;
//		server.id = 0;
//
//		// check for duplicate servers
//		for ( int i = 0; i < Num() ; i++ ) {
//			if ( memcmp( &(*this)[ i ].adr, &server.adr, sizeof(netadr_t) ) == 0 ) {
//				common.DPrintf( "idServerScan::InfoResponse LAN_SCAN: duplicate server %s\n", serv.c_str() );
//				return true;
//			}
//		}
//	}
//
//	const char *si_map = server.serverInfo.GetString( "si_map" );
//	const idDecl *mapDecl = declManager.FindType( DECL_MAPDEF, si_map, false );
//	const idDeclEntityDef *mapDef = static_cast< const idDeclEntityDef * >( mapDecl );
//	if ( mapDef ) {
//		const char *mapName = common.GetLanguageDict().GetString( mapDef.dict.GetString( "name", si_map ) );
//		server.serverInfo.Set( "si_mapName", mapName );
//	} else {
//		server.serverInfo.Set( "si_mapName", si_map );
//	}
//
//	int index = Append( server );
//	// for now, don't maintain sorting when adding new info response servers
//	this.m_sortedServers.Append( Num()-1 );
//	if ( this.listGUI.IsConfigured( ) && !IsFiltered( server ) ) {
//		GUIAdd( Num()-1, server );
//	}
//	if ( this.listGUI.GetSelection( NULL, 0 ) == ( Num()-1 ) ) {
//		GUIUpdateSelected();
//	}
//
//	return index;
//}
//
///*
//================
//idServerScan::AddServer
//================
//*/
//void idServerScan::AddServer( int id, const char *srv ) {
//	inServer_t s;
//	
//	this.incoming_net = true;
//	incoming_lastTime = Sys_Milliseconds() + INCOMING_TIMEOUT;
//	s.id = id;
//	
//	// using IPs, not hosts
//	if ( !Sys_StringToNetAdr( srv, &s.adr, false ) ) {
//		common.DPrintf( "idServerScan::AddServer: failed to parse server %s\n", srv );
//		return;
//	}
//	if ( !s.adr.port ) {
//		s.adr.port = PORT_SERVER;
//	}
//	
//	this.net_servers.Append( s );
//}
//
///*
//================
//idServerScan::EndServers
//================
//*/
//void idServerScan::EndServers( ) {
//	this.incoming_net = false;
//	l_serverScan = this;
//	this.m_sortedServers.Sort( idServerScan::Cmp );
//	ApplyFilter();
//} 
//
///*
//================
//idServerScan::StartServers
//================
//*/
//void idServerScan::StartServers( bool timeout ) {
//	this.incoming_net = true;
//	this.incoming_useTimeout = timeout;
//	incoming_lastTime = Sys_Milliseconds() + REFRESH_START;
//}
//
///*
//================
//idServerScan::EmitGetInfo
//================
//*/
//void idServerScan::EmitGetInfo( netadr_t &serv ) {
//	idAsyncNetwork::client.GetServerInfo( serv );
//}
//
///*
//===============
//idServerScan::GetChallenge
//===============
//*/
//int idServerScan::GetChallenge( ) {
//	return challenge;
//}
//
///*
//================
//idServerScan::NetScan
//================
//*/
//void idServerScan::NetScan( ) {
//	if ( !idAsyncNetwork::client.IsPortInitialized() ) {
//		// if the port isn't open, initialize it, but wait for a short
//		// time to let the OS do whatever magic things it needs to do...
//		idAsyncNetwork::client.InitPort();
//		// start the scan one second from now...
//		this.scan_state = WAIT_ON_INIT;
//		endWaitTime = Sys_Milliseconds() + 1000;
//		return;
//	}
//
//	// make sure the client port is open
//	idAsyncNetwork::client.InitPort();
//
//	this.scan_state = NET_SCAN;
//	challenge++;
//	
//	idList<networkServer_t>::Clear();
//	this.m_sortedServers.Clear();
//	this.cur_info = 0;
//	this.net_info.Clear();
//	this.listGUI.Clear();
//	GUIUpdateSelected();
//	common.DPrintf( "NetScan with challenge %d\n", challenge );
//	
//	while ( this.cur_info < Min( this.net_servers.Num(), MAX_PINGREQUESTS ) ) {
//		netadr_t serv = this.net_servers[ this.cur_info ].adr;
//		EmitGetInfo( serv );
//		this.net_servers[ this.cur_info ].time = Sys_Milliseconds();
//		this.net_info.SetInt( Sys_NetAdrToString( serv ), this.cur_info );
//		this.cur_info++;
//	}
//}
//
///*
//===============
//idServerScan::ServerScanFrame
//===============
//*/
//void idServerScan::RunFrame( ) {
//	if ( this.scan_state == IDLE ) {
//		return;
//	} 
//	
//	if ( this.scan_state == WAIT_ON_INIT ) {
//		if ( Sys_Milliseconds() >= endWaitTime ) {
//				this.scan_state = IDLE;
//				NetScan();
//			}
//		return;
//	} 
//	
//	int timeout_limit = Sys_Milliseconds() - REPLY_TIMEOUT;
//	
//	if ( this.scan_state == LAN_SCAN ) {
//		if ( timeout_limit > this.lan_pingtime ) {
//			common.Printf( "Scanned for servers on the LAN\n" );
//			this.scan_state = IDLE;
//		}
//		return;
//	}
//	
//	// if this.scan_state == NET_SCAN
//	
//	// check for timeouts
//	int i = 0;
//	while ( i < this.net_info.GetNumKeyVals() ) {
//		if ( timeout_limit > this.net_servers[ atoi( this.net_info.GetKeyVal( i ).GetValue().c_str() ) ].time ) {
//			common.DPrintf( "timeout %s\n", this.net_info.GetKeyVal( i ).GetKey().c_str() );
//			this.net_info.Delete( this.net_info.GetKeyVal( i ).GetKey().c_str() );
//		} else {
//			i++;
//		}
//	}
//			
//	// possibly send more queries
//	while ( this.cur_info < this.net_servers.Num() && this.net_info.GetNumKeyVals() < MAX_PINGREQUESTS ) {
//		netadr_t serv = this.net_servers[ this.cur_info ].adr;
//		EmitGetInfo( serv );
//		this.net_servers[ this.cur_info ].time = Sys_Milliseconds();
//		this.net_info.SetInt( Sys_NetAdrToString( serv ), this.cur_info );
//		this.cur_info++;
//	}
//	
//	// update state
//	if ( ( !this.incoming_net || ( this.incoming_useTimeout && Sys_Milliseconds() > incoming_lastTime ) ) && this.net_info.GetNumKeyVals() == 0 ) {
//		EndServers();
//		// the list is complete, we are no longer waiting for any getInfo replies
//		common.Printf( "Scanned %d servers.\n", this.cur_info );
//		this.scan_state = IDLE;
//	}
//}
//
///*
//===============
//idServerScan::GetBestPing
//===============
//*/
//bool idServerScan::GetBestPing( networkServer_t &serv ) {
//	int i, ic;
//	ic = Num();
//	if ( !ic ) {
//		return false;
//	}
//	serv = (*this)[ 0 ];
//	for ( i = 0 ; i < ic ; i++ ) {
//		if ( (*this)[ i ].ping < serv.ping ) {
//			serv = (*this)[ i ];
//		}
//	}
//	return true;
//}

/*
================
idServerScan::GUIConfig
================
*/
	GUIConfig ( pGUI: idUserInterface, name: string ): void {
		this.m_pGUI = pGUI;
		if (this.listGUI == null ) {
			this.listGUI = uiManager.AllocListGUI();
		}
		this.listGUI.Config( pGUI, name );
	}

///*
//================
//idServerScan::GUIUpdateSelected
//================
//*/
//void idServerScan::GUIUpdateSelected( void ) {
//	char screenshot[ MAX_STRING_CHARS ];
//
//	if ( !m_pGUI ) {
//		return;
//	}
//	int i = this.listGUI.GetSelection( NULL, 0 );
//	if ( i == -1 || i >= Num() ) {
//		m_pGUI.SetStateString( "server_name", "" );
//		m_pGUI.SetStateString( "player1", "" );
//		m_pGUI.SetStateString( "player2", "" );
//		m_pGUI.SetStateString( "player3", "" );
//		m_pGUI.SetStateString( "player4", "" );
//		m_pGUI.SetStateString( "player5", "" );
//		m_pGUI.SetStateString( "player6", "" );
//		m_pGUI.SetStateString( "player7", "" );
//		m_pGUI.SetStateString( "player8", "" );
//		m_pGUI.SetStateString( "server_map", "" );
//		m_pGUI.SetStateString( "browser_levelshot", "" );
//		m_pGUI.SetStateString( "server_gameType", "" );
//		m_pGUI.SetStateString( "server_IP", "" );
//		m_pGUI.SetStateString( "server_passworded", "" );
//	} else {
//		m_pGUI.SetStateString( "server_name", (*this)[ i ].serverInfo.GetString( "si_name" ) );
//		for ( int j = 0; j < 8; j++ ) {
//			if ( (*this)[i].clients > j ) {
//				m_pGUI.SetStateString( va( "player%i", j + 1 ) , (*this)[ i ].nickname[ j ] );
//			} else {
//				m_pGUI.SetStateString( va( "player%i", j + 1 ) , "" );
//			}
//		}
//		m_pGUI.SetStateString( "server_map", (*this)[ i ].serverInfo.GetString( "si_mapName" ) );
//		fileSystem.FindMapScreenshot( (*this)[ i ].serverInfo.GetString( "si_map" ), screenshot, MAX_STRING_CHARS );
//		m_pGUI.SetStateString( "browser_levelshot", screenshot );
//		m_pGUI.SetStateString( "server_gameType", (*this)[ i ].serverInfo.GetString( "si_gameType" ) );
//		m_pGUI.SetStateString( "server_IP", Sys_NetAdrToString( (*this)[ i ].adr ) );
//		if ( (*this)[ i ].serverInfo.GetBool( "si_usePass" ) ) {
//			m_pGUI.SetStateString( "server_passworded", "PASSWORD REQUIRED" );
//		} else {
//			m_pGUI.SetStateString( "server_passworded", "" );
//		}
//	}
//}
//
///*
//================
//idServerScan::GUIAdd
//================
//*/
//void idServerScan::GUIAdd( int id, const networkServer_t server ) {
//	idStr name = server.serverInfo.GetString( "si_name", GAME_NAME " Server" );
//	bool d3xp = false;
//	bool mod = false;
//
//	if ( !idStr::Icmp( server.serverInfo.GetString( "fs_game" ), "d3xp" ) ||
//		 !idStr::Icmp( server.serverInfo.GetString( "fs_game_base" ), "d3xp" ) ) {
//		d3xp = true;
//	}
//	if ( server.serverInfo.GetString( "fs_game" )[ 0 ] != '\0' ) {
//		mod = true;
//	}
//
//	name += "\t";
//	if ( server.serverInfo.GetString( "sv_punkbuster" )[ 0 ] == '1' ) {
//		name += "mtr_PB";
//	}
//
//	name += "\t";
//	if ( d3xp ) {
//		// FIXME: even for a 'D3XP mod'
//		// could have a specific icon for this case
//		name += "mtr_doom3XPIcon";
//	} else if ( mod ) {
//		name += "mtr_doom3Mod";
//	} else {
//		name += "mtr_doom3Icon";
//	}
//	name += "\t";
//	name += va( "%i/%i\t", server.clients, server.serverInfo.GetInt( "si_maxPlayers" ) );
//	name += ( server.ping > -1 ) ? va( "%i\t", server.ping ) : "na\t";
//	name += server.serverInfo.GetString( "si_gametype" );
//	name += "\t";
//	name += server.serverInfo.GetString( "si_mapName" );
//	name += "\t";
//	this.listGUI.Add( id, name );
//}
//
///*
//================
//idServerScan::ApplyFilter
//================
//*/
//void idServerScan::ApplyFilter( ) {
//	int i;
//	networkServer_t serv;
//	idStr s;
//
//	this.listGUI.SetStateChanges( false );
//	this.listGUI.Clear();
//	for ( i = m_sortAscending ? 0 : this.m_sortedServers.Num() - 1;
//			m_sortAscending ? i < this.m_sortedServers.Num() : i >= 0;
//			m_sortAscending ? i++ : i-- ) {
//		serv = (*this)[ this.m_sortedServers[ i ] ];
//		if ( !IsFiltered( serv ) ) {
//			GUIAdd( this.m_sortedServers[ i ], serv );
//		}
//	}
//	GUIUpdateSelected();
//	this.listGUI.SetStateChanges( true );
//}
//
///*
//================
//idServerScan::IsFiltered
//================
//*/
//bool idServerScan::IsFiltered( const networkServer_t server ) {
//	int i;
//	const idKeyValue *keyval;
//
//	// OS support filter
//#if 0
//	// filter out pure servers that won't provide checksumed game code for client OS
//	keyval = server.serverInfo.FindKey( "si_pure" );
//	if ( keyval && !idStr::Cmp( keyval.GetValue(), "1" ) ) {
//		if ( ( server.OSMask & ( 1 << BUILD_OS_ID ) ) == 0 ) {
//			return true;
//		}
//	}
//#else
//	if ( ( server.OSMask & ( 1 << BUILD_OS_ID ) ) == 0 ) {
//		return true;
//	}
//#endif
//	// password filter
//	keyval = server.serverInfo.FindKey( "si_usePass" );
//	if ( keyval && gui_filter_password.GetInteger() == 1 ) {
//		// show passworded only
//		if ( keyval.GetValue()[ 0 ] == '0' ) {
//			return true;
//		}
//	} else if ( keyval && gui_filter_password.GetInteger() == 2 ) {
//		// show no password only
//		if ( keyval.GetValue()[ 0 ] != '0' ) {
//			return true;
//		}
//	}
//	// players filter
//	keyval = server.serverInfo.FindKey( "si_maxPlayers" );
//	if ( keyval ) {
//		if ( gui_filter_players.GetInteger() == 1 && server.clients == atoi( keyval.GetValue() ) ) {
//			return true;
//		} else if ( gui_filter_players.GetInteger() == 2 && ( !server.clients || server.clients == atoi( keyval.GetValue() ) ) ) {
//			return true;
//		}
//	}
//	// gametype filter
//	keyval = server.serverInfo.FindKey( "si_gameType" );
//	if ( keyval && gui_filter_gameType.GetInteger() ) {
//		i = 0;
//		while ( l_gameTypes[ i ] ) {
//			if ( !keyval.GetValue().Icmp( l_gameTypes[ i ] ) ) {
//				break;
//			}
//			i++;
//		}
//		if ( l_gameTypes[ i ] && i != gui_filter_gameType.GetInteger() -1 ) {
//			return true;
//		}
//	}
//	// idle server filter
//	keyval = server.serverInfo.FindKey( "si_idleServer" );
//	if ( keyval && !gui_filter_idle.GetInteger() ) {
//		if ( !keyval.GetValue().Icmp( "1" ) ) {
//			return true;
//		}
//	}
//
//	// autofilter D3XP games if the user does not has the XP installed
//	if(!fileSystem.HasD3XP() && !idStr::Icmp(server.serverInfo.GetString( "fs_game" ), "d3xp")) {
//		return true;
//	}
//
//	// filter based on the game doom or XP
//	if(gui_filter_game.GetInteger() == 1) { //Only Doom
//		if(idStr::Icmp(server.serverInfo.GetString("fs_game"), "")) {
//			return true;
//		}
//	} else if(gui_filter_game.GetInteger() == 2) { //Only D3XP
//		if(idStr::Icmp(server.serverInfo.GetString("fs_game"), "d3xp")) {
//			return true;
//		}
//	}
//
//	return false;
//}
//
///*
//================
//idServerScan::Cmp
//================
//*/
//
//int idServerScan::Cmp( const int *a, const int *b ) {
//	networkServer_t serv1, serv2;
//	idStr s1, s2;
//	int ret;
//
//	serv1 = (*l_serverScan)[ *a ];
//	serv2 = (*l_serverScan)[ *b ];
//	switch ( l_serverScan.m_sort ) {
//		case serverSort_t.SORT_PING:
//			ret = serv1.ping < serv2.ping ? -1 : ( serv1.ping > serv2.ping ? 1 : 0 );
//			return ret;
//		case SORT_SERVERNAME:
//			serv1.serverInfo.GetString( "si_name", "", s1 );
//			serv2.serverInfo.GetString( "si_name", "", s2 );
//			return s1.IcmpNoColor( s2 );
//		case SORT_PLAYERS:
//			ret = serv1.clients < serv2.clients ? -1 : ( serv1.clients > serv2.clients ? 1 : 0 );
//			return ret;
//		case SORT_GAMETYPE:
//			serv1.serverInfo.GetString( "si_gameType", "", s1 );
//			serv2.serverInfo.GetString( "si_gameType", "", s2 );
//			return s1.Icmp( s2 );
//		case SORT_MAP:
//			serv1.serverInfo.GetString( "si_mapName", "", s1 );
//			serv2.serverInfo.GetString( "si_mapName", "", s2 );
//			return s1.Icmp( s2 );
//		case SORT_GAME:
//			serv1.serverInfo.GetString( "fs_game", "", s1 );
//			serv2.serverInfo.GetString( "fs_game", "", s2 );
//			return s1.Icmp( s2 );
//	}
//	return 0;
//}
//
///*
//================
//idServerScan::SetSorting
//================
//*/
//void idServerScan::SetSorting( serverSort_t sort ) {
//	l_serverScan = this;
//	if ( sort == m_sort ) {
//		m_sortAscending = !m_sortAscending;
//	} else {
//		m_sort = sort;
//		m_sortAscending = true; // is the default for any new sort
//		this.m_sortedServers.Sort( idServerScan::Cmp );
//	}
//	// trigger a redraw
//	ApplyFilter();
//}
//
}