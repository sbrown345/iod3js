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
//#include "../idlib/precompiled.h"
//#pragma hdrstop
//
//#include "Session_local.h"
//
///*
//================
//usercmd_t::ByteSwap
//================
//*/
//void usercmd_t::ByteSwap( ) {
//	angles[0] = LittleShort( angles[0] );
//	angles[1] = LittleShort( angles[1] );
//	angles[2] = LittleShort( angles[2] );
//	sequence = LittleLong( sequence );
//}
//
///*
//================
//usercmd_t::operator==
//================
//*/
//bool usercmd_t::operator==( const usercmd_t &rhs ) const { 
//	return ( buttons == rhs.buttons &&
//			forwardmove == rhs.forwardmove &&
//			rightmove == rhs.rightmove &&
//			upmove == rhs.upmove &&
//			angles[0] == rhs.angles[0] &&
//			angles[1] == rhs.angles[1] &&
//			angles[2] == rhs.angles[2] &&
//			this.impulse == rhs.impulse &&
//			flags == rhs.flags &&
//			mx == rhs.mx &&
//			my == rhs.my );
//}
//
//
var KEY_MOVESPEED	= 127;

enum usercmdButton_t{
	UB_NONE,

	UB_UP,
	UB_DOWN,
	UB_LEFT,
	UB_RIGHT,
	UB_FORWARD,
	UB_BACK,
	UB_LOOKUP,
	UB_LOOKDOWN,
	UB_STRAFE,
	UB_MOVELEFT,
	UB_MOVERIGHT,

	UB_BUTTON0,
	UB_BUTTON1,
	UB_BUTTON2,
	UB_BUTTON3,
	UB_BUTTON4,
	UB_BUTTON5,
	UB_BUTTON6,
	UB_BUTTON7,

	UB_ATTACK,
	UB_SPEED,
	UB_ZOOM,
	UB_SHOWSCORES,
	UB_MLOOK,

	UB_IMPULSE0,
	UB_IMPULSE1,
	UB_IMPULSE2,
	UB_IMPULSE3,
	UB_IMPULSE4,
	UB_IMPULSE5,
	UB_IMPULSE6,
	UB_IMPULSE7,
	UB_IMPULSE8,
	UB_IMPULSE9,
	UB_IMPULSE10,
	UB_IMPULSE11,
	UB_IMPULSE12,
	UB_IMPULSE13,
	UB_IMPULSE14,
	UB_IMPULSE15,
	UB_IMPULSE16,
	UB_IMPULSE17,
	UB_IMPULSE18,
	UB_IMPULSE19,
	UB_IMPULSE20,
	UB_IMPULSE21,
	UB_IMPULSE22,
	UB_IMPULSE23,
	UB_IMPULSE24,
	UB_IMPULSE25,
	UB_IMPULSE26,
	UB_IMPULSE27,
	UB_IMPULSE28,
	UB_IMPULSE29,
	UB_IMPULSE30,
	UB_IMPULSE31,
	UB_IMPULSE32,
	UB_IMPULSE33,
	UB_IMPULSE34,
	UB_IMPULSE35,
	UB_IMPULSE36,
	UB_IMPULSE37,
	UB_IMPULSE38,
	UB_IMPULSE39,
	UB_IMPULSE40,
	UB_IMPULSE41,
	UB_IMPULSE42,
	UB_IMPULSE43,
	UB_IMPULSE44,
	UB_IMPULSE45,
	UB_IMPULSE46,
	UB_IMPULSE47,
	UB_IMPULSE48,
	UB_IMPULSE49,
	UB_IMPULSE50,
	UB_IMPULSE51,
	UB_IMPULSE52,
	UB_IMPULSE53,
	UB_IMPULSE54,
	UB_IMPULSE55,
	UB_IMPULSE56,
	UB_IMPULSE57,
	UB_IMPULSE58,
	UB_IMPULSE59,
	UB_IMPULSE60,
	UB_IMPULSE61,
	UB_IMPULSE62,
	UB_IMPULSE63,

	UB_MAX_BUTTONS
};

class userCmdString_t {
	constructor($string: string, button: usercmdButton_t) {
		this.$string = $string;
		this.button = button;
	}
	$string: string;
	button: usercmdButton_t;
}

var userCmdStrings = [
	new userCmdString_t( "_moveUp",			usercmdButton_t.UB_UP ),
	new userCmdString_t( "_moveDown",		usercmdButton_t.UB_DOWN ),
	new userCmdString_t( "_left",			usercmdButton_t.UB_LEFT ),
	new userCmdString_t( "_right",			usercmdButton_t.UB_RIGHT ),
	new userCmdString_t( "_forward",		usercmdButton_t.UB_FORWARD ),
	new userCmdString_t( "_back",			usercmdButton_t.UB_BACK ),
	new userCmdString_t( "_lookUp",			usercmdButton_t.UB_LOOKUP ),
	new userCmdString_t( "_lookDown",		usercmdButton_t.UB_LOOKDOWN ),
	new userCmdString_t( "_strafe",			usercmdButton_t.UB_STRAFE ),
	new userCmdString_t( "_moveLeft",		usercmdButton_t.UB_MOVELEFT ),
	new userCmdString_t( "_moveRight",		usercmdButton_t.UB_MOVERIGHT ),

	new userCmdString_t( "_attack",			usercmdButton_t.UB_ATTACK ),
	new userCmdString_t( "_speed",			usercmdButton_t.UB_SPEED ),
	new userCmdString_t( "_zoom",			usercmdButton_t.UB_ZOOM ),
	new userCmdString_t( "_showScores",		usercmdButton_t.UB_SHOWSCORES ),
	new userCmdString_t( "_mlook",			usercmdButton_t.UB_MLOOK ),

	new userCmdString_t( "_button0",		usercmdButton_t.UB_BUTTON0 ),
	new userCmdString_t( "_button1",		usercmdButton_t.UB_BUTTON1 ),
	new userCmdString_t( "_button2",		usercmdButton_t.UB_BUTTON2 ),
	new userCmdString_t( "_button3",		usercmdButton_t.UB_BUTTON3 ),
	new userCmdString_t( "_button4",		usercmdButton_t.UB_BUTTON4 ),
	new userCmdString_t( "_button5",		usercmdButton_t.UB_BUTTON5 ),
	new userCmdString_t( "_button6",		usercmdButton_t.UB_BUTTON6 ),
	new userCmdString_t( "_button7",		usercmdButton_t.UB_BUTTON7 ),

	new userCmdString_t( "_impulse0",		usercmdButton_t.UB_IMPULSE0 ),
	new userCmdString_t( "_impulse1",		usercmdButton_t.UB_IMPULSE1 ),
	new userCmdString_t( "_impulse2",		usercmdButton_t.UB_IMPULSE2 ),
	new userCmdString_t( "_impulse3",		usercmdButton_t.UB_IMPULSE3 ),
	new userCmdString_t( "_impulse4",		usercmdButton_t.UB_IMPULSE4 ),
	new userCmdString_t( "_impulse5",		usercmdButton_t.UB_IMPULSE5 ),
	new userCmdString_t( "_impulse6",		usercmdButton_t.UB_IMPULSE6 ),
	new userCmdString_t( "_impulse7",		usercmdButton_t.UB_IMPULSE7 ),
	new userCmdString_t( "_impulse8",		usercmdButton_t.UB_IMPULSE8 ),
	new userCmdString_t( "_impulse9",		usercmdButton_t.UB_IMPULSE9 ),
	new userCmdString_t( "_impulse10",		usercmdButton_t.UB_IMPULSE10 ),
	new userCmdString_t( "_impulse11",		usercmdButton_t.UB_IMPULSE11 ),
	new userCmdString_t( "_impulse12",		usercmdButton_t.UB_IMPULSE12 ),
	new userCmdString_t( "_impulse13",		usercmdButton_t.UB_IMPULSE13 ),
	new userCmdString_t( "_impulse14",		usercmdButton_t.UB_IMPULSE14 ),
	new userCmdString_t( "_impulse15",		usercmdButton_t.UB_IMPULSE15 ),
	new userCmdString_t( "_impulse16",		usercmdButton_t.UB_IMPULSE16 ),
	new userCmdString_t( "_impulse17",		usercmdButton_t.UB_IMPULSE17 ),
	new userCmdString_t( "_impulse18",		usercmdButton_t.UB_IMPULSE18 ),
	new userCmdString_t( "_impulse19",		usercmdButton_t.UB_IMPULSE19 ),
	new userCmdString_t( "_impulse20",		usercmdButton_t.UB_IMPULSE20 ),
	new userCmdString_t( "_impulse21",		usercmdButton_t.UB_IMPULSE21 ),
	new userCmdString_t( "_impulse22",		usercmdButton_t.UB_IMPULSE22 ),
	new userCmdString_t( "_impulse23",		usercmdButton_t.UB_IMPULSE23 ),
	new userCmdString_t( "_impulse24",		usercmdButton_t.UB_IMPULSE24 ),
	new userCmdString_t( "_impulse25",		usercmdButton_t.UB_IMPULSE25 ),
	new userCmdString_t( "_impulse26",		usercmdButton_t.UB_IMPULSE26 ),
	new userCmdString_t( "_impulse27",		usercmdButton_t.UB_IMPULSE27 ),
	new userCmdString_t( "_impulse28",		usercmdButton_t.UB_IMPULSE28 ),
	new userCmdString_t( "_impulse29",		usercmdButton_t.UB_IMPULSE29 ),
	new userCmdString_t( "_impulse30",		usercmdButton_t.UB_IMPULSE30 ),
	new userCmdString_t( "_impulse31",		usercmdButton_t.UB_IMPULSE31 ),
	new userCmdString_t( "_impulse32",		usercmdButton_t.UB_IMPULSE32 ),
	new userCmdString_t( "_impulse33",		usercmdButton_t.UB_IMPULSE33 ),
	new userCmdString_t( "_impulse34",		usercmdButton_t.UB_IMPULSE34 ),
	new userCmdString_t( "_impulse35",		usercmdButton_t.UB_IMPULSE35 ),
	new userCmdString_t( "_impulse36",		usercmdButton_t.UB_IMPULSE36 ),
	new userCmdString_t( "_impulse37",		usercmdButton_t.UB_IMPULSE37 ),
	new userCmdString_t( "_impulse38",		usercmdButton_t.UB_IMPULSE38 ),
	new userCmdString_t( "_impulse39",		usercmdButton_t.UB_IMPULSE39 ),
	new userCmdString_t( "_impulse40",		usercmdButton_t.UB_IMPULSE40 ),
	new userCmdString_t( "_impulse41",		usercmdButton_t.UB_IMPULSE41 ),
	new userCmdString_t( "_impulse42",		usercmdButton_t.UB_IMPULSE42 ),
	new userCmdString_t( "_impulse43",		usercmdButton_t.UB_IMPULSE43 ),
	new userCmdString_t( "_impulse44",		usercmdButton_t.UB_IMPULSE44 ),
	new userCmdString_t( "_impulse45",		usercmdButton_t.UB_IMPULSE45 ),
	new userCmdString_t( "_impulse46",		usercmdButton_t.UB_IMPULSE46 ),
	new userCmdString_t( "_impulse47",		usercmdButton_t.UB_IMPULSE47 ),
	new userCmdString_t( "_impulse48",		usercmdButton_t.UB_IMPULSE48 ),
	new userCmdString_t( "_impulse49",		usercmdButton_t.UB_IMPULSE49 ),
	new userCmdString_t( "_impulse50",		usercmdButton_t.UB_IMPULSE50 ),
	new userCmdString_t( "_impulse51",		usercmdButton_t.UB_IMPULSE51 ),
	new userCmdString_t( "_impulse52",		usercmdButton_t.UB_IMPULSE52 ),
	new userCmdString_t( "_impulse53",		usercmdButton_t.UB_IMPULSE53 ),
	new userCmdString_t( "_impulse54",		usercmdButton_t.UB_IMPULSE54 ),
	new userCmdString_t( "_impulse55",		usercmdButton_t.UB_IMPULSE55 ),
	new userCmdString_t( "_impulse56",		usercmdButton_t.UB_IMPULSE56 ),
	new userCmdString_t( "_impulse57",		usercmdButton_t.UB_IMPULSE57 ),
	new userCmdString_t( "_impulse58",		usercmdButton_t.UB_IMPULSE58 ),
	new userCmdString_t( "_impulse59",		usercmdButton_t.UB_IMPULSE59 ),
	new userCmdString_t( "_impulse60",		usercmdButton_t.UB_IMPULSE60 ),
	new userCmdString_t( "_impulse61",		usercmdButton_t.UB_IMPULSE61 ),
	new userCmdString_t( "_impulse62",		usercmdButton_t.UB_IMPULSE62 ),
	new userCmdString_t( "_impulse63",		usercmdButton_t.UB_IMPULSE63 ),

	new userCmdString_t( null,				usercmdButton_t.UB_NONE )
];

class buttonState_t {
// public:
	on: number /*int*/;
	held: boolean;

	constructor ( ) { this.Clear ( ); }
//	void	Clear( );
//	void	SetKeyState( int keystate, bool toggle );


	/*
================
buttonState_t::Clear
================
*/
	Clear ( ): void {
		this.held = false;
		this.on = 0;
	}

///*
//================
//buttonState_t::SetKeyState
//================
//*/
//void buttonState_t::SetKeyState( int keystate, bool toggle ) {
//	if ( !toggle ) {
//		held = false;
//		on = keystate;
//	} else if ( !keystate ) {
//		held = false;
//	} else if ( !held ) {
//		held = true;
//		on ^= 1;
//	}
//}
}

//
//const int NUM_USER_COMMANDS = sizeof(userCmdStrings) / sizeof(userCmdString_t);
//
//const int MAX_CHAT_BUFFER = 127;
//
class idUsercmdGenLocal extends idUsercmdGen {
//public:
//					idUsercmdGenLocal( );
//	
//	void			Init( );
//
//	void			InitForNewMap( );
//
//	void			Shutdown( );
//
//	void			Clear( );
//
//	void			ClearAngles( );
//
//	usercmd_t		TicCmd( int ticNumber );
//
//	void			InhibitUsercmd( inhibit_t subsystem, bool inhibit );
//
//	void			UsercmdInterrupt( );
//
//	int				CommandStringUsercmdData( const char *cmdString );
//
//	int				GetNumUserCommands( );
//
//	const char *	GetUserCommandName( int index );
//
//	void			MouseState( int *x, int *y, int *button, bool *down );
//
//	int				ButtonState( int key );
//	int				KeyState( int key );
//
//	usercmd_t		GetDirectUsercmd( );
//
//private:
//	void			MakeCurrent( );
//	void			InitCurrent( );
//
//	bool			Inhibited( );
//	void			AdjustAngles( );
//	void			KeyMove( );
//	void			JoystickMove( );
//	void			MouseMove( );
//	void			CmdButtons( );
//
//	void			Mouse( );
//	void			Keyboard( );
//	void			Joystick( );
//
//	void			Key( int keyNum, bool down );
//
	viewangles = new idVec3;
	flags: number/*int*/;
	impulse: number/*int*/;

	toggled_crouch = new buttonState_t;
	toggled_run = new buttonState_t;
	toggled_zoom = new buttonState_t;

	buttonState = new Int32Array(usercmdButton_t.UB_MAX_BUTTONS);
	keyState = new Array<boolean>(keyNum_t.K_LAST_KEY);

	inhibitCommands:boolean;	// true when in console or menu locally		  //int				
	lastCommandTime: number;												  //int				

	initialized: boolean;
//
//	usercmd_t		cmd;		// the current cmd being built
//	usercmd_t		buffered[MAX_BUFFERED_USERCMD];
//
//	int				continuousMouseX, continuousMouseY;	// for gui event generatioin, never zerod
	mouseButton:number;						// for gui event generatioin //	int				
	mouseDown:boolean;
//
	mouseDx:number; mouseDy:number;	// added to by mouse events //int
//	int				joystickAxis[MAX_JOYSTICK_AXIS];	// set by joystick events
//
	static in_yawSpeed = new idCVar ( "in_yawspeed", "140", CVAR_SYSTEM | CVAR_ARCHIVE | CVAR_FLOAT, "yaw change speed when holding down _left or _right button" );
	static in_pitchSpeed = new idCVar ( "in_pitchspeed", "140", CVAR_SYSTEM | CVAR_ARCHIVE | CVAR_FLOAT, "pitch change speed when holding down look _lookUp or _lookDown button" );
	static in_angleSpeedKey = new idCVar ( "in_anglespeedkey", "1.5", CVAR_SYSTEM | CVAR_ARCHIVE | CVAR_FLOAT, "angle change scale when holding down _speed button" );
	static in_freeLook = new idCVar ( "in_freeLook", "1", CVAR_SYSTEM | CVAR_ARCHIVE | CVAR_BOOL, "look around with mouse  = new idCVar (reverse _mlook button)" );
	static in_alwaysRun = new idCVar ( "in_alwaysRun", "0", CVAR_SYSTEM | CVAR_ARCHIVE | CVAR_BOOL, "always run  = new idCVar (reverse _speed button) - only in MP" );
	static in_toggleRun = new idCVar ( "in_toggleRun", "0", CVAR_SYSTEM | CVAR_ARCHIVE | CVAR_BOOL, "pressing _speed button toggles run on/off - only in MP" );
	static in_toggleCrouch = new idCVar ( "in_toggleCrouch", "0", CVAR_SYSTEM | CVAR_ARCHIVE | CVAR_BOOL, "pressing _movedown button toggles player crouching/standing" );
	static in_toggleZoom = new idCVar ( "in_toggleZoom", "0", CVAR_SYSTEM | CVAR_ARCHIVE | CVAR_BOOL, "pressing _zoom button toggles zoom on/off" );
	static sensitivity = new idCVar ( "sensitivity", "5", CVAR_SYSTEM | CVAR_ARCHIVE | CVAR_FLOAT, "mouse view sensitivity" );
	static m_pitch = new idCVar ( "m_pitch", "0.022", CVAR_SYSTEM | CVAR_ARCHIVE | CVAR_FLOAT, "mouse pitch scale" );
	static m_yaw = new idCVar ( "m_yaw", "0.022", CVAR_SYSTEM | CVAR_ARCHIVE | CVAR_FLOAT, "mouse yaw scale" );
	static m_strafeScale = new idCVar ( "m_strafeScale", "6.25", CVAR_SYSTEM | CVAR_ARCHIVE | CVAR_FLOAT, "mouse strafe movement scale" );
	static m_smooth = new idCVar ( "m_smooth", "1", CVAR_SYSTEM | CVAR_ARCHIVE | CVAR_INTEGER, "number of samples blended for mouse viewing", 1, 8, ArgCompletion_Integer_Template(1,8) );
	static m_strafeSmooth = new idCVar ( "m_strafeSmooth", "4", CVAR_SYSTEM | CVAR_ARCHIVE | CVAR_INTEGER, "number of samples blended for mouse moving", 1, 8, ArgCompletion_Integer_Template(1,8) );
	static m_showMouseRate = new idCVar ( "m_showMouseRate", "0", CVAR_SYSTEM | CVAR_BOOL, "shows mouse movement" );
//};



/*
================
idUsercmdGenLocal::idUsercmdGenLocal
================
*/
	constructor() {
		super ( );
		this.lastCommandTime = 0;
		this.initialized = false;

		this.flags = 0;
		this.impulse = 0;

		this.toggled_crouch.Clear ( );
		this.toggled_run.Clear ( );
		this.toggled_zoom.Clear ( );
		this.toggled_run.on = idUsercmdGenLocal.in_alwaysRun.GetBool ( ) ? 1 : 0;

		this.ClearAngles ( );
		this.Clear ( );
	}
//
///*
//================
//idUsercmdGenLocal::InhibitUsercmd
//================
//*/
//void idUsercmdGenLocal::InhibitUsercmd( inhibit_t subsystem, bool inhibit ) {
//	if ( inhibit ) {
//		inhibitCommands |= 1 << subsystem;
//	} else {
//		inhibitCommands &= ( 0xffffffff ^ ( 1 << subsystem ) );
//	}
//}
//
///*
//===============
//idUsercmdGenLocal::ButtonState
//
//Returns (the fraction of the frame) that the key was down
//===============
//*/
//int	idUsercmdGenLocal::ButtonState( int key ) {
//	if ( key<0 || key>=UB_MAX_BUTTONS ) {
//		return -1;
//	}
//	return ( buttonState[key] > 0 ) ? 1 : 0;
//}
//
///*
//===============
//idUsercmdGenLocal::KeyState
//
//Returns (the fraction of the frame) that the key was down
//bk20060111
//===============
//*/
//int	idUsercmdGenLocal::KeyState( int key ) {
//	if ( key<0 || key>=K_LAST_KEY ) {
//		return -1;
//	}
//	return ( keyState[key] ) ? 1 : 0;
//}
//
//
////=====================================================================
//
//
///*
//================
//idUsercmdGenLocal::GetNumUserCommands
//================
//*/
//int idUsercmdGenLocal::GetNumUserCommands( ) {
//	return NUM_USER_COMMANDS;
//}
//
///*
//================
//idUsercmdGenLocal::GetNumUserCommands
//================
//*/
//const char *idUsercmdGenLocal::GetUserCommandName( int index ) {
//	if (index >= 0 && index < NUM_USER_COMMANDS) {
//		return userCmdStrings[index].string;
//	}
//	return "";
//}
//
///*
//================
//idUsercmdGenLocal::Inhibited
//
//is user cmd generation inhibited
//================
//*/
//bool idUsercmdGenLocal::Inhibited( ) {
//	return ( inhibitCommands != 0);
//}
//
///*
//================
//idUsercmdGenLocal::AdjustAngles
//
//Moves the local angle positions
//================
//*/
//void idUsercmdGenLocal::AdjustAngles( ) {
//	float	speed;
//	
//	if ( this.toggled_run.on ^ ( idUsercmdGenLocal.in_alwaysRun.GetBool() && idAsyncNetwork::IsActive() ) ) {
//		speed = idMath::M_MS2SEC * USERCMD_MSEC * in_angleSpeedKey.GetFloat();
//	} else {
//		speed = idMath::M_MS2SEC * USERCMD_MSEC;
//	}
//
//	if ( !ButtonState( UB_STRAFE ) ) {
//		viewangles[YAW] -= speed * in_yawSpeed.GetFloat() * ButtonState( UB_RIGHT );
//		viewangles[YAW] += speed * in_yawSpeed.GetFloat() * ButtonState( UB_LEFT );
//	}
//
//	viewangles[PITCH] -= speed * in_pitchSpeed.GetFloat() * ButtonState( UB_LOOKUP );
//	viewangles[PITCH] += speed * in_pitchSpeed.GetFloat() * ButtonState( UB_LOOKDOWN );
//}
//
///*
//================
//idUsercmdGenLocal::KeyMove
//
//Sets the usercmd_t based on key states
//================
//*/
//void idUsercmdGenLocal::KeyMove( ) {
//	int		forward, side, up;
//
//	forward = 0;
//	side = 0;
//	up = 0;
//	if ( ButtonState( UB_STRAFE ) ) {
//		side += KEY_MOVESPEED * ButtonState( UB_RIGHT );
//		side -= KEY_MOVESPEED * ButtonState( UB_LEFT );
//	}
//
//	side += KEY_MOVESPEED * ButtonState( UB_MOVERIGHT );
//	side -= KEY_MOVESPEED * ButtonState( UB_MOVELEFT );
//
//	up -= KEY_MOVESPEED * this.toggled_crouch.on;
//	up += KEY_MOVESPEED * ButtonState( UB_UP );
//
//	forward += KEY_MOVESPEED * ButtonState( UB_FORWARD );
//	forward -= KEY_MOVESPEED * ButtonState( UB_BACK );
//
//	cmd.forwardmove = idMath::ClampChar( forward );
//	cmd.rightmove = idMath::ClampChar( side );
//	cmd.upmove = idMath::ClampChar( up );
//}
//
///*
//=================
//idUsercmdGenLocal::MouseMove
//=================
//*/
//void idUsercmdGenLocal::MouseMove( ) {
//	float		mx, my, strafeMx, strafeMy;
//	static int	history[8][2];
//	static int	historyCounter;
//	var/*int*/i:number;
//
//	history[historyCounter&7][0] = mouseDx;
//	history[historyCounter&7][1] = mouseDy;
//	
//	// allow mouse movement to be smoothed together
//	int smooth = m_smooth.GetInteger();
//	if ( smooth < 1 ) {
//		smooth = 1;
//	}
//	if ( smooth > 8 ) {
//		smooth = 8;
//	}
//	mx = 0;
//	my = 0;
//	for ( i = 0 ; i < smooth ; i++ ) {
//		mx += history[ ( historyCounter - i + 8 ) & 7 ][0];
//		my += history[ ( historyCounter - i + 8 ) & 7 ][1];
//	}
//	mx /= smooth;
//	my /= smooth;
//
//	// use a larger smoothing for strafing
//	smooth = m_strafeSmooth.GetInteger();
//	if ( smooth < 1 ) {
//		smooth = 1;
//	}
//	if ( smooth > 8 ) {
//		smooth = 8;
//	}
//	strafeMx = 0;
//	strafeMy = 0;
//	for ( i = 0 ; i < smooth ; i++ ) {
//		strafeMx += history[ ( historyCounter - i + 8 ) & 7 ][0];
//		strafeMy += history[ ( historyCounter - i + 8 ) & 7 ][1];
//	}
//	strafeMx /= smooth;
//	strafeMy /= smooth;
//
//	historyCounter++;
//
//	if ( idMath::Fabs( mx ) > 1000 || idMath::Fabs( my ) > 1000 ) {
//		Sys_DebugPrintf( "idUsercmdGenLocal::MouseMove: Ignoring ridiculous mouse delta.\n" );
//		mx = my = 0;
//	}
//
//	mx *= sensitivity.GetFloat();
//	my *= sensitivity.GetFloat();
//
//	if ( m_showMouseRate.GetBool() ) {
//		Sys_DebugPrintf( "[%3i %3i  = %5.1f %5.1f = %5.1f %5.1f] ", mouseDx, mouseDy, mx, my, strafeMx, strafeMy );
//	}
//
//	mouseDx = 0;
//	mouseDy = 0;
//
//	if ( !strafeMx && !strafeMy ) {
//		return;
//	}
//
//	if ( ButtonState( UB_STRAFE ) || !( cmd.buttons & BUTTON_MLOOK ) ) {
//		// add mouse X/Y movement to cmd
//		strafeMx *= m_strafeScale.GetFloat();
//		strafeMy *= m_strafeScale.GetFloat();
//		// clamp as a vector, instead of separate floats
//		float len = sqrt( strafeMx * strafeMx + strafeMy * strafeMy );
//		if ( len > 127 ) {
//			strafeMx = strafeMx * 127 / len;
//			strafeMy = strafeMy * 127 / len;
//		}
//	}
//
//	if ( !ButtonState( UB_STRAFE ) ) {
//		viewangles[YAW] -= m_yaw.GetFloat() * mx;
//	} else {
//		cmd.rightmove = idMath::ClampChar( (int)(cmd.rightmove + strafeMx) );
//	}
//
//	if ( !ButtonState( UB_STRAFE ) && ( cmd.buttons & BUTTON_MLOOK ) ) {
//		viewangles[PITCH] += m_pitch.GetFloat() * my;
//	} else {
//		cmd.forwardmove = idMath::ClampChar( (int)(cmd.forwardmove - strafeMy) );
//	}
//}
//
///*
//=================
//idUsercmdGenLocal::JoystickMove
//=================
//*/
//void idUsercmdGenLocal::JoystickMove( ) {
//	float	anglespeed;
//
//	if ( this.toggled_run.on ^ ( idUsercmdGenLocal.in_alwaysRun.GetBool() && idAsyncNetwork::IsActive() ) ) {
//		anglespeed = idMath::M_MS2SEC * USERCMD_MSEC * in_angleSpeedKey.GetFloat();
//	} else {
//		anglespeed = idMath::M_MS2SEC * USERCMD_MSEC;
//	}
//
//	if ( !ButtonState( UB_STRAFE ) ) {
//		viewangles[YAW] += anglespeed * in_yawSpeed.GetFloat() * joystickAxis[AXIS_SIDE];
//		viewangles[PITCH] += anglespeed * in_pitchSpeed.GetFloat() * joystickAxis[AXIS_FORWARD];
//	} else {
//		cmd.rightmove = idMath::ClampChar( cmd.rightmove + joystickAxis[AXIS_SIDE] );
//		cmd.forwardmove = idMath::ClampChar( cmd.forwardmove + joystickAxis[AXIS_FORWARD] );
//	}
//
//	cmd.upmove = idMath::ClampChar( cmd.upmove + joystickAxis[AXIS_UP] );
//}
//
///*
//==============
//idUsercmdGenLocal::CmdButtons
//==============
//*/
//void idUsercmdGenLocal::CmdButtons( ) {
//	int		i;
//
//	cmd.buttons = 0;
//
//	// figure button bits
//	for (i = 0 ; i <= 7 ; i++) {
//		if ( ButtonState( (usercmdButton_t)( UB_BUTTON0 + i ) ) ) {
//			cmd.buttons |= 1 << i;
//		}
//	}
//
//	// check the attack button
//	if ( ButtonState( UB_ATTACK ) ) {
//		cmd.buttons |= BUTTON_ATTACK;
//	}
//
//	// check the run button
//	if ( this.toggled_run.on ^ ( idUsercmdGenLocal.in_alwaysRun.GetBool() && idAsyncNetwork::IsActive() ) ) {
//		cmd.buttons |= BUTTON_RUN;
//	}
//
//	// check the zoom button
//	if ( this.toggled_zoom.on ) {
//		cmd.buttons |= BUTTON_ZOOM;
//	}
//
//	// check the scoreboard button
//	if ( ButtonState( UB_SHOWSCORES ) || ButtonState( UB_IMPULSE19 ) ) {
//		// the button is toggled in SP mode as well but without effect
//		cmd.buttons |= BUTTON_SCORES;
//	}
//
//	// check the mouse look button
//	if ( ButtonState( UB_MLOOK ) ^ in_freeLook.GetInteger() ) {
//		cmd.buttons |= BUTTON_MLOOK;
//	}
//}
//
///*
//================
//idUsercmdGenLocal::InitCurrent
//
//inits the current command for this frame
//================
//*/
//void idUsercmdGenLocal::InitCurrent( ) {
//	memset( &cmd, 0, sizeof( cmd ) );
//	cmd.flags = this.flags;
//	cmd.impulse = impulse;
//	cmd.buttons |= ( idUsercmdGenLocal.in_alwaysRun.GetBool() && idAsyncNetwork::IsActive() ) ? BUTTON_RUN : 0;
//	cmd.buttons |= in_freeLook.GetBool() ? BUTTON_MLOOK : 0;
//}
//
///*
//================
//idUsercmdGenLocal::MakeCurrent
//
//creates the current command for this frame
//================
//*/
//void idUsercmdGenLocal::MakeCurrent( ) {
//	idVec3		oldAngles;
//	int		i;
//
//	oldAngles = viewangles;
//	
//	if ( !Inhibited() ) {
//		// update toggled key states
//		this.toggled_crouch.SetKeyState( ButtonState( UB_DOWN ), in_toggleCrouch.GetBool() );
//		this.toggled_run.SetKeyState( ButtonState( UB_SPEED ), in_toggleRun.GetBool() && idAsyncNetwork::IsActive() );
//		this.toggled_zoom.SetKeyState( ButtonState( UB_ZOOM ), in_toggleZoom.GetBool() );
//
//		// keyboard angle adjustment
//		AdjustAngles();
//
//		// set button bits
//		CmdButtons();
//
//		// get basic movement from keyboard
//		KeyMove();
//
//		// get basic movement from mouse
//		MouseMove();
//
//		// get basic movement from joystick
//		JoystickMove();
//
//		// check to make sure the angles haven't wrapped
//		if ( viewangles[PITCH] - oldAngles[PITCH] > 90 ) {
//			viewangles[PITCH] = oldAngles[PITCH] + 90;
//		} else if ( oldAngles[PITCH] - viewangles[PITCH] > 90 ) {
//			viewangles[PITCH] = oldAngles[PITCH] - 90;
//		} 
//	} else {
//		mouseDx = 0;
//		mouseDy = 0;
//	}
//
//	for ( i = 0; i < 3; i++ ) {
//		cmd.angles[i] = ANGLE2SHORT( viewangles[i] );
//	}
//
//	cmd.mx = continuousMouseX;
//	cmd.my = continuousMouseY;
//
//	this.flags = cmd.flags;
//	this.impulse = cmd.impulse;
//
//}

//=====================================================================


/*
================
idUsercmdGenLocal::CommandStringUsercmdData

Returns the button if the command string is used by the async usercmd generator.
================
*/
	CommandStringUsercmdData ( cmdString: string ): number {
		for ( var ucs = 0; userCmdStrings[ucs].$string; ucs++ ) {
			if ( idStr.Icmp( cmdString, userCmdStrings[ucs].$string ) == 0 ) {
				return userCmdStrings[ucs].button;
			}
		}
		return usercmdButton_t.UB_NONE;
	}

/*
================
idUsercmdGenLocal::Init
================
*/
	Init ( ): void {
		this.initialized = true;
	}

/*
================
idUsercmdGenLocal::InitForNewMap
================
*/
	InitForNewMap ( ): void {
		this.flags = 0;
		this.impulse = 0;

		this.toggled_crouch.Clear ( );
		this.toggled_run.Clear ( );
		this.toggled_zoom.Clear ( );
		this.toggled_run.on = idUsercmdGenLocal.in_alwaysRun.GetBool ( ) ? 1 : 0;

		this.Clear ( );
		this.ClearAngles ( );
	}

///*
//================
//idUsercmdGenLocal::Shutdown
//================
//*/
//void idUsercmdGenLocal::Shutdown( ) {
//	initialized = false;
//}

/*
================
idUsercmdGenLocal::Clear
================
*/
	Clear ( ): void {
		// clears all key states 
		memset( this.buttonState, 0, sizeof( this.buttonState ) );
		for ( var i = 0; i < this.keyState.length; i++ ) {
			this.keyState[i] = false;
		}

		this.inhibitCommands = false;

		this.mouseDx = this.mouseDy = 0;
		this.mouseButton = 0;
		this.mouseDown = false;
	}

/*
================
idUsercmdGenLocal::ClearAngles
================
*/
	ClearAngles ( ): void {
		this.viewangles.Zero ( );
	}

///*
//================
//idUsercmdGenLocal::TicCmd
//
//Returns a buffered usercmd
//================
//*/
//usercmd_t idUsercmdGenLocal::TicCmd( int ticNumber ) {
//
//	// the packetClient code can legally ask for com_ticNumber+1, because
//	// it is in the async code and com_ticNumber hasn't been updated yet,
//	// but all other code should never ask for anything > com_ticNumber
//	if ( ticNumber > com_ticNumber+1 ) {
//		common.Error( "idUsercmdGenLocal::TicCmd ticNumber > com_ticNumber" );
//	}
//
//	if ( ticNumber <= com_ticNumber - MAX_BUFFERED_USERCMD ) {
//		// this can happen when something in the game code hitches badly, allowing the
//		// async code to overflow the buffers
//		//common.Printf( "warning: idUsercmdGenLocal::TicCmd ticNumber <= com_ticNumber - MAX_BUFFERED_USERCMD\n" );
//	}
//
//	return buffered[ ticNumber & (MAX_BUFFERED_USERCMD-1) ];
//}
//
////======================================================================
//
//
///*
//===================
//idUsercmdGenLocal::Key
//
//Handles async mouse/keyboard button actions
//===================
//*/
//void idUsercmdGenLocal::Key( int keyNum, bool down ) {
//
//	// Sanity check, sometimes we get double message :(
//	if ( keyState[ keyNum ] == down ) {
//		return;
//	}
//	keyState[ keyNum ] = down;
//
//	int action = idKeyInput::GetUsercmdAction( keyNum );
//
//	if ( down ) {
//
//		buttonState[ action ]++;
//
//		if ( !Inhibited()  ) {
//			if ( action >= UB_IMPULSE0 && action <= UB_IMPULSE61 ) {
//				cmd.impulse = action - UB_IMPULSE0;
//				cmd.flags ^= UCF_IMPULSE_SEQUENCE;
//			}
//		}
//	} else {
//		buttonState[ action ]--;
//		// we might have one held down across an app active transition
//		if ( buttonState[ action ] < 0 ) {
//			buttonState[ action ] = 0;
//		}
//	}
//}
//
///*
//===================
//idUsercmdGenLocal::Mouse
//===================
//*/
//void idUsercmdGenLocal::Mouse( ) {
//	int i, numEvents;
//
//	numEvents = Sys_PollMouseInputEvents();
//
//	if ( numEvents ) {
//		//
//	    // Study each of the buffer elements and process them.
//		//
//		for( i = 0; i < numEvents; i++ ) {
//			int action, value;
//			if ( Sys_ReturnMouseInputEvent( i, action, value ) ) {
//				if ( action >= M_ACTION1 && action <= M_ACTION8 ) {
//					mouseButton = K_MOUSE1 + ( action - M_ACTION1 );
//					mouseDown = ( value != 0 );
//					Key( mouseButton, mouseDown );
//				} else {
//					switch ( action ) {
//						case M_DELTAX:
//							mouseDx += value;
//							continuousMouseX += value;
//							break;
//						case M_DELTAY:
//							mouseDy += value;
//							continuousMouseY += value;
//							break;
//						case M_DELTAZ:
//							int key = value < 0 ? K_MWHEELDOWN : K_MWHEELUP;
//							value = abs( value );
//							while( value-- > 0 ) {
//								Key( key, true );
//								Key( key, false );
//								mouseButton = key;
//								mouseDown = true;
//							}
//							break;
//					}
//				}
//			}
//		}
//	}
//
//	Sys_EndMouseInputEvents();
//}
//
///*
//===============
//idUsercmdGenLocal::Keyboard
//===============
//*/
//void idUsercmdGenLocal::Keyboard( ) {
//
//	int numEvents = Sys_PollKeyboardInputEvents();
//
//	if ( numEvents ) {
//		//
//	    // Study each of the buffer elements and process them.
//		//
//		int key;
//		bool state;
//		for( int i = 0; i < numEvents; i++ ) {
//			if (Sys_ReturnKeyboardInputEvent( i, key, state )) {
//				Key ( key, state );
//			}
//		}
//	}
//
//	Sys_EndKeyboardInputEvents();
//}
//
///*
//===============
//idUsercmdGenLocal::Joystick
//===============
//*/
//void idUsercmdGenLocal::Joystick( ) {
//	memset( joystickAxis, 0, sizeof( joystickAxis ) );
//}
//
///*
//================
//idUsercmdGenLocal::UsercmdInterrupt
//
//Called asyncronously
//================
//*/
//void idUsercmdGenLocal::UsercmdInterrupt( ) {
//	// dedicated servers won't create usercmds
//	if ( !initialized ) {
//		return;
//	}
//
//	// init the usercmd for com_ticNumber+1
//	InitCurrent();
//
//	// process the system mouse events
//	Mouse();
//
//	// process the system keyboard events
//	Keyboard();
//
//	// process the system joystick events
//	Joystick();
//
//	// create the usercmd for com_ticNumber+1
//	MakeCurrent();
//
//	// save a number for debugging cmdDemos and networking
//	cmd.sequence = com_ticNumber+1;
//
//	buffered[(com_ticNumber+1) & (MAX_BUFFERED_USERCMD-1)] = cmd;
//}
//
///*
//================
//idUsercmdGenLocal::MouseState
//================
//*/
//void idUsercmdGenLocal::MouseState( int *x, int *y, int *button, bool *down ) {
//	*x = continuousMouseX;
//	*y = continuousMouseY;
//	*button = mouseButton;
//	*down = mouseDown;
//}
//
///*
//================
//idUsercmdGenLocal::GetDirectUsercmd
//================
//*/
//usercmd_t idUsercmdGenLocal::GetDirectUsercmd( ) {
//
//	// initialize current usercmd
//	InitCurrent();
//
//	// process the system mouse events
//	Mouse();
//
//	// process the system keyboard events
//	Keyboard();
//
//	// process the system joystick events
//	Joystick();
//
//	// create the usercmd
//	MakeCurrent();
//
//	cmd.duplicateCount = 0;
//
//	return cmd;
//}
}

var localUsercmdGen = new idUsercmdGenLocal ( );
var usercmdGen = localUsercmdGen;
