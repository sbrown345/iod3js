
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

////#include "../idlib/precompiled.h"
////#pragma hdrstop

////#include "tr_local.h"

////// Vista OpenGL wrapper check
////#ifdef _WIN32
////#include "../sys/win32/win_local.h"
////#endif

// functions that are not called every frame

var glConfig = new glconfig_t ( );

////static void GfxInfo_f( void );

var r_inhibitFragmentProgram = new idCVar( "r_inhibitFragmentProgram", "0", CVAR_RENDERER | CVAR_BOOL, "ignore the fragment program extension" );
var r_glDriver = new idCVar( "r_glDriver", "", CVAR_RENDERER, "\"opengl32\", etc." );
var r_useLightPortalFlow = new idCVar( "r_useLightPortalFlow", "1", CVAR_RENDERER | CVAR_BOOL, "use a more precise area reference determination" );
var r_multiSamples = new idCVar( "r_multiSamples", "0", CVAR_RENDERER | CVAR_ARCHIVE | CVAR_INTEGER, "number of antialiasing samples" );
var r_mode = new idCVar( "r_mode", "3", CVAR_ARCHIVE | CVAR_RENDERER | CVAR_INTEGER, "video mode number" );
var r_displayRefresh = new idCVar( "r_displayRefresh", "0", CVAR_RENDERER | CVAR_INTEGER | CVAR_NOCHEAT, "optional display refresh rate option for vid mode", 0.0, 200.0 );
var r_fullscreen = new idCVar( "r_fullscreen", "1", CVAR_RENDERER | CVAR_ARCHIVE | CVAR_BOOL, "0 = windowed, 1 = full screen" );
var r_customWidth = new idCVar( "r_customWidth", "720", CVAR_RENDERER | CVAR_ARCHIVE | CVAR_INTEGER, "custom screen width. set r_mode to -1 to activate" );
var r_customHeight = new idCVar( "r_customHeight", "486", CVAR_RENDERER | CVAR_ARCHIVE | CVAR_INTEGER, "custom screen height. set r_mode to -1 to activate" );
var r_singleTriangle = new idCVar( "r_singleTriangle", "0", CVAR_RENDERER | CVAR_BOOL, "only draw a single triangle per primitive" );
var r_checkBounds = new idCVar( "r_checkBounds", "0", CVAR_RENDERER | CVAR_BOOL, "compare all surface bounds with precalculated ones" );

var r_useConstantMaterials = new idCVar( "r_useConstantMaterials", "1", CVAR_RENDERER | CVAR_BOOL, "use pre-calculated material registers if possible" );
var r_useTripleTextureARB = new idCVar( "r_useTripleTextureARB", "1", CVAR_RENDERER | CVAR_BOOL, "cards with 3+ texture units do a two pass instead of three pass" );
var r_useSilRemap = new idCVar( "r_useSilRemap", "1", CVAR_RENDERER | CVAR_BOOL, "consider verts with the same XYZ, but different ST the same for shadows" );
var r_useNodeCommonChildren = new idCVar( "r_useNodeCommonChildren", "1", CVAR_RENDERER | CVAR_BOOL, "stop pushing reference bounds early when possible" );
var r_useShadowProjectedCull = new idCVar( "r_useShadowProjectedCull", "1", CVAR_RENDERER | CVAR_BOOL, "discard triangles outside light volume before shadowing" );
var r_useShadowVertexProgram = new idCVar( "r_useShadowVertexProgram", "1", CVAR_RENDERER | CVAR_BOOL, "do the shadow projection in the vertex program on capable cards" );
var r_useShadowSurfaceScissor = new idCVar( "r_useShadowSurfaceScissor", "1", CVAR_RENDERER | CVAR_BOOL, "scissor shadows by the scissor rect of the interaction surfaces" );
var r_useInteractionTable = new idCVar( "r_useInteractionTable", "1", CVAR_RENDERER | CVAR_BOOL, "create a full entityDefs * lightDefs table to make finding interactions faster" );
var r_useTurboShadow = new idCVar( "r_useTurboShadow", "1", CVAR_RENDERER | CVAR_BOOL, "use the infinite projection with W technique for dynamic shadows" );
var r_useTwoSidedStencil = new idCVar( "r_useTwoSidedStencil", "1", CVAR_RENDERER | CVAR_BOOL, "do stencil shadows in one pass with different ops on each side" );
var r_useDeferredTangents = new idCVar( "r_useDeferredTangents", "1", CVAR_RENDERER | CVAR_BOOL, "defer tangents calculations after deform" );
var r_useCachedDynamicModels = new idCVar( "r_useCachedDynamicModels", "1", CVAR_RENDERER | CVAR_BOOL, "cache snapshots of dynamic models" );

var r_useStateCaching = new idCVar( "r_useStateCaching", "1", CVAR_RENDERER | CVAR_BOOL, "avoid redundant state changes in GL_* = new idCVar() calls" );
var r_useInfiniteFarZ = new idCVar( "r_useInfiniteFarZ", "1", CVAR_RENDERER | CVAR_BOOL, "use the no-far-clip-plane trick" );

var r_znear = new idCVar( "r_znear", "3", CVAR_RENDERER | CVAR_FLOAT, "near Z clip plane distance", 0.001, 200.0 );

var r_ignoreGLErrors = new idCVar( "r_ignoreGLErrors", "1", CVAR_RENDERER | CVAR_BOOL, "ignore GL errors" );
var r_finish = new idCVar( "r_finish", "0", CVAR_RENDERER | CVAR_BOOL, "force a call to glFinish = new idCVar() every frame" );
var r_swapInterval = new idCVar( "r_swapInterval", "0", CVAR_RENDERER | CVAR_ARCHIVE | CVAR_INTEGER, "changes wglSwapIntarval" );

var r_gamma = new idCVar( "r_gamma", "1", CVAR_RENDERER | CVAR_ARCHIVE | CVAR_FLOAT, "changes gamma tables", 0.5, 3.0 );
var r_brightness = new idCVar( "r_brightness", "1", CVAR_RENDERER | CVAR_ARCHIVE | CVAR_FLOAT, "changes gamma tables", 0.5, 2.0 );

var r_renderer = new idCVar("r_renderer", "glsl", CVAR_RENDERER | CVAR_ARCHIVE, "hardware specific renderer path to use");

var r_jitter= new idCVar( "r_jitter", "0", CVAR_RENDERER | CVAR_BOOL, "randomly subpixel jitter the projection matrix" );

var r_skipSuppress= new idCVar( "r_skipSuppress", "0", CVAR_RENDERER | CVAR_BOOL, "ignore the per-view suppressions" );
var r_skipPostProcess= new idCVar( "r_skipPostProcess", "0", CVAR_RENDERER | CVAR_BOOL, "skip all post-process renderings" );
var r_skipLightScale= new idCVar( "r_skipLightScale", "0", CVAR_RENDERER | CVAR_BOOL, "don't do any post-interaction light scaling, makes things dim on low-dynamic range cards" );
var r_skipInteractions= new idCVar( "r_skipInteractions", "0", CVAR_RENDERER | CVAR_BOOL, "skip all light/surface interaction drawing" );
var r_skipDynamicTextures= new idCVar( "r_skipDynamicTextures", "0", CVAR_RENDERER | CVAR_BOOL, "don't dynamically create textures" );
var r_skipCopyTexture= new idCVar( "r_skipCopyTexture", "0", CVAR_RENDERER | CVAR_BOOL, "do all rendering, but don't actually copyTexSubImage2D" );
var r_skipBackEnd= new idCVar( "r_skipBackEnd", "0", CVAR_RENDERER | CVAR_BOOL, "don't draw anything" );
var r_skipRender= new idCVar( "r_skipRender", "0", CVAR_RENDERER | CVAR_BOOL, "skip 3D rendering, but pass 2D" );
var r_skipRenderContext= new idCVar( "r_skipRenderContext", "0", CVAR_RENDERER | CVAR_BOOL, "NULL the rendering context during backend 3D rendering" );
var r_skipTranslucent= new idCVar( "r_skipTranslucent", "0", CVAR_RENDERER | CVAR_BOOL, "skip the translucent interaction rendering" );
var r_skipAmbient= new idCVar( "r_skipAmbient", "0", CVAR_RENDERER | CVAR_BOOL, "bypasses all non-interaction drawing" );
var r_skipNewAmbient= new idCVar( "r_skipNewAmbient", "0", CVAR_RENDERER | CVAR_BOOL | CVAR_ARCHIVE, "bypasses all vertex/fragment program ambient drawing" );
var r_skipBlendLights= new idCVar( "r_skipBlendLights", "0", CVAR_RENDERER | CVAR_BOOL, "skip all blend lights" );
var r_skipFogLights= new idCVar( "r_skipFogLights", "0", CVAR_RENDERER | CVAR_BOOL, "skip all fog lights" );
var r_skipDeforms= new idCVar( "r_skipDeforms", "0", CVAR_RENDERER | CVAR_BOOL, "leave all deform materials in their original state" );
var r_skipFrontEnd= new idCVar( "r_skipFrontEnd", "0", CVAR_RENDERER | CVAR_BOOL, "bypasses all front end work, but 2D gui rendering still draws" );
var r_skipUpdates= new idCVar( "r_skipUpdates", "0", CVAR_RENDERER | CVAR_BOOL, "1 = don't accept any entity or light updates, making everything static" );
var r_skipOverlays= new idCVar( "r_skipOverlays", "0", CVAR_RENDERER | CVAR_BOOL, "skip overlay surfaces" );
var r_skipSpecular= new idCVar( "r_skipSpecular", "0", CVAR_RENDERER | CVAR_BOOL | CVAR_CHEAT | CVAR_ARCHIVE, "use black for specular1" );
var r_skipBump= new idCVar( "r_skipBump", "0", CVAR_RENDERER | CVAR_BOOL | CVAR_ARCHIVE, "uses a flat surface instead of the bump map" );
var r_skipDiffuse= new idCVar( "r_skipDiffuse", "0", CVAR_RENDERER | CVAR_BOOL, "use black for diffuse" );
var r_skipROQ= new idCVar( "r_skipROQ", "0", CVAR_RENDERER | CVAR_BOOL, "skip ROQ decoding" );

var r_ignore= new idCVar( "r_ignore", "0", CVAR_RENDERER, "used for random debugging without defining new vars" );
var r_ignore2= new idCVar( "r_ignore2", "0", CVAR_RENDERER, "used for random debugging without defining new vars" );
var r_usePreciseTriangleInteractions= new idCVar( "r_usePreciseTriangleInteractions", "0", CVAR_RENDERER | CVAR_BOOL, "1 = do winding clipping to determine if each ambiguous tri should be lit" );
//var r_useCulling= new idCVar( "r_useCulling", "2", CVAR_RENDERER | CVAR_INTEGER, "0 = none, 1 = sphere, 2 = sphere + box", 0, 2, ArgCompletion_Integer_Template(0,2));
//var r_useLightCulling= new idCVar( "r_useLightCulling", "3", CVAR_RENDERER | CVAR_INTEGER, "0 = none, 1 = box, 2 = exact clip of polyhedron faces, 3 = also areas", 0, 3, idCmdSystem::ArgCompletion_Integer<0,3> );
var r_useLightScissors= new idCVar( "r_useLightScissors", "1", CVAR_RENDERER | CVAR_BOOL, "1 = use custom scissor rectangle for each light" );
//var r_useClippedLightScissors= new idCVar( "r_useClippedLightScissors", "1", CVAR_RENDERER | CVAR_INTEGER, "0 = full screen when near clipped, 1 = exact when near clipped, 2 = exact always", 0, 2, ArgCompletion_Integer_Template(0,2));
var r_useEntityCulling= new idCVar( "r_useEntityCulling", "1", CVAR_RENDERER | CVAR_BOOL, "0 = none, 1 = box" );
var r_useEntityScissors= new idCVar( "r_useEntityScissors", "0", CVAR_RENDERER | CVAR_BOOL, "1 = use custom scissor rectangle for each entity" );
var r_useInteractionCulling= new idCVar( "r_useInteractionCulling", "1", CVAR_RENDERER | CVAR_BOOL, "1 = cull interactions" );
//var r_useInteractionScissors= new idCVar( "r_useInteractionScissors", "2", CVAR_RENDERER | CVAR_INTEGER, "1 = use a custom scissor rectangle for each shadow interaction, 2 = also crop using portal scissors", -2, 2, idCmdSystem::ArgCompletion_Integer<-2,2> );
var r_useShadowCulling= new idCVar( "r_useShadowCulling", "1", CVAR_RENDERER | CVAR_BOOL, "try to cull shadows from partially visible lights" );
var r_useFrustumFarDistance= new idCVar( "r_useFrustumFarDistance", "0", CVAR_RENDERER | CVAR_FLOAT, "if != 0 force the view frustum far distance to this distance" );
var r_logFile= new idCVar( "r_logFile", "0", CVAR_RENDERER | CVAR_INTEGER, "number of frames to emit GL logs" );
var r_clear= new idCVar( "r_clear", "2", CVAR_RENDERER, "force screen clear every frame, 1 = purple, 2 = black, 'r g b' = custom" );
var r_offsetFactor= new idCVar( "r_offsetfactor", "0", CVAR_RENDERER | CVAR_FLOAT, "polygon offset parameter" );
var r_offsetUnits= new idCVar( "r_offsetunits", "-600", CVAR_RENDERER | CVAR_FLOAT, "polygon offset parameter" );
var r_shadowPolygonOffset= new idCVar( "r_shadowPolygonOffset", "-1", CVAR_RENDERER | CVAR_FLOAT, "bias value added to depth test for stencil shadow drawing" );
var r_shadowPolygonFactor= new idCVar( "r_shadowPolygonFactor", "0", CVAR_RENDERER | CVAR_FLOAT, "scale value for stencil shadow drawing" );
var r_frontBuffer= new idCVar( "r_frontBuffer", "0", CVAR_RENDERER | CVAR_BOOL, "draw to front buffer for debugging" );
var r_skipSubviews= new idCVar( "r_skipSubviews", "0", CVAR_RENDERER | CVAR_INTEGER, "1 = don't render any gui elements on surfaces" );
//var r_skipGuiShaders= new idCVar( "r_skipGuiShaders", "0", CVAR_RENDERER | CVAR_INTEGER, "1 = skip all gui elements on surfaces, 2 = skip drawing but still handle events, 3 = draw but skip events", 0, 3, idCmdSystem::ArgCompletion_Integer<0,3> );
//var r_skipParticles= new idCVar( "r_skipParticles", "0", CVAR_RENDERER | CVAR_INTEGER, "1 = skip all particle systems", 0, 1, idCmdSystem::ArgCompletion_Integer<0,1> );
var r_subviewOnly= new idCVar( "r_subviewOnly", "0", CVAR_RENDERER | CVAR_BOOL, "1 = don't render main view, allowing subviews to be debugged" );
var r_shadows= new idCVar( "r_shadows", "1", CVAR_RENDERER | CVAR_BOOL  | CVAR_ARCHIVE, "enable shadows" );
var r_testARBProgram= new idCVar( "r_testARBProgram", "0", CVAR_RENDERER | CVAR_BOOL, "experiment with vertex/fragment programs" );
var r_testGamma= new idCVar( "r_testGamma", "0", CVAR_RENDERER | CVAR_FLOAT, "if > 0 draw a grid pattern to test gamma levels", 0, 195 );
var r_testGammaBias= new idCVar( "r_testGammaBias", "0", CVAR_RENDERER | CVAR_FLOAT, "if > 0 draw a grid pattern to test gamma levels" );
var r_testStepGamma= new idCVar( "r_testStepGamma", "0", CVAR_RENDERER | CVAR_FLOAT, "if > 0 draw a grid pattern to test gamma levels" );
var r_lightScale= new idCVar( "r_lightScale", "2", CVAR_RENDERER | CVAR_FLOAT, "all light intensities are multiplied by this" );
var r_lightSourceRadius= new idCVar( "r_lightSourceRadius", "0", CVAR_RENDERER | CVAR_FLOAT, "for soft-shadow sampling" );
var r_flareSize= new idCVar( "r_flareSize", "1", CVAR_RENDERER | CVAR_FLOAT, "scale the flare deforms from the material def" ); 

//var r_useExternalShadows= new idCVar( "r_useExternalShadows", "1", CVAR_RENDERER | CVAR_INTEGER, "1 = skip drawing caps when outside the light volume, 2 = force to no caps for testing", 0, 2, ArgCompletion_Integer_Template(0,2));
var r_useOptimizedShadows= new idCVar( "r_useOptimizedShadows", "1", CVAR_RENDERER | CVAR_BOOL, "use the dmap generated static shadow volumes" );
var r_useScissor= new idCVar( "r_useScissor", "1", CVAR_RENDERER | CVAR_BOOL, "scissor clip as portals and lights are processed" );
var r_useCombinerDisplayLists= new idCVar( "r_useCombinerDisplayLists", "1", CVAR_RENDERER | CVAR_BOOL | CVAR_NOCHEAT, "put all nvidia register combiner programming in display lists" );
var r_useDepthBoundsTest= new idCVar( "r_useDepthBoundsTest", "1", CVAR_RENDERER | CVAR_BOOL, "use depth bounds test to reduce shadow fill" );

var r_screenFraction= new idCVar( "r_screenFraction", "100", CVAR_RENDERER | CVAR_INTEGER, "for testing fill rate, the resolution of the entire screen can be changed" );
var r_demonstrateBug= new idCVar( "r_demonstrateBug", "0", CVAR_RENDERER | CVAR_BOOL, "used during development to show IHV's their problems" );
var r_usePortals= new idCVar( "r_usePortals", "1", CVAR_RENDERER | CVAR_BOOL, " 1 = use portals to perform area culling, otherwise draw everything" );
var r_singleLight= new idCVar( "r_singleLight", "-1", CVAR_RENDERER | CVAR_INTEGER, "suppress all but one light" );
var r_singleEntity= new idCVar( "r_singleEntity", "-1", CVAR_RENDERER | CVAR_INTEGER, "suppress all but one entity" );
var r_singleSurface= new idCVar( "r_singleSurface", "-1", CVAR_RENDERER | CVAR_INTEGER, "suppress all but one surface on each entity" );
var r_singleArea= new idCVar( "r_singleArea", "0", CVAR_RENDERER | CVAR_BOOL, "only draw the portal area the view is actually in" );
var r_forceLoadImages= new idCVar( "r_forceLoadImages", "0", CVAR_RENDERER | CVAR_ARCHIVE | CVAR_BOOL, "draw all images to screen after registration" );
var r_orderIndexes= new idCVar( "r_orderIndexes", "1", CVAR_RENDERER | CVAR_BOOL, "perform index reorganization to optimize vertex use" );
var r_lightAllBackFaces= new idCVar( "r_lightAllBackFaces", "0", CVAR_RENDERER | CVAR_BOOL, "light all the back faces, even when they would be shadowed" );

// visual debugging info
var r_showPortals= new idCVar( "r_showPortals", "0", CVAR_RENDERER | CVAR_BOOL, "draw portal outlines in color based on passed / not passed" );
var r_showUnsmoothedTangents= new idCVar( "r_showUnsmoothedTangents", "0", CVAR_RENDERER | CVAR_BOOL, "if 1, put all nvidia register combiner programming in display lists" );
var r_showSilhouette= new idCVar( "r_showSilhouette", "0", CVAR_RENDERER | CVAR_BOOL, "highlight edges that are casting shadow planes" );
var r_showVertexColor= new idCVar( "r_showVertexColor", "0", CVAR_RENDERER | CVAR_BOOL, "draws all triangles with the solid vertex color" );
var r_showUpdates= new idCVar( "r_showUpdates", "0", CVAR_RENDERER | CVAR_BOOL, "report entity and light updates and ref counts" );
var r_showDemo= new idCVar( "r_showDemo", "0", CVAR_RENDERER | CVAR_BOOL, "report reads and writes to the demo file" );
var r_showDynamic= new idCVar( "r_showDynamic", "0", CVAR_RENDERER | CVAR_BOOL, "report stats on dynamic surface generation" );
var r_showLightScale= new idCVar( "r_showLightScale", "0", CVAR_RENDERER | CVAR_BOOL, "report the scale factor applied to drawing for overbrights" );
var r_showDefs= new idCVar( "r_showDefs", "0", CVAR_RENDERER | CVAR_BOOL, "report the number of modeDefs and lightDefs in view" );
//var r_showTrace = new idCVar( "r_showTrace", "0", CVAR_RENDERER | CVAR_INTEGER, "show the intersection of an eye trace with the world", ArgCompletion_Integer_Template( 0, 2 ) );
var r_showIntensity= new idCVar( "r_showIntensity", "0", CVAR_RENDERER | CVAR_BOOL, "draw the screen colors based on intensity, red = 0, green = 128, blue = 255" );
var r_showImages= new idCVar( "r_showImages", "0", CVAR_RENDERER | CVAR_INTEGER, "1 = show all images instead of rendering, 2 = show in proportional size", 0, 2, ArgCompletion_Integer_Template(0,2));
var r_showSmp= new idCVar( "r_showSmp", "0", CVAR_RENDERER | CVAR_BOOL, "show which end = new idCVar(front or back) is blocking" );
//var r_showLights= new idCVar( "r_showLights", "0", CVAR_RENDERER | CVAR_INTEGER, "1 = just print volumes numbers, highlighting ones covering the view, 2 = also draw planes of each volume, 3 = also draw edges of each volume", 0, 3, idCmdSystem::ArgCompletion_Integer<0,3> );
//var r_showShadows= new idCVar( "r_showShadows", "0", CVAR_RENDERER | CVAR_INTEGER, "1 = visualize the stencil shadow volumes, 2 = draw filled in", 0, 3, idCmdSystem::ArgCompletion_Integer<0,3> );
//var r_showShadowCount= new idCVar( "r_showShadowCount", "0", CVAR_RENDERER | CVAR_INTEGER, "colors screen based on shadow volume depth complexity, >= 2 = print overdraw count based on stencil index values, 3 = only show turboshadows, 4 = only show static shadows", 0, 4, idCmdSystem::ArgCompletion_Integer<0,4> );
var r_showLightScissors= new idCVar( "r_showLightScissors", "0", CVAR_RENDERER | CVAR_BOOL, "show light scissor rectangles" );
var r_showEntityScissors= new idCVar( "r_showEntityScissors", "0", CVAR_RENDERER | CVAR_BOOL, "show entity scissor rectangles" );
//var r_showInteractionFrustums= new idCVar( "r_showInteractionFrustums", "0", CVAR_RENDERER | CVAR_INTEGER, "1 = show a frustum for each interaction, 2 = also draw lines to light origin, 3 = also draw entity bbox", 0, 3, idCmdSystem::ArgCompletion_Integer<0,3> );
//var r_showInteractionScissors= new idCVar( "r_showInteractionScissors", "0", CVAR_RENDERER | CVAR_INTEGER, "1 = show screen rectangle which contains the interaction frustum, 2 = also draw construction lines", 0, 2, ArgCompletion_Integer_Template(0,2));
//var r_showLightCount= new idCVar( "r_showLightCount", "0", CVAR_RENDERER | CVAR_INTEGER, "1 = colors surfaces based on light count, 2 = also count everything through walls, 3 = also print overdraw", 0, 3, idCmdSystem::ArgCompletion_Integer<0,3> );
//var r_showViewEntitys= new idCVar( "r_showViewEntitys", "0", CVAR_RENDERER | CVAR_INTEGER, "1 = displays the bounding boxes of all view models, 2 = print index numbers" );
//var r_showTris= new idCVar( "r_showTris", "0", CVAR_RENDERER | CVAR_INTEGER, "enables wireframe rendering of the world, 1 = only draw visible ones, 2 = draw all front facing, 3 = draw all", 0, 3, idCmdSystem::ArgCompletion_Integer<0,3> );
var r_showSurfaceInfo= new idCVar( "r_showSurfaceInfo", "0", CVAR_RENDERER | CVAR_BOOL, "show surface material name under crosshair" );
var r_showNormals= new idCVar( "r_showNormals", "0", CVAR_RENDERER | CVAR_FLOAT, "draws wireframe normals" );
var r_showMemory= new idCVar( "r_showMemory", "0", CVAR_RENDERER | CVAR_BOOL, "print frame memory utilization" );
var r_showCull= new idCVar( "r_showCull", "0", CVAR_RENDERER | CVAR_BOOL, "report sphere and box culling stats" );
var r_showInteractions= new idCVar( "r_showInteractions", "0", CVAR_RENDERER | CVAR_BOOL, "report interaction generation activity" );
var r_showDepth= new idCVar( "r_showDepth", "0", CVAR_RENDERER | CVAR_BOOL, "display the contents of the depth buffer and the depth range" );
var r_showSurfaces= new idCVar( "r_showSurfaces", "0", CVAR_RENDERER | CVAR_BOOL, "report surface/light/shadow counts" );
var r_showPrimitives= new idCVar( "r_showPrimitives", "0", CVAR_RENDERER | CVAR_INTEGER, "report drawsurf/index/vertex counts" );
var r_showEdges= new idCVar( "r_showEdges", "0", CVAR_RENDERER | CVAR_BOOL, "draw the sil edges" );
var r_showTexturePolarity= new idCVar( "r_showTexturePolarity", "0", CVAR_RENDERER | CVAR_BOOL, "shade triangles by texture area polarity" );
//var r_showTangentSpace= new idCVar( "r_showTangentSpace", "0", CVAR_RENDERER | CVAR_INTEGER, "shade triangles by tangent space, 1 = use 1st tangent vector, 2 = use 2nd tangent vector, 3 = use normal vector", 0, 3, idCmdSystem::ArgCompletion_Integer<0,3> );
var r_showDominantTri= new idCVar( "r_showDominantTri", "0", CVAR_RENDERER | CVAR_BOOL, "draw lines from vertexes to center of dominant triangles" );
var r_showAlloc= new idCVar( "r_showAlloc", "0", CVAR_RENDERER | CVAR_BOOL, "report alloc/free counts" );
var r_showTextureVectors= new idCVar( "r_showTextureVectors", "0", CVAR_RENDERER | CVAR_FLOAT, " if > 0 draw each triangles texture = new idCVar(tangent) vectors" );
var r_showOverDraw = new idCVar( "r_showOverDraw", "0", CVAR_RENDERER | CVAR_INTEGER, "1 = geometry overdraw, 2 = light interaction overdraw, 3 = geometry and light interaction overdraw", 0, 3, ArgCompletion_Integer_Template( 0, 3 ) );

var r_lockSurfaces= new idCVar( "r_lockSurfaces", "0", CVAR_RENDERER | CVAR_BOOL, "allow moving the view point without changing the composition of the scene, including culling" );
var r_useEntityCallbacks= new idCVar( "r_useEntityCallbacks", "1", CVAR_RENDERER | CVAR_BOOL, "if 0, issue the callback immediately at update time, rather than defering" );

//var r_showSkel= new idCVar( "r_showSkel", "0", CVAR_RENDERER | CVAR_INTEGER, "draw the skeleton when model animates, 1 = draw model with skeleton, 2 = draw skeleton only", 0, 2, ArgCompletion_Integer_Template(0,2));
var r_jointNameScale= new idCVar( "r_jointNameScale", "0.02", CVAR_RENDERER | CVAR_FLOAT, "size of joint names when r_showskel is set to 1" );
var r_jointNameOffset= new idCVar( "r_jointNameOffset", "0.5", CVAR_RENDERER | CVAR_FLOAT, "offset of joint names when r_showskel is set to 1" );

var r_debugLineDepthTest= new idCVar( "r_debugLineDepthTest", "0", CVAR_RENDERER | CVAR_ARCHIVE | CVAR_BOOL, "perform depth test on debug lines" );
var r_debugLineWidth= new idCVar( "r_debugLineWidth", "1", CVAR_RENDERER | CVAR_ARCHIVE | CVAR_BOOL, "width of debug lines" );
//var r_debugArrowStep= new idCVar( "r_debugArrowStep", "120", CVAR_RENDERER | CVAR_ARCHIVE | CVAR_INTEGER, "step size of arrow cone line rotation in degrees", 0, 120 );
var r_debugPolygonFilled= new idCVar( "r_debugPolygonFilled", "1", CVAR_RENDERER | CVAR_BOOL, "draw a filled polygon" );

//var r__materialOverride= new idCVar( "r_materialOverride", "", CVAR_RENDERER, "overrides all materials", idCmdSystem::ArgCompletion_Decl<DECL_MATERIAL> );

var r_debugRenderToTexture = new idCVar( "r_debugRenderToTexture", "0", CVAR_RENDERER | CVAR_INTEGER, "" );

////////void (APIENTRY *glVertexArrayRangeNV)( GLsizei length, void *pointer );
////////// TTimo: wgl vs glX
////////// http://oss.sgi.com/projects/ogl-sample/registry/NV/vertex_array_range.txt
////////// since APIs are the same anyway, let's be wgl/glX agnostic
////////void *(APIENTRY *qAllocateMemoryNV)( GLsizei size, float readFrequency, float writeFrequency, float priority);
////////void (APIENTRY *qFreeMemoryNV)( void *pointer );
////////#ifdef GLX_VERSION_1_1
////////#define Q_ALLOCATE_MEMORY_NV "glXAllocateMemoryNV"
////////#define Q_FREE_MEMORY_NV "glXFreeMemoryNV"
////////#else
////////#define Q_ALLOCATE_MEMORY_NV "wglAllocateMemoryNV"
////////#define Q_FREE_MEMORY_NV "wglFreeMemoryNV"
////////#endif
////////
////////#if !defined(GL_ES_VERSION_2_0)
////////// GL_EXT_depth_bounds_test
////////void (GL_APIENTRY *qglDepthBoundsEXT)(GLclampd zmin, GLclampd zmax);
////////#endif

class vidmode_t {
	description: string; //const char *
	width: number;
	height: number; //int        

	constructor ( description: string, width: number, height: number ) {
		this.description = description;
		this.width = width;
		this.height = height;
	}
};


class idRenderSystem {
	// other tr_* files:
	RegisterFont(fontName: string, font: fontInfoEx_t ) :boolean { throw "placeholder"; }



    // from tr_local.h

//public:
//	// renderer globals
/*	bool					*/registered:boolean;		// cleared at shutdown, set at InitOpenGL

/*	bool					*/takingScreenshot:boolean;

/*	int						*/frameCount:number;		// incremented every frame
/*	int						*/viewCount:number;		// incremented every view (twice a scene if subviewed)
//											// and every R_MarkFragments call

/*	int						*/staticAllocCount:number;	// running total of bytes allocated

/*	float					*/frameShaderTime:number;	// shader time for all non-world 2D rendering

/*	int						*/viewportOffset:Array<number> = [0,0];	// for doing larger-than-window tiled renderings
/*	int						*/tiledViewport: Array<number> = [0, 0];

	// determines which back end to use, and if vertex programs are in use
	backEndRenderer:backEndName_t;
/*	bool					*/backEndRendererHasVertexPrograms:boolean;
/*	float					*/backEndRendererMaxLight:number;	// 1.0 for standard, unlimited for floats
//														// determines how much overbrighting needs
//														// to be done post-process

/*idVec4					*/ambientLightVector:idVec4;	// used for "ambient bump mapping"

/*	float					*/sortOffset:number;				// for determinist sorting of equal sort materials

	worlds: idList<idRenderWorldLocal>;

	primaryWorld: idRenderWorldLocal;
	primaryRenderView: renderView_t;
	primaryView:viewDef_t;
//	// many console commands need to know which world they should operate on

	defaultMaterial:idMaterial;
	testImage:idImage;
	testVideo:idCinematic;
/*	float*/testVideoStartTime:number;

	ambientCubeImage: idImage;	// hack for testing dependent ambient lighting

	viewDef: viewDef_t;

	pc: performanceCounters_t;					// performance counters

	lockSurfacesCmd: drawSurfsCommand_t;	// use this when r_lockSurfaces = 1

    identitySpace:viewEntity_t;		            // can use if we don't know viewDef.worldSpace is valid
	logFile:FILE;			// for logging GL calls and frame breaks

	/*int*/stencilIncr:number; stencilDecr:number;	// GL_INCR / INCR_WRAP_EXT, GL_DECR / GL_DECR_EXT

	renderCrops:renderCrop_t[/*MAX_RENDER_CROPS*/];
	/*int*/currentRenderCrop:number;

	// GUI drawing variables for surface creation
	/*int*/guiRecursionLevel:number;		// to prevent infinite overruns
	guiModel:idGuiModel;
	demoGuiModel:idGuiModel;

/*	unsigned short*/		gammaTable:Uint8Array;	// brightness / gamma modify this

    constructor ( ) {
	    this.Clear ( );
    }

/////*
////=================
////R_CheckExtension
////=================
////*/
////bool R_CheckExtension( char *name ) {
////	if ( !strstr( glConfig.extensions_string, name ) ) {
////		common.Printf( "X..%s not found\n", name );
////		return false;
////	}

////	common.Printf( "...using %s\n", name );
////	return true;
////}

/*
==================
R_CheckPortableExtensions

==================
*/
static R_CheckPortableExtensions():void
{
	// hardcode to match c:
	glConfig.glVersion = 0;
	glConfig.maxTextureUnits = 8;
	glConfig.maxTextureCoords = 16384;
	glConfig.maxTextureImageUnits = 8;
	tr.stencilIncr = GL_INCR_WRAP;
	tr.stencilDecr = GL_DECR_WRAP;

	// original:
//	glConfig.glVersion = atof(glConfig.version_string);
////#if !defined(GL_ES_VERSION_2_0)
////	if (!glConfig.glVersion >= 3.0) {
////		common.Error(common.GetLanguageDict().GetString("#str_06780"));
////	}
////#endif

//	// GL_ARB_multitexture
//	glConfig.multitextureAvailable = R_CheckExtension("GL_ARB_multitexture");

////#if !defined(GL_ES_VERSION_2_0)
////	if (glConfig.multitextureAvailable)
////#endif
//	{
////#if !defined(GL_ES_VERSION_2_0)
////		glGetIntegerv(GL_MAX_TEXTURE_UNITS_ARB, (GLint *)&glConfig.maxTextureUnits);
////#else
//		glGetIntegerv(GL_MAX_TEXTURE_IMAGE_UNITS, (GLint *)&glConfig.maxTextureUnits);
////#endif

//		if (glConfig.maxTextureUnits > MAX_MULTITEXTURE_UNITS) {
//			glConfig.maxTextureUnits = MAX_MULTITEXTURE_UNITS;
//		}

//		if (glConfig.maxTextureUnits < 2) {
//			glConfig.multitextureAvailable = false;	// shouldn't ever happen
//		}

////#if !defined(GL_ES_VERSION_2_0)
////		glGetIntegerv(GL_MAX_TEXTURE_COORDS_ARB, (GLint *)&glConfig.maxTextureCoords);
////		glGetIntegerv(GL_MAX_TEXTURE_IMAGE_UNITS_ARB, (GLint *)&glConfig.maxTextureImageUnits);
////#else
//		glGetIntegerv(GL_MAX_TEXTURE_SIZE, (GLint *)&glConfig.maxTextureCoords);
//		glGetIntegerv(GL_MAX_TEXTURE_IMAGE_UNITS, (GLint *)&glConfig.maxTextureImageUnits);
////#endif
//	}

//	// GL_ARB_texture_env_combine
//	glConfig.textureEnvCombineAvailable = R_CheckExtension("GL_ARB_texture_env_combine");

//	// GL_ARB_texture_cube_map
//	glConfig.cubeMapAvailable = R_CheckExtension("GL_ARB_texture_cube_map");

//	// GL_ARB_texture_env_dot3
//	glConfig.envDot3Available = R_CheckExtension("GL_ARB_texture_env_dot3");

//	// GL_ARB_texture_env_add
//	glConfig.textureEnvAddAvailable = R_CheckExtension("GL_ARB_texture_env_add");

//	// GL_ARB_texture_non_power_of_two
//	glConfig.textureNonPowerOfTwoAvailable = R_CheckExtension("GL_ARB_texture_non_power_of_two");

//	// GL_ARB_texture_compression + GL_S3_s3tc
//	// DRI drivers may have GL_ARB_texture_compression but no GL_EXT_texture_compression_s3tc
//	if (R_CheckExtension("GL_ARB_texture_compression") && R_CheckExtension("GL_EXT_texture_compression_s3tc")) {
//		glConfig.textureCompressionAvailable = true;
//	} else {
//		glConfig.textureCompressionAvailable = false;
//	}

////#if !defined(GL_ES_VERSION_2_0)
////	// GL_EXT_texture_filter_anisotropic
////	glConfig.anisotropicAvailable = R_CheckExtension("GL_EXT_texture_filter_anisotropic");

////	if (glConfig.anisotropicAvailable) {
////		glGetFloatv(GL_MAX_TEXTURE_MAX_ANISOTROPY_EXT, &glConfig.maxTextureAnisotropy);
////		common.Printf("   maxTextureAnisotropy: %f\n", glConfig.maxTextureAnisotropy);
////	} else {
////		glConfig.maxTextureAnisotropy = 1;
////	}
////#endif

//	// GL_EXT_texture_lod_bias
//	// The actual extension is broken as specificed, storing the state in the texture unit instead
//	// of the texture object.  The behavior in GL 1.4 is the behavior we use.
//	if (glConfig.glVersion >= 1.4 || R_CheckExtension("GL_EXT_texture_lod")) {
//		common.Printf("...using %s\n", "GL_1.4_texture_lod_bias");
//		glConfig.textureLODBiasAvailable = true;
//	} else {
//		common.Printf("X..%s not found\n", "GL_1.4_texture_lod_bias");
//		glConfig.textureLODBiasAvailable = false;
//	}

//	// GL_EXT_shared_texture_palette
//	glConfig.sharedTexturePaletteAvailable = R_CheckExtension("GL_EXT_shared_texture_palette");

//	// GL_EXT_texture3D (not currently used for anything)
//	glConfig.texture3DAvailable = R_CheckExtension("GL_EXT_texture3D");

//	// EXT_stencil_wrap
//	tr.stencilIncr = GL_INCR_WRAP;
//	tr.stencilDecr = GL_DECR_WRAP;

//	// ARB_vertex_buffer_object
//	glConfig.ARBVertexBufferObjectAvailable = R_CheckExtension("GL_ARB_vertex_buffer_object");

//	// ARB_vertex_program
//	glConfig.ARBVertexProgramAvailable = R_CheckExtension("GL_ARB_vertex_program");

//	// ARB_fragment_program
//	if (r_inhibitFragmentProgram.GetBool()) {
//		glConfig.ARBFragmentProgramAvailable = false;
//	} else {
//		glConfig.ARBFragmentProgramAvailable = R_CheckExtension("GL_ARB_fragment_program");
//	}

//	// GL_ARB_shading_language_100
//	glConfig.GLSLAvailable = R_CheckExtension("GL_ARB_shading_language_100");

////#if !defined(GL_ES_VERSION_2_0)
////	// GL_EXT_depth_bounds_test
////	glConfig.depthBoundsTestAvailable = R_CheckExtension("EXT_depth_bounds_test");

////	if (glConfig.depthBoundsTestAvailable) {
////		qglDepthBoundsEXT = (void (GL_APIENTRY *)(GLclampd, GLclampd))GLimp_ExtensionPointer("glDepthBoundsEXT");
////	}
////#endif
}

/*
====================
R_GetModeInfo

r_mode is normally a small non-negative integer that
looks resolutions up in a table, but if it is set to -1,
the values from r_customWidth, amd r_customHeight
will be used instead.
====================
*/
//class vidmode_t {
//	description:string;	//const char *
//	width:number; height:number;	//int         
//};

static r_vidModes = [
    new vidmode_t("Mode  0: 320x240",		320,	240 ),
    new vidmode_t( "Mode  1: 400x300", 400, 300),
    new vidmode_t( "Mode  2: 512x384", 512, 384),
    new vidmode_t( "Mode  3: 640x480", 640, 480),
    new vidmode_t( "Mode  4: 800x600", 800, 600),
    new vidmode_t( "Mode  5: 1024x768", 1024, 768),
    new vidmode_t( "Mode  6: 1152x864", 1152, 864),
    new vidmode_t( "Mode  7: 1280x1024", 1280, 1024),
    new vidmode_t( "Mode  8: 1600x1200",		1600,	1200 )
];
	static s_numVidModes: number = idRenderSystem.r_vidModes.length;

////#if MACOS_X
////bool R_GetModeInfo( int *width, int *height, int mode ) {
////#else
	/*static*/
	R_GetModeInfo ( /*int **/width: R<number>, /*int **/height: R<number>, /*int */mode: number ): boolean {
//#endif
		var vm: vidmode_t;

		if ( mode < -1 ) {
			return false;
		}
		if ( mode >= idRenderSystem.s_numVidModes ) {
			return false;
		}

		if ( mode == -1 ) {
			width.$ = r_customWidth.GetInteger ( );
			height.$ = r_customHeight.GetInteger ( );
			return true;
		}

		vm = idRenderSystem.r_vidModes[mode];

		if ( width ) {
			width.$ = vm.width;
		}
		if ( height ) {
			height.$ = vm.height;
		}

		return true;
	}


/*
==================
R_InitOpenGL

This function is responsible for initializing a valid OpenGL subsystem
for rendering.  This is done by calling the system specific GLimp_Init,
which gives us a working OGL subsystem, then setting all necessary openGL
state, including images, vertex programs, and display lists.

Changes to the vertex cache size or smp state require a vid_restart.

If glConfig.isInitialized is false, no rendering can take place, but
all renderSystem functions will still operate properly, notably the material
and model information functions.
==================
*/
R_InitOpenGL(): void {	
	var parms = new glimpParms_t;		//glimpParms_t	
	var i: number;			//int				

	common.Printf("----- R_InitOpenGL -----\n");

	if (glConfig.isInitialized) {
		common.FatalError("R_InitOpenGL called while active");
	}

	// in case we had an error while doing a tiled rendering
	tr.viewportOffset[0] = 0;
	tr.viewportOffset[1] = 0;

	//
	// initialize OS specific portions of the renderSystem
	//
	for (i = 0 ; i < 2 ; i++) {
		// set the parameters we are trying
		var $vidWidth = new R(glConfig.vidWidth);
		var $vidHeight = new R(glConfig.vidHeight );
		this.R_GetModeInfo($vidWidth, $vidHeight, r_mode.GetInteger());
		glConfig.vidWidth = $vidWidth.$;
		glConfig.vidHeight= $vidHeight.$;

		parms.width = glConfig.vidWidth;
		parms.height = glConfig.vidHeight;
		parms.fullScreen = r_fullscreen.GetBool();
		parms.displayHz = r_displayRefresh.GetInteger();
		parms.multiSamples = r_multiSamples.GetInteger();
		parms.stereo = false;

		if (GLimp_Init(parms)) {
			// it worked
			break;
		}
		
		//if (i == 1) {
		//	common.FatalError("Unable to initialize OpenGL");
		//}

		//// if we failed, set everything back to "safe mode"
		//// and try again
		//r_mode.SetInteger(3);
		//r_fullscreen.SetInteger(1);
		//r_displayRefresh.SetInteger(0);
		//r_multiSamples.SetInteger(0);
	}

//	// input and sound systems need to be tied to the new window
	todo ( );
//	Sys_InitInput();
//	soundSystem.InitHW();

	// get our config strings
	glConfig.vendor_string = /*(const char *)*/glGetString(GL_VENDOR);
	glConfig.renderer_string =/* (const char *)*/glGetString(GL_RENDERER);
	glConfig.version_string = /*(const char *)*/glGetString(GL_VERSION);
	todo( "glConfig.extensions_string = /*(const char *)*/glGetString(GL_EXTENSIONS);" );

	// OpenGL driver constants
	glConfig.maxTextureSize = glGetIntegerv(GL_MAX_TEXTURE_SIZE);

	// stubbed or broken drivers may have reported 0...
	if (glConfig.maxTextureSize <= 0) {
		glConfig.maxTextureSize = 256;
	}

	glConfig.isInitialized = true;

	// recheck all the extensions (FIXME: this might be dangerous)
	idRenderSystem.R_CheckPortableExtensions();

//	// parse our vertex and fragment programs, possibly disably support for
//	// one of the paths if there was an error
////#if !defined(GL_ES_VERSION_2_0)
////	R_ARB2_Init();
////#endif
	R_GLSL_Init();

////#if !defined(GL_ES_VERSION_2_0)
////	cmdSystem.AddCommand("reloadARBprograms", R_ReloadARBPrograms_f, cmdFlags_t.CMD_FL_RENDERER, "reloads ARB programs");
////	R_ReloadARBPrograms_f(idCmdArgs());
////#endif

	cmdSystem.AddCommand("reloadGLSLprograms", R_ReloadGLSLPrograms_f, cmdFlags_t.CMD_FL_RENDERER, "reloads GLSL programs");
	R_ReloadGLSLPrograms_f(new idCmdArgs());

	// allocate the vertex array range or vertex objects
	vertexCache.Init();
	if ( DEBUG_RENDER_METHODS ) {
		vertexCache.List();
	}
	
	// select which renderSystem we are going to use
	r_renderer.SetModified();
	tr.SetBackEndRenderer();

	// allocate the frame data, which may be more if smp is enabled
	R_InitFrameData();

	// Reset our gamma
	idRenderSystem.R_SetColorMappings();
}

/*
==================
GL_CheckErrors
==================
*/
	static GL_CheckErrors ( ): void {
		var /*int		*/err: number;
		var s = ""; //char	s[64];
		var i: number;

		// check for up to 10 errors pending
		for ( i = 0; i < 10; i++ ) {
			err = glGetError ( );
			if ( err == GL_NO_ERROR ) {
				return;
			}
			switch ( err ) {
			case GL_INVALID_ENUM:
				s = "GL_INVALID_ENUM";
				break;
			case GL_INVALID_VALUE:
				s = "GL_INVALID_VALUE";
				break;
			case GL_INVALID_OPERATION:
				s = "GL_INVALID_OPERATION";
				break;
//#if !defined(GL_ES_VERSION_2_0)
//			case GL_STACK_OVERFLOW:
//				strcpy( s, "GL_STACK_OVERFLOW" );
//				break;
//			case GL_STACK_UNDERFLOW:
//				strcpy( s, "GL_STACK_UNDERFLOW" );
//				break;
//#endif
			case GL_OUT_OF_MEMORY:
				s = "GL_OUT_OF_MEMORY";
				break;
			default:
				s = err.toString ( ); //idStr.snPrintf( s, sizeof(s), "%i", err);
				break;
			}

			if ( !r_ignoreGLErrors.GetBool ( ) ) {
				common.Printf( "GL_CheckErrors: %s\n", s );
			}
		}
	}

/////*
////=====================
////R_ReloadSurface_f

////Reload the material displayed by r_showSurfaceInfo
////=====================
////*/
////static void R_ReloadSurface_f( args:idCmdArgs ) {
////	modelTrace_t mt;
////	idVec3 start, end;
	
////	// start far enough away that we don't hit the player model
////	start = tr.primaryView.renderView.vieworg + tr.primaryView.renderView.viewaxis[0] * 16;
////	end = start + tr.primaryView.renderView.viewaxis[0] * 1000.0;
////	if ( !tr.primaryWorld.Trace( mt, start, end, 0.0, false ) ) {
////		return;
////	}

////	common.Printf( "Reloading %s\n", mt.material.GetName() );

////	// reload the decl
////	mt.material.base.Reload();

////	// reload any images used by the decl
////	mt.material.ReloadImages( false );
////}



/////*
////==============
////R_ListModes_f
////==============
////*/
////static void R_ListModes_f( args:idCmdArgs ) {
////	int i;

////	common.Printf( "\n" );
////	for ( i = 0; i < s_numVidModes; i++ ) {
////		common.Printf( "%s\n", r_vidModes[i].description );
////	}
////	common.Printf( "\n" );
////}



/////*
////=============
////R_TestImage_f

////Display the given image centered on the screen.
////testimage <number>
////testimage <filename>
////=============
////*/
////void R_TestImage_f( args:idCmdArgs ) {
////	int imageNum;

////	if ( tr.testVideo ) {
////		delete tr.testVideo;
////		tr.testVideo = NULL;
////	}
////	tr.testImage = NULL;

////	if ( args.Argc() != 2 ) {
////		return;
////	}

////	if ( idStr::IsNumeric( args.Argv(1) ) ) {
////		imageNum = atoi( args.Argv(1) );
////		if ( imageNum >= 0 && imageNum < globalImages.images.Num() ) {
////			tr.testImage = globalImages.images[imageNum];
////		}
////	} else {
////		tr.testImage = globalImages.ImageFromFile( args.Argv( 1 ), textureFilter_t.TF_DEFAULT, false, textureRepeat_t.TR_REPEAT, textureDepth_t.TD_DEFAULT );
////	}
////}

/////*
////=============
////R_TestVideo_f

////Plays the cinematic file in a testImage
////=============
////*/
////void R_TestVideo_f( args:idCmdArgs ) {
////	if ( tr.testVideo ) {
////		delete tr.testVideo;
////		tr.testVideo = NULL;
////	}
////	tr.testImage = NULL;

////	if ( args.Argc() < 2 ) {
////		return;
////	}

////	tr.testImage = globalImages.ImageFromFile( "_scratch", textureFilter_t.TF_DEFAULT, false, textureRepeat_t.TR_REPEAT, textureDepth_t.TD_DEFAULT );
////	tr.testVideo = idCinematic::Alloc();
////	tr.testVideo.InitFromFile( args.Argv( 1 ), true );

////	cinData_t	cin;
////	cin = tr.testVideo.ImageForTime( 0 );
////	if ( !cin.image ) {
////		delete tr.testVideo;
////		tr.testVideo = NULL;
////		tr.testImage = NULL;
////		return;
////	}

////	common.Printf( "%i x %i images\n", cin.imageWidth, cin.imageHeight );

////	int	len = tr.testVideo.AnimationLength();
////	common.Printf( "%5.1f seconds of video\n", len * 0.001 );

////	tr.testVideoStartTime = tr.primaryRenderView.time * 0.001;

////	// try to play the matching wav file
////	idStr	wavString = args.Argv( ( args.Argc() == 2 ) ? 1 : 2 );
////	wavString.StripFileExtension();
////	wavString = wavString + ".wav";
////	session.sw.PlayShaderDirectly( wavString.c_str() );
////}

////static int R_QsortSurfaceAreas( const void *a, const void *b ) {
////	const idMaterial	*ea, *eb;
////	int	ac, bc;

////	ea = *(idMaterial **)a;
////	if ( !ea.EverReferenced() ) {
////		ac = 0;
////	} else {
////		ac = ea.GetSurfaceArea();
////	}
////	eb = *(idMaterial **)b;
////	if ( !eb.EverReferenced() ) {
////		bc = 0;
////	} else {
////		bc = eb.GetSurfaceArea();
////	}

////	if ( ac < bc ) {
////		return -1;
////	}
////	if ( ac > bc ) {
////		return 1;
////	}

////	return idStr::Icmp( ea.GetName(), eb.GetName() );
////}


/////*
////===================
////R_ReportSurfaceAreas_f

////Prints a list of the materials sorted by surface area
////===================
////*/
////void R_ReportSurfaceAreas_f( args:idCmdArgs ) {
////	int		i, count;
////	idMaterial	**list;

////	count = declManager.GetNumDecls( DECL_MATERIAL );
////	list = (idMaterial **)_alloca( count * sizeof( *list ) );

////	for ( i = 0 ; i < count ; i++ ) {
////		list[i] = (idMaterial *)declManager.DeclByIndex( DECL_MATERIAL, i, false );
////	}

////	qsort( list, count, sizeof( list[0] ), R_QsortSurfaceAreas );

////	// skip over ones with 0 area
////	for ( i = 0 ; i < count ; i++ ) {
////		if ( list[i].GetSurfaceArea() > 0 ) {
////			break;
////		}
////	}

////	for ( ; i < count ; i++ ) {
////		// report size in "editor blocks"
////		int	blocks = list[i].GetSurfaceArea() / 4096.0;
////		common.Printf( "%7i %s\n", blocks, list[i].GetName() );
////	}
////}

/////*
////===================
////R_ReportImageDuplication_f

////Checks for images with the same hash value and does a better comparison
////===================
////*/
////void R_ReportImageDuplication_f( args:idCmdArgs ) {
////	int		i, j;

////	common.Printf( "Images with duplicated contents:\n" );

////	int	count = 0;

////	for ( i = 0 ; i < globalImages.images.Num() ; i++ ) {
////		idImage	*image1 = globalImages.images[i];

////		if ( image1.isPartialImage ) {
////			// ignore background loading stubs
////			continue;
////		}
////		if ( image1.generatorFunction ) {
////			// ignore procedural images
////			continue;
////		}
////		if ( image1.cubeFiles != cubeFiles_t.CF_2D ) {
////			// ignore cube maps
////			continue;
////		}
////		if ( image1.defaulted ) {
////			continue;
////		}
////		byte	*data1;
////		int		w1, h1;

////		R_LoadImageProgram( image1.imgName, &data1, &w1, &h1, NULL );

////		for ( j = 0 ; j < i ; j++ ) {
////			idImage	*image2 = globalImages.images[j];

////			if ( image2.isPartialImage ) {
////				continue;
////			}
////			if ( image2.generatorFunction ) {
////				continue;
////			}
////			if ( image2.cubeFiles != cubeFiles_t.CF_2D ) {
////				continue;
////			}
////			if ( image2.defaulted ) {
////				continue;
////			}
////			if ( image1.imageHash != image2.imageHash ) {
////				continue;
////			}
////			if ( image2.uploadWidth != image1.uploadWidth
////				|| image2.uploadHeight != image1.uploadHeight ) {
////				continue;
////			}
////			if ( !idStr::Icmp( image1.imgName, image2.imgName ) ) {
////				// ignore same image-with-different-parms
////				continue;
////			}

////			byte	*data2;
////			int		w2, h2;

////			R_LoadImageProgram( image2.imgName, &data2, &w2, &h2, NULL );

////			if ( w2 != w1 || h2 != h1 ) {
////				R_StaticFree( data2 );
////				continue;
////			}

////			if ( memcmp( data1, data2, w1*h1*4 ) ) {
////				R_StaticFree( data2 );
////				continue;
////			}

////			R_StaticFree( data2 );

////			common.Printf( "%s == %s\n", image1.imgName.c_str(), image2.imgName.c_str() );
////			session.UpdateScreen( true );
////			count++;
////			break;
////		}

////		R_StaticFree( data1 );
////	}
////	common.Printf( "%i / %i collisions\n", count, globalImages.images.Num() );
////}

/////* 
////============================================================================== 
 
////						THROUGHPUT BENCHMARKING
 
////============================================================================== 
////*/ 

/////*
////================
////R_RenderingFPS
////================
////*/
////static float R_RenderingFPS( const renderView_t *renderView ) {
////	glFinish();

////	int		start = Sys_Milliseconds();
////	static const int SAMPLE_MSEC = 1000;
////	int		end;
////	int		count = 0;

////	while( 1 ) {
////		// render
////		renderSystem.BeginFrame( glConfig.vidWidth, glConfig.vidHeight );
////		tr.primaryWorld.RenderScene( renderView );
////		renderSystem.EndFrame( NULL, NULL );
////		glFinish();
////		count++;
////		end = Sys_Milliseconds();
////		if ( end - start > SAMPLE_MSEC ) {
////			break;
////		}
////	}

////	float fps = count * 1000.0 / ( end - start );

////	return fps;
////}

/////*
////================
////R_Benchmark_f
////================
////*/
////void R_Benchmark_f( args:idCmdArgs ) {
////	float	fps, msec;
////	renderView_t	view;

////	if ( !tr.primaryView ) {
////		common.Printf( "No primaryView for benchmarking\n" );
////		return;
////	}
////	view = tr.primaryRenderView;

////	for ( int size = 100 ; size >= 10 ; size -= 10 ) {
////		r_screenFraction.SetInteger( size );
////		fps = R_RenderingFPS( &view );
////		int	kpix = glConfig.vidWidth * glConfig.vidHeight * ( size * 0.01 ) * ( size * 0.01 ) * 0.001;
////		msec = 1000.0 / fps;
////		common.Printf( "kpix: %4i  msec:%5.1f fps:%5.1f\n", kpix, msec, fps );
////	}

////	// enable r_singleTriangle 1 while r_screenFraction is still at 10
////	r_singleTriangle.SetBool( 1 );
////	fps = R_RenderingFPS( &view );
////	msec = 1000.0 / fps;
////	common.Printf( "single tri  msec:%5.1f fps:%5.1f\n", msec, fps );
////	r_singleTriangle.SetBool( 0 );
////	r_screenFraction.SetInteger( 100 );

////	// enable r_skipRenderContext 1
////	r_skipRenderContext.SetBool( true );
////	fps = R_RenderingFPS( &view );
////	msec = 1000.0 / fps;
////	common.Printf( "no context  msec:%5.1f fps:%5.1f\n", msec, fps );
////	r_skipRenderContext.SetBool( false );
////}


/////* 
////============================================================================== 
 
////						SCREEN SHOTS 
 
////============================================================================== 
////*/ 

/////*
////====================
////R_ReadTiledPixels

////Allows the rendering of an image larger than the actual window by
////tiling it into window-sized chunks and rendering each chunk separately

////If ref isn't specified, the full session UpdateScreen will be done.
////====================
////*/
////void R_ReadTiledPixels( int width, int height, byte *buffer, renderView_t *ref = NULL ) {
////	// include extra space for OpenGL padding to word boundaries
////	byte	*temp = (byte *)R_StaticAlloc( (glConfig.vidWidth+3) * glConfig.vidHeight * 3 );

////	int	oldWidth = glConfig.vidWidth;
////	int oldHeight = glConfig.vidHeight;

////	tr.tiledViewport[0] = width;
////	tr.tiledViewport[1] = height;

////	// disable scissor, so we don't need to adjust all those rects
////	r_useScissor.SetBool( false );

////	for ( int xo = 0 ; xo < width ; xo += oldWidth ) {
////		for ( int yo = 0 ; yo < height ; yo += oldHeight ) {
////			tr.viewportOffset[0] = -xo;
////			tr.viewportOffset[1] = -yo;

////			if ( ref ) {
////				tr.BeginFrame( oldWidth, oldHeight );
////				tr.primaryWorld.RenderScene( ref );
////				tr.EndFrame( NULL, NULL );
////			} else {
////				session.UpdateScreen();
////			}

////			int w = oldWidth;
////			if ( xo + w > width ) {
////				w = width - xo;
////			}
////			int h = oldHeight;
////			if ( yo + h > height ) {
////				h = height - yo;
////			}
			
////#if !defined(GL_ES_VERSION_2_0)
////			glReadBuffer( GL_FRONT );
////#endif
////			glReadPixels( 0, 0, w, h, GL_RGB, GL_UNSIGNED_BYTE, temp ); 

////			int	row = ( w * 3 + 3 ) & ~3;		// OpenGL pads to dword boundaries

////			for ( int y = 0 ; y < h ; y++ ) {
////				memcpy( buffer + ( ( yo + y )* width + xo ) * 3,
////					temp + y * row, w * 3 );
////			}
////		}
////	}

////	r_useScissor.SetBool( true );

////	tr.viewportOffset[0] = 0;
////	tr.viewportOffset[1] = 0;
////	tr.tiledViewport[0] = 0;
////	tr.tiledViewport[1] = 0;

////	R_StaticFree( temp );

////	glConfig.vidWidth = oldWidth;
////	glConfig.vidHeight = oldHeight;
////}


/////*
////================== 
////TakeScreenshot

////Move to tr_imagefiles.c...

////Will automatically tile render large screen shots if necessary
////Downsample is the number of steps to mipmap the image before saving it
////If ref == NULL, session.updateScreen will be used
////================== 
////*/  
////void idRenderSystemLocal::TakeScreenshot( int width, int height, const char *fileName, int blends, renderView_t *ref ) {
////	byte		*buffer;
////	int			i, j, c, temp;

////	takingScreenshot = true;

////	int	pix = width * height;

////	buffer = (byte *)R_StaticAlloc(pix*3 + 18);
////	memset (buffer, 0, 18);

////	if ( blends <= 1 ) {
////		R_ReadTiledPixels( width, height, buffer + 18, ref );
////	} else {
////		unsigned short *shortBuffer = (unsigned short *)R_StaticAlloc(pix*2*3);
////		memset (shortBuffer, 0, pix*2*3);

////		// enable anti-aliasing jitter
////		r_jitter.SetBool( true );

////		for ( i = 0 ; i < blends ; i++ ) {
////			R_ReadTiledPixels( width, height, buffer + 18, ref );

////			for ( j = 0 ; j < pix*3 ; j++ ) {
////				shortBuffer[j] += buffer[18+j];
////			}
////		}

////		// divide back to bytes
////		for ( i = 0 ; i < pix*3 ; i++ ) {
////			buffer[18+i] = shortBuffer[i] / blends;
////		}

////		R_StaticFree( shortBuffer );
////		r_jitter.SetBool( false );
////	}

////	// fill in the header (this is vertically flipped, which glReadPixels emits)
////	buffer[2] = 2;		// uncompressed type
////	buffer[12] = width & 255;
////	buffer[13] = width >> 8;
////	buffer[14] = height & 255;
////	buffer[15] = height >> 8;
////	buffer[16] = 24;	// pixel size

////	// swap rgb to bgr
////	c = 18 + width * height * 3;
////	for (i=18 ; i<c ; i+=3) {
////		temp = buffer[i];
////		buffer[i] = buffer[i+2];
////		buffer[i+2] = temp;
////	}

////	// _D3XP adds viewnote screenie save to cdpath
////	if ( strstr( fileName, "viewnote" ) ) {
////		fileSystem.WriteFile( fileName, buffer, c, "fs_cdpath" );
////	} else {
////		fileSystem.WriteFile( fileName, buffer, c );
////	}

////	R_StaticFree( buffer );

////	takingScreenshot = false;

////}


/////* 
////================== 
////R_ScreenshotFilename

////Returns a filename with digits appended
////if we have saved a previous screenshot, don't scan
////from the beginning, because recording demo avis can involve
////thousands of shots
////================== 
////*/  
////void R_ScreenshotFilename( int &lastNumber, const char *base, idStr &fileName ) {
////	int	a,b,c,d, e;

////	bool restrict = cvarSystem.GetCVarBool( "fs_restrict" );
////	cvarSystem.SetCVarBool( "fs_restrict", false );

////	lastNumber++;
////	if ( lastNumber > 99999 ) {
////		lastNumber = 99999;
////	}
////	for ( ; lastNumber < 99999 ; lastNumber++ ) {
////		int	frac = lastNumber;

////		a = frac / 10000;
////		frac -= a*10000;
////		b = frac / 1000;
////		frac -= b*1000;
////		c = frac / 100;
////		frac -= c*100;
////		d = frac / 10;
////		frac -= d*10;
////		e = frac;

////		sprintf( fileName, "%s%i%i%i%i%i.tga", base, a, b, c, d, e );
////		if ( lastNumber == 99999 ) {
////			break;
////		}
////		int len = fileSystem.ReadFile( fileName, NULL, NULL );
////		if ( len <= 0 ) {
////			break;
////		}
////		// check again...
////	}
////	cvarSystem.SetCVarBool( "fs_restrict", restrict );
////}

/////*
////================== 
////R_BlendedScreenShot

////screenshot
////screenshot [filename]
////screenshot [width] [height]
////screenshot [width] [height] [samples]
////================== 
////*/ 
////#define	MAX_BLENDS	256	// to keep the accumulation in shorts
////void R_ScreenShot_f( args:idCmdArgs ) {
////	static int lastNumber = 0;
////	idStr checkname;

////	int width = glConfig.vidWidth;
////	int height = glConfig.vidHeight;
////	int	x = 0;
////	int y = 0;
////	int	blends = 0;

////	switch ( args.Argc() ) {
////	case 1:
////		width = glConfig.vidWidth;
////		height = glConfig.vidHeight;
////		blends = 1;
////		R_ScreenshotFilename( lastNumber, "screenshots/shot", checkname );
////		break;
////	case 2:
////		width = glConfig.vidWidth;
////		height = glConfig.vidHeight;
////		blends = 1;
////		checkname = args.Argv( 1 );
////		break;
////	case 3:
////		width = atoi( args.Argv( 1 ) );
////		height = atoi( args.Argv( 2 ) );
////		blends = 1;
////		R_ScreenshotFilename( lastNumber, "screenshots/shot", checkname );
////		break;
////	case 4:
////		width = atoi( args.Argv( 1 ) );
////		height = atoi( args.Argv( 2 ) );
////		blends = atoi( args.Argv( 3 ) );
////		if ( blends < 1 ) {
////			blends = 1;
////		}
////		if ( blends > MAX_BLENDS ) {
////			blends = MAX_BLENDS;
////		}
////		R_ScreenshotFilename( lastNumber, "screenshots/shot", checkname );
////		break;
////	default:
////		common.Printf( "usage: screenshot\n       screenshot <filename>\n       screenshot <width> <height>\n       screenshot <width> <height> <blends>\n" );
////		return;
////	}

////	// put the console away
////	console.Close();

////	tr.TakeScreenshot( width, height, checkname, blends, NULL );

////	common.Printf( "Wrote %s\n", checkname.c_str() );
////}

/////*
////===============
////R_StencilShot
////Save out a screenshot showing the stencil buffer expanded by 16x range
////===============
////*/
////void R_StencilShot( void ) {
////	byte		*buffer;
////	int			i, c;

////	int	width = tr.GetScreenWidth();
////	int	height = tr.GetScreenHeight();

////	int	pix = width * height;

////	c = pix * 3 + 18;
////	buffer = (byte *)Mem_Alloc(c);
////	memset (buffer, 0, 18);

////	byte *byteBuffer = (byte *)Mem_Alloc(pix);

////	glReadPixels( 0, 0, width, height, GL_STENCIL_INDEX4_OES , GL_UNSIGNED_BYTE, byteBuffer ); 

////	for ( i = 0 ; i < pix ; i++ ) {
////		buffer[18+i*3] =
////		buffer[18+i*3+1] =
////			//		buffer[18+i*3+2] = ( byteBuffer[i] & 15 ) * 16;
////		buffer[18+i*3+2] = byteBuffer[i];
////	}

////	// fill in the header (this is vertically flipped, which glReadPixels emits)
////	buffer[2] = 2;		// uncompressed type
////	buffer[12] = width & 255;
////	buffer[13] = width >> 8;
////	buffer[14] = height & 255;
////	buffer[15] = height >> 8;
////	buffer[16] = 24;	// pixel size

////	fileSystem.WriteFile( "screenshots/stencilShot.tga", buffer, c, "fs_savepath" );

////	Mem_Free( buffer );
////	Mem_Free( byteBuffer );	
////}

/////* 
////================== 
////R_EnvShot_f

////envshot <basename>

////Saves out env/<basename>_ft.tga, etc
////================== 
////*/  
////void R_EnvShot_f( args:idCmdArgs ) {
////	idStr		fullname;
////	const char	*baseName;
////	int			i;
////	idMat3		axis[6];
////	renderView_t	ref;
////	viewDef_t	primary;
////	int			blends;
////	char	*extensions[6] =  { "_px.tga", "_nx.tga", "_py.tga", "_ny.tga", 
////		"_pz.tga", "_nz.tga" };
////	int			size;

////	if ( args.Argc() != 2 && args.Argc() != 3 && args.Argc() != 4 ) {
////		common.Printf( "USAGE: envshot <basename> [size] [blends]\n" );
////		return;
////	}
////	baseName = args.Argv( 1 );

////	blends = 1;
////	if ( args.Argc() == 4 ) {
////		size = atoi( args.Argv( 2 ) );
////		blends = atoi( args.Argv( 3 ) );
////	} else if ( args.Argc() == 3 ) {
////		size = atoi( args.Argv( 2 ) );
////		blends = 1;
////	} else {
////		size = 256;
////		blends = 1;
////	}

////	if ( !tr.primaryView ) {
////		common.Printf( "No primary view.\n" );
////		return;
////	}

////	primary = *tr.primaryView;

////	memset( &axis, 0, sizeof( axis ) );
////	axis[0][0][0] = 1;
////	axis[0][1][2] = 1;
////	axis[0][2][1] = 1;

////	axis[1][0][0] = -1;
////	axis[1][1][2] = -1;
////	axis[1][2][1] = 1;

////	axis[2][0][1] = 1;
////	axis[2][1][0] = -1;
////	axis[2][2][2] = -1;

////	axis[3][0][1] = -1;
////	axis[3][1][0] = -1;
////	axis[3][2][2] = 1;

////	axis[4][0][2] = 1;
////	axis[4][1][0] = -1;
////	axis[4][2][1] = 1;

////	axis[5][0][2] = -1;
////	axis[5][1][0] = 1;
////	axis[5][2][1] = 1;

////	for ( i = 0 ; i < 6 ; i++ ) {
////		ref = primary.renderView;
////		ref.x = ref.y = 0;
////		ref.fov_x = ref.fov_y = 90;
////		ref.width = glConfig.vidWidth;
////		ref.height = glConfig.vidHeight;
////		ref.viewaxis = axis[i];
////		sprintf( fullname, "env/%s%s", baseName, extensions[i] );
////		tr.TakeScreenshot( size, size, fullname, blends, &ref );
////	}

////	common.Printf( "Wrote %s, etc\n", fullname.c_str() );
////} 

//////============================================================================

////static idMat3		cubeAxis[6];


/////*
////==================
////R_SampleCubeMap
////==================
////*/
////void R_SampleCubeMap( const idVec3 &dir, int size, byte *buffers[6], byte result[4] ) {
////	float	adir[3];
////	int		axis, x, y;

////	adir[0] = fabs(dir[0]);
////	adir[1] = fabs(dir[1]);
////	adir[2] = fabs(dir[2]);

////	if ( dir[0] >= adir[1] && dir[0] >= adir[2] ) {
////		axis = 0;
////	} else if ( -dir[0] >= adir[1] && -dir[0] >= adir[2] ) {
////		axis = 1;
////	} else if ( dir[1] >= adir[0] && dir[1] >= adir[2] ) {
////		axis = 2;
////	} else if ( -dir[1] >= adir[0] && -dir[1] >= adir[2] ) {
////		axis = 3;
////	} else if ( dir[2] >= adir[1] && dir[2] >= adir[2] ) {
////		axis = 4;
////	} else {
////		axis = 5;
////	}

////	float	fx = (dir * cubeAxis[axis][1]) / (dir * cubeAxis[axis][0]);
////	float	fy = (dir * cubeAxis[axis][2]) / (dir * cubeAxis[axis][0]);

////	fx = -fx;
////	fy = -fy;
////	x = size * 0.5 * (fx + 1);
////	y = size * 0.5 * (fy + 1);
////	if ( x < 0 ) {
////		x = 0;
////	} else if ( x >= size ) {
////		x = size-1;
////	}
////	if ( y < 0 ) {
////		y = 0;
////	} else if ( y >= size ) {
////		y = size-1;
////	}

////	result[0] = buffers[axis][(y*size+x)*4+0];
////	result[1] = buffers[axis][(y*size+x)*4+1];
////	result[2] = buffers[axis][(y*size+x)*4+2];
////	result[3] = buffers[axis][(y*size+x)*4+3];
////}

/////* 
////================== 
////R_MakeAmbientMap_f

////R_MakeAmbientMap_f <basename> [size]

////Saves out env/<basename>_amb_ft.tga, etc
////================== 
////*/  
////void R_MakeAmbientMap_f( args:idCmdArgs ) {
////	idStr fullname;
////	const char	*baseName;
////	int			i;
////	renderView_t	ref;
////	viewDef_t	primary;
////	int			downSample;
////	char	*extensions[6] =  { "_px.tga", "_nx.tga", "_py.tga", "_ny.tga", 
////		"_pz.tga", "_nz.tga" };
////	int			outSize;
////	byte		*buffers[6];
////	int			width, height;

////	if ( args.Argc() != 2 && args.Argc() != 3 ) {
////		common.Printf( "USAGE: ambientshot <basename> [size]\n" );
////		return;
////	}
////	baseName = args.Argv( 1 );

////	downSample = 0;
////	if ( args.Argc() == 3 ) {
////		outSize = atoi( args.Argv( 2 ) );
////	} else {
////		outSize = 32;
////	}

////	memset( &cubeAxis, 0, sizeof( cubeAxis ) );
////	cubeAxis[0][0][0] = 1;
////	cubeAxis[0][1][2] = 1;
////	cubeAxis[0][2][1] = 1;

////	cubeAxis[1][0][0] = -1;
////	cubeAxis[1][1][2] = -1;
////	cubeAxis[1][2][1] = 1;

////	cubeAxis[2][0][1] = 1;
////	cubeAxis[2][1][0] = -1;
////	cubeAxis[2][2][2] = -1;

////	cubeAxis[3][0][1] = -1;
////	cubeAxis[3][1][0] = -1;
////	cubeAxis[3][2][2] = 1;

////	cubeAxis[4][0][2] = 1;
////	cubeAxis[4][1][0] = -1;
////	cubeAxis[4][2][1] = 1;

////	cubeAxis[5][0][2] = -1;
////	cubeAxis[5][1][0] = 1;
////	cubeAxis[5][2][1] = 1;

////	// read all of the images
////	for ( i = 0 ; i < 6 ; i++ ) {
////		sprintf( fullname, "env/%s%s", baseName, extensions[i] );
////		common.Printf( "loading %s\n", fullname.c_str() );
////		session.UpdateScreen();
////		R_LoadImage( fullname, &buffers[i], &width, &height, NULL, true );
////		if ( !buffers[i] ) {
////			common.Printf( "failed.\n" );
////			for ( i-- ; i >= 0 ; i-- ) {
////				Mem_Free( buffers[i] );
////			}
////			return;
////		}
////	}

////	// resample with hemispherical blending
////	int	samples = 1000;

////	byte	*outBuffer = (byte *)_alloca( outSize * outSize * 4 );

////	for ( int map = 0 ; map < 2 ; map++ ) {
////		for ( i = 0 ; i < 6 ; i++ ) {
////			for ( int x = 0 ; x < outSize ; x++ ) {
////				for ( int y = 0 ; y < outSize ; y++ ) {
////					idVec3	dir;
////					float	total[3];

////					dir = cubeAxis[i][0] + -( -1 + 2.0*x/(outSize-1) ) * cubeAxis[i][1] + -( -1 + 2.0*y/(outSize-1) ) * cubeAxis[i][2];
////					dir.Normalize();
////					total[0] = total[1] = total[2] = 0;
////	//samples = 1;
////					float	limit = map ? 0.95 : 0.25;		// small for specular, almost hemisphere for ambient

////					for ( int s = 0 ; s < samples ; s++ ) {
////						// pick a random direction vector that is inside the unit sphere but not behind dir,
////						// which is a robust way to evenly sample a hemisphere
////						idVec3	test;
////						while( 1 ) {
////							for ( int j = 0 ; j < 3 ; j++ ) {
////								test[j] = -1 + 2 * (rand()&0x7fff)/(float)0x7fff;
////							}
////							if ( test.Length() > 1.0 ) {
////								continue;
////							}
////							test.Normalize();
////							if ( test * dir > limit ) {	// don't do a complete hemisphere
////								break;
////							}
////						}
////						byte	result[4];
////	//test = dir;
////						R_SampleCubeMap( test, width, buffers, result );
////						total[0] += result[0];
////						total[1] += result[1];
////						total[2] += result[2];
////					}
////					outBuffer[(y*outSize+x)*4+0] = total[0] / samples;
////					outBuffer[(y*outSize+x)*4+1] = total[1] / samples;
////					outBuffer[(y*outSize+x)*4+2] = total[2] / samples;
////					outBuffer[(y*outSize+x)*4+3] = 255;
////				}
////			}

////			if ( map == 0 ) {
////				sprintf( fullname, "env/%s_amb%s", baseName, extensions[i] );
////			} else {
////				sprintf( fullname, "env/%s_spec%s", baseName, extensions[i] );
////			}
////			common.Printf( "writing %s\n", fullname.c_str() );
////			session.UpdateScreen();
////			R_WriteTGA( fullname, outBuffer, outSize, outSize );
////		}
////	}

////	for ( i = 0 ; i < 6 ; i++ ) {
////		if ( buffers[i] ) {
////			Mem_Free( buffers[i] );
////		}
////	}
////} 

//////============================================================================


/*
===============
R_SetColorMappings
===============
*/
	static R_SetColorMappings(): void {
		notNeeded ( );
		//var /*int		*/i: number, j: number;
		//var /*float	*/g: number, b: number;
		//var /*int		*/inf: number;

		//b = r_brightness.GetFloat ( );
		//g = r_gamma.GetFloat ( );

		//for ( i = 0; i < 256; i++ ) {
		//    j = i * b;
		//    if ( j > 255 ) {
		//        j = 255;
		//    }

		//    if ( g == 1 ) {
		//        inf = ( j << 8 ) | j;
		//    } else {
		//        inf = 0xffff * pow( j / 255.0, 1.0 / g ) + 0.5;
		//    }
		//    if ( inf < 0 ) {
		//        inf = 0;
		//    }
		//    if ( inf > 0xffff ) {
		//        inf = 0xffff;
		//    }

		//    tr.gammaTable[i] = inf;
		//}

		//GLimp_SetGamma( tr.gammaTable, tr.gammaTable, tr.gammaTable );
	}


/////*
////================
////GfxInfo_f
////================
////*/
////void GfxInfo_f( args:idCmdArgs ) {
////	const char *fsstrings[] =
////	{
////		"windowed",
////		"fullscreen"
////	};

////	common.Printf( "\nGL_VENDOR: %s\n", glConfig.vendor_string );
////	common.Printf( "GL_RENDERER: %s\n", glConfig.renderer_string );
////	common.Printf( "GL_VERSION: %s\n", glConfig.version_string );
////	common.Printf( "GL_EXTENSIONS: %s\n", glConfig.extensions_string );
////	if ( glConfig.wgl_extensions_string ) {
////		common.Printf( "WGL_EXTENSIONS: %s\n", glConfig.wgl_extensions_string );
////	}
////	common.Printf( "GL_MAX_TEXTURE_SIZE: %d\n", glConfig.maxTextureSize );
////	common.Printf( "GL_MAX_TEXTURE_UNITS_ARB: %d\n", glConfig.maxTextureUnits );
////	common.Printf( "GL_MAX_TEXTURE_COORDS_ARB: %d\n", glConfig.maxTextureCoords );
////	common.Printf( "GL_MAX_TEXTURE_IMAGE_UNITS_ARB: %d\n", glConfig.maxTextureImageUnits );
////	common.Printf( "\nPIXELFORMAT: color(%d-bits) Z(%d-bit) stencil(%d-bits)\n", glConfig.colorBits, glConfig.depthBits, glConfig.stencilBits );
////	common.Printf( "MODE: %d, %d x %d %s hz:", r_mode.GetInteger(), glConfig.vidWidth, glConfig.vidHeight, fsstrings[r_fullscreen.GetBool()] );

////	if (glConfig.displayFrequency) {
////		common.Printf("%d\n", glConfig.displayFrequency);
////	} else {
////		common.Printf("N/A\n");
////	}

////	//=============================

////	common.Printf( "-------\n" );

////	if ( r_finish.GetBool() ) {
////		common.Printf( "Forcing glFinish\n" );
////	} else {
////		common.Printf( "glFinish not forced\n" );
////	}

////#ifdef _WIN32	
////// WGL_EXT_swap_interval
////typedef BOOL (WINAPI * PFNWGLSWAPINTERVALEXTPROC) (int interval);
////extern	PFNWGLSWAPINTERVALEXTPROC wglSwapIntervalEXT;

////	if ( r_swapInterval.GetInteger() && wglSwapIntervalEXT ) {
////		common.Printf( "Forcing swapInterval %i\n", r_swapInterval.GetInteger() );
////	} else {
////		common.Printf( "swapInterval not forced\n" );
////	}
////#endif
	
////}

/////*
////=================
////R_VidRestart_f
////=================
////*/
////void R_VidRestart_f( args:idCmdArgs ) {
////	int	err;

////	// if OpenGL isn't started, do nothing
////	if ( !glConfig.isInitialized ) {
////		return;
////	}

////	bool full = true;
////	bool forceWindow = false;
////	for ( int i = 1 ; i < args.Argc() ; i++ ) {
////		if ( idStr::Icmp( args.Argv( i ), "partial" ) == 0 ) {
////			full = false;
////			continue;
////		}
////		if ( idStr::Icmp( args.Argv( i ), "windowed" ) == 0 ) {
////			forceWindow = true;
////			continue;
////		}
////	}

////	// this could take a while, so give them the cursor back ASAP
////	Sys_GrabMouseCursor( false );

////	// dump ambient caches
////	renderModelManager.FreeModelVertexCaches();

////	// free any current world interaction surfaces and vertex caches
////	R_FreeDerivedData();

////	// make sure the defered frees are actually freed
////	R_ToggleSmpFrame();
////	R_ToggleSmpFrame();

////	// free the vertex caches so they will be regenerated again
////	vertexCache.PurgeAll();

////	// sound and input are tied to the window we are about to destroy

////	if ( full ) {
////		// free all of our texture numbers
////		soundSystem.ShutdownHW();
////		Sys_ShutdownInput();
////		globalImages.PurgeAllImages();
////		// free the context and close the window
////		GLimp_Shutdown();
////		glConfig.isInitialized = false;

////		// create the new context and vertex cache
////		bool latch = cvarSystem.GetCVarBool( "r_fullscreen" );
////		if ( forceWindow ) {
////			cvarSystem.SetCVarBool( "r_fullscreen", false );
////		}
////		R_InitOpenGL();
////		cvarSystem.SetCVarBool( "r_fullscreen", latch );

////		// regenerate all images
////		globalImages.ReloadAllImages();
////	} else {
////		glimpParms_t	parms;
////		parms.width = glConfig.vidWidth;
////		parms.height = glConfig.vidHeight;
////		parms.fullScreen = ( forceWindow ) ? false : r_fullscreen.GetBool();
////		parms.displayHz = r_displayRefresh.GetInteger();
////		parms.multiSamples = r_multiSamples.GetInteger();
////		parms.stereo = false;
////		GLimp_SetScreenParms( parms );
////	}



////	// make sure the regeneration doesn't use anything no longer valid
////	tr.viewCount++;
////	tr.viewDef = NULL;

////	// regenerate all necessary interactions
////	R_RegenerateWorld_f( idCmdArgs() );

////	// check for problems
////	err = glGetError();
////	if ( err != GL_NO_ERROR ) {
////		common.Printf( "glGetError() = 0x%x\n", err );
////	}

////	// start sound playing again
////	soundSystem.SetMute( false );
////}


/*
=================
R_InitMaterials
=================
*/
R_InitMaterials( ):void {
	tr.defaultMaterial = declManager.FindMaterial( "_default", false );
	if ( !tr.defaultMaterial ) {
		common.FatalError( "_default material not found" );
	}
	declManager.FindMaterial( "_default", false );

	// needed by R_DeriveLightData
	declManager.FindMaterial( "lights/defaultPointLight" );
	declManager.FindMaterial( "lights/defaultProjectedLight" );
}


/////*
////=================
////R_SizeUp_f

////Keybinding command
////=================
////*/
////static void R_SizeUp_f( args:idCmdArgs ) {
////	if ( r_screenFraction.GetInteger() + 10 > 100 ) {
////		r_screenFraction.SetInteger( 100 );
////	} else {
////		r_screenFraction.SetInteger( r_screenFraction.GetInteger() + 10 );
////	}
////}


/////*
////=================
////R_SizeDown_f

////Keybinding command
////=================
////*/
////static void R_SizeDown_f( args:idCmdArgs ) {
////	if ( r_screenFraction.GetInteger() - 10 < 10 ) {
////		r_screenFraction.SetInteger( 10 );
////	} else {
////		r_screenFraction.SetInteger( r_screenFraction.GetInteger() - 10 );
////	}
////}


/////*
////===============
////TouchGui_f

////  this is called from the main thread
////===============
////*/
////void R_TouchGui_f( args:idCmdArgs ) {
////	const char	*gui = args.Argv( 1 );

////	if ( !gui[0] ) {
////		common.Printf( "USAGE: touchGui <guiName>\n" );
////		return;
////	}

////	common.Printf( "touchGui %s\n", gui );
////	session.UpdateScreen();
////	uiManager.Touch( gui );
////}

/////*
////=================
////R_InitCvars
////=================
////*/
////void R_InitCvars( void ) {
////	// update latched cvars here
////}

/*
=================
R_InitCommands
=================
*/
R_InitCommands( ):void {
//#if !defined(GL_ES_VERSION_2_0)
//	cmdSystem.AddCommand( "MakeMegaTexture", idMegaTexture::MakeMegaTexture_f, cmdFlags_t.CMD_FL_RENDERER|CMD_FL_CHEAT, "processes giant images" );
//#endif
    todo();
	//cmdSystem.AddCommand( "sizeUp", R_SizeUp_f, cmdFlags_t.CMD_FL_RENDERER, "makes the rendered view larger" );
	//cmdSystem.AddCommand( "sizeDown", R_SizeDown_f, cmdFlags_t.CMD_FL_RENDERER, "makes the rendered view smaller" );
	//cmdSystem.AddCommand( "reloadGuis", R_ReloadGuis_f, cmdFlags_t.CMD_FL_RENDERER, "reloads guis" );
	//cmdSystem.AddCommand( "listGuis", R_ListGuis_f, cmdFlags_t.CMD_FL_RENDERER, "lists guis" );
	//cmdSystem.AddCommand( "touchGui", R_TouchGui_f, cmdFlags_t.CMD_FL_RENDERER, "touches a gui" );
	//cmdSystem.AddCommand( "screenshot", R_ScreenShot_f, cmdFlags_t.CMD_FL_RENDERER, "takes a screenshot" );
	//cmdSystem.AddCommand( "envshot", R_EnvShot_f, cmdFlags_t.CMD_FL_RENDERER, "takes an environment shot" );
	//cmdSystem.AddCommand( "makeAmbientMap", R_MakeAmbientMap_f, cmdFlags_t.CMD_FL_RENDERER|CMD_FL_CHEAT, "makes an ambient map" );
	//cmdSystem.AddCommand( "benchmark", R_Benchmark_f, cmdFlags_t.CMD_FL_RENDERER, "benchmark" );
	//cmdSystem.AddCommand( "gfxInfo", GfxInfo_f, cmdFlags_t.CMD_FL_RENDERER, "show graphics info" );
	//cmdSystem.AddCommand( "modulateLights", R_ModulateLights_f, cmdFlags_t.CMD_FL_RENDERER | CMD_FL_CHEAT, "modifies shader parms on all lights" );
	//cmdSystem.AddCommand( "testImage", R_TestImage_f, cmdFlags_t.CMD_FL_RENDERER | CMD_FL_CHEAT, "displays the given image centered on screen", idCmdSystem::ArgCompletion_ImageName );
	//cmdSystem.AddCommand( "testVideo", R_TestVideo_f, cmdFlags_t.CMD_FL_RENDERER | CMD_FL_CHEAT, "displays the given cinematic", idCmdSystem::ArgCompletion_VideoName );
	//cmdSystem.AddCommand( "reportSurfaceAreas", R_ReportSurfaceAreas_f, cmdFlags_t.CMD_FL_RENDERER, "lists all used materials sorted by surface area" );
	//cmdSystem.AddCommand( "reportImageDuplication", R_ReportImageDuplication_f, cmdFlags_t.CMD_FL_RENDERER, "checks all referenced images for duplications" );
	//cmdSystem.AddCommand( "regenerateWorld", R_RegenerateWorld_f, cmdFlags_t.CMD_FL_RENDERER, "regenerates all interactions" );
	//cmdSystem.AddCommand( "showInteractionMemory", R_ShowInteractionMemory_f, cmdFlags_t.CMD_FL_RENDERER, "shows memory used by interactions" );
	//cmdSystem.AddCommand( "showTriSurfMemory", R_ShowTriSurfMemory_f, cmdFlags_t.CMD_FL_RENDERER, "shows memory used by triangle surfaces" );
	//cmdSystem.AddCommand( "vid_restart", R_VidRestart_f, cmdFlags_t.CMD_FL_RENDERER, "restarts renderSystem" );
	//cmdSystem.AddCommand( "listRenderEntityDefs", R_ListRenderEntityDefs_f, cmdFlags_t.CMD_FL_RENDERER, "lists the entity defs" );
	//cmdSystem.AddCommand( "listRenderLightDefs", R_ListRenderLightDefs_f, cmdFlags_t.CMD_FL_RENDERER, "lists the light defs" );
	//cmdSystem.AddCommand( "listModes", R_ListModes_f, cmdFlags_t.CMD_FL_RENDERER, "lists all video modes" );
	//cmdSystem.AddCommand( "reloadSurface", R_ReloadSurface_f, cmdFlags_t.CMD_FL_RENDERER, "reloads the decl and images for selected surface" );
}

/*
===============
idRenderSystemLocal::Clear
===============
*/
Clear( ) {
	this.registered = false;
	this.frameCount = 0;
	this.viewCount = 0;
	this.staticAllocCount = 0;
	this.frameShaderTime = 0.0;
	this.viewportOffset = [0, 0];
	this.tiledViewport = [0, 0];
	this.backEndRenderer = backEndName_t.BE_BAD;
	this.backEndRendererMaxLight = 1.0;
	this.ambientLightVector = new idVec4();
	this.ambientLightVector.Zero();
	this.sortOffset = 0;
	this.worlds = new idList<idRenderWorldLocal>( idRenderWorldLocal );
	this.worlds.Clear();
	this.primaryWorld = null;
	this.primaryRenderView = new renderView_t ( );
	this.primaryView = null;
	this.defaultMaterial = null;
	this.testImage = null;
	this.ambientCubeImage = null;
	this.viewDef = null;
	this.pc = new performanceCounters_t;
	this.lockSurfacesCmd = new drawSurfsCommand_t;
	this.identitySpace = new viewEntity_t;
	this.logFile = null;
	this.stencilIncr = 0;
	this.stencilDecr = 0;
	this.renderCrops = newStructArray<renderCrop_t>( renderCrop_t, MAX_RENDER_CROPS );
	this.currentRenderCrop = 0;
	this.guiRecursionLevel = 0;
	this.guiModel = null;
	this.demoGuiModel = null;
	this.gammaTable = new Uint8Array(256);//	this.memset( gammaTable, 0, sizeof( gammaTable ) );
	this.takingScreenshot = false;
}

/*
===============
idRenderSystemLocal::Init
===============
*/
/*idRenderSystemLocal::*/
	Init ( ): void {

		common.Printf( "------- Initializing renderSystem --------\n" );

		// clear all our internal state
		this.viewCount = 1; // so cleared structures never match viewCount
		// we used to memset tr, but now that it is a class, we can't, so
		// there may be other state we need to reset

		this.ambientLightVector[0] = 0.5;
		this.ambientLightVector[1] = 0.5 - 0.385;
		this.ambientLightVector[2] = 0.8925;
		this.ambientLightVector[3] = 1.0;

		backEnd = new backEndState_t ( );

		//R_InitCvars();

		this.R_InitCommands ( );

		this.guiModel = new idGuiModel;
		this.guiModel.Clear ( );

		this.demoGuiModel = new idGuiModel;
		this.demoGuiModel.Clear ( );

		R_InitTriSurfData ( );

		globalImages.Init ( );

		todo( "idCinematic::InitCinematic( );" );

		// build brightness translation tables
		idRenderSystem.R_SetColorMappings ( );

		this.R_InitMaterials ( );

		renderModelManager.Init ( );

		// set the identity space
		this.identitySpace.modelMatrix[0 * 4 + 0] = 1.0;
		this.identitySpace.modelMatrix[1 * 4 + 1] = 1.0;
		this.identitySpace.modelMatrix[2 * 4 + 2] = 1.0;

		common.Printf( "renderSystem initialized.\n" );
		common.Printf( "--------------------------------------\n" );
	}

/////*
////===============
////idRenderSystemLocal::Shutdown
////===============
////*/
////void idRenderSystemLocal::Shutdown( void ) {	
////	common.Printf( "idRenderSystem::Shutdown()\n" );

////	R_DoneFreeType( );

////	if ( glConfig.isInitialized ) {
////		globalImages.PurgeAllImages();
////	}

////	renderModelManager.Shutdown();

////	idCinematic::ShutdownCinematic( );

////	globalImages.Shutdown();

////	// close the r_logFile
////	if ( logFile ) {
////		fprintf( logFile, "*** CLOSING LOG ***\n" );
////		fclose( logFile );
////		logFile = 0;
////	}

////	// free frame memory
////	R_ShutdownFrameData();

////	// free the vertex cache, which should have nothing allocated now
////	vertexCache.Shutdown();

////	R_ShutdownTriSurfData();

////	RB_ShutdownDebugTools();

////	delete this.guiModel;
////	delete demoGuiModel;

////	Clear();

////	ShutdownOpenGL();
////}

/////*
////========================
////idRenderSystemLocal::BeginLevelLoad
////========================
////*/
////void idRenderSystemLocal::BeginLevelLoad( void ) {
////	renderModelManager.BeginLevelLoad();
////	globalImages.BeginLevelLoad();
////}

/////*
////========================
////idRenderSystemLocal::EndLevelLoad
////========================
////*/
////void idRenderSystemLocal::EndLevelLoad( void ) {
////	renderModelManager.EndLevelLoad();
////	globalImages.EndLevelLoad();
////	if ( r_forceLoadImages.GetBool() ) {
////		RB_ShowImages();
////	}
////}

/*
========================
idRenderSystemLocal::InitOpenGL
========================
*/
	InitOpenGL ( ): void {
		// if OpenGL isn't started, start it now
		if ( !glConfig.isInitialized ) {
			var /*int	*/err: number;

			this.R_InitOpenGL ( );

			globalImages.ReloadAllImages ( );

			err = glGetError ( );
			if ( err != GL_NO_ERROR ) {
				common.Printf( "glGetError() = 0x%x\n", err );
			}
		}
	}

/////*
////========================
////idRenderSystemLocal::ShutdownOpenGL
////========================
////*/
////void idRenderSystemLocal::ShutdownOpenGL( void ) {
////	// free the context and close the window
////	R_ShutdownFrameData();
////	GLimp_Shutdown();
////	glConfig.isInitialized = false;
////}

/////*
////========================
////idRenderSystemLocal::IsOpenGLRunning
////========================
////*/
////bool idRenderSystemLocal::IsOpenGLRunning( void ) const {
////	if ( !glConfig.isInitialized ) {
////		return false;
////	}
////	return true;
////}

/*
========================
idRenderSystemLocal::IsFullScreen
========================
*/
	IsFullScreen ( ): boolean {
		return glConfig.isFullscreen;
	}

/*
========================
idRenderSystemLocal::GetScreenWidth
========================
*/
	GetScreenWidth ( ): number {
		return glConfig.vidWidth;
	}

/*
========================
idRenderSystemLocal::GetScreenHeight
========================
*/
	GetScreenHeight ( ): number {
		return glConfig.vidHeight;
	}


/////*
////===========================================================================

////Doom 3 GPL Source Code
////Copyright (C) 1999-2011 id Software LLC, a ZeniMax Media company. 

////This file is part of the Doom 3 GPL Source Code (?Doom 3 Source Code?).  

////Doom 3 Source Code is free software: you can redistribute it and/or modify
////it under the terms of the GNU General Public License as published by
////the Free Software Foundation, either version 3 of the License, or
////(at your option) any later version.

////Doom 3 Source Code is distributed in the hope that it will be useful,
////but WITHOUT ANY WARRANTY; without even the implied warranty of
////MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
////GNU General Public License for more details.

////You should have received a copy of the GNU General Public License
////along with Doom 3 Source Code.  If not, see <http://www.gnu.org/licenses/>.

////In addition, the Doom 3 Source Code is also subject to certain additional terms. You should have received a copy of these additional terms immediately following the terms and conditions of the GNU General Public License which accompanied the Doom 3 Source Code.  If not, please request a copy in writing from id Software at the address below.

////If you have questions concerning this license or the applicable additional terms, you may contact in writing id Software LLC, c/o ZeniMax Media Inc., Suite 120, Rockville, Maryland 20850 USA.

////===========================================================================
////*/
////#include "../idlib/precompiled.h"
////#pragma hdrstop

////#include "tr_local.h"

////idRenderSystemLocal	tr;
////idRenderSystem	*renderSystem = &tr;


/*
=====================
R_PerformanceCounters

This prints both front and back end counters, so it should
only be called when the back end thread is idle.
=====================
*/
	static R_PerformanceCounters ( ): void {
		todo ( );
		//if ( r_showPrimitives.GetInteger() != 0 ) {

		//	float megaBytes = globalImages.SumOfUsedImages() / ( 1024*1024.0 );

		//	if ( r_showPrimitives.GetInteger() > 1 ) {
		//		common.Printf( "v:%i ds:%i t:%i/%i v:%i/%i st:%i sv:%i image:%5.1f MB\n",
		//			tr.pc.c_numViews,
		//			backEnd.pc.c_drawElements + backEnd.pc.c_shadowElements,
		//			backEnd.pc.c_drawIndexes / 3,
		//			( backEnd.pc.c_drawIndexes - backEnd.pc.c_drawRefIndexes ) / 3,
		//			backEnd.pc.c_drawVertexes,
		//			( backEnd.pc.c_drawVertexes - backEnd.pc.c_drawRefVertexes ),
		//			backEnd.pc.c_shadowIndexes / 3,
		//			backEnd.pc.c_shadowVertexes,
		//			megaBytes
		//			);
		//	} else {
		//		common.Printf( "views:%i draws:%i tris:%i (shdw:%i) (vbo:%i) image:%5.1f MB\n",
		//			tr.pc.c_numViews,
		//			backEnd.pc.c_drawElements + backEnd.pc.c_shadowElements,
		//			( backEnd.pc.c_drawIndexes + backEnd.pc.c_shadowIndexes ) / 3,
		//			backEnd.pc.c_shadowIndexes / 3,
		//			backEnd.pc.c_vboIndexes / 3,
		//			megaBytes
		//			);
		//	}
		//}

		//if ( r_showDynamic.GetBool() ) {
		//	common.Printf( "callback:%i md5:%i dfrmVerts:%i dfrmTris:%i tangTris:%i guis:%i\n",
		//		tr.pc.c_entityDefCallbacks,
		//		tr.pc.c_generateMd5,
		//		tr.pc.c_deformedVerts,
		//		tr.pc.c_deformedIndexes/3,
		//		tr.pc.c_tangentIndexes/3,
		//		tr.pc.c_guiSurfs
		//		); 
		//}

		//if ( r_showCull.GetBool() ) {
		//	common.Printf( "%i sin %i sclip  %i sout %i bin %i bout\n",
		//		tr.pc.c_sphere_cull_in, tr.pc.c_sphere_cull_clip, tr.pc.c_sphere_cull_out, 
		//		tr.pc.c_box_cull_in, tr.pc.c_box_cull_out );
		//}

		//if ( r_showAlloc.GetBool() ) {
		//	common.Printf( "alloc:%i free:%i\n", tr.pc.c_alloc, tr.pc.c_free );
		//}

		//if ( r_showInteractions.GetBool() ) {
		//	common.Printf( "createInteractions:%i createLightTris:%i createShadowVolumes:%i\n",
		//		tr.pc.c_createInteractions, tr.pc.c_createLightTris, tr.pc.c_createShadowVolumes );
		//}
		//if ( r_showDefs.GetBool() ) {
		//	common.Printf( "viewEntities:%i  shadowEntities:%i  viewLights:%i\n", tr.pc.c_visibleViewEntities,
		//		tr.pc.c_shadowViewEntities, tr.pc.c_viewLights );
		//}
		//if ( r_showUpdates.GetBool() ) {
		//	common.Printf( "entityUpdates:%i  entityRefs:%i  lightUpdates:%i  lightRefs:%i\n", 
		//		tr.pc.c_entityUpdates, tr.pc.c_entityReferences,
		//		tr.pc.c_lightUpdates, tr.pc.c_lightReferences );
		//}
		//if ( r_showMemory.GetBool() ) {
		//	int	m1 = frameData ? frameData.memoryHighwater : 0;
		//	common.Printf( "frameData: %i (%i)\n", R_CountFrameData(), m1 );
		//}
		//if ( r_showLightScale.GetBool() ) {
		//	common.Printf( "lightScale: %f\n", backEnd.pc.maxLightValue );
		//}

		tr.pc.init ( ); //memset( &tr.pc, 0, sizeof( tr.pc ) );
		backEnd.pc.init ( ); //memset( &backEnd.pc, 0, sizeof( backEnd.pc ) );
	}


/*
====================
R_IssueRenderCommands

Called by R_EndFrame each frame
====================
*/
	static R_IssueRenderCommands ( ): void {
		if ( frameData.cmdHead.commandId == renderCommand_t.RC_NOP
			&& !frameData.cmdHead.next ) {
			// nothing to issue
			return;
		}

		// r_skipBackEnd allows the entire time of the back end
		// to be removed from performance measurements, although
		// nothing will be drawn to the screen.  If the prints
		// are going to a file, or r_skipBackEnd is later disabled,
		// usefull data can be received.

		// r_skipRender is usually more usefull, because it will still
		// draw 2D graphics
		if ( !r_skipBackEnd.GetBool ( ) ) {
			RB_ExecuteBackEndCommands( frameData.cmdHead );
		}

		idRenderSystem.R_ClearCommandChain ( );
	}

/*
============
R_GetCommandBuffer

Returns memory for a command buffer (stretchPicCommand_t, 
drawSurfsCommand_t, etc) and links it to the end of the
current command chain.
============
*/
	static R_GetCommandBuffer ( /*int */bytes: number ): any {
		var cmd: emptyCommand_t;

		cmd = /*(emptyCommand_t *)*/R_FrameAlloc<emptyCommand_t>( emptyCommand_t /*, bytes */ );
		cmd.next = null;
		frameData.cmdTail.next = cmd;/*&cmd.commandId*/
		frameData.cmdTail = cmd;

		return /*(void *)*/cmd;
	}


/*
====================
R_ClearCommandChain

Called after every buffer submission
and by R_ToggleSmpFrame
====================
*/
	static R_ClearCommandChain ( ): void {
		// clear the command chain
		frameData.cmdHead = frameData.cmdTail = R_FrameAlloc<emptyCommand_t>( emptyCommand_t /*sizeof( *frameData.cmdHead )*/ );
		frameData.cmdHead.commandId = renderCommand_t.RC_NOP;
		frameData.cmdHead.next = null;
	}

/*
=================
R_ViewStatistics
=================
*/
	static R_ViewStatistics ( parms: viewDef_t ): void {
		// report statistics about this view
		if ( !r_showSurfaces.GetBool ( ) ) {
			return;
		}
		common.Printf( "view:%p surfs:%i\n", parms, parms.numDrawSurfs );
	}

/*
=============
R_AddDrawViewCmd

This is the main 3D rendering command.  A single scene may
have multiple views if a mirror, portal, or dynamic texture is present.
=============
*/
	static R_AddDrawViewCmd ( parms: viewDef_t ): void {
		var cmd: drawSurfsCommand_t;

		cmd = <drawSurfsCommand_t >this.R_GetCommandBuffer( null /*sizeof( *cmd ) */ );
		cmd.commandId = renderCommand_t.RC_DRAW_VIEW;

		cmd.viewDef = parms;

		if ( parms.viewEntitys ) {
			// save the command for r_lockSurfaces debugging
			todoThrow ( );
			//tr.lockSurfacesCmd = *cmd;
		}

		tr.pc.c_numViews++;

		idRenderSystem.R_ViewStatistics( parms );
	}


//////=================================================================================


/////*
////======================
////R_LockSurfaceScene

////r_lockSurfaces allows a developer to move around
////without changing the composition of the scene, including
////culling.  The only thing that is modified is the
////view position and axis, no front end work is done at all


////Add the stored off command again, so the new rendering will use EXACTLY
////the same surfaces, including all the culling, even though the transformation
////matricies have been changed.  This allow the culling tightness to be
////evaluated interactively.
////======================
////*/
////void R_LockSurfaceScene( viewDef_t *parms ) {
////	drawSurfsCommand_t	*cmd;
////	viewEntity_t			*vModel;

////	// set the matrix for world space to eye space
////	R_SetViewMatrix( parms );
////	tr.lockSurfacesCmd.viewDef.worldSpace = parms.worldSpace;
	
////	// update the view origin and axis, and all
////	// the entity matricies
////	for( vModel = tr.lockSurfacesCmd.viewDef.viewEntitys ; vModel ; vModel = vModel.next ) {
////		myGlMultMatrix( vModel.modelMatrix, 
////			tr.lockSurfacesCmd.viewDef.worldSpace.modelViewMatrix,
////			vModel.modelViewMatrix );
////	}

////	// add the stored off surface commands again
////	cmd = (drawSurfsCommand_t *)R_GetCommandBuffer( sizeof( *cmd ) );
////	*cmd = tr.lockSurfacesCmd;
////}

/*
=============
R_CheckCvars

See if some cvars that we watch have changed
=============
*/
	static R_CheckCvars ( ): void {
		todo ( );
		//globalImages.CheckCvars();

		//// gamma stuff
		//if ( r_gamma.IsModified() || r_brightness.IsModified() ) {
		//	r_gamma.ClearModified();
		//	r_brightness.ClearModified();
		//	R_SetColorMappings();
		//}

		//// check for changes to logging state
		//GLimp_EnableLogging( r_logFile.GetInteger() != 0 );
	}

/////*
////=============
////idRenderSystemLocal::idRenderSystemLocal
////=============
////*/
////idRenderSystemLocal::idRenderSystemLocal( void ) {
////	Clear();
////}

/////*
////=============
////idRenderSystemLocal::~idRenderSystemLocal
////=============
////*/
////idRenderSystemLocal::~idRenderSystemLocal( void ) {
////}

/*
=============
SetColor

This can be used to pass general information to the current material, not
just colors
=============
*/
	SetColor ( rgba: idVec4 ): void {
		this.guiModel.SetColor( rgba[0], rgba[1], rgba[2], rgba[3] );
	}


/////*
////=============
////SetColor4
////=============
////*/
////void idRenderSystemLocal::SetColor4( float r, float g, float b, float a ) {
////	this.guiModel.SetColor( r, g, b, a );
////}

/*
=============
DrawStretchPic
=============
*/
	DrawStretchPic ( verts: idDrawVert[], /*const glIndex_t **/indexes: Int32Array, /*int */vertCount: number, /*int */indexCount: number, material: idMaterial,
		clip: boolean, /* float */min_x: number, /*float */min_y: number, /*float */max_x: number, /*float */max_y: number ): void {
		this.guiModel.DrawStretchPic( verts, indexes, vertCount, indexCount, material,
			clip, min_x, min_y, max_x, max_y );
	}

/*
=============
DrawStretchPic

x/y/w/h are in the 0,0 to 640,480 range
=============
*/
	DrawStretchPicFloats ( /*float*/x: number, /*float*/y: number, /*float*/w: number, /*float*/h: number, /*float*/s1: number, /*float*/t1: number, /*float*/s2: number, /*float*/t2: number, material: idMaterial ): void {
		this.guiModel.DrawStretchPicFloats( x, y, w, h, s1, t1, s2, t2, material );
	}

/////*
////=============
////DrawStretchTri

////x/y/w/h are in the 0,0 to 640,480 range
////=============
////*/
////void idRenderSystemLocal::DrawStretchTri( idVec2 p1, idVec2 p2, idVec2 p3, idVec2 t1, idVec2 t2, idVec2 t3, const idMaterial *material ) {
////	tr.guiModel.DrawStretchTri( p1, p2, p3, t1, t2, t3, material );
////}

/////*
////=============
////GlobalToNormalizedDeviceCoordinates
////=============
////*/
////void idRenderSystemLocal::GlobalToNormalizedDeviceCoordinates( const idVec3 &global, idVec3 &ndc ) {
////	R_GlobalToNormalizedDeviceCoordinates( global, ndc );
////}

/////*
////=============
////GlobalToNormalizedDeviceCoordinates
////=============
////*/
////void idRenderSystemLocal::GetGLSettings( int& width, int& height ) {
////	width = glConfig.vidWidth;
////	height = glConfig.vidHeight;
////}

/*
=====================
idRenderSystemLocal::DrawSmallChar

small chars are drawn at native screen resolution
=====================
*/
	DrawSmallChar ( /*int */x: number, /*int */y: number, /*int */ch: number, material: idMaterial ): void {
		var /*int */row: number, col: number;
		var /*float */frow: number, fcol: number;
		var /*float */size: number;

		ch &= 255;

		if ( ch == ' '.charCodeAt( 0 ) ) {
			return;
		}

		if ( y < -SMALLCHAR_HEIGHT ) {
			return;
		}

		row = ch >> 4;
		col = ch & 15;

		frow = row * 0.0625;
		fcol = col * 0.0625;
		size = 0.0625;

		this.DrawStretchPicFloats( x, y, SMALLCHAR_WIDTH, SMALLCHAR_HEIGHT,
			fcol, frow,
			fcol + size, frow + size,
			material );
	}

/*
==================
idRenderSystemLocal::DrawSmallString[Color]

Draws a multi-colored string with a drop shadow, optionally forcing
to a fixed color.

Coordinates are at 640 by 480 virtual resolution
==================
*/
	DrawSmallStringExt( /*int */x: number, /*int */y: number, $string: string, setColor: idVec4, forceColor: boolean, material: idMaterial): void {
		assert( typeof $string === "string" );

		var color: idVec4;
		var s: number;
		var /*int*/xx: number;

		// draw the colored text
		s = 0;
		xx = x;
		this.SetColor( setColor );
		while ( $string[s] ) {
			if ( idStr.IsColor( $string.substr( s ) ) ) {
				if ( !forceColor ) {
					if ( $string[s + 1] == C_COLOR_DEFAULT ) {
						this.SetColor( setColor );
					} else {
						color = idStr.ColorForIndex( $string.charCodeAt( s + 1 ) );
						color[3] = setColor[3];
						this.SetColor( color );
					}
				}
				s += 2;
				continue;
			}
			this.DrawSmallChar( xx, y, $string.charCodeAt( s ), material );
			xx += SMALLCHAR_WIDTH;
			s++;
		}
		this.SetColor( colorWhite );
	}

/////*
////=====================
////idRenderSystemLocal::DrawBigChar
////=====================
////*/
////void idRenderSystemLocal::DrawBigChar( int x, int y, int ch, const idMaterial *material ) {
////	int row, col;
////	float frow, fcol;
////	float size;

////	ch &= 255;

////	if ( ch == ' ' ) {
////		return;
////	}

////	if ( y < -BIGCHAR_HEIGHT ) {
////		return;
////	}

////	row = ch >> 4;
////	col = ch & 15;

////	frow = row * 0.0625f;
////	fcol = col * 0.0625f;
////	size = 0.0625f;

////	DrawStretchPic( x, y, BIGCHAR_WIDTH, BIGCHAR_HEIGHT,
////					   fcol, frow, 
////					   fcol + size, frow + size, 
////					   material );
////}

/////*
////==================
////idRenderSystemLocal::DrawBigString[Color]

////Draws a multi-colored string with a drop shadow, optionally forcing
////to a fixed color.

////Coordinates are at 640 by 480 virtual resolution
////==================
////*/
////void idRenderSystemLocal::DrawBigStringExt( int x, int y, const char *string, const idVec4 &setColor, bool forceColor, const idMaterial *material ) {
////	idVec4		color;
////	const char	*s;
////	int			xx;

////	// draw the colored text
////	s = string;
////	xx = x;
////	this.SetColor( setColor );
////	while ( *s ) {
////		if ( idStr.IsColor( s ) ) {
////			if ( !forceColor ) {
////				if ( *(s+1) == C_COLOR_DEFAULT ) {
////					this.SetColor( setColor );
////				} else {
////					color = idStr::ColorForIndex( *(s+1) );
////					color[3] = setColor[3];
////					this.SetColor( color );
////				}
////			}
////			s += 2;
////			continue;
////		}
////		DrawBigChar( xx, y, *s, material );
////		xx += BIGCHAR_WIDTH;
////		s++;
////	}
////	this.SetColor( colorWhite );
////}

//======================================================================================

/*
==================
SetBackEndRenderer

Check for changes in the back end renderSystem, possibly invalidating cached data
==================
*/
SetBackEndRenderer():void {
	if ( !r_renderer.IsModified() ) {
		return;
	}

	this.backEndRenderer = backEndName_t.BE_BAD;

	if ( idStr.Icmp( r_renderer.GetString(), "glsl" ) == 0 ) {
		if ( glConfig.allowGLSLPath ) {
			this.backEndRenderer = backEndName_t.BE_GLSL;
		}
	}

	this.backEndRendererMaxLight = 1.0;

	switch( this.backEndRenderer ) {
		case backEndName_t.BE_ARB2:
		common.Printf( "using ARB2 renderSystem\n" );
		this.backEndRendererMaxLight = 999;
		break;
		case backEndName_t.BE_GLSL:
		common.Printf( "using GLSL renderSystem\n" );
		this.backEndRendererMaxLight = 999;
		break;
	default:
		common.FatalError( "SetbackEndRenderer: bad back end" );
	}

	r_renderer.ClearModified();
}

/*
====================
BeginFrame
====================
*/
BeginFrame( /*int */windowWidth:number, /*int */windowHeight:number ):void {
	var cmd: setBufferCommand_t;

	if ( !glConfig.isInitialized ) {
		return;
	}

	// determine which back end we will use
	this.SetBackEndRenderer();

	this.guiModel.Clear();

	// for the larger-than-window tiled rendering screenshots
	if ( this.tiledViewport[0] ) {
		windowWidth = this.tiledViewport[0];
		windowHeight = this.tiledViewport[1];
	}

	glConfig.vidWidth = windowWidth;
	glConfig.vidHeight = windowHeight;

	this.renderCrops[0].x = 0;
	this.renderCrops[0].y = 0;
	this.renderCrops[0].width = windowWidth;
	this.renderCrops[0].height = windowHeight;
	this.currentRenderCrop = 0;

	// screenFraction is just for quickly testing fill rate limitations
	if ( r_screenFraction.GetInteger() != 100 ) {
		var/*int	*/w = SCREEN_WIDTH * r_screenFraction.GetInteger() / 100.0;
		var/*int */h = SCREEN_HEIGHT * r_screenFraction.GetInteger() / 100.0;
		this.CropRenderSize( w, h );
	}


	// this is the ONLY place this is modified
	this.frameCount++;

	// just in case we did a common.Error while this
	// was set
	this.guiRecursionLevel = 0;

	// the first rendering will be used for commands like
	// screenshot, rather than a possible subsequent remote
	// or mirror render
//	this.primaryWorld = NULL;

	// set the time for shader effects in 2D rendering
	this.frameShaderTime = eventLoop.Milliseconds() * 0.001; //TODO: this seems to start at 0, check this

	//
	// draw buffer stuff
	//
	cmd = <setBufferCommand_t>idRenderSystem.R_GetCommandBuffer( /*sizeof( *cmd ) */null);
	cmd.commandId = renderCommand_t.RC_SET_BUFFER;
	cmd.frameCount = this.frameCount;

	if ( r_frontBuffer.GetBool() ) {
		cmd.buffer = /*(int)*/GL_FRONT;
	} else {
		cmd.buffer = /*(int)*/GL_BACK;
	}	
}

////void idRenderSystemLocal::WriteDemoPics() {
////	session.writeDemo.WriteInt( DS_RENDER );
////	session.writeDemo.WriteInt( DC_GUI_MODEL );
////	this.guiModel.WriteToDemo( session.writeDemo );
////}

////void idRenderSystemLocal::DrawDemoPics() {
////	demoGuiModel.EmitFullScreen();
////}

/*
=============
EndFrame

Returns the number of msec spent in the back end
=============
*/
EndFrame( /*int **/frontEndMsec:R<number>, /*int **/backEndMsec:R<number> ):void {
	var cmd: emptyCommand_t ;

	if ( !glConfig.isInitialized ) {
		return;
	}
	
	// close any gui drawing
	this.guiModel.EmitFullScreen();
	this.guiModel.Clear();

	// save out timing information
	if ( frontEndMsec ) {
		frontEndMsec.$ = this.pc.frontEndMsec;
	}
	if ( backEndMsec ) {
		backEndMsec.$ = backEnd.pc.msec;
	}

	// print any other statistics and clear all of them
	idRenderSystem.R_PerformanceCounters();

	// check for dynamic changes that require some initialization
	idRenderSystem.R_CheckCvars();

    // check for errors
	idRenderSystem.GL_CheckErrors();

	// add the swapbuffers command
	cmd = < emptyCommand_t>idRenderSystem.R_GetCommandBuffer( /*sizeof( *cmd ) */null );
	cmd.commandId = renderCommand_t.RC_SWAP_BUFFERS;

	// start the back end up again with the new command list
	idRenderSystem.R_IssueRenderCommands();

	// use the other buffers next frame, because another CPU
	// may still be rendering into the current buffers
	R_ToggleSmpFrame();

	// we can now release the vertexes used this frame
	vertexCache.EndFrame();

	if (session.writeDemo) {
		todoThrow ( );
		//session.writeDemo.WriteInt( DS_RENDER );
		//session.writeDemo.WriteInt( DC_END_FRAME );
		//if ( r_showDemo.GetBool() ) {
		//	common.Printf( "write DC_END_FRAME\n" );
		//}
	}
}

/*
=====================
RenderViewToViewport

Converts from SCREEN_WIDTH / SCREEN_HEIGHT coordinates to current cropped pixel coordinates
=====================
*/
	RenderViewToViewport ( renderView: renderView_t, viewport: idScreenRect ): void {
		var rc = this.renderCrops[this.currentRenderCrop];

		var /*float */wRatio = /*(float)*/rc.width / SCREEN_WIDTH;
		var /*float */hRatio = /*(float)*/rc.height / SCREEN_HEIGHT;

		viewport.x1 = idMath.Ftoi( rc.x + renderView.x * wRatio );
		viewport.x2 = idMath.Ftoi( rc.x + floor( ( renderView.x + renderView.width ) * wRatio + 0.5 ) - 1 );
		viewport.y1 = idMath.Ftoi( ( rc.y + rc.height ) - floor( ( renderView.y + renderView.height ) * hRatio + 0.5 ) );
		viewport.y2 = idMath.Ftoi( ( rc.y + rc.height ) - floor( renderView.y * hRatio + 0.5 ) - 1 );
	}

	static RoundDownToPowerOfTwo ( /*int */v: number ): number {
		var /*int	*/i: number;

		for ( i = 0; i < 20; i++ ) {
			if ( ( 1 << i ) == v ) {
				return v;
			}
			if ( ( 1 << i ) > v ) {
				return 1 << ( i - 1 );
			}
		}
		return 1 << i;
	}

/*
================
CropRenderSize

This automatically halves sizes until it fits in the current window size,
so if you specify a power of two size for a texture copy, it may be shrunk
down, but still valid.
================
*/
	CropRenderSize( /*int*/ width: number, /*int */height: number, makePowerOfTwo = false, forceDimensions = false):void {
	if ( !glConfig.isInitialized ) {
		return;
	}

	// close any gui drawing before changing the size
	this.guiModel.EmitFullScreen();
	this.guiModel.Clear();

	if ( width < 1 || height < 1 ) {
		common.Error( "CropRenderSize: bad sizes" );
	}

		if (session.writeDemo) {
			todoThrow ( );
		//session.writeDemo.WriteInt( DS_RENDER );
		//session.writeDemo.WriteInt( DC_CROP_RENDER );
		//session.writeDemo.WriteInt( width );
		//session.writeDemo.WriteInt( height );
		//session.writeDemo.WriteInt( makePowerOfTwo );

		if ( r_showDemo.GetBool() ) {
			common.Printf( "write DC_CROP_RENDER\n" );
		}
	}

	// convert from virtual SCREEN_WIDTH/SCREEN_HEIGHT coordinates to physical OpenGL pixels
		var renderView = new renderView_t;
	renderView.x = 0;
	renderView.y = 0;
	renderView.width = width;
	renderView.height = height;

	var r: idScreenRect;
	this.RenderViewToViewport( renderView, r );

	width = r.x2 - r.x1 + 1;
	height = r.y2 - r.y1 + 1;

	if ( forceDimensions ) {
		// just give exactly what we ask for
		width = renderView.width;
		height = renderView.height;
	}

	// if makePowerOfTwo, drop to next lower power of two after scaling to physical pixels
	if ( makePowerOfTwo ) {
		width = idRenderSystem.RoundDownToPowerOfTwo( width );
		height = idRenderSystem.RoundDownToPowerOfTwo( height );
		// FIXME: megascreenshots with offset viewports don't work right with this yet
	}

	var rc = this.renderCrops[this.currentRenderCrop];

	// we might want to clip these to the crop window instead
	while ( width > glConfig.vidWidth ) {
		width >>= 1;
	}
	while ( height > glConfig.vidHeight ) {
		height >>= 1;
	}

	if ( this.currentRenderCrop == MAX_RENDER_CROPS ) {
		common.Error( "idRenderSystemLocal::CropRenderSize: this.currentRenderCrop == MAX_RENDER_CROPS" );
	}

	this.currentRenderCrop++;

	rc = this.renderCrops[this.currentRenderCrop];

	rc.x = 0;
	rc.y = 0;
	rc.width = width;
	rc.height = height;
}

/////*
////================
////UnCrop
////================
////*/
////void idRenderSystemLocal::UnCrop() {
////	if ( !glConfig.isInitialized ) {
////		return;
////	}

////	if ( this.currentRenderCrop < 1 ) {
////		common.Error( "idRenderSystemLocal::UnCrop: this.currentRenderCrop < 1" );
////	}

////	// close any gui drawing
////	this.guiModel.EmitFullScreen();
////	this.guiModel.Clear();

////	this.currentRenderCrop--;

////	if ( session.writeDemo ) {
////		session.writeDemo.WriteInt( DS_RENDER );
////		session.writeDemo.WriteInt( DC_UNCROP_RENDER );

////		if ( r_showDemo.GetBool() ) {
////			common.Printf( "write DC_UNCROP\n" );
////		}
////	}
////}

/////*
////================
////CaptureRenderToImage
////================
////*/
////void idRenderSystemLocal::CaptureRenderToImage( const char *imageName ) {
////	if ( !glConfig.isInitialized ) {
////		return;
////	}
////	this.guiModel.EmitFullScreen();
////	this.guiModel.Clear();

////	if ( session.writeDemo ) {
////		session.writeDemo.WriteInt( DS_RENDER );
////		session.writeDemo.WriteInt( DC_CAPTURE_RENDER );
////		session.writeDemo.WriteHashString( imageName );

////		if ( r_showDemo.GetBool() ) {
////			common.Printf( "write DC_CAPTURE_RENDER: %s\n", imageName );
////		}
////	}

////	// look up the image before we create the render command, because it
////	// may need to sync to create the image
////	idImage	*image = globalImages.ImageFromFile(imageName, textureFilter_t.TF_DEFAULT, true, textureRepeat_t.TR_REPEAT, textureDepth_t.TD_DEFAULT);

////	renderCrop_t *rc = &this.renderCrops[this.currentRenderCrop];

////	copyRenderCommand_t *cmd = (copyRenderCommand_t *)R_GetCommandBuffer( sizeof( *cmd ) );
////	cmd.commandId = RC_COPY_RENDER;
////	cmd.x = rc.x;
////	cmd.y = rc.y;
////	cmd.imageWidth = rc.width;
////	cmd.imageHeight = rc.height;
////	cmd.image = image;

////	this.guiModel.Clear();
////}

/////*
////==============
////CaptureRenderToFile

////==============
////*/
////void idRenderSystemLocal::CaptureRenderToFile( const char *fileName, bool fixAlpha ) {
////	if ( !glConfig.isInitialized ) {
////		return;
////	}

////	renderCrop_t *rc = &this.renderCrops[this.currentRenderCrop];

////	this.guiModel.EmitFullScreen();
////	this.guiModel.Clear();
////	R_IssueRenderCommands();
	
////#if !defined(GL_ES_VERSION_2_0)
////	glReadBuffer( GL_BACK );
////#endif

////	// include extra space for OpenGL padding to word boundaries
////	int	c = ( rc.width + 3 ) * rc.height;
////	byte *data = (byte *)R_StaticAlloc( c * 3 );
	
////	glReadPixels( rc.x, rc.y, rc.width, rc.height, GL_RGB, GL_UNSIGNED_BYTE, data ); 

////	byte *data2 = (byte *)R_StaticAlloc( c * 4 );

////	for ( int i = 0 ; i < c ; i++ ) {
////		data2[ i * 4 ] = data[ i * 3 ];
////		data2[ i * 4 + 1 ] = data[ i * 3 + 1 ];
////		data2[ i * 4 + 2 ] = data[ i * 3 + 2 ];
////		data2[ i * 4 + 3 ] = 0xff;
////	}

////	R_WriteTGA( fileName, data2, rc.width, rc.height, true );

////	R_StaticFree( data );
////	R_StaticFree( data2 );
////}


/////*
////==============
////AllocRenderWorld
////==============
////*/
////idRenderWorld *idRenderSystemLocal::AllocRenderWorld() {
////	idRenderWorldLocal *rw;
////	rw = new idRenderWorldLocal;
////	worlds.Append( rw );
////	return rw;
////}

/////*
////==============
////FreeRenderWorld
////==============
////*/
////void idRenderSystemLocal::FreeRenderWorld( idRenderWorld *rw ) {
////	if ( this.primaryWorld == rw ) {
////		this.primaryWorld = NULL;
////	}
////	worlds.Remove( static_cast<idRenderWorldLocal *>(rw) );
////	delete rw;
////}

/////*
////==============
////PrintMemInfo
////==============
////*/
////void idRenderSystemLocal::PrintMemInfo( MemInfo_t *mi ) {
////	// sum up image totals
////	globalImages.PrintMemInfo( mi );

////	// sum up model totals
////	renderModelManager.PrintMemInfo( mi );

////	// compute render totals

////}

/////*
////===============
////idRenderSystemLocal::UploadImage
////===============
////*/
////bool idRenderSystemLocal::UploadImage( const char *imageName, const byte *data, int width, int height  ) {
////	idImage *image = globalImages.GetImage( imageName );
////	if ( !image ) {
////		return false;
////	}
////	image.UploadScratch( data, width, height );
////	image.SetImageFilterAndRepeat();
////	return true;
////}
}

var tr = new idRenderSystem();
var renderSystem = tr;