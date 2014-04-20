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
////#ifndef __MATH_INTERPOLATE_H__
////#define __MATH_INTERPOLATE_H__
////
/////*
////==============================================================================================
////
////	Linear interpolation.
////
////==============================================================================================
////*/
////
//////template< class type >
class idInterpolate<type> {
////public:
////						idInterpolate();
////
////	void				Init( const float startTime, const float duration, const type &startValue, const type &endValue );
////	void				SetStartTime( float time ) { this.startTime = time; }
////	void				SetDuration( float duration ) { this.duration = duration; }
////	void				SetStartValue( const type &startValue ) { this.startValue = startValue; }
////	void				SetEndValue( const type &endValue ) { this.endValue = endValue; }
////
////	type				GetCurrentValue( float time ) const;
////	bool				IsDone( float time ) const { return ( time >= startTime + duration ); }
////
////	float				GetStartTime( void ) const { return startTime; }
////	float				GetEndTime( void ) const { return startTime + duration; }
////	float				GetDuration( void ) const { return duration; }
////	const type &		GetStartValue( void ) const { return startValue; }
////	const type &		GetEndValue( void ) const { return endValue; }
////
////private:
	startTime:number/*float*/;
	duration:number/*float*/;
	startValue:type;
	endValue:type;
	currentTime:number/*mutable float*/;
	currentValue:type; //mutable


/*
====================
idInterpolate::idInterpolate
====================
*/
	constructor ( ) {
		this.currentTime = this.startTime = this.duration = 0;
		(<any>this.currentValue).memset0 ( ); // memset( &currentValue, 0, sizeof( currentValue ) );
		this.startValue = this.endValue = this.currentValue;
	}

/*
====================
idInterpolate::Init
====================
*/
	Init ( /*const float*/ startTime: number, /*const float */duration: number, /*const type &*/startValue: type, endValue: type ): void {
		this.startTime = startTime;
		this.duration = duration;
		this.startValue = startValue;
		this.endValue = endValue;
		this.currentTime = startTime - 1;
		this.currentValue = startValue;
	}

/////*
////====================
////idInterpolate::GetCurrentValue
////====================
////*/
//////template< class type >
////ID_INLINE type idInterpolate<type>::GetCurrentValue( float time ) const {
////	float deltaTime;
////
////	deltaTime = time - this.startTime;
////	if ( time != this.currentTime ) {
////		this.currentTime = time;
////		if ( deltaTime <= 0 ) {
////			currentValue = startValue;
////		} else if ( deltaTime >= duration ) {
////			currentValue = this.endValue;
////		} else {
////			currentValue = startValue + ( this.endValue - startValue ) * ( (float) deltaTime / duration );
////		}
////	}
////	return currentValue;
////}
}

////
/////*
////==============================================================================================
////
////	Continuous interpolation with linear acceleration and deceleration phase.
////	The velocity is continuous but the acceleration is not.
////
////==============================================================================================
////*/
////
//////template< class type >
class idInterpolateAccelDecelLinear<type> {
////public:
////						idInterpolateAccelDecelLinear();
////
////	void				Init( const float startTime, const float accelTime, const float decelTime, const float duration, const type &startValue, const type &endValue );
////	void				SetStartTime( float time ) { startTime = time; Invalidate(); }
////	void				SetStartValue( const type &startValue ) { this.startValue = startValue; Invalidate(); }
////	void				SetEndValue( const type &endValue ) { this.endValue = endValue; Invalidate(); }
////
////	type				GetCurrentValue( float time ) const;
////	type				GetCurrentSpeed( float time ) const;
////	bool				IsDone( float time ) const { return ( time >= startTime + accelTime + linearTime + decelTime ); }
////
////	float				GetStartTime( void ) const { return startTime; }
////	float				GetEndTime( void ) const { return startTime + accelTime + linearTime + decelTime; }
////	float				GetDuration( void ) const { return accelTime + linearTime + decelTime; }
////	float				GetAcceleration( void ) const { return accelTime; }
////	float				GetDeceleration( void ) const { return decelTime; }
////	const type &		GetStartValue( void ) const { return startValue; }
////	const type &		GetEndValue( void ) const { return endValue; }
////
////private:
	startTime :number/*float*/;
	accelTime :number/*float*/;
	linearTime :number/*float*/;
	decelTime :number/*float*/;
	startValue:type;
	endValue:type;
	extrapolate: idExtrapolate<type>;//mutable 

	type:any;
////
////	void				Invalidate( void );
////	void				SetPhase( float time ) const;
////};
////
/*
====================
idInterpolateAccelDecelLinear::idInterpolateAccelDecelLinear
====================
*/
//template< class type >
	constructor ( type: any ) {
		this.type = type;
		this.extrapolate = new idExtrapolate<type>( type );
		this.startTime = this.accelTime = this.linearTime = this.decelTime = 0;
		this.startValue = defaultVal(type);
		this.endValue = defaultVal(type);

		if ( type == Number ) {
			this.startValue = <any>0;
			this.endValue = this.startValue;
		} else {
			this.startValue["memset0"] ( );
			this.endValue["opEquals"]( this.startValue );
		}
	}

/*
====================
idInterpolateAccelDecelLinear::Init
====================
*/
//template< class type >
	Init ( /*float */startTime: number, /*float */accelTime: number, /*float */decelTime: number, /*float */duration: number, startValue: type, endValue: type ): void {
		var speed: type;

		this.startTime = startTime;
		this.accelTime = accelTime;
		this.decelTime = decelTime;
		this.startValue = startValue;
		this.endValue = endValue;

		if ( duration <= 0.0 ) {
			return;
		}

		if ( this.accelTime + this.decelTime > duration ) {
			this.accelTime = this.accelTime * duration / ( this.accelTime + this.decelTime );
			this.decelTime = duration - this.accelTime;
		}
		this.linearTime = duration - this.accelTime - this.decelTime;
		if ( this.type == Number ) {
			speed = <any>(<any>( <any>endValue - <any>startValue ) * ( 1000.0 / ( /*(float)*/ this.linearTime + ( this.accelTime + this.decelTime ) * 0.5 ) ));

			if ( this.accelTime ) {
				this.extrapolate.Init(startTime, this.accelTime, <any>startValue, <any>( <any>startValue - <any>startValue ), <any>speed, extrapolation_t.EXTRAPOLATION_ACCELLINEAR );
			} else if ( this.linearTime ) {
				this.extrapolate.Init(startTime, this.linearTime, <any> startValue, <any>( <any>startValue - <any>startValue ), <any>speed, extrapolation_t.EXTRAPOLATION_LINEAR );
			} else {
				this.extrapolate.Init(startTime, this.decelTime, <any> startValue, <any>( <any>startValue - <any> startValue ), <any> speed, extrapolation_t.EXTRAPOLATION_DECELLINEAR );
			}
		} else {
			speed = ( endValue["opSubtraction"]( startValue ) ).opMultiplication( ( 1000.0 / ( /*(float)*/ this.linearTime + ( this.accelTime + this.decelTime ) * 0.5 ) ) );

			if ( this.accelTime ) {
				this.extrapolate.Init( startTime, this.accelTime, <any>startValue, ( <any>startValue["opSubtraction"]( startValue ) ), <any>speed, extrapolation_t.EXTRAPOLATION_ACCELLINEAR );
			} else if ( this.linearTime ) {
				this.extrapolate.Init( startTime, this.linearTime, <any> startValue, ( <any>startValue["opSubtraction"]( startValue ) ), <any>speed, extrapolation_t.EXTRAPOLATION_LINEAR );
			} else {
				this.extrapolate.Init( startTime, this.decelTime, <any> startValue, ( <any>startValue["opSubtraction"]( startValue ) ), <any> speed, extrapolation_t.EXTRAPOLATION_DECELLINEAR );
			}
		}
	}

/////*
////====================
////idInterpolateAccelDecelLinear::Invalidate
////====================
////*/
//////template< class type >
////ID_INLINE void idInterpolateAccelDecelLinear<type>::Invalidate( void ) {
////	this.extrapolate.Init( 0, 0, this.extrapolate.GetStartValue(), this.extrapolate.GetBaseSpeed(), this.extrapolate.GetSpeed(), EXTRAPOLATION_NONE );
////}
////
/////*
////====================
////idInterpolateAccelDecelLinear::SetPhase
////====================
////*/
//////template< class type >
////ID_INLINE void idInterpolateAccelDecelLinear<type>::SetPhase( float time ) const {
////	float deltaTime;
////
////	deltaTime = time - startTime;
////	if ( deltaTime < accelTime ) {
////		if ( this.extrapolate.GetExtrapolationType() != EXTRAPOLATION_ACCELLINEAR ) {
////			this.extrapolate.Init( startTime, accelTime, startValue, this.extrapolate.GetBaseSpeed(), this.extrapolate.GetSpeed(), EXTRAPOLATION_ACCELLINEAR );
////		}
////	} else if ( deltaTime < accelTime + linearTime ) {
////		if ( this.extrapolate.GetExtrapolationType() != EXTRAPOLATION_LINEAR ) {
////			this.extrapolate.Init( startTime + accelTime, linearTime, startValue + this.extrapolate.GetSpeed() * ( accelTime * 0.001f * 0.5f ), this.extrapolate.GetBaseSpeed(), this.extrapolate.GetSpeed(), EXTRAPOLATION_LINEAR );
////		}
////	} else {
////		if ( this.extrapolate.GetExtrapolationType() != EXTRAPOLATION_DECELLINEAR ) {
////			this.extrapolate.Init( startTime + accelTime + linearTime, decelTime, this.endValue - ( this.extrapolate.GetSpeed() * ( decelTime * 0.001f * 0.5f ) ), this.extrapolate.GetBaseSpeed(), this.extrapolate.GetSpeed(), EXTRAPOLATION_DECELLINEAR );
////		}
////	}
////}
////
/////*
////====================
////idInterpolateAccelDecelLinear::GetCurrentValue
////====================
////*/
//////template< class type >
////ID_INLINE type idInterpolateAccelDecelLinear<type>::GetCurrentValue( float time ) const {
////	SetPhase( time );
////	return this.extrapolate.GetCurrentValue( time );
////}
////
/////*
////====================
////idInterpolateAccelDecelLinear::GetCurrentSpeed
////====================
////*/
//////template< class type >
////ID_INLINE type idInterpolateAccelDecelLinear<type>::GetCurrentSpeed( float time ) const {
////	SetPhase( time );
////	return this.extrapolate.GetCurrentSpeed( time );
////}
////
}

/////*
////==============================================================================================
////
////	Continuous interpolation with sinusoidal acceleration and deceleration phase.
////	Both the velocity and acceleration are continuous.
////
////==============================================================================================
////*/
////
//////template< class type >
class idInterpolateAccelDecelSine<type>  {
////public:
////						idInterpolateAccelDecelSine();
////
////	void				Init( const float startTime, const float accelTime, const float decelTime, const float duration, const type &startValue, const type &endValue );
////	void				SetStartTime( float time ) { startTime = time; Invalidate(); }
////	void				SetStartValue( const type &startValue ) { this.startValue = startValue; Invalidate(); }
////	void				SetEndValue( const type &endValue ) { this.endValue = endValue; Invalidate(); }
////
////	type				GetCurrentValue( float time ) const;
////	type				GetCurrentSpeed( float time ) const;
////	bool				IsDone( float time ) const { return ( time >= startTime + accelTime + linearTime + decelTime ); }
////
////	float				GetStartTime( void ) const { return startTime; }
////	float				GetEndTime( void ) const { return startTime + accelTime + linearTime + decelTime; }
////	float				GetDuration( void ) const { return accelTime + linearTime + decelTime; }
////	float				GetAcceleration( void ) const { return accelTime; }
////	float				GetDeceleration( void ) const { return decelTime; }
////	const type &		GetStartValue( void ) const { return startValue; }
////	const type &		GetEndValue( void ) const { return this.endValue; }
////
////private:
	startTime :number/*float*/;
	accelTime :number/*float*/;
	linearTime :number/*float*/;
	decelTime :number/*float*/;
	startValue:type;
	endValue:type;
	extrapolate: idExtrapolate<type>; //mutable

	type:any;
////
////	void				Invalidate( void );
////	void				SetPhase( float time ) const;
////};
////
/*
====================
idInterpolateAccelDecelSine::idInterpolateAccelDecelSine
====================
*/
//template< class type >
	constructor(type: any) {
		this.type = type;
		this.extrapolate = new idExtrapolate<type>( type );

		this.startTime = this.accelTime = this.linearTime = this.decelTime = 0;
		this.startValue = new type;
		this.startValue["memset0"] ( ); //memset(this.startValue, 0, sizeof(this.startValue));
		this.endValue = new type;
		this.endValue["opEquals"]( this.startValue );
	}
////
/////*
////====================
////idInterpolateAccelDecelSine::Init
////====================
////*/
//////template< class type >
////ID_INLINE void idInterpolateAccelDecelSine<type>::Init( const float startTime, const float accelTime, const float decelTime, const float duration, const type &startValue, const type &endValue ) {
////	type speed;
////
////	this.startTime = startTime;
////	this.accelTime = accelTime;
////	this.decelTime = decelTime;
////	this.startValue = startValue;
////	this.endValue = endValue;
////
////	if ( duration <= 0.0 ) {
////		return;
////	}
////
////	if ( this.accelTime + this.decelTime > duration ) {
////		this.accelTime = this.accelTime * duration / ( this.accelTime + this.decelTime );
////		this.decelTime = duration - this.accelTime;
////	}
////	this.linearTime = duration - this.accelTime - this.decelTime;
////	speed = ( this.endValue - startValue ) * ( 1000.0 / ( (float) this.linearTime + ( this.accelTime + this.decelTime ) * idMath::SQRT_1OVER2 ) );
////
////	if ( this.accelTime ) {
////		this.extrapolate.Init( startTime, this.accelTime, startValue, ( startValue - startValue ), speed, EXTRAPOLATION_ACCELSINE );
////	} else if ( this.linearTime ) {
////		this.extrapolate.Init( startTime, this.linearTime, startValue, ( startValue - startValue ), speed, EXTRAPOLATION_LINEAR );
////	} else {
////		this.extrapolate.Init( startTime, this.decelTime, startValue, ( startValue - startValue ), speed, EXTRAPOLATION_DECELSINE );
////	}
////}
////
/////*
////====================
////idInterpolateAccelDecelSine::Invalidate
////====================
////*/
//////template< class type >
////ID_INLINE void idInterpolateAccelDecelSine<type>::Invalidate( void ) {
////	this.extrapolate.Init( 0, 0, this.extrapolate.GetStartValue(), this.extrapolate.GetBaseSpeed(), this.extrapolate.GetSpeed(), EXTRAPOLATION_NONE );
////}
////
/////*
////====================
////idInterpolateAccelDecelSine::SetPhase
////====================
////*/
//////template< class type >
////ID_INLINE void idInterpolateAccelDecelSine<type>::SetPhase( float time ) const {
////	float deltaTime;
////
////	deltaTime = time - startTime;
////	if ( deltaTime < accelTime ) {
////		if ( this.extrapolate.GetExtrapolationType() != EXTRAPOLATION_ACCELSINE ) {
////			this.extrapolate.Init( startTime, accelTime, startValue, this.extrapolate.GetBaseSpeed(), this.extrapolate.GetSpeed(), EXTRAPOLATION_ACCELSINE );
////		}
////	} else if ( deltaTime < accelTime + linearTime ) {
////		if ( this.extrapolate.GetExtrapolationType() != EXTRAPOLATION_LINEAR ) {
////			this.extrapolate.Init( startTime + accelTime, linearTime, startValue + this.extrapolate.GetSpeed() * ( accelTime * 0.001f * idMath::SQRT_1OVER2 ), this.extrapolate.GetBaseSpeed(), this.extrapolate.GetSpeed(), EXTRAPOLATION_LINEAR );
////		}
////	} else {
////		if ( this.extrapolate.GetExtrapolationType() != EXTRAPOLATION_DECELSINE ) {
////			this.extrapolate.Init( startTime + accelTime + linearTime, decelTime, this.endValue - ( this.extrapolate.GetSpeed() * ( decelTime * 0.001f * idMath::SQRT_1OVER2 ) ), this.extrapolate.GetBaseSpeed(), this.extrapolate.GetSpeed(), EXTRAPOLATION_DECELSINE );
////		}
////	}
////}
////
/////*
////====================
////idInterpolateAccelDecelSine::GetCurrentValue
////====================
////*/
//////template< class type >
////ID_INLINE type idInterpolateAccelDecelSine<type>::GetCurrentValue( float time ) const {
////	SetPhase( time );
////	return this.extrapolate.GetCurrentValue( time );
////}
////
/////*
////====================
////idInterpolateAccelDecelSine::GetCurrentSpeed
////====================
////*/
//////template< class type >
////ID_INLINE type idInterpolateAccelDecelSine<type>::GetCurrentSpeed( float time ) const {
////	SetPhase( time );
////	return this.extrapolate.GetCurrentSpeed( time );
////}
////
////#endif /* !__MATH_INTERPOLATE_H__ */
}