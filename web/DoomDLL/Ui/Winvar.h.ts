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
////#ifndef __WINVAR_H__
////#define __WINVAR_H__
////
////#include "Rectangle.h"
////
var VAR_GUIPREFIX = "gui::";
var VAR_GUIPREFIX_LEN = strlen(VAR_GUIPREFIX);
////
////class idWindow;
class idWinVar implements ITrackedObject {
	refAddress: number;
	trackObject ( ):void {
		objectTracker.addObject( this );
	}

	destructor ( ): void {
		objectTracker.removeObject( this.refAddress );
	}

////public:
////	idWinVar();
////	virtual ~idWinVar();
////
////	void SetGuiInfo(idDict *gd, _name:string);
	GetName ( ): string {
		if ( this.name ) {
			if (this.guiDict && /***/this.name[0] == '*') {
				return this.guiDict.GetString( this.name.substr(1) );
			}
			return this.name;
		}
		return "";
	}

	SetName(_name: string): void { 
		//delete []this.name; 
		this.name = null;
		if (_name) {
			//this.name = new char[strlen(_name)+1]; 
			//strcpy(this.name, _name); 
			this.name = _name;
		}
	}
	//idWinVar &operator =
	equals ( other: idWinVar ): idWinVar {
		this.guiDict = other.guiDict;
		this.SetName( other.name );
		return this;
	}

	GetDict ( ): idDict { return this.guiDict; }
	NeedsUpdate ( ): boolean { return ( this.guiDict != null ); }

	Set(val: string): void { throw "placeholder"; }
	Update ( ): void { throw "placeholder"; }
	c_str ( ): string{ throw "placeholder"; }
////	virtual size_t Size() {	size_t sz = (this.name) ? strlen(this.name) : 0; return sz + sizeof(*this); }
////
////	virtual void WriteToSaveGame( idFile *savefile ) = 0;
////	virtual void ReadFromSaveGame( idFile *savefile ) = 0;
////
	x(  ):number { throw "placeholder"; }

	SetEval ( b: boolean ): void {
		this.eval = b;
	}
	GetEval() :boolean{
		return this.eval;
	}

	constructor ( ) {
		this.trackObject();
		this.guiDict = null;
		this.name = null;
		this.eval = true;
	}
////
////idWinVar::~idWinVar() { 
////	delete this.name;
////	this.name = NULL;
////}

	SetGuiInfo ( gd: idDict, _name: string ): void {
		this.guiDict = gd;
		this.SetName( _name );
	}

	Init ( _name: string, win: idWindow ): void {
		var key = new idStr( _name );
		this.guiDict = null;
		var len = key.Length ( );
		if ( len > 5 && key.data[0] == 'g' && key.data[1] == 'u' && key.data[2] == 'i' && key.data[3] == ':' ) {
			key = key.Right( len - VAR_GUIPREFIX_LEN );
			this.SetGuiInfo( win.GetGui ( ).GetStateDict ( ), key.data );
			win.AddUpdateVar( this );
		} else {
			this.Set( _name );
		}
	}


////protected:
	guiDict: idDict;
	name:string;
	eval:boolean;
};

class idWinBool extends idWinVar {
////public:
////	idWinBool() : idWinVar() {};
////	~idWinBool() {};
	Init(_name: string, win: idWindow): void  {
		super.Init( _name, win );
		if ( this.guiDict ) {
			this.data = this.guiDict.GetBool( this.GetName ( ) );
		}
	}

	equalTo ( other: boolean ): boolean {
		return other == this.data;
	}

	equalsBool ( other: boolean ): boolean {
		this.data = other;
		if ( this.guiDict ) {
			this.guiDict.SetBool( this.GetName ( ), this.data );
		}
		return this.data;
	}
	equals ( other: idWinBool ): idWinBool {
		super.equals( other );
		this.data = other.data;
		return this;
	}

	operatorBool ( ): boolean { return this.data; }

	Set ( val: string ): void {
		this.data = ( atoi( val ) != 0 );
		if ( this.guiDict ) {
			this.guiDict.SetBool( this.GetName ( ), this.data );
		}
	}

	Update ( ): void {
		var s = this.GetName ( );
		if ( this.guiDict && s /*[0] != '\0'*/ ) {
			this.data = this.guiDict.GetBool( s );
		}
	}

	c_str ( ): string { return va( "%i", this.data ? 1 : 0 ); }
////
////	// SaveGames
////	virtual void WriteToSaveGame( idFile *savefile ) {
////		savefile.Write( &this.eval, sizeof( this.eval ) );
////		savefile.Write( this.data, sizeof( this.data ) );
////	}
////	virtual void ReadFromSaveGame( idFile *savefile ) {
////		savefile.Read( &this.eval, sizeof( this.eval ) );
////		savefile.Read( this.data, sizeof( this.data ) );
////	}
////
	x ( ): number { return this.data ? 1.0 : 0.0; }
////
////protected:
	data:boolean;
};
////
class idWinStr extends idWinVar {
////public:
////	idWinStr() : idWinVar() {};
////	~idWinStr() {};
	Init(_name: string, win: idWindow): void  {
		super.Init(_name, win);
		if (this.guiDict) {
			this.data.equals( this.guiDict.GetString( this.GetName ( ) ) );
		} 
	}
////	int	operator==(	const idStr &other ) const {
////		return (other == this.data);
////	}
////	int	operator==(	const char *other ) const {
////		return (data == other);
////	}
	equalsStr(other: idStr): idStr {
		this.data.equals(other);
		if ( this.guiDict ) {
			this.guiDict.Set( this.GetName ( ), this.data.data );
		}
		return this.data;
	}
	equals(other: idWinStr ) {
		super.equals( other );
		this.data.equals( other.data );
		return this;
	}

////	operator const char *() const {
////		return this.data.c_str();
////	}
////	operator const idStr &() const {
////		return this.data;
////	}
////	int LengthWithoutColors() {
////		if (this.guiDict && this.name && *this.name) {
////			this.data = this.guiDict.GetString(this.GetName());
////		}
////		return this.data.LengthWithoutColors();
////	}
	Length ( ): number {
		if ( this.guiDict && this.name /* && *this.name*/ ) {
			this.data.equals( this.guiDict.GetString( this.GetName ( ) ) );
		}
		return this.data.Length ( );
	}
////	void RemoveColors() {
////		if (this.guiDict && this.name && *this.name) {
////			this.data = this.guiDict.GetString(this.GetName());
////		}
////		data.RemoveColors();
////	}
	c_str ( ): string {
		return this.data.c_str ( );
	}
////
	Set ( val: string ): void {
		this.data.equals( val );
		if ( this.guiDict ) {
			this.guiDict.Set( this.GetName ( ), this.data.data );
		}
	}

	Update ( ): void {
		var s = this.GetName ( );
		if ( this.guiDict && s /*[0] != '\0'*/ ) {
			this.data.equals( this.guiDict.GetString( s ) );
		}
	}

////	virtual size_t Size() {
////		size_t sz = idWinVar::Size();
////		return sz +data.Allocated();
////	}
////
////	// SaveGames
////	virtual void WriteToSaveGame( idFile *savefile ) {
////		savefile.Write( &this.eval, sizeof( this.eval ) );
////
////		int len = this.data.Length();
////		savefile.Write( &len, sizeof( len ) );
////		if ( len > 0 ) {
////			savefile.Write( this.data.c_str(), len );
////		}
////	}
////	virtual void ReadFromSaveGame( idFile *savefile ) {
////		savefile.Read( &this.eval, sizeof( this.eval ) );
////
////		int len;
////		savefile.Read( &len, sizeof( len ) );
////		if ( len > 0 ) {
////			data.Fill( ' ', len );
////			savefile.Read( this.data[0], len );
////		}
////	}

	// return wether string is emtpy
	x ( ): number { return this.data.data[0] ? 1.0 : 0.0; }
////
////protected:
	data = new idStr;
};

class idWinInt extends idWinVar {
////public:
////	idWinInt() : idWinVar() {};
////	~idWinInt() {};
	Init(_name: string, win: idWindow): void  {
		super.Init(_name,  win);
		if (this.guiDict) {
			this.data = this.guiDict.GetInt(this.GetName());
		} 
	}
	equalsInt ( /*int */other: number ): number {
		this.data = other;
		if ( this.guiDict ) {
			this.guiDict.SetInt( this.GetName ( ), this.data );
		}
		return this.data;
	}

	equals ( other: idWinInt ): idWinInt {
		super.equals( other );
		this.data = other.data;
		return this;
	}

////	operator int () const {
////		return this.data;
////	}
	Set ( val: string ): void {
		this.data = atoi( val );
		if ( this.guiDict ) {
			this.guiDict.SetInt( this.GetName ( ), this.data );
		}
	}

	Update ( ): void {
		var s = this.GetName ( );
		if ( this.guiDict && s /*[0] != '\0' */ ) {
			this.data = this.guiDict.GetInt( s );
		}
	}
	c_str ( ): string {
		return va( "%i", this.data );
	}
////
////	// SaveGames
////	virtual void WriteToSaveGame( idFile *savefile ) {
////		savefile.Write( &this.eval, sizeof( this.eval ) );
////		savefile.Write( this.data, sizeof( this.data ) );
////	}
////	virtual void ReadFromSaveGame( idFile *savefile ) {
////		savefile.Read( &this.eval, sizeof( this.eval ) );
////		savefile.Read( this.data, sizeof( this.data ) );
////	}
////
////	// no suitable conversion
////	virtual float x( void ) const { assert( false ); return 0.0f; };
////
////protected:
	data:number/*int*/ = 0;
};

class idWinFloat extends idWinVar {
////public:
////	idWinFloat() : idWinVar() {};
////	~idWinFloat() {};
	Init(_name: string, win: idWindow): void  {
		super.Init(_name, win);
		if (this.guiDict) {
			this.data = this.guiDict.GetFloat(this.GetName());
		} 
	}
	equals(other: idWinFloat): idWinFloat {
		super.equals( other );//idWinVar::operator=(other);
		this.data = other.data;
		return this;
	}

	equalsFloat ( /*float */other: number ): number {
		this.data = other;
		if ( this.guiDict ) {
			this.guiDict.SetFloat( this.GetName ( ), this.data );
		}
		return this.data;
	}
////	operator float() const {
////		return this.data;
////	}
	Set ( val: string ): void {
		this.data = atof( val );
		if ( this.guiDict ) {
			this.guiDict.SetFloat( this.GetName ( ), this.data );
		}
	}
	Update ( ): void {
		var s = this.GetName ( );
		if ( this.guiDict && s /*[0] != '\0'*/ ) {
			this.data = this.guiDict.GetFloat( s );
		}
	}
	c_str ( ): string {
		return va( "%f", this.data );
	}
////
////	virtual void WriteToSaveGame( idFile *savefile ) {
////		savefile.Write( &this.eval, sizeof( this.eval ) );
////		savefile.Write( this.data, sizeof( this.data ) );
////	}
////	virtual void ReadFromSaveGame( idFile *savefile ) {
////		savefile.Read( &this.eval, sizeof( this.eval ) );
////		savefile.Read( this.data, sizeof( this.data ) );
////	}

	x ( ): number { return this.data; }
////protected:
	data:number/*float*/ = 0.0;
};

class idWinRectangle extends idWinVar {
////public:
////	idWinRectangle() : idWinVar() {};
////	~idWinRectangle() {};
	Init ( _name: string, win: idWindow ): void {
		super.Init( _name, win );
		if ( this.guiDict ) {
			var v = this.guiDict.GetVec4( this.GetName ( ) );
			this.data.x = v.x;
			this.data.y = v.y;
			this.data.w = v.z;
			this.data.h = v.w;
		}
	}

	//equalTo(other: idRectangle): boolean {
	//	todoThrow ( );
	//	//return ( other.equalTo( this.data ) );
	//}

	equals(other: idWinRectangle): idWinRectangle {
		super.equals( other );
		this.data = other.data;
		return this;
	}
	equalsVec4(other: idVec4): idRectangle {
		this.data.equalsVec4( other );
		if ( this.guiDict ) {
			this.guiDict.SetVec4( this.GetName ( ), other );
		}
		return this.data;
	}

	equalsRectangle ( other: idRectangle ): idRectangle {
		this.data.equals( other );
		if ( this.guiDict ) {
			var v = this.data.ToVec4 ( );
			this.guiDict.SetVec4( this.GetName ( ), v );
		}
		return this.data;
	}
////	
////	operator const idRectangle&() const {
////		return this.data;
////	}
////
	x ( ): number {
		return this.data.x;
	}
	y ( ): number {
		return this.data.y;
	}
	w ( ): number {
		return this.data.w;
	}
	h ( ): number {
		return this.data.h;
	}
	Right() :number {
		return this.data.Right();
	}
	Bottom() :number {
		return this.data.Bottom();
	}
////	idVec4 &ToVec4() {
////		static idVec4 ret;
////		ret = this.data.ToVec4();
////		return ret;
////	}
	Set(val: string): void {
		var split: string[];
		if (strchrContains(val, ',')) {
			split = val.split(',');
			this.data.x = parseFloat(split[0]);
			this.data.y = parseFloat(split[1]);
			this.data.w = parseFloat(split[2]);
			this.data.h = parseFloat(split[3]);

		} else {
			split = val.split(' ');
			this.data.x = parseFloat(split[0]);
			this.data.y = parseFloat(split[1]);
			this.data.w = parseFloat(split[2]);
			this.data.h = parseFloat(split[3]);
		}
		if (this.guiDict) {
			var v = this.data.ToVec4();
			this.guiDict.SetVec4(this.GetName(), v);
		}
	}
	Update ( ): void {
		var s = this.GetName ( );
		if ( this.guiDict && s /*[0] != '\0' */ ) {
			var v = this.guiDict.GetVec4( s );
			this.data.x = v.x;
			this.data.y = v.y;
			this.data.w = v.z;
			this.data.h = v.w;
		}
	}

	c_str ( ): string {
		return this.data.ToVec4 ( ).ToString ( );
	}
////
////	virtual void WriteToSaveGame( idFile *savefile ) {
////		savefile.Write( &this.eval, sizeof( this.eval ) );
////		savefile.Write( this.data, sizeof( this.data ) );
////	}
////	virtual void ReadFromSaveGame( idFile *savefile ) {
////		savefile.Read( &this.eval, sizeof( this.eval ) );
////		savefile.Read( this.data, sizeof( this.data ) );
////	}
////
////protected:
	data = new idRectangle;
};

class idWinVec2 extends idWinVar {
////public:
////	idWinVec2() : idWinVar() {};
////	~idWinVec2() {};
	Init(_name:string, win:idWindow): void  {
		super.Init(_name, win);
		if (this.guiDict) {
			this.data = this.guiDict.GetVec2(this.GetName());
		} 
	}
////	int	operator==(	const idVec2 &other ) const {
////		return (other == this.data);
////	}
	equals ( other: idWinVec2 ): idWinVec2 {
		super.equals( other );
		this.data.equals( other.data );
		return this;
	}

	equalsVec2 ( other: idVec2 ): idVec2 {
		this.data = other;
		if ( this.guiDict ) {
			this.guiDict.SetVec2( this.GetName ( ), this.data );
		}
		return this.data;
	}
	x ( ): number /*float*/ {
		return this.data.x;
	}
	y ( ): number /*float*/ {
		return this.data.y;
	}
	Set ( val: string ): void {
		var split: string[];
		if (strchrContains(val, ',')) {
			split = val.split(',');
			this.data.x = parseFloat(split[0]);
			this.data.y = parseFloat(split[1]);

		} else {
			split = val.split(' ');
			this.data.x = parseFloat(split[0]);
			this.data.y = parseFloat(split[1]);
		}

		if ( this.guiDict ) {
			this.guiDict.SetVec2( this.GetName ( ), this.data );
		}
	}

////	operator const idVec2&() const {
////		return this.data;
////	}
	 Update() :void{
		var s = this.GetName();
		if ( this.guiDict && s/*[0] != '\0'*/ ) {
			this.data = this.guiDict.GetVec2( s );
		}
	}
	c_str ( ): string {
		return this.data.ToString ( );
	}
////	void Zero() {
////		data.Zero();
////	}
////
////	virtual void WriteToSaveGame( idFile *savefile ) {
////		savefile.Write( &this.eval, sizeof( this.eval ) );
////		savefile.Write( this.data, sizeof( this.data ) );
////	}
////	virtual void ReadFromSaveGame( idFile *savefile ) {
////		savefile.Read( &this.eval, sizeof( eval ) );
////		savefile.Read( this.data, sizeof( this.data ) );
////	}
////
////protected:
	data = new idVec2;
}

class idWinVec4 extends idWinVar {
////public:
////	idWinVec4() : idWinVar() {};
////	~idWinVec4() {};
	Init(_name:string, win:idWindow): void  {
		super.Init(_name, win);
		if (this.guiDict) {
			this.data.equals( this.guiDict.GetVec4(this.GetName()));
		} 
	}
////	int	operator==(	const idVec4 &other ) const {
////		return (other == this.data);
////	}
	equals ( other: idWinVec4 ): idWinVec4 {
		super.equals( other );
		this.data = other.data;
		return this;
	}

	equalsVec4(other: idVec4 ):idVec4 {
		this.data = other;
		if (this.guiDict) {
			this.guiDict.SetVec4(this.GetName(), this.data);
		}
		return this.data;
	}
////	operator const idVec4&() const {
////		return this.data;
////	}
////
	x(): number /*float*/ {
		return this.data.x;
	}

	y(): number /*float*/ {
		return this.data.y;
	}

	z(): number /*float*/ {
		return this.data.z;
	}

	w(): number /*float*/ {
		return this.data.w;
	}
	Set(val: string): void {
		var split: string[];
		if (strchrContains(val, ',')) {
			split = val.split(',');
			this.data.x = parseFloat(split[0]);
			this.data.y = parseFloat(split[1]);
			this.data.z = parseFloat(split[2]);
			this.data.w = parseFloat(split[3]);

		} else {
			split = val.split(' ');
			this.data.x = parseFloat(split[0]);
			this.data.y = parseFloat(split[1]);
			this.data.z = parseFloat(split[2]);
			this.data.w = parseFloat(split[3]);
		}
		if ( this.guiDict ) {
			this.guiDict.SetVec4( this.GetName(), this.data );
		}
	}
	Update ( ): void {
		var s = this.GetName ( );
		if ( this.guiDict && s /*[0] != '\0'*/ ) {
			this.data = this.guiDict.GetVec4( s );
		}
	}
	c_str ( ): string {
		return this.data.ToString ( );
	}

	Zero ( ): void {
		this.data.Zero ( );
		if ( this.guiDict ) {
			this.guiDict.SetVec4( this.GetName ( ), this.data );
		}
	}
////
////	const idVec3 &ToVec3() const {
////		return this.data.ToVec3();
////	}
////
////	virtual void WriteToSaveGame( idFile *savefile ) {
////		savefile.Write( &eval, sizeof( eval ) );
////		savefile.Write( this.data, sizeof( this.data ) );
////	}
////	virtual void ReadFromSaveGame( idFile *savefile ) {
////		savefile.Read( &eval, sizeof( eval ) );
////		savefile.Read( this.data, sizeof( this.data ) );
////	}
////
////protected:
	data = new idVec4;
};

class idWinVec3 extends idWinVar {
////public:
////	idWinVec3() : idWinVar() {};
////	~idWinVec3() {};
	Init(_name:string, win:idWindow): void  {
		super.Init(_name, win);
		if (this.guiDict) {
			this.data = this.guiDict.GetVector(this.GetName());
		} 
	}
////	int	operator==(	const idVec3 &other ) const {
////		return (other == this.data);
////	}
	equals ( other: idWinVec3 ): idWinVec3 {
		super.equals( other );
		this.data = other.data;
		return this;
	}

	equalsVec3 ( other: idVec3 ): idVec3 {
		this.data.opEquals( other );
		if ( this.guiDict ) {
			this.guiDict.SetVector( this.GetName ( ), this.data );
		}
		return this.data;
	}
////	operator const idVec3&() const {
////		return this.data;
////	}

	x ( ): number {
		return this.data.x;
	}
////
////	float y() const {
////		return this.data.y;
////	}
////
////	float z() const {
////		return this.data.z;
////	}

	Set ( val: string ): void {
		//sscanf(val, "%f %f %f", this.data.x, this.data.y, this.data.z);
		var split = val.split(' ');
		this.data.x = parseFloat(split[0]);
		this.data.y = parseFloat(split[1]);
		this.data.z = parseFloat(split[2]);
		if ( this.guiDict ) {
			this.guiDict.SetVector( this.GetName ( ), this.data );
		}
	}
	Update ( ): void {
		var s = this.GetName ( );
		if ( this.guiDict && s /*[0] != '\0' */ ) {
			this.data = this.guiDict.GetVector( s );
		}
	}
	c_str ( ): string {
		return this.data.ToString ( );
	}

////	void Zero() {
////		data.Zero();
////		if (this.guiDict) {
////			this.guiDict.SetVector(this.GetName(), this.data);
////		}
////	}
////
////	virtual void WriteToSaveGame( idFile *savefile ) {
////		savefile.Write( &eval, sizeof( eval ) );
////		savefile.Write( this.data, sizeof( this.data ) );
////	}
////	virtual void ReadFromSaveGame( idFile *savefile ) {
////		savefile.Read( &eval, sizeof( eval ) );
////		savefile.Read( this.data, sizeof( this.data ) );
////	}
////
////protected:
	 data = new idVec3;
};

class idWinBackground extends idWinStr {
////public:
////	idWinBackground() : idWinStr() {
////		mat = NULL;
////	};
////	~idWinBackground() {};
	Init(_name:string, win:idWindow): void  {
		super.Init(_name, win);
		if (this.guiDict) {
			this.data.equals( this.guiDict.GetString( this.GetName ( ) ) );
		} 
	}
////	int	operator==(	const idStr &other ) const {
////		return (other == this.data);
////	}
////	int	operator==(	const char *other ) const {
////		return (data == other);
////	}
	equalsStr ( other: idStr ): idStr {
		this.data.equals( other.data );
		if ( this.guiDict ) {
			this.guiDict.Set( this.GetName ( ), this.data.data );
		}
		if ( this.mat ) {
			if ( this.data.equalTo( "" ) ) {
				this.mat = null;
			} else {
				this.mat = declManager.FindMaterial( this.data.data );
			}
		}
		return this.data;
	}

	operator ( other: idWinBackground ): idWinBackground {
		super.equals( other );
		this.data = other.data;
		this.mat = other.mat;
		if ( this.mat ) {
			if ( this.data.equalTo( "" ) ) {
				this.mat = null;
			} else {
				( this.mat ) = declManager.FindMaterial( this.data.data );
			}
		}
		return this;
	}
////	operator const char *() const {
////		return this.data.c_str();
////	}
////	operator const idStr &() const {
////		return this.data;
////	}
	Length ( ): number {
		if ( this.guiDict ) {
			this.data.equals( this.guiDict.GetString( this.GetName ( ) ) );
		}
		return this.data.Length ( );
	}
	c_str ( ): string {
		return this.data.c_str ( );
	}

	Set ( val: string ): void {
		this.data.equals( val );
		if ( this.guiDict ) {
			this.guiDict.Set( this.GetName ( ), this.data.data );
		}
		if ( this.mat ) {
			if ( this.data.equalTo( "" ) ) {
				this.mat = null;
			} else {
				this.mat = declManager.FindMaterial( this.data.data );
			}
		}
	}

	Update ( ): void {
		var s = this.GetName ( );
		if ( this.guiDict && s /*[0] != '\0'*/ ) {
			this.data.equals( this.guiDict.GetString( s ) );
			if ( this.mat ) {
				if ( this.data.data == "" ) {
					this.mat = null;
				} else {
					this.mat = declManager.FindMaterial( this.data.data );
				}
			}
		}
	}
////
////	virtual size_t Size() {
////		size_t sz = idWinVar::Size();
////		return sz +data.Allocated();
////	}
////
	SetMaterialPtr( /*const idMaterial ***/m: idMaterial ): void {
		this.mat = m;
	}

////	virtual void WriteToSaveGame( idFile *savefile ) {
////		savefile.Write( &eval, sizeof( eval ) );
////
////		int len = this.data.Length();
////		savefile.Write( &len, sizeof( len ) );
////		if ( len > 0 ) {
////			savefile.Write( this.data.c_str(), len );
////		}
////	}
////	virtual void ReadFromSaveGame( idFile *savefile ) {
////		savefile.Read( &eval, sizeof( eval ) );
////
////		int len;
////		savefile.Read( &len, sizeof( len ) );
////		if ( len > 0 ) {
////			data.Fill( ' ', len );
////			savefile.Read( this.data[0], len );
////		}
////		if ( mat ) {
////			if ( len > 0 ) {
////				(*mat) = declManager.FindMaterial( this.data );
////			} else {
////				(*mat) = NULL;
////			}
////		}
////	}
////
////protected:
	data = new idStr;
	mat:idMaterial//	const idMaterial **mat;
};

/*
================
idMultiWinVar
multiplexes access to a list if idWinVar*
================
*/
class idMultiWinVar extends idList<idWinVar /** */> {
	constructor ( ) {
		super( idWinVar, true, 16 );
	}
////public:
////	void Set( val:string );
////	void Update( void );
////	void SetGuiInfo( idDict *dict );

	Set ( val: string ): void {
		for ( var i = 0; i < this.Num ( ); i++ ) {
			this[i].Set( val );
		}
	}

	Update ( ): void {
		for ( var i = 0; i < this.Num ( ); i++ ) {
			this[i].Update ( );
		}
	}

	SetGuiInfo ( dict: idDict ): void {
		for ( var i = 0; i < this.Num ( ); i++ ) {
			this[i].SetGuiInfo( dict, this[i].c_str ( ) );
		}
	}
////};
////
////#endif /* !__WINVAR_H__ */
////
}