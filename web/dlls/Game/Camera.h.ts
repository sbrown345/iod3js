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
////#ifndef __GAME_CAMERA_H__
////#define __GAME_CAMERA_H__
////
////
/////*
////===============================================================================
////
////Camera providing an alternative view of the level.
////
////===============================================================================
////*/
////
class idCamera extends idEntity {
////public:
////	ABSTRACT_PROTOTYPE( idCamera );
////
////	void					Spawn( void );
////	virtual void			GetViewParms( renderView_t *view ) = 0;
////	virtual renderView_t *	GetRenderView();
////	virtual void			Stop( void ){} ;
};

/*
===============================================================================

idCameraView

===============================================================================
*/

class idCameraView extends idCamera {
////public:
////	CLASS_PROTOTYPE( idCameraView );
////							idCameraView();
////
////	// save games
//Save ( savefile: idSaveGame ): void { throw "placeholder"; }				// archives object for save game file
////	void					Restore ( savefile: idRestoreGame ): void { throw "placeholder"; }				// unarchives object from save game file
////
////	void					Spawn( );
////	virtual void			GetViewParms( renderView_t *view );
////	virtual void			Stop( void );
////
////protected:
	Event_Activate( idEntity *activator ): void { throw "placeholder"; }
	Event_SetAttachments(): void { throw "placeholder"; }
////	void					SetAttachment( idEntity **e, const char *p );
////	float					fov;
////	idEntity				*attachedTo;
////	idEntity				*attachedView;
};



/*
===============================================================================

A camera which follows a path defined by an animation.

===============================================================================
*/
////
////typedef struct {
////	idCQuat				q;
////	idVec3				t;
////	float				fov;
////} cameraFrame_t;
////
////class idCameraAnim extends idCamera {
////public:
////	CLASS_PROTOTYPE( idCameraAnim );
////
////							idCameraAnim();
////							~idCameraAnim();
////
////	// save games
//Save ( savefile: idSaveGame ): void { throw "placeholder"; }				// archives object for save game file
////	void					Restore ( savefile: idRestoreGame ): void { throw "placeholder"; }				// unarchives object from save game file
////
////	void					Spawn( void );
////	virtual void			GetViewParms( renderView_t *view );
////
////private:
////	int						threadNum;
////	idVec3					offset;
////	int						frameRate;
////	int						starttime;
////	int						cycle;
////	idList<int>				cameraCuts;
////	idList<cameraFrame_t>	camera;
////	idEntityPtr<idEntity>	activator;
////
////	void					Start( void );
////	void					Stop( void );
////	void					Think( void );
////
////	void					LoadAnim( void ): void { throw "placeholder"; }
////	void					Event_Start( void ): void { throw "placeholder"; }
////	void					Event_Stop( void ): void { throw "placeholder"; }
////	void					Event_SetCallback( void ): void { throw "placeholder"; }
////	void					Event_Activate( idEntity *activator ): void { throw "placeholder"; }
////};
////
////#endif /* !__GAME_CAMERA_H__ */
