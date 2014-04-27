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
////#ifndef __MATH_EXTRAPOLATE_H__
////#define __MATH_EXTRAPOLATE_H__
////
/*
==============================================================================================

	Extrapolation

==============================================================================================
*/

enum extrapolation_t{
	EXTRAPOLATION_NONE			= 0x01,	// no extrapolation, covered distance = duration * 0.001 * ( baseSpeed )
	EXTRAPOLATION_LINEAR		= 0x02,	// linear extrapolation, covered distance = duration * 0.001 * ( baseSpeed + speed )
	EXTRAPOLATION_ACCELLINEAR	= 0x04,	// linear acceleration, covered distance = duration * 0.001 * ( baseSpeed + 0.5 * speed )
	EXTRAPOLATION_DECELLINEAR	= 0x08,	// linear deceleration, covered distance = duration * 0.001 * ( baseSpeed + 0.5 * speed )
	EXTRAPOLATION_ACCELSINE		= 0x10,	// sinusoidal acceleration, covered distance = duration * 0.001 * ( baseSpeed + sqrt( 0.5 ) * speed )
	EXTRAPOLATION_DECELSINE		= 0x20,	// sinusoidal deceleration, covered distance = duration * 0.001 * ( baseSpeed + sqrt( 0.5 ) * speed )
	EXTRAPOLATION_NOSTOP		= 0x40	// do not stop at startTime + duration
};
////
//////template< class type >
class idExtrapolate<type> {
////public:
////						idExtrapolate();
////
////	void				Init( const float startTime, const float duration, const type &startValue, const type &baseSpeed, const type &speed, const extrapolation_t extrapolationType );
////	type				GetCurrentValue( float time ) const;
////	type				GetCurrentSpeed( float time ) const;
	//IsDone( float time ) :boolean { return ( !( this.extrapolationType & extrapolation_t.EXTRAPOLATION_NOSTOP ) && time >= startTime + duration ); }
	SetStartTime( /*float*/ time:number ) :void{ this.startTime = time; this.currentTime = -1; }
	GetStartTime( ) :number/*float*/  { return this.startTime; }
	GetEndTime( ) :number/*float*/  { return ( !( this.extrapolationType & extrapolation_t.EXTRAPOLATION_NOSTOP ) && this.duration > 0 ) ? this.startTime + this.duration : 0; }
	GetDuration( ) :number/*float*/ { return this.duration; }
	SetStartValue(value: type): void { this.startValue = value; this.currentTime = -1; }
	GetStartValue( ) :type { return this.startValue; }
	GetBaseSpeed( ) :type { return this.baseSpeed; }
	GetSpeed( ) :type { return this.speed; }
	GetExtrapolationType( ) :extrapolation_t { return this.extrapolationType; }

////private:
	extrapolationType:extrapolation_t;
	startTime :number/*float*/;
	duration :number/*float*/;
	startValue:any/*type*/;
	baseSpeed:any/*type*/;
	speed:any/*type*/;
	currentTime :number/*mutable float*/;
	currentValue: any/*type*/;

	type:any
////};

/*
====================
idExtrapolate::idExtrapolate
====================
*/
//template< class type >
	constructor(type: any) {
		assert( type != Number );
		this.type = type;
		this.extrapolationType = extrapolation_t.EXTRAPOLATION_NONE;
		this.startTime = this.duration = 0.0;
		this.startValue = new type;
		this.baseSpeed = new type;
		this.speed = new type;
		this.startValue.memset0 ( );
		this.baseSpeed.memset0();
		this.speed.memset0();
		this.currentTime = -1;
		this.currentValue = new type;
		this.currentValue.opEquals( this.startValue );
	}

/*
====================
idExtrapolate::Init
====================
*/
//template< class type >
	Init ( /*float */startTime: number, /*float */duration: number, startValue: type, baseSpeed: type, speed: type, extrapolationType: extrapolation_t ) {
		this.extrapolationType = extrapolationType;
		this.startTime = startTime;
		this.duration = duration;
		this.startValue.opEquals( startValue );
		this.baseSpeed.opEquals( baseSpeed );
		this.speed.opEquals( speed );
		this.currentTime = -1;
		this.currentValue.opEquals( startValue );
	}

/*
====================
idExtrapolate::GetCurrentValue
====================
*/
//template< class type >
	GetCurrentValue ( /*float*/ time: number ): type {
		var /*float */deltaTime: number, s: number;

		if ( time == this.currentTime ) {
			return this.currentValue;
		}
		this.currentTime = time;

		if ( time < this.startTime ) {
			return this.startValue;
		}

		if ( !( this.extrapolationType & extrapolation_t.EXTRAPOLATION_NOSTOP ) && ( time > this.startTime + this.duration ) ) {
			time = this.startTime + this.duration;
		}

		switch ( this.extrapolationType & ~extrapolation_t.EXTRAPOLATION_NOSTOP ) {
		case extrapolation_t.EXTRAPOLATION_NONE:
		{
			deltaTime = ( time - this.startTime ) * 0.001;
			this.currentValue.opEquals( this.startValue.opAddition( idVec3.opMultiplication_float_vec3( deltaTime, this.baseSpeed ) ) );
			break;
		}
		case extrapolation_t.EXTRAPOLATION_LINEAR:
		{
			todoThrow ( );
			//deltaTime = ( time - this.startTime ) * 0.001;
			//this.currentValue.opEquals( this.startValue +  deltaTime * ( this.baseSpeed + this.speed ));
			//break;
		}
		case extrapolation_t.EXTRAPOLATION_ACCELLINEAR:
		{
			todoThrow();
			//if ( !this.duration ) {
			//	this.currentValue.opEquals(this.startValue);
			//} else {
			//	deltaTime = ( time - this.startTime ) / this.duration;
			//	s = ( 0.5 * deltaTime * deltaTime ) * ( this.duration * 0.001 );
			//	this.currentValue.opEquals( this.startValue + deltaTime * this.baseSpeed + s * this.speed;
			//}
			break;
		}
		case extrapolation_t.EXTRAPOLATION_DECELLINEAR:
		{
			todoThrow();
			//if ( !this.duration ) {
			//	this.currentValue.opEquals( this.startValue);
			//} else {
			//	deltaTime = ( time - this.startTime ) / this.duration;
			//	s = ( deltaTime - ( 0.5 * deltaTime * deltaTime ) ) * ( this.duration * 0.001 );
			//	this.currentValue.opEquals( this.startValue + deltaTime * this.baseSpeed + s * this.speed);
			//}
			break;
		}
		case extrapolation_t.EXTRAPOLATION_ACCELSINE:
		{
			todoThrow();
			//if ( !this.duration ) {
			//	this.currentValue.opEquals(this.startValue);
			//} else {
			//	deltaTime = ( time - this.startTime ) / this.duration;
			//	s = ( 1.0 - idMath.Cos( deltaTime * idMath.HALF_PI ) ) * this.duration * 0.001 * idMath.SQRT_1OVER2;
			//	this.currentValue.opEquals( this.startValue + deltaTime * this.baseSpeed + s * this.speed;
			//}
			break;
		}
		case extrapolation_t.EXTRAPOLATION_DECELSINE:
		{
			todoThrow();
			//if ( !this.duration ) {
			//	this.currentValue.opEquals(this.startValue);
			//} else {
			//	deltaTime = ( time - this.startTime ) / this.duration;
			//	s = idMath.Sin( deltaTime * idMath.HALF_PI ) * this.duration * 0.001 * idMath.SQRT_1OVER2;
			//	this.currentValue.opEquals( this.startValue + deltaTime * this.baseSpeed + s * this.speed;
			//}
			break;
		}
		}
		return this.currentValue;
	}

/////*
////====================
////idExtrapolate::GetCurrentSpeed
////====================
////*/
//////template< class type >
////ID_INLINE type idExtrapolate<type>::GetCurrentSpeed( float time ) const {
////	float deltaTime, s;
////
////	if ( time < this.startTime || !this.duration ) {
////		return ( this.startValue - this.startValue );
////	}
////
////	if ( !( this.extrapolationType &	extrapolation_t.EXTRAPOLATION_NOSTOP ) && ( time > this.startTime + this.duration ) ) {
////		return ( this.startValue - this.startValue );
////	}
////
////	switch( this.extrapolationType & ~extrapolation_t.EXTRAPOLATION_NOSTOP ) {
////		case extrapolation_t.EXTRAPOLATION_NONE: {
////			return this.baseSpeed;
////		}
////		case extrapolation_t.EXTRAPOLATION_LINEAR: {
////			return this.baseSpeed + this.speed;
////		}
////		case extrapolation_t.EXTRAPOLATION_ACCELLINEAR: {
////			deltaTime = ( time - this.startTime ) / this.duration;
////			s = deltaTime;
////			return this.baseSpeed + s * this.speed;
////		}
////		case extrapolation_t.EXTRAPOLATION_DECELLINEAR: {
////			deltaTime = ( time - this.startTime ) / this.duration;
////			s = 1.0 - deltaTime;
////			return this.baseSpeed + s * this.speed;
////		}
////		case extrapolation_t.EXTRAPOLATION_ACCELSINE: {
////			deltaTime = ( time - this.startTime ) / this.duration;
////			s = idMath.Sin( deltaTime * idMath.HALF_PI );
////			return this.baseSpeed + s * this.speed;
////		}
////		case extrapolation_t.EXTRAPOLATION_DECELSINE: {
////			deltaTime = ( time - this.startTime ) / this.duration;
////			s = idMath.Cos( deltaTime * idMath.HALF_PI );
////			return this.baseSpeed + s * this.speed;
////		}
////		default: {
////			return this.baseSpeed;
////		}
////	}
////}
////
////#endif /* !__MATH_EXTRAPOLATE_H__ */
}








//////template< class type >
class idExtrapolate_Number {
////public:
////						idExtrapolate();
////
////	void				Init( const float startTime, const float duration, const type &startValue, const type &baseSpeed, const type &speed, const extrapolation_t extrapolationType );
////	type				GetCurrentValue( float time ) const;
////	type				GetCurrentSpeed( float time ) const;
////	bool				IsDone( float time ) const { return ( !( this.extrapolationType & extrapolation_t.EXTRAPOLATION_NOSTOP ) && time >= startTime + duration ); }
////	void				SetStartTime( /*float*/ time:number ) { this.startTime = time; this.currentTime = -1; }
	GetStartTime ( ): number /*float*/ { return this.startTime; }
	GetEndTime ( ): number /*float*/ { return ( !( this.extrapolationType & extrapolation_t.EXTRAPOLATION_NOSTOP ) && this.duration > 0 ) ? this.startTime + this.duration : 0; }
	GetDuration ( ): number /*float*/ { return this.duration; }
	SetStartValue ( value: number ): void {this.startValue = value;this.currentTime = -1;}
	GetStartValue ( ): number { return this.startValue; }
	GetBaseSpeed ( ): number { return this.baseSpeed; }
	GetSpeed ( ): number { return this.speed; }
	GetExtrapolationType ( ): extrapolation_t { return this.extrapolationType; }

////private:
	extrapolationType: extrapolation_t;
	startTime: number /*float*/;
	duration: number /*float*/;
	startValue: number /*type*/;
	baseSpeed: number /*type*/;
	speed: number /*type*/;
	currentTime: number /*mutable float*/;
	currentValue: number;

	parseMethod: (v: number) => number;
////};

/*
====================
idExtrapolate::idExtrapolate
====================
*/
//template< class type >
	constructor(parseMethod: (v: number) => number) {
		this.parseMethod = parseMethod;
		this.extrapolationType = extrapolation_t.EXTRAPOLATION_NONE;
		this.startTime = this.duration = 0.0;
		this.startValue = 0;
		this.baseSpeed = 0;
		this.speed = 0;
		this.currentTime = -1;
		this.currentValue = this.startValue;
	}

/*
====================
idExtrapolate::Init
====================
*/
//template< class type >
	Init( /*float */startTime: number, /*float */duration: number, startValue: number, baseSpeed: number, speed: number, extrapolationType: extrapolation_t ) {
		this.extrapolationType = extrapolationType;
		this.startTime = startTime;
		this.duration = duration;

		this.startValue = this.parseMethod( startValue );
		this.baseSpeed = this.parseMethod( baseSpeed );
		this.speed = speed;

		this.currentTime = -1;
		this.currentValue = startValue;
	}

/*
====================
idExtrapolate::GetCurrentValue
====================
*/
//template< class type >
	GetCurrentValue ( /*float*/ time: number ): number {
		var /*float */deltaTime: number, s: number;

		if ( time == this.currentTime ) {
			return this.currentValue;
		}
		this.currentTime = this.parseMethod(time);

		if ( time < this.startTime ) {
			return this.startValue;
		}

		if ( !( this.extrapolationType & extrapolation_t.EXTRAPOLATION_NOSTOP ) && ( time > this.startTime + this.duration ) ) {
			time = this.startTime + this.duration;
		}

		switch ( this.extrapolationType & ~extrapolation_t.EXTRAPOLATION_NOSTOP ) {
		case extrapolation_t.EXTRAPOLATION_NONE:
		{
			deltaTime = ( time - this.startTime ) * 0.001;
			this.currentValue = this.parseMethod( this.startValue + deltaTime * this.baseSpeed );
			break;
		}
		case extrapolation_t.EXTRAPOLATION_LINEAR:
		{
			deltaTime = ( time - this.startTime ) * 0.001;
			this.currentValue = this.parseMethod( this.startValue + deltaTime * ( this.baseSpeed + this.speed ) );
			break;
		}
		case extrapolation_t.EXTRAPOLATION_ACCELLINEAR:
		{
			if ( !this.duration ) {
				this.currentValue = this.parseMethod( this.startValue );
			} else {
				deltaTime = ( time - this.startTime ) / this.duration;
				s = ( 0.5 * deltaTime * deltaTime ) * ( this.duration * 0.001 );
				this.currentValue = this.parseMethod( this.startValue + deltaTime * this.baseSpeed + s * this.speed );
			}
			break;
		}
		case extrapolation_t.EXTRAPOLATION_DECELLINEAR:
		{
			if ( !this.duration ) {
				this.currentValue = this.parseMethod( this.startValue );
			} else {
				deltaTime = ( time - this.startTime ) / this.duration;
				s = ( deltaTime - ( 0.5 * deltaTime * deltaTime ) ) * ( this.duration * 0.001 );
				this.currentValue = this.parseMethod( this.startValue + deltaTime * this.baseSpeed + s * this.speed );
			}
			break;
		}
		case extrapolation_t.EXTRAPOLATION_ACCELSINE:
		{
			if ( !this.duration ) {
				this.currentValue = this.parseMethod( this.startValue );
			} else {
				deltaTime = ( time - this.startTime ) / this.duration;
				s = ( 1.0 - idMath.Cos( deltaTime * idMath.HALF_PI ) ) * this.duration * 0.001 * idMath.SQRT_1OVER2;
				this.currentValue = this.parseMethod( this.startValue + deltaTime * this.baseSpeed + s * this.speed );
			}
			break;
		}
		case extrapolation_t.EXTRAPOLATION_DECELSINE:
		{
			if ( !this.duration ) {
				this.currentValue = this.parseMethod( this.startValue );
			} else {
				deltaTime = ( time - this.startTime ) / this.duration;
				s = idMath.Sin( deltaTime * idMath.HALF_PI ) * this.duration * 0.001 * idMath.SQRT_1OVER2;
				this.currentValue = this.parseMethod( this.startValue + deltaTime * this.baseSpeed + s * this.speed );
			}
			break;
		}
		}
		return this.currentValue;
	}

/////*
////====================
////idExtrapolate::GetCurrentSpeed
////====================
////*/
//////template< class type >
////ID_INLINE type idExtrapolate<type>::GetCurrentSpeed( float time ) const {
////	float deltaTime, s;
////
////	if ( time < this.startTime || !this.duration ) {
////		return this.parseMethod( this.startValue - this.startValue );
////	}
////
////	if ( !( this.extrapolationType &	extrapolation_t.EXTRAPOLATION_NOSTOP ) && ( time > this.startTime + this.duration ) ) {
////		return ( this.startValue - this.startValue );
////	}
////
////	switch( this.extrapolationType & ~extrapolation_t.EXTRAPOLATION_NOSTOP ) {
////		case extrapolation_t.EXTRAPOLATION_NONE: {
////			return this.parseMethod(this.baseSpeed;
////		}
////		case extrapolation_t.EXTRAPOLATION_LINEAR: {
////			return this.parseMethod(this.baseSpeed + this.speed;
////		}
////		case extrapolation_t.EXTRAPOLATION_ACCELLINEAR: {
////			deltaTime = ( time - this.startTime ) / this.duration;
////			s = deltaTime;
////			return this.parseMethod(this.baseSpeed + s * this.speed;
////		}
////		case extrapolation_t.EXTRAPOLATION_DECELLINEAR: {
////			deltaTime = ( time - this.startTime ) / this.duration;
////			s = 1.0 - deltaTime;
////			return this.parseMethod(this.baseSpeed + s * this.speed;
////		}
////		case extrapolation_t.EXTRAPOLATION_ACCELSINE: {
////			deltaTime = ( time - this.startTime ) / this.duration;
////			s = idMath.Sin( deltaTime * idMath.HALF_PI );
////			return this.parseMethod(this.baseSpeed + s * this.speed;
////		}
////		case extrapolation_t.EXTRAPOLATION_DECELSINE: {
////			deltaTime = ( time - this.startTime ) / this.duration;
////			s = idMath.Cos( deltaTime * idMath.HALF_PI );
////			return this.parseMethod(this.baseSpeed + s * this.speed;
////		}
////		default: {
////			return this.parseMethod(this.baseSpeed;
////		}
////	}
////}
////
////#endif /* !__MATH_EXTRAPOLATE_H__ */
}