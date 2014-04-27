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
////#ifndef __KEYINPUT_H__
////#define __KEYINPUT_H__

/*
===============================================================================

Key Input

===============================================================================
*/

// these are the key numbers that are used by the key system
// normal keys should be passed as lowercased ascii
// Some high ascii (> 127) characters that are mapped directly to keys on
// western european keyboards are inserted in this table so that those keys
// are bindable (otherwise they get bound as one of the special keys in this
// table)
enum keyNum_t{
	K_TAB = 9,
	K_ENTER = 13,
	K_ESCAPE = 27,
	K_SPACE = 32,

	K_BACKSPACE = 127,

	K_COMMAND = 128,
	K_CAPSLOCK,
	K_SCROLL,
	K_POWER,
	K_PAUSE,

	K_UPARROW = 133,
	K_DOWNARROW,
	K_LEFTARROW,
	K_RIGHTARROW,

	// The 3 windows keys
	K_LWIN = 137,
	K_RWIN,
	K_MENU,

	K_ALT = 140,
	K_CTRL,
	K_SHIFT,
	K_INS,
	K_DEL,
	K_PGDN,
	K_PGUP,
	K_HOME,
	K_END,

	K_F1 = 149,
	K_F2,
	K_F3,
	K_F4,
	K_F5,
	K_F6,
	K_F7,
	K_F8,
	K_F9,
	K_F10,
	K_F11,
	K_F12,
	K_INVERTED_EXCLAMATION = 161,	// upside down !
	K_F13,
	K_F14,
	K_F15,

	K_KP_HOME = 165,
	K_KP_UPARROW,
	K_KP_PGUP,
	K_KP_LEFTARROW,
	K_KP_5,
	K_KP_RIGHTARROW,
	K_KP_END,
	K_KP_DOWNARROW,
	K_KP_PGDN,
	K_KP_ENTER,
	K_KP_INS,
	K_KP_DEL,
	K_KP_SLASH,
	K_SUPERSCRIPT_TWO = 178,		// superscript 2
	K_KP_MINUS,
	K_ACUTE_ACCENT = 180,			// accute accent
	K_KP_PLUS,
	K_KP_NUMLOCK,
	K_KP_STAR,
	K_KP_EQUALS,

	K_MASCULINE_ORDINATOR = 186,
	// K_MOUSE enums must be contiguous (no char codes in the middle)
	K_MOUSE1 = 187,
	K_MOUSE2,
	K_MOUSE3,
	K_MOUSE4,
	K_MOUSE5,
	K_MOUSE6,
	K_MOUSE7,
	K_MOUSE8,

	K_MWHEELDOWN = 195,
	K_MWHEELUP,

	K_JOY1 = 197,
	K_JOY2,
	K_JOY3,
	K_JOY4,
	K_JOY5,
	K_JOY6,
	K_JOY7,
	K_JOY8,
	K_JOY9,
	K_JOY10,
	K_JOY11,
	K_JOY12,
	K_JOY13,
	K_JOY14,
	K_JOY15,
	K_JOY16,
	K_JOY17,
	K_JOY18,
	K_JOY19,
	K_JOY20,
	K_JOY21,
	K_JOY22,
	K_JOY23,
	K_JOY24,
	K_JOY25,
	K_JOY26,
	K_JOY27,
	K_GRAVE_A = 224,	// lowercase a with grave accent
	K_JOY28,
	K_JOY29,
	K_JOY30,
	K_JOY31,
	K_JOY32,

	K_AUX1 = 230,
	K_CEDILLA_C = 231,	// lowercase c with Cedilla
	K_GRAVE_E = 232,	// lowercase e with grave accent
	K_AUX2,
	K_AUX3,
	K_AUX4,
	K_GRAVE_I = 236,	// lowercase i with grave accent
	K_AUX5,
	K_AUX6,
	K_AUX7,
	K_AUX8,
	K_TILDE_N = 241,	// lowercase n with tilde
	K_GRAVE_O = 242,	// lowercase o with grave accent
	K_AUX9,
	K_AUX10,
	K_AUX11,
	K_AUX12,
	K_AUX13,
	K_AUX14,
	K_GRAVE_U = 249,	// lowercase u with grave accent
	K_AUX15,
	K_AUX16,

	K_PRINT_SCR = 252,	// SysRq / PrintScr
	K_RIGHT_ALT = 253,	// used by some languages as "Alt-Gr"
	K_LAST_KEY = 254	// this better be < 256!
};



////
////#endif /* !__KEYINPUT_H__ */
////
////

class keyname_t {
	constructor(name: string, keynum: number, strId: string ) {
		this.name = name;
		this.keynum = keynum;
		this.strId = strId;
	}
	name: string;
	keynum: number;
	strId: string; // localized string id
}

// keys that can be set without a special name
var unnamedkeys = "*,-=./[\\]1234567890abcdefghijklmnopqrstuvwxyz";

//#if MACOS_X
//const char* OSX_GetLocalizedString( const char* );
//#endif

// names not in this list can either be lowercase ascii, or '0xnn' hex sequences
var keynames:keyname_t[] = [

	new keyname_t("TAB",			keyNum_t.K_TAB,				"#str_07018"),
	new keyname_t("ENTER",			keyNum_t.K_ENTER,			"#str_07019"),
	new keyname_t("ESCAPE",			keyNum_t.K_ESCAPE,			"#str_07020"),
	new keyname_t("SPACE",			keyNum_t.K_SPACE,			"#str_07021"),
	new keyname_t("BACKSPACE",		keyNum_t.K_BACKSPACE,		"#str_07022"),
	new keyname_t("UPARROW",		keyNum_t.K_UPARROW,			"#str_07023"),
	new keyname_t("DOWNARROW",		keyNum_t.K_DOWNARROW,		"#str_07024"),
	new keyname_t("LEFTARROW",		keyNum_t.K_LEFTARROW,		"#str_07025"),
	new keyname_t("RIGHTARROW",		keyNum_t.K_RIGHTARROW,		"#str_07026"),

	new keyname_t("ALT",			keyNum_t.K_ALT,				"#str_07027"),
	new keyname_t("RIGHTALT",		keyNum_t.K_RIGHT_ALT,		"#str_07027"),
	new keyname_t("CTRL",			keyNum_t.K_CTRL,				"#str_07028"),
	new keyname_t("SHIFT",			keyNum_t.K_SHIFT,			"#str_07029"),

	new keyname_t("LWIN", 			keyNum_t.K_LWIN, 			"#str_07030"),
	new keyname_t("RWIN", 			keyNum_t.K_RWIN, 			"#str_07031"),
	new keyname_t("MENU", 			keyNum_t.K_MENU, 			"#str_07032"),

	new keyname_t("COMMAND",		keyNum_t.K_COMMAND,			"#str_07033"),

	new keyname_t("CAPSLOCK",		keyNum_t.K_CAPSLOCK,			"#str_07034"),
	new keyname_t("SCROLL",			keyNum_t.K_SCROLL,			"#str_07035"),
	new keyname_t("PRINTSCREEN",	keyNum_t.K_PRINT_SCR,		"#str_07179"),
	
	new keyname_t("F1", 			keyNum_t.K_F1, 				"#str_07036"),
	new keyname_t("F2", 			keyNum_t.K_F2, 				"#str_07037"),
	new keyname_t("F3", 			keyNum_t.K_F3, 				"#str_07038"),
	new keyname_t("F4", 			keyNum_t.K_F4, 				"#str_07039"),
	new keyname_t("F5", 			keyNum_t.K_F5, 				"#str_07040"),
	new keyname_t("F6", 			keyNum_t.K_F6, 				"#str_07041"),
	new keyname_t("F7", 			keyNum_t.K_F7, 				"#str_07042"),
	new keyname_t("F8", 			keyNum_t.K_F8, 				"#str_07043"),
	new keyname_t("F9", 			keyNum_t.K_F9, 				"#str_07044"),
	new keyname_t("F10", 			keyNum_t.K_F10, 				"#str_07045"),
	new keyname_t("F11", 			keyNum_t.K_F11, 				"#str_07046"),
	new keyname_t("F12", 			keyNum_t.K_F12, 				"#str_07047"),

	new keyname_t("INS", 			keyNum_t.K_INS, 				"#str_07048"),
	new keyname_t("DEL", 			keyNum_t.K_DEL, 				"#str_07049"),
	new keyname_t("PGDN", 			keyNum_t.K_PGDN, 			"#str_07050"),
	new keyname_t("PGUP", 			keyNum_t.K_PGUP, 			"#str_07051"),
	new keyname_t("HOME", 			keyNum_t.K_HOME, 			"#str_07052"),
	new keyname_t("END",			keyNum_t.K_END,				"#str_07053"),

	new keyname_t("MOUSE1", 		keyNum_t.K_MOUSE1, 			"#str_07054"),
	new keyname_t("MOUSE2", 		keyNum_t.K_MOUSE2, 			"#str_07055"),
	new keyname_t("MOUSE3", 		keyNum_t.K_MOUSE3, 			"#str_07056"),
	new keyname_t("MOUSE4", 		keyNum_t.K_MOUSE4, 			"#str_07057"),
	new keyname_t("MOUSE5", 		keyNum_t.K_MOUSE5, 			"#str_07058"),
	new keyname_t("MOUSE6", 		keyNum_t.K_MOUSE6, 			"#str_07059"),
	new keyname_t("MOUSE7", 		keyNum_t.K_MOUSE7, 			"#str_07060"),
	new keyname_t("MOUSE8", 		keyNum_t.K_MOUSE8, 			"#str_07061"),

	new keyname_t("MWHEELUP",		keyNum_t.K_MWHEELUP,			"#str_07131"),
	new keyname_t("MWHEELDOWN",		keyNum_t.K_MWHEELDOWN,		"#str_07132"),

	new keyname_t("JOY1", 			keyNum_t.K_JOY1, 			"#str_07062"),
	new keyname_t("JOY2", 			keyNum_t.K_JOY2, 			"#str_07063"),
	new keyname_t("JOY3", 			keyNum_t.K_JOY3, 			"#str_07064"),
	new keyname_t("JOY4", 			keyNum_t.K_JOY4, 			"#str_07065"),
	new keyname_t("JOY5", 			keyNum_t.K_JOY5, 			"#str_07066"),
	new keyname_t("JOY6", 			keyNum_t.K_JOY6, 			"#str_07067"),
	new keyname_t("JOY7", 			keyNum_t.K_JOY7, 			"#str_07068"),
	new keyname_t("JOY8", 			keyNum_t.K_JOY8, 			"#str_07069"),
	new keyname_t("JOY9", 			keyNum_t.K_JOY9, 			"#str_07070"),
	new keyname_t("JOY10", 			keyNum_t.K_JOY10, 			"#str_07071"),
	new keyname_t("JOY11", 			keyNum_t.K_JOY11, 			"#str_07072"),
	new keyname_t("JOY12", 			keyNum_t.K_JOY12, 			"#str_07073"),
	new keyname_t("JOY13", 			keyNum_t.K_JOY13, 			"#str_07074"),
	new keyname_t("JOY14", 			keyNum_t.K_JOY14, 			"#str_07075"),
	new keyname_t("JOY15", 			keyNum_t.K_JOY15, 			"#str_07076"),
	new keyname_t("JOY16", 			keyNum_t.K_JOY16, 			"#str_07077"),
	new keyname_t("JOY17", 			keyNum_t.K_JOY17, 			"#str_07078"),
	new keyname_t("JOY18", 			keyNum_t.K_JOY18, 			"#str_07079"),
	new keyname_t("JOY19", 			keyNum_t.K_JOY19, 			"#str_07080"),
	new keyname_t("JOY20", 			keyNum_t.K_JOY20, 			"#str_07081"),
	new keyname_t("JOY21", 			keyNum_t.K_JOY21, 			"#str_07082"),
	new keyname_t("JOY22", 			keyNum_t.K_JOY22, 			"#str_07083"),
	new keyname_t("JOY23", 			keyNum_t.K_JOY23, 			"#str_07084"),
	new keyname_t("JOY24", 			keyNum_t.K_JOY24, 			"#str_07085"),
	new keyname_t("JOY25", 			keyNum_t.K_JOY25, 			"#str_07086"),
	new keyname_t("JOY26", 			keyNum_t.K_JOY26, 			"#str_07087"),
	new keyname_t("JOY27", 			keyNum_t.K_JOY27, 			"#str_07088"),
	new keyname_t("JOY28", 			keyNum_t.K_JOY28, 			"#str_07089"),
	new keyname_t("JOY29", 			keyNum_t.K_JOY29, 			"#str_07090"),
	new keyname_t("JOY30", 			keyNum_t.K_JOY30, 			"#str_07091"),
	new keyname_t("JOY31", 			keyNum_t.K_JOY31, 			"#str_07092"),
	new keyname_t("JOY32", 			keyNum_t.K_JOY32, 			"#str_07093"),

	new keyname_t("AUX1", 			keyNum_t.K_AUX1, 			"#str_07094"),
	new keyname_t("AUX2", 			keyNum_t.K_AUX2, 			"#str_07095"),
	new keyname_t("AUX3", 			keyNum_t.K_AUX3, 			"#str_07096"),
	new keyname_t("AUX4", 			keyNum_t.K_AUX4, 			"#str_07097"),
	new keyname_t("AUX5", 			keyNum_t.K_AUX5, 			"#str_07098"),
	new keyname_t("AUX6", 			keyNum_t.K_AUX6, 			"#str_07099"),
	new keyname_t("AUX7", 			keyNum_t.K_AUX7, 			"#str_07100"),
	new keyname_t("AUX8", 			keyNum_t.K_AUX8, 			"#str_07101"),
	new keyname_t("AUX9", 			keyNum_t.K_AUX9, 			"#str_07102"),
	new keyname_t("AUX10", 			keyNum_t.K_AUX10, 			"#str_07103"),
	new keyname_t("AUX11", 			keyNum_t.K_AUX11, 			"#str_07104"),
	new keyname_t("AUX12", 			keyNum_t.K_AUX12, 			"#str_07105"),
	new keyname_t("AUX13", 			keyNum_t.K_AUX13, 			"#str_07106"),
	new keyname_t("AUX14", 			keyNum_t.K_AUX14, 			"#str_07107"),
	new keyname_t("AUX15", 			keyNum_t.K_AUX15, 			"#str_07108"),
	new keyname_t("AUX16", 			keyNum_t.K_AUX16, 			"#str_07109"),

	new keyname_t("KP_HOME",		keyNum_t.K_KP_HOME,			"#str_07110"),
	new keyname_t("KP_UPARROW",		keyNum_t.K_KP_UPARROW,		"#str_07111"),
	new keyname_t("KP_PGUP",		keyNum_t.K_KP_PGUP,			"#str_07112"),
	new keyname_t("KP_LEFTARROW",	keyNum_t.K_KP_LEFTARROW, 	"#str_07113"),
	new keyname_t("KP_5",			keyNum_t.K_KP_5,				"#str_07114"),
	new keyname_t("KP_RIGHTARROW",	keyNum_t.K_KP_RIGHTARROW,	"#str_07115"),
	new keyname_t("KP_END",			keyNum_t.K_KP_END,			"#str_07116"),
	new keyname_t("KP_DOWNARROW",	keyNum_t.K_KP_DOWNARROW,		"#str_07117"),
	new keyname_t("KP_PGDN",		keyNum_t.K_KP_PGDN,			"#str_07118"),
	new keyname_t("KP_ENTER",		keyNum_t.K_KP_ENTER,			"#str_07119"),
	new keyname_t("KP_INS",			keyNum_t.K_KP_INS, 			"#str_07120"),
	new keyname_t("KP_DEL",			keyNum_t.K_KP_DEL, 			"#str_07121"),
	new keyname_t("KP_SLASH",		keyNum_t.K_KP_SLASH, 		"#str_07122"),
	new keyname_t("KP_MINUS",		keyNum_t.K_KP_MINUS, 		"#str_07123"),
	new keyname_t("KP_PLUS",		keyNum_t.K_KP_PLUS,			"#str_07124"),
	new keyname_t("KP_NUMLOCK",		keyNum_t.K_KP_NUMLOCK,		"#str_07125"),
	new keyname_t("KP_STAR",		keyNum_t.K_KP_STAR,			"#str_07126"),
	new keyname_t("KP_EQUALS",		keyNum_t.K_KP_EQUALS,		"#str_07127"),

	new keyname_t("PAUSE",			keyNum_t.K_PAUSE,			"#str_07128"),
	
	new keyname_t("SEMICOLON",		';'.charCodeAt(0),				"#str_07129"),	// because a raw semicolon separates commands
	new keyname_t("APOSTROPHE", '\''.charCodeAt(0),				"#str_07130"),	// because a raw apostrophe messes with parsing

	new keyname_t(null,				0,					null)
];



var	MAX_KEYS = 256;


class idKey {
	constructor ( ) {
		this.down = false;
		this.repeats = 0;
		this.usercmdAction = 0;
	}

	down: boolean;
	repeats: number /*int*/; // if > 1, it is autorepeating
	binding = new idStr;
	usercmdAction: number; // for testing by the asyncronous usercmd generation
}

var key_overstrikeMode = false;
var keys: idKey[];
////
////#define ID_DOOM_LEGACY
////
////#ifdef ID_DOOM_LEGACY
////
////char *		cheatCodes[] = {
////	"iddqd",		// Invincibility
////	"idkfa",		// All weapons, keys, ammo, and 200% armor
////	"idfa",			// Reset ammunition
////	"idspispopd",	// Walk through walls
////	"idclip",		// Walk through walls
////	"idchoppers",	// Chainsaw
/////*
////	"idbeholds",	// Berserker strength
////	"idbeholdv",	// Temporary invincibility
////	"idbeholdi",	// Temporary invisibility
////	"idbeholda",	// Full automap
////	"idbeholdr",	// Anti-radiation suit
////	"idbeholdl",	// Light amplification visor
////	"idclev",		// Level select
////	"iddt",			// Toggle full map; full map and objects; normal map
////	"idmypos",		// Display coordinates and heading
////	"idmus",		// Change music to indicated level
////	"fhhall",		// Kill all enemies in level
////	"fhshh",		// Invisible to enemies until attack
////*/
////	NULL
////};
////char		lastKeys[32];
////int			lastKeyIndex;
////
////#endif


class idKeyInput {
////public:
////	static void			Init(void);
////	static void			Shutdown(void);
////
////	static void			ArgCompletion_KeyName(const idCmdArgs &args, void(*callback)(const char *s));
////	static void			PreliminaryKeyEvent(int keyNum, bool down);
////	static bool			IsDown(int keyNum);
////	static int			GetUsercmdAction(int keyNum);
////	static bool			GetOverstrikeMode(void);
////	static void			SetOverstrikeMode(bool state);
////	static void			ClearStates(void);
////	static int			StringToKeyNum(const char *str);
////	static const char *	KeyNumToString(int keyNum, bool localized);
////
////	static void			SetBinding(int keyNum, const char *binding);
////	static const char *	GetBinding(int keyNum);
////	static bool			UnbindBinding(const char *bind);
////	static int			NumBinds(const char *binding);
////	static bool			ExecKeyBinding(int keyNum);
////	static const char *	KeysFromBinding(const char *bind);
////	static const char *	BindingFromKey(const char *key);
////	static bool			KeyIsBoundTo(int keyNum, const char *binding);
////	static void			WriteBindings(idFile *f);
////};


/*
===================
idKeyInput::ArgCompletion_KeyName
===================
*/
	static ArgCompletion_KeyName_Template ( args: idCmdArgs, callback: ( s: string ) => void ) {
		return function ArgCompletion_KeyName ( args: idCmdArgs, callback: ( s: string ) => void ) {
			todoThrow ( );
			//keyname_t *kn;
			//var i:number;
			//
			//for( i = 0; i < sizeof( unnamedkeys ) - 1; i++ ) {
			//	callback( va( "%s %c", args.Argv( 0 ), unnamedkeys[ i ] ) );
			//}
			//
			//for ( kn = keynames; kn.name; kn++ ) {
			//	callback( va( "%s %s", args.Argv( 0 ), kn.name ) );
			//}
		};
	}

/*
===================
idKeyInput::GetOverstrikeMode
===================
*/
	static GetOverstrikeMode ( ): boolean {
		return key_overstrikeMode;
	}

/*
===================
idKeyInput::SetOverstrikeMode
===================
*/
	static SetOverstrikeMode ( state: boolean ): void {
		key_overstrikeMode = state;
	}

/*
===================
idKeyInput::IsDown
===================
*/
	static IsDown ( /*int*/ keynum: number ): boolean {
		if ( keynum == -1 ) {
			return false;
		}

		return keys[keynum].down;
	}

/*
===================
idKeyInput::StringToKeyNum

Returns a key number to be used to index keys[] by looking at
the given string.  Single ascii characters return themselves, while
the K_* names are matched up.

0x11 will be interpreted as raw hex, which will allow new controlers
to be configured even if they don't have defined names.
===================
*/
	static StringToKeyNum ( str: string ): number {
		var kn: number;

		if ( !str || !str[0] ) {
			return -1;
		}
		if ( !str.charCodeAt( 1 ) ) {
			return str.charCodeAt( 0 ); //(unsigned char)(str[0]);
		}

		// check for hex code
		if ( str.charCodeAt( 0 ) == '0'.charCodeAt( 0 ) && str.charCodeAt( 1 ) == 'x'.charCodeAt( 0 ) && strlen( str ) == 4 ) {
			var /*int*/n1: number, n2: number;

			n1 = str.charCodeAt( 2 );
			if ( n1 >= '0'.charCodeAt( 0 ) && n1 <= '9'.charCodeAt( 0 ) ) {
				n1 -= '0'.charCodeAt( 0 );
			} else if ( n1 >= 'a'.charCodeAt( 0 ) && n1 <= 'f'.charCodeAt( 0 ) ) {
				n1 = n1 - 'a'.charCodeAt( 0 ) + 10;
			} else {
				n1 = 0;
			}

			n2 = str.charCodeAt( 3 );
			if ( n2 >= '0'.charCodeAt( 0 ) && n2 <= '9'.charCodeAt( 0 ) ) {
				n2 -= '0'.charCodeAt( 0 );
			} else if ( n2 >= 'a'.charCodeAt( 0 ) && n2 <= 'f'.charCodeAt( 0 ) ) {
				n2 = n2 - 'a'.charCodeAt( 0 ) + 10;
			} else {
				n2 = 0;
			}

			return n1 * 16 + n2;
		}

		// scan for a text match
		for ( kn = 0; keynames[kn].name; kn++ ) {
			if ( !idStr.Icmp( str, keynames[kn].name ) ) {
				return keynames[kn].keynum;
			}
		}

		return -1;
	}

/////*
////===================
////idKeyInput::KeyNumToString
////
////Returns a string (either a single ascii char, a K_* name, or a 0x11 hex string) for the
////given keynum.
////===================
////*/
////static KeyNumToString( int keynum, bool localized ):string {
////	keyname_t	*kn;	
////	static	char	tinystr[5];
////	int			i, j;
////
////	if ( keynum == -1 ) {
////		return "<KEY NOT FOUND>";
////	}
////
////	if ( keynum < 0 || keynum > 255 ) {
////		return "<OUT OF RANGE>";
////	}
////
////	// check for printable ascii (don't use quote)
////	if ( keynum > 32 && keynum < 127 && keynum != '"' && keynum != ';' && keynum != '\'' ) {
////		tinystr[0] = Sys_MapCharForKey( keynum );
////		tinystr[1] = 0;
////		return tinystr;
////	}
////
////	// check for a key string
////	for ( kn = keynames; kn.name; kn++ ) {
////		if ( keynum == kn.keynum ) {
////			if ( !localized || kn.strId[0] != '#' ) {
////				return kn.name;
////			} else {
////#if MACOS_X
////				
////				switch ( kn.keynum ) {
////					case K_ENTER:		
////					case K_BACKSPACE:	
////					case K_ALT:			
////					case K_INS:
////					case K_PRINT_SCR:
////						return OSX_GetLocalizedString( kn.name );
////						break;
////					default :
////						return common.GetLanguageDict().GetString( kn.strId ); break;
////				}
////#else
////				return common.GetLanguageDict().GetString( kn.strId );
////#endif
////			}
////		}
////	}
////
////	// check for European high-ASCII characters
////	if ( localized && keynum >= 161 && keynum <= 255 ) {
////		tinystr[0] = keynum;
////		tinystr[1] = 0;
////		return tinystr;
////	}
////
////	// make a hex string
////	i = keynum >> 4;
////	j = keynum & 15;
////
////	tinystr[0] = '0';
////	tinystr[1] = 'x';
////	tinystr[2] = i > 9 ? i - 10 + 'a' : i + '0';
////	tinystr[3] = j > 9 ? j - 10 + 'a' : j + '0';
////	tinystr[4] = 0;
////
////	return tinystr;
////}
////
/*
===================
idKeyInput::SetBinding
===================
*/
	static SetBinding ( /*int */keynum: number, binding: string ): void {
		if ( keynum == -1 ) {
			return;
		}

		// Clear out all button states so we aren't stuck forever thinking this key is held down
		usercmdGen.Clear ( );

		// allocate memory for new binding
		keys[keynum].binding.opEquals( binding );

		// find the action for the async command generation
		keys[keynum].usercmdAction = usercmdGen.CommandStringUsercmdData( binding );

		// consider this like modifying an archived cvar, so the
		// file write will be triggered at the next oportunity
		cvarSystem.SetModifiedFlags( CVAR_ARCHIVE );
	}

////
/////*
////===================
////idKeyInput::GetBinding
////===================
////*/
////static GetBinding( int keynum ):string {
////	if ( keynum == -1 ) {
////		return "";
////	}
////
////	return keys[ keynum ].binding;
////}
////
/////*
////===================
////idKeyInput::GetUsercmdAction
////===================
////*/
////static GetUsercmdAction( int keynum ):number {
////	return keys[ keynum ].usercmdAction;
////}
////
/*
===================
Key_Unbind_f
===================
*/
	static Key_Unbind_f ( args: idCmdArgs ): void {
		var b: number;

		if ( args.Argc ( ) != 2 ) {
			common.Printf( "unbind <key> : remove commands from a key\n" );
			return;
		}

		b = idKeyInput.StringToKeyNum( args.Argv( 1 ) );
		if ( b == -1 ) {
			// If it wasn't a key, it could be a command
			if (!idKeyInput.UnbindBinding( args.Argv( 1 ) ) ) {
				common.Printf( "\"%s\" isn't a valid key\n", args.Argv( 1 ) );
			}
		} else {
			idKeyInput.SetBinding( b, "" );
		}
	}

/*
===================
Key_Unbindall_f
===================
*/
	static Key_Unbindall_f ( args: idCmdArgs ): void {
		var i: number;

		for ( i = 0; i < MAX_KEYS; i++ ) {
			idKeyInput.SetBinding( i, "" );
		}
	}
/*
===================
Key_Bind_f
===================
*/
	static Key_Bind_f ( args: idCmdArgs ): void {
		var /*int*/i: number, c: number, b: number;
		var cmd = ""; //[MAX_STRING_CHARS];

		c = args.Argc ( );

		if ( c < 2 ) {
			common.Printf( "bind <key> [command] : attach a command to a key\n" );
			return;
		}
		b = idKeyInput.StringToKeyNum( args.Argv( 1 ) );
		if ( b == -1 ) {
			common.Printf( "\"%s\" isn't a valid key\n", args.Argv( 1 ) );
			return;
		}

		if ( c == 2 ) {
			if ( keys[b].binding.Length ( ) ) {
				common.Printf( "\"%s\" = \"%s\"\n", args.Argv( 1 ), keys[b].binding.c_str ( ) );
			} else {
				common.Printf( "\"%s\" is not bound\n", args.Argv( 1 ) );
			}
			return;
		}

		// copy the rest of the command line
		cmd = ""; //[0] = 0;		// start out with a null string
		for ( i = 2; i < c; i++ ) {
			cmd += args.Argv( i );
			if ( i != ( c - 1 ) ) {
				cmd += " ";
			}
		}

		idKeyInput.SetBinding( b, cmd );
	}

/*
============
Key_BindUnBindTwo_f

binds keynum to bindcommand and unbinds if there are already two binds on the key
============
*/
	static Key_BindUnBindTwo_f ( args: idCmdArgs ): void {
		todoThrow ( );
		//int c = args.Argc();
		//if ( c < 3 ) {
		//	common.Printf( "bindunbindtwo <keynum> [command]\n" );
		//	return;
		//}
		//int key = atoi( args.Argv( 1 ) );
		//idStr bind = args.Argv( 2 );
		//if ( idKeyInput::NumBinds( bind ) >= 2 && !idKeyInput::KeyIsBoundTo( key, bind ) ) {
		//	idKeyInput.UnbindBinding( bind );
		//}
		//idKeyInput.SetBinding( key, bind );
	}


////
/////*
////============
////idKeyInput::WriteBindings
////
////Writes lines containing "bind key value"
////============
////*/
////static WriteBindings( idFile *f ):void {
////	var i:number /*int*/;
////
////	f.Printf( "unbindall\n" );
////
////	for ( i = 0; i < MAX_KEYS; i++ ) {
////		if ( keys[i].binding.Length() ) {
////			const char *name = KeyNumToString( i, false );
////
////			// handle the escape character nicely
////			if ( !strcmp( name, "\\" ) ) {
////				f.Printf( "bind \"\\\" \"%s\"\n", keys[i].binding.c_str() );
////			} else {
////				f.Printf( "bind \"%s\" \"%s\"\n", KeyNumToString( i, false ), keys[i].binding.c_str() );
////			}
////		}
////	}
////}

/*
============
Key_ListBinds_f
============
*/
	static Key_ListBinds_f ( args: idCmdArgs ): void {
		var i: number;
		todoThrow ( );
		//for ( i = 0; i < MAX_KEYS; i++ ) {
		//	if ( keys[i].binding.Length ( ) ) {
		//		common.Printf( "%s \"%s\"\n", idKeyInput.KeyNumToString( i, false ), keys[i].binding.c_str ( ) );
		//	}
		//}
	}

/////*
////============
////idKeyInput::KeysFromBinding
////returns the localized name of the key for the binding
////============
////*/
////static KeysFromBinding( const char *bind ):string {
////	var i:number;
////	static char keyName[MAX_STRING_CHARS];
////
////	keyName[0] = '\0';
////	if ( bind && *bind ) {
////		for ( i = 0; i < MAX_KEYS; i++ ) {
////			if ( keys[i].binding.Icmp( bind ) == 0 ) {
////				if ( keyName[0] != '\0' ) {
////					idStr::Append( keyName, sizeof( keyName ), common.GetLanguageDict().GetString( "#str_07183" ) );
////				} 
////				idStr::Append( keyName, sizeof( keyName ), KeyNumToString( i, true ) );
////			}
////		}
////	}
////	if ( keyName[0] == '\0' ) {
////		idStr::Copynz( keyName, common.GetLanguageDict().GetString( "#str_07133" ), sizeof( keyName ) );
////	}
////	idStr::ToLower( keyName );
////	return keyName;
////}
////
/////*
////============
////idKeyInput::BindingFromKey
////returns the binding for the localized name of the key
////============
////*/
////static BindingFromKey( const char *key ):string {
////	const int keyNum = idKeyInput.StringToKeyNum( key );
////	if ( keyNum<0 || keyNum >= MAX_KEYS ) {
////		return NULL;
////	}
////	return keys[keyNum].binding.c_str();
////}

/*
============
idKeyInput::UnbindBinding
============
*/
	static UnbindBinding ( binding: string ): boolean {
		var unbound = false;
		var i: number;

		if ( binding /*&& *binding*/ ) {
			for ( i = 0; i < MAX_KEYS; i++ ) {
				if ( keys[i].binding.Icmp( binding ) == 0 ) {
					idKeyInput.SetBinding( i, "" );
					unbound = true;
				}
			}
		}
		return unbound;
	}

/////*
////============
////idKeyInput::NumBinds
////============
////*/
////static /*int */idKeyInput::NumBinds( const char *binding ):number {
////	int i, count = 0;
////
////	if ( binding && *binding ) {
////		for ( i = 0; i < MAX_KEYS; i++ ) {
////			if ( keys[i].binding.Icmp( binding ) == 0 ) {
////				count++;
////			}
////		}
////	}
////	return count;
////}
////
/////*
////============
////idKeyInput::KeyIsBountTo
////============
////*/
////static KeyIsBoundTo( int keynum, const char *binding ):boolean {
////	if ( keynum >= 0 && keynum < MAX_KEYS ) {
////		return ( keys[keynum].binding.Icmp( binding ) == 0 );
////	}
////	return false;
////}
////
/////*
////===================
////idKeyInput::PreliminaryKeyEvent
////
////Tracks global key up/down state
////Called by the system for both key up and key down events
////===================
////*/
////static PreliminaryKeyEvent( int keynum, bool down ):void {
////	keys[keynum].down = down;
////
////#ifdef ID_DOOM_LEGACY
////	if ( down ) {
////		lastKeys[ 0 + ( lastKeyIndex & 15 )] = keynum;
////		lastKeys[16 + ( lastKeyIndex & 15 )] = keynum;
////		lastKeyIndex = ( lastKeyIndex + 1 ) & 15;
////		for ( int i = 0; cheatCodes[i] != NULL; i++ ) {
////			int l = strlen( cheatCodes[i] );
////			assert( l <= 16 );
////			if ( idStr::Icmpn( lastKeys + 16 + ( lastKeyIndex & 15 ) - l, cheatCodes[i], l ) == 0 ) {
////				common.Printf( "your memory serves you well!\n" );
////				break;
////			}
////		}
////	}
////#endif
////}
////
/////*
////=================
////idKeyInput::ExecKeyBinding
////=================
////*/
////static ExecKeyBinding( int keynum ):boolean {
////	// commands that are used by the async thread
////	// don't add text
////	if ( keys[keynum].usercmdAction ) {
////		return false;
////	}
////
////	// send the bound action
////	if ( keys[keynum].binding.Length() ) {
////		cmdSystem.BufferCommandText( CMD_EXEC_APPEND, keys[keynum].binding.c_str() );
////		cmdSystem.BufferCommandText( CMD_EXEC_APPEND, "\n" );
////	}
////	return true;
////}
////
/////*
////===================
////idKeyInput::ClearStates
////===================
////*/
////static ClearStates( ):void {
////	var i:number;
////
////	for ( i = 0; i < MAX_KEYS; i++ ) {
////		if ( keys[i].down ) {
////			PreliminaryKeyEvent( i, false );
////		}
////		keys[i].down = false;
////	}
////
////	// clear the usercommand states
////	usercmdGen.Clear();
////}
////
/*
===================
idKeyInput::Init
===================
*/
	static Init ( ): void {

		keys = newStructArray<idKey>( idKey, MAX_KEYS );

		// register our functions
		cmdSystem.AddCommand("bind", idKeyInput.Key_Bind_f, cmdFlags_t.CMD_FL_SYSTEM, "binds a command to a key", idKeyInput.ArgCompletion_KeyName_Template );
		cmdSystem.AddCommand("bindunbindtwo", idKeyInput.Key_BindUnBindTwo_f, cmdFlags_t.CMD_FL_SYSTEM, "binds a key but unbinds it first if there are more than two binds" );
		cmdSystem.AddCommand("unbind", idKeyInput.Key_Unbind_f, cmdFlags_t.CMD_FL_SYSTEM, "unbinds any command from a key", idKeyInput.ArgCompletion_KeyName_Template);
		cmdSystem.AddCommand("unbindall", idKeyInput.Key_Unbindall_f, cmdFlags_t.CMD_FL_SYSTEM, "unbinds any commands from all keys");
		cmdSystem.AddCommand("listBinds", idKeyInput.Key_ListBinds_f, cmdFlags_t.CMD_FL_SYSTEM, "lists key bindings" );
	}
////
/////*
////===================
////idKeyInput::Shutdown
////===================
////*/
////static Shutdown( ):void {
////	delete [] keys;
////	keys = NULL;
////}
}