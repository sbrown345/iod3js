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

class idDeclTable extends idDecl {
////public:
////	virtual size_t			Size( void ) const;
////	virtual const char *	DefaultDefinition( void ) const;
////	virtual bool			Parse( text:string, const int textLength );
////	virtual void			FreeData( void );
////
////	float					TableLookup( float index ) const;
////
////private:
	clamp: boolean;
	snap: boolean;
	values = new idList< /*float*/number>( Number );


////#include "../idlib/precompiled.h"
////#pragma hdrstop
////
////
/*
=================
idDeclTable::TableLookup
=================
*/
	TableLookup ( /*float*/index: number ) /*float*/: number {
		var iIndex: number /*int*/;
		var /*float*/ iFrac: number;

		var /*int*/ domain = this.values.Num ( ) - 1;

		if ( domain <= 1 ) {
			return 1.0;
		}

		if ( this.clamp ) {
			index *= ( domain - 1 );
			if ( index >= domain - 1 ) {
				return this.values[domain - 1];
			} else if ( index <= 0 ) {
				return this.values[0];
			}
			iIndex = idMath.Ftoi( index );
			iFrac = index - iIndex;
		} else {
			index *= domain;

			if ( index < 0 ) {
				index += domain * idMath.Ceil( -index / domain );
			}

			iIndex = idMath.FtoiFast( idMath.Floor( index ) );
			iFrac = index - iIndex;
			iIndex = iIndex % domain;
		}

		if ( !this.snap ) {
			// we duplicated the 0 index at the end at creation time, so we
			// don't need to worry about wrapping the filter
			return this.values[iIndex] * ( 1.0 - iFrac ) + this.values[iIndex + 1] * iFrac;
		}

		return this.values[iIndex];
	}

/*
=================
idDeclTable::Size
=================
*/
	Size ( ): number {
		return sizeof( idDeclTable ) + this.values.Allocated ( );
	}

/*
=================
idDeclTable::FreeData
=================
*/
	FreeData ( ): void {
		this.snap = false;
		this.clamp = false;
		this.values.Clear ( );
	}

/*
=================
idDeclTable::DefaultDefinition
=================
*/
	DefaultDefinition ( ): string {
		return "{ { 0 } }";
	}

/*
=================
idDeclTable::Parse
=================
*/
	Parse ( text: string, textLength: number ): boolean {
		var src = new idLexer;
		var token = new idToken;
		var /*float */v: number;

		src.LoadMemory( text, textLength, this.GetFileName ( ), this.GetLineNum ( ) );
		src.SetFlags( DECL_LEXER_FLAGS );
		src.SkipUntilString( "{" );

		this.snap = false;
		this.clamp = false;
		this.values.Clear ( );

		while ( 1 ) {
			if ( !src.ReadToken( token ) ) {
				break;
			}

			if ( token.data == "}" ) {
				break;
			}

			if ( token.Icmp( "snap" ) == 0 ) {
				this.snap = true;
			} else if ( token.Icmp( "clamp" ) == 0 ) {
				this.clamp = true;
			} else if ( token.Icmp( "{" ) == 0 ) {

				while ( 1 ) {
					var errorFlag = new R<boolean> ( );
					v = src.ParseFloat( errorFlag );
					if ( errorFlag.$ ) {
						// we got something non-numeric
						this.MakeDefault ( );
						return false;
					}

					this.values.Append( v );

					src.ReadToken( token );
					if ( token.data == "}" ) {
						break;
					}
					if ( token.data == "," ) {
						continue;
					}
					src.Warning( "expected comma or brace" );
					this.MakeDefault ( );
					return false;
				}

			} else {
				src.Warning( "unknown token '%s'", token.c_str ( ) );
				this.MakeDefault ( );
				return false;
			}
		}

		// copy the 0 element to the end, so lerping doesn't
		// need to worry about the wrap case
		var val = this.values[0]; // template bug requires this to not be in the Append()?
		this.values.Append( val );

		return true;
	}

}