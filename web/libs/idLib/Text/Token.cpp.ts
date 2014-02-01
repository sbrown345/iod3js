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

////#include "precompiled.h"
////#pragma hdrstop


/*
===============================================================================

	idToken is a token read from a file or memory with idLexer or idParser

===============================================================================
*/

// token types
var TT_STRING = 1;		// string
var TT_LITERAL = 2;		// literal
var TT_NUMBER					=3;		// number
var TT_NAME						=4;		// name
var TT_PUNCTUATION				=5;		// punctuation

// number sub types
var TT_INTEGER = 0x00001;		// integer
var TT_DECIMAL = 0x00002;		// decimal number
var TT_HEX = 0x00004;		// hexadecimal number
var TT_OCTAL = 0x00008;		// octal number
var TT_BINARY = 0x00010;		// binary number
var TT_LONG = 0x00020;		// long int
var TT_UNSIGNED = 0x00040;		// unsigned int
var TT_FLOAT = 0x00080;		// floating point number
var TT_SINGLE_PRECISION = 0x00100;		// float
var TT_DOUBLE_PRECISION = 0x00200;		// double
var TT_EXTENDED_PRECISION = 0x00400;		// long double
var TT_INFINITE = 0x00800;		// infinite 1.#INF
var TT_INDEFINITE = 0x01000;		// indefinite 1.#IND
var TT_NAN = 0x02000;		// NaN
var TT_IPADDRESS = 0x04000;		// ip address
var TT_IPPORT = 0x08000;		// ip port
var TT_VALUESVALID = 0x10000;		// set if intvalue and floatvalue are valid

// string sub type is the length of the string
// literal sub type is the ASCII code
// punctuation sub type is the punctuation id
// name sub type is the length of the name

class idToken extends idStr {
    ////
    ////	friend class idParser;
    ////	friend class idLexer;
    ////
    //public:
	/*	int				*/type: number;								// token type
	/*	int				*/subtype: number;							// token sub type
	/*	int				*/line: number;								// line in script the token was on
	/*	int				*/linesCrossed: number;						// number of lines crossed in white space before token
    /*	int				*/flags:number;								// token flags, used for recursive defines
    ////
    ////public:
    ////					idToken( void );
    ////					idToken( const idToken *token );
    ////					~idToken( void );
    ////
    ////	void			operator=( const idStr& text );
    ////	void			operator=( const char *text );
    ////
    ////	double			GetDoubleValue( void );				// double value of TT_NUMBER
    ////	float			GetFloatValue( void );				// float value of TT_NUMBER
    ////	unsigned long	GetUnsignedLongValue( void );		// unsigned long value of TT_NUMBER
    ////	int				GetIntValue( void );				// int value of TT_NUMBER
    ////	int				WhiteSpaceBeforeToken( void ) const;// returns length of whitespace before token
    ////	void			ClearTokenWhiteSpace( void );		// forget whitespace before token
    ////
    ////	void			NumberValue( void );				// calculate values for a TT_NUMBER
    ////
    ////private:
    /*	unsigned long	*/intvalue:number;							// integer value
    /*	double			*/floatvalue:number;							// floating point value
    /*	const char *	*/whiteSpaceStart_p:number;					// start of white space before token, only used by idLexer
    /*	const char *	*/whiteSpaceEnd_p:number;					// end of white space before token, only used by idLexer
	/*	idToken *		*/next: idToken;								// next token in chain, only used by idParser
    ////
    ////	void			AppendDirty( const char a );		// append character without adding trailing zero
    ////};
    ////
	
	clone ( ): idToken {
		var cloned = new idToken ( );
		cloned.type = this.type;
		cloned.subtype = this.subtype;
		cloned.line = this.line;
		cloned.linesCrossed = this.linesCrossed;
		cloned.flags = this.flags;
		cloned.intvalue = this.intvalue;
		cloned.floatvalue = this.floatvalue;
		cloned.whiteSpaceStart_p = this.whiteSpaceStart_p;
		cloned.whiteSpaceEnd_p = this.whiteSpaceEnd_p;
		cloned.next = this.next;
		cloned.data = this.data;
		cloned.len = this.len;
		return cloned;
	}

	constructor ( text: string=null ) {
		super( text );
	}

	////
    ////ID_INLINE idToken::idToken( const idToken *token ) {
    ////	*this = *token;
    ////}
    ////
    ////ID_INLINE idToken::~idToken( void ) {
    ////}
    ////
    ////ID_INLINE void idToken::operator=( const char *text) {
    ////	*static_cast<idStr *>(this) = text;
    ////}
    ////
    ////ID_INLINE void idToken::operator=( const idStr& text ) {
    ////	*static_cast<idStr *>(this) = text;
    ////}
    
    GetDoubleValue( ):number {
    	if ( this.type != TT_NUMBER ) {
    		return 0.0;
    	}
		if (!(this.subtype & TT_VALUESVALID) ) {
			this.NumberValue();
    	}
		return this.floatvalue;
    }
    
    GetFloatValue( ):number {
    	return /*(float) */this.GetDoubleValue();
    }
    
    /*unsigned long	*/GetUnsignedLongValue( ):number {
    	if ( this.type != TT_NUMBER ) {
    		return 0;
    	}
		if (!(this.subtype & TT_VALUESVALID) ) {
			this.NumberValue();
    	}
		return this.intvalue;
    }
    
    GetIntValue( ):number {
    	return /*(int) */this.GetUnsignedLongValue() | 0;
    }
    ////
    ////ID_INLINE int idToken::WhiteSpaceBeforeToken( void ) const {
    ////	return ( whiteSpaceEnd_p > whiteSpaceStart_p );
    ////}
    ////
    AppendDirty( /*const char */a:string ):void {
    	//EnsureAlloced( len + 2, true );
    	//data[len++] = a;
	    this.data += a;
	    this.len++;
    }
    
    //#endif /* !__TOKEN_H__ */


    /*
    ================
    idToken::NumberValue
    ================
    */
	NumberValue(): void {
		var /*int */i: number, pow: number, div: number, c: number;
    	var p:string, pIdx = 0;
    	var/*double */m:number;

		assert(this.type == TT_NUMBER );
    	p = this.c_str();
		this.floatvalue = 0;
		this.intvalue = 0;
    	// floating point number
    	if ( this.subtype & TT_FLOAT ) {
    		if ( this.subtype & ( TT_INFINITE | TT_INDEFINITE | TT_NAN ) ) {
    			if ( this.subtype & TT_INFINITE ) {			// 1.#INF
					var /*unsigned int */inf = 0x7f800000;
				    todoThrow ( );
    				//floatvalue = /*(double)*/ *(float*)&inf;
    			}
    			else if ( this.subtype & TT_INDEFINITE ) {	// 1.#IND
					todoThrow();
    				//unsigned int ind = 0xffc00000;
    				//floatvalue = /*(double)*/ *(float*)&ind;
    			}
    			else if ( this.subtype & TT_NAN ) {			// 1.#QNAN
					todoThrow();
    				//unsigned int nan = 0x7fc00000;
    				//floatvalue = /*(double)*/ *(float*)&nan;
    			}
    		}
    		else {
    			while( p[pIdx] && p[pIdx] != '.' && p[pIdx] != 'e' ) {
					this.floatvalue = this.floatvalue * 10.0 + /*(double)*/ (p.charCodeAt(pIdx) - '0'.charCodeAt(0));
    				pIdx++;
    			}
    			if ( p[pIdx] == '.' ) {
    				pIdx++;
    				for( m = 0.1; p[pIdx] && p[pIdx] != 'e'; pIdx++ ) {
						this.floatvalue = this.floatvalue + /*(double)*/ (p.charCodeAt(pIdx) - '0'.charCodeAt(0)) * m;
    					m *= 0.1;
    				}
    			}
    			if ( p[pIdx] == 'e' ) {
    				pIdx++;
    				if ( p[pIdx] == '-' ) {
    					div = 1;
    					pIdx++;
    				}
    				else if ( p[pIdx] == '+' ) {
    					div = 0;
    					pIdx++;
    				}
    				else {
    					div = 0;
    				}
    				pow = 0;
    				for ( pow = 0; p[pIdx]; pIdx++ ) {
						pow = pow * 10 +/* (int)*/ (p.charCodeAt(pIdx) - '0'.charCodeAt(0));
    				}
    				for ( m = 1.0, i = 0; i < pow; i++ ) {
    					m *= 10.0;
    				}
    				if ( div ) {
    					this.floatvalue /= m;
    				}
    				else {
    					this.floatvalue *= m;
    				}
    			}
    		}
    		this.intvalue = idMath.Ftol( this.floatvalue );
    	}
    	else if ( this.subtype & TT_DECIMAL ) {
    		while( p[pIdx] ) {
				this.intvalue = this.intvalue * 10 + (p.charCodeAt(pIdx) - '0'.charCodeAt(0));
    			pIdx++;
    		}
    		this.floatvalue = this.intvalue;
    	}
    	else if ( this.subtype & TT_IPADDRESS ) {
    		c = 0;
    		while( p[pIdx] && p[pIdx] != ':' ) {
    			if ( p[pIdx] == '.' ) {
    				while( c != 3 ) {
    					this.intvalue = this.intvalue * 10;
    					c++;
    				}
    				c = 0;
    			}
    			else {
					this.intvalue = this.intvalue * 10 + (p.charCodeAt(pIdx) - '0'.charCodeAt(0));
    				c++;
    			}
    			pIdx++;
    		}
    		while( c != 3 ) {
    			this.intvalue = this.intvalue * 10;
    			c++;
    		}
    		this.floatvalue = this.intvalue;
    	}
    	else if ( this.subtype & TT_OCTAL ) {
    		// step over the first zero
    		p += 1;
    		while( p[pIdx] ) {
				this.intvalue = (this.intvalue << 3) + (p.charCodeAt(pIdx) - '0'.charCodeAt(0));
    			pIdx++;
    		}
    		this.floatvalue = this.intvalue;
    	}
    	else if ( this.subtype & TT_HEX ) {
    		// step over the leading 0x or 0X
    		p += 2;
    		while( p[pIdx] ) {
    			this.intvalue <<= 4;
    			if (p[pIdx] >= 'a' && p[pIdx] <= 'f')
					this.intvalue += p.charCodeAt(pIdx) - 'a'.charCodeAt(0) + 10;
    			else if (p[pIdx] >= 'A' && p[pIdx] <= 'F')
					this.intvalue += p.charCodeAt(pIdx) - 'A'.charCodeAt(0) + 10;
    			else
					this.intvalue += p.charCodeAt(pIdx) - '0'.charCodeAt(0);
    			pIdx++;
    		}
    		this.floatvalue = this.intvalue;
    	}
    	else if ( this.subtype & TT_BINARY ) {
    		// step over the leading 0b or 0B
    		p += 2;
    		while( p[pIdx] ) {
    			this.intvalue = (this.intvalue << 1) + (p.charCodeAt(pIdx) - '0'.charCodeAt(0));
    			pIdx++;
    		}
    		this.floatvalue = this.intvalue;
    	}
    	this.subtype |= TT_VALUESVALID;
    }

    /////*
    ////================
    ////idToken::ClearTokenWhiteSpace
    ////================
    ////*/
    ////void idToken::ClearTokenWhiteSpace( void ) {
    ////	whiteSpaceStart_p = NULL;
    ////	whiteSpaceEnd_p = NULL;
    ////	linesCrossed = 0;
    ////}
}