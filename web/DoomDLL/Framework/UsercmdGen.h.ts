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
//#ifndef __USERCMDGEN_H__
//#define __USERCMDGEN_H__
//
///*
//===============================================================================
//
//	Samples a set of user commands from player input.
//
//===============================================================================
//*/
//
var USERCMD_HZ			= 60;			// 60 frames per second
var USERCMD_MSEC		= int(1000 / USERCMD_HZ);
//
// usercmd_t->button bits
var BUTTON_ATTACK			= BIT(0);
var BUTTON_RUN			= BIT(1);
var BUTTON_ZOOM			= BIT(2);
var BUTTON_SCORES			= BIT(3);
var BUTTON_MLOOK			= BIT(4);
var BUTTON_5				= BIT(5);
var BUTTON_6				= BIT(6);
var BUTTON_7				= BIT(7);
//
// usercmd_t->impulse commands
var IMPULSE_0				= 0;			// weap 0
var IMPULSE_1				= 1;			// weap 1
var IMPULSE_2				= 2;			// weap 2
var IMPULSE_3				= 3;			// weap 3
var IMPULSE_4				= 4;			// weap 4
var IMPULSE_5				= 5;			// weap 5
var IMPULSE_6				= 6;			// weap 6
var IMPULSE_7				= 7;			// weap 7
var IMPULSE_8				= 8;			// weap 8
var IMPULSE_9				= 9;			// weap 9
var IMPULSE_10			= 10;			// weap 10
var IMPULSE_11			= 11;			// weap 11
var IMPULSE_12			= 12;			// weap 12
var IMPULSE_13			= 13;			// weap reload
var IMPULSE_14			= 14;			// weap next
var IMPULSE_15			= 15;			// weap prev
var IMPULSE_16			= 16;			// <unused>
var IMPULSE_17			= 17;			// ready to play ( toggles ui_ready )
var IMPULSE_18			= 18;			// center view
var IMPULSE_19			= 19;			// show PDA/INV/MAP
var IMPULSE_20			= 20;			// toggle team ( toggles ui_team )
var IMPULSE_21			= 21;			// <unused>
var IMPULSE_22			= 22;			// spectate
var IMPULSE_23			= 23;			// <unused>
var IMPULSE_24			= 24;			// <unused>
var IMPULSE_25			= 25;			// <unused>
var IMPULSE_26			= 26;			// <unused>
var IMPULSE_27			= 27;			// <unused>
var IMPULSE_28			= 28;			// vote yes
var IMPULSE_29			= 29;			// vote no
var IMPULSE_40			= 40;			// use vehicle

// usercmd_t->flags
var UCF_IMPULSE_SEQUENCE	= 0x0001;		// toggled every time an impulse command is sent

class usercmd_t {
//public:
	gameFrame: number; // frame number								   //	int			
	gameTime: number; // game time								   //	int			
	duplicateCount: number; // duplication count for networking			   //	int			
	buttons: number; // buttons									   //	byte		
	forwardmove: number; // forward/backward movement				   //	signed char	
	rightmove: number; // left/right movement						   //	signed char	
	upmove: number; // up/down movement							   //	signed char	
	angles = new Int8Array( 3 ); // view angles								   //	short		
	mx: number; // mouse delta x							   //	short		
	my: number; // mouse delta y							   //	short		
	impulse: number; // impulse command							   //	signed char 
	flags: number; // additional flags							   //	byte		
	sequence: number; // just for debugging						   //	int			
//
//public:
//	void		ByteSwap();						// on big endian systems, byte swap the shorts and ints
//	bool		operator==( const usercmd_t &rhs ) const;
	constructor ( ) {
		this.memset0 ( );
	}

	memset0 ( ): void {
		this.gameFrame = 0;
		this.gameTime = 0;
		this.duplicateCount = 0;
		this.buttons = 0;
		this.forwardmove = 0;
		this.rightmove = 0;
		this.upmove = 0;
		this.angles[0] = 1;
		this.angles[1] = 1;
		this.angles[2] = 1;
		this.mx = 0;
		this.my = 0;
		this.impulse = 0;
		this.flags = 0;
		this.sequence = 0;
	}
}


enum inhibit_t{
	INHIBIT_SESSION = 0,
	INHIBIT_ASYNC
}

var MAX_BUFFERED_USERCMD = 64;

class idUsercmdGen {
//public:
//	virtual				~idUsercmdGen( void ) {}
//
//	// Sets up all the cvars and console commands.
//	virtual	void		Init( void ) = 0;
//
//	// Prepares for a new map.
//	virtual void		InitForNewMap( void ) = 0;
//
//	// Shut down.
//	virtual void		Shutdown( void ) = 0;
//
//	// Clears all key states and face straight.
//	virtual	void		Clear( void ) = 0;
//
//	// Clears view angles.
//	virtual void		ClearAngles( void ) = 0;
//
//	// When the console is down or the menu is up, only emit default usercmd, so the player isn't moving around.
//	// Each subsystem (session and game) may want an inhibit will OR the requests.
//	virtual void		InhibitUsercmd( inhibit_t subsystem, bool inhibit ) = 0;
//
//	// Returns a buffered command for the given game tic.
//	virtual usercmd_t	TicCmd( int ticNumber ) = 0;
//
//	// Called async at regular intervals.
//	virtual	void		UsercmdInterrupt( void ) = 0;
//
//	// Set a value that can safely be referenced by UsercmdInterrupt() for each key binding.
//	virtual	int			CommandStringUsercmdData( const char *cmdString ) = 0;
//
//	// Returns the number of user commands.
//	virtual int			GetNumUserCommands( void ) = 0;
//
//	// Returns the name of a user command via index.
//	virtual const char *GetUserCommandName( int index ) = 0;
//
//	// Continuously modified, never reset. For full screen guis.
//	virtual void		MouseState( int *x, int *y, int *button, bool *down ) = 0;
//
//	// Directly sample a button.
//	virtual int			ButtonState( int key ) = 0;
//
//	// Directly sample a keystate.
//	virtual int			KeyState( int key ) = 0;
//
//	// Directly sample a usercmd.
//	virtual usercmd_t	GetDirectUsercmd( void ) = 0;
};
//
//extern idUsercmdGen	*usercmdGen;
//
//#endif /* !__USERCMDGEN_H__ */
