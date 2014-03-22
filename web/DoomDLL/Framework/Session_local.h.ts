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
//#ifndef __SESSIONLOCAL_H__
//#define __SESSIONLOCAL_H__
//
///*
//
//IsConnectedToServer();
//IsGameLoaded();
//IsGuiActive();
//IsPlayingRenderDemo();
//
//if connected to a server
//	if handshaking
//	if map loading
//	if in game
//else if a game loaded
//	if in load game menu
//	if main menu up
//else if playing render demo
//else
//	if error dialog
//	full console
//
//*/
//
//typedef struct {
//	usercmd_t	cmd;
//	int			consistencyHash;
//} logCmd_t;
//
//struct fileTIME_T {
//	int				index;
//	ID_TIME_T			timeStamp;
//
//					operator int() const { return timeStamp; }
//};
//
class mapSpawnData_t {
	serverInfo = new idDict;
	syncedCVars = new idDict;
	userInfo = newStructArray<idDict>( idDict, MAX_ASYNC_CLIENTS );
	persistentPlayerInfo = newStructArray<idDict>( idDict, MAX_ASYNC_CLIENTS );
	mapSpawnUsercmd = newStructArray<usercmd_t>(usercmd_t, MAX_ASYNC_CLIENTS); // needed for tracking delta angles

	init ( ): void {
		this.serverInfo.Clear ( );
		this.syncedCVars.Clear ( );
		clearStructArray( this.userInfo );
		clearStructArray( this.persistentPlayerInfo );
		clearStructArray( this.mapSpawnUsercmd );
	}
}

enum timeDemo_t{
	TD_NO,
	TD_YES,
	TD_YES_THEN_QUIT
};
//
//const int USERCMD_PER_DEMO_FRAME	= 2;
//const int CONNECT_TRANSMIT_TIME		= 1000;
//const int MAX_LOGGED_USERCMDS		= 60*60*60;	// one hour of single player, 15 minutes of four player
//
class idSessionLocal extends idSession {
//public:
//
	/*
	===============
	idSessionLocal::idSessionLocal
	===============
	*/
	constructor() {
		super ( );
		this.guiInGame = this.guiMainMenu = this.guiIntro = this.guiRestartMenu = this.guiLoading = this.guiGameOver = this.guiActive = this.guiTest = this.guiMsg = this.guiMsgRestore = this.guiTakeNotes = null;
	
		this.menuSoundWorld = null;
	
		this.Clear();
	}
//	virtual				~idSessionLocal();
//
	Init ( ): void { throw "placeholder"; }
//
//	virtual void		Shutdown();
//
//	virtual void		Stop();
//
	UpdateScreen ( outOfSequence: boolean = true ): void { throw "placeholder"; }

	PacifierUpdate ( ): void { throw "placeholder"; }

	Frame():void { throw "placeholder"; }

	IsMultiplayer ( ): boolean { throw "placeholder"; }

//	virtual bool		ProcessEvent( const sysEvent_t *event );
//
//	virtual void		StartMenu( bool playIntro = false );
//	virtual void		ExitMenu();
//	virtual void		GuiFrameEvents();
//	virtual void		SetGUI( idUserInterface *gui, HandleGuiCommand_t handle );
//
//	virtual const char *MessageBox( msgBoxType_t type, const char *message, const char *title = NULL, bool wait = false, const char *fire_yes = NULL, const char *fire_no = NULL, bool network = false  );
//	virtual void		StopBox( void );
//	virtual void		DownloadProgressBox( backgroundDownload_t *bgl, const char *title, int progress_start = 0, int progress_end = 100 );
//	virtual void		SetPlayingSoundWorld();
//
//	virtual void		TimeHitch( int msec );
//
//	virtual void		ReadCDKey( void );
//	virtual void		WriteCDKey( void );
//	virtual const char *GetCDKey( bool xp );
//	virtual bool		CheckKey( const char *key, bool netConnect, bool offline_valid[ 2 ] );
//	virtual bool		CDKeysAreValid( bool strict );
//	virtual void		ClearCDKey( bool valid[ 2 ] );
//	virtual void		SetCDKeyGuiVars( void );
//	virtual bool		WaitingForGameAuth( void );
//	virtual void		CDKeysAuthReply( bool valid, const char *auth_msg );
//
//	virtual int			GetSaveGameVersion( void );
//
//	virtual const char *GetCurrentMapName();
//
	//=====================================
//
	GetLocalClientNum():number/*int*/  { throw "placeholder"; }

	MoveToNewMap ( mapName: string ): void { throw "placeholder"; }

	// loads a map and starts a new game on it
	StartNewGame ( mapName: string, devmap = false ): void { throw "placeholder"; }
//	void				PlayIntroGui();
//
//	void				LoadSession( name:string );
//	void				SaveSession( name:string );
//
//	// called by Draw when the scene to scene wipe is still running
	DrawWipeModel ( ): void { throw "placeholder"; }
	StartWipe ( _wipeMaterial: string, hold: boolean = false ): void { throw "placeholder"; }
	CompleteWipe ( ): void { throw "placeholder"; }
//
	ShowLoadingGui():void { throw "placeholder"; }
//
//	void				ScrubSaveGameFileName( idStr &saveFileName ) const;
	GetAutoSaveName ( mapName: string ): idStr { throw "placeholder"; }
//
//	bool				LoadGame(const char *saveName);
	SaveGame(saveName:string, autosave = false):boolean { throw "placeholder"; }
//
//	const char			*GetAuthMsg( void );

	//=====================================

	static com_showAngles:idCVar;
	static com_showTics:idCVar;
	static com_minTics:idCVar;
	static com_fixedTic:idCVar;
	static com_showDemo:idCVar;
	static com_skipGameDraw:idCVar;
	static com_aviDemoWidth:idCVar;
	static com_aviDemoHeight:idCVar;
	static com_aviDemoSamples:idCVar;
	static com_aviDemoTics:idCVar;
	static com_wipeSeconds:idCVar;
	static com_guid:idCVar;

	static gui_configServerRate:idCVar;

	timeHitch:number/*int*/;

	menuActive:boolean;
	menuSoundWorld: idSoundWorld;			// so the game soundWorld can be muted

	insideExecuteMapChange:boolean;	// draw loading screen and update
												// screen on prints
	bytesNeededForMapLoad:number/*int*/;	// 

	// we don't want to redraw the loading screen for every single
	// console print that happens
	lastPacifierTime:number/*int*/;

	// this is the information required to be set before ExecuteMapChange() is called,
	// which can be saved off at any time with the following commands so it can all be played back
	mapSpawnData = new mapSpawnData_t;
	currentMapName = new idStr;			// for checking reload on same level
	mapSpawned:boolean;				// cleared on Stop()

	numClients: number/*int*/;				// from serverInfo

	logIndex:number/*int*/;
//	logCmd_t			loggedUsercmds[MAX_LOGGED_USERCMDS];
	statIndex:number/*int*/;
//	logStats_t			loggedStats[MAX_LOGGED_STATS];
	lastSaveIndex:number/*int*/;
	// each game tic, numClients usercmds will be added, until full

	insideUpdateScreen:boolean;	// true while inside ::UpdateScreen()

	loadingSaveGame:boolean;	// currently loading map from a SaveGame
	savegameFile:idFile ;		// this is the savegame file to load from
	savegameVersion:number/*int*/;

	cmdDemoFile:idFile ;		// if non-zero, we are reading commands from a file

	latchedTicNumber: number/*int*/;	// set to com_ticNumber each frame
	lastGameTic:number/*int*/;		// while latchedTicNumber > lastGameTic, run game frames
	lastDemoTic:number/*int*/;
	syncNextGameFrame:boolean;


	aviCaptureMode:boolean;		// if true, screenshots will be taken and sound captured
	aviDemoShortName = new idStr;	// 
	aviDemoFrameCount: number/*float*/;
	aviTicStart:number/*int*/;

	timeDemo: timeDemo_t;
	timeDemoStartTime:number/*int*/;
	numDemoFrames:number/*int*/;		// for timeDemo and demoShot
	demoTimeOffset:number/*int*/;
	currentDemoRenderView = new renderView_t;
	// the next one will be read when 
	// com_frameTime + demoTimeOffset > currentDemoRenderView.

	// TODO: make this private (after sync networking removal and idnet tweaks)
	guiActive: idUserInterface;
	guiHandle: (str: string) => string; /*HandleGuiCommand_t*/ 

	guiInGame: idUserInterface;
	guiMainMenu: idUserInterface;
	guiMainMenu_MapList: idListGUI;		// easy map list handling
	guiRestartMenu:idUserInterface;
	guiLoading:idUserInterface;
	guiIntro:idUserInterface;
	guiGameOver:idUserInterface;
	guiTest:idUserInterface;
	guiTakeNotes:idUserInterface;
	
	guiMsg: idUserInterface;
	guiMsgRestore: idUserInterface ;				// store the calling GUI for restore
	msgFireBack = [new idStr, new idStr];
	msgRunning:boolean;
	msgRetIndex:number/*int*/;
	msgIgnoreButtons:boolean;

	waitingOnBind:boolean;

	whiteMaterial: idMaterial;

	wipeMaterial: idMaterial;
	wipeStartTic:number/*int*/;
	wipeStopTic:number/*int*/;
	wipeHold:boolean;

//#if ID_CONSOLE_LOCK
	emptyDrawCount: number/*int*/;				// watchdog to force the main menu to restart
//#endif
//
	//=====================================
	DrawCmdGraph ( ): void { throw "placeholder"; }
	Draw ( ): void { throw "placeholder"; }
//
//	void				WriteCmdDemo( const char *name, bool save = false);
//	void				StartPlayingCmdDemo( const char *demoName);
//	void				TimeCmdDemo( const char *demoName);
//	void				SaveCmdDemoToFile(idFile *file);
//	void				LoadCmdDemoFromFile(idFile *file);
//	void				StartRecordingRenderDemo( const char *name );
//	void				StopRecordingRenderDemo();
//	void				StartPlayingRenderDemo( idStr name );
	StopPlayingRenderDemo ( ): void { throw "placeholder"; }
//	void				CompressDemoFile( const char *scheme, const char *name );
//	void				TimeRenderDemo( const char *name, bool twice = false );
//	void				AVIRenderDemo( const char *name );
//	void				AVICmdDemo( const char *name );
//	void				AVIGame( const char *name );
//	void				BeginAVICapture( const char *name );
//	void				EndAVICapture();
//
//	void				AdvanceRenderDemo( bool singleFrameOnly );
	RunGameTic ( ): void { throw "placeholder"; }

	FinishCmdLoad ( ): void { throw "placeholder"; }
	LoadLoadingGui ( mapName: string ): void { throw "placeholder"; }
//
//	void				DemoShot( const char *name );
//
//	void				TestGUI( const char *name );
//
	GetBytesNeededForMapLoad ( mapName: string ): number { throw "placeholder"; }
	SetBytesNeededForMapLoad ( mapName: string, /*int */bytesNeeded: number ): void { throw "placeholder"; }
//
	ExecuteMapChange ( noFadeWipe: boolean = false ): void { throw "placeholder"; }
	UnloadMap():void { throw "placeholder"; }
//
//	// return true if we actually waiting on an auth reply
//	bool				MaybeWaitOnCDKey( void );

	//------------------
	// Session_menu.cpp

	loadGameList = new idStrList;
	modsList = new idStrList;

//	idUserInterface *	GetActiveMenu();
//
//	void				DispatchCommand( idUserInterface *gui, const char *menuCommand, bool doIngame = true );
//	void				MenuEvent( const sysEvent_t *event );
//	bool				HandleSaveGameMenuCommand( idCmdArgs &args, int &icmd );
//	void				HandleInGameCommands( const char *menuCommand );
//	void				HandleMainMenuCommands( const char *menuCommand );
//	void				HandleChatMenuCommands( const char *menuCommand );
//	void				HandleIntroMenuCommands( const char *menuCommand );
//	void				HandleRestartMenuCommands( const char *menuCommand );
//	void				HandleMsgCommands( const char *menuCommand );
//	void				HandleNoteCommands( const char *menuCommand );
//	void				GetSaveGameList( idStrList &fileList, idList<fileTIME_T> &fileTimes );
//	void				TakeNotes( const char * p, bool extended = false );
//	void				UpdateMPLevelShot( void );
//
//	void				SetSaveGameGuiVars( void );
//	void				SetMainMenuGuiVars( void );
//	void				SetModsMenuGuiVars( void );
//	void				SetMainMenuSkin( void );
//	void				SetPbMenuGuiVars( void );
//	
//private:
//	bool				BoxDialogSanityCheck( void );
//	void				EmitGameAuth( void );
//	
//	typedef enum {
//		CDKEY_UNKNOWN,	// need to perform checks on the key
//		CDKEY_INVALID,	// that key is wrong
//		CDKEY_OK,		// valid
//		CDKEY_CHECKING, // sent a check request ( gameAuth only )
//		CDKEY_NA		// does not apply, xp key when xp is not present
//	} cdKeyState_t;
//
//	static const int	CDKEY_BUF_LEN = 17;
//	static const int	CDKEY_AUTH_TIMEOUT = 5000;
//
//	char				cdkey[ CDKEY_BUF_LEN ];
//	cdKeyState_t		cdkey_state;
//	char				xpkey[ CDKEY_BUF_LEN ];
//	cdKeyState_t		xpkey_state;
	authEmitTimeout:number;
	authWaitBox:boolean;

	authMsg = new idStr;



/*
===============
idSessionLocal::Clear
===============
*/
	Clear ( ): void {

		this.insideUpdateScreen = false;
		this.insideExecuteMapChange = false;

		this.loadingSaveGame = false;
		this.savegameFile = null;
		this.savegameVersion = 0;

		this.currentMapName.Clear ( );
		this.aviDemoShortName.Clear ( );
		this.msgFireBack[0].Clear ( );
		this.msgFireBack[1].Clear ( );

		this.timeHitch = 0;

		this.rw = null;
		this.sw = null;
		this.menuSoundWorld = null;
		this.readDemo = null;
		this.writeDemo = null;
		this.renderdemoVersion = 0;
		this.cmdDemoFile = null;

		this.syncNextGameFrame = false;
		this.mapSpawned = false;
		this.guiActive = null;
		this.aviCaptureMode = false;
		this.timeDemo = timeDemo_t.TD_NO;
		this.waitingOnBind = false;
		this.lastPacifierTime = 0;

		this.msgRunning = false;
		this.guiMsgRestore = null;
		this.msgIgnoreButtons = false;

		this.bytesNeededForMapLoad = 0;

		//#if ID_CONSOLE_LOCK
		//	emptyDrawCount = 0;
		//#endif
		this.ClearWipe ( );

		this.loadGameList.Clear ( );
		this.modsList.Clear ( );

		this.authEmitTimeout = 0;
		this.authWaitBox = false;

		this.authMsg.Clear ( );
	}

	/*
	================
	idSessionLocal::ClearWipe
	================
	*/
	ClearWipe ( ): void {
		this.wipeHold = false;
		this.wipeStopTic = 0;
		this.wipeStartTic = this.wipeStopTic + 1;
	}
};
//
//extern idSessionLocal	sessLocal;
//
//#endif /* !__SESSIONLOCAL_H__ */



var sessLocal = new idSessionLocal();
var session: idSessionLocal = sessLocal;