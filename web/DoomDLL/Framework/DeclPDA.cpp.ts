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


class idDeclPDA extends idDecl {
	////public:
	constructor ( ) {
		super ( );
		this.originalEmails = this.originalVideos = 0;
	}
	////
	////	virtual size_t			Size( ) const;
	////	virtual const char *	DefaultDefinition( ) const;
	////	virtual void			FreeData( );
	////	virtual void			Print( ) const;
	////	virtual void			List( ) const;
	////
	////	virtual void			AddVideo( name:string, bool unique = true ) const;
	////	virtual void			AddAudio( name:string, bool unique = true ) const;
	////	virtual void			AddEmail( name:string, bool unique = true ) const;
	////	virtual void			RemoveAddedEmailsAndVideos() const;
	////
	////	virtual const int		GetNumVideos() const;
	////	virtual const int		GetNumAudios() const;
	////	virtual const int		GetNumEmails() const;
	////	virtual const idDeclVideo *GetVideoByIndex( int index ) const;
	////	virtual const idDeclAudio *GetAudioByIndex( int index ) const;
	////	virtual const idDeclEmail *GetEmailByIndex( int index ) const;
	////
	////	virtual void			SetSecurity( const char *sec ) const;
	////
	GetPdaName ( ): string { return this.pdaName.data; }
	GetSecurity ( ): string { return this.security.data; }
	GetFullName ( ): string { return this.fullName.data; }
	GetIcon ( ): string { return this.icon.data; }
	GetPost ( ): string { return this.post.data; }
	GetID ( ): string { return this.id.data; }
	GetTitle ( ): string { return this.title.data; }

	////private:
	videos = new /*mutable*/idStrList;
	audios = new /*mutable*/idStrList;
	emails = new /*mutable*/idStrList;
	pdaName = new idStr;
	fullName = new idStr;
	icon = new idStr;
	id = new idStr;
	post = new idStr;
	title = new idStr;
	security = new /*mutable*/ idStr;
	originalEmails: number /*mutable	int	*/;
	originalVideos: number /*mutable	int	*/;

/*
=================
idDeclPDA::Size
=================
*/
	Size ( ): /*size_t*/number {
		return sizeof( idDeclPDA );
	}

/*
===============
idDeclPDA::Print
===============
*/
	Print ( ): void {
		common.Printf( "Implement me\n" );
	}

/*
===============
idDeclPDA::List
===============
*/
	List ( ): void {
		common.Printf( "Implement me\n" );
	}

/*
================
idDeclPDA::Parse
================
*/
	Parse ( text: string, /*int */textLength: number ): boolean {
		var src = new idLexer;
		var token = new idToken ( );

		src.LoadMemory( text, textLength, this.GetFileName ( ), this.GetLineNum ( ) );
		src.SetFlags( DECL_LEXER_FLAGS );
		src.SkipUntilString( "{" );

		// scan through, identifying each individual parameter
		while ( 1 ) {

			if ( !src.ReadToken( token ) ) {
				break;
			}

			if ( token.data == "}" ) {
				break;
			}

			if ( !token.Icmp( "name" ) ) {
				src.ReadToken( token );
				this.pdaName.opEquals( token );
				continue;
			}

			if ( !token.Icmp( "fullname" ) ) {
				src.ReadToken( token );
				this.fullName.opEquals( token );
				continue;
			}

			if ( !token.Icmp( "icon" ) ) {
				src.ReadToken( token );
				this.icon.opEquals( token );
				continue;
			}

			if ( !token.Icmp( "id" ) ) {
				src.ReadToken( token );
				this.id.opEquals( token );
				continue;
			}

			if ( !token.Icmp( "post" ) ) {
				src.ReadToken( token );
				this.post.opEquals( token );
				continue;
			}

			if ( !token.Icmp( "title" ) ) {
				src.ReadToken( token );
				this.title.opEquals( token );
				continue;
			}

			if ( !token.Icmp( "security" ) ) {
				src.ReadToken( token );
				this.security.opEquals( token );
				continue;
			}

			if ( !token.Icmp( "pda_email" ) ) {
				src.ReadToken( token );
				this.emails.Append( token );
				declManager.FindType( declType_t.DECL_EMAIL, token.data );
				continue;
			}

			if ( !token.Icmp( "pda_audio" ) ) {
				src.ReadToken( token );
				this.audios.Append( token );
				declManager.FindType( declType_t.DECL_AUDIO, token.data );
				continue;
			}

			if ( !token.Icmp( "pda_video" ) ) {
				src.ReadToken( token );
				this.videos.Append( token );
				declManager.FindType( declType_t.DECL_VIDEO, token.data );
				continue;
			}

		}

		if ( src.HadError ( ) ) {
			src.Warning( "PDA decl '%s' had a parse error", this.GetName ( ) );
			return false;
		}

		this.originalVideos = this.videos.Num ( );
		this.originalEmails = this.emails.Num ( );
		return true;
	}

/*
===================
idDeclPDA::DefaultDefinition
===================
*/
	DefaultDefinition ( ): string {
		return "{\n" +
			"\t" + "name  \"default pda\"\n" +
			"}";
	}

/*
===================
idDeclPDA::FreeData
===================
*/
	FreeData ( ): void {
		this.videos.Clear ( );
		this.audios.Clear ( );
		this.emails.Clear ( );
		this.originalEmails = 0;
		this.originalVideos = 0;
	}

/////*
////=================
////idDeclPDA::AddVideo
////=================
////*/
////void idDeclPDA::AddVideo( name:string, bool unique  = true) const {
////	if ( unique && ( this.videos.Find( name ) != NULL ) ) {
////		return;
////	}
////	if ( declManager.FindType( DECL_VIDEO, name, false ) == NULL ) {
////		common.Printf( "Video %s not found\n", name );
////		return;
////	}
////	this.videos.Append( name );
////}
////
/////*
////=================
////idDeclPDA::AddAudio
////=================
////*/
////void idDeclPDA::AddAudio( name:string, bool unique  = true) const {
////	if ( unique && ( this.audios.Find( name ) != NULL ) ) {
////		return;
////	}
////	if ( declManager.FindType( DECL_AUDIO, name, false ) == NULL ) {
////		common.Printf( "Audio log %s not found\n", name );
////		return;
////	}
////	this.audios.Append( name );
////}

/*
=================
idDeclPDA::AddEmail
=================
*/
    AddEmail ( name: string, unique = true ): void {
        if ( unique && ( this.emails.Find( new idStr( name ) ) != null ) ) {
            return;
        }
        if ( declManager.FindType( declType_t.DECL_EMAIL, name, false ) == null ) {
            common.Printf( "Email %s not found\n", name );
            return;
        }
        this.emails.Append( new idStr( name ) );
    }

/////*
////=================
////idDeclPDA::RemoveAddedEmailsAndVideos
////=================
////*/
////void idDeclPDA::RemoveAddedEmailsAndVideos() const {
////	int num = this.emails.Num();
////	if ( originalEmails < num ) {
////		while ( num && num > originalEmails ) {
////			this.emails.RemoveIndex( --num );
////		}
////	}
////	num = this.videos.Num();
////	if ( originalVideos < num ) {
////		while ( num && num > originalVideos ) {
////			this.videos.RemoveIndex( --num );
////		}
////	}
////}
////
/*
=================
idDeclPDA::SetSecurity
=================
*/
	SetSecurity ( sec: string ): void {
		this.security.opEquals( sec );
	}

/*
=================
idDeclPDA::GetNumVideos
=================
*/
	GetNumVideos ( ): number {
		return this.videos.Num ( );
	}

/*
=================
idDeclPDA::GetNumAudios
=================
*/
	GetNumAudios ( ): number {
		return this.audios.Num ( );
	}

/*
=================
idDeclPDA::GetNumEmails
=================
*/
	GetNumEmails ( ): number {
		return this.emails.Num ( );
	}
////
/////*
////=================
////idDeclPDA::GetVideoByIndex
////=================
////*/
////const idDeclVideo* idDeclPDA::GetVideoByIndex( int index ) const {
////	if ( index >= 0 && index < this.videos.Num() ) {
////		return static_cast< const idDeclVideo* >( declManager.FindType( DECL_VIDEO, this.videos[index], false ) );
////	}
////	return NULL;
////}
////
/////*
////=================
////idDeclPDA::GetAudioByIndex
////=================
////*/
////const idDeclAudio* idDeclPDA::GetAudioByIndex( int index ) const {
////	if ( index >= 0 && index < this.audios.Num() ) {
////		return static_cast< const idDeclAudio* >( declManager.FindType( DECL_AUDIO, this.audios[index], false ) );
////	}
////	return NULL;
////}
////
/////*
////=================
////idDeclPDA::GetEmailByIndex
////=================
////*/
////const idDeclEmail* idDeclPDA::GetEmailByIndex( int index ) const {
////	if ( index >= 0 && index < this.emails.Num() ) {
////		return static_cast< const idDeclEmail* >( declManager.FindType( declType_t.DECL_EMAIL, this.emails[index], false ) );
////	}
////	return NULL;
////}
}

////
class idDeclEmail extends idDecl {
	////public:
	////							idDeclEmail() {}
	////
	////	virtual size_t			Size( ) const;
	////	virtual const char *	DefaultDefinition( ) const;

////	virtual void			FreeData( );
////	virtual void			Print( ) const;
////	virtual void			List( ) const;
////
	GetFrom(): string { return this.from.data; }
	GetBody(): string { return this.text.data; }
	GetSubject(): string { return this.subject.data; }
	GetDate(): string { return this.date.data; }
	GetTo(): string { return this.to.data; }
	GetImage(): string { return this.image.data; }
////
////private:
	text = new idStr;
	subject= new idStr;
	date= new idStr;
	to= new idStr;
	from= new idStr;
	image= new idStr;
/*
=================
idDeclEmail::Size
=================
*/
	Size(): /*size_t*/number {
		return sizeof(idDeclEmail);
	}

/*
===============
idDeclEmail::Print
===============
*/
Print ( ): void {
		common.Printf( "Implement me\n" );
	}

/*
===============
idDeclEmail::List
===============
*/
List ( ): void {
		common.Printf( "Implement me\n" );
	}

/*
================
idDeclEmail::Parse
================
*/
	Parse ( _text: string, /* int */textLength: number ): boolean {
		var src = new idLexer;
		var token = new idToken;

		src.LoadMemory( _text, textLength, this.GetFileName ( ), this.GetLineNum ( ) );
		src.SetFlags( lexerFlags_t.LEXFL_NOSTRINGCONCAT | lexerFlags_t.LEXFL_ALLOWPATHNAMES | lexerFlags_t.LEXFL_ALLOWMULTICHARLITERALS | lexerFlags_t.LEXFL_ALLOWBACKSLASHSTRINGCONCAT | lexerFlags_t.LEXFL_NOFATALERRORS );
		src.SkipUntilString( "{" );

		this.text.opEquals( "" );
		// scan through, identifying each individual parameter
		while ( 1 ) {

			if ( !src.ReadToken( token ) ) {
				break;
			}

			if ( token.data == "}" ) {
				break;
			}

			if ( !token.Icmp( "subject" ) ) {
				src.ReadToken( token );
				this.subject.opEquals( token );
				continue;
			}

			if ( !token.Icmp( "to" ) ) {
				src.ReadToken( token );
				this.to.opEquals( token );
				continue;
			}

			if ( !token.Icmp( "from" ) ) {
				src.ReadToken( token );
				this.from.opEquals( token );
				continue;
			}

			if ( !token.Icmp( "date" ) ) {
				src.ReadToken( token );
				this.date.opEquals( token );
				continue;
			}

			if ( !token.Icmp( "text" ) ) {
				src.ReadToken( token );
				if ( token.data != "{" ) {
					src.Warning( "Email decl '%s' had a parse error", this.GetName ( ) );
					return false;
				}
				while ( src.ReadToken( token ) && token.data != "}" ) {
					this.text.Append( token.data );
				}
				continue;
			}

			if ( !token.Icmp( "image" ) ) {
				src.ReadToken( token );
				this.image.opEquals( token );
				continue;
			}
		}

		if ( src.HadError ( ) ) {
			src.Warning( "Email decl '%s' had a parse error", this.GetName ( ) );
			return false;
		}
		return true;
	}

/*
===================
idDeclEmail::DefaultDefinition
===================
*/
    DefaultDefinition ( ): string {
        return "{\n" +
            "\t" + "{\n" +
            "\t\t" + "to\t5Mail recipient\n" +
            "\t\t" + "subject\t5Nothing\n" +
            "\t\t" + "from\t5No one\n" +
            "\t" + "}\n" +
            "}";
    }

/*
===================
idDeclEmail::FreeData
===================
*/
	FreeData ( ): void {
	}
}

class idDeclVideo extends idDecl {
	////public:
	////							idDeclVideo() {};
	////
	////	virtual size_t			Size( ) const;
	////	virtual const char *	DefaultDefinition( ) const;
////	virtual void			FreeData( );
////	virtual void			Print( ) const;
////	virtual void			List( ) const;
////
	GetRoq() :string { return this.video.data; }
	GetWave(): string { return this.audio.data; }
	GetVideoName(): string { return this.videoName.data; }
	GetInfo(): string { return this.info.data; }
	GetPreview(): string { return this.preview.data; }
////
////private:
	preview = new idStr;
	video = new idStr;
	videoName = new idStr;
	info = new idStr;
	audio = new idStr;

/*
=================
idDeclVideo::Size
=================
*/
	Size(): /*size_t*/number {
		return sizeof(idDeclVideo);
	}
/*
===============
idDeclVideo::Print
===============
*/
Print(): void {
	common.Printf("Implement me\n");
}

/*
===============
idDeclVideo::List
===============
*/
	List(): void {
		common.Printf("Implement me\n");
	}

/*
================
idDeclVideo::Parse
================
*/
	Parse ( text: string, /*int*/ textLength: number ): boolean {
		var src = new idLexer;
		var token = new idToken;

		src.LoadMemory( text, textLength, this.GetFileName ( ), this.GetLineNum ( ) );
		src.SetFlags( lexerFlags_t.LEXFL_NOSTRINGCONCAT | lexerFlags_t.LEXFL_ALLOWPATHNAMES | lexerFlags_t.LEXFL_ALLOWMULTICHARLITERALS | lexerFlags_t.LEXFL_ALLOWBACKSLASHSTRINGCONCAT | lexerFlags_t.LEXFL_NOFATALERRORS );
		src.SkipUntilString( "{" );

		// scan through, identifying each individual parameter
		while ( 1 ) {

			if ( !src.ReadToken( token ) ) {
				break;
			}

			if ( token.data == "}" ) {
				break;
			}

			if ( !token.Icmp( "name" ) ) {
				src.ReadToken( token );
				this.videoName.opEquals( token );
				continue;
			}

			if ( !token.Icmp( "preview" ) ) {
				src.ReadToken( token );
				this.preview.opEquals( token );
				continue;
			}

			if ( !token.Icmp( "video" ) ) {
				src.ReadToken( token );
				this.video.opEquals( token );
				declManager.FindMaterial( this.video.data );
				continue;
			}

			if ( !token.Icmp( "info" ) ) {
				src.ReadToken( token );
				this.info.opEquals( token );
				continue;
			}

			if ( !token.Icmp( "audio" ) ) {
				src.ReadToken( token );
				this.audio.opEquals( token );
				declManager.FindSound( this.audio.data );
				continue;
			}

		}

		if ( src.HadError ( ) ) {
			src.Warning( "Video decl '%s' had a parse error", this.GetName ( ) );
			return false;
		}
		return true;
	}

/*
===================
idDeclVideo::DefaultDefinition
===================
*/
	DefaultDefinition ( ): string {
		return "{\n" +
			"\t" + "{\n" +
			"\t\t" + "name\t5Default Video\n" +
			"\t" + "}\n" +
			"}";
	}

/*
===================
idDeclVideo::FreeData
===================
*/
	FreeData ( ): void {
	}
}

class idDeclAudio extends idDecl {
	////public:
	////							idDeclAudio() {};
	////
	////	virtual size_t			Size( ) const;
	////	virtual const char *	DefaultDefinition( ) const;
	////	virtual void			FreeData( );
	////	virtual void			Print( ) const;
	////	virtual void			List( ) const;
	////
	GetAudioName() :string { return this.audioName.data; }
	GetWave(): string { return this.audio.data; }
	GetInfo(): string { return this.info.data; }
	GetPreview(): string { return this.preview.data; }
	////
	////private:
	audio = new idStr;
	audioName = new idStr;
	info = new idStr;
	preview = new idStr;


/*
=================
idDeclAudio::Size
=================
*/
	Size(): /*size_t*/number {
		return sizeof(idDeclAudio);
	}

/*
===============
idDeclAudio::Print
===============
*/
	Print(): void {
		common.Printf("Implement me\n");
	}

/*
===============
idDeclAudio::List
===============
*/
	List(): void {
		common.Printf("Implement me\n");
	}

/*
================
idDeclAudio::Parse
================
*/
	Parse ( text: string, /*int */textLength: number ): boolean {
		todoThrow ( );
		var src = new idLexer;
		var token = new idToken;

		src.LoadMemory( text, textLength, this.GetFileName ( ), this.GetLineNum ( ) );
		src.SetFlags( lexerFlags_t.LEXFL_NOSTRINGCONCAT | lexerFlags_t.LEXFL_ALLOWPATHNAMES | lexerFlags_t.LEXFL_ALLOWMULTICHARLITERALS | lexerFlags_t.LEXFL_ALLOWBACKSLASHSTRINGCONCAT | lexerFlags_t.LEXFL_NOFATALERRORS );
		src.SkipUntilString( "{" );

		// scan through, identifying each individual parameter
		while ( 1 ) {

			if ( !src.ReadToken( token ) ) {
				break;
			}

			if ( token.data == "}" ) {
				break;
			}

			if ( !token.Icmp( "name" ) ) {
				src.ReadToken( token );
				this.audioName.opEquals( token );
				continue;
			}

			if ( !token.Icmp( "audio" ) ) {
				src.ReadToken( token );
				this.audio.opEquals( token );
				declManager.FindSound( this.audio.data );
				continue;
			}

			if ( !token.Icmp( "info" ) ) {
				src.ReadToken( token );
				this.info.opEquals( token );
				continue;
			}

			if ( !token.Icmp( "preview" ) ) {
				src.ReadToken( token );
				this.preview.opEquals( token );
				continue;
			}

		}

		if ( src.HadError ( ) ) {
			src.Warning( "Audio decl '%s' had a parse error", this.GetName ( ) );
			return false;
		}
		return true;
	}

/*
===================
idDeclAudio::DefaultDefinition
===================
*/
	DefaultDefinition ( ): string {
		return "{\n" +
			"\t" + "{\n" +
			"\t\t" + "name\t5Default Audio\n" +
			"\t" + "}\n" +
			"}";
	}

/*
===================
idDeclAudio::FreeData
===================
*/
	FreeData ( ): void {
	}
}