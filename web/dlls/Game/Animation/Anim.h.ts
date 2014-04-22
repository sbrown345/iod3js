///*
//===========================================================================
//
//Doom 3 GPL Source Code
//Copyright (C) 1999-2011 id Software LLC, a ZeniMax Media company. 
//
//This file is part of the Doom 3 GPL Source Code (?Doom 3 Source Code?).  
//
//Doom 3 Source Code is free software: you can redistribute it and/or modify
//it under the terms of the GNU General Public License as published by
//the Free Software Foundation, either version 3 of the License, or
//(at your option) any later version.
//
//Doom 3 Source Code is distributed in the hope that it will be useful,
//but WITHOUT ANY WARRANTY; without even the implied warranty of
//MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//GNU General Public License for more details.
//
//You should have received a copy of the GNU General Public License
//along with Doom 3 Source Code.  If not, see <http://www.gnu.org/licenses/>.
//
//In addition, the Doom 3 Source Code is also subject to certain additional terms. You should have received a copy of these additional terms immediately following the terms and conditions of the GNU General Public License which accompanied the Doom 3 Source Code.  If not, please request a copy in writing from id Software at the address below.
//
//If you have questions concerning this license or the applicable additional terms, you may contact in writing id Software LLC, c/o ZeniMax Media Inc., Suite 120, Rockville, Maryland 20850 USA.
//
//===========================================================================
//*/
//#ifndef __ANIM_H__
//#define __ANIM_H__
//
//
// animation channels
// these can be changed by modmakers and licensees to be whatever they need.
var ANIM_NumAnimChannels		= 5;
var ANIM_MaxAnimsPerChannel	= 3;
var ANIM_MaxSyncedAnims		= 3;
//
////
//// animation channels.  make sure to change script/doom_defs.script if you add any channels, or change their order
////
var ANIMCHANNEL_ALL			= 0;
var ANIMCHANNEL_TORSO			= 1;
var ANIMCHANNEL_LEGS			= 2;
var ANIMCHANNEL_HEAD			= 3;
var ANIMCHANNEL_EYELIDS		= 4;
//
// for converting from 24 frames per second to milliseconds
function FRAME2MS ( framenum /*int*/: number ): number {
	return int( framenum * 1000 ) / 24;
}

//
//class idRenderModel;
//class idAnimator;
//class idAnimBlend;
//class function_t;
//class idEntity;
//class idSaveGame;
//class idRestoreGame;
//
class frameBlend_t {
	cycleCount :number/*int*/;	// how many times the anim has wrapped to the begining (0 for clamped anims)
	frame1 :number/*int*/;
	frame2 :number/*int*/;
	frontlerp :number/*float*/;
	backlerp :number/*float*/;
};

class jointAnimInfo_t {
	nameIndex: number /*int*/;
	parentNum: number /*int*/;
	animBits: number /*int*/;
	firstComponent: number /*int*/;
}

class jointInfo_t {
	num: jointHandle_t;
	parentNum: jointHandle_t;
	channel: number /*int*/;

	copy ( dest: jointInfo_t = null ): jointInfo_t {
		dest = dest || new jointInfo_t;
		dest.num = this.num;
		dest.parentNum = this.parentNum;
		dest.channel = this.channel;
		return dest;
	}
}


//
// joint modifier modes.  make sure to change script/doom_defs.script if you add any, or change their order.
//
enum jointModTransform_t{
	JOINTMOD_NONE,				// no modification
	JOINTMOD_LOCAL,				// modifies the joint's position or orientation in joint local space
	JOINTMOD_LOCAL_OVERRIDE,	// sets the joint's position or orientation in joint local space
	JOINTMOD_WORLD,				// modifies joint's position or orientation in model space
	JOINTMOD_WORLD_OVERRIDE		// sets the joint's position or orientation in model space
};

class jointMod_t {
	jointnum:jointHandle_t;
	mat = new idMat3;
	pos = new idVec3;
	transform_pos:jointModTransform_t;
	transform_axis:jointModTransform_t;
};

var	ANIM_TX				=BIT( 0 )
var	ANIM_TY				=BIT( 1 )
var	ANIM_TZ				=BIT( 2 )
var	ANIM_QX				=BIT( 3 )
var	ANIM_QY				=BIT( 4 )
var	ANIM_QZ				=BIT( 5 )

enum frameCommandType_t{
	FC_SCRIPTFUNCTION,
	FC_SCRIPTFUNCTIONOBJECT,
	FC_EVENTFUNCTION,
	FC_SOUND,
	FC_SOUND_VOICE,
	FC_SOUND_VOICE2,
	FC_SOUND_BODY,
	FC_SOUND_BODY2,
	FC_SOUND_BODY3,
	FC_SOUND_WEAPON,
	FC_SOUND_ITEM,
	FC_SOUND_GLOBAL,
	FC_SOUND_CHATTER,
	FC_SKIN,
	FC_TRIGGER,
	FC_TRIGGER_SMOKE_PARTICLE,
	FC_MELEE,
	FC_DIRECTDAMAGE,
	FC_BEGINATTACK,
	FC_ENDATTACK,
	FC_MUZZLEFLASH,
	FC_CREATEMISSILE,
	FC_LAUNCHMISSILE,
	FC_FIREMISSILEATTARGET,
	FC_FOOTSTEP,
	FC_LEFTFOOT,
	FC_RIGHTFOOT,
	FC_ENABLE_EYE_FOCUS,
	FC_DISABLE_EYE_FOCUS,
	FC_FX,
	FC_DISABLE_GRAVITY,
	FC_ENABLE_GRAVITY,
	FC_JUMP,
	FC_ENABLE_CLIP,
	FC_DISABLE_CLIP,
	FC_ENABLE_WALK_IK,
	FC_DISABLE_WALK_IK,
	FC_ENABLE_LEG_IK,
	FC_DISABLE_LEG_IK,
	FC_RECORDDEMO,
	FC_AVIGAME
};

class frameLookup_t{
	num: number /*int*/;
	firstCommand: number /*int*/;
}

class frameCommand_t {
	type: frameCommandType_t;
	$string = new idStr;
//
//	union {
//		const idSoundShader	*soundShader;
//		const function_t	*function;
//		const idDeclSkin	*skin;
//		int					index;
//	};
}

class animFlags_t {
	prevent_idle_override: boolean /*: 1*/;
	random_cycle_start: boolean /*: 1*/;
	ai_no_turn: boolean /*: 1*/;
	anim_turn: boolean /*: 1*/;

	memset0 ( ): void {
		this.prevent_idle_override = false;
		this.random_cycle_start = false;
		this.ai_no_turn = false;
		this.anim_turn = false;
	}
}


///*
//==============================================================================================
//
//	idModelExport
//
//==============================================================================================
//*/
//
//class idModelExport {
//private:
//	void					Reset( );
//	bool					ParseOptions( idLexer &lex );
//	int						ParseExportSection( idParser &parser );
//
//	static bool				CheckMayaInstall( );
//	static void				LoadMayaDll( );
//
//	bool					ConvertMayaToMD5( );
//	static bool				initialized;
//
//public:
//	idStr					commandLine;
//	idStr					src;
//	idStr					dest;
//	bool					force;
//
//							idModelExport();
//
//	static void				Shutdown( );
//
//	int						ExportDefFile( const char *filename );
//	bool					ExportModel( const char *model );
//	bool					ExportAnim( const char *anim );
//	int						ExportModels( const char *pathname, const char *extension );
//};

/*
==============================================================================================

	idMD5Anim

==============================================================================================
*/

class idMD5Anim {
//private:
	numFrames: number /*int*/;
	frameRate: number /*int*/;
	animLength: number /*int*/;
	numJoints: number /*int*/;
	numAnimatedComponents: number /*int*/;
//	idList<idBounds>		bounds;
//	idList<jointAnimInfo_t>	jointInfo;
//	idList<idJointQuat>		baseFrame;
//	idList<float>			componentFrames;
	name = new idStr;
	totaldelta = new idVec3;
	ref_count: number /*mutable int*/;

//public:
//							idMD5Anim();
//							~idMD5Anim();
//
//	void					Free( );
//	bool					Reload( );
//	size_t					Allocated( ) const;
//	size_t					Size( ) const { return sizeof( *this ) + Allocated(); };
//	bool					LoadAnim( const char *filename );
//
//	void					IncreaseRefs( ) const;
//	void					DecreaseRefs( ) const;
//	int						NumRefs( ) const;
//	
//	void					CheckModelHierarchy( const idRenderModel *model ) const;
//	void					GetInterpolatedFrame( frameBlend_t &frame, idJointQuat *joints, const int *index, int numIndexes ) const;
//	void					GetSingleFrame( framenum/*int*/:number, idJointQuat *joints, const int *index, int numIndexes ) const;
//	int						Length( ) const;
//	int						NumFrames( ) const;
//	int						NumJoints( ) const;
//	const idVec3			&TotalMovementDelta( ) const;
//	const char				*Name( ) const;
//
//	void					GetFrameBlend( framenum/*int*/:number, frameBlend_t &frame ) const;	// frame 1 is first frame
//	void					ConvertTimeToFrame( /*int*/time:number, int cyclecount, frameBlend_t &frame ) const;
//
//	void					GetOrigin( idVec3 &offset, int currentTime, int cyclecount ) const;
//	void					GetOriginRotation( idQuat &rotation, /*int*/time:number, int cyclecount ) const;
//	void					GetBounds( idBounds &bounds, int currentTime, int cyclecount ) const;


/*
====================
idMD5Anim::idMD5Anim
====================
*/
	constructor ( ) {
		this.ref_count = 0;
		this.numFrames = 0;
		this.numJoints = 0;
		this.frameRate = 24;
		this.animLength = 0;
		this.totaldelta.Zero ( );
	}
//
///*
//====================
//idMD5Anim::idMD5Anim
//====================
//*/
//idMD5Anim::~idMD5Anim() {
//	Free();
//}
//
///*
//====================
//idMD5Anim::Free
//====================
//*/
//void idMD5Anim::Free( ) {
//	this.numFrames	= 0;
//	this.numJoints	= 0;
//	this.frameRate	= 24;
//	animLength	= 0;
//	name		= "";
//
//	totaldelta.Zero();
//
//	jointInfo.Clear();
//	bounds.Clear();
//	componentFrames.Clear();
//}

/*
====================
idMD5Anim::NumFrames
====================
*/
	NumFrames ( ): number {
		return this.numFrames;
	}

/*
====================
idMD5Anim::NumJoints
====================
*/
	NumJoints ( ): number {
		return this.numJoints;
	}

/*
====================
idMD5Anim::Length
====================
*/
	Length ( ): number {
		return this.animLength;
	}
//
///*
//=====================
//idMD5Anim::TotalMovementDelta
//=====================
//*/
//const idVec3 &idMD5Anim::TotalMovementDelta( ) const {
//	return totaldelta;
//}

/*
=====================
idMD5Anim::TotalMovementDelta
=====================
*/
	Name ( ): string {
		return this.name.data;
	}
//
///*
//====================
//idMD5Anim::Reload
//====================
//*/
//bool idMD5Anim::Reload( ) {
//	idStr filename;
//
//	filename = name;
//	Free();
//
//	return LoadAnim( filename );
//}
//
///*
//====================
//idMD5Anim::Allocated
//====================
//*/
//size_t idMD5Anim::Allocated( ) const {
//	size_t	size = bounds.Allocated() + jointInfo.Allocated() + componentFrames.Allocated() + name.Allocated();
//	return size;
//}
//
///*
//====================
//idMD5Anim::LoadAnim
//====================
//*/
//bool idMD5Anim::LoadAnim( const char *filename ) {
//	int		version;
//	idLexer	parser( lexerFlags_t.LEXFL_ALLOWPATHNAMES | lexerFlags_t.LEXFL_NOSTRINGESCAPECHARS | lexerFlags_t.LEXFL_NOSTRINGCONCAT );
//	idToken	token;
//	int		i, j;
//	int		num;
//
//	if ( !parser.LoadFile( filename ) ) {
//		return false;
//	}
//
//	Free();
//
//	name = filename;
//
//	parser.ExpectTokenString( MD5_VERSION_STRING );
//	version = parser.ParseInt();
//	if ( version != MD5_VERSION ) {
//		parser.Error( "Invalid version %d.  Should be version %d\n", version, MD5_VERSION );
//	}
//
//	// skip the commandline
//	parser.ExpectTokenString( "commandline" );
//	parser.ReadToken( &token );
//
//	// parse num frames
//	parser.ExpectTokenString( "numFrames" );
//	this.numFrames = parser.ParseInt();
//	if ( this.numFrames <= 0 ) {
//		parser.Error( "Invalid number of frames: %d", this.numFrames );
//	}
//
//	// parse num joints
//	parser.ExpectTokenString( "numJoints" );
//	this.numJoints = parser.ParseInt();
//	if ( this.numJoints <= 0 ) {
//		parser.Error( "Invalid number of joints: %d", this.numJoints );
//	}
//
//	// parse frame rate
//	parser.ExpectTokenString( "frameRate" );
//	this.frameRate = parser.ParseInt();
//	if ( this.frameRate < 0 ) {
//		parser.Error( "Invalid frame rate: %d", this.frameRate );
//	}
//
//	// parse number of animated components
//	parser.ExpectTokenString( "numAnimatedComponents" );
//	numAnimatedComponents = parser.ParseInt();
//	if ( ( numAnimatedComponents < 0 ) || ( numAnimatedComponents > this.numJoints * 6 ) ) {
//		parser.Error( "Invalid number of animated components: %d", numAnimatedComponents );
//	}
//
//	// parse the hierarchy
//	jointInfo.SetGranularity( 1 );
//	jointInfo.SetNum( this.numJoints );
//	parser.ExpectTokenString( "hierarchy" );
//	parser.ExpectTokenString( "{" );
//	for( i = 0; i < this.numJoints; i++ ) {
//		parser.ReadToken( &token );
//		jointInfo[ i ].nameIndex = animationLib.JointIndex( token );
//		
//		// parse parent num
//		jointInfo[ i ].parentNum = parser.ParseInt();
//		if ( jointInfo[ i ].parentNum >= i ) {
//			parser.Error( "Invalid parent num: %d", jointInfo[ i ].parentNum );
//		}
//
//		if ( ( i != 0 ) && ( jointInfo[ i ].parentNum < 0 ) ) {
//			parser.Error( "Animations may have only one root joint" );
//		}
//
//		// parse anim bits
//		jointInfo[ i ].animBits = parser.ParseInt();
//		if ( jointInfo[ i ].animBits & ~63 ) {
//			parser.Error( "Invalid anim bits: %d", jointInfo[ i ].animBits );
//		}
//
//		// parse first component
//		jointInfo[ i ].firstComponent = parser.ParseInt();
//		if ( ( numAnimatedComponents > 0 ) && ( ( jointInfo[ i ].firstComponent < 0 ) || ( jointInfo[ i ].firstComponent >= numAnimatedComponents ) ) ) {
//			parser.Error( "Invalid first component: %d", jointInfo[ i ].firstComponent );
//		}
//	}
//
//	parser.ExpectTokenString( "}" );
//
//	// parse bounds
//	parser.ExpectTokenString( "bounds" );
//	parser.ExpectTokenString( "{" );
//	bounds.SetGranularity( 1 );
//	bounds.SetNum( this.numFrames );
//	for( i = 0; i < this.numFrames; i++ ) {
//		parser.Parse1DMatrix( 3, bounds[ i ][ 0 ].ToFloatPtr() );
//		parser.Parse1DMatrix( 3, bounds[ i ][ 1 ].ToFloatPtr() );
//	}
//	parser.ExpectTokenString( "}" );
//
//	// parse base frame
//	baseFrame.SetGranularity( 1 );
//	baseFrame.SetNum( this.numJoints );
//	parser.ExpectTokenString( "baseframe" );
//	parser.ExpectTokenString( "{" );
//	for( i = 0; i < this.numJoints; i++ ) {
//		idCQuat q;
//		parser.Parse1DMatrix( 3, baseFrame[ i ].t.ToFloatPtr() );
//		parser.Parse1DMatrix( 3, q.ToFloatPtr() );//baseFrame[ i ].q.ToFloatPtr() );
//		baseFrame[ i ].q = q.ToQuat();//.w = baseFrame[ i ].q.CalcW();
//	}
//	parser.ExpectTokenString( "}" );
//
//	// parse frames
//	componentFrames.SetGranularity( 1 );
//	componentFrames.SetNum( numAnimatedComponents * this.numFrames );
//
//	float *componentPtr = componentFrames.Ptr();
//	for( i = 0; i < this.numFrames; i++ ) {
//		parser.ExpectTokenString( "frame" );
//		num = parser.ParseInt();
//		if ( num != i ) {
//			parser.Error( "Expected frame number %d", i );
//		}
//		parser.ExpectTokenString( "{" );
//		
//		for( j = 0; j < numAnimatedComponents; j++, componentPtr++ ) {
//			*componentPtr = parser.ParseFloat();
//		}
//
//		parser.ExpectTokenString( "}" );
//	}
//
//	// get total move delta
//	if ( !numAnimatedComponents ) {
//		totaldelta.Zero();
//	} else {
//		componentPtr = &componentFrames[ jointInfo[ 0 ].firstComponent ];
//		if ( jointInfo[ 0 ].animBits & ANIM_TX ) {
//			for( i = 0; i < this.numFrames; i++ ) {
//				componentPtr[ numAnimatedComponents * i ] -= baseFrame[ 0 ].t.x;
//			}
//			totaldelta.x = componentPtr[ numAnimatedComponents * ( this.numFrames - 1 ) ];
//			componentPtr++;
//		} else {
//			totaldelta.x = 0.0;
//		}
//		if ( jointInfo[ 0 ].animBits & ANIM_TY ) {
//			for( i = 0; i < this.numFrames; i++ ) {
//				componentPtr[ numAnimatedComponents * i ] -= baseFrame[ 0 ].t.y;
//			}
//			totaldelta.y = componentPtr[ numAnimatedComponents * ( this.numFrames - 1 ) ];
//			componentPtr++;
//		} else {
//			totaldelta.y = 0.0;
//		}
//		if ( jointInfo[ 0 ].animBits & ANIM_TZ ) {
//			for( i = 0; i < this.numFrames; i++ ) {
//				componentPtr[ numAnimatedComponents * i ] -= baseFrame[ 0 ].t.z;
//			}
//			totaldelta.z = componentPtr[ numAnimatedComponents * ( this.numFrames - 1 ) ];
//		} else {
//			totaldelta.z = 0.0;
//		}
//	}
//	baseFrame[ 0 ].t.Zero();
//
//	// we don't count last frame because it would cause a 1 frame pause at the end
//	animLength = ( ( this.numFrames - 1 ) * 1000 + this.frameRate - 1 ) / this.frameRate;
//
//	// done
//	return true;
//}

/*
====================
idMD5Anim::IncreaseRefs
====================
*/
	IncreaseRefs ( ): void {
		this.ref_count++;
	}

/*
====================
idMD5Anim::DecreaseRefs
====================
*/
	DecreaseRefs ( ): void {
		this.ref_count--;
	}

/*
====================
idMD5Anim::NumRefs
====================
*/
	NumRefs ( ): number {
		return this.ref_count;
	}

///*
//====================
//idMD5Anim::GetFrameBlend
//====================
//*/
//void idMD5Anim::GetFrameBlend( framenum/*int*/:number, frameBlend_t &frame ) :void {
//	frame.cycleCount	= 0;
//	frame.backlerp		= 0.0;
//	frame.frontlerp		= 1.0;
//
//	// frame 1 is first frame
//	framenum--;
//	if ( framenum < 0 ) {
//		framenum = 0;
//	} else if ( framenum >= this.numFrames ) {
//		framenum = this.numFrames - 1;
//	}
//
//	frame.frame1 = framenum;
//	frame.frame2 = framenum;
//}

/*
====================
idMD5Anim::ConvertTimeToFrame
====================
*/
	ConvertTimeToFrame ( /*int*/time: number, /*int */cyclecount: number, frame: frameBlend_t ): void {
		var frameTime: number /*float*/;
		var frameNum: number /*int*/;

		if ( this.numFrames <= 1 ) {
			frame.frame1 = 0;
			frame.frame2 = 0;
			frame.backlerp = 0.0;
			frame.frontlerp = 1.0;
			frame.cycleCount = 0;
			return;
		}

		if ( time <= 0 ) {
			frame.frame1 = 0;
			frame.frame2 = 1;
			frame.backlerp = 0.0;
			frame.frontlerp = 1.0;
			frame.cycleCount = 0;
			return;
		}

		frameTime = time * this.frameRate;
		frameNum = int( frameTime / 1000 );
		frame.cycleCount = int( frameNum / ( this.numFrames - 1 ) );

		if ( ( cyclecount > 0 ) && ( frame.cycleCount >= cyclecount ) ) {
			frame.cycleCount = cyclecount - 1;
			frame.frame1 = this.numFrames - 1;
			frame.frame2 = frame.frame1;
			frame.backlerp = 0.0;
			frame.frontlerp = 1.0;
			return;
		}

		frame.frame1 = frameNum % ( this.numFrames - 1 );
		frame.frame2 = frame.frame1 + 1;
		if ( frame.frame2 >= this.numFrames ) {
			frame.frame2 = 0;
		}

		frame.backlerp = ( frameTime % 1000 ) * 0.001;
		frame.frontlerp = 1.0 - frame.backlerp;
	}

/*
====================
idMD5Anim::GetOrigin
====================
*/
	GetOrigin ( offset: idVec3, /*int*/time: number, /*int*/ cyclecount: number ): void {
		todoThrow ( );
//	frameBlend_t frame;
//
//	offset = baseFrame[ 0 ].t;
//	if ( !( jointInfo[ 0 ].animBits & ( ANIM_TX | ANIM_TY | ANIM_TZ ) ) ) {
//		// just use the baseframe		
//		return;
//	}
//
//	ConvertTimeToFrame( time, cyclecount, frame );
//
//	const float *componentPtr1 = &componentFrames[ numAnimatedComponents * frame.frame1 + jointInfo[ 0 ].firstComponent ];
//	const float *componentPtr2 = &componentFrames[ numAnimatedComponents * frame.frame2 + jointInfo[ 0 ].firstComponent ];
//
//	if ( jointInfo[ 0 ].animBits & ANIM_TX ) {
//		offset.x = *componentPtr1 * frame.frontlerp + *componentPtr2 * frame.backlerp;
//		componentPtr1++;
//		componentPtr2++;
//	}
//
//	if ( jointInfo[ 0 ].animBits & ANIM_TY ) {
//		offset.y = *componentPtr1 * frame.frontlerp + *componentPtr2 * frame.backlerp;
//		componentPtr1++;
//		componentPtr2++;
//	}
//
//	if ( jointInfo[ 0 ].animBits & ANIM_TZ ) {
//		offset.z = *componentPtr1 * frame.frontlerp + *componentPtr2 * frame.backlerp;
//	}
//
//	if ( frame.cycleCount ) {
//		offset += totaldelta * ( float )frame.cycleCount;
//	}
	}
//
///*
//====================
//idMD5Anim::GetOriginRotation
//====================
//*/
//void idMD5Anim::GetOriginRotation( idQuat &rotation, /*int*/time:number, /*int*/ cyclecount:number ) const {
//	frameBlend_t	frame;
//	int				animBits;
//	
//	animBits = jointInfo[ 0 ].animBits;
//	if ( !( animBits & ( ANIM_QX | ANIM_QY | ANIM_QZ ) ) ) {
//		// just use the baseframe		
//		rotation = baseFrame[ 0 ].q;
//		return;
//	}
//
//	ConvertTimeToFrame( time, cyclecount, frame );
//
//	const float	*jointframe1 = &componentFrames[ numAnimatedComponents * frame.frame1 + jointInfo[ 0 ].firstComponent ];
//	const float	*jointframe2 = &componentFrames[ numAnimatedComponents * frame.frame2 + jointInfo[ 0 ].firstComponent ];
//
//	if ( animBits & ANIM_TX ) {
//		jointframe1++;
//		jointframe2++;
//	}
//
//	if ( animBits & ANIM_TY ) {
//		jointframe1++;
//		jointframe2++;
//	}
//
//	if ( animBits & ANIM_TZ ) {
//		jointframe1++;
//		jointframe2++;
//	}
//
//	idQuat q1;
//	idQuat q2;
//
//	switch( animBits & (ANIM_QX|ANIM_QY|ANIM_QZ) ) {
//		case ANIM_QX:
//			q1.x = jointframe1[0];
//			q2.x = jointframe2[0];
//			q1.y = baseFrame[ 0 ].q.y;
//			q2.y = q1.y;
//			q1.z = baseFrame[ 0 ].q.z;
//			q2.z = q1.z;
//			q1.w = q1.CalcW();
//			q2.w = q2.CalcW();
//			break;
//		case ANIM_QY:
//			q1.y = jointframe1[0];
//			q2.y = jointframe2[0];
//			q1.x = baseFrame[ 0 ].q.x;
//			q2.x = q1.x;
//			q1.z = baseFrame[ 0 ].q.z;
//			q2.z = q1.z;
//			q1.w = q1.CalcW();
//			q2.w = q2.CalcW();
//			break;
//		case ANIM_QZ:
//			q1.z = jointframe1[0];
//			q2.z = jointframe2[0];
//			q1.x = baseFrame[ 0 ].q.x;
//			q2.x = q1.x;
//			q1.y = baseFrame[ 0 ].q.y;
//			q2.y = q1.y;
//			q1.w = q1.CalcW();
//			q2.w = q2.CalcW();
//			break;
//		case ANIM_QX|ANIM_QY:
//			q1.x = jointframe1[0];
//			q1.y = jointframe1[1];
//			q2.x = jointframe2[0];
//			q2.y = jointframe2[1];
//			q1.z = baseFrame[ 0 ].q.z;
//			q2.z = q1.z;
//			q1.w = q1.CalcW();
//			q2.w = q2.CalcW();
//			break;
//		case ANIM_QX|ANIM_QZ:
//			q1.x = jointframe1[0];
//			q1.z = jointframe1[1];
//			q2.x = jointframe2[0];
//			q2.z = jointframe2[1];
//			q1.y = baseFrame[ 0 ].q.y;
//			q2.y = q1.y;
//			q1.w = q1.CalcW();
//			q2.w = q2.CalcW();
//			break;
//		case ANIM_QY|ANIM_QZ:
//			q1.y = jointframe1[0];
//			q1.z = jointframe1[1];
//			q2.y = jointframe2[0];
//			q2.z = jointframe2[1];
//			q1.x = baseFrame[ 0 ].q.x;
//			q2.x = q1.x;
//			q1.w = q1.CalcW();
//			q2.w = q2.CalcW();
//			break;
//		case ANIM_QX|ANIM_QY|ANIM_QZ:
//			q1.x = jointframe1[0];
//			q1.y = jointframe1[1];
//			q1.z = jointframe1[2];
//			q2.x = jointframe2[0];
//			q2.y = jointframe2[1];
//			q2.z = jointframe2[2];
//			q1.w = q1.CalcW();
//			q2.w = q2.CalcW();
//			break;
//	}
//
//	rotation.Slerp( q1, q2, frame.backlerp );
//}

/*
====================
idMD5Anim::GetBounds
====================
*/
	GetBounds ( bnds: idBounds, /*int*/time: number, /*int*/ cyclecount: number ): void {
		todoThrow ( );
		//frameBlend_t	frame;
		//idVec3			offset;

		//ConvertTimeToFrame( time, cyclecount, frame );

		//bnds = bounds[ frame.frame1 ];
		//bnds.AddBounds( bounds[ frame.frame2 ] );

		//// origin position
		//offset = baseFrame[ 0 ].t;
		//if ( jointInfo[ 0 ].animBits & ( ANIM_TX | ANIM_TY | ANIM_TZ ) ) {
		//	const float *componentPtr1 = &componentFrames[ numAnimatedComponents * frame.frame1 + jointInfo[ 0 ].firstComponent ];
		//	const float *componentPtr2 = &componentFrames[ numAnimatedComponents * frame.frame2 + jointInfo[ 0 ].firstComponent ];

		//	if ( jointInfo[ 0 ].animBits & ANIM_TX ) {
		//		offset.x = *componentPtr1 * frame.frontlerp + *componentPtr2 * frame.backlerp;
		//		componentPtr1++;
		//		componentPtr2++;
		//	}

		//	if ( jointInfo[ 0 ].animBits & ANIM_TY ) {
		//		offset.y = *componentPtr1 * frame.frontlerp + *componentPtr2 * frame.backlerp;
		//		componentPtr1++;
		//		componentPtr2++;
		//	}

		//	if ( jointInfo[ 0 ].animBits & ANIM_TZ ) {
		//		offset.z = *componentPtr1 * frame.frontlerp + *componentPtr2 * frame.backlerp;
		//	}
		//}

		//bnds[ 0 ] -= offset;
		//bnds[ 1 ] -= offset;
	}

/*
====================
idMD5Anim::GetInterpolatedFrame
====================
*/
	GetInterpolatedFrame ( frame: frameBlend_t, joints: idJointQuat [], index: Int32Array, /*int */numIndexes: number ): void {
		todoThrow ( );
//	int						i, numLerpJoints;
//	const float				*frame1;
//	const float				*frame2;
//	const float				*jointframe1;
//	const float				*jointframe2;
//	const jointAnimInfo_t	*infoPtr;
//	int						animBits;
//	idJointQuat				*blendJoints;
//	idJointQuat				*jointPtr;
//	idJointQuat				*blendPtr;
//	int						*lerpIndex;
//
//	// copy the baseframe
//	SIMDProcessor.Memcpy( joints, baseFrame.Ptr(), baseFrame.Num() * sizeof( baseFrame[ 0 ] ) );
//
//	if ( !numAnimatedComponents ) {
//		// just use the base frame
//		return;
//	}
//
//	blendJoints = (idJointQuat *)_alloca16( baseFrame.Num() * sizeof( blendPtr[ 0 ] ) );
//	lerpIndex = (int *)_alloca16( baseFrame.Num() * sizeof( lerpIndex[ 0 ] ) );
//	numLerpJoints = 0;
//
//	frame1 = &componentFrames[ frame.frame1 * numAnimatedComponents ];
//	frame2 = &componentFrames[ frame.frame2 * numAnimatedComponents ];
//
//	for ( i = 0; i < numIndexes; i++ ) {
//		int j = index[i];
//		jointPtr = &joints[j];
//		blendPtr = &blendJoints[j];
//		infoPtr = &jointInfo[j];
//
//		animBits = infoPtr.animBits;
//		if ( animBits ) {
//
//			lerpIndex[numLerpJoints++] = j;
//
//			jointframe1 = frame1 + infoPtr.firstComponent;
//			jointframe2 = frame2 + infoPtr.firstComponent;
//
//			switch( animBits & (ANIM_TX|ANIM_TY|ANIM_TZ) ) {
//				case 0:
//					blendPtr.t = jointPtr.t;
//					break;
//				case ANIM_TX:
//					jointPtr.t.x = jointframe1[0];
//					blendPtr.t.x = jointframe2[0];
//					blendPtr.t.y = jointPtr.t.y;
//					blendPtr.t.z = jointPtr.t.z;
//					jointframe1++;
//					jointframe2++;
//					break;
//				case ANIM_TY:
//					jointPtr.t.y = jointframe1[0];
//					blendPtr.t.y = jointframe2[0];
//					blendPtr.t.x = jointPtr.t.x;
//					blendPtr.t.z = jointPtr.t.z;
//					jointframe1++;
//					jointframe2++;
//					break;
//				case ANIM_TZ:
//					jointPtr.t.z = jointframe1[0];
//					blendPtr.t.z = jointframe2[0];
//					blendPtr.t.x = jointPtr.t.x;
//					blendPtr.t.y = jointPtr.t.y;
//					jointframe1++;
//					jointframe2++;
//					break;
//				case ANIM_TX|ANIM_TY:
//					jointPtr.t.x = jointframe1[0];
//					jointPtr.t.y = jointframe1[1];
//					blendPtr.t.x = jointframe2[0];
//					blendPtr.t.y = jointframe2[1];
//					blendPtr.t.z = jointPtr.t.z;
//					jointframe1 += 2;
//					jointframe2 += 2;
//					break;
//				case ANIM_TX|ANIM_TZ:
//					jointPtr.t.x = jointframe1[0];
//					jointPtr.t.z = jointframe1[1];
//					blendPtr.t.x = jointframe2[0];
//					blendPtr.t.z = jointframe2[1];
//					blendPtr.t.y = jointPtr.t.y;
//					jointframe1 += 2;
//					jointframe2 += 2;
//					break;
//				case ANIM_TY|ANIM_TZ:
//					jointPtr.t.y = jointframe1[0];
//					jointPtr.t.z = jointframe1[1];
//					blendPtr.t.y = jointframe2[0];
//					blendPtr.t.z = jointframe2[1];
//					blendPtr.t.x = jointPtr.t.x;
//					jointframe1 += 2;
//					jointframe2 += 2;
//					break;
//				case ANIM_TX|ANIM_TY|ANIM_TZ:
//					jointPtr.t.x = jointframe1[0];
//					jointPtr.t.y = jointframe1[1];
//					jointPtr.t.z = jointframe1[2];
//					blendPtr.t.x = jointframe2[0];
//					blendPtr.t.y = jointframe2[1];
//					blendPtr.t.z = jointframe2[2];
//					jointframe1 += 3;
//					jointframe2 += 3;
//					break;
//			}
//
//			switch( animBits & (ANIM_QX|ANIM_QY|ANIM_QZ) ) {
//				case 0:
//					blendPtr.q = jointPtr.q;
//					break;
//				case ANIM_QX:
//					jointPtr.q.x = jointframe1[0];
//					blendPtr.q.x = jointframe2[0];
//					blendPtr.q.y = jointPtr.q.y;
//					blendPtr.q.z = jointPtr.q.z;
//					jointPtr.q.w = jointPtr.q.CalcW();
//					blendPtr.q.w = blendPtr.q.CalcW();
//					break;
//				case ANIM_QY:
//					jointPtr.q.y = jointframe1[0];
//					blendPtr.q.y = jointframe2[0];
//					blendPtr.q.x = jointPtr.q.x;
//					blendPtr.q.z = jointPtr.q.z;
//					jointPtr.q.w = jointPtr.q.CalcW();
//					blendPtr.q.w = blendPtr.q.CalcW();
//					break;
//				case ANIM_QZ:
//					jointPtr.q.z = jointframe1[0];
//					blendPtr.q.z = jointframe2[0];
//					blendPtr.q.x = jointPtr.q.x;
//					blendPtr.q.y = jointPtr.q.y;
//					jointPtr.q.w = jointPtr.q.CalcW();
//					blendPtr.q.w = blendPtr.q.CalcW();
//					break;
//				case ANIM_QX|ANIM_QY:
//					jointPtr.q.x = jointframe1[0];
//					jointPtr.q.y = jointframe1[1];
//					blendPtr.q.x = jointframe2[0];
//					blendPtr.q.y = jointframe2[1];
//					blendPtr.q.z = jointPtr.q.z;
//					jointPtr.q.w = jointPtr.q.CalcW();
//					blendPtr.q.w = blendPtr.q.CalcW();
//					break;
//				case ANIM_QX|ANIM_QZ:
//					jointPtr.q.x = jointframe1[0];
//					jointPtr.q.z = jointframe1[1];
//					blendPtr.q.x = jointframe2[0];
//					blendPtr.q.z = jointframe2[1];
//					blendPtr.q.y = jointPtr.q.y;
//					jointPtr.q.w = jointPtr.q.CalcW();
//					blendPtr.q.w = blendPtr.q.CalcW();
//					break;
//				case ANIM_QY|ANIM_QZ:
//					jointPtr.q.y = jointframe1[0];
//					jointPtr.q.z = jointframe1[1];
//					blendPtr.q.y = jointframe2[0];
//					blendPtr.q.z = jointframe2[1];
//					blendPtr.q.x = jointPtr.q.x;
//					jointPtr.q.w = jointPtr.q.CalcW();
//					blendPtr.q.w = blendPtr.q.CalcW();
//					break;
//				case ANIM_QX|ANIM_QY|ANIM_QZ:
//					jointPtr.q.x = jointframe1[0];
//					jointPtr.q.y = jointframe1[1];
//					jointPtr.q.z = jointframe1[2];
//					blendPtr.q.x = jointframe2[0];
//					blendPtr.q.y = jointframe2[1];
//					blendPtr.q.z = jointframe2[2];
//					jointPtr.q.w = jointPtr.q.CalcW();
//					blendPtr.q.w = blendPtr.q.CalcW();
//					break;
//			}
//		}
//	}
//
//	SIMDProcessor.BlendJoints( joints, blendJoints, frame.backlerp, lerpIndex, numLerpJoints );
//
//	if ( frame.cycleCount ) {
//		joints[ 0 ].t += totaldelta * ( float )frame.cycleCount;
//	}
	}

///*
//====================
//idMD5Anim::GetSingleFrame
//====================
//*/
//void idMD5Anim::GetSingleFrame( framenum/*int*/:number, idJointQuat *joints, const int *index, int numIndexes ) const {
//	int						i;
//	const float				*frame;
//	const float				*jointframe;
//	int						animBits;
//	idJointQuat				*jointPtr;
//	const jointAnimInfo_t	*infoPtr;
//
//	// copy the baseframe
//	SIMDProcessor.Memcpy( joints, baseFrame.Ptr(), baseFrame.Num() * sizeof( baseFrame[ 0 ] ) );
//
//	if ( ( framenum == 0 ) || !numAnimatedComponents ) {
//		// just use the base frame
//		return;
//	}
//
//	frame = &componentFrames[ framenum * numAnimatedComponents ];
//
//	for ( i = 0; i < numIndexes; i++ ) {
//		int j = index[i];
//		jointPtr = &joints[j];
//		infoPtr = &jointInfo[j];
//
//		animBits = infoPtr.animBits;
//		if ( animBits ) {
//
//			jointframe = frame + infoPtr.firstComponent;
//
//			if ( animBits & (ANIM_TX|ANIM_TY|ANIM_TZ) ) {
//
//				if ( animBits & ANIM_TX ) {
//					jointPtr.t.x = *jointframe++;
//				}
//
//				if ( animBits & ANIM_TY ) {
//					jointPtr.t.y = *jointframe++;
//				}
//
//				if ( animBits & ANIM_TZ ) {
//					jointPtr.t.z = *jointframe++;
//				}
//			}
//
//			if ( animBits & (ANIM_QX|ANIM_QY|ANIM_QZ) ) {
//
//				if ( animBits & ANIM_QX ) {
//					jointPtr.q.x = *jointframe++;
//				}
//
//				if ( animBits & ANIM_QY ) {
//					jointPtr.q.y = *jointframe++;
//				}
//
//				if ( animBits & ANIM_QZ ) {
//					jointPtr.q.z = *jointframe;
//				}
//
//				jointPtr.q.w = jointPtr.q.CalcW();
//			}
//		}
//	}
//}

/*
====================
idMD5Anim::CheckModelHierarchy
====================
*/
	CheckModelHierarchy ( model: idRenderModel ): void {
		var /*int	*/i: number;
		var /*int	*/ jointNum: number;
		var /*int	*/ parent: number;
		todoThrow ( );
		//if ( jointInfo.Num() != model.NumJoints() ) {
		//	gameLocal.Error( "Model '%s' has different # of joints than anim '%s'", model.Name(), name.c_str() );
		//}

		//const idMD5Joint *modelJoints = model.GetJoints();
		//for( i = 0; i < jointInfo.Num(); i++ ) {
		//	jointNum = jointInfo[ i ].nameIndex;
		//	if ( modelJoints[ i ].name != animationLib.JointName( jointNum ) ) {
		//		gameLocal.Error( "Model '%s''s joint names don't match anim '%s''s", model.Name(), name.c_str() );
		//	}
		//	if ( modelJoints[ i ].parent ) {
		//		parent = modelJoints[ i ].parent - modelJoints;
		//	} else {
		//		parent = -1;
		//	}
		//	if ( parent != jointInfo[ i ].parentNum ) {
		//		gameLocal.Error( "Model '%s' has different joint hierarchy than anim '%s'", model.Name(), name.c_str() );
		//	}
		//}
	}
}

/*
==============================================================================================

	idAnim

==============================================================================================
*/

class idAnim {
//private:
	modelDef: idDeclModelDef;
	anims = new Array<idMD5Anim>( ANIM_MaxSyncedAnims );
	numAnims: number /*int*/;
	name = new idStr;
	realname = new idStr;
	frameLookup = new idList<frameLookup_t>( frameLookup_t );
	frameCommands = new idList<frameCommand_t>( frameCommand_t );
	flags: animFlags_t;
//
//public:
//								idAnim();
//								idAnim( modelDef:idDeclModelDef, const idAnim *anim );
//								~idAnim();
//
//	void						SetAnim( modelDef:idDeclModelDef, const char *sourcename, const char *animname, int num, const idMD5Anim *md5anims[ ANIM_MaxSyncedAnims ] );
//	const char					*Name( ) const;
//	const char					*FullName( ) const;
//	const idMD5Anim				*MD5Anim( int num ) const;
//	const idDeclModelDef		*ModelDef( ) const;
//	int							Length( ) const;
//	int							NumFrames( ) const;
//	int							NumAnims( ) const;
//	const idVec3				&TotalMovementDelta( ) const;
//	bool						GetOrigin( idVec3 &offset, int animNum, /*int*/time:number, int cyclecount ) const;
//	bool						GetOriginRotation( idQuat &rotation, int animNum, int currentTime, int cyclecount ) const;
//	bool						GetBounds( idBounds &bounds, int animNum, /*int*/time:number, int cyclecount ) const;
//	const char					*AddFrameCommand( const class modelDef:idDeclModelDef, framenum/*int*/:number, src:idLexer, const idDict *def );
//	void						CallFrameCommands( ent:idEntity, int from, int to ) const;
//	bool						HasFrameCommands( ) const;
//
//								// returns first frame (zero based) that command occurs.  returns -1 if not found.
//	int							FindFrameForFrameCommand( frameCommandType_t framecommand, const frameCommand_t **command ) const;
//	void						SetAnimFlags( const animFlags_t &animflags );
//	const animFlags_t			&GetAnimFlags( ) const;


	// Anm_Blend

/*
=====================
idAnim::idAnim
=====================
*/
	constructor ( ) 
	constructor(modelDef: idDeclModelDef, anim: idAnim)
	constructor(modelDef?: idDeclModelDef, anim?: idAnim) {
		if ( arguments.length == 0 ) {
			this.constructor_default ( );
		} else {
			this.constructor_modelAnm (modelDef, anim );
		}
	}

	private constructor_default ( ):void {
		this.modelDef = null;
		this.numAnims = 0;
		//this.memset( anims, 0, sizeof( anims ) );
		this.flags.memset0 ( );
	}

/*
=====================
idAnim::idAnim
=====================
*/
	constructor_modelAnm ( modelDef: idDeclModelDef, anim: idAnim ): void {
		var /*int*/i: number;

		this.modelDef = modelDef;
		this.numAnims = anim.numAnims;
		this.name.opEquals( anim.name );
		this.realname = anim.realname;
		this.flags = anim.flags;

		//memset(this.anims, 0, sizeof(this.anims));


		for ( i = 0; i < this.numAnims; i++ ) {
			this.anims[i] = anim.anims[i];
			this.anims[i].IncreaseRefs ( );
		}

		this.frameLookup.SetNum( anim.frameLookup.Num ( ) );
		memcpyStructs( this.frameLookup, anim.frameLookup, this.frameLookup.Num ( ) /*.MemoryUsed()*/ );

		this.frameCommands.SetNum( anim.frameCommands.Num ( ) );
		for ( i = 0; i < this.frameCommands.Num ( ); i++ ) {
			this.frameCommands[i] = anim.frameCommands[i];
			if ( anim.frameCommands[i].$string ) {
				this.frameCommands[i].$string = new idStr( anim.frameCommands[i].$string );
			}
		}
	}

/*
=====================
idAnim::~idAnim
=====================
*/
	destructor ( ): void {
		var /*int*/i: number;

		for ( i = 0; i < this.numAnims; i++ ) {
			this.anims[i].DecreaseRefs ( );
		}

		for ( i = 0; i < this.frameCommands.Num ( ); i++ ) {
			delete this.frameCommands[i].$string;
		}
	}

/*
=====================
idAnim::SetAnim
=====================
*/
	SetAnim ( modelDef: idDeclModelDef, sourcename: string, animname: string, /*int*/num: number, md5anims: idMD5Anim [ /*ANIM_MaxSyncedAnims*/ ] ) {
		var /*int*/i: number;

		this.modelDef = modelDef;
		todoThrow ( );
		//for( i = 0; i < this.numAnims; i++ ) {
		//	this.anims[ i ].DecreaseRefs();
		//	this.anims[ i ] = null;
		//}

		//assert( ( num > 0 ) && ( num <= ANIM_MaxSyncedAnims ) );
		//this.numAnims	= num;
		//this.realname	.opEquals( sourcename;
		//name		.opEquals( animname;

		//for( i = 0; i < num; i++ ) {
		//	this.anims[ i ] = md5anims[ i ];
		//	this.anims[ i ].IncreaseRefs();
		//}

		//memset( &this.flags, 0, sizeof( this.flags ) );

		//for( i = 0; i < this.frameCommands.Num(); i++ ) {
		//	delete this.frameCommands[ i ].string;
		//}

		//this.frameLookup.Clear();
		//this.frameCommands.Clear();
	}
//
/*
=====================
idAnim::Name
=====================
*/
	Name ( ): string {
		return this.name.data;
	}

/*
=====================
idAnim::FullName
=====================
*/
	FullName ( ): string {
		return this.realname.data;
	}
//
/*
=====================
idAnim::MD5Anim

index 0 will never be NULL.  Any anim >= NumAnims will return NULL.
=====================
*/
	MD5Anim ( /*int*/num: number ): idMD5Anim {
		if ( this.anims == null || this.anims[0] == null ) {
			return null;
		}
		return this.anims[num];
	}

/*
=====================
idAnim::ModelDef
=====================
*/
	ModelDef(): idDeclModelDef {
		return this.modelDef;
	}

/*
=====================
idAnim::Length
=====================
*/
	Length ( ): number {
		if ( !this.anims[0] ) {
			return 0;
		}

		return this.anims[0].Length ( );
	}

/*
=====================
idAnim::NumFrames
=====================
*/
	NumFrames ( ): number {
		if ( !this.anims[0] ) {
			return 0;
		}

		return this.anims[0].NumFrames ( );
	}

/*
=====================
idAnim::NumAnims
=====================
*/
	NumAnims ( ): number {
		return this.numAnims;
	}

/*
//=====================
//idAnim::TotalMovementDelta
//=====================
//*/
//const idVec3 &idAnim::TotalMovementDelta( ) const {
//	if ( !this.anims[ 0 ] ) {
//		return vec3_zero;
//	}
//	
//	return this.anims[ 0 ].TotalMovementDelta();
//}
//
/*
=====================
idAnim::GetOrigin
=====================
*/
	GetOrigin ( offset: idVec3, animNum /*int*/: number, currentTime /*int*/: number, /*int*/ cyclecount: number ): boolean {
		if ( !this.anims[animNum] ) {
			offset.Zero ( );
			return false;
		}

		this.anims[animNum].GetOrigin( offset, currentTime, cyclecount );
		return true;
	}
//
///*
//=====================
//idAnim::GetOriginRotation
//=====================
//*/
//bool idAnim::GetOriginRotation( idQuat &rotation, animNum/*int*/:number, currentTime/*int*/:number, /*int*/ cyclecount:number ) const {
//	if ( !this.anims[ animNum ] ) {
//		rotation.Set( 0.0, 0.0, 0.0, 1.0 );
//		return false;
//	}
//
//	this.anims[ animNum ].GetOriginRotation( rotation, currentTime, cyclecount );
//	return true;
//}

/*
=====================
idAnim::GetBounds
=====================
*/
	GetBounds ( bounds: idBounds, animNum /*int*/: number, currentTime /*int*/: number, /*int*/ cyclecount: number ): boolean {
		if ( !this.anims[animNum] ) {
			return false;
		}

		this.anims[animNum].GetBounds( bounds, currentTime, cyclecount );
		return true;
	}


/*
=====================
idAnim::AddFrameCommand

Returns NULL if no error.
=====================
*/
	AddFrameCommand ( modelDef: idDeclModelDef, framenum /*int*/: number, src: idLexer, def: idDict ): string {
		todoThrow ( );
//	int					i;
//	int					index;
//	idStr				text;
//	idStr				funcname;
//	frameCommand_t		fc;
//	idToken				token;
//	const jointInfo_t	*jointInfo;
//
//	// make sure we're within bounds
//	if ( ( framenum < 1 ) || ( framenum > this.anims[ 0 ].NumFrames() ) ) {
//		return va( "Frame %d out of range", framenum );
//	}
//
//	// frame numbers are 1 based in .def files, but 0 based internally
//	framenum--;
//
//	memset( &fc, 0, sizeof( fc ) );
//
//	if( !src.ReadTokenOnLine( token ) ) {
//		return "Unexpected end of line";
//	}
//	if ( token.data == "call" ) {
//		if( !src.ReadTokenOnLine( token ) ) {
//			return "Unexpected end of line";
//		}
//		fc.type = FC_SCRIPTFUNCTION;
//		fc.function = gameLocal.program.FindFunction( token );
//		if ( !fc.function ) {
//			return va( "Function '%s' not found", token.c_str() );
//		}
//	} else if ( token.data == "object_call" ) {
//		if( !src.ReadTokenOnLine( token ) ) {
//			return "Unexpected end of line";
//		}
//		fc.type = FC_SCRIPTFUNCTIONOBJECT;
//		fc.string = new idStr( token );
//	} else if ( token.data == "event" ) {
//		if( !src.ReadTokenOnLine( token ) ) {
//			return "Unexpected end of line";
//		}
//		fc.type = FC_EVENTFUNCTION;
//		const idEventDef *ev = idEventDef::FindEvent( token );
//		if ( !ev ) {
//			return va( "Event '%s' not found", token.c_str() );
//		}
//		if ( ev.GetNumArgs() != 0 ) {
//			return va( "Event '%s' has arguments", token.c_str() );
//		}
//		fc.string = new idStr( token );
//	} else if ( token.data == "sound" ) {
//		if( !src.ReadTokenOnLine( token ) ) {
//			return "Unexpected end of line";
//		}
//		fc.type = FC_SOUND;
//		if ( !token.Cmpn( "snd_", 4 ) ) {
//			fc.string = new idStr( token );
//		} else {
//			fc.soundShader = declManager.FindSound( token );
//			if ( fc.soundShader.GetState() == declState_t.DS_DEFAULTED ) {
//				gameLocal.Warning( "Sound '%s' not found", token.c_str() );
//			}
//		}
//	} else if ( token.data == "sound_voice" ) {
//		if( !src.ReadTokenOnLine( token ) ) {
//			return "Unexpected end of line";
//		}
//		fc.type = FC_SOUND_VOICE;
//		if ( !token.Cmpn( "snd_", 4 ) ) {
//			fc.string = new idStr( token );
//		} else {
//			fc.soundShader = declManager.FindSound( token );
//			if ( fc.soundShader.GetState() == declState_t.DS_DEFAULTED ) {
//				gameLocal.Warning( "Sound '%s' not found", token.c_str() );
//			}
//		}
//	} else if ( token.data == "sound_voice2" ) {
//		if( !src.ReadTokenOnLine( token ) ) {
//			return "Unexpected end of line";
//		}
//		fc.type = FC_SOUND_VOICE2;
//		if ( !token.Cmpn( "snd_", 4 ) ) {
//			fc.string = new idStr( token );
//		} else {
//			fc.soundShader = declManager.FindSound( token );
//			if ( fc.soundShader.GetState() == declState_t.DS_DEFAULTED ) {
//				gameLocal.Warning( "Sound '%s' not found", token.c_str() );
//			}
//		}
//	} else if ( token.data == "sound_body" ) {
//		if( !src.ReadTokenOnLine( token ) ) {
//			return "Unexpected end of line";
//		}
//		fc.type = FC_SOUND_BODY;
//		if ( !token.Cmpn( "snd_", 4 ) ) {
//			fc.string = new idStr( token );
//		} else {
//			fc.soundShader = declManager.FindSound( token );
//			if ( fc.soundShader.GetState() == declState_t.DS_DEFAULTED ) {
//				gameLocal.Warning( "Sound '%s' not found", token.c_str() );
//			}
//		}
//	} else if ( token.data == "sound_body2" ) {
//		if( !src.ReadTokenOnLine( token ) ) {
//			return "Unexpected end of line";
//		}
//		fc.type = FC_SOUND_BODY2;
//		if ( !token.Cmpn( "snd_", 4 ) ) {
//			fc.string = new idStr( token );
//		} else {
//			fc.soundShader = declManager.FindSound( token );
//			if ( fc.soundShader.GetState() == declState_t.DS_DEFAULTED ) {
//				gameLocal.Warning( "Sound '%s' not found", token.c_str() );
//			}
//		}
//	} else if ( token.data == "sound_body3" ) {
//		if( !src.ReadTokenOnLine( token ) ) {
//			return "Unexpected end of line";
//		}
//		fc.type = FC_SOUND_BODY3;
//		if ( !token.Cmpn( "snd_", 4 ) ) {
//			fc.string = new idStr( token );
//		} else {
//			fc.soundShader = declManager.FindSound( token );
//			if ( fc.soundShader.GetState() == declState_t.DS_DEFAULTED ) {
//				gameLocal.Warning( "Sound '%s' not found", token.c_str() );
//			}
//		}
//	} else if ( token.data == "sound_weapon" ) {
//		if( !src.ReadTokenOnLine( token ) ) {
//			return "Unexpected end of line";
//		}
//		fc.type = FC_SOUND_WEAPON;
//		if ( !token.Cmpn( "snd_", 4 ) ) {
//			fc.string = new idStr( token );
//		} else {
//			fc.soundShader = declManager.FindSound( token );
//			if ( fc.soundShader.GetState() == declState_t.DS_DEFAULTED ) {
//				gameLocal.Warning( "Sound '%s' not found", token.c_str() );
//			}
//		}
//	} else if ( token.data == "sound_global" ) {
//		if( !src.ReadTokenOnLine( token ) ) {
//			return "Unexpected end of line";
//		}
//		fc.type = FC_SOUND_GLOBAL;
//		if ( !token.Cmpn( "snd_", 4 ) ) {
//			fc.string = new idStr( token );
//		} else {
//			fc.soundShader = declManager.FindSound( token );
//			if ( fc.soundShader.GetState() == declState_t.DS_DEFAULTED ) {
//				gameLocal.Warning( "Sound '%s' not found", token.c_str() );
//			}
//		}
//	} else if ( token.data == "sound_item" ) {
//		if( !src.ReadTokenOnLine( token ) ) {
//			return "Unexpected end of line";
//		}
//		fc.type = FC_SOUND_ITEM;
//		if ( !token.Cmpn( "snd_", 4 ) ) {
//			fc.string = new idStr( token );
//		} else {
//			fc.soundShader = declManager.FindSound( token );
//			if ( fc.soundShader.GetState() == declState_t.DS_DEFAULTED ) {
//				gameLocal.Warning( "Sound '%s' not found", token.c_str() );
//			}
//		}
//	} else if ( token.data == "sound_chatter" ) {
//		if( !src.ReadTokenOnLine( token ) ) {
//			return "Unexpected end of line";
//		}
//		fc.type = FC_SOUND_CHATTER;
//		if ( !token.Cmpn( "snd_", 4 ) ) {
//			fc.string = new idStr( token );
//		} else {
//			fc.soundShader = declManager.FindSound( token );
//			if ( fc.soundShader.GetState() == declState_t.DS_DEFAULTED ) {
//				gameLocal.Warning( "Sound '%s' not found", token.c_str() );
//			}
//		}
//	} else if ( token.data == "skin" ) {
//		if( !src.ReadTokenOnLine( token ) ) {
//			return "Unexpected end of line";
//		}
//		fc.type = FC_SKIN;
//		if ( token.data == "none" ) {
//			fc.skin = NULL;
//		} else {
//			fc.skin = declManager.FindSkin( token );
//			if ( !fc.skin ) {
//				return va( "Skin '%s' not found", token.c_str() );
//			}
//		}
//	} else if ( token.data == "fx" ) {
//		if( !src.ReadTokenOnLine( token ) ) {
//			return "Unexpected end of line";
//		}
//		fc.type = FC_FX;
//		if ( !declManager.FindType( DECL_FX, token.c_str() ) ) {
//			return va( "fx '%s' not found", token.c_str() );
//		}
//		fc.string = new idStr( token );
//	} else if ( token.data == "trigger" ) {
//		if( !src.ReadTokenOnLine( token ) ) {
//			return "Unexpected end of line";
//		}
//		fc.type = FC_TRIGGER;
//		fc.string = new idStr( token );
//	} else if ( token.data == "triggerSmokeParticle" ) {
//		if( !src.ReadTokenOnLine( token ) ) {
//			return "Unexpected end of line";
//		}
//		fc.type = FC_TRIGGER_SMOKE_PARTICLE;
//		fc.string = new idStr( token );
//	} else if ( token.data == "melee" ) {
//		if( !src.ReadTokenOnLine( token ) ) {
//			return "Unexpected end of line";
//		}
//		fc.type = FC_MELEE;
//		if ( !gameLocal.FindEntityDef( token.c_str(), false ) ) {
//			return va( "Unknown entityDef '%s'", token.c_str() );
//		}
//		fc.string = new idStr( token );
//	} else if ( token.data == "direct_damage" ) {
//		if( !src.ReadTokenOnLine( token ) ) {
//			return "Unexpected end of line";
//		}
//		fc.type = FC_DIRECTDAMAGE;
//		if ( !gameLocal.FindEntityDef( token.c_str(), false ) ) {
//			return va( "Unknown entityDef '%s'", token.c_str() );
//		}
//		fc.string = new idStr( token );
//	} else if ( token.data == "attack_begin" ) {
//		if( !src.ReadTokenOnLine( token ) ) {
//			return "Unexpected end of line";
//		}
//		fc.type = FC_BEGINATTACK;
//		if ( !gameLocal.FindEntityDef( token.c_str(), false ) ) {
//			return va( "Unknown entityDef '%s'", token.c_str() );
//		}
//		fc.string = new idStr( token );
//	} else if ( token.data == "attack_end" ) {
//		fc.type = FC_ENDATTACK;
//	} else if ( token.data == "muzzle_flash" ) {
//		if( !src.ReadTokenOnLine( token ) ) {
//			return "Unexpected end of line";
//		}
//		if ( ( token != "" ) && !modelDef.FindJoint( token ) ) {
//			return va( "Joint '%s' not found", token.c_str() );
//		}
//		fc.type = FC_MUZZLEFLASH;
//		fc.string = new idStr( token );
//	} else if ( token.data == "muzzle_flash" ) {
//		fc.type = FC_MUZZLEFLASH;
//		fc.string = new idStr( "" );
//	} else if ( token.data == "create_missile" ) {
//		if( !src.ReadTokenOnLine( token ) ) {
//			return "Unexpected end of line";
//		}
//		if ( !modelDef.FindJoint( token ) ) {
//			return va( "Joint '%s' not found", token.c_str() );
//		}
//		fc.type = FC_CREATEMISSILE;
//		fc.string = new idStr( token );
//	} else if ( token.data == "launch_missile" ) {
//		if( !src.ReadTokenOnLine( token ) ) {
//			return "Unexpected end of line";
//		}
//		if ( !modelDef.FindJoint( token ) ) {
//			return va( "Joint '%s' not found", token.c_str() );
//		}
//		fc.type = FC_LAUNCHMISSILE;
//		fc.string = new idStr( token );
//	} else if ( token.data == "fire_missile_at_target" ) {
//		if( !src.ReadTokenOnLine( token ) ) {
//			return "Unexpected end of line";
//		}
//		jointInfo = modelDef.FindJoint( token );
//		if ( !jointInfo ) {
//			return va( "Joint '%s' not found", token.c_str() );
//		}
//		if( !src.ReadTokenOnLine( token ) ) {
//			return "Unexpected end of line";
//		}
//		fc.type = FC_FIREMISSILEATTARGET;
//		fc.string = new idStr( token );
//		fc.index = jointInfo.num;
//	} else if ( token.data == "footstep" ) {
//		fc.type = FC_FOOTSTEP;
//	} else if ( token.data == "leftfoot" ) {
//		fc.type = FC_LEFTFOOT;
//	} else if ( token.data == "rightfoot" ) {
//		fc.type = FC_RIGHTFOOT;
//	} else if ( token.data == "enableEyeFocus" ) {
//		fc.type = FC_ENABLE_EYE_FOCUS;
//	} else if ( token.data == "disableEyeFocus" ) {
//		fc.type = FC_DISABLE_EYE_FOCUS;
//	} else if ( token.data == "disableGravity" ) {
//		fc.type = FC_DISABLE_GRAVITY;
//	} else if ( token.data == "enableGravity" ) {
//		fc.type = FC_ENABLE_GRAVITY;
//	} else if ( token.data == "jump" ) {
//		fc.type = FC_JUMP;
//	} else if ( token.data == "enableClip" ) {
//		fc.type = FC_ENABLE_CLIP;
//	} else if ( token.data == "disableClip" ) {
//		fc.type = FC_DISABLE_CLIP;
//	} else if ( token.data == "enableWalkIK" ) {
//		fc.type = FC_ENABLE_WALK_IK;
//	} else if ( token.data == "disableWalkIK" ) {
//		fc.type = FC_DISABLE_WALK_IK;
//	} else if ( token.data == "enableLegIK" ) {
//		if( !src.ReadTokenOnLine( token ) ) {
//			return "Unexpected end of line";
//		}
//		fc.type = FC_ENABLE_LEG_IK;
//		fc.index = atoi( token );
//	} else if ( token.data == "disableLegIK" ) {
//		if( !src.ReadTokenOnLine( token ) ) {
//			return "Unexpected end of line";
//		}
//		fc.type = FC_DISABLE_LEG_IK;
//		fc.index = atoi( token );
//	} else if ( token.data == "recordDemo" ) {
//		fc.type = FC_RECORDDEMO;
//		if( src.ReadTokenOnLine( token ) ) {
//			fc.string = new idStr( token );
//		}
//	} else if ( token.data == "aviGame" ) {
//		fc.type = FC_AVIGAME;
//		if( src.ReadTokenOnLine( token ) ) {
//			fc.string = new idStr( token );
//		}
//	} else {
//		return va( "Unknown command '%s'", token.c_str() );
//	}
//
//	// check if we've initialized the frame loopup table
//	if ( !this.frameLookup.Num() ) {
//		// we haven't, so allocate the table and initialize it
//		this.frameLookup.SetGranularity( 1 );
//		this.frameLookup.SetNum( this.anims[ 0 ].NumFrames() );
//		for( i = 0; i < this.frameLookup.Num(); i++ ) {
//			this.frameLookup[ i ].num = 0;
//			this.frameLookup[ i ].firstCommand = 0;
//		}
//	}
//
//	// allocate space for a new command
//	this.frameCommands.Alloc();
//
//	// calculate the index of the new command
//	index = this.frameLookup[ framenum ].firstCommand + this.frameLookup[ framenum ].num;
//
//	// move all commands from our index onward up one to give us space for our new command
//	for( i = this.frameCommands.Num() - 1; i > index; i-- ) {
//		this.frameCommands[ i ] = this.frameCommands[ i - 1 ];
//	}
//
//	// fix the indices of any later frames to account for the inserted command
//	for( i = framenum + 1; i < this.frameLookup.Num(); i++ ) {
//		this.frameLookup[ i ].firstCommand++;
//	}
//
//	// store the new command 
//	this.frameCommands[ index ] = fc;
//
//	// increase the number of commands on this frame
//	this.frameLookup[ framenum ].num++;
//
		// return with no error
		return null;
	}
//
///*
//=====================
//idAnim::CallFrameCommands
//=====================
//*/
//void idAnim::CallFrameCommands( ent:idEntity, int from, int to ) const {
//	int index;
//	int end;
//	int frame;
//	int numframes;
//
//	numframes = this.anims[ 0 ].NumFrames();
//
//	frame = from;
//	while( frame != to ) {
//		frame++;
//		if ( frame >= numframes ) {
//			frame = 0;
//		}
//
//		index = this.frameLookup[ frame ].firstCommand;
//		end = index + this.frameLookup[ frame ].num;
//		while( index < end ) {
//			const frameCommand_t &command = this.frameCommands[ index++ ];
//			switch( command.type ) {
//				case FC_SCRIPTFUNCTION: {
//					gameLocal.CallFrameCommand( ent, command.function );
//					break;
//				}
//				case FC_SCRIPTFUNCTIONOBJECT: {
//					gameLocal.CallObjectFrameCommand( ent, command.string.c_str() );
//					break;
//				}
//				case FC_EVENTFUNCTION: {
//					const idEventDef *ev = idEventDef::FindEvent( command.string.c_str() );
//					ent.ProcessEvent( ev );
//					break;
//				}
//				case FC_SOUND: {
//					if ( !command.soundShader ) {
//						if ( !ent.StartSound( command.string.c_str(), SND_CHANNEL_ANY, 0, false, NULL ) ) {
//							gameLocal.Warning( "Framecommand 'sound' on entity '%s', anim '%s', frame %d: Could not find sound '%s'",
//								ent.name.c_str(), FullName(), frame + 1, command.string.c_str() );
//						}
//					} else {
//						ent.StartSoundShader( command.soundShader, SND_CHANNEL_ANY, 0, false, NULL );
//					}
//					break;
//				}
//				case FC_SOUND_VOICE: {
//					if ( !command.soundShader ) {
//						if ( !ent.StartSound( command.string.c_str(), SND_CHANNEL_VOICE, 0, false, NULL ) ) {
//							gameLocal.Warning( "Framecommand 'sound_voice' on entity '%s', anim '%s', frame %d: Could not find sound '%s'",
//								ent.name.c_str(), FullName(), frame + 1, command.string.c_str() );
//						}
//					} else {
//						ent.StartSoundShader( command.soundShader, SND_CHANNEL_VOICE, 0, false, NULL );
//					}
//					break;
//				}
//				case FC_SOUND_VOICE2: {
//					if ( !command.soundShader ) {
//						if ( !ent.StartSound( command.string.c_str(), SND_CHANNEL_VOICE2, 0, false, NULL ) ) {
//							gameLocal.Warning( "Framecommand 'sound_voice2' on entity '%s', anim '%s', frame %d: Could not find sound '%s'",
//								ent.name.c_str(), FullName(), frame + 1, command.string.c_str() );
//						}
//					} else {
//						ent.StartSoundShader( command.soundShader, SND_CHANNEL_VOICE2, 0, false, NULL );
//					}
//					break;
//				}
//				case FC_SOUND_BODY: {
//					if ( !command.soundShader ) {
//						if ( !ent.StartSound( command.string.c_str(), SND_CHANNEL_BODY, 0, false, NULL ) ) {
//							gameLocal.Warning( "Framecommand 'sound_body' on entity '%s', anim '%s', frame %d: Could not find sound '%s'",
//								ent.name.c_str(), FullName(), frame + 1, command.string.c_str() );
//						}
//					} else {
//						ent.StartSoundShader( command.soundShader, SND_CHANNEL_BODY, 0, false, NULL );
//					}
//					break;
//				}
//				case FC_SOUND_BODY2: {
//					if ( !command.soundShader ) {
//						if ( !ent.StartSound( command.string.c_str(), SND_CHANNEL_BODY2, 0, false, NULL ) ) {
//							gameLocal.Warning( "Framecommand 'sound_body2' on entity '%s', anim '%s', frame %d: Could not find sound '%s'",
//								ent.name.c_str(), FullName(), frame + 1, command.string.c_str() );
//						}
//					} else {
//						ent.StartSoundShader( command.soundShader, SND_CHANNEL_BODY2, 0, false, NULL );
//					}
//					break;
//				}
//				case FC_SOUND_BODY3: {
//					if ( !command.soundShader ) {
//						if ( !ent.StartSound( command.string.c_str(), SND_CHANNEL_BODY3, 0, false, NULL ) ) {
//							gameLocal.Warning( "Framecommand 'sound_body3' on entity '%s', anim '%s', frame %d: Could not find sound '%s'",
//								ent.name.c_str(), FullName(), frame + 1, command.string.c_str() );
//						}
//					} else {
//						ent.StartSoundShader( command.soundShader, SND_CHANNEL_BODY3, 0, false, NULL );
//					}
//					break;
//									 }
//				case FC_SOUND_WEAPON: {
//					if ( !command.soundShader ) {
//						if ( !ent.StartSound( command.string.c_str(), SND_CHANNEL_WEAPON, 0, false, NULL ) ) {
//							gameLocal.Warning( "Framecommand 'sound_weapon' on entity '%s', anim '%s', frame %d: Could not find sound '%s'",
//								ent.name.c_str(), FullName(), frame + 1, command.string.c_str() );
//						}
//					} else {
//						ent.StartSoundShader( command.soundShader, SND_CHANNEL_WEAPON, 0, false, NULL );
//					}
//					break;
//				}
//				case FC_SOUND_GLOBAL: {
//					if ( !command.soundShader ) {
//						if ( !ent.StartSound( command.string.c_str(), SND_CHANNEL_ANY, SSF_GLOBAL, false, NULL ) ) {
//							gameLocal.Warning( "Framecommand 'sound_global' on entity '%s', anim '%s', frame %d: Could not find sound '%s'",
//								ent.name.c_str(), FullName(), frame + 1, command.string.c_str() );
//						}
//					} else {
//						ent.StartSoundShader( command.soundShader, SND_CHANNEL_ANY, SSF_GLOBAL, false, NULL );
//					}
//					break;
//				}
//				case FC_SOUND_ITEM: {
//					if ( !command.soundShader ) {
//						if ( !ent.StartSound( command.string.c_str(), SND_CHANNEL_ITEM, 0, false, NULL ) ) {
//							gameLocal.Warning( "Framecommand 'sound_item' on entity '%s', anim '%s', frame %d: Could not find sound '%s'",
//								ent.name.c_str(), FullName(), frame + 1, command.string.c_str() );
//						}
//					} else {
//						ent.StartSoundShader( command.soundShader, SND_CHANNEL_ITEM, 0, false, NULL );
//					}
//					break;
//				}
//				case FC_SOUND_CHATTER: {
//					if ( ent.CanPlayChatterSounds() ) {
//						if ( !command.soundShader ) {
//							if ( !ent.StartSound( command.string.c_str(), SND_CHANNEL_VOICE, 0, false, NULL ) ) {
//								gameLocal.Warning( "Framecommand 'sound_chatter' on entity '%s', anim '%s', frame %d: Could not find sound '%s'",
//									ent.name.c_str(), FullName(), frame + 1, command.string.c_str() );
//							}
//						} else {
//							ent.StartSoundShader( command.soundShader, SND_CHANNEL_VOICE, 0, false, NULL );
//						}
//					}
//					break;
//				}
//				case FC_FX: {
//					idEntityFx::StartFx( command.string.c_str(), NULL, NULL, ent, true );
//					break;
//				}
//				case FC_SKIN: {
//					ent.SetSkin( command.skin );
//					break;
//				}
//				case FC_TRIGGER: {
//					idEntity *target;
//
//					target = gameLocal.FindEntity( command.string.c_str() );
//					if ( target ) {
//						target.Signal( SIG_TRIGGER );
//						target.ProcessEvent( &EV_Activate, ent );
//						target.TriggerGuis();
//					} else {
//						gameLocal.Warning( "Framecommand 'trigger' on entity '%s', anim '%s', frame %d: Could not find entity '%s'",
//							ent.name.c_str(), FullName(), frame + 1, command.string.c_str() );
//					}
//					break;
//				}
//				case FC_TRIGGER_SMOKE_PARTICLE: {
//					ent.ProcessEvent( &AI_TriggerParticles, command.string.c_str() );
//					break;
//				}
//				case FC_MELEE: {
//					ent.ProcessEvent( &AI_AttackMelee, command.string.c_str() );
//					break;
//				}
//				case FC_DIRECTDAMAGE: {
//					ent.ProcessEvent( &AI_DirectDamage, command.string.c_str() );
//					break;
//				}
//				case FC_BEGINATTACK: {
//					ent.ProcessEvent( &AI_BeginAttack, command.string.c_str() );
//					break;
//				}
//				case FC_ENDATTACK: {
//					ent.ProcessEvent( &AI_EndAttack );
//					break;
//				}
//				case FC_MUZZLEFLASH: {
//					ent.ProcessEvent( &AI_MuzzleFlash, command.string.c_str() );
//					break;
//				}
//				case FC_CREATEMISSILE: {
//					ent.ProcessEvent( &AI_CreateMissile, command.string.c_str() );
//					break;
//				}
//				case FC_LAUNCHMISSILE: {
//					ent.ProcessEvent( &AI_AttackMissile, command.string.c_str() );
//					break;
//				}
//				case FC_FIREMISSILEATTARGET: {
//					ent.ProcessEvent( &AI_FireMissileAtTarget, modelDef.GetJointName( command.index ), command.string.c_str() );
//					break;
//				}
//				case FC_FOOTSTEP : {
//					ent.ProcessEvent( &EV_Footstep );
//					break;
//				}
//				case FC_LEFTFOOT: {
//					ent.ProcessEvent( &EV_FootstepLeft );
//					break;
//				}
//				case FC_RIGHTFOOT: {
//					ent.ProcessEvent( &EV_FootstepRight );
//					break;
//				}
//				case FC_ENABLE_EYE_FOCUS: {
//					ent.ProcessEvent( &AI_EnableEyeFocus );
//					break;
//				}
//				case FC_DISABLE_EYE_FOCUS: {
//					ent.ProcessEvent( &AI_DisableEyeFocus );
//					break;
//				}
//				case FC_DISABLE_GRAVITY: {
//					ent.ProcessEvent( &AI_DisableGravity );
//					break;
//				}
//				case FC_ENABLE_GRAVITY: {
//					ent.ProcessEvent( &AI_EnableGravity );
//					break;
//				}
//				case FC_JUMP: {
//					ent.ProcessEvent( &AI_JumpFrame );
//					break;
//				}
//				case FC_ENABLE_CLIP: {
//					ent.ProcessEvent( &AI_EnableClip );
//					break;
//				}
//				case FC_DISABLE_CLIP: {
//					ent.ProcessEvent( &AI_DisableClip );
//					break;
//				}
//				case FC_ENABLE_WALK_IK: {
//					ent.ProcessEvent( &EV_EnableWalkIK );
//					break;
//				}
//				case FC_DISABLE_WALK_IK: {
//					ent.ProcessEvent( &EV_DisableWalkIK );
//					break;
//				}
//				case FC_ENABLE_LEG_IK: {
//					ent.ProcessEvent( &EV_EnableLegIK, command.index );
//					break;
//				}
//				case FC_DISABLE_LEG_IK: {
//					ent.ProcessEvent( &EV_DisableLegIK, command.index );
//					break;
//				}
//				case FC_RECORDDEMO: {
//					if ( command.string ) {
//						cmdSystem.BufferCommandText( CMD_EXEC_NOW, va( "recordDemo %s", command.string.c_str() ) );
//					} else {
//						cmdSystem.BufferCommandText( CMD_EXEC_NOW, "stoprecording" );
//					}
//					break;
//				}
//				case FC_AVIGAME: {
//					if ( command.string ) {
//						cmdSystem.BufferCommandText( CMD_EXEC_NOW, va( "aviGame %s", command.string.c_str() ) );
//					} else {
//						cmdSystem.BufferCommandText( CMD_EXEC_NOW, "aviGame" );
//					}
//					break;
//				}
//			}
//		}
//	}
//}
//
///*
//=====================
//idAnim::FindFrameForFrameCommand
//=====================
//*/
//int	idAnim::FindFrameForFrameCommand( frameCommandType_t framecommand, const frameCommand_t **command ) const {
//	int frame;
//	int index;
//	int numframes;
//	int end;
//
//	if ( !this.frameCommands.Num() ) {
//		return -1;
//	}
//
//	numframes = this.anims[ 0 ].NumFrames();
//	for( frame = 0; frame < numframes; frame++ ) {
//		end = this.frameLookup[ frame ].firstCommand + this.frameLookup[ frame ].num;
//		for( index = this.frameLookup[ frame ].firstCommand; index < end; index++ ) {
//			if ( this.frameCommands[ index ].type == framecommand ) {
//				if ( command ) {
//					*command = &this.frameCommands[ index ];
//				}
//				return frame;
//			}
//		}
//	}
//
//	if ( command ) {
//		*command = NULL;
//	}
//
//	return -1;
//}
//
///*
//=====================
//idAnim::HasFrameCommands
//=====================
//*/
//bool idAnim::HasFrameCommands( ) const {
//	if ( !this.frameCommands.Num() ) {
//		return false;
//	}
//	return true;
//}
//
/*
=====================
idAnim::SetAnimFlags
=====================
*/
	SetAnimFlags ( animflags: animFlags_t ) {
		this.flags = animflags;
	}

/*
=====================
idAnim::GetAnimFlags
=====================
*/
	GetAnimFlags ( ): animFlags_t {
		return this.flags;
	}

}


/*
==============================================================================================

	idAnimBlend

==============================================================================================
*/

class idAnimBlend {
//private:
	modelDef:idDeclModelDef;
	starttime :number/*int*/;
	endtime:number/*int*/;
	timeOffset:number/*int*/;
	rate:number/*float*/;
	
	blendStartTime:number/*int*/;
	blendDuration:number/*int*/;
	blendStartValue :number/*float*/;
	blendEndValue:number/*float*/;

	animWeights = new Float32Array( ANIM_MaxSyncedAnims );
	cycle:number/*short*/;
	frame:number/*short*/;
	animNum:number/*short*/;
	allowMove:boolean;
	allowFrameCommands:boolean;
//
//	friend class				idAnimator;
//
//	void						Reset( const idDeclModelDef *_modelDef );
//	void						CallFrameCommands( ent:idEntity, int fromtime, int totime ) const;
//	void						SetFrame( modelDef:idDeclModelDef, int animnum, int frame, int currenttime, int blendtime );
//	void						CycleAnim( modelDef:idDeclModelDef, int animnum, int currenttime, int blendtime );
//	void						PlayAnim( modelDef:idDeclModelDef, int animnum, int currenttime, int blendtime );
//	bool						BlendAnim( int currentTime, int channel, int numJoints, idJointQuat *blendFrame, float &blendWeight, bool removeOrigin, bool overrideBlend, bool printInfo ) const;
//	void						BlendOrigin( int currentTime, idVec3 &blendPos, float &blendWeight, bool removeOriginOffset ) const;
//	void						BlendDelta( int fromtime, int totime, idVec3 &blendDelta, float &blendWeight ) const;
//	void						BlendDeltaRotation( int fromtime, int totime, idQuat &blendDelta, float &blendWeight ) const;
//	bool						AddBounds( int currentTime, idBounds &bounds, bool removeOriginOffset ) const;
//
//public:
//								idAnimBlend();
//	void						Save ( savefile: idSaveGame ): void { throw "placeholder"; }
//	void						Restore( idRestoreGame *savefile, modelDef:idDeclModelDef );
//	const char					*AnimName( ) const;
//	const char					*AnimFullName( ) const;
//	float						GetWeight( int currenttime ) const;
//	float						GetFinalWeight( ) const;
//	void						SetWeight( float newweight, int currenttime, int blendtime );
//	int							NumSyncedAnims( ) const;
//	bool						SetSyncedAnimWeight( int num, float weight );
//	void						Clear( int currentTime, int clearTime );
//	bool						IsDone( int currentTime ) const;
//	bool						FrameHasChanged( int currentTime ) const;
//	int							GetCycleCount( ) const;
//	void						SetCycleCount( int count );
//	void						SetPlaybackRate( int currentTime, float newRate );
//	float						GetPlaybackRate( ) const;
//	void						SetStartTime( int startTime );
//	int							GetStartTime( ) const;
//	int							GetEndTime( ) const;
//	int							GetFrameNumber( int currenttime ) const;
//	int							AnimTime( int currenttime ) const;
//	int							NumFrames( ) const;
//	int							Length( ) const;
//	int							PlayLength( ) const;
//	void						AllowMovement( bool allow );
//	void						AllowFrameCommands( bool allow );
//	const idAnim				*Anim( ) const;
//	int							AnimNum( ) const;

// Anim_Blend


/*
=====================
idAnimBlend::idAnimBlend
=====================
*/
	constructor ( ) {
		this.Reset( null );
	}

///*
//=====================
//idAnimBlend::Save
//
//archives object for save game file
//=====================
//*/
//void idAnimBlend::Save( idSaveGame *savefile ) const {
//	var/*int*/i:number;
//
//	savefile.WriteInt( this.starttime );
//	savefile.WriteInt( this.endtime );
//	savefile.WriteInt( this.timeOffset );
//	savefile.WriteFloat( this.rate );
//
//	savefile.WriteInt( this.blendStartTime );
//	savefile.WriteInt( this.blendDuration );
//	savefile.WriteFloat( this.blendStartValue );
//	savefile.WriteFloat( this.blendEndValue );
//
//	for( i = 0; i < ANIM_MaxSyncedAnims; i++ ) {
//		savefile.WriteFloat( this.animWeights[ i ] );
//	}
//	savefile.WriteShort( this.cycle );
//	savefile.WriteShort( frame );
//	savefile.WriteShort( this.animNum );
//	savefile.WriteBool( this.allowMove );
//	savefile.WriteBool( allowFrameCommands );
//}
//
///*
//=====================
//idAnimBlend::Restore
//
//unarchives object from save game file
//=====================
//*/
//void idAnimBlend::Restore( idRestoreGame *savefile, modelDef:idDeclModelDef ) {
//	int	i;
//
//	this.modelDef = modelDef;
//
//	savefile.ReadInt( this.starttime );
//	savefile.ReadInt( this.endtime );
//	savefile.ReadInt( this.timeOffset );
//	savefile.ReadFloat( this.rate );
//
//	savefile.ReadInt( this.blendStartTime );
//	savefile.ReadInt( this.blendDuration );
//	savefile.ReadFloat( this.blendStartValue );
//	savefile.ReadFloat( this.blendEndValue );
//
//	for( i = 0; i < ANIM_MaxSyncedAnims; i++ ) {
//		savefile.ReadFloat( this.animWeights[ i ] );
//	}
//	savefile.ReadShort( this.cycle );
//	savefile.ReadShort( frame );
//	savefile.ReadShort( this.animNum );
//	if ( !modelDef ) {
//		this.animNum = 0;
//	} else if ( ( this.animNum < 0 ) || ( this.animNum > modelDef.NumAnims() ) ) {
//		gameLocal.Warning( "Anim number %d out of range for model '%s' during save game", this.animNum, modelDef.GetModelName() );
//		this.animNum = 0;
//	}
//	savefile.ReadBool( this.allowMove );
//	savefile.ReadBool( allowFrameCommands );
//}
//
/*
=====================
idAnimBlend::Reset
=====================
*/
	Reset ( _modelDef: idDeclModelDef ): void {
		this.modelDef = _modelDef;
		this.cycle = 1;
		this.starttime = 0;
		this.endtime = 0;
		this.timeOffset = 0;
		this.rate = 1.0;
		this.frame = 0;
		this.allowMove = true;
		this.allowFrameCommands = true;
		this.animNum = 0;

		memset( this.animWeights, 0, sizeof( this.animWeights ) );

		this.blendStartValue = 0.0;
		this.blendEndValue = 0.0;
		this.blendStartTime = 0;
		this.blendDuration = 0;
	}

///*
//=====================
//idAnimBlend::FullName
//=====================
//*/
//const char *idAnimBlend::AnimFullName( ) const {
//	var anim = this.Anim();
//	if ( !anim ) {
//		return "";
//	}
//
//	return anim.FullName();
//}
//
///*
//=====================
//idAnimBlend::AnimName
//=====================
//*/
//const char *idAnimBlend::AnimName( ) const {
//	var anim = this.Anim();
//	if ( !anim ) {
//		return "";
//	}
//
//	return anim.Name();
//}
//
///*
//=====================
//idAnimBlend::NumFrames
//=====================
//*/
//int idAnimBlend::NumFrames( ) const {
//	var anim = this.Anim();
//	if ( !anim ) {
//		return 0;
//	}
//
//	return anim.NumFrames();
//}
//
///*
//=====================
//idAnimBlend::Length
//=====================
//*/
//int	idAnimBlend::Length( ) const {
//	var anim = this.Anim();
//	if ( !anim ) {
//		return 0;
//	}
//
//	return anim.Length();
//}
//
/*
=====================
idAnimBlend::GetWeight
=====================
*/
	GetWeight ( currentTime /*int*/: number ): number /*float*/ {
		var /*int		*/timeDelta: number;
		var frac: number /*float*/;
		var w: number /*float*/;

		timeDelta = currentTime - this.blendStartTime;
		if ( timeDelta <= 0 ) {
			w = this.blendStartValue;
		} else if ( timeDelta >= this.blendDuration ) {
			w = this.blendEndValue;
		} else {
			frac = timeDelta / this.blendDuration;
			w = this.blendStartValue + ( this.blendEndValue - this.blendStartValue ) * frac;
		}

		return w;
	}

///*
//=====================
//idAnimBlend::GetFinalWeight
//=====================
//*/
//float idAnimBlend::GetFinalWeight( ) const {
//	return this.blendEndValue;
//}

/*
=====================
idAnimBlend::SetWeight
=====================
*/
SetWeight( /*float */newweight:number, currentTime/*int*/:number, blendTime/*int*/:number ) :void{
	this.blendStartValue = this.GetWeight( currentTime );
	this.blendEndValue = newweight;
    this.blendStartTime = currentTime - 1;
	this.blendDuration = blendTime;

	if ( !newweight ) {
		this.endtime = currentTime + blendTime;
	}
}
//
///*
//=====================
//idAnimBlend::NumSyncedAnims
//=====================
//*/
//int idAnimBlend::NumSyncedAnims( ) const {
//	var anim = this.Anim();
//	if ( !anim ) {
//		return 0;
//	}
//
//	return anim.NumAnims();
//}
//
///*
//=====================
//idAnimBlend::SetSyncedAnimWeight
//=====================
//*/
//bool idAnimBlend::SetSyncedAnimWeight( /*int*/num:number, float weight ) {
//	var anim = this.Anim();
//	if ( !anim ) {
//		return false;
//	}
//
//	if ( ( num < 0 ) || ( num > anim.NumAnims() ) ) {
//		return false;
//	}
//
//	this.animWeights[ num ] = weight;
//	return true;
//}
//
///*
//=====================
//idAnimBlend::SetFrame
//=====================
//*/
//void idAnimBlend::SetFrame( modelDef:idDeclModelDef, int _animNum, int _frame, currentTime/*int*/:number, blendTime/*int*/:number ) {
//	this.Reset( modelDef );
//	if ( !modelDef ) {
//		return;
//	}
//	
//	const idAnim *_anim = modelDef.GetAnim( _animNum );
//	if ( !_anim ) {
//		return;
//	}
//
//	const idMD5Anim *md5anim = _anim.MD5Anim( 0 );
//	if ( modelDef.Joints().Num() != md5anim.NumJoints() ) {
//		gameLocal.Warning( "Model '%s' has different # of joints than anim '%s'", modelDef.GetModelName(), md5anim.Name() );
//		return;
//	}
//	
//	this.animNum				= _animNum;
//	this.starttime			= currentTime;
//	this.endtime				= -1;
//	this.cycle				= -1;
//	this.animWeights[ 0 ]	= 1.0;
//	frame				= _frame;
//
//	// a frame of 0 means it's not a single frame blend, so we set it to frame + 1
//	if ( frame <= 0 ) {
//		frame = 1;
//	} else if ( frame > _anim.NumFrames() ) {
//		frame = _anim.NumFrames();
//	}
//
//	// set up blend
//	this.blendEndValue		= 1.0;
//	this.blendStartTime		= currentTime - 1;
//	this.blendDuration		= blendTime;
//	this.blendStartValue		= 0.0;
//}
//
///*
//=====================
//idAnimBlend::CycleAnim
//=====================
//*/
//void idAnimBlend::CycleAnim( modelDef:idDeclModelDef, int _animNum, currentTime/*int*/:number, blendTime/*int*/:number ) {
//	this.Reset( modelDef );
//	if ( !modelDef ) {
//		return;
//	}
//	
//	const idAnim *_anim = modelDef.GetAnim( _animNum );
//	if ( !_anim ) {
//		return;
//	}
//
//	const idMD5Anim *md5anim = _anim.MD5Anim( 0 );
//	if ( modelDef.Joints().Num() != md5anim.NumJoints() ) {
//		gameLocal.Warning( "Model '%s' has different # of joints than anim '%s'", modelDef.GetModelName(), md5anim.Name() );
//		return;
//	}
//
//	this.animNum				= _animNum;
//	this.animWeights[ 0 ]	= 1.0;
//	this.endtime				= -1;
//	this.cycle				= -1;
//	if ( _anim.GetAnimFlags().random_cycle_start ) {
//		// start the animation at a random time so that characters don't walk in sync
//		this.starttime = currentTime - gameLocal.random.RandomFloat() * _anim.Length();
//	} else {
//		this.starttime = currentTime;
//	}
//
//	// set up blend
//	this.blendEndValue		= 1.0;
//	this.blendStartTime		= currentTime - 1;
//	this.blendDuration		= blendTime;
//	this.blendStartValue		= 0.0;
//}
//
///*
//=====================
//idAnimBlend::PlayAnim
//=====================
//*/
//void idAnimBlend::PlayAnim( modelDef:idDeclModelDef, int _animNum, currentTime/*int*/:number, blendTime/*int*/:number ) {
//	this.Reset( modelDef );
//	if ( !modelDef ) {
//		return;
//	}
//	
//	const idAnim *_anim = modelDef.GetAnim( _animNum );
//	if ( !_anim ) {
//		return;
//	}
//
//	const idMD5Anim *md5anim = _anim.MD5Anim( 0 );
//	if ( modelDef.Joints().Num() != md5anim.NumJoints() ) {
//		gameLocal.Warning( "Model '%s' has different # of joints than anim '%s'", modelDef.GetModelName(), md5anim.Name() );
//		return;
//	}
//
//	this.animNum				= _animNum;
//	this.starttime			= currentTime;
//	this.endtime				= this.starttime + _anim.Length();
//	this.cycle				= 1;
//	this.animWeights[ 0 ]	= 1.0;
//
//	// set up blend
//	this.blendEndValue		= 1.0;
//	this.blendStartTime		= currentTime - 1;
//	this.blendDuration		= blendTime;
//	this.blendStartValue		= 0.0;
//}

/*
=====================
idAnimBlend::Clear
=====================
*/
Clear( currentTime/*int*/:number, /*int */clearTime :number):void {
	if ( !clearTime ) {
		this.Reset( this.modelDef );
	} else {
		this.SetWeight( 0.0, currentTime, clearTime );
	}
}
//
///*
//=====================
//idAnimBlend::IsDone
//=====================
//*/
//bool idAnimBlend::IsDone( currentTime/*int*/:number ) const {
//	if ( !frame && ( this.endtime > 0 ) && ( currentTime >= this.endtime ) ) {
//		return true;
//	}
//
//	if ( ( this.blendEndValue <= 0.0 ) && ( currentTime >= ( this.blendStartTime + this.blendDuration ) ) ) {
//		return true;
//	}
//
//	return false;
//}
//
///*
//=====================
//idAnimBlend::FrameHasChanged
//=====================
//*/
//bool idAnimBlend::FrameHasChanged( currentTime/*int*/:number ) const {
//	// if we don't have an anim, no change
//	if ( !this.animNum ) {
//		return false;
//	}
//
//	// if anim is done playing, no change
//	if ( ( this.endtime > 0 ) && ( currentTime > this.endtime ) ) {
//		return false;
//	}
//
//	// if our blend weight changes, we need to update
//	if ( ( currentTime < ( this.blendStartTime + this.blendDuration ) && ( this.blendStartValue != this.blendEndValue ) ) ) {
//		return true;
//	}
//
//	// if we're a single frame anim and this isn't the frame we started on, we don't need to update
//	if ( ( frame || ( NumFrames() == 1 ) ) && ( currentTime != this.starttime ) ) {
//		return false;
//	}
//
//	return true;
//}

/*
=====================
idAnimBlend::GetCycleCount
=====================
*/
	GetCycleCount ( ): number {
		return this.cycle;
	}

///*
//=====================
//idAnimBlend::SetCycleCount
//=====================
//*/
//void idAnimBlend::SetCycleCount( int count ) {
//	var anim = this.Anim();
//
//	if ( !anim ) {
//		this.cycle = -1;
//		this.endtime = 0;
//	} else {
//		this.cycle = count;
//		if ( this.cycle < 0 ) {
//			this.cycle = -1;
//			this.endtime	= -1;
//		} else if ( this.cycle == 0 ) {
//			this.cycle = 1;
//
//			// most of the time we're running at the original frame rate, so avoid the int-to-float-to-int conversion
//			if ( this.rate == 1.0 ) {
//				this.endtime	= this.starttime - this.timeOffset + anim.Length();
//			} else if ( this.rate != 0.0 ) {
//				this.endtime	= this.starttime - this.timeOffset + anim.Length() / this.rate;
//			} else {
//				this.endtime = -1;
//			}
//		} else {
//			// most of the time we're running at the original frame rate, so avoid the int-to-float-to-int conversion
//			if ( this.rate == 1.0 ) {
//				this.endtime	= this.starttime - this.timeOffset + anim.Length() * this.cycle;
//			} else if ( this.rate != 0.0 ) {
//				this.endtime	= this.starttime - this.timeOffset + ( anim.Length() * this.cycle ) / this.rate;
//			} else {
//				this.endtime = -1;
//			}
//		}
//	}
//}
//
///*
//=====================
//idAnimBlend::SetPlaybackRate
//=====================
//*/
//void idAnimBlend::SetPlaybackRate( currentTime/*int*/:number, float newRate ) {
//	int animTime;
//
//	if ( this.rate == newRate ) {
//		return;
//	}
//
//	animTime = this.AnimTime( currentTime );
//	if ( newRate == 1.0 ) {
//		this.timeOffset = animTime - ( currentTime - this.starttime );
//	} else {
//		this.timeOffset = animTime - ( currentTime - this.starttime ) * newRate;
//	}
//
//	this.rate = newRate;
//
//	// update the anim endtime
//	SetCycleCount( this.cycle );
//}

/*
=====================
idAnimBlend::GetPlaybackRate
=====================
*/
	GetPlaybackRate ( ): number /*float*/ {
		return this.rate;
	}

///*
//=====================
//idAnimBlend::SetStartTime
//=====================
//*/
//void idAnimBlend::SetStartTime( int _startTime ) {
//	this.starttime = _startTime;
//
//	// update the anim endtime
//	SetCycleCount( this.cycle );
//}
//
///*
//=====================
//idAnimBlend::GetStartTime
//=====================
//*/
//int idAnimBlend::GetStartTime( ) const {
//	if ( !this.animNum ) {
//		return 0;
//	}
//
//	return this.starttime;
//}
//
///*
//=====================
//idAnimBlend::GetEndTime
//=====================
//*/
//int idAnimBlend::GetEndTime( ) const {
//	if ( !this.animNum ) {
//		return 0;
//	}
//
//	return this.endtime;
//}
//
///*
//=====================
//idAnimBlend::PlayLength
//=====================
//*/
//int idAnimBlend::PlayLength( ) const {
//	if ( !this.animNum ) {
//		return 0;
//	}
//
//	if ( this.endtime < 0 ) {
//		return -1;
//	}
//
//	return this.endtime - this.starttime + this.timeOffset;
//}
//
///*
//=====================
//idAnimBlend::AllowMovement
//=====================
//*/
//void idAnimBlend::AllowMovement( bool allow ) {
//	this.allowMove = allow;
//}
//
///*
//=====================
//idAnimBlend::AllowFrameCommands
//=====================
//*/
//void idAnimBlend::AllowFrameCommands( bool allow ) {
//	allowFrameCommands = allow;
//}


/*
=====================
idAnimBlend::Anim
=====================
*/
	Anim ( ): idAnim {
		if ( !this.modelDef ) {
			return null;
		}

		var anim = this.modelDef.GetAnim_index( this.animNum );
		return anim;
	}
//
///*
//=====================
//idAnimBlend::AnimNum
//=====================
//*/
//int idAnimBlend::AnimNum( ) const {
//	return this.animNum;
//}

/*
=====================
idAnimBlend::AnimTime
=====================
*/
	AnimTime ( currentTime /*int*/: number ): number /*int*/ {
		var /*int*/time:number;
		var /*int */length: number;
		var anim = this.Anim ( );

		if ( anim ) {
			if ( this.frame ) {
				return FRAME2MS( this.frame - 1 );
			}

			// most of the time we're running at the original frame rate, so avoid the int-to-float-to-int conversion
			if ( this.rate == 1.0 ) {
				time = currentTime - this.starttime + this.timeOffset;
			} else {
				time =/* static_cast<int>*/int( ( currentTime - this.starttime ) * this.rate ) + this.timeOffset;
			}

			// given enough time, we can easily wrap time around in our frame calculations, so
			// keep cycling animations' time within the length of the anim.
			length = anim.Length ( );
			if ( ( this.cycle < 0 ) && ( length > 0 ) ) {
				time %= length;

				// time will wrap after 24 days (oh no!), resulting in negative results for the %.
				// adding the length gives us the proper result.
				if ( time < 0 ) {
					time += length;
				}
			}
			return time;
		} else {
			return 0;
		}
	}
//
///*
//=====================
//idAnimBlend::GetFrameNumber
//=====================
//*/
//int idAnimBlend::GetFrameNumber( currentTime/*int*/:number ) const {
//	const idMD5Anim	*md5anim;
//	frameBlend_t	frameinfo;
//	int				animTime;
//
//	var anim = this.Anim();
//	if ( !anim ) {
//		return 1;
//	}
//
//	if ( this.frame ) {
//		return this.frame;
//	}
//
//	md5anim = anim.MD5Anim( 0 );
//	animTime = this.AnimTime( currentTime );
//	md5anim.ConvertTimeToFrame( animTime, this.cycle, frameinfo );
//
//	return frameinfo.frame1 + 1;
//}
//
///*
//=====================
//idAnimBlend::CallFrameCommands
//=====================
//*/
//void idAnimBlend::CallFrameCommands( ent:idEntity, int fromtime, int totime ) const {
//	const idMD5Anim	*md5anim;
//	frameBlend_t	frame1;
//	frameBlend_t	frame2;
//	int				fromFrameTime;
//	int				toFrameTime;
//
//	if ( !allowFrameCommands || !ent || this.frame || ( ( this.endtime > 0 ) && ( fromtime > this.endtime ) ) ) {
//		return;
//	}
//
//	var anim = this.Anim();
//	if ( !anim || !anim.HasFrameCommands() ) {
//		return;
//	}
//
//	if ( totime <= this.starttime ) {
//		// don't play until next frame or we'll play commands twice.
//		// this happens on the player sometimes.
//		return;
//	}
//
//	fromFrameTime	= this.AnimTime( fromtime );
//	toFrameTime		= this.AnimTime( totime );
//	if ( toFrameTime < fromFrameTime ) {
//		toFrameTime += anim.Length();
//	}
//
//	md5anim = anim.MD5Anim( 0 );
//	md5anim.ConvertTimeToFrame( fromFrameTime, this.cycle, frame1 );
//	md5anim.ConvertTimeToFrame( toFrameTime, this.cycle, frame2 );
//
//	if ( fromFrameTime <= 0 ) {
//		// make sure first frame is called
//		anim.CallFrameCommands( ent, -1, frame2.frame1 );
//	} else {
//		anim.CallFrameCommands( ent, frame1.frame1, frame2.frame1 );
//	}
//}
//
///*
//=====================
//idAnimBlend::BlendAnim
//=====================
//*/
//bool idAnimBlend::BlendAnim( currentTime/*int*/:number, int channel, int numJoints, idJointQuat *blendFrame, float &blendWeight, bool removeOriginOffset, bool overrideBlend, bool printInfo ) const {
//	int				i;
//	float			lerp;
//	float			mixWeight;
//	const idMD5Anim	*md5anim;
//	idJointQuat		*ptr;
//	frameBlend_t	frametime = {0};
//	idJointQuat		*jointFrame;
//	idJointQuat		*mixFrame;
//	int				numAnims;
//	int				time;
//
//	var anim = this.Anim();
//	if ( !anim ) {
//		return false;
//	}
//
//	float weight = this.GetWeight( currentTime );
//	if ( blendWeight > 0.0 ) {
//		if ( ( this.endtime >= 0 ) && ( currentTime >= this.endtime ) ) {
//			return false;
//		}
//		if ( !weight ) {
//			return false;
//		}
//		if ( overrideBlend ) {
//			blendWeight = 1.0 - weight;
//		}
//	}
//
//	if ( ( channel == ANIMCHANNEL_ALL ) && !blendWeight ) {
//		// we don't need a temporary buffer, so just store it directly in the blend frame
//		jointFrame = blendFrame;
//	} else {
//		// allocate a temporary buffer to copy the joints from
//		jointFrame = ( idJointQuat * )_alloca16( numJoints * sizeof( *jointFrame ) );
//	}
//
//	time = this.AnimTime( currentTime );
//
//	numAnims = anim.NumAnims();
//	if ( numAnims == 1 ) {
//		md5anim = anim.MD5Anim( 0 );
//		if ( this.frame ) {
//			md5anim.GetSingleFrame( this.frame - 1, jointFrame, this.modelDef.GetChannelJoints( channel ), this.modelDef.NumJointsOnChannel( channel ) );
//		} else {
//			md5anim.ConvertTimeToFrame( time, this.cycle, frametime );
//			md5anim.GetInterpolatedFrame( frametime, jointFrame, this.modelDef.GetChannelJoints( channel ), this.modelDef.NumJointsOnChannel( channel ) );
//		}
//	} else {
//		//
//		// need to mix the multipoint anim together first
//		//
//		// allocate a temporary buffer to copy the joints to
//		mixFrame = ( idJointQuat * )_alloca16( numJoints * sizeof( *jointFrame ) );
//
//		if ( !this.frame ) {
//			anim.MD5Anim( 0 ).ConvertTimeToFrame( time, this.cycle, frametime );
//		}
//
//		ptr = jointFrame;
//		mixWeight = 0.0;
//		for( i = 0; i < numAnims; i++ ) {
//			if ( this.animWeights[ i ] > 0.0 ) {
//				mixWeight += this.animWeights[ i ];
//				lerp = this.animWeights[ i ] / mixWeight;
//				md5anim = anim.MD5Anim( i );
//				if ( this.frame ) {
//					md5anim.GetSingleFrame( this.frame - 1, ptr, this.modelDef.GetChannelJoints( channel ), this.modelDef.NumJointsOnChannel( channel ) );
//				} else {
//					md5anim.GetInterpolatedFrame( frametime, ptr, this.modelDef.GetChannelJoints( channel ), this.modelDef.NumJointsOnChannel( channel ) );
//				}
//
//				// only blend after the first anim is mixed in
//				if ( ptr != jointFrame ) {
//					SIMDProcessor.BlendJoints( jointFrame, ptr, lerp, this.modelDef.GetChannelJoints( channel ), this.modelDef.NumJointsOnChannel( channel ) );
//				}
//
//				ptr = mixFrame;
//			}
//		}
//
//		if ( !mixWeight ) {
//			return false;
//		}
//	}
//
//	if ( removeOriginOffset ) {
//		if ( this.allowMove ) {
//#ifdef VELOCITY_MOVE
//			jointFrame[ 0 ].t.x = 0.0;
//#else
//			jointFrame[ 0 ].t.Zero();
//#endif
//		}
//
//		if ( anim.GetAnimFlags().anim_turn ) {
//			jointFrame[ 0 ].q.Set( -0.70710677f, 0.0, 0.0, 0.70710677f );
//		}
//	}
//
//	if ( !blendWeight ) {
//		blendWeight = weight;
//		if ( channel != ANIMCHANNEL_ALL ) {
//			const int *index = this.modelDef.GetChannelJoints( channel );
//			const /*int*/num:number = this.modelDef.NumJointsOnChannel( channel );
//			for( i = 0; i < num; i++ ) {
//				int j = index[i];
//				blendFrame[j].t = jointFrame[j].t;
//				blendFrame[j].q = jointFrame[j].q;
//			}
//		}
//    } else {
//		blendWeight += weight;
//		lerp = weight / blendWeight;
//		SIMDProcessor.BlendJoints( blendFrame, jointFrame, lerp, this.modelDef.GetChannelJoints( channel ), this.modelDef.NumJointsOnChannel( channel ) );
//	}
//
//	if ( printInfo ) {
//		if ( this.frame ) {
//			gameLocal.Printf( "  %s: '%s', %d, %.2f%%\n", channelNames[ channel ], anim.FullName(), this.frame, weight * 100.0 );
//		} else {
//			gameLocal.Printf( "  %s: '%s', %.3f, %.2f%%\n", channelNames[ channel ], anim.FullName(), ( float )frametime.frame1 + frametime.backlerp, weight * 100.0 );
//		}
//	}
//
//	return true;
//}

/*
=====================
idAnimBlend::BlendOrigin
=====================
*/
	BlendOrigin ( currentTime: number /*int*/, blendPos: idVec3, /*float &*/blendWeight: R<number>, removeOriginOffset: boolean ): void {
		var /*float	*/lerp: number;
		var animpos = new idVec3;
		var pos = new idVec3;
		var time: number /*int*/;
		var num: number /*int*/;
		var i: number /*int*/;

		if ( this.frame || ( ( this.endtime > 0 ) && ( currentTime > this.endtime ) ) ) {
			return;
		}

		var anim = this.Anim ( );
		if ( !anim ) {
			return;
		}

		if ( this.allowMove && removeOriginOffset ) {
			return;
		}

		var /*float */weight = this.GetWeight( currentTime );
		if ( !weight ) {
			return;
		}

		time = this.AnimTime( currentTime );

		pos.Zero ( );
		num = anim.NumAnims ( );
		for ( i = 0; i < num; i++ ) {
			anim.GetOrigin( animpos, i, time, this.cycle );
			pos.opAdditionAssignment( animpos.timesFloat( this.animWeights[i] ) );
		}
		todoThrow ( );
		//if ( !blendWeight ) {
		//	blendPos.opEquals( pos );
		//	blendWeight.$ = weight;
		//} else {
		//	lerp = weight / ( blendWeight.$ + weight );
		//	blendPos.opAdditionAssignment( lerp * ( pos.opSubtraction( blendPos ) ) );
		//	blendWeight.$ += weight;
		//}
	}

///*
//=====================
//idAnimBlend::BlendDelta
//=====================
//*/
//void idAnimBlend::BlendDelta( int fromtime, int totime, idVec3 &blendDelta, float &blendWeight ) const {
//	idVec3	pos1;
//	idVec3	pos2;
//	idVec3	animpos;
//	idVec3	delta;
//	int		time1;
//	int		time2;
//	float	lerp;
//	int		num;
//	int		i;
//	
//	if ( this.frame || !this.allowMove || ( ( this.endtime > 0 ) && ( fromtime > this.endtime ) ) ) {
//		return;
//	}
//
//	var anim = this.Anim();
//	if ( !anim ) {
//		return;
//	}
//
//	float weight = this.GetWeight( totime );
//	if ( !weight ) {
//		return;
//	}
//
//	time1 = this.AnimTime( fromtime );
//	time2 = this.AnimTime( totime );
//	if ( time2 < time1 ) {
//		time2 += anim.Length();
//	}
//
//	num = anim.NumAnims();
//
//	pos1.Zero();
//	pos2.Zero();
//	for( i = 0; i < num; i++ ) {
//		anim.GetOrigin( animpos, i, time1, this.cycle );
//		pos1 += animpos * this.animWeights[ i ];
//
//		anim.GetOrigin( animpos, i, time2, this.cycle );
//		pos2 += animpos * this.animWeights[ i ];
//	}
//
//	delta = pos2 - pos1;
//	if ( !blendWeight ) {
//		blendDelta = delta;
//		blendWeight = weight;
//	} else {
//		lerp = weight / ( blendWeight + weight );
//		blendDelta += lerp * ( delta - blendDelta );
//		blendWeight += weight;
//	}
//}
//
///*
//=====================
//idAnimBlend::BlendDeltaRotation
//=====================
//*/
//void idAnimBlend::BlendDeltaRotation( int fromtime, int totime, idQuat &blendDelta, float &blendWeight ) const {
//	idQuat	q1;
//	idQuat	q2;
//	idQuat	q3;
//	int		time1;
//	int		time2;
//	float	lerp;
//	float	mixWeight;
//	int		num;
//	int		i;
//	
//	if ( this.frame || !this.allowMove || ( ( this.endtime > 0 ) && ( fromtime > this.endtime ) ) ) {
//		return;
//	}
//
//	var anim = this.Anim();
//	if ( !anim || !anim.GetAnimFlags().anim_turn ) {
//		return;
//	}
//
//	float weight = this.GetWeight( totime );
//	if ( !weight ) {
//		return;
//	}
//
//	time1 = this.AnimTime( fromtime );
//	time2 = this.AnimTime( totime );
//	if ( time2 < time1 ) {
//		time2 += anim.Length();
//	}
//
//	q1.Set( 0.0, 0.0, 0.0, 1.0 );
//	q2.Set( 0.0, 0.0, 0.0, 1.0 );
//
//	mixWeight = 0.0;
//	num = anim.NumAnims();
//	for( i = 0; i < num; i++ ) {
//		if ( this.animWeights[ i ] > 0.0 ) {
//			mixWeight += this.animWeights[ i ];
//			if ( this.animWeights[ i ] == mixWeight ) {
//				anim.GetOriginRotation( q1, i, time1, this.cycle );
//				anim.GetOriginRotation( q2, i, time2, this.cycle );
//			} else {
//				lerp = this.animWeights[ i ] / mixWeight;
//				anim.GetOriginRotation( q3, i, time1, this.cycle );
//				q1.Slerp( q1, q3, lerp );
//
//				anim.GetOriginRotation( q3, i, time2, this.cycle );
//				q2.Slerp( q1, q3, lerp );
//			}
//		}
//	}
//
//	q3 = q1.Inverse() * q2;
//	if ( !blendWeight ) {
//		blendDelta = q3;
//		blendWeight = weight;
//	} else {
//		lerp = weight / ( blendWeight + weight );
//		blendDelta.Slerp( blendDelta, q3, lerp );
//		blendWeight += weight;
//	}
//}

/*
=====================
idAnimBlend::AddBounds
=====================
*/
	AddBounds ( currentTime: number /*int*/, bounds: idBounds, removeOriginOffset: boolean ): boolean {
		var /*int			*/i: number;
		var /*int			*/num: number;
		var b = new idBounds;
		var /*int			*/time: number;
		var pos = new idVec3;
		var addorigin: boolean;

		if ( ( this.endtime > 0 ) && ( currentTime > this.endtime ) ) {
			return false;
		}

		var anim = this.Anim ( );
		if ( !anim ) {
			return false;
		}

		var /*float */weight = this.GetWeight( currentTime );
		if ( !weight ) {
			return false;
		}

		time = this.AnimTime( currentTime );
		num = anim.NumAnims ( );

		addorigin = !this.allowMove || !removeOriginOffset;
		for ( i = 0; i < num; i++ ) {
			if ( anim.GetBounds( b, i, time, this.cycle ) ) {
				if ( addorigin ) {
					anim.GetOrigin( pos, i, time, this.cycle );
					b.TranslateSelf( pos );
				}
				bounds.AddBounds( b );
			}
		}

		return true;
	}


};

/*
==============================================================================================

	idAFPoseJointMod

==============================================================================================
*/

enum AFJointModType_t{
	AF_JOINTMOD_AXIS,
	AF_JOINTMOD_ORIGIN,
	AF_JOINTMOD_BOTH
};

class idAFPoseJointMod {
//public:
	//idAFPoseJointMod( );

	mod: AFJointModType_t;
	axis = new idMat3;
	origin = new idVec3;

	constructor ( ) {
		this.mod = AFJointModType_t.AF_JOINTMOD_AXIS;
		this.axis.Identity ( );
		this.origin.Zero ( );
	}
}

/*
==============================================================================================

	idAnimator

==============================================================================================
*/

class idAnimator {
//public:
//								idAnimator();
//								~idAnimator();
//
//	size_t						Allocated( ) const;
//	size_t						Size( ) const;
//
//	void						Save ( savefile: idSaveGame ): void { throw "placeholder"; }					// archives object for save game file
//	void						Restore( idRestoreGame *savefile );					// unarchives object from save game file
//
//	void						SetEntity( ent:idEntity );
//	idEntity					*GetEntity( ) const ;
//	void						RemoveOriginOffset( bool remove );
//	bool						RemoveOrigin( ) const;
//
//	void						GetJointList( jointnames:string, idList<jointHandle_t> &jointList ) const;
//
//	int							NumAnims( ) const;
//	const idAnim				*GetAnim( int index ) const;
//	int							GetAnim( name:string ) const;
//	bool						HasAnim( name:string ) const;
//
//	void						ServiceAnims( int fromtime, int totime );
//	bool						IsAnimating( int currentTime ) const;
//
//	void						GetJoints( int *numJoints, idJointMat **jointsPtr );
//	int							NumJoints( ) const;
//	jointHandle_t				GetFirstChild( jointnum:jointHandle_t ) const;
//	jointHandle_t				GetFirstChild( name:string ) const;
//
//	idRenderModel				*SetModel( const char *modelname );
//	idRenderModel				*ModelHandle( ) const;
//	const idDeclModelDef		*ModelDef( ) const;
//
//	void						ForceUpdate( );
//	void						ClearForceUpdate( );
//	bool						CreateFrame( int animtime, bool force );
//	bool						FrameHasChanged( int animtime ) const;
//	void						GetDelta( int fromtime, int totime, idVec3 &delta ) const;
//	bool						GetDeltaRotation( int fromtime, int totime, idMat3 &delta ) const;
//	void						GetOrigin( int currentTime, pos:idVec3 ) const;
//	bool						GetBounds( int currentTime, idBounds &bounds );
//
//	idAnimBlend					*CurrentAnim( int channelNum );
//	void						Clear( int channelNum, int currentTime, int cleartime );
//	void						SetFrame( int channelNum, int animnum, int frame, int currenttime, int blendtime );
//	void						CycleAnim( int channelNum, int animnum, int currenttime, int blendtime );
//	void						PlayAnim( int channelNum, int animnum, int currenttime, int blendTime );
//
//								// copies the current anim from fromChannelNum to channelNum.
//								// the copied anim will have frame commands disabled to avoid executing them twice.
//	void						SyncAnimChannels( int channelNum, int fromChannelNum, int currenttime, int blendTime );
//
//	void						SetJointPos( jointnum:jointHandle_t, transform_type:jointModTransform_t, pos:idVec3 );
//	void						SetJointAxis( jointnum:jointHandle_t, transform_type:jointModTransform_t, const idMat3 &mat );
//	void						ClearJoint( jointnum:jointHandle_t );
//	void						ClearAllJoints( );
//
//	void						InitAFPose( );
//	void						SetAFPoseJointMod( const jointHandle_t jointNum, const AFJointModType_t mod, const idMat3 &axis, const idVec3 &origin );
//	void						FinishAFPose( int animnum, const idBounds &bounds, /*int*/time:number );
//	void						SetAFPoseBlendWeight( float blendWeight );
//	bool						BlendAFPose( idJointQuat *blendFrame ) const;
//	void						ClearAFPose( );
//
//	void						ClearAllAnims( int currentTime, int cleartime );
//
//	jointHandle_t				GetJointHandle( name:string ) const;
//	const char *				GetJointName( jointHandle_t handle ) const;
//	int							GetChannelForJoint( jointHandle_t joint ) const;
//	bool						GetJointTransform( jointHandle_t jointHandle, int currenttime, idVec3 &offset, idMat3 &axis );
//	bool						GetJointLocalTransform( jointHandle_t jointHandle, int currentTime, idVec3 &offset, idMat3 &axis );
//
//	const animFlags_t			GetAnimFlags( int animnum ) const;
//	int							NumFrames( int animnum ) const;
//	int							NumSyncedAnims( int animnum ) const;
//	const char					*AnimName( int animnum ) const;
//	const char					*AnimFullName( int animnum ) const;
//	int							AnimLength( int animnum ) const;
//	const idVec3				&TotalMovementDelta( int animnum ) const;
//
//private:
//	void						FreeData( );
//	void						PushAnims( int channel, int currentTime, int blendTime );
//
//private:
	modelDef: idDeclModelDef;
	entity:idEntity;

	channels = new2dStructArray<idAnimBlend>(idAnimBlend,  ANIM_NumAnimChannels , ANIM_MaxAnimsPerChannel );
	jointMods = new idList<jointMod_t >(jointMod_t , true);
	numJoints :number/*int*/;
	joints:idJointMat[];
	
	lastTransformTime :number/*mutable int*/;		// mutable because the value is updated in CreateFrame
	stoppedAnimatingUpdate:/*mutable*/boolean;
	removeOriginOffset:boolean;
	forceUpdate:boolean;
	
	frameBounds = new idBounds;

	AFPoseBlendWeight:number/*float*/;
	AFPoseJoints = new idList</*int*/number>(Number);
	AFPoseJointMods = new idList<idAFPoseJointMod>(idAFPoseJointMod);
	AFPoseJointFrame = new idList<idJointQuat>(idJointQuat);
	AFPoseBounds = new idBounds;
	AFPoseTime :number/*int*/;


	/***********************************************************************
	
		idAnimator
	
	***********************************************************************/
	
	/*
	=====================
	idAnimator::idAnimator
	=====================
	*/
	constructor ( ) {
		var /*int	*/i: number, j: number;

		this.modelDef = null;
		this.entity = null;
		this.numJoints = 0;
		this.joints = null;
		this.lastTransformTime = -1;
		this.stoppedAnimatingUpdate = false;
		this.removeOriginOffset = false;
		this.forceUpdate = false;

		this.frameBounds.Clear ( );

		this.AFPoseJoints.SetGranularity( 1 );
		this.AFPoseJointMods.SetGranularity( 1 );
		this.AFPoseJointFrame.SetGranularity( 1 );

		this.ClearAFPose ( );

		for ( i = ANIMCHANNEL_ALL; i < ANIM_NumAnimChannels; i++ ) {
			for ( j = 0; j < ANIM_MaxAnimsPerChannel; j++ ) {
				this.channels[i][j].Reset( null );
			}
		}
	}
	//
	///*
	//=====================
	//idAnimator::~idAnimator
	//=====================
	//*/
	//idAnimator::~idAnimator() {
	//	FreeData();
	//}
	//
	///*
	//=====================
	//idAnimator::Allocated
	//=====================
	//*/
	//size_t idAnimator::Allocated( ) const {
	//	size_t	size;
	//
	//	size = this.jointMods.Allocated() + numJoints * sizeof( joints[0] ) + this.jointMods.Num() * sizeof( this.jointMods[ 0 ] ) + AFPoseJointMods.Allocated() + AFPoseJointFrame.Allocated() + this.AFPoseJoints.Allocated();
	//
	//	return size;
	//}
	//
	///*
	//=====================
	//idAnimator::Save
	//
	//archives object for save game file
	//=====================
	//*/
	//void idAnimator::Save( idSaveGame *savefile ) const {
	//	var/*int*/i:number;
	//	int j;
	//
	//	savefile.WriteModelDef( this.modelDef );
	//	savefile.WriteObject( this.entity );
	//
	//	savefile.WriteInt( this.jointMods.Num() );
	//	for( i = 0; i < this.jointMods.Num(); i++ ) {
	//		savefile.WriteInt( this.jointMods[ i ].jointnum );
	//		savefile.WriteMat3( this.jointMods[ i ].mat );
	//		savefile.WriteVec3( this.jointMods[ i ].pos );
	//		savefile.WriteInt( (int&)this.jointMods[ i ].transform_pos );
	//		savefile.WriteInt( (int&)this.jointMods[ i ].transform_axis );
	//	}
	//	
	//	savefile.WriteInt( numJoints );
	//	for ( i = 0; i < numJoints; i++ ) {
	//		float *data = joints[i].ToFloatPtr();
	//		for ( j = 0; j < 12; j++ ) {
	//			savefile.WriteFloat( data[j] );
	//		}
	//	}
	//
	//	savefile.WriteInt( this.lastTransformTime );
	//	savefile.WriteBool( stoppedAnimatingUpdate );
	//	savefile.WriteBool( this.forceUpdate );
	//	savefile.WriteBounds( this.frameBounds );
	//
	//	savefile.WriteFloat( AFPoseBlendWeight );
	//
	//	savefile.WriteInt( this.AFPoseJoints.Num() );
	//	for ( i = 0; i < this.AFPoseJoints.Num(); i++ ) {
	//		savefile.WriteInt( this.AFPoseJoints[i] );
	//	}
	//	
	//	savefile.WriteInt( AFPoseJointMods.Num() );
	//	for ( i = 0; i < AFPoseJointMods.Num(); i++ ) {
	//		savefile.WriteInt( (int&)AFPoseJointMods[i].mod );
	//		savefile.WriteMat3( AFPoseJointMods[i].axis );
	//		savefile.WriteVec3( AFPoseJointMods[i].origin );
	//	}
	//	
	//	savefile.WriteInt( AFPoseJointFrame.Num() );
	//	for ( i = 0; i < AFPoseJointFrame.Num(); i++ ) {
	//		savefile.WriteFloat( AFPoseJointFrame[i].q.x );
	//		savefile.WriteFloat( AFPoseJointFrame[i].q.y );
	//		savefile.WriteFloat( AFPoseJointFrame[i].q.z );
	//		savefile.WriteFloat( AFPoseJointFrame[i].q.w );
	//		savefile.WriteVec3( AFPoseJointFrame[i].t );
	//	}
	//	
	//	savefile.WriteBounds( this.AFPoseBounds );
	//	savefile.WriteInt( AFPoseTime );
	//
	//	savefile.WriteBool( removeOriginOffset );
	//
	//	for( i = ANIMCHANNEL_ALL; i < ANIM_NumAnimChannels; i++ ) {
	//		for( j = 0; j < ANIM_MaxAnimsPerChannel; j++ ) {
	//			this.channels[ i ][ j ].Save( savefile );
	//		}
	//	}
	//}
	//
	///*
	//=====================
	//idAnimator::Restore
	//
	//unarchives object from save game file
	//=====================
	//*/
	//void idAnimator::Restore( idRestoreGame *savefile ) {
	//	var/*int*/i:number;
	//	int j;
	//	/*int*/num:number;
	//
	//	savefile.ReadModelDef( this.modelDef );
	//	savefile.ReadObject( reinterpret_cast<idClass *&>( this.entity ) );
	//
	//	savefile.ReadInt( num );
	//	this.jointMods.SetNum( num );
	//	for( i = 0; i < num; i++ ) {
	//		this.jointMods[ i ] = new jointMod_t;
	//		savefile.ReadInt( (int&)this.jointMods[ i ].jointnum );
	//		savefile.ReadMat3( this.jointMods[ i ].mat );
	//		savefile.ReadVec3( this.jointMods[ i ].pos );
	//		savefile.ReadInt( (int&)this.jointMods[ i ].transform_pos );
	//		savefile.ReadInt( (int&)this.jointMods[ i ].transform_axis );
	//	}
	//	
	//	savefile.ReadInt( numJoints );
	//	joints = (idJointMat *) Mem_Alloc16( numJoints * sizeof( this.joints[0] ) );
	//	for ( i = 0; i < numJoints; i++ ) {
	//		float *data = this.joints[i].ToFloatPtr();
	//		for ( j = 0; j < 12; j++ ) {
	//			savefile.ReadFloat( data[j] );
	//		}
	//	}
	//	
	//	savefile.ReadInt( this.lastTransformTime );
	//	savefile.ReadBool( stoppedAnimatingUpdate );
	//	savefile.ReadBool( this.forceUpdate );
	//	savefile.ReadBounds( this.frameBounds );
	//
	//	savefile.ReadFloat( AFPoseBlendWeight );
	//
	//	savefile.ReadInt( num );
	//	this.AFPoseJoints.SetGranularity( 1 );
	//	this.AFPoseJoints.SetNum( num );
	//	for ( i = 0; i < this.AFPoseJoints.Num(); i++ ) {
	//		savefile.ReadInt( this.AFPoseJoints[i] );
	//	}
	//	
	//	savefile.ReadInt( num );
	//	AFPoseJointMods.SetGranularity( 1 );
	//	AFPoseJointMods.SetNum( num );
	//	for ( i = 0; i < AFPoseJointMods.Num(); i++ ) {
	//		savefile.ReadInt( (int&)AFPoseJointMods[i].mod );
	//		savefile.ReadMat3( AFPoseJointMods[i].axis );
	//		savefile.ReadVec3( AFPoseJointMods[i].origin );
	//	}
	//	
	//	savefile.ReadInt( num );
	//	AFPoseJointFrame.SetGranularity( 1 );
	//	AFPoseJointFrame.SetNum( num );
	//	for ( i = 0; i < AFPoseJointFrame.Num(); i++ ) {
	//		savefile.ReadFloat( AFPoseJointFrame[i].q.x );
	//		savefile.ReadFloat( AFPoseJointFrame[i].q.y );
	//		savefile.ReadFloat( AFPoseJointFrame[i].q.z );
	//		savefile.ReadFloat( AFPoseJointFrame[i].q.w );
	//		savefile.ReadVec3( AFPoseJointFrame[i].t );
	//	}
	//	
	//	savefile.ReadBounds( this.AFPoseBounds );
	//	savefile.ReadInt( AFPoseTime );
	//
	//	savefile.ReadBool( removeOriginOffset );
	//
	//	for( i = ANIMCHANNEL_ALL; i < ANIM_NumAnimChannels; i++ ) {
	//		for( j = 0; j < ANIM_MaxAnimsPerChannel; j++ ) {
	//			this.channels[ i ][ j ].Restore( savefile, this.modelDef );
	//		}
	//	}
	//}
	
	/*
	=====================
	idAnimator::FreeData
	=====================
	*/
	FreeData ( ): void {
		var /*int	*/i: number, j: number;

		if ( this.entity ) {
			this.entity.BecomeInactive( TH_ANIMATE );
		}

		for ( i = ANIMCHANNEL_ALL; i < ANIM_NumAnimChannels; i++ ) {
			for ( j = 0; j < ANIM_MaxAnimsPerChannel; j++ ) {
				this.channels[i][j].Reset( NULL );
			}
		}

		this.jointMods.DeleteContents( true );

		Mem_Free16( this.joints );
		this.joints = null;
		this.numJoints = 0;

		this.modelDef = null;

		this.ForceUpdate ( );
	}

	/*
	=====================
	idAnimator::PushAnims
	=====================
	*/
	PushAnims( channelNum /*int*/:number, currentTime/*int*/:number, blendTime/*int*/:number ):void {
		var/*int			*/i:number;
		var channel: idAnimBlend ;
	
		channel = this.channels[ channelNum ];
		if ( !channel[ 0 ].GetWeight( currentTime ) || ( channel[ 0 ].starttime == currentTime ) ) {
			return;
		}
	
		for( i = ANIM_MaxAnimsPerChannel - 1; i > 0; i-- ) {
			channel[ i ] = channel[ i - 1 ];
		}
	
		channel[ 0 ].Reset( this.modelDef );
		channel[ 1 ].Clear( currentTime, blendTime );
		this.ForceUpdate();
	}
	
	/*
	=====================
	idAnimator::SetModel
	=====================
	*/
	SetModel ( modelname: string ): idRenderModel {
		var /*int */i: number, j: number;
		this.FreeData ( );

		// check if we're just clearing the model
		if ( !modelname /*|| !*modelname */ ) {
			return null;
		}

		this.modelDef = static_cast<idDeclModelDef>( declManager.FindType( declType_t.DECL_MODELDEF, modelname, false ) );
		if ( !this.modelDef ) {
			return null;
		}

		var renderModel: idRenderModel = this.modelDef.ModelHandle ( );
		if ( !renderModel ) {
			this.modelDef = null;
			return null;
		}

		// make sure model hasn't been purged
		this.modelDef.Touch ( );

		var $numJoints = new R( this.numJoints );
		var $joints = new R( this.joints );
		this.modelDef.SetupJoints( $numJoints, $joints, this.frameBounds, this.removeOriginOffset );
		this.numJoints = $numJoints.$;
		this.joints = $joints.$;
		this.modelDef.ModelHandle ( ).Reset ( );

		// set the this.modelDef on all channels
		for ( i = ANIMCHANNEL_ALL; i < ANIM_NumAnimChannels; i++ ) {
			for ( j = 0; j < ANIM_MaxAnimsPerChannel; j++ ) {
				this.channels[i][j].Reset( this.modelDef );
			}
		}

		return this.modelDef.ModelHandle ( );
	}

	///*
	//=====================
	//idAnimator::Size
	//=====================
	//*/
	//size_t idAnimator::Size( ) const {
	//	return sizeof( *this ) + Allocated();
	//}
	//
	/*
	=====================
	idAnimator::SetEntity
	=====================
	*/
	SetEntity ( ent: idEntity ): void {
		this.entity = ent;
	}

	/*
	=====================
	idAnimator::GetEntity
	=====================
	*/
	GetEntity ( ): idEntity {
		return this.entity;
	}

	/*
	=====================
	idAnimator::RemoveOriginOffset
	=====================
	*/
	RemoveOriginOffset ( remove: boolean ) {
		this.removeOriginOffset = remove;
	}

	/*
	=====================
	idAnimator::RemoveOrigin
	=====================
	*/
	RemoveOrigin ( ): boolean {
		return this.removeOriginOffset;
	}

	/*
	=====================
	idAnimator::GetJointList
	=====================
	*/
	GetJointList ( jointnames: string, jointList: idList<jointHandle_t> ): void {
		if ( this.modelDef ) {
			this.modelDef.GetJointList( jointnames, jointList );
		}
	}

	///*
	//=====================
	//idAnimator::NumAnims
	//=====================
	//*/
	//int	idAnimator::NumAnims( ) const {
	//	if ( !this.modelDef ) {
	//		return 0;
	//	}
	//	
	//	return this.modelDef.NumAnims();
	//}
	//
	/*
	=====================
	idAnimator::GetAnim
	=====================
	*/
	GetAnim_index ( /*int */index: number ): idAnim {
		if ( !this.modelDef ) {
			return null;
		}

		return this.modelDef.GetAnim_index( index );
	}

	/*
	=====================
	idAnimator::GetAnim
	=====================
	*/
	GetAnim_name( name:string ) :number {
		if ( !this.modelDef ) {
			return 0;
		}
		
		return this.modelDef.GetAnim( name );
	}
	//
	///*
	//=====================
	//idAnimator::HasAnim
	//=====================
	//*/
	//bool idAnimator::HasAnim( name:string ) const {
	//	if ( !this.modelDef ) {
	//		return false;
	//	}
	//	
	//	return this.modelDef.HasAnim( name );
	//}
	//
	/*
	=====================
	idAnimator::NumJoints
	=====================
	*/
	NumJoints( ) :number{
		return this.numJoints;
	}
	
	/*
	=====================
	idAnimator::ModelHandle
	=====================
	*/
	ModelHandle(): idRenderModel{
		if ( !this.modelDef ) {
			return null;
		}
		
		return this.modelDef.ModelHandle();
	}
	
	/*
	=====================
	idAnimator::ModelDef
	=====================
	*/
	ModelDef ( ): idDeclModelDef {
		return this.modelDef;
	}
	//
	///*
	//=====================
	//idAnimator::CurrentAnim
	//=====================
	//*/
	//idAnimBlend *idAnimator::CurrentAnim( channelNum /*int*/:number ) {
	//	if ( ( channelNum < 0 ) || ( channelNum >= ANIM_NumAnimChannels ) ) {
	//		gameLocal.Error( "idAnimator::CurrentAnim : channel out of range" );
	//	}
	//
	//	return &this.channels[ channelNum ][ 0 ];
	//}
	//
	/*
	=====================
	idAnimator::Clear
	=====================
	*/
	Clear ( channelNum /*int*/: number, currentTime /*int*/: number, /*int*/ cleartime: number ): void {
		var /*int*/i: number;
		var blend: idAnimBlend;

		if ( ( channelNum < 0 ) || ( channelNum >= ANIM_NumAnimChannels ) ) {
			gameLocal.Error( "idAnimator::Clear : channel out of range" );
		}

		blend = this.channels[channelNum][0];
		for ( i = 0; i < ANIM_MaxAnimsPerChannel; i++, blend = this.channels[channelNum][i] ) {
			blend.Clear( currentTime, cleartime );
		}
		this.ForceUpdate ( );
	}

	/*
	=====================
	idAnimator::SetFrame
	=====================
	*/
	SetFrame ( channelNum /*int*/: number, animNum /*int*/: number, /*int */frame: number, currentTime /*int*/: number, blendTime /*int*/: number ): void {
		if ( ( channelNum < 0 ) || ( channelNum >= ANIM_NumAnimChannels ) ) {
			gameLocal.Error( "idAnimator::SetFrame : channel out of range" );
		}

		if ( !this.modelDef || !this.modelDef.GetAnim_index( animNum ) ) {
			return;
		}

		this.PushAnims( channelNum, currentTime, blendTime );
		this.channels[channelNum][0].SetFrame( this.modelDef, animNum, frame, currentTime, blendTime );
		if ( this.entity ) {
			this.entity.BecomeActive( TH_ANIMATE );
		}
	}

	/*
	=====================
	idAnimator::CycleAnim
	=====================
	*/
	CycleAnim ( channelNum /*int*/: number, animNum /*int*/: number, currentTime /*int*/: number, blendTime /*int*/: number ): void {
		if ( ( channelNum < 0 ) || ( channelNum >= ANIM_NumAnimChannels ) ) {
			gameLocal.Error( "idAnimator::CycleAnim : channel out of range" );
		}

		if ( !this.modelDef || !this.modelDef.GetAnim_index( animNum ) ) {
			return;
		}

		this.PushAnims( channelNum, currentTime, blendTime );
		this.channels[channelNum][0].CycleAnim( this.modelDef, animNum, currentTime, blendTime );
		if ( this.entity ) {
			this.entity.BecomeActive( TH_ANIMATE );
		}
	}
	//
	///*
	//=====================
	//idAnimator::PlayAnim
	//=====================
	//*/
	//void idAnimator::PlayAnim( channelNum /*int*/:number, animNum/*int*/:number, currentTime/*int*/:number, blendTime/*int*/:number ) {
	//	if ( ( channelNum < 0 ) || ( channelNum >= ANIM_NumAnimChannels ) ) {
	//		gameLocal.Error( "idAnimator::PlayAnim : channel out of range" );
	//	}
	//
	//	if ( !this.modelDef || !this.modelDef.GetAnim( animNum ) ) {
	//		return;
	//	}
	//	
	//	this.PushAnims( channelNum, currentTime, blendTime );
	//	this.channels[ channelNum ][ 0 ].PlayAnim( this.modelDef, animNum, currentTime, blendTime );
	//	if ( this.entity ) {
	//		this.entity.BecomeActive( TH_ANIMATE );
	//	}
	//}
	//
	///*
	//=====================
	//idAnimator::SyncAnimChannels
	//=====================
	//*/
	//void idAnimator::SyncAnimChannels( channelNum /*int*/:number, int fromChannelNum, currentTime/*int*/:number, blendTime/*int*/:number ) {
	//	if ( ( channelNum < 0 ) || ( channelNum >= ANIM_NumAnimChannels ) || ( fromChannelNum < 0 ) || ( fromChannelNum >= ANIM_NumAnimChannels ) ) {
	//		gameLocal.Error( "idAnimator::SyncToChannel : channel out of range" );
	//	}
	//
	//	idAnimBlend &fromBlend = this.channels[ fromChannelNum ][ 0 ];
	//	idAnimBlend &toBlend = this.channels[ channelNum ][ 0 ];
	//
	//	float weight = fromBlend.blendEndValue;
	//	if ( ( fromBlend.Anim() != toBlend.Anim() ) || ( fromBlend.GetStartTime() != toBlend.GetStartTime() ) || ( fromBlend.GetEndTime() != toBlend.GetEndTime() ) ) {
	//		this.PushAnims( channelNum, currentTime, blendTime );
	//		toBlend = fromBlend;
	//		toBlend.blendStartValue = 0.0;
	//		toBlend.blendEndValue = 0.0;
	//	}
	//    toBlend.SetWeight( weight, currentTime - 1, blendTime );
	//
	//	// disable framecommands on the current channel so that commands aren't called twice
	//	toBlend.AllowFrameCommands( false );
	//
	//	if ( this.entity ) {
	//		this.entity.BecomeActive( TH_ANIMATE );
	//	}
	//}
	//
	///*
	//=====================
	//idAnimator::SetJointPos
	//=====================
	//*/
	//void idAnimator::SetJointPos( jointnum:jointHandle_t, transform_type:jointModTransform_t, pos:idVec3 ) {
	//	var/*int*/i:number;
	//	jointMod_t *jointMod;
	//
	//	if ( !this.modelDef || !this.modelDef.ModelHandle() || ( jointnum < 0 ) || ( jointnum >= this.numJoints ) ) {
	//		return;
	//	}
	//
	//	jointMod = NULL;
	//	for( i = 0; i < this.jointMods.Num(); i++ ) {
	//		if ( this.jointMods[ i ].jointnum == jointnum ) {
	//			jointMod = this.jointMods[ i ];
	//			break;
	//		} else if ( this.jointMods[ i ].jointnum > jointnum ) {
	//			break;
	//		}
	//	}
	//
	//	if ( !jointMod ) {
	//		jointMod = new jointMod_t;
	//		jointMod.jointnum = jointnum;
	//		jointMod.mat.Identity();
	//		jointMod.transform_axis = JOINTMOD_NONE;
	//		this.jointMods.Insert( jointMod, i );
	//	}
	//
	//	jointMod.pos = pos;
	//	jointMod.transform_pos = transform_type;
	//
	//	if ( this.entity ) {
	//		this.entity.BecomeActive( TH_ANIMATE );
	//	}
	//	this.ForceUpdate();
	//}
	//
	///*
	//=====================
	//idAnimator::SetJointAxis
	//=====================
	//*/
	//void idAnimator::SetJointAxis( jointnum:jointHandle_t, transform_type:jointModTransform_t, const idMat3 &mat ) {
	//	var/*int*/i:number;
	//	jointMod_t *jointMod;
	//
	//	if ( !this.modelDef || !this.modelDef.ModelHandle() || ( jointnum < 0 ) || ( jointnum >= this.numJoints ) ) {
	//		return;
	//	}
	//
	//	jointMod = NULL;
	//	for( i = 0; i < this.jointMods.Num(); i++ ) {
	//		if ( this.jointMods[ i ].jointnum == jointnum ) {
	//			jointMod = this.jointMods[ i ];
	//			break;
	//		} else if ( this.jointMods[ i ].jointnum > jointnum ) {
	//			break;
	//		}
	//	}
	//
	//	if ( !jointMod ) {
	//		jointMod = new jointMod_t;
	//		jointMod.jointnum = jointnum;
	//		jointMod.pos.Zero();
	//		jointMod.transform_pos = JOINTMOD_NONE;
	//		this.jointMods.Insert( jointMod, i );
	//	}
	//
	//	jointMod.mat = mat;
	//	jointMod.transform_axis = transform_type;
	//
	//	if ( this.entity ) {
	//		this.entity.BecomeActive( TH_ANIMATE );
	//	}
	//	this.ForceUpdate();
	//}
	//
	///*
	//=====================
	//idAnimator::ClearJoint
	//=====================
	//*/
	//void idAnimator::ClearJoint( jointnum:jointHandle_t ) {
	//	var/*int*/i:number;
	//
	//	if ( !this.modelDef || !this.modelDef.ModelHandle() || ( jointnum < 0 ) || ( jointnum >= this.numJoints ) ) {
	//		return;
	//	}
	//
	//	for( i = 0; i < this.jointMods.Num(); i++ ) {
	//		if ( this.jointMods[ i ].jointnum == jointnum ) {
	//			delete this.jointMods[ i ];
	//			this.jointMods.RemoveIndex( i );
	//			this.ForceUpdate();
	//			break;
	//		} else if ( this.jointMods[ i ].jointnum > jointnum ) {
	//			break;
	//		}
	//	}
	//}
	//
	///*
	//=====================
	//idAnimator::ClearAllJoints
	//=====================
	//*/
	//void idAnimator::ClearAllJoints( ) {
	//	if ( this.jointMods.Num() ) {
	//		this.ForceUpdate();
	//	}
	//	this.jointMods.DeleteContents( true );
	//}
	//
	/*
	=====================
	idAnimator::ClearAllAnims
	=====================
	*/
	ClearAllAnims ( currentTime /*int*/: number, /*int */cleartime: number ): void {
		var /*int	*/i: number;

		for ( i = 0; i < ANIM_NumAnimChannels; i++ ) {
			this.Clear( i, currentTime, cleartime );
		}

		this.ClearAFPose ( );
		this.ForceUpdate ( );
	}

	///*
	//====================
	//idAnimator::GetDelta
	//====================
	//*/
	//void idAnimator::GetDelta( int fromtime, int totime, idVec3 &delta ) const {
	//	int					i;
	//	const idAnimBlend	*blend;
	//	float				blendWeight;
	//
	//	if ( !this.modelDef || !this.modelDef.ModelHandle() || ( fromtime == totime ) ) {
	//		delta.Zero();
	//		return;
	//	}
	//
	//	delta.Zero();
	//	blendWeight = 0.0;
	//
	//	blend = this.channels[ ANIMCHANNEL_ALL ];
	//	for( i = 0; i < ANIM_MaxAnimsPerChannel; i++, blend++ ) {
	//		blend.BlendDelta( fromtime, totime, delta, blendWeight );
	//	}
	//
	//	if ( this.modelDef.Joints()[ 0 ].channel ) {
	//		blend = this.channels[ this.modelDef.Joints()[ 0 ].channel ];
	//		for( i = 0; i < ANIM_MaxAnimsPerChannel; i++, blend++ ) {
	//			blend.BlendDelta( fromtime, totime, delta, blendWeight );
	//		}
	//	}
	//}
	//
	///*
	//====================
	//idAnimator::GetDeltaRotation
	//====================
	//*/
	//bool idAnimator::GetDeltaRotation( int fromtime, int totime, idMat3 &delta ) const {
	//	int					i;
	//	const idAnimBlend	*blend;
	//	float				blendWeight;
	//	idQuat				q;
	//
	//	if ( !this.modelDef || !this.modelDef.ModelHandle() || ( fromtime == totime ) ) {
	//		delta.Identity();
	//		return false;
	//	}
	//
	//	q.Set( 0.0, 0.0, 0.0, 1.0 );
	//	blendWeight = 0.0;
	//
	//	blend = this.channels[ ANIMCHANNEL_ALL ];
	//	for( i = 0; i < ANIM_MaxAnimsPerChannel; i++, blend++ ) {
	//		blend.BlendDeltaRotation( fromtime, totime, q, blendWeight );
	//	}
	//
	//	if ( this.modelDef.Joints()[ 0 ].channel ) {
	//		blend = this.channels[ this.modelDef.Joints()[ 0 ].channel ];
	//		for( i = 0; i < ANIM_MaxAnimsPerChannel; i++, blend++ ) {
	//			blend.BlendDeltaRotation( fromtime, totime, q, blendWeight );
	//		}
	//	}
	//
	//	if ( blendWeight > 0.0 ) {
	//		delta = q.ToMat3();
	//		return true;
	//	} else {
	//		delta.Identity();
	//		return false;
	//	}
	//}
	
	/*
	====================
	idAnimator::GetOrigin
	====================
	*/
	GetOrigin ( currentTime /*int*/: number, pos: idVec3 ): void {
		var /*int*/i: number;
		var blend: idAnimBlend;
		var /*float*/blendWeight = new R<number> ( );

		if ( !this.modelDef || !this.modelDef.ModelHandle ( ) ) {
			pos.Zero ( );
			return;
		}

		pos.Zero ( );
		blendWeight.$ = 0.0;

		blend = this.channels[ANIMCHANNEL_ALL][0];
		for ( i = 0; i < ANIM_MaxAnimsPerChannel; i++, blend = this.channels[ANIMCHANNEL_ALL][i] ) {
			blend.BlendOrigin( currentTime, pos, blendWeight, this.removeOriginOffset );
		}

		if ( this.modelDef.Joints ( )[0].channel ) {
			var c = this.modelDef.Joints ( )[0].channel;
			blend = this.channels[c][0];
			for ( i = 0; i < ANIM_MaxAnimsPerChannel; i++, blend = this.channels[c][i] ) {
				blend.BlendOrigin( currentTime, pos, blendWeight, this.removeOriginOffset );
			}
		}

		pos.opAdditionAssignment( this.modelDef.GetVisualOffset ( ) );
	}

	/*
	====================
	idAnimator::GetBounds
	====================
	*/
	GetBounds ( currentTime /*int*/: number, bounds: idBounds ): boolean {
		var /*int*/i: number, j: number;
		var blend: idAnimBlend;
		var count: number /*int*/;

		if ( !this.modelDef || !this.modelDef.ModelHandle ( ) ) {
			return false;
		}

		if ( this.AFPoseJoints.Num ( ) ) {
			bounds.opEquals( this.AFPoseBounds );
			count = 1;
		} else {
			bounds.Clear ( );
			count = 0;
		}

		blend = this.channels[0][0];
		for ( i = ANIMCHANNEL_ALL; i < ANIM_NumAnimChannels; i++ ) {
			for ( j = 0; j < ANIM_MaxAnimsPerChannel; j++, blend = this.channels[0][j] ) {
				if ( blend.AddBounds( currentTime, bounds, this.removeOriginOffset ) ) {
					count++;
				}
			}
		}

		if ( !count ) {
			if ( !this.frameBounds.IsCleared ( ) ) {
				bounds.opEquals( this.frameBounds );
				return true;
			} else {
				bounds.Zero ( );
				return false;
			}
		}

		bounds.TranslateSelf( this.modelDef.GetVisualOffset ( ) );

		if ( g_debugBounds.GetBool ( ) ) {
			if ( bounds[1][0] - bounds[0][0] > 2048 || bounds[1][1] - bounds[0][1] > 2048 ) {
				if ( this.entity ) {
					gameLocal.Warning( "big frameBounds on entity '%s' with model '%s': %f,%f", this.entity.name.c_str ( ), this.modelDef.ModelHandle ( ).Name ( ), bounds[1][0] - bounds[0][0], bounds[1][1] - bounds[0][1] );
				} else {
					gameLocal.Warning( "big frameBounds on model '%s': %f,%f", this.modelDef.ModelHandle ( ).Name ( ), bounds[1][0] - bounds[0][0], bounds[1][1] - bounds[0][1] );
				}
			}
		}

		this.frameBounds.opEquals( bounds );

		return true;
	}
	//
	///*
	//=====================
	//idAnimator::InitAFPose
	//=====================
	//*/
	//void idAnimator::InitAFPose( ) {
	//
	//	if ( !this.modelDef ) {
	//		return;
	//	}
	//
	//	this.AFPoseJoints.SetNum( this.modelDef.Joints().Num(), false );
	//	this.AFPoseJoints.SetNum( 0, false );
	//	AFPoseJointMods.SetNum( this.modelDef.Joints().Num(), false );
	//	AFPoseJointFrame.SetNum( this.modelDef.Joints().Num(), false );
	//}
	//
	///*
	//=====================
	//idAnimator::SetAFPoseJointMod
	//=====================
	//*/
	//void idAnimator::SetAFPoseJointMod( const jointHandle_t jointNum, const AFJointModType_t mod, const idMat3 &axis, const idVec3 &origin ) {
	//	AFPoseJointMods[jointNum].mod = mod;
	//	AFPoseJointMods[jointNum].axis = axis;
	//	AFPoseJointMods[jointNum].origin = origin;
	//
	//	int index = idBinSearch_GreaterEqual<int>( this.AFPoseJoints.Ptr(), this.AFPoseJoints.Num(), jointNum );
	//	if ( index >= this.AFPoseJoints.Num() || jointNum != this.AFPoseJoints[index] ) {
	//		this.AFPoseJoints.Insert( jointNum, index );
	//	}
	//}
	//
	///*
	//=====================
	//idAnimator::FinishAFPose
	//=====================
	//*/
	//void idAnimator::FinishAFPose( animNum/*int*/:number, const idBounds &bounds, /*int*/time:number ) {
	//	int					i, j;
	//	int					numJoints;
	//	int					parentNum;
	//	int					jointMod;
	//	int					jointNum;
	//	const int *			jointParent;
	//
	//	if ( !this.modelDef ) {
	//		return;
	//	}
	//	
	//	const idAnim *anim = this.modelDef.GetAnim( animNum );
	//	if ( !anim ) {
	//		return;
	//	}
	//
	//	numJoints = this.modelDef.Joints().Num();
	//	if ( !numJoints ) {
	//		return;
	//	}
	//
	//	idRenderModel		*md5 = this.modelDef.ModelHandle();
	//	const idMD5Anim		*md5anim = anim.MD5Anim( 0 );
	//
	//	if ( numJoints != md5anim.NumJoints() ) {
	//		gameLocal.Warning( "Model '%s' has different # of joints than anim '%s'", md5.Name(), md5anim.Name() );
	//		return;
	//	}
	//
	//	idJointQuat *jointFrame = ( idJointQuat * )_alloca16( numJoints * sizeof( *jointFrame ) );
	//	md5anim.GetSingleFrame( 0, jointFrame, this.modelDef.GetChannelJoints( ANIMCHANNEL_ALL ), this.modelDef.NumJointsOnChannel( ANIMCHANNEL_ALL ) );
	//
	//	if ( this.removeOriginOffset ) {
	//#ifdef VELOCITY_MOVE
	//		jointFrame[ 0 ].t.x = 0.0;
	//#else
	//		jointFrame[ 0 ].t.Zero();
	//#endif
	//	}
	//
	//	idJointMat *joints = ( idJointMat * )_alloca16( numJoints * sizeof( *joints ) );
	//
	//	// convert the joint quaternions to joint matrices
	//	SIMDProcessor.ConvertJointQuatsToJointMats( joints, jointFrame, numJoints );
	//
	//	// first joint is always root of entire hierarchy
	//	if ( this.AFPoseJoints.Num() && this.AFPoseJoints[0] == 0 ) {
	//		switch( AFPoseJointMods[0].mod ) {
	//			case AF_JOINTMOD_AXIS: {
	//				joints[0].SetRotation( AFPoseJointMods[0].axis );
	//				break;
	//			}
	//			case AF_JOINTMOD_ORIGIN: {
	//				joints[0].SetTranslation( AFPoseJointMods[0].origin );
	//				break;
	//			}
	//			case AF_JOINTMOD_BOTH: {
	//				joints[0].SetRotation( AFPoseJointMods[0].axis );
	//				joints[0].SetTranslation( AFPoseJointMods[0].origin );
	//				break;
	//			}
	//		}
	//		j = 1;
	//	} else {
	//		j = 0;
	//	}
	//
	//	// pointer to joint info
	//	jointParent = this.modelDef.JointParents();
	//
	//	// transform the child joints
	//	for( i = 1; j < this.AFPoseJoints.Num(); j++, i++ ) {
	//		jointMod = this.AFPoseJoints[j];
	//
	//		// transform any joints preceding the joint modifier
	//		SIMDProcessor.TransformJoints( joints, jointParent, i, jointMod - 1 );
	//		i = jointMod;
	//
	//		parentNum = jointParent[i];
	//
	//		switch( AFPoseJointMods[jointMod].mod ) {
	//			case AF_JOINTMOD_AXIS: {
	//				joints[i].SetRotation( AFPoseJointMods[jointMod].axis );
	//				joints[i].SetTranslation( joints[parentNum].ToVec3() + joints[i].ToVec3() * joints[parentNum].ToMat3() );
	//				break;
	//			}
	//			case AF_JOINTMOD_ORIGIN: {
	//				joints[i].SetRotation( joints[i].ToMat3() * joints[parentNum].ToMat3() );
	//				joints[i].SetTranslation( AFPoseJointMods[jointMod].origin );
	//				break;
	//			}
	//			case AF_JOINTMOD_BOTH: {
	//				joints[i].SetRotation( AFPoseJointMods[jointMod].axis );
	//				joints[i].SetTranslation( AFPoseJointMods[jointMod].origin );
	//				break;
	//			}
	//		}
	//	}
	//
	//	// transform the rest of the hierarchy
	//	SIMDProcessor.TransformJoints( joints, jointParent, i, numJoints - 1 );
	//
	//	// untransform hierarchy
	//	SIMDProcessor.UntransformJoints( joints, jointParent, 1, numJoints - 1 );
	//
	//	// convert joint matrices back to joint quaternions
	//	SIMDProcessor.ConvertJointMatsToJointQuats( AFPoseJointFrame.Ptr(), joints, numJoints );
	//
	//	// find all modified joints and their parents
	//	bool *blendJoints = (bool *) _alloca16( numJoints * sizeof( bool ) );
	//	memset( blendJoints, 0, numJoints * sizeof( bool ) );
	//
	//	// mark all modified joints and their parents
	//	for( i = 0; i < this.AFPoseJoints.Num(); i++ ) {
	//		for( jointNum = this.AFPoseJoints[i]; jointNum != jointHandle_t.INVALID_JOINT; jointNum = jointParent[jointNum] ) {
	//			blendJoints[jointNum] = true;
	//		}
	//	}
	//
	//	// lock all parents of modified joints
	//	this.AFPoseJoints.SetNum( 0, false );
	//	for ( i = 0; i < numJoints; i++ ) {
	//		if ( blendJoints[i] ) {
	//			this.AFPoseJoints.Append( i );
	//		}
	//	}
	//
	//	this.AFPoseBounds .opEquals( bounds);
	//	AFPoseTime = time;
	//
	//	this.ForceUpdate();
	//}
	//
	///*
	//=====================
	//idAnimator::SetAFPoseBlendWeight
	//=====================
	//*/
	//void idAnimator::SetAFPoseBlendWeight( float blendWeight ) {
	//	AFPoseBlendWeight = blendWeight;
	//}
	//
	///*
	//=====================
	//idAnimator::BlendAFPose
	//=====================
	//*/
	//bool idAnimator::BlendAFPose( idJointQuat *blendFrame ) const {
	//
	//	if ( !this.AFPoseJoints.Num() ) {
	//		return false;
	//	}
	//
	//	SIMDProcessor.BlendJoints( blendFrame, AFPoseJointFrame.Ptr(), AFPoseBlendWeight, this.AFPoseJoints.Ptr(), this.AFPoseJoints.Num() );
	//
	//	return true;
	//}
	
	/*
	=====================
	idAnimator::ClearAFPose
	=====================
	*/
	ClearAFPose ( ): void {
		if ( this.AFPoseJoints.Num ( ) ) {
			this.ForceUpdate ( );
		}
		this.AFPoseBlendWeight = 1.0;
		this.AFPoseJoints.SetNum( 0, false );
		this.AFPoseBounds.Clear ( );
		this.AFPoseTime = 0;
	}
	//
	///*
	//=====================
	//idAnimator::ServiceAnims
	//=====================
	//*/
	//void idAnimator::ServiceAnims( int fromtime, int totime ) {
	//	int			i, j;
	//	idAnimBlend	*blend;
	//
	//	if ( !this.modelDef ) {
	//		return;
	//	}
	//
	//	if ( this.modelDef.ModelHandle() ) {
	//		blend = this.channels[ 0 ];
	//		for( i = 0; i < ANIM_NumAnimChannels; i++ ) {
	//			for( j = 0; j < ANIM_MaxAnimsPerChannel; j++, blend++ ) {
	//				blend.CallFrameCommands( this.entity, fromtime, totime );
	//			}
	//		}
	//	}
	//
	//	if ( !IsAnimating( totime ) ) {
	//		stoppedAnimatingUpdate = true;
	//		if ( this.entity ) {
	//			this.entity.BecomeInactive( TH_ANIMATE );
	//
	//			// present one more time with stopped animations so the renderer can properly recreate interactions
	//			this.entity.BecomeActive( TH_UPDATEVISUALS );
	//		}
	//	}
	//}
	//
	///*
	//=====================
	//idAnimator::IsAnimating
	//=====================
	//*/
	//bool idAnimator::IsAnimating( currentTime/*int*/:number ) const {
	//	int					i, j;
	//	const idAnimBlend	*blend;
	//
	//	if ( !this.modelDef || !this.modelDef.ModelHandle() ) {
	//		return false;
	//	}
	//
	//	// if animating with an articulated figure
	//	if ( this.AFPoseJoints.Num() && currentTime <= AFPoseTime ) {
	//		return true;
	//	}
	//
	//	blend = this.channels[ 0 ];
	//	for( i = 0; i < ANIM_NumAnimChannels; i++ ) {
	//		for( j = 0; j < ANIM_MaxAnimsPerChannel; j++, blend++ ) {
	//			if ( !blend.IsDone( currentTime ) ) {
	//				return true;
	//			}
	//		}
	//	}
	//
	//	return false;
	//}
	//
	///*
	//=====================
	//idAnimator::FrameHasChanged
	//=====================
	//*/
	//bool idAnimator::FrameHasChanged( currentTime/*int*/:number ) const {
	//	int					i, j;
	//	const idAnimBlend	*blend;
	//
	//	if ( !this.modelDef || !this.modelDef.ModelHandle() ) {
	//		return false;
	//	}
	//
	//	// if animating with an articulated figure
	//	if ( this.AFPoseJoints.Num() && currentTime <= AFPoseTime ) {
	//		return true;
	//	}
	//
	//	blend = this.channels[ 0 ];
	//	for( i = 0; i < ANIM_NumAnimChannels; i++ ) {
	//		for( j = 0; j < ANIM_MaxAnimsPerChannel; j++, blend++ ) {
	//			if ( blend.FrameHasChanged( currentTime ) ) {
	//				return true;
	//			}
	//		}
	//	}
	//
	//	if ( this.forceUpdate && IsAnimating( currentTime ) ) {
	//		return true;
	//	}
	//
	//	return false;
	//}

	/*
	=====================
	idAnimator::CreateFrame
	=====================
	*/
	CreateFrame( /*int */currentTime: number, force: boolean): boolean {
		todoThrow();
		//	int					i, j;
		//	int					numJoints;
		//	int					parentNum;
		//	bool				hasAnim;
		//	bool				debugInfo;
		//	float				baseBlend;
		//	float				blendWeight;
		//	const idAnimBlend *	blend;
		//	const int *			jointParent;
		//	const jointMod_t *	jointMod;
		//	const idJointQuat *	defaultPose;
		//
		//	static idCVar		var r_showSkel = idAnimator.r_showSkel || idAnimator.r_showSkel = new idCVar( "r_showSkel", "0", CVAR_RENDERER | CVAR_INTEGER, "", 0, 2, idCmdSystem::ArgCompletion_Integer<0,2> );
		//
		//	if ( gameLocal.inCinematic && gameLocal.skipCinematic ) {
		//		return false;
		//	}
		//
		//	if ( !this.modelDef || !this.modelDef.ModelHandle() ) {
		//		return false;
		//	}
		//
		//	if ( !force && !r_showSkel.GetInteger() ) {
		//		if ( this.lastTransformTime == currentTime ) {
		//			return false;
		//		}
		//		if ( this.lastTransformTime != -1 && !stoppedAnimatingUpdate && !IsAnimating( currentTime ) ) {
		//			return false;
		//		}
		//	}
		//
		//	this.lastTransformTime = currentTime;
		//	stoppedAnimatingUpdate = false;
		//
		//	if ( this.entity && ( ( g_debugAnim.GetInteger() == this.entity.entityNumber ) || ( g_debugAnim.GetInteger() == -2 ) ) ) {
		//		debugInfo = true;
		//		gameLocal.Printf( "---------------\n%d: entity '%s':\n", gameLocal.time, this.entity.GetName() );
		// 		gameLocal.Printf( "model '%s':\n", this.modelDef.GetModelName() );
		//	} else {
		//		debugInfo = false;
		//	}
		//
		//	// init the joint buffer
		//	if ( this.AFPoseJoints.Num() ) {
		//		// initialize with AF pose anim for the case where there are no other animations and no AF pose joint modifications
		//		defaultPose = AFPoseJointFrame.Ptr();
		//	} else {
		//		defaultPose = this.modelDef.GetDefaultPose();
		//	}
		//
		//	if ( !defaultPose ) {
		//		//gameLocal.Warning( "idAnimator::CreateFrame: no defaultPose on '%s'", this.modelDef.Name() );
		//		return false;
		//	}
		//
		//	numJoints = this.modelDef.Joints().Num();
		//	idJointQuat *jointFrame = ( idJointQuat * )_alloca16( numJoints * sizeof( jointFrame[0] ) );
		//	SIMDProcessor.Memcpy( jointFrame, defaultPose, numJoints * sizeof( jointFrame[0] ) );
		//
		//	hasAnim = false;
		//
		//	// blend the all channel
		//	baseBlend = 0.0;
		//	blend = this.channels[ ANIMCHANNEL_ALL ];
		//	for( j = 0; j < ANIM_MaxAnimsPerChannel; j++, blend++ ) {
		//		if ( blend.BlendAnim( currentTime, ANIMCHANNEL_ALL, numJoints, jointFrame, baseBlend, this.removeOriginOffset, false, debugInfo ) ) {
		//			hasAnim = true;
		//			if ( baseBlend >= 1.0 ) {
		//				break;
		//			}
		//		}
		//	}
		//
		//	// only blend other this.channels if there's enough space to blend into
		//	if ( baseBlend < 1.0 ) {
		//		for( i = ANIMCHANNEL_ALL + 1; i < ANIM_NumAnimChannels; i++ ) {
		//			if ( !this.modelDef.NumJointsOnChannel( i ) ) {
		//				continue;
		//			}
		//			if ( i == ANIMCHANNEL_EYELIDS ) {
		//				// eyelids blend over any previous anims, so skip it and blend it later
		//				continue;
		//			}
		//			blendWeight = baseBlend;
		//			blend = this.channels[ i ];
		//			for( j = 0; j < ANIM_MaxAnimsPerChannel; j++, blend++ ) {
		//				if ( blend.BlendAnim( currentTime, i, numJoints, jointFrame, blendWeight, this.removeOriginOffset, false, debugInfo ) ) {
		//					hasAnim = true;
		//					if ( blendWeight >= 1.0 ) {
		//						// fully blended
		//						break;
		//					}
		//				}
		//			}
		//
		//			if ( debugInfo && !this.AFPoseJoints.Num() && !blendWeight ) {
		//				gameLocal.Printf( "%d: %s using default pose in model '%s'\n", gameLocal.time, channelNames[ i ], this.modelDef.GetModelName() );
		//			}
		//		}
		//	}
		//
		//	// blend in the eyelids
		//	if ( this.modelDef.NumJointsOnChannel( ANIMCHANNEL_EYELIDS ) ) {
		//		blend = this.channels[ ANIMCHANNEL_EYELIDS ];
		//		blendWeight = baseBlend;
		//		for( j = 0; j < ANIM_MaxAnimsPerChannel; j++, blend++ ) {
		//			if ( blend.BlendAnim( currentTime, ANIMCHANNEL_EYELIDS, numJoints, jointFrame, blendWeight, this.removeOriginOffset, true, debugInfo ) ) {
		//				hasAnim = true;
		//				if ( blendWeight >= 1.0 ) {
		//					// fully blended
		//					break;
		//				}
		//			}
		//		}
		//	}
		//
		//	// blend the articulated figure pose
		//	if ( BlendAFPose( jointFrame ) ) {
		//		hasAnim = true;
		//	}
		//
		//	if ( !hasAnim && !this.jointMods.Num() ) {
		//		// no animations were updated
		//		return false;
		//	}
		//
		//	// convert the joint quaternions to rotation matrices
		//	SIMDProcessor.ConvertJointQuatsToJointMats( this.joints, jointFrame, numJoints );
		//
		//	// check if we need to modify the origin
		//	if ( this.jointMods.Num() && ( this.jointMods[0].jointnum == 0 ) ) {
		//		jointMod = this.jointMods[0];
		//
		//		switch( jointMod.transform_axis ) {
		//			case JOINTMOD_NONE:
		//				break;
		//
		//			case JOINTMOD_LOCAL:
		//				this.joints[0].SetRotation( jointMod.mat * this.joints[0].ToMat3() );
		//				break;
		//			
		//			case JOINTMOD_WORLD:
		//				this.joints[0].SetRotation( this.joints[0].ToMat3() * jointMod.mat );
		//				break;
		//
		//			case JOINTMOD_LOCAL_OVERRIDE:
		//			case JOINTMOD_WORLD_OVERRIDE:
		//				this.joints[0].SetRotation( jointMod.mat );
		//				break;
		//		}
		//
		//		switch( jointMod.transform_pos ) {
		//			case JOINTMOD_NONE:
		//				break;
		//
		//			case JOINTMOD_LOCAL:
		//				this.joints[0].SetTranslation( this.joints[0].ToVec3() + jointMod.pos );
		//				break;
		//			
		//			case JOINTMOD_LOCAL_OVERRIDE:
		//			case JOINTMOD_WORLD:
		//			case JOINTMOD_WORLD_OVERRIDE:
		//				this.joints[0].SetTranslation( jointMod.pos );
		//				break;
		//		}
		//		j = 1;
		//	} else {
		//		j = 0;
		//	}
		//
		//	// add in the model offset
		//	this.joints[0].SetTranslation( this.joints[0].ToVec3() + this.modelDef.GetVisualOffset() );
		//
		//	// pointer to joint info
		//	jointParent = this.modelDef.JointParents();
		//
		//	// add in any joint modifications
		//	for( i = 1; j < this.jointMods.Num(); j++, i++ ) {
		//		jointMod = this.jointMods[j];
		//
		//		// transform any this.joints preceding the joint modifier
		//		SIMDProcessor.TransformJoints( this.joints, jointParent, i, jointMod.jointnum - 1 );
		//		i = jointMod.jointnum;
		//
		//		parentNum = jointParent[i];
		//
		//		// modify the axis
		//		switch( jointMod.transform_axis ) {
		//			case JOINTMOD_NONE:
		//				this.joints[i].SetRotation( this.joints[i].ToMat3() * this.joints[ parentNum ].ToMat3() );
		//				break;
		//
		//			case JOINTMOD_LOCAL:
		//				this.joints[i].SetRotation( jointMod.mat * ( this.joints[i].ToMat3() * this.joints[parentNum].ToMat3() ) );
		//				break;
		//			
		//			case JOINTMOD_LOCAL_OVERRIDE:
		//				this.joints[i].SetRotation( jointMod.mat * this.joints[parentNum].ToMat3() );
		//				break;
		//
		//			case JOINTMOD_WORLD:
		//				this.joints[i].SetRotation( ( this.joints[i].ToMat3() * this.joints[parentNum].ToMat3() ) * jointMod.mat );
		//				break;
		//
		//			case JOINTMOD_WORLD_OVERRIDE:
		//				this.joints[i].SetRotation( jointMod.mat );
		//				break;
		//		}
		//
		//		// modify the position
		//		switch( jointMod.transform_pos ) {
		//			case JOINTMOD_NONE:
		//				this.joints[i].SetTranslation( this.joints[parentNum].ToVec3() + this.joints[i].ToVec3() * this.joints[parentNum].ToMat3() );
		//				break;
		//
		//			case JOINTMOD_LOCAL:
		//				this.joints[i].SetTranslation( this.joints[parentNum].ToVec3() + ( this.joints[i].ToVec3() + jointMod.pos ) * this.joints[parentNum].ToMat3() );
		//				break;
		//			
		//			case JOINTMOD_LOCAL_OVERRIDE:
		//				this.joints[i].SetTranslation( this.joints[parentNum].ToVec3() + jointMod.pos * this.joints[parentNum].ToMat3() );
		//				break;
		//
		//			case JOINTMOD_WORLD:
		//				this.joints[i].SetTranslation( this.joints[parentNum].ToVec3() + this.joints[i].ToVec3() * this.joints[parentNum].ToMat3() + jointMod.pos );
		//				break;
		//
		//			case JOINTMOD_WORLD_OVERRIDE:
		//				this.joints[i].SetTranslation( jointMod.pos );
		//				break;
		//		}
		//	}
		//
		//	// transform the rest of the hierarchy
		//	SIMDProcessor.TransformJoints( this.joints, jointParent, i, numJoints - 1 );
		//
		return true;
	}

/*
=====================
idAnimator::ForceUpdate
=====================
*/
	ForceUpdate ( ): void {
		this.lastTransformTime = -1;
		this.forceUpdate = true;
	}

/*
=====================
idAnimator::ClearForceUpdate
=====================
*/
	ClearForceUpdate ( ): void {
		this.forceUpdate = false;
	}

/*
=====================
idAnimator::GetJointTransform>	gamex86.dll!idAnimator::ForceUpdate()  Line 4268	C++

=====================
*/
	GetJointTransform ( jointHandle: jointHandle_t, currentTime /*int*/: number, offset: idVec3, axis: idMat3 ): boolean {
		if ( !this.modelDef || ( jointHandle < 0 ) || ( jointHandle >= this.modelDef.NumJoints ( ) ) ) {
			return false;
		}

		this.CreateFrame( currentTime, false );

		offset.opEquals( this.joints[jointHandle].ToVec3 ( ) );
		axis.opEquals( this.joints[jointHandle].ToMat3 ( ) );

		return true;
	}

///*
//=====================
//idAnimator::GetJointLocalTransform
//=====================
//*/
//bool idAnimator::GetJointLocalTransform( jointHandle_t jointHandle, currentTime/*int*/:number, idVec3 &offset, idMat3 &axis ) {
//	if ( !this.modelDef ) {
//		return false;
//	}
//
//	const idList<jointInfo_t> &modelJoints = this.modelDef.Joints();
//
//	if ( ( jointHandle < 0 ) || ( jointHandle >= modelJoints.Num() ) ) {
//		return false;
//	}
//
//	// FIXME: overkill
//	this.CreateFrame( currentTime, false );
//
//	if ( jointHandle > 0 ) {
//		idJointMat m = this.joints[ jointHandle ];
//		m /= this.joints[ modelJoints[ jointHandle ].parentNum ];
//		offset = m.ToVec3();
//		axis = m.ToMat3();
//	} else {
//		offset = this.joints[ jointHandle ].ToVec3();
//		axis = this.joints[ jointHandle ].ToMat3();
//	}
//
//	return true;
//}
//
/*
=====================
idAnimator::GetJointHandle
=====================
*/
	GetJointHandle ( name: string ): jointHandle_t {
		if ( !this.modelDef || !this.modelDef.ModelHandle ( ) ) {
			return jointHandle_t.INVALID_JOINT;
		}

		return this.modelDef.ModelHandle ( ).GetJointHandle( name );
	}

/*
=====================
idAnimator::GetJointName
=====================
*/
	GetJointName ( handle: jointHandle_t ): string {
		if ( !this.modelDef || !this.modelDef.ModelHandle ( ) ) {
			return "";
		}

		return this.modelDef.ModelHandle ( ).GetJointName( handle );
	}

/*
=====================
idAnimator::GetChannelForJoint
=====================
*/
	GetChannelForJoint ( joint: jointHandle_t ): number {
		if ( !this.modelDef ) {
			gameLocal.Error( "idAnimator::GetChannelForJoint: NULL model" );
		}

		if ( ( joint < 0 ) || ( joint >= this.numJoints ) ) {
			gameLocal.Error( "idAnimator::GetChannelForJoint: invalid joint num (%d)", joint );
		}

		return this.modelDef.GetJoint( joint ).channel;
	}

///*
//=====================
//idAnimator::GetFirstChild
//=====================
//*/
//jointHandle_t idAnimator::GetFirstChild( name:string ) const {
//	return GetFirstChild( GetJointHandle( name ) );
//}
//
///*
//=====================
//idAnimator::GetFirstChild
//=====================
//*/
//jointHandle_t idAnimator::GetFirstChild( jointnum:jointHandle_t ) const {
//	int					i;
//	int					num;
//	const jointInfo_t	*joint;
//
//	if ( !this.modelDef ) {
//		return jointHandle_t.INVALID_JOINT;
//	}
//
//	num = this.modelDef.NumJoints();
//	if ( !num ) {
//		return jointnum;
//	}
//	joint = this.modelDef.GetJoint( 0 );
//	for( i = 0; i < num; i++, joint++ ) {
//		if ( joint.parentNum == jointnum ) {
//			return ( jointHandle_t )joint.num;
//		}
//	}
//	return jointnum;
//}
//
/*
=====================
idAnimator::GetJoints
=====================
*/
	GetJoints ( numJoints: R<number>, jointsPtr: R<idJointMat[]> ): void {
		numJoints.$ = this.numJoints;
		jointsPtr.$ = this.joints;
	}
//
///*
//=====================
//idAnimator::GetAnimFlags
//=====================
//*/
//const animFlags_t idAnimator::GetAnimFlags( animNum/*int*/:number ) const {
//	animFlags_t result;
//
//	const idAnim *anim = GetAnim( animNum );
//	if ( anim ) {
//		return anim.GetAnimFlags();
//	}
//
//	memset( &result, 0, sizeof( result ) );
//	return result;
//}
//
///*
//=====================
//idAnimator::NumFrames
//=====================
//*/
//int	idAnimator::NumFrames( animNum/*int*/:number ) const {
//	const idAnim *anim = GetAnim( animNum );
//	if ( anim ) {
//		return anim.NumFrames();
//	} else {
//		return 0;
//	}
//}
//
///*
//=====================
//idAnimator::NumSyncedAnims
//=====================
//*/
//int	idAnimator::NumSyncedAnims( animNum/*int*/:number ) const {
//	const idAnim *anim = GetAnim( animNum );
//	if ( anim ) {
//		return anim.NumAnims();
//	} else {
//		return 0;
//	}
//}
//
///*
//=====================
//idAnimator::AnimName
//=====================
//*/
//const char *idAnimator::AnimName( animNum/*int*/:number ) const {
//	const idAnim *anim = GetAnim( animNum );
//	if ( anim ) {
//		return anim.Name();
//	} else {
//		return "";
//	}
//}
//
///*
//=====================
//idAnimator::AnimFullName
//=====================
//*/
//const char *idAnimator::AnimFullName( animNum/*int*/:number ) const {
//	const idAnim *anim = GetAnim( animNum );
//	if ( anim ) {
//		return anim.FullName();
//	} else {
//		return "";
//	}
//}
//
///*
//=====================
//idAnimator::AnimLength
//=====================
//*/
//int	idAnimator::AnimLength( animNum/*int*/:number ) const {
//	const idAnim *anim = GetAnim( animNum );
//	if ( anim ) {
//		return anim.Length();
//	} else {
//		return 0;
//	}
//}
//
///*
//=====================
//idAnimator::TotalMovementDelta
//=====================
//*/
//const idVec3 &idAnimator::TotalMovementDelta( animNum/*int*/:number ) const {
//	const idAnim *anim = GetAnim( animNum );
//	if ( anim ) {
//		return anim.TotalMovementDelta();
//	} else {
//		return vec3_origin;
//	}
//}
};

//#endif /* !__ANIM_H__ */
