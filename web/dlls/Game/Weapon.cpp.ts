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
////#include "Game_local.h"

/***********************************************************************

  idWeapon  
	
***********************************************************************/

//
// event defs
//
var EV_Weapon_Clear = new idEventDef( "<clear>" );
var EV_Weapon_GetOwner = new idEventDef( "getOwner", null, 'e' );
var EV_Weapon_Next = new idEventDef( "nextWeapon" );
var EV_Weapon_State = new idEventDef( "weaponState", "sd" );
var EV_Weapon_UseAmmo = new idEventDef( "useAmmo", "d" );
var EV_Weapon_AddToClip = new idEventDef( "addToClip", "d" );
var EV_Weapon_AmmoInClip = new idEventDef( "ammoInClip", null, 'f' );
var EV_Weapon_AmmoAvailable = new idEventDef( "ammoAvailable", null, 'f' );
var EV_Weapon_TotalAmmoCount = new idEventDef( "totalAmmoCount", null, 'f' );
var EV_Weapon_ClipSize = new idEventDef( "clipSize", null, 'f' );
var EV_Weapon_WeaponOutOfAmmo = new idEventDef( "weaponOutOfAmmo" );
var EV_Weapon_WeaponReady = new idEventDef( "weaponReady" );
var EV_Weapon_WeaponReloading = new idEventDef( "weaponReloading" );
var EV_Weapon_WeaponHolstered = new idEventDef( "weaponHolstered" );
var EV_Weapon_WeaponRising = new idEventDef( "weaponRising" );
var EV_Weapon_WeaponLowering = new idEventDef( "weaponLowering" );
var EV_Weapon_Flashlight = new idEventDef( "flashlight", "d" );
var EV_Weapon_LaunchProjectiles = new idEventDef( "launchProjectiles", "dffff" );
var EV_Weapon_CreateProjectile = new idEventDef( "createProjectile", null, 'e' );
var EV_Weapon_EjectBrass = new idEventDef( "ejectBrass" );
var EV_Weapon_Melee = new idEventDef( "melee", null, 'd' );
var EV_Weapon_GetWorldModel = new idEventDef( "getWorldModel", null, 'e' );
var EV_Weapon_AllowDrop = new idEventDef( "allowDrop", "d" );
var EV_Weapon_AutoReload = new idEventDef( "autoReload", null, 'f' );
var EV_Weapon_NetReload = new idEventDef( "netReload" );
var EV_Weapon_IsInvisible = new idEventDef( "isInvisible", null, 'f' );
var EV_Weapon_NetEndReload = new idEventDef( "netEndReload" );
////
//////
////// class def
//////
////CLASS_DECLARATION( idAnimatedEntity, idWeapon )
idWeapon.CreateInstance = function ( ): idClass {
	try {
		var ptr = new idWeapon;
		ptr.FindUninitializedMemory ( );
		return ptr;
	} catch ( e ) {
		return null;
	}
};

idWeapon.prototype.GetType = function ( ): idTypeInfo {
	return ( idWeapon.Type );
};

idWeapon.eventCallbacks = [
	EVENT( EV_Weapon_Clear,						idWeapon.prototype.Event_Clear ),
	EVENT( EV_Weapon_GetOwner,					idWeapon.prototype.Event_GetOwner ),
	EVENT( EV_Weapon_State,						idWeapon.prototype.Event_WeaponState ),
	EVENT( EV_Weapon_WeaponReady,				idWeapon.prototype.Event_WeaponReady ),
	EVENT( EV_Weapon_WeaponOutOfAmmo,			idWeapon.prototype.Event_WeaponOutOfAmmo ),
	EVENT( EV_Weapon_WeaponReloading,			idWeapon.prototype.Event_WeaponReloading ),
	EVENT( EV_Weapon_WeaponHolstered,			idWeapon.prototype.Event_WeaponHolstered ),
	EVENT( EV_Weapon_WeaponRising,				idWeapon.prototype.Event_WeaponRising ),
	EVENT( EV_Weapon_WeaponLowering,			idWeapon.prototype.Event_WeaponLowering ),
	EVENT( EV_Weapon_UseAmmo,					idWeapon.prototype.Event_UseAmmo ),
	EVENT( EV_Weapon_AddToClip,					idWeapon.prototype.Event_AddToClip ),
	EVENT( EV_Weapon_AmmoInClip,				idWeapon.prototype.Event_AmmoInClip ),
	EVENT( EV_Weapon_AmmoAvailable,				idWeapon.prototype.Event_AmmoAvailable ),
	EVENT( EV_Weapon_TotalAmmoCount,			idWeapon.prototype.Event_TotalAmmoCount ),
	EVENT( EV_Weapon_ClipSize,					idWeapon.prototype.Event_ClipSize ),
	EVENT( AI_PlayAnim,							idWeapon.prototype.Event_PlayAnim ),
	EVENT( AI_PlayCycle,						idWeapon.prototype.Event_PlayCycle ),
	EVENT( AI_SetBlendFrames,					idWeapon.prototype.Event_SetBlendFrames ),
	EVENT( AI_GetBlendFrames,					idWeapon.prototype.Event_GetBlendFrames ),
	EVENT( AI_AnimDone,							idWeapon.prototype.Event_AnimDone ),
	EVENT( EV_Weapon_Next,						idWeapon.prototype.Event_Next ),
	EVENT( EV_SetSkin,							idWeapon.prototype.Event_SetSkin ),
	EVENT( EV_Weapon_Flashlight,				idWeapon.prototype.Event_Flashlight ),
	EVENT( EV_Light_GetLightParm,				idWeapon.prototype.Event_GetLightParm ),
	EVENT( EV_Light_SetLightParm,				idWeapon.prototype.Event_SetLightParm ),
	EVENT( EV_Light_SetLightParms,				idWeapon.prototype.Event_SetLightParms ),
	EVENT( EV_Weapon_LaunchProjectiles,			idWeapon.prototype.Event_LaunchProjectiles ),
	EVENT( EV_Weapon_CreateProjectile,			idWeapon.prototype.Event_CreateProjectile ),
	EVENT( EV_Weapon_EjectBrass,				idWeapon.prototype.Event_EjectBrass ),
	EVENT( EV_Weapon_Melee,						idWeapon.prototype.Event_Melee ),
	EVENT( EV_Weapon_GetWorldModel,				idWeapon.prototype.Event_GetWorldModel ),
	EVENT( EV_Weapon_AllowDrop,					idWeapon.prototype.Event_AllowDrop ),
	EVENT( EV_Weapon_AutoReload,				idWeapon.prototype.Event_AutoReload ),
	EVENT( EV_Weapon_NetReload,					idWeapon.prototype.Event_NetReload ),
	EVENT( EV_Weapon_IsInvisible,				idWeapon.prototype.Event_IsInvisible ),
	EVENT( EV_Weapon_NetEndReload,				idWeapon.prototype.Event_NetEndReload ),
];

idWeapon.Type = new idTypeInfo("idWeapon", "idAnimatedEntity",
	idWeapon.eventCallbacks, idWeapon.CreateInstance, idWeapon.prototype.Spawn,
	idWeapon.prototype.Save, idWeapon.prototype.Restore );

////END_CLASS
////
/////***********************************************************************
////
////	init
////
////***********************************************************************/
