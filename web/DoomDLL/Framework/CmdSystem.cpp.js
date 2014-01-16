/// <reference path="CVarSystem.cpp.ts" />
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
/////*
////===============================================================================
////	idCmdSystemLocal
////===============================================================================
////*/
var commandDef_t = (function () {
    function commandDef_t() {
    }
    return commandDef_t;
})();/*commandDef_t*/ 
;

var idCmdSystem = (function () {
    function idCmdSystem() {
    }
    ////	idStrList				completionParms;
    ////	// piggybacks on the text buffer, avoids tokenize again and screwing it up
    ////	idList<idCmdArgs>		tokenizedCmds;
    ////	// a command stored to be executed after a reloadEngine and all associated commands have been processed
    ////	idCmdArgs				postReload;
    ////private:
    ////	void					ExecuteTokenizedString( const idCmdArgs &args );
    ////	void					ExecuteCommandText( const char *text );
    ////	void					InsertCommandText( const char *text );
    ////	void					AppendCommandText( const char *text );
    ////	static void				ListByFlags( const idCmdArgs &args, cmdFlags_t flags );
    ////	static void				List_f( const idCmdArgs &args );
    ////	static void				SystemList_f( const idCmdArgs &args );
    ////	static void				RendererList_f( const idCmdArgs &args );
    ////	static void				SoundList_f( const idCmdArgs &args );
    ////	static void				GameList_f( const idCmdArgs &args );
    ////	static void				ToolList_f( const idCmdArgs &args );
    ////	static void				Exec_f( const idCmdArgs &args );
    ////	static void				Vstr_f( const idCmdArgs &args );
    ////	static void				Echo_f( const idCmdArgs &args );
    ////	static void				Parse_f( const idCmdArgs &args );
    ////	static void				Wait_f( const idCmdArgs &args );
    ////	static void				PrintMemInfo_f( const idCmdArgs &args );
    ////};
    /////*
    ////============
    ////idCmdSystemLocal::ListByFlags
    ////============
    ////*/
    ////// NOTE: the const wonkyness is required to make msvc happy
    ////template<>
    ////ID_INLINE int idListSortCompare( const commandDef_t * const *a, const commandDef_t * const *b ) {
    ////	return idStr::Icmp( (*a).name, (*b).name );
    ////}
    ////void idCmdSystemLocal::ListByFlags( const idCmdArgs &args, cmdFlags_t flags ) {
    ////	int i;
    ////	idStr match;
    ////	const commandDef_t *cmd;
    ////	idList<const commandDef_t *> cmdList;
    ////	if ( args.Argc() > 1 ) {
    ////		match = args.Args( 1, -1 );
    ////		match.Replace( " ", "" );
    ////	} else {
    ////		match = "";
    ////	}
    ////	for ( cmd = cmdSystemLocal.GetCommands(); cmd; cmd = cmd.next ) {
    ////		if ( !( cmd.flags & flags ) ) {
    ////			continue;
    ////		}
    ////		if ( match.Length() && idStr( cmd.name ).Filter( match, false ) == 0 ) {
    ////			continue;
    ////		}
    ////		cmdList.Append( cmd );
    ////	}
    ////	cmdList.Sort();
    ////	for ( i = 0; i < cmdList.Num(); i++ ) {
    ////		cmd = cmdList[i];
    ////		common.Printf( "  %-21s %s\n", cmd.name, cmd.description );
    ////	}
    ////	common.Printf( "%i commands\n", cmdList.Num() );
    ////}
    /*
    ============
    idCmdSystemLocal::List_f
    ============
    */
    idCmdSystem.prototype.List_f = function (/*const idCmdArgs &*/ args) {
        todoThrow();
    };

    /*
    ============
    idCmdSystemLocal::SystemList_f
    ============
    */
    idCmdSystem.prototype.SystemList_f = function (/*const idCmdArgs &*/ args) {
        todoThrow();
    };

    /*
    ============
    idCmdSystemLocal::RendererList_f
    ============
    */
    idCmdSystem.prototype.RendererList_f = function (/*const idCmdArgs &*/ args) {
        todoThrow();
    };

    /*
    ============
    idCmdSystemLocal::SoundList_f
    ============
    */
    idCmdSystem.prototype.SoundList_f = function (/*const idCmdArgs &*/ args) {
        todoThrow();
    };

    /*
    ============
    idCmdSystemLocal::GameList_f
    ============
    */
    idCmdSystem.prototype.GameList_f = function (/*const idCmdArgs &*/ args) {
        todoThrow();
    };

    /*
    ============
    idCmdSystemLocal::ToolList_f
    ============
    */
    idCmdSystem.prototype.ToolList_f = function (/*const idCmdArgs &*/ args) {
        todoThrow();
    };

    /*
    ===============
    idCmdSystemLocal::Exec_f
    ===============
    */
    idCmdSystem.prototype.Exec_f = function (/*const idCmdArgs &*/ args) {
        todoThrow();
    };

    /*
    ===============
    idCmdSystemLocal::Vstr_f
    
    Inserts the current value of a cvar as command text
    ===============
    */
    idCmdSystem.prototype.Vstr_f = function (/*const idCmdArgs &*/ args) {
        todoThrow();
    };

    /*
    ===============
    idCmdSystemLocal::Echo_f
    
    Just prints the rest of the line to the console
    ===============
    */
    idCmdSystem.prototype.Echo_f = function (/*const idCmdArgs &*/ args) {
        todoThrow();
    };

    /*
    ============
    idCmdSystemLocal::Wait_f
    
    Causes execution of the remainder of the command buffer to be delayed until next frame.
    ============
    */
    idCmdSystem.prototype.Wait_f = function (/*const idCmdArgs &*/ args) {
        todoThrow();
    };

    /*
    ============
    idCmdSystemLocal::Parse_f
    
    This just prints out how the rest of the line was parsed, as a debugging tool.
    ============
    */
    idCmdSystem.prototype.Parse_f = function (/*const idCmdArgs &*/ args) {
    };

    /*
    ============
    idCmdSystemLocal::Init
    ============
    */
    idCmdSystem.prototype.Init = function () {
        this.AddCommand("listCmds", this.List_f, CMD_FL_SYSTEM, "lists commands");
        this.AddCommand("listSystemCmds", this.SystemList_f, CMD_FL_SYSTEM, "lists system commands");
        this.AddCommand("listRendererCmds", this.RendererList_f, CMD_FL_SYSTEM, "lists renderer commands");
        this.AddCommand("listSoundCmds", this.SoundList_f, CMD_FL_SYSTEM, "lists sound commands");
        this.AddCommand("listGameCmds", this.GameList_f, CMD_FL_SYSTEM, "lists game commands");
        this.AddCommand("listToolCmds", this.ToolList_f, CMD_FL_SYSTEM, "lists tool commands");
        this.AddCommand("exec", this.Exec_f, CMD_FL_SYSTEM, "executes a config file", ArgCompletion_ConfigName);
        this.AddCommand("vstr", this.Vstr_f, CMD_FL_SYSTEM, "inserts the current value of a cvar as command text");
        this.AddCommand("echo", this.Echo_f, CMD_FL_SYSTEM, "prints text");
        this.AddCommand("parse", this.Parse_f, CMD_FL_SYSTEM, "prints tokenized string");
        this.AddCommand("wait", this.Wait_f, CMD_FL_SYSTEM, "delays remaining buffered commands one or more frames");

        this.completionString = "*";

        this.textLength = 0;
    };

    /////*
    ////============
    ////idCmdSystemLocal::Shutdown
    ////============
    ////*/
    ////void idCmdSystemLocal::Shutdown( void ) {
    ////	commandDef_t *cmd;
    ////	for ( cmd = commands; cmd; cmd = commands ) {
    ////		commands = commands.next;
    ////		Mem_Free( cmd.name );
    ////		Mem_Free( cmd.description );
    ////		delete cmd;
    ////	}
    ////	completionString.Clear();
    ////	completionParms.Clear();
    ////	tokenizedCmds.Clear();
    ////	postReload.Clear();
    ////}
    /*
    ============
    idCmdSystemLocal::AddCommand
    ============
    */
    idCmdSystem.prototype.AddCommand = function (/*const char **/ cmdName, /*cmdFunction_t*/ $function/*cmdFunction_t*/ , /*int*/ flags, /*const char **/ description, /*argCompletion_t */ argCompletion) {
        if (typeof argCompletion === "undefined") { argCompletion = null; }
        var cmd;

        for (cmd = this.commands; cmd; cmd = cmd.next) {
            if (idStr.Cmp(cmdName, cmd.name) == 0) {
                if ($function != cmd.$function) {
                    common.Printf("idCmdSystemLocal::AddCommand: %s already defined\n", cmdName);
                }
                return;
            }
        }

        cmd = new commandDef_t();
        cmd.name = Mem_CopyString(cmdName);
        cmd.$function = $function;
        cmd.argCompletion = argCompletion;
        cmd.flags = flags;
        cmd.description = Mem_CopyString(description);
        cmd.next = this.commands;
        this.commands = cmd;
    };
    return idCmdSystem;
})();

var cmdSystemLocal = new idCmdSystem();
var cmdSystem = cmdSystemLocal;
//@ sourceMappingURL=CmdSystem.cpp.js.map
