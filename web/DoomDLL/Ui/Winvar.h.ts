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
////static const char *VAR_GUIPREFIX = "gui::";
////static const int VAR_GUIPREFIX_LEN = strlen(VAR_GUIPREFIX);
////
////class idWindow;
class idWinVar {
////public:
////	idWinVar();
////	virtual ~idWinVar();
////
////	void SetGuiInfo(idDict *gd, const char *_name);
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
////
////	idWinVar &operator=( const idWinVar &other ) {
////		this.guiDict = other.this.guiDict;
////		SetName(other.name);
////		return *this;
////	}
////
	GetDict ( ): idDict { return this.guiDict; }
	NeedsUpdate ( ): boolean { return ( this.guiDict != null ); }
////
////	virtual void Init(const char *_name, idWindow* win) = 0;
////	virtual void Set(const char *val) = 0;
////	virtual void Update() = 0;
////	virtual const char *c_str() const = 0;
////	virtual size_t Size() {	size_t sz = (this.name) ? strlen(this.name) : 0; return sz + sizeof(*this); }
////
////	virtual void WriteToSaveGame( idFile *savefile ) = 0;
////	virtual void ReadFromSaveGame( idFile *savefile ) = 0;
////
////	virtual float x( void ) const = 0;
////
////	void SetEval(bool b) {
////		eval = b;
////	}
////	bool GetEval() {
////		return eval;
////	}
////	
	////idWinVar::idWinVar() { 
////	this.guiDict = NULL; 
////	this.name = NULL; 
////	eval = true;
////}
////
////idWinVar::~idWinVar() { 
////	delete this.name;
////	this.name = NULL;
////}
////
////void idWinVar::SetGuiInfo(idDict *gd, const char *_name) { 
////	this.guiDict = gd; 
////	SetName(_name); 
////}
////
////
////void idWinVar::Init(const char *_name, idWindow *win) {
////	idStr key = _name;
////	this.guiDict = NULL;
////	int len = key.Length();
////	if (len > 5 && key[0] == 'g' && key[1] == 'u' && key[2] == 'i' && key[3] == ':') {
////		key = key.Right(len - VAR_GUIPREFIX_LEN);
////		SetGuiInfo( win.GetGui().GetStateDict(), key );
////		win.AddUpdateVar(this);
////	} else {
////		Set(_name);
////	}
////}
////

////protected:
	guiDict: idDict;
	name:string;
	eval:boolean;
};

class idWinBool extends idWinVar {
////public:
////	idWinBool() : idWinVar() {};
////	~idWinBool() {};
////	virtual void Init(const char *_name, idWindow *win) { idWinVar::Init(_name, win);
////		if (this.guiDict) {
////			this.data = this.guiDict.GetBool(this.GetName());
////		}
////	}
////	int	operator==(	const bool &other ) { return (other == this.data); }
	equalsBool(	other :boolean):boolean {
		this.data = other;
		if (this.guiDict) {
			this.guiDict.SetBool(this.GetName(), this.data);
		}
		return this.data;
	}
////	idWinBool &operator=( const idWinBool &other ) {
////		idWinVar::operator=(other);
////		this.data = other.data;
////		return *this;
////	}
////
////	operator bool() const { return this.data; }
////
////	virtual void Set(const char *val) { 
////		this.data = ( atoi( val ) != 0 );
////		if (this.guiDict) {
////			this.guiDict.SetBool(this.GetName(), this.data);
////		}
////	}
////
////	virtual void Update() {	
////		const char *s = this.GetName();
////		if ( this.guiDict && s[0] != '\0' ) {
////			this.data = this.guiDict.GetBool( s );
////		}
////	}
////
////	virtual const char *c_str() const {return va("%i", this.data); }
////
////	// SaveGames
////	virtual void WriteToSaveGame( idFile *savefile ) {
////		savefile.Write( &eval, sizeof( eval ) );
////		savefile.Write( this.data, sizeof( this.data ) );
////	}
////	virtual void ReadFromSaveGame( idFile *savefile ) {
////		savefile.Read( &eval, sizeof( eval ) );
////		savefile.Read( this.data, sizeof( this.data ) );
////	}
////
////	virtual float x( void ) const { return this.data ? 1.0f : 0.0f; };
////
////protected:
	data:boolean;
};
////
class idWinStr extends idWinVar {
////public:
////	idWinStr() : idWinVar() {};
////	~idWinStr() {};
////	virtual void Init(const char *_name, idWindow *win) {
////		idWinVar::Init(_name, win);
////		if (this.guiDict) {
////			this.data = this.guiDict.GetString(this.GetName());
////		} 
////	}
////	int	operator==(	const idStr &other ) const {
////		return (other == this.data);
////	}
////	int	operator==(	const char *other ) const {
////		return (data == other);
////	}
////	idStr &operator=(	const idStr &other ) {
////		this.data = other;
////		if (this.guiDict) {
////			this.guiDict.Set(this.GetName(), this.data);
////		}
////		return this.data;
////	}
////	idWinStr &operator=( const idWinStr &other ) {
////		idWinVar::operator=(other);
////		this.data = other.data;
////		return *this;
////	}
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
////	int Length() {
////		if (this.guiDict && this.name && *this.name) {
////			this.data = this.guiDict.GetString(this.GetName());
////		}
////		return this.data.Length();
////	}
////	void RemoveColors() {
////		if (this.guiDict && this.name && *this.name) {
////			this.data = this.guiDict.GetString(this.GetName());
////		}
////		data.RemoveColors();
////	}
////	virtual const char *c_str() const {
////		return this.data.c_str();
////	}
////
////	virtual void Set(const char *val) {
////		this.data = val;
////		if ( this.guiDict ) {
////			this.guiDict.Set(this.GetName(), this.data);
////		}
////	}
////
////	virtual void Update() {
////		const char *s = this.GetName();
////		if ( this.guiDict && s[0] != '\0' ) {
////			this.data = this.guiDict.GetString( s );
////		}
////	}
////
////	virtual size_t Size() {
////		size_t sz = idWinVar::Size();
////		return sz +data.Allocated();
////	}
////
////	// SaveGames
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
////	}
////
////	// return wether string is emtpy
////	virtual float x( void ) const { return this.data[0] ? 1.0f : 0.0f; };
////
////protected:
	data = new idStr;
};

class idWinInt extends idWinVar {
////public:
////	idWinInt() : idWinVar() {};
////	~idWinInt() {};
////	virtual void Init(const char *_name, idWindow *win) {
////		idWinVar::Init(_name,  win);
////		if (this.guiDict) {
////			this.data = this.guiDict.GetInt(this.GetName());
////		} 
////	}
////	int &operator=(	const int &other ) {
////		this.data = other;
////		if (this.guiDict) {
////			this.guiDict.SetInt(this.GetName(), this.data);
////		}
////		return this.data;
////	}
////	idWinInt &operator=( const idWinInt &other ) {
////		idWinVar::operator=(other);
////		this.data = other.data;
////		return *this;
////	}
////	operator int () const {
////		return this.data;
////	}
////	virtual void Set(const char *val) {
////		this.data = atoi(val);;
////		if (this.guiDict) {
////			this.guiDict.SetInt(this.GetName(), this.data);
////		}
////	}
////
////	virtual void Update() {
////		const char *s = this.GetName();
////		if ( this.guiDict && s[0] != '\0' ) {
////			this.data = this.guiDict.GetInt( s );
////		}
////	}
////	virtual const char *c_str() const {
////		return va("%i", this.data);
////	}
////
////	// SaveGames
////	virtual void WriteToSaveGame( idFile *savefile ) {
////		savefile.Write( &eval, sizeof( eval ) );
////		savefile.Write( this.data, sizeof( this.data ) );
////	}
////	virtual void ReadFromSaveGame( idFile *savefile ) {
////		savefile.Read( &eval, sizeof( eval ) );
////		savefile.Read( this.data, sizeof( this.data ) );
////	}
////
////	// no suitable conversion
////	virtual float x( void ) const { assert( false ); return 0.0f; };
////
////protected:
	data:number/*int*/;
};

class idWinFloat extends idWinVar {
////public:
////	idWinFloat() : idWinVar() {};
////	~idWinFloat() {};
////	virtual void Init(const char *_name, idWindow *win) {
////		idWinVar::Init(_name, win);
////		if (this.guiDict) {
////			this.data = this.guiDict.GetFloat(this.GetName());
////		} 
////	}
////	idWinFloat &operator=( const idWinFloat &other ) {
////		idWinVar::operator=(other);
////		this.data = other.data;
////		return *this;
////	}
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
////	virtual void Set(const char *val) {
////		this.data = atof(val);
////		if (this.guiDict) {
////			this.guiDict.SetFloat(this.GetName(), this.data);
////		}
////	}
////	virtual void Update() {
////		const char *s = this.GetName();
////		if ( this.guiDict && s[0] != '\0' ) {
////			this.data = this.guiDict.GetFloat( s );
////		}
////	}
////	virtual const char *c_str() const {
////		return va("%f", this.data);
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
////	virtual float x( void ) const { return this.data; };
////protected:
	data:number/*float*/;
};

class idWinRectangle extends idWinVar {
////public:
////	idWinRectangle() : idWinVar() {};
////	~idWinRectangle() {};
////	virtual void Init(const char *_name, idWindow *win) {
////		idWinVar::Init(_name, win);
////		if (this.guiDict) {
////			idVec4 v = this.guiDict.GetVec4(this.GetName());
////			data.x = v.x;
////			data.y = v.y;
////			data.w = v.z;
////			data.h = v.w;
////		} 
////	}
////	
////	int	operator==(	const idRectangle &other ) const {
////		return (other == this.data);
////	}
////
////	idWinRectangle &operator=( const idWinRectangle &other ) {
////		idWinVar::operator=(other);
////		this.data = other.data;
////		return *this;
////	}
////	idRectangle &operator=(	const idVec4 &other ) {
////		this.data = other;
////		if (this.guiDict) {
////			this.guiDict.SetVec4(this.GetName(), other);
////		}
////		return this.data;
////	}
////
	equals ( other: idRectangle ): idRectangle {
		this.data = other;
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
////	virtual void Set(const char *val) {
////		if ( strchr ( val, ',' ) ) {
////			sscanf( val, "%f,%f,%f,%f", this.data.x, this.data.y, this.data.w, this.data.h );
////		} else {
////			sscanf( val, "%f %f %f %f", this.data.x, this.data.y, this.data.w, this.data.h );
////		}
////		if (this.guiDict) {
////			idVec4 v = this.data.ToVec4();
////			this.guiDict.SetVec4(this.GetName(), v);
////		}
////	}
////	virtual void Update() {
////		const char *s = this.GetName();
////		if ( this.guiDict && s[0] != '\0' ) {
////			idVec4 v = this.guiDict.GetVec4( s );
////			data.x = v.x;
////			data.y = v.y;
////			data.w = v.z;
////			data.h = v.w;
////		}
////	}
////
////	virtual const char *c_str() const {
////		return this.data.ToVec4().ToString();
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
	data = new idRectangle;
};

class idWinVec2 extends idWinVar {
////public:
////	idWinVec2() : idWinVar() {};
////	~idWinVec2() {};
////	virtual void Init(const char *_name, idWindow *win) {
////		idWinVar::Init(_name, win);
////		if (this.guiDict) {
////			this.data = this.guiDict.GetVec2(this.GetName());
////		} 
////	}
////	int	operator==(	const idVec2 &other ) const {
////		return (other == this.data);
////	}
////	idWinVec2 &operator=( const idWinVec2 &other ) {
////		idWinVar::operator=(other);
////		this.data = other.data;
////		return *this;
////	}

	equalsVec2 ( other: idVec2 ): idVec2 {
		this.data = other;
		if ( this.guiDict ) {
			this.guiDict.SetVec2( this.GetName ( ), this.data );
		}
		return this.data;
	}
////	float x() const {
////		return this.data.x;
////	}
////	float y() const {
////		return this.data.y;
////	}
////	virtual void Set(const char *val) {
////		if ( strchr ( val, ',' ) ) {
////			sscanf( val, "%f,%f", this.data.x, this.data.y );
////		} else {
////		sscanf( val, "%f %f", this.data.x, this.data.y);
////		}
////		if (this.guiDict) {
////			this.guiDict.SetVec2(this.GetName(), this.data);
////		}
////	}
////	operator const idVec2&() const {
////		return this.data;
////	}
////	virtual void Update() {
////		const char *s = this.GetName();
////		if ( this.guiDict && s[0] != '\0' ) {
////			this.data = this.guiDict.GetVec2( s );
////		}
////	}
////	virtual const char *c_str() const {
////		return this.data.ToString();
////	}
////	void Zero() {
////		data.Zero();
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
	data = new idVec2;
};

class idWinVec4 extends idWinVar {
////public:
////	idWinVec4() : idWinVar() {};
////	~idWinVec4() {};
////	virtual void Init(const char *_name, idWindow *win) {
////		idWinVar::Init(_name, win);
////		if (this.guiDict) {
////			this.data = this.guiDict.GetVec4(this.GetName());
////		} 
////	}
////	int	operator==(	const idVec4 &other ) const {
////		return (other == this.data);
////	}
////	idWinVec4 &operator=( const idWinVec4 &other ) {
////		idWinVar::operator=(other);
////		this.data = other.data;
////		return *this;
////	}
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
////	float x() const {
////		return this.data.x;
////	}
////
////	float y() const {
////		return this.data.y;
////	}
////
////	float z() const {
////		return this.data.z;
////	}
////
////	float w() const {
////		return this.data.w;
////	}
////	virtual void Set(const char *val) {
////		if ( strchr ( val, ',' ) ) {
////			sscanf( val, "%f,%f,%f,%f", &this.data.x, &this.data.y, &this.data.z, &this.data.w );
////		} else {
////			sscanf( val, "%f %f %f %f", &this.data.x, this.data.y, this.data.z, this.data.w);
////		}
////		if ( this.guiDict ) {
////			this.guiDict.SetVec4( this.GetName(), this.data );
////		}
////	}
////	virtual void Update() {
////		const char *s = this.GetName();
////		if ( this.guiDict && s[0] != '\0' ) {
////			this.data = this.guiDict.GetVec4( s );
////		}
////	}
////	virtual const char *c_str() const {
////		return this.data.ToString();
////	}
////
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
////	virtual void Init(const char *_name, idWindow *win) {
////		idWinVar::Init(_name, win);
////		if (this.guiDict) {
////			this.data = this.guiDict.GetVector(this.GetName());
////		} 
////	}
////	int	operator==(	const idVec3 &other ) const {
////		return (other == this.data);
////	}
////	idWinVec3 &operator=( const idWinVec3 &other ) {
////		idWinVar::operator=(other);
////		this.data = other.data;
////		return *this;
////	}
////	idVec3 &operator=(	const idVec3 &other ) {
////		this.data = other;
////		if (this.guiDict) {
////			this.guiDict.SetVector(this.GetName(), this.data);
////		}
////		return this.data;
////	}
////	operator const idVec3&() const {
////		return this.data;
////	}
////
////	float x() const {
////		return this.data.x;
////	}
////
////	float y() const {
////		return this.data.y;
////	}
////
////	float z() const {
////		return this.data.z;
////	}
////
////	virtual void Set(const char *val) {
////		sscanf( val, "%f %f %f", this.data.x, this.data.y, this.data.z);
////		if (this.guiDict) {
////			this.guiDict.SetVector(this.GetName(), this.data);
////		}
////	}
////	virtual void Update() {
////		const char *s = this.GetName();
////		if ( this.guiDict && s[0] != '\0' ) {
////			this.data = this.guiDict.GetVector( s );
////		}
////	}
////	virtual const char *c_str() const {
////		return this.data.ToString();
////	}
////
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
////	virtual void Init(const char *_name, idWindow *win) {
////		idWinStr::Init(_name, win);
////		if (this.guiDict) {
////			this.data = this.guiDict.GetString(this.GetName());
////		} 
////	}
////	int	operator==(	const idStr &other ) const {
////		return (other == this.data);
////	}
////	int	operator==(	const char *other ) const {
////		return (data == other);
////	}
	equalsStr ( other: idStr ): idStr {
		this.data.equals(other.data);
		if ( this.guiDict ) {
			this.guiDict.Set( this.GetName ( ), this.data.data );
		}
		if ( this.mat ) {
			if ( this.data.data == "" ) {
				this.mat = null;
			} else {
				this.mat = declManager.FindMaterial( this.data.data );
			}
		}
		return this.data;
	}
////	idWinBackground &operator=( const idWinBackground &other ) {
////		idWinVar::operator=(other);
////		this.data = other.data;
////		mat = other.mat;
////		if (mat) {
////			if ( this.data == "" ) {
////				(*mat) = NULL;
////			} else {
////				(*mat) = declManager.FindMaterial(data);
////			}
////		}
////		return *this;
////	}
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
////	virtual const char *c_str() const {
////		return this.data.c_str();
////	}
////
////	virtual void Set(const char *val) {
////		this.data = val;
////		if (this.guiDict) {
////			this.guiDict.Set(this.GetName(), this.data);
////		}
////		if (mat) {
////			if ( this.data == "" ) {
////				(*mat) = NULL;
////			} else {
////				(*mat) = declManager.FindMaterial(data);
////			}
////		}
////	}
////
////	virtual void Update() {
////		const char *s = this.GetName();
////		if ( this.guiDict && s[0] != '\0' ) {
////			this.data = this.guiDict.GetString( s );
////			if (mat) {
////				if ( this.data == "" ) {
////					(*mat) = NULL;
////				} else {
////					(*mat) = declManager.FindMaterial(data);
////				}
////			}
////		}
////	}
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
////
/////*
////================
////idMultiWinVar
////multiplexes access to a list if idWinVar*
////================
////*/
////class idMultiWinVar extends idList< idWinVar * > {
////public:
////	void Set( const char *val );
////	void Update( void );
////	void SetGuiInfo( idDict *dict );

////void idMultiWinVar::Set( const char *val ) {
////	for ( int i = 0; i < Num(); i++ ) {
////		(*this)[i].Set( val );
////	}
////}
////
////void idMultiWinVar::Update( void ) {
////	for ( int i = 0; i < Num(); i++ ) {
////		(*this)[i].Update();
////	}
////}
////
////void idMultiWinVar::SetGuiInfo( idDict *dict ) {
////	for ( int i = 0; i < Num(); i++ ) {
////		(*this)[i].SetGuiInfo( dict, (*this)[i].c_str() );
////	}
////}
////};
////
////#endif /* !__WINVAR_H__ */
////
