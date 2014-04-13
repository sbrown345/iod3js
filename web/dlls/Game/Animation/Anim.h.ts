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
//// for converting from 24 frames per second to milliseconds
//ID_INLINE int FRAME2MS( framenum/*int*/:number ) {
//	return ( framenum * 1000 ) / 24;
//}
//
//class idRenderModel;
//class idAnimator;
//class idAnimBlend;
//class function_t;
//class idEntity;
//class idSaveGame;
//class idRestoreGame;
//
//typedef struct {
//	int		cycleCount;	// how many times the anim has wrapped to the begining (0 for clamped anims)
//	int		frame1;
//	int		frame2;
//	float	frontlerp;
//	float	backlerp;
//} frameBlend_t;
//
//typedef struct {
//	int						nameIndex;
//	int						parentNum;
//	int						animBits;
//	int						firstComponent;
//} jointAnimInfo_t;
//
class jointInfo_t {
	num:jointHandle_t;
	parentNum:jointHandle_t;
	channel: number /*int*/;
}
//
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

//typedef struct {
//	jointHandle_t			jointnum;
//	idMat3					mat;
//	idVec3					pos;
//	jointModTransform_t		transform_pos;
//	 jointModTransform_t		transform_axis;
//} jointMod_t;
//
//#define	ANIM_TX				BIT( 0 )
//#define	ANIM_TY				BIT( 1 )
//#define	ANIM_TZ				BIT( 2 )
//#define	ANIM_QX				BIT( 3 )
//#define	ANIM_QY				BIT( 4 )
//#define	ANIM_QZ				BIT( 5 )
//
//typedef enum {
//	FC_SCRIPTFUNCTION,
//	FC_SCRIPTFUNCTIONOBJECT,
//	FC_EVENTFUNCTION,
//	FC_SOUND,
//	FC_SOUND_VOICE,
//	FC_SOUND_VOICE2,
//	FC_SOUND_BODY,
//	FC_SOUND_BODY2,
//	FC_SOUND_BODY3,
//	FC_SOUND_WEAPON,
//	FC_SOUND_ITEM,
//	FC_SOUND_GLOBAL,
//	FC_SOUND_CHATTER,
//	FC_SKIN,
//	FC_TRIGGER,
//	FC_TRIGGER_SMOKE_PARTICLE,
//	FC_MELEE,
//	FC_DIRECTDAMAGE,
//	FC_BEGINATTACK,
//	FC_ENDATTACK,
//	FC_MUZZLEFLASH,
//	FC_CREATEMISSILE,
//	FC_LAUNCHMISSILE,
//	FC_FIREMISSILEATTARGET,
//	FC_FOOTSTEP,
//	FC_LEFTFOOT,
//	FC_RIGHTFOOT,
//	FC_ENABLE_EYE_FOCUS,
//	FC_DISABLE_EYE_FOCUS,
//	FC_FX,
//	FC_DISABLE_GRAVITY,
//	FC_ENABLE_GRAVITY,
//	FC_JUMP,
//	FC_ENABLE_CLIP,
//	FC_DISABLE_CLIP,
//	FC_ENABLE_WALK_IK,
//	FC_DISABLE_WALK_IK,
//	FC_ENABLE_LEG_IK,
//	FC_DISABLE_LEG_IK,
//	FC_RECORDDEMO,
//	FC_AVIGAME
//} frameCommandType_t;
//
class frameLookup_t{
	num: number /*int*/;
	firstCommand: number /*int*/;
}

class frameCommand_t {
//	frameCommandType_t		type;
//	idStr					*string;
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
	numFrames :number/*int*/;
	frameRate:number/*int*/;
	animLength:number/*int*/;
	numJoints:number/*int*/;
	numAnimatedComponents:number/*int*/;
//	idList<idBounds>		bounds;
//	idList<jointAnimInfo_t>	jointInfo;
//	idList<idJointQuat>		baseFrame;
//	idList<float>			componentFrames;
	name = new idStr;
	totaldelta = new idVec3;
	ref_count :number/*mutable int*/;

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
constructor() {
	this.ref_count	= 0;
	this.numFrames	= 0;
	this.numJoints	= 0;
	this.frameRate	= 24;
	this.animLength	= 0;
	this.totaldelta.Zero();
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
//	numFrames	= 0;
//	numJoints	= 0;
//	frameRate	= 24;
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
NumFrames(): number {
	return this.numFrames;
}

/*
====================
idMD5Anim::NumJoints
====================
*/
NumJoints( ) :number {
	return this. numJoints;
}

/*
====================
idMD5Anim::Length
====================
*/
Length( ) :number {
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
//	numFrames = parser.ParseInt();
//	if ( numFrames <= 0 ) {
//		parser.Error( "Invalid number of frames: %d", numFrames );
//	}
//
//	// parse num joints
//	parser.ExpectTokenString( "numJoints" );
//	numJoints = parser.ParseInt();
//	if ( numJoints <= 0 ) {
//		parser.Error( "Invalid number of joints: %d", numJoints );
//	}
//
//	// parse frame rate
//	parser.ExpectTokenString( "frameRate" );
//	frameRate = parser.ParseInt();
//	if ( frameRate < 0 ) {
//		parser.Error( "Invalid frame rate: %d", frameRate );
//	}
//
//	// parse number of animated components
//	parser.ExpectTokenString( "numAnimatedComponents" );
//	numAnimatedComponents = parser.ParseInt();
//	if ( ( numAnimatedComponents < 0 ) || ( numAnimatedComponents > numJoints * 6 ) ) {
//		parser.Error( "Invalid number of animated components: %d", numAnimatedComponents );
//	}
//
//	// parse the hierarchy
//	jointInfo.SetGranularity( 1 );
//	jointInfo.SetNum( numJoints );
//	parser.ExpectTokenString( "hierarchy" );
//	parser.ExpectTokenString( "{" );
//	for( i = 0; i < numJoints; i++ ) {
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
//	bounds.SetNum( numFrames );
//	for( i = 0; i < numFrames; i++ ) {
//		parser.Parse1DMatrix( 3, bounds[ i ][ 0 ].ToFloatPtr() );
//		parser.Parse1DMatrix( 3, bounds[ i ][ 1 ].ToFloatPtr() );
//	}
//	parser.ExpectTokenString( "}" );
//
//	// parse base frame
//	baseFrame.SetGranularity( 1 );
//	baseFrame.SetNum( numJoints );
//	parser.ExpectTokenString( "baseframe" );
//	parser.ExpectTokenString( "{" );
//	for( i = 0; i < numJoints; i++ ) {
//		idCQuat q;
//		parser.Parse1DMatrix( 3, baseFrame[ i ].t.ToFloatPtr() );
//		parser.Parse1DMatrix( 3, q.ToFloatPtr() );//baseFrame[ i ].q.ToFloatPtr() );
//		baseFrame[ i ].q = q.ToQuat();//.w = baseFrame[ i ].q.CalcW();
//	}
//	parser.ExpectTokenString( "}" );
//
//	// parse frames
//	componentFrames.SetGranularity( 1 );
//	componentFrames.SetNum( numAnimatedComponents * numFrames );
//
//	float *componentPtr = componentFrames.Ptr();
//	for( i = 0; i < numFrames; i++ ) {
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
//			for( i = 0; i < numFrames; i++ ) {
//				componentPtr[ numAnimatedComponents * i ] -= baseFrame[ 0 ].t.x;
//			}
//			totaldelta.x = componentPtr[ numAnimatedComponents * ( numFrames - 1 ) ];
//			componentPtr++;
//		} else {
//			totaldelta.x = 0.0f;
//		}
//		if ( jointInfo[ 0 ].animBits & ANIM_TY ) {
//			for( i = 0; i < numFrames; i++ ) {
//				componentPtr[ numAnimatedComponents * i ] -= baseFrame[ 0 ].t.y;
//			}
//			totaldelta.y = componentPtr[ numAnimatedComponents * ( numFrames - 1 ) ];
//			componentPtr++;
//		} else {
//			totaldelta.y = 0.0f;
//		}
//		if ( jointInfo[ 0 ].animBits & ANIM_TZ ) {
//			for( i = 0; i < numFrames; i++ ) {
//				componentPtr[ numAnimatedComponents * i ] -= baseFrame[ 0 ].t.z;
//			}
//			totaldelta.z = componentPtr[ numAnimatedComponents * ( numFrames - 1 ) ];
//		} else {
//			totaldelta.z = 0.0f;
//		}
//	}
//	baseFrame[ 0 ].t.Zero();
//
//	// we don't count last frame because it would cause a 1 frame pause at the end
//	animLength = ( ( numFrames - 1 ) * 1000 + frameRate - 1 ) / frameRate;
//
//	// done
//	return true;
//}
//
///*
//====================
//idMD5Anim::IncreaseRefs
//====================
//*/
//void idMD5Anim::IncreaseRefs( ) const {
//	ref_count++;
//}
//
///*
//====================
//idMD5Anim::DecreaseRefs
//====================
//*/
//void idMD5Anim::DecreaseRefs( ) const {
//	ref_count--;
//}
//
///*
//====================
//idMD5Anim::NumRefs
//====================
//*/
//int idMD5Anim::NumRefs( ) const {
//	return ref_count;
//}
//
///*
//====================
//idMD5Anim::GetFrameBlend
//====================
//*/
//void idMD5Anim::GetFrameBlend( framenum/*int*/:number, frameBlend_t &frame ) const {
//	frame.cycleCount	= 0;
//	frame.backlerp		= 0.0f;
//	frame.frontlerp		= 1.0f;
//
//	// frame 1 is first frame
//	framenum--;
//	if ( framenum < 0 ) {
//		framenum = 0;
//	} else if ( framenum >= numFrames ) {
//		framenum = numFrames - 1;
//	}
//
//	frame.frame1 = framenum;
//	frame.frame2 = framenum;
//}
//
///*
//====================
//idMD5Anim::ConvertTimeToFrame
//====================
//*/
//void idMD5Anim::ConvertTimeToFrame( /*int*/time:number, int cyclecount, frameBlend_t &frame ) const {
//	int frameTime;
//	int frameNum;
//
//	if ( numFrames <= 1 ) {
//		frame.frame1		= 0;
//		frame.frame2		= 0;
//		frame.backlerp		= 0.0f;
//		frame.frontlerp		= 1.0f;
//		frame.cycleCount	= 0;
//		return;
//	}
//
//	if ( time <= 0 ) {
//		frame.frame1		= 0;
//		frame.frame2		= 1;
//		frame.backlerp		= 0.0f;
//		frame.frontlerp		= 1.0f;
//		frame.cycleCount	= 0;
//		return;
//	}
//	
//	frameTime			= time * frameRate;
//	frameNum			= frameTime / 1000;
//	frame.cycleCount	= frameNum / ( numFrames - 1 );
//
//	if ( ( cyclecount > 0 ) && ( frame.cycleCount >= cyclecount ) ) {
//		frame.cycleCount	= cyclecount - 1;
//		frame.frame1		= numFrames - 1;
//		frame.frame2		= frame.frame1;
//		frame.backlerp		= 0.0f;
//		frame.frontlerp		= 1.0f;
//		return;
//	}
//	
//	frame.frame1 = frameNum % ( numFrames - 1 );
//	frame.frame2 = frame.frame1 + 1;
//	if ( frame.frame2 >= numFrames ) {
//		frame.frame2 = 0;
//	}
//
//	frame.backlerp	= ( frameTime % 1000 ) * 0.001f;
//	frame.frontlerp	= 1.0f - frame.backlerp;
//}
//
///*
//====================
//idMD5Anim::GetOrigin
//====================
//*/
//void idMD5Anim::GetOrigin( idVec3 &offset, /*int*/time:number, int cyclecount ) const {
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
//}
//
///*
//====================
//idMD5Anim::GetOriginRotation
//====================
//*/
//void idMD5Anim::GetOriginRotation( idQuat &rotation, /*int*/time:number, int cyclecount ) const {
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
//
///*
//====================
//idMD5Anim::GetBounds
//====================
//*/
//void idMD5Anim::GetBounds( idBounds &bnds, /*int*/time:number, int cyclecount ) const {
//	frameBlend_t	frame;
//	idVec3			offset;
//
//	ConvertTimeToFrame( time, cyclecount, frame );
//
//	bnds = bounds[ frame.frame1 ];
//	bnds.AddBounds( bounds[ frame.frame2 ] );
//
//	// origin position
//	offset = baseFrame[ 0 ].t;
//	if ( jointInfo[ 0 ].animBits & ( ANIM_TX | ANIM_TY | ANIM_TZ ) ) {
//		const float *componentPtr1 = &componentFrames[ numAnimatedComponents * frame.frame1 + jointInfo[ 0 ].firstComponent ];
//		const float *componentPtr2 = &componentFrames[ numAnimatedComponents * frame.frame2 + jointInfo[ 0 ].firstComponent ];
//
//		if ( jointInfo[ 0 ].animBits & ANIM_TX ) {
//			offset.x = *componentPtr1 * frame.frontlerp + *componentPtr2 * frame.backlerp;
//			componentPtr1++;
//			componentPtr2++;
//		}
//
//		if ( jointInfo[ 0 ].animBits & ANIM_TY ) {
//			offset.y = *componentPtr1 * frame.frontlerp + *componentPtr2 * frame.backlerp;
//			componentPtr1++;
//			componentPtr2++;
//		}
//
//		if ( jointInfo[ 0 ].animBits & ANIM_TZ ) {
//			offset.z = *componentPtr1 * frame.frontlerp + *componentPtr2 * frame.backlerp;
//		}
//	}
//
//	bnds[ 0 ] -= offset;
//	bnds[ 1 ] -= offset;
//}
//
///*
//====================
//idMD5Anim::GetInterpolatedFrame
//====================
//*/
//void idMD5Anim::GetInterpolatedFrame( frameBlend_t &frame, idJointQuat *joints, const int *index, int numIndexes ) const {
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
//	SIMDProcessor->Memcpy( joints, baseFrame.Ptr(), baseFrame.Num() * sizeof( baseFrame[ 0 ] ) );
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
//		animBits = infoPtr->animBits;
//		if ( animBits ) {
//
//			lerpIndex[numLerpJoints++] = j;
//
//			jointframe1 = frame1 + infoPtr->firstComponent;
//			jointframe2 = frame2 + infoPtr->firstComponent;
//
//			switch( animBits & (ANIM_TX|ANIM_TY|ANIM_TZ) ) {
//				case 0:
//					blendPtr->t = jointPtr->t;
//					break;
//				case ANIM_TX:
//					jointPtr->t.x = jointframe1[0];
//					blendPtr->t.x = jointframe2[0];
//					blendPtr->t.y = jointPtr->t.y;
//					blendPtr->t.z = jointPtr->t.z;
//					jointframe1++;
//					jointframe2++;
//					break;
//				case ANIM_TY:
//					jointPtr->t.y = jointframe1[0];
//					blendPtr->t.y = jointframe2[0];
//					blendPtr->t.x = jointPtr->t.x;
//					blendPtr->t.z = jointPtr->t.z;
//					jointframe1++;
//					jointframe2++;
//					break;
//				case ANIM_TZ:
//					jointPtr->t.z = jointframe1[0];
//					blendPtr->t.z = jointframe2[0];
//					blendPtr->t.x = jointPtr->t.x;
//					blendPtr->t.y = jointPtr->t.y;
//					jointframe1++;
//					jointframe2++;
//					break;
//				case ANIM_TX|ANIM_TY:
//					jointPtr->t.x = jointframe1[0];
//					jointPtr->t.y = jointframe1[1];
//					blendPtr->t.x = jointframe2[0];
//					blendPtr->t.y = jointframe2[1];
//					blendPtr->t.z = jointPtr->t.z;
//					jointframe1 += 2;
//					jointframe2 += 2;
//					break;
//				case ANIM_TX|ANIM_TZ:
//					jointPtr->t.x = jointframe1[0];
//					jointPtr->t.z = jointframe1[1];
//					blendPtr->t.x = jointframe2[0];
//					blendPtr->t.z = jointframe2[1];
//					blendPtr->t.y = jointPtr->t.y;
//					jointframe1 += 2;
//					jointframe2 += 2;
//					break;
//				case ANIM_TY|ANIM_TZ:
//					jointPtr->t.y = jointframe1[0];
//					jointPtr->t.z = jointframe1[1];
//					blendPtr->t.y = jointframe2[0];
//					blendPtr->t.z = jointframe2[1];
//					blendPtr->t.x = jointPtr->t.x;
//					jointframe1 += 2;
//					jointframe2 += 2;
//					break;
//				case ANIM_TX|ANIM_TY|ANIM_TZ:
//					jointPtr->t.x = jointframe1[0];
//					jointPtr->t.y = jointframe1[1];
//					jointPtr->t.z = jointframe1[2];
//					blendPtr->t.x = jointframe2[0];
//					blendPtr->t.y = jointframe2[1];
//					blendPtr->t.z = jointframe2[2];
//					jointframe1 += 3;
//					jointframe2 += 3;
//					break;
//			}
//
//			switch( animBits & (ANIM_QX|ANIM_QY|ANIM_QZ) ) {
//				case 0:
//					blendPtr->q = jointPtr->q;
//					break;
//				case ANIM_QX:
//					jointPtr->q.x = jointframe1[0];
//					blendPtr->q.x = jointframe2[0];
//					blendPtr->q.y = jointPtr->q.y;
//					blendPtr->q.z = jointPtr->q.z;
//					jointPtr->q.w = jointPtr->q.CalcW();
//					blendPtr->q.w = blendPtr->q.CalcW();
//					break;
//				case ANIM_QY:
//					jointPtr->q.y = jointframe1[0];
//					blendPtr->q.y = jointframe2[0];
//					blendPtr->q.x = jointPtr->q.x;
//					blendPtr->q.z = jointPtr->q.z;
//					jointPtr->q.w = jointPtr->q.CalcW();
//					blendPtr->q.w = blendPtr->q.CalcW();
//					break;
//				case ANIM_QZ:
//					jointPtr->q.z = jointframe1[0];
//					blendPtr->q.z = jointframe2[0];
//					blendPtr->q.x = jointPtr->q.x;
//					blendPtr->q.y = jointPtr->q.y;
//					jointPtr->q.w = jointPtr->q.CalcW();
//					blendPtr->q.w = blendPtr->q.CalcW();
//					break;
//				case ANIM_QX|ANIM_QY:
//					jointPtr->q.x = jointframe1[0];
//					jointPtr->q.y = jointframe1[1];
//					blendPtr->q.x = jointframe2[0];
//					blendPtr->q.y = jointframe2[1];
//					blendPtr->q.z = jointPtr->q.z;
//					jointPtr->q.w = jointPtr->q.CalcW();
//					blendPtr->q.w = blendPtr->q.CalcW();
//					break;
//				case ANIM_QX|ANIM_QZ:
//					jointPtr->q.x = jointframe1[0];
//					jointPtr->q.z = jointframe1[1];
//					blendPtr->q.x = jointframe2[0];
//					blendPtr->q.z = jointframe2[1];
//					blendPtr->q.y = jointPtr->q.y;
//					jointPtr->q.w = jointPtr->q.CalcW();
//					blendPtr->q.w = blendPtr->q.CalcW();
//					break;
//				case ANIM_QY|ANIM_QZ:
//					jointPtr->q.y = jointframe1[0];
//					jointPtr->q.z = jointframe1[1];
//					blendPtr->q.y = jointframe2[0];
//					blendPtr->q.z = jointframe2[1];
//					blendPtr->q.x = jointPtr->q.x;
//					jointPtr->q.w = jointPtr->q.CalcW();
//					blendPtr->q.w = blendPtr->q.CalcW();
//					break;
//				case ANIM_QX|ANIM_QY|ANIM_QZ:
//					jointPtr->q.x = jointframe1[0];
//					jointPtr->q.y = jointframe1[1];
//					jointPtr->q.z = jointframe1[2];
//					blendPtr->q.x = jointframe2[0];
//					blendPtr->q.y = jointframe2[1];
//					blendPtr->q.z = jointframe2[2];
//					jointPtr->q.w = jointPtr->q.CalcW();
//					blendPtr->q.w = blendPtr->q.CalcW();
//					break;
//			}
//		}
//	}
//
//	SIMDProcessor->BlendJoints( joints, blendJoints, frame.backlerp, lerpIndex, numLerpJoints );
//
//	if ( frame.cycleCount ) {
//		joints[ 0 ].t += totaldelta * ( float )frame.cycleCount;
//	}
//}
//
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
//	SIMDProcessor->Memcpy( joints, baseFrame.Ptr(), baseFrame.Num() * sizeof( baseFrame[ 0 ] ) );
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
//		animBits = infoPtr->animBits;
//		if ( animBits ) {
//
//			jointframe = frame + infoPtr->firstComponent;
//
//			if ( animBits & (ANIM_TX|ANIM_TY|ANIM_TZ) ) {
//
//				if ( animBits & ANIM_TX ) {
//					jointPtr->t.x = *jointframe++;
//				}
//
//				if ( animBits & ANIM_TY ) {
//					jointPtr->t.y = *jointframe++;
//				}
//
//				if ( animBits & ANIM_TZ ) {
//					jointPtr->t.z = *jointframe++;
//				}
//			}
//
//			if ( animBits & (ANIM_QX|ANIM_QY|ANIM_QZ) ) {
//
//				if ( animBits & ANIM_QX ) {
//					jointPtr->q.x = *jointframe++;
//				}
//
//				if ( animBits & ANIM_QY ) {
//					jointPtr->q.y = *jointframe++;
//				}
//
//				if ( animBits & ANIM_QZ ) {
//					jointPtr->q.z = *jointframe;
//				}
//
//				jointPtr->q.w = jointPtr->q.CalcW();
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
		//if ( jointInfo.Num() != model->NumJoints() ) {
		//	gameLocal.Error( "Model '%s' has different # of joints than anim '%s'", model->Name(), name.c_str() );
		//}

		//const idMD5Joint *modelJoints = model->GetJoints();
		//for( i = 0; i < jointInfo.Num(); i++ ) {
		//	jointNum = jointInfo[ i ].nameIndex;
		//	if ( modelJoints[ i ].name != animationLib.JointName( jointNum ) ) {
		//		gameLocal.Error( "Model '%s''s joint names don't match anim '%s''s", model->Name(), name.c_str() );
		//	}
		//	if ( modelJoints[ i ].parent ) {
		//		parent = modelJoints[ i ].parent - modelJoints;
		//	} else {
		//		parent = -1;
		//	}
		//	if ( parent != jointInfo[ i ].parentNum ) {
		//		gameLocal.Error( "Model '%s' has different joint hierarchy than anim '%s'", model->Name(), name.c_str() );
		//	}
		//}
	}
};

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
	constructor ( ) {
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
idAnim::idAnim( modelDef:idDeclModelDef, const idAnim *anim ) {
	var/*int*/i:number;

	this.modelDef = modelDef;
	numAnims = anim.numAnims;
	name = anim.name;
	this.realname = anim.realname;
	flags = anim.flags;

	memset( anims, 0, sizeof( anims ) );
	for( i = 0; i < numAnims; i++ ) {
		anims[ i ] = anim.anims[ i ];
		anims[ i ].IncreaseRefs();
	}

	frameLookup.SetNum( anim.frameLookup.Num() );
	memcpy( frameLookup.Ptr(), anim.frameLookup.Ptr(), frameLookup.MemoryUsed() );

	frameCommands.SetNum( anim.frameCommands.Num() );
	for( i = 0; i < frameCommands.Num(); i++ ) {
		frameCommands[ i ] = anim.frameCommands[ i ];
		if ( anim.frameCommands[ i ].string ) {
			frameCommands[ i ].string = new idStr( *anim.frameCommands[ i ].string );
		}
	}
}
//
///*
//=====================
//idAnim::~idAnim
//=====================
//*/
//idAnim::~idAnim() {
//	var/*int*/i:number;
//
//	for( i = 0; i < numAnims; i++ ) {
//		anims[ i ].DecreaseRefs();
//	}
//
//	for( i = 0; i < frameCommands.Num(); i++ ) {
//		delete frameCommands[ i ].string;
//	}
//}
//
/*
=====================
idAnim::SetAnim
=====================
*/
	SetAnim ( modelDef: idDeclModelDef, sourcename: string, animname: string, /*int*/num: number, md5anims: idMD5Anim [ /*ANIM_MaxSyncedAnims*/ ] ) {
		var /*int*/i: number;

		this.modelDef = modelDef;
		todoThrow ( );
		//for( i = 0; i < numAnims; i++ ) {
		//	anims[ i ].DecreaseRefs();
		//	anims[ i ] = null;
		//}

		//assert( ( num > 0 ) && ( num <= ANIM_MaxSyncedAnims ) );
		//numAnims	= num;
		//this.realname	.equals( sourcename;
		//name		.equals( animname;

		//for( i = 0; i < num; i++ ) {
		//	anims[ i ] = md5anims[ i ];
		//	anims[ i ].IncreaseRefs();
		//}

		//memset( &flags, 0, sizeof( flags ) );

		//for( i = 0; i < frameCommands.Num(); i++ ) {
		//	delete frameCommands[ i ].string;
		//}

		//frameLookup.Clear();
		//frameCommands.Clear();
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
///*
//=====================
//idAnim::MD5Anim
//
//index 0 will never be NULL.  Any anim >= NumAnims will return NULL.
//=====================
//*/
//const idMD5Anim *idAnim::MD5Anim( /*int*/num:number ) const {
//	if ( anims == NULL || anims[0] == NULL ) { 
//		return NULL;
//	}
//	return anims[ num ];
//}
//
///*
//=====================
//idAnim::ModelDef
//=====================
//*/
//const idDeclModelDef *idAnim::ModelDef( ) const {
//	return modelDef;
//}
//
///*
//=====================
//idAnim::Length
//=====================
//*/
//int idAnim::Length( ) const {
//	if ( !anims[ 0 ] ) {
//		return 0;
//	}
//
//	return anims[ 0 ].Length();
//}
//
///*
//=====================
//idAnim::NumFrames
//=====================
//*/
//int	idAnim::NumFrames( ) const { 
//	if ( !anims[ 0 ] ) {
//		return 0;
//	}
//	
//	return anims[ 0 ].NumFrames();
//}
//
///*
//=====================
//idAnim::NumAnims
//=====================
//*/
//int	idAnim::NumAnims( ) const { 
//	return numAnims;
//}
//
///*
//=====================
//idAnim::TotalMovementDelta
//=====================
//*/
//const idVec3 &idAnim::TotalMovementDelta( ) const {
//	if ( !anims[ 0 ] ) {
//		return vec3_zero;
//	}
//	
//	return anims[ 0 ].TotalMovementDelta();
//}
//
///*
//=====================
//idAnim::GetOrigin
//=====================
//*/
//bool idAnim::GetOrigin( idVec3 &offset, int animNum, int currentTime, int cyclecount ) const {
//	if ( !anims[ animNum ] ) {
//		offset.Zero();
//		return false;
//	}
//
//	anims[ animNum ].GetOrigin( offset, currentTime, cyclecount );
//	return true;
//}
//
///*
//=====================
//idAnim::GetOriginRotation
//=====================
//*/
//bool idAnim::GetOriginRotation( idQuat &rotation, int animNum, int currentTime, int cyclecount ) const {
//	if ( !anims[ animNum ] ) {
//		rotation.Set( 0.0f, 0.0f, 0.0f, 1.0f );
//		return false;
//	}
//
//	anims[ animNum ].GetOriginRotation( rotation, currentTime, cyclecount );
//	return true;
//}
//
///*
//=====================
//idAnim::GetBounds
//=====================
//*/
//ID_INLINE bool idAnim::GetBounds( idBounds &bounds, int animNum, int currentTime, int cyclecount ) const {
//	if ( !anims[ animNum ] ) {
//		return false;
//	}
//
//	anims[ animNum ].GetBounds( bounds, currentTime, cyclecount );
//	return true;
//}
//

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
//	if ( ( framenum < 1 ) || ( framenum > anims[ 0 ].NumFrames() ) ) {
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
//	if ( !frameLookup.Num() ) {
//		// we haven't, so allocate the table and initialize it
//		frameLookup.SetGranularity( 1 );
//		frameLookup.SetNum( anims[ 0 ].NumFrames() );
//		for( i = 0; i < frameLookup.Num(); i++ ) {
//			frameLookup[ i ].num = 0;
//			frameLookup[ i ].firstCommand = 0;
//		}
//	}
//
//	// allocate space for a new command
//	frameCommands.Alloc();
//
//	// calculate the index of the new command
//	index = frameLookup[ framenum ].firstCommand + frameLookup[ framenum ].num;
//
//	// move all commands from our index onward up one to give us space for our new command
//	for( i = frameCommands.Num() - 1; i > index; i-- ) {
//		frameCommands[ i ] = frameCommands[ i - 1 ];
//	}
//
//	// fix the indices of any later frames to account for the inserted command
//	for( i = framenum + 1; i < frameLookup.Num(); i++ ) {
//		frameLookup[ i ].firstCommand++;
//	}
//
//	// store the new command 
//	frameCommands[ index ] = fc;
//
//	// increase the number of commands on this frame
//	frameLookup[ framenum ].num++;
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
//	numframes = anims[ 0 ].NumFrames();
//
//	frame = from;
//	while( frame != to ) {
//		frame++;
//		if ( frame >= numframes ) {
//			frame = 0;
//		}
//
//		index = frameLookup[ frame ].firstCommand;
//		end = index + frameLookup[ frame ].num;
//		while( index < end ) {
//			const frameCommand_t &command = frameCommands[ index++ ];
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
//	if ( !frameCommands.Num() ) {
//		return -1;
//	}
//
//	numframes = anims[ 0 ].NumFrames();
//	for( frame = 0; frame < numframes; frame++ ) {
//		end = frameLookup[ frame ].firstCommand + frameLookup[ frame ].num;
//		for( index = frameLookup[ frame ].firstCommand; index < end; index++ ) {
//			if ( frameCommands[ index ].type == framecommand ) {
//				if ( command ) {
//					*command = &frameCommands[ index ];
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
//	if ( !frameCommands.Num() ) {
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


///*
//==============================================================================================
//
//	idAnimBlend
//
//==============================================================================================
//*/
//
//class idAnimBlend {
//private:
//	const class idDeclModelDef	*modelDef;
//	int							starttime;
//	int							endtime;
//	int							timeOffset;
//	float						rate;
//
//	int							blendStartTime;
//	int							blendDuration;
//	float						blendStartValue;
//	float						blendEndValue;
//
//	float						animWeights[ ANIM_MaxSyncedAnims ];
//	short						cycle;
//	short						frame;
//	short						animNum;
//	bool						allowMove;
//	bool						allowFrameCommands;
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


///*
//=====================
//idAnimBlend::idAnimBlend
//=====================
//*/
//idAnimBlend::idAnimBlend( ) {
//	Reset( NULL );
//}
//
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
//	savefile.WriteInt( starttime );
//	savefile.WriteInt( endtime );
//	savefile.WriteInt( timeOffset );
//	savefile.WriteFloat( rate );
//
//	savefile.WriteInt( blendStartTime );
//	savefile.WriteInt( blendDuration );
//	savefile.WriteFloat( blendStartValue );
//	savefile.WriteFloat( blendEndValue );
//
//	for( i = 0; i < ANIM_MaxSyncedAnims; i++ ) {
//		savefile.WriteFloat( animWeights[ i ] );
//	}
//	savefile.WriteShort( cycle );
//	savefile.WriteShort( frame );
//	savefile.WriteShort( animNum );
//	savefile.WriteBool( allowMove );
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
//	savefile.ReadInt( starttime );
//	savefile.ReadInt( endtime );
//	savefile.ReadInt( timeOffset );
//	savefile.ReadFloat( rate );
//
//	savefile.ReadInt( blendStartTime );
//	savefile.ReadInt( blendDuration );
//	savefile.ReadFloat( blendStartValue );
//	savefile.ReadFloat( blendEndValue );
//
//	for( i = 0; i < ANIM_MaxSyncedAnims; i++ ) {
//		savefile.ReadFloat( animWeights[ i ] );
//	}
//	savefile.ReadShort( cycle );
//	savefile.ReadShort( frame );
//	savefile.ReadShort( animNum );
//	if ( !modelDef ) {
//		animNum = 0;
//	} else if ( ( animNum < 0 ) || ( animNum > modelDef.NumAnims() ) ) {
//		gameLocal.Warning( "Anim number %d out of range for model '%s' during save game", animNum, modelDef.GetModelName() );
//		animNum = 0;
//	}
//	savefile.ReadBool( allowMove );
//	savefile.ReadBool( allowFrameCommands );
//}
//
///*
//=====================
//idAnimBlend::Reset
//=====================
//*/
//void idAnimBlend::Reset( const idDeclModelDef *_modelDef ) {
//	modelDef	= _modelDef;
//	cycle		= 1;
//	starttime	= 0;
//	endtime		= 0;
//	timeOffset	= 0;
//	rate		= 1.0f;
//	frame		= 0;
//	allowMove	= true;
//	allowFrameCommands = true;
//	animNum		= 0;
//
//	memset( animWeights, 0, sizeof( animWeights ) );
//
//	blendStartValue = 0.0f;
//	blendEndValue	= 0.0f;
//    blendStartTime	= 0;
//	blendDuration	= 0;
//}
//
///*
//=====================
//idAnimBlend::FullName
//=====================
//*/
//const char *idAnimBlend::AnimFullName( ) const {
//	const idAnim *anim = Anim();
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
//	const idAnim *anim = Anim();
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
//	const idAnim *anim = Anim();
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
//	const idAnim *anim = Anim();
//	if ( !anim ) {
//		return 0;
//	}
//
//	return anim.Length();
//}
//
///*
//=====================
//idAnimBlend::GetWeight
//=====================
//*/
//float idAnimBlend::GetWeight( int currentTime ) const {
//	int		timeDelta;
//	float	frac;
//	float	w;
//
//	timeDelta = currentTime - blendStartTime;
//	if ( timeDelta <= 0 ) {
//		w = blendStartValue;
//	} else if ( timeDelta >= blendDuration ) {
//		w = blendEndValue;
//	} else {
//		frac = ( float )timeDelta / ( float )blendDuration;
//		w = blendStartValue + ( blendEndValue - blendStartValue ) * frac;
//	}
//
//	return w;
//}
//
///*
//=====================
//idAnimBlend::GetFinalWeight
//=====================
//*/
//float idAnimBlend::GetFinalWeight( ) const {
//	return blendEndValue;
//}
//
///*
//=====================
//idAnimBlend::SetWeight
//=====================
//*/
//void idAnimBlend::SetWeight( float newweight, int currentTime, int blendTime ) {
//	blendStartValue = GetWeight( currentTime );
//	blendEndValue = newweight;
//    blendStartTime = currentTime - 1;
//	blendDuration = blendTime;
//
//	if ( !newweight ) {
//		endtime = currentTime + blendTime;
//	}
//}
//
///*
//=====================
//idAnimBlend::NumSyncedAnims
//=====================
//*/
//int idAnimBlend::NumSyncedAnims( ) const {
//	const idAnim *anim = Anim();
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
//	const idAnim *anim = Anim();
//	if ( !anim ) {
//		return false;
//	}
//
//	if ( ( num < 0 ) || ( num > anim.NumAnims() ) ) {
//		return false;
//	}
//
//	animWeights[ num ] = weight;
//	return true;
//}
//
///*
//=====================
//idAnimBlend::SetFrame
//=====================
//*/
//void idAnimBlend::SetFrame( modelDef:idDeclModelDef, int _animNum, int _frame, int currentTime, int blendTime ) {
//	Reset( modelDef );
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
//	animNum				= _animNum;
//	starttime			= currentTime;
//	endtime				= -1;
//	cycle				= -1;
//	animWeights[ 0 ]	= 1.0f;
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
//	blendEndValue		= 1.0f;
//	blendStartTime		= currentTime - 1;
//	blendDuration		= blendTime;
//	blendStartValue		= 0.0f;
//}
//
///*
//=====================
//idAnimBlend::CycleAnim
//=====================
//*/
//void idAnimBlend::CycleAnim( modelDef:idDeclModelDef, int _animNum, int currentTime, int blendTime ) {
//	Reset( modelDef );
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
//	animNum				= _animNum;
//	animWeights[ 0 ]	= 1.0f;
//	endtime				= -1;
//	cycle				= -1;
//	if ( _anim.GetAnimFlags().random_cycle_start ) {
//		// start the animation at a random time so that characters don't walk in sync
//		starttime = currentTime - gameLocal.random.RandomFloat() * _anim.Length();
//	} else {
//		starttime = currentTime;
//	}
//
//	// set up blend
//	blendEndValue		= 1.0f;
//	blendStartTime		= currentTime - 1;
//	blendDuration		= blendTime;
//	blendStartValue		= 0.0f;
//}
//
///*
//=====================
//idAnimBlend::PlayAnim
//=====================
//*/
//void idAnimBlend::PlayAnim( modelDef:idDeclModelDef, int _animNum, int currentTime, int blendTime ) {
//	Reset( modelDef );
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
//	animNum				= _animNum;
//	starttime			= currentTime;
//	endtime				= starttime + _anim.Length();
//	cycle				= 1;
//	animWeights[ 0 ]	= 1.0f;
//
//	// set up blend
//	blendEndValue		= 1.0f;
//	blendStartTime		= currentTime - 1;
//	blendDuration		= blendTime;
//	blendStartValue		= 0.0f;
//}
//
///*
//=====================
//idAnimBlend::Clear
//=====================
//*/
//void idAnimBlend::Clear( int currentTime, int clearTime ) {
//	if ( !clearTime ) {
//		Reset( modelDef );
//	} else {
//		SetWeight( 0.0f, currentTime, clearTime );
//	}
//}
//
///*
//=====================
//idAnimBlend::IsDone
//=====================
//*/
//bool idAnimBlend::IsDone( int currentTime ) const {
//	if ( !frame && ( endtime > 0 ) && ( currentTime >= endtime ) ) {
//		return true;
//	}
//
//	if ( ( blendEndValue <= 0.0f ) && ( currentTime >= ( blendStartTime + blendDuration ) ) ) {
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
//bool idAnimBlend::FrameHasChanged( int currentTime ) const {
//	// if we don't have an anim, no change
//	if ( !animNum ) {
//		return false;
//	}
//
//	// if anim is done playing, no change
//	if ( ( endtime > 0 ) && ( currentTime > endtime ) ) {
//		return false;
//	}
//
//	// if our blend weight changes, we need to update
//	if ( ( currentTime < ( blendStartTime + blendDuration ) && ( blendStartValue != blendEndValue ) ) ) {
//		return true;
//	}
//
//	// if we're a single frame anim and this isn't the frame we started on, we don't need to update
//	if ( ( frame || ( NumFrames() == 1 ) ) && ( currentTime != starttime ) ) {
//		return false;
//	}
//
//	return true;
//}
//
///*
//=====================
//idAnimBlend::GetCycleCount
//=====================
//*/
//int idAnimBlend::GetCycleCount( ) const {
//	return cycle;
//}
//
///*
//=====================
//idAnimBlend::SetCycleCount
//=====================
//*/
//void idAnimBlend::SetCycleCount( int count ) {
//	const idAnim *anim = Anim();
//
//	if ( !anim ) {
//		cycle = -1;
//		endtime = 0;
//	} else {
//		cycle = count;
//		if ( cycle < 0 ) {
//			cycle = -1;
//			endtime	= -1;
//		} else if ( cycle == 0 ) {
//			cycle = 1;
//
//			// most of the time we're running at the original frame rate, so avoid the int-to-float-to-int conversion
//			if ( rate == 1.0f ) {
//				endtime	= starttime - timeOffset + anim.Length();
//			} else if ( rate != 0.0f ) {
//				endtime	= starttime - timeOffset + anim.Length() / rate;
//			} else {
//				endtime = -1;
//			}
//		} else {
//			// most of the time we're running at the original frame rate, so avoid the int-to-float-to-int conversion
//			if ( rate == 1.0f ) {
//				endtime	= starttime - timeOffset + anim.Length() * cycle;
//			} else if ( rate != 0.0f ) {
//				endtime	= starttime - timeOffset + ( anim.Length() * cycle ) / rate;
//			} else {
//				endtime = -1;
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
//void idAnimBlend::SetPlaybackRate( int currentTime, float newRate ) {
//	int animTime;
//
//	if ( rate == newRate ) {
//		return;
//	}
//
//	animTime = AnimTime( currentTime );
//	if ( newRate == 1.0f ) {
//		timeOffset = animTime - ( currentTime - starttime );
//	} else {
//		timeOffset = animTime - ( currentTime - starttime ) * newRate;
//	}
//
//	rate = newRate;
//
//	// update the anim endtime
//	SetCycleCount( cycle );
//}
//
///*
//=====================
//idAnimBlend::GetPlaybackRate
//=====================
//*/
//float idAnimBlend::GetPlaybackRate( ) const {
//	return rate;
//}
//
///*
//=====================
//idAnimBlend::SetStartTime
//=====================
//*/
//void idAnimBlend::SetStartTime( int _startTime ) {
//	starttime = _startTime;
//
//	// update the anim endtime
//	SetCycleCount( cycle );
//}
//
///*
//=====================
//idAnimBlend::GetStartTime
//=====================
//*/
//int idAnimBlend::GetStartTime( ) const {
//	if ( !animNum ) {
//		return 0;
//	}
//
//	return starttime;
//}
//
///*
//=====================
//idAnimBlend::GetEndTime
//=====================
//*/
//int idAnimBlend::GetEndTime( ) const {
//	if ( !animNum ) {
//		return 0;
//	}
//
//	return endtime;
//}
//
///*
//=====================
//idAnimBlend::PlayLength
//=====================
//*/
//int idAnimBlend::PlayLength( ) const {
//	if ( !animNum ) {
//		return 0;
//	}
//
//	if ( endtime < 0 ) {
//		return -1;
//	}
//
//	return endtime - starttime + timeOffset;
//}
//
///*
//=====================
//idAnimBlend::AllowMovement
//=====================
//*/
//void idAnimBlend::AllowMovement( bool allow ) {
//	allowMove = allow;
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
//
//
///*
//=====================
//idAnimBlend::Anim
//=====================
//*/
//const idAnim *idAnimBlend::Anim( ) const {
//	if ( !modelDef ) {
//		return NULL;
//	}
//
//	const idAnim *anim = modelDef.GetAnim( animNum );
//	return anim;
//}
//
///*
//=====================
//idAnimBlend::AnimNum
//=====================
//*/
//int idAnimBlend::AnimNum( ) const {
//	return animNum;
//}
//
///*
//=====================
//idAnimBlend::AnimTime
//=====================
//*/
//int idAnimBlend::AnimTime( int currentTime ) const {
//	/*int*/time:number;
//	int length;
//	const idAnim *anim = Anim();
//
//	if ( anim ) {
//		if ( frame ) {
//			return FRAME2MS( frame - 1 );
//		}
//
//		// most of the time we're running at the original frame rate, so avoid the int-to-float-to-int conversion
//		if ( rate == 1.0f ) {
//			time = currentTime - starttime + timeOffset;
//		} else {
//			time = static_cast<int>( ( currentTime - starttime ) * rate ) + timeOffset;
//		}
//
//		// given enough time, we can easily wrap time around in our frame calculations, so
//		// keep cycling animations' time within the length of the anim.
//		length = anim.Length();
//		if ( ( cycle < 0 ) && ( length > 0 ) ) {
//			time %= length;
//
//			// time will wrap after 24 days (oh no!), resulting in negative results for the %.
//			// adding the length gives us the proper result.
//			if ( time < 0 ) {
//				time += length;
//			}
//		}
//		return time;
//	} else {
//		return 0;
//	}
//}
//
///*
//=====================
//idAnimBlend::GetFrameNumber
//=====================
//*/
//int idAnimBlend::GetFrameNumber( int currentTime ) const {
//	const idMD5Anim	*md5anim;
//	frameBlend_t	frameinfo;
//	int				animTime;
//
//	const idAnim *anim = Anim();
//	if ( !anim ) {
//		return 1;
//	}
//
//	if ( frame ) {
//		return frame;
//	}
//
//	md5anim = anim.MD5Anim( 0 );
//	animTime = AnimTime( currentTime );
//	md5anim.ConvertTimeToFrame( animTime, cycle, frameinfo );
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
//	if ( !allowFrameCommands || !ent || frame || ( ( endtime > 0 ) && ( fromtime > endtime ) ) ) {
//		return;
//	}
//
//	const idAnim *anim = Anim();
//	if ( !anim || !anim.HasFrameCommands() ) {
//		return;
//	}
//
//	if ( totime <= starttime ) {
//		// don't play until next frame or we'll play commands twice.
//		// this happens on the player sometimes.
//		return;
//	}
//
//	fromFrameTime	= AnimTime( fromtime );
//	toFrameTime		= AnimTime( totime );
//	if ( toFrameTime < fromFrameTime ) {
//		toFrameTime += anim.Length();
//	}
//
//	md5anim = anim.MD5Anim( 0 );
//	md5anim.ConvertTimeToFrame( fromFrameTime, cycle, frame1 );
//	md5anim.ConvertTimeToFrame( toFrameTime, cycle, frame2 );
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
//bool idAnimBlend::BlendAnim( int currentTime, int channel, int numJoints, idJointQuat *blendFrame, float &blendWeight, bool removeOriginOffset, bool overrideBlend, bool printInfo ) const {
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
//	const idAnim *anim = Anim();
//	if ( !anim ) {
//		return false;
//	}
//
//	float weight = GetWeight( currentTime );
//	if ( blendWeight > 0.0f ) {
//		if ( ( endtime >= 0 ) && ( currentTime >= endtime ) ) {
//			return false;
//		}
//		if ( !weight ) {
//			return false;
//		}
//		if ( overrideBlend ) {
//			blendWeight = 1.0f - weight;
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
//	time = AnimTime( currentTime );
//
//	numAnims = anim.NumAnims();
//	if ( numAnims == 1 ) {
//		md5anim = anim.MD5Anim( 0 );
//		if ( frame ) {
//			md5anim.GetSingleFrame( frame - 1, jointFrame, modelDef.GetChannelJoints( channel ), modelDef.NumJointsOnChannel( channel ) );
//		} else {
//			md5anim.ConvertTimeToFrame( time, cycle, frametime );
//			md5anim.GetInterpolatedFrame( frametime, jointFrame, modelDef.GetChannelJoints( channel ), modelDef.NumJointsOnChannel( channel ) );
//		}
//	} else {
//		//
//		// need to mix the multipoint anim together first
//		//
//		// allocate a temporary buffer to copy the joints to
//		mixFrame = ( idJointQuat * )_alloca16( numJoints * sizeof( *jointFrame ) );
//
//		if ( !frame ) {
//			anim.MD5Anim( 0 ).ConvertTimeToFrame( time, cycle, frametime );
//		}
//
//		ptr = jointFrame;
//		mixWeight = 0.0f;
//		for( i = 0; i < numAnims; i++ ) {
//			if ( animWeights[ i ] > 0.0f ) {
//				mixWeight += animWeights[ i ];
//				lerp = animWeights[ i ] / mixWeight;
//				md5anim = anim.MD5Anim( i );
//				if ( frame ) {
//					md5anim.GetSingleFrame( frame - 1, ptr, modelDef.GetChannelJoints( channel ), modelDef.NumJointsOnChannel( channel ) );
//				} else {
//					md5anim.GetInterpolatedFrame( frametime, ptr, modelDef.GetChannelJoints( channel ), modelDef.NumJointsOnChannel( channel ) );
//				}
//
//				// only blend after the first anim is mixed in
//				if ( ptr != jointFrame ) {
//					SIMDProcessor.BlendJoints( jointFrame, ptr, lerp, modelDef.GetChannelJoints( channel ), modelDef.NumJointsOnChannel( channel ) );
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
//		if ( allowMove ) {
//#ifdef VELOCITY_MOVE
//			jointFrame[ 0 ].t.x = 0.0f;
//#else
//			jointFrame[ 0 ].t.Zero();
//#endif
//		}
//
//		if ( anim.GetAnimFlags().anim_turn ) {
//			jointFrame[ 0 ].q.Set( -0.70710677f, 0.0f, 0.0f, 0.70710677f );
//		}
//	}
//
//	if ( !blendWeight ) {
//		blendWeight = weight;
//		if ( channel != ANIMCHANNEL_ALL ) {
//			const int *index = modelDef.GetChannelJoints( channel );
//			const /*int*/num:number = modelDef.NumJointsOnChannel( channel );
//			for( i = 0; i < num; i++ ) {
//				int j = index[i];
//				blendFrame[j].t = jointFrame[j].t;
//				blendFrame[j].q = jointFrame[j].q;
//			}
//		}
//    } else {
//		blendWeight += weight;
//		lerp = weight / blendWeight;
//		SIMDProcessor.BlendJoints( blendFrame, jointFrame, lerp, modelDef.GetChannelJoints( channel ), modelDef.NumJointsOnChannel( channel ) );
//	}
//
//	if ( printInfo ) {
//		if ( frame ) {
//			gameLocal.Printf( "  %s: '%s', %d, %.2f%%\n", channelNames[ channel ], anim.FullName(), frame, weight * 100.0f );
//		} else {
//			gameLocal.Printf( "  %s: '%s', %.3f, %.2f%%\n", channelNames[ channel ], anim.FullName(), ( float )frametime.frame1 + frametime.backlerp, weight * 100.0f );
//		}
//	}
//
//	return true;
//}
//
///*
//=====================
//idAnimBlend::BlendOrigin
//=====================
//*/
//void idAnimBlend::BlendOrigin( int currentTime, idVec3 &blendPos, float &blendWeight, bool removeOriginOffset ) const {
//	float	lerp;
//	idVec3	animpos;
//	idVec3	pos;
//	int		time;
//	int		num;
//	int		i;
//
//	if ( frame || ( ( endtime > 0 ) && ( currentTime > endtime ) ) ) {
//		return;
//	}
//
//	const idAnim *anim = Anim();
//	if ( !anim ) {
//		return;
//	}
//
//	if ( allowMove && removeOriginOffset ) {
//		return;
//	}
//
//	float weight = GetWeight( currentTime );
//	if ( !weight ) {
//		return;
//	}
//
//	time = AnimTime( currentTime );
//
//	pos.Zero();
//	num = anim.NumAnims();
//	for( i = 0; i < num; i++ ) {
//		anim.GetOrigin( animpos, i, time, cycle );
//		pos += animpos * animWeights[ i ];
//	}
//
//	if ( !blendWeight ) {
//		blendPos = pos;
//		blendWeight = weight;
//	} else {
//		lerp = weight / ( blendWeight + weight );
//		blendPos += lerp * ( pos - blendPos );
//		blendWeight += weight;
//	}
//}
//
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
//	if ( frame || !allowMove || ( ( endtime > 0 ) && ( fromtime > endtime ) ) ) {
//		return;
//	}
//
//	const idAnim *anim = Anim();
//	if ( !anim ) {
//		return;
//	}
//
//	float weight = GetWeight( totime );
//	if ( !weight ) {
//		return;
//	}
//
//	time1 = AnimTime( fromtime );
//	time2 = AnimTime( totime );
//	if ( time2 < time1 ) {
//		time2 += anim.Length();
//	}
//
//	num = anim.NumAnims();
//
//	pos1.Zero();
//	pos2.Zero();
//	for( i = 0; i < num; i++ ) {
//		anim.GetOrigin( animpos, i, time1, cycle );
//		pos1 += animpos * animWeights[ i ];
//
//		anim.GetOrigin( animpos, i, time2, cycle );
//		pos2 += animpos * animWeights[ i ];
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
//	if ( frame || !allowMove || ( ( endtime > 0 ) && ( fromtime > endtime ) ) ) {
//		return;
//	}
//
//	const idAnim *anim = Anim();
//	if ( !anim || !anim.GetAnimFlags().anim_turn ) {
//		return;
//	}
//
//	float weight = GetWeight( totime );
//	if ( !weight ) {
//		return;
//	}
//
//	time1 = AnimTime( fromtime );
//	time2 = AnimTime( totime );
//	if ( time2 < time1 ) {
//		time2 += anim.Length();
//	}
//
//	q1.Set( 0.0f, 0.0f, 0.0f, 1.0f );
//	q2.Set( 0.0f, 0.0f, 0.0f, 1.0f );
//
//	mixWeight = 0.0f;
//	num = anim.NumAnims();
//	for( i = 0; i < num; i++ ) {
//		if ( animWeights[ i ] > 0.0f ) {
//			mixWeight += animWeights[ i ];
//			if ( animWeights[ i ] == mixWeight ) {
//				anim.GetOriginRotation( q1, i, time1, cycle );
//				anim.GetOriginRotation( q2, i, time2, cycle );
//			} else {
//				lerp = animWeights[ i ] / mixWeight;
//				anim.GetOriginRotation( q3, i, time1, cycle );
//				q1.Slerp( q1, q3, lerp );
//
//				anim.GetOriginRotation( q3, i, time2, cycle );
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
//
///*
//=====================
//idAnimBlend::AddBounds
//=====================
//*/
//bool idAnimBlend::AddBounds( int currentTime, idBounds &bounds, bool removeOriginOffset ) const {
//	int			i;
//	int			num;
//	idBounds	b;
//	int			time;
//	idVec3		pos;
//	bool		addorigin;
//
//	if ( ( endtime > 0 ) && ( currentTime > endtime ) ) {
//		return false;
//	}
//
//	const idAnim *anim = Anim();
//	if ( !anim ) {
//		return false;
//	}
//
//	float weight = GetWeight( currentTime );
//	if ( !weight ) {
//		return false;
//	}
//
//	time = AnimTime( currentTime );
//	num = anim.NumAnims();
//	
//	addorigin = !allowMove || !removeOriginOffset;
//	for( i = 0; i < num; i++ ) {
//		if ( anim.GetBounds( b, i, time, cycle ) ) {
//			if ( addorigin ) {
//				anim.GetOrigin( pos, i, time, cycle );
//				b.TranslateSelf( pos );
//			}
//			bounds.AddBounds( b );
//		}
//	}
//
//	return true;
//}


//};
//
///*
//==============================================================================================
//
//	idAFPoseJointMod
//
//==============================================================================================
//*/
//
//typedef enum {
//	AF_JOINTMOD_AXIS,
//	AF_JOINTMOD_ORIGIN,
//	AF_JOINTMOD_BOTH
//} AFJointModType_t;
//
//class idAFPoseJointMod {
//public:
//								idAFPoseJointMod( );
//
//	AFJointModType_t			mod;
//	idMat3						axis;
//	idVec3						origin;
//};
//
//ID_INLINE idAFPoseJointMod::idAFPoseJointMod( ) {
//	mod = AF_JOINTMOD_AXIS;
//	axis.Identity();
//	origin.Zero();
//}
//
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
//
//	idAnimBlend					channels[ ANIM_NumAnimChannels ][ ANIM_MaxAnimsPerChannel ];
//	idList<jointMod_t *>		jointMods;
	numJoints :number/*int*/;
//	idJointMat *				joints;
	
	lastTransformTime :number/*mutable int*/;		// mutable because the value is updated in CreateFrame
	stoppedAnimatingUpdate:/*mutable*/boolean;
	removeOriginOffset:boolean;
	forceUpdate:boolean;
	
	frameBounds = new idBounds;

	AFPoseBlendWeight:number/*float*/;
//	idList<int>					AFPoseJoints;
//	idList<idAFPoseJointMod>	AFPoseJointMods;
//	idList<idJointQuat>			AFPoseJointFrame;
	AFPoseBounds = new idBounds;
	AFPoseTime :number/*int*/;


	///***********************************************************************
	//
	//	idAnimator
	//
	//***********************************************************************/
	//
	///*
	//=====================
	//idAnimator::idAnimator
	//=====================
	//*/
	//idAnimator::idAnimator() {
	//	int	i, j;
	//
	//	this.modelDef				= NULL;
	//	entity					= NULL;
	//	numJoints				= 0;
	//	joints					= NULL;
	//	lastTransformTime		= -1;
	//	stoppedAnimatingUpdate	= false;
	//	removeOriginOffset		= false;
	//	forceUpdate				= false;
	//
	//	frameBounds.Clear();
	//
	//	AFPoseJoints.SetGranularity( 1 );
	//	AFPoseJointMods.SetGranularity( 1 );
	//	AFPoseJointFrame.SetGranularity( 1 );
	//
	//	ClearAFPose();
	//
	//	for( i = ANIMCHANNEL_ALL; i < ANIM_NumAnimChannels; i++ ) {
	//		for( j = 0; j < ANIM_MaxAnimsPerChannel; j++ ) {
	//			channels[ i ][ j ].Reset( NULL );
	//		}
	//	}
	//}
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
	//	size = jointMods.Allocated() + numJoints * sizeof( joints[0] ) + jointMods.Num() * sizeof( jointMods[ 0 ] ) + AFPoseJointMods.Allocated() + AFPoseJointFrame.Allocated() + AFPoseJoints.Allocated();
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
	//	savefile.WriteObject( entity );
	//
	//	savefile.WriteInt( jointMods.Num() );
	//	for( i = 0; i < jointMods.Num(); i++ ) {
	//		savefile.WriteInt( jointMods[ i ].jointnum );
	//		savefile.WriteMat3( jointMods[ i ].mat );
	//		savefile.WriteVec3( jointMods[ i ].pos );
	//		savefile.WriteInt( (int&)jointMods[ i ].transform_pos );
	//		savefile.WriteInt( (int&)jointMods[ i ].transform_axis );
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
	//	savefile.WriteInt( lastTransformTime );
	//	savefile.WriteBool( stoppedAnimatingUpdate );
	//	savefile.WriteBool( forceUpdate );
	//	savefile.WriteBounds( frameBounds );
	//
	//	savefile.WriteFloat( AFPoseBlendWeight );
	//
	//	savefile.WriteInt( AFPoseJoints.Num() );
	//	for ( i = 0; i < AFPoseJoints.Num(); i++ ) {
	//		savefile.WriteInt( AFPoseJoints[i] );
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
	//	savefile.WriteBounds( AFPoseBounds );
	//	savefile.WriteInt( AFPoseTime );
	//
	//	savefile.WriteBool( removeOriginOffset );
	//
	//	for( i = ANIMCHANNEL_ALL; i < ANIM_NumAnimChannels; i++ ) {
	//		for( j = 0; j < ANIM_MaxAnimsPerChannel; j++ ) {
	//			channels[ i ][ j ].Save( savefile );
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
	//	savefile.ReadObject( reinterpret_cast<idClass *&>( entity ) );
	//
	//	savefile.ReadInt( num );
	//	jointMods.SetNum( num );
	//	for( i = 0; i < num; i++ ) {
	//		jointMods[ i ] = new jointMod_t;
	//		savefile.ReadInt( (int&)jointMods[ i ].jointnum );
	//		savefile.ReadMat3( jointMods[ i ].mat );
	//		savefile.ReadVec3( jointMods[ i ].pos );
	//		savefile.ReadInt( (int&)jointMods[ i ].transform_pos );
	//		savefile.ReadInt( (int&)jointMods[ i ].transform_axis );
	//	}
	//	
	//	savefile.ReadInt( numJoints );
	//	joints = (idJointMat *) Mem_Alloc16( numJoints * sizeof( joints[0] ) );
	//	for ( i = 0; i < numJoints; i++ ) {
	//		float *data = joints[i].ToFloatPtr();
	//		for ( j = 0; j < 12; j++ ) {
	//			savefile.ReadFloat( data[j] );
	//		}
	//	}
	//	
	//	savefile.ReadInt( lastTransformTime );
	//	savefile.ReadBool( stoppedAnimatingUpdate );
	//	savefile.ReadBool( forceUpdate );
	//	savefile.ReadBounds( frameBounds );
	//
	//	savefile.ReadFloat( AFPoseBlendWeight );
	//
	//	savefile.ReadInt( num );
	//	AFPoseJoints.SetGranularity( 1 );
	//	AFPoseJoints.SetNum( num );
	//	for ( i = 0; i < AFPoseJoints.Num(); i++ ) {
	//		savefile.ReadInt( AFPoseJoints[i] );
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
	//	savefile.ReadBounds( AFPoseBounds );
	//	savefile.ReadInt( AFPoseTime );
	//
	//	savefile.ReadBool( removeOriginOffset );
	//
	//	for( i = ANIMCHANNEL_ALL; i < ANIM_NumAnimChannels; i++ ) {
	//		for( j = 0; j < ANIM_MaxAnimsPerChannel; j++ ) {
	//			channels[ i ][ j ].Restore( savefile, this.modelDef );
	//		}
	//	}
	//}
	//
	///*
	//=====================
	//idAnimator::FreeData
	//=====================
	//*/
	//void idAnimator::FreeData( ) {
	//	int	i, j;
	//
	//	if ( entity ) {
	//		entity.BecomeInactive( TH_ANIMATE );
	//	}
	//
	//	for( i = ANIMCHANNEL_ALL; i < ANIM_NumAnimChannels; i++ ) {
	//		for( j = 0; j < ANIM_MaxAnimsPerChannel; j++ ) {
	//			channels[ i ][ j ].Reset( NULL );
	//		}
	//	}
	//
	//	jointMods.DeleteContents( true );
	//
	//	Mem_Free16( joints );
	//	joints = NULL;
	//	numJoints = 0;
	//
	//	this.modelDef = NULL;
	//
	//	ForceUpdate();
	//}
	//
	///*
	//=====================
	//idAnimator::PushAnims
	//=====================
	//*/
	//void idAnimator::PushAnims( int channelNum, int currentTime, int blendTime ) {
	//	int			i;
	//	idAnimBlend *channel;
	//
	//	channel = channels[ channelNum ];
	//	if ( !channel[ 0 ].GetWeight( currentTime ) || ( channel[ 0 ].starttime == currentTime ) ) {
	//		return;
	//	}
	//
	//	for( i = ANIM_MaxAnimsPerChannel - 1; i > 0; i-- ) {
	//		channel[ i ] = channel[ i - 1 ];
	//	}
	//
	//	channel[ 0 ].Reset( this.modelDef );
	//	channel[ 1 ].Clear( currentTime, blendTime );
	//	ForceUpdate();
	//}
	//
	///*
	//=====================
	//idAnimator::SetModel
	//=====================
	//*/
	//idRenderModel *idAnimator::SetModel( const char *modelname ) {
	//	int i, j;
	//
	//	FreeData();
	//
	//	// check if we're just clearing the model
	//	if ( !modelname || !*modelname ) {
	//		return NULL;
	//	}
	//
	//	this.modelDef = static_cast<const idDeclModelDef *>( declManager.FindType( DECL_MODELDEF, modelname, false ) );
	//	if ( !this.modelDef ) {
	//		return NULL;
	//	}
	//	
	//	idRenderModel *renderModel = this.modelDef.ModelHandle();
	//	if ( !renderModel ) {
	//		this.modelDef = NULL;
	//		return NULL;
	//	}
	//
	//	// make sure model hasn't been purged
	//	this.modelDef.Touch();
	//
	//	this.modelDef.SetupJoints( &numJoints, &joints, frameBounds, removeOriginOffset );
	//	this.modelDef.ModelHandle().Reset();
	//
	//	// set the this.modelDef on all channels
	//	for( i = ANIMCHANNEL_ALL; i < ANIM_NumAnimChannels; i++ ) {
	//		for( j = 0; j < ANIM_MaxAnimsPerChannel; j++ ) {
	//			channels[ i ][ j ].Reset( this.modelDef );
	//		}
	//	}
	//
	//	return this.modelDef.ModelHandle();
	//}
	//
	///*
	//=====================
	//idAnimator::Size
	//=====================
	//*/
	//size_t idAnimator::Size( ) const {
	//	return sizeof( *this ) + Allocated();
	//}
	//
	///*
	//=====================
	//idAnimator::SetEntity
	//=====================
	//*/
	//void idAnimator::SetEntity( ent:idEntity ) {
	//	entity = ent;
	//}
	//
	///*
	//=====================
	//idAnimator::GetEntity
	//=====================
	//*/
	//idEntity *idAnimator::GetEntity( ) const {
	//	return entity;
	//}
	//
	///*
	//=====================
	//idAnimator::RemoveOriginOffset
	//=====================
	//*/
	//void idAnimator::RemoveOriginOffset( bool remove ) {
	//	removeOriginOffset = remove;
	//}
	//
	///*
	//=====================
	//idAnimator::RemoveOrigin
	//=====================
	//*/
	//bool idAnimator::RemoveOrigin( ) const {
	//	return removeOriginOffset;
	//}
	//
	///*
	//=====================
	//idAnimator::GetJointList
	//=====================
	//*/
	//void idAnimator::GetJointList( jointnames:string, idList<jointHandle_t> &jointList ) const {
	//	if ( this.modelDef ) {
	//		this.modelDef.GetJointList( jointnames, jointList );
	//	}
	//}
	//
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
	//=====================
	//idAnimator::GetAnim
	//=====================
	//*/
	//const idAnim *idAnimator::GetAnim_int( int index ) const {
	//	if ( !this.modelDef ) {
	//		return NULL;
	//	}
		
	//	return this.modelDef.GetAnim( index );
	//}
	
	/*
	=====================
	idAnimator::GetAnim
	=====================
	*/
	GetAnim_str( name:string ) :number {
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
	///*
	//=====================
	//idAnimator::NumJoints
	//=====================
	//*/
	//int	idAnimator::NumJoints( ) const {
	//	return numJoints;
	//}
	
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
	
	///*
	//=====================
	//idAnimator::ModelDef
	//=====================
	//*/
	//const idDeclModelDef *idAnimator::ModelDef( ) const {
	//	return this.modelDef;
	//}
	//
	///*
	//=====================
	//idAnimator::CurrentAnim
	//=====================
	//*/
	//idAnimBlend *idAnimator::CurrentAnim( int channelNum ) {
	//	if ( ( channelNum < 0 ) || ( channelNum >= ANIM_NumAnimChannels ) ) {
	//		gameLocal.Error( "idAnimator::CurrentAnim : channel out of range" );
	//	}
	//
	//	return &channels[ channelNum ][ 0 ];
	//}
	//
	///*
	//=====================
	//idAnimator::Clear
	//=====================
	//*/
	//void idAnimator::Clear( int channelNum, int currentTime, int cleartime ) {
	//	int			i;
	//	idAnimBlend	*blend;
	//
	//	if ( ( channelNum < 0 ) || ( channelNum >= ANIM_NumAnimChannels ) ) {
	//		gameLocal.Error( "idAnimator::Clear : channel out of range" );
	//	}
	//
	//	blend = channels[ channelNum ];
	//	for( i = 0; i < ANIM_MaxAnimsPerChannel; i++, blend++ ) {
	//		blend.Clear( currentTime, cleartime );
	//	}
	//	ForceUpdate();
	//}
	//
	///*
	//=====================
	//idAnimator::SetFrame
	//=====================
	//*/
	//void idAnimator::SetFrame( int channelNum, int animNum, int frame, int currentTime, int blendTime ) {
	//	if ( ( channelNum < 0 ) || ( channelNum >= ANIM_NumAnimChannels ) ) {
	//		gameLocal.Error( "idAnimator::SetFrame : channel out of range" );
	//	}
	//
	//	if ( !this.modelDef || !this.modelDef.GetAnim( animNum ) ) {
	//		return;
	//	}
	//
	//	PushAnims( channelNum, currentTime, blendTime );
	//	channels[ channelNum ][ 0 ].SetFrame( this.modelDef, animNum, frame, currentTime, blendTime );
	//	if ( entity ) {
	//		entity.BecomeActive( TH_ANIMATE );
	//	}
	//}
	//
	///*
	//=====================
	//idAnimator::CycleAnim
	//=====================
	//*/
	//void idAnimator::CycleAnim( int channelNum, int animNum, int currentTime, int blendTime ) {
	//	if ( ( channelNum < 0 ) || ( channelNum >= ANIM_NumAnimChannels ) ) {
	//		gameLocal.Error( "idAnimator::CycleAnim : channel out of range" );
	//	}
	//
	//	if ( !this.modelDef || !this.modelDef.GetAnim( animNum ) ) {
	//		return;
	//	}
	//	
	//	PushAnims( channelNum, currentTime, blendTime );
	//	channels[ channelNum ][ 0 ].CycleAnim( this.modelDef, animNum, currentTime, blendTime );
	//	if ( entity ) {
	//		entity.BecomeActive( TH_ANIMATE );
	//	}
	//}
	//
	///*
	//=====================
	//idAnimator::PlayAnim
	//=====================
	//*/
	//void idAnimator::PlayAnim( int channelNum, int animNum, int currentTime, int blendTime ) {
	//	if ( ( channelNum < 0 ) || ( channelNum >= ANIM_NumAnimChannels ) ) {
	//		gameLocal.Error( "idAnimator::PlayAnim : channel out of range" );
	//	}
	//
	//	if ( !this.modelDef || !this.modelDef.GetAnim( animNum ) ) {
	//		return;
	//	}
	//	
	//	PushAnims( channelNum, currentTime, blendTime );
	//	channels[ channelNum ][ 0 ].PlayAnim( this.modelDef, animNum, currentTime, blendTime );
	//	if ( entity ) {
	//		entity.BecomeActive( TH_ANIMATE );
	//	}
	//}
	//
	///*
	//=====================
	//idAnimator::SyncAnimChannels
	//=====================
	//*/
	//void idAnimator::SyncAnimChannels( int channelNum, int fromChannelNum, int currentTime, int blendTime ) {
	//	if ( ( channelNum < 0 ) || ( channelNum >= ANIM_NumAnimChannels ) || ( fromChannelNum < 0 ) || ( fromChannelNum >= ANIM_NumAnimChannels ) ) {
	//		gameLocal.Error( "idAnimator::SyncToChannel : channel out of range" );
	//	}
	//
	//	idAnimBlend &fromBlend = channels[ fromChannelNum ][ 0 ];
	//	idAnimBlend &toBlend = channels[ channelNum ][ 0 ];
	//
	//	float weight = fromBlend.blendEndValue;
	//	if ( ( fromBlend.Anim() != toBlend.Anim() ) || ( fromBlend.GetStartTime() != toBlend.GetStartTime() ) || ( fromBlend.GetEndTime() != toBlend.GetEndTime() ) ) {
	//		PushAnims( channelNum, currentTime, blendTime );
	//		toBlend = fromBlend;
	//		toBlend.blendStartValue = 0.0f;
	//		toBlend.blendEndValue = 0.0f;
	//	}
	//    toBlend.SetWeight( weight, currentTime - 1, blendTime );
	//
	//	// disable framecommands on the current channel so that commands aren't called twice
	//	toBlend.AllowFrameCommands( false );
	//
	//	if ( entity ) {
	//		entity.BecomeActive( TH_ANIMATE );
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
	//	if ( !this.modelDef || !this.modelDef.ModelHandle() || ( jointnum < 0 ) || ( jointnum >= numJoints ) ) {
	//		return;
	//	}
	//
	//	jointMod = NULL;
	//	for( i = 0; i < jointMods.Num(); i++ ) {
	//		if ( jointMods[ i ].jointnum == jointnum ) {
	//			jointMod = jointMods[ i ];
	//			break;
	//		} else if ( jointMods[ i ].jointnum > jointnum ) {
	//			break;
	//		}
	//	}
	//
	//	if ( !jointMod ) {
	//		jointMod = new jointMod_t;
	//		jointMod.jointnum = jointnum;
	//		jointMod.mat.Identity();
	//		jointMod.transform_axis = JOINTMOD_NONE;
	//		jointMods.Insert( jointMod, i );
	//	}
	//
	//	jointMod.pos = pos;
	//	jointMod.transform_pos = transform_type;
	//
	//	if ( entity ) {
	//		entity.BecomeActive( TH_ANIMATE );
	//	}
	//	ForceUpdate();
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
	//	if ( !this.modelDef || !this.modelDef.ModelHandle() || ( jointnum < 0 ) || ( jointnum >= numJoints ) ) {
	//		return;
	//	}
	//
	//	jointMod = NULL;
	//	for( i = 0; i < jointMods.Num(); i++ ) {
	//		if ( jointMods[ i ].jointnum == jointnum ) {
	//			jointMod = jointMods[ i ];
	//			break;
	//		} else if ( jointMods[ i ].jointnum > jointnum ) {
	//			break;
	//		}
	//	}
	//
	//	if ( !jointMod ) {
	//		jointMod = new jointMod_t;
	//		jointMod.jointnum = jointnum;
	//		jointMod.pos.Zero();
	//		jointMod.transform_pos = JOINTMOD_NONE;
	//		jointMods.Insert( jointMod, i );
	//	}
	//
	//	jointMod.mat = mat;
	//	jointMod.transform_axis = transform_type;
	//
	//	if ( entity ) {
	//		entity.BecomeActive( TH_ANIMATE );
	//	}
	//	ForceUpdate();
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
	//	if ( !this.modelDef || !this.modelDef.ModelHandle() || ( jointnum < 0 ) || ( jointnum >= numJoints ) ) {
	//		return;
	//	}
	//
	//	for( i = 0; i < jointMods.Num(); i++ ) {
	//		if ( jointMods[ i ].jointnum == jointnum ) {
	//			delete jointMods[ i ];
	//			jointMods.RemoveIndex( i );
	//			ForceUpdate();
	//			break;
	//		} else if ( jointMods[ i ].jointnum > jointnum ) {
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
	//	if ( jointMods.Num() ) {
	//		ForceUpdate();
	//	}
	//	jointMods.DeleteContents( true );
	//}
	//
	///*
	//=====================
	//idAnimator::ClearAllAnims
	//=====================
	//*/
	//void idAnimator::ClearAllAnims( int currentTime, int cleartime ) {
	//	int	i;
	//
	//	for( i = 0; i < ANIM_NumAnimChannels; i++ ) {
	//		Clear( i, currentTime, cleartime );
	//	}
	//
	//	ClearAFPose();
	//	ForceUpdate();
	//}
	//
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
	//	blendWeight = 0.0f;
	//
	//	blend = channels[ ANIMCHANNEL_ALL ];
	//	for( i = 0; i < ANIM_MaxAnimsPerChannel; i++, blend++ ) {
	//		blend.BlendDelta( fromtime, totime, delta, blendWeight );
	//	}
	//
	//	if ( this.modelDef.Joints()[ 0 ].channel ) {
	//		blend = channels[ this.modelDef.Joints()[ 0 ].channel ];
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
	//	q.Set( 0.0f, 0.0f, 0.0f, 1.0f );
	//	blendWeight = 0.0f;
	//
	//	blend = channels[ ANIMCHANNEL_ALL ];
	//	for( i = 0; i < ANIM_MaxAnimsPerChannel; i++, blend++ ) {
	//		blend.BlendDeltaRotation( fromtime, totime, q, blendWeight );
	//	}
	//
	//	if ( this.modelDef.Joints()[ 0 ].channel ) {
	//		blend = channels[ this.modelDef.Joints()[ 0 ].channel ];
	//		for( i = 0; i < ANIM_MaxAnimsPerChannel; i++, blend++ ) {
	//			blend.BlendDeltaRotation( fromtime, totime, q, blendWeight );
	//		}
	//	}
	//
	//	if ( blendWeight > 0.0f ) {
	//		delta = q.ToMat3();
	//		return true;
	//	} else {
	//		delta.Identity();
	//		return false;
	//	}
	//}
	//
	///*
	//====================
	//idAnimator::GetOrigin
	//====================
	//*/
	//void idAnimator::GetOrigin( int currentTime, pos:idVec3 ) const {
	//	int					i;
	//	const idAnimBlend	*blend;
	//	float				blendWeight;
	//
	//	if ( !this.modelDef || !this.modelDef.ModelHandle() ) {
	//		pos.Zero();
	//		return;
	//	}
	//
	//	pos.Zero();
	//	blendWeight = 0.0f;
	//
	//	blend = channels[ ANIMCHANNEL_ALL ];
	//	for( i = 0; i < ANIM_MaxAnimsPerChannel; i++, blend++ ) {
	//		blend.BlendOrigin( currentTime, pos, blendWeight, removeOriginOffset );
	//	}
	//
	//	if ( this.modelDef.Joints()[ 0 ].channel ) {
	//		blend = channels[ this.modelDef.Joints()[ 0 ].channel ];
	//		for( i = 0; i < ANIM_MaxAnimsPerChannel; i++, blend++ ) {
	//			blend.BlendOrigin( currentTime, pos, blendWeight, removeOriginOffset );
	//		}
	//	}
	//
	//	pos += this.modelDef.GetVisualOffset();
	//}
	//
	///*
	//====================
	//idAnimator::GetBounds
	//====================
	//*/
	//bool idAnimator::GetBounds( int currentTime, idBounds &bounds ) {
	//	int					i, j;
	//	const idAnimBlend	*blend;
	//	int					count;
	//
	//	if ( !this.modelDef || !this.modelDef.ModelHandle() ) {
	//		return false;
	//	}
	//
	//	if ( AFPoseJoints.Num() ) {
	//		bounds = AFPoseBounds;
	//		count = 1;
	//	} else {
	//		bounds.Clear();
	//		count = 0;
	//	}
	//
	//	blend = channels[ 0 ];
	//	for( i = ANIMCHANNEL_ALL; i < ANIM_NumAnimChannels; i++ ) {
	//		for( j = 0; j < ANIM_MaxAnimsPerChannel; j++, blend++ ) {
	//			if ( blend.AddBounds( currentTime, bounds, removeOriginOffset ) ) {
	//				count++;
	//			}
	//		}
	//	}
	//
	//	if ( !count ) {
	//		if ( !frameBounds.IsCleared() ) {
	//			bounds = frameBounds;
	//			return true;
	//		} else {
	//			bounds.Zero();
	//			return false;
	//		}
	//	}
	//
	//	bounds.TranslateSelf( this.modelDef.GetVisualOffset() );
	//
	//	if ( g_debugBounds.GetBool() ) {
	//		if ( bounds[1][0] - bounds[0][0] > 2048 || bounds[1][1] - bounds[0][1] > 2048 ) {
	//			if ( entity ) {
	//				gameLocal.Warning( "big frameBounds on entity '%s' with model '%s': %f,%f", entity.name.c_str(), this.modelDef.ModelHandle().Name(), bounds[1][0] - bounds[0][0], bounds[1][1] - bounds[0][1] );
	//			} else {
	//				gameLocal.Warning( "big frameBounds on model '%s': %f,%f", this.modelDef.ModelHandle().Name(), bounds[1][0] - bounds[0][0], bounds[1][1] - bounds[0][1] );
	//			}
	//		}
	//	}
	//
	//	frameBounds = bounds;
	//
	//	return true;
	//}
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
	//	AFPoseJoints.SetNum( this.modelDef.Joints().Num(), false );
	//	AFPoseJoints.SetNum( 0, false );
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
	//	int index = idBinSearch_GreaterEqual<int>( AFPoseJoints.Ptr(), AFPoseJoints.Num(), jointNum );
	//	if ( index >= AFPoseJoints.Num() || jointNum != AFPoseJoints[index] ) {
	//		AFPoseJoints.Insert( jointNum, index );
	//	}
	//}
	//
	///*
	//=====================
	//idAnimator::FinishAFPose
	//=====================
	//*/
	//void idAnimator::FinishAFPose( int animNum, const idBounds &bounds, /*int*/time:number ) {
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
	//	if ( removeOriginOffset ) {
	//#ifdef VELOCITY_MOVE
	//		jointFrame[ 0 ].t.x = 0.0f;
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
	//	if ( AFPoseJoints.Num() && AFPoseJoints[0] == 0 ) {
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
	//	for( i = 1; j < AFPoseJoints.Num(); j++, i++ ) {
	//		jointMod = AFPoseJoints[j];
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
	//	for( i = 0; i < AFPoseJoints.Num(); i++ ) {
	//		for( jointNum = AFPoseJoints[i]; jointNum != INVALID_JOINT; jointNum = jointParent[jointNum] ) {
	//			blendJoints[jointNum] = true;
	//		}
	//	}
	//
	//	// lock all parents of modified joints
	//	AFPoseJoints.SetNum( 0, false );
	//	for ( i = 0; i < numJoints; i++ ) {
	//		if ( blendJoints[i] ) {
	//			AFPoseJoints.Append( i );
	//		}
	//	}
	//
	//	AFPoseBounds = bounds;
	//	AFPoseTime = time;
	//
	//	ForceUpdate();
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
	//	if ( !AFPoseJoints.Num() ) {
	//		return false;
	//	}
	//
	//	SIMDProcessor.BlendJoints( blendFrame, AFPoseJointFrame.Ptr(), AFPoseBlendWeight, AFPoseJoints.Ptr(), AFPoseJoints.Num() );
	//
	//	return true;
	//}
	//
	///*
	//=====================
	//idAnimator::ClearAFPose
	//=====================
	//*/
	//void idAnimator::ClearAFPose( ) {
	//	if ( AFPoseJoints.Num() ) {
	//		ForceUpdate();
	//	}
	//	AFPoseBlendWeight = 1.0f;
	//	AFPoseJoints.SetNum( 0, false );
	//	AFPoseBounds.Clear();
	//	AFPoseTime = 0;
	//}
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
	//		blend = channels[ 0 ];
	//		for( i = 0; i < ANIM_NumAnimChannels; i++ ) {
	//			for( j = 0; j < ANIM_MaxAnimsPerChannel; j++, blend++ ) {
	//				blend.CallFrameCommands( entity, fromtime, totime );
	//			}
	//		}
	//	}
	//
	//	if ( !IsAnimating( totime ) ) {
	//		stoppedAnimatingUpdate = true;
	//		if ( entity ) {
	//			entity.BecomeInactive( TH_ANIMATE );
	//
	//			// present one more time with stopped animations so the renderer can properly recreate interactions
	//			entity.BecomeActive( TH_UPDATEVISUALS );
	//		}
	//	}
	//}
	//
	///*
	//=====================
	//idAnimator::IsAnimating
	//=====================
	//*/
	//bool idAnimator::IsAnimating( int currentTime ) const {
	//	int					i, j;
	//	const idAnimBlend	*blend;
	//
	//	if ( !this.modelDef || !this.modelDef.ModelHandle() ) {
	//		return false;
	//	}
	//
	//	// if animating with an articulated figure
	//	if ( AFPoseJoints.Num() && currentTime <= AFPoseTime ) {
	//		return true;
	//	}
	//
	//	blend = channels[ 0 ];
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
	//bool idAnimator::FrameHasChanged( int currentTime ) const {
	//	int					i, j;
	//	const idAnimBlend	*blend;
	//
	//	if ( !this.modelDef || !this.modelDef.ModelHandle() ) {
	//		return false;
	//	}
	//
	//	// if animating with an articulated figure
	//	if ( AFPoseJoints.Num() && currentTime <= AFPoseTime ) {
	//		return true;
	//	}
	//
	//	blend = channels[ 0 ];
	//	for( i = 0; i < ANIM_NumAnimChannels; i++ ) {
	//		for( j = 0; j < ANIM_MaxAnimsPerChannel; j++, blend++ ) {
	//			if ( blend.FrameHasChanged( currentTime ) ) {
	//				return true;
	//			}
	//		}
	//	}
	//
	//	if ( forceUpdate && IsAnimating( currentTime ) ) {
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
		//		if ( lastTransformTime == currentTime ) {
		//			return false;
		//		}
		//		if ( lastTransformTime != -1 && !stoppedAnimatingUpdate && !IsAnimating( currentTime ) ) {
		//			return false;
		//		}
		//	}
		//
		//	lastTransformTime = currentTime;
		//	stoppedAnimatingUpdate = false;
		//
		//	if ( entity && ( ( g_debugAnim.GetInteger() == entity.entityNumber ) || ( g_debugAnim.GetInteger() == -2 ) ) ) {
		//		debugInfo = true;
		//		gameLocal.Printf( "---------------\n%d: entity '%s':\n", gameLocal.time, entity.GetName() );
		// 		gameLocal.Printf( "model '%s':\n", this.modelDef.GetModelName() );
		//	} else {
		//		debugInfo = false;
		//	}
		//
		//	// init the joint buffer
		//	if ( AFPoseJoints.Num() ) {
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
		//	baseBlend = 0.0f;
		//	blend = channels[ ANIMCHANNEL_ALL ];
		//	for( j = 0; j < ANIM_MaxAnimsPerChannel; j++, blend++ ) {
		//		if ( blend.BlendAnim( currentTime, ANIMCHANNEL_ALL, numJoints, jointFrame, baseBlend, removeOriginOffset, false, debugInfo ) ) {
		//			hasAnim = true;
		//			if ( baseBlend >= 1.0f ) {
		//				break;
		//			}
		//		}
		//	}
		//
		//	// only blend other channels if there's enough space to blend into
		//	if ( baseBlend < 1.0f ) {
		//		for( i = ANIMCHANNEL_ALL + 1; i < ANIM_NumAnimChannels; i++ ) {
		//			if ( !this.modelDef.NumJointsOnChannel( i ) ) {
		//				continue;
		//			}
		//			if ( i == ANIMCHANNEL_EYELIDS ) {
		//				// eyelids blend over any previous anims, so skip it and blend it later
		//				continue;
		//			}
		//			blendWeight = baseBlend;
		//			blend = channels[ i ];
		//			for( j = 0; j < ANIM_MaxAnimsPerChannel; j++, blend++ ) {
		//				if ( blend.BlendAnim( currentTime, i, numJoints, jointFrame, blendWeight, removeOriginOffset, false, debugInfo ) ) {
		//					hasAnim = true;
		//					if ( blendWeight >= 1.0f ) {
		//						// fully blended
		//						break;
		//					}
		//				}
		//			}
		//
		//			if ( debugInfo && !AFPoseJoints.Num() && !blendWeight ) {
		//				gameLocal.Printf( "%d: %s using default pose in model '%s'\n", gameLocal.time, channelNames[ i ], this.modelDef.GetModelName() );
		//			}
		//		}
		//	}
		//
		//	// blend in the eyelids
		//	if ( this.modelDef.NumJointsOnChannel( ANIMCHANNEL_EYELIDS ) ) {
		//		blend = channels[ ANIMCHANNEL_EYELIDS ];
		//		blendWeight = baseBlend;
		//		for( j = 0; j < ANIM_MaxAnimsPerChannel; j++, blend++ ) {
		//			if ( blend.BlendAnim( currentTime, ANIMCHANNEL_EYELIDS, numJoints, jointFrame, blendWeight, removeOriginOffset, true, debugInfo ) ) {
		//				hasAnim = true;
		//				if ( blendWeight >= 1.0f ) {
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
		//	if ( !hasAnim && !jointMods.Num() ) {
		//		// no animations were updated
		//		return false;
		//	}
		//
		//	// convert the joint quaternions to rotation matrices
		//	SIMDProcessor.ConvertJointQuatsToJointMats( joints, jointFrame, numJoints );
		//
		//	// check if we need to modify the origin
		//	if ( jointMods.Num() && ( jointMods[0].jointnum == 0 ) ) {
		//		jointMod = jointMods[0];
		//
		//		switch( jointMod.transform_axis ) {
		//			case JOINTMOD_NONE:
		//				break;
		//
		//			case JOINTMOD_LOCAL:
		//				joints[0].SetRotation( jointMod.mat * joints[0].ToMat3() );
		//				break;
		//			
		//			case JOINTMOD_WORLD:
		//				joints[0].SetRotation( joints[0].ToMat3() * jointMod.mat );
		//				break;
		//
		//			case JOINTMOD_LOCAL_OVERRIDE:
		//			case JOINTMOD_WORLD_OVERRIDE:
		//				joints[0].SetRotation( jointMod.mat );
		//				break;
		//		}
		//
		//		switch( jointMod.transform_pos ) {
		//			case JOINTMOD_NONE:
		//				break;
		//
		//			case JOINTMOD_LOCAL:
		//				joints[0].SetTranslation( joints[0].ToVec3() + jointMod.pos );
		//				break;
		//			
		//			case JOINTMOD_LOCAL_OVERRIDE:
		//			case JOINTMOD_WORLD:
		//			case JOINTMOD_WORLD_OVERRIDE:
		//				joints[0].SetTranslation( jointMod.pos );
		//				break;
		//		}
		//		j = 1;
		//	} else {
		//		j = 0;
		//	}
		//
		//	// add in the model offset
		//	joints[0].SetTranslation( joints[0].ToVec3() + this.modelDef.GetVisualOffset() );
		//
		//	// pointer to joint info
		//	jointParent = this.modelDef.JointParents();
		//
		//	// add in any joint modifications
		//	for( i = 1; j < jointMods.Num(); j++, i++ ) {
		//		jointMod = jointMods[j];
		//
		//		// transform any joints preceding the joint modifier
		//		SIMDProcessor.TransformJoints( joints, jointParent, i, jointMod.jointnum - 1 );
		//		i = jointMod.jointnum;
		//
		//		parentNum = jointParent[i];
		//
		//		// modify the axis
		//		switch( jointMod.transform_axis ) {
		//			case JOINTMOD_NONE:
		//				joints[i].SetRotation( joints[i].ToMat3() * joints[ parentNum ].ToMat3() );
		//				break;
		//
		//			case JOINTMOD_LOCAL:
		//				joints[i].SetRotation( jointMod.mat * ( joints[i].ToMat3() * joints[parentNum].ToMat3() ) );
		//				break;
		//			
		//			case JOINTMOD_LOCAL_OVERRIDE:
		//				joints[i].SetRotation( jointMod.mat * joints[parentNum].ToMat3() );
		//				break;
		//
		//			case JOINTMOD_WORLD:
		//				joints[i].SetRotation( ( joints[i].ToMat3() * joints[parentNum].ToMat3() ) * jointMod.mat );
		//				break;
		//
		//			case JOINTMOD_WORLD_OVERRIDE:
		//				joints[i].SetRotation( jointMod.mat );
		//				break;
		//		}
		//
		//		// modify the position
		//		switch( jointMod.transform_pos ) {
		//			case JOINTMOD_NONE:
		//				joints[i].SetTranslation( joints[parentNum].ToVec3() + joints[i].ToVec3() * joints[parentNum].ToMat3() );
		//				break;
		//
		//			case JOINTMOD_LOCAL:
		//				joints[i].SetTranslation( joints[parentNum].ToVec3() + ( joints[i].ToVec3() + jointMod.pos ) * joints[parentNum].ToMat3() );
		//				break;
		//			
		//			case JOINTMOD_LOCAL_OVERRIDE:
		//				joints[i].SetTranslation( joints[parentNum].ToVec3() + jointMod.pos * joints[parentNum].ToMat3() );
		//				break;
		//
		//			case JOINTMOD_WORLD:
		//				joints[i].SetTranslation( joints[parentNum].ToVec3() + joints[i].ToVec3() * joints[parentNum].ToMat3() + jointMod.pos );
		//				break;
		//
		//			case JOINTMOD_WORLD_OVERRIDE:
		//				joints[i].SetTranslation( jointMod.pos );
		//				break;
		//		}
		//	}
		//
		//	// transform the rest of the hierarchy
		//	SIMDProcessor.TransformJoints( joints, jointParent, i, numJoints - 1 );
		//
		return true;
	}

///*
//=====================
//idAnimator::ForceUpdate
//=====================
//*/
//void idAnimator::ForceUpdate( ) {
//	lastTransformTime = -1;
//	forceUpdate = true;
//}
//
///*
//=====================
//idAnimator::ClearForceUpdate
//=====================
//*/
//void idAnimator::ClearForceUpdate( ) {
//	forceUpdate = false;
//}
//
///*
//=====================
//idAnimator::GetJointTransform>	gamex86.dll!idAnimator::ForceUpdate()  Line 4268	C++
//
//=====================
//*/
//bool idAnimator::GetJointTransform( jointHandle_t jointHandle, int currentTime, idVec3 &offset, idMat3 &axis ) {
//	if ( !this.modelDef || ( jointHandle < 0 ) || ( jointHandle >= this.modelDef.NumJoints() ) ) {
//		return false;
//	}
//
//	CreateFrame( currentTime, false );
//
//	offset = joints[ jointHandle ].ToVec3();
//	axis = joints[ jointHandle ].ToMat3();
//
//	return true;
//}
//
///*
//=====================
//idAnimator::GetJointLocalTransform
//=====================
//*/
//bool idAnimator::GetJointLocalTransform( jointHandle_t jointHandle, int currentTime, idVec3 &offset, idMat3 &axis ) {
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
//	CreateFrame( currentTime, false );
//
//	if ( jointHandle > 0 ) {
//		idJointMat m = joints[ jointHandle ];
//		m /= joints[ modelJoints[ jointHandle ].parentNum ];
//		offset = m.ToVec3();
//		axis = m.ToMat3();
//	} else {
//		offset = joints[ jointHandle ].ToVec3();
//		axis = joints[ jointHandle ].ToMat3();
//	}
//
//	return true;
//}
//
///*
//=====================
//idAnimator::GetJointHandle
//=====================
//*/
//jointHandle_t idAnimator::GetJointHandle( name:string ) const {
//	if ( !this.modelDef || !this.modelDef.ModelHandle() ) {
//		return INVALID_JOINT;
//	}
//
//	return this.modelDef.ModelHandle().GetJointHandle( name );
//}
//
///*
//=====================
//idAnimator::GetJointName
//=====================
//*/
//const char *idAnimator::GetJointName( jointHandle_t handle ) const {
//	if ( !this.modelDef || !this.modelDef.ModelHandle() ) {
//		return "";
//	}
//
//	return this.modelDef.ModelHandle().GetJointName( handle );
//}
//
///*
//=====================
//idAnimator::GetChannelForJoint
//=====================
//*/
//int idAnimator::GetChannelForJoint( jointHandle_t joint ) const {
//	if ( !this.modelDef ) {
//		gameLocal.Error( "idAnimator::GetChannelForJoint: NULL model" );
//	}
//
//	if ( ( joint < 0 ) || ( joint >= numJoints ) ) {
//		gameLocal.Error( "idAnimator::GetChannelForJoint: invalid joint num (%d)", joint );
//	}
//
//	return this.modelDef.GetJoint( joint ).channel;
//}
//
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
//		return INVALID_JOINT;
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
///*
//=====================
//idAnimator::GetJoints
//=====================
//*/
//void idAnimator::GetJoints( int *numJoints, idJointMat **jointsPtr ) {
//	*numJoints	= this.numJoints;
//	*jointsPtr	= this.joints;
//}
//
///*
//=====================
//idAnimator::GetAnimFlags
//=====================
//*/
//const animFlags_t idAnimator::GetAnimFlags( int animNum ) const {
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
//int	idAnimator::NumFrames( int animNum ) const {
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
//int	idAnimator::NumSyncedAnims( int animNum ) const {
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
//const char *idAnimator::AnimName( int animNum ) const {
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
//const char *idAnimator::AnimFullName( int animNum ) const {
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
//int	idAnimator::AnimLength( int animNum ) const {
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
//const idVec3 &idAnimator::TotalMovementDelta( int animNum ) const {
//	const idAnim *anim = GetAnim( animNum );
//	if ( anim ) {
//		return anim.TotalMovementDelta();
//	} else {
//		return vec3_origin;
//	}
//}
};

//#endif /* !__ANIM_H__ */
