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
class idInterpolate /*<type> always float or int*/ {
////public:
////						idInterpolate();
////
////	void				Init( const float startTime, const float duration, const type &startValue, const type &endValue );
	SetStartTime ( /*float*/ time: number ): void { this.startTime = time; }
	SetDuration ( /*float*/ duration: number ): void { this.duration = duration; }
	SetStartValue ( startValue: number ): void { this.startValue = startValue; }
	SetEndValue ( endValue: number ): void { this.endValue = endValue; }

////	type				GetCurrentValue( float time ) const;
	IsDone ( /*float*/ time: number ): boolean { return ( time >= this.startTime + this.duration ); }

	GetStartTime ( ): number { return this.startTime; }
	GetEndTime ( ): number { return this.startTime + this.duration; }
	GetDuration ( ): number { return this.duration; }
	GetStartValue ( ): number { return this.startValue; }
	GetEndValue ( ): number { return this.endValue; }

////private:
	startTime: number /*float*/;
	duration: number /*float*/;
	startValue: number /*type*/;
	endValue: number /*type*/;
	currentTime: number /*mutable float*/;
	currentValue: number /*type*/; //mutable

	parseMethod: ( v: number ) => number;
/*
====================
idInterpolate::idInterpolate
====================
*/
	constructor ( parseMethod: ( v: number ) => number ) {
		this.parseMethod = parseMethod;
		this.currentTime = this.startTime = this.duration = 0;
		this.currentValue = 0;
		this.startValue = this.endValue = this.currentValue;
	}

/*
====================
idInterpolate::Init
====================
*/
	Init ( /*const float*/ startTime: number, /*const float */duration: number, startValue: number, endValue: number ): void {
		this.startTime = startTime;
		this.duration = duration;
		this.startValue = this.parseMethod( startValue );
		this.endValue = this.parseMethod( endValue );
		this.currentTime = startTime - 1;
		this.currentValue = this.parseMethod( startValue );
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
////			this.currentValue = this.startValue;
////		} else if ( deltaTime >= this.duration ) {
////			this.currentValue = this.endValue;
////		} else {
////			this.currentValue =  this.parseMethod(this. startValue + ( this.endValue - this.startValue ) * ( (float) deltaTime / this.duration ));
////		}
////	}
////	return this.currentValue;
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
	SetStartTime( /*float */time :number) { this.startTime = time; this.Invalidate(); }
	SetStartValue(startValue: type): void { this.startValue.opEquals( startValue); this.Invalidate(); }
////	void				SetEndValue( const type &endValue ) { this.endValue = endValue; this.Invalidate(); }
////
////	type				GetCurrentValue( float time ) const;
////	type				GetCurrentSpeed( float time ) const;
	IsDone( /*float*/ time :number) :boolean{ return ( time >= this.startTime + this.accelTime + this.linearTime + this.decelTime ); }
	
	GetStartTime( ):number { return this.startTime; }
	GetEndTime( ):number { return this.startTime + this.accelTime + this.linearTime + this.decelTime; }
	GetDuration( ):number { return this.accelTime + this.linearTime + this.decelTime; }
	GetAcceleration( ):number { return this.accelTime; }
	GetDeceleration( ):number { return this.decelTime; }
	GetStartValue(): type { return this.startValue; }
	GetEndValue(): type { return this.endValue; }

////private:
	startTime :number/*float*/;
	accelTime :number/*float*/;
	linearTime :number/*float*/;
	decelTime :number/*float*/;
	startValue:any/*type*/;
	endValue: any/*type*/;
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
	constructor(type: any) {
		assert( type != Number );
		this.type = type;
		this.extrapolate = new idExtrapolate<type>( type );
		this.startTime = this.accelTime = this.linearTime = this.decelTime = 0;
		this.startValue = new type;
		this.endValue = new type;
		this.startValue.memset0 ( );
		this.endValue.opEquals( this.startValue );
	}

/*
====================
idInterpolateAccelDecelLinear::Init
====================
*/
//template< class type >
	Init ( /*float */startTime: number, /*float */accelTime: number, /*float */decelTime: number, /*float */duration: number, startValue: any, endValue: any ): void {
		var speed: number;

		this.startTime = startTime;
		this.accelTime = accelTime;
		this.decelTime = decelTime;
		this.startValue.opEquals( startValue );
		this.endValue.opEquals( endValue );

		if ( duration <= 0.0 ) {
			return;
		}

		if ( this.accelTime + this.decelTime > duration ) {
			this.accelTime = this.accelTime * duration / ( this.accelTime + this.decelTime );
			this.decelTime = duration - this.accelTime;
		}
		this.linearTime = duration - this.accelTime - this.decelTime;

		speed = ( endValue.opSubtraction( startValue ) ).opMultiplication( ( 1000.0 / ( /*(float)*/ this.linearTime + ( this.accelTime + this.decelTime ) * 0.5 ) ) );

		if ( this.accelTime ) {
			this.extrapolate.Init( startTime, this.accelTime, startValue, ( startValue.opSubtraction( startValue ) ), <any>speed, extrapolation_t.EXTRAPOLATION_ACCELLINEAR );
		} else if ( this.linearTime ) {
			this.extrapolate.Init( startTime, this.linearTime, startValue, ( startValue.opSubtraction( startValue ) ), <any>speed, extrapolation_t.EXTRAPOLATION_LINEAR );
		} else {
			this.extrapolate.Init( startTime, this.decelTime, startValue, ( startValue.opSubtraction( startValue ) ), <any>speed, extrapolation_t.EXTRAPOLATION_DECELLINEAR );
		}
	}

/*
====================
idInterpolateAccelDecelLinear::Invalidate
====================
*/
//template< class type >
	Invalidate ( ): void {
		this.extrapolate.Init(0, 0, this.extrapolate.GetStartValue(), this.extrapolate.GetBaseSpeed(), this.extrapolate.GetSpeed(), extrapolation_t.EXTRAPOLATION_NONE );
	}

/////*
////====================
////idInterpolateAccelDecelLinear::SetPhase
////====================
////*/
//////template< class type >
////ID_INLINE void idInterpolateAccelDecelLinear<type>::SetPhase( float time ) const {
////	float deltaTime;
////
////	deltaTime = time - this.startTime;
////	if ( deltaTime < accelTime ) {
////		if ( this.extrapolate.GetExtrapolationType() != extrapolation_t.EXTRAPOLATION_ACCELLINEAR ) {
////			this.extrapolate.Init( this.startTime, accelTime, startValue, this.extrapolate.GetBaseSpeed(), this.extrapolate.GetSpeed(), extrapolation_t.EXTRAPOLATION_ACCELLINEAR );
////		}
////	} else if ( deltaTime < accelTime + this.linearTime ) {
////		if ( this.extrapolate.GetExtrapolationType() != extrapolation_t.EXTRAPOLATION_LINEAR ) {
////			this.extrapolate.Init( this.startTime + accelTime, this.linearTime, startValue + this.extrapolate.GetSpeed() * ( accelTime * 0.001f * 0.5f ), this.extrapolate.GetBaseSpeed(), this.extrapolate.GetSpeed(), extrapolation_t.EXTRAPOLATION_LINEAR );
////		}
////	} else {
////		if ( this.extrapolate.GetExtrapolationType() != extrapolation_t.EXTRAPOLATION_DECELLINEAR ) {
////			this.extrapolate.Init( this.startTime + accelTime + this.linearTime, this.decelTime, this.endValue - ( this.extrapolate.GetSpeed() * ( this.decelTime * 0.001f * 0.5f ) ), this.extrapolate.GetBaseSpeed(), this.extrapolate.GetSpeed(), extrapolation_t.EXTRAPOLATION_DECELLINEAR );
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








//////template< class type >
class idInterpolateAccelDecelLinear_Number {
////public:
////						idInterpolateAccelDecelLinear();
////
////	void				Init( const float startTime, const float accelTime, const float decelTime, const float duration, const type &startValue, const type &endValue );
	SetStartTime( /*float */time :number) { this.startTime = time; this.Invalidate(); }
	SetStartValue(startValue: number ) :void{ this.startValue = startValue; this.Invalidate(); }
	SetEndValue( endValue:number ) { this.endValue = endValue; this.Invalidate(); }
	
////	type				GetCurrentValue( float time ) const;
////	type				GetCurrentSpeed( float time ) const;
	IsDone( /*float*/ time :number) :boolean{ return ( time >= this.startTime + this.accelTime + this.linearTime + this.decelTime ); }
	
	GetStartTime( ):number { return this.startTime; }
	GetEndTime( ):number { return this.startTime + this.accelTime + this.linearTime + this.decelTime; }
	GetDuration( ):number { return this.accelTime + this.linearTime + this.decelTime; }
	GetAcceleration( ):number { return this.accelTime; }
	GetDeceleration( ):number { return this.decelTime; }
	GetStartValue(): number { return this.startValue; }
	GetEndValue(): number { return this.endValue; }

////private:
	startTime :number/*float*/;
	accelTime :number/*float*/;
	linearTime :number/*float*/;
	decelTime :number/*float*/;
	startValue:any/*type*/;
	endValue: any/*type*/;
	extrapolate: idExtrapolate_Number;//mutable 

	parseMethod:(v:number)=>number;
////
////	void				Invalidate( void );
////	void				SetPhase( float time ) const;
////};
////
/*
====================
idInterpolateAccelDecelLinear_Number::idInterpolateAccelDecelLinear
====================
*/
//template< class type >
	constructor(parseMethod: (v: number) => number) {
		this.parseMethod = parseMethod;
		this.extrapolate = new idExtrapolate_Number( this.parseMethod );

		this.startTime = this.accelTime = this.linearTime = this.decelTime = 0;
		this.startValue = 0;
		this.endValue = 0;

		this.startValue = 0;
		this.endValue = this.startValue;
	}

/*
====================
idInterpolateAccelDecelLinear_Number::Init
====================
*/
//template< class type >
	Init( /*float */startTime: number, /*float */accelTime: number, /*float */decelTime: number, /*float */duration: number, startValue: number, endValue: number ): void {
		var speed: number;

		this.startTime = startTime;
		this.accelTime = accelTime;
		this.decelTime = decelTime;
		this.startValue = startValue;
		this.endValue = endValue;

		if ( duration <= 0.0 ) {
			return;
		}

		if (this.accelTime + this.decelTime > duration) {
			this.accelTime = this.parseMethod( this.accelTime * duration / ( this.accelTime + this.decelTime ) );
			this.decelTime = duration - this.accelTime;
		}
		this.linearTime = duration - this.accelTime - this.decelTime;

		speed = this.parseMethod( ( endValue - startValue ) * ( 1000.0 / ( /*(float)*/ this.linearTime + ( this.accelTime + this.decelTime ) * 0.5 ) ) );

		if ( this.accelTime ) {
			this.extrapolate.Init(startTime, this.accelTime, startValue, ( startValue - startValue ), speed, extrapolation_t.EXTRAPOLATION_ACCELLINEAR );
		} else if ( this.linearTime ) {
			this.extrapolate.Init(startTime, this.linearTime,  startValue, ( startValue - startValue ), speed, extrapolation_t.EXTRAPOLATION_LINEAR );
		} else {
			this.extrapolate.Init(startTime, this.decelTime,  startValue, ( startValue -  startValue ),  speed, extrapolation_t.EXTRAPOLATION_DECELLINEAR );
		}
	}

/*
====================
idInterpolateAccelDecelLinear_Number::Invalidate
====================
*/
//template< class type >
	Invalidate ( ): void {
		this.extrapolate.Init(0, 0, this.extrapolate.GetStartValue(), this.extrapolate.GetBaseSpeed(), this.extrapolate.GetSpeed(), extrapolation_t.EXTRAPOLATION_NONE );
	}

/////*
////====================
////idInterpolateAccelDecelLinear_Number::SetPhase
////====================
////*/
//////template< class type >
////ID_INLINE void idInterpolateAccelDecelLinear<type>::SetPhase( float time ) const {
////	float deltaTime;
////
////	deltaTime = time - this.startTime;
////	if ( deltaTime < accelTime ) {
////		if ( this.extrapolate.GetExtrapolationType() != extrapolation_t.EXTRAPOLATION_ACCELLINEAR ) {
////			this.extrapolate.Init( this.startTime, accelTime, startValue, this.extrapolate.GetBaseSpeed(), this.extrapolate.GetSpeed(), extrapolation_t.EXTRAPOLATION_ACCELLINEAR );
////		}
////	} else if ( deltaTime < accelTime + this.linearTime ) {
////		if ( this.extrapolate.GetExtrapolationType() != extrapolation_t.EXTRAPOLATION_LINEAR ) {
////			this.extrapolate.Init( this.startTime + accelTime, this.linearTime, startValue + this.extrapolate.GetSpeed() * ( accelTime * 0.001f * 0.5f ), this.extrapolate.GetBaseSpeed(), this.extrapolate.GetSpeed(), extrapolation_t.EXTRAPOLATION_LINEAR );
////		}
////	} else {
////		if ( this.extrapolate.GetExtrapolationType() != extrapolation_t.EXTRAPOLATION_DECELLINEAR ) {
////			this.extrapolate.Init( this.startTime + accelTime + this.linearTime, this.decelTime, this.endValue - ( this.extrapolate.GetSpeed() * ( this.decelTime * 0.001f * 0.5f ) ), this.extrapolate.GetBaseSpeed(), this.extrapolate.GetSpeed(), extrapolation_t.EXTRAPOLATION_DECELLINEAR );
////		}
////	}
////}
////
/////*
////====================
////idInterpolateAccelDecelLinear_Number::GetCurrentValue
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
////idInterpolateAccelDecelLinear_Number::GetCurrentSpeed
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
////	void				SetStartTime( float time ) { this.startTime = time; this.Invalidate(); }
////	void				SetStartValue( const type &startValue ) { this.startValue = startValue; this.Invalidate(); }
////	void				SetEndValue( const type &endValue ) { this.endValue = endValue; this.Invalidate(); }
////
////	type				GetCurrentValue( float time ) const;
////	type				GetCurrentSpeed( float time ) const;
////	bool				IsDone( float time ) :boolean { return ( time >= this.startTime + this.accelTime + this.linearTime + this.decelTime ); }
////
	GetStartTime( ):number/*float*/  { return this.startTime; }
	GetEndTime ( ): number /*float*/ { return this.startTime + this.accelTime + this.linearTime + this.decelTime; }
	GetDuration(): number/*float*/ { return this.accelTime + this.linearTime + this.decelTime; }
	GetAcceleration( ):number/*float*/ { return this.accelTime; }
	GetDeceleration( ):number/*float*/  { return this.decelTime; }
	GetStartValue( ):type { return this.startValue; }
	GetEndValue( ):type{ return this.endValue; }
////
////private:
	startTime :number/*float*/;
	accelTime :number/*float*/;
	linearTime :number/*float*/;
	decelTime :number/*float*/;
	startValue:any;
	endValue: any;
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
		assert( type != Number );
		this.type = type;
		this.extrapolate = new idExtrapolate<type>( type );

		this.startTime = this.accelTime = this.linearTime = this.decelTime = 0;
		this.startValue = new type;
		this.startValue.memset0 ( ); //memset(this.startValue, 0, sizeof(this.startValue));
		this.endValue = new type;
		this.endValue.opEquals( this.startValue );
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
////		this.extrapolate.Init( startTime, this.accelTime, startValue, ( startValue - startValue ), speed, extrapolation_t.EXTRAPOLATION_ACCELSINE );
////	} else if ( this.linearTime ) {
////		this.extrapolate.Init( startTime, this.linearTime, startValue, ( startValue - startValue ), speed, extrapolation_t.EXTRAPOLATION_LINEAR );
////	} else {
////		this.extrapolate.Init( startTime, this.decelTime, startValue, ( startValue - startValue ), speed, extrapolation_t.EXTRAPOLATION_DECELSINE );
////	}
////}
////
/////*
////====================
////idInterpolateAccelDecelSine::Invalidate
////====================
////*/
//////template< class type >
////ID_INLINE void idInterpolateAccelDecelSine<type>::Invalidate( ){
////	this.extrapolate.Init( 0, 0, this.extrapolate.GetStartValue(), this.extrapolate.GetBaseSpeed(), this.extrapolate.GetSpeed(), extrapolation_t.EXTRAPOLATION_NONE );
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
////	deltaTime = time - this.startTime;
////	if ( deltaTime < this.accelTime ) {
////		if ( this.extrapolate.GetExtrapolationType() != extrapolation_t.EXTRAPOLATION_ACCELSINE ) {
////			this.extrapolate.Init( this.startTime, this.accelTime, startValue, this.extrapolate.GetBaseSpeed(), this.extrapolate.GetSpeed(), extrapolation_t.EXTRAPOLATION_ACCELSINE );
////		}
////	} else if ( deltaTime < this.accelTime + linearTime ) {
////		if ( this.extrapolate.GetExtrapolationType() != extrapolation_t.EXTRAPOLATION_LINEAR ) {
////			this.extrapolate.Init( this.startTime + this.accelTime, linearTime, startValue + this.extrapolate.GetSpeed() * ( this.accelTime * 0.001f * idMath::SQRT_1OVER2 ), this.extrapolate.GetBaseSpeed(), this.extrapolate.GetSpeed(), extrapolation_t.EXTRAPOLATION_LINEAR );
////		}
////	} else {
////		if ( this.extrapolate.GetExtrapolationType() != extrapolation_t.EXTRAPOLATION_DECELSINE ) {
////			this.extrapolate.Init( this.startTime + this.accelTime + linearTime, this.decelTime, this.endValue - ( this.extrapolate.GetSpeed() * ( this.decelTime * 0.001f * idMath::SQRT_1OVER2 ) ), this.extrapolate.GetBaseSpeed(), this.extrapolate.GetSpeed(), extrapolation_t.EXTRAPOLATION_DECELSINE );
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




class idInterpolateAccelDecelSine_Number  {
////public:
////						idInterpolateAccelDecelSine();
////
////	void				Init( const float startTime, const float accelTime, const float decelTime, const float duration, const type &startValue, const type &endValue );
////	void				SetStartTime( float time ) { this.startTime = time; this.Invalidate(); }
////	void				SetStartValue( const type &startValue ) { this.startValue = startValue; this.Invalidate(); }
////	void				SetEndValue( const type &endValue ) { this.endValue = endValue; this.Invalidate(); }
////
////	type				GetCurrentValue( float time ) const;
////	type				GetCurrentSpeed( float time ) const;
////	bool				IsDone( float time ) :boolean { return ( time >= this.startTime + this.accelTime + this.linearTime + this.decelTime ); }
////
	GetStartTime( ):number/*float*/  { return this.startTime; }
	GetEndTime ( ): number /*float*/ { return this.startTime + this.accelTime + this.linearTime + this.decelTime; }
	GetDuration(): number/*float*/ { return this.accelTime + this.linearTime + this.decelTime; }
	GetAcceleration( ):number/*float*/ { return this.accelTime; }
	GetDeceleration( ):number/*float*/  { return this.decelTime; }
	GetStartValue(): number { return this.startValue; }
	GetEndValue(): number{ return this.endValue; }
////
////private:
	startTime :number/*float*/;
	accelTime :number/*float*/;
	linearTime :number/*float*/;
	decelTime :number/*float*/;
	startValue: number/*type*/;
	endValue: number/*type*/;
	extrapolate: idExtrapolate_Number; //mutable

	parseMethod: (v: number) => number;
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
	constructor ( parseMethod: ( v: number ) => number ) {
		this.parseMethod = parseMethod;
		this.extrapolate = new idExtrapolate_Number( this.parseMethod );

		this.startTime = this.accelTime = this.linearTime = this.decelTime = 0;
		this.startValue = 0;
		this.startValue = 0;
		this.endValue = 0;
		this.endValue = this.startValue;
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
////		this.extrapolate.Init( startTime, this.accelTime, startValue, ( startValue - startValue ), speed, extrapolation_t.EXTRAPOLATION_ACCELSINE );
////	} else if ( this.linearTime ) {
////		this.extrapolate.Init( startTime, this.linearTime, startValue, ( startValue - startValue ), speed, extrapolation_t.EXTRAPOLATION_LINEAR );
////	} else {
////		this.extrapolate.Init( startTime, this.decelTime, startValue, ( startValue - startValue ), speed, extrapolation_t.EXTRAPOLATION_DECELSINE );
////	}
////}
////
/////*
////====================
////idInterpolateAccelDecelSine::Invalidate
////====================
////*/
//////template< class type >
////ID_INLINE void idInterpolateAccelDecelSine<type>::Invalidate( ){
////	this.extrapolate.Init( 0, 0, this.extrapolate.GetStartValue(), this.extrapolate.GetBaseSpeed(), this.extrapolate.GetSpeed(), extrapolation_t.EXTRAPOLATION_NONE );
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
////	deltaTime = time - this.startTime;
////	if ( deltaTime < this.accelTime ) {
////		if ( this.extrapolate.GetExtrapolationType() != extrapolation_t.EXTRAPOLATION_ACCELSINE ) {
////			this.extrapolate.Init( this.startTime, this.accelTime, startValue, this.extrapolate.GetBaseSpeed(), this.extrapolate.GetSpeed(), extrapolation_t.EXTRAPOLATION_ACCELSINE );
////		}
////	} else if ( deltaTime < this.accelTime + linearTime ) {
////		if ( this.extrapolate.GetExtrapolationType() != extrapolation_t.EXTRAPOLATION_LINEAR ) {
////			this.extrapolate.Init( this.startTime + this.accelTime, linearTime, startValue + this.extrapolate.GetSpeed() * ( this.accelTime * 0.001f * idMath::SQRT_1OVER2 ), this.extrapolate.GetBaseSpeed(), this.extrapolate.GetSpeed(), extrapolation_t.EXTRAPOLATION_LINEAR );
////		}
////	} else {
////		if ( this.extrapolate.GetExtrapolationType() != extrapolation_t.EXTRAPOLATION_DECELSINE ) {
////			this.extrapolate.Init( this.startTime + this.accelTime + linearTime, this.decelTime, this.endValue - ( this.extrapolate.GetSpeed() * ( this.decelTime * 0.001f * idMath::SQRT_1OVER2 ) ), this.extrapolate.GetBaseSpeed(), this.extrapolate.GetSpeed(), extrapolation_t.EXTRAPOLATION_DECELSINE );
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