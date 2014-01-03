/*
===========================================================================

Doom 3 GPL Source Code
Copyright (C) 1999-2011 id Software LLC, a ZeniMax Media company. 

This file is part of the Doom 3 GPL Source Code (?Doom 3 Source Code?).  

Doom 3 Source Code is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Doom 3 Source Code is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with Doom 3 Source Code.  If not, see <http://www.gnu.org/licenses/>.

In addition, the Doom 3 Source Code is also subject to certain additional terms. You should have received a copy of these additional terms immediately following the terms and conditions of the GNU General Public License which accompanied the Doom 3 Source Code.  If not, please request a copy in writing from id Software at the address below.

If you have questions concerning this license or the applicable additional terms, you may contact in writing id Software LLC, c/o ZeniMax Media Inc., Suite 120, Rockville, Maryland 20850 USA.

===========================================================================
*/
/*
** QGL.H
*/

#ifndef __QGL_H__
#define __QGL_H__

#if defined( _WIN32 )

#include <GL/gl.h>
#include <EGL/egl.h>
#include "eglext.h"
#include <GLES2/gl2.h>
#include "gl2ext.h"
#include "esUtil.h"

#include <wingdi.h>

#elif defined( MACOS_X )

// magic flag to keep tiger gl.h from loading glext.h
#define GL_GLEXT_LEGACY
#include <OpenGL/gl.h>

#elif defined( __linux__ )

// using our local glext.h
// http://oss.sgi.com/projects/ogl-sample/ABI/
#define GL_GLEXT_LEGACY
#define GLX_GLXEXT_LEGACY
#include <GL/gl.h>
#include <GL/glx.h>

#else

#include <gl.h>

#endif

#ifndef APIENTRY
#define APIENTRY
#endif
#ifndef WINAPI
#define WINAPI
#endif

// only use local glext.h if we are not using the system one already
// http://oss.sgi.com/projects/ogl-sample/ABI/
#ifndef GL_GLEXT_VERSION

//#include "glext.h"

#endif

typedef void (*GLExtension_t)(void);

#ifdef __cplusplus
	extern "C" {
#endif

GLExtension_t GLimp_ExtensionPointer( const char *name );

#ifdef __cplusplus
	}
#endif

//===========================================================================

// non-windows systems will just redefine gl* to gl*
#if defined( __APPLE__ ) || defined( ID_GL_HARDLINK )

#include "gl_linked.h"

#else

#if defined( _WIN32 )

extern  int   ( WINAPI * qwglChoosePixelFormat )(HDC, CONST PIXELFORMATDESCRIPTOR *);
extern  int   ( WINAPI * qwglDescribePixelFormat) (HDC, int, UINT, LPPIXELFORMATDESCRIPTOR);
extern  int   ( WINAPI * qwglGetPixelFormat)(HDC);
extern  BOOL  ( WINAPI * qwglSetPixelFormat)(HDC, int, CONST PIXELFORMATDESCRIPTOR *);

extern HGLRC ( WINAPI * qwglCreateLayerContext)(HDC, int);
extern HGLRC ( WINAPI * qwglGetCurrentContext)(VOID);
extern HDC   ( WINAPI * qwglGetCurrentDC)(VOID);
extern BOOL  ( WINAPI * qwglShareLists)(HGLRC, HGLRC);

extern BOOL ( WINAPI * qwglDescribeLayerPlane)(HDC, int, int, UINT,
                                            LPLAYERPLANEDESCRIPTOR);
extern int  ( WINAPI * qwglSetLayerPaletteEntries)(HDC, int, int, int,
                                                CONST COLORREF *);
extern int  ( WINAPI * qwglGetLayerPaletteEntries)(HDC, int, int, int,
                                                COLORREF *);
extern BOOL ( WINAPI * qwglRealizeLayerPalette)(HDC, int, BOOL);
extern BOOL ( WINAPI * qwglSwapLayerBuffers)(HDC, UINT);

#endif	// _WIN32

#if defined( __linux__ )

//GLX Functions
extern XVisualInfo * (*glXChooseVisual)( Display *dpy, int screen, int *attribList );
extern GLXContext (*glXCreateContext)( Display *dpy, XVisualInfo *vis, GLXContext shareList, Bool direct );
extern void (*glXDestroyContext)( Display *dpy, GLXContext ctx );
extern Bool (*glXMakeCurrent)( Display *dpy, GLXDrawable drawable, GLXContext ctx);
extern void (*glXSwapBuffers)( Display *dpy, GLXDrawable drawable );
extern GLExtension_t (*glXGetProcAddressARB)( const GLubyte *procname );

// make sure the code is correctly using gl everywhere
// don't enable that when building glimp itself obviously..
#if !defined( GLIMP )
	#include "../sys/linux/gl_enforce.h"
#endif

#endif // __linux__

#endif	// hardlinlk vs dlopen

#endif
