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
////#ifndef __GAME_TARGET_H__
////#define __GAME_TARGET_H__
////

/*
===============================================================================

idTarget

===============================================================================
*/

class idTarget extends idEntity {
////public:
	//CLASS_PROTOTYPE( idTarget );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idTarget>[];
};


/*
===============================================================================

idTarget_Remove

===============================================================================
*/

class idTarget_Remove extends idTarget {
//public:
	//CLASS_PROTOTYPE( idTarget_Remove );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idTarget_Remove>[];

//private:
	Event_Activate( activator:idEntity ):void { throw "placeholder"; }
};


/*
===============================================================================

idTarget_Show

===============================================================================
*/

class idTarget_Show extends idTarget {
//public:
	//CLASS_PROTOTYPE( idTarget_Show );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idTarget_Show>[];

//private:
	Event_Activate( activator:idEntity ):void { throw "placeholder"; }
};


/*
===============================================================================

idTarget_Damage

===============================================================================
*/

class idTarget_Damage extends idTarget {
//public:
	//CLASS_PROTOTYPE( idTarget_Damage );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idTarget_Damage>[];

//private:
	Event_Activate( activator:idEntity ):void { throw "placeholder"; }
};


/*
===============================================================================

idTarget_SessionCommand

===============================================================================
*/

class idTarget_SessionCommand extends idTarget {
//public:
	//CLASS_PROTOTYPE( idTarget_SessionCommand );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idTarget_SessionCommand>[];

//private:
	Event_Activate( activator:idEntity ):void { throw "placeholder"; }
};


/*
===============================================================================

idTarget_EndLevel

===============================================================================
*/

class idTarget_EndLevel extends idTarget {
//public:
	//CLASS_PROTOTYPE( idTarget_EndLevel );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idTarget_EndLevel>[];

//private:
	Event_Activate( activator:idEntity ):void { throw "placeholder"; }

};


/*
===============================================================================

idTarget_WaitForButton

===============================================================================
*/

class idTarget_WaitForButton extends idTarget {
//public:
	//CLASS_PROTOTYPE( idTarget_WaitForButton );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idTarget_WaitForButton>[];

	Think( ):void { throw "placeholder"; }

//private:
	Event_Activate( activator:idEntity ):void { throw "placeholder"; }
};

/*
===============================================================================

idTarget_SetGlobalShaderTime

===============================================================================
*/

class idTarget_SetGlobalShaderTime extends idTarget {
//public:
	//CLASS_PROTOTYPE( idTarget_SetGlobalShaderTime );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idTarget_SetGlobalShaderTime>[];

//private:
	Event_Activate( activator:idEntity ):void { throw "placeholder"; }
};


/*
===============================================================================

idTarget_SetShaderParm

===============================================================================
*/

class idTarget_SetShaderParm extends idTarget {
//public:
	//CLASS_PROTOTYPE( idTarget_SetShaderParm );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idTarget_SetShaderParm>[];

//private:
	Event_Activate( activator:idEntity ):void { throw "placeholder"; }
};


/*
===============================================================================

idTarget_SetShaderTime

===============================================================================
*/

class idTarget_SetShaderTime extends idTarget {
//public:
	//CLASS_PROTOTYPE( idTarget_SetShaderTime );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idTarget_SetShaderTime>[];

//private:
	Event_Activate( activator:idEntity ):void { throw "placeholder"; }
};

/*
===============================================================================

idTarget_FadeEntity

===============================================================================
*/

class idTarget_FadeEntity extends idTarget {
//public:
	//CLASS_PROTOTYPE( idTarget_FadeEntity );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idTarget_FadeEntity>[];

	//idTarget_FadeEntity( void );

	//Save(savefile:idSaveGame):void{throw "placeholder";}
	//Restore(savefile:idRestoreGame):void{throw "placeholder";}

	Think():void{throw "placeholder";}

//private:
	fadeFrom = new idVec4();
	fadeStart: number;	   //int					
	fadeEnd: number;	   //int					

	Event_Activate( activator:idEntity ):void { throw "placeholder"; }
};

/*
===============================================================================

idTarget_LightFadeIn

===============================================================================
*/

class idTarget_LightFadeIn extends idTarget {
//public:
	//CLASS_PROTOTYPE( idTarget_LightFadeIn );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idTarget_LightFadeIn>[];	

//private:
	Event_Activate( activator:idEntity ):void { throw "placeholder"; }
};

/*
===============================================================================

idTarget_LightFadeOut

===============================================================================
*/

class idTarget_LightFadeOut extends idTarget {
//public:
	//CLASS_PROTOTYPE( idTarget_LightFadeOut );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idTarget_LightFadeOut>[];

//private:
	Event_Activate( activator:idEntity ):void { throw "placeholder"; }
};

/*
===============================================================================

idTarget_Give

===============================================================================
*/

class idTarget_Give extends idTarget {
//public:
	//CLASS_PROTOTYPE( idTarget_Give );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idTarget_Give>[];

	Spawn():void{throw "placeholder";}

//private:
	Event_Activate( activator:idEntity ):void { throw "placeholder"; }
};


/*
===============================================================================

idTarget_GiveEmail

===============================================================================
*/

class idTarget_GiveEmail extends idTarget {
//public:
	//CLASS_PROTOTYPE( idTarget_GiveEmail );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idTarget_GiveEmail>[];

	Spawn():void{throw "placeholder";}

//private:
	Event_Activate( activator:idEntity ):void { throw "placeholder"; }
};

/*
===============================================================================

idTarget_SetModel

===============================================================================
*/

class idTarget_SetModel extends idTarget {
//public:
	//CLASS_PROTOTYPE( idTarget_SetModel );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idTarget_SetModel>[];

	Spawn():void{throw "placeholder";}

//private:
	Event_Activate( activator:idEntity ):void { throw "placeholder"; }
};


/*
===============================================================================

idTarget_SetInfluence

===============================================================================
*/

class idTarget_SetInfluence extends idTarget {
//public:
	//CLASS_PROTOTYPE( idTarget_SetInfluence );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idTarget_SetInfluence>[];

						//idTarget_SetInfluence( void );

	Save(savefile:idSaveGame):void{throw "placeholder";}
	//Restore(savefile:idRestoreGame):void{throw "placeholder";}

	Spawn():void{throw "placeholder";}

//private:
	Event_Activate( activator:idEntity ):void { throw "placeholder"; }
	Event_RestoreInfluence():void { throw "placeholder"; }
	Event_GatherEntities():void { throw "placeholder"; }
	Event_Flash( /*float*/ flash:number, /*int*/ outflash:number) :void { throw "placeholder"; }
	Event_ClearFlash( /*float*/ flash:number):void { throw "placeholder"; }
	Think():void{throw "placeholder";}

	//idList<int>			lightList;
	//idList<int>			guiList;
	//idList<int>			soundList;
	//idList<int>			genericList;
	//float				flashIn;
	//float				flashOut;
	//float				delay;
	//idStr				flashInSound;
	//idStr				flashOutSound;
	//idEntity *			switchToCamera;
	//idInterpolate<float>fovSetting;
	//bool				soundFaded;
	//bool				restoreOnTrigger;
};


/*
===============================================================================

idTarget_SetKeyVal

===============================================================================
*/

class idTarget_SetKeyVal extends idTarget {
//public:
	//CLASS_PROTOTYPE( idTarget_SetKeyVal );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idTarget_SetKeyVal>[];

//private:
	Event_Activate( activator:idEntity ):void { throw "placeholder"; }
};


/*
===============================================================================

idTarget_SetFov

===============================================================================
*/

class idTarget_SetFov extends idTarget {
//public:
	//CLASS_PROTOTYPE( idTarget_SetFov );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idTarget_SetFov>[];

	Save(savefile: idSaveGame): void { throw "placeholder"; }
	Restore(savefile: idRestoreGame): void { throw "placeholder"; }

	Think(  ): void { throw "placeholder"; }

//private:
	//idInterpolate<int>	fovSetting;

	Event_Activate( activator:idEntity ): void { throw "placeholder"; }
};


/*
===============================================================================

idTarget_SetPrimaryObjective

===============================================================================
*/

class idTarget_SetPrimaryObjective extends idTarget {
//public:
	//CLASS_PROTOTYPE( idTarget_SetPrimaryObjective );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idTarget_SetPrimaryObjective>[];

//private:
	Event_Activate( activator:idEntity ):void { throw "placeholder"; }
};

/*
===============================================================================

idTarget_LockDoor

===============================================================================
*/

class idTarget_LockDoor extends idTarget {
//public:
	//CLASS_PROTOTYPE( idTarget_LockDoor );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idTarget_LockDoor>[];

//private:
	Event_Activate( activator:idEntity ):void { throw "placeholder"; }
};

/*
===============================================================================

idTarget_CallObjectFunction

===============================================================================
*/

class idTarget_CallObjectFunction extends idTarget {
//public:
	//CLASS_PROTOTYPE( idTarget_CallObjectFunction );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idTarget_CallObjectFunction>[];

//private:
	Event_Activate( activator:idEntity ):void { throw "placeholder"; }
};


/*
===============================================================================

idTarget_LockDoor

===============================================================================
*/

class idTarget_EnableLevelWeapons extends idTarget {
//public:
	//CLASS_PROTOTYPE( idTarget_EnableLevelWeapons );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idTarget_EnableLevelWeapons>[];

//private:
	Event_Activate( activator:idEntity ):void { throw "placeholder"; }
};


/*
===============================================================================

idTarget_Tip

===============================================================================
*/

class idTarget_Tip extends idTarget {
//public:
	//CLASS_PROTOTYPE( idTarget_Tip );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idTarget_Tip>[];

	//					idTarget_Tip( void );

	Spawn():void{throw "placeholder";}

	Save(savefile:idSaveGame):void{throw "placeholder";}
	Restore(savefile:idRestoreGame):void{throw "placeholder";}

//private:
	playerPos = new idVec3();

	Event_Activate( activator:idEntity ): void { throw "placeholder"; }
	Event_TipOff( ): void { throw "placeholder"; }
	Event_GetPlayerPos( ): void { throw "placeholder"; }
};

/*
===============================================================================

idTarget_GiveSecurity

===============================================================================
*/
class idTarget_GiveSecurity extends idTarget {
//public:
	//CLASS_PROTOTYPE( idTarget_GiveSecurity );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idTarget_GiveSecurity>[];
//private:
	Event_Activate( activator:idEntity ): void { throw "placeholder"; }
};


/*
===============================================================================

idTarget_RemoveWeapons

===============================================================================
*/
class idTarget_RemoveWeapons extends idTarget {
//public:
	//CLASS_PROTOTYPE( idTarget_RemoveWeapons );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idTarget_RemoveWeapons>[];
//private:
	Event_Activate( activator:idEntity ): void { throw "placeholder"; }
};


/*
===============================================================================

idTarget_LevelTrigger

===============================================================================
*/
class idTarget_LevelTrigger extends idTarget {
//public:
	//CLASS_PROTOTYPE( idTarget_LevelTrigger );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idTarget_LevelTrigger>[];
//private:
	Event_Activate( activator:idEntity ): void { throw "placeholder"; }
};

/*
===============================================================================

idTarget_EnableStamina

===============================================================================
*/
class idTarget_EnableStamina extends idTarget {
//public:
	//CLASS_PROTOTYPE( idTarget_EnableStamina );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idTarget_EnableStamina>[];
//private:
	Event_Activate( activator:idEntity ): void { throw "placeholder"; }
};

/*
===============================================================================

idTarget_FadeSoundClass

===============================================================================
*/
class idTarget_FadeSoundClass extends idTarget {
//public:
	//CLASS_PROTOTYPE( idTarget_FadeSoundClass );
	static Type: idTypeInfo;
	static CreateInstance ( ): idClass { throw "placeholder"; }
	GetType ( ): idTypeInfo { throw "placeholder"; }
	static eventCallbacks: idEventFunc<idTarget_FadeSoundClass>[];	
//private:
	Event_Activate( activator:idEntity ): void { throw "placeholder"; }
	Event_RestoreVolume(): void { throw "placeholder"; }
};

////
////#endif /* !__GAME_TARGET_H__ */
