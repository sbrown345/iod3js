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

////#ifndef __MATH_VECTOR_H__
////#define __MATH_VECTOR_H__

/////*
////===============================================================================

////  Vector classes

////===============================================================================
////*/

var VECTOR_EPSILON = 0.001;

////class idAngles;
////class idPolar3;
////class idMat3;

//===============================================================
//
//	idVec2 - 2D vector
//
//===============================================================

class idVec2 {
//public:
	//x: number; //	float			
	//y: number; //	float			
	
	values = new Float32Array(2);

	get x ( ): number { return this.values[0]; }

	set x ( value: number ) {
		if ( value === undefined ) {
			throw 'Undefined value';
		}
		this.values[0] = value;
	}

	get y ( ): number { return this.values[1]; }

	set y ( value: number ) {
		if ( value === undefined ) {
			throw 'Undefined value';
		}
		this.values[1] = value;
	}


	opEquals ( a: idVec2 ): idVec2 {
		this.x = a.x;
		this.y = a.y;

		return this;
	}

////					idVec2( );
////					explicit idVec2( const float x, const float y );

////	void 			Set( const float x, const float y );
////	void			Zero( );

////	float			operator[]( int index ) const;
////	float &			operator[]( int index );
////	idVec2			operator-() const;
////	float			operator*( const idVec2 &a ) const;
////	idVec2			operator*( /*const float */a :number ) const;
////	idVec2			operator/( /*const float */a :number ) const;
////	idVec2			operator+( const idVec2 &a ) const;
////	idVec2			operator-( const idVec2 &a ) const;
////	idVec2 &		operator+=( const idVec2 &a );
////	idVec2 &		operator-=( const idVec2 &a );
////	idVec2 &		operator/=( const idVec2 &a );
////	idVec2 &		operator/=( /*const float */a :number );
////	idVec2 &		operator*=( /*const float */a :number );

////	friend idVec2	operator*( /*const float */a :number, const idVec2 b );

////	bool			Compare( const idVec2 &a ) const;							// exact compare, no epsilon
////	bool			Compare( const idVec2 &a, const float epsilon ) const;		// compare with epsilon
////	bool			operator==(	const idVec2 &a ) const;						// exact compare, no epsilon
////	bool			operator!=(	const idVec2 &a ) const;						// exact compare, no epsilon

////	float			Length( ) const;
////	float			LengthFast( ) const;
////	float			LengthSqr( ) const;
////	float			Normalize( );			// returns length
////	float			NormalizeFast( );		// returns length
////	idVec2 &		Truncate( float length );	// cap length
////	void			Clamp( const idVec2 &min, const idVec2 &max );
////	void			Snap( );				// snap to closest integer value
////	void			SnapInt( );			// snap towards integer (floor)

////	int				GetDimension( ) const;

////	const float *	ToFloatPtr( ) const;
////	float *			ToFloatPtr( );
////	const char *	ToString( int precision = 2 ) const;

////	void			Lerp( const idVec2 &v1, const idVec2 &v2, const float l );
////};

////extern idVec2 vec2_origin;
////#define vec2_zero vec2_origin

	constructor ( )
	constructor ( x: number, y: number )
	constructor ( x?: number, y?: number ) {
		this.x = x || 0;
		this.y = y || 0;
	}


	Set ( /* float */x: number, /*float */y: number ): void {
		this.x = x;
		this.y = y;
	}

	Zero ( ): void {
		this.x = this.y = 0.0;
	}

	Compare ( a: idVec2 ): boolean {
		return ( ( this.x == a.x ) && ( this.y == a.y ) );
	}

////ID_INLINE bool idVec2::Compare( const idVec2 &a, const float epsilon ) const {
////	if ( idMath.Fabs( x - a.x ) > epsilon ) {
////		return false;
////	}

////	if ( idMath.Fabs( y - a.y ) > epsilon ) {
////		return false;
////	}

////	return true;
////}
	
	opEqualTo ( a: idVec2 ): boolean {
		return this.Compare( a );
	}

////ID_INLINE bool idVec2::operator!=( const idVec2 &a ) const {
////	return !Compare( a );
////}
	[index: number]: number;

////ID_INLINE float idVec2::operator[]( int index ) const {
////	return ( &x )[ index ];
////}

////ID_INLINE float& idVec2::operator[]( int index ) {
////	return ( &x )[ index ];
////}

////ID_INLINE float idVec2::Length( ) const {
////	return ( float )idMath::Sqrt( x * x + y * y );
////}

////ID_INLINE float idVec2::LengthFast( ) const {
////	float sqrLength;

////	sqrLength = x * x + y * y;
////	return sqrLength * idMath.RSqrt( sqrLength );
////}

////ID_INLINE float idVec2::LengthSqr( ) const {
////	return ( x * x + y * y );
////}

////ID_INLINE float idVec2::Normalize( ) {
////	float sqrLength, invLength;

////	sqrLength = x * x + y * y;
////	invLength = idMath.InvSqrt( sqrLength );
////	x *= invLength;
////	y *= invLength;
////	return invLength * sqrLength;
////}

////ID_INLINE float idVec2::NormalizeFast( ) {
////	float lengthSqr, invLength;

////	lengthSqr = x * x + y * y;
////	invLength = idMath.RSqrt( lengthSqr );
////	x *= invLength;
////	y *= invLength;
////	return invLength * lengthSqr;
////}

////ID_INLINE idVec2 &idVec2::Truncate( float length ) {
////	float length2;
////	float ilength;

////	if ( !length ) {
////		Zero();
////	}
////	else {
////		length2 = LengthSqr();
////		if ( length2 > length * length ) {
////			ilength = length * idMath.InvSqrt( length2 );
////			x *= ilength;
////			y *= ilength;
////		}
////	}

////	return this;
////}

////ID_INLINE void idVec2::Clamp( const idVec2 &min, const idVec2 &max ) {
////	if ( x < min.x ) {
////		x = min.x;
////	} else if ( x > max.x ) {
////		x = max.x;
////	}
////	if ( y < min.y ) {
////		y = min.y;
////	} else if ( y > max.y ) {
////		y = max.y;
////	}
////}

////ID_INLINE void idVec2::Snap( ) {
////	x = floor( x + 0.5 );
////	y = floor( y + 0.5 );
////}

////ID_INLINE void idVec2::SnapInt( ) {
////	x = float( int( x ) );
////	y = float( int( y ) );
////}

////ID_INLINE idVec2 idVec2::operator-() const {
////	return idVec2( -x, -y );
////}

////ID_INLINE idVec2 idVec2::operator-( const idVec2 &a ) const {
////	return idVec2( x - a.x, y - a.y );
////}

////ID_INLINE float idVec2::operator*( const idVec2 &a ) const {
////	return x * a.x + y * a.y;
////}

////ID_INLINE idVec2 idVec2::operator*( /*const float */a :number ) const {
////	return idVec2( x * a, y * a );
////}

////ID_INLINE idVec2 idVec2::operator/( /*const float */a :number ) const {
////	float inva = 1.0 / a;
////	return idVec2( x * inva, y * inva );
////}

////ID_INLINE idVec2 operator*( /*const float */a :number, const idVec2 b ) {
////	return idVec2( b.x * a, b.y * a );
////}

////ID_INLINE idVec2 idVec2::operator+( const idVec2 &a ) const {
////	return idVec2( x + a.x, y + a.y );
////}

	opAdditionAssignment ( a: idVec2 ): idVec2 {
		this.x += a.x;
		this.y += a.y;

		return this;
	}

////ID_INLINE idVec2 &idVec2::operator/=( const idVec2 &a ) {
////	x /= a.x;
////	y /= a.y;

////	return this;
////}

////ID_INLINE idVec2 &idVec2::operator/=( /*const float */a :number ) {
////	float inva = 1.0 / a;
////	x *= inva;
////	y *= inva;

////	return this;
////}

	opSubtractionAssignment ( a: idVec2 ): idVec2 {
		this.x -= a.x;
		this.y -= a.y;

		return this;
	}

////ID_INLINE idVec2 &idVec2::operator*=( /*const float */a :number ) {
////	x *= a;
////	y *= a;

////	return this
////}

	GetDimension ( ): number {
		return 2;
	}

////ID_INLINE const float *idVec2::ToFloatPtr( ) const {
////	return &x;
////}

	ToFloatPtr ( ): Float32Array {
		return this.values;
	}

/*
=============
idVec2::ToString
=============
*/
	ToString ( /*int*/ precision: number = 2): string {
		return idStr.FloatArrayToString( this.ToFloatPtr ( ), this.GetDimension ( ), precision );
	}

	valueOf(): number {
		todoThrow("error: implicity idPVec2 valueOf called");
		return NaN;
	}

/////*
////=============
////Lerp

////Linearly inperpolates one vector to another.
////=============
////*/
////void idVec2::Lerp( const idVec2 &v1, const idVec2 &v2, const float l ) {
////	if ( l <= 0.0 ) {
////		(*this) = v1;
////	} else if ( l >= 1.0 ) {
////		(*this) = v2;
////	} else {
////		(*this) = v1 + l * ( v2 - v1 );
////	}
////}
}

Object.defineProperty(idVec2.prototype, "0", {
	get: function (): number {
		return this.values[0];
	},
	set: function (value: number): void {
		if (value === undefined) {
			throw 'Undefined value';
		}
		if (typeof value !== "number") {
			throw 'must be number type';
		}
		this.x = value;
	},
	enumerable: false,
	configurable: false
});

Object.defineProperty(idVec2.prototype, "1", {
	get: function (): number {
		return this.values[1];
	},
	set: function (value: number): void {
		if (value === undefined) {
			throw 'Undefined value';
		}
		if (typeof value !== "number") {
			throw 'must be number type';
		}
		this.y = value;
	},
	enumerable: false,
	configurable: false
});


//===============================================================
//
//	idVec3 - 3D vector
//
//===============================================================

class idVec3 {
	static size = 12;

//public:	
	//x:number;	  //float			
	//y:number;	  //float			
	//z: number;  //float		

	values: Float32Array;

	get x ( ): number { return this.values[0]; }

	set x ( value: number ) {
		if ( value === undefined ) {
			throw 'Undefined value';
		}
		this.values[0] = value;
	}

	get y ( ): number { return this.values[1]; }

	set y ( value: number ) {
		if ( value === undefined ) {
			throw 'Undefined value';
		}
		this.values[1] = value;
	}

	get z ( ): number { return this.values[2]; }

	set z ( value: number ) {
		if ( value === undefined ) {
			throw 'Undefined value';
		}
		this.values[2] = value;
	}

	constructor ( )
	constructor ( array: Float32Array )
	constructor ( x: number, y: number, z: number )
	constructor ( xOrArray?: any, y?: number, z?: number ) {
		if ( !( xOrArray instanceof Float32Array ) ) {
			this.values = new Float32Array( 3 );
			this.x = xOrArray || 0.0;
			this.y = y || 0.0;
			this.z = z || 0.0;
		} else {
			this.values = xOrArray;
		}
	}

	toString ( ): string {
		return "idVec3(" + this.x + "," + this.y + "," + this.z + ")";
	}

	copy ( dest: idVec3 = null ): idVec3 {
		dest = dest || new idVec3;
		dest.x = this.x;
		dest.y = this.y;
		dest.z = this.z;
		return dest;
	}

	memset0 ( ): void {
		this.x = 0;
		this.y = 0;
		this.z = 0;
	}

////					idVec3( );
////					explicit idVec3( const float x, const float y, const float z );

////	void 			Set( const float x, const float y, const float z );
////	void			Zero( );

////	float			operator[]( const int index ) const;
////	float &			operator[]( const int index );
////	idVec3			operator-() const;
////	idVec3 &		operator=( /*const idVec3 &a*/a:idVec3 );		// required because of a msvc 6 & 7 bug
////	float			operator*( /*const idVec3 &a*/a:idVec3 ) const;
////	idVec3			operator*( /*const float */a :number ) const;
////	idVec3			operator/( /*const float */a :number ) const;
////	idVec3			operator+( /*const idVec3 &a*/a:idVec3 ) const;
////	idVec3			operator-( /*const idVec3 &a*/a:idVec3 ) const;
////	idVec3 &		operator+=( /*const idVec3 &a*/a:idVec3 );
////	idVec3 &		operator-=( /*const idVec3 &a*/a:idVec3 );
////	idVec3 &		operator/=( /*const idVec3 &a*/a:idVec3 );
////	idVec3 &		operator/=( /*const float */a :number );
////	idVec3 &		operator*=( /*const float */a :number );

////	friend idVec3	operator*( /*const float */a :number, const idVec3 b );

////	bool			Compare( /*const idVec3 &a*/a:idVec3 ) const;							// exact compare, no epsilon
////	bool			Compare( /*const idVec3 &a*/a:idVec3, const float epsilon ) const;		// compare with epsilon
////	bool			operator==(	/*const idVec3 &a*/a:idVec3 ) const;						// exact compare, no epsilon
////	bool			operator!=(	/*const idVec3 &a*/a:idVec3 ) const;						// exact compare, no epsilon

////	bool			FixDegenerateNormal( );	// fix degenerate axial cases
////	bool			FixDenormals( );			// change tiny numbers to zero

////	idVec3			Cross( /*const idVec3 &a*/a:idVec3 ) const;
////	idVec3 &		Cross( /*const idVec3 &a*/a:idVec3, const idVec3 &b );
////	float			Length( ) const;
////	float			LengthSqr( ) const;
////	float			LengthFast( ) const;
////	float			Normalize( );				// returns length
////	float			NormalizeFast( );			// returns length
////	idVec3 &		Truncate( float length );		// cap length
////	void			Clamp( const idVec3 &min, const idVec3 &max );
////	void			Snap( );					// snap to closest integer value
////	void			SnapInt( );				// snap towards integer (floor)

////	int				GetDimension( ) const;

////	float			ToYaw( ) const;
////	float			ToPitch( ) const;
////	idAngles		ToAngles( ) const;
////	idPolar3		ToPolar( ) const;
////	idMat3			ToMat3( ) const;		// vector should be normalized
////	const idVec2 &	ToVec2( ) const;
////	idVec2 &		ToVec2( );
////	const float *	ToFloatPtr( ) const;
////	float *			ToFloatPtr( );
////	const char *	ToString( int precision = 2 ) const;

////	void			NormalVectors( idVec3 &left, idVec3 &down ) const;	// vector should be normalized
////	void			OrthogonalBasis( idVec3 &left, idVec3 &up ) const;

////	void			ProjectOntoPlane( const idVec3 &normal, const float overBounce = 1.0 );
////	bool			ProjectAlongPlane( const idVec3 &normal, const float epsilon, const float overBounce = 1.0 );
////	void			ProjectSelfOntoSphere( const float radius );

////	void			Lerp( const idVec3 &v1, const idVec3 &v2, const float l );
////	void			SLerp( const idVec3 &v1, const idVec3 &v2, const float l );

////extern idVec3 vec3_origin;
////#define vec3_zero vec3_origin

////ID_INLINE idVec3::idVec3( ) {
////}

////ID_INLINE idVec3::idVec3( const float x, const float y, const float z ) {
////	this.x = x;
////	this.y = y;
////	this.z = z;
////}
	[index: number]: number;

////ID_INLINE float idVec3::operator[]( const int index ) const {
////	return ( &x )[ index ];
////}

////ID_INLINE float &idVec3::operator[]( const int index ) {
////	return ( &x )[ index ];
////}

	Set ( /*const float */x: number, /*const float */y: number, /*const float */z: number ) {
		this.x = x;
		this.y = y;
		this.z = z;
	}

	Zero ( ): void {
		this.x = this.y = this.z = 0.0;
	}

	opUnaryMinus ( ): idVec3 {
		return new idVec3( -this.x, -this.y, -this.z );
	}

////ID_INLINE idVec3 &idVec3::operator=( /*const idVec3 &a*/a:idVec3 ) {
////	x = a.x;
////	y = a.y;
////	 this.z = a.z;
////	return this
////}

	opSubtraction ( a: idVec3 ): idVec3 {
		return new idVec3( this.x - a.x, this.y - a.y, this.z - a.z );
	}


	timesVec ( a: idVec3 ): /*float*/number {
		return this.x * a.x + this.y * a.y + this.z * a.z;
	}

	timesFloat ( /*const float */a: number ): idVec3 {
		return new idVec3( this.x * a, this.y * a, this.z * a );
	}

	opDivision ( /*const float */a: number ): idVec3 {
		var /*float*/ inva = 1.0 / a;
		return new idVec3( this.x * inva, this.y * inva, this.z * inva );
	}

	/*operator**/
	static times ( /*const float */a: number, b: idVec3 ): idVec3 {
		return new idVec3( b.x * a, b.y * a, b.z * a );
	}

	opAddition ( a: idVec3 ) {
		return new idVec3( this.x + a.x, this.y + a.y, this.z + a.z );
	}

	opEquals ( a: idVec3 ): idVec3 {
		this.x = a.x;
		this.y = a.y;
		this.z = a.z;

		return this;
	}

	/*operator+=*/
	/*AdditionAssignment*/
	opAdditionAssignment ( a: idVec3 ): idVec3 {
		this.x += a.x;
		this.y += a.y;
		this.z += a.z;

		return this;
	}

////ID_INLINE idVec3 &idVec3::operator/=( /*const idVec3 &a*/a:idVec3 ) {
////	this.x /= a.x;
////	this.y /= a.y;
////	this.z /= a.z;

////	return this
////}

	opDivisionAssignment_float ( /*const float */a: number ) {
		var inva = 1.0 / a;
		this.x *= inva;
		this.y *= inva;
		this.z *= inva;

		return this;
	}
	/*-=*/
	opSubtractionAssignment ( a: idVec3 ): idVec3 {
		this.x -= a.x;
		this.y -= a.y;
		this.z -= a.z;

		return this;
	}

	opMultiplicationAssignment ( /*const float */a: number ): idVec3 {
		this.x *= a;
		this.y *= a;
		this.z *= a;

		return this;
	}

	Compare ( a: idVec3 ): boolean {
		return ( ( this.x == a.x ) && ( this.y == a.y ) && ( this.z == a.z ) );
	}

	Compare_epsilon ( a: idVec3, /* float */epsilon: number ): boolean {
		if ( idMath.Fabs( this.x - a.x ) > epsilon ) {
			return false;
		}

		if ( idMath.Fabs( this.y - a.y ) > epsilon ) {
			return false;
		}

		if ( idMath.Fabs( this.z - a.z ) > epsilon ) {
			return false;
		}

		return true;
	}
	//==
	opEqualTo ( a: idVec3 ): boolean {
		return this.Compare( a );
	}
	//!=
	opNotEqualTo ( /*const idVec3 &a*/a: idVec3 ): boolean {
		return !this.Compare( a );
	}

////ID_INLINE float idVec3::NormalizeFast( ) {
////	float sqrLength, invLength;

////	sqrLength = this.x * this.x + this.y * this.y + this.z * this.z;
////	invLength = idMath.RSqrt( sqrLength );
////	x *= invLength;
////	y *= invLength;
////	z *= invLength;
////	return invLength * sqrLength;
////}

	FixDegenerateNormal ( ): boolean {
		if ( this.x == 0.0 ) {
			if ( this.y == 0.0 ) {
				if ( this.z > 0.0 ) {
					if ( this.z != 1.0 ) {
						this.z = 1.0;
						return true;
					}
				} else {
					if ( this.z != -1.0 ) {
						this.z = -1.0;
						return true;
					}
				}
				return false;
			} else if ( this.z == 0.0 ) {
				if ( this.y > 0.0 ) {
					if ( this.y != 1.0 ) {
						this.y = 1.0;
						return true;
					}
				} else {
					if ( this.y != -1.0 ) {
						this.y = -1.0;
						return true;
					}
				}
				return false;
			}
		} else if ( this.y == 0.0 ) {
			if ( this.z == 0.0 ) {
				if ( this.x > 0.0 ) {
					if ( this.x != 1.0 ) {
						this.x = 1.0;
						return true;
					}
				} else {
					if ( this.x != -1.0 ) {
						this.x = -1.0;
						return true;
					}
				}
				return false;
			}
		}
		if ( idMath.Fabs( this.x ) == 1.0 ) {
			if ( this.y != 0.0 || this.z != 0.0 ) {
				this.y = this.z = 0.0;
				return true;
			}
			return false;
		} else if ( idMath.Fabs( this.y ) == 1.0 ) {
			if ( this.x != 0.0 || this.z != 0.0 ) {
				this.x = this.z = 0.0;
				return true;
			}
			return false;
		} else if ( idMath.Fabs( this.z ) == 1.0 ) {
			if ( this.x != 0.0 || this.y != 0.0 ) {
				this.x = this.y = 0.0;
				return true;
			}
			return false;
		}
		return false;
	}

////ID_INLINE bool idVec3::FixDenormals( ) {
////	bool denormal = false;
////	if ( fabs( this.x ) < 1e-30f ) {
////		x = 0.0;
////		denormal = true;
////	}
////	if ( fabs( this.y ) < 1e-30f ) {
////		y = 0.0;
////		denormal = true;
////	}
////	if ( fabs( this.z ) < 1e-30f ) {
////		z = 0.0;
////		denormal = true;
////	}
////	return denormal;
////}

	Cross ( a: idVec3 ): idVec3 {
		return new idVec3( this.y * a.z - this.z * a.y, this.z * a.x - this.x * a.z, this.x * a.y - this.y * a.x );
	}

	Cross_2 ( /*const idVec3 &a*/a: idVec3, b: idVec3 ): idVec3 {
		this.x = a.y * b.z - a.z * b.y;
		this.y = a.z * b.x - a.x * b.z;
		this.z = a.x * b.y - a.y * b.x;

		return this;
	}

/*float */
	Length ( ): number {
		return /*( float )*/idMath.Sqrt( this.x * this.x + this.y * this.y + this.z * this.z );
	}

////ID_INLINE float idVec3::LengthSqr( ) const {
////	return ( this.x * this.x + this.y * this.y + this.z * this.z );
////}

	LengthFast ( ): number {
		var /*float */sqrLength: number;

		sqrLength = this.x * this.x + this.y * this.y + this.z * this.z;
		return sqrLength * idMath.RSqrt( sqrLength );
	}

	Normalize ( ): number {
		var /*float*/sqrLength: number, invLength: number;

		sqrLength = this.x * this.x + this.y * this.y + this.z * this.z;
		invLength = idMath.InvSqrt( sqrLength );
		this.x *= invLength;
		this.y *= invLength;
		this.z *= invLength;
		return invLength * sqrLength;
	}

////ID_INLINE idVec3 &idVec3::Truncate( float length ) {
////	float length2;
////	float ilength;

////	if ( !length ) {
////		Zero();
////	}
////	else {
////		length2 = LengthSqr();
////		if ( length2 > length * length ) {
////			ilength = length * idMath.InvSqrt( length2 );
////			x *= ilength;
////			y *= ilength;
////			z *= ilength;
////		}
////	}

////	return this
////}

////ID_INLINE void idVec3::Clamp( const idVec3 &min, const idVec3 &max ) {
////	if ( this.x < min.x ) {
////		x = min.x;
////	} else if ( this.x > max.x ) {
////		x = max.x;
////	}
////	if ( this.y < min.y ) {
////		y = min.y;
////	} else if ( this.y > max.y ) {
////		y = max.y;
////	}
////	if ( this.z < min.z ) {
////		z = min.z;
////	} else if ( this.z > max.z ) {
////		z = max.z;
////	}
////}

////ID_INLINE void idVec3::Snap( ) {
////	x = floor( this.x + 0.5 );
////	y = floor( this.y + 0.5 );
////	z = floor( this.z + 0.5 );
////}

////ID_INLINE void idVec3::SnapInt( ) {
////	x = float( int( this.x ) );
////	y = float( int( this.y ) );
////	z = float( int( this.z ) );
////}

	GetDimension ( ): number {
		return 3;
	}

////ID_INLINE const idVec2 &idVec3::ToVec2( ) const {
////	return *reinterpret_cast<const idVec2 *>(this);
////}

////ID_INLINE idVec2 &idVec3::ToVec2( ) {
////	return *reinterpret_cast<idVec2 *>(this);
////}

	ToFloatPtr ( ): Float32Array {
		//return <Float32Array><any>this;
		return this.values;
	}

////ID_INLINE float *idVec3::ToFloatPtr( ) {
////	return &x;
////}

////ID_INLINE void idVec3::NormalVectors( idVec3 &left, idVec3 &down ) const {
////	float d;

////	d = this.x * this.x + this.y * this.y;
////	if ( !d ) {
////		left[0] = 1;
////		left[1] = 0;
////		left[2] = 0;
////	} else {
////		d = idMath.InvSqrt( d );
////		left[0] = -y * d;
////		left[1] = this.x * d;
////		left[2] = 0;
////	}
////	down = left.Cross( *this );
////}

////ID_INLINE void idVec3::OrthogonalBasis( idVec3 &left, idVec3 &up ) const {
////	float l, s;

////	if ( idMath.Fabs( this.z ) > 0.7f ) {
////		l = this.y * this.y + this.z * this.z;
////		s = idMath.InvSqrt( l );
////		up[0] = 0;
////		up[1] = this.z * s;
////		up[2] = -y * s;
////		left[0] = l * s;
////		left[1] = -x * up[2];
////		left[2] = this.x * up[1];
////	}
////	else {
////		l = this.x * this.x + this.y * this.y;
////		s = idMath.InvSqrt( l );
////		left[0] = -y * s;
////		left[1] = this.x * s;
////		left[2] = 0;
////		up[0] = -z * left[1];
////		up[1] = this.z * left[0];
////		up[2] = l * s;
////	}
////}

////ID_INLINE void idVec3::ProjectOntoPlane( const idVec3 &normal, const float overBounce ) {
////	float backoff;

////	backoff = *this * normal;

////	if ( overBounce != 1.0 ) {
////		if ( backoff < 0 ) {
////			backoff *= overBounce;
////		} else {
////			backoff /= overBounce;
////		}
////	}

////	*this -= backoff * normal;
////}

////ID_INLINE bool idVec3::ProjectAlongPlane( const idVec3 &normal, const float epsilon, const float overBounce ) {
////	idVec3 cross;
////	float len;

////	cross = this.Cross( normal ).Cross( (*this) );
////	// normalize so a fixed epsilon can be used
////	cross.Normalize();
////	len = normal * cross;
////	if ( idMath.Fabs( len ) < epsilon ) {
////		return false;
////	}
////	cross *= overBounce * ( normal * (*this) ) / len;
////	(*this) -= cross;
////	return true;
////}

	ToString ( precision = 2 ): string {
		if ( arguments.length == 2 ) {
			return idStr.FloatArrayToString( this.ToFloatPtr ( ), this.GetDimension ( ), precision );
		}

		return va( "x: %4.2f, y: %4.2f, z:%4.2f", this.x, this.y, this.z );
	}

/////*
////=============
////idVec3::ToYaw
////=============
////*/
////float idVec3::ToYaw( ) const {
////	float yaw;

////	if ( ( y == 0.0 ) && ( this.x == 0.0 ) ) {
////		yaw = 0.0;
////	} else {
////		yaw = RAD2DEG( atan2( y, this.x ) );
////		if ( yaw < 0.0 ) {
////			yaw += 360.0;
////		}
////	}

////	return yaw;
////}

/////*
////=============
////idVec3::ToPitch
////=============
////*/
////float idVec3::ToPitch( ) const {
////	float	forward;
////	float	pitch;

////	if ( ( this.x == 0.0 ) && ( y == 0.0 ) ) {
////		if ( z > 0.0 ) {
////			pitch = 90.0;
////		} else {
////			pitch = 270.0;
////		}
////	} else {
////		forward = ( float )idMath::Sqrt( this.x * this.x + y * y );
////		pitch = RAD2DEG( atan2( z, forward ) );
////		if ( pitch < 0.0 ) {
////			pitch += 360.0;
////		}
////	}

////	return pitch;
////}

/////*
////=============
////idVec3::ToAngles
////=============
////*/
////idAngles idVec3::ToAngles( ) const {
////	float forward;
////	float yaw;
////	float pitch;

////	if ( ( this.x == 0.0 ) && ( y == 0.0 ) ) {
////		yaw = 0.0;
////		if ( z > 0.0 ) {
////			pitch = 90.0;
////		} else {
////			pitch = 270.0;
////		}
////	} else {
////		yaw = RAD2DEG( atan2( y, this.x ) );
////		if ( yaw < 0.0 ) {
////			yaw += 360.0;
////		}

////		forward = ( float )idMath::Sqrt( this.x * this.x + y * y );
////		pitch = RAD2DEG( atan2( z, forward ) );
////		if ( pitch < 0.0 ) {
////			pitch += 360.0;
////		}
////	}

////	return idAngles( -pitch, yaw, 0.0 );
////}

/////*
////=============
////idVec3::ToPolar
////=============
////*/
////idPolar3 idVec3::ToPolar( ) const {
////	float forward;
////	float yaw;
////	float pitch;

////	if ( ( this.x == 0.0 ) && ( y == 0.0 ) ) {
////		yaw = 0.0;
////		if ( z > 0.0 ) {
////			pitch = 90.0;
////		} else {
////			pitch = 270.0;
////		}
////	} else {
////		yaw = RAD2DEG( atan2( y, this.x ) );
////		if ( yaw < 0.0 ) {
////			yaw += 360.0;
////		}

////		forward = ( float )idMath::Sqrt( this.x * this.x + y * y );
////		pitch = RAD2DEG( atan2( z, forward ) );
////		if ( pitch < 0.0 ) {
////			pitch += 360.0;
////		}
////	}
////	return idPolar3( idMath::Sqrt( this.x * this.x + y * y + z * z ), yaw, -pitch );
////}

/*
=============
idVec3::ToMat3
=============
*/
	ToMat3 ( ): idMat3 {
		var mat = new idMat3;
		var /*float	*/d: number;

		mat[0].opEquals( this );
		d = this.x * this.x + this.y * this.y;
		if ( !d ) {
			mat[1][0] = 1.0;
			mat[1][1] = 0.0;
			mat[1][2] = 0.0;
		} else {
			d = idMath.InvSqrt( d );
			mat[1][0] = -this.y * d;
			mat[1][1] = this.x * d;
			mat[1][2] = 0.0;
		}
		mat[2] = this.Cross( mat[1] );

		return mat;
	}

/////*
////=============
////Lerp

////Linearly inperpolates one vector to another.
////=============
////*/
////void idVec3::Lerp( const idVec3 &v1, const idVec3 &v2, const float l ) {
////	if ( l <= 0.0 ) {
////		(*this) = v1;
////	} else if ( l >= 1.0 ) {
////		(*this) = v2;
////	} else {
////		(*this) = v1 + l * ( v2 - v1 );
////	}
////}

/////*
////=============
////SLerp

////Spherical linear interpolation from v1 to v2.
////Vectors are expected to be normalized.
////=============
////*/
////#define LERP_DELTA 1e-6

////void idVec3::SLerp( const idVec3 &v1, const idVec3 &v2, const float t ) {
////	float omega, cosom, sinom, scale0, scale1;

////	if ( t <= 0.0 ) {
////		(*this) = v1;
////		return;
////	} else if ( t >= 1.0 ) {
////		(*this) = v2;
////		return;
////	}

////	cosom = v1 * v2;
////	if ( ( 1.0 - cosom ) > LERP_DELTA ) {
////		omega = acos( cosom );
////		sinom = sin( omega );
////		scale0 = sin( ( 1.0 - t ) * omega ) / sinom;
////		scale1 = sin( t * omega ) / sinom;
////	} else {
////		scale0 = 1.0 - t;
////		scale1 = t;
////	}

////	(*this) = ( v1 * scale0 + v2 * scale1 );
////}

/*
=============
ProjectSelfOntoSphere

Projects the z component onto a sphere.
=============
*/
	ProjectSelfOntoSphere ( /*float */radius: number ): void {
		var /*float */rsqr = radius * radius;
		var /*float */len = this.Length ( );
		if ( len < rsqr * 0.5 ) {
			this.z = sqrt( rsqr - len );
		} else {
			this.z = rsqr / ( 2.0 * sqrt( len ) );
		}
	}



	// from call to Matrix.h to keep syntax similar
	opMultiplicationAssignment_mat3 ( mat: idMat3 ): idVec3 {
		return idMat3.opMultiplicationAssignment_vec3_mat3( this, mat );
	}

	valueOf ( ): number {
		todoThrow( "error: implicity idVec3 valueOf called" );
		return NaN;
	}
}

// todo: maybe it should extend Float32Array. underlying values can be changed by swapping the buffer?
Object.defineProperty(idVec3.prototype, "0", {
	get: function (): number {
		return this.values[0];
	},
	set: function (value: number): void {
		if (value === undefined) {
			throw 'Undefined value';
		}
		if (typeof value !== "number") {
			throw 'must be number type';
		}
		this.x = value;
	},
	enumerable: false,
	configurable: false
});

Object.defineProperty(idVec3.prototype, "1", {
	get: function (): number {
		return this.values[1];
	},
	set: function (value: number): void {
		if (value === undefined) {
			throw 'Undefined value';
		}
		if (typeof value !== "number") {
			throw 'must be number type';
		}
		this.y = value;
	},
	enumerable: false,
	configurable: false
});

Object.defineProperty(idVec3.prototype, "2", {
	get: function (): number {
		return this.values[2];
	},
	set: function (value: number): void {
		if (value === undefined) {
			throw 'Undefined value';
		}
		if (typeof value !== "number") {
			throw 'must be number type';
		}
		this.z = value;
	},
	enumerable: false,
	configurable: false
});


//===============================================================
//
//	idVec4 - 4D vector
//
//===============================================================

class idVec4 {
//public:	
	///*float			*/x:number; 
	///*float			*/y:number;
	///*float			*/z:number;
	///*float			*/w:number;

	values: Float32Array;

	get x(): number { return this.values[0]; }

	set x(value: number) {
		if (value === undefined) {
			throw 'Undefined value';
		}
		this.values[0] = value;
	}

	get y(): number { return this.values[1]; }

	set y(value: number) {
		if (value === undefined) {
			throw 'Undefined value';
		}
		this.values[1] = value;
	}

	get z(): number { return this.values[2]; }

	set z(value: number) {
		if (value === undefined) {
			throw 'Undefined value';
		}
		this.values[2] = value;
	}

	get w(): number { return this.values[3]; }

	set w(value: number) {
		if (value === undefined) {
			throw 'Undefined value';
		}
		this.values[3] = value;
	}

	constructor()
	constructor(array: Float32Array)
	constructor(x: number, y: number, z: number, w:number)
	constructor(xOrArray?: any, y?: number, z?: number, w?: number) {
		if (!(xOrArray instanceof Float32Array)) {
			this.values = new Float32Array(4);
			this.x = xOrArray || 0.0;
			this.y = y || 0.0;
			this.z = z || 0.0;
			this.w = w || 0.0;
		} else {
			this.values = xOrArray;
		}
	}

	opEquals ( other: idVec4 ) {
		this.x = other.x;
		this.y = other.y;
		this.z = other.z;
		this.w = other.w;
	}

////					idVec4( );
////					explicit idVec4( const float x, const float y, const float z, const float w );

////	void 			Set( const float x, const float y, const float z, const float w );
////	void			Zero( );

////	float			operator[]( const int index ) const;
////	float &			operator[]( const int index );
////	idVec4			operator-() const;
////	float			operator*( const idVec4 &a ) const;
////	idVec4			operator*( /*const float */a :number ) const;
////	idVec4			operator/( /*const float */a :number ) const;
////	idVec4			operator+( const idVec4 &a ) const;
////	idVec4			operator-( const idVec4 &a ) const;
////	idVec4 &		operator+=( const idVec4 &a );
////	idVec4 &		operator-=( const idVec4 &a );
////	idVec4 &		operator/=( const idVec4 &a );
////	idVec4 &		operator/=( /*const float */a :number );
////	idVec4 &		operator*=( /*const float */a :number );

////	friend idVec4	operator*( /*const float */a :number, const idVec4 b );

////	bool			Compare( const idVec4 &a ) const;							// exact compare, no epsilon
////	bool			Compare( const idVec4 &a, const float epsilon ) const;		// compare with epsilon
////	bool			operator==(	const idVec4 &a ) const;						// exact compare, no epsilon
////	bool			operator!=(	const idVec4 &a ) const;						// exact compare, no epsilon

////	float			Length( ) const;
////	float			LengthSqr( ) const;
////	float			Normalize( );			// returns length
////	float			NormalizeFast( );		// returns length

////	int				GetDimension( ) const;

////	const idVec2 &	ToVec2( ) const;
////	idVec2 &		ToVec2( );
////	const idVec3 &	ToVec3( ) const;
////	idVec3 &		ToVec3( );
////	const float *	ToFloatPtr( ) const;
////	float *			ToFloatPtr( );
////	const char *	ToString( int precision = 2 ) const;

////	void			Lerp( const idVec4 &v1, const idVec4 &v2, const float l );
////};

////extern idVec4 vec4_origin;
////#define vec4_zero vec4_origin

////ID_INLINE idVec4::idVec4( ) {
////}

////ID_INLINE idVec4::idVec4( const float x, const float y, const float z, const float w ) {
////	this.x = x;
////	this.y = y;
////	this.z = z;
////	this.w = w;
////}

	Set ( /*const float */x: number, /*const float */y: number, /*const float */z: number, /*const float */w: number ): void {
		this.x = x;
		this.y = y;
		this.z = z;
		this.w = w;
	}

	Zero ( ): void {
		this.x = this.y = this.z = this.w = 0.0;
	}

	[index: number]: number;
////ID_INLINE float idVec4::operator[]( int index ) const {
////	return ( &x )[ index ];
////}

////ID_INLINE float& idVec4::operator[]( int index ) {
////	return ( &x )[ index ];
////}

////ID_INLINE idVec4 idVec4::operator-() const {
////	return idVec4( -x, -this.y, -z, -w );
////}

////ID_INLINE idVec4 idVec4::operator-( const idVec4 &a ) const {
////	return idVec4( x - a.x, y - a.y, z - a.z, w - a.w );
////}

////ID_INLINE float idVec4::operator*( const idVec4 &a ) const {
////	return x * a.x + this.y * a.y + z * a.z + w * a.w;
////}

////ID_INLINE idVec4 idVec4::operator*( /*const float */a :number ) const {
////	return idVec4( x * a, this.y * a, z * a, w * a );
////}

////ID_INLINE idVec4 idVec4::operator/( /*const float */a :number ) const {
////	float inva = 1.0 / a;
////	return idVec4( x * inva, this.y * inva, z * inva, w * inva );
////}

////ID_INLINE idVec4 operator*( /*const float */a :number, const idVec4 b ) {
////	return idVec4( b.x * a, b.y * a, b.z * a, b.w * a );
////}

//ID_INLINE idVec4 idVec4::operator+( const idVec4 &a ) const {
//	return idVec4( x + a.x, this.y + a.y, z + a.z, w + a.w );
//}

////ID_INLINE idVec4 &idVec4::operator+=( const idVec4 &a ) {
////	x += a.x;
////	this.y += a.y;
////	z += a.z;
////	w += a.w;

////	return this
////}

////ID_INLINE idVec4 &idVec4::operator/=( const idVec4 &a ) {
////	x /= a.x;
////	this.y /= a.y;
////	z /= a.z;
////	w /= a.w;

////	return this
////}

////ID_INLINE idVec4 &idVec4::operator/=( /*const float */a :number ) {
////	float inva = 1.0 / a;
////	x *= inva;
////	this.y *= inva;
////	z *= inva;
////	w *= inva;

////	return this
////}

////ID_INLINE idVec4 &idVec4::operator-=( const idVec4 &a ) {
////	x -= a.x;
////	this.y -= a.y;
////	z -= a.z;
////	w -= a.w;

////	return this
////}

////ID_INLINE idVec4 &idVec4::operator*=( /*const float */a :number ) {
////	x *= a;
////	this.y *= a;
////	z *= a;
////	w *= a;

////	return this
////}

////ID_INLINE bool idVec4::Compare( const idVec4 &a ) const {
////	return ( ( x == a.x ) && ( this.y == a.y ) && ( z == a.z ) && w == a.w );
////}

////ID_INLINE bool idVec4::Compare( const idVec4 &a, const float epsilon ) const {
////	if ( idMath.Fabs( x - a.x ) > epsilon ) {
////		return false;
////	}
			
////	if ( idMath.Fabs( this.y - a.y ) > epsilon ) {
////		return false;
////	}

////	if ( idMath.Fabs( z - a.z ) > epsilon ) {
////		return false;
////	}

////	if ( idMath.Fabs( w - a.w ) > epsilon ) {
////		return false;
////	}

////	return true;
////}

////ID_INLINE bool idVec4::operator==( const idVec4 &a ) const {
////	return this.Compare( a );
////}

////ID_INLINE bool idVec4::operator!=( const idVec4 &a ) const {
////	return !this.Compare( a );
////}

////ID_INLINE float idVec4::Length( ) const {
////	return ( float )idMath::Sqrt( x * x + this.y * this.y + z * z + w * w );
////}

////ID_INLINE float idVec4::LengthSqr( ) const {
////	return ( x * x + this.y * this.y + z * z + w * w );
////}

////ID_INLINE float idVec4::Normalize( ) {
////	float sqrLength, invLength;

////	sqrLength = x * x + this.y * this.y + z * z + w * w;
////	invLength = idMath.InvSqrt( sqrLength );
////	x *= invLength;
////	this.y *= invLength;
////	z *= invLength;
////	w *= invLength;
////	return invLength * sqrLength;
////}

////ID_INLINE float idVec4::NormalizeFast( ) {
////	float sqrLength, invLength;

////	sqrLength = x * x + this.y * this.y + z * z + w * w;
////	invLength = idMath.RSqrt( sqrLength );
////	x *= invLength;
////	this.y *= invLength;
////	z *= invLength;
////	w *= invLength;
////	return invLength * sqrLength;
////}

	GetDimension ( ): number {
		return 4;
	}

////ID_INLINE const idVec2 &idVec4::ToVec2( ) const {
////	return *reinterpret_cast<const idVec2 *>(this);
////}

	/*ID_INLINE idVec2 &idVec4::*/ToVec2(): idVec2 {
		return new idVec2( this.x, this.y ); //*reinterpret_cast<idVec2 *>(this);
	}

////ID_INLINE const idVec3 &idVec4::ToVec3( ) const {
////	return *reinterpret_cast<const idVec3 *>(this);
////}

/*ID_INLINE idVec3 &idVec4::*/
	ToVec3 ( ): idVec3 {
		return new idVec3( this.x, this.y, this.z ); //*reinterpret_cast<idVec3 *>(this);
	}

////ID_INLINE const float *idVec4::ToFloatPtr( ) const {
////	return &x;
////}

	ToFloatPtr ( ): Float32Array {
		return this.values;
	}


/*
=============
idVec4::ToString
=============
*/
	ToString ( precision = 2 ): string {
		return idStr.FloatArrayToString(this.ToFloatPtr(), this.GetDimension ( ), precision );
	}

/////*
////=============
////Lerp

////Linearly inperpolates one vector to another.
////=============
////*/
////void idVec4::Lerp( const idVec4 &v1, const idVec4 &v2, const float l ) {
////	if ( l <= 0.0 ) {
////		(*this) = v1;
////	} else if ( l >= 1.0 ) {
////		(*this) = v2;
////	} else {
////		(*this) = v1 + l * ( v2 - v1 );
////	}
////}
}

Object.defineProperty(idVec4.prototype, "0", {
	get: function (): number {
		return this.values[0];
	},
	set: function (value: number): void {
		if (value === undefined) {
			throw 'Undefined value';
		}
		if (typeof value !== "number") {
			throw 'must be number type';
		}
		this.x = value;
	},
	enumerable: false,
	configurable: false
});

Object.defineProperty(idVec4.prototype, "1", {
	get: function (): number {
		return this.values[1];
	},
	set: function (value: number): void {
		if (value === undefined) {
			throw 'Undefined value';
		}
		if (typeof value !== "number") {
			throw 'must be number type';
		}
		this.y = value;
	},
	enumerable: false,
	configurable: false
});

Object.defineProperty(idVec4.prototype, "2", {
	get: function (): number {
		return this.values[2];
	},
	set: function (value: number): void {
		if (value === undefined) {
			throw 'Undefined value';
		}
		if (typeof value !== "number") {
			throw 'must be number type';
		}
		this.z = value;
	},
	enumerable: false,
	configurable: false
});

Object.defineProperty(idVec4.prototype, "3", {
	get: function (): number {
		return this.values[3];
	},
	set: function (value: number): void {
		if (value === undefined) {
			throw 'Undefined value';
		}
		if (typeof value !== "number") {
			throw 'must be number type';
		}
		this.w = value;
	},
	enumerable: false,
	configurable: false
});

//===============================================================
//
//	idVec5 - 5D vector
//
//===============================================================

class idVec5 {
//public:
	//x: number; //	float			
	//y: number; //	float			
	//z: number; //	float			
	//s: number; //	float			
	//t: number; //	float	
	
	values = new Float32Array(5);
		
	get x ( ): number { return this.values[0]; }

	set x ( value: number ) {
		if ( value === undefined ) {
			throw 'Undefined value';
		}
		this.values[0] = value;
	}

	get y(): number { return this.values[1]; }

	set y ( value: number ) {
		if ( value === undefined ) {
			throw 'Undefined value';
		}
		this.values[1] = value;
	}

	get z ( ): number { return this.values[2]; }

	set z ( value: number ) {
		if ( value === undefined ) {
			throw 'Undefined value';
		}
		this.values[2] = value;
	}

	get s ( ): number { return this.values[3]; }

	set s ( value: number ) {
		if ( value === undefined ) {
			throw 'Undefined value';
		}
		this.values[3] = value;
	}

	get t ( ): number { return this.values[4]; }

	set t ( value: number ) {
		if ( value === undefined ) {
			throw 'Undefined value';
		}
		this.values[4] = value;
	}

////					idVec5( );
////					explicit idVec5( const idVec3 &xyz, const idVec2 &st );
////					explicit idVec5( const float x, const float y, const float z, const float s, const float t );

////	float			operator[]( int index ) const;
////	float &			operator[]( int index );
////	idVec5 &		operator=( /*const idVec3 &a*/a:idVec3 );

////	int				GetDimension( ) const;

////	const idVec3 &	ToVec3( ) const;
////	idVec3 &		ToVec3( );
////	const float *	ToFloatPtr( ) const;
////	float *			ToFloatPtr( );
////	const char *	ToString( int precision = 2 ) const;

////	void			Lerp( const idVec5 &v1, const idVec5 &v2, const float l );
////};

////extern idVec5 vec5_origin;
////#define vec5_zero vec5_origin

////ID_INLINE idVec5::idVec5( ) {
////}

	static fromVec3 ( vec3: idVec3 ): idVec5 {
		var vec5 = new idVec5 ( );
		vec5.values = vec3.values;
		return vec5;
	}

	constructor ( )
	constructor ( xyz: idVec3, st: idVec2 )
	constructor ( x: number, y: number, z: number, s: number, t: number )
	constructor ( xyz_x?: any, st_y?: any, z?: number, s?: number, t?: number ) {
		if ( arguments.length == 2 ) {
			this.constructor_fromVectors( <idVec3>xyz_x, <idVec2> st_y );
		} else if ( arguments.length == 5 ) {
			this.constructor_fromFloats( xyz_x, st_y, z, s, t );
		}
	}

	constructor_fromVectors ( xyz: idVec3, st: idVec2 ): void {
		this.x = xyz.x;
		this.y = xyz.y;
		this.z = xyz.z;
		this.s = st[0];
		this.t = st[1];
	}

	constructor_fromFloats ( x: number, y: number, z: number, s: number, t: number ): void {
		this.x = x;
		this.y = y;
		this.z = z;
		this.s = s;
		this.t = t;
	}


	[index: number]: number;
////ID_INLINE float idVec5::operator[]( int index ) const {
////	return ( &x )[ index ];
////}

////ID_INLINE float& idVec5::operator[]( int index ) {
////	return ( &x )[ index ];
////}

////ID_INLINE idVec5 &idVec5::operator=( /*const idVec3 &a*/a:idVec3 ) { 
	opEquals ( other: idVec5 ): idVec5
	opEquals ( other: idVec3 ): idVec5
	opEquals ( other: any ): idVec5 {
		this.x = other.x;
		this.y = other.y;
		this.z = other.z;

		if ( other instanceof idVec3 ) {
			this.s = other.s;
			this.t = other.t;
		} else if ( other instanceof idVec5 ) {
			this.s = this.t = 0;
		}

		return this;
	}

////ID_INLINE int idVec5::GetDimension( ) const {
////	return 5;
////}

////ID_INLINE const idVec3 &idVec5::ToVec3( ) const {
////	return *reinterpret_cast<const idVec3 *>(this);
////}

	ToVec3 ( ): idVec3 {
		return new idVec3( this.values/*this.x, this.y, this.z */); //return *reinterpret_cast<idVec3 *>(this);
	}

////ID_INLINE const float *idVec5::ToFloatPtr( ) const {
////	return &x;
////}

	ToFloatPtr ( ): Float32Array {
		return this.values;
	}


/////*
////=============
////idVec5::ToString
////=============
////*/
////const char *idVec5::ToString( int precision = 2) const {
////	return idStr.FloatArrayToString( ToFloatPtr(), GetDimension(), precision );
////}

/////*
////=============
////idVec5::Lerp
////=============
////*/
////void idVec5::Lerp( const idVec5 &v1, const idVec5 &v2, const float l ) {
////	if ( l <= 0.0 ) {
////		(*this) = v1;
////	} else if ( l >= 1.0 ) {
////		(*this) = v2;
////	} else {
////		x = v1.x + l * ( v2.x - v1.x );
////		y = v1.y + l * ( v2.y - v1.y );
////		z = v1.z + l * ( v2.z - v1.z );
////		s = v1.s + l * ( v2.s - v1.s );
////		t = v1.t + l * ( v2.t - v1.t );
////	}
////}


}

//===============================================================
//
//	idVec6 - 6D vector
//
//===============================================================

class idVec6 {
////public:	
////					idVec6( );
////					explicit idVec6( const float *a );
////					explicit idVec6( const float a1, const float a2, const float a3, const float a4, const float a5, const float a6 );

////	void 			Set( const float a1, const float a2, const float a3, const float a4, const float a5, const float a6 );
////	void			Zero( );

////	float			operator[]( const int index ) const;
////	float &			operator[]( const int index );
////	idVec6			operator-() const;
////	idVec6			operator*( /*const float */a :number ) const;
////	idVec6			operator/( /*const float */a :number ) const;
////	float			operator*( const idVec6 &a ) const;
////	idVec6			operator-( const idVec6 &a ) const;
////	idVec6			operator+( const idVec6 &a ) const;
////	idVec6 &		operator*=( /*const float */a :number );
////	idVec6 &		operator/=( /*const float */a :number );
////	idVec6 &		operator+=( const idVec6 &a );
////	idVec6 &		operator-=( const idVec6 &a );

////	friend idVec6	operator*( /*const float */a :number, const idVec6 b );

////	bool			Compare( const idVec6 &a ) const;							// exact compare, no epsilon
////	bool			Compare( const idVec6 &a, const float epsilon ) const;		// compare with epsilon
////	bool			operator==(	const idVec6 &a ) const;						// exact compare, no epsilon
////	bool			operator!=(	const idVec6 &a ) const;						// exact compare, no epsilon

////	float			Length( ) const;
////	float			LengthSqr( ) const;
////	float			Normalize( );			// returns length
////	float			NormalizeFast( );		// returns length

////	int				GetDimension( ) const;

////	const idVec3 &	SubVec3( int index ) const;
////	idVec3 &		SubVec3( int index );
////	const float *	ToFloatPtr( ) const;
////	float *			ToFloatPtr( );
////	const char *	ToString( int precision = 2 ) const;

////private:
	p = new Float32Array(6);
////};

////extern idVec6 vec6_origin;
////#define vec6_zero vec6_origin
////extern idVec6 vec6_infinity;

////ID_INLINE idVec6::idVec6( ) {
////}

////ID_INLINE idVec6::idVec6( const float *a ) {
////	memcpy( this.p, a, 6 * sizeof( float ) );
////}

////ID_INLINE idVec6::idVec6( const float a1, const float a2, const float a3, const float a4, const float a5, const float a6 ) {
////	this.p[0] = a1;
////	this.p[1] = a2;
////	this.p[2] = a3;
////	this.p[3] = a4;
////	this.p[4] = a5;
////	this.p[5] = a6;
////}

////ID_INLINE idVec6 idVec6::operator-() const {
////	return idVec6( -this.p[0], -this.p[1], -this.p[2], -this.p[3], -this.p[4], -this.p[5] );
////}

	[index: number]: number;
////ID_INLINE float idVec6::operator[]( const int index ) const {
////	return this.p[index];
////}

////ID_INLINE float &idVec6::operator[]( const int index ) {
////	return this.p[index];
////}

////ID_INLINE idVec6 idVec6::operator*( /*const float */a :number ) const {
////	return idVec6( this.p[0]*a, this.p[1]*a, this.p[2]*a, this.p[3]*a, this.p[4]*a, this.p[5]*a );
////}

////ID_INLINE float idVec6::operator*( const idVec6 &a ) const {
////	return this.p[0] * a[0] + this.p[1] * a[1] + this.p[2] * a[2] + this.p[3] * a[3] + this.p[4] * a[4] + this.p[5] * a[5];
////}

////ID_INLINE idVec6 idVec6::operator/( /*const float */a :number ) const {
////	float inva;

////	assert( a != 0.0 );
////	inva = 1.0 / a;
////	return idVec6( this.p[0]*inva, this.p[1]*inva, this.p[2]*inva, this.p[3]*inva, this.p[4]*inva, this.p[5]*inva );
////}

////ID_INLINE idVec6 idVec6::operator+( const idVec6 &a ) const {
////	return idVec6( this.p[0] + a[0], this.p[1] + a[1], this.p[2] + a[2], this.p[3] + a[3], this.p[4] + a[4], this.p[5] + a[5] );
////}

////ID_INLINE idVec6 idVec6::operator-( const idVec6 &a ) const {
////	return idVec6( this.p[0] - a[0], this.p[1] - a[1], this.p[2] - a[2], this.p[3] - a[3], this.p[4] - a[4], this.p[5] - a[5] );
////}

////ID_INLINE idVec6 &idVec6::operator*=( /*const float */a :number ) {
////	this.p[0] *= a;
////	this.p[1] *= a;
////	this.p[2] *= a;
////	this.p[3] *= a;
////	this.p[4] *= a;
////	this.p[5] *= a;
////	return this
////}

////ID_INLINE idVec6 &idVec6::operator/=( /*const float */a :number ) {
////	float inva;

////	assert( a != 0.0 );
////	inva = 1.0 / a;
////	this.p[0] *= inva;
////	this.p[1] *= inva;
////	this.p[2] *= inva;
////	this.p[3] *= inva;
////	this.p[4] *= inva;
////	this.p[5] *= inva;
////	return this
////}

////ID_INLINE idVec6 &idVec6::operator+=( const idVec6 &a ) {
////	this.p[0] += a[0];
////	this.p[1] += a[1];
////	this.p[2] += a[2];
////	this.p[3] += a[3];
////	this.p[4] += a[4];
////	this.p[5] += a[5];
////	return this
////}

////ID_INLINE idVec6 &idVec6::operator-=( const idVec6 &a ) {
////	this.p[0] -= a[0];
////	this.p[1] -= a[1];
////	this.p[2] -= a[2];
////	this.p[3] -= a[3];
////	this.p[4] -= a[4];
////	this.p[5] -= a[5];
////	return this
////}

////ID_INLINE idVec6 operator*( /*const float */a :number, const idVec6 b ) {
////	return b * a;
////}

////ID_INLINE bool idVec6::Compare( const idVec6 &a ) const {
////	return ( ( this.p[0] == a[0] ) && ( this.p[1] == a[1] ) && ( this.p[2] == a[2] ) &&
////			( this.p[3] == a[3] ) && ( this.p[4] == a[4] ) && ( this.p[5] == a[5] ) );
////}

////ID_INLINE bool idVec6::Compare( const idVec6 &a, const float epsilon ) const {
////	if ( idMath.Fabs( this.p[0] - a[0] ) > epsilon ) {
////		return false;
////	}
			
////	if ( idMath.Fabs( this.p[1] - a[1] ) > epsilon ) {
////		return false;
////	}

////	if ( idMath.Fabs( this.p[2] - a[2] ) > epsilon ) {
////		return false;
////	}

////	if ( idMath.Fabs( this.p[3] - a[3] ) > epsilon ) {
////		return false;
////	}

////	if ( idMath.Fabs( this.p[4] - a[4] ) > epsilon ) {
////		return false;
////	}

////	if ( idMath.Fabs( this.p[5] - a[5] ) > epsilon ) {
////		return false;
////	}

////	return true;
////}

////ID_INLINE bool idVec6::operator==( const idVec6 &a ) const {
////	return this.Compare( a );
////}

////ID_INLINE bool idVec6::operator!=( const idVec6 &a ) const {
////	return !this.Compare( a );
////}

////ID_INLINE void idVec6::Set( const float a1, const float a2, const float a3, const float a4, const float a5, const float a6 ) {
////	this.p[0] = a1;
////	this.p[1] = a2;
////	this.p[2] = a3;
////	this.p[3] = a4;
////	this.p[4] = a5;
////	this.p[5] = a6;
////}

	Zero ( ): void {
		this.p[0] = this.p[1] = this.p[2] = this.p[3] = this.p[4] = this.p[5] = 0.0;
	}

////ID_INLINE float idVec6::Length( ) const {
////	return ( float )idMath::Sqrt( this.p[0] * this.p[0] + this.p[1] * this.p[1] + this.p[2] * this.p[2] + this.p[3] * this.p[3] + this.p[4] * this.p[4] + this.p[5] * this.p[5] );
////}

////ID_INLINE float idVec6::LengthSqr( ) const {
////	return ( this.p[0] * this.p[0] + this.p[1] * this.p[1] + this.p[2] * this.p[2] + this.p[3] * this.p[3] + this.p[4] * this.p[4] + this.p[5] * this.p[5] );
////}

////ID_INLINE float idVec6::Normalize( ) {
////	float sqrLength, invLength;

////	sqrLength = this.p[0] * this.p[0] + this.p[1] * this.p[1] + this.p[2] * this.p[2] + this.p[3] * this.p[3] + this.p[4] * this.p[4] + this.p[5] * this.p[5];
////	invLength = idMath.InvSqrt( sqrLength );
////	this.p[0] *= invLength;
////	this.p[1] *= invLength;
////	this.p[2] *= invLength;
////	this.p[3] *= invLength;
////	this.p[4] *= invLength;
////	this.p[5] *= invLength;
////	return invLength * sqrLength;
////}

////ID_INLINE float idVec6::NormalizeFast( ) {
////	float sqrLength, invLength;

////	sqrLength = this.p[0] * this.p[0] + this.p[1] * this.p[1] + this.p[2] * this.p[2] + this.p[3] * this.p[3] + this.p[4] * this.p[4] + this.p[5] * this.p[5];
////	invLength = idMath.RSqrt( sqrLength );
////	this.p[0] *= invLength;
////	this.p[1] *= invLength;
////	this.p[2] *= invLength;
////	this.p[3] *= invLength;
////	this.p[4] *= invLength;
////	this.p[5] *= invLength;
////	return invLength * sqrLength;
////}

////ID_INLINE int idVec6::GetDimension( ) const {
////	return 6;
////}

////ID_INLINE const idVec3 &idVec6::SubVec3( int index ) const {
////	return *reinterpret_cast<const idVec3 *>(this.p + index * 3);
////}

////ID_INLINE idVec3 &idVec6::SubVec3( int index ) {
////	return *reinterpret_cast<idVec3 *>(this.p + index * 3);
////}

////ID_INLINE const float *idVec6::ToFloatPtr( ) const {
////	return this.p;
////}

////ID_INLINE float *idVec6::ToFloatPtr( ) {
////	return this.p;
////}

/////*
////=============
////idVec6::ToString
////=============
////*/
////const char *idVec6::ToString( int precision = 2) const {
////	return idStr.FloatArrayToString( ToFloatPtr(), GetDimension(), precision );
////}

}


//////===============================================================
//////
//////	idVecX - arbitrary sized vector
//////
//////  The vector lives on 16 byte aligned and 16 byte padded memory.
//////
//////	NOTE: due to the temporary memory pool idVecX cannot be used by multiple threads
//////
//////===============================================================

////float	idVecX::temp[VECX_MAX_TEMP+4];
////float *	idVecX::tempPtr = (float *) ( ( (int) idVecX::temp + 15 ) & ~15 );
////int		idVecX::tempIndex = 0;

////#define VECX_MAX_TEMP		1024
////#define VECX_QUAD( x )		( ( ( ( x ) + 3 ) & ~3 ) * sizeof( float ) )
////#define VECX_CLEAREND()		int s = size; while( s < ( ( s + 3) & ~3 ) ) { this.p[s++] = 0.0; }
////#define VECX_ALLOCA( n )	( (float *) _alloca16( VECX_QUAD( n ) ) )
////#define VECX_SIMD

////class idVecX {
////	friend class idMatX;

////public:	
////					idVecX( );
////					explicit idVecX( int length );
////					explicit idVecX( int length, float *data );
////					~idVecX( );

////	float			operator[]( const int index ) const;
////	float &			operator[]( const int index );
////	idVecX			operator-() const;
////	idVecX &		operator=( const idVecX &a );
////	idVecX			operator*( /*const float */a :number ) const;
////	idVecX			operator/( /*const float */a :number ) const;
////	float			operator*( const idVecX &a ) const;
////	idVecX			operator-( const idVecX &a ) const;
////	idVecX			operator+( const idVecX &a ) const;
////	idVecX &		operator*=( /*const float */a :number );
////	idVecX &		operator/=( /*const float */a :number );
////	idVecX &		operator+=( const idVecX &a );
////	idVecX &		operator-=( const idVecX &a );

////	friend idVecX	operator*( /*const float */a :number, const idVecX b );

////	bool			Compare( const idVecX &a ) const;							// exact compare, no epsilon
////	bool			Compare( const idVecX &a, const float epsilon ) const;		// compare with epsilon
////	bool			operator==(	const idVecX &a ) const;						// exact compare, no epsilon
////	bool			operator!=(	const idVecX &a ) const;						// exact compare, no epsilon

////	void			SetSize( int size );
////	void			ChangeSize( int size, bool makeZero = false );
////	int				GetSize( ) const { return size; }
////	void			SetData( int length, float *data );
////	void			Zero( );
////	void			Zero( int length );
////	void			Random( int seed, float l = 0.0, float u = 1.0 );
////	void			Random( int length, int seed, float l = 0.0, float u = 1.0 );
////	void			Negate( );
////	void			Clamp( float min, float max );
////	idVecX &		SwapElements( int e1, int e2 );

////	float			Length( ) const;
////	float			LengthSqr( ) const;
////	idVecX			Normalize( ) const;
////	float			NormalizeSelf( );

////	int				GetDimension( ) const;

////	const idVec3 &	SubVec3( int index ) const;
////	idVec3 &		SubVec3( int index );
////	const idVec6 &	SubVec6( int index ) const;
////	idVec6 &		SubVec6( int index );
////	const float *	ToFloatPtr( ) const;
////	float *			ToFloatPtr( );
////	const char *	ToString( int precision = 2 ) const;

////private:
////	int				size;					// size of the vector
////	int				alloced;				// if -1 p points to data set with SetData
////	float *			p;						// memory the vector is stored

////	static float	temp[VECX_MAX_TEMP+4];	// used to store intermediate results
////	static float *	tempPtr;				// pointer to 16 byte aligned temporary memory
////	static int		tempIndex;				// index into memory pool, wraps around

////private:
////	void			SetTempSize( int size );
////};


////ID_INLINE idVecX::idVecX( ) {
////	size = alloced = 0;
////	p = NULL;
////}

////ID_INLINE idVecX::idVecX( int length ) {
////	size = alloced = 0;
////	p = NULL;
////	SetSize( length );
////}

////ID_INLINE idVecX::idVecX( int length, float *data ) {
////	size = alloced = 0;
////	p = NULL;
////	SetData( length, data );
////}

////ID_INLINE idVecX::~idVecX( ) {
////	// if not temp memory
////	if ( p && ( p < idVecX::tempPtr || p >= idVecX::tempPtr + VECX_MAX_TEMP ) && alloced != -1 ) {
////		Mem_Free16( p );
////	}
////}

	//[index: number]: number;
////ID_INLINE float idVecX::operator[]( const int index ) const {
////	assert( index >= 0 && index < size );
////	return p[index];
////}

////ID_INLINE float &idVecX::operator[]( const int index ) {
////	assert( index >= 0 && index < size );
////	return p[index];
////}

////ID_INLINE idVecX idVecX::operator-() const {
////	var/*int*/i:number;
////	idVecX m;

////	m.SetTempSize( size );
////	for ( i = 0; i < size; i++ ) {
////		m.p[i] = -p[i];
////	}
////	return m;
////}

////ID_INLINE idVecX &idVecX::operator=( const idVecX &a ) { 
////	SetSize( a.size );
////#ifdef VECX_SIMD
////	SIMDProcessor.Copy16( p, a.p, a.size );
////#else
////	memcpy( p, a.p, a.size * sizeof( float ) );
////#endif
////	idVecX::tempIndex = 0;
////	return this
////}

////ID_INLINE idVecX idVecX::operator+( const idVecX &a ) const {
////	idVecX m;

////	assert( size == a.size );
////	m.SetTempSize( size );
////#ifdef VECX_SIMD
////	SIMDProcessor.Add16( m.p, p, a.p, size );
////#else
////	var/*int*/i:number;
////	for ( i = 0; i < size; i++ ) {
////		m.p[i] = p[i] + a.p[i];
////	}
////#endif
////	return m;
////}

////ID_INLINE idVecX idVecX::operator-( const idVecX &a ) const {
////	idVecX m;

////	assert( size == a.size );
////	m.SetTempSize( size );
////#ifdef VECX_SIMD
////	SIMDProcessor.Sub16( m.p, p, a.p, size );
////#else
////	var/*int*/i:number;
////	for ( i = 0; i < size; i++ ) {
////		m.p[i] = p[i] - a.p[i];
////	}
////#endif
////	return m;
////}

////ID_INLINE idVecX &idVecX::operator+=( const idVecX &a ) {
////	assert( size == a.size );
////#ifdef VECX_SIMD
////	SIMDProcessor.AddAssign16( p, a.p, size );
////#else
////	var/*int*/i:number;
////	for ( i = 0; i < size; i++ ) {
////		p[i] += a.p[i];
////	}
////#endif
////	idVecX::tempIndex = 0;
////	return this
////}

////ID_INLINE idVecX &idVecX::operator-=( const idVecX &a ) {
////	assert( size == a.size );
////#ifdef VECX_SIMD
////	SIMDProcessor.SubAssign16( p, a.p, size );
////#else
////	var/*int*/i:number;
////	for ( i = 0; i < size; i++ ) {
////		p[i] -= a.p[i];
////	}
////#endif
////	idVecX::tempIndex = 0;
////	return this;
////}

////ID_INLINE idVecX idVecX::operator*( /*const float */a :number ) const {
////	idVecX m;

////	m.SetTempSize( size );
////#ifdef VECX_SIMD
////	SIMDProcessor.Mul16( m.p, p, a, size );
////#else
////	var/*int*/i:number;
////	for ( i = 0; i < size; i++ ) {
////		m.p[i] = p[i] * a;
////	}
////#endif
////	return m;
////}

////ID_INLINE idVecX &idVecX::operator*=( /*const float */a :number ) {
////#ifdef VECX_SIMD
////	SIMDProcessor.MulAssign16( p, a, size );
////#else
////	var/*int*/i:number;
////	for ( i = 0; i < size; i++ ) {
////		p[i] *= a;
////	}
////#endif
////	return this;
////}

////ID_INLINE idVecX idVecX::operator/( /*const float */a :number ) const {
////	assert( a != 0.0 );
////	return (*this) * ( 1.0 / a );
////}

////ID_INLINE idVecX &idVecX::operator/=( /*const float */a :number ) {
////	assert( a != 0.0 );
////	(*this) *= ( 1.0 / a );
////	return this;
////}

////ID_INLINE idVecX operator*( /*const float */a :number, const idVecX b ) {
////	return b * a;
////}

////ID_INLINE float idVecX::operator*( const idVecX &a ) const {
////	var/*int*/i:number;
////	float sum = 0.0;

////	assert( size == a.size );
////	for ( i = 0; i < size; i++ ) {
////		sum += p[i] * a.p[i];
////	}
////	return sum;
////}

////ID_INLINE bool idVecX::Compare( const idVecX &a ) const {
////	var/*int*/i:number;

////	assert( size == a.size );
////	for ( i = 0; i < size; i++ ) {
////		if ( p[i] != a.p[i] ) {
////			return false;
////		}
////	}
////	return true;
////}

////ID_INLINE bool idVecX::Compare( const idVecX &a, const float epsilon ) const {
////	var/*int*/i:number;

////	assert( size == a.size );
////	for ( i = 0; i < size; i++ ) {
////		if ( idMath.Fabs( p[i] - a.p[i] ) > epsilon ) {
////			return false;
////		}
////	}
////	return true;
////}

////ID_INLINE bool idVecX::operator==( const idVecX &a ) const {
////	return this.Compare( a );
////}

////ID_INLINE bool idVecX::operator!=( const idVecX &a ) const {
////	return !this.Compare( a );
////}

////ID_INLINE void idVecX::SetSize( int newSize ) {
////	int alloc = ( newSize + 3 ) & ~3;
////	if ( alloc > alloced && alloced != -1 ) {
////		if ( p ) {
////			Mem_Free16( p );
////		}
////		p = (float *) Mem_Alloc16( alloc * sizeof( float ) );
////		alloced = alloc;
////	}
////	size = newSize;
////	VECX_CLEAREND();
////}

////ID_INLINE void idVecX::ChangeSize( int newSize, bool makeZero ) {
////	int alloc = ( newSize + 3 ) & ~3;
////	if ( alloc > alloced && alloced != -1 ) {
////		float *oldVec = p;
////		p = (float *) Mem_Alloc16( alloc * sizeof( float ) );
////		alloced = alloc;
////		if ( oldVec ) {
////			for ( int i = 0; i < size; i++ ) {
////				p[i] = oldVec[i];
////			}
////			Mem_Free16( oldVec );
////		}
////		if ( makeZero ) {
////			// zero any new elements
////			for ( int i = size; i < newSize; i++ ) {
////				p[i] = 0.0;
////			}
////		}
////	}
////	size = newSize;
////	VECX_CLEAREND();
////}

////ID_INLINE void idVecX::SetTempSize( int newSize ) {

////	size = newSize;
////	alloced = ( newSize + 3 ) & ~3;
////	assert( alloced < VECX_MAX_TEMP );
////	if ( idVecX::tempIndex + alloced > VECX_MAX_TEMP ) {
////		idVecX::tempIndex = 0;
////	}
////	p = idVecX::tempPtr + idVecX::tempIndex;
////	idVecX::tempIndex += alloced;
////	VECX_CLEAREND();
////}

////ID_INLINE void idVecX::SetData( int length, float *data ) {
////	if ( p && ( p < idVecX::tempPtr || p >= idVecX::tempPtr + VECX_MAX_TEMP ) && alloced != -1 ) {
////		Mem_Free16( p );
////	}
////	assert( ( ( (int) data ) & 15 ) == 0 ); // data must be 16 byte aligned
////	p = data;
////	size = length;
////	alloced = -1;
////	VECX_CLEAREND();
////}

////ID_INLINE void idVecX::Zero( ) {
////#ifdef VECX_SIMD
////	SIMDProcessor.Zero16( p, size );
////#else
////	memset( p, 0, size * sizeof( float ) );
////#endif
////}

////ID_INLINE void idVecX::Zero( int length ) {
////	SetSize( length );
////#ifdef VECX_SIMD
////	SIMDProcessor.Zero16( p, length );
////#else
////	memset( p, 0, size * sizeof( float ) );
////#endif
////}

////ID_INLINE void idVecX::Random( int seed, float l, float u ) {
////	var/*int*/i:number;
////	float c;
////	idRandom rnd( seed );

////	c = u - l;
////	for ( i = 0; i < size; i++ ) {
////		p[i] = l + rnd.RandomFloat() * c;
////	}
////}

////ID_INLINE void idVecX::Random( int length, int seed, float l, float u ) {
////	var/*int*/i:number;
////	float c;
////	idRandom rnd( seed );

////	SetSize( length );
////	c = u - l;
////	for ( i = 0; i < size; i++ ) {
////		p[i] = l + rnd.RandomFloat() * c;
////	}
////}

////ID_INLINE void idVecX::Negate( ) {
////#ifdef VECX_SIMD
////	SIMDProcessor.Negate16( p, size );
////#else
////	var/*int*/i:number;
////	for ( i = 0; i < size; i++ ) {
////		p[i] = -p[i];
////	}
////#endif
////}

////ID_INLINE void idVecX::Clamp( float min, float max ) {
////	var/*int*/i:number;
////	for ( i = 0; i < size; i++ ) {
////		if ( p[i] < min ) {
////			p[i] = min;
////		} else if ( p[i] > max ) {
////			p[i] = max;
////		}
////	}
////}

////ID_INLINE idVecX &idVecX::SwapElements( int e1, int e2 ) {
////	float tmp;
////	tmp = p[e1];
////	p[e1] = p[e2];
////	p[e2] = tmp;
////	return this;
////}

////ID_INLINE float idVecX::Length( ) const {
////	var/*int*/i:number;
////	float sum = 0.0;

////	for ( i = 0; i < size; i++ ) {
////		sum += p[i] * p[i];
////	}
////	return idMath::Sqrt( sum );
////}

////ID_INLINE float idVecX::LengthSqr( ) const {
////	var/*int*/i:number;
////	float sum = 0.0;

////	for ( i = 0; i < size; i++ ) {
////		sum += p[i] * p[i];
////	}
////	return sum;
////}

////ID_INLINE idVecX idVecX::Normalize( ) const {
////	var/*int*/i:number;
////	idVecX m;
////	float invSqrt, sum = 0.0;

////	m.SetTempSize( size );
////	for ( i = 0; i < size; i++ ) {
////		sum += p[i] * p[i];
////	}
////	invSqrt = idMath.InvSqrt( sum );
////	for ( i = 0; i < size; i++ ) {
////		m.p[i] = p[i] * invSqrt;
////	}
////	return m;
////}

////ID_INLINE float idVecX::NormalizeSelf( ) {
////	float invSqrt, sum = 0.0;
////	var/*int*/i:number;
////	for ( i = 0; i < size; i++ ) {
////		sum += p[i] * p[i];
////	}
////	invSqrt = idMath.InvSqrt( sum );
////	for ( i = 0; i < size; i++ ) {
////		p[i] *= invSqrt;
////	}
////	return invSqrt * sum;
////}

////ID_INLINE int idVecX::GetDimension( ) const {
////	return size;
////}

////ID_INLINE idVec3 &idVecX::SubVec3( int index ) {
////	assert( index >= 0 && index * 3 + 3 <= size );
////	return *reinterpret_cast<idVec3 *>(p + index * 3);
////}

////ID_INLINE const idVec3 &idVecX::SubVec3( int index ) const {
////	assert( index >= 0 && index * 3 + 3 <= size );
////	return *reinterpret_cast<const idVec3 *>(p + index * 3);
////}

////ID_INLINE idVec6 &idVecX::SubVec6( int index ) {
////	assert( index >= 0 && index * 6 + 6 <= size );
////	return *reinterpret_cast<idVec6 *>(p + index * 6);
////}

////ID_INLINE const idVec6 &idVecX::SubVec6( int index ) const {
////	assert( index >= 0 && index * 6 + 6 <= size );
////	return *reinterpret_cast<const idVec6 *>(p + index * 6);
////}

////ID_INLINE const float *idVecX::ToFloatPtr( ) const {
////	return p;
////}

////ID_INLINE float *idVecX::ToFloatPtr( ) {
////	return p;
////}

/////*
////=============
////idVecX::ToString
////=============
////*/
////const char *idVecX::ToString( int precision = 2) const {
////	return idStr.FloatArrayToString( ToFloatPtr(), GetDimension(), precision );
////}



//////===============================================================
//////
//////	idPolar3
//////
//////===============================================================

////class idPolar3 {
////public:	
////	float			radius, theta, phi;

////					idPolar3( );
////					explicit idPolar3( const float radius, const float theta, const float phi );

////	void 			Set( const float radius, const float theta, const float phi );

////	float			operator[]( const int index ) const;
////	float &			operator[]( const int index );
////	idPolar3		operator-() const;
////	idPolar3 &		operator=( const idPolar3 &a );

////	idVec3			ToVec3( ) const;
////};

////ID_INLINE idPolar3::idPolar3( ) {
////}

////ID_INLINE idPolar3::idPolar3( const float radius, const float theta, const float phi ) {
////	assert( radius > 0 );
////	this.radius = radius;
////	this.theta = theta;
////	this.phi = phi;
////}
	
////ID_INLINE void idPolar3::Set( const float radius, const float theta, const float phi ) {
////	assert( radius > 0 );
////	this.radius = radius;
////	this.theta = theta;
////	this.phi = phi;
////}

	//[index: number]: number;
////ID_INLINE float idPolar3::operator[]( const int index ) const {
////	return ( &radius )[ index ];
////}

////ID_INLINE float &idPolar3::operator[]( const int index ) {
////	return ( &radius )[ index ];
////}

////ID_INLINE idPolar3 idPolar3::operator-() const {
////	return idPolar3( radius, -theta, -phi );
////}

////ID_INLINE idPolar3 &idPolar3::operator=( const idPolar3 &a ) { 
////	radius = a.radius;
////	theta = a.theta;
////	phi = a.phi;
////	return this;
////}

////ID_INLINE idVec3 idPolar3::ToVec3( ) const {
////	float sp, cp, st, ct;
////	idMath::SinCos( phi, sp, cp );
////	idMath::SinCos( theta, st, ct );
//// 	return idVec3( cp * radius * ct, cp * radius * st, radius * sp );
////}


/*
===============================================================================

	Old 3D vector macros, should no longer be used.

===============================================================================
*/

function DotProduct ( a: any, b: any ): number { return ( ( a )[0] * ( b )[0] + ( a )[1] * ( b )[1] + ( a )[2] * ( b )[2] ); }
function VectorSubtract(a: any, b: any, c: any): void { ((c)[0] = (a)[0] - (b)[0], (c)[1] = (a)[1] - (b)[1], (c)[2] = (a)[2] - (b)[2]); }
function VectorAdd(a: any, b: any, c: any): void { ((c)[0] = (a)[0] + (b)[0], (c)[1] = (a)[1] + (b)[1], (c)[2] = (a)[2] + (b)[2]); }
function VectorScale(v: any, s: any, o: any): void { ((o)[0] = (v)[0] * (s), (o)[1] = (v)[1] * (s), (o)[2] = (v)[2] * (s)); }
function VectorMA(v: any, s: any, b: any, o: any): void { ((o)[0] = (v)[0] + (b)[0] * (s), (o)[1] = (v)[1] + (b)[1] * (s), (o)[2] = (v)[2] + (b)[2] * (s)); }
function VectorCopy(a: any, b: any): void { ((b)[0] = (a)[0], (b)[1] = (a)[1], (b)[2] = (a)[2]); }


////#endif /* !__MATH_VECTOR_H__ */






var vec2_origin = new idVec2( 0.0, 0.0 );
var vec3_origin = new idVec3( 0.0, 0.0, 0.0 );
var vec4_origin = new idVec4(0.0, 0.0, 0.0, 0.0);
var vec5_origin = new idVec5(0.0, 0.0, 0.0, 0.0, 0.0);
//var vec6_origin = new idVec6( 0.0, 0.0, 0.0, 0.0, 0.0, 0.0 );
//var vec6_infinity = new idVec6( idMath.INFINITY, idMath.INFINITY, idMath.INFINITY, idMath.INFINITY, idMath.INFINITY, idMath.INFINITY );



var vec2_zero = vec2_origin;
var vec3_zero = vec3_origin;
var vec4_zero = vec4_origin;
var vec5_zero = vec5_origin;
//var vec6_zero = vec6_origin;
