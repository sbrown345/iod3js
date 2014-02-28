/// <reference path="utils/sprintf.d.ts" />
/// <reference path="other/webgl.d.ts" />

/// <reference path="utils/types.ts" />
/// <reference path="utils/helpers.ts" />
/// <reference path="utils/todo.ts" />

/// <reference path="utils/logging.ts" />
/// <reference path="other/files.ts" />
/// <reference path="other/c.ts" />

/// <reference path="other/gl2.h.ts" />

// precompiled.h
///*
//===========================================================================

//Doom 3 GPL Source Code
//Copyright (C) 1999-2011 id Software LLC, a ZeniMax Media company.

//This file is part of the Doom 3 GPL Source Code (?Doom 3 Source Code?).

//Doom 3 Source Code is free software: you can redistribute it and/or modify
//it under the terms of the GNU General Public License as published by
//the Free Software Foundation, either version 3 of the License, or
//(at your option) any later version.

//Doom 3 Source Code is distributed in the hope that it will be useful,
//but WITHOUT ANY WARRANTY; without even the implied warranty of
//MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//GNU General Public License for more details.

//You should have received a copy of the GNU General Public License
//along with Doom 3 Source Code.  If not, see <http://www.gnu.org/licenses/>.

//In addition, the Doom 3 Source Code is also subject to certain additional terms. You should have received a copy of these additional terms immediately following the terms and conditions of the GNU General Public License which accompanied the Doom 3 Source Code.  If not, please request a copy in writing from id Software at the address below.

//If you have questions concerning this license or the applicable additional terms, you may contact in writing id Software LLC, c/o ZeniMax Media Inc., Suite 120, Rockville, Maryland 20850 USA.

//===========================================================================
//*/

//#ifndef __PRECOMPILED_H__
//#define __PRECOMPILED_H__

//#ifdef __cplusplus

////-----------------------------------------------------

//#define ID_TIME_T time_t

//#ifdef _WIN32

//#define _ATL_CSTRING_EXPLICIT_CONSTRUCTORS	// prevent auto literal to string conversion

//#ifndef _D3SDK
//#ifndef GAME_DLL

//#define WINVER				0x501

//#if 0
//// Dedicated server hits unresolved when trying to link this way now. Likely because of the 2010/Win7 transition? - TTimo

//#ifdef	ID_DEDICATED
//// dedicated sets windows version here
//#define	_WIN32_WINNT WINVER
//#define	WIN32_LEAN_AND_MEAN
//#else
//// non-dedicated includes MFC and sets windows version here
//#include "../tools/comafx/StdAfx.h"			// this will go away when MFC goes away
//#endif

//#else

//#include "../tools/comafx/StdAfx.h"

//#endif

//#include < winsock2.h>
//#include < mmsystem.h>
//#include < mmreg.h>

//#define DIRECTINPUT_VERSION  0x0800			// was 0x0700 with the old mssdk
//#define DIRECTSOUND_VERSION  0x0800

//#include < dsound.h>
//#include < dinput.h>

//#endif /* !GAME_DLL */
//#endif /* !_D3SDK */

//#pragma warning(disable : 4100)				// unreferenced formal parameter
//#pragma warning(disable : 4244)				// conversion to smaller type, possible loss of data
//#pragma warning(disable : 4714)				// function marked as __forceinline not inlined
//#pragma warning(disable : 4996)				// unsafe string operations

//#include < malloc.h>							// no malloc.h on mac or unix
//#include < windows.h>						// for gl.h
//#undef FindText								// stupid namespace poluting Microsoft monkeys

//#endif /* _WIN32 */

////-----------------------------------------------------

//#if !defined(_DEBUG) && !defined( NDEBUG )
//	// don't generate asserts
//	#define NDEBUG
//#endif

//#include < stdio.h>
//#include < stdlib.h>
//#include < stdarg.h>
//#include < string.h>
//#include < assert.h>
//#include < time.h>
//#include < ctype.h>
//#include < typeinfo>
//#include < errno.h>
//#include < math.h>

//-----------------------------------------------------

// non-portable system services
/// <reference path="doomdll/sys/sys_public.h.ts" />
/// <reference path="doomdll/sys/win_cpu.cpp.ts" />
/// <reference path="doomdll/sys/win_glimp.cpp.ts" />
/// <reference path="doomdll/sys/win_input.cpp.ts" />
/// <reference path="doomdll/sys/win_main.cpp.ts" />

// id lib
/// <reference path="libs/idlib/precompiled.h.ts" />
/// <reference path="libs/idlib/heap.h.ts" />
/// <reference path="libs/idlib/heap.cpp.ts" />
/// <reference path="libs/idlib/lib.h.ts" />
/// <reference path="libs/idlib/lib.cpp.ts" />
// Text
/// <reference path="libs/idlib/text/cmdargs.cpp.ts" />
/// <reference path="libs/idlib/text/lexer.h.ts" />
/// <reference path="libs/idlib/text/lexer.cpp.ts" />
/// <reference path="libs/idlib/text/str.h.ts" />
/// <reference path="libs/idlib/text/token.cpp.ts" />
// BV
/// <reference path="libs/idlib/bv/frustum.cpp.ts" />
/// <reference path="libs/idlib/bv/bounds.h.ts" />
// Containers
/// <reference path="libs/idlib/containers/hashindex.h.ts" />
/// <reference path="libs/idlib/containers/hierarchy.h.ts" />
/// <reference path="libs/idlib/containers/list.h.ts" />
/// <reference path="libs/idlib/containers/linklist.h.ts" />
/// <reference path="libs/idlib/containers/staticlist.h.ts" />
/// <reference path="libs/idlib/containers/strlist.h.ts" />
/// <reference path="libs/idlib/containers/strpool.h.ts" />
// Math
/// <reference path="libs/idlib/math/angles.cpp.ts" />
/// <reference path="libs/idlib/math/vector.h.ts" />
/// <reference path="libs/idlib/math/vector.cpp.ts" />
/// <reference path="libs/idlib/math/math.h.ts" />
/// <reference path="libs/idlib/math/math.cpp.ts" />
/// <reference path="libs/idlib/math/matrix.h.ts" />
/// <reference path="libs/idlib/math/matrix.cpp.ts" />
/// <reference path="libs/idlib/math/plane.h.ts" />
/// <reference path="libs/idlib/math/simd_generic.cpp.ts" />
/// <reference path="libs/idlib/math/random.h.ts" />
// Hashing
/// <reference path="libs/idlib/hashing/crc32.cpp.ts" />
/// <reference path="libs/idlib/hashing/md4.cpp.ts" />
/// <reference path="libs/idlib/hashing/md5.cpp.ts" />
// Geometry
/// <reference path="libs/idlib/geometry/drawvert.h.ts" />
/// <reference path="libs/idlib/geometry/winding.h.ts" />
/// <reference path="libs/idlib/geometry/jointtransform.h.ts" />

// Libs root
/// <reference path="libs/idlib/dict.cpp.ts" />
/// <reference path="libs/idlib/langdict.cpp.ts" />
/// <reference path="libs/idlib/mapfile.h.ts" />
/// <reference path="libs/idlib/mapfile.cpp.ts" />
/// <reference path="libs/idlib/parser.cpp.ts" />
/// <reference path="libs/idlib/timer.h.ts" />

// framework
/// <reference path="doomdll/cm/collisionmodel.h.ts" />
/// <reference path="doomdll/cm/collisionmodel_local.h.ts" />
/// <reference path="doomdll/cm/collisionmodel_translate.cpp.ts" />
/// <reference path="doomdll/cm/collisionmodel_contacts.cpp.ts" />
/// <reference path="doomdll/cm/collisionmodel_contents.cpp.ts" />
/// <reference path="doomdll/cm/collisionmodel_debug.cpp.ts" />
/// <reference path="doomdll/cm/collisionmodel_files.cpp.ts" />
/// <reference path="doomdll/cm/collisionmodel_load.cpp.ts" />
/// <reference path="doomdll/cm/collisionmodel_rotate.cpp.ts" />
/// <reference path="doomdll/cm/collisionmodel_trace.cpp.ts" />
//#include "../framework/BuildVersion.h"
//#include "../framework/BuildDefines.h"
/// <reference path="doomdll/framework/licensee.h.ts" />
//#include "../framework/CmdSystem.h"
/// <reference path="doomdll/framework/cmdsystem.h.ts" />
/// <reference path="doomdll/framework/cmdsystem.cpp.ts" />
//#include "../framework/CVarSystem.h"
/// <reference path="doomdll/framework/cvarsystem.h.ts" />
/// <reference path="doomdll/framework/cvarsystem.cpp.ts" />
//#include "../framework/Common.h"
/// <reference path="doomdll/framework/common.h.ts" />
/// <reference path="doomdll/framework/common.cpp.ts" />
//#include "../framework/File.h"
/// <reference path="doomdll/framework/file.h.ts" />
/// <reference path="doomdll/framework/file.cpp.ts" />
/// <reference path="doomdll/framework/demofile.h.ts" />
/// <reference path="doomdll/framework/demofile.cpp.ts" />
//#include "../framework/FileSystem.h"
/// <reference path="doomdll/framework/filesystem.h.ts" />
/// <reference path="doomdll/framework/filesystem.cpp.ts" />
//#include "../framework/UsercmdGen.h"
/// <reference path="doomdll/framework/usercmdgen.h.ts" />
/// <reference path="doomdll/framework/usercmdgen.cpp.ts" />

/// <reference path="doomdll/framework/eventloop.cpp.ts" />


// decls
//#include "../framework/DeclManager.h"
/// <reference path="doomdll/framework/declmanager.h.ts" />
/// <reference path="doomdll/framework/declmanager.cpp.ts" />
//#include "../framework/DeclTable.h"
/// <reference path="doomdll/framework/decltable.cpp.ts" />
//#include "../framework/DeclSkin.h"
/// <reference path="doomdll/framework/declskin.cpp.ts" />
//#include "../framework/DeclEntityDef.h"
/// <reference path="doomdll/framework/declentitydef.cpp.ts" />
//#include "../framework/DeclFX.h"
/// <reference path="doomdll/framework/declfx.cpp.ts" />
//#include "../framework/DeclParticle.h"
/// <reference path="doomdll/framework/declparticle.cpp.ts" />
//#include "../framework/DeclAF.h"
/// <reference path="doomdll/framework/declaf.h.ts" />
/// <reference path="doomdll/framework/declaf.cpp.ts" />
//#include "../framework/DeclPDA.h"
/// <reference path="doomdll/framework/declpda.h.ts" />
/// <reference path="doomdll/framework/declpda.cpp.ts" />

//// We have expression parsing and evaluation code in multiple places:
//// materials, sound shaders, and guis. We should unify them.
//const int MAX_EXPRESSION_OPS = 4096;
//const int MAX_EXPRESSION_REGISTERS = 4096;

// renderer
//#include "../renderer/qgl.h"
//#include "../renderer/Cinematic.h"
//#include "../renderer/Material.h"
//#include "../renderer/Model.h"
//#include "../renderer/ModelManager.h"
//#include "../renderer/RenderSystem.h"
//#include "../renderer/RenderWorld.h"
/// <reference path="doomdll/renderer/cinematic.h.ts" />
/// <reference path="doomdll/renderer/cinematic.cpp.ts" />
/// <reference path="doomdll/renderer/guimodel.cpp.ts" />
/// <reference path="doomdll/renderer/guimodel.h.ts" />
/// <reference path="doomdll/renderer/interaction.h.ts" />
/// <reference path="doomdll/renderer/interaction.cpp.ts" />
/// <reference path="doomdll/renderer/image.h.ts" />
/// <reference path="doomdll/renderer/image_files.cpp.ts" />
/// <reference path="doomdll/renderer/image_init.cpp.ts" />
/// <reference path="doomdll/renderer/image_load.cpp.ts" />
/// <reference path="doomdll/renderer/image_process.cpp.ts" />
/// <reference path="doomdll/renderer/image_program.cpp.ts" />
/// <reference path="doomdll/renderer/material.h.ts" />
/// <reference path="doomdll/renderer/material.cpp.ts" />
/// <reference path="doomdll/renderer/model.h.ts" />
/// <reference path="doomdll/renderer/model_local.h.ts" />
/// <reference path="doomdll/renderer/model.cpp.ts" />
/// <reference path="doomdll/renderer/model_ase.h.ts" />
/// <reference path="doomdll/renderer/model_ase.cpp.ts" />
/// <reference path="doomdll/renderer/model_beam.cpp.ts" />
/// <reference path="doomdll/renderer/model_liquid.cpp.ts" />
/// <reference path="doomdll/renderer/model_lwo.h.ts" />
/// <reference path="doomdll/renderer/model_lwo.cpp.ts" />
/// <reference path="doomdll/renderer/model_ma.h.ts" />
/// <reference path="doomdll/renderer/model_ma.cpp.ts" />
/// <reference path="doomdll/renderer/model_md3.h.ts" />
/// <reference path="doomdll/renderer/model_md3.cpp.ts" />
/// <reference path="doomdll/renderer/model_md5.cpp.ts" />
/// <reference path="doomdll/renderer/model_prt.cpp.ts" />
/// <reference path="doomdll/renderer/model_sprite.cpp.ts" />
/// <reference path="doomdll/renderer/modeldecal.h.ts" />
/// <reference path="doomdll/renderer/modeldecal.cpp.ts" />
/// <reference path="doomdll/renderer/modelmanager.h.ts" />
/// <reference path="doomdll/renderer/modelmanager.cpp.ts" />
/// <reference path="doomdll/renderer/qgl_linked.h.ts" />
/// <reference path="doomdll/renderer/tr_local.h.ts" />
/// <reference path="doomdll/renderer/renderworld.h.ts" />
/// <reference path="doomdll/renderer/renderworld_local.h.ts" />
/// <reference path="doomdll/renderer/renderworld.cpp.ts" />
/// <reference path="doomdll/renderer/rendersystem.h.ts" />
/// <reference path="doomdll/renderer/rendersystem.cpp.ts" />
/// <reference path="doomdll/renderer/renderworld_demo.cpp.ts" />
/// <reference path="doomdll/renderer/renderworld_load.cpp.ts" />
/// <reference path="doomdll/renderer/renderworld_portals.cpp.ts" />
/// <reference path="doomdll/renderer/tr_backend.cpp.ts" />
/// <reference path="doomdll/renderer/tr_font.cpp.ts" />
/// <reference path="doomdll/renderer/tr_main.cpp.ts" />
/// <reference path="doomdll/renderer/tr_trisurf.cpp.ts" />
/// <reference path="doomdll/renderer/vertexcache.h.ts" />
/// <reference path="doomdll/renderer/vertexcache.cpp.ts" />
/// <reference path="doomdll/renderer/draw_common.cpp.ts" />
/// <reference path="doomdll/renderer/draw_glsl.cpp.ts" />
/// <reference path="doomdll/renderer/tr_render.cpp.ts" />
/// <reference path="doomdll/renderer/tr_rendertools.cpp.ts" />
/// <reference path="doomdll/renderer/tr_light.cpp.ts" />
/// <reference path="doomdll/renderer/tr_lightrun.cpp.ts" />
/// <reference path="doomdll/renderer/tr_deform.cpp.ts" />

//// sound engine
//#include "../sound/sound.h"
/// <reference path="doomdll/sound/sound.h.ts" />
/// <reference path="doomdll/sound/snd_local.h.ts" />
/// <reference path="doomdll/sound/snd_world.cpp.ts" />
/// <reference path="doomdll/sound/snd_shader.cpp.ts" />
/// <reference path="doomdll/sound/snd_system.cpp.ts" />
/// <reference path="doomdll/sound/snd_cache.cpp.ts" />
/// <reference path="doomdll/sound/snd_decoder.cpp.ts" />
/// <reference path="doomdll/sound/snd_efxfile.cpp.ts" />
/// <reference path="doomdll/sound/snd_emitter.cpp.ts" />
/// <reference path="doomdll/sound/snd_wavefile.cpp.ts" />

//// asynchronous networking
//#include "../framework/async/NetworkSystem.h"

//// user interfaces
//#include "../ui/ListGUI.h"
//#include "../ui/UserInterface.h"
/// <reference path="doomdll/ui/rectangle.h.ts" />
/// <reference path="doomdll/ui/devicecontext.cpp.ts" />
/// <reference path="doomdll/ui/listgui.cpp.ts" />
/// <reference path="doomdll/ui/userinterface.h.ts" />
/// <reference path="doomdll/ui/userinterface.cpp.ts" />

//// collision detection system
//#include "../cm/CollisionModel.h"

//// AAS files and manager
//#include "../tools/compilers/aas/AASFile.h"
//#include "../tools/compilers/aas/AASFileManager.h"

//// game
//#if defined(_D3XP)
//#include "../d3xp/Game.h"
//#else
//#include "../game/Game.h"
//#endif

/// <reference path="dlls/game/gamesys/event.cpp.ts" />
/// <reference path="dlls/game/gamesys/class.cpp.ts" />
/// <reference path="dlls/game/gamesys/savegame.cpp.ts" />
/// <reference path="dlls/game/gamesys/syscvar.cpp.ts" />
/// <reference path="dlls/game/entity.h.ts" />
/// <reference path="dlls/game/entity.cpp.ts" />
/// <reference path="dlls/game/afentity.h.ts" />
/// <reference path="dlls/game/afentity.cpp.ts" />
/// <reference path="dlls/game/actor.h.ts" />
/// <reference path="dlls/game/actor.cpp.ts" />
/// <reference path="dlls/game/ai/aas.h.ts" />
/// <reference path="dlls/game/ai/aas_local.h.ts" />
/// <reference path="dlls/game/ai/aas.cpp.ts" />
/// <reference path="dlls/game/ai/aas_debug.cpp.ts" />
/// <reference path="dlls/game/ai/aas_pathing.cpp.ts" />
/// <reference path="dlls/game/ai/aas_routing.cpp.ts" />
/// <reference path="dlls/game/ai/ai.h.ts" />
/// <reference path="dlls/game/ai/ai.cpp.ts" />
/// <reference path="dlls/game/ai/ai_events.cpp.ts" />
/// <reference path="dlls/game/ai/ai_pathing.cpp.ts" />
/// <reference path="dlls/game/ai/ai_vagary.cpp.ts" />
/// <reference path="dlls/game/animation/anim.h.ts" />
/// <reference path="dlls/game/animation/anim.cpp.ts" />
/// <reference path="dlls/game/animation/anim_blend.cpp.ts" />
/// <reference path="dlls/game/animation/anim_import.cpp.ts" />
/// <reference path="dlls/game/animation/anim_testmodel.h.ts" />
/// <reference path="dlls/game/animation/anim_testmodel.cpp.ts" />
/// <reference path="dlls/game/physics/clip.cpp.ts" />
/// <reference path="dlls/game/script/script_program.h.ts" />
/// <reference path="dlls/game/script/script_program.cpp.ts" />
/// <reference path="dlls/game/script/script_compiler.h.ts" />
/// <reference path="dlls/game/script/script_compiler.cpp.ts" />
/// <reference path="dlls/game/script/script_interpreter.h.ts" />
/// <reference path="dlls/game/script/script_interpreter.cpp.ts" />
/// <reference path="dlls/game/script/script_thread.cpp.ts" />
/// <reference path="dlls/game/af.h.ts" />
/// <reference path="dlls/game/af.cpp.ts" />
/// <reference path="dlls/game/brittlefracture.h.ts" />
/// <reference path="dlls/game/brittlefracture.cpp.ts" />
/// <reference path="dlls/game/camera.h.ts" />
/// <reference path="dlls/game/camera.cpp.ts" />
/// <reference path="dlls/game/fx.cpp.ts" />
/// <reference path="dlls/game/gameedit.h.ts" />
/// <reference path="dlls/game/gameedit.cpp.ts" />
/// <reference path="dlls/game/ik.h.ts" />
/// <reference path="dlls/game/ik.cpp.ts" />
/// <reference path="dlls/game/item.h.ts" />
/// <reference path="dlls/game/item.cpp.ts" />
/// <reference path="dlls/game/light.cpp.ts" />
/// <reference path="dlls/game/misc.h.ts" />
/// <reference path="dlls/game/misc.cpp.ts" />
/// <reference path="dlls/game/mover.h.ts" />
/// <reference path="dlls/game/mover.cpp.ts" />
/// <reference path="dlls/game/moveable.h.ts" />
/// <reference path="dlls/game/moveable.cpp.ts" />
/// <reference path="dlls/game/multiplayergame.h.ts" />
/// <reference path="dlls/game/multiplayergame.cpp.ts" />
/// <reference path="dlls/game/player.h.ts" />
/// <reference path="dlls/game/player.cpp.ts" />
/// <reference path="dlls/game/playericon.h.ts" />
/// <reference path="dlls/game/playericon.cpp.ts" />
/// <reference path="dlls/game/playerview.h.ts" />
/// <reference path="dlls/game/playerview.cpp.ts" />
/// <reference path="dlls/game/projectile.h.ts" />
/// <reference path="dlls/game/projectile.cpp.ts" />
/// <reference path="dlls/game/pvs.cpp.ts" />
/// <reference path="dlls/game/securitycamera.h.ts" />
/// <reference path="dlls/game/securitycamera.cpp.ts" />
/// <reference path="dlls/game/smokeparticles.cpp.ts" />
/// <reference path="dlls/game/sound.h.ts" />
/// <reference path="dlls/game/sound.cpp.ts" />
/// <reference path="dlls/game/target.h.ts" />
/// <reference path="dlls/game/target.cpp.ts" />
/// <reference path="dlls/game/trigger.h.ts" />
/// <reference path="dlls/game/trigger.cpp.ts" />
/// <reference path="dlls/game/weapon.h.ts" />
/// <reference path="dlls/game/weapon.cpp.ts" />
/// <reference path="dlls/game/worldspawn.cpp.ts" />

/// <reference path="dlls/game/game.h.ts" />
/// <reference path="dlls/game/game_local.h.ts" />
/// <reference path="dlls/game/game_local.cpp.ts" />

/// <reference path="dlls/game/gamesys/syscmds.cpp.ts" />

//-----------------------------------------------------

//#ifndef _D3SDK

//#ifdef GAME_DLL

//#if defined(_D3XP)
//#include "../d3xp/Game_local.h"
//#else
//#include "../game/Game_local.h"
//#endif

//#else

//#include "../framework/DemoChecksum.h"

//// framework
//#include "../framework/Compressor.h"
//#include "../framework/EventLoop.h"
//#include "../framework/KeyInput.h"
//#include "../framework/EditField.h"
//#include "../framework/Console.h"
/// <reference path="doomdll/framework/EditField.cpp.ts" />
/// <reference path="doomdll/framework/console.h.ts" />
/// <reference path="doomdll/framework/console.cpp.ts" />
/// <reference path="doomdll/framework/KeyInput.cpp.ts" />
//#include "../framework/DemoFile.h"
//#include "../framework/Session.h"
/// <reference path="doomdll/framework/session.h.ts" />
/// <reference path="doomdll/framework/session_menu.cpp.ts" />
/// <reference path="doomdll/framework/session.cpp.ts" />
/// <reference path="doomdll/framework/session_local.h.ts" />

//// asynchronous networking
//#include "../framework/async/AsyncNetwork.h"
/// <reference path="doomdll/framework/async/serverscan.h.ts" />
/// <reference path="doomdll/framework/async/asyncclient.cpp.ts" />
/// <reference path="doomdll/framework/async/asyncclient.h.ts" />
/// <reference path="doomdll/framework/async/asyncserver.h.ts" />
/// <reference path="doomdll/framework/async/asyncserver.cpp.ts" />
/// <reference path="doomdll/framework/async/asyncnetwork.h.ts" />
/// <reference path="doomdll/framework/async/asyncnetwork.cpp.ts" />
/// <reference path="doomdll/framework/async/msgchannel.h.ts" />
/// <reference path="doomdll/framework/async/msgchannel.cpp.ts" />
/// <reference path="doomdll/framework/async/networksystem.h.ts" />
/// <reference path="doomdll/framework/async/networksystem.cpp.ts" />
/// <reference path="doomdll/framework/async/serverscan.cpp.ts" />


//// The editor entry points are always declared, but may just be
//// stubbed out on non-windows platforms.
//#include "../tools/edit_public.h"

//// Compilers for map, model, video etc. processing.
//#include "../tools/compilers/compiler_public.h"

//#endif /* !GAME_DLL */

//#endif /* !_D3SDK */

////-----------------------------------------------------

//#endif	/* __cplusplus */

//#endif /* !__PRECOMPILED_H__ */
