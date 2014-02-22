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

////#ifndef __CVARSYSTEM_H__
////#define __CVARSYSTEM_H__

/////*
////===============================================================================

////	Console Variables (CVars) are used to hold scalar or string variables
////	that can be changed or displayed at the console as well as accessed
////	directly in code.

////	CVars are mostly used to hold settings that can be changed from the
////	console or saved to and loaded from configuration files. CVars are also
////	occasionally used to communicate information between different modules
////	of the program.

////	CVars are restricted from having the same names as console commands to
////	keep the console interface from being ambiguous.

////	CVars can be accessed from the console in three ways:
////	cvarName			prints the current value
////	cvarName X			sets the value to X if the variable exists
////	set cvarName X		as above, but creates the CVar if not present

////	CVars may be declared in the global namespace, in classes and in functions.
////	However declarations in classes and functions should always be static to
////	save space and time. Making CVars static does not change their
////	functionality due to their global nature.

////	CVars should be contructed only through one of the constructors with name,
////	value, flags and description. The name, value and description parameters
////	to the constructor have to be static strings, do not use va() or the like
////	functions returning a string.

////	CVars may be declared multiple times using the same name string. However,
////	they will all reference the same value and changing the value of one CVar
////	changes the value of all CVars with the same name.

////	CVars should always be declared with the correct type flag: CVAR_BOOL,
////	CVAR_INTEGER or CVAR_FLOAT. If no such flag is specified the CVar
////	defaults to type string. If the CVAR_BOOL flag is used there is no need
////	to specify an argument auto-completion function because the CVar gets
////	one assigned automatically.

////	CVars are automatically range checked based on their type and any min/max
////	or valid string set specified in the constructor.

////	CVars are always considered cheats except when CVAR_NOCHEAT, CVAR_INIT,
////	CVAR_ROM, CVAR_ARCHIVE, CVAR_USERINFO, CVAR_SERVERINFO, CVAR_NETWORKSYNC
////	is set.

////===============================================================================
////*/

////typedef enum {
var     CVAR_ALL				= -1,		// all flags
        CVAR_BOOL				= BIT(0),	// variable is a boolean
        CVAR_INTEGER			= BIT(1),	// variable is an integer
        CVAR_FLOAT				= BIT(2),	// variable is a float
        CVAR_SYSTEM				= BIT(3),	// system variable
        CVAR_RENDERER			= BIT(4),	// renderer variable
        CVAR_SOUND				= BIT(5),	// sound variable
        CVAR_GUI				= BIT(6),	// gui variable
        CVAR_GAME				= BIT(7),	// game variable
        CVAR_TOOL				= BIT(8),	// tool variable
        CVAR_USERINFO			= BIT(9),	// sent to servers, available to menu
        CVAR_SERVERINFO			= BIT(10),	// sent from servers, available to menu
        CVAR_NETWORKSYNC		= BIT(11),	// cvar is synced from the server to clients
        CVAR_STATIC				= BIT(12),	// statically declared, not user created
        CVAR_CHEAT				= BIT(13),	// variable is considered a cheat
        CVAR_NOCHEAT			= BIT(14),	// variable is not considered a cheat
        CVAR_INIT				= BIT(15),	// can only be set from the command-line
        CVAR_ROM				= BIT(16),	// display only, cannot be set by user at all
        CVAR_ARCHIVE			= BIT(17),	// set to cause it to be saved to a config file
        CVAR_MODIFIED			= BIT(18);	// set when the variable is modified
////} cvarFlags_t;


/*
===============================================================================

	idCVar

===============================================================================
*/

class idCVar {
//public:
	//// Never use the default constructor.
	//idCVar( void ) { assert( typeid( this ) != typeid( idCVar ) ); }
    constructor ( )

    // Always use one of the following constructors.
    constructor ( name: string, value: string, flags: number, description: string )
    constructor ( name: string, value: string, flags: number, description: string, valueMin: number, valueMax: number)
    constructor ( name: string, value: string, flags: number, description: string,
        valueMin: number, valueMax: number, valueCompletion:/*:argCompletion_t*/ ( args: idCmdArgs, callback: ( s: string ) => void ) => void  )
    constructor ( name: string, value: string, flags: number, description: string,
        valueStrings: string[], valueCompletion:/*:argCompletion_t*/ ( args: idCmdArgs, callback: ( s: string ) => void ) => void  )
    constructor ( name?: string, value?: string, /*int */flags?: number, description?: string,
        valueStringsOrValueMinOrValueCompletion?: any, valueMaxOrValueCompletion?: any, valueCompletion:/*argCompletion_t*/ ( args: idCmdArgs, callback: ( s: string ) => void ) => void = null ) {

        // todo wtf: tidy this up - create a method for each overload

        if ( arguments.length == 0 ) {
            return; // empty ctor call e.g. super ( ); from idInternalCVar
        }
        else if ( arguments.length == 4 || arguments.length == 5 ) {
            if ( !valueCompletion && ( flags & CVAR_BOOL ) ) {
		        this.valueCompletion = /*idCmdSystem::*/ArgCompletion_Boolean;
	        }
	        this.Init( name, value, flags, description, 1, -1, null, valueStringsOrValueMinOrValueCompletion );
        } else if ( typeof valueStringsOrValueMinOrValueCompletion === "number" ) {
            this.Init( name, value, flags, description, valueStringsOrValueMinOrValueCompletion, valueMaxOrValueCompletion, null, valueCompletion );
        } else {
            this.Init( name, value, flags, description, 1, -1, valueStringsOrValueMinOrValueCompletion, valueMaxOrValueCompletion );
        }
    }

////	virtual					~idCVar( void ) {}
        
/*const char *			*/  GetName( ):string { return this.internalVar.name; }
/*	int					*/  GetFlags( ):number { return this.internalVar.flags; }
/*const char *			*/  GetDescription( ):string { return this.internalVar.description; }
/*float					*/  GetMinValue( ):number { return this.internalVar.valueMin; }
/*float					*/  GetMaxValue( ):number { return this.internalVar.valueMax; }
/*const char **			*/  GetValueStrings( ):string[]  { return this.valueStrings; }
/*argCompletion_t		*/	GetValueCompletion( ):( /*argCompletion_t*/args: idCmdArgs, callback: ( s: string )=> void )=> void { return this.valueCompletion; }
	
/*	bool					*/IsModified( ):boolean { return ( this.internalVar.flags & CVAR_MODIFIED ) != 0; }
/*	void					*/SetModified( ):void { this.internalVar.flags |= CVAR_MODIFIED; }
/*	void					*/ClearModified( ):void { this.internalVar.flags &= ~CVAR_MODIFIED; }
/*							*/
/*	const char *			*/GetString( ):string { return this.internalVar.value; }
/*    bool                  */GetBool( ):boolean { return ( this.internalVar.integerValue != 0 ); }
/*	int						*/GetInteger( ):number { return this.internalVar.integerValue; }
/*	float					*/GetFloat( ):number { return this.internalVar.floatValue; }
/*							*/
/*	void					*/SetString( value:string ):void { this.internalVar.InternalSetString( value ); }
/*	void					*/SetBool( value:boolean ):void { this.internalVar.InternalSetBool( value ); }
/*	void					*/SetInteger( value:number ):void { this.internalVar.InternalSetInteger( value ); }
/*	void					*/SetFloat( value:number ):void { this.internalVar.InternalSetFloat( value ); }
/*
/*	void					*/SetInternalVar( cvar:idCVar ):void { this.internalVar = cvar; }

////	static void				RegisterStaticVars( void );

////protected:
    name:string;					// name                                    //	const char *			
    value:string;					// value                                   //	const char *			
    description:string;			    // description                             //	const char *			
    flags:number;					// CVAR_? flags                            //	int						
    valueMin:number;				// minimum value                           //	float					
    valueMax:number;				// maximum value                           //	float					
    valueStrings:string[];			// valid value strings                     //	const char **			
    valueCompletion:(args:idCmdArgs, callback: (s: string)=>void)=>void;		        // value auto-completion function          //	argCompletion_t			
    integerValue:number;			// atoi( string )                          //	int						
    floatValue:number;				// atof( value )                           //	float					
    internalVar:idCVar;			    // internal cvar                           //	idCVar *				
    next:idCVar;					// next statically declared cvar           //	idCVar *				

////private:
////	void					Init( const char *name, value:string, int flags, const char *description,
////									float valueMin, float valueMax, const char **valueStrings, argCompletion_t valueCompletion );

	InternalSetString ( newValue: string ): void {}
	InternalSetBool ( newValue: boolean ): void {}
	InternalSetInteger ( /*const int*/ newValue: number ): void {}
	InternalSetFloat ( /*const float */newValue: number ): void {}

	static staticVars:idCVar = new idCVar();
//};

////ID_INLINE idCVar::idCVar( const char *name, value:string, int flags, const char *description,
////							argCompletion_t valueCompletion ) {
////	if ( !valueCompletion && ( flags & CVAR_BOOL ) ) {
////		valueCompletion = idCmdSystem::ArgCompletion_Boolean;
////	}
////	Init( name, value, flags, description, 1, -1, NULL, valueCompletion );
////}

////ID_INLINE idCVar::idCVar( const char *name, value:string, int flags, const char *description,
////							float valueMin, float valueMax, argCompletion_t valueCompletion ) {
////	Init( name, value, flags, description, valueMin, valueMax, NULL, valueCompletion );
////}

////ID_INLINE idCVar::idCVar( const char *name, value:string, int flags, const char *description,
////							const char **valueStrings, argCompletion_t valueCompletion ) {
////	Init( name, value, flags, description, 1, -1, valueStrings, valueCompletion );
////}


/*
===============================================================================

	CVar Registration

	Each DLL using CVars has to declare a private copy of the static variable
	idCVar::staticVars like this: idCVar * idCVar::staticVars = NULL;
	Furthermore idCVar::RegisterStaticVars() has to be called after the
	cvarSystem pointer is set when the DLL is first initialized.

//===============================================================================
//*/

	Init ( /*const char **/name: string, /*const char **/value: string, /*int */flags: number, /*const char **/description: string,
		/*float*/ valueMin: number, /*float */valueMax: number, /*const char ***/valueStrings: string[], valueCompletion: ( args: idCmdArgs, callback: ( s: string ) => void ) => void = null ) {
		this.name = name;
		this.value = value;
		this.flags = flags;
		this.description = description;
		this.flags = flags | CVAR_STATIC;
		this.valueMin = valueMin;
		this.valueMax = valueMax;
		this.valueStrings = valueStrings;
		this.valueCompletion = valueCompletion;
		this.integerValue = 0;
		this.floatValue = 0.0;
		this.internalVar = this;
		if ( !( idCVar.staticVars instanceof idCVar ) /*!= (idCVar *)0xFFFFFFFF*/ ) {
			this.next = idCVar.staticVars;
			idCVar.staticVars = this;
		} else {
			cvarSystem.Register( this );
		}
	}

	static RegisterStaticVars( ):void {
		if ( !( idCVar.staticVars instanceof idCVar ) /*!= (idCVar *)0xFFFFFFFF*/ ) {
			for ( var cvar = idCVar.staticVars; cvar; cvar = cvar.next ) {
				cvarSystem.Register( cvar );
			}
			idCVar.staticVars = null; /*(idCVar *)0xFFFFFFFF;*/
		}
	}

////#endif /* !__CVARSYSTEM_H__ */
}
/*
===============================================================================

	idCVarSystem

===============================================================================
*/

//class idCVarSystem {
////public:
////	virtual					~idCVarSystem( void ) {}

////	virtual void			Init( void ) = 0;
////	virtual void			Shutdown( void ) = 0;
////	virtual bool			IsInitialized( void ) const = 0;

////							// Registers a CVar.
////	virtual void			Register( idCVar *cvar ) = 0;

////							// Finds the CVar with the given name.
////							// Returns NULL if there is no CVar with the given name.
////	virtual idCVar *		Find( const char *name ) = 0;

////							// Sets the value of a CVar by name.
////	virtual void			SetCVarString( const char *name, value:string, int flags = 0 ) = 0;
////	virtual void			SetCVarBool( const char *name, const bool value, int flags = 0 ) = 0;
////	virtual void			SetCVarInteger( const char *name, const int value, int flags = 0 ) = 0;
////	virtual void			SetCVarFloat( const char *name, const float value, int flags = 0 ) = 0;

////							// Gets the value of a CVar by name.
////	virtual const char *	GetCVarString( const char *name ) const = 0;
////	virtual bool			GetCVarBool( const char *name ) const = 0;
////	virtual int				GetCVarInteger( const char *name ) const = 0;
////	virtual float			GetCVarFloat( const char *name ) const = 0;

////							// Called by the command system when argv(0) doesn't match a known command.
////							// Returns true if argv(0) is a variable reference and prints or changes the CVar.
////	virtual bool			Command( const idCmdArgs &args ) = 0;

////							// Command and argument completion using callback for each valid string.
////	virtual void			CommandCompletion( void(*callback)( const char *s ) ) = 0;
////	virtual void			ArgCompletion( const char *cmdString, void(*callback)( const char *s ) ) = 0;

////							// Sets/gets/clears modified flags that tell what kind of CVars have changed.
////	virtual void			SetModifiedFlags( int flags ) = 0;
////	virtual int				GetModifiedFlags( void ) const = 0;
////	virtual void			ClearModifiedFlags( int flags ) = 0;

////							// Resets variables with one of the given flags set.
////	virtual void			ResetFlaggedVariables( int flags ) = 0;

////							// Removes auto-completion from the flagged variables.
////	virtual void			RemoveFlaggedAutoCompletion( int flags ) = 0;

////							// Writes variables with one of the given flags set to the given file.
////	virtual void			WriteFlaggedVariables( int flags, const char *setCmd, idFile *f ) const = 0;

////							// Moves CVars to and from dictionaries.
////	virtual const idDict *	MoveCVarsToDict( int flags ) const = 0;
////	virtual void			SetCVarsFromDict( const idDict &dict ) = 0;
//};

////extern idCVarSystem *		cvarSystem;

