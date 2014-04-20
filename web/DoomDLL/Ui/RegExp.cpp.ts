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
////#include "RegExp.h"
////#include "DeviceContext.h"
////#include "Window.h"
////#include "UserInterfaceLocal.h"
////
////
////class idWindow;
////class idWinVar;
////
enum REGTYPE { VEC4 = 0, FLOAT, BOOL, INT, STRING, VEC2, VEC3, RECTANGLE, NUMTYPES };

class idRegister {
////public:
////	idRegister();
////	idRegister(const char *p, int t);
////
	static REGCOUNT = [4, 1, 1, 1, 0, 2, 3, 4 ];
	
	enabled:boolean;
	type:number;
	name = new idStr;
	regCount:number;
	regs = new Uint8Array(4);
	$var:idWinVar;

////	void				SetToRegs(float *registers);
////	void				GetFromRegs(float *registers);
////	void				CopyRegs(idRegister *src);
	Enable ( b: boolean ) { this.enabled = b; }
////	void				ReadFromDemoFile(idDemoFile *f);
////	void				WriteToDemoFile(idDemoFile *f);
////	void				WriteToSaveGame(idFile *savefile);
////	void				ReadFromSaveGame(idFile *savefile);
////};
////
////ID_INLINE idRegister::idRegister(void) {
////}
////

	constructor ( )
	constructor ( p: string, t: number ) 
	constructor ( p?: string, t?: number ) {
		if ( arguments.length === 2 ) {
			this.name.equals( p );
			this.type = t;
			assert( t >= 0 && t < REGTYPE.NUMTYPES );
			this.regCount = idRegister.REGCOUNT[t];
			this.enabled = ( this.type == REGTYPE.STRING ) ? false : true;
			this.$var = null;
		}
	}


////ID_INLINE void idRegister::CopyRegs(idRegister *src) {
////	this.regs[0] = src.regs[0];
////	this.regs[1] = src.regs[1];
////	this.regs[2] = src.regs[2];
////	this.regs[3] = src.regs[3];
////}

	
////#endif /* !__REGEXP_H__ */
////
////
////
////
/*
====================
idRegister::SetToRegs
====================
*/
	SetToRegs ( registers: Float32Array ): void {
		var /*int */i: number;
		var v = new idVec4;
		var v2 = new idVec2;
		var v3 = new idVec3;
		var rect = new idRectangle;

		if ( !this.enabled || this.$var == null || ( this.$var && ( this.$var.GetDict ( ) || !this.$var.GetEval ( ) ) ) ) {
			return;
		}

		switch ( this.type ) {
		case REGTYPE.VEC4:
		{
			v.equals( ( <idWinVec4>this.$var ).data ); //v = * static_cast<idWinVec4*>(this.$var);
			break;
		}
		case REGTYPE.RECTANGLE:
		{
			rect.equals( ( <idWinRectangle>this.$var ).data ); //rect = *static_cast<idWinRectangle*>(this.$var);
			v = rect.ToVec4 ( );
			break;
		}
		case REGTYPE.VEC2:
			v2.equals( ( <idWinVec2>this.$var ).data ); // = *static_cast<idWinVec2*>(this.$var);
			v[0] = v2[0];
			v[1] = v2[1];
			break;

		case REGTYPE.VEC3:
		{
			v3.opEquals( ( <idWinVec3>this.$var ).data ); // = *static_cast<idWinVec3*>(this.$var);
			v[0] = v3[0];
			v[1] = v3[1];
			v[2] = v3[2];
			break;
		}
		case REGTYPE.FLOAT:
		{
			v[0] = ( <idWinFloat>this.$var ).data; // *static_cast<idWinFloat*>(this.$var);
			break;
		}
		case REGTYPE.INT:
		{
			v[0] = ( <idWinInt>this.$var ).data; //  *static_cast<idWinInt*>(this.$var);
			break;
		}
		case REGTYPE.BOOL:
		{
			v[0] = ( <idWinBool>this.$var ).data ? 1 : 0; //  *static_cast<idWinBool*>(this.$var);
			break;
		}
		default:
		{
			common.FatalError( "idRegister::SetToRegs: bad reg type" );
			break;
		}
		}
		for ( i = 0; i < this.regCount; i++ ) {
			registers[this.regs[i]] = v[i];
		}
	}

/*
=================
idRegister::GetFromRegs
=================
*/
GetFromRegs( registers :Float32Array):void {
	var v = new idVec4 ;
	var rect = new idRectangle ;

	if (!this.enabled || this.$var == null|| (this.$var && (this.$var.GetDict() || !this.$var.GetEval()))) {
		return;
	}

	for ( var i = 0; i < this.regCount; i++ ) {
		v[i] = registers[this.regs[i]];
	}
	
	switch( this.type ) {
		case REGTYPE. VEC4: {
			(<idWinVec4 > this.$var).equalsVec4(v); //*dynamic_cast<idWinVec4*>(this.$var) = v;
			break;
		}
		case REGTYPE.RECTANGLE: {
			rect.x = v.x;
			rect.y = v.y;
			rect.w = v.z;
			rect.h = v.w;
			( <idWinRectangle>this.$var ).equalsRectangle( rect ); //*static_cast<idWinRectangle*>(this.$var) = rect;
			break;
		}
		case REGTYPE.VEC2:
		{
			(<idWinVec2>this.$var).equalsVec2(v.ToVec2());//*static_cast<idWinVec2*>(this.$var) = v.ToVec2();
			break;
		}
		case REGTYPE.VEC3: {
			(<idWinVec3>this.$var).equalsVec3(v.ToVec3());//*static_cast<idWinVec3*>(this.$var) = v.ToVec3();
			break;
		}
		case REGTYPE.FLOAT: {
			(<idWinFloat>this.$var).equalsFloat(v[0]);//*static_cast<idWinFloat*>(this.$var) = v[0];
			break;
		}
		case REGTYPE.INT: {
			(<idWinInt>this.$var).equalsInt(v[0]);//*static_cast<idWinInt*>(this.$var) = v[0];
			break;
		}
		case REGTYPE.BOOL: {
			(<idWinBool>this.$var).equalsBool(v[0] != 0.0 );//*static_cast<idWinBool*>(this.$var) = ( v[0] != 0.0 );
			break;
		}
		default: {
			common.FatalError( "idRegister::GetFromRegs: bad reg type" );
			break;
		}
	}
}

/////*
////=================
////idRegister::ReadFromDemoFile
////=================
////*/
////void idRegister::ReadFromDemoFile(idDemoFile *f) {
////	f.ReadBool( this.enabled );
////	f.ReadShort( this.type );
////	f.ReadInt( this.regCount );
////	for ( int i = 0; i < 4; i++ )
////		f.ReadUnsignedShort( this.regs[i] );
////	name = f.ReadHashString();
////}
////
/////*
////=================
////idRegister::WriteToDemoFile
////=================
////*/
////void idRegister::WriteToDemoFile( idDemoFile *f ) {
////	f.WriteBool( this.enabled );
////	f.WriteShort( this.type );
////	f.WriteInt( this.regCount );
////	for (int i = 0; i < 4; i++)
////		f.WriteUnsignedShort( this.regs[i] );
////	f.WriteHashString( name );
////}
////
/////*
////=================
////idRegister::WriteToSaveGame
////=================
////*/
////void idRegister::WriteToSaveGame( idFile *savefile ) {
////	int len;
////
////	savefile.Write( &this.enabled, sizeof( this.enabled ) );
////	savefile.Write( &this.type, sizeof( this.type ) );
////	savefile.Write( &this.regCount, sizeof( this.regCount ) );
////	savefile.Write( &this.regs[0], sizeof( this.regs ) );
////	
////	len = name.Length();
////	savefile.Write( &len, sizeof( len ) );
////	savefile.Write( name.c_str(), len );
////
////	this.$var.WriteToSaveGame( savefile );
////}
////
/////*
////================
////idRegister::ReadFromSaveGame
////================
////*/
////void idRegister::ReadFromSaveGame( idFile *savefile ) {
////	int len;
////
////	savefile.Read( &this.enabled, sizeof( this.enabled ) );
////	savefile.Read( &this.type, sizeof( this.type ) );
////	savefile.Read( &this.regCount, sizeof( this.regCount ) );
////	savefile.Read( &this.regs[0], sizeof( this.regs ) );
////
////	savefile.Read( &len, sizeof( len ) );
////	name.Fill( ' ', len );
////	savefile.Read( &name[0], len );
////
////	this.$var.ReadFromSaveGame( savefile );
////}
////
}

class idRegisterList {
////public:
////
////	idRegisterList();
////	~idRegisterList();
////
////	void				AddReg(const char *name, int type, idParser *src, idWindow *win, idWinVar *var);
////	void				AddReg(const char *name, int type, idVec4 data, idWindow *win, idWinVar *var);
////
////	idRegister *		FindReg(const char *name);
////	void				SetToRegs(float *registers);
////	void				GetFromRegs(float *registers);
////	void				Reset();
////	void				ReadFromDemoFile(idDemoFile *f);
////	void				WriteToDemoFile(idDemoFile *f);
////	void				WriteToSaveGame(idFile *savefile);
////	void				ReadFromSaveGame(idFile *savefile);
////
////private:
	regs = new idList<idRegister>(idRegister, true);
	regHash = new idHashIndex;

	constructor ( ) {
		this.regs.SetGranularity( 4 );
		this.regHash.SetGranularity( 4 );
		this.regHash.Clear( 32, 4 );
	}

////ID_INLINE idRegisterList::~idRegisterList() {
////}

/*
====================
idRegisterList::AddReg
====================
*/
	AddReg ( name: string, /*int */type: number, data: idVec4, win: idWindow, $var: idWinVar ): void {
		if ( this.FindReg( name ) == null ) {
			assert( type >= 0 && type < REGTYPE.NUMTYPES );
			var numRegs = idRegister.REGCOUNT[type];
			var reg = new idRegister( name, type );
			reg.$var = $var;
			for ( var i = 0; i < numRegs; i++ ) {
				reg.regs[i] = win.ExpressionConstant( data[i] );
			}
			var hash = this.regHash.GenerateKey( name, false );
			this.regHash.Add( hash, this.regs.Append( reg ) );
		}
	}

/*
====================
idRegisterList::AddReg
====================
*/
	AddReg_Parser ( name: string, /*int */type: number, src: idParser, win: idWindow, $var: idWinVar ): void {
		var reg: idRegister;

		reg = this.FindReg( name );

		if ( reg == null ) {
			assert( type >= 0 && type < REGTYPE.NUMTYPES );
			var numRegs = idRegister.REGCOUNT[type];
			reg = new idRegister( name, type );
			reg.$var = $var;
			if ( type == REGTYPE.STRING ) {
				var tok = new idToken;
				if ( src.ReadToken( tok ) ) {
					tok.equals( common.GetLanguageDict ( ).GetString( tok.data ) );
					$var.Init( tok.data, win );
				}
			} else {
				for ( var i = 0; i < numRegs; i++ ) {
					reg.regs[i] = win.ParseExpression( src, null );
					if ( i < numRegs - 1 ) {
						src.ExpectTokenString( "," );
					}
				}
			}
			var hash = this.regHash.GenerateKey( name, false );
			this.regHash.Add( hash, this.regs.Append( reg ) );
		} else {
			var numRegs = idRegister.REGCOUNT[type];
			reg.$var = $var;
			if ( type == REGTYPE.STRING ) {
				var tok = new idToken;
				if ( src.ReadToken( tok ) ) {
					$var.Init( tok.data, win );
				}
			} else {
				for ( var i = 0; i < numRegs; i++ ) {
					reg.regs[i] = win.ParseExpression( src, null );
					if ( i < numRegs - 1 ) {
						src.ExpectTokenString( "," );
					}
				}
			}
		}
	}

/*
====================
idRegisterList::GetFromRegs
====================
*/
	GetFromRegs ( registers: Float32Array ): void {
		for ( var i = 0; i < this.regs.Num ( ); i++ ) {
			this.regs[i].GetFromRegs( registers );
		}
	}

/*
====================
idRegisterList::SetToRegs
====================
*/

	SetToRegs ( registers: Float32Array ): void {
		var i: number;
		for ( i = 0; i < this.regs.Num ( ); i++ ) {
			this.regs[i].SetToRegs( registers );
		}
	}

/*
====================
idRegisterList::FindReg
====================
*/
	FindReg( name :string): idRegister{
	var hash = this.regHash.GenerateKey( name, false );
	for ( var i = this.regHash.First( hash ); i != -1; i = this.regHash.Next( i ) ) {
		if ( this.regs[i].name.Icmp( name ) == 0 ) {
			return this.regs[i];
		}
	}
	return null;
}

/*
====================
idRegisterList::Reset
====================
*/
	Reset ( ): void {
		this.regs.DeleteContents( true );
		this.regHash.Clear ( );
	}

/////*
////====================
////idRegisterList::ReadFromSaveGame
////====================
////*/
////void idRegisterList::ReadFromDemoFile(idDemoFile *f) {
////	int c;
////
////	f.ReadInt( c );
////	this.regs.DeleteContents( true );
////	for ( int i = 0; i < c; i++ ) {
////		idRegister *reg = new idRegister;
////		reg.ReadFromDemoFile( f );
////		this.regs.Append( reg );
////	}
////}
////
/////*
////====================
////idRegisterList::ReadFromSaveGame
////====================
////*/
////void idRegisterList::WriteToDemoFile(idDemoFile *f) {
////	int c = this.regs.Num();
////
////	f.WriteInt( c );
////	for ( int i = 0 ; i < c; i++ ) {
////		this.regs[i].WriteToDemoFile(f);
////	}
////}
////
/////*
////=====================
////idRegisterList::WriteToSaveGame
////=====================
////*/
////void idRegisterList::WriteToSaveGame( idFile *savefile ) {
////	int i, num;
////
////	num = this.regs.Num();
////	savefile.Write( &num, sizeof( num ) );
////
////	for ( i = 0; i < num; i++ ) {
////		this.regs[i].WriteToSaveGame( savefile );
////	}
////}
////
/////*
////====================
////idRegisterList::ReadFromSaveGame
////====================
////*/
////void idRegisterList::ReadFromSaveGame( idFile *savefile ) {
////	int i, num;
////
////	savefile.Read( &num, sizeof( num ) );
////	for ( i = 0; i < num; i++ ) {
////		this.regs[i].ReadFromSaveGame( savefile );
////	}
////}

}