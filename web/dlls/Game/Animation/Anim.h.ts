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
////
//// animation channels
//// these can be changed by modmakers and licensees to be whatever they need.
//const int ANIM_NumAnimChannels		= 5;
//const int ANIM_MaxAnimsPerChannel	= 3;
//const int ANIM_MaxSyncedAnims		= 3;
//
////
//// animation channels.  make sure to change script/doom_defs.script if you add any channels, or change their order
////
//const int ANIMCHANNEL_ALL			= 0;
//const int ANIMCHANNEL_TORSO			= 1;
//const int ANIMCHANNEL_LEGS			= 2;
//const int ANIMCHANNEL_HEAD			= 3;
//const int ANIMCHANNEL_EYELIDS		= 4;
//
//// for converting from 24 frames per second to milliseconds
//ID_INLINE int FRAME2MS( int framenum ) {
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
//typedef struct {
//	jointHandle_t			num;
//	jointHandle_t			parentNum;
//	int						channel;
//} jointInfo_t;
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
//typedef struct {
//	int						num;
//	int						firstCommand;
//} frameLookup_t;
//
//typedef struct {
//	frameCommandType_t		type;
//	idStr					*string;
//
//	union {
//		const idSoundShader	*soundShader;
//		const function_t	*function;
//		const idDeclSkin	*skin;
//		int					index;
//	};
//} frameCommand_t;
//
//typedef struct {
//	bool					prevent_idle_override		: 1;
//	bool					random_cycle_start			: 1;
//	bool					ai_no_turn					: 1;
//	bool					anim_turn					: 1;
//} animFlags_t;
//
//
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
//	int						numFrames;
//	int						frameRate;
//	int						animLength;
//	int						numJoints;
//	int						numAnimatedComponents;
//	idList<idBounds>		bounds;
//	idList<jointAnimInfo_t>	jointInfo;
//	idList<idJointQuat>		baseFrame;
//	idList<float>			componentFrames;
//	idStr					name;
//	idVec3					totaldelta;
//	mutable int				ref_count;
//
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
//	void					GetSingleFrame( int framenum, idJointQuat *joints, const int *index, int numIndexes ) const;
//	int						Length( ) const;
//	int						NumFrames( ) const;
//	int						NumJoints( ) const;
//	const idVec3			&TotalMovementDelta( ) const;
//	const char				*Name( ) const;
//
//	void					GetFrameBlend( int framenum, frameBlend_t &frame ) const;	// frame 1 is first frame
//	void					ConvertTimeToFrame( /*int*/time:number, int cyclecount, frameBlend_t &frame ) const;
//
//	void					GetOrigin( idVec3 &offset, int currentTime, int cyclecount ) const;
//	void					GetOriginRotation( idQuat &rotation, /*int*/time:number, int cyclecount ) const;
//	void					GetBounds( idBounds &bounds, int currentTime, int cyclecount ) const;
};

/*
==============================================================================================

	idAnim

==============================================================================================
*/

class idAnim {
//private:
	modelDef: idDeclModelDef;
//	const idMD5Anim				*anims[ ANIM_MaxSyncedAnims ];
//	int							numAnims;
//	idStr						name;
//	idStr						realname;
//	idList<frameLookup_t>		frameLookup;
//	idList<frameCommand_t>		frameCommands;
//	animFlags_t					flags;
//
//public:
//								idAnim();
//								idAnim( const idDeclModelDef *modelDef, const idAnim *anim );
//								~idAnim();
//
//	void						SetAnim( const idDeclModelDef *modelDef, const char *sourcename, const char *animname, int num, const idMD5Anim *md5anims[ ANIM_MaxSyncedAnims ] );
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
//	const char					*AddFrameCommand( const class idDeclModelDef *modelDef, int framenum, idLexer &src, const idDict *def );
//	void						CallFrameCommands( ent:idEntity, int from, int to ) const;
//	bool						HasFrameCommands( ) const;
//
//								// returns first frame (zero based) that command occurs.  returns -1 if not found.
//	int							FindFrameForFrameCommand( frameCommandType_t framecommand, const frameCommand_t **command ) const;
//	void						SetAnimFlags( const animFlags_t &animflags );
//	const animFlags_t			&GetAnimFlags( ) const;
};


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
//	void						SetFrame( const idDeclModelDef *modelDef, int animnum, int frame, int currenttime, int blendtime );
//	void						CycleAnim( const idDeclModelDef *modelDef, int animnum, int currenttime, int blendtime );
//	void						PlayAnim( const idDeclModelDef *modelDef, int animnum, int currenttime, int blendtime );
//	bool						BlendAnim( int currentTime, int channel, int numJoints, idJointQuat *blendFrame, float &blendWeight, bool removeOrigin, bool overrideBlend, bool printInfo ) const;
//	void						BlendOrigin( int currentTime, idVec3 &blendPos, float &blendWeight, bool removeOriginOffset ) const;
//	void						BlendDelta( int fromtime, int totime, idVec3 &blendDelta, float &blendWeight ) const;
//	void						BlendDeltaRotation( int fromtime, int totime, idQuat &blendDelta, float &blendWeight ) const;
//	bool						AddBounds( int currentTime, idBounds &bounds, bool removeOriginOffset ) const;
//
//public:
//								idAnimBlend();
//	void						Save ( savefile: idSaveGame ): void { throw "placeholder"; }
//	void						Restore( idRestoreGame *savefile, const idDeclModelDef *modelDef );
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
