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
//
//#include "../../idlib/precompiled.h"
//#pragma hdrstop
//
//#include "../Game_local.h"
//
//static const char *channelNames[ ANIM_NumAnimChannels ] = {
//	"all", "torso", "legs", "head", "eyelids"
//};
//
///***********************************************************************
//
//	idAnim
//
//***********************************************************************/
//
///*
//=====================
//idAnim::idAnim
//=====================
//*/
//idAnim::idAnim() {
//	modelDef = NULL;
//	numAnims = 0;
//	memset( anims, 0, sizeof( anims ) );
//	memset( &flags, 0, sizeof( flags ) );
//}
//
///*
//=====================
//idAnim::idAnim
//=====================
//*/
//idAnim::idAnim( const idDeclModelDef *modelDef, const idAnim *anim ) {
//	var/*int*/i:number;
//
//	this.modelDef = modelDef;
//	numAnims = anim.numAnims;
//	name = anim.name;
//	realname = anim.realname;
//	flags = anim.flags;
//
//	memset( anims, 0, sizeof( anims ) );
//	for( i = 0; i < numAnims; i++ ) {
//		anims[ i ] = anim.anims[ i ];
//		anims[ i ].IncreaseRefs();
//	}
//
//	frameLookup.SetNum( anim.frameLookup.Num() );
//	memcpy( frameLookup.Ptr(), anim.frameLookup.Ptr(), frameLookup.MemoryUsed() );
//
//	frameCommands.SetNum( anim.frameCommands.Num() );
//	for( i = 0; i < frameCommands.Num(); i++ ) {
//		frameCommands[ i ] = anim.frameCommands[ i ];
//		if ( anim.frameCommands[ i ].string ) {
//			frameCommands[ i ].string = new idStr( *anim.frameCommands[ i ].string );
//		}
//	}
//}
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
///*
//=====================
//idAnim::SetAnim
//=====================
//*/
//void idAnim::SetAnim( const idDeclModelDef *modelDef, const char *sourcename, const char *animname, /*int*/num:number, const idMD5Anim *md5anims[ ANIM_MaxSyncedAnims ] ) {
//	var/*int*/i:number;
//
//	this.modelDef = modelDef;
//
//	for( i = 0; i < numAnims; i++ ) {
//		anims[ i ].DecreaseRefs();
//		anims[ i ] = NULL;
//	}
//
//	assert( ( num > 0 ) && ( num <= ANIM_MaxSyncedAnims ) );
//	numAnims	= num;
//	realname	= sourcename;
//	name		= animname;
//
//	for( i = 0; i < num; i++ ) {
//		anims[ i ] = md5anims[ i ];
//		anims[ i ].IncreaseRefs();
//	}
//
//	memset( &flags, 0, sizeof( flags ) );
//
//	for( i = 0; i < frameCommands.Num(); i++ ) {
//		delete frameCommands[ i ].string;
//	}
//
//	frameLookup.Clear();
//	frameCommands.Clear();
//}
//
///*
//=====================
//idAnim::Name
//=====================
//*/
//const char *idAnim::Name( ) const {
//	return name;
//}
//
///*
//=====================
//idAnim::FullName
//=====================
//*/
//const char *idAnim::FullName( ) const {
//	return realname;
//}
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
//
///*
//=====================
//idAnim::AddFrameCommand
//
//Returns NULL if no error.
//=====================
//*/
//const char *idAnim::AddFrameCommand( const idDeclModelDef *modelDef, int framenum, idLexer &src, const idDict *def ) {
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
//	if( !src.ReadTokenOnLine( &token ) ) {
//		return "Unexpected end of line";
//	}
//	if ( token == "call" ) {
//		if( !src.ReadTokenOnLine( &token ) ) {
//			return "Unexpected end of line";
//		}
//		fc.type = FC_SCRIPTFUNCTION;
//		fc.function = gameLocal.program.FindFunction( token );
//		if ( !fc.function ) {
//			return va( "Function '%s' not found", token.c_str() );
//		}
//	} else if ( token == "object_call" ) {
//		if( !src.ReadTokenOnLine( &token ) ) {
//			return "Unexpected end of line";
//		}
//		fc.type = FC_SCRIPTFUNCTIONOBJECT;
//		fc.string = new idStr( token );
//	} else if ( token == "event" ) {
//		if( !src.ReadTokenOnLine( &token ) ) {
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
//	} else if ( token == "sound" ) {
//		if( !src.ReadTokenOnLine( &token ) ) {
//			return "Unexpected end of line";
//		}
//		fc.type = FC_SOUND;
//		if ( !token.Cmpn( "snd_", 4 ) ) {
//			fc.string = new idStr( token );
//		} else {
//			fc.soundShader = declManager.FindSound( token );
//			if ( fc.soundShader.GetState() == DS_DEFAULTED ) {
//				gameLocal.Warning( "Sound '%s' not found", token.c_str() );
//			}
//		}
//	} else if ( token == "sound_voice" ) {
//		if( !src.ReadTokenOnLine( &token ) ) {
//			return "Unexpected end of line";
//		}
//		fc.type = FC_SOUND_VOICE;
//		if ( !token.Cmpn( "snd_", 4 ) ) {
//			fc.string = new idStr( token );
//		} else {
//			fc.soundShader = declManager.FindSound( token );
//			if ( fc.soundShader.GetState() == DS_DEFAULTED ) {
//				gameLocal.Warning( "Sound '%s' not found", token.c_str() );
//			}
//		}
//	} else if ( token == "sound_voice2" ) {
//		if( !src.ReadTokenOnLine( &token ) ) {
//			return "Unexpected end of line";
//		}
//		fc.type = FC_SOUND_VOICE2;
//		if ( !token.Cmpn( "snd_", 4 ) ) {
//			fc.string = new idStr( token );
//		} else {
//			fc.soundShader = declManager.FindSound( token );
//			if ( fc.soundShader.GetState() == DS_DEFAULTED ) {
//				gameLocal.Warning( "Sound '%s' not found", token.c_str() );
//			}
//		}
//	} else if ( token == "sound_body" ) {
//		if( !src.ReadTokenOnLine( &token ) ) {
//			return "Unexpected end of line";
//		}
//		fc.type = FC_SOUND_BODY;
//		if ( !token.Cmpn( "snd_", 4 ) ) {
//			fc.string = new idStr( token );
//		} else {
//			fc.soundShader = declManager.FindSound( token );
//			if ( fc.soundShader.GetState() == DS_DEFAULTED ) {
//				gameLocal.Warning( "Sound '%s' not found", token.c_str() );
//			}
//		}
//	} else if ( token == "sound_body2" ) {
//		if( !src.ReadTokenOnLine( &token ) ) {
//			return "Unexpected end of line";
//		}
//		fc.type = FC_SOUND_BODY2;
//		if ( !token.Cmpn( "snd_", 4 ) ) {
//			fc.string = new idStr( token );
//		} else {
//			fc.soundShader = declManager.FindSound( token );
//			if ( fc.soundShader.GetState() == DS_DEFAULTED ) {
//				gameLocal.Warning( "Sound '%s' not found", token.c_str() );
//			}
//		}
//	} else if ( token == "sound_body3" ) {
//		if( !src.ReadTokenOnLine( &token ) ) {
//			return "Unexpected end of line";
//		}
//		fc.type = FC_SOUND_BODY3;
//		if ( !token.Cmpn( "snd_", 4 ) ) {
//			fc.string = new idStr( token );
//		} else {
//			fc.soundShader = declManager.FindSound( token );
//			if ( fc.soundShader.GetState() == DS_DEFAULTED ) {
//				gameLocal.Warning( "Sound '%s' not found", token.c_str() );
//			}
//		}
//	} else if ( token == "sound_weapon" ) {
//		if( !src.ReadTokenOnLine( &token ) ) {
//			return "Unexpected end of line";
//		}
//		fc.type = FC_SOUND_WEAPON;
//		if ( !token.Cmpn( "snd_", 4 ) ) {
//			fc.string = new idStr( token );
//		} else {
//			fc.soundShader = declManager.FindSound( token );
//			if ( fc.soundShader.GetState() == DS_DEFAULTED ) {
//				gameLocal.Warning( "Sound '%s' not found", token.c_str() );
//			}
//		}
//	} else if ( token == "sound_global" ) {
//		if( !src.ReadTokenOnLine( &token ) ) {
//			return "Unexpected end of line";
//		}
//		fc.type = FC_SOUND_GLOBAL;
//		if ( !token.Cmpn( "snd_", 4 ) ) {
//			fc.string = new idStr( token );
//		} else {
//			fc.soundShader = declManager.FindSound( token );
//			if ( fc.soundShader.GetState() == DS_DEFAULTED ) {
//				gameLocal.Warning( "Sound '%s' not found", token.c_str() );
//			}
//		}
//	} else if ( token == "sound_item" ) {
//		if( !src.ReadTokenOnLine( &token ) ) {
//			return "Unexpected end of line";
//		}
//		fc.type = FC_SOUND_ITEM;
//		if ( !token.Cmpn( "snd_", 4 ) ) {
//			fc.string = new idStr( token );
//		} else {
//			fc.soundShader = declManager.FindSound( token );
//			if ( fc.soundShader.GetState() == DS_DEFAULTED ) {
//				gameLocal.Warning( "Sound '%s' not found", token.c_str() );
//			}
//		}
//	} else if ( token == "sound_chatter" ) {
//		if( !src.ReadTokenOnLine( &token ) ) {
//			return "Unexpected end of line";
//		}
//		fc.type = FC_SOUND_CHATTER;
//		if ( !token.Cmpn( "snd_", 4 ) ) {
//			fc.string = new idStr( token );
//		} else {
//			fc.soundShader = declManager.FindSound( token );
//			if ( fc.soundShader.GetState() == DS_DEFAULTED ) {
//				gameLocal.Warning( "Sound '%s' not found", token.c_str() );
//			}
//		}
//	} else if ( token == "skin" ) {
//		if( !src.ReadTokenOnLine( &token ) ) {
//			return "Unexpected end of line";
//		}
//		fc.type = FC_SKIN;
//		if ( token == "none" ) {
//			fc.skin = NULL;
//		} else {
//			fc.skin = declManager.FindSkin( token );
//			if ( !fc.skin ) {
//				return va( "Skin '%s' not found", token.c_str() );
//			}
//		}
//	} else if ( token == "fx" ) {
//		if( !src.ReadTokenOnLine( &token ) ) {
//			return "Unexpected end of line";
//		}
//		fc.type = FC_FX;
//		if ( !declManager.FindType( DECL_FX, token.c_str() ) ) {
//			return va( "fx '%s' not found", token.c_str() );
//		}
//		fc.string = new idStr( token );
//	} else if ( token == "trigger" ) {
//		if( !src.ReadTokenOnLine( &token ) ) {
//			return "Unexpected end of line";
//		}
//		fc.type = FC_TRIGGER;
//		fc.string = new idStr( token );
//	} else if ( token == "triggerSmokeParticle" ) {
//		if( !src.ReadTokenOnLine( &token ) ) {
//			return "Unexpected end of line";
//		}
//		fc.type = FC_TRIGGER_SMOKE_PARTICLE;
//		fc.string = new idStr( token );
//	} else if ( token == "melee" ) {
//		if( !src.ReadTokenOnLine( &token ) ) {
//			return "Unexpected end of line";
//		}
//		fc.type = FC_MELEE;
//		if ( !gameLocal.FindEntityDef( token.c_str(), false ) ) {
//			return va( "Unknown entityDef '%s'", token.c_str() );
//		}
//		fc.string = new idStr( token );
//	} else if ( token == "direct_damage" ) {
//		if( !src.ReadTokenOnLine( &token ) ) {
//			return "Unexpected end of line";
//		}
//		fc.type = FC_DIRECTDAMAGE;
//		if ( !gameLocal.FindEntityDef( token.c_str(), false ) ) {
//			return va( "Unknown entityDef '%s'", token.c_str() );
//		}
//		fc.string = new idStr( token );
//	} else if ( token == "attack_begin" ) {
//		if( !src.ReadTokenOnLine( &token ) ) {
//			return "Unexpected end of line";
//		}
//		fc.type = FC_BEGINATTACK;
//		if ( !gameLocal.FindEntityDef( token.c_str(), false ) ) {
//			return va( "Unknown entityDef '%s'", token.c_str() );
//		}
//		fc.string = new idStr( token );
//	} else if ( token == "attack_end" ) {
//		fc.type = FC_ENDATTACK;
//	} else if ( token == "muzzle_flash" ) {
//		if( !src.ReadTokenOnLine( &token ) ) {
//			return "Unexpected end of line";
//		}
//		if ( ( token != "" ) && !modelDef.FindJoint( token ) ) {
//			return va( "Joint '%s' not found", token.c_str() );
//		}
//		fc.type = FC_MUZZLEFLASH;
//		fc.string = new idStr( token );
//	} else if ( token == "muzzle_flash" ) {
//		fc.type = FC_MUZZLEFLASH;
//		fc.string = new idStr( "" );
//	} else if ( token == "create_missile" ) {
//		if( !src.ReadTokenOnLine( &token ) ) {
//			return "Unexpected end of line";
//		}
//		if ( !modelDef.FindJoint( token ) ) {
//			return va( "Joint '%s' not found", token.c_str() );
//		}
//		fc.type = FC_CREATEMISSILE;
//		fc.string = new idStr( token );
//	} else if ( token == "launch_missile" ) {
//		if( !src.ReadTokenOnLine( &token ) ) {
//			return "Unexpected end of line";
//		}
//		if ( !modelDef.FindJoint( token ) ) {
//			return va( "Joint '%s' not found", token.c_str() );
//		}
//		fc.type = FC_LAUNCHMISSILE;
//		fc.string = new idStr( token );
//	} else if ( token == "fire_missile_at_target" ) {
//		if( !src.ReadTokenOnLine( &token ) ) {
//			return "Unexpected end of line";
//		}
//		jointInfo = modelDef.FindJoint( token );
//		if ( !jointInfo ) {
//			return va( "Joint '%s' not found", token.c_str() );
//		}
//		if( !src.ReadTokenOnLine( &token ) ) {
//			return "Unexpected end of line";
//		}
//		fc.type = FC_FIREMISSILEATTARGET;
//		fc.string = new idStr( token );
//		fc.index = jointInfo.num;
//	} else if ( token == "footstep" ) {
//		fc.type = FC_FOOTSTEP;
//	} else if ( token == "leftfoot" ) {
//		fc.type = FC_LEFTFOOT;
//	} else if ( token == "rightfoot" ) {
//		fc.type = FC_RIGHTFOOT;
//	} else if ( token == "enableEyeFocus" ) {
//		fc.type = FC_ENABLE_EYE_FOCUS;
//	} else if ( token == "disableEyeFocus" ) {
//		fc.type = FC_DISABLE_EYE_FOCUS;
//	} else if ( token == "disableGravity" ) {
//		fc.type = FC_DISABLE_GRAVITY;
//	} else if ( token == "enableGravity" ) {
//		fc.type = FC_ENABLE_GRAVITY;
//	} else if ( token == "jump" ) {
//		fc.type = FC_JUMP;
//	} else if ( token == "enableClip" ) {
//		fc.type = FC_ENABLE_CLIP;
//	} else if ( token == "disableClip" ) {
//		fc.type = FC_DISABLE_CLIP;
//	} else if ( token == "enableWalkIK" ) {
//		fc.type = FC_ENABLE_WALK_IK;
//	} else if ( token == "disableWalkIK" ) {
//		fc.type = FC_DISABLE_WALK_IK;
//	} else if ( token == "enableLegIK" ) {
//		if( !src.ReadTokenOnLine( &token ) ) {
//			return "Unexpected end of line";
//		}
//		fc.type = FC_ENABLE_LEG_IK;
//		fc.index = atoi( token );
//	} else if ( token == "disableLegIK" ) {
//		if( !src.ReadTokenOnLine( &token ) ) {
//			return "Unexpected end of line";
//		}
//		fc.type = FC_DISABLE_LEG_IK;
//		fc.index = atoi( token );
//	} else if ( token == "recordDemo" ) {
//		fc.type = FC_RECORDDEMO;
//		if( src.ReadTokenOnLine( &token ) ) {
//			fc.string = new idStr( token );
//		}
//	} else if ( token == "aviGame" ) {
//		fc.type = FC_AVIGAME;
//		if( src.ReadTokenOnLine( &token ) ) {
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
//	// return with no error
//	return NULL;
//}
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
///*
//=====================
//idAnim::SetAnimFlags
//=====================
//*/
//void idAnim::SetAnimFlags( const animFlags_t &animflags ) {
//	flags = animflags;
//}
//
///*
//=====================
//idAnim::GetAnimFlags
//=====================
//*/
//const animFlags_t &idAnim::GetAnimFlags( ) const {
//	return flags;
//}
//
///***********************************************************************
//
//	idAnimBlend
//
//***********************************************************************/
//
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
//void idAnimBlend::Restore( idRestoreGame *savefile, const idDeclModelDef *modelDef ) {
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
//void idAnimBlend::SetFrame( const idDeclModelDef *modelDef, int _animNum, int _frame, int currentTime, int blendTime ) {
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
//void idAnimBlend::CycleAnim( const idDeclModelDef *modelDef, int _animNum, int currentTime, int blendTime ) {
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
//void idAnimBlend::PlayAnim( const idDeclModelDef *modelDef, int _animNum, int currentTime, int blendTime ) {
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

///*
//==============================================================================================
//
//	idDeclModelDef
//
//==============================================================================================
//*/
//
class idDeclModelDef extends idDecl {
	//public:
	//								idDeclModelDef();
	//								~idDeclModelDef();
	//
	//	virtual size_t				Size( ) const;
	//	virtual const char *		DefaultDefinition( ) const;
	Parse(text: string, textLength: number): boolean { todoThrow();return false ;}
	//	virtual void				FreeData( );
	//
	//	void						Touch( ) const;
	//
	//	const idDeclSkin *			GetDefaultSkin( ) const;
	//	const idJointQuat *			GetDefaultPose( ) const;
	//	void						SetupJoints( int *numJoints, idJointMat **jointList, idBounds &frameBounds, bool removeOriginOffset ) const;
	//	idRenderModel *				ModelHandle( ) const;
	//	void						GetJointList( jointnames:string, idList<jointHandle_t> &jointList ) const;
	//	const jointInfo_t *			FindJoint( name:string ) const;
	//
	//	int							NumAnims( ) const;
	//	const idAnim *				GetAnim( int index ) const;
	//	int							GetSpecificAnim( name:string ) const;
	//	int							GetAnim( name:string ) const;
	//	bool						HasAnim( name:string ) const;
	//	const idDeclSkin *			GetSkin( ) const;
	//	const char *				GetModelName( ) const;
	//	const idList<jointInfo_t> &	Joints( ) const;
	//	const int *					JointParents( ) const;
	//	int							NumJoints( ) const;
	//	const jointInfo_t *			GetJoint( int jointHandle ) const;
	//	const char *				GetJointName( int jointHandle ) const;
	//	int							NumJointsOnChannel( int channel ) const;
	//	const int *					GetChannelJoints( int channel ) const;
	//
	//	const idVec3 &				GetVisualOffset( ) const;
	//
	//private:
	//	void						CopyDecl( const idDeclModelDef *decl );
	//	bool						ParseAnim( idLexer &src, int numDefaultAnims );
	//
	//private:
	offset = new idVec3;
	//	idList<jointInfo_t>			joints;
	jointParents = new idList</*int*/number>(Number);
	//	idList<int>					channelJoints[ ANIM_NumAnimChannels ];
	modelHandle:idRenderModel;
	anims = new idList<idAnim >(idAnim ,true)	;
	skin:idDeclSkin;
///*
//=====================
//idDeclModelDef::idDeclModelDef
//=====================
//*/
//idDeclModelDef::idDeclModelDef() {
//	this.modelHandle	= NULL;
//	skin		= NULL;
//	offset.Zero();
//	for ( int i = 0; i < ANIM_NumAnimChannels; i++ ) {
//		channelJoints[i].Clear();
//	}
//}
//
///*
//=====================
//idDeclModelDef::~idDeclModelDef
//=====================
//*/
//idDeclModelDef::~idDeclModelDef() {
//	FreeData();
//}
//
///*
//=================
//idDeclModelDef::Size
//=================
//*/
//size_t idDeclModelDef::Size( ) const {
//	return sizeof( idDeclModelDef );
//}
//
///*
//=====================
//idDeclModelDef::CopyDecl
//=====================
//*/
//void idDeclModelDef::CopyDecl( const idDeclModelDef *decl ) {
//	var/*int*/i:number;
//
//	FreeData();
//
//	offset = decl.offset;
//	this.modelHandle = decl.modelHandle;
//	skin = decl.skin;
//
//	anims.SetNum( decl.anims.Num() );
//	for( i = 0; i < anims.Num(); i++ ) {
//		anims[ i ] = new idAnim( this, decl.anims[ i ] );
//	}
//
//	joints.SetNum( decl.joints.Num() );
//	memcpy( joints.Ptr(), decl.joints.Ptr(), decl.joints.Num() * sizeof( joints[0] ) );
//	jointParents.SetNum( decl.jointParents.Num() );
//	memcpy( jointParents.Ptr(), decl.jointParents.Ptr(), decl.jointParents.Num() * sizeof( jointParents[0] ) );
//	for ( i = 0; i < ANIM_NumAnimChannels; i++ ) {
//		channelJoints[i] = decl.channelJoints[i];
//	}
//}
//
///*
//=====================
//idDeclModelDef::FreeData
//=====================
//*/
//void idDeclModelDef::FreeData( ) {
//	anims.DeleteContents( true );
//	joints.Clear();
//	jointParents.Clear();
//	this.modelHandle	= NULL;
//	skin = NULL;
//	offset.Zero();
//	for ( int i = 0; i < ANIM_NumAnimChannels; i++ ) {
//		channelJoints[i].Clear();
//	}
//}
//
/*
================
idDeclModelDef::DefaultDefinition
================
*/
	DefaultDefinition ( ): string {
		return "{ }";
	}

///*
//====================
//idDeclModelDef::FindJoint
//====================
//*/
//const jointInfo_t *idDeclModelDef::FindJoint( name:string ) const {
//	int					i;
//	const idMD5Joint	*joint;
//
//	if ( !this.modelHandle ) {
//		return NULL;
//	}
//	
//	joint = this.modelHandle.GetJoints();
//	for( i = 0; i < joints.Num(); i++, joint++ ) {
//		if ( !joint.name.Icmp( name ) ) {
//			return &joints[ i ];
//		}
//	}
//
//	return NULL;
//}

/*
=====================
idDeclModelDef::ModelHandle
=====================
*/
	ModelHandle ( ): idRenderModel {
		return <idRenderModel >this.modelHandle;
	}

///*
//=====================
//idDeclModelDef::GetJointList
//=====================
//*/
//void idDeclModelDef::GetJointList( jointnames:string, idList<jointHandle_t> &jointList ) const {
//	const char			*pos;
//	idStr				jointname;
//	const jointInfo_t	*joint;
//	const jointInfo_t	*child;
//	int					i;
//	int					num;
//	bool				getChildren;
//	bool				subtract;
//
//	if ( !this.modelHandle ) {
//		return;
//	}
//
//	jointList.Clear();
//
//	num = this.modelHandle.NumJoints();
//
//	// scan through list of joints and add each to the joint list
//	pos = jointnames;
//	while( *pos ) {
//		// skip over whitespace
//		while( ( *pos != 0 ) && isspace( *pos ) ) {
//			pos++;
//		}
//
//		if ( !*pos ) {
//			// no more names
//			break;
//		}
//
//		// copy joint name
//		jointname = "";
//
//		if ( *pos == '-' ) {
//			subtract = true;
//			pos++;
//		} else {
//			subtract = false;
//		}
//
//		if ( *pos == '*' ) {
//			getChildren = true;
//			pos++;
//		} else {
//			getChildren = false;
//		}
//
//		while( ( *pos != 0 ) && !isspace( *pos ) ) {
//			jointname += *pos;
//			pos++;
//		}
//
//		joint = FindJoint( jointname );
//		if ( !joint ) {
//			gameLocal.Warning( "Unknown joint '%s' in '%s' for model '%s'", jointname.c_str(), jointnames, GetName() );
//			continue;
//		}
//
//		if ( !subtract ) {
//			jointList.AddUnique( joint.num );
//		} else {
//			jointList.Remove( joint.num );
//		}
//
//		if ( getChildren ) {
//			// include all joint's children
//			child = joint + 1;
//			for( i = joint.num + 1; i < num; i++, child++ ) {
//				// all children of the joint should follow it in the list.
//				// once we reach a joint without a parent or with a parent
//				// who is earlier in the list than the specified joint, then
//				// we've gone through all it's children.
//				if ( child.parentNum < joint.num ) {
//					break;
//				}
//
//				if ( !subtract ) {
//					jointList.AddUnique( child.num );
//				} else {
//					jointList.Remove( child.num );
//				}
//			}
//		}
//	}
//}
//
///*
//=====================
//idDeclModelDef::Touch
//=====================
//*/
//void idDeclModelDef::Touch( ) const {
//	if ( this.modelHandle ) {
//		renderModelManager.FindModel( this.modelHandle.Name() );
//	}
//}

/*
=====================
idDeclModelDef::GetDefaultSkin
=====================
*/
	GetDefaultSkin ( ): idDeclSkin {
		return this.skin;
	}

///*
//=====================
//idDeclModelDef::GetDefaultPose
//=====================
//*/
//const idJointQuat *idDeclModelDef::GetDefaultPose( ) const {
//	return this.modelHandle.GetDefaultPose();
//}
//
///*
//=====================
//idDeclModelDef::SetupJoints
//=====================
//*/
//void idDeclModelDef::SetupJoints( int *numJoints, idJointMat **jointList, idBounds &frameBounds, bool removeOriginOffset ) const {
//	int					num;
//	const idJointQuat	*pose;
//	idJointMat			*list;
//
//	if ( !this.modelHandle || this.modelHandle.IsDefaultModel() ) {
//		Mem_Free16( (*jointList) );
//		(*jointList) = NULL;
//		frameBounds.Clear();
//		return;
//	}
//
//	// get the number of joints
//	num = this.modelHandle.NumJoints();
//
//	if ( !num ) {
//		gameLocal.Error( "model '%s' has no joints", this.modelHandle.Name() );
//	}
//
//	// set up initial pose for model (with no pose, model is just a jumbled mess)
//	list = (idJointMat *) Mem_Alloc16( num * sizeof( list[0] ) );
//	pose = GetDefaultPose();
//
//	// convert the joint quaternions to joint matrices
//	SIMDProcessor.ConvertJointQuatsToJointMats( list, pose, joints.Num() );
//
//	// check if we offset the model by the origin joint
//	if ( removeOriginOffset ) {
//#ifdef VELOCITY_MOVE
//		list[ 0 ].SetTranslation( idVec3( offset.x, offset.y + pose[0].t.y, offset.z + pose[0].t.z ) );
//#else
//		list[ 0 ].SetTranslation( offset );
//#endif
//	} else {
//		list[ 0 ].SetTranslation( pose[0].t + offset );
//	}
//
//	// transform the joint hierarchy
//	SIMDProcessor.TransformJoints( list, jointParents.Ptr(), 1, joints.Num() - 1 );
//
//	*numJoints = num;
//	*jointList = list;
//
//	// get the bounds of the default pose
//	frameBounds = this.modelHandle.Bounds( NULL );
//}
//
///*
//=====================
//idDeclModelDef::ParseAnim
//=====================
//*/
//bool idDeclModelDef::ParseAnim( idLexer &src, int numDefaultAnims ) {
//	int				i;
//	int				len;
//	idAnim			*anim;
//	const idMD5Anim	*md5anims[ ANIM_MaxSyncedAnims ];
//	const idMD5Anim	*md5anim;
//	idStr			alias;
//	idToken			realname;
//	idToken			token;
//	int				numAnims;
//	animFlags_t		flags;
//
//	numAnims = 0;
//	memset( md5anims, 0, sizeof( md5anims ) );
//
//	if( !src.ReadToken( &realname ) ) {
//		src.Warning( "Unexpected end of file" );
//		MakeDefault();
//		return false;
//	}
//	alias = realname;
//
//	for( i = 0; i < anims.Num(); i++ ) {
//		if ( !strcmp( anims[ i ].FullName(), realname ) ) {
//			break;
//		}
//	}
//
//	if ( ( i < anims.Num() ) && ( i >= numDefaultAnims ) ) {
//		src.Warning( "Duplicate anim '%s'", realname.c_str() );
//		MakeDefault();
//		return false;
//	}
//
//	if ( i < numDefaultAnims ) {
//		anim = anims[ i ];
//	} else {
//		// create the alias associated with this animation
//		anim = new idAnim();
//		anims.Append( anim );
//	}
//
//	// random anims end with a number.  find the numeric suffix of the animation.
//	len = alias.Length();
//	for( i = len - 1; i > 0; i-- ) {
//		if ( !isdigit( alias[ i ] ) ) {
//			break;
//		}
//	}
//
//	// check for zero length name, or a purely numeric name
//	if ( i <= 0 ) {
//		src.Warning( "Invalid animation name '%s'", alias.c_str() );
//		MakeDefault();
//		return false;
//	}
//
//	// remove the numeric suffix
//	alias.CapLength( i + 1 );
//
//	// parse the anims from the string
//	do {
//		if( !src.ReadToken( &token ) ) {
//			src.Warning( "Unexpected end of file" );
//			MakeDefault();
//			return false;
//		}
//
//		// lookup the animation
//		md5anim = animationLib.GetAnim( token );
//		if ( !md5anim ) {
//			src.Warning( "Couldn't load anim '%s'", token.c_str() );
//			MakeDefault();
//			return false;
//		}
//
//		md5anim.CheckModelHierarchy( this.modelHandle );
//
//		if ( numAnims > 0 ) {
//			// make sure it's the same length as the other anims
//			if ( md5anim.Length() != md5anims[ 0 ].Length() ) {
//				src.Warning( "Anim '%s' does not match length of anim '%s'", md5anim.Name(), md5anims[ 0 ].Name() );
//				MakeDefault();
//				return false;
//			}
//		}
//
//		if ( numAnims >= ANIM_MaxSyncedAnims ) {
//			src.Warning( "Exceeded max synced anims (%d)", ANIM_MaxSyncedAnims );
//			MakeDefault();
//			return false;
//		}
//
//		// add it to our list
//		md5anims[ numAnims ] = md5anim;
//		numAnims++;
//	} while ( src.CheckTokenString( "," ) );
//
//	if ( !numAnims ) {
//		src.Warning( "No animation specified" );
//		MakeDefault();
//		return false;
//	}
//
//	anim.SetAnim( this, realname, alias, numAnims, md5anims );
//	memset( &flags, 0, sizeof( flags ) );
//
//	// parse any frame commands or animflags
//	if ( src.CheckTokenString( "{" ) ) {
//		while( true ) {
//			if( !src.ReadToken( &token ) ) {
//				src.Warning( "Unexpected end of file" );
//				MakeDefault();
//				return false;
//			}
//			if ( token == "}" ) {
//				break;
//			}else if ( token == "prevent_idle_override" ) {
//				flags.prevent_idle_override = true;
//			} else if ( token == "random_cycle_start" ) {
//				flags.random_cycle_start = true;
//			} else if ( token == "ai_no_turn" ) {
//				flags.ai_no_turn = true;
//			} else if ( token == "anim_turn" ) {
//				flags.anim_turn = true;
//			} else if ( token == "frame" ) {
//				// create a frame command
//				int			framenum;
//				const char	*err;
//
//				// make sure we don't have any line breaks while reading the frame command so the error line # will be correct
//				if ( !src.ReadTokenOnLine( &token ) ) {
//					src.Warning( "Missing frame # after 'frame'" );
//					MakeDefault();
//					return false;
//				}
//				if ( token.type == TT_PUNCTUATION && token == "-" ) {
//					src.Warning( "Invalid frame # after 'frame'" );
//					MakeDefault();
//					return false;
//				} else if ( token.type != TT_NUMBER || token.subtype == TT_FLOAT ) {
//					src.Error( "expected integer value, found '%s'", token.c_str() );
//				}
//
//				// get the frame number
//				framenum = token.GetIntValue();
//
//				// put the command on the specified frame of the animation
//				err = anim.AddFrameCommand( this, framenum, src, NULL );
//				if ( err ) {
//					src.Warning( "%s", err );
//					MakeDefault();
//					return false;
//				}
//			} else {
//				src.Warning( "Unknown command '%s'", token.c_str() );
//				MakeDefault();
//				return false;
//			}
//		}
//	}
//
//	// set the flags
//	anim.SetAnimFlags( flags );
//	return true;
//}
//
///*
//================
//idDeclModelDef::Parse
//================
//*/
//bool idDeclModelDef::Parse( text:string, const int textLength ) {
//	int					i;
//	int					num;
//	idStr				filename;
//	idStr				extension;
//	const idMD5Joint	*md5joint;
//	const idMD5Joint	*md5joints;
//	idLexer				src;
//	idToken				token;
//	idToken				token2;
//	idStr				jointnames;
//	int					channel;
//	jointHandle_t		jointnum;
//	idList<jointHandle_t> jointList;
//	int					numDefaultAnims;
//
//	src.LoadMemory( text, textLength, GetFileName(), GetLineNum() );
//	src.SetFlags( DECL_LEXER_FLAGS );
//	src.SkipUntilString( "{" );
//
//	numDefaultAnims = 0;
//	while( true ) {
//		if ( !src.ReadToken( &token ) ) {
//			break;
//		}
//
//		if ( !token.Icmp( "}" ) ) {
//			break;
//		}
//
//		if ( token == "inherit" ) {
//			if( !src.ReadToken( &token2 ) ) {
//				src.Warning( "Unexpected end of file" );
//				MakeDefault();
//				return false;
//			}
//			
//			const idDeclModelDef *copy = static_cast<const idDeclModelDef *>( declManager.FindType( DECL_MODELDEF, token2, false ) );
//			if ( !copy ) {
//				common.Warning( "Unknown model definition '%s'", token2.c_str() );
//			} else if ( copy.GetState() == DS_DEFAULTED ) {
//				common.Warning( "inherited model definition '%s' defaulted", token2.c_str() );
//				MakeDefault();
//				return false;
//			} else {
//				CopyDecl( copy );
//				numDefaultAnims = anims.Num();
//			}
//		} else if ( token == "skin" ) {
//			if( !src.ReadToken( &token2 ) ) {
//				src.Warning( "Unexpected end of file" );
//				MakeDefault();
//				return false;
//			}
//			skin = declManager.FindSkin( token2 );
//			if ( !skin ) {
//				src.Warning( "Skin '%s' not found", token2.c_str() );
//				MakeDefault();
//				return false;
//			}
//		} else if ( token == "mesh" ) {
//			if( !src.ReadToken( &token2 ) ) {
//				src.Warning( "Unexpected end of file" );
//				MakeDefault();
//				return false;
//			}
//			filename = token2;
//			filename.ExtractFileExtension( extension );
//			if ( extension != MD5_MESH_EXT ) {
//				src.Warning( "Invalid model for MD5 mesh" );
//				MakeDefault();
//				return false;
//			}
//			this.modelHandle = renderModelManager.FindModel( filename );
//			if ( !this.modelHandle ) {
//				src.Warning( "Model '%s' not found", filename.c_str() );
//				MakeDefault();
//				return false;
//			}
//
//			if ( this.modelHandle.IsDefaultModel() ) {
//				src.Warning( "Model '%s' defaulted", filename.c_str() );
//				MakeDefault();
//				return false;
//			}
//
//			// get the number of joints
//			num = this.modelHandle.NumJoints();
//			if ( !num ) {
//				src.Warning( "Model '%s' has no joints", filename.c_str() );
//			}
//
//			// set up the joint hierarchy
//			joints.SetGranularity( 1 );
//			joints.SetNum( num );
//			jointParents.SetNum( num );
//			channelJoints[0].SetNum( num );
//			md5joints = this.modelHandle.GetJoints();
//			md5joint = md5joints;
//			for( i = 0; i < num; i++, md5joint++ ) {
//				joints[i].channel = ANIMCHANNEL_ALL;
//				joints[i].num = static_cast<jointHandle_t>( i );
//				if ( md5joint.parent ) {
//					joints[i].parentNum = static_cast<jointHandle_t>( md5joint.parent - md5joints );
//				} else {
//					joints[i].parentNum = INVALID_JOINT;
//				}
//				jointParents[i] = joints[i].parentNum;
//				channelJoints[0][i] = i;
//			}
//		} else if ( token == "remove" ) {
//			// removes any anims whos name matches
//			if( !src.ReadToken( &token2 ) ) {
//				src.Warning( "Unexpected end of file" );
//				MakeDefault();
//				return false;
//			}
//			num = 0;
//			for( i = 0; i < anims.Num(); i++ ) {
//				if ( ( token2 == anims[ i ].Name() ) || ( token2 == anims[ i ].FullName() ) ) {
//					delete anims[ i ];
//					anims.RemoveIndex( i );
//					if ( i >= numDefaultAnims ) {
//						src.Warning( "Anim '%s' was not inherited.  Anim should be removed from the model def.", token2.c_str() );
//						MakeDefault();
//						return false;
//					}
//					i--;
//					numDefaultAnims--;
//					num++;
//					continue;
//				}
//			}
//			if ( !num ) {
//				src.Warning( "Couldn't find anim '%s' to remove", token2.c_str() );
//				MakeDefault();
//				return false;
//			}
//		} else if ( token == "anim" ) {
//			if ( !this.modelHandle ) {
//				src.Warning( "Must specify mesh before defining anims" );
//				MakeDefault();
//				return false;
//			}
//			if ( !ParseAnim( src, numDefaultAnims ) ) {
//				MakeDefault();
//				return false;
//			}
//		} else if ( token == "offset" ) {
//			if ( !src.Parse1DMatrix( 3, offset.ToFloatPtr() ) ) {
//				src.Warning( "Expected vector following 'offset'" );
//				MakeDefault();
//				return false;
//			}
//		} else if ( token == "channel" ) {
//			if ( !this.modelHandle ) {
//				src.Warning( "Must specify mesh before defining channels" );
//				MakeDefault();
//				return false;
//			}
//
//			// set the channel for a group of joints
//			if( !src.ReadToken( &token2 ) ) {
//				src.Warning( "Unexpected end of file" );
//				MakeDefault();
//				return false;
//			}
//			if ( !src.CheckTokenString( "(" ) ) {
//				src.Warning( "Expected { after '%s'\n", token2.c_str() );
//				MakeDefault();
//				return false;
//			}
//
//			for( i = ANIMCHANNEL_ALL + 1; i < ANIM_NumAnimChannels; i++ ) {
//				if ( !idStr::Icmp( channelNames[ i ], token2 ) ) {
//					break;
//				}
//			}
//
//			if ( i >= ANIM_NumAnimChannels ) {
//				src.Warning( "Unknown channel '%s'", token2.c_str() );
//				MakeDefault();
//				return false;
//			}
//
//			channel = i;
//			jointnames = "";
//
//			while( !src.CheckTokenString( ")" ) ) {
//				if( !src.ReadToken( &token2 ) ) {
//					src.Warning( "Unexpected end of file" );
//					MakeDefault();
//					return false;
//				}
//				jointnames += token2;
//				if ( ( token2 != "*" ) && ( token2 != "-" ) ) {
//					jointnames += " ";
//				}
//			}
//
//			GetJointList( jointnames, jointList );
//
//			channelJoints[ channel ].SetNum( jointList.Num() );
//			for( num = i = 0; i < jointList.Num(); i++ ) {
//				jointnum = jointList[ i ];
//				if ( joints[ jointnum ].channel != ANIMCHANNEL_ALL ) {
//					src.Warning( "Joint '%s' assigned to multiple channels", this.modelHandle.GetJointName( jointnum ) );
//					continue;
//				}
//				joints[ jointnum ].channel = channel;
//				channelJoints[ channel ][ num++ ] = jointnum;
//			}
//			channelJoints[ channel ].SetNum( num );
//		} else {
//			src.Warning( "unknown token '%s'", token.c_str() );
//			MakeDefault();
//			return false;
//		}
//	}
//
//	// shrink the anim list down to save space
//	anims.SetGranularity( 1 );
//	anims.SetNum( anims.Num() );
//
//	return true;
//}
//
///*
//=====================
//idDeclModelDef::HasAnim
//=====================
//*/
//bool idDeclModelDef::HasAnim( name:string ) const {
//	int	i;
//
//	// find any animations with same name
//	for( i = 0; i < anims.Num(); i++ ) {
//		if ( !strcmp( anims[ i ].Name(), name ) ) {
//			return true;
//		}
//	}
//	
//	return false;
//}
//
///*
//=====================
//idDeclModelDef::NumAnims
//=====================
//*/
//int idDeclModelDef::NumAnims( ) const {
//	return anims.Num() + 1;
//}
//
///*
//=====================
//idDeclModelDef::GetSpecificAnim
//
//Gets the exact anim for the name, without randomization.
//=====================
//*/
//int idDeclModelDef::GetSpecificAnim( name:string ) const {
//	int	i;
//
//	// find a specific animation
//	for( i = 0; i < anims.Num(); i++ ) {
//		if ( !strcmp( anims[ i ].FullName(), name ) ) {
//			return i + 1;
//		}
//	}
//
//	// didn't find it
//	return 0;
//}
//
///*
//=====================
//idDeclModelDef::GetAnim
//=====================
//*/
//const idAnim *idDeclModelDef::GetAnim( int index ) const {
//	if ( ( index < 1 ) || ( index > anims.Num() ) ) {
//		return NULL;
//	}
//	
//	return anims[ index - 1 ];
//}
//
///*
//=====================
//idDeclModelDef::GetAnim
//=====================
//*/
//int idDeclModelDef::GetAnim( name:string ) const {
//	int				i;
//	int				which;
//	const int		MAX_ANIMS = 64;
//	int				animList[ MAX_ANIMS ];
//	int				numAnims;
//	int				len;
//
//	len = strlen( name );
//	if ( len && idStr::CharIsNumeric( name[ len - 1 ] ) ) {
//		// find a specific animation
//		return GetSpecificAnim( name );
//	}
//
//	// find all animations with same name
//	numAnims = 0;
//	for( i = 0; i < anims.Num(); i++ ) {
//		if ( !strcmp( anims[ i ].Name(), name ) ) {
//			animList[ numAnims++ ] = i;
//			if ( numAnims >= MAX_ANIMS ) {
//				break;
//			}
//		}
//	}
//
//	if ( !numAnims ) {
//		return 0;
//	}
//
//	// get a random anim
//	//FIXME: don't access gameLocal here?
//	which = gameLocal.random.RandomInt( numAnims );
//	return animList[ which ] + 1;
//}
//
///*
//=====================
//idDeclModelDef::GetSkin
//=====================
//*/
//const idDeclSkin *idDeclModelDef::GetSkin( ) const {
//	return skin;
//}
//
///*
//=====================
//idDeclModelDef::GetModelName
//=====================
//*/
//const char *idDeclModelDef::GetModelName( ) const {
//	if ( this.modelHandle ) {
//		return this.modelHandle.Name();
//	} else {
//		return "";
//	}
//}
//
///*
//=====================
//idDeclModelDef::Joints
//=====================
//*/
//const idList<jointInfo_t> &idDeclModelDef::Joints( ) const {
//	return joints;
//}
//
///*
//=====================
//idDeclModelDef::JointParents
//=====================
//*/
//const int * idDeclModelDef::JointParents( ) const {
//	return jointParents.Ptr();
//}
//
///*
//=====================
//idDeclModelDef::NumJoints
//=====================
//*/
//int idDeclModelDef::NumJoints( ) const {
//	return joints.Num();
//}
//
///*
//=====================
//idDeclModelDef::GetJoint
//=====================
//*/
//const jointInfo_t *idDeclModelDef::GetJoint( int jointHandle ) const {
//	if ( ( jointHandle < 0 ) || ( jointHandle > joints.Num() ) ) {
//		gameLocal.Error( "idDeclModelDef::GetJoint : joint handle out of range" );
//	}
//	return &joints[ jointHandle ];
//}
//
///*
//====================
//idDeclModelDef::GetJointName
//====================
//*/
//const char *idDeclModelDef::GetJointName( int jointHandle ) const {
//	const idMD5Joint *joint;
//
//	if ( !this.modelHandle ) {
//		return NULL;
//	}
//	
//	if ( ( jointHandle < 0 ) || ( jointHandle > joints.Num() ) ) {
//		gameLocal.Error( "idDeclModelDef::GetJointName : joint handle out of range" );
//	}
//
//	joint = this.modelHandle.GetJoints();
//	return joint[ jointHandle ].name.c_str();
//}
//
///*
//=====================
//idDeclModelDef::NumJointsOnChannel
//=====================
//*/
//int idDeclModelDef::NumJointsOnChannel( int channel ) const {
//	if ( ( channel < 0 ) || ( channel >= ANIM_NumAnimChannels ) ) {
//		gameLocal.Error( "idDeclModelDef::NumJointsOnChannel : channel out of range" );
//	}
//	return channelJoints[ channel ].Num();
//}
//
///*
//=====================
//idDeclModelDef::GetChannelJoints
//=====================
//*/
//const int * idDeclModelDef::GetChannelJoints( int channel ) const {
//	if ( ( channel < 0 ) || ( channel >= ANIM_NumAnimChannels ) ) {
//		gameLocal.Error( "idDeclModelDef::GetChannelJoints : channel out of range" );
//	}
//	return channelJoints[ channel ].Ptr();
//}
//
///*
//=====================
//idDeclModelDef::GetVisualOffset
//=====================
//*/
//const idVec3 &idDeclModelDef::GetVisualOffset( ) const {
//	return offset;
//}
};


///***********************************************************************
//
//	Util functions
//
//***********************************************************************/
//
///*
//=====================
//ANIM_GetModelDefFromEntityDef
//=====================
//*/
//const idDeclModelDef *ANIM_GetModelDefFromEntityDef( const idDict *args ) {
//	const idDeclModelDef *modelDef;
//
//	idStr name = args.GetString( "model" );
//	modelDef = static_cast<const idDeclModelDef *>( declManager.FindType( DECL_MODELDEF, name, false ) );
//	if ( modelDef && modelDef.ModelHandle() ) {
//		return modelDef;
//	}
//
//	return NULL;
//}
//
///*
//=====================
//idGameEdit::ANIM_GetModelFromEntityDef
//=====================
//*/
//idRenderModel *idGameEdit::ANIM_GetModelFromEntityDef( const idDict *args ) {
//	idRenderModel *model;
//	const idDeclModelDef *modelDef;
//
//	model = NULL;
//
//	idStr name = args.GetString( "model" );
//	modelDef = static_cast<const idDeclModelDef *>( declManager.FindType( DECL_MODELDEF, name, false ) );
//	if ( modelDef ) {
//		model = modelDef.ModelHandle();
//	}
//
//	if ( !model ) {
//		model = renderModelManager.FindModel( name );
//	}
//
//	if ( model && model.IsDefaultModel() ) {
//		return NULL;
//	}
//
//	return model;
//}
//
///*
//=====================
//idGameEdit::ANIM_GetModelFromEntityDef
//=====================
//*/
//idRenderModel *idGameEdit::ANIM_GetModelFromEntityDef( const char *classname ) {
//	const idDict *args;
//
//	args = gameLocal.FindEntityDefDict( classname, false );
//	if ( !args ) {
//		return NULL;
//	}
//
//	return ANIM_GetModelFromEntityDef( args );
//}
//
///*
//=====================
//idGameEdit::ANIM_GetModelOffsetFromEntityDef
//=====================
//*/
//const idVec3 &idGameEdit::ANIM_GetModelOffsetFromEntityDef( const char *classname ) {
//	const idDict *args;
//	const idDeclModelDef *modelDef;
//
//	args = gameLocal.FindEntityDefDict( classname, false );
//	if ( !args ) {
//		return vec3_origin;
//	}
//
//	modelDef = ANIM_GetModelDefFromEntityDef( args );
//	if ( !modelDef ) {
//		return vec3_origin;
//	}
//
//	return modelDef.GetVisualOffset();
//}
//
///*
//=====================
//idGameEdit::ANIM_GetModelFromName
//=====================
//*/
//idRenderModel *idGameEdit::ANIM_GetModelFromName( const char *modelName ) {
//	const idDeclModelDef *modelDef;
//	idRenderModel *model;
//
//	model = NULL;
//	modelDef = static_cast<const idDeclModelDef *>( declManager.FindType( DECL_MODELDEF, modelName, false ) );
//	if ( modelDef ) {
//		model = modelDef.ModelHandle();
//	}
//	if ( !model ) {
//		model = renderModelManager.FindModel( modelName );
//	}
//	return model;
//}
//
///*
//=====================
//idGameEdit::ANIM_GetAnimFromEntityDef
//=====================
//*/
//const idMD5Anim *idGameEdit::ANIM_GetAnimFromEntityDef( const char *classname, const char *animname ) {
//	const idDict *args;
//	const idMD5Anim *md5anim;
//	const idAnim *anim;
//	int	animNum;
//	const char	*modelname;
//	const idDeclModelDef *modelDef;
//
//	args = gameLocal.FindEntityDefDict( classname, false );
//	if ( !args ) {
//		return NULL;
//	}
//
//	md5anim = NULL;
//	modelname = args.GetString( "model" );
//	modelDef = static_cast<const idDeclModelDef *>( declManager.FindType( DECL_MODELDEF, modelname, false ) );
//	if ( modelDef ) {
//		animNum = modelDef.GetAnim( animname );
//		if ( animNum ) {
//			anim = modelDef.GetAnim( animNum );
//			if ( anim ) {
//				md5anim = anim.MD5Anim( 0 );
//			}
//		}
//	}
//	return md5anim;
//}
//
///*
//=====================
//idGameEdit::ANIM_GetNumAnimsFromEntityDef
//=====================
//*/
//int idGameEdit::ANIM_GetNumAnimsFromEntityDef( const idDict *args ) {
//	const char *modelname;
//	const idDeclModelDef *modelDef;
//
//	modelname = args.GetString( "model" );
//	modelDef = static_cast<const idDeclModelDef *>( declManager.FindType( DECL_MODELDEF, modelname, false ) );
//	if ( modelDef ) {
//		return modelDef.NumAnims();
//	}
//	return 0;
//}
//
///*
//=====================
//idGameEdit::ANIM_GetAnimNameFromEntityDef
//=====================
//*/
//const char *idGameEdit::ANIM_GetAnimNameFromEntityDef( const idDict *args, int animNum ) {
//	const char *modelname;
//	const idDeclModelDef *modelDef;
//
//	modelname = args.GetString( "model" );
//	modelDef = static_cast<const idDeclModelDef *>( declManager.FindType( DECL_MODELDEF, modelname, false ) );
//	if ( modelDef ) {
//		const idAnim* anim = modelDef.GetAnim( animNum );
//		if ( anim ) {
//			return anim.FullName();
//		}
//	}
//	return "";
//}
//
///*
//=====================
//idGameEdit::ANIM_GetAnim
//=====================
//*/
//const idMD5Anim *idGameEdit::ANIM_GetAnim( const char *fileName ) {
//	return animationLib.GetAnim( fileName );
//}
//
///*
//=====================
//idGameEdit::ANIM_GetLength
//=====================
//*/
//int	idGameEdit::ANIM_GetLength( const idMD5Anim *anim ) {
//	if ( !anim ) {
//		return 0;
//	}
//	return anim.Length();
//}
//
///*
//=====================
//idGameEdit::ANIM_GetNumFrames
//=====================
//*/
//int idGameEdit::ANIM_GetNumFrames( const idMD5Anim *anim ) {
//	if ( !anim ) {
//		return 0;
//	}
//	return anim.NumFrames();
//}
//
///*
//=====================
//idGameEdit::ANIM_CreateAnimFrame
//=====================
//*/
//void idGameEdit::ANIM_CreateAnimFrame( const idRenderModel *model, const idMD5Anim *anim, int numJoints, idJointMat *joints, /*int*/time:number, const idVec3 &offset, bool remove_origin_offset ) {
//	int					i;
//	frameBlend_t		frame;
//	const idMD5Joint	*md5joints;
//	int					*index;
//
//	if ( !model || model.IsDefaultModel() || !anim ) {
//		return;
//	}
//
//	if ( numJoints != model.NumJoints() ) {
//		gameLocal.Error( "ANIM_CreateAnimFrame: different # of joints in renderEntity_t than in model (%s)", model.Name() );
//	}
//
//	if ( !model.NumJoints() ) {
//		// FIXME: Print out a warning?
//		return;
//	}
//
//	if ( !joints ) {
//		gameLocal.Error( "ANIM_CreateAnimFrame: NULL joint frame pointer on model (%s)", model.Name() );
//	}
//
//	if ( numJoints != anim.NumJoints() ) {
//		gameLocal.Warning( "Model '%s' has different # of joints than anim '%s'", model.Name(), anim.Name() );
//		for( i = 0; i < numJoints; i++ ) {
//			joints[i].SetRotation( mat3_identity );
//			joints[i].SetTranslation( offset );
//		}
//		return;
//	}
//
//	// create index for all joints
//	index = ( int * )_alloca16( numJoints * sizeof( int ) );
//	for ( i = 0; i < numJoints; i++ ) {
//		index[i] = i;
//	}
//
//	// create the frame
//	anim.ConvertTimeToFrame( time, 1, frame );
//	idJointQuat *jointFrame = ( idJointQuat * )_alloca16( numJoints * sizeof( *jointFrame ) );
//	anim.GetInterpolatedFrame( frame, jointFrame, index, numJoints );
//
//	// convert joint quaternions to joint matrices
//	SIMDProcessor.ConvertJointQuatsToJointMats( joints, jointFrame, numJoints );
//
//	// first joint is always root of entire hierarchy
//	if ( remove_origin_offset ) {
//		joints[0].SetTranslation( offset );
//	} else {
//		joints[0].SetTranslation( joints[0].ToVec3() + offset );
//	}
//
//	// transform the children
//	md5joints = model.GetJoints();
//	for( i = 1; i < numJoints; i++ ) {
//		joints[i] *= joints[ md5joints[i].parent - md5joints ];
//	}
//}
//
///*
//=====================
//idGameEdit::ANIM_CreateMeshForAnim
//=====================
//*/
//idRenderModel *idGameEdit::ANIM_CreateMeshForAnim( idRenderModel *model, const char *classname, const char *animname, int frame, bool remove_origin_offset ) {
//	renderEntity_t			ent;
//	const idDict			*args;
//	const char				*temp;
//	idRenderModel			*newmodel;
//	const idMD5Anim 		*md5anim;
//	idStr					filename;
//	idStr					extension;
//	const idAnim			*anim;
//	int						animNum;
//	idVec3					offset;
//	const idDeclModelDef	*modelDef;
//
//	if ( !model || model.IsDefaultModel() ) {
//		return NULL;
//	}
//
//	args = gameLocal.FindEntityDefDict( classname, false );
//	if ( !args ) {
//		return NULL;
//	}
//
//	memset( &ent, 0, sizeof( ent ) );
//
//	ent.bounds.Clear();
//	ent.suppressSurfaceInViewID = 0;
//
//	modelDef = ANIM_GetModelDefFromEntityDef( args );
//	if ( modelDef ) {
//		animNum = modelDef.GetAnim( animname );
//		if ( !animNum ) {
//			return NULL;
//		}
//		anim = modelDef.GetAnim( animNum );
//		if ( !anim ) {
//			return NULL;
//		}
//		md5anim = anim.MD5Anim( 0 );
//		ent.customSkin = modelDef.GetDefaultSkin();
//		offset = modelDef.GetVisualOffset();
//	} else {
//		filename = animname;
//		filename.ExtractFileExtension( extension );
//		if ( !extension.Length() ) {
//			animname = args.GetString( va( "anim %s", animname ) );
//		}
//
//		md5anim = animationLib.GetAnim( animname );
//		offset.Zero();
//	}
//
//	if ( !md5anim ) {
//		return NULL;
//	}
//
//	temp = args.GetString( "skin", "" );
//	if ( temp[ 0 ] ) {
//		ent.customSkin = declManager.FindSkin( temp );
//	}
//
//	ent.numJoints = model.NumJoints();
//	ent.joints = ( idJointMat * )Mem_Alloc16( ent.numJoints * sizeof( *ent.joints ) );
//
//	ANIM_CreateAnimFrame( model, md5anim, ent.numJoints, ent.joints, FRAME2MS( frame ), offset, remove_origin_offset );
//
//	newmodel = model.InstantiateDynamicModel( &ent, NULL, NULL );
//
//	Mem_Free16( ent.joints );
//	ent.joints = NULL;
//
//	return newmodel;
//}
