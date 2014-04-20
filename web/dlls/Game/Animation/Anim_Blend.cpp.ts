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
var channelNames /*[ ANIM_NumAnimChannels ]*/ = [
	"all", "torso", "legs", "head", "eyelids"
];
assert( channelNames.length == ANIM_NumAnimChannels );
//
///***********************************************************************
//
//	idAnim
//
//***********************************************************************/
///***********************************************************************
//
//	idAnimBlend
//
//***********************************************************************/
//

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
	//Parse(text: string, textLength: number): boolean { todoThrow();return false ;}
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
	joints = new idList<jointInfo_t>(jointInfo_t);
	jointParents = new idList</*int*/number>(Number);
	channelJoints = new Array<idList<number/*int*/>>(ANIM_NumAnimChannels);
	modelHandle:idRenderModel;
	anims = new idList<idAnim >(idAnim ,true);
	skin:idDeclSkin;
/*
=====================
idDeclModelDef::idDeclModelDef
=====================
*/
	constructor ( ) {
		super ( );
		this.modelHandle = null;
		this.skin = null;
		this.offset.Zero ( );
		for ( var i = 0; i < ANIM_NumAnimChannels; i++ ) {
			this.channelJoints[i] = new idList<number>( Number );
			this.channelJoints[i].Clear ( );
		}
	}

/*
=====================
idDeclModelDef::~idDeclModelDef
=====================
*/
desstructor():void {
	this.FreeData();
}
//
///*
//=================
//idDeclModelDef::Size
//=================
//*/
//size_t idDeclModelDef::Size( ) const {
//	return sizeof( idDeclModelDef );
//}

/*
=====================
idDeclModelDef::CopyDecl
=====================
*/
	CopyDecl ( decl: idDeclModelDef ): void {
		var /*int*/i: number;

		this.FreeData ( );

		this.offset = decl.offset;
		this.modelHandle = decl.modelHandle;
		this.skin = decl.skin;

		this.anims.SetNum( decl.anims.Num ( ) );
		for ( i = 0; i < this.anims.Num ( ); i++ ) {
			this.anims[i] = new idAnim( this, decl.anims[i] );
		}
		this.joints.SetNum( decl.joints.Num ( ) );
		memcpyStructs( this.joints.Ptr ( ), decl.joints.Ptr ( ), decl.joints.Num ( ) );

		this.jointParents.SetNum( decl.jointParents.Num ( ) );
		for ( var j = 0; j < decl.jointParents.Num ( ); j++ ) {
			this.jointParents[j] = decl.jointParents[j];
		}
		for ( i = 0; i < ANIM_NumAnimChannels; i++ ) {
			this.channelJoints[i] = decl.channelJoints[i];
		}
	}

/*
=====================
idDeclModelDef::FreeData
=====================
*/
	FreeData ( ): void {
		this.anims.DeleteContents( true );
		this.joints.Clear ( );
		this.jointParents.Clear ( );
		this.modelHandle = null;
		this.skin = null;
		this.offset.Zero ( );
		for ( var i = 0; i < ANIM_NumAnimChannels; i++ ) {
			this.channelJoints[i].Clear ( );
		}
	}

/*
================
idDeclModelDef::DefaultDefinition
================
*/
	DefaultDefinition ( ): string {
		return "{ }";
	}

/*
====================
idDeclModelDef::FindJoint
====================
*/
	FindJoint ( name: string ): jointInfo_t {
		var i: number /*int*/;
		var joints: idMD5Joint[], joint: idMD5Joint;

		if ( !this.modelHandle ) {
			return null;
		}

		joints = this.modelHandle.GetJoints ( );
		for ( i = 0; i < this.joints.Num ( ); i++, joint = joints[i] ) {
			if ( !joint.name.Icmp( name ) ) {
				return this.joints[i];
			}
		}

		return null;
	}

/*
=====================
idDeclModelDef::ModelHandle
=====================
*/
	ModelHandle ( ): idRenderModel {
		return <idRenderModel >this.modelHandle;
	}

/*
=====================
idDeclModelDef::GetJointList
=====================
*/
	GetJointList ( jointnames: string, jointList: idList<jointHandle_t> ): void {
		var pos: number;
		var jointname = new idStr;
		var joint: jointInfo_t;
		var child: jointInfo_t;
		var i: number /*int*/;
		var num: number /*int*/;
		var getChildren: boolean;
		var subtract: boolean;

		if ( !this.modelHandle ) {
			return;
		}

		jointList.Clear ( );

		num = this.modelHandle.NumJoints ( );

		// scan through list of joints and add each to the joint list
		pos = 0; //jointnames;
		while ( jointnames[pos] ) {
			// skip over whitespace
			while ( ( jointnames[pos] /*!= 0*/ ) && isspace( jointnames[pos] ) ) {
				pos++;
			}

			if ( !jointnames[pos] ) {
				// no more names
				break;
			}

			// copy joint name
			jointname.opEquals( "" );

			if ( jointnames[pos] == '-' ) {
				subtract = true;
				pos++;
			} else {
				subtract = false;
			}

			if ( jointnames[pos] == '*' ) {
				getChildren = true;
				pos++;
			} else {
				getChildren = false;
			}

			while ( ( jointnames[pos] /*!= 0*/ ) && !isspace( jointnames[pos] ) ) {
				jointname.Append( jointnames[pos] );
				pos++;
			}

			joint = this.FindJoint( jointname.data );
			if ( !joint ) {
				gameLocal.Warning( "Unknown joint '%s' in '%s' for model '%s'", jointname.c_str ( ), jointnames, this.GetName ( ) );
				continue;
			}

			if ( !subtract ) {
				jointList.AddUnique( joint.num );
			} else {
				jointList.Remove( joint.num );
			}

			if ( getChildren ) {
				todoThrow ( );
				//	// include all joint's children
				//	child = joint + 1;
				//	for( i = joint.num + 1; i < num; i++, child++ ) {
				//		// all children of the joint should follow it in the list.
				//		// once we reach a joint without a parent or with a parent
				//		// who is earlier in the list than the specified joint, then
				//		// we've gone through all it's children.
				//		if ( child.parentNum < joint.num ) {
				//			break;
				//		}

				//		if ( !subtract ) {
				//			jointList.AddUnique( child.num );
				//		} else {
				//			jointList.Remove( child.num );
				//		}
				//	}
			}
		}
	}

/*
=====================
idDeclModelDef::Touch
=====================
*/
	Touch ( ): void {
		if ( this.modelHandle ) {
			renderModelManager.FindModel( this.modelHandle.Name ( ) );
		}
	}

/*
=====================
idDeclModelDef::GetDefaultSkin
=====================
*/
	GetDefaultSkin ( ): idDeclSkin {
		return this.skin;
	}

/*
=====================
idDeclModelDef::GetDefaultPose
=====================
*/
	GetDefaultPose ( ): idJointQuat[] {
		return <idJointQuat[]><any>this.modelHandle.GetDefaultPose ( );
	}

/*
=====================
idDeclModelDef::SetupJoints
=====================
*/
	SetupJoints ( /*int **/numJoints: R<number>, /*idJointMat ***/jointList: R<idJointMat[]>, frameBounds: idBounds, removeOriginOffset: boolean ): void {
		var /*int					*/num: number;
		var pose: idJointQuat[];
		var list: idJointMat [];

		if ( !this.modelHandle || this.modelHandle.IsDefaultModel ( ) ) {
			//Mem_Free16( (*jointList) );
			jointList.$ = null;
			frameBounds.Clear ( );
			return;
		}

		// get the number of joints
		num = this.modelHandle.NumJoints ( );

		if ( !num ) {
			gameLocal.Error( "model '%s' has no joints", this.modelHandle.Name ( ) );
		}

		// set up initial pose for model (with no pose, model is just a jumbled mess)
		list = new Array<idJointMat>( num ); // (idJointMat *) Mem_Alloc16( num * sizeof( list[0] ) );
		pose = <idJointQuat[]><any>this.GetDefaultPose ( );

		// convert the joint quaternions to joint matrices
		SIMDProcessor.ConvertJointQuatsToJointMats( list, pose, this.joints.Num ( ) );

		// check if we offset the model by the origin joint
		if ( removeOriginOffset ) {
//#ifdef VELOCITY_MOVE
//		list[ 0 ].SetTranslation( idVec3( this.offset.x, this.offset.y + pose[0].t.y, this.offset.z + pose[0].t.z ) );
//#else
			list[0].SetTranslation( this.offset );
//#endif
		} else {
			list[0].SetTranslation( pose[0].t.opAddition( this.offset ) );
		}

		// transform the joint hierarchy
		SIMDProcessor.TransformJoints( list, <number[]><any>this.jointParents.Ptr ( ), 1, this.joints.Num ( ) - 1 );

		numJoints.$ = num;
		jointList.$ = list;

		// get the bounds of the default pose
		frameBounds.opEquals( this.modelHandle.Bounds( null ) );
	}

/*
=====================
idDeclModelDef::ParseAnim
=====================
*/
	ParseAnim ( src: idLexer, /*int */numDefaultAnims: number ): boolean {
		var i: number /*int*/;
		var len: number /*int*/;
		var anim: idAnim;
		var md5anims = new Array<idMD5Anim>( ANIM_MaxSyncedAnims );
		var md5anim: idMD5Anim;
		var alias = new idStr;
		var realname = new idToken;
		var token = new idToken;
		var numAnims: number /*int*/;
		var flags: animFlags_t;

		numAnims = 0;
		//memset( md5anims, 0, sizeof( md5anims ) );

		if ( !src.ReadToken( realname ) ) {
			src.Warning( "Unexpected end of file" );
			this.MakeDefault ( );
			return false;
		}
		alias = realname;

		for ( i = 0; i < this.anims.Num ( ); i++ ) {
			if ( !strcmp( this.anims[i].FullName ( ), realname.data ) ) {
				break;
			}
		}

		if ( ( i < this.anims.Num ( ) ) && ( i >= numDefaultAnims ) ) {
			src.Warning( "Duplicate anim '%s'", realname.c_str ( ) );
			this.MakeDefault ( );
			return false;
		}

		if ( i < numDefaultAnims ) {
			anim = this.anims[i];
		} else {
			// create the alias associated with this animation
			anim = new idAnim ( );
			this.anims.Append( anim );
		}

		// random anims end with a number.  find the numeric suffix of the animation.
		len = alias.Length ( );
		for ( i = len - 1; i > 0; i-- ) {
			if ( !isdigit( alias[i] ) ) {
				break;
			}
		}

		// check for zero length name, or a purely numeric name
		if ( i <= 0 ) {
			src.Warning( "Invalid animation name '%s'", alias.c_str ( ) );
			this.MakeDefault ( );
			return false;
		}

		// remove the numeric suffix
		alias.CapLength( i + 1 );

		// parse the anims from the string
		do {
			if ( !src.ReadToken( token ) ) {
				src.Warning( "Unexpected end of file" );
				this.MakeDefault ( );
				return false;
			}

			// lookup the animation
			md5anim = animationLib.GetAnim( token .data);
			if ( !md5anim ) {
				src.Warning( "Couldn't load anim '%s'", token.c_str ( ) );
				this.MakeDefault ( );
				return false;
			}

			md5anim.CheckModelHierarchy( this.modelHandle );

			if ( numAnims > 0 ) {
				// make sure it's the same length as the other anims
				if ( md5anim.Length ( ) != md5anims[0].Length ( ) ) {
					src.Warning( "Anim '%s' does not match length of anim '%s'", md5anim.Name ( ), md5anims[0].Name ( ) );
					this.MakeDefault ( );
					return false;
				}
			}

			if ( numAnims >= ANIM_MaxSyncedAnims ) {
				src.Warning( "Exceeded max synced anims (%d)", ANIM_MaxSyncedAnims );
				this.MakeDefault ( );
				return false;
			}

			// add it to our list
			md5anims[numAnims] = md5anim;
			numAnims++;
		} while ( src.CheckTokenString( "," ) );

		if ( !numAnims ) {
			src.Warning( "No animation specified" );
			this.MakeDefault ( );
			return false;
		}

		anim.SetAnim(this, realname.data, alias.data, numAnims, md5anims );
		flags.memset0 ( ); //memset( &flags, 0, sizeof( flags ) );

		// parse any frame commands or animflags
		if ( src.CheckTokenString( "{" ) ) {
			while ( true ) {
				if ( !src.ReadToken( token ) ) {
					src.Warning( "Unexpected end of file" );
					this.MakeDefault ( );
					return false;
				}
				if ( token.data == "}" ) {
					break;
				} else if ( token.data == "prevent_idle_override" ) {
					flags.prevent_idle_override = true;
				} else if ( token.data == "random_cycle_start" ) {
					flags.random_cycle_start = true;
				} else if ( token.data == "ai_no_turn" ) {
					flags.ai_no_turn = true;
				} else if ( token.data == "anim_turn" ) {
					flags.anim_turn = true;
				} else if ( token.data == "frame" ) {
					// create a frame command
					var framenum: number /*int*/;
					var err: string;

					// make sure we don't have any line breaks while reading the frame command so the error line # will be correct
					if ( !src.ReadTokenOnLine( token ) ) {
						src.Warning( "Missing frame # after 'frame'" );
						this.MakeDefault ( );
						return false;
					}
					if ( token.type == TT_PUNCTUATION && token.data == "-" ) {
						src.Warning( "Invalid frame # after 'frame'" );
						this.MakeDefault ( );
						return false;
					} else if ( token.type != TT_NUMBER || token.subtype == TT_FLOAT ) {
						src.Error( "expected integer value, found '%s'", token.c_str ( ) );
					}

					// get the frame number
					framenum = token.GetIntValue ( );

					// put the command on the specified frame of the animation
					err = anim.AddFrameCommand( this, framenum, src, null );
					if ( err ) {
						src.Warning( "%s", err );
						this.MakeDefault ( );
						return false;
					}
				} else {
					src.Warning( "Unknown command '%s'", token.c_str ( ) );
					this.MakeDefault ( );
					return false;
				}
			}
		}

		// set the flags
		anim.SetAnimFlags( flags );
		return true;
	}

/*
================
idDeclModelDef::Parse
================
*/
Parse( text:string, /*const int */textLength :number):boolean {
	var i:/*int*/number;
	var	 num:/*int*/ number;
	var	filename = new idStr;
	var	extension = new idStr;
	var md5joint: idMD5Joint;
	var md5joints: idMD5Joint[];
	var src = new idLexer;
	var token = new idToken;
	var token2 = new idToken;
	var jointnames = new idStr;
	var channel:number /*int*/
	var jointnum: jointHandle_t;
	var jointList = new idList<jointHandle_t>(jointHandle_t);
	var numDefaultAnims:/*int*/ number;

	src.LoadMemory( text, textLength, this.GetFileName(), this.GetLineNum() );
	src.SetFlags( DECL_LEXER_FLAGS );
	src.SkipUntilString( "{" );

	numDefaultAnims = 0;
	while( true ) {
		if ( !src.ReadToken( token ) ) {
			break;
		}

		if ( !token.Icmp( "}" ) ) {
			break;
		}

		if ( token.data == "inherit" ) {
			if( !src.ReadToken( token2 ) ) {
				src.Warning( "Unexpected end of file" );
				this.MakeDefault();
				return false;
			}
			
			var copy = static_cast<idDeclModelDef >( declManager.FindType( declType_t.DECL_MODELDEF, token2.data, false ) );
			if ( !copy ) {
				common.Warning( "Unknown model definition '%s'", token2.c_str() );
			} else if ( copy.GetState() == declState_t.DS_DEFAULTED ) {
				common.Warning( "inherited model definition '%s' defaulted", token2.c_str() );
				this.MakeDefault();
				return false;
			} else {
				this.CopyDecl( copy );
				numDefaultAnims = this.anims.Num();
			}
		} else if ( token.data == "skin" ) {
			if( !src.ReadToken( token2 ) ) {
				src.Warning( "Unexpected end of file" );
				this.MakeDefault();
				return false;
			}
			this.skin = declManager.FindSkin( token2.data );
			if ( !this.skin ) {
				src.Warning( "Skin '%s' not found", token2.c_str() );
				this.MakeDefault();
				return false;
			}
		} else if ( token.data == "mesh" ) {
			if( !src.ReadToken( token2 ) ) {
				src.Warning( "Unexpected end of file" );
				this.MakeDefault();
				return false;
			}
			filename = token2;
			filename.ExtractFileExtension( extension );
			if ( extension.data != MD5_MESH_EXT ) {
				src.Warning( "Invalid model for MD5 mesh" );
				this.MakeDefault();
				return false;
			}
			this.modelHandle = renderModelManager.FindModel(filename.data );
			if ( !this.modelHandle ) {
				src.Warning( "Model '%s' not found", filename.c_str() );
				this.MakeDefault();
				return false;
			}

			if ( this.modelHandle.IsDefaultModel() ) {
				src.Warning( "Model '%s' defaulted", filename.c_str() );
				this.MakeDefault();
				return false;
			}

			// get the number of joints
			num = this.modelHandle.NumJoints();
			if ( !num ) {
				src.Warning( "Model '%s' has no joints", filename.c_str() );
			}

			// set up the joint hierarchy
			this.joints.SetGranularity( 1 );
			this.joints.SetNum( num );
			this.jointParents.SetNum( num );
			this.channelJoints[0].SetNum( num );
			md5joints = this.modelHandle.GetJoints();
			md5joint = md5joints[0];
			for (i = 0; i < num; i++, md5joint = md5joints[i] ) {
				this.joints[i].channel = ANIMCHANNEL_ALL;
				this.joints[i].num = static_cast<jointHandle_t>( i );
				if ( md5joint.parent ) {
					this.joints[i].parentNum = static_cast<jointHandle_t>(md5joints.indexOf(md5joint.parent)/* md5joint.parent - md5joints */);
				} else {
					this.joints[i].parentNum = jointHandle_t.INVALID_JOINT;
				}
				this.jointParents[i] = this.joints[i].parentNum;
				this.channelJoints[0][i] = i;
			}
		} else if ( token.data == "remove" ) {
			// removes any anims whos name matches
			if( !src.ReadToken( token2 ) ) {
				src.Warning( "Unexpected end of file" );
				this.MakeDefault();
				return false;
			}
			num = 0;
			for( i = 0; i < this.anims.Num(); i++ ) {
				if ((token2.data == this.anims[i].Name()) || (token2.data== this.anims[ i ].FullName() ) ) {
					delete this.anims[ i ];
					this.anims.RemoveIndex( i );
					if ( i >= numDefaultAnims ) {
						src.Warning( "Anim '%s' was not inherited.  Anim should be removed from the model def.", token2.c_str() );
						this.MakeDefault();
						return false;
					}
					i--;
					numDefaultAnims--;
					num++;
					continue;
				}
			}
			if ( !num ) {
				src.Warning( "Couldn't find anim '%s' to remove", token2.c_str() );
				this.MakeDefault();
				return false;
			}
		} else if ( token.data == "anim" ) {
			if ( !this.modelHandle ) {
				src.Warning( "Must specify mesh before defining anims" );
				this.MakeDefault();
				return false;
			}
			if ( !this.ParseAnim( src, numDefaultAnims ) ) {
				this.MakeDefault();
				return false;
			}
		} else if ( token.data == "offset" ) {
			if ( !src.Parse1DMatrix( 3, this.offset.ToFloatPtr() ) ) {
				src.Warning( "Expected vector following 'offset'" );
				this.MakeDefault();
				return false;
			}
		} else if ( token.data == "channel" ) {
			if ( !this.modelHandle ) {
				src.Warning( "Must specify mesh before defining channels" );
				this.MakeDefault();
				return false;
			}

			// set the channel for a group of joints
			if( !src.ReadToken( token2 ) ) {
				src.Warning( "Unexpected end of file" );
				this.MakeDefault();
				return false;
			}
			if ( !src.CheckTokenString( "(" ) ) {
				src.Warning( "Expected { after '%s'\n", token2.c_str() );
				this.MakeDefault();
				return false;
			}

			for( i = ANIMCHANNEL_ALL + 1; i < ANIM_NumAnimChannels; i++ ) {
				if ( !idStr.Icmp( channelNames[ i ], token2 .data) ) {
					break;
				}
			}

			if ( i >= ANIM_NumAnimChannels ) {
				src.Warning( "Unknown channel '%s'", token2.c_str() );
				this.MakeDefault();
				return false;
			}

			channel = i;
			jointnames.opEquals( "" );

			while( !src.CheckTokenString( ")" ) ) {
				if( !src.ReadToken( token2 ) ) {
					src.Warning( "Unexpected end of file" );
					this.MakeDefault();
					return false;
				}
				jointnames.Append( token2.data );
				if ((token2.data != "*") && (token2.data != "-" ) ) {
					jointnames.Append( " " );
				}
			}

			this.GetJointList(jointnames.data, jointList );

			this.channelJoints[ channel ].SetNum( jointList.Num() );
			for( num = i = 0; i < jointList.Num(); i++ ) {
				jointnum = jointList[ i ];
				if ( this.joints[ jointnum ].channel != ANIMCHANNEL_ALL ) {
					src.Warning( "Joint '%s' assigned to multiple channels", this.modelHandle.GetJointName( jointnum ) );
					continue;
				}
				this.joints[ jointnum ].channel = channel;
				this.channelJoints[ channel ][ num++ ] = jointnum;
			}
			this.channelJoints[ channel ].SetNum( num );
		} else {
			src.Warning( "unknown token '%s'", token.c_str() );
			this.MakeDefault();
			return false;
		}
	}

	// shrink the anim list down to save space
	this.anims.SetGranularity( 1 );
	this.anims.SetNum( this.anims.Num() );

	return true;
}

///*
//=====================
//idDeclModelDef::HasAnim
//=====================
//*/
//bool idDeclModelDef::HasAnim( name:string ) const {
//	int	i;
//
//	// find any animations with same name
//	for( i = 0; i < this.anims.Num(); i++ ) {
//		if ( !strcmp( this.anims[ i ].Name(), name ) ) {
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
//	return this.anims.Num() + 1;
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
//	for( i = 0; i < this.anims.Num(); i++ ) {
//		if ( !strcmp( this.anims[ i ].FullName(), name ) ) {
//			return i + 1;
//		}
//	}
//
//	// didn't find it
//	return 0;
//}
//
/*
=====================
idDeclModelDef::GetAnim
=====================
*/
	GetAnim_index ( /*int*/ index: number ): idAnim {
		if ( ( index < 1 ) || ( index > this.anims.Num ( ) ) ) {
			return null;
		}

		return this.anims[index - 1];
	}

/*
=====================
idDeclModelDef::GetAnim
=====================
*/
	GetAnim(name: string ) :number{
	todoThrow();
		return 99999999999;
		//int				i;
		//int				which;
		//const int		MAX_ANIMS = 64;
		//int				animList[ MAX_ANIMS ];
		//int				numAnims;
		//int				len;

		//len = strlen( name );
		//if ( len && idStr::CharIsNumeric( name[ len - 1 ] ) ) {
		//	// find a specific animation
		//	return GetSpecificAnim( name );
		//}

		//// find all animations with same name
		//numAnims = 0;
		//for( i = 0; i < this.anims.Num(); i++ ) {
		//	if ( !strcmp( this.anims[ i ].Name(), name ) ) {
		//		animList[ numAnims++ ] = i;
		//		if ( numAnims >= MAX_ANIMS ) {
		//			break;
		//		}
		//	}
		//}

		//if ( !numAnims ) {
		//	return 0;
		//}

		//// get a random anim
		////FIXME: don't access gameLocal here?
		//which = gameLocal.random.RandomInt( numAnims );
		//return animList[ which ] + 1;
	}

/*
=====================
idDeclModelDef::GetSkin
=====================
*/
GetSkin(): idDeclSkin{
	return this.skin;
}

/*
=====================
idDeclModelDef::GetModelName
=====================
*/
	GetModelName ( ): string {
		if ( this.modelHandle ) {
			return this.modelHandle.Name ( );
		} else {
			return "";
		}
	}

/*
=====================
idDeclModelDef::Joints
=====================
*/
	Joints ( ): idList<jointInfo_t> {
		return this.joints;
	}

///*
//=====================
//idDeclModelDef::JointParents
//=====================
//*/
//const int * idDeclModelDef::JointParents( ) const {
//	return this.jointParents.Ptr();
//}

/*
=====================
idDeclModelDef::NumJoints
=====================
*/
	NumJoints ( ): number {
		return this.joints.Num ( );
	}

/*
=====================
idDeclModelDef::GetJoint
=====================
*/
	GetJoint ( /*int */jointHandle: number ): jointInfo_t {
		if ( ( jointHandle < 0 ) || ( jointHandle > this.joints.Num ( ) ) ) {
			gameLocal.Error( "idDeclModelDef::GetJoint : joint handle out of range" );
		}
		return this.joints[jointHandle];
	}

/*
====================
idDeclModelDef::GetJointName
====================
*/
	GetJointName ( /*int*/ jointHandle: number ): string {
		var joint: idMD5Joint[];

		if ( !this.modelHandle ) {
			return null;
		}

		if ( ( jointHandle < 0 ) || ( jointHandle > this.joints.Num ( ) ) ) {
			gameLocal.Error( "idDeclModelDef::GetJointName : joint handle out of range" );
		}

		joint = this.modelHandle.GetJoints ( );
		return joint[jointHandle].name.c_str ( );
	}

///*
//=====================
//idDeclModelDef::NumJointsOnChannel
//=====================
//*/
//int idDeclModelDef::NumJointsOnChannel( int channel ) const {
//	if ( ( channel < 0 ) || ( channel >= ANIM_NumAnimChannels ) ) {
//		gameLocal.Error( "idDeclModelDef::NumJointsOnChannel : channel out of range" );
//	}
//	return this.channelJoints[ channel ].Num();
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
//	return this.channelJoints[ channel ].Ptr();
//}
//
/*
=====================
idDeclModelDef::GetVisualOffset
=====================
*/
	GetVisualOffset ( ): idVec3 {
		return this.offset;
	}
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
//	modelDef = static_cast<const idDeclModelDef *>( declManager.FindType( declType_t.DECL_MODELDEF, name, false ) );
//	if ( modelDef && modelDef.ModelHandle() ) {
//		return modelDef;
//	}
//
//	return NULL;
//}
//