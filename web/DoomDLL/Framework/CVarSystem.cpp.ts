/// <reference path="../../utils/types.ts" />
/// <reference path="../../libs/idLib/Text/Str.h.ts" />
/// <reference path="../../libs/idLib/Containers/HashIndex.h.ts" />
/// <reference path="CmdSystem.h.ts" />
/// <reference path="CmdSystem.cpp.ts" />
/// <reference path="CVarSystem.h.ts" />
/// <reference path="../../libs/idLib/Heap.cpp.ts" />
/// <reference path="Common.cpp.ts" />
/// <reference path="../../libs/idLib/Lib.cpp.ts" />
/// <reference path="../../utils/todo.ts" />
/// <reference path="../../libs/idLib/Text/CmdArgs.h.ts" />
/// <reference path="../../libs/idLib/Text/CmdArgs.cpp.ts" />

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

////#include "../idlib/precompiled.h"
////#pragma hdrstop

var staticVars:idCVar = null;

/////*
////===============================================================================

////	idInternalCVar

////===============================================================================
////*/

class idInternalCVar extends idCVar {
//	friend class idCVarSystemLocal;
//public:
    constructor ( );
    constructor ( newName: string, newValue: string, newFlags: number );
    constructor ( cvar: idCVar );
    constructor ( newNameOrCvar?: any, newValue?: string, /*int */newFlags?: number ) {
        super ( );

        if ( typeof newNameOrCvar === "string" ) {
            var newName = newNameOrCvar;
            this.nameString = new idStr( newName );
            this.name = this.nameString.c_str ( );
            this.valueString = new idStr( newValue );
            this.value = this.valueString.c_str ( );
            this.resetString = new idStr( newValue );
            this.descriptionString = new idStr( "" );
            this.description = this.descriptionString.c_str ( );
            this.flags = ( newFlags & ~CVAR_STATIC ) | CVAR_MODIFIED;
            this.valueMin = 1;
            this.valueMax = -1;
            this.valueStrings = null;
            this.valueCompletion = null;
            this.UpdateValue ( );
            this.UpdateCheat ( );
            this.internalVar = this;
        } else if ( newNameOrCvar instanceof idCVar ) {
            var cvar = newNameOrCvar;
            this.nameString = new idStr( cvar.GetName ( ) );
            this.name = this.nameString.c_str ( );
            this.valueString = new idStr( cvar.GetString ( ) );
            this.value = this.valueString.c_str ( );
            this.resetString = new idStr( cvar.GetString ( ) );
            this.descriptionString = new idStr( cvar.GetDescription ( ) );
            this.description = this.descriptionString.c_str ( );
            this.flags = cvar.GetFlags ( ) | CVAR_MODIFIED;
            this.valueMin = cvar.GetMinValue ( );
            this.valueMax = cvar.GetMaxValue ( );
            this.valueStrings = this.CopyValueStrings( cvar.GetValueStrings ( ) );
            this.valueCompletion = cvar.GetValueCompletion ( );
            this.UpdateValue ( );
            this.UpdateCheat ( );
            this.internalVar = this;
        }
    }

////	const char **			CopyValueStrings( const char **strings );
////	void					Update( const idCVar *cvar );
////	void					UpdateValue( void );
////	void					UpdateCheat( void );
////	void					Set( const char *newValue, bool force, bool fromServer );
////	void					Reset( void );

//private:
/*	idStr					*/nameString:idStr;			// name
/*	idStr					*/resetString:idStr;			// resetting will change to this value
/*	idStr					*/valueString:idStr;			// value
/*	idStr					*/descriptionString:idStr;		// description

////	virtual void			InternalSetString( const char *newValue );
////	virtual void			InternalServerSetString( const char *newValue );
////	virtual void			InternalSetBool( const bool newValue );
////	virtual void			InternalSetInteger( const int newValue );
////	virtual void			InternalSetFloat( const float newValue );
////};


/////*
////============
////idInternalCVar::~idInternalCVar
////============
////*/
////idInternalCVar::~idInternalCVar( void ) {
////	Mem_Free( valueStrings );
////	valueStrings = NULL;
////}


/*
============
idInternalCVar::CopyValueStrings
============
*/
CopyValueStrings( strings:string[] ):string[] {
    if ( !strings ) {
    	return null;
    }
    
    var ptr:string[] = [];
    for ( var i = 0; i < strings.length; i++ ) {
        ptr[i] = strings[i];
    }

    return ptr;
}

/*
============
idInternalCVar::Update
============
*/
Update( cvar:idCVar ):void {
    todoThrow ( );
    //// if this is a statically declared variable
    //if ( cvar.GetFlags() & CVAR_STATIC ) {

    //	if ( this.flags & CVAR_STATIC ) {

    //		// the code has more than one static declaration of the same variable, make sure they have the same properties
    //		if ( resetString.Icmp( cvar.GetString() ) != 0 ) {
    //			common.Warning( "CVar '%s' declared multiple times with different initial value", nameString.c_str() );
    //		}
    //		if ( ( flags & (CVAR_BOOL|CVAR_INTEGER|CVAR_FLOAT) ) != ( cvar.GetFlags() & (CVAR_BOOL|CVAR_INTEGER|CVAR_FLOAT) ) ) {
    //			common.Warning( "CVar '%s' declared multiple times with different type", nameString.c_str() );
    //		}
    //		if ( this.valueMin != cvar.GetMinValue() || valueMax != cvar.GetMaxValue() ) {
    //			common.Warning( "CVar '%s' declared multiple times with different minimum/maximum", nameString.c_str() );
    //		}

    //	}

    //	// the code is now specifying a variable that the user already set a value for, take the new value as the reset value
    //	this.resetString = cvar.GetString();
    //	this.descriptionString = cvar.GetDescription();
    //	this.description = this.descriptionString.c_str();
    //	this.valueMin = cvar.GetMinValue();
    //	this.valueMax = cvar.GetMaxValue();
    //	this.Mem_Free( valueStrings );
    //	this.valueStrings = CopyValueStrings( cvar.GetValueStrings() );
    //	this.valueCompletion = cvar.GetValueCompletion();
    //	this.UpdateValue();
    //	cvarSystem.SetModifiedFlags( cvar.GetFlags() );
    //}

    //flags |= cvar.GetFlags();

    //UpdateCheat();

    //// only allow one non-empty reset string without a warning
    //if ( resetString.Length() == 0 ) {
    //	resetString = cvar.GetString();
    //} else if ( cvar.GetString()[0] && resetString.Cmp( cvar.GetString() ) != 0 ) {
    //	common.Warning( "cvar \"%s\" given initial values: \"%s\" and \"%s\"\n", nameString.c_str(), resetString.c_str(), cvar.GetString() );
    //}
}

/*
============
idInternalCVar::UpdateValue
============
*/
UpdateValue( ):void {
    var clamped = false;

    if ( this.flags & CVAR_BOOL ) {
    	this.integerValue = ( atoi( this.value ) != 0 ).toNum();
    	this.floatValue = this.integerValue;
    	if ( idStr.Icmp( this.value, "0" ) != 0 && idStr.Icmp( this.value, "1" ) != 0 ) {
    		this.valueString = new idStr( this.integerValue );
    		this.value = this.valueString.c_str();
    	}
    } else if ( this.flags & CVAR_INTEGER ) {
    	this.integerValue = atoi( this.value );
    	if ( this.valueMin < this.valueMax ) {
    		if ( this.integerValue < this.valueMin ) {
    			this.integerValue = int(this.valueMin);
    			clamped = true;
    		} else if ( this.integerValue > this.valueMax ) {
    			this.integerValue = int(this.valueMax);
    			clamped = true;
    		}
    	}
    	if ( clamped || !idStr.IsNumeric( this.value ) || idStr.FindChar( this.value, '.' ) ) {
    		this.valueString = new idStr( this.integerValue );
    		this.value = this.valueString.c_str();
    	}
    	this.floatValue = this.integerValue;
    } else if ( this.flags & CVAR_FLOAT ) {
    	this.floatValue = atof( this.value );
    	if ( this.valueMin < this.valueMax ) {
    		if ( this.floatValue < this.valueMin ) {
    			this.floatValue = this.valueMin;
    			clamped = true;
    		} else if ( this.floatValue > this.valueMax ) {
    			this.floatValue = this.valueMax;
    			clamped = true;
    		}
    	}
    	if ( clamped || !idStr.IsNumeric( this.value ) ) {
    		this.valueString = new idStr( this.floatValue );
    		this.value = this.valueString.c_str();
    	}
    	this.integerValue = int(this.floatValue);
    } else {
    	if ( this.valueStrings ) {
    		this.integerValue = 0;
    		for ( var i = 0; this.valueStrings[i]; i++ ) {
    			if ( this.valueString.Icmp( this.valueStrings[i] ) == 0 ) {
    				this.integerValue = i;
    				break;
    			}
    		}
	        this.valueString = new idStr( this.valueStrings[this.integerValue] );
    		this.value = this.valueString.c_str();
    		this.floatValue = this.integerValue;
    	} else if ( this.valueString.Length() < 32 ) {
    		this.floatValue = atof( this.value );
    		this.integerValue = int(this.floatValue);
    	} else {
    		this.floatValue = 0.0;
    		this.integerValue = 0;
    	}
    }
}

/*
============
idInternalCVar::UpdateCheat
============
*/
UpdateCheat( ):void {
	// all variables are considered cheats except for a few types
	if ( this.flags & ( CVAR_NOCHEAT | CVAR_INIT | CVAR_ROM | CVAR_ARCHIVE | CVAR_USERINFO | CVAR_SERVERINFO | CVAR_NETWORKSYNC ) ) {
		this.flags &= ~CVAR_CHEAT;
	} else {
		this.flags |= CVAR_CHEAT;
	}
}

/////*
////============
////idInternalCVar::Set
////============
////*/
////void idInternalCVar::Set( const char *newValue, bool force, bool fromServer ) {
////	if ( session && session.IsMultiplayer() && !fromServer ) {
////#ifndef ID_TYPEINFO
////		if ( ( flags & CVAR_NETWORKSYNC ) && idAsyncNetwork::client.IsActive() ) {
////			common.Printf( "%s is a synced over the network and cannot be changed on a multiplayer client.\n", nameString.c_str() );
////#if ID_ALLOW_CHEATS
////			common.Printf( "ID_ALLOW_CHEATS override!\n" );
////#else				
////			return;
////#endif
////		}
////#endif
////		if ( ( flags & CVAR_CHEAT ) && !cvarSystem.GetCVarBool( "net_allowCheats" ) ) {
////			common.Printf( "%s cannot be changed in multiplayer.\n", nameString.c_str() );
////#if ID_ALLOW_CHEATS
////			common.Printf( "ID_ALLOW_CHEATS override!\n" );
////#else				
////			return;
////#endif
////		}	
////	}

////	if ( !newValue ) {
////		newValue = resetString.c_str();
////	}

////	if ( !force ) {
////		if ( flags & CVAR_ROM ) {
////			common.Printf( "%s is read only.\n", nameString.c_str() );
////			return;
////		}

////		if ( flags & CVAR_INIT ) {
////			common.Printf( "%s is write protected.\n", nameString.c_str() );
////			return;
////		}
////	}

////	if ( valueString.Icmp( newValue ) == 0 ) {
////		return;
////	}

////	valueString = newValue;
////	value = valueString.c_str();
////	UpdateValue();

////	SetModified();
////	cvarSystem.SetModifiedFlags( flags );
////}

/////*
////============
////idInternalCVar::Reset
////============
////*/
////void idInternalCVar::Reset( void ) {
////	valueString = resetString;
////	value = valueString.c_str();
////	UpdateValue();
////}

/////*
////============
////idInternalCVar::InternalSetString
////============
////*/
////void idInternalCVar::InternalSetString( const char *newValue ) {
////	Set( newValue, true, false );
////}

/////*
////===============
////idInternalCVar::InternalServerSetString
////===============
////*/
////void idInternalCVar::InternalServerSetString( const char *newValue ) {
////	Set( newValue, true, true );
////}

/////*
////============
////idInternalCVar::InternalSetBool
////============
////*/
////void idInternalCVar::InternalSetBool( const bool newValue ) {
////	Set( idStr( newValue ), true, false );
////}

/////*
////============
////idInternalCVar::InternalSetInteger
////============
////*/
////void idInternalCVar::InternalSetInteger( const int newValue ) {
////	Set( idStr( newValue ), true, false );
////}

/////*
////============
////idInternalCVar::InternalSetFloat
////============
////*/
////void idInternalCVar::InternalSetFloat( const float newValue ) {
////	Set( idStr( newValue ), true, false );
////}
}

/*
===============================================================================

	idCVarSystemLocal

===============================================================================
*/

class idCVarSystem {
////public:
////							idCVarSystemLocal( void );

////	virtual					~idCVarSystemLocal( void ) {}

////	virtual void			Init( void );
////	virtual void			Shutdown( void );
////	virtual bool			IsInitialized( void ) const;

    //Register( cvar:idCVar ):void;

////	virtual idCVar *		Find( const char *name );

////	virtual void			SetCVarString( const char *name, const char *value, int flags = 0 );
////	virtual void			SetCVarBool( const char *name, const bool value, int flags = 0 );
////	virtual void			SetCVarInteger( const char *name, const int value, int flags = 0 );
////	virtual void			SetCVarFloat( const char *name, const float value, int flags = 0 );

////	virtual const char *	GetCVarString( const char *name ) const;
////	virtual bool			GetCVarBool( const char *name ) const;
////	virtual int				GetCVarInteger( const char *name ) const;
////	virtual float			GetCVarFloat( const char *name ) const;

////	virtual bool			Command( const idCmdArgs &args );

////	virtual void			CommandCompletion( void(*callback)( const char *s ) );
////	virtual void			ArgCompletion( const char *cmdString, void(*callback)( const char *s ) );

////	virtual void			SetModifiedFlags( int flags );
////	virtual int				GetModifiedFlags( void ) const;
////	virtual void			ClearModifiedFlags( int flags );

////	virtual void			ResetFlaggedVariables( int flags );
////	virtual void			RemoveFlaggedAutoCompletion( int flags );
////	virtual void			WriteFlaggedVariables( int flags, const char *setCmd, idFile *f ) const;

////	virtual const idDict *	MoveCVarsToDict( int flags ) const;
////	virtual void			SetCVarsFromDict( const idDict &dict );

////	void					RegisterInternal( idCVar *cvar );
////	idInternalCVar *		FindInternal( const char *name ) const;
////	void					SetInternal( const char *name, const char *value, int flags );

////private:
                                initialized:boolean;
/*idList<idInternalCVar*>	*/  cvars:Array<idInternalCVar>;
/*	idHashIndex				*/  cvarHash:idHashIndex;
        						modifiedFlags:number;
////							// use a static dictionary to MoveCVarsToDict can be used from game
////	static idDict			moveCVarsToDict;


////private:
////	static void				Toggle_f( const idCmdArgs &args );
////	static void				Set_f( const idCmdArgs &args );
////	static void				SetS_f( const idCmdArgs &args );
////	static void				SetU_f( const idCmdArgs &args );
////	static void				SetT_f( const idCmdArgs &args );
////	static void				SetA_f( const idCmdArgs &args );
////	static void				Reset_f( const idCmdArgs &args );
////	static void				ListByFlags( const idCmdArgs &args, cvarFlags_t flags );
////	static void				List_f( const idCmdArgs &args );
////	static void				Restart_f( const idCmdArgs &args );


////idDict						idCVarSystemLocal::moveCVarsToDict;

////#define NUM_COLUMNS				77		// 78 - 1
////#define NUM_NAME_CHARS			33
////#define NUM_DESCRIPTION_CHARS	( NUM_COLUMNS - NUM_NAME_CHARS )
////#define FORMAT_STRING			"%-32s "

	constructor ( ) {
		this.initialized = false;
		this.cvars = new Array<idInternalCVar> ( ); /*or idList*/
		this.cvarHash = new idHashIndex ( );
		this.modifiedFlags = 0;
	}

////const char *CreateColumn( const char *text, int columnWidth, const char *indent, idStr &string ) {
////	int i, lastLine;

////	string.Clear();
////	for ( lastLine = i = 0; text[i] != '\0'; i++ ) {
////		if ( i - lastLine >= columnWidth || text[i] == '\n' ) {
////			while( i > 0 && text[i] > ' ' && text[i] != '/' && text[i] != ',' && text[i] != '\\' ) {
////				i--;
////			}
////			while( lastLine < i ) {
////				string.Append( text[lastLine++] );
////			}
////			string.Append( indent );
////			lastLine++;
////		}
////	}
////	while( lastLine < i ) {
////		string.Append( text[lastLine++] );
////	}
////	return string.c_str();
////}

/*
============
idCVarSystemLocal::FindInternal
============
*/
FindInternal( /*const char **/name:string ):idInternalCVar {
	var/*int */hash = this.cvarHash.GenerateKey( name, false );
	for ( var/*int */i = this.cvarHash.First( hash ); i != -1; i = this.cvarHash.Next( i ) ) {
		if ( this.cvars[i].nameString.Icmp( name ) == 0 ) {
			return this.cvars[i];
		}
	}
	return /*NULL*/null;
}

/////*
////============
////idCVarSystemLocal::SetInternal
////============
////*/
////void idCVarSystemLocal::SetInternal( const char *name, const char *value, int flags ) {
////	int hash;
////	idInternalCVar *internal;

////	internal = FindInternal( name );

////	if ( internal ) {
////		internal.InternalSetString( value );
////		internal.flags |= flags & ~CVAR_STATIC;
////		internal.UpdateCheat();
////	} else {
////		internal = new idInternalCVar( name, value, flags );
////		hash = cvarHash.GenerateKey( internal.nameString.c_str(), false );
////		cvarHash.Add( hash, cvars.Append( internal ) );
////	}
////}

/////*
////============
////idCVarSystemLocal::idCVarSystemLocal
////============
////*/
////idCVarSystemLocal::idCVarSystemLocal( void ) {
////	this.initialized = false;
////	this.modifiedFlags = 0;
////}

/*
============
idCVarSystemLocal::Init
============
*/
Init( ):void {

	this.modifiedFlags = 0;

	cmdSystem.AddCommand( "toggle", this.Toggle_f, CMD_FL_SYSTEM, "toggles a cvar" );
	cmdSystem.AddCommand( "set", this.Set_f, CMD_FL_SYSTEM, "sets a cvar" );
	cmdSystem.AddCommand( "sets", this.SetS_f, CMD_FL_SYSTEM, "sets a cvar and flags it as server info" );
	cmdSystem.AddCommand( "setu", this.SetU_f, CMD_FL_SYSTEM, "sets a cvar and flags it as user info" );
	cmdSystem.AddCommand( "sett", this.SetT_f, CMD_FL_SYSTEM, "sets a cvar and flags it as tool" );
	cmdSystem.AddCommand( "seta", this.SetA_f, CMD_FL_SYSTEM, "sets a cvar and flags it as archive" );
	cmdSystem.AddCommand( "reset", this.Reset_f, CMD_FL_SYSTEM, "resets a cvar" );
	cmdSystem.AddCommand( "listCvars", this.List_f, CMD_FL_SYSTEM, "lists cvars" );
	cmdSystem.AddCommand( "cvar_restart", this.Restart_f, CMD_FL_SYSTEM, "restart the cvar system" );

	this.initialized = true;
}

///*
//============
//idCVarSystemLocal::Shutdown
//============
//*/
//void /*idCVarSystemLocal::*/Shutdown( void ) {
//	cvars.DeleteContents( true );
//	cvarHash.Free();
//	moveCVarsToDict.Clear();
//	this.initialized = false;
//}

/*
============
idCVarSystemLocal::IsInitialized
============
*/
IsInitialized( ):boolean {
	return this.initialized;
}

/*
============
idCVarSystemLocal::Register
============
*/
Register( cvar:idCVar ):void {
	var/*int */hash:number;
	var internal:idInternalCVar;

	cvar.SetInternalVar( cvar );

	internal = this.FindInternal( cvar.GetName() );

	if ( internal ) {
		internal.Update( cvar );
	} else {
		internal = new idInternalCVar( cvar );
		hash = this.cvarHash.GenerateKey( internal.nameString.c_str(), false );
		this.cvarHash.Add( hash, this.cvars.Append( internal ) );
	}

	cvar.SetInternalVar( internal );
}

///*
//============
//idCVarSystemLocal::Find
//============
//*/
//idCVar */*idCVarSystemLocal::*/Find( const char *name ) {
//	return FindInternal( name );
//}

///*
//============
//idCVarSystemLocal::SetCVarString
//============
//*/
//void /*idCVarSystemLocal::*/SetCVarString( const char *name, const char *value, int flags ) {
//	SetInternal( name, value, flags );
//}

///*
//============
//idCVarSystemLocal::SetCVarBool
//============
//*/
//void /*idCVarSystemLocal::*/SetCVarBool( const char *name, const bool value, int flags ) {
//	SetInternal( name, idStr( value ), flags );
//}

///*
//============
//idCVarSystemLocal::SetCVarInteger
//============
//*/
//void /*idCVarSystemLocal::*/SetCVarInteger( const char *name, const int value, int flags ) {
//	SetInternal( name, idStr( value ), flags );
//}

///*
//============
//idCVarSystemLocal::SetCVarFloat
//============
//*/
//void idCVarSystemLocal::SetCVarFloat( const char *name, const float value, int flags ) {
//	SetInternal( name, idStr( value ), flags );
//}

///*
//============
//idCVarSystemLocal::GetCVarString
//============
//*/
//const char */*idCVarSystemLocal::*/GetCVarString( const char *name ) const {
//	idInternalCVar *internal = FindInternal( name );
//	if ( internal ) {
//		return internal.GetString();
//	}
//	return "";
//}

///*
//============
//idCVarSystemLocal::GetCVarBool
//============
//*/
//bool /*idCVarSystemLocal::*/GetCVarBool( const char *name ) const {
//	idInternalCVar *internal = FindInternal( name );
//	if ( internal ) {
//		return internal.GetBool();
//	}
//	return false;
//}

///*
//============
//idCVarSystemLocal::GetCVarInteger
//============
//*/
//int /*idCVarSystemLocal::*/GetCVarInteger( const char *name ) const {
//	idInternalCVar *internal = FindInternal( name );
//	if ( internal ) {
//		return internal.GetInteger();
//	}
//	return 0;
//}

///*
//============
//idCVarSystemLocal::GetCVarFloat
//============
//*/
//float /*idCVarSystemLocal::*/GetCVarFloat( const char *name ) const {
//	idInternalCVar *internal = FindInternal( name );
//	if ( internal ) {
//		return internal.GetFloat();
//	}
//	return 0.0f;
//}

///*
//============
//idCVarSystemLocal::Command
//============
//*/
//bool /*idCVarSystemLocal::*/Command( const idCmdArgs &args ) {
//	idInternalCVar *internal;

//	internal = FindInternal( args.Argv( 0 ) );

//	if ( internal == NULL ) {
//		return false;
//	}

//	if ( args.Argc() == 1 ) {
//		// print the variable
//		common.Printf( "\"%s\" is:\"%s\"" S_COLOR_WHITE " default:\"%s\"\n",
//					internal.nameString.c_str(), internal.valueString.c_str(), internal.resetString.c_str() );
//		if ( idStr.Length( internal.GetDescription() ) > 0 ) {
//			common.Printf( S_COLOR_WHITE "%s\n", internal.GetDescription() );
//		}
//	} else {
//		// set the value
//		internal.Set( args.Args(), false, false );
//	}
//	return true;
//}

///*
//============
//idCVarSystemLocal::CommandCompletion
//============
//*/
//void /*idCVarSystemLocal::*/CommandCompletion( void(*callback)( const char *s ) ) {
//	for( int i = 0; i < cvars.Num(); i++ ) {
//		callback( cvars[i].GetName() );
//	}
//}

///*
//============
//idCVarSystemLocal::ArgCompletion
//============
//*/
//void /*idCVarSystemLocal::*/ArgCompletion( const char *cmdString, void(*callback)( const char *s ) ) {
//	idCmdArgs args;

//	args.TokenizeString( cmdString, false );

//	for( int i = 0; i < cvars.Num(); i++ ) {
//		if ( !cvars[i].valueCompletion ) {
//			continue;
//		}
//		if ( idStr.Icmp( args.Argv( 0 ), cvars[i].nameString.c_str() ) == 0 ) {
//			cvars[i].valueCompletion( args, callback );
//			break;
//		}
//	}
//}

///*
//============
//idCVarSystemLocal::SetModifiedFlags
//============
//*/
//void /*idCVarSystemLocal::*/SetModifiedFlags( int flags ) {
//	this.modifiedFlags |= flags;
//}

///*
//============
//idCVarSystemLocal::GetModifiedFlags
//============
//*/
//int /*idCVarSystemLocal::*/GetModifiedFlags( void ) const {
//	return this.modifiedFlags;
//}

///*
//============
//idCVarSystemLocal::ClearModifiedFlags
//============
//*/
//void /*idCVarSystemLocal::*/ClearModifiedFlags( int flags ) {
//	this.modifiedFlags &= ~flags;
//}

///*
//============
//idCVarSystemLocal::ResetFlaggedVariables
//============
//*/
//void /*idCVarSystemLocal::*/ResetFlaggedVariables( int flags ) {
//	for( int i = 0; i < cvars.Num(); i++ ) {
//		idInternalCVar *cvar = cvars[i];
//		if ( cvar.GetFlags() & flags ) {
//			cvar.Set( NULL, true, true );
//		}
//	}
//}

///*
//============
//idCVarSystemLocal::RemoveFlaggedAutoCompletion
//============
//*/
//void /*idCVarSystemLocal::*/RemoveFlaggedAutoCompletion( int flags ) {
//	for( int i = 0; i < cvars.Num(); i++ ) {
//		idInternalCVar *cvar = cvars[i];
//		if ( cvar.GetFlags() & flags ) {
//			cvar.valueCompletion = NULL;
//		}
//	}
//}

/*
============
idCVarSystemLocal::WriteFlaggedVariables

Appends lines containing "set variable value" for all variables
with the "flags" flag set to true.
============
*/
//void /*idCVarSystemLocal::*/WriteFlaggedVariables( int flags, const char *setCmd, idFile *f ) const {
//	for( int i = 0; i < cvars.Num(); i++ ) {
//		idInternalCVar *cvar = cvars[i];
//		if ( cvar.GetFlags() & flags ) {
//			f.Printf( "%s %s \"%s\"\n", setCmd, cvar.GetName(), cvar.GetString() );
//		}
//	}
//}

///*
//============
//idCVarSystemLocal::MoveCVarsToDict
//============
//*/
//const idDict* /*idCVarSystemLocal::*/MoveCVarsToDict( int flags ) const {
//	moveCVarsToDict.Clear();
//	for( int i = 0; i < cvars.Num(); i++ ) {
//		idCVar *cvar = cvars[i];
//		if ( cvar.GetFlags() & flags ) {
//			moveCVarsToDict.Set( cvar.GetName(), cvar.GetString() );
//		}
//	}
//	return &moveCVarsToDict;
//}

///*
//============
//idCVarSystemLocal::SetCVarsFromDict
//============
//*/
//function /*idCVarSystemLocal::*/SetCVarsFromDict( const idDict &dict ) {
//    todoThrow();
//	//idInternalCVar *internal;

//	//for( int i = 0; i < dict.GetNumKeyVals(); i++ ) {
//	//	const idKeyValue *kv = dict.GetKeyVal( i );
//	//	internal = FindInternal( kv.GetKey() );
//	//	if ( internal ) {
//	//		internal.InternalServerSetString( kv.GetValue() );
//	//	}
//	//}
//}

/*
============
idCVarSystemLocal::Toggle_f
============
*/
Toggle_f( /*const */ args:idCmdArgs  ):void {
    todoThrow();
	//int argc, i;
	//float current, set;
	//const char *text;

	//argc = args.Argc();
	//if ( argc < 2 ) {
	//	common.Printf ("usage:\n"
	//		"   toggle <variable>  - toggles between 0 and 1\n"
	//		"   toggle <variable> <value> - toggles between 0 and <value>\n"
	//		"   toggle <variable> [string 1] [string 2]...[string n] - cycles through all strings\n");
	//	return;
	//}

	//idInternalCVar *cvar = localCVarSystem.FindInternal( args.Argv( 1 ) );

	//if ( cvar == NULL ) {
	//	common.Warning( "Toggle_f: cvar \"%s\" not found", args.Argv( 1 ) );
	//	return;
	//}

	//if ( argc > 3 ) {
	//	// cycle through multiple values
	//	text = cvar.GetString();
	//	for( i = 2; i < argc; i++ ) {
	//		if ( !idStr.Icmp( text, args.Argv( i ) ) ) {
	//			// point to next value
	//			i++;
	//			break;
	//		}
	//	}
	//	if ( i >= argc ) {
	//		i = 2;
	//	}

	//	common.Printf( "set %s = %s\n", args.Argv(1), args.Argv( i ) );
	//	cvar.Set( va("%s", args.Argv( i ) ), false, false );
	//} else {
	//	// toggle between 0 and 1
	//	current = cvar.GetFloat();
	//	if ( argc == 3 ) {
	//		set = atof( args.Argv( 2 ) );
	//	} else {
	//		set = 1.0f;
	//	}
	//	if ( current == 0.0f ) {
	//		current = set;
	//	} else {
	//		current = 0.0f;
	//	}
	//	common.Printf( "set %s = %f\n", args.Argv(1), current );
	//	cvar.Set( idStr( current ), false, false );
	//}
}

/*
============
idCVarSystemLocal::Set_f
============
*/
Set_f( /*const */ args:idCmdArgs  ):void {
    todoThrow();
	//const char *str;

	//str = args.Args( 2, args.Argc() - 1 );
	//localCVarSystem.SetCVarString( args.Argv(1), str );
}

/*
============
idCVarSystemLocal::SetS_f
============
*/
SetS_f( /*const */ args:idCmdArgs  ):void {
    todoThrow();
	//idInternalCVar *cvar;

	//Set_f( args );
	//cvar = localCVarSystem.FindInternal( args.Argv( 1 ) );
	//if ( !cvar ) {
	//	return;
	//}
	//cvar.flags |= CVAR_SERVERINFO | CVAR_ARCHIVE;
}

/*
============
idCVarSystemLocal::SetU_f
============
*/
SetU_f( /*const */ args:idCmdArgs  ):void {
    todoThrow();
	//idInternalCVar *cvar;

	//Set_f( args );
	//cvar = localCVarSystem.FindInternal( args.Argv( 1 ) );
	//if ( !cvar ) {
	//	return;
	//}
	//cvar.flags |= CVAR_USERINFO | CVAR_ARCHIVE;
}

/*
============
idCVarSystemLocal::SetT_f
============
*/
SetT_f( /*const */ args:idCmdArgs  ):void {
    todoThrow();
	//idInternalCVar *cvar;

	//Set_f( args );
	//cvar = localCVarSystem.FindInternal( args.Argv( 1 ) );
	//if ( !cvar ) {
	//	return;
	//}
	//cvar.flags |= CVAR_TOOL;
}

/*
============
idCVarSystemLocal::SetA_f
============
*/
SetA_f( /*const */ args:idCmdArgs  ):void {
    todoThrow();
//	idInternalCVar *cvar;

//	Set_f( args );
//	cvar = localCVarSystem.FindInternal( args.Argv( 1 ) );
//	if ( !cvar ) {
//		return;
//	}

//	// FIXME: enable this for ship, so mods can store extra data
//	// but during development we don't want obsolete cvars to continue
//	// to be saved
////	cvar.flags |= CVAR_ARCHIVE;
}

/*
============
idCVarSystemLocal::Reset_f
============
*/
Reset_f( /*const */ args:idCmdArgs  ):void {
    todoThrow();
	//idInternalCVar *cvar;

	//if ( args.Argc() != 2 ) {
	//	common.Printf ("usage: reset <variable>\n");
	//	return;
	//}
	//cvar = localCVarSystem.FindInternal( args.Argv( 1 ) );
	//if ( !cvar ) {
	//	return;
	//}

	//cvar.Reset();
}

/*
============
idCVarSystemLocal::ListByFlags
============
*/
//// NOTE: the const wonkyness is required to make msvc happy
//template<>
//ID_INLINE int idListSortCompare( const idInternalCVar * const *a, const idInternalCVar * const *b ) {
//    todoThrow();
//	return idStr.Icmp( (*a).GetName(), (*b).GetName() );
//}

//function idCVarSystemLocal::ListByFlags( const idCmdArgs &args, cvarFlags_t flags ) {
//    todoThrow();
//	//int i, argNum;
//	//idStr match, indent, string;
//	//const idInternalCVar *cvar;
//	//idList<const idInternalCVar *>cvarList;

//	//enum {
//	//	SHOW_VALUE,
//	//	SHOW_DESCRIPTION,
//	//	SHOW_TYPE,
//	//	SHOW_FLAGS
//	//} show;

//	//argNum = 1;
//	//show = SHOW_VALUE;

//	//if ( idStr.Icmp( args.Argv( argNum ), "-" ) == 0 || idStr.Icmp( args.Argv( argNum ), "/" ) == 0 ) {
//	//	if ( idStr.Icmp( args.Argv( argNum + 1 ), "help" ) == 0 || idStr.Icmp( args.Argv( argNum + 1 ), "?" ) == 0 ) {
//	//		argNum = 3;
//	//		show = SHOW_DESCRIPTION;
//	//	} else if ( idStr.Icmp( args.Argv( argNum + 1 ), "type" ) == 0 || idStr.Icmp( args.Argv( argNum + 1 ), "range" ) == 0 ) {
//	//		argNum = 3;
//	//		show = SHOW_TYPE;
//	//	} else if ( idStr.Icmp( args.Argv( argNum + 1 ), "flags" ) == 0 ) {
//	//		argNum = 3;
//	//		show = SHOW_FLAGS;
//	//	}
//	//}

//	//if ( args.Argc() > argNum ) {
//	//	match = args.Args( argNum, -1 );
//	//	match.Replace( " ", "" );
//	//} else {
//	//	match = "";
//	//}

//	//for ( i = 0; i < localCVarSystem.cvars.Num(); i++ ) {
//	//	cvar = localCVarSystem.cvars[i];

//	//	if ( !( cvar.GetFlags() & flags ) ) {
//	//		continue;
//	//	}

//	//	if ( match.Length() && !cvar.nameString.Filter( match, false ) ) {
//	//		continue;
//	//	}

//	//	cvarList.Append( cvar );
//	//}

//	//cvarList.Sort();

//	//switch( show ) {
//	//	case SHOW_VALUE: {
//	//		for ( i = 0; i < cvarList.Num(); i++ ) {
//	//			cvar = cvarList[i];
//	//			common.Printf( FORMAT_STRING S_COLOR_WHITE "\"%s\"\n", cvar.nameString.c_str(), cvar.valueString.c_str() );
//	//		}
//	//		break;
//	//	}
//	//	case SHOW_DESCRIPTION: {
//	//		indent.Fill( ' ', NUM_NAME_CHARS );
//	//		indent.Insert( "\n", 0 );

//	//		for ( i = 0; i < cvarList.Num(); i++ ) {
//	//			cvar = cvarList[i];
//	//			common.Printf( FORMAT_STRING S_COLOR_WHITE "%s\n", cvar.nameString.c_str(), CreateColumn( cvar.GetDescription(), NUM_DESCRIPTION_CHARS, indent, string ) );
//	//		}
//	//		break;
//	//	}
//	//	case SHOW_TYPE: {
//	//		for ( i = 0; i < cvarList.Num(); i++ ) {
//	//			cvar = cvarList[i];
//	//			if ( cvar.GetFlags() & CVAR_BOOL ) {
//	//				common.Printf( FORMAT_STRING S_COLOR_CYAN "bool\n", cvar.GetName() );
//	//			} else if ( cvar.GetFlags() & CVAR_INTEGER ) {
//	//				if ( cvar.GetMinValue() < cvar.GetMaxValue() ) {
//	//					common.Printf( FORMAT_STRING S_COLOR_GREEN "int " S_COLOR_WHITE "[%d, %d]\n", cvar.GetName(), (int) cvar.GetMinValue(), (int) cvar.GetMaxValue() );
//	//				} else {
//	//					common.Printf( FORMAT_STRING S_COLOR_GREEN "int\n", cvar.GetName() );
//	//				}
//	//			} else if ( cvar.GetFlags() & CVAR_FLOAT ) {
//	//				if ( cvar.GetMinValue() < cvar.GetMaxValue() ) {
//	//					common.Printf( FORMAT_STRING S_COLOR_RED "float " S_COLOR_WHITE "[%s, %s]\n", cvar.GetName(), idStr( cvar.GetMinValue() ).c_str(), idStr( cvar.GetMaxValue() ).c_str() );
//	//				} else {
//	//					common.Printf( FORMAT_STRING S_COLOR_RED "float\n", cvar.GetName() );
//	//				}
//	//			} else if ( cvar.GetValueStrings() ) {
//	//				common.Printf( FORMAT_STRING S_COLOR_WHITE "string " S_COLOR_WHITE "[", cvar.GetName() );
//	//				for ( int j = 0; cvar.GetValueStrings()[j] != NULL; j++ ) {
//	//					if ( j ) {
//	//						common.Printf( S_COLOR_WHITE ", %s", cvar.GetValueStrings()[j] );
//	//					} else {
//	//						common.Printf( S_COLOR_WHITE "%s", cvar.GetValueStrings()[j] );
//	//					}
//	//				}
//	//				common.Printf( S_COLOR_WHITE "]\n" );
//	//			} else {
//	//				common.Printf( FORMAT_STRING S_COLOR_WHITE "string\n", cvar.GetName() );
//	//			}
//	//		}
//	//		break;
//	//	}
//	//	case SHOW_FLAGS: {
//	//		for ( i = 0; i < cvarList.Num(); i++ ) {
//	//			cvar = cvarList[i];
//	//			common.Printf( FORMAT_STRING, cvar.GetName() );
//	//			string = "";
//	//			if ( cvar.GetFlags() & CVAR_BOOL ) {
//	//				string += S_COLOR_CYAN "B ";
//	//			} else if ( cvar.GetFlags() & CVAR_INTEGER ) {
//	//				string += S_COLOR_GREEN "I ";
//	//			} else if ( cvar.GetFlags() & CVAR_FLOAT ) {
//	//				string += S_COLOR_RED "F ";
//	//			} else {
//	//				string += S_COLOR_WHITE "S ";
//	//			}
//	//			if ( cvar.GetFlags() & CVAR_SYSTEM ) {
//	//				string += S_COLOR_WHITE "SYS  ";
//	//			} else if ( cvar.GetFlags() & CVAR_RENDERER ) {
//	//				string += S_COLOR_WHITE "RNDR ";
//	//			} else if ( cvar.GetFlags() & CVAR_SOUND ) {
//	//				string += S_COLOR_WHITE "SND  ";
//	//			} else if ( cvar.GetFlags() & CVAR_GUI ) {
//	//				string += S_COLOR_WHITE "GUI  ";
//	//			} else if ( cvar.GetFlags() & CVAR_GAME ) {
//	//				string += S_COLOR_WHITE "GAME ";
//	//			} else if ( cvar.GetFlags() & CVAR_TOOL ) {
//	//				string += S_COLOR_WHITE "TOOL ";
//	//			} else {
//	//				string += S_COLOR_WHITE "     ";
//	//			}
//	//			string += ( cvar.GetFlags() & CVAR_USERINFO ) ?	"UI "	: "   ";
//	//			string += ( cvar.GetFlags() & CVAR_SERVERINFO ) ?	"SI "	: "   ";
//	//			string += ( cvar.GetFlags() & CVAR_STATIC ) ?		"ST "	: "   ";
//	//			string += ( cvar.GetFlags() & CVAR_CHEAT ) ?		"CH "	: "   ";
//	//			string += ( cvar.GetFlags() & CVAR_INIT ) ?		"IN "	: "   ";
//	//			string += ( cvar.GetFlags() & CVAR_ROM ) ?			"RO "	: "   ";
//	//			string += ( cvar.GetFlags() & CVAR_ARCHIVE ) ?		"AR "	: "   ";
//	//			string += ( cvar.GetFlags() & CVAR_MODIFIED ) ?	"MO "	: "   ";
//	//			string += "\n";
//	//			common.Printf( string );
//	//		}
//	//		break;
//	//	}
//	//}

//	//common.Printf( "\n%i cvars listed\n\n", cvarList.Num() );
//	//common.Printf(	"listCvar [search string]          = list cvar values\n"
//	//			"listCvar -help [search string]    = list cvar descriptions\n"
//	//			"listCvar -type [search string]    = list cvar types\n"
//	//			"listCvar -flags [search string]   = list cvar flags\n" );
//}

/*
============
idCVarSystemLocal::List_f
============
*/
List_f( /*const */ args:idCmdArgs  ):void {
    todoThrow();
	//ListByFlags( args, CVAR_ALL );
}

/*
============
idCVarSystemLocal::Restart_f
============
*/
Restart_f( /*const */ args:idCmdArgs  ):void {
    todoThrow();
	//int i, hash;
	//idInternalCVar *cvar;

	//for ( i = 0; i < localCVarSystem.cvars.Num(); i++ ) {
	//	cvar = localCVarSystem.cvars[i];

	//	// don't mess with rom values
	//	if ( cvar.flags & ( CVAR_ROM | CVAR_INIT ) ) {
	//		continue;
	//	}

	//	// throw out any variables the user created
	//	if ( !( cvar.flags & CVAR_STATIC ) ) {
	//		hash = localCVarSystem.cvarHash.GenerateKey( cvar.nameString, false );
	//		delete cvar;
	//		localCVarSystem.cvars.RemoveIndex( i );
	//		localCVarSystem.cvarHash.RemoveIndex( hash, i );
	//		i--;
	//		continue;
	//	}

	//	cvar.Reset();
	//}
}


}
var localCVarSystem = new /*idCVarSystemLocal*/idCVarSystem();
var cvarSystem = localCVarSystem;