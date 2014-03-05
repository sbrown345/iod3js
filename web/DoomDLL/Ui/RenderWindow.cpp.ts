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
////#include "../idlib/precompiled.h"
////#pragma hdrstop
////
////#include "DeviceContext.h"
////#include "Window.h"
////#include "UserInterfaceLocal.h"
////#include "RenderWindow.h"
////
class idRenderWindow extends idWindow {
////public:
////	idRenderWindow(idUserInterfaceLocal *gui);
////	idRenderWindow(idDeviceContext *d, idUserInterfaceLocal *gui);
////	virtual ~idRenderWindow();
////
////	virtual void PostParse();
////	virtual void Draw(int time, float x, float y);
////	virtual size_t Allocated(){ return idWindow::Allocated(); };
////	// 
////	//  
////	virtual idWinVar *GetWinVarByName(_name:string, bool winLookup = false, drawWin_t** owner = NULL);
////	// 
////
////private:
////	void CommonInit();
////	virtual bool ParseInternalVar(const char *name, idParser *src);
////	void Render(int time);
////	void PreRender();
////	void BuildAnimation(int time);
////	refdef = new renderView_t;
	world:idRenderWorld;
	worldEntity = new renderEntity_t;
	rLight = new renderLight_t;
	modelAnim:idMD5Anim;
	
	worldModelDef:number /*qhandle_t int*/;
	lightDef: number /*qhandle_t int*/;
	modelDef: number /*qhandle_t int*/;
	modelName = new idWinStr;
	animName = new idWinStr;
	animClass = new idStr;
	lightOrigin = new idWinVec4;
	lightColor = new idWinVec4;
	modelOrigin = new idWinVec4;
	modelRotate = new idWinVec4;
	viewOffset = new idWinVec4;
	needsRender = new idWinBool;
	animLength:number /*int*/;
	animEndTime:number /*int*/;
	updateAnimation: boolean;

	constructor(d: idDeviceContext, g: idUserInterfaceLocal)
	constructor(g: idUserInterfaceLocal)
	constructor(a1: any, a2?: any) {
		super();

		if (arguments.length == 2) {
			var d = <idDeviceContext>a1, g = <idUserInterfaceLocal>a2;
			this.ctor2(d, g);
			this.dc = d;
			this.gui = g;
			this.CommonInit();
		} else if (arguments.length == 1) {
			var g = <idUserInterfaceLocal>a1;
			this.ctor1(g);
			this.dc = null;
			this.gui = g;
			this.CommonInit();
		} else {
			todoThrow();
		}
	}

	destructor ( ):void {
		todoThrow( "renderSystem.FreeRenderWorld( this.world );" );
	}

	CommonInit ( ): void {
		this.world = renderSystem.AllocRenderWorld ( );
		this.needsRender.equalsBool( true );
		this.lightOrigin.equalsVec4( new idVec4( -128.0, 0.0, 0.0, 1.0 ) );
		this.lightColor.equalsVec4( new idVec4( 1.0, 1.0, 1.0, 1.0 ) );
		this.modelOrigin.Zero ( );
		this.viewOffset.equalsVec4( new idVec4( -128.0, 0.0, 0.0, 1.0 ) );
		this.modelAnim = NULL;
		this.animLength = 0;
		this.animEndTime = -1;
		this.modelDef = -1;
		this.updateAnimation = true;
	}

////
////void idRenderWindow::BuildAnimation(int time) {
////	
////	if (!updateAnimation) {
////		return;
////	}
////
////	if (animName.Length() && animClass.Length()) {
////		worldEntity.numJoints = worldEntity.hModel.NumJoints();
////		worldEntity.joints = ( idJointMat * )Mem_Alloc16( worldEntity.numJoints * sizeof( *worldEntity.joints ) );
////		modelAnim = gameEdit.ANIM_GetAnimFromEntityDef(animClass, animName);
////		if (modelAnim) {
////			animLength = gameEdit.ANIM_GetLength(modelAnim);
////			animEndTime = time + animLength;
////		}
////	}
////	updateAnimation = false;
////
////}
////
////void idRenderWindow::PreRender() {
////	if (needsRender) {
////		world.InitFromMap( NULL );
////		idDict spawnArgs;
////		spawnArgs.Set("classname", "light");
////		spawnArgs.Set("name", "light_1");
////		spawnArgs.Set("origin", lightOrigin.ToVec3().ToString());
////		spawnArgs.Set("_color", lightColor.ToVec3().ToString());
////		gameEdit.ParseSpawnArgsToRenderLight( &spawnArgs, &rLight );
////		lightDef = world.AddLightDef( &rLight );
////		if ( !modelName[0] ) {
////			common.Warning( "Window '%s' in gui '%s': no model set", GetName(), GetGui().GetSourceFile() );
////		}
////		memset( &worldEntity, 0, sizeof( worldEntity ) );
////		spawnArgs.Clear();
////		spawnArgs.Set("classname", "func_static");
////		spawnArgs.Set("model", modelName);
////		spawnArgs.Set("origin", modelOrigin.c_str());
////		gameEdit.ParseSpawnArgsToRenderEntity( &spawnArgs, &worldEntity );
////		if ( worldEntity.hModel ) {
////			idVec3 v = modelRotate.ToVec3();
////			worldEntity.axis = v.ToMat3();
////			worldEntity.shaderParms[0] = 1;
////			worldEntity.shaderParms[1] = 1;
////			worldEntity.shaderParms[2] = 1;
////			worldEntity.shaderParms[3] = 1;
////			modelDef = world.AddEntityDef( &worldEntity );
////		}
////		needsRender = false;
////	}
////}
////
////void idRenderWindow::Render( int time ) {
////	rLight.origin = lightOrigin.ToVec3();
////	rLight.shaderParms[SHADERPARM_RED] = lightColor.x();
////	rLight.shaderParms[SHADERPARM_GREEN] = lightColor.y();
////	rLight.shaderParms[SHADERPARM_BLUE] = lightColor.z();
////	world.UpdateLightDef(lightDef, &rLight);
////	if ( worldEntity.hModel ) {
////		if (updateAnimation) {
////			BuildAnimation(time);
////		}
////		if (modelAnim) {
////			if (time > animEndTime) {
////				animEndTime = time + animLength;
////			}
////			gameEdit.ANIM_CreateAnimFrame(worldEntity.hModel, modelAnim, worldEntity.numJoints, worldEntity.joints, animLength - (animEndTime - time), vec3_origin, false );
////		}
////		worldEntity.axis = idAngles(modelRotate.x(), modelRotate.y(), modelRotate.z()).ToMat3();
////		world.UpdateEntityDef(modelDef, &worldEntity);
////	}
////}
////
////
////
////
////void idRenderWindow::Draw(int time, float x, float y) {
////	PreRender();
////	Render(time);
////
////	memset( &refdef, 0, sizeof( refdef ) );
////	refdef.vieworg = viewOffset.ToVec3();;
////	//refdef.vieworg.Set(-128, 0, 0);
////
////	refdef.viewaxis.Identity();
////	refdef.shaderParms[0] = 1;
////	refdef.shaderParms[1] = 1;
////	refdef.shaderParms[2] = 1;
////	refdef.shaderParms[3] = 1;
////
////	refdef.x = drawRect.x;
////	refdef.y = drawRect.y;
////	refdef.width = drawRect.w;
////	refdef.height = drawRect.h;
////	refdef.fov_x = 90;
////	refdef.fov_y = 2 * atan((float)drawRect.h / drawRect.w) * idMath::M_RAD2DEG;
////
////	refdef.time = time;
////	world.RenderScene(&refdef);
////}
////
////void idRenderWindow::PostParse() {
////	idWindow::PostParse();
////}
////
////// 
//////  
	//GetWinVarByName ( _name: string, fixup: boolean = false, /*drawWin_t** */owner: R<drawWin_t> = null): idWinVar {
////idWinVar *idRenderWindow::GetWinVarByName(_name:string, fixup:boolean, drawWin_t** owner ) {
////// 
////	if (idStr::Icmp(_name, "model") == 0) {
////		return &modelName;
////	}
////	if (idStr::Icmp(_name, "anim") == 0) {
////		return &animName;
////	}
////	if (idStr::Icmp(_name, "lightOrigin") == 0) {
////		return &lightOrigin;
////	}
////	if (idStr::Icmp(_name, "lightColor") == 0) {
////		return &lightColor;
////	}
////	if (idStr::Icmp(_name, "modelOrigin") == 0) {
////		return &modelOrigin;
////	}
////	if (idStr::Icmp(_name, "modelRotate") == 0) {
////		return &modelRotate;
////	}
////	if (idStr::Icmp(_name, "viewOffset") == 0) {
////		return &viewOffset;
////	}
////	if (idStr::Icmp(_name, "needsRender") == 0) {
////		return &needsRender;
////	}
////
////// 
//////  
////	return idWindow::GetWinVarByName(_name, fixup, owner);
////// 
////}
////
////bool idRenderWindow::ParseInternalVar(_name:string, idParser *src) {
////	if (idStr::Icmp(_name, "animClass") == 0) {
////		ParseString(src, animClass);
////		return true;
////	}
////	return idWindow::ParseInternalVar(_name, src);
////}
}