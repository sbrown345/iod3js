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
** QGL_WIN.C
**
** This file implements the operating system binding of GL to QGL function
** pointers.  When doing a port of Doom you must implement the following
** two functions:
**
** QGL_Init() - loads libraries, assigns function pointers, etc.
** QGL_Shutdown() - unloads libraries, NULLs function pointers
*/
#include "../../idlib/precompiled.h"
#pragma hdrstop

#include <float.h>
#include "win_local.h"
#include "../../renderer/tr_local.h"

//
//int   ( WINAPI * qwglChoosePixelFormat )(HDC, CONST PIXELFORMATDESCRIPTOR *);
//int   ( WINAPI * qwglDescribePixelFormat) (HDC, int, UINT, LPPIXELFORMATDESCRIPTOR);
//int   ( WINAPI * qwglGetPixelFormat)(HDC);
//BOOL  ( WINAPI * qwglSetPixelFormat)(HDC, int, CONST PIXELFORMATDESCRIPTOR *);
//BOOL  ( WINAPI * qwglSwapBuffers)(HDC);
//
//BOOL  ( WINAPI * qwglCopyContext)(HGLRC, HGLRC, UINT);
//HGLRC ( WINAPI * qwglCreateContext)(HDC);
//HGLRC ( WINAPI * qwglCreateLayerContext)(HDC, int);
//BOOL  ( WINAPI * qwglDeleteContext)(HGLRC);
//HGLRC ( WINAPI * qwglGetCurrentContext)(VOID);
//HDC   ( WINAPI * qwglGetCurrentDC)(VOID);
//PROC  ( WINAPI * qwglGetProcAddress)(LPCSTR);
//BOOL  ( WINAPI * qwglMakeCurrent)(HDC, HGLRC);
//BOOL  ( WINAPI * qwglShareLists)(HGLRC, HGLRC);
//BOOL  ( WINAPI * qwglUseFontBitmaps)(HDC, DWORD, DWORD, DWORD);
//
//BOOL  ( WINAPI * qwglUseFontOutlines)(HDC, DWORD, DWORD, DWORD, FLOAT,
//                                           FLOAT, int, LPGLYPHMETRICSFLOAT);
//
//BOOL ( WINAPI * qwglDescribeLayerPlane)(HDC, int, int, UINT,
//                                            LPLAYERPLANEDESCRIPTOR);
//int  ( WINAPI * qwglSetLayerPaletteEntries)(HDC, int, int, int,
//                                                CONST COLORREF *);
//int  ( WINAPI * qwglGetLayerPaletteEntries)(HDC, int, int, int,
//                                                COLORREF *);
//BOOL ( WINAPI * qwglRealizeLayerPalette)(HDC, int, BOOL);
//BOOL ( WINAPI * qwglSwapLayerBuffers)(HDC, UINT);
//
//void ( APIENTRY * glAccum )(GLenum op, GLfloat value);
//void ( APIENTRY * glAlphaFunc )(GLenum func, GLclampf ref);
//GLboolean ( APIENTRY * glAreTexturesResident )(GLsizei n, const GLuint *textures, GLboolean *residences);
//void ( APIENTRY * glArrayElement )(GLint i);
//void ( APIENTRY * glBegin )(GLenum mode);
//void ( APIENTRY * glBindTexture )(GLenum target, GLuint texture);
//void ( APIENTRY * glBitmap )(GLsizei width, GLsizei height, GLfloat xorig, GLfloat yorig, GLfloat xmove, GLfloat ymove, const GLubyte *bitmap);
//void ( APIENTRY * glBlendFunc )(GLenum sfactor, GLenum dfactor);
//void ( APIENTRY * glCallList )(GLuint list);
//void ( APIENTRY * glCallLists )(GLsizei n, GLenum type, const GLvoid *lists);
//void ( APIENTRY * glClear )(GLbitfield mask);
//void ( APIENTRY * glClearAccum )(GLfloat red, GLfloat green, GLfloat blue, GLfloat alpha);
//void ( APIENTRY * glClearColor )(GLclampf red, GLclampf green, GLclampf blue, GLclampf alpha);
//void ( APIENTRY * glClearDepth )(GLclampd depth);
//void ( APIENTRY * glClearIndex )(GLfloat c);
//void ( APIENTRY * glClearStencil )(GLint s);
//void ( APIENTRY * glClipPlane )(GLenum plane, const GLdouble *equation);
//void ( APIENTRY * glColor3b )(GLbyte red, GLbyte green, GLbyte blue);
//void ( APIENTRY * glColor3bv )(const GLbyte *v);
//void ( APIENTRY * glColor3d )(GLdouble red, GLdouble green, GLdouble blue);
//void ( APIENTRY * glColor3dv )(const GLdouble *v);
//void ( APIENTRY * glColor3f )(GLfloat red, GLfloat green, GLfloat blue);
//void ( APIENTRY * glColor3fv )(const GLfloat *v);
//void ( APIENTRY * glColor3i )(GLint red, GLint green, GLint blue);
//void ( APIENTRY * glColor3iv )(const GLint *v);
//void ( APIENTRY * glColor3s )(GLshort red, GLshort green, GLshort blue);
//void ( APIENTRY * glColor3sv )(const GLshort *v);
//void ( APIENTRY * glColor3ub )(GLubyte red, GLubyte green, GLubyte blue);
//void ( APIENTRY * glColor3ubv )(const GLubyte *v);
//void ( APIENTRY * glColor3ui )(GLuint red, GLuint green, GLuint blue);
//void ( APIENTRY * glColor3uiv )(const GLuint *v);
//void ( APIENTRY * glColor3us )(GLushort red, GLushort green, GLushort blue);
//void ( APIENTRY * glColor3usv )(const GLushort *v);
//void ( APIENTRY * glColor4b )(GLbyte red, GLbyte green, GLbyte blue, GLbyte alpha);
//void ( APIENTRY * glColor4bv )(const GLbyte *v);
//void ( APIENTRY * glColor4d )(GLdouble red, GLdouble green, GLdouble blue, GLdouble alpha);
//void ( APIENTRY * glColor4dv )(const GLdouble *v);
//void ( APIENTRY * glColor4f )(GLfloat red, GLfloat green, GLfloat blue, GLfloat alpha);
//void ( APIENTRY * glColor4fv )(const GLfloat *v);
//void ( APIENTRY * glColor4i )(GLint red, GLint green, GLint blue, GLint alpha);
//void ( APIENTRY * glColor4iv )(const GLint *v);
//void ( APIENTRY * glColor4s )(GLshort red, GLshort green, GLshort blue, GLshort alpha);
//void ( APIENTRY * glColor4sv )(const GLshort *v);
//void ( APIENTRY * glColor4ub )(GLubyte red, GLubyte green, GLubyte blue, GLubyte alpha);
//void ( APIENTRY * glColor4ubv )(const GLubyte *v);
//void ( APIENTRY * glColor4ui )(GLuint red, GLuint green, GLuint blue, GLuint alpha);
//void ( APIENTRY * glColor4uiv )(const GLuint *v);
//void ( APIENTRY * glColor4us )(GLushort red, GLushort green, GLushort blue, GLushort alpha);
//void ( APIENTRY * glColor4usv )(const GLushort *v);
//void ( APIENTRY * glColorMask )(GLboolean red, GLboolean green, GLboolean blue, GLboolean alpha);
//void ( APIENTRY * glColorMaterial )(GLenum face, GLenum mode);
//void ( APIENTRY * glColorPointer )(GLint size, GLenum type, GLsizei stride, const GLvoid *pointer);
//void ( APIENTRY * glCopyPixels )(GLint x, GLint y, GLsizei width, GLsizei height, GLenum type);
//void ( APIENTRY * glCopyTexImage1D )(GLenum target, GLint level, GLenum internalFormat, GLint x, GLint y, GLsizei width, GLint border);
//void ( APIENTRY * glCopyTexImage2D )(GLenum target, GLint level, GLenum internalFormat, GLint x, GLint y, GLsizei width, GLsizei height, GLint border);
//void ( APIENTRY * glCopyTexSubImage1D )(GLenum target, GLint level, GLint xoffset, GLint x, GLint y, GLsizei width);
//void ( APIENTRY * glCopyTexSubImage2D )(GLenum target, GLint level, GLint xoffset, GLint yoffset, GLint x, GLint y, GLsizei width, GLsizei height);
//void ( APIENTRY * glCullFace )(GLenum mode);
//void ( APIENTRY * glDeleteLists )(GLuint list, GLsizei range);
//void ( APIENTRY * glDeleteTextures )(GLsizei n, const GLuint *textures);
//void ( APIENTRY * glDepthFunc )(GLenum func);
//void ( APIENTRY * glDepthMask )(GLboolean flag);
//void ( APIENTRY * glDepthRange )(GLclampd zNear, GLclampd zFar);
//void ( APIENTRY * glDisable )(GLenum cap);
//void ( APIENTRY * glDisableClientState )(GLenum array);
//void ( APIENTRY * glDrawArrays )(GLenum mode, GLint first, GLsizei count);
//void ( APIENTRY * glDrawBuffer )(GLenum mode);
//void ( APIENTRY * glDrawElements )(GLenum mode, GLsizei count, GLenum type, const GLvoid *indices);
//void ( APIENTRY * glDrawPixels )(GLsizei width, GLsizei height, GLenum format, GLenum type, const GLvoid *pixels);
//void ( APIENTRY * glEdgeFlag )(GLboolean flag);
//void ( APIENTRY * glEdgeFlagPointer )(GLsizei stride, const GLvoid *pointer);
//void ( APIENTRY * glEdgeFlagv )(const GLboolean *flag);
//void ( APIENTRY * glEnable )(GLenum cap);
//void ( APIENTRY * glEnableClientState )(GLenum array);
//void ( APIENTRY * glEnd )(void);
//void ( APIENTRY * glEndList )(void);
//void ( APIENTRY * glEvalCoord1d )(GLdouble u);
//void ( APIENTRY * glEvalCoord1dv )(const GLdouble *u);
//void ( APIENTRY * glEvalCoord1f )(GLfloat u);
//void ( APIENTRY * glEvalCoord1fv )(const GLfloat *u);
//void ( APIENTRY * glEvalCoord2d )(GLdouble u, GLdouble v);
//void ( APIENTRY * glEvalCoord2dv )(const GLdouble *u);
//void ( APIENTRY * glEvalCoord2f )(GLfloat u, GLfloat v);
//void ( APIENTRY * glEvalCoord2fv )(const GLfloat *u);
//void ( APIENTRY * glEvalMesh1 )(GLenum mode, GLint i1, GLint i2);
//void ( APIENTRY * glEvalMesh2 )(GLenum mode, GLint i1, GLint i2, GLint j1, GLint j2);
//void ( APIENTRY * glEvalPoint1 )(GLint i);
//void ( APIENTRY * glEvalPoint2 )(GLint i, GLint j);
//void ( APIENTRY * glFeedbackBuffer )(GLsizei size, GLenum type, GLfloat *buffer);
//void ( APIENTRY * glFinish )(void);
//void ( APIENTRY * glFlush )(void);
//void ( APIENTRY * glFogf )(GLenum pname, GLfloat param);
//void ( APIENTRY * glFogfv )(GLenum pname, const GLfloat *params);
//void ( APIENTRY * glFogi )(GLenum pname, GLint param);
//void ( APIENTRY * glFogiv )(GLenum pname, const GLint *params);
//void ( APIENTRY * glFrontFace )(GLenum mode);
//void ( APIENTRY * glFrustum )(GLdouble left, GLdouble right, GLdouble bottom, GLdouble top, GLdouble zNear, GLdouble zFar);
//GLuint ( APIENTRY * glGenLists )(GLsizei range);
//void ( APIENTRY * glGenTextures )(GLsizei n, GLuint *textures);
//void ( APIENTRY * glGetBooleanv )(GLenum pname, GLboolean *params);
//void ( APIENTRY * glGetClipPlane )(GLenum plane, GLdouble *equation);
//void ( APIENTRY * glGetDoublev )(GLenum pname, GLdouble *params);
//GLenum ( APIENTRY * glGetError )(void);
//void ( APIENTRY * glGetFloatv )(GLenum pname, GLfloat *params);
//void ( APIENTRY * glGetIntegerv )(GLenum pname, GLint *params);
//void ( APIENTRY * glGetLightfv )(GLenum light, GLenum pname, GLfloat *params);
//void ( APIENTRY * glGetLightiv )(GLenum light, GLenum pname, GLint *params);
//void ( APIENTRY * glGetMapdv )(GLenum target, GLenum query, GLdouble *v);
//void ( APIENTRY * glGetMapfv )(GLenum target, GLenum query, GLfloat *v);
//void ( APIENTRY * glGetMapiv )(GLenum target, GLenum query, GLint *v);
//void ( APIENTRY * glGetMaterialfv )(GLenum face, GLenum pname, GLfloat *params);
//void ( APIENTRY * glGetMaterialiv )(GLenum face, GLenum pname, GLint *params);
//void ( APIENTRY * glGetPixelMapfv )(GLenum map, GLfloat *values);
//void ( APIENTRY * glGetPixelMapuiv )(GLenum map, GLuint *values);
//void ( APIENTRY * glGetPixelMapusv )(GLenum map, GLushort *values);
//void ( APIENTRY * glGetPointerv )(GLenum pname, GLvoid* *params);
//void ( APIENTRY * glGetPolygonStipple )(GLubyte *mask);
//const GLubyte * ( APIENTRY * glGetString )(GLenum name);
//void ( APIENTRY * glGetTexEnvfv )(GLenum target, GLenum pname, GLfloat *params);
//void ( APIENTRY * glGetTexEnviv )(GLenum target, GLenum pname, GLint *params);
//void ( APIENTRY * glGetTexGendv )(GLenum coord, GLenum pname, GLdouble *params);
//void ( APIENTRY * glGetTexGenfv )(GLenum coord, GLenum pname, GLfloat *params);
//void ( APIENTRY * glGetTexGeniv )(GLenum coord, GLenum pname, GLint *params);
//void ( APIENTRY * glGetTexImage )(GLenum target, GLint level, GLenum format, GLenum type, GLvoid *pixels);
//void ( APIENTRY * glGetTexLevelParameterfv )(GLenum target, GLint level, GLenum pname, GLfloat *params);
//void ( APIENTRY * glGetTexLevelParameteriv )(GLenum target, GLint level, GLenum pname, GLint *params);
//void ( APIENTRY * glGetTexParameterfv )(GLenum target, GLenum pname, GLfloat *params);
//void ( APIENTRY * glGetTexParameteriv )(GLenum target, GLenum pname, GLint *params);
//void ( APIENTRY * glHint )(GLenum target, GLenum mode);
//void ( APIENTRY * glIndexMask )(GLuint mask);
//void ( APIENTRY * glIndexPointer )(GLenum type, GLsizei stride, const GLvoid *pointer);
//void ( APIENTRY * glIndexd )(GLdouble c);
//void ( APIENTRY * glIndexdv )(const GLdouble *c);
//void ( APIENTRY * glIndexf )(GLfloat c);
//void ( APIENTRY * glIndexfv )(const GLfloat *c);
//void ( APIENTRY * glIndexi )(GLint c);
//void ( APIENTRY * glIndexiv )(const GLint *c);
//void ( APIENTRY * glIndexs )(GLshort c);
//void ( APIENTRY * glIndexsv )(const GLshort *c);
//void ( APIENTRY * glIndexub )(GLubyte c);
//void ( APIENTRY * glIndexubv )(const GLubyte *c);
//void ( APIENTRY * glInitNames )(void);
//void ( APIENTRY * glInterleavedArrays )(GLenum format, GLsizei stride, const GLvoid *pointer);
//GLboolean ( APIENTRY * glIsEnabled )(GLenum cap);
//GLboolean ( APIENTRY * glIsList )(GLuint list);
//GLboolean ( APIENTRY * glIsTexture )(GLuint texture);
//void ( APIENTRY * glLightModelf )(GLenum pname, GLfloat param);
//void ( APIENTRY * glLightModelfv )(GLenum pname, const GLfloat *params);
//void ( APIENTRY * glLightModeli )(GLenum pname, GLint param);
//void ( APIENTRY * glLightModeliv )(GLenum pname, const GLint *params);
//void ( APIENTRY * glLightf )(GLenum light, GLenum pname, GLfloat param);
//void ( APIENTRY * glLightfv )(GLenum light, GLenum pname, const GLfloat *params);
//void ( APIENTRY * glLighti )(GLenum light, GLenum pname, GLint param);
//void ( APIENTRY * glLightiv )(GLenum light, GLenum pname, const GLint *params);
//void ( APIENTRY * glLineStipple )(GLint factor, GLushort pattern);
//void ( APIENTRY * glLineWidth )(GLfloat width);
//void ( APIENTRY * glListBase )(GLuint base);
//void ( APIENTRY * glLoadIdentity )(void);
//void ( APIENTRY * glLoadMatrixd )(const GLdouble *m);
//void ( APIENTRY * glLoadMatrixf )(const GLfloat *m);
//void ( APIENTRY * glLoadName )(GLuint name);
//void ( APIENTRY * glLogicOp )(GLenum opcode);
//void ( APIENTRY * glMap1d )(GLenum target, GLdouble u1, GLdouble u2, GLint stride, GLint order, const GLdouble *points);
//void ( APIENTRY * glMap1f )(GLenum target, GLfloat u1, GLfloat u2, GLint stride, GLint order, const GLfloat *points);
//void ( APIENTRY * glMap2d )(GLenum target, GLdouble u1, GLdouble u2, GLint ustride, GLint uorder, GLdouble v1, GLdouble v2, GLint vstride, GLint vorder, const GLdouble *points);
//void ( APIENTRY * glMap2f )(GLenum target, GLfloat u1, GLfloat u2, GLint ustride, GLint uorder, GLfloat v1, GLfloat v2, GLint vstride, GLint vorder, const GLfloat *points);
//void ( APIENTRY * glMapGrid1d )(GLint un, GLdouble u1, GLdouble u2);
//void ( APIENTRY * glMapGrid1f )(GLint un, GLfloat u1, GLfloat u2);
//void ( APIENTRY * glMapGrid2d )(GLint un, GLdouble u1, GLdouble u2, GLint vn, GLdouble v1, GLdouble v2);
//void ( APIENTRY * glMapGrid2f )(GLint un, GLfloat u1, GLfloat u2, GLint vn, GLfloat v1, GLfloat v2);
//void ( APIENTRY * glMaterialf )(GLenum face, GLenum pname, GLfloat param);
//void ( APIENTRY * glMaterialfv )(GLenum face, GLenum pname, const GLfloat *params);
//void ( APIENTRY * glMateriali )(GLenum face, GLenum pname, GLint param);
//void ( APIENTRY * glMaterialiv )(GLenum face, GLenum pname, const GLint *params);
//void ( APIENTRY * glMatrixMode )(GLenum mode);
//void ( APIENTRY * glMultMatrixd )(const GLdouble *m);
//void ( APIENTRY * glMultMatrixf )(const GLfloat *m);
//void ( APIENTRY * glNewList )(GLuint list, GLenum mode);
//void ( APIENTRY * glNormal3b )(GLbyte nx, GLbyte ny, GLbyte nz);
//void ( APIENTRY * glNormal3bv )(const GLbyte *v);
//void ( APIENTRY * glNormal3d )(GLdouble nx, GLdouble ny, GLdouble nz);
//void ( APIENTRY * glNormal3dv )(const GLdouble *v);
//void ( APIENTRY * glNormal3f )(GLfloat nx, GLfloat ny, GLfloat nz);
//void ( APIENTRY * glNormal3fv )(const GLfloat *v);
//void ( APIENTRY * glNormal3i )(GLint nx, GLint ny, GLint nz);
//void ( APIENTRY * glNormal3iv )(const GLint *v);
//void ( APIENTRY * glNormal3s )(GLshort nx, GLshort ny, GLshort nz);
//void ( APIENTRY * glNormal3sv )(const GLshort *v);
//void ( APIENTRY * glNormalPointer )(GLenum type, GLsizei stride, const GLvoid *pointer);
//void ( APIENTRY * glOrtho )(GLdouble left, GLdouble right, GLdouble bottom, GLdouble top, GLdouble zNear, GLdouble zFar);
//void ( APIENTRY * glPassThrough )(GLfloat token);
//void ( APIENTRY * glPixelMapfv )(GLenum map, GLsizei mapsize, const GLfloat *values);
//void ( APIENTRY * glPixelMapuiv )(GLenum map, GLsizei mapsize, const GLuint *values);
//void ( APIENTRY * glPixelMapusv )(GLenum map, GLsizei mapsize, const GLushort *values);
//void ( APIENTRY * glPixelStoref )(GLenum pname, GLfloat param);
//void ( APIENTRY * glPixelStorei )(GLenum pname, GLint param);
//void ( APIENTRY * glPixelTransferf )(GLenum pname, GLfloat param);
//void ( APIENTRY * glPixelTransferi )(GLenum pname, GLint param);
//void ( APIENTRY * glPixelZoom )(GLfloat xfactor, GLfloat yfactor);
//void ( APIENTRY * glPointSize )(GLfloat size);
//void ( APIENTRY * glPolygonMode )(GLenum face, GLenum mode);
//void ( APIENTRY * glPolygonOffset )(GLfloat factor, GLfloat units);
//void ( APIENTRY * glPolygonStipple )(const GLubyte *mask);
//void ( APIENTRY * glPopAttrib )(void);
//void ( APIENTRY * glPopClientAttrib )(void);
//void ( APIENTRY * glPopMatrix )(void);
//void ( APIENTRY * glPopName )(void);
//void ( APIENTRY * glPrioritizeTextures )(GLsizei n, const GLuint *textures, const GLclampf *priorities);
//void ( APIENTRY * glPushAttrib )(GLbitfield mask);
//void ( APIENTRY * glPushClientAttrib )(GLbitfield mask);
//void ( APIENTRY * glPushMatrix )(void);
//void ( APIENTRY * glPushName )(GLuint name);
//void ( APIENTRY * glRasterPos2d )(GLdouble x, GLdouble y);
//void ( APIENTRY * glRasterPos2dv )(const GLdouble *v);
//void ( APIENTRY * glRasterPos2f )(GLfloat x, GLfloat y);
//void ( APIENTRY * glRasterPos2fv )(const GLfloat *v);
//void ( APIENTRY * glRasterPos2i )(GLint x, GLint y);
//void ( APIENTRY * glRasterPos2iv )(const GLint *v);
//void ( APIENTRY * glRasterPos2s )(GLshort x, GLshort y);
//void ( APIENTRY * glRasterPos2sv )(const GLshort *v);
//void ( APIENTRY * glRasterPos3d )(GLdouble x, GLdouble y, GLdouble z);
//void ( APIENTRY * glRasterPos3dv )(const GLdouble *v);
//void ( APIENTRY * glRasterPos3f )(GLfloat x, GLfloat y, GLfloat z);
//void ( APIENTRY * glRasterPos3fv )(const GLfloat *v);
//void ( APIENTRY * glRasterPos3i )(GLint x, GLint y, GLint z);
//void ( APIENTRY * glRasterPos3iv )(const GLint *v);
//void ( APIENTRY * glRasterPos3s )(GLshort x, GLshort y, GLshort z);
//void ( APIENTRY * glRasterPos3sv )(const GLshort *v);
//void ( APIENTRY * glRasterPos4d )(GLdouble x, GLdouble y, GLdouble z, GLdouble w);
//void ( APIENTRY * glRasterPos4dv )(const GLdouble *v);
//void ( APIENTRY * glRasterPos4f )(GLfloat x, GLfloat y, GLfloat z, GLfloat w);
//void ( APIENTRY * glRasterPos4fv )(const GLfloat *v);
//void ( APIENTRY * glRasterPos4i )(GLint x, GLint y, GLint z, GLint w);
//void ( APIENTRY * glRasterPos4iv )(const GLint *v);
//void ( APIENTRY * glRasterPos4s )(GLshort x, GLshort y, GLshort z, GLshort w);
//void ( APIENTRY * glRasterPos4sv )(const GLshort *v);
//void ( APIENTRY * glReadBuffer )(GLenum mode);
//void ( APIENTRY * glReadPixels )(GLint x, GLint y, GLsizei width, GLsizei height, GLenum format, GLenum type, GLvoid *pixels);
//void ( APIENTRY * glRectd )(GLdouble x1, GLdouble y1, GLdouble x2, GLdouble y2);
//void ( APIENTRY * glRectdv )(const GLdouble *v1, const GLdouble *v2);
//void ( APIENTRY * glRectf )(GLfloat x1, GLfloat y1, GLfloat x2, GLfloat y2);
//void ( APIENTRY * glRectfv )(const GLfloat *v1, const GLfloat *v2);
//void ( APIENTRY * glRecti )(GLint x1, GLint y1, GLint x2, GLint y2);
//void ( APIENTRY * glRectiv )(const GLint *v1, const GLint *v2);
//void ( APIENTRY * glRects )(GLshort x1, GLshort y1, GLshort x2, GLshort y2);
//void ( APIENTRY * glRectsv )(const GLshort *v1, const GLshort *v2);
//GLint ( APIENTRY * glRenderMode )(GLenum mode);
//void ( APIENTRY * glRotated )(GLdouble angle, GLdouble x, GLdouble y, GLdouble z);
//void ( APIENTRY * glRotatef )(GLfloat angle, GLfloat x, GLfloat y, GLfloat z);
//void ( APIENTRY * glScaled )(GLdouble x, GLdouble y, GLdouble z);
//void ( APIENTRY * glScalef )(GLfloat x, GLfloat y, GLfloat z);
//void ( APIENTRY * glScissor )(GLint x, GLint y, GLsizei width, GLsizei height);
//void ( APIENTRY * glSelectBuffer )(GLsizei size, GLuint *buffer);
//void ( APIENTRY * glShadeModel )(GLenum mode);
//void ( APIENTRY * glStencilFunc )(GLenum func, GLint ref, GLuint mask);
//void ( APIENTRY * glStencilMask )(GLuint mask);
//void ( APIENTRY * glStencilOp )(GLenum fail, GLenum zfail, GLenum zpass);
//void ( APIENTRY * glTexCoord1d )(GLdouble s);
//void ( APIENTRY * glTexCoord1dv )(const GLdouble *v);
//void ( APIENTRY * glTexCoord1f )(GLfloat s);
//void ( APIENTRY * glTexCoord1fv )(const GLfloat *v);
//void ( APIENTRY * glTexCoord1i )(GLint s);
//void ( APIENTRY * glTexCoord1iv )(const GLint *v);
//void ( APIENTRY * glTexCoord1s )(GLshort s);
//void ( APIENTRY * glTexCoord1sv )(const GLshort *v);
//void ( APIENTRY * glTexCoord2d )(GLdouble s, GLdouble t);
//void ( APIENTRY * glTexCoord2dv )(const GLdouble *v);
//void ( APIENTRY * glTexCoord2f )(GLfloat s, GLfloat t);
//void ( APIENTRY * glTexCoord2fv )(const GLfloat *v);
//void ( APIENTRY * glTexCoord2i )(GLint s, GLint t);
//void ( APIENTRY * glTexCoord2iv )(const GLint *v);
//void ( APIENTRY * glTexCoord2s )(GLshort s, GLshort t);
//void ( APIENTRY * glTexCoord2sv )(const GLshort *v);
//void ( APIENTRY * glTexCoord3d )(GLdouble s, GLdouble t, GLdouble r);
//void ( APIENTRY * glTexCoord3dv )(const GLdouble *v);
//void ( APIENTRY * glTexCoord3f )(GLfloat s, GLfloat t, GLfloat r);
//void ( APIENTRY * glTexCoord3fv )(const GLfloat *v);
//void ( APIENTRY * glTexCoord3i )(GLint s, GLint t, GLint r);
//void ( APIENTRY * glTexCoord3iv )(const GLint *v);
//void ( APIENTRY * glTexCoord3s )(GLshort s, GLshort t, GLshort r);
//void ( APIENTRY * glTexCoord3sv )(const GLshort *v);
//void ( APIENTRY * glTexCoord4d )(GLdouble s, GLdouble t, GLdouble r, GLdouble q);
//void ( APIENTRY * glTexCoord4dv )(const GLdouble *v);
//void ( APIENTRY * glTexCoord4f )(GLfloat s, GLfloat t, GLfloat r, GLfloat q);
//void ( APIENTRY * glTexCoord4fv )(const GLfloat *v);
//void ( APIENTRY * glTexCoord4i )(GLint s, GLint t, GLint r, GLint q);
//void ( APIENTRY * glTexCoord4iv )(const GLint *v);
//void ( APIENTRY * glTexCoord4s )(GLshort s, GLshort t, GLshort r, GLshort q);
//void ( APIENTRY * glTexCoord4sv )(const GLshort *v);
//void ( APIENTRY * glTexCoordPointer )(GLint size, GLenum type, GLsizei stride, const GLvoid *pointer);
//void ( APIENTRY * glTexEnvf )(GLenum target, GLenum pname, GLfloat param);
//void ( APIENTRY * glTexEnvfv )(GLenum target, GLenum pname, const GLfloat *params);
//void ( APIENTRY * glTexEnvi )(GLenum target, GLenum pname, GLint param);
//void ( APIENTRY * glTexEnviv )(GLenum target, GLenum pname, const GLint *params);
//void ( APIENTRY * glTexGend )(GLenum coord, GLenum pname, GLdouble param);
//void ( APIENTRY * glTexGendv )(GLenum coord, GLenum pname, const GLdouble *params);
//void ( APIENTRY * glTexGenf )(GLenum coord, GLenum pname, GLfloat param);
//void ( APIENTRY * glTexGenfv )(GLenum coord, GLenum pname, const GLfloat *params);
//void ( APIENTRY * glTexGeni )(GLenum coord, GLenum pname, GLint param);
//void ( APIENTRY * glTexGeniv )(GLenum coord, GLenum pname, const GLint *params);
//void ( APIENTRY * glTexImage1D )(GLenum target, GLint level, GLint internalformat, GLsizei width, GLint border, GLenum format, GLenum type, const GLvoid *pixels);
//void ( APIENTRY * glTexImage2D )(GLenum target, GLint level, GLint internalformat, GLsizei width, GLsizei height, GLint border, GLenum format, GLenum type, const GLvoid *pixels);
//void ( APIENTRY * glTexParameterf )(GLenum target, GLenum pname, GLfloat param);
//void ( APIENTRY * glTexParameterfv )(GLenum target, GLenum pname, const GLfloat *params);
//void ( APIENTRY * glTexParameteri )(GLenum target, GLenum pname, GLint param);
//void ( APIENTRY * glTexParameteriv )(GLenum target, GLenum pname, const GLint *params);
//void ( APIENTRY * glTexSubImage1D )(GLenum target, GLint level, GLint xoffset, GLsizei width, GLenum format, GLenum type, const GLvoid *pixels);
//void ( APIENTRY * glTexSubImage2D )(GLenum target, GLint level, GLint xoffset, GLint yoffset, GLsizei width, GLsizei height, GLenum format, GLenum type, const GLvoid *pixels);
//void ( APIENTRY * glTranslated )(GLdouble x, GLdouble y, GLdouble z);
//void ( APIENTRY * glTranslatef )(GLfloat x, GLfloat y, GLfloat z);
//void ( APIENTRY * glVertex2d )(GLdouble x, GLdouble y);
//void ( APIENTRY * glVertex2dv )(const GLdouble *v);
//void ( APIENTRY * glVertex2f )(GLfloat x, GLfloat y);
//void ( APIENTRY * glVertex2fv )(const GLfloat *v);
//void ( APIENTRY * glVertex2i )(GLint x, GLint y);
//void ( APIENTRY * glVertex2iv )(const GLint *v);
//void ( APIENTRY * glVertex2s )(GLshort x, GLshort y);
//void ( APIENTRY * glVertex2sv )(const GLshort *v);
//void ( APIENTRY * glVertex3d )(GLdouble x, GLdouble y, GLdouble z);
//void ( APIENTRY * glVertex3dv )(const GLdouble *v);
//void ( APIENTRY * glVertex3f )(GLfloat x, GLfloat y, GLfloat z);
//void ( APIENTRY * glVertex3fv )(const GLfloat *v);
//void ( APIENTRY * glVertex3i )(GLint x, GLint y, GLint z);
//void ( APIENTRY * glVertex3iv )(const GLint *v);
//void ( APIENTRY * glVertex3s )(GLshort x, GLshort y, GLshort z);
//void ( APIENTRY * glVertex3sv )(const GLshort *v);
//void ( APIENTRY * glVertex4d )(GLdouble x, GLdouble y, GLdouble z, GLdouble w);
//void ( APIENTRY * glVertex4dv )(const GLdouble *v);
//void ( APIENTRY * glVertex4f )(GLfloat x, GLfloat y, GLfloat z, GLfloat w);
//void ( APIENTRY * glVertex4fv )(const GLfloat *v);
//void ( APIENTRY * glVertex4i )(GLint x, GLint y, GLint z, GLint w);
//void ( APIENTRY * glVertex4iv )(const GLint *v);
//void ( APIENTRY * glVertex4s )(GLshort x, GLshort y, GLshort z, GLshort w);
//void ( APIENTRY * glVertex4sv )(const GLshort *v);
//void ( APIENTRY * glVertexPointer )(GLint size, GLenum type, GLsizei stride, const GLvoid *pointer);
//void ( APIENTRY * glViewport )(GLint x, GLint y, GLsizei width, GLsizei height);
//
//
//
//static void ( APIENTRY * dllAccum )(GLenum op, GLfloat value);
//static void ( APIENTRY * dllAlphaFunc )(GLenum func, GLclampf ref);
//GLboolean ( APIENTRY * dllAreTexturesResident )(GLsizei n, const GLuint *textures, GLboolean *residences);
//static void ( APIENTRY * dllArrayElement )(GLint i);
//static void ( APIENTRY * dllBegin )(GLenum mode);
//static void ( APIENTRY * dllBindTexture )(GLenum target, GLuint texture);
//static void ( APIENTRY * dllBitmap )(GLsizei width, GLsizei height, GLfloat xorig, GLfloat yorig, GLfloat xmove, GLfloat ymove, const GLubyte *bitmap);
//static void ( APIENTRY * dllBlendFunc )(GLenum sfactor, GLenum dfactor);
//static void ( APIENTRY * dllCallList )(GLuint list);
//static void ( APIENTRY * dllCallLists )(GLsizei n, GLenum type, const GLvoid *lists);
//static void ( APIENTRY * dllClear )(GLbitfield mask);
//static void ( APIENTRY * dllClearAccum )(GLfloat red, GLfloat green, GLfloat blue, GLfloat alpha);
//static void ( APIENTRY * dllClearColor )(GLclampf red, GLclampf green, GLclampf blue, GLclampf alpha);
//static void ( APIENTRY * dllClearDepth )(GLclampd depth);
//static void ( APIENTRY * dllClearIndex )(GLfloat c);
//static void ( APIENTRY * dllClearStencil )(GLint s);
//static void ( APIENTRY * dllClipPlane )(GLenum plane, const GLdouble *equation);
//static void ( APIENTRY * dllColor3b )(GLbyte red, GLbyte green, GLbyte blue);
//static void ( APIENTRY * dllColor3bv )(const GLbyte *v);
//static void ( APIENTRY * dllColor3d )(GLdouble red, GLdouble green, GLdouble blue);
//static void ( APIENTRY * dllColor3dv )(const GLdouble *v);
//static void ( APIENTRY * dllColor3f )(GLfloat red, GLfloat green, GLfloat blue);
//static void ( APIENTRY * dllColor3fv )(const GLfloat *v);
//static void ( APIENTRY * dllColor3i )(GLint red, GLint green, GLint blue);
//static void ( APIENTRY * dllColor3iv )(const GLint *v);
//static void ( APIENTRY * dllColor3s )(GLshort red, GLshort green, GLshort blue);
//static void ( APIENTRY * dllColor3sv )(const GLshort *v);
//static void ( APIENTRY * dllColor3ub )(GLubyte red, GLubyte green, GLubyte blue);
//static void ( APIENTRY * dllColor3ubv )(const GLubyte *v);
//static void ( APIENTRY * dllColor3ui )(GLuint red, GLuint green, GLuint blue);
//static void ( APIENTRY * dllColor3uiv )(const GLuint *v);
//static void ( APIENTRY * dllColor3us )(GLushort red, GLushort green, GLushort blue);
//static void ( APIENTRY * dllColor3usv )(const GLushort *v);
//static void ( APIENTRY * dllColor4b )(GLbyte red, GLbyte green, GLbyte blue, GLbyte alpha);
//static void ( APIENTRY * dllColor4bv )(const GLbyte *v);
//static void ( APIENTRY * dllColor4d )(GLdouble red, GLdouble green, GLdouble blue, GLdouble alpha);
//static void ( APIENTRY * dllColor4dv )(const GLdouble *v);
//static void ( APIENTRY * dllColor4f )(GLfloat red, GLfloat green, GLfloat blue, GLfloat alpha);
//static void ( APIENTRY * dllColor4fv )(const GLfloat *v);
//static void ( APIENTRY * dllColor4i )(GLint red, GLint green, GLint blue, GLint alpha);
//static void ( APIENTRY * dllColor4iv )(const GLint *v);
//static void ( APIENTRY * dllColor4s )(GLshort red, GLshort green, GLshort blue, GLshort alpha);
//static void ( APIENTRY * dllColor4sv )(const GLshort *v);
//static void ( APIENTRY * dllColor4ub )(GLubyte red, GLubyte green, GLubyte blue, GLubyte alpha);
//static void ( APIENTRY * dllColor4ubv )(const GLubyte *v);
//static void ( APIENTRY * dllColor4ui )(GLuint red, GLuint green, GLuint blue, GLuint alpha);
//static void ( APIENTRY * dllColor4uiv )(const GLuint *v);
//static void ( APIENTRY * dllColor4us )(GLushort red, GLushort green, GLushort blue, GLushort alpha);
//static void ( APIENTRY * dllColor4usv )(const GLushort *v);
//static void ( APIENTRY * dllColorMask )(GLboolean red, GLboolean green, GLboolean blue, GLboolean alpha);
//static void ( APIENTRY * dllColorMaterial )(GLenum face, GLenum mode);
//static void ( APIENTRY * dllColorPointer )(GLint size, GLenum type, GLsizei stride, const GLvoid *pointer);
//static void ( APIENTRY * dllCopyPixels )(GLint x, GLint y, GLsizei width, GLsizei height, GLenum type);
//static void ( APIENTRY * dllCopyTexImage1D )(GLenum target, GLint level, GLenum internalFormat, GLint x, GLint y, GLsizei width, GLint border);
//static void ( APIENTRY * dllCopyTexImage2D )(GLenum target, GLint level, GLenum internalFormat, GLint x, GLint y, GLsizei width, GLsizei height, GLint border);
//static void ( APIENTRY * dllCopyTexSubImage1D )(GLenum target, GLint level, GLint xoffset, GLint x, GLint y, GLsizei width);
//static void ( APIENTRY * dllCopyTexSubImage2D )(GLenum target, GLint level, GLint xoffset, GLint yoffset, GLint x, GLint y, GLsizei width, GLsizei height);
//static void ( APIENTRY * dllCullFace )(GLenum mode);
//static void ( APIENTRY * dllDeleteLists )(GLuint list, GLsizei range);
//static void ( APIENTRY * dllDeleteTextures )(GLsizei n, const GLuint *textures);
//static void ( APIENTRY * dllDepthFunc )(GLenum func);
//static void ( APIENTRY * dllDepthMask )(GLboolean flag);
//static void ( APIENTRY * dllDepthRange )(GLclampd zNear, GLclampd zFar);
//static void ( APIENTRY * dllDisable )(GLenum cap);
//static void ( APIENTRY * dllDisableClientState )(GLenum array);
//static void ( APIENTRY * dllDrawArrays )(GLenum mode, GLint first, GLsizei count);
//static void ( APIENTRY * dllDrawBuffer )(GLenum mode);
//static void ( APIENTRY * dllDrawElements )(GLenum mode, GLsizei count, GLenum type, const GLvoid *indices);
//static void ( APIENTRY * dllDrawPixels )(GLsizei width, GLsizei height, GLenum format, GLenum type, const GLvoid *pixels);
//static void ( APIENTRY * dllEdgeFlag )(GLboolean flag);
//static void ( APIENTRY * dllEdgeFlagPointer )(GLsizei stride, const GLvoid *pointer);
//static void ( APIENTRY * dllEdgeFlagv )(const GLboolean *flag);
//static void ( APIENTRY * dllEnable )(GLenum cap);
//static void ( APIENTRY * dllEnableClientState )(GLenum array);
//static void ( APIENTRY * dllEnd )(void);
//static void ( APIENTRY * dllEndList )(void);
//static void ( APIENTRY * dllEvalCoord1d )(GLdouble u);
//static void ( APIENTRY * dllEvalCoord1dv )(const GLdouble *u);
//static void ( APIENTRY * dllEvalCoord1f )(GLfloat u);
//static void ( APIENTRY * dllEvalCoord1fv )(const GLfloat *u);
//static void ( APIENTRY * dllEvalCoord2d )(GLdouble u, GLdouble v);
//static void ( APIENTRY * dllEvalCoord2dv )(const GLdouble *u);
//static void ( APIENTRY * dllEvalCoord2f )(GLfloat u, GLfloat v);
//static void ( APIENTRY * dllEvalCoord2fv )(const GLfloat *u);
//static void ( APIENTRY * dllEvalMesh1 )(GLenum mode, GLint i1, GLint i2);
//static void ( APIENTRY * dllEvalMesh2 )(GLenum mode, GLint i1, GLint i2, GLint j1, GLint j2);
//static void ( APIENTRY * dllEvalPoint1 )(GLint i);
//static void ( APIENTRY * dllEvalPoint2 )(GLint i, GLint j);
//static void ( APIENTRY * dllFeedbackBuffer )(GLsizei size, GLenum type, GLfloat *buffer);
//static void ( APIENTRY * dllFinish )(void);
//static void ( APIENTRY * dllFlush )(void);
//static void ( APIENTRY * dllFogf )(GLenum pname, GLfloat param);
//static void ( APIENTRY * dllFogfv )(GLenum pname, const GLfloat *params);
//static void ( APIENTRY * dllFogi )(GLenum pname, GLint param);
//static void ( APIENTRY * dllFogiv )(GLenum pname, const GLint *params);
//static void ( APIENTRY * dllFrontFace )(GLenum mode);
//static void ( APIENTRY * dllFrustum )(GLdouble left, GLdouble right, GLdouble bottom, GLdouble top, GLdouble zNear, GLdouble zFar);
//GLuint ( APIENTRY * dllGenLists )(GLsizei range);
//static void ( APIENTRY * dllGenTextures )(GLsizei n, GLuint *textures);
//static void ( APIENTRY * dllGetBooleanv )(GLenum pname, GLboolean *params);
//static void ( APIENTRY * dllGetClipPlane )(GLenum plane, GLdouble *equation);
//static void ( APIENTRY * dllGetDoublev )(GLenum pname, GLdouble *params);
//GLenum ( APIENTRY * dllGetError )(void);
//static void ( APIENTRY * dllGetFloatv )(GLenum pname, GLfloat *params);
//static void ( APIENTRY * dllGetIntegerv )(GLenum pname, GLint *params);
//static void ( APIENTRY * dllGetLightfv )(GLenum light, GLenum pname, GLfloat *params);
//static void ( APIENTRY * dllGetLightiv )(GLenum light, GLenum pname, GLint *params);
//static void ( APIENTRY * dllGetMapdv )(GLenum target, GLenum query, GLdouble *v);
//static void ( APIENTRY * dllGetMapfv )(GLenum target, GLenum query, GLfloat *v);
//static void ( APIENTRY * dllGetMapiv )(GLenum target, GLenum query, GLint *v);
//static void ( APIENTRY * dllGetMaterialfv )(GLenum face, GLenum pname, GLfloat *params);
//static void ( APIENTRY * dllGetMaterialiv )(GLenum face, GLenum pname, GLint *params);
//static void ( APIENTRY * dllGetPixelMapfv )(GLenum map, GLfloat *values);
//static void ( APIENTRY * dllGetPixelMapuiv )(GLenum map, GLuint *values);
//static void ( APIENTRY * dllGetPixelMapusv )(GLenum map, GLushort *values);
//static void ( APIENTRY * dllGetPointerv )(GLenum pname, GLvoid* *params);
//static void ( APIENTRY * dllGetPolygonStipple )(GLubyte *mask);
//const GLubyte * ( APIENTRY * dllGetString )(GLenum name);
//static void ( APIENTRY * dllGetTexEnvfv )(GLenum target, GLenum pname, GLfloat *params);
//static void ( APIENTRY * dllGetTexEnviv )(GLenum target, GLenum pname, GLint *params);
//static void ( APIENTRY * dllGetTexGendv )(GLenum coord, GLenum pname, GLdouble *params);
//static void ( APIENTRY * dllGetTexGenfv )(GLenum coord, GLenum pname, GLfloat *params);
//static void ( APIENTRY * dllGetTexGeniv )(GLenum coord, GLenum pname, GLint *params);
//static void ( APIENTRY * dllGetTexImage )(GLenum target, GLint level, GLenum format, GLenum type, GLvoid *pixels);
//static void ( APIENTRY * dllGetTexLevelParameterfv )(GLenum target, GLint level, GLenum pname, GLfloat *params);
//static void ( APIENTRY * dllGetTexLevelParameteriv )(GLenum target, GLint level, GLenum pname, GLint *params);
//static void ( APIENTRY * dllGetTexParameterfv )(GLenum target, GLenum pname, GLfloat *params);
//static void ( APIENTRY * dllGetTexParameteriv )(GLenum target, GLenum pname, GLint *params);
//static void ( APIENTRY * dllHint )(GLenum target, GLenum mode);
//static void ( APIENTRY * dllIndexMask )(GLuint mask);
//static void ( APIENTRY * dllIndexPointer )(GLenum type, GLsizei stride, const GLvoid *pointer);
//static void ( APIENTRY * dllIndexd )(GLdouble c);
//static void ( APIENTRY * dllIndexdv )(const GLdouble *c);
//static void ( APIENTRY * dllIndexf )(GLfloat c);
//static void ( APIENTRY * dllIndexfv )(const GLfloat *c);
//static void ( APIENTRY * dllIndexi )(GLint c);
//static void ( APIENTRY * dllIndexiv )(const GLint *c);
//static void ( APIENTRY * dllIndexs )(GLshort c);
//static void ( APIENTRY * dllIndexsv )(const GLshort *c);
//static void ( APIENTRY * dllIndexub )(GLubyte c);
//static void ( APIENTRY * dllIndexubv )(const GLubyte *c);
//static void ( APIENTRY * dllInitNames )(void);
//static void ( APIENTRY * dllInterleavedArrays )(GLenum format, GLsizei stride, const GLvoid *pointer);
//GLboolean ( APIENTRY * dllIsEnabled )(GLenum cap);
//GLboolean ( APIENTRY * dllIsList )(GLuint list);
//GLboolean ( APIENTRY * dllIsTexture )(GLuint texture);
//static void ( APIENTRY * dllLightModelf )(GLenum pname, GLfloat param);
//static void ( APIENTRY * dllLightModelfv )(GLenum pname, const GLfloat *params);
//static void ( APIENTRY * dllLightModeli )(GLenum pname, GLint param);
//static void ( APIENTRY * dllLightModeliv )(GLenum pname, const GLint *params);
//static void ( APIENTRY * dllLightf )(GLenum light, GLenum pname, GLfloat param);
//static void ( APIENTRY * dllLightfv )(GLenum light, GLenum pname, const GLfloat *params);
//static void ( APIENTRY * dllLighti )(GLenum light, GLenum pname, GLint param);
//static void ( APIENTRY * dllLightiv )(GLenum light, GLenum pname, const GLint *params);
//static void ( APIENTRY * dllLineStipple )(GLint factor, GLushort pattern);
//static void ( APIENTRY * dllLineWidth )(GLfloat width);
//static void ( APIENTRY * dllListBase )(GLuint base);
//static void ( APIENTRY * dllLoadIdentity )(void);
//static void ( APIENTRY * dllLoadMatrixd )(const GLdouble *m);
//static void ( APIENTRY * dllLoadMatrixf )(const GLfloat *m);
//static void ( APIENTRY * dllLoadName )(GLuint name);
//static void ( APIENTRY * dllLogicOp )(GLenum opcode);
//static void ( APIENTRY * dllMap1d )(GLenum target, GLdouble u1, GLdouble u2, GLint stride, GLint order, const GLdouble *points);
//static void ( APIENTRY * dllMap1f )(GLenum target, GLfloat u1, GLfloat u2, GLint stride, GLint order, const GLfloat *points);
//static void ( APIENTRY * dllMap2d )(GLenum target, GLdouble u1, GLdouble u2, GLint ustride, GLint uorder, GLdouble v1, GLdouble v2, GLint vstride, GLint vorder, const GLdouble *points);
//static void ( APIENTRY * dllMap2f )(GLenum target, GLfloat u1, GLfloat u2, GLint ustride, GLint uorder, GLfloat v1, GLfloat v2, GLint vstride, GLint vorder, const GLfloat *points);
//static void ( APIENTRY * dllMapGrid1d )(GLint un, GLdouble u1, GLdouble u2);
//static void ( APIENTRY * dllMapGrid1f )(GLint un, GLfloat u1, GLfloat u2);
//static void ( APIENTRY * dllMapGrid2d )(GLint un, GLdouble u1, GLdouble u2, GLint vn, GLdouble v1, GLdouble v2);
//static void ( APIENTRY * dllMapGrid2f )(GLint un, GLfloat u1, GLfloat u2, GLint vn, GLfloat v1, GLfloat v2);
//static void ( APIENTRY * dllMaterialf )(GLenum face, GLenum pname, GLfloat param);
//static void ( APIENTRY * dllMaterialfv )(GLenum face, GLenum pname, const GLfloat *params);
//static void ( APIENTRY * dllMateriali )(GLenum face, GLenum pname, GLint param);
//static void ( APIENTRY * dllMaterialiv )(GLenum face, GLenum pname, const GLint *params);
//static void ( APIENTRY * dllMatrixMode )(GLenum mode);
//static void ( APIENTRY * dllMultMatrixd )(const GLdouble *m);
//static void ( APIENTRY * dllMultMatrixf )(const GLfloat *m);
//static void ( APIENTRY * dllNewList )(GLuint list, GLenum mode);
//static void ( APIENTRY * dllNormal3b )(GLbyte nx, GLbyte ny, GLbyte nz);
//static void ( APIENTRY * dllNormal3bv )(const GLbyte *v);
//static void ( APIENTRY * dllNormal3d )(GLdouble nx, GLdouble ny, GLdouble nz);
//static void ( APIENTRY * dllNormal3dv )(const GLdouble *v);
//static void ( APIENTRY * dllNormal3f )(GLfloat nx, GLfloat ny, GLfloat nz);
//static void ( APIENTRY * dllNormal3fv )(const GLfloat *v);
//static void ( APIENTRY * dllNormal3i )(GLint nx, GLint ny, GLint nz);
//static void ( APIENTRY * dllNormal3iv )(const GLint *v);
//static void ( APIENTRY * dllNormal3s )(GLshort nx, GLshort ny, GLshort nz);
//static void ( APIENTRY * dllNormal3sv )(const GLshort *v);
//static void ( APIENTRY * dllNormalPointer )(GLenum type, GLsizei stride, const GLvoid *pointer);
//static void ( APIENTRY * dllOrtho )(GLdouble left, GLdouble right, GLdouble bottom, GLdouble top, GLdouble zNear, GLdouble zFar);
//static void ( APIENTRY * dllPassThrough )(GLfloat token);
//static void ( APIENTRY * dllPixelMapfv )(GLenum map, GLsizei mapsize, const GLfloat *values);
//static void ( APIENTRY * dllPixelMapuiv )(GLenum map, GLsizei mapsize, const GLuint *values);
//static void ( APIENTRY * dllPixelMapusv )(GLenum map, GLsizei mapsize, const GLushort *values);
//static void ( APIENTRY * dllPixelStoref )(GLenum pname, GLfloat param);
//static void ( APIENTRY * dllPixelStorei )(GLenum pname, GLint param);
//static void ( APIENTRY * dllPixelTransferf )(GLenum pname, GLfloat param);
//static void ( APIENTRY * dllPixelTransferi )(GLenum pname, GLint param);
//static void ( APIENTRY * dllPixelZoom )(GLfloat xfactor, GLfloat yfactor);
//static void ( APIENTRY * dllPointSize )(GLfloat size);
//static void ( APIENTRY * dllPolygonMode )(GLenum face, GLenum mode);
//static void ( APIENTRY * dllPolygonOffset )(GLfloat factor, GLfloat units);
//static void ( APIENTRY * dllPolygonStipple )(const GLubyte *mask);
//static void ( APIENTRY * dllPopAttrib )(void);
//static void ( APIENTRY * dllPopClientAttrib )(void);
//static void ( APIENTRY * dllPopMatrix )(void);
//static void ( APIENTRY * dllPopName )(void);
//static void ( APIENTRY * dllPrioritizeTextures )(GLsizei n, const GLuint *textures, const GLclampf *priorities);
//static void ( APIENTRY * dllPushAttrib )(GLbitfield mask);
//static void ( APIENTRY * dllPushClientAttrib )(GLbitfield mask);
//static void ( APIENTRY * dllPushMatrix )(void);
//static void ( APIENTRY * dllPushName )(GLuint name);
//static void ( APIENTRY * dllRasterPos2d )(GLdouble x, GLdouble y);
//static void ( APIENTRY * dllRasterPos2dv )(const GLdouble *v);
//static void ( APIENTRY * dllRasterPos2f )(GLfloat x, GLfloat y);
//static void ( APIENTRY * dllRasterPos2fv )(const GLfloat *v);
//static void ( APIENTRY * dllRasterPos2i )(GLint x, GLint y);
//static void ( APIENTRY * dllRasterPos2iv )(const GLint *v);
//static void ( APIENTRY * dllRasterPos2s )(GLshort x, GLshort y);
//static void ( APIENTRY * dllRasterPos2sv )(const GLshort *v);
//static void ( APIENTRY * dllRasterPos3d )(GLdouble x, GLdouble y, GLdouble z);
//static void ( APIENTRY * dllRasterPos3dv )(const GLdouble *v);
//static void ( APIENTRY * dllRasterPos3f )(GLfloat x, GLfloat y, GLfloat z);
//static void ( APIENTRY * dllRasterPos3fv )(const GLfloat *v);
//static void ( APIENTRY * dllRasterPos3i )(GLint x, GLint y, GLint z);
//static void ( APIENTRY * dllRasterPos3iv )(const GLint *v);
//static void ( APIENTRY * dllRasterPos3s )(GLshort x, GLshort y, GLshort z);
//static void ( APIENTRY * dllRasterPos3sv )(const GLshort *v);
//static void ( APIENTRY * dllRasterPos4d )(GLdouble x, GLdouble y, GLdouble z, GLdouble w);
//static void ( APIENTRY * dllRasterPos4dv )(const GLdouble *v);
//static void ( APIENTRY * dllRasterPos4f )(GLfloat x, GLfloat y, GLfloat z, GLfloat w);
//static void ( APIENTRY * dllRasterPos4fv )(const GLfloat *v);
//static void ( APIENTRY * dllRasterPos4i )(GLint x, GLint y, GLint z, GLint w);
//static void ( APIENTRY * dllRasterPos4iv )(const GLint *v);
//static void ( APIENTRY * dllRasterPos4s )(GLshort x, GLshort y, GLshort z, GLshort w);
//static void ( APIENTRY * dllRasterPos4sv )(const GLshort *v);
//static void ( APIENTRY * dllReadBuffer )(GLenum mode);
//static void ( APIENTRY * dllReadPixels )(GLint x, GLint y, GLsizei width, GLsizei height, GLenum format, GLenum type, GLvoid *pixels);
//static void ( APIENTRY * dllRectd )(GLdouble x1, GLdouble y1, GLdouble x2, GLdouble y2);
//static void ( APIENTRY * dllRectdv )(const GLdouble *v1, const GLdouble *v2);
//static void ( APIENTRY * dllRectf )(GLfloat x1, GLfloat y1, GLfloat x2, GLfloat y2);
//static void ( APIENTRY * dllRectfv )(const GLfloat *v1, const GLfloat *v2);
//static void ( APIENTRY * dllRecti )(GLint x1, GLint y1, GLint x2, GLint y2);
//static void ( APIENTRY * dllRectiv )(const GLint *v1, const GLint *v2);
//static void ( APIENTRY * dllRects )(GLshort x1, GLshort y1, GLshort x2, GLshort y2);
//static void ( APIENTRY * dllRectsv )(const GLshort *v1, const GLshort *v2);
//GLint ( APIENTRY * dllRenderMode )(GLenum mode);
//static void ( APIENTRY * dllRotated )(GLdouble angle, GLdouble x, GLdouble y, GLdouble z);
//static void ( APIENTRY * dllRotatef )(GLfloat angle, GLfloat x, GLfloat y, GLfloat z);
//static void ( APIENTRY * dllScaled )(GLdouble x, GLdouble y, GLdouble z);
//static void ( APIENTRY * dllScalef )(GLfloat x, GLfloat y, GLfloat z);
//static void ( APIENTRY * dllScissor )(GLint x, GLint y, GLsizei width, GLsizei height);
//static void ( APIENTRY * dllSelectBuffer )(GLsizei size, GLuint *buffer);
//static void ( APIENTRY * dllShadeModel )(GLenum mode);
//static void ( APIENTRY * dllStencilFunc )(GLenum func, GLint ref, GLuint mask);
//static void ( APIENTRY * dllStencilMask )(GLuint mask);
//static void ( APIENTRY * dllStencilOp )(GLenum fail, GLenum zfail, GLenum zpass);
//static void ( APIENTRY * dllTexCoord1d )(GLdouble s);
//static void ( APIENTRY * dllTexCoord1dv )(const GLdouble *v);
//static void ( APIENTRY * dllTexCoord1f )(GLfloat s);
//static void ( APIENTRY * dllTexCoord1fv )(const GLfloat *v);
//static void ( APIENTRY * dllTexCoord1i )(GLint s);
//static void ( APIENTRY * dllTexCoord1iv )(const GLint *v);
//static void ( APIENTRY * dllTexCoord1s )(GLshort s);
//static void ( APIENTRY * dllTexCoord1sv )(const GLshort *v);
//static void ( APIENTRY * dllTexCoord2d )(GLdouble s, GLdouble t);
//static void ( APIENTRY * dllTexCoord2dv )(const GLdouble *v);
//static void ( APIENTRY * dllTexCoord2f )(GLfloat s, GLfloat t);
//static void ( APIENTRY * dllTexCoord2fv )(const GLfloat *v);
//static void ( APIENTRY * dllTexCoord2i )(GLint s, GLint t);
//static void ( APIENTRY * dllTexCoord2iv )(const GLint *v);
//static void ( APIENTRY * dllTexCoord2s )(GLshort s, GLshort t);
//static void ( APIENTRY * dllTexCoord2sv )(const GLshort *v);
//static void ( APIENTRY * dllTexCoord3d )(GLdouble s, GLdouble t, GLdouble r);
//static void ( APIENTRY * dllTexCoord3dv )(const GLdouble *v);
//static void ( APIENTRY * dllTexCoord3f )(GLfloat s, GLfloat t, GLfloat r);
//static void ( APIENTRY * dllTexCoord3fv )(const GLfloat *v);
//static void ( APIENTRY * dllTexCoord3i )(GLint s, GLint t, GLint r);
//static void ( APIENTRY * dllTexCoord3iv )(const GLint *v);
//static void ( APIENTRY * dllTexCoord3s )(GLshort s, GLshort t, GLshort r);
//static void ( APIENTRY * dllTexCoord3sv )(const GLshort *v);
//static void ( APIENTRY * dllTexCoord4d )(GLdouble s, GLdouble t, GLdouble r, GLdouble q);
//static void ( APIENTRY * dllTexCoord4dv )(const GLdouble *v);
//static void ( APIENTRY * dllTexCoord4f )(GLfloat s, GLfloat t, GLfloat r, GLfloat q);
//static void ( APIENTRY * dllTexCoord4fv )(const GLfloat *v);
//static void ( APIENTRY * dllTexCoord4i )(GLint s, GLint t, GLint r, GLint q);
//static void ( APIENTRY * dllTexCoord4iv )(const GLint *v);
//static void ( APIENTRY * dllTexCoord4s )(GLshort s, GLshort t, GLshort r, GLshort q);
//static void ( APIENTRY * dllTexCoord4sv )(const GLshort *v);
//static void ( APIENTRY * dllTexCoordPointer )(GLint size, GLenum type, GLsizei stride, const GLvoid *pointer);
//static void ( APIENTRY * dllTexEnvf )(GLenum target, GLenum pname, GLfloat param);
//static void ( APIENTRY * dllTexEnvfv )(GLenum target, GLenum pname, const GLfloat *params);
//static void ( APIENTRY * dllTexEnvi )(GLenum target, GLenum pname, GLint param);
//static void ( APIENTRY * dllTexEnviv )(GLenum target, GLenum pname, const GLint *params);
//static void ( APIENTRY * dllTexGend )(GLenum coord, GLenum pname, GLdouble param);
//static void ( APIENTRY * dllTexGendv )(GLenum coord, GLenum pname, const GLdouble *params);
//static void ( APIENTRY * dllTexGenf )(GLenum coord, GLenum pname, GLfloat param);
//static void ( APIENTRY * dllTexGenfv )(GLenum coord, GLenum pname, const GLfloat *params);
//static void ( APIENTRY * dllTexGeni )(GLenum coord, GLenum pname, GLint param);
//static void ( APIENTRY * dllTexGeniv )(GLenum coord, GLenum pname, const GLint *params);
//static void ( APIENTRY * dllTexImage1D )(GLenum target, GLint level, GLint internalformat, GLsizei width, GLint border, GLenum format, GLenum type, const GLvoid *pixels);
//static void ( APIENTRY * dllTexImage2D )(GLenum target, GLint level, GLint internalformat, GLsizei width, GLsizei height, GLint border, GLenum format, GLenum type, const GLvoid *pixels);
//static void ( APIENTRY * dllTexParameterf )(GLenum target, GLenum pname, GLfloat param);
//static void ( APIENTRY * dllTexParameterfv )(GLenum target, GLenum pname, const GLfloat *params);
//static void ( APIENTRY * dllTexParameteri )(GLenum target, GLenum pname, GLint param);
//static void ( APIENTRY * dllTexParameteriv )(GLenum target, GLenum pname, const GLint *params);
//static void ( APIENTRY * dllTexSubImage1D )(GLenum target, GLint level, GLint xoffset, GLsizei width, GLenum format, GLenum type, const GLvoid *pixels);
//static void ( APIENTRY * dllTexSubImage2D )(GLenum target, GLint level, GLint xoffset, GLint yoffset, GLsizei width, GLsizei height, GLenum format, GLenum type, const GLvoid *pixels);
//static void ( APIENTRY * dllTranslated )(GLdouble x, GLdouble y, GLdouble z);
//static void ( APIENTRY * dllTranslatef )(GLfloat x, GLfloat y, GLfloat z);
//static void ( APIENTRY * dllVertex2d )(GLdouble x, GLdouble y);
//static void ( APIENTRY * dllVertex2dv )(const GLdouble *v);
//static void ( APIENTRY * dllVertex2f )(GLfloat x, GLfloat y);
//static void ( APIENTRY * dllVertex2fv )(const GLfloat *v);
//static void ( APIENTRY * dllVertex2i )(GLint x, GLint y);
//static void ( APIENTRY * dllVertex2iv )(const GLint *v);
//static void ( APIENTRY * dllVertex2s )(GLshort x, GLshort y);
//static void ( APIENTRY * dllVertex2sv )(const GLshort *v);
//static void ( APIENTRY * dllVertex3d )(GLdouble x, GLdouble y, GLdouble z);
//static void ( APIENTRY * dllVertex3dv )(const GLdouble *v);
//static void ( APIENTRY * dllVertex3f )(GLfloat x, GLfloat y, GLfloat z);
//static void ( APIENTRY * dllVertex3fv )(const GLfloat *v);
//static void ( APIENTRY * dllVertex3i )(GLint x, GLint y, GLint z);
//static void ( APIENTRY * dllVertex3iv )(const GLint *v);
//static void ( APIENTRY * dllVertex3s )(GLshort x, GLshort y, GLshort z);
//static void ( APIENTRY * dllVertex3sv )(const GLshort *v);
//static void ( APIENTRY * dllVertex4d )(GLdouble x, GLdouble y, GLdouble z, GLdouble w);
//static void ( APIENTRY * dllVertex4dv )(const GLdouble *v);
//static void ( APIENTRY * dllVertex4f )(GLfloat x, GLfloat y, GLfloat z, GLfloat w);
//static void ( APIENTRY * dllVertex4fv )(const GLfloat *v);
//static void ( APIENTRY * dllVertex4i )(GLint x, GLint y, GLint z, GLint w);
//static void ( APIENTRY * dllVertex4iv )(const GLint *v);
//static void ( APIENTRY * dllVertex4s )(GLshort x, GLshort y, GLshort z, GLshort w);
//static void ( APIENTRY * dllVertex4sv )(const GLshort *v);
//static void ( APIENTRY * dllVertexPointer )(GLint size, GLenum type, GLsizei stride, const GLvoid *pointer);
//static void ( APIENTRY * dllViewport )(GLint x, GLint y, GLsizei width, GLsizei height);

typedef struct {
	GLenum	e;
	const char *name;
} glEnumName_t;

#define	DEF(x) { x, #x },
//
//glEnumName_t	glEnumNames[] = {
//DEF(GL_FALSE)
//DEF(GL_TRUE)
//
//	{ GL_BYTE, "GL_BYTE" },
//	{ GL_UNSIGNED_BYTE, "GL_UNSIGNED_BYTE" },
//	{ GL_SHORT, "GL_SHORT" },
//	{ GL_UNSIGNED_SHORT, "GL_UNSIGNED_SHORT" },
//	{ GL_INT, "GL_INT" },
//	{ GL_UNSIGNED_INT, "GL_UNSIGNED_INT" },
//	{ GL_FLOAT, "GL_FLOAT" },
//	{ GL_DOUBLE, "GL_DOUBLE" },
//
//	{ GL_TEXTURE_CUBE_MAP_EXT, "GL_TEXTURE_CUBE_MAP_EXT" },
//	{ GL_TEXTURE_3D, "GL_TEXTURE_3D" },
//	{ GL_TEXTURE_2D, "GL_TEXTURE_2D" },
//	{ GL_BLEND, "GL_BLEND" },
//	{ GL_DEPTH_TEST, "GL_DEPTH_TEST" },
//	{ GL_CULL_FACE, "GL_CULL_FACE" },
//	{ GL_CLIP_PLANE0, "GL_CLIP_PLANE0" },
//	{ GL_COLOR_ARRAY, "GL_COLOR_ARRAY" },
//	{ GL_TEXTURE_COORD_ARRAY, "GL_TEXTURE_COORD_ARRAY" },
//	{ GL_VERTEX_ARRAY, "GL_VERTEX_ARRAY" },
//	{ GL_ALPHA_TEST, "GL_ALPHA_TEST" },
//	{ GL_TEXTURE_GEN_S, "GL_TEXTURE_GEN_S" },
//	{ GL_TEXTURE_GEN_T, "GL_TEXTURE_GEN_T" },
//	{ GL_TEXTURE_GEN_R, "GL_TEXTURE_GEN_R" },
//	{ GL_TEXTURE_GEN_Q, "GL_TEXTURE_GEN_Q" },
//	{ GL_STENCIL_TEST, "GL_STENCIL_TEST" },
//	{ GL_POLYGON_OFFSET_FILL, "GL_POLYGON_OFFSET_FILL" },
//
//	{ GL_TRIANGLES,	"GL_TRIANGLES" },
//	{ GL_TRIANGLE_STRIP, "GL_TRIANGLE_STRIP" },
//	{ GL_TRIANGLE_FAN, "GL_TRIANGLE_FAN" },
//	{ GL_QUADS, "GL_QUADS" },
//	{ GL_QUAD_STRIP, "GL_QUAD_STRIP" },
//	{ GL_POLYGON, "GL_POLYGON" },
//	{ GL_POINTS, "GL_POINTS" },
//	{ GL_LINES, "GL_LINES" },
//	{ GL_LINE_STRIP, "GL_LINE_STRIP" },
//	{ GL_LINE_LOOP, "GL_LINE_LOOP" },
//
//	{ GL_ALWAYS, "GL_ALWAYS" },
//	{ GL_NEVER, "GL_NEVER" },
//	{ GL_LEQUAL, "GL_LEQUAL" },
//	{ GL_LESS, "GL_LESS" },
//	{ GL_EQUAL, "GL_EQUAL" },
//	{ GL_GREATER, "GL_GREATER" },
//	{ GL_GEQUAL, "GL_GEQUAL" },
//	{ GL_NOTEQUAL, "GL_NOTEQUAL" },
//
//	{ GL_ONE, "GL_ONE" },
//	{ GL_ZERO, "GL_ZERO" },
//	{ GL_SRC_ALPHA, "GL_SRC_ALPHA" },
//	{ GL_ONE_MINUS_SRC_ALPHA, "GL_ONE_MINUS_SRC_ALPHA" },
//	{ GL_DST_COLOR, "GL_DST_COLOR" },
//	{ GL_ONE_MINUS_DST_COLOR, "GL_ONE_MINUS_DST_COLOR" },
//	{ GL_DST_ALPHA, "GL_DST_ALPHA" },
//
//	{ GL_MODELVIEW, "GL_MODELVIEW" },
//	{ GL_PROJECTION, "GL_PROJECTION" },
//	{ GL_TEXTURE, "GL_TEXTURE" },

///* DrawBufferMode */
//DEF(GL_NONE)
//DEF(GL_FRONT_LEFT)
//DEF(GL_FRONT_RIGHT)
//DEF(GL_BACK_LEFT)
//DEF(GL_BACK_RIGHT)
//DEF(GL_FRONT)
//DEF(GL_BACK)
//DEF(GL_LEFT)
//DEF(GL_RIGHT)
//DEF(GL_FRONT_AND_BACK)
//DEF(GL_AUX0)
//DEF(GL_AUX1)
//DEF(GL_AUX2)
//DEF(GL_AUX3)
//
///* GetTarget */
//DEF(GL_CURRENT_COLOR)
//DEF(GL_CURRENT_INDEX)
//DEF(GL_CURRENT_NORMAL)
//DEF(GL_CURRENT_TEXTURE_COORDS)
//DEF(GL_CURRENT_RASTER_COLOR)
//DEF(GL_CURRENT_RASTER_INDEX)
//DEF(GL_CURRENT_RASTER_TEXTURE_COORDS)
//DEF(GL_CURRENT_RASTER_POSITION)
//DEF(GL_CURRENT_RASTER_POSITION_VALID)
//DEF(GL_CURRENT_RASTER_DISTANCE)
//DEF(GL_POINT_SMOOTH)
//DEF(GL_POINT_SIZE)
//DEF(GL_POINT_SIZE_RANGE)
//DEF(GL_POINT_SIZE_GRANULARITY)
//DEF(GL_LINE_SMOOTH)
//DEF(GL_LINE_WIDTH)
//DEF(GL_LINE_WIDTH_RANGE)
//DEF(GL_LINE_WIDTH_GRANULARITY)
//DEF(GL_LINE_STIPPLE)
//DEF(GL_LINE_STIPPLE_PATTERN)
//DEF(GL_LINE_STIPPLE_REPEAT)
//DEF(GL_LIST_MODE)
//DEF(GL_MAX_LIST_NESTING)
//DEF(GL_LIST_BASE)
//DEF(GL_LIST_INDEX)
//DEF(GL_POLYGON_MODE)
//DEF(GL_POLYGON_SMOOTH)
//DEF(GL_POLYGON_STIPPLE)
//DEF(GL_EDGE_FLAG)
//DEF(GL_CULL_FACE)
//DEF(GL_CULL_FACE_MODE)
//DEF(GL_FRONT_FACE)
//DEF(GL_LIGHTING)
//DEF(GL_LIGHT_MODEL_LOCAL_VIEWER)
//DEF(GL_LIGHT_MODEL_TWO_SIDE)
//DEF(GL_LIGHT_MODEL_AMBIENT)
//DEF(GL_SHADE_MODEL)
//DEF(GL_COLOR_MATERIAL_FACE)
//DEF(GL_COLOR_MATERIAL_PARAMETER)
//DEF(GL_COLOR_MATERIAL)
//DEF(GL_FOG)
//DEF(GL_FOG_INDEX)
//DEF(GL_FOG_DENSITY)
//DEF(GL_FOG_START)
//DEF(GL_FOG_END)
//DEF(GL_FOG_MODE)
//DEF(GL_FOG_COLOR)
//DEF(GL_DEPTH_RANGE)
//DEF(GL_DEPTH_TEST)
//DEF(GL_DEPTH_WRITEMASK)
//DEF(GL_DEPTH_CLEAR_VALUE)
//DEF(GL_DEPTH_FUNC)
//DEF(GL_ACCUM_CLEAR_VALUE)
//DEF(GL_STENCIL_TEST)
//DEF(GL_STENCIL_CLEAR_VALUE)
//DEF(GL_STENCIL_FUNC)
//DEF(GL_STENCIL_VALUE_MASK)
//DEF(GL_STENCIL_FAIL)
//DEF(GL_STENCIL_PASS_DEPTH_FAIL)
//DEF(GL_STENCIL_PASS_DEPTH_PASS)
//DEF(GL_STENCIL_REF)
//DEF(GL_STENCIL_WRITEMASK)
//DEF(GL_MATRIX_MODE)
//DEF(GL_NORMALIZE)
//DEF(GL_VIEWPORT)
//DEF(GL_MODELVIEW_STACK_DEPTH)
//DEF(GL_PROJECTION_STACK_DEPTH)
//DEF(GL_TEXTURE_STACK_DEPTH)
//DEF(GL_MODELVIEW_MATRIX)
//DEF(GL_PROJECTION_MATRIX)
//DEF(GL_TEXTURE_MATRIX)
//DEF(GL_ATTRIB_STACK_DEPTH)
//DEF(GL_CLIENT_ATTRIB_STACK_DEPTH)
//DEF(GL_ALPHA_TEST)
//DEF(GL_ALPHA_TEST_FUNC)
//DEF(GL_ALPHA_TEST_REF)
//DEF(GL_DITHER)
//DEF(GL_BLEND_DST)
//DEF(GL_BLEND_SRC)
//DEF(GL_BLEND)
//DEF(GL_LOGIC_OP_MODE)
//DEF(GL_INDEX_LOGIC_OP)
//DEF(GL_COLOR_LOGIC_OP)
//DEF(GL_AUX_BUFFERS)
//DEF(GL_DRAW_BUFFER)
//DEF(GL_READ_BUFFER)
//DEF(GL_SCISSOR_BOX)
//DEF(GL_SCISSOR_TEST)
//DEF(GL_INDEX_CLEAR_VALUE)
//DEF(GL_INDEX_WRITEMASK)
//DEF(GL_COLOR_CLEAR_VALUE)
//DEF(GL_COLOR_WRITEMASK)
//DEF(GL_INDEX_MODE)
//DEF(GL_RGBA_MODE)
//DEF(GL_DOUBLEBUFFER)
//DEF(GL_STEREO)
//DEF(GL_RENDER_MODE)
//DEF(GL_PERSPECTIVE_CORRECTION_HINT)
//DEF(GL_POINT_SMOOTH_HINT)
//DEF(GL_LINE_SMOOTH_HINT)
//DEF(GL_POLYGON_SMOOTH_HINT)
//DEF(GL_FOG_HINT)
//DEF(GL_TEXTURE_GEN_S)
//DEF(GL_TEXTURE_GEN_T)
//DEF(GL_TEXTURE_GEN_R)
//DEF(GL_TEXTURE_GEN_Q)
//DEF(GL_PIXEL_MAP_I_TO_I)
//DEF(GL_PIXEL_MAP_S_TO_S)
//DEF(GL_PIXEL_MAP_I_TO_R)
//DEF(GL_PIXEL_MAP_I_TO_G)
//DEF(GL_PIXEL_MAP_I_TO_B)
//DEF(GL_PIXEL_MAP_I_TO_A)
//DEF(GL_PIXEL_MAP_R_TO_R)
//DEF(GL_PIXEL_MAP_G_TO_G)
//DEF(GL_PIXEL_MAP_B_TO_B)
//DEF(GL_PIXEL_MAP_A_TO_A)
//DEF(GL_PIXEL_MAP_I_TO_I_SIZE)
//DEF(GL_PIXEL_MAP_S_TO_S_SIZE)
//DEF(GL_PIXEL_MAP_I_TO_R_SIZE)
//DEF(GL_PIXEL_MAP_I_TO_G_SIZE)
//DEF(GL_PIXEL_MAP_I_TO_B_SIZE)
//DEF(GL_PIXEL_MAP_I_TO_A_SIZE)
//DEF(GL_PIXEL_MAP_R_TO_R_SIZE)
//DEF(GL_PIXEL_MAP_G_TO_G_SIZE)
//DEF(GL_PIXEL_MAP_B_TO_B_SIZE)
//DEF(GL_PIXEL_MAP_A_TO_A_SIZE)
//DEF(GL_UNPACK_SWAP_BYTES)
//DEF(GL_UNPACK_LSB_FIRST)
//DEF(GL_UNPACK_ROW_LENGTH)
//DEF(GL_UNPACK_SKIP_ROWS)
//DEF(GL_UNPACK_SKIP_PIXELS)
//DEF(GL_UNPACK_ALIGNMENT)
//DEF(GL_PACK_SWAP_BYTES)
//DEF(GL_PACK_LSB_FIRST)
//DEF(GL_PACK_ROW_LENGTH)
//DEF(GL_PACK_SKIP_ROWS)
//DEF(GL_PACK_SKIP_PIXELS)
//DEF(GL_PACK_ALIGNMENT)
//DEF(GL_MAP_COLOR)
//DEF(GL_MAP_STENCIL)
//DEF(GL_INDEX_SHIFT)
//DEF(GL_INDEX_OFFSET)
//DEF(GL_RED_SCALE)
//DEF(GL_RED_BIAS)
//DEF(GL_ZOOM_X)
//DEF(GL_ZOOM_Y)
//DEF(GL_GREEN_SCALE)
//DEF(GL_GREEN_BIAS)
//DEF(GL_BLUE_SCALE)
//DEF(GL_BLUE_BIAS)
//DEF(GL_ALPHA_SCALE)
//DEF(GL_ALPHA_BIAS)
//DEF(GL_DEPTH_SCALE)
//DEF(GL_DEPTH_BIAS)
//DEF(GL_MAX_EVAL_ORDER)
//DEF(GL_MAX_LIGHTS)
//DEF(GL_MAX_CLIP_PLANES)
//DEF(GL_MAX_TEXTURE_SIZE)
//DEF(GL_MAX_PIXEL_MAP_TABLE)
//DEF(GL_MAX_ATTRIB_STACK_DEPTH)
//DEF(GL_MAX_MODELVIEW_STACK_DEPTH)
//DEF(GL_MAX_NAME_STACK_DEPTH)
//DEF(GL_MAX_PROJECTION_STACK_DEPTH)
//DEF(GL_MAX_TEXTURE_STACK_DEPTH)
//DEF(GL_MAX_VIEWPORT_DIMS)
//DEF(GL_MAX_CLIENT_ATTRIB_STACK_DEPTH)
//DEF(GL_SUBPIXEL_BITS)
//DEF(GL_INDEX_BITS)
//DEF(GL_RED_BITS)
//DEF(GL_GREEN_BITS)
//DEF(GL_BLUE_BITS)
//DEF(GL_ALPHA_BITS)
//DEF(GL_DEPTH_BITS)
//DEF(GL_STENCIL_BITS)
//DEF(GL_ACCUM_RED_BITS)
//DEF(GL_ACCUM_GREEN_BITS)
//DEF(GL_ACCUM_BLUE_BITS)
//DEF(GL_ACCUM_ALPHA_BITS)
//DEF(GL_NAME_STACK_DEPTH)
//DEF(GL_AUTO_NORMAL)
//DEF(GL_MAP1_COLOR_4)
//DEF(GL_MAP1_INDEX)
//DEF(GL_MAP1_NORMAL)
//DEF(GL_MAP1_TEXTURE_COORD_1)
//DEF(GL_MAP1_TEXTURE_COORD_2)
//DEF(GL_MAP1_TEXTURE_COORD_3)
//DEF(GL_MAP1_TEXTURE_COORD_4)
//DEF(GL_MAP1_VERTEX_3)
//DEF(GL_MAP1_VERTEX_4)
//DEF(GL_MAP2_COLOR_4)
//DEF(GL_MAP2_INDEX)
//DEF(GL_MAP2_NORMAL)
//DEF(GL_MAP2_TEXTURE_COORD_1)
//DEF(GL_MAP2_TEXTURE_COORD_2)
//DEF(GL_MAP2_TEXTURE_COORD_3)
//DEF(GL_MAP2_TEXTURE_COORD_4)
//DEF(GL_MAP2_VERTEX_3)
//DEF(GL_MAP2_VERTEX_4)
//DEF(GL_MAP1_GRID_DOMAIN)
//DEF(GL_MAP1_GRID_SEGMENTS)
//DEF(GL_MAP2_GRID_DOMAIN)
//DEF(GL_MAP2_GRID_SEGMENTS)
//DEF(GL_TEXTURE_1D)
//DEF(GL_TEXTURE_2D)
//DEF(GL_FEEDBACK_BUFFER_POINTER)
//DEF(GL_FEEDBACK_BUFFER_SIZE)
//DEF(GL_FEEDBACK_BUFFER_TYPE)
//DEF(GL_SELECTION_BUFFER_POINTER)
//DEF(GL_SELECTION_BUFFER_SIZE)
//
///* PixelCopyType */
//DEF(GL_COLOR)
//DEF(GL_DEPTH)
//DEF(GL_STENCIL)
//
///* PixelFormat */
//DEF(GL_COLOR_INDEX)
//DEF(GL_STENCIL_INDEX)
//DEF(GL_DEPTH_COMPONENT)
//DEF(GL_RED)
//DEF(GL_GREEN)
//DEF(GL_BLUE)
//DEF(GL_ALPHA)
//DEF(GL_RGB)
//DEF(GL_RGBA)
//DEF(GL_LUMINANCE)
//DEF(GL_LUMINANCE_ALPHA)
//
///* PixelMap */
///*      GL_PIXEL_MAP_I_TO_I */
///*      GL_PIXEL_MAP_S_TO_S */
///*      GL_PIXEL_MAP_I_TO_R */
///*      GL_PIXEL_MAP_I_TO_G */
///*      GL_PIXEL_MAP_I_TO_B */
///*      GL_PIXEL_MAP_I_TO_A */
///*      GL_PIXEL_MAP_R_TO_R */
///*      GL_PIXEL_MAP_G_TO_G */
///*      GL_PIXEL_MAP_B_TO_B */
///*      GL_PIXEL_MAP_A_TO_A */
//
///* PixelStore */
///*      GL_UNPACK_SWAP_BYTES */
///*      GL_UNPACK_LSB_FIRST */
///*      GL_UNPACK_ROW_LENGTH */
///*      GL_UNPACK_SKIP_ROWS */
///*      GL_UNPACK_SKIP_PIXELS */
///*      GL_UNPACK_ALIGNMENT */
///*      GL_PACK_SWAP_BYTES */
///*      GL_PACK_LSB_FIRST */
///*      GL_PACK_ROW_LENGTH */
///*      GL_PACK_SKIP_ROWS */
///*      GL_PACK_SKIP_PIXELS */
///*      GL_PACK_ALIGNMENT */
//
///* PixelTransfer */
///*      GL_MAP_COLOR */
///*      GL_MAP_STENCIL */
///*      GL_INDEX_SHIFT */
///*      GL_INDEX_OFFSET */
///*      GL_RED_SCALE */
///*      GL_RED_BIAS */
///*      GL_GREEN_SCALE */
///*      GL_GREEN_BIAS */
///*      GL_BLUE_SCALE */
///*      GL_BLUE_BIAS */
///*      GL_ALPHA_SCALE */
///*      GL_ALPHA_BIAS */
///*      GL_DEPTH_SCALE */
///*      GL_DEPTH_BIAS */
//
///* PixelType */
//DEF(GL_BITMAP)
///*      GL_BYTE */
///*      GL_UNSIGNED_BYTE */
///*      GL_SHORT */
///*      GL_UNSIGNED_SHORT */
///*      GL_INT */
///*      GL_UNSIGNED_INT */
///*      GL_FLOAT */
//
///* PolygonMode */
//DEF(GL_POINT)
//DEF(GL_LINE)
//DEF(GL_FILL)
//
///* RenderingMode */
//DEF(GL_RENDER)
//DEF(GL_FEEDBACK)
//DEF(GL_SELECT)
//
///* ShadingModel */
//DEF(GL_FLAT)
//DEF(GL_SMOOTH)
//
///* StencilOp */
///*      GL_ZERO */
//DEF(GL_KEEP)
//DEF(GL_REPLACE)
//DEF(GL_INCR)
//DEF(GL_DECR)
///*      GL_INVERT */
//
///* StringName */
//DEF(GL_VENDOR)
//DEF(GL_RENDERER)
//DEF(GL_VERSION)
//DEF(GL_EXTENSIONS)
//
///* TextureCoordName */
//DEF(GL_S)
//DEF(GL_T)
//DEF(GL_R)
//DEF(GL_Q)
//
///* TexCoordPointerType */
///*      GL_SHORT */
///*      GL_INT */
///*      GL_FLOAT */
///*      GL_DOUBLE */
//
///* TextureEnvMode */
//DEF(GL_MODULATE)
//DEF(GL_DECAL)
///*      GL_BLEND */
///*      GL_REPLACE */
//
///* TextureEnvParameter */
//DEF(GL_TEXTURE_ENV_MODE)
//DEF(GL_TEXTURE_ENV_COLOR)
//
///* TextureEnvTarget */
//DEF(GL_TEXTURE_ENV)
//
///* TextureGenMode */
//DEF(GL_EYE_LINEAR)
//DEF(GL_OBJECT_LINEAR)
//DEF(GL_SPHERE_MAP)
//
///* TextureGenParameter */
//DEF(GL_TEXTURE_GEN_MODE)
//DEF(GL_OBJECT_PLANE)
//DEF(GL_EYE_PLANE)
//
///* TextureMagFilter */
//DEF(GL_NEAREST)
//DEF(GL_LINEAR)
//
///* TextureMinFilter */
///*      GL_NEAREST */
///*      GL_LINEAR */
//DEF(GL_NEAREST_MIPMAP_NEAREST)
//DEF(GL_LINEAR_MIPMAP_NEAREST)
//DEF(GL_NEAREST_MIPMAP_LINEAR)
//DEF(GL_LINEAR_MIPMAP_LINEAR)
//
///* TextureParameterName */
//DEF(GL_TEXTURE_MAG_FILTER)
//DEF(GL_TEXTURE_MIN_FILTER)
//DEF(GL_TEXTURE_WRAP_S)
//DEF(GL_TEXTURE_WRAP_T)
///*      GL_TEXTURE_BORDER_COLOR */
///*      GL_TEXTURE_PRIORITY */
//
///* TextureTarget */
///*      GL_TEXTURE_1D */
///*      GL_TEXTURE_2D */
///*      GL_PROXY_TEXTURE_1D */
///*      GL_PROXY_TEXTURE_2D */
//
///* TextureWrapMode */
//DEF(GL_CLAMP)
//DEF(GL_REPEAT)
//
///* VertexPointerType */
///*      GL_SHORT */
///*      GL_INT */
///*      GL_FLOAT */
///*      GL_DOUBLE */
//
///* ClientAttribMask */
//DEF(GL_CLIENT_PIXEL_STORE_BIT)
//DEF(GL_CLIENT_VERTEX_ARRAY_BIT)
//DEF(GL_CLIENT_ALL_ATTRIB_BITS)
//
///* polygon_offset */
//DEF(GL_POLYGON_OFFSET_FACTOR)
//DEF(GL_POLYGON_OFFSET_UNITS)
//DEF(GL_POLYGON_OFFSET_POINT)
//DEF(GL_POLYGON_OFFSET_LINE)
//DEF(GL_POLYGON_OFFSET_FILL)
//
//	{ 0, NULL }
//};
//
//static const char *EnumString( GLenum t )
//{
//	static char buffer[8][1024];
//	static int index = 0;
//
//	for ( glEnumName_t *n = glEnumNames ; n->name ; n++ ) {
//		if ( t == n->e ) {
//			return n->name;
//		}
//	}
//
//	int oldIndex = index;
//	index = ( index + 1 ) & 7;
//	sprintf( buffer[oldIndex], "0x%x", t );
//
//	return buffer[oldIndex];
//}
//
//static const char *FloatData( const GLfloat *v, int count ) {
//	static char buffer[8][1024];
//	static int index = 0;
//	char *name;
//
//	name = buffer[index&7];
//	sprintf( name, "f%i", index );
//	index++;
//
//	fprintf( tr.logFile, "static float %s[%i] = {", name, count );
//	for( int i = 0 ; i < count ; i++ ) {
//		if ( i < count - 1 ) {
//			fprintf( tr.logFile, "%f,", v[i] );
//		} else {
//			fprintf( tr.logFile, "%f};\n", v[i] );
//		}
//	}
//
//	return name;
//}

#if 0

// TODO: support GLbitfield

static void APIENTRY logClear(GLbitfield mask)
{
	fprintf( tr.logFile, "glClear( 0 " );

	if ( mask & GL_COLOR_BUFFER_BIT )
		fprintf( tr.logFile, "| GL_COLOR_BUFFER_BIT " );
	if ( mask & GL_DEPTH_BUFFER_BIT )
		fprintf( tr.logFile, "| GL_DEPTH_BUFFER_BIT " );
	if ( mask & GL_STENCIL_BUFFER_BIT )
		fprintf( tr.logFile, "| GL_STENCIL_BUFFER_BIT " );
	if ( mask & GL_ACCUM_BUFFER_BIT )
		fprintf( tr.logFile, "| GL_ACCUM_BUFFER_BIT " );

	fprintf( tr.logFile, ");\n" );
	dllClear( mask );
}

#endif

//#include "gl_logfuncs.cpp"

/*
** QGL_Shutdown
**
** Unloads the specified DLL then nulls out all the proc pointers.  This
** is only called during a hard shutdown of the OGL subsystem (e.g. vid_restart).
*/
void QGL_Shutdown( void )
{
	common->Printf( "...shutting down QGL\n" );

	if ( win32.hinstOpenGL )
	{
		common->Printf( "...unloading OpenGL DLL\n" );
		FreeLibrary( win32.hinstOpenGL );
	}

	win32.hinstOpenGL = NULL;
/*
	glAccum                     = NULL;
	glAlphaFunc                 = NULL;
	glAreTexturesResident       = NULL;
	glArrayElement              = NULL;
	glBegin                     = NULL;
	glBindTexture               = NULL;
	glBitmap                    = NULL;
	glBlendFunc                 = NULL;
	glCallList                  = NULL;
	glCallLists                 = NULL;
	glClear                     = NULL;
	glClearAccum                = NULL;
	glClearColor                = NULL;
	glClearDepth                = NULL;
	glClearIndex                = NULL;
	glClearStencil              = NULL;
	glClipPlane                 = NULL;
	glColor3b                   = NULL;
	glColor3bv                  = NULL;
	glColor3d                   = NULL;
	glColor3dv                  = NULL;
	glColor3f                   = NULL;
	glColor3fv                  = NULL;
	glColor3i                   = NULL;
	glColor3iv                  = NULL;
	glColor3s                   = NULL;
	glColor3sv                  = NULL;
	glColor3ub                  = NULL;
	glColor3ubv                 = NULL;
	glColor3ui                  = NULL;
	glColor3uiv                 = NULL;
	glColor3us                  = NULL;
	glColor3usv                 = NULL;
	glColor4b                   = NULL;
	glColor4bv                  = NULL;
	glColor4d                   = NULL;
	glColor4dv                  = NULL;
	glColor4f                   = NULL;
	glColor4fv                  = NULL;
	glColor4i                   = NULL;
	glColor4iv                  = NULL;
	glColor4s                   = NULL;
	glColor4sv                  = NULL;
	glColor4ub                  = NULL;
	glColor4ubv                 = NULL;
	glColor4ui                  = NULL;
	glColor4uiv                 = NULL;
	glColor4us                  = NULL;
	glColor4usv                 = NULL;
	glColorMask                 = NULL;
	glColorMaterial             = NULL;
	glColorPointer              = NULL;
	glCopyPixels                = NULL;
	glCopyTexImage1D            = NULL;
	glCopyTexImage2D            = NULL;
	glCopyTexSubImage1D         = NULL;
	glCopyTexSubImage2D         = NULL;
	glCullFace                  = NULL;
	glDeleteLists               = NULL;
	glDeleteTextures            = NULL;
	glDepthFunc                 = NULL;
	glDepthMask                 = NULL;
	glDepthRange                = NULL;
	glDisable                   = NULL;
	glDisableClientState        = NULL;
	glDrawArrays                = NULL;
	glDrawBuffer                = NULL;
	glDrawElements              = NULL;
	glDrawPixels                = NULL;
	glEdgeFlag                  = NULL;
	glEdgeFlagPointer           = NULL;
	glEdgeFlagv                 = NULL;
	glEnable                    = NULL;
	glEnableClientState         = NULL;
	glEnd                       = NULL;
	glEndList                   = NULL;
	glEvalCoord1d               = NULL;
	glEvalCoord1dv              = NULL;
	glEvalCoord1f               = NULL;
	glEvalCoord1fv              = NULL;
	glEvalCoord2d               = NULL;
	glEvalCoord2dv              = NULL;
	glEvalCoord2f               = NULL;
	glEvalCoord2fv              = NULL;
	glEvalMesh1                 = NULL;
	glEvalMesh2                 = NULL;
	glEvalPoint1                = NULL;
	glEvalPoint2                = NULL;
	glFeedbackBuffer            = NULL;
	glFinish                    = NULL;
	glFlush                     = NULL;
	glFogf                      = NULL;
	glFogfv                     = NULL;
	glFogi                      = NULL;
	glFogiv                     = NULL;
	glFrontFace                 = NULL;
	glFrustum                   = NULL;
	glGenLists                  = NULL;
	glGenTextures               = NULL;
	glGetBooleanv               = NULL;
	glGetClipPlane              = NULL;
	glGetDoublev                = NULL;
	glGetError                  = NULL;
	glGetFloatv                 = NULL;
	glGetIntegerv               = NULL;
	glGetLightfv                = NULL;
	glGetLightiv                = NULL;
	glGetMapdv                  = NULL;
	glGetMapfv                  = NULL;
	glGetMapiv                  = NULL;
	glGetMaterialfv             = NULL;
	glGetMaterialiv             = NULL;
	glGetPixelMapfv             = NULL;
	glGetPixelMapuiv            = NULL;
	glGetPixelMapusv            = NULL;
	glGetPointerv               = NULL;
	glGetPolygonStipple         = NULL;
	glGetString                 = NULL;
	glGetTexEnvfv               = NULL;
	glGetTexEnviv               = NULL;
	glGetTexGendv               = NULL;
	glGetTexGenfv               = NULL;
	glGetTexGeniv               = NULL;
	glGetTexImage               = NULL;
	glGetTexLevelParameterfv    = NULL;
	glGetTexLevelParameteriv    = NULL;
	glGetTexParameterfv         = NULL;
	glGetTexParameteriv         = NULL;
	glHint                      = NULL;
	glIndexMask                 = NULL;
	glIndexPointer              = NULL;
	glIndexd                    = NULL;
	glIndexdv                   = NULL;
	glIndexf                    = NULL;
	glIndexfv                   = NULL;
	glIndexi                    = NULL;
	glIndexiv                   = NULL;
	glIndexs                    = NULL;
	glIndexsv                   = NULL;
	glIndexub                   = NULL;
	glIndexubv                  = NULL;
	glInitNames                 = NULL;
	glInterleavedArrays         = NULL;
	glIsEnabled                 = NULL;
	glIsList                    = NULL;
	glIsTexture                 = NULL;
	glLightModelf               = NULL;
	glLightModelfv              = NULL;
	glLightModeli               = NULL;
	glLightModeliv              = NULL;
	glLightf                    = NULL;
	glLightfv                   = NULL;
	glLighti                    = NULL;
	glLightiv                   = NULL;
	glLineStipple               = NULL;
	glLineWidth                 = NULL;
	glListBase                  = NULL;
	glLoadIdentity              = NULL;
	glLoadMatrixd               = NULL;
	glLoadMatrixf               = NULL;
	glLoadName                  = NULL;
	glLogicOp                   = NULL;
	glMap1d                     = NULL;
	glMap1f                     = NULL;
	glMap2d                     = NULL;
	glMap2f                     = NULL;
	glMapGrid1d                 = NULL;
	glMapGrid1f                 = NULL;
	glMapGrid2d                 = NULL;
	glMapGrid2f                 = NULL;
	glMaterialf                 = NULL;
	glMaterialfv                = NULL;
	glMateriali                 = NULL;
	glMaterialiv                = NULL;
	glMatrixMode                = NULL;
	glMultMatrixd               = NULL;
	glMultMatrixf               = NULL;
	glNewList                   = NULL;
	glNormal3b                  = NULL;
	glNormal3bv                 = NULL;
	glNormal3d                  = NULL;
	glNormal3dv                 = NULL;
	glNormal3f                  = NULL;
	glNormal3fv                 = NULL;
	glNormal3i                  = NULL;
	glNormal3iv                 = NULL;
	glNormal3s                  = NULL;
	glNormal3sv                 = NULL;
	glNormalPointer             = NULL;
	glOrtho                     = NULL;
	glPassThrough               = NULL;
	glPixelMapfv                = NULL;
	glPixelMapuiv               = NULL;
	glPixelMapusv               = NULL;
	glPixelStoref               = NULL;
	glPixelStorei               = NULL;
	glPixelTransferf            = NULL;
	glPixelTransferi            = NULL;
	glPixelZoom                 = NULL;
	glPointSize                 = NULL;
	glPolygonMode               = NULL;
	glPolygonOffset             = NULL;
	glPolygonStipple            = NULL;
	glPopAttrib                 = NULL;
	glPopClientAttrib           = NULL;
	glPopMatrix                 = NULL;
	glPopName                   = NULL;
	glPrioritizeTextures        = NULL;
	glPushAttrib                = NULL;
	glPushClientAttrib          = NULL;
	glPushMatrix                = NULL;
	glPushName                  = NULL;
	glRasterPos2d               = NULL;
	glRasterPos2dv              = NULL;
	glRasterPos2f               = NULL;
	glRasterPos2fv              = NULL;
	glRasterPos2i               = NULL;
	glRasterPos2iv              = NULL;
	glRasterPos2s               = NULL;
	glRasterPos2sv              = NULL;
	glRasterPos3d               = NULL;
	glRasterPos3dv              = NULL;
	glRasterPos3f               = NULL;
	glRasterPos3fv              = NULL;
	glRasterPos3i               = NULL;
	glRasterPos3iv              = NULL;
	glRasterPos3s               = NULL;
	glRasterPos3sv              = NULL;
	glRasterPos4d               = NULL;
	glRasterPos4dv              = NULL;
	glRasterPos4f               = NULL;
	glRasterPos4fv              = NULL;
	glRasterPos4i               = NULL;
	glRasterPos4iv              = NULL;
	glRasterPos4s               = NULL;
	glRasterPos4sv              = NULL;
	glReadBuffer                = NULL;
	glReadPixels                = NULL;
	glRectd                     = NULL;
	glRectdv                    = NULL;
	glRectf                     = NULL;
	glRectfv                    = NULL;
	glRecti                     = NULL;
	glRectiv                    = NULL;
	glRects                     = NULL;
	glRectsv                    = NULL;
	glRenderMode                = NULL;
	glRotated                   = NULL;
	glRotatef                   = NULL;
	glScaled                    = NULL;
	glScalef                    = NULL;
	glScissor                   = NULL;
	glSelectBuffer              = NULL;
	glShadeModel                = NULL;
	glStencilFunc               = NULL;
	glStencilMask               = NULL;
	glStencilOp                 = NULL;
	glTexCoord1d                = NULL;
	glTexCoord1dv               = NULL;
	glTexCoord1f                = NULL;
	glTexCoord1fv               = NULL;
	glTexCoord1i                = NULL;
	glTexCoord1iv               = NULL;
	glTexCoord1s                = NULL;
	glTexCoord1sv               = NULL;
	glTexCoord2d                = NULL;
	glTexCoord2dv               = NULL;
	glTexCoord2f                = NULL;
	glTexCoord2fv               = NULL;
	glTexCoord2i                = NULL;
	glTexCoord2iv               = NULL;
	glTexCoord2s                = NULL;
	glTexCoord2sv               = NULL;
	glTexCoord3d                = NULL;
	glTexCoord3dv               = NULL;
	glTexCoord3f                = NULL;
	glTexCoord3fv               = NULL;
	glTexCoord3i                = NULL;
	glTexCoord3iv               = NULL;
	glTexCoord3s                = NULL;
	glTexCoord3sv               = NULL;
	glTexCoord4d                = NULL;
	glTexCoord4dv               = NULL;
	glTexCoord4f                = NULL;
	glTexCoord4fv               = NULL;
	glTexCoord4i                = NULL;
	glTexCoord4iv               = NULL;
	glTexCoord4s                = NULL;
	glTexCoord4sv               = NULL;
	glTexCoordPointer           = NULL;
	glTexEnvf                   = NULL;
	glTexEnvfv                  = NULL;
	glTexEnvi                   = NULL;
	glTexEnviv                  = NULL;
	glTexGend                   = NULL;
	glTexGendv                  = NULL;
	glTexGenf                   = NULL;
	glTexGenfv                  = NULL;
	glTexGeni                   = NULL;
	glTexGeniv                  = NULL;
	glTexImage1D                = NULL;
	glTexImage2D                = NULL;
	glTexParameterf             = NULL;
	glTexParameterfv            = NULL;
	glTexParameteri             = NULL;
	glTexParameteriv            = NULL;
	glTexSubImage1D             = NULL;
	glTexSubImage2D             = NULL;
	glTranslated                = NULL;
	glTranslatef                = NULL;
	glVertex2d                  = NULL;
	glVertex2dv                 = NULL;
	glVertex2f                  = NULL;
	glVertex2fv                 = NULL;
	glVertex2i                  = NULL;
	glVertex2iv                 = NULL;
	glVertex2s                  = NULL;
	glVertex2sv                 = NULL;
	glVertex3d                  = NULL;
	glVertex3dv                 = NULL;
	glVertex3f                  = NULL;
	glVertex3fv                 = NULL;
	glVertex3i                  = NULL;
	glVertex3iv                 = NULL;
	glVertex3s                  = NULL;
	glVertex3sv                 = NULL;
	glVertex4d                  = NULL;
	glVertex4dv                 = NULL;
	glVertex4f                  = NULL;
	glVertex4fv                 = NULL;
	glVertex4i                  = NULL;
	glVertex4iv                 = NULL;
	glVertex4s                  = NULL;
	glVertex4sv                 = NULL;
	glVertexPointer             = NULL;
	glViewport                  = NULL;

	qwglCopyContext              = NULL;
	qwglCreateContext            = NULL;
	qwglCreateLayerContext       = NULL;
	qwglDeleteContext            = NULL;
	qwglDescribeLayerPlane       = NULL;
	qwglGetCurrentContext        = NULL;
	qwglGetCurrentDC             = NULL;
	qwglGetLayerPaletteEntries   = NULL;
	qwglGetProcAddress           = NULL;
	qwglMakeCurrent              = NULL;
	qwglRealizeLayerPalette      = NULL;
	qwglSetLayerPaletteEntries   = NULL;
	qwglShareLists               = NULL;
	qwglSwapLayerBuffers         = NULL;
	qwglUseFontBitmaps           = NULL;
	qwglUseFontOutlines          = NULL;

	qwglChoosePixelFormat        = NULL;
	qwglDescribePixelFormat      = NULL;
	qwglGetPixelFormat           = NULL;
	qwglSetPixelFormat           = NULL;
	qwglSwapBuffers              = NULL;*/
}

#define GR_NUM_BOARDS 0x0f


#pragma warning (disable : 4113 4133 4047 )
#define GPA( a ) GetProcAddress( win32.hinstOpenGL, a )

/*
** QGL_Init
**
** This is responsible for binding our gl function pointers to 
** the appropriate GL stuff.  In Windows this means doing a 
** LoadLibrary and a bunch of calls to GetProcAddress.  On other
** operating systems we need to do the right thing, whatever that
** might be.
*/
bool QGL_Init( const char *dllname )
{
	assert( win32.hinstOpenGL == 0 );

	common->Printf( "...initializing QGL\n" );

	common->Printf( "...calling LoadLibrary( '%s' ): ", dllname );

	if ( ( win32.hinstOpenGL = LoadLibrary( dllname ) ) == 0 )
	{
		common->Printf( "failed\n" );
		return false;
	}
	common->Printf( "succeeded\n" );
/*
	glAccum                     = dllAccum = glAccum;
	glAlphaFunc                 = dllAlphaFunc = glAlphaFunc;
	glAreTexturesResident       = dllAreTexturesResident = glAreTexturesResident;
	glArrayElement              = dllArrayElement = glArrayElement;
	glBegin                     = dllBegin = glBegin;
	glBindTexture               = dllBindTexture = glBindTexture;
	glBitmap                    = dllBitmap = glBitmap;
	glBlendFunc                 = dllBlendFunc = glBlendFunc;
	glCallList                  = dllCallList = glCallList;
	glCallLists                 = dllCallLists = glCallLists;
	glClear                     = dllClear = glClear;
	glClearAccum                = dllClearAccum = glClearAccum;
	glClearColor                = dllClearColor = glClearColor;
	glClearDepth                = dllClearDepth = glClearDepth;
	glClearIndex                = dllClearIndex = glClearIndex;
	glClearStencil              = dllClearStencil = glClearStencil;
	glClipPlane                 = dllClipPlane = glClipPlane;
	glColor3b                   = dllColor3b = glColor3b;
	glColor3bv                  = dllColor3bv = glColor3bv;
	glColor3d                   = dllColor3d = glColor3d;
	glColor3dv                  = dllColor3dv = glColor3dv;
	glColor3f                   = dllColor3f = glColor3f;
	glColor3fv                  = dllColor3fv = glColor3fv;
	glColor3i                   = dllColor3i = glColor3i;
	glColor3iv                  = dllColor3iv = glColor3iv;
	glColor3s                   = dllColor3s = glColor3s;
	glColor3sv                  = dllColor3sv = glColor3sv;
	glColor3ub                  = dllColor3ub = glColor3ub;
	glColor3ubv                 = dllColor3ubv = glColor3ubv;
	glColor3ui                  = dllColor3ui = glColor3ui;
	glColor3uiv                 = dllColor3uiv = glColor3uiv;
	glColor3us                  = dllColor3us = glColor3us;
	glColor3usv                 = dllColor3usv = glColor3usv;
	glColor4b                   = dllColor4b = glColor4b;
	glColor4bv                  = dllColor4bv = glColor4bv;
	glColor4d                   = dllColor4d = glColor4d;
	glColor4dv                  = dllColor4dv = glColor4dv;
	glColor4f                   = dllColor4f = glColor4f;
	glColor4fv                  = dllColor4fv = glColor4fv;
	glColor4i                   = dllColor4i = glColor4i;
	glColor4iv                  = dllColor4iv = glColor4iv;
	glColor4s                   = dllColor4s = glColor4s;
	glColor4sv                  = dllColor4sv = glColor4sv;
	glColor4ub                  = dllColor4ub = glColor4ub;
	glColor4ubv                 = dllColor4ubv = glColor4ubv;
	glColor4ui                  = dllColor4ui = glColor4ui;
	glColor4uiv                 = dllColor4uiv = glColor4uiv;
	glColor4us                  = dllColor4us = glColor4us;
	glColor4usv                 = dllColor4usv = glColor4usv;
	glColorMask                 = dllColorMask = glColorMask;
	glColorMaterial             = dllColorMaterial = glColorMaterial;
	glColorPointer              = dllColorPointer = glColorPointer;
	glCopyPixels                = dllCopyPixels = glCopyPixels;
	glCopyTexImage1D            = dllCopyTexImage1D = glCopyTexImage1D;
	glCopyTexImage2D            = dllCopyTexImage2D = glCopyTexImage2D;
	glCopyTexSubImage1D         = dllCopyTexSubImage1D = glCopyTexSubImage1D;
	glCopyTexSubImage2D         = dllCopyTexSubImage2D = glCopyTexSubImage2D;
	glCullFace                  = dllCullFace = glCullFace;
	glDeleteLists               = dllDeleteLists = glDeleteLists;
	glDeleteTextures            = dllDeleteTextures = glDeleteTextures;
	glDepthFunc                 = dllDepthFunc = glDepthFunc;
	glDepthMask                 = dllDepthMask = glDepthMask;
	glDepthRange                = dllDepthRange = glDepthRange;
	glDisable                   = dllDisable = glDisable;
	glDisableClientState        = dllDisableClientState = glDisableClientState;
	glDrawArrays                = dllDrawArrays = glDrawArrays;
	glDrawBuffer                = dllDrawBuffer = glDrawBuffer;
	glDrawElements              = dllDrawElements = glDrawElements;
	glDrawPixels                = dllDrawPixels = glDrawPixels;
	glEdgeFlag                  = dllEdgeFlag = glEdgeFlag;
	glEdgeFlagPointer           = dllEdgeFlagPointer = glEdgeFlagPointer;
	glEdgeFlagv                 = dllEdgeFlagv = glEdgeFlagv;
	glEnable                    = 	dllEnable                    = glEnable;
	glEnableClientState         = 	dllEnableClientState         = glEnableClientState;
	glEnd                       = 	dllEnd                       = glEnd;
	glEndList                   = 	dllEndList                   = glEndList;
	glEvalCoord1d				 = 	dllEvalCoord1d				 = glEvalCoord1d;
	glEvalCoord1dv              = 	dllEvalCoord1dv              = glEvalCoord1dv;
	glEvalCoord1f               = 	dllEvalCoord1f               = glEvalCoord1f;
	glEvalCoord1fv              = 	dllEvalCoord1fv              = glEvalCoord1fv;
	glEvalCoord2d               = 	dllEvalCoord2d               = glEvalCoord2d;
	glEvalCoord2dv              = 	dllEvalCoord2dv              = glEvalCoord2dv;
	glEvalCoord2f               = 	dllEvalCoord2f               = glEvalCoord2f;
	glEvalCoord2fv              = 	dllEvalCoord2fv              = glEvalCoord2fv;
	glEvalMesh1                 = 	dllEvalMesh1                 = glEvalMesh1;
	glEvalMesh2                 = 	dllEvalMesh2                 = glEvalMesh2;
	glEvalPoint1                = 	dllEvalPoint1                = glEvalPoint1;
	glEvalPoint2                = 	dllEvalPoint2                = glEvalPoint2;
	glFeedbackBuffer            = 	dllFeedbackBuffer            = glFeedbackBuffer;
	glFinish                    = 	dllFinish                    = glFinish;
	glFlush                     = 	dllFlush                     = glFlush;
	glFogf                      = 	dllFogf                      = glFogf;
	glFogfv                     = 	dllFogfv                     = glFogfv;
	glFogi                      = 	dllFogi                      = glFogi;
	glFogiv                     = 	dllFogiv                     = glFogiv;
	glFrontFace                 = 	dllFrontFace                 = glFrontFace;
	glFrustum                   = 	dllFrustum                   = glFrustum;
	glGenLists                  = 	dllGenLists                  = ( GLuint (__stdcall * )(int) ) glGenLists;
	glGenTextures               = 	dllGenTextures               = glGenTextures;
	glGetBooleanv               = 	dllGetBooleanv               = glGetBooleanv;
	glGetClipPlane              = 	dllGetClipPlane              = glGetClipPlane;
	glGetDoublev                = 	dllGetDoublev                = glGetDoublev;
	glGetError                  = 	dllGetError                  = ( GLenum (__stdcall * )(void) ) glGetError;
	glGetFloatv                 = 	dllGetFloatv                 = glGetFloatv;
	glGetIntegerv               = 	dllGetIntegerv               = glGetIntegerv;
	glGetLightfv                = 	dllGetLightfv                = glGetLightfv;
	glGetLightiv                = 	dllGetLightiv                = glGetLightiv;
	glGetMapdv                  = 	dllGetMapdv                  = glGetMapdv;
	glGetMapfv                  = 	dllGetMapfv                  = glGetMapfv;
	glGetMapiv                  = 	dllGetMapiv                  = glGetMapiv;
	glGetMaterialfv             = 	dllGetMaterialfv             = glGetMaterialfv;
	glGetMaterialiv             = 	dllGetMaterialiv             = glGetMaterialiv;
	glGetPixelMapfv             = 	dllGetPixelMapfv             = glGetPixelMapfv;
	glGetPixelMapuiv            = 	dllGetPixelMapuiv            = glGetPixelMapuiv;
	glGetPixelMapusv            = 	dllGetPixelMapusv            = glGetPixelMapusv;
	glGetPointerv               = 	dllGetPointerv               = glGetPointerv;
	glGetPolygonStipple         = 	dllGetPolygonStipple         = glGetPolygonStipple;
	glGetString                 = 	dllGetString                 = glGetString;
	glGetTexEnvfv               = 	dllGetTexEnvfv               = glGetTexEnvfv;
	glGetTexEnviv               = 	dllGetTexEnviv               = glGetTexEnviv;
	glGetTexGendv               = 	dllGetTexGendv               = glGetTexGendv;
	glGetTexGenfv               = 	dllGetTexGenfv               = glGetTexGenfv;
	glGetTexGeniv               = 	dllGetTexGeniv               = glGetTexGeniv;
	glGetTexImage               = 	dllGetTexImage               = glGetTexImage;
	glGetTexLevelParameterfv    = 	dllGetTexLevelParameterfv    = glGetTexLevelParameterfv;
	glGetTexLevelParameteriv    = 	dllGetTexLevelParameteriv    = glGetTexLevelParameteriv;
	glGetTexParameterfv         = 	dllGetTexParameterfv         = glGetTexParameterfv;
	glGetTexParameteriv         = 	dllGetTexParameteriv         = glGetTexParameteriv;
	glHint                      = 	dllHint                      = glHint;
	glIndexMask                 = 	dllIndexMask                 = glIndexMask;
	glIndexPointer              = 	dllIndexPointer              = glIndexPointer;
	glIndexd                    = 	dllIndexd                    = glIndexd;
	glIndexdv                   = 	dllIndexdv                   = glIndexdv;
	glIndexf                    = 	dllIndexf                    = glIndexf;
	glIndexfv                   = 	dllIndexfv                   = glIndexfv;
	glIndexi                    = 	dllIndexi                    = glIndexi;
	glIndexiv                   = 	dllIndexiv                   = glIndexiv;
	glIndexs                    = 	dllIndexs                    = glIndexs;
	glIndexsv                   = 	dllIndexsv                   = glIndexsv;
	glIndexub                   = 	dllIndexub                   = glIndexub;
	glIndexubv                  = 	dllIndexubv                  = glIndexubv;
	glInitNames                 = 	dllInitNames                 = glInitNames;
	glInterleavedArrays         = 	dllInterleavedArrays         = glInterleavedArrays;
	glIsEnabled                 = 	dllIsEnabled                 = glIsEnabled;
	glIsList                    = 	dllIsList                    = glIsList;
	glIsTexture                 = 	dllIsTexture                 = glIsTexture;
	glLightModelf               = 	dllLightModelf               = glLightModelf;
	glLightModelfv              = 	dllLightModelfv              = glLightModelfv;
	glLightModeli               = 	dllLightModeli               = glLightModeli;
	glLightModeliv              = 	dllLightModeliv              = glLightModeliv;
	glLightf                    = 	dllLightf                    = glLightf;
	glLightfv                   = 	dllLightfv                   = glLightfv;
	glLighti                    = 	dllLighti                    = glLighti;
	glLightiv                   = 	dllLightiv                   = glLightiv;
	glLineStipple               = 	dllLineStipple               = glLineStipple;
	glLineWidth                 = 	dllLineWidth                 = glLineWidth;
	glListBase                  = 	dllListBase                  = glListBase;
	glLoadIdentity              = 	dllLoadIdentity              = glLoadIdentity;
	glLoadMatrixd               = 	dllLoadMatrixd               = glLoadMatrixd;
	glLoadMatrixf               = 	dllLoadMatrixf               = glLoadMatrixf;
	glLoadName                  = 	dllLoadName                  = glLoadName;
	glLogicOp                   = 	dllLogicOp                   = glLogicOp;
	glMap1d                     = 	dllMap1d                     = glMap1d;
	glMap1f                     = 	dllMap1f                     = glMap1f;
	glMap2d                     = 	dllMap2d                     = glMap2d;
	glMap2f                     = 	dllMap2f                     = glMap2f;
	glMapGrid1d                 = 	dllMapGrid1d                 = glMapGrid1d;
	glMapGrid1f                 = 	dllMapGrid1f                 = glMapGrid1f;
	glMapGrid2d                 = 	dllMapGrid2d                 = glMapGrid2d;
	glMapGrid2f                 = 	dllMapGrid2f                 = glMapGrid2f;
	glMaterialf                 = 	dllMaterialf                 = glMaterialf;
	glMaterialfv                = 	dllMaterialfv                = glMaterialfv;
	glMateriali                 = 	dllMateriali                 = glMateriali;
	glMaterialiv                = 	dllMaterialiv                = glMaterialiv;
	glMatrixMode                = 	dllMatrixMode                = glMatrixMode;
	glMultMatrixd               = 	dllMultMatrixd               = glMultMatrixd;
	glMultMatrixf               = 	dllMultMatrixf               = glMultMatrixf;
	glNewList                   = 	dllNewList                   = glNewList;
	glNormal3b                  = 	dllNormal3b                  = glNormal3b;
	glNormal3bv                 = 	dllNormal3bv                 = glNormal3bv;
	glNormal3d                  = 	dllNormal3d                  = glNormal3d;
	glNormal3dv                 = 	dllNormal3dv                 = glNormal3dv;
	glNormal3f                  = 	dllNormal3f                  = glNormal3f;
	glNormal3fv                 = 	dllNormal3fv                 = glNormal3fv;
	glNormal3i                  = 	dllNormal3i                  = glNormal3i;
	glNormal3iv                 = 	dllNormal3iv                 = glNormal3iv;
	glNormal3s                  = 	dllNormal3s                  = glNormal3s;
	glNormal3sv                 = 	dllNormal3sv                 = glNormal3sv;
	glNormalPointer             = 	dllNormalPointer             = glNormalPointer;
	glOrtho                     = 	dllOrtho                     = glOrtho;
	glPassThrough               = 	dllPassThrough               = glPassThrough;
	glPixelMapfv                = 	dllPixelMapfv                = glPixelMapfv;
	glPixelMapuiv               = 	dllPixelMapuiv               = glPixelMapuiv;
	glPixelMapusv               = 	dllPixelMapusv               = glPixelMapusv;
	glPixelStoref               = 	dllPixelStoref               = glPixelStoref;
	glPixelStorei               = 	dllPixelStorei               = glPixelStorei;
	glPixelTransferf            = 	dllPixelTransferf            = glPixelTransferf;
	glPixelTransferi            = 	dllPixelTransferi            = glPixelTransferi;
	glPixelZoom                 = 	dllPixelZoom                 = glPixelZoom;
	glPointSize                 = 	dllPointSize                 = glPointSize;
	glPolygonMode               = 	dllPolygonMode               = glPolygonMode;
	glPolygonOffset             = 	dllPolygonOffset             = glPolygonOffset;
	glPolygonStipple            = 	dllPolygonStipple            = glPolygonStipple;
	glPopAttrib                 = 	dllPopAttrib                 = glPopAttrib;
	glPopClientAttrib           = 	dllPopClientAttrib           = glPopClientAttrib;
	glPopMatrix                 = 	dllPopMatrix                 = glPopMatrix;
	glPopName                   = 	dllPopName                   = glPopName;
	glPrioritizeTextures        = 	dllPrioritizeTextures        = glPrioritizeTextures;
	glPushAttrib                = 	dllPushAttrib                = glPushAttrib;
	glPushClientAttrib          = 	dllPushClientAttrib          = glPushClientAttrib;
	glPushMatrix                = 	dllPushMatrix                = glPushMatrix;
	glPushName                  = 	dllPushName                  = glPushName;
	glRasterPos2d               = 	dllRasterPos2d               = glRasterPos2d;
	glRasterPos2dv              = 	dllRasterPos2dv              = glRasterPos2dv;
	glRasterPos2f               = 	dllRasterPos2f               = glRasterPos2f;
	glRasterPos2fv              = 	dllRasterPos2fv              = glRasterPos2fv;
	glRasterPos2i               = 	dllRasterPos2i               = glRasterPos2i;
	glRasterPos2iv              = 	dllRasterPos2iv              = glRasterPos2iv;
	glRasterPos2s               = 	dllRasterPos2s               = glRasterPos2s;
	glRasterPos2sv              = 	dllRasterPos2sv              = glRasterPos2sv;
	glRasterPos3d               = 	dllRasterPos3d               = glRasterPos3d;
	glRasterPos3dv              = 	dllRasterPos3dv              = glRasterPos3dv;
	glRasterPos3f               = 	dllRasterPos3f               = glRasterPos3f;
	glRasterPos3fv              = 	dllRasterPos3fv              = glRasterPos3fv;
	glRasterPos3i               = 	dllRasterPos3i               = glRasterPos3i;
	glRasterPos3iv              = 	dllRasterPos3iv              = glRasterPos3iv;
	glRasterPos3s               = 	dllRasterPos3s               = glRasterPos3s;
	glRasterPos3sv              = 	dllRasterPos3sv              = glRasterPos3sv;
	glRasterPos4d               = 	dllRasterPos4d               = glRasterPos4d;
	glRasterPos4dv              = 	dllRasterPos4dv              = glRasterPos4dv;
	glRasterPos4f               = 	dllRasterPos4f               = glRasterPos4f;
	glRasterPos4fv              = 	dllRasterPos4fv              = glRasterPos4fv;
	glRasterPos4i               = 	dllRasterPos4i               = glRasterPos4i;
	glRasterPos4iv              = 	dllRasterPos4iv              = glRasterPos4iv;
	glRasterPos4s               = 	dllRasterPos4s               = glRasterPos4s;
	glRasterPos4sv              = 	dllRasterPos4sv              = glRasterPos4sv;
	glReadBuffer                = 	dllReadBuffer                = glReadBuffer;
	glReadPixels                = 	dllReadPixels                = glReadPixels;
	glRectd                     = 	dllRectd                     = glRectd;
	glRectdv                    = 	dllRectdv                    = glRectdv;
	glRectf                     = 	dllRectf                     = glRectf;
	glRectfv                    = 	dllRectfv                    = glRectfv;
	glRecti                     = 	dllRecti                     = glRecti;
	glRectiv                    = 	dllRectiv                    = glRectiv;
	glRects                     = 	dllRects                     = glRects;
	glRectsv                    = 	dllRectsv                    = glRectsv;
	glRenderMode                = 	dllRenderMode                = glRenderMode;
	glRotated                   = 	dllRotated                   = glRotated;
	glRotatef                   = 	dllRotatef                   = glRotatef;
	glScaled                    = 	dllScaled                    = glScaled;
	glScalef                    = 	dllScalef                    = glScalef;
	glScissor                   = 	dllScissor                   = glScissor;
	glSelectBuffer              = 	dllSelectBuffer              = glSelectBuffer;
	glShadeModel                = 	dllShadeModel                = glShadeModel;
	glStencilFunc               = 	dllStencilFunc               = glStencilFunc;
	glStencilMask               = 	dllStencilMask               = glStencilMask;
	glStencilOp                 = 	dllStencilOp                 = glStencilOp;
	glTexCoord1d                = 	dllTexCoord1d                = glTexCoord1d;
	glTexCoord1dv               = 	dllTexCoord1dv               = glTexCoord1dv;
	glTexCoord1f                = 	dllTexCoord1f                = glTexCoord1f;
	glTexCoord1fv               = 	dllTexCoord1fv               = glTexCoord1fv;
	glTexCoord1i                = 	dllTexCoord1i                = glTexCoord1i;
	glTexCoord1iv               = 	dllTexCoord1iv               = glTexCoord1iv;
	glTexCoord1s                = 	dllTexCoord1s                = glTexCoord1s;
	glTexCoord1sv               = 	dllTexCoord1sv               = glTexCoord1sv;
	glTexCoord2d                = 	dllTexCoord2d                = glTexCoord2d;
	glTexCoord2dv               = 	dllTexCoord2dv               = glTexCoord2dv;
	glTexCoord2f                = 	dllTexCoord2f                = glTexCoord2f;
	glTexCoord2fv               = 	dllTexCoord2fv               = glTexCoord2fv;
	glTexCoord2i                = 	dllTexCoord2i                = glTexCoord2i;
	glTexCoord2iv               = 	dllTexCoord2iv               = glTexCoord2iv;
	glTexCoord2s                = 	dllTexCoord2s                = glTexCoord2s;
	glTexCoord2sv               = 	dllTexCoord2sv               = glTexCoord2sv;
	glTexCoord3d                = 	dllTexCoord3d                = glTexCoord3d;
	glTexCoord3dv               = 	dllTexCoord3dv               = glTexCoord3dv;
	glTexCoord3f                = 	dllTexCoord3f                = glTexCoord3f;
	glTexCoord3fv               = 	dllTexCoord3fv               = glTexCoord3fv;
	glTexCoord3i                = 	dllTexCoord3i                = glTexCoord3i;
	glTexCoord3iv               = 	dllTexCoord3iv               = glTexCoord3iv;
	glTexCoord3s                = 	dllTexCoord3s                = glTexCoord3s;
	glTexCoord3sv               = 	dllTexCoord3sv               = glTexCoord3sv;
	glTexCoord4d                = 	dllTexCoord4d                = glTexCoord4d;
	glTexCoord4dv               = 	dllTexCoord4dv               = glTexCoord4dv;
	glTexCoord4f                = 	dllTexCoord4f                = glTexCoord4f;
	glTexCoord4fv               = 	dllTexCoord4fv               = glTexCoord4fv;
	glTexCoord4i                = 	dllTexCoord4i                = glTexCoord4i;
	glTexCoord4iv               = 	dllTexCoord4iv               = glTexCoord4iv;
	glTexCoord4s                = 	dllTexCoord4s                = glTexCoord4s;
	glTexCoord4sv               = 	dllTexCoord4sv               = glTexCoord4sv;
	glTexCoordPointer           = 	dllTexCoordPointer           = glTexCoordPointer;
	glTexEnvf                   = 	dllTexEnvf                   = glTexEnvf;
	glTexEnvfv                  = 	dllTexEnvfv                  = glTexEnvfv;
	glTexEnvi                   = 	dllTexEnvi                   = glTexEnvi;
	glTexEnviv                  = 	dllTexEnviv                  = glTexEnviv;
	glTexGend                   = 	dllTexGend                   = glTexGend;
	glTexGendv                  = 	dllTexGendv                  = glTexGendv;
	glTexGenf                   = 	dllTexGenf                   = glTexGenf;
	glTexGenfv                  = 	dllTexGenfv                  = glTexGenfv;
	glTexGeni                   = 	dllTexGeni                   = glTexGeni;
	glTexGeniv                  = 	dllTexGeniv                  = glTexGeniv;
	glTexImage1D                = 	dllTexImage1D                = glTexImage1D;
	glTexImage2D                = 	dllTexImage2D                = glTexImage2D;
	glTexParameterf             = 	dllTexParameterf             = glTexParameterf;
	glTexParameterfv            = 	dllTexParameterfv            = glTexParameterfv;
	glTexParameteri             = 	dllTexParameteri             = glTexParameteri;
	glTexParameteriv            = 	dllTexParameteriv            = glTexParameteriv;
	glTexSubImage1D             = 	dllTexSubImage1D             = glTexSubImage1D;
	glTexSubImage2D             = 	dllTexSubImage2D             = glTexSubImage2D;
	glTranslated                = 	dllTranslated                = glTranslated;
	glTranslatef                = 	dllTranslatef                = glTranslatef;
	glVertex2d                  = 	dllVertex2d                  = glVertex2d;
	glVertex2dv                 = 	dllVertex2dv                 = glVertex2dv;
	glVertex2f                  = 	dllVertex2f                  = glVertex2f;
	glVertex2fv                 = 	dllVertex2fv                 = glVertex2fv;
	glVertex2i                  = 	dllVertex2i                  = glVertex2i;
	glVertex2iv                 = 	dllVertex2iv                 = glVertex2iv;
	glVertex2s                  = 	dllVertex2s                  = glVertex2s;
	glVertex2sv                 = 	dllVertex2sv                 = glVertex2sv;
	glVertex3d                  = 	dllVertex3d                  = glVertex3d;
	glVertex3dv                 = 	dllVertex3dv                 = glVertex3dv;
	glVertex3f                  = 	dllVertex3f                  = glVertex3f;
	glVertex3fv                 = 	dllVertex3fv                 = glVertex3fv;
	glVertex3i                  = 	dllVertex3i                  = glVertex3i;
	glVertex3iv                 = 	dllVertex3iv                 = glVertex3iv;
	glVertex3s                  = 	dllVertex3s                  = glVertex3s;
	glVertex3sv                 = 	dllVertex3sv                 = glVertex3sv;
	glVertex4d                  = 	dllVertex4d                  = glVertex4d;
	glVertex4dv                 = 	dllVertex4dv                 = glVertex4dv;
	glVertex4f                  = 	dllVertex4f                  = glVertex4f;
	glVertex4fv                 = 	dllVertex4fv                 = glVertex4fv;
	glVertex4i                  = 	dllVertex4i                  = glVertex4i;
	glVertex4iv                 = 	dllVertex4iv                 = glVertex4iv;
	glVertex4s                  = 	dllVertex4s                  = glVertex4s;
	glVertex4sv                 = 	dllVertex4sv                 = glVertex4sv;
	glVertexPointer             = 	dllVertexPointer             = glVertexPointer;
	glViewport                  = 	dllViewport                  = glViewport;

	qwglCopyContext              = wglCopyContext;
	qwglCreateContext            = wglCreateContext;
	qwglCreateLayerContext       = wglCreateLayerContext;
	qwglDeleteContext            = wglDeleteContext;
	qwglDescribeLayerPlane       = wglDescribeLayerPlane;
	qwglGetCurrentContext        = wglGetCurrentContext;
	qwglGetCurrentDC             = wglGetCurrentDC;
	qwglGetLayerPaletteEntries   = wglGetLayerPaletteEntries;
	qwglGetProcAddress           = wglGetProcAddress;
	qwglMakeCurrent              = wglMakeCurrent;
	qwglRealizeLayerPalette      = wglRealizeLayerPalette;
	qwglSetLayerPaletteEntries   = wglSetLayerPaletteEntries;
	qwglShareLists               = wglShareLists;
	qwglSwapLayerBuffers         = wglSwapLayerBuffers;
	qwglUseFontBitmaps           = wglUseFontBitmapsA;
	qwglUseFontOutlines          = wglUseFontOutlinesA;

	qwglChoosePixelFormat        = ChoosePixelFormat;
	qwglDescribePixelFormat      = DescribePixelFormat;
	qwglGetPixelFormat           = GetPixelFormat;
	qwglSetPixelFormat           = SetPixelFormat;
	qwglSwapBuffers              = SwapBuffers;

	glActiveTextureARB = 0;
	glClientActiveTextureARB = 0;
	glMultiTexCoord2fARB = 0;*/

	return true;
}


/*
==================
GLimp_EnableLogging

==================
*/
void GLimp_EnableLogging( bool enable ) {
	static bool		isEnabled;
	static int		initialFrames;
	static char		ospath[ MAX_OSPATH ];

	// return if we're already active
	if ( isEnabled && enable ) {
		// decrement log counter and stop if it has reached 0
		r_logFile.SetInteger( r_logFile.GetInteger() - 1 );
		if ( r_logFile.GetInteger() ) {
			return;
		}
		common->Printf( "closing logfile '%s' after %i frames.\n", ospath, initialFrames );
		enable = false;

		fclose( tr.logFile );
		tr.logFile = NULL;

	}

	// return if we're already disabled
	if ( !enable && !isEnabled ) {
		return;
	}

	//isEnabled = enable;

	//if ( enable ) {
	//	if ( !tr.logFile ) {
	//		struct tm		*newtime;
	//		ID_TIME_T			aclock;
	//		idStr			qpath;
	//		int				i;
	//		const char		*path;

	//		initialFrames = r_logFile.GetInteger();

	//		// scan for an unused filename
	//		for ( i = 0 ; i < 9999 ; i++ ) {
	//			sprintf( qpath, "renderlog_%i.txt", i ); 
	//			if ( fileSystem->ReadFile( qpath, NULL, NULL ) == -1 ) {
	//				break;		// use this name
	//			}
	//		}

	//		path = fileSystem->RelativePathToOSPath( qpath, "fs_savepath" );
	//		idStr::Copynz( ospath, path, sizeof( ospath ) );
	//		tr.logFile = fopen( ospath, "wt" );

	//		// write the time out to the top of the file
	//		time( &aclock );
	//		newtime = localtime( &aclock );
	//		fprintf( tr.logFile, "// %s", asctime( newtime ) );
	//		fprintf( tr.logFile, "// %s\n\n", cvarSystem->GetCVarString( "si_version" ) );
	//	}

	//	glAccum                     = logAccum;
	//	glAlphaFunc                 = logAlphaFunc;
	//	glAreTexturesResident       = logAreTexturesResident;
	//	glArrayElement              = logArrayElement;
	//	glBegin                     = logBegin;
	//	glBindTexture               = logBindTexture;
	//	glBitmap                    = logBitmap;
	//	glBlendFunc                 = logBlendFunc;
	//	glCallList                  = logCallList;
	//	glCallLists                 = logCallLists;
	//	glClear                     = logClear;
	//	glClearAccum                = logClearAccum;
	//	glClearColor                = logClearColor;
	//	glClearDepth                = logClearDepth;
	//	glClearIndex                = logClearIndex;
	//	glClearStencil              = logClearStencil;
	//	glClipPlane                 = logClipPlane;
	//	glColor3b                   = logColor3b;
	//	glColor3bv                  = logColor3bv;
	//	glColor3d                   = logColor3d;
	//	glColor3dv                  = logColor3dv;
	//	glColor3f                   = logColor3f;
	//	glColor3fv                  = logColor3fv;
	//	glColor3i                   = logColor3i;
	//	glColor3iv                  = logColor3iv;
	//	glColor3s                   = logColor3s;
	//	glColor3sv                  = logColor3sv;
	//	glColor3ub                  = logColor3ub;
	//	glColor3ubv                 = logColor3ubv;
	//	glColor3ui                  = logColor3ui;
	//	glColor3uiv                 = logColor3uiv;
	//	glColor3us                  = logColor3us;
	//	glColor3usv                 = logColor3usv;
	//	glColor4b                   = logColor4b;
	//	glColor4bv                  = logColor4bv;
	//	glColor4d                   = logColor4d;
	//	glColor4dv                  = logColor4dv;
	//	glColor4f                   = logColor4f;
	//	glColor4fv                  = logColor4fv;
	//	glColor4i                   = logColor4i;
	//	glColor4iv                  = logColor4iv;
	//	glColor4s                   = logColor4s;
	//	glColor4sv                  = logColor4sv;
	//	glColor4ub                  = logColor4ub;
	//	glColor4ubv                 = logColor4ubv;
	//	glColor4ui                  = logColor4ui;
	//	glColor4uiv                 = logColor4uiv;
	//	glColor4us                  = logColor4us;
	//	glColor4usv                 = logColor4usv;
	//	glColorMask                 = logColorMask;
	//	glColorMaterial             = logColorMaterial;
	//	glColorPointer              = logColorPointer;
	//	glCopyPixels                = logCopyPixels;
	//	glCopyTexImage1D            = logCopyTexImage1D;
	//	glCopyTexImage2D            = logCopyTexImage2D;
	//	glCopyTexSubImage1D         = logCopyTexSubImage1D;
	//	glCopyTexSubImage2D         = logCopyTexSubImage2D;
	//	glCullFace                  = logCullFace;
	//	glDeleteLists               = logDeleteLists ;
	//	glDeleteTextures            = logDeleteTextures ;
	//	glDepthFunc                 = logDepthFunc ;
	//	glDepthMask                 = logDepthMask ;
	//	glDepthRange                = logDepthRange ;
	//	glDisable                   = logDisable ;
	//	glDisableClientState        = logDisableClientState ;
	//	glDrawArrays                = logDrawArrays ;
	//	glDrawBuffer                = logDrawBuffer ;
	//	glDrawElements              = logDrawElements ;
	//	glDrawPixels                = logDrawPixels ;
	//	glEdgeFlag                  = logEdgeFlag ;
	//	glEdgeFlagPointer           = logEdgeFlagPointer ;
	//	glEdgeFlagv                 = logEdgeFlagv ;
	//	glEnable                    = 	logEnable                    ;
	//	glEnableClientState         = 	logEnableClientState         ;
	//	glEnd                       = 	logEnd                       ;
	//	glEndList                   = 	logEndList                   ;
	//	glEvalCoord1d				 = 	logEvalCoord1d				 ;
	//	glEvalCoord1dv              = 	logEvalCoord1dv              ;
	//	glEvalCoord1f               = 	logEvalCoord1f               ;
	//	glEvalCoord1fv              = 	logEvalCoord1fv              ;
	//	glEvalCoord2d               = 	logEvalCoord2d               ;
	//	glEvalCoord2dv              = 	logEvalCoord2dv              ;
	//	glEvalCoord2f               = 	logEvalCoord2f               ;
	//	glEvalCoord2fv              = 	logEvalCoord2fv              ;
	//	glEvalMesh1                 = 	logEvalMesh1                 ;
	//	glEvalMesh2                 = 	logEvalMesh2                 ;
	//	glEvalPoint1                = 	logEvalPoint1                ;
	//	glEvalPoint2                = 	logEvalPoint2                ;
	//	glFeedbackBuffer            = 	logFeedbackBuffer            ;
	//	glFinish                    = 	logFinish                    ;
	//	glFlush                     = 	logFlush                     ;
	//	glFogf                      = 	logFogf                      ;
	//	glFogfv                     = 	logFogfv                     ;
	//	glFogi                      = 	logFogi                      ;
	//	glFogiv                     = 	logFogiv                     ;
	//	glFrontFace                 = 	logFrontFace                 ;
	//	glFrustum                   = 	logFrustum                   ;
	//	glGenLists                  = 	logGenLists                  ;
	//	glGenTextures               = 	logGenTextures               ;
	//	glGetBooleanv               = 	logGetBooleanv               ;
	//	glGetClipPlane              = 	logGetClipPlane              ;
	//	glGetDoublev                = 	logGetDoublev                ;
	//	glGetError                  = 	logGetError                  ;
	//	glGetFloatv                 = 	logGetFloatv                 ;
	//	glGetIntegerv               = 	logGetIntegerv               ;
	//	glGetLightfv                = 	logGetLightfv                ;
	//	glGetLightiv                = 	logGetLightiv                ;
	//	glGetMapdv                  = 	logGetMapdv                  ;
	//	glGetMapfv                  = 	logGetMapfv                  ;
	//	glGetMapiv                  = 	logGetMapiv                  ;
	//	glGetMaterialfv             = 	logGetMaterialfv             ;
	//	glGetMaterialiv             = 	logGetMaterialiv             ;
	//	glGetPixelMapfv             = 	logGetPixelMapfv             ;
	//	glGetPixelMapuiv            = 	logGetPixelMapuiv            ;
	//	glGetPixelMapusv            = 	logGetPixelMapusv            ;
	//	glGetPointerv               = 	logGetPointerv               ;
	//	glGetPolygonStipple         = 	logGetPolygonStipple         ;
	//	glGetString                 = 	logGetString                 ;
	//	glGetTexEnvfv               = 	logGetTexEnvfv               ;
	//	glGetTexEnviv               = 	logGetTexEnviv               ;
	//	glGetTexGendv               = 	logGetTexGendv               ;
	//	glGetTexGenfv               = 	logGetTexGenfv               ;
	//	glGetTexGeniv               = 	logGetTexGeniv               ;
	//	glGetTexImage               = 	logGetTexImage               ;
	//	glGetTexLevelParameterfv    = 	logGetTexLevelParameterfv    ;
	//	glGetTexLevelParameteriv    = 	logGetTexLevelParameteriv    ;
	//	glGetTexParameterfv         = 	logGetTexParameterfv         ;
	//	glGetTexParameteriv         = 	logGetTexParameteriv         ;
	//	glHint                      = 	logHint                      ;
	//	glIndexMask                 = 	logIndexMask                 ;
	//	glIndexPointer              = 	logIndexPointer              ;
	//	glIndexd                    = 	logIndexd                    ;
	//	glIndexdv                   = 	logIndexdv                   ;
	//	glIndexf                    = 	logIndexf                    ;
	//	glIndexfv                   = 	logIndexfv                   ;
	//	glIndexi                    = 	logIndexi                    ;
	//	glIndexiv                   = 	logIndexiv                   ;
	//	glIndexs                    = 	logIndexs                    ;
	//	glIndexsv                   = 	logIndexsv                   ;
	//	glIndexub                   = 	logIndexub                   ;
	//	glIndexubv                  = 	logIndexubv                  ;
	//	glInitNames                 = 	logInitNames                 ;
	//	glInterleavedArrays         = 	logInterleavedArrays         ;
	//	glIsEnabled                 = 	logIsEnabled                 ;
	//	glIsList                    = 	logIsList                    ;
	//	glIsTexture                 = 	logIsTexture                 ;
	//	glLightModelf               = 	logLightModelf               ;
	//	glLightModelfv              = 	logLightModelfv              ;
	//	glLightModeli               = 	logLightModeli               ;
	//	glLightModeliv              = 	logLightModeliv              ;
	//	glLightf                    = 	logLightf                    ;
	//	glLightfv                   = 	logLightfv                   ;
	//	glLighti                    = 	logLighti                    ;
	//	glLightiv                   = 	logLightiv                   ;
	//	glLineStipple               = 	logLineStipple               ;
	//	glLineWidth                 = 	logLineWidth                 ;
	//	glListBase                  = 	logListBase                  ;
	//	glLoadIdentity              = 	logLoadIdentity              ;
	//	glLoadMatrixd               = 	logLoadMatrixd               ;
	//	glLoadMatrixf               = 	logLoadMatrixf               ;
	//	glLoadName                  = 	logLoadName                  ;
	//	glLogicOp                   = 	logLogicOp                   ;
	//	glMap1d                     = 	logMap1d                     ;
	//	glMap1f                     = 	logMap1f                     ;
	//	glMap2d                     = 	logMap2d                     ;
	//	glMap2f                     = 	logMap2f                     ;
	//	glMapGrid1d                 = 	logMapGrid1d                 ;
	//	glMapGrid1f                 = 	logMapGrid1f                 ;
	//	glMapGrid2d                 = 	logMapGrid2d                 ;
	//	glMapGrid2f                 = 	logMapGrid2f                 ;
	//	glMaterialf                 = 	logMaterialf                 ;
	//	glMaterialfv                = 	logMaterialfv                ;
	//	glMateriali                 = 	logMateriali                 ;
	//	glMaterialiv                = 	logMaterialiv                ;
	//	glMatrixMode                = 	logMatrixMode                ;
	//	glMultMatrixd               = 	logMultMatrixd               ;
	//	glMultMatrixf               = 	logMultMatrixf               ;
	//	glNewList                   = 	logNewList                   ;
	//	glNormal3b                  = 	logNormal3b                  ;
	//	glNormal3bv                 = 	logNormal3bv                 ;
	//	glNormal3d                  = 	logNormal3d                  ;
	//	glNormal3dv                 = 	logNormal3dv                 ;
	//	glNormal3f                  = 	logNormal3f                  ;
	//	glNormal3fv                 = 	logNormal3fv                 ;
	//	glNormal3i                  = 	logNormal3i                  ;
	//	glNormal3iv                 = 	logNormal3iv                 ;
	//	glNormal3s                  = 	logNormal3s                  ;
	//	glNormal3sv                 = 	logNormal3sv                 ;
	//	glNormalPointer             = 	logNormalPointer             ;
	//	glOrtho                     = 	logOrtho                     ;
	//	glPassThrough               = 	logPassThrough               ;
	//	glPixelMapfv                = 	logPixelMapfv                ;
	//	glPixelMapuiv               = 	logPixelMapuiv               ;
	//	glPixelMapusv               = 	logPixelMapusv               ;
	//	glPixelStoref               = 	logPixelStoref               ;
	//	glPixelStorei               = 	logPixelStorei               ;
	//	glPixelTransferf            = 	logPixelTransferf            ;
	//	glPixelTransferi            = 	logPixelTransferi            ;
	//	glPixelZoom                 = 	logPixelZoom                 ;
	//	glPointSize                 = 	logPointSize                 ;
	//	glPolygonMode               = 	logPolygonMode               ;
	//	glPolygonOffset             = 	logPolygonOffset             ;
	//	glPolygonStipple            = 	logPolygonStipple            ;
	//	glPopAttrib                 = 	logPopAttrib                 ;
	//	glPopClientAttrib           = 	logPopClientAttrib           ;
	//	glPopMatrix                 = 	logPopMatrix                 ;
	//	glPopName                   = 	logPopName                   ;
	//	glPrioritizeTextures        = 	logPrioritizeTextures        ;
	//	glPushAttrib                = 	logPushAttrib                ;
	//	glPushClientAttrib          = 	logPushClientAttrib          ;
	//	glPushMatrix                = 	logPushMatrix                ;
	//	glPushName                  = 	logPushName                  ;
	//	glRasterPos2d               = 	logRasterPos2d               ;
	//	glRasterPos2dv              = 	logRasterPos2dv              ;
	//	glRasterPos2f               = 	logRasterPos2f               ;
	//	glRasterPos2fv              = 	logRasterPos2fv              ;
	//	glRasterPos2i               = 	logRasterPos2i               ;
	//	glRasterPos2iv              = 	logRasterPos2iv              ;
	//	glRasterPos2s               = 	logRasterPos2s               ;
	//	glRasterPos2sv              = 	logRasterPos2sv              ;
	//	glRasterPos3d               = 	logRasterPos3d               ;
	//	glRasterPos3dv              = 	logRasterPos3dv              ;
	//	glRasterPos3f               = 	logRasterPos3f               ;
	//	glRasterPos3fv              = 	logRasterPos3fv              ;
	//	glRasterPos3i               = 	logRasterPos3i               ;
	//	glRasterPos3iv              = 	logRasterPos3iv              ;
	//	glRasterPos3s               = 	logRasterPos3s               ;
	//	glRasterPos3sv              = 	logRasterPos3sv              ;
	//	glRasterPos4d               = 	logRasterPos4d               ;
	//	glRasterPos4dv              = 	logRasterPos4dv              ;
	//	glRasterPos4f               = 	logRasterPos4f               ;
	//	glRasterPos4fv              = 	logRasterPos4fv              ;
	//	glRasterPos4i               = 	logRasterPos4i               ;
	//	glRasterPos4iv              = 	logRasterPos4iv              ;
	//	glRasterPos4s               = 	logRasterPos4s               ;
	//	glRasterPos4sv              = 	logRasterPos4sv              ;
	//	glReadBuffer                = 	logReadBuffer                ;
	//	glReadPixels                = 	logReadPixels                ;
	//	glRectd                     = 	logRectd                     ;
	//	glRectdv                    = 	logRectdv                    ;
	//	glRectf                     = 	logRectf                     ;
	//	glRectfv                    = 	logRectfv                    ;
	//	glRecti                     = 	logRecti                     ;
	//	glRectiv                    = 	logRectiv                    ;
	//	glRects                     = 	logRects                     ;
	//	glRectsv                    = 	logRectsv                    ;
	//	glRenderMode                = 	logRenderMode                ;
	//	glRotated                   = 	logRotated                   ;
	//	glRotatef                   = 	logRotatef                   ;
	//	glScaled                    = 	logScaled                    ;
	//	glScalef                    = 	logScalef                    ;
	//	glScissor                   = 	logScissor                   ;
	//	glSelectBuffer              = 	logSelectBuffer              ;
	//	glShadeModel                = 	logShadeModel                ;
	//	glStencilFunc               = 	logStencilFunc               ;
	//	glStencilMask               = 	logStencilMask               ;
	//	glStencilOp                 = 	logStencilOp                 ;
	//	glTexCoord1d                = 	logTexCoord1d                ;
	//	glTexCoord1dv               = 	logTexCoord1dv               ;
	//	glTexCoord1f                = 	logTexCoord1f                ;
	//	glTexCoord1fv               = 	logTexCoord1fv               ;
	//	glTexCoord1i                = 	logTexCoord1i                ;
	//	glTexCoord1iv               = 	logTexCoord1iv               ;
	//	glTexCoord1s                = 	logTexCoord1s                ;
	//	glTexCoord1sv               = 	logTexCoord1sv               ;
	//	glTexCoord2d                = 	logTexCoord2d                ;
	//	glTexCoord2dv               = 	logTexCoord2dv               ;
	//	glTexCoord2f                = 	logTexCoord2f                ;
	//	glTexCoord2fv               = 	logTexCoord2fv               ;
	//	glTexCoord2i                = 	logTexCoord2i                ;
	//	glTexCoord2iv               = 	logTexCoord2iv               ;
	//	glTexCoord2s                = 	logTexCoord2s                ;
	//	glTexCoord2sv               = 	logTexCoord2sv               ;
	//	glTexCoord3d                = 	logTexCoord3d                ;
	//	glTexCoord3dv               = 	logTexCoord3dv               ;
	//	glTexCoord3f                = 	logTexCoord3f                ;
	//	glTexCoord3fv               = 	logTexCoord3fv               ;
	//	glTexCoord3i                = 	logTexCoord3i                ;
	//	glTexCoord3iv               = 	logTexCoord3iv               ;
	//	glTexCoord3s                = 	logTexCoord3s                ;
	//	glTexCoord3sv               = 	logTexCoord3sv               ;
	//	glTexCoord4d                = 	logTexCoord4d                ;
	//	glTexCoord4dv               = 	logTexCoord4dv               ;
	//	glTexCoord4f                = 	logTexCoord4f                ;
	//	glTexCoord4fv               = 	logTexCoord4fv               ;
	//	glTexCoord4i                = 	logTexCoord4i                ;
	//	glTexCoord4iv               = 	logTexCoord4iv               ;
	//	glTexCoord4s                = 	logTexCoord4s                ;
	//	glTexCoord4sv               = 	logTexCoord4sv               ;
	//	glTexCoordPointer           = 	logTexCoordPointer           ;
	//	glTexEnvf                   = 	logTexEnvf                   ;
	//	glTexEnvfv                  = 	logTexEnvfv                  ;
	//	glTexEnvi                   = 	logTexEnvi                   ;
	//	glTexEnviv                  = 	logTexEnviv                  ;
	//	glTexGend                   = 	logTexGend                   ;
	//	glTexGendv                  = 	logTexGendv                  ;
	//	glTexGenf                   = 	logTexGenf                   ;
	//	glTexGenfv                  = 	logTexGenfv                  ;
	//	glTexGeni                   = 	logTexGeni                   ;
	//	glTexGeniv                  = 	logTexGeniv                  ;
	//	glTexImage1D                = 	logTexImage1D                ;
	//	glTexImage2D                = 	logTexImage2D                ;
	//	glTexParameterf             = 	logTexParameterf             ;
	//	glTexParameterfv            = 	logTexParameterfv            ;
	//	glTexParameteri             = 	logTexParameteri             ;
	//	glTexParameteriv            = 	logTexParameteriv            ;
	//	glTexSubImage1D             = 	logTexSubImage1D             ;
	//	glTexSubImage2D             = 	logTexSubImage2D             ;
	//	glTranslated                = 	logTranslated                ;
	//	glTranslatef                = 	logTranslatef                ;
	//	glVertex2d                  = 	logVertex2d                  ;
	//	glVertex2dv                 = 	logVertex2dv                 ;
	//	glVertex2f                  = 	logVertex2f                  ;
	//	glVertex2fv                 = 	logVertex2fv                 ;
	//	glVertex2i                  = 	logVertex2i                  ;
	//	glVertex2iv                 = 	logVertex2iv                 ;
	//	glVertex2s                  = 	logVertex2s                  ;
	//	glVertex2sv                 = 	logVertex2sv                 ;
	//	glVertex3d                  = 	logVertex3d                  ;
	//	glVertex3dv                 = 	logVertex3dv                 ;
	//	glVertex3f                  = 	logVertex3f                  ;
	//	glVertex3fv                 = 	logVertex3fv                 ;
	//	glVertex3i                  = 	logVertex3i                  ;
	//	glVertex3iv                 = 	logVertex3iv                 ;
	//	glVertex3s                  = 	logVertex3s                  ;
	//	glVertex3sv                 = 	logVertex3sv                 ;
	//	glVertex4d                  = 	logVertex4d                  ;
	//	glVertex4dv                 = 	logVertex4dv                 ;
	//	glVertex4f                  = 	logVertex4f                  ;
	//	glVertex4fv                 = 	logVertex4fv                 ;
	//	glVertex4i                  = 	logVertex4i                  ;
	//	glVertex4iv                 = 	logVertex4iv                 ;
	//	glVertex4s                  = 	logVertex4s                  ;
	//	glVertex4sv                 = 	logVertex4sv                 ;
	//	glVertexPointer             = 	logVertexPointer             ;
	//	glViewport                  = 	logViewport                  ;
	//}
	//else
	//{
	//	glAccum                     = dllAccum;
	//	glAlphaFunc                 = dllAlphaFunc;
	//	glAreTexturesResident       = dllAreTexturesResident;
	//	glArrayElement              = dllArrayElement;
	//	glBegin                     = dllBegin;
	//	glBindTexture               = dllBindTexture;
	//	glBitmap                    = dllBitmap;
	//	glBlendFunc                 = dllBlendFunc;
	//	glCallList                  = dllCallList;
	//	glCallLists                 = dllCallLists;
	//	glClear                     = dllClear;
	//	glClearAccum                = dllClearAccum;
	//	glClearColor                = dllClearColor;
	//	glClearDepth                = dllClearDepth;
	//	glClearIndex                = dllClearIndex;
	//	glClearStencil              = dllClearStencil;
	//	glClipPlane                 = dllClipPlane;
	//	glColor3b                   = dllColor3b;
	//	glColor3bv                  = dllColor3bv;
	//	glColor3d                   = dllColor3d;
	//	glColor3dv                  = dllColor3dv;
	//	glColor3f                   = dllColor3f;
	//	glColor3fv                  = dllColor3fv;
	//	glColor3i                   = dllColor3i;
	//	glColor3iv                  = dllColor3iv;
	//	glColor3s                   = dllColor3s;
	//	glColor3sv                  = dllColor3sv;
	//	glColor3ub                  = dllColor3ub;
	//	glColor3ubv                 = dllColor3ubv;
	//	glColor3ui                  = dllColor3ui;
	//	glColor3uiv                 = dllColor3uiv;
	//	glColor3us                  = dllColor3us;
	//	glColor3usv                 = dllColor3usv;
	//	glColor4b                   = dllColor4b;
	//	glColor4bv                  = dllColor4bv;
	//	glColor4d                   = dllColor4d;
	//	glColor4dv                  = dllColor4dv;
	//	glColor4f                   = dllColor4f;
	//	glColor4fv                  = dllColor4fv;
	//	glColor4i                   = dllColor4i;
	//	glColor4iv                  = dllColor4iv;
	//	glColor4s                   = dllColor4s;
	//	glColor4sv                  = dllColor4sv;
	//	glColor4ub                  = dllColor4ub;
	//	glColor4ubv                 = dllColor4ubv;
	//	glColor4ui                  = dllColor4ui;
	//	glColor4uiv                 = dllColor4uiv;
	//	glColor4us                  = dllColor4us;
	//	glColor4usv                 = dllColor4usv;
	//	glColorMask                 = dllColorMask;
	//	glColorMaterial             = dllColorMaterial;
	//	glColorPointer              = dllColorPointer;
	//	glCopyPixels                = dllCopyPixels;
	//	glCopyTexImage1D            = dllCopyTexImage1D;
	//	glCopyTexImage2D            = dllCopyTexImage2D;
	//	glCopyTexSubImage1D         = dllCopyTexSubImage1D;
	//	glCopyTexSubImage2D         = dllCopyTexSubImage2D;
	//	glCullFace                  = dllCullFace;
	//	glDeleteLists               = dllDeleteLists ;
	//	glDeleteTextures            = dllDeleteTextures ;
	//	glDepthFunc                 = dllDepthFunc ;
	//	glDepthMask                 = dllDepthMask ;
	//	glDepthRange                = dllDepthRange ;
	//	glDisable                   = dllDisable ;
	//	glDisableClientState        = dllDisableClientState ;
	//	glDrawArrays                = dllDrawArrays ;
	//	glDrawBuffer                = dllDrawBuffer ;
	//	glDrawElements              = dllDrawElements ;
	//	glDrawPixels                = dllDrawPixels ;
	//	glEdgeFlag                  = dllEdgeFlag ;
	//	glEdgeFlagPointer           = dllEdgeFlagPointer ;
	//	glEdgeFlagv                 = dllEdgeFlagv ;
	//	glEnable                    = 	dllEnable                    ;
	//	glEnableClientState         = 	dllEnableClientState         ;
	//	glEnd                       = 	dllEnd                       ;
	//	glEndList                   = 	dllEndList                   ;
	//	glEvalCoord1d				 = 	dllEvalCoord1d				 ;
	//	glEvalCoord1dv              = 	dllEvalCoord1dv              ;
	//	glEvalCoord1f               = 	dllEvalCoord1f               ;
	//	glEvalCoord1fv              = 	dllEvalCoord1fv              ;
	//	glEvalCoord2d               = 	dllEvalCoord2d               ;
	//	glEvalCoord2dv              = 	dllEvalCoord2dv              ;
	//	glEvalCoord2f               = 	dllEvalCoord2f               ;
	//	glEvalCoord2fv              = 	dllEvalCoord2fv              ;
	//	glEvalMesh1                 = 	dllEvalMesh1                 ;
	//	glEvalMesh2                 = 	dllEvalMesh2                 ;
	//	glEvalPoint1                = 	dllEvalPoint1                ;
	//	glEvalPoint2                = 	dllEvalPoint2                ;
	//	glFeedbackBuffer            = 	dllFeedbackBuffer            ;
	//	glFinish                    = 	dllFinish                    ;
	//	glFlush                     = 	dllFlush                     ;
	//	glFogf                      = 	dllFogf                      ;
	//	glFogfv                     = 	dllFogfv                     ;
	//	glFogi                      = 	dllFogi                      ;
	//	glFogiv                     = 	dllFogiv                     ;
	//	glFrontFace                 = 	dllFrontFace                 ;
	//	glFrustum                   = 	dllFrustum                   ;
	//	glGenLists                  = 	dllGenLists                  ;
	//	glGenTextures               = 	dllGenTextures               ;
	//	glGetBooleanv               = 	dllGetBooleanv               ;
	//	glGetClipPlane              = 	dllGetClipPlane              ;
	//	glGetDoublev                = 	dllGetDoublev                ;
	//	glGetError                  = 	dllGetError                  ;
	//	glGetFloatv                 = 	dllGetFloatv                 ;
	//	glGetIntegerv               = 	dllGetIntegerv               ;
	//	glGetLightfv                = 	dllGetLightfv                ;
	//	glGetLightiv                = 	dllGetLightiv                ;
	//	glGetMapdv                  = 	dllGetMapdv                  ;
	//	glGetMapfv                  = 	dllGetMapfv                  ;
	//	glGetMapiv                  = 	dllGetMapiv                  ;
	//	glGetMaterialfv             = 	dllGetMaterialfv             ;
	//	glGetMaterialiv             = 	dllGetMaterialiv             ;
	//	glGetPixelMapfv             = 	dllGetPixelMapfv             ;
	//	glGetPixelMapuiv            = 	dllGetPixelMapuiv            ;
	//	glGetPixelMapusv            = 	dllGetPixelMapusv            ;
	//	glGetPointerv               = 	dllGetPointerv               ;
	//	glGetPolygonStipple         = 	dllGetPolygonStipple         ;
	//	glGetString                 = 	dllGetString                 ;
	//	glGetTexEnvfv               = 	dllGetTexEnvfv               ;
	//	glGetTexEnviv               = 	dllGetTexEnviv               ;
	//	glGetTexGendv               = 	dllGetTexGendv               ;
	//	glGetTexGenfv               = 	dllGetTexGenfv               ;
	//	glGetTexGeniv               = 	dllGetTexGeniv               ;
	//	glGetTexImage               = 	dllGetTexImage               ;
	//	glGetTexLevelParameterfv    = 	dllGetTexLevelParameterfv    ;
	//	glGetTexLevelParameteriv    = 	dllGetTexLevelParameteriv    ;
	//	glGetTexParameterfv         = 	dllGetTexParameterfv         ;
	//	glGetTexParameteriv         = 	dllGetTexParameteriv         ;
	//	glHint                      = 	dllHint                      ;
	//	glIndexMask                 = 	dllIndexMask                 ;
	//	glIndexPointer              = 	dllIndexPointer              ;
	//	glIndexd                    = 	dllIndexd                    ;
	//	glIndexdv                   = 	dllIndexdv                   ;
	//	glIndexf                    = 	dllIndexf                    ;
	//	glIndexfv                   = 	dllIndexfv                   ;
	//	glIndexi                    = 	dllIndexi                    ;
	//	glIndexiv                   = 	dllIndexiv                   ;
	//	glIndexs                    = 	dllIndexs                    ;
	//	glIndexsv                   = 	dllIndexsv                   ;
	//	glIndexub                   = 	dllIndexub                   ;
	//	glIndexubv                  = 	dllIndexubv                  ;
	//	glInitNames                 = 	dllInitNames                 ;
	//	glInterleavedArrays         = 	dllInterleavedArrays         ;
	//	glIsEnabled                 = 	dllIsEnabled                 ;
	//	glIsList                    = 	dllIsList                    ;
	//	glIsTexture                 = 	dllIsTexture                 ;
	//	glLightModelf               = 	dllLightModelf               ;
	//	glLightModelfv              = 	dllLightModelfv              ;
	//	glLightModeli               = 	dllLightModeli               ;
	//	glLightModeliv              = 	dllLightModeliv              ;
	//	glLightf                    = 	dllLightf                    ;
	//	glLightfv                   = 	dllLightfv                   ;
	//	glLighti                    = 	dllLighti                    ;
	//	glLightiv                   = 	dllLightiv                   ;
	//	glLineStipple               = 	dllLineStipple               ;
	//	glLineWidth                 = 	dllLineWidth                 ;
	//	glListBase                  = 	dllListBase                  ;
	//	glLoadIdentity              = 	dllLoadIdentity              ;
	//	glLoadMatrixd               = 	dllLoadMatrixd               ;
	//	glLoadMatrixf               = 	dllLoadMatrixf               ;
	//	glLoadName                  = 	dllLoadName                  ;
	//	glLogicOp                   = 	dllLogicOp                   ;
	//	glMap1d                     = 	dllMap1d                     ;
	//	glMap1f                     = 	dllMap1f                     ;
	//	glMap2d                     = 	dllMap2d                     ;
	//	glMap2f                     = 	dllMap2f                     ;
	//	glMapGrid1d                 = 	dllMapGrid1d                 ;
	//	glMapGrid1f                 = 	dllMapGrid1f                 ;
	//	glMapGrid2d                 = 	dllMapGrid2d                 ;
	//	glMapGrid2f                 = 	dllMapGrid2f                 ;
	//	glMaterialf                 = 	dllMaterialf                 ;
	//	glMaterialfv                = 	dllMaterialfv                ;
	//	glMateriali                 = 	dllMateriali                 ;
	//	glMaterialiv                = 	dllMaterialiv                ;
	//	glMatrixMode                = 	dllMatrixMode                ;
	//	glMultMatrixd               = 	dllMultMatrixd               ;
	//	glMultMatrixf               = 	dllMultMatrixf               ;
	//	glNewList                   = 	dllNewList                   ;
	//	glNormal3b                  = 	dllNormal3b                  ;
	//	glNormal3bv                 = 	dllNormal3bv                 ;
	//	glNormal3d                  = 	dllNormal3d                  ;
	//	glNormal3dv                 = 	dllNormal3dv                 ;
	//	glNormal3f                  = 	dllNormal3f                  ;
	//	glNormal3fv                 = 	dllNormal3fv                 ;
	//	glNormal3i                  = 	dllNormal3i                  ;
	//	glNormal3iv                 = 	dllNormal3iv                 ;
	//	glNormal3s                  = 	dllNormal3s                  ;
	//	glNormal3sv                 = 	dllNormal3sv                 ;
	//	glNormalPointer             = 	dllNormalPointer             ;
	//	glOrtho                     = 	dllOrtho                     ;
	//	glPassThrough               = 	dllPassThrough               ;
	//	glPixelMapfv                = 	dllPixelMapfv                ;
	//	glPixelMapuiv               = 	dllPixelMapuiv               ;
	//	glPixelMapusv               = 	dllPixelMapusv               ;
	//	glPixelStoref               = 	dllPixelStoref               ;
	//	glPixelStorei               = 	dllPixelStorei               ;
	//	glPixelTransferf            = 	dllPixelTransferf            ;
	//	glPixelTransferi            = 	dllPixelTransferi            ;
	//	glPixelZoom                 = 	dllPixelZoom                 ;
	//	glPointSize                 = 	dllPointSize                 ;
	//	glPolygonMode               = 	dllPolygonMode               ;
	//	glPolygonOffset             = 	dllPolygonOffset             ;
	//	glPolygonStipple            = 	dllPolygonStipple            ;
	//	glPopAttrib                 = 	dllPopAttrib                 ;
	//	glPopClientAttrib           = 	dllPopClientAttrib           ;
	//	glPopMatrix                 = 	dllPopMatrix                 ;
	//	glPopName                   = 	dllPopName                   ;
	//	glPrioritizeTextures        = 	dllPrioritizeTextures        ;
	//	glPushAttrib                = 	dllPushAttrib                ;
	//	glPushClientAttrib          = 	dllPushClientAttrib          ;
	//	glPushMatrix                = 	dllPushMatrix                ;
	//	glPushName                  = 	dllPushName                  ;
	//	glRasterPos2d               = 	dllRasterPos2d               ;
	//	glRasterPos2dv              = 	dllRasterPos2dv              ;
	//	glRasterPos2f               = 	dllRasterPos2f               ;
	//	glRasterPos2fv              = 	dllRasterPos2fv              ;
	//	glRasterPos2i               = 	dllRasterPos2i               ;
	//	glRasterPos2iv              = 	dllRasterPos2iv              ;
	//	glRasterPos2s               = 	dllRasterPos2s               ;
	//	glRasterPos2sv              = 	dllRasterPos2sv              ;
	//	glRasterPos3d               = 	dllRasterPos3d               ;
	//	glRasterPos3dv              = 	dllRasterPos3dv              ;
	//	glRasterPos3f               = 	dllRasterPos3f               ;
	//	glRasterPos3fv              = 	dllRasterPos3fv              ;
	//	glRasterPos3i               = 	dllRasterPos3i               ;
	//	glRasterPos3iv              = 	dllRasterPos3iv              ;
	//	glRasterPos3s               = 	dllRasterPos3s               ;
	//	glRasterPos3sv              = 	dllRasterPos3sv              ;
	//	glRasterPos4d               = 	dllRasterPos4d               ;
	//	glRasterPos4dv              = 	dllRasterPos4dv              ;
	//	glRasterPos4f               = 	dllRasterPos4f               ;
	//	glRasterPos4fv              = 	dllRasterPos4fv              ;
	//	glRasterPos4i               = 	dllRasterPos4i               ;
	//	glRasterPos4iv              = 	dllRasterPos4iv              ;
	//	glRasterPos4s               = 	dllRasterPos4s               ;
	//	glRasterPos4sv              = 	dllRasterPos4sv              ;
	//	glReadBuffer                = 	dllReadBuffer                ;
	//	glReadPixels                = 	dllReadPixels                ;
	//	glRectd                     = 	dllRectd                     ;
	//	glRectdv                    = 	dllRectdv                    ;
	//	glRectf                     = 	dllRectf                     ;
	//	glRectfv                    = 	dllRectfv                    ;
	//	glRecti                     = 	dllRecti                     ;
	//	glRectiv                    = 	dllRectiv                    ;
	//	glRects                     = 	dllRects                     ;
	//	glRectsv                    = 	dllRectsv                    ;
	//	glRenderMode                = 	dllRenderMode                ;
	//	glRotated                   = 	dllRotated                   ;
	//	glRotatef                   = 	dllRotatef                   ;
	//	glScaled                    = 	dllScaled                    ;
	//	glScalef                    = 	dllScalef                    ;
	//	glScissor                   = 	dllScissor                   ;
	//	glSelectBuffer              = 	dllSelectBuffer              ;
	//	glShadeModel                = 	dllShadeModel                ;
	//	glStencilFunc               = 	dllStencilFunc               ;
	//	glStencilMask               = 	dllStencilMask               ;
	//	glStencilOp                 = 	dllStencilOp                 ;
	//	glTexCoord1d                = 	dllTexCoord1d                ;
	//	glTexCoord1dv               = 	dllTexCoord1dv               ;
	//	glTexCoord1f                = 	dllTexCoord1f                ;
	//	glTexCoord1fv               = 	dllTexCoord1fv               ;
	//	glTexCoord1i                = 	dllTexCoord1i                ;
	//	glTexCoord1iv               = 	dllTexCoord1iv               ;
	//	glTexCoord1s                = 	dllTexCoord1s                ;
	//	glTexCoord1sv               = 	dllTexCoord1sv               ;
	//	glTexCoord2d                = 	dllTexCoord2d                ;
	//	glTexCoord2dv               = 	dllTexCoord2dv               ;
	//	glTexCoord2f                = 	dllTexCoord2f                ;
	//	glTexCoord2fv               = 	dllTexCoord2fv               ;
	//	glTexCoord2i                = 	dllTexCoord2i                ;
	//	glTexCoord2iv               = 	dllTexCoord2iv               ;
	//	glTexCoord2s                = 	dllTexCoord2s                ;
	//	glTexCoord2sv               = 	dllTexCoord2sv               ;
	//	glTexCoord3d                = 	dllTexCoord3d                ;
	//	glTexCoord3dv               = 	dllTexCoord3dv               ;
	//	glTexCoord3f                = 	dllTexCoord3f                ;
	//	glTexCoord3fv               = 	dllTexCoord3fv               ;
	//	glTexCoord3i                = 	dllTexCoord3i                ;
	//	glTexCoord3iv               = 	dllTexCoord3iv               ;
	//	glTexCoord3s                = 	dllTexCoord3s                ;
	//	glTexCoord3sv               = 	dllTexCoord3sv               ;
	//	glTexCoord4d                = 	dllTexCoord4d                ;
	//	glTexCoord4dv               = 	dllTexCoord4dv               ;
	//	glTexCoord4f                = 	dllTexCoord4f                ;
	//	glTexCoord4fv               = 	dllTexCoord4fv               ;
	//	glTexCoord4i                = 	dllTexCoord4i                ;
	//	glTexCoord4iv               = 	dllTexCoord4iv               ;
	//	glTexCoord4s                = 	dllTexCoord4s                ;
	//	glTexCoord4sv               = 	dllTexCoord4sv               ;
	//	glTexCoordPointer           = 	dllTexCoordPointer           ;
	//	glTexEnvf                   = 	dllTexEnvf                   ;
	//	glTexEnvfv                  = 	dllTexEnvfv                  ;
	//	glTexEnvi                   = 	dllTexEnvi                   ;
	//	glTexEnviv                  = 	dllTexEnviv                  ;
	//	glTexGend                   = 	dllTexGend                   ;
	//	glTexGendv                  = 	dllTexGendv                  ;
	//	glTexGenf                   = 	dllTexGenf                   ;
	//	glTexGenfv                  = 	dllTexGenfv                  ;
	//	glTexGeni                   = 	dllTexGeni                   ;
	//	glTexGeniv                  = 	dllTexGeniv                  ;
	//	glTexImage1D                = 	dllTexImage1D                ;
	//	glTexImage2D                = 	dllTexImage2D                ;
	//	glTexParameterf             = 	dllTexParameterf             ;
	//	glTexParameterfv            = 	dllTexParameterfv            ;
	//	glTexParameteri             = 	dllTexParameteri             ;
	//	glTexParameteriv            = 	dllTexParameteriv            ;
	//	glTexSubImage1D             = 	dllTexSubImage1D             ;
	//	glTexSubImage2D             = 	dllTexSubImage2D             ;
	//	glTranslated                = 	dllTranslated                ;
	//	glTranslatef                = 	dllTranslatef                ;
	//	glVertex2d                  = 	dllVertex2d                  ;
	//	glVertex2dv                 = 	dllVertex2dv                 ;
	//	glVertex2f                  = 	dllVertex2f                  ;
	//	glVertex2fv                 = 	dllVertex2fv                 ;
	//	glVertex2i                  = 	dllVertex2i                  ;
	//	glVertex2iv                 = 	dllVertex2iv                 ;
	//	glVertex2s                  = 	dllVertex2s                  ;
	//	glVertex2sv                 = 	dllVertex2sv                 ;
	//	glVertex3d                  = 	dllVertex3d                  ;
	//	glVertex3dv                 = 	dllVertex3dv                 ;
	//	glVertex3f                  = 	dllVertex3f                  ;
	//	glVertex3fv                 = 	dllVertex3fv                 ;
	//	glVertex3i                  = 	dllVertex3i                  ;
	//	glVertex3iv                 = 	dllVertex3iv                 ;
	//	glVertex3s                  = 	dllVertex3s                  ;
	//	glVertex3sv                 = 	dllVertex3sv                 ;
	//	glVertex4d                  = 	dllVertex4d                  ;
	//	glVertex4dv                 = 	dllVertex4dv                 ;
	//	glVertex4f                  = 	dllVertex4f                  ;
	//	glVertex4fv                 = 	dllVertex4fv                 ;
	//	glVertex4i                  = 	dllVertex4i                  ;
	//	glVertex4iv                 = 	dllVertex4iv                 ;
	//	glVertex4s                  = 	dllVertex4s                  ;
	//	glVertex4sv                 = 	dllVertex4sv                 ;
	//	glVertexPointer             = 	dllVertexPointer             ;
	//	glViewport                  = 	dllViewport                  ;
	//}
}
